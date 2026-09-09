import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

const CartContext = createContext(null);

const CART_STORAGE_KEY = "crust-co-cart";
const FAVORITES_STORAGE_KEY = "crust-co-favorites";
const COUPON_STORAGE_KEY = "crust-co-coupon";

const FREE_DELIVERY_LIMIT = 499;
const DELIVERY_FEE = 39;

const readStorage = (key, fallback) => {
  try {
    const saved = localStorage.getItem(key);

    if (!saved) {
      return fallback;
    }

    return JSON.parse(saved);
  } catch {
    return fallback;
  }
};

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState(() =>
    readStorage(CART_STORAGE_KEY, [])
  );

  const [favorites, setFavorites] = useState(() =>
    readStorage(FAVORITES_STORAGE_KEY, [])
  );

  const [coupon, setCoupon] = useState(() =>
    readStorage(COUPON_STORAGE_KEY, "")
  );

  /* =========================================================
     PERSISTENCE
  ========================================================= */

  useEffect(() => {
    localStorage.setItem(
      CART_STORAGE_KEY,
      JSON.stringify(cartItems)
    );
  }, [cartItems]);

  useEffect(() => {
    localStorage.setItem(
      FAVORITES_STORAGE_KEY,
      JSON.stringify(favorites)
    );
  }, [favorites]);

  useEffect(() => {
    localStorage.setItem(
      COUPON_STORAGE_KEY,
      JSON.stringify(coupon)
    );
  }, [coupon]);

  /* =========================================================
     ADD TO CART
  ========================================================= */

  const addToCart = (product, options = {}) => {
    if (!product) return;

    const selectedSize =
      options.size ||
      product.sizes?.[0]?.name ||
      "Regular";

    const selectedCrust =
      options.crust ||
      product.crusts?.[0] ||
      "Classic";

    const selectedSizeObject =
      product.sizes?.find(
        (item) => item.name === selectedSize
      );

    const price = Number(
      selectedSizeObject?.price ??
        product.price ??
        0
    );

    const quantity = Math.max(
      1,
      Number(options.quantity) || 1
    );

    const cartId = `${product.id}-${selectedSize}-${selectedCrust}`;

    setCartItems((currentItems) => {
      const existingItem = currentItems.find(
        (item) => item.cartId === cartId
      );

      if (existingItem) {
        return currentItems.map((item) =>
          item.cartId === cartId
            ? {
                ...item,
                quantity:
                  item.quantity + quantity,
                price,
                updatedAt: Date.now(),
              }
            : item
        );
      }

      return [
        ...currentItems,
        {
          cartId,
          id: product.id,
          name: product.name,
          image: product.image,
          description: product.description,

          /*
            Keep category so BOGO knows whether
            the item is a pizza.
          */
          category: product.category || "pizzas",

          price,

          size: selectedSize,
          crust: selectedCrust,

          quantity,

          rating: Number(product.rating || 0),

          createdAt: Date.now(),
          updatedAt: Date.now(),
        },
      ];
    });
  };

  /* =========================================================
     REMOVE
  ========================================================= */

  const removeFromCart = (cartId) => {
    setCartItems((currentItems) =>
      currentItems.filter(
        (item) => item.cartId !== cartId
      )
    );
  };

  /* =========================================================
     UPDATE QUANTITY
  ========================================================= */

  const updateQuantity = (cartId, change) => {
    setCartItems((currentItems) =>
      currentItems
        .map((item) =>
          item.cartId === cartId
            ? {
                ...item,
                quantity:
                  item.quantity + change,
                updatedAt: Date.now(),
              }
            : item
        )
        .filter(
          (item) => item.quantity > 0
        )
    );
  };

  const setItemQuantity = (
    cartId,
    quantity
  ) => {
    const safeQuantity = Math.max(
      0,
      Number(quantity) || 0
    );

    setCartItems((currentItems) =>
      currentItems
        .map((item) =>
          item.cartId === cartId
            ? {
                ...item,
                quantity: safeQuantity,
                updatedAt: Date.now(),
              }
            : item
        )
        .filter(
          (item) => item.quantity > 0
        )
    );
  };

  /* =========================================================
     CLEAR CART
  ========================================================= */

  const clearCart = () => {
    setCartItems([]);
    setCoupon("");
  };

  /* =========================================================
     FAVORITES
  ========================================================= */

  const isFavorite = (productId) => {
    return favorites.some(
      (item) =>
        String(item.id) ===
        String(productId)
    );
  };

  const toggleFavorite = (product) => {
    if (!product) return;

    setFavorites((currentFavorites) => {
      const exists =
        currentFavorites.some(
          (item) =>
            String(item.id) ===
            String(product.id)
        );

      if (exists) {
        return currentFavorites.filter(
          (item) =>
            String(item.id) !==
            String(product.id)
        );
      }

      return [
        ...currentFavorites,
        {
          id: product.id,
          name: product.name,
          image: product.image,
          description: product.description,
          price: Number(product.price || 0),
          rating: Number(product.rating || 0),
          category: product.category,
          toppings: product.toppings || [],
          addedAt: Date.now(),
        },
      ];
    });
  };

  const removeFavorite = (productId) => {
    setFavorites((currentFavorites) =>
      currentFavorites.filter(
        (item) =>
          String(item.id) !==
          String(productId)
      )
    );
  };

  const clearFavorites = () => {
    setFavorites([]);
  };

  /* =========================================================
     CART COUNT
  ========================================================= */

  const itemCount = useMemo(
    () =>
      cartItems.reduce(
        (total, item) =>
          total +
          Number(item.quantity || 0),
        0
      ),
    [cartItems]
  );

  /* =========================================================
     SUBTOTAL
  ========================================================= */

  const subtotal = useMemo(
    () =>
      cartItems.reduce(
        (total, item) =>
          total +
          (Number(item.price) || 0) *
            (Number(item.quantity) || 0),
        0
      ),
    [cartItems]
  );

  /* =========================================================
     DELIVERY
  ========================================================= */

  const deliveryFee = useMemo(() => {
    if (subtotal === 0) {
      return 0;
    }

    if (
      subtotal >=
      FREE_DELIVERY_LIMIT
    ) {
      return 0;
    }

    return DELIVERY_FEE;
  }, [subtotal]);

  /* =========================================================
     COUPONS
  ========================================================= */

  const normalizedCoupon =
    coupon.trim().toUpperCase();

  const validCoupons = {
    CRUST20: {
      type: "percentage",
      value: 20,
      maxDiscount: 150,
    },

    WELCOME100: {
      type: "fixed",
      value: 100,
      maxDiscount: 100,
    },

    /*
      BOGO is handled separately below.
    */
    BOGO: {
      type: "bogo",
    },
  };

  const couponDetails =
    validCoupons[normalizedCoupon] ||
    null;

  /* =========================================================
     BOGO QUALIFYING ITEMS
     
     BOGO = Buy 1 Get 1 Free
     
     Every 2 qualifying pizza units
     gives the cheaper one free.
  ========================================================= */

  const bogoUnits = useMemo(() => {
    if (normalizedCoupon !== "BOGO") {
      return [];
    }

    const units = [];

    cartItems.forEach((item) => {
      /*
        Only pizzas qualify.
      */
      const isPizza =
        item.category === "pizzas";

      if (!isPizza) {
        return;
      }

      const quantity = Math.max(
        0,
        Number(item.quantity || 0)
      );

      const price = Math.max(
        0,
        Number(item.price || 0)
      );

      for (
        let index = 0;
        index < quantity;
        index += 1
      ) {
        units.push({
          cartId: item.cartId,
          id: item.id,
          name: item.name,
          price,
        });
      }
    });

    /*
      Cheapest units first.
    */
    return units.sort(
      (a, b) => a.price - b.price
    );
  }, [cartItems, normalizedCoupon]);

  /* =========================================================
     BOGO FREE UNITS
  ========================================================= */

  const bogoFreeUnits = useMemo(() => {
    if (bogoUnits.length < 2) {
      return [];
    }

    /*
      For every pair, the cheaper pizza
      is free.

      Example:

      ₹249
      ₹349
      ₹399
      ₹449

      Free:
      ₹249
      ₹399
    */

    const freeUnits = [];

    for (
      let index = 0;
      index + 1 < bogoUnits.length;
      index += 2
    ) {
      freeUnits.push(
        bogoUnits[index]
      );
    }

    return freeUnits;
  }, [bogoUnits]);

  /* =========================================================
     BOGO DISCOUNT
  ========================================================= */

  const bogoDiscount = useMemo(() => {
    return bogoFreeUnits.reduce(
      (total, item) =>
        total +
        Number(item.price || 0),
      0
    );
  }, [bogoFreeUnits]);

  /* =========================================================
     BOGO ELIGIBILITY
  ========================================================= */

  const bogoEligibleCount =
    bogoUnits.length;

  const bogoFreeCount =
    bogoFreeUnits.length;

  const bogoNeedsMorePizza =
    normalizedCoupon === "BOGO" &&
    bogoEligibleCount === 1;

  const bogoQualified =
    normalizedCoupon === "BOGO" &&
    bogoEligibleCount >= 2 &&
    bogoDiscount > 0;

  /* =========================================================
     STANDARD DISCOUNT
  ========================================================= */

  const standardDiscount =
    useMemo(() => {
      if (
        !couponDetails ||
        subtotal <= 0
      ) {
        return 0;
      }

      if (
        couponDetails.type ===
        "percentage"
      ) {
        return Math.min(
          Math.round(
            subtotal *
              (couponDetails.value /
                100)
          ),
          couponDetails.maxDiscount
        );
      }

      if (
        couponDetails.type ===
        "fixed"
      ) {
        return Math.min(
          couponDetails.value,
          subtotal
        );
      }

      return 0;
    }, [
      couponDetails,
      subtotal,
    ]);

  /* =========================================================
     FINAL DISCOUNT
  ========================================================= */

  const discount = useMemo(() => {
    if (
      normalizedCoupon === "BOGO"
    ) {
      return bogoDiscount;
    }

    return standardDiscount;
  }, [
    normalizedCoupon,
    bogoDiscount,
    standardDiscount,
  ]);

  /* =========================================================
     TOTAL
  ========================================================= */

  const total = useMemo(() => {
    return Math.max(
      0,
      subtotal +
        deliveryFee -
        discount
    );
  }, [
    subtotal,
    deliveryFee,
    discount,
  ]);

  /* =========================================================
     FREE DELIVERY PROGRESS
  ========================================================= */

  const freeDeliveryProgress =
    useMemo(() => {
      if (subtotal <= 0) {
        return 0;
      }

      return Math.min(
        100,
        Math.round(
          (subtotal /
            FREE_DELIVERY_LIMIT) *
            100
        )
      );
    }, [subtotal]);

  const amountForFreeDelivery =
    useMemo(() => {
      return Math.max(
        0,
        FREE_DELIVERY_LIMIT -
          subtotal
      );
    }, [subtotal]);

  /* =========================================================
     COUPON STATUS
  ========================================================= */

  const couponValid = Boolean(
    normalizedCoupon &&
      couponDetails
  );

  const couponInvalid = Boolean(
    normalizedCoupon &&
      !couponDetails
  );

  const couponApplied =
    normalizedCoupon === "BOGO"
      ? bogoQualified
      : Boolean(
          couponDetails &&
            discount > 0
        );

  /*
    Useful for UI:
    coupon has been selected even when
    BOGO still needs another pizza.
  */
  const couponSelected =
    Boolean(
      normalizedCoupon &&
        couponDetails
    );

  /* =========================================================
     RECENTLY ADDED
  ========================================================= */

  const recentlyAdded = useMemo(
    () =>
      [...cartItems]
        .sort(
          (a, b) =>
            Number(
              b.updatedAt || 0
            ) -
            Number(
              a.updatedAt || 0
            )
        )
        .slice(0, 3),
    [cartItems]
  );

  /* =========================================================
     CONTEXT
  ========================================================= */

  const value = {
    cartItems,

    addToCart,
    removeFromCart,
    updateQuantity,
    setItemQuantity,
    clearCart,

    favorites,
    isFavorite,
    toggleFavorite,
    removeFavorite,
    clearFavorites,

    coupon,
    setCoupon,

    couponDetails,
    couponApplied,
    couponSelected,
    couponValid,
    couponInvalid,

    itemCount,

    subtotal,
    deliveryFee,
    discount,
    total,

    freeDeliveryProgress,
    amountForFreeDelivery,
    freeDeliveryLimit:
      FREE_DELIVERY_LIMIT,

    recentlyAdded,

    /* BOGO */
    bogoUnits,
    bogoFreeUnits,
    bogoDiscount,
    bogoEligibleCount,
    bogoFreeCount,
    bogoNeedsMorePizza,
    bogoQualified,
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
}

/* =========================================================
   HOOK
========================================================= */

export function useCart() {
  const context =
    useContext(CartContext);

  if (!context) {
    throw new Error(
      "useCart must be used inside CartProvider"
    );
  }

  return context;
}
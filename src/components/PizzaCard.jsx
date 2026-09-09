import { motion, AnimatePresence } from "framer-motion";
import {
  FiHeart,
  FiPlus,
  FiStar,
  FiCheck,
} from "react-icons/fi";
import { useEffect, useState } from "react";
import { useCart } from "../context/CartContext";

export default function PizzaCard({
  pizza,
  onProduct,
  showBadge = true,
}) {
  const {
    addToCart,
    toggleFavorite,
    isFavorite,
  } = useCart();

  const [added, setAdded] = useState(false);

  const favorite = isFavorite(pizza.id);

  /* =========================================================
     SIZE
  ========================================================= */

  const availableSizes =
    pizza.sizes?.length > 0
      ? pizza.sizes
      : [
          {
            name: "Regular",
            price: Number(pizza.price || 0),
          },
        ];

  const [selectedSize, setSelectedSize] =
    useState(
      availableSizes[0]?.name || "Regular"
    );

  const selectedSizeObject =
    availableSizes.find(
      (size) => size.name === selectedSize
    ) || availableSizes[0];

  const currentPrice = Number(
    selectedSizeObject?.price ??
      pizza.price ??
      0
  );

  const crust =
    pizza.crusts?.[0] || "Classic";

  /* =========================================================
     ADD ANIMATION
  ========================================================= */

  useEffect(() => {
    if (!added) return;

    const timer = setTimeout(() => {
      setAdded(false);
    }, 1100);

    return () => clearTimeout(timer);
  }, [added]);

  /* =========================================================
     ADD TO CART
  ========================================================= */

  const handleAdd = (event) => {
    event.stopPropagation();

    addToCart(pizza, {
      size: selectedSize,
      crust,
      quantity: 1,
    });

    setAdded(true);
  };

  /* =========================================================
     FAVORITE
  ========================================================= */

  const handleFavorite = (event) => {
    event.stopPropagation();
    toggleFavorite(pizza);
  };

  /* =========================================================
     SIZE CHANGE
  ========================================================= */

  const handleSizeChange = (
    event,
    sizeName
  ) => {
    event.stopPropagation();
    setSelectedSize(sizeName);
  };

  /* =========================================================
     BADGE
  ========================================================= */

  const formattedBadge =
    pizza.badge?.toUpperCase() ===
    "BESTSELLER"
      ? "BEST SELLER"
      : pizza.badge;

  return (
    <motion.article
      layout
      initial={{
        opacity: 0,
        y: 25,
        scale: 0.97,
      }}
      whileInView={{
        opacity: 1,
        y: 0,
        scale: 1,
      }}
      viewport={{
        once: true,
        amount: 0.12,
      }}
      whileHover={{
        y: -4,
      }}
      whileTap={{
        scale: 0.985,
      }}
      transition={{
        duration: 0.38,
        ease: [0.22, 1, 0.36, 1],
      }}
      onClick={() => onProduct(pizza)}
      className="group relative min-w-0 overflow-hidden rounded-[19px] border border-[#e8ded5] bg-white shadow-[0_3px_12px_rgba(43,30,20,0.055)] transition-shadow duration-300 hover:shadow-[0_10px_26px_rgba(43,30,20,0.11)]"
    >
      {/* =====================================================
          IMAGE
      ===================================================== */}

      <div className="relative aspect-[1/0.91] overflow-hidden bg-[#f2e7dc]">

        <motion.img
          src={pizza.image}
          alt={pizza.name}
          draggable="false"
          className="h-full w-full object-cover"
          whileHover={{
            scale: 1.06,
            rotate: 0.5,
          }}
          transition={{
            duration: 0.5,
            ease: "easeOut",
          }}
        />

        {/* IMAGE OVERLAY */}

        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-12 bg-gradient-to-t from-black/15 to-transparent" />

        {/* ===================================================
            BADGE
        =================================================== */}

        {showBadge && formattedBadge && (
          <motion.div
            initial={{
              opacity: 0,
              scale: 0.8,
            }}
            animate={{
              opacity: 1,
              scale: 1,
            }}
            transition={{
              delay: 0.15,
              duration: 0.25,
            }}
            className={`absolute left-2.5 top-2.5 rounded-[6px] px-2 py-[5px] text-[7.5px] font-extrabold uppercase leading-none tracking-[0.02em] text-white shadow-sm ${
              formattedBadge === "NEW"
                ? "bg-[#e77d22]"
                : "bg-[#ef3e32]"
            }`}
          >
            {formattedBadge}
          </motion.div>
        )}

        {/* ===================================================
            FAVORITE
        =================================================== */}

        <motion.button
          type="button"
          onClick={handleFavorite}
          whileTap={{
            scale: 0.78,
          }}
          aria-label={
            favorite
              ? "Remove from favorites"
              : "Add to favorites"
          }
          className={`absolute right-2.5 top-2.5 flex h-8 w-8 items-center justify-center rounded-full border shadow-sm backdrop-blur-md transition-all duration-200 ${
            favorite
              ? "border-[#ef3e32] bg-[#ef3e32] text-white"
              : "border-[#e4ded8] bg-white/95 text-[#706760]"
          }`}
        >
          <motion.div
            animate={
              favorite
                ? {
                    scale: [1, 1.25, 1],
                  }
                : {
                    scale: 1,
                  }
            }
            transition={{
              duration: 0.3,
            }}
          >
            <FiHeart
              size={15}
              strokeWidth={2}
              className={
                favorite
                  ? "fill-current"
                  : ""
              }
            />
          </motion.div>
        </motion.button>

        {/* ===================================================
            VEG INDICATOR
        =================================================== */}

        <div className="absolute bottom-2.5 left-2.5 flex h-[18px] items-center gap-1 rounded-[5px] border border-[#d8e8dd] bg-white/95 px-1.5 shadow-sm backdrop-blur-sm">
          <span className="flex h-[10px] w-[10px] items-center justify-center rounded-[2px] border border-[#2f9b61]">
            <span className="h-[5px] w-[5px] rounded-full bg-[#2f9b61]" />
          </span>

          <span className="text-[7px] font-extrabold uppercase tracking-wide text-[#2f8f5b]">
            Veg
          </span>
        </div>
      </div>

      {/* =====================================================
          CARD CONTENT
      ===================================================== */}

      <div className="flex min-h-[174px] flex-col px-3 pb-3 pt-2.5">

        {/* RATING */}

        <div className="mb-1.5 flex h-[19px] items-center">
          <div className="flex h-[19px] items-center gap-1 rounded-[5px] bg-[#fff5df] px-1.5 text-[8px] font-extrabold text-[#8a6100]">
            <FiStar
              size={9}
              className="fill-current"
            />

            <span>
              {pizza.rating}
            </span>
          </div>

          {pizza.reviewCount && (
            <span className="ml-1 text-[8px] text-[#aaa099]">
              {pizza.reviewCount}
            </span>
          )}
        </div>

        {/* NAME */}

        <h3 className="truncate text-[13px] font-extrabold leading-[17px] text-[#29231f]">
          {pizza.name}
        </h3>

        {/* DESCRIPTION */}

        <p className="mt-[3px] line-clamp-2 min-h-[26px] text-[9px] leading-[13px] text-[#948981]">
          {pizza.description}
        </p>

        {/* ===================================================
            SIZE SELECTOR
        =================================================== */}

        <div className="mt-2 flex items-center gap-1.5 overflow-x-auto pb-0.5 hide-scrollbar">
          {availableSizes.map(
            (size) => {
              const isSelected =
                selectedSize ===
                size.name;

              return (
                <motion.button
                  key={size.name}
                  type="button"
                  whileTap={{
                    scale: 0.9,
                  }}
                  onClick={(event) =>
                    handleSizeChange(
                      event,
                      size.name
                    )
                  }
                  className={`flex h-7 flex-shrink-0 items-center justify-center rounded-full border px-2.5 text-[7.5px] font-extrabold transition-all duration-200 ${
                    isSelected
                      ? "border-[#ef3e32] bg-[#ef3e32] text-white shadow-[0_3px_8px_rgba(239,62,50,0.15)]"
                      : "border-[#e7ddd5] bg-[#fffaf6] text-[#81756d]"
                  }`}
                >
                  {size.name}
                </motion.button>
              );
            }
          )}
        </div>

        {/* ===================================================
            PRICE + ADD
        =================================================== */}

        <div className="mt-auto flex items-end justify-between gap-2 pt-2.5">

          {/* PRICE */}

          <div className="min-w-0">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentPrice}
                initial={{
                  opacity: 0,
                  y: 5,
                  scale: 0.94,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                  scale: 1,
                }}
                exit={{
                  opacity: 0,
                  y: -5,
                }}
                transition={{
                  duration: 0.18,
                }}
                className="text-[16px] font-extrabold leading-none text-[#29231f]"
              >
                ₹{currentPrice}
              </motion.div>
            </AnimatePresence>

            <div className="mt-1 max-w-[82px] truncate text-[7.5px] font-medium leading-[10px] text-[#9e938b]">
              {selectedSize} · {crust}
            </div>
          </div>

          {/* ADD BUTTON */}

          <motion.button
            type="button"
            onClick={handleAdd}
            whileHover={{
              scale: 1.04,
            }}
            whileTap={{
              scale: 0.88,
            }}
            className={`flex h-[34px] min-w-[59px] flex-shrink-0 items-center justify-center rounded-full px-2.5 text-white shadow-sm transition-all duration-200 ${
              added
                ? "bg-[#2f8f5b]"
                : "bg-[#ef3e32] hover:shadow-[0_5px_13px_rgba(239,62,50,0.20)]"
            }`}
          >
            <AnimatePresence mode="wait">
              {added ? (
                <motion.div
                  key="added"
                  initial={{
                    opacity: 0,
                    scale: 0.65,
                  }}
                  animate={{
                    opacity: 1,
                    scale: 1,
                  }}
                  exit={{
                    opacity: 0,
                    scale: 0.65,
                  }}
                  className="flex items-center gap-1"
                >
                  <FiCheck
                    size={13}
                    strokeWidth={2.8}
                  />

                  <span className="text-[9px] font-extrabold">
                    Added
                  </span>
                </motion.div>
              ) : (
                <motion.div
                  key="add"
                  initial={{
                    opacity: 0,
                    scale: 0.7,
                  }}
                  animate={{
                    opacity: 1,
                    scale: 1,
                  }}
                  className="flex items-center gap-1"
                >
                  <FiPlus
                    size={14}
                    strokeWidth={2.7}
                  />

                  <span className="text-[9px] font-extrabold">
                    Add
                  </span>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.button>
        </div>
      </div>

      {/* =====================================================
          HOVER ACCENT
      ===================================================== */}

      <motion.div
        className="absolute bottom-0 left-0 h-[2px] w-full origin-left bg-[#ef3e32]"
        initial={{
          scaleX: 0,
        }}
        whileHover={{
          scaleX: 1,
        }}
        transition={{
          duration: 0.25,
        }}
      />
    </motion.article>
  );
}
import { AnimatePresence, motion } from "framer-motion";
import {
  FiArrowLeft,
  FiArrowRight,
  FiCheck,
  FiChevronRight,
  FiMinus,
  FiPlus,
  FiShoppingBag,
  FiTag,
  FiTrash2,
  FiX,
} from "react-icons/fi";
import { useState } from "react";

import { useCart } from "../context/CartContext";
import BottomNavigation from "../components/BottomNavigation";

export default function Cart({ goBack, navigate }) {
  const {
    cartItems,
    updateQuantity,
    removeFromCart,
    clearCart,

    coupon,
    setCoupon,

    couponApplied,
    couponSelected,
    couponValid,
    couponInvalid,

    subtotal,
    deliveryFee,
    discount,
    total,

    amountForFreeDelivery,
    freeDeliveryProgress,

    bogoNeedsMorePizza,
    bogoQualified,
    bogoDiscount,
    bogoFreeCount,
  } = useCart();

  const [couponInput, setCouponInput] =
    useState(coupon || "");

  const [couponMessage, setCouponMessage] =
    useState("");

  const [showClearConfirm, setShowClearConfirm] =
    useState(false);

  /* =========================================================
     COUPON
  ========================================================= */

  const handleApplyCoupon = () => {
    const code = couponInput.trim().toUpperCase();

    if (!code) {
      setCoupon("");
      setCouponMessage("");
      return;
    }

    setCoupon(code);

    if (code === "BOGO") {
      if (cartItems.length === 0) {
        setCouponMessage(
          "Add pizzas to use the BOGO offer."
        );
      } else {
        setCouponMessage(
          "BOGO offer selected."
        );
      }

      return;
    }

    if (
      code === "CRUST20" ||
      code === "WELCOME100"
    ) {
      setCouponMessage(
        `${code} applied successfully.`
      );
      return;
    }

    setCouponMessage(
      "Invalid coupon code."
    );
  };

  const handleRemoveCoupon = () => {
    setCoupon("");
    setCouponInput("");
    setCouponMessage("");
  };

  /* =========================================================
     CHECKOUT
  ========================================================= */

  const handleCheckout = () => {
    if (!cartItems.length) {
      return;
    }

    navigate("checkout");
  };

  /* =========================================================
     EMPTY CART
  ========================================================= */

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-[#fff9f0] pb-24">
        {/* HEADER */}

        <header className="sticky top-0 z-40 border-b border-[#eadfd3] bg-[#fff9f0]/95 px-4 py-4 backdrop-blur-xl">
          <div className="flex items-center gap-3">
            <motion.button
              type="button"
              whileTap={{ scale: 0.88 }}
              onClick={goBack}
              aria-label="Go back"
              className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full border border-[#eadfd3] bg-white text-[#29231f] shadow-sm"
            >
              <FiArrowLeft size={18} />
            </motion.button>

            <div>
              <p className="text-[8px] font-extrabold uppercase tracking-[0.2em] text-[#ef3e32]">
                Crust & Co.
              </p>

              <h1 className="text-[20px] font-extrabold tracking-[-0.04em] text-[#29231f]">
                Your Cart
              </h1>
            </div>
          </div>
        </header>

        {/* EMPTY STATE */}

        <main className="flex min-h-[calc(100vh-150px)] flex-col items-center justify-center px-6 text-center">
          <motion.div
            initial={{
              opacity: 0,
              scale: 0.7,
              y: 15,
            }}
            animate={{
              opacity: 1,
              scale: 1,
              y: 0,
            }}
            transition={{
              duration: 0.5,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="flex h-24 w-24 items-center justify-center rounded-full bg-[#fff0eb] text-[#ef3e32]"
          >
            <FiShoppingBag size={34} />
          </motion.div>

          <motion.div
            initial={{
              opacity: 0,
              y: 12,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              delay: 0.12,
            }}
          >
            <h2 className="mt-6 text-[22px] font-extrabold tracking-[-0.03em] text-[#29231f]">
              Your cart is empty
            </h2>

            <p className="mx-auto mt-2 max-w-[280px] text-[11px] leading-5 text-[#958980]">
              Your next pizza night is waiting.
              Add something delicious to get
              started.
            </p>

            <motion.button
              type="button"
              whileTap={{ scale: 0.95 }}
              whileHover={{ y: -2 }}
              onClick={goBack}
              className="mt-7 flex h-12 items-center justify-center gap-2 rounded-full bg-[#ef3e32] px-7 text-[11px] font-extrabold text-white shadow-[0_8px_20px_rgba(239,62,50,0.18)]"
            >
              Browse Pizzas
              <FiArrowRight size={15} />
            </motion.button>
          </motion.div>
        </main>

        <BottomNavigation
          active="cart"
          navigate={navigate}
        />
      </div>
    );
  }

  /* =========================================================
     CART PAGE
  ========================================================= */

  return (
    <div className="min-h-screen bg-[#fff9f0] pb-32">
      {/* =====================================================
          HEADER
      ===================================================== */}

      <header className="sticky top-0 z-40 border-b border-[#eadfd3] bg-[#fff9f0]/95 px-4 py-4 backdrop-blur-xl">
        <div className="flex items-center gap-3">
          <motion.button
            type="button"
            whileTap={{ scale: 0.88 }}
            onClick={goBack}
            aria-label="Go back"
            className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full border border-[#eadfd3] bg-white text-[#29231f] shadow-sm"
          >
            <FiArrowLeft size={18} />
          </motion.button>

          <div className="min-w-0 flex-1">
            <p className="text-[8px] font-extrabold uppercase tracking-[0.2em] text-[#ef3e32]">
              Crust & Co.
            </p>

            <h1 className="truncate text-[20px] font-extrabold tracking-[-0.04em] text-[#29231f]">
              Your Cart
            </h1>
          </div>

          <span className="rounded-full bg-[#fff0eb] px-3 py-2 text-[8px] font-extrabold text-[#ef3e32]">
            {cartItems.length}{" "}
            {cartItems.length === 1
              ? "item"
              : "items"}
          </span>
        </div>
      </header>

      <main className="px-4 pt-5">
        {/* ===================================================
            FREE DELIVERY PROGRESS
        =================================================== */}

        <motion.section
          initial={{
            opacity: 0,
            y: 10,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          className="rounded-[20px] border border-[#eadfd3] bg-white p-4 shadow-[0_3px_12px_rgba(43,30,20,0.04)]"
        >
          <div className="flex items-center justify-between gap-3">
            <div>
              <p className="text-[9px] font-extrabold uppercase tracking-[0.15em] text-[#ef3e32]">
                Free delivery
              </p>

              <p className="mt-1 text-[10px] font-bold text-[#5f544c]">
                {amountForFreeDelivery > 0
                  ? `Add ₹${amountForFreeDelivery.toLocaleString(
                      "en-IN"
                    )} more`
                  : "You unlocked free delivery!"}
              </p>
            </div>

            <div
              className={`flex h-9 w-9 items-center justify-center rounded-full ${
                amountForFreeDelivery > 0
                  ? "bg-[#fff0eb] text-[#ef3e32]"
                  : "bg-[#effaf3] text-[#2f8f5b]"
              }`}
            >
              {amountForFreeDelivery > 0 ? (
                <FiArrowRight size={15} />
              ) : (
                <FiCheck size={16} />
              )}
            </div>
          </div>

          <div className="mt-3 h-2 overflow-hidden rounded-full bg-[#f1e9e2]">
            <motion.div
              initial={{
                width: 0,
              }}
              animate={{
                width: `${freeDeliveryProgress}%`,
              }}
              transition={{
                duration: 0.8,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="h-full rounded-full bg-[#ef3e32]"
            />
          </div>

          <div className="mt-2 flex items-center justify-between">
            <span className="text-[7px] font-bold uppercase tracking-wide text-[#b0a49c]">
              ₹0
            </span>

            <span className="text-[7px] font-bold uppercase tracking-wide text-[#b0a49c]">
              ₹499
            </span>
          </div>
        </motion.section>

        {/* ===================================================
            CART ITEMS
        =================================================== */}

        <section className="mt-5">
          <div className="mb-3 flex items-end justify-between">
            <div>
              <p className="text-[8px] font-extrabold uppercase tracking-[0.18em] text-[#ef3e32]">
                Your selection
              </p>

              <h2 className="mt-1 text-[18px] font-extrabold tracking-[-0.03em] text-[#29231f]">
                {cartItems.length}{" "}
                {cartItems.length === 1
                  ? "item"
                  : "items"}{" "}
                in your cart
              </h2>
            </div>

            <button
              type="button"
              onClick={() =>
                setShowClearConfirm(true)
              }
              className="text-[8px] font-extrabold uppercase tracking-wide text-[#a59a92]"
            >
              Clear all
            </button>
          </div>

          <div className="space-y-3">
            {cartItems.map((item, index) => (
              <motion.article
                key={item.cartId}
                layout
                initial={{
                  opacity: 0,
                  y: 12,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                exit={{
                  opacity: 0,
                  x: -20,
                  height: 0,
                  marginBottom: 0,
                }}
                transition={{
                  delay: index * 0.04,
                }}
                className="overflow-hidden rounded-[20px] border border-[#eadfd3] bg-white p-3 shadow-[0_3px_12px_rgba(43,30,20,0.045)]"
              >
                <div className="flex gap-3">
                  {/* IMAGE */}

                  <div className="relative h-[88px] w-[88px] flex-shrink-0 overflow-hidden rounded-[15px] bg-[#f3e7dc]">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="h-full w-full object-cover"
                    />

                    {item.category ===
                      "pizzas" && (
                      <div className="absolute bottom-2 left-2 flex h-[17px] items-center gap-1 rounded-[5px] bg-white/95 px-1.5 shadow-sm">
                        <span className="flex h-[9px] w-[9px] items-center justify-center rounded-[2px] border border-[#2f9b61]">
                          <span className="h-[4px] w-[4px] rounded-full bg-[#2f9b61]" />
                        </span>

                        <span className="text-[6px] font-extrabold uppercase text-[#2f8f5b]">
                          Veg
                        </span>
                      </div>
                    )}
                  </div>

                  {/* CONTENT */}

                  <div className="min-w-0 flex-1">
                    <div className="flex items-start gap-2">
                      <div className="min-w-0 flex-1">
                        <h3 className="truncate text-[13px] font-extrabold text-[#29231f]">
                          {item.name}
                        </h3>

                        <p className="mt-1 truncate text-[8px] text-[#9d928a]">
                          {item.size} ·{" "}
                          {item.crust}
                        </p>
                      </div>

                      <button
                        type="button"
                        onClick={() =>
                          removeFromCart(
                            item.cartId
                          )
                        }
                        aria-label={`Remove ${item.name}`}
                        className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-[#f8f2ed] text-[#9d928a] transition-colors hover:bg-[#fff0eb] hover:text-[#ef3e32]"
                      >
                        <FiTrash2 size={12} />
                      </button>
                    </div>

                    <div className="mt-4 flex items-center justify-between gap-2">
                      {/* QUANTITY */}

                      <div className="flex h-8 items-center rounded-full border border-[#e8ded6] bg-[#fffaf6]">
                        <button
                          type="button"
                          onClick={() =>
                            updateQuantity(
                              item.cartId,
                              -1
                            )
                          }
                          className="flex h-8 w-8 items-center justify-center text-[#756b64]"
                        >
                          <FiMinus size={12} />
                        </button>

                        <span className="w-6 text-center text-[10px] font-extrabold text-[#29231f]">
                          {item.quantity}
                        </span>

                        <button
                          type="button"
                          onClick={() =>
                            updateQuantity(
                              item.cartId,
                              1
                            )
                          }
                          className="flex h-8 w-8 items-center justify-center text-[#756b64]"
                        >
                          <FiPlus size={12} />
                        </button>
                      </div>

                      {/* PRICE */}

                      <div className="text-right">
                        <p className="text-[14px] font-extrabold text-[#29231f]">
                          ₹
                          {(
                            Number(item.price) *
                            Number(
                              item.quantity
                            )
                          ).toLocaleString(
                            "en-IN"
                          )}
                        </p>

                        <p className="mt-0.5 text-[7px] text-[#aaa098]">
                          ₹
                          {Number(
                            item.price
                          ).toLocaleString(
                            "en-IN"
                          )}{" "}
                          each
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </section>

        {/* ===================================================
            BOGO
        =================================================== */}

        {coupon === "BOGO" && (
          <motion.section
            initial={{
              opacity: 0,
              y: 12,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            className={`mt-5 overflow-hidden rounded-[20px] border p-4 ${
              bogoQualified
                ? "border-[#cce7d7] bg-[#effaf3]"
                : "border-[#f1dfc5] bg-[#fff8ed]"
            }`}
          >
            <div className="flex items-start gap-3">
              <motion.div
                animate={
                  bogoQualified
                    ? {
                        scale: [1, 1.12, 1],
                      }
                    : {
                        y: [0, -3, 0],
                      }
                }
                transition={{
                  duration: 1.4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className={`flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full ${
                  bogoQualified
                    ? "bg-[#2f8f5b] text-white"
                    : "bg-[#fff0df] text-[#d27c17]"
                }`}
              >
                {bogoQualified ? (
                  <FiCheck
                    size={18}
                    strokeWidth={2.7}
                  />
                ) : (
                  <FiTag size={17} />
                )}
              </motion.div>

              <div className="min-w-0 flex-1">
                {bogoQualified ? (
                  <>
                    <div className="flex items-center justify-between gap-2">
                      <p className="text-[12px] font-extrabold text-[#276d47]">
                        BOGO applied
                      </p>

                      <span className="rounded-full bg-[#dff2e6] px-2.5 py-1 text-[7px] font-extrabold uppercase text-[#2f8f5b]">
                        {bogoFreeCount}{" "}
                        free
                      </span>
                    </div>

                    <p className="mt-1 text-[9px] leading-[14px] text-[#6d8a79]">
                      Buy one qualifying pizza
                      and get the next one free.
                    </p>

                    <div className="mt-3 flex items-center justify-between">
                      <span className="text-[8px] font-bold text-[#6d8a79]">
                        BOGO savings
                      </span>

                      <span className="text-[11px] font-extrabold text-[#2f8f5b]">
                        -₹
                        {bogoDiscount.toLocaleString(
                          "en-IN"
                        )}
                      </span>
                    </div>
                  </>
                ) : (
                  <>
                    <p className="text-[12px] font-extrabold text-[#8a6100]">
                      BOGO offer selected
                    </p>

                    <p className="mt-1 text-[9px] leading-[14px] text-[#a58b63]">
                      Add one more qualifying pizza
                      to unlock your free pizza.
                    </p>

                    <button
                      type="button"
                      onClick={goBack}
                      className="mt-3 flex items-center gap-1 text-[8px] font-extrabold uppercase tracking-wide text-[#d27c17]"
                    >
                      Add another pizza
                      <FiChevronRight
                        size={12}
                      />
                    </button>
                  </>
                )}
              </div>
            </div>
          </motion.section>
        )}

        {/* ===================================================
            COUPON
        =================================================== */}

        <section className="mt-5">
          <div className="mb-3">
            <p className="text-[8px] font-extrabold uppercase tracking-[0.18em] text-[#ef3e32]">
              Save on your order
            </p>

            <h2 className="mt-1 text-[18px] font-extrabold tracking-[-0.03em] text-[#29231f]">
              Promo code
            </h2>
          </div>

          <div className="rounded-[20px] border border-[#eadfd3] bg-white p-4 shadow-[0_3px_12px_rgba(43,30,20,0.035)]">
            {!couponSelected ? (
              <div className="flex items-center gap-2">
                <div className="flex h-11 min-w-0 flex-1 items-center gap-2 rounded-full border border-[#e8ded6] bg-[#fffaf6] px-4">
                  <FiTag
                    size={14}
                    className="flex-shrink-0 text-[#9b9088]"
                  />

                  <input
                    type="text"
                    value={couponInput}
                    onChange={(e) =>
                      setCouponInput(
                        e.target.value.toUpperCase()
                      )
                    }
                    onKeyDown={(e) => {
                      if (
                        e.key === "Enter"
                      ) {
                        handleApplyCoupon();
                      }
                    }}
                    placeholder="Enter coupon code"
                    className="min-w-0 flex-1 bg-transparent text-[10px] font-bold text-[#29231f] outline-none"
                  />
                </div>

                <button
                  type="button"
                  onClick={handleApplyCoupon}
                  className="flex h-11 flex-shrink-0 items-center justify-center rounded-full bg-[#29231f] px-5 text-[9px] font-extrabold text-white"
                >
                  Apply
                </button>
              </div>
            ) : (
              <div
                className={`flex items-center gap-3 rounded-[15px] p-3 ${
                  couponApplied
                    ? "bg-[#effaf3]"
                    : "bg-[#fff8ed]"
                }`}
              >
                <div
                  className={`flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full ${
                    couponApplied
                      ? "bg-[#2f8f5b] text-white"
                      : "bg-[#fff0df] text-[#d27c17]"
                  }`}
                >
                  {couponApplied ? (
                    <FiCheck size={15} />
                  ) : (
                    <FiTag size={14} />
                  )}
                </div>

                <div className="min-w-0 flex-1">
                  <p
                    className={`text-[10px] font-extrabold ${
                      couponApplied
                        ? "text-[#276d47]"
                        : "text-[#8a6100]"
                    }`}
                  >
                    {coupon}
                  </p>

                  <p className="mt-0.5 text-[8px] text-[#958980]">
                    {coupon === "BOGO"
                      ? bogoQualified
                        ? "Buy one, get one free"
                        : "Add another pizza to activate"
                      : couponApplied
                      ? "Coupon applied successfully"
                      : "Coupon selected"}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={
                    handleRemoveCoupon
                  }
                  aria-label="Remove coupon"
                  className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-white text-[#8f837a] shadow-sm"
                >
                  <FiX size={13} />
                </button>
              </div>
            )}

            {couponMessage && (
              <p
                className={`mt-2 px-2 text-[8px] font-bold ${
                  couponInvalid
                    ? "text-[#ef3e32]"
                    : "text-[#8d8179]"
                }`}
              >
                {couponMessage}
              </p>
            )}

            {/* QUICK COUPONS */}

            <div className="mt-3 flex gap-2 overflow-x-auto pb-1">
              {[
                {
                  code: "BOGO",
                  label: "Buy 1 Get 1",
                },
                {
                  code: "CRUST20",
                  label: "20% OFF",
                },
                {
                  code: "WELCOME100",
                  label: "₹100 OFF",
                },
              ].map((item) => (
                <button
                  key={item.code}
                  type="button"
                  onClick={() => {
                    setCouponInput(
                      item.code
                    );
                    setCoupon(
                      item.code
                    );

                    if (
                      item.code === "BOGO"
                    ) {
                      setCouponMessage(
                        "BOGO offer selected."
                      );
                    } else {
                      setCouponMessage(
                        `${item.code} applied successfully.`
                      );
                    }
                  }}
                  className="flex-shrink-0 rounded-full border border-[#eadfd3] bg-[#fffaf6] px-3 py-2 text-left"
                >
                  <span className="block text-[7px] font-extrabold text-[#29231f]">
                    {item.code}
                  </span>

                  <span className="mt-0.5 block text-[6px] font-medium text-[#aaa098]">
                    {item.label}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* ===================================================
            ORDER SUMMARY
        =================================================== */}

        <section className="mt-5">
          <div className="mb-3">
            <p className="text-[8px] font-extrabold uppercase tracking-[0.18em] text-[#ef3e32]">
              Final amount
            </p>

            <h2 className="mt-1 text-[18px] font-extrabold tracking-[-0.03em] text-[#29231f]">
              Order summary
            </h2>
          </div>

          <div className="rounded-[22px] border border-[#eadfd3] bg-white p-4 shadow-[0_3px_12px_rgba(43,30,20,0.035)]">
            {/* SUBTOTAL */}

            <div className="flex items-center justify-between">
              <span className="text-[10px] font-medium text-[#958980]">
                Subtotal
              </span>

              <span className="text-[11px] font-bold text-[#514840]">
                ₹
                {subtotal.toLocaleString(
                  "en-IN"
                )}
              </span>
            </div>

            {/* DELIVERY */}

            <div className="mt-3 flex items-center justify-between">
              <span className="text-[10px] font-medium text-[#958980]">
                Delivery
              </span>

              {deliveryFee === 0 ? (
                <span className="text-[10px] font-extrabold text-[#2f8f5b]">
                  FREE
                </span>
              ) : (
                <span className="text-[11px] font-bold text-[#514840]">
                  ₹
                  {deliveryFee.toLocaleString(
                    "en-IN"
                  )}
                </span>
              )}
            </div>

            {/* DISCOUNT */}

            <AnimatePresence>
              {discount > 0 && (
                <motion.div
                  initial={{
                    opacity: 0,
                    height: 0,
                    y: -5,
                  }}
                  animate={{
                    opacity: 1,
                    height: "auto",
                    y: 0,
                  }}
                  exit={{
                    opacity: 0,
                    height: 0,
                  }}
                  className="mt-3 flex items-center justify-between overflow-hidden"
                >
                  <span className="flex items-center gap-1.5 text-[10px] font-medium text-[#2f8f5b]">
                    <FiTag size={11} />
                    Discount
                  </span>

                  <span className="text-[11px] font-extrabold text-[#2f8f5b]">
                    -₹
                    {discount.toLocaleString(
                      "en-IN"
                    )}
                  </span>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="my-4 h-px bg-[#eee5dc]" />

            {/* TOTAL */}

            <div className="flex items-end justify-between gap-3">
              <div>
                <p className="text-[8px] font-extrabold uppercase tracking-[0.14em] text-[#958980]">
                  Total payable
                </p>

                <p className="mt-1 text-[8px] text-[#aaa098]">
                  Inclusive of applicable charges
                </p>
              </div>

              <motion.p
                key={total}
                initial={{
                  opacity: 0,
                  scale: 0.92,
                }}
                animate={{
                  opacity: 1,
                  scale: 1,
                }}
                className="text-[24px] font-extrabold tracking-[-0.04em] text-[#29231f]"
              >
                ₹
                {total.toLocaleString(
                  "en-IN"
                )}
              </motion.p>
            </div>

            {/* CHECKOUT */}

            <motion.button
              type="button"
              whileTap={{
                scale: 0.975,
              }}
              whileHover={{
                y: -2,
              }}
              onClick={handleCheckout}
              className="mt-5 flex h-[52px] w-full items-center justify-center gap-2 rounded-full bg-[#ef3e32] text-[10px] font-extrabold text-white shadow-[0_8px_20px_rgba(239,62,50,0.18)]"
            >
              Proceed to Checkout
              <FiArrowRight size={15} />
            </motion.button>

            <div className="mt-3 flex items-center justify-center gap-1.5 text-[7px] font-bold uppercase tracking-wide text-[#b0a49c]">
              <FiCheck size={9} />
              Freshly prepared
              <span>·</span>
              Secure checkout
            </div>
          </div>
        </section>

        {/* ===================================================
            CONTINUE SHOPPING
        =================================================== */}

        <motion.button
          type="button"
          whileTap={{
            scale: 0.98,
          }}
          onClick={goBack}
          className="mx-auto mt-6 flex items-center gap-2 text-[9px] font-extrabold uppercase tracking-[0.12em] text-[#756b64]"
        >
          <FiArrowLeft size={12} />
          Continue shopping
        </motion.button>

        <div className="h-8" />
      </main>

      {/* =====================================================
          CLEAR CART CONFIRMATION
      ===================================================== */}

      <AnimatePresence>
        {showClearConfirm && (
          <>
            <motion.button
              type="button"
              aria-label="Close confirmation"
              initial={{
                opacity: 0,
              }}
              animate={{
                opacity: 1,
              }}
              exit={{
                opacity: 0,
              }}
              onClick={() =>
                setShowClearConfirm(false)
              }
              className="fixed inset-0 z-[90] bg-black/45"
            />

            <motion.div
              initial={{
                opacity: 0,
                y: 25,
                scale: 0.96,
              }}
              animate={{
                opacity: 1,
                y: 0,
                scale: 1,
              }}
              exit={{
                opacity: 0,
                y: 20,
                scale: 0.97,
              }}
              transition={{
                duration: 0.25,
              }}
              className="fixed bottom-5 left-1/2 z-[100] w-[calc(100%-32px)] max-w-[398px] -translate-x-1/2 rounded-[25px] border border-[#eadfd3] bg-[#fff9f0] p-5 shadow-2xl"
            >
              <div className="flex items-start gap-3">
                <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-[#fff0eb] text-[#ef3e32]">
                  <FiTrash2 size={17} />
                </div>

                <div className="min-w-0 flex-1">
                  <h3 className="text-[14px] font-extrabold text-[#29231f]">
                    Clear your cart?
                  </h3>

                  <p className="mt-1 text-[9px] leading-4 text-[#958980]">
                    All selected pizzas and applied
                    offers will be removed.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() =>
                    setShowClearConfirm(false)
                  }
                  className="flex h-8 w-8 items-center justify-center rounded-full bg-white text-[#756b64]"
                >
                  <FiX size={14} />
                </button>
              </div>

              <div className="mt-5 flex gap-2">
                <button
                  type="button"
                  onClick={() =>
                    setShowClearConfirm(false)
                  }
                  className="flex h-11 flex-1 items-center justify-center rounded-full border border-[#e5dbd2] bg-white text-[9px] font-extrabold text-[#5f544c]"
                >
                  Keep Cart
                </button>

                <button
                  type="button"
                  onClick={() => {
                    clearCart();
                    setShowClearConfirm(
                      false
                    );
                  }}
                  className="flex h-11 flex-1 items-center justify-center rounded-full bg-[#ef3e32] text-[9px] font-extrabold text-white"
                >
                  Clear Cart
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* =====================================================
          BOTTOM NAV
      ===================================================== */}

      <BottomNavigation
        active="cart"
        navigate={navigate}
      />
    </div>
  );
}
import { useState } from "react";
import { motion } from "framer-motion";
import {
  FiArrowLeft,
  FiMapPin,
  FiCreditCard,
  FiCheck,
  FiChevronRight,
  FiShield,
} from "react-icons/fi";
import { useCart } from "../context/CartContext";

export default function Checkout({ goBack, navigate }) {
  const {
    cartItems,
    subtotal,
    deliveryFee,
    discount,
    total,
    clearCart,
  } = useCart();

  const [paymentMethod, setPaymentMethod] = useState("upi");
  const [address, setAddress] = useState({
    name: "",
    phone: "",
    house: "",
    street: "",
    city: "",
    pincode: "",
  });

  const [placingOrder, setPlacingOrder] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setAddress((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handlePlaceOrder = () => {
    if (
      !address.name ||
      !address.phone ||
      !address.house ||
      !address.street ||
      !address.city ||
      !address.pincode
    ) {
      alert("Please fill in all delivery details.");
      return;
    }

    if (cartItems.length === 0) {
      navigate("home");
      return;
    }

    setPlacingOrder(true);

    setTimeout(() => {
      clearCart();
      setPlacingOrder(false);
      navigate("success");
    }, 1200);
  };

  return (
    <div className="min-h-screen bg-[#fff8ed] pb-8">
      {/* HEADER */}
      <header className="sticky top-0 z-40 border-b border-[#eadfd3] bg-[#fff8ed]/95 px-4 py-4 backdrop-blur-md">
        <div className="flex items-center gap-3">
          <button
            onClick={goBack}
            className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-[#252525] shadow-sm"
            aria-label="Go back"
          >
            <FiArrowLeft size={20} />
          </button>

          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#ef3e32]">
              Crust & Co.
            </p>

            <h1 className="font-[Manrope] text-xl font-extrabold text-[#202020]">
              Checkout
            </h1>
          </div>
        </div>
      </header>

      <main className="space-y-5 px-4 py-5">
        {/* DELIVERY ADDRESS */}
        <motion.section
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
          className="rounded-3xl border border-[#eadfd3] bg-white p-4 shadow-sm"
        >
          <div className="mb-4 flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#fff0ed] text-[#ef3e32]">
              <FiMapPin size={21} />
            </div>

            <div>
              <h2 className="font-[Manrope] text-base font-extrabold text-[#202020]">
                Delivery Address
              </h2>

              <p className="text-xs text-[#8b8179]">
                Where should we deliver your pizza?
              </p>
            </div>
          </div>

          <div className="space-y-3">
            <input
              type="text"
              name="name"
              value={address.name}
              onChange={handleChange}
              placeholder="Full name"
              className="w-full rounded-2xl border border-[#eadfd3] bg-[#fffaf5] px-4 py-3 text-sm outline-none transition focus:border-[#ef3e32]"
            />

            <input
              type="tel"
              name="phone"
              value={address.phone}
              onChange={handleChange}
              placeholder="Phone number"
              maxLength={10}
              className="w-full rounded-2xl border border-[#eadfd3] bg-[#fffaf5] px-4 py-3 text-sm outline-none transition focus:border-[#ef3e32]"
            />

            <input
              type="text"
              name="house"
              value={address.house}
              onChange={handleChange}
              placeholder="House / Flat / Building"
              className="w-full rounded-2xl border border-[#eadfd3] bg-[#fffaf5] px-4 py-3 text-sm outline-none transition focus:border-[#ef3e32]"
            />

            <input
              type="text"
              name="street"
              value={address.street}
              onChange={handleChange}
              placeholder="Street / Area"
              className="w-full rounded-2xl border border-[#eadfd3] bg-[#fffaf5] px-4 py-3 text-sm outline-none transition focus:border-[#ef3e32]"
            />

            <div className="grid grid-cols-2 gap-3">
              <input
                type="text"
                name="city"
                value={address.city}
                onChange={handleChange}
                placeholder="City"
                className="w-full rounded-2xl border border-[#eadfd3] bg-[#fffaf5] px-4 py-3 text-sm outline-none transition focus:border-[#ef3e32]"
              />

              <input
                type="text"
                name="pincode"
                value={address.pincode}
                onChange={handleChange}
                placeholder="Pincode"
                maxLength={6}
                className="w-full rounded-2xl border border-[#eadfd3] bg-[#fffaf5] px-4 py-3 text-sm outline-none transition focus:border-[#ef3e32]"
              />
            </div>
          </div>
        </motion.section>

        {/* PAYMENT */}
        <motion.section
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, delay: 0.08 }}
          className="rounded-3xl border border-[#eadfd3] bg-white p-4 shadow-sm"
        >
          <div className="mb-4 flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#fff0ed] text-[#ef3e32]">
              <FiCreditCard size={21} />
            </div>

            <div>
              <h2 className="font-[Manrope] text-base font-extrabold text-[#202020]">
                Payment Method
              </h2>

              <p className="text-xs text-[#8b8179]">
                Choose your preferred payment option
              </p>
            </div>
          </div>

          <div className="space-y-3">
            {/* UPI */}
            <button
              type="button"
              onClick={() => setPaymentMethod("upi")}
              className={`flex w-full items-center justify-between rounded-2xl border p-4 text-left transition ${
                paymentMethod === "upi"
                  ? "border-[#ef3e32] bg-[#fff5f2]"
                  : "border-[#eadfd3] bg-white"
              }`}
            >
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#f4eee7] font-bold text-[#202020]">
                  UPI
                </div>

                <div>
                  <p className="text-sm font-bold text-[#202020]">
                    UPI Payment
                  </p>

                  <p className="text-xs text-[#8b8179]">
                    Google Pay, PhonePe, Paytm
                  </p>
                </div>
              </div>

              <div
                className={`flex h-6 w-6 items-center justify-center rounded-full border ${
                  paymentMethod === "upi"
                    ? "border-[#ef3e32] bg-[#ef3e32] text-white"
                    : "border-[#d9cec3]"
                }`}
              >
                {paymentMethod === "upi" && <FiCheck size={14} />}
              </div>
            </button>

            {/* CARD */}
            <button
              type="button"
              onClick={() => setPaymentMethod("card")}
              className={`flex w-full items-center justify-between rounded-2xl border p-4 text-left transition ${
                paymentMethod === "card"
                  ? "border-[#ef3e32] bg-[#fff5f2]"
                  : "border-[#eadfd3] bg-white"
              }`}
            >
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#f4eee7] text-[#202020]">
                  <FiCreditCard size={18} />
                </div>

                <div>
                  <p className="text-sm font-bold text-[#202020]">
                    Credit / Debit Card
                  </p>

                  <p className="text-xs text-[#8b8179]">
                    Visa, Mastercard, RuPay
                  </p>
                </div>
              </div>

              <div
                className={`flex h-6 w-6 items-center justify-center rounded-full border ${
                  paymentMethod === "card"
                    ? "border-[#ef3e32] bg-[#ef3e32] text-white"
                    : "border-[#d9cec3]"
                }`}
              >
                {paymentMethod === "card" && <FiCheck size={14} />}
              </div>
            </button>

            {/* COD */}
            <button
              type="button"
              onClick={() => setPaymentMethod("cod")}
              className={`flex w-full items-center justify-between rounded-2xl border p-4 text-left transition ${
                paymentMethod === "cod"
                  ? "border-[#ef3e32] bg-[#fff5f2]"
                  : "border-[#eadfd3] bg-white"
              }`}
            >
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#f4eee7] text-sm font-bold text-[#202020]">
                  ₹
                </div>

                <div>
                  <p className="text-sm font-bold text-[#202020]">
                    Cash on Delivery
                  </p>

                  <p className="text-xs text-[#8b8179]">
                    Pay when your order arrives
                  </p>
                </div>
              </div>

              <div
                className={`flex h-6 w-6 items-center justify-center rounded-full border ${
                  paymentMethod === "cod"
                    ? "border-[#ef3e32] bg-[#ef3e32] text-white"
                    : "border-[#d9cec3]"
                }`}
              >
                {paymentMethod === "cod" && <FiCheck size={14} />}
              </div>
            </button>
          </div>
        </motion.section>

        {/* ORDER ITEMS */}
        <motion.section
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, delay: 0.15 }}
          className="rounded-3xl border border-[#eadfd3] bg-white p-4 shadow-sm"
        >
          <div className="mb-4 flex items-center justify-between">
            <div>
              <h2 className="font-[Manrope] text-base font-extrabold text-[#202020]">
                Your Order
              </h2>

              <p className="text-xs text-[#8b8179]">
                {cartItems.length} item
                {cartItems.length !== 1 ? "s" : ""}
              </p>
            </div>

            <button
              onClick={() => navigate("cart")}
              className="flex items-center gap-1 text-xs font-bold text-[#ef3e32]"
            >
              Edit
              <FiChevronRight size={14} />
            </button>
          </div>

          <div className="space-y-3">
            {cartItems.map((item) => (
              <div
                key={item.cartId}
                className="flex items-center gap-3 rounded-2xl bg-[#fffaf5] p-3"
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="h-14 w-14 rounded-xl object-cover"
                />

                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-bold text-[#202020]">
                    {item.name}
                  </p>

                  <p className="mt-1 text-xs text-[#8b8179]">
                    Qty {item.quantity}
                  </p>
                </div>

                <p className="text-sm font-extrabold text-[#202020]">
                  ₹{item.price * item.quantity}
                </p>
              </div>
            ))}
          </div>
        </motion.section>

        {/* BILL */}
        <motion.section
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, delay: 0.2 }}
          className="rounded-3xl border border-[#eadfd3] bg-white p-4 shadow-sm"
        >
          <h2 className="mb-4 font-[Manrope] text-base font-extrabold text-[#202020]">
            Bill Details
          </h2>

          <div className="space-y-3 text-sm">
            <div className="flex justify-between">
              <span className="text-[#81776f]">Item total</span>
              <span className="font-semibold text-[#202020]">
                ₹{subtotal}
              </span>
            </div>

            <div className="flex justify-between">
              <span className="text-[#81776f]">Delivery fee</span>
              <span className="font-semibold text-[#202020]">
                {deliveryFee === 0 ? "FREE" : `₹${deliveryFee}`}
              </span>
            </div>

            {discount > 0 && (
              <div className="flex justify-between">
                <span className="text-[#81776f]">Discount</span>
                <span className="font-semibold text-green-600">
                  -₹{discount}
                </span>
              </div>
            )}

            <div className="border-t border-dashed border-[#dfd2c7] pt-3">
              <div className="flex items-center justify-between">
                <span className="font-[Manrope] text-base font-extrabold text-[#202020]">
                  Total
                </span>

                <span className="font-[Manrope] text-xl font-extrabold text-[#ef3e32]">
                  ₹{total}
                </span>
              </div>
            </div>
          </div>
        </motion.section>

        {/* SECURITY */}
        <div className="flex items-center gap-3 rounded-2xl bg-[#f4eee7] p-4">
          <FiShield className="shrink-0 text-[#ef3e32]" size={20} />

          <p className="text-xs leading-5 text-[#716860]">
            Your payment information is securely processed. We never store
            your card details.
          </p>
        </div>

        {/* PLACE ORDER */}
        <motion.button
          whileTap={{ scale: 0.97 }}
          onClick={handlePlaceOrder}
          disabled={placingOrder || cartItems.length === 0}
          className="flex w-full items-center justify-center gap-2 rounded-2xl bg-[#ef3e32] px-5 py-4 font-[Manrope] text-base font-extrabold text-white shadow-lg shadow-[#ef3e32]/20 transition hover:bg-[#d93228] disabled:cursor-not-allowed disabled:opacity-60"
        >
          {placingOrder ? (
            <>
              <motion.span
                animate={{ rotate: 360 }}
                transition={{
                  duration: 0.8,
                  repeat: Infinity,
                  ease: "linear",
                }}
                className="h-5 w-5 rounded-full border-2 border-white border-t-transparent"
              />
              Placing Order...
            </>
          ) : (
            <>
              Place Order · ₹{total}
              <FiChevronRight size={19} />
            </>
          )}
        </motion.button>
      </main>
    </div>
  );
}
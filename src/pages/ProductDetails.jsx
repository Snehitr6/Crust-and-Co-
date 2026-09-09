import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiArrowLeft,
  FiPlus,
  FiMinus,
  FiShoppingBag,
  FiHeart,
  FiStar,
  FiCheck,
} from "react-icons/fi";
import { useCart } from "../context/CartContext";

export default function ProductDetails({ pizza, goBack, navigate }) {
  const { addToCart } = useCart();

  const [size, setSize] = useState(
    pizza?.sizes?.[0]?.name || "Regular"
  );

  const [crust, setCrust] = useState(
    pizza?.crusts?.[0] || "Classic"
  );

  const [quantity, setQuantity] = useState(1);
  const [liked, setLiked] = useState(false);
  const [added, setAdded] = useState(false);

  if (!pizza) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#fff8ed] px-5">
        <div className="text-center">
          <div className="text-5xl">🍕</div>

          <h2 className="mt-4 font-[Manrope] text-xl font-extrabold text-[#202020]">
            Pizza not found
          </h2>

          <button
            type="button"
            onClick={() => navigate("home")}
            className="mt-5 rounded-xl bg-[#ef3e32] px-5 py-3 text-sm font-bold text-white"
          >
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  const selectedSize = pizza.sizes?.find(
    (item) => item.name === size
  );

  const sizePrice = selectedSize?.price ?? pizza.price ?? 0;

  const totalPrice = sizePrice * quantity;

  const handleAddToCart = () => {
    addToCart(pizza, {
      size,
      crust,
      quantity,
    });

    setAdded(true);

    setTimeout(() => {
      setAdded(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-[#fff8ed] pb-28">
      {/* TOP BAR */}
      <header className="absolute left-0 right-0 top-0 z-30 px-4 pt-4">
        <div className="flex items-center justify-between">
          <motion.button
            type="button"
            whileTap={{ scale: 0.9 }}
            onClick={goBack}
            className="flex h-11 w-11 items-center justify-center rounded-full bg-white/95 text-[#202020] shadow-lg backdrop-blur-md"
            aria-label="Go back"
          >
            <FiArrowLeft size={20} />
          </motion.button>

          <motion.button
            type="button"
            whileTap={{ scale: 0.9 }}
            onClick={() => setLiked((prev) => !prev)}
            className={`flex h-11 w-11 items-center justify-center rounded-full bg-white/95 shadow-lg backdrop-blur-md ${
              liked ? "text-[#ef3e32]" : "text-[#202020]"
            }`}
            aria-label="Favourite"
          >
            <FiHeart
              size={20}
              className={liked ? "fill-current" : ""}
            />
          </motion.button>
        </div>
      </header>

      {/* PRODUCT IMAGE */}
      <motion.div
        initial={{ opacity: 0, scale: 1.04 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.45 }}
        className="relative h-[350px] overflow-hidden bg-[#f1e7dc]"
      >
        <img
          src={pizza.image}
          alt={pizza.name}
          className="h-full w-full object-cover"
        />

        <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[#fff8ed] to-transparent" />

        {pizza.badge && (
          <div className="absolute bottom-8 left-4 rounded-full bg-[#ef3e32] px-3 py-1.5 text-[10px] font-extrabold uppercase tracking-wider text-white shadow-lg">
            {pizza.badge}
          </div>
        )}
      </motion.div>

      {/* CONTENT */}
      <main className="-mt-2 relative z-10 px-4">
        {/* TITLE */}
        <motion.section
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.4 }}
          className="rounded-t-[30px] bg-[#fff8ed] pt-2"
        >
          <div className="flex items-start justify-between gap-4">
            <div className="min-w-0">
              <div className="mb-2 flex items-center gap-2">
                {pizza.rating && (
                  <span className="flex items-center gap-1 rounded-full bg-white px-2.5 py-1 text-[10px] font-extrabold text-[#202020] shadow-sm">
                    <FiStar
                      size={11}
                      className="fill-[#f5b942] text-[#f5b942]"
                    />
                    {pizza.rating}
                  </span>
                )}

                <span className="rounded-full bg-[#f1e7dc] px-2.5 py-1 text-[10px] font-bold text-[#716860]">
                  Vegetarian
                </span>
              </div>

              <h1 className="font-[Manrope] text-2xl font-extrabold tracking-tight text-[#202020]">
                {pizza.name}
              </h1>

              <p className="mt-2 text-sm leading-6 text-[#81776f]">
                {pizza.description}
              </p>
            </div>

            <div className="shrink-0 text-right">
              <p className="text-[10px] font-bold uppercase tracking-wider text-[#9b9088]">
                From
              </p>

              <p className="font-[Manrope] text-xl font-extrabold text-[#ef3e32]">
                ₹{pizza.price}
              </p>
            </div>
          </div>
        </motion.section>

        {/* CUSTOMIZE */}
        <motion.section
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.22, duration: 0.4 }}
          className="mt-6"
        >
          <div className="mb-3">
            <h2 className="font-[Manrope] text-lg font-extrabold text-[#202020]">
              Customize your pizza
            </h2>

            <p className="mt-1 text-xs text-[#8b8179]">
              Make it exactly how you like it.
            </p>
          </div>

          {/* SIZE */}
          <div className="rounded-3xl border border-[#eadfd3] bg-white p-4 shadow-sm">
            <div className="mb-3 flex items-center justify-between">
              <h3 className="text-sm font-extrabold text-[#202020]">
                Choose size
              </h3>

              <span className="text-[10px] font-bold uppercase tracking-wider text-[#a49a91]">
                Required
              </span>
            </div>

            <div className="grid grid-cols-3 gap-2">
              {(pizza.sizes || []).map((item) => {
                const active = size === item.name;

                return (
                  <button
                    key={item.name}
                    type="button"
                    onClick={() => setSize(item.name)}
                    className={`rounded-2xl border px-2 py-3 transition ${
                      active
                        ? "border-[#ef3e32] bg-[#fff0ed]"
                        : "border-[#eadfd3] bg-white"
                    }`}
                  >
                    <div
                      className={`mx-auto mb-2 flex h-9 w-9 items-center justify-center rounded-full ${
                        active
                          ? "bg-[#ef3e32] text-white"
                          : "bg-[#f4eee7] text-[#716860]"
                      }`}
                    >
                      <span className="text-xs font-extrabold">
                        {item.name === "Regular"
                          ? "R"
                          : item.name === "Medium"
                          ? "M"
                          : "L"}
                      </span>
                    </div>

                    <p
                      className={`text-[10px] font-extrabold ${
                        active
                          ? "text-[#ef3e32]"
                          : "text-[#202020]"
                      }`}
                    >
                      {item.name}
                    </p>

                    <p className="mt-1 text-[10px] text-[#8b8179]">
                      ₹{item.price}
                    </p>
                  </button>
                );
              })}
            </div>
          </div>

          {/* CRUST */}
          <div className="mt-3 rounded-3xl border border-[#eadfd3] bg-white p-4 shadow-sm">
            <div className="mb-3 flex items-center justify-between">
              <h3 className="text-sm font-extrabold text-[#202020]">
                Choose crust
              </h3>

              <span className="text-[10px] font-bold uppercase tracking-wider text-[#a49a91]">
                Required
              </span>
            </div>

            <div className="space-y-2">
              {(pizza.crusts || []).map((item) => {
                const active = crust === item;

                return (
                  <button
                    key={item}
                    type="button"
                    onClick={() => setCrust(item)}
                    className={`flex w-full items-center justify-between rounded-2xl border p-3 text-left transition ${
                      active
                        ? "border-[#ef3e32] bg-[#fff0ed]"
                        : "border-[#eadfd3] bg-white"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span
                        className={`flex h-9 w-9 items-center justify-center rounded-xl ${
                          active
                            ? "bg-[#ef3e32] text-white"
                            : "bg-[#f4eee7] text-[#716860]"
                        }`}
                      >
                        🍞
                      </span>

                      <span>
                        <span
                          className={`block text-xs font-extrabold ${
                            active
                              ? "text-[#ef3e32]"
                              : "text-[#202020]"
                          }`}
                        >
                          {item}
                        </span>

                        <span className="mt-0.5 block text-[10px] text-[#8b8179]">
                          Freshly prepared
                        </span>
                      </span>
                    </div>

                    <span
                      className={`flex h-6 w-6 items-center justify-center rounded-full border ${
                        active
                          ? "border-[#ef3e32] bg-[#ef3e32] text-white"
                          : "border-[#d9cec3]"
                      }`}
                    >
                      {active && <FiCheck size={13} />}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </motion.section>

        {/* TOPPINGS */}
        {pizza.toppings?.length > 0 && (
          <motion.section
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.4 }}
            className="mt-5 rounded-3xl border border-[#eadfd3] bg-white p-4 shadow-sm"
          >
            <h3 className="text-sm font-extrabold text-[#202020]">
              What's on it?
            </h3>

            <div className="mt-3 flex flex-wrap gap-2">
              {pizza.toppings.map((topping) => (
                <span
                  key={topping}
                  className="rounded-full bg-[#fff5ed] px-3 py-2 text-[10px] font-bold text-[#716860]"
                >
                  {topping}
                </span>
              ))}
            </div>
          </motion.section>
        )}

        {/* QUANTITY */}
        <motion.section
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.36, duration: 0.4 }}
          className="mt-5 flex items-center justify-between rounded-3xl border border-[#eadfd3] bg-white p-4 shadow-sm"
        >
          <div>
            <h3 className="text-sm font-extrabold text-[#202020]">
              Quantity
            </h3>

            <p className="mt-1 text-[10px] text-[#8b8179]">
              How many pizzas?
            </p>
          </div>

          <div className="flex items-center gap-3 rounded-2xl bg-[#f4eee7] p-1.5">
            <button
              type="button"
              onClick={() =>
                setQuantity((prev) => Math.max(1, prev - 1))
              }
              className="flex h-9 w-9 items-center justify-center rounded-xl bg-white text-[#202020] shadow-sm"
            >
              <FiMinus size={15} />
            </button>

            <span className="w-6 text-center text-sm font-extrabold text-[#202020]">
              {quantity}
            </span>

            <button
              type="button"
              onClick={() =>
                setQuantity((prev) => Math.min(10, prev + 1))
              }
              className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#ef3e32] text-white shadow-sm"
            >
              <FiPlus size={15} />
            </button>
          </div>
        </motion.section>
      </main>

      {/* FIXED ADD TO CART */}
      <div className="fixed bottom-0 left-1/2 z-40 w-full max-w-[430px] -translate-x-1/2 border-t border-[#eadfd3] bg-[#fff8ed]/95 px-4 py-3 backdrop-blur-xl">
        <motion.button
          type="button"
          whileTap={{ scale: 0.97 }}
          onClick={handleAddToCart}
          className={`flex w-full items-center justify-between rounded-2xl px-5 py-4 font-[Manrope] text-sm font-extrabold text-white shadow-lg transition ${
            added
              ? "bg-green-500 shadow-green-500/20"
              : "bg-[#ef3e32] shadow-[#ef3e32]/20"
          }`}
        >
          <span className="flex items-center gap-2">
            <AnimatePresence mode="wait">
              {added ? (
                <motion.span
                  key="added"
                  initial={{ opacity: 0, scale: 0.7 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex items-center gap-2"
                >
                  <FiCheck size={18} />
                  Added to cart
                </motion.span>
              ) : (
                <motion.span
                  key="add"
                  initial={{ opacity: 0, scale: 0.7 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex items-center gap-2"
                >
                  <FiShoppingBag size={18} />
                  Add to cart
                </motion.span>
              )}
            </AnimatePresence>
          </span>

          <span>₹{totalPrice}</span>
        </motion.button>
      </div>
    </div>
  );
}
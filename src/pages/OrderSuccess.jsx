import { motion } from "framer-motion";
import {
  FiCheck,
  FiHome,
  FiShoppingBag,
  FiClock,
  FiMapPin,
} from "react-icons/fi";

export default function OrderSuccess({ navigate }) {
  const orderNumber = `CC${Math.floor(100000 + Math.random() * 900000)}`;

  return (
    <div className="flex min-h-screen flex-col bg-[#fff8ed] px-5 py-8">
      {/* SUCCESS ICON */}
      <div className="flex flex-1 flex-col items-center justify-center">
        <motion.div
          initial={{ scale: 0, rotate: -20 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{
            type: "spring",
            stiffness: 220,
            damping: 15,
          }}
          className="relative flex h-28 w-28 items-center justify-center rounded-full bg-[#ef3e32]/10"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{
              delay: 0.2,
              duration: 0.4,
            }}
            className="flex h-20 w-20 items-center justify-center rounded-full bg-[#ef3e32] text-white shadow-xl shadow-[#ef3e32]/25"
          >
            <FiCheck size={38} strokeWidth={3} />
          </motion.div>

          {/* DECORATION */}
          <motion.span
            animate={{
              y: [0, -8, 0],
              rotate: [0, 10, 0],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
            }}
            className="absolute -right-2 -top-2 text-2xl"
          >
            ✨
          </motion.span>

          <motion.span
            animate={{
              y: [0, 7, 0],
              rotate: [0, -8, 0],
            }}
            transition={{
              duration: 2.4,
              repeat: Infinity,
            }}
            className="absolute -bottom-1 -left-3 text-xl"
          >
            🍕
          </motion.span>
        </motion.div>

        {/* TITLE */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35, duration: 0.4 }}
          className="mt-7 text-center"
        >
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#ef3e32]">
            Order confirmed
          </p>

          <h1 className="mt-2 font-[Manrope] text-3xl font-extrabold tracking-tight text-[#202020]">
            Pizza is on
            <br />
            <span className="text-[#ef3e32]">the way!</span>
          </h1>

          <p className="mx-auto mt-3 max-w-[290px] text-sm leading-6 text-[#81776f]">
            Thanks for ordering from Crust & Co. Your freshly baked pizza is
            being prepared right now.
          </p>
        </motion.div>

        {/* ORDER CARD */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.4 }}
          className="mt-7 w-full rounded-3xl border border-[#eadfd3] bg-white p-5 shadow-sm"
        >
          <div className="flex items-center justify-between border-b border-dashed border-[#dfd2c7] pb-4">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-wider text-[#9b9088]">
                Order number
              </p>

              <p className="mt-1 font-[Manrope] text-base font-extrabold text-[#202020]">
                #{orderNumber}
              </p>
            </div>

            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#fff0ed] text-[#ef3e32]">
              <FiShoppingBag size={19} />
            </div>
          </div>

          <div className="space-y-4 pt-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#f4eee7] text-[#ef3e32]">
                <FiClock size={18} />
              </div>

              <div>
                <p className="text-xs text-[#958a82]">Estimated delivery</p>

                <p className="mt-0.5 text-sm font-extrabold text-[#202020]">
                  25–30 minutes
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#f4eee7] text-[#ef3e32]">
                <FiMapPin size={18} />
              </div>

              <div>
                <p className="text-xs text-[#958a82]">Delivery status</p>

                <p className="mt-0.5 text-sm font-extrabold text-[#202020]">
                  Kitchen is preparing your order
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* ACTIONS */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.65, duration: 0.4 }}
        className="space-y-3"
      >
        <button
          type="button"
          onClick={() => navigate("home")}
          className="flex w-full items-center justify-center gap-2 rounded-2xl bg-[#ef3e32] px-5 py-4 font-[Manrope] text-sm font-extrabold text-white shadow-lg shadow-[#ef3e32]/20 transition active:scale-[0.98]"
        >
          <FiHome size={18} />
          Back to Home
        </button>

        <button
          type="button"
          onClick={() => navigate("home")}
          className="w-full rounded-2xl border border-[#eadfd3] bg-white px-5 py-4 text-sm font-bold text-[#202020] transition active:scale-[0.98]"
        >
          Order something else
        </button>
      </motion.div>

      <p className="mt-5 text-center text-[10px] font-semibold text-[#a49a91]">
        Made fresh with ❤️ by Crust & Co.
      </p>
    </div>
  );
}
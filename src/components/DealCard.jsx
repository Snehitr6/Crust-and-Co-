import { motion } from "framer-motion";
import { FiArrowRight, FiClock, FiTag } from "react-icons/fi";
import { useCart } from "../context/CartContext";

export default function DealCard({ deal, navigate }) {
  const { setCoupon } = useCart();

  const handleDeal = () => {
    if (deal?.coupon) {
      setCoupon(deal.coupon);
    }

    navigate("cart");
  };

  return (
    <motion.div
      whileTap={{ scale: 0.98 }}
      className="relative overflow-hidden rounded-3xl bg-[#202020] shadow-lg"
    >
      {/* IMAGE */}
      <div className="relative h-[145px] overflow-hidden">
        <img
          src={deal.image}
          alt={deal.title}
          className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-[#202020] via-[#202020]/30 to-transparent" />

        {/* DISCOUNT */}
        {deal.discount && (
          <div className="absolute left-3 top-3 rounded-full bg-[#ef3e32] px-3 py-1.5 text-[10px] font-extrabold uppercase tracking-wider text-white">
            {deal.discount}
          </div>
        )}
      </div>

      {/* CONTENT */}
      <div className="p-4 text-white">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <h3 className="font-[Manrope] text-base font-extrabold">
              {deal.title}
            </h3>

            <p className="mt-1 line-clamp-2 text-xs leading-5 text-white/60">
              {deal.description}
            </p>
          </div>

          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white/10">
            <FiTag size={16} className="text-[#ff8b72]" />
          </div>
        </div>

        {/* TIMER */}
        <div className="mt-4 flex items-center gap-2 text-[10px] font-bold text-white/60">
          <FiClock size={13} className="text-[#ff8b72]" />

          <span>
            Limited time offer
          </span>
        </div>

        {/* ACTION */}
        <button
          type="button"
          onClick={handleDeal}
          className="mt-4 flex w-full items-center justify-between rounded-xl bg-white px-4 py-3 text-xs font-extrabold text-[#202020] transition hover:bg-[#fff0ed]"
        >
          <span>
            {deal.coupon ? `Use ${deal.coupon}` : "Grab this deal"}
          </span>

          <FiArrowRight size={16} />
        </button>
      </div>
    </motion.div>
  );
}
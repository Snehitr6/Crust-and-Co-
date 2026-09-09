import { FiTruck, FiTag, FiShoppingBag } from "react-icons/fi";

export default function OrderSummary({
  subtotal = 0,
  deliveryFee = 0,
  discount = 0,
  total = 0,
}) {
  return (
    <div className="rounded-[24px] bg-white p-5 shadow-sm">
      {/* TITLE */}
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#fff1e6] text-[#ef3e32]">
          <FiShoppingBag size={17} />
        </div>

        <div>
          <h3 className="text-sm font-black text-[#222]">
            Bill details
          </h3>

          <p className="mt-0.5 text-[9px] text-gray-400">
            Your order breakdown
          </p>
        </div>
      </div>

      {/* DETAILS */}
      <div className="mt-5 space-y-4">
        {/* SUBTOTAL */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <FiShoppingBag
              size={13}
              className="text-gray-400"
            />

            <span className="text-xs text-gray-500">
              Item total
            </span>
          </div>

          <span className="text-xs font-bold text-[#222]">
            ₹{subtotal}
          </span>
        </div>

        {/* DELIVERY */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <FiTruck
              size={13}
              className="text-gray-400"
            />

            <span className="text-xs text-gray-500">
              Delivery fee
            </span>
          </div>

          {deliveryFee === 0 ? (
            <span className="text-xs font-black text-green-600">
              FREE
            </span>
          ) : (
            <span className="text-xs font-bold text-[#222]">
              ₹{deliveryFee}
            </span>
          )}
        </div>

        {/* DISCOUNT */}
        {discount > 0 && (
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <FiTag
                size={13}
                className="text-green-600"
              />

              <span className="text-xs text-green-600">
                Discount
              </span>
            </div>

            <span className="text-xs font-black text-green-600">
              -₹{discount}
            </span>
          </div>
        )}
      </div>

      {/* DIVIDER */}
      <div className="my-5 border-t border-dashed border-gray-200" />

      {/* TOTAL */}
      <div className="flex items-center justify-between">
        <div>
          <span className="text-[9px] font-bold uppercase tracking-wider text-gray-400">
            Total payable
          </span>

          <p className="mt-1 text-lg font-black text-[#222]">
            ₹{total}
          </p>
        </div>

        <div className="rounded-xl bg-green-50 px-3 py-2">
          <span className="text-[9px] font-black text-green-600">
            {deliveryFee === 0
              ? "FREE DELIVERY"
              : "HOT & FRESH"}
          </span>
        </div>
      </div>
    </div>
  );
}
import { motion } from "framer-motion";
import {
  FiArrowLeft,
  FiHeart,
  FiShoppingBag,
  FiTrash2,
} from "react-icons/fi";
import { useCart } from "../context/CartContext";

export default function Favorites({
  goBack,
  onProduct,
}) {
  const {
    favorites,
    removeFavorite,
    addToCart,
  } = useCart();

  const handleAdd = (pizza) => {
    const size =
      pizza.sizes?.[0]?.name || "Regular";

    const crust =
      pizza.crusts?.[0] || "Classic";

    addToCart(pizza, {
      size,
      crust,
      quantity: 1,
    });
  };

  return (
    <div className="min-h-screen bg-[#fff8ed] pb-8">
      {/* HEADER */}
      <header className="sticky top-0 z-30 border-b border-[#eadfd3] bg-[#fff8ed]/95 px-4 py-4 backdrop-blur-xl">
        <div className="flex items-center gap-3">
          <button
            onClick={goBack}
            className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-[#29231f] shadow-sm"
          >
            <FiArrowLeft size={19} />
          </button>

          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#ef3e32]">
              Saved for later
            </p>

            <h1 className="text-[21px] font-extrabold text-[#25211e]">
              My Favorites
            </h1>
          </div>
        </div>
      </header>

      <main className="px-4 pt-5">
        {favorites.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex min-h-[65vh] flex-col items-center justify-center text-center"
          >
            <div className="mb-5 flex h-24 w-24 items-center justify-center rounded-full bg-[#ffe6df]">
              <FiHeart
                size={42}
                className="text-[#ef3e32]"
              />
            </div>

            <h2 className="text-[22px] font-extrabold text-[#25211e]">
              No favorites yet
            </h2>

            <p className="mt-2 max-w-[280px] text-sm leading-6 text-[#8c8179]">
              Tap the heart on any pizza you love and
              it will appear here.
            </p>

            <button
              onClick={goBack}
              className="mt-6 rounded-full bg-[#ef3e32] px-6 py-3 text-sm font-bold text-white shadow-lg shadow-red-200"
            >
              Explore pizzas
            </button>
          </motion.div>
        ) : (
          <>
            <div className="mb-5 flex items-center justify-between">
              <div>
                <h2 className="text-lg font-extrabold text-[#25211e]">
                  Your picks
                </h2>

                <p className="text-xs text-[#958980]">
                  {favorites.length} saved{" "}
                  {favorites.length === 1
                    ? "item"
                    : "items"}
                </p>
              </div>

              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#ffe6df] text-[#ef3e32]">
                <FiHeart
                  size={17}
                  className="fill-current"
                />
              </div>
            </div>

            <div className="space-y-3">
              {favorites.map((pizza, index) => (
                <motion.div
                  key={pizza.id}
                  initial={{
                    opacity: 0,
                    y: 15,
                  }}
                  animate={{
                    opacity: 1,
                    y: 0,
                  }}
                  transition={{
                    delay: index * 0.05,
                  }}
                  className="overflow-hidden rounded-[22px] border border-[#eadfd3] bg-white p-3 shadow-[0_8px_25px_rgba(48,32,20,0.05)]"
                >
                  <div className="flex gap-3">
                    <button
                      onClick={() => onProduct(pizza)}
                      className="h-[100px] w-[100px] flex-shrink-0 overflow-hidden rounded-[17px] bg-[#f3e8dc]"
                    >
                      <img
                        src={pizza.image}
                        alt={pizza.name}
                        className="h-full w-full object-cover"
                      />
                    </button>

                    <div className="min-w-0 flex-1">
                      <div className="flex items-start justify-between gap-2">
                        <button
                          onClick={() =>
                            onProduct(pizza)
                          }
                          className="text-left"
                        >
                          <h3 className="line-clamp-1 text-[15px] font-extrabold text-[#28231f]">
                            {pizza.name}
                          </h3>

                          <p className="mt-1 text-[11px] text-[#958980]">
                            ⭐ {pizza.rating} ·{" "}
                            {pizza.badge ||
                              "Chef's choice"}
                          </p>
                        </button>

                        <button
                          onClick={() =>
                            removeFavorite(pizza.id)
                          }
                          className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-[#fff1ed] text-[#ef3e32]"
                        >
                          <FiTrash2 size={15} />
                        </button>
                      </div>

                      <p className="mt-2 line-clamp-2 text-[11px] leading-4 text-[#8c8179]">
                        {pizza.description}
                      </p>

                      <div className="mt-3 flex items-center justify-between">
                        <span className="text-[16px] font-extrabold text-[#24201d]">
                          ₹
                          {pizza.sizes?.[0]
                            ?.price ??
                            pizza.price}
                        </span>

                        <button
                          onClick={() =>
                            handleAdd(pizza)
                          }
                          className="flex items-center gap-1.5 rounded-full bg-[#ef3e32] px-3.5 py-2 text-[11px] font-bold text-white"
                        >
                          <FiShoppingBag
                            size={13}
                          />
                          Add
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </>
        )}
      </main>
    </div>
  );
}
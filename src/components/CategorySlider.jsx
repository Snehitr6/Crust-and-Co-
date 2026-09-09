import { motion } from "framer-motion";

const categories = [
  {
    id: "pizzas",
    name: "Pizza",
    emoji: "🍕",
    bg: "#fff0eb",
  },
  {
    id: "sides",
    name: "Sides",
    emoji: "🍟",
    bg: "#fff3e2",
  },
  {
    id: "drinks",
    name: "Drinks",
    emoji: "🥤",
    bg: "#edf8ff",
  },
  {
    id: "desserts",
    name: "Desserts",
    emoji: "🍰",
    bg: "#fff0f5",
  },
  {
    id: "spicy",
    name: "Spicy",
    emoji: "🌶️",
    bg: "#fff0e8",
  },
  {
    id: "combos",
    name: "Combos",
    emoji: "🍱",
    bg: "#f3f1ff",
  },
];

export default function CategorySlider({
  activeCategory,
  setActiveCategory,
}) {
  return (
    <div className="hide-scrollbar flex gap-3 overflow-x-auto px-4 pb-2">
      {categories.map((category, index) => {
        const active = activeCategory === category.id;

        return (
          <motion.button
            key={category.id}
            type="button"
            onClick={() => setActiveCategory(category.id)}
            whileTap={{ scale: 0.94 }}
            initial={{
              opacity: 0,
              y: 12,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              delay: index * 0.06,
              duration: 0.35,
            }}
            className={`flex h-[94px] w-[76px] flex-shrink-0 flex-col items-center justify-center rounded-[18px] border bg-white p-2 transition-all ${
              active
                ? "border-[#ef3e32] shadow-md shadow-red-100"
                : "border-[#eadfd3] shadow-sm"
            }`}
          >
            {/* FOOD IMAGE / ILLUSTRATION */}
            <div
              className="flex h-[50px] w-[50px] items-center justify-center rounded-[14px]"
              style={{
                backgroundColor: category.bg,
              }}
            >
              <motion.span
                animate={
                  active
                    ? {
                        scale: [1, 1.08, 1],
                        rotate: [0, -3, 3, 0],
                      }
                    : {
                        scale: 1,
                        rotate: 0,
                      }
                }
                transition={{
                  duration: 0.8,
                  ease: "easeInOut",
                }}
                className="select-none text-[27px] leading-none"
              >
                {category.emoji}
              </motion.span>
            </div>

            {/* CATEGORY NAME */}
            <span
              className={`mt-2 text-[9px] font-extrabold ${
                active
                  ? "text-[#ef3e32]"
                  : "text-[#5d5149]"
              }`}
            >
              {category.name}
            </span>
          </motion.button>
        );
      })}
    </div>
  );
}
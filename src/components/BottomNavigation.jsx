import { motion } from "framer-motion";
import {
  FiHeart,
  FiHome,
  FiShoppingBag,
  FiUser,
} from "react-icons/fi";

import { useCart } from "../context/CartContext";

export default function BottomNavigation({
  active = "home",
  navigate,
}) {
  const {
    itemCount,
    favorites,
  } = useCart();

  const items = [
    {
      id: "home",
      label: "Home",
      icon: FiHome,
    },
    {
      id: "favorites",
      label: "Favorites",
      icon: FiHeart,
      count: favorites.length,
    },
    {
      id: "cart",
      label: "Cart",
      icon: FiShoppingBag,
      count: itemCount,
    },
    {
      id: "profile",
      label: "Profile",
      icon: FiUser,
    },
  ];

  return (
    <nav className="fixed bottom-0 left-1/2 z-[70] w-full max-w-[430px] -translate-x-1/2 border-t border-[#eadfd3] bg-white/95 px-3 pt-2 shadow-[0_-8px_25px_rgba(43,30,20,0.07)] backdrop-blur-xl">
      <div className="flex h-[62px] items-center justify-around pb-[env(safe-area-inset-bottom)]">

        {items.map((item) => {
          const Icon = item.icon;
          const isActive = active === item.id;

          return (
            <button
              key={item.id}
              type="button"
              onClick={() => navigate(item.id)}
              className="relative flex min-w-[64px] flex-col items-center justify-center gap-1"
              aria-label={item.label}
            >
              <motion.div
                whileTap={{
                  scale: 0.82,
                }}
                className={`relative flex h-9 w-12 items-center justify-center rounded-full transition-all duration-200 ${
                  isActive
                    ? "bg-[#fff0eb] text-[#ef3e32]"
                    : "text-[#91867e]"
                }`}
              >
                <Icon
                  size={19}
                  strokeWidth={
                    isActive ? 2.5 : 2
                  }
                  className={
                    isActive &&
                    item.id === "favorites"
                      ? "fill-current"
                      : ""
                  }
                />

                {item.count > 0 && (
                  <span className="absolute right-1 top-[-3px] flex h-[17px] min-w-[17px] items-center justify-center rounded-full bg-[#ef3e32] px-1 text-[7px] font-extrabold text-white shadow-sm">
                    {item.count > 9
                      ? "9+"
                      : item.count}
                  </span>
                )}
              </motion.div>

              <span
                className={`text-[8px] font-extrabold transition-colors ${
                  isActive
                    ? "text-[#ef3e32]"
                    : "text-[#91867e]"
                }`}
              >
                {item.label}
              </span>

              {isActive && (
                <motion.span
                  layoutId="bottom-nav-indicator"
                  className="absolute bottom-[-1px] h-[3px] w-5 rounded-full bg-[#ef3e32]"
                  transition={{
                    type: "spring",
                    stiffness: 400,
                    damping: 30,
                  }}
                />
              )}
            </button>
          );
        })}

      </div>
    </nav>
  );
}
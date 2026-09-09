import { motion, AnimatePresence } from "framer-motion";
import {
  FiBell,
  FiChevronRight,
  FiGift,
  FiHeart,
  FiMapPin,
  FiMenu,
  FiUser,
  FiX,
  FiClock,
  FiCheck,
  FiTag,
  FiPercent,
  FiShoppingBag,
} from "react-icons/fi";
import { useState } from "react";
import { useCart } from "../context/CartContext";

export default function Header({ navigate }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [offersOpen, setOffersOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] =
    useState(false);

  const { itemCount, favorites } = useCart();

  /* =====================================================
     NAVIGATION
  ===================================================== */

  const handleNavigate = (page) => {
    setMenuOpen(false);
    setOffersOpen(false);
    setNotificationsOpen(false);

    if (navigate) {
      navigate(page);
    }
  };

  /* =====================================================
     OPEN OFFERS
  ===================================================== */

  const openOffers = () => {
    setMenuOpen(false);
    setNotificationsOpen(false);
    setOffersOpen(true);
  };

  /* =====================================================
     OPEN NOTIFICATIONS
  ===================================================== */

  const openNotifications = () => {
    setMenuOpen(false);
    setOffersOpen(false);
    setNotificationsOpen(true);
  };

  /* =====================================================
     OPEN MENU
  ===================================================== */

  const openMenu = () => {
    setOffersOpen(false);
    setNotificationsOpen(false);
    setMenuOpen(true);
  };

  /* =====================================================
     CART
  ===================================================== */

  const openCart = () => {
    setMenuOpen(false);
    setOffersOpen(false);
    setNotificationsOpen(false);

    if (navigate) {
      navigate("cart");
    }
  };

  return (
    <>
      {/* =====================================================
          FIXED HEADER
      ===================================================== */}

      <header className="crust-fixed-top">
        <div className="px-4 pb-3 pt-4">
          <div className="flex items-center gap-2.5">

            {/* =================================================
                MENU
            ================================================= */}

            <motion.button
              type="button"
              whileTap={{
                scale: 0.88,
                rotate: -3,
              }}
              onClick={openMenu}
              aria-label="Open menu"
              className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-full border border-[#eadfd3] bg-white text-[#29231f] shadow-sm"
            >
              <FiMenu
                size={20}
                strokeWidth={2}
              />
            </motion.button>

            {/* =================================================
                BRAND + LOCATION
            ================================================= */}

            <button
              type="button"
              onClick={() =>
                handleNavigate("home")
              }
              className="min-w-0 flex-1 text-left"
            >
              <p className="text-[8px] font-extrabold uppercase tracking-[0.22em] text-[#ef3e32]">
                Welcome to
              </p>

              <h1 className="truncate text-[18px] font-extrabold leading-tight tracking-[-0.03em] text-[#29231f]">
                Crust & Co.
              </h1>

              <div className="mt-1 flex items-center gap-1 text-[#958980]">
  <FiMapPin
    size={10}
    strokeWidth={2.2}
    className="text-[#ef3e32]"
  />

  <span className="truncate text-[9px] font-semibold">
MG Road, Bengaluru 560001  </span>
</div>
            </button>

            {/* =================================================
                OFFERS
            ================================================= */}

            <motion.button
              type="button"
              whileTap={{
                scale: 0.88,
              }}
              onClick={openOffers}
              aria-label="View offers"
              className={`relative flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-full border shadow-sm transition-all duration-200 ${
                offersOpen
                  ? "border-[#ef3e32] bg-[#fff0eb] text-[#ef3e32]"
                  : "border-[#eadfd3] bg-white text-[#ef3e32]"
              }`}
            >
              <FiGift
                size={19}
                strokeWidth={2}
              />

              <motion.span
                animate={{
                  scale: [1, 1.25, 1],
                }}
                transition={{
                  duration: 1.8,
                  repeat: Infinity,
                }}
                className="absolute right-[7px] top-[6px] h-[6px] w-[6px] rounded-full bg-[#ef3e32]"
              />
            </motion.button>

            {/* =================================================
                NOTIFICATIONS
            ================================================= */}

            <motion.button
              type="button"
              whileTap={{
                scale: 0.88,
              }}
              onClick={openNotifications}
              aria-label="Notifications"
              className={`relative flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-full shadow-[0_6px_15px_rgba(41,35,31,0.15)] transition-all duration-200 ${
                notificationsOpen
                  ? "bg-[#ef3e32] text-white"
                  : "bg-[#29231f] text-white"
              }`}
            >
              <FiBell
                size={18}
                strokeWidth={2}
              />

              <motion.span
                animate={{
                  scale: [1, 1.3, 1],
                }}
                transition={{
                  duration: 1.8,
                  repeat: Infinity,
                }}
                className={`absolute right-[7px] top-[6px] h-[6px] w-[6px] rounded-full bg-[#ef3e32] ${
                  notificationsOpen
                    ? "border border-white"
                    : "border border-[#29231f]"
                }`}
              />
            </motion.button>

            {/* =================================================
                CART
            ================================================= */}

            <motion.button
              type="button"
              whileTap={{
                scale: 0.86,
              }}
              onClick={openCart}
              aria-label="Open cart"
              className={`relative flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-full border shadow-sm transition-all duration-200 ${
                itemCount > 0
                  ? "border-[#ef3e32] bg-[#fff0eb] text-[#ef3e32]"
                  : "border-[#eadfd3] bg-white text-[#29231f]"
              }`}
            >
              <FiShoppingBag
                size={19}
                strokeWidth={2}
              />

              <AnimatePresence>
                {itemCount > 0 && (
                  <motion.span
                    key={itemCount}
                    initial={{
                      opacity: 0,
                      scale: 0.45,
                      y: -3,
                    }}
                    animate={{
                      opacity: 1,
                      scale: 1,
                      y: 0,
                    }}
                    exit={{
                      opacity: 0,
                      scale: 0.45,
                    }}
                    transition={{
                      type: "spring",
                      stiffness: 500,
                      damping: 24,
                    }}
                    className="absolute -right-1 -top-1 flex h-[18px] min-w-[18px] items-center justify-center rounded-full bg-[#ef3e32] px-1 text-[7px] font-extrabold text-white shadow-sm"
                  >
                    {itemCount > 99
                      ? "99+"
                      : itemCount}
                  </motion.span>
                )}
              </AnimatePresence>
            </motion.button>
          </div>
        </div>
      </header>

      {/* =====================================================
          SIDE MENU
      ===================================================== */}

      <AnimatePresence>
        {menuOpen && (
          <>
            <motion.button
              type="button"
              aria-label="Close menu"
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
                setMenuOpen(false)
              }
              className="fixed inset-0 z-[80] cursor-default bg-black/40"
            />

            <motion.aside
              initial={{
                x: "-105%",
              }}
              animate={{
                x: 0,
              }}
              exit={{
                x: "-105%",
              }}
              transition={{
                type: "spring",
                stiffness: 360,
                damping: 34,
                mass: 0.8,
              }}
              className="crust-fixed-left-drawer"
            >
              {/* DRAWER HEADER */}

              <div className="flex-shrink-0 border-b border-[#eadfd3] px-4 pb-5 pt-5">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-[10px] font-extrabold uppercase tracking-[0.25em] text-[#ef3e32]">
                      Crust Club
                    </p>

                    <h2 className="mt-2 text-[23px] font-extrabold tracking-[-0.04em] text-[#29231f]">
                      Crust & Co.
                    </h2>
                  </div>

                  <motion.button
                    type="button"
                    whileTap={{
                      scale: 0.86,
                      rotate: -8,
                    }}
                    onClick={() =>
                      setMenuOpen(false)
                    }
                    aria-label="Close menu"
                    className="flex h-10 w-10 items-center justify-center rounded-full border border-[#eee4da] bg-white text-[#29231f] shadow-sm"
                  >
                    <FiX size={20} />
                  </motion.button>
                </div>

                {/* PROFILE CARD */}

                <motion.button
                  type="button"
                  whileTap={{
                    scale: 0.985,
                  }}
                  onClick={() =>
                    handleNavigate("profile")
                  }
                  className="mt-5 flex w-full items-center rounded-[19px] bg-[#29231f] p-3.5 text-left"
                >
                  <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-full bg-[#ef3e32] text-white">
                    <FiUser
                      size={20}
                      strokeWidth={2}
                    />
                  </div>

                  <div className="ml-3 min-w-0 flex-1">
                    <p className="truncate text-[13px] font-extrabold text-white">
                      Snehit
                    </p>

                    <p className="mt-0.5 text-[9px] text-white/45">
                      Crust Club member
                    </p>
                  </div>

                  <span className="rounded-full bg-white/10 px-3 py-2 text-[10px] font-bold text-white">
                    View
                  </span>
                </motion.button>
              </div>

              {/* DRAWER ITEMS */}

              <div className="hide-scrollbar flex-1 overflow-y-auto px-4 py-5">
                <div className="space-y-2">

                  <DrawerItem
                    icon={FiMapPin}
                    title="Home"
                    subtitle="Browse fresh pizzas"
                    iconBg="#fff0eb"
                    iconColor="#ef3e32"
                    onClick={() =>
                      handleNavigate("home")
                    }
                  />

                  <DrawerItem
                    icon={FiHeart}
                    title="Favorites"
                    subtitle={`${favorites.length} saved ${
                      favorites.length === 1
                        ? "item"
                        : "items"
                    }`}
                    iconBg="#ffe7e1"
                    iconColor="#ef3e32"
                    filled
                    count={favorites.length}
                    onClick={() =>
                      handleNavigate("favorites")
                    }
                  />

                  <DrawerItem
                    icon={FiUser}
                    title="Profile"
                    subtitle="Account & preferences"
                    iconBg="#f1ebe4"
                    iconColor="#756b64"
                    onClick={() =>
                      handleNavigate("profile")
                    }
                  />

                  <DrawerItem
                    icon={FiGift}
                    title="Offers & Deals"
                    subtitle="Save more on every order"
                    iconBg="#fff0df"
                    iconColor="#d27c17"
                    onClick={openOffers}
                  />

                  <DrawerItem
                    icon={FiBell}
                    title="Notifications"
                    subtitle="Order updates & offers"
                    iconBg="#f1ebe4"
                    iconColor="#756b64"
                    onClick={openNotifications}
                  />

                  <DrawerItem
                    icon={FiShoppingBag}
                    title="My Orders"
                    subtitle="Track your recent orders"
                    iconBg="#eee9ff"
                    iconColor="#6956c9"
                    onClick={() =>
                      setMenuOpen(false)
                    }
                  />

                  <DrawerItem
                    icon={FiShoppingBag}
                    title="Cart"
                    subtitle={`${itemCount} ${
                      itemCount === 1
                        ? "item"
                        : "items"
                    } in your bag`}
                    iconBg="#fff0eb"
                    iconColor="#ef3e32"
                    count={itemCount}
                    onClick={openCart}
                  />
                </div>

                {/* OFFER CARD */}

                <motion.button
                  type="button"
                  whileTap={{
                    scale: 0.985,
                  }}
                  onClick={openOffers}
                  className="mt-5 w-full rounded-[18px] bg-[#ef3e32] p-4 text-left text-white shadow-[0_8px_20px_rgba(239,62,50,0.16)]"
                >
                  <p className="text-[8px] font-extrabold uppercase tracking-[0.15em] text-white/70">
                    Today's offer
                  </p>

                  <p className="mt-1.5 text-[14px] font-extrabold">
                    Get ₹100 OFF
                  </p>

                  <p className="mt-1 text-[9px] text-white/70">
                    Use code WELCOME100
                  </p>
                </motion.button>
              </div>

              {/* DRAWER FOOTER */}

              <div className="flex-shrink-0 border-t border-[#eadfd3] px-4 py-4 text-center">
                <p className="text-[8px] font-medium text-[#b2a69e]">
                  Crust & Co. · Version 1.0.0
                </p>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* =====================================================
          OFFERS PANEL
      ===================================================== */}

      <AnimatePresence>
        {offersOpen && (
          <>
            <motion.button
              type="button"
              aria-label="Close offers"
              initial={{
                opacity: 0,
              }}
              animate={{
                opacity: 1,
              }}
              exit={{
                opacity: 0,
              }}
              transition={{
                duration: 0.25,
              }}
              onClick={() =>
                setOffersOpen(false)
              }
              className="fixed inset-0 z-[94] bg-black/35"
            />

            <motion.aside
              initial={{
                x: "105%",
              }}
              animate={{
                x: 0,
              }}
              exit={{
                x: "105%",
              }}
              transition={{
                type: "spring",
                stiffness: 330,
                damping: 32,
                mass: 0.8,
              }}
              className="fixed bottom-0 top-0 z-[100] flex w-[min(88vw,375px)] flex-col overflow-hidden rounded-l-[28px] border-l border-[#eadfd3] bg-[#fff9f0] shadow-[-15px_0_45px_rgba(43,30,20,0.16)]"
              style={{
                right: "max(0px, calc((100vw - 430px) / 2))",
              }}
            >
              {/* HEADER */}

              <div className="flex flex-shrink-0 items-center justify-between border-b border-[#eadfd3] px-5 pb-4 pt-6">
                <div>
                  <p className="text-[8px] font-extrabold uppercase tracking-[0.22em] text-[#ef3e32]">
                    Crust Club
                  </p>

                  <h2 className="mt-1 text-[21px] font-extrabold tracking-[-0.04em] text-[#29231f]">
                    Today's offers
                  </h2>
                </div>

                <motion.button
                  type="button"
                  whileTap={{
                    scale: 0.85,
                    rotate: -8,
                  }}
                  onClick={() =>
                    setOffersOpen(false)
                  }
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-[#eadfd3] bg-white text-[#29231f] shadow-sm"
                >
                  <FiX size={18} />
                </motion.button>
              </div>

              {/* CONTENT */}

              <div className="hide-scrollbar flex-1 overflow-y-auto px-4 py-5">

                {/* ₹100 OFF */}

                <OfferButton
                  delay={0.08}
                  icon={FiGift}
                  title="₹100 OFF"
                  subtitle="On your order above ₹399"
                  code="WELCOME100"
                  primary
                  onClick={() => {
                    setOffersOpen(false);

                    if (navigate) {
                      navigate("cart");
                    }
                  }}
                />

                {/* CRUST20 */}

                <OfferButton
                  delay={0.14}
                  icon={FiPercent}
                  title="20% OFF"
                  subtitle="Save up to ₹150 with CRUST20"
                  code="CRUST20"
                  onClick={() => {
                    setOffersOpen(false);

                    if (navigate) {
                      navigate("cart");
                    }
                  }}
                />

                {/* BOGO */}

                <OfferButton
                  delay={0.2}
                  icon={FiGift}
                  title="Buy 1 Get 1"
                  subtitle="Buy one qualifying pizza and get the next one free."
                  code="BOGO"
                  green
                  onClick={() => {
                    setOffersOpen(false);

                    if (navigate) {
                      navigate("cart");
                    }
                  }}
                />

                {/* FREE DELIVERY */}

                <motion.div
                  initial={{
                    opacity: 0,
                    x: 25,
                  }}
                  animate={{
                    opacity: 1,
                    x: 0,
                  }}
                  transition={{
                    delay: 0.26,
                  }}
                  className="mt-3 flex w-full items-center gap-3 rounded-[20px] border border-[#eadfd3] bg-white p-4"
                >
                  <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-[#fff0eb] text-[#ef3e32]">
                    <FiShoppingBag size={19} />
                  </div>

                  <div className="min-w-0 flex-1">
                    <p className="text-[13px] font-extrabold text-[#29231f]">
                      Free delivery
                    </p>

                    <p className="mt-1 text-[8px] leading-[13px] text-[#958980]">
                      Free delivery when your order reaches ₹499.
                    </p>
                  </div>

                  <FiCheck
                    size={17}
                    className="flex-shrink-0 text-[#2f8f5b]"
                  />
                </motion.div>

                {/* INFO */}

                <motion.div
                  initial={{
                    opacity: 0,
                    y: 10,
                  }}
                  animate={{
                    opacity: 1,
                    y: 0,
                  }}
                  transition={{
                    delay: 0.32,
                  }}
                  className="mt-5 rounded-[19px] bg-[#29231f] p-4 text-white"
                >
                  <div className="flex items-center gap-2">
                    <FiClock size={14} />

                    <p className="text-[8px] font-extrabold uppercase tracking-[0.15em] text-white/55">
                      Limited time deals
                    </p>
                  </div>

                  <p className="mt-2 text-[10px] leading-4 text-white/55">
                    Grab your favourite offer before it disappears.
                  </p>
                </motion.div>
              </div>

              <div className="flex-shrink-0 border-t border-[#eadfd3] px-5 py-4 text-center">
                <p className="text-[7px] font-bold uppercase tracking-[0.14em] text-[#b0a49c]">
                  Fresh pizza · Better deals
                </p>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* =====================================================
          NOTIFICATIONS PANEL
      ===================================================== */}

      <AnimatePresence>
        {notificationsOpen && (
          <>
            <motion.button
              type="button"
              aria-label="Close notifications"
              initial={{
                opacity: 0,
              }}
              animate={{
                opacity: 1,
              }}
              exit={{
                opacity: 0,
              }}
              transition={{
                duration: 0.25,
              }}
              onClick={() =>
                setNotificationsOpen(false)
              }
              className="fixed inset-0 z-[94] bg-black/35"
            />

            <motion.aside
              initial={{
                x: "105%",
              }}
              animate={{
                x: 0,
              }}
              exit={{
                x: "105%",
              }}
              transition={{
                type: "spring",
                stiffness: 330,
                damping: 32,
                mass: 0.8,
              }}
              className="fixed bottom-0 top-0 z-[100] flex w-[min(88vw,375px)] flex-col overflow-hidden rounded-l-[28px] border-l border-[#eadfd3] bg-[#fff9f0] shadow-[-15px_0_45px_rgba(43,30,20,0.16)]"
              style={{
                right: "max(0px, calc((100vw - 430px) / 2))",
              }}
            >
              {/* HEADER */}

              <div className="flex flex-shrink-0 items-center justify-between border-b border-[#eadfd3] px-5 pb-4 pt-6">
                <div>
                  <p className="text-[8px] font-extrabold uppercase tracking-[0.22em] text-[#ef3e32]">
                    Crust Club
                  </p>

                  <h2 className="mt-1 text-[21px] font-extrabold tracking-[-0.04em] text-[#29231f]">
                    Notifications
                  </h2>
                </div>

                <motion.button
                  type="button"
                  whileTap={{
                    scale: 0.85,
                    rotate: -8,
                  }}
                  onClick={() =>
                    setNotificationsOpen(false)
                  }
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-[#eadfd3] bg-white text-[#29231f] shadow-sm"
                >
                  <FiX size={18} />
                </motion.button>
              </div>

              {/* CONTENT */}

              <div className="hide-scrollbar flex-1 overflow-y-auto px-4 py-5">

                {/* NOTIFICATION 1 */}

                <NotificationCard
                  delay={0.08}
                  icon={FiGift}
                  iconBg="#fff0eb"
                  iconColor="#ef3e32"
                  title="₹100 OFF waiting for you"
                  text="Use WELCOME100 on your next order and save ₹100."
                  time="Just now"
                  unread
                />

                {/* NOTIFICATION 2 */}

                <NotificationCard
                  delay={0.14}
                  icon={FiCheck}
                  iconBg="#effaf3"
                  iconColor="#2f8f5b"
                  title="Fresh from the oven"
                  text="Your favourite pizzas are freshly baked and ready to order."
                  time="Today"
                />

                {/* NOTIFICATION 3 */}

                <NotificationCard
                  delay={0.2}
                  icon={FiTag}
                  iconBg="#fff0df"
                  iconColor="#d27c17"
                  title="New BOGO deal"
                  text="Buy one qualifying pizza and get another one free."
                  time="Today"
                />

                {/* INFO */}

                <motion.div
                  initial={{
                    opacity: 0,
                    y: 10,
                  }}
                  animate={{
                    opacity: 1,
                    y: 0,
                  }}
                  transition={{
                    delay: 0.28,
                  }}
                  className="mt-5 rounded-[19px] bg-[#29231f] p-4 text-white"
                >
                  <div className="flex items-center gap-2">
                    <FiBell size={14} />

                    <p className="text-[8px] font-extrabold uppercase tracking-[0.15em] text-white/55">
                      Stay updated
                    </p>
                  </div>

                  <p className="mt-2 text-[10px] leading-4 text-white/55">
                    We'll keep you updated with offers, order status and fresh drops.
                  </p>
                </motion.div>

                {/* END MESSAGE */}

                <div className="mt-7 pb-2 text-center">
                  <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-[#f1ebe4] text-[#a79b92]">
                    <FiHeart size={20} />
                  </div>

                  <p className="mt-3 text-[11px] font-extrabold text-[#514740]">
                    That's all for now
                  </p>

                  <p className="mx-auto mt-1 max-w-[220px] text-[8px] leading-[14px] text-[#aaa099]">
                    We'll let you know when something delicious happens.
                  </p>
                </div>
              </div>

              <div className="flex-shrink-0 border-t border-[#eadfd3] px-5 py-4 text-center">
                <p className="text-[7px] font-bold uppercase tracking-[0.14em] text-[#b0a49c]">
                  Crust & Co. notifications
                </p>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

/* =========================================================
   OFFER BUTTON
========================================================= */

function OfferButton({
  delay,
  icon: Icon,
  title,
  subtitle,
  code,
  primary = false,
  green = false,
  onClick,
}) {
  return (
    <motion.button
      type="button"
      initial={{
        opacity: 0,
        x: 25,
      }}
      animate={{
        opacity: 1,
        x: 0,
      }}
      transition={{
        delay,
      }}
      whileTap={{
        scale: 0.98,
      }}
      onClick={onClick}
      className={`group mt-3 flex w-full items-center gap-3 rounded-[20px] p-4 text-left ${
        primary
          ? "bg-[#ef3e32] text-white shadow-[0_10px_25px_rgba(239,62,50,0.15)]"
          : green
          ? "border border-[#cce7d7] bg-[#effaf3]"
          : "border border-[#eadfd3] bg-white"
      }`}
    >
      <div
        className={`flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full ${
          primary
            ? "bg-white/15 text-white"
            : green
            ? "bg-[#dff2e6] text-[#2f8f5b]"
            : "bg-[#fff0df] text-[#d27c17]"
        }`}
      >
        <Icon size={20} />
      </div>

      <div className="min-w-0 flex-1">
        <p
          className={`text-[13px] font-extrabold ${
            primary
              ? "text-white"
              : green
              ? "text-[#276d47]"
              : "text-[#29231f]"
          }`}
        >
          {title}
        </p>

        <p
          className={`mt-1 text-[8px] leading-[13px] ${
            primary
              ? "text-white/65"
              : green
              ? "text-[#6d8a79]"
              : "text-[#958980]"
          }`}
        >
          {subtitle}
        </p>
      </div>

      <span
        className={`flex-shrink-0 rounded-full px-2.5 py-1.5 text-[7px] font-extrabold ${
          primary
            ? "bg-white/15 text-white"
            : green
            ? "bg-[#dff2e6] text-[#2f8f5b]"
            : "bg-[#fff5df] text-[#8a6100]"
        }`}
      >
        {code}
      </span>

      <FiChevronRight
        size={16}
        className={`flex-shrink-0 transition-transform duration-200 group-hover:translate-x-1 ${
          primary
            ? "text-white"
            : "text-[#b9aea5]"
        }`}
      />
    </motion.button>
  );
}

/* =========================================================
   NOTIFICATION CARD
========================================================= */

function NotificationCard({
  delay,
  icon: Icon,
  iconBg,
  iconColor,
  title,
  text,
  time,
  unread = false,
}) {
  return (
    <motion.div
      initial={{
        opacity: 0,
        x: 25,
      }}
      animate={{
        opacity: 1,
        x: 0,
      }}
      transition={{
        delay,
      }}
      className="mt-3 rounded-[20px] border border-[#eadfd3] bg-white p-4 shadow-[0_3px_12px_rgba(43,30,20,0.035)] first:mt-0"
    >
      <div className="flex gap-3">
        <div
          className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-full"
          style={{
            backgroundColor: iconBg,
            color: iconColor,
          }}
        >
          <Icon size={19} />
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex items-start justify-between gap-2">
            <p className="text-[12px] font-extrabold text-[#29231f]">
              {title}
            </p>

            {unread && (
              <span className="mt-1 h-2 w-2 flex-shrink-0 rounded-full bg-[#ef3e32]" />
            )}
          </div>

          <p className="mt-1.5 text-[9px] leading-[14px] text-[#958980]">
            {text}
          </p>

          <p className="mt-2 text-[7px] font-bold uppercase tracking-[0.12em] text-[#b5aaa2]">
            {time}
          </p>
        </div>
      </div>
    </motion.div>
  );
}

/* =========================================================
   DRAWER ITEM
========================================================= */

function DrawerItem({
  icon: Icon,
  title,
  subtitle,
  iconBg,
  iconColor,
  count = 0,
  filled = false,
  onClick,
}) {
  return (
    <motion.button
      type="button"
      whileHover={{
        x: 2,
      }}
      whileTap={{
        scale: 0.985,
      }}
      onClick={onClick}
      className="flex w-full items-center rounded-[18px] border border-[#eee5dc] bg-white p-3.5 text-left shadow-[0_2px_7px_rgba(43,30,20,0.035)]"
    >
      <div
        className="relative flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full"
        style={{
          backgroundColor: iconBg,
          color: iconColor,
        }}
      >
        <Icon
          size={18}
          strokeWidth={2}
          className={
            filled
              ? "fill-current"
              : ""
          }
        />

        {count > 0 && (
          <span className="absolute -right-1 -top-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-[#ef3e32] px-1 text-[7px] font-extrabold text-white">
            {count > 9 ? "9+" : count}
          </span>
        )}
      </div>

      <div className="ml-3 min-w-0 flex-1">
        <p className="truncate text-[12px] font-extrabold text-[#332b26]">
          {title}
        </p>

        <p className="mt-0.5 truncate text-[8.5px] font-medium text-[#aaa098]">
          {subtitle}
        </p>
      </div>

      <FiChevronRight
        size={16}
        className="flex-shrink-0 text-[#b9aea5]"
      />
    </motion.button>
  );
}
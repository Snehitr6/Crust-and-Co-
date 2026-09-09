import { motion, AnimatePresence } from "framer-motion";

import {
  FiArrowLeft,
  FiChevronRight,
  FiClock,
  FiCreditCard,
  FiEdit3,
  FiHeart,
  FiHelpCircle,
  FiHome,
  FiLogOut,
  FiMapPin,
  FiSettings,
  FiShield,
  FiUser,
  FiPlus,
  FiX,
  FiCheck,
  FiPhone,
  FiMail,
  FiBell,
  FiMoon,
  FiLock,
  FiTrash2,
} from "react-icons/fi";

import { useState } from "react";

import { useCart } from "../context/CartContext";

export default function Profile({
  goBack,
  navigate,
}) {
  const { favorites } = useCart();

  const [activeModal, setActiveModal] =
    useState(null);

  const [notifications, setNotifications] =
    useState(true);

  const [darkMode, setDarkMode] =
    useState(false);

  const [orderHistory] = useState([
    {
      id: "#CR48291",
      date: "08 Sep 2026",
      items: "Garden Harvest + Cola",
      amount: 368,
      status: "Delivered",
    },
    {
      id: "#CR47125",
      date: "31 Aug 2026",
      items: "Pepperoni Blaze",
      amount: 299,
      status: "Delivered",
    },
    {
      id: "#CR46380",
      date: "24 Aug 2026",
      items: "Family Feast",
      amount: 699,
      status: "Delivered",
    },
  ]);

  const [addresses, setAddresses] =
    useState([
      {
        id: 1,
        type: "Home",
        address:
          "Your home delivery address",
        default: true,
      },
      {
        id: 2,
        type: "Work",
        address:
          "Your work delivery address",
        default: false,
      },
    ]);

  const payments = [
    {
      id: 1,
      name: "UPI",
      detail: "Pay securely with UPI",
    },
    {
      id: 2,
      name: "Credit / Debit Card",
      detail: "Visa, Mastercard & more",
    },
    {
      id: 3,
      name: "Cash on Delivery",
      detail: "Pay when your order arrives",
    },
  ];

  const menuItems = [
    {
      id: "addresses",
      icon: FiMapPin,
      title: "Saved addresses",
      subtitle: "Home · Work",
    },
    {
      id: "payments",
      icon: FiCreditCard,
      title: "Payment methods",
      subtitle: "Cards & UPI",
    },
    {
      id: "orders",
      icon: FiClock,
      title: "Order history",
      subtitle: "View your previous orders",
    },
    {
      id: "privacy",
      icon: FiShield,
      title: "Privacy & security",
      subtitle: "Manage account security",
    },
    {
      id: "settings",
      icon: FiSettings,
      title: "Settings",
      subtitle: "App preferences",
    },
    {
      id: "help",
      icon: FiHelpCircle,
      title: "Help & support",
      subtitle: "We're here to help",
    },
  ];

  const openModal = (id) => {
    setActiveModal(id);
  };

  const closeModal = () => {
    setActiveModal(null);
  };

  const makeDefaultAddress = (id) => {
    setAddresses((current) =>
      current.map((address) => ({
        ...address,
        default: address.id === id,
      }))
    );
  };

  return (
    <div className="min-h-screen bg-[#fff8ed] pb-8">
      {/* =====================================
          HEADER
      ====================================== */}

      <header className="sticky top-0 z-30 border-b border-[#eadfd3] bg-[#fff8ed]/95 px-4 py-4 backdrop-blur-xl">
        <div className="flex items-center gap-3">

          {/* BACK BUTTON */}

          <button
            type="button"
            onClick={goBack}
            aria-label="Back to home"
            className="relative z-50 flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-white text-[#29231f] shadow-sm transition-all duration-200 hover:bg-[#fff1eb] active:scale-90"
          >
            <FiArrowLeft
              size={20}
              strokeWidth={2.3}
            />
          </button>

          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#ef3e32]">
              Account
            </p>

            <h1 className="text-[21px] font-extrabold text-[#25211e]">
              My Profile
            </h1>
          </div>
        </div>
      </header>

      <main className="px-4 pt-5">

        {/* =====================================
            PROFILE CARD
        ====================================== */}

        <motion.section
          initial={{
            opacity: 0,
            y: 15,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          className="overflow-hidden rounded-[26px] bg-[#24201d] p-5 text-white shadow-[0_15px_40px_rgba(36,32,29,0.16)]"
        >
          <div className="flex items-center gap-4">

            <div className="flex h-[68px] w-[68px] items-center justify-center rounded-full bg-[#ef3e32] text-white shadow-lg">
              <FiUser size={30} />
            </div>

            <div className="min-w-0 flex-1">
              <h2 className="text-[19px] font-extrabold">
                Snehit
              </h2>

              <p className="mt-1 text-xs text-white/60">
                Pizza lover · Crust Club member
              </p>
            </div>

            <button
              type="button"
              onClick={() =>
                alert(
                  "Profile editing will be available soon."
                )
              }
              className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10"
            >
              <FiEdit3 size={15} />
            </button>
          </div>

          <div className="mt-5 grid grid-cols-3 gap-2">

            <div className="rounded-[16px] bg-white/10 p-3 text-center">
              <p className="text-lg font-extrabold">
                {favorites.length}
              </p>

              <p className="text-[9px] uppercase tracking-wide text-white/50">
                Favorites
              </p>
            </div>

            <div className="rounded-[16px] bg-white/10 p-3 text-center">
              <p className="text-lg font-extrabold">
                {orderHistory.length}
              </p>

              <p className="text-[9px] uppercase tracking-wide text-white/50">
                Orders
              </p>
            </div>

            <div className="rounded-[16px] bg-white/10 p-3 text-center">
              <p className="text-lg font-extrabold">
                240
              </p>

              <p className="text-[9px] uppercase tracking-wide text-white/50">
                Points
              </p>
            </div>

          </div>
        </motion.section>

        {/* =====================================
            FAVORITES
        ====================================== */}

        <motion.button
          type="button"
          initial={{
            opacity: 0,
            y: 12,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            delay: 0.08,
          }}
          onClick={() =>
            navigate("favorites")
          }
          className="mt-4 flex w-full items-center gap-3 rounded-[20px] border border-[#eadfd3] bg-white p-4 text-left shadow-sm transition active:scale-[0.98]"
        >
          <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#ffe6df] text-[#ef3e32]">
            <FiHeart
              size={19}
              className="fill-current"
            />
          </div>

          <div className="flex-1">
            <h3 className="text-sm font-extrabold text-[#29231f]">
              Your favorites
            </h3>

            <p className="mt-0.5 text-[11px] text-[#958980]">
              {favorites.length} items saved
            </p>
          </div>

          <FiChevronRight
            size={18}
            className="text-[#a79b92]"
          />
        </motion.button>

        {/* =====================================
            ACCOUNT OPTIONS
        ====================================== */}

        <section className="mt-6">

          <h2 className="mb-3 px-1 text-sm font-extrabold text-[#29231f]">
            Account
          </h2>

          <div className="overflow-hidden rounded-[22px] border border-[#eadfd3] bg-white">

            {menuItems.map(
              (item, index) => {
                const Icon = item.icon;

                return (
                  <motion.button
                    type="button"
                    key={item.id}
                    whileTap={{
                      scale: 0.985,
                    }}
                    onClick={() =>
                      openModal(item.id)
                    }
                    className={`flex w-full cursor-pointer items-center gap-3 px-4 py-4 text-left transition active:bg-[#fff8ed] ${
                      index !==
                      menuItems.length - 1
                        ? "border-b border-[#f0e8df]"
                        : ""
                    }`}
                  >
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#f8f1e9] text-[#5d5149]">
                      <Icon size={17} />
                    </div>

                    <div className="flex-1">
                      <p className="text-[13px] font-bold text-[#302a26]">
                        {item.title}
                      </p>

                      <p className="mt-0.5 text-[10px] text-[#a0958c]">
                        {item.subtitle}
                      </p>
                    </div>

                    <FiChevronRight
                      size={16}
                      className="text-[#b4a9a0]"
                    />
                  </motion.button>
                );
              }
            )}

          </div>
        </section>

        {/* =====================================
            DEFAULT DELIVERY
        ====================================== */}

        <section className="mt-6">

          <h2 className="mb-3 px-1 text-sm font-extrabold text-[#29231f]">
            Default delivery
          </h2>

          <button
            type="button"
            onClick={() =>
              openModal("addresses")
            }
            className="w-full rounded-[22px] border border-[#eadfd3] bg-white p-4 text-left transition active:scale-[0.98]"
          >
            <div className="flex items-start gap-3">

              <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-[#fff0df] text-[#c87816]">
                <FiHome size={17} />
              </div>

              <div className="flex-1">

                <div className="flex items-center justify-between">

                  <h3 className="text-[13px] font-extrabold text-[#29231f]">
                    {addresses.find(
                      (item) =>
                        item.default
                    )?.type || "Home"}
                  </h3>

                  <span className="rounded-full bg-[#eaf7ef] px-2 py-1 text-[9px] font-bold text-[#2f8f5b]">
                    DEFAULT
                  </span>

                </div>

                <p className="mt-1 text-[11px] leading-5 text-[#958980]">
                  {
                    addresses.find(
                      (item) =>
                        item.default
                    )?.address
                  }
                </p>

              </div>

              <FiChevronRight
                size={16}
                className="mt-2 text-[#b4a9a0]"
              />

            </div>
          </button>
        </section>

        {/* =====================================
            LOGOUT
        ====================================== */}

        <button
          type="button"
          onClick={() =>
            openModal("logout")
          }
          className="mt-6 flex w-full cursor-pointer items-center justify-center gap-2 rounded-[18px] border border-[#f0cfc8] bg-[#fff5f2] py-3.5 text-sm font-bold text-[#d83b31] transition active:scale-[0.98]"
        >
          <FiLogOut size={16} />
          Log out
        </button>

        <p className="mt-6 text-center text-[10px] text-[#b0a49b]">
          Crust & Co. · Version 1.0.0
        </p>
      </main>

      {/* =====================================
          MODALS
      ====================================== */}

      <AnimatePresence>
        {activeModal && (
          <motion.div
            initial={{
              opacity: 0,
            }}
            animate={{
              opacity: 1,
            }}
            exit={{
              opacity: 0,
            }}
            className="fixed inset-0 z-[100] flex items-end justify-center bg-black/40"
            onClick={closeModal}
          >
            <motion.div
              initial={{
                y: "100%",
              }}
              animate={{
                y: 0,
              }}
              exit={{
                y: "100%",
              }}
              transition={{
                type: "spring",
                damping: 28,
                stiffness: 300,
              }}
              onClick={(event) =>
                event.stopPropagation()
              }
              className="w-full max-w-[430px] overflow-hidden rounded-t-[30px] bg-[#fff8ed] shadow-2xl"
            >

              {/* MODAL HEADER */}

              <div className="flex items-center justify-between border-b border-[#eadfd3] px-5 py-4">

                <h2 className="text-[18px] font-extrabold text-[#29231f]">
                  {activeModal ===
                    "addresses" &&
                    "Saved addresses"}

                  {activeModal ===
                    "payments" &&
                    "Payment methods"}

                  {activeModal === "orders" &&
                    "Order history"}

                  {activeModal === "privacy" &&
                    "Privacy & security"}

                  {activeModal === "settings" &&
                    "Settings"}

                  {activeModal === "help" &&
                    "Help & support"}

                  {activeModal === "logout" &&
                    "Log out"}
                </h2>

                <button
                  type="button"
                  onClick={closeModal}
                  className="flex h-9 w-9 items-center justify-center rounded-full bg-white text-[#6d625b]"
                >
                  <FiX size={18} />
                </button>

              </div>

              {/* =================================
                  ADDRESSES
              ================================== */}

              {activeModal ===
                "addresses" && (
                <div className="max-h-[70vh] overflow-y-auto p-5">

                  <div className="space-y-3">

                    {addresses.map(
                      (address) => (
                        <button
                          type="button"
                          key={address.id}
                          onClick={() =>
                            makeDefaultAddress(
                              address.id
                            )
                          }
                          className="flex w-full items-start gap-3 rounded-[20px] border border-[#eadfd3] bg-white p-4 text-left"
                        >

                          <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-[#fff0df] text-[#c87816]">
                            {address.type ===
                            "Home" ? (
                              <FiHome
                                size={17}
                              />
                            ) : (
                              <FiMapPin
                                size={17}
                              />
                            )}
                          </div>

                          <div className="flex-1">

                            <div className="flex items-center justify-between">

                              <h3 className="text-sm font-extrabold text-[#29231f]">
                                {address.type}
                              </h3>

                              {address.default && (
                                <span className="rounded-full bg-[#eaf7ef] px-2 py-1 text-[9px] font-bold text-[#2f8f5b]">
                                  DEFAULT
                                </span>
                              )}

                            </div>

                            <p className="mt-1 text-xs leading-5 text-[#958980]">
                              {address.address}
                            </p>

                          </div>

                          {address.default && (
                            <FiCheck
                              size={18}
                              className="text-[#2f8f5b]"
                            />
                          )}

                        </button>
                      )
                    )}

                  </div>

                  <button
                    type="button"
                    onClick={() =>
                      alert(
                        "Add address form opened."
                      )
                    }
                    className="mt-4 flex w-full items-center justify-center gap-2 rounded-[18px] bg-[#ef3e32] py-3.5 text-sm font-bold text-white"
                  >
                    <FiPlus size={17} />
                    Add new address
                  </button>

                </div>
              )}

              {/* =================================
                  PAYMENTS
              ================================== */}

              {activeModal ===
                "payments" && (
                <div className="p-5">

                  <div className="space-y-3">

                    {payments.map(
                      (payment) => (
                        <button
                          type="button"
                          key={payment.id}
                          onClick={() =>
                            alert(
                              `${payment.name} selected`
                            )
                          }
                          className="flex w-full items-center gap-3 rounded-[20px] border border-[#eadfd3] bg-white p-4 text-left transition active:scale-[0.98]"
                        >

                          <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#f8f1e9] text-[#5d5149]">
                            <FiCreditCard
                              size={18}
                            />
                          </div>

                          <div className="flex-1">

                            <h3 className="text-[13px] font-extrabold text-[#29231f]">
                              {payment.name}
                            </h3>

                            <p className="mt-1 text-[10px] text-[#958980]">
                              {payment.detail}
                            </p>

                          </div>

                          <FiChevronRight
                            size={16}
                            className="text-[#b4a9a0]"
                          />

                        </button>
                      )
                    )}

                  </div>

                  <button
                    type="button"
                    onClick={() =>
                      alert(
                        "Add payment method opened."
                      )
                    }
                    className="mt-4 flex w-full items-center justify-center gap-2 rounded-[18px] bg-[#ef3e32] py-3.5 text-sm font-bold text-white"
                  >
                    <FiPlus size={17} />
                    Add payment method
                  </button>

                </div>
              )}

              {/* =================================
                  ORDER HISTORY
              ================================== */}

              {activeModal === "orders" && (
                <div className="max-h-[70vh] overflow-y-auto p-5">

                  <div className="space-y-3">

                    {orderHistory.map(
                      (order) => (
                        <div
                          key={order.id}
                          className="rounded-[20px] border border-[#eadfd3] bg-white p-4"
                        >

                          <div className="flex items-center justify-between">

                            <div>

                              <p className="text-sm font-extrabold text-[#29231f]">
                                {order.id}
                              </p>

                              <p className="mt-1 text-[10px] text-[#958980]">
                                {order.date}
                              </p>

                            </div>

                            <span className="rounded-full bg-[#eaf7ef] px-2.5 py-1 text-[9px] font-bold text-[#2f8f5b]">
                              {order.status}
                            </span>

                          </div>

                          <div className="mt-4 border-t border-[#f0e8df] pt-3">

                            <p className="text-xs font-semibold text-[#5d5149]">
                              {order.items}
                            </p>

                            <div className="mt-2 flex items-center justify-between">

                              <span className="text-[11px] text-[#958980]">
                                Total paid
                              </span>

                              <span className="text-sm font-extrabold text-[#29231f]">
                                ₹{order.amount}
                              </span>

                            </div>

                          </div>

                        </div>
                      )
                    )}

                  </div>
                </div>
              )}

              {/* =================================
                  PRIVACY
              ================================== */}

              {activeModal ===
                "privacy" && (
                <div className="p-5">

                  <div className="space-y-3">

                    <button
                      type="button"
                      onClick={() =>
                        alert(
                          "Change password screen opened."
                        )
                      }
                      className="flex w-full items-center gap-3 rounded-[20px] border border-[#eadfd3] bg-white p-4 text-left"
                    >

                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#f8f1e9] text-[#5d5149]">
                        <FiLock size={17} />
                      </div>

                      <div className="flex-1">
                        <p className="text-[13px] font-bold">
                          Change password
                        </p>

                        <p className="mt-1 text-[10px] text-[#958980]">
                          Keep your account secure
                        </p>
                      </div>

                      <FiChevronRight size={16} />

                    </button>

                    <button
                      type="button"
                      onClick={() =>
                        alert(
                          "Login activity opened."
                        )
                      }
                      className="flex w-full items-center gap-3 rounded-[20px] border border-[#eadfd3] bg-white p-4 text-left"
                    >

                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#f8f1e9] text-[#5d5149]">
                        <FiShield size={17} />
                      </div>

                      <div className="flex-1">

                        <p className="text-[13px] font-bold">
                          Login activity
                        </p>

                        <p className="mt-1 text-[10px] text-[#958980]">
                          Review recent account activity
                        </p>

                      </div>

                      <FiChevronRight size={16} />

                    </button>

                    <button
                      type="button"
                      onClick={() =>
                        alert(
                          "Delete account request opened."
                        )
                      }
                      className="flex w-full items-center gap-3 rounded-[20px] border border-[#f1d5d0] bg-[#fff7f5] p-4 text-left"
                    >

                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#ffe7e2] text-[#d83b31]">
                        <FiTrash2 size={17} />
                      </div>

                      <div className="flex-1">

                        <p className="text-[13px] font-bold text-[#d83b31]">
                          Delete account
                        </p>

                        <p className="mt-1 text-[10px] text-[#a77d77]">
                          Permanently remove your account
                        </p>

                      </div>

                    </button>

                  </div>
                </div>
              )}

              {/* =================================
                  SETTINGS
              ================================== */}

              {activeModal ===
                "settings" && (
                <div className="p-5">

                  <div className="overflow-hidden rounded-[22px] border border-[#eadfd3] bg-white">

                    <div className="flex items-center gap-3 border-b border-[#f0e8df] p-4">

                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#f8f1e9]">
                        <FiBell size={17} />
                      </div>

                      <div className="flex-1">

                        <p className="text-[13px] font-bold">
                          Notifications
                        </p>

                        <p className="mt-1 text-[10px] text-[#958980]">
                          Order updates & offers
                        </p>

                      </div>

                      <button
                        type="button"
                        onClick={() =>
                          setNotifications(
                            !notifications
                          )
                        }
                        className={`relative h-7 w-12 rounded-full transition ${
                          notifications
                            ? "bg-[#ef3e32]"
                            : "bg-[#d7cec6]"
                        }`}
                      >

                        <span
                          className={`absolute top-1 h-5 w-5 rounded-full bg-white shadow-sm transition ${
                            notifications
                              ? "left-6"
                              : "left-1"
                          }`}
                        />

                      </button>

                    </div>

                    <div className="flex items-center gap-3 p-4">

                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#f8f1e9]">
                        <FiMoon size={17} />
                      </div>

                      <div className="flex-1">

                        <p className="text-[13px] font-bold">
                          Dark mode
                        </p>

                        <p className="mt-1 text-[10px] text-[#958980]">
                          Change app appearance
                        </p>

                      </div>

                      <button
                        type="button"
                        onClick={() =>
                          setDarkMode(!darkMode)
                        }
                        className={`relative h-7 w-12 rounded-full transition ${
                          darkMode
                            ? "bg-[#ef3e32]"
                            : "bg-[#d7cec6]"
                        }`}
                      >

                        <span
                          className={`absolute top-1 h-5 w-5 rounded-full bg-white shadow-sm transition ${
                            darkMode
                              ? "left-6"
                              : "left-1"
                          }`}
                        />

                      </button>

                    </div>

                  </div>
                </div>
              )}

              {/* =================================
                  HELP
              ================================== */}

              {activeModal === "help" && (
                <div className="p-5">

                  <div className="space-y-3">

                    <button
                      type="button"
                      onClick={() =>
                        alert(
                          "Opening live chat..."
                        )
                      }
                      className="flex w-full items-center gap-3 rounded-[20px] border border-[#eadfd3] bg-white p-4 text-left"
                    >

                      <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#eaf7ef] text-[#2f8f5b]">
                        <FiHelpCircle size={18} />
                      </div>

                      <div className="flex-1">

                        <p className="text-[13px] font-extrabold">
                          Live chat
                        </p>

                        <p className="mt-1 text-[10px] text-[#958980]">
                          Chat with our support team
                        </p>

                      </div>

                      <FiChevronRight size={16} />

                    </button>

                    <button
                      type="button"
                      onClick={() =>
                        window.open(
                          "tel:+919999999999"
                        )
                      }
                      className="flex w-full items-center gap-3 rounded-[20px] border border-[#eadfd3] bg-white p-4 text-left"
                    >

                      <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#fff0df] text-[#c87816]">
                        <FiPhone size={18} />
                      </div>

                      <div className="flex-1">

                        <p className="text-[13px] font-extrabold">
                          Call support
                        </p>

                        <p className="mt-1 text-[10px] text-[#958980]">
                          Available 24/7
                        </p>

                      </div>

                      <FiChevronRight size={16} />

                    </button>

                    <button
                      type="button"
                      onClick={() =>
                        window.open(
                          "mailto:support@crustandco.com"
                        )
                      }
                      className="flex w-full items-center gap-3 rounded-[20px] border border-[#eadfd3] bg-white p-4 text-left"
                    >

                      <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#f8f1e9] text-[#5d5149]">
                        <FiMail size={18} />
                      </div>

                      <div className="flex-1">

                        <p className="text-[13px] font-extrabold">
                          Email support
                        </p>

                        <p className="mt-1 text-[10px] text-[#958980]">
                          support@crustandco.com
                        </p>

                      </div>

                      <FiChevronRight size={16} />

                    </button>

                  </div>
                </div>
              )}

              {/* =================================
                  LOGOUT
              ================================== */}

              {activeModal ===
                "logout" && (
                <div className="p-5 text-center">

                  <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#ffe7e2] text-[#ef3e32]">
                    <FiLogOut size={27} />
                  </div>

                  <h3 className="mt-4 text-lg font-extrabold text-[#29231f]">
                    Log out of Crust & Co.?
                  </h3>

                  <p className="mx-auto mt-2 max-w-[280px] text-xs leading-5 text-[#958980]">
                    You can always sign back in to
                    access your favorites and orders.
                  </p>

                  <div className="mt-6 grid grid-cols-2 gap-3">

                    <button
                      type="button"
                      onClick={closeModal}
                      className="rounded-[17px] border border-[#eadfd3] bg-white py-3.5 text-sm font-bold text-[#5d5149]"
                    >
                      Cancel
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        closeModal();

                        setTimeout(() => {
                          alert(
                            "You have been logged out."
                          );
                        }, 200);
                      }}
                      className="rounded-[17px] bg-[#ef3e32] py-3.5 text-sm font-bold text-white"
                    >
                      Log out
                    </button>

                  </div>

                </div>
              )}

            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
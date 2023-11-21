const ROUTES = {
  ROOT: "ROOT",
  ABOUT: "ABOUT",
  BIZ_SIGNUP: "BIZ_SIGNUP",
  LOGOUT: "LOGOUT",
  MY_CARDS: "MY_CARDS",
  MY_FAV_CARDS: "MY_FAV_CARDS",
  LOGIN: "LOGIN",
  SIGNUP: "SIGNUP",
};

const ROUTES_DEF = {
  [ROUTES.ROOT]: { to: "/", label: "Home" },
  [ROUTES.ABOUT]: { to: "/about", label: "About" },
  [ROUTES.BIZ_SIGNUP]: { to: "/biz-signup", label: "Business Signup" },
  [ROUTES.LOGOUT]: { to: "/logout", label: "Logout" },
  [ROUTES.MY_CARDS]: { to: "/my-cards", label: "My Cards" },
  [ROUTES.MY_FAV_CARDS]: { to: "/my-fav-cards", label: "My Favorite Cards" },
  [ROUTES.LOGIN]: { to: "/login", label: "Login" },
  [ROUTES.SIGNUP]: { to: "/signup", label: "Signup" },
};

export { ROUTES_DEF, ROUTES };

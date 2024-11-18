import routes from "src/common/routes";

export const menuitems = [
  {
    title: "Home",
    route: routes.LANDING,
    hideBeforeAuth: false,
    hideAfterAuth: false,
  },
  {
    title: "Login",
    route: routes.LOGIN,
    hideBeforeAuth: false,
    hideAfterAuth: true,
  },
  {
    title: "Registration",
    route: routes.REGISTRATION,
    hideBeforeAuth: false,
    hideAfterAuth: true,
  },
  {
    title: "Tickets",
    route: routes.TICKETS,
    hideBeforeAuth: true,
    hideAfterAuth: false,
  },
  {
    title: "Logout",
    route: routes.LOGOUT,
    hideBeforeAuth: true,
    hideAfterAuth: false,
  },
  // {
  //   title: "Seats",
  //   route: routes.SEATS,
  //   hideBeforeAuth: true,
  //   hideAfterAuth: false,
  // },
];

export interface menuitemType {
  title: string;
  route: string;
  hideBeforeAuth: boolean;
  hideAfterAuth: boolean;
}

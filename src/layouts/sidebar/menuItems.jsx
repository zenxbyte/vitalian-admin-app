import DashboardIcon from "@mui/icons-material/Dashboard";
import LocalMallIcon from "@mui/icons-material/LocalMall";

import { NAVIGATION_ROUTES } from "../../navigation/navigationRoutes";

const Menuitems = [
  {
    navlabel: true,
    subheader: "Home",
  },
  {
    title: "Dashboard",
    icon: DashboardIcon,
    href: NAVIGATION_ROUTES.dashboard.base,
  },
  {
    navlabel: true,
    subheader: "Management",
  },
  {
    title: "Products",
    icon: LocalMallIcon,
    href: NAVIGATION_ROUTES.products.base,
  },
];

export default Menuitems;
import DashboardIcon from "@mui/icons-material/Dashboard";
import { NAVIGATION_ROUTES } from "../../../../navigation/navigationRoutes";

const Menuitems = [
  {
    navlabel: true,
    subheader: "Home",
  },
  {
    title: "Dashboard",
    icon: DashboardIcon,
    href: NAVIGATION_ROUTES.dashboard,
  },
];

export default Menuitems;

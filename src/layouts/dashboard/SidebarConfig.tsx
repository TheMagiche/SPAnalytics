// routes
import { PATH_DASHBOARD } from "../../routes/paths";
// components
import SvgIconStyle from "../../components/SvgIconStyle";

// ----------------------------------------------------------------------

const getIcon = (name: string) => (
  <SvgIconStyle
    src={`/static/icons/navbar/${name}.svg`}
    sx={{ width: "100%", height: "100%" }}
  />
);

const ICONS = {
  user: getIcon("ic_user"),
  ecommerce: getIcon("ic_ecommerce"),
  analytics: getIcon("ic_analytics"),
  dashboard: getIcon("ic_dashboard"),
};

const sidebarConfig = [
  // GENERAL
  // ----------------------------------------------------------------------
  {
    subheader: "General",
    items: [
      {
        title: "Dashboard",
        path: PATH_DASHBOARD.general.dashboard,
        icon: ICONS.dashboard,
      },
      // {
      //   title: "Expenses & Revenue",
      //   path: PATH_DASHBOARD.general.revenue,
      //   icon: ICONS.ecommerce,
      // },
      {
        title: "Procurement Analysis",
        path: PATH_DASHBOARD.general.analytics,
        icon: ICONS.analytics,
      },
    ],
  },

  // MANAGEMENT
  // ----------------------------------------------------------------------
  {
    subheader: "Management",
    items: [
      {
        title: "Administration",
        path: PATH_DASHBOARD.app.root,
        icon: ICONS.user,
        children: [
          { title: "Suppliers", path: PATH_DASHBOARD.app.suppliers },
          { title: "Global Settings", path: PATH_DASHBOARD.app.settings },
          { title: "Documentation", path: PATH_DASHBOARD.app.documentation },
        ],
      },
    ],
  },
];

export default sidebarConfig;

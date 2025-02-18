// ----------------------------------------------------------------------

function path(root: string, sublink: string) {
  return `${root}${sublink}`;
}

const ROOTS_DASHBOARD = "/dashboard";

// ----------------------------------------------------------------------

export const PATH_DASHBOARD = {
  root: ROOTS_DASHBOARD,
  general: {
    dashboard: path(ROOTS_DASHBOARD, "/overview"),
    revenue: path(ROOTS_DASHBOARD, "/revenue"),
    analytics: path(ROOTS_DASHBOARD, "/analytics"),
  },
  app: {
    root: path(ROOTS_DASHBOARD, "/app"),
    suppliers: path(ROOTS_DASHBOARD, "/app/suppliers"),
    settings: path(ROOTS_DASHBOARD, "/app/settings"),
    documentation: path(ROOTS_DASHBOARD, "/app/documentation"),
  },
};

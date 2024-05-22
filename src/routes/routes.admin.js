import { AdminLayout } from "../layouts";
import {
  HomeAdmin,
  UserAdmin,
  RankingVotes,
  VotacionPage,
} from "../pages/Admin";
import { DependencyPage } from "../pages/Admin/DependencyPage";
import { Error404 } from "../pages/Error404";

const routesAdmin = [
  {
    path: "/",
    layout: AdminLayout,
    component: HomeAdmin,
    exact: true,
  },
  {
    path: "/admin",
    layout: AdminLayout,
    component: HomeAdmin,
    exact: true,
  },
  {
    path: "/admin/users",
    layout: AdminLayout,
    component: UserAdmin,
    exact: true,
  },
  {
    path: "/admin/dependencies",
    layout: AdminLayout,
    component: DependencyPage,
    exact: true,
  },
  {
    path: "/admin/RankingVotes",
    layout: AdminLayout,
    component: RankingVotes,
    exact: true,
  },
  {
    path: "/admin/vote",
    layout: AdminLayout,
    component: VotacionPage,
    exact: true,
  },
  {
    path: "*",
    layout: AdminLayout,
    component: Error404,
  },
];

export default routesAdmin;

import { AdminLayout } from '../layouts/AdminLayout';
import { PublicLayout } from '../layouts/PublicLayout'; // Asegúrate de importar PublicLayout
import {
  HomeAdmin,
  UserAdmin,
  RankingVotes,
  VotacionPage,
  RevocationPage,
  forgetPasswordPage,
  ResetPasswordPage,
} from '../pages/Admin';
import { DependencyPage } from '../pages/Admin/DependencyPage';
import { Error404 } from '../pages/Error404';

const routes = [
  {
    path: "/admin",
    layout: AdminLayout,
    component: HomeAdmin,
    exact: true,
    requiresAuth: true,
  },
  {
    path: "/admin/forgetPassword",
    layout: PublicLayout,
    component: forgetPasswordPage,
    exact: true,
    requiresAuth: false,
  },
  {
    path: "/admin/resetPassword",
    layout: PublicLayout,
    component: ResetPasswordPage,
    exact: true,
    requiresAuth: false,
  },
  {
    path: "/admin/users",
    layout: AdminLayout,
    component: UserAdmin,
    exact: true,
    requiresAuth: true,
  },
  {
    path: "/admin/dependencies",
    layout: AdminLayout,
    component: DependencyPage,
    exact: true,
    requiresAuth: true,
  },
  {
    path: "/admin/RankingVotes",
    layout: AdminLayout,
    component: RankingVotes,
    exact: true,
    requiresAuth: true,
  },
  {
    path: "/admin/vote",
    layout: AdminLayout,
    component: VotacionPage,
    exact: true,
    requiresAuth: true,
  },
  {
    path: "/admin/vote/revocation",
    layout: PublicLayout,
    component: RevocationPage,
    exact: true,
    requiresAuth: false,
  },
  {
    path: "*",
    layout: PublicLayout,
    component: Error404,
  },
];

export default routes;

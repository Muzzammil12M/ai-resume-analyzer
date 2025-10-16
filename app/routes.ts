import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  route("/auth", "routes/auth.tsx"),
  route("/upload", "routes/Upload.tsx"),
  route("/resume/:id", "route/resume.tsx"),
] satisfies RouteConfig;

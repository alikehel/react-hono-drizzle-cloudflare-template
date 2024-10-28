import { createRouter } from "@/lib/create-app";
import { loginHandler, loginRoute } from "./routes/login";

export const authRouter = createRouter().openapi(loginRoute, loginHandler);

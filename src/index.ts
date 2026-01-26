import { Elysia } from "elysia";
import { dictionaryRoutes } from "./dictionary";

const app = new Elysia()
	.get("/health", () => ({ status: "ok" }));

dictionaryRoutes(app);
app.listen(3000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);

export default app;

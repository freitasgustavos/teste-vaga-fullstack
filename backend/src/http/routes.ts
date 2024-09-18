import type { FastifyInstance } from "fastify";
import { list } from "./controllers/transaction";

export async function Routes(app: FastifyInstance) {
  app.get("/transaction", list);
}

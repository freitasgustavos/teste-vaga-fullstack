import type { FastifyInstance } from "fastify";
import { upload } from "./controllers/transaction";

export async function Routes(app: FastifyInstance) {
  app.post("/transaction/upload", upload);
}

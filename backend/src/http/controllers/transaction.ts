import { FastifyRequest, FastifyReply } from "fastify";
import { Transactions } from "@/models/transactions";

export async function list(request: FastifyRequest, replay: FastifyReply) {
  const { page = 1 } = request.query as {
    page?: number;
  };

  const pageSize = 10;
  const offset = (page - 1) * pageSize;

  const transactions = await Transactions.find().skip(offset).limit(pageSize);

  const total = await Transactions.countDocuments();

  const pagination = {
    total,
    page: Number(page),
  };

  return replay.status(200).send({ transactions, pagination });
}

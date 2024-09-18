import { Readable } from "node:stream";
import { FastifyRequest, FastifyReply } from "fastify";
import csvParser from "csv-parser";
import { Transactions } from "@/models/transactions";
import { getSocketInstance } from "@/lib/socket";
import { formatNumber } from "@/utils";

export async function upload(request: FastifyRequest, replay: FastifyReply) {
  const file = await request.file();

  if (!file) {
    return replay.status(400).send("File not found");
  }

  const io = getSocketInstance();
  const buffer = await file.toBuffer();
  const stream = new Readable();
  const promises: Promise<any>[] = [];

  stream.push(buffer);
  stream.push(null);

  stream
    .pipe(csvParser())
    .on("data", async (row) => {
      const data = {
        nmClient: row.nmClient,
        nrCpfCnpj: row.nrCpfCnpj,
        vlTotal: formatNumber(row.vlTotal),
        idSituac: row.idSituac,
        qtPrestacoes: Number(row.qtPrestacoes),
        vlAtual: formatNumber(row.vlAtual),
        vlMora: formatNumber(row.vlMora),
        vlMulta: formatNumber(row.vlMulta),
        vlPresta: formatNumber(row.vlPresta),
        vlCorreto: row.vlTotal / row.qtPrestacoes === row.vlPresta,
      };
      
      promises.push(Transactions.create(data));
    })
    .on("end", async () => {
      await Promise.all(promises);
      io.emit("processed", "File processed successfully!");
      return replay.status(201).send();
    })
    .on("error", () => {
      return replay.status(500).send("Error processing file");
    });
}

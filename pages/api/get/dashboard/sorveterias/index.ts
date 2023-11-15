import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";

const prisma = new PrismaClient();

export default async function getDashboardProdutos(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const totalSorveterias = await prisma.sorveterias.count({});
    const listSorveterias = await prisma.sorveterias.findMany({});
    return res.status(200).send({
      sorveterias: listSorveterias,
      totalSorveterias,
      message: "Sorveterias listadas!",
    });
  } catch (err) {
    console.log(err);
    res.status(404).send({ message: "Erro ao buscar sorveterias" });
  }
}

import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";

const prisma = new PrismaClient();

export default async function getDashboardProdutos(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const totalProdutos = await prisma.produtos.count();
    const allProdutos = await prisma.produtos.findMany({});
    return res.status(200).send({
      produtos: allProdutos,
      totalProdutos,
      message: "Produtos listados!",
    });
  } catch (err) {
    console.log(err);
    return res.status(404).send({ message: "Erro ao buscar produtos." });
  }
}

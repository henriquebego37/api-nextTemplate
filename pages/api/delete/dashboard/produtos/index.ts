import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";

const prisma = new PrismaClient();

export default async function getDashboardProdutos(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { id } = req.query;
  try {
    console.log("try delete produto");
    const deleteProd = await prisma.produtos.delete({
      where: { id: Number(id) },
    });
    console.log("Success");
    return res
      .status(200)
      .send({ deleteProd, message: "Produto excluido com sucesso!" });
  } catch (err) {
    console.log(err);
    res.status(404).send({ message: "Produto deletado não existe." });
  }
}

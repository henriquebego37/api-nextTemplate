import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";

const prisma = new PrismaClient();

export default async function getDashboardProdutos(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { idsorveteria } = req.body;
  try {
    const estoque = await prisma.sorveterias_estoque.findMany({
      include: {
        produtos: true,
      },

      where: {
        idsorveteria,
      },
    });
    res
      .status(200)
      .send({ message: "Busca estoque realizada com sucesso!", estoque });
  } catch (err) {
    console.log(err);
    res.status(400).send({ message: "Erro busca estoque" });
  }
}

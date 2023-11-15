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

    const existeEstoque = estoque.length > 0;

    res.status(200).send({
      message: "Verificação de estoque concluída com sucesso!",
      existeEstoque,
    });
  } catch (err) {
    console.error(err);
    res.status(500).send({ message: "Erro na verificação de estoque" });
  }
}

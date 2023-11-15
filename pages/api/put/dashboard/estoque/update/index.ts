import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";

const prisma = new PrismaClient();

export default async function getDashboardProdutos(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { idsorveteria } = req.body;
  const produtos: any[] = req.body.produtos;

  try {
    if (produtos) {
      await produtos.forEach(async (e) => {
        await prisma.sorveterias_estoque.update({
          data: {
            quantidade: e.quantidade,
          },

          where: {
            idprodutos: e.idProdutos,
            id: e.idEstoque,
            idsorveteria,
          },
        });
      });
    }
    const estoque = await prisma.sorveterias_estoque.findMany({
      where: {
        idsorveteria,
      },
    });
    res
      .status(200)
      .send({ message: "Estoque atualizado com sucesso!", estoque });
  } catch (err) {
    console.log(err);
    res.status(400).send({ message: "Erro update estoque sorveteria", err });
  }
}

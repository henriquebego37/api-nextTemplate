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
      await Promise.all(
        produtos.map(async (e) => {
          const teste = await prisma.sorveterias_estoque.findMany({
            where: {
              idprodutos: e.idprodutos,
            },
          });
          if (teste.length === 0) {
            await prisma.sorveterias_estoque.create({
              data: {
                idprodutos: e.idprodutos,
                quantidade: e.quantidade,
                idsorveteria,
              },
            });
          }
        })
      );
    }
    const teste = await prisma.sorveterias_estoque.findMany({
      where: {
        idsorveteria,
      },
    });

    res.status(200).send({ message: "Estoque criado com sucesso!", teste });
  } catch (err) {
    console.log(err);
    res.status(400).send({ message: "Erro criação estoque sorveteria" });
  }
}

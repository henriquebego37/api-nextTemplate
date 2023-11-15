import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";

const prisma = new PrismaClient();

export default async function getDashboardProdutos(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { produtos } = req.body;
  const { tipo, sabor, thumb, nome, codigo } = produtos;

  const existingCodigo = await prisma.produtos.findFirst({
    where: { codigo: codigo },
  });

  if (existingCodigo) {
    return res.status(400).send({ message: "Código inserido já existente" });
  }

  try {
    const newProdutos = await prisma.produtos.create({
      data: {
        codigo,
        nome,
        thumb,
        tipo,
        sabor,
      },
    });
    res
      .status(200)
      .send({ newProdutos, message: " Produto cadastrado com sucesso" });
  } catch (err) {
    console.log(err);
    res.status(404).send({ message: "Erro ao cadastrar produto" });
  }
}

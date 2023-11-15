import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";

const prisma = new PrismaClient();

export default async function getDashboardProdutos(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const codSorveteria = req.query.codSorveteria;
    if (!codSorveteria) {
      return res
        .status(400)
        .send({ message: "Parâmetro 'codSorveteria' ausente na consulta" });
    }

    const sorveteriasKey = await prisma.sorveterias.findMany({
      where: {
        codigo: Number(codSorveteria),
      },
    });

    return res.status(200).send({
      sorveteriasKey,
      message: "Sorveterias encontradas por código!",
    });
  } catch (err) {
    console.log(err);
    res.status(500).send({ message: "Erro ao buscar sorveterias" });
  }
}

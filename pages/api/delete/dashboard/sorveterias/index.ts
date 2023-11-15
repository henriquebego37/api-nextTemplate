import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";

const prisma = new PrismaClient();

export default async function getDashboardProdutos(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { id } = req.query;
  try {
    const sorveteria = await prisma.sorveterias.findUnique({
      where: { id: Number(id) },
      include: { usuarios: true },
    });

    if (!sorveteria) {
      return res.status(404).send({ message: "Sorveteria não encontrada." });
    }

    if (sorveteria.usuarios) {
      await prisma.usuarios.delete({
        where: { id: sorveteria.usuarios.id },
      });
    }

    const deleteSorveteria = await prisma.sorveterias.delete({
      where: { id: Number(id) },
    });

    res.status(200).send({
      message: "Sorveteria removida com sucesso! Sorveteria removida:",
      deleteSorveteria,
    });
  } catch (err) {
    res
      .status(500)
      .send({ message: "Erro, não foi possível deletar sorveteria." });
    console.error(err);
  }
}

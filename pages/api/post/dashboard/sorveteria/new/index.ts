import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";

const prisma = new PrismaClient();

const bcrypt = require("bcrypt");

export default async function getDashboardProdutos(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Corpo body

  // ----------------------------------------------------------->

  const { sorveteria, usuario } = req.body;

  const { codigo, responsavel, endereco, cidade, telefone, thumb, ativo } =
    sorveteria;

  const { login, senha } = usuario;

  // Verificações

  // ----------------------------------------------------------->

  const existingUser = await prisma.usuarios.findUnique({
    where: { login },
  });

  const existingCodigo = await prisma.sorveterias.findFirst({
    where: { codigo: codigo },
  });

  if (existingCodigo) {
    return res.status(400).send({ message: "Erro, o código já existe." });
  }

  if (existingUser) {
    return res.status(401).send({ message: "Erro, o login já existe." });
  }

  if (senha.length < 8) {
    return res
      .status(402)
      .send({ message: "A senha deve ter no mínimo 8 caracteres." });
  }

  // Função hash

  const saltRounds = 10;
  const hashCode = await bcrypt.hash(senha, saltRounds);

  // ----------------------------------------------------------->

  try {
    const newSorveteria = await prisma.sorveterias.create({
      data: {
        codigo,
        responsavel,
        endereco,
        cidade,
        telefone,
        thumb,
        ativo,
        usuarios: {
          create: {
            login: String(login),
            senha: String(hashCode),
            tipo: 2,
          },
        },
      },
    });
    console.log({ newSorveteria });

    res.status(200).send({ message: "Sorveteria cadastrada com sucesso" });
  } catch (err) {
    console.error(err);
    res.status(500).send({ message: "Erro ao cadastrar sorveteria" });
  }
}

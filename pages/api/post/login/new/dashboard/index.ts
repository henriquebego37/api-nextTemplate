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

  const { login, senha } = req.body;

  // Verificações

  // ----------------------------------------------------------->

  const existingUser = await prisma.usuarios.findUnique({
    where: { login },
  });

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
    const newUserDashboard = await prisma.usuarios.create({
      data: {
        login: String(login),
        senha: String(hashCode),
        tipo: 1,
      },
    });
    console.log({ newUserDashboard });
    console.log("Login:", login);
    console.log("Senha:", senha);

    res.status(200).send({
      usuarioCriado: newUserDashboard,
      message: "Usuário cadastrado com sucesso",
    });
  } catch (err) {
    console.error(err);
    res.status(500).send({ message: "Erro ao cadastrar usuário" });
  }
}

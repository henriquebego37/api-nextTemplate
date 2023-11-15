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

  try {
    const loginAcess = await prisma.usuarios.findUnique({
      select: {
        sorveterias: true,
        senha: true,
      },
      where: {
        login: String(login),
        tipo: 2,
      },
    });

    console.log("Login:", login);
    console.log("Senha:", senha);

    if (!loginAcess) {
      return res.status(404).send({ message: "Usuário não encontrado" });
    }
    const comparePassword = await bcrypt.compare(senha, loginAcess.senha);

    if (!comparePassword) {
      return res.status(401).send({ message: "Senha incorreta" });
    }

    return res.status(200).send({ loginAcess, message: "Acesso verificado!" });
  } catch (err) {
    console.error(err);
    return res.status(500).send({ message: "Erro inesperado." });
  }
}

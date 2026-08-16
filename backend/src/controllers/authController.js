import pool from "../database/database.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

class AuthController {
  async login(req, res) {
    try {
      const { email, senha } = req.body;

      const [rows] = await pool.execute(
        `SELECT u.id_usuario, u.nome, u.email, u.senha, u.id_role, r.role_name
         FROM usuarios u
         JOIN roles r ON u.id_role = r.id_role
         WHERE u.email = ?;`,
        [email],
      );

      const usuario = rows[0];

      if (!usuario) {
        return res.status(401).json({ message: "Email ou senha inválidos" });
      }

      const senhaCorreta = await bcrypt.compare(senha, usuario.senha);

      if (!senhaCorreta) {
        return res.status(401).json({ message: "Email ou senha inválidos" });
      }

      const token = jwt.sign(
        {
          id_usuario: usuario.id_usuario,
          id_role: usuario.id_role,
          role_name: usuario.role_name,
        },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: "8h" },
      );

      res.json({
        message: "Login realizado com sucesso",
        token,
        usuario: {
          id_usuario: usuario.id_usuario,
          nome: usuario.nome,
          email: usuario.email,
          role: usuario.role_name,
        },
      });
    } catch (error) {
      res.status(500).json({ message: `Erro ao fazer login: ${error}` });
    }
  }
}

export default new AuthController();
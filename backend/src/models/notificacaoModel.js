import pool from "../database/database.js";

class NotificacaoModel {
  async selectByUsuario(id_usuario) {
    const query = `
      SELECT * FROM notificacoes
      WHERE id_usuario = ?
      ORDER BY criado_em DESC;
    `;
    const [rows] = await pool.execute(query, [id_usuario]);
    return rows;
  }

  async create({ id_usuario, tipo, titulo, mensagem }) {
    const [result] = await pool.execute(
      `INSERT INTO notificacoes (id_usuario, tipo, titulo, mensagem) VALUES (?, ?, ?, ?);`,
      [id_usuario, tipo, titulo, mensagem],
    );
    return { id_notificacao: result.insertId };
  }

  async marcarComoLida(id_notificacao) {
    const [result] = await pool.execute(
      `UPDATE notificacoes SET lida = TRUE WHERE id_notificacao = ?;`,
      [id_notificacao],
    );
    return result;
  }
}

export default new NotificacaoModel();
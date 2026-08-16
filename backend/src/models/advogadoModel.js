import pool from "../database/database.js";

class AdvogadoModel {
  async selectAll() {
    const query = `
      SELECT a.id_advogado, u.nome, u.email, u.telefone, a.oab_numero, a.oab_uf
      FROM advogados a
      JOIN usuarios u ON a.id_usuario = u.id_usuario;
    `;
    const [rows] = await pool.execute(query);
    return rows;
  }

  async selectById(id_advogado) {
    const query = `
      SELECT a.id_advogado, u.nome, u.email, u.telefone, a.oab_numero, a.oab_uf
      FROM advogados a
      JOIN usuarios u ON a.id_usuario = u.id_usuario
      WHERE a.id_advogado = ?;
    `;
    const [rows] = await pool.execute(query, [id_advogado]);
    return rows;
  }

  async create({ nome, email, senha, telefone, oab_numero, oab_uf }) {
    const [userResult] = await pool.execute(
      `INSERT INTO usuarios (nome, email, senha, telefone, id_role) VALUES (?, ?, ?, ?, 2);`,
      [nome, email, senha, telefone],
    );
    const id_usuario = userResult.insertId;

    const [advResult] = await pool.execute(
      `INSERT INTO advogados (id_usuario, oab_numero, oab_uf) VALUES (?, ?, ?);`,
      [id_usuario, oab_numero, oab_uf],
    );

    return { id_advogado: advResult.insertId };
  }

  async delete(id_advogado) {
    const [result] = await pool.execute(
      `DELETE u FROM usuarios u
       JOIN advogados a ON a.id_usuario = u.id_usuario
       WHERE a.id_advogado = ?;`,
      [id_advogado],
    );
    return result;
  }
}

export default new AdvogadoModel();
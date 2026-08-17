import processoModel from "../models/processosModel.js";
import pool from "../database/database.js";

class ProcessosController {
  // Lista os processos conforme o perfil de quem está logado
  async selectAll(req, res) {
    try {
      const { id_usuario, role_name } = req.usuario;

      if (role_name === "advogado") {
        const [advRows] = await pool.execute(
          `SELECT id_advogado FROM advogados WHERE id_usuario = ?;`,
          [id_usuario],
        );
        const processos = await processoModel.selectByAdvogado(advRows[0].id_advogado);
        return res.json(processos);
      }

      if (role_name === "cliente") {
        const [cliRows] = await pool.execute(
          `SELECT id_cliente FROM clientes WHERE id_usuario = ?;`,
          [id_usuario],
        );
        const processos = await processoModel.selectByCliente(cliRows[0].id_cliente);
        return res.json(processos);
      }

      res.status(403).json({ message: "Perfil não reconhecido" });
    } catch (error) {
      res.status(500).json({ message: `Erro ao listar processos: ${error}` });
    }
  }

  async selectById(req, res) {
    const { id } = req.params;
    const [processo] = await processoModel.selectById(id);
    if (!processo) {
      return res.status(404).json({ message: "Processo não encontrado" });
    }
    res.json(processo);
  }

  // Só advogado cria (garantido pela rota com checkRole)
  async create(req, res) {
    try {
      const { id_usuario } = req.usuario;
      const { numero_processo, titulo, tribunal, id_cliente, data_abertura, proxima_audiencia } = req.body;

      const [advRows] = await pool.execute(
        `SELECT id_advogado FROM advogados WHERE id_usuario = ?;`,
        [id_usuario],
      );
      const id_advogado = advRows[0].id_advogado;

      const processo = await processoModel.create({
        numero_processo,
        titulo,
        tribunal,
        id_cliente,
        id_advogado,
        data_abertura,
        proxima_audiencia,
      });

      res.status(201).json({ message: "Processo criado!", id: processo.id_processo });
    } catch (error) {
      res.status(500).json({ message: `Erro ao criar processo: ${error}` });
    }
  }

  async updateStatus(req, res) {
    const { id } = req.params;
    const { status } = req.body;
    await processoModel.updateStatus(id, status);
    res.json({ message: "Status atualizado" });
  }

  async delete(req, res) {
    const { id } = req.params;
    await processoModel.delete(id);
    res.json({ message: "Processo removido" });
  }
}

export default new ProcessosController();
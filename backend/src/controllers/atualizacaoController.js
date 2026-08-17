import atualizacaoModel from "../models/atualizacaoModel.js";
import processoModel from "../models/processosModel.js";
class AtualizacaoController {
  // GET /processos/:id_processo/atualizacoes
  async selectByProcesso(req, res) {
    try {
      const { id_processo } = req.params;
      const atualizacoes = await atualizacaoModel.selectByProcesso(id_processo);
      res.json(atualizacoes);
    } catch (error) {
      res.status(500).json({ message: `Erro ao listar atualizações: ${error}` });
    }
  }

  // POST /processos/:id_processo/atualizacoes — só advogado
  async create(req, res) {
    try {
      const { id_processo } = req.params;
      const { titulo, descricao, status, data_evento } = req.body;

      const atualizacao = await atualizacaoModel.create({
        id_processo,
        titulo,
        descricao,
        status,
        data_evento,
      });

      // Se veio um status novo, atualiza também o status geral do processo
      if (status) {
        await processoModel.updateStatus(id_processo, status);
      }

      res.status(201).json({ message: "Atualização registrada!", id: atualizacao.id_atualizacao });
    } catch (error) {
      res.status(500).json({ message: `Erro ao criar atualização: ${error}` });
    }
  }

  async delete(req, res) {
    const { id } = req.params;
    await atualizacaoModel.delete(id);
    res.json({ message: "Atualização removida" });
  }
}

export default new AtualizacaoController();
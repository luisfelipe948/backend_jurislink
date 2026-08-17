import notificacaoModel from "../models/notificacaoModel.js";

class NotificacaoController {
  // GET /notificacoes — cada usuário vê só as próprias
  async selectAll(req, res) {
    try {
      const { id_usuario } = req.usuario;
      const notificacoes = await notificacaoModel.selectByUsuario(id_usuario);
      res.json(notificacoes);
    } catch (error) {
      res.status(500).json({ message: `Erro ao listar notificações: ${error}` });
    }
  }

  async marcarComoLida(req, res) {
    const { id } = req.params;
    await notificacaoModel.marcarComoLida(id);
    res.json({ message: "Notificação marcada como lida" });
  }
}

export default new NotificacaoController();
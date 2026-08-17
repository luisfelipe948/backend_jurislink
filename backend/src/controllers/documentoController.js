import documentoModel from "../models/documentoModel.js";

class DocumentoController {
  async selectByProcesso(req, res) {
    try {
      const { id_processo } = req.params;
      const documentos = await documentoModel.selectByProcesso(id_processo);
      res.json(documentos);
    } catch (error) {
      res.status(500).json({ message: `Erro ao listar documentos: ${error}` });
    }
  }

  async create(req, res) {
    try {
      const { id_processo } = req.params;
      const { id_usuario } = req.usuario;

      if (!req.file) {
        return res.status(400).json({ message: "Nenhum arquivo enviado" });
      }

      const documento = await documentoModel.create({
        id_processo,
        enviado_por: id_usuario,
        nome: req.file.originalname,
        arquivo_url: req.file.path, // caminho onde o multer salvou
        tamanho_bytes: req.file.size,
      });

      res.status(201).json({ message: "Documento enviado!", id: documento.id_documento });
    } catch (error) {
      res.status(500).json({ message: `Erro ao enviar documento: ${error}` });
    }
  }

  async delete(req, res) {
    const { id } = req.params;
    await documentoModel.delete(id);
    res.json({ message: "Documento removido" });
  }
}

export default new DocumentoController();
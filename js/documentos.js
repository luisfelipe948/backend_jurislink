const dynamicDocuments = document.getElementById("dynamicDocuments");

if (dynamicDocuments) {

    const documentos =
        JSON.parse(localStorage.getItem("jurislink_documentos")) || [];

    documentos.forEach(function(documento) {

        const card = document.createElement("article");

        card.classList.add("document-card");

        card.innerHTML = `
            <div class="document-icon">
                📄
            </div>

            <div class="document-content">

                <span class="document-type">
                    ${pegarExtensao(documento.arquivo)}
                </span>

                <h2>
                    ${documento.nome}
                </h2>

                <p>
                    Processo ${documento.processo}
                </p>

                <div class="document-details">

                    <span>
                        ${documento.tamanho}
                    </span>

                    <span>
                        ${documento.data}
                    </span>

                </div>

            </div>

            <div class="document-actions">

                <button class="btn-view">
                    Visualizar
                </button>

                <button class="btn-download">
                    Baixar
                </button>

            </div>
        `;

        dynamicDocuments.appendChild(card);

    });

}


function pegarExtensao(nomeArquivo) {

    if (!nomeArquivo) {
        return "ARQUIVO";
    }

    const partes = nomeArquivo.split(".");

    return partes.length > 1
        ? partes.pop().toUpperCase()
        : "ARQUIVO";
}
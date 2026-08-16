const documentForm = document.getElementById("documentForm");
const successMessage = document.getElementById("successMessage");

if (documentForm) {

    documentForm.addEventListener("submit", function(event) {

        event.preventDefault();

        const cliente = document.getElementById("cliente").value;
        const processo = document.getElementById("processo").value;
        const nomeDocumento =
            document.getElementById("nomeDocumento").value;

        const descricao =
            document.getElementById("descricaoDocumento").value;

        const arquivoInput =
            document.getElementById("arquivo");

        const arquivo = arquivoInput.files[0];

        if (!arquivo) {
            return;
        }

        const novoDocumento = {

            cliente: cliente,

            processo: processo,

            nome: nomeDocumento,

            descricao: descricao,

            arquivo: arquivo.name,

            tamanho: formatarTamanho(arquivo.size),

            data: new Date().toLocaleDateString("pt-BR")

        };


        let documentos = JSON.parse(
            localStorage.getItem("jurislink_documentos")
        ) || [];


        documentos.unshift(novoDocumento);


        localStorage.setItem(
            "jurislink_documentos",
            JSON.stringify(documentos)
        );


        successMessage.style.display = "block";

        documentForm.reset();


        setTimeout(function() {

            window.location.href = "documentos-advogado.html";

        }, 1200);

    });

}


function formatarTamanho(bytes) {

    if (bytes < 1024) {
        return bytes + " B";
    }

    if (bytes < 1024 * 1024) {
        return (bytes / 1024).toFixed(1) + " KB";
    }

    return (bytes / (1024 * 1024)).toFixed(1) + " MB";
}
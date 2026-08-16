const updateForm = document.getElementById("updateForm");
const successMessage = document.getElementById("successMessage");

if (updateForm) {

    updateForm.addEventListener("submit", function(event) {

        event.preventDefault();

        const titulo = document.getElementById("titulo").value;
        const descricao = document.getElementById("descricao").value;
        const data = document.getElementById("data").value;
        const status = document.getElementById("status").value;

        const novaAtualizacao = {
            titulo: titulo,
            descricao: descricao,
            data: data,
            status: status
        };

        let atualizacoes = JSON.parse(
            localStorage.getItem("jurislink_atualizacoes")
        ) || [];

        atualizacoes.unshift(novaAtualizacao);

        localStorage.setItem(
            "jurislink_atualizacoes",
            JSON.stringify(atualizacoes)
        );

        successMessage.style.display = "block";

        updateForm.reset();

        setTimeout(function() {

            window.location.href = "processos-advogado.html";

        }, 1200);

    });

}
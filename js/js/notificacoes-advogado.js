const markAllRead = document.getElementById("markAllRead");

if (markAllRead) {

    markAllRead.addEventListener("click", function() {

        const notificacoes =
            document.querySelectorAll(".notification-card");

        const pontos =
            document.querySelectorAll(".unread-dot");

        notificacoes.forEach(function(notificacao) {
            notificacao.classList.remove("unread");
        });

        pontos.forEach(function(ponto) {
            ponto.remove();
        });

        markAllRead.textContent = "Todas lidas";
        markAllRead.disabled = true;

    });

}
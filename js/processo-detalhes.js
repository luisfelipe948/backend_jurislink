const dynamicTimeline = document.getElementById("dynamicTimeline");

if (dynamicTimeline) {

    const atualizacoes = JSON.parse(
        localStorage.getItem("jurislink_atualizacoes")
    ) || [];

    atualizacoes.forEach(function(atualizacao) {

        const dataFormatada = formatarData(atualizacao.data);

        const timelineItem = document.createElement("div");

        timelineItem.classList.add("timeline-item");

        timelineItem.innerHTML = `
            <div class="timeline-marker"></div>

            <div class="timeline-content">

                <span class="timeline-date">
                    ${dataFormatada}
                </span>

                <h3>
                    ${atualizacao.titulo}
                </h3>

                <p>
                    ${atualizacao.descricao}
                </p>

                <span class="timeline-status">
                    ${atualizacao.status}
                </span>

            </div>
        `;

        dynamicTimeline.appendChild(timelineItem);

    });

}


function formatarData(data) {

    if (!data) {
        return "";
    }

    const partes = data.split("-");

    return `${partes[2]}/${partes[1]}/${partes[0]}`;
}
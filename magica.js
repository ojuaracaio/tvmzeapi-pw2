function pegarEpisodios(id) {
    $.ajax({
        url: `https://api.tvmaze.com/shows/${id}/episodes`,
        method: "GET",
        success: function(ret) {
            limparEpisodios();
            for (episodio of ret) {
                adicionarEpisodios(episodio);
            }
        }
    });
}

function adicionarEpisodios(episodio) {
    let modelo = `
        <tr>
            <td>${episodio.season}</td>
            <td>${episodio.number}</td>
            <td>${episodio.name}</td>
            <td>${episodio.airdate}</td>
        </tr>`;
    $("#linhas").append(modelo);
}

function adicionarTitulo(titulo) {
    let modelo = `
                <ul>
                    <li><a onclick="pegarEpisodios(${titulo.show.id})" href="javascript:void(0);">${titulo.show.name}</li>
                </ul>`;
    $("#ul_series").append(modelo);
}

function limparSeries() {
    let cabecalho = `<h3>Séries encontradas:</h3>`;
    $("#ul_series").empty();
    $("#ul_series").append(cabecalho);
    $("#episodios").empty();
}

function limparEpisodios() {
    let cabecalho = `
            <thead>
                <tr>
                    <th scope="col">Temporada</th>
                    <th scope="col">Episódio</th>
                    <th scope="col">Nome</th>
                    <th scope="col">Data</th>
                </tr>
            </thead>
            <tbody id = "linhas"></tbody>`;
    $("#episodios").empty();
    $("#episodios").append(cabecalho);
}

function pegarSerie() {
    let serie = $("[name=serie]").val();
    $.ajax({
        url: `https://api.tvmaze.com/search/shows?q=${serie}`,
        method: "GET",
        success: function(ret) {
            limparSeries();
            for (titulo of ret) {
                adicionarTitulo(titulo);
            }
        }
    });
}

$("#busca").submit(function(e) {
    e.preventDefault();
    pegarSerie();
});
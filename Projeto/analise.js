const userId = localStorage.getItem('UserId');
console.log(userId);
const tabelaHistorico = document.getElementById('tabelaDados')
const metaMes = document.getElementById('metaMes')
const quantMes = document.getElementById('quantMes')

function obterAnoMesAtual() {
    const dataAtual = new Date();
    const ano = dataAtual.getFullYear();
    const mes = (dataAtual.getMonth() + 1).toString().padStart(2, '0');
    return `${ano}-${mes}`;
}

const dataFormatada = obterAnoMesAtual();
console.log(dataFormatada);

const generate = (json) => {
    tes = json
    const newTable = json.map((dado) => `
                    <tr>
                      <td>${dado.CreateMonth}</td>
                      <td>${(dado.CreateMonth === obterAnoMesAtual()) ? "Em andamento" : "Encerrado"}</td>
                      <td>${dado.Produzido/1000}</td>
                      <td>88%</td>
                      <td>Sim</td>
                      <td>10%</td>
                      <td class="${(dado.Meta > dado.Armazenado/1000) ? "down" : "up" }">${(dado.Meta > dado.Armazenado/1000) ? "↓" : "↑" } ${(((dado.Armazenado/1000)/dado.Meta) * 100).toFixed(1)}%</td>
                    </tr>
    `).join('')
    const newMeta = `
                <span class="percentage">${(((json[json.length - 1].Armazenado/1000)/json[json.length - 1].Meta) * 100).toFixed(1)}%</span>
                <span class="change ${(json[json.length - 1].Meta > (json[json.length - 1].Armazenado/1000)) ? "down" : "up" }">${(json[json.length - 1].Meta > (json[json.length - 1].Armazenado/1000)) ? "↓" : "↑" } ${(((json[json.length - 1].Armazenado/1000)/json[json.length - 1].Meta) * 100).toFixed(1)}</span>`
    tabelaHistorico.innerHTML += newTable
    metaMes.innerHTML += newMeta
    quantMes.innerHTML += json[json.length - 1].Distribuido/1000
}
if (userId > 0){
    try{
        const requisicao = async (userId) =>{
            let response = await $.ajax({
                url:buildUrl(`Energia?id=${userId}`),
                type: "GET",
            })
            console.log(response)
            generate(response)
        }
        requisicao(userId);
    }catch{
        generate(dadoTesteMocado);
    }
}else{
    generate(dadoTesteMocado);
}
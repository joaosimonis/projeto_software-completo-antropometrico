const form = document.querySelector("#formulario") // Selecionando o formulário


// Adicionando um ouvinte de eventos ao botão de enviar
form.addEventListener('submit', function(e) { 
    e.preventDefault(e) // Evita que ao enviar o formulário a página seja carrregada
    
    // Obtendo os valores de peso e percentual de gordura
    const inputPeso = e.target.querySelector("#peso")
    const inputPercentualGordura = e.target.querySelector("#percentualGordura")

    const peso = Number(inputPeso.value.replace(",", "."))
    const percentualGordura = Number(inputPercentualGordura.value.replace(",", "."))

    // Validando os valores de peso e percentual de gordura
    if (!peso || !percentualGordura) {
        setResultado('Por favor, verifique se preencheu todos os campos. Lembre de digitar apenas números!', false)
        return
    }

    // Obtendo os valores das funções auxiliares 
    const pg = getPG(peso, percentualGordura)

    const msg = `Seu peso gordo é ${pg}kg` // Configurando a mensagem de resultado

    setResultado(msg, true, pg) // Exibindo o resultado
})

// Função que vai calcular o peso gordo (PG) com base no peso e percentual de gordura
function getPG (peso, percentualGordura) {
    const pg = (percentualGordura * peso) / 100
    return pg.toFixed(2)
}

// Função que vai criar um elemento de parágrafo
function criaP () {
    const p = document.createElement('p')
    return p
}

// Função que vai definir a mensagem de resultado e a exibe no HTML
function setResultado (msg, isValid, pg) {
    const resultado = document.querySelector("#resultado")
    resultado.innerHTML = ''

    const p = criaP()
    p.textContent = msg

    if (isValid) {
        p.classList.add('paragrafo-resultado')
    } else {
        p.classList.add('bad')
    }

    resultado.appendChild(p)
}
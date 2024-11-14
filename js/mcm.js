const form = document.querySelector("#formulario") // Selecionando o formulário


// Adicionando um ouvinte de eventos ao botão de enviar
form.addEventListener('submit', function(e) { 
    e.preventDefault(e) // Evita que ao enviar o formulário a página seja carrregada
    
    // Obtendo os valores de peso atual e peso gordo
    const inputPesoAtual = e.target.querySelector("#peso_atual")
    const inputPesoGordo = e.target.querySelector("#peso_gordo")

    const pesoAtual = Number(inputPesoAtual.value.replace(",", "."))
    const pesoGordo = Number(inputPesoGordo.value.replace(",", "."))

    // Validando os valores do peso atual e peso gordo
    if (!pesoAtual || !pesoGordo) {
        setResultado('Por favor, verifique se preencheu todos os campos. Lembre de digitar apenas números!', false)
        return
    }

    // Obtendo os valores das funções auxiliares 
    const mcm = getMcm(pesoAtual, pesoGordo)

    const msg = `Sua massa corporal magra é ${mcm}kg` // Configurando a mensagem de resultado

    setResultado(msg, true, mcm) // Exibindo o resultado
})

// Função que vai calcular a massa corporal magra (MCM) com base no peso atual e peso gordo
function getMcm (pesoAtual, pesoGordo) {
    const mcm = pesoAtual - pesoGordo
    return mcm.toFixed(2)
}

// Função que vai criar um elemento de parágrafo
function criaP () {
    const p = document.createElement('p')
    return p
}

// Função que vai definir a mensagem de resultado e a exibe no HTML
function setResultado (msg, isValid, mcm) {
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
const form = document.querySelector("#formulario") // Selecionando o formulário


// Adicionando um ouvinte de eventos ao botão de enviar
form.addEventListener('submit', function(e) { 
    e.preventDefault(e) // Evita que ao enviar o formulário a página seja carrregada
    
    // Obtendo os valores de mcm e percentual de gordura desejado
    const inputMcm = e.target.querySelector("#mcm")
    const inputPgDesejado = e.target.querySelector("#pg_desejado")

    const mcm = Number(inputMcm.value.replace(",", "."))
    const pg_desejado = Number(inputPgDesejado.value.replace(",", "."))

    // Validando os valores de massa corporal magra e peso desejado
    if (!mcm || !pg_desejado) {
        setResultado('Por favor, verifique se preencheu todos os campos. Lembre de digitar apenas números!', false)
        return
    }

    // Obtendo os valores das funções auxiliares 
    const peso_alvo = getPesoAlvo(mcm, pg_desejado)

    const msg = `Seu peso alvo é ${peso_alvo}kg` // Configurando a mensagem de resultado

    setResultado(msg, true, peso_alvo) // Exibindo o resultado
})

// Função que vai calcular o peso alvo com base na mcm e percentual de gordura desejado
function getPesoAlvo (mcm, pg_desejado) {
    const peso_alvo = (mcm * 100) / (100 - pg_desejado)
    return peso_alvo.toFixed(2)
}

// Função que vai criar um elemento de parágrafo
function criaP () {
    const p = document.createElement('p')
    return p
}

// Função que vai definir a mensagem de resultado e a exibe no HTML
function setResultado (msg, isValid, peso_alvo) {
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
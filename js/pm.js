const form = document.querySelector("#formulario") // Selecionando o formulário

// Adicionando um ouvinte de eventos ao botão de enviar
form.addEventListener('submit', function(e) { 
    e.preventDefault(e) // Evita que ao enviar o formulário a página seja carrregada
    
    // Obtendo os valores de peso atual, peso gordo, peso ósseo e peso residual
    const inputPeso = e.target.querySelector("#peso")
    const inputPesoGordo = e.target.querySelector("#peso_gordo")
    const inputPesoOsseo = e.target.querySelector("#peso_osseo")
    const inputPesoResidual = e.target.querySelector("#peso_residual")

    const peso = Number(inputPeso.value.replace(",", "."))
    const peso_gordo = Number(inputPesoGordo.value.replace(",", "."))
    const peso_osseo = Number(inputPesoOsseo.value.replace(",", "."))
    const peso_residual = Number(inputPesoResidual.value.replace(",", "."))

    // Validando os valores de peso, peso gordo, peso ósseo e peso residual
    if (!peso || !peso_gordo || !peso_osseo || !peso_residual) {
        setResultado('Por favor, verifique se preencheu todos os campos. Lembre de digitar apenas números!', false)
        return
    }

    // Obtendo os valores das funções auxiliares 
    const peso_muscular = getPesoMuscular(peso, peso_gordo, peso_osseo, peso_residual)

    const msg = `Seu Peso Muscular é ${peso_muscular}kg` // Configurando a mensagem de resultado

    setResultado(msg, true, peso_muscular) // Exibindo o resultado
})

// Função que vai calcular o peso residual com base no peso atual, peso gordo, peso ósseo e peso residual
function getPesoMuscular(peso, peso_gordo, peso_osseo, peso_residual) {
    const pm = peso - (peso_gordo + peso_osseo + peso_residual)
    return pm.toFixed(2)
}

// Função que vai criar um elemento de parágrafo
function criaP () {
    const p = document.createElement('p')
    return p
}

// Função que vai definir a mensagem de resultado e a exibe no HTML
function setResultado (msg, isValid, pm) {
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
const form = document.querySelector("#formulario") // Selecionando o formulário

// Adicionando um ouvinte de eventos ao botão de enviar
form.addEventListener('submit', function(e) { 
    e.preventDefault(e) // Evita que ao enviar o formulário a página seja carrregada
    
    // Obtendo os valores de peso e sexo
    const inputPeso = e.target.querySelector("#peso")
    const inputSexo = e.target.querySelector('input[name="sexo"]:checked')

    const peso = Number(inputPeso.value.replace(",", "."))
    const sexo = inputSexo.value

    // Validando os valores de peso
    if (!peso) {
        setResultado('Por favor, verifique se preencheu todos os campos. Lembre de digitar apenas números!', false)
        return
    }

    // Obtendo os valores das funções auxiliares 
    const pr = getPr(peso, sexo)

    const msg = `Seu Peso Residual é ${pr}kg` // Configurando a mensagem de resultado

    setResultado(msg, true, pr, sexo) // Exibindo o resultado
})

// Função que vai calcular o peso residual com base no peso atual e sexo fornecidos
function getPr(peso, sexo) {
    if (sexo === "masculino") {
        return (peso * (24.1 / 100)).toFixed(2) // Fórmula para homens
    } else if (sexo === "feminino") {
        return (peso * (20.9 / 100)).toFixed(2) // Fórmula para mulheres
    } 
}

// Função que vai criar um elemento de parágrafo
function criaP () {
    const p = document.createElement('p')
    return p
}

// Função que vai definir a mensagem de resultado e a exibe no HTML
function setResultado (msg, isValid, rcq, sexo) {
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
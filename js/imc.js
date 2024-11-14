const form = document.querySelector("#formulario") // Selecionando o formulário

// Adicionando um ouvinte de eventos ao botão de enviar
form.addEventListener('submit', function(e) { 
    e.preventDefault() // Evita que ao enviar o formulário a página seja carrregada
    
    // Obtendo os valores de peso e altura
    const inputPeso = e.target.querySelector("#peso")
    const inputAltura = e.target.querySelector("#altura")

    // Validando ser um número
    const peso = Number(inputPeso.value.replace(",", ".")) // Se a pessoa digitar vírgula, vai validar também
    const altura = Number(inputAltura.value.replace(",", "."))

    // Validando os valores de peso e altura
    if (!peso || !altura) {
        setResultado('Por favor, verifique se preencheu todos os campos. Lembre de digitar apenas números!', false)
        return
    }

    // Obtendo os valores das funções auxiliares 
    const imc = getImc(peso, altura)
    const nivelImc = getNivelImc(imc)

    const msg = `Seu IMC é ${imc}kg/m\u00B2 (${nivelImc})` // Configurando a mensagem de resultado

    setResultado(msg, true, imc) // Exibindo o resultado
})


// Função que vai retornar o nível do IMC com base no valor fornecido
function getNivelImc (imc) {
    const nivel = ['Abaixo do peso', 'Peso normal', 'Sobrepeso', 'Obesidade grau 1', 'Obesidade grau 2', 'Obesidade grau 3']

    if (imc >= 39.9) return nivel[5]
    if (imc >= 34.9) return nivel[4]
    if (imc >= 29.9) return nivel[3]
    if (imc >= 24.9) return nivel[2]
    if (imc >= 18.5) return nivel[1]
    if (imc < 18.5) return nivel[0]
}

// Função que vai calcular o IMC com base no peso e altura fornecidos
function getImc (peso, altura) {
    const imc = peso / (altura ** 2)
    return imc.toFixed(2)
}


// Função que vai criar um elemento de parágrafo
function criaP () {
    const p = document.createElement('p')
    return p
}


// Função que vai definir a mensagem de resultado e a exibe no HTML
function setResultado (msg, isValid, imc) {
    const resultado = document.querySelector("#resultado")
    resultado.innerHTML = ''

    const p = criaP()
    p.textContent = msg

    if (isValid) {
        const nivel = getNivelImc(imc)
        p.classList.add('paragrafo-resultado')

        if (nivel === 'Abaixo do peso') {
            p.classList.add('result-abaixo-peso')
        } else if (nivel === 'Peso normal') {
            p.classList.add('result-peso-normal')
        } else if (nivel === 'Sobrepeso') {
            p.classList.add('result-sobrepeso')
        } else if (nivel === 'Obesidade grau 1') {
            p.classList.add('result-obesidade1')
        } else if (nivel === 'Obesidade grau 2') {
            p.classList.add('result-obesidade2')
        } else if (nivel === 'Obesidade grau 3') {
            p.classList.add('result-obesidade3')
        }
    } else {
        p.classList.add('bad')
    }

    resultado.appendChild(p)
}
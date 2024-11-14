const form = document.querySelector("#formulario") // Selecionando o formulário


// Adicionando um ouvinte de eventos ao botão de enviar
form.addEventListener('submit', function(e) { 
    e.preventDefault(e) // Evita que ao enviar o formulário a página seja carrregada
    
    // Obtendo os valores de peso, altura e circunferência da cintura
    const inputPeso = e.target.querySelector("#peso")
    const inputAltura = e.target.querySelector("#altura")
    const inputCC = e.target.querySelector("#cc")

    const peso = Number(inputPeso.value.replace(",", "."))
    const altura = Number(inputAltura.value.replace(",", "."))
    const cc = Number(inputCC.value.replace(",", "."))

    // Validando os valores de peso, altura e circunferência da cintura    
    if (!cc || !peso || !altura) {
        setResultado('Por favor, verifique se preencheu todos os campos. Lembre de digitar apenas números!', false)
        return
    }

    // Obtendo os valores das funções auxiliares 
    const ic = getIc(peso, altura, cc)

    const msg = `Seu Índice de conicidade é ${ic}. A faixa teórica do índice de conicidade é de 1,00 (cilindro perfeito) a 1,73 (cone duplo perfeito)` // Configurando a mensagem de resultado

    setResultado(msg, true, ic) // Exibindo o resultado
})

// Função que vai calcular o Índice de Conicidade com base no peso, altura e circunferência da cintura fornecidos
function getIc (peso, altura, cc) {
    const ic = cc / (0.109 * Math.sqrt(peso / altura))
    return ic.toFixed(2)
}

// Função que vai criar um elemento de parágrafo
function criaP () {
    const p = document.createElement('p')
    return p
}


// Função que vai definir a mensagem de resultado e a exibe no HTML
function setResultado (msg, isValid, ic) {
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
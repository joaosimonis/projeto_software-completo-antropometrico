const form = document.querySelector("#formulario") // Selecionando o formulário

// Adicionando um ouvinte de eventos ao botão de enviar
form.addEventListener('submit', function(e) { 
    e.preventDefault(e) // Evita que ao enviar o formulário a página seja carrregada
    
    // Obtendo os valores de altura, diâmetro do rádio e diâmetro do fêmur
    const inputAltura = e.target.querySelector("#altura")
    const inputDiametroRadio = e.target.querySelector("#diametro_radio")
    const inputDiametroFemur = e.target.querySelector("#diametro_femur")

    const altura = Number(inputAltura.value.replace(",", "."))
    const diametro_radio = Number(inputDiametroRadio.value.replace(",", "."))
    const diametro_femur = Number(inputDiametroFemur.value.replace(",", "."))

    // Validando os valores de altura, diâmetro do rádio e diâmetro do fêmur
    if (!altura || !diametro_radio || !diametro_femur) {
        setResultado('Por favor, verifique se preencheu todos os campos. Lembre de digitar apenas números!', false)
        return
    }

    // Obtendo os valores das funções auxiliares 
    const peso_osseo = getPesoOsseo(altura, diametro_radio, diametro_femur)

    const msg = `Seu peso ósseo é ${peso_osseo}kg` // Configurando a mensagem de resultado

    setResultado(msg, true, peso_osseo) // Exibindo o resultado
})

// Função que vai calcular o peso alvo com base na mcm e percentual de gordura desejado
function getPesoOsseo (altura, diametro_radio, diametro_femur) {
    const peso_osseo = 3.02 * Math.pow((altura ** 2 * diametro_radio * diametro_femur * 400), 0.712);
    return peso_osseo.toFixed(2)
}

// Função que vai criar um elemento de parágrafo
function criaP () {
    const p = document.createElement('p')
    return p
}

// Função que vai definir a mensagem de resultado e a exibe no HTML
function setResultado (msg, isValid, peso_osseo) {
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
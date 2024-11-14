const form = document.querySelector("#formulario") // Selecionando o formulário


// Adicionando um ouvinte de eventos ao botão de enviar
form.addEventListener('submit', function(e) { 
    e.preventDefault(e) // Evita que ao enviar o formulário a página seja carrregada
    
    // Obtendo os valores de perímetro de cintura e quadril
    const inputCintura = e.target.querySelector("#cintura")
    const inputQuadril = e.target.querySelector("#quadril")
    const inputSexo = e.target.querySelector('input[name="sexo"]:checked')

    const cintura = Number(inputCintura.value.replace(",", "."))
    const quadril = Number(inputQuadril.value.replace(",", "."))
    const sexo = inputSexo.value

    // Validando os valores de cintura e quadril

    if (!cintura || !quadril) {
        setResultado('Por favor, verifique se preencheu todos os campos. Lembre de digitar apenas números!', false)
        return
    }

    // Obtendo os valores das funções auxiliares 
    const rcq = getRcq(cintura, quadril)
    const nivelRcq = getNivelRcq(rcq, sexo)

    const msg = `Sua RCQ é ${rcq}cm (${nivelRcq})` // Configurando a mensagem de resultado

    setResultado(msg, true, rcq, sexo) // Exibindo o resultado
})


// Função que vai retornar o nível da RCQ com base no valor fornecido
function getNivelRcq (rcq, sexo) {
    const nivelMasculino = ['Baixo risco', 'Risco moderado', 'Alto risco']
    const nivelFeminino = ['Baixo risco', 'Risco moderado', 'Alto risco']

    if (sexo === 'masculino') {
        if (rcq >= 1.00) return nivelMasculino[2] 
        if (rcq >= 0.90) return nivelMasculino[1] 
        if (rcq < 0.90) return nivelMasculino[0] 
    }

    if (sexo === 'feminino') {
        if (rcq >= 0.90) return nivelFeminino[2] 
        if (rcq >= 0.80) return nivelFeminino[1] 
        if (rcq < 0.80) return nivelFeminino[0] 
    }
}

// Função que vai calcular o RCQ com base no perímetro de cintura e quadril fornecidos
function getRcq (cintura, quadril) {
    const rcq = cintura / quadril
    return rcq.toFixed(2)
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
        const nivel = getNivelRcq(rcq, sexo);
        p.classList.add('paragrafo-resultado');

        if (nivel === 'Baixo risco') {
            p.classList.add('result-baixo-risco')
        } else if (nivel === 'Risco moderado') {
            p.classList.add('result-risco-moderado')
        } else if (nivel === 'Alto risco') {
            p.classList.add('result-alto-risco')
        }
    } else {
        p.classList.add('bad')
    }

    resultado.appendChild(p)
}
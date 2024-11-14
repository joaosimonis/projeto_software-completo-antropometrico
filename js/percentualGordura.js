const form = document.querySelector("#formulario") // Selecionando o formulário

// Adicionando um ouvinte de eventos ao botão de enviar
form.addEventListener('submit', function(e) { 
    e.preventDefault(e) // Evita que ao enviar o formulário a página seja carrregada
    
    // Obtendo os valores sexo, idade e dobras
    const inputSexo = e.target.querySelector('input[name="sexo"]:checked')
    const inputIdade = e.target.querySelector("#idade")
    const inputPeitoral = e.target.querySelector("#peitoral")
    const inputTriceps = e.target.querySelector("#triceps")
    const inputSubescapular = e.target.querySelector("#subescapular")
    const inputSupra = e.target.querySelector("#supra-iliaca")
    const inputAbdomen = e.target.querySelector("#abdomen")
    const inputCoxa = e.target.querySelector("#coxa")
    const inputAxilar = e.target.querySelector("#axilar")

    const sexo = inputSexo.value
    const idade = parseInt(inputIdade.value)
    const peitoral = Number(inputPeitoral.value.replace(",", "."))
    const triceps = Number(inputTriceps.value.replace(",", "."))
    const subescapular = Number(inputSubescapular.value.replace(",", "."))
    const supra = Number(inputSupra.value.replace(",", "."))
    const abdomen = Number(inputAbdomen.value.replace(",", "."))
    const coxa = Number(inputCoxa.value.replace(",", "."))
    const axilar = Number(inputAxilar.value.replace(",", "."))

    // Validando os campos
    if (!sexo || !idade || !peitoral || !triceps || !subescapular || !supra || !abdomen || !coxa || !axilar) {
        setResultado('Por favor, verifique se preencheu todos os campos. Lembre de digitar apenas números!', false)
        return
    }

    // Calculando o DC com base nas dobras e informações de idade e sexo
    const dc = pollock(peitoral, triceps, subescapular, supra, abdomen, coxa, axilar, sexo, idade)
    
    // Obtendo os valores das funções auxiliares 
    const percentual = getPercentual(dc)
    const nivelPercentual = getNivelPercentual(percentual, sexo, idade)

    const msg = `Seu percentual de gordura é ${percentual}% (${nivelPercentual})` // Configurando a mensagem de resultado

    setResultado(msg, true, percentual, sexo, idade) // Exibindo o resultado
})

// Função que vai retornar o nível de percentual de gordura com base no valor fornecido, o sexo e a idade
function getNivelPercentual (percentual, sexo, idade) {
    const nivelMasculino = ['Excelente', 'Bom', 'Acima da Média', 'Média', 'Abaixo da Média', 'Ruim', 'Muito Ruim']
    const nivelFeminino = ['Excelente', 'Bom', 'Acima da Média', 'Média', 'Abaixo da Média', 'Ruim', 'Muito Ruim']

    if (sexo === 'masculino') {
        if (idade >= 18 && idade <= 25) {
            if (percentual >= 4 && percentual <= 6) return nivelMasculino[0]
            if (percentual >= 6.1 && percentual <= 11) return nivelMasculino[1]
            if (percentual >= 11.1 && percentual <= 13) return nivelMasculino[2]
            if (percentual >= 13.1 && percentual <= 16) return nivelMasculino[3]
            if (percentual >= 16.1 && percentual <= 20) return nivelMasculino[4]
            if (percentual >= 20.1 && percentual <= 24) return nivelMasculino[5]
            if (percentual >= 24.1 && percentual <= 36) return nivelMasculino[6]
        } else if (idade >= 26 && idade <= 35) {
            if (percentual >= 8 && percentual <= 11) return nivelMasculino[0]
            if (percentual >= 11.1 && percentual <= 14) return nivelMasculino[1]
            if (percentual >= 14.1 && percentual <= 16) return nivelMasculino[2]
            if (percentual >= 16.1 && percentual <= 19) return nivelMasculino[3]
            if (percentual >= 19.1 && percentual <= 24) return nivelMasculino[4]
            if (percentual >= 24.1 && percentual <= 27) return nivelMasculino[5]
            if (percentual >= 27.1 && percentual <= 36) return nivelMasculino[6]
        } else if (idade >= 36 && idade <= 45) {
            if (percentual >= 10 && percentual <= 14) return nivelMasculino[0]
            if (percentual >= 14.1 && percentual <= 18) return nivelMasculino[1]
            if (percentual >= 18.1 && percentual <= 21) return nivelMasculino[2]
            if (percentual >= 21.1 && percentual <= 25) return nivelMasculino[3]
            if (percentual >= 25.1 && percentual <= 27) return nivelMasculino[4]
            if (percentual >= 27.1 && percentual <= 29) return nivelMasculino[5]
            if (percentual >= 29.1 && percentual <= 39) return nivelMasculino[6]
        } else if (idade >= 46 && idade <= 55) {
            if (percentual >= 12 && percentual <= 16) return nivelMasculino[0]
            if (percentual >= 16.1 && percentual <= 20) return nivelMasculino[1]
            if (percentual >= 20.1 && percentual <= 23) return nivelMasculino[2]
            if (percentual >= 23.1 && percentual <= 26) return nivelMasculino[3]
            if (percentual >= 26.1 && percentual <= 29) return nivelMasculino[4]
            if (percentual >= 29.1 && percentual <= 32) return nivelMasculino[5]
            if (percentual >= 32.1 && percentual <= 38) return nivelMasculino[6]
        }
    } else if (sexo === 'feminino') {
        if (idade >= 18 && idade <= 25) {
            if (percentual >= 13 && percentual <= 16) return nivelFeminino[0]
            if (percentual >= 16.1 && percentual <= 19) return nivelFeminino[1]
            if (percentual >= 19.1 && percentual <= 22) return nivelFeminino[2]
            if (percentual >= 22.1 && percentual <= 25) return nivelFeminino[3]
            if (percentual >= 25.1 && percentual <= 28) return nivelFeminino[4]
            if (percentual >= 28.1 && percentual <= 31) return nivelFeminino[5]
            if (percentual >= 31.1 && percentual <= 43) return nivelFeminino[6]
        } else if (idade >= 26 && idade <= 35) {
            if (percentual >= 14 && percentual <= 17) return nivelFeminino[0]
            if (percentual >= 17.1 && percentual <= 20) return nivelFeminino[1]
            if (percentual >= 20.1 && percentual <= 23) return nivelFeminino[2]
            if (percentual >= 23.1 && percentual <= 26) return nivelFeminino[3]
            if (percentual >= 26.1 && percentual <= 29) return nivelFeminino[4]
            if (percentual >= 29.1 && percentual <= 31) return nivelFeminino[5]
            if (percentual >= 31.1 && percentual <= 43) return nivelFeminino[6]
        } else if (idade >= 36 && idade <= 45) {
            if (percentual >= 16 && percentual <= 20) return nivelFeminino[0]
            if (percentual >= 20.1 && percentual <= 23) return nivelFeminino[1]
            if (percentual >= 23.1 && percentual <= 25) return nivelFeminino[2]
            if (percentual >= 25.1 && percentual <= 29) return nivelFeminino[3]
            if (percentual >= 29.1 && percentual <= 32) return nivelFeminino[4]
            if (percentual >= 32.1 && percentual <= 36) return nivelFeminino[5]
            if (percentual >= 36.1 && percentual <= 47) return nivelFeminino[6]
        } else if (idade >= 46 && idade <= 55) {
            if (percentual >= 17 && percentual <= 22) return nivelFeminino[0]
            if (percentual >= 22.1 && percentual <= 25) return nivelFeminino[1]
            if (percentual >= 25.1 && percentual <= 28) return nivelFeminino[2]
            if (percentual >= 28.1 && percentual <= 32) return nivelFeminino[3]
            if (percentual >= 32.1 && percentual <= 34) return nivelFeminino[4]
            if (percentual >= 34.1 && percentual <= 38) return nivelFeminino[5]
            if (percentual >= 38.1 && percentual <= 50) return nivelFeminino[6]
        }
    }

    return "Não classificado"
}

// Função que vai calcular o somatório das dobras pela Fórmula de Jackson e Pollock
function pollock (peitoral, triceps, subescapular, supra, abdomen, coxa, axilar, sexo, idade) {
    const somaDc = peitoral + triceps + subescapular + supra + abdomen + coxa + axilar
    let dc
    if (sexo === 'masculino') {
        dc =  1.11200 - 0.00043499 * somaDc + 0.00000055 * Math.pow(somaDc, 2) - 0.0002882 * idade
    } else if (sexo === 'feminino') {
        dc = 1.0970 - 0.00046971 * somaDc + 0.00000056 * Math.pow(somaDc, 2) - 0.00012828 * idade
    }

    return dc
}

// Função que vai calcular o percentual de gordura com base na Equação de Siri
function getPercentual (dc) {
    const percentual =  ((4.95 / dc) - 4.50) * 100
    return percentual.toFixed(2)
}

// Função que vai criar um elemento de parágrafo
function criaP () {
    const p = document.createElement('p')
    return p
}

// Função que vai definir a mensagem de resultado e a exibe no HTML
function setResultado (msg, isValid, percentual, sexo, idade) {
    const resultado = document.querySelector("#resultado")
    resultado.innerHTML = ''

    const p = criaP()
    p.textContent = msg

    if (isValid) {
        const nivel = getNivelPercentual(percentual, sexo, idade)
        p.classList.add('paragrafo-resultado')

        if (nivel === 'Excelente') {
            p.classList.add('result-excelente')
        } else if (nivel === 'Bom') {
            p.classList.add('result-bom')
        } else if (nivel === 'Acima da Média') {
            p.classList.add('result-acima-media')
        } else if (nivel === 'Média') {
            p.classList.add('result-media')
        } else if (nivel === 'Abaixo da Média') {
            p.classList.add('result-abaixo-media')
        } else if (nivel === 'Ruim') {
            p.classList.add('result-ruim')
        } else if (nivel === 'Muito Ruim') {
            p.classList.add('result-muito-ruim')
        }
    } else {
        p.classList.add('bad')
    }

    resultado.appendChild(p)
}
//Lógica do jogo Mata-Mosquito - Curso Desenvolvimento Web Completo 2020 (Udemy)

//Declaração de variáveis globais 
var altura = 0 
var largura = 0 
var vidas = 1
var tempo = 10
var intervaloMosquito = 1500
var nivel = window.location.search.replace('?', '')

if (nivel === 'facil') {
    intervaloMosquito = 1500
} else if (nivel === 'medio') {
    intervaloMosquito = 1000
} else if (nivel === 'dificil') {
    intervaloMosquito = 750
}

//Definição da altura e largura do tela

function dimensionarTela () {
    //Função utilizada para dimensionar tela do jogo
    altura = window.innerHeight
    largura = window.innerWidth

    //console.log(altura, largura)
}

dimensionarTela();

//Definição da posição aleatório

function posicaoAleatoria() {
    //Função utilizada para definir a posição aleatória do mosquito dentro da tela do jogo

    //Remoção do mosquito da tela (caso exista)
    if(document.getElementById('mosquito')) {
        document.getElementById('mosquito').remove()

        if(vidas > 3) {
            
            window.location.href = 'game_over.html'
        } else {
             //Remoção de um coração preenchido caso o mosquito não seja clicado
            document.getElementById('vida' + vidas).src = "../imagens/coracao_vazio.png"
            
            vidas++
        }
    }

    //Criação de números aleatórios para utilizar no posicionamento do mosquito (x, y)
    var posicaoX = Math.floor(Math.random() * largura) - 90 //Substração de 90 evitar que imagem exceda a tela
    var posicaoY = Math.floor(Math.random() * altura) - 90 //Substração de 90 evitar que imagem exceda a tela

    //Controle para o caso de posicaoX e posicao Y forem menores que 0
    posicaoX = posicaoX < 0 ? 0 : posicaoX
    posicaoY = posicaoY < 0 ? 0 : posicaoY

    //console.log(posicaoX, posicaoY)

    //Criação do elemento HTML com Id que representará o mosquito
    var mosquito = document.createElement('img')
    mosquito.id = 'mosquito'

    //Criação de gatilho para êxito no click no mosquito
    mosquito.onclick = function () {
        this.remove()
    }

    //Definição da estilização do mosquito
    mosquito.src = '../imagens/mosquito.png' //Inserindo a imagem
    mosquito.className = tamanhoAleatorio() + ' ' + ladoAleatório() //Chamando funções que definem o tamanho e o lado aleatório do mosquito (o espaço vazio é necessário na concatenação para evitar erro)

    //Definição da posição do mosquito na tela
    mosquito.style.left = posicaoX + 'px'
    mosquito.style.top = posicaoY + 'px'
    mosquito.style.position = 'absolute'

    //Criação do mosquito na tela
    document.body.appendChild(mosquito)
}

//Definição do tamanho aleatório do mosquito

function tamanhoAleatorio () {
    //Função para definir o tamanho aleatório do mosquito utilizando classe CSS estabelecida

    var classe = Math.floor( Math.random() * 3 )

    //switch para definir qual das classes CSS serão utlizadas
    switch(classe) {
        case 0:
            return 'mosquito1'
        
        case 1:
            return 'mosquito2'

        case 2:
            return 'mosquito3'
    }
}

//Definição de para qual lado o mosquito estará virado

function ladoAleatório() {
    //Função que define classe CSS estabelecida aleatoriamente
    
    var classe = Math.floor( Math.random() * 2 )

    switch(classe) {
        case 0:
            return 'ladoA'
        case 1:
            return 'ladoB'
    }

}

//Definição do cronometro

var cronometro = setInterval( function () {
    
    tempo -= 1

    if (tempo < 0) {
        clearInterval(cronometro)
        clearInterval(criaMosquito)
        window.location.href = 'vitoria.html'
    } else {
        document.getElementById('cronometro').innerHTML = tempo
    }
    
    
}, 1000)
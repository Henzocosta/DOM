const html = document.querySelector('html')
const focoBt = document.querySelector('.app__card-button--foco')
const curtoBt = document.querySelector('.app__card-button--curto')
const longoBt = document.querySelector('.app__card-button--longo')
const banner = document.querySelector('.app__image')
const titulo = document.querySelector('.app__title')
const botoes = document.querySelectorAll('.app__card-button')
const musicaFocoInput = document.querySelector('#alternar-musica')
const startPauseBt = document.querySelector('#start-pause')
const iniciarOuPausaBt = document.querySelector('#start-pause span')
const mudarIcon = document.querySelector('.app__card-primary-butto-icon')
const tempoNaTela = document.querySelector('#timer')

const play = new Audio('/Fokus/sons/play.wav')
const pause = new Audio('/Fokus/sons/pause.mp3')
const finish = new Audio('/Fokus/sons/beep.mp3')
const musica = new Audio('/Fokus/sons/luna-rise-part-one.mp3') 
musica.loop = true

let tempoDecorridoEmSegudos = 1500 
let intervaloId = null



musicaFocoInput.addEventListener('change', () =>{
    if(musica.paused){
        musica.play()
    } else{
        musica.pause()
    }
})

focoBt.addEventListener('click', () =>{
    tempoDecorridoEmSegudos = 1500
    alteraContexto('foco')
    focoBt.classList.add('active')
})

curtoBt.addEventListener('click', () => {
    tempoDecorridoEmSegudos = 300
  alteraContexto('descanso-curto')
  curtoBt.classList.add('active')
})

longoBt.addEventListener('click', () => {
    tempoDecorridoEmSegudos = 900
   alteraContexto('descanso-longo')
   longoBt.classList.add('active')
})

function alteraContexto(contexto){
    mostrarTempo()
    botoes.forEach(function (contexto) {
        contexto.classList.remove('active')
    });
    html.setAttribute('data-contexto', contexto)
    banner.setAttribute('src', `/Fokus/imagens/${contexto}.png`)
    
    switch (contexto) {
        case "foco":
            
            titulo.innerHTML = 
            `Otimize sua produtividade,<br>
            <strong class="app__title-strong">mergulhe no que importa.</strong>`

            break;
        case "descanso-curto":
            titulo.innerHTML = 
            `Que tal dar uma respirada? <strong class="app__title-strong">Faça uma pausa curta!</strong>`

            break;
        case "descanso-longo":
            titulo.innerHTML = 
            `Hora de voltar à superfície.<strong class="app__title-strong"> Faça uma pausa longa.</strong>`

        default:
            break;
    }
}

const contagemRegressiva = () =>{
    if(tempoDecorridoEmSegudos <= 0){
        finish.play()
        alert('Tempo Finalizado')
        zerar()
        return
    }
    tempoDecorridoEmSegudos -= 1
    mostrarTempo()
}

startPauseBt.addEventListener('click',iniciarOuPausar)

function iniciarOuPausar() {
    if(intervaloId){
        pause.play()
        zerar()
        return
    }
    play.play()
    intervaloId = setInterval(contagemRegressiva, 1000);
    iniciarOuPausaBt.textContent = "Pausar"
    mudarIcon.setAttribute('src', `/Fokus/imagens/pause.png`)
   

}

function zerar(){
    clearInterval(intervaloId)
    iniciarOuPausaBt.textContent = "Começar"
    mudarIcon.setAttribute('src', `/Fokus/imagens/play_arrow.png`)
    intervaloId = null
}

function mostrarTempo(){
    const tempo = new Date(tempoDecorridoEmSegudos * 1000)
    const tempoFormatado = tempo.toLocaleTimeString('pt-br', {minute: '2-digit', second: '2-digit'})
    tempoNaTela.innerHTML = `${tempoFormatado}`


}

mostrarTempo()
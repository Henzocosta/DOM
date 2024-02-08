const html = document.querySelector('html')
const focoBt = document.querySelector('.app__card-button--foco')
const curtoBt = document.querySelector('.app__card-button--curto')
const longoBt = document.querySelector('.app__card-button--longo')
const banner = document.querySelector('.app__image')
const titulo = document.querySelector('.app__title')
const botoes = document.querySelectorAll('.app__card-button')
const musicaFocoInput = document.querySelector('#alternar-musica')
const startPauseBt = document.querySelector('#start-pause')
const startClick = document.querySelector('.app__card-primary-button')

const play = new Audio('/Fokus/sons/play.wav')
const pause = new Audio('/Fokus/sons/pause.mp3')
const finish = new Audio('/Fokus/sons/beep.mp3')
const musica = new Audio('/Fokus/sons/luna-rise-part-one.mp3') 
musica.loop = true

let tempoDecorridoEmSegudos = 5
let intervaloId = null



musicaFocoInput.addEventListener('change', () =>{
    if(musica.paused){
        musica.play()
    } else{
        musica.pause()
    }
})

focoBt.addEventListener('click', () =>{
    alteraContexto('foco')
    focoBt.classList.add('active')
})

curtoBt.addEventListener('click', () => {
  alteraContexto('descanso-curto')
  curtoBt.classList.add('active')
})

longoBt.addEventListener('click', () => {
   alteraContexto('descanso-longo')
   longoBt.classList.add('active')
})

function alteraContexto(contexto){
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
        zerar()
        alert('Tempo Finalizado')
        return
    }
    tempoDecorridoEmSegudos -= 1
    console.log('Temporizador: ' + tempoDecorridoEmSegudos)
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

}

function zerar(){
    clearInterval(intervaloId)
    intervaloId = null
}
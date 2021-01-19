let  audioPlayer = document.querySelector("audio")

audioPlayer.addEventListener("play", ()=>{


    //Constructeur JS qui va nous proposer des méthodes et propriétés liées au son
    const contextAudio = new AudioContext()
    //Cette methode crée un source à partir de notre source "audioPlayer" qu'on va pouvoir manipuler pour avoir tout ce qui est fréquence etc...
    const src = contextAudio.createMediaElementSource(audioPlayer)
    const analyser = contextAudio.createAnalyser()
    const  canvas = document.getElementById("canvas")

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const ctx = canvas.getContext('2d')

//    Connexion de la source avec notre analyseur
    src.connect(analyser)
    // .destination, d'où sortira le son
    //Il connecte notre analyseur qui nous permet de faire des représentations données stylées à notre sorti audio (Hauts-parleurs)
    analyser.connect(contextAudio.destination)
    //Fftp et une propriété qui nous transmet des informations par fréauece
    analyser.fftSize = 1024
    const  frequencesAudio = analyser.frequencyBinCount
    console.log(frequencesAudio)

    const tableaufrequence = new  Uint8Array(frequencesAudio)

    const WIDTH = canvas.width;
    const HEIGHT = canvas.height;

    const largeurBarre = (WIDTH / tableaufrequence.length) + 2
    let hauteurBarre 
    let x

    
    //Fonction qui va nous permettre de dessiner les barre
    function retourneBarres() {

        requestAnimationFrame(retourneBarres)

        x = 0
        // "getByteFrequencyData" va nous retourner une valeur entre 0 et 255 par rapport à une fréquence de notre tableaud de fréquence
        // Il nous permettre de gérer la couleur (255 en rgb)  mais également la hauteur de nos barre
        analyser.getByteFrequencyData(tableaufrequence)
        ctx.fillStyle = "#000";
        ctx.fillRect(0,0,WIDTH,HEIGHT)

        //Pour chaque fréquence, on déssinera un petit rectangle
        for(let i = 0; i < frequencesAudio; i++){

            hauteurBarre = tableaufrequence[i]

        //    Gérance des couleurs en rgb

            let r = 250
            let g = 50
            let b = i

                ctx.fillStyle = `rgb(${r}, ${g}, ${b})`
            ctx.fillRect(x, HEIGHT, largeurBarre, -hauteurBarre)

        //    A chaque création de rectangle,
        //    Pour que les barres se crée les unes à coté des autres
            x += largeurBarre + 1
        }


    }
    retourneBarres()


})
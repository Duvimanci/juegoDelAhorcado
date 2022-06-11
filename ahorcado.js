var palabras = ["AHORCADO", "ORACLE", "HTML", "CSS", "JAVASCRIPT"];

var tablero = document.getElementById("horca").getContext("2d");

var letras = [];

var palabraCorrecta = "";

var errores = 9;

var contador = 0

const inputTexto = document.querySelector(".ingreso");


function escojerPalabraSecreta() {
    var palabra = palabras[Math.floor(Math.random()*palabras.length)];
    palabraSecreta = palabra;    
    return palabraSecreta;
}

function dibujarLineas() {
    tablero.lineWidth = 6;  
    tablero.lineCap =  "round";
    tablero.lineJoin =  "round";
    tablero.strokeStyle =  "#0A3871";
    tablero.beginPath();

    var ancho=600/palabraSecreta.length;

    for (let i = 0; i < palabraSecreta.length; i++) {
        tablero.moveTo(300+(ancho*i),640);
        tablero.lineTo(350+(ancho*i),640);
    }
    tablero.stroke();
    tablero.closePath();

    tablero.moveTo(340,400);
    tablero.lineTo(750,400);
    tablero.stroke();
    tablero.closePath();
}

dibujarLineas(escojerPalabraSecreta());

function escribirLetraCorrecta(index) {
    contador +=1
    tablero.font = "bold 52px Inter";
    tablero.lineWidth = 6;
    tablero.lineCap = "round";
    tablero.lineJoin = "round";
    tablero.fillStyle = "#0A3871";

    var ancho=600/palabraSecreta.length;
    tablero.fillText(palabraSecreta[index],305+(ancho*index),620)

    if(contador == palabraSecreta.length){
        resultado.innerHTML = "¡Ganaste, Felicitaciones!";
        resultado.style.color = "green"
    }
}

function escribirLetraIncorrecta(letra, errorsLefth) {
    tablero.font = "bold 40px Inter";
    tablero.lineWidth = 6;
    tablero.lineCap = "round";
    tablero.lineJoin = "round";
    tablero.fillStyle = "#0A3871";

    tablero.fillText(letra,308+(40*(10-errorsLefth)),710,40);
}

function verificarLetraClicada(key) {
    if (letras.length<1 || letras.indexOf(key)<0) {
        letras.push(key);
        return false;
    }
    else{
        letras.push(key);
        return true;
    }
}

function adicionarLetraCorrecta(i) {
    palabraCorrecta += palabraSecreta[i].toUpperCase();
}

function adicionarLetraIncorrecta(letter) {
    if (palabraSecreta.indexOf(letter)<=0) {
        errores -= 1;
    }
}

function dibujo(errores) {
    tablero.lineWidth = 6;  
    tablero.lineCap =  "round";
    tablero.lineJoin =  "round";
    tablero.strokeStyle =  "#0A3871";
    tablero.beginPath();

    var x = 500;
    var y = 400;

    switch (errores) {
        case 8:
            tablero.moveTo(x,y);
            tablero.lineTo(x,y-250);
            break;
        case 7:
            tablero.moveTo(x,y-250);
            tablero.lineTo(x+100,y-250);
            break;
        case 6:
            tablero.moveTo(x+100,y-250);
            tablero.lineTo(x+100,y-220);
            break;
        case 5:
            tablero.arc(x+100,y-200,20,0,2*3.14);
            break;
        case 4:
            tablero.moveTo(x+100,y-180);
            tablero.lineTo(x+80,y-140);
            break;
        case 3:
            tablero.moveTo(x+100,y-180);
            tablero.lineTo(x+120,y-140);
            break;
        case 2:
            tablero.moveTo(x+100,y-180);
            tablero.lineTo(x+100,y-100);
            break;
        case 1:
            tablero.moveTo(x+100,y-100);
            tablero.lineTo(x+80,y-60);
            break;
        case 0:
            tablero.moveTo(x+100,y-100);
            tablero.lineTo(x+120,y-60);
            resultado.innerHTML = "¡Fin del juego!";
            resultado.style.color = "red"
            break;
        default:
            break;
    }
    tablero.stroke();
    tablero.closePath();
}

document.onkeydown = (e) => {
    var objtextoSecAcciones = document.getElementById("sec-acciones").style.display;
    
    if (objtextoSecAcciones != "flex"){
        return;
    }
    if (contador == palabraSecreta.length) {
        return;
    }
    if (errores == 0) {
        return;
    }

    let letra = e.key.toUpperCase();

    if (!verificarLetraClicada(e.key)) {
        if (palabraSecreta.includes(letra)) {
            
            adicionarLetraCorrecta(palabraSecreta.indexOf(letra))

            for (let i = 0; i < palabraSecreta.length; i++) {
                if (palabraSecreta[i]==letra) {
                    escribirLetraCorrecta(i);
                }
            }
        }
        else{
            if (!verificarLetraClicada(e.key))
            return
            adicionarLetraIncorrecta(letra);
            escribirLetraIncorrecta(letra,errores);
            dibujo(errores);
        }
    }
}

function jugar() {
    var sectionInicio = document.getElementById("inicio");
    sectionInicio.style.display = "none";

    var sectionApareceAhorcado = document.getElementById("aparece-ahorcado");
    sectionApareceAhorcado.style.display = "block";

    var sectionSecAcciones = document.getElementById("sec-acciones");
    sectionSecAcciones.style.display = "flex";
}

function ingresando() {
    var sectionInicio = document.getElementById("inicio");
    sectionInicio.style.display = "none";

    var sectionIngresando = document.getElementById("ingresando");
    sectionIngresando.style.display = "block";
}

function agregarPalabra() {
    var agregarPalabraNueva = inputTexto.value;
    palabras.push(agregarPalabraNueva.toUpperCase());

    inputTexto.value = "";

    var sectionIngresando = document.getElementById("ingresando");
    sectionIngresando.style.display = "none";

    var sectionSecAcciones = document.getElementById("sec-acciones");
    sectionSecAcciones.style.display = "flex";

    var sectionApareceAhorcado = document.getElementById("aparece-ahorcado");
    sectionApareceAhorcado.style.display = "block";
}

function cancelar() {
    var sectionInicio = document.getElementById("inicio");
    sectionInicio.style.display = "block";

    var sectionIngresando = document.getElementById("ingresando");
    sectionIngresando.style.display = "none";

    inputTexto.value = "";
}

function nuevoJuego() {
    letras = [];
    palabraCorrecta = "";
    errores = 9;
    contador = 0
    resultado.innerHTML = "";
    
    var canvas = document.getElementById("horca");
    var context = canvas.getContext("2d");

    tablero.clearRect(0, 0, canvas.width, canvas.height);

    dibujarLineas(escojerPalabraSecreta());
}

function desistir() {
    console.log("ingresando");
    nuevoJuego()
    cancelar();

    var sectionApareceAhorcado = document.getElementById("aparece-ahorcado");
    sectionApareceAhorcado.style.display = "none";

    var sectionSecAcciones = document.getElementById("sec-acciones");
    sectionSecAcciones.style.display = "none";
}


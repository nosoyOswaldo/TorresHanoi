// def hanoi (n,A,B,C) :
// if n==1:
// print (A+" ->"+C)
// else:
// hanoi(n-1,A,B,C)
// print(A+"->"+C)
// hanoi(n-1,B,C,A)
// d=int(input("numero de discos: "))
// hanoi(d,"A","C","B")
const Altura ="40px";
var cuerpo;

var movimientos = 0;

var fichaSeleccionada;
var origen;
var destino;

var cuadro1 = new Cuadro(true);
var cuadro2 = new Cuadro(false);
var cuadro3 = new Cuadro(false);

function crearDiv(){
    var caja = document.createElement("div");
    return caja;
}

function over1(){
    over(cuadro1);
}
function over2(){
    over(cuadro2);
}
function over3(){
    over(cuadro3);
}

function over(cuadro){
    cuadro.caja.style.backgroundColor = "#ADFAFF";
}

function out1(){
    out(cuadro1);
}
function out2(){
    out(cuadro2);
}
function out3(){
    out(cuadro3);
}
function out(cuadro){
    cuadro.caja.style.backgroundColor = "white";
}

function click1(){
    cuadro1.elegido = !cuadro1.elegido;
    click(cuadro1);
}

function click2(){
    cuadro2.elegido = !cuadro2.elegido;
    click(cuadro2);
}
function click3(){
    cuadro3.elegido = !cuadro3.elegido;
    click(cuadro3);
}

function click(cuadro){
    if(cuadro.elegido){
       selecionarOrigenDestino(cuadro);
    } else {
       cuadro.caja.style.borderColor = "black";
       reiniciarOrigenDesitno();
    }
}

//funciones y logica para los cuadros y los rellenos
function rellenarContenido(){ //esta funcion se debe de modificar para que sean las 8 fichas que pide la actividad, en el bucle
    var contenido = new Array();

    for (var i = 0; i < 5; i++) {
        contenido [i] = new Relleno();
    }
    return contenido;
}

function rellenarFichas(){ // aqui hay que agregar el contenido del array para que genere las otras 4 fichas
    var contenido = new Array();

    contenido[0] = new Relleno();
    contenido[1] = new FichaS();
    contenido[2] = new FichaM();
    contenido[3] = new FichaL();
    contenido[4] = new FichaXL();

    return contenido;

}

function FichaS(){ //crear las otras 4 fichas que hacen falta
    this.caja = crearDiv();
    this.caja.style.width = "10%";
    this.caja.style.height = Altura;
    this.caja.style.backgroundColor = "#0088CC";
    this.caja.style.marginLeft = "auto";
    this.caja.style.marginRight = "auto";
    this.valor = 0;
}

//comienza objetos de tipo rellno y ficha
function FichaM(){
    this.caja = crearDiv();
    this.caja.style.width = "30%";
    this.caja.style.height = Altura;
    this.caja.style.backgroundColor = "#979797";
    this.caja.style.marginLeft = "auto";
    this.caja.style.marginRight = "auto";
    this.valor = 1;
}

function FichaL(){
    this.caja = crearDiv();
    this.caja.style.width = "50%";
    this.caja.style.height = Altura;
    this.caja.style.backgroundColor = "#666666";
    this.caja.style.marginLeft = "auto";
    this.caja.style.marginRight = "auto";
    this.valor = 2;
}
function FichaXL(){
    this.caja = crearDiv();
    this.caja.style.width = "70%";
    this.caja.style.height = Altura;
    this.caja.style.backgroundColor = "#000000";
    this.caja.style.marginLeft = "auto";
    this.caja.style.marginRight = "auto";
    this.valor = 3;
}

function Relleno(){
    this.caja = crearDiv();
    this.caja.style.width = "100%";
    this.caja.style.height = Altura;
}
//termina objetos de tipo rellno y ficha


// BTW, la funcion cuadro es el constructor
function Cuadro (cajaInicial){ // modificar la altura para que puedan caver 4 fillas mas, con 200px mas deberia de bastar
    this.caja = crearDiv();
    this.caja.style.width = "28%";
    this.caja.style.height = "200px";
    this.caja.style.marginLeft = "4%";
    this.caja.style.marginRight = "auto";
    this.caja.style.borderWidth = "2%";
    this.caja.style.border = "solid black";
    this.caja.style.width = "28%";
    this.caja.style.float = "left";
    this.elegido = false;
    this.contenido;

    if (cajaInicial == true) {
        this.contenido = rellenarFichas();
    } else {
        this.contenido = rellenarContenido();
    }

    for (var i = 0; i < this.contenido.length; i++){
        this.caja.appendChild(this.contenido[i].caja);
    }

    this.tieneFichas = function(){
        var rellenos = 0;

        for(var i=0; i< this.contenido.length; i++){
            if(this.contenido[i] instanceof Relleno) {
                rellenos++
            }
        }

        if (rellenos == this.contenido.length){
            return false;
        }else {
            return true;
        }
    };

    this.obtenerFichaSuperior = function (){//esta funcion devuelve la ficha que se haya movido, nos recupera la ficha superior
        for (var i = 0; i < this.contenido.length; i++){
            if (!(this.contenido[i] instanceof Relleno)){
                return this.contenido[i];
            }
        }
    };
    this.quitarFichaSuperior = function(){
        for (var i=0; i<this.contenido.length; i++){
            if (!(this.contenido[i] instanceof Relleno)) {
                fichaSeleccionada = this.contenido[i]
                this.contenido[i] = new Relleno();
                break;
            }
        }
    };
    this.insertarFichaSuperior = function() {
        for (var i = this.contenido.length -1; i>=0; i--){
            if (this.contenido[i] instanceof Relleno){
                this.contenido[i] = fichaSeleccionada;
                break;
            }
        }
    };
    this.redibujarCaja =function() {
        while(this.caja.hasChildNodes()) {
            this.caja.removeChild(this.caja.lastChild);
        }

        for (var i=0; i<this.contenido.length; i++) {
            this.caja.appendChild(this.contenido[i].caja);
        }
    }
}


function selecionarOrigenDestino(cuadro){//esta funcion es para el movimiento de las fichas de la caja origen a la caja destino
    if (origen == undefined){
        if (cuadro.tieneFichas()){
            cuadro.caja.style.borderColor = "red";
            origen = cuadro;
            origen.elegido = true;
        }
    } else if (origen != undefined && destino== undefined){
        destino = cuadro;
        destino.elegido = true;
        if (origen != destino){
            if (!destino.tieneFichas() || (origen.obtenerFichaSuperior().valor<destino.obtenerFichaSuperior().valor)) {
                origen.quitarFichaSuperior();
                origen.redibujarCaja();
                destino.insertarFichaSuperior();
                destino.redibujarCaja();
                movimientos++;
                actualizarContador();
            }
        }
    }

    if (destino != undefined && origen != undefined) {
        reiniciarOrigenDesitno();
    }

    if (comprobarVictoria()) {
        victoria();
    }
}

function comprobarVictoria(){// aqui se puede modificar para que sean mas fichas
    if (cuadro3.contenido[0] instanceof Relleno &&
        cuadro3.contenido[1] instanceof FichaS &&
        cuadro3.contenido[2] instanceof FichaM &&
        cuadro3.contenido[3] instanceof FichaL &&
        cuadro3.contenido[4] instanceof FichaXL) {
            return true;
        }else {
            return false;
        }
}

function victoria(){
    var textoTitulo = document.createTextNode("!Has Ganado!");
    var textoSubtitulo = document.createTextNode("Moviemientos Utilizados: "+ movimientos);
    var textoConsejo = document.createTextNode("Presiona F5 para jugar de nuevo.");

    cuerpo.removeChild(cuadro1.caja);
    cuerpo.removeChild(cuadro2.caja);
    cuerpo.removeChild(cuadro3.caja);
    cuerpo.removeChild(document.getElementById("contador"));

    var titulo = document.createElement("h1");
    titulo.style.color = "red"
    titulo.appendChild(textoTitulo);

    var subtitulo = document.createElement("h2")
    subtitulo.appendChild(textoSubtitulo);

    var consejo = document.createElement("h3")
    consejo.appendChild(textoConsejo);

    cuerpo.appendChild(titulo);
    cuerpo.appendChild(subtitulo);
    cuerpo.appendChild(consejo);
}

function reiniciarOrigenDesitno(){
    if(origen != undefined) {
        origen.caja.style.borderColor = "black";
        origen.elegido = false;
    }

   if (destino != undefined) {
    destino.caja.style.borderColor = "black";
    destino.elegido = false;
   }

    origen = undefined;
    destino = undefined;

    cuadro1.elegido = false;
    cuadro2.elegido = false;
    cuadro3.elegido = false;
}

function actualizarContador(){
    var parrafo = document.getElementById("contador");
    parrafo.innerHTML = "Movimientos" + movimientos;

}

function iniciar () {
 cuerpo = document.getElementsByTagName("body")[0];
 cuerpo.style.textAlign = "center";
 
 cuerpo.appendChild(cuadro1.caja);
 cuerpo.appendChild(cuadro2.caja);
 cuerpo.appendChild(cuadro3.caja);

 cuadro1.caja.addEventListener("mouseover", over1, false);
 cuadro2.caja.addEventListener("mouseover", over2, false);
 cuadro3.caja.addEventListener("mouseover", over3, false);

 cuadro1.caja.addEventListener("mouseout", out1, false);
 cuadro2.caja.addEventListener("mouseout", out2, false);
 cuadro3.caja.addEventListener("mouseout", out3, false);

 cuadro1.caja.addEventListener("click", click1, false);
 cuadro2.caja.addEventListener("click", click2, false);
 cuadro3.caja.addEventListener("click", click3, false);

 var texto = document.createTextNode("Movimientos: " + movimientos);
 var parrafo = document.createElement("p");
 parrafo.style.clear = "both";
 parrafo.style.paddingTop = "3em";
 parrafo.setAttribute("id","contador");
 parrafo.appendChild(texto);
 cuerpo.appendChild(parrafo);
}

window.addEventListener("load", iniciar, false);
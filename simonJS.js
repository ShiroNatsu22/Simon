var chooseDiv = [1, 2, 3, 4]; //Aquesta variable tendra la finalitat de identificar els colors verd=1, groc=2, vermell=3, blau=4
var enmagatzemaColor = []; //Servira per anar enmagatzemant el random a partir de la variable chooseDiv,es a dir, si es el primer torn i al random li toca un 2, s'enmagatzema a n'aquesta variable, i el primer color que l'usuari haura de cliockar hauria de ser el groc.
var name = ""; //Aqui anira el nom de l'usuari en el formulari
//Tots els audios que s'empren durant el Joc
var audio1 = new Audio("animalesReales/vaca.mp3");
var audio2 = new Audio("animalesReales/pato.mp3");
var audio3 = new Audio("animalesReales/gato.mp3");
var audio4 = new Audio("animalesReales/perro.mp3");
var audio5 = new Audio("animalesReales/derrota.mp3");
var audio6 = new Audio("animalesReales/començ.mp3");
var i = 0;
var torn; //Quan sigui true sera torn del Simon, si es fals del jugador
var guardaClick = []; //Aqui s'aniran enbmagatzemant els clicks que fa l'usuari, i despres es comparara amb la posicio de enmagatzema color per sebre si ha press el boto correcte
var notInGame = true; //Aquesta variable servira per activar o descativar el boto per jugar, si esta en true es podra pulsar, si no per molt que es pulsi no fara res
var puntuacio = 0; //La puntuacio que va aconseguint l'usuari
var bloq = true; //Servira per a que l'usuari no pugui clickar fins que no hagui acabat la interaccio anterior
var ranking = []; //Aqui s'aniran enmagatzemant tots els usuaris que es trobin entre els 10 primers en puntuacio
if (localStorage.puntuacions) { // El que es fa aqui es mirar si ja es te alguna cosa al local storage,i sinos li afegeix, ja que aixi es podra guardar les puntuacions en local stroage
    ranking = JSON.parse(localStorage.puntuacions);
} else {
    localStorage.setItem("puntuacions", "");
}

function createDiv() { //Aqui es creen tots els elements DIV,BUTTON i P, i s'afegeixen al body

    var green = document.createElement("DIV");
    green.id = "green";

    var yellow = document.createElement("DIV");
    yellow.id = "yellow";

    var red = document.createElement("DIV");
    red.id = "red";

    var blue = document.createElement("DIV");
    blue.id = "blue";

    var board = document.createElement("DIV");
    board.appendChild(green);
    board.appendChild(yellow);
    board.appendChild(red);
    board.appendChild(blue);
    board.id = "board";

    document.body.appendChild(board);


    var start = document.createElement("BUTTON");
    start.innerHTML = "JUGAR";
    document.body.appendChild(start);
    start.id = "buttonStart";

    var punts = document.createElement("P");
    punts.innerHTML = "Puntuació: ";
    document.body.appendChild(punts);
    punts.id = "punts";

    var missatges = document.createElement("P");
    missatges.innerHTML = "Prem el botó JUGAR per començar ";
    document.body.appendChild(missatges);
    missatges.id = "missatges";

}

function logicaSimon() { //Principalment aqui va la logica del simon, pero tambe sera molt reutilitzable en altres funcions

    if (enmagatzemaColor[i] == 1) { //Com s'ha vist al principi, enmagatzemaColor servira per veure quin divisor volem, pero per fer aixo se l'hi ha d'assignar, es a dir quan el divisor sigui 1 fara una cosa, si es 2 una altra i aixi fins a 4.
        audio1.play(); //Sonara l'audio corresponent al color
        document.getElementById("green").style.background = "#3AE540"; //El color donara la sensacio de que s'ilumina, donantli en aquest cas un color verd mes clar
        setTimeout(function() { //Despres de 1 segon tornara al color original
            document.getElementById("green").style.background = "#1CD00D";
            bloq = true; //aquesta variable no servira per al Simon, pero si per a una altra que es per a l'usuari
        }, 1000);


    } else if (enmagatzemaColor[i] == 2) {
        audio2.play();
        document.getElementById("yellow").style.background = "#E5A739";
        setTimeout(function() {
            document.getElementById("yellow").style.background = "#E8C400";
            bloq = true;
        }, 1000);


    } else if (enmagatzemaColor[i] == 3) {
        audio3.play();
        document.getElementById("red").style.background = "#E53B38";
        setTimeout(function() {
            document.getElementById("red").style.background = "#FF0000";
            bloq = true;
        }, 1000);


    } else if (enmagatzemaColor[i] == 4) {
        audio4.play();
        document.getElementById("blue").style.background = "#4E6EE5";
        setTimeout(function() {
            document.getElementById("blue").style.background = "#0C41E8";
            bloq = true;
        }, 1000);
    }
}

function maquina() { //Aqui anira la funcio logica del Simon i fara el propi de una IA

    if (torn) {
        var comprovador = 0; //Aquest comprovador servira per a controlar els torns, es a dir si es el torn 2 el comprovador haura de sumarse 2 pics per acabar el torn(mes explicat abaix)
        enmagatzemaColor.push(chooseDiv[Math.floor(Math.random() * chooseDiv.length)]); //Aqui es fa el random, o fara 1 pic per torn
        var interval = setInterval(function() { //Aqui es quan la funcio logicaSimon entra en joc, cada segon i mig anira fent el que a continuacio explicare
            missatges.innerHTML = "Torn del SIMON, per favor, esperi a que acabi la secuencia..."; //Aqui la variable missatges cambiara i ens dira que es el torn del Simon
            logicaSimon(); //Aqui es crida a la funcio del simon
            i++; //L'index es sumara per pasar al següent color si no ha arribat al final del torn;
            if (comprovador == enmagatzemaColor.length) { //Aixo sera el final del torn, ja que quan comprovador sigui igual al tamany de l'array,entrara a la condicio y aturara l'interval
                clearInterval(interval); //Es neteja l'interval, es a dir no el tornara a fer a no ser que es cridi a la funcio
                i = 0; //Es reinicia l'index
                torn = false; //El torn pasa a ser de l'usuari
                player(); //Es crida a la funcio player
            }
            comprovador++; // Es suma el comprovador, ja que una vegada a acabat de fer les comprovacions se li pugui sumar fins a ser igual al numero de torns
        }, 1500);
    }
}

function logicaHuma() {
    if (guardaClick[i] == enmagatzemaColor[i] && enmagatzemaColor.length != guardaClick.length) { //Aquesta condicio es complira quan el click que ha fet l'usuari sigui la mateixa posicio en l'array enmagatzemaColor i no sigui el darrer color per acabar la ronda, per aixo esta el !=
        logicaSimon(); //Es crida la funcio logicaSimon, i aqui siu que entra en joc el bloq, ja que cuan acabi de encendrer-se el color, l'usuari podra clickar novament
        i++; //Es suma l'index, hja que si no es fes , entraria en bucle, ja que si l'usuari segueix pitjant el mateix boto, al no incrementarse, tendra el mateix index tant en l'array de l'usuari com en el de la maquina
    } else if (enmagatzemaColor.length == guardaClick.length && guardaClick[i] == enmagatzemaColor[i]) { //Molt parescut a la condicio anterior, pero aquesta vegada la ronda acaba quan es pitja el boto corresponent
        logicaSimon(); //Es crida a la funcio logicaSimon
        puntuacio++; //S'incrementa en 1 els punts
        punts.innerHTML = "Puntuació: " + puntuacio; //La puntuacio cambiara
        i = 0; //L'index tornara a 0, ja que sinos l'usuari nomes hauria de clickar l'ultim color que s'ha ences
        guardaClick = []; //Es reinicia els clicks de l'usuari, ja que aixi podra clickar els colors novament en el ordre corresponent
        torn = true; //Se li dona el torn al Simon
        maquina(); //Es crida a la funcio maquina

    } else { //En cambi si l'usuari s'ha equivocat
        audio5.play(); //sonara l'audio de que ha perdut
        notInGame = true; //Es podra tornar a pulsar el boto jugar
        missatges.innerHTML = "T'has equivocat,introdueix el teu nom al formulari i es comprovara si estas entre els 10 primers"; //El missatge cambiara
        form(); //Es cridara a la funcio form(explicada mes abaix),per a que l'usuari introduesqui el nom, i vore si entra al ranking
    }
}

function player() {
    if (!torn) { //En el moment que acabi el torn del Simon, es camnbiara el missatge
        missatges.innerHTML = "Es el teu torn, prem el botons en el ordre correcte per a guanyar la ronda";
    }
    var clickBlue = document.getElementById("blue");
    clickBlue.addEventListener("click", function() {
        if (torn == false && bloq == true) { //Es podra clickar, pero nomes funcionara quan la condicio sigui certa
            guardaClick.push(4); //S'enmagatzema a  l'array el clik que ha fet l'usuari
            bloq = false; //Es restringira el click
            logicaHuma(); //Cridara i fara la funcio logicaHuma
        }
    });
    var clickYellow = document.getElementById("yellow");
    clickYellow.addEventListener("click", function() {
        if (torn == false && bloq == true) {
            guardaClick.push(2);
            bloq = false;
            logicaHuma();
        }
    });
    var clickRed = document.getElementById("red");
    clickRed.addEventListener("click", function() {
        if (torn == false && bloq == true) {
            guardaClick.push(3);
            bloq = false;
            logicaHuma();
        }
    });
    var clickGreen = document.getElementById("green");
    clickGreen.addEventListener("click", function() {
        if (torn == false && bloq == true) {
            guardaClick.push(1);
            bloq = false;
            logicaHuma();
        }
    });
}


function startGame() { // Aquesta funcio donara inici al joc

    var buttonStart = document.getElementById("buttonStart"); //Aquesta variable servira per a obtenir la id del boto creat anteriorment

    buttonStart.addEventListener("click", function() {
        if (notInGame) { //nomes es podra clickar quan sigui true
            audio6.play();
            document.getElementById("buttonStart").style.background = "#C752E5"; //Cambia el color per a quan es pitja
            setTimeout(function() {
                document.getElementById("buttonStart").style.background = "#661DFF";
                //Es reinicien les següents variables al ser un nou joc
                guardaClick = [];
                enmagatzemaColor = [];
                puntuacio = 0;
                punts.innerHTML = "Puntuació: " + puntuacio;
                i = 0;
                //Començan el Simon i es deshabilita el boto
                torn = true;
                notInGame = false;

                //criden les funcions maquina i player
                maquina();
                player();
            }, 1000);
        }
    })
}



function table() { //Es creara la taula del ranking

    var divTable = document.createElement("DIV"); //Ficare la taula dins de un divisor, per amb el css poder manejar millor la taula
    var table = document.createElement("TABLE");
    var menu = ["Nom", "Puntuacio"]; //Amb un for fare les capçaleres, que contendran els elements de l'array
    var tr = document.createElement("TR");
    divTable.id = "divTable";
    table.id = "table";

    for (var x = 0; x < menu.length; x++) {

        var th = document.createElement("TH");
        th.id = "capsalera";
        th.appendChild(document.createTextNode(menu[x]));
        tr.appendChild(th);
        table.appendChild(tr);
    }

    for (var j = 0; j < ranking.length; j++) { //Anira afegint elements conforme vagui augmentant el tamany del ranking, per aixo la j ha de ser menor a la longitud de l'array ranking


        var linia = document.createElement("TR"); //Es creen les files, on s'insertaran els noms i puntuacions
        table.appendChild(linia);

        var nom = document.createElement("TD");

        nom.appendChild(document.createTextNode(ranking[j].noms)); //S'agafara i afegira a la taula el nomcorresponent a lindex j en l'array, i s'agafara de l'objecte l'atribut de noms
        linia.appendChild(nom);

        var punt = document.createElement("TD");

        punt.appendChild(document.createTextNode(ranking[j].puntuacions)); //El mateix que amb noms pero amb puntuacions
        linia.appendChild(punt);
    }
    divTable.appendChild(table);
    document.body.appendChild(divTable);

}

function form() {
    var form = document.createElement("FORM"); //Es creara el formulari,on se li afegiran tots els atributs amb un setAttribute,que hauria de tenir un formulari
    form.id = "form";
    form.setAttribute("method", "post");
    form.setAttribute("action", "");


    var input = document.createElement("INPUT"); //El mateix que el formulari, pero amb un input
    input.id = "input";
    input.setAttribute("type", "text");
    input.setAttribute("name", "name");


    var submit = document.createElement("INPUT"); //Igual que el formulari pero amb els atributs de un submit
    submit.id = "submit";
    submit.setAttribute("type", "submit");
    submit.setAttribute("value", "Envia");

    submit.setAttribute("OnClick", "dades(); bloquejaSubmit();removeTable();table(); return false;"); //Aqui el que es fa es, que quan es dona click alsubmit, aquest el que fara es introduir dins el ranking la informacio, fara desaparixer el formulari, eliminara la taula, i latornara a crear per a que no es dupliqui, i no fara falta que recarregui la pagina amb aquest retrn false

    form.appendChild(input);
    form.appendChild(submit);
    document.body.appendChild(form);

    document.getElementById("form").style.zIndex = 1; //Quan es cridi al formulari es posara per damunt del bot jugar


}

function dades() { //Aqui anira tot el relacionat amb el ranking

    name = document.getElementById("input").value; //Agafam a traves de la id del input per a poder establir el nom que apareixera al ranking
    ordenaRanking(); //Serivra per a ordenar les puntuacions de major a menor
    if (ranking.length < 10) { //Anira afegint puntuacions fins que l'array contengui 10 elements

        ranking.push(new Objecte(name, puntuacio)); //Fara un push de el nom introduit al input i de la puntuacio obtenida en la partida

        localStorage.setItem("puntuacions", JSON.stringify(ranking)); //es guardara al local storage
        missatges.innerHTML = "Enhorabona, estas entre els 10 primers,si vols tornar a jugar prem el botó JUGAR";
    } else { //Si ja hi han 10 puntuacions
        if (ranking[ranking.length - 1].puntuacions < puntuacio) { //Comprovara que el darrer element en l'array(estara ordenat per el metode ordenaRanking),sigui mes petit que la puntuacio obtinguda en la partida,si es aixi:
            ranking.pop(); //S'extreura el darrer element
            ranking.push(new Objecte(name, puntuacio)); //S'enmagatzemara el nou Objecte dins de l'array
            localStorage.setItem("puntuacions", JSON.stringify(ranking)) //Es guardara al localStorage el que s'ha obtingut, sinos, al recarregar la pagina, tornara a estar la puntuacio anterior
            missatges.innerHTML = "Enhorabona, estas entre els 10 primers,si vols tornar a jugar prem el botó JUGAR";
        } else {
            missatges.innerHTML = "No estas entre els 10 primers, si vols tornar a jugar prem el botó  JUGAR";
        }
    }
    ordenaRanking(); //S'ordena el ranking una altra vegada per si hi ha hagut cualque modificacio a la taula
}

function ordenaRanking() { //Servira per ordenar la taula
    ranking.sort(function(param1, param2) { //Es fa una funcio anonima amb 2 parametres
        if (param1.puntuacions > param2.puntuacions) { //Si el parametre 1 es major que el parametre 2, es quedara a la mateixa posicio
            return -1;
        } else if (param1.puntuacions < param2.puntuacions) { //Si el parametre 2 es major al parametre 1 s'intercambiaran les posicions
            return 1;
        } else { //Si son iguals, es quedaran a la mateixa posicio
            return 0;
        }
    })
}

function Objecte(noms, puntuacions) { //Es creara l'objecte que contendra el nom i les puntuacions dels distints usuaris que han jugat
    this.noms = noms;
    this.puntuacions = puntuacions;
}

function bloquejaSubmit() { //El que es fa principalment es eliminar el formulari
    if (document.getElementById("form") != null) {
        document.body.removeChild(document.getElementById("form"));


    }
}

function removeTable() { //Basicament s'elimina la taula
    if (document.getElementById("table") != null) {
        document.body.removeChild(document.getElementById("divTable"));
    }
}

ordenaRanking(); //La taula quedara ordenada sempre que s'entri a la pagina o es recarregui
table(); //Es mostrara la taula
createDiv(); //Es mostrara el tauler
startGame(); //Es mostrara el boto JUGAR

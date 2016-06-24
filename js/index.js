var apiKey = '91100be45ba4a288d29aa7013e88978c';

document.getElementById('nombrePersonaje').addEventListener('keyup', getCharacterName);
function getCharacterName(evt){

    if(event.keyCode === 13){
        var nombrePersonaje = document.getElementById('nombrePersonaje').value;
        marvelRequest("https://gateway.marvel.com:443/v1/public/characters?name=" + nombrePersonaje + "&orderBy=name&apikey=" + apiKey);
    }
};

function pushToHTML(datos) {
    document.getElementById('personaje-details').style.display='inline-block';
    document.getElementById('personaje-wiki').style.display='inline-block';
    document.getElementById('personaje-comics').style.display='inline-block';
    document.getElementById('personaje-foto').style.display='inline-block';
    document.getElementById('mainEvents').style.display='block';

    document.getElementById('personaje-nombre').innerHTML = datos.data.results[0].name;
    document.getElementById('personaje-foto').src = datos.data.results[0].thumbnail.path +"."+ datos.data.results[0].thumbnail.extension;
    document.getElementById('personaje-descripcion').innerHTML = datos.data.results[0].description;

    document.getElementById('personaje-details').href = datos.data.results[0].urls[0].url;
    document.getElementById('personaje-wiki').href = datos.data.results[0].urls[1].url;
    document.getElementById('personaje-comics').href = datos.data.results[0].urls[2].url;



    marvelRequest2(datos.data.results[0].events.collectionURI + "?apikey=" + apiKey);
}
function pushToHTML2 (datos){
    for(i = 0; i < datos.data.results.length; i++){
        var contenido  = document.createElement('div');

        var titulo = document.createTextNode(datos.data.results[i].title);
        var parrafo = document.createElement("p");
        parrafo.appendChild(titulo)
        contenido.appendChild(parrafo);

        var oImg = document.createElement("img");
        oImg.setAttribute('src', datos.data.results[i].thumbnail.path +"."+datos.data.results[i].thumbnail.extension);
        contenido.appendChild(oImg);

        document.getElementById('titulos').appendChild(contenido)
    }
}

function marvelRequest(url) {

    var xmlHttp = new XMLHttpRequest();

    xmlHttp.onreadystatechange = function() {
        if (xmlHttp.readyState === 4) {
            if (xmlHttp.status == 200) {
                var datos = JSON.parse(xmlHttp.responseText);
                pushToHTML(datos);
            } else if (xmlHttp.status >= 400 && xmlHttp.status <= 600) {
                // Estilos
                document.getElementById("contenido").innerHTML = '<img src="img/404.jpg">';
                console.error("ERROR! 404", JSON.parse(xmlHttp.responseText));
            }
        }
    };
    xmlHttp.open("GET", url, true);
    xmlHttp.send();
}
function marvelRequest2(url) {

    var xmlHttp = new XMLHttpRequest();

    xmlHttp.onreadystatechange = function() {
        if (xmlHttp.readyState === 4) {
            if (xmlHttp.status == 200) {
                var datos = JSON.parse(xmlHttp.responseText);
                pushToHTML2(datos);
            } else if (xmlHttp.status >= 400 && xmlHttp.status <= 600) {
                // Estilos
                document.getElementById("contenido").innerHTML = '<img src="img/404.jpg">';
                console.error("ERROR! 404", JSON.parse(xmlHttp.responseText));
            }
        }
    };
    xmlHttp.open("GET", url, true);
    xmlHttp.send();
}

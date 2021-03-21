/**
 * Created by simon on 24/05/2017.
 */
var mat_mark = new Array(5);
var mat_travelMode = new Array(4);
var DIM = 5;
window.onload = function () {
    caricaMatrice();
    caricaMatrice2();
    creaPagina();
    creaMappa();
}
function caricaMatrice2() {
    for(var i = 0; i<4; i++)
        mat_travelMode[i]=new Array(2);
    mat_travelMode[0][0]="WALKING";
    mat_travelMode[0][1]="A piedi";
    mat_travelMode[1][0]="DRIVING";
    mat_travelMode[1][1]="In macchina";
    mat_travelMode[2][0]="BICYCLING";
    mat_travelMode[2][1]="In bici";
    mat_travelMode[3][0]="TRANSIT";
    mat_travelMode[3][1]="Mezzi publici";

}
function caricaMatrice() {
    for(var i = 0; i<DIM; i++)
        mat_mark[i]=new Array(4);
    mat_mark[0][0]="MONTARIBALDI";
    mat_mark[0][1]="MONTARIBALDI Az. Agricola di Taliano Luciano e Taliano Roberto, Barbaresco, CN";
    mat_mark[0][2]="<a href='http://www.montaribaldi.com/it/homepage' target='_blank'>Clicca qui</a>";
    mat_mark[0][3]="icone/vineyard.png";
    mat_mark[1][0]="Casa Nicolini";
    mat_mark[1][1]="Casa Nicolini Ristorante Albergo";
    mat_mark[1][2]="<a href='http://www.casanicolini.com/' target='_blank'>Clicca qui</a>";
    mat_mark[1][3]="icone/bed_breakfast.png";
    mat_mark[2][0]="Nuovo TreStelle";
    mat_mark[2][1]="Nuovo TreStelle Cucina e Pizza";
    mat_mark[2][2]="<a href='http://www.nuovotrestelle.it/' target='_blank'>Clicca qui</a>";
    mat_mark[2][3]="icone/pizzaria.png";
    mat_mark[3][0]="Chiesa";
    mat_mark[3][1]="44.705941, 8.084037";
    mat_mark[3][2]="<a href='http://lachiesa.it/' target='_blank'>Clicca qui</a>";
    mat_mark[3][3]="icone/church.png";
    mat_mark[4][0]="Per Tutti I Gusti";
    mat_mark[4][1]="Per Tutti I Gusti";
    mat_mark[4][2]="<a href='http://www.pertuttigusti.com/it/'>Clicca qui</a>";
    mat_mark[4][3]="icone/gourmet_3stars.png";
}
function creaPagina() {
    var body = document.getElementsByTagName("body")[0];
    var header = document.createElement("header");
    var nav = document.createElement("nav");
    var aside = document.createElement("aside");
    var section = document.createElement("section");
    var article = document.createElement("article");
    var footer = document.createElement("footer");
    var lb = document.createElement("label");
    var sl = document.createElement("select");
    var btn = document.createElement("input");
    var br = document.createElement("br");
    var opt;

    body.appendChild(header);
    body.appendChild(nav);
    body.appendChild(section);
    body.appendChild(aside);
    body.appendChild(footer);

    article.setAttribute("id", "article1");
    section.appendChild(article);
    var imgBox = document.createElement("div");
    article.appendChild(imgBox);
    imgBox.setAttribute("id", "imgBox");

    article = document.createElement("article");
    article.setAttribute("id", "article2");
    section.appendChild(article);
    var contenitore = article;
    var table = document.createElement("table");

    //SELECTBOX COSA VUOI VISTARE
    var tr = document.createElement("tr");
    var td = document.createElement("td");
    lb.setAttribute("for", "sl");
    lb.innerHTML="Cosa vuoi visitare: ";
    td.appendChild(lb);
    tr.appendChild(td);

    var td = document.createElement("td");
    sl.setAttribute("id", "slVisitare");
    sl.setAttribute("name", "sl");
    //carico slBox luoghi da visitare
    for(var i = 0; i<DIM; i++)
    {
        opt = document.createElement("option");
        opt.setAttribute("value", mat_mark[i][1]);
        opt.innerHTML=mat_mark[i][0];
        sl.appendChild(opt);
    }
    sl.selectedIndex=-1;
    sl.addEventListener("change", function () {
        aggiornaListBox();
    })
    td.appendChild(sl);
    tr.appendChild(td);
    table.appendChild(tr);

    //CRAZIONE LUOGO DI PARTENZA
    var tr = document.createElement("tr");
    var td = document.createElement("td");
    lb= document.createElement("label");
    lb.setAttribute("for", "txtLuogoPartenza");
    lb.innerHTML="Da dove arrivi?";
    td.appendChild(lb);
    tr.appendChild(td);

    var td = document.createElement("td");
    btn.setAttribute("id", "txtLuogoPartenza");
    btn.setAttribute("name", "txtLuogoPartenza");
    btn.setAttribute("type", "text");
    btn.setAttribute("placeholder", "Da dove arrivi?");
    td.appendChild(btn);
    tr.appendChild(td);
    table.appendChild(tr);

    //CREAZIONE SELEZIONE MULTIPLA
    var tr = document.createElement("tr");
    var td = document.createElement("td");
    lb= document.createElement("label");
    lb.setAttribute("for", "slMultiple");
    lb.innerHTML="Altri luoghi che vuoi visitare?";
    td.appendChild(lb);
    tr.appendChild(td);

    var td = document.createElement("td");
    sl = document.createElement("select");
    sl.setAttribute("id", "slMultiple");
    sl.setAttribute("name", "slMultiple");
    sl.setAttribute("multiple", "multiple");
    for(var i = 0; i<DIM; i++)
    {
        opt = document.createElement("option");
        opt.setAttribute("value", mat_mark[i][1]);
        opt.innerHTML=mat_mark[i][0];
        sl.appendChild(opt);
    }
    sl.selectedIndex=-1;
    td.appendChild(sl);
    tr.appendChild(td);
    table.appendChild(tr);

    //CREAZIONE SELETBOC TRAVELMODE
    var tr = document.createElement("tr");
    var td = document.createElement("td");
    lb= document.createElement("label");
    lb.setAttribute("for", "slTravelMode");
    lb.innerHTML="Con cosa vuoi viaggiare?";
    td.appendChild(lb);
    tr.appendChild(td);

    var td = document.createElement("td");
    sl = document.createElement("select");
    sl.setAttribute("id", "slTravelMode");
    sl.setAttribute("name", "slTravelMode");
    contenitore.appendChild(sl);
    for(var i = 0; i<4; i++)
    {
        opt = document.createElement("option");
        opt.setAttribute("value", mat_travelMode[i][0]);
        opt.innerHTML=mat_travelMode[i][1];
        sl.appendChild(opt);
    }
    sl.selectedIndex=-1;
    td.appendChild(sl);
    tr.appendChild(td);
    table.appendChild(tr);

    //CREAZIONE BOTTONE PAGINA 2
    var tr = document.createElement("tr");
    var td = document.createElement("td");
    var div = document.createElement("div");
    contenitore.appendChild(div);
    div.setAttribute("id", "btnInvia");
    div.innerHTML="INVIA";
    div.addEventListener("click", function () {
        Pagina2();
    });
    td.rowSpan=2;
    td.appendChild(div);
    tr.appendChild(td);
    table.appendChild(tr);
    contenitore.appendChild(table);

    var defaultBounds = new google.maps.LatLngBounds(
        new google.maps.LatLng(44.704186, 8.080858)
    );
    var input = document.getElementById('txtLuogoPartenza');
    var options = {
        bounds: defaultBounds,
        //types: ['establishment']
    };
    autocomplete = new google.maps.places.Autocomplete(input, options);
}

function aggiornaListBox() {
    var selezionato = document.getElementById("slVisitare").value;
    var sl = document.getElementById("slMultiple");
    sl.innerHTML="";
    for(var i = 0; i<DIM; i++)
    {
        if(mat_mark[i][1]!=selezionato)
        {
            opt = document.createElement("option");
            opt.setAttribute("value", mat_mark[i][1]);
            opt.innerHTML=mat_mark[i][0];
            sl.appendChild(opt);
        }
    }
}
function Pagina2() {
    var addressInput = document.getElementById("slVisitare").value;
    var indirizzoPartenza = document.getElementById("txtLuogoPartenza").value;
    var travelMode = document.getElementById("slTravelMode").value;
    var sl = document.getElementById("slMultiple");
    var s = "";
    var errore = "ERRORE/I:";
    var k = 1;
    for(var i = 0; i<sl.length; i++){
        if(sl.options[i].selected)
        {
            s+= "&PUNTO"+(k++)+"="+sl.options[i].value;
            //alert(s);
        }
    }

    var ok = true;
    if(addressInput==""){
        errore+=(" SELEZIONA UN LUOGO COME DESTINAZIONE,");
        ok=false;
    }
    if(indirizzoPartenza==""){
        errore+=(" INSERISCI UN INDIRIZZO DI PARTENZA,");
        ok=false;
    }
    if(travelMode==""){
        errore+=(" SELEZIONA UNA MODALITA DI VIAGGIO,");
        ok=false;
    }

    if(ok){
        var geocoder = new google.maps.Geocoder();
        geocoder.geocode({address: addressInput}, function(results, status) {
            if (status == google.maps.GeocoderStatus.OK) {
                var myResult = results[0].geometry.location; // reference LatLng value
                var lng = results[0].geometry.location.lng();
                var lat = results[0].geometry.location.lat();
                window.location.href="index2.html?LNG="+lng+"&LAT="+lat+"&PARTENZA="+indirizzoPartenza+"&ARRIVO="+addressInput+"&TRAVELMODE="+travelMode+s; // call the function that adds the marker
            }
        });
    }  else {
        alert(errore);
    }

}
function creaMappa() {
    var imgBox = document.getElementById("imgBox");
    // LatLng non accetta indirizzi ma solo coordinate GPS
    // var posizione = new google.maps.LatLng("via martinetto, cavallermaggiore");
    var posizione = new google.maps.LatLng(44.704186, 8.080858);
    var opzioni = {
        center:posizione,
        zoom:16,
        mapTypeId: google.maps.MapTypeId.HYBRID,
        disableDefaultUI:true,  // disabilito tutti gli strumenti di controllo

        // abilito i pulsanti di zoom
        zoomControl: true,
        zoomControlOptions: {
            style: google.maps.ZoomControlStyle.LARGE,
            position: google.maps.ControlPosition.RIGHT_CENTER
        },

        // abilito lo street View
        streetViewControl: true,
        streetViewControlOptions: {
            position: google.maps.ControlPosition.RIGHT_CENTER
        },

        // abilito i pulsantini di switch Mappa/Satellite
        mapTypeControl: true,
        mapTypeControlOptions: {
            position: google.maps.ControlPosition.TOP_RIGHT
        },

        // ????
        navigationControl: true,
        navigationControlOptions: {
            style: google.maps.NavigationControlStyle.SMALL
        },

        // ????
        panControl: true,
        panControlOptions: {
            position: google.maps.ControlPosition.RIGHT_CENTER
        }
    };

    // Visualizzo la google map all'interno del riquadro indicato
    var mappa = new google.maps.Map(imgBox, opzioni);
    for(var i = 0; i<DIM; i++)
        convertiIndirizoToCordinate(mappa, i);
}

function convertiIndirizoToCordinate(map, i) {
    var addressInput = mat_mark[i][1];
    var geocoder = new google.maps.Geocoder();
    geocoder.geocode({address: addressInput}, function(results, status) {
        if (status == google.maps.GeocoderStatus.OK) {
            var myResult = results[0].geometry.location;
            // reference LatLng value
            createMarker(myResult, map, i); // call the function that adds the marker
        }
    });
}

function createMarker(latlng, map, i) {
    var nome = mat_mark[i][0];
    var img1 = {
        url: mat_mark[i][3],
        // dimensioni del marker.
        size: new google.maps.Size(32, 37),
        // offset di caricamento dell'immagine all'interno del quadratino
        origin: new google.maps.Point(0,0),
        // Offset dell'immagine rispetto alla posizione GPS impostata.
        // consente di impostare piccoli aggiustamenti
        // 32px verso sinistra e 40px verso l'alto
        anchor: new google.maps.Point(0, 25)
    };
    var info = "<h2>"+nome+"</h2>" +
        "<p>Informazioni: "+mat_mark[i][2]+"</p>" +
        "<p>Indirizzo: "+mat_mark[i][1]+ "</p>"+
        "<p>Coordinate: "+ latlng+ "</p>";
    var marker = new google.maps.Marker({
        map: map,
        position: latlng,
        icon: img1,
        title: nome
    });
    var finestra =  new google.maps.InfoWindow({
        content:info,
    });

    marker.addListener("click", function () {
        finestra.open(map, marker);
    });
}
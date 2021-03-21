/**
 * Created by simon on 31/05/2017.
 */
window.onload = function () {
    creaPagina();
}

function creaPagina() {
    var contenitore = document.getElementsByTagName("body")[0];

    var header = document.createElement("header");
    var nav = document.createElement("nav");
    var aside = document.createElement("aside");
    var section = document.createElement("section");
    var article = document.createElement("article");
    var footer = document.createElement("footer");
    var h1 = document.createElement("h1");

    contenitore.appendChild(header);
    header.appendChild(h1);
    h1.innerHTML="GEOLOCATION";
    contenitore.appendChild(nav);
    contenitore.appendChild(section);
    contenitore.appendChild(aside);
    contenitore.appendChild(footer);
    section.appendChild(article);
    var wrapper = document.createElement("div");
    article.appendChild(wrapper);
    wrapper.setAttribute("id", "wrapper");
    var table = document.createElement("div");
    var tr = document.createElement("tr");
    var td = document.createElement("tr");
    var divBtn = document.createElement("div");
    td.appendChild(divBtn);
    divBtn.setAttribute("id", "btnCaricaMappaMarker");
    divBtn.setAttribute("class", "button");
    divBtn.innerHTML="CARICA MAPPA CON MARKER";
    divBtn.addEventListener("click", function () {
        caricaMappaConMarker();
    });
    tr.appendChild(td);

    td = document.createElement("td");
    var divBtn = document.createElement("div");
    td.appendChild(divBtn);
    divBtn.setAttribute("id", "btnGeocode");
    divBtn.setAttribute("class", "button");
    divBtn.innerHTML="GEOCODE";
    divBtn.style.lineHeight="40px";
    divBtn.addEventListener("click", function () {
        caricaGeocode();
    });
    tr.appendChild(td);

    td = document.createElement("td");
    var divBtn = document.createElement("div");
    td.appendChild(divBtn);
    divBtn.setAttribute("id", "btnReverseGeocode");
    divBtn.setAttribute("class", "button");
    divBtn.innerHTML="REVERSE GEOCODE";
    divBtn.style.lineHeight="40px";
    divBtn.addEventListener("click", function () {
        caricaReverseGeocode();
    });
    tr.appendChild(td);
    table.appendChild(tr);
    nav.appendChild(table);
}

function caricaMappaConMarker() {
    var iframe = document.createElement("iframe");
    var wrapper = document.getElementById("wrapper");
    wrapper.innerHTML="";
    wrapper.appendChild(iframe);
    iframe.src="index.html";
}

function caricaGeocode() {
    var wrapper = document.getElementById("wrapper");
    wrapper.innerHTML="";

    var table = document.createElement("table");

    //CREAZIONE INDIRIZZO DA CONVERTIRE
    var tr = document.createElement("tr");
    var td = document.createElement("td");
    var lb = document.createElement("label");
    lb.setAttribute("for", "txtIn");
    lb.innerHTML="Inserisci indirizzo da convertire: ";
    td.appendChild(lb);
    tr.appendChild(td);

    var td = document.createElement("td");
    var txtIn = document.createElement("input");
    txtIn.setAttribute("type", "text");
    txtIn.setAttribute("id", "txtIn");
    txtIn.setAttribute("name", "txtIn");
    txtIn.setAttribute("placeholder","Inserisci indirizzo da convertire");
    td.appendChild(txtIn);
    tr.appendChild(td);
    table.appendChild(tr);

    //CREAZIONE TXT OUTPUT
    var tr = document.createElement("tr");
    var td = document.createElement("td");
    lb = document.createElement("label");
    lb.setAttribute("for", "txtOut");
    lb.innerHTML="Risultato (lat, lng): ";
    td.appendChild(lb);
    tr.appendChild(td);

    var td = document.createElement("td");
    var txtOut = document.createElement("input");
    txtOut.setAttribute("type", "text");
    txtOut.setAttribute("id", "txtOut");
    txtOut.setAttribute("name", "txtOut");
    txtOut.setAttribute("readonly","readonly");
    td.appendChild(txtOut);
    tr.appendChild(td);
    table.appendChild(tr);

    //CREAZIONE BOTTONE GEOCODE
    var tr = document.createElement("tr");
    var td = document.createElement("td");
    var divConverti = document.createElement("div");
    divConverti.setAttribute("id", "btnConvertiGeocode");
    divConverti.setAttribute("class", "");
    divConverti.innerHTML="CONVERTI";
    td.rowSpan=2;
    td.appendChild(divConverti);
    tr.appendChild(td);
    table.appendChild(tr);
    wrapper.appendChild(table);

    //AGGIUNTA BARRA RICERCA A TXT IN
    var defaultBounds = new google.maps.LatLngBounds(
        new google.maps.LatLng(44.704186, 8.080858)
    );
    var input = document.getElementById('txtIn');
    var options = {
        bounds: defaultBounds,
        //types: ['establishment']
    };
    autocomplete = new google.maps.places.Autocomplete(input, options);

    var mappa = document.createElement("div");
    mappa.setAttribute("id", "map");
    mappa.style.height="400px";
    mappa.style.width="640px";
    wrapper.appendChild(mappa);
    var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 12,
        center: {lat: 44.704186, lng: 8.080858},
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
    });
    divConverti.addEventListener("click", function () {
        convertiGeocode(map);
    });
}



function convertiGeocode(map) {
    var addressInput = document.getElementById("txtIn").value;
    if(addressInput!="")
    {
        var geocoder = new google.maps.Geocoder();
        geocoder.geocode({address: addressInput}, function(results, status) {
            if (status == google.maps.GeocoderStatus.OK) {
                var myResult = results[0].geometry.location;
                document.getElementById("txtOut").value = myResult;
                map.setZoom(16);
                map.setCenter(myResult);
                var marker = new google.maps.Marker({
                    position: myResult,
                    map: map
                });
            }
        });
    }
    else
    {
        alert("INSERISCI UN INDIRIZZO DA CONVERTIRE IN COORDINATE GPS");
    }

}

function caricaReverseGeocode() {
    var wrapper = document.getElementById("wrapper");
    wrapper.innerHTML="";

    var table = document.createElement("table");

    //CREAZIONE INDIRIZZO DA CONVERTIRE
    var tr = document.createElement("tr");
    var td = document.createElement("td");
    var lb = document.createElement("label");
    lb.setAttribute("for", "txtIn");
    lb.innerHTML="Inserisci le coordinate gps da convertire in indirizzo: ";
    td.appendChild(lb);
    tr.appendChild(td);

    var td = document.createElement("td");
    var txtIn = document.createElement("input");
    txtIn.setAttribute("type", "text");
    txtIn.setAttribute("id", "txtIn");
    txtIn.setAttribute("name", "txtIn");
    txtIn.setAttribute("placeholder","Inserisci le coordinate gps da convertire in indirizzo");
    td.appendChild(txtIn);
    tr.appendChild(td);
    table.appendChild(tr);

    //CREAZIONE TXT OUTPUT
    var tr = document.createElement("tr");
    var td = document.createElement("td");
    lb = document.createElement("label");
    lb.setAttribute("for", "txtOut");
    lb.innerHTML="Risultato (indirizzo): ";
    td.appendChild(lb);
    tr.appendChild(td);

    var td = document.createElement("td");
    var txtOut = document.createElement("input");
    txtOut.setAttribute("type", "text");
    txtOut.setAttribute("id", "txtOut");
    txtOut.setAttribute("name", "txtOut");
    txtOut.setAttribute("readonly","readonly");
    td.appendChild(txtOut);
    tr.appendChild(td);
    table.appendChild(tr);

    //CREAZIONE BOTTONE GEOCODE
    var tr = document.createElement("tr");
    var td = document.createElement("td");
    var divConverti = document.createElement("div");
    divConverti.setAttribute("id", "btnConvertiGeocode");
    divConverti.setAttribute("class", "");
    divConverti.innerHTML="CONVERTI";
    td.rowSpan=2;
    td.appendChild(divConverti);
    tr.appendChild(td);
    table.appendChild(tr);
    wrapper.appendChild(table);

    var mappa = document.createElement("div");
    mappa.setAttribute("id", "map");
    mappa.style.height="400px";
    mappa.style.width="640px";
    wrapper.appendChild(mappa);
    var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 12,
        center: {lat: 44.704186, lng: 8.080858},
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
    });
    divConverti.addEventListener("click", function () {
        convertiReverseGeocode(map);
    });
}
function convertiReverseGeocode(map) {
    var addressInput = document.getElementById("txtIn").value;
    addressInput = addressInput.replace("(","");
    addressInput = addressInput.replace(")","");
    if(addressInput!="")
    {
        var geocoder = new google.maps.Geocoder();
        var latlngStr = addressInput.split(',', 2);
        var latlng = {lat: parseFloat(latlngStr[0]), lng: parseFloat(latlngStr[1])};
        geocoder.geocode({'location': latlng}, function(results, status) {
            if (status == google.maps.GeocoderStatus.OK) {
                var myResult = results[0].formatted_address;
                document.getElementById("txtOut").value = myResult;
                map.setZoom(16);
                map.setCenter(latlng);
                var marker = new google.maps.Marker({
                    position: latlng,
                    map: map
                });
            }
        });
    }
    else
    {
        alert("INSERISCI LE COORDINATE GPS DA CONVERTIRE IN INDIRIZZO");
    }
}
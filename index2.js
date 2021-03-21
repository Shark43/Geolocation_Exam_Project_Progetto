/**
 * Created by simon on 30/05/2017.
 */
window.onload = function () {
    creaPagina();
    var url = window.location.search;
    //alert(url);
    var waypts = wayp(url);
    url = url.split('=');
    var lng = url[1].split('&')[0];
    var lat = url[2].split('&')[0];
    var ps = url[3].split('&')[0];
    var partenza = rimuoviStringa(ps,"%20");
    //initialize(lng,lat,partenza);
    var as = url[4].split('&')[0];
    var arrivo = rimuoviStringa(as,"%20");
    var tm = url[5].split('&')[0];
    initMap(lng, lat, partenza, arrivo, tm, waypts);
}
function creaPagina() {
    var contenitore = document.getElementsByTagName("body")[0];
    var header = document.createElement("header");
    var nav = document.createElement("nav");
    var aside = document.createElement("aside");
    var section = document.createElement("section");
    var table = document.createElement("table");
    var footer = document.createElement("footer");

    contenitore.appendChild(header);
    contenitore.appendChild(nav);
    contenitore.appendChild(section);
    contenitore.appendChild(aside);
    contenitore.appendChild(footer);

    var tr = document.createElement("tr");
    var td = document.createElement("td");
    var div = document.createElement("div");
    div.setAttribute("id", "imgBox");
    var article = document.createElement("article");
    article.setAttribute("id", "art1");
    article.appendChild(div);
    td.appendChild(article);
    td.setAttribute("rowspan","2");
    tr.appendChild(td);
    var td = document.createElement("td");
    div = document.createElement("div");
    div.setAttribute("id", "percorso");
    article = document.createElement("article");
    article.setAttribute("id", "art2");
    article.appendChild(div);
    td.appendChild(article);
    tr.appendChild(td);
    table.appendChild(tr);

    var tr = document.createElement("tr");
    var td = document.createElement("td");
    div = document.createElement("div");
    div.setAttribute("id", "indicazioni");
    article = document.createElement("article");
    article.setAttribute("id", "art3");
    article.appendChild(div);
    td.appendChild(article);
    tr.appendChild(td);
    table.appendChild(tr);

    var tr = document.createElement("tr");
    var td = document.createElement("td");
    div = document.createElement("div");
    div.setAttribute("id", "btnIndietro");
    div.innerHTML="INDIETRO";
    div.addEventListener("click", function () {
        window.location.href="index.html";
    });    //lb.setAttribute("for", "txt");
    td.appendChild(div);
    tr.appendChild(td);
    table.appendChild(tr);
    section.appendChild(table);
}
function wayp(url) {
    var cont = 1;
    var url1 = url;
    while(url1.indexOf("&")!=-1)
    {
        url1 = url1.replace("&", " ");
        cont++;
    }
    //var ckb = rimuoviStringa((url[6].split('&')[0]),"%20");
    //alert(cont);
    var waypts = [];
    var s;
    url = url1.split(' ');
    //alert(url.length);
    if(cont-5==0)
    {
        return waypts
    }
    else
    {
        for (var i = 5; i < url.length; i++) {
            s=rimuoviStringa((url[i].split('=')[1]),"%20");
            //alert(s);
            //alert(rimuoviStringa((url[i].split('=')[1]),"%20"));
            waypts.push({
                location: s,
                stopover: true
            });
        }
        return waypts;
    }
}
function rimuoviStringa(s, rimuovi) {
    while(s.indexOf("%20")!=-1)
        s = s.replace(rimuovi, " ");
    return s;
}
function initMap(lng, lat, partenza, arrivo, tm, waypts) {
    var directionsService = new google.maps.DirectionsService;
    var directionsDisplay = new google.maps.DirectionsRenderer;
    var map = new google.maps.Map(document.getElementById('imgBox'), {
        zoom: 12,
        mapTypeId: google.maps.MapTypeId.HYBRID
    });
    directionsDisplay.setMap(map);
    directionsDisplay.setPanel(document.getElementById("indicazioni"));
    calcolaVisualizzaStrada(directionsService, directionsDisplay, lng, lat, partenza, arrivo, tm, waypts);
}

function calcolaVisualizzaStrada(directionsService, directionsDisplay, lng, lat, partenza, arrivo, tm, waypts) {
    var latlng = lat+","+lng;
    var latlngStr = latlng.split(',', 2);
    var latlng = {lat: parseFloat(latlngStr[0]), lng: parseFloat(latlngStr[1])};
    var geocoder = new google.maps.Geocoder();
    directionsService.route({
        origin: partenza,
        destination: arrivo,
        waypoints: waypts,
        optimizeWaypoints: true,
        travelMode: tm
    }, function(response, status) {
        if (status === 'OK') {
            directionsDisplay.setDirections(response);
            var route = response.routes[0];
            var pannelloRiassuntivo = document.getElementById('percorso');
            pannelloRiassuntivo.innerHTML = '';
            // For each route, display summary information.
            if(route.legs.length == 1)
            {
                panRiassuntivo(pannelloRiassuntivo, route, route.legs.length, 0);
            }else
            {
                for (var i = 0; i < route.legs.length; i++) {
                    panRiassuntivo(pannelloRiassuntivo, route, route.legs.length, i);
                }
            }
        } else {
            window.alert('La richiesta di indicazioni non è riuscita a causa di: ' + status);
        }
    });
}

function panRiassuntivo(pannelloRiassuntivo, route, l, i) {
    var routeSegment = i + 1;
    if(l == 1)
        pannelloRiassuntivo.innerHTML += '<b>PERCORSO: </b><br>';
    else
        pannelloRiassuntivo.innerHTML += '<b>PERCORSO: ' + routeSegment + '</b><br>';
    pannelloRiassuntivo.innerHTML += "DA: " + route.legs[i].start_address + "<br>";
    pannelloRiassuntivo.innerHTML += " A: " + route.legs[i].end_address + '<br>';
    pannelloRiassuntivo.innerHTML += "DISTANZA: " + route.legs[i].distance.text + '<br>';
    pannelloRiassuntivo.innerHTML += "TEMPO STIMATO: " + route.legs[i].duration.text;
    if(l != 1)
        pannelloRiassuntivo.innerHTML += '<br><br>';
}
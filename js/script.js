$(document).ready(main);

function main() {
    $("#uporabnik").click(uporabnik_clicked);
    $("#prevoznik").click(prevoznik_clicked);
    $("#isci_prevoznika").click(isci_prevoznika);
    $("#potrditev_prevoznika").click(potrditev_prevoznika);
    
    // prikazi_prevoz(podatki["prevozi"][0]);
    
}



function uporabnik_clicked() {
    $(".prevoznik").hide();
    $(".uporabnik").show(500);
    
    $("#prevoznik").removeClass("active");
    $("#uporabnik").addClass("active");
    
    initMapId("map", "vstop", "izstop", "FIND");
    map.setOnPathChangedListener(prikazi_prevoz);
}


function prevoznik_clicked() {
    $(".uporabnik").hide();
    $(".prevoznik").show(500);
    
    $("#uporabnik").removeClass("active");
    $("#prevoznik").addClass("active");
    
    initMapId("map_2", "vstop_2", "izstop_2", "EDIT");
}


function isci_prevoznika() {
    var ura = $("#ura_prihoda").val();
    var dan = $("#dan_prihoda").val();
    
    console.log(ura);
    console.log(dan);
    
    // check if not empty
    
}


function initMap() {
    initMapId ("map_2", "vstop_2", "izstop_2", "EDIT");
}


var vstopno = "";

function prikazi_prevoz(prevoz) {
    var vstop = prevoz.first;
    var izstop = prevoz.last;
    prevoz = prevoz.drive;
    
    var linija = podatki["linije"][prevoz.linija];
    var datum = prevoz.datum;
    var ura = String(linija.odhodi["ura"]);
    
    var decimalka = ura.split(".");
    ura = decimalka[0];
    var minute = String(Math.round(parseFloat("0."+decimalka[1]) * 60));
    if (minute.length == 1) {
        minute = "0" + minute;
    }
    ura += ":" + minute;
    
    var leto = datum.getFullYear()
    var mesec = datum.getMonth();
    var dan = datum.getDate();
    datum = dan + ". " + mesec + ". " +leto;
    
    var datum_ura = datum + " ob " + ura;
    
    var postaje = linija.postaje;
    var avto = linija.avto;
    
    $("#ime_linije").text(linija.ime);
    $("#datum_ura").text(datum_ura);
    $("#voznik").text(podatki["uporabniki"][linija.voznik].ime + " " + podatki["uporabniki"][linija.voznik].priimek);
    $("#znamka").text(avto.znamka);
    $("#model").text(avto.model);
    $("#barva").text(avto.barva);
    $("#registracija").text(avto.registracija);
    
    var vstop_izstop = "";
    var html_string = "<div class=\"panel-heading\">Postaje</div>";
    for (var i=0; i<postaje.length; i++) {
        if (i == vstop) {
            vstop_izstop = "Vstop";
            vstopno = postaje[i].ime;
        }
        else if (i == izstop) {
            vstop_izstop = "Izstop";
        }
        else {
            vstop_izstop = "";
        }
        var ime_postaje = postaje[i].ime;
        html_string += ` <div class=\"panel-body\"> <div class=\"col-md-4\"> ${ime_postaje} </div> <div class=\"col-md-8\"> ${vstop_izstop} </div> </div> `;
    }
    $("#postaje").html(html_string);
    
    $("#prevoz_info").show(500);
    
}


function potrditev_prevoznika() {
    var txt = $("#datum_ura").text();
    console.log(txt);
    $("#ura_prevoza").text(txt);
    $("#lokacija_prevoza").text(vstopno);
    $("#izbran_prevoz").show(500);
}


function initMapId (map_id, vstop_id, izstop_id, mode) {
    map = new Map(document.getElementById(map_id), document.getElementById(vstop_id),document.getElementById(izstop_id), mode);
}

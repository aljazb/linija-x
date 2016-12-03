$(document).ready(main);

function main() {
    $("#uporabnik").click(uporabnik_clicked);
    $("#prevoznik").click(prevoznik_clicked);
    $("#isci_prevoznika").click(isci_prevoznika);
    
    prikazi_prevoz(podatki["prevozi"][0]);
}



function uporabnik_clicked() {
    $(".prevoznik").hide();
    $(".uporabnik").show(500);
    
    $("#prevoznik").removeClass("active");
    $("#uporabnik").addClass("active");
    
    initMapId("map", "vstop", "izstop", "FIND");
}


function prevoznik_clicked() {
    $(".uporabnik").hide();
    $(".prevoznik").show(500);
    
    $("#uporabnik").removeClass("active");
    $("#prevoznik").addClass("active");
    
    initMapId("map_2", "vstop_2", "izstop_2", "EDIT");
    map.setOnStationsChangedListener(dodajPostaje);
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
    map.setOnStationsChangedListener(dodajPostaje);
}


function prikazi_prevoz(prevoz) {
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
    
    for (var i=0; i<postaje.length; i++) {
        // append to HTML
    }
    
}
function initMapId (map_id, vstop_id, izstop_id, mode) {
    map = new Map(document.getElementById(map_id), document.getElementById(vstop_id),document.getElementById(izstop_id), mode);
}


function dodajPostaje(stevilo) {
    $("#dodanePostaje").html("");
    for (var i = 0; i < stevilo; i++) {
        $("#dodanePostaje").append(`<div class="panel-body"><input type="text" class="form-control" id="postaja" value="Postaja ${i+1}"></div>`)
    }
}
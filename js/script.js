$(document).ready(main);

function main() {
    $("#uporabnik").click(uporabnik_clicked);
    $("#prevoznik").click(prevoznik_clicked);
    $("#isci_prevoznika").click(isci_prevoznika);
    
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
}


function isci_prevoznika() {
    var ura = $("#ura_prihoda").val();
    var dan = $("#dan_prihoda").val();
    
    console.log(ura);
    console.log(dan);
    
}


function initMap() {
    initMapId ("map_2", "vstop_2", "izstop_2", "EDIT");
}


function initMapId (map_id, vstop_id, izstop_id, mode) {
    map = new Map(document.getElementById(map_id), document.getElementById(vstop_id),document.getElementById(izstop_id), mode);
}
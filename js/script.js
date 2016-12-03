$(document).ready(main);


function main() {
    $("#uporabnik").click(uporabnik_clicked);
    $("#prevoznik").click(prevoznik_clicked);
    $("#potrditev_prevoznika").click(potrditev_prevoznika);
    
    
}



function uporabnik_clicked() {
    $(".prevoznik").hide();
    $(".uporabnik").show(500);
    
    $("#prevoznik").removeClass("active");
    $("#uporabnik").addClass("active");
}


function prevoznik_clicked() {
    $(".uporabnik").hide();
    $(".prevoznik").show(500);
    
    $("#uporabnik").removeClass("active");
    $("#prevoznik").addClass("active");
}


function potrditev_prevoznika() {
    
}
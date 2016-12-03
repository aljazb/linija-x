var vsiAvti = [];
var vsiUporabniki = [];

function ustvariAvte() {
    var znamka = "BMW";
    var model = "serija 3";
    var barva = "Siva";
    var registracija = "GO";
    vsiAvti[0] = new Avto(znamka, model, barva, registracija);
    
    znamka = "Audi";
    model = "A6";
    barva = "Črn";
    registracija = "LJ";
    vsiAvti[1] = new Avto(znamka, model, barva, registracija);
}

function ustvariUporabnike() {
    var ime = "Janez";
    var priimek = "Novak";
    var email = "janez.novak@gmail.com";
    var uporabniskoIme = "jnovak";
    var spol = "m";
    var avti = [];
    avti[0] = vsiAvti[0];
    vsiUporabniki[0] = new Uporabnik(uporabniskoIme, email, ime, priimek, spol, avti);

    ime = "Lojze";
    priimek = "Žust";
    email = "lojze.zust@gmail.com";
    uporabniskoIme = "lzust";
    spol = "m";
    avti = [];
    avti[0] = vsiAvti[0];
    avti[1] = vsiAvti[1];
    vsiUporabniki[1] = new Uporabnik(uporabniskoIme, email, ime, priimek, spol, avti);

    ime = "Marko";
    priimek = "Zeman";
    email = "marko.zeman@gmail.com";
    uporabniskoIme = "mzeman";
    spol = "m";
    avti = [];
    avti[1] = vsiAvti[1];
    vsiUporabniki[2] = new Uporabnik(uporabniskoIme, email, ime, priimek, spol, avti);
}

function ustvariLinije() {
    
}
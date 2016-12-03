class Linija {
    constructor(ime, voznik, postaje, avto, odhodi) {
        this.ime = ime;
        this.voznik = voznik;
        this.postaje = postaje;
        this.avto = avto;
        this.odhodi = odhodi;
    }
}

class Postaja {
    constructor(ime, lokacija) {
        this.ime = ime;
        this.lokacija = lokacija;
    }
}

class Potnik {
    constructor(uporabnik, postajaVstop, postajaIzstop) {
        this.postajaVstop = postajaVstop;
        this.postajaIzstop = postajaIzstop;
        this.uporabnik = uporabnik;
    }
}

class Uporabnik {
    constructor(uporabniskoIme, email, ime, priimek, spol, avti) {
        this.uporabniskoIme = uporabniskoIme;
        this.email = email;
        this.ime = ime;
        this.priimek = priimek;
        this.spol = spol;
        this.avti = avti;
    }
}

class Avto {
    constructor(znamka, model, barva, registracija) {
        this.znamka = znamka;
        this.model = model
        this.barva = barva;
        this.registracija = registracija;
    }
}

class Prevoz{
    constructor(linija, datum, potniki){
        this.linija = linija
        this.datum = datum
        this.potniki = potniki
    }
}
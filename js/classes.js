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
    constructor(ime, lokacija, casPrihoda) {
        this.ime = ime;
        this.lokacija = lokacija;
        this.casPrihoda = casPrihoda;
    }
}

class Potnik {
    constructor(postaja, uporabnik) {
        this.postaja = postaja;
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
var podatki = {
    uporabniki: [
        new Uporabnik("jnovak", "janez.novak@gmail.com", "Janez", "Novak", "m",  [new Avto("BMW", "Serija 3", "Siva", "GO")]),
        new Uporabnik("maremare", "mare@gmail.com", "Marjan", "Gromki", "m", [new Avto("Audi", "A6", "Črn", "LJ")]),
        new Uporabnik("toncek", "toncek@gmail.com", "Tone", "Podgorc", "m", []),
        new Uporabnik("mici_legenda", "mici@gmail.com", "Micka", "Treven", "m", []),
    ],
    linije: [
        new Linija("Janez 5", 0, [
            new Postaja("Dom", {lat: 46.053662, lng: 14.538627}),
            new Postaja("Postaja 1", {lat: 46.045912, lng: 14.506161}),
            new Postaja("Postaja 2", {lat: 46.052675, lng: 14.487844}),
            new Postaja("FRI", {lat: 46.050010, lng: 14.469084})
        ], 0, {ura:10, dnevi: [1,2,3,4,5]}),
        new Linija("BTC Kristalna palača", 1, [
            new Postaja("Dom", {lat: 46.049825, lng: 14.491332}),
            new Postaja("Postaja 1", {lat: 46.050176, lng: 14.497877}),
            new Postaja("Postaja 2", {lat: 46.059687, lng: 14.509399}),
            new Postaja("Postaja 3", {lat: 46.062456, lng: 14.524899}),
            new Postaja("BTC Kristalna palača", {lat: 46.067028, lng: 14.541567})
        ], 0, {ura:7, dnevi: [1,2,3,4,5]})
    ],
    prevozi: [
        new Prevoz(0,new Date("2016-12-6"), [
            new Potnik(1, 1, 3),
            new Potnik(2, 2, 3)
        ]),
        new Prevoz(1,new Date("2016-12-7"), [
            new Potnik(3, 0, 4),
            new Potnik(0, 2, 3)
        ])   
    ]
}
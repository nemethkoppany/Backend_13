class AdatTarolo {
    #adatok;
    #ujAdatCallback;

    constructor() {
        this.#adatok = [];
    }

    setUjAdatCallback(callback) {
        this.#ujAdatCallback = callback;
    }

    hozzaad(adat) {
        this.#adatok.push(adat);
        this.#ujAdatCallback(adat);
    }
}

class TablaMegjelenito {
    #adatTarolo;

    constructor(adatTarolo) {
        this.#adatTarolo = adatTarolo;

        const fejlec = [
            { nev: "id" },
            { nev: "név" },
            { nev: "kor" },
            { nev: "város" },
            { nev: "hobbi" }
        ];

        const tabla = this._letrehozHtmlElem('table', document.body);
        const thead = this._letrehozHtmlElem('thead', tabla);
        const tbody = this._letrehozHtmlElem('tbody', tabla);

        const fejlecSor = this._letrehozHtmlElem('tr', thead);

        for (const oszlop of fejlec) {
            this._letrehozHtmlElemSzoveggel('th', fejlecSor, oszlop.nev);
        }

        this.#adatTarolo.setUjAdatCallback((adat) => {
            const sor = this._letrehozHtmlElem('tr', tbody);
            this._letrehozHtmlElemSzoveggel('td', sor, adat.id);
            this._letrehozHtmlElemSzoveggel('td', sor, adat.nev);
            this._letrehozHtmlElemSzoveggel('td', sor, adat.kor);
            this._letrehozHtmlElemSzoveggel('td', sor, adat.varos);
            this._letrehozHtmlElemSzoveggel('td', sor, adat.hobbi);
        });
    }

    _letrehozHtmlElem(tag, szulo) {
        const elem = document.createElement(tag);
        szulo.appendChild(elem);
        return elem;
    }

    _letrehozHtmlElemSzoveggel(tag, szulo, szoveg) {
        const elem = document.createElement(tag);
        elem.innerHTML = szoveg;
        szulo.appendChild(elem);
        return elem;
    }
}

class FajlFeltolto {
    #adatTarolo;

    constructor(adatTarolo) {
        this.#adatTarolo = adatTarolo;

        const fileInput = document.createElement('input');
        fileInput.type = 'file';
        document.body.appendChild(fileInput);

        fileInput.addEventListener('change', (e) => {
            const fajl = e.target.files[0];
            const olvaso = new FileReader();

            olvaso.readAsText(fajl);

            olvaso.onload = () => {
                const jsonTartalom = JSON.parse(olvaso.result);
                for (const ember of jsonTartalom) {
                    this.#adatTarolo.hozzaad(ember);
                }
            };
        });
    }
}

const adatTarolo = new AdatTarolo();
const tabla = new TablaMegjelenito(adatTarolo);
const feltolto = new FajlFeltolto(adatTarolo);

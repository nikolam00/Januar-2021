export class Grad {

    constructor(id, naziv, north, east, podaci) {
        this.id = id;
        this.naziv = naziv;
        this.north = north;
        this.east = east;
        this.podaci = podaci;
        this.container = null;
    }

    removeAllChildNodes(parent) {
        while (parent.firstChild) {
            parent.removeChild(parent.firstChild);
        }
    }

    crtaj(host) {
        this.container = document.createElement("div");
        this.container.classList.add("glavniKontejner");
        this.container.classList.add(this.naziv);
        host.appendChild(this.container);

        const header = document.createElement("div");
        header.className = "zaglavlje";
        this.container.appendChild(header);

        const stubici = document.createElement("div");
        stubici.className = "stubici";
        this.container.appendChild(stubici);

        this.crtajZaglavlje(header);
        this.crtajStubice(stubici);
    }

    crtajZaglavlje(host) {
        const naslov = document.createElement("div");
        naslov.className = "naslov";
        host.appendChild(naslov);

        const ispis = document.createElement("h2");
        ispis.className = "ispis";
        ispis.innerHTML = "Grad " + this.naziv + " (" + this.north + " N, " + this.east + " E), godina 2020.";
        naslov.appendChild(ispis);

        const radiodugmad = document.createElement("div");
        radiodugmad.className = "radiodugmad";
        host.appendChild(radiodugmad);

        var temperatura, padavine, sunDani;
        var dugmici = [temperatura, padavine, sunDani];
        var labele = ["Temperatura", "Padavine", "Suncani dani"];

        let i = 0;

        labele.forEach(p => {

            dugmici[i] = document.createElement("input");
            dugmici[i].type = "radio";
            dugmici[i].name = "rbName";
            if (i == 0) {
                dugmici[i].checked = true;
            }
            dugmici[i].value = p;
            radiodugmad.appendChild(dugmici[i]);

            let labela = document.createElement("label");
            labela.innerHTML = p;
            radiodugmad.appendChild(labela);

            i++;
        })

        var dugme = document.createElement("button");
        dugme.className = "dugme";
        dugme.innerHTML = "Prikazi";

        let stubici = this.container.querySelector(".stubici");

        dugme.onclick = (ev) => {

            this.crtajStubice(stubici);
        }
        host.appendChild(dugme);
    }

    crtajStubice(host) {

        this.removeAllChildNodes(host);

        let vrednost = this.container.querySelector('input[name="rbName"]:checked').value;
        var max = 0;

        if (vrednost == "Temperatura") {
            this.podaci.forEach(p => {
                if (p.temperatura > max)
                    max = p.temperatura;
            })
        }
        if (vrednost == "Padavine") {
            this.podaci.forEach(p => {
                if (p.padavine > max)
                    max = p.padavine;
            })
        }
        if (vrednost == "Suncani dani") {
            this.podaci.forEach(p => {
                if (p.dani > max)
                    max = p.dani;
            })
        }

        this.podaci.forEach(p => p.crtajStub(host, max, vrednost));
    }
}
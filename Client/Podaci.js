export class Podatak {
    constructor(id, temperatura, padavine, dani, mesec, grad) {
        this.id = id;
        this.temperatura = temperatura;
        this.padavine = padavine;
        this.dani = dani;
        this.grad = grad;

        this.mesec = mesec;

        this.container = null;

        if (this.mesec == null) {
            this.mesec = "JAN";
        }

        if (this.temperatura == null) {
            this.temperatura = 0;
        }
        if (this.padavine == null) {
            this.padavine = 0;
        }
        if (this.dani == null) {
            this.dani = 0;
        }
    }

    removeAllChildNodes(parent) {
        while (parent.firstChild) {
            parent.removeChild(parent.firstChild);
        }
    }

    crtajStub(host, max, tip) {
        var grafik = document.createElement("div");
        grafik.className = "grafik";
        host.appendChild(grafik);

        //host je stubici
        grafik.onclick = (ev) => this.crtajIzmeni(host, tip);

        var labela = document.createElement("div");
        labela.className = "labela";
        grafik.appendChild(labela);


        var stub = document.createElement("div");
        stub.className = "stub";
        grafik.appendChild(stub);

        if (tip == "Temperatura") {
            stub.style.height = (this.temperatura / max) * 100 + "%";
            labela.innerHTML = this.mesec + " " + this.temperatura + "C";
        }

        if (tip == "Padavine") {
            stub.style.height = (this.padavine / max) * 100 + "%";
            labela.innerHTML = this.mesec + " " + this.padavine + "mm";
        }

        if (tip == "Suncani dani") {
            stub.style.height = (this.dani / max) * 100 + "%";
            labela.innerHTML = this.mesec + " " + this.dani;
        }
    }

    crtajIzmeni(host, tip) {
        var Forma = document.createElement("div");
        Forma.className = "IzmeniForma";
        host.appendChild(Forma);

        var LabIzmeni = document.createElement("div");
        LabIzmeni.className = "divLabIzmeni";
        Forma.appendChild(LabIzmeni);

        var lblIzmeni = document.createElement("label");
        lblIzmeni.className = "lblIzmeni";
        lblIzmeni.innerHTML = "Mesec:" + this.mesec;
        LabIzmeni.appendChild(lblIzmeni);

        var input = document.createElement("input");
        input.type = "text";

        if (tip == "Temperatura")
            input.value = this.temperatura;
        if (tip == "Padavine")
            input.value = this.padavine;
        if (tip == "Suncani dani")
            input.value = this.dani;

        Forma.appendChild(input);

        var dugme = document.createElement("button");
        dugme.innerHTML = "Sacuvaj izmene";
        dugme.className = "Sacuvaj";

        if (tip == "Temperatura")
            dugme.onclick = (ev) => this.PromeniTemperaturuJS(this.grad.naziv, this.mesec, input.value);
        if (tip == "Padavine")
            dugme.onclick = (ev) => this.PromeniPadavine(this.grad.naziv, this.mesec, input.value);
        if (tip == "Suncani dani")
            dugme.onclick = (ev) => this.PromeniDane(this.grad.naziv, this.mesec, input.value);

        Forma.appendChild(dugme);
    }

    PromeniTemperaturu(grad, mesec, novaVrednost) {
        fetch("https://localhost:5001/MetPodatak/PromeniTemperaturu/" + grad + "/" + mesec + "/" + novaVrednost, {
            method: 'PUT',
            body: JSON.stringify({
                "nazivGrada": grad,
                "mesec": mesec,
                "novaTemperatura": novaVrednost
            })
        }).then(Response => {

            let Div = document.querySelector("." + this.grad.naziv);
            this.removeAllChildNodes(Div);
            this.grad.crtaj(Div);
        });
    }

    PromeniTemperaturuJS(grad, mesec, novaVrednost) {
        this.grad.podaci.forEach(P => {

            if (P.mesec === mesec) {
                P.temperatura = novaVrednost;
            }
        });

        let Div = document.querySelector("." + this.grad.naziv);
        this.removeAllChildNodes(Div);
        this.grad.crtaj(Div);
    }
}
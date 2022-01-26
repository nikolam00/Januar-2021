import { Grad } from "./Grad.js";
import { Podatak } from "./Podaci.js";

var Podaci = [];

var Leskovac = new Grad(1, "Leskovac", 45, 45, Podaci);

var Januar = new Podatak(1, 5, 40, 2, "Jan", Leskovac);
var Februar = new Podatak(2, 8, 30, 5, "Feb", Leskovac);

var Jul = new Podatak(3, 29, 10, 25, "Jul", Leskovac);


Leskovac.podaci.push(Januar);
Leskovac.podaci.push(Februar);
Leskovac.podaci.push(Jul);

Leskovac.crtaj(document.body);
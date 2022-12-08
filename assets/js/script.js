const getViewportWidth = () => window.innerWidth || document.documentElement.clientWidth;

console.log(`Die Viewport-Breite beträgt: ${getViewportWidth()} Pixel.`);

if( getViewportWidth() < screen.width*0.3) {
    alert("Achtung Achtung Sie verlassen den gesicherten Bereich");
}

function Podcast( titel, beschreibung, autor, besitzerName, besitzerEmail, bildUrl, feedUrl, kategorien ){
    this.titel = titel,
    this.beschreibung = beschreibung,
    this.autor = autor,
    this.besitzerName = besitzerName,
    this.besitzerEmail = besitzerEmail,
    this.bildUrl = bildUrl,
    this.feedUrl = feedUrl,
    this. kategorien = kategorien,
    this.letztesUpdate = new Date();    //Fragen ob Date Objekt oder Zeit und Datum als String gespeichert werden soll?
}

let lnp = new Podcast("LNP", "Voll toller Podcast", "Tim", "Tim Pritlove", "pritlove@lnp.de", "www.help.com", "feedme.de", ["Politk", "Netgedöns"]);
console.log(lnp);
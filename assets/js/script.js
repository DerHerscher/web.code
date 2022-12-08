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

function Episode(titel, beschreibung, dauer){
    this.titel = titel,
    this.beschreibung = beschreibung,
    this.dauer = dauer,
    this.datum = new Date();
}

//Funktion für Objekt Episode
Episode.prototype.getDauerInStundenUndMinuten = function() {
    let min = Math.floor((this.dauer/1000)/60);
    let h = Math.floor(((this.dauer/1000)/60)/60);
    min = min - (h*60);
    return `${h}h ${min}min`;
}

function EpisodeAudio(url, groesse, typ, episode){
    this.url = url,
    this.groesse = groesse,
    this.typ = typ;
    this.episode = episode;
}

let folge100 = new Episode("Dönnerstag am Mittwoch", "Achtung der Dönerstag wurde verlegt", 5880000 );
let folge100Datei = new EpisodeAudio("www.audio.datei/daei", 48987, "mp3", folge100);
console.log(folge100);
console.log(folge100.getDauerInStundenUndMinuten());
console.log(folge100Datei);
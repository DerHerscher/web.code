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
    this.letztesUpdate = new Date(),    //Fragen ob Date Objekt oder Zeit und Datum als String gespeichert werden soll?
    this.episoden = [];
}

//Add Funktion für Podcast
Podcast.prototype.addEpisode = function(episode) {
    this.episoden.push(episode);
    this.episoden.sort( (a, b) => b.datum - a.datum );  //Sortieren hat keine Auswirkung, weil Objekte immer zur gleichen Zeit erstellt werden. Bei der Berechnung werden keine ms mit einbezogen nur ms.
}


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

//Beispiel Objekte und Ausgaben
let lage = new Podcast("Lage der Nation", "Ein Politik Podcast", "Ulf Burmeyer", "Phillip Banse","support@lagedernation.org","assets/img/2560px-Lage_der_Nation_Logo.svg","feed.com",["Politk","news"]);
let lnp = new Podcast("LNP", "Voll toller Podcast", "Tim", "Tim Pritlove", "pritlove@lnp.de", "www.help.com", "feedme.de", ["Politk", "Netgedöns"]);

let folge306 = new Episode("Lage der Nation 306", "Putins Eskalation, Gas-Pipelines explodiert, Proteste im Iran (Interview Gilda Sahebi, taz), 200 Mrd. für Energiehilfen, Energiemarkt der Zukunft (Interview Lion Hirth, Hertie School), Umgang mit Bad News", 4980000);
let folge307 = new Episode("Lage der Nation 307", "49-Euro-Ticket, AKW-Streit, Niedersachsen-Wahl, Strategie für die FDP, russischer Staatsterror, Risiko eines Atomwaffeneinsatzes399", 5880000);
lage.addEpisode(folge306)
lage.addEpisode(folge307);

let folge100 = new Episode("Dönnerstag am Mittwoch", "Achtung der Dönerstag wurde verlegt", 14460000);
let folge101 = new Episode("Dönerstag wieder am Donnerstag", "Blah", 5880000)
lnp.addEpisode(folge101);
lnp.addEpisode(folge100);

let podcastArray = [lage, lnp];

podcastArray.forEach( pod => {
    console.log(`${pod.titel}:`);
    pod.episoden.forEach( epi => {
        console.log(`\t ${epi.titel}: (${epi.getDauerInStundenUndMinuten()})`);
    });
});


// console.log(lnp);
// let folge100Datei = new EpisodeAudio("www.audio.datei/daei", 48987, "mp3", folge100);
// console.log(folge100);
// console.log(folge100.getDauerInStundenUndMinuten());
// console.log(folge100Datei);
// console.log(lnp.episoden);
const getViewportWidth = () => window.innerWidth || document.documentElement.clientWidth;

console.log(`Die Viewport-Breite beträgt: ${getViewportWidth()} Pixel.`);

if( getViewportWidth() < screen.width*0.3) {
    alert("Achtung Achtung Sie verlassen den gesicherten Bereich");
}

function Podcast( titel, beschreibung, autor, besitzerName, besitzerEmail, bildUrl, feedUrl, kategorien, datum ){
    this.titel = titel,
    this.beschreibung = beschreibung,
    this.autor = autor,
    this.besitzerName = besitzerName,
    this.besitzerEmail = besitzerEmail,
    this.bildUrl = bildUrl,
    this.feedUrl = feedUrl,
    this.kategorien = kategorien,       
    this.letztesUpdate = datum,   //Datumsobjekt soll übergeben werden. Nicht zur Laufzeit erstellt.
    this.episoden = [];
}

//Add Funktion für Podcast
Podcast.prototype.addEpisode = function(episode) {
    this.episoden.push(episode);
    this.episoden.sort( (a, b) => b.datum - a.datum );
}                                   


function Episode(titel, beschreibung, dauer, datum){
    this.titel = titel,
    this.beschreibung = beschreibung,
    this.dauer = dauer,
    this.datum = datum,
    this.audioFile = this.audioFile; //Komposition zu EpisodeAudio
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


//------------------------------------------------------------------------------------------------------------------------------------
//Beispiel Objekte und Ausgaben
let lage = new Podcast("Lage der Nation",
                        "Der Politik-Podcast aus Berlin mit Phillip Banse und Ulf Buermeyer ",
                        "Phillip Banse, Ulf Buermeyer",
                        "Phillip Banse",
                        "support@lagedernation.org",
                        "assets/img/2560px-Lage_der_Nation_Logo.svg",
                        "podcast.html",
                        ["Politk","news"],
                         new Date("1999-10-04T03:24:00"));

let lnp = new Podcast("LNP",
                        "Logbuch:Netzpolitik ist ein wöchentlicher Podcast über das netzpolitische Geschehen mit Linus Neumann und Tim Pritlove.",
                        "Tim Pritlove, Linus Neumann",
                        "Tim Pritlove",
                        "lnp@metaebene.me",
                        "assets/img/logbuchnetzpolitik.jpeg",
                        "https://logbuch-netzpolitik.de/feed/m4a",
                        ["Politk", "Netgedöns"],
                        new Date("1995-12-17T03:24:00"));

let chaosradio = new Podcast("Chaosradio",
                        "In Chaosradio besprechen Menschen aus dem CCC und seinem Umfeld seit 1995 jeden Monat technische und gesellschaftliche Themen.",
                        "Marcus Richter",
                        "Chaos Computer Club",
                        "chaosradio@ccc.de",
                        "assets/img/chaosradio_500x.png",
                        "https://chaosradio.de/feed/m4a",
                        ["Politk", "Netzgedöns"],
                        new Date("1992-11-14T14:12:23"));

let folge306 = new Episode("Lage der Nation 306", "Putins Eskalation, Gas-Pipelines explodiert, Proteste im Iran (Interview Gilda Sahebi, taz), 200 Mrd. für Energiehilfen, Energiemarkt der Zukunft (Interview Lion Hirth, Hertie School), Umgang mit Bad News", 4980000,new Date("2020-12-17T03:24:00"));
let folge307 = new Episode("Lage der Nation 307", "49-Euro-Ticket, AKW-Streit, Niedersachsen-Wahl, Strategie für die FDP, russischer Staatsterror, Risiko eines Atomwaffeneinsatzes399", 5880000,new Date("2022-02-01T03:24:00"));
lage.addEpisode(folge306)
lage.addEpisode(folge307);

let folge100 = new Episode("Dönnerstag am Mittwoch", "Achtung der Dönerstag wurde verlegt", 14460000);
let folge101 = new Episode("Dönerstag wieder am Donnerstag", "Blah", 5880000)
lnp.addEpisode(folge101);
lnp.addEpisode(folge100);

let podcastArray = [lage, lnp, chaosradio];

podcastArray.forEach( pod => {
    console.log(`${pod.titel} (Letztes Update: ${pod.letztesUpdate}):`);
    pod.episoden.forEach( epi => {
        console.log(`\t ${epi.titel}: (${epi.getDauerInStundenUndMinuten()})`);
    });
});
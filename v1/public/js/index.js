//Function to ask api for fresh data
let getData = async function(){
  const response = await fetch("http://localhost:8020/api");
  return await response.json();
}

let showList = async function() {
  //Replace Content and change alignment
  document.querySelector("#podcastboxen").replaceWith(await generateList());
  document.querySelector("#podcastboxen").style.justifyContent = "left"

  //Change Button
  let neu = document.querySelector("#ansichtWechsel");
  neu.value = "Kachelansicht";
  neu.removeEventListener("click", showList);
  neu.addEventListener("click", showBoxes);
}

let showBoxes = async function() {
  //Replace Content and change alignment
  document.querySelector("#podcastboxen").replaceWith( await generateBoxes());
  document.querySelector("#podcastboxen").style.justifyContent = "space-evenly"
    
  //Change Button
  let neu = document.querySelector("#ansichtWechsel");
  neu.value = "Listenansicht";
  neu.removeEventListener("click", showBoxes);
  neu.addEventListener("click", showList);
}


let generateList = async function() {
  //Get Data from API
  let apiDaten = await getData();

  //generate same div to replace it
  let div = document.createElement("div");
  div.id = "podcastboxen";
  //Create unorderd list
  let ul =document.createElement("ul");

    //Create List Items
    for (let i = 0; i < apiDaten.length; i++){
      //create list Item Obejct
      let li = document.createElement("li");
      //create a Element
      let a = document.createElement("a");
      a.href = `/podcast?pc=${i}`;
      a.textContent = apiDaten[i].titel;
      //Create p element
      let p = document.createElement("p");
      p.textContent = `Akutelle Episode: ${apiDaten[i].episoden.length}`
      //Add to list Element and add list element to list
      li.append(a, p);
      ul.append(li);
    }
    //Append list to div and return
    div.append(ul)
    return div;
}

let generateBoxes = async function() {
  //Get Data from API
  let apiDaten = await getData();

  //generate same div to replace it
  let div = document.createElement("div");
  div.id = "podcastboxen";

  for (let i=0; i < apiDaten.length; i++){
    let fig = document.createElement("figure");
    let br = document.createElement("br");
    //Create Link
    let a = document.createElement("a");
    a.href = `/podcast?pc=${i}`;
    a.textContent = apiDaten[i].titel;
    //Create img
    let img = document.createElement("img");
    img.src = apiDaten[i].bildUrl;
    img.width = "150"
    img.heigth = "100"
    img.alt = `Logo ${apiDaten[i].titel}`
    //Add Figures
    a.append(br, img)
    fig.append(a);
    div.append(fig);
  }
  return div;
}

window.onload = showBoxes();
document.querySelector("#ansichtWechsel").addEventListener("click", showList);
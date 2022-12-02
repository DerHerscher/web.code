const getViewportWidth = () => window.innerWidth || document.documentElement.clientWidth;

console.log(`Die Viewport-Breite beträgt: ${getViewportWidth()} Pixel.`);

if( getViewportWidth() < screen.width*0.3) {
    alert("Achtung Achtung Sie verlassen den gesicherten Bereich");
}
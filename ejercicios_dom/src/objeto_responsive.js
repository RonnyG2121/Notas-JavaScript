const d = document,
    w = window;

export default function generateMediaResponsive(element="", mQuery="", contentMovile="", contentDesktop="") {
    const breakPoint = w.matchMedia(mQuery);
    const responsive = (e) => {
        if (e.matches) {
            d.getElementById(element).innerHTML = contentDesktop;

        } else {
            d.getElementById(element).innerHTML = contentMovile;
        }

        //console.log(e.matches);
    }
    breakPoint.addEventListener("change", responsive);
    responsive(breakPoint);
    //console.log(breakPoint);
}
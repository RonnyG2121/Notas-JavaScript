const d = document, n = navigator;


export default function webCam(idWebCam="") {
    const videoCam = d.getElementById(idWebCam);
    if (n.mediaDevices.getUserMedia) {
        n.mediaDevices.getUserMedia({
            video: true,
            audio: true
        })
            .then((stream) => {
                console.info(stream);
                videoCam.srcObject = stream;
                videoCam.play();
            })
            .catch((error) => {
                videoCam.insertAdjacentHTML("beforebegin", `<div><mark>Permite el acceso a la cámara y al micrófono para poder usarlos</mark></div>`);
            });
    }

}

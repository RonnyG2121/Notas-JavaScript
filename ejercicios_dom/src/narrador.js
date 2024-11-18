const d = document,
    w = window;


export default function narradora() {
    const btn_hablar = d.querySelector("#btn_hablar"),
        text_hablar = d.querySelector("#id_text"),
        seleccion = d.querySelector("#speech_select");
    const speech_mensaje = new SpeechSynthesisUtterance();
    let voces = [];
    d.addEventListener("DOMContentLoaded", () => {
        w.speechSynthesis.addEventListener("voiceschanged", (ev) => {
            voces = speechSynthesis.getVoices();
            console.info(voces);
            voces.forEach((v) => {
                let opciones = d.createElement("option");
                opciones.value = v.name;
                opciones.textContent = v.name + " - " + v.lang;
                seleccion.appendChild(opciones);
            });

            seleccion.addEventListener("change", (e) => {
                    const seleccion_voces = voces.find((voz) => {
                        if (voz.name === e.target.value) {
                            speech_mensaje.voice = voz;
                        }
                    });
                    //console.info(speech_mensaje);

            });

        });


        btn_hablar.addEventListener("click", (e) => {
            speech_mensaje.text = text_hablar.value;
            w.speechSynthesis.speak(speech_mensaje);
        });
    });
}
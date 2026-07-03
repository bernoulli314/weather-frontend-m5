document.addEventListener("DOMContentLoaded", ()=>{

    const parametros =
    new URLSearchParams(
        window.location.search
    );

    const id = parametros.get("id");


    const planeta = todosLosPlanetas.find(p=>p.id===id);

    const detalle = document.getElementById("detalle_planeta");
    const contenedor = document.getElementById("contenedor_tiempo_semanal");
    const zona_img = document.getElementById("img_planeta")

    let estadisticasPlaneta = (pronostico) => {
        let suma = 0;
        let max = parseInt(pronostico[0].temp);
        let min = parseInt(pronostico[0].temp);

        for (const dia of pronostico) {
            let temperatura = parseInt(dia.temp);

            suma += temperatura;

            if (temperatura > max){
                max = temperatura
            }
            if (temperatura < min){
                min = temperatura
            }
        }

        return {
            promedio: Math.round((suma / pronostico.length) * 100) / 100,
            tmax: max,
            tmin: min
        };
    };

    let estadisticas = estadisticasPlaneta(planeta.pronostico);

    console.log(estadisticas.promedio);
    console.log(estadisticas.tmax);
    console.log(estadisticas.tmin);


    if(planeta){

        zona_img.innerHTML=`
        <img
        max-width: 300px;
        height: auto;
        src="${planeta.imagen_url}"
        class="card-img-top"
        alt="${planeta.nombre}"
        >
        `

        detalle.innerHTML=`

        <h1 class="weather-content__titulo">

            ${planeta.icono}
            ${planeta.nombre}

        </h1>

        <p class="weather-content__texto">
            💧 Humedad:
            ${planeta.humedad}
        </p>

        <p class="weather-content__texto">
            💨 Viento:
            ${planeta.viento}
        </p>

        <p class="weather-content__texto">
            ⚖️ Gravedad:
            ${planeta.gravedad}
        </p>

        <p class="weather-content__texto">
            🪨 Composición:
            ${planeta.composicion}
        </p>

        <p class="weather-content__texto">

            ${planeta.descripcion}

        </p>

        `;


        planeta.pronostico.forEach(
        dia=>{

            const card=`

            <div class="col">

                <div class="card h-100 place-card">

                    <div class="card-body text-center place-card__body">

                        <h3 class="place-card__name">
                            ${dia.dia}
                        </h3>

                        <div class="display-4 place-card__icon">
                            ${dia.icono}
                        </div>

                        <h4 class="place-card__temp">
                            ${dia.temp}
                        </h4>

                        <p class="place-card__status">
                            ${dia.estado}
                        </p>

                    </div>

                </div>

            </div>

            `;

            contenedor.insertAdjacentHTML(
                "beforeend",
                card
            );

        });

    }

});
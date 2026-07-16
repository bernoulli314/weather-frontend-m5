import {
    planetas_ss,
    exoplanetas,
    todosLosPlanetas,
    planetasActuales
} from "./utils/datos.js";

import WeatherApp from "./classes/WeatherApp.js";
const app = new WeatherApp();


document.addEventListener("DOMContentLoaded", ()=>{

    const parametros =
    new URLSearchParams(
        window.location.search
    );

    const id = parametros.get("id");


    const planeta = todosLosPlanetas.find(p=>p.id===id);

    const detalle = document.getElementById("detalle_planeta");
    const contenedor = document.getElementById("contenedor_tiempo_semanal");
    const contenedor_estadisticas = document.getElementById("estadisticas_ciudad");
    const contenedor_alertas = document.getElementById("alertas_ciudad");
    const zona_img = document.getElementById("img_planeta")

    let estadisticasPlaneta = (pronostico) => {
        return {
            promedio: 15,
            tmax: 57,
            tmin: -90
        };
    };

    let estadisticas = estadisticasPlaneta(planeta.pronostico);

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

        <div class="estadisticas-temp">

            <div class="row g-3">

                <div class="col-md-4">
                    <div class="place-card text-center">
                        <div class="card-body">
                            <h4>🌡️ Promedio</h4>
                            <h2>${estadisticas.promedio} °C</h2>
                        </div>
                    </div>
                </div>

                <div class="col-md-4">
                    <div class="place-card text-center">
                        <div class="card-body">
                            <h4>🔺 Máxima</h4>
                            <h2>${estadisticas.tmax} °C</h2>
                        </div>
                    </div>
                </div>

                <div class="col-md-4">
                    <div class="place-card text-center">
                        <div class="card-body">
                            <h4>🔻 Mínima</h4>
                            <h2>${estadisticas.tmin} °C</h2>
                        </div>
                    </div>
                </div>

            </div>

        </div>


        `;

        const botonBuscar = document.getElementById("btn-buscar");

        botonBuscar.addEventListener("click", async () => {

            const ciudad = document.getElementById("ciudad").value;
            const pais = document.getElementById("pais").value;

            try {
                const resultado = await app.buscarCiudad(ciudad, pais);

                let climaActual = resultado.climaActual;
                let pronostico = resultado.pronostico;
                let estadisticas = resultado.estadisticas;
                let alertas = resultado.alertas;

                console.log(alertas);

                contenedor.innerHTML = "";

                pronostico.forEach(dia => {

                    const nombreDia = new Date(dia.fecha)
                        .toLocaleDateString("es-CL", {
                            weekday: "long"
                        });

                    const card = `

                    <div class="col">

                        <div class="card h-100 place-card">

                            <div class="card-body text-center place-card__body">

                                <h4 class="place-card__name">
                                    ${nombreDia}
                                </h4>

                                <div class="display-4 place-card__icon">
                                    ${dia.icono}
                                </div>

                                <h4 class="place-card__temp">
                                    🌡️max: ${dia.maxima}°C / min: ${dia.minima}°C
                                </h4>

                                <p class="place-card__status">
                                    ${dia.estado}
                                </p>

                            </div>

                        </div>

                    </div>

                    `;

                    contenedor.insertAdjacentHTML("beforeend", card);

                });

                contenedor_estadisticas.innerHTML = `

                <div class="row row-cols-1 row-cols-md-3 g-4">

                    <div class="col">
                        <div class="card h-100 place-card text-center">
                            <div class="card-body">
                                <h4>🌡️ Promedio</h4>
                                <h2>${estadisticas.promedio} °C</h2>
                            </div>
                        </div>
                    </div>

                    <div class="col">
                        <div class="card h-100 place-card text-center">
                            <div class="card-body">
                                <h4>🔺 Máxima</h4>
                                <h2>${estadisticas.maxima} °C</h2>
                            </div>
                        </div>
                    </div>

                    <div class="col">
                        <div class="card h-100 place-card text-center">
                            <div class="card-body">
                                <h4>🔻 Mínima</h4>
                                <h2>${estadisticas.minima} °C</h2>
                            </div>
                        </div>
                    </div>

                </div>

                `;
                
                contenedor_alertas.innerHTML = `

                <div class="card place-card">

                    <div class="card-body">

                        <h4 class="mb-3">🚨 Alertas meteorológicas</h4>

                        ${alertas.map(alerta => `
                            <p class="mb-2">${alerta}</p>
                        `).join("")}

                    </div>

                </div>

                `;

            } catch (error) {
                alert(error.message);
            }

        });


        
    }

});
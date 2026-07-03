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

        let diasCongelados = 0;
        let diasHabitables = 0;
        let diasVolcanicos = 0;
        let diasEstelares = 0;
        let diasPlasma = 0;

        for (const dia of pronostico) {
            let temperatura = parseInt(dia.temp);

            suma += temperatura;

            if (temperatura > max){
                max = temperatura
            }
            if (temperatura < min){
                min = temperatura
            }
            if (temperatura <= -5){
                diasCongelados++;
            }
            if (-5 < temperatura && temperatura <= 100){
                diasHabitables++;
            }
            if (100 < temperatura && temperatura <= 2000){
                diasVolcanicos++;
            }
            if (2000 < temperatura && temperatura <= 6000){
                diasEstelares++;
            }
            if (6000 < temperatura){
                diasPlasma++;
            }
        }

        const categorias = {
            "Temperaturas donde predominan hielos, océanos congelados y atmósferas extremadamente frías": diasCongelados,
            "Zona compatible con agua líquida y condiciones similares a las de la Tierra.": diasHabitables,
            "Rocas incandescentes, volcanismo extremo y ambientes incompatibles con la vida terrestre.": diasVolcanicos,
            "Temperaturas comparables a las superficies de muchas estrellas, donde la materia comienza a comportarse de formas extremas.": diasEstelares,
            "Materia completamente ionizada, radiación intensa y condiciones propias de estrellas muy calientes y fenómenos energéticos.": diasPlasma
        };

        let categoriaMayor = "";
        let mayor = -1;

        for (const categoria in categorias) {

            if (categorias[categoria] > mayor) {
                mayor = categorias[categoria];
                categoriaMayor = categoria;
            }

        }

        return {
            promedio: Math.round((suma / pronostico.length) * 100) / 100,
            tmax: max,
            tmin: min,
            diasCongelados: diasCongelados,
            diasHabitables: diasHabitables,
            diasVolcanicos: diasVolcanicos,
            diasEstelares: diasEstelares,
            diasPlasma: diasPlasma,
            resumen: categoriaMayor
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
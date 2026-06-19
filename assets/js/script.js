document.addEventListener("DOMContentLoaded", () => {
    const contenedor = document.getElementById("contenedor_planetas");

    const botonSS = document.querySelector(".btn-ss");
    const botonExo = document.querySelector(".btn-exo");

    function mostrarPlanetas(lista){

            // limpiar cards anteriores

            contenedor.innerHTML="";

            lista.forEach(planeta=>{

                const card = `

                <div class="col">

                    <div class="card h-100 place-card">

                        <div class="card-body place-card__body">

                            <h5 class="place-card__name">

                                ${planeta.nombre}

                            </h5>

                            <div class="icono-planeta place-card__icon">

                                ${planeta.icono}

                            </div>

                            <div class="temperatura place-card__temp">

                                ${planeta.temp}

                            </div>

                            <p class="estado place-card__status">

                                ${planeta.estado}

                            </p>

                            <a
                            href="detalle.html?id=${planeta.id}"
                            class="btn btn-outline-info place-card__link">

                                Ver detalle

                            </a>

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
    mostrarPlanetas(planetasActuales);

    botonSS.addEventListener(
            "click",
            ()=>{

                planetasActuales =
                planetas_ss;

                mostrarPlanetas(
                    planetasActuales
                );

            }
        );


    botonExo.addEventListener(
            "click",
            ()=>{

                planetasActuales =
                exoplanetas;

                mostrarPlanetas(
                    planetasActuales
                );

            }
        );

    document.getElementById("buscar").addEventListener("keyup", function () {

        const texto = this.value.toLowerCase();

        const filtrados = planetasActuales.filter(
            p =>p.nombre.toLowerCase().includes(texto)
        );

        mostrarPlanetas(filtrados);
    });

});

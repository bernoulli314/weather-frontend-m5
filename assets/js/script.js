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

                    <div class="card h-100">

                        <div class="card-body">

                            <h5>

                                ${planeta.nombre}

                            </h5>

                            <div class="icono-planeta">

                                ${planeta.icono}

                            </div>

                            <div class="temperatura">

                                ${planeta.temp}

                            </div>

                            <p class="estado">

                                ${planeta.estado}

                            </p>

                            <a
                            href="detalle.html?id=${planeta.id}"
                            class="btn btn-outline-info">

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

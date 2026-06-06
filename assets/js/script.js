const planetas_ss = [

    {
        nombre:"Mercurio",
        temp:"430°C",
        estado:"Calor extremo",
        icono:"🔥"
    },

    {
        nombre:"Venus",
        temp:"465°C",
        estado:"Tormenta ácida",
        icono:"☁️"
    },

    {
        nombre:"La Tierra",
        temp:"15°C",
        estado:"Despejado",
        icono:"☀️"
    },

    {
        nombre:"Marte",
        temp:"-63°C",
        estado:"Tormenta de polvo",
        icono:"🌪️"
    },

    {
        nombre:"Júpiter",
        temp:"-145°C",
        estado:"Tormenta gigante",
        icono:"⛈️"
    },

    {
        nombre:"Saturno",
        temp:"-178°C",
        estado:"Vientos intensos",
        icono:"💨"
    },

    {
        nombre:"Urano",
        temp:"-224°C",
        estado:"Frío extremo",
        icono:"❄️"
    },

    {
        nombre:"Neptuno",
        temp:"-214°C",
        estado:"Vientos supersónicos",
        icono:"🌬️"
    },

    {
        nombre:"Plutón*",
        temp:"-229°C",
        estado:"Nieve de nitrógeno",
        icono:"❄️"
    },

    {
        nombre:"Ceres*",
        temp:"-105°C",
        estado:"Superficie helada",
        icono:"🧊"
    },

    {
        nombre:"Haumea*",
        temp:"-241°C",
        estado:"Hielo cristalino",
        icono:"🧊"
    },

    {
        nombre:"Makemake*",
        temp:"-239°C",
        estado:"Escarcha espacial",
        icono:"❄️"
    },

    {
        nombre:"Eris*",
        temp:"-243°C",
        estado:"Invierno eterno",
        icono:"🌌"
    }

];

const exoplanetas = [

    {
        nombre:"Proxima Centauri b",
        temp:"-39°C",
        estado:"Frío rocoso",
        icono:"❄️"
    },

    {
        nombre:"Kepler-22b",
        temp:"22°C",
        estado:"Posible zona habitable",
        icono:"🌎"
    },

    {
        nombre:"TRAPPIST-1e",
        temp:"-22°C",
        estado:"Posible océano helado",
        icono:"🧊"
    },

    {
        nombre:"51 Pegasi b",
        temp:"1200°C",
        estado:"Gigante gaseoso ardiente",
        icono:"🔥"
    },

    {
        nombre:"HD 209458 b (Osiris)",
        temp:"1000°C",
        estado:"Atmósfera evaporándose",
        icono:"☄️"
    }

];

const todosLosPlanetas = [
    ...planetas_ss,
    ...exoplanetas
];

const contenedor =
document.getElementById("contenedor_planetas");

todosLosPlanetas.forEach(ciudad=>{

    contenedor.innerHTML += `

    <div class="col">

        <div class="card text-center h-100">

            <div class="card-body">

                <h5>${ciudad.nombre}</h5>

                <div class="display-3">
                    ${ciudad.icono}
                </div>

                <h3>${ciudad.temp}</h3>

                <p>${ciudad.estado}</p>

                <a href="detalle.html?ciudad=${ciudad.nombre}"
                   class="btn btn-primary">

                    Ver detalle

                </a>

            </div>

        </div>

    </div>
    
    `
});
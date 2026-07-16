import ApiClient from "../api/ApiClient.js";

class WeatherApp {

    constructor() {
        this.api = new ApiClient();
    }

    async buscarCiudad(nombreCiudad, nombrePais) {

        try {

            const ciudad = await this.api.buscarCiudad(nombreCiudad, nombrePais
            );

            const clima = await this.api.obtenerClima(ciudad.latitud, ciudad.longitud
            );

            const estadisticas = this.calcularEstadisticas(clima);

            return {

                ciudad,
                climaActual: this.obtenerClimaActual(clima),
                pronostico: this.obtenerPronostico(clima),
                estadisticas,
                alertas: this.obtenerAlertas(estadisticas)

            };

        } catch (error) {

            console.error(error);
            throw error;

        }

    }

    calcularEstadisticas(datosClima) {

        const maximas = datosClima.daily.temperature_2m_max;
        const minimas = datosClima.daily.temperature_2m_min;
        const codigos = datosClima.daily.weather_code;

        const promedios = [];

        for (let i = 0; i < maximas.length; i++) {
            promedios.push(
                (maximas[i] + minimas[i]) / 2
            );
        }

        let suma = 0;

        for (const temperatura of promedios) {
            suma += temperatura;
        }

        const promedio = suma / promedios.length;
        const maxima = Math.max(...maximas);
        const minima = Math.min(...minimas);

        let diasSoleados = 0;
        let diasLluviosos = 0;

        for (const codigo of codigos) {

            if (codigo === 0) {
                diasSoleados++;
            }

            if (codigo >= 61 && codigo <= 65) {
                diasLluviosos++;
            }

        }

        return {

            promedio: promedio.toFixed(1),
            maxima,
            minima,
            diasSoleados,
            diasLluviosos

        };

    }

    obtenerDescripcionClima(codigo) {

        switch (codigo) {

            case 0:
                return { descripcion: "Despejado", icono: "☀️" };

            case 1:
                return { descripcion: "Mayormente despejado", icono: "🌤️" };

            case 2:
                return { descripcion: "Parcialmente nublado", icono: "⛅" };

            case 3:
                return { descripcion: "Nublado", icono: "☁️" };

            case 48:
                return { descripcion: "Niebla", icono: "🌫️" };

            case 51:
                return { descripcion: "Llovizna ligera", icono: "🌦️" };

            case 53:
                return { descripcion: "Llovizna moderada", icono: "🌦️" };

            case 55:
                return { descripcion: "Llovizna intensa", icono: "🌧️" };

            case 56:
                return { descripcion: "Llovizna helada ligera", icono: "🥶" };

            case 57:
                return { descripcion: "Llovizna helada intensa", icono: "🧊" };

            case 61:
                return { descripcion: "Lluvia ligera", icono: "🌦️" };

            case 63:
                return { descripcion: "Lluvia moderada", icono: "🌧️" };

            case 65:
                return { descripcion: "Lluvia intensa", icono: "🌧️" };

            case 66:
                return { descripcion: "Lluvia helada ligera", icono: "🥶" };

            case 67:
                return { descripcion: "Lluvia helada intensa", icono: "🧊" };

            case 71:
                return { descripcion: "Nevada ligera", icono: "🌨️" };

            case 73:
                return { descripcion: "Nevada moderada", icono: "❄️" };

            case 75:
                return { descripcion: "Nevada intensa", icono: "❄️" };

            case 77:
                return { descripcion: "Granos de nieve", icono: "🧊" };

            case 80:
                return { descripcion: "Chubascos ligeros", icono: "🌦️" };

            case 81:
                return { descripcion: "Chubascos moderados", icono: "🌧️" };

            case 82:
                return { descripcion: "Chubascos intensos", icono: "⛈️" };

            case 85:
                return { descripcion: "Nevadas intermitentes", icono: "🌨️" };

            case 86:
                return { descripcion: "Nevadas intensas", icono: "❄️" };

            case 95:
                return { descripcion: "Tormenta eléctrica", icono: "⛈️" };

            case 96:
                return { descripcion: "Tormenta con granizo ligero", icono: "⛈️🧊" };

            case 99:
                return { descripcion: "Tormenta con granizo intenso", icono: "🌩️🧊" };

            default:
                return { descripcion: "Condición desconocida", icono: "❓" };

        }

    }

    obtenerClimaActual(datosClima) {

        return {

            temperatura: datosClima.current.temperature_2m,
            estado: this.obtenerDescripcionClima(
                datosClima.current.weather_code
            )

        };

    }

    obtenerPronostico(datosClima) {

        const pronostico = [];

        const dias = datosClima.daily.time;
        const maximas = datosClima.daily.temperature_2m_max;
        const minimas = datosClima.daily.temperature_2m_min;
        const codigos = datosClima.daily.weather_code;

        for (let i = 0; i < dias.length; i++) {

            pronostico.push({

                fecha: dias[i],
                maxima: maximas[i],
                minima: minimas[i],
                estado: this.obtenerDescripcionClima(codigos[i]).descripcion,
                icono: this.obtenerDescripcionClima(codigos[i]).icono

            });

        }

        return pronostico;

    }

    obtenerAlertas(estadisticas) {

        const alertas = [];

        if (estadisticas.promedio > 30) {
            alertas.push("🔥 Alerta de calor.");
        }

        if (estadisticas.diasLluviosos >= 3) {
            alertas.push("🌧️ Semana lluviosa.");
        }

        if (alertas.length === 0) {
            alertas.push("✅ No existen alertas meteorológicas.");
        }

        return alertas;

    }

}

export default WeatherApp;
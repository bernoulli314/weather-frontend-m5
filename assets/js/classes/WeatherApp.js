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
                climaActual: this.obtenerClimaActual(ciudad, clima),
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
                return "Despejado";

            case 1:
                return "Mayormente despejado";

            case 2:
                return "Parcialmente nublado";

            case 3:
                return "Nublado";

            case 61:
                return "Lluvia ligera";

            case 63:
                return "Lluvia moderada";

            case 65:
                return "Lluvia intensa";

            default:
                return "No disponible";

        }

    }

    obtenerClimaActual(ciudad, datosClima) {

        return {

            ciudad: ciudad.nombre,
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
                estado: this.obtenerDescripcionClima(codigos[i])

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
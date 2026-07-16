class ApiClient {

    constructor() {
        this.geoUrl = "https://geocoding-api.open-meteo.com/v1";
        this.weatherUrl = "https://api.open-meteo.com/v1";
    }

    async buscarCiudad(nombreCiudad, nombrePais) {

        const url = `${this.geoUrl}/search?name=${encodeURIComponent(nombreCiudad)}&country=${encodeURIComponent(nombrePais)}&count=1&language=es&format=json`;

        const respuesta = await fetch(url);

        if (!respuesta.ok) {
            throw new Error("No se pudo conectar con la API.");
        }

        const datos = await respuesta.json();

        if (!datos.results || datos.results.length === 0) {
            throw new Error("No se encontró la ciudad.");
        }

        return {
            ciudad: datos.results[0].name,
            pais: datos.results[0].country,
            latitud: datos.results[0].latitude,
            longitud: datos.results[0].longitude
        };

    }

    async obtenerClima(latitud, longitud) {
        
        const url = `${this.weatherUrl}/forecast?latitude=${latitud}&longitude=${longitud}&current=temperature_2m,weather_code&daily=weather_code,temperature_2m_max,temperature_2m_min,precipitation_sum&timezone=auto`;

        const respuesta = await fetch(url);

        if (!respuesta.ok) {
            throw new Error("No se pudo obtener información del clima.");
        }

        const datos = await respuesta.json();

        return datos;
    }

}

export default ApiClient;
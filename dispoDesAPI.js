window.onload = function() {
    const log = document.getElementById('log');

    function logAPI(name, available) {
        const message = `${name} ${available ? 'disponible' : 'non disponible'}`;
        console.log(message);
        log.innerHTML += message + '<br>';
    }

    // Vérification de l'API baromètre
    if ('AmbientLightSensor' in window) {
        logAPI('API Baromètre', true);
    } else {
        logAPI('API Baromètre', false);
    }

    // Vérification de l'API de capteurs de mouvement
    if ('DeviceOrientationEvent' in window) {
        logAPI('API Orientation (DeviceOrientationEvent)', true);
    } else {
        logAPI('API Orientation (DeviceOrientationEvent)', false);
    }

    // Vérification de l'API de mouvement (DeviceMotionEvent)
    if ('DeviceMotionEvent' in window) {
        logAPI('API Mouvement (DeviceMotionEvent)', true);
    } else {
        logAPI('API Mouvement (DeviceMotionEvent)', false);
    }

    // Vérification de l'API de capteur de lumière ambiante
    if ('AmbientLightSensor' in window) {
        logAPI('API Capteur de lumière ambiante', true);
    } else {
        logAPI('API Capteur de lumière ambiante', false);
    }

    // Vérification de l'API de capteur de pression barométrique
    if ('Barometer' in window) {
        logAPI('API Pression Barométrique', true);
    } else {
        logAPI('API Pression Barométrique', false);
    }

    // Vérification de l'API géolocalisation
    if ('geolocation' in navigator) {
        logAPI('API Géolocalisation', true);
    } else {
        logAPI('API Géolocalisation', false);
    }

    // Vérification de l'API de batterie
    if ('getBattery' in navigator) {
        logAPI('API Batterie', true);
    } else {
        logAPI('API Batterie', false);
    }
if ('Barometer' in window) {
    console.log("L'API Baromètre est disponible");
    try {
        let barometer = new Barometer();
        barometer.addEventListener('reading', () => {
            console.log(`Pression atmosphérique : ${barometer.pressure} hPa`);
        });
        barometer.start();
    } catch (e) {
        console.error('Erreur avec l\'API Baromètre:', e);
    }
} else {
    console.log("L'API Baromètre n'est pas disponible sur cet appareil.");
}

}

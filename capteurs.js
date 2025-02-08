document.addEventListener('DOMContentLoaded', (event) => {
    const logElement = document.getElementById('log');

    function logMessage(message) {
        const p = document.createElement('p');
        p.textContent = message;
        logElement.appendChild(p);
    }

    logMessage('Le fichier capteurs.js est chargé.');

if ('AmbientLightSensor' in window) {
    // Capteur disponible
    console.log("Baromètre disponible");
} else {
    console.log("API baromètre pas disponible");
}

    // Vérification de la disponibilité de l'API Baromètre   
if ('getBattery' in navigator) {
    console.log("API baromètre disponible");
} else {
    console.log("API baromètre pas disponible");
}
 
if ('Barometer' in window) {
        logMessage('L\'API Baromètre est disponible.');
        let barometer = new Barometer({ frequency: 60 });
        barometer.addEventListener('reading', () => {
            logMessage(`Baromètre lecture: ${barometer.pressure}`);
        });
        barometer.start();
    } else {
        logMessage('L\'API Baromètre n\'est pas disponible.');
    }
});

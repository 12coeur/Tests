window.onload = function() {
    const log = document.getElementById('log');
    log.style.maxHeight = 'none'; // Supprime la limite de hauteur
    log.style.overflowY = 'auto'; // Permet un défilement si nécessaire
    log.style.minHeight = '50px'; // Assure une hauteur minimale

    let availableCount = 0;
    let blockedCount = 0;
    let unavailableCount = 0;

    function logAPI(name, available, blocked = false, error = null) {
        let message = `${name} ${available ? 'disponible' : (blocked ? 'bloqué par le navigateur' : 'non disponible')}`;
        if (error) {
            message += ` (Erreur: ${error})`;
        }
        console.log(message);
        const p = document.createElement('p');
        p.textContent = message;
        p.style.color = available ? 'darkgreen' : (blocked ? 'red' : 'gray');
        log.appendChild(p);

        if (available) {
            availableCount++;
        } else if (blocked) {
            blockedCount++;
        } else {
            unavailableCount++;
        }
    }

    function testAPI(name, property, object = window) {
        try {
            if (property in object) {
                logAPI(name, true);
            } else {
                logAPI(name, false, false);
            }
        } catch (e) {
            logAPI(name, false, true, e.message);
        }
    }

    testAPI('API Orientation (DeviceOrientationEvent)', 'DeviceOrientationEvent');
    testAPI('API Mouvement (DeviceMotionEvent)', 'DeviceMotionEvent');
    testAPI('API Capteur de lumière ambiante', 'AmbientLightSensor');
    testAPI('API Pression Barométrique', 'Barometer');
    testAPI('API Géolocalisation', 'geolocation', navigator);
    testAPI('API Batterie', 'getBattery', navigator);

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
            logAPI('API Pression Barométrique', false, true, e.message);
        }
    } else {
        console.log("L'API Baromètre n'est pas disponible sur cet appareil.");
    }

    // Afficher le résumé des API disponibles, bloquées et non disponibles
    const summary = document.createElement('p');
    summary.innerHTML = `<strong>Total disponibles:</strong> ${availableCount} | <strong>Total bloqués:</strong> ${blockedCount} | <strong>Total non disponibles:</strong> ${unavailableCount}`;
    log.appendChild(summary);
};

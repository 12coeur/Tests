window.onload = async function() {
    const log = document.getElementById('log');
    log.style.maxHeight = 'none';
    log.style.overflowY = 'auto';
    log.style.minHeight = '50px';

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
    testAPI('API Géolocalisation', 'geolocation', navigator);
    testAPI('API Batterie', 'getBattery', navigator);

    // Vérification et test du Baromètre (Pression Atmosphérique)
    if ('Barometer' in window) {
        try {
            const barometer = new Barometer({ frequency: 1 });

            barometer.addEventListener('reading', () => {
                console.log(`Pression atmosphérique : ${barometer.pressure} hPa`);
                logAPI('API Pression Barométrique', true);
            });

            barometer.addEventListener('error', (event) => {
                console.error('Erreur avec l\'API Baromètre:', event.error.name, event.error.message);
                logAPI('API Pression Barométrique', false, true, event.error.message);
            });

            await barometer.start();
        } catch (e) {
            console.error('Erreur lors du démarrage du baromètre:', e);
            logAPI('API Pression Barométrique', false, true, e.message);
        }
    } else {
        console.log("L'API Baromètre n'est pas disponible sur cet appareil.");
        logAPI('API Pression Barométrique', false);
    }

    // Affichage du résumé des API testées
    const summary = document.createElement('p');
    summary.innerHTML = `<strong>Total disponibles:</strong> ${availableCount} | <strong>Total bloqués:</strong> ${blockedCount} | <strong>Total non disponibles:</strong> ${unavailableCount}`;
    log.appendChild(summary);
};

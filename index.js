
// /mnt/data/public/script.js

document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('convertForm');

    form.onsubmit = async function(event) {
        event.preventDefault();

        // Űrlap adatok lekérése
        const url = document.getElementById('url').value;
        const html = document.getElementById('html').value;

        // Alapvető ellenőrzés
        if (!url && !html) {
            alert('Kérlek adj meg egy URL-t vagy HTML tartalmat.');
            return;
        }

        // Kérés küldése a szervernek
        try {
            const response = await fetch('/convert', {
                method: 'POST',
                body: new FormData(form)
            });
            if (response.ok) {
                const blob = await response.blob();
                const imgURL = URL.createObjectURL(blob);
                window.open(imgURL, '_blank').focus();
            } else {
                alert('A konverzió sikertelen. Kérlek próbáld újra.');
            }
        } catch (error) {
            alert('Hiba történt: ' + error.message);
        }
    };
});

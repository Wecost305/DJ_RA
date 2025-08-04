// El DJ deberá poner la URL completa con el ID del evento aquí
// Ejemplo: https://mi-dj-form.netlify.app/?evento=2025-08-05T14:00:00.000Z
const urlParams = new URLSearchParams(window.location.search );
const eventoId = urlParams.get('evento');

const form = document.getElementById('songRequestForm');
const statusMessage = document.getElementById('status-message');

if (!eventoId) {
    form.style.display = 'none';
    statusMessage.textContent = 'Error: No se ha especificado un evento. Pide al DJ el enlace correcto.';
    statusMessage.style.color = '#ff4500';
}

form.addEventListener('submit', function(event) {
    event.preventDefault();

    const ngrokApiUrl = 'https://TU_URL_DE_NGROK.ngrok-free.app/solicitud';
    const button = document.querySelector('.neon-button' );

    const data = {
        cancion: document.getElementById('cancion').value,
        solicitante: document.getElementById('solicitante').value,
        dedicatoria: document.getElementById('dedicatoria').value,
        evento_id: eventoId // Añadimos el ID del evento
    };

    button.disabled = true;
    button.textContent = 'Enviando...';

    fetch(ngrokApiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    })
    .then(response => {
        if (!response.ok) throw new Error('Error del servidor.');
        return response.json();
    })
    .then(data => {
        statusMessage.textContent = '¡Tu canción ha sido enviada! Gracias.';
        statusMessage.style.color = '#39ff14';
        form.reset();
    })
    .catch(error => {
        statusMessage.textContent = 'No se pudo enviar la solicitud. Revisa la conexión o avisa al DJ.';
        statusMessage.style.color = '#ff4500';
    })
    .finally(() => {
        button.disabled = false;
        button.textContent = 'Enviar Solicitud';
    });
});
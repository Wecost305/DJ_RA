document.getElementById('songRequestForm').addEventListener('submit', function(event) {
    event.preventDefault();

    // !!! IMPORTANTE: REEMPLAZA ESTA URL POR LA TUYA DE NGROK !!!
    const ngrokApiUrl = ' https://5739dcccba65.ngrok-free.app';
    
    const statusMessage = document.getElementById('status-message' );
    const button = document.querySelector('.neon-button');

    const data = {
        cancion: document.getElementById('cancion').value,
        solicitante: document.getElementById('solicitante').value,
        dedicatoria: document.getElementById('dedicatoria').value
    };

    button.disabled = true;
    button.textContent = 'Enviando...';
    statusMessage.textContent = '';
    statusMessage.style.color = '#f0f0f0';

    fetch(ngrokApiUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Error del servidor. Intenta de nuevo.');
        }
        return response.json();
    })
    .then(data => {
        statusMessage.textContent = '¡Tu canción ha sido enviada! Gracias.';
        statusMessage.style.color = '#39ff14'; // Verde neón
        document.getElementById('songRequestForm').reset();
    })
    .catch(error => {
        statusMessage.textContent = 'No se pudo enviar la solicitud. Revisa la conexión o avisa al DJ.';
        statusMessage.style.color = '#ff4500'; // Naranja/Rojo
    })
    .finally(() => {
        button.disabled = false;
        button.textContent = 'Enviar Solicitud';
    });
});

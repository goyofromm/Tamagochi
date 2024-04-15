/* eslint-disable prettier/prettier */
function changeStatusLabel(){
    fetch('http://localhost:3000/tam/state')
        .then(response => {
            // Verificar el estado de la respuesta
            console.log(response.body)
            if (!response.ok) {
                throw new Error('Error al obtener el estado');
            }
            // Devolver la respuesta como JSON
            return response.json();
        })
        .then(data => {
            // Manejar la respuesta de la solicitud
            //console.log(data.Status);
            document.getElementById("dataLabel").innerText = JSON.stringify(data.Status);
        })
        .catch(error => {
            // Manejar errores
            console.error('Error:', error);
        });
}

document.getElementById("btnFeed").addEventListener("click", function() {
    fetch('http://localhost:3000/feed')
        .then(response => {
            console.log(response.body)
            if (!response.ok) {
                throw new Error('Error al obtener el estado');
            }
            return response.json();
        })
        .then(data => {
            //console.log(data.Status);
            document.getElementById("dataLabel").innerText = JSON.stringify(data.Status);
        })
        .catch(error => {
            console.error('Error:', error);
        });

        changeStatusLabel()

});

document.getElementById("btnCuddle").addEventListener("click", function() {
    fetch('http://localhost:3000/cuddle')
        .then(response => {
            console.log(response.body)
            if (!response.ok) {
                throw new Error('Error al obtener el estado');
            }
            return response.json();
        })
        .then(data => {
            //console.log(data.Status);
            document.getElementById("dataLabel").innerText = JSON.stringify(data.Status);
        })
        .catch(error => {
            console.error('Error:', error);
        });

        changeStatusLabel()
});

document.getElementById("btnDrink").addEventListener("click", function() {
    fetch('http://localhost:3000/giveWater')
        .then(response => {
            console.log(response.body)
            if (!response.ok) {
                throw new Error('Error al obtener el estado');
            }
            return response.json();
        })
        .then(data => {
            //console.log(data.Status);
            document.getElementById("dataLabel").innerText = JSON.stringify(data.Status);
        })
        .catch(error => {
            console.error('Error:', error);
        });

        changeStatusLabel()
});

document.getElementById("btnGetStatus").addEventListener("click", function() {
    changeStatusLabel()
})

document.addEventListener("DOMContentLoaded", function() {
    const nameInput = document.getElementById('nameInput');
    const changeNameButton = document.getElementById('btnChangeName');

    changeNameButton.addEventListener("click", function() {
        if (changeNameButton.textContent === '✍️') {
            nameInput.removeAttribute('disabled');
            nameInput.focus();
            changeNameButton.textContent = '✔️';
        } else if (changeNameButton.textContent === '✔️') {
            // Deshabilitar el input
            if (nameInput.value.trim().length > 0){
                nameInput.setAttribute('disabled', true);
                changeNameButton.textContent = '✍️';

                const newName = nameInput.value.trim();
                
                fetch(`http://localhost:3000/${newName}`, {
                    method: 'PUT',
                })
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Error al cambiar el nombre');
                    }
                    return response.text();
                })
                .then(data => {
                    console.log('Nombre cambiado exitosamente:', data);
                })
                .catch(error => {
                    console.error('Error:', error);
                });
            }
            else{
                showToast("Nombre invalido")
                nameInput.focus();
            }
        }
    });

});

function showToast(message) {
    const toast = document.createElement('div');
    toast.classList.add('toast');

    toast.innerText = message;

    document.body.appendChild(toast);

    setTimeout(() => {
        toast.remove();
    }, 3000); 
}
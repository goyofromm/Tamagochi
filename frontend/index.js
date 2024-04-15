/* eslint-disable prettier/prettier */
let timer = setInterval(changeStatusLabel, 3000); // cada 3 segundos chequea el estado
const imgAvatar = document.getElementById("imgAvatar")
const btnFeed = document.getElementById("btnFeed")
const btnCuddle = document.getElementById("btnCuddle")
const btnDrink = document.getElementById("btnDrink")
const btnRes = document.getElementById("btnRes")

function changeStatusLabel(){
    fetch('http://localhost:3000/tam/state')
        .then(response => {
            // Verificar el estado de la respuesta
            if (!response.ok) {
                throw new Error('Error al obtener el estado');
            }
            // Devolver la respuesta como JSON
            return response.json();
        })
        .then(data => {
            // Manejar la respuesta de la solicitud
            clearInterval(timer);
            timer = setInterval(changeStatusLabel, 3000);
            let lbl = document.getElementById("dataLabel")
            lbl.innerText = JSON.stringify(data.Status);
            if (lbl.innerText === '"Feliz"') {
                imgAvatar.style.backgroundColor = "transparent";
            } else if (lbl.innerText === '"Hambriento"') {
                imgAvatar.style.background = "radial-gradient(rgba(255, 0, 0, 0.4), rgba(255, 0, 0, 0))";
            } else if (lbl.innerText === '"Sediento"') {
                imgAvatar.style.background = "radial-gradient(rgba(255, 0, 0, 0.6), rgba(255, 0, 0, 0.0))";
            } else if (lbl.innerText === '"Triste"') {
                imgAvatar.style.background = "radial-gradient(rgba(255, 0, 0, 0.8), rgba(255, 0, 0, 0.0))";
            } else {
                clearInterval(timer);
                imgAvatar.style.background = "radial-gradient(rgba(255, 0, 0, 1), rgba(255, 0, 0, 0.0))";
                showToast('Tu tamagotchi ha muerto :(')
                btnFeed.setAttribute('disabled', true)
                btnCuddle.setAttribute('disabled', true)
                btnDrink.setAttribute('disabled', true)
                btnRes.removeAttribute('hidden')
            }     

        })
        .catch(error => {
            // Manejar errores
            clearInterval(timer);
            showToast('Tu tamagotchi ha muerto :(')
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
            changeStatusLabel()

        })
        .catch(error => {
            console.error('Error:', error);
        });

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
            changeStatusLabel()

        })
        .catch(error => {
            console.error('Error:', error);
        });
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
            changeStatusLabel()
        })
        .catch(error => {
            console.error('Error:', error);
        });
        
});

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
                    showToast(data)
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
    }, 2500); 
}
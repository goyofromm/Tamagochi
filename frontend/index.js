/* eslint-disable prettier/prettier */
const tTimer = 5000 // cada 5 segundos chequea el estado
let timer = setInterval(changeStatusLabel, tTimer); 
//BOTONES
const btnFeed = document.getElementById("btnFeed")
const btnCuddle = document.getElementById("btnCuddle")
const btnDrink = document.getElementById("btnDrink")
const btnRes = document.getElementById("btnRes")
//IMAGENES
const imgAvatar = document.getElementById("imgAvatar")
const imgCorazones = document.getElementById("imgCorazones")

function changeStatusLabel(){
    fetchChangeState('tam/timer')
}

document.getElementById("btnFeed").addEventListener("click", function() {
    fetchChangeState('feed')
});

document.getElementById("btnCuddle").addEventListener("click", function() {
    fetchChangeState('cuddle')
});

document.getElementById("btnDrink").addEventListener("click", function() {
    fetchChangeState('giveWater')        
});

document.getElementById("btnRes").addEventListener("click", function() {
    fetchChangeState('revive')

    btnFeed.removeAttribute('disabled')
    btnCuddle.removeAttribute('disabled')
    btnDrink.removeAttribute('disabled')
    btnRes.setAttribute('hidden', true)
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

function setStatusLabel(status){
    let lbl = document.getElementById("dataLabel")
    if(lbl.innerText != JSON.stringify(status)){
        lbl.innerText = JSON.stringify(status);
        clearInterval(timer);
        timer = setInterval(changeStatusLabel, tTimer);
    }
}

function fetchChangeState(control){
    fetch('http://localhost:3000/' + control)
    .then(response => {
        console.log(response.body)
        if (!response.ok) {
            throw new Error('Error al obtener el estado');
        }
        return response.json();
    })
    .then(data => {
        setStatusLabel(data.Status)

        setBackColor()
    })
    .catch(error => {
        console.error('Error:', error);
    });
}

function setBackColor(){
    let lbl = document.getElementById("dataLabel")
    if (lbl.innerText === '"Feliz"') {
        imgAvatar.style.background = "transparent";
        imgCorazones.removeAttribute('hidden');
        setTimeout(() => {
            imgCorazones.setAttribute('hidden', true);
        }, 2000);
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
}
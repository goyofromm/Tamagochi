/* eslint-disable prettier/prettier */
const tTimer = 5000 // cada 5 segundos chequea el estado
let timer /*= setInterval(changeStatusLabel, tTimer); */
//BOTONES
const btnFeed = document.getElementById("btnFeed")
const btnCuddle = document.getElementById("btnCuddle")
const btnDrink = document.getElementById("btnDrink")
const btnRes = document.getElementById("btnRes")
const btnLogin = document.getElementById("btnLogin")
const btnRegister = document.getElementById("btnRegister")
const btnPlus = document.querySelectorAll('.imgPlus');
//IMAGENES
const imgAvatar = document.getElementById("imgAvatar")
const imgCorazones = document.getElementById("imgCorazones")
//SECCIONES
const secLogin = document.getElementById("loginSection")
const secUsuario = document.getElementById("tamagotchiSection")
//INPUT
const userInput = document.getElementById("usernameLogin")
const passInput = document.getElementById("passwordLogin")
const repPassInput = document.getElementById("repPasswordLogin")
//TEXTOS
const pRegister = document.getElementById("pRegister") //<p>
const spanRegister = document.getElementById("spanRegister") //<span>
const titleIndex = document.getElementById("titleIndex") //<h1>

btnLogin.addEventListener('click', function() {
    if (userInput.value.trim().length > 0 && passInput.value.trim().length > 0){
        const headers = new Headers();
        headers.append('user', userInput.value.trim());
        headers.append('password', passInput.value.trim());
        fetch(`http://localhost:3000/user/login`, {
            headers: headers //Le mando el username y el password como headers
        })
         .then(response => {
             if (!response.ok) {
                 throw new Error('Error al cambiar el nombre');
             }
             return response.text();
         })
         .then(data => {
            if(data == 0){
                console.log('Ingreso correcto');
                secLogin.style.display = "none"
                secUsuario.style.display = "flex" //Muestra el section de los tamagotchi del usuario
            }
            else if(data == 1){ //Ingreso correcto pero no tiene tamagotchis
                console.log('Ingreso correcto:', data);
                secLogin.style.display = "none"
                secUsuario.style.display = "flex" //Muestra el section de los tamagotchi del usuario
            }
            else{
                showToast("El usuario o la contraseña son incorrectos")
            }
         })
         .catch(error => {
             console.error('Error:', error);
         });
    }
    else{
        showToast("Complete los datos")
    }
})

btnRegister.addEventListener('click', function(){
    if(userInput.value.trim().length > 0 && passInput.value.trim().length > 0 && repPassInput.value.trim().length > 0){
        if(passInput.value.trim() == repPassInput.value.trim()){
            const newUser = {
                name: userInput.value.trim(),
                password: passInput.value.trim()
            }
        
            fetch(`http://localhost:3000/register`, {
                    method: 'POST',
                    headers: {
                      'Content-Type': 'application/json' // Especifica el tipo de contenido como JSON
                     },
                    body: JSON.stringify(newUser) // Convierte el objeto newUser a JSON
                })
                 .then(response => {
                     if (!response.ok) {
                         throw new Error('Error al cambiar el nombre');
                     }
                     return response.text();
                 })
                 .then(data => {
                     console.log('Usuario creado exitosamente:', data);
                     showToast('Se creo el usuario ' + newUser.name + ' exitosamente')
                     backToLogin()
                 })
                 .catch(error => {
                     console.error('Error:', error);
            });
        }
        else{
            showToast("Las contraseñas no coinciden")    
        }
    }
    else{
        showToast("Complete los datos")
    }
})

btnPlus.forEach(function(item) {
    item.addEventListener('click', function() {
        const src = item.src;
        if( src.substring(src.length - 9) == "/plus.png"){ //Si esta la imagen de +, entonces me abre para crear un tamagotchi
            showToast("ASD")
        }
        //Si hay un tamagotchi no hace nada
    });
});

btnPlus.addEventListener('click', function() {
    showToast("ASD")
})

function backToLogin(){
    repPassInput.hidden = true
    btnRegister.hidden = true
    btnLogin.hidden = false
    pRegister.hidden = false    
    
    repPassInput.value = ''
    passInput.value = ''
    userInput.value = ''
}

titleIndex.addEventListener('click', function(){
    backToLogin()
})

spanRegister.addEventListener('click', function(){
    repPassInput.hidden = false
    btnRegister.hidden = false
    btnLogin.hidden = true
    pRegister.hidden = true    
})

function changeStatusLabel(){
    fetchChangeState('tam/timer')
}

document.getElementById("btnFeed").addEventListener("click", function() {
    fetchChangeState('state/feed')
});

document.getElementById("btnCuddle").addEventListener("click", function() {
    fetchChangeState('state/cuddle')
});

document.getElementById("btnDrink").addEventListener("click", function() {
    fetchChangeState('state/giveWater')        
});

document.getElementById("btnRes").addEventListener("click", function() {
    fetchChangeState('state/revive')

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
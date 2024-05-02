/* eslint-disable prettier/prettier */
//Declaro un timer para cada slot, y se prende cuando se crea un tamagotchi
const tTimer = 10000 // cada 5 segundos chequea el estado
let timerSlide1
let timerSlide2
let timerSlide3

/*let timerSlide1 = setInterval(changeStatusLabel, tTimer);
let timerSlide2 = setInterval(changeStatusLabel, tTimer);
let timerSlide3 = setInterval(changeStatusLabel, tTimer);*/

let nameImgSelected = null;
let slotSelected = 'imgAvatar1' //Por defecto ese el primer slot
//BOTONES
const btnFeed = document.getElementById("btnFeed")
const btnCuddle = document.getElementById("btnCuddle")
const btnDrink = document.getElementById("btnDrink")
const btnRes = document.getElementById("btnRes")
const btnLogin = document.getElementById("btnLogin")
const btnRegister = document.getElementById("btnRegister")
const btnOpenPopup = document.querySelectorAll('.btnOpenPopup');
const btnAvatarSelec = document.querySelectorAll('.imgAvatarSelec');
const btnClosePopup = document.getElementById('btnClosePopup');
const btnSavePopup = document.getElementById('btnSavePopup');
const btnSaveImgPopup = document.getElementById('btnSaveImgPopup');
const btnCloseImgPopup = document.getElementById('btnCloseImgPopup');
const changeNameButton = document.getElementById('btnChangeName');

//IMAGENES
const imgCorazones = document.getElementById("imgCorazones")
const imgAvatarSelected = document.getElementById("imgAvatarSelected")
//SECCIONES
const secLogin = document.getElementById("loginSection")
const secUsuario = document.getElementById("tamagotchiSection")
//INPUT
const userInput = document.getElementById("usernameLogin")
const passInput = document.getElementById("passwordLogin")
const repPassInput = document.getElementById("repPasswordLogin")
const tamNameInput = document.getElementById("tamName")
const tamNameChange = document.getElementById("nameInput")
//CHECKBOXES
const chkSlideOne = document.getElementById("slideOne")
const chkSlideTwo = document.getElementById("slideTwo")
const chkSlideThree = document.getElementById("slideThree")
//TEXTOS
const pRegister = document.getElementById("pRegister") //<p>
const spanRegister = document.getElementById("spanRegister") //<span>
const titleIndex = document.getElementById("titleIndex") //<h1>
const lblSelectTam = document.getElementById("lblSelectTam") //<label>
const lblDataLabel = document.getElementById("dataLabel")
const statusMessage = document.getElementById("statusMessage")

//POPUP
const popupModal = document.getElementById("popupModal")
const imgPopupModal = document.getElementById("imgPopupModal")

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
            if(data){ //El login es correcto
                const jsonData = JSON.parse(data)
                if(jsonData.tamagotchiList.length > 0){
                    //Tiene tamagotchis regitrados
                    btnOpenPopup.forEach(function(item){
                        jsonData.tamagotchiList.forEach(function(tam){
                            if(tam.slot == item.id){
                                //Este triple if lo hice para que si solo tiene uno en el tercer slot o en el segundo, 
                                //seleccione ese slot de una y carge los datos correctamente, luego los voy cambiando con los checked change
                                //id-name/estado
                                if(tam.slot == "imgAvatar1"){
                                    chkSlideOne.alt = tam.id + "-" + tam.name + "/" + tam.currentState //En alt guardo el id, el name y el status del tamagotchi
                                    chkSlideOne.checked = true                                    
                                } //slot 1                                    
                                else if(tam.slot == "imgAvatar2"){
                                    chkSlideTwo.alt = tam.id + "-" + tam.name + "/" + tam.currentState
                                    chkSlideTwo.checked = true
                                } //slot 2                                    
                                else if(tam.slot == "imgAvatar3"){
                                    chkSlideThree.alt = tam.id + "-" + tam.name + "/" + tam.currentState
                                    chkSlideThree.checked = true
                                } //slot 3                                    
                                //Esto me abre un slot que tenga un tamagotchi y le pone su nombre y su estado sin ""
                                item.src = tam.avatar
                                lblDataLabel.innerText = JSON.stringify(tam.currentState).replace('"', '').replace('"', '');
                                tamNameChange.value = JSON.stringify(tam.name).replace('"', '').replace('"', '')
                                setBackColor(tam.id)
                            }
                        })
                    })
                }
                else{
                    //Pongo el primer slide pero le oculto el nombre y el estado porque no tiene ninguno
                    chkSlideOne.checked = true
                    tamNameChange.style.visibility = 'hidden'
                    statusMessage.style.visibility = 'hidden'
                    changeNameButton.style.visibility = 'hidden'
                }
                secLogin.style.display = "none"
                secUsuario.style.display = "flex" //Muestra el section de los tamagotchi del usuario
            }
            else{
                console.log('Ingreso incorrecto');
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

chkSlideOne.addEventListener('change', () => {
    if(chkSlideOne.alt.length > 0){
        //id-name/estado
        tamNameChange.value = chkSlideOne.alt.substring(chkSlideOne.alt.indexOf('-') + 1, chkSlideOne.alt.indexOf('/'))
        lblDataLabel.innerText = chkSlideOne.alt.substring(chkSlideOne.alt.indexOf('/') + 1, chkSlideOne.alt.length)
        tamNameChange.style.visibility = 'visible'
        statusMessage.style.visibility = 'visible'
        changeNameButton.style.visibility = 'visible'
    }
    else{
        tamNameChange.style.visibility = 'hidden'
        statusMessage.style.visibility = 'hidden'
        changeNameButton.style.visibility = 'hidden'
    }
})

chkSlideTwo.addEventListener('change', () => {
    if(chkSlideTwo.alt.length > 0){
        //id-name/estado
        tamNameChange.value = chkSlideTwo.alt.substring(chkSlideTwo.alt.indexOf('-') + 1, chkSlideTwo.alt.indexOf('/'))
        lblDataLabel.innerText = chkSlideTwo.alt.substring(chkSlideTwo.alt.indexOf('/') + 1, chkSlideTwo.alt.length)
        tamNameChange.style.visibility = 'visible'
        statusMessage.style.visibility = 'visible'
        changeNameButton.style.visibility = 'visible'
    }
    else{
        //Se ocultan
        tamNameChange.style.visibility = 'hidden'
        statusMessage.style.visibility = 'hidden'
        changeNameButton.style.visibility = 'hidden'
    }
})

chkSlideThree.addEventListener('change', () => {
    if(chkSlideThree.alt.length > 0){
        //id-name/state
        tamNameChange.value = chkSlideThree.alt.substring(chkSlideThree.alt.indexOf('-') + 1, chkSlideThree.alt.indexOf('/'))
        lblDataLabel.innerText = chkSlideThree.alt.substring(chkSlideThree.alt.indexOf('/') + 1, chkSlideThree.alt.length)
        tamNameChange.style.visibility = 'visible'
        statusMessage.style.visibility = 'visible'
        changeNameButton.style.visibility = 'visible'
    }
    else{
        //Se ocultan
        tamNameChange.style.visibility = 'hidden'
        statusMessage.style.visibility = 'hidden'
        changeNameButton.style.visibility = 'hidden'
    }
})


userInput.addEventListener('focus', () => {
    userInput.removeAttribute('placeholder')
})

userInput.addEventListener('blur', () => {
    userInput.setAttribute('placeholder', 'Usuario')
})

passInput.addEventListener('focus', () => {
    passInput.removeAttribute('placeholder')
})

passInput.addEventListener('blur', () => {
    passInput.setAttribute('placeholder', 'Contraseña')
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

btnOpenPopup.forEach(function(item) {
    item.addEventListener('click', function() {
        const src = item.src;
        if( src.substring(src.length - 9) == "/plus.png"){ //Si esta la imagen de +, entonces me abre para crear un tamagotchi
            slotSelected = item.id
            popupModal.style.display = "flex"
            popupModal.showModal()
        }
        //Si hay un tamagotchi no hace nada
    });
});

btnAvatarSelec.forEach(imagen => {
    imagen.addEventListener('click', function() {
        if (nameImgSelected !== null) {
            document.querySelector(`img[src="images/${nameImgSelected}.gif"]`).classList.remove('seleccionada');
        }
        nameImgSelected = imagen.alt;
        imagen.classList.add('seleccionada');
    });
});

btnClosePopup.addEventListener('click', function(){
    popupModal.close()
    popupModal.style.display = "none"
})

btnSavePopup.addEventListener('click', () => {
    if(tamNameInput.value.trim().length > 0){
        const imgAvatar = document.getElementById(slotSelected)
        imgAvatar.src = imgAvatarSelected.src;
        imgAvatar.alt = imgAvatarSelected.alt;
        const newTam = {
            name: tamNameInput.value.trim(),
            currentState: 'Feliz',
            idUser: 0, //Se lo asigno en el appService
            avatar: imgAvatar.src,
            slot: slotSelected
        }
        fetch(`http://localhost:3000/register/tam`, {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json' // Especifica el tipo de contenido como JSON
                 },
                body: JSON.stringify(newTam) // Convierte el objeto newUser a JSON
            })
            .then(response => {
             if (!response.ok) {
                throw new Error('Error al cambiar el nombre');
             }
             return response.text();
             })
             .then(data => {
                if(data){
                    const jsonData = JSON.parse(data)
                    console.log('Tamagotchi creado exitosamente:', data);
                    showToast('Se creo el tamagotchi ' + newTam.name + ' exitosamente')
                    //Le asigno al slot en cuestion los datos del tamagotchi
                    if(chkSlideOne.checked){
                        //id-name/estado
                        chkSlideOne.alt = jsonData.id + "-" + jsonData.name + "/" + jsonData.currentState
                        timerSlide1 = setInterval(function(){
                            changeStatusLabel(chkSlideOne.alt.substring(0, chkSlideOne.alt.indexOf('-')), jsonData.currentState)
                        }, tTimer);                    
                    }
                    else if(chkSlideTwo.checked){
                        chkSlideTwo.alt = jsonData.id + "-" + jsonData.name + "/" + jsonData.currentState
                        timerSlide2 = setInterval(function(){
                            changeStatusLabel(chkSlideTwo.alt.substring(0, chkSlideTwo.alt.indexOf('-')), jsonData.currentState)
                        }, tTimer);                        
                    }
                    else if(chkSlideThree.checked){
                        chkSlideThree.alt = jsonData.id + "-" + jsonData.name + "/" + jsonData.currentState   
                        timerSlide3 = setInterval(function(){
                            changeStatusLabel(chkSlideThree.alt.substring(0, chkSlideThree.alt.indexOf('-')), jsonData.currentState)
                        }, tTimer);                       
                    }              
                   lblDataLabel.innerText = jsonData.currentState;
                   tamNameChange.value = jsonData.name
                   tamNameChange.style.visibility = 'visible'
                   statusMessage.style.visibility = 'visible'
                   changeNameButton.style.visibility = 'visible'
                }    

             })
             .catch(error => {
                 console.error('Error:', error);
        });
        popupModal.close();
        popupModal.style.display = "none";
    }
    else{
        showToast("Ingrese un nombre valido")
    }
    
})


btnCloseImgPopup.addEventListener('click', function(){
    imgPopupModal.style.display = "none"
    imgPopupModal.close()
})

btnSaveImgPopup.addEventListener('click', () => {
    const rutaActual = imgAvatarSelected.src;
    const nuevaRuta = rutaActual.substring(0, rutaActual.lastIndexOf('/') + 1) + nameImgSelected + ".gif";
    console.log(nuevaRuta)
    imgAvatarSelected.src = nuevaRuta;
    imgAvatarSelected.alt = nameImgSelected;
    imgPopupModal.style.display = "none";
    imgPopupModal.close()
})

tamNameInput.addEventListener('focus', () => {
    tamNameInput.removeAttribute('placeholder')
})

tamNameInput.addEventListener('blur', () => {
    tamNameInput.setAttribute('placeholder', 'Nombre')
})

lblSelectTam.addEventListener('mouseenter', () => {
    lblSelectTam.innerText = "Seleccionar avatar"
})

lblSelectTam.addEventListener('click', () => {
    imgPopupModal.style.display = "flex"
    imgPopupModal.showModal()
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

function changeStatusLabel(idTam, currentState){
    fetchChangeState('tam/timer', idTam, currentState)
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

    //habilito los botones de estimulos y saco el boton de revive
    btnFeed.removeAttribute('disabled')
    btnCuddle.removeAttribute('disabled')
    btnDrink.removeAttribute('disabled')
    btnRes.setAttribute('hidden', true)
});

document.addEventListener("DOMContentLoaded", function() {
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

function fetchChangeState(control, idTam = 0, currentState = ""){
    if(idTam == 0){
        //Entra aca si se envia un estimulo
        //Tomamos los datos del tamagotchi que estamos estimulando (Slot checked)
        if (chkSlideOne.checked){
            idTam = chkSlideOne.alt.substring(0, chkSlideOne.alt.indexOf('-'))
            //currentState = chkSlideOne.alt.substring(chkSlideOne.alt.indexOf('/') + 1, chkSlideOne.alt.length)
        }
        else if (chkSlideTwo.checked){
            idTam = chkSlideTwo.alt.substring(0, chkSlideTwo.alt.indexOf('-'))
            //currentState = chkSlideTwo.alt.substring(chkSlideTwo.alt.indexOf('/') + 1, chkSlideTwo.alt.length)
        }
        else if (chkSlideThree.checked){
            idTam = chkSlideThree.alt.substring(0, chkSlideThree.alt.indexOf('-'))
            //currentState = chkSlideThree.alt.substring(chkSlideThree.alt.indexOf('/') + 1, chkSlideThree.alt.length)
        }
    }
    control = control + "/" + idTam
    if(currentState != ""){
        //Solo si lo llama el timer
        control = control + "/" + currentState //Se llama el timer, tengo que pasarle el estado actual de mi tam
    }
    fetch('http://localhost:3000/' + control)
    .then(response => {
        if (!response.ok) {
            throw new Error('Error al obtener el estado');
        }
        return response.json();
    })
    .then(data => {
        setStatusLabel(data.Status, idTam)

        setBackColor(idTam)
    })
    .catch(error => {
        console.error('Error:', error);
    });
}

function setStatusLabel(status, idTam){
    if(lblDataLabel.innerText != JSON.stringify(status)){
        //alt = id-name/estado
        if(chkSlideOne.alt.substring(0, chkSlideOne.alt.indexOf("-")) == idTam){
            //Se modificó el tamagotchi del primer slide
            chkSlideOne.alt = idTam + "-" + chkSlideOne.alt.substring(chkSlideOne.alt.indexOf('-') + 1, chkSlideOne.alt.indexOf('/')) + "/" + status
            clearInterval(timerSlide1);
            timerSlide1 = setInterval(function(){
                changeStatusLabel(chkSlideOne.alt.substring(0, chkSlideOne.alt.indexOf('-')), status)
            }, tTimer);
            if (chkSlideOne.checked){
                lblDataLabel.innerText = JSON.stringify(status).replace('"', '').replace('"', '');
            }
        }
        else if(chkSlideTwo.alt.substring(0, chkSlideTwo.alt.indexOf("-")) == idTam){
            //Se modificó el tamagotchi del segundo slide
            chkSlideTwo.alt = idTam + "-" + chkSlideTwo.alt.substring(chkSlideTwo.alt.indexOf('-') + 1, chkSlideTwo.alt.indexOf('/')) + "/" + status
            clearInterval(timerSlide2);
            timerSlide2 = setInterval(function(){
                changeStatusLabel(chkSlideTwo.alt.substring(0, chkSlideTwo.alt.indexOf('-')), status)
            }, tTimer);
            if (chkSlideTwo.checked){
                lblDataLabel.innerText = JSON.stringify(status).replace('"', '').replace('"', '');
            }
        }
        else if(chkSlideThree.alt.substring(0, chkSlideThree.alt.indexOf("-")) == idTam){
            //Se modificó el tamagotchi del tercer slide
            chkSlideThree.alt = idTam + "-" + chkSlideThree.alt.substring(chkSlideThree.alt.indexOf('-') + 1, chkSlideThree.alt.indexOf('/')) + "/" + status
            clearInterval(timerSlide3);
            timerSlide3 = setInterval(function(){
                changeStatusLabel(chkSlideThree.alt.substring(0, chkSlideThree.alt.indexOf('-')), status)
            }, tTimer);
            if (chkSlideThree.checked){
                lblDataLabel.innerText = JSON.stringify(status).replace('"', '').replace('"', '');
            }
        }

    }
}

function setBackColor(idTam){
    //Con esto selecciono la imagen que cambio el estado y le aplico estilos
    let imgAvatar
    let statusTam
    if(chkSlideOne.alt.substring(0, chkSlideOne.alt.indexOf("-")) == idTam){
        imgAvatar = document.getElementById('imgAvatar1')
        statusTam = chkSlideOne.alt.substring(chkSlideOne.alt.indexOf("/") + 1, chkSlideOne.alt.length)
    }
    else if(chkSlideTwo.alt.substring(0, chkSlideTwo.alt.indexOf("-")) == idTam){
        imgAvatar = document.getElementById('imgAvatar2')
        statusTam = chkSlideTwo.alt.substring(chkSlideTwo.alt.indexOf("/") + 1, chkSlideTwo.alt.length)
    }
    else if(chkSlideThree.alt.substring(0, chkSlideThree.alt.indexOf("-")) == idTam){
        imgAvatar = document.getElementById('imgAvatar3')
        statusTam = chkSlideThree.alt.substring(chkSlideThree.alt.indexOf("/") + 1, chkSlideThree.alt.length)
    }

    if (statusTam === 'Feliz') {
        imgAvatar.style.border = "transparent";
        imgCorazones.removeAttribute('hidden');
        setTimeout(() => {
            imgCorazones.setAttribute('hidden', true);
        }, 2000);
    } else if (statusTam === 'Hambriento') {
        imgAvatar.style.border = "1px solid rgba(255, 0, 0, 0.4)";
    } else if (statusTam === 'Sediento') {
        imgAvatar.style.border = "2px solid rgba(255, 0, 0, 0.6)";
    } else if (statusTam === 'Triste') {
        imgAvatar.style.border = "3px solid rgba(255, 0, 0, 0.8)";
    } else {
        imgAvatar.style.border = "4px solid rgba(255, 0, 0)";
        if (chkSlideOne.checked)
            clearInterval(timerSlide1);
        else if (chkSlideTwo.checked)
            clearInterval(timerSlide2);
        else if (chkSlideThree.checked)
            clearInterval(timerSlide2); 
        showToast('Tu tamagotchi ha muerto :(')
        btnFeed.setAttribute('disabled', true)
        btnCuddle.setAttribute('disabled', true)
        btnDrink.setAttribute('disabled', true)
        btnRes.removeAttribute('hidden')
    }     
}
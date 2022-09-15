window.onload = () => {
    const form = document.querySelector('#form')
    const username = document.querySelector('#username')
    const email = document.querySelector('#email')
    const password = document.querySelector('#password')
    const pswRepeat = document.querySelector('#pswRepeat')
    const avatar = document.querySelector('#avatar')

    function ValidateEmail(mail) 
    {
        if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail))
        {
            email.classList.remove('is-invalid')
            email.classList.add('is-valid')
        }
        else{
            email.classList.remove('is-valid')
            email.classList.add('is-invalid')
            errors.push('Debes ingresar un email valido')
        }
          
    }
    //attaching "change" event to the file upload button
    
    function validateFile(){
      const allowedExtensions =  ['jpg', 'png', 'jpeg', 'gif']
    
      const fileExtension = avatar.value.split(".").pop();
    
      if(!allowedExtensions.includes(fileExtension)){
        this.value = null;
        return true
      }
      else{
        return false
      }
    }

    
    
    form.addEventListener('submit', function(e){
        e.preventDefault();
        let errors = [];
        if(!username.value){
            username.classList.add('is-invalid')
            errors.push('Debes ingresar un nombre de usuario')     
        }
        else{
            username.classList.remove('is-invalid')
            username.classList.add('is-valid')
        }
        if(!email.value){
            email.classList.add('is-invalid')
            errors.push('Debes ingresar un email')
        }
        else{
            ValidateEmail(email.value)
        }
        if(!avatar.value){
            avatar.classList.add('is-invalid')
            errors.push('Debes ingresar una foto')
        }
        else{
            if(validateFile()){
                avatar.classList.add('is-invalid')
                errors.push('Ingrese una imagen en formato valido')
                }
            else{
                avatar.classList.remove('is-invalid')
                avatar.classList.add('is-valid')
            }
            
        }
        if(!password.value){
            password.classList.add('is-invalid')
            errors.push('Debes ingresar una contraseña')
        }
        else{
            if(!password.value.match(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/)){
                password.classList.add('is-invalid')
                errors.push('La contraseña debe ser de al menos 8 caracteres, una mayuscula y un numero')
            }
            else{
                password.classList.remove('is-invalid')
                password.classList.add('is-valid')
            }
        }
        if(!pswRepeat.value){
            pswRepeat.classList.add('is-invalid')
            errors.push('Debes repetir la contraseña')
        }
        else{
            if(!pswRepeat.value == password.value){
                pswRepeat.classList.add('is-invalid')
                errors.push('Las contraseñas deben coincidir')
            }
            else{
                pswRepeat.classList.remove('is-invalid')
                pswRepeat.classList.add('is-valid')
            }
        }
        if(errors.length > 0){
            let ul = document.querySelector('.errors')
            for(let error of errors){
                ul.innerHTML += '<li class="is-invalid">' + error + '</li>'            
            }
        }
        else{
            form.submit()
        }
         
    })
    
    
}
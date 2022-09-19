window.onload = () => {
    const form = document.querySelector('#form')
    const username = document.querySelector('#username')
    const password = document.querySelector('#password')

    
    
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
        if(!password.value){
            password.classList.add('is-invalid')
            errors.push('Debes ingresar una contraseña')
        }
        else{
            password.classList.remove('is-invalid')
            password.classList.add('is-valid')
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
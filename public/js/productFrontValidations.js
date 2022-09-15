window.onload = () => {
    const form = document.querySelector('#form')
    const name = document.querySelector('#name')
    const img = document.querySelector('#img')
    const category = document.querySelector('#category')
    const description = document.querySelector('#description')
    const caracteristics = document.querySelector('#caracteristics')

    
    
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
        if(!name.value){
            name.classList.add('is-invalid')
            errors.push('Debes ingresar un nombre de producto')     
        }
        else{
            name.classList.remove('is-invalid')
            name.classList.add('is-valid')
        }
        if(!img.value){
            img.classList.add('is-invalid')
            errors.push('Debes ingresar una foto')
        }
        else{
            if(validateFile()){
                img.classList.add('is-invalid')
                errors.push('Ingrese una imagen en formato valido')
                }
            else{
                img.classList.remove('is-invalid')
                img.classList.add('is-valid')
            }
            
        }if(!caracteristics.value){
            caracteristics.classList.add('is-invalid')
            errors.push('Debes ingresar las caracteristicas de producto')     
        }
        else{
            caracteristics.classList.remove('is-invalid')
            caracteristics.classList.add('is-valid')
        }
        if(!description.value){
            description.classList.add('is-invalid')
            errors.push('Debes ingresar la descripcion de producto')     
        }
        else{
            description.classList.remove('is-invalid')
            description.classList.add('is-valid')
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
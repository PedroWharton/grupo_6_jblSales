
window.onload = () => {
    const forms = document.querySelectorAll('form')

    for(let form of forms){
        form.addEventListener('submit', function(e){
            e.preventDefault()
            fetch(form.action, {
                method: 'DELETE'
              })
            form.remove();  
        })
    }
}
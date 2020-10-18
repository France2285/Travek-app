function checkCity(myText) {
    //event.preventDefault()
   // check what text was put into the form field
    //let myText = document.getElementById('name').value
    if (placeVal == ""){
        alert ("Please enter a valid destination")
        return false
    } else {
        return true
    }
}

function checkDate(myText) {
      if (dateVal == null){
        alert ("please enter a valid date dd/mm/yyyy")
        return false
        } else {
        return true
    }
}

export { checkCity }
export { checkDate }
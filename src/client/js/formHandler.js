function checkCity(placeVal) {
    if (placeVal == ""){
        alert ("Please enter a valid destination")
        return false
    } else {
        return true
    }
}

function checkDate(dateVal) {
      if (dateVal == null){
        alert ("please enter a valid date dd/mm/yyyy")
        return false
        } else {
        return true
    }
}

export { checkCity }
export { checkDate }
function showErrorNotif(error) {

    const error_notif = document.getElementById("error_notif");
    let message = "Erreur: ";
    message += error;
    error_notif.innerText = message;
    error_notif.style.display = "block";
  
    setTimeout(() => {
        error_notif.style.display = "none";
    }, 5000);

}
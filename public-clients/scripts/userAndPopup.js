// var user_id;
// var user_email;

const user_popup_but = document.getElementById('user_popup_but');
user_popup_but.addEventListener('click', () => {
    openUserPopup();
});


function openUserPopup() {

    $('#user_popup_close').off('click').on('click', function() {
        closeUserPopup(); 
    });
    $('#user_popup').fadeIn();
    $(document).on('keydown', function(e) {
        if (e.keyCode === 27) {
            closeUserPopup();
        }
    });
    $('#user_popup').on('click', function(e) {
        if (!$(e.target).closest('.user_popup_content').length) {
            closeUserPopup();
        }
    });
}


function closeUserPopup() {
    $('#user_popup').fadeOut();
    $(document).off('keydown');
    $('#user_popup').off('click');
}


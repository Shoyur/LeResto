$('#loc_popup_close').addEventListener('click', () => {
    openLocationPopup();
});

function openLocationPopup() {

    $('#loc_popup_close').off('click').on('click', function() {
        closeLocationPopup(); 
    });
    $('#loc_popup').fadeIn();
    $(document).on('keydown', function(e) {
        if (e.keyCode === 27) {
            closeLocationPopup();
        }
    });
    $('#loc_popup').on('click', function(e) {
        if (!$(e.target).closest('.loc_popup_content').length) {
            closeLocationPopup();
        }
    });
}

function closeLocationPopup() {
    $('#loc_popup').fadeOut();
    $(document).off('keydown');
    $('#loc_popup').off('click');
}
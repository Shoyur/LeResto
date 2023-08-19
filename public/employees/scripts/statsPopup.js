$('#stats_popup_but').click(() => {
    openStatsPopup();
});


function openStatsPopup() {

    $('#stats_popup_cancel').off('click').on('click', function() {
        closeStatsPopup(); 
    });

    $('#stats_popup').fadeIn();

    $(document).on('keydown', function(e) {
        if (e.keyCode === 27) {
            closeStatsPopup();
        }
    });

    $('#stats_popup').on('click', function(e) {
        if (!$(e.target).closest('.stats_popup_content').length) {
            closeStatsPopup();
        }
    });

}


function closeStatsPopup() {

    $('#stats_popup').fadeOut();
    $(document).off('keydown');
    $('#stats_popup').off('click');

}
$('#location_popup_but').on('click', function() {
    handleGetSettings();
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

async function handleGetSettings() {

    try {
        const fetch_options = {
            action: 'getSettings',
            id_user: 1, // TO DO
        }
        const response = await fetch('../../../server/controllers/settingsController.php', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(fetch_options)
        });
        // await new Promise(resolve => setTimeout(resolve, 2000)); // fake network lag
        const response_data = await response.json();
        if (!response_data[0]) {
            throw new Error(response_data[1]);
        }
        else {
            const the_location = response_data[1].the_location
            const loc_popup_text = document.getElementById('loc_popup_text');
            loc_popup_text.innerHTML = the_location;
        }
    }
    catch (e) {
        console.error("Error: " + e);
        showErrorNotif(e);
    }

}
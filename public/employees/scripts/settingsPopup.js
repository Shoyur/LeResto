var refresh;
var color_change = 1;
var interval_1 = 0;
var interval_2 = 0;
var the_location;

$('#settings_popup_but').click(() => {
    openSettingsPopup();
});


async function handleGetSettings() {

    try {

        const user_id = 1; // TO DO
        const response = await fetch('../../../server/controllers/settingsController.php?user_id=' + user_id, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
        });
        // await new Promise(resolve => setTimeout(resolve, 2000)); // fake network lag
        const response_data = await response.json();
        if (!response_data[0]) {
            throw new Error(response_data[1]);
        }
        else {
            refresh = response_data[1].refresh;
            color_change = response_data[1].color_change;
            interval_1 = response_data[1].interval_1;
            interval_2 = response_data[1].interval_2;
            the_location = response_data[1].the_location
        }
    }
    catch (e) {
        console.error("Error: " + e);
        showErrorNotif(e);
    }

}


async function handleSaveSettings() {

    try {
        refresh = document.getElementById("refresh_interval").value;
        changeTimerValue(refresh);
        color_change = document.getElementById("changeColorToggle").checked ? 1 : 0;
        interval_1 = document.getElementById("blueInterval").value;
        interval_2 = document.getElementById("yellowInterval").value;
        the_location = document.getElementById("loc_text").value;
        const fetch_options = {
            user_id: 1, // TO DO
            refresh: refresh,
            color_change: color_change,
            interval_1: interval_1,
            interval_2: interval_2,
            the_location: the_location,
        }
        const response = await fetch('../../../server/controllers/settingsController.php', {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(fetch_options)
        });
        // await new Promise(resolve => setTimeout(resolve, 2000)); // fake network lag
        const response_data = await response.json();
        if (!response_data[0]) {
            throw new Error(response_data[1]);
        }
        else {
            closeSettingsPopup();
            showOpenOrders();
        }
    }
    catch (e) {
        console.error("Error: " + e);
        showErrorNotif(e);
    }

}


function changeTimerValue(refresh) {
    clearInterval(interval_refresh);
    interval_refresh = setInterval(handleGetOpenOrdersRequest, refresh * 1000);
}


function openSettingsPopup() {

    $('#refresh_interval').val(refresh);
    $('#changeColorToggle').prop('checked', color_change);
    $('#blueInterval').val(interval_1);
    $('#yellowInterval').val(interval_2);
    $('#loc_text').val(the_location);

    $('#settings_popup_save').off('click').on('click', function() {
        handleSaveSettings();
        closeSettingsPopup(); 
    });
    $('#settings_popup_cancel').off('click').on('click', function() {
        closeSettingsPopup(); 
    });
    $('#settings_popup').fadeIn();

    $(document).on('keydown', function(e) {
        if (e.keyCode === 27) {
            closeSettingsPopup();
        }
    });
    $('#settings_popup').on('click', function(e) {
        if (!$(e.target).closest('.settings_popup_content').length) {
            closeSettingsPopup();
        }
    });
}


function closeSettingsPopup() {
    $('#settings_popup').fadeOut();
    $(document).off('keydown');
    $('#settings_popup').off('click');
}


// First time init
handleGetSettings();
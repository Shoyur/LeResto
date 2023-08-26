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
        const fetch_options = {
            action: 'getSettings',
            id_user: 1, // TO DO
        }
        const response = await fetch('/leresto/server/controllers/settingsController.php', {
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
        const refresh = document.getElementById("refresh_interval").value;
        const color_change = document.getElementById("changeColorToggle").checked ? 1 : 0;
        const interval_1 = document.getElementById("blueInterval").value;
        const interval_2 = document.getElementById("yellowInterval").value;
        const the_location = document.getElementById("loc_text").value;
        const fetch_options = {
            action: 'saveSettings',
            id_user: 1, // TO DO
            refresh: refresh,
            color_change: color_change,
            interval_1: interval_1,
            interval_2: interval_2,
            the_location: the_location,
        }
        const response = await fetch('/leresto/server/controllers/settingsController.php', {
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
            changeTimerValue(refresh);
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
    interval_refresh = setInterval(getOpenOrders, refresh * 1000);
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
var refresh;
var color_change = 1;
var interval_1 = 0;
var interval_2 = 0;
var the_location;

function getSettings() {
    $.ajax({
        url: '/monsystemeresto/app/controllers/settingsController.php',
        type: 'POST',
        data: {
            action: 'getSettings',
            id_user: 1, // TO DO
        },
        dataType: 'json',
        success: function(result) {
            refresh = result.refresh;
            color_change = result.color_change;
            interval_1 = result.interval_1;
            interval_2 = result.interval_2;
            the_location = result.the_location;
        },
        error: function(xhr, status, error) {
            console.error('Error:', error);
        }
    });
}


function saveSettings() {
    refresh = document.getElementById("refresh_interval").value;
    color_change = document.getElementById("changeColorToggle").checked ? 1 : 0;
    interval_1 = document.getElementById("blueInterval").value;
    interval_2 = document.getElementById("yellowInterval").value
    the_location = document.getElementById("loc_text").value;

    $.ajax({
        url: '/monsystemeresto/app/controllers/settingsController.php',
        type: 'POST',
        data: {
            action: 'saveSettings',
            id_user: 1, // TO DO
            refresh: refresh,
            color_change: color_change,
            interval_1: interval_1,
            interval_2: interval_2,
            the_location: the_location,
        },
        dataType: 'json',
        async: false,
        success: function(result) {
            changeTimerValue(refresh);
            closeSettingsPopup();
        },
        error: function(xhr, status, error) {
            console.error('Error:', error);
        }
    });
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
    console.log("the_location = " + the_location);

    $('#settings_popup_save').off('click').on('click', function() {
        saveSettings();
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
getSettings();
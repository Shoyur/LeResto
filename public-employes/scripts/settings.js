var refresh;
var color_change;
var interval_1;
var interval_2;

function getSettings() {
    $.ajax({
        url: '/monsystemeresto/app/controllers/settingsController.php',
        type: 'POST',
        data: {
            action: 'getSettings',
            id_user: 1
        },
        dataType: 'json',
        success: function(result) {
            refresh = result.refresh;
            color_change = result.color_change;
            interval_1 = result.interval_1;
            interval_2 = result.interval_2;
        },
        error: function(xhr, status, error) {
            console.error('Error:', error);
        }
    });
}


function saveSettings() {
    $.ajax({
        url: '/monsystemeresto/app/controllers/settingsController.php',
        type: 'POST',
        data: {
            action: 'saveSettings',
            refresh: document.getElementById("refreshInterval").value,
            color_change: document.getElementById("changeColorToggle").checked ? 1 : 0,
            interval_1: document.getElementById("blueInterval").value,
            interval_2: document.getElementById("yellowInterval").value,
            location: document.getElementById("locationText").value,
        },
        dataType: 'json',
        success: function(result) {
            closeSettingsPopup();
        },
        error: function(xhr, status, error) {
            console.error('Error:', error);
        }
    });
}


function openSettingsPopup() {
    document.getElementById("settingsPopup").style.display = "block";
}


function closeSettingsPopup() {
    document.getElementById("settingsPopup").style.display = "none";
}


// First time init
getSettings();
$('#stats_popup_but').click(() => {
    openStatsPopup();
    handleGetStats();
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


function loadStats(data) {

    const stats_list = document.getElementById('stats_list');
    stats_list.replaceChildren();

    let text = `<h4>Statistiques</h4>`;
    text += `Aliments les plus vendus:<br><br>`;

    for (let i = 0; i < data[1].length || i < 5; i++) {
        // ...
    }

    text += `Temps de préparation le plus long: ${data[2]} min.<br>`;
    text += `Temps de préparation le plus rapide: ${data[3]} min.<br>`;
    text += `Moyenne de temps de préparation: ${data[4]} min.<br>`;

    // stats_list.append(data);
    stats_list.innerHTML = text;

}


async function handleGetStats() {

    statsLoadAnim(true);
    try {
        const response = await fetch('/leresto/server/controllers/statsController.php', {
            method: 'GET',
        });
        await new Promise(resolve => setTimeout(resolve, 2000)); // fake network lag
        const response_data = await response.json();
        if (!response_data[0]) {
            throw new Error(response_data[1]);
        }
        else {
            loadStats(response_data);
        }
    }
    catch (e) {
        console.error("Error: " + e);
        showErrorNotif(e);
    }
    finally {
        statsLoadAnim(false);
    }

}


// stats popup loading animation
function statsLoadAnim(state) {

    document.getElementById('stats_popup_load_anim').style.display = state ? "flex" : "none";
    
}
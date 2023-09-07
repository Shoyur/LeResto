$('#history_popup_but').click(() => {
    openHistoryPopup();
});


async function openHistoryPopup() {

    $('#finished_orders').empty();

    const orders = await handleGetFinishedOrdersRequest();
    console.warn("Voici les orders :")
    console.warn(orders);
    var divContent = '';
    if (orders.length > 0) {
        document.getElementById("history_put_back_but").disabled = false;
        document.getElementById("history_popup_archive").disabled = false;
        document.getElementById("id_order").disabled = false;
        let new_order = 0;
        divContent = '<h2>Commandes terminées</h2>';
        $.each(orders, function(index, order) {
            if (order.order_id != new_order) {
                new_order = order.order_id;
                divContent += '<p><u>Commande no. ' + order.order_id;
                divContent += order.order_deliv ? ' (À livrer)</u>' : ' (Pour emporter)</u>';
                order.user_id ? divContent += "<br><b>ID client:</b> " + order.user_id : null;
                divContent += "<br><b>Total facturé:</b> $" + order.order_total / 100;
                divContent += "<br><b>Nom:</b> " + order.order_name;
                divContent += "<br><b>Adresse:</b> " + order.order_address;
                divContent += "<br><b>Téléphone:</b> " + order.order_phone;
                divContent += "<br><b>Notes sur la commande:</b> " + order.order_notes;
                divContent += "<br><b>Carte, 4 premiers chiffres:</b> " + order.order_cc_last4;
                divContent += "<br><b>Commande passée le:</b> " + order.order_date;
                divContent += "<br><b>Commande terminée le:</b> " + order.order_date_finished;
                const time_diff = new Date(order.order_date_finished) - new Date(order.order_date);
                const minutes = Math.floor((time_diff / (1000 * 60)));
                const seconds = Math.floor((time_diff % (1000 * 60)) / 1000);
                divContent += "<br><b>Temps de traitement:</b> " + `${minutes}m ${seconds}s`;
                divContent += "<br><b>Détails de la commande:</b> ";
            }
            divContent += "<br><span>1<span>" + order.food_name + '' + (order.food_options ? ' (' + order.food_options + ')' : '');
        });
        $('#finished_orders').html(divContent);
    }
    else {
        $('#finished_orders').text('Aucune commande terminée, ou tous archivées.');
        document.getElementById("history_put_back_but").disabled = true;
        document.getElementById("history_popup_archive").disabled = true;
        document.getElementById("id_order").disabled = true;
    }

    $('#history_put_back_but').off('click').on('click', function() {
        var id = parseInt($('#id_order').val());
        if (typeof id === 'number' && id > 0 && Math.floor(id) === id) { 
            handlePutBackOrderRequest(id);
            // openHistoryPopup();
            getOpenOrders();
            closeHistoryPopup();
        }
    });

    $('#history_popup_archive').off('click').on('click', function() {
        handleArchiveOrdersRequest();
    });

    $('#history_popup_cancel').off('click').on('click', function() {
        closeHistoryPopup(); 
    });

    $('#history_popup').fadeIn();

    $(document).on('keydown', function(e) {
        if (e.keyCode === 27) {
            closeHistoryPopup();
        }
    });

    $('#history_popup').on('click', function(e) {
        if (!$(e.target).closest('.history_popup_content').length) {
            closeHistoryPopup();
        }
    });

}

function closeHistoryPopup() {
    $('#history_popup').fadeOut();
    $(document).off('keydown');
    $('#history_popup').off('click');
}


async function handleGetFinishedOrdersRequest() {

    try {
        const response = await fetch('../../../server/controllers/orderController.php?status=finished', {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        });
        // await new Promise(resolve => setTimeout(resolve, 2000)); // fake network lag
        const response_data = await response.json();
        if (!response_data[0]) {
            throw new Error(response_data[1]);
        }
        else {
            console.warn("Voici response_data[1] :");
            console.warn(response_data[1]);
            return response_data[1];
        }
    }
    catch (e) {
        console.error("Error: " + e);
        showErrorNotif(e);
    }

}


async function handlePutBackOrderRequest(order_id) {

    try {
        const fetch_options = {
            order_id: order_id,
            order_finished: 0
        }
        const response = await fetch('../../../server/controllers/orderController.php', {
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
            console.log("La commande no." + response_data[1] + " a été remise en cuisine.");
        }
    }
    catch (e) {
        console.error("Error: " + e);
        showErrorNotif(e);
    }

}


async function handleArchiveOrdersRequest() {
    try {
        const fetch_options = {
            archive: true
        }
        const response = await fetch('../../../server/controllers/orderController.php', {
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
            console.log("Ces commandes ont été archivées.");
        }
    }
    catch (e) {
        console.error("Error: " + e);
        showErrorNotif(e);
    }

}
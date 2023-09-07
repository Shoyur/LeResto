function openOrderPopup(order) {

    var texte_title = 'Commande no. ' + order.order_id + (order.livrpick_commande ? ' (À livrer)' : ' (Pour emporter)');
    $('#order_popup_title').text(texte_title);
    $('#order_popup_descr').empty();

    order.user_id ? $('#order_popup_descr').append("<p><b>ID client:</b> " + order.user_id) : null;
    $('#order_popup_descr').append("<p><b>Total facturé:</b> $" + order.order_total / 100);
    $('#order_popup_descr').append("<p><b>Nom:</b> " + order.order_name);
    $('#order_popup_descr').append("<p><b>Adresse:</b> " + order.order_address);
    $('#order_popup_descr').append("<p><b>Téléphone:</b> " + order.order_phone);
    $('#order_popup_descr').append("<p><b>Notes sur la commande:</b> " + order.order_notes);
    $('#order_popup_descr').append("<p><b>Carte, 4 premiers chiffres:</b> " + order.order_cc_last4);

    $('#order_popup_finish').off('click').on('click', function() {
        HandleArchiveOrdersRequest(order.order_id);
    });
    $('#order_popup_cancel').off('click').on('click', function() {
        closeOrderPopup(); 
    });
    $('#order_popup').fadeIn();
    $(document).on('keydown', function(e) {
        if (e.keyCode === 27) {
            closeOrderPopup();
        }
    });
    $('#order_popup').on('click', function(e) {
        if (!$(e.target).closest('.order_popup_content').length) {
            closeOrderPopup();
        }
    });
}


function closeOrderPopup() {
    $('#order_popup').fadeOut();
    $(document).off('keydown');
    $('#order_popup').off('click');
}


async function HandleArchiveOrdersRequest(order_id) {
    try {
        const fetch_options = {
            order_id: order_id,
            order_finished: 1
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
            console.log("La commande no." + response_data[1] + " a été marquée comme terminée.")
            closeOrderPopup();
            handleOpenOrdersRequest();
        }
    }
    catch (e) {
        console.error("Error: " + e);
        showErrorNotif(e);
    }

}
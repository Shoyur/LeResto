function openOrderPopup(order) {

    var texte_title = 'Commande no. ' + order.order_id + (order.livrpick_commande ? ' (À livrer)' : ' (Pour emporter)');
    $('#order_popup_title').text(texte_title);
    $('#order_popup_descr').empty();

    $('#order_popup_descr').append("<p><b>ID client:</b> $" + order.order_total / 100);
    $('#order_popup_descr').append("<p><b>Nom:</b> " + order.order_name);
    $('#order_popup_descr').append("<p><b>Adresse:</b> " + order.order_address);
    $('#order_popup_descr').append("<p><b>Téléphone:</b> " + order.order_phone);
    $('#order_popup_descr').append("<p><b>Notes sur la commande:</b> " + order.order_notes);
    $('#order_popup_descr').append("<p><b>Carte, 4 premiers chiffres:</b> " + order.order_cc_last4);

    $('#order_popup_finish').off('click').on('click', function() {
        finishOrder(order.order_id);
    });
    $('#order_popup_cancel').off('click').on('click', function() {
        closeOrderPopup(); 
    });
    $('#order_popup').fadeIn();

    // fermer le popup si on pèse Enter
    $(document).on('keydown', function(e) {
        if (e.keyCode === 27) {
            closeOrderPopup();
        }
    });
    // fermer le popup si on clique ailleurs
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

function finishOrder(order_id) {

    var data = {
        order_id: order_id,
        order_finished: 1
    }
    $.ajax({
        url: '/monsystemeresto/app/controllers/orderController.php',
        type: 'PATCH',
        data: JSON.stringify(data),
        dataType: 'json',
        async: false,
        success: function(result) {
            if (result[0]) {
                console.log("La commande no." + result[1] + " a été marquée comme terminée.")
            } 
            else {
                console.error("Problème à mettre à jour la commande : " + result[1]);
            }
        },
        error: function(xhr, status, error) {
            console.log('Error:', error);
        }
    });

    closeOrderPopup();
    getOpenOrders();

}
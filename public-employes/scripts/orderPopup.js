function openOrderPopup(order) {

    var texte_title = 'Commande no. ' + order.id_commande;
    texte_title += order.livrpick_commande ? ' (À livrer)' : ' (Pour emporter)';
    $('#order_popup_title').text(texte_title);
    $('#order_popup_descr').empty();

    var details = JSON.parse(order.details_commande);
    $.each(details, function(index, item) {
        var qte = item[0];
        var nom = item[2];
        var options = item[3];

        var aliments = '<p><span>' + qte + '<span>' + nom + '' + (options ? ' (' + options + ')' : '');
        $('#order_popup_descr').append(aliments);
    });

    $('#order_popup_finish').off('click').on('click', function() {
        finishOrder(order.id_commande);
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

function finishOrder(id_commande) {

    $.ajax({
        url: '/monsystemeresto/app/controllers/commandeController.php',
        type: 'POST',
        data: {
            action: 'updateOrderFinish',
            id: id_commande,
            finished: 1
        },
        dataType: 'json',
        success: function(result) {
            if (result.success) {
                console.log("La commande a été marquée comme terminée.")
            } 
            else {
                console.error("Problème à mettre à jour la commande.");
            }
            
        },
        error: function(xhr, status, error) {
            console.log('Error:', error);
        }
    });

    closeOrderPopup();
    getOpenOrders();

}
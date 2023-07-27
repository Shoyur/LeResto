function getFinishedOrders() {
    return new Promise(function(resolve, reject) {
        $.ajax({
            url: '/monsystemeresto/app/controllers/orderController.php',
            async: false,
            type: 'POST',
            data: {
                action: 'getFinishedOrders'
            },
            dataType: 'json',
            success: function(orders) {
                resolve(orders);
            },
            error: function(xhr, status, error) {
                console.log('Error:', error);
                reject(error);
            }
        });
    });
}

function openHistoryPopup() {
    $('#finished_orders').empty();
    getFinishedOrders()
    .then(function(orders) {
        var divContent = ''; // Use a div instead of a textarea
        if (orders.length > 0) {
            divContent = '<h2>Commandes archivées</h2>'; // Use <p> tags for new paragraphs
            $.each(orders, function(index, order) {
                divContent += 'Commande no. ' + order.id_commande;
                divContent += order.livrpick_commande ? ' (À livrer)' : ' (Pour emporter)';
                var details = JSON.parse(order.details_commande);
                $.each(details, function(index, item) {
                    var qty = item[0];
                    var name = item[2];
                    var options = item[3];
                    divContent += '<br><span>' + qty + '</span><span>' + name + '</span>' + (options ? ' (' + options + ')' : '');
                });
                divContent += '</p>';
            });
            $('#finished_orders').html(divContent); // Use .html() to set the content with HTML formatting
        }
        else {
            $('#finished_orders').text('Aucune commande archivée');
        }
    })
    .catch(function(error) {
        console.error('Error:', error);
    });

    $('#history_put_back_but').off('click').on('click', function() {
        var id = $('#id_order').val();
        if (0 < id < 999) { 
            putBackOrder(id);
            openHistoryPopup();
            getOpenOrders();
        }
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

function putBackOrder(id_order) {
    $.ajax({
        url: '/monsystemeresto/app/controllers/orderController.php',
        type: 'POST',
        data: {
            action: 'updateOrderFinish',
            id: id_order,
            finished: 0
        },
        dataType: 'json',
        success: function(result) {
            if (result.success) {
                console.log("La commande a été remise en cuisine.")
            } 
            else {
                console.error("Problème à mettre à jour la commande ou ce no. de commande n'existe pas.");
            }
        },
        error: function(xhr, status, error) {
            console.log('Error:', error);
        }
    });
}
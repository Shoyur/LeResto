function getFinishedOrders() {
    return new Promise(function(resolve, reject) {
        $.ajax({
            url: '/monsystemeresto/app/controllers/orderController.php',
            async: false,
            type: 'POST',
            dataType: 'json',
            success: function(result) {
                if (result[0]) {
                    resolve(result[1]);
                }
                else {
                    console.log('Error:', result[1]);
                }
                
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
        var divContent = '';
        if (orders.length > 0) {
            divContent = '<h2>Commandes terminées</h2>';
            $.each(orders, function(index, order) {
                divContent += 'Commande no. ' + order.order_id;
                divContent += order.order_deliv ? ' (À livrer)' : ' (Pour emporter)';
                // var details = JSON.parse(order.details_commande);
                // $.each(details, function(index, item) {
                //     var qty = item[0];
                //     var name = item[2];
                //     var options = item[3];
                //     divContent += '<br><span>' + qty + '</span><span>' + name + '</span>' + (options ? ' (' + options + ')' : '');
                // });
                // divContent += '</p>';
            });
            $('#finished_orders').html(divContent);
        }
        else {
            $('#finished_orders').text('Aucune commande terminée, ou tous archivées.');
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

function putBackOrder(order_id) {
    $.ajax({
        url: '/monsystemeresto/app/controllers/orderController.php',
        type: 'POST',
        data: {
            order_id: order_id,
            order_finished: 0
        },
        dataType: 'json',
        success: function(result) {
            if (result[0]) {
                console.log("La commande a été remise en cuisine.")
            } 
            else {
                console.error("Problème à mettre à jour la commande : " + result[1]);
            }
        },
        error: function(xhr, status, error) {
            console.log('Error:', error);
        }
    });
}
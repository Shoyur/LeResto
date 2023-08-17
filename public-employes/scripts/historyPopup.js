$('#history_popup_but').click(() => {
    openHistoryPopup();
});


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

    getFinishedOrders().then(function(orders) {
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
                    order.user_id ? divContent += $('#order_popup_descr').append("<br><b>ID client:</b> " + order.user_id) : null;
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
    })
    .catch(function(error) {
        console.error('Error:', error);
    });

    $('#history_put_back_but').off('click').on('click', function() {
        var id = parseInt($('#id_order').val());
        if (typeof id === 'number' && id > 0 && Math.floor(id) === id) { 
            putBackOrder(id);
            // openHistoryPopup();
            getOpenOrders();
            closeHistoryPopup();
        }
    });

    $('#history_popup_archive').off('click').on('click', function() {
        archiveOrders();
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

    var data = {
        order_id: order_id,
        order_finished: 0
    }
    $.ajax({
        url: '/monsystemeresto/app/controllers/orderController.php',
        type: 'PATCH',
        data: JSON.stringify(data),
        dataType: 'json',
        async: false,
        success: function(result) {
            if (result[0]) {
                console.log("La commande no." + result[1] + " a été remise en cuisine.")
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

function archiveOrders() {
    var data = {
        archive: true
    }
    $.ajax({
        url: '/monsystemeresto/app/controllers/orderController.php',
        type: 'PATCH',
        data: JSON.stringify(data),
        dataType: 'json',
        async: false,
        success: function(result) {
            if (result[0]) {
                console.log("Ces commandes ont été archivées.")
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
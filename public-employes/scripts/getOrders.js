let interval_refresh;

$(document).ready(function() {
    // first time init
    getOpenOrders();
    // automatic refresh
    interval_refresh = setInterval(getOpenOrders, refresh ? refresh * 1000 : 5000);

});

function getOpenOrders() {
    $.ajax({
        url: '/monsystemeresto/app/controllers/commandeController.php',
        async: false,
        type: 'POST',
        data: {
            action: 'getOpenOrders'
        },
        dataType: 'json',
        success: function(orders) {
            showOpenOrders(orders);
        },
        error: function(xhr, status, error) {
            console.log('Error:', error);
        }
    });
}

function showOpenOrders(orders) {
    $('#orders_list').empty();
    $('#orders_count').text(orders.length + ' commande(s) en cours');

    if (orders.length > 0) {
        $.each(orders, function(index, order) {

            var order_card = $('<div>').addClass('order_card');

            var title1 = $('<h3>').text('Commande no. ' + order.id_commande);
            order_card.append(title1);
            var title2 = $('<h3>').text(order.livrpick_commande ? '(À livrer)' : '(Pour emporter)');
            order_card.append(title2);
            const m = Math.floor(order.attente / 60);
            const s = order.attente % 60;
            var title3 = $('<h3>').text('[Attente : ' + `${m} min. ${s} sec.` + ']');
            order_card.append(title3);

            if (color_change) {
                if (order.attente > interval_2) {
                    order_card.addClass('card_border_c2');
                } 
                else if (order.attente > interval_1) {
                    order_card.addClass('card_border_c1');
                }
            }

            var details = JSON.parse(order.details_commande)
            $.each(details, function(i, item) {
                var qte = item[0];
                var nom = item[2];
                var options = item[3];
        
                var cr = $('<p>').text('');
                order_card.append(cr);
        
                var texte_qte = $('<span>').text(qte);
                order_card.append(texte_qte);
                
                var texte_aliment = nom + '' + (options ? ' (' + options + ')' : '');
                var aliment = $('<span>').text(texte_aliment);
                order_card.append(aliment);
            });

            order_card.click(function() {
                openOrderPopup(order);
            });

            $('#orders_list').append(order_card);
        });
    }
}
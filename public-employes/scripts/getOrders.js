let interval_refresh;

$(document).ready(function() {
    // first time init
    getOrders();
    // automatic refresh
    // interval_refresh = setInterval(getOrders, refresh ? refresh * 1000 : 5000);

});

function getOrders() {
    $.ajax({
        url: '/monsystemeresto/app/controllers/orderController.php',
        async: false,
        type: 'GET',
        dataType: 'json',
        success: function(result) {
            if (result[0]) {
                showOpenOrders(result[1]);
            }
            else {
                console.log('Error:', result[1]);
            }
            
        },
        error: function(xhr, status, error) {
            console.log('Error:', error);
        }
    });
}


function showOpenOrders(orders) {

    $('#orders_list').empty();

    let how_many_orders = 0;
    const order_ids_count = {};
    for (const obj of orders) {
        const order_id = obj.order_id;
        order_ids_count[order_id] = (order_ids_count[order_id] || 0) + 1;
    }
    how_many_orders = Object.keys(order_ids_count).length;

    $('#orders_count').text(how_many_orders + ' commande(s) en cours');

    if (how_many_orders > 0) {

        var new_order = 0;
        var order_card;
        orders.forEach((order, index) => {
            if (new_order != order.order_id) {
                if (new_order != 0) {
                    $('#orders_list').append(order_card);
                    order_card.click(function() {
                        // openOrderPopup(order);
                        console.log(order);
                    });
                    console.log("Fin de card order # " + order.order_id);
                } 
                new_order = order.order_id;

                order_card = $('<div>').addClass('order_card');
                let title1 = $('<h3>').text('Commande no. ' + order.order_id);
                order_card.append(title1);
                var title2 = $('<h3>').text(order.order_deliv ? '(À livrer)' : '(Pour emporter)');
                order_card.append(title2);
                const m = Math.floor(order.delay / 60);
                const s = order.delay % 60;
                var title3 = $('<h3>').text('[Attente : ' + `${m} min. ${s} sec.` + ']');
                order_card.append(title3);

                if (color_change) {
                    if (order.delay > interval_2) {
                        order_card.addClass('card_border_c2');
                    } 
                    else if (order.delay > interval_1) {
                        order_card.addClass('card_border_c1');
                    }
                }
            }

            var cr = $('<p>').text('');
            order_card.append(cr);

            var texte_qte = $('<span>').text("1");
            order_card.append(texte_qte);

            var texte_aliment = order.food_name + '' + (order.food_options ? ' (' + order.food_options + ')' : '');
            var aliment = $('<span>').text(texte_aliment);
            order_card.append(aliment);

            if (orders.length == (index + 1)) {
                $('#orders_list').append(order_card);
                order_card.click(function() {
                    openOrderPopup(order);
                });
            }
        });

    }
}
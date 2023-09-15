let interval_refresh;
let orders;

$(document).ready(function() {

    // first time init
    handleGetOpenOrdersRequest();

    // automatic refresh
    interval_refresh = setInterval(function() {
        handleGetOpenOrdersRequest();
    }, refresh ? refresh * 1000 : 5000);

});


async function handleGetOpenOrdersRequest() {

    try {
        const response = await fetch('/leresto/server/controllers/orderController.php?status=current', {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        });
        // await new Promise(resolve => setTimeout(resolve, 2000)); // fake network lag
        const response_data = await response.json();
        if (!response_data[0]) {
            throw new Error(response_data[1]);
        }
        else {
            orders = response_data[1];
            showOpenOrders();
        }
    }
    catch (e) {
        console.error("Error: " + e);
        showErrorNotif(e);
    }

}


function showOpenOrders() {

    $('#orders_list').empty();

    let how_many_orders = 0;
    const order_ids_count = {};
    for (const obj of orders) {
        const order_id = obj.order_id;
        order_ids_count[order_id] = (order_ids_count[order_id] || 0) + 1;
    }
    how_many_orders = Object.keys(order_ids_count).length;

    if (how_many_orders > 0) {

        let new_order = 0;
        let order_card;
        orders.forEach((order, index) => {
            if (new_order != order.order_id) {
                if (new_order != 0) {
                    $('#orders_list').append(order_card);
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
                order_card.click(function() {
                    openOrderPopup(order);
                });
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
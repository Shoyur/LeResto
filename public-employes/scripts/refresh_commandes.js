$(document).ready(function() {

    // VARIABLE POUR LE POPUP (COMMANDE SÉLECTIONNÉE À TERMINER)
    var selectedOrder;

    function getOrders() {
        $.ajax({
            url: 'client/pages/get_orders.php',
            type: 'GET',
            dataType: 'json',
            success: function(response) {
                // Process the response from the server
                displayOrders(response);
            },
            error: function(xhr, status, error) {
                console.log('Error:', error);
            }
        });
    }

    function displayOrders(orders) {
        // Clear previous order list
        $('#order-list').empty();
        $('#combien').text(orders.length);
    
        // Append orders as clickable cards to the order list
        if (orders.length > 0) {
            var currentTime = new Date(); // Get the current time once
    
            $.each(orders, function(index, order) {
                var orderId = order[0];
                var phpToJsDate = new Date(order[1]);
                var differenceInMinutes = Math.floor((currentTime - phpToJsDate) / (1000 * 60));
                var orderItems = order.slice(2);
    
                var card = $('<div>').addClass('card');
                var orderTitle = $('<h3>').text('Commande # ' + orderId + ' (Attente de ' + differenceInMinutes + ' min.)');
                card.append(orderTitle);

                
    
                $.each(orderItems, function(i, item) {
                    var quantity = item[0];
                    var itemName = item[1];
                    var specialInstructions = item[2];
    
                    var itemDescription = quantity + ' x ' + itemName;
                    if (specialInstructions) {
                        itemDescription += ' (' + specialInstructions + ')';
                    }
    
                    var itemElement = $('<p>').text(itemDescription);
                    card.append(itemElement);
                });
    
                card.click(function() {
                    // Set selectedOrder and open the order popup
                    selectedOrder = orderId;
                    openOrderPopup(order);
                });
    
                $('#order-list').append(card);
            });
        } else {
            $('#order-list').text('No orders available.');
        }
    }

    function openOrderPopup(order) {
        var orderId = order[0];
        var orderItems = order.slice(2);

        $('#order-title').text('Commande # ' + orderId);
        $('#order-description').empty();

        $.each(orderItems, function(index, item) {
            var quantity = item[0];
            var itemName = item[1];
            var specialInstructions = item[2];

            var itemDescription = quantity + ' x ' + itemName;
            if (specialInstructions) {
                itemDescription += ' (' + specialInstructions + ')';
            }

            var itemElement = $('<p>').text(itemDescription);
            $('#order-description').append(itemElement);
        });

        $('#mark-finished-button').off('click').on('click', function() {
            markOrderAsFinished(orderId);
        });

        $('.close-button').off('click').on('click', function() {
            closeOrderPopup();
        });

        $('#order-popup').fadeIn();

        // Close the order popup when pressing Escape
        $(document).on('keydown', function(e) {
            if (e.keyCode === 27) {
                closeOrderPopup();
            }
        });
        // Close the order popup when clicking outside the popup container
        $('#order-popup').on('click', function(e) {
            if (!$(e.target).closest('.order-details').length) {
                closeOrderPopup();
            }
        });
    }

    function closeOrderPopup() {
        $('#order-popup').fadeOut();
        $(document).off('keydown');
        $('#order-popup').off('click');
    }

    function markOrderAsFinished(order) {
        // Send request to the server to mark the order as finished
        // Example: $.post('mark_order_finished.php', { order: order }, function(response) { });

        // Close the order popup
        closeOrderPopup();
    }

    // Call getOrders() function initially
    getOrders();

    // Refresh order list every 5 seconds
    // setInterval(getOrders, 5000);
});
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

                console.log('*** SUCCESS 1');

            },
            error: function(xhr, status, error) {
                console.log('Error:', error);
            }
        });
    }

    function displayOrders(orders) {
        $('#liste-commandes').empty();

        $('#combien').text(orders.length);
        if (orders.length > 0) {
            var orderList = $('<ul>');
            $.each(orders, function(index, order) {
                var card = $('<div>').addClass('card').text(order);
                card.click(function() {
                    selectedOrder = order;
                    openOrderPopup(order);
                });
                $('#liste-commandes').append(card);
            });
            $('#liste-commandes').append(orderList);
        } else {
            $('#liste-commandes').text('Aucune commande.');
        }
    }

    function openOrderPopup(order) {
        $('#order-title').text('Order: ' + order);
        $('#order-description').text('Order details: Lorem ipsum dolor sit amet, consectetur adipiscing elit.');

        $('#mark-finished-button').off('click').on('click', function() {
            markOrderAsFinished(order);
        });
        $('.close-button').off('click').on('click', function() {
            closeOrderPopup();
        });
        $('#order-popup').fadeIn();
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
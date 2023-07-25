var cart_data = [];


function openCartPopup() {
    $('#cart_list').empty();


    // getFinishedOrders()
    // .then(function(orders) {
    //     var divContent = ''; // Use a div instead of a textarea
    //     if (orders.length > 0) {
    //         divContent = '<h2>Commandes archivées</h2>'; // Use <p> tags for new paragraphs
    //         $.each(orders, function(index, order) {
    //             divContent += 'Commande no. ' + order.id_commande;
    //             divContent += order.livrpick_commande ? ' (À livrer)' : ' (Pour emporter)';
    //             var details = JSON.parse(order.details_commande);
    //             $.each(details, function(index, item) {
    //                 var qty = item[0];
    //                 var name = item[2];
    //                 var options = item[3];
    //                 divContent += '<br><span>' + qty + '</span><span>' + name + '</span>' + (options ? ' (' + options + ')' : '');
    //             });
    //             divContent += '</p>';
    //         });
    //         $('#finished_orders').html(divContent); // Use .html() to set the content with HTML formatting
    //     }
    //     else {
    //         $('#finished_orders').text('Aucune commande archivée');
    //     }
    // })
    // .catch(function(error) {
    //     console.error('Error:', error);
    // });


    // $('#history_put_back_but').off('click').on('click', function() {
    //     var id = $('#id_order').val();
    //     if (0 < id < 999) { 
    //         putBackOrder(id);
    //         openHistoryPopup();
    //         getOpenOrders();
    //     }
    // });


    $('#cart_popup_close').off('click').on('click', function() {
        closeCartPopup(); 
    });
    $('#cart_popup').fadeIn();
    $(document).on('keydown', function(e) {
        if (e.keyCode === 27) {
            closeCartPopup();
        }
    });
    $('#cart_popup').on('click', function(e) {
        if (!$(e.target).closest('.cart_popup_content').length) {
            closeCartPopup();
        }
    });
}


function closeCartPopup() {
    $('#cart_popup').fadeOut();
    $(document).off('keydown');
    $('#cart_popup').off('click');
}


function cardAddToCart(food, qty) {
    for (let i = 0; i < qty; i++) {
        cart_data.push(food);
    }
    updateCartIconQty();
}


function updateCartIconQty() {
    var cart_qty = document.getElementById('cart_qty');
    cart_qty.classList.add('cart_qty_anim');
    cart_qty.addEventListener('animationend', function() {
        cart_qty.classList.remove('cart_qty_anim');
    }, { once: true });
    cart_qty.innerText = cart_data.length;
}


window.addEventListener('beforeunload', function (event) {
    localStorage.setItem('Le_Resto_cart_data', JSON.stringify(cart_data));
});


document.addEventListener('DOMContentLoaded', function () {
    const saved_cart_data = localStorage.getItem('Le_Resto_cart_data');
    if (saved_cart_data) {
        cart_data = JSON.parse(saved_cart_data);
        updateCartIconQty();
    }
    else {
        cart_data = [];
    }
});
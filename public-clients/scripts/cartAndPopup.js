var cart_data = [];


function openCartPopup() {

    if (!cart_data.length) { return; }

    $('#cart_list').empty();

    const cart_list = document.getElementById('cart_list');
    var stotal = 0;
    cart_data.forEach(item => {
        cart_list.append(createCartItem(item));
        stotal += item.food_price;
    });

    const cart_numbers = document.getElementById('cart_numbers');
    var numbers = ""; ////////////////////////////////////////////////////////////////////////// BUG s'ajoute chaque fois
    numbers += "Sous-total " + stotal;
    const tps = stotal * 0.05;
    numbers += "\nTPS " + tps;
    const tvq = stotal * 0.9975;
    numbers += "\nTVQ " + tvq;
    numbers += "Total " + (stotal + tps + tvq);
    cart_numbers.append(numbers);

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


function createCartItem(item) {
    const cart_list_item = document.createElement("div");
    cart_list_item.classList.add('cart_list_item');
    const image = document.createElement('img');
    image.src = '/monsystemeresto/public-clients/aliments/images/' + item.food_image;
    image.alt = 'img alt : ' + item.food_name;
    cart_list_item.appendChild(image);


    return cart_list_item;
}


window.addEventListener('beforeunload', function (event) {
    localStorage.setItem('Le_Resto_cart_data', JSON.stringify(cart_data));
});


document.addEventListener('DOMContentLoaded', function () {
    const cart_popup_but = document.getElementById('cart_popup_but');
    cart_popup_but.addEventListener('click', function() {
        openCartPopup();
    });
    const saved_cart_data = localStorage.getItem('Le_Resto_cart_data');
    if (saved_cart_data) {
        cart_data = JSON.parse(saved_cart_data);
        updateCartIconQty();
    }
    else {
        cart_data = [];
    }
});
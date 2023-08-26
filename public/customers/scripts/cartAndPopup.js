const TPS = 0.05;
const TVQ = 0.09875;

// global for any functions
var cart_data = [];

// value to update the pay button text
var pay_button_total = "";


function openCartPopup() {

    // don't open cart popup if cart empty
    if (!cart_data.length) { return; }

    // be sure to open page 1 (cart content)
    document.getElementById("cart_popup_food_content").style.display = "block";
    document.getElementById("cart_popup_payment_content").style.display = "none";
    document.getElementById("cart_popup_confirmation_content").style.display = "none";

    // empty the list first
    $('#cart_list').empty();

    // fill it with all food cards
    const cart_list = document.getElementById('cart_list');
    cart_data.forEach((item, index) => {
        cart_list.append(createCartItem(item, index));
    });

    updateCartNumbers();

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

function updateCartNumbers() {

    $('#cart_numbers').empty();

    var stotal = 0;
    cart_data.forEach((item, index) => {
        stotal += item.food_price;
    });

    const calc_tps = stotal * TPS;
    const calc_tvq = stotal * TVQ;
    const calc_total = stotal + calc_tps + calc_tvq;

    // global for pay button text
    pay_button_total = "$" + (Math.ceil(calc_total * 100) / 100).toFixed(2);

    const cart_numbers = document.getElementById('cart_numbers');
    cart_numbers.classList.add('cart_numbers');

    // line 1 (stotal)
    const cart_numbers_row_1 = document.createElement("div");
    cart_numbers_row_1.classList.add('cart_numbers_row');
    // line 1 - left
    const cart_numbers_left_1 = document.createElement("div");
    cart_numbers_left_1.classList.add('cart_numbers_left');
    cart_numbers_left_1.textContent = "Sous-total";
    cart_numbers_row_1.appendChild(cart_numbers_left_1);
    // line 1 - right
    const cart_numbers_right_1 = document.createElement("div");
    cart_numbers_right_1.classList.add('cart_numbers_right');
    cart_numbers_right_1.textContent = "$" + (Math.ceil(stotal * 100) / 100).toFixed(2);
    cart_numbers_row_1.appendChild(cart_numbers_right_1);

    // line 2 (tps)
    const cart_numbers_row_2 = document.createElement("div");
    cart_numbers_row_2.classList.add('cart_numbers_row');
    // line 2 - left
    const cart_numbers_left_2 = document.createElement("div");
    cart_numbers_left_2.classList.add('cart_numbers_left');
    cart_numbers_left_2.textContent = "TPS";
    cart_numbers_row_2.appendChild(cart_numbers_left_2);
    // line 2 - right
    const cart_numbers_right_2 = document.createElement("div");
    cart_numbers_right_2.classList.add('cart_numbers_right');
    cart_numbers_right_2.textContent = "$" + (Math.ceil(calc_tps * 100) / 100).toFixed(2);
    cart_numbers_row_2.appendChild(cart_numbers_right_2);

    // line 3 (tvq)
    const cart_numbers_row_3 = document.createElement("div");
    cart_numbers_row_3.classList.add('cart_numbers_row');
    // line 3 - left
    const cart_numbers_left_3 = document.createElement("div");
    cart_numbers_left_3.classList.add('cart_numbers_left');
    cart_numbers_left_3.textContent = "TVQ";
    cart_numbers_row_3.appendChild(cart_numbers_left_3);
    // line 3 - right
    const cart_numbers_right_3 = document.createElement("div");
    cart_numbers_right_3.classList.add('cart_numbers_right');
    cart_numbers_right_3.textContent = "$" + (Math.ceil(calc_tvq * 100) / 100).toFixed(2);
    cart_numbers_row_3.appendChild(cart_numbers_right_3);

    // line 4 (total)
    const cart_numbers_row_4 = document.createElement("div");
    cart_numbers_row_4.classList.add('cart_numbers_row');
    // line 4 - left
    const cart_numbers_left_4 = document.createElement("div");
    cart_numbers_left_4.classList.add('cart_numbers_left');
    cart_numbers_left_4.textContent = "Total";
    cart_numbers_row_4.appendChild(cart_numbers_left_4);
    // line 4 - right
    const cart_numbers_right_4 = document.createElement("div");
    cart_numbers_right_4.classList.add('cart_numbers_right');
    cart_numbers_right_4.textContent = pay_button_total;
    cart_numbers_row_4.appendChild(cart_numbers_right_4);

    cart_numbers.appendChild(cart_numbers_row_1);
    cart_numbers.appendChild(cart_numbers_row_2);
    cart_numbers.appendChild(cart_numbers_row_3);
    cart_numbers.appendChild(cart_numbers_row_4);
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
    
    const cart_qty = document.getElementById('cart_qty');

    // force restart of animation in case an item is added during the animation
    cart_qty.classList.remove('cart_qty_anim');
    void cart_qty.offsetWidth;

    cart_qty.innerText = cart_data.length;
    cart_qty.classList.add('cart_qty_anim');
    cart_qty.addEventListener('animationend', function() {
        cart_qty.classList.remove('cart_qty_anim');
    }, { once: true });
    
}


function createCartItem(item, index) {

    const cart_list_item = document.createElement("div");
    cart_list_item.classList.add('cart_list_item');

    const image = document.createElement('img');
    image.src = '../../server/food/' + item.food_image;
    image.alt = 'img alt : ' + item.food_name;
    cart_list_item.appendChild(image);

    const cart_list_item_text = document.createElement("div");
    cart_list_item_text.classList.add('cart_list_item_text');

    const cart_list_item_name = document.createElement("div");
    cart_list_item_name.classList.add('cart_list_item_name');
    cart_list_item_name.textContent = item.food_name;
    cart_list_item_text.appendChild(cart_list_item_name);

    const cart_list_item_price = document.createElement("div");
    cart_list_item_price.classList.add('cart_list_item_price');
    cart_list_item_price.textContent = "$" + item.food_price.toFixed(2);
    cart_list_item_text.appendChild(cart_list_item_price);

    // const cart_list_item_options = document.createElement("div");
    // cart_list_item_options.classList.add('cart_list_item_options');
    // cart_list_item_options.textContent = item.food_options;
    // cart_list_item_text.appendChild(cart_list_item_options);

    cart_list_item.appendChild(cart_list_item_text);

    const cart_list_item_delete_div = document.createElement("div");
    cart_list_item_delete_div.classList.add('cart_list_item_delete');

    const cart_list_item_delete_icon = document.createElement("i");
    cart_list_item_delete_icon.classList.add('fa-solid');
    cart_list_item_delete_icon.classList.add('fa-trash');
    cart_list_item_delete_icon.addEventListener('click', function(event) {

        event.stopPropagation();

        const listItem = event.target.closest(".cart_list_item");
        const list = listItem.parentElement;

        listItem.style.transition = "opacity 0.3s, transform 0.3s";
        listItem.style.opacity = "0";
        listItem.style.transform = "scale(0.8)";

        setTimeout(() => {
            cart_data.splice(index, 1);
            updateCartIconQty();

            list.removeChild(listItem);

            const cart_list = document.getElementById('cart_list');
            cart_list.innerHTML = '';

            cart_data.forEach((item, newIndex) => {
                const cartItem = createCartItem(item, newIndex);
                cart_list.appendChild(cartItem);
            });

            updateCartNumbers();
            if (cart_data.length < 1) { closeCartPopup(); }

        }, 300);
        

    });

    cart_list_item_delete_div.appendChild(cart_list_item_delete_icon);
    cart_list_item.appendChild(cart_list_item_delete_div);

    return cart_list_item;
}


function showCartPopupPayment() {

    // switch page
    const cart_popup_food_content = document.getElementById("cart_popup_food_content");
    const cart_popup_payment_content = document.getElementById("cart_popup_payment_content");
    cart_popup_food_content.style.display = "none";
    cart_popup_payment_content.style.display = "block";

    // update Pay button with $ total
    const cart_pay_but = document.getElementById("cart_pay_but");
    cart_pay_but.textContent = "Payer " + pay_button_total;

    // fill credit card months select
    const cc_exp_m = document.getElementById("cc_exp_m");
    cc_exp_m.innerHTML = "";
    for (let i = 1; i <= 12; i++) {
        const option = document.createElement('option');
        option.value = i;
        option.text = i.toString().padStart(2, '0');
        cc_exp_m.appendChild(option);
    }

    // fill credit card years select
    const cc_exp_y = document.getElementById("cc_exp_y");
    cc_exp_y.innerHTML = "";
    const current_year = (new Date()).getFullYear();
    for (let i = 0; i < 16; i++) {
        const option = document.createElement('option');
        option.value = current_year + i;
        option.text = (current_year + i).toString();
        cc_exp_y.appendChild(option);
    }
}


function ccNumberFormat(input) {

    let num = input.value.replace(/\D/g, '');
    const pattern = /(\d{1,4})(\d{1,4})(\d{1,4})(\d{1,4})/;
    
    // Apply the pattern and insert spaces between groups
    num = num.replace(pattern, '$1 $2 $3 $4');
    
    // Update the input value
    input.value = num;

}

function ccCVCFormat(input) {

    let num = input.value.replace(/\D/g, '');

    if (num.length > 3) { num = num.substring(0, 3); }
    
    // Update the input value
    input.value = num;

}


// on browser window close, save the cart
window.addEventListener('beforeunload', function (event) {
    localStorage.setItem('Le_Resto_cart_data', JSON.stringify(cart_data));
    // setCookie('Le_Resto_cart_data', JSON.stringify(cart_data), 12);
});


document.addEventListener('DOMContentLoaded', function () {

    // nav cart popup icon (button)
    const cart_popup_but = document.getElementById('cart_popup_but');
    cart_popup_but.addEventListener('click', function() {
        openCartPopup();
    });

    // close if any click outside of popup
    $('#cart_popup').on('click', function(e) {
        if (!$(e.target).closest('.cart_popup_content').length) {
            closeCartPopup();
        }
    });

    // cart popup content checkout button
    const cart_popup_checkout = document.getElementById('cart_popup_checkout');
    cart_popup_checkout.addEventListener('click', function() {
        showCartPopupPayment();
    });

    // cart popup content close button
    $('#cart_popup_close').off('click').on('click', function() {
        closeCartPopup(); 
    });

    // cart popup order confirmation close button
    $('#cart_popup_confirmation_close').off('click').on('click', function() {
        closeCartPopup(); 
    });

    // check for local saved cart
    const saved_cart_data = localStorage.getItem('Le_Resto_cart_data');
    // const saved_cart_data = getCookie('Le_Resto_cart_data');
    if (saved_cart_data) {
        cart_data = JSON.parse(saved_cart_data);
        updateCartIconQty();
    }
    else {
        cart_data = [];
    }
});
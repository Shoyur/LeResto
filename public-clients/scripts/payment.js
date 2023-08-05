Stripe.setPublishableKey("pk_test_51NYwc3ITtGQD7Q56MWtMXAzc8cCfdWfZPuf4hLWAmfwNy1QhwExdae3Cj2COucvxJJhWizXwlxwVUNKQ4mzIMwSn00OwKbAdaA")

function stripeResponseHandler(status, response) {

    

    if (response.error) {
        // re-enable the payment submit button
        document.getElementById("cart_pay_but").disabled = false;
        // show red error message
        $(".payment_errors").html(response.error.message);
        paymentWaitingStop();
    } 

    else {

        var order_details = {
            stripeToken: response['id'],
            customer_id: null,
            order_name: "John",
            order_address: "123, de la rue",
            order_phone: "514-123-4567",
            order_cc_last4: "0000",
            order_deliv: 1,
            order_notes: "",
            cart_data: sanitizeForOrder(cart_data),
        };

        $.ajax({
            url: '/monsystemeresto/app/stripe/submitOrder.php',
            type: 'POST',
            data: order_details,
            dataType: 'json',
            success: function(result) {

                if (result.ok == true) {
                    $("#cart_confirmation_text").html(result.text);
                    paymentWaitingStop();

                    document.getElementById("cart_popup_payment_content").style.display = "none";
                    document.getElementById("cart_popup_confirmation_content").style.display = "block";

                    cart_data = [];
                    updateCartIconQty();
                    
                }

                else {
                    document.getElementById("cart_pay_but").disabled = false;
                    $(".payment_errors").html(result.text);
                    paymentWaitingStop();                 
                }
                
            },
            error: function(xhr, status, error) {
                console.log('Error:', error);
                paymentWaitingStop();
            }
        });
    }

}


function sanitizeForOrder(cart_data) {
    return cart_data.map(item => {
        return [item.food_id, item.food_options];
    });
}


function submitPayment() {

    // disable the submit button to prevent repeated clicks
    document.getElementById("cart_pay_but").disabled = true;
    $(".payment_errors").text("");

    paymentWaitingStart();

    // create single-use token to charge the user
    Stripe.createToken({
        number: $('.cc_number').val(),
        cvc: $('.cc_cvc').val(),
        exp_month: $('.cc_exp_m').val(),
        exp_year: $('.cc_exp_y').val()
    }, stripeResponseHandler);
    
    // submit from callback
    return false;

}


function paymentWaitingStart() {
    document.body.classList.add('no-scroll');
    document.getElementById('disabled_overlay').style.display = "flex"
    document.getElementById("lds_roller_2").style.display = "inline-block";
}


function paymentWaitingStop() {
    document.body.classList.remove('no-scroll');
    document.getElementById('disabled_overlay').style.display = "none"
    document.getElementById("lds_roller_2").style.display = "none";
}


document.addEventListener('DOMContentLoaded', function () {

    // cart popup payment pay-now button
    const cart_pay_but = document.getElementById('cart_pay_but');
    cart_pay_but.addEventListener('click', function() {
        submitPayment();
    });

    // cart popup payment cancel button
    const cart_pay_cancel = document.getElementById('cart_pay_cancel');
    cart_pay_cancel.addEventListener('click', function() {
        document.getElementById("cart_popup_food_content").style.display = "block";
        document.getElementById("cart_popup_payment_content").style.display = "none";
    });

});
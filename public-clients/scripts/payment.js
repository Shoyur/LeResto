Stripe.setPublishableKey('pk_test_51NYwc3ITtGQD7Q56MWtMXAzc8cCfdWfZPuf4hLWAmfwNy1QhwExdae3Cj2COucvxJJhWizXwlxwVUNKQ4mzIMwSn00OwKbAdaA');

function stripeResponseHandler(status, response) {
    if (response.error) {
        //enable the payment submit button
        $('#cart_pay_but').removeAttr("disabled");
        $(".payment_errors").html(response.error.message);
    } 
    else {
        var form$ = $("#payment_form");
        // get token id
        var token = response['id'];
        // insert the token into the form
        form$.append("<input type='hidden' name='stripeToken' value='" + token + "' />");
        //submit form to the server
        form$.get(0).submit();
    }
}


function submitPayment() {

    // disable the submit button to prevent repeated clicks
    $('#cart_pay_but').attr("disabled", "disabled");

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


document.addEventListener('DOMContentLoaded', function () {

    // cart popup payment pay-now button
    const cart_pay_but = document.getElementById('cart_pay_but');
    cart_pay_but.addEventListener('click', function() {
        submitPayment();
    });

    // cart popup payment cancel button
    const cart_pay_cancel = document.getElementById('cart_pay_cancel');
    cart_pay_cancel.addEventListener('click', function() {
        const cart_popup_food_content = document.getElementById("cart_popup_food_content");
        const cart_popup_payment_content = document.getElementById("cart_popup_payment_content");
        cart_popup_food_content.style.display = "block";
        cart_popup_payment_content.style.display = "none";
    });

    // $('.cc_number').formatCardNumber();

});
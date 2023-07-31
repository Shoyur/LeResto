Stripe.setPublishableKey("pk_test_51NYwc3ITtGQD7Q56MWtMXAzc8cCfdWfZPuf4hLWAmfwNy1QhwExdae3Cj2COucvxJJhWizXwlxwVUNKQ4mzIMwSn00OwKbAdaA")

function stripeResponseHandler(status, response) {
    if (response.error) {
        // re-enable the payment submit button
        document.getElementById("cart_pay_but").disabled = false;
        // show red error message
        $(".payment_errors").html(response.error.message);
    } 
    else {
        // en attendant car on doit envoyer le cart_data plutot..
        var order_details = {
            stripeToken: response['id'],
            name: "Une commande quelconque",
            total: Math.ceil(parseFloat(total * 100)),
        };
        $.ajax({
            url: '/monsystemeresto/app/stripe/stripe.php',
            type: 'POST',
            data: order_details,
            success: function(result) {
                if (result.ok == true) {
                    console.log("OUAIS, BRAVO!!! : " + result.text);
                    // switch to 3rd page
                    // TO DO
                }
                else {
                    document.getElementById("cart_pay_but").disabled = false;
                    $(".payment_errors").html(result.text);
                    // switch to 3rd page
                    // TO DO
                }
                
            },
            error: function(xhr, status, error) {
                console.log('Error :', error);
            }
        });
    }
}


function submitPayment() {

    // disable the submit button to prevent repeated clicks
    document.getElementById("cart_pay_but").disabled = true;

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

});
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

        $(".payment_errors").text("");
        var order_details = {
            stripeToken: response['id'],
            order_name: document.querySelector("#order_name").value,
            order_address: document.querySelector("#order_address").value,
            order_phone: document.querySelector("#order_phone").value,
            order_notes: document.querySelector("#order_notes").value,      
            order_deliv: document.querySelector('#order_deliv_1:checked') ? 1 : 0,      
            order_cc_last4: document.querySelector("#cc_number").value.substring(0, 4),
            cart_data: sanitizeCartDataForOrder(cart_data),
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

                    document.getElementById("cart_pay_but").disabled = false;

                    document.querySelector("#order_name").value = "";
                    document.querySelector("#order_address").value = "";
                    document.querySelector("#order_phone").value = "";
                    document.querySelector("#order_notes").value = "";

                    
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


function sanitizeCartDataForOrder(cart_data) {
    return cart_data.map(item => {
        return [item.food_id, item.food_options];
    });
}


function submitPayment() {

    if (!document.querySelector("#order_name").value ||
        !document.querySelector("#order_address").value ||
        !document.querySelector("#order_phone").value) {
        $(".payment_errors").text("Les 3 premiers champs doivent être remplis.");
        return;
    }

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

    document.getElementById('cart_popup_payment_content').addEventListener('keydown', function() {
        $(".payment_errors").text("");
    });

});


// Google address autocomplete
let autocomplete;
let addressField;

function initAutocomplete() {
  addressField = document.querySelector("#order_address");
//   const bounds = new google.maps.LatLngBounds(
//     new google.maps.LatLng(45.0, -73.0),
//     new google.maps.LatLng(46.0, -71.0)
//   );
  autocomplete = new google.maps.places.Autocomplete(addressField, {
    // bounds: bounds,
    // strictBounds: true,
    componentRestrictions: { country: ["CA"] },
    fields: ["address_components", "geometry"],
    types: ["address"],
  });
  addressField.focus();
  autocomplete.addListener("place_changed", fillInAddress);
  addressField.addEventListener("click", function() {
    this.value = "";
  });
}

function fillInAddress() {
  const place = autocomplete.getPlace();
  if (place && place.formatted_address) {
    addressField.value = 
    place.address_components[0].long_name + ", " + 
    place.address_components[1].long_name + ", " + 
    place.address_components[2].long_name + ", " + 
    place.address_components[place.address_components[7].types[0] == "postal_code" ? 8 : 7].long_name;
  }
}

window.initAutocomplete = initAutocomplete;
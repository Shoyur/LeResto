<?php

header("Cache-Control: max-age=3600");

// require_once '../app/stripe/config.php'

?>

<!DOCTYPE html>
<html lang="en">

<head>
    
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Le Resto - Passer une commande</title>

    <link rel="apple-touch-icon" sizes="180x180" href="../common/images/apple-touch-icon.png">
    <link rel="icon" type="image/png" sizes="32x32" href="../common/images/favicon-32x32.png">
    <link rel="icon" type="image/png" sizes="16x16" href="../common/images/favicon-16x16.png">
    <link rel="manifest" href="../common/images/site.webmanifest">

    <link rel="stylesheet" type="text/css" href="css/styles.css">
    <link rel="stylesheet" type="text/css" href="../common/util/fontawesome-free-6.4.0-web/css/all.min.css">
    <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto">

    <script src="../common/util/jquery/jquery-3.7.0.min.js"></script>

    <script defer type="text/javascript" src="https://js.stripe.com/v2/"></script>

    <script defer src="../common/scripts/errorNotification.js"></script>
    <script defer type="module" src="../common/scripts/Food.js"></script>
    <script defer type="module" src="../common/scripts/Categ.js"></script>
    <script defer type="module" src="scripts/loadFoods.js"></script>
    <script defer src="scripts/foodPopup.js"></script>
    <script defer src="scripts/cartAndPopup.js"></script>
    <script defer src="scripts/locPopup.js"></script>
    <script defer src="../common/scripts/langChange.js"></script>
    <script defer src="../common/scripts/darkLight.js"></script>
    <script defer src="../common/scripts/userAndPopup.js"></script>
    <script defer src="scripts/payment.js"></script>
    <script defer src="../common/scripts/cookies.js"></script>

    <script defer src="https://maps.googleapis.com/maps/api/js?key=AIzaSyDWzNZvErnEWtE8sH7rZBng1V78S_IxSf8&callback=initAutocomplete&libraries=places"></script>

    
    <!-- <script>Stripe.setPublishableKey("pk_test_51NYwc3ITtGQD7Q56MWtMXAzc8cCfdWfZPuf4hLWAmfwNy1QhwExdae3Cj2COucvxJJhWizXwlxwVUNKQ4mzIMwSn00OwKbAdaA")</script> -->
    

</head>

<body class="dark_theme">

    <!-- NAVBAR -->
    <nav class="nav">
        <div class="nav_container_div">
            <div class="nav_logo_div">
                <img src="../common/../common/images/logo.png" alt="logo">
            </div>
            <div class="nav_icon_but_div">
                <i class="fa-solid fa-location-dot" id="location_popup_but"></i>
                <i class="fa-solid fa-hands-asl-interpreting" id="language_but"></i>
                <i class="fa-solid fa-circle-half-stroke" id="darklight_but"></i>
                <i class="fa-solid fa-circle-user" id="user_popup_but"></i>
                <i class="fa-solid fa-cart-shopping" id="cart_popup_but"><div class="cart_qty" id="cart_qty">0</div></i>  
            </div>
            <div class="nav_categ_but_div" id="catbar_but"></div>
        </div>
    </nav>

    <!-- FOOD ITEMS PER CATEG LIST -->
    <div class="food_grids_list" id="food_grids_list"></div>

    <!-- CARD FOOD DETAILS POPUP -->
    <div id="food_popup" class="popup">
        <div class="food_popup_content">
            <div id="food_popup_details" class="food_popup_details"></div>
            <button id="food_popup_close">Fermer</button>
        </div>
    </div>

    <!-- LOCATION POPUP -->
    <div id="loc_popup" class="popup">
        <div class="loc_popup_content">
            <div class="loc_popup_text" id="loc_popup_text"></div>
            <button id="loc_popup_close">Fermer</button>
        </div>
    </div>

    <!-- USER LOGIN POPUP -->
    <div id="user_popup" class="popup">
        <div class="user_popup_content">
            <div class="user_text">
                <!--  -->
                <br>TO DO : Login or register, email/phone registering API.<br><br>
                <!--  -->
            </div>
            <button id="user_popup_close">Fermer</button><br><br>
        </div>
    </div>

    <!-- CART POPUP -->
    <div id="cart_popup" class="popup">
        <div class="cart_popup_content" id="cart_popup_content">
            <!-- page 1 -->
            <div class="cart_popup_food_content" id="cart_popup_food_content">
                <div class="cart_list" id="cart_list"></div>
                <div class="cart_numbers" id="cart_numbers"></div>
                <div class="cart_end_buttons">
                    <button id="cart_popup_close">Fermer</button>
                    <button id="cart_popup_checkout">Passer à la caisse</button>
                </div>
            </div>
            <!-- page 2 -->
            <div class="cart_popup_payment_content" id="cart_popup_payment_content">
                <div class="payment_logo">
                    <img src="../common/images/logo.png" alt="logo">
                </div>
                <!--  -->
                <input class="order_name" id="order_name" maxlength="200" placeholder="Entrez votre nom">
                <input class="order_address" id="order_address" autocomplete="off" placeholder="Entrez une adresse">
                <input class="order_phone" id="order_phone" type="tel" maxlength="200" placeholder="Entrez votre téléphone">
                <input class="order_notes" id="order_notes" placeholder="Notes pour la commande ou la livraison">
                <div class="order_deliv_div" id="order_deliv_div">
                    <input type="radio" id="order_deliv_1" name="order_deliv" value="Livraison" checked /><label for="order_deliv_1">Livraison</label>
                    <input type="radio" id="order_deliv_0" name="order_deliv" value="Pour emporter"/><label for="order_deliv_0">Pour emporter</label>
                </div>
                <input class="cc_number" id="cc_number" type="tel" pattern="\d*" maxlength="19" placeholder="Numéro" oninput="ccNumberFormat(this)" value="4242 4242 4242 4242">
                <div class="cc_small">
                    <select class="cc_exp_m" id="cc_exp_m"></select>
                    <select class="cc_exp_y" id="cc_exp_y"></select>
                    <input class="cc_cvc" type="tel" pattern="\d*" maxlength="4" placeholder="CVC" oninput="ccCVCFormat(this)" value="123">
                </div>
                <br><span class="payment_errors" id="payment_errors"></span>
                <div class="payment_end_buttons">
                    <button id="cart_pay_cancel">Annuler</button>
                    <button id="cart_pay_but">Payer</button>
                </div>
            </div>
            <!-- page 3 -->
            <div class="cart_popup_confirmation_content" id="cart_popup_confirmation_content">
                <div class="payment_logo">
                    <img src="../common/images/logo.png" alt="logo">
                </div>
                <div class="cart_confirmation_text" id="cart_confirmation_text"></div>
                <div class="cart_end_buttons">
                    <button id="cart_popup_confirmation_close">Fermer</button>
                </div>
            </div>
        </div>
    </div>
    <div class="disabled_overlay" id="disabled_overlay">
        <div class="processing_message">
            <p>Attente de confirmation du paiement...</p>
            <div class="lds_roller" id="lds_roller_2"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
        </div>
    </div>

    <!-- ERROR NOTIFICATION POPUP -->
    <div class="error_notif" id="error_notif"></div>

</body>

</html>
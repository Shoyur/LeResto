<!DOCTYPE html>
<html lang="en">

<head>
    
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Le Resto - Passer une commande</title>

    <link rel="stylesheet" type="text/css" href="css/styles.css">
    <link rel="stylesheet" type="text/css" href="util/fontawesome-free-6.4.0-web/css/all.min.css">
    <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto">

    <script defer type="text/javascript" src="https://js.stripe.com/v2/"></script>

    <script defer src="util/jquery/jquery-3.7.0.min.js"></script>
    <script defer src="scripts/loadFoods.js"></script>
    <script defer src="scripts/foodPopup.js"></script>
    <script defer src="scripts/cartAndPopup.js"></script>
    <script defer src="scripts/locPopup.js"></script>
    <script defer src="scripts/langChange.js"></script>
    <script defer src="scripts/darkLight.js"></script>
    <script defer src="scripts/userAndPopup.js"></script>
    <script defer src="scripts/payment.js"></script>

</head>

<body class="dark_theme">

    <!-- NAVBAR -->
    <nav class="nav">
        <div class="nav_logo">
            <img src="images/logo.png" alt="logo">
        </div>
        <div class="nav_mid"></div>
        <div class="nav_but">
            <i class="fa-solid fa-location-dot" id="location_popup_but"></i>
            <i class="fa-solid fa-hands-asl-interpreting" id="language_but"></i>
            <i class="fa-solid fa-circle-half-stroke" id="darklight_but"></i>
            <i class="fa-solid fa-circle-user" id="user_popup_but"></i>
            <i class="fa-solid fa-cart-shopping" id="cart_popup_but"><div class="cart_qty" id="cart_qty">0</div></i>
            
        </div>
    </nav>

    <!-- CATEG BAR -->
    <nav class="catbar">
        <div class="catbar_but" id= "catbar_but"></div>
    </nav>

    <!-- FOOD ITEMS PER CATEG LIST -->
    <div class="food_grids_list" id="food_grids_list"></div>

    <!-- CARD FOOD DETAILS POPUP -->
    <div id="food_popup" class="food_popup">
        <div class="food_popup_content">
            <div id="food_popup_details" class="food_popup_details"></div>
            <button id="food_popup_close">Fermer</button>
        </div>
    </div>

    <!-- LOCATION POPUP -->
    <div id="loc_popup" class="loc_popup">
        <div class="loc_popup_content">
            <div class="loc_popup_text" id="loc_popup_text">
                <h2>Nos coordonnées</h2>
                ADRESSE<br>
                123, rue Chemin Resto<br>
                Sainte-Ville, Québec<br><br>
                TÉLÉPHONE<br>
                <a href="tel:514-123-4567"><b>514-123-4567</b></a><br><br>
                COURRIEL<br>
                <a href="mailto:no@e.mail"><b>no@e.mail</b></a><br><br>
                HEURES D'OUVERTURE<br>
                Tous les jours de 10h00 à 23h00<br><br><br>

            </div>
            <button id="loc_popup_close">Fermer</button>
        </div>
    </div>

    <!-- USER LOGIN POPUP -->
    <div id="user_popup" class="user_popup">
        <div class="user_popup_content">
            <div class="user_text">
                <!--  -->
                TO DO : Login or register, email/phone registering API.<br><br>
                <!--  -->
            </div>
            <button id="user_popup_close">Fermer</button>
        </div>
    </div>

    <!-- CART POPUP -->
    <div id="cart_popup" class="cart_popup">
        <div class="cart_popup_content" id="cart_popup_content">
            <!-- page 1 -->
            <div class="cart_popup_food_content" id="cart_popup_food_content">
                <div class="cart_list" id="cart_list"></div>
                <div class="cart_numbers" id="cart_numbers"></div>
                <button id="cart_popup_close">Fermer</button><!--
                --><button id="cart_popup_checkout">Passer à la caisse</button>
            </div>
            <!-- page 2 -->
            <div class="cart_popup_payment_content" id="cart_popup_payment_content">
                <div class="payment_logo">
                    <img src="images/logo.png" alt="logo">
                </div>
                <input class="cc_number" type="tel" pattern="\d*" maxlength="19" placeholder="Numéro">
                <select class="cc_exp_m cc_small" id="cc_exp_m"></select>
                <select class="cc_exp_y cc_small" id="cc_exp_y"></select>
                <input class="cc_cvc cc_small" type="tel" pattern="\d*" maxlength="4" placeholder="CVC">
                <br><span class="payment_errors" id="payment_errors"></span><br>
                <button id="cart_pay_cancel">Annuler</button>
                <button id="cart_pay_but">Payer</button>
            </div>
        </div>
    </div>

</body>

</html>
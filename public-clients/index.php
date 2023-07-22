<!DOCTYPE html>
<html lang="en">

<head>
    
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Le Resto - Passer une commande</title>

    <link rel="stylesheet" type="text/css" href="css/styles.css">
    <link rel="stylesheet" type="text/css" href="util/fontawesome-free-6.4.0-web/css/all.min.css">

    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.6.0/jquery.min.js"></script>
    <script defer src="scripts/loadFoods.js"></script>
    <script defer src="scripts/cart.js"></script>

</head>

<body>

    <!-- NAVBAR -->
    <nav class="nav">
        <div class="nav_logo">
            <img src="images/logo.png" alt="logo">
        </div>
        <div class="nav_mid"></div>
        <div class="nav_but">
            <i class="fa-solid fa-location-dot" onclick="add2cartAnim()"></i>
            <i class="fa-solid fa-hands-asl-interpreting"></i>
            <i class="fa-solid fa-circle-half-stroke"></i>
            <i class="fa-solid fa-circle-user" id="test_commande_random"></i>
            <i class="fa-solid fa-cart-shopping"><div class="cart_qty" id="cart_qty">0</div></i>
            
        </div>
    </nav>

    <!-- CATEG BAR -->
    <nav class="catbar">
        <div class="catbar_but" id= "catbar_but"></div>
    </nav>

    <!-- FOOD ITEMS PER CATEG LIST -->
    <div class="food_grids_list" id="food_grids_list"></div>

    <!-- LOCATION POPUP -->
    <div id="loc_popup" class="loc_popup">
        <div class="loc_popup_content">
            <div class="loc_list">
                <!--  -->
                TO DO
                <!--  -->
            </div>
            <button id="loc_popup_cancel">Fermer</button>
        </div>
    </div>

    <!-- USER LOGIN POPUP -->
    <div id="user_popup" class="user_popup">
        <div class="user_popup_content">
            <div class="user_list">
                <!--  -->
                TO DO
                <!--  -->
            </div>
            <button id="user_popup_cancel">Fermer</button>
        </div>
    </div>

    <!-- CART POPUP -->
    <div id="cart_popup" class="cart_popup">
        <div class="cart_popup_content">
            <div class="cart_list">
                <!--  -->
                TO DO
                <!--  -->
            </div>
            <button id="cart_popup_cancel">Fermer</button>
        </div>
    </div>


    
</body>

</html>
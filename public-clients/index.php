<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Le Resto - Passer une commande</title>

    <link rel="stylesheet" type="text/css" href="css/styles.css">
    <link rel="stylesheet" type="text/css" href="util/fontawesome-free-6.4.0-web/css/all.min.css">

    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.6.0/jquery.min.js"></script>
    <script defer src="scripts/load_categories.js"></script>

</head>

<body>

    <!-- NAVBAR -->
    <nav class="navbar">
        <div class="logo">
            <img src="images/logo.jpg" alt="logo">
        </div>
        <div class="navbar-but">
            <i class="fa-solid fa-location-dot"></i>
            <i class="fa-solid fa-hands-asl-interpreting"></i>
            <i class="fa-solid fa-circle-half-stroke"></i>
            <i class="fa-solid fa-circle-user"></i>
            <i class="fa-solid fa-cart-shopping"></i>
        </div>
    </nav>

    <!-- CATÉGORIES BAR -->
    <nav class="catbar">
    <div class="nav-container">
        <div class="nav-wrapper">
            <ul class="nav-list" id="navList"></ul>
        </div>
        <div class="nav-arrow nav-left">&lt;</div>
        <div class="nav-arrow nav-right">&gt;</div>
    </div>
    </nav>
    


    
</body>

</html>
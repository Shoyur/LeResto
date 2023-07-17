<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Le Resto - Prise des commandes</title>

    <link rel="stylesheet" type="text/css" href="client/css/styles.css">
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.6.0/jquery.min.js"></script>
    <script src="client/scripts/refresh_commandes.js"></script>
</head>

<body>

    <!-- NAVBAR -->
    <nav class="navbar">
        <div class="logo">
            <img src="client/images/logo.jpg" alt="logo">
        </div>
        <div class="navbar-mid">
            <span id="combien" class="navbar-text">X </span>
            <span class="navbar-text"> commandes en cours</span>
        </div>
        <div class="navbar-but">
            <a href="#" class="but-stats">Statistiques</a>
        </div>
    </nav>

    <!-- LA LISTE DES COMMANDES -->
    <div id="order-list"></div>

    <!-- UN GENRE DE POPUP MAISON POUR TERMINER UNE COMMANDE -->
    <div id="order-popup" class="order-popup">
        <div class="order-details">
        <span class="close-button">&times;</span>
            <h2 id="order-title"></h2>
            <p id="order-description"></p>
            <button id="mark-finished-button">Commande terminée</button>
        </div>
    </div>

    
</body>

</html>
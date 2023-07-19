<!DOCTYPE html>
<html lang="en">

<head>

    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Le Resto - Prise des commandes</title>

    <link rel="stylesheet" type="text/css" href="css/styles.css">
    <link rel="stylesheet" type="text/css" href="util/fontawesome-free-6.4.0-web/css/all.min.css">

    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.6.0/jquery.min.js"></script>
    <script defer src="scripts/orders.js"></script>
    <script defer src="scripts/settings.js"></script>

</head>

<body>

    <!-- NAVBAR -->
    <nav class="navbar">
        <div class="logo">
            <img src="images/logo.jpg" alt="logo">
        </div>
        <div class="navbar-mid">
            <span id="combien" class="navbar-text">X </span>
            <span class="navbar-text"> commande(s) en cours</span>
        </div>
        <div class="navbar-but">
            <i class="fa-solid fa-clock-rotate-left"></i>
            <i class="fa-solid fa-chart-line"></i>
            <i class="fa-solid fa-gear" onclick="openSettingsPopup()"></i>
        </div>
    </nav>

    <!-- LA LISTE DES COMMANDES -->
    <div id="liste_cartes"></div>

    <!-- POPUP MAISON POUR TERMINER UNE COMMANDE -->
    <div id="commande_popup" class="commande_popup">
        <div class="commande_popup_details">
            <span class="x_but">&times;</span>
            <h2 id="commande_popup_titre"></h2>
            <div class="commande_popup_aliments">
                <p id="commande_popup_descr"></p>
            </div>
            <button id="commande_terminer_but">Commande terminée</button>
        </div>
    </div>

    <!-- POPUP MAISON POUR AFFICHER LES COMMANDES TERMINÉES -->
    <div id="terminees_popup" class="terminees_popup">
        <div class="commande_popup_details">
            <span class="x_but">&times;</span>
            <div class="liste_terminees">
                <!--  -->
                <!-- À FAIRE... -->
                <!--  -->
            </div>
            <button id="commande_terminer_but">Effacer les commandes terminées</button>
        </div>
    </div>

    <!-- POPUP MAISON POUR AFFICHER LES STATISTIQUES -->
    <!--  -->
    <!-- À FAIRE... -->
    <!--  -->

    <!-- POPUP MAISON POUR TOUTES LES CONFIGURATIONS -->
    <div id="settingsPopup" class="popup">
    <h3>Rafraîchir la page chaque <input type="number" id="refreshInterval" value="10"> secondes.</h3>
    <h3>Changement de couleur des cartes
        <label class="switch">
        <input type="checkbox" id="changeColorToggle">
        <span class="slider"></span>
        </label>
        <div class="color-box blue-box"></div>
        <input type="number" id="blueInterval" value="5"> minutes
        <div class="color-box yellow-box"></div>
        <input type="number" id="yellowInterval" value="10"> minutes
        <div class="color-box red-box"></div>
        <label for="paragraphText">Edit Paragraph: </label>
        <textarea id="locationText" rows="4" cols="50"></textarea>

    </h3>
    <button onclick="saveSettings()">Enregistrer</button>
    <button onclick="closeSettingsPopup()">Cancel</button>
    </div>


    
</body>

</html>
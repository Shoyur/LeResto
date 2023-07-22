<!DOCTYPE html>
<html lang="en">

<head>

    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Le Resto - Prise des commandes</title>

    <link rel="stylesheet" type="text/css" href="css/styles.css">
    <link rel="stylesheet" type="text/css" href="util/fontawesome-free-6.4.0-web/css/all.min.css">

    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.6.0/jquery.min.js"></script>
    <script defer src="scripts/getOrders.js"></script>
    <script defer src="scripts/orderPopup.js"></script>
    <script defer src="scripts/historyPopup.js"></script>
    <script defer src="scripts/statsPopup.js"></script>
    <script defer src="scripts/settingsPopup.js"></script>

</head>

<body>

    <!-- NAVBAR -->
    <nav class="nav">
        <div class="nav_logo">
            <img src="images/logo.jpg" alt="logo">
        </div>
        <div class="nav_mid">
            <span id="orders_count"></span>
        </div>
        <div class="nav_but">
            <i class="fa-solid fa-clock-rotate-left" onclick="openHistoryPopup()"></i>
            <i class="fa-solid fa-chart-line" onclick="openStatsPopup()"></i>
            <i class="fa-solid fa-gear" onclick="openSettingsPopup()"></i>
        </div>
    </nav>

    <!-- ORDERS LIST -->
    <div id="orders_list"></div>

    <!-- SPECIFIC ORDER (TO FINISH) POPUP -->
    <div id="order_popup" class="order_popup">
        <div class="order_popup_content">
            <h2 id="order_popup_title"></h2>
            <div class="order_popup_aliments">
                <p id="order_popup_descr"></p>
            </div>
            <button id="order_popup_finish">Commande terminée</button>
            <button id="order_popup_cancel">Cancel</button>
        </div>
    </div>

    <!-- FINISHED ORDERS (HISTORY) POPUP -->
    <div id="history_popup" class="history_popup">
        <div class="history_popup_content">
            <div id="finished_orders" class="history_popup_textarea">...</div>
            <div class="put_back_order">
                <label for="id_order">Reprendre une commande:</label>
                <input type="text" id="id_order" placeholder="ID de commande" />
                <button id="history_put_back_but">Confirmer</button>
            </div>
            <button id="history_popup_clear">Effacer les commandes terminées</button>
            <button id="history_popup_cancel">Cancel</button>
        </div>
    </div>

    <!-- STATISTICS POPUP -->
    <div id="stats_popup" class="stats_popup">
        <div class="stats_popup_content">
            <div class="stats_list">
                <!--  -->
                TO DO
                <!--  -->
            </div>
            <button id="stats_popup_cancel">Fermer</button>
        </div>
    </div>

    <!-- SETTINGS POPUP -->
    <div id="settings_popup" class="settings_popup">
        <div class="settings_popup_content">
            <h3>Rafraîchir la page chaque <input type="number" id="refresh_interval" class="input_number"> sec.</h3>
            <h3 class="inline_block">Couleur de délai :</h3>
            <label class="switch">
            <input type="checkbox" id="changeColorToggle">
            <span class="slider"></span>
            </label>
            <br>
            <div class="color-box blue-box"></div>
            <input type="number" id="blueInterval" class="input_number"> secondes
            <div class="color-box yellow-box"></div>
            <input type="number" id="yellowInterval" class="input_number"> secondes
            <div class="color-box red-box"></div>
            <br>
            <label for="paragraphText"><h3 class="loc_text_title">Texte emplacement : </h3></label>
            <textarea id="loc_text" class="loc_text"></textarea>
            <button id="settings_popup_save">Enregistrer</button>
            <button id="settings_popup_cancel">Cancel</button>
        </div>
    </div>


    
</body>

</html>
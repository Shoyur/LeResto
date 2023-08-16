<!DOCTYPE html>
<html lang="en">

<head>

    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Le Resto - Prise des commandes</title>

    <link rel="apple-touch-icon" sizes="180x180" href="images/apple-touch-icon.png">
    <link rel="icon" type="image/png" sizes="32x32" href="images/favicon-32x32.png">
    <link rel="icon" type="image/png" sizes="16x16" href="images/favicon-16x16.png">
    <link rel="manifest" href="images/site.webmanifest">

    <link rel="stylesheet" type="text/css" href="css/styles.css">
    <link rel="stylesheet" type="text/css" href="util/fontawesome-free-6.4.0-web/css/all.min.css">
    <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto">

    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.7.0/jquery.min.js"></script>
    
    <script defer src="scripts/settingsPopup.js"></script>
    <script defer src="scripts/getOrders.js"></script>
    <script defer src="scripts/orderPopup.js"></script>
    <script defer src="scripts/historyPopup.js"></script>
    <script defer src="scripts/statsPopup.js"></script>
    <script defer type="module" src="scripts/Food.js"></script>
    <script defer type="module" src="scripts/Categ.js"></script>
    <script defer type="module" src="scripts/menuManagePopup.js"></script>
    

</head>

<body class="dark_theme">

    <!-- NAVBAR -->
    <nav class="nav">
        <div class="nav_container_div">
            <div class="nav_logo_div">
                <img src="images/logo.png" alt="logo">
            </div>
            <div class="nav_icon_but_div">
                <i class="fa-solid fa-clock-rotate-left"  id="history_popup_but"></i>
                <i class="fa-solid fa-chart-line" id="stats_popup_but"></i>
                <i class="fa-solid fa-file-pen" id="menu_manage_popup_but"></i>
                <i class="fa-solid fa-circle-half-stroke" id="darklight_but"></i>
                <i class="fa-solid fa-gear" id="settings_popup_but"></i>
            </div>
        </div>
    </nav>

    <!-- CURRENT ORDERS LIST -->
    <div id="orders_list"></div>

    <!-- SPECIFIC ORDER (TO FINISH) DETAILS POPUP -->
    <div id="order_popup" class="popup">
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
    <div id="history_popup" class="popup">
        <div class="history_popup_content">
            <div id="finished_orders" class="history_popup_textarea">...</div>
            <div class="put_back_order">
                <label for="id_order">Reprendre une commande:</label>
                <input type="text" id="id_order" placeholder="#" />
                <button id="history_put_back_but">Confirmer</button>
            </div>
            <button id="history_popup_archive">Archiver les commandes terminées</button>
            <button id="history_popup_cancel">Cancel</button>
        </div>
    </div>

    <!-- STATISTICS POPUP -->
    <!-- <div id="stats_popup" class="popup">
        <div class="stats_popup_content">
            <div class="stats_list"></div>
            <button id="stats_popup_cancel">Fermer</button>
        </div>
    </div> -->

    <!-- TEST -->
    <div id="stats_popup" class="popup">
        <div class="stats_popup_content">
            <div class="mgr_food_main_div">
                <div class="mgr_food_img_div">
                    <img src="images/logo.png" alt="logo">
                </div>
                <div class="mgr_food_right_div">
                    <div class="mgr_food_top_div">
                        <div class="mgr_name_div">
                            <input type="text" placeholder="Entrez un nom">
                        </div>
                        <div class="mgr_buts_div">
                            <div class="mgr_save_div">
                                <i class="fa-solid fa-floppy-disk"></i>
                            </div>
                            <div class="mgr_up_div">
                                <i class="fa-solid fa-arrow-up"></i>
                            </div>
                            <div class="mgr_down_div">
                                <i class="fa-solid fa-arrow-down"></i>
                            </div>
                            <div class="mgr_del_div">
                                <i class="fa-solid fa-trash"></i>
                            </div>
                        </div>
                    </div>
                    <div class="mgr_food_bottom_div">
                        <div class="mgr_food_descr_div">
                            <input type="text" placeholder="Entrez une description">
                        </div>
                        <div class="mgr_food_price_div">
                            <input type="text" placeholder="$$$">
                        </div>
                        <div class="mgr_food_avail_div">
                            <label class="switch">
                                <input type="checkbox" id="avail_toggle_2">
                                <span class="slider slider_avail"></span>
                            </label>
                        </div>
                    </div>
                </div>
            </div>
            <button id="stats_popup_cancel">Fermer</button>
        </div>
    </div>

    <!-- MENU MANAGEMENT POPUP -->
    <div id="menu_manage_popup" class="popup">
        <div class="menu_manage_popup_content">
            <div class="menu_manage_list" id="menu_manage_list"></div>
            <div class="menu_manage_popup_load_anim" id="menu_manage_popup_load_anim">
                <i class="fas fa-spinner fa-spin"></i>
            </div>
            <button id="menu_manage_popup_close">Fermer</button>
        </div>
    </div>

    <!-- SETTINGS POPUP -->
    <div id="settings_popup" class="popup">
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

    <!-- SETTINGS POPUP -->
    <div class="disabled_overlay" id="disabled_overlay"></div>


    
</body>

</html>
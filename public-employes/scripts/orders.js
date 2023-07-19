$(document).ready(function() {

    function readAllCommandePresentes() {
        $.ajax({
            url: '/monsystemeresto/app/controllers/commandeController.php',
            async: false,
            type: 'POST',
            data: {
                action: 'readAllCommandePresentes'
            },
            dataType: 'json',
            success: function(orders) {
                afficherCommandesPresentes(commordersandes);
            },
            error: function(xhr, status, error) {
                console.log('Erreur:', error);
            }
        });
    }

    function afficherCommandesPresentes(orders) {
        $('#liste_cartes').empty();
        $('#combien').text(orders.length);

        if (orders.length > 0) {
            $.each(orders, function(index, commande) {

                var carte = $('<div>').addClass('carte');

                var titre1 = $('<h3>').text('Commande no. ' + commande.id_commande);
                carte.append(titre1);
                var titre2 = $('<h3>').text(commande.livrpick_commande ? '(À livrer)' : '(Pour emporter)');
                carte.append(titre2);
                const m = Math.floor(commande.attente / 60);
                const s = commande.attente % 60;
                var titre3 = $('<h3>').text('[Attente : ' + `${m} min. ${s} sec.` + ']');
                carte.append(titre3);

                // Add CSS class based on the value of commande.attente
                if (color_change) {
                    if (commande.attente > interval_1) {
                        carte.addClass('carte-rouge');
                    } 
                    else if (commande.attente > 10) {
                        carte.addClass('carte-jaune');
                    }
                }

                var details = JSON.parse(commande.details_commande)
                $.each(details, function(i, item) {
                    var qte = item[0];
                    var nom = item[2];
                    var options = item[3];
            
                    var cr = $('<p>').text('');
                    carte.append(cr);
            
                    var texte_qte = $('<span>').text(qte);
                    carte.append(texte_qte);
                    
                    var texte_aliment = nom + '' + (options ? ' (' + options + ')' : '');
                    var aliment = $('<span>').text(texte_aliment);
                    carte.append(aliment);
                });
    
                carte.click(function() {
                    // selectionnee = orderId;
                    ouvrirCommandePopup(commande);
                });
    
                $('#liste_cartes').append(carte);
            });
        } else {
            $('#liste_cartes').text('Aucune commande.');
        }
    }

    function ouvrirCommandePopup(commande) {

        var texte_titre = 'Commande no. ' + commande.id_commande;
        texte_titre += commande.livrpick_commande ? ' (À livrer)' : ' (Pour emporter)';
        $('#commande_popup_titre').text(texte_titre);
        $('#commande_popup_descr').empty();

        var details = JSON.parse(commande.details_commande);
        $.each(details, function(index, item) {
            var qte = item[0];
            var nom = item[2];
            var options = item[3];
    
            var aliments = '<p><span>' + qte + '<span>' + nom + '' + (options ? ' (' + options + ')' : '');
            $('#commande_popup_descr').append(aliments);
        });

        $('#commande_terminer_but').off('click').on('click', function() {
            terminerCommande(commande.id_commande);
        });
        $('#commande_annuler_but').off('click').on('click', function() {
            fermerCommandePopup(); 
        });
        $('.x_but').off('click').on('click', function() { 
            fermerCommandePopup(); 
        });
        $('#commande_popup').fadeIn();

        // fermer le popup si on pèse Enter
        $(document).on('keydown', function(e) {
            if (e.keyCode === 27) {
                fermerCommandePopup();
            }
        });
        // fermer le popup si on clique ailleurs
        $('#commande_popup').on('click', function(e) {
            if (!$(e.target).closest('.commande_popup_details').length) {
                fermerCommandePopup();
            }
        });
    }

    function fermerCommandePopup() {
        $('#commande_popup').fadeOut();
        $(document).off('keydown');
        $('#commande_popup').off('click');
    }

    function terminerCommande(id_commande) {

        $.ajax({
            url: '/monsystemeresto/app/controllers/commandeController.php',
            type: 'POST',
            data: {
                action: 'updateCommandeTerminee',
                id: id_commande,
                terminee: 1
            },
            dataType: 'json',
            success: function(reponse) {
                console.warn("commande " + id_commande + " mise en état terminée")
            },
            error: function(xhr, status, error) {
                console.log('Erreur:', error);
            }
        });

        fermerCommandePopup();
        readAllCommandePresentes();

    }

    // Exécuter l'affichage la première fois quand ce script est chargé
    readAllCommandePresentes();

    // Rafraîchir la liste chaque 5 secondes
    setInterval(readAllCommandePresentes, 5000);

});
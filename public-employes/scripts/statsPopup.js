function openStatsPopup() {

    // var texte_title = 'Commande no. ' + stats.id_commande;
    // texte_title += stats.livrpick_commande ? ' (À livrer)' : ' (Pour emporter)';
    // $('#stats_popup_title').text(texte_title);
    // $('#stats_popup_descr').empty();

    // var details = JSON.parse(stats.details_commande);
    // $.each(details, function(index, item) {
    //     var qte = item[0];
    //     var nom = item[2];
    //     var options = item[3];

    //     var aliments = '<p><span>' + qte + '<span>' + nom + '' + (options ? ' (' + options + ')' : '');
    //     $('#stats_popup_descr').append(aliments);
    // });

    $('#stats_popup_cancel').off('click').on('click', function() {
        closeStatsPopup(); 
    });
    $('#stats_popup').fadeIn();
    $(document).on('keydown', function(e) {
        if (e.keyCode === 27) {
            closeStatsPopup();
        }
    });
    $('#stats_popup').on('click', function(e) {
        if (!$(e.target).closest('.stats_popup_content').length) {
            closeStatsPopup();
        }
    });
}

function closeStatsPopup() {
    $('#stats_popup').fadeOut();
    $(document).off('keydown');
    $('#stats_popup').off('click');
}
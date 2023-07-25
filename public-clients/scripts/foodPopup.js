function openFoodPopup(food) {

    $('#food_popup_details').empty();
    const food_card = createFoodCard(food);
    $('#food_popup_details').append(food_card);

    $('#food_popup_close').off('click').on('click', function() {
        closeFoodPopup(); 
    });
    $('#food_popup').fadeIn();
    $(document).on('keydown', function(e) {
        if (e.keyCode === 27) {
            closeFoodPopup();
        }
    });
    $('#food_popup').on('click', function(e) {
        if (!$(e.target).closest('.food_popup_content').length) {
            closeFoodPopup();
        }
    });
}

function closeFoodPopup() {
    $('#food_popup').fadeOut();
    $(document).off('keydown');
    $('#food_popup').off('click');
}
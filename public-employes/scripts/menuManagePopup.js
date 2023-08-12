import { Food } from './Food.js';
import { Categ } from './Categ.js';


document.addEventListener("DOMContentLoaded", function() {
    $('#menu_manage_popup_but').click(() => {
        openMenuManagePopup();
    });
});


function openMenuManagePopup() {

    $('#menu_manage_popup').fadeIn();
    $('#menu_manage_popup_close').off('click').on('click', function() {
        closeMenuManagePopup(); 
    });
    $(document).on('keydown', function(e) {
        if (e.keyCode === 27) {
            closeMenuManagePopup();
        }
    });
    $('#menu_manage_popup').on('click', function(e) {
        if (!$(e.target).closest('.menu_manage_popup_content').length) {
            closeMenuManagePopup();
        }
    });
    handleGetAll();

}


function closeMenuManagePopup() {

    $('#menu_manage_popup').fadeOut();
    $(document).off('keydown');
    $('#menu_manage_popup').off('click');

}


function loadCards(food_data) {

    if (!food_data.length) { return; }

    $('#menu_manage_list').empty();

    a: for (const a of food_data) {
        if (a.type == "category") {
            const categ = new Categ(a.id, a.name, a.sort);
            const categ_card = createCategCard(categ);
            $('#menu_manage_list').append(categ_card);
            for (const b of food_data) {
                if (b.categ_id == a.id) {
                    const food = new Food(b.id, b.categ_id, b.name, b.food_avail, b.food_price, b.food_image, b.food_descr);
                    const food_card = createFoodCard(food);
                    $('#menu_manage_list').append(food_card);
                }
            }
            // TO DO createVirginFoodCard(a.id)
            const food = new Food(666, a.id, "No Food Available", 0, "0.00", 'na.jpg', "No food available in this category.");
            const food_card = createFoodCard(food);
            $('#menu_manage_list').append(food_card);
        }
        else {
            // TO DO createVirginCategCard(a.id)
            const categ = new Categ(null, null, null);
            const categ_card = createCategCard(categ);
            $('#menu_manage_list').append(categ_card);
            break;
        }
    }

}


function createCategCard(categ) {

    const card = document.createElement('div');
    card.object = categ;
    card.classList.add('menu_manage_list_cat_div');

    const input_div = document.createElement('div');
    input_div.classList.add('input_div');
    const categ_input = document.createElement('input');
    categ_input.type = 'text';
    categ_input.value = categ.categ_name;
    categ_input.placeholder = 'Nom de la catégorie';
    input_div.appendChild(categ_input);

    card.appendChild(input_div);

    const menu_manage_list_cat_div_but = document.createElement('div');
    menu_manage_list_cat_div_but.classList.add('menu_manage_list_cat_div_but');
    const menu_manage_list_cat_div_but_1 = document.createElement('div');
    menu_manage_list_cat_div_but_1.classList.add('menu_manage_list_cat_div_but_1_4');
    const i_save = document.createElement('i');
    i_save.classList.add('fa-solid');
    i_save.classList.add('fa-floppy-disk');
    i_save.addEventListener('click', () => {
        const data = {
            new_name: categ_input.value,
            old_name: categ.categ_name
        }
        HandleUpdateCateg(data);
    });
    menu_manage_list_cat_div_but_1.appendChild(i_save);
    menu_manage_list_cat_div_but.appendChild(menu_manage_list_cat_div_but_1);
    const menu_manage_list_cat_div_but_2 = document.createElement('div');
    menu_manage_list_cat_div_but_2.classList.add('menu_manage_list_cat_div_but_1_4');
    const i_up = document.createElement('i');
    i_up.classList.add('fa-solid');
    i_up.classList.add('fa-arrow-up');
    menu_manage_list_cat_div_but_2.appendChild(i_up);
    menu_manage_list_cat_div_but.appendChild(menu_manage_list_cat_div_but_2);

    const menu_manage_list_cat_div_but_3 = document.createElement('div');
    menu_manage_list_cat_div_but_3.classList.add('menu_manage_list_cat_div_but_1_4');
    const i_down = document.createElement('i');
    i_down.classList.add('fa-solid');
    i_down.classList.add('fa-arrow-down');
    menu_manage_list_cat_div_but_3.appendChild(i_down);
    menu_manage_list_cat_div_but.appendChild(menu_manage_list_cat_div_but_3);

    const menu_manage_list_cat_div_but_4 = document.createElement('div');
    menu_manage_list_cat_div_but_4.classList.add('menu_manage_list_cat_div_but_1_4');
    const i_delete = document.createElement('i');
    i_delete.classList.add('fa-solid');
    i_delete.classList.add('fa-trash');
    i_delete.classList.add('menu_manage_list_cat_del_disable');
    menu_manage_list_cat_div_but_4.appendChild(i_delete);
    menu_manage_list_cat_div_but.appendChild(menu_manage_list_cat_div_but_4);

    card.appendChild(menu_manage_list_cat_div_but);

    return card;
}


function createFoodCard(food) {

    const card = document.createElement('div');
    card.object = food;
    card.classList.add('menu_manage_list_food_div');

    const menu_manage_list_food_div_img = document.createElement('div');
    menu_manage_list_food_div_img.classList.add('menu_manage_list_food_div_img');
    const food_image = document.createElement('img');
    food_image.src = '../public-clients/aliments/images/' + food.food_image;


    const img_file_input = document.createElement('input');
    img_file_input.type = 'file';
    img_file_input.style.display = 'none';
    img_file_input.addEventListener('change', (event) => 
        handleImgChange(event, food.food_id, card)
    );


    food_image.addEventListener('click', () => {
        img_file_input.click();
        console.log("Pour changer l'image du produit no." + food.food_id);
    });
    menu_manage_list_food_div_img.appendChild(food_image);

    card.appendChild(menu_manage_list_food_div_img);

    const menu_manage_list_food_div_inputs = document.createElement('div');
    menu_manage_list_food_div_inputs.classList.add('menu_manage_list_food_div_inputs');
    const input_div_1 = document.createElement('div');
    input_div_1.classList.add('input_div');
    const food_name_input = document.createElement('input');
    food_name_input.type = 'text';
    food_name_input.value = food.food_name;
    food_name_input.placeholder = 'Nom de l\'aliment';
    input_div_1.appendChild(food_name_input);
    menu_manage_list_food_div_inputs.appendChild(input_div_1);
    const input_div_2 = document.createElement('div');
    input_div_2.classList.add('input_div');
    const food_descr_input = document.createElement('input');
    food_descr_input.type = 'text';
    food_descr_input.value = food.food_descr;
    food_descr_input.placeholder = 'Description';
    input_div_2.appendChild(food_descr_input);
    menu_manage_list_food_div_inputs.appendChild(input_div_2);

    card.appendChild(menu_manage_list_food_div_inputs);
    
    const menu_manage_list_food_div_save = document.createElement('div');
    menu_manage_list_food_div_save.classList.add('menu_manage_list_food_div_save');
    const i_save = document.createElement('i');
    i_save.classList.add('fa-solid');
    i_save.classList.add('fa-floppy-disk');
    i_save.addEventListener('click', () => {
        handleSave(card);
        console.log("On tente de sauvegarder le nom et descr du produit no." + food.food_id);
    });
    menu_manage_list_food_div_save.appendChild(i_save);

    card.appendChild(menu_manage_list_food_div_save);


    const menu_manage_list_food_div_last = document.createElement('div');
    menu_manage_list_food_div_last.classList.add('menu_manage_list_food_div_last');
    const menu_manage_list_food_div_avail = document.createElement('div');
    menu_manage_list_food_div_avail.classList.add('menu_manage_list_food_div_avail');
    const avail_label = document.createElement('label');
    avail_label.classList.add('switch');
    const avail_toggle = document.createElement('input');
    avail_toggle.type = 'checkbox';
    avail_toggle.id = 'avail_toggle_' + food.food_id;
    avail_toggle.checked = food.food_avail ? true : false;
    avail_label.appendChild(avail_toggle);
    const slider_avail = document.createElement('span');
    slider_avail.classList.add('slider');
    slider_avail.classList.add('slider_avail');
    avail_label.appendChild(slider_avail);
    menu_manage_list_food_div_avail.appendChild(avail_label);
    menu_manage_list_food_div_last.appendChild(menu_manage_list_food_div_avail);
    const menu_manage_list_food_div_delete = document.createElement('div');
    menu_manage_list_food_div_delete.classList.add('menu_manage_list_food_div_delete');
    const i_delete = document.createElement('i');
    i_delete.classList.add('fa-solid');
    i_delete.classList.add('fa-trash');
    i_delete.addEventListener('click', () => {
        // TO DO
        console.log("On tente d'effacer le produit no." + food.food_id);
    });
    menu_manage_list_food_div_delete.appendChild(i_delete);
    menu_manage_list_food_div_last.appendChild(menu_manage_list_food_div_delete);

    card.appendChild(menu_manage_list_food_div_last);

    return card;
}


function handleImgChange(event, food_id, card) {
    const selected_file = event.target.files[0];
    if (selected_file) {
        console.log("Selected file for product no." + food_id + ":", selected_file);
        // Handle the selected file, you can upload it or process it here
        // You can replace the console.log with your upload logic
    }
}


// animation + get + reload cards
async function handleGetAll() {

    saveAnimAndFreeze(true);
    try {
        const response = await getAll();
        if (response[0]) {
            loadCards(response[1]);
        }
    }
    catch (e) {
        console.error("Error: " + e);
    }
    finally {
        saveAnimAndFreeze(false);
    }

}


// html request for categs-foods get
async function getAll() {

    try {
        const response = await fetch('/monsystemeresto/app/controllers/foodController.php', {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        });
        await new Promise(resolve => setTimeout(resolve, 1000)); // fake 2 seconds network lag
        const response_data = await response.json();
        if (!response_data[0]) {
            throw new Error(response_data[1]);
        }
        return response_data;
    } 
    catch (e) {
        throw e;
    }

}


// animation + update + reload cards
async function HandleUpdateCateg(data) {

    saveAnimAndFreeze(true);
    try {
        const response = await updateCateg(data);
        if (response[0]) {
            await handleGetAll();
        }
    }
    catch (e) {
        console.error("Error: " + e);
    }
    finally {
        saveAnimAndFreeze(false);
    }

}


// html request for categ patch
async function updateCateg(data) {

    try {
        const response = await fetch('/monsystemeresto/app/controllers/categController.php', {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });
        await new Promise(resolve => setTimeout(resolve, 1000)); // fake 2 seconds network lag
        const response_data = await response.json();
        if (!response_data[0]) {
            throw new Error(response_data[1]);
        }
        return response_data;
    } 
    catch (e) {
        throw e;
    }

}


// menu management popup loading animation
function saveAnimAndFreeze(state) {

    const existing_div = document.getElementById('menu_manage_popup_load_anim');
    if (state && !existing_div) {
        if (!existing_div) {
            const menu_manage_popup_load_anim = document.createElement('div');
            menu_manage_popup_load_anim.classList.add('menu_manage_popup_load_anim');
            menu_manage_popup_load_anim.id = 'menu_manage_popup_load_anim';
            const i_menu_manage_popup_load_anim = document.createElement('i');
            i_menu_manage_popup_load_anim.classList.add('fas');
            i_menu_manage_popup_load_anim.classList.add('fa-spinner');
            i_menu_manage_popup_load_anim.classList.add('fa-spin');
            menu_manage_popup_load_anim.appendChild(i_menu_manage_popup_load_anim);
            $('#menu_manage_list').append(menu_manage_popup_load_anim);
        }
        else {
            document.getElementById('menu_manage_popup_load_anim').style.display = "flex";
        }
    }
    else if (!state && existing_div) {
        document.getElementById('menu_manage_popup_load_anim').style.display = "none";
    }

}
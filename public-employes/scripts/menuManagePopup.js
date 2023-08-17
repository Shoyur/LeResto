import { Food } from './Food.js';
import { Categ } from './Categ.js';


document.addEventListener("DOMContentLoaded", function() {
    const menu_manage_popup_but = document.getElementById('menu_manage_popup_but');
    menu_manage_popup_but.addEventListener('click', () => {
        openMenuManagePopup();
    });
});


function openMenuManagePopup() {

    const menu_manage_popup_but = document.getElementById('menu_manage_popup_but');
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

    const menu_manage_list = document.getElementById('menu_manage_list');
    menu_manage_list.replaceChildren();

    let last_categ = 0;
    let food_data_array = [];

    // create sorted (as the end result) array for the cards list
    food_data.forEach((a, index) => {
        if (a.type == "category") {
            let sort_ids = [0, 0];
            if (index > 0) { sort_ids[0] = last_categ; }
            if (food_data[index + 1].type == "category") { sort_ids[1] = food_data[index + 1].id; }
            food_data_array.push([new Categ(a.id, a.name, a.sort), sort_ids]);
            food_data.forEach((b, index) => {
                if (b.categ_id == a.id) {
                    food_data_array.push([new Food(b.id, b.categ_id, b.name, b.food_avail, b.food_price, b.food_image, b.food_descr)]);
                }
            });
            last_categ = a.id;
        }
    });

    // create cards
    let last_categ_sort_num = 0;
    food_data_array.forEach((c, index) => {
        if (c[0] instanceof Categ) {
            let categ_deletable = true;
                // if not out of bound
            if (index + 1 < food_data_array.length && 
                // and next element is a Food
                (food_data_array[index + 1][0] instanceof Food) && 
                // but this next food is not part of this current category
                food_data_array[index + 1][0].categ_id == c[0].categ_id) {
                // then make this categ possible to delete
                categ_deletable = false;
            }
            // add categ card to list
            menu_manage_list.appendChild(createCategCard(c[0], c[1], categ_deletable));
            last_categ_sort_num = c[0].categ_sort;
        }
        else {
            // add food card to list
            menu_manage_list.appendChild(createFoodCard(c[0]));
                // not - next element exist
            if (!(index < (food_data_array.length - 1) && 
                // and is a Food
                food_data_array[index + 1][0] instanceof Food && 
                // and is the same category
                c[0].categ_id == food_data_array[index + 1][0].categ_id)) {
                menu_manage_list.appendChild(createVirginFoodCard(c[0].categ_id));
            }
        }
    });
    // at the very end, add a virgin (create new) category card
    menu_manage_list.appendChild(createVirginCategCard(last_categ_sort_num + 1));

}


function createCategCard(categ, sort_ids, deletable) {

    const card = document.createElement('div');
    card.object = categ;
    card.classList.add('mgr_cat_main_div');

    const mgr_name_div = document.createElement('div');
    mgr_name_div.classList.add('mgr_name_div');
    const cat_name_input = document.createElement('input');
    cat_name_input.type = 'text';
    cat_name_input.value = categ.categ_name;
    cat_name_input.placeholder = 'Nom de la catégorie';
    mgr_name_div.appendChild(cat_name_input);
    card.appendChild(mgr_name_div);

    const mgr_buts_div = document.createElement('div');
    mgr_buts_div.classList.add('mgr_buts_div');

    mgr_buts_div.classList.add('mgr_buts_div');
    const mgr_save_div = document.createElement('div');
    mgr_save_div.classList.add('mgr_save_div');
    const mgr_save_i = document.createElement('i');
    mgr_save_i.classList.add('fa-solid');
    mgr_save_i.classList.add('fa-floppy-disk');
    mgr_save_i.addEventListener('click', () => {
        const data = {
            method: 'PATCH',
            new_name: cat_name_input.value,
            old_name: categ.categ_name
        }
        HandleCategRequest(data);
    });
    mgr_save_div.appendChild(mgr_save_i);
    mgr_buts_div.appendChild(mgr_save_div);
    const mgr_up_div = document.createElement('div');
    mgr_up_div.classList.add('mgr_up_div');
    const mgr_up_i = document.createElement('i');
    mgr_up_i.classList.add('fa-solid');
    mgr_up_i.classList.add('fa-arrow-up');
    if (sort_ids[0] == 0) { mgr_up_i.classList.add('icon_disable'); }
    else {
        mgr_up_i.addEventListener('click', () => {
            const data = {
                method: 'PATCH',
                categ_id_1: sort_ids[0],
                categ_id_2: categ.categ_id
            }
            HandleCategRequest(data);
        });
    }
    mgr_up_div.appendChild(mgr_up_i);
    mgr_buts_div.appendChild(mgr_up_div);
    const mgr_down_div = document.createElement('div');
    mgr_down_div.classList.add('mgr_down_div');
    const mgr_down_i = document.createElement('i');
    mgr_down_i.classList.add('fa-solid');
    mgr_down_i.classList.add('fa-arrow-down');
    if (sort_ids[1] == 0) { mgr_down_i.classList.add('icon_disable'); }
    else {
        mgr_down_i.addEventListener('click', () => {
            const data = {
                method: 'PATCH',
                categ_id_1: categ.categ_id,
                categ_id_2: sort_ids[1]
            }
            HandleCategRequest(data);
        });
    }
    mgr_down_div.appendChild(mgr_down_i);
    mgr_buts_div.appendChild(mgr_down_div);
    const mgr_del_div = document.createElement('div');
    mgr_del_div.classList.add('mgr_del_div');
    const mgr_del_i = document.createElement('i');
    mgr_del_i.classList.add('fa-solid');
    mgr_del_i.classList.add('fa-trash');
    if (!deletable) { mgr_del_i.classList.add('icon_disable'); }
    else {
        mgr_del_i.addEventListener('click', () => {
            const data = {
                method: 'DELETE',
                categ_id: categ.categ_id
            }
            HandleCategRequest(data);
        });
    }
    mgr_del_div.appendChild(mgr_del_i);
    mgr_buts_div.appendChild(mgr_del_div);
    card.appendChild(mgr_buts_div);

    return card;

}


function createVirginCategCard(next_sort_id) {

    const card = document.createElement('div');
    card.classList.add('menu_manage_list_cat_div');
    card.classList.add('menu_manage_list_v_cat_div');
    const input_div = document.createElement('div');
    input_div.classList.add('input_div');
    const categ_input = document.createElement('input');
    categ_input.type = 'text';
    categ_input.placeholder = 'Nom de la catégorie';
    input_div.appendChild(categ_input);
    const i_add = document.createElement('i');
    i_add.classList.add('fa-solid');
    i_add.classList.add('fa-plus');
    i_add.addEventListener('click', () => {
        if (categ_input.value.length) {
            const data = {
                method: 'POST',
                categ_name: categ_input.value,
                categ_sort: next_sort_id
            }
            HandleCategRequest(data);
        }
    });
    input_div.appendChild(i_add);
    card.appendChild(input_div);
    return card;    

}


function createFoodCard(food) {

    const card = document.createElement('div');
    card.object = food;
    card.classList.add('mgr_food_main_div');
    const mgr_food_img_div = document.createElement('div');
    mgr_food_img_div.classList.add('mgr_food_img_div');
    const food_image = document.createElement('img');
    food_image.src = '../public-clients/aliments/images/' + food.food_image;
    // hidden input to simulate a file selection when image clicked
    const img_file_input = document.createElement('input');
    img_file_input.type = 'file';
    img_file_input.name = 'food_image_file';
    img_file_input.style.display = 'none';
    img_file_input.addEventListener('change', (event) => {
        const selected_file = event.target.files[0];
        if (selected_file) {
            const data = {
                method: 'PATCH',
                food_id: food.food_id,
                food_image: selected_file
            }
            console.log("Selected file for product no." + food.food_id + ":");
            console.log(selected_file);
            HandleFoodRequest(data);
        }
    });
    // provoke a change back to img_file_input
    food_image.addEventListener('click', () => {
        img_file_input.click();
    });
    mgr_food_img_div.appendChild(food_image);
    card.appendChild(mgr_food_img_div);
    const mgr_food_right_div = document.createElement('div');
    mgr_food_right_div.classList.add('mgr_food_right_div');
    const mgr_food_top_div = document.createElement('div');
    mgr_food_top_div.classList.add('mgr_food_top_div');
    const mgr_name_div = document.createElement('div');
    mgr_name_div.classList.add('mgr_name_div');
    const mgr_name_input = document.createElement('input');
    mgr_name_input.type = 'text';
    mgr_name_input.value = food.food_name;
    mgr_name_input.placeholder = 'Nom de l\'aliment';
    mgr_name_div.appendChild(mgr_name_input);
    mgr_food_top_div.appendChild(mgr_name_div);
    const mgr_buts_div = document.createElement('div');
    mgr_buts_div.classList.add('mgr_buts_div');
    const mgr_save_div = document.createElement('div');
    mgr_save_div.classList.add('mgr_save_div');
    const mgr_save_i = document.createElement('i');
    mgr_save_i.classList.add('fa-solid');
    mgr_save_i.classList.add('fa-floppy-disk');
    mgr_save_i.addEventListener('click', () => {
        const data = {
            method: 'PATCH',
            food_id: food.food_id,
            food_name: mgr_name_input.value,
            food_descr: mgr_food_descr_input.value,
            food_price: mgr_food_price_input.value,
            food_avail: mgr_food_avail_toggle.checked
        }
        HandleFoodRequest(data);
        console.log("On tente de sauvegarder le nom/descr/prix du produit no." + food.food_id);
    });
    mgr_save_div.appendChild(mgr_save_i);
    mgr_buts_div.appendChild(mgr_save_div);
    const mgr_up_div = document.createElement('div');
    mgr_up_div.classList.add('mgr_up_div');
    const mgr_up_i = document.createElement('i');
    mgr_up_i.classList.add('fa-solid');
    mgr_up_i.classList.add('fa-arrow-up');
    mgr_up_i.classList.add('icon_disable');
    mgr_up_i.addEventListener('click', () => {
        // TO DO (when food order will be possible)
        console.log("On tente de monter l'ordre du produit no." + food.food_id);
    });
    mgr_up_div.appendChild(mgr_up_i);
    mgr_buts_div.appendChild(mgr_up_div);
    const mgr_down_div = document.createElement('div');
    mgr_down_div.classList.add('mgr_down_div');
    const mgr_down_i = document.createElement('i');
    mgr_down_i.classList.add('fa-solid');
    mgr_down_i.classList.add('fa-arrow-down');
    mgr_down_i.classList.add('icon_disable');
    mgr_down_i.addEventListener('click', () => {
        // TO DO (when food order will be possible)
        console.log("On tente de descendre l'ordre du produit no." + food.food_id);
    });
    mgr_down_div.appendChild(mgr_down_i);
    mgr_buts_div.appendChild(mgr_down_div);
    const mgr_del_div = document.createElement('div');
    mgr_del_div.classList.add('mgr_del_div');
    const mgr_del_i = document.createElement('i');
    mgr_del_i.classList.add('fa-solid');
    mgr_del_i.classList.add('fa-trash');
    mgr_del_i.addEventListener('click', () => {
        const data = {
            method: 'DELETE',
            food_id: food.food_id,
        }
        HandleFoodRequest(data);
        console.log("On tente de supprimer le produit no." + food.food_id);
    });
    mgr_del_div.appendChild(mgr_del_i);
    mgr_buts_div.appendChild(mgr_del_div);
    mgr_food_top_div.appendChild(mgr_buts_div);
    mgr_food_right_div.appendChild(mgr_food_top_div);
    const mgr_food_bottom_div = document.createElement('div');
    mgr_food_bottom_div.classList.add('mgr_food_bottom_div');
    const mgr_food_descr_div = document.createElement('div');
    mgr_food_descr_div.classList.add('mgr_food_descr_div');
    const mgr_food_descr_input = document.createElement('input');
    mgr_food_descr_input.type = 'text';
    mgr_food_descr_input.value = food.food_descr;
    mgr_food_descr_input.placeholder = 'Description de l\'aliment';
    mgr_food_descr_div.appendChild(mgr_food_descr_input);
    mgr_food_bottom_div.appendChild(mgr_food_descr_div);
    const mgr_food_price_div = document.createElement('div');
    mgr_food_price_div.classList.add('mgr_food_price_div');
    const mgr_food_price_input = document.createElement('input');
    mgr_food_price_input.type = 'text';
    mgr_food_price_input.value = food.food_price.toFixed(2);
    mgr_food_price_input.placeholder = '0.00';
    mgr_food_price_div.appendChild(mgr_food_price_input);
    mgr_food_bottom_div.appendChild(mgr_food_price_div);
    const mgr_food_avail_div = document.createElement('div');
    mgr_food_avail_div.classList.add('mgr_food_avail_div');
    const mgr_food_avail_label = document.createElement('label');
    mgr_food_avail_label.classList.add('switch');
    const mgr_food_avail_toggle = document.createElement('input');
    mgr_food_avail_toggle.type = 'checkbox';
    mgr_food_avail_toggle.id = 'avail_toggle_' + food.food_id;
    mgr_food_avail_toggle.checked = food.food_avail ? true : false;
    mgr_food_avail_label.appendChild(mgr_food_avail_toggle);
    const mgr_food_avail_span = document.createElement('span');
    mgr_food_avail_span.classList.add('slider');
    mgr_food_avail_span.classList.add('slider_avail');
    mgr_food_avail_label.appendChild(mgr_food_avail_span);
    mgr_food_avail_div.appendChild(mgr_food_avail_label);
    mgr_food_bottom_div.appendChild(mgr_food_avail_div);
    mgr_food_right_div.appendChild(mgr_food_bottom_div);
    card.appendChild(mgr_food_right_div);
    return card;
}


function createVirginFoodCard(categ_id) {

    const card = document.createElement('div');
    card.classList.add('mgr_v_food_div');
    const input_div = document.createElement('div');
    input_div.classList.add('input_div');
    input_div.classList.add('v_food_input_div');
    const food_name_input = document.createElement('input');
    food_name_input.type = 'text';
    food_name_input.placeholder = 'Nom de l\'aliment';
    input_div.appendChild(food_name_input);
    const i_add = document.createElement('i');
    i_add.classList.add('fa-solid');
    i_add.classList.add('fa-plus');
    i_add.addEventListener('click', () => {
        if (food_name_input.value.length) {
            const data = {
                method: 'POST',
                categ_id: categ_id,
                food_name: food_name_input.value
            }
            HandleFoodRequest(data);
        }
    });
    input_div.appendChild(i_add);
    card.appendChild(input_div);
    return card;

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
        await new Promise(resolve => setTimeout(resolve, 2000)); // fake network lag
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


// animation + request + reload cards
async function HandleCategRequest(data) {

    saveAnimAndFreeze(true);
    try {
        const response = await categRequest(data);
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


// html request for categ
async function categRequest(data) {

    try {
        const response = await fetch('/monsystemeresto/app/controllers/categController.php', {
            method: data.method,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });
        await new Promise(resolve => setTimeout(resolve, 2000)); // fake network lag
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


// animation + insert + reload cards
async function HandleFoodRequest(data) {

    saveAnimAndFreeze(true);
    try {
        const response = await foodRequest(data);
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


// html request for food insert
async function foodRequest(data) {

    try {
        const response = await fetch('/monsystemeresto/app/controllers/foodController.php', {
            method: data.method,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });
        await new Promise(resolve => setTimeout(resolve, 2000)); // fake network lag
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

    document.getElementById('menu_manage_popup_load_anim').style.display = state ? "flex" : "none";
    
}
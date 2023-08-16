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
            if (!(index < (food_data_array.length - 1) && 
                food_data_array[index + 1][0] instanceof Food && 
                c[0].categ_id == food_data_array[index + 1][0].categ_id)) {
                // console.log((index < (food_data_array.length - 2)) + " " + (food_data_array[index + 1] instanceof Food) + " " + (c.categ_id == food_data_array[index + 1].categ_id));
                // if next card is not another food card (still in same category), add a virgin (create new) food card
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
            method: 'PATCH',
            new_name: categ_input.value,
            old_name: categ.categ_name
        }
        HandleCategRequest(data);
    });
    menu_manage_list_cat_div_but_1.appendChild(i_save);
    menu_manage_list_cat_div_but.appendChild(menu_manage_list_cat_div_but_1);
    const menu_manage_list_cat_div_but_2 = document.createElement('div');
    menu_manage_list_cat_div_but_2.classList.add('menu_manage_list_cat_div_but_1_4');
    const i_up = document.createElement('i');
    i_up.classList.add('fa-solid');
    i_up.classList.add('fa-arrow-up');
    if (sort_ids[0] == 0) { i_up.classList.add('icon_disable'); }
    else {
        i_up.addEventListener('click', () => {
            const data = {
                method: 'PATCH',
                categ_id_1: sort_ids[0],
                categ_id_2: categ.categ_id
            }
            HandleCategRequest(data);
        });
    }
    menu_manage_list_cat_div_but_2.appendChild(i_up);
    menu_manage_list_cat_div_but.appendChild(menu_manage_list_cat_div_but_2);

    const menu_manage_list_cat_div_but_3 = document.createElement('div');
    menu_manage_list_cat_div_but_3.classList.add('menu_manage_list_cat_div_but_1_4');
    const i_down = document.createElement('i');
    i_down.classList.add('fa-solid');
    i_down.classList.add('fa-arrow-down');
    if (sort_ids[1] == 0) { i_down.classList.add('icon_disable'); }
    else {
        i_down.addEventListener('click', () => {
            const data = {
                method: 'PATCH',
                categ_id_1: categ.categ_id,
                categ_id_2: sort_ids[1]
            }
            HandleCategRequest(data);
        });
    }
    menu_manage_list_cat_div_but_3.appendChild(i_down);
    menu_manage_list_cat_div_but.appendChild(menu_manage_list_cat_div_but_3);

    const menu_manage_list_cat_div_but_4 = document.createElement('div');
    menu_manage_list_cat_div_but_4.classList.add('menu_manage_list_cat_div_but_1_4');
    const i_delete = document.createElement('i');
    i_delete.classList.add('fa-solid');
    i_delete.classList.add('fa-trash');
    if (deletable == false) { i_delete.classList.add('icon_disable'); }
    else {
        i_delete.addEventListener('click', () => {
            const data = {
                method: 'DELETE',
                categ_id: categ.categ_id
            }
            HandleCategRequest(data);
        });
    }
    menu_manage_list_cat_div_but_4.appendChild(i_delete);
    menu_manage_list_cat_div_but.appendChild(menu_manage_list_cat_div_but_4);

    card.appendChild(menu_manage_list_cat_div_but);

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


function createVirginFoodCard(categ_id) {

    const card = document.createElement('div');
    card.classList.add('menu_manage_list_food_div');
    card.classList.add('menu_manage_list_v_food_div');

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
                categ_id: categ_id,
                food_name: food_name_input.value
            }
            HandleCreateFood(data);
        }
    });
    input_div.appendChild(i_add);

    card.appendChild(input_div);

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
async function HandleCreateFood(data) {

    saveAnimAndFreeze(true);
    try {
        const response = await createFood(data);
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
async function createFood(data) {

    try {
        const response = await fetch('/monsystemeresto/app/controllers/foodController.php', {
            method: 'POST',
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
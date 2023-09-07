import { Food } from '../../common/scripts/Food.js';
import { Categ } from '../../common/scripts/Categ.js';


$(document).ready(function() {
    
    handleGetAll();

});


async function handleGetAll() {

    try {
        const response = await fetch('../../../server/controllers/foodController.php', {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        });
        await new Promise(resolve => setTimeout(resolve, 2000)); // fake network lag
        const response_data = await response.json();
        if (!response_data[0]) {
            throw new Error(response_data[1]);
        }
        else {
            showCategsAndFoods(response_data[1]);
        }
    }
    catch (e) {
        console.error("Error: " + e);
        showErrorNotif(e);
    }

}


function showCategsAndFoods(food_data) {

    const catbar_but = document.getElementById("catbar_but");
    const food_grids_list = document.getElementById('food_grids_list');

    let foods_grid;

    // create sorted (as the end result) array for the cards list
    food_data.forEach((a, index) => {

        if (a.type == "category") {

            const categ = new Categ(a.id, a.name, a.sort);

            // cat bar button
            const button = document.createElement("button");
            button.type = "button";
            button.textContent = a.name;
            button.classList.add("categ_but");
            index == 0 ? button.classList.add("nav_cat_but_hover") : null;
            button.setAttribute('data-categ', JSON.stringify(categ));
            button.setAttribute('data-categ_id', a.id);
            button.addEventListener('click', function(event) {
                event.preventDefault();
                const category_top = categ_section.offsetTop - parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--padding_top'));
                window.scrollTo({ top: category_top, behavior: 'smooth' });
            });
            catbar_but.appendChild(button);

            // grid cat title
            const categ_section = document.createElement('section');
            categ_section.classList.add('categ_section');
            categ_section.setAttribute('id', a.id);
            const categ_title = document.createElement('h2');
            categ_title.textContent = a.name;
            categ_section.appendChild(categ_title);
            food_grids_list.appendChild(categ_section);

            foods_grid = document.createElement('div');
            foods_grid.classList.add('foods_grid');
            categ_section.appendChild(foods_grid);

            // food cards
            food_data.forEach((b, index) => {
                if (b.categ_id == a.id) {
                    const food = new Food(b.id, b.categ_id, b.name, b.food_avail, b.food_price, b.food_image, b.food_descr);
                    const food_card = createFoodCard(food);
                    foods_grid.appendChild(food_card);
                }
            });
        }
    });

}


document.addEventListener("DOMContentLoaded", function() {
    updateButtonHoverState("1");
});

function updateButtonHoverState(categ_id) {
    const buttons = document.querySelectorAll('.categ_but');
    buttons.forEach(button => {
        if (button.dataset.categ_id == categ_id) {
            button.classList.add('nav_cat_but_hover');
        } else {
            button.classList.remove('nav_cat_but_hover');
        }
    });
}


window.addEventListener("scroll", function() {
    var topValuesArray = [];
    const sections = document.querySelectorAll('.categ_section');
    sections.forEach(section => {
        topValuesArray.push(section.offsetTop);
    });
    const y = window.scrollY + parseInt(getComputedStyle(document.documentElement).getPropertyValue('--padding_top')) + 40;
    for (var i = 0; i < topValuesArray.length - 1; i++) {
        if (topValuesArray[i] < y && y < topValuesArray[i + 1]) {
            updateButtonHoverState(i + 1);
        }
    }
    if (y >= topValuesArray[topValuesArray.length - 1]) {
        updateButtonHoverState(topValuesArray.length);
    }
});


function createFoodCard(food) {

    
    // main element
    const card = document.createElement('div');
    card.classList.add('food_card');
    // associate food Object with this card div element
    card.setAttribute('data-food', JSON.stringify(food));

    // food (object) association
    card.setAttribute('food_data', JSON.stringify(food));

    // image
    const image = document.createElement('img');
    image.src = '../../server/food/' + food.food_image;
    image.alt = 'img alt : ' + food.food_name;
    card.appendChild(image);

    // name and price
    const name_price_div = document.createElement('div');
    name_price_div.classList.add('food_details');

    const name_price_p = document.createElement('p');
    name_price_p.classList.add('food_name_price');

    const name = document.createElement('span');
    name.classList.add('food_name');
    name.textContent = food.food_name;
    name_price_p.appendChild(name);

    const price = document.createElement('span');
    price.classList.add('food_price');
    price.textContent = `$${food.food_price.toFixed(2)}`;

    name_price_p.appendChild(price);
    name_price_div.appendChild(name_price_p);
    card.appendChild(name_price_div);
    
    // quantity
    const qty_settings = document.createElement('div');
    qty_settings.classList.add('qty_settings');

    const dec_but = document.createElement('button');
    dec_but.textContent = '-';
    dec_but.classList.add('qty_but');
    dec_but.classList.add('qty_minus');
    dec_but.addEventListener('click', () => {
        if (!isNaN(qty_input.value) && parseInt(qty_input.value) > 1) {
            qty_input.value = parseInt(qty_input.value) - 1;
        }
    });

    const qty_input = document.createElement('input');
    qty_input.type = 'number';
    qty_input.value = 1;
    qty_input.classList.add('qty_input');

    const inc_but = document.createElement('button');
    inc_but.textContent = '+';
    inc_but.addEventListener('click', () => {
        if (!isNaN(qty_input.value)) {
            qty_input.value = parseInt(qty_input.value) + 1;
        }
    });

    dec_but.addEventListener('click', (event) => { event.stopPropagation(); });
    qty_settings.appendChild(dec_but);
    qty_input.addEventListener('click', (event) => { event.stopPropagation(); });
    qty_settings.appendChild(qty_input);
    inc_but.addEventListener('click', (event) => { event.stopPropagation(); });
    qty_settings.appendChild(inc_but);

    // add to cart
    const add_cart_but = document.createElement('button');
    add_cart_but.classList.add('add_but');
    add_cart_but.textContent = 'Ajouter';
    add_cart_but.addEventListener('click', (event) => { 
        event.stopPropagation();
        const qty = parseInt(qty_input.value);
        cardAddToCart(food, qty);
    });
    qty_settings.appendChild(add_cart_but);

    card.appendChild(qty_settings);

    card.addEventListener('click', () => {
        openFoodDescrPopup((food.food_descr == null || food.food_descr == "") ? "Aucune description." : food.food_descr);
    });    

    return card;

}

var food_data;


$(document).ready(function() {
    
    // first time init
    getFoodWithCateg()
    .then(function(result) {
        food_data = result;
        showCategAndFoods();
    })
    .catch(function(error) {
        console.error('Error:', error);
    });

});


function getFoodWithCateg() {

    return new Promise(function(resolve, reject) {
        $.ajax({
            url: '/monsystemeresto/app/controllers/FoodController.php',
            type: 'GET',
            dataType: 'json',
            success: function(result) {
                food_data = result;
                resolve(result);
            },
            error: function(xhr, status, error) {
                console.log('Error :', error);
                reject(error);
            }
        });
    });
}


function showCategAndFoods() {

    const catbar_but = document.getElementById("catbar_but");
    const food_grids_list = document.getElementById('food_grids_list');

    // Return if no food data
    if (!food_data.length) { return; }

    var unique_categ = null;
    var first_but_init = 0;
    var foods_grid;
    
    food_data.forEach(function(jf) {
        const food = new Food(jf.food_id, jf.categ_id, jf.food_name, jf.food_avail, jf.food_price, jf.food_image, jf.food_descr, jf.food_options, jf.food_sold, jf.food_stock);

        if (unique_categ != food.categ_id) {
            unique_categ = food.categ_id;
            const categ = new Categ(jf.categ_id, jf.categ_name, jf.categ_sort, jf.categ_image, jf.categ_descr);

            const button = document.createElement("button");
            button.type = "button";
            button.textContent = jf.categ_name;
            button.classList.add("categ_but");
            first_but_init ? null: button.classList.add("nav_cat_but_hover") ;
            first_but_init++;
            button.setAttribute('data-categ', JSON.stringify(categ));
            button.setAttribute('data-categ_id', categ.categ_id);
            button.addEventListener('click', function(event) {
                event.preventDefault();
                const category_top = categ_section.offsetTop - parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--padding_top'));
                window.scrollTo({ top: category_top, behavior: 'smooth' });
            });
            catbar_but.appendChild(button);

            const categ_section = document.createElement('section');
            categ_section.classList.add('categ_section');
            categ_section.setAttribute('id', categ.categ_id);
            const categ_title = document.createElement('h2');
            categ_title.textContent = categ.categ_name;
            categ_section.appendChild(categ_title);
            food_grids_list.appendChild(categ_section);

            foods_grid = document.createElement('div');
            foods_grid.classList.add('foods_grid');
            categ_section.appendChild(foods_grid);
        }

        const food_card = createFoodCard(food);
        foods_grid.appendChild(food_card);

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




class Food {
    constructor(food_id, categ_id, food_name, food_avail, food_price, food_image, food_descr, food_options, food_sold, food_stock) {
        this.food_id = food_id;
        this.categ_id = categ_id;
        this.food_name = food_name;
        this.food_avail = food_avail;
        this.food_price = food_price;
        this.food_image = food_image;
        this.food_descr = food_descr;
        this.food_options = food_options;
        this.food_sold = food_sold;
        this.food_stock = food_stock;
    }
}


class Categ {
    constructor(categ_id, categ_name, categ_sort, categ_image, categ_descr) {
        this.categ_id = categ_id;
        this.categ_name = categ_name;
        this.categ_sort = categ_sort;
        this.categ_image = categ_image;
        this.categ_descr = categ_descr;
      }
}


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
    image.src = '/monsystemeresto/public-clients/aliments/images/' + food.food_image;
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

    if (food.food_descr) {
        card.addEventListener('click', () => {
            openFoodDescrPopup(food.food_descr);
        });    
    }

    return card;

}

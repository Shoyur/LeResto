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

    // categs buttons bar
    const catbar_but = document.getElementById("catbar_but");
    // food cards grids list
    const food_grids_list = document.getElementById('food_grids_list');

    // return if no food datas
    if (!food_data.length) { return; }

    var unique_categ = null;
    var categ_grid;

    food_data.forEach(function(jf) {
        
        // jf = json food
        // food = Food object
        const food = new Food(jf.food_id, jf.categ_id, jf.food_name, jf.food_avail, jf.food_price, jf.food_image, jf.food_descr, jf.food_options, jf.food_sold, jf.food_stock);

        // if new categ, add button and create new categ foods grid
        if (unique_categ != food.categ_id) {

            // no longer new
            unique_categ = food.categ_id;

            // catbar button
            const button = document.createElement("button");
            button.type = "button";
            button.textContent = jf.categ_name;
            button.classList.add("categ_but");
            // go to smooth scroll
            button.addEventListener('click', function(event) {
                event.preventDefault();
                const category_top = categ_div.offsetTop - parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--padding_top'));
                window.scrollTo({ top: category_top, behavior: 'smooth' });
            });
            catbar_but.appendChild(button);

            // categ container, title, etc.
            const categ_div = document.createElement('div');
            categ_div.classList.add('categ_div');
            categ_div.style.backgroundColor = 'var(--col_GB1)';
            const categ_title = document.createElement('h2');
            categ_title.textContent = jf.categ_name;
            categ_title.style.color = 'var(--col_1)';
            categ_div.appendChild(categ_title);
            food_grids_list.appendChild(categ_div);

            // single categ foods grid
            categ_grid = document.createElement('div');
            categ_grid.classList.add('foods_grid');

        }

        // food card and append
        const food_card = createFoodCard(food);
        categ_grid.appendChild(food_card);
        categ_grid.style.backgroundColor = 'var(--col_GB1)';
        food_grids_list.appendChild(categ_grid);

    });

}


// // using sql statement instead 
// function parseFoodDataCategs() {

//     // map to have unique categories
//     const categ_map = new Map();
//     food_data.forEach(item => categ_map.set(item.categ_name, item.categ_sort));
//     // sort in order of categ_sort and put it in an array
//     const sorted_categs = Array.from(categ_map.entries()).sort((a, b) => a[1] - b[1]);
//     // array with only categ name
//     const categs_array = sorted_categs.map(category => category[0]);
//     return categs_array;

// }


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

    const increaseButton = document.createElement('button');
    increaseButton.textContent = '+';
    increaseButton.addEventListener('click', () => {
        if (!isNaN(qty_input.value)) {
            qty_input.value = parseInt(qty_input.value) + 1;
        }
    });

    qty_settings.appendChild(dec_but);
    qty_settings.appendChild(qty_input);
    qty_settings.appendChild(increaseButton);

    // add to cart
    const addToCartBtn = document.createElement('button');
    addToCartBtn.classList.add('add_but');
    addToCartBtn.textContent = 'Ajouter';
    // Add click event listener to handle adding to cart functionality (if needed)
    qty_settings.appendChild(addToCartBtn);

    
    
    card.appendChild(qty_settings);

    // card.addEventListener('click', ...);
    // const foodDescription = document.createElement('p');
    // foodDescription.classList.add('food_description');                          ///////////////// TO DO (description popup on click)
    // foodDescription.textContent = food.food_descr;
    // foodDetails.appendChild(foodDescription);

    return card;

}


const but_user = document.getElementById('test_commande_random');
const details = [
    [5, 7, "Kombucha Maison", ""],
    [4, 9, "Won Ton Frits", "Sauce séparée"],
    [3, 10, "Won Ton Vapeur", ""],
    [2, 45, "Sandwich UFO Porc Éffiloché", ""],
    [1, 36, "Sandwich UFO Max Caliente", ""],
];
const detailsString = JSON.stringify(details);
but_user.addEventListener('click', function() {
    $.ajax({
        url: '/monsystemeresto/app/controllers/commandeController.php',
        type: 'POST',
        data: {
            action: 'createCommande',
            id_client: null,
            livr: 1,
            stotal: 12.34,
            txtotal: 13.45,
            details: detailsString
        },
        dataType: 'json',
        success: function(reponse) {
            console.warn("commande random passée !! et reponse (id?) = " + reponse)
        },
        error: function(xhr, status, error) {
            console.log('Erreur:', error);
        }
    });
});
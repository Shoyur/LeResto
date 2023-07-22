    // // Boutons catégories
    // const catbar_but = document.getElementById("catbar_but");
    // catbar_but.innerHTML = "";

    // // Listes aliments
    // const food_grids_list = document.getElementById('food_grids_list');

    // if (categs.length > 0) {
    //     var i = 0;
    //     categs.forEach(function(categ) {
    //         i++;

    //         // Boutons catégories
    //         const button = document.createElement("button");
    //         button.type = "button";
    //         button.textContent = categ.nom_categ;
    //         button.classList.add("categ_but");
    //         catbar_but.appendChild(button);



    //         // Liste de grids
            const categoryDiv = document.createElement('div');
            categoryDiv.classList.add('category');

    //         categoryDiv.style.backgroundColor = 'var(--col_GB1)';

    //         const categoryHeading = document.createElement('h2');
    //         categoryHeading.textContent = categ.nom_categ;
    //         categoryHeading.style.color = 'var(--col_1)';
    //         categoryDiv.appendChild(categoryHeading);

            const categoriesGrid = document.createElement('div');
            categoriesGrid.classList.add('meals-grid');

    //         getFoodWithCateg()
    //         .then(function(aliments) {
    //             aliments.forEach(aliment => {
    //                 const carte_aliment= createFoodCard(aliment);
    //                 categoriesGrid.appendChild(carte_aliment);
    //                 });
    //         })
    //         .catch(function(error) {
    //             console.error('Error:', error);
    //         });

    //         food_grids_list.appendChild(categoryDiv);
    //         // categoriesGrid.style.backgroundColor = (i % 2) ? 'var(--col_GB1)' : 'var(--col_GB2)' ;
    //         categoriesGrid.style.backgroundColor = 'var(--col_GB1)';
    //         food_grids_list.appendChild(categoriesGrid);

    //         button.addEventListener('click', function(event) {
    //             event.preventDefault();
    //             const categoryTop = categoryDiv.offsetTop - parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--padding_top'));
    //             window.scrollTo({ top: categoryTop, behavior: 'smooth' });
    //         });

    //     });
    // }
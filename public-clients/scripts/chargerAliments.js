$(document).ready(function() {

    // VARIABLE POUR LE POPUP (COMMANDE SÉLECTIONNÉE À TERMINER)
    var selection;

    function readAllCateg() {
        $.ajax({
            url: '/monsystemeresto/app/controllers/categController.php',
            type: 'POST',
            data: {
                action: 'readAllCateg'
            },
            dataType: 'json',
            success: function(categs) {
                afficherCategsAliments(categs);
            },
            error: function(xhr, status, error) {
                console.log('Erreur:', error);
            }
        });
    }

    function readAlimentsByCateg(id_categ) {

        return new Promise(function(resolve, reject) {
            $.ajax({
              url: '/monsystemeresto/app/controllers/alimentController.php',
              type: 'POST',
              data: {
                action: 'readAlimentsByCateg',
                id: id_categ
              },
              dataType: 'json',
              success: function(aliments) {
                resolve(aliments);
              },
              error: function(xhr, status, error) {
                console.log('Erreur:', error);
                reject(error);
              }
            });
          });

    }

    function afficherCategsAliments(categs) {

        // Boutons catégories
        const navList = document.getElementById("navList");
        navList.innerHTML = "";

        // Listes aliments
        const liste_de_grids = document.getElementById('liste_de_grids');

        if (categs.length > 0) {
            categs.forEach(function(categ) {

                // Boutons catégories
                const li = document.createElement("li");
                const a = document.createElement("a");
                a.href = "#";
                a.textContent = categ.nom_categ;
                a.classList.add("categ_but");
                li.appendChild(a);
                navList.appendChild(li);



                // Liste de grids
                const categoryDiv = document.createElement('div');
                categoryDiv.classList.add('category');

                const categoryHeading = document.createElement('h2');
                categoryHeading.textContent = categ.nom_categ;
                categoryDiv.appendChild(categoryHeading);

                const separator = document.createElement('hr');
                categoryDiv.appendChild(separator);

                const categoriesGrid = document.createElement('div');
                categoriesGrid.classList.add('meals-grid');

                readAlimentsByCateg(categ.id_categ)
                .then(function(aliments) {
                    aliments.forEach(aliment => {
                        const carte_aliment= createMealCard(aliment);
                        categoriesGrid.appendChild(carte_aliment);
                      });
                })
                .catch(function(error) {
                    console.error('Error:', error);
                });

                liste_de_grids.appendChild(categoryDiv);
                liste_de_grids.appendChild(categoriesGrid);

                

            });
        }
    
    }

    // Exécuter l'affichage la première fois quand ce script est chargé
    readAllCateg();











    function createMealCard(meal) {
        const card = document.createElement('div');
        card.classList.add('meal-card');
      
        const image = document.createElement('img');
        image.src = "/monsystemeresto/public-clients/aliments/images/" + meal.image_alim;
        image.alt = 'img alt : ' + meal.nom_alim;
        card.appendChild(image);
      
        const mealDetails = document.createElement('div');
        mealDetails.classList.add('meal-details');
      
        const mealName = document.createElement('p');
        mealName.classList.add('meal-name');
        mealName.textContent = meal.nom_alim;
        mealDetails.appendChild(mealName);
      
        const mealPrice = document.createElement('p');
        mealPrice.classList.add('meal-price');
        mealPrice.textContent = `$${meal.prix_alim.toFixed(2)}`;
        mealDetails.appendChild(mealPrice);
      
        const mealDescription = document.createElement('p');
        mealDescription.classList.add('meal-description');
        mealDescription.textContent = meal.descr_alim;
        mealDetails.appendChild(mealDescription);
      
        card.appendChild(mealDetails);
      
        const addToCartBtn = document.createElement('button');
        addToCartBtn.classList.add('ajouter_but');
        addToCartBtn.textContent = 'Ajouter à la commande';
        // Add click event listener to handle adding to cart functionality (if needed)
        card.appendChild(addToCartBtn);
      
        return card;
      }




    //   case "createCommande":
    //     $id_client = $_POST['id_client'];
    //     $livr = $_POST['livr'];
    //     $stotal = $_POST['stotal'];
    //     $txtotal = $_POST['txtotal'];
    //     $details = $_POST['details'];

    //  Test pour générer une commande random
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




});

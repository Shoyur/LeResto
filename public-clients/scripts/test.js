// Global arrays to store elements
const topValuesArray = [];
const sections = [];
const buttons = [];

// Function to populate arrays with elements
function populateArrays() {
    const sectionElements = document.querySelectorAll('.categ_section');
    const buttonElements = document.querySelectorAll('.categ_but');

    sectionElements.forEach(section => {
        sections.push(section);
        topValuesArray.push(section.offsetTop);
    });

    buttonElements.forEach(button => {
        buttons.push(button);
    });
}

// Execute the function to populate arrays once DOM is loaded
document.addEventListener("DOMContentLoaded", function() {
    populateArrays();
    updateButtonHoverState("1"); // Initialize the button hover state for the first section
    console.log("on dom loaded : ");
    console.log(topValuesArray);
    console.log(sections);
    console.log(buttons);
});

// Function to update button hover states based on scroll position
function updateButtonHoverState(categId) {
    buttons.forEach(btn => {
        // console.log("btn.dataset.categ_id = " + btn.dataset.categ_id);
        if (btn.dataset.categ_id == categId) {
            btn.classList.add('cat_bar_but_hover');
            // console.log("Devient rose pour bouton # " + categId);
        } else {
            btn.classList.remove('cat_bar_but_hover');
        }
    });
}

// Scroll event listener to update button hover states while scrolling
window.addEventListener("scroll", function() {
    const y = window.scrollY + parseInt(getComputedStyle(document.documentElement).getPropertyValue('--padding_top')) + 40;
    for (var i = 0; i < topValuesArray.length; i++) {
        if (topValuesArray[i] < y && y < topValuesArray[i + 1]) {
            // console.log("Vous êtes dans la section " + (i + 1));
            updateButtonHoverState(i + 1);
        }
    }
});
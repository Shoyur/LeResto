// Sample array of text links
const linksArray = ["Breuvages", "Italien", "Asiatique", "Américain", "Africain","Désserts", "Italien", "Asiatique", "Américain", "Africain","Désserts", "Italien", "Asiatique", "Américain", "Africain","Désserts", "Italien", "Asiatique", "Américain", "Africain","Désserts", "Italien", "Asiatique", "Américain", "Africain","Désserts", "Italien", "Asiatique", "Américain", "Africain","Désserts", "Italien", "Asiatique", "Américain", "Africain","Désserts", "Italien", "Asiatique", "Américain", "Africain","Désserts"];

// Function to generate the navigation bar
function generateNavBar() {
  const navList = document.getElementById("navList");
  
  // Clear any existing list items
  navList.innerHTML = "";
  
  // Generate list items from the array
  linksArray.forEach(linkText => {
    const li = document.createElement("li");
    const a = document.createElement("a");
    a.href = "#";
    a.textContent = linkText;
    li.appendChild(a);
    navList.appendChild(li);
  });
}

// Call the function to generate the initial navigation bar
generateNavBar();

// Scroll the navigation bar to the left
function scrollLeft() {
    const navWrapper = document.querySelector(".nav-wrapper");
    navWrapper.scrollLeft -= 100; // Adjust the scroll amount as needed
  }
  
  // Scroll the navigation bar to the right
  function scrollRight() {
    const navWrapper = document.querySelector(".nav-wrapper");
    navWrapper.scrollLeft += 100; // Adjust the scroll amount as needed
  }
  
  // Add event listeners to the arrow buttons
  const leftArrow = document.querySelector(".nav-left");
  const rightArrow = document.querySelector(".nav-right");
  
  leftArrow.addEventListener("click", scrollLeft);
  rightArrow.addEventListener("click", scrollRight);
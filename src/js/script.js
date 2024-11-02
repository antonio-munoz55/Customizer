const dropperContainer = document.querySelector(".dropperContainer");
const imagesContainer = document.querySelector("#imagesContainer");
const characterImages = document.querySelectorAll(".characterImage");
const characterName = document.querySelector(".characterName");
const titleInput = document.querySelector("#title");
const nameDisplay = document.querySelector(".name");
const colorTShirt = document.querySelectorAll('input[name="color"]');
const progressBarX = document.querySelector("#progressBarX");
const progressBarY = document.querySelector("#progressBarY");

let initialTranslateX = -75; // Initial horizontal translation for name
let initialTranslateY = -150; // Initial vertical translation for name
let currentImageSrc; // Variable to hold the source of the currently dragged image

// Function to add click events to images in the images container
function addClickEventToImages() {
    let imageElements = imagesContainer.querySelectorAll("img");
    
    imageElements.forEach(image => {
        image.addEventListener("click", () => {
            if (window.innerWidth <= 480) { // Check for mobile view
                changeCharacterImage(image);
            }
        });
    });
}

// Function to change character image when an image is clicked
function changeCharacterImage(image) {
    let newImageSrc = image.src; // Get the source of the clicked image
    characterImages.forEach((img) => {
        img.src = newImageSrc; // Set each character image to the new image
    });

    let fileName = newImageSrc.split('/').pop().replace(".png", "").toUpperCase();
    characterName.textContent = fileName; // Display the character's name
}

// Event listener for dragstart on images
imagesContainer.addEventListener("dragstart", (event) => {
    if (event.target.tagName === "IMG") {
        currentImageSrc = event.target.src;
        event.dataTransfer.setData("text/plain", currentImageSrc);
    }
});

// Prevent default behavior for drag over to allow drop
dropperContainer.addEventListener("dragover", (event) => {
    event.preventDefault();
});

// Event listener for drop action on the dropper container
dropperContainer.addEventListener("drop", (event) => {
    event.preventDefault();
    if (currentImageSrc) {
        characterImages.forEach((img) => {
            img.src = currentImageSrc; // Set character images to the dropped image
        });

        let fileName = currentImageSrc.split('/').pop().replace(".png", "").toUpperCase();
        characterName.textContent = fileName; // Display the character's name
    }
});

// Event listener for the title input field to update the displayed name
titleInput.addEventListener("input", (event) => {
    nameDisplay.textContent = event.target.value; // Update name display with input value
});

// Event listeners for color radio buttons to change t-shirt color and text color
colorTShirt.forEach(radio => {
    radio.addEventListener("change", (event) => {
        let selectedColor = event.target.value; // Get selected color
        dropperContainer.src = `./src/img/t-shirt_${selectedColor}.png`; // Change t-shirt image based on selected color

        // Change text color based on selected t-shirt color
        let textColor;
        if (selectedColor === "white") {
            textColor = "black";
        } else {
            textColor = "white";
        }

        nameDisplay.style.color = textColor;
        characterName.style.color = textColor;
    });
});

// Event listeners for progress bars to adjust name position
progressBarX.addEventListener("input", (event) => {
    let offsetX = event.target.value; // Get horizontal offset
    updateNamePosition(offsetX, progressBarY.value); // Update name position
});

progressBarY.addEventListener("input", (event) => {
    let offsetY = event.target.value; // Get vertical offset
    updateNamePosition(progressBarX.value, offsetY); // Update name position
});

// Function to update the position of the name display
function updateNamePosition(offsetX, offsetY) {
    let translateX = initialTranslateX + parseInt(offsetX); // Calculate new X position
    let translateY = initialTranslateY + parseInt(offsetY); // Calculate new Y position

    nameDisplay.style.transform = `translate(${translateX}px, ${translateY}px)`; // Apply translation to name display
}

addClickEventToImages();
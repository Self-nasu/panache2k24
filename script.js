document.addEventListener("DOMContentLoaded", function () {
    // Target the container where images will be displayed
    const galleryContainer = document.getElementById("imageGallery");

    // Path to the folder containing images
    const imagePath = "imgs/";

    // Fetch images from the folder
    fetchImages(imagePath)
        .then(images => {
            // Generate HTML code for each image
            const imageHTML = images.map(image => `<img src="${imagePath}${image}" alt="${image}">`).join('');

            // Append the generated HTML code to the gallery container
            galleryContainer.innerHTML = imageHTML;
        })
        .catch(error => {
            console.error("Error fetching images:", error);
        });
});

// Function to fetch images from the specified folder
function fetchImages(path) {
    return new Promise((resolve, reject) => {
        // Use XMLHttpRequest or fetch API to get the list of images
        const xhr = new XMLHttpRequest();
        xhr.open("GET", path, true);

        xhr.onload = function () {
            if (xhr.status == 200) {
                // Split the response into an array of image file names
                const images = xhr.responseText.split('\n').filter(image => image.trim() !== "");
                resolve(images);
            } else {
                reject(xhr.statusText);
            }
        };

        xhr.onerror = function () {
            reject("Network error");
        };

        xhr.send();
    });
}

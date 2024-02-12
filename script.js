document.addEventListener("DOMContentLoaded", function () {
    // Target the container where images will be displayed
    const galleryContainer = document.getElementById("imageGallery");

    // Path to the folder containing images
    const imagePath = "imgs";

    // Fetch the directory listing
    fetchDirectoryListing(imagePath)
        .then(images => {
            // Generate HTML code for each image with correct path
            console.log(imagePath);
            const imageHTML = images.map(image => `<img class="myuploads" src="${image}" alt="${image}">`).join('');

            // Append the generated HTML code to the gallery container
            galleryContainer.innerHTML = imageHTML;
        })
        .catch(error => {
            console.error("Error fetching directory listing:", error);
        });
});

// Function to fetch directory listing and extract image filenames
function fetchDirectoryListing(path) {
    return new Promise((resolve, reject) => {
        // Use XMLHttpRequest or fetch API to get the directory listing
        const xhr = new XMLHttpRequest();
        xhr.open("GET", path, true);

        xhr.onload = function () {
            if (xhr.status == 200) {
                // Extract image filenames from the directory listing HTML
                const filenames = extractImageFilenames(xhr.responseText);
                resolve(filenames);
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

// Function to extract image filenames from directory listing HTML
function extractImageFilenames(directoryListingHTML) {
    const regex = /<a[^>]*href=['"]([^'"]+\.(?:png|jpg|jpeg|gif))['"][^>]*>/g;
    const matches = [];
    let match;

    while ((match = regex.exec(directoryListingHTML)) !== null) {
        matches.push(match[1]);
    }

    return matches;
}

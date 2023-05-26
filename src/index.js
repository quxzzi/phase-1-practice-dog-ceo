document.addEventListener("DOMContentLoaded", () => {
    const imgUrl = "https://dog.ceo/api/breeds/image/random/4";
    const breedUrl = "https://dog.ceo/api/breeds/list/all";
    const imageContainer = document.getElementById("dog-image-container");
    const breedList = document.getElementById("dog-breeds");
    const filterDropdown = document.getElementById("breed-dropdown");
  
    fetch(imgUrl)
      .then(response => response.json())
      .then(data => {
        data.message.forEach(imageUrl => {
          const img = document.createElement("img");
          img.src = imageUrl;
          imageContainer.appendChild(img);
        });
      })
      .catch(error => {
        console.error("Error fetching images:", error);
      });
  
    fetch(breedUrl)
      .then(response => response.json())
      .then(data => {
        const breeds = Object.keys(data.message);
        breeds.forEach(breed => {
          const listItem = document.createElement("li");
          listItem.textContent = breed;
          breedList.appendChild(listItem);
        });
      })
      .catch(error => {
        console.error("Error fetching dog breeds:", error);
      });
  
    breedList.addEventListener("click", event => {
      if (event.target.tagName === "LI") {
        event.target.style.color = "red";
      }
    });
  
    filterDropdown.addEventListener("change", event => {
      const selectedLetter = event.target.value;
      const breedItems = breedList.getElementsByTagName("li");
      Array.from(breedItems).forEach(item => {
        const breedName = item.textContent.toLowerCase();
        if (breedName.startsWith(selectedLetter)) {
          item.style.display = "list-item";
        } else {
          item.style.display = "none";
        }
      });
    });
  });
  
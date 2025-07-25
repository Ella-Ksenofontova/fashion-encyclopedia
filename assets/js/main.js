function resizeImage(image, max_width = 200, max_height = 200) {
  const ratio = image.naturalWidth / image.naturalHeight;
  let width = 10;
  let height = 10;

  while (true) {
    let newWidth = width + 10;
    let newHeight = (1 / ratio) * newWidth;

    if (newWidth > max_width || newHeight > max_height) {
      break;
    }

    width = newWidth;
    height = newHeight;
  }

  image.width = width;
  image.height = height;
}

const images = Array.from(document.querySelectorAll(".gallery img"));
const wrappers = Array.from(document.querySelectorAll(".gallery .wrapper"));
const carousel = document.querySelector("#carousel");
const carouselItems = document.querySelectorAll("#carousel .carousel-item");

if (images) {

  for (let image of images) {
    if (image.naturalHeight === 0) {
      image.addEventListener("load", () => resizeImage(image));
    } else {
      resizeImage(image);
    }
  }

  if (carousel) {
    const indicators = document.querySelectorAll("#carousel .carousel-indicators button");

    document.querySelector(".gallery").addEventListener("click", event => {
      const index = images.indexOf(event.target);
      for (let i = 0; i < carouselItems.length; i++) {
        if (i === index) {
          carouselItems[i].classList.add("active");
          indicators[i].classList.add("active");
          indicators[i].setAttribute("aria-current", true);
        } else {
          carouselItems[i].classList.remove("active");
          indicators[i].classList.remove("active");
          indicators[i].setAttribute("aria-current", false);
        }
      }

      if (index >= 0) {
        carousel.showModal();
      }
    });

    const closeButton = document.getElementById("close");
    closeButton.addEventListener("click", () => {
      carousel.close();
    });
  }
}

const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]')
const tooltipList = [...tooltipTriggerList].map(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl))
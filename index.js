let container = document.querySelector(".service_img_slider_container");
let innerContainer = document.querySelector(".service_img_slider");

let serviceSlidersData = [
  {
    heading: "web Developer",
    description:
      "Hello we are the best web developers in the world contact us.",
    image: "Assets/serviceImages/1.png",
  },
  {
    heading: "software Developer",
    description:
      "Hello we are the best web developers in the world contact us.",
    image: "Assets/serviceImages/2.png",
  },
  {
    heading: "Python developer",
    description:
      "Hello we are the best web developers in the world contact us.",
    image: "Assets/serviceImages/3.png",
  },
  {
    heading: "Mobile app developer",
    description:
      "Hello we are the best web developers in the world contact us.",
    image: "Assets/serviceImages/4.png",
  },
  {
    heading: "Software Testing",
    description:
      "Hello we are the best web developers in the world contact us.",
    image: "Assets/serviceImages/5.png",
  },
  {
    heading: "Search engine optimization",
    description:
      "Hello we are the best web developers in the world contact us.",
    image: "Assets/serviceImages/6.jpg",
  },
  {
    heading: "Search engine optimization",
    description:
      "Hello we are the best web developers in the world contact us.",
    image: "Assets/serviceImages/3.png",
  },
];

let clientWidth = 0;


populate(
  "service_image_main_container",
  "service_image_template",
  serviceSlidersData
);
function populate(container, template, array) {
  const mainContainer = document.querySelector(`[${container}]`);
  console.log(template);
  const mainTemplate = document.querySelector(`[${template}]`);

  array.forEach((data) => {
    const mainCard = mainTemplate.content.cloneNode(true).children[0];
    const serviceImage = mainCard;
    const serviceHeading = mainCard.querySelector("[service_heading]");
    const serviceDescription = mainCard.querySelector("[service_description]");

    serviceImage.style.backgroundImage = `Url(${data.image})`;
    serviceHeading.textContent = data.heading;
    serviceDescription.textContent = data.description;
    mainContainer.appendChild(mainCard);
    clientWidth = mainCard.clientWidth
  });
}


let fontSize = window.getComputedStyle(container).fontSize;
let fontSizeInPixels = parseFloat(fontSize);
let slides = document.querySelectorAll(".service_imgs");
let additionalWidth = 2 * fontSizeInPixels;
let skipSlides = 2;
let slideWidthGlobal =clientWidth + additionalWidth;
let dotButtons = document.querySelectorAll(".slider_dot_btns");
let dotBtnsIndex = 0;
let intervalId;
let timeoutId;

// Function to update the selected dot and scroll position
function updateCarousel(index) {
  dotButtons.forEach((ele) => {
    ele.classList.remove("selected");
  });
  dotBtnsIndex = index;
  dotButtons[index].classList.add("selected");

  if (dotBtnsIndex === dotButtons.length - 1) {
    // Scroll to the very end of the container
    console.log(dotBtnsIndex);
    innerContainer.scrollTo({
      left: innerContainer.scrollWidth - innerContainer.clientWidth,
      behavior: "smooth",
    });
  } else {
    // Scroll to the calculated position based on the index
    innerContainer.scrollTo({
      left: slideWidthGlobal * dotBtnsIndex, // Ensure you multiply by the number of slides visible at a time
      behavior: "smooth",
    });
  }
}

// Function to start the automatic scrolling interval
function startInterval() {
  intervalId = setInterval(() => {
    if (dotBtnsIndex == dotButtons.length - 1) {
      dotBtnsIndex = -1;
    }
    updateCarousel(dotBtnsIndex + 1);
  }, 2500);
}

// Add event listeners to dot buttons
dotButtons.forEach((element, index) => {
  element.addEventListener("click", () => {
    // Update the carousel
    updateCarousel(index);

    // Clear the existing interval and timeout
    clearInterval(intervalId);
    clearTimeout(timeoutId);

    // Restart the interval after a delay (e.g., 5 seconds)
    timeoutId = setTimeout(() => {
      startInterval();
    }, 3000); // 5000 milliseconds = 5 seconds
  });
});

// Initial start of the interval
startInterval();
window.addEventListener("resize", () => {
  clearInterval(intervalId);

  startInterval();
});

const productDescriptionBoxes = document.querySelectorAll(
  ".project_description_div"
);

const productImage = document.querySelector(".project_img");

productDescriptionBoxes.forEach((element) => {
  element.addEventListener("click", () => {
    productDescriptionBoxes.forEach((ele) => {
      if (ele.classList.contains("selected")) {
        ele.classList.remove("selected");
      }
    });
    let projectNumber = element.getAttribute("project");
    productImage.style.backgroundImage = `url(./Assets/projectImages/${projectNumber}.png)`;
    element.classList.add("selected");
  });
});

index = 1;
setInterval(() => {
  if (index >= productDescriptionBoxes.length) {
    index = 0;
  }

  element = productDescriptionBoxes[index];
  productDescriptionBoxes.forEach((ele) => {
    if (ele.classList.contains("selected")) {
      ele.classList.remove("selected");
    }
  });
  let projectNumber = element.getAttribute("project");
  productImage.style.backgroundImage = `url(./Assets/projectImages/${projectNumber}.png)`;
  element.classList.add("selected");
  index++;
}, 2000);
const inputs = document.querySelectorAll("input");

inputs.forEach((el) => {
  el.addEventListener("blur", (e) => {
    if (e.target.value) {
      e.target.classList.add("dirty");
    } else {
      e.target.classList.remove("dirty");
    }
  });
});

function handleClose(element) {
  const ele = document.querySelector(`.${element}`);
  ele.style.display = "none";
}
function handleOpen(element) {
  const ele = document.querySelector(`.${element}`);
  ele.style.display = "flex";
}


function validation(fieldName) {
  let valid = true;

  const input = document.querySelector(`[${fieldName}]`);
  const error = document.querySelector(`[${fieldName}-error]`);
  const inputValue = input.value;
  if (fieldName === "email-input") {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (emailRegex.test(inputValue)) {
      error.textContent = "";
    } else {
      error.textContent = "Please enter a valid email address.";
      valid = false;
    }
  } else if (
    fieldName === "first-name-input" ||
    fieldName === "last-name-input"
  ) {
    if (inputValue.length <= 3) {
      error.textContent = "Name length greater then 3 required ";
      valid = false;
    } else {
      error.textContent = "";
    }
  }

  return valid;
}

function validateForm() {
  let valid = true;
  valid = validation("email-input") && valid;
  valid = validation("first-name-input") && valid;
  valid = validation("last-name-input") && valid;

  return valid;
}




fetch("https://learn.accountingcpd.net/ACPD/API/Test/SampleObject")
  .then(function(response) {
    if (response.ok) {
      return response.json();
    } else {
      return Promise.reject(response);
    }
  })
  .then(function(data) {
    saveData(data);
  })
  .catch(function(err) {
    console.warn("Something went wrong.", err);
  });

let store = [];

function saveData(items) {
  store = items;
  render(store);
}

const navTabs = document.querySelectorAll(".nav-menu__item");

[...navTabs].forEach(function(navTab) {
  navTab.addEventListener("click", function() {
    const activeFilter = navTab.innerHTML.toLowerCase();

    // remove all 'active' classes from navigation tabs
    navTabs.forEach(nt => nt.classList.remove("nav-menu__item--active"));

    // add 'active' class to clicked navigation tab
    navTab.classList.add("nav-menu__item--active");

    if (activeFilter === "all courses") {
      return render(store);
    }

    const filterdItems = store.filter(item => item.type === activeFilter);

    render(filterdItems);
  });
});

function render(items) {
  const app = document.querySelector("#list");
  // reset list
  app.innerHTML = "";

  items.forEach(item => {
    // card
    const card = document.createElement("div");
    card.classList.add("card");
    // box image
    const boxImage = document.createElement("div");
    boxImage.classList.add("image");

    // image
    const img = document.createElement("img");
    const imageSrc = item.imageSrc.replace(".jpg", "");
    img.setAttribute(
      "srcset",
      `./img/${imageSrc}.jpg 300w, ./img/${imageSrc}@2x.jpg 1000w`
    );
    img.setAttribute(
      "sizes",
      "(max-width: 56.25em) 20vw, (max-width: 37.5em) 30vw, 300px"
    );

    // tag
    const tag = document.createElement("div");
    tag.classList.add("tag");
    tag.innerText = item.type;

    const type = item.type.toLowerCase();
    if (type === "tax") {
      tag.style.backgroundColor = "#FF31C1";
    } else if (type === "communication") {
      tag.style.backgroundColor = "#EF7C00";
    } else if (type === "technology") {
      tag.style.backgroundColor = "#99C736";
    }

    // text box
    const textBox = document.createElement("div");
    textBox.classList.add("textBox");

    // heading
    const heading = document.createElement("h2");
    heading.classList.add("heading-secondary");
    heading.innerText = item.title;

    // description
    const description = document.createElement("p");
    description.classList.add("paragraph");
    description.innerText = item.description;

    // price
    const price = document.createElement("p");
    const strong = document.createElement("strong");
    const amount = document.createElement("span");
    strong.innerText = "Price: ";
    amount.innerText = `£${item.price}`;
    price.appendChild(strong);
    price.appendChild(amount);
    price.classList.add("price");

    // render
    app.appendChild(card);
    card.appendChild(boxImage);
    boxImage.appendChild(img);
    boxImage.appendChild(tag);
    card.appendChild(textBox);
    textBox.appendChild(heading);
    textBox.appendChild(description);
    textBox.appendChild(price);
  });
}

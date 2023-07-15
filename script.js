let randomObj = [];
let fetchedData = [];
async function fetchData() {
  try {
    const res = await fetch(
      "https://raw.githubusercontent.com/saksham-accio/f2_contest_3/main/food.json"
    );
    const data = await res.json();

    fetchedData = [...data];
    console.log(fetchedData);

    renderData(fetchedData);
  } catch (error) {
    console.log("Got error while fetching data");
  }
}

fetchData();

async function takeOrder() {
  const banner = document.getElementById("banner-img");
  const menuHeading = document.getElementById("menu-heading");
  const rightSide = document.getElementById("right-side");
  banner.style.display = "none";
  menuHeading.style.paddingTop = "15px";
  rightSide.style.overflowY = "scroll";

  const randomStudents = getRandomObjects(fetchedData, 3);
  console.log(randomStudents);
  renderData(randomStudents);
}

function getRandomObjects(array, count) {
  const shuffled = array.sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
}

// setTimeout(() => {
//   takeOrder();
// }, 2500);

function renderData(items) {
  let burgersList = document.getElementById("burgers-list");

  burgersList.innerHTML = "";

  items.forEach((item) => {
    let name = item.name;
    let price = item.price;
    let imgSrc = item.imgSrc;

    let card = `
            <img src=${imgSrc} alt="img">
                <div class="item-details">
                    <div class="item-names">
                        <p class="item-name">${name}</p>
                        <p class="price">$ ${price}/-</p>
                    </div>
                    <button class="add-button">
                        <img src="./assets/Images/add-button.png" alt="">
                    </button>
                </div>`;

    let div = document.createElement("div");
    div.className = "card";
    div.innerHTML = card;

    burgersList.append(div);
  });
}

function orderPrep() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve({ order_status: "true", paid: "false" });
    }, 1500);
  });
}

function payOrder() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve({ order_status: "true", paid: "true" });
    }, 1000);
  });
}
function TakeOrderFunction() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      takeOrder();
      resolve("success");
    }, 2500);
  });
}

let takeOrderData = TakeOrderFunction();

takeOrderData
  .then((data) => {
    console.log(data);
  })
  .then((data) => {
    return orderPrep();
  })
  .then((data) => {
    console.log("data after 1.5s is ", data);
  })
  .then((data) => {
    return payOrder();
  })
  .then((data) => {
    console.log("data after 1s ", data);
  })
  .then((data) => {
    alert("Thanks You Visit Again");
  });
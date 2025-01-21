// Scroll Event for Header position
const headerElement = document.querySelector("header");
let lastScrollTop = 0;
document.addEventListener("scroll", (e) => {
    e.preventDefault();
    const currentScrollTop = window.scrollY;

    if (lastScrollTop > currentScrollTop) {
        headerElement.classList.add("sticky-top");
    }
    if (lastScrollTop < currentScrollTop) {
        headerElement.classList.remove("sticky-top");
    }

    lastScrollTop = currentScrollTop;
});

// Active Navigation
const navLinks = document.querySelectorAll(".nav-link");

(function activeNav() {
    let currentPath = window.location.pathname;
    navLinks.forEach((navLink) => {
        navLink.classList.remove("active");
        if (currentPath === navLink.getAttribute("href")) {
            navLink.classList.add("active");
        } else if (
            navLink.getAttribute("href") === "/products" &&
            (currentPath === "/coffee.html" ||
                currentPath === "/equipment.html")
        ) {
            navLink.classList.add("active");
        }
    });
})();

// Sign Up Modal Pop up
function popUpModal() {
    console.log(window.location.pathname);
    const location = window.location.pathname;
    if (
        location.includes("events") ||
        location.includes("coffee") ||
        location.includes("equipment") ||
        location.includes("contact")
    )
        return;
    if (localStorage.getItem("boutique-coffee-user")) return;

    const modal =
        new bootstrap.Modal(document.getElementById("exampleModal")) || null;

    document.addEventListener("DOMContentLoaded", () => {
        modal.show();
    });

    handleSignUp(modal);
}

function handleSignUp(modal) {
    const signUpForm = document.getElementById("signUpForm");
    signUpForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const email = signUpForm.querySelector("input[type=email]").value;
        if (!email) {
            alert("Please enter your email!");
            return;
        }

        modal.hide();
        alert("Thank you for signing up!");
        localStorage.setItem("boutique-coffee-user", email);
    });
}

popUpModal();

// Create Coffee and Equipment Cards
const coffees = [
    {
        name: "Espresso",
        img: "./assets/espresso.png",
        description: "A strong and bold coffee with rich flavor and a smooth finish.",
    },
    {
        name: "Latte",
        img: "./assets/latte.jpg",
        description: "A perfect blend of espresso and steamed milk with a creamy texture.",
    },
    {
        name: "Cappuccino",
        img: "./assets/cappuccino.jpg",
        description: "A classic coffee with equal parts espresso, steamed milk, and foam.",
    },
    {
        name: "Americano",
        img: "./assets/americano.jpg",
        description: "A simple yet flavorful coffee made by adding hot water to espresso.",
    },
    {
        name: "Mocha",
        img: "./assets/mocha.jpg",
        description: "A delightful mix of chocolate, espresso, and steamed milk.",
    },
    {
        name: "Macchiato",
        img: "./assets/macchiato.jpg",
        description: "An espresso-based drink with a splash of steamed milk or foam.",
    }
]

const equipments = [
    {
        name: "Espresso Machine",
        img: "./assets/espresso-machine.png",
        description: "Perfect for making professional-grade espresso at home or in your café. This machine delivers consistent,high-quality results every time.",
        price: "$899"
    },
    {
        name: "Coffee Grinder",
        img: "./assets/grinder.png",
        description: "A device used to grind coffee beans into a fine or coarse powder.",
        price: "$149"
    },
    {
        name: "French Press",
        img: "./assets/french-press.jpg",
        description: "Classic and easy-to-use French Press for a rich, full-bodied coffee experience. Durable and stylish foreveryday use.",
        price: "$19.99"
    },
    {
        name: "Milk Frother",
        img: "./assets/milk-frother.jpg",
        description: "Create creamy and velvety froth for your lattes and cappuccinos with this easy-to-use milk frother.Compact and efficient.",
        price: "$39.99"
    }
]

const coffeeCardContainer = document.getElementById("coffee-card-container");

function createCoffeeCards(coffeeList) {
    if (!coffeeCardContainer) return;
    coffeeCardContainer.innerHTML = "";
    console.log(coffeeList)
    coffeeList.forEach((coffee) => {
        const card = document.createElement("div");
        card.classList.add("col-md-4", "col-sm-6", "mb-4");
        card.innerHTML = `
            <div class="card">
                <img src="${coffee.img}" class="card-img-top" alt="${coffee.name}">
                <div class="card-body">
                    <h5 class="card-title">${coffee.name}</h5>
                    <p class="card-text">${coffee.description}</p>
                    <button class="btn action-btn add-cart-btn">Add to Cart <i class="fa-solid fa-cart-plus"></i></button>
                </div>
            </div>

        `;
        coffeeCardContainer.appendChild(card);
    });
}

const equipmentCardContainer = document.getElementById("equipment-card-container");

function createEquipmentCards(equipmentList) {
    if (!equipmentCardContainer) return;
    equipmentCardContainer.innerHTML = "";
    equipmentList.forEach((equipment, index) => {
        const card = document.createElement("div");
        const justify = index % 2 === 0 ? "justify-content-start" : "justify-content-end";
        card.classList.add("row", justify);
        card.innerHTML = `
            <div class="col-12 col-sm-10 col-md-8">
                <div class="equipment-item">
                    <img src="${equipment.img}" alt="${equipment.name}">
                    <div class="equipment-info">
                        <h5>${equipment.name}</h5>
                        <p>${equipment.description}</p>
                        <p><strong>Price:</strong> ${equipment.price}</p>
                        <button class="btn action-btn add-cart-btn">Add to cart <i class="fa-solid fa-cart-plus"></i></button>
                    </div>
                </div>
            </div>
        `;
        equipmentCardContainer.appendChild(card);
    });
}

createCoffeeCards(coffees);
createEquipmentCards(equipments);

// Search Functionality
const searchInput = document.getElementById("searchInput");

function searchProducts(products) {
    if (!searchInput) return;
    const searchBarContainer = document.querySelector(".search-bar-container");
    searchInput.addEventListener("input", (e) => {
        const searchValue = e.target.value;
    
        if (searchValue.length === 0) {
            if (coffeeCardContainer) {
                createCoffeeCards(products);
            } else if (equipmentCardContainer) {
                createEquipmentCards(products);
            }
            return;
        }
    
        const searchResult = products.filter((product) =>
            product.name.toLowerCase().includes(searchValue.toLowerCase())
        );
        
        if (coffeeCardContainer) {
            createCoffeeCards(searchResult);
        }

        if (equipmentCardContainer) {
            createEquipmentCards(searchResult);
        }
    });

    searchInput.addEventListener("focusin", () => {
        searchBarContainer.classList.add("shadow-lg");
    });

    searchInput.addEventListener("focusout", () => {
        searchBarContainer.classList.remove("shadow-lg");
    });

}

const searchProduct = equipmentCardContainer ? equipments : coffees;
searchProducts(searchProduct);

// Email Sending
function sendEmail() {
    const contactForm = document.getElementById("contact-form");
    if (!contactForm) return;
    const inputs = contactForm.querySelectorAll(".form-control");
    const sendLink = contactForm.querySelector("a");
    let emailSubject;
    let emailBody;

    if (inputs) {
        inputs.forEach((input) => {
            input.addEventListener("change", (e) => {
                if (e.target.id === "name") emailSubject = e.target.value;
                if (e.target.id === "message") emailBody = e.target.value;

                sendLink.href = `mailto:yhtet1934@gmail.com&subject=${emailSubject}&body=${emailBody}`;
            });
        });
    }

    sendLink.addEventListener("click", (e) => {
        e.preventDefault();
        if (!emailBody || !emailSubject) {
            alert("Please enter the information!");
            return;
        }
    });
}

sendEmail();

// Add to cart action
const addToCartBtns = document.querySelectorAll(".add-cart-btn");
const cartQtyBadge = document.querySelector(".cart-qty-badge");
const cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];

cartQtyBadge.innerText = cartItems.reduce(
    (accumulator, item) => accumulator + item.qty,
    0
);

function addToCart() {
    addToCartBtns.forEach((btn) => {
        btn.addEventListener("click", () => {
            const item = btn.parentElement.querySelector("h5").innerText;
            let isExist =
                cartItems.length > 0
                    ? cartItems.find((cartItem) => cartItem.name === item)
                    : false;
            if (!isExist) {
                cartItems.push({ name: item, qty: 1 });
            } else {
                cartItems.forEach((cartItem) => {
                    if (cartItem.name === item) {
                        cartItem.qty++;
                    }
                });
            }
            cartQtyBadge.innerText = cartItems.reduce(
                (accumulator, item) => accumulator + item.qty,
                0
            );
            updateCartUI();
            localStorage.setItem("cartItems", JSON.stringify(cartItems));
        });
    });
}

function updateCartUI() {
    const cartItemsUl = document.getElementById("cart-items-list");

    cartItemsUl.innerHTML = "";
    if (cartItems.length > 0) {
        cartItems.forEach((item) => {
            const li = document.createElement("li");
            li.innerHTML = `
                <div class="d-flex justify-content-between align-items-center">
                    <h6>${item.name}</h6>
                    <div>
                        <span class="badge bg-dark">${item.qty}</span>
                        <button class="btn" onclick="removeItem('${item.name}')">
                            <i class="fa-solid fa-trash text-danger"></i>
                        </button>
                    </div>
                </div>
            `;
            cartItemsUl.appendChild(li);
        });
    } else {
        cartItemsUl.innerText = "There is no item in the cart";
    }
}

function removeItem(itemName) {
    cartItems.forEach((item, index) => {
        if (item.name === itemName) {
            cartItems.splice(index, 1);
        }
    });
    cartQtyBadge.innerText = cartItems.reduce(
        (accumulator, item) => accumulator + item.qty,
        0
    );
    updateCartUI();
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
}

addToCart();
updateCartUI();

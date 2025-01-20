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

// Search Functionality
const products = [
    "Espresso",
    "Latte",
    "Cappuccino",
    "Mocha",
    "Macchiato",
    "Espresso Machine",
    "Coffee Grinder",
    "French Press",
    "Milk Frother",
];

const searchInput = document.getElementById("searchInput");
const searchResultUl = document.getElementById("search-result");

searchInput.addEventListener("input", (e) => {
    const searchValue = e.target.value;

    if (searchValue.length === 0) {
        searchResultUl.innerHTML = "";
        return;
    }

    const searchResult = products.filter((product) =>
        product.toLowerCase().includes(searchValue.toLowerCase())
    );

    searchResultUl.innerHTML = "";
    searchResult.forEach((result) => {
        const li = document.createElement("li");
        li.innerText = result;
        searchResultUl.appendChild(li);
    });
});

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

    console.log(cartItems);
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

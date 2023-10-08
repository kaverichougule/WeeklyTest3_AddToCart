const Products = [
    { id: 0, name: "Cargo Trousers", price: 850 },
    { id: 1, name: "AfronSneakers", price: 999 },
    { id: 2, name: "Raymond Shirt", price: 685 },
];

const productList = document.querySelectorAll(".product-list");
const button1 = document.querySelectorAll(".sign-minus");
const button2 = document.querySelectorAll(".sign-plus");
const cartTableBody = document.querySelector("#tablebody");
const cartItem = document.getElementById("cartItem");
const total = document.getElementById("total");

const cart = [];

productList.forEach((ele, index) => {
    const count = ele.querySelector(".add-items");

    button1[index].addEventListener("click", function () {
        const productNumber = ele.querySelector(".add-items");
        if (productNumber.innerText > 0) {
            productNumber.innerText = parseInt(productNumber.innerText) - 1;
            updateCart(index, parseInt(productNumber.innerText));
        }
    });

    button2[index].addEventListener("click", function () {
        const productNumber = ele.querySelector(".add-items");
        productNumber.innerText = parseInt(productNumber.innerText) + 1;
        updateCart(index, parseInt(productNumber.innerText));
    });
});

function updateCart(index, quantity) {
    const product = Products[index];

    if (quantity === 0) {
        // Remove the product from the cart
        const productIndex = cart.findIndex((item) => item.product.id === product.id);
        if (productIndex !== -1) {
            cart.splice(productIndex, 1);
        }
    } else {
        // Update the cart with the new quantity
        const existingCartItem = cart.find((item) => item.product.id === product.id);
        if (existingCartItem) {
            existingCartItem.quantity = quantity;
        } else {
            cart.push({ product: product, quantity: quantity });
        }
    }

    // Update the cart UI
    updateCartUI();
}

function updateCartUI() {
    cartTableBody.innerHTML = "";
    let totalPrice = 0;

    if (cart.length === 0) {
        cartItem.style.display = "block";
    } else {
        cartItem.style.display = "none";

        cart.forEach((item) => {
            const row = document.createElement("tr");
            row.innerHTML = `
                <td>${item.product.name}</td>
                <td>${item.quantity}</td>
                <td>x ${item.product.price}</td>
            `;
            cartTableBody.appendChild(row);

            totalPrice += item.product.price * item.quantity;
        });
    }

    total.innerText = `${totalPrice} RS`;
}

// Initial setup
updateCartUI();

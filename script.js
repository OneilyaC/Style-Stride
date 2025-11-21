/*Oneilya Cameron
2403208
Monday @3-5pm
IA#2 JavaScript Integration
Handles Cart, Checkout & Invoice Functionality*/

function addToCart(name, price) {
  let cart = JSON.parse(localStorage.getItem('cart')) || [];
  const existingItem = cart.find(item => item.name === name);

  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.push({ name, price, quantity: 1 });
  }

  localStorage.setItem('cart', JSON.stringify(cart));
  alert(`${name} added to your cart!`);
  window.location.href = "cart.html";
}

function loadCart() {
  const cartTableBody = document.querySelector(".cart-table tbody");
  const cartSummary = document.querySelector(".cart-summary");
  if (!cartTableBody || !cartSummary) return;

  let cart = JSON.parse(localStorage.getItem('cart')) || [];
  cartTableBody.innerHTML = "";

  let subtotal = 0;

  cart.forEach(item => {
    const price = parseFloat(item.price) || 0;
    const qty = parseInt(item.quantity) || 0;
    const rowSubtotal = price * qty;
    subtotal += rowSubtotal;

    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${item.name}</td>
      <td>
        <input type="number" min="1" value="${qty}" 
               onchange="updateQuantity('${escapeQuotes(item.name)}', this.value)">
      </td>
      <td>JMD ${price.toFixed(2)}</td>
      <td><button onclick="removeItem('${escapeQuotes(item.name)}')">Remove</button></td>
    `;
    cartTableBody.appendChild(tr);
  });

  const tax = subtotal * 0.05;
  const total = subtotal + tax;

  cartSummary.innerHTML = `
    <p>Subtotal: JMD ${subtotal.toFixed(2)}</p>
    <p>Tax (5%): JMD ${tax.toFixed(2)}</p>
    <p>Total: JMD ${total.toFixed(2)}</p>
  `;
}

function escapeQuotes(str) {
  return String(str).replace(/'/g, "\\'");
}

function updateQuantity(productName, newQty) {
  newQty = parseInt(newQty);
  if (isNaN(newQty) || newQty < 1) newQty = 1;

  let cart = JSON.parse(localStorage.getItem('cart')) || [];
  cart.forEach(item => {
    if (item.name === productName) item.quantity = newQty;
  });

  localStorage.setItem('cart', JSON.stringify(cart));
  loadCart();
}

function removeItem(productName) {
  let cart = JSON.parse(localStorage.getItem('cart')) || [];
  cart = cart.filter(item => item.name !== productName);
  localStorage.setItem('cart', JSON.stringify(cart));
  loadCart();
}

function clearCart() {
  localStorage.removeItem('cart');
  loadCart();
}

function showCheckoutTotal() {
  const totalElement = document.getElementById("checkoutTotal");
  if (!totalElement) return;

  let cart = JSON.parse(localStorage.getItem('cart')) || [];
  let subtotal = cart.reduce((sum, item) => sum + (parseFloat(item.price) || 0) * (parseInt(item.quantity) || 0), 0);
  const tax = subtotal * 0.05;
  const total = subtotal + tax;

  totalElement.innerHTML = `
    Subtotal: JMD ${subtotal.toFixed(2)}<br>
    Tax (5%): JMD ${tax.toFixed(2)}<br>
    Total: JMD ${total.toFixed(2)}
  `;
}

function loadInvoice() {
  const invoiceBody = document.getElementById("invoiceBody");
  const invoiceSummary = document.querySelector(".invoice-summary");
  if (!invoiceBody || !invoiceSummary) return;

  let cart = JSON.parse(localStorage.getItem('cart')) || [];
  invoiceBody.innerHTML = "";

  let subtotal = 0;
  cart.forEach(item => {
    const price = parseFloat(item.price) || 0;
    const qty = parseInt(item.quantity) || 0;
    const rowSubtotal = price * qty;
    subtotal += rowSubtotal;

    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${item.name}</td>
      <td>${qty}</td>
      <td>JMD ${rowSubtotal.toFixed(2)}</td>
    `;
    invoiceBody.appendChild(row);
  });

  const tax = subtotal * 0.05;
  const total = subtotal + tax;

  invoiceSummary.innerHTML = `
    <p>Subtotal: JMD ${subtotal.toFixed(2)}</p>
    <p>Tax (5%): JMD ${tax.toFixed(2)}</p>
    <p>Total: JMD ${total.toFixed(2)}</p>
  `;
}

function loadCustomerInfo() {
  const info = JSON.parse(localStorage.getItem("customerInfo")) || {};
  document.getElementById("invName").textContent = info.name || "";
  document.getElementById("invEmail").textContent = info.email || "";
  document.getElementById("invAddress").textContent = info.address || "";
}

document.addEventListener("DOMContentLoaded", () => {
  loadCart();
  showCheckoutTotal();
  loadInvoice();
  loadCustomerInfo();
});
function loadCheckout() {
  const checkoutTableBody = document.querySelector("#checkoutTable tbody");
  const checkoutSummary = document.getElementById("checkoutSummary");
  if (!checkoutTableBody || !checkoutSummary) return;

  let cart = JSON.parse(localStorage.getItem('cart')) || [];
  checkoutTableBody.innerHTML = "";

  let subtotal = 0;

  cart.forEach(item => {
    const price = parseFloat(item.price) || 0;
    const qty = parseInt(item.quantity) || 0;
    const rowSubtotal = price * qty;
    subtotal += rowSubtotal;

    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${item.name}</td>
      <td>${qty}</td>
      <td>JMD ${price.toFixed(2)}</td>
      <td>JMD ${rowSubtotal.toFixed(2)}</td>
    `;
    checkoutTableBody.appendChild(row);
  });

  const tax = subtotal * 0.05;
  const total = subtotal + tax;

  checkoutSummary.innerHTML = `
    <p>Subtotal: JMD ${subtotal.toFixed(2)}</p>
    <p>Tax (5%): JMD ${tax.toFixed(2)}</p>
    <p><strong>Total: JMD ${total.toFixed(2)}</strong></p>
  `;
}

document.getElementById("checkoutForm")?.addEventListener("submit", function (e) {
  e.preventDefault();

  const name = document.getElementById("name").value.trim();
  const address = document.getElementById("address").value.trim();
  const email = document.getElementById("email").value.trim();

  if (!name || !address || !email) return alert("Please fill in all fields.");


  localStorage.setItem("customerInfo", JSON.stringify({ name, address, email }));

  window.location.href = "invoice.html";
});

document.addEventListener("DOMContentLoaded", loadCheckout);

document.getElementById("checkoutForm")?.addEventListener("submit", function(e) {
  e.preventDefault();

  const name = document.getElementById("name").value.trim();
  const address = document.getElementById("address").value.trim();
  const email = document.getElementById("email").value.trim();

  if (!name || !address || !email) {
    alert("Please fill in all fields.");
    return;
  }

  const customerInfo = { name, address, email };
  localStorage.setItem("customerInfo", JSON.stringify(customerInfo));

  window.location.href = "invoice.html";
});


document.getElementById("loginForm").addEventListener("submit", function(e) {
    e.preventDefault();

    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();

    if(email === "" || password === "") {
        alert("Please enter both email and password.");
        return;
    }

    alert(`Welcome back, ${email}!`);
    window.location.href = "home.html"; 
});

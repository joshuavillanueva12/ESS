// Dito ka maglalagay ng mga product
let products = {
  "101": { name: "Nano Smart Travel Bag", price: 4799, image: "https://www.aprica.com.ph/cdn/shop/products/ssdd.zone-1600156806-AP2040403_Nano_Smart_Stroller_Bag_02_1000x1000.png?v=1601517850" },
  "102": { name: "Nike Dunk Low", price: 2339, image: "https://static.nike.com/a/images/t_PDP_936_v1/f_auto,q_auto:eco/63d90bf6-fcb9-46b7-bf62-a22453360218/NIKE+DUNK+LOW+%28PSE%29.png" },
  "103": { name: "Uniqlo T Shirt", price: 1499, image: "https://www.uniqlo.com/utgp/2019/common/images/item/UTGP2019_422042.jpg" }
};

let cart = [];

function addProduct() {
  const code = document.getElementById("code").value.trim();
  if (products[code]) {
    cart.push(products[code]);
    updatePreview();
  } else {
    alert("Product code not found!");
  }
  document.getElementById("code").value = "";
}

function removeProduct() {
  const code = document.getElementById("code").value.trim();
  const index = cart.findIndex(p => p === products[code]);
  if (index >= 0) {
    cart.splice(index, 1);
    updatePreview();
  } else {
    alert("Product not in cart!");
  }
  document.getElementById("code").value = "";
}

function updatePreview() {
  const preview = document.getElementById("preview");
  preview.innerHTML = "";

  if (cart.length === 0) {
    preview.textContent = "No products yet";
    document.getElementById("total").innerText = "0.00";
    return;
  }

  // 🖼 Ipakita lahat ng images na na-add
  cart.forEach(p => {
    const item = document.createElement("div");
    item.classList.add("product-item");
    item.innerHTML = `
      <img src="${p.image}" alt="${p.name}">
      <div>
        <p>${p.name}</p>
        <p class="price">₱${p.price.toFixed(2)}</p>
      </div>
    `;
    preview.appendChild(item);
  });

  // 💰 Total computation
  const total = cart.reduce((sum, p) => sum + p.price, 0);
  document.getElementById("total").innerText = total.toFixed(2);
}

function checkout() {
  const cash = parseFloat(document.getElementById("cash").value);
  const total = parseFloat(document.getElementById("total").innerText);

  if (isNaN(cash) || cash < total) {
    alert("Insufficient cash!");
    return;
  }

  const change = cash - total;
  document.getElementById("change").innerText = change.toFixed(2);
}

function clearAll() {
  cart = [];
  document.getElementById("preview").innerHTML = "No products yet";
  document.getElementById("total").innerText = "0.00";
  document.getElementById("change").innerText = "0.00";
}

function printReceipt() {
  const receipt = document.getElementById("receipt");
  if (cart.length === 0) {
    alert("No items to print!");
    return;
  }

  const total = parseFloat(document.getElementById("total").innerText);
  
  // 🧾 Receipt layout
  let content = `
    <div style="text-align:center;">
      <h2 style="margin: 5px 0;">🛒 EDZEL SAMANTHA STORE</h2>
      <p style="margin: 0;">Ilang-Ilang Street, Payatas A</p>
      <hr>
    </div>
    <ul style="list-style:none; padding:0;">`;

  cart.forEach(p => {
    content += `
      <li style="display:flex; justify-content:space-between; border-bottom:1px dashed #ccc; padding:4px 0;">
        <span>${p.name}</span>
        <span style="color:green;">₱${p.price.toFixed(2)}</span>
      </li>`;
  });

  content += `
    </ul>
    <hr>
    <p><strong>Total:</strong> ₱${total.toFixed(2)}</p>
    <p><strong>Change:</strong> ₱${document.getElementById("change").innerText}</p>
    <hr>
    <div style="text-align:center; margin-top:10px;">
      <p><em>Thank you for shopping at Edzel Samantha Store!</em></p>
      <p><strong>Come again soon 😊</strong></p>
    </div>`;

  receipt.style.display = "block";
  receipt.innerHTML = content;
}

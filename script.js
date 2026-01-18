let cart = JSON.parse(localStorage.getItem("cart")) || [];
let users = JSON.parse(localStorage.getItem("users")) || [];
let currentUser = localStorage.getItem("currentUser");

function addToCart(name, price) {
  if (!currentUser) {
    alert("Please login to order <3");
    return;
  }
  cart.push({ name, price });
  localStorage.setItem("cart", JSON.stringify(cart));
  renderCart();

  showNotification(`${name} added to cart!`);
}

function removeFromCart(index) {
  cart.splice(index, 1);
  localStorage.setItem("cart", JSON.stringify(cart));
  renderCart();
}

function renderCart() {
  const cartDiv = document.getElementById("cart");
  const totalDiv = document.getElementById("total");
  if (!cartDiv) return;

  cartDiv.innerHTML = "";
  let total = 0;
  cart.forEach((item,index)=>{
    total+=item.price;
    cartDiv.innerHTML+=`
      <div class="cart-item">
        <span>${item.name} - $${item.price.toFixed(2)}</span>
        <button onclick="removeFromCart(${index})">❌</button>
      </div>
    `;
  });
  totalDiv.innerText = "Total: $" + total.toFixed(2);
}

function pay(){
  if(cart.length===0){alert("Cart empty"); return;}
  alert("Payment successful <3 yay✅");
  cart=[];
  localStorage.removeItem("cart");
  renderCart();
}


function register(){
  const username=document.getElementById("username").value;
  const password=document.getElementById("password").value;
  if(!username||!password){alert("Fill all fields"); return;}
  users.push({username,password});
  localStorage.setItem("users",JSON.stringify(users));
  alert("Account created");
}

function login(){
  const username=document.getElementById("username").value;
  const password=document.getElementById("password").value;
  const user=users.find(u=>u.username===username&&u.password===password);
  if(!user){alert("Wrong login"); return;}
  localStorage.setItem("currentUser",username);
  location.reload();
}

function logout(){
  localStorage.removeItem("currentUser");
  location.reload();
}

function openAdmin(){
  const pin=document.getElementById("adminPin").value;
  if(pin!=="dante.bey"){alert("Wrong admin password");return;}
  const adminDiv=document.getElementById("adminData");
  adminDiv.innerHTML="<h3>All Accounts</h3>";
  users.forEach((u,i)=>{
    adminDiv.innerHTML+=`<div class="admin-user">${i+1}. USER: <b>${u.username}</b> | PASS: <b>${u.password}</b></div>`;
  });
}


function showNotification(message) {
  let notification = document.getElementById("notification");
  if(!notification){
    notification = document.createElement("div");
    notification.id = "notification";
    notification.style.cssText = `
      position: fixed;
      top: 20px;
      right: 20px;
      background-color: #4CAF50;
      color: white;
      padding: 12px 20px;
      border-radius: 8px;
      display: none;
      z-index: 1000;
      font-family: sans-serif;
      box-shadow: 0 4px 6px rgba(0,0,0,0.3);
      opacity: 0;
      transition: opacity 0.5s, transform 0.5s;
    `;
    document.body.appendChild(notification);
  }

  notification.innerText = message;
  notification.style.display = "block";
  notification.style.opacity = "1";
  notification.style.transform = "translateY(0)";

  setTimeout(() => {
    notification.style.opacity = "0";
    notification.style.transform = "translateY(-20px)";
    setTimeout(() => {
      notification.style.display = "none";
    }, 500);
  }, 3000);
}

window.onload = () => {
  renderCart();
  if(currentUser){
    document.getElementById("userName").innerText="Logged in as: "+currentUser;
    document.getElementById("logoutBtn").style.display="inline-block";
  }
};
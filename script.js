let fragranceDatabase = {};
let activeScents = [];
let cart = [];

/* LOAD JSON */

async function loadDatabase(){

    try{

        fragranceDatabase.male =
        await fetch("male.json")
        .then(r=>r.json());

        fragranceDatabase.female =
        await fetch("female.json")
        .then(r=>r.json());

        fragranceDatabase.unisex =
        await fetch("unisex.json")
        .then(r=>r.json());

        console.log("Database Loaded");

    }catch(error){

        console.error(error);

    }

}

loadDatabase();

/* ELEMENTS */

const category =
document.getElementById("category");

const size =
document.getElementById("size");

const scentList =
document.getElementById("scentList");

const searchInput =
document.getElementById("searchInput");

/* STEPS */

function nextStep(step){

    document
    .querySelectorAll(".step")
    .forEach(item =>
        item.classList.remove("active")
    );

    document
    .getElementById("step"+step)
    .classList.add("active");

}

/* CATEGORY CHANGE */

category.addEventListener("change",()=>{

    activeScents =
    fragranceDatabase[category.value] || [];

    renderScents(activeScents);

});

/* RENDER SCENTS */

function renderScents(scents){

    scentList.innerHTML = "";

    scents.forEach(item=>{

        const option =
        document.createElement("option");

        option.value = item;

        option.textContent = item;

        scentList.appendChild(option);

    });

}

/* SEARCH */

searchInput.addEventListener("keyup",()=>{

    const value =
    searchInput.value.toLowerCase();

    const filtered =
    activeScents.filter(item =>
        item.toLowerCase()
        .includes(value)
    );

    renderScents(filtered);

});

/* PRICES */

const pricing = {

    male:{
        "30ml":199,
        "50ml":299,
        "100ml":499
    },

    female:{
        "30ml":199,
        "50ml":299,
        "100ml":499
    },

    unisex:{
        "30ml":199,
        "50ml":299,
        "100ml":499
    },

    oil:{
        "50ml":149
    },

    butter:{
        "50ml":129
    }

};

/* CART */

function addToCart(){

    const selectedCategory =
    category.value;

    const selectedSize =
    size.value;

    const selectedScent =
    scentList.value;

    if(!selectedCategory){

        alert("Please select category");

        return;

    }

    const price =
    pricing[selectedCategory][selectedSize];

    cart.push({

        category:selectedCategory,
        scent:selectedScent,
        size:selectedSize,
        price:price

    });

    renderCart();

}

/* RENDER CART */

function renderCart(){

    const container =
    document.getElementById("cartItems");

    container.innerHTML = "";

    let subtotal = 0;

    cart.forEach(item=>{

        subtotal += item.price;

        container.innerHTML += `

        <div class="cart-item">

            <div>

                <strong>${item.scent}</strong>

                <br>

                ${item.size}

            </div>

            <div>

                R${item.price}

            </div>

        </div>

        `;

    });

    const courier = 120;

    document.getElementById("subtotal")
    .innerText =
    "R"+subtotal;

    document.getElementById("courier")
    .innerText =
    "R"+courier;

    document.getElementById("total")
    .innerText =
    "R"+(subtotal+courier);

}
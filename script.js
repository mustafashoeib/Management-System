"use strict";
let title = document.getElementById("title");
let price = document.getElementById("price");
let ads = document.getElementById("ads");
let taxes = document.getElementById("taxes");
let discount = document.getElementById("discount");
let total = document.getElementById("total");
let create = document.getElementById("create");
let count = document.getElementById("count");
let category = document.getElementById("category");
let search = document.getElementById("search");
let searchByCategory = document.getElementById("searchByCategory");
let searchByTitle = document.getElementById("searchByTitle");
let iconMood= document.getElementById("lightMood")
let inputs =document.querySelectorAll("input")
let fieldTitle = document.getElementById("field-title")
let fieldCategory = document.getElementById("field-category")
let fieldCount = document.getElementById("field-count")
let fieldPrice = document.getElementById("field-price")
iconMood.addEventListener("click", function() {
  document.body.classList.toggle("dark-mood");
  
  // Save dark mode state to local storage
  if (document.body.classList.contains("dark-mood")) {
    localStorage.setItem("darkMode", "true");
    iconMood.setAttribute("class", "fa-solid fa-sun");
    document.body.style.transition = "0.5s";
  } else {
    localStorage.setItem("darkMode", "false");
    iconMood.setAttribute("class", "fa-solid fa-moon");
    document.body.style.transition = "0.5s";
  }
});

// Check if dark mode is enabled on page load
window.addEventListener("DOMContentLoaded", function() {
  const isDarkModeEnabled = localStorage.getItem("darkMode") === "true";
  if (isDarkModeEnabled) {
    document.body.classList.add("dark-mood");
    iconMood.setAttribute("class", "fa-solid fa-sun");
  } else {
    document.body.classList.remove("dark-mood");
    iconMood.setAttribute("class", "fa-solid fa-moon");
  }
});


  ////////////////////////////////// CRUDS system
  
  //get total price
  
  function totalPrice() {
    if (price.value != "") {
      total.innerHTML =
      (+price.value + +taxes.value + +ads.value) - (+discount.value);
      total.style.backgroundColor = "green";
    } else {
      total.innerHTML = " ";
      total.style.backgroundColor = "red";
    }
  }
  
  //create product
  let dataProduct;
  if (localStorage.product != null) {
    dataProduct = JSON.parse(localStorage.product);
} else {
  dataProduct = [];
}

let mood= "create";
create.onclick = function () {
  let newProduct = {
    title: title.value.toLowerCase(),
    price: price.value ,
    taxes: taxes.value || "null",
    ads: ads.value || "null",
    discount: discount.value || "null",
    count: count.value ,
    category: category.value.toLowerCase() ,
    total: total.innerHTML ,
  };
  if (title.value === "") {
    fieldTitle.style.display = "block";
    return;
} else {
    fieldTitle.style.display = "none";
}

if (price.value === "") {
    fieldPrice.style.display = "block";
    return;
} else {
    fieldPrice.style.display = "none";
}
let countValue = parseInt(newProduct.count);
// Check if countValue is between 1 and 100
if (countValue >= 1 && countValue <= 100) {
    fieldCount.style.display = "none"; // Hide the spam field
} else {
    fieldCount.style.display = "block"; // Show the spam field
    return; // Exit the function
}
if (category.value === "") {
    fieldCategory.style.display = "block";
    return;
} else {
    fieldCategory.style.display = "none";
}

// Check for other conditions and update or create the product accordingly

  if(title.value !=="" && price.value !=="" && category.value!=="" && newProduct.count <= 100){
    if(mood=== "create"){
      // count creation
      if (count.value > 0) {
        for (let i = 0; i < count.value; i++) {
          dataProduct.push(newProduct)[i];
        }
      } else {
        return;
      }
    }else{
      dataProduct[temp]= newProduct
      create.innerHTML = "Create"
      count.style.display= "block"
      mood='create'

      
    }
    removeInputs();
    
  }
  localStorage.setItem("product", JSON.stringify(dataProduct));
  readData();
};

//remove inputs
function removeInputs() {
  title.value = "";
  price.value = "";
  ads.value = "";
  taxes.value = "";
  discount.value = "";
  count.value = "";
  category.value = "";
  total.innerHTML = "";
}

// read or show data
function readData() {
  let table = " ";
  for (let i =0; i < dataProduct.length; i++) {
    table += `
                <tr>
                <td data-label="id">${1+i}</td>
                <td data-label="title">${dataProduct[i].title}</td>
                <td data-label="taxes">${dataProduct[i].price}</td>
                <td data-label="taxes">${dataProduct[i].taxes}</td>
                <td data-label="ads">${dataProduct[i].ads}</td>
                <td data-label="discount">${dataProduct[i].discount}</td>
                <td data-label="total">${dataProduct[i].total}</td>
                <td data-label="category">${dataProduct[i].category}</td>
                <td><button id="update" onclick="updateProduct(${i})">update</button></td>
                <td><button onclick="deleteProduct(${i})" id="delete">delete</button></td>
                </tr>
            `;
          }
          document.getElementById("tbody").innerHTML = table;
          
          // create btn delete all
          let btnDeleteAll = document.getElementById("deleteAll");
          if (dataProduct.length > 0) {
            btnDeleteAll.innerHTML = `
            <button onclick="deleteAll()" >Delete All (${dataProduct.length})</button>
            `;
  } else {
    btnDeleteAll.innerHTML = " ";
  }
  totalPrice()
}
readData();

// delete product
function deleteProduct(i) {
  dataProduct.splice(i, 1);
  localStorage.product = JSON.stringify(dataProduct);
  readData();
}

// delete all product
function deleteAll() {
  localStorage.clear();
  dataProduct.splice(0);
  readData();
}


// update function
let temp;
function updateProduct(i){
  title.value = dataProduct[i].title
  price.value = dataProduct[i].price
  taxes.value = dataProduct[i].taxes
  ads.value = dataProduct[i].ads
  discount.value = dataProduct[i].discount
  category.value = dataProduct[i].category
  create.innerHTML ="Update"
  count.style.display="none"
  count.value=1
  mood= "update"
  temp=i
  scroll({
    top:0,
    behavior:"smooth",
  })
  totalPrice()
}


// search
let searchMood='Title'

function searchType(id){
if(id==="searchByTitle"){
  searchMood='Title'
}else{
  searchMood='Category'
}
search.placeholder="Search By " + searchMood
search.focus()
search.value=''
readData()
}



function searchInput(value){
  let table=' ';
  for(let i=0; i< dataProduct.length ;i++){
  if(searchMood==="Title"){
      if(dataProduct[i].title.includes(value.toLowerCase())){
        table += `
        <tr>
            <td data-label="id">${1+i}</td>
            <td data-label="title">${dataProduct[i].title}</td>
            <td data-label="price">${dataProduct[i].price}</td>
            <td data-label="taxes">${dataProduct[i].taxes}</td>
            <td data-label="ads">${dataProduct[i].ads}</td>
            <td data-label="discount">${dataProduct[i].discount}</td>
            <td data-label="total">${dataProduct[i].total}</td>
            <td data-label="category">${dataProduct[i].category}</td>
            <td><button id="update" onclick="updateProduct(${i})">update</button></td>
            <td><button onclick="deleteProduct(${i})" id="delete">delete</button></td>
        </tr>
    `;
    }
  }else{
      if(dataProduct[i].category.includes(value.toLowerCase())){
        table += `
        <tr>
            <td data-label="id">${1+i}</td>
            <td data-label="title">${dataProduct[i].title}</td>
            <td data-label="price">${dataProduct[i].price}</td>
            <td data-label="taxes">${dataProduct[i].taxes}</td>
            <td data-label="ads">${dataProduct[i].ads}</td>
            <td data-label="discount">${dataProduct[i].discount}</td>
            <td data-label="total">${dataProduct[i].total}</td>
            <td data-label="category">${dataProduct[i].category}</td>
            <td ><button id="update" onclick="updateProduct(${i})">update</button></td>
            <td ><button onclick="deleteProduct(${i})" id="delete">delete</button></td>
        </tr>
    `;

    }
  }
}
  // if(dataProduct[i].title.toLowerCase().includes(value) !=''&& dataProduct[i].category.toLowerCase().includes(value) !='')
  document.getElementById("tbody").innerHTML = table;

}


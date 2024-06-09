
//VARIABLES

var productName = document.getElementById('productName');
var productCat = document.getElementById('productCat');
var productPrice = document.getElementById('productPrice');
var productImg = document.getElementById('productImg');
var productDes = document.getElementById('productDes');
var itemRow = document.getElementById('itemRow');
var searchProduct = document.getElementById('searchProduct');
var addBtn = document.getElementById('addBtn');
var editBtn = document.getElementById('editBtn');
var productList ;


//LOCAL STORAGE 

if (localStorage.getItem('list') == null) 
    productList = []
    
else {
    productList = JSON.parse(localStorage.getItem('list'));
    display(productList)
}



//BUTTON ONCLICK FUNCTION

addBtn.onclick = function(){
    addProduct();
    display(productList);
    clearForm();
}


//ADD PRODUCT FUNCTION

function addProduct(){
    var productInfo = {
        pName: productName.value,
        pCategory: productCat.value,
        pPrice: productPrice.value,
        pImage:`../Assets/${productImg.files[0]?.name}`,
        pDescription: productDes.value,
    }

    productList.push(productInfo);
    localStorage.setItem('list', JSON.stringify(productList));
    console.log(JSON.stringify(productList))

}

function clearForm(){
    productName.value = null;
    productCat.value = null;
    productPrice.value = null;
    productImg.value = null;
    productDes.value = null;
}

//DISPLAY FUNCTION

function display(list){
    var box = '';
    for (var i = 0; i < list.length; i++) {
        box += `<div class="col-xxl-3 col-xl-3 col-md-3 col-sm-12">
        <div class="card position-relative">
            <span class="position-absolute end-0 top-0 badge bg-primary">${i + 1}</span>
            <img src="${list[i].pImage}" class="card-img-top w-100" alt="product image">
            <div class="card-body">
              <h5 class="card-title">${list[i].pName}</h5>
              <p class="card-text">${list[i].pDescription}</p>
              <div class="d-flex justify-content-between align-items-end">
                <h6>${list[i].pCategory}</h6>
              <h6>${list[i].pPrice} LE</h6>
              </div>
            </div>
            <button class="btn btn-outline-warning m-2" onclick="editForUpdate(${i})" type="button"><i class="fa-solid fa-pen-to-square"></i> Update</button>
            <button class="btn btn-outline-danger m-2" onclick="deleteFun(${i})" type="button"><i class="fa-solid fa-trash-can"></i> Delete</button>
          </div>
    </div>`
    
}

itemRow.innerHTML = box;
}

//DELETE FUNCTION

function deleteFun(index) {
    productList.splice(index, 1);
    localStorage.setItem('list',JSON.stringify(productList));
    display(productList);
}

//UPDATE FUNCTION 

var globalIndex;

function editForUpdate(index) {
    globalIndex = index;
    editBtn.classList.remove('disabled');
    addBtn.classList.add('disabled');
    productName.value = productList[index].pName;
    productPrice.value = productList[index].pPrice;
    productCat.value = productList[index].pCategory;
    productDes.value = productList[index].pDescription;
    productImg.value = productList[index].pImage;

}

function updateFun(){
    productList[globalIndex].pName = productName.value;
    productList[globalIndex].pPrice = productPrice.value;
    productList[globalIndex].pCategory = productCat.value;
    productList[globalIndex].pDescription = productDes.value;
    productList[globalIndex].pImage = `../Assets/${productImg.files[0]?.name}`;
    localStorage.setItem('list', JSON.stringify(productList));
    editBtn.classList.add('disabled');
    addBtn.classList.remove('disabled');
    display(productList);
}

editBtn.onclick = function(){
    updateFun();
}


//LOGOUT 

var profileName = document.getElementById('profileName');
var logoutBtn = document.getElementById('logoutBtn');
var Name = JSON.parse(localStorage.getItem('name'));

profileName.innerHTML = Name;

logoutBtn.addEventListener('click', function(){

    LogoutEvent();

})


function LogoutEvent(){
    document.location.href = '../index.html';
}

//SEARCH FUNCTION 

function searchFun(){

    var term = searchProduct.value.trim().toLowerCase();
    var searchedArray = [];
    for (let i = 0; i < productList.length; i++) {
        if (productList[i].pName.trim().toLowerCase().includes(term) == true) {
            searchedArray.push(productList[i])
        }
    }
    console.log(searchedArray);
    display(searchedArray);

}

searchProduct.oninput = function (){
    searchFun();
}

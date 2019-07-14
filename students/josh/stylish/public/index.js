
let stylish = {
    api: "products",
    productType: "all" 
}


window.addEventListener("DOMContentLoaded", callAPI(stylish, createProduct));

function changeAPI(type){
    stylish.api = type;
    stylish.productType = "";
}


//call API
function callAPI(stylish, callback){

    let src= "https://api.appworks-school.tw/api/1.0/" + stylish.api + "/" + stylish.productType;

    fetch(src).then((res) => {
        return res.json(); 
    }).then((result) => {
        callback(result);
    }).catch(function(err){
        console.log("Fetch 錯誤:"+err);
    });
}

//change menu 
function changeProductType(productType){

        let e = event.target;
       
        //remove old product
        removeProduct();

        // active menu add color
        let menuAnchar = document.querySelectorAll('.nav-left .menu a')
        menuAnchar.forEach(a => a.classList.remove('isActive'));
        e.classList.add('isActive');

        //call api
        stylish.productType = productType;
        callAPI(stylish, createProduct);       
}


//移除category
function removeProduct(){
    let category = document.querySelector('.category');
    while(category.firstChild){
        category.removeChild(category.firstChild);
    }
}


//生成category
function createProduct(res){
    let  categoryBlock = document.querySelector('.category');
    let  productBlock, newTag, productImg, colorDiv, colorBlock, productName, productPrice;


    res.data.forEach( (item ,index)=> {

        // product block
        productBlock = document.createElement('div');
        productBlock.classList.add("category-block");
        

        // new tag
        if(index === 0){
            newTag = document.createElement('div');
            newTag.classList.add("new");
            newTag.textContent = "新品";
            productBlock.appendChild(newTag);
        }

        //product Img
        productImg = document.createElement('img');
        productImg.classList.add("sample");
        productImg.src = item.main_image;

        // product name
        productName = document.createElement('p');
        productName.classList.add("sample-name");
        productName.textContent = item.title;


        // color
        colorDiv = document.createElement('div');
        item.colors.forEach( color => {
            colorBlock = document.createElement('div');
            colorBlock.classList.add("color");
            colorBlock.style.backgroundColor = "#" + color.code;
            if(color.code.toUpperCase() === 'FFFFFF'){
                colorBlock.classList.add("color-border");
            }
            colorDiv.appendChild(colorBlock);
        } )


        // price
        productPrice = document.createElement('p');
        productPrice.classList.add("sample-price");
        productPrice.textContent ='TWD.'+ item.price.toString();
        
        //append child
        productBlock.appendChild(productImg);
        productBlock.appendChild(colorDiv);
        productBlock.appendChild(productName);
        productBlock.appendChild(productPrice);

        categoryBlock.appendChild(productBlock);
    })
}


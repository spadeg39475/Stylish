
let stylish = {
    api: "products",
    productType: "all" 
}

//------　api url
let src= "https://api.appworks-school.tw/api/1.0/" + stylish.api + "/" + stylish.productType;

//-------trigger element
let isLoading = false;
let isEnd = false;
let triggerDistance =200 ;


// homepage 
window.addEventListener("DOMContentLoaded", callAPI(createProduct));



//call API
function callAPI(callback){

    if ( !isLoading && !isEnd  ) {
        
        isLoading = true;

        fetch(src)
        .then((res) => {

            isLoading = false;
            return res.json(); 
         }).then((result) => {

            if(result.paging){
                src= "https://api.appworks-school.tw/api/1.0/" + stylish.api + "/" + stylish.productType + "?paging=" + result.paging; 
            }
            else if( stylish.productType === "search" && result.data.length === 0){
                 err_page();
            }
            else if (!result.paging){
                isEnd = true;
            }
            callback(result);

        }).catch(function(err){
        console.log("Fetch 錯誤:"+err);
        });
    }
}

//----paging scroll -----
function scroll(){
    let container = document.querySelector('.category');
    let distance  = container.getBoundingClientRect().bottom - window.innerHeight;
    
    if( distance < triggerDistance){
        callAPI(createProduct);
    }
}

window.addEventListener('scroll', scroll);


//-----change menu 
function changeProductType(productType){
        isEnd = false;  // 解除paging end false 
        let e = event.target;
       
        //remove old product
        removeProduct();

        // active menu add color
        let menuAnchar = document.querySelectorAll('.nav-left .menu a')
        menuAnchar.forEach(a => a.classList.remove('isActive'));
        e.classList.add('isActive');

        //call api
        stylish.productType = productType;
        src= "https://api.appworks-school.tw/api/1.0/" + stylish.api + "/" + stylish.productType;
        callAPI(createProduct);       
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


//------------search ----------------
function search(value){
    isEnd = false;
    stylish.productType = "search";
    src= "https://api.appworks-school.tw/api/1.0/" + stylish.api + "/" + stylish.productType + "?keyword=" +value;
 
    
    removeProduct();
    callAPI(createProduct);

    let input = document.querySelector('#search');
    input.value ="";
}


function err_page(){

    removeProduct()

    let  category = document.querySelector('.category');
    let  productBlock = document.createElement('div');;
    productBlock.textContent = "請重新搜尋";
    category.appendChild(productBlock);
}


// ----mobile search ----------//
let mobile_search = document.querySelector('.mobile-search');
let mobile_search_input = document.querySelector('.mobile-search-input');

mobile_search.addEventListener('click', () =>{
    mobile_search.classList.add('hidden');
    mobile_search_input.classList.remove('hidden');
    mobile_search_input.focus();
})

mobile_search_input.addEventListener('keypress', (e)=>{
    if(e.key == "Enter"){
        search(mobile_search_input.value);
        mobile_search_input.blur();
        mobile_search_input.value ="";
        mobile_search_input.classList.add('hidden');
        mobile_search.classList.remove('hidden');
    }
})

mobile_search_input.addEventListener('blur', () =>{
    mobile_search_input.classList.add('hidden');
    mobile_search.classList.remove('hidden');
})

// ----mobile search ----------//



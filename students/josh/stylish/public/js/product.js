
let stylish = {
    api: "products",
    productType: "details" 
}


//------宣告 --------
let isLoading = false;
let details;

let details_main_image =  document.querySelector('#main-img');
let details_product_name = document.querySelector('#product-name');
let details_product_id = document.querySelector('#product-id');
let details_product_price = document.querySelector('#product-price');
let details_product_colors = document.querySelector('#product-colors');
let details_product_sizes = document.querySelector('#product-sizes');
let details_product_note = document.querySelector('#product-note');
let details_product_story = document.querySelector('.story');
let details_product_image = document.querySelectorAll('.product-image');
let note = document.querySelector('#note');
let texture = document.querySelector('#texture');
let description = document.querySelector('#description');
let wash = document.querySelector('#wash');
let place = document.querySelector('#place');
let quantity_count = document.querySelector('#quantity-count');
let quantity_count_value = document.querySelector('#count');
let btn_plus = document.querySelector('#plus');
let btn_minus = document.querySelector('#minus');
let btnAddCart = document.querySelector('.add-cart-btn');
let count = 1;
let stock, stock_qty;  //紀錄庫存數量


let currentColor, currentColorName, currentSize;
let product_price;

let newItem;

// url params
let productURL = new URL(location.href);
const { href, protocol, hostname, pathname, search, searchParams } = productURL;

// call detail api
function callDetail(callback){

    let src = "https://api.appworks-school.tw/api/1.0/products/details" + search; 

    if ( !isLoading ) {
        
        isLoading = true;

        fetch(src)
        .then((res) => {
            isLoading = false;
            return res.json(); 
         }).then((result) => {
            details = result;
            callback(result);

        }).catch(function(err){
        console.log("Fetch 錯誤:"+err);
        });
    }
}
 
callDetail(createDetails);

function createDetails(res){

    // main img
    details_main_image.setAttribute('src', res.data.main_image);
    // name
    details_product_name.textContent = res.data.title; 
    // id
    details_product_id.textContent = res.data.id;
    // price
    details_product_price.textContent = 'TWD.' + res.data.price;
    product_price = res.data.price;
    
    //color 
    res.data.colors.forEach( (item, index) => {
        let color = document.createElement('div');
        if (item.code === 'FFFFFF' ){
           color.style.border = "1px solid #979797";
        }
        if ( index === 0){
            color.classList.add('current');
            currentColor = item.code;
            currentColorName =item.name;
        }
      
        color.classList.add('color');
        color.style.backgroundColor = "#" + item.code ;
        details_product_colors.appendChild(color);

        color.addEventListener('click', event =>{
            removeCurrentColor();
            event.target.classList.add('current');
            currentColor = item.code;
            currentColorName =item.name;
            qty_reset();
            getStock();
            checkStock();
        })
    });


    // size
    res.data.sizes.forEach( (item, index) =>{
        let size = document.createElement('div');
        if( index === 0){
            size.classList.add('current');
            currentSize = item;
        }
        size.classList.add('size');
        size.textContent = item;
        details_product_sizes.appendChild(size);

        size.addEventListener('click', event =>{
            removeCurrentSize();
            event.target.classList.add('current');
            currentSize = item;
            qty_reset();
            getStock();
            checkStock();
        })
    })

    //get stock quantity
    getStock();
    checkStock();
    
    // note
    note.textContent = res.data.note;
    texture.textContent = res.data.texture;
    description.textContent = res.data.description;
    description.style.whiteSpace = "pre";
    wash.textContent = res.data.wash;
    place.textContent = res.data.place;


    //story
    details_product_story.textContent = res.data.story;

    //more img
    details_product_image.forEach( (item, index) =>{
        let more_img = document.createElement('img');
        more_img.setAttribute('src', res.data.images[index]);
        item.appendChild(more_img);
    });
}



function removeCurrentColor(){
   let children = Array.from(details_product_colors.children);
   children.forEach( i =>{
       i.classList.remove('current');
   })  
}

function removeCurrentSize(){
    let children = Array.from(details_product_sizes.children);
    children.forEach( i =>{
        i.classList.remove('current');
    })  
 }



// =============================================
//        Quantity control functions
// =============================================

function plus(){
    count++;
    quantity_count_value.textContent = count;
}

function minus(){
    if(count > 1){
        count--;
        quantity_count_value.textContent = count;
    }
}



function getStock(){
    stock = details.data.variants;

    // get stock quantity
    stock_qty = stock.filter( (el) => 
        el.color_code === currentColor && el.size === currentSize
    )[0].stock;
}

function checkStock(){
    if (stock_qty === 0){
        quantity_count.classList.add('disabled');
        quantity_count_value.textContent = 0;
        count = 0;
    }else if ( count === stock_qty){
        btn_plus.classList.add('disabled');
    }
}


function qty_reset() {
    count = 1 ; 
    quantity_count_value.textContent = 1;
    quantity_count.classList.remove('disabled');
    btn_plus.classList.remove('disabled');
}


btn_plus.addEventListener('click', () =>{
    if (count < stock_qty){ 
        plus();
    }
    checkStock();
})


btn_minus.addEventListener('click', () =>{
    if(stock_qty !== 1){
        btn_plus.classList.remove('disabled');
    }
    minus();
    
})


// ===============================================================
//          add to cart
// ===============================================================

function addCart() {

     newItem ={
        id: details_product_id.textContent,
      name: details_product_name.textContent,
      price: product_price,
      color: {
        name: currentColorName,
        code: currentColor
      },
      size: currentSize,
      qty: quantity_count_value.textContent
    }

    stylishStorage.cart.list.push(newItem);
    localStorage.setItem('cart', JSON.stringify(stylishStorage.cart));
}

btnAddCart.addEventListener('click', ()=>{
    if( stock_qty === 0){
        alert('此商品已無存貨');
    }
    else{
        alert('已加入購物車!');
        addCart();
        showCartNum();
    }  
})



// ===============================================================
//          search 
// ===============================================================

function searching(value){
    stylish.api = "products"
    stylish.productType = "search";
    src= "https://api.appworks-school.tw/api/1.0/" + stylish.api + "/" + stylish.productType + "?keyword=" +value;
 
    let input = document.querySelector('#search');
    input.value ="";

    removeProduct();
    callAPI(createProduct);

}


function err_page(){

    removeProduct()
    let  productBlock = document.createElement('div');;
    productBlock.textContent = "請重新搜尋";
    categoryBlock.appendChild(productBlock);
}


// ----mobile search ----------
let mobile_search = document.querySelector('.mobile-search-img');
let mobile_search_input = document.querySelector('.mobile-search-input');

mobile_search.addEventListener('click', () =>{
    mobile_search.classList.add('hidden');
    mobile_search_input.classList.remove('hidden');
    mobile_search_input.focus();
})

mobile_search_input.addEventListener('keypress', (e)=>{
    if(e.key == "Enter"){
        searching(mobile_search_input.value);
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

// =======================================================================



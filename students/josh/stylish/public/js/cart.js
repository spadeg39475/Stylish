
let src;
let detailsURL = "https://api.appworks-school.tw/api/1.0/products/details?id=";
let cartTotalPrice = 0;  //購物車加總


function getCartListDetail(callback){

    fetch(src)
    .then((res) => {
        return res.json(); 
     })
     .then((result) => {
        cartListDetail = result;
        callback(result);
    })
    .catch(function(err){
    console.log("Fetch 錯誤:"+err);
    });
}

// 創建購物車清單
function createCartList(){
    let cartList = document.querySelector('.cart-list');

    stylishStorage.cart.list.forEach( (el, index, array) => {
        let listRow = document.createElement('div');
        listRow.classList.add('row');
    
        let variant = document.createElement('div');
        variant.classList.add('variant');       
        

        // img
        let imgDiv = document.createElement('div');
        let img = document.createElement('img');
        imgDiv.classList.add('picture');
        img.setAttribute('src', el.main_image);
        imgDiv.appendChild(img);

        // details
        let details = document.createElement('div');
        details.classList.add('details');
        details.innerHTML = el.name + '</br>';
        details.innerHTML += el.id + '</br>' + '</br>';
        details.innerHTML += '顏色：' + el.color.name + '</br>';
        details.innerHTML += '尺寸：' + el.size ;
        
        variant.appendChild(imgDiv);
        variant.appendChild(details);

        // qty
        let qty = document.createElement('div');
        qty.classList.add('qty');

        let select = document.createElement('select');
        for(let i = 1; i <= el.stock; i++){
            let option = document.createElement('option');
            option.setAttribute('value', i);
            option.textContent = i ;
            // 預設使用者選的數量
            if (option.value === el.qty){
                option.selected = true;
            }
            select.appendChild(option);
        }
        //change subtotal when select qty change
        select.addEventListener('change', () => {
            subtotal.textContent = `NT. ${el.price * event.target.value}`;
            el.qty = event.target.value;
            localStorage.setItem('cart', JSON.stringify(stylishStorage.cart));
            cartListSum();
            totalAddFreight();
        })

        qty.appendChild(select);


        // price
        let price = document.createElement('div');
        price.classList.add('price');
        price.textContent = `NT. ${el.price}`; 

        // subtotal
        let subtotal = document.createElement('div');
        subtotal.classList.add('subtotal');
        subtotal.textContent = `NT. ${el.price * el.qty}`;
         
        
        
        // remove
        let remove = document.createElement('div');
        remove.classList.add('remove');

        let removeImg = document.createElement('img');
        removeImg.setAttribute('src', './style/images/cart-remove.png');
        remove.appendChild(removeImg);


        // append to listRow
        listRow.appendChild(variant);
        listRow.appendChild(qty);
        listRow.appendChild(price);
        listRow.appendChild(subtotal);
        listRow.appendChild(remove);
        cartList.appendChild(listRow);

        // remove function
        remove.addEventListener('click', removeCartItem);

    });

}

// 購物車加總
function cartListSum(){
    cartTotalPrice = 0;
    let subtotals = document.querySelectorAll('.subtotal');
    for(let i=1; i < subtotals.length; i++){
        cartTotalPrice += Number(subtotals[i].textContent.slice(4)); 
    }

    let cartTotal = document.querySelector('#subtotal');
    cartTotal.textContent = cartTotalPrice;
}

//加運費 
function totalAddFreight(){
    let freight = document.querySelector('#freight');
    let total = document.querySelector('#total');
    total.textContent = cartTotalPrice + Number(freight.textContent);
}


// 刪除購物車列
function removeCartItem(){
    let removeItem = event.target.parentNode.parentNode;
    
    // 取得移除列的 index
    let removeIndex = Array.from(removeItem.parentNode.children).indexOf(removeItem);
    
    removeItem.parentNode.removeChild(removeItem);
    
    cartListSum();
    totalAddFreight();

    // 更新 stylishStorage 和 localStorage
    stylishStorage.cart.list.splice(removeIndex, 1);
    localStorage.setItem('cart', JSON.stringify(stylishStorage.cart));
    showCartNum();
    alert('此商品已從購物車移除');
}






// 初始頁面
createCartList();
cartListSum();
totalAddFreight();
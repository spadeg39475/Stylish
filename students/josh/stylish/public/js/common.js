let stylishStorage = {
    prime: "",

    cart: {
    
        shipping: "delivery",
        payment: "credit_card",
        subtotal: "",
        freight: "",
        total: "",
        recipient: {
            name: "",
            phone: "",
            email: "",
            address: "",
            time: ""
        },

        list: []
    }
}


updateStorage();
showCartNum();



// localStorage 有資料 => 更新到 stylishStorage
//              無資料 => 建立 initial structure
function updateStorage(){
    if(localStorage.cart){
        let currentStorage = JSON.parse(localStorage.getItem('cart'));
        stylishStorage.cart = currentStorage;


    }else{
        localStorage.setItem('cart', JSON.stringify(stylishStorage.cart));
    }
}


// cart 顯示 localStorage list 數量
function showCartNum() {
    let cartNum = document.querySelector('.cart-qty');
    cartNum.textContent = JSON.parse(localStorage.cart).list.length;

    let mobileCartNum = document.querySelector('.mobile-cart-qty');
    mobileCartNum.textContent = JSON.parse(localStorage.cart).list.length;

}


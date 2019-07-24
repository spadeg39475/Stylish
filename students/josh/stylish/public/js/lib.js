let stylish = {
    api: "products",
    productType: "all" 
}

let stylishStorage = {
    prime: "",
    cart: {
        shipping: "delivery",
        payment: "credit_card",
        subtotal: "",
        freight: "60",
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

let isLoading = false;
let productlist;

// category
let  categoryBlock = document.querySelector('.category');

// campaigns
let campaigns;
let content_array;
let main_block = document.querySelector('.main-block');
let campaign_count = 0;

// mobile search
let mobile_search = document.querySelector('.mobile-search-img');
let mobile_search_input = document.querySelector('.mobile-search-input');

// product detail
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
let main_img;
let count = 1;
let stock, stock_qty;  //紀錄庫存數量
let currentColor, currentColorName, currentSize, product_price, newItem;

// cart 
let cartTotalPrice = 0;  //購物車加總

let customNameInput = document.querySelector('#recipient-name');
let customEmailInput = document.querySelector('#recipient-email');
let customPhoneInput = document.querySelector('#recipient-phone');
let customAddressInput = document.querySelector('#recipient-address');
let timeSelector = document.querySelector('.time-selector');
let checkoutBtn = document.querySelector('#checkout');
let orderInfo, orderNum;

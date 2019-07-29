
let member = document.querySelector('.member');
let member_img = document.querySelector('#member');
let mobile_member = document.querySelector('.mobile_member');


// ===============================================================
//          search 
// ===============================================================

function searching(value){
    stylish.api = "products"
    stylish.productType = "search";
    searchingSRC= "https://api.appworks-school.tw/api/1.0/" + stylish.api + "/" + stylish.productType + "?keyword=" +value;
    
    window.location.href = `./?tag=${value}`;
}


function err_page(){
    removeProduct();
    let  productBlock = document.createElement('div');;
    productBlock.textContent = "請重新搜尋";
    categoryBlock.appendChild(productBlock);
}


// ----mobile search ----------
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


function setUserImg(response) {
    
    if(localStorage.memberInfo && response.status === 'connected'){
        member_img.setAttribute('src', JSON.parse(localStorage.memberInfo).picture);
        member_img.style.borderRadius = "50%";
    }
    else{
        member_img.setAttribute('src', "./style/images/member.png");
        member_img.style.borderRadius = "";
    }
        
}


// ---- FB SDK ----//




member.addEventListener('click', checkLoginState);
mobile_member.addEventListener('click', checkLoginState);


function checkLoginState(){
        
    FB.getLoginStatus(function(response){
        statusChangeCallback(response);
    }, true)
}

function login(){
    deleteCookie("fblo_" + "491562071599440");
    FB.login(function(response) {
        // handle the response
        memberInfo.access_token = response.authResponse.accessToken;

        FB.api('/me?fields=id,name,email,picture', function(response) {
            memberInfo.id = response.id;
            memberInfo.name = response.name;
            memberInfo.picture = response.picture.data.url;
            memberInfo.email = response.email;
            localStorage.setItem('memberInfo',JSON.stringify(memberInfo));    
        });
        console.log(response);
    }, {scope: 'public_profile, email'}); 
}

function statusChangeCallback(response){
    console.log(response);

    if(response.status === 'connected'){
        // window.location.href = "./profile.html";
        //get access token, and save it in local storage
        memberInfo = JSON.parse(localStorage.getItem('memberInfo'));
        window.location.href = './profile.html';
    }else {
        login();
    }
}

function deleteCookie(name) {
    document.cookie = name + '=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
 }
 // deleteCookie("fblo_" + fbAppId); // fblo_yourFBAppId. example: fblo_491562071599440




window.addEventListener('DOMContentLoaded', () => {
    updateStorage();
    showCartNum();
    
    setTimeout(function(){
        FB.getLoginStatus(function(response){
            console.log(response);
            setUserImg(response);
        }, true);
    }, 1000);
    
})


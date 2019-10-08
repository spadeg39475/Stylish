
let member = document.querySelector('.member');
let member_img = document.querySelector('#member');
let mobile_member = document.querySelector('.mobile_member');
let btnFB = document.querySelector('.fb-btn');
let data;

// ===============================================================
//          search 
// ===============================================================

function searching(value){
    stylish.api = "products"
    stylish.productType = "search";
    searchingSRC= "https://api.appworks-school.tw/api/1.0/" + stylish.api + "/" + stylish.productType + "?keyword=" +value;
    
    window.location.href = `./?tag=${value}`;
}


// function err_page(){
//     removeProduct();
//     let  productBlock = document.createElement('div');
//     productBlock.classList.add("errPage");
//     productBlock.textContent = "請重新搜尋";
//     categoryBlock.appendChild(productBlock);
// }


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

// ---- set user Img
function setUserImg() {
    
    if(localStorage.memberInfo){
        memberInfo = JSON.parse(localStorage.getItem('memberInfo'));
        if (memberInfo.user.picture !== null) {
            member_img.setAttribute('src', JSON.parse(localStorage.memberInfo).user.picture);
            member_img.style.borderRadius = "50%";
        }else if (!memberInfo.user.picture){
            member_img.setAttribute('src', './style/images/unknown.jpg');
            member_img.style.borderRadius = "50%";
        }
    }
    else{
        member_img.setAttribute('src', "./style/images/member.png");
        member_img.style.borderRadius = "";
    }
        
}



let loginURL = 'https://api.appworks-school.tw/api/1.0/user/signin';

// ---- FB SDK ----//
member.addEventListener('click', ()=>{
    if(localStorage.memberInfo){
        location.href = './profile.html';
    }else{
        showLogin();
    }
});

btnFB.addEventListener('click', fbLogin);

mobile_member.addEventListener('click', ()=>{
    if(localStorage.memberInfo){
        location.href = './profile.html';
    }else{
        showLogin();
    }
});


function checkLoginState(){
        
    FB.getLoginStatus(function(response){
        statusChangeCallback(response);
    }, true)
}



function fbLogin(){
    deleteCookie("fblo_" + "491562071599440");
    FB.login(function(response) {
        
        data ={
            provider: 'facebook',
            access_token: response.authResponse.accessToken
        }

        fetch(loginURL, {
            method: 'POST',
            body: JSON.stringify(data), 
            headers: new Headers({
              'Content-Type': 'application/json',
            })
          }).then(res => res.json())
          .catch(error => console.error('Error:', error))
          .then(response => {
            console.log('Success:', response);

            memberInfo.access_token = response.data.access_token;
            memberInfo.provider = response.data.user.provider;
            memberInfo.user.name = response.data.user.name;
            memberInfo.user.id = response.data.user.id;
            memberInfo.user.email = response.data.user.email;
            memberInfo.user.picture = response.data.user.picture;

            localStorage.setItem('memberInfo',JSON.stringify(memberInfo));

            loginPassword.value ="";
            loginEmail.value ="";
            hideLogin();
        })

        console.log(response);
    }, {scope: 'public_profile, email'}); 
}

function statusChangeCallback(response){
    console.log(response);

    if(response.status === 'connected'){
        //get access token, and save it in local storage
        data ={
            provider: 'facebook',
            access_token: response.authResponse.accessToken
        }
        memberInfo = JSON.parse(localStorage.getItem('memberInfo'));
        // window.location.href = './profile.html';
    }else {
        fbLogin();
    }
}

function deleteCookie(name) {
    document.cookie = name + '=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
 }
 // deleteCookie("fblo_" + fbAppId); // fblo_yourFBAppId. example: fblo_491562071599440





 
// ------------------ log in ---------------------------
let loginBlock = document.querySelector('.login');
let btnClose = document.querySelector('.close');
btnClose.addEventListener('click', hideLogin);
 
let loginEmail = document.querySelector('#login-email');
let loginPassword = document.querySelector('#password');
let btnSignIn = document.querySelector('.sign-in');


// sign in function
btnSignIn.addEventListener('click', ()=>{
     
    data = {
        provider: 'native',
        email: loginEmail.value,
        password: loginPassword.value
    }
    fetch(loginURL, {
        method: 'POST',
        body: JSON.stringify(data), 
        headers: new Headers({
          'Content-Type': 'application/json',
        })
      }).then(res => res.json())
        .catch(error => console.error('Error:', error))
        .then(response => {
        console.log('Success:', response);
        // save user Info
        if(response.data){
            memberInfo.access_token = response.data.access_token;
            memberInfo.provider = response.data.user.provider;
            memberInfo.user.name = response.data.user.name;
            memberInfo.user.id = response.data.user.id;
            memberInfo.user.email = response.data.user.email;
            memberInfo.user.picture = response.data.user.picture;

            localStorage.setItem('memberInfo',JSON.stringify(memberInfo));

            loginPassword.value ="";
            loginEmail.value ="";
            alert('登入成功');
            hideLogin();
            setUserImg();
        }else{
            alert('請輸入正確的 email 和 password');
        }
      })
     
})


function showLogin(){
    loginBlock.classList.remove('hidden');     
}

 function hideLogin(){
    loginBlock.classList.add('hidden');
    loginPassword.value ="";
    loginEmail.value ="";
 }


window.addEventListener('DOMContentLoaded', () => {
    updateStorage();
    showCartNum();
    setUserImg();
    
})


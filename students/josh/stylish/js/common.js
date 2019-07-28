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

// call func
updateStorage();
showCartNum();


// ---- FB SDK ----//

function Del_FB_App() { 
    FB.getLoginStatus(function (response) {//取得目前user是否登入FB網站
        
        console.log(response);
        if (response.status === 'connected') {
            // Logged into Facebook
            FB.api("/me/permissions", "DELETE", function (response) {
                console.log(response); //gives true on app delete success 
            });
        }
    });
}


let member = document.querySelector('.member');
member.addEventListener('click', checkLoginState);

function checkLoginState(){
    
    FB.getLoginStatus(function(response){

        statusChangeCallback(response);
    })
}

function login(){
    FB.login(function(response) {
        // handle the response
        localStorage.setItem('accessToken', response.authResponse.accessToken); 
    }, {scope: 'public_profile, email'});
}

function statusChangeCallback(response){
    console.log(response);

    if(response.status === 'connected'){
        // window.location.href = "./profile.html";
        //get access token, and save it in local storage
        localStorage.setItem('accessToken', response.authResponse.accessToken); 
    }else if (response.status === 'not_authorized') {
        // the user is logged in to Facebook, but has not authenticated the app
        console.log('logged into Facebook, but not app');
        login();
    }else {
        //response.status === 'unknown'
        // the user isn't logged in to Facebook.
        console.log('not logged into FB');
        login();
    }
}

function getUserInfo(accessToken) {
    FB.api('/me', 'get', {
      access_token: accessToken,
      fields: 'id,name,email,picture'
    }, function(response) {
      console.log(response);
    });
  }
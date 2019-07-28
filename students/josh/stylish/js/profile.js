

let member_name = document.querySelector('#member_name');
let member_id = document.querySelector('#member_id');
let member_email = document.querySelector('#member_email');


window.addEventListener('load', ()=>{
    FB.getLoginStatus(function(response){
        if(response.status === 'connected'){
            // window.location.href = "./profile.html";
            //get access token, and save it in local storage
            localStorage.setItem('accessToken', response.authResponse.accessToken); 
        }
        FB.api('/me', 'get', {
            access_token: localStorage.access_token,
            fields: 'id,name,email,picture'
          }, function(response){
              member_name.textContent = response.name;
              member_id.textContent = response.id;
              member_email.textContent = response.email;
              
        })
    })
})

let member_pic = document.querySelector('#member_pic');
let member_name = document.querySelector('#member_name');
let member_id = document.querySelector('#member_id');
let member_email = document.querySelector('#member_email');


window.addEventListener('DOMContentLoaded', ()=>{
    memberInfo = JSON.parse(localStorage.getItem('memberInfo'));
    member_name.textContent = memberInfo.name;
    member_id.textContent = memberInfo.id;
    member_email.textContent = memberInfo.email;
    member_pic.setAttribute('src', `https://graph.facebook.com/${memberInfo.id}/picture?type=large`);            
})

let logout = document.querySelector('.logout');
logout.addEventListener('click', () =>{
    FB.getLoginStatus(function(response){
        if(response.status === 'connected'){
            FB.logout(function(response){
                if(response.status !== 'connected'){
                    localStorage.removeItem('memberInfo');
                    location.href = "./";
                }
            });
        }
    })    
});
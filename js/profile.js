
let member_pic = document.querySelector('#member_pic');
let member_name = document.querySelector('#member_name');
let member_id = document.querySelector('#member_id');
let member_email = document.querySelector('#member_email');



window.addEventListener('DOMContentLoaded', ()=>{

    memberInfo = JSON.parse(localStorage.getItem('memberInfo'));

    if(memberInfo.provider === 'facebook'){
        setTimeout(()=>{
            FB.getLoginStatus(function(response){
                if(response.status !== 'connected'){
                    localStorage.removeItem('memberInfo');
                    alert('未登入 FB');
                    location.href = "./";
                }
            })
        },1000);
    }
    
    member_name.textContent = memberInfo.user.name;
    member_id.textContent = memberInfo.user.id;
    member_email.textContent = memberInfo.user.email;
    if(memberInfo.user.picture !== null){
        member_pic.setAttribute('src', memberInfo.user.picture);  
    }
             
})

let logout = document.querySelector('.logout');
logout.addEventListener('click', () =>{

    if(memberInfo.provider === 'facebook'){
        FB.getLoginStatus(function(response){
            if(response.status === 'connected'){
                FB.logout(function(response){
                    if(response.status !== 'connected'){
                        localStorage.removeItem('memberInfo');
                        location.href = "./";
                    }
                });
            }else{
                localStorage.removeItem('memberInfo');
                location.href = "./";
            }
        })    
    }else{
        localStorage.removeItem('memberInfo');
        location.href = "./";
    }
});

let stylish = {
    api: "products",
    productType: "all" 
}

//------　api url
let src= "https://api.appworks-school.tw/api/1.0/" + stylish.api + "/" + stylish.productType;

//-------trigger element
let isLoading = false;
let triggerDistance =200 ;




// homepage
window.addEventListener("DOMContentLoaded", callAPI(createProduct));


//call API
function callAPI(callback){

    if ( !isLoading ) {
        
        isLoading = true;

        fetch(src)
        .then((res) => {

            isLoading = false;
            return res.json(); 
         }).then((result) => {

            if(result.paging){
                src= "https://api.appworks-school.tw/api/1.0/" + stylish.api + "/" + stylish.productType + "?paging=" + result.paging;
                window.addEventListener('scroll', scroll); 
            }
            else if( stylish.productType === "search" && result.data.length === 0){
                 err_page();
            }
            else if (!result.paging){
                src =""
                window.removeEventListener('scroll', scroll);
            }
            aaa = result
            callback(result);

        }).catch(function(err){
        console.log("Fetch 錯誤:"+err);
        });
    }
}


// ------- 封面 Img ------------//
let campaigns;
let content_array;
let main_block = document.querySelector('.main-block');
let count = 0;


window.addEventListener("DOMContentLoaded", createCampaignImg());

//create first campaignImg
function createCampaignImg(){

    src = "https://api.appworks-school.tw/api/1.0/marketing/campaigns";
    
    fetch(src)
    .then( res => {return res.json()})
    .then( result => {
        campaigns = result;
        setCampaignImg(result, 0);
        count++ ;
    })
    .catch( err => {
        console.log("Fetch 錯誤:"+err);
    });
}

// set Campaign Img
function setCampaignImg(res, i) {
   
    removeContent();
    removeCircle();
    
    // set img
    let main_block = document.querySelector('.main-block');
    main_block.style.backgroundImage = `url(https://api.appworks-school.tw${res.data[i].picture})`; 
    

    //link to product id  
    let campaignLink = document.querySelector('.campaign-link');
    campaignLink.setAttribute("href", `#id=${res.data[i].product_id}`); 

    // set story
    content_array = res.data[i].story.split(/\r\n/);

    let content = document.querySelector('.content');
    
    content_array.forEach( (item,index) =>{
        let line;

        if (index === 3){
            line = document.createElement('span')
            line.classList.add('content-bot');
        }else{
             line = document.createElement('p');
             line.classList.add('content-line');
             
        }   
        line.textContent = item;    
        content.appendChild(line);
    })    
    // -----------------------------------

    
    let circleBlock = document.querySelector('.circle-block');
    circleBlock.classList.add('circle-block');

    // create circle selector
    campaigns.data.forEach( (item,index) =>{
        let newCircle = document.createElement('div');
        newCircle.classList.add('circle');
        if(index === i){
            newCircle.classList.add('isActive');
        }
        circleBlock.appendChild(newCircle);

        newCircle.addEventListener('click', () =>{
            count = index;
            setCampaignImg(campaigns, count);
        });
    })
}



// 每 10 秒切換圖片
setInterval(function(){
    if(count !== 2){
        count++;
        setCampaignImg(campaigns, count);
    }else{
        count = 0;
        setCampaignImg(campaigns, count);
    }
}, 10000 )

// remove  story
function removeContent(){
    let content = document.querySelector('.content');
    while(content.firstChild){
        content.removeChild(content.firstChild);
    }
}

// remove circle 
function removeCircle(){
    let circleBlock = document.querySelector('.circle-block');
    while(circleBlock.firstChild){
        circleBlock.removeChild(circleBlock.firstChild);
    }
}

// -------------------------------------------------------//







// ----paging scroll -----//
function scroll(){
    let container = document.querySelector('.category');
    let distance  = container.getBoundingClientRect().bottom - window.innerHeight;
    
    if( distance < triggerDistance){

        callAPI(createProduct);
    }
}

window.addEventListener('scroll', scroll);

// ------------------------------------------------------------//



//-----change menu 
function changeProductType(productType){
        let e = event.target;
       
        //remove old product
        removeProduct();

        // active menu add color
        let menuAnchar = document.querySelectorAll('.nav-left .menu a')
        menuAnchar.forEach(a => a.classList.remove('isActive'));
        e.classList.add('isActive');

        //call api\
        stylish.api = "products";
        stylish.productType = productType;
        src= "https://api.appworks-school.tw/api/1.0/" + stylish.api + "/" + stylish.productType;
        callAPI(createProduct);       
}


//移除category
function removeProduct(){
    let category = document.querySelector('.category');
    while(category.firstChild){
        category.removeChild(category.firstChild);
    }
}


//生成category
function createProduct(res){
    let  categoryBlock = document.querySelector('.category');
    let  productLink, productBlock, newTag, productImg, colorDiv, colorBlock, productName, productPrice;
    

    res.data.forEach( (item ,index)=> {

        productLink = document.createElement('a');
        productLink.setAttribute('id', item.id);
        productLink.setAttribute('href', `/product.html?id=${item.id}`);

        // product block
        productBlock = document.createElement('div');
        productBlock.classList.add("category-block");
        

        // new tag
        if(index === 0){
            newTag = document.createElement('div');
            newTag.classList.add("new");
            newTag.textContent = "新品";
            productBlock.appendChild(newTag);
        }

        //product Img
        productImg = document.createElement('img');
        productImg.classList.add("sample");
        productImg.src = item.main_image;

        // product name
        productName = document.createElement('p');
        productName.classList.add("sample-name");
        productName.textContent = item.title;


        // color
        colorDiv = document.createElement('div');
        item.colors.forEach( color => {
            colorBlock = document.createElement('div');
            colorBlock.classList.add("color");
            colorBlock.style.backgroundColor = "#" + color.code;
            if(color.code.toUpperCase() === 'FFFFFF'){
                colorBlock.classList.add("color-border");
            }
            colorDiv.appendChild(colorBlock);
        } )


        // price
        productPrice = document.createElement('p');
        productPrice.classList.add("sample-price");
        productPrice.textContent ='TWD.'+ item.price.toString();
        
        //append child
        productBlock.appendChild(productImg);
        productBlock.appendChild(colorDiv);
        productBlock.appendChild(productName);
        productBlock.appendChild(productPrice);

        productLink.appendChild(productBlock);
        categoryBlock.appendChild(productLink);
    })
}


//------------search ----------------
function search(value){
    
    stylish.productType = "search";
    src= "https://api.appworks-school.tw/api/1.0/" + stylish.api + "/" + stylish.productType + "?keyword=" +value;
 
    
    removeProduct();
    callAPI(createProduct);

    let input = document.querySelector('#search');
    input.value ="";
}


function err_page(){

    removeProduct()

    let  category = document.querySelector('.category');
    let  productBlock = document.createElement('div');;
    productBlock.textContent = "請重新搜尋";
    category.appendChild(productBlock);
}


// ----mobile search ----------//
let mobile_search = document.querySelector('.mobile-search-img');
let mobile_search_input = document.querySelector('.mobile-search-input');

mobile_search.addEventListener('click', () =>{
    mobile_search.classList.add('hidden');
    mobile_search_input.classList.remove('hidden');
    mobile_search_input.focus();
})

mobile_search_input.addEventListener('keypress', (e)=>{
    if(e.key == "Enter"){
        search(mobile_search_input.value);
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

// ----mobile search ----------//





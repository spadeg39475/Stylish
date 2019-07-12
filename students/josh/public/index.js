let productURL = "https://api.appworks-school.tw/api/1.0/products/all";

function create(res){
    let productBlock = document.querySelectorAll('.category-block');
    let  picImg, colorDiv, colorBlock, nameP, priceP;

    
    res.data.forEach( (i ,index)=> {
        picImg = document.createElement('img');
        nameP = document.createElement('p');
        colorDiv = document.createElement('div');
        priceP = document.createElement('p');
    
        console.log(i);
        
        picImg.src = i.images[0];
        nameP.textContent = i.title;
        priceP.textContent ='TWD.'+ i.price.toString();
        for(j=0; j< i.colors.length; j++){
            colorBlock = document.createElement('div');
            colorBlock.classList.add("color");
            colorBlock.style.backgroundColor = "#" + i.colors[j].code;
            colorDiv.appendChild(colorBlock);
        }

        picImg.classList.add("sample");
        nameP.classList.add("sample-name");
        priceP.classList.add("sample-price");

        productBlock[index].appendChild(picImg);
        productBlock[index].appendChild(colorDiv);
        productBlock[index].appendChild(nameP);
        productBlock[index].appendChild(priceP);
    })
    
}

fetch(productURL)
.then((res) => {return res.json()})
.then(create)
.catch(function(err){
    console.log("Fetch错误:"+err);
});
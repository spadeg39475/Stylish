let thankyouURL = new URL(location.href);
const { href, protocol, hostname, pathname, search, searchParams } = thankyouURL;
let params = thankyouURL.searchParams;
for(let pair of params.entries()){
    orderNum = pair[1];
    console.log(orderNum);
}

let test = document.createElement('h2');
test.textContent = orderNum;
let body = document.querySelector('body');
body.appendChild(test);
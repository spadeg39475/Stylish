let thankyouURL = new URL(location.href);
const { href, protocol, hostname, pathname, search, searchParams } = thankyouURL;
let params = thankyouURL.searchParams;
for(let pair of params.entries()){
    orderNum = pair[1];
    console.log(orderNum);
}


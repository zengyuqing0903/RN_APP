import queryString from 'query-string'
let rootUrl = 'https://www.fastmock.site/mock/d62556e52d1f5c0d4c71881c01c91850/api'

let myFetch = {
    get(url,queryParams){
        url = rootUrl+url
        if(queryParams){
            url += "?"+queryString.stringify(queryParams);
            //根链接 
        }
        console.log(url);
        return fetch(url)
                    .then(res=>res.json())
    },
    post(url,body){
        return fetch(rootUrl+url,{
                    method:'POST',
                    headers:{
                        "Accept":'application/json',
                        'Content-Type':'application/json'
                    },
                    body:JSON.stringify(body)
                })
                    .then(res=>res.json())
    }
}

export {myFetch}


  // myFetch.get('/topics',{limit:4,user:'sss'})
        //     .then(res=>console.log(res))
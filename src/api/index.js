const ENDPOINT = 'https://chatapptma.herokuapp.com/';

export default async function fetchApi(path,method,body) {
    let result 
    let options  = {
        method : 'GET',
        headers: { 'Content-Type': 'application/json' },
    }
    if(method == 'post'){
        options.method = 'POST'
        options.body = JSON.stringify(body)
    }
    await fetch(ENDPOINT + path, options)
        .then(res => res.json())
        .then(
            (q) => {
                result = q
            },
            (error) => {
                console.log(error)
                return error
            }
        )
    return result
}
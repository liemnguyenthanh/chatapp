const ENDPOINT = {
    local : 'http://localhost:8080/',
    heroku : 'https://chatapptma.herokuapp.com/',
};
export const api = ENDPOINT.heroku
export default async function fetchApi(path,method,body) {
    let result 
    let options  = {
        method : 'GET',
        headers: { 'Content-Type': 'application/json' },
    }
    if(method === 'post'){
        options.method = 'POST'
        options.body = JSON.stringify(body)
    }
    await fetch(api + path, options)
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
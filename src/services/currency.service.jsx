import APIConfig from "../config/api-config"

export const convert =(amount,from,to)=>{
    let url = APIConfig.convert(amount,from,to);
    console.log(url);
    return fetch(url)   
}
export const fetchSymbols=()=>{
    let url = APIConfig.symbols_URL;
    console.log(url);
    return fetch(url)   
}

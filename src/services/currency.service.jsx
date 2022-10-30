import APIConfig from "../config/api-config"
import environment from "../environments/environment";

var myHeaders = new Headers();
myHeaders.append("apikey", environment.API_KEY);

var requestOptions = {
method: "GET",
redirect: "follow",
headers: myHeaders,
};

export const convert =(amount,from,to)=>{
    let url = APIConfig.convert_URL(amount,from,to);
    console.log(url);
    return fetch(url,requestOptions)   
}
export const  fetchSymbols=()=>{
    let url = APIConfig.symbols_URL;
    console.log(url);
    return fetch(url,requestOptions)
}

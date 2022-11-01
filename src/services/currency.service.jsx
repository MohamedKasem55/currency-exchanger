import APIConfig from "../config/api-config"
import environment from "../environments/environment";
import { chartResult } from "../staticData";

var myHeaders = new Headers();
myHeaders.append("apikey", environment.API_KEY);

var requestOptions = {
method: "GET",
redirect: "follow",
headers: myHeaders,
};

export const convert =(amount,from,to)=>{
    let url = APIConfig.convert_URL(amount,from,to);
    return fetch(url,requestOptions)   
}
export const  fetchSymbols=()=>{
    let url = APIConfig.symbols_URL;
    return fetch(url,requestOptions)
}
export const convertionGridFormation= async ({from,amount})=>{
    let url=gridUrlFormation(from)
    try {
        let response= await fetch(url,requestOptions)
        let result =await response.json()
        return gridMapping(amount,from,result.rates)
    } catch (error) {
        return error
    }

}
const gridMapping=(amount,base,rates)=>{
    let arr=[]
    for (const [to, rate] of Object.entries(rates)) {
        arr.push(`${amount} ${base}= ${Math.trunc(amount*rate*100)/100} ${to}`)
      }
    return arr
}

const gridUrlFormation=(base)=>{
    let arr =['AED','CHF','CNY','EGP','INR','KWD','USD','GBP','JPY']
    let symbols=arr.toString().replaceAll(',','%2C')
    let formattedDate=currentDateFormatter()
    return APIConfig.convertion_currency_URL(base,symbols,formattedDate)
}
export const getChart =async(base,to)=>{
    let startDate=currentDateFormatter(true)
    let endDate=currentDateFormatter()
    let url=APIConfig.timeSeries_URL(startDate,endDate)
    try {
    let response = await fetch(url, requestOptions)
    let result = await response.json()
    let chartDataArr=[]
    if (result)
     {for (const [date, rate] of Object.entries(result['rates'])) {
        let day=new Date(date).getDate()+1
        if(day===26)
        chartDataArr.push({t:date,y:rate[to]})
      }}
      return chartDataArr
    } catch (error) {
        return null
    }
}
const currentDateFormatter = (isStartDate)=>{
    let d = new Date()
    let mm=(d.getMonth())+1;
    let dd = d.getDate()
    let yy= isStartDate? d.getFullYear()-1: d.getFullYear()
    return `${yy}-${mm>9?mm:'0'+mm}-${dd>9?dd:'0'+dd}`;
}


import environment from "../environments/environment"

const APIConfig={
    convert_URL:(amount,from,to)=>`${environment.BASE_API}/convert?to=${to}&from=${from}&amount=${amount}`,
    symbols_URL:`${environment.BASE_API}/symbols`,
    convertion_currency_URL:(base,symbols,date)=>`${environment.BASE_API}/${date}?symbols=${symbols}&base=${base}`,
    timeSeries_URL:(startDate,endDate)=>`${environment.BASE_API}/timeseries?start_date=${startDate}&end_date=${endDate}`
}

export default APIConfig
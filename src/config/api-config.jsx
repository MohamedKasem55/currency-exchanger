import environment from "../environments/environment"

const APIConfig={
    convert_URL:(amount,from,to)=>`${environment.BASE_API}/convert?to=${to}&from=${from}&amount=${amount}`,
    symbols_URL:`${environment.BASE_API}/symbols`
}

export default APIConfig
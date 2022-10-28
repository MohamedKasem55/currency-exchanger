import environment from "../environments/environment"

const APIConfig={
    convert_URL:(amount,from,to)=>`${environment.BASE_API}/convert?access_key=${environment.API_KEY}&from=${from}&to=${to}&amount=${amount}`,
    symbols_URL:`${environment.BASE_API}/symbols?access_key=${environment.API_KEY}`
}

export default APIConfig
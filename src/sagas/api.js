export const fetchingError = "fetching error";
export const cityError = "city error";
export const unknownError = "unknown error";

export async function fetchData(city){
    try{
        let response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city},AU&units=metric&APPID=42905b45c73a2763dd8827a8d802be68`);
        let data;
        if(response.status === 200)
            data = await response.json();
        else if(response.status === 404)
            data = cityError;
        else
            data = unknownError;
        return data;
    }
    catch(e){
        return fetchingError;
    }
}
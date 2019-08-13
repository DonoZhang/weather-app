export const fetchingError = "fetching error";

export async function fetchData(){
    try{
        let response = await fetch('https://api.openweathermap.org/data/2.5/weather?q=Melbourne,AU&units=metric&APPID=42905b45c73a2763dd8827a8d802be68');
        let data = await response.json();
        return data;
    }
    catch(e){
        console.log(e);
        return fetchingError;
    }
}
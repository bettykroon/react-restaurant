import axios from "axios"
import { useEffect } from "react"

export function GetRestaurantService(){
    const id = '624aaeffdf8a9fb11c3ea8b5';

    useEffect(() => {
        axios.get('https://school-restaurant-api.azurewebsites.net/restaurant/'+id)
            .then(response => {console.log(response.data)})
    }, []);

    return <></>
}

export default GetRestaurantService
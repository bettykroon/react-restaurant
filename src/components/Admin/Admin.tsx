import axios from "axios"
import { useEffect } from "react"

export function Admin(){
    useEffect(() => {
        axios.get('https://school-restaurant-api.azurewebsites.net/booking/restaurant/624aaeffdf8a9fb11c3ea8b5')
            .then(response => {
                console.log(response.data);
            })
    }, [])
    return (<></>)
}

export default Admin
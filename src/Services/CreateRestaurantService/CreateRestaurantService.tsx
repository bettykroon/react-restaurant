import axios from "axios";
import { useEffect } from "react"

export function CreateRestaurantService(){

    useEffect(() => {
        //Skapar en restaurang, får tillbaka ett id som används som restaurangId i andra anrop
        axios.post('https://school-restaurant-api.azurewebsites.net/restaurant/create', {name: 'testRestaurang', address: {street: "Storgatan 1", zip: '123 45', city: 'Stockholm'}}, {headers: { 'content-type': 'application/json'}})
            .then(response => {
                console.log(response.data);
                localStorage.setItem('id', response.data);
            })
            .catch(error => {console.log(error);})
    }, []);

    return(<></>)
}

export default CreateRestaurantService
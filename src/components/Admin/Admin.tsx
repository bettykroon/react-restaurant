import axios from "axios"
import { useEffect, useState } from "react"
import { Bookings } from "../../models/Bookings"
import { GetBookingsService } from "../../Services/GetBookingsService/GetBookingsService";

export function Admin(){
    const [ bookings, setBookings ] = useState<Bookings[]>([]);    

    useEffect(() => {
        //Hämtar restaurangens samtliga bokningar, lägger in dom i bookings
        let service = new GetBookingsService();
        service.getBookings().then((bookings) => {
            let dataFromApi = bookings.map((booking: Bookings) => {
                return new Bookings(booking._id, booking.restaurantId, booking.date, booking.time, booking.numberOfGuests, booking.customerId);
            });
            setBookings(dataFromApi);
            console.log(bookings);
        })

        //Hämtar bokningar med restaurangId från skapad restaurang
        /*axios.get<Bookings[]>('https://school-restaurant-api.azurewebsites.net/booking/restaurant/624aaeffdf8a9fb11c3ea8b5')
            .then(response => {
                console.log(response.data);
                let dataFromApi = response.data.map((booking: Bookings) => {
                    return new Bookings(booking._id, booking.restaurantId, booking.date, booking.time, booking.numberOfGuests, booking.customerId);
                });

                //Lägger in bokningarna från API i bookings
                setBookings(dataFromApi);
            })
            .catch(error => {console.log(error);});*/
    }, []);

    //Funktion för att radera/avboka en bokning, genom API delete och skickar med id på bokningen
    function deleteBooking(id: string){
        axios.delete<Bookings>('https://school-restaurant-api.azurewebsites.net/booking/delete/' + id)
            .then(response => {
                //Laddar om sidan för att bokningen ska försvinna
                window.location.reload();
            })
            .catch(error => {console.log(error);});
    }

    //Funktion för att kunna ändra en bokning, ändra antal gäster, tid?
    function changeBooking(id: string){
        //axios.put<Bookings>('https://school-restaurant-api.azurewebsites.net/booking/update/' + id)
    }

    //Skriver ut alla bokningar med map, skapar en avboka knapp samt ändra bokning knapp
    let lis = bookings.map((booking) => {
        return (<li key={booking._id}>
            <h3>Boknings id: {booking._id}</h3>
            <p>Datum: {booking.date}</p>
            <p>Tid: {booking.time}</p>
            <p>Antal gäster: {booking.numberOfGuests}</p>
            <button onClick={() => changeBooking(booking._id)}>Ändra bokning</button>
            <button onClick={() => deleteBooking(booking._id)}>Avboka</button>
        </li>)
    });
    
    return (<>
        <h1>Bokningar</h1>
        <ul>{lis}</ul>
    </>)
}

export default Admin
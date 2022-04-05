import axios from "axios";
import { Bookings } from "../../models/Bookings";

export class GetBookingsService {
    //Hämtar bokningar med valt restaurangId
    async getBookings(){
        let response = await axios.get<Bookings[]>('https://school-restaurant-api.azurewebsites.net/booking/restaurant/624aaeffdf8a9fb11c3ea8b5');

        let bookings = response.data;
        return bookings;
    }
}
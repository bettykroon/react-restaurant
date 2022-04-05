import axios from "axios"
import { ChangeEvent, useState } from "react";
import { Bookings } from "../../models/Bookings";

interface INewBooking {
    restaurantId: string, 
    date: string, 
    time: string, 
    numberOfGuests: number, 
    customer: INewCustomer
}

interface INewCustomer {
    name: string, 
    lastname: string, 
    email: string, 
    phone: string
}

export function Booking(){
    const [ newBooking, setNewBooking ] = useState<INewBooking>({
        restaurantId: '624aaeffdf8a9fb11c3ea8b5', 
        date: '', 
        time: '', 
        numberOfGuests: 0,
        customer: {
            name: '',
            lastname: '',
            email: '',
            phone: ''
        }
    });

    const [ newCustomer, setNewCustomer ] = useState<INewCustomer>({
        name: '',
        lastname: '',
        email: '',
        phone: ''
    });

    const [ bookings, setBookings ] = useState<Bookings[]>([]);

    let earlyDinner: Bookings[] = [];
    let lateDinner: Bookings[] = [];

    function handleChange(e: ChangeEvent<HTMLInputElement>){
        let name: string = e.target.name;
        setNewBooking({...newBooking, [name]: e.target.value});
    }

    function handleCustomer(e: ChangeEvent<HTMLInputElement>){
        let name: string = e.target.name;
        setNewCustomer({...newCustomer, [name]: e.target.value});
    }

    /*function customerToBooking(){
        setNewBooking({...newBooking, customer: newCustomer});
    }

    //FLYTTA TILL reserve() NÄR KLAR
    function testar(){
        customerToBooking();
        console.log("NEW", newBooking);
    }*/

    function handleClick(e: any){
        let name: string = e.target.name;
        setNewBooking({...newBooking, [name]: e.target.value});
    }    

    //Funktion för att hitta lediga tider på valt datum
    function Search(){
        axios.get<Bookings[]>('https://school-restaurant-api.azurewebsites.net/booking/restaurant/624aaeffdf8a9fb11c3ea8b5')
            .then(response => {
                console.log(response.data);
                let dataFromApi = response.data.map((booking: Bookings) => {
                    return new Bookings(booking._id, booking.restaurantId, booking.date, booking.time, booking.numberOfGuests, booking.customerId);
                });
                setBookings(dataFromApi);
            })
            .catch(error => {console.log(error);});

            dinnerEarly();
            dinnerLate();
    }

    function dinnerEarly(){
        for (let i = 0; i < bookings.length; i++) {
            if(newBooking.date === bookings[i].date){
                if(bookings[i].time === "18:00"){
                    earlyDinner.push(bookings[i]);
                    if(earlyDinner.length < 15) {
                        console.log("DET FINNS BORD KL 18");
                    } else {
                        console.log("DET FINNS INTE BORD KL 18");
                    }
                } 
            }
        }
        return (<button name="time" value="18:00" onClick={handleClick}>18:00</button>)
    }

    function dinnerLate(){
        for (let i = 0; i < bookings.length; i++) {
            if(newBooking.date === bookings[i].date){
                if(bookings[i].time === "21:00"){
                    lateDinner.push(bookings[i]);
                    if(lateDinner.length < 15) {
                        console.log("DET FINNS BORD KL 21");
                    } else {
                        console.log("DET FINNS INTE BORD KL 21");
                    }
                } 
            }
        }
    }

    //Funktion för att boka ett bord
    function reserve(){
        setNewBooking({...newBooking, customer: newCustomer});

        axios.post('https://school-restaurant-api.azurewebsites.net/booking/create', newBooking)
            .then(response => {
                console.log(response.data);
            })
            .catch(error => {console.log(error);})
    }

    return (<>
        <form>
            <label htmlFor="numberOfGuests">Antal gäster: </label><br />
            <label htmlFor="numberOfGuests">1: </label>
            <input type="radio" name="numberOfGuests" value={1} onChange={handleChange} required/><br />
            <label htmlFor="numberOfGuests">2: </label>
            <input type="radio" name="numberOfGuests" value={2} onChange={handleChange} /><br />
            <label htmlFor="numberOfGuests">3: </label>
            <input type="radio" name="numberOfGuests" value={3} onChange={handleChange} /><br />
            <label htmlFor="numberOfGuests">4: </label>
            <input type="radio" name="numberOfGuests" value={4} onChange={handleChange} /><br />
            <label htmlFor="numberOfGuests">5: </label>
            <input type="radio" name="numberOfGuests" value={5} onChange={handleChange} /><br />
            <label htmlFor="numberOfGuests">6: </label>
            <input type="radio" name="numberOfGuests" value={6} onChange={handleChange} /><br />

            <label htmlFor="date">Datum: </label>
            <input type="date" name="date" value={newBooking.date} onChange={handleChange} required/><br />
        </form>
        <button onClick={Search}>Sök</button>

        <div>
            <button name="time" value="18:00" onClick={handleClick}>18:00</button>
            <button name="time" value="21:00" onClick={handleClick}>21:00</button>
        </div>

        <form>
            <label htmlFor="name">Förnamn: </label>
            <input type="text" name="name" value={newCustomer.name} onChange={handleCustomer}/><br />
            <label htmlFor="lname">Efternamn: </label>
            <input type="text" name="lastname" value={newCustomer.lastname} onChange={handleCustomer}/><br />
            <label htmlFor="email">E-post: </label>
            <input type="text" name="email" value={newCustomer.email} onChange={handleCustomer}/><br />
            <label htmlFor="phone">Telefonnummer: </label>
            <input type="text" name="phone" value={newCustomer.phone} onChange={handleCustomer}/><br />
        </form>
        <button onClick={reserve}>BOKA</button>
        <button>AVBRYT</button>
    </>)
}

export default Booking
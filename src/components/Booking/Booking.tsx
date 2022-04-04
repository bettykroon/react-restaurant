import axios from "axios"
import { ChangeEvent, useState } from "react";
import { Bookings } from "../../models/Bookings";
import GetRestaurantService from "../../Services/GetRestaurantService/GetRestaurantService";

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

    function handleChange(e: ChangeEvent<HTMLInputElement>){
        let name: string = e.target.name;
        setNewBooking({...newBooking, [name]: e.target.value});
    }

    function handleCustomer(e: ChangeEvent<HTMLInputElement>){
        let name: string = e.target.name;
        setNewCustomer({...newCustomer, [name]: e.target.value});
    }

    function customerToBooking(){
        setNewBooking({...newBooking, customer: newCustomer});
    }

    //FLYTTA TILL book() NÄR KLAR
    function testar(){
        customerToBooking();
        console.log("NEW", newBooking);
    }

    function handleClick(e: any){
        let name: string = e.target.name;
        setNewBooking({...newBooking, [name]: e.target.value});
    }    

    function search(){
        console.log("HEJ");
        //624ac624df8a9fb11c3ea8bd
        //624aca90df8a9fb11c3ea8c0
        axios.get<Bookings[]>('https://school-restaurant-api.azurewebsites.net/booking/restaurant/624aaeffdf8a9fb11c3ea8b5', {headers: { 'content-type': 'application/json'}})
            .then(response => {
                console.log("BOOKING", response.data)
            })
    }

    function book(){
        axios.post('https://school-restaurant-api.azurewebsites.net/booking/create', newBooking)
            .then(response => {
                console.log(response.data);
            })
            .catch(error => {console.log(error);})
    }

    return (<>
        <GetRestaurantService></GetRestaurantService>
        <form name="dateAndTime">
            <label htmlFor="numberOfGuests">Antal gäster: </label>
            <input type="number" name="numberOfGuests" value={newBooking.numberOfGuests} onChange={handleChange} required/><br />
            <label htmlFor="date">Datum: </label>
            <input type="date" name="date" value={newBooking.date} onChange={handleChange} required/><br />
        </form>
        <button onClick={search}>Sök</button>

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
        <button onClick={book}>BOKA</button>
        <button onClick={testar}>TEST</button>
        <button>AVBRYT</button>
    </>)
}

export default Booking
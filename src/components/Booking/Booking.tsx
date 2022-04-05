import axios from "axios"
import { ChangeEvent, useState } from "react";
import { Bookings } from "../../models/Bookings";
import { GetBookingsService } from "../../Services/GetBookingsService/GetBookingsService";

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

    //Hämtar värdet på input fälten i första formuläret och lägger in i newBooking
    function handleChange(e: ChangeEvent<HTMLInputElement>){
        let name: string = e.target.name;
        setNewBooking({...newBooking, [name]: e.target.value});
    }

    //Hämtar värdet på input fälten i sista formuläret och lägger in i newCustomer
    function handleCustomer(e: ChangeEvent<HTMLInputElement>){
        let name: string = e.target.name;
        setNewCustomer({...newCustomer, [name]: e.target.value});
    }

    //Lägger in värdena på newCustomer till newBooking
    function customerToBooking(){
        setNewBooking({...newBooking, customer: newCustomer});
    }

    //FLYTTA TILL reserve() NÄR KLAR
    //testar för att se att värdena blir rätt
    function testar(){
        customerToBooking();
        console.log("NEW", newBooking);
    }

    //Knapparna för vilken tid man vill äta, sparar värdet 18:00 eller 21:00 beroende på vilken man valde och lägger in i newBooking under time
    const [ btnClicked, setBtnClicked ] = useState(false);
    function handleClick(e: any){
        let name: string = e.target.name;
        setNewBooking({...newBooking, [name]: e.target.value});
        setBtnClicked(true);
    }    

    //Funktion för att hitta lediga tider på valt datum
    function search(){
        //Hämtar restaurangens samtliga bokningar
        let service = new GetBookingsService();
        service.getBookings().then((bookings) => {
            let dataFromApi = bookings.map((booking: Bookings) => {
                return new Bookings(booking._id, booking.restaurantId, booking.date, booking.time, booking.numberOfGuests, booking.customerId);
            });
            setBookings(dataFromApi);
            //console.log("hej", bookings);
            dinnerEarly();
            dinnerLate();
        })
        /*axios.get<Bookings[]>('https://school-restaurant-api.azurewebsites.net/booking/restaurant/624aaeffdf8a9fb11c3ea8b5')
            .then(response => {
                console.log(response.data);
                let dataFromApi = response.data.map((booking: Bookings) => {
                    return new Bookings(booking._id, booking.restaurantId, booking.date, booking.time, booking.numberOfGuests, booking.customerId);
                });
                setBookings(dataFromApi);

                dinnerEarly();
                dinnerLate();
            })
            .catch(error => {console.log(error);});*/
    }

    let earlyDinner: Bookings[] = [];
    let lateDinner: Bookings[] = [];

    //Funktion för att se om det finns lediga tider kl 18:00
    const [ eatEarly, setEatEarly ] = useState(false);
    function dinnerEarly(){
        //Går igenom alla bokningar för restaurangen
        for (let i = 0; i < bookings.length; i++) {
            //Kollar om användarens datum matchar med någon/några av restaurangens bokningar
            if(newBooking.date === bookings[i].date){
                //Kollar hur många av dessa datum som har tiden 18:00
                if(bookings[i].time === "18:00"){
                    //Lägger in dessa bokningar i en ny array
                    earlyDinner.push(bookings[i]);
                    //Om arrayen är mindre än 15 betyder det att det finns minst 1 bord ledigt den tiden
                    if(earlyDinner.length < 15) {
                        console.log("DET FINNS BORD KL 18");
                        setEatEarly(true);
                    } else {
                        console.log("DET FINNS INTE BORD KL 18");
                        setEatEarly(false);
                    }
                } 
            } else {
                setEatEarly(true);
            }
        }
    }

    //Funktion för att kolla om det finns lediga tider kl 21:00, samma som dinnerEarly() fast 21:00
    const [ eatLate, setEatLate ] = useState(false);
    function dinnerLate(){
        for (let i = 0; i < bookings.length; i++) {
            if(newBooking.date === bookings[i].date){
                if(bookings[i].time === "21:00"){
                    lateDinner.push(bookings[i]);
                    if(lateDinner.length < 15) {
                        console.log("DET FINNS BORD KL 21");
                        setEatLate(true);
                    } else {
                        console.log("DET FINNS INTE BORD KL 21");
                        setEatLate(false);
                    }
                } 
            } else {
                setEatLate(true);
            }
        }
    }

    //Funktion för att boka ett bord
    function reserve(){
        //setNewBooking({...newBooking, customer: newCustomer});

        //Skickar newBooking till API och en bokning lagras i DB
        axios.post('https://school-restaurant-api.azurewebsites.net/booking/create', newBooking)
            .then(response => {
                console.log(response.data);
            })
            .catch(error => {console.log(error);})
    }

    return (<>
        {!eatEarly && !eatLate && <div>
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
            <button onClick={search}>Sök</button>
        </div>}

        <div>
            {eatEarly && !btnClicked && <button name="time" value="18:00" onClick={handleClick}>18:00</button>}
            {eatLate && !btnClicked && <button name="time" value="21:00" onClick={handleClick}>21:00</button>}
            {eatEarly && eatLate && !btnClicked &&<button onClick={() => {window.location.reload()}}>AVBRYT</button>}
        </div>

        {<p>Tyvärr fullbokat prova ett annat datum..</p>}

        {btnClicked && <div>
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
            <button onClick={() => {window.location.reload()}}>AVBRYT</button>
            <button onClick={testar}>Testar</button>
        </div>}
    </>)
}

export default Booking
import axios from "axios"
import { ChangeEvent, useState } from "react";
import { Bookings } from "../../models/Bookings";
import { INewBooking } from "../../models/INewBooking";
import { INewCustomer } from "../../models/INewCustomer";
import { GetBookingsService } from "../../Services/GetBookingsService/GetBookingsService";
import { Button, CancelButton } from "../Styled/Button";
import "./Booking.scss";

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
        reserve();
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
                        return;
                    }
                } 
            } else if(bookings[i].time === "18:00") {
                setEatEarly(true);
                console.log("FINNS 18");
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
                        return;
                    }
                } 
            } else if(bookings[i].time === "21:00") {
                setEatLate(true);
                console.log("FINNS 21");
            }
        }
    }

    //Funktion för att boka ett bord
    function reserve(){
        //setNewBooking({...newBooking, customer: newCustomer});
        console.log(newBooking);

        //Skickar newBooking till API och en bokning lagras i DB
        axios.post('https://school-restaurant-api.azurewebsites.net/booking/create', newBooking)
            .then(response => {
                console.log(response.data);
            })
            .catch(error => {console.log(error);})
    }

    function createCustomer(){
        axios.post('https://school-restaurant-api.azurewebsites.net/customer/create', newCustomer)
            .then(response => {
                console.log(response.data);
                console.log(newCustomer);
                customerToBooking();
            })
            .catch(error => {console.log(error);})
    }

    return (<>
        {!eatEarly && !eatLate && <div className="form">
            <form>
                <h3>Antal gäster:</h3>
                <label htmlFor="numberOfGuests">1: </label>
                <input type="radio" name="numberOfGuests" value={1} onChange={handleChange} required/>
                <label htmlFor="numberOfGuests">2: </label>
                <input type="radio" name="numberOfGuests" value={2} onChange={handleChange} />
                <label htmlFor="numberOfGuests">3: </label>
                <input type="radio" name="numberOfGuests" value={3} onChange={handleChange} />
                <label htmlFor="numberOfGuests">4: </label>
                <input type="radio" name="numberOfGuests" value={4} onChange={handleChange} />
                <label htmlFor="numberOfGuests">5: </label>
                <input type="radio" name="numberOfGuests" value={5} onChange={handleChange} />
                <label htmlFor="numberOfGuests">6: </label>
                <input type="radio" name="numberOfGuests" value={6} onChange={handleChange} />

                {/*<select name="numberOfGuests">
                    <option value={1}>1</option>
                    <option value={2}>2</option>
                    <option value={3}>3</option>
                    <option value={4}>4</option>
                    <option value={5}>5</option>
                    <option value={6}>6</option>
                </select>*/}

                <h3>Datum:</h3>
                <input type="date" name="date" value={newBooking.date} onChange={handleChange} required/><br />
            </form>
            <div className="searchBtn">
                <Button onClick={search}>Sök</Button>
            </div>
        </div>}

        <div className="form">
            {eatEarly && !btnClicked && <Button name="time" value="18:00" onClick={handleClick}>18:00</Button>}
            {eatLate && !btnClicked && <Button name="time" value="21:00" onClick={handleClick}>21:00</Button>}
            {(eatEarly || eatLate) && !btnClicked && <CancelButton onClick={() => {window.location.reload()}}>AVBRYT</CancelButton>}
        </div>

        {<p>Tyvärr fullbokat prova ett annat datum..</p>}

        {btnClicked && <div className="form">
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
            <Button onClick={createCustomer}>BOKA</Button>
            <CancelButton onClick={() => {window.location.reload()}}>AVBRYT</CancelButton>
        </div>}
    </>)
}

export default Booking
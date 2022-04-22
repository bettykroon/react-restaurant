import axios from "axios"
import { ChangeEvent, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Bookings } from "../../models/Bookings";
import { INewBooking } from "../../models/INewBooking";
import { INewCustomer } from "../../models/INewCustomer";
import { GetBookingsService } from "../../Services/GetBookingsService/GetBookingsService";
import { Button, CancelButton } from "../Styled/Button";
import "./Booking.scss";

export function Booking(){
    const {register, formState: {errors}} = useForm({
        defaultValues: {
            name: ""
        }
    });

    const [ newBooking, setNewBooking ] = useState<INewBooking>({
        restaurantId: '624aaeffdf8a9fb11c3ea8b5', 
        date: '', 
        time: '', 
        numberOfGuests: 0,
        customer: {
            name: '',
            lastname: '',
            email: '',
            phone: '',
            id: ''
        }
    });

    const [ newCustomer, setNewCustomer ] = useState<INewCustomer>({
        name: '',
        lastname: '',
        email: '',
        phone: '',
        id: ''
    });

    const [ bookings, setBookings ] = useState<Bookings[]>([]);

    const [ gdpr, setGdpr ] = useState(false); 

    useEffect(() => {
        //Hämtar restaurangens samtliga bokningar
        let service = new GetBookingsService();
        service.getBookings().then((bookings) => {
            let dataFromApi = bookings.map((booking: Bookings) => {
                return new Bookings(booking._id, booking.restaurantId, booking.date, booking.time, booking.numberOfGuests, booking.customerId);
            });
            setBookings(dataFromApi);
        })

        //Om vi inte vill använda async await
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
    }, [])

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
        setSearchBtnClicked(false);
    }    

    //Funktion för att hitta lediga tider på valt datum
    const [ searchBtnClicked, setSearchBtnClicked ] = useState(false);
    function search(){
        if(bookings.length !== 0){
            console.log("if");
            dinnerEarly();
            dinnerLate();
        } else {
            console.log("else");
            setEatEarly(true);
            setEatLate(true);
        }
        setSearchBtnClicked(true);
        console.log("DATUM", newBooking.date.length);
    }

    let earlyDinner: Bookings[] = [];
    let lateDinner: Bookings[] = [];

    //Funktion för att se om det finns lediga tider kl 18:00
    const [ eatEarly, setEatEarly ] = useState(false);
    function dinnerEarly(){  
        //Går igenom alla bokningar för restaurangen
        for (let i = 0; i < bookings.length; i++) {
            console.log("1", i);
            //Kollar om användarens datum matchar med någon/några av restaurangens bokningar
            if(newBooking.date === bookings[i].date){
                //Kollar hur många av dessa datum som har tiden 18:00
                if(bookings[i].time === "18:00"){
                    //Lägger in dessa bokningar i en ny array
                    earlyDinner.push(bookings[i]);
                    //Om arrayen är mindre än 15 betyder det att det finns minst 1 bord ledigt den tiden
                    if(earlyDinner.length < 3) {
                        console.log("DET FINNS BORD KL 18");
                        setEatEarly(true);
                    } else {
                        console.log("DET FINNS INTE BORD KL 18");
                        setEatEarly(false);
                        return;
                    }
                } else {
                    setEatEarly(true);
                }
            } else if(bookings[i].time === "18:00") {
                setEatEarly(true);
                console.log("FINNS 18");
            } else {
                setEatEarly(true);
                console.log("WHAT");
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
                    if(lateDinner.length < 3) {
                        console.log("DET FINNS BORD KL 21");
                        setEatLate(true);
                    } else {
                        console.log("DET FINNS INTE BORD KL 21");
                        setEatLate(false);
                    }
                } else {
                    setEatLate(true);
                } 
            } else if(bookings[i].time === "21:00") {
                setEatLate(true);
                console.log("FINNS 21");
            } else {
                console.log("hej booking", bookings[i].date);
                setEatLate(true);
                console.log("HALLÅ");
            }
        }
    }

    //Funktion för att boka ett bord
    const [ reserveBtnClicked, setReserveBtnClicked ] = useState(false);
    function reserve(){
        //Skickar newBooking till API och en bokning lagras i DB
        axios.post('https://school-restaurant-api.azurewebsites.net/booking/create', newBooking)
            .then(response => {
                console.log(response.data);
            })
            .catch(error => {console.log(error);})

        setReserveBtnClicked(true);
    }

    function acceptGDPR(){
        setGdpr(true); 

        axios.post('https://school-restaurant-api.azurewebsites.net/customer/create', newCustomer)
            .then(response => {
                console.log(response.data);
                setNewCustomer({...newCustomer , id: response.data})
            })
            .catch(error => {console.log(error);})
            setNewBooking({...newBooking, customer: newCustomer});
    }

    /*function createCustomer(){
        axios.post('https://school-restaurant-api.azurewebsites.net/customer/create', newCustomer)
            .then(response => {
                console.log(response.data);
                console.log(newCustomer);
                customerToBooking();
            })
            .catch(error => {console.log(error);})
    }*/

    return (<>
        {!eatEarly && !eatLate && <div className="form">
            <form>
                <h3>Antal gäster:</h3>
                <label htmlFor="numberOfGuests">1: </label>
                <input type="radio" name="numberOfGuests" value={1} onChange={handleChange}/>
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

                {newBooking.numberOfGuests === 0 && <p>Du måste ange antal gäster..</p>}

                <h3>Datum:</h3>
                <input type="date" name="date" value={newBooking.date} onChange={handleChange} required/><br />
                {newBooking.date.length === 0 && <p>Du måste välja ett datum..</p>}
            </form>
            <div className="searchBtn">
                {newBooking.date.length > 0 && newBooking.numberOfGuests > 0 && <Button onClick={search}>Sök</Button>}
            </div>
        </div>}

        {searchBtnClicked && <div className="form">
            {eatEarly && !btnClicked && <Button name="time" value="18:00" onClick={handleClick}>18:00</Button>}
            {eatLate && !btnClicked && <Button name="time" value="21:00" onClick={handleClick}>21:00</Button>}
            {(eatEarly || eatLate) && !btnClicked && <CancelButton onClick={() => {window.location.reload()}}>AVBRYT</CancelButton>}
        </div>}

        {searchBtnClicked && (!eatEarly && !eatLate) && <p className="sorry">Tyvärr fullbokat prova ett annat datum..</p>}

        {btnClicked && !reserveBtnClicked && <div className="form">
            <form>
                <label htmlFor="name">Förnamn: </label>
                <input {...register("name", {required: "Måste ange förnamn"})} type="text" name="name" value={newCustomer.name} onChange={handleCustomer} required/><br />
                {errors.name?.message}

                {newCustomer.name.length === 0 && <p>Du måste ange förnamn</p>}
                <label htmlFor="lname">Efternamn: </label>
                <input type="text" name="lastname" value={newCustomer.lastname} onChange={handleCustomer} required/><br />
                {newCustomer.lastname.length === 0 && <p>Du måste ange efternamn</p>}
                <label htmlFor="email">E-post: </label>
                <input type="text" name="email" value={newCustomer.email} onChange={handleCustomer} required/><br />
                {newCustomer.email.length === 0 && <p>Du måste ange epost</p>}
                <label htmlFor="phone">Telefonnummer: </label>
                <input type="text" name="phone" value={newCustomer.phone} onChange={handleCustomer} required/><br />
                {newCustomer.phone.length === 0 && <p>Du måste ange telefonnummer</p>}
            </form>
            {newCustomer.name.length > 0 && newCustomer.lastname.length > 0 && newCustomer.email.length > 0 && newCustomer.phone.length > 0 && !gdpr && <div> 
                <p>GDPR bla bla bla</p>
                <Button onClick={acceptGDPR}>Godkänn</Button>
            </div>}
            {<Button onClick={customerToBooking}>BOKA</Button>}
            <CancelButton onClick={() => {window.location.reload()}}>AVBRYT</CancelButton>
        </div>}

        {reserveBtnClicked && <div className="thanks">
            <h3>Tack för din bokning!</h3>
        </div>}
    </>)
}

export default Booking
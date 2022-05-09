import axios from "axios"
import { ChangeEvent, useEffect, useState } from "react";
import { Bookings } from "../../models/Bookings";
import { INewBooking } from "../../models/INewBooking";
import { INewCustomer } from "../../models/INewCustomer";
import { GetBookingsService } from "../../Services/GetBookingsService/GetBookingsService";
import { Button, CancelButton } from "../Styled/Button";
import { H1 } from "../Styled/Headings";
import { HeaderDiv, IMG } from "../Styled/Nav";
import { SelectGuests } from "./SelectGuests";
import homeImg from '../../images/header.jpeg';
import { Section } from "../Styled/Section";
import { Form, Input, Label, Select } from "../Styled/Form";

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
    }, []);

    //Hämtar värdet på input fälten i första formuläret och lägger in i newBooking
    function handleChange(e: ChangeEvent<HTMLInputElement | HTMLSelectElement>){
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

    //Knapparna för vilken tid man vill äta, sparar värdet 12:00 eller 13:00 beroende på vilken man valde och lägger in i newBooking under time
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
    }

    let earlyDinner: Bookings[] = [];
    let lateDinner: Bookings[] = [];
    let totalGuests = 0;
    let chairsLeft = 0;

    //Funktion för att se om det finns lediga tider kl 12:00
    const [ eatEarly, setEatEarly ] = useState(false);
    function dinnerEarly(){  
        //Går igenom alla bokningar för restaurangen
        for (let i = 0; i < bookings.length; i++) {
            //Kollar om användarens datum matchar med någon/några av restaurangens bokningar
            if(newBooking.date === bookings[i].date){
                //Kollar hur många av dessa datum som har tiden 12:00
                if(bookings[i].time === "12:00"){
                    //Lägger in dessa bokningar i en ny array
                    earlyDinner.push(bookings[i]);
                    totalGuests += bookings[i].numberOfGuests;
                    chairsLeft = 90 - totalGuests;
                    //Om arrayen är mindre än 15 betyder det att det finns minst 1 bord ledigt den tiden
                    if(earlyDinner.length < 3 && (newBooking.numberOfGuests <= chairsLeft)){
                        console.log("DET FINNS BORD KL 12");
                        setEatEarly(true);
                    } else {
                        console.log("DET FINNS INTE BORD KL 12");
                        setEatEarly(false);
                        return;
                    }
                } else {
                    setEatEarly(true);
                }
            } else if(bookings[i].time === "12:00") {
                setEatEarly(true);
                console.log("FINNS 12");
            } else {
                setEatEarly(true);
                console.log("WHAT");
            }
        }
    }

    //Funktion för att kolla om det finns lediga tider kl 13:00, samma som dinnerEarly() fast 13:00
    const [ eatLate, setEatLate ] = useState(false);
    function dinnerLate(){
        for (let i = 0; i < bookings.length; i++) {
            if(newBooking.date === bookings[i].date){
                if(bookings[i].time === "13:00"){
                    lateDinner.push(bookings[i]);
                    totalGuests += bookings[i].numberOfGuests;
                    chairsLeft = 90 - totalGuests;
                    if(lateDinner.length < 3 && (newBooking.numberOfGuests <= chairsLeft)){
                        console.log("DET FINNS BORD KL 13");
                        setEatLate(true);
                    } else {
                        console.log("DET FINNS INTE BORD KL 13");
                        setEatLate(false);
                        return;
                    }
                } else {
                    setEatLate(true);
                } 
            } else if(bookings[i].time === "13:00") {
                setEatLate(true);
                console.log("FINNS 13");
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

    const [ bigCompany, setBigCompany ] = useState(false);
    function biggerCompany(){
        setBigCompany(true);
    }
    
    console.log("E", eatEarly);
    console.log("L", eatLate);
    
    
    return (<>
        <HeaderDiv>
            <IMG src={homeImg}></IMG>
            <H1>Boka bord</H1>
        </HeaderDiv>
        
        {!eatEarly && !eatLate && !bigCompany && <Section>
            <form>
                <h3>Antal gäster:</h3>
                <Select name="numberOfGuests" onChange={handleChange}>
                    <option value={0}>0</option>
                    <option value={1}>1</option>
                    <option value={2}>2</option>
                    <option value={3}>3</option>
                    <option value={4}>4</option>
                    <option value={5}>5</option>
                    <option value={6}>6</option>
                </Select>

                {/*newBooking.numberOfGuests === 0 && <p>Du måste ange antal gäster..</p>*/}

                <p>Större sällskap?<Button onClick={biggerCompany}>Klicka här!</Button></p>

                <h3>Datum:</h3>
                <Input type="date" name="date" value={newBooking.date} onChange={handleChange} required/><br />
                {/*newBooking.date.length === 0 && <p>Du måste välja ett datum..</p>*/}
            </form>
            <div className="searchBtn">
                {newBooking.date.length > 0 && newBooking.numberOfGuests > 0 && <Button onClick={search}>Sök</Button>}
            </div>
        </Section>}

        {bigCompany && !eatEarly && !eatLate && <Section>
            <form>
                <h3>Antal gäster:</h3>
                <Select name="numberOfGuests" onChange={handleChange}><SelectGuests/></Select>   

                <h3>Datum:</h3>
                <Input type="date" name="date" value={newBooking.date} onChange={handleChange} required/><br />
                {/*newBooking.date.length === 0 && <p>Du måste välja ett datum..</p>*/}
            </form> 
            <div className="searchBtn">
                {newBooking.date.length > 0 && newBooking.numberOfGuests > 0 && <Button onClick={search}>Sök</Button>}
            </div>
        </Section>}

        {searchBtnClicked && (eatEarly || eatLate) && <Section>
            {eatEarly && !btnClicked && <Button name="time" value="12:00" onClick={handleClick}>12:00</Button>}
            {eatLate && !btnClicked && <Button name="time" value="13:00" onClick={handleClick}>13:00</Button>}
            {(eatEarly || eatLate) && !btnClicked && <CancelButton onClick={() => {window.location.reload()}}>AVBRYT</CancelButton>}
        </Section>}

        {searchBtnClicked && (!eatEarly && !eatLate) && <Section>Tyvärr fullbokat prova ett annat datum..!</Section>}

        {btnClicked && !reserveBtnClicked && <Section>
            <Form>
                <Label htmlFor="name">*Förnamn: </Label> <br />
                <Input type="text" name="name" value={newCustomer.name} onChange={handleCustomer} required/><br />
                {/*newCustomer.name.length === 0 && <p>Du måste ange förnamn</p>*/}
                <Label htmlFor="lname">*Efternamn: </Label> <br />
                <Input type="text" name="lastname" value={newCustomer.lastname} onChange={handleCustomer} required/><br />
                {/*newCustomer.lastname.length === 0 && <p>Du måste ange efternamn</p>*/}
                <Label htmlFor="email">*E-post: </Label> <br />
                <Input type="text" name="email" value={newCustomer.email} onChange={handleCustomer} required/><br />
                {/*newCustomer.email.length === 0 && <p>Du måste ange epost</p>*/}
                <Label htmlFor="phone">*Telefonnummer: </Label> <br />
                <Input type="text" name="phone" value={newCustomer.phone} onChange={handleCustomer} required/><br />
                {/*newCustomer.phone.length === 0 && <p>Du måste ange telefonnummer</p>*/}
            </Form>
            {newCustomer.name.length > 0 && newCustomer.lastname.length > 0 && newCustomer.email.length > 0 && newCustomer.phone.length > 0 && !gdpr && <div> 
                <p>GDPR bla bla bla</p>
                <Button onClick={acceptGDPR}>Godkänn</Button>
            </div>}
            {<Button disabled={!gdpr} onClick={customerToBooking}>BOKA</Button>}
            <CancelButton onClick={() => {window.location.reload()}}>AVBRYT</CancelButton>
        </Section>}

        {reserveBtnClicked && <Section>
            <h3>Tack för din bokning!</h3>
        </Section>}
    </>)
}

export default Booking
import axios from "axios"
import { ChangeEvent, useEffect, useState } from "react"
import { Bookings } from "../../models/Bookings"
import { Customer } from "../../models/Customer";
import { GetBookingsService } from "../../Services/GetBookingsService/GetBookingsService";
import { SelectGuests } from "../Booking/SelectGuests";
import { Button, CancelButton } from "../Styled/Button";
import { H2 } from "../Styled/Headings";
import { AdminSection, LI, UL } from "../Styled/Section";
import { Input, Select } from "../Styled/Form";

export function Admin(){
    const [ bookings, setBookings ] = useState<Bookings[]>([]);   

    const [ updateBooking, setUpdateBooking ] = useState<Bookings>({
        _id: '', 
        restaurantId: '', 
        date: '', 
        time: '', 
        numberOfGuests: 0, 
        customerId: ''
    });

    const [ customers, setCustomers ] = useState<Customer[]>([]);
    
    useEffect(() => {
        //Hämtar restaurangens samtliga bokningar, lägger in dom i bookings
        let service = new GetBookingsService();
        service.getBookings().then((bookings) => {
            let dataFromApi = bookings.map((booking: Bookings) => {
                return new Bookings(booking._id, booking.restaurantId, booking.date, booking.time, booking.numberOfGuests, booking.customerId);
            });
            setBookings(dataFromApi);
            //console.log(bookings);
        })
    }, []);

    //Funktion för att radera/avboka en bokning, genom API delete och skickar med id på bokningen
    function deleteBooking(id: string){
        axios.delete<Bookings>('https://school-restaurant-api.azurewebsites.net/booking/delete/' + id)
            .then(response => {
                console.log(response.data);
                //Laddar om sidan för att bokningen ska försvinna
                window.location.reload();
            })
            .catch(error => {console.log(error);});
    }

    const [ bookingGuests, setBookingGuests ] = useState(0);
    const [ changeBtnClicked, setChangeBtnClicked ] = useState(false);
    function showForm(id: string, custId: string, guests: number){
        setChangeBtnClicked(true);
        setBookingGuests(guests);

        getCustomer(custId);

        axios.get<Bookings[]>('https://school-restaurant-api.azurewebsites.net/booking/' + id)
            .then(response => {
                console.log("GET",response.data);
                let dataFromApi = response.data.map((booking: Bookings) => {
                    return new Bookings(booking._id, booking.restaurantId, booking.date, booking.time, booking.numberOfGuests, booking.customerId);
                })
                setUpdateBooking(dataFromApi[0]);
            })
    }

    const [ searchBtnClicked, setSearchBtnClicked ] = useState(false);
    function search(){
        if(bookings.length !== 0){
            dinnerEarly();
            dinnerLate();
        } else {
            setEatEarly(true);
            setEatLate(true);
        }
        setSearchBtnClicked(true);
    }

    let earlyDinner: Bookings[] = [];
    let lateDinner: Bookings[] = [];
    let totalGuestsEarly = 0;
    let totalGuestsLate = 0;
    let chairsLeftEarly = 0;
    let chairsLeftLate = 0;

    //Funktion för att se om det finns lediga tider kl 12:00
    const [ eatEarly, setEatEarly ] = useState(false);
    function dinnerEarly(){  
        //Går igenom alla bokningar för restaurangen
        for (let i = 0; i < bookings.length; i++) {
            //Kollar om användarens datum matchar med någon/några av restaurangens bokningar
            if(updateBooking.date === bookings[i].date){
                //Kollar hur många av dessa datum som har tiden 12:00
                if(bookings[i].time === "12:00"){
                    //Lägger in dessa bokningar i en ny array
                    earlyDinner.push(bookings[i]);
                    totalGuestsEarly += Number(bookings[i].numberOfGuests);
                    console.log("TGE", totalGuestsEarly);
                    //totalGuests -= updateBooking.numberOfGuests;
                    chairsLeftEarly = 90 - totalGuestsEarly;
                    console.log("CLE", (chairsLeftEarly + Number(bookingGuests)));
                    //Om arrayen är mindre än 15 betyder det att det finns minst 1 bord ledigt den tiden
                    if(chairsLeftEarly === 0){
                        setEatEarly(false);
                        return;
                    }else if(chairsLeftEarly > 0){
                        if((updateBooking.numberOfGuests <= (chairsLeftEarly + Number(bookingGuests)))){
                            console.log("DET FINNS BORD KL 12");
                            setEatEarly(true);
                        } else {
                            console.log("DET FINNS INTE BORD KL 12");
                            setEatEarly(false);
                            return;
                        }
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
            console.log("U",updateBooking.date);
            console.log("I", bookings[i].date);
            
            
            if(updateBooking.date === bookings[i].date){
                if(bookings[i].time === "13:00"){
                    lateDinner.push(bookings[i]);
                    totalGuestsLate += Number(bookings[i].numberOfGuests);
                    chairsLeftLate = 90 - totalGuestsLate;
                    console.log("CLL", chairsLeftLate);
                    
                    if(chairsLeftLate === 0){
                        setEatLate(false);
                        return;
                    } else if(chairsLeftLate > 0){
                        if((updateBooking.numberOfGuests <= (chairsLeftLate + Number(bookingGuests)))){
                            console.log("DET FINNS BORD KL 13");
                            setEatLate(true);
                        } else {
                            console.log("DET FINNS INTE BORD KL 13");
                            setEatLate(false);
                            return;
                        }
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

    function getCustomer(id: string){        
            axios.get<Customer[]>('https://school-restaurant-api.azurewebsites.net/customer/' + id)
            .then(response => {
                
                let dataFromApi = response.data.map((customer: Customer) => {
                    return new Customer(customer.name, customer.lastname, customer.email, customer.phone, customer.id);
                })
                setCustomers(dataFromApi)
            })      
    }

    //Funktion för att kunna ändra en bokning
    function changeBooking(id: string, ){
        axios.put<Bookings>('https://school-restaurant-api.azurewebsites.net/booking/update/' + id, 
        {
            id: id,
            restaurantId: updateBooking.restaurantId,
            date: updateBooking.date,
            time: updateBooking.time,
            numberOfGuests: updateBooking.numberOfGuests,
            customerId: updateBooking.customerId
        })
            .then(response => {
                console.log(response.data);
            })
            .catch(error => {console.log(error);})
    }

    console.log("HEJ", updateBooking);
    

    function handleChange(e: ChangeEvent<HTMLInputElement | HTMLSelectElement>){
        let name = e.target.name;
        setUpdateBooking({...updateBooking, [name]: e.target.value});
    }

    function handleClick(e: any){
        let name: string = e.target.name;
        setUpdateBooking({...updateBooking, [name]: e.target.value});
    }

    //Skriver ut alla bokningar med map, skapar en avboka knapp samt ändra bokning knapp
    let lis = bookings
        .sort((a,b) => parseInt(a.date[2] + a.date[3] + a.date[5] + a.date[6] + a.date[8] + a.date[9]) - parseInt(b.date[2] + b.date[3] + b.date[5] + b.date[6] + b.date[8] + b.date[9]))
        .map((booking) => {
            return (<LI key={booking._id}>
                <h3>Boknings id: {booking._id}</h3>
                <h5>Customer id: {booking.customerId}</h5>
                <p>Datum: {booking.date}</p>
                <p>Tid: {booking.time}</p>
                <p>Antal gäster: {booking.numberOfGuests}</p>

                {/*<Button onClick={() => showDetails(booking.customerId)}>Visa mer</Button>*/}

                {!changeBtnClicked && <Button onClick={() => showForm(booking._id, booking.customerId, booking.numberOfGuests)}>Ändra bokning</Button>}
                
                {!changeBtnClicked && <CancelButton onClick={() => deleteBooking(booking._id)}>Avboka</CancelButton>}
            </LI>)
    });
    
    return (<>
        
        {!changeBtnClicked && <AdminSection>
            <H2>~ Bokningar ~</H2>
            {bookings.length > 0 ? 
                <UL>
                    {lis}
                </UL> 
                : <p>Det finns tyvärr inga bokningar..</p>}
        </AdminSection>}
        {changeBtnClicked &&<><AdminSection>
                <form>
                    {customers.length > 0 && <>
                    <p>ID: {updateBooking._id}</p>
                    <p>Namn: {customers[0].name} {customers[0].lastname}</p>
                    <p>Epost: {customers[0].email}</p>
                    <p>Telefon: {customers[0].phone}</p></>}

                    {!searchBtnClicked && <>
                    <h3>Antal gäster:</h3>
                    <Select name="numberOfGuests" onChange={handleChange}>
                        <SelectGuests/>
                    </Select>

                    <h3>Datum:</h3>
                    <Input type="date" name="date" value={updateBooking.date} onChange={handleChange} required/><br />

                    <Button onClick={search} type="button">Sök</Button></>}

                    {searchBtnClicked && <><h3>Tid: </h3>
                        {eatEarly && <Button name="time" value="12:00" onClick={handleClick} type="button">12:00</Button>}
                        {eatLate && <Button name="time" value="13:00" onClick={handleClick} type="button">13:00</Button>}
                    </>}
                    <br />
                    {(eatLate || eatEarly) && <Button onClick={() => changeBooking(updateBooking._id)} type="button">Ändra bokning</Button>}
                    {!eatLate && !eatEarly && searchBtnClicked && <p>Tyvärr fullbokat, prova ett annat datum eller mindre antal gäster</p>}
                </form>
            </AdminSection> 
        </>}
    </>)
}

export default Admin
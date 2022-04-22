import axios from "axios"
import { ChangeEvent, useEffect, useState } from "react"
import { Bookings } from "../../models/Bookings"
import { Customer } from "../../models/Customer";
import { GetBookingsService } from "../../Services/GetBookingsService/GetBookingsService";
import { Button, CancelButton } from "../Styled/Button";
import "./Admin.scss";

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
            console.log(bookings);
        })
        /*if( bookings.length > 0) return;
        //Hämtar bokningar med restaurangId från skapad restaurang
        axios.get<Bookings[]>('https://school-restaurant-api.azurewebsites.net/booking/restaurant/624aaeffdf8a9fb11c3ea8b5')
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
                console.log(response.data);
                //Laddar om sidan för att bokningen ska försvinna
                window.location.reload();
            })
            .catch(error => {console.log(error);});
    }

    const [ changeBtnClicked, setChangeBtnClicked ] = useState(false);
    function showForm(id: string, custId: string){
        setChangeBtnClicked(true);

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

    function getCustomer(id: string){        
            axios.get<Customer[]>('https://school-restaurant-api.azurewebsites.net/customer/' + id)
            .then(response => {
                
                let dataFromApi = response.data.map((customer: Customer) => {
                    return new Customer(customer.name, customer.lastname, customer.email, customer.phone, customer.id);
                })
                setCustomers(dataFromApi)
            })      
    }

    console.log("C",customers);

    //Funktion för att kunna ändra en bokning
    function changeBooking(id: string){
        axios.put<Bookings>('https://school-restaurant-api.azurewebsites.net/booking/update/' + id, {numberOfGuests: updateBooking.numberOfGuests})
            .then(response => {
                console.log(response.data);
            })
            .catch(error => {console.log(error);})
    }

    function handleChange(e: ChangeEvent<HTMLInputElement>){
        let name: string = e.target.name;
        setUpdateBooking({...updateBooking, [name]: e.target.value});
    }

    let cust = customers.map((customer) => {
        return (<li key={customer.id}>
            <p>{customer.name}</p>
        </li>)
    })

    const [ id, setId ] = useState('');
    function showDetails(id: string){
        console.log(id);
        setId(id);

        axios.get<Customer[]>('https://school-restaurant-api.azurewebsites.net/customer/' + id)
            .then(response => {
                
                let dataFromApi = response.data.map((customer: Customer) => {
                    return new Customer(customer.name, customer.lastname, customer.email, customer.phone, customer.id);
                })
                setCustomers(dataFromApi)
            })
    }

    //Skriver ut alla bokningar med map, skapar en avboka knapp samt ändra bokning knapp
    let lis = bookings
        .sort((a,b) => parseInt(a.date[2] + a.date[3] + a.date[5] + a.date[6] + a.date[8] + a.date[9]) - parseInt(b.date[2] + b.date[3] + b.date[5] + b.date[6] + b.date[8] + b.date[9]))
        .map((booking) => {
            return (<li key={booking._id}>
                <h3>Boknings id: {booking._id}</h3>
                <h5>Customer id: {booking.customerId}</h5>
                <p>Datum: {booking.date}</p>
                <p>Tid: {booking.time}</p>
                <p>Antal gäster: {booking.numberOfGuests}</p>

                <Button onClick={() => showDetails(booking.customerId)}>Visa mer</Button>

                {!changeBtnClicked && <Button onClick={() => showForm(booking._id, booking.customerId)}>Ändra bokning</Button>}
                {changeBtnClicked &&<>
                <form>
                    <label htmlFor={"numberOfGuests"}>Antal gäster:</label>
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

                    {customers.length > 0 && <><p>Namn: {customers[0].name} {customers[0].lastname}</p>
                    <p>Epost: {customers[0].email}</p>
                    <p>Telefon: {customers[0].phone}</p></>}

                    {<p>Du måste ange antal gäster..</p>}
                </form>
                <Button onClick={() => changeBooking(booking._id)}>Spara ändringar</Button>
                <CancelButton onClick={() => window.location.reload()}>Avbryt</CancelButton>
                </>}
                {!changeBtnClicked && <CancelButton onClick={() => deleteBooking(booking._id)}>Avboka</CancelButton>}
            </li>)
    });
    
    return (<>
        <div className="bookings">
            <h1>Bokningar</h1>
            {bookings.length > 0 ? 
                <ul>
                    {lis}
                </ul> 
                : <p>Det finns tyvärr inga bokningar..</p>}
        </div>
    </>)
}

export default Admin
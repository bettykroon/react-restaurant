import axios from "axios"

export function Booking(){
    
    function search(){
        console.log("HEJ");
        axios.get('https://school-restaurant-api.azurewebsites.net/booking/restaurant/624aaeffdf8a9fb11c3ea8b5')
            .then(response => {
                console.log("BOOKING", response.data)
            })
    }

    return (<>
        <form>
            <label htmlFor="numberOfGuests">Antal gäster: </label>
            <input type="number" name="numberOfGuests"/><br />
            <label htmlFor="date">Datum: </label>
            <input type="date" name="date"/><br />
        </form>
        <button type="submit" onClick={search}>Sök</button>
    </>)
}

export default Booking
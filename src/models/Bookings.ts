export class Bookings{
    constructor(
        public id: number, 
        public restaurantId: number, 
        public date: Date, 
        public time: string, 
        public numbersOfGuests: number, 
        public customerId: string){}
}
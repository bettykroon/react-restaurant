import { INewCustomer } from "./INewCustomer";

export interface INewBooking {
    restaurantId: string, 
    date: string, 
    time: string, 
    numberOfGuests: number, 
    customer: INewCustomer
}
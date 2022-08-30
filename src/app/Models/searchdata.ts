import { DecimalPipe } from "@angular/common";

export interface SearchData
{
flightId:Number, 
source_city:string,
destination_city:string, 
flightName:string,
departure_Time:Date, 
arrival_Time:Date,
economy_fare:Number,
business_fare:Number
}
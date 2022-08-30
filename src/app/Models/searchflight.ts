export class Searchflight {
    constructor(
    public Booking_Type:String,
    public Depart_airport_Id :Number,
    public Arrival_airport_Id :Number,
    public  Departure_Time:Date,
    public  Arrival_Time:Date,
    public adults:Number,
    public childs:Number,
    public infants:Number,
    public  Class_Type:String,
    ){}
}
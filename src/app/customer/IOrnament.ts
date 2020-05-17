export class IOrnament { 
    constructor(
    
    public subDate: Date,
    public ornament: string,
    public metal: string,
    public weight: number,
    public rupees: number,
    public priceOfMetal: number,
    public deposit: [
        {
            depositDate: any,
            depositAmount: number,
            actualAmount: number,
            interest: number,
            remainInterest: number,
            totalAmount: number,
        }
    ],
    ) {}
}  


// export interface IOrnament {
 
//     subDate: Date;
//     ornament: string;
//     metal: string;
//     weight: number;
//     rupees: number; 
// }  
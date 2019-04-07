export class IOrnament { 
    constructor(
    
    public subDate: Date,
    public ornament: string,
    public metal: string,
    public weight: number,
    public rupees: number,
    public deposit: [
        {
            depositAmount: number,
            depositDate: any
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
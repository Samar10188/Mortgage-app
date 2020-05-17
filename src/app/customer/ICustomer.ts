import { IOrnament } from './IOrnament';

export interface ICustomer {
        
      _id: string;
      date: string;
      custName: string;
      relation: string;
      relative: string;
      village: string;
      phone: number;
      ornaments: IOrnament[];
  }  
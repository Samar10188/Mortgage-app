import { IOrnament } from './IOrnament';

export interface ICustomer {
        
      id: number;
      date: string;
      custName: string;
      relation: string;
      relName: string;
      village: string;
      phone: number;
      ornaments: IOrnament[];
  }  
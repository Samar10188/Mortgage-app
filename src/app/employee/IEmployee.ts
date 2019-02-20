import { ISkill } from "./ISkill";

export interface IEmployee {
  confirmEmail: any;
    id: number;
    fullName: string;
    email: string;  
    phone: number;
    contactPreference: string;
    skills: ISkill[];
}
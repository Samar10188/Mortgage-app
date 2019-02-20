import { AbstractControl } from '@angular/forms';

export class CustomValidators {
    static emailDomain(domainName: string) {
        return (control: AbstractControl): { [key: string]: any } | null => {
            const email: string = control.value;
            if (email && email.length>1) {
            const domain = email.substring(email.lastIndexOf('@') + 1);
            if (email === '' || domain.toLowerCase() === domainName.toLowerCase()) 
                {
                 return null;
            } else {
                return { 'emailDomain': true };
            }
        }
        };
    }
}
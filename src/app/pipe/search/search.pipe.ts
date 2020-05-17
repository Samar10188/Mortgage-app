import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  transform(value:any[], searchTerm: string) {
    if(!searchTerm){
      console.log('no search')
      return value  
    }

    return value.filter(it=>{   
        const date = it.date.toString().includes(searchTerm);
        const custName = it.custName.toLowerCase().includes(searchTerm.toLowerCase());
        const relative = it.relative.toLowerCase().includes(searchTerm.toLowerCase());
        const village = it.village.toLowerCase().includes(searchTerm.toLowerCase());
        const phone = it.phone.toLowerCase().includes(searchTerm.toLowerCase());
        console.log( custName + phone + village);
        return (date + custName + relative + village + phone);
    }) 

  }

}

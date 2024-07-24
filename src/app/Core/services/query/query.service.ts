import { Injectable } from '@angular/core';

@Injectable()
export class QueryService {
  
  constructor() {}

  formatQuery(data: string): string {
    let query = ""
    const dataParsed = data.replace(/[!^"{}]+/g, "")
    const split = dataParsed.split(',')
    for(var x = 0; x < split.length; x++){
      const string = split[x];
      if(string.length-1 == string.indexOf(":")){
        //nothing
      }
      else{
        if(query.length > 0 && x < split.length) {
          query = query.concat(' && ')
        }
        const split2 = string.split(':')
        query = query.concat(split2[0] + '~"' +  split2[1] + '"')
      }
    }
    return query
  }

}
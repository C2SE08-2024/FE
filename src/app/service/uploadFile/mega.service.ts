import { Injectable } from '@angular/core';
import * as mega from 'megajs';

@Injectable({
  providedIn: 'root'
})
export class MegaService {

  
  constructor() { }

  loginToMega(email: string, password: string) {
    return new Promise((resolve, reject) => {
      const client = mega({ email, password });
      client.login((err, data) => {
        if (err) {
          reject(err);
        } else {
          resolve(data);
        }
      });
    });
  }
}

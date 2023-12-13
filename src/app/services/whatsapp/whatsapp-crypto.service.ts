import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root',
})
export class CryptoService {
  private key = 5;

  encryptPhoneNumber(phoneNumber: string): string {
    let obfuscatedNumber = '';

    for (let i = 0; i < phoneNumber.length; i++) {
      const charCode = phoneNumber.charCodeAt(i);
      const obfuscatedCharCode = charCode + this.key;
      obfuscatedNumber += String.fromCharCode(obfuscatedCharCode);
    }

    return obfuscatedNumber;
  };


  decryptPhoneNumber(obfuscatedPhoneNumber: string): string {
    let phoneNumber = '';

    for (let i = 0; i < obfuscatedPhoneNumber.length; i++) {
      const obfuscatedCharCode = obfuscatedPhoneNumber.charCodeAt(i);
      const charCode = obfuscatedCharCode - this.key;
      phoneNumber += String.fromCharCode(charCode);
    }

    return phoneNumber;
  }
}

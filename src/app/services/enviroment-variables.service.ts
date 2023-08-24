import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EnviromentVariablesService {

  constructor() { }

  public storeUrl = 'https://kc-thrift-store.myshopify.com';
  public storeFrontToken = '624157d4a09011957495f073b6f90d9c';
}

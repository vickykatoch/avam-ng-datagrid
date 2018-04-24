import { PriceLevel } from "../models/model";

export class DataBuilder {
  static build(n: number): PriceLevel[] {
    const data: PriceLevel[] = [];
    let price = 99.5678;
    for (let i = 0; i < n; i++) {
      data.push({
        index : i,
        price,
        bidOrder : DataBuilder.randomNumber(10,30),
        askOrder : DataBuilder.randomNumber(10,30),
        bid : DataBuilder.randomNumber(10,100),
        ask :DataBuilder.randomNumber(100,400),
        sap :DataBuilder.randomNumber(50,150)
      });
    }
    return data;
  }
  static randomNumber(min : number, max: number) : number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

}

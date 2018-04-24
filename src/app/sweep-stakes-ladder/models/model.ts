export interface PriceLevel {
  index : number;
  price: number;
  asd? : PriceLevelItem[];
  bsd? : PriceLevelItem[];
  bidOrder?: number;
  askOrder?: number;
  bid?: number;
  ask?: number;
  sap?: number;
  tags?: Tag[];
}

export interface Stake {
  id : string;
  name : string;
}

export interface PriceLevelItem {
  price: number;
  value?: number;
}
export interface Tag {
  name : string;
  value: number;
}

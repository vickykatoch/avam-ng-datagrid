export interface ItemIterator<T> {
  next(...args: any[]): ItemIterated<T>
}

export interface ItemIterated<T> {
  done: boolean;
  value: T;
}

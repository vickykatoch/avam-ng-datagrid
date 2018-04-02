export interface DataItemIterator<T> {
    next(from: number, count: number) : IteratedItem<T>
}

export interface IteratedItem<T> {
    done : boolean;
    value: T;
}
export function splitArray<T>(arr: T[]): [T[], T[]] {
    const middle = Math.ceil(arr.length / 2);
    const firstHalf = arr.slice(0, middle);
    const secondHalf = arr.slice(middle);
    return [firstHalf, secondHalf];
}
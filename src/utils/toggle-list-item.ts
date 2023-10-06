export function toggleListItem<T>(item: T, list: T[], compareFn?: (a: T, b: T) => boolean): T[] {
    const index = list.findIndex(x => (compareFn ? compareFn(x, item) : x === item));
    return index === -1 ? [...list, item] : list.filter((_, i) => i !== index);
}

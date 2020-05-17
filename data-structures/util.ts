export function swap<T>(array: T[], a: number, b: number) {
  [array[a], array[b]] = [array[b], array[a]];
}

export function defaultToString(item: any): string {
  if (item === null) {
    return "NULL";
  } else if (item === undefined) {
    return "UNDEFINED";
  } else if (typeof item === "string" || item instanceof String) {
    return `${item}`;
  }
  return item.toString();
}

export class MyObj {
  constructor(public el1: any, public el2: any) {}
  toString() {
    return `${this.el1.toString()}|${this.el2.toString()}`;
  }
}

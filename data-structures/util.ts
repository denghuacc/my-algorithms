export function swap<T>(array: T[], a: number, b: number) {
  [array[a], array[b]] = [array[b], array[a]];
}

export function defaultToString(item: unknown): string {
  if (item === null) {
    return "NULL";
  } else if (item === undefined) {
    return "UNDEFINED";
  } else if (typeof item === "string" || item instanceof String) {
    return `${item}`;
  }
  return (item as object).toString();
}

export class MyObj {
  constructor(public el1: unknown, public el2: unknown) {}
  toString() {
    return `${(this.el1 as object).toString()}|${(this
      .el2 as object).toString()}`;
  }
}

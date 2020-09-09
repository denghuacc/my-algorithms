import HashTableSeparateChaining from "../hash-table-separate-chaining";
import { MyObj } from "../../util";

describe("HashTableSeparateChaining", () => {
  const A = "Jonathan";
  const B = "Jamie";
  const C = "Sue";

  test("starts empty", () => {
    const hashTable = new HashTableSeparateChaining<number, number>();
    expect(hashTable.size).toBe(0);
    expect(hashTable.isEmpty()).toBe(true);
  });

  test("generates hashCode", () => {
    // numbers
    let hashTable: any = new HashTableSeparateChaining<number, number>();
    expect(hashTable.hashCode(1)).toBe(1);
    expect(hashTable.hashCode(10)).toBe(10);
    expect(hashTable.hashCode(100)).toBe(100);
    expect(hashTable.hashCode(1000)).toBe(1000);

    // strings
    hashTable = new HashTableSeparateChaining<string, number>();
    expect(hashTable.hashCode("1")).toBe(12);
    expect(hashTable.hashCode("10")).toBe(23);
    expect(hashTable.hashCode("100")).toBe(34);
    expect(hashTable.hashCode("1000")).toBe(8);
    expect(hashTable.hashCode("a")).toBe(23);
    expect(hashTable.hashCode("A")).toBe(28);
    expect(hashTable.hashCode("Aba")).toBe(1);

    // objects
    hashTable = new HashTableSeparateChaining<MyObj, MyObj>();
    const myObjList = [];
    for (let i = 1; i <= 5; i++) {
      myObjList.push(new MyObj(i, i + 1));
    }
    expect(hashTable.hashCode(myObjList[0])).toBe(1);
    expect(hashTable.hashCode(myObjList[1])).toBe(3);
    expect(hashTable.hashCode(myObjList[2])).toBe(5);
    expect(hashTable.hashCode(myObjList[3])).toBe(7);
    expect(hashTable.hashCode(myObjList[4])).toBe(9);
  });

  test("puts undefined and null keys and values", () => {
    const hashTable = new HashTableSeparateChaining();

    expect(hashTable.put("undefined", undefined)).toBe(false);
    expect(hashTable.get("undefined")).toBe(undefined);

    expect(hashTable.put("undefined", 1)).toBe(true);
    expect(hashTable.get("undefined")).toBe(1);

    expect(hashTable.put("null", null)).toBe(false);
    expect(hashTable.get("null")).toBe(undefined);

    expect(hashTable.put("null", 1)).toBe(true);
    expect(hashTable.get("null")).toBe(1);

    hashTable.clear();
    expect(hashTable.put(undefined, undefined)).toBe(false);
    expect(hashTable.get(undefined)).toBe(undefined);

    expect(hashTable.put(undefined, 1)).toBe(false);
    expect(hashTable.get(undefined)).toBe(undefined);

    expect(hashTable.put(null, null)).toBe(false);
    expect(hashTable.get(null)).toBe(undefined);

    expect(hashTable.put(null, 1)).toBe(false);
    expect(hashTable.get(null)).toBe(undefined);
  });

  test("puts values with number key without collisions", () => {
    const min = 1;
    const max = 5;
    const size = max - min + 1;
    const hashTable = new HashTableSeparateChaining<number, number>();

    for (let i = min; i <= max; i++) {
      expect(hashTable.put(i, i)).toBe(true);
    }
    expect(hashTable.size).toBe(size);

    const table = hashTable.getTable();
    for (let i = min; i <= max; i++) {
      const linkedList = table[i];
      expect(linkedList.size).toBe(1);
      const valuePair = linkedList.head;
      expect(valuePair!.key.key).toBe(i);
      expect(valuePair!.key.val).toBe(i);
    }
  });

  test("puts values with string key without collisions", () => {
    const hashTable = new HashTableSeparateChaining<string, number>();

    expect(hashTable.put("1", 1)).toBe(true);
    expect(hashTable.put("10", 10)).toBe(true);
    expect(hashTable.put("100", 100)).toBe(true);
    expect(hashTable.put("1000", 1000)).toBe(true);

    const table = hashTable.getTable();

    let linkedList = table[12];
    expect(linkedList.size).toBe(1);
    let valuePair = linkedList.head;
    expect(valuePair!.key.key).toBe("1");
    expect(valuePair!.key.val).toBe(1);

    linkedList = table[23];
    expect(linkedList.size).toBe(1);
    valuePair = linkedList.head;
    expect(valuePair!.key.key).toBe("10");
    expect(valuePair!.key.val).toBe(10);

    linkedList = table[34];
    expect(linkedList.size).toBe(1);
    valuePair = linkedList.head;
    expect(valuePair!.key.key).toBe("100");
    expect(valuePair!.key.val).toBe(100);

    linkedList = table[8];
    expect(linkedList.size).toBe(1);
    valuePair = linkedList.head;
    expect(valuePair!.key.key).toBe("1000");
    expect(valuePair!.key.val).toBe(1000);
  });

  test("puts values with object key without collisions", () => {
    const hashTable = new HashTableSeparateChaining<MyObj, MyObj>();

    const myObjList = [];
    for (let i = 1; i <= 5; i++) {
      myObjList.push(new MyObj(i, i + 1));
      expect(hashTable.put(myObjList[i - 1], myObjList[i - 1])).toBe(true);
    }

    const table = hashTable.getTable();

    let linkedList = table[1];
    expect(linkedList.size).toBe(1);
    let valuePair = linkedList.head;
    expect(valuePair!.key.key).toBe(myObjList[0]);
    expect(valuePair!.key.val).toBe(myObjList[0]);

    linkedList = table[3];
    expect(linkedList.size).toBe(1);
    valuePair = linkedList.head;
    expect(valuePair!.key.key).toBe(myObjList[1]);
    expect(valuePair!.key.val).toBe(myObjList[1]);

    linkedList = table[5];
    expect(linkedList.size).toBe(1);
    valuePair = linkedList.head;
    expect(valuePair!.key.key).toBe(myObjList[2]);
    expect(valuePair!.key.val).toBe(myObjList[2]);

    linkedList = table[7];
    expect(linkedList.size).toBe(1);
    valuePair = linkedList.head;
    expect(valuePair!.key.key).toBe(myObjList[3]);
    expect(valuePair!.key.val).toBe(myObjList[3]);

    linkedList = table[9];
    expect(linkedList.size).toBe(1);
    valuePair = linkedList.head;
    expect(valuePair!.key.key).toBe(myObjList[4]);
    expect(valuePair!.key.val).toBe(myObjList[4]);
  });

  test("puts values with collisions", () => {
    const min = 1;
    const max = 5;
    const size = max - min + 1;
    const hashTable = new HashTableSeparateChaining<number, number>();

    for (let i = min; i <= max; i++) {
      expect(hashTable.put(i, i)).toBe(true);
    }
    expect(hashTable.size).toBe(size);

    for (let i = min; i <= max; i++) {
      expect(hashTable.put(i, i + 10)).toBe(true);
    }
    expect(hashTable.size).toBe(size * 2);

    for (let i = min; i <= max; i++) {
      expect(hashTable.put(i, i + 100)).toBe(true);
    }
    expect(hashTable.size).toBe(size * 3);

    const table = hashTable.getTable();
    for (let i = min; i <= max; i++) {
      const linkedList = table[i];
      expect(linkedList.size).toBe(3);

      let valuePair = linkedList.head;
      expect(valuePair!.key.key).toBe(i);
      expect(valuePair!.key.val).toBe(i);

      valuePair = valuePair!.next;
      expect(valuePair!.key.key).toBe(i);
      expect(valuePair!.key.val).toBe(i + 10);

      valuePair = valuePair!.next;
      expect(valuePair!.key.key).toBe(i);
      expect(valuePair!.key.val).toBe(i + 100);
    }
  });

  test("removes elements without collisions", () => {
    const min = 1;
    const max = 5;
    const size = max - min + 1;
    const hashTable = new HashTableSeparateChaining<number, number>();

    for (let i = min; i <= max; i++) {
      expect(hashTable.put(i, i)).toBe(true);
    }
    expect(hashTable.size).toBe(size);

    for (let i = min; i <= max; i++) {
      expect(hashTable.remove(i)).toBe(true);
    }

    // elements do not exist
    for (let i = min; i <= max; i++) {
      expect(hashTable.remove(i)).toBe(false);
    }

    expect(hashTable.isEmpty()).toBe(true);
  });

  function addValuesCollision() {
    const hashTable = new HashTableSeparateChaining<string, string>();

    expect(hashTable.put(A, `${A}@email.com`)).toBe(true);
    expect(hashTable.put(B, `${B}@email.com`)).toBe(true);
    expect(hashTable.put(C, `${C}@email.com`)).toBe(true);
    expect(hashTable.size).toBe(3);

    const expectedHash = 5;
    expect(hashTable.hashCode(A)).toBe(expectedHash);
    expect(hashTable.hashCode(B)).toBe(expectedHash);
    expect(hashTable.hashCode(C)).toBe(expectedHash);

    expect(hashTable.getTable()[expectedHash].size).toBe(3);

    return hashTable;
  }

  function removeWithCollision(a: string, b: string, c: string) {
    const hashTable = addValuesCollision();

    expect(hashTable.remove(a)).toBe(true);
    expect(hashTable.get(a)).toBe(undefined);
    expect(hashTable.get(b)).not.toBe(undefined);
    expect(hashTable.get(c)).not.toBe(undefined);

    expect(hashTable.remove(b)).toBe(true);
    expect(hashTable.get(a)).toBe(undefined);
    expect(hashTable.get(b)).toBe(undefined);
    expect(hashTable.get(c)).not.toBe(undefined);

    expect(hashTable.remove(c)).toBe(true);
    expect(hashTable.get(a)).toBe(undefined);
    expect(hashTable.get(b)).toBe(undefined);
    expect(hashTable.get(c)).toBe(undefined);

    expect(hashTable.isEmpty()).toBe(true);
  }

  test("removes elements with collisions", () => {
    // test all possibilities for removal
    removeWithCollision(A, B, C);
    removeWithCollision(A, C, B);
    removeWithCollision(B, A, C);
    removeWithCollision(B, C, A);
    removeWithCollision(C, A, B);
    removeWithCollision(C, B, A);
  });

  test("returns toString primitive types without collisions", () => {
    const hashTable = new HashTableSeparateChaining<number, number>();

    expect(hashTable.toString()).toBe("");

    hashTable.put(1, 1);
    expect(hashTable.toString()).toBe(
      "{1 => Linked List { [#1: 1] -> undefined }}"
    );

    hashTable.put(2, 2);
    expect(hashTable.toString()).toBe(
      "{1 => Linked List { [#1: 1] -> undefined }},{2 => Linked List { [#2: 2] -> undefined }}"
    );

    hashTable.clear();
    expect(hashTable.toString()).toBe("");
  });

  test("returns toString primitive types without collisions", () => {
    const hashTable = new HashTableSeparateChaining<string, number>();

    hashTable.put("el1", 1);
    expect(hashTable.toString()).toBe(
      "{36 => Linked List { [#el1: 1] -> undefined }}"
    );

    hashTable.put("el2", 2);
    expect(hashTable.toString()).toBe(
      "{0 => Linked List { [#el2: 2] -> undefined }},{36 => Linked List { [#el1: 1] -> undefined }}"
    );
  });

  test("returns toString objects without collisions", () => {
    const hashTable = new HashTableSeparateChaining<MyObj, MyObj>();

    let myObj = new MyObj(1, 2);
    hashTable.put(myObj, myObj);
    expect(hashTable.toString()).toBe(
      "{1 => Linked List { [#1|2: 1|2] -> undefined }}"
    );

    myObj = new MyObj(3, 4);
    hashTable.put(myObj, myObj);
    expect(hashTable.toString()).toBe(
      "{1 => Linked List { [#1|2: 1|2] -> undefined }},{5 => Linked List { [#3|4: 3|4] -> undefined }}"
    );
  });

  test("returns toString with collisions", () => {
    const hashTable = new HashTableSeparateChaining<number, number>();

    expect(hashTable.toString()).toBe("");

    hashTable.put(1, 1);
    expect(hashTable.toString()).toBe(
      "{1 => Linked List { [#1: 1] -> undefined }}"
    );

    hashTable.put(2, 2);
    expect(hashTable.toString()).toBe(
      "{1 => Linked List { [#1: 1] -> undefined }},{2 => Linked List { [#2: 2] -> undefined }}"
    );

    hashTable.put(1, 10);
    expect(hashTable.toString()).toBe(
      "{1 => Linked List { [#1: 1] -> [#1: 10] -> undefined }},{2 => Linked List { [#2: 2] -> undefined }}"
    );

    hashTable.clear();
    expect(hashTable.toString()).toBe("");
  });
});

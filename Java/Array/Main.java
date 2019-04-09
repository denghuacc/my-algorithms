public class Main {
  public static void main(String[] args) {
    Array<Integer> arr = new Array<>();
    for (int i = 0; i < 10; i++) {
      arr.addLast(i);
    }
    System.out.println(arr);

    arr.addLast(11);
    System.out.println(arr);

    arr.removeLast();
    System.out.println(arr);
  }
}
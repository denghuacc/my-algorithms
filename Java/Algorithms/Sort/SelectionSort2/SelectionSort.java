
/**
 * SelectionSort 选择排序
 * 
 * 使用 Comparable 类型进行比较
 */
public class SelectionSort {

  private SelectionSort() {
  }

  public static void sort(Comparable[] arr) {
    int n = arr.length;

    for (int i = 0; i < n; i++) {

      // 寻找 [i..n-1] 区间里的最小值的索引
      int minIndex = i;

      for (int j = i + 1; j < n; j++) {

        // 使用compareTo方法比较两个Comparable对象的大小
        if (arr[j].compareTo(arr[minIndex]) < 0) {
          minIndex = j;
        }
      }
      swap(arr, i, minIndex);
    }
  }

  private static void swap(Object[] arr, int i, int j) {
    Object temp = arr[i];
    arr[i] = arr[j];
    arr[j] = temp;
  }

  public static void main(String[] args) {

    // test Integer
    Integer[] a = { 10, 9, 8, 7, 6, 5, 4, 3, 2, 1 };
    SelectionSort.sort(a);
    for (int i = 0; i < a.length; i++) {
      System.out.println(a[i]);
    }
    System.out.println();

    // test Double
    Double[] b = { 4.4, 3.3, 2.2, 1.1 };
    SelectionSort.sort(b);
    for (int i = 0; i < b.length; i++) {
      System.out.println(b[i]);
    }
    System.out.println();

    // test String
    String[] c = { "D", "C", "B", "A" };
    SelectionSort.sort(c);
    for (int i = 0; i < c.length; i++) {
      System.out.println(c[i]);
    }
    System.out.println();

    // test 自定义的类 Student
    Student[] d = new Student[4];
    d[0] = new Student("D", 90);
    d[1] = new Student("C", 100);
    d[2] = new Student("B", 95);
    d[3] = new Student("A", 95);
    SelectionSort.sort(d);
    for (int i = 0; i < c.length; i++) {
      System.out.println(d[i]);
    }
  }
}
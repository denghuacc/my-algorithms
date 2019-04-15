import java.util.HashMap;
import java.util.HashSet;;

public class Main {
  public static void main(String[] args) {
    int a = 42;
    System.out.println(((Integer) a).hashCode()); // 42

    int b = -42;
    System.out.println(((Integer) b).hashCode()); // -42

    double c = 3.1415926;
    System.out.println(((Double) c).hashCode());

    String str = "hello world";
    System.out.println(str.hashCode());

    Student student = new Student(3, 6, "Hale", "Deng");
    System.out.println(student.hashCode());

    HashSet<Student> set = new HashSet<>();
    set.add(student);

    HashMap<Student, Integer> map = new HashMap<>();
    map.put(student, 100);

    Student student2 = new Student(3, 6, "Hale", "Deng");
    System.out.println(student2.hashCode());
  }
}

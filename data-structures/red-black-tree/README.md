# Red Block Tree

- 对于完全随机的数据，普通的二分搜索树很好用！但是它有个缺点：极端情况下退化成链表（或者高度不平衡
- 对于查询较多的使用情况，AVL 树很好用！
- 红黑树牺牲了平衡性（2logN 的高度），但是它的统计性能更优 （综合增删改查所有的操作）
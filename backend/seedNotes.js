require('dotenv').config();
const mongoose = require('mongoose');
const { Note } = require('./models/Content');

const notes = [
// ══════════════════════════════════════════
// JAVA NOTES
// ══════════════════════════════════════════
{
  title: 'OOP Concepts — Complete Guide',
  category: 'Java', order: 1,
  description: 'All 4 pillars of OOP with Java examples — most asked in interviews',
  tags: ['OOP','Inheritance','Polymorphism','Encapsulation','Abstraction'],
  content: `<h2>Object Oriented Programming — 4 Pillars</h2>
<h3>1. Encapsulation</h3>
<p>Binding data and methods together. Private fields + public getters/setters.</p>
<pre>class BankAccount {
    private double balance;          // data hidden
    public double getBalance() { return balance; }
    public void deposit(double amt) { if(amt>0) balance += amt; }
}</pre>
<p><strong>Why:</strong> Data protection, controlled access, easier maintenance.</p>

<h3>2. Inheritance</h3>
<p>Child class acquires properties of parent class. <code>extends</code> keyword.</p>
<pre>class Animal { void eat() { System.out.println("Eating"); } }
class Dog extends Animal {
    void bark() { System.out.println("Barking"); }
}
Dog d = new Dog();
d.eat();   // inherited
d.bark();  // own method</pre>
<p><strong>Types:</strong> Single, Multilevel, Hierarchical. Java does NOT support multiple inheritance (use interfaces).</p>

<h3>3. Polymorphism</h3>
<p><strong>Compile-time (Method Overloading):</strong> Same name, different parameters.</p>
<pre>class Calculator {
    int add(int a, int b) { return a+b; }
    double add(double a, double b) { return a+b; }  // overloaded
}</pre>
<p><strong>Runtime (Method Overriding):</strong> Same method, different implementation in subclass.</p>
<pre>class Shape { void draw() { System.out.println("Drawing shape"); } }
class Circle extends Shape {
    @Override
    void draw() { System.out.println("Drawing circle"); }
}
Shape s = new Circle();  // upcasting
s.draw();  // prints "Drawing circle" — runtime polymorphism</pre>

<h3>4. Abstraction</h3>
<p>Hiding implementation details. Show only what is necessary.</p>
<pre>// Abstract class
abstract class Vehicle {
    abstract void start();    // no body
    void stop() { System.out.println("Stopped"); }  // concrete method
}

// Interface — 100% abstraction (before Java 8)
interface Flyable {
    void fly();  // public abstract by default
}</pre>
<p><strong>Abstract class vs Interface:</strong></p>
<ul>
<li>Abstract class: can have constructors, instance variables, non-abstract methods</li>
<li>Interface: all methods abstract (pre-Java8), multiple implementation allowed</li>
<li>Use abstract class for IS-A, interface for CAN-DO relationship</li>
</ul>

<h3>NEW: SOLID Principles (Interview Favorite)</h3>
<ul>
<li><strong>S</strong>ingle Responsibility: A class should have one reason to change.</li>
<li><strong>O</strong>pen/Closed: Open for extension, closed for modification.</li>
<li><strong>L</strong>iskov Substitution: Subtypes must be substitutable for base types.</li>
<li><strong>I</strong>nterface Segregation: Don't force clients to depend on unused methods.</li>
<li><strong>D</strong>ependency Inversion: Depend on abstractions, not concretions.</li>
</ul>

<h3>Key Interview Questions</h3>
<ul>
<li>Can we override static methods? NO — they are hidden, not overridden</li>
<li>Can abstract class have constructor? YES</li>
<li>Can interface have variables? YES — but public static final by default</li>
<li>What is IS-A vs HAS-A relationship? IS-A = inheritance, HAS-A = composition</li>
<li>What is diamond problem? Why Java doesn't support multiple inheritance?</li>
</ul>`
},
{
  title: 'Java Collections Framework',
  category: 'Java', order: 2,
  description: 'List, Set, Map, Queue — all with time complexities and when to use which',
  tags: ['Collections','ArrayList','HashMap','HashSet','LinkedList','TreeMap'],
  content: `<h2>Java Collections Framework</h2>
<p>Collections hierarchy: Collection → List, Set, Queue | Map (separate)</p>

<h3>List — Ordered, Allows Duplicates</h3>
<pre>// ArrayList — backed by array, fast random access O(1), slow insert/delete middle O(n)
ArrayList&lt;Integer&gt; list = new ArrayList&lt;&gt;();
list.add(1); list.add(2); list.add(0, 0);  // add at index
list.get(0); list.remove(0);

// LinkedList — doubly linked, fast insert/delete O(1), slow access O(n)
LinkedList&lt;Integer&gt; ll = new LinkedList&lt;&gt;();
ll.addFirst(1); ll.addLast(2); ll.removeFirst();</pre>

<h3>Set — No Duplicates</h3>
<pre>// HashSet — O(1) add/remove/contains, NO ORDER
HashSet&lt;String&gt; hs = new HashSet&lt;&gt;();
hs.add("apple"); hs.contains("apple");  // true

// TreeSet — Sorted order, O(log n) operations
TreeSet&lt;Integer&gt; ts = new TreeSet&lt;&gt;();
ts.add(5); ts.add(1); ts.add(3);  // stored as [1,3,5]

// LinkedHashSet — insertion order maintained
LinkedHashSet&lt;String&gt; lhs = new LinkedHashSet&lt;&gt;();</pre>

<h3>Map — Key-Value Pairs</h3>
<pre>// HashMap — O(1) get/put, NO ORDER, allows null key/value
HashMap&lt;String,Integer&gt; map = new HashMap&lt;&gt;();
map.put("a",1); map.get("a");
map.getOrDefault("b",0);  // returns 0 if key not present
map.containsKey("a"); map.containsValue(1);

// Iterate
for(Map.Entry&lt;String,Integer&gt; e : map.entrySet())
    System.out.println(e.getKey() + ":" + e.getValue());

// TreeMap — Sorted by key, O(log n)
TreeMap&lt;String,Integer&gt; tm = new TreeMap&lt;&gt;();

// LinkedHashMap — insertion order
LinkedHashMap&lt;String,Integer&gt; lhm = new LinkedHashMap&lt;&gt;();</pre>

<h3>Queue & Deque</h3>
<pre>// PriorityQueue — min-heap by default
PriorityQueue&lt;Integer&gt; pq = new PriorityQueue&lt;&gt;();
pq.offer(3); pq.offer(1); pq.offer(2);
pq.poll();  // returns 1 (minimum)

// Max-heap
PriorityQueue&lt;Integer&gt; maxPQ = new PriorityQueue&lt;&gt;(Collections.reverseOrder());

// ArrayDeque — use as stack or queue, faster than Stack class
ArrayDeque&lt;Integer&gt; dq = new ArrayDeque&lt;&gt;();
dq.push(1); dq.pop();    // stack operations
dq.offer(1); dq.poll();  // queue operations</pre>

<h3>Time Complexity Summary</h3>
<ul>
<li>ArrayList get(i): O(1) | add end: O(1) amortized | add middle: O(n)</li>
<li>LinkedList add/remove: O(1) | get(i): O(n)</li>
<li>HashMap get/put: O(1) avg | O(n) worst case (hash collision)</li>
<li>TreeMap/TreeSet: O(log n) all ops</li>
<li>PriorityQueue: offer O(log n) | poll O(log n) | peek O(1)</li>
</ul>

<h3>Interview Tips</h3>
<ul>
<li>HashMap vs Hashtable: HashMap is not thread-safe, Hashtable is. HashMap allows null key.</li>
<li>HashMap vs ConcurrentHashMap: ConcurrentHashMap is thread-safe with better performance than Hashtable</li>
<li>ArrayList vs LinkedList: Use ArrayList for random access, LinkedList for frequent insert/delete</li>
<li>Comparable vs Comparator: Comparable = natural order (in class), Comparator = custom order (external)</li>
</ul>`
},
{
  title: 'Exception Handling & Multithreading',
  category: 'Java', order: 3,
  description: 'try-catch-finally, checked vs unchecked, threads, synchronization',
  tags: ['Exception','try-catch','Threads','Synchronization','Runnable'],
  content: `<h2>Exception Handling</h2>
<h3>Exception Hierarchy</h3>
<p>Throwable → Error (JVM errors, don't handle) | Exception → Checked | RuntimeException → Unchecked</p>
<ul>
<li><strong>Checked:</strong> IOException, SQLException, ClassNotFoundException — must handle with try-catch or declare with throws</li>
<li><strong>Unchecked (RuntimeException):</strong> NullPointerException, ArrayIndexOutOfBounds, ClassCastException — don't need to declare</li>
</ul>

<h3>try-catch-finally</h3>
<pre>try {
    int[] arr = new int[5];
    arr[10] = 1;  // throws ArrayIndexOutOfBoundsException
} catch (ArrayIndexOutOfBoundsException e) {
    System.out.println("Caught: " + e.getMessage());
} catch (Exception e) {
    System.out.println("Generic catch");
} finally {
    System.out.println("Always runs — close resources here");
}

// try-with-resources (auto closes — use for I/O)
try (FileReader fr = new FileReader("file.txt")) {
    // use fr
}  // fr.close() called automatically</pre>

<h3>Custom Exception</h3>
<pre>class InsufficientFundsException extends Exception {
    public InsufficientFundsException(String msg) { super(msg); }
}
// throw it
throw new InsufficientFundsException("Balance too low");</pre>

<h2>Multithreading</h2>
<h3>Creating Threads — 2 ways</h3>
<pre>// Way 1: extend Thread
class MyThread extends Thread {
    public void run() { System.out.println("Thread running"); }
}
new MyThread().start();

// Way 2: implement Runnable (preferred — allows extending another class)
class MyRunnable implements Runnable {
    public void run() { System.out.println("Runnable running"); }
}
new Thread(new MyRunnable()).start();

// Lambda (Java 8+)
new Thread(() -> System.out.println("Lambda thread")).start();</pre>

<h3>Synchronization</h3>
<pre>class Counter {
    private int count = 0;
    // synchronized method — only one thread at a time
    public synchronized void increment() { count++; }
    // synchronized block — more granular
    public void decrement() {
        synchronized(this) { count--; }
    }
}</pre>

<h3>Thread States</h3>
<p>New → Runnable → Running → Blocked/Waiting → Terminated</p>
<ul>
<li>sleep(ms) — pauses thread, doesn't release lock</li>
<li>wait() — releases lock, waits for notify()</li>
<li>notify() / notifyAll() — wakes waiting thread(s)</li>
<li>join() — wait for another thread to finish</li>
</ul>

<h3>Key Interview Questions</h3>
<ul>
<li>Deadlock: two threads waiting for each other's locks forever</li>
<li>volatile keyword: ensures visibility of changes across threads</li>
<li>Thread vs Process: Thread shares memory, Process has separate memory</li>
<li>What is race condition? Multiple threads accessing/modifying shared data unsafely</li>
</ul>`
},
{
  title: 'Java 8 Features',
  category: 'Java', order: 4,
  description: 'Lambda, Streams, Optional, Functional Interfaces — must know for modern interviews',
  tags: ['Lambda','Streams','Optional','Functional Interface','Java8'],
  content: `<h2>Java 8 Key Features</h2>

<h3>Lambda Expressions</h3>
<p>Anonymous functions. <code>(parameters) -> body</code></p>
<pre>// Before Java 8
Runnable r = new Runnable() {
    public void run() { System.out.println("Hello"); }
};
// Java 8 Lambda
Runnable r = () -> System.out.println("Hello");

// With parameters
Comparator&lt;Integer&gt; comp = (a, b) -> a - b;
List&lt;Integer&gt; list = Arrays.asList(3,1,2);
Collections.sort(list, (a,b) -> a-b);</pre>

<h3>Functional Interfaces</h3>
<pre>// Predicate — takes T, returns boolean
Predicate&lt;Integer&gt; isEven = n -> n % 2 == 0;
isEven.test(4);  // true

// Function — takes T, returns R
Function&lt;String,Integer&gt; len = s -> s.length();
len.apply("hello");  // 5

// Consumer — takes T, returns void
Consumer&lt;String&gt; print = s -> System.out.println(s);
print.accept("Hi");

// Supplier — takes nothing, returns T
Supplier&lt;String&gt; greet = () -> "Hello World";</pre>

<h3>Streams API</h3>
<pre>List&lt;Integer&gt; nums = Arrays.asList(1,2,3,4,5,6,7,8,9,10);

// filter + map + collect
List&lt;Integer&gt; evens = nums.stream()
    .filter(n -> n%2==0)     // [2,4,6,8,10]
    .map(n -> n*n)            // [4,16,36,64,100]
    .collect(Collectors.toList());

// reduce
int sum = nums.stream().reduce(0, Integer::sum);  // 55

// count, min, max
long cnt = nums.stream().filter(n->n>5).count();  // 5
Optional&lt;Integer&gt; max = nums.stream().max(Integer::compareTo);

// sorted, distinct, limit, skip
List&lt;Integer&gt; sorted = nums.stream().sorted().collect(Collectors.toList());

// String joining
List&lt;String&gt; words = Arrays.asList("a","b","c");
String joined = words.stream().collect(Collectors.joining(", "));  // "a, b, c"

// Group by
Map&lt;Integer,List&lt;String&gt;&gt; byLen = words.stream()
    .collect(Collectors.groupingBy(String::length));</pre>

<h3>Optional</h3>
<pre>Optional&lt;String&gt; opt = Optional.of("hello");
opt.isPresent();            // true
opt.get();                  // "hello"
opt.orElse("default");      // "hello"
Optional.empty().orElse("default");  // "default"
opt.map(String::toUpperCase).orElse("none");  // "HELLO"</pre>

<h3>Method References</h3>
<pre>// Static method
Function&lt;String,Integer&gt; parse = Integer::parseInt;
// Instance method
Consumer&lt;String&gt; print = System.out::println;
// Constructor
Supplier&lt;ArrayList&gt; create = ArrayList::new;</pre>`
},
{
  title: 'Java Basics — From Scratch',
  category: 'Java', order: 6,
  description: 'Variables, Data Types, Operators, Input/Output',
  tags: ['Java Basics','Variables','Operators'],
  content: `<h2>Java Basics</h2>

<h3>Variables & Data Types</h3>
<pre>
int a = 10;
double d = 10.5;
char c = 'A';
boolean b = true;
String s = "Hello";
</pre>

<h3>Question 1</h3>
<p>What will be output?</p>
<pre>
int x = 5;
System.out.println(x++);
</pre>
<p><strong>Answer:</strong> 5 (post-increment)</p>

<h3>Operators</h3>
<ul>
<li>Arithmetic: + - * / %</li>
<li>Relational: == != > <</li>
<li>Logical: && || !</li>
</ul>

<h3>Question 2</h3>
<p>Output?</p>
<pre>
System.out.println(10 + 20 + "30");
</pre>
<p><strong>Answer:</strong> 3030</p>

<h3>Practice</h3>
<ul>
<li>Difference between == and equals()</li>
<li>Type casting examples</li>
</ul>`
},
{
  title: 'Control Statements — Conditions & Loops',
  category: 'Java', order: 7,
  description: 'if-else, loops, switch with questions',
  tags: ['Loops','Conditions'],
  content: `<h2>Control Statements</h2>

<h3>if-else</h3>
<pre>
if(x > 10) { ... } else { ... }
</pre>

<h3>Loops</h3>
<pre>
for(int i=0;i<5;i++){}
while(x>0){}
do{}while(x>0);
</pre>

<h3>Question</h3>
<p>Output?</p>
<pre>
for(int i=0;i<3;i++)
    System.out.print(i);
</pre>
<p><strong>Answer:</strong> 012</p>

<h3>Switch</h3>
<pre>
switch(day){
 case 1: break;
}
</pre>

<h3>Practice</h3>
<ul>
<li>Print pattern questions</li>
<li>Find factorial using loop</li>
</ul>`
},
{
  title: 'Strings in Java — Complete Guide',
  category: 'Java', order: 8,
  description: 'String vs StringBuilder, methods, questions',
  tags: ['String','Java'],
  content: `<h2>Strings in Java</h2>

<h3>Immutable Nature</h3>
<p>String is immutable</p>

<h3>Question</h3>
<pre>
String s = "hello";
s.concat("world");
System.out.println(s);
</pre>
<p><strong>Answer:</strong> hello</p>

<h3>StringBuilder</h3>
<pre>
StringBuilder sb = new StringBuilder("hi");
sb.append(" bro");
</pre>

<h3>Common Methods</h3>
<ul>
<li>length()</li>
<li>substring()</li>
<li>equals()</li>
<li>charAt()</li>
</ul>

<h3>Practice</h3>
<ul>
<li>Reverse string</li>
<li>Check palindrome</li>
</ul>`
},
{
  title: 'Arrays — Complete with Questions',
  category: 'Java', order: 9,
  description: '1D, 2D arrays and problems',
  tags: ['Arrays'],
  content: `<h2>Arrays</h2>

<h3>Declaration</h3>
<pre>
int[] arr = {1,2,3};
</pre>

<h3>Question</h3>
<pre>
int[] a = {1,2,3};
System.out.println(a.length);
</pre>
<p><strong>Answer:</strong> 3</p>

<h3>2D Array</h3>
<pre>
int[][] mat = new int[2][3];
</pre>

<h3>Practice</h3>
<ul>
<li>Find max element</li>
<li>Reverse array</li>
</ul>`
},
{
  title: 'File Handling in Java',
  category: 'Java', order: 10,
  description: 'Read/write files',
  tags: ['File','IO'],
  content: `<h2>File Handling</h2>

<h3>Write File</h3>
<pre>
FileWriter fw = new FileWriter("file.txt");
fw.write("Hello");
fw.close();
</pre>

<h3>Read File</h3>
<pre>
BufferedReader br = new BufferedReader(new FileReader("file.txt"));
System.out.println(br.readLine());
</pre>

<h3>Question</h3>
<p>Why use BufferedReader?</p>
<p><strong>Answer:</strong> Faster reading</p>`
},
{
  title: 'JVM & Memory Management',
  category: 'Java', order: 11,
  description: 'Heap, Stack, GC',
  tags: ['JVM','Memory'],
  content: `<h2>JVM Memory</h2>

<h3>Memory Areas</h3>
<ul>
<li>Heap — objects</li>
<li>Stack — methods</li>
<li>Method Area</li>
</ul>

<h3>Question</h3>
<p>Where are objects stored?</p>
<p><strong>Answer:</strong> Heap</p>

<h3>Garbage Collection</h3>
<p>Removes unused objects</p>

<h3>Practice</h3>
<ul>
<li>Stack vs Heap difference</li>
</ul>`
},
{
  title: 'JDBC & Basic SQL with Java',
  category: 'Java', order: 5,
  description: 'Database connectivity, PreparedStatement, basic SQL queries',
  tags: ['JDBC','SQL','Database','PreparedStatement','Connection'],
  content: `<h2>JDBC — Java Database Connectivity</h2>
<h3>4 Steps to Connect</h3>
<pre>// Step 1: Load driver (not needed for JDBC 4.0+)
Class.forName("com.mysql.cj.jdbc.Driver");

// Step 2: Create connection
Connection con = DriverManager.getConnection(
    "jdbc:mysql://localhost:3306/mydb", "root", "password");

// Step 3: Create statement and execute
PreparedStatement ps = con.prepareStatement(
    "SELECT * FROM employees WHERE dept=?");
ps.setString(1, "Engineering");
ResultSet rs = ps.executeQuery();

// Step 4: Process result and close
while(rs.next()){
    System.out.println(rs.getInt("id") + " " + rs.getString("name"));
}
rs.close(); ps.close(); con.close();</pre>

<h3>Statement vs PreparedStatement</h3>
<ul>
<li>Statement: for static SQL, no parameters, vulnerable to SQL injection</li>
<li>PreparedStatement: precompiled, uses ? placeholders, prevents SQL injection, faster for repeated queries</li>
</ul>

<h3>Essential SQL Queries</h3>
<pre>-- Create table
CREATE TABLE employees (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(50) NOT NULL,
    salary DECIMAL(10,2),
    dept_id INT,
    FOREIGN KEY (dept_id) REFERENCES departments(id)
);

-- Basic queries
SELECT * FROM employees WHERE salary > 50000;
SELECT name, salary FROM employees ORDER BY salary DESC LIMIT 5;

-- Aggregate functions
SELECT dept_id, COUNT(*), AVG(salary), MAX(salary)
FROM employees GROUP BY dept_id HAVING AVG(salary) > 60000;

-- JOINs
SELECT e.name, d.dept_name
FROM employees e INNER JOIN departments d ON e.dept_id = d.id;

-- Subquery
SELECT * FROM employees WHERE salary > (SELECT AVG(salary) FROM employees);

-- UPDATE and DELETE
UPDATE employees SET salary = salary * 1.1 WHERE dept_id = 2;
DELETE FROM employees WHERE id = 5;</pre>

<h3>ACID Properties (Interview Must Know)</h3>
<ul>
<li><strong>Atomicity:</strong> All or nothing — transaction fully completes or fully rolls back</li>
<li><strong>Consistency:</strong> DB stays in valid state before and after transaction</li>
<li><strong>Isolation:</strong> Concurrent transactions don't interfere with each other</li>
<li><strong>Durability:</strong> Committed transactions persist even after crashes</li>
</ul>`
},

{
  title: 'Operating System — Complete Interview Notes',
  category: 'Core CS', order: 6,
  description: 'Processes, Threads, Scheduling, Deadlocks — highly asked in interviews',
  tags: ['OS','Process','Thread','Scheduling','Deadlock'],
  content: `<h2>Operating System</h2>

<h3>Process vs Thread</h3>
<ul>
<li>Process = independent program (own memory)</li>
<li>Thread = lightweight, shares memory</li>
<li>Thread faster but less secure</li>
</ul>

<h3>CPU Scheduling</h3>
<ul>
<li>FCFS — simple but high waiting time</li>
<li>SJF — shortest job first (optimal)</li>
<li>Round Robin — time slice based</li>
<li>Priority Scheduling</li>
</ul>

<h3>Deadlock Conditions</h3>
<ul>
<li>Mutual Exclusion</li>
<li>Hold and Wait</li>
<li>No Preemption</li>
<li>Circular Wait</li>
</ul>

<h3>Memory Management</h3>
<ul>
<li>Paging — fixed size</li>
<li>Segmentation — variable size</li>
<li>Virtual Memory</li>
</ul>

<h3>Important Questions</h3>
<ul>
<li>What is context switching?</li>
<li>Difference between paging & segmentation?</li>
<li>What is thrashing?</li>
</ul>`
},

// ══════════════════════════════════════════
// PYTHON NOTES
// ══════════════════════════════════════════
{
  title: 'Python Data Structures & Built-ins',
  category: 'Python', order: 1,
  description: 'Lists, dicts, sets, tuples with all operations — complete reference',
  tags: ['Lists','Dictionary','Sets','Tuples','Built-ins'],
  content: `<h2>Python Data Structures — Complete Reference</h2>

<h3>Lists</h3>
<pre>a = [1,2,3,4,5]
a.append(6)          # [1,2,3,4,5,6]
a.insert(0, 0)       # [0,1,2,3,4,5,6]
a.pop()              # removes last → 6
a.pop(0)             # removes at index 0
a.remove(3)          # removes first occurrence of 3
a.index(2)           # finds index of 2
a.sort()             # in-place sort
a.sort(reverse=True) # descending
sorted(a)            # returns new sorted list
a.reverse()          # in-place reverse
a[::-1]              # reversed copy
len(a); sum(a); min(a); max(a)

# List comprehension
squares = [x**2 for x in range(10)]
evens = [x for x in range(20) if x%2==0]
matrix = [[i*j for j in range(3)] for i in range(3)]

# Slicing
a[1:4]   # elements 1,2,3
a[::2]   # every 2nd element
a[-3:]   # last 3 elements</pre>

<h3>Dictionary</h3>
<pre>d = {'name':'Alice', 'age':25}
d['name']           # 'Alice'
d.get('email','N/A') # 'N/A' (safe get)
d['city'] = 'NYC'   # add/update
del d['age']        # delete key
d.keys(); d.values(); d.items()
'name' in d         # True
d.update({'age':26, 'job':'dev'})  # merge

# Dict comprehension
sq = {x: x**2 for x in range(5)}

# defaultdict — auto creates default value
from collections import defaultdict
dd = defaultdict(int)   # default 0
dd = defaultdict(list)  # default []
dd['a'] += 1            # no KeyError

# Counter — count frequencies
from collections import Counter
c = Counter([1,2,2,3,3,3])  # {3:3, 2:2, 1:1}
c.most_common(2)            # [(3,3),(2,2)]</pre>

<h3>Sets</h3>
<pre>s = {1, 2, 3, 4, 5}
s.add(6); s.remove(1); s.discard(99)  # discard won't raise error
s1 | s2   # union
s1 & s2   # intersection
s1 - s2   # difference
s1 ^ s2   # symmetric difference
frozenset({1,2,3})  # immutable set</pre>

<h3>Tuples</h3>
<pre>t = (1, 2, 3)
t[0]         # 1 (indexing works)
t.count(2)   # 1
t.index(3)   # 2
# immutable — can't modify
# use as dict keys, function returns multiple values
def minmax(lst): return min(lst), max(lst)
lo, hi = minmax([3,1,4,1,5])</pre>

<h3>String Methods</h3>
<pre>s = "Hello World"
s.lower(); s.upper(); s.title()
s.strip(); s.lstrip(); s.rstrip()
s.split()           # ['Hello','World']
s.split(',')        # split by comma
','.join(['a','b','c'])  # 'a,b,c'
s.replace('o','0')  # 'Hell0 W0rld'
s.find('World')     # 6
s.startswith('He'); s.endswith('ld')
s.isdigit(); s.isalpha(); s.isalnum()
s[::-1]             # reverse string
f"Name: {'Alice'}, Age: {25}"  # f-string</pre>

<h3>Important Built-in Functions</h3>
<pre>enumerate([10,20,30])  # (0,10),(1,20),(2,30)
zip([1,2,3],[4,5,6])   # (1,4),(2,5),(3,6)
map(str, [1,2,3])       # ['1','2','3']
filter(lambda x:x>2, [1,2,3,4])  # [3,4]
any([False,True,False])  # True
all([True,True,True])    # True
sorted([(1,'b'),(0,'a')], key=lambda x:x[0])  # by first element</pre>`
},
{
  title: 'Python OOP & Advanced Features',
  category: 'Python', order: 2,
  description: 'Classes, inheritance, decorators, generators, context managers',
  tags: ['OOP','Decorators','Generators','Classes','Python Advanced'],
  content: `<h2>Python OOP</h2>
<h3>Classes</h3>
<pre>class Animal:
    species = "Animal"  # class variable (shared)
    
    def __init__(self, name, age):
        self.name = name    # instance variable
        self.age = age
    
    def speak(self):       # instance method
        return f"{self.name} makes a sound"
    
    @classmethod
    def create(cls, name): # class method — can access class vars
        return cls(name, 0)
    
    @staticmethod
    def info():           # static method — no self or cls
        return "Animals are living beings"
    
    def __str__(self): return f"Animal({self.name})"  # print()
    def __repr__(self): return f"Animal({self.name!r}, {self.age})"  # repr()
    def __len__(self): return self.age
    def __eq__(self, other): return self.name == other.name</pre>

<h3>Inheritance & Polymorphism</h3>
<pre>class Dog(Animal):
    def __init__(self, name, age, breed):
        super().__init__(name, age)   # call parent __init__
        self.breed = breed
    
    def speak(self):  # override
        return f"{self.name} says Woof!"

class Cat(Animal):
    def speak(self):
        return f"{self.name} says Meow!"

# Polymorphism
animals = [Dog("Rex",3,"Lab"), Cat("Tom",5)]
for a in animals:
    print(a.speak())  # calls appropriate speak()

# Multiple inheritance
class Flyable: def fly(self): return "flying"
class FlyingDog(Dog, Flyable): pass  # MRO: C3 linearization</pre>

<h3>Properties</h3>
<pre>class Circle:
    def __init__(self, radius):
        self._radius = radius  # convention: _ means private
    
    @property
    def radius(self): return self._radius
    
    @radius.setter
    def radius(self, val):
        if val < 0: raise ValueError("Radius can't be negative")
        self._radius = val
    
    @property
    def area(self): return 3.14 * self._radius ** 2

c = Circle(5)
c.radius = 10  # uses setter
print(c.area)  # computed property</pre>

<h3>Decorators</h3>
<pre>import time

def timer(func):
    def wrapper(*args, **kwargs):
        start = time.time()
        result = func(*args, **kwargs)
        print(f"{func.__name__} took {time.time()-start:.2f}s")
        return result
    return wrapper

@timer  # same as: slow_function = timer(slow_function)
def slow_function():
    time.sleep(1)

# Practical decorators
def require_auth(func):
    def wrapper(user, *args):
        if not user.is_authenticated: raise PermissionError
        return func(user, *args)
    return wrapper</pre>

<h3>Generators</h3>
<pre># Generator function — uses yield, lazy evaluation
def fibonacci():
    a, b = 0, 1
    while True:
        yield a
        a, b = b, a + b

fib = fibonacci()
for _ in range(10): print(next(fib))  # 0,1,1,2,3,5,8,13,21,34

# Generator expression (like list comp but lazy)
gen = (x**2 for x in range(1000000))  # doesn't create list in memory
next(gen)  # 0</pre>

<h3>Context Managers</h3>
<pre>class DatabaseConnection:
    def __enter__(self):
        self.conn = connect_db()
        return self.conn
    def __exit__(self, exc_type, exc_val, exc_tb):
        self.conn.close()
        return False  # don't suppress exceptions

with DatabaseConnection() as db:
    db.query("SELECT * FROM users")</pre>`
},
{
  title: 'Python for DSA — Tips & Tricks',
  category: 'Python', order: 3,
  description: 'Python-specific tricks for coding interviews — heaps, deque, bisect, itertools',
  tags: ['heapq','deque','bisect','itertools','Python Tricks','Competitive'],
  content: `<h2>Python for Competitive Programming & DSA</h2>

<h3>heapq — Priority Queue / Heap</h3>
<pre>import heapq

# Min-heap (default)
h = [3,1,4,1,5,9]
heapq.heapify(h)          # in-place heap: [1,1,4,3,5,9]
heapq.heappush(h, 2)      # push element
heapq.heappop(h)          # pop smallest (1)
h[0]                      # peek smallest without popping

# Max-heap — negate values
maxh = [-x for x in [3,1,4,1,5]]
heapq.heapify(maxh)
-heapq.heappop(maxh)      # largest = 5

# K largest / K smallest
heapq.nlargest(3, [3,1,4,1,5,9,2,6])   # [9,6,5]
heapq.nsmallest(3, [3,1,4,1,5,9])       # [1,1,3]</pre>

<h3>collections.deque — O(1) both ends</h3>
<pre>from collections import deque

dq = deque([1,2,3])
dq.appendleft(0)    # [0,1,2,3]
dq.append(4)        # [0,1,2,3,4]
dq.popleft()        # returns 0 — O(1)!
dq.pop()            # returns 4
dq.rotate(1)        # [3,1,2]

# BFS template using deque
def bfs(start):
    q = deque([start]); visited = {start}
    while q:
        node = q.popleft()
        for nb in graph[node]:
            if nb not in visited:
                visited.add(nb); q.append(nb)</pre>

<h3>bisect — Binary Search on Sorted List</h3>
<pre>import bisect

a = [1,3,4,4,5,7]
bisect.bisect_left(a, 4)   # 2 — index to insert 4 (leftmost)
bisect.bisect_right(a, 4)  # 4 — index after all 4s
bisect.insort(a, 6)        # insert 6 maintaining sort: [1,3,4,4,5,6,7]

# Count elements less than x
bisect.bisect_left(a, x)   # count of elements < x</pre>

<h3>Useful Tricks</h3>
<pre># Two pointers template
def two_pointer(arr, target):
    l, r = 0, len(arr)-1
    while l < r:
        curr = arr[l] + arr[r]
        if curr == target: return [l, r]
        elif curr < target: l += 1
        else: r -= 1

# Sliding window template
def max_sum_subarray(arr, k):
    curr = sum(arr[:k]); best = curr
    for i in range(k, len(arr)):
        curr += arr[i] - arr[i-k]
        best = max(best, curr)
    return best

# DFS template
def dfs(node, visited=None):
    if visited is None: visited = set()
    visited.add(node)
    for nb in graph[node]:
        if nb not in visited: dfs(nb, visited)

# Read fast input (competitive programming)
import sys
input = sys.stdin.readline
n = int(input())

# Print without newline
print(*arr)         # space-separated
print(*arr, sep=',') # comma-separated</pre>

<h3>String Operations for DSA</h3>
<pre>from collections import Counter

# Anagram check
Counter("listen") == Counter("silent")  # True

# Check all chars in s2 exist in s1
set("abc").issubset(set("aabbcc"))  # True

# Sliding window for character problems
from collections import defaultdict
def has_all_chars(s, t):
    need = Counter(t); have = 0; req = len(need); win = defaultdict(int)
    l = 0
    for r, c in enumerate(s):
        win[c] += 1
        if c in need and win[c] == need[c]: have += 1
        while have == req:
            # valid window found
            win[s[l]] -= 1
            if s[l] in need and win[s[l]] < need[s[l]]: have -= 1
            l += 1</pre>`
},

// ══════════════════════════════════════════
// DSA THEORY NOTES
// ══════════════════════════════════════════
{
  title: 'Time & Space Complexity — Big O Guide',
  category: 'DSA', order: 1,
  description: 'Complete guide to analyzing algorithms — O(n), O(log n), O(n²) with examples',
  tags: ['Big O','Time Complexity','Space Complexity','Analysis'],
  content: `<h2>Time & Space Complexity Analysis</h2>

<h3>Big O Notation — What it means</h3>
<p>Big O describes how runtime/space grows as input size n grows. We drop constants and lower-order terms.</p>
<pre>O(1)       — Constant   — array access, HashMap get/put
O(log n)   — Logarithmic — binary search, balanced BST operations
O(n)       — Linear     — single loop, linear search
O(n log n) — Linearithmic — merge sort, heap sort, quick sort (avg)
O(n²)      — Quadratic  — nested loops, bubble/insertion sort
O(2^n)     — Exponential — recursive subsets, Fibonacci (naive)
O(n!)      — Factorial   — permutations, traveling salesman (brute)</pre>

<h3>How to Calculate Time Complexity</h3>
<pre>// O(n) — single loop
for(int i=0; i<n; i++) { ... }

// O(n²) — nested loops over same n
for(int i=0; i<n; i++)
    for(int j=0; j<n; j++) { ... }

// O(n*m) — nested loops over different sizes
for(int i=0; i<n; i++)
    for(int j=0; j<m; j++) { ... }

// O(log n) — halving the input each time
while(n > 1) { n /= 2; }

// O(n log n) — outer O(n), inner O(log n)
for(int i=0; i<n; i++)    // O(n)
    binarySearch(arr, i);  // O(log n)

// Recursion: T(n) = T(n/2) + O(1) → O(log n)  [binary search]
// Recursion: T(n) = 2T(n/2) + O(n) → O(n log n)  [merge sort]</pre>

<h3>Common Algorithms Complexity</h3>
<ul>
<li>Bubble Sort: O(n²) time, O(1) space</li>
<li>Selection Sort: O(n²) time, O(1) space</li>
<li>Insertion Sort: O(n²) worst, O(n) best (almost sorted)</li>
<li>Merge Sort: O(n log n) always, O(n) space</li>
<li>Quick Sort: O(n log n) avg, O(n²) worst, O(log n) space</li>
<li>Heap Sort: O(n log n) always, O(1) space</li>
<li>Binary Search: O(log n) time, O(1) space</li>
<li>BFS/DFS: O(V+E) time, O(V) space</li>
<li>Dijkstra (with heap): O((V+E) log V)</li>
</ul>

<h3>Space Complexity</h3>
<pre>// O(1) — no extra space based on n
int sum = 0;
for(int x : arr) sum += x;

// O(n) — extra array/list of size n
int[] copy = Arrays.copyOf(arr, n);

// O(h) — recursion stack depth h
// Tree DFS: O(h) where h = height = O(log n) balanced, O(n) skewed

// O(n) — HashMap storing all elements
Map&lt;Integer,Integer&gt; freq = new HashMap&lt;&gt;();</pre>

<h3>Amortized Analysis</h3>
<p>ArrayList.add() is O(1) amortized. Occasionally it doubles size (O(n)), but averaged across n operations, each is O(1).</p>

<h3>Best vs Average vs Worst Case</h3>
<ul>
<li>Quick Sort: Best O(n log n), Average O(n log n), Worst O(n²) — already sorted array</li>
<li>Binary Search: Always O(log n)</li>
<li>HashMap get: Average O(1), Worst O(n) — all keys hash to same bucket</li>
</ul>`
},
{
  title: 'Arrays — Complete Master Guide (Beginner to Advanced)',
  category: 'DSA', order: 10,
  description: 'All array patterns, problems, and interview tricks',
  tags: ['Arrays','DSA','Patterns'],
  content: `<h2>Arrays — Complete Guide</h2>

<h3>Basics</h3>
<p>Contiguous memory, O(1) access using index</p>

<h3>Important Patterns</h3>

<h4>1. Two Pointer</h4>
<pre>
int l=0, r=arr.length-1;
while(l<r){
    if(arr[l]+arr[r]==target) return true;
    else if(arr[l]+arr[r]<target) l++;
    else r--;
}
</pre>

<h4>2. Sliding Window</h4>
<pre>
int sum=0;
for(int i=0;i<k;i++) sum+=arr[i];
int max=sum;

for(int i=k;i<arr.length;i++){
    sum+=arr[i]-arr[i-k];
    max=Math.max(max,sum);
}
</pre>

<h4>3. Prefix Sum</h4>
<pre>
prefix[0]=arr[0];
for(int i=1;i<n;i++)
 prefix[i]=prefix[i-1]+arr[i];
</pre>

<h3>Important Questions</h3>

<h4>Q1: Two Sum</h4>
<pre>
Map<Integer,Integer> map=new HashMap<>();
for(int i=0;i<n;i++){
 if(map.containsKey(target-arr[i])) return true;
 map.put(arr[i],i);
}
</pre>

<h4>Q2: Kadane's Algorithm (Max Subarray)</h4>
<pre>
int max=arr[0], curr=0;
for(int x:arr){
 curr=Math.max(x,curr+x);
 max=Math.max(max,curr);
}
</pre>

<h4>Q3: Dutch National Flag (0,1,2 sort)</h4>
<pre>
int l=0,m=0,h=n-1;
while(m<=h){
 if(arr[m]==0) swap(l++,m++);
 else if(arr[m]==1) m++;
 else swap(m,h--);
}
</pre>

<h3>Edge Cases</h3>
<ul>
<li>Empty array</li>
<li>All negative numbers</li>
<li>Large input (overflow)</li>
</ul>

<h3>Interview Tips</h3>
<ul>
<li>Try brute → optimize</li>
<li>Use HashMap for lookup</li>
<li>Sliding window for subarrays</li>
</ul>`
},
{
  title: 'Strings — Complete DSA Guide (Patterns + Questions)',
  category: 'DSA', order: 11,
  description: 'String algorithms, patterns, and interview problems',
  tags: ['Strings','DSA'],
  content: `<h2>Strings — Complete Guide</h2>

<h3>Basics</h3>
<p>Strings are immutable in Java</p>

<h3>Patterns</h3>

<h4>1. Sliding Window</h4>
<pre>
Map<Character,Integer> map=new HashMap<>();
int l=0;
for(int r=0;r<s.length();r++){
 map.put(s.charAt(r),map.getOrDefault(s.charAt(r),0)+1);
 while(map.size()>k){
   map.put(s.charAt(l),map.get(s.charAt(l))-1);
   if(map.get(s.charAt(l))==0) map.remove(s.charAt(l));
   l++;
 }
}
</pre>

<h4>2. Frequency Count</h4>
<pre>
int[] freq=new int[26];
for(char c:s.toCharArray()) freq[c-'a']++;
</pre>

<h3>Important Questions</h3>

<h4>Q1: Valid Anagram</h4>
<pre>
Arrays.sort(a);
Arrays.sort(b);
return Arrays.equals(a,b);
</pre>

<h4>Q2: Longest Substring Without Repeating</h4>
<pre>
Set<Character> set=new HashSet<>();
int l=0,max=0;
for(int r=0;r<s.length();r++){
 while(set.contains(s.charAt(r))) set.remove(s.charAt(l++));
 set.add(s.charAt(r));
 max=Math.max(max,r-l+1);
}
</pre>

<h4>Q3: Palindrome</h4>
<pre>
int l=0,r=s.length()-1;
while(l<r){
 if(s.charAt(l)!=s.charAt(r)) return false;
 l++; r--;
}
</pre>

<h3>Advanced Topics</h3>
<ul>
<li>KMP Algorithm</li>
<li>Z Algorithm</li>
<li>Rolling Hash</li>
</ul>

<h3>Interview Tips</h3>
<ul>
<li>Use sliding window</li>
<li>Use char array for speed</li>
<li>Edge cases: empty, single char</li>
</ul>`
},
{
  title: 'Stack — Complete Guide (All Patterns + Questions)',
  category: 'DSA', order: 12,
  description: 'Stack problems, monotonic stack, interview questions',
  tags: ['Stack','DSA'],
  content: `<h2>Stack — Complete Guide</h2>

<h3>Basics</h3>
<p>LIFO (Last In First Out)</p>

<h3>Operations</h3>
<pre>
Stack<Integer> st=new Stack<>();
st.push(1);
st.pop();
st.peek();
</pre>

<h3>Important Patterns</h3>

<h4>1. Monotonic Stack</h4>
<pre>
Stack<Integer> st=new Stack<>();
for(int i=0;i<n;i++){
 while(!st.isEmpty() && arr[st.peek()]<arr[i])
   st.pop();
 st.push(i);
}
</pre>

<h4>2. Next Greater Element</h4>
<pre>
int[] res=new int[n];
Stack<Integer> st=new Stack<>();
for(int i=n-1;i>=0;i--){
 while(!st.isEmpty() && st.peek()<=arr[i]) st.pop();
 res[i]=st.isEmpty()?-1:st.peek();
 st.push(arr[i]);
}
</pre>

<h4>3. Valid Parentheses</h4>
<pre>
Stack<Character> st=new Stack<>();
for(char c:s.toCharArray()){
 if(c=='(') st.push(c);
 else{
  if(st.isEmpty()) return false;
  st.pop();
 }
}
return st.isEmpty();
</pre>

<h3>Important Questions</h3>
<ul>
<li>Largest Rectangle in Histogram</li>
<li>Min Stack</li>
<li>Evaluate Postfix Expression</li>
</ul>

<h3>Min Stack Implementation</h3>
<pre>
Stack<Integer> st=new Stack<>();
Stack<Integer> minSt=new Stack<>();

void push(int x){
 st.push(x);
 if(minSt.isEmpty() || x<=minSt.peek()) minSt.push(x);
}
</pre>

<h3>Interview Tips</h3>
<ul>
<li>Use stack for "next greater/smaller"</li>
<li>Parentheses → always stack</li>
<li>Think in reverse for problems</li>
</ul>`
},
{
  title: 'DBMS — Complete Notes',
  category: 'Core CS', order: 7,
  description: 'Normalization, Keys, Transactions, Indexing',
  tags: ['DBMS','SQL','Normalization','Transactions'],
  content: `<h2>DBMS Concepts</h2>

<h3>Keys</h3>
<ul>
<li>Primary Key — unique</li>
<li>Foreign Key — reference</li>
<li>Candidate Key</li>
<li>Super Key</li>
</ul>

<h3>Normalization</h3>
<ul>
<li>1NF — no repeating groups</li>
<li>2NF — no partial dependency</li>
<li>3NF — no transitive dependency</li>
</ul>

<h3>Transactions</h3>
<ul>
<li>ACID properties (already covered)</li>
<li>Commit & Rollback</li>
</ul>

<h3>Indexing</h3>
<ul>
<li>Improves search speed</li>
<li>B-Tree index most common</li>
</ul>

<h3>Joins</h3>
<ul>
<li>Inner Join</li>
<li>Left Join</li>
<li>Right Join</li>
<li>Full Join</li>
</ul>`
},

{
  title: 'Computer Networks — Quick Notes',
  category: 'Core CS', order: 8,
  description: 'OSI Model, TCP/IP, HTTP, DNS',
  tags: ['CN','OSI','TCP','HTTP','DNS'],
  content: `<h2>Computer Networks</h2>

<h3>OSI Model (7 Layers)</h3>
<pre>
Application
Presentation
Session
Transport
Network
Data Link
Physical
</pre>

<h3>TCP vs UDP</h3>
<ul>
<li>TCP — reliable, slow</li>
<li>UDP — fast, no guarantee</li>
</ul>

<h3>HTTP Methods</h3>
<ul>
<li>GET — fetch data</li>
<li>POST — send data</li>
<li>PUT — update</li>
<li>DELETE — remove</li>
</ul>

<h3>DNS</h3>
<p>Converts domain → IP address</p>

<h3>Important Questions</h3>
<ul>
<li>What happens when you type google.com?</li>
<li>Difference HTTP vs HTTPS?</li>
</ul>`
},
{
  title: 'System Design Basics',
  category: 'System Design', order: 1,
  description: 'Scalability, Load Balancer, Caching',
  tags: ['System Design','Scalability','Cache','Load Balancer'],
  content: `<h2>System Design Basics</h2>

<h3>Scalability</h3>
<ul>
<li>Vertical Scaling</li>
<li>Horizontal Scaling</li>
</ul>

<h3>Load Balancer</h3>
<p>Distributes traffic across servers</p>

<h3>Caching</h3>
<ul>
<li>Redis, Memcached</li>
<li>Reduces DB load</li>
</ul>

<h3>Database Scaling</h3>
<ul>
<li>Sharding</li>
<li>Replication</li>
</ul>

<h3>CAP Theorem</h3>
<ul>
<li>Consistency</li>
<li>Availability</li>
<li>Partition Tolerance</li>
</ul>`
},
{
  title: 'Trees — Complete Theory & Traversals',
  category: 'DSA', order: 2,
  description: 'Binary trees, BST, AVL, heaps — all traversals and key operations',
  tags: ['Binary Tree','BST','Traversals','Heap','Inorder','BFS','DFS'],
  content: `<h2>Trees — Complete Guide</h2>

<h3>Key Terms</h3>
<ul>
<li>Root: topmost node</li>
<li>Leaf: node with no children</li>
<li>Height: longest path from root to leaf</li>
<li>Depth: path length from root to node</li>
<li>Complete Binary Tree: all levels full except last (filled left to right)</li>
<li>Full Binary Tree: every node has 0 or 2 children</li>
<li>Perfect Binary Tree: all internal nodes have 2 children, all leaves at same level</li>
</ul>

<h3>Tree Traversals</h3>
<pre>// Inorder (Left → Root → Right) — gives sorted order for BST
void inorder(TreeNode root) {
    if(root==null) return;
    inorder(root.left);
    System.out.print(root.val + " ");
    inorder(root.right);
}

// Preorder (Root → Left → Right) — used to copy tree
void preorder(TreeNode root) {
    if(root==null) return;
    System.out.print(root.val + " ");
    preorder(root.left);
    preorder(root.right);
}

// Postorder (Left → Right → Root) — used to delete tree
void postorder(TreeNode root) {
    if(root==null) return;
    postorder(root.left);
    postorder(root.right);
    System.out.print(root.val + " ");
}

// Level Order (BFS) — breadth first
void levelOrder(TreeNode root) {
    Queue&lt;TreeNode&gt; q = new LinkedList&lt;&gt;();
    q.offer(root);
    while(!q.isEmpty()) {
        TreeNode n = q.poll();
        System.out.print(n.val + " ");
        if(n.left!=null) q.offer(n.left);
        if(n.right!=null) q.offer(n.right);
    }
}</pre>

<h3>Binary Search Tree (BST)</h3>
<p>For every node: left subtree values < node < right subtree values.</p>
<pre>// BST Search — O(log n) balanced, O(n) skewed
TreeNode search(TreeNode root, int val) {
    if(root==null || root.val==val) return root;
    if(val < root.val) return search(root.left, val);
    return search(root.right, val);
}

// BST Insert
TreeNode insert(TreeNode root, int val) {
    if(root==null) return new TreeNode(val);
    if(val < root.val) root.left = insert(root.left, val);
    else root.right = insert(root.right, val);
    return root;
}</pre>

<h3>Heap (Binary Heap)</h3>
<ul>
<li>Min-Heap: parent ≤ children. Root is minimum element.</li>
<li>Max-Heap: parent ≥ children. Root is maximum element.</li>
<li>Complete binary tree stored in array. Parent of i = (i-1)/2, Children of i = 2i+1, 2i+2</li>
<li>Insert: add at end, bubble up — O(log n)</li>
<li>Delete min/max: replace root with last, bubble down — O(log n)</li>
<li>Build heap from array: O(n)</li>
</ul>

<h3>Common Tree Problems Pattern</h3>
<pre>// Most tree problems = DFS recursion
// Template:
int solve(TreeNode root) {
    if(root == null) return BASE_CASE;
    int left = solve(root.left);
    int right = solve(root.right);
    return COMBINE(left, right, root.val);
}

// Examples:
// Max depth: return 1 + max(left, right)
// Min depth: return 1 + min(left, right) — careful with null
// Diameter: maxPath = max(maxPath, left+right); return 1+max(left,right)
// Is balanced: return abs(leftH-rightH)<=1 && isBalanced(left) && isBalanced(right)</pre>`
},
{
  title: 'Graphs — BFS, DFS, Dijkstra',
  category: 'DSA', order: 3,
  description: 'Graph representations, BFS, DFS, shortest path, cycle detection',
  tags: ['Graphs','BFS','DFS','Dijkstra','Topological Sort','Cycle Detection'],
  content: `<h2>Graphs — Complete Guide</h2>

<h3>Graph Representations</h3>
<pre>// Adjacency List (most common — space efficient for sparse graphs)
// n nodes, edges as pairs
int n = 5;
List&lt;List&lt;Integer&gt;&gt; adj = new ArrayList&lt;&gt;();
for(int i=0;i<n;i++) adj.add(new ArrayList&lt;&gt;());
adj.get(0).add(1);  // edge 0→1
adj.get(1).add(2);  // edge 1→2

// Adjacency Matrix (for dense graphs, O(1) edge check)
int[][] matrix = new int[n][n];
matrix[0][1] = 1;  // edge 0→1

// Weighted adjacency list
List&lt;int[]&gt;[] wAdj = new List[n];
wAdj[0].add(new int[]{1, 5});  // node 1, weight 5</pre>

<h3>BFS — Breadth First Search</h3>
<pre>// Use: shortest path (unweighted), level order, connected components
void bfs(List&lt;List&lt;Integer&gt;&gt; adj, int start) {
    boolean[] visited = new boolean[adj.size()];
    Queue&lt;Integer&gt; q = new LinkedList&lt;&gt;();
    q.offer(start); visited[start]=true;
    while(!q.isEmpty()) {
        int node = q.poll();
        System.out.print(node + " ");
        for(int nb : adj.get(node))
            if(!visited[nb]) { visited[nb]=true; q.offer(nb); }
    }
}

// BFS shortest path
int[] bfsDistance(int start, int n) {
    int[] dist = new int[n]; Arrays.fill(dist,-1); dist[start]=0;
    Queue&lt;Integer&gt; q = new LinkedList&lt;&gt;(); q.offer(start);
    while(!q.isEmpty()) {
        int u=q.poll();
        for(int v:adj.get(u)) if(dist[v]==-1){dist[v]=dist[u]+1;q.offer(v);}
    }
    return dist;
}</pre>

<h3>DFS — Depth First Search</h3>
<pre>void dfs(int node, boolean[] visited, List&lt;List&lt;Integer&gt;&gt; adj) {
    visited[node]=true;
    System.out.print(node + " ");
    for(int nb : adj.get(node))
        if(!visited[nb]) dfs(nb, visited, adj);
}

// Cycle detection (undirected)
boolean hasCycle(int v, int parent, boolean[] vis) {
    vis[v]=true;
    for(int nb:adj.get(v)){
        if(!vis[nb]){ if(hasCycle(nb,v,vis)) return true; }
        else if(nb!=parent) return true;
    }
    return false;
}</pre>

<h3>Topological Sort (Directed Acyclic Graph)</h3>
<pre>// Use: course prerequisites, build order, task scheduling
// Kahn's Algorithm (BFS-based)
int[] topoSort(int n, int[][] edges) {
    int[] inDeg=new int[n];
    List&lt;List&lt;Integer&gt;&gt; adj=new ArrayList&lt;&gt;();
    for(int i=0;i<n;i++) adj.add(new ArrayList&lt;&gt;());
    for(int[] e:edges){ adj.get(e[0]).add(e[1]); inDeg[e[1]]++; }
    Queue&lt;Integer&gt; q=new LinkedList&lt;&gt;();
    for(int i=0;i<n;i++) if(inDeg[i]==0) q.offer(i);
    int[] order=new int[n]; int idx=0;
    while(!q.isEmpty()){
        int u=q.poll(); order[idx++]=u;
        for(int v:adj.get(u)) if(--inDeg[v]==0) q.offer(v);
    }
    return idx==n?order:new int[0];  // empty if cycle
}</pre>

<h3>Dijkstra's Algorithm (Shortest Path — Weighted)</h3>
<pre>int[] dijkstra(int src, int n, List&lt;int[]&gt;[] adj) {
    int[] dist=new int[n]; Arrays.fill(dist,Integer.MAX_VALUE); dist[src]=0;
    // {distance, node}
    PriorityQueue&lt;int[]&gt; pq=new PriorityQueue&lt;&gt;((a,b)->a[0]-b[0]);
    pq.offer(new int[]{0,src});
    while(!pq.isEmpty()){
        int[] curr=pq.poll(); int d=curr[0],u=curr[1];
        if(d>dist[u]) continue;  // stale entry
        for(int[] nb:adj[u]){
            int v=nb[0],w=nb[1];
            if(dist[u]+w < dist[v]){ dist[v]=dist[u]+w; pq.offer(new int[]{dist[v],v}); }
        }
    }
    return dist;
}</pre>`
},
{
  title: 'Recursion & Dynamic Programming Patterns',
  category: 'DSA', order: 4,
  description: 'Memoization, tabulation, common DP patterns — fibonacci to knapsack',
  tags: ['Recursion','DP','Memoization','Tabulation','Patterns'],
  content: `<h2>Recursion & Dynamic Programming</h2>

<h3>Recursion — 3 Laws</h3>
<ol>
<li>Must have a base case (stopping condition)</li>
<li>Must call itself (recursive case)</li>
<li>Must move toward base case</li>
</ol>
<pre>// Fibonacci — naive O(2^n)
int fib(int n) {
    if(n<=1) return n;
    return fib(n-1) + fib(n-2);  // many repeated calls!
}

// With memoization — O(n)
int[] memo = new int[n+1]; Arrays.fill(memo,-1);
int fib(int n) {
    if(n<=1) return n;
    if(memo[n]!=-1) return memo[n];
    return memo[n] = fib(n-1) + fib(n-2);
}</pre>

<h3>Top-Down vs Bottom-Up</h3>
<pre>// Top-Down (Memoization) — recursive + cache
Map&lt;Integer,Integer&gt; cache = new HashMap&lt;&gt;();
int fib(int n) {
    if(n<=1) return n;
    if(cache.containsKey(n)) return cache.get(n);
    int res = fib(n-1)+fib(n-2);
    cache.put(n,res);
    return res;
}

// Bottom-Up (Tabulation) — iterative, fill table
int[] fibDP(int n) {
    int[] dp = new int[n+1];
    dp[0]=0; dp[1]=1;
    for(int i=2;i<=n;i++) dp[i]=dp[i-1]+dp[i-2];
    return dp[n];
}
// Space optimized
int fib(int n) { int a=0,b=1; for(int i=2;i<=n;i++){int c=a+b;a=b;b=c;} return b; }</pre>

<h3>Common DP Patterns</h3>
<p><strong>1. Linear DP (1D)</strong> — depends on previous 1 or 2 states</p>
<ul><li>Climbing stairs, House Robber, Fibonacci variants</li></ul>

<p><strong>2. Grid/2D DP</strong> — depends on cell above and left</p>
<pre>// Unique paths in grid
int uniquePaths(int m, int n) {
    int[][] dp = new int[m][n];
    for(int[] row : dp) Arrays.fill(row,1);  // first row and col = 1
    for(int i=1;i<m;i++) for(int j=1;j<n;j++) dp[i][j]=dp[i-1][j]+dp[i][j-1];
    return dp[m-1][n-1];
}</pre>

<p><strong>3. String DP</strong> — LCS, Edit Distance, palindromes</p>
<pre>// Edit Distance (Levenshtein)
int editDistance(String a, String b) {
    int m=a.length(),n=b.length();
    int[][] dp=new int[m+1][n+1];
    for(int i=0;i<=m;i++) dp[i][0]=i;
    for(int j=0;j<=n;j++) dp[0][j]=j;
    for(int i=1;i<=m;i++) for(int j=1;j<=n;j++) {
        if(a.charAt(i-1)==b.charAt(j-1)) dp[i][j]=dp[i-1][j-1];
        else dp[i][j]=1+Math.min(dp[i-1][j-1],Math.min(dp[i-1][j],dp[i][j-1]));
    }
    return dp[m][n];
}</pre>



<p><strong>4. Knapsack DP</strong> — include/exclude items</p>
<p>0/1 Knapsack, Subset Sum, Coin Change, Target Sum</p>

<p><strong>5. Tree DP</strong> — compute from children up to root</p>
<p>Diameter, max path sum, tree DP problems</p>

<h3>When to Use DP</h3>
<ul>
<li>Overlapping subproblems (same subproblems computed multiple times)</li>
<li>Optimal substructure (optimal solution contains optimal solutions to subproblems)</li>
<li>Keywords: minimum/maximum, count ways, is it possible, longest/shortest</li>
</ul>`
},

// ══════════════════════════════════════════
// APTITUDE NOTES
// ══════════════════════════════════════════
{
  title: 'Quantitative Aptitude — Formulas & Tricks',
  category: 'Aptitude', order: 1,
  description: 'All QA formulas for TCS, Infosys, Wipro — percentages, profit/loss, time-work',
  tags: ['Aptitude','Quant','Percentage','Profit Loss','Time Work','Speed Distance'],
  content: `<h2>Quantitative Aptitude — Complete Formula Sheet</h2>

<h3>Percentages</h3>
<pre>x% of y = (x/100) × y
% increase = (increase/original) × 100
% decrease = (decrease/original) × 100

If A is x% more than B → B is [x/(100+x)]×100% less than A
If A is x% less than B → B is [x/(100-x)]×100% more than A

Successive % change: a% then b% = a+b+(ab/100)%
Example: 10% increase then 10% decrease = 10+(-10)+(10×-10/100) = -1% (net decrease)

Population formula: P(1 ± r/100)^n</pre>

<h3>Profit & Loss</h3>
<pre>Profit = SP - CP        Loss = CP - SP
Profit% = (Profit/CP) × 100
SP = CP × (100+Profit%)/100    CP = SP × 100/(100+Profit%)
SP = CP × (100-Loss%)/100      CP = SP × 100/(100-Loss%)

Marked Price (MP), Discount: SP = MP × (100-Discount%)/100

Dishonest shopkeeper: true weight = w, sells wt g less → gain% = (error/(true weight-error))×100
Two articles sold at same price: one at x% profit, one at x% loss → always LOSS of (x/10)²%</pre>

<h3>Simple & Compound Interest</h3>
<pre>SI = (P × R × T)/100
CI = P(1 + R/100)^T - P
CI - SI (2 years) = P(R/100)²
CI - SI (3 years) = P(R/100)²(R/100 + 3)

Doubling time (Rule of 72): Years = 72/Rate</pre>

<h3>Time, Speed & Distance</h3>
<pre>Distance = Speed × Time
Average Speed = 2xy/(x+y)  [when equal distances at x and y speed]

Relative speed (same direction) = |s1-s2|
Relative speed (opposite direction) = s1+s2

Train problems:
Time to cross a pole/person = Length of train / Speed of train
Time to cross a platform = (Length of train + platform) / Speed of train
Time for two trains to cross each other = (L1+L2) / (S1+S2 or |S1-S2|)

Convert: km/h to m/s → multiply by 5/18
        m/s to km/h → multiply by 18/5</pre>

<h3>Time & Work</h3>
<pre>If A does work in a days → A's 1 day work = 1/a
If A and B together finish in n days → 1/a + 1/b = 1/n
n = ab/(a+b)

If A is twice as fast as B: If B takes x days, A takes x/2 days
Pipes and Cisterns: inlet adds, outlet subtracts

Work done = (men × days × hours/day) / work
M1×D1×H1/W1 = M2×D2×H2/W2  [work equivalence formula]</pre>

<h3>Ratio & Proportion, Mixtures</h3>
<pre>a:b = c:d → ad = bc (cross multiplication)
If a:b = c:d, then (a+b):(a-b) = (c+d):(c-d)  [componendo-dividendo]

Alligation method:
Cheaper (C)         Dearer (D)
      \             /
       Mean Price (M)
      /             \
  (D-M)           (M-C)
Ratio of mixture = (D-M):(M-C)</pre>

<h3>Number System</h3>
<pre>Divisibility rules:
2: last digit even
3: sum of digits divisible by 3
4: last two digits divisible by 4
5: ends in 0 or 5
6: divisible by both 2 and 3
8: last three digits divisible by 8
9: sum of digits divisible by 9
11: (sum of odd positions - sum of even positions) divisible by 11

LCM × HCF = Product of two numbers

Unit digit patterns:
2: cycles 2,4,8,6 (period 4)
3: cycles 3,9,7,1 (period 4)
7: cycles 7,9,3,1 (period 4)
Any number ending 0,1,5,6: unit digit stays same</pre>

<h3>Permutations & Combinations</h3>
<pre>nPr = n!/(n-r)!     [arrangements — order matters]
nCr = n!/[r!(n-r)!] [selections — order doesn't matter]

nCr = nCn-r
nC0 = nCn = 1

Circular arrangement: (n-1)!
With identical objects: n!/(p!×q!×r!...)

Probability = Favourable outcomes / Total outcomes
P(A∪B) = P(A)+P(B)-P(A∩B)
P(A∩B) = P(A)×P(B) [if independent]</pre>`
},
{
  title: 'HR Interview & Resume Guide',
  category: 'Placement', order: 1,
  description: 'HR questions + resume tips',
  tags: ['HR','Interview','Resume'],
  content: `<h2>HR Interview Questions</h2>

<ul>
<li>Tell me about yourself</li>
<li>Why should we hire you?</li>
<li>Strengths & weaknesses</li>
<li>Where do you see yourself in 5 years?</li>
</ul>

<h3>Tips</h3>
<ul>
<li>Keep intro 1–2 min</li>
<li>Use STAR method</li>
<li>Be honest</li>
</ul>

<h3>Resume Tips</h3>
<ul>
<li>Keep 1 page</li>
<li>Use bullet points</li>
<li>Add projects with tech stack</li>
<li>Quantify achievements</li>
</ul>`
},
{
  title: 'Number Series & Pattern Recognition',
  category: 'Aptitude', order: 3,
  description: 'All types of number series patterns with tricks',
  tags: ['Series','Pattern','Numbers'],
  content: `<h2>Number Series — Complete Guide</h2>

<h3>Types of Series</h3>
<ul>
<li>Arithmetic (AP): +d → 2,5,8,11 (+3)</li>
<li>Geometric (GP): ×r → 2,6,18,54 (×3)</li>
<li>Squares: 1,4,9,16,25</li>
<li>Cubes: 1,8,27,64</li>
<li>Fibonacci: 1,1,2,3,5,8</li>
</ul>

<h3>Advanced Patterns</h3>
<ul>
<li>Alternate pattern: 2,5,4,7,6,9 → +3, -1 repeat</li>
<li>Prime numbers: 2,3,5,7,11</li>
<li>Factorial: 1,2,6,24,120</li>
<li>Mixed: 2,6,7,21,22,66 → ×3, +1</li>
</ul>

<h3>Tricks</h3>
<ul>
<li>Check difference → if not constant, check second difference</li>
<li>Check ratio</li>
<li>Check alternating patterns</li>
<li>Check square/cube relation</li>
</ul>`
},
{
  title: 'Probability — Complete Guide',
  category: 'Aptitude', order: 4,
  description: 'Basic to advanced probability concepts',
  tags: ['Probability','Math'],
  content: `<h2>Probability</h2>

<h3>Formula</h3>
<pre>P(A) = Favourable / Total</pre>

<h3>Important Concepts</h3>
<ul>
<li>Independent events: P(A∩B)=P(A)×P(B)</li>
<li>Mutually exclusive: P(A∩B)=0</li>
<li>Complement: P(A')=1-P(A)</li>
</ul>

<h3>Examples</h3>
<pre>Coin toss:
P(Head)=1/2

Dice:
P(6)=1/6
P(even)=3/6=1/2

Cards:
P(Ace)=4/52</pre>

<h3>Interview Questions</h3>
<ul>
<li>At least one head → use complement</li>
<li>Two dice sum = 7</li>
</ul>`
},
{
  title: 'Data Interpretation — Tricks',
  category: 'Aptitude', order: 6,
  description: 'DI shortcuts for fast calculation',
  tags: ['DI','Graphs','Charts'],
  content: `<h2>Data Interpretation</h2>

<h3>Types</h3>
<ul>
<li>Bar Graph</li>
<li>Pie Chart</li>
<li>Table</li>
<li>Line Graph</li>
</ul>

<h3>Speed Tricks</h3>
<ul>
<li>Approximate values</li>
<li>Use ratios instead of division</li>
<li>Memorize percentages (1/2=50%, 1/4=25%)</li>
</ul>

<h3>Important Formulas</h3>
<pre>% change = (new-old)/old × 100</pre>

<h3>Tip</h3>
<p>Don't calculate everything — only what question asks</p>`
},
{
  title: 'Simplification & Approximation',
  category: 'Aptitude', order: 7,
  description: 'Fast calculation tricks',
  tags: ['Math Tricks','Speed Math'],
  content: `<h2>Simplification</h2>

<h3>BODMAS</h3>
<p>Bracket → Order → Division → Multiplication → Addition → Subtraction</p>

<h3>Tricks</h3>
<ul>
<li>Round numbers: 498 ≈ 500</li>
<li>Use identities:
(a+b)^2 = a^2 + b^2 + 2ab</li>
<li>Multiplication shortcut:
25×25 = 625</li>
</ul>

<h3>Approximation</h3>
<ul>
<li>499×21 ≈ 500×21 = 10500</li>
<li>Use nearest base values</li>
</ul>`
},
{
  title: 'Time, Speed & Distance — Practice + Concepts',
  category: 'Aptitude', order: 8,
  description: 'Concepts with solved and practice questions',
  tags: ['Speed','Distance','Time'],
  content: `<h2>Time, Speed & Distance</h2>

<h3>Core Formula</h3>
<pre>Speed = Distance / Time</pre>

<h3>Concept</h3>
<ul>
<li>If speed doubles → time halves</li>
<li>Average speed ≠ (s1+s2)/2 (use formula)</li>
</ul>

<h3>Question 1</h3>
<p>A train travels 60 km in 1 hour. What is its speed in m/s?</p>
<pre>Solution:
60 × (5/18) = 16.67 m/s</pre>

<h3>Question 2</h3>
<p>A man travels 30 km at 60 km/h and 30 km at 30 km/h. Find avg speed.</p>
<pre>Solution:
Avg speed = 2xy/(x+y) = (2×60×30)/(60+30) = 40 km/h</pre>

<h3>Practice</h3>
<ul>
<li>Find time if distance=120km, speed=40 km/h</li>
<li>Two trains cross each other — formula apply</li>
</ul>`
},
{
  title: 'Time & Work — Concepts + Questions',
  category: 'Aptitude', order: 9,
  description: 'Work efficiency + problems',
  tags: ['Work','Efficiency'],
  content: `<h2>Time & Work</h2>

<h3>Concept</h3>
<pre>If A does work in 10 days → 1 day work = 1/10</pre>

<h3>Question 1</h3>
<p>A can do work in 10 days, B in 20 days. Together?</p>
<pre>1/10 + 1/20 = 3/20
Total days = 20/3 = 6.67 days</pre>

<h3>Question 2</h3>
<p>A is twice as fast as B. B takes 20 days. Find A.</p>
<pre>A = 10 days</pre>

<h3>Practice</h3>
<ul>
<li>Pipes & cisterns questions</li>
<li>Men-days problems</li>
</ul>`
},
{
  title: 'Profit & Loss — Interview Questions',
  category: 'Aptitude', order: 10,
  description: 'All tricks with examples',
  tags: ['Profit','Loss'],
  content: `<h2>Profit & Loss</h2>

<h3>Formulas</h3>
<pre>Profit = SP - CP</pre>

<h3>Question 1</h3>
<p>CP=100, SP=120 → profit %?</p>
<pre>(20/100)*100 = 20%</pre>

<h3>Question 2</h3>
<p>Two items sold at same price, one 10% profit, one 10% loss → result?</p>
<pre>Always LOSS = (10/10)^2 = 1%</pre>

<h3>Practice</h3>
<ul>
<li>Marked price & discount</li>
<li>Successive discount</li>
</ul>`
},
{
  title: 'Logical Reasoning & Verbal Ability',
  category: 'Aptitude', order: 2,
  description: 'Syllogisms, blood relations, coding-decoding, seating arrangement patterns',
  tags: ['Logical Reasoning','Syllogisms','Blood Relations','Coding Decoding','Seating'],
  content: `<h2>Logical Reasoning — Complete Guide</h2>

<h3>Syllogisms</h3>
<p>Two premises → one conclusion. Draw Venn diagrams for each combination.</p>
<pre>Universal Positive:  "All A are B"     → A circle inside B
Universal Negative:  "No A is B"       → A and B circles separate
Particular Positive: "Some A are B"    → A and B circles overlap
Particular Negative: "Some A are not B"→ A circle, part outside B

Key rules:
1. Two negative premises → no definite conclusion
2. Two particular premises → no definite conclusion  
3. If one premise negative → conclusion is negative
4. Conclusion can't be stronger than weakest premise

Example:
All dogs are animals. All animals are mammals.
→ Conclusion: All dogs are mammals. ✓</pre>

<h3>Blood Relations</h3>
<pre>Remember using a table:

Relation Chart:
Parent's parent = Grandparent
Sibling's child = Nephew/Niece
Parent's sibling = Uncle/Aunt
Cousin = Children of Uncle/Aunt
Spouse's parent = In-laws

Trick: Draw family tree for complex problems
"A is son of B's father's only daughter" = A is B's son (B is mother, sister of no one)</pre>

<h3>Coding-Decoding</h3>
<pre>Letter Coding:
A=1, B=2, C=3 ... Z=26
Reverse: A=26, B=25 ... Z=1

Common patterns:
FACE → ECBD (each letter -1 shifted)
COLD → EMPH (each letter +2 shifted)
ABC → ZYX (reverse alphabet)

Position in opposite order: A(1)=Z, B(2)=Y, C(3)=X → A+Z=27, B+Y=27

Number coding:
APPLE=1 → count letters (5≠1) → try other patterns
BOOK=2 → B+O+O+K = 2+15+15+11=43... try vowel count (2 vowels = 2) ✓</pre>

<h3>Seating Arrangement</h3>
<pre>Circular arrangement:
- Fix one person (eliminates equivalent rotations)
- Arrange remaining (n-1)!
- Clockwise ≠ anticlockwise (multiply by 2 if both considered same)

Linear arrangement:
- Fix constraints first
- Place remaining in remaining spots

Tips:
1. Draw circles/lines
2. Start with most constrained person
3. Use process of elimination
4. Check at end if all conditions satisfied</pre>

<h3>Series & Patterns</h3>
<pre>Number series types:
+ d series:    2, 5, 8, 11 → +3 each time (AP)
×r series:     2, 6, 18, 54 → ×3 (GP)
Squares:       1, 4, 9, 16, 25
Cubes:         1, 8, 27, 64
Fibonacci:     1, 1, 2, 3, 5, 8, 13, 21
Two-step:      1, 2, 3, 5, 8, 13 (each = sum of prev two)
Alternating:   2, 3, 6, 7, 14, 15 → ×2, +1, ×2, +1...

Difference method: find diff, then diff of diff (find pattern at some level)</pre>

<h3>Data Interpretation Tips</h3>
<pre>Bar graph: read scale carefully, estimate % change
Pie chart: x% of total = x/100 × total value
Table: identify row/col quickly, calculate only what's asked

Key calculations:
% change = (new-old)/old × 100
Ratio comparison: cross multiply instead of dividing
Approximation: round to nearest 5 or 10 for speed</pre>

<h3>Verbal Ability — Quick Tips</h3>
<ul>
<li>Sentence Completion: look for tone (positive/negative), grammatical subject agreement</li>
<li>Error Detection: check subject-verb agreement, tense consistency, articles (a/an/the)</li>
<li>Para Jumbles: find opening sentence (no pronoun reference), find pairs of sentences that connect, find last sentence (no dangling reference)</li>
<li>Reading Comprehension: skim first, read questions, then search for answers</li>
<li>Vocabulary: context clues help more than memorizing word lists</li>
</ul>`
}
];

async function seedNotes() {
  await mongoose.connect(process.env.MONGO_URI);
  console.log('✅ Connected to MongoDB');
  const { Note } = require('./models/Content');
  await Note.deleteMany({});
  console.log('🗑️  Cleared existing notes');
  const inserted = await Note.insertMany(notes);
  console.log(`✅ Inserted ${inserted.length} notes!`);
  process.exit(0);
}
seedNotes().catch(err => { console.error('❌', err.message); process.exit(1); });
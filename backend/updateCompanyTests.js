require('dotenv').config();
const mongoose = require('mongoose');
const Test     = require('./models/Test');

const updates = [

{
  testId: 'CO-02',
  questions: [
    { question: 'In how many ways can the letters of the word \'INFOSYS\' be arranged such that both vowels (I, O) come together?', options: ['720', '360', '5040', '1440'], correct: 0, explanation: '5 consonants (N,F,S,Y,S with S repeated) + 1 vowel-block = 6 units → 6!/2! = 360 arrangements. Vowels within block: 2! = 2 ways. Total = 360×2 = 720.', difficulty: 'Hard' },
    { question: 'A bag contains 5 red, 4 blue and 3 green balls. Two balls are drawn at random. What is the probability that both are of the same color?', options: ['19/66', '12/66', '1/3', '5/22'], correct: 0, explanation: 'Total ways = C(12,2)=66. Same color ways = C(5,2)+C(4,2)+C(3,2) = 10+6+3 = 19. Probability = 19/66.', difficulty: 'Hard' },
    { question: 'At what time between 3 and 4 o\'clock will the hands of a clock first be at right angles after 3:00?', options: ['3:32 8/11', '3:16 4/11', '3:49 1/11', '3:00 exactly'], correct: 0, explanation: 'Using |30H - 5.5M| = 90 with H=3: 5.5M = 180 → M = 32 8/11 minutes.', difficulty: 'Hard' },
    { question: 'Choose the word most nearly OPPOSITE in meaning to \'PARSIMONIOUS\'.', options: ['Lavish', 'Prudent', 'Reticent', 'Austere'], correct: 0, explanation: 'Parsimonious means excessively frugal/stingy. Its opposite is Lavish (generous, extravagant).', difficulty: 'Hard' },
    { question: 'Identify the error: "Neither the manager nor the employees was aware about the sudden change in policy."', options: ['\'was\' should be \'were\'', '\'aware about\' should be \'aware for\'', '\'sudden\' should be \'suddenly\'', 'No error'], correct: 0, explanation: 'With "neither...nor", the verb agrees with the nearer subject — "employees" (plural) needs "were", not "was".', difficulty: 'Medium' },
    { question: 'Statements: Some doctors are engineers. All engineers are teachers. No teacher is a farmer.\nConclusions: I. Some doctors are teachers. II. No engineer is a farmer. III. Some teachers are doctors.', options: ['Only I and II follow', 'Only II and III follow', 'All I, II and III follow', 'Only I follows'], correct: 2, explanation: 'Some doctors→engineers→teachers gives "some doctors are teachers" (I), which converts to "some teachers are doctors" (III). Engineers⊆teachers and teachers∩farmers=∅ gives "no engineer is farmer" (II). All three follow.', difficulty: 'Hard' },
    { question: 'If SEND + MORE = MONEY (a classic cryptarithmetic puzzle where each letter represents a unique digit), what is the value of M?', options: ['1', '0', '2', '9'], correct: 0, explanation: 'The unique solution is SEND=9567, MORE=1085, MONEY=10652, so M=1.', difficulty: 'Hard' },
    { question: 'In an exam, 72% of students passed in Maths and 65% passed in Science. If 50% passed in both, what percentage of students failed in both subjects?', options: ['13%', '15%', '22%', '9%'], correct: 0, explanation: 'Passed in at least one = 72+65-50 = 87%. Failed in both = 100-87 = 13%.', difficulty: 'Medium' },
    { question: 'What is the output of this pseudocode?\nx = 10, y = 0\nwhile x > 0:\n  y = y + x\n  x = x - 2\nprint(y)', options: ['30', '25', '20', '55'], correct: 0, explanation: 'x goes 10,8,6,4,2 (5 iterations), y accumulates 10+8+6+4+2 = 30.', difficulty: 'Medium' },
    { question: 'Find the missing number in the series: 2, 5, 10, 17, 26, ?', options: ['35', '36', '37', '39'], correct: 2, explanation: 'Differences are 3,5,7,9 (odd numbers) → next difference is 11 → 26+11=37.', difficulty: 'Medium' }
  ]
},

{
  testId: 'CO-03',
  questions: [
    { question: 'A boat covers 24km upstream and 36km downstream in 6 hours; it covers 36km upstream and 24km downstream in 6.5 hours. Find the boat\'s speed in still water.', options: ['10 km/hr', '12 km/hr', '8 km/hr', '14 km/hr'], correct: 0, explanation: 'Solving the two equations gives upstream speed=8, downstream speed=12 → still water speed = (8+12)/2 = 10 km/hr.', difficulty: 'Hard' },
    { question: 'The ratio of A\'s and B\'s ages is 3:5. After 9 years, the ratio becomes 3:4. Find B\'s present age.', options: ['15', '9', '18', '24'], correct: 0, explanation: 'Let ages be 3x,5x. (3x+9)/(5x+9)=3/4 → x=3. B\'s present age = 5×3 = 15.', difficulty: 'Medium' },
    { question: 'A can complete a work in 18 days, B in 24 days. They work together for 4 days, then A leaves. In how many more days will B alone finish the remaining work?', options: ['14 2/3 days', '12 days', '16 days', '13 1/3 days'], correct: 0, explanation: 'Combined rate=7/72/day. Work in 4 days=28/72=7/18. Remaining=11/18. B alone: (11/18)÷(1/24)=44/3=14⅔ days.', difficulty: 'Hard' },
    { question: 'What is the output?\nint a = 5;\nint b = a++ + ++a;\nSystem.out.println(a + " " + b);', options: ['7 12', '6 11', '7 11', '6 12'], correct: 0, explanation: 'a++ returns 5 then a becomes 6; ++a makes a=7 and returns 7. b=5+7=12. Final a=7. Output: "7 12".', difficulty: 'Hard' },
    { question: 'CMM : DOO :: EQQ : ?', options: ['FSS', 'FRR', 'GSS', 'FTT'], correct: 0, explanation: 'Pattern: 1st letter +1, 2nd and 3rd letters +2 each. E+1=F, Q+2=S, Q+2=S → FSS.', difficulty: 'Medium' },
    { question: 'What is the remainder when 7^105 is divided by 100?', options: ['7', '43', '49', '1'], correct: 0, explanation: '7^4 = 2401 ≡ 1 (mod 100), a cycle of 4. 105 = 4×26+1, so 7^105 ≡ 7^1 = 7 (mod 100).', difficulty: 'Hard' },
    { question: 'A trader marks up goods by 50% and gives successive discounts of 20% and 10%. Find his overall profit/loss %.', options: ['8% profit', '10% profit', '5% loss', '12% profit'], correct: 0, explanation: 'CP=100, MP=150. After 20% off: 120. After 10% off: 108. Profit = 8%.', difficulty: 'Medium' },
    { question: 'Spot the error: "Each of the boys in the class have submitted their project on time."', options: ['\'have\' should be \'has\'', '\'their\' should be \'his\'', '\'submitted\' should be \'submit\'', 'No error'], correct: 0, explanation: '"Each of" takes a singular verb — "have" should be "has".', difficulty: 'Medium' },
    { question: 'In a company, the ratio of male to female employees is 7:5. There are 180 more male employees than female. Find total employees.', options: ['1080', '960', '1200', '900'], correct: 0, explanation: '7x-5x=180 → x=90. Total = 12x = 1080.', difficulty: 'Medium' },
    { question: 'If \'TIGER\' is coded as \'UJHFS\' (each letter shifted +1), how is \'LION\' coded?', options: ['MJPO', 'MJQP', 'LJPO', 'MKPO'], correct: 0, explanation: 'Shift each letter forward by 1: L→M, I→J, O→P, N→O = MJPO.', difficulty: 'Medium' }
  ]
},

{
  testId: 'CO-04',
  questions: [
    { question: 'Choose the word most nearly SIMILAR in meaning to \'OBFUSCATE\'.', options: ['Illuminate', 'Obscure', 'Simplify', 'Reveal'], correct: 1, explanation: 'Obfuscate means to make something unclear or confusing — closest in meaning to "Obscure".', difficulty: 'Hard' },
    { question: 'Statement: "The company has decided to give all employees a day off on Fridays to improve productivity."\nAssumptions: I. Employees will use the extra rest day to be more productive on other days. II. Fridays are currently the least productive day.', options: ['Both I and II are implicit', 'Neither is implicit', 'Only I is implicit', 'Only II is implicit'], correct: 2, explanation: 'The decision links the day-off to improved productivity, implying assumption I. Assumption II is an unwarranted extra claim not stated or implied.', difficulty: 'Hard' },
    { question: 'Find the odd one out: 8, 27, 64, 100, 125, 216', options: ['216', '100', '27', '64'], correct: 1, explanation: 'All others are perfect cubes (2³,3³,4³,5³,6³). 100 = 10² is not a perfect cube.', difficulty: 'Medium' },
    { question: 'Find the next term: 2, 6, 12, 20, 30, ?', options: ['40', '42', '36', '48'], correct: 1, explanation: 'Pattern is n(n+1): 1×2, 2×3, 3×4, 4×5, 5×6, next = 6×7 = 42.', difficulty: 'Medium' },
    { question: 'If \'DELHI\' is coded as \'IHLED\' (the word reversed), how is \'MADRAS\' coded?', options: ['SARADM', 'MASDAR', 'SARDAM', 'SADRAM'], correct: 2, explanation: 'Simply reverse the word: MADRAS → SARDAM.', difficulty: 'Easy' },
    { question: 'Statements: All coins are metals. No metal is wood. Some woods are furniture.\nConclusions: I. No coin is wood. II. Some furniture is not metal. III. Some metals are not furniture.', options: ['Only I follows', 'Only I and II follow', 'All three follow', 'Only II and III follow'], correct: 1, explanation: 'Coins⊆metals and metals∩wood=∅ gives "no coin is wood" (I). Since wood∩metal=∅ and some wood is furniture, that furniture cannot be metal (II). III is not derivable from the given statements.', difficulty: 'Hard' },
    { question: 'P, Q, R, S sit around a square table, one on each side, facing the center. Q is immediately right of P. S is opposite Q. Who is opposite P?', options: ['Q', 'S', 'R', 'Cannot be determined'], correct: 2, explanation: 'With P, Q(right of P), S(opposite Q) fixed, the only remaining seat for R is opposite P.', difficulty: 'Medium' },
    { question: 'Improve the underlined part: "Despite of his hard work, he could not succeed in the examination."', options: ['In spite', 'Even though of', 'No improvement needed', 'Despite'], correct: 3, explanation: '"Despite of" is incorrect usage — it should simply be "Despite" (or "In spite of").', difficulty: 'Medium' },
    { question: 'What is the value of \'result\' after this pseudocode?\nresult = 1\nfor i = 1 to 5:\n  result = result * i\nprint(result)', options: ['100', '125', '120', '60'], correct: 2, explanation: 'This computes 5! (factorial) = 1×2×3×4×5 = 120.', difficulty: 'Medium' },
    { question: 'Which protocol is used to automatically assign IP addresses to devices on a network and prevent IP conflicts?', options: ['DNS', 'FTP', 'SNMP', 'DHCP'], correct: 3, explanation: 'DHCP (Dynamic Host Configuration Protocol) automatically assigns IP addresses to devices on a network.', difficulty: 'Medium' }
  ]
},

{
  testId: 'CO-05',
  questions: [
    { question: 'What is the time complexity of finding the maximum sum contiguous subarray using Kadane\'s Algorithm?', options: ['O(n log n)', 'O(n²)', 'O(n)', 'O(2ⁿ)'], correct: 2, explanation: 'Kadane\'s Algorithm makes a single pass through the array, tracking running and max sum — O(n).', difficulty: 'Medium' },
    { question: 'Given array [2,1,5,1,3,2] and window size k=3, what is the maximum sum of any contiguous subarray of size k (sliding window)?', options: ['8', '9', '7', '10'], correct: 1, explanation: 'Windows: [2,1,5]=8, [1,5,1]=7, [5,1,3]=9, [1,3,2]=6. Maximum is 9.', difficulty: 'Medium' },
    { question: 'Given array [3,2,4] and target=6, using the two-sum hashmap approach, which indices sum to the target?', options: ['[0,1]', '[1,2]', '[0,2]', '[2,1]'], correct: 1, explanation: 'arr[1]=2 and arr[2]=4 → 2+4=6. Indices are [1,2].', difficulty: 'Medium' },
    { question: 'What is the worst-case time complexity of a search operation in a Binary Search Tree that has become fully skewed?', options: ['O(log n)', 'O(n)', 'O(1)', 'O(n log n)'], correct: 1, explanation: 'A skewed BST degenerates into a linked list, making search O(n) in the worst case.', difficulty: 'Medium' },
    { question: 'Given intervals [[1,3],[2,4],[3,5],[6,8]], what is the minimum number of intervals to remove to make the rest non-overlapping?', options: ['0', '1', '2', '3'], correct: 1, explanation: 'Sorting by end time and using greedy selection: keep [1,3], remove [2,4] (overlaps), keep [3,5], keep [6,8]. Only 1 removal needed.', difficulty: 'Hard' },
    { question: 'Which algorithm detects a cycle in a linked list using O(1) extra space?', options: ['Merge Sort', 'Floyd\'s Cycle Detection (Tortoise and Hare)', 'Binary Search', 'Dijkstra\'s Algorithm'], correct: 1, explanation: 'Floyd\'s Tortoise and Hare uses two pointers moving at different speeds to detect a cycle in O(1) space.', difficulty: 'Medium' },
    { question: 'What is the output?\ndef fact(n):\n  if n <= 1: return 1\n  return n * fact(n-1)\nprint(fact(5))', options: ['120', '60', '24', '720'], correct: 0, explanation: 'fact(5) = 5×4×3×2×1 = 120.', difficulty: 'Easy' },
    { question: 'Array [1,2,3,4,5,6,7] is rotated right by 3 positions. What is the result?', options: ['[5,6,7,1,2,3,4]', '[4,5,6,7,1,2,3]', '[1,2,3,4,5,6,7]', '[7,6,5,4,3,2,1]'], correct: 0, explanation: 'Rotating right by 3 moves the last 3 elements to the front: [5,6,7,1,2,3,4].', difficulty: 'Medium' },
    { question: 'Which algorithm finds the majority element (appears more than n/2 times) in O(n) time and O(1) space?', options: ['Sorting', 'Boyer-Moore Voting Algorithm', 'Brute force nested loop', 'HashMap counting'], correct: 1, explanation: 'Boyer-Moore Voting Algorithm finds the majority element in a single pass with constant extra space.', difficulty: 'Hard' },
    { question: 'Which algorithm is best suited to find the shortest path in an unweighted graph?', options: ['DFS', 'BFS', 'Dijkstra\'s Algorithm', 'Bellman-Ford'], correct: 1, explanation: 'BFS explores level by level, guaranteeing the shortest path in an unweighted graph.', difficulty: 'Medium' }
  ]
},

{
  testId: 'CO-06',
  questions: [
    { question: 'If x + 1/x = 4, find the value of x³ + 1/x³.', options: ['52', '48', '64', '36'], correct: 0, explanation: 'x²+1/x²=16-2=14. x³+1/x³=(x+1/x)(x²+1/x²-1)=4×13=52.', difficulty: 'Hard' },
    { question: 'A dishonest dealer professes to sell at cost price but uses an 800gm weight instead of 1kg. Find his profit percentage.', options: ['20%', '25%', '16.67%', '30%'], correct: 1, explanation: 'He gives 800gm but charges for 1000gm. Profit% = (1000-800)/800 × 100 = 25%.', difficulty: 'Medium' },
    { question: 'Which SQL clause is used to filter groups after aggregation (used with GROUP BY)?', options: ['WHERE', 'HAVING', 'FILTER', 'ORDER BY'], correct: 1, explanation: 'HAVING filters grouped results after aggregation; WHERE filters rows before grouping.', difficulty: 'Medium' },
    { question: 'Which best describes \'method overriding\' in Java?', options: ['Same method name with different parameters in the same class', 'A subclass provides a specific implementation of a method already defined in its superclass', 'Declaring a variable as static', 'Creating multiple constructors in a class'], correct: 1, explanation: 'Overriding lets a subclass redefine a superclass method with the same signature — this is runtime polymorphism.', difficulty: 'Medium' },
    { question: 'Find the missing term: 5, 11, 23, 47, 95, ?', options: ['189', '191', '193', '187'], correct: 1, explanation: 'Each term = previous×2+1. 95×2+1 = 191.', difficulty: 'Medium' },
    { question: 'Statements: All squares are rectangles. Some rectangles are circles.\nConclusions: I. Some squares are circles. II. Some circles are rectangles.', options: ['Only I follows', 'Only II follows', 'Both follow', 'Neither follows'], correct: 1, explanation: 'I doesn\'t follow since the "some rectangles" that are circles need not be squares. II follows directly by conversion of "some rectangles are circles".', difficulty: 'Hard' },
    { question: 'A, B and C can do a work in 10, 15 and 30 days respectively. Working together they earn Rs.600. Find B\'s share.', options: ['200', '300', '100', '250'], correct: 0, explanation: 'Work-rate ratio (using LCM 30) = 3:2:1. B\'s share = 600×(2/6) = 200.', difficulty: 'Medium' },
    { question: 'Choose the correct word: "The committee members could not reach a ______ on the new policy despite hours of discussion."', options: ['concession', 'consensus', 'conference', 'consequence'], correct: 1, explanation: '"Consensus" means general agreement — fits the context of a group discussion without agreement.', difficulty: 'Medium' },
    { question: 'The price of a commodity increases by 25% then decreases by 20%. What is the net percentage change?', options: ['0% (no change)', '5% increase', '5% decrease', '10% increase'], correct: 0, explanation: '100×1.25=125, then 125×0.8=100. Net change is 0%.', difficulty: 'Medium' },
    { question: 'Which SQL JOIN returns all records from the left table, with NULLs for unmatched rows from the right table?', options: ['INNER JOIN', 'RIGHT JOIN', 'LEFT JOIN', 'FULL OUTER JOIN'], correct: 2, explanation: 'LEFT JOIN keeps all rows from the left table and fills unmatched right-table columns with NULL.', difficulty: 'Medium' }
  ]
},

{
  testId: 'CO-07',
  questions: [
    { question: 'Trace this pseudocode. What is the final value of \'a\'?\na = 5, b = 10\nwhile a < b:\n  a = a + 2\n  b = b - 1\nprint(a)', options: ['9', '7', '10', '11'], correct: 0, explanation: 'Iter1: a=7,b=9. Iter2: a=9,b=8. Now a<b is false (9<8), loop stops. Final a=9.', difficulty: 'Medium' },
    { question: 'What does this pseudocode print?\ncount = 0\nfor i = 1 to 3:\n  for j = 1 to 3:\n    if i == j: count = count + 1\nprint(count)', options: ['3', '9', '6', '0'], correct: 0, explanation: 'count increments only when i==j: (1,1),(2,2),(3,3) → count=3.', difficulty: 'Medium' },
    { question: 'Which data structure follows the LIFO (Last In First Out) principle?', options: ['Queue', 'Stack', 'Array', 'Linked List'], correct: 1, explanation: 'A Stack follows LIFO — the last element pushed is the first one popped.', difficulty: 'Easy' },
    { question: 'What does this C code print?\nint a = 10;\nint *p = &a;\n*p = *p + 5;\nprintf("%d", a);', options: ['10', '15', '5', 'Garbage value'], correct: 1, explanation: 'p points to a. Modifying *p modifies a directly, so a becomes 15.', difficulty: 'Medium' },
    { question: 'A vessel has milk and water in ratio 4:1. 10 litres of mixture is replaced with water, making the new ratio 2:3. Find the initial quantity of mixture.', options: ['20 litres', '15 litres', '25 litres', '30 litres'], correct: 0, explanation: 'Solving (4V/5-8):(V/5+8)=2:3 gives V=20 litres.', difficulty: 'Hard' },
    { question: 'Spot the error: "The reason he was late is because he missed the bus."', options: ['\'is because\' should be \'is that\'', '\'missed\' should be \'was missing\'', '\'late\' should be \'lately\'', 'No error'], correct: 0, explanation: '"Reason...is because" is redundant; the correct form is "reason...is that".', difficulty: 'Medium' },
    { question: 'Given arr=[10,20,30,40,50] (0-indexed), what is the output of print(arr[1] + arr[3])?', options: ['60', '50', '70', '90'], correct: 0, explanation: 'arr[1]=20, arr[3]=40. Sum = 60.', difficulty: 'Easy' },
    { question: 'The difference between CI and SI on a sum for 2 years at 10% p.a. is Rs.50. Find the sum.', options: ['5000', '4000', '6000', '5500'], correct: 0, explanation: 'For 2 years, CI-SI = P×(r/100)². 50 = P×0.01 → P = 5000.', difficulty: 'Hard' },
    { question: 'What is the time complexity of binary search on a sorted array of n elements?', options: ['O(n)', 'O(log n)', 'O(n log n)', 'O(1)'], correct: 1, explanation: 'Binary search halves the search space each step, giving O(log n).', difficulty: 'Easy' },
    { question: 'What is the largest 4-digit number exactly divisible by 88?', options: ['9944', '9988', '9900', '9999'], correct: 0, explanation: '9999÷88=113.62; 113×88=9944, the largest 4-digit multiple of 88.', difficulty: 'Medium' }
  ]
},

{
  testId: 'CO-08',
  questions: [
    { question: 'Three bells ring at intervals of 12, 15, and 18 minutes. If they ring together at 9:00 AM, when will they next ring together?', options: ['12:00 PM', '11:30 AM', '1:00 PM', '12:30 PM'], correct: 0, explanation: 'LCM(12,15,18)=180 minutes = 3 hours. 9:00 AM + 3hrs = 12:00 PM.', difficulty: 'Medium' },
    { question: 'How many 4-digit numbers can be formed using digits 1,2,3,4,5,6 (no repetition) that are divisible by 5?', options: ['60', '120', '24', '30'], correct: 0, explanation: 'Only \'5\' can be the last digit. Remaining 3 positions from 5 digits = 5P3 = 60.', difficulty: 'Hard' },
    { question: 'Two dice are rolled. What is the probability that the sum of the numbers is a prime number?', options: ['5/12', '1/3', '7/18', '1/2'], correct: 0, explanation: 'Prime sums (2,3,5,7,11) occur in 1+2+4+6+2=15 ways out of 36. Probability = 15/36 = 5/12.', difficulty: 'Hard' },
    { question: 'What is the remainder when 2^50 is divided by 7?', options: ['4', '2', '1', '6'], correct: 0, explanation: '2^3≡1(mod7), a cycle of 3. 50=3×16+2, so 2^50≡2^2=4 (mod 7).', difficulty: 'Hard' },
    { question: 'Pointing to a man, a woman said, "His mother is the only daughter of my mother." How is the woman related to the man?', options: ['Mother', 'Sister', 'Aunt', 'Grandmother'], correct: 0, explanation: '"Only daughter of my mother" refers to the woman herself, so the man\'s mother is the woman — she is his mother.', difficulty: 'Medium' },
    { question: 'If A=1, B=2,...Z=26, and a word\'s code is the sum of its letters\' values, what is the code for \'CAT\'?', options: ['24', '23', '25', '21'], correct: 0, explanation: 'C=3, A=1, T=20. Sum = 3+1+20 = 24.', difficulty: 'Easy' },
    { question: 'Which has the best average-case time complexity for searching in a hash table?', options: ['O(n)', 'O(log n)', 'O(1)', 'O(n log n)'], correct: 2, explanation: 'Hash tables provide average-case O(1) lookup via direct index computation.', difficulty: 'Medium' },
    { question: 'Choose the word OPPOSITE in meaning to \'VERBOSE\'.', options: ['Lengthy', 'Concise', 'Elaborate', 'Detailed'], correct: 1, explanation: 'Verbose means wordy/using more words than needed. Its opposite is Concise.', difficulty: 'Medium' },
    { question: 'The average of 5 consecutive odd numbers is 61. Find the largest number.', options: ['65', '63', '67', '69'], correct: 0, explanation: 'For consecutive odd numbers, average = middle term = 61. Numbers: 57,59,61,63,65. Largest=65.', difficulty: 'Medium' },
    { question: 'Which scheduling algorithm can lead to \'starvation\' of low-priority processes?', options: ['Round Robin', 'Priority Scheduling', 'First Come First Serve', 'Shortest Job First'], correct: 1, explanation: 'In Priority Scheduling, low-priority processes may never execute if higher-priority ones keep arriving — this is starvation.', difficulty: 'Medium' }
  ]
},

{
  testId: 'CO-09',
  questions: [
    { question: 'In dynamic programming, what is \'memoization\' primarily used for?', options: ['Reducing space by discarding old states', 'Storing results of expensive function calls to reuse them', 'Parallelizing recursive calls', 'Automatically converting recursion into iteration'], correct: 1, explanation: 'Memoization caches previously computed results so repeated subproblems aren\'t recomputed, saving time.', difficulty: 'Medium' },
    { question: 'A relation is in Third Normal Form (3NF) if it is in 2NF and:', options: ['It has no multi-valued dependencies', 'It has no transitive dependency of non-prime attributes on the primary key', 'It has no partial dependency', 'All attributes are atomic'], correct: 1, explanation: '3NF eliminates transitive dependencies — non-key attributes must depend only on the primary key, not on other non-key attributes.', difficulty: 'Hard' },
    { question: 'Which of the following is NOT one of the four necessary conditions for deadlock to occur?', options: ['Mutual Exclusion', 'Hold and Wait', 'Preemption', 'Circular Wait'], correct: 2, explanation: 'The actual condition required is "No Preemption" (resources can\'t be forcibly taken) — "Preemption" itself is not a deadlock condition.', difficulty: 'Hard' },
    { question: 'Which OSI layer is responsible for routing packets between different networks?', options: ['Data Link Layer', 'Network Layer', 'Transport Layer', 'Session Layer'], correct: 1, explanation: 'The Network Layer (Layer 3) handles logical addressing and routing between networks.', difficulty: 'Medium' },
    { question: 'Find the greatest number that divides 285 and 1249, leaving remainders 9 and 7 respectively.', options: ['138', '69', '92', '46'], correct: 0, explanation: 'Subtract remainders: 285-9=276, 1249-7=1242. HCF(276,1242) = 138.', difficulty: 'Hard' },
    { question: 'A and B invest Rs.8000 and Rs.12000. A also gets 20% of profit as a salary for managing, and the rest is split by investment ratio. If total profit is Rs.10000, find A\'s total share.', options: ['5200', '4800', '5600', '5000'], correct: 0, explanation: 'A\'s salary = 2000. Remaining 8000 split 2:3 (investment ratio). A gets 8000×2/5=3200. Total A = 2000+3200 = 5200.', difficulty: 'Hard' },
    { question: 'What is a \'virtual function\' in C++ used for?', options: ['Making a function inaccessible outside its class', 'Achieving runtime polymorphism', 'Preventing function overloading', 'Declaring a function without implementation permanently'], correct: 1, explanation: 'Virtual functions enable runtime polymorphism — the correct overridden version is called based on the object\'s actual type.', difficulty: 'Medium' },
    { question: '"Although the merger was expected to reduce costs, it ultimately increased operational expenses due to redundant systems." What does this sentence primarily suggest?', options: ['The merger was a complete success', 'The outcome of the merger contradicted its intended goal', 'Redundant systems reduced costs', 'The merger had no impact on expenses'], correct: 1, explanation: 'The sentence contrasts the expected cost reduction with the actual cost increase — the outcome contradicted the goal.', difficulty: 'Medium' },
    { question: 'What is the output?\ndp = [0, 1]\nfor i in range(2, 6):\n  dp.append(dp[i-1] + dp[i-2])\nprint(dp[5])', options: ['5', '3', '8', '4'], correct: 0, explanation: 'This builds the Fibonacci sequence: 0,1,1,2,3,5. dp[5] = 5.', difficulty: 'Medium' },
    { question: 'A and B together complete a task in 12 days. A alone takes 20 days. In how many days can B alone complete it?', options: ['30', '25', '24', '36'], correct: 0, explanation: '1/B = 1/12 - 1/20 = 2/60 = 1/30. B alone takes 30 days.', difficulty: 'Medium' }
  ]
},

{
  testId: 'CO-10',
  questions: [
    { question: 'In system design, what does \'horizontal scaling\' refer to?', options: ['Adding more power (CPU/RAM) to an existing server', 'Adding more servers/machines to distribute the load', 'Increasing database storage only', 'Reducing the number of servers to cut costs'], correct: 1, explanation: 'Horizontal scaling means adding more machines to share the load, as opposed to vertical scaling (adding power to one machine).', difficulty: 'Medium' },
    { question: 'Which data structure is most commonly used internally by databases to implement indexes for fast lookups?', options: ['Linked List', 'Hash Table only', 'B-Tree / B+ Tree', 'Stack'], correct: 2, explanation: 'B-Trees / B+ Trees are used because they keep data sorted and support efficient range queries and lookups on disk.', difficulty: 'Medium' },
    { question: 'What is the main difference between an abstract class and an interface in Java (pre-Java 8)?', options: ['Abstract classes can have constructors and instance variables; interfaces (pre-Java 8) cannot have method implementations', 'Interfaces can have private methods but abstract classes cannot', 'There is no difference', 'Abstract classes cannot have any methods at all'], correct: 0, explanation: 'Abstract classes support state (fields) and constructors; pre-Java 8 interfaces could only declare method signatures.', difficulty: 'Medium' },
    { question: 'What is the output?\ns = set([1, 2, 2, 3, 3, 3])\nprint(len(s))', options: ['3', '6', '2', '1'], correct: 0, explanation: 'A set removes duplicates: {1,2,3}, so length = 3.', difficulty: 'Easy' },
    { question: 'Which algorithm finds the shortest path in a weighted graph with no negative edge weights?', options: ['BFS', 'Dijkstra\'s Algorithm', 'DFS', 'Kadane\'s Algorithm'], correct: 1, explanation: 'Dijkstra\'s Algorithm efficiently finds shortest paths in graphs with non-negative weights.', difficulty: 'Medium' },
    { question: 'What is a \'race condition\' in concurrent programming?', options: ['When a program runs faster than expected', 'When the outcome depends on the timing/order of uncontrolled thread execution', 'When two threads have the same priority', 'When a program terminates unexpectedly'], correct: 1, explanation: 'A race condition occurs when the result depends on unpredictable timing of concurrent operations accessing shared data.', difficulty: 'Hard' },
    { question: 'In a sorted rotated array like [4,5,6,7,0,1,2], what is the time complexity of finding a target using modified binary search?', options: ['O(n)', 'O(log n)', 'O(n log n)', 'O(n²)'], correct: 1, explanation: 'A modified binary search can still eliminate half the array each step even in a rotated array — O(log n).', difficulty: 'Hard' },
    { question: 'Which cache eviction policy removes the item accessed least recently when the cache is full?', options: ['FIFO', 'LFU', 'LRU', 'Random Replacement'], correct: 2, explanation: 'LRU (Least Recently Used) evicts the item that hasn\'t been accessed for the longest time.', difficulty: 'Medium' },
    { question: 'What is the output?\nfor (var i = 0; i < 3; i++) {\n  setTimeout(() => console.log(i), 0);\n}', options: ['0 1 2', '3 3 3', '0 0 0', 'undefined undefined undefined'], correct: 1, explanation: '\'var\' is function-scoped, not block-scoped. By the time the async callbacks run, the loop has finished and i=3 for all three.', difficulty: 'Hard' },
    { question: 'What is the worst-case time complexity of a single insertion at the end of a dynamic array, considering the possibility of a resize?', options: ['O(1)', 'O(n)', 'O(log n)', 'O(n²)'], correct: 1, explanation: 'When a resize is triggered, all elements must be copied to a new array — O(n) in that worst case (though amortized cost is O(1)).', difficulty: 'Hard' }
  ]
}

];

async function run() {
  await mongoose.connect(process.env.MONGO_URI);
  let updated = 0;
  for (const u of updates) {
    const result = await Test.findOneAndUpdate(
      { testId: u.testId },
      { $set: { questions: u.questions, totalQ: u.questions.length } },
      { new: true }
    );
    if (result) { updated++; console.log('Updated:', u.testId, result.title); }
    else console.log('NOT FOUND:', u.testId);
  }
  console.log(`Done! ${updated}/${updates.length} tests updated.`);
  process.exit(0);
}

run().catch(err => { console.error(err); process.exit(1); });

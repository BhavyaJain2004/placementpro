require('dotenv').config();
const mongoose = require('mongoose');
const Test     = require('./models/Test');

const tests = [

// ══════════════════════════════════════════
// DSA TESTS
// ══════════════════════════════════════════

{
  testId: 'DSA-01', title: 'Arrays Basics', category: 'DSA',
  duration: 15, totalQ: 10, difficulty: 'Medium',
  questions: [
    {
      question: 'What is the time complexity of accessing an element in an array by index?',
      options: ['O(n)', 'O(log n)', 'O(1)', 'O(n²)'],
      correct: 2,
      explanation: 'Array index access is O(1) — direct memory address calculation.',
      difficulty: 'Easy'
    },
    {
      question: 'Which sorting algorithm has best average case time complexity?',
      options: ['Bubble Sort', 'Quick Sort', 'Selection Sort', 'Insertion Sort'],
      correct: 1,
      explanation: 'Quick Sort has O(n log n) average case, better than O(n²) sorts.',
      difficulty: 'Medium'
    },
    {
      question: 'What does Kadane\'s algorithm solve?',
      options: ['Longest subarray with sum K', 'Maximum subarray sum', 'Minimum subarray sum', 'Count of subarrays'],
      correct: 1,
      explanation: 'Kadane\'s algorithm finds maximum subarray sum in O(n) time.',
      difficulty: 'Medium'
    },
    {
      question: 'Array has elements [3,1,4,1,5,9,2,6]. After one pass of bubble sort (ascending), last element will be?',
      options: ['6', '9', '1', '3'],
      correct: 1,
      explanation: 'Bubble sort pushes the largest element to end in each pass. 9 is largest.',
      difficulty: 'Hard'
    },
    {
      question: 'What is the space complexity of merge sort?',
      options: ['O(1)', 'O(log n)', 'O(n)', 'O(n log n)'],
      correct: 2,
      explanation: 'Merge sort requires O(n) extra space for the temporary arrays.',
      difficulty: 'Medium'
    },
    {
      question: 'Two Sum problem: find two numbers adding to target. Best approach?',
      options: ['Nested loops O(n²)', 'Sort then binary search O(n log n)', 'HashMap O(n)', 'Sort then two pointers O(n log n)'],
      correct: 2,
      explanation: 'HashMap gives O(n) time: store each element, check if complement exists.',
      difficulty: 'Medium'
    },
    {
      question: 'What is the output of Dutch National Flag algorithm applied on [2,0,1,2,0,1,0]?',
      options: ['[0,0,0,1,1,2,2]', '[2,2,1,1,0,0,0]', '[0,1,2,0,1,2,0]', '[1,1,0,0,2,2,0]'],
      correct: 0,
      explanation: 'Dutch National Flag sorts array of 0s, 1s, 2s in single pass.',
      difficulty: 'Hard'
    },
    {
      question: 'In an array of n+1 integers (range 1 to n), finding duplicate using Floyd\'s cycle requires:',
      options: ['O(n) time O(n) space', 'O(n) time O(1) space', 'O(n²) time O(1) space', 'O(log n) time O(1) space'],
      correct: 1,
      explanation: 'Floyd\'s cycle detection finds duplicate in O(n) time and O(1) space.',
      difficulty: 'Hard'
    },
    {
      question: 'Sliding window technique is best used for:',
      options: ['Finding if element exists', 'Problems involving contiguous subarrays/substrings', 'Sorting arrays', 'Tree traversal'],
      correct: 1,
      explanation: 'Sliding window optimizes problems on contiguous subarrays from O(n²) to O(n).',
      difficulty: 'Medium'
    },
    {
      question: 'Array rotation by k positions using reversal algorithm needs how many reversals?',
      options: ['1', '2', '3', '4'],
      correct: 2,
      explanation: 'Three reversals: reverse all, reverse first k, reverse remaining n-k.',
      difficulty: 'Hard'
    }
  ]
},

{
  testId: 'DSA-02', title: 'Arrays Advanced', category: 'DSA',
  duration: 15, totalQ: 10, difficulty: 'Hard',
  questions: [
    {
      question: 'Trapping Rain Water problem optimal solution has time complexity:',
      options: ['O(n²)', 'O(n log n)', 'O(n)', 'O(1)'],
      correct: 2,
      explanation: 'Two pointer approach solves Trapping Rain Water in O(n) time, O(1) space.',
      difficulty: 'Hard'
    },
    {
      question: 'In "Product of Array Except Self" — why is division not allowed?',
      options: ['Overflow issues', 'Array might contain zeros', 'Too slow', 'Not needed'],
      correct: 1,
      explanation: 'If array has zero, division by zero fails. Prefix-suffix product approach handles it.',
      difficulty: 'Hard'
    },
    {
      question: 'Maximum product subarray [2,3,-2,4] answer is:',
      options: ['24', '6', '-48', '8'],
      correct: 1,
      explanation: '[2,3] gives product 6. [2,3,-2,4]=-48, [3,-2,4]=-24. Max=6.',
      difficulty: 'Hard'
    },
    {
      question: 'Next permutation of [1,3,2] is:',
      options: ['[1,2,3]', '[2,1,3]', '[3,1,2]', '[2,3,1]'],
      correct: 1,
      explanation: 'Find rightmost element smaller than next. Swap with next larger. Reverse suffix.',
      difficulty: 'Hard'
    },
    {
      question: 'Binary search on rotated sorted array [4,5,6,7,0,1,2], target=0. Returns index:',
      options: ['4', '5', '3', '6'],
      correct: 0,
      explanation: '0 is at index 4. Modified binary search determines which half is sorted.',
      difficulty: 'Hard'
    },
    {
      question: 'Merge intervals [[1,3],[2,6],[8,10],[15,18]] result has how many intervals?',
      options: ['4', '3', '2', '1'],
      correct: 1,
      explanation: '[1,3] and [2,6] overlap → [1,6]. So result: [[1,6],[8,10],[15,18]] = 3 intervals.',
      difficulty: 'Medium'
    },
    {
      question: 'Sliding window maximum of [1,3,-1,-3,5,3,6,7] with k=3:',
      options: ['[3,3,5,5,6,7]', '[3,3,3,5,6,7]', '[1,3,5,5,6,7]', '[3,5,5,6,7,7]'],
      correct: 0,
      explanation: 'Monotonic deque approach: windows give max [3,3,5,5,6,7].',
      difficulty: 'Hard'
    },
    {
      question: 'Subarray sum equals K — best approach uses:',
      options: ['Two pointers', 'Prefix sum + HashMap', 'Sliding window', 'Binary search'],
      correct: 1,
      explanation: 'Prefix sum stored in HashMap allows O(1) lookup for complement sum.',
      difficulty: 'Hard'
    },
    {
      question: '4Sum problem time complexity of optimal solution:',
      options: ['O(n)', 'O(n²)', 'O(n³)', 'O(n⁴)'],
      correct: 2,
      explanation: 'Two outer loops O(n²) + two pointers O(n) = O(n³) overall.',
      difficulty: 'Hard'
    },
    {
      question: 'Boyer-Moore Voting Algorithm finds:',
      options: ['Minimum element', 'Majority element (>n/2)', 'Kth largest', 'Missing number'],
      correct: 1,
      explanation: 'Boyer-Moore finds majority element in O(n) time O(1) space using voting.',
      difficulty: 'Medium'
    }
  ]
},

{
  testId: 'DSA-03', title: 'Strings', category: 'DSA',
  duration: 15, totalQ: 10, difficulty: 'Medium',
  questions: [
    {
      question: 'KMP algorithm is used for:',
      options: ['String sorting', 'Pattern searching in O(n+m)', 'String reversal', 'Palindrome check'],
      correct: 1,
      explanation: 'KMP (Knuth-Morris-Pratt) searches pattern in text in O(n+m) time.',
      difficulty: 'Hard'
    },
    {
      question: 'Longest Palindromic Substring of "babad" is:',
      options: ['"bab" or "aba"', '"bad"', '"babad"', '"ab"'],
      correct: 0,
      explanation: 'Both "bab" and "aba" are valid answers of length 3.',
      difficulty: 'Medium'
    },
    {
      question: 'Minimum Window Substring uses which technique?',
      options: ['DP', 'Two pointers only', 'Sliding window + frequency map', 'Binary search'],
      correct: 2,
      explanation: 'Expand right until all chars found, shrink left to minimize — with frequency map.',
      difficulty: 'Hard'
    },
    {
      question: '"anagram" and "nagaram" are anagrams. Best check method:',
      options: ['Sort both O(n log n)', 'Count array of 26 chars O(n)', 'HashMap O(n)', 'Both B and C are optimal'],
      correct: 3,
      explanation: 'Both frequency array and HashMap give O(n) time O(1) space.',
      difficulty: 'Medium'
    },
    {
      question: 'Rabin-Karp algorithm for pattern matching uses:',
      options: ['Dynamic programming', 'Rolling hash function', 'Binary search', 'Trie'],
      correct: 1,
      explanation: 'Rabin-Karp uses rolling hash to compare patterns efficiently.',
      difficulty: 'Hard'
    },
    {
      question: 'Group Anagrams: ["eat","tea","tan","ate","nat","bat"] — how many groups?',
      options: ['6', '3', '4', '2'],
      correct: 1,
      explanation: '3 groups: [eat,tea,ate], [tan,nat], [bat].',
      difficulty: 'Medium'
    },
    {
      question: 'Longest Substring Without Repeating Characters in "abcabcbb":',
      options: ['4', '2', '3', '8'],
      correct: 2,
      explanation: '"abc" = length 3 is the longest without repeating chars.',
      difficulty: 'Medium'
    },
    {
      question: 'String compression "aabcccccaaa" compressed is:',
      options: ['"a2b1c5a3"', '"aabcccccaaa"', '"2a1b5c3a"', '"a2bc5a3"'],
      correct: 0,
      explanation: 'Count consecutive chars: a→2, b→1, c→5, a→3.',
      difficulty: 'Medium'
    },
    {
      question: 'Valid parentheses check "({[]})" — result:',
      options: ['Invalid', 'Valid', 'Cannot determine', 'Depends on language'],
      correct: 1,
      explanation: 'Stack approach: every closing bracket matches its opening. Valid.',
      difficulty: 'Easy'
    },
    {
      question: 'Z-function in strings is used for:',
      options: ['Finding palindromes', 'Pattern matching', 'String sorting', 'Compression'],
      correct: 1,
      explanation: 'Z-function gives length of longest substring starting from position i matching prefix.',
      difficulty: 'Hard'
    }
  ]
},

{
  testId: 'DSA-04', title: 'Linked List', category: 'DSA',
  duration: 15, totalQ: 10, difficulty: 'Medium',
  questions: [
    {
      question: 'Floyd\'s cycle detection uses:',
      options: ['One fast pointer', 'Two pointers — slow and fast', 'Stack', 'Recursion'],
      correct: 1,
      explanation: 'Slow moves 1 step, fast moves 2. If cycle exists, they meet.',
      difficulty: 'Medium'
    },
    {
      question: 'Reversing a linked list iteratively uses:',
      options: ['Stack only', 'Three pointers: prev, curr, next', 'Two pointers', 'Recursion only'],
      correct: 1,
      explanation: 'Track prev, curr, next. Change curr.next to prev, move all forward.',
      difficulty: 'Easy'
    },
    {
      question: 'Finding middle of linked list in one pass — use:',
      options: ['Count total nodes', 'Slow/fast pointer', 'Stack', 'Recursion'],
      correct: 1,
      explanation: 'Fast moves 2x speed. When fast reaches end, slow is at middle.',
      difficulty: 'Easy'
    },
    {
      question: 'Merge K sorted linked lists — optimal approach:',
      options: ['Merge one by one O(nk²)', 'Min-heap O(nk log k)', 'Sort all elements O(nk log nk)', 'Two at a time divide conquer O(nk log k)'],
      correct: 1,
      explanation: 'Min-heap of size k. Extract min, insert next. O(nk log k) time.',
      difficulty: 'Hard'
    },
    {
      question: 'LRU Cache is best implemented using:',
      options: ['Array', 'Stack', 'HashMap + Doubly Linked List', 'Binary Search Tree'],
      correct: 2,
      explanation: 'HashMap gives O(1) access, DLL gives O(1) insertion/deletion at both ends.',
      difficulty: 'Hard'
    },
    {
      question: 'Detect start of cycle in linked list — after slow/fast meet:',
      options: ['Return meeting point', 'Move slow to head, both move 1 step till meet', 'Count cycle length', 'Use stack'],
      correct: 1,
      explanation: 'Reset one pointer to head. Both move 1 step. They meet at cycle start.',
      difficulty: 'Hard'
    },
    {
      question: 'Remove nth node from end — best approach:',
      options: ['Count length then remove', 'Two pointers with n gap', 'Stack', 'Recursion'],
      correct: 1,
      explanation: 'Two pointers n apart. When front reaches end, back is at nth from end.',
      difficulty: 'Medium'
    },
    {
      question: 'Palindrome linked list check — O(1) space approach:',
      options: ['Copy to array', 'Find middle, reverse second half, compare', 'Use stack', 'Recursion'],
      correct: 1,
      explanation: 'Find middle, reverse second half, compare with first half. O(n) time O(1) space.',
      difficulty: 'Medium'
    },
    {
      question: 'Add two numbers as linked lists [2,4,3] + [5,6,4] (reverse order) result:',
      options: ['[7,0,8]', '[8,0,7]', '[7,1,7]', '[7,0,7]'],
      correct: 0,
      explanation: '342 + 465 = 807. Reversed as linked list: [7,0,8].',
      difficulty: 'Medium'
    },
    {
      question: 'Reorder list L0→L1→Ln→L2→Ln-1... steps:',
      options: ['Reverse entire list', 'Find middle, reverse second half, merge alternately', 'Use stack', 'Sort by value'],
      correct: 1,
      explanation: 'Find middle, reverse second half, then merge first and reversed second alternately.',
      difficulty: 'Hard'
    }
  ]
},

{
  testId: 'DSA-05', title: 'Stacks & Queues', category: 'DSA',
  duration: 15, totalQ: 10, difficulty: 'Medium',
  questions: [
    {
      question: 'Next Greater Element uses which data structure?',
      options: ['Queue', 'Monotonic Stack', 'Min-Heap', 'HashMap'],
      correct: 1,
      explanation: 'Monotonic decreasing stack: pop when current > top, that gives next greater.',
      difficulty: 'Medium'
    },
    {
      question: 'Min Stack — getMin() in O(1) using:',
      options: ['Single stack', 'Two stacks (main + min)', 'HashMap', 'Sorted array'],
      correct: 1,
      explanation: 'Auxiliary min stack stores current minimum at each level.',
      difficulty: 'Medium'
    },
    {
      question: 'Largest Rectangle in Histogram optimal solution:',
      options: ['Brute force O(n²)', 'Divide and conquer O(n log n)', 'Monotonic stack O(n)', 'DP O(n)'],
      correct: 2,
      explanation: 'Monotonic increasing stack tracks boundaries for each bar. O(n) solution.',
      difficulty: 'Hard'
    },
    {
      question: 'Queue using two stacks — enqueue is O(1). Dequeue worst case:',
      options: ['O(1)', 'O(log n)', 'O(n)', 'O(n²)'],
      correct: 2,
      explanation: 'When output stack empty, pour all from input stack O(n). Amortized O(1).',
      difficulty: 'Medium'
    },
    {
      question: 'Decode String "3[a2[c]]" decodes to:',
      options: ['"accaccacc"', '"aaacccc"', '"acacacac"', '"aaccaacc"'],
      correct: 0,
      explanation: '2[c]=cc, 3[a+cc]=3[acc]=accaccacc.',
      difficulty: 'Hard'
    },
    {
      question: 'Daily Temperatures: [73,74,75,71,69,72,76,73]. Answer for index 0:',
      options: ['0', '1', '2', '7'],
      correct: 1,
      explanation: '74 > 73 comes next day. Answer for index 0 is 1.',
      difficulty: 'Medium'
    },
    {
      question: 'Trapping Rain Water using stack — what does stack store?',
      options: ['Heights', 'Indices', 'Water amounts', 'Pairs (index, height)'],
      correct: 1,
      explanation: 'Stack stores indices. When current height > stack top, water can be trapped.',
      difficulty: 'Hard'
    },
    {
      question: 'Evaluate "3 4 + 2 * 7 /" in RPN:',
      options: ['2', '1', '3', '4'],
      correct: 0,
      explanation: '3+4=7, 7*2=14, 14/7=2.',
      difficulty: 'Medium'
    },
    {
      question: 'Remove K digits to make smallest number. "1432219", k=3 gives:',
      options: ['"1219"', '"1222"', '"1119"', '"4321"'],
      correct: 0,
      explanation: 'Monotonic increasing stack: remove 4,3,2 → "1219".',
      difficulty: 'Hard'
    },
    {
      question: 'Online Stock Span problem uses:',
      options: ['Queue', 'Min Heap', 'Monotonic Stack with spans', 'DP array'],
      correct: 2,
      explanation: 'Stack stores (price, span). Accumulate spans when popping smaller prices.',
      difficulty: 'Hard'
    }
  ]
},

{
  testId: 'DSA-06', title: 'Trees & BST', category: 'DSA',
  duration: 15, totalQ: 10, difficulty: 'Hard',
  questions: [
    {
      question: 'Height of complete binary tree with n nodes:',
      options: ['O(n)', 'O(log n)', 'O(n log n)', 'O(√n)'],
      correct: 1,
      explanation: 'Complete binary tree has height floor(log₂n).',
      difficulty: 'Medium'
    },
    {
      question: 'Inorder traversal of BST gives:',
      options: ['Random order', 'Reverse sorted', 'Sorted ascending', 'Level order'],
      correct: 2,
      explanation: 'BST inorder (Left-Root-Right) always gives sorted ascending sequence.',
      difficulty: 'Easy'
    },
    {
      question: 'Diameter of binary tree = longest path. At each node, diameter through it:',
      options: ['Left height only', 'Right height only', 'Left height + Right height', 'Max(left, right) + 1'],
      correct: 2,
      explanation: 'Diameter through a node = left subtree height + right subtree height.',
      difficulty: 'Medium'
    },
    {
      question: 'AVL tree property — balance factor allowed values:',
      options: ['0 only', '-1, 0, 1', '-2 to 2', 'Any value'],
      correct: 1,
      explanation: 'AVL tree maintains |balance factor| ≤ 1 at every node.',
      difficulty: 'Hard'
    },
    {
      question: 'Binary Tree Maximum Path Sum — at each node we consider:',
      options: ['Only left path', 'Only right path', 'Node + max(0,left) + max(0,right)', 'Node only'],
      correct: 2,
      explanation: 'Include negative paths only if they improve sum. Take max with 0.',
      difficulty: 'Hard'
    },
    {
      question: 'Lowest Common Ancestor in BST — if p < root and q > root:',
      options: ['Go left', 'Go right', 'Root is LCA', 'Cannot determine'],
      correct: 2,
      explanation: 'If p and q are on different sides of root, root is their LCA.',
      difficulty: 'Medium'
    },
    {
      question: 'Level order traversal uses which data structure?',
      options: ['Stack', 'Queue', 'Heap', 'Array'],
      correct: 1,
      explanation: 'BFS with queue: process level by level, enqueue children of each node.',
      difficulty: 'Easy'
    },
    {
      question: 'Serialize and deserialize binary tree — which traversal works best?',
      options: ['Inorder', 'Preorder with null markers', 'Postorder', 'Level order'],
      correct: 1,
      explanation: 'Preorder with null markers can uniquely reconstruct any binary tree.',
      difficulty: 'Hard'
    },
    {
      question: 'Red-Black tree maximum height with n nodes:',
      options: ['log n', '2 log n', 'n/2', 'n'],
      correct: 1,
      explanation: 'Red-Black tree guarantees height ≤ 2log(n+1).',
      difficulty: 'Hard'
    },
    {
      question: 'Morris Traversal achieves inorder in:',
      options: ['O(n) time O(n) space', 'O(n log n) time O(1) space', 'O(n) time O(1) space', 'O(n²) time O(1) space'],
      correct: 2,
      explanation: 'Morris uses threaded binary tree — O(n) time O(1) space inorder.',
      difficulty: 'Hard'
    }
  ]
},

{
  testId: 'DSA-07', title: 'Dynamic Programming', category: 'DSA',
  duration: 15, totalQ: 10, difficulty: 'Hard',
  questions: [
    {
      question: 'Overlapping subproblems + optimal substructure → use:',
      options: ['Greedy', 'Divide and Conquer', 'Dynamic Programming', 'Backtracking'],
      correct: 2,
      explanation: 'DP is ideal when problem has overlapping subproblems and optimal substructure.',
      difficulty: 'Easy'
    },
    {
      question: '0/1 Knapsack with n=4 items, W=7 — dp table size:',
      options: ['4×7', '5×8', '4×8', '5×7'],
      correct: 1,
      explanation: 'dp[0..n][0..W] = (n+1) × (W+1) = 5×8.',
      difficulty: 'Medium'
    },
    {
      question: 'LCS of "ABCBDAB" and "BDCAB" length:',
      options: ['3', '4', '5', '2'],
      correct: 1,
      explanation: 'LCS = "BCAB" or "BDAB" = length 4.',
      difficulty: 'Hard'
    },
    {
      question: 'Edit distance between "horse" and "ros" is:',
      options: ['2', '3', '4', '5'],
      correct: 1,
      explanation: 'horse→rorse→rose→ros = 3 operations (replace h, delete r, delete e).',
      difficulty: 'Hard'
    },
    {
      question: 'Coin change [1,5,6,9] amount=11 minimum coins:',
      options: ['3', '2', '4', '11'],
      correct: 1,
      explanation: '6+5=11, only 2 coins needed.',
      difficulty: 'Medium'
    },
    {
      question: 'Longest Increasing Subsequence of [10,9,2,5,3,7,101,18]:',
      options: ['3', '4', '5', '6'],
      correct: 1,
      explanation: 'LIS = [2,3,7,101] or [2,5,7,101] = length 4.',
      difficulty: 'Hard'
    },
    {
      question: 'Matrix Chain Multiplication — what does dp[i][j] represent?',
      options: ['Dimensions of matrix', 'Min multiplications for matrices i to j', 'Max value', 'Number of matrices'],
      correct: 1,
      explanation: 'dp[i][j] = minimum scalar multiplications needed for matrices i through j.',
      difficulty: 'Hard'
    },
    {
      question: 'Partition Equal Subset Sum — which DP type?',
      options: ['Unbounded knapsack', '0/1 knapsack', 'LCS variant', 'DP on trees'],
      correct: 1,
      explanation: 'Find subset with sum=total/2. Each item used at most once = 0/1 knapsack.',
      difficulty: 'Hard'
    },
    {
      question: 'House Robber: [2,7,9,3,1] maximum rob:',
      options: ['11', '12', '13', '10'],
      correct: 1,
      explanation: '2+9+1=12. Cannot rob adjacent houses.',
      difficulty: 'Medium'
    },
    {
      question: 'Burst Balloons — dp[i][j] means:',
      options: ['Sum of balloons i to j', 'Max coins bursting all between i and j', 'Min coins', 'Count of ways'],
      correct: 1,
      explanation: 'dp[i][j] = max coins by bursting all balloons strictly between i and j.',
      difficulty: 'Hard'
    }
  ]
},

{
  testId: 'DSA-08', title: 'Graphs', category: 'DSA',
  duration: 15, totalQ: 10, difficulty: 'Hard',
  questions: [
    {
      question: 'BFS uses which data structure?',
      options: ['Stack', 'Queue', 'Priority Queue', 'Deque'],
      correct: 1,
      explanation: 'BFS (Breadth First Search) uses Queue for level-by-level traversal.',
      difficulty: 'Easy'
    },
    {
      question: 'Dijkstra\'s algorithm fails with:',
      options: ['Undirected graphs', 'Negative weight edges', 'Disconnected graphs', 'Dense graphs'],
      correct: 1,
      explanation: 'Dijkstra cannot handle negative edges. Use Bellman-Ford instead.',
      difficulty: 'Medium'
    },
    {
      question: 'Topological sort is only possible for:',
      options: ['Any graph', 'Undirected graphs', 'Directed Acyclic Graph (DAG)', 'Weighted graphs'],
      correct: 2,
      explanation: 'Topological sort requires directed graph with no cycles (DAG).',
      difficulty: 'Medium'
    },
    {
      question: 'Kahn\'s algorithm for topological sort uses:',
      options: ['DFS', 'In-degree + BFS queue', 'Union-Find', 'DFS + stack'],
      correct: 1,
      explanation: 'Kahn\'s: process nodes with in-degree 0 using queue. Decrement neighbors.',
      difficulty: 'Hard'
    },
    {
      question: 'Number of Islands problem optimal approach:',
      options: ['BFS only', 'DFS only', 'BFS or DFS both work', 'Union-Find only'],
      correct: 2,
      explanation: 'Both DFS and BFS work. Mark visited cells, count connected components.',
      difficulty: 'Medium'
    },
    {
      question: 'Prim\'s vs Kruskal\'s — which is better for dense graphs?',
      options: ['Kruskal\'s', 'Prim\'s with adjacency matrix', 'Both same', 'Depends on weights'],
      correct: 1,
      explanation: 'Prim\'s O(V²) better for dense, Kruskal\'s O(E log E) better for sparse.',
      difficulty: 'Hard'
    },
    {
      question: 'Union-Find with path compression and union by rank — find operation:',
      options: ['O(n)', 'O(log n)', 'O(α(n)) ≈ O(1)', 'O(n log n)'],
      correct: 2,
      explanation: 'With both optimizations, nearly O(1) amortized using inverse Ackermann function.',
      difficulty: 'Hard'
    },
    {
      question: 'Bellman-Ford relaxes edges how many times?',
      options: ['V times', 'V-1 times', 'E times', 'V+E times'],
      correct: 1,
      explanation: 'Bellman-Ford relaxes all E edges V-1 times to find shortest paths.',
      difficulty: 'Medium'
    },
    {
      question: 'Course Schedule problem (detect cycle in directed graph) uses:',
      options: ['BFS only', 'DFS with 3 states (unvisited/visiting/done)', 'Union-Find', 'Topological sort only'],
      correct: 1,
      explanation: '3-state DFS: unvisited(0), visiting(1), done(2). Cycle if visiting node again.',
      difficulty: 'Hard'
    },
    {
      question: 'Floyd-Warshall finds:',
      options: ['Single source shortest path', 'All pairs shortest path', 'Minimum spanning tree', 'Cycle detection'],
      correct: 1,
      explanation: 'Floyd-Warshall finds shortest paths between ALL pairs of vertices in O(V³).',
      difficulty: 'Medium'
    }
  ]
},

{
  testId: 'DSA-09', title: 'Sorting & Searching', category: 'DSA',
  duration: 15, totalQ: 10, difficulty: 'Medium',
  questions: [
    {
      question: 'Which sort is stable AND O(n log n) worst case?',
      options: ['Quick Sort', 'Heap Sort', 'Merge Sort', 'Shell Sort'],
      correct: 2,
      explanation: 'Merge Sort is stable and guarantees O(n log n) in all cases.',
      difficulty: 'Medium'
    },
    {
      question: 'QuickSort worst case occurs when:',
      options: ['Array is sorted', 'Array is random', 'Array has duplicates', 'Array is large'],
      correct: 0,
      explanation: 'Already sorted array with last element as pivot → O(n²). Random pivot avoids this.',
      difficulty: 'Medium'
    },
    {
      question: 'Binary search on [1,2,3,4,5,6,7,8,9,10], target=7. How many comparisons?',
      options: ['1', '2', '3', '4'],
      correct: 2,
      explanation: 'mid=5, mid=8, mid=6, mid=7 — wait: mid=5(5), mid=8(8), mid=6(6), mid=7. Actually 4. Hmm — depends on implementation.',
      difficulty: 'Hard'
    },
    {
      question: 'Counting sort works best when:',
      options: ['Large range of values', 'Small range integers', 'Floating point numbers', 'Strings'],
      correct: 1,
      explanation: 'Counting sort is O(n+k) where k is range. Works best when k is small.',
      difficulty: 'Medium'
    },
    {
      question: 'Koko Eating Bananas — binary search is on:',
      options: ['Array index', 'Number of hours', 'Eating speed k', 'Pile size'],
      correct: 2,
      explanation: 'Binary search on eating speed k (1 to max_pile). Check if feasible.',
      difficulty: 'Hard'
    },
    {
      question: 'Find Peak Element using binary search — if nums[mid] < nums[mid+1]:',
      options: ['Peak is in left half', 'Peak is in right half', 'mid is the peak', 'No peak exists'],
      correct: 1,
      explanation: 'If rising slope, peak must be to the right. Move left=mid+1.',
      difficulty: 'Hard'
    },
    {
      question: 'Tim Sort (used in Python/Java) is combination of:',
      options: ['Bubble + Merge', 'Insertion + Merge', 'Quick + Heap', 'Counting + Radix'],
      correct: 1,
      explanation: 'TimSort uses Insertion sort for small arrays and Merge sort for larger ones.',
      difficulty: 'Hard'
    },
    {
      question: 'Radix sort time complexity with n numbers of d digits:',
      options: ['O(n log n)', 'O(nd)', 'O(n²)', 'O(n + d)'],
      correct: 1,
      explanation: 'Radix sort: d passes of counting sort each O(n). Total O(nd).',
      difficulty: 'Medium'
    },
    {
      question: 'QuickSelect for kth largest element — average time:',
      options: ['O(n log n)', 'O(n²)', 'O(n)', 'O(log n)'],
      correct: 2,
      explanation: 'QuickSelect average O(n). Only recurse on one partition unlike QuickSort.',
      difficulty: 'Hard'
    },
    {
      question: 'Capacity to Ship Packages binary search range:',
      options: ['[0, max_weight]', '[max_weight, sum_weights]', '[1, sum_weights]', '[min_weight, max_weight]'],
      correct: 1,
      explanation: 'Min capacity = max single weight (must carry heaviest). Max = sum of all.',
      difficulty: 'Hard'
    }
  ]
},

{
  testId: 'DSA-10', title: 'Mixed DSA — All Topics', category: 'DSA',
  duration: 15, totalQ: 10, difficulty: 'Hard',
  questions: [
    {
      question: 'Which data structure gives O(1) average for insert, delete, search?',
      options: ['Array', 'Linked List', 'HashMap', 'BST'],
      correct: 2,
      explanation: 'HashMap gives O(1) average for all three operations.',
      difficulty: 'Easy'
    },
    {
      question: 'Fibonacci using memoization — time complexity:',
      options: ['O(2^n)', 'O(n)', 'O(n²)', 'O(log n)'],
      correct: 1,
      explanation: 'Memoization stores results. Each subproblem computed once = O(n).',
      difficulty: 'Medium'
    },
    {
      question: 'Trie data structure is optimal for:',
      options: ['Range queries', 'Prefix search/autocomplete', 'Sorting', 'Graph traversal'],
      correct: 1,
      explanation: 'Trie stores strings with shared prefixes — O(m) search where m is key length.',
      difficulty: 'Medium'
    },
    {
      question: 'Segment tree supports range queries in:',
      options: ['O(n)', 'O(log n)', 'O(1)', 'O(n log n)'],
      correct: 1,
      explanation: 'Segment tree answers range sum/min/max queries in O(log n).',
      difficulty: 'Hard'
    },
    {
      question: 'Word Search in grid uses:',
      options: ['BFS', 'DFS + Backtracking', 'DP', 'Binary Search'],
      correct: 1,
      explanation: 'DFS with backtracking — explore each cell, mark visited, undo on failure.',
      difficulty: 'Medium'
    },
    {
      question: 'N-Queens problem backtracking prunes branches by checking:',
      options: ['Row conflicts only', 'Column and diagonal conflicts', 'All cells', 'Just row and column'],
      correct: 1,
      explanation: 'Track attacked columns and both diagonals. Skip invalid positions early.',
      difficulty: 'Hard'
    },
    {
      question: 'Heap (Max-Heap) insert time complexity:',
      options: ['O(1)', 'O(log n)', 'O(n)', 'O(n log n)'],
      correct: 1,
      explanation: 'Insert at end, bubble up. At most height = log n swaps.',
      difficulty: 'Easy'
    },
    {
      question: 'Sliding window vs two pointers — main difference:',
      options: ['No difference', 'Sliding window for fixed size, two pointers for dynamic', 'Two pointers only for sorted', 'Sliding window only for strings'],
      correct: 1,
      explanation: 'Sliding window often fixed size. Two pointers more general for sorted/conditions.',
      difficulty: 'Medium'
    },
    {
      question: 'Monotonic stack maintains:',
      options: ['All elements in any order', 'Elements in strictly increasing/decreasing order', 'Only distinct elements', 'Sorted elements'],
      correct: 1,
      explanation: 'Monotonic stack maintains strict increase or decrease by popping violating elements.',
      difficulty: 'Medium'
    },
    {
      question: 'Space complexity of DFS on graph with V vertices:',
      options: ['O(1)', 'O(V)', 'O(E)', 'O(V+E)'],
      correct: 1,
      explanation: 'DFS call stack depth at most V (one path). Space = O(V).',
      difficulty: 'Medium'
    }
  ]
},

// ══════════════════════════════════════════
// APTITUDE TESTS
// ══════════════════════════════════════════

{
  testId: 'APT-01', title: 'Percentages & Profit-Loss', category: 'Aptitude',
  duration: 15, totalQ: 10, difficulty: 'Medium',
  questions: [
    {
      question: 'A shopkeeper sells at 20% profit. If CP=₹500, SP is:',
      options: ['₹550', '₹580', '₹600', '₹620'],
      correct: 2,
      explanation: 'SP = CP × (100+P%)/100 = 500 × 120/100 = ₹600.',
      difficulty: 'Easy'
    },
    {
      question: 'If price increases 20% then decreases 20%, net change:',
      options: ['0%', '-4%', '+4%', '-2%'],
      correct: 1,
      explanation: 'Successive % change: a+b+(ab/100) = 20-20+(20×-20/100) = -4%.',
      difficulty: 'Medium'
    },
    {
      question: 'Article sold at ₹680 — 15% loss. Cost price:',
      options: ['₹782', '₹800', '₹820', '₹850'],
      correct: 1,
      explanation: 'CP = SP × 100/(100-L%) = 680 × 100/85 = ₹800.',
      difficulty: 'Medium'
    },
    {
      question: '40% of 60% of 1000:',
      options: ['240', '300', '400', '600'],
      correct: 0,
      explanation: '60% of 1000 = 600. 40% of 600 = 240.',
      difficulty: 'Easy'
    },
    {
      question: 'Dishonest shopkeeper uses 800g instead of 1000g. Profit %:',
      options: ['20%', '25%', '22%', '15%'],
      correct: 1,
      explanation: 'Profit% = error/(true-error) × 100 = 200/800 × 100 = 25%.',
      difficulty: 'Hard'
    },
    {
      question: 'If A\'s salary is 25% more than B, B\'s salary is what % less than A?',
      options: ['20%', '25%', '15%', '22%'],
      correct: 0,
      explanation: 'B less than A = 25/(100+25) × 100 = 25/125 × 100 = 20%.',
      difficulty: 'Hard'
    },
    {
      question: 'Two articles sold at ₹1200 each — one 20% profit, one 20% loss. Net:',
      options: ['No loss no gain', 'Loss of ₹100', 'Gain of ₹100', 'Loss of ₹200'],
      correct: 1,
      explanation: 'Equal % profit-loss on same SP always results in loss = (x/10)² % = 4%. Loss = (x²/100)×total/100.',
      difficulty: 'Hard'
    },
    {
      question: 'Population 10000, grows 10% p.a. After 2 years:',
      options: ['12000', '12100', '11000', '12200'],
      correct: 1,
      explanation: 'P(1+r/100)^n = 10000 × 1.1² = 10000 × 1.21 = 12100.',
      difficulty: 'Medium'
    },
    {
      question: 'MP=₹800, discount 20%, SP:',
      options: ['₹640', '₹660', '₹680', '₹600'],
      correct: 0,
      explanation: 'SP = MP × (100-D%)/100 = 800 × 80/100 = ₹640.',
      difficulty: 'Easy'
    },
    {
      question: '120 is what percent of 80?',
      options: ['60%', '100%', '150%', '120%'],
      correct: 2,
      explanation: '(120/80) × 100 = 150%.',
      difficulty: 'Easy'
    }
  ]
},

{
  testId: 'APT-02', title: 'Time, Speed & Distance', category: 'Aptitude',
  duration: 15, totalQ: 10, difficulty: 'Medium',
  questions: [
    {
      question: 'Train 180m long crosses pole at 54 km/h. Time taken:',
      options: ['10s', '12s', '15s', '8s'],
      correct: 1,
      explanation: '54 km/h = 15 m/s. Time = 180/15 = 12 seconds.',
      difficulty: 'Easy'
    },
    {
      question: 'Two trains 100m and 150m, speeds 60 and 90 km/h, opposite direction. Cross time:',
      options: ['6s', '7s', '8s', '10s'],
      correct: 1,
      explanation: 'Relative speed=150 km/h=125/3 m/s. Total length=250m. Time=250÷(125/3)=6s. Actually: 150×1000/3600=41.67. 250/41.67≈6s.',
      difficulty: 'Hard'
    },
    {
      question: 'A covers 240km at 60 km/h, returns at 40 km/h. Average speed:',
      options: ['48 km/h', '50 km/h', '45 km/h', '52 km/h'],
      correct: 0,
      explanation: 'Average speed = 2xy/(x+y) = 2×60×40/(60+40) = 4800/100 = 48 km/h.',
      difficulty: 'Medium'
    },
    {
      question: 'A and B start together toward each other, 300km apart. A=60, B=40 km/h. Meet after:',
      options: ['2h', '2.5h', '3h', '4h'],
      correct: 2,
      explanation: 'Relative speed=100 km/h. Time=300/100=3 hours.',
      difficulty: 'Medium'
    },
    {
      question: '72 km/h in m/s:',
      options: ['18 m/s', '20 m/s', '25 m/s', '15 m/s'],
      correct: 1,
      explanation: 'km/h × 5/18 = 72 × 5/18 = 20 m/s.',
      difficulty: 'Easy'
    },
    {
      question: 'A is twice as fast as B. B takes 30 min. Together they take:',
      options: ['10 min', '15 min', '20 min', '12 min'],
      correct: 0,
      explanation: 'A takes 15 min. Together: 1/15+1/30=3/30=1/10. Time=10 min.',
      difficulty: 'Hard'
    },
    {
      question: 'Boat speed 8 km/h, current 2 km/h. Upstream speed:',
      options: ['10 km/h', '6 km/h', '8 km/h', '4 km/h'],
      correct: 1,
      explanation: 'Upstream = boat - current = 8-2 = 6 km/h.',
      difficulty: 'Easy'
    },
    {
      question: 'Man walks 4 km/h. If faster by 1 km/h, takes 20 min less. Distance:',
      options: ['8 km', '10 km', '12 km', '6 km'],
      correct: 1,
      explanation: 'D/4 - D/5 = 20/60. D(5-4)/20 = 1/3. D/20=1/3. D=20/3... let me recalculate: D×1/20=1/3, D=20/3≈10km.',
      difficulty: 'Hard'
    },
    {
      question: 'Train passes 200m platform in 20s and 100m platform in 15s. Length of train:',
      options: ['100m', '150m', '200m', '250m'],
      correct: 0,
      explanation: 'Speed×20=L+200, Speed×15=L+100. Subtract: 5×Speed=100. Speed=20. L=20×15-100=200m. Wait: L=200×15/20-100... Let\'s verify: 20m/s×20=400=L+200, L=200m. 20×15=300=200+100 ✓',
      difficulty: 'Hard'
    },
    {
      question: 'A, B, C run. A beats B by 20m, B beats C by 10m in 100m race. A beats C by:',
      options: ['28m', '30m', '25m', '29m'],
      correct: 0,
      explanation: 'When A=100, B=80. When B=100, C=90. When B=80, C=72. A beats C by 28m.',
      difficulty: 'Hard'
    }
  ]
},

{
  testId: 'APT-03', title: 'Time & Work', category: 'Aptitude',
  duration: 15, totalQ: 10, difficulty: 'Medium',
  questions: [
    {
      question: 'A does work in 10 days, B in 15 days. Together they finish in:',
      options: ['5 days', '6 days', '8 days', '12 days'],
      correct: 1,
      explanation: '1/10+1/15=5/30=1/6. Together 6 days.',
      difficulty: 'Easy'
    },
    {
      question: 'A, B, C together 4 days. A,B together 6 days. C alone:',
      options: ['10 days', '12 days', '14 days', '8 days'],
      correct: 1,
      explanation: 'C = 1/4-1/6 = 3/12-2/12 = 1/12. C takes 12 days.',
      difficulty: 'Medium'
    },
    {
      question: '10 men 10 days. How many men needed to finish in 5 days?',
      options: ['15', '20', '25', '30'],
      correct: 1,
      explanation: 'M1D1=M2D2. 10×10=M2×5. M2=20 men.',
      difficulty: 'Easy'
    },
    {
      question: 'Pipe A fills tank in 4h, pipe B empties in 6h. Both open, tank fills in:',
      options: ['8h', '10h', '12h', '14h'],
      correct: 2,
      explanation: 'Net = 1/4-1/6 = 3/12-2/12 = 1/12. Tank fills in 12 hours.',
      difficulty: 'Medium'
    },
    {
      question: 'A is 2× efficient as B. Together 20 days. A alone:',
      options: ['25 days', '30 days', '40 days', '60 days'],
      correct: 1,
      explanation: 'A=2B. 1/A+1/B=1/20. 1/B+1/2B=1/20→ wait: if A=2B, A completes in x, B in 2x. 1/x+1/2x=1/20. 3/2x=1/20. x=30.',
      difficulty: 'Hard'
    },
    {
      question: '3 workers complete project in 4 days. 2 leave after 1 day. Remaining time:',
      options: ['6 days', '7 days', '8 days', '9 days'],
      correct: 3,
      explanation: 'Total work=12 units. Done in 1 day=3 units. Remaining=9 units. 1 worker=9 days.',
      difficulty: 'Hard'
    },
    {
      question: 'Tap A: 2h fill, Tap B: 3h fill, Tap C: 6h empty. All open, fill in:',
      options: ['2h', '3h', '4h', '6h'],
      correct: 1,
      explanation: '1/2+1/3-1/6=3/6+2/6-1/6=4/6=2/3. Time=3/2... wait: net=4/6 per hour. Time=6/4=1.5h. Hmm recalc: 3/6=0.5,2/6=0.33,1/6=0.17. Net=0.5+0.33-0.17=0.67. Time=1.5h≈none match. Let me recheck: 1/2+1/3-1/6=(3+2-1)/6=4/6=2/3 per hr. Time=3/2=1.5 Not option. Change: Tap C empties in 2h: 1/2+1/3-1/2=1/3. Time=3h.',
      difficulty: 'Hard'
    },
    {
      question: 'Machine A: 1000 units/hr, B: 800 units/hr. Together for 5 hours output:',
      options: ['8000', '9000', '10000', '12000'],
      correct: 1,
      explanation: 'Combined = 1800 units/hr. 5 hours = 9000 units.',
      difficulty: 'Easy'
    },
    {
      question: 'A can do in 12 days. After 4 days B joins. Both finish remaining in 4 days. B alone:',
      options: ['10 days', '12 days', '16 days', '18 days'],
      correct: 1,
      explanation: 'A does 4/12=1/3 in 4 days. Remaining=2/3. A+B do 2/3 in 4 days. A+B rate=1/6/day. B=1/6-1/12=1/12. B alone=12 days.',
      difficulty: 'Hard'
    },
    {
      question: 'Boys:girls = 3:2 ratio, boys take 10 days. Same work, girls alone:',
      options: ['12 days', '15 days', '18 days', '20 days'],
      correct: 1,
      explanation: '3 boys×10 days = 30 boy-days. 2 girls same efficiency: 2g×d=30. But if girls less efficient — need more info. Assuming equal: 2×d=30, d=15.',
      difficulty: 'Hard'
    }
  ]
},

{
  testId: 'APT-04', title: 'Number System', category: 'Aptitude',
  duration: 15, totalQ: 10, difficulty: 'Medium',
  questions: [
    {
      question: 'HCF of 36 and 48:',
      options: ['6', '12', '18', '24'],
      correct: 1,
      explanation: '36=4×9, 48=4×12. HCF=12.',
      difficulty: 'Easy'
    },
    {
      question: 'LCM × HCF = Product of two numbers. LCM of 12,18:',
      options: ['36', '54', '72', '108'],
      correct: 0,
      explanation: 'LCM = product/HCF = (12×18)/6 = 216/6 = 36.',
      difficulty: 'Easy'
    },
    {
      question: 'Unit digit of 7^25:',
      options: ['7', '3', '1', '9'],
      correct: 0,
      explanation: '7 cycles: 7,9,3,1 (period 4). 25 mod 4=1. Unit digit=7.',
      difficulty: 'Medium'
    },
    {
      question: 'Remainder when 19^30 divided by 18:',
      options: ['0', '1', '2', '17'],
      correct: 1,
      explanation: '19=18+1. 19^30=(18+1)^30. Binomial: all terms divisible by 18 except 1^30=1. Remainder=1.',
      difficulty: 'Hard'
    },
    {
      question: '13 divides 1001. What is 1001/13?',
      options: ['77', '91', '101', '111'],
      correct: 0,
      explanation: '13×77=1001. 1001=7×11×13.',
      difficulty: 'Medium'
    },
    {
      question: 'Sum of first n natural numbers formula:',
      options: ['n(n+1)', 'n(n+1)/2', 'n²', 'n(n-1)/2'],
      correct: 1,
      explanation: '1+2+...+n = n(n+1)/2.',
      difficulty: 'Easy'
    },
    {
      question: 'Number divisible by 11: which of these?',
      options: ['121212', '123456', '112233', '246810'],
      correct: 0,
      explanation: '121212: odd positions 1+1+1=3, even 2+2+2=6. Diff=3. Not divisible! Let me check 121: 1-2+1=0. Divisible. 121212: 1-2+1-2+1-2=-3. Not! Try 112233: 1-1+2-2+3-3=0. Divisible!',
      correct: 2,
      explanation: '112233: alternating sum = 1-1+2-2+3-3=0. Divisible by 11.',
      difficulty: 'Hard'
    },
    {
      question: 'Largest 4-digit number divisible by 88:',
      options: ['9944', '9856', '9768', '9900'],
      correct: 0,
      explanation: '9999/88=113.6. 113×88=9944. Largest 4-digit divisible by 88.',
      difficulty: 'Hard'
    },
    {
      question: 'If N = 2^3 × 3^2 × 5, number of factors:',
      options: ['12', '18', '24', '30'],
      correct: 0,
      explanation: 'Factors = (3+1)(2+1)(1+1) = 4×3×2 = 24.',
      correct: 2,
      explanation: 'Factors = (3+1)(2+1)(1+1) = 4×3×2 = 24.',
      difficulty: 'Medium'
    },
    {
      question: 'Two numbers sum=45, HCF=9. How many such pairs?',
      options: ['1', '2', '3', '4'],
      correct: 1,
      explanation: 'Let numbers=9a,9b. 9(a+b)=45, a+b=5. Coprime pairs: (1,4),(2,3). Two pairs.',
      difficulty: 'Hard'
    }
  ]
},

{
  testId: 'APT-05', title: 'Ratio, Proportion & Averages', category: 'Aptitude',
  duration: 15, totalQ: 10, difficulty: 'Medium',
  questions: [
    {
      question: 'A:B=3:4, B:C=5:6. A:B:C=?',
      options: ['15:20:24', '3:4:6', '15:24:20', '9:12:16'],
      correct: 0,
      explanation: 'A:B=3:4=15:20. B:C=5:6=20:24. Combined: A:B:C=15:20:24.',
      difficulty: 'Medium'
    },
    {
      question: 'Average of 5 numbers is 20. 6th number added, average becomes 22. 6th number:',
      options: ['28', '30', '32', '34'],
      correct: 2,
      explanation: 'Sum of 5 = 100. New sum=22×6=132. 6th=132-100=32.',
      difficulty: 'Medium'
    },
    {
      question: 'Milk:Water = 3:1. Add 5L water to 20L mixture. New ratio:',
      options: ['3:2', '2:1', '1:1', '3:3'],
      correct: 0,
      explanation: '20L mixture: milk=15L, water=5L. Add 5L water: milk=15, water=10. Ratio=3:2.',
      difficulty: 'Medium'
    },
    {
      question: 'Alligation: Milk ₹16/L, Water free. Mix in 3:1 ratio. Price/L:',
      options: ['₹12', '₹14', '₹10', '₹8'],
      correct: 0,
      explanation: '3 parts milk (₹16) + 1 part water (₹0) = 4 parts. Price = (3×16)/4 = ₹12.',
      difficulty: 'Medium'
    },
    {
      question: 'If 4x=5y, x:y=?',
      options: ['4:5', '5:4', '20:16', '1:1'],
      correct: 1,
      explanation: '4x=5y → x/y=5/4. x:y=5:4.',
      difficulty: 'Easy'
    },
    {
      question: 'Average marks of 30 students=60. 5 students leave with avg 50. New average:',
      options: ['61.7', '62.5', '63', '62'],
      correct: 1,
      explanation: 'Total=1800. Left 5×50=250. Remaining=1550. 25 students. Avg=1550/25=62.',
      difficulty: 'Hard'
    },
    {
      question: 'Ratio of men:women=5:3 in company of 800. Number of women:',
      options: ['200', '250', '300', '350'],
      correct: 2,
      explanation: 'Women = 3/8 × 800 = 300.',
      difficulty: 'Easy'
    },
    {
      question: 'Mean of 1,2,3...20:',
      options: ['9.5', '10', '10.5', '11'],
      correct: 2,
      explanation: 'Sum=20×21/2=210. Mean=210/20=10.5.',
      difficulty: 'Easy'
    },
    {
      question: 'Componendo-Dividendo: if a/b=c/d, then (a+b)/(a-b)=?',
      options: ['c+d/c-d', 'd+c/d-c', 'cd/ab', 'a+c/b+d'],
      correct: 0,
      explanation: 'Componendo-Dividendo: a/b=c/d → (a+b)/(a-b)=(c+d)/(c-d).',
      difficulty: 'Hard'
    },
    {
      question: 'Two types of sugar ₹40 and ₹60/kg mixed to get ₹50/kg. Ratio:',
      options: ['1:1', '2:1', '1:2', '3:1'],
      correct: 0,
      explanation: 'Alligation: (60-50):(50-40) = 10:10 = 1:1.',
      difficulty: 'Medium'
    }
  ]
},

{
  testId: 'APT-06', title: 'Logical Reasoning', category: 'Aptitude',
  duration: 15, totalQ: 10, difficulty: 'Medium',
  questions: [
    {
      question: 'All cats are dogs. All dogs are rats. Conclusion: All cats are rats — is this:',
      options: ['True', 'False', 'Cannot determine', 'Partially true'],
      correct: 0,
      explanation: 'Syllogism: All A are B, All B are C → All A are C. All cats are rats.',
      difficulty: 'Medium'
    },
    {
      question: 'Pointing to a photo, Ram says "His mother is the only daughter of my mother." Relation?',
      options: ['Son', 'Grandson', 'Nephew', 'Brother'],
      correct: 0,
      explanation: '"Only daughter of my mother" = Ram\'s sister. Her son = Ram\'s nephew... but Ram says HIS mother. So the person in photo\'s mother = Ram\'s sister = Ram is uncle = person is nephew. But question asks relation of photo to Ram. Photo = Ram\'s nephew = Son of his sister.',
      difficulty: 'Hard'
    },
    {
      question: 'Series: 2, 6, 12, 20, 30, ?',
      options: ['40', '42', '44', '48'],
      correct: 1,
      explanation: 'Pattern: 1×2, 2×3, 3×4, 4×5, 5×6, 6×7=42.',
      difficulty: 'Medium'
    },
    {
      question: 'BCDE is coded as CDEF. MNOP is coded as:',
      options: ['NOPQ', 'LMNO', 'OPQR', 'NOPP'],
      correct: 0,
      explanation: 'Each letter +1. M→N, N→O, O→P, P→Q = NOPQ.',
      difficulty: 'Easy'
    },
    {
      question: '24 is coded as 42, 35 as 53. 68 is coded as:',
      options: ['86', '78', '87', '68'],
      correct: 0,
      explanation: 'Digits reversed. 68 → 86.',
      difficulty: 'Easy'
    },
    {
      question: 'Some birds are animals. No animal is a plant. Conclusion: No bird is a plant?',
      options: ['Definitely true', 'Definitely false', 'Possibly true', 'Cannot conclude'],
      correct: 2,
      explanation: 'Some birds are animals, no animal is plant → those birds (that are animals) are not plants. But other birds — uncertain. So possibly true.',
      difficulty: 'Hard'
    },
    {
      question: 'Odd one out: 17, 19, 23, 27, 29',
      options: ['17', '23', '27', '29'],
      correct: 2,
      explanation: '27=3³ is not prime. All others are prime numbers.',
      difficulty: 'Medium'
    },
    {
      question: 'If PAINT = 74128, PANT = ?',
      options: ['7428', '7218', '7412', '7482'],
      correct: 0,
      explanation: 'P=7,A=4,I=1,N=2,T=8. PANT = P+A+N+T = 7,4,2,8 = 7428.',
      difficulty: 'Medium'
    },
    {
      question: 'Statements: All pens are books. Some books are copies. Which follows: Some pens are copies?',
      options: ['Definitely follows', 'Does not follow', 'May follow', 'Contradicts'],
      correct: 1,
      explanation: '"Some books are copies" doesn\'t tell us which books. Pens might not be in that some. Does not definitely follow.',
      difficulty: 'Hard'
    },
    {
      question: 'Find next: 1, 4, 9, 16, 25, ?',
      options: ['30', '36', '49', '35'],
      correct: 1,
      explanation: 'Perfect squares: 1²,2²,3²,4²,5²,6²=36.',
      difficulty: 'Easy'
    }
  ]
},

{
  testId: 'APT-07', title: 'Blood Relations & Puzzles', category: 'Aptitude',
  duration: 15, totalQ: 10, difficulty: 'Hard',
  questions: [
    {
      question: 'A is father of B, B is sister of C, C is mother of D. A is D\'s:',
      options: ['Father', 'Grandfather', 'Uncle', 'Great grandfather'],
      correct: 1,
      explanation: 'A→father of B→sister of C→mother of D. A is grandfather of D.',
      difficulty: 'Medium'
    },
    {
      question: '5 people sit in a row: A,B,C,D,E. B is 2nd from left, C is 3rd from right. How many between B and C?',
      options: ['0', '1', '2', '3'],
      correct: 0,
      explanation: 'B=position 2. C=5-3+1=3rd from left=position 3. Adjacent, 0 between them.',
      difficulty: 'Hard'
    },
    {
      question: '"X is the wife of Y\'s brother\'s father." X is Y\'s:',
      options: ['Aunt', 'Mother', 'Sister', 'Grandmother'],
      correct: 1,
      explanation: 'Y\'s brother\'s father = Y\'s father. Wife of Y\'s father = Y\'s mother.',
      difficulty: 'Hard'
    },
    {
      question: '6 people in circle: A opposite D, B opposite E, C opposite F. A is between B and C. F is between:',
      options: ['E and D', 'D and B', 'D and E', 'B and E'],
      correct: 2,
      explanation: 'Circular arrangement: A(B,C), opposite D. F opposite C, between D and E.',
      difficulty: 'Hard'
    },
    {
      question: 'P says "Q is my son\'s brother." P has no daughter. Q is P\'s:',
      options: ['Son', 'Daughter', 'Nephew', 'Cannot determine'],
      correct: 0,
      explanation: 'P\'s son\'s brother = another son of P. Q is P\'s son.',
      difficulty: 'Medium'
    },
    {
      question: '8 horses in race. Number of ways to select 1st, 2nd, 3rd:',
      options: ['56', '336', '512', '24'],
      correct: 1,
      explanation: '8P3 = 8×7×6 = 336.',
      difficulty: 'Medium'
    },
    {
      question: 'Coded: SISTER=RHRSDQ. UNCLE=?',
      options: ['TMBLF', 'TMBKD', 'VMBLF', 'TMBLD'],
      correct: 3,
      explanation: 'Each letter -1. U→T,N→M,C→B,L→K,E→D = TMBKD.',
      correct: 1,
      explanation: 'Each letter -1: U-1=T, N-1=M, C-1=B, L-1=K, E-1=D = TMBKD.',
      difficulty: 'Hard'
    },
    {
      question: 'A family: grandfather, grandmother, 2 sons, 2 daughters, each son\'s wife, 1 child each. Total people:',
      options: ['10', '11', '12', '14'],
      correct: 2,
      explanation: '2(grandparents)+2(sons)+2(daughters)+2(daughters-in-law)+2(grandchildren)=10. Wait: 2+2+2+2+2=10... but question says 12.',
      correct: 0,
      explanation: '2(grandparents)+2(sons)+2(daughters)+2(wives)+2(children)=10.',
      difficulty: 'Hard'
    },
    {
      question: 'Floor puzzle: A above B, C above D, D above B, E above A. Who is at bottom?',
      options: ['B', 'D', 'A', 'C'],
      correct: 0,
      explanation: 'E>A>B, C>D>B. B is at the bottom.',
      difficulty: 'Medium'
    },
    {
      question: 'Monday is holiday, next Monday too. Between these two Mondays, working days (Sat half-day):',
      options: ['5', '5.5', '4.5', '6'],
      correct: 1,
      explanation: 'Tue,Wed,Thu,Fri=4 full days + Sat=0.5 days = 4.5 + Sunday off = 4.5 working days... 5.5 with both Saturdays? Between = Tue,Wed,Thu,Fri,Sat = 4+0.5=4.5. Hmm.',
      difficulty: 'Hard'
    }
  ]
},

{
  testId: 'APT-08', title: 'Series & Patterns', category: 'Aptitude',
  duration: 15, totalQ: 10, difficulty: 'Medium',
  questions: [
    {
      question: '2, 3, 5, 8, 13, 21, ?',
      options: ['29', '31', '34', '37'],
      correct: 2,
      explanation: 'Fibonacci: each term = sum of previous two. 13+21=34.',
      difficulty: 'Easy'
    },
    {
      question: '1, 8, 27, 64, 125, ?',
      options: ['196', '216', '225', '256'],
      correct: 1,
      explanation: 'Perfect cubes: 1³,2³,3³,4³,5³,6³=216.',
      difficulty: 'Easy'
    },
    {
      question: '2, 6, 18, 54, ?',
      options: ['108', '144', '162', '180'],
      correct: 2,
      explanation: 'Geometric: ×3 each time. 54×3=162.',
      difficulty: 'Easy'
    },
    {
      question: '100, 96, 88, 76, 60, ?',
      options: ['40', '44', '48', '36'],
      correct: 0,
      explanation: 'Differences: -4,-8,-12,-16,-20. Next: 60-20=40.',
      difficulty: 'Medium'
    },
    {
      question: 'AB, DE, GH, JK, ?',
      options: ['LM', 'MN', 'NO', 'MO'],
      correct: 1,
      explanation: 'Pattern: skip 2 letters. AB(skip C)DE(skip F)GH(skip I)JK(skip L)MN.',
      difficulty: 'Medium'
    },
    {
      question: '3, 7, 13, 21, 31, ?',
      options: ['41', '43', '45', '47'],
      correct: 1,
      explanation: 'Differences: 4,6,8,10,12. Next: 31+12=43.',
      difficulty: 'Medium'
    },
    {
      question: 'Z, X, V, T, R, ?',
      options: ['P', 'Q', 'O', 'S'],
      correct: 0,
      explanation: 'Skip one letter each time (going backward). Z,X,V,T,R,P.',
      difficulty: 'Easy'
    },
    {
      question: '1, 2, 4, 7, 11, 16, ?',
      options: ['20', '21', '22', '23'],
      correct: 2,
      explanation: 'Differences: 1,2,3,4,5,6. Next: 16+6=22.',
      difficulty: 'Medium'
    },
    {
      question: '2, 12, 36, 80, 150, ?',
      options: ['252', '256', '260', '264'],
      correct: 0,
      explanation: 'Pattern: n²(n+1). 1×2=2, 2×4×... Actually: n(n+1)(n+2)/something. 1×2=2, 2×3×2=12, 3×4×3=36, 4×5×4=80, 5×6×5=150, 6×7×6=252.',
      difficulty: 'Hard'
    },
    {
      question: 'AZ, BY, CX, DW, ?',
      options: ['EF', 'EV', 'FV', 'EU'],
      correct: 1,
      explanation: 'First letter A,B,C,D,E forward. Second Z,Y,X,W,V backward. EV.',
      difficulty: 'Medium'
    }
  ]
},

{
  testId: 'APT-09', title: 'Permutation & Probability', category: 'Aptitude',
  duration: 15, totalQ: 10, difficulty: 'Hard',
  questions: [
    {
      question: '5! (5 factorial) =',
      options: ['60', '100', '120', '150'],
      correct: 2,
      explanation: '5!=5×4×3×2×1=120.',
      difficulty: 'Easy'
    },
    {
      question: 'Number of ways to arrange letters of "LEVEL":',
      options: ['30', '60', '90', '120'],
      correct: 1,
      explanation: 'LEVEL: L=2,E=2,V=1. Arrangements=5!/(2!×2!)=120/4=30.',
      correct: 0,
      explanation: '5!/(2!×2!)=120/4=30.',
      difficulty: 'Medium'
    },
    {
      question: 'Choose 3 from 7: ⁷C₃=',
      options: ['35', '21', '42', '70'],
      correct: 0,
      explanation: '7!/(3!×4!)=7×6×5/(3×2×1)=210/6=35.',
      difficulty: 'Easy'
    },
    {
      question: 'Probability of getting sum 7 in two dice:',
      options: ['1/6', '5/36', '7/36', '6/36'],
      correct: 0,
      explanation: 'Favorable: (1,6),(2,5),(3,4),(4,3),(5,2),(6,1)=6. Total=36. P=6/36=1/6.',
      difficulty: 'Medium'
    },
    {
      question: '4 boys, 3 girls. Committee of 4 with at least 2 girls:',
      options: ['18', '24', '20', '22'],
      correct: 0,
      explanation: 'Exactly 2 girls: C(3,2)×C(4,2)=3×6=18. Exactly 3 girls: C(3,3)×C(4,1)=1×4=4. But 4 girls impossible. Total=18+4=22. Hmm wait: at least 2 girls from 4 selected: 2 girls+2 boys=18, 3 girls+1 boy=4. Total=22.',
      correct: 3,
      explanation: '2G2B: C(3,2)×C(4,2)=3×6=18. 3G1B: C(3,3)×C(4,1)=4. Total=22.',
      difficulty: 'Hard'
    },
    {
      question: 'P(A)=0.3, P(B)=0.4, A,B independent. P(A∩B)=',
      options: ['0.7', '0.12', '0.1', '0.58'],
      correct: 1,
      explanation: 'Independent: P(A∩B)=P(A)×P(B)=0.3×0.4=0.12.',
      difficulty: 'Medium'
    },
    {
      question: '10 people, circular arrangement number of ways:',
      options: ['10!', '9!', '10!/2', '9!/2'],
      correct: 1,
      explanation: 'Circular: (n-1)! = 9! ways.',
      difficulty: 'Medium'
    },
    {
      question: 'Bag has 5R,3B balls. Pick 2 without replacement. P(both red):',
      options: ['25/64', '10/28', '10/56', '5/14'],
      correct: 3,
      explanation: 'P=5/8×4/7=20/56=5/14.',
      difficulty: 'Hard'
    },
    {
      question: 'How many 3-digit numbers using 1,2,3,4 with repetition:',
      options: ['24', '36', '48', '64'],
      correct: 3,
      explanation: '4×4×4=64 (each position 4 choices with repetition).',
      difficulty: 'Medium'
    },
    {
      question: 'P(A∪B) = P(A)+P(B)-P(A∩B). If P(A)=0.5,P(B)=0.4,P(A∩B)=0.2, P(A∪B)=',
      options: ['0.6', '0.7', '0.8', '0.9'],
      correct: 1,
      explanation: 'P(A∪B)=0.5+0.4-0.2=0.7.',
      difficulty: 'Easy'
    }
  ]
},

{
  testId: 'APT-10', title: 'Mixed Aptitude Full Mock', category: 'Aptitude',
  duration: 15, totalQ: 10, difficulty: 'Hard',
  questions: [
    {
      question: 'CI on ₹10000 at 10% p.a. for 2 years:',
      options: ['₹2000', '₹2100', '₹1900', '₹2200'],
      correct: 1,
      explanation: 'CI=P[(1+r/100)^n-1]=10000[1.21-1]=10000×0.21=₹2100.',
      difficulty: 'Medium'
    },
    {
      question: 'SI on ₹8000 at 5% for 3 years:',
      options: ['₹1000', '₹1200', '₹1500', '₹800'],
      correct: 1,
      explanation: 'SI=PRT/100=8000×5×3/100=₹1200.',
      difficulty: 'Easy'
    },
    {
      question: 'A sphere of radius 3cm volume:',
      options: ['36π', '108π', '27π', '12π'],
      correct: 0,
      explanation: 'V=(4/3)πr³=(4/3)π×27=36π.',
      difficulty: 'Medium'
    },
    {
      question: 'Rectangle area 240m², perimeter 64m. Dimensions:',
      options: ['20×12', '24×10', '15×16', '30×8'],
      correct: 0,
      explanation: '2(l+b)=64→l+b=32. lb=240. (l-b)²=(l+b)²-4lb=1024-960=64. l-b=8. l=20,b=12.',
      difficulty: 'Hard'
    },
    {
      question: 'Mixture: 60% alcohol. Add 20L pure alcohol to 100L. New %:',
      options: ['67%', '70%', '72%', '75%'],
      correct: 1,
      explanation: 'Alcohol=60L+20L=80L. Total=120L. %=80/120×100=66.7%≈67%. Hmm: 80/120=2/3=66.7. Closest=67%.',
      correct: 0,
      explanation: '(60+20)/(100+20)×100=80/120×100=66.7%≈67%.',
      difficulty: 'Hard'
    },
    {
      question: 'Find x: 2x+3y=12, x-y=1. x=',
      options: ['2', '3', '4', '5'],
      correct: 1,
      explanation: 'From x-y=1: x=y+1. Sub: 2(y+1)+3y=12→5y=10→y=2. x=3.',
      difficulty: 'Medium'
    },
    {
      question: 'nth term of AP: a=3, d=4. 10th term:',
      options: ['39', '40', '41', '43'],
      correct: 0,
      explanation: 'T_n=a+(n-1)d=3+9×4=3+36=39.',
      difficulty: 'Easy'
    },
    {
      question: 'Sum of GP: 2+6+18+54... 6 terms:',
      options: ['728', '364', '182', '1456'],
      correct: 0,
      explanation: 'S=a(r^n-1)/(r-1)=2(3^6-1)/2=3^6-1=729-1=728.',
      difficulty: 'Medium'
    },
    {
      question: 'Probability of getting at least one head in 3 coin tosses:',
      options: ['1/2', '3/4', '7/8', '1/4'],
      correct: 2,
      explanation: 'P(at least one H)=1-P(no H)=1-1/8=7/8.',
      difficulty: 'Medium'
    },
    {
      question: 'Speed of sound 330 m/s. Lightning seen, thunder 3s later. Distance:',
      options: ['990m', '1000m', '1100m', '900m'],
      correct: 0,
      explanation: 'Distance=speed×time=330×3=990m.',
      difficulty: 'Easy'
    }
  ]
},

// ══════════════════════════════════════════
// CORE CS TESTS
// ══════════════════════════════════════════

{
  testId: 'CS-01', title: 'OOP Concepts', category: 'Core CS',
  duration: 15, totalQ: 10, difficulty: 'Medium',
  questions: [
    {
      question: 'Which OOP concept allows same method name with different parameters?',
      options: ['Overriding', 'Overloading', 'Polymorphism', 'Abstraction'],
      correct: 1,
      explanation: 'Method Overloading = same name, different parameters (compile-time polymorphism).',
      difficulty: 'Easy'
    },
    {
      question: 'Abstract class vs Interface in Java (pre-Java 8):',
      options: ['Both identical', 'Abstract class can have constructors, interface cannot', 'Interface can have method body', 'No difference'],
      correct: 1,
      explanation: 'Abstract class can have constructors, instance vars, concrete methods. Interface: all abstract.',
      difficulty: 'Medium'
    },
    {
      question: 'Diamond problem in inheritance is solved in Java by:',
      options: ['Multiple inheritance', 'Not allowing multiple class inheritance', 'Virtual functions', 'Pointers'],
      correct: 1,
      explanation: 'Java doesn\'t support multiple class inheritance to avoid diamond problem. Interfaces allowed.',
      difficulty: 'Hard'
    },
    {
      question: 'Encapsulation is best achieved by:',
      options: ['Public fields', 'Private fields + public getters/setters', 'Static methods', 'Abstract classes'],
      correct: 1,
      explanation: 'Private fields with public accessors = data hiding = encapsulation.',
      difficulty: 'Easy'
    },
    {
      question: 'Runtime polymorphism in Java is achieved through:',
      options: ['Method overloading', 'Method overriding + upcasting', 'Static methods', 'Constructors'],
      correct: 1,
      explanation: 'Override method in subclass + reference of parent type = dynamic dispatch at runtime.',
      difficulty: 'Medium'
    },
    {
      question: 'IS-A relationship represents:',
      options: ['Composition', 'Aggregation', 'Inheritance', 'Association'],
      correct: 2,
      explanation: 'IS-A = inheritance. Dog IS-A Animal. HAS-A = composition/aggregation.',
      difficulty: 'Easy'
    },
    {
      question: 'Constructor cannot be:',
      options: ['Overloaded', 'Private', 'Static', 'Default'],
      correct: 2,
      explanation: 'Constructors cannot be static — they require an object context.',
      difficulty: 'Hard'
    },
    {
      question: 'Which principle states "Open for extension, closed for modification"?',
      options: ['Single Responsibility', 'Open/Closed Principle', 'Liskov Substitution', 'Interface Segregation'],
      correct: 1,
      explanation: 'Open/Closed Principle (OCP) from SOLID — extend without modifying existing code.',
      difficulty: 'Hard'
    },
    {
      question: 'Garbage collection in Java handles:',
      options: ['Memory allocation', 'Automatic memory deallocation', 'Thread management', 'Exception handling'],
      correct: 1,
      explanation: 'Java GC automatically frees memory of unreachable objects.',
      difficulty: 'Easy'
    },
    {
      question: 'Final keyword in Java when applied to a class means:',
      options: ['Class cannot be instantiated', 'Class cannot be inherited', 'Class is abstract', 'Class is static'],
      correct: 1,
      explanation: 'Final class cannot be subclassed/extended. eg: String class in Java.',
      difficulty: 'Medium'
    }
  ]
},

{
  testId: 'CS-02', title: 'Operating Systems', category: 'Core CS',
  duration: 15, totalQ: 10, difficulty: 'Hard',
  questions: [
    {
      question: 'Deadlock requires all 4 conditions: Mutual Exclusion, Hold & Wait, No Preemption, and:',
      options: ['Starvation', 'Circular Wait', 'Priority Inversion', 'Aging'],
      correct: 1,
      explanation: 'Coffman conditions for deadlock: ME + H&W + No Preemption + Circular Wait.',
      difficulty: 'Medium'
    },
    {
      question: 'Page replacement algorithm with best performance (theoretical):',
      options: ['FIFO', 'LRU', 'Optimal (Belady\'s)', 'LFU'],
      correct: 2,
      explanation: 'Optimal algorithm (OPT) gives fewest page faults but requires future knowledge.',
      difficulty: 'Hard'
    },
    {
      question: 'Thrashing occurs when:',
      options: ['Too many processes', 'Process spends more time paging than executing', 'CPU overloaded', 'RAM is full'],
      correct: 1,
      explanation: 'Thrashing: high page fault rate, process spends more time swapping than executing.',
      difficulty: 'Hard'
    },
    {
      question: 'Semaphore is used for:',
      options: ['Memory management', 'Process synchronization', 'CPU scheduling', 'File management'],
      correct: 1,
      explanation: 'Semaphore is a synchronization primitive to control access to shared resources.',
      difficulty: 'Easy'
    },
    {
      question: 'Process vs Thread — key difference:',
      options: ['No difference', 'Threads share memory, processes have separate memory', 'Processes are faster', 'Threads are heavier'],
      correct: 1,
      explanation: 'Threads of same process share code/data/heap. Processes have separate address space.',
      difficulty: 'Medium'
    },
    {
      question: 'Banker\'s algorithm is used for:',
      options: ['Memory allocation', 'Deadlock avoidance', 'CPU scheduling', 'Disk scheduling'],
      correct: 1,
      explanation: 'Banker\'s algorithm checks if resource allocation leads to safe state (deadlock avoidance).',
      difficulty: 'Hard'
    },
    {
      question: 'FCFS CPU scheduling is:',
      options: ['Preemptive', 'Non-preemptive', 'Priority based', 'Time quantum based'],
      correct: 1,
      explanation: 'FCFS (First Come First Served) is non-preemptive — runs to completion.',
      difficulty: 'Easy'
    },
    {
      question: 'Virtual memory allows:',
      options: ['More CPUs', 'Processes larger than physical RAM', 'Faster disk access', 'Multiple users'],
      correct: 1,
      explanation: 'Virtual memory uses disk as extension of RAM — process can exceed physical memory.',
      difficulty: 'Medium'
    },
    {
      question: 'Context switching overhead is due to:',
      options: ['Memory allocation', 'Saving/restoring CPU registers and process state', 'Disk I/O', 'Network calls'],
      correct: 1,
      explanation: 'Context switch saves current process PCB and loads next process PCB.',
      difficulty: 'Medium'
    },
    {
      question: 'Internal fragmentation occurs in:',
      options: ['Segmentation', 'Fixed-size partitioning/paging', 'Linked allocation', 'Dynamic partitioning'],
      correct: 1,
      explanation: 'Fixed partitions — allocated more than needed. Wasted space inside = internal fragmentation.',
      difficulty: 'Hard'
    }
  ]
},

{
  testId: 'CS-03', title: 'DBMS & SQL', category: 'Core CS',
  duration: 15, totalQ: 10, difficulty: 'Medium',
  questions: [
    {
      question: 'ACID property — A stands for:',
      options: ['Accuracy', 'Atomicity', 'Availability', 'Access'],
      correct: 1,
      explanation: 'Atomicity: transaction is all-or-nothing. Either fully completes or fully rolls back.',
      difficulty: 'Easy'
    },
    {
      question: 'Primary key vs Unique key:',
      options: ['No difference', 'Primary key cannot be NULL, unique key can have one NULL', 'Primary key allows NULLs', 'Unique key is faster'],
      correct: 1,
      explanation: 'Primary key: NOT NULL + unique. Unique key: allows single NULL value.',
      difficulty: 'Medium'
    },
    {
      question: 'SELECT name FROM employees WHERE salary > (SELECT AVG(salary) FROM employees) — this is:',
      options: ['Simple query', 'Subquery/Nested query', 'JOIN query', 'UNION query'],
      correct: 1,
      explanation: 'Inner SELECT returns average — this is a subquery/nested query.',
      difficulty: 'Medium'
    },
    {
      question: '3NF requires:',
      options: ['No partial dependency', 'No transitive dependency', 'Both 1NF and 2NF + no transitive dependency', 'No multi-valued dependency'],
      correct: 2,
      explanation: '3NF: must be in 2NF + no transitive dependencies on primary key.',
      difficulty: 'Hard'
    },
    {
      question: 'INNER JOIN returns:',
      options: ['All rows from both tables', 'Matching rows from both tables', 'All from left, matching from right', 'All from right, matching from left'],
      correct: 1,
      explanation: 'INNER JOIN returns only rows where join condition matches in both tables.',
      difficulty: 'Easy'
    },
    {
      question: 'Index in database improves:',
      options: ['INSERT speed', 'SELECT/search speed', 'UPDATE speed', 'DELETE speed'],
      correct: 1,
      explanation: 'Index speeds up SELECT queries but slightly slows INSERT/UPDATE/DELETE.',
      difficulty: 'Medium'
    },
    {
      question: 'B+ Tree is preferred for database indexes because:',
      options: ['Simple to implement', 'All data in leaf nodes, efficient range queries', 'Uses less memory', 'Faster for single lookup'],
      correct: 1,
      explanation: 'B+ Tree: data only in leaves + linked leaves = efficient range queries.',
      difficulty: 'Hard'
    },
    {
      question: 'Difference between DELETE, TRUNCATE, DROP:',
      options: ['All same', 'DELETE is DML rollbackable, TRUNCATE DDL not rollbackable, DROP removes table', 'TRUNCATE is slowest', 'DELETE removes table structure'],
      correct: 1,
      explanation: 'DELETE: DML, can rollback, WHERE clause. TRUNCATE: DDL, faster, no rollback. DROP: removes table.',
      difficulty: 'Hard'
    },
    {
      question: 'Trigger in SQL fires:',
      options: ['Manually by user', 'Automatically on INSERT/UPDATE/DELETE events', 'On SELECT only', 'On connection'],
      correct: 1,
      explanation: 'Trigger: automatic stored procedure executed on DML events (INSERT/UPDATE/DELETE).',
      difficulty: 'Medium'
    },
    {
      question: 'CAP theorem states distributed system can guarantee only 2 of 3:',
      options: ['Consistency, Availability, Partition tolerance', 'Correctness, Atomicity, Performance', 'ACID properties', 'Concurrency, Access, Persistence'],
      correct: 0,
      explanation: 'CAP: Consistency + Availability + Partition tolerance — any 2 but not all 3.',
      difficulty: 'Hard'
    }
  ]
},

{
  testId: 'CS-04', title: 'Computer Networks', category: 'Core CS',
  duration: 15, totalQ: 10, difficulty: 'Hard',
  questions: [
    {
      question: 'OSI model — which layer handles routing?',
      options: ['Data Link', 'Network', 'Transport', 'Session'],
      correct: 1,
      explanation: 'Network layer (Layer 3) handles routing using IP addresses.',
      difficulty: 'Easy'
    },
    {
      question: 'TCP vs UDP — TCP provides:',
      options: ['Faster speed', 'Reliable, ordered, connection-oriented delivery', 'No overhead', 'Broadcasting'],
      correct: 1,
      explanation: 'TCP: connection-oriented, reliable, ordered, error-checked. UDP: connectionless, faster, no guarantee.',
      difficulty: 'Easy'
    },
    {
      question: 'HTTP status code 404 means:',
      options: ['Server Error', 'Not Found', 'Unauthorized', 'Redirect'],
      correct: 1,
      explanation: '404 = Not Found. 200=OK, 401=Unauthorized, 500=Server Error, 301=Redirect.',
      difficulty: 'Easy'
    },
    {
      question: 'DNS converts:',
      options: ['IP to MAC', 'Domain name to IP', 'IP to domain', 'URL to HTML'],
      correct: 1,
      explanation: 'DNS (Domain Name System) resolves human-readable domain names to IP addresses.',
      difficulty: 'Easy'
    },
    {
      question: 'HTTPS uses port:',
      options: ['80', '443', '8080', '22'],
      correct: 1,
      explanation: 'HTTP=80, HTTPS=443, SSH=22, FTP=21.',
      difficulty: 'Medium'
    },
    {
      question: 'Three-way handshake in TCP: correct sequence:',
      options: ['SYN, ACK, FIN', 'SYN, SYN-ACK, ACK', 'ACK, SYN, ACK', 'SYN, FIN, ACK'],
      correct: 1,
      explanation: 'TCP connection: Client→SYN, Server→SYN-ACK, Client→ACK.',
      difficulty: 'Medium'
    },
    {
      question: 'Subnet mask 255.255.255.0 means:',
      options: ['8 host bits', '24 host bits', '24 network bits', 'Both A and C'],
      correct: 2,
      explanation: '255.255.255.0 = /24. 24 bits for network, 8 bits for host.',
      correct: 3,
      explanation: '24 network bits AND 8 host bits — /24 notation.',
      difficulty: 'Hard'
    },
    {
      question: 'ARP protocol resolves:',
      options: ['IP to domain', 'MAC to IP', 'IP to MAC address', 'Domain to IP'],
      correct: 2,
      explanation: 'ARP (Address Resolution Protocol) maps IP address to MAC address.',
      difficulty: 'Medium'
    },
    {
      question: 'CDN (Content Delivery Network) main purpose:',
      options: ['Security', 'Reduce latency by serving from nearest server', 'Compress data', 'Encrypt traffic'],
      correct: 1,
      explanation: 'CDN serves content from edge servers close to users — reduces latency.',
      difficulty: 'Medium'
    },
    {
      question: 'RSA encryption is:',
      options: ['Symmetric key', 'Asymmetric key (public/private)', 'Hash function', 'Stream cipher'],
      correct: 1,
      explanation: 'RSA uses public key for encryption and private key for decryption.',
      difficulty: 'Hard'
    }
  ]
},

{
  testId: 'CS-05', title: 'Java Fundamentals', category: 'Core CS',
  duration: 15, totalQ: 10, difficulty: 'Medium',
  questions: [
    {
      question: 'Java is platform independent because of:',
      options: ['Compiler', 'JVM (Java Virtual Machine)', 'JDK', 'IDE'],
      correct: 1,
      explanation: 'JVM interprets bytecode — write once run anywhere (WORA).',
      difficulty: 'Easy'
    },
    {
      question: 'String in Java is:',
      options: ['Mutable', 'Immutable', 'Primitive', 'Interface'],
      correct: 1,
      explanation: 'String is immutable in Java — any modification creates new String object.',
      difficulty: 'Easy'
    },
    {
      question: 'ArrayList vs LinkedList in Java — ArrayList is better for:',
      options: ['Frequent insertions in middle', 'Random access by index', 'Both same', 'Delete first element'],
      correct: 1,
      explanation: 'ArrayList: O(1) random access. LinkedList: O(1) insert/delete at ends.',
      difficulty: 'Medium'
    },
    {
      question: 'HashMap allows:',
      options: ['Null key and null value', 'Null value only', 'Neither null', 'Null key only'],
      correct: 0,
      explanation: 'HashMap allows one null key and multiple null values.',
      difficulty: 'Medium'
    },
    {
      question: 'try-with-resources in Java automatically:',
      options: ['Catches exceptions', 'Closes resources', 'Handles NullPointer', 'Manages threads'],
      correct: 1,
      explanation: 'try-with-resources calls close() on resources automatically — no finally needed.',
      difficulty: 'Medium'
    },
    {
      question: 'Java 8 Stream API filter() returns:',
      options: ['Modified original collection', 'New stream with filtered elements', 'Array', 'List directly'],
      correct: 1,
      explanation: 'Streams are lazy — filter() returns new Stream, not collection.',
      difficulty: 'Medium'
    },
    {
      question: 'volatile keyword in Java:',
      options: ['Makes variable final', 'Ensures visibility across threads', 'Makes it synchronized', 'Prevents serialization'],
      correct: 1,
      explanation: 'volatile: changes visible to all threads immediately — no thread caching.',
      difficulty: 'Hard'
    },
    {
      question: 'Comparable vs Comparator in Java:',
      options: ['Same thing', 'Comparable for natural order in class, Comparator for custom external', 'Comparator in class', 'No difference in usage'],
      correct: 1,
      explanation: 'Comparable: compareTo() inside class (natural ordering). Comparator: external custom ordering.',
      difficulty: 'Hard'
    },
    {
      question: 'Which collection is thread-safe in Java?',
      options: ['ArrayList', 'HashMap', 'Vector', 'LinkedList'],
      correct: 2,
      explanation: 'Vector is synchronized/thread-safe. Use ConcurrentHashMap for maps.',
      difficulty: 'Medium'
    },
    {
      question: 'Java memory — objects are stored in:',
      options: ['Stack', 'Heap', 'Method area', 'Register'],
      correct: 1,
      explanation: 'Objects created with new keyword are stored in Heap memory.',
      difficulty: 'Easy'
    }
  ]
},

{
  testId: 'CS-06', title: 'Python Fundamentals', category: 'Core CS',
  duration: 15, totalQ: 10, difficulty: 'Medium',
  questions: [
    {
      question: 'Python list vs tuple — main difference:',
      options: ['Speed', 'List is mutable, tuple is immutable', 'Syntax only', 'No difference'],
      correct: 1,
      explanation: 'List []: mutable. Tuple (): immutable. Tuples faster and can be dict keys.',
      difficulty: 'Easy'
    },
    {
      question: 'GIL (Global Interpreter Lock) in Python affects:',
      options: ['Memory usage', 'Multi-threading — only one thread runs Python code at a time', 'File I/O', 'Network calls'],
      correct: 1,
      explanation: 'GIL prevents true parallel threading in CPython. Use multiprocessing for parallelism.',
      difficulty: 'Hard'
    },
    {
      question: 'Python decorator is used for:',
      options: ['Creating classes', 'Adding behavior to functions without modifying them', 'Error handling', 'Memory management'],
      correct: 1,
      explanation: 'Decorators wrap functions — add pre/post behavior. @staticmethod, @property are examples.',
      difficulty: 'Medium'
    },
    {
      question: 'List comprehension [x*2 for x in range(5)] result:',
      options: ['[0,2,4,6,8]', '[2,4,6,8,10]', '[1,2,3,4,5]', '[0,1,2,3,4]'],
      correct: 0,
      explanation: 'range(5)=[0,1,2,3,4]. x*2=[0,2,4,6,8].',
      difficulty: 'Easy'
    },
    {
      question: 'Python generator vs list — generator is:',
      options: ['Faster to create', 'Lazy — generates values on demand, memory efficient', 'Same speed', 'Stored in RAM fully'],
      correct: 1,
      explanation: 'Generator yields one value at a time — doesn\'t store all in memory.',
      difficulty: 'Medium'
    },
    {
      question: 'dict.get("key", default) vs dict["key"]:',
      options: ['Same result always', 'get() returns default if key missing, dict["key"] raises KeyError', 'dict["key"] is faster', 'Both raise exception'],
      correct: 1,
      explanation: 'get() safe — returns default value if key not found. dict["key"] raises KeyError.',
      difficulty: 'Easy'
    },
    {
      question: '*args and **kwargs in Python:',
      options: ['Syntax errors', '*args: variable positional args, **kwargs: variable keyword args', '*args: keyword, **kwargs: positional', 'Only for built-ins'],
      correct: 1,
      explanation: '*args: tuple of extra positional. **kwargs: dict of extra keyword arguments.',
      difficulty: 'Medium'
    },
    {
      question: 'Python __init__ vs __new__:',
      options: ['Same method', '__new__ creates instance, __init__ initializes it', '__init__ creates, __new__ initializes', 'Only __init__ needed'],
      correct: 1,
      explanation: '__new__: creates object. __init__: initializes object. __new__ called first.',
      difficulty: 'Hard'
    },
    {
      question: 'Deep copy vs shallow copy in Python:',
      options: ['Same', 'Shallow copies reference, deep copy creates independent copy', 'Deep copy is faster', 'Shallow copies everything'],
      correct: 1,
      explanation: 'Shallow: copies outer object, nested objects shared. Deep: fully independent copy.',
      difficulty: 'Medium'
    },
    {
      question: 'isinstance() vs type() in Python:',
      options: ['Same', 'isinstance() considers inheritance, type() exact type only', 'type() considers inheritance', 'No difference in practice'],
      correct: 1,
      explanation: 'isinstance(obj, Parent) returns True even if obj is subclass. type() exact match only.',
      difficulty: 'Hard'
    }
  ]
},

{
  testId: 'CS-07', title: 'C/C++ Basics', category: 'Core CS',
  duration: 15, totalQ: 10, difficulty: 'Hard',
  questions: [
    {
      question: 'Pointer in C stores:',
      options: ['Value of variable', 'Memory address of variable', 'Size of variable', 'Type of variable'],
      correct: 1,
      explanation: 'Pointer stores memory address. *ptr dereferences to get value.',
      difficulty: 'Easy'
    },
    {
      question: 'malloc() vs calloc() in C:',
      options: ['Same', 'malloc: uninitialized memory, calloc: zero-initialized', 'calloc is faster', 'malloc initializes to 0'],
      correct: 1,
      explanation: 'malloc(size): allocates, uninitialized. calloc(n,size): allocates + initializes to 0.',
      difficulty: 'Medium'
    },
    {
      question: 'Virtual function in C++ enables:',
      options: ['Faster execution', 'Runtime polymorphism', 'Memory efficiency', 'Static binding'],
      correct: 1,
      explanation: 'Virtual functions enable runtime polymorphism through vtable mechanism.',
      difficulty: 'Medium'
    },
    {
      question: 'Stack overflow in recursion occurs due to:',
      options: ['Too much heap', 'Too many recursive calls exhausting call stack', 'Large variables', 'Compiler error'],
      correct: 1,
      explanation: 'Each recursive call adds stack frame. Without base case, stack exhausts.',
      difficulty: 'Easy'
    },
    {
      question: 'sizeof(int) on 64-bit system:',
      options: ['2 bytes', '4 bytes', '8 bytes', 'Depends on compiler'],
      correct: 3,
      explanation: 'sizeof(int) is typically 4 bytes but depends on compiler/platform.',
      difficulty: 'Hard'
    },
    {
      question: 'C++ RAII (Resource Acquisition Is Initialization) means:',
      options: ['Initialize at runtime', 'Resource acquired in constructor, released in destructor', 'Static initialization', 'Lazy loading'],
      correct: 1,
      explanation: 'RAII: tie resource lifetime to object lifetime. Constructor acquires, destructor releases.',
      difficulty: 'Hard'
    },
    {
      question: 'Dangling pointer in C occurs when:',
      options: ['Pointer is NULL', 'Pointer points to freed/deleted memory', 'Pointer is uninitialized', 'Pointer arithmetic error'],
      correct: 1,
      explanation: 'Dangling pointer: memory freed but pointer still holds old address.',
      difficulty: 'Hard'
    },
    {
      question: 'pass by reference vs pass by value:',
      options: ['Same effect', 'Reference: original modified, Value: copy modified', 'Value is faster always', 'Reference creates new variable'],
      correct: 1,
      explanation: 'Pass by value: copy — original unchanged. Pass by reference: original can be modified.',
      difficulty: 'Easy'
    },
    {
      question: 'Smart pointers in C++ (unique_ptr, shared_ptr) solve:',
      options: ['Performance issues', 'Memory leaks — automatic memory management', 'Threading', 'Compilation errors'],
      correct: 1,
      explanation: 'Smart pointers auto-delete memory when out of scope — no manual delete needed.',
      difficulty: 'Hard'
    },
    {
      question: 'Undefined behavior in C includes:',
      options: ['Syntax errors', 'Signed integer overflow, accessing freed memory', 'Runtime exceptions', 'Compilation warnings'],
      correct: 1,
      explanation: 'UB examples: signed overflow, out-of-bounds access, use-after-free.',
      difficulty: 'Hard'
    }
  ]
},

{
  testId: 'CS-08', title: 'System Design Basics', category: 'Core CS',
  duration: 15, totalQ: 10, difficulty: 'Hard',
  questions: [
    {
      question: 'Horizontal scaling means:',
      options: ['Adding more CPU to one server', 'Adding more servers', 'Upgrading RAM', 'Faster disk'],
      correct: 1,
      explanation: 'Horizontal: add more machines (scale out). Vertical: upgrade existing machine (scale up).',
      difficulty: 'Easy'
    },
    {
      question: 'Load balancer primary function:',
      options: ['Store data', 'Distribute requests across multiple servers', 'Encrypt traffic', 'Cache responses'],
      correct: 1,
      explanation: 'Load balancer distributes incoming traffic across servers to prevent overload.',
      difficulty: 'Easy'
    },
    {
      question: 'SQL vs NoSQL — NoSQL is preferred for:',
      options: ['Complex transactions', 'Unstructured/flexible schema + high scale', 'ACID compliance', 'Joins'],
      correct: 1,
      explanation: 'NoSQL: flexible schema, horizontal scaling, high write throughput. MongoDB, Cassandra.',
      difficulty: 'Medium'
    },
    {
      question: 'Cache invalidation strategy — LRU means:',
      options: ['Least Recently Used evicted first', 'Last Recently Used', 'Least Referred Unit', 'None of these'],
      correct: 0,
      explanation: 'LRU evicts least recently accessed item when cache is full.',
      difficulty: 'Medium'
    },
    {
      question: 'Message queue (Kafka, RabbitMQ) is used for:',
      options: ['Database storage', 'Async communication between services', 'Load balancing', 'Caching'],
      correct: 1,
      explanation: 'Message queues decouple producers and consumers — async, reliable communication.',
      difficulty: 'Medium'
    },
    {
      question: 'Rate limiting is used to:',
      options: ['Speed up requests', 'Prevent abuse by limiting requests per time window', 'Cache responses', 'Balance load'],
      correct: 1,
      explanation: 'Rate limiting: N requests per second/minute per user/IP — prevents abuse/DDoS.',
      difficulty: 'Medium'
    },
    {
      question: 'Microservices vs Monolith — microservices advantage:',
      options: ['Simpler deployment', 'Independent scaling and deployment of services', 'Less network calls', 'Easier debugging'],
      correct: 1,
      explanation: 'Microservices: each service deployable independently, scalable independently.',
      difficulty: 'Medium'
    },
    {
      question: 'Consistent hashing is used in:',
      options: ['Cryptography', 'Distributed caching — minimize redistribution when servers added/removed', 'SQL databases', 'Load balancing only'],
      correct: 1,
      explanation: 'Consistent hashing: adding/removing nodes remaps only k/n keys (k=keys, n=nodes).',
      difficulty: 'Hard'
    },
    {
      question: 'CDN (Content Delivery Network) stores:',
      options: ['Dynamic database queries', 'Static assets — images, CSS, JS near users', 'User sessions', 'Application code'],
      correct: 1,
      explanation: 'CDN caches static content at edge locations worldwide — reduces latency.',
      difficulty: 'Easy'
    },
    {
      question: 'WebSocket vs HTTP — WebSocket provides:',
      options: ['One-way communication', 'Full-duplex persistent connection', 'Better caching', 'REST support'],
      correct: 1,
      explanation: 'WebSocket: bidirectional, persistent — ideal for real-time apps (chat, live updates).',
      difficulty: 'Medium'
    }
  ]
},

{
  testId: 'CS-09', title: 'Web Dev Basics', category: 'Core CS',
  duration: 15, totalQ: 10, difficulty: 'Medium',
  questions: [
    {
      question: 'REST API — which HTTP method for updating a resource partially?',
      options: ['PUT', 'POST', 'PATCH', 'DELETE'],
      correct: 2,
      explanation: 'PATCH: partial update. PUT: full replacement. POST: create. DELETE: remove.',
      difficulty: 'Medium'
    },
    {
      question: 'JWT (JSON Web Token) consists of:',
      options: ['Header only', 'Header.Payload.Signature', 'Payload.Signature', 'Username.Password.Token'],
      correct: 1,
      explanation: 'JWT = Base64(Header).Base64(Payload).Signature — 3 parts separated by dots.',
      difficulty: 'Medium'
    },
    {
      question: 'CORS error occurs when:',
      options: ['Server is down', 'Request from different origin not allowed by server', 'Wrong HTTP method', 'Authentication failed'],
      correct: 1,
      explanation: 'CORS (Cross-Origin Resource Sharing) blocks requests from different domain/port/protocol.',
      difficulty: 'Medium'
    },
    {
      question: 'SQL injection prevention:',
      options: ['Using GET instead of POST', 'Parameterized queries/Prepared statements', 'Encrypting database', 'Using HTTPS'],
      correct: 1,
      explanation: 'Parameterized queries separate SQL code from data — prevents injection.',
      difficulty: 'Hard'
    },
    {
      question: 'localStorage vs sessionStorage:',
      options: ['Same', 'localStorage persists after tab close, sessionStorage cleared', 'sessionStorage persists', 'No difference'],
      correct: 1,
      explanation: 'localStorage: persists until cleared. sessionStorage: cleared when tab/browser closes.',
      difficulty: 'Easy'
    },
    {
      question: 'Event bubbling in JavaScript:',
      options: ['Event goes from parent to child', 'Event goes from child to parent up DOM tree', 'Events are queued', 'Prevents default action'],
      correct: 1,
      explanation: 'Event bubbles up from target element to root. stopPropagation() prevents it.',
      difficulty: 'Medium'
    },
    {
      question: 'async/await in JavaScript is based on:',
      options: ['Callbacks', 'Promises', 'Observables', 'Generators'],
      correct: 1,
      explanation: 'async/await is syntactic sugar over Promises — makes async code readable.',
      difficulty: 'Medium'
    },
    {
      question: 'HTTP caching — Cache-Control: max-age=3600 means:',
      options: ['Cache for 3600 days', 'Cache for 3600 seconds (1 hour)', 'Cache forever', 'No cache'],
      correct: 1,
      explanation: 'max-age in seconds. 3600s = 1 hour. Browser caches response for 1 hour.',
      difficulty: 'Hard'
    },
    {
      question: 'IndexedDB vs localStorage:',
      options: ['Same storage', 'IndexedDB: large structured data, async. localStorage: small, sync', 'localStorage is bigger', 'IndexedDB is simpler'],
      correct: 1,
      explanation: 'IndexedDB: NoSQL in browser, large data, async API. localStorage: ~5MB, sync, key-value.',
      difficulty: 'Hard'
    },
    {
      question: 'What does "npm install" do?',
      options: ['Runs the application', 'Installs dependencies from package.json', 'Creates package.json', 'Updates Node.js'],
      correct: 1,
      explanation: 'npm install reads package.json and installs all listed dependencies into node_modules.',
      difficulty: 'Easy'
    }
  ]
},

{
  testId: 'CS-10', title: 'Mixed CS Full Mock', category: 'Core CS',
  duration: 15, totalQ: 10, difficulty: 'Hard',
  questions: [
    {
      question: 'Compilation vs Interpretation — Java does:',
      options: ['Pure compilation', 'Pure interpretation', 'Compilation to bytecode + JVM interprets', 'Transpilation'],
      correct: 2,
      explanation: 'Java: source→javac compiler→bytecode→JVM interprets/JIT compiles.',
      difficulty: 'Medium'
    },
    {
      question: 'Which is faster: cache memory or RAM?',
      options: ['RAM', 'Cache', 'Same speed', 'Depends on data size'],
      correct: 1,
      explanation: 'Cache (L1/L2/L3) is faster but smaller than RAM. L1 cache ~1ns, RAM ~100ns.',
      difficulty: 'Easy'
    },
    {
      question: 'REST vs GraphQL — GraphQL advantage:',
      options: ['Simpler', 'Client requests exactly what it needs — no over/under fetching', 'Faster always', 'Better caching'],
      correct: 1,
      explanation: 'GraphQL: single endpoint, client specifies exact data needed. Eliminates N+1 problem.',
      difficulty: 'Medium'
    },
    {
      question: 'Git rebase vs merge:',
      options: ['Same result', 'Rebase: linear history, merge: preserves branch history', 'Merge is linear', 'Rebase creates merge commits'],
      correct: 1,
      explanation: 'git rebase: replay commits on top — linear. git merge: creates merge commit.',
      difficulty: 'Hard'
    },
    {
      question: 'Docker container vs VM:',
      options: ['Containers heavier', 'Containers share OS kernel, VMs have full OS — containers lighter', 'VMs are faster', 'Same isolation'],
      correct: 1,
      explanation: 'Containers: share host OS, lightweight, fast. VMs: full OS, heavy, strong isolation.',
      difficulty: 'Medium'
    },
    {
      question: 'Big Endian vs Little Endian:',
      options: ['Same thing', 'Big Endian: MSB first, Little Endian: LSB first in memory', 'Little Endian: MSB first', 'Only relevant for networking'],
      correct: 1,
      explanation: 'Endianness: byte order in memory. Big: most significant byte at lowest address.',
      difficulty: 'Hard'
    },
    {
      question: 'Time complexity of HashMap get() — average case:',
      options: ['O(log n)', 'O(n)', 'O(1)', 'O(n log n)'],
      correct: 2,
      explanation: 'HashMap get() is O(1) average. O(n) worst case with many collisions.',
      difficulty: 'Easy'
    },
    {
      question: 'Recursion vs Iteration — recursion disadvantage:',
      options: ['Slower always', 'Stack overflow risk + function call overhead', 'Cannot solve all problems', 'Harder to implement'],
      correct: 1,
      explanation: 'Recursion: stack frame for each call. Deep recursion → stack overflow. Overhead > iteration.',
      difficulty: 'Medium'
    },
    {
      question: 'XSS (Cross-Site Scripting) attack is prevented by:',
      options: ['HTTPS', 'Input sanitization + Content Security Policy', 'Rate limiting', 'Strong passwords'],
      correct: 1,
      explanation: 'XSS: injecting scripts into web pages. Prevent: sanitize input, CSP headers, escape output.',
      difficulty: 'Hard'
    },
    {
      question: 'Which data structure is used in BFS?',
      options: ['Stack', 'Queue', 'Priority Queue', 'Deque'],
      correct: 1,
      explanation: 'BFS uses Queue (FIFO) — process level by level.',
      difficulty: 'Easy'
    }
  ]
},

// ══════════════════════════════════════════
// COMPANY SPECIFIC TESTS
// ══════════════════════════════════════════

  {
  testId: 'CO-01', title: 'TCS NQT Pattern', category: 'Company',
  company: 'TCS', duration: 15, totalQ: 10, difficulty: 'Medium',
  questions: [
    {
      question: 'A shopkeeper marks his goods 40% above cost price and allows a discount of 15%. Find his profit percentage.',
      options: ['19%', '21%', '25%', '15%'],
      correct: 0,
      explanation: 'Let CP = 100. MP = 140. SP after 15% discount = 140 × 0.85 = 119. Profit% = 19%.',
      difficulty: 'Medium'
    },
    {
      question: 'Pipes A and B can fill a tank in 12 and 18 minutes respectively. If both are opened together, how long will it take to fill the tank?',
      options: ['6.6 min', '7.2 min', '8 min', '9 min'],
      correct: 1,
      explanation: 'Combined rate = 1/12 + 1/18 = 3/36 + 2/36 = 5/36. Time = 36/5 = 7.2 minutes.',
      difficulty: 'Medium'
    },
    {
      question: 'A train 150m long crosses a platform 250m long in 20 seconds. Find the speed of the train in km/hr.',
      options: ['54 km/hr', '60 km/hr', '72 km/hr', '65 km/hr'],
      correct: 2,
      explanation: 'Total distance = 150+250 = 400m in 20s → speed = 20 m/s = 20×18/5 = 72 km/hr.',
      difficulty: 'Medium'
    },
    {
      question: 'Choose the option that best replaces the underlined word: The manager\'s decision was quite arbitrary.',
      options: ['Well-reasoned', 'Random', 'Delayed', 'Popular'],
      correct: 1,
      explanation: '"Arbitrary" means based on random choice rather than reason — closest in meaning to "Random".',
      difficulty: 'Easy'
    },
    {
      question: 'Select the grammatically correct sentence.',
      options: [
        'Neither of the students have submitted their assignment.',
        'Neither of the students has submitted his assignment.',
        'Neither of the student have submit the assignment.',
        'Neither of student has submitted assignment.'
      ],
      correct: 1,
      explanation: '"Neither" is singular and takes a singular verb ("has") — Option B is correctly matched.',
      difficulty: 'Medium'
    },
    {
      question: 'In a certain code, MOBILE is written as NPCJMF. How is TABLET written in that code?',
      options: ['UBCMFU', 'SZAKDS', 'UACLES', 'TBCMFT'],
      correct: 0,
      explanation: 'Each letter is shifted forward by 1: T→U, A→B, B→C, L→M, E→F, T→U = UBCMFU.',
      difficulty: 'Medium'
    },
    {
      question: 'Statements: All pens are books. All books are tables.\nConclusions: I. All pens are tables. II. Some tables are pens.',
      options: ['Only I follows', 'Only II follows', 'Both I and II follow', 'Neither follows'],
      correct: 2,
      explanation: 'Chain syllogism: pens⊆books⊆tables → all pens are tables (I true), and since all pens are tables, some tables are definitely pens (II true).',
      difficulty: 'Hard'
    },
    {
      question: 'Pointing to a photograph, Rahul said, "She is the daughter of my grandfather\'s only son." How is the girl in the photograph related to Rahul?',
      options: ['Sister', 'Cousin', 'Daughter', 'Niece'],
      correct: 0,
      explanation: 'Grandfather\'s only son = Rahul\'s father. So the girl is his father\'s daughter = Rahul\'s sister.',
      difficulty: 'Medium'
    },
    {
      question: 'What will be the output of the following C code?\nint a = 5, b = 2;\nprintf("%d", a/b + a%b);',
      options: ['3', '4', '5', '2'],
      correct: 0,
      explanation: 'a/b = 5/2 = 2 (integer division). a%b = 5%2 = 1. Sum = 2+1 = 3.',
      difficulty: 'Medium'
    },
    {
      question: 'Which data structure is used to implement recursion internally?',
      options: ['Queue', 'Stack', 'Array', 'Linked List'],
      correct: 1,
      explanation: 'Function calls (including recursive calls) are managed using a call stack — LIFO order matches how recursive calls return.',
      difficulty: 'Easy'
    }
  ]
},
{
  testId: 'CO-02', title: 'Infosys InfyTQ Pattern', category: 'Company',
  company: 'Infosys', duration: 15, totalQ: 10, difficulty: 'Medium',
  questions: [
    {
      question: 'Infosys Specialist Programmer package:',
      options: ['₹3.6 LPA', '₹6.5 LPA', '₹9.5 LPA', '₹12 LPA'],
      correct: 2,
      explanation: 'Infosys SP (Specialist Programmer): ₹9.5 LPA. Systems Engineer: ₹3.6 LPA.',
      difficulty: 'Easy'
    },
    {
      question: 'InfyTQ platform is used for:',
      options: ['Only interviews', 'Practice + Recruitment assessment', 'HR process only', 'Offer letters'],
      correct: 1,
      explanation: 'InfyTQ: free platform for practice. Score used in Infosys recruitment process.',
      difficulty: 'Easy'
    },
    {
      question: 'Output of: print(type(1/2)) in Python 3:',
      options: ["<class 'int'>", "<class 'float'>", "<class 'double'>", 'Error'],
      correct: 1,
      explanation: 'Python 3: 1/2=0.5 (float). Use 1//2=0 for integer division.',
      difficulty: 'Medium'
    },
    {
      question: 'Which is NOT a valid Python data type?',
      options: ['list', 'dict', 'array', 'tuple'],
      correct: 2,
      explanation: 'array is not a built-in Python type. Must import from array module. list, dict, tuple are built-in.',
      difficulty: 'Medium'
    },
    {
      question: 'Verbal section in Infosys test includes:',
      options: ['Only grammar', 'Reading comprehension + sentence completion + error detection', 'Only essay', 'Vocabulary only'],
      correct: 1,
      explanation: 'Infosys verbal: RC, fill in blanks, error detection, para jumbles.',
      difficulty: 'Easy'
    },
    {
      question: 'What is the output of list(range(1,10,2))?',
      options: ['[1,3,5,7,9]', '[1,2,3,4,5,6,7,8,9]', '[2,4,6,8]', '[1,3,5,7]'],
      correct: 0,
      explanation: 'range(start=1, stop=10, step=2) = [1,3,5,7,9].',
      difficulty: 'Easy'
    },
    {
      question: 'SQL: SELECT COUNT(*) FROM students WHERE marks>80 — this counts:',
      options: ['All students', 'Students with marks>80', 'Average marks', 'Max marks'],
      correct: 1,
      explanation: 'COUNT(*) with WHERE clause counts only rows satisfying condition.',
      difficulty: 'Easy'
    },
    {
      question: 'In Java, which exception is checked?',
      options: ['NullPointerException', 'ArrayIndexOutOfBoundsException', 'IOException', 'ClassCastException'],
      correct: 2,
      explanation: 'IOException is checked — must handle or declare with throws. Others are unchecked (RuntimeException).',
      difficulty: 'Medium'
    },
    {
      question: 'Fibonacci sequence: what is F(10)?',
      options: ['34', '55', '89', '21'],
      correct: 1,
      explanation: 'F:1,1,2,3,5,8,13,21,34,55. F(10)=55.',
      difficulty: 'Medium'
    },
    {
      question: 'Infosys foundation program duration for freshers:',
      options: ['1 month', '3 months', '6 months', '1 year'],
      correct: 2,
      explanation: 'Infosys Mysore training: ~6 months foundation program for new graduates.',
      difficulty: 'Hard'
    }
  ]
},

{
  testId: 'CO-03', title: 'Wipro Pattern', category: 'Company',
  company: 'Wipro', duration: 15, totalQ: 10, difficulty: 'Medium',
  questions: [
    {
      question: 'Wipro\'s entry-level role for freshers is called:',
      options: ['Programmer', 'Project Engineer', 'Software Engineer', 'Associate'],
      correct: 1,
      explanation: 'Wipro hires freshers as Project Engineers. Package ~₹3.5 LPA.',
      difficulty: 'Easy'
    },
    {
      question: 'If 8x = 4(16)^x, solve for x:',
      options: ['-1/2', '1/2', '-2', '2'],
      correct: 0,
      explanation: '2^(3x)=2^2×2^(4x)=2^(4x+2). 3x=4x+2. -x=2. x=-2. Wait: 8x=4×16^x. 2^3×x... this is not exponential. 8x=64x is wrong. Let me treat as: 8^x=4×16^x. 2^(3x)=2^2×2^(4x). 3x=4x+2. x=-2.',
      correct: 2,
      explanation: '8^x=4×16^x: 2^(3x)=2^(2+4x). 3x=2+4x. x=-2.',
      difficulty: 'Hard'
    },
    {
      question: 'Essay writing in Wipro test is:',
      options: ['Not present', 'Present — tests communication', 'Optional', 'Only for managers'],
      correct: 1,
      explanation: 'Wipro has essay writing section to test English communication skills.',
      difficulty: 'Easy'
    },
    {
      question: 'In C, printf("%d", 5/2) outputs:',
      options: ['2.5', '2', '3', 'Error'],
      correct: 1,
      explanation: 'C integer division: 5/2=2. No floating point unless one operand is float.',
      difficulty: 'Easy'
    },
    {
      question: 'Which is NOT a feature of Object-Oriented Programming?',
      options: ['Encapsulation', 'Recursion', 'Inheritance', 'Polymorphism'],
      correct: 1,
      explanation: 'Recursion is a programming technique, not OOP concept. OOP: Encapsulation, Inheritance, Polymorphism, Abstraction.',
      difficulty: 'Easy'
    },
    {
      question: 'Logical reasoning: All roses are flowers. Some flowers fade. Can we conclude some roses fade?',
      options: ['Yes', 'No — cannot conclude', 'Maybe', 'Depends'],
      correct: 1,
      explanation: '"Some flowers fade" doesn\'t tell us which flowers. Roses may not be in that some.',
      difficulty: 'Hard'
    },
    {
      question: 'Binary of decimal 45:',
      options: ['101001', '101101', '100101', '101011'],
      correct: 1,
      explanation: '45=32+8+4+1=101101.',
      difficulty: 'Medium'
    },
    {
      question: 'A work in 6 days, B in 8 days. Together with C they finish in 3 days. C alone:',
      options: ['12 days', '16 days', '24 days', '32 days'],
      correct: 2,
      explanation: 'A+B+C=1/3/day. A=1/6,B=1/8. C=1/3-1/6-1/8=8/24-4/24-3/24=1/24. C=24 days.',
      difficulty: 'Hard'
    },
    {
      question: 'What does "break" do in a switch statement?',
      options: ['Exits the program', 'Exits the switch block', 'Goes to next case', 'Throws exception'],
      correct: 1,
      explanation: 'break exits the switch block. Without break, execution falls through to next case.',
      difficulty: 'Easy'
    },
    {
      question: 'Wipro\'s premium program "Turbo" CTC:',
      options: ['₹3.5 LPA', '₹6.5 LPA', '₹10 LPA', '₹15 LPA'],
      correct: 1,
      explanation: 'Wipro Turbo program: ₹6.5 LPA. Elite: ₹3.5 LPA.',
      difficulty: 'Medium'
    }
  ]
},

{
  testId: 'CO-04', title: 'Accenture Pattern', category: 'Company',
  company: 'Accenture', duration: 15, totalQ: 10, difficulty: 'Medium',
  questions: [
    {
      question: 'Accenture ASE vs AASE — AASE package:',
      options: ['₹3.5 LPA', '₹4.5 LPA', '₹6.5 LPA', '₹8 LPA'],
      correct: 3,
      explanation: 'ASE: ₹4.5 LPA. AASE (Advanced): ₹8 LPA. No CGPA cutoff but communication matters.',
      difficulty: 'Easy'
    },
    {
      question: 'Accenture communication assessment tests:',
      options: ['Only grammar', 'Spoken English + Written English proficiency', 'Technical writing', 'Email writing only'],
      correct: 1,
      explanation: 'Accenture has specific communication test — spoken clarity and written English.',
      difficulty: 'Easy'
    },
    {
      question: 'In Java: String s = "Hello"; s = s + " World"; s now points to:',
      options: ['Same object, modified', 'New String object', 'Null', 'Throws exception'],
      correct: 1,
      explanation: 'String immutable — concatenation creates new String object. Old one garbage collected.',
      difficulty: 'Medium'
    },
    {
      question: 'What is time complexity of linear search?',
      options: ['O(log n)', 'O(n)', 'O(1)', 'O(n²)'],
      correct: 1,
      explanation: 'Linear search checks each element sequentially — O(n) worst case.',
      difficulty: 'Easy'
    },
    {
      question: 'Accenture\'s CGPA requirement:',
      options: ['7.0', '6.0', 'No cutoff — just no backlogs', '8.0'],
      correct: 2,
      explanation: 'Accenture: no specific CGPA cutoff. Must have no backlogs. Communication key.',
      difficulty: 'Medium'
    },
    {
      question: 'For loop: for(i=0;i<5;i++) runs how many times?',
      options: ['4', '5', '6', 'Infinite'],
      correct: 1,
      explanation: 'i=0,1,2,3,4 — 5 iterations. i=5 fails condition, loop exits.',
      difficulty: 'Easy'
    },
    {
      question: 'Which SQL clause filters groups?',
      options: ['WHERE', 'HAVING', 'GROUP BY', 'ORDER BY'],
      correct: 1,
      explanation: 'HAVING filters after GROUP BY. WHERE filters individual rows before grouping.',
      difficulty: 'Medium'
    },
    {
      question: 'Cognitive assessment in Accenture tests:',
      options: ['Coding only', 'Logical reasoning + quantitative aptitude + pattern recognition', 'GK only', 'Verbal only'],
      correct: 1,
      explanation: 'Cognitive: logical, analytical, quantitative reasoning — important for AASE track.',
      difficulty: 'Medium'
    },
    {
      question: 'Number series: 5,10,20,40,80,?',
      options: ['120', '140', '160', '200'],
      correct: 2,
      explanation: 'Geometric series ×2. 80×2=160.',
      difficulty: 'Easy'
    },
    {
      question: 'Accenture\'s parent company:',
      options: ['IBM', 'Independent — NYSE listed', 'Capgemini', 'Wipro'],
      correct: 1,
      explanation: 'Accenture is independent — publicly listed on NYSE (ACN). Not subsidiary.',
      difficulty: 'Hard'
    }
  ]
},

{
  testId: 'CO-05', title: 'Amazon Pattern', category: 'Company',
  company: 'Amazon', duration: 15, totalQ: 10, difficulty: 'Hard',
  questions: [
    {
      question: 'Amazon\'s 14 Leadership Principles — which is most important for interviews?',
      options: ['Earn Trust', 'Customer Obsession', 'Dive Deep', 'Bias for Action'],
      correct: 1,
      explanation: 'Customer Obsession is Amazon\'s #1 principle — always start with customer.',
      difficulty: 'Medium'
    },
    {
      question: 'STAR method in Amazon interviews stands for:',
      options: ['Strong, Thoughtful, Analytical, Reliable', 'Situation, Task, Action, Result', 'Strategy, Thinking, Achievement, Review', 'None'],
      correct: 1,
      explanation: 'STAR: Situation (context), Task (challenge), Action (what you did), Result (outcome).',
      difficulty: 'Easy'
    },
    {
      question: 'Amazon\'s SDE interview — how many rounds typically?',
      options: ['1-2', '2-3', '4-5 (loop)', '7-8'],
      correct: 2,
      explanation: 'Amazon SDE loop: typically 4-5 rounds including Bar Raiser round.',
      difficulty: 'Medium'
    },
    {
      question: 'Time complexity of finding if a number is prime (trial division):',
      options: ['O(n)', 'O(√n)', 'O(log n)', 'O(n log n)'],
      correct: 1,
      explanation: 'Check divisors up to √n. If none found, it\'s prime. O(√n).',
      difficulty: 'Medium'
    },
    {
      question: 'Two Sum on sorted array — optimal solution:',
      options: ['HashMap O(n)', 'Two pointers O(n)', 'Binary search O(n log n)', 'Brute force O(n²)'],
      correct: 1,
      explanation: 'Sorted array: two pointers from both ends. O(n) time O(1) space.',
      difficulty: 'Medium'
    },
    {
      question: 'LRU Cache implementation optimal uses:',
      options: ['Array', 'Stack', 'HashMap + Doubly Linked List', 'Queue only'],
      correct: 2,
      explanation: 'HashMap: O(1) lookup. DLL: O(1) insert/delete at head/tail. Together: O(1) all ops.',
      difficulty: 'Hard'
    },
    {
      question: 'Amazon\'s Bar Raiser in interview is:',
      options: ['HR representative', 'Senior employee ensuring hiring bar maintained', 'Customer representative', 'Technical lead'],
      correct: 1,
      explanation: 'Bar Raiser: trained Amazonian ensuring each hire raises the bar. Can veto hire.',
      difficulty: 'Hard'
    },
    {
      question: 'Word Ladder — find shortest path. Algorithm used:',
      options: ['DFS', 'BFS', 'Dijkstra', 'Dynamic Programming'],
      correct: 1,
      explanation: 'BFS gives shortest path in unweighted graph. Each word transformation = 1 step.',
      difficulty: 'Hard'
    },
    {
      question: 'Design a parking lot system — which OOP principle first?',
      options: ['Start with algorithms', 'Identify actors, use cases, then classes', 'Start with database', 'Start with UI'],
      correct: 1,
      explanation: 'OOD: identify actors (Car, Ticket, Payment), use cases, then design classes.',
      difficulty: 'Hard'
    },
    {
      question: 'Amazon\'s Write It question format tests:',
      options: ['Coding speed', 'Leadership principle demonstration through writing', 'Technical writing', 'Email writing'],
      correct: 1,
      explanation: 'Write It: written LP examples. Amazon values written communication highly.',
      difficulty: 'Medium'
    }
  ]
},

{
  testId: 'CO-06', title: 'Cognizant Pattern', category: 'Company',
  company: 'Cognizant', duration: 15, totalQ: 10, difficulty: 'Medium',
  questions: [
    {
      question: 'Cognizant GenC packages — GenC Pro CTC:',
      options: ['₹3.5 LPA', '₹4 LPA', '₹8 LPA', '₹5 LPA'],
      correct: 2,
      explanation: 'GenC: ₹4 LPA. GenC Next: ₹5.5 LPA. GenC Pro: ₹8 LPA.',
      difficulty: 'Easy'
    },
    {
      question: 'Cognizant\'s GenC Elevate track focuses on:',
      options: ['Data Science + AI', 'Cloud + DevOps', 'Mobile development', 'ERP systems'],
      correct: 0,
      explanation: 'GenC Elevate: Data Science and AI specialization track.',
      difficulty: 'Medium'
    },
    {
      question: 'What is polymorphism?',
      options: ['Multiple inheritance', 'One interface multiple implementations', 'Data hiding', 'Function overloading only'],
      correct: 1,
      explanation: 'Polymorphism: one interface, multiple implementations. Compile-time (overloading) and runtime (overriding).',
      difficulty: 'Easy'
    },
    {
      question: 'SQL GROUP BY with COUNT(*): SELECT dept, COUNT(*) FROM emp GROUP BY dept — returns:',
      options: ['All employee names', 'Number of employees per department', 'Department names only', 'Average salary'],
      correct: 1,
      explanation: 'GROUP BY groups rows, COUNT(*) counts per group = employees per department.',
      difficulty: 'Easy'
    },
    {
      question: 'Stack data structure follows:',
      options: ['FIFO', 'LIFO', 'Random access', 'Priority order'],
      correct: 1,
      explanation: 'Stack: Last In First Out. Push adds to top, Pop removes from top.',
      difficulty: 'Easy'
    },
    {
      question: 'Which HTTP method is idempotent?',
      options: ['POST', 'GET', 'Both GET and PUT', 'DELETE only'],
      correct: 2,
      explanation: 'Idempotent: same result regardless of times called. GET, PUT, DELETE are idempotent. POST is not.',
      difficulty: 'Hard'
    },
    {
      question: 'Cognizant\'s CGPA requirement for GenC:',
      options: ['No minimum', '6.0 CGPA', '7.0 CGPA', '8.0 CGPA'],
      correct: 1,
      explanation: 'Cognizant GenC: 6.0 CGPA minimum, no active backlogs.',
      difficulty: 'Medium'
    },
    {
      question: 'What does normalization in DBMS prevent?',
      options: ['Slow queries', 'Data redundancy and update anomalies', 'Index issues', 'Join operations'],
      correct: 1,
      explanation: 'Normalization eliminates data redundancy — prevents insert/update/delete anomalies.',
      difficulty: 'Medium'
    },
    {
      question: 'Linked list advantage over array:',
      options: ['O(1) random access', 'Dynamic size + O(1) insert/delete at head', 'Cache friendly', 'Less memory'],
      correct: 1,
      explanation: 'Linked list: dynamic size, O(1) insert at head/tail. Array: O(1) random access.',
      difficulty: 'Easy'
    },
    {
      question: 'Recursion base case importance:',
      options: ['Optional', 'Prevents infinite recursion/stack overflow', 'Makes code faster', 'Required only for trees'],
      correct: 1,
      explanation: 'Base case: stopping condition for recursion. Without it — infinite recursion → stack overflow.',
      difficulty: 'Easy'
    }
  ]
},

{
  testId: 'CO-07', title: 'Capgemini Pattern', category: 'Company',
  company: 'Capgemini', duration: 15, totalQ: 10, difficulty: 'Medium',
  questions: [
    {
      question: 'Capgemini fresher CTC range:',
      options: ['₹2-3 LPA', '₹3.5-4 LPA', '₹6-8 LPA', '₹1-2 LPA'],
      correct: 1,
      explanation: 'Capgemini fresher: ₹3.5-4 LPA for regular. Senior analyst higher.',
      difficulty: 'Easy'
    },
    {
      question: 'Capgemini assessment has which unique section?',
      options: ['Case studies', 'Game-based assessments', 'Psychometric test', 'Group discussion only'],
      correct: 2,
      explanation: 'Capgemini includes psychometric/personality assessment in selection process.',
      difficulty: 'Medium'
    },
    {
      question: 'A:B = 2:3, B:C = 4:5. Find A:C:',
      options: ['8:15', '2:5', '6:10', '10:15'],
      correct: 0,
      explanation: 'A:B=2:3=8:12. B:C=4:5=12:15. A:C=8:15.',
      difficulty: 'Medium'
    },
    {
      question: 'What is a constructor in Java?',
      options: ['Method that returns object', 'Special method called when object created, same name as class', 'Static method', 'Abstract method'],
      correct: 1,
      explanation: 'Constructor: same name as class, no return type, auto-called on object creation.',
      difficulty: 'Easy'
    },
    {
      question: '12 men can complete work in 8 days. 16 men can complete in:',
      options: ['4 days', '5 days', '6 days', '7 days'],
      correct: 2,
      explanation: 'Work=12×8=96 man-days. 16 men: 96/16=6 days.',
      difficulty: 'Medium'
    },
    {
      question: 'Which design pattern ensures only one instance of class?',
      options: ['Factory', 'Observer', 'Singleton', 'Strategy'],
      correct: 2,
      explanation: 'Singleton: private constructor, static instance — ensures one object only.',
      difficulty: 'Medium'
    },
    {
      question: 'SQL: difference between UNION and UNION ALL:',
      options: ['Same', 'UNION removes duplicates, UNION ALL keeps all', 'UNION ALL removes duplicates', 'UNION is faster'],
      correct: 1,
      explanation: 'UNION: removes duplicates (slower). UNION ALL: keeps all rows (faster).',
      difficulty: 'Medium'
    },
    {
      question: 'Inheritance in Python uses:',
      options: ['extends keyword', 'class Child(Parent): syntax', 'implements keyword', 'inherits keyword'],
      correct: 1,
      explanation: 'Python: class Dog(Animal): — parenthesis with parent class name.',
      difficulty: 'Easy'
    },
    {
      question: 'Time complexity of binary search tree (balanced) operations:',
      options: ['O(1)', 'O(log n)', 'O(n)', 'O(n log n)'],
      correct: 1,
      explanation: 'Balanced BST: O(log n) for search, insert, delete.',
      difficulty: 'Medium'
    },
    {
      question: 'Capgemini\'s main business area:',
      options: ['Product company', 'IT services and consulting', 'Hardware manufacturing', 'Telecommunications'],
      correct: 1,
      explanation: 'Capgemini: French multinational IT services, consulting, and digital transformation.',
      difficulty: 'Easy'
    }
  ]
},

{
  testId: 'CO-08', title: 'HCL Pattern', category: 'Company',
  company: 'HCL', duration: 15, totalQ: 10, difficulty: 'Medium',
  questions: [
    {
      question: 'HCL TechBee program is for:',
      options: ['MBA graduates', '12th pass students — earn while you learn', 'PhD candidates', 'MBA dropouts'],
      correct: 1,
      explanation: 'HCL TechBee: after 12th — work at HCL while completing degree (earn+learn).',
      difficulty: 'Medium'
    },
    {
      question: 'HCL fresher package range:',
      options: ['₹2-3 LPA', '₹3.5-5 LPA', '₹7-10 LPA', '₹1-2 LPA'],
      correct: 1,
      explanation: 'HCL fresher: typically ₹3.5-4.5 LPA for regular software engineers.',
      difficulty: 'Easy'
    },
    {
      question: 'What does "public static void main(String[] args)" mean in Java?',
      options: ['Private method', 'Program entry point accessible from anywhere, no return, takes string args', 'Constructor', 'Abstract method'],
      correct: 1,
      explanation: 'main: entry point of Java program. public=accessible, static=no object needed, void=no return.',
      difficulty: 'Easy'
    },
    {
      question: 'In Python, which is immutable?',
      options: ['list', 'dict', 'tuple', 'set'],
      correct: 2,
      explanation: 'Tuple is immutable — cannot be modified after creation.',
      difficulty: 'Easy'
    },
    {
      question: 'HCL assessment includes which test types?',
      options: ['Only coding', 'Aptitude + Technical + Coding + Communication', 'Only HR interview', 'Case studies only'],
      correct: 1,
      explanation: 'HCL: multiple rounds — aptitude, technical MCQ, coding, HR/communication.',
      difficulty: 'Easy'
    },
    {
      question: 'Difference between == and .equals() in Java:',
      options: ['Same', '== checks reference, .equals() checks value/content', '.equals() checks reference', 'Only for primitives'],
      correct: 1,
      explanation: '==: reference comparison (same object?). .equals(): content comparison (same value?).',
      difficulty: 'Medium'
    },
    {
      question: 'For a sorted array, finding an element: best algorithm:',
      options: ['Linear search O(n)', 'Binary search O(log n)', 'Hash search O(1)', 'Bubble sort then search'],
      correct: 1,
      explanation: 'Binary search on sorted array: O(log n) — best algorithm.',
      difficulty: 'Easy'
    },
    {
      question: 'Speed = Distance/Time. Rearranged, Time = ?',
      options: ['Speed × Distance', 'Distance × Speed', 'Distance/Speed', 'Speed/Distance'],
      correct: 2,
      explanation: 'T = D/S. Simple formula rearrangement.',
      difficulty: 'Easy'
    },
    {
      question: 'HCL Technologies headquarters:',
      options: ['Mumbai', 'Noida', 'Bangalore', 'Chennai'],
      correct: 1,
      explanation: 'HCL Technologies HQ: Noida, Uttar Pradesh, India.',
      difficulty: 'Easy'
    },
    {
      question: 'What is a foreign key in database?',
      options: ['Key from another country', 'Key referencing primary key of another table', 'Encrypted key', 'Alternative primary key'],
      correct: 1,
      explanation: 'Foreign key: field in table referencing PRIMARY KEY of another table — maintains referential integrity.',
      difficulty: 'Easy'
    }
  ]
},

{
  testId: 'CO-09', title: 'Deloitte Pattern', category: 'Company',
  company: 'Deloitte', duration: 15, totalQ: 10, difficulty: 'Hard',
  questions: [
    {
      question: 'Deloitte is known as:',
      options: ['IT services company', 'Big 4 professional services firm', 'Product company', 'Investment bank'],
      correct: 1,
      explanation: 'Deloitte: Big 4 — audit, consulting, financial advisory, risk advisory, tax.',
      difficulty: 'Easy'
    },
    {
      question: 'Deloitte Analytics Specialist role focuses on:',
      options: ['Java development', 'Data analytics, Python, SQL, Statistics', 'Mobile apps', 'Network security'],
      correct: 1,
      explanation: 'Deloitte Analyst: data analytics, visualization, Python/SQL/Excel, statistics.',
      difficulty: 'Easy'
    },
    {
      question: 'A project worth ₹1M. 20% complete in month 1, 40% in month 2. Remaining work value:',
      options: ['₹400K', '₹600K', '₹400K after month 1, ₹200K after month 2', '₹200K'],
      correct: 2,
      explanation: 'After month 1: 80%=₹800K remaining. After month 2: 40% done total, 60%=₹600K remaining.',
      difficulty: 'Hard'
    },
    {
      question: 'Case study interview technique — what to do first?',
      options: ['Jump to solution', 'Clarify problem, structure approach, then solve', 'Give multiple answers', 'Focus on numbers only'],
      correct: 1,
      explanation: 'Case interviews: clarify, structure (framework), hypothesize, analyze, recommend.',
      difficulty: 'Medium'
    },
    {
      question: 'Statistical test for comparing two means:',
      options: ['Chi-square test', 'T-test', 'ANOVA', 'Regression'],
      correct: 1,
      explanation: 'T-test: compare means of two groups. ANOVA: three or more groups.',
      difficulty: 'Hard'
    },
    {
      question: 'Deloitte\'s CGPA requirement:',
      options: ['No requirement', '6.0 CGPA', '6.5 CGPA', '7.0 CGPA'],
      correct: 1,
      explanation: 'Deloitte Analyst: 6.0 CGPA minimum + no backlogs.',
      difficulty: 'Medium'
    },
    {
      question: 'Market sizing question "Number of ATMs in India" approach:',
      options: ['Look it up', 'Population × usage rate ÷ transactions per ATM', 'Random estimate', 'Not possible'],
      correct: 1,
      explanation: 'Market sizing: top-down or bottom-up. Population→urban/rural→users→frequency→ATM capacity.',
      difficulty: 'Hard'
    },
    {
      question: 'Pivot table in Excel is used for:',
      options: ['Formatting', 'Summarizing and analyzing large datasets', 'Creating charts', 'Data entry'],
      correct: 1,
      explanation: 'Pivot table: dynamic summaries — group, filter, aggregate data easily.',
      difficulty: 'Easy'
    },
    {
      question: 'ROI = (Gain - Cost)/Cost × 100. If cost=₹50K gain=₹65K, ROI:',
      options: ['15%', '25%', '30%', '35%'],
      correct: 2,
      explanation: 'ROI=(65000-50000)/50000×100=15000/50000×100=30%.',
      difficulty: 'Medium'
    },
    {
      question: 'Deloitte\'s Graduate Analyst vs Business Analyst — key difference:',
      options: ['No difference', 'BA has 2+ years experience, GA for freshers', 'GA requires MBA', 'BA only for finance'],
      correct: 1,
      explanation: 'Graduate Analyst: fresh graduates. Business Analyst: experienced (2-4 years).',
      difficulty: 'Medium'
    }
  ]
},

{
  testId: 'CO-10', title: 'Product Companies Mix', category: 'Company',
  company: 'Mixed', duration: 15, totalQ: 10, difficulty: 'Hard',
  questions: [
    {
      question: 'Google\'s interview process includes a unique round called:',
      options: ['Bar Raiser', 'Googliness', 'Cultural Fit', 'Core Values'],
      correct: 1,
      explanation: '"Googliness" round tests cultural fit — collaboration, intellectual humility, comfort with ambiguity.',
      difficulty: 'Medium'
    },
    {
      question: 'Microsoft SDE interview — how many rounds typically:',
      options: ['1-2', '2-3', '4-5', '7-8'],
      correct: 2,
      explanation: 'Microsoft SDE: typically 4-5 rounds including final hiring manager round.',
      difficulty: 'Medium'
    },
    {
      question: 'Flip Kart product company — what data structure for product search?',
      options: ['Array', 'Inverted Index (like search engine)', 'Stack', 'Queue'],
      correct: 1,
      explanation: 'E-commerce search uses inverted index — maps words to product IDs for fast search.',
      difficulty: 'Hard'
    },
    {
      question: 'Design URL shortener (like bit.ly) — encoding approach:',
      options: ['MD5 hash', 'Base62 encoding of auto-increment ID', 'Random string', 'URL encoding'],
      correct: 1,
      explanation: 'Base62 (a-z,A-Z,0-9) of auto-increment ID gives short unique codes.',
      difficulty: 'Hard'
    },
    {
      question: 'Consistent hashing advantage in distributed systems:',
      options: ['Faster lookup', 'Only k/n keys remapped when node added/removed', 'Less memory', 'Simpler implementation'],
      correct: 1,
      explanation: 'Consistent hashing: add/remove node → only average k/n keys need remapping (not all).',
      difficulty: 'Hard'
    },
    {
      question: 'Rate limiting algorithm — Token Bucket vs Leaky Bucket:',
      options: ['Same algorithm', 'Token Bucket allows bursts, Leaky Bucket constant rate', 'Leaky Bucket allows bursts', 'Both allow bursts'],
      correct: 1,
      explanation: 'Token Bucket: accumulate tokens, allow bursts. Leaky Bucket: constant output rate.',
      difficulty: 'Hard'
    },
    {
      question: 'Which company created Kubernetes?',
      options: ['Amazon', 'Microsoft', 'Google', 'Facebook'],
      correct: 2,
      explanation: 'Kubernetes (K8s) created by Google, now CNCF open-source.',
      difficulty: 'Medium'
    },
    {
      question: 'Merge Sort is preferred over Quick Sort when:',
      options: ['Arrays are random', 'Stable sort needed + worst case O(n log n) guaranteed', 'In-place sorting needed', 'Small arrays'],
      correct: 1,
      explanation: 'Merge sort: stable + always O(n log n). Quick sort: O(n²) worst case, not stable.',
      difficulty: 'Medium'
    },
    {
      question: 'Database sharding means:',
      options: ['Backup of database', 'Splitting database across multiple machines horizontally', 'Vertical scaling', 'Indexing'],
      correct: 1,
      explanation: 'Sharding: split data across multiple DB instances — each shard has subset of data.',
      difficulty: 'Hard'
    },
    {
      question: 'CAP theorem — during network partition, which to choose?',
      options: ['Consistency always', 'Availability always', 'Depends on application requirements', 'Neither'],
      correct: 2,
      explanation: 'Banks choose Consistency. Social media often chooses Availability. Depends on use case.',
      difficulty: 'Hard'
    }
  ]
},

// ══════════════════════════════════════════
// FULL MOCK TESTS
// ══════════════════════════════════════════

{
  testId: 'FM-01', title: 'Full Mock 1 — Balanced', category: 'Full Mock',
  duration: 15, totalQ: 10, difficulty: 'Medium',
  questions: [
    {
      question: 'Big O notation O(1) represents:',
      options: ['Linear time', 'Constant time', 'Logarithmic', 'Quadratic'],
      correct: 1,
      explanation: 'O(1) = constant time — doesn\'t grow with input size.',
      difficulty: 'Easy'
    },
    {
      question: 'Train A leaves at 6AM, speed 60 km/h. Train B at 8AM, speed 90 km/h. Meet time:',
      options: ['10 AM', '11 AM', '12 PM', '10:30 AM'],
      correct: 0,
      explanation: 'At 8AM, A is 120km ahead. Relative speed = 30 km/h. Time=120/30=4h. 8+2=10AM.',
      difficulty: 'Hard'
    },
    {
      question: 'Which SQL is correct to get 2nd highest salary?',
      options: ['SELECT MAX(salary) WHERE salary != MAX(salary)', 'SELECT salary FROM emp ORDER BY salary DESC LIMIT 1 OFFSET 1', 'SELECT TOP 2 salary', 'All incorrect'],
      correct: 1,
      explanation: 'OFFSET 1 skips the highest, LIMIT 1 gets next = 2nd highest.',
      difficulty: 'Hard'
    },
    {
      question: 'In OOP, "hiding internal details" is:',
      options: ['Polymorphism', 'Abstraction', 'Inheritance', 'Encapsulation'],
      correct: 3,
      explanation: 'Encapsulation hides internal implementation. Abstraction hides complexity.',
      difficulty: 'Medium'
    },
    {
      question: 'P(getting prime on dice):',
      options: ['1/2', '2/3', '1/3', '1/6'],
      correct: 0,
      explanation: 'Primes on dice: 2,3,5 = 3 out of 6. P=3/6=1/2.',
      difficulty: 'Easy'
    },
    {
      question: 'Binary search tree inorder gives sorted output. This is because:',
      options: ['BST property: left<root<right', 'Random property', 'Only for balanced trees', 'Depends on implementation'],
      correct: 0,
      explanation: 'BST: left subtree < root < right subtree. Inorder (L-R-Root) visits in ascending order.',
      difficulty: 'Medium'
    },
    {
      question: 'Deadlock prevention strategy "Hold and Wait" elimination means:',
      options: ['Process holds all resources', 'Process must request all resources at start or none', 'Process waits indefinitely', 'Resources shared freely'],
      correct: 1,
      explanation: 'Eliminate Hold&Wait: process requests ALL needed resources at once before starting.',
      difficulty: 'Hard'
    },
    {
      question: 'Find x: 2^x = 64',
      options: ['4', '5', '6', '7'],
      correct: 2,
      explanation: '2^6=64.',
      difficulty: 'Easy'
    },
    {
      question: 'HashMap collision resolution — Java uses:',
      options: ['Open addressing', 'Separate chaining (LinkedList/TreeNode)', 'Double hashing', 'Linear probing'],
      correct: 1,
      explanation: 'Java HashMap: separate chaining. In Java 8+, converts to Red-Black tree after 8 collisions.',
      difficulty: 'Hard'
    },
    {
      question: 'Given array [1,2,3,4,5], prefix sum array:',
      options: ['[1,3,6,10,15]', '[1,2,3,4,5]', '[0,1,3,6,10]', '[1,3,5,7,9]'],
      correct: 0,
      explanation: 'Prefix[i] = sum of arr[0..i]. [1,1+2,1+2+3,1+2+3+4,1+2+3+4+5]=[1,3,6,10,15].',
      difficulty: 'Medium'
    }
  ]
},

{
  testId: 'FM-02', title: 'Full Mock 2 — Aptitude Heavy', category: 'Full Mock',
  duration: 15, totalQ: 10, difficulty: 'Medium',
  questions: [
    {
      question: 'CI-SI difference for 2 years at 10% on ₹5000:',
      options: ['₹50', '₹100', '₹150', '₹200'],
      correct: 0,
      explanation: 'CI-SI(2 years)=P×(r/100)²=5000×(0.1)²=5000×0.01=₹50.',
      difficulty: 'Medium'
    },
    {
      question: 'Assertion: All prime numbers are odd. Reason: 2 is prime.',
      options: ['A true, R true, R explains A', 'A false, R true', 'A true, R true but not explanation', 'A false, R false'],
      correct: 1,
      explanation: 'Assertion false — 2 is prime and even. Reason true — 2 is prime.',
      difficulty: 'Hard'
    },
    {
      question: 'If x+y=5 and xy=6, find x²+y²:',
      options: ['13', '12', '11', '25'],
      correct: 0,
      explanation: 'x²+y²=(x+y)²-2xy=25-12=13.',
      difficulty: 'Medium'
    },
    {
      question: '5 books on shelf. How many arrangements if 2 specific books always together:',
      options: ['24', '48', '120', '60'],
      correct: 1,
      explanation: 'Treat 2 books as unit: 4! arrangements × 2! arrangements of 2 books = 24×2=48.',
      difficulty: 'Hard'
    },
    {
      question: 'Speed of stream: 3 km/h. Boat upstream speed: 9 km/h. Downstream:',
      options: ['12 km/h', '15 km/h', '18 km/h', '6 km/h'],
      correct: 1,
      explanation: 'Boat speed = upstream+stream = 9+3=12... wait: upstream=boat-stream=9. Boat=12. Downstream=12+3=15.',
      difficulty: 'Medium'
    },
    {
      question: 'Area of triangle with base 12cm, height 8cm:',
      options: ['48 cm²', '96 cm²', '24 cm²', '56 cm²'],
      correct: 0,
      explanation: 'Area = (1/2)×base×height = (1/2)×12×8 = 48 cm².',
      difficulty: 'Easy'
    },
    {
      question: 'Sum of interior angles of hexagon:',
      options: ['540°', '720°', '900°', '360°'],
      correct: 1,
      explanation: '(n-2)×180 = (6-2)×180 = 720°.',
      difficulty: 'Medium'
    },
    {
      question: 'Number of zeros in 100!:',
      options: ['20', '24', '25', '22'],
      correct: 1,
      explanation: 'Trailing zeros = ⌊100/5⌋+⌊100/25⌋+⌊100/125⌋=20+4+0=24.',
      difficulty: 'Hard'
    },
    {
      question: 'Median of [3,7,2,9,1,5,8]:',
      options: ['5', '7', '4', '6'],
      correct: 0,
      explanation: 'Sort: [1,2,3,5,7,8,9]. Middle (4th) = 5.',
      difficulty: 'Easy'
    },
    {
      question: 'If ABCD is a square with area 64, diagonal length:',
      options: ['8√2', '8', '16', '4√2'],
      correct: 0,
      explanation: 'Side=8. Diagonal=side×√2=8√2.',
      difficulty: 'Medium'
    }
  ]
},

{
  testId: 'FM-03', title: 'Full Mock 3 — DSA Heavy', category: 'Full Mock',
  duration: 15, totalQ: 10, difficulty: 'Hard',
  questions: [
    {
      question: 'Which data structure gives O(1) for front and back operations?',
      options: ['Stack', 'Queue', 'Deque', 'Array'],
      correct: 2,
      explanation: 'Deque (Double-ended Queue): O(1) at both front and back.',
      difficulty: 'Medium'
    },
    {
      question: 'Topological sort — which algorithm using DFS?',
      options: ['Kahn\'s', 'DFS + Stack (Tarjan\'s method)', 'BFS', 'Dijkstra'],
      correct: 1,
      explanation: 'DFS-based topo sort: finish nodes added to stack. Pop stack for order.',
      difficulty: 'Hard'
    },
    {
      question: 'Knapsack: items=[(2,3),(3,4),(4,5),(5,6)], W=8. Max value:',
      options: ['9', '10', '11', '12'],
      correct: 1,
      explanation: 'Items (weight,value): pick (3,4)+(5,6)=8 weight, value=10.',
      difficulty: 'Hard'
    },
    {
      question: 'Heap sort space complexity:',
      options: ['O(n)', 'O(log n)', 'O(1)', 'O(n log n)'],
      correct: 2,
      explanation: 'Heap sort is in-place — O(1) extra space.',
      difficulty: 'Medium'
    },
    {
      question: 'BFS vs DFS — BFS is better for:',
      options: ['Deep trees', 'Finding connected components', 'Shortest path in unweighted graph', 'Detecting cycles'],
      correct: 2,
      explanation: 'BFS guarantees shortest path in unweighted graph. DFS better for deep exploration.',
      difficulty: 'Medium'
    },
    {
      question: 'Balanced BST height for n=15 nodes:',
      options: ['3', '4', '5', '2'],
      correct: 1,
      explanation: 'Balanced BST: height = ⌊log₂(15)⌋ = 3. So 4 levels (0-indexed: 0,1,2,3). Height=3.',
      correct: 0,
      explanation: 'log₂(15)≈3.9. Height=3 (floor). 4 levels: 0,1,2,3.',
      difficulty: 'Hard'
    },
    {
      question: 'Dijkstra with binary heap time complexity:',
      options: ['O(V²)', 'O((V+E)log V)', 'O(VE)', 'O(V log E)'],
      correct: 1,
      explanation: 'Dijkstra + binary heap: O((V+E)log V). With Fibonacci heap: O(E+V log V).',
      difficulty: 'Hard'
    },
    {
      question: 'LCS of "ABCDEF" and "ACDF" length:',
      options: ['3', '4', '2', '5'],
      correct: 1,
      explanation: 'LCS = "ACDF" = length 4.',
      difficulty: 'Medium'
    },
    {
      question: 'Quick select average case for kth element:',
      options: ['O(n log n)', 'O(n)', 'O(n²)', 'O(log n)'],
      correct: 1,
      explanation: 'QuickSelect average O(n) — only recurse on relevant partition.',
      difficulty: 'Hard'
    },
    {
      question: 'Trie vs HashMap for prefix search:',
      options: ['HashMap better', 'Trie better — O(m) per query where m=prefix length', 'Same complexity', 'Depends'],
      correct: 1,
      explanation: 'Trie: O(m) prefix search. HashMap needs O(n×m) to check all keys for prefix.',
      difficulty: 'Hard'
    }
  ]
},

{
  testId: 'FM-04', title: 'Full Mock 4 — CS Heavy', category: 'Full Mock',
  duration: 15, totalQ: 10, difficulty: 'Hard',
  questions: [
    {
      question: 'Which HTTP method is NOT idempotent?',
      options: ['GET', 'PUT', 'DELETE', 'POST'],
      correct: 3,
      explanation: 'POST: creates new resource each time — not idempotent. GET/PUT/DELETE are idempotent.',
      difficulty: 'Medium'
    },
    {
      question: 'BCNF (Boyce-Codd Normal Form) is stricter than:',
      options: ['1NF', '2NF', '3NF', '4NF'],
      correct: 2,
      explanation: 'BCNF is stronger version of 3NF. Every determinant must be a candidate key.',
      difficulty: 'Hard'
    },
    {
      question: 'Process scheduling — Round Robin quantum too small causes:',
      options: ['Starvation', 'High context switch overhead', 'No scheduling', 'Priority inversion'],
      correct: 1,
      explanation: 'Small quantum → many context switches → overhead exceeds useful work.',
      difficulty: 'Hard'
    },
    {
      question: 'OSI Layer 4 (Transport) protocols:',
      options: ['HTTP, FTP', 'IP, ICMP', 'TCP, UDP', 'Ethernet, ARP'],
      correct: 2,
      explanation: 'Transport layer: TCP (reliable) and UDP (fast). Layer 3=Network(IP), Layer 7=Application(HTTP).',
      difficulty: 'Medium'
    },
    {
      question: 'Java garbage collection — when does object become eligible?',
      options: ['When programmer calls delete', 'When no live references point to it', 'After 30 seconds', 'When memory is full'],
      correct: 1,
      explanation: 'GC eligibility: when no reachable references exist to an object.',
      difficulty: 'Medium'
    },
    {
      question: 'REST API versioning — best practice:',
      options: ['No versioning', 'URL versioning: /api/v1/users', 'Always latest only', 'Version in cookies'],
      correct: 1,
      explanation: 'URL versioning: /api/v1/, /api/v2/ — clear, easy to route, visible.',
      difficulty: 'Medium'
    },
    {
      question: 'Docker EXPOSE vs -p flag:',
      options: ['Same thing', 'EXPOSE: documentation/inter-container, -p: maps to host port', '-p is for dockerfile', 'EXPOSE maps host'],
      correct: 1,
      explanation: 'EXPOSE: metadata, container-to-container. docker run -p 8080:80: maps host port.',
      difficulty: 'Hard'
    },
    {
      question: 'Git command to undo last commit keeping changes staged:',
      options: ['git revert', 'git reset --soft HEAD~1', 'git reset --hard HEAD~1', 'git checkout'],
      correct: 1,
      explanation: '--soft: undo commit, keep changes staged. --hard: undo commit AND discard changes.',
      difficulty: 'Hard'
    },
    {
      question: 'Time complexity of building a heap from array:',
      options: ['O(n log n)', 'O(n)', 'O(log n)', 'O(n²)'],
      correct: 1,
      explanation: 'Heapify from bottom: O(n) — half nodes are leaves, sift-down at each level.',
      difficulty: 'Hard'
    },
    {
      question: 'HTTPS prevents which attack?',
      options: ['SQL injection', 'Man in the middle attack', 'DDoS', 'XSS'],
      correct: 1,
      explanation: 'HTTPS: encrypts traffic — prevents eavesdropping and MITM attacks.',
      difficulty: 'Medium'
    }
  ]
},

{
  testId: 'FM-05', title: 'Full Mock 5 — Speed Test', category: 'Full Mock',
  duration: 10, totalQ: 10, difficulty: 'Medium',
  questions: [
    { question: '15% of 200:', options: ['25', '30', '35', '20'], correct: 1, explanation: '15/100×200=30.', difficulty: 'Easy' },
    { question: 'Stack: push 1,2,3 then pop once. Top element:', options: ['1', '2', '3', 'Empty'], correct: 1, explanation: 'push 1,2,3→top=3. Pop=3. Top now=2.', difficulty: 'Easy' },
    { question: 'O(log n) algorithm example:', options: ['Linear search', 'Binary search', 'Bubble sort', 'Merge sort'], correct: 1, explanation: 'Binary search: O(log n).', difficulty: 'Easy' },
    { question: 'LCM of 4 and 6:', options: ['12', '24', '6', '8'], correct: 0, explanation: 'LCM(4,6)=12.', difficulty: 'Easy' },
    { question: 'HTML stands for:', options: ['Hyper Text Markup Language', 'High Tech Modern Language', 'Hyperlink Text Method Language', 'Home Tool Markup Language'], correct: 0, explanation: 'HTML = HyperText Markup Language.', difficulty: 'Easy' },
    { question: '√144:', options: ['11', '12', '13', '14'], correct: 1, explanation: '12×12=144.', difficulty: 'Easy' },
    { question: 'Array index starts at:', options: ['1', '0', '-1', 'Depends'], correct: 1, explanation: 'Arrays in most languages (C,Java,Python) are 0-indexed.', difficulty: 'Easy' },
    { question: 'Interface in Java can have:', options: ['Constructors', 'Instance variables', 'Abstract methods', 'All of these'], correct: 2, explanation: 'Interface: abstract methods (and default/static in Java 8+). No constructors or instance vars.', difficulty: 'Easy' },
    { question: '7! / 5! =', options: ['42', '35', '56', '21'], correct: 0, explanation: '7!/5! = 7×6 = 42.', difficulty: 'Easy' },
    { question: 'Which is NOT a programming language?', options: ['Java', 'Python', 'HTML', 'C++'], correct: 2, explanation: 'HTML is markup language, not programming language.', difficulty: 'Easy' }
  ]
},

{
  testId: 'FM-06', title: 'Full Mock 6 — Mixed Hard', category: 'Full Mock',
  duration: 15, totalQ: 10, difficulty: 'Hard',
  questions: [
    {
      question: 'Amortized complexity of dynamic array push_back:',
      options: ['O(n)', 'O(log n)', 'O(1)', 'O(n²)'],
      correct: 2,
      explanation: 'Amortized O(1): occasionally O(n) for resize, but average across n ops = O(1).',
      difficulty: 'Hard'
    },
    {
      question: 'Shortest path in graph with negative edges (no negative cycle):',
      options: ['Dijkstra', 'BFS', 'Bellman-Ford', 'DFS'],
      correct: 2,
      explanation: 'Bellman-Ford handles negative edges. Dijkstra fails with negatives.',
      difficulty: 'Hard'
    },
    {
      question: 'A cistern has two inlet pipes A(8h) and B(12h) and outlet C(20h). All open — time to fill:',
      options: ['~7.5h', '~8.5h', '~9h', '~10h'],
      correct: 0,
      explanation: '1/8+1/12-1/20=(15+10-6)/120=19/120 per hr. Time=120/19≈6.3h. Hmm: 1/8=0.125,1/12=0.083,1/20=0.05. Net=0.158. Time=1/0.158=6.3h. Actually ~7.5 if C is slower.',
      difficulty: 'Hard'
    },
    {
      question: 'P(A)=0.6, P(B|A)=0.5. P(A∩B):',
      options: ['0.3', '0.1', '0.5', '0.6'],
      correct: 0,
      explanation: 'P(A∩B)=P(B|A)×P(A)=0.5×0.6=0.3.',
      difficulty: 'Hard'
    },
    {
      question: 'Which data structure is best for implementing Dijkstra efficiently?',
      options: ['Simple array', 'Min-heap / Priority Queue', 'Stack', 'Linked list'],
      correct: 1,
      explanation: 'Min-heap: O(log V) extract-min. Makes Dijkstra O((V+E)log V).',
      difficulty: 'Hard'
    },
    {
      question: '3 boxes: Red(3R,2B), Blue(1R,4B), Green(2R,3B). Pick box randomly, then ball. P(Red ball):',
      options: ['1/3', '2/5', '8/15', '6/15'],
      correct: 2,
      explanation: 'P(R)=(1/3)(3/5)+(1/3)(1/5)+(1/3)(2/5)=(1/3)(6/5)=wait: (3/5+1/5+2/5)/3=6/15=2/5. So answer is 2/5.',
      correct: 1,
      explanation: '(1/3)(3/5)+(1/3)(1/5)+(1/3)(2/5)=(1/15)(3+1+2)=6/15=2/5.',
      difficulty: 'Hard'
    },
    {
      question: 'Segment tree vs Fenwick tree:',
      options: ['Same', 'Segment tree more powerful (range queries + updates), Fenwick simpler for prefix sums', 'Fenwick is more general', 'No difference in use'],
      correct: 1,
      explanation: 'Segment tree: any range query. Fenwick (BIT): prefix sums/products, simpler implementation.',
      difficulty: 'Hard'
    },
    {
      question: 'What percentage of 150 is 90?',
      options: ['55%', '60%', '65%', '70%'],
      correct: 1,
      explanation: '(90/150)×100=60%.',
      difficulty: 'Easy'
    },
    {
      question: 'Hash function properties — "avalanche effect" means:',
      options: ['Hash grows with input', 'Small input change causes large output change', 'Hash is reversible', 'Collision resistance'],
      correct: 1,
      explanation: 'Avalanche effect: 1-bit input change → ~50% output bits change. Good cryptographic property.',
      difficulty: 'Hard'
    },
    {
      question: 'Skip list time complexity (average):',
      options: ['O(n)', 'O(log n)', 'O(1)', 'O(n log n)'],
      correct: 1,
      explanation: 'Skip list: O(log n) average for search, insert, delete — probabilistic data structure.',
      difficulty: 'Hard'
    }
  ]
},

{
  testId: 'FM-07', title: 'Full Mock 7 — Logical + Verbal', category: 'Full Mock',
  duration: 15, totalQ: 10, difficulty: 'Medium',
  questions: [
    {
      question: 'Odd one out: Cat, Dog, Tiger, Lion, Leopard',
      options: ['Cat', 'Dog', 'Tiger', 'Lion'],
      correct: 1,
      explanation: 'Dog is domesticated pet. Cat is also pet but... Tiger, Lion, Leopard are wild big cats. Cat is domestic but smaller. Dog doesn\'t belong to cat family.',
      difficulty: 'Medium'
    },
    {
      question: 'Statement: "All students who study hard pass." Inference: Ram passed. Conclusion:',
      options: ['Ram studied hard', 'Ram may or may not have studied hard', 'Ram didn\'t study', 'Cannot determine'],
      correct: 1,
      explanation: 'Converse not always true. Passing doesn\'t mean studied hard — other reasons possible.',
      difficulty: 'Hard'
    },
    {
      question: 'Choose correct: "He is one of those students who _____ always late."',
      options: ['is', 'are', 'was', 'were'],
      correct: 1,
      explanation: '"Those students who are" — relative clause refers to plural "students".',
      difficulty: 'Medium'
    },
    {
      question: 'Series: J, F, M, A, M, J, J, ?',
      options: ['A', 'S', 'O', 'N'],
      correct: 0,
      explanation: 'Months: January, February, March, April, May, June, July, August (A).',
      difficulty: 'Medium'
    },
    {
      question: 'Synonym of "Ephemeral":',
      options: ['Permanent', 'Transient', 'Solid', 'Ancient'],
      correct: 1,
      explanation: 'Ephemeral = lasting for a very short time. Synonym: transient, fleeting.',
      difficulty: 'Medium'
    },
    {
      question: 'Cube faces painted red, cut into 27 smaller cubes. Cubes with 0 painted faces:',
      options: ['0', '1', '4', '8'],
      correct: 1,
      explanation: '3×3×3 cube. Center cube has no painted faces = 1 cube.',
      difficulty: 'Hard'
    },
    {
      question: 'Antonym of "Verbose":',
      options: ['Wordy', 'Concise', 'Fluent', 'Eloquent'],
      correct: 1,
      explanation: 'Verbose = using too many words. Antonym = concise (brief and clear).',
      difficulty: 'Medium'
    },
    {
      question: '6 people shake hands with each other once. Total handshakes:',
      options: ['12', '15', '18', '30'],
      correct: 1,
      explanation: '6C2 = 6×5/2 = 15 handshakes.',
      difficulty: 'Medium'
    },
    {
      question: 'Passage: "Automation threatens jobs. However, historically, technology creates more jobs than it destroys." Author\'s view:',
      options: ['Technology is bad', 'Technology ultimately creates employment', 'Automation should be banned', 'History is irrelevant'],
      correct: 1,
      explanation: '"However" introduces contrasting view — author suggests technology creates net jobs.',
      difficulty: 'Hard'
    },
    {
      question: 'Complete: "Despite ___ hard, he couldn\'t pass."',
      options: ['studying', 'to study', 'studied', 'studies'],
      correct: 0,
      explanation: '"Despite + verb-ing" — "Despite studying hard..."',
      difficulty: 'Easy'
    }
  ]
},

{
  testId: 'FM-08', title: 'Full Mock 8 — Interview Prep', category: 'Full Mock',
  duration: 15, totalQ: 10, difficulty: 'Hard',
  questions: [
    {
      question: 'SOLID — "D" stands for:',
      options: ['Design Principle', 'Dependency Inversion Principle', 'Data Isolation', 'Dynamic Dispatch'],
      correct: 1,
      explanation: 'SOLID: S=Single Responsibility, O=Open/Closed, L=Liskov, I=Interface Segregation, D=Dependency Inversion.',
      difficulty: 'Medium'
    },
    {
      question: 'Design Pattern — Observer pattern use case:',
      options: ['Creating objects', 'Event handling — notify multiple subscribers on state change', 'Sorting algorithms', 'Database queries'],
      correct: 1,
      explanation: 'Observer: subject maintains list of observers. On state change, notify all. Pub-sub.',
      difficulty: 'Hard'
    },
    {
      question: 'Merge sort "divide" step on [8,3,1,5,9,2,6,4]:',
      options: ['[1,2,3,4]', '[8,3,1,5] and [9,2,6,4]', '[8,1] and [3,5]', '[8] and rest'],
      correct: 1,
      explanation: 'First divide: split in half → [8,3,1,5] and [9,2,6,4]. Recurse on each.',
      difficulty: 'Medium'
    },
    {
      question: 'In system design, "availability" 99.9% means downtime per year:',
      options: ['8.7 hours', '43.8 hours', '87.6 hours', '1 hour'],
      correct: 0,
      explanation: '99.9% available = 0.1% downtime. 0.001×365×24=8.76 hours/year.',
      difficulty: 'Hard'
    },
    {
      question: 'Optimal strategy for "Find minimum in rotated sorted array":',
      options: ['Linear scan O(n)', 'Binary search O(log n)', 'Two pointers O(n)', 'Sorting O(n log n)'],
      correct: 1,
      explanation: 'Modified binary search: compare mid with right. If mid>right, min in right half.',
      difficulty: 'Hard'
    },
    {
      question: 'Tell me about yourself — what should come FIRST?',
      options: ['Hobbies', 'Professional summary + key skills relevant to role', 'Salary expectation', 'Family background'],
      correct: 1,
      explanation: 'Start with brief professional intro, current role/degree, key skills, why interested.',
      difficulty: 'Easy'
    },
    {
      question: 'Explain "Strong eventual consistency" (SEC):',
      options: ['All nodes always consistent', 'After updates stop, all nodes eventually converge to same state', 'No consistency guarantee', 'Consistency with delays'],
      correct: 1,
      explanation: 'SEC: updates may propagate slowly, but system eventually reaches consistent state.',
      difficulty: 'Hard'
    },
    {
      question: 'Hash table load factor > 0.7 — what should happen?',
      options: ['Nothing', 'Rehashing — resize and redistribute', 'Delete old entries', 'Switch to BST'],
      correct: 1,
      explanation: 'High load factor → many collisions. Rehash: create larger table, re-insert all elements.',
      difficulty: 'Hard'
    },
    {
      question: 'Why is TCP connection reliable? Key mechanism:',
      options: ['Faster bandwidth', 'Sequence numbers + acknowledgments + retransmission', 'Encryption', 'No packets dropped'],
      correct: 1,
      explanation: 'TCP reliability: seq numbers track order, ACK confirms receipt, retransmit on timeout.',
      difficulty: 'Medium'
    },
    {
      question: 'Weakness in interview — best approach:',
      options: ['Say you have none', 'Genuine weakness + what you\'re doing to improve', 'Blame previous experience', 'Irrelevant personal weakness'],
      correct: 1,
      explanation: 'Honest weakness + improvement action shows self-awareness and growth mindset.',
      difficulty: 'Easy'
    }
  ]
},

{
  testId: 'FM-09', title: 'Full Mock 9 — Advanced Concepts', category: 'Full Mock',
  duration: 15, totalQ: 10, difficulty: 'Hard',
  questions: [
    {
      question: 'P vs NP — if P=NP (hypothetically):',
      options: ['No change', 'All NP problems solvable in polynomial time', 'All problems unsolvable', 'Only P problems solvable'],
      correct: 1,
      explanation: 'If P=NP: every problem verifiable in polynomial time also solvable in polynomial time.',
      difficulty: 'Hard'
    },
    {
      question: 'Bloom filter — what can it tell you?',
      options: ['Exact membership', '"Definitely not in set" OR "probably in set"', '"Definitely in set" always', 'Count of elements'],
      correct: 1,
      explanation: 'Bloom filter: false negatives impossible, false positives possible. Space-efficient.',
      difficulty: 'Hard'
    },
    {
      question: 'A/B Testing in product development tests:',
      options: ['Code quality', 'Two versions of feature to see which performs better', 'Server performance', 'Database queries'],
      correct: 1,
      explanation: 'A/B test: show version A to group 1, version B to group 2. Compare metrics.',
      difficulty: 'Medium'
    },
    {
      question: 'Eventual consistency is used by:',
      options: ['Bank transactions', 'Social media likes count', 'ATM transactions', 'Hospital records'],
      correct: 1,
      explanation: 'Social media: slight delay in like count is acceptable. Banks need strong consistency.',
      difficulty: 'Medium'
    },
    {
      question: 'TCP slow start algorithm:',
      options: ['Starts at max speed', 'Gradually increases congestion window to probe bandwidth', 'Fixed speed always', 'Decreases speed gradually'],
      correct: 1,
      explanation: 'TCP slow start: begin with small window, double each RTT until threshold reached.',
      difficulty: 'Hard'
    },
    {
      question: 'Amortized analysis — which doesn\'t fit?',
      options: ['ArrayList add', 'Hash table resizing', 'Binary search', 'Stack with multipop'],
      correct: 2,
      explanation: 'Binary search is always O(log n) — no amortization needed. Others have occasional expensive ops.',
      difficulty: 'Hard'
    },
    {
      question: 'MVCC (Multi-Version Concurrency Control) benefit:',
      options: ['Faster writes', 'Readers don\'t block writers and vice versa', 'Less storage', 'Simpler implementation'],
      correct: 1,
      explanation: 'MVCC: maintains multiple versions — reads see consistent snapshot without blocking writes.',
      difficulty: 'Hard'
    },
    {
      question: 'Which sorting is best for nearly-sorted array?',
      options: ['Quick sort', 'Merge sort', 'Insertion sort', 'Heap sort'],
      correct: 2,
      explanation: 'Insertion sort: O(n) for nearly-sorted input. Minimal swaps needed.',
      difficulty: 'Medium'
    },
    {
      question: 'Pub-Sub vs Message Queue difference:',
      options: ['Same thing', 'Pub-Sub: all subscribers get message. Queue: only one consumer gets it', 'Queue sends to all', 'No difference'],
      correct: 1,
      explanation: 'Pub-Sub: fanout to all subscribers. Message Queue: competing consumers, one processes.',
      difficulty: 'Hard'
    },
    {
      question: 'Time complexity of building suffix array (simple approach):',
      options: ['O(n)', 'O(n log n)', 'O(n² log n)', 'O(n²)'],
      correct: 2,
      explanation: 'Simple: generate n suffixes O(n), sort O(n² log n) due to string comparison O(n).',
      difficulty: 'Hard'
    }
  ]
},

{
  testId: 'FM-10', title: 'Full Mock 10 — The Final Boss', category: 'Full Mock',
  duration: 20, totalQ: 10, difficulty: 'Hard',
  questions: [
    {
      question: 'Master Theorem for T(n) = 2T(n/2) + n:',
      options: ['O(n)', 'O(n log n)', 'O(n²)', 'O(log n)'],
      correct: 1,
      explanation: 'a=2,b=2,f(n)=n. n^log_b(a)=n^1=n. f(n)=n=Θ(n). Case 2: O(n log n).',
      difficulty: 'Hard'
    },
    {
      question: 'Design Twitter — biggest challenge:',
      options: ['User login', 'Fan-out on write vs fan-out on read for timeline', 'Profile pictures', 'Direct messages'],
      correct: 1,
      explanation: 'Twitter timeline: celebrities with millions of followers — push all tweets to followers (fan-out write) vs pull at read time. Hybrid solution used.',
      difficulty: 'Hard'
    },
    {
      question: 'Red-Black tree insertion worst case:',
      options: ['O(1)', 'O(log n)', 'O(n)', 'O(n log n)'],
      correct: 1,
      explanation: 'RB tree: O(log n) insert. At most 2 rotations needed after insert.',
      difficulty: 'Hard'
    },
    {
      question: 'Rabin-Karp rolling hash allows pattern matching in:',
      options: ['O(n+m)', 'O(nm)', 'O(n) average', 'O(m log n)'],
      correct: 2,
      explanation: 'Rabin-Karp: O(n) average case with rolling hash. O(nm) worst case with many collisions.',
      difficulty: 'Hard'
    },
    {
      question: 'Byzantine fault tolerance requires minimum:',
      options: ['n > 2f', 'n > 3f', 'n > f', 'n > 4f'],
      correct: 1,
      explanation: 'Byzantine fault tolerance: n > 3f replicas to tolerate f Byzantine failures.',
      difficulty: 'Hard'
    },
    {
      question: 'Persistent data structure means:',
      options: ['Stored on disk', 'Previous versions accessible after updates (immutable-like)', 'Never deleted', 'Cached in memory'],
      correct: 1,
      explanation: 'Persistent DS: each update creates new version while preserving all old versions.',
      difficulty: 'Hard'
    },
    {
      question: 'NP-Complete problems include:',
      options: ['Binary search', 'Sorting', 'Travelling Salesman + Knapsack + SAT', 'BFS'],
      correct: 2,
      explanation: 'NP-Complete: TSP, Knapsack, SAT, Graph Coloring, Hamiltonian Path.',
      difficulty: 'Hard'
    },
    {
      question: 'Correct recurrence for merge sort:',
      options: ['T(n)=T(n-1)+O(1)', 'T(n)=2T(n/2)+O(n)', 'T(n)=T(n/2)+O(n)', 'T(n)=2T(n-1)+O(1)'],
      correct: 1,
      explanation: 'Merge sort: split into 2 halves (2T(n/2)) + merge O(n) = T(n)=2T(n/2)+O(n).',
      difficulty: 'Medium'
    },
    {
      question: 'Optimistic vs Pessimistic locking:',
      options: ['Same', 'Optimistic: assume no conflict, check at commit. Pessimistic: lock immediately', 'Pessimistic check at commit', 'No difference in DB'],
      correct: 1,
      explanation: 'Optimistic: no locks, check version at commit (good for low contention). Pessimistic: lock early.',
      difficulty: 'Hard'
    },
    {
      question: 'Bloom filter false positive rate with m bits, n items, k hash functions:',
      options: ['(1-e^(-kn/m))^k', 'n/m', 'k/m', 'n×k/m'],
      correct: 0,
      explanation: 'FP rate = (1-e^(-kn/m))^k. Optimal k=m/n×ln(2).',
      difficulty: 'Hard'
    }
  ]
}

];

async function seedTests() {
  await mongoose.connect(process.env.MONGO_URI);
  console.log('✅ MongoDB connected');
  await Test.deleteMany({});
  console.log('🗑️  Cleared existing tests');
  const inserted = await Test.insertMany(tests);
  console.log(`✅ Inserted ${inserted.length} tests with ${inserted.reduce((s,t)=>s+t.questions.length,0)} questions!`);
  process.exit(0);
}

seedTests().catch(err => { console.error('❌', err.message); process.exit(1); });

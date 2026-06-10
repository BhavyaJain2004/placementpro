// backend/seedMasterDSA.js
// Run: node seedMasterDSA.js

require('dotenv').config();
const mongoose = require('mongoose');
const MasterDSAQuestion = require('./models/MasterDSAQuestion');

mongoose.connect(process.env.MONGO_URI).then(() => console.log('DB connected'));

const questions = [
  // ══ ARRAYS & STRINGS (10 sample — add rest same way) ══
  {
    topicSlug:'arrays', topic:'Arrays & Strings', order:1, globalOrder:1,
    title:'Two Sum', difficulty:'Easy',
    description:'Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.',
    examples:[{ input:'nums = [2,7,11,15], target = 9', output:'[0,1]', explanation:'nums[0]+nums[1]=9' }],
    hint:'Use a HashMap. For each num, check if (target - num) exists in the map.',
    approach:'Single pass HashMap. Store each number with its index. For every element check if complement exists.',
    java_code:`class Solution {\n  public int[] twoSum(int[] nums, int target) {\n    Map<Integer,Integer> map = new HashMap<>();\n    for(int i=0;i<nums.length;i++){\n      int comp = target - nums[i];\n      if(map.containsKey(comp)) return new int[]{map.get(comp),i};\n      map.put(nums[i],i);\n    }\n    return new int[]{};\n  }\n}`,
    python_code:`def twoSum(nums, target):\n    seen = {}\n    for i, n in enumerate(nums):\n        comp = target - n\n        if comp in seen:\n            return [seen[comp], i]\n        seen[n] = i`,
    cpp_code:`vector<int> twoSum(vector<int>& nums, int target){\n  unordered_map<int,int> mp;\n  for(int i=0;i<nums.size();i++){\n    int c=target-nums[i];\n    if(mp.count(c)) return {mp[c],i};\n    mp[nums[i]]=i;\n  }\n  return {};\n}`,
    companies:['TCS','Amazon','Infosys'],
    tags:['Array','HashMap'],
    similarQs:['Three Sum','Four Sum','Two Sum II'],
    timeComplex:'O(n)', spaceComplex:'O(n)',
    pattern:'HashMap Lookup',
    trick:'Store complement — check before inserting',
    leetcodeUrl:'https://leetcode.com/problems/two-sum/'
  },
  {
    topicSlug:'arrays', topic:'Arrays & Strings', order:2, globalOrder:2,
    title:'Maximum Subarray', difficulty:'Medium',
    description:'Given an integer array nums, find the contiguous subarray with the largest sum.',
    examples:[{ input:'nums = [-2,1,-3,4,-1,2,1,-5,4]', output:'6', explanation:'[4,-1,2,1] has the largest sum' }],
    hint:'Keep track of current sum. Reset to 0 if it goes negative.',
    approach:"Kadane's Algorithm — at each index decide: extend previous subarray or start new one.",
    java_code:`class Solution {\n  public int maxSubArray(int[] nums) {\n    int max=nums[0], cur=nums[0];\n    for(int i=1;i<nums.length;i++){\n      cur = Math.max(nums[i], cur+nums[i]);\n      max = Math.max(max,cur);\n    }\n    return max;\n  }\n}`,
    python_code:`def maxSubArray(nums):\n    cur = max_sum = nums[0]\n    for n in nums[1:]:\n        cur = max(n, cur+n)\n        max_sum = max(max_sum, cur)\n    return max_sum`,
    cpp_code:`int maxSubArray(vector<int>& nums){\n  int cur=nums[0],res=nums[0];\n  for(int i=1;i<nums.size();i++){\n    cur=max(nums[i],cur+nums[i]);\n    res=max(res,cur);\n  }\n  return res;\n}`,
    companies:['TCS','Infosys','Wipro'],
    tags:['Array','DP'],
    similarQs:['Maximum Product Subarray','Minimum Subarray'],
    timeComplex:'O(n)', spaceComplex:'O(1)',
    pattern:"Kadane's Algorithm",
    trick:'If current sum < 0, restart from current element',
    leetcodeUrl:'https://leetcode.com/problems/maximum-subarray/'
  },
  {
    topicSlug:'arrays', topic:'Arrays & Strings', order:3, globalOrder:3,
    title:'Best Time to Buy and Sell Stock', difficulty:'Easy',
    description:'Given prices array, find the maximum profit by buying on one day and selling on a later day.',
    examples:[{ input:'prices = [7,1,5,3,6,4]', output:'5', explanation:'Buy at 1, sell at 6' }],
    hint:'Track the minimum price seen so far. At each day calculate profit.',
    approach:'Single pass. Keep min_price. At each index max_profit = max(max_profit, price - min_price).',
    java_code:`class Solution {\n  public int maxProfit(int[] prices) {\n    int min=Integer.MAX_VALUE, profit=0;\n    for(int p:prices){\n      min=Math.min(min,p);\n      profit=Math.max(profit,p-min);\n    }\n    return profit;\n  }\n}`,
    python_code:`def maxProfit(prices):\n    min_p, profit = float('inf'), 0\n    for p in prices:\n        min_p = min(min_p, p)\n        profit = max(profit, p - min_p)\n    return profit`,
    cpp_code:`int maxProfit(vector<int>& p){\n  int mn=INT_MAX,res=0;\n  for(int x:p){mn=min(mn,x);res=max(res,x-mn);}\n  return res;\n}`,
    companies:['Amazon','TCS','Flipkart'],
    tags:['Array','Greedy'],
    similarQs:['Best Time to Buy II','Stock with Cooldown'],
    timeComplex:'O(n)', spaceComplex:'O(1)',
    pattern:'Min-so-far tracking',
    trick:'You only need min_price seen so far — no need for nested loop',
    leetcodeUrl:'https://leetcode.com/problems/best-time-to-buy-and-sell-stock/'
  },

  // ══ LINKED LIST ══
  {
    topicSlug:'linkedlist', topic:'Linked List', order:1, globalOrder:41,
    title:'Reverse Linked List', difficulty:'Easy',
    description:'Given the head of a singly linked list, reverse the list and return the reversed list.',
    examples:[{ input:'head = [1,2,3,4,5]', output:'[5,4,3,2,1]' }],
    hint:'Use three pointers: prev, curr, next. Reverse the direction of each link.',
    approach:'Iterative: prev=null, curr=head. At each step: save next, point curr.next to prev, move both forward.',
    java_code:`class Solution {\n  public ListNode reverseList(ListNode head) {\n    ListNode prev=null, curr=head;\n    while(curr!=null){\n      ListNode next=curr.next;\n      curr.next=prev;\n      prev=curr;\n      curr=next;\n    }\n    return prev;\n  }\n}`,
    python_code:`def reverseList(head):\n    prev, curr = None, head\n    while curr:\n        nxt = curr.next\n        curr.next = prev\n        prev = curr\n        curr = nxt\n    return prev`,
    cpp_code:`ListNode* reverseList(ListNode* head){\n  ListNode* prev=nullptr,*curr=head;\n  while(curr){auto nxt=curr->next;curr->next=prev;prev=curr;curr=nxt;}\n  return prev;\n}`,
    companies:['TCS','Infosys','Amazon'],
    tags:['LinkedList'],
    similarQs:['Reverse Nodes in k-Group','Palindrome Linked List'],
    timeComplex:'O(n)', spaceComplex:'O(1)',
    pattern:'Three pointer reversal',
    trick:'Draw it on paper first — prev/curr/next pointer dance',
    leetcodeUrl:'https://leetcode.com/problems/reverse-linked-list/'
  },
  {
    topicSlug:'linkedlist', topic:'Linked List', order:2, globalOrder:42,
    title:'Detect Cycle in Linked List', difficulty:'Easy',
    description:'Given head of linked list, determine if the linked list has a cycle in it.',
    examples:[{ input:'head = [3,2,0,-4], pos = 1', output:'true' }],
    hint:"Use Floyd's algorithm — slow and fast pointers. If they meet, cycle exists.",
    approach:'Slow moves 1 step, fast moves 2 steps. If cycle exists they must meet inside it.',
    java_code:`class Solution {\n  public boolean hasCycle(ListNode head) {\n    ListNode slow=head, fast=head;\n    while(fast!=null && fast.next!=null){\n      slow=slow.next;\n      fast=fast.next.next;\n      if(slow==fast) return true;\n    }\n    return false;\n  }\n}`,
    python_code:`def hasCycle(head):\n    slow = fast = head\n    while fast and fast.next:\n        slow = slow.next\n        fast = fast.next.next\n        if slow == fast:\n            return True\n    return False`,
    cpp_code:`bool hasCycle(ListNode* head){\n  auto s=head,f=head;\n  while(f&&f->next){s=s->next;f=f->next->next;if(s==f)return true;}\n  return false;\n}`,
    companies:['Amazon','TCS','Cognizant'],
    tags:['LinkedList','Two Pointer'],
    similarQs:['Find Cycle Start','Happy Number'],
    timeComplex:'O(n)', spaceComplex:'O(1)',
    pattern:'Fast-Slow Pointer (Floyd)',
    trick:'Fast pointer catches slow in cycle — mathematical proof of why this works',
    leetcodeUrl:'https://leetcode.com/problems/linked-list-cycle/'
  },

  // ══ STACKS ══
  {
    topicSlug:'stacks', topic:'Stacks & Queues', order:1, globalOrder:63,
    title:'Valid Parentheses', difficulty:'Easy',
    description:"Given a string s containing just '(', ')', '{', '}', '[' and ']', determine if the input string is valid.",
    examples:[{ input:'s = "()[]{}"', output:'true' }, { input:'s = "(]"', output:'false' }],
    hint:'Use a stack. Push opening brackets. For closing brackets, check if stack top matches.',
    approach:'Stack-based matching. For each char: if open bracket push. If close bracket, peek stack and verify match.',
    java_code:`class Solution {\n  public boolean isValid(String s) {\n    Deque<Character> st = new ArrayDeque<>();\n    for(char c:s.toCharArray()){\n      if(c=='('||c=='['||c=='{') st.push(c);\n      else{\n        if(st.isEmpty()) return false;\n        char t=st.pop();\n        if(c==')'&&t!='(') return false;\n        if(c==']'&&t!='[') return false;\n        if(c=='}'&&t!='{') return false;\n      }\n    }\n    return st.isEmpty();\n  }\n}`,
    python_code:`def isValid(s):\n    stack, pairs = [], {')':'(', ']':'[', '}':'{'}\n    for c in s:\n        if c in '([{':\n            stack.append(c)\n        elif not stack or stack[-1] != pairs[c]:\n            return False\n        else:\n            stack.pop()\n    return not stack`,
    cpp_code:`bool isValid(string s){\n  stack<char> st;\n  for(char c:s){\n    if(c=='('||c=='['||c=='{'){st.push(c);continue;}\n    if(st.empty()) return false;\n    char t=st.top();st.pop();\n    if(c==')'&&t!='(') return false;\n    if(c==']'&&t!='[') return false;\n    if(c=='}'&&t!='{') return false;\n  }\n  return st.empty();\n}`,
    companies:['TCS','Wipro','Zoho'],
    tags:['Stack','String'],
    similarQs:['Generate Parentheses','Minimum Remove to Make Valid'],
    timeComplex:'O(n)', spaceComplex:'O(n)',
    pattern:'Stack matching',
    trick:'Use a map for closing→opening bracket — cleaner code',
    leetcodeUrl:'https://leetcode.com/problems/valid-parentheses/'
  },

  // ══ TREES ══
  {
    topicSlug:'trees', topic:'Trees & BST', order:1, globalOrder:107,
    title:'Maximum Depth of Binary Tree', difficulty:'Easy',
    description:'Given the root of a binary tree, return its maximum depth.',
    examples:[{ input:'root = [3,9,20,null,null,15,7]', output:'3' }],
    hint:'Recursion: depth = 1 + max(left depth, right depth). Base case: null node returns 0.',
    approach:'DFS recursion. At each node return 1 + max of left and right subtree depths.',
    java_code:`class Solution {\n  public int maxDepth(TreeNode root) {\n    if(root==null) return 0;\n    return 1+Math.max(maxDepth(root.left),maxDepth(root.right));\n  }\n}`,
    python_code:`def maxDepth(root):\n    if not root: return 0\n    return 1 + max(maxDepth(root.left), maxDepth(root.right))`,
    cpp_code:`int maxDepth(TreeNode* r){\n  if(!r) return 0;\n  return 1+max(maxDepth(r->left),maxDepth(r->right));\n}`,
    companies:['Amazon','TCS'],
    tags:['Tree','DFS','Recursion'],
    similarQs:['Minimum Depth','Balanced Binary Tree'],
    timeComplex:'O(n)', spaceComplex:'O(h)',
    pattern:'DFS Recursion on Tree',
    trick:'Every tree problem — think base case (null) first then recursive case',
    leetcodeUrl:'https://leetcode.com/problems/maximum-depth-of-binary-tree/'
  },

  // ══ BINARY SEARCH ══
  {
    topicSlug:'binarysearch', topic:'Binary Search', order:1, globalOrder:150,
    title:'Binary Search', difficulty:'Easy',
    description:'Given a sorted array of integers and a target, return its index. If not found return -1.',
    examples:[{ input:'nums = [-1,0,3,5,9,12], target = 9', output:'4' }],
    hint:'Use two pointers lo and hi. Check mid. If nums[mid]==target found. Narrow search space.',
    approach:'Standard binary search. lo=0, hi=n-1. While lo<=hi: mid=(lo+hi)/2. Adjust lo or hi.',
    java_code:`class Solution {\n  public int search(int[] nums, int target) {\n    int lo=0,hi=nums.length-1;\n    while(lo<=hi){\n      int mid=lo+(hi-lo)/2;\n      if(nums[mid]==target) return mid;\n      else if(nums[mid]<target) lo=mid+1;\n      else hi=mid-1;\n    }\n    return -1;\n  }\n}`,
    python_code:`def search(nums, target):\n    lo, hi = 0, len(nums)-1\n    while lo <= hi:\n        mid = (lo+hi)//2\n        if nums[mid] == target: return mid\n        elif nums[mid] < target: lo = mid+1\n        else: hi = mid-1\n    return -1`,
    cpp_code:`int search(vector<int>& nums, int target){\n  int lo=0,hi=nums.size()-1;\n  while(lo<=hi){int mid=lo+(hi-lo)/2;if(nums[mid]==target)return mid;else if(nums[mid]<target)lo=mid+1;else hi=mid-1;}\n  return -1;\n}`,
    companies:['TCS','Infosys','Amazon'],
    tags:['Binary Search','Array'],
    similarQs:['Search Insert Position','First Bad Version'],
    timeComplex:'O(log n)', spaceComplex:'O(1)',
    pattern:'Binary Search Template',
    trick:'Use lo+(hi-lo)/2 to avoid integer overflow',
    leetcodeUrl:'https://leetcode.com/problems/binary-search/'
  },

  // ══ DP ══
  {
    topicSlug:'dp', topic:'Dynamic Programming', order:1, globalOrder:240,
    title:'Climbing Stairs', difficulty:'Easy',
    description:'You are climbing a staircase. It takes n steps to reach the top. Each time you can climb 1 or 2 steps. How many ways to reach top?',
    examples:[{ input:'n = 3', output:'3', explanation:'1+1+1, 1+2, 2+1' }],
    hint:'Ways to reach step n = ways(n-1) + ways(n-2). Looks like Fibonacci!',
    approach:'DP bottom-up. dp[i] = dp[i-1] + dp[i-2]. Only need last 2 values.',
    java_code:`class Solution {\n  public int climbStairs(int n) {\n    if(n<=2) return n;\n    int a=1,b=2;\n    for(int i=3;i<=n;i++){\n      int c=a+b; a=b; b=c;\n    }\n    return b;\n  }\n}`,
    python_code:`def climbStairs(n):\n    a, b = 1, 1\n    for _ in range(n-1):\n        a, b = b, a+b\n    return b`,
    cpp_code:`int climbStairs(int n){\n  if(n<=2)return n;\n  int a=1,b=2;\n  for(int i=3;i<=n;i++){int c=a+b;a=b;b=c;}\n  return b;\n}`,
    companies:['TCS','Amazon','Wipro'],
    tags:['DP','Math'],
    similarQs:['House Robber','Min Cost Climbing Stairs'],
    timeComplex:'O(n)', spaceComplex:'O(1)',
    pattern:'1D DP — Fibonacci variant',
    trick:'Identify recurrence relation first — rest is mechanical',
    leetcodeUrl:'https://leetcode.com/problems/climbing-stairs/'
  },

  // ══ GRAPHS ══
  {
    topicSlug:'graphs', topic:'Graphs', order:1, globalOrder:200,
    title:'Number of Islands', difficulty:'Medium',
    description:"Given an m x n 2D grid of '1's (land) and '0's (water), count the number of islands.",
    examples:[{ input:"grid = [['1','1','0'],['0','1','0'],['0','0','1']]", output:'2' }],
    hint:'DFS from every unvisited land cell. Mark visited cells. Each DFS call = one island.',
    approach:'For each cell with 1, run DFS to mark entire island as visited. Count DFS calls.',
    java_code:`class Solution {\n  public int numIslands(char[][] g) {\n    int count=0;\n    for(int i=0;i<g.length;i++)\n      for(int j=0;j<g[0].length;j++)\n        if(g[i][j]=='1'){dfs(g,i,j);count++;}\n    return count;\n  }\n  void dfs(char[][] g,int i,int j){\n    if(i<0||i>=g.length||j<0||j>=g[0].length||g[i][j]!='1') return;\n    g[i][j]='0';\n    dfs(g,i+1,j);dfs(g,i-1,j);dfs(g,i,j+1);dfs(g,i,j-1);\n  }\n}`,
    python_code:`def numIslands(grid):\n    def dfs(i,j):\n        if i<0 or i>=len(grid) or j<0 or j>=len(grid[0]) or grid[i][j]!='1': return\n        grid[i][j]='0'\n        dfs(i+1,j);dfs(i-1,j);dfs(i,j+1);dfs(i,j-1)\n    count=0\n    for i in range(len(grid)):\n        for j in range(len(grid[0])):\n            if grid[i][j]=='1': dfs(i,j);count+=1\n    return count`,
    cpp_code:`int numIslands(vector<vector<char>>& g){\n  int c=0;\n  function<void(int,int)> dfs=[&](int i,int j){\n    if(i<0||i>=(int)g.size()||j<0||j>=(int)g[0].size()||g[i][j]!='1')return;\n    g[i][j]='0';\n    dfs(i+1,j);dfs(i-1,j);dfs(i,j+1);dfs(i,j-1);\n  };\n  for(int i=0;i<g.size();i++)for(int j=0;j<g[0].size();j++)if(g[i][j]=='1'){dfs(i,j);c++;}\n  return c;\n}`,
    companies:['Amazon','Google','Flipkart'],
    tags:['Graph','DFS','BFS'],
    similarQs:['Max Area of Island','Surrounded Regions'],
    timeComplex:'O(m*n)', spaceComplex:'O(m*n)',
    pattern:'Graph DFS/Flood Fill',
    trick:'Mark visited by changing cell value — no extra visited array needed',
    leetcodeUrl:'https://leetcode.com/problems/number-of-islands/'
  },

  // ══ BIT MANIPULATION ══
  {
    topicSlug:'bits', topic:'Bit Manipulation', order:1, globalOrder:280,
    title:'Single Number', difficulty:'Easy',
    description:'Given a non-empty array where every element appears twice except for one. Find that single one.',
    examples:[{ input:'nums = [4,1,2,1,2]', output:'4' }],
    hint:'XOR of a number with itself is 0. XOR of a number with 0 is the number itself.',
    approach:'XOR all numbers. Pairs cancel out (a^a=0). Single number remains (0^a=a).',
    java_code:`class Solution {\n  public int singleNumber(int[] nums) {\n    int res=0;\n    for(int n:nums) res^=n;\n    return res;\n  }\n}`,
    python_code:`def singleNumber(nums):\n    res = 0\n    for n in nums:\n        res ^= n\n    return res`,
    cpp_code:`int singleNumber(vector<int>& nums){\n  int r=0; for(int n:nums) r^=n; return r;\n}`,
    companies:['TCS','Amazon'],
    tags:['BitManipulation','XOR'],
    similarQs:['Single Number II','Missing Number'],
    timeComplex:'O(n)', spaceComplex:'O(1)',
    pattern:'XOR cancellation',
    trick:'XOR is its own inverse — pairs always cancel',
    leetcodeUrl:'https://leetcode.com/problems/single-number/'
  },
];

async function seed() {
  await MasterDSAQuestion.deleteMany({});
  const inserted = await MasterDSAQuestion.insertMany(questions);
  console.log(`✅ Inserted ${inserted.length} Master DSA questions`);
  mongoose.disconnect();
}

seed().catch(err => { console.error(err); mongoose.disconnect(); });

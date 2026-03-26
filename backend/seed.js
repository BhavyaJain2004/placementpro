// require('dotenv').config();
// const mongoose = require('mongoose');
// const DSAQuestion = require('./models/DSAQuestion');

// const q = (title,difficulty,topic,description,examples,approach,java_code,python_code,timeComplex,spaceComplex,companies,leetcodeUrl='') => ({title,difficulty,topic,description,examples,approach,java_code,python_code,timeComplex,spaceComplex,companies,leetcodeUrl});

// const questions = [

// // ══════════════════════════════════════════
// // ARRAYS — 20 questions
// // ══════════════════════════════════════════
// q('Two Sum','Easy','Arrays',
// 'Given an array of integers and a target, return indices of two numbers that add up to target.',
// [{input:'nums=[2,7,11,15], target=9',output:'[0,1]'},{input:'nums=[3,2,4], target=6',output:'[1,2]'}],
// 'Use a HashMap. For each element check if (target - element) exists in map. One pass O(n).',
// `class Solution {
//     public int[] twoSum(int[] nums, int target) {
//         Map<Integer,Integer> map = new HashMap<>();
//         for (int i = 0; i < nums.length; i++) {
//             int comp = target - nums[i];
//             if (map.containsKey(comp)) return new int[]{map.get(comp), i};
//             map.put(nums[i], i);
//         }
//         return new int[]{};
//     }
// }`,
// `class Solution:
//     def twoSum(self, nums, target):
//         seen = {}
//         for i, n in enumerate(nums):
//             if target - n in seen:
//                 return [seen[target-n], i]
//             seen[n] = i`,
// 'O(n)','O(n)',['TCS','Amazon','Infosys','Wipro','Cognizant'],'https://leetcode.com/problems/two-sum/'),

// q('Best Time to Buy and Sell Stock','Easy','Arrays',
// 'Given price array, find max profit by buying on one day and selling later.',
// [{input:'prices=[7,1,5,3,6,4]',output:'5'},{input:'prices=[7,6,4,3,1]',output:'0'}],
// 'Track min price seen so far. At each step compute profit = price - minPrice.',
// `class Solution {
//     public int maxProfit(int[] prices) {
//         int min = Integer.MAX_VALUE, profit = 0;
//         for (int p : prices) {
//             min = Math.min(min, p);
//             profit = Math.max(profit, p - min);
//         }
//         return profit;
//     }
// }`,
// `class Solution:
//     def maxProfit(self, prices):
//         min_p, profit = float('inf'), 0
//         for p in prices:
//             min_p = min(min_p, p)
//             profit = max(profit, p - min_p)
//         return profit`,
// 'O(n)','O(1)',['TCS','Amazon','Accenture','Deloitte'],'https://leetcode.com/problems/best-time-to-buy-and-sell-stock/'),

// q('Maximum Subarray (Kadane\'s Algorithm)','Medium','Arrays',
// 'Find the contiguous subarray with the largest sum.',
// [{input:'nums=[-2,1,-3,4,-1,2,1,-5,4]',output:'6'},{input:'nums=[1]',output:'1'}],
// 'Kadane\'s: maintain running sum. If running sum goes negative, reset to current element.',
// `class Solution {
//     public int maxSubArray(int[] nums) {
//         int maxSum = nums[0], curr = nums[0];
//         for (int i = 1; i < nums.length; i++) {
//             curr = Math.max(nums[i], curr + nums[i]);
//             maxSum = Math.max(maxSum, curr);
//         }
//         return maxSum;
//     }
// }`,
// `class Solution:
//     def maxSubArray(self, nums):
//         max_s = curr = nums[0]
//         for n in nums[1:]:
//             curr = max(n, curr + n)
//             max_s = max(max_s, curr)
//         return max_s`,
// 'O(n)','O(1)',['TCS','Infosys','Amazon','Zoho','Cognizant'],'https://leetcode.com/problems/maximum-subarray/'),

// q('Product of Array Except Self','Medium','Arrays',
// 'Return array where answer[i] = product of all elements except nums[i]. No division. O(n).',
// [{input:'nums=[1,2,3,4]',output:'[24,12,8,6]'}],
// 'Two passes: left prefix products then multiply right suffix products.',
// `class Solution {
//     public int[] productExceptSelf(int[] nums) {
//         int n = nums.length;
//         int[] res = new int[n];
//         res[0] = 1;
//         for (int i = 1; i < n; i++) res[i] = res[i-1] * nums[i-1];
//         int suf = 1;
//         for (int i = n-1; i >= 0; i--) { res[i] *= suf; suf *= nums[i]; }
//         return res;
//     }
// }`,
// `class Solution:
//     def productExceptSelf(self, nums):
//         n = len(nums)
//         res = [1] * n
//         for i in range(1, n): res[i] = res[i-1] * nums[i-1]
//         suf = 1
//         for i in range(n-1, -1, -1):
//             res[i] *= suf; suf *= nums[i]
//         return res`,
// 'O(n)','O(1)',['Amazon','Microsoft','Flipkart'],'https://leetcode.com/problems/product-of-array-except-self/'),

// q('Container With Most Water','Medium','Arrays',
// 'Given heights of n walls, find two that form container with most water.',
// [{input:'height=[1,8,6,2,5,4,8,3,7]',output:'49'}],
// 'Two pointers from ends. Move the shorter wall inward each time.',
// `class Solution {
//     public int maxArea(int[] h) {
//         int l=0, r=h.length-1, max=0;
//         while (l < r) {
//             max = Math.max(max, Math.min(h[l],h[r]) * (r-l));
//             if (h[l] < h[r]) l++; else r--;
//         }
//         return max;
//     }
// }`,
// `class Solution:
//     def maxArea(self, height):
//         l, r, mx = 0, len(height)-1, 0
//         while l < r:
//             mx = max(mx, min(height[l],height[r])*(r-l))
//             if height[l] < height[r]: l += 1
//             else: r -= 1
//         return mx`,
// 'O(n)','O(1)',['Amazon','Accenture'],'https://leetcode.com/problems/container-with-most-water/'),

// q('Three Sum','Medium','Arrays',
// 'Find all unique triplets in array that sum to zero.',
// [{input:'nums=[-1,0,1,2,-1,-4]',output:'[[-1,-1,2],[-1,0,1]]'}],
// 'Sort array. Fix one element, use two pointers for remaining. Skip duplicates.',
// `class Solution {
//     public List<List<Integer>> threeSum(int[] nums) {
//         Arrays.sort(nums);
//         List<List<Integer>> res = new ArrayList<>();
//         for (int i = 0; i < nums.length-2; i++) {
//             if (i>0 && nums[i]==nums[i-1]) continue;
//             int l=i+1, r=nums.length-1;
//             while (l < r) {
//                 int s = nums[i]+nums[l]+nums[r];
//                 if (s==0) { res.add(Arrays.asList(nums[i],nums[l],nums[r])); while(l<r && nums[l]==nums[l+1])l++; while(l<r && nums[r]==nums[r-1])r--; l++;r--; }
//                 else if (s<0) l++; else r--;
//             }
//         }
//         return res;
//     }
// }`,
// `class Solution:
//     def threeSum(self, nums):
//         nums.sort(); res = []
//         for i in range(len(nums)-2):
//             if i>0 and nums[i]==nums[i-1]: continue
//             l, r = i+1, len(nums)-1
//             while l < r:
//                 s = nums[i]+nums[l]+nums[r]
//                 if s==0:
//                     res.append([nums[i],nums[l],nums[r]])
//                     while l<r and nums[l]==nums[l+1]: l+=1
//                     while l<r and nums[r]==nums[r-1]: r-=1
//                     l+=1; r-=1
//                 elif s<0: l+=1
//                 else: r-=1
//         return res`,
// 'O(n²)','O(1)',['TCS NQT','Infosys','Amazon','Cognizant'],'https://leetcode.com/problems/3sum/'),

// q('Find the Duplicate Number','Medium','Arrays',
// 'Array of n+1 integers in range [1,n]. Find the duplicate without modifying array.',
// [{input:'nums=[1,3,4,2,2]',output:'2'}],
// 'Floyd\'s cycle detection: treat values as pointers. Find cycle entry point.',
// `class Solution {
//     public int findDuplicate(int[] nums) {
//         int slow=nums[0], fast=nums[0];
//         do { slow=nums[slow]; fast=nums[nums[fast]]; } while(slow!=fast);
//         slow=nums[0];
//         while(slow!=fast) { slow=nums[slow]; fast=nums[fast]; }
//         return slow;
//     }
// }`,
// `class Solution:
//     def findDuplicate(self, nums):
//         slow = fast = nums[0]
//         while True:
//             slow=nums[slow]; fast=nums[nums[fast]]
//             if slow==fast: break
//         slow=nums[0]
//         while slow!=fast:
//             slow=nums[slow]; fast=nums[fast]
//         return slow`,
// 'O(n)','O(1)',['Amazon','Flipkart'],'https://leetcode.com/problems/find-the-duplicate-number/'),

// q('Rotate Array','Medium','Arrays',
// 'Rotate array to the right by k steps in-place.',
// [{input:'nums=[1,2,3,4,5,6,7], k=3',output:'[5,6,7,1,2,3,4]'}],
// 'Reverse entire array, reverse first k, reverse last n-k.',
// `class Solution {
//     public void rotate(int[] a, int k) {
//         k %= a.length;
//         rev(a,0,a.length-1); rev(a,0,k-1); rev(a,k,a.length-1);
//     }
//     void rev(int[] a, int l, int r) { while(l<r){int t=a[l];a[l++]=a[r];a[r--]=t;} }
// }`,
// `class Solution:
//     def rotate(self, nums, k):
//         n=len(nums); k%=n
//         nums.reverse(); nums[:k]=nums[:k][::-1]; nums[k:]=nums[k:][::-1]`,
// 'O(n)','O(1)',['TCS','Infosys','Cognizant']),

// q('Maximum Product Subarray','Medium','Arrays',
// 'Find the contiguous subarray with the largest product.',
// [{input:'nums=[2,3,-2,4]',output:'6'},{input:'nums=[-2,0,-1]',output:'0'}],
// 'Track both max and min products (min can become max after negative). Update result at each step.',
// `class Solution {
//     public int maxProduct(int[] nums) {
//         int max=nums[0], min=nums[0], res=nums[0];
//         for (int i=1;i<nums.length;i++) {
//             if(nums[i]<0){int t=max;max=min;min=t;}
//             max=Math.max(nums[i],max*nums[i]);
//             min=Math.min(nums[i],min*nums[i]);
//             res=Math.max(res,max);
//         }
//         return res;
//     }
// }`,
// `class Solution:
//     def maxProduct(self, nums):
//         mx=mn=res=nums[0]
//         for n in nums[1:]:
//             if n<0: mx,mn=mn,mx
//             mx=max(n,mx*n); mn=min(n,mn*n); res=max(res,mx)
//         return res`,
// 'O(n)','O(1)',['Amazon','TCS NQT','Deloitte'],'https://leetcode.com/problems/maximum-product-subarray/'),

// q('Merge Intervals','Medium','Arrays',
// 'Given array of intervals, merge all overlapping intervals.',
// [{input:'[[1,3],[2,6],[8,10],[15,18]]',output:'[[1,6],[8,10],[15,18]]'}],
// 'Sort by start time. If current start <= previous end, merge. Else add to result.',
// `class Solution {
//     public int[][] merge(int[][] a) {
//         Arrays.sort(a,(x,y)->x[0]-y[0]);
//         List<int[]> res=new ArrayList<>();
//         res.add(a[0]);
//         for (int i=1;i<a.length;i++) {
//             int[] last=res.get(res.size()-1);
//             if(a[i][0]<=last[1]) last[1]=Math.max(last[1],a[i][1]);
//             else res.add(a[i]);
//         }
//         return res.toArray(new int[0][]);
//     }
// }`,
// `class Solution:
//     def merge(self, intervals):
//         intervals.sort(key=lambda x:x[0]); res=[intervals[0]]
//         for s,e in intervals[1:]:
//             if s<=res[-1][1]: res[-1][1]=max(res[-1][1],e)
//             else: res.append([s,e])
//         return res`,
// 'O(n log n)','O(n)',['Amazon','Accenture','Infosys'],'https://leetcode.com/problems/merge-intervals/'),

// q('Subarray Sum Equals K','Medium','Arrays',
// 'Count subarrays with sum equal to k.',
// [{input:'nums=[1,1,1], k=2',output:'2'}],
// 'Prefix sum + HashMap. For each prefix sum, check if (prefix - k) exists in map.',
// `class Solution {
//     public int subarraySum(int[] nums, int k) {
//         Map<Integer,Integer> map=new HashMap<>();
//         map.put(0,1); int sum=0,count=0;
//         for (int n:nums) {
//             sum+=n;
//             count+=map.getOrDefault(sum-k,0);
//             map.put(sum,map.getOrDefault(sum,0)+1);
//         }
//         return count;
//     }
// }`,
// `class Solution:
//     def subarraySum(self, nums, k):
//         from collections import defaultdict
//         mp=defaultdict(int); mp[0]=1; s=count=0
//         for n in nums:
//             s+=n; count+=mp[s-k]; mp[s]+=1
//         return count`,
// 'O(n)','O(n)',['Amazon','TCS NQT','Infosys'],'https://leetcode.com/problems/subarray-sum-equals-k/'),

// q('Trapping Rain Water','Hard','Arrays',
// 'Given elevation map, compute how much water it can trap after raining.',
// [{input:'height=[0,1,0,2,1,0,1,3,2,1,2,1]',output:'6'}],
// 'Two pointers. Track left_max and right_max. Water at each position = min(left_max,right_max) - height[i].',
// `class Solution {
//     public int trap(int[] h) {
//         int l=0,r=h.length-1,lm=0,rm=0,res=0;
//         while(l<r){
//             if(h[l]<h[r]){lm=Math.max(lm,h[l]);res+=lm-h[l];l++;}
//             else{rm=Math.max(rm,h[r]);res+=rm-h[r];r--;}
//         }
//         return res;
//     }
// }`,
// `class Solution:
//     def trap(self, h):
//         l,r,lm,rm,res=0,len(h)-1,0,0,0
//         while l<r:
//             if h[l]<h[r]:lm=max(lm,h[l]);res+=lm-h[l];l+=1
//             else:rm=max(rm,h[r]);res+=rm-h[r];r-=1
//         return res`,
// 'O(n)','O(1)',['Amazon','Flipkart','ION Group'],'https://leetcode.com/problems/trapping-rain-water/'),

// // ══════════════════════════════════════════
// // STRINGS — 15 questions
// // ══════════════════════════════════════════
// q('Valid Anagram','Easy','Strings',
// 'Given two strings s and t, return true if t is an anagram of s.',
// [{input:'s="anagram", t="nagaram"',output:'true'},{input:'s="rat", t="car"',output:'false'}],
// 'Count character frequencies using 26-size array. Increment for s, decrement for t.',
// `class Solution {
//     public boolean isAnagram(String s, String t) {
//         if(s.length()!=t.length()) return false;
//         int[] cnt=new int[26];
//         for(char c:s.toCharArray()) cnt[c-'a']++;
//         for(char c:t.toCharArray()) if(--cnt[c-'a']<0) return false;
//         return true;
//     }
// }`,
// `class Solution:
//     def isAnagram(self, s, t):
//         from collections import Counter
//         return Counter(s)==Counter(t)`,
// 'O(n)','O(1)',['TCS','Infosys','Wipro','Accenture'],'https://leetcode.com/problems/valid-anagram/'),

// q('Longest Substring Without Repeating Characters','Medium','Strings',
// 'Find length of longest substring without duplicate characters.',
// [{input:'s="abcabcbb"',output:'3'},{input:'s="bbbbb"',output:'1'}],
// 'Sliding window + HashMap storing last index of each char. Move left pointer when duplicate found.',
// `class Solution {
//     public int lengthOfLongestSubstring(String s) {
//         Map<Character,Integer> map=new HashMap<>();
//         int max=0,l=0;
//         for(int r=0;r<s.length();r++){
//             if(map.containsKey(s.charAt(r))) l=Math.max(l,map.get(s.charAt(r))+1);
//             map.put(s.charAt(r),r);
//             max=Math.max(max,r-l+1);
//         }
//         return max;
//     }
// }`,
// `class Solution:
//     def lengthOfLongestSubstring(self, s):
//         seen,l,mx={},0,0
//         for r,c in enumerate(s):
//             if c in seen and seen[c]>=l: l=seen[c]+1
//             seen[c]=r; mx=max(mx,r-l+1)
//         return mx`,
// 'O(n)','O(min(n,m))',['Amazon','Wipro','Cognizant','Zoho'],'https://leetcode.com/problems/longest-substring-without-repeating-characters/'),

// q('Valid Parentheses','Easy','Strings',
// 'Check if string of brackets is valid — each opening has matching closing in right order.',
// [{input:'s="()[]{}"',output:'true'},{input:'s="(]"',output:'false'}],
// 'Stack. Push opening brackets. For closing, check if stack top matches.',
// `class Solution {
//     public boolean isValid(String s) {
//         Stack<Character> st=new Stack<>();
//         for(char c:s.toCharArray()){
//             if(c=='('||c=='{'||c=='[') st.push(c);
//             else{
//                 if(st.isEmpty()) return false;
//                 char t=st.pop();
//                 if(c==')'&&t!='('||c=='}'&&t!='{'||c==']'&&t!='[') return false;
//             }
//         }
//         return st.isEmpty();
//     }
// }`,
// `class Solution:
//     def isValid(self, s):
//         st=[]; mp={')':'(','}'  :'{',']':'['}
//         for c in s:
//             if c in mp:
//                 if not st or st[-1]!=mp[c]: return False
//                 st.pop()
//             else: st.append(c)
//         return not st`,
// 'O(n)','O(n)',['TCS','Amazon','Zoho','Infosys'],'https://leetcode.com/problems/valid-parentheses/'),

// q('Palindrome Check','Easy','Strings',
// 'A phrase is a palindrome after converting to lowercase and removing non-alphanumeric chars.',
// [{input:'s="A man, a plan, a canal: Panama"',output:'true'},{input:'s="race a car"',output:'false'}],
// 'Two pointers. Skip non-alphanumeric. Compare lowercase chars.',
// `class Solution {
//     public boolean isPalindrome(String s) {
//         int l=0,r=s.length()-1;
//         while(l<r){
//             while(l<r&&!Character.isLetterOrDigit(s.charAt(l))) l++;
//             while(l<r&&!Character.isLetterOrDigit(s.charAt(r))) r--;
//             if(Character.toLowerCase(s.charAt(l))!=Character.toLowerCase(s.charAt(r))) return false;
//             l++;r--;
//         }
//         return true;
//     }
// }`,
// `class Solution:
//     def isPalindrome(self, s):
//         f=[c.lower() for c in s if c.isalnum()]
//         return f==f[::-1]`,
// 'O(n)','O(1)',['TCS','Infosys','Wipro','Cognizant','HCL']),

// q('Longest Common Prefix','Easy','Strings',
// 'Find the longest common prefix string among an array of strings.',
// [{input:'strs=["flower","flow","flight"]',output:'"fl"'}],
// 'Sort array. Compare first and last strings only — if they share prefix, all do.',
// `class Solution {
//     public String longestCommonPrefix(String[] strs) {
//         Arrays.sort(strs);
//         String a=strs[0],b=strs[strs.length-1]; int i=0;
//         while(i<a.length()&&a.charAt(i)==b.charAt(i)) i++;
//         return a.substring(0,i);
//     }
// }`,
// `class Solution:
//     def longestCommonPrefix(self, strs):
//         pre=strs[0]
//         for s in strs[1:]:
//             while not s.startswith(pre): pre=pre[:-1]
//         return pre`,
// 'O(n·m)','O(1)',['TCS','Wipro','Cognizant','HCL']),

// q('String Compression','Medium','Strings',
// 'Compress string such that "aabcccccaaa" becomes "a2b1c5a3". Return compressed if shorter.',
// [{input:'s="aabcccccaaa"',output:'"a2b1c5a3"'}],
// 'Count consecutive characters. Append char + count to result.',
// `class Solution {
//     public String compress(String s) {
//         StringBuilder sb=new StringBuilder(); int i=0;
//         while(i<s.length()){
//             char c=s.charAt(i); int cnt=0;
//             while(i<s.length()&&s.charAt(i)==c){cnt++;i++;}
//             sb.append(c).append(cnt);
//         }
//         String res=sb.toString();
//         return res.length()<s.length()?res:s;
//     }
// }`,
// `class Solution:
//     def compress(self, s):
//         res,i='',0
//         while i<len(s):
//             c,cnt=s[i],0
//             while i<len(s) and s[i]==c: cnt+=1;i+=1
//             res+=c+str(cnt)
//         return res if len(res)<len(s) else s`,
// 'O(n)','O(n)',['TCS NQT','Infosys','Wipro','Accenture']),

// q('Reverse Words in a String','Medium','Strings',
// 'Reverse the order of words in a string. Remove extra spaces.',
// [{input:'s="  the sky  is blue  "',output:'"blue is sky the"'}],
// 'Split by spaces, filter empty strings, reverse list, join with single space.',
// `class Solution {
//     public String reverseWords(String s) {
//         String[] w=s.trim().split("\\s+");
//         StringBuilder sb=new StringBuilder();
//         for(int i=w.length-1;i>=0;i--){sb.append(w[i]);if(i>0)sb.append(' ');}
//         return sb.toString();
//     }
// }`,
// `class Solution:
//     def reverseWords(self, s):
//         return ' '.join(reversed(s.split()))`,
// 'O(n)','O(n)',['TCS','Infosys','Wipro','Capgemini']),

// q('Count and Say','Medium','Strings',
// 'Generate nth term of count-and-say sequence. "1"→"11"→"21"→"1211"→"111221"',
// [{input:'n=4',output:'"1211"'}],
// 'Iteratively build each term from previous. Count consecutive same digits.',
// `class Solution {
//     public String countAndSay(int n) {
//         String s="1";
//         for(int i=1;i<n;i++){
//             StringBuilder sb=new StringBuilder(); int j=0;
//             while(j<s.length()){
//                 char c=s.charAt(j); int cnt=0;
//                 while(j<s.length()&&s.charAt(j)==c){cnt++;j++;}
//                 sb.append(cnt).append(c);
//             }
//             s=sb.toString();
//         }
//         return s;
//     }
// }`,
// `class Solution:
//     def countAndSay(self, n):
//         s='1'
//         for _ in range(n-1):
//             res,i='',0
//             while i<len(s):
//                 c,cnt=s[i],0
//                 while i<len(s) and s[i]==c: cnt+=1;i+=1
//                 res+=str(cnt)+c
//             s=res
//         return s`,
// 'O(2^n)','O(2^n)',['TCS NQT','Infosys','Cognizant']),

// q('Group Anagrams','Medium','Strings',
// 'Given array of strings, group all anagrams together.',
// [{input:'strs=["eat","tea","tan","ate","nat","bat"]',output:'[["bat"],["nat","tan"],["ate","eat","tea"]]'}],
// 'Sort each string to get key. Group strings with same key using HashMap.',
// `class Solution {
//     public List<List<String>> groupAnagrams(String[] strs) {
//         Map<String,List<String>> map=new HashMap<>();
//         for(String s:strs){
//             char[] ch=s.toCharArray(); Arrays.sort(ch);
//             String key=new String(ch);
//             map.computeIfAbsent(key,k->new ArrayList<>()).add(s);
//         }
//         return new ArrayList<>(map.values());
//     }
// }`,
// `class Solution:
//     def groupAnagrams(self, strs):
//         from collections import defaultdict
//         mp=defaultdict(list)
//         for s in strs: mp[tuple(sorted(s))].append(s)
//         return list(mp.values())`,
// 'O(n·k·log k)','O(n·k)',['Amazon','Zoho'],'https://leetcode.com/problems/group-anagrams/'),

// q('Minimum Window Substring','Hard','Strings',
// 'Find minimum window substring of s that contains all characters of t.',
// [{input:'s="ADOBECODEBANC", t="ABC"',output:'"BANC"'}],
// 'Sliding window. Expand right until all chars of t found. Then shrink left to minimize.',
// `class Solution {
//     public String minWindow(String s, String t) {
//         Map<Character,Integer> need=new HashMap<>(), win=new HashMap<>();
//         for(char c:t.toCharArray()) need.merge(c,1,Integer::sum);
//         int have=0,req=need.size(),l=0,minL=0,minLen=Integer.MAX_VALUE;
//         for(int r=0;r<s.length();r++){
//             char c=s.charAt(r); win.merge(c,1,Integer::sum);
//             if(need.containsKey(c)&&win.get(c).equals(need.get(c))) have++;
//             while(have==req){
//                 if(r-l+1<minLen){minLen=r-l+1;minL=l;}
//                 char lc=s.charAt(l); win.merge(lc,-1,Integer::sum);
//                 if(need.containsKey(lc)&&win.get(lc)<need.get(lc)) have--;
//                 l++;
//             }
//         }
//         return minLen==Integer.MAX_VALUE?"":s.substring(minL,minL+minLen);
//     }
// }`,
// `class Solution:
//     def minWindow(self, s, t):
//         from collections import Counter,defaultdict
//         need=Counter(t); win=defaultdict(int)
//         have=req=len(need); res=''; l=0
//         for r,c in enumerate(s):
//             win[c]+=1
//             if c in need and win[c]==need[c]: req-=1
//             while req==0:
//                 if not res or r-l+1<len(res): res=s[l:r+1]
//                 win[s[l]]-=1
//                 if s[l] in need and win[s[l]]<need[s[l]]: req+=1
//                 l+=1
//         return res`,
// 'O(n)','O(n)',['Amazon','Flipkart'],'https://leetcode.com/problems/minimum-window-substring/'),

// // ══════════════════════════════════════════
// // LINKED LIST — 12 questions
// // ══════════════════════════════════════════
// q('Reverse Linked List','Easy','LinkedList',
// 'Reverse a singly linked list.',
// [{input:'head=[1,2,3,4,5]',output:'[5,4,3,2,1]'}],
// 'Iterative: use prev, curr, next pointers. Reverse next pointer of each node.',
// `class Solution {
//     public ListNode reverseList(ListNode head) {
//         ListNode prev=null,curr=head;
//         while(curr!=null){ ListNode nxt=curr.next; curr.next=prev; prev=curr; curr=nxt; }
//         return prev;
//     }
// }`,
// `class Solution:
//     def reverseList(self, head):
//         prev,curr=None,head
//         while curr:
//             curr.next,prev,curr=prev,curr,curr.next
//         return prev`,
// 'O(n)','O(1)',['TCS','Amazon','Infosys','Microsoft'],'https://leetcode.com/problems/reverse-linked-list/'),

// q('Detect Cycle in Linked List','Easy','LinkedList',
// 'Determine if linked list has a cycle.',
// [{input:'head=[3,2,0,-4], pos=1',output:'true'}],
// 'Floyd\'s slow/fast pointers. If they meet, cycle exists.',
// `class Solution {
//     public boolean hasCycle(ListNode head) {
//         ListNode s=head,f=head;
//         while(f!=null&&f.next!=null){ s=s.next;f=f.next.next; if(s==f) return true; }
//         return false;
//     }
// }`,
// `class Solution:
//     def hasCycle(self, head):
//         s=f=head
//         while f and f.next:
//             s=s.next;f=f.next.next
//             if s==f: return True
//         return False`,
// 'O(n)','O(1)',['TCS','Amazon'],'https://leetcode.com/problems/linked-list-cycle/'),

// q('Merge Two Sorted Lists','Easy','LinkedList',
// 'Merge two sorted linked lists into one sorted list.',
// [{input:'l1=[1,2,4], l2=[1,3,4]',output:'[1,1,2,3,4,4]'}],
// 'Use dummy head. Iteratively pick smaller node from both lists.',
// `class Solution {
//     public ListNode mergeTwoLists(ListNode l1, ListNode l2) {
//         ListNode d=new ListNode(0),c=d;
//         while(l1!=null&&l2!=null){
//             if(l1.val<=l2.val){c.next=l1;l1=l1.next;}
//             else{c.next=l2;l2=l2.next;}
//             c=c.next;
//         }
//         c.next=l1!=null?l1:l2;
//         return d.next;
//     }
// }`,
// `class Solution:
//     def mergeTwoLists(self, l1, l2):
//         d=c=ListNode(0)
//         while l1 and l2:
//             if l1.val<=l2.val: c.next=l1;l1=l1.next
//             else: c.next=l2;l2=l2.next
//             c=c.next
//         c.next=l1 or l2
//         return d.next`,
// 'O(n+m)','O(1)',['Amazon','Zoho'],'https://leetcode.com/problems/merge-two-sorted-lists/'),

// q('Find Middle of Linked List','Easy','LinkedList',
// 'Return middle node of linked list. If two middles, return second.',
// [{input:'head=[1,2,3,4,5]',output:'[3,4,5]'},{input:'head=[1,2,3,4,5,6]',output:'[4,5,6]'}],
// 'Slow/fast pointers. Fast moves 2x. When fast reaches end, slow is at middle.',
// `class Solution {
//     public ListNode middleNode(ListNode head) {
//         ListNode s=head,f=head;
//         while(f!=null&&f.next!=null){ s=s.next;f=f.next.next; }
//         return s;
//     }
// }`,
// `class Solution:
//     def middleNode(self, head):
//         s=f=head
//         while f and f.next: s=s.next;f=f.next.next
//         return s`,
// 'O(n)','O(1)',['TCS','Infosys','Wipro','HCL']),

// q('Remove Nth Node From End','Medium','LinkedList',
// 'Remove the nth node from the end of the list.',
// [{input:'head=[1,2,3,4,5], n=2',output:'[1,2,3,5]'}],
// 'Two pointers with gap of n. When fast reaches end, slow is at n-1th from end.',
// `class Solution {
//     public ListNode removeNthFromEnd(ListNode head, int n) {
//         ListNode d=new ListNode(0);d.next=head;
//         ListNode f=d,s=d;
//         for(int i=0;i<=n;i++) f=f.next;
//         while(f!=null){s=s.next;f=f.next;}
//         s.next=s.next.next;
//         return d.next;
//     }
// }`,
// `class Solution:
//     def removeNthFromEnd(self, head, n):
//         d=ListNode(0);d.next=head;f=s=d
//         for _ in range(n+1): f=f.next
//         while f: s=s.next;f=f.next
//         s.next=s.next.next
//         return d.next`,
// 'O(n)','O(1)',['Amazon','TCS'],'https://leetcode.com/problems/remove-nth-node-from-end-of-list/'),

// q('Add Two Numbers','Medium','LinkedList',
// 'Add two numbers represented as linked lists (digits in reverse order).',
// [{input:'l1=[2,4,3], l2=[5,6,4]',output:'[7,0,8] (342+465=807)'}],
// 'Traverse both lists simultaneously. Handle carry. Create new nodes.',
// `class Solution {
//     public ListNode addTwoNumbers(ListNode l1, ListNode l2) {
//         ListNode d=new ListNode(0),c=d; int carry=0;
//         while(l1!=null||l2!=null||carry!=0){
//             int s=(l1!=null?l1.val:0)+(l2!=null?l2.val:0)+carry;
//             carry=s/10; c.next=new ListNode(s%10); c=c.next;
//             if(l1!=null)l1=l1.next; if(l2!=null)l2=l2.next;
//         }
//         return d.next;
//     }
// }`,
// `class Solution:
//     def addTwoNumbers(self, l1, l2):
//         d=c=ListNode(0); carry=0
//         while l1 or l2 or carry:
//             s=(l1.val if l1 else 0)+(l2.val if l2 else 0)+carry
//             carry,s=divmod(s,10); c.next=ListNode(s);c=c.next
//             if l1:l1=l1.next
//             if l2:l2=l2.next
//         return d.next`,
// 'O(max(m,n))','O(max(m,n))',['Amazon','Infosys'],'https://leetcode.com/problems/add-two-numbers/'),

// // ══════════════════════════════════════════
// // STACKS & QUEUES — 10 questions
// // ══════════════════════════════════════════
// q('Min Stack','Medium','Stacks & Queues',
// 'Design stack supporting push, pop, top, and getMin in O(1).',
// [{input:'push(-2),push(0),push(-3),getMin(),pop(),top(),getMin()',output:'-3,0,-2'}],
// 'Two stacks: main stack and min stack. Min stack tracks minimum at each level.',
// `class MinStack {
//     Stack<Integer> st=new Stack<>(), mn=new Stack<>();
//     public void push(int v){ st.push(v); mn.push(mn.isEmpty()||v<=mn.peek()?v:mn.peek()); }
//     public void pop(){ st.pop();mn.pop(); }
//     public int top(){ return st.peek(); }
//     public int getMin(){ return mn.peek(); }
// }`,
// `class MinStack:
//     def __init__(self): self.st=[];self.mn=[]
//     def push(self,v):
//         self.st.append(v)
//         self.mn.append(v if not self.mn else min(v,self.mn[-1]))
//     def pop(self): self.st.pop();self.mn.pop()
//     def top(self): return self.st[-1]
//     def getMin(self): return self.mn[-1]`,
// 'O(1) all ops','O(n)',['Amazon','Zoho'],'https://leetcode.com/problems/min-stack/'),

// q('Next Greater Element','Medium','Stacks & Queues',
// 'For each element in nums1, find next greater element in nums2. Return -1 if none.',
// [{input:'nums1=[4,1,2], nums2=[1,3,4,2]',output:'[-1,3,-1]'}],
// 'Monotonic stack on nums2. Process right to left maintaining decreasing stack.',
// `class Solution {
//     public int[] nextGreaterElement(int[] n1, int[] n2) {
//         Map<Integer,Integer> map=new HashMap<>();
//         Stack<Integer> st=new Stack<>();
//         for(int n:n2){
//             while(!st.isEmpty()&&st.peek()<n) map.put(st.pop(),n);
//             st.push(n);
//         }
//         int[] res=new int[n1.length];
//         for(int i=0;i<n1.length;i++) res[i]=map.getOrDefault(n1[i],-1);
//         return res;
//     }
// }`,
// `class Solution:
//     def nextGreaterElement(self, nums1, nums2):
//         nge={};st=[]
//         for n in nums2:
//             while st and st[-1]<n: nge[st.pop()]=n
//             st.append(n)
//         return [nge.get(n,-1) for n in nums1]`,
// 'O(n+m)','O(n)',['TCS NQT','Amazon']),

// q('Largest Rectangle in Histogram','Hard','Stacks & Queues',
// 'Find the largest rectangle in histogram.',
// [{input:'heights=[2,1,5,6,2,3]',output:'10'}],
// 'Monotonic stack. For each bar, find left and right boundary where bar is minimum.',
// `class Solution {
//     public int largestRectangleArea(int[] h) {
//         Stack<Integer> st=new Stack<>(); int max=0;
//         for(int i=0;i<=h.length;i++){
//             int cur=i==h.length?0:h[i];
//             while(!st.isEmpty()&&h[st.peek()]>cur){
//                 int ht=h[st.pop()];
//                 int w=st.isEmpty()?i:i-st.peek()-1;
//                 max=Math.max(max,ht*w);
//             }
//             st.push(i);
//         }
//         return max;
//     }
// }`,
// `class Solution:
//     def largestRectangleArea(self, h):
//         st=[]; mx=0
//         for i,v in enumerate(h+[0]):
//             while st and h[st[-1]]>v:
//                 ht=h[st.pop()]
//                 w=i if not st else i-st[-1]-1
//                 mx=max(mx,ht*w)
//             st.append(i)
//         return mx`,
// 'O(n)','O(n)',['Amazon','Flipkart'],'https://leetcode.com/problems/largest-rectangle-in-histogram/'),

// // ══════════════════════════════════════════
// // TREES — 15 questions
// // ══════════════════════════════════════════
// q('Maximum Depth of Binary Tree','Easy','Trees',
// 'Return maximum depth of binary tree.',
// [{input:'root=[3,9,20,null,null,15,7]',output:'3'}],
// 'Recursive DFS: max depth = 1 + max(left depth, right depth).',
// `class Solution {
//     public int maxDepth(TreeNode root) {
//         if(root==null) return 0;
//         return 1+Math.max(maxDepth(root.left),maxDepth(root.right));
//     }
// }`,
// `class Solution:
//     def maxDepth(self, root):
//         if not root: return 0
//         return 1+max(self.maxDepth(root.left),self.maxDepth(root.right))`,
// 'O(n)','O(h)',['TCS','Amazon','Infosys'],'https://leetcode.com/problems/maximum-depth-of-binary-tree/'),

// q('Level Order Traversal','Medium','Trees',
// 'Return level order traversal as list of lists.',
// [{input:'root=[3,9,20,null,null,15,7]',output:'[[3],[9,20],[15,7]]'}],
// 'BFS using queue. Process all nodes at current level before moving to next.',
// `class Solution {
//     public List<List<Integer>> levelOrder(TreeNode root) {
//         List<List<Integer>> res=new ArrayList<>();
//         if(root==null) return res;
//         Queue<TreeNode> q=new LinkedList<>(); q.offer(root);
//         while(!q.isEmpty()){
//             List<Integer> lvl=new ArrayList<>();
//             for(int i=q.size();i>0;i--){
//                 TreeNode n=q.poll(); lvl.add(n.val);
//                 if(n.left!=null)q.offer(n.left);
//                 if(n.right!=null)q.offer(n.right);
//             }
//             res.add(lvl);
//         }
//         return res;
//     }
// }`,
// `from collections import deque
// class Solution:
//     def levelOrder(self, root):
//         if not root: return []
//         res=[]; q=deque([root])
//         while q:
//             lvl=[]
//             for _ in range(len(q)):
//                 n=q.popleft(); lvl.append(n.val)
//                 if n.left: q.append(n.left)
//                 if n.right: q.append(n.right)
//             res.append(lvl)
//         return res`,
// 'O(n)','O(n)',['Amazon','Infosys','Wipro']),

// q('Validate Binary Search Tree','Medium','Trees',
// 'Determine if binary tree is a valid BST.',
// [{input:'root=[2,1,3]',output:'true'},{input:'root=[5,1,4,null,null,3,6]',output:'false'}],
// 'Pass min/max bounds recursively. Each node must be within its valid range.',
// `class Solution {
//     public boolean isValidBST(TreeNode root) { return dfs(root,Long.MIN_VALUE,Long.MAX_VALUE); }
//     boolean dfs(TreeNode n,long mn,long mx){
//         if(n==null) return true;
//         if(n.val<=mn||n.val>=mx) return false;
//         return dfs(n.left,mn,n.val)&&dfs(n.right,n.val,mx);
//     }
// }`,
// `class Solution:
//     def isValidBST(self, root):
//         def dfs(n,mn,mx):
//             if not n: return True
//             if n.val<=mn or n.val>=mx: return False
//             return dfs(n.left,mn,n.val) and dfs(n.right,n.val,mx)
//         return dfs(root,float('-inf'),float('inf'))`,
// 'O(n)','O(h)',['Amazon','Zoho']),

// q('Lowest Common Ancestor of BST','Easy','Trees',
// 'Find LCA of two nodes in a BST.',
// [{input:'root=[6,2,8,0,4,7,9], p=2, q=8',output:'6'}],
// 'In BST: if both < root go left, both > root go right, else root is LCA.',
// `class Solution {
//     public TreeNode lowestCommonAncestor(TreeNode r,TreeNode p,TreeNode q){
//         if(p.val<r.val&&q.val<r.val) return lowestCommonAncestor(r.left,p,q);
//         if(p.val>r.val&&q.val>r.val) return lowestCommonAncestor(r.right,p,q);
//         return r;
//     }
// }`,
// `class Solution:
//     def lowestCommonAncestor(self,root,p,q):
//         if p.val<root.val and q.val<root.val: return self.lowestCommonAncestor(root.left,p,q)
//         if p.val>root.val and q.val>root.val: return self.lowestCommonAncestor(root.right,p,q)
//         return root`,
// 'O(h)','O(h)',['Amazon','TCS']),

// q('Binary Tree Right Side View','Medium','Trees',
// 'Given root, imagine standing on right side. Return values visible top to bottom.',
// [{input:'root=[1,2,3,null,5,null,4]',output:'[1,3,4]'}],
// 'BFS level order. Take last element of each level.',
// `class Solution {
//     public List<Integer> rightSideView(TreeNode root) {
//         List<Integer> res=new ArrayList<>();
//         if(root==null) return res;
//         Queue<TreeNode> q=new LinkedList<>(); q.offer(root);
//         while(!q.isEmpty()){
//             int sz=q.size(); TreeNode last=null;
//             for(int i=0;i<sz;i++){ last=q.poll(); if(last.left!=null)q.offer(last.left); if(last.right!=null)q.offer(last.right); }
//             res.add(last.val);
//         }
//         return res;
//     }
// }`,
// `from collections import deque
// class Solution:
//     def rightSideView(self, root):
//         if not root: return []
//         res=[]; q=deque([root])
//         while q:
//             for _ in range(len(q)-1): n=q.popleft();(q.append(n.left) if n.left else None);(q.append(n.right) if n.right else None)
//             n=q.popleft(); res.append(n.val)
//             if n.left: q.append(n.left)
//             if n.right: q.append(n.right)
//         return res`,
// 'O(n)','O(n)',['Amazon','Flipkart']),

// // ══════════════════════════════════════════
// // DYNAMIC PROGRAMMING — 20 questions
// // ══════════════════════════════════════════
// q('Climbing Stairs','Easy','Dynamic Programming',
// 'You can climb 1 or 2 steps. How many ways to reach the top of n stairs?',
// [{input:'n=2',output:'2'},{input:'n=3',output:'3'}],
// 'Fibonacci pattern. dp[i] = dp[i-1] + dp[i-2]. Optimize to O(1) space.',
// `class Solution {
//     public int climbStairs(int n) {
//         if(n<=2) return n;
//         int a=1,b=2;
//         for(int i=3;i<=n;i++){int c=a+b;a=b;b=c;}
//         return b;
//     }
// }`,
// `class Solution:
//     def climbStairs(self, n):
//         a,b=1,1
//         for _ in range(n-1): a,b=b,a+b
//         return b`,
// 'O(n)','O(1)',['TCS','Infosys','Wipro','Amazon'],'https://leetcode.com/problems/climbing-stairs/'),

// q('Coin Change','Medium','Dynamic Programming',
// 'Find fewest coins needed to make amount. Return -1 if impossible.',
// [{input:'coins=[1,5,6,9], amount=11',output:'2'},{input:'coins=[2], amount=3',output:'-1'}],
// 'Bottom-up DP. dp[i] = min coins for amount i. For each coin: dp[i] = min(dp[i], dp[i-coin]+1).',
// `class Solution {
//     public int coinChange(int[] coins, int amount) {
//         int[] dp=new int[amount+1]; Arrays.fill(dp,amount+1); dp[0]=0;
//         for(int i=1;i<=amount;i++)
//             for(int c:coins) if(c<=i) dp[i]=Math.min(dp[i],dp[i-c]+1);
//         return dp[amount]>amount?-1:dp[amount];
//     }
// }`,
// `class Solution:
//     def coinChange(self, coins, amount):
//         dp=[float('inf')]*(amount+1); dp[0]=0
//         for i in range(1,amount+1):
//             for c in coins:
//                 if c<=i: dp[i]=min(dp[i],dp[i-c]+1)
//         return dp[amount] if dp[amount]!=float('inf') else -1`,
// 'O(n·amount)','O(amount)',['Amazon','TCS NQT'],'https://leetcode.com/problems/coin-change/'),

// q('Longest Common Subsequence','Medium','Dynamic Programming',
// 'Return length of longest common subsequence of text1 and text2.',
// [{input:'text1="abcde", text2="ace"',output:'3'}],
// 'dp[i][j] = LCS length for text1[0..i] and text2[0..j]. If chars match +1, else max of adjacent.',
// `class Solution {
//     public int longestCommonSubsequence(String a, String b) {
//         int m=a.length(),n=b.length();
//         int[][] dp=new int[m+1][n+1];
//         for(int i=1;i<=m;i++) for(int j=1;j<=n;j++)
//             dp[i][j]=a.charAt(i-1)==b.charAt(j-1)?dp[i-1][j-1]+1:Math.max(dp[i-1][j],dp[i][j-1]);
//         return dp[m][n];
//     }
// }`,
// `class Solution:
//     def longestCommonSubsequence(self, a, b):
//         m,n=len(a),len(b)
//         dp=[[0]*(n+1) for _ in range(m+1)]
//         for i in range(1,m+1):
//             for j in range(1,n+1):
//                 dp[i][j]=dp[i-1][j-1]+1 if a[i-1]==b[j-1] else max(dp[i-1][j],dp[i][j-1])
//         return dp[m][n]`,
// 'O(m·n)','O(m·n)',['Amazon','TCS','Infosys']),

// q('0/1 Knapsack','Medium','Dynamic Programming',
// 'Given weights and values, find max value within weight capacity W.',
// [{input:'weights=[1,3,4,5], values=[1,4,5,7], W=7',output:'9'}],
// 'dp[i][w] = max value using first i items with capacity w. Include or exclude item.',
// `class Solution {
//     public int knapsack(int[] wt, int[] val, int W) {
//         int n=wt.length;
//         int[][] dp=new int[n+1][W+1];
//         for(int i=1;i<=n;i++) for(int w=0;w<=W;w++){
//             dp[i][w]=dp[i-1][w];
//             if(wt[i-1]<=w) dp[i][w]=Math.max(dp[i][w],dp[i-1][w-wt[i-1]]+val[i-1]);
//         }
//         return dp[n][W];
//     }
// }`,
// `def knapsack(wt,val,W):
//     n=len(wt); dp=[[0]*(W+1) for _ in range(n+1)]
//     for i in range(1,n+1):
//         for w in range(W+1):
//             dp[i][w]=dp[i-1][w]
//             if wt[i-1]<=w: dp[i][w]=max(dp[i][w],dp[i-1][w-wt[i-1]]+val[i-1])
//     return dp[n][W]`,
// 'O(n·W)','O(n·W)',['TCS NQT','Amazon','Infosys']),

// q('Longest Increasing Subsequence','Medium','Dynamic Programming',
// 'Return length of longest strictly increasing subsequence.',
// [{input:'nums=[10,9,2,5,3,7,101,18]',output:'4'}],
// 'dp[i] = LIS ending at i. For each i, check all j<i where nums[j]<nums[i].',
// `class Solution {
//     public int lengthOfLIS(int[] nums) {
//         int n=nums.length,max=1;
//         int[] dp=new int[n]; Arrays.fill(dp,1);
//         for(int i=1;i<n;i++) for(int j=0;j<i;j++)
//             if(nums[j]<nums[i]){ dp[i]=Math.max(dp[i],dp[j]+1); max=Math.max(max,dp[i]); }
//         return max;
//     }
// }`,
// `class Solution:
//     def lengthOfLIS(self, nums):
//         dp=[1]*len(nums)
//         for i in range(1,len(nums)):
//             for j in range(i):
//                 if nums[j]<nums[i]: dp[i]=max(dp[i],dp[j]+1)
//         return max(dp)`,
// 'O(n²)','O(n)',['Amazon','Zoho','TCS NQT']),

// q('House Robber','Medium','Dynamic Programming',
// 'You cannot rob two adjacent houses. Maximize the amount you can rob.',
// [{input:'nums=[2,7,9,3,1]',output:'12'}],
// 'dp[i] = max money rob from first i houses. dp[i] = max(dp[i-1], dp[i-2]+nums[i]).',
// `class Solution {
//     public int rob(int[] nums) {
//         if(nums.length==1) return nums[0];
//         int a=nums[0],b=Math.max(nums[0],nums[1]);
//         for(int i=2;i<nums.length;i++){int c=Math.max(b,a+nums[i]);a=b;b=c;}
//         return b;
//     }
// }`,
// `class Solution:
//     def rob(self, nums):
//         if len(nums)==1: return nums[0]
//         a,b=nums[0],max(nums[0],nums[1])
//         for n in nums[2:]: a,b=b,max(b,a+n)
//         return b`,
// 'O(n)','O(1)',['Amazon','TCS'],'https://leetcode.com/problems/house-robber/'),

// q('Word Break','Medium','Dynamic Programming',
// 'Given string s and dictionary, return true if s can be segmented into dictionary words.',
// [{input:'s="leetcode", wordDict=["leet","code"]',output:'true'}],
// 'dp[i] = true if s[0..i] can be segmented. Check all valid last words.',
// `class Solution {
//     public boolean wordBreak(String s, List<String> words) {
//         Set<String> set=new HashSet<>(words);
//         boolean[] dp=new boolean[s.length()+1]; dp[0]=true;
//         for(int i=1;i<=s.length();i++)
//             for(int j=0;j<i;j++)
//                 if(dp[j]&&set.contains(s.substring(j,i))){dp[i]=true;break;}
//         return dp[s.length()];
//     }
// }`,
// `class Solution:
//     def wordBreak(self, s, wordDict):
//         ws=set(wordDict); n=len(s); dp=[False]*(n+1); dp[0]=True
//         for i in range(1,n+1):
//             for j in range(i):
//                 if dp[j] and s[j:i] in ws: dp[i]=True;break
//         return dp[n]`,
// 'O(n²)','O(n)',['Amazon','Infosys'],'https://leetcode.com/problems/word-break/'),

// // ══════════════════════════════════════════
// // BINARY SEARCH — 10 questions
// // ══════════════════════════════════════════
// q('Binary Search','Easy','Binary Search',
// 'Search for target in sorted array. Return index or -1.',
// [{input:'nums=[-1,0,3,5,9,12], target=9',output:'4'}],
// 'Classic binary search. Compare mid with target, move left or right.',
// `class Solution {
//     public int search(int[] nums, int target) {
//         int l=0,r=nums.length-1;
//         while(l<=r){ int m=l+(r-l)/2; if(nums[m]==target) return m; else if(nums[m]<target) l=m+1; else r=m-1; }
//         return -1;
//     }
// }`,
// `class Solution:
//     def search(self, nums, target):
//         l,r=0,len(nums)-1
//         while l<=r:
//             m=(l+r)//2
//             if nums[m]==target: return m
//             elif nums[m]<target: l=m+1
//             else: r=m-1
//         return -1`,
// 'O(log n)','O(1)',['TCS','Infosys','Wipro','Accenture','HCL']),

// q('Search in Rotated Sorted Array','Medium','Binary Search',
// 'Search target in rotated sorted array. Return index or -1.',
// [{input:'nums=[4,5,6,7,0,1,2], target=0',output:'4'}],
// 'Modified binary search. Determine which half is sorted, check if target is in it.',
// `class Solution {
//     public int search(int[] a, int t) {
//         int l=0,r=a.length-1;
//         while(l<=r){ int m=l+(r-l)/2;
//             if(a[m]==t) return m;
//             if(a[l]<=a[m]){ if(a[l]<=t&&t<a[m]) r=m-1; else l=m+1; }
//             else{ if(a[m]<t&&t<=a[r]) l=m+1; else r=m-1; }
//         }
//         return -1;
//     }
// }`,
// `class Solution:
//     def search(self, nums, t):
//         l,r=0,len(nums)-1
//         while l<=r:
//             m=(l+r)//2
//             if nums[m]==t: return m
//             if nums[l]<=nums[m]:
//                 if nums[l]<=t<nums[m]: r=m-1
//                 else: l=m+1
//             else:
//                 if nums[m]<t<=nums[r]: l=m+1
//                 else: r=m-1
//         return -1`,
// 'O(log n)','O(1)',['Amazon','Flipkart'],'https://leetcode.com/problems/search-in-rotated-sorted-array/'),

// q('Find Peak Element','Medium','Binary Search',
// 'Find a peak element (greater than neighbors). Array may have multiple peaks.',
// [{input:'nums=[1,2,3,1]',output:'2'},{input:'nums=[1,2,1,3,5,6,4]',output:'5'}],
// 'Binary search. If nums[mid] < nums[mid+1], peak is on right. Else on left.',
// `class Solution {
//     public int findPeakElement(int[] nums) {
//         int l=0,r=nums.length-1;
//         while(l<r){ int m=l+(r-l)/2; if(nums[m]<nums[m+1]) l=m+1; else r=m; }
//         return l;
//     }
// }`,
// `class Solution:
//     def findPeakElement(self, nums):
//         l,r=0,len(nums)-1
//         while l<r:
//             m=(l+r)//2
//             if nums[m]<nums[m+1]: l=m+1
//             else: r=m
//         return l`,
// 'O(log n)','O(1)',['TCS NQT','Amazon']),

// // ══════════════════════════════════════════
// // GRAPHS — 12 questions
// // ══════════════════════════════════════════
// q('Number of Islands','Medium','Graphs',
// 'Count number of islands in 2D grid (1=land, 0=water).',
// [{input:'grid=[["1","1","0"],["1","1","0"],["0","0","1"]]',output:'2'}],
// 'DFS from each unvisited "1". Mark all connected land as visited. Count DFS calls.',
// `class Solution {
//     public int numIslands(char[][] g) {
//         int cnt=0;
//         for(int i=0;i<g.length;i++) for(int j=0;j<g[0].length;j++) if(g[i][j]=='1'){dfs(g,i,j);cnt++;}
//         return cnt;
//     }
//     void dfs(char[][] g,int i,int j){
//         if(i<0||i>=g.length||j<0||j>=g[0].length||g[i][j]!='1') return;
//         g[i][j]='0'; dfs(g,i+1,j);dfs(g,i-1,j);dfs(g,i,j+1);dfs(g,i,j-1);
//     }
// }`,
// `class Solution:
//     def numIslands(self, grid):
//         def dfs(i,j):
//             if i<0 or i>=len(grid) or j<0 or j>=len(grid[0]) or grid[i][j]!='1': return
//             grid[i][j]='0';dfs(i+1,j);dfs(i-1,j);dfs(i,j+1);dfs(i,j-1)
//         cnt=0
//         for i in range(len(grid)):
//             for j in range(len(grid[0])):
//                 if grid[i][j]=='1': dfs(i,j);cnt+=1
//         return cnt`,
// 'O(m·n)','O(m·n)',['Amazon','Zoho','Cognizant'],'https://leetcode.com/problems/number-of-islands/'),

// q('Course Schedule (Cycle Detection)','Medium','Graphs',
// 'Can you finish all courses given prerequisites? Detect cycle in directed graph.',
// [{input:'numCourses=2, prerequisites=[[1,0]]',output:'true'},{input:'prerequisites=[[1,0],[0,1]]',output:'false'}],
// 'Build adj list. DFS with 3 states: 0=unvisited, 1=visiting, 2=done. Cycle if visiting node again.',
// `class Solution {
//     public boolean canFinish(int n, int[][] pre) {
//         List<List<Integer>> adj=new ArrayList<>();
//         for(int i=0;i<n;i++) adj.add(new ArrayList<>());
//         for(int[] p:pre) adj.get(p[1]).add(p[0]);
//         int[] st=new int[n];
//         for(int i=0;i<n;i++) if(st[i]==0&&hasCycle(adj,st,i)) return false;
//         return true;
//     }
//     boolean hasCycle(List<List<Integer>> adj,int[] st,int v){
//         st[v]=1;
//         for(int nb:adj.get(v)){ if(st[nb]==1) return true; if(st[nb]==0&&hasCycle(adj,st,nb)) return true; }
//         st[v]=2; return false;
//     }
// }`,
// `class Solution:
//     def canFinish(self, n, pre):
//         adj=[[] for _ in range(n)]
//         for a,b in pre: adj[b].append(a)
//         st=[0]*n
//         def dfs(v):
//             if st[v]==1: return False
//             if st[v]==2: return True
//             st[v]=1
//             for nb in adj[v]:
//                 if not dfs(nb): return False
//             st[v]=2; return True
//         return all(dfs(i) for i in range(n))`,
// 'O(V+E)','O(V+E)',['Amazon','Infosys']),

// q('Clone Graph','Medium','Graphs',
// 'Clone (deep copy) an undirected graph.',
// [{input:'adjList=[[2,4],[1,3],[2,4],[1,3]]',output:'deep copy of graph'}],
// 'DFS/BFS. Use HashMap to map old node → new node. Recursively copy neighbors.',
// `class Solution {
//     Map<Node,Node> map=new HashMap<>();
//     public Node cloneGraph(Node n){
//         if(n==null) return null;
//         if(map.containsKey(n)) return map.get(n);
//         Node clone=new Node(n.val); map.put(n,clone);
//         for(Node nb:n.neighbors) clone.neighbors.add(cloneGraph(nb));
//         return clone;
//     }
// }`,
// `class Solution:
//     def cloneGraph(self, node):
//         if not node: return None
//         mp={}
//         def dfs(n):
//             if n in mp: return mp[n]
//             clone=Node(n.val); mp[n]=clone
//             for nb in n.neighbors: clone.neighbors.append(dfs(nb))
//             return clone
//         return dfs(node)`,
// 'O(V+E)','O(V)',['Amazon']),

// // ══════════════════════════════════════════
// // HASHING — 8 questions
// // ══════════════════════════════════════════
// q('Two Sum using Hashing','Easy','Hashing',
// 'Find first pair in array with sum equal to target using HashMap.',
// [{input:'arr=[8,7,2,5,3,1], target=10',output:'(8,2) or indices [0,2]'}],
// 'Store each element in HashMap with its index. For each element check if complement exists.',
// `class Solution {
//     public int[] twoSum(int[] a, int t) {
//         Map<Integer,Integer> map=new HashMap<>();
//         for(int i=0;i<a.length;i++){
//             if(map.containsKey(t-a[i])) return new int[]{map.get(t-a[i]),i};
//             map.put(a[i],i);
//         }
//         return new int[]{};
//     }
// }`,
// `def twoSum(arr, target):
//     seen={}
//     for i,n in enumerate(arr):
//         if target-n in seen: return [seen[target-n],i]
//         seen[n]=i`,
// 'O(n)','O(n)',['TCS','Infosys','Wipro','HCL','Cognizant']),

// q('Longest Consecutive Sequence','Medium','Hashing',
// 'Find length of longest consecutive elements sequence in unsorted array.',
// [{input:'nums=[100,4,200,1,3,2]',output:'4 (sequence: 1,2,3,4)'}],
// 'Put all in HashSet. For each number that is start of sequence (num-1 not in set), count consecutive.',
// `class Solution {
//     public int longestConsecutive(int[] nums) {
//         Set<Integer> set=new HashSet<>();
//         for(int n:nums) set.add(n);
//         int max=0;
//         for(int n:set) if(!set.contains(n-1)){
//             int cur=n,len=1;
//             while(set.contains(cur+1)){cur++;len++;}
//             max=Math.max(max,len);
//         }
//         return max;
//     }
// }`,
// `class Solution:
//     def longestConsecutive(self, nums):
//         s=set(nums); mx=0
//         for n in s:
//             if n-1 not in s:
//                 cur,ln=n,1
//                 while cur+1 in s: cur+=1;ln+=1
//                 mx=max(mx,ln)
//         return mx`,
// 'O(n)','O(n)',['Amazon','Flipkart'],'https://leetcode.com/problems/longest-consecutive-sequence/'),

// // ══════════════════════════════════════════
// // SORTING — 8 questions
// // ══════════════════════════════════════════
// q('Merge Sort Implementation','Medium','Sorting',
// 'Implement merge sort algorithm.',
// [{input:'arr=[38,27,43,3,9,82,10]',output:'[3,9,10,27,38,43,82]'}],
// 'Divide into halves, recursively sort, merge two sorted halves.',
// `class MergeSort {
//     public void sort(int[] arr, int l, int r) {
//         if(l>=r) return;
//         int m=l+(r-l)/2;
//         sort(arr,l,m); sort(arr,m+1,r); merge(arr,l,m,r);
//     }
//     void merge(int[] a, int l, int m, int r) {
//         int[] tmp=Arrays.copyOfRange(a,l,r+1);
//         int i=0,j=m-l+1,k=l;
//         while(i<=m-l&&j<=r-l) a[k++]=tmp[i]<=tmp[j]?tmp[i++]:tmp[j++];
//         while(i<=m-l) a[k++]=tmp[i++];
//         while(j<=r-l) a[k++]=tmp[j++];
//     }
// }`,
// `def merge_sort(arr):
//     if len(arr)<=1: return arr
//     mid=len(arr)//2
//     L=merge_sort(arr[:mid]); R=merge_sort(arr[mid:])
//     res=[]; i=j=0
//     while i<len(L) and j<len(R):
//         if L[i]<=R[j]: res.append(L[i]);i+=1
//         else: res.append(R[j]);j+=1
//     return res+L[i:]+R[j:]`,
// 'O(n log n)','O(n)',['TCS NQT','Infosys','Wipro','Accenture']),

// q('Quick Sort Implementation','Medium','Sorting',
// 'Implement quick sort using Lomuto partition scheme.',
// [{input:'arr=[10,7,8,9,1,5]',output:'[1,5,7,8,9,10]'}],
// 'Pick pivot (last element). Partition: elements less than pivot on left, greater on right. Recurse.',
// `class QuickSort {
//     public void sort(int[] a, int l, int r) {
//         if(l<r){ int p=partition(a,l,r); sort(a,l,p-1); sort(a,p+1,r); }
//     }
//     int partition(int[] a, int l, int r) {
//         int piv=a[r],i=l-1;
//         for(int j=l;j<r;j++) if(a[j]<=piv){i++;int t=a[i];a[i]=a[j];a[j]=t;}
//         int t=a[i+1];a[i+1]=a[r];a[r]=t;
//         return i+1;
//     }
// }`,
// `def quick_sort(arr,l,r):
//     if l<r:
//         def partition(a,l,r):
//             piv=a[r];i=l-1
//             for j in range(l,r):
//                 if a[j]<=piv: i+=1;a[i],a[j]=a[j],a[i]
//             a[i+1],a[r]=a[r],a[i+1];return i+1
//         p=partition(arr,l,r);quick_sort(arr,l,p-1);quick_sort(arr,p+1,r)`,
// 'O(n log n) avg, O(n²) worst','O(log n)',['TCS NQT','Infosys','Wipro']),

// // ══════════════════════════════════════════
// // GREEDY — 8 questions
// // ══════════════════════════════════════════
// q('Jump Game','Medium','Greedy',
// 'Given jump lengths at each position, can you reach the last index?',
// [{input:'nums=[2,3,1,1,4]',output:'true'},{input:'nums=[3,2,1,0,4]',output:'false'}],
// 'Track max reachable index. If current index > max reachable, return false.',
// `class Solution {
//     public boolean canJump(int[] nums) {
//         int max=0;
//         for(int i=0;i<nums.length;i++){
//             if(i>max) return false;
//             max=Math.max(max,i+nums[i]);
//         }
//         return true;
//     }
// }`,
// `class Solution:
//     def canJump(self, nums):
//         mx=0
//         for i,j in enumerate(nums):
//             if i>mx: return False
//             mx=max(mx,i+j)
//         return True`,
// 'O(n)','O(1)',['Amazon','TCS NQT'],'https://leetcode.com/problems/jump-game/'),

// q('Activity Selection Problem','Medium','Greedy',
// 'Select maximum number of activities that don\'t overlap, given start and end times.',
// [{input:'start=[1,3,0,5,8,5], end=[2,4,6,7,9,9]',output:'4'}],
// 'Sort by end time. Greedily pick activity if it starts after last selected ends.',
// `class Solution {
//     public int maxActivities(int[] s, int[] e) {
//         int n=s.length;
//         Integer[] idx=new Integer[n]; for(int i=0;i<n;i++) idx[i]=i;
//         Arrays.sort(idx,(a,b)->e[a]-e[b]);
//         int cnt=1, lastEnd=e[idx[0]];
//         for(int i=1;i<n;i++) if(s[idx[i]]>=lastEnd){cnt++;lastEnd=e[idx[i]];}
//         return cnt;
//     }
// }`,
// `def activity_selection(start, end):
//     acts=sorted(zip(end,start)); cnt=1; last=acts[0][0]
//     for e,s in acts[1:]:
//         if s>=last: cnt+=1;last=e
//     return cnt`,
// 'O(n log n)','O(1)',['TCS NQT','Infosys','Accenture']),

// // ══════════════════════════════════════════
// // RECURSION & BACKTRACKING — 10 questions
// // ══════════════════════════════════════════
// q('Subsets','Medium','Recursion',
// 'Return all possible subsets (power set) of array of unique integers.',
// [{input:'nums=[1,2,3]',output:'[[],[1],[2],[1,2],[3],[1,3],[2,3],[1,2,3]]'}],
// 'Backtracking: at each step include or exclude current element.',
// `class Solution {
//     public List<List<Integer>> subsets(int[] nums) {
//         List<List<Integer>> res=new ArrayList<>();
//         backtrack(nums,0,new ArrayList<>(),res);
//         return res;
//     }
//     void backtrack(int[] nums,int start,List<Integer> cur,List<List<Integer>> res){
//         res.add(new ArrayList<>(cur));
//         for(int i=start;i<nums.length;i++){cur.add(nums[i]);backtrack(nums,i+1,cur,res);cur.remove(cur.size()-1);}
//     }
// }`,
// `class Solution:
//     def subsets(self, nums):
//         res=[]
//         def bt(start,cur):
//             res.append(cur[:])
//             for i in range(start,len(nums)):
//                 cur.append(nums[i]);bt(i+1,cur);cur.pop()
//         bt(0,[]);return res`,
// 'O(2^n)','O(n)',['Amazon','Wipro']),

// q('Permutations','Medium','Recursion',
// 'Return all possible permutations of distinct integers.',
// [{input:'nums=[1,2,3]',output:'[[1,2,3],[1,3,2],[2,1,3],[2,3,1],[3,1,2],[3,2,1]]'}],
// 'Backtracking: swap current element with each element from index to end. Recurse.',
// `class Solution {
//     public List<List<Integer>> permute(int[] nums) {
//         List<List<Integer>> res=new ArrayList<>();
//         bt(nums,0,res); return res;
//     }
//     void bt(int[] nums,int start,List<List<Integer>> res){
//         if(start==nums.length){ List<Integer> l=new ArrayList<>(); for(int n:nums) l.add(n); res.add(l); return; }
//         for(int i=start;i<nums.length;i++){
//             int t=nums[start];nums[start]=nums[i];nums[i]=t;
//             bt(nums,start+1,res);
//             t=nums[start];nums[start]=nums[i];nums[i]=t;
//         }
//     }
// }`,
// `class Solution:
//     def permute(self, nums):
//         res=[]
//         def bt(start):
//             if start==len(nums): res.append(nums[:]);return
//             for i in range(start,len(nums)):
//                 nums[start],nums[i]=nums[i],nums[start];bt(start+1);nums[start],nums[i]=nums[i],nums[start]
//         bt(0);return res`,
// 'O(n·n!)','O(n)',['TCS NQT','Amazon','Infosys'])
// ];

// async function seed() {
//   await mongoose.connect(process.env.MONGO_URI);
//   console.log('✅ Connected');
//   await DSAQuestion.deleteMany({});
//   console.log('🗑️  Cleared DSA questions');
//   const ins = await DSAQuestion.insertMany(questions);
//   console.log(`✅ Inserted ${ins.length} DSA questions!`);
//   process.exit(0);
// }
// seed().catch(e=>{console.error('❌',e.message);process.exit(1);});

require('dotenv').config();
const mongoose = require('mongoose');
const DSAQuestion = require('./models/DSAQuestion');
const arrays = require('./home/claude/dsa/part1_arrays');
const strings = require('./home/claude/dsa/part2_strings');
const stacks = require('./home/claude/dsa/part3_stacks');
const rest = require('./home/claude/dsa/part4_linkedlist_dp_graphs');

const all = [...arrays,...strings,...stacks,...rest];

async function seed(){
  await mongoose.connect(process.env.MONGO_URI);
  console.log('✅ MongoDB connected');
  await DSAQuestion.deleteMany({});
  console.log('🗑️  Cleared existing questions');
  const inserted = await DSAQuestion.insertMany(all);
  console.log(`✅ Inserted ${inserted.length} DSA questions!`);
  process.exit(0);
}
seed().catch(e=>{console.error('❌',e.message);process.exit(1);});
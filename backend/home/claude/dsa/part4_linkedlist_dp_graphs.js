const rest = [
// LINKED LIST — 15
{title:'Reverse Linked List',difficulty:'Easy',topic:'LinkedList',description:'Reverse a singly linked list.',examples:[{input:'head=[1,2,3,4,5]',output:'[5,4,3,2,1]'}],approach:'Iterative: prev, curr, next pointers.',java_code:`class Solution {
    public ListNode reverseList(ListNode head) {
        ListNode prev=null,curr=head;
        while(curr!=null){ListNode nxt=curr.next;curr.next=prev;prev=curr;curr=nxt;}
        return prev;
    }
}`,python_code:`class Solution:
    def reverseList(self,head):
        prev,curr=None,head
        while curr: curr.next,prev,curr=prev,curr,curr.next
        return prev`,timeComplex:'O(n)',spaceComplex:'O(1)',companies:['TCS','Amazon','Infosys','Microsoft'],leetcodeUrl:'https://leetcode.com/problems/reverse-linked-list/'},

{title:'Detect Cycle in Linked List',difficulty:'Easy',topic:'LinkedList',description:'Determine if linked list has a cycle.',examples:[{input:'head=[3,2,0,-4],pos=1',output:'true'}],approach:'Floyd\'s slow/fast pointers. They meet if cycle exists.',java_code:`class Solution {
    public boolean hasCycle(ListNode head) {
        ListNode s=head,f=head;
        while(f!=null&&f.next!=null){s=s.next;f=f.next.next;if(s==f)return true;}
        return false;
    }
}`,python_code:`class Solution:
    def hasCycle(self,head):
        s=f=head
        while f and f.next:
            s=s.next;f=f.next.next
            if s==f: return True
        return False`,timeComplex:'O(n)',spaceComplex:'O(1)',companies:['TCS','Amazon'],leetcodeUrl:'https://leetcode.com/problems/linked-list-cycle/'},

{title:'Merge Two Sorted Lists',difficulty:'Easy',topic:'LinkedList',description:'Merge two sorted linked lists into one sorted list.',examples:[{input:'l1=[1,2,4],l2=[1,3,4]',output:'[1,1,2,3,4,4]'}],approach:'Dummy head. Iteratively pick smaller node.',java_code:`class Solution {
    public ListNode mergeTwoLists(ListNode l1,ListNode l2){
        ListNode d=new ListNode(0),c=d;
        while(l1!=null&&l2!=null){if(l1.val<=l2.val){c.next=l1;l1=l1.next;}else{c.next=l2;l2=l2.next;}c=c.next;}
        c.next=l1!=null?l1:l2;return d.next;
    }
}`,python_code:`class Solution:
    def mergeTwoLists(self,l1,l2):
        d=c=ListNode(0)
        while l1 and l2:
            if l1.val<=l2.val: c.next=l1;l1=l1.next
            else: c.next=l2;l2=l2.next
            c=c.next
        c.next=l1 or l2;return d.next`,timeComplex:'O(n+m)',spaceComplex:'O(1)',companies:['Amazon','Zoho'],leetcodeUrl:'https://leetcode.com/problems/merge-two-sorted-lists/'},

{title:'Middle of Linked List',difficulty:'Easy',topic:'LinkedList',description:'Return middle node (second middle if even length).',examples:[{input:'head=[1,2,3,4,5]',output:'[3,4,5]'},{input:'head=[1,2,3,4,5,6]',output:'[4,5,6]'}],approach:'Slow/fast pointers. Slow is at middle when fast reaches end.',java_code:`class Solution {
    public ListNode middleNode(ListNode head){
        ListNode s=head,f=head;
        while(f!=null&&f.next!=null){s=s.next;f=f.next.next;}
        return s;
    }
}`,python_code:`class Solution:
    def middleNode(self,head):
        s=f=head
        while f and f.next: s=s.next;f=f.next.next
        return s`,timeComplex:'O(n)',spaceComplex:'O(1)',companies:['TCS','Infosys','Wipro','HCL'],leetcodeUrl:'https://leetcode.com/problems/middle-of-the-linked-list/'},

{title:'Remove Nth Node From End',difficulty:'Medium',topic:'LinkedList',description:'Remove nth node from end of list.',examples:[{input:'head=[1,2,3,4,5],n=2',output:'[1,2,3,5]'}],approach:'Two pointers with n gap. When fast reaches end, slow is at target.',java_code:`class Solution {
    public ListNode removeNthFromEnd(ListNode head,int n){
        ListNode d=new ListNode(0);d.next=head;ListNode f=d,s=d;
        for(int i=0;i<=n;i++)f=f.next;
        while(f!=null){s=s.next;f=f.next;}
        s.next=s.next.next;return d.next;
    }
}`,python_code:`class Solution:
    def removeNthFromEnd(self,head,n):
        d=ListNode(0);d.next=head;f=s=d
        for _ in range(n+1): f=f.next
        while f: s=s.next;f=f.next
        s.next=s.next.next;return d.next`,timeComplex:'O(n)',spaceComplex:'O(1)',companies:['Amazon','TCS'],leetcodeUrl:'https://leetcode.com/problems/remove-nth-node-from-end-of-list/'},

{title:'Add Two Numbers',difficulty:'Medium',topic:'LinkedList',description:'Add two numbers represented as reversed linked lists.',examples:[{input:'l1=[2,4,3],l2=[5,6,4]',output:'[7,0,8]'}],approach:'Traverse both with carry. Create new nodes.',java_code:`class Solution {
    public ListNode addTwoNumbers(ListNode l1,ListNode l2){
        ListNode d=new ListNode(0),c=d;int carry=0;
        while(l1!=null||l2!=null||carry!=0){
            int s=(l1!=null?l1.val:0)+(l2!=null?l2.val:0)+carry;
            carry=s/10;c.next=new ListNode(s%10);c=c.next;
            if(l1!=null)l1=l1.next;if(l2!=null)l2=l2.next;
        }
        return d.next;
    }
}`,python_code:`class Solution:
    def addTwoNumbers(self,l1,l2):
        d=c=ListNode(0);carry=0
        while l1 or l2 or carry:
            s=(l1.val if l1 else 0)+(l2.val if l2 else 0)+carry
            carry,s=divmod(s,10);c.next=ListNode(s);c=c.next
            if l1:l1=l1.next
            if l2:l2=l2.next
        return d.next`,timeComplex:'O(max(m,n))',spaceComplex:'O(max(m,n))',companies:['Amazon','Infosys'],leetcodeUrl:'https://leetcode.com/problems/add-two-numbers/'},

{title:'Palindrome Linked List',difficulty:'Easy',topic:'LinkedList',description:'Check if linked list is a palindrome.',examples:[{input:'head=[1,2,2,1]',output:'true'}],approach:'Find middle, reverse second half, compare both.',java_code:`class Solution {
    public boolean isPalindrome(ListNode head){
        ListNode s=head,f=head;
        while(f!=null&&f.next!=null){s=s.next;f=f.next.next;}
        ListNode prev=null,curr=s;
        while(curr!=null){ListNode t=curr.next;curr.next=prev;prev=curr;curr=t;}
        ListNode l=head,r=prev;
        while(r!=null){if(l.val!=r.val)return false;l=l.next;r=r.next;}
        return true;
    }
}`,python_code:`class Solution:
    def isPalindrome(self,head):
        vals=[]
        while head: vals.append(head.val);head=head.next
        return vals==vals[::-1]`,timeComplex:'O(n)',spaceComplex:'O(1)',companies:['Amazon','TCS','Infosys'],leetcodeUrl:'https://leetcode.com/problems/palindrome-linked-list/'},

{title:'Intersection of Two Linked Lists',difficulty:'Easy',topic:'LinkedList',description:'Find node where two linked lists intersect.',examples:[{input:'A=[4,1,8,4,5],B=[5,6,1,8,4,5]',output:'node val 8'}],approach:'Two pointers redirect to other list head when reaching end.',java_code:`class Solution {
    public ListNode getIntersectionNode(ListNode a,ListNode b){
        ListNode pa=a,pb=b;
        while(pa!=pb){pa=pa==null?b:pa.next;pb=pb==null?a:pb.next;}
        return pa;
    }
}`,python_code:`class Solution:
    def getIntersectionNode(self,a,b):
        pa,pb=a,b
        while pa!=pb:
            pa=b if pa is None else pa.next
            pb=a if pb is None else pb.next
        return pa`,timeComplex:'O(m+n)',spaceComplex:'O(1)',companies:['Amazon','TCS'],leetcodeUrl:'https://leetcode.com/problems/intersection-of-two-linked-lists/'},

{title:'Reorder List',difficulty:'Medium',topic:'LinkedList',description:'Reorder L0→L1→...→Ln to L0→Ln→L1→Ln-1→...',examples:[{input:'head=[1,2,3,4]',output:'[1,4,2,3]'}],approach:'Find middle, reverse second half, merge alternately.',java_code:`class Solution {
    public void reorderList(ListNode head){
        ListNode s=head,f=head;
        while(f.next!=null&&f.next.next!=null){s=s.next;f=f.next.next;}
        ListNode second=s.next;s.next=null;
        ListNode prev=null,curr=second;
        while(curr!=null){ListNode t=curr.next;curr.next=prev;prev=curr;curr=t;}
        second=prev;ListNode first=head;
        while(second!=null){ListNode fn=first.next,sn=second.next;first.next=second;second.next=fn;first=fn;second=sn;}
    }
}`,python_code:`class Solution:
    def reorderList(self,head):
        s=f=head
        while f.next and f.next.next: s=s.next;f=f.next.next
        second=s.next;s.next=None
        prev=None;curr=second
        while curr: curr.next,prev,curr=prev,curr,curr.next
        second=prev;first=head
        while second:
            fn,sn=first.next,second.next
            first.next=second;second.next=fn
            first=fn;second=sn`,timeComplex:'O(n)',spaceComplex:'O(1)',companies:['Amazon'],leetcodeUrl:'https://leetcode.com/problems/reorder-list/'},

{title:'Merge K Sorted Lists',difficulty:'Hard',topic:'LinkedList',description:'Merge k sorted linked lists into one sorted list.',examples:[{input:'lists=[[1,4,5],[1,3,4],[2,6]]',output:'[1,1,2,3,4,4,5,6]'}],approach:'Min-heap. Push first node of each list. Poll min, push next.',java_code:`class Solution {
    public ListNode mergeKLists(ListNode[] lists){
        PriorityQueue<ListNode> pq=new PriorityQueue<>((a,b)->a.val-b.val);
        for(ListNode l:lists)if(l!=null)pq.offer(l);
        ListNode d=new ListNode(0),c=d;
        while(!pq.isEmpty()){c.next=pq.poll();c=c.next;if(c.next!=null)pq.offer(c.next);}
        return d.next;
    }
}`,python_code:`class Solution:
    def mergeKLists(self,lists):
        import heapq
        heap=[];d=c=ListNode(0)
        for i,l in enumerate(lists):
            if l: heapq.heappush(heap,(l.val,i,l))
        while heap:
            v,i,node=heapq.heappop(heap)
            c.next=node;c=c.next
            if node.next: heapq.heappush(heap,(node.next.val,i,node.next))
        return d.next`,timeComplex:'O(n log k)',spaceComplex:'O(k)',companies:['Amazon','Flipkart'],leetcodeUrl:'https://leetcode.com/problems/merge-k-sorted-lists/'},

{title:'Sort List',difficulty:'Medium',topic:'LinkedList',description:'Sort linked list in O(n log n) time and O(1) space.',examples:[{input:'head=[4,2,1,3]',output:'[1,2,3,4]'}],approach:'Merge sort on linked list.',java_code:`class Solution {
    public ListNode sortList(ListNode head){
        if(head==null||head.next==null)return head;
        ListNode s=head,f=head.next;
        while(f!=null&&f.next!=null){s=s.next;f=f.next.next;}
        ListNode mid=s.next;s.next=null;
        return merge(sortList(head),sortList(mid));
    }
    ListNode merge(ListNode l1,ListNode l2){
        ListNode d=new ListNode(0),c=d;
        while(l1!=null&&l2!=null){if(l1.val<=l2.val){c.next=l1;l1=l1.next;}else{c.next=l2;l2=l2.next;}c=c.next;}
        c.next=l1!=null?l1:l2;return d.next;
    }
}`,python_code:`class Solution:
    def sortList(self,head):
        if not head or not head.next: return head
        s=head;f=head.next
        while f and f.next: s=s.next;f=f.next.next
        mid=s.next;s.next=None
        def merge(l1,l2):
            d=c=ListNode(0)
            while l1 and l2:
                if l1.val<=l2.val: c.next=l1;l1=l1.next
                else: c.next=l2;l2=l2.next
                c=c.next
            c.next=l1 or l2;return d.next
        return merge(self.sortList(head),self.sortList(mid))`,timeComplex:'O(n log n)',spaceComplex:'O(log n)',companies:['Amazon'],leetcodeUrl:'https://leetcode.com/problems/sort-list/'},

{title:'Remove Duplicates from Sorted List',difficulty:'Easy',topic:'LinkedList',description:'Remove duplicates keeping one occurrence.',examples:[{input:'head=[1,1,2,3,3]',output:'[1,2,3]'}],approach:'If current.val == next.val, skip next.',java_code:`class Solution {
    public ListNode deleteDuplicates(ListNode head){
        ListNode curr=head;
        while(curr!=null&&curr.next!=null){
            if(curr.val==curr.next.val)curr.next=curr.next.next;
            else curr=curr.next;
        }
        return head;
    }
}`,python_code:`class Solution:
    def deleteDuplicates(self,head):
        curr=head
        while curr and curr.next:
            if curr.val==curr.next.val: curr.next=curr.next.next
            else: curr=curr.next
        return head`,timeComplex:'O(n)',spaceComplex:'O(1)',companies:['TCS','Infosys','Wipro'],leetcodeUrl:'https://leetcode.com/problems/remove-duplicates-from-sorted-list/'},

{title:'Swap Nodes in Pairs',difficulty:'Medium',topic:'LinkedList',description:'Swap every two adjacent nodes.',examples:[{input:'head=[1,2,3,4]',output:'[2,1,4,3]'}],approach:'Recursion: swap pair, recurse for rest.',java_code:`class Solution {
    public ListNode swapPairs(ListNode head){
        if(head==null||head.next==null)return head;
        ListNode second=head.next;head.next=swapPairs(second.next);second.next=head;return second;
    }
}`,python_code:`class Solution:
    def swapPairs(self,head):
        if not head or not head.next: return head
        second=head.next
        head.next=self.swapPairs(second.next)
        second.next=head;return second`,timeComplex:'O(n)',spaceComplex:'O(n)',companies:['Amazon'],leetcodeUrl:'https://leetcode.com/problems/swap-nodes-in-pairs/'},

{title:'Reverse Nodes in k-Group',difficulty:'Hard',topic:'LinkedList',description:'Reverse nodes in k-sized groups.',examples:[{input:'head=[1,2,3,4,5],k=2',output:'[2,1,4,3,5]'}],approach:'Check k nodes exist. Reverse k. Recurse for rest.',java_code:`class Solution {
    public ListNode reverseKGroup(ListNode head,int k){
        ListNode curr=head;int count=0;
        while(curr!=null&&count<k){curr=curr.next;count++;}
        if(count<k)return head;
        ListNode prev=null;curr=head;
        for(int i=0;i<k;i++){ListNode t=curr.next;curr.next=prev;prev=curr;curr=t;}
        head.next=reverseKGroup(curr,k);return prev;
    }
}`,python_code:`class Solution:
    def reverseKGroup(self,head,k):
        curr=head;count=0
        while curr and count<k: curr=curr.next;count+=1
        if count<k: return head
        prev=None;curr=head
        for _ in range(k): curr.next,prev,curr=prev,curr,curr.next
        head.next=self.reverseKGroup(curr,k);return prev`,timeComplex:'O(n)',spaceComplex:'O(n/k)',companies:['Amazon','Flipkart'],leetcodeUrl:'https://leetcode.com/problems/reverse-nodes-in-k-group/'},

// DP — 20
{title:'Climbing Stairs',difficulty:'Easy',topic:'Dynamic Programming',description:'Climb 1 or 2 steps. How many ways to reach n stairs?',examples:[{input:'n=2',output:'2'},{input:'n=3',output:'3'}],approach:'Fibonacci: dp[i] = dp[i-1] + dp[i-2].',java_code:`class Solution {
    public int climbStairs(int n){
        if(n<=2)return n;int a=1,b=2;
        for(int i=3;i<=n;i++){int c=a+b;a=b;b=c;}return b;
    }
}`,python_code:`class Solution:
    def climbStairs(self,n):
        a,b=1,1
        for _ in range(n-1): a,b=b,a+b
        return b`,timeComplex:'O(n)',spaceComplex:'O(1)',companies:['TCS','Infosys','Wipro','Amazon'],leetcodeUrl:'https://leetcode.com/problems/climbing-stairs/'},

{title:'Coin Change',difficulty:'Medium',topic:'Dynamic Programming',description:'Fewest coins to make amount. -1 if impossible.',examples:[{input:'coins=[1,5,6,9],amount=11',output:'2'},{input:'coins=[2],amount=3',output:'-1'}],approach:'Bottom-up DP. dp[i] = min coins for amount i.',java_code:`class Solution {
    public int coinChange(int[] coins,int amount){
        int[] dp=new int[amount+1];Arrays.fill(dp,amount+1);dp[0]=0;
        for(int i=1;i<=amount;i++)for(int c:coins)if(c<=i)dp[i]=Math.min(dp[i],dp[i-c]+1);
        return dp[amount]>amount?-1:dp[amount];
    }
}`,python_code:`class Solution:
    def coinChange(self,coins,amount):
        dp=[float('inf')]*(amount+1);dp[0]=0
        for i in range(1,amount+1):
            for c in coins:
                if c<=i: dp[i]=min(dp[i],dp[i-c]+1)
        return dp[amount] if dp[amount]!=float('inf') else -1`,timeComplex:'O(n*amount)',spaceComplex:'O(amount)',companies:['Amazon','TCS NQT'],leetcodeUrl:'https://leetcode.com/problems/coin-change/'},

{title:'Longest Common Subsequence',difficulty:'Medium',topic:'Dynamic Programming',description:'Length of longest common subsequence.',examples:[{input:'text1="abcde",text2="ace"',output:'3'}],approach:'dp[i][j]: if chars match +1 else max of adjacent.',java_code:`class Solution {
    public int longestCommonSubsequence(String a,String b){
        int m=a.length(),n=b.length();int[][] dp=new int[m+1][n+1];
        for(int i=1;i<=m;i++)for(int j=1;j<=n;j++)
            dp[i][j]=a.charAt(i-1)==b.charAt(j-1)?dp[i-1][j-1]+1:Math.max(dp[i-1][j],dp[i][j-1]);
        return dp[m][n];
    }
}`,python_code:`class Solution:
    def longestCommonSubsequence(self,a,b):
        m,n=len(a),len(b);dp=[[0]*(n+1) for _ in range(m+1)]
        for i in range(1,m+1):
            for j in range(1,n+1):
                dp[i][j]=dp[i-1][j-1]+1 if a[i-1]==b[j-1] else max(dp[i-1][j],dp[i][j-1])
        return dp[m][n]`,timeComplex:'O(m*n)',spaceComplex:'O(m*n)',companies:['Amazon','TCS','Infosys'],leetcodeUrl:'https://leetcode.com/problems/longest-common-subsequence/'},

{title:'0/1 Knapsack',difficulty:'Medium',topic:'Dynamic Programming',description:'Max value in knapsack without exceeding weight W.',examples:[{input:'weights=[1,3,4,5],values=[1,4,5,7],W=7',output:'9'}],approach:'dp[i][w]: max value using first i items with capacity w.',java_code:`class Solution {
    public int knapsack(int[] wt,int[] val,int W){
        int n=wt.length;int[][] dp=new int[n+1][W+1];
        for(int i=1;i<=n;i++)for(int w=0;w<=W;w++){
            dp[i][w]=dp[i-1][w];
            if(wt[i-1]<=w)dp[i][w]=Math.max(dp[i][w],dp[i-1][w-wt[i-1]]+val[i-1]);
        }
        return dp[n][W];
    }
}`,python_code:`def knapsack(wt,val,W):
    n=len(wt);dp=[[0]*(W+1) for _ in range(n+1)]
    for i in range(1,n+1):
        for w in range(W+1):
            dp[i][w]=dp[i-1][w]
            if wt[i-1]<=w: dp[i][w]=max(dp[i][w],dp[i-1][w-wt[i-1]]+val[i-1])
    return dp[n][W]`,timeComplex:'O(n*W)',spaceComplex:'O(n*W)',companies:['TCS NQT','Amazon','Infosys']},

{title:'Longest Increasing Subsequence',difficulty:'Medium',topic:'Dynamic Programming',description:'Length of longest strictly increasing subsequence.',examples:[{input:'nums=[10,9,2,5,3,7,101,18]',output:'4'}],approach:'dp[i] = LIS ending at i. Check all j < i with nums[j] < nums[i].',java_code:`class Solution {
    public int lengthOfLIS(int[] nums){
        int n=nums.length,max=1;int[] dp=new int[n];Arrays.fill(dp,1);
        for(int i=1;i<n;i++)for(int j=0;j<i;j++)
            if(nums[j]<nums[i]){dp[i]=Math.max(dp[i],dp[j]+1);max=Math.max(max,dp[i]);}
        return max;
    }
}`,python_code:`class Solution:
    def lengthOfLIS(self,nums):
        dp=[1]*len(nums)
        for i in range(1,len(nums)):
            for j in range(i):
                if nums[j]<nums[i]: dp[i]=max(dp[i],dp[j]+1)
        return max(dp)`,timeComplex:'O(n²)',spaceComplex:'O(n)',companies:['Amazon','Zoho','TCS NQT'],leetcodeUrl:'https://leetcode.com/problems/longest-increasing-subsequence/'},

{title:'House Robber',difficulty:'Medium',topic:'Dynamic Programming',description:'Cannot rob adjacent houses. Maximize total.',examples:[{input:'nums=[2,7,9,3,1]',output:'12'}],approach:'dp[i] = max(dp[i-1], dp[i-2]+nums[i]).',java_code:`class Solution {
    public int rob(int[] nums){
        if(nums.length==1)return nums[0];int a=nums[0],b=Math.max(nums[0],nums[1]);
        for(int i=2;i<nums.length;i++){int c=Math.max(b,a+nums[i]);a=b;b=c;}
        return b;
    }
}`,python_code:`class Solution:
    def rob(self,nums):
        if len(nums)==1: return nums[0]
        a,b=nums[0],max(nums[0],nums[1])
        for n in nums[2:]: a,b=b,max(b,a+n)
        return b`,timeComplex:'O(n)',spaceComplex:'O(1)',companies:['Amazon','TCS'],leetcodeUrl:'https://leetcode.com/problems/house-robber/'},

{title:'Unique Paths',difficulty:'Medium',topic:'Dynamic Programming',description:'Count paths from top-left to bottom-right (only right/down).',examples:[{input:'m=3,n=7',output:'28'}],approach:'dp[j] += dp[j-1]. 1D space optimization.',java_code:`class Solution {
    public int uniquePaths(int m,int n){
        int[] dp=new int[n];Arrays.fill(dp,1);
        for(int i=1;i<m;i++)for(int j=1;j<n;j++)dp[j]+=dp[j-1];
        return dp[n-1];
    }
}`,python_code:`class Solution:
    def uniquePaths(self,m,n):
        dp=[1]*n
        for i in range(1,m):
            for j in range(1,n): dp[j]+=dp[j-1]
        return dp[-1]`,timeComplex:'O(m*n)',spaceComplex:'O(n)',companies:['TCS','Amazon'],leetcodeUrl:'https://leetcode.com/problems/unique-paths/'},

{title:'Word Break',difficulty:'Medium',topic:'Dynamic Programming',description:'Return true if s can be segmented into dictionary words.',examples:[{input:'s="leetcode",wordDict=["leet","code"]',output:'true'}],approach:'dp[i] = true if s[0..i-1] segmentable. Check all last words.',java_code:`class Solution {
    public boolean wordBreak(String s,List<String> words){
        Set<String> set=new HashSet<>(words);boolean[] dp=new boolean[s.length()+1];dp[0]=true;
        for(int i=1;i<=s.length();i++)for(int j=0;j<i;j++)
            if(dp[j]&&set.contains(s.substring(j,i))){dp[i]=true;break;}
        return dp[s.length()];
    }
}`,python_code:`class Solution:
    def wordBreak(self,s,wordDict):
        ws=set(wordDict);n=len(s);dp=[False]*(n+1);dp[0]=True
        for i in range(1,n+1):
            for j in range(i):
                if dp[j] and s[j:i] in ws: dp[i]=True;break
        return dp[n]`,timeComplex:'O(n²)',spaceComplex:'O(n)',companies:['Amazon','Infosys'],leetcodeUrl:'https://leetcode.com/problems/word-break/'},

{title:'Partition Equal Subset Sum',difficulty:'Medium',topic:'Dynamic Programming',description:'Can array be split into two equal-sum subsets?',examples:[{input:'nums=[1,5,11,5]',output:'true'}],approach:'Target = sum/2. Subset sum DP.',java_code:`class Solution {
    public boolean canPartition(int[] nums){
        int sum=0;for(int n:nums)sum+=n;if(sum%2!=0)return false;
        int t=sum/2;boolean[] dp=new boolean[t+1];dp[0]=true;
        for(int n:nums)for(int j=t;j>=n;j--)dp[j]=dp[j]||dp[j-n];
        return dp[t];
    }
}`,python_code:`class Solution:
    def canPartition(self,nums):
        s=sum(nums)
        if s%2: return False
        t=s//2;dp=[False]*(t+1);dp[0]=True
        for n in nums:
            for j in range(t,n-1,-1): dp[j]=dp[j] or dp[j-n]
        return dp[t]`,timeComplex:'O(n*sum)',spaceComplex:'O(sum)',companies:['Amazon'],leetcodeUrl:'https://leetcode.com/problems/partition-equal-subset-sum/'},

{title:'Minimum Path Sum',difficulty:'Medium',topic:'Dynamic Programming',description:'Find path with minimum sum from top-left to bottom-right.',examples:[{input:'grid=[[1,3,1],[1,5,1],[4,2,1]]',output:'7'}],approach:'dp[i][j] += min(above, left).',java_code:`class Solution {
    public int minPathSum(int[][] g){
        int m=g.length,n=g[0].length;
        for(int i=0;i<m;i++)for(int j=0;j<n;j++){
            if(i==0&&j==0)continue;
            else if(i==0)g[i][j]+=g[i][j-1];
            else if(j==0)g[i][j]+=g[i-1][j];
            else g[i][j]+=Math.min(g[i-1][j],g[i][j-1]);
        }
        return g[m-1][n-1];
    }
}`,python_code:`class Solution:
    def minPathSum(self,grid):
        m,n=len(grid),len(grid[0])
        for i in range(m):
            for j in range(n):
                if i==j==0: continue
                elif i==0: grid[i][j]+=grid[i][j-1]
                elif j==0: grid[i][j]+=grid[i-1][j]
                else: grid[i][j]+=min(grid[i-1][j],grid[i][j-1])
        return grid[-1][-1]`,timeComplex:'O(m*n)',spaceComplex:'O(1)',companies:['Amazon','TCS'],leetcodeUrl:'https://leetcode.com/problems/minimum-path-sum/'},

{title:'Edit Distance',difficulty:'Hard',topic:'Dynamic Programming',description:'Minimum operations to convert word1 to word2.',examples:[{input:'word1="horse",word2="ros"',output:'3'}],approach:'dp[i][j] = min ops for word1[0..i] to word2[0..j].',java_code:`class Solution {
    public int minDistance(String a,String b){
        int m=a.length(),n=b.length();int[][] dp=new int[m+1][n+1];
        for(int i=0;i<=m;i++)dp[i][0]=i;for(int j=0;j<=n;j++)dp[0][j]=j;
        for(int i=1;i<=m;i++)for(int j=1;j<=n;j++)
            dp[i][j]=a.charAt(i-1)==b.charAt(j-1)?dp[i-1][j-1]:1+Math.min(dp[i-1][j-1],Math.min(dp[i-1][j],dp[i][j-1]));
        return dp[m][n];
    }
}`,python_code:`class Solution:
    def minDistance(self,a,b):
        m,n=len(a),len(b);dp=[[0]*(n+1) for _ in range(m+1)]
        for i in range(m+1): dp[i][0]=i
        for j in range(n+1): dp[0][j]=j
        for i in range(1,m+1):
            for j in range(1,n+1):
                dp[i][j]=dp[i-1][j-1] if a[i-1]==b[j-1] else 1+min(dp[i-1][j-1],dp[i-1][j],dp[i][j-1])
        return dp[m][n]`,timeComplex:'O(m*n)',spaceComplex:'O(m*n)',companies:['Amazon'],leetcodeUrl:'https://leetcode.com/problems/edit-distance/'},

{title:'Coin Change II',difficulty:'Medium',topic:'Dynamic Programming',description:'Count combinations to make amount.',examples:[{input:'amount=5,coins=[1,2,5]',output:'4'}],approach:'dp[j] += dp[j-coin]. Outer loop coins, inner loop amounts.',java_code:`class Solution {
    public int change(int amount,int[] coins){
        int[] dp=new int[amount+1];dp[0]=1;
        for(int c:coins)for(int j=c;j<=amount;j++)dp[j]+=dp[j-c];
        return dp[amount];
    }
}`,python_code:`class Solution:
    def change(self,amount,coins):
        dp=[0]*(amount+1);dp[0]=1
        for c in coins:
            for j in range(c,amount+1): dp[j]+=dp[j-c]
        return dp[amount]`,timeComplex:'O(n*amount)',spaceComplex:'O(amount)',companies:['Amazon','TCS'],leetcodeUrl:'https://leetcode.com/problems/coin-change-ii/'},

{title:'Matrix Chain Multiplication',difficulty:'Hard',topic:'Dynamic Programming',description:'Find minimum multiplications for chain of matrices.',examples:[{input:'dims=[10,30,5,60]',output:'27000'}],approach:'dp[i][j] = min cost for matrices i to j. Try all splits k.',java_code:`class Solution {
    public int matrixChain(int[] p){
        int n=p.length-1;int[][] dp=new int[n][n];
        for(int len=2;len<=n;len++)for(int i=0;i<=n-len;i++){
            int j=i+len-1;dp[i][j]=Integer.MAX_VALUE;
            for(int k=i;k<j;k++)dp[i][j]=Math.min(dp[i][j],dp[i][k]+dp[k+1][j]+p[i]*p[k+1]*p[j+1]);
        }
        return dp[0][n-1];
    }
}`,python_code:`def matrixChain(p):
    n=len(p)-1;dp=[[0]*n for _ in range(n)]
    for length in range(2,n+1):
        for i in range(n-length+1):
            j=i+length-1;dp[i][j]=float('inf')
            for k in range(i,j): dp[i][j]=min(dp[i][j],dp[i][k]+dp[k+1][j]+p[i]*p[k+1]*p[j+1])
    return dp[0][n-1]`,timeComplex:'O(n³)',spaceComplex:'O(n²)',companies:['TCS NQT','Infosys']},

{title:'Longest Palindromic Subsequence',difficulty:'Medium',topic:'Dynamic Programming',description:'Length of longest palindromic subsequence.',examples:[{input:'s="bbbab"',output:'4'}],approach:'dp[i][j]: if s[i]==s[j] then +2, else max of adjacent.',java_code:`class Solution {
    public int longestPalindromeSubseq(String s){
        int n=s.length();int[][] dp=new int[n][n];for(int i=0;i<n;i++)dp[i][i]=1;
        for(int len=2;len<=n;len++)for(int i=0;i<=n-len;i++){
            int j=i+len-1;dp[i][j]=s.charAt(i)==s.charAt(j)?dp[i+1][j-1]+2:Math.max(dp[i+1][j],dp[i][j-1]);
        }
        return dp[0][n-1];
    }
}`,python_code:`class Solution:
    def longestPalindromeSubseq(self,s):
        n=len(s);dp=[[0]*n for _ in range(n)]
        for i in range(n): dp[i][i]=1
        for length in range(2,n+1):
            for i in range(n-length+1):
                j=i+length-1
                dp[i][j]=dp[i+1][j-1]+2 if s[i]==s[j] else max(dp[i+1][j],dp[i][j-1])
        return dp[0][n-1]`,timeComplex:'O(n²)',spaceComplex:'O(n²)',companies:['Amazon'],leetcodeUrl:'https://leetcode.com/problems/longest-palindromic-subsequence/'},

{title:'House Robber II (Circular)',difficulty:'Medium',topic:'Dynamic Programming',description:'Houses in circle, cannot rob adjacent. Maximize total.',examples:[{input:'nums=[2,3,2]',output:'3'},{input:'nums=[1,2,3,1]',output:'4'}],approach:'Run House Robber twice: [0..n-2] and [1..n-1]. Take max.',java_code:`class Solution {
    public int rob(int[] nums){
        if(nums.length==1)return nums[0];
        return Math.max(rob(nums,0,nums.length-2),rob(nums,1,nums.length-1));
    }
    int rob(int[] nums,int l,int r){
        int a=0,b=0;
        for(int i=l;i<=r;i++){int c=Math.max(b,a+nums[i]);a=b;b=c;}
        return b;
    }
}`,python_code:`class Solution:
    def rob(self,nums):
        if len(nums)==1: return nums[0]
        def rob1(a,b):
            prev=curr=0
            for n in nums[a:b]: prev,curr=curr,max(curr,prev+n)
            return curr
        return max(rob1(0,len(nums)-1),rob1(1,len(nums)))`,timeComplex:'O(n)',spaceComplex:'O(1)',companies:['Amazon'],leetcodeUrl:'https://leetcode.com/problems/house-robber-ii/'},

{title:'Jump Game (DP/Greedy)',difficulty:'Medium',topic:'Dynamic Programming',description:'Can you reach last index? Count min jumps variant.',examples:[{input:'nums=[2,3,1,1,4]',output:'true'}],approach:'Greedy: track max reachable. If index > max, impossible.',java_code:`class Solution {
    public boolean canJump(int[] nums){
        int max=0;
        for(int i=0;i<nums.length;i++){if(i>max)return false;max=Math.max(max,i+nums[i]);}
        return true;
    }
}`,python_code:`class Solution:
    def canJump(self,nums):
        mx=0
        for i,j in enumerate(nums):
            if i>mx: return False
            mx=max(mx,i+j)
        return True`,timeComplex:'O(n)',spaceComplex:'O(1)',companies:['Amazon','TCS NQT'],leetcodeUrl:'https://leetcode.com/problems/jump-game/'},

// GRAPHS — 12
{title:'Number of Islands',difficulty:'Medium',topic:'Graphs',description:'Count islands in 2D grid.',examples:[{input:'grid=[["1","1","0"],["1","1","0"],["0","0","1"]]',output:'2'}],approach:'DFS from each unvisited "1". Mark as visited. Count calls.',java_code:`class Solution {
    public int numIslands(char[][] g){
        int cnt=0;
        for(int i=0;i<g.length;i++)for(int j=0;j<g[0].length;j++)if(g[i][j]=='1'){dfs(g,i,j);cnt++;}
        return cnt;
    }
    void dfs(char[][] g,int i,int j){
        if(i<0||i>=g.length||j<0||j>=g[0].length||g[i][j]!='1')return;
        g[i][j]='0';dfs(g,i+1,j);dfs(g,i-1,j);dfs(g,i,j+1);dfs(g,i,j-1);
    }
}`,python_code:`class Solution:
    def numIslands(self,grid):
        def dfs(i,j):
            if i<0 or i>=len(grid) or j<0 or j>=len(grid[0]) or grid[i][j]!='1': return
            grid[i][j]='0';dfs(i+1,j);dfs(i-1,j);dfs(i,j+1);dfs(i,j-1)
        cnt=0
        for i in range(len(grid)):
            for j in range(len(grid[0])):
                if grid[i][j]=='1': dfs(i,j);cnt+=1
        return cnt`,timeComplex:'O(m*n)',spaceComplex:'O(m*n)',companies:['Amazon','Zoho','Cognizant'],leetcodeUrl:'https://leetcode.com/problems/number-of-islands/'},

{title:'Course Schedule (Cycle Detection)',difficulty:'Medium',topic:'Graphs',description:'Can you finish all courses? Detect cycle in directed graph.',examples:[{input:'n=2,prerequisites=[[1,0]]',output:'true'},{input:'prerequisites=[[1,0],[0,1]]',output:'false'}],approach:'DFS 3 states: 0=unvisited, 1=visiting, 2=done. Cycle if 1 again.',java_code:`class Solution {
    public boolean canFinish(int n,int[][] pre){
        List<List<Integer>> adj=new ArrayList<>();
        for(int i=0;i<n;i++)adj.add(new ArrayList<>());
        for(int[] p:pre)adj.get(p[1]).add(p[0]);
        int[] st=new int[n];
        for(int i=0;i<n;i++)if(st[i]==0&&hasCycle(adj,st,i))return false;
        return true;
    }
    boolean hasCycle(List<List<Integer>> adj,int[] st,int v){
        st[v]=1;
        for(int nb:adj.get(v)){if(st[nb]==1)return true;if(st[nb]==0&&hasCycle(adj,st,nb))return true;}
        st[v]=2;return false;
    }
}`,python_code:`class Solution:
    def canFinish(self,n,pre):
        adj=[[] for _ in range(n)]
        for a,b in pre: adj[b].append(a)
        st=[0]*n
        def dfs(v):
            if st[v]==1: return False
            if st[v]==2: return True
            st[v]=1
            for nb in adj[v]:
                if not dfs(nb): return False
            st[v]=2;return True
        return all(dfs(i) for i in range(n))`,timeComplex:'O(V+E)',spaceComplex:'O(V+E)',companies:['Amazon','Infosys'],leetcodeUrl:'https://leetcode.com/problems/course-schedule/'},

{title:'Rotting Oranges',difficulty:'Medium',topic:'Graphs',description:'Min minutes until no fresh orange. -1 if impossible.',examples:[{input:'grid=[[2,1,1],[1,1,0],[0,1,1]]',output:'4'}],approach:'Multi-source BFS from all rotten oranges simultaneously.',java_code:`class Solution {
    public int orangesRotting(int[][] g){
        Queue<int[]> q=new LinkedList<>();int fresh=0;
        for(int i=0;i<g.length;i++)for(int j=0;j<g[0].length;j++){if(g[i][j]==2)q.offer(new int[]{i,j});else if(g[i][j]==1)fresh++;}
        int time=0;int[][] dirs={{0,1},{0,-1},{1,0},{-1,0}};
        while(!q.isEmpty()&&fresh>0){time++;for(int k=q.size();k>0;k--){int[] c=q.poll();for(int[] d:dirs){int ni=c[0]+d[0],nj=c[1]+d[1];if(ni>=0&&ni<g.length&&nj>=0&&nj<g[0].length&&g[ni][nj]==1){g[ni][nj]=2;fresh--;q.offer(new int[]{ni,nj});}}}}
        return fresh==0?time:-1;
    }
}`,python_code:`class Solution:
    def orangesRotting(self,grid):
        from collections import deque
        q=deque();fresh=0;m,n=len(grid),len(grid[0])
        for i in range(m):
            for j in range(n):
                if grid[i][j]==2: q.append((i,j))
                elif grid[i][j]==1: fresh+=1
        time=0
        while q and fresh:
            time+=1
            for _ in range(len(q)):
                r,c=q.popleft()
                for dr,dc in [(0,1),(0,-1),(1,0),(-1,0)]:
                    nr,nc=r+dr,c+dc
                    if 0<=nr<m and 0<=nc<n and grid[nr][nc]==1:
                        grid[nr][nc]=2;fresh-=1;q.append((nr,nc))
        return 0 if fresh==0 else -1`,timeComplex:'O(m*n)',spaceComplex:'O(m*n)',companies:['Amazon','Zoho'],leetcodeUrl:'https://leetcode.com/problems/rotting-oranges/'},

{title:'Clone Graph',difficulty:'Medium',topic:'Graphs',description:'Deep copy an undirected graph.',examples:[{input:'adjList=[[2,4],[1,3],[2,4],[1,3]]',output:'deep copy'}],approach:'DFS + HashMap: old→new. Recursively copy neighbors.',java_code:`class Solution {
    Map<Node,Node> map=new HashMap<>();
    public Node cloneGraph(Node n){
        if(n==null)return null;if(map.containsKey(n))return map.get(n);
        Node clone=new Node(n.val);map.put(n,clone);
        for(Node nb:n.neighbors)clone.neighbors.add(cloneGraph(nb));
        return clone;
    }
}`,python_code:`class Solution:
    def cloneGraph(self,node):
        if not node: return None
        mp={}
        def dfs(n):
            if n in mp: return mp[n]
            clone=Node(n.val);mp[n]=clone
            for nb in n.neighbors: clone.neighbors.append(dfs(nb))
            return clone
        return dfs(node)`,timeComplex:'O(V+E)',spaceComplex:'O(V)',companies:['Amazon'],leetcodeUrl:'https://leetcode.com/problems/clone-graph/'},

// RECURSION — 8
{title:'Subsets',difficulty:'Medium',topic:'Recursion',description:'Return all possible subsets (power set).',examples:[{input:'nums=[1,2,3]',output:'[[],[1],[2],[1,2],[3],[1,3],[2,3],[1,2,3]]'}],approach:'Backtracking: include or exclude each element.',java_code:`class Solution {
    public List<List<Integer>> subsets(int[] nums){
        List<List<Integer>> res=new ArrayList<>();bt(nums,0,new ArrayList<>(),res);return res;
    }
    void bt(int[] nums,int start,List<Integer> cur,List<List<Integer>> res){
        res.add(new ArrayList<>(cur));
        for(int i=start;i<nums.length;i++){cur.add(nums[i]);bt(nums,i+1,cur,res);cur.remove(cur.size()-1);}
    }
}`,python_code:`class Solution:
    def subsets(self,nums):
        res=[]
        def bt(start,cur):
            res.append(cur[:])
            for i in range(start,len(nums)):
                cur.append(nums[i]);bt(i+1,cur);cur.pop()
        bt(0,[]);return res`,timeComplex:'O(2^n)',spaceComplex:'O(n)',companies:['Amazon','Wipro'],leetcodeUrl:'https://leetcode.com/problems/subsets/'},

{title:'Permutations',difficulty:'Medium',topic:'Recursion',description:'Return all possible permutations of distinct integers.',examples:[{input:'nums=[1,2,3]',output:'[[1,2,3],[1,3,2],[2,1,3],[2,3,1],[3,1,2],[3,2,1]]'}],approach:'Backtracking: swap with each remaining. Recurse. Swap back.',java_code:`class Solution {
    public List<List<Integer>> permute(int[] nums){
        List<List<Integer>> res=new ArrayList<>();bt(nums,0,res);return res;
    }
    void bt(int[] nums,int start,List<List<Integer>> res){
        if(start==nums.length){List<Integer> l=new ArrayList<>();for(int n:nums)l.add(n);res.add(l);return;}
        for(int i=start;i<nums.length;i++){int t=nums[start];nums[start]=nums[i];nums[i]=t;bt(nums,start+1,res);t=nums[start];nums[start]=nums[i];nums[i]=t;}
    }
}`,python_code:`class Solution:
    def permute(self,nums):
        res=[]
        def bt(start):
            if start==len(nums): res.append(nums[:]);return
            for i in range(start,len(nums)):
                nums[start],nums[i]=nums[i],nums[start];bt(start+1);nums[start],nums[i]=nums[i],nums[start]
        bt(0);return res`,timeComplex:'O(n*n!)',spaceComplex:'O(n)',companies:['TCS NQT','Amazon','Infosys'],leetcodeUrl:'https://leetcode.com/problems/permutations/'},

{title:'Combination Sum',difficulty:'Medium',topic:'Recursion',description:'Find all unique combinations summing to target. Can reuse numbers.',examples:[{input:'candidates=[2,3,6,7],target=7',output:'[[2,2,3],[7]]'}],approach:'Backtracking. At each step try each candidate >= current. Subtract.',java_code:`class Solution {
    public List<List<Integer>> combinationSum(int[] candidates,int target){
        List<List<Integer>> res=new ArrayList<>();Arrays.sort(candidates);
        bt(candidates,target,0,new ArrayList<>(),res);return res;
    }
    void bt(int[] c,int rem,int start,List<Integer> cur,List<List<Integer>> res){
        if(rem==0){res.add(new ArrayList<>(cur));return;}
        for(int i=start;i<c.length&&c[i]<=rem;i++){cur.add(c[i]);bt(c,rem-c[i],i,cur,res);cur.remove(cur.size()-1);}
    }
}`,python_code:`class Solution:
    def combinationSum(self,candidates,target):
        res=[]
        def bt(start,cur,rem):
            if rem==0: res.append(cur[:]);return
            for i in range(start,len(candidates)):
                if candidates[i]>rem: break
                cur.append(candidates[i]);bt(i,cur,rem-candidates[i]);cur.pop()
        candidates.sort();bt(0,[],target);return res`,timeComplex:'O(2^target)',spaceComplex:'O(target)',companies:['Amazon'],leetcodeUrl:'https://leetcode.com/problems/combination-sum/'},

{title:'Word Search',difficulty:'Medium',topic:'Recursion',description:'Find if word exists in grid by adjacent cells.',examples:[{input:'board=[["A","B","C","E"],["S","F","C","S"],["A","D","E","E"]],word="ABCCED"',output:'true'}],approach:'DFS backtracking. Mark cell temporarily. Restore after.',java_code:`class Solution {
    public boolean exist(char[][] board,String word){
        for(int i=0;i<board.length;i++)for(int j=0;j<board[0].length;j++)if(dfs(board,word,0,i,j))return true;
        return false;
    }
    boolean dfs(char[][] b,String w,int idx,int i,int j){
        if(idx==w.length())return true;
        if(i<0||i>=b.length||j<0||j>=b[0].length||b[i][j]!=w.charAt(idx))return false;
        char t=b[i][j];b[i][j]='#';
        boolean res=dfs(b,w,idx+1,i+1,j)||dfs(b,w,idx+1,i-1,j)||dfs(b,w,idx+1,i,j+1)||dfs(b,w,idx+1,i,j-1);
        b[i][j]=t;return res;
    }
}`,python_code:`class Solution:
    def exist(self,board,word):
        m,n=len(board),len(board[0])
        def dfs(i,j,k):
            if k==len(word): return True
            if i<0 or i>=m or j<0 or j>=n or board[i][j]!=word[k]: return False
            tmp=board[i][j];board[i][j]='#'
            res=dfs(i+1,j,k+1) or dfs(i-1,j,k+1) or dfs(i,j+1,k+1) or dfs(i,j-1,k+1)
            board[i][j]=tmp;return res
        return any(dfs(i,j,0) for i in range(m) for j in range(n))`,timeComplex:'O(m*n*4^L)',spaceComplex:'O(L)',companies:['Amazon','Zoho'],leetcodeUrl:'https://leetcode.com/problems/word-search/'},

// TREES — 12
{title:'Maximum Depth of Binary Tree',difficulty:'Easy',topic:'Trees',description:'Return maximum depth of binary tree.',examples:[{input:'root=[3,9,20,null,null,15,7]',output:'3'}],approach:'1 + max(left depth, right depth).',java_code:`class Solution {
    public int maxDepth(TreeNode root){if(root==null)return 0;return 1+Math.max(maxDepth(root.left),maxDepth(root.right));}
}`,python_code:`class Solution:
    def maxDepth(self,root):
        if not root: return 0
        return 1+max(self.maxDepth(root.left),self.maxDepth(root.right))`,timeComplex:'O(n)',spaceComplex:'O(h)',companies:['TCS','Amazon','Infosys'],leetcodeUrl:'https://leetcode.com/problems/maximum-depth-of-binary-tree/'},

{title:'Level Order Traversal',difficulty:'Medium',topic:'Trees',description:'Return level order traversal as list of lists.',examples:[{input:'root=[3,9,20,null,null,15,7]',output:'[[3],[9,20],[15,7]]'}],approach:'BFS queue. Process all at current level before next.',java_code:`class Solution {
    public List<List<Integer>> levelOrder(TreeNode root){
        List<List<Integer>> res=new ArrayList<>();if(root==null)return res;
        Queue<TreeNode> q=new LinkedList<>();q.offer(root);
        while(!q.isEmpty()){List<Integer> lvl=new ArrayList<>();for(int i=q.size();i>0;i--){TreeNode n=q.poll();lvl.add(n.val);if(n.left!=null)q.offer(n.left);if(n.right!=null)q.offer(n.right);}res.add(lvl);}
        return res;
    }
}`,python_code:`from collections import deque
class Solution:
    def levelOrder(self,root):
        if not root: return []
        res=[];q=deque([root])
        while q:
            lvl=[]
            for _ in range(len(q)):
                n=q.popleft();lvl.append(n.val)
                if n.left: q.append(n.left)
                if n.right: q.append(n.right)
            res.append(lvl)
        return res`,timeComplex:'O(n)',spaceComplex:'O(n)',companies:['Amazon','Infosys','Wipro'],leetcodeUrl:'https://leetcode.com/problems/binary-tree-level-order-traversal/'},

{title:'Validate Binary Search Tree',difficulty:'Medium',topic:'Trees',description:'Determine if binary tree is a valid BST.',examples:[{input:'root=[2,1,3]',output:'true'},{input:'root=[5,1,4,null,null,3,6]',output:'false'}],approach:'Pass min/max bounds. Each node must be strictly within range.',java_code:`class Solution {
    public boolean isValidBST(TreeNode root){return dfs(root,Long.MIN_VALUE,Long.MAX_VALUE);}
    boolean dfs(TreeNode n,long mn,long mx){
        if(n==null)return true;if(n.val<=mn||n.val>=mx)return false;
        return dfs(n.left,mn,n.val)&&dfs(n.right,n.val,mx);
    }
}`,python_code:`class Solution:
    def isValidBST(self,root):
        def dfs(n,mn,mx):
            if not n: return True
            if n.val<=mn or n.val>=mx: return False
            return dfs(n.left,mn,n.val) and dfs(n.right,n.val,mx)
        return dfs(root,float('-inf'),float('inf'))`,timeComplex:'O(n)',spaceComplex:'O(h)',companies:['Amazon','Zoho'],leetcodeUrl:'https://leetcode.com/problems/validate-binary-search-tree/'},

{title:'Invert Binary Tree',difficulty:'Easy',topic:'Trees',description:'Invert a binary tree.',examples:[{input:'root=[4,2,7,1,3,6,9]',output:'[4,7,2,9,6,3,1]'}],approach:'Recursively swap left and right children.',java_code:`class Solution {
    public TreeNode invertTree(TreeNode root){
        if(root==null)return null;TreeNode t=root.left;root.left=invertTree(root.right);root.right=invertTree(t);return root;
    }
}`,python_code:`class Solution:
    def invertTree(self,root):
        if not root: return None
        root.left,root.right=self.invertTree(root.right),self.invertTree(root.left)
        return root`,timeComplex:'O(n)',spaceComplex:'O(h)',companies:['Amazon'],leetcodeUrl:'https://leetcode.com/problems/invert-binary-tree/'},

{title:'Diameter of Binary Tree',difficulty:'Easy',topic:'Trees',description:'Length of longest path between any two nodes.',examples:[{input:'root=[1,2,3,4,5]',output:'3'}],approach:'At each node: diameter = left_height + right_height. Track global max.',java_code:`class Solution {
    int res=0;
    public int diameterOfBinaryTree(TreeNode root){height(root);return res;}
    int height(TreeNode n){
        if(n==null)return 0;int l=height(n.left),r=height(n.right);
        res=Math.max(res,l+r);return 1+Math.max(l,r);
    }
}`,python_code:`class Solution:
    def diameterOfBinaryTree(self,root):
        self.res=0
        def height(n):
            if not n: return 0
            l,r=height(n.left),height(n.right)
            self.res=max(self.res,l+r);return 1+max(l,r)
        height(root);return self.res`,timeComplex:'O(n)',spaceComplex:'O(h)',companies:['Amazon'],leetcodeUrl:'https://leetcode.com/problems/diameter-of-binary-tree/'},

{title:'Binary Tree Maximum Path Sum',difficulty:'Hard',topic:'Trees',description:'Find path with maximum sum (can start/end at any node).',examples:[{input:'root=[-10,9,20,null,null,15,7]',output:'42'}],approach:'At each node: path through it = node + max(0,left) + max(0,right).',java_code:`class Solution {
    int res=Integer.MIN_VALUE;
    public int maxPathSum(TreeNode root){dfs(root);return res;}
    int dfs(TreeNode n){
        if(n==null)return 0;int l=Math.max(0,dfs(n.left)),r=Math.max(0,dfs(n.right));
        res=Math.max(res,n.val+l+r);return n.val+Math.max(l,r);
    }
}`,python_code:`class Solution:
    def maxPathSum(self,root):
        self.res=float('-inf')
        def dfs(n):
            if not n: return 0
            l,r=max(0,dfs(n.left)),max(0,dfs(n.right))
            self.res=max(self.res,n.val+l+r);return n.val+max(l,r)
        dfs(root);return self.res`,timeComplex:'O(n)',spaceComplex:'O(h)',companies:['Amazon','Flipkart'],leetcodeUrl:'https://leetcode.com/problems/binary-tree-maximum-path-sum/'},

// SORTING — 8
{title:'Merge Sort',difficulty:'Medium',topic:'Sorting',description:'Implement merge sort.',examples:[{input:'arr=[38,27,43,3,9,82,10]',output:'[3,9,10,27,38,43,82]'}],approach:'Divide into halves, sort each, merge.',java_code:`class MergeSort {
    public void sort(int[] arr,int l,int r){
        if(l>=r)return;int m=l+(r-l)/2;sort(arr,l,m);sort(arr,m+1,r);merge(arr,l,m,r);
    }
    void merge(int[] a,int l,int m,int r){
        int[] tmp=Arrays.copyOfRange(a,l,r+1);int i=0,j=m-l+1,k=l;
        while(i<=m-l&&j<=r-l)a[k++]=tmp[i]<=tmp[j]?tmp[i++]:tmp[j++];
        while(i<=m-l)a[k++]=tmp[i++];while(j<=r-l)a[k++]=tmp[j++];
    }
}`,python_code:`def merge_sort(arr):
    if len(arr)<=1: return arr
    mid=len(arr)//2
    L=merge_sort(arr[:mid]);R=merge_sort(arr[mid:])
    res=[];i=j=0
    while i<len(L) and j<len(R):
        if L[i]<=R[j]: res.append(L[i]);i+=1
        else: res.append(R[j]);j+=1
    return res+L[i:]+R[j:]`,timeComplex:'O(n log n)',spaceComplex:'O(n)',companies:['TCS NQT','Infosys','Wipro','Accenture']},

{title:'Quick Sort',difficulty:'Medium',topic:'Sorting',description:'Implement quick sort.',examples:[{input:'arr=[10,7,8,9,1,5]',output:'[1,5,7,8,9,10]'}],approach:'Pick pivot, partition, recurse on both halves.',java_code:`class QuickSort {
    public void sort(int[] a,int l,int r){if(l<r){int p=partition(a,l,r);sort(a,l,p-1);sort(a,p+1,r);}}
    int partition(int[] a,int l,int r){int piv=a[r],i=l-1;for(int j=l;j<r;j++)if(a[j]<=piv){i++;int t=a[i];a[i]=a[j];a[j]=t;}int t=a[i+1];a[i+1]=a[r];a[r]=t;return i+1;}
}`,python_code:`def quick_sort(arr,l,r):
    if l<r:
        def partition(a,l,r):
            piv=a[r];i=l-1
            for j in range(l,r):
                if a[j]<=piv: i+=1;a[i],a[j]=a[j],a[i]
            a[i+1],a[r]=a[r],a[i+1];return i+1
        p=partition(arr,l,r);quick_sort(arr,l,p-1);quick_sort(arr,p+1,r)`,timeComplex:'O(n log n) avg',spaceComplex:'O(log n)',companies:['TCS NQT','Infosys','Wipro']},

{title:'Binary Search',difficulty:'Easy',topic:'Binary Search',description:'Search for target in sorted array.',examples:[{input:'nums=[-1,0,3,5,9,12],target=9',output:'4'}],approach:'Compare mid with target. Move left or right boundary.',java_code:`class Solution {
    public int search(int[] nums,int target){
        int l=0,r=nums.length-1;
        while(l<=r){int m=l+(r-l)/2;if(nums[m]==target)return m;else if(nums[m]<target)l=m+1;else r=m-1;}
        return -1;
    }
}`,python_code:`class Solution:
    def search(self,nums,target):
        l,r=0,len(nums)-1
        while l<=r:
            m=(l+r)//2
            if nums[m]==target: return m
            elif nums[m]<target: l=m+1
            else: r=m-1
        return -1`,timeComplex:'O(log n)',spaceComplex:'O(1)',companies:['TCS','Infosys','Wipro','Accenture','HCL'],leetcodeUrl:'https://leetcode.com/problems/binary-search/'},

{title:'Koko Eating Bananas',difficulty:'Medium',topic:'Binary Search',description:'Find minimum eating rate k to finish piles in h hours.',examples:[{input:'piles=[3,6,7,11],h=8',output:'4'}],approach:'Binary search on k. Check if feasible.',java_code:`class Solution {
    public int minEatingSpeed(int[] piles,int h){
        int lo=1,hi=0;for(int p:piles)hi=Math.max(hi,p);
        while(lo<hi){int mid=lo+(hi-lo)/2;long hrs=0;for(int p:piles)hrs+=(p+mid-1)/mid;if(hrs<=h)hi=mid;else lo=mid+1;}
        return lo;
    }
}`,python_code:`class Solution:
    def minEatingSpeed(self,piles,h):
        import math
        lo,hi=1,max(piles)
        while lo<hi:
            mid=(lo+hi)//2
            if sum(math.ceil(p/mid) for p in piles)<=h: hi=mid
            else: lo=mid+1
        return lo`,timeComplex:'O(n log max)',spaceComplex:'O(1)',companies:['Amazon'],leetcodeUrl:'https://leetcode.com/problems/koko-eating-bananas/'},

{title:'Capacity to Ship Packages',difficulty:'Medium',topic:'Binary Search',description:'Min ship capacity to ship packages within D days.',examples:[{input:'weights=[1,2,3,4,5,6,7,8,9,10],days=5',output:'15'}],approach:'Binary search on capacity. Check feasibility.',java_code:`class Solution {
    public int shipWithinDays(int[] w,int days){
        int lo=0,hi=0;for(int x:w){lo=Math.max(lo,x);hi+=x;}
        while(lo<hi){int mid=lo+(hi-lo)/2;int d=1,cur=0;for(int x:w){if(cur+x>mid){d++;cur=0;}cur+=x;}if(d<=days)hi=mid;else lo=mid+1;}
        return lo;
    }
}`,python_code:`class Solution:
    def shipWithinDays(self,weights,days):
        lo,hi=max(weights),sum(weights)
        while lo<hi:
            mid=(lo+hi)//2;d=cur=0
            for w in weights:
                if cur+w>mid: d+=1;cur=0
                cur+=w
            d+=1
            if d<=days: hi=mid
            else: lo=mid+1
        return lo`,timeComplex:'O(n log sum)',spaceComplex:'O(1)',companies:['Amazon'],leetcodeUrl:'https://leetcode.com/problems/capacity-to-ship-packages-within-d-days/'},

// HASHING — 6
{title:'Longest Subarray Equal 0s and 1s',difficulty:'Medium',topic:'Hashing',description:'Longest subarray with equal 0s and 1s.',examples:[{input:'arr=[0,1,0,1,1,0]',output:'6'}],approach:'Replace 0→-1. Longest subarray with sum 0 using prefix sum HashMap.',java_code:`class Solution {
    public int findMaxLength(int[] nums){
        Map<Integer,Integer> map=new HashMap<>();map.put(0,-1);int sum=0,max=0;
        for(int i=0;i<nums.length;i++){sum+=nums[i]==0?-1:1;if(map.containsKey(sum))max=Math.max(max,i-map.get(sum));else map.put(sum,i);}
        return max;
    }
}`,python_code:`class Solution:
    def findMaxLength(self,nums):
        mp={0:-1};s=mx=0
        for i,n in enumerate(nums):
            s+=1 if n==1 else -1
            if s in mp: mx=max(mx,i-mp[s])
            else: mp[s]=i
        return mx`,timeComplex:'O(n)',spaceComplex:'O(n)',companies:['Amazon','TCS'],leetcodeUrl:'https://leetcode.com/problems/contiguous-array/'},

{title:'Isomorphic Strings',difficulty:'Easy',topic:'Hashing',description:'Check if two strings have one-to-one character mapping.',examples:[{input:'s="egg",t="add"',output:'true'},{input:'s="foo",t="bar"',output:'false'}],approach:'Two maps s→t and t→s. Check consistency.',java_code:`class Solution {
    public boolean isIsomorphic(String s,String t){
        Map<Character,Character> st=new HashMap<>(),ts=new HashMap<>();
        for(int i=0;i<s.length();i++){char a=s.charAt(i),b=t.charAt(i);
            if((st.containsKey(a)&&st.get(a)!=b)||(ts.containsKey(b)&&ts.get(b)!=a))return false;
            st.put(a,b);ts.put(b,a);}return true;
    }
}`,python_code:`class Solution:
    def isIsomorphic(self,s,t):
        return len(set(zip(s,t)))==len(set(s))==len(set(t))`,timeComplex:'O(n)',spaceComplex:'O(1)',companies:['TCS','Amazon'],leetcodeUrl:'https://leetcode.com/problems/isomorphic-strings/'},
];
module.exports = rest;
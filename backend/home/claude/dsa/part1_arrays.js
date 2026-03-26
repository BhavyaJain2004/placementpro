// ARRAYS — 35 questions
const arrays = [
{title:'Two Sum',difficulty:'Easy',topic:'Arrays',description:'Given array of integers and target, return indices of two numbers that add up to target.',examples:[{input:'nums=[2,7,11,15], target=9',output:'[0,1]'},{input:'nums=[3,2,4], target=6',output:'[1,2]'}],approach:'HashMap: for each element check if (target-element) exists. One pass O(n).',java_code:`class Solution {
    public int[] twoSum(int[] nums, int target) {
        Map<Integer,Integer> map = new HashMap<>();
        for (int i = 0; i < nums.length; i++) {
            int comp = target - nums[i];
            if (map.containsKey(comp)) return new int[]{map.get(comp), i};
            map.put(nums[i], i);
        }
        return new int[]{};
    }
}`,python_code:`class Solution:
    def twoSum(self, nums, target):
        seen = {}
        for i, n in enumerate(nums):
            if target - n in seen: return [seen[target-n], i]
            seen[n] = i`,timeComplex:'O(n)',spaceComplex:'O(n)',companies:['TCS','Amazon','Infosys','Wipro','Cognizant'],leetcodeUrl:'https://leetcode.com/problems/two-sum/'},

{title:'Best Time to Buy and Sell Stock',difficulty:'Easy',topic:'Arrays',description:'Find max profit by buying on one day and selling on a later day.',examples:[{input:'prices=[7,1,5,3,6,4]',output:'5'},{input:'prices=[7,6,4,3,1]',output:'0'}],approach:'Track minimum price so far. Profit = current - min. Update both.',java_code:`class Solution {
    public int maxProfit(int[] prices) {
        int min = Integer.MAX_VALUE, profit = 0;
        for (int p : prices) {
            min = Math.min(min, p);
            profit = Math.max(profit, p - min);
        }
        return profit;
    }
}`,python_code:`class Solution:
    def maxProfit(self, prices):
        min_p, profit = float('inf'), 0
        for p in prices:
            min_p = min(min_p, p)
            profit = max(profit, p - min_p)
        return profit`,timeComplex:'O(n)',spaceComplex:'O(1)',companies:['TCS','Amazon','Accenture','Deloitte'],leetcodeUrl:'https://leetcode.com/problems/best-time-to-buy-and-sell-stock/'},

{title:'Maximum Subarray (Kadane\'s)',difficulty:'Medium',topic:'Arrays',description:'Find contiguous subarray with the largest sum.',examples:[{input:'nums=[-2,1,-3,4,-1,2,1,-5,4]',output:'6'},{input:'nums=[1]',output:'1'}],approach:'Kadane\'s: curr = max(num, curr+num). Track global max.',java_code:`class Solution {
    public int maxSubArray(int[] nums) {
        int maxSum = nums[0], curr = nums[0];
        for (int i = 1; i < nums.length; i++) {
            curr = Math.max(nums[i], curr + nums[i]);
            maxSum = Math.max(maxSum, curr);
        }
        return maxSum;
    }
}`,python_code:`class Solution:
    def maxSubArray(self, nums):
        max_s = curr = nums[0]
        for n in nums[1:]:
            curr = max(n, curr + n)
            max_s = max(max_s, curr)
        return max_s`,timeComplex:'O(n)',spaceComplex:'O(1)',companies:['TCS','Infosys','Amazon','Zoho','Cognizant'],leetcodeUrl:'https://leetcode.com/problems/maximum-subarray/'},

{title:'Product of Array Except Self',difficulty:'Medium',topic:'Arrays',description:'Return array where answer[i] = product of all elements except nums[i]. No division. O(n).',examples:[{input:'nums=[1,2,3,4]',output:'[24,12,8,6]'}],approach:'Left prefix pass then multiply right suffix in same array.',java_code:`class Solution {
    public int[] productExceptSelf(int[] nums) {
        int n = nums.length; int[] res = new int[n]; res[0] = 1;
        for (int i = 1; i < n; i++) res[i] = res[i-1] * nums[i-1];
        int suf = 1;
        for (int i = n-1; i >= 0; i--) { res[i] *= suf; suf *= nums[i]; }
        return res;
    }
}`,python_code:`class Solution:
    def productExceptSelf(self, nums):
        n = len(nums); res = [1]*n
        for i in range(1, n): res[i] = res[i-1] * nums[i-1]
        suf = 1
        for i in range(n-1, -1, -1): res[i] *= suf; suf *= nums[i]
        return res`,timeComplex:'O(n)',spaceComplex:'O(1)',companies:['Amazon','Microsoft','Flipkart'],leetcodeUrl:'https://leetcode.com/problems/product-of-array-except-self/'},

{title:'Container With Most Water',difficulty:'Medium',topic:'Arrays',description:'Given n heights, find two lines that hold the most water.',examples:[{input:'height=[1,8,6,2,5,4,8,3,7]',output:'49'}],approach:'Two pointers from both ends. Move the shorter wall inward.',java_code:`class Solution {
    public int maxArea(int[] h) {
        int l=0, r=h.length-1, max=0;
        while (l<r) { max=Math.max(max,Math.min(h[l],h[r])*(r-l)); if(h[l]<h[r])l++;else r--; }
        return max;
    }
}`,python_code:`class Solution:
    def maxArea(self, height):
        l, r, mx = 0, len(height)-1, 0
        while l < r:
            mx = max(mx, min(height[l],height[r])*(r-l))
            if height[l] < height[r]: l += 1
            else: r -= 1
        return mx`,timeComplex:'O(n)',spaceComplex:'O(1)',companies:['Amazon','Accenture'],leetcodeUrl:'https://leetcode.com/problems/container-with-most-water/'},

{title:'3Sum',difficulty:'Medium',topic:'Arrays',description:'Find all unique triplets that sum to zero.',examples:[{input:'nums=[-1,0,1,2,-1,-4]',output:'[[-1,-1,2],[-1,0,1]]'}],approach:'Sort. Fix one element, two pointers for rest. Skip duplicates.',java_code:`class Solution {
    public List<List<Integer>> threeSum(int[] nums) {
        Arrays.sort(nums); List<List<Integer>> res = new ArrayList<>();
        for (int i=0; i<nums.length-2; i++) {
            if (i>0 && nums[i]==nums[i-1]) continue;
            int l=i+1, r=nums.length-1;
            while (l<r) {
                int s=nums[i]+nums[l]+nums[r];
                if (s==0) { res.add(Arrays.asList(nums[i],nums[l],nums[r]));
                    while(l<r&&nums[l]==nums[l+1])l++; while(l<r&&nums[r]==nums[r-1])r--; l++;r--; }
                else if (s<0) l++; else r--;
            }
        }
        return res;
    }
}`,python_code:`class Solution:
    def threeSum(self, nums):
        nums.sort(); res = []
        for i in range(len(nums)-2):
            if i>0 and nums[i]==nums[i-1]: continue
            l, r = i+1, len(nums)-1
            while l < r:
                s = nums[i]+nums[l]+nums[r]
                if s==0:
                    res.append([nums[i],nums[l],nums[r]])
                    while l<r and nums[l]==nums[l+1]: l+=1
                    while l<r and nums[r]==nums[r-1]: r-=1
                    l+=1; r-=1
                elif s<0: l+=1
                else: r-=1
        return res`,timeComplex:'O(n²)',spaceComplex:'O(1)',companies:['TCS NQT','Infosys','Amazon','Cognizant'],leetcodeUrl:'https://leetcode.com/problems/3sum/'},

{title:'Maximum Product Subarray',difficulty:'Medium',topic:'Arrays',description:'Find contiguous subarray with largest product.',examples:[{input:'nums=[2,3,-2,4]',output:'6'},{input:'nums=[-2,0,-1]',output:'0'}],approach:'Track both max and min products. Swap on negative number.',java_code:`class Solution {
    public int maxProduct(int[] nums) {
        int max=nums[0], min=nums[0], res=nums[0];
        for (int i=1; i<nums.length; i++) {
            if (nums[i]<0) { int t=max; max=min; min=t; }
            max=Math.max(nums[i],max*nums[i]); min=Math.min(nums[i],min*nums[i]);
            res=Math.max(res,max);
        }
        return res;
    }
}`,python_code:`class Solution:
    def maxProduct(self, nums):
        mx=mn=res=nums[0]
        for n in nums[1:]:
            if n<0: mx,mn=mn,mx
            mx=max(n,mx*n); mn=min(n,mn*n); res=max(res,mx)
        return res`,timeComplex:'O(n)',spaceComplex:'O(1)',companies:['Amazon','TCS NQT','Deloitte'],leetcodeUrl:'https://leetcode.com/problems/maximum-product-subarray/'},

{title:'Find Minimum in Rotated Sorted Array',difficulty:'Medium',topic:'Arrays',description:'Find minimum element in rotated sorted array.',examples:[{input:'nums=[3,4,5,1,2]',output:'1'},{input:'nums=[4,5,6,7,0,1,2]',output:'0'}],approach:'Binary search: if mid > right, min is in right half. Else left half.',java_code:`class Solution {
    public int findMin(int[] nums) {
        int l=0, r=nums.length-1;
        while (l<r) { int m=l+(r-l)/2; if(nums[m]>nums[r])l=m+1; else r=m; }
        return nums[l];
    }
}`,python_code:`class Solution:
    def findMin(self, nums):
        l, r = 0, len(nums)-1
        while l < r:
            m = (l+r)//2
            if nums[m] > nums[r]: l=m+1
            else: r=m
        return nums[l]`,timeComplex:'O(log n)',spaceComplex:'O(1)',companies:['Amazon','TCS'],leetcodeUrl:'https://leetcode.com/problems/find-minimum-in-rotated-sorted-array/'},

{title:'Search in Rotated Sorted Array',difficulty:'Medium',topic:'Arrays',description:'Search target in rotated sorted array.',examples:[{input:'nums=[4,5,6,7,0,1,2], target=0',output:'4'}],approach:'Modified binary search. Determine sorted half, check if target is in it.',java_code:`class Solution {
    public int search(int[] a, int t) {
        int l=0, r=a.length-1;
        while (l<=r) {
            int m=l+(r-l)/2;
            if (a[m]==t) return m;
            if (a[l]<=a[m]) { if(a[l]<=t&&t<a[m])r=m-1; else l=m+1; }
            else { if(a[m]<t&&t<=a[r])l=m+1; else r=m-1; }
        }
        return -1;
    }
}`,python_code:`class Solution:
    def search(self, nums, t):
        l, r = 0, len(nums)-1
        while l<=r:
            m=(l+r)//2
            if nums[m]==t: return m
            if nums[l]<=nums[m]:
                if nums[l]<=t<nums[m]: r=m-1
                else: l=m+1
            else:
                if nums[m]<t<=nums[r]: l=m+1
                else: r=m-1
        return -1`,timeComplex:'O(log n)',spaceComplex:'O(1)',companies:['Amazon','Flipkart'],leetcodeUrl:'https://leetcode.com/problems/search-in-rotated-sorted-array/'},

{title:'Find Duplicate Number',difficulty:'Medium',topic:'Arrays',description:'Find duplicate in array of n+1 integers [1,n]. No extra space.',examples:[{input:'nums=[1,3,4,2,2]',output:'2'}],approach:'Floyd\'s cycle detection treating values as pointers.',java_code:`class Solution {
    public int findDuplicate(int[] nums) {
        int slow=nums[0], fast=nums[0];
        do { slow=nums[slow]; fast=nums[nums[fast]]; } while(slow!=fast);
        slow=nums[0];
        while(slow!=fast) { slow=nums[slow]; fast=nums[fast]; }
        return slow;
    }
}`,python_code:`class Solution:
    def findDuplicate(self, nums):
        slow=fast=nums[0]
        while True:
            slow=nums[slow]; fast=nums[nums[fast]]
            if slow==fast: break
        slow=nums[0]
        while slow!=fast: slow=nums[slow]; fast=nums[fast]
        return slow`,timeComplex:'O(n)',spaceComplex:'O(1)',companies:['Amazon','Flipkart'],leetcodeUrl:'https://leetcode.com/problems/find-the-duplicate-number/'},

{title:'Trapping Rain Water',difficulty:'Hard',topic:'Arrays',description:'Given elevation map, compute water trapped after raining.',examples:[{input:'height=[0,1,0,2,1,0,1,3,2,1,2,1]',output:'6'}],approach:'Two pointers. Track left_max, right_max. Water = min(lm,rm) - height.',java_code:`class Solution {
    public int trap(int[] h) {
        int l=0,r=h.length-1,lm=0,rm=0,res=0;
        while (l<r) {
            if (h[l]<h[r]) { lm=Math.max(lm,h[l]); res+=lm-h[l]; l++; }
            else { rm=Math.max(rm,h[r]); res+=rm-h[r]; r--; }
        }
        return res;
    }
}`,python_code:`class Solution:
    def trap(self, h):
        l,r,lm,rm,res=0,len(h)-1,0,0,0
        while l<r:
            if h[l]<h[r]: lm=max(lm,h[l]); res+=lm-h[l]; l+=1
            else: rm=max(rm,h[r]); res+=rm-h[r]; r-=1
        return res`,timeComplex:'O(n)',spaceComplex:'O(1)',companies:['Amazon','Flipkart','ION Group'],leetcodeUrl:'https://leetcode.com/problems/trapping-rain-water/'},

{title:'Merge Intervals',difficulty:'Medium',topic:'Arrays',description:'Merge all overlapping intervals.',examples:[{input:'[[1,3],[2,6],[8,10],[15,18]]',output:'[[1,6],[8,10],[15,18]]'}],approach:'Sort by start. If current start <= last end, merge. Else add new.',java_code:`class Solution {
    public int[][] merge(int[][] a) {
        Arrays.sort(a,(x,y)->x[0]-y[0]);
        List<int[]> res=new ArrayList<>(); res.add(a[0]);
        for (int i=1;i<a.length;i++) {
            int[] last=res.get(res.size()-1);
            if (a[i][0]<=last[1]) last[1]=Math.max(last[1],a[i][1]);
            else res.add(a[i]);
        }
        return res.toArray(new int[0][]);
    }
}`,python_code:`class Solution:
    def merge(self, intervals):
        intervals.sort(key=lambda x:x[0]); res=[intervals[0]]
        for s,e in intervals[1:]:
            if s<=res[-1][1]: res[-1][1]=max(res[-1][1],e)
            else: res.append([s,e])
        return res`,timeComplex:'O(n log n)',spaceComplex:'O(n)',companies:['Amazon','Accenture','Infosys'],leetcodeUrl:'https://leetcode.com/problems/merge-intervals/'},

{title:'Rotate Array',difficulty:'Medium',topic:'Arrays',description:'Rotate array right by k steps in-place.',examples:[{input:'nums=[1,2,3,4,5,6,7], k=3',output:'[5,6,7,1,2,3,4]'}],approach:'Reverse all, reverse first k, reverse last n-k.',java_code:`class Solution {
    public void rotate(int[] a, int k) {
        k%=a.length; rev(a,0,a.length-1); rev(a,0,k-1); rev(a,k,a.length-1);
    }
    void rev(int[] a,int l,int r){while(l<r){int t=a[l];a[l++]=a[r];a[r--]=t;}}
}`,python_code:`class Solution:
    def rotate(self, nums, k):
        n=len(nums); k%=n
        nums.reverse(); nums[:k]=nums[:k][::-1]; nums[k:]=nums[k:][::-1]`,timeComplex:'O(n)',spaceComplex:'O(1)',companies:['TCS','Infosys','Cognizant'],leetcodeUrl:'https://leetcode.com/problems/rotate-array/'},

{title:'Subarray Sum Equals K',difficulty:'Medium',topic:'Arrays',description:'Count subarrays with sum equal to k.',examples:[{input:'nums=[1,1,1], k=2',output:'2'}],approach:'Prefix sum + HashMap. Check if (prefix - k) exists.',java_code:`class Solution {
    public int subarraySum(int[] nums, int k) {
        Map<Integer,Integer> map=new HashMap<>(); map.put(0,1); int sum=0,count=0;
        for (int n:nums) { sum+=n; count+=map.getOrDefault(sum-k,0); map.put(sum,map.getOrDefault(sum,0)+1); }
        return count;
    }
}`,python_code:`class Solution:
    def subarraySum(self, nums, k):
        from collections import defaultdict
        mp=defaultdict(int); mp[0]=1; s=count=0
        for n in nums: s+=n; count+=mp[s-k]; mp[s]+=1
        return count`,timeComplex:'O(n)',spaceComplex:'O(n)',companies:['Amazon','TCS NQT','Infosys'],leetcodeUrl:'https://leetcode.com/problems/subarray-sum-equals-k/'},

{title:'Jump Game',difficulty:'Medium',topic:'Arrays',description:'Can you reach the last index given jump lengths?',examples:[{input:'nums=[2,3,1,1,4]',output:'true'},{input:'nums=[3,2,1,0,4]',output:'false'}],approach:'Track max reachable index. If current > max, return false.',java_code:`class Solution {
    public boolean canJump(int[] nums) {
        int max=0;
        for (int i=0;i<nums.length;i++) { if(i>max)return false; max=Math.max(max,i+nums[i]); }
        return true;
    }
}`,python_code:`class Solution:
    def canJump(self, nums):
        mx=0
        for i,j in enumerate(nums):
            if i>mx: return False
            mx=max(mx,i+j)
        return True`,timeComplex:'O(n)',spaceComplex:'O(1)',companies:['Amazon','TCS NQT'],leetcodeUrl:'https://leetcode.com/problems/jump-game/'},

{title:'Jump Game II',difficulty:'Medium',topic:'Arrays',description:'Minimum jumps to reach last index.',examples:[{input:'nums=[2,3,1,1,4]',output:'2'}],approach:'Greedy BFS. When current range ends, increment jumps, update range.',java_code:`class Solution {
    public int jump(int[] nums) {
        int jumps=0,cur=0,far=0;
        for (int i=0;i<nums.length-1;i++) { far=Math.max(far,i+nums[i]); if(i==cur){jumps++;cur=far;} }
        return jumps;
    }
}`,python_code:`class Solution:
    def jump(self, nums):
        jumps=cur=far=0
        for i in range(len(nums)-1):
            far=max(far,i+nums[i])
            if i==cur: jumps+=1; cur=far
        return jumps`,timeComplex:'O(n)',spaceComplex:'O(1)',companies:['Amazon','Flipkart'],leetcodeUrl:'https://leetcode.com/problems/jump-game-ii/'},

{title:'Sort Colors (Dutch Flag)',difficulty:'Medium',topic:'Arrays',description:'Sort array of 0s, 1s, 2s in-place in one pass.',examples:[{input:'nums=[2,0,2,1,1,0]',output:'[0,0,1,1,2,2]'}],approach:'Three pointers: low=0, mid=0, high=n-1. Route each value.',java_code:`class Solution {
    public void sortColors(int[] nums) {
        int lo=0,mid=0,hi=nums.length-1;
        while (mid<=hi) {
            if(nums[mid]==0){int t=nums[lo];nums[lo++]=nums[mid];nums[mid++]=t;}
            else if(nums[mid]==1)mid++;
            else{int t=nums[mid];nums[mid]=nums[hi];nums[hi--]=t;}
        }
    }
}`,python_code:`class Solution:
    def sortColors(self, nums):
        lo=mid=0; hi=len(nums)-1
        while mid<=hi:
            if nums[mid]==0: nums[lo],nums[mid]=nums[mid],nums[lo]; lo+=1; mid+=1
            elif nums[mid]==1: mid+=1
            else: nums[mid],nums[hi]=nums[hi],nums[mid]; hi-=1`,timeComplex:'O(n)',spaceComplex:'O(1)',companies:['TCS NQT','Infosys','Wipro'],leetcodeUrl:'https://leetcode.com/problems/sort-colors/'},

{title:'Majority Element',difficulty:'Easy',topic:'Arrays',description:'Find element appearing more than n/2 times.',examples:[{input:'nums=[3,2,3]',output:'3'},{input:'nums=[2,2,1,1,1,2,2]',output:'2'}],approach:'Boyer-Moore Voting: track candidate and count.',java_code:`class Solution {
    public int majorityElement(int[] nums) {
        int candidate=nums[0], count=1;
        for (int i=1;i<nums.length;i++) {
            if(count==0){candidate=nums[i];count=1;}
            else if(nums[i]==candidate)count++;
            else count--;
        }
        return candidate;
    }
}`,python_code:`class Solution:
    def majorityElement(self, nums):
        candidate,count=nums[0],1
        for n in nums[1:]:
            if count==0: candidate=n; count=1
            elif n==candidate: count+=1
            else: count-=1
        return candidate`,timeComplex:'O(n)',spaceComplex:'O(1)',companies:['TCS','Infosys','Wipro','Cognizant'],leetcodeUrl:'https://leetcode.com/problems/majority-element/'},

{title:'Move Zeroes',difficulty:'Easy',topic:'Arrays',description:'Move all 0s to end maintaining relative order. In-place.',examples:[{input:'nums=[0,1,0,3,12]',output:'[1,3,12,0,0]'}],approach:'Two pointers. Compact non-zeros to front, fill rest with 0s.',java_code:`class Solution {
    public void moveZeroes(int[] nums) {
        int pos=0;
        for (int n:nums) if(n!=0)nums[pos++]=n;
        while(pos<nums.length)nums[pos++]=0;
    }
}`,python_code:`class Solution:
    def moveZeroes(self, nums):
        pos=0
        for n in nums:
            if n!=0: nums[pos]=n; pos+=1
        while pos<len(nums): nums[pos]=0; pos+=1`,timeComplex:'O(n)',spaceComplex:'O(1)',companies:['TCS','Infosys','Wipro','HCL'],leetcodeUrl:'https://leetcode.com/problems/move-zeroes/'},

{title:'Contains Duplicate',difficulty:'Easy',topic:'Arrays',description:'Return true if any value appears at least twice.',examples:[{input:'nums=[1,2,3,1]',output:'true'},{input:'nums=[1,2,3,4]',output:'false'}],approach:'HashSet. Return true if element already exists.',java_code:`class Solution {
    public boolean containsDuplicate(int[] nums) {
        Set<Integer> s=new HashSet<>();
        for (int n:nums) { if(!s.add(n)) return true; }
        return false;
    }
}`,python_code:`class Solution:
    def containsDuplicate(self, nums):
        return len(nums) != len(set(nums))`,timeComplex:'O(n)',spaceComplex:'O(n)',companies:['TCS','Infosys','Wipro','Accenture'],leetcodeUrl:'https://leetcode.com/problems/contains-duplicate/'},

{title:'Longest Consecutive Sequence',difficulty:'Medium',topic:'Arrays',description:'Find length of longest consecutive elements sequence.',examples:[{input:'nums=[100,4,200,1,3,2]',output:'4'}],approach:'HashSet. For each sequence start (n-1 not in set), count forward.',java_code:`class Solution {
    public int longestConsecutive(int[] nums) {
        Set<Integer> set=new HashSet<>();
        for(int n:nums)set.add(n);
        int max=0;
        for(int n:set) if(!set.contains(n-1)){
            int cur=n,len=1;
            while(set.contains(cur+1)){cur++;len++;}
            max=Math.max(max,len);
        }
        return max;
    }
}`,python_code:`class Solution:
    def longestConsecutive(self, nums):
        s=set(nums); mx=0
        for n in s:
            if n-1 not in s:
                cur,ln=n,1
                while cur+1 in s: cur+=1;ln+=1
                mx=max(mx,ln)
        return mx`,timeComplex:'O(n)',spaceComplex:'O(n)',companies:['Amazon','Flipkart'],leetcodeUrl:'https://leetcode.com/problems/longest-consecutive-sequence/'},

{title:'Sliding Window Maximum',difficulty:'Hard',topic:'Arrays',description:'Return max of each window of size k.',examples:[{input:'nums=[1,3,-1,-3,5,3,6,7], k=3',output:'[3,3,5,5,6,7]'}],approach:'Monotonic deque. Maintain decreasing order of indices.',java_code:`class Solution {
    public int[] maxSlidingWindow(int[] nums, int k) {
        int[] res=new int[nums.length-k+1];
        Deque<Integer> dq=new ArrayDeque<>();
        for(int i=0;i<nums.length;i++){
            while(!dq.isEmpty()&&dq.peek()<i-k+1)dq.poll();
            while(!dq.isEmpty()&&nums[dq.peekLast()]<nums[i])dq.pollLast();
            dq.offer(i);
            if(i>=k-1)res[i-k+1]=nums[dq.peek()];
        }
        return res;
    }
}`,python_code:`class Solution:
    def maxSlidingWindow(self, nums, k):
        from collections import deque
        dq=deque(); res=[]
        for i,n in enumerate(nums):
            while dq and dq[0]<i-k+1: dq.popleft()
            while dq and nums[dq[-1]]<n: dq.pop()
            dq.append(i)
            if i>=k-1: res.append(nums[dq[0]])
        return res`,timeComplex:'O(n)',spaceComplex:'O(k)',companies:['Amazon','Flipkart'],leetcodeUrl:'https://leetcode.com/problems/sliding-window-maximum/'},

{title:'Minimum Size Subarray Sum',difficulty:'Medium',topic:'Arrays',description:'Find minimum length subarray with sum >= target.',examples:[{input:'target=7, nums=[2,3,1,2,4,3]',output:'2'}],approach:'Sliding window. Expand right, shrink left when sum >= target.',java_code:`class Solution {
    public int minSubArrayLen(int target, int[] nums) {
        int l=0,sum=0,res=Integer.MAX_VALUE;
        for(int r=0;r<nums.length;r++){
            sum+=nums[r];
            while(sum>=target){res=Math.min(res,r-l+1);sum-=nums[l++];}
        }
        return res==Integer.MAX_VALUE?0:res;
    }
}`,python_code:`class Solution:
    def minSubArrayLen(self, target, nums):
        l=s=0; res=float('inf')
        for r,n in enumerate(nums):
            s+=n
            while s>=target: res=min(res,r-l+1); s-=nums[l]; l+=1
        return 0 if res==float('inf') else res`,timeComplex:'O(n)',spaceComplex:'O(1)',companies:['Amazon','TCS'],leetcodeUrl:'https://leetcode.com/problems/minimum-size-subarray-sum/'},

{title:'Spiral Matrix',difficulty:'Medium',topic:'Arrays',description:'Return all matrix elements in spiral order.',examples:[{input:'matrix=[[1,2,3],[4,5,6],[7,8,9]]',output:'[1,2,3,6,9,8,7,4,5]'}],approach:'4 boundaries: top,bot,left,right. Traverse and shrink.',java_code:`class Solution {
    public List<Integer> spiralOrder(int[][] m) {
        List<Integer> res=new ArrayList<>();
        int top=0,bot=m.length-1,left=0,right=m[0].length-1;
        while(top<=bot&&left<=right){
            for(int i=left;i<=right;i++)res.add(m[top][i]);top++;
            for(int i=top;i<=bot;i++)res.add(m[i][right]);right--;
            if(top<=bot){for(int i=right;i>=left;i--)res.add(m[bot][i]);bot--;}
            if(left<=right){for(int i=bot;i>=top;i--)res.add(m[i][left]);left++;}
        }
        return res;
    }
}`,python_code:`class Solution:
    def spiralOrder(self, m):
        res=[]; top,bot,left,right=0,len(m)-1,0,len(m[0])-1
        while top<=bot and left<=right:
            for i in range(left,right+1): res.append(m[top][i]); top+=1
            for i in range(top,bot+1): res.append(m[i][right]); right-=1
            if top<=bot:
                for i in range(right,left-1,-1): res.append(m[bot][i]); bot-=1
            if left<=right:
                for i in range(bot,top-1,-1): res.append(m[i][left]); left+=1
        return res`,timeComplex:'O(m*n)',spaceComplex:'O(1)',companies:['Amazon','TCS'],leetcodeUrl:'https://leetcode.com/problems/spiral-matrix/'},

{title:'Set Matrix Zeroes',difficulty:'Medium',topic:'Arrays',description:'If element is 0, set its entire row and column to 0. O(1) space.',examples:[{input:'matrix=[[1,1,1],[1,0,1],[1,1,1]]',output:'[[1,0,1],[0,0,0],[1,0,1]]'}],approach:'Use first row and column as markers. Handle them separately.',java_code:`class Solution {
    public void setZeroes(int[][] m) {
        boolean r0=false,c0=false;
        for(int j=0;j<m[0].length;j++)if(m[0][j]==0)r0=true;
        for(int i=0;i<m.length;i++)if(m[i][0]==0)c0=true;
        for(int i=1;i<m.length;i++)for(int j=1;j<m[0].length;j++)if(m[i][j]==0){m[i][0]=0;m[0][j]=0;}
        for(int i=1;i<m.length;i++)for(int j=1;j<m[0].length;j++)if(m[i][0]==0||m[0][j]==0)m[i][j]=0;
        if(r0)Arrays.fill(m[0],0);
        if(c0)for(int i=0;i<m.length;i++)m[i][0]=0;
    }
}`,python_code:`class Solution:
    def setZeroes(self, m):
        r0=any(m[0][j]==0 for j in range(len(m[0])))
        c0=any(m[i][0]==0 for i in range(len(m)))
        for i in range(1,len(m)):
            for j in range(1,len(m[0])):
                if m[i][j]==0: m[i][0]=m[0][j]=0
        for i in range(1,len(m)):
            for j in range(1,len(m[0])):
                if m[i][0]==0 or m[0][j]==0: m[i][j]=0
        if r0:
            for j in range(len(m[0])): m[0][j]=0
        if c0:
            for i in range(len(m)): m[i][0]=0`,timeComplex:'O(m*n)',spaceComplex:'O(1)',companies:['Amazon','TCS'],leetcodeUrl:'https://leetcode.com/problems/set-matrix-zeroes/'},

{title:'4Sum',difficulty:'Medium',topic:'Arrays',description:'Find all unique quadruplets that sum to target.',examples:[{input:'nums=[1,0,-1,0,-2,2], target=0',output:'[[-2,-1,1,2],[-2,0,0,2],[-1,0,0,1]]'}],approach:'Sort. Two outer loops + two pointers. Skip duplicates.',java_code:`class Solution {
    public List<List<Integer>> fourSum(int[] nums, int target) {
        Arrays.sort(nums); List<List<Integer>> res=new ArrayList<>();
        for(int i=0;i<nums.length-3;i++){
            if(i>0&&nums[i]==nums[i-1])continue;
            for(int j=i+1;j<nums.length-2;j++){
                if(j>i+1&&nums[j]==nums[j-1])continue;
                int l=j+1,r=nums.length-1;
                while(l<r){
                    long s=(long)nums[i]+nums[j]+nums[l]+nums[r];
                    if(s==target){res.add(Arrays.asList(nums[i],nums[j],nums[l],nums[r]));
                        while(l<r&&nums[l]==nums[l+1])l++;while(l<r&&nums[r]==nums[r-1])r--;l++;r--;}
                    else if(s<target)l++;else r--;
                }
            }
        }
        return res;
    }
}`,python_code:`class Solution:
    def fourSum(self, nums, target):
        nums.sort(); res=[]
        for i in range(len(nums)-3):
            if i>0 and nums[i]==nums[i-1]: continue
            for j in range(i+1,len(nums)-2):
                if j>i+1 and nums[j]==nums[j-1]: continue
                l,r=j+1,len(nums)-1
                while l<r:
                    s=nums[i]+nums[j]+nums[l]+nums[r]
                    if s==target:
                        res.append([nums[i],nums[j],nums[l],nums[r]])
                        while l<r and nums[l]==nums[l+1]: l+=1
                        while l<r and nums[r]==nums[r-1]: r-=1
                        l+=1;r-=1
                    elif s<target: l+=1
                    else: r-=1
        return res`,timeComplex:'O(n³)',spaceComplex:'O(1)',companies:['TCS NQT','Amazon'],leetcodeUrl:'https://leetcode.com/problems/4sum/'},

{title:'Pascal\'s Triangle',difficulty:'Easy',topic:'Arrays',description:'Generate first numRows of Pascal\'s triangle.',examples:[{input:'numRows=5',output:'[[1],[1,1],[1,2,1],[1,3,3,1],[1,4,6,4,1]]'}],approach:'Each row: starts with 1, inner = sum of two above, ends with 1.',java_code:`class Solution {
    public List<List<Integer>> generate(int n) {
        List<List<Integer>> res=new ArrayList<>();
        for(int i=0;i<n;i++){
            List<Integer> row=new ArrayList<>(); row.add(1);
            for(int j=1;j<i;j++) row.add(res.get(i-1).get(j-1)+res.get(i-1).get(j));
            if(i>0)row.add(1); res.add(row);
        }
        return res;
    }
}`,python_code:`class Solution:
    def generate(self, n):
        res=[[1]]
        for i in range(1,n):
            row=[1]+[res[-1][j]+res[-1][j+1] for j in range(len(res[-1])-1)]+[1]
            res.append(row)
        return res`,timeComplex:'O(n²)',spaceComplex:'O(n²)',companies:['TCS','Infosys','Wipro'],leetcodeUrl:'https://leetcode.com/problems/pascals-triangle/'},

{title:'Next Permutation',difficulty:'Medium',topic:'Arrays',description:'Find next lexicographically greater permutation in-place.',examples:[{input:'nums=[1,2,3]',output:'[1,3,2]'},{input:'nums=[3,2,1]',output:'[1,2,3]'}],approach:'Find rightmost i where nums[i]<nums[i+1]. Swap with smallest larger to right. Reverse suffix.',java_code:`class Solution {
    public void nextPermutation(int[] nums) {
        int i=nums.length-2;
        while(i>=0&&nums[i]>=nums[i+1])i--;
        if(i>=0){int j=nums.length-1;while(nums[j]<=nums[i])j--;int t=nums[i];nums[i]=nums[j];nums[j]=t;}
        int l=i+1,r=nums.length-1;
        while(l<r){int t=nums[l];nums[l++]=nums[r];nums[r--]=t;}
    }
}`,python_code:`class Solution:
    def nextPermutation(self, nums):
        i=len(nums)-2
        while i>=0 and nums[i]>=nums[i+1]: i-=1
        if i>=0:
            j=len(nums)-1
            while nums[j]<=nums[i]: j-=1
            nums[i],nums[j]=nums[j],nums[i]
        nums[i+1:]=nums[i+1:][::-1]`,timeComplex:'O(n)',spaceComplex:'O(1)',companies:['Amazon','TCS'],leetcodeUrl:'https://leetcode.com/problems/next-permutation/'},

{title:'Find All Duplicates in Array',difficulty:'Medium',topic:'Arrays',description:'Find all elements appearing twice (elements in range [1,n]).',examples:[{input:'nums=[4,3,2,7,8,2,3,1]',output:'[2,3]'}],approach:'Negate nums[|x|-1]. If already negative, it\'s a duplicate.',java_code:`class Solution {
    public List<Integer> findAllDuplicates(int[] nums) {
        List<Integer> res=new ArrayList<>();
        for(int n:nums){int idx=Math.abs(n)-1;if(nums[idx]<0)res.add(Math.abs(n));else nums[idx]=-nums[idx];}
        return res;
    }
}`,python_code:`class Solution:
    def findAllDuplicates(self, nums):
        res=[]
        for n in nums:
            idx=abs(n)-1
            if nums[idx]<0: res.append(abs(n))
            else: nums[idx]=-nums[idx]
        return res`,timeComplex:'O(n)',spaceComplex:'O(1)',companies:['Amazon','TCS'],leetcodeUrl:'https://leetcode.com/problems/find-all-duplicates-in-an-array/'},

{title:'Best Time to Buy Sell Stock II',difficulty:'Medium',topic:'Arrays',description:'Max profit buying/selling multiple times.',examples:[{input:'prices=[7,1,5,3,6,4]',output:'7'}],approach:'Greedy: collect every upward move.',java_code:`class Solution {
    public int maxProfit(int[] prices) {
        int profit=0;
        for(int i=1;i<prices.length;i++) if(prices[i]>prices[i-1]) profit+=prices[i]-prices[i-1];
        return profit;
    }
}`,python_code:`class Solution:
    def maxProfit(self, prices):
        return sum(max(prices[i]-prices[i-1],0) for i in range(1,len(prices)))`,timeComplex:'O(n)',spaceComplex:'O(1)',companies:['TCS','Amazon','Infosys'],leetcodeUrl:'https://leetcode.com/problems/best-time-to-buy-and-sell-stock-ii/'},

{title:'Kth Largest Element',difficulty:'Medium',topic:'Arrays',description:'Find kth largest element in unsorted array.',examples:[{input:'nums=[3,2,1,5,6,4], k=2',output:'5'}],approach:'Min-heap of size k. Or QuickSelect.',java_code:`class Solution {
    public int findKthLargest(int[] nums, int k) {
        PriorityQueue<Integer> pq=new PriorityQueue<>();
        for(int n:nums){pq.offer(n);if(pq.size()>k)pq.poll();}
        return pq.peek();
    }
}`,python_code:`class Solution:
    def findKthLargest(self, nums, k):
        import heapq
        return heapq.nlargest(k,nums)[-1]`,timeComplex:'O(n log k)',spaceComplex:'O(k)',companies:['Amazon','TCS'],leetcodeUrl:'https://leetcode.com/problems/kth-largest-element-in-an-array/'},

{title:'Two Sum II - Sorted Array',difficulty:'Easy',topic:'Arrays',description:'Two sum on sorted array. Return 1-indexed positions.',examples:[{input:'numbers=[2,7,11,15], target=9',output:'[1,2]'}],approach:'Two pointers. Move based on sum comparison.',java_code:`class Solution {
    public int[] twoSum(int[] numbers, int target) {
        int l=0,r=numbers.length-1;
        while(l<r){int s=numbers[l]+numbers[r];if(s==target)return new int[]{l+1,r+1};else if(s<target)l++;else r--;}
        return new int[]{};
    }
}`,python_code:`class Solution:
    def twoSum(self, numbers, target):
        l,r=0,len(numbers)-1
        while l<r:
            s=numbers[l]+numbers[r]
            if s==target: return [l+1,r+1]
            elif s<target: l+=1
            else: r-=1`,timeComplex:'O(n)',spaceComplex:'O(1)',companies:['TCS','Infosys'],leetcodeUrl:'https://leetcode.com/problems/two-sum-ii-input-array-is-sorted/'},
];
module.exports = arrays;
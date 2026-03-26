const strings = [
{title:'Valid Anagram',difficulty:'Easy',topic:'Strings',description:'Return true if t is an anagram of s.',examples:[{input:'s="anagram",t="nagaram"',output:'true'},{input:'s="rat",t="car"',output:'false'}],approach:'Count frequency array. Increment for s, decrement for t.',java_code:`class Solution {
    public boolean isAnagram(String s, String t) {
        if(s.length()!=t.length())return false;
        int[] cnt=new int[26];
        for(char c:s.toCharArray())cnt[c-'a']++;
        for(char c:t.toCharArray())if(--cnt[c-'a']<0)return false;
        return true;
    }
}`,python_code:`class Solution:
    def isAnagram(self,s,t):
        from collections import Counter
        return Counter(s)==Counter(t)`,timeComplex:'O(n)',spaceComplex:'O(1)',companies:['TCS','Infosys','Wipro','Accenture'],leetcodeUrl:'https://leetcode.com/problems/valid-anagram/'},

{title:'Longest Substring Without Repeating Characters',difficulty:'Medium',topic:'Strings',description:'Length of longest substring without duplicate chars.',examples:[{input:'s="abcabcbb"',output:'3'},{input:'s="bbbbb"',output:'1'}],approach:'Sliding window + HashMap for last index of each char.',java_code:`class Solution {
    public int lengthOfLongestSubstring(String s) {
        Map<Character,Integer> map=new HashMap<>(); int max=0,l=0;
        for(int r=0;r<s.length();r++){
            if(map.containsKey(s.charAt(r)))l=Math.max(l,map.get(s.charAt(r))+1);
            map.put(s.charAt(r),r); max=Math.max(max,r-l+1);
        }
        return max;
    }
}`,python_code:`class Solution:
    def lengthOfLongestSubstring(self,s):
        seen,l,mx={},0,0
        for r,c in enumerate(s):
            if c in seen and seen[c]>=l: l=seen[c]+1
            seen[c]=r; mx=max(mx,r-l+1)
        return mx`,timeComplex:'O(n)',spaceComplex:'O(min(n,m))',companies:['Amazon','Wipro','Cognizant','Zoho'],leetcodeUrl:'https://leetcode.com/problems/longest-substring-without-repeating-characters/'},

{title:'Valid Parentheses',difficulty:'Easy',topic:'Strings',description:'Check if brackets string is valid.',examples:[{input:'s="()[]{}"',output:'true'},{input:'s="(]"',output:'false'}],approach:'Stack. Push opening. For closing, check stack top matches.',java_code:`class Solution {
    public boolean isValid(String s) {
        Stack<Character> st=new Stack<>();
        for(char c:s.toCharArray()){
            if(c=='('||c=='{'||c=='[')st.push(c);
            else{if(st.isEmpty())return false;char t=st.pop();
                if(c==')'&&t!='('||c=='}'&&t!='{'||c==']'&&t!='[')return false;}
        }
        return st.isEmpty();
    }
}`,python_code:`class Solution:
    def isValid(self,s):
        st=[]; mp={')':'(','}'  :'{',']':'['}
        for c in s:
            if c in mp:
                if not st or st[-1]!=mp[c]: return False
                st.pop()
            else: st.append(c)
        return not st`,timeComplex:'O(n)',spaceComplex:'O(n)',companies:['TCS','Amazon','Zoho','Infosys'],leetcodeUrl:'https://leetcode.com/problems/valid-parentheses/'},

{title:'Valid Palindrome',difficulty:'Easy',topic:'Strings',description:'Check palindrome after removing non-alphanumeric and lowercasing.',examples:[{input:'s="A man, a plan, a canal: Panama"',output:'true'}],approach:'Two pointers. Skip non-alphanumeric. Compare lowercase.',java_code:`class Solution {
    public boolean isPalindrome(String s) {
        int l=0,r=s.length()-1;
        while(l<r){
            while(l<r&&!Character.isLetterOrDigit(s.charAt(l)))l++;
            while(l<r&&!Character.isLetterOrDigit(s.charAt(r)))r--;
            if(Character.toLowerCase(s.charAt(l))!=Character.toLowerCase(s.charAt(r)))return false;
            l++;r--;
        }
        return true;
    }
}`,python_code:`class Solution:
    def isPalindrome(self,s):
        f=[c.lower() for c in s if c.isalnum()]
        return f==f[::-1]`,timeComplex:'O(n)',spaceComplex:'O(1)',companies:['TCS','Infosys','Wipro','Cognizant','HCL'],leetcodeUrl:'https://leetcode.com/problems/valid-palindrome/'},

{title:'Longest Common Prefix',difficulty:'Easy',topic:'Strings',description:'Find longest common prefix among array of strings.',examples:[{input:'strs=["flower","flow","flight"]',output:'"fl"'}],approach:'Sort array. Compare only first and last strings.',java_code:`class Solution {
    public String longestCommonPrefix(String[] strs) {
        Arrays.sort(strs); String a=strs[0],b=strs[strs.length-1]; int i=0;
        while(i<a.length()&&a.charAt(i)==b.charAt(i))i++;
        return a.substring(0,i);
    }
}`,python_code:`class Solution:
    def longestCommonPrefix(self,strs):
        pre=strs[0]
        for s in strs[1:]:
            while not s.startswith(pre): pre=pre[:-1]
        return pre`,timeComplex:'O(n*m)',spaceComplex:'O(1)',companies:['TCS','Wipro','Cognizant','HCL'],leetcodeUrl:'https://leetcode.com/problems/longest-common-prefix/'},

{title:'Group Anagrams',difficulty:'Medium',topic:'Strings',description:'Group all anagrams together.',examples:[{input:'strs=["eat","tea","tan","ate","nat","bat"]',output:'[["bat"],["nat","tan"],["ate","eat","tea"]]'}],approach:'Sort each string as key. HashMap grouping.',java_code:`class Solution {
    public List<List<String>> groupAnagrams(String[] strs) {
        Map<String,List<String>> map=new HashMap<>();
        for(String s:strs){char[] ch=s.toCharArray();Arrays.sort(ch);
            map.computeIfAbsent(new String(ch),k->new ArrayList<>()).add(s);}
        return new ArrayList<>(map.values());
    }
}`,python_code:`class Solution:
    def groupAnagrams(self,strs):
        from collections import defaultdict
        mp=defaultdict(list)
        for s in strs: mp[tuple(sorted(s))].append(s)
        return list(mp.values())`,timeComplex:'O(n*k*log k)',spaceComplex:'O(n*k)',companies:['Amazon','Zoho'],leetcodeUrl:'https://leetcode.com/problems/group-anagrams/'},

{title:'Minimum Window Substring',difficulty:'Hard',topic:'Strings',description:'Find minimum window in s containing all chars of t.',examples:[{input:'s="ADOBECODEBANC",t="ABC"',output:'"BANC"'}],approach:'Sliding window. Expand right till all found. Shrink left to minimize.',java_code:`class Solution {
    public String minWindow(String s, String t) {
        Map<Character,Integer> need=new HashMap<>(),win=new HashMap<>();
        for(char c:t.toCharArray())need.merge(c,1,Integer::sum);
        int have=0,req=need.size(),l=0,minL=0,minLen=Integer.MAX_VALUE;
        for(int r=0;r<s.length();r++){
            char c=s.charAt(r);win.merge(c,1,Integer::sum);
            if(need.containsKey(c)&&win.get(c).equals(need.get(c)))have++;
            while(have==req){
                if(r-l+1<minLen){minLen=r-l+1;minL=l;}
                char lc=s.charAt(l);win.merge(lc,-1,Integer::sum);
                if(need.containsKey(lc)&&win.get(lc)<need.get(lc))have--;
                l++;
            }
        }
        return minLen==Integer.MAX_VALUE?"":s.substring(minL,minL+minLen);
    }
}`,python_code:`class Solution:
    def minWindow(self,s,t):
        from collections import Counter,defaultdict
        need=Counter(t);win=defaultdict(int);have=req=len(need);res='';l=0
        for r,c in enumerate(s):
            win[c]+=1
            if c in need and win[c]==need[c]: req-=1
            while req==0:
                if not res or r-l+1<len(res): res=s[l:r+1]
                win[s[l]]-=1
                if s[l] in need and win[s[l]]<need[s[l]]: req+=1
                l+=1
        return res`,timeComplex:'O(n)',spaceComplex:'O(n)',companies:['Amazon','Flipkart'],leetcodeUrl:'https://leetcode.com/problems/minimum-window-substring/'},

{title:'Reverse Words in String',difficulty:'Medium',topic:'Strings',description:'Reverse order of words, remove extra spaces.',examples:[{input:'s="  the sky  is blue  "',output:'"blue is sky the"'}],approach:'Split by spaces filtering empty, reverse, join.',java_code:`class Solution {
    public String reverseWords(String s) {
        String[] w=s.trim().split("\\s+"); StringBuilder sb=new StringBuilder();
        for(int i=w.length-1;i>=0;i--){sb.append(w[i]);if(i>0)sb.append(' ');}
        return sb.toString();
    }
}`,python_code:`class Solution:
    def reverseWords(self,s):
        return ' '.join(reversed(s.split()))`,timeComplex:'O(n)',spaceComplex:'O(n)',companies:['TCS','Infosys','Wipro','Capgemini'],leetcodeUrl:'https://leetcode.com/problems/reverse-words-in-a-string/'},

{title:'Longest Palindromic Substring',difficulty:'Medium',topic:'Strings',description:'Find longest palindromic substring.',examples:[{input:'s="babad"',output:'"bab"'},{input:'s="cbbd"',output:'"bb"'}],approach:'Expand from center for each position (odd and even).',java_code:`class Solution {
    int start=0,maxLen=1;
    public String longestPalindrome(String s) {
        for(int i=0;i<s.length();i++){expand(s,i,i);expand(s,i,i+1);}
        return s.substring(start,start+maxLen);
    }
    void expand(String s,int l,int r){
        while(l>=0&&r<s.length()&&s.charAt(l)==s.charAt(r)){l--;r++;}
        if(r-l-1>maxLen){maxLen=r-l-1;start=l+1;}
    }
}`,python_code:`class Solution:
    def longestPalindrome(self,s):
        res=''
        def expand(l,r):
            nonlocal res
            while l>=0 and r<len(s) and s[l]==s[r]: l-=1;r+=1
            if r-l-1>len(res): res=s[l+1:r]
        for i in range(len(s)): expand(i,i); expand(i,i+1)
        return res`,timeComplex:'O(n²)',spaceComplex:'O(1)',companies:['Amazon','TCS','Infosys'],leetcodeUrl:'https://leetcode.com/problems/longest-palindromic-substring/'},

{title:'String to Integer (atoi)',difficulty:'Medium',topic:'Strings',description:'Convert string to 32-bit signed integer.',examples:[{input:'s="42"',output:'42'},{input:'s="   -42"',output:'-42'}],approach:'Skip spaces, handle sign, parse digits, clamp to int range.',java_code:`class Solution {
    public int myAtoi(String s) {
        s=s.stripLeading();if(s.isEmpty())return 0;
        int sign=1,i=0;long res=0;
        if(s.charAt(0)=='+'||s.charAt(0)=='-'){sign=s.charAt(0)=='+'?1:-1;i++;}
        while(i<s.length()&&Character.isDigit(s.charAt(i))){
            res=res*10+(s.charAt(i++)-'0');
            if(res*sign>Integer.MAX_VALUE)return Integer.MAX_VALUE;
            if(res*sign<Integer.MIN_VALUE)return Integer.MIN_VALUE;
        }
        return(int)res*sign;
    }
}`,python_code:`class Solution:
    def myAtoi(self,s):
        s=s.lstrip();sign=1;i=0;res=0
        if not s: return 0
        if s[0] in '+-': sign=1 if s[0]=='+' else -1;i=1
        while i<len(s) and s[i].isdigit(): res=res*10+int(s[i]);i+=1
        return max(min(res*sign,2**31-1),-2**31)`,timeComplex:'O(n)',spaceComplex:'O(1)',companies:['Amazon','TCS'],leetcodeUrl:'https://leetcode.com/problems/string-to-integer-atoi/'},

{title:'Palindromic Substrings Count',difficulty:'Medium',topic:'Strings',description:'Count all palindromic substrings.',examples:[{input:'s="abc"',output:'3'},{input:'s="aaa"',output:'6'}],approach:'Expand from center for each position. Count each palindrome found.',java_code:`class Solution {
    int count=0;
    public int countSubstrings(String s) {
        for(int i=0;i<s.length();i++){expand(s,i,i);expand(s,i,i+1);}
        return count;
    }
    void expand(String s,int l,int r){
        while(l>=0&&r<s.length()&&s.charAt(l)==s.charAt(r)){count++;l--;r++;}
    }
}`,python_code:`class Solution:
    def countSubstrings(self,s):
        count=0
        def expand(l,r):
            nonlocal count
            while l>=0 and r<len(s) and s[l]==s[r]: count+=1;l-=1;r+=1
        for i in range(len(s)): expand(i,i);expand(i,i+1)
        return count`,timeComplex:'O(n²)',spaceComplex:'O(1)',companies:['Amazon','TCS'],leetcodeUrl:'https://leetcode.com/problems/palindromic-substrings/'},

{title:'Longest Repeating Character Replacement',difficulty:'Medium',topic:'Strings',description:'Replace at most k chars to make longest uniform substring.',examples:[{input:'s="ABAB",k=2',output:'4'}],approach:'Sliding window. Window valid if len - maxFreq <= k.',java_code:`class Solution {
    public int characterReplacement(String s, int k) {
        int[] cnt=new int[26];int l=0,maxCnt=0,res=0;
        for(int r=0;r<s.length();r++){
            maxCnt=Math.max(maxCnt,++cnt[s.charAt(r)-'A']);
            if(r-l+1-maxCnt>k)cnt[s.charAt(l++)-'A']--;
            res=Math.max(res,r-l+1);
        }
        return res;
    }
}`,python_code:`class Solution:
    def characterReplacement(self,s,k):
        cnt=[0]*26;l=max_cnt=res=0
        for r,c in enumerate(s):
            cnt[ord(c)-ord('A')]+=1;max_cnt=max(max_cnt,cnt[ord(c)-ord('A')])
            if r-l+1-max_cnt>k: cnt[ord(s[l])-ord('A')]-=1;l+=1
            res=max(res,r-l+1)
        return res`,timeComplex:'O(n)',spaceComplex:'O(1)',companies:['Amazon'],leetcodeUrl:'https://leetcode.com/problems/longest-repeating-character-replacement/'},

{title:'Permutation in String',difficulty:'Medium',topic:'Strings',description:'Return true if s2 contains a permutation of s1.',examples:[{input:'s1="ab",s2="eidbaooo"',output:'true'}],approach:'Sliding window of size len(s1). Compare freq arrays.',java_code:`class Solution {
    public boolean checkInclusion(String s1, String s2) {
        if(s1.length()>s2.length())return false;
        int[] c1=new int[26],c2=new int[26];
        for(char c:s1.toCharArray())c1[c-'a']++;
        for(int i=0;i<s1.length();i++)c2[s2.charAt(i)-'a']++;
        if(Arrays.equals(c1,c2))return true;
        for(int i=s1.length();i<s2.length();i++){
            c2[s2.charAt(i)-'a']++;c2[s2.charAt(i-s1.length())-'a']--;
            if(Arrays.equals(c1,c2))return true;
        }
        return false;
    }
}`,python_code:`class Solution:
    def checkInclusion(self,s1,s2):
        from collections import Counter
        need=Counter(s1);win=Counter(s2[:len(s1)])
        if need==win: return True
        for i in range(len(s1),len(s2)):
            win[s2[i]]+=1;win[s2[i-len(s1)]]-=1
            if win[s2[i-len(s1)]]==0: del win[s2[i-len(s1)]]
            if need==win: return True
        return False`,timeComplex:'O(n)',spaceComplex:'O(1)',companies:['Amazon'],leetcodeUrl:'https://leetcode.com/problems/permutation-in-string/'},

{title:'Find All Anagrams in String',difficulty:'Medium',topic:'Strings',description:'Return all start indices of anagrams of p in s.',examples:[{input:'s="cbaebabacd",p="abc"',output:'[0,6]'}],approach:'Sliding window of size p. Compare freq arrays.',java_code:`class Solution {
    public List<Integer> findAnagrams(String s, String p) {
        List<Integer> res=new ArrayList<>();
        if(s.length()<p.length())return res;
        int[] pc=new int[26],sc=new int[26];
        for(char c:p.toCharArray())pc[c-'a']++;
        for(int i=0;i<p.length();i++)sc[s.charAt(i)-'a']++;
        if(Arrays.equals(pc,sc))res.add(0);
        for(int i=p.length();i<s.length();i++){
            sc[s.charAt(i)-'a']++;sc[s.charAt(i-p.length())-'a']--;
            if(Arrays.equals(pc,sc))res.add(i-p.length()+1);
        }
        return res;
    }
}`,python_code:`class Solution:
    def findAnagrams(self,s,p):
        from collections import Counter
        need=Counter(p);win=Counter(s[:len(p)]);res=[]
        if need==win: res.append(0)
        for i in range(len(p),len(s)):
            win[s[i]]+=1;win[s[i-len(p)]]-=1
            if win[s[i-len(p)]]==0: del win[s[i-len(p)]]
            if need==win: res.append(i-len(p)+1)
        return res`,timeComplex:'O(n)',spaceComplex:'O(1)',companies:['Amazon'],leetcodeUrl:'https://leetcode.com/problems/find-all-anagrams-in-a-string/'},

{title:'Reverse String',difficulty:'Easy',topic:'Strings',description:'Reverse char array in-place.',examples:[{input:'s=["h","e","l","l","o"]',output:'["o","l","l","e","h"]'}],approach:'Two pointers from both ends, swap.',java_code:`class Solution {
    public void reverseString(char[] s) {
        int l=0,r=s.length-1;
        while(l<r){char t=s[l];s[l++]=s[r];s[r--]=t;}
    }
}`,python_code:`class Solution:
    def reverseString(self,s):
        l,r=0,len(s)-1
        while l<r: s[l],s[r]=s[r],s[l];l+=1;r-=1`,timeComplex:'O(n)',spaceComplex:'O(1)',companies:['TCS','Infosys','Wipro','HCL'],leetcodeUrl:'https://leetcode.com/problems/reverse-string/'},

{title:'First Unique Character',difficulty:'Easy',topic:'Strings',description:'Return index of first non-repeating character. -1 if none.',examples:[{input:'s="leetcode"',output:'0'},{input:'s="aabb"',output:'-1'}],approach:'Count frequencies. Find first with count 1.',java_code:`class Solution {
    public int firstUniqChar(String s) {
        int[] cnt=new int[26];
        for(char c:s.toCharArray())cnt[c-'a']++;
        for(int i=0;i<s.length();i++)if(cnt[s.charAt(i)-'a']==1)return i;
        return -1;
    }
}`,python_code:`class Solution:
    def firstUniqChar(self,s):
        from collections import Counter
        cnt=Counter(s)
        for i,c in enumerate(s):
            if cnt[c]==1: return i
        return -1`,timeComplex:'O(n)',spaceComplex:'O(1)',companies:['TCS','Infosys','Accenture'],leetcodeUrl:'https://leetcode.com/problems/first-unique-character-in-a-string/'},

{title:'Roman to Integer',difficulty:'Easy',topic:'Strings',description:'Convert Roman numeral to integer.',examples:[{input:'s="III"',output:'3'},{input:'s="MCMXCIV"',output:'1994'}],approach:'Process right to left. If current < previous, subtract it.',java_code:`class Solution {
    public int romanToInt(String s) {
        Map<Character,Integer> m=Map.of('I',1,'V',5,'X',10,'L',50,'C',100,'D',500,'M',1000);
        int res=0,prev=0;
        for(int i=s.length()-1;i>=0;i--){int cur=m.get(s.charAt(i));res+=cur<prev?-cur:cur;prev=cur;}
        return res;
    }
}`,python_code:`class Solution:
    def romanToInt(self,s):
        m={'I':1,'V':5,'X':10,'L':50,'C':100,'D':500,'M':1000}
        res=prev=0
        for c in reversed(s): cur=m[c];res+=cur if cur>=prev else -cur;prev=cur
        return res`,timeComplex:'O(n)',spaceComplex:'O(1)',companies:['TCS','Infosys','Wipro'],leetcodeUrl:'https://leetcode.com/problems/roman-to-integer/'},

{title:'Count and Say',difficulty:'Medium',topic:'Strings',description:'Generate nth term of count-and-say sequence.',examples:[{input:'n=4',output:'"1211"'}],approach:'Iteratively build each term by counting consecutive digits.',java_code:`class Solution {
    public String countAndSay(int n) {
        String s="1";
        for(int i=1;i<n;i++){
            StringBuilder sb=new StringBuilder();int j=0;
            while(j<s.length()){char c=s.charAt(j);int cnt=0;while(j<s.length()&&s.charAt(j)==c){cnt++;j++;}sb.append(cnt).append(c);}
            s=sb.toString();
        }
        return s;
    }
}`,python_code:`class Solution:
    def countAndSay(self,n):
        s='1'
        for _ in range(n-1):
            res,i='',0
            while i<len(s):
                c,cnt=s[i],0
                while i<len(s) and s[i]==c: cnt+=1;i+=1
                res+=str(cnt)+c
            s=res
        return s`,timeComplex:'O(2^n)',spaceComplex:'O(2^n)',companies:['TCS NQT','Infosys','Cognizant'],leetcodeUrl:'https://leetcode.com/problems/count-and-say/'},

{title:'Generate Parentheses',difficulty:'Medium',topic:'Strings',description:'Generate all valid combinations of n pairs of parentheses.',examples:[{input:'n=3',output:'["((()))","(()())","(())()","()(())","()()()"]'}],approach:'Backtracking. Add open if open<n, add close if close<open.',java_code:`class Solution {
    public List<String> generateParenthesis(int n) {
        List<String> res=new ArrayList<>();
        bt(res,"",0,0,n);return res;
    }
    void bt(List<String> res,String cur,int open,int close,int n){
        if(cur.length()==2*n){res.add(cur);return;}
        if(open<n)bt(res,cur+'(',open+1,close,n);
        if(close<open)bt(res,cur+')',open,close+1,n);
    }
}`,python_code:`class Solution:
    def generateParenthesis(self,n):
        res=[]
        def bt(cur,open,close):
            if len(cur)==2*n: res.append(cur);return
            if open<n: bt(cur+'(',open+1,close)
            if close<open: bt(cur+')',open,close+1)
        bt('',0,0);return res`,timeComplex:'O(4^n/√n)',spaceComplex:'O(n)',companies:['Amazon','TCS'],leetcodeUrl:'https://leetcode.com/problems/generate-parentheses/'},

{title:'Letter Combinations of Phone Number',difficulty:'Medium',topic:'Strings',description:'All possible letter combinations a phone number could represent.',examples:[{input:'digits="23"',output:'["ad","ae","af","bd","be","bf","cd","ce","cf"]'}],approach:'Backtracking. For each digit try all its letters.',java_code:`class Solution {
    String[] map={"","","abc","def","ghi","jkl","mno","pqrs","tuv","wxyz"};
    public List<String> letterCombinations(String digits) {
        List<String> res=new ArrayList<>();
        if(digits.isEmpty())return res;
        bt(digits,0,new StringBuilder(),res);return res;
    }
    void bt(String d,int i,StringBuilder cur,List<String> res){
        if(i==d.length()){res.add(cur.toString());return;}
        for(char c:map[d.charAt(i)-'0'].toCharArray()){cur.append(c);bt(d,i+1,cur,res);cur.deleteCharAt(cur.length()-1);}
    }
}`,python_code:`class Solution:
    def letterCombinations(self,digits):
        if not digits: return []
        phone={'2':'abc','3':'def','4':'ghi','5':'jkl','6':'mno','7':'pqrs','8':'tuv','9':'wxyz'}
        res=[]
        def bt(i,cur):
            if i==len(digits): res.append(cur);return
            for c in phone[digits[i]]: bt(i+1,cur+c)
        bt(0,'');return res`,timeComplex:'O(4^n)',spaceComplex:'O(n)',companies:['Amazon','TCS'],leetcodeUrl:'https://leetcode.com/problems/letter-combinations-of-a-phone-number/'},

{title:'Is Subsequence',difficulty:'Easy',topic:'Strings',description:'Check if s is a subsequence of t.',examples:[{input:'s="ace",t="abcde"',output:'true'},{input:'s="aec",t="abcde"',output:'false'}],approach:'Two pointers. Advance s pointer only on character match.',java_code:`class Solution {
    public boolean isSubsequence(String s, String t) {
        int i=0,j=0;
        while(i<s.length()&&j<t.length()){if(s.charAt(i)==t.charAt(j))i++;j++;}
        return i==s.length();
    }
}`,python_code:`class Solution:
    def isSubsequence(self,s,t):
        i=0
        for c in t:
            if i<len(s) and c==s[i]: i+=1
        return i==len(s)`,timeComplex:'O(n)',spaceComplex:'O(1)',companies:['TCS','Infosys','Wipro'],leetcodeUrl:'https://leetcode.com/problems/is-subsequence/'},

{title:'Decode Ways',difficulty:'Medium',topic:'Strings',description:'Count ways to decode digit string where A=1...Z=26.',examples:[{input:'s="12"',output:'2'},{input:'s="226"',output:'3'}],approach:'DP. dp[i] = ways for s[0..i-1]. Check 1-digit and 2-digit.',java_code:`class Solution {
    public int numDecodings(String s) {
        if(s.charAt(0)=='0')return 0;
        int n=s.length();int[] dp=new int[n+1];dp[0]=1;dp[1]=1;
        for(int i=2;i<=n;i++){
            if(s.charAt(i-1)!='0')dp[i]+=dp[i-1];
            int two=Integer.parseInt(s.substring(i-2,i));
            if(two>=10&&two<=26)dp[i]+=dp[i-2];
        }
        return dp[n];
    }
}`,python_code:`class Solution:
    def numDecodings(self,s):
        if s[0]=='0': return 0
        n=len(s);dp=[0]*(n+1);dp[0]=dp[1]=1
        for i in range(2,n+1):
            if s[i-1]!='0': dp[i]+=dp[i-1]
            if 10<=int(s[i-2:i])<=26: dp[i]+=dp[i-2]
        return dp[n]`,timeComplex:'O(n)',spaceComplex:'O(n)',companies:['Amazon','TCS'],leetcodeUrl:'https://leetcode.com/problems/decode-ways/'},

{title:'Isomorphic Strings',difficulty:'Easy',topic:'Strings',description:'Determine if two strings are isomorphic (1-to-1 char mapping).',examples:[{input:'s="egg",t="add"',output:'true'},{input:'s="foo",t="bar"',output:'false'}],approach:'Two maps: s→t and t→s. Check both mappings consistent.',java_code:`class Solution {
    public boolean isIsomorphic(String s, String t) {
        Map<Character,Character> st=new HashMap<>(),ts=new HashMap<>();
        for(int i=0;i<s.length();i++){
            char a=s.charAt(i),b=t.charAt(i);
            if((st.containsKey(a)&&st.get(a)!=b)||(ts.containsKey(b)&&ts.get(b)!=a))return false;
            st.put(a,b);ts.put(b,a);
        }
        return true;
    }
}`,python_code:`class Solution:
    def isIsomorphic(self,s,t):
        return len(set(zip(s,t)))==len(set(s))==len(set(t))`,timeComplex:'O(n)',spaceComplex:'O(1)',companies:['TCS','Amazon'],leetcodeUrl:'https://leetcode.com/problems/isomorphic-strings/'},

{title:'Zigzag Conversion',difficulty:'Medium',topic:'Strings',description:'Write string in zigzag pattern on numRows rows, read row by row.',examples:[{input:'s="PAYPALISHIRING",numRows=3',output:'"PAHNAPLSIIGYIR"'}],approach:'Simulate rows. Go down then up alternately.',java_code:`class Solution {
    public String convert(String s, int r) {
        if(r==1)return s;
        StringBuilder[] rows=new StringBuilder[r];
        for(int i=0;i<r;i++)rows[i]=new StringBuilder();
        int cur=0;boolean down=true;
        for(char c:s.toCharArray()){
            rows[cur].append(c);
            if(cur==0)down=true;else if(cur==r-1)down=false;
            cur+=down?1:-1;
        }
        StringBuilder res=new StringBuilder();
        for(StringBuilder sb:rows)res.append(sb);
        return res.toString();
    }
}`,python_code:`class Solution:
    def convert(self,s,r):
        if r==1: return s
        rows=[[] for _ in range(r)];cur=0;step=1
        for c in s:
            rows[cur].append(c)
            if cur==0: step=1
            elif cur==r-1: step=-1
            cur+=step
        return ''.join(''.join(row) for row in rows)`,timeComplex:'O(n)',spaceComplex:'O(n)',companies:['TCS','Infosys'],leetcodeUrl:'https://leetcode.com/problems/zigzag-conversion/'},
];
module.exports = strings;
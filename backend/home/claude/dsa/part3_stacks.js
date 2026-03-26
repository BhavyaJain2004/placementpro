const stacks = [
{title:'Min Stack',difficulty:'Medium',topic:'Stacks & Queues',description:'Design stack with push, pop, top, getMin all in O(1).',examples:[{input:'push(-2),push(0),push(-3),getMin(),pop(),top(),getMin()',output:'-3,0,-2'}],approach:'Two stacks: main and min-tracking. Min stack stores minimum at each level.',java_code:`class MinStack {
    Stack<Integer> st=new Stack<>(),mn=new Stack<>();
    public void push(int v){st.push(v);mn.push(mn.isEmpty()||v<=mn.peek()?v:mn.peek());}
    public void pop(){st.pop();mn.pop();}
    public int top(){return st.peek();}
    public int getMin(){return mn.peek();}
}`,python_code:`class MinStack:
    def __init__(self): self.st=[];self.mn=[]
    def push(self,v): self.st.append(v);self.mn.append(v if not self.mn else min(v,self.mn[-1]))
    def pop(self): self.st.pop();self.mn.pop()
    def top(self): return self.st[-1]
    def getMin(self): return self.mn[-1]`,timeComplex:'O(1) all',spaceComplex:'O(n)',companies:['Amazon','Zoho'],leetcodeUrl:'https://leetcode.com/problems/min-stack/'},

{title:'Daily Temperatures',difficulty:'Medium',topic:'Stacks & Queues',description:'Return days until warmer temperature for each day.',examples:[{input:'temperatures=[73,74,75,71,69,72,76,73]',output:'[1,1,4,2,1,1,0,0]'}],approach:'Monotonic decreasing stack of indices. When warmer found, pop and record difference.',java_code:`class Solution {
    public int[] dailyTemperatures(int[] t) {
        int[] res=new int[t.length]; Stack<Integer> st=new Stack<>();
        for(int i=0;i<t.length;i++){
            while(!st.isEmpty()&&t[st.peek()]<t[i])res[st.peek()]=i-st.pop();
            st.push(i);
        }
        return res;
    }
}`,python_code:`class Solution:
    def dailyTemperatures(self,t):
        res=[0]*len(t);st=[]
        for i,temp in enumerate(t):
            while st and t[st[-1]]<temp: j=st.pop();res[j]=i-j
            st.append(i)
        return res`,timeComplex:'O(n)',spaceComplex:'O(n)',companies:['Amazon','Zoho'],leetcodeUrl:'https://leetcode.com/problems/daily-temperatures/'},

{title:'Next Greater Element I',difficulty:'Easy',topic:'Stacks & Queues',description:'For each element in nums1, find next greater in nums2.',examples:[{input:'nums1=[4,1,2],nums2=[1,3,4,2]',output:'[-1,3,-1]'}],approach:'Monotonic stack on nums2. Map next greater for each element.',java_code:`class Solution {
    public int[] nextGreaterElement(int[] n1, int[] n2) {
        Map<Integer,Integer> map=new HashMap<>();Stack<Integer> st=new Stack<>();
        for(int n:n2){while(!st.isEmpty()&&st.peek()<n)map.put(st.pop(),n);st.push(n);}
        int[] res=new int[n1.length];
        for(int i=0;i<n1.length;i++)res[i]=map.getOrDefault(n1[i],-1);
        return res;
    }
}`,python_code:`class Solution:
    def nextGreaterElement(self,nums1,nums2):
        nge={};st=[]
        for n in nums2:
            while st and st[-1]<n: nge[st.pop()]=n
            st.append(n)
        return [nge.get(n,-1) for n in nums1]`,timeComplex:'O(n+m)',spaceComplex:'O(n)',companies:['TCS NQT','Amazon'],leetcodeUrl:'https://leetcode.com/problems/next-greater-element-i/'},

{title:'Next Greater Element II (Circular)',difficulty:'Medium',topic:'Stacks & Queues',description:'Next greater element in circular array.',examples:[{input:'nums=[1,2,1]',output:'[2,-1,2]'}],approach:'Traverse twice (simulate circular). Monotonic stack with indices.',java_code:`class Solution {
    public int[] nextGreaterElements(int[] nums) {
        int n=nums.length; int[] res=new int[n]; Arrays.fill(res,-1);
        Stack<Integer> st=new Stack<>();
        for(int i=0;i<2*n;i++){
            while(!st.isEmpty()&&nums[st.peek()]<nums[i%n])res[st.pop()]=nums[i%n];
            if(i<n)st.push(i);
        }
        return res;
    }
}`,python_code:`class Solution:
    def nextGreaterElements(self,nums):
        n=len(nums);res=[-1]*n;st=[]
        for i in range(2*n):
            while st and nums[st[-1]]<nums[i%n]: res[st.pop()]=nums[i%n]
            if i<n: st.append(i)
        return res`,timeComplex:'O(n)',spaceComplex:'O(n)',companies:['Amazon'],leetcodeUrl:'https://leetcode.com/problems/next-greater-element-ii/'},

{title:'Largest Rectangle in Histogram',difficulty:'Hard',topic:'Stacks & Queues',description:'Find the largest rectangle area in histogram.',examples:[{input:'heights=[2,1,5,6,2,3]',output:'10'}],approach:'Monotonic increasing stack. For each bar find left/right boundaries.',java_code:`class Solution {
    public int largestRectangleArea(int[] h) {
        Stack<Integer> st=new Stack<>();int max=0;
        for(int i=0;i<=h.length;i++){
            int cur=i==h.length?0:h[i];
            while(!st.isEmpty()&&h[st.peek()]>cur){
                int ht=h[st.pop()];int w=st.isEmpty()?i:i-st.peek()-1;
                max=Math.max(max,ht*w);
            }
            st.push(i);
        }
        return max;
    }
}`,python_code:`class Solution:
    def largestRectangleArea(self,h):
        st=[];mx=0
        for i,v in enumerate(h+[0]):
            while st and h[st[-1]]>v:
                ht=h[st.pop()];w=i if not st else i-st[-1]-1
                mx=max(mx,ht*w)
            st.append(i)
        return mx`,timeComplex:'O(n)',spaceComplex:'O(n)',companies:['Amazon','Flipkart'],leetcodeUrl:'https://leetcode.com/problems/largest-rectangle-in-histogram/'},

{title:'Implement Queue using Stacks',difficulty:'Easy',topic:'Stacks & Queues',description:'Implement FIFO queue using two LIFO stacks.',examples:[{input:'push(1),push(2),peek(),pop(),empty()',output:'1,1,false'}],approach:'Two stacks: inbox and outbox. Pour inbox to outbox when outbox empty.',java_code:`class MyQueue {
    Stack<Integer> in=new Stack<>(),out=new Stack<>();
    public void push(int x){in.push(x);}
    public int pop(){if(out.isEmpty())while(!in.isEmpty())out.push(in.pop());return out.pop();}
    public int peek(){if(out.isEmpty())while(!in.isEmpty())out.push(in.pop());return out.peek();}
    public boolean empty(){return in.isEmpty()&&out.isEmpty();}
}`,python_code:`class MyQueue:
    def __init__(self): self.inbox=[];self.outbox=[]
    def push(self,x): self.inbox.append(x)
    def _transfer(self):
        if not self.outbox:
            while self.inbox: self.outbox.append(self.inbox.pop())
    def pop(self): self._transfer();return self.outbox.pop()
    def peek(self): self._transfer();return self.outbox[-1]
    def empty(self): return not self.inbox and not self.outbox`,timeComplex:'Amortized O(1)',spaceComplex:'O(n)',companies:['TCS','Infosys','Amazon'],leetcodeUrl:'https://leetcode.com/problems/implement-queue-using-stacks/'},

{title:'Implement Stack using Queues',difficulty:'Easy',topic:'Stacks & Queues',description:'Implement LIFO stack using FIFO queues.',examples:[{input:'push(1),push(2),top(),pop(),empty()',output:'2,2,false'}],approach:'Single queue. After push, rotate so new element is at front.',java_code:`class MyStack {
    Queue<Integer> q=new LinkedList<>();
    public void push(int x){q.offer(x);for(int i=0;i<q.size()-1;i++)q.offer(q.poll());}
    public int pop(){return q.poll();}
    public int top(){return q.peek();}
    public boolean empty(){return q.isEmpty();}
}`,python_code:`class MyStack:
    def __init__(self): self.q=[]
    def push(self,x):
        self.q.append(x)
        for _ in range(len(self.q)-1): self.q.append(self.q.pop(0))
    def pop(self): return self.q.pop(0)
    def top(self): return self.q[0]
    def empty(self): return not self.q`,timeComplex:'push O(n), others O(1)',spaceComplex:'O(n)',companies:['TCS','Infosys'],leetcodeUrl:'https://leetcode.com/problems/implement-stack-using-queues/'},

{title:'Evaluate Reverse Polish Notation',difficulty:'Medium',topic:'Stacks & Queues',description:'Evaluate expression in Reverse Polish Notation.',examples:[{input:'tokens=["2","1","+","3","*"]',output:'9'}],approach:'Stack. Push numbers. On operator, pop two, apply, push result.',java_code:`class Solution {
    public int evalRPN(String[] tokens) {
        Stack<Integer> st=new Stack<>();
        for(String t:tokens){
            if("+-*/".contains(t)){int b=st.pop(),a=st.pop();
                switch(t){case "+":st.push(a+b);break;case "-":st.push(a-b);break;case "*":st.push(a*b);break;case "/":st.push(a/b);break;}}
            else st.push(Integer.parseInt(t));
        }
        return st.pop();
    }
}`,python_code:`class Solution:
    def evalRPN(self,tokens):
        st=[]
        for t in tokens:
            if t in '+-*/':
                b,a=st.pop(),st.pop()
                if t=='+': st.append(a+b)
                elif t=='-': st.append(a-b)
                elif t=='*': st.append(a*b)
                else: st.append(int(a/b))
            else: st.append(int(t))
        return st[0]`,timeComplex:'O(n)',spaceComplex:'O(n)',companies:['Amazon'],leetcodeUrl:'https://leetcode.com/problems/evaluate-reverse-polish-notation/'},

{title:'Remove All Adjacent Duplicates',difficulty:'Easy',topic:'Stacks & Queues',description:'Repeatedly remove adjacent duplicate characters.',examples:[{input:'s="abbaca"',output:'"ca"'}],approach:'Stack. If top equals current char, pop. Else push.',java_code:`class Solution {
    public String removeDuplicates(String s) {
        StringBuilder sb=new StringBuilder();
        for(char c:s.toCharArray()){
            if(sb.length()>0&&sb.charAt(sb.length()-1)==c)sb.deleteCharAt(sb.length()-1);
            else sb.append(c);
        }
        return sb.toString();
    }
}`,python_code:`class Solution:
    def removeDuplicates(self,s):
        st=[]
        for c in s:
            if st and st[-1]==c: st.pop()
            else: st.append(c)
        return ''.join(st)`,timeComplex:'O(n)',spaceComplex:'O(n)',companies:['TCS','Infosys'],leetcodeUrl:'https://leetcode.com/problems/remove-all-adjacent-duplicates-in-string/'},

{title:'Remove K Adjacent Duplicates',difficulty:'Medium',topic:'Stacks & Queues',description:'Repeatedly remove k adjacent duplicate characters.',examples:[{input:'s="deeedbbcccbdaa",k=3',output:'"aa"'}],approach:'Stack of (char, count). When count reaches k, pop.',java_code:`class Solution {
    public String removeDuplicates(String s, int k) {
        Stack<int[]> st=new Stack<>();
        for(char c:s.toCharArray()){
            if(!st.isEmpty()&&st.peek()[0]==c)st.peek()[1]++;
            else st.push(new int[]{c,1});
            if(st.peek()[1]==k)st.pop();
        }
        StringBuilder sb=new StringBuilder();
        for(int[] p:st)for(int i=0;i<p[1];i++)sb.append((char)p[0]);
        return sb.toString();
    }
}`,python_code:`class Solution:
    def removeDuplicates(self,s,k):
        st=[]
        for c in s:
            if st and st[-1][0]==c: st[-1][1]+=1
            else: st.append([c,1])
            if st[-1][1]==k: st.pop()
        return ''.join(c*cnt for c,cnt in st)`,timeComplex:'O(n)',spaceComplex:'O(n)',companies:['Amazon'],leetcodeUrl:'https://leetcode.com/problems/remove-all-adjacent-duplicates-in-string-ii/'},

{title:'Asteroid Collision',difficulty:'Medium',topic:'Stacks & Queues',description:'Find state after all asteroid collisions. + moves right, - moves left.',examples:[{input:'asteroids=[5,10,-5]',output:'[5,10]'},{input:'asteroids=[8,-8]',output:'[]'}],approach:'Stack. Positive always survives. Negative collides with top positive.',java_code:`class Solution {
    public int[] asteroidCollision(int[] a) {
        Stack<Integer> st=new Stack<>();
        for(int x:a){
            if(x>0)st.push(x);
            else{
                while(!st.isEmpty()&&st.peek()>0&&st.peek()<-x)st.pop();
                if(st.isEmpty()||st.peek()<0)st.push(x);
                else if(st.peek()==-x)st.pop();
            }
        }
        return st.stream().mapToInt(i->i).toArray();
    }
}`,python_code:`class Solution:
    def asteroidCollision(self,a):
        st=[]
        for x in a:
            if x>0: st.append(x)
            else:
                while st and st[-1]>0 and st[-1]<-x: st.pop()
                if not st or st[-1]<0: st.append(x)
                elif st[-1]==-x: st.pop()
        return st`,timeComplex:'O(n)',spaceComplex:'O(n)',companies:['Amazon'],leetcodeUrl:'https://leetcode.com/problems/asteroid-collision/'},

{title:'Decode String',difficulty:'Medium',topic:'Stacks & Queues',description:'Decode encoded string: k[string] = string repeated k times.',examples:[{input:'s="3[a]2[bc]"',output:'"aaabcbc"'},{input:'s="3[a2[c]]"',output:'"accaccacc"'}],approach:'Stack. Push (count, current_string) on [. Pop and multiply on ].',java_code:`class Solution {
    public String decodeString(String s) {
        Stack<Integer> counts=new Stack<>();Stack<StringBuilder> strs=new Stack<>();
        StringBuilder cur=new StringBuilder();int k=0;
        for(char c:s.toCharArray()){
            if(Character.isDigit(c))k=k*10+(c-'0');
            else if(c=='['){counts.push(k);strs.push(cur);cur=new StringBuilder();k=0;}
            else if(c==']'){int n=counts.pop();StringBuilder prev=strs.pop();for(int i=0;i<n;i++)prev.append(cur);cur=prev;}
            else cur.append(c);
        }
        return cur.toString();
    }
}`,python_code:`class Solution:
    def decodeString(self,s):
        st=[];cur='';k=0
        for c in s:
            if c.isdigit(): k=k*10+int(c)
            elif c=='[': st.append((cur,k));cur='';k=0
            elif c==']': prev,n=st.pop();cur=prev+cur*n
            else: cur+=c
        return cur`,timeComplex:'O(n)',spaceComplex:'O(n)',companies:['Amazon','Zoho'],leetcodeUrl:'https://leetcode.com/problems/decode-string/'},

{title:'Remove K Digits',difficulty:'Medium',topic:'Stacks & Queues',description:'Remove k digits to get smallest possible number.',examples:[{input:'num="1432219",k=3',output:'"1219"'}],approach:'Monotonic increasing stack. Pop when current digit < top and k > 0.',java_code:`class Solution {
    public String removeKdigits(String num, int k) {
        Stack<Character> st=new Stack<>();
        for(char c:num.toCharArray()){
            while(k>0&&!st.isEmpty()&&st.peek()>c){st.pop();k--;}
            st.push(c);
        }
        while(k-->0)st.pop();
        StringBuilder sb=new StringBuilder();
        for(char c:st)sb.append(c);
        while(sb.length()>1&&sb.charAt(0)=='0')sb.deleteCharAt(0);
        return sb.length()==0?"0":sb.toString();
    }
}`,python_code:`class Solution:
    def removeKdigits(self,num,k):
        st=[]
        for c in num:
            while k and st and st[-1]>c: st.pop();k-=1
            st.append(c)
        st=st[:-k] if k else st
        res=''.join(st).lstrip('0')
        return res or '0'`,timeComplex:'O(n)',spaceComplex:'O(n)',companies:['Amazon'],leetcodeUrl:'https://leetcode.com/problems/remove-k-digits/'},

{title:'Simplify Path',difficulty:'Medium',topic:'Stacks & Queues',description:'Simplify Unix-style absolute path.',examples:[{input:'path="/home/"',output:'"/home"'},{input:'path="/../"',output:'"/"'}],approach:'Split by /. Push valid dirs to stack. Pop on "..".',java_code:`class Solution {
    public String simplifyPath(String path) {
        Deque<String> st=new ArrayDeque<>();
        for(String p:path.split("/")){
            if(p.equals("..")){if(!st.isEmpty())st.pollLast();}
            else if(!p.isEmpty()&&!p.equals("."))st.offerLast(p);
        }
        return "/"+String.join("/",st);
    }
}`,python_code:`class Solution:
    def simplifyPath(self,path):
        st=[]
        for p in path.split('/'):
            if p=='..': (st.pop() if st else None)
            elif p and p!='.': st.append(p)
        return '/'+'/'.join(st)`,timeComplex:'O(n)',spaceComplex:'O(n)',companies:['Amazon'],leetcodeUrl:'https://leetcode.com/problems/simplify-path/'},

{title:'Sum of Subarray Minimums',difficulty:'Medium',topic:'Stacks & Queues',description:'Find sum of minimums of all subarrays.',examples:[{input:'arr=[3,1,2,4]',output:'17'}],approach:'Monotonic stack. For each element find left/right boundaries as minimum.',java_code:`class Solution {
    public int sumSubarrayMins(int[] arr) {
        int n=arr.length;long res=0;int MOD=(int)1e9+7;
        int[] left=new int[n],right=new int[n];Stack<Integer> st=new Stack<>();
        for(int i=0;i<n;i++){while(!st.isEmpty()&&arr[st.peek()]>=arr[i])st.pop();left[i]=st.isEmpty()?i+1:i-st.peek();st.push(i);}
        st.clear();
        for(int i=n-1;i>=0;i--){while(!st.isEmpty()&&arr[st.peek()]>arr[i])st.pop();right[i]=st.isEmpty()?n-i:st.peek()-i;st.push(i);}
        for(int i=0;i<n;i++)res=(res+(long)arr[i]*left[i]*right[i])%MOD;
        return(int)res;
    }
}`,python_code:`class Solution:
    def sumSubarrayMins(self,arr):
        n=len(arr);MOD=10**9+7;res=0
        left=[0]*n;right=[0]*n;st=[]
        for i in range(n):
            while st and arr[st[-1]]>=arr[i]: st.pop()
            left[i]=i+1 if not st else i-st[-1]; st.append(i)
        st=[]
        for i in range(n-1,-1,-1):
            while st and arr[st[-1]]>arr[i]: st.pop()
            right[i]=n-i if not st else st[-1]-i; st.append(i)
        for i in range(n): res=(res+arr[i]*left[i]*right[i])%MOD
        return res`,timeComplex:'O(n)',spaceComplex:'O(n)',companies:['Amazon'],leetcodeUrl:'https://leetcode.com/problems/sum-of-subarray-minimums/'},

{title:'Score of Parentheses',difficulty:'Medium',topic:'Stacks & Queues',description:'Compute score: ()=1, AB=A+B, (A)=2*A.',examples:[{input:'s="()"',output:'1'},{input:'s="(())"',output:'2'},{input:'s="()()"',output:'2'}],approach:'Stack tracking score at each nesting level.',java_code:`class Solution {
    public int scoreOfParentheses(String s) {
        Stack<Integer> st=new Stack<>();st.push(0);
        for(char c:s.toCharArray()){
            if(c=='(')st.push(0);
            else{int v=st.pop();int top=st.pop();st.push(top+Math.max(2*v,1));}
        }
        return st.pop();
    }
}`,python_code:`class Solution:
    def scoreOfParentheses(self,s):
        st=[0]
        for c in s:
            if c=='(': st.append(0)
            else: v=st.pop();st[-1]+=max(2*v,1)
        return st[0]`,timeComplex:'O(n)',spaceComplex:'O(n)',companies:['Amazon'],leetcodeUrl:'https://leetcode.com/problems/score-of-parentheses/'},

{title:'Basic Calculator II',difficulty:'Medium',topic:'Stacks & Queues',description:'Evaluate expression string with +,-,*,/.',examples:[{input:'s="3+2*2"',output:'7'},{input:'s=" 3/2 "',output:'1'}],approach:'Stack. Process with preceding operator. * and / computed immediately.',java_code:`class Solution {
    public int calculate(String s) {
        Stack<Integer> st=new Stack<>();int num=0;char op='+';
        for(int i=0;i<s.length();i++){
            char c=s.charAt(i);
            if(Character.isDigit(c))num=num*10+(c-'0');
            if(!Character.isDigit(c)&&c!=' '||i==s.length()-1){
                if(op=='+')st.push(num);else if(op=='-')st.push(-num);
                else if(op=='*')st.push(st.pop()*num);else st.push(st.pop()/num);
                op=c;num=0;
            }
        }
        int res=0;for(int n:st)res+=n;return res;
    }
}`,python_code:`class Solution:
    def calculate(self,s):
        st=[];num=0;op='+'
        for i,c in enumerate(s):
            if c.isdigit(): num=num*10+int(c)
            if c in '+-*/' or i==len(s)-1:
                if op=='+': st.append(num)
                elif op=='-': st.append(-num)
                elif op=='*': st.append(st.pop()*num)
                else: st.append(int(st.pop()/num))
                op=c;num=0
        return sum(st)`,timeComplex:'O(n)',spaceComplex:'O(n)',companies:['Amazon'],leetcodeUrl:'https://leetcode.com/problems/basic-calculator-ii/'},

{title:'Car Fleet',difficulty:'Medium',topic:'Stacks & Queues',description:'Find number of car fleets that arrive at target.',examples:[{input:'target=12,pos=[10,8,0,5,3],speed=[2,4,1,1,3]',output:'3'}],approach:'Sort by position desc. If time <= current fleet time, same fleet.',java_code:`class Solution {
    public int carFleet(int target, int[] pos, int[] speed) {
        int n=pos.length;Integer[] idx=new Integer[n];for(int i=0;i<n;i++)idx[i]=i;
        Arrays.sort(idx,(a,b)->pos[b]-pos[a]);
        int fleets=0;double maxTime=0;
        for(int i:idx){double time=(double)(target-pos[i])/speed[i];if(time>maxTime){fleets++;maxTime=time;}}
        return fleets;
    }
}`,python_code:`class Solution:
    def carFleet(self,target,pos,speed):
        pairs=sorted(zip(pos,speed),reverse=True);st=[]
        for p,s in pairs:
            t=(target-p)/s
            if not st or t>st[-1]: st.append(t)
        return len(st)`,timeComplex:'O(n log n)',spaceComplex:'O(n)',companies:['Amazon'],leetcodeUrl:'https://leetcode.com/problems/car-fleet/'},

{title:'Trapping Rain Water (Stack)',difficulty:'Hard',topic:'Stacks & Queues',description:'Trap rain water using stack-based approach.',examples:[{input:'height=[0,1,0,2,1,0,1,3,2,1,2,1]',output:'6'}],approach:'Stack stores indices. When current > stack top, calculate trapped water.',java_code:`class Solution {
    public int trap(int[] h) {
        Stack<Integer> st=new Stack<>();int res=0;
        for(int i=0;i<h.length;i++){
            while(!st.isEmpty()&&h[st.peek()]<h[i]){
                int bot=h[st.pop()];if(st.isEmpty())break;
                int width=i-st.peek()-1;
                res+=width*(Math.min(h[st.peek()],h[i])-bot);
            }
            st.push(i);
        }
        return res;
    }
}`,python_code:`class Solution:
    def trap(self,h):
        st=[];res=0
        for i,v in enumerate(h):
            while st and h[st[-1]]<v:
                bot=h[st.pop()]
                if not st: break
                w=i-st[-1]-1;res+=w*(min(h[st[-1]],v)-bot)
            st.append(i)
        return res`,timeComplex:'O(n)',spaceComplex:'O(n)',companies:['Amazon','Flipkart'],leetcodeUrl:'https://leetcode.com/problems/trapping-rain-water/'},

{title:'Maximum Frequency Stack',difficulty:'Hard',topic:'Stacks & Queues',description:'FreqStack pops most frequent element, then most recent.',examples:[{input:'push(5,7,5,7,4,5),pop()×3',output:'5,7,5'}],approach:'Freq map + group map (freq→stack). Track maxFreq.',java_code:`class FreqStack {
    Map<Integer,Integer> freq=new HashMap<>();Map<Integer,Deque<Integer>> group=new HashMap<>();int maxFreq=0;
    public void push(int x){int f=freq.merge(x,1,Integer::sum);maxFreq=Math.max(maxFreq,f);group.computeIfAbsent(f,k->new ArrayDeque<>()).push(x);}
    public int pop(){Deque<Integer> stk=group.get(maxFreq);int x=stk.pop();freq.merge(x,-1,Integer::sum);if(stk.isEmpty())maxFreq--;return x;}
}`,python_code:`class FreqStack:
    def __init__(self): self.freq={};self.group={};self.mx=0
    def push(self,x):
        self.freq[x]=self.freq.get(x,0)+1;f=self.freq[x]
        self.mx=max(self.mx,f);self.group.setdefault(f,[]).append(x)
    def pop(self):
        x=self.group[self.mx].pop();self.freq[x]-=1
        if not self.group[self.mx]: self.mx-=1
        return x`,timeComplex:'O(1)',spaceComplex:'O(n)',companies:['Amazon'],leetcodeUrl:'https://leetcode.com/problems/maximum-frequency-stack/'},
];
module.exports = stacks;
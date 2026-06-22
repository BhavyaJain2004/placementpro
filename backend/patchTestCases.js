// backend/patchTestCases.js
// Run: node patchTestCases.js
// Ye script existing questions mein testCases field add karti hai by title match

require('dotenv').config();
const mongoose = require('mongoose');
const Q = require('./models/MasterDSAQuestion');

mongoose.connect(process.env.MONGO_URI).then(() => console.log('DB connected'));

const testCases = [
  {
    title: 'Two Sum',
    testCases: [
      {
        input: 'nums={2,7,11,15}, target=9',
        expected: '[0, 1]',
        driverCode: `
          int[] nums = {2,7,11,15}; int target = 9;
          int[] res = sol.twoSum(nums, target);
          System.out.println(java.util.Arrays.toString(res));`
      },
      {
        input: 'nums={3,2,4}, target=6',
        expected: '[1, 2]',
        driverCode: `
          int[] nums = {3,2,4}; int target = 6;
          int[] res = sol.twoSum(nums, target);
          System.out.println(java.util.Arrays.toString(res));`
      },
    ]
  },
  {
    title: 'Maximum Subarray',
    testCases: [
      {
        input: 'nums={-2,1,-3,4,-1,2,1,-5,4}',
        expected: '6',
        driverCode: `
          int[] nums = {-2,1,-3,4,-1,2,1,-5,4};
          System.out.println(sol.maxSubArray(nums));`
      },
      {
        input: 'nums={1}',
        expected: '1',
        driverCode: `
          int[] nums = {1};
          System.out.println(sol.maxSubArray(nums));`
      },
    ]
  },
  {
    title: 'Best Time to Buy and Sell Stock',
    testCases: [
      {
        input: 'prices={7,1,5,3,6,4}',
        expected: '5',
        driverCode: `
          int[] prices = {7,1,5,3,6,4};
          System.out.println(sol.maxProfit(prices));`
      },
      {
        input: 'prices={7,6,4,3,1}',
        expected: '0',
        driverCode: `
          int[] prices = {7,6,4,3,1};
          System.out.println(sol.maxProfit(prices));`
      },
    ]
  },
  {
    title: 'Contains Duplicate',
    testCases: [
      {
        input: 'nums={1,2,3,1}',
        expected: 'true',
        driverCode: `
          int[] nums = {1,2,3,1};
          System.out.println(sol.containsDuplicate(nums));`
      },
      {
        input: 'nums={1,2,3,4}',
        expected: 'false',
        driverCode: `
          int[] nums = {1,2,3,4};
          System.out.println(sol.containsDuplicate(nums));`
      },
    ]
  },
  {
    title: 'Product of Array Except Self',
    testCases: [
      {
        input: 'nums={1,2,3,4}',
        expected: '[24, 12, 8, 6]',
        driverCode: `
          int[] nums = {1,2,3,4};
          int[] res = sol.productExceptSelf(nums);
          System.out.println(java.util.Arrays.toString(res));`
      },
    ]
  },
  {
    title: 'Container With Most Water',
    testCases: [
      {
        input: 'height={1,8,6,2,5,4,8,3,7}',
        expected: '49',
        driverCode: `
          int[] height = {1,8,6,2,5,4,8,3,7};
          System.out.println(sol.maxArea(height));`
      },
      {
        input: 'height={1,1}',
        expected: '1',
        driverCode: `
          int[] height = {1,1};
          System.out.println(sol.maxArea(height));`
      },
    ]
  },
  {
    title: '3Sum',
    testCases: [
      {
        input: 'nums={-1,0,1,2,-1,-4}',
        expected: '[[-1, -1, 2], [-1, 0, 1]]',
        driverCode: `
          int[] nums = {-1,0,1,2,-1,-4};
          java.util.List<java.util.List<Integer>> res = sol.threeSum(nums);
          res.sort((a,b)->{ for(int i=0;i<Math.min(a.size(),b.size());i++){int c=Integer.compare(a.get(i),b.get(i));if(c!=0)return c;} return 0; });
          System.out.println(res);`
      },
    ]
  },
  {
    title: 'Valid Anagram',
    testCases: [
      {
        input: 's="anagram", t="nagaram"',
        expected: 'true',
        driverCode: `
          System.out.println(sol.isAnagram("anagram","nagaram"));`
      },
      {
        input: 's="rat", t="car"',
        expected: 'false',
        driverCode: `
          System.out.println(sol.isAnagram("rat","car"));`
      },
    ]
  },
  {
    title: 'Move Zeroes',
    testCases: [
      {
        input: 'nums={0,1,0,3,12}',
        expected: '[0, 1, 0, 3, 12]',
        driverCode: `
          int[] nums = {0,1,0,3,12};
          sol.moveZeroes(nums);
          System.out.println(java.util.Arrays.toString(nums));`
      },
    ]
  },
  {
    title: 'Majority Element',
    testCases: [
      {
        input: 'nums={3,2,3}',
        expected: '3',
        driverCode: `
          int[] nums = {3,2,3};
          System.out.println(sol.majorityElement(nums));`
      },
      {
        input: 'nums={2,2,1,1,1,2,2}',
        expected: '2',
        driverCode: `
          int[] nums = {2,2,1,1,1,2,2};
          System.out.println(sol.majorityElement(nums));`
      },
    ]
  },
  {
    title: 'Maximum Product Subarray',
    testCases: [
      {
        input: 'nums={2,3,-2,4}',
        expected: '6',
        driverCode: `
          int[] nums = {2,3,-2,4};
          System.out.println(sol.maxProduct(nums));`
      },
      {
        input: 'nums={-2,0,-1}',
        expected: '0',
        driverCode: `
          int[] nums = {-2,0,-1};
          System.out.println(sol.maxProduct(nums));`
      },
    ]
  },
  {
    title: 'Rotate Array',
    testCases: [
      {
        input: 'nums={1,2,3,4,5,6,7}, k=3',
        expected: '[5, 6, 7, 1, 2, 3, 4]',
        driverCode: `
          int[] nums = {1,2,3,4,5,6,7};
          sol.rotate(nums,3);
          System.out.println(java.util.Arrays.toString(nums));`
      },
    ]
  },
  {
    title: 'Find Minimum in Rotated Sorted Array',
    testCases: [
      {
        input: 'nums={3,4,5,1,2}',
        expected: '1',
        driverCode: `
          int[] nums = {3,4,5,1,2};
          System.out.println(sol.findMin(nums));`
      },
      {
        input: 'nums={4,5,6,7,0,1,2}',
        expected: '0',
        driverCode: `
          int[] nums = {4,5,6,7,0,1,2};
          System.out.println(sol.findMin(nums));`
      },
    ]
  },
  {
    title: 'Search in Rotated Sorted Array',
    testCases: [
      {
        input: 'nums={4,5,6,7,0,1,2}, target=0',
        expected: '4',
        driverCode: `
          int[] nums = {4,5,6,7,0,1,2};
          System.out.println(sol.search(nums,0));`
      },
      {
        input: 'nums={4,5,6,7,0,1,2}, target=3',
        expected: '-1',
        driverCode: `
          int[] nums = {4,5,6,7,0,1,2};
          System.out.println(sol.search(nums,3));`
      },
    ]
  },
  {
    title: 'Merge Intervals',
    testCases: [
      {
        input: 'intervals={{1,3},{2,6},{8,10},{15,18}}',
        expected: '[[1, 6], [8, 10], [15, 18]]',
        driverCode: `
          int[][] intervals = {{1,3},{2,6},{8,10},{15,18}};
          int[][] res = sol.merge(intervals);
          System.out.println(java.util.Arrays.deepToString(res));`
      },
    ]
  },
  {
    title: 'Subarray Sum Equals K',
    testCases: [
      {
        input: 'nums={1,1,1}, k=2',
        expected: '2',
        driverCode: `
          int[] nums = {1,1,1};
          System.out.println(sol.subarraySum(nums,2));`
      },
      {
        input: 'nums={1,2,3}, k=3',
        expected: '2',
        driverCode: `
          int[] nums = {1,2,3};
          System.out.println(sol.subarraySum(nums,3));`
      },
    ]
  },
  {
    title: 'Trapping Rain Water',
    testCases: [
      {
        input: 'height={0,1,0,2,1,0,1,3,2,1,2,1}',
        expected: '6',
        driverCode: `
          int[] height = {0,1,0,2,1,0,1,3,2,1,2,1};
          System.out.println(sol.trap(height));`
      },
    ]
  },
];

async function patch() {
  let updated = 0;
  for (const tc of testCases) {
    const result = await Q.updateOne(
      { title: tc.title },
      { $set: { testCases: tc.testCases } }
    );
    if (result.modifiedCount > 0) {
      console.log(`✅ Updated: ${tc.title}`);
      updated++;
    } else {
      console.log(`⚠️  Not found: ${tc.title}`);
    }
  }
  console.log(`\nDone! ${updated}/${testCases.length} questions updated`);
  mongoose.disconnect();
}

patch().catch(err => { console.error(err); mongoose.disconnect(); });

(window.webpackJsonp=window.webpackJsonp||[]).push([[18],{374:function(n,e,t){"use strict";t.r(e);var s=t(42),i=Object(s.a)({},(function(){var n=this,e=n.$createElement,t=n._self._c||e;return t("ContentSlotsDistributor",{attrs:{"slot-key":n.$parent.slotKey}},[t("h1",{attrs:{id:"leetcode-238-product-of-array-except-self"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#leetcode-238-product-of-array-except-self"}},[n._v("#")]),n._v(" LeetCode-238-Product of Array Except Self")]),n._v(" "),t("p",[n._v("这个"),t("a",{attrs:{href:"https://leetcode.com/problems/product-of-array-except-self/description/",target:"_blank",rel:"noopener noreferrer"}},[n._v("题目"),t("OutboundLink")],1),n._v("的题意非常简单：传入一个数组，然后返回一个新数组，这个新数组中的每个元素是由原来数组的除了对应位置上的以外元素相乘得到的。比如传入[1,2,3,4]，返回[24, 12, 8, 6]。但是有个额外要求，那就是算法的时间复杂度必须是O(n)，空间复杂度是O(n)或O(1)。")]),n._v(" "),t("p",[n._v("思路：如果对时间复杂度没有要求，那么这个题非常简单，就是用两重循环来解决。由于时间复杂度必须是O(n)，也就是说只能使用一重循环来遍历数组，因此我们必须对输入的数组进行一些额外的处理，否则不可能满足要求。我们可以提前计算好每个位置对应的结果，然后在遍历时直接输出即可。")]),n._v(" "),t("p",[n._v("来观察一下示例：假设输入的数组是[a, b, c, d]，那么得到的输出应该是[bcd, acd, abd, abc]。现在的问题是如何得到这个输出？我们可以将这个数组拆成两个数组对应位置上元素的乘积，假设可以拆成A和B的对应元素的乘积。若A[0] = 1，那么B[0] = bcd, 若A[1] = a，则B[1] = cd，若A[2] = ab，则B[2] = d, 若A[3] = abc，则B[3] = 1。如果A和B的元素满足上述假设的话，那么各位上的元素将有非常强的规律性：\n即")]),n._v(" "),t("div",{staticClass:"language- extra-class"},[t("pre",{pre:!0,attrs:{class:"language-text"}},[t("code",[n._v("A[0] = 1; \nA[i] = A[i-1] * nums[i-1];\n\nB[nums.size()-1] = 1;\nB[j-1] = B[j] * nums[j]；\n")])])]),t("p",[n._v("至此整个实现的逻辑就分析清楚了，代码如下：")]),n._v(" "),t("div",{staticClass:"language- extra-class"},[t("pre",{pre:!0,attrs:{class:"language-text"}},[t("code",[n._v("class Solution {\npublic:\n    vector<int> productExceptSelf(vector<int>& nums) {\n        vector<int> p(nums.size());\n        vector<int> q(nums.size());\n        \n        p[0] = 1;\n        for(int i = 1; i < nums.size(); i++) {\n            p[i] = p[i-1] * nums[i-1];\n        }\n        \n        q[nums.size()-1] = 1;\n        for(int i = nums.size()-1;i >= 1; i--) {\n            q[i-1] = q[i] * nums[i];\n        }\n        \n        for(int i = 0; i < nums.size(); i++) {\n            q[i] = q[i] * p[i];\n        }\n        return q;\n    }\n};\n")])])]),t("p",[n._v("这个算法便是时间复杂度和空间复杂度都是O(n)的算法。\n如果仔细观察，我们会发现上述算法中的数组p其实是不必要的，每步计算结果可以用一个int型变量保存，因此上述代码可以优化为：")]),n._v(" "),t("div",{staticClass:"language- extra-class"},[t("pre",{pre:!0,attrs:{class:"language-text"}},[t("code",[n._v("class Solution {\npublic:\n    vector<int> productExceptSelf(vector<int>& nums) {\n        vector<int> q(nums.size());\n        \n        q[nums.size()-1] = 1;\n        for(int i = nums.size()-1;i >= 1; i--) {\n            q[i-1] = q[i] * nums[i];\n        }\n        \n        int p = 1;\n        for(int i = 0; i < nums.size(); i++) {\n            q[i] = q[i] * p;\n            p = p * nums[i];\n        }\n        return q;\n    }\n};\n")])])]),t("p",[n._v("这便是时间复杂度为O(n)而空间复杂度为O(1)的算法。")])])}),[],!1,null,null,null);e.default=i.exports}}]);
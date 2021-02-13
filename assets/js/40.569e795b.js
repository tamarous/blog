(window.webpackJsonp=window.webpackJsonp||[]).push([[40],{396:function(t,r,a){"use strict";a.r(r);var n=a(42),e=Object(n.a)({},(function(){var t=this,r=t.$createElement,a=t._self._c||r;return a("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[a("h1",{attrs:{id:"调整数组中元素的顺序"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#调整数组中元素的顺序"}},[t._v("#")]),t._v(" 调整数组中元素的顺序")]),t._v(" "),a("p",[t._v("这个题是剑指 Offer 上的，题意要求是：输入一个整数数组，实现一个函数来调整该数组中数字的顺序，使得所有的奇数位于数组的前半部分，所有的偶数位于数组的后半部分。")]),t._v(" "),a("p",[a("strong",[t._v("进阶要求")]),t._v("：要求奇数和奇数、偶数和偶数之间的相对顺序保持不变。")]),t._v(" "),a("h2",{attrs:{id:"基础要求"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#基础要求"}},[t._v("#")]),t._v(" 基础要求")]),t._v(" "),a("h3",{attrs:{id:"思路分析"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#思路分析"}},[t._v("#")]),t._v(" 思路分析")]),t._v(" "),a("p",[t._v("首先我们来考虑基础要求，也就是对调整后元素之间的相对顺序不作要求的这种情况。既然是将奇数和偶数调整到数组的前后两部分，也就是将数组分为 Odd 和 Even 两部分，这和快速排序中的 partition 算法的功能相似。因此我们可以仿照 partition 算法的实现来完成调整。具体过程如下：")]),t._v(" "),a("ol",[a("li",[t._v("设置两个指针 left 和 right，分别指向数组的第一个和最后一个元素。")]),t._v(" "),a("li",[t._v("当 left < right 时，让 left 从左向右移动，直到找到一个偶数 a。同时让 right 从右向左移动，直到找到一个奇数 b。")]),t._v(" "),a("li",[t._v("交换奇数 a和偶数 b。")]),t._v(" "),a("li",[t._v("如果 left < right，则进入第2步。否则，循环结束。")])]),t._v(" "),a("h3",{attrs:{id:"代码"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#代码"}},[t._v("#")]),t._v(" 代码")]),t._v(" "),a("div",{staticClass:"language- extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[t._v("class Solution {\npublic:\n    void reOrderArray(vector<int> &array) {\n        int size = array.size();\n        if (size < 2) {\n            return;\n        }\n        int left = 0; \n        int right = size - 1;\n        while(left < right) {\n            while(left < right && !isEven(array[left]) ) {\n                left++;\n            }\n            while(left < right && isEven(array[right])) {\n                right--;\n            }\n            if (left < right) {\n                int temp = array[left];\n                array[left] = array[right];\n                array[right] = temp;\n            }\n        }\n    }\n    bool isEven(int n) {\n        return (n & 1) == 0;\n    }\n};\n")])])]),a("h2",{attrs:{id:"进阶要求"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#进阶要求"}},[t._v("#")]),t._v(" 进阶要求")]),t._v(" "),a("h3",{attrs:{id:"思路分析-2"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#思路分析-2"}},[t._v("#")]),t._v(" 思路分析")]),t._v(" "),a("p",[t._v("在进阶要求里，我们不仅需要将所有奇数调整到数组的前半部分，将偶数调整到数组的后半部分，而且还需要保证原来数组中元素的相对顺序不变。既然原题目中对于空间复杂度没有要求，那么我们可以额外开辟一个数组空间，先扫描一遍，将所有的奇数扫描进数组中，然后再扫描一遍，将所有的偶数按顺序扫描进数组中。这个方法的空间复杂度为 O(n)，而时间复杂度也为 O(n)。")]),t._v(" "),a("h3",{attrs:{id:"代码-2"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#代码-2"}},[t._v("#")]),t._v(" 代码")]),t._v(" "),a("div",{staticClass:"language- extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[t._v("class Solution {\npublic:\n    void reOrderArray(vector<int> &array) {\n        int size = array.size();\n        if (size < 2) {\n            return;\n        }\n        vector<int> result;\n        for(int i = 0; i < size; i++) {\n            if (array[i] % 2 == 1) {\n                result.push_back(array[i]);\n            }\n        }\n        for(int i = 0; i < size; i++) {\n            if (array[i] % 2 == 0) {\n                result.push_back(array[i]);\n            }\n        }\n        array = result;\n    }\n};\n")])])])])}),[],!1,null,null,null);r.default=e.exports}}]);
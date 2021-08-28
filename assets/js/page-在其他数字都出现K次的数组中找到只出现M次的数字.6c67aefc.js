(window.webpackJsonp=window.webpackJsonp||[]).push([[40],{506:function(s,n,a){"use strict";a.r(n);var t=a(1),e=Object(t.a)({},(function(){var s=this,n=s.$createElement,a=s._self._c||n;return a("ContentSlotsDistributor",{attrs:{"slot-key":s.$parent.slotKey}},[a("h1",{attrs:{id:"在其他数字都出现k次的数组中找到只出现m次的数字"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#在其他数字都出现k次的数组中找到只出现m次的数字"}},[s._v("#")]),s._v(" 在其他数字都出现K次的数组中找到只出现M次的数字")]),s._v(" "),a("h2",{attrs:{id:"在其他数字都出现偶数次的数组中找到只出现奇数次的1个数字"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#在其他数字都出现偶数次的数组中找到只出现奇数次的1个数字"}},[s._v("#")]),s._v(" 在其他数字都出现偶数次的数组中找到只出现奇数次的1个数字")]),s._v(" "),a("h3",{attrs:{id:"题目描述"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#题目描述"}},[s._v("#")]),s._v(" 题目描述")]),s._v(" "),a("p",[s._v("给定一个数组 arr，其中只有一个数字出现了奇数次，其他数字都出现了偶数次，找出这个数字。")]),s._v(" "),a("h3",{attrs:{id:"思路"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#思路"}},[s._v("#")]),s._v(" 思路")]),s._v(" "),a("p",[s._v("使用异或运算符。我们可以声明一个变量 x，用它去和数组中的每个元素做异或运算，由于 n ^ n = 0, n ^ 0 = n，那么那些出现偶数次的数字和自身异或，结果为0。最后x中存的就是数组中只出现奇数次次的数字。")]),s._v(" "),a("h3",{attrs:{id:"代码"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#代码"}},[s._v("#")]),s._v(" 代码")]),s._v(" "),a("div",{staticClass:"language- line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[s._v("class Solution {\npublic:\n\tint findOddTimesNum(vector<int> &nums) {\n    \tint x = 0;\n    \tfor(int i = 0; i < nums.size() ;i ++) {\n          \tx ^= nums[i];\n    \t}\n    \treturn x;\n\t}\n};\n")])]),s._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[s._v("1")]),a("br"),a("span",{staticClass:"line-number"},[s._v("2")]),a("br"),a("span",{staticClass:"line-number"},[s._v("3")]),a("br"),a("span",{staticClass:"line-number"},[s._v("4")]),a("br"),a("span",{staticClass:"line-number"},[s._v("5")]),a("br"),a("span",{staticClass:"line-number"},[s._v("6")]),a("br"),a("span",{staticClass:"line-number"},[s._v("7")]),a("br"),a("span",{staticClass:"line-number"},[s._v("8")]),a("br"),a("span",{staticClass:"line-number"},[s._v("9")]),a("br"),a("span",{staticClass:"line-number"},[s._v("10")]),a("br")])]),a("h2",{attrs:{id:"在其他数字都出现偶数次的数组中找到只出现奇数次的两个数字"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#在其他数字都出现偶数次的数组中找到只出现奇数次的两个数字"}},[s._v("#")]),s._v(" 在其他数字都出现偶数次的数组中找到只出现奇数次的两个数字")]),s._v(" "),a("h3",{attrs:{id:"题目描述-2"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#题目描述-2"}},[s._v("#")]),s._v(" 题目描述")]),s._v(" "),a("p",[s._v("给定一个整数数组 arr，已知这个数组中有两个数字只在数组中出现了奇数次，而其他数字都出现了偶数次。找到这两个数字。")]),s._v(" "),a("h3",{attrs:{id:"思路-2"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#思路-2"}},[s._v("#")]),s._v(" 思路")]),s._v(" "),a("p",[s._v("我们首先声明两个变量 x 和 y，让它们的初始值为0。如果该数组中的 a 和 b 都出现了奇数次，那么用 x 和数组中的每个元素异或的最终结果是 x = a ^ b，这个数字不为 0，所以 x 肯定有一个 bit 位是不为 0 的，假设是第 k 位不为 0，那么 a 和 b 中肯定有一个的第 k 位是1，而另外一个的第 k 位是 0。接下来用 y 去和数组中第 k 位为 1 的那些元素来做异或运算，当遍历完成时 y 中的值就是 a 和 b 中的某一个，而 x ^ y 就是另外一个。")]),s._v(" "),a("h3",{attrs:{id:"代码-2"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#代码-2"}},[s._v("#")]),s._v(" 代码")]),s._v(" "),a("div",{staticClass:"language- line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[s._v("class Solution {\npublic:\n    vector<int> singleNumber(vector<int>& nums) {\n        vector<int> result;\n        if(nums.size() < 0) {\n            return result;\n        }\n\n        int x = 0, y = 0;\n        int size = nums.size();\n        for(int i = 0; i < size; i++) {\n            x ^= nums[i];\n        }\n        int temp = x &(~x + 1);\n        for(int i = 0; i < size; i++) {\n            if(temp & nums[i]) {\n                y ^= nums[i];\n            }\n        }\n\n        x = x ^ y;\n        result.push_back(x);\n        result.push_back(y);\n        return result;\n    }\n};\n")])]),s._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[s._v("1")]),a("br"),a("span",{staticClass:"line-number"},[s._v("2")]),a("br"),a("span",{staticClass:"line-number"},[s._v("3")]),a("br"),a("span",{staticClass:"line-number"},[s._v("4")]),a("br"),a("span",{staticClass:"line-number"},[s._v("5")]),a("br"),a("span",{staticClass:"line-number"},[s._v("6")]),a("br"),a("span",{staticClass:"line-number"},[s._v("7")]),a("br"),a("span",{staticClass:"line-number"},[s._v("8")]),a("br"),a("span",{staticClass:"line-number"},[s._v("9")]),a("br"),a("span",{staticClass:"line-number"},[s._v("10")]),a("br"),a("span",{staticClass:"line-number"},[s._v("11")]),a("br"),a("span",{staticClass:"line-number"},[s._v("12")]),a("br"),a("span",{staticClass:"line-number"},[s._v("13")]),a("br"),a("span",{staticClass:"line-number"},[s._v("14")]),a("br"),a("span",{staticClass:"line-number"},[s._v("15")]),a("br"),a("span",{staticClass:"line-number"},[s._v("16")]),a("br"),a("span",{staticClass:"line-number"},[s._v("17")]),a("br"),a("span",{staticClass:"line-number"},[s._v("18")]),a("br"),a("span",{staticClass:"line-number"},[s._v("19")]),a("br"),a("span",{staticClass:"line-number"},[s._v("20")]),a("br"),a("span",{staticClass:"line-number"},[s._v("21")]),a("br"),a("span",{staticClass:"line-number"},[s._v("22")]),a("br"),a("span",{staticClass:"line-number"},[s._v("23")]),a("br"),a("span",{staticClass:"line-number"},[s._v("24")]),a("br"),a("span",{staticClass:"line-number"},[s._v("25")]),a("br"),a("span",{staticClass:"line-number"},[s._v("26")]),a("br")])]),a("h2",{attrs:{id:"在其他数字都出现k次的数组中找到只出现一次的一个数字"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#在其他数字都出现k次的数组中找到只出现一次的一个数字"}},[s._v("#")]),s._v(" 在其他数字都出现K次的数组中找到只出现一次的一个数字")]),s._v(" "),a("h3",{attrs:{id:"题目描述-3"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#题目描述-3"}},[s._v("#")]),s._v(" 题目描述")]),s._v(" "),a("p",[s._v("给定一个整数数组 arr 和一个大于 1 的整数 k。已知 arr 中只有 1 个数出现了 1 次，其他的数字都出现了 k 次。找出这个出现了 1 次的数字。")]),s._v(" "),a("h3",{attrs:{id:"思路-3"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#思路-3"}},[s._v("#")]),s._v(" 思路")]),s._v(" "),a("p",[s._v("声明一个长度为32的整形数组 digit，将这个数组初始化为0。然后遍历数组，计算 arr 中的每一个数字的第i位相加的和，存放在 digit[i] 中。如果我们让 digit[i] 对 K 取模，那么 digit[i] % k 就是 arr 中只出现 1 次的数字第 i 位上的值。因此我们可以从 digit 数组中恢复出要找的那个数字。举个例子：")]),s._v(" "),a("div",{staticClass:"language- line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[s._v("X=***1***1***\n\nZ=***0***0***\n\nX=***1***1***\n\nY=***0***1***\n\nX=***1***1***\n\nZ=***0***0***\n\nZ=***0***0***\n\n     P   Q\n")])]),s._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[s._v("1")]),a("br"),a("span",{staticClass:"line-number"},[s._v("2")]),a("br"),a("span",{staticClass:"line-number"},[s._v("3")]),a("br"),a("span",{staticClass:"line-number"},[s._v("4")]),a("br"),a("span",{staticClass:"line-number"},[s._v("5")]),a("br"),a("span",{staticClass:"line-number"},[s._v("6")]),a("br"),a("span",{staticClass:"line-number"},[s._v("7")]),a("br"),a("span",{staticClass:"line-number"},[s._v("8")]),a("br"),a("span",{staticClass:"line-number"},[s._v("9")]),a("br"),a("span",{staticClass:"line-number"},[s._v("10")]),a("br"),a("span",{staticClass:"line-number"},[s._v("11")]),a("br"),a("span",{staticClass:"line-number"},[s._v("12")]),a("br"),a("span",{staticClass:"line-number"},[s._v("13")]),a("br"),a("span",{staticClass:"line-number"},[s._v("14")]),a("br"),a("span",{staticClass:"line-number"},[s._v("15")]),a("br")])]),a("p",[s._v("X，Y，Z 是数组中的三个数字，X 和 Z 都出现了3次，而 Y 只出现了1次。将这三个数第 P 位上的数字相加，得到3，3 % 3 =0，即是 Y 第 P 位上的数；将第 Q 位上的数字相加，得到4，4 % 3 = 1，即是 Y 第 Q 位上的数字。")]),s._v(" "),a("h3",{attrs:{id:"代码-3"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#代码-3"}},[s._v("#")]),s._v(" 代码")]),s._v(" "),a("div",{staticClass:"language-c++ line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[s._v('int singleNumber(vector<int>& s) \n {\n     vector<int> t(32);////Made a array contain 32 elements.\n     int sz = s.size();\n     int i, j, n;\n     for (i = 0; i < sz; ++i)\n     {\n     \tn = s[i];\n     \tfor (j = 31; j >= 0; --j)\n     \t{\n     \t\tt[j] += n & 1;\n     \t\tn >>= 1;\n     \t\tif (!n)\n     \t\t\tbreak;\n     \t\t}\n     }\n\tint res = 0;\n\tfor (j = 31; j >= 0; --j)\n\t{\n\t\tn = t[j] % 3;//"3" represents k times. \n\t\tif (n) {\n         \tres += 1 << (31 - j);\n\t\t}\n\t}\n\treturn res;\n}\n')])]),s._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[s._v("1")]),a("br"),a("span",{staticClass:"line-number"},[s._v("2")]),a("br"),a("span",{staticClass:"line-number"},[s._v("3")]),a("br"),a("span",{staticClass:"line-number"},[s._v("4")]),a("br"),a("span",{staticClass:"line-number"},[s._v("5")]),a("br"),a("span",{staticClass:"line-number"},[s._v("6")]),a("br"),a("span",{staticClass:"line-number"},[s._v("7")]),a("br"),a("span",{staticClass:"line-number"},[s._v("8")]),a("br"),a("span",{staticClass:"line-number"},[s._v("9")]),a("br"),a("span",{staticClass:"line-number"},[s._v("10")]),a("br"),a("span",{staticClass:"line-number"},[s._v("11")]),a("br"),a("span",{staticClass:"line-number"},[s._v("12")]),a("br"),a("span",{staticClass:"line-number"},[s._v("13")]),a("br"),a("span",{staticClass:"line-number"},[s._v("14")]),a("br"),a("span",{staticClass:"line-number"},[s._v("15")]),a("br"),a("span",{staticClass:"line-number"},[s._v("16")]),a("br"),a("span",{staticClass:"line-number"},[s._v("17")]),a("br"),a("span",{staticClass:"line-number"},[s._v("18")]),a("br"),a("span",{staticClass:"line-number"},[s._v("19")]),a("br"),a("span",{staticClass:"line-number"},[s._v("20")]),a("br"),a("span",{staticClass:"line-number"},[s._v("21")]),a("br"),a("span",{staticClass:"line-number"},[s._v("22")]),a("br"),a("span",{staticClass:"line-number"},[s._v("23")]),a("br"),a("span",{staticClass:"line-number"},[s._v("24")]),a("br"),a("span",{staticClass:"line-number"},[s._v("25")]),a("br"),a("span",{staticClass:"line-number"},[s._v("26")]),a("br")])]),a("p",[s._v("下面这种"),a("a",{attrs:{href:"https://leetcode.com/problems/single-number-ii/discuss/43294/",target:"_blank",rel:"noopener noreferrer"}},[s._v("解法"),a("OutboundLink")],1),s._v("更加神奇：")]),s._v(" "),a("div",{staticClass:"language- line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[s._v("int singleNumber(vector<int> & A) {\n    int b0 = 0, b1 = 0;\n    for(int i = 0; i < A.size(); i++){\n        b0 = (b0 ^ A[i]) & ~b1;\n        b1 = (b1 ^ A[i]) & ~b0;\n    }\n    return b0;\n}\n")])]),s._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[s._v("1")]),a("br"),a("span",{staticClass:"line-number"},[s._v("2")]),a("br"),a("span",{staticClass:"line-number"},[s._v("3")]),a("br"),a("span",{staticClass:"line-number"},[s._v("4")]),a("br"),a("span",{staticClass:"line-number"},[s._v("5")]),a("br"),a("span",{staticClass:"line-number"},[s._v("6")]),a("br"),a("span",{staticClass:"line-number"},[s._v("7")]),a("br"),a("span",{staticClass:"line-number"},[s._v("8")]),a("br")])]),a("p",[s._v("具体解释可参看上面的链接。")])])}),[],!1,null,null,null);n.default=e.exports}}]);
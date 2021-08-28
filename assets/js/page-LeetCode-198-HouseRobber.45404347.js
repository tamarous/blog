(window.webpackJsonp=window.webpackJsonp||[]).push([[19],{488:function(n,r,s){"use strict";s.r(r);var e=s(1),t=Object(e.a)({},(function(){var n=this,r=n.$createElement,s=n._self._c||r;return s("ContentSlotsDistributor",{attrs:{"slot-key":n.$parent.slotKey}},[s("h1",{attrs:{id:"leetcode-198-house-robber"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#leetcode-198-house-robber"}},[n._v("#")]),n._v(" LeetCode-198-House Robber")]),n._v(" "),s("p",[n._v("LeetCode上有一些题目，初看描述时会让人觉得丈二和尚摸不着头脑，绞尽脑汁也想不出解决方法，但看了题解之后会大呼过瘾和巧妙，让人感受到算法的神奇和魅力。今天要说的这个"),s("a",{attrs:{href:"https://leetcode.com/problems/house-robber/description/",target:"_blank",rel:"noopener noreferrer"}},[n._v("题目"),s("OutboundLink")],1),n._v("就具有以上这些特点。\n题目描述是这样的：街上有一排房子，每个房子里都有一定的钱财，你作为一个歹徒要进行规划来抢到最多的钱，而规则是不能进入相邻的两个屋子，否则就会引来警察导致失败。\n本题的讨论区中给出了一个相当简单的解法：")]),n._v(" "),s("div",{staticClass:"language- line-numbers-mode"},[s("pre",{pre:!0,attrs:{class:"language-text"}},[s("code",[n._v("class Solution {\npublic:\n    int rob(vector<int>& nums) {\n        int rob = 0;\n        int notrob = 0;\n        for(int i = 0; i < nums.size(); i++) {\n            int currob = notrob + nums[i];\n            notrob = max(notrob, rob);\n            rob = currob;\n        }\n        return max(rob,notrob);\n    }\n};\n")])]),n._v(" "),s("div",{staticClass:"line-numbers-wrapper"},[s("span",{staticClass:"line-number"},[n._v("1")]),s("br"),s("span",{staticClass:"line-number"},[n._v("2")]),s("br"),s("span",{staticClass:"line-number"},[n._v("3")]),s("br"),s("span",{staticClass:"line-number"},[n._v("4")]),s("br"),s("span",{staticClass:"line-number"},[n._v("5")]),s("br"),s("span",{staticClass:"line-number"},[n._v("6")]),s("br"),s("span",{staticClass:"line-number"},[n._v("7")]),s("br"),s("span",{staticClass:"line-number"},[n._v("8")]),s("br"),s("span",{staticClass:"line-number"},[n._v("9")]),s("br"),s("span",{staticClass:"line-number"},[n._v("10")]),s("br"),s("span",{staticClass:"line-number"},[n._v("11")]),s("br"),s("span",{staticClass:"line-number"},[n._v("12")]),s("br"),s("span",{staticClass:"line-number"},[n._v("13")]),s("br")])]),s("p",[n._v("下面我就把这个解法给分析一下。\n首先定义两个变量来存储最后的结果。在抢劫到第k个房子时，rob表示抢劫了第(k-1)个房子所获得的钱财总数，notrob表示不抢劫第(k-1)个房子获得的钱财总数。对于当前这个房子，只有抢与不抢两种可能，而且"),s("strong",[n._v("当抢了的时候，第(k-1)个房子就不能抢，当不抢时，第(k-1)个房子可抢可不抢")]),n._v("。\n分情况分析：\n（1）抢了这个房子的话，那么现在获得的总钱数currob应该是不抢劫第(k-1)个房子获得的钱财总数加上第k个房子的钱财，即"),s("code",[n._v("currob = notrob+nums[k]")]),n._v("\n（2）不抢这个房子的话，那么不抢第k个房子获得的钱财数应该是不抢第(k-1)个房子的钱财数与抢了第(k-1)个房子的钱财数中的最大值，即"),s("code",[n._v("notrob = max(notrob,rob)")]),n._v("\n在进行下一次循环前，更新一下rob的值。循环结束后，返回rob和notrob中的最大值，即为抢劫了一条街后获得的最大钱财数。\n怎么样，是不是有点豁然开朗了？")])])}),[],!1,null,null,null);r.default=t.exports}}]);
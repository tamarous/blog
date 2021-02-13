(window.webpackJsonp=window.webpackJsonp||[]).push([[14],{370:function(o,r,n){"use strict";n.r(r);var t=n(42),e=Object(t.a)({},(function(){var o=this,r=o.$createElement,n=o._self._c||r;return n("ContentSlotsDistributor",{attrs:{"slot-key":o.$parent.slotKey}},[n("h1",{attrs:{id:"leetcode-198-house-robber"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#leetcode-198-house-robber"}},[o._v("#")]),o._v(" LeetCode-198-House Robber")]),o._v(" "),n("p",[o._v("LeetCode上有一些题目，初看描述时会让人觉得丈二和尚摸不着头脑，绞尽脑汁也想不出解决方法，但看了题解之后会大呼过瘾和巧妙，让人感受到算法的神奇和魅力。今天要说的这个"),n("a",{attrs:{href:"https://leetcode.com/problems/house-robber/description/",target:"_blank",rel:"noopener noreferrer"}},[o._v("题目"),n("OutboundLink")],1),o._v("就具有以上这些特点。\n题目描述是这样的：街上有一排房子，每个房子里都有一定的钱财，你作为一个歹徒要进行规划来抢到最多的钱，而规则是不能进入相邻的两个屋子，否则就会引来警察导致失败。\n本题的讨论区中给出了一个相当简单的解法：")]),o._v(" "),n("div",{staticClass:"language- extra-class"},[n("pre",{pre:!0,attrs:{class:"language-text"}},[n("code",[o._v("class Solution {\npublic:\n    int rob(vector<int>& nums) {\n        int rob = 0;\n        int notrob = 0;\n        for(int i = 0; i < nums.size(); i++) {\n            int currob = notrob + nums[i];\n            notrob = max(notrob, rob);\n            rob = currob;\n        }\n        return max(rob,notrob);\n    }\n};\n")])])]),n("p",[o._v("下面我就把这个解法给分析一下。\n首先定义两个变量来存储最后的结果。在抢劫到第k个房子时，rob表示抢劫了第(k-1)个房子所获得的钱财总数，notrob表示不抢劫第(k-1)个房子获得的钱财总数。对于当前这个房子，只有抢与不抢两种可能，而且"),n("strong",[o._v("当抢了的时候，第(k-1)个房子就不能抢，当不抢时，第(k-1)个房子可抢可不抢")]),o._v("。\n分情况分析：\n（1）抢了这个房子的话，那么现在获得的总钱数currob应该是不抢劫第(k-1)个房子获得的钱财总数加上第k个房子的钱财，即"),n("code",[o._v("currob = notrob+nums[k]")]),o._v("\n（2）不抢这个房子的话，那么不抢第k个房子获得的钱财数应该是不抢第(k-1)个房子的钱财数与抢了第(k-1)个房子的钱财数中的最大值，即"),n("code",[o._v("notrob = max(notrob,rob)")]),o._v("\n在进行下一次循环前，更新一下rob的值。循环结束后，返回rob和notrob中的最大值，即为抢劫了一条街后获得的最大钱财数。\n怎么样，是不是有点豁然开朗了？")])])}),[],!1,null,null,null);r.default=e.exports}}]);
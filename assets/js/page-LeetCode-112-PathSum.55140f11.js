(window.webpackJsonp=window.webpackJsonp||[]).push([[15],{484:function(s,n,a){"use strict";a.r(n);var e=a(1),t=Object(e.a)({},(function(){var s=this,n=s.$createElement,a=s._self._c||n;return a("ContentSlotsDistributor",{attrs:{"slot-key":s.$parent.slotKey}},[a("h1",{attrs:{id:"leetcode-112-path-sum"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#leetcode-112-path-sum"}},[s._v("#")]),s._v(" LeetCode-112-Path Sum")]),s._v(" "),a("p",[s._v("题意描述：给出一棵二叉树和一个数值sum，判断这棵树从树根到某个叶子的路径上的数值之和是否等于sum。\n实例：\n给出下面这棵树和一个数字22，因为5->4->11->2这条路径上的数值之和为22，所以返回true。")]),s._v(" "),a("div",{staticClass:"language- line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[s._v("              5\n             / \\\n            4   8\n           /   / \\\n          11  13  4\n         /  \\      \\\n        7    2      1\n")])]),s._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[s._v("1")]),a("br"),a("span",{staticClass:"line-number"},[s._v("2")]),a("br"),a("span",{staticClass:"line-number"},[s._v("3")]),a("br"),a("span",{staticClass:"line-number"},[s._v("4")]),a("br"),a("span",{staticClass:"line-number"},[s._v("5")]),a("br"),a("span",{staticClass:"line-number"},[s._v("6")]),a("br"),a("span",{staticClass:"line-number"},[s._v("7")]),a("br")])]),a("p",[s._v("思路：这个仍然是一个可以用递归思路解决的问题。首先是写一个辅助函数helper，第一个参数毫无疑问应该留给当前节点，第二个参数应该是与给出的数值有关的量,由于是递归调用，所以如果有返回值的话不好处理，因此我们让helper返回void，那么需要有一个变量来记录是否满足题目要求了，所以第三个参数是一个引用类型的布尔变量，用来标识是否有这样一条路径。\n对于当前节点来说，如果是叶子节点，并且"),a("code",[s._v("路径上前些节点数值之和+当前节点数值 == sum")]),s._v("或者"),a("code",[s._v("sum - 路径上前些节点数值之和 == 当前节点数值")]),s._v("，那么就说明是存在这样一条路径的，返回true；如果不是叶子节点，那么就更新"),a("code",[s._v("路径上前些节点数值之和")]),s._v("，并分别在自己的左右孩子上调用helper方法。\n代码如下（采用的是减法的思路）：")]),s._v(" "),a("div",{staticClass:"language- line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[s._v("class Solution {\n    public:\n        bool hasPathSum(TreeNode* root, int sum) {\n            bool hasSum = false;\n            helper(root, sum, hasSum);\n            return hasSum;\n        }\n    private:\n        void helper(TreeNode *root, int sum, bool &flag) {\n            if (root == NULL) {\n                return;\n            }\n            sum -= root->val;\n            if (root->left == NULL && root->right == NULL) {\n                if (sum == 0) {\n                    flag = true;\n                }\n            } else {\n                if (root->left != NULL) {\n                    helper(root->left, sum, flag);\n                } \n                if (root->right != NULL) {\n                    helper(root->right, sum, flag);\n                }\n            }\n        }\n        sum += root->val;\n};\n")])]),s._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[s._v("1")]),a("br"),a("span",{staticClass:"line-number"},[s._v("2")]),a("br"),a("span",{staticClass:"line-number"},[s._v("3")]),a("br"),a("span",{staticClass:"line-number"},[s._v("4")]),a("br"),a("span",{staticClass:"line-number"},[s._v("5")]),a("br"),a("span",{staticClass:"line-number"},[s._v("6")]),a("br"),a("span",{staticClass:"line-number"},[s._v("7")]),a("br"),a("span",{staticClass:"line-number"},[s._v("8")]),a("br"),a("span",{staticClass:"line-number"},[s._v("9")]),a("br"),a("span",{staticClass:"line-number"},[s._v("10")]),a("br"),a("span",{staticClass:"line-number"},[s._v("11")]),a("br"),a("span",{staticClass:"line-number"},[s._v("12")]),a("br"),a("span",{staticClass:"line-number"},[s._v("13")]),a("br"),a("span",{staticClass:"line-number"},[s._v("14")]),a("br"),a("span",{staticClass:"line-number"},[s._v("15")]),a("br"),a("span",{staticClass:"line-number"},[s._v("16")]),a("br"),a("span",{staticClass:"line-number"},[s._v("17")]),a("br"),a("span",{staticClass:"line-number"},[s._v("18")]),a("br"),a("span",{staticClass:"line-number"},[s._v("19")]),a("br"),a("span",{staticClass:"line-number"},[s._v("20")]),a("br"),a("span",{staticClass:"line-number"},[s._v("21")]),a("br"),a("span",{staticClass:"line-number"},[s._v("22")]),a("br"),a("span",{staticClass:"line-number"},[s._v("23")]),a("br"),a("span",{staticClass:"line-number"},[s._v("24")]),a("br"),a("span",{staticClass:"line-number"},[s._v("25")]),a("br"),a("span",{staticClass:"line-number"},[s._v("26")]),a("br"),a("span",{staticClass:"line-number"},[s._v("27")]),a("br"),a("span",{staticClass:"line-number"},[s._v("28")]),a("br")])]),a("p",[s._v("不过在看了讨论区的解法之后我发觉我写的还是太复杂了，他们的解法如下，更加简洁一些：")]),s._v(" "),a("div",{staticClass:"language- line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[s._v("class Solution {\npublic:\n    bool hasPathSum(TreeNode* root, int sum) {\n        if (root == NULL) {\n            return false;\n        }\n        if (root->left == NULL && root->right == NULL && sum - root->val == 0) {\n            return true;\n        }\n        return hasPathSum(root->left, sum - root->val) || hasPathSum(root->right, sum - root->val);\n    }\n};\n")])]),s._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[s._v("1")]),a("br"),a("span",{staticClass:"line-number"},[s._v("2")]),a("br"),a("span",{staticClass:"line-number"},[s._v("3")]),a("br"),a("span",{staticClass:"line-number"},[s._v("4")]),a("br"),a("span",{staticClass:"line-number"},[s._v("5")]),a("br"),a("span",{staticClass:"line-number"},[s._v("6")]),a("br"),a("span",{staticClass:"line-number"},[s._v("7")]),a("br"),a("span",{staticClass:"line-number"},[s._v("8")]),a("br"),a("span",{staticClass:"line-number"},[s._v("9")]),a("br"),a("span",{staticClass:"line-number"},[s._v("10")]),a("br"),a("span",{staticClass:"line-number"},[s._v("11")]),a("br"),a("span",{staticClass:"line-number"},[s._v("12")]),a("br")])])])}),[],!1,null,null,null);n.default=t.exports}}]);
(window.webpackJsonp=window.webpackJsonp||[]).push([[9],{365:function(e,r,t){"use strict";t.r(r);var o=t(42),n=Object(o.a)({},(function(){var e=this,r=e.$createElement,t=e._self._c||r;return t("ContentSlotsDistributor",{attrs:{"slot-key":e.$parent.slotKey}},[t("h1",{attrs:{id:"leetcode-101-symmetric-tree"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#leetcode-101-symmetric-tree"}},[e._v("#")]),e._v(" LeetCode-101-Symmetric Tree")]),e._v(" "),t("p",[e._v("这道题的题意是判断一棵二叉树是不是对称的，如下图，当一棵树呈现这样的结构时，就可以称作是对称二叉树。")]),e._v(" "),t("p",[t("img",{attrs:{src:"http://www.ideserve.co.in/learn/img/mirrorTree_0.gif",alt:"Symetric Tree"}})]),e._v(" "),t("p",[e._v("我采用的是递归的方法，根据题意，如果输入的根节点为空的话，那么需要返回 NULL；然后调用一个辅助函数来处理根节点的左右子树。在这个辅助函数里面，我们将左右子树作为参数传入，先判断左右子树的结构是否相同，相同的前提下判断这两个镜像位置的节点的数值是否相同，然后递归调用。")]),e._v(" "),t("div",{staticClass:"language- extra-class"},[t("pre",[t("code",[e._v("class Solution {\n    public:\n        bool isSymmetric(TreeNode *root) {\n            if (root == NULL) {\n                return true;\n            }\n            return isSymmetricHelper(root->left, root->right);\n        }\n    private:\n        bool isSymmetricHelper(TreeNode *p,  TreeNode *q) {\n            if (!p && !q) {\n                return true;\n            }\n            if (p == NULL || q == NULL) {\n                return false;\n            }\n            return (p->val == q->val) && isSymmetricHelper(p->left, q->right) && isSymmetricHelper(p->right, q->left);\n        }\n    };\n")])])]),t("p",[e._v("今天刷剑指 offer，发现这道题还有另一种解法：首先定义另一种前序遍历A，也就是访问过父节点后，先遍历右子节点再遍历左子节点。那么一棵对称二叉树的A遍历和它的正常前序遍历结果是一样的。根据这种思路，可以写出如下的算法：")]),e._v(" "),t("div",{staticClass:"language- extra-class"},[t("pre",[t("code",[e._v("class Solution {\npublic:\n    bool isSymmetric(TreeNode *root) {\n        return isSymmetrical(root,root);\n    }    \n    bool isSymmetrical(TreeNode *root1, TreeNode *root2) {\n        if (root1 == NULL && root2 == NULL) {\n            return true;\n        }\n        if (root1 == NULL || root2 == NULL) {\n            return false;\n        }\n        if (root1->val != root2->val) {\n            return false;\n        }\n        return isSymmetrical(root1->left, root2->right) && isSymmetrical(root1->right, root2->left);\n    }\n};\n")])])])])}),[],!1,null,null,null);r.default=n.exports}}]);
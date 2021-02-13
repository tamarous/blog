(window.webpackJsonp=window.webpackJsonp||[]).push([[38],{394:function(r,n,t){"use strict";t.r(n);var e=t(42),o=Object(e.a)({},(function(){var r=this,n=r.$createElement,t=r._self._c||n;return t("ContentSlotsDistributor",{attrs:{"slot-key":r.$parent.slotKey}},[t("h1",{attrs:{id:"由前序和中序遍历恢复二叉树结构"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#由前序和中序遍历恢复二叉树结构"}},[r._v("#")]),r._v(" 由前序和中序遍历恢复二叉树结构")]),r._v(" "),t("p",[r._v("这是一道比较经典的题目，题目来源是"),t("a",{attrs:{href:"https://leetcode.com/problems/construct-binary-tree-from-preorder-and-inorder-traversal/description/",target:"_blank",rel:"noopener noreferrer"}},[r._v("Construct Binary Tree from Preorder and Inorder Traversal"),t("OutboundLink")],1),r._v("。题目大意就是给出一个二叉树的前序和中序遍历的结果，让从这个结果中分析出二叉树的结构来。\n容易知道，一个二叉树的前序遍历的第一个值，就是这个二叉树的根节点的值。知道了根节点后，中序遍历结果中所有位于根节点左侧的值就对应着根节点的左孩子及左孩子的子节点，而位于根节点右侧的值则对应着根节点的右孩子及右孩子的子节点。这样就把根节点找到了，左右孩子的范围也找到了，后续就可以采用递归的思想来依次寻找左右孩子的具体值了。")]),r._v(" "),t("p",[r._v("代码如下：")]),r._v(" "),t("div",{staticClass:"language- extra-class"},[t("pre",[t("code",[r._v("class Solution\n{\npublic:\n    TreeNode *buildTree(vector<int>&preorder,vector<int>& inorder) {\n        if (preorder.size() == 0 || inorder.size() == 0) {\n            return NULL;\n        }\n        if (preorder.size() != inorder.size()) {\n            return NULL;\n        }\n        int length = preorder.size();\n        int *start_pre = &preorder[0];\n        int *start_in = &inorder[0];\n        return construct(start_pre,start_pre+length-1,start_in,start_in+length-1);\n    }\nprivate:\n    TreeNode *construct(int *start_pre,int *end_pre, int *start_in,int *end_in) {\n        int value = start_pre[0];\n        TreeNode *root = new TreeNode(0);\n        root->val = value;\n        root->left = root->right = NULL;\n        if (start_pre == end_pre) {\n            if (start_in == end_in && *start_pre == *start_in) {\n                return root;\n            } else {\n                return NULL;\n            }\n        }\n\n        int *rootInOrder = start_in;\n        while(rootInOrder != end_in && *rootInOrder != value) {\n            rootInOrder++;\n        }\n\n        if (rootInOrder == end_in && *rootInOrder != *end_in) {\n            return NULL;\n        }\n\n        int leftLength = rootInOrder-start_in;\n        if (leftLength > 0) {\n            root->left = construct(start_pre+1,start_pre+leftLength,start_in,rootInOrder-1);\n        } \n        if (leftLength < end_pre - start_pre) {\n            root->right = construct(start_pre+1+leftLength,end_pre,rootInOrder+1,end_in);\n        }\n        return root;\n    }\n};\n")])])])])}),[],!1,null,null,null);n.default=o.exports}}]);
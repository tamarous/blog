(window.webpackJsonp=window.webpackJsonp||[]).push([[37],{482:function(s,r,n){"use strict";n.r(r);var e=n(1),a=Object(e.a)({},(function(){var s=this,r=s.$createElement,n=s._self._c||r;return n("ContentSlotsDistributor",{attrs:{"slot-key":s.$parent.slotKey}},[n("h1",{attrs:{id:"二叉树的-morris-遍历"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#二叉树的-morris-遍历"}},[s._v("#")]),s._v(" 二叉树的 Morris 遍历")]),s._v(" "),n("blockquote",[n("p",[s._v("转载自："),n("a",{attrs:{href:"https://www.cnblogs.com/AnnieKim/archive/2013/06/15/MorrisTraversal.html",target:"_blank",rel:"noopener noreferrer"}},[s._v("Morris Traversal方法遍历二叉树（非递归，不用栈，O(1)空间）"),n("OutboundLink")],1),s._v("，有所修改。")])]),s._v(" "),n("p",[s._v("Morris 遍历是由 Joseph Morris 于1979年发明的，这种遍历方法与递归以及非递归遍历方法相比，其时间复杂度为 O(n)，而空间复杂度只要 O(1)。在某些场合下，其空间复杂度为常数的特性非常有用，因此我们有必要了解和掌握它是如何实现的。")]),s._v(" "),n("h2",{attrs:{id:"中序遍历"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#中序遍历"}},[s._v("#")]),s._v(" 中序遍历")]),s._v(" "),n("p",[s._v("过程：")]),s._v(" "),n("ol",[n("li",[s._v("如果当前节点的左孩子为空，则输出当前节点并将当前节点更新为它的右孩子。")]),s._v(" "),n("li",[s._v("如果当前节点的左孩子不为空，在当前节点的左子树中找到它的最右节点。")]),s._v(" "),n("li",[s._v("(a) 如果最右节点的右孩子为空，将它的右孩子设置为当前节点，而当前节点更新为当前节点的左孩子。(b) 如果最右节点的右孩子为当前节点，那么将最右节点的右孩子设置为 NULL，输出当前节点，当前节点更新为当前节点的右孩子。")]),s._v(" "),n("li",[s._v("重复上述过程，直到当前节点为 NULL。")])]),s._v(" "),n("div",{staticClass:"language- line-numbers-mode"},[n("pre",{pre:!0,attrs:{class:"language-text"}},[n("code",[s._v('class Solution {\npublic:\n    void MorrisInOrder(TreeNode *root) {\n        TreeNode *cur = head, *prev = NULL;\n        while(cur != NULL) {\n            if (cur->left == NULL) { // 1\n                printf("%d ",cur->val);\n                cur = cur->right;\n            } else {\n                prev = cur->left;\n                // 2\n                while(prev->right != NULL && prev->right != cur) {\n                    prev = prev->right;\n                }\n                if (prev->right == NULL) { // 3.a\n                    prev->right = cur;\n                    cur = cur->left;\n                } else {\n                    prev->right = NULL;   // 3.b\n                    printf("%d ",cur->val);\n                    cur = cur->right;\n                }\n            }\n        }\n    }\n};\n')])]),s._v(" "),n("div",{staticClass:"line-numbers-wrapper"},[n("span",{staticClass:"line-number"},[s._v("1")]),n("br"),n("span",{staticClass:"line-number"},[s._v("2")]),n("br"),n("span",{staticClass:"line-number"},[s._v("3")]),n("br"),n("span",{staticClass:"line-number"},[s._v("4")]),n("br"),n("span",{staticClass:"line-number"},[s._v("5")]),n("br"),n("span",{staticClass:"line-number"},[s._v("6")]),n("br"),n("span",{staticClass:"line-number"},[s._v("7")]),n("br"),n("span",{staticClass:"line-number"},[s._v("8")]),n("br"),n("span",{staticClass:"line-number"},[s._v("9")]),n("br"),n("span",{staticClass:"line-number"},[s._v("10")]),n("br"),n("span",{staticClass:"line-number"},[s._v("11")]),n("br"),n("span",{staticClass:"line-number"},[s._v("12")]),n("br"),n("span",{staticClass:"line-number"},[s._v("13")]),n("br"),n("span",{staticClass:"line-number"},[s._v("14")]),n("br"),n("span",{staticClass:"line-number"},[s._v("15")]),n("br"),n("span",{staticClass:"line-number"},[s._v("16")]),n("br"),n("span",{staticClass:"line-number"},[s._v("17")]),n("br"),n("span",{staticClass:"line-number"},[s._v("18")]),n("br"),n("span",{staticClass:"line-number"},[s._v("19")]),n("br"),n("span",{staticClass:"line-number"},[s._v("20")]),n("br"),n("span",{staticClass:"line-number"},[s._v("21")]),n("br"),n("span",{staticClass:"line-number"},[s._v("22")]),n("br"),n("span",{staticClass:"line-number"},[s._v("23")]),n("br"),n("span",{staticClass:"line-number"},[s._v("24")]),n("br"),n("span",{staticClass:"line-number"},[s._v("25")]),n("br"),n("span",{staticClass:"line-number"},[s._v("26")]),n("br")])]),n("p",[s._v("借用下"),n("a",{attrs:{href:"http://www.cnblogs.com/anniekim/archive/2013/06/15/morristraversal.html",target:"_blank",rel:"noopener noreferrer"}},[s._v("这篇博客"),n("OutboundLink")],1),s._v("中的图片：")]),s._v(" "),n("p",[n("img",{attrs:{src:"https://images0.cnblogs.com/blog/300640/201306/14214057-7cc645706e7741e3b5ed62b320000354.jpg",alt:"Morris InOrder"}})]),s._v(" "),n("p",[s._v("我们来看下以这幅图中的树为例，对其进行 Morris 中序遍历的过程。")]),s._v(" "),n("ol",[n("li",[s._v("cur = 6，左孩子不为空所以进入步骤2，cur 的左子树的最右节点是5，5的右孩子为空，所以让5的右孩子指向6，然后让 cur = 2。")]),s._v(" "),n("li",[s._v("cur = 2，左孩子不为空进入步骤2，2的最右节点为1，1的右孩子为空，所以把1的右孩子设置为2，然后让 cur = 1。")]),s._v(" "),n("li",[s._v("cur = 1，1的左孩子为空，所以进入步骤1，输出1，其右孩子为2，所以重新让 cur = 2。")]),s._v(" "),n("li",[s._v("2的最右节点是1，而1的右孩子为2，所以将1的右孩子重新设置为空，然后输出2，让 cur = 4。")]),s._v(" "),n("li",[s._v("cur = 4，左孩子不为空进入步骤2，4的最右节点为3，3的右孩子为空，所以把3的右孩子设置为4，然后让 cur = 3。")]),s._v(" "),n("li",[s._v("cur = 3，左孩子为空，所以进入步骤1，输出3，由于3的右孩子为4，所以重新让 cur = 4。")]),s._v(" "),n("li",[s._v("cur = 4，最右节点为3，3的右孩子为4，所以将3的节点重新设为空，然后输出4，让 cur = 5。")]),s._v(" "),n("li",[s._v("cur = 5，左孩子为空，所以输出5，5的右孩子为6，因此让 cur = 6。")])]),s._v(" "),n("p",[s._v("经历了以上几步，这棵树的左子树已经全部遍历完了。右子树的遍历和左子树是类似的，结合图片和上述过程应该比较容易理解了，就不在解释了。")]),s._v(" "),n("h2",{attrs:{id:"前序遍历"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#前序遍历"}},[s._v("#")]),s._v(" 前序遍历")]),s._v(" "),n("p",[s._v("前序遍历和中序遍历的过程基本一样，唯一的不同点在于打印的位置不同。过程：")]),s._v(" "),n("ol",[n("li",[s._v("如果当前节点的左节点为空，那么输出当前节点并将当前节点更新为它的右孩子。")]),s._v(" "),n("li",[s._v("如果当前节点的左节点不为空，在当前节点的左子树中找到它的最右节点。")]),s._v(" "),n("li",[s._v("(a) 如果最右节点的右孩子为空，将它的右孩子设置为当前节点。"),n("strong",[s._v("输出当前节点(与中序遍历唯一的不同点)")]),s._v("，将当前节点更新为当前节点的左孩子。(b) 如果最右节点的右孩子为当前节点，那么将它的右孩子重新设置为空，然后将当前节点更新为当前节点的右孩子。")]),s._v(" "),n("li",[s._v("重复上述过程，直到当前节点为 NULL。")])]),s._v(" "),n("div",{staticClass:"language- line-numbers-mode"},[n("pre",{pre:!0,attrs:{class:"language-text"}},[n("code",[s._v('class Solution {\npublic:\n    void MorrisPreOrder(TreeNode *root) {\n        TreeNode *cur = head, *prev = NULL;\n        while(cur != NULL) {\n            if (cur->left == NULL) { // 1\n                printf("%d ",cur->val);\n                cur = cur->right;\n            } else {\n                prev = cur->left;\n                \n                while(prev->right != NULL && prev->right != cur) { // 2\n                    prev = prev->right;\n                }\n                if (prev->right == NULL) { // 3.a\n                    prev->right = cur;\n                    printf("%d ",cur->val);\n                    cur = cur->left;\n                } else {\n                    prev->right = NULL;   // 3.b\n                    cur = cur->right;\n                }\n            }\n        }\n    }\n};\n')])]),s._v(" "),n("div",{staticClass:"line-numbers-wrapper"},[n("span",{staticClass:"line-number"},[s._v("1")]),n("br"),n("span",{staticClass:"line-number"},[s._v("2")]),n("br"),n("span",{staticClass:"line-number"},[s._v("3")]),n("br"),n("span",{staticClass:"line-number"},[s._v("4")]),n("br"),n("span",{staticClass:"line-number"},[s._v("5")]),n("br"),n("span",{staticClass:"line-number"},[s._v("6")]),n("br"),n("span",{staticClass:"line-number"},[s._v("7")]),n("br"),n("span",{staticClass:"line-number"},[s._v("8")]),n("br"),n("span",{staticClass:"line-number"},[s._v("9")]),n("br"),n("span",{staticClass:"line-number"},[s._v("10")]),n("br"),n("span",{staticClass:"line-number"},[s._v("11")]),n("br"),n("span",{staticClass:"line-number"},[s._v("12")]),n("br"),n("span",{staticClass:"line-number"},[s._v("13")]),n("br"),n("span",{staticClass:"line-number"},[s._v("14")]),n("br"),n("span",{staticClass:"line-number"},[s._v("15")]),n("br"),n("span",{staticClass:"line-number"},[s._v("16")]),n("br"),n("span",{staticClass:"line-number"},[s._v("17")]),n("br"),n("span",{staticClass:"line-number"},[s._v("18")]),n("br"),n("span",{staticClass:"line-number"},[s._v("19")]),n("br"),n("span",{staticClass:"line-number"},[s._v("20")]),n("br"),n("span",{staticClass:"line-number"},[s._v("21")]),n("br"),n("span",{staticClass:"line-number"},[s._v("22")]),n("br"),n("span",{staticClass:"line-number"},[s._v("23")]),n("br"),n("span",{staticClass:"line-number"},[s._v("24")]),n("br"),n("span",{staticClass:"line-number"},[s._v("25")]),n("br"),n("span",{staticClass:"line-number"},[s._v("26")]),n("br")])]),n("p",[n("img",{attrs:{src:"https://images0.cnblogs.com/blog/300640/201306/14221458-aa5f9e92cce743ccacbc735048133058.jpg",alt:"Morris PreOrder"}})]),s._v(" "),n("h2",{attrs:{id:"后序遍历"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#后序遍历"}},[s._v("#")]),s._v(" 后序遍历")]),s._v(" "),n("p",[s._v("后续遍历又是最为复杂的一个。我们需要建立一个额外节点 dummy，然后将根节点设置为dummy 的左孩子。过程：")]),s._v(" "),n("ol",[n("li",[s._v("建立一个额外节点 dummy，然后将根节点设置为 dummy 的左孩子。")]),s._v(" "),n("li",[s._v("如果当前节点的左孩子为空，则将其右孩子作为当前节点。")]),s._v(" "),n("li",[s._v("如果当前节点的左孩子不为空，在当前节点的左子树中找到它的最右节点。")]),s._v(" "),n("li",[s._v("(a) 如果最右节点的右孩子为空，则将最右节点的右孩子设置为当前节点，而当前节点更新为当前节点的左孩子。(b) 如果最右节点的右孩子为当前节点，将它的右孩子重新设为空。"),n("strong",[s._v("倒序输出从当前节点的左孩子到该最右节点路径上的所有节点")]),s._v("，然后将当前节点更新为当前节点的右孩子。")]),s._v(" "),n("li",[s._v("重复以上过程，直到当前节点为NULL。")])]),s._v(" "),n("div",{staticClass:"language- line-numbers-mode"},[n("pre",{pre:!0,attrs:{class:"language-text"}},[n("code",[s._v('class Solution {\npublic:\n    void MorrisPostOrder(TreeNode *root) {\n        TreeNode *dummy = new TreeNode(0);\n        dummy->left = root;\n        TreeNode *cur = dummy, *prev = NULL;\n        while(cur != NULL) {\n            if (cur->left == NULL) {\n                cur = cur->right;\n            } else {\n                prev = cur->left;\n                \n                while(prev->right != NULL && prev->right != cur) { \n                    prev = prev->right;\n                }\n                if (prev->right == NULL) { \n                    prev->right = cur;\n                    cur = cur->left;\n                } else {\n                    printReverse(cur->left, prev);\n                    prev->right = NULL;\n                    cur = cur->right;\n                }\n            }\n        }\n    }\n    \n    void reverse(TreeNode *from, TreeNode *to) {\n        if (from == to) {\n            return;\n        }\n        TreeNode *x = from, *y = from->right, *z;\n        while (true) {\n            z = y->right;\n            y->right = x;\n            x = y;\n            y = z;\n            if (x == to)\n                break;\n        }\n    }\n\n    void printReverse(TreeNode* from, TreeNode *to) {\n        reverse(from, to);\n        \n        TreeNode *p = to;\n        while (true) {\n            printf("%d ", p->val);\n            if (p == from)\n                break;\n            p = p->right;\n        }\n        \n        reverse(to, from);\n    }\n};\n')])]),s._v(" "),n("div",{staticClass:"line-numbers-wrapper"},[n("span",{staticClass:"line-number"},[s._v("1")]),n("br"),n("span",{staticClass:"line-number"},[s._v("2")]),n("br"),n("span",{staticClass:"line-number"},[s._v("3")]),n("br"),n("span",{staticClass:"line-number"},[s._v("4")]),n("br"),n("span",{staticClass:"line-number"},[s._v("5")]),n("br"),n("span",{staticClass:"line-number"},[s._v("6")]),n("br"),n("span",{staticClass:"line-number"},[s._v("7")]),n("br"),n("span",{staticClass:"line-number"},[s._v("8")]),n("br"),n("span",{staticClass:"line-number"},[s._v("9")]),n("br"),n("span",{staticClass:"line-number"},[s._v("10")]),n("br"),n("span",{staticClass:"line-number"},[s._v("11")]),n("br"),n("span",{staticClass:"line-number"},[s._v("12")]),n("br"),n("span",{staticClass:"line-number"},[s._v("13")]),n("br"),n("span",{staticClass:"line-number"},[s._v("14")]),n("br"),n("span",{staticClass:"line-number"},[s._v("15")]),n("br"),n("span",{staticClass:"line-number"},[s._v("16")]),n("br"),n("span",{staticClass:"line-number"},[s._v("17")]),n("br"),n("span",{staticClass:"line-number"},[s._v("18")]),n("br"),n("span",{staticClass:"line-number"},[s._v("19")]),n("br"),n("span",{staticClass:"line-number"},[s._v("20")]),n("br"),n("span",{staticClass:"line-number"},[s._v("21")]),n("br"),n("span",{staticClass:"line-number"},[s._v("22")]),n("br"),n("span",{staticClass:"line-number"},[s._v("23")]),n("br"),n("span",{staticClass:"line-number"},[s._v("24")]),n("br"),n("span",{staticClass:"line-number"},[s._v("25")]),n("br"),n("span",{staticClass:"line-number"},[s._v("26")]),n("br"),n("span",{staticClass:"line-number"},[s._v("27")]),n("br"),n("span",{staticClass:"line-number"},[s._v("28")]),n("br"),n("span",{staticClass:"line-number"},[s._v("29")]),n("br"),n("span",{staticClass:"line-number"},[s._v("30")]),n("br"),n("span",{staticClass:"line-number"},[s._v("31")]),n("br"),n("span",{staticClass:"line-number"},[s._v("32")]),n("br"),n("span",{staticClass:"line-number"},[s._v("33")]),n("br"),n("span",{staticClass:"line-number"},[s._v("34")]),n("br"),n("span",{staticClass:"line-number"},[s._v("35")]),n("br"),n("span",{staticClass:"line-number"},[s._v("36")]),n("br"),n("span",{staticClass:"line-number"},[s._v("37")]),n("br"),n("span",{staticClass:"line-number"},[s._v("38")]),n("br"),n("span",{staticClass:"line-number"},[s._v("39")]),n("br"),n("span",{staticClass:"line-number"},[s._v("40")]),n("br"),n("span",{staticClass:"line-number"},[s._v("41")]),n("br"),n("span",{staticClass:"line-number"},[s._v("42")]),n("br"),n("span",{staticClass:"line-number"},[s._v("43")]),n("br"),n("span",{staticClass:"line-number"},[s._v("44")]),n("br"),n("span",{staticClass:"line-number"},[s._v("45")]),n("br"),n("span",{staticClass:"line-number"},[s._v("46")]),n("br"),n("span",{staticClass:"line-number"},[s._v("47")]),n("br"),n("span",{staticClass:"line-number"},[s._v("48")]),n("br"),n("span",{staticClass:"line-number"},[s._v("49")]),n("br"),n("span",{staticClass:"line-number"},[s._v("50")]),n("br"),n("span",{staticClass:"line-number"},[s._v("51")]),n("br"),n("span",{staticClass:"line-number"},[s._v("52")]),n("br"),n("span",{staticClass:"line-number"},[s._v("53")]),n("br"),n("span",{staticClass:"line-number"},[s._v("54")]),n("br"),n("span",{staticClass:"line-number"},[s._v("55")]),n("br"),n("span",{staticClass:"line-number"},[s._v("56")]),n("br")])]),n("p",[n("img",{attrs:{src:"https://images0.cnblogs.com/blog/300640/201306/15165951-7991525829134fb3beefed9fbf7e0536.jpg",alt:"Morris PostOrder"}})]),s._v(" "),n("p",[s._v("下面以图中的树为例，分析下 Morris 后序遍历的过程。")]),s._v(" "),n("ol",[n("li",[s._v("新建一个额外节点0，将它设为当前节点，然后将根节点9设置为它的左孩子。")]),s._v(" "),n("li",[s._v("cur = 0，它的左孩子不为空，在0的左子树中寻找最右节点，为7。")]),s._v(" "),n("li",[s._v("因为7的右孩子为空，所以将7的右孩子设置为当前节点0，然后将当前节点0更新为0的左孩子9。")]),s._v(" "),n("li",[s._v("cur = 9，由于9的左孩子不为空，因此在9的左子树中寻找它的最右节点，为3。")]),s._v(" "),n("li",[s._v("因为3的右孩子为空，所以将3的右孩子设置为当前节点9，然后将当前节点9更新为9的左孩子5。")]),s._v(" "),n("li",[s._v("cur = 5，它的左孩子不为空，在5的左子树中找到最右节点，为1。")]),s._v(" "),n("li",[s._v("因为1的右孩子为空，所以把1的右孩子设置为当前节点5，然后将当前节点5更新为5的左孩子1。")]),s._v(" "),n("li",[s._v("cur = 1，当前节点1的左孩子为空，所以将1的右孩子5设置为当前节点。")]),s._v(" "),n("li",[s._v("cur = 5，它的左孩子不为空，在5的左子树中寻找最后节点，为1。")]),s._v(" "),n("li",[s._v("因为1的右孩子为5，是当前节点，因此将1的右孩子重新设为空，然后倒序输出从5的左孩子1到1的节点，即输出1，然后将当前节点5更新为当前节点的右孩子4。")]),s._v(" "),n("li",[s._v("当前节点4的左孩子不为空，因此在4的左子树中寻找最右节点，为2。")]),s._v(" "),n("li",[s._v("2的右孩子为空，因此将2的右孩子设置为当前节点4，然后将当前节点设置为当前节点的左孩子2。")]),s._v(" "),n("li",[s._v("cur = 2，因为当前节点的左孩子为空，所以将2的右孩子4设置为当前节点。")]),s._v(" "),n("li",[s._v("cur = 4，由11的结果，它的最右节点为2。")]),s._v(" "),n("li",[s._v("因为2的右孩子为4，是当前节点，因此将2的右孩子重新设置为空，然后倒序输出从4的左孩子2到2的节点，即输出2，然后将当前节点4更新为当前节点的右孩子3。")]),s._v(" "),n("li",[s._v("cur = 3，因为当前节点的左孩子为空，因此将3的右孩子9设置为当前节点。")]),s._v(" "),n("li",[s._v("cur = 9，因为9的左孩子不为空，所以在它的左子树中寻找它的最右节点，为3。")]),s._v(" "),n("li",[s._v("因为3的右孩子9为当前节点，因此将3的右孩子重新设置为空，然后倒序输出从9的左孩子5到3的节点，即输出3、4、5。")]),s._v(" "),n("li",[s._v("至此，9的左子树已经遍历输出完毕。后续遍历右子树的过程和遍历左子树基本一样，因此不再赘述。")])])])}),[],!1,null,null,null);r.default=a.exports}}]);
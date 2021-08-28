(window.webpackJsonp=window.webpackJsonp||[]).push([[22],{491:function(s,n,a){"use strict";a.r(n);var t=a(1),e=Object(t.a)({},(function(){var s=this,n=s.$createElement,a=s._self._c||n;return a("ContentSlotsDistributor",{attrs:{"slot-key":s.$parent.slotKey}},[a("h1",{attrs:{id:"leetcode-234-palindrome-linked-list"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#leetcode-234-palindrome-linked-list"}},[s._v("#")]),s._v(" LeetCode-234-Palindrome Linked List")]),s._v(" "),a("p",[s._v("题意：判断一个链表是否是回文链表。")]),s._v(" "),a("h2",{attrs:{id:"方法一-使用栈"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#方法一-使用栈"}},[s._v("#")]),s._v(" 方法一 使用栈")]),s._v(" "),a("p",[s._v("我们先遍历这个链表，然后将他的所有元素压入栈中。由于栈具有后入后出的特性，因此再依次出栈时便刚好是逆序遍历了原来的链表。我们再用一个指针从链表头开始遍历，如果对应的值相等，则说明是回文链表，否则则不是。")]),s._v(" "),a("div",{staticClass:"language- line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[s._v("// 使用栈\nclass Solution {\npublic:\n    bool isPalindrome(ListNode *head) {\n        ListNode *ptr = head;\n        stack<ListNode *> s;        \n        while (ptr != NULL) {\n            s.push(ptr);\n            ptr = ptr->next;\n        }\n        ptr = head;\n        ListNode *cur = NULL;\n        while(ptr != NULL && ! s.empty()) {\n            cur = s.top();\n            s.pop();\n            if (cur->val != ptr->val) {\n                return false;\n            }\n            ptr = ptr->next;\n        }\n        return true; \n    }\n};\n")])]),s._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[s._v("1")]),a("br"),a("span",{staticClass:"line-number"},[s._v("2")]),a("br"),a("span",{staticClass:"line-number"},[s._v("3")]),a("br"),a("span",{staticClass:"line-number"},[s._v("4")]),a("br"),a("span",{staticClass:"line-number"},[s._v("5")]),a("br"),a("span",{staticClass:"line-number"},[s._v("6")]),a("br"),a("span",{staticClass:"line-number"},[s._v("7")]),a("br"),a("span",{staticClass:"line-number"},[s._v("8")]),a("br"),a("span",{staticClass:"line-number"},[s._v("9")]),a("br"),a("span",{staticClass:"line-number"},[s._v("10")]),a("br"),a("span",{staticClass:"line-number"},[s._v("11")]),a("br"),a("span",{staticClass:"line-number"},[s._v("12")]),a("br"),a("span",{staticClass:"line-number"},[s._v("13")]),a("br"),a("span",{staticClass:"line-number"},[s._v("14")]),a("br"),a("span",{staticClass:"line-number"},[s._v("15")]),a("br"),a("span",{staticClass:"line-number"},[s._v("16")]),a("br"),a("span",{staticClass:"line-number"},[s._v("17")]),a("br"),a("span",{staticClass:"line-number"},[s._v("18")]),a("br"),a("span",{staticClass:"line-number"},[s._v("19")]),a("br"),a("span",{staticClass:"line-number"},[s._v("20")]),a("br"),a("span",{staticClass:"line-number"},[s._v("21")]),a("br"),a("span",{staticClass:"line-number"},[s._v("22")]),a("br"),a("span",{staticClass:"line-number"},[s._v("23")]),a("br")])]),a("h2",{attrs:{id:"方法二-使用栈"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#方法二-使用栈"}},[s._v("#")]),s._v(" 方法二 使用栈")]),s._v(" "),a("p",[s._v("和方法一差不多，不同的是只需要将链表的后一半元素进栈就可以了，这样可以省掉一半的空间。")]),s._v(" "),a("div",{staticClass:"language- line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[s._v("class Solution {\npublic:\n    bool isPalindrome(ListNode *head) {\n        if (head == NULL || head->next == NULL) {\n            return true;\n        }\n        \n        ListNode *right = head->next;\n        ListNode *cur = head;\n        while(cur->next && cur->next->next) {\n            right = right->next;\n            cur = cur->next->next;\n        }\n        \n        // right 此时指向链表后一半的第一个元素\n        \n        stack<ListNode *> stack;\n        while(right != NULL) {\n            stack.push(right);\n            right = right->next;\n        }\n        while(! stack.empty()) {\n            ListNode *p = stack.top();\n            stack.pop();\n            if (p->val != head->val) {\n                return false;\n            }\n            head = head->next;\n        }\n        return true;\n    }\n};\n")])]),s._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[s._v("1")]),a("br"),a("span",{staticClass:"line-number"},[s._v("2")]),a("br"),a("span",{staticClass:"line-number"},[s._v("3")]),a("br"),a("span",{staticClass:"line-number"},[s._v("4")]),a("br"),a("span",{staticClass:"line-number"},[s._v("5")]),a("br"),a("span",{staticClass:"line-number"},[s._v("6")]),a("br"),a("span",{staticClass:"line-number"},[s._v("7")]),a("br"),a("span",{staticClass:"line-number"},[s._v("8")]),a("br"),a("span",{staticClass:"line-number"},[s._v("9")]),a("br"),a("span",{staticClass:"line-number"},[s._v("10")]),a("br"),a("span",{staticClass:"line-number"},[s._v("11")]),a("br"),a("span",{staticClass:"line-number"},[s._v("12")]),a("br"),a("span",{staticClass:"line-number"},[s._v("13")]),a("br"),a("span",{staticClass:"line-number"},[s._v("14")]),a("br"),a("span",{staticClass:"line-number"},[s._v("15")]),a("br"),a("span",{staticClass:"line-number"},[s._v("16")]),a("br"),a("span",{staticClass:"line-number"},[s._v("17")]),a("br"),a("span",{staticClass:"line-number"},[s._v("18")]),a("br"),a("span",{staticClass:"line-number"},[s._v("19")]),a("br"),a("span",{staticClass:"line-number"},[s._v("20")]),a("br"),a("span",{staticClass:"line-number"},[s._v("21")]),a("br"),a("span",{staticClass:"line-number"},[s._v("22")]),a("br"),a("span",{staticClass:"line-number"},[s._v("23")]),a("br"),a("span",{staticClass:"line-number"},[s._v("24")]),a("br"),a("span",{staticClass:"line-number"},[s._v("25")]),a("br"),a("span",{staticClass:"line-number"},[s._v("26")]),a("br"),a("span",{staticClass:"line-number"},[s._v("27")]),a("br"),a("span",{staticClass:"line-number"},[s._v("28")]),a("br"),a("span",{staticClass:"line-number"},[s._v("29")]),a("br"),a("span",{staticClass:"line-number"},[s._v("30")]),a("br"),a("span",{staticClass:"line-number"},[s._v("31")]),a("br"),a("span",{staticClass:"line-number"},[s._v("32")]),a("br")])]),a("h3",{attrs:{id:"方法三-调整指针指向"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#方法三-调整指针指向"}},[s._v("#")]),s._v(" 方法三 调整指针指向")]),s._v(" "),a("p",[s._v("原理参见左程云的《程序员代码面试指南》，具体过程如下：")]),s._v(" "),a("ol",[a("li",[s._v("首先改变链表右半区的结构，使整个右半区反转，最后指向中间节点。")]),s._v(" "),a("li",[s._v("leftStart和rightStart同时向中间点移动，移动每一步时都比较这两者的值是否相同，如果不同则返回false。")]),s._v(" "),a("li",[s._v("将链表恢复成原样。")]),s._v(" "),a("li",[s._v("返回结果")])]),s._v(" "),a("div",{staticClass:"language- line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[s._v("class Solution {\npublic:\n    bool isPalindrome(ListNode *head) {\n        if (head == NULL || head->next == NULL) {\n            return true;\n        }\n        ListNode *right = head;\n        ListNode *cur = head;\n        while(cur->next && cur->next->next) {\n            right = right->next;\n            cur = cur->next->next;\n        }\n        cur = right->next; // right 为右半区的第一个节点\n        \n        right->next = NULL;\n        // 反转右半区\n        ListNode *ptr = NULL;\n        while(cur != NULL) {\n            ptr = cur->next;\n            cur->next = right;\n            right = cur;\n            cur = ptr;\n        }\n        ptr = right;\n        cur = head;\n        bool flag = true;\n        while(right && cur) {\n            if (right->val != cur->val) {\n                flag = false;\n                break;\n            }\n            right = right->next;\n            cur = cur->next;\n        }\n        right = ptr->next;\n        ptr->next = NULL;\n        while(right != NULL) {\n            cur = right->next;\n            right->next = ptr;\n            ptr = right;\n            right = cur;\n        }\n        return flag;\n    }\n};\n")])]),s._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[s._v("1")]),a("br"),a("span",{staticClass:"line-number"},[s._v("2")]),a("br"),a("span",{staticClass:"line-number"},[s._v("3")]),a("br"),a("span",{staticClass:"line-number"},[s._v("4")]),a("br"),a("span",{staticClass:"line-number"},[s._v("5")]),a("br"),a("span",{staticClass:"line-number"},[s._v("6")]),a("br"),a("span",{staticClass:"line-number"},[s._v("7")]),a("br"),a("span",{staticClass:"line-number"},[s._v("8")]),a("br"),a("span",{staticClass:"line-number"},[s._v("9")]),a("br"),a("span",{staticClass:"line-number"},[s._v("10")]),a("br"),a("span",{staticClass:"line-number"},[s._v("11")]),a("br"),a("span",{staticClass:"line-number"},[s._v("12")]),a("br"),a("span",{staticClass:"line-number"},[s._v("13")]),a("br"),a("span",{staticClass:"line-number"},[s._v("14")]),a("br"),a("span",{staticClass:"line-number"},[s._v("15")]),a("br"),a("span",{staticClass:"line-number"},[s._v("16")]),a("br"),a("span",{staticClass:"line-number"},[s._v("17")]),a("br"),a("span",{staticClass:"line-number"},[s._v("18")]),a("br"),a("span",{staticClass:"line-number"},[s._v("19")]),a("br"),a("span",{staticClass:"line-number"},[s._v("20")]),a("br"),a("span",{staticClass:"line-number"},[s._v("21")]),a("br"),a("span",{staticClass:"line-number"},[s._v("22")]),a("br"),a("span",{staticClass:"line-number"},[s._v("23")]),a("br"),a("span",{staticClass:"line-number"},[s._v("24")]),a("br"),a("span",{staticClass:"line-number"},[s._v("25")]),a("br"),a("span",{staticClass:"line-number"},[s._v("26")]),a("br"),a("span",{staticClass:"line-number"},[s._v("27")]),a("br"),a("span",{staticClass:"line-number"},[s._v("28")]),a("br"),a("span",{staticClass:"line-number"},[s._v("29")]),a("br"),a("span",{staticClass:"line-number"},[s._v("30")]),a("br"),a("span",{staticClass:"line-number"},[s._v("31")]),a("br"),a("span",{staticClass:"line-number"},[s._v("32")]),a("br"),a("span",{staticClass:"line-number"},[s._v("33")]),a("br"),a("span",{staticClass:"line-number"},[s._v("34")]),a("br"),a("span",{staticClass:"line-number"},[s._v("35")]),a("br"),a("span",{staticClass:"line-number"},[s._v("36")]),a("br"),a("span",{staticClass:"line-number"},[s._v("37")]),a("br"),a("span",{staticClass:"line-number"},[s._v("38")]),a("br"),a("span",{staticClass:"line-number"},[s._v("39")]),a("br"),a("span",{staticClass:"line-number"},[s._v("40")]),a("br"),a("span",{staticClass:"line-number"},[s._v("41")]),a("br"),a("span",{staticClass:"line-number"},[s._v("42")]),a("br"),a("span",{staticClass:"line-number"},[s._v("43")]),a("br"),a("span",{staticClass:"line-number"},[s._v("44")]),a("br"),a("span",{staticClass:"line-number"},[s._v("45")]),a("br")])])])}),[],!1,null,null,null);n.default=e.exports}}]);
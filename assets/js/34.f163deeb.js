(window.webpackJsonp=window.webpackJsonp||[]).push([[34],{390:function(t,a,s){"use strict";s.r(a);var n=s(42),r=Object(n.a)({},(function(){var t=this,a=t.$createElement,s=t._self._c||a;return s("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[s("h1",{attrs:{id:"数根"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#数根"}},[t._v("#")]),t._v(" 数根")]),t._v(" "),s("h2",{attrs:{id:"问题描述"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#问题描述"}},[t._v("#")]),t._v(" 问题描述")]),t._v(" "),s("p",[t._v("一个正整数的数根可以这样求得：计算该正整数的各位数字之和，如果结果的值是一位数，那么该数就是所求数根；如果结果是一个多位数，则继续计算各位数字之和，直到结果为一个数为止。")]),t._v(" "),s("h2",{attrs:{id:"输入"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#输入"}},[t._v("#")]),t._v(" 输入")]),t._v(" "),s("p",[t._v("输入包括多个测试数据，每组测试数据包括一个正整数，并且占一行，输入数据为0时表示输入结束。")]),t._v(" "),s("h2",{attrs:{id:"输出"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#输出"}},[t._v("#")]),t._v(" 输出")]),t._v(" "),s("p",[t._v("对于每组测试数据，给出对应输出，并且每组输出占一行")]),t._v(" "),s("h2",{attrs:{id:"输入样例"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#输入样例"}},[t._v("#")]),t._v(" 输入样例")]),t._v(" "),s("div",{staticClass:"language- extra-class"},[s("pre",[s("code",[t._v("24\n39\n0\n")])])]),s("h2",{attrs:{id:"输出样例"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#输出样例"}},[t._v("#")]),t._v(" 输出样例")]),t._v(" "),s("div",{staticClass:"language- extra-class"},[s("pre",[s("code",[t._v("6\n3\n")])])]),s("h2",{attrs:{id:"代码实现"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#代码实现"}},[t._v("#")]),t._v(" 代码实现")]),t._v(" "),s("div",{staticClass:"language- extra-class"},[s("pre",[s("code",[t._v('#include <stdio.h>\nint main()\n{\n\tlong s,m;\n\twhile(1)\n\t{\n\t\tscanf("%ld",&m);\n\t\tif (m == 0)\n\t\t\tbreak;\n\t\tdo\n\t\t{\n\t\t\ts = 0;\n\t\t\twhile ( m > 0)\n\t\t\t{\n\t\t\t\ts += m % 10;\n\t\t\t\tm /= 10;\n\t\t\t}\n\t\t\tm = s;\n\t\t}while(m >= 10);\n\t\tprintf("%ld\\n",s);\n\t}\n\treturn 0;\n}')])])])])}),[],!1,null,null,null);a.default=r.exports}}]);
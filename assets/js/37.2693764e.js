(window.webpackJsonp=window.webpackJsonp||[]).push([[37],{393:function(t,n,i){"use strict";i.r(n);var s=i(42),a=Object(s.a)({},(function(){var t=this,n=t.$createElement,i=t._self._c||n;return i("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[i("h1",{attrs:{id:"独木舟上的旅行"}},[i("a",{staticClass:"header-anchor",attrs:{href:"#独木舟上的旅行"}},[t._v("#")]),t._v(" 独木舟上的旅行")]),t._v(" "),i("h2",{attrs:{id:"描述"}},[i("a",{staticClass:"header-anchor",attrs:{href:"#描述"}},[t._v("#")]),t._v(" 描述")]),t._v(" "),i("p",[t._v("进行一次独木舟的旅行活动，独木舟可以在港口租到，并且之间没有区别。一条独木舟最多只能乘坐两个人，且乘客的总重量不能超过独木舟的最大承载量。我们要尽量减少这次活动中的花销，所以要找出可以安置所有旅客的最少的独木舟条数。现在请写一个程序，读入独木舟的最大承载量、旅客数目和每位旅客的重量。根据给出的规则，计算要安置所有旅客必须的最少的独木舟条数，并输出结果。")]),t._v(" "),i("h2",{attrs:{id:"输入"}},[i("a",{staticClass:"header-anchor",attrs:{href:"#输入"}},[t._v("#")]),t._v(" 输入")]),t._v(" "),i("p",[t._v("第一行输入s,表示测试数据的组数；\n每组数据的第一行包括两个整数w，n，80<=w<=200,1<=n<=300，w为一条独木舟的最大承载量,n为人数；\n接下来的一组数据为每个人的重量（不能大于船的承载量）；")]),t._v(" "),i("h2",{attrs:{id:"输出"}},[i("a",{staticClass:"header-anchor",attrs:{href:"#输出"}},[t._v("#")]),t._v(" 输出")]),t._v(" "),i("p",[t._v("每组人数所需要的最少独木舟的条数。")]),t._v(" "),i("h2",{attrs:{id:"样例输入"}},[i("a",{staticClass:"header-anchor",attrs:{href:"#样例输入"}},[t._v("#")]),t._v(" 样例输入")]),t._v(" "),i("div",{staticClass:"language- extra-class"},[i("pre",[i("code",[t._v("3\n85 6\n5 84 85 80 84 83\n90 3\n90 45 60\n100 5\n50 50 90 40 60\n")])])]),i("h2",{attrs:{id:"样例输出"}},[i("a",{staticClass:"header-anchor",attrs:{href:"#样例输出"}},[t._v("#")]),t._v(" 样例输出")]),t._v(" "),i("div",{staticClass:"language- extra-class"},[i("pre",[i("code",[t._v("5\n3\n3\n")])])]),i("h2",{attrs:{id:"代码实现"}},[i("a",{staticClass:"header-anchor",attrs:{href:"#代码实现"}},[t._v("#")]),t._v(" 代码实现")]),t._v(" "),i("div",{staticClass:"language- extra-class"},[i("pre",[i("code",[t._v("#include <iostream>\nusing namespace std;\nint s,w,n,weights[301];\n\nvoid quickSort(int low,int high)\n{\n\tint i = low,j = high;\n\tint pivot = weights[(low+high)/2];\n\twhile(i <= j)\n\t{\n\t\twhile(weights[i] < pivot)\n\t\t\ti++;\n\t\twhile(weights[j] >  pivot)\n\t\t\tj--;\n\t\tif(i <= j)\n\t\t{\n\t\t\tint temp = weights[i];\n\t\t\tweights[i] = weights[j];\n\t\t\tweights[j] = temp;\n\t\t\ti++;\n\t\t\tj--;\n\t\t}\n\t}\n\tif ( j > low)\n\t\tquickSort(low,j);\n\tif (i < high)\n\t\tquickSort(i,high);\n\n}\n\nvoid work(int w,int n)\n{\n\tint sum = 0;\n\tint i,j;\n\tfor (i = 1,j = n; i  < j;)\n\t{\n \t   if(weights[i] + weights[j] <= w)\n    \t{\n        \tsum ++;\n      \t  \ti++;\n        \tj--;\n    \t}\n    \telse\n    \t{\n        \tsum++;\n        \tj--;\n    \t}\n\t}\n\tif(i == j)\n    \tsum ++;\n\tcout << sum << endl;\n}\n\n\nint main()\n{\n\tcin >> s;\n\tfor (int i = 1;i <= s;i++)\n\t{\n\t\tcin >> w >> n;\n\t\tfor (int j = 1;j <= n;j++)\n\t\t\tcin >> weights[j];\n\t\tquickSort(1,n);\n\t\twork(w,n);\n\t}\n\treturn n;\n}\n")])])])])}),[],!1,null,null,null);n.default=a.exports}}]);
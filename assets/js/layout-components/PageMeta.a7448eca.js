(window.webpackJsonp=window.webpackJsonp||[]).push([[39,34,54],{181:function(t,e,i){"use strict";i.d(e,"d",(function(){return n})),i.d(e,"a",(function(){return s})),i.d(e,"j",(function(){return a})),i.d(e,"i",(function(){return o})),i.d(e,"f",(function(){return u})),i.d(e,"g",(function(){return c})),i.d(e,"h",(function(){return l})),i.d(e,"c",(function(){return d})),i.d(e,"b",(function(){return p})),i.d(e,"e",(function(){return h})),i.d(e,"k",(function(){return f}));const n=/#.*$/u,r=/\.(md|html)$/u,s=/\/$/u,a=/^[a-z]+:/iu,o=t=>decodeURI(t).replace(n,"").replace(r,""),u=t=>a.test(t),c=t=>t.startsWith("mailto:"),l=t=>t.startsWith("tel:"),d=t=>{if(u(t))return t;const e=n.exec(t),i=e?e[0]:"",r=o(t);return r.endsWith("/")?t:`${r}.html${i}`},p=t=>/(\.html|\/)$/u.test(t)?t:t+"/",h=(t,e)=>{const i=decodeURIComponent(t.hash),r=(t=>{const e=n.exec(t);return e?e[0]:""})(e);if(r&&i!==r)return!1;return o(t.path)===o(e)},f=(t,e,i)=>{if(u(t))return t;const n=t.charAt(0);if("/"===n)return t;if("?"===n||"#"===n)return`${e}${t}`;const r=e.split("/");i&&r[r.length-1]||r.pop();const s=t.replace(/^\//u,"").split("/");for(let t=0;t<s.length;t++){const e=s[t];".."===e?r.pop():"."!==e&&r.push(e)}return""!==r[0]&&r.unshift(""),r.join("/")}},282:function(t,e,i){},310:function(t,e,i){"use strict";i.r(e);var n=i(1),r=Object(n.a)({},(function(){var t=this._self._c;return t("svg",{staticClass:"icon edit-icon",attrs:{viewBox:"0 0 1024 1024",xmlns:"http://www.w3.org/2000/svg"}},[t("path",{attrs:{d:"M117.953 696.992 64.306 959.696l265.931-49.336 450.204-452.505-212.284-213.376-450.204 452.513zm496.384-296.326L219.039 797.993l-46.108-46.34L568.233 354.33l46.104 46.335zm345.357-122.99-114.45 115.04-212.288-213.377 114.45-115.035 212.288 213.371zm0 0",fill:"currentColor"}})])}),[],!1,null,null,null);e.default=r.exports},333:function(t,e,i){"use strict";i(282)},354:function(t,e,i){"use strict";i.r(e);var n=i(0),r=i(310),s=i(181),a=n.a.extend({name:"PageMeta",components:{EditIcon:r.default},computed:{locales(){return this.$themeLocaleConfig.meta||{contributor:"Contributors",editLink:"Edit this page",updateTime:"Last Updated"}},contributors(){return!1===this.$page.frontmatter.contributor||!1===this.$themeConfig.contributor&&!this.$page.frontmatter.contributor?[]:this.$page.contributors||[]},contributorsText(){return this.locales.contributor},updateTime(){return!1===this.$page.frontmatter.updateTime||!1===this.$themeConfig.updateTime&&!this.$page.frontmatter.updateTime?"":this.$page.updateTime||""},updateTimeText(){return this.locales.updateTime},editLink(){const t=this.$page.frontmatter.editLink||!1!==this.$themeConfig.editLinks&&!1!==this.$page.frontmatter.editLink,{repo:e,docsRepo:i}=this.$themeConfig;return!(!t||!e&&!i||!this.$page.relativePath)&&this.createEditLink()},editLinkText(){return this.locales.editLink}},methods:{createEditLink(){const{repo:t="",docsRepo:e=t,docsDir:i="",docsBranch:n="main"}=this.$themeConfig;if(/bitbucket.org/u.test(e))return`${e.replace(s.a,"")}/src/${n}/${i?i.replace(s.a,"")+"/":""}${this.$page.relativePath}?mode=edit&spa=0&at=${n}&fileviewer=file-view-default`;if(/gitlab.com/u.test(e))return`${e.replace(s.a,"")}/-/edit/${n}/${i?i.replace(s.a,"")+"/":""}${this.$page.relativePath}`;return`${(s.j.test(e)?e:"https://github.com/"+e).replace(s.a,"")}/edit/${n}/${i?i.replace(s.a,"")+"/":""}${this.$page.relativePath}`}}}),o=(i(333),i(1)),u=Object(o.a)(a,(function(){var t=this,e=t._self._c;t._self._setupProxy;return e("footer",{staticClass:"page-meta"},[t.editLink?e("div",{staticClass:"edit-link"},[e("EditIcon"),t._v(" "),e("a",{attrs:{href:t.editLink,target:"_blank",rel:"noopener noreferrer"}},[t._v(t._s(t.editLinkText))])],1):t._e(),t._v(" "),t.updateTime?e("div",{staticClass:"meta-item update-time"},[e("span",{staticClass:"label"},[t._v(t._s(t.updateTimeText)+":")]),t._v(" "),e("span",{staticClass:"info"},[t._v(t._s(t.updateTime))])]):t._e(),t._v(" "),t.contributors&&t.contributors.length?e("div",{staticClass:"meta-item contributors"},[e("span",{staticClass:"label"},[t._v(t._s(t.contributorsText)+": ")]),t._v(" "),e("span",{staticClass:"info"},[t._l(t.contributors,(function(i,n){return[e("span",{key:n,staticClass:"contributor",attrs:{title:"email: "+i.email}},[t._v("\n          "+t._s(i.name)+"\n        ")]),t._v(" "),n!==t.contributors.length-1?[t._v(", ")]:t._e()]}))],2)]):t._e()])}),[],!1,null,null,null);e.default=u.exports}}]);
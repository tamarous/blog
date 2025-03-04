"use strict";(self.webpackChunktamarous_blog=self.webpackChunktamarous_blog||[]).push([[2909],{2909:(t,e,a)=>{a.d(e,{diagram:()=>y});var r=a(6010),l=a(7812),o=(a(4637),a(3784),a(2021),a(5165)),n=a(3011),i=(a(7851),a(1485)),c=(a(2280),a(4323),a(1624),a(6772),a(9913),a(1869),a(6375)),s={packet:[]},d=structuredClone(s),b=i.s.packet,k=(0,c.a)((()=>{let t=(0,n.l)({...b,...(0,i.A)().packet});return t.showBits&&(t.paddingY+=10),t}),"getConfig"),p=(0,c.a)((()=>d.packet),"getPacket"),g={pushWord:(0,c.a)((t=>{t.length>0&&d.packet.push(t)}),"pushWord"),getPacket:p,getConfig:k,clear:(0,c.a)((()=>{(0,i.P)(),d=structuredClone(s)}),"clear"),setAccTitle:i.Q,getAccTitle:i.R,setDiagramTitle:i.U,getDiagramTitle:i.V,getAccDescription:i.T,setAccDescription:i.S},h=(0,c.a)((t=>{(0,r.a)(t,g);let e=-1,a=[],l=1,{bitsPerRow:o}=g.getConfig();for(let{start:r,end:n,label:c}of t.blocks){if(n&&n<r)throw new Error(`Packet block ${r} - ${n} is invalid. End must be greater than start.`);if(r!==e+1)throw new Error(`Packet block ${r} - ${n??r} is not contiguous. It should start from ${e+1}.`);for(e=n??r,i.b.debug(`Packet block ${r} - ${e} with label ${c}`);a.length<=o+1&&g.getPacket().length<1e4;){let[t,e]=u({start:r,end:n,label:c},l,o);if(a.push(t),t.end+1===l*o&&(g.pushWord(a),a=[],l++),!e)break;({start:r,end:n,label:c}=e)}}g.pushWord(a)}),"populate"),u=(0,c.a)(((t,e,a)=>{if(void 0===t.end&&(t.end=t.start),t.start>t.end)throw new Error(`Block start ${t.start} is greater than block end ${t.end}.`);return t.end+1<=e*a?[t,void 0]:[{start:t.start,end:e*a-1,label:t.label},{start:e*a,end:t.end,label:t.label}]}),"getNextFittingBlock"),f={parse:(0,c.a)((async t=>{let e=await(0,l.a)("packet",t);i.b.debug(e),h(e)}),"parse")},w=(0,c.a)(((t,e,a,r)=>{let l=r.db,n=l.getConfig(),{rowHeight:c,paddingY:s,bitWidth:d,bitsPerRow:b}=n,k=l.getPacket(),p=l.getDiagramTitle(),g=c+s,h=g*(k.length+1)-(p?0:c),u=d*b+2,f=(0,o.a)(e);f.attr("viewbox",`0 0 ${u} ${h}`),(0,i.M)(f,h,u,n.useMaxWidth);for(let[t,e]of k.entries())x(f,e,t,n);f.append("text").text(p).attr("x",u/2).attr("y",h-g/2).attr("dominant-baseline","middle").attr("text-anchor","middle").attr("class","packetTitle")}),"draw"),x=(0,c.a)(((t,e,a,{rowHeight:r,paddingX:l,paddingY:o,bitWidth:n,bitsPerRow:i,showBits:c})=>{let s=t.append("g"),d=a*(r+o)+o;for(let t of e){let e=t.start%i*n+1,a=(t.end-t.start+1)*n-l;if(s.append("rect").attr("x",e).attr("y",d).attr("width",a).attr("height",r).attr("class","packetBlock"),s.append("text").attr("x",e+a/2).attr("y",d+r/2).attr("class","packetLabel").attr("dominant-baseline","middle").attr("text-anchor","middle").text(t.label),!c)continue;let o=t.end===t.start,b=d-2;s.append("text").attr("x",e+(o?a/2:0)).attr("y",b).attr("class","packetByte start").attr("dominant-baseline","auto").attr("text-anchor",o?"middle":"start").text(t.start),o||s.append("text").attr("x",e+a).attr("y",b).attr("class","packetByte end").attr("dominant-baseline","auto").attr("text-anchor","end").text(t.end)}}),"drawWord"),$={draw:w},C={byteFontSize:"10px",startByteColor:"black",endByteColor:"black",labelColor:"black",labelFontSize:"12px",titleColor:"black",titleFontSize:"14px",blockStrokeColor:"black",blockStrokeWidth:"1",blockFillColor:"#efefef"},m=(0,c.a)((({packet:t}={})=>{let e=(0,n.l)(C,t);return`\n\t.packetByte {\n\t\tfont-size: ${e.byteFontSize};\n\t}\n\t.packetByte.start {\n\t\tfill: ${e.startByteColor};\n\t}\n\t.packetByte.end {\n\t\tfill: ${e.endByteColor};\n\t}\n\t.packetLabel {\n\t\tfill: ${e.labelColor};\n\t\tfont-size: ${e.labelFontSize};\n\t}\n\t.packetTitle {\n\t\tfill: ${e.titleColor};\n\t\tfont-size: ${e.titleFontSize};\n\t}\n\t.packetBlock {\n\t\tstroke: ${e.blockStrokeColor};\n\t\tstroke-width: ${e.blockStrokeWidth};\n\t\tfill: ${e.blockFillColor};\n\t}\n\t`}),"styles"),y={parser:f,db:g,renderer:$,styles:m}},6010:(t,e,a)=>{function r(t,e){t.accDescr&&e.setAccDescription?.(t.accDescr),t.accTitle&&e.setAccTitle?.(t.accTitle),t.title&&e.setDiagramTitle?.(t.title)}a.d(e,{a:()=>r}),(0,a(6375).a)(r,"populateCommonDb")}}]);
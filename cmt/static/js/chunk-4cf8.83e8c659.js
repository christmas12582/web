(window.webpackJsonp=window.webpackJsonp||[]).push([["chunk-4cf8"],{"/QZ8":function(t,e,i){"use strict";var a=i("3F+b");i.n(a).a},"3F+b":function(t,e,i){},LROu:function(t,e,i){"use strict";var a=i("Qvsb");i.n(a).a},Mz3J:function(t,e,i){"use strict";Math.easeInOutQuad=function(t,e,i,a){return(t/=a/2)<1?i/2*t*t+e:-i/2*(--t*(t-2)-1)+e};var a=window.requestAnimationFrame||window.webkitRequestAnimationFrame||window.mozRequestAnimationFrame||function(t){window.setTimeout(t,1e3/60)};function o(t,e,i){var o=document.documentElement.scrollTop||document.body.parentNode.scrollTop||document.body.scrollTop,n=t-o,l=0;e=void 0===e?500:e;!function t(){l+=20,function(t){document.documentElement.scrollTop=t,document.body.parentNode.scrollTop=t,document.body.scrollTop=t}(Math.easeInOutQuad(l,o,n,e)),l<e?a(t):i&&"function"==typeof i&&i()}()}var n={name:"Pagination",props:{total:{required:!0,type:Number},page:{type:Number,default:1},limit:{type:Number,default:20},pageSizes:{type:Array,default:function(){return[10,20,30,50]}},layout:{type:String,default:"total, sizes, prev, pager, next, jumper"},background:{type:Boolean,default:!0},autoScroll:{type:Boolean,default:!0},hidden:{type:Boolean,default:!1}},computed:{currentPage:{get:function(){return this.page},set:function(t){this.$emit("update:page",t)}},pageSize:{get:function(){return this.limit},set:function(t){this.$emit("update:limit",t)}}},methods:{handleSizeChange:function(t){this.$emit("pagination",{page:this.currentPage,limit:t}),this.autoScroll&&o(0,800)},handleCurrentChange:function(t){this.$emit("pagination",{page:t,limit:this.pageSize}),this.autoScroll&&o(0,800)}}},l=(i("LROu"),i("KHd+")),s=Object(l.a)(n,function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"pagination-container",class:{hidden:t.hidden}},[i("el-pagination",t._b({attrs:{background:t.background,"current-page":t.currentPage,"page-size":t.pageSize,layout:t.layout,total:t.total},on:{"update:currentPage":function(e){t.currentPage=e},"update:pageSize":function(e){t.pageSize=e},"size-change":t.handleSizeChange,"current-change":t.handleCurrentChange}},"el-pagination",t.$attrs,!1))],1)},[],!1,null,"2fc659d3",null);s.options.__file="index.vue";e.a=s.exports},Qvsb:function(t,e,i){},XINx:function(t,e,i){"use strict";var a={bind:function(t,e,i){var a=t.querySelector(".el-dialog__header"),o=t.querySelector(".el-dialog");a.style.cssText+=";cursor:move;",o.style.cssText+=";top:0px;";var n=window.document.currentStyle?function(t,e){return t.currentStyle[e]}:function(t,e){return getComputedStyle(t,!1)[e]};a.onmousedown=function(t){var e=t.clientX-a.offsetLeft,l=t.clientY-a.offsetTop,s=o.offsetWidth,r=o.offsetHeight,u=document.body.clientWidth,d=document.body.clientHeight,c=o.offsetLeft,p=u-o.offsetLeft-s,f=o.offsetTop,m=d-o.offsetTop-r,h=n(o,"left"),g=n(o,"top");h.includes("%")?(h=+document.body.clientWidth*(+h.replace(/\%/g,"")/100),g=+document.body.clientHeight*(+g.replace(/\%/g,"")/100)):(h=+h.replace(/\px/g,""),g=+g.replace(/\px/g,"")),document.onmousemove=function(t){var a=t.clientX-e,n=t.clientY-l;-a>c?a=-c:a>p&&(a=p),-n>f?n=-f:n>m&&(n=m),o.style.cssText+=";left:"+(a+h)+"px;top:"+(n+g)+"px;",i.child.$emit("dragDialog")},document.onmouseup=function(t){document.onmousemove=null,document.onmouseup=null}}}},o=function(t){t.directive("el-drag-dialog",a)};window.Vue&&(window["el-drag-dialog"]=a,Vue.use(o)),a.install=o;e.a=a},ZySA:function(t,e,i){"use strict";var a=i("P2sY"),o=i.n(a),n=(i("jUE0"),{bind:function(t,e){t.addEventListener("click",function(i){var a=o()({},e.value),n=o()({ele:t,type:"hit",color:"rgba(0, 0, 0, 0.15)"},a),l=n.ele;if(l){l.style.position="relative",l.style.overflow="hidden";var s=l.getBoundingClientRect(),r=l.querySelector(".waves-ripple");switch(r?r.className="waves-ripple":((r=document.createElement("span")).className="waves-ripple",r.style.height=r.style.width=Math.max(s.width,s.height)+"px",l.appendChild(r)),n.type){case"center":r.style.top=s.height/2-r.offsetHeight/2+"px",r.style.left=s.width/2-r.offsetWidth/2+"px";break;default:r.style.top=(i.pageY-s.top-r.offsetHeight/2-document.documentElement.scrollTop||document.body.scrollTop)+"px",r.style.left=(i.pageX-s.left-r.offsetWidth/2-document.documentElement.scrollLeft||document.body.scrollLeft)+"px"}return r.style.backgroundColor=n.color,r.className="waves-ripple z-active",!1}},!1)}}),l=function(t){t.directive("waves",n)};window.Vue&&(window.waves=n,Vue.use(l)),n.install=l;e.a=n},jUE0:function(t,e,i){},kTcK:function(t,e,i){"use strict";i.r(e);var a=i("t3Un");function o(t){return Object(a.a)({url:"/distributor/mydistribute",method:"post",params:t})}var n=i("Mz3J"),l=i("ZySA"),s=i("XINx"),r=(i("S+eF"),{name:"ProductList",components:{Pagination:n.a},directives:{waves:l.a,elDragDialog:s.a},data:function(){return{isvalidOptions:[{key:1,display_name:"有效"},{key:0,display_name:"无效"}],list:[],total:0,listLoading:!0,listQuery:{pagenum:1,pagesize:10,phone:void 0,openid:void 0,isvalid:void 0},show:"list",distributor:{userId:void 0,ratio:void 0},ratioVisible:!1,ratioRules:{ratio:[{required:!0,message:"请输入分销商提成比例",trigger:"blur"}]},detailList:[],detailTotal:0,detailListLoading:!0,detailListQuery:{pagenum:1,pagesize:10,openid:void 0}}},created:function(){this.getList()},methods:{getList:function(){var t=this;this.listLoading=!0,function(t){return Object(a.a)({url:"/operator/getdistributelist",method:"post",params:t})}(this.listQuery).then(function(e){0==e.code&&(t.list=e.data.list,t.total=e.data.total,t.listLoading=!1)})},handleSizeChange:function(t){this.listQuery.pagesize=t,this.getList()},handleCurrentChange:function(t){this.listQuery.pagenum=t,this.getList()},handleRatio:function(t,e){this.distributor.userId=e.id,this.ratioVisible=!0,this.$refs.ratio.blur()},cancelRatio:function(){this.ratioVisible=!1,this.distributor.userId=void 0,this.distributor.ratio=void 0},submitRatio:function(){var t=this;this.$refs.ratioForm.validate(function(e){if(!e)return!1;t.$confirm("确认修改提成比例吗?","提示",{type:"warning"}).then(function(){(function(t,e){return Object(a.a)({url:"/operator/setratio",method:"post",params:{userid:t,ratio:e}})})(t.distributor.userId,t.distributor.ratio).then(function(e){0==e.code?(t.$message.success("保存成功"),t.cancelRatio(),t.getList()):t.$message.error(e.msg)})}).catch(function(){})})},handleDrag:function(){this.$refs.ratio.blur()},handleDetail:function(t,e){var i=this;this.detailTotal=0,this.detailList=[],this.showView("detail"),this.detailListLoading=!0,this.detailListQuery.openid=e.openid,o(this.detailListQuery).then(function(t){0==t.code&&(i.detailList=t.data.list,i.detailTotal=t.data.total,i.detailListLoading=!1)})},morePage:function(){var t=this;this.detailListLoading=!0,o(this.detailListQuery).then(function(e){0==e.code&&(t.detailList=e.data.list,t.detailTotal=e.data.total,t.detailListLoading=!1)})},showView:function(t){this.show=t}}}),u=(i("/QZ8"),i("KHd+")),d=Object(u.a)(r,function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"app-container"},["list"==t.show?i("div",[i("div",{staticClass:"filter-container"},[i("el-input",{staticClass:"filter-item",staticStyle:{width:"200px"},attrs:{placeholder:t.$t("distributor.phone")},model:{value:t.listQuery.phone,callback:function(e){t.$set(t.listQuery,"phone",e)},expression:"listQuery.phone"}}),t._v(" "),i("el-input",{staticClass:"filter-item",staticStyle:{width:"200px"},attrs:{placeholder:t.$t("distributor.openid")},model:{value:t.listQuery.openid,callback:function(e){t.$set(t.listQuery,"openid",e)},expression:"listQuery.openid"}}),t._v(" "),i("el-select",{staticClass:"filter-item",staticStyle:{width:"200px"},attrs:{placeholder:t.$t("distributor.isvalid"),clearable:""},model:{value:t.listQuery.isvalid,callback:function(e){t.$set(t.listQuery,"isvalid",e)},expression:"listQuery.isvalid"}},t._l(t.isvalidOptions,function(t){return i("el-option",{key:t.key,attrs:{label:t.display_name,value:t.key}})})),t._v(" "),i("el-button",{directives:[{name:"waves",rawName:"v-waves"}],staticClass:"filter-item",attrs:{type:"primary",icon:"el-icon-search"},on:{click:t.getList}},[t._v(t._s(t.$t("table.search")))])],1),t._v(" "),i("el-table",{directives:[{name:"loading",rawName:"v-loading",value:t.listLoading,expression:"listLoading"}],staticStyle:{width:"100%"},attrs:{data:t.list,border:"",fit:"","highlight-current-row":""}},[i("el-table-column",{attrs:{type:"index",width:"60",align:"center",label:"序号"}}),t._v(" "),i("el-table-column",{attrs:{width:"240",align:"center",label:"微信识别号","show-overflow-tooltip":""},scopedSlots:t._u([{key:"default",fn:function(e){return[i("span",[t._v(t._s(e.row.openid))])]}}])}),t._v(" "),i("el-table-column",{attrs:{width:"150",align:"center",label:"电话号码","show-overflow-tooltip":""},scopedSlots:t._u([{key:"default",fn:function(e){return[i("span",[t._v(t._s(e.row.phone))])]}}])}),t._v(" "),i("el-table-column",{attrs:{"class-name":"status-col",label:"是否有效",width:"110"},scopedSlots:t._u([{key:"default",fn:function(e){return[i("el-tag",{attrs:{type:1==e.row.isvalid?"success":"danger"}},[t._v(t._s(1==e.row.isvalid?"有效":"无效"))])]}}])}),t._v(" "),i("el-table-column",{attrs:{"min-width":"120",align:"center",label:"提成比例","show-overflow-tooltip":""},scopedSlots:t._u([{key:"default",fn:function(e){return[i("span",[t._v(t._s(e.row.ratio)+"% "),i("el-button",{attrs:{size:"small",type:"text"},on:{click:function(i){t.handleRatio(e.$index,e.row)}}},[t._v("修改")])],1)]}}])}),t._v(" "),i("el-table-column",{attrs:{"min-width":"150",align:"center",label:"提成余额(元)","show-overflow-tooltip":""},scopedSlots:t._u([{key:"default",fn:function(e){return[i("span",[t._v("￥"+t._s(e.row.money/100))])]}}])}),t._v(" "),i("el-table-column",{attrs:{"min-width":"300",label:"操作"},scopedSlots:t._u([{key:"default",fn:function(e){return[i("el-button",{attrs:{size:"small"},on:{click:function(i){t.handleDetail(e.$index,e.row)}}},[t._v("查看分销明细")])]}}])})],1),t._v(" "),i("pagination",{directives:[{name:"show",rawName:"v-show",value:t.total>0,expression:"total>0"}],attrs:{total:t.total,page:t.listQuery.pagenum,limit:t.listQuery.pagesize},on:{"update:page":function(e){t.$set(t.listQuery,"pagenum",e)},"update:limit":function(e){t.$set(t.listQuery,"pagesize",e)},pagination:t.getList}}),t._v(" "),i("el-dialog",{directives:[{name:"el-drag-dialog",rawName:"v-el-drag-dialog"}],attrs:{visible:t.ratioVisible,title:"修改分销商提成比例","show-close":!1,"close-on-click-modal":!1,"close-on-press-escape":!1},on:{"update:visible":function(e){t.ratioVisible=e},dragDialog:t.handleDrag}},[i("el-form",{ref:"ratioForm",attrs:{model:t.distributor,rules:t.ratioRules,"label-width":"100px"}},[i("el-form-item",{attrs:{label:"提成比例",prop:"ratio"}},[i("el-input",{ref:"ratio",staticClass:"filter-item",staticStyle:{width:"300px"},attrs:{placeholder:t.$t("distributor.ratio")},model:{value:t.distributor.ratio,callback:function(e){t.$set(t.distributor,"ratio",e)},expression:"distributor.ratio"}},[i("template",{slot:"append"},[t._v("%")])],2)],1),t._v(" "),i("el-form-item",[i("el-button",{attrs:{size:"small",type:"primary"},on:{click:t.submitRatio}},[t._v("保存")]),t._v(" "),i("el-button",{attrs:{size:"small"},on:{click:t.cancelRatio}},[t._v("取消")])],1)],1)],1)],1):t._e(),t._v(" "),"detail"==t.show?i("div",[i("div",{staticClass:"filter-container text"},[i("span",[t._v("分销商：")]),i("span",[t._v(t._s(t.detailListQuery.openid))]),i("el-button",{staticClass:"cancel-btn",attrs:{size:"small"},on:{click:function(e){t.showView("list")}}},[t._v("返回")])],1),t._v(" "),i("el-table",{directives:[{name:"loading",rawName:"v-loading",value:t.detailListLoading,expression:"detailListLoading"}],staticStyle:{width:"100%"},attrs:{data:t.detailList,border:"",fit:"","highlight-current-row":""}},[i("el-table-column",{attrs:{type:"index",width:"60",align:"center",label:"序号"}}),t._v(" "),i("el-table-column",{attrs:{"min-width":"240",align:"center",label:"订单号","show-overflow-tooltip":""},scopedSlots:t._u([{key:"default",fn:function(e){return[i("span",[t._v(t._s(e.row.ordernum))])]}}])}),t._v(" "),i("el-table-column",{attrs:{align:"center",label:"商品名称","show-overflow-tooltip":""},scopedSlots:t._u([{key:"default",fn:function(e){return[i("span",[t._v(t._s(e.row.product.name))])]}}])}),t._v(" "),i("el-table-column",{attrs:{align:"center",label:"规格名称","show-overflow-tooltip":""},scopedSlots:t._u([{key:"default",fn:function(e){return[i("span",[t._v(t._s(e.row.unit.name))])]}}])}),t._v(" "),i("el-table-column",{attrs:{"class-name":"status-col",label:"是否支付",width:"110"},scopedSlots:t._u([{key:"default",fn:function(e){return[i("el-tag",{attrs:{type:1==e.row.ispay?"success":"danger"}},[t._v(t._s(1==e.row.ispay?"已支付":"未支付"))])]}}])}),t._v(" "),i("el-table-column",{attrs:{"min-width":"150",align:"center",label:"支付金额(元)","show-overflow-tooltip":""},scopedSlots:t._u([{key:"default",fn:function(e){return[i("span",[t._v("￥"+t._s(e.row.unit.price/100))])]}}])})],1),t._v(" "),i("pagination",{directives:[{name:"show",rawName:"v-show",value:t.detailTotal>0,expression:"detailTotal>0"}],attrs:{total:t.detailTotal,page:t.detailListQuery.pagenum,limit:t.detailListQuery.pagesize},on:{"update:page":function(e){t.$set(t.detailListQuery,"pagenum",e)},"update:limit":function(e){t.$set(t.detailListQuery,"pagesize",e)},pagination:t.morePage}})],1):t._e()])},[],!1,null,"85ab3386",null);d.options.__file="list.vue";e.default=d.exports}}]);
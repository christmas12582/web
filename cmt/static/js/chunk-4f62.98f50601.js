(window.webpackJsonp=window.webpackJsonp||[]).push([["chunk-4f62"],{"5bXq":function(t,e,i){"use strict";var n=i("Zxqb");i.n(n).a},LROu:function(t,e,i){"use strict";var n=i("Qvsb");i.n(n).a},Mz3J:function(t,e,i){"use strict";Math.easeInOutQuad=function(t,e,i,n){return(t/=n/2)<1?i/2*t*t+e:-i/2*(--t*(t-2)-1)+e};var n=window.requestAnimationFrame||window.webkitRequestAnimationFrame||window.mozRequestAnimationFrame||function(t){window.setTimeout(t,1e3/60)};function a(t,e,i){var a=document.documentElement.scrollTop||document.body.parentNode.scrollTop||document.body.scrollTop,s=t-a,o=0;e=void 0===e?500:e;!function t(){o+=20,function(t){document.documentElement.scrollTop=t,document.body.parentNode.scrollTop=t,document.body.scrollTop=t}(Math.easeInOutQuad(o,a,s,e)),o<e?n(t):i&&"function"==typeof i&&i()}()}var s={name:"Pagination",props:{total:{required:!0,type:Number},page:{type:Number,default:1},limit:{type:Number,default:20},pageSizes:{type:Array,default:function(){return[10,20,30,50]}},layout:{type:String,default:"total, sizes, prev, pager, next, jumper"},background:{type:Boolean,default:!0},autoScroll:{type:Boolean,default:!0},hidden:{type:Boolean,default:!1}},computed:{currentPage:{get:function(){return this.page},set:function(t){this.$emit("update:page",t)}},pageSize:{get:function(){return this.limit},set:function(t){this.$emit("update:limit",t)}}},methods:{handleSizeChange:function(t){this.$emit("pagination",{page:this.currentPage,limit:t}),this.autoScroll&&a(0,800)},handleCurrentChange:function(t){this.$emit("pagination",{page:t,limit:this.pageSize}),this.autoScroll&&a(0,800)}}},o=(i("LROu"),i("KHd+")),l=Object(o.a)(s,function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"pagination-container",class:{hidden:t.hidden}},[i("el-pagination",t._b({attrs:{background:t.background,"current-page":t.currentPage,"page-size":t.pageSize,layout:t.layout,total:t.total},on:{"update:currentPage":function(e){t.currentPage=e},"update:pageSize":function(e){t.pageSize=e},"size-change":t.handleSizeChange,"current-change":t.handleCurrentChange}},"el-pagination",t.$attrs,!1))],1)},[],!1,null,"2fc659d3",null);l.options.__file="index.vue";e.a=l.exports},Qvsb:function(t,e,i){},Rnvt:function(t,e,i){"use strict";i.r(e);var n=i("t3Un");function a(t){return Object(n.a)({url:"/operator/productdetails",method:"post",params:{id:t}})}function s(t){return Object(n.a)({url:"/operator/unitadd",method:"post",params:t})}var o=i("Mz3J"),l=i("ZySA"),r=i("S+eF"),c={name:"ProductList",components:{Pagination:o.a},directives:{waves:l.a},data:function(){return{isvalidOptions:[{key:1,display_name:"有效"},{key:0,display_name:"无效"}],list:[],total:0,listLoading:!0,listQuery:{pagenum:1,pagesize:10,name:void 0,isvalid:void 0},lottery:{product:{},unit:[]},noneUnit:{},show:"list",fileList:[],lotteryRules:{product:{name:[{required:!0,message:"请输入活动名称",trigger:"blur"}],icon:[{required:!0,message:"请上传活动图片",trigger:"change"}]},unit:[{type:"array",required:!0,message:"请至少添加一个活动规格",trigger:"change"}]},service:"https://aiyuanmqz.com"}},created:function(){this.getList()},methods:{getList:function(){var t=this;this.listLoading=!0,function(t){return Object(n.a)({url:"/operator/productlist",method:"post",params:t})}(this.listQuery).then(function(e){0==e.code&&(t.list=e.data.list,t.total=e.data.total,t.listLoading=!1)})},handleSizeChange:function(t){this.listQuery.pagesize=t,this.getList()},handleCurrentChange:function(t){this.listQuery.pagenum=t,this.getList()},handleDetail:function(t,e){var i=this;a(e.id).then(function(t){0==t.code&&(i.lottery=t.data,i.fileList=[],null!=i.lottery.product.icon&&""!=i.lottery.product.icon&&i.fileList.push({name:i.lottery.product.name,url:i.lottery.product.icon}),i.noneUnit={},i.showView("detail"))})},handleUpdate:function(t,e){var i=this;a(e.id).then(function(t){0==t.code&&(i.lottery=t.data,i.fileList=[],null!=i.lottery.product.icon&&""!=i.lottery.product.icon&&i.fileList.push({name:i.lottery.product.name,url:i.lottery.product.icon}),i.noneUnit={},i.showView("edit"))})},handleRemove:function(t,e){var i=this;this.$confirm("确认删除【"+e.name+"】吗?","提示",{type:"warning"}).then(function(){i.listLoading=!0,function(t){return Object(n.a)({url:"/operator/productremove",method:"post",params:{id:t}})}(e.id).then(function(t){i.listLoading=!1,0==t.code&&(i.$message.success("删除成功"),i.getList())})}).catch(function(){})},showView:function(t){this.show=t},handleCreate:function(){this.lottery={product:{isvalid:1},unit:[]},this.noneUnit={},this.fileList=[],this.showView("add")},handleImageRemove:function(t,e){this.lottery.product.icon=""},handleImageSuccess:function(t,e,i){200==t.code&&(this.lottery.product.icon=t.data[0])},beforeImageUpload:function(t){},handleSubmit:function(){var t=this;"add"==this.show?function(t){return Object(n.a)({url:"/operator/productadd",method:"post",params:t})}(this.lottery.product).then(function(e){if(0==e.code){var i=e.data;if(t.lottery.unit.length>0){var n=[];t.lottery.unit.forEach(function(t){t.productid=i,n.push(new r.Promise(function(e,i){s(t).then(function(t){0==t.code?e():i(t.msg)})}))}),r.Promise.all(n).then(function(e){t.$message.success("保存成功"),t.showView("list"),t.getList()},function(e){t.$message.error(e)})}else t.$message.success("保存成功"),t.showView("list"),t.getList()}else t.$message.error(e.msg)}):"edit"==this.show&&function(t){return Object(n.a)({url:"/operator/productupdate",method:"post",params:t})}(this.lottery.product).then(function(e){if(0==e.code)if(t.lottery.unit.length>0){var i=[];t.lottery.unit.forEach(function(e){void 0!=e.id&&null!=e.id&&""!=e.id||(e.productid=t.lottery.product.id,i.push(new r.Promise(function(t,i){s(e).then(function(e){0==e.code?t():i(e.msg)})})))}),i.length>0?r.Promise.all(i).then(function(e){t.$message.success("保存成功"),t.showView("list"),t.getList()},function(e){t.$message.error(e)}):(t.$message.success("保存成功"),t.showView("list"),t.getList())}else t.$message.success("保存成功"),t.showView("list"),t.getList();else t.$message.error(e.msg)})},handleRemoveUnit:function(t){var e=this;t>=this.lottery.unit.length&&this.$message.success("规格不存在");var i=this.lottery.unit[t];void 0!=i.id&&null!=i.id&&""!=i.id?this.$confirm("确认删除【"+i.name+"】吗?","提示",{type:"warning"}).then(function(){(function(t){return Object(n.a)({url:"/operator/unitremove",method:"post",params:{id:t}})})(i.id).then(function(i){0==i.code?(e.lottery.unit.splice(t,1),e.$message.success("删除成功")):e.$message.error(i.msg)})}).catch(function(){}):(this.lottery.unit.splice(t,1),this.$message.success("删除成功"))},handleAddUnit:function(){if(void 0==this.noneUnit.name||""==this.noneUnit.name)return this.$message.error("请输入规格名称"),!1;if(void 0==this.noneUnit.price||""==this.noneUnit.price)return this.$message.error("请输入规格价格"),!1;if(void 0==this.noneUnit.expired||""==this.noneUnit.expired)return this.$message.error("请输入规格期限"),!1;var t={};t.name=this.noneUnit.name,t.isvalid=1,t.price=100*this.noneUnit.price,t.expired=this.noneUnit.expired,this.lottery.unit.push(t),this.noneUnit.name="",this.noneUnit.price="",this.noneUnit.expired=""},handleUnitStatus:function(t){var e=this;void 0!=t.id&&null!=t.id&&""!=t.id&&function(t,e){return Object(n.a)({url:"/operator/unitupdate",method:"post",params:{unitid:t,isvalid:e}})}(t.id,t.isvalid).then(function(i){0==i.code?e.$message.success(0==t.isvalid?"已变更为失效":"已变更为有效"):e.$message.error(i.msg)})}}},u=(i("5bXq"),i("KHd+")),d=Object(u.a)(c,function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"app-container"},["list"==t.show?i("div",[i("div",{staticClass:"filter-container"},[i("el-input",{staticClass:"filter-item",staticStyle:{width:"200px"},attrs:{placeholder:t.$t("lottery.name")},model:{value:t.listQuery.name,callback:function(e){t.$set(t.listQuery,"name",e)},expression:"listQuery.name"}}),t._v(" "),i("el-select",{staticClass:"filter-item",staticStyle:{width:"200px"},attrs:{placeholder:t.$t("lottery.isvalid"),clearable:""},model:{value:t.listQuery.isvalid,callback:function(e){t.$set(t.listQuery,"isvalid",e)},expression:"listQuery.isvalid"}},t._l(t.isvalidOptions,function(t){return i("el-option",{key:t.key,attrs:{label:t.display_name,value:t.key}})})),t._v(" "),i("el-button",{directives:[{name:"waves",rawName:"v-waves"}],staticClass:"filter-item",attrs:{type:"primary",icon:"el-icon-search"},on:{click:t.getList}},[t._v(t._s(t.$t("table.search")))]),t._v(" "),i("el-button",{staticClass:"filter-item",staticStyle:{"margin-left":"10px"},attrs:{type:"primary",icon:"el-icon-edit"},on:{click:t.handleCreate}},[t._v(t._s(t.$t("table.add")))])],1),t._v(" "),i("el-table",{directives:[{name:"loading",rawName:"v-loading",value:t.listLoading,expression:"listLoading"}],staticStyle:{width:"100%"},attrs:{data:t.list,border:"",fit:"","highlight-current-row":""}},[i("el-table-column",{attrs:{type:"index",width:"60",label:"序号"}}),t._v(" "),i("el-table-column",{attrs:{width:"180",align:"center",label:"活动名称","show-overflow-tooltip":""},scopedSlots:t._u([{key:"default",fn:function(e){return[i("span",[t._v(t._s(e.row.name))])]}}])}),t._v(" "),i("el-table-column",{attrs:{"class-name":"status-col",label:"是否有效",width:"110"},scopedSlots:t._u([{key:"default",fn:function(e){return[i("el-tag",{attrs:{type:1==e.row.isvalid?"success":"danger"}},[t._v(t._s(1==e.row.isvalid?"有效":"无效"))])]}}])}),t._v(" "),i("el-table-column",{attrs:{"min-width":"300",align:"center",label:"活动描述","show-overflow-tooltip":""},scopedSlots:t._u([{key:"default",fn:function(e){return[i("span",[t._v(t._s(e.row.description))])]}}])}),t._v(" "),i("el-table-column",{attrs:{"min-width":"300",label:"操作"},scopedSlots:t._u([{key:"default",fn:function(e){return[i("el-button",{attrs:{size:"small"},on:{click:function(i){t.handleDetail(e.$index,e.row)}}},[t._v("详情")]),t._v(" "),i("el-button",{attrs:{size:"small"},on:{click:function(i){t.handleUpdate(e.$index,e.row)}}},[t._v("编辑")]),t._v(" "),i("el-button",{attrs:{size:"small",type:"danger"},on:{click:function(i){t.handleRemove(e.$index,e.row)}}},[t._v("删除")])]}}])})],1),t._v(" "),i("pagination",{directives:[{name:"show",rawName:"v-show",value:t.total>0,expression:"total>0"}],attrs:{total:t.total,page:t.listQuery.pagenum,limit:t.listQuery.pagesize},on:{"update:page":function(e){t.$set(t.listQuery,"pagenum",e)},"update:limit":function(e){t.$set(t.listQuery,"pagesize",e)},pagination:t.getList}})],1):t._e(),t._v(" "),"detail"==t.show?i("div",[i("div",{staticClass:"lottery-detail-box"},[i("div",{staticClass:"lottery-detail-item lottery-detail-basic-box"},[i("div",{staticClass:"lottery-detail-basic-image"},[i("img",{attrs:{src:t.lottery.product.icon}})]),t._v(" "),i("div",{staticClass:"lottery-detail-basic-text"},[i("div",{staticClass:"lottery-detail-basic-text-item"},[i("span",{staticClass:"lottery-detail-basic-text-name"},[t._v(t._s(t.lottery.product.name))])]),t._v(" "),i("div",{staticClass:"lottery-detail-basic-text-item"},[i("span",{staticClass:"lottery-detail-basic-text-description"},[t._v("描述："+t._s(t.lottery.product.description?t.lottery.product.description:"无"))])]),t._v(" "),t.lottery.unit.length>0?i("div",{staticClass:"lottery-detail-basic-text-item lottery-detail-unit-box"},t._l(t.lottery.unit,function(e){return i("div",{key:e.id,staticClass:"lottery-detail-unit"},[i("el-tag",{attrs:{type:1==e.isvalid?"success":"danger"}},[i("div",{staticClass:"lottery-detail-unit-item lottery-detail-unit-name"},[t._v(t._s(e.name))]),t._v(" "),i("div",{staticClass:"lottery-detail-unit-item lottery-detail-unit-price"},[t._v("￥"+t._s(e.price/100))])])],1)})):t._e(),t._v(" "),t.lottery.unit.length>0?i("div",{staticClass:"lottery-detail-basic-text-item"},[i("span",{staticClass:"lottery-detail-basic-text-invalid"},[t._v("*红色为无效规格")])]):t._e(),t._v(" "),i("div",{staticClass:"lottery-detail-basic-text-item lottery-detail-botton"},[i("el-button",{attrs:{size:"small",type:"danger"},on:{click:function(e){t.showView("edit")}}},[t._v("编辑")]),t._v(" "),i("el-button",{attrs:{size:"small"},on:{click:function(e){t.showView("list")}}},[t._v("返回")])],1)])])])]):t._e(),t._v(" "),"edit"==t.show||"add"==t.show?i("div",[i("el-row",{staticClass:"goods-form-area"},[i("el-col",{attrs:{span:16}},[i("el-form",{ref:"lotteryForm",attrs:{model:t.lottery,rules:t.lotteryRules,"label-width":"100px"}},[i("el-form-item",{attrs:{label:"活动图片",prop:"product.icon"}},[i("el-upload",{staticClass:"editor-slide-upload",attrs:{multiple:!1,limit:1,"file-list":t.fileList,"on-remove":t.handleImageRemove,"on-success":t.handleImageSuccess,"before-upload":t.beforeImageUpload,action:t.service+"/fileupload/multiUpload","list-type":"picture-card"}},[i("el-button",{attrs:{size:"small",type:"primary"}},[t._v("点击上传")])],1)],1),t._v(" "),i("el-form-item",{attrs:{label:"活动名称",prop:"product.name"}},[i("el-input",{attrs:{placeholder:t.$t("lottery.name")},model:{value:t.lottery.product.name,callback:function(e){t.$set(t.lottery.product,"name",e)},expression:"lottery.product.name"}})],1),t._v(" "),i("el-form-item",{attrs:{label:"是否有效"}},[i("el-switch",{attrs:{"active-value":1,"inactive-value":0,"active-text":"是","inactive-text":"否"},model:{value:t.lottery.product.isvalid,callback:function(e){t.$set(t.lottery.product,"isvalid",e)},expression:"lottery.product.isvalid"}})],1),t._v(" "),i("el-form-item",{attrs:{label:"活动描述"}},[i("el-input",{attrs:{type:"textarea",autosize:{minRows:6},placeholder:t.$t("lottery.description")},model:{value:t.lottery.product.description,callback:function(e){t.$set(t.lottery.product,"description",e)},expression:"lottery.product.description"}})],1),t._v(" "),i("el-form-item",{attrs:{label:"活动规格",prop:"unit"}},[t._l(t.lottery.unit,function(e,n){return i("div",{key:n,staticClass:"unit-box"},[i("el-row",[i("el-col",{attrs:{span:8}},[t._v(t._s(e.name))]),t._v(" "),i("el-col",{attrs:{span:7}},[t._v("￥"+t._s(e.price/100))]),t._v(" "),i("el-col",{attrs:{span:4}},[t._v(t._s(e.expired)+"个月")]),t._v(" "),i("el-col",{attrs:{span:2}},[i("el-switch",{attrs:{"active-value":1,"inactive-value":0},on:{change:function(i){t.handleUnitStatus(e)}},model:{value:e.isvalid,callback:function(i){t.$set(e,"isvalid",i)},expression:"item.isvalid"}})],1),t._v(" "),i("el-col",{staticStyle:{"text-align":"right"},attrs:{span:3}},[i("el-button",{attrs:{type:"danger",size:"mini"},on:{click:function(e){t.handleRemoveUnit(n)}}},[t._v("删除")])],1)],1)],1)}),t._v(" "),i("div",{staticClass:"unit-box"},[i("el-row",[i("el-col",{attrs:{span:7}},[i("el-input",{attrs:{placeholder:t.$t("lottery.unitName")},model:{value:t.noneUnit.name,callback:function(e){t.$set(t.noneUnit,"name",e)},expression:"noneUnit.name"}})],1),t._v(" "),i("el-col",{attrs:{span:6,offset:1}},[i("el-input",{attrs:{placeholder:t.$t("lottery.unitPrice")},model:{value:t.noneUnit.price,callback:function(e){t.$set(t.noneUnit,"price",e)},expression:"noneUnit.price"}},[i("template",{slot:"append"},[t._v("元")])],2)],1),t._v(" "),i("el-col",{attrs:{span:6,offset:1}},[i("el-input",{attrs:{placeholder:t.$t("lottery.unitExpired")},model:{value:t.noneUnit.expired,callback:function(e){t.$set(t.noneUnit,"expired",e)},expression:"noneUnit.expired"}},[i("template",{slot:"append"},[t._v("月")])],2)],1),t._v(" "),i("el-col",{staticStyle:{"text-align":"right"},attrs:{span:3}},[i("el-button",{attrs:{type:"primary",size:"mini"},on:{click:t.handleAddUnit}},[t._v("添加")])],1)],1)],1)],2),t._v(" "),i("el-form-item",[i("el-button",{attrs:{size:"small",type:"primary"},on:{click:t.handleSubmit}},[t._v("保存")]),t._v(" "),i("el-button",{attrs:{size:"small"},on:{click:function(e){t.showView("list")}}},[t._v("取消")])],1)],1)],1)],1)],1):t._e()])},[],!1,null,"2436c20b",null);d.options.__file="list.vue";e.default=d.exports},Zxqb:function(t,e,i){},ZySA:function(t,e,i){"use strict";var n=i("P2sY"),a=i.n(n),s=(i("jUE0"),{bind:function(t,e){t.addEventListener("click",function(i){var n=a()({},e.value),s=a()({ele:t,type:"hit",color:"rgba(0, 0, 0, 0.15)"},n),o=s.ele;if(o){o.style.position="relative",o.style.overflow="hidden";var l=o.getBoundingClientRect(),r=o.querySelector(".waves-ripple");switch(r?r.className="waves-ripple":((r=document.createElement("span")).className="waves-ripple",r.style.height=r.style.width=Math.max(l.width,l.height)+"px",o.appendChild(r)),s.type){case"center":r.style.top=l.height/2-r.offsetHeight/2+"px",r.style.left=l.width/2-r.offsetWidth/2+"px";break;default:r.style.top=(i.pageY-l.top-r.offsetHeight/2-document.documentElement.scrollTop||document.body.scrollTop)+"px",r.style.left=(i.pageX-l.left-r.offsetWidth/2-document.documentElement.scrollLeft||document.body.scrollLeft)+"px"}return r.style.backgroundColor=s.color,r.className="waves-ripple z-active",!1}},!1)}}),o=function(t){t.directive("waves",s)};window.Vue&&(window.waves=s,Vue.use(o)),s.install=o;e.a=s},jUE0:function(t,e,i){}}]);
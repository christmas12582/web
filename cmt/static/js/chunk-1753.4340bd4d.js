(window.webpackJsonp=window.webpackJsonp||[]).push([["chunk-1753"],{"79xw":function(t,n,e){"use strict";var i=e("s6AK");e.n(i).a},EXvN:function(t,n,e){},FRYs:function(t,n,e){"use strict";"function"==typeof Symbol&&Symbol.iterator;var i=Object.assign||function(t){for(var n=1;n<arguments.length;n++){var e=arguments[n];for(var i in e)Object.prototype.hasOwnProperty.call(e,i)&&(t[i]=e[i])}return t};function o(t){if(Array.isArray(t)){for(var n=0,e=Array(t.length);n<t.length;n++)e[n]=t[n];return e}return Array.from(t)}!function(){Array.from||(Array.from=function(t){return[].slice.call(t)});var n=e("U/5H");t.exports=function(t){function n(t){t.parentElement.removeChild(t)}function e(t,n,e){var i=0===e?t.children[0]:t.children[e-1].nextSibling;t.insertBefore(n,i)}function r(t,n){var e=this;this.$nextTick(function(){return e.$emit(t.toLowerCase(),n)})}var s=["Start","Add","Remove","Update","End"],a=["Choose","Sort","Filter","Clone"],l=["Move"].concat(s,a).map(function(t){return"on"+t}),u=null;return{name:"draggable",props:{options:Object,list:{type:Array,required:!1,default:null},value:{type:Array,required:!1,default:null},noTransitionOnDrag:{type:Boolean,default:!1},clone:{type:Function,default:function(t){return t}},element:{type:String,default:"div"},move:{type:Function,default:null},componentData:{type:Object,required:!1,default:null}},data:function(){return{transitionMode:!1,noneFunctionalComponentMode:!1,init:!1}},render:function(t){var n=this.$slots.default;if(n&&1===n.length){var e=n[0];e.componentOptions&&"transition-group"===e.componentOptions.tag&&(this.transitionMode=!0)}var i=0,r=n,s=this.$slots,a=s.header,l=s.footer;a&&(i=a.length,r=r?[].concat(o(a),o(r)):[].concat(o(a))),l&&(r=r?[].concat(o(r),o(l)):[].concat(o(l))),this.headerOffset=i;var u=null,c=function(t,n){u=function(t,n,e){return void 0==e?t:((t=null==t?{}:t)[n]=e,t)}(u,t,n)};if(c("attrs",this.$attrs),this.componentData){var d=this.componentData,h=d.on,f=d.props;c("on",h),c("props",f)}return t(this.element,u,r)},mounted:function(){var n=this;if(this.noneFunctionalComponentMode=this.element.toLowerCase()!==this.$el.nodeName.toLowerCase(),this.noneFunctionalComponentMode&&this.transitionMode)throw new Error("Transition-group inside component is not supported. Please alter element value or remove transition-group. Current element value: "+this.element);var e={};s.forEach(function(t){e["on"+t]=function(t){var n=this;return function(e){null!==n.realList&&n["onDrag"+t](e),r.call(n,t,e)}}.call(n,t)}),a.forEach(function(t){e["on"+t]=r.bind(n,t)});var o=i({},this.options,e,{onMove:function(t,e){return n.onDragMove(t,e)}});!("draggable"in o)&&(o.draggable=">*"),this._sortable=new t(this.rootContainer,o),this.computeIndexes()},beforeDestroy:function(){void 0!==this._sortable&&this._sortable.destroy()},computed:{rootContainer:function(){return this.transitionMode?this.$el.children[0]:this.$el},isCloning:function(){return!!this.options&&!!this.options.group&&"clone"===this.options.group.pull},realList:function(){return this.list?this.list:this.value}},watch:{options:{handler:function(t){for(var n in t)-1==l.indexOf(n)&&this._sortable.option(n,t[n])},deep:!0},realList:function(){this.computeIndexes()}},methods:{getChildrenNodes:function(){if(this.init||(this.noneFunctionalComponentMode=this.noneFunctionalComponentMode&&1==this.$children.length,this.init=!0),this.noneFunctionalComponentMode)return this.$children[0].$slots.default;var t=this.$slots.default;return this.transitionMode?t[0].child.$slots.default:t},computeIndexes:function(){var t=this;this.$nextTick(function(){t.visibleIndexes=function(t,n,e){if(!t)return[];var i=t.map(function(t){return t.elm}),r=[].concat(o(n)).map(function(t){return i.indexOf(t)});return e?r.filter(function(t){return-1!==t}):r}(t.getChildrenNodes(),t.rootContainer.children,t.transitionMode)})},getUnderlyingVm:function(t){var n=function(t,n){return t.map(function(t){return t.elm}).indexOf(n)}(this.getChildrenNodes()||[],t);return-1===n?null:{index:n,element:this.realList[n]}},getUnderlyingPotencialDraggableComponent:function(t){var n=t.__vue__;return n&&n.$options&&"transition-group"===n.$options._componentTag?n.$parent:n},emitChanges:function(t){var n=this;this.$nextTick(function(){n.$emit("change",t)})},alterList:function(t){if(this.list)t(this.list);else{var n=[].concat(o(this.value));t(n),this.$emit("input",n)}},spliceList:function(){var t=arguments,n=function(n){return n.splice.apply(n,t)};this.alterList(n)},updatePosition:function(t,n){var e=function(e){return e.splice(n,0,e.splice(t,1)[0])};this.alterList(e)},getRelatedContextFromMoveEvent:function(t){var n=t.to,e=t.related,o=this.getUnderlyingPotencialDraggableComponent(n);if(!o)return{component:o};var r=o.realList,s={list:r,component:o};if(n!==e&&r&&o.getUnderlyingVm){var a=o.getUnderlyingVm(e);if(a)return i(a,s)}return s},getVmIndex:function(t){var n=this.visibleIndexes,e=n.length;return t>e-1?e:n[t]},getComponent:function(){return this.$slots.default[0].componentInstance},resetTransitionData:function(t){if(this.noTransitionOnDrag&&this.transitionMode){this.getChildrenNodes()[t].data=null;var n=this.getComponent();n.children=[],n.kept=void 0}},onDragStart:function(t){this.context=this.getUnderlyingVm(t.item),t.item._underlying_vm_=this.clone(this.context.element),u=t.item},onDragAdd:function(t){this.updateEvenemt(t);var e=t.item._underlying_vm_;if(void 0!==e){n(t.item);var i=this.getVmIndex(t.newIndex);this.spliceList(i,0,e),this.computeIndexes();var o={element:e,newIndex:i};this.emitChanges({added:o})}},onDragRemove:function(t){if(this.updateEvenemt(t),e(this.rootContainer,t.item,t.oldIndex),this.isCloning)n(t.clone);else{var i=this.context.index;this.spliceList(i,1);var o={element:this.context.element,oldIndex:i};this.resetTransitionData(i),this.emitChanges({removed:o})}},onDragUpdate:function(t){this.updateEvenemt(t),n(t.item),e(t.from,t.item,t.oldIndex);var i=this.context.index,o=this.getVmIndex(t.newIndex);this.updatePosition(i,o);var r={element:this.context.element,oldIndex:i,newIndex:o};this.emitChanges({moved:r})},updateEvenemt:function(t){this.updateProperty(t,"newIndex"),this.updateProperty(t,"oldIndex")},updateProperty:function(t,n){t.hasOwnProperty(n)&&(t[n]+=this.headerOffset)},computeFutureIndex:function(t,n){if(!t.element)return 0;var e=[].concat(o(n.to.children)).filter(function(t){return"none"!==t.style.display}),i=e.indexOf(n.related),r=t.component.getVmIndex(i);return-1==e.indexOf(u)&&n.willInsertAfter?r+1:r},onDragMove:function(t,n){var e=this.move;if(!e||!this.realList)return!0;var o=this.getRelatedContextFromMoveEvent(t),r=this.context,s=this.computeFutureIndex(o,t);return i(r,{futureIndex:s}),i(t,{relatedContext:o,draggedContext:r}),e(t,n)},onDragEnd:function(t){this.computeIndexes(),u=null}}}}(n)}()},PTVM:function(t,n,e){"use strict";var i=e("EXvN");e.n(i).a},Z4x1:function(t,n,e){"use strict";e.r(n);var i=e("FRYs"),o={name:"DragKanbanDemo",components:{draggable:e.n(i).a},props:{headerText:{type:String,default:"Header"},options:{type:Object,default:function(){return{}}},list:{type:Array,default:function(){return[]}}}},r=(e("PTVM"),e("KHd+")),s=Object(r.a)(o,function(){var t=this,n=t.$createElement,e=t._self._c||n;return e("div",{staticClass:"board-column"},[e("div",{staticClass:"board-column-header"},[t._v("\n    "+t._s(t.headerText)+"\n  ")]),t._v(" "),e("draggable",{staticClass:"board-column-content",attrs:{list:t.list,options:t.options}},t._l(t.list,function(n){return e("div",{key:n.id,staticClass:"board-item"},[t._v("\n      "+t._s(n.name)+" "+t._s(n.id)+"\n    ")])}))],1)},[],!1,null,null,null);s.options.__file="index.vue";var a={name:"DragKanbanDemo",components:{Kanban:s.exports},data:function(){return{options:{group:"mission"},list1:[{name:"Mission",id:1},{name:"Mission",id:2},{name:"Mission",id:3},{name:"Mission",id:4}],list2:[{name:"Mission",id:5},{name:"Mission",id:6},{name:"Mission",id:7}],list3:[{name:"Mission",id:8},{name:"Mission",id:9},{name:"Mission",id:10}]}}},l=(e("79xw"),Object(r.a)(a,function(){var t=this,n=t.$createElement,e=t._self._c||n;return e("div",{staticClass:"components-container board"},[e("Kanban",{key:1,staticClass:"kanban todo",attrs:{list:t.list1,options:t.options,"header-text":"Todo"}}),t._v(" "),e("Kanban",{key:2,staticClass:"kanban working",attrs:{list:t.list2,options:t.options,"header-text":"Working"}}),t._v(" "),e("Kanban",{key:3,staticClass:"kanban done",attrs:{list:t.list3,options:t.options,"header-text":"Done"}})],1)},[],!1,null,null,null));l.options.__file="dragKanban.vue";n.default=l.exports},s6AK:function(t,n,e){}}]);
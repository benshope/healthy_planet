// jQuery List DragSort v0.5.1
// License: http://dragsort.codeplex.com/license
(function(b){b.fn.dragsort=function(k){if("destroy"==k)b(this.selector).trigger("dragsort-uninit");else{var f=b.extend({},b.fn.dragsort.defaults,k),h=[],a=null,l=null;this.each(function(k,j){b(j).is("table")&&1==b(j).children().size()&&b(j).children().is("tbody")&&(j=b(j).children().get(0));var m={draggedItem:null,placeHolderItem:null,pos:null,offset:null,offsetLimit:null,scroll:null,container:j,init:function(){var a=0==b(this.container).children().size()?"li":b(this.container).children(":first").get(0).tagName.toLowerCase(); ""==f.itemSelector&&(f.itemSelector=a);""==f.dragSelector&&(f.dragSelector=a);""==f.placeHolderTemplate&&(f.placeHolderTemplate="<"+a+">&nbsp;</"+a+">");b(this.container).attr("data-listidx",k).mousedown(this.grabItem).bind("dragsort-uninit",this.uninit);this.styleDragHandlers(!0)},uninit:function(){var a=h[b(this).attr("data-listidx")];b(a.container).unbind("mousedown",a.grabItem).unbind("dragsort-uninit");a.styleDragHandlers(!1)},getItems:function(){return b(this.container).children(f.itemSelector)}, styleDragHandlers:function(a){this.getItems().map(function(){return b(this).is(f.dragSelector)?this:b(this).find(f.dragSelector).get()}).css("cursor",a?"pointer":"")},grabItem:function(a){if(!(1!=a.which||b(a.target).is(f.dragSelectorExclude)||0<b(a.target).closest(f.dragSelectorExclude).size()||0==b(a.target).closest(f.itemSelector).size())){a.preventDefault();for(var c=a.target;!b(c).is(f.dragSelector);){if(c==this)return;c=c.parentNode}b(c).attr("data-cursor",b(c).css("cursor"));b(c).css("cursor", "move");var e=h[b(this).attr("data-listidx")],g=this,i=function(){e.dragStart.call(g,a);b(e.container).unbind("mousemove",i)};b(e.container).mousemove(i).mouseup(function(){b(e.container).unbind("mousemove",i);b(c).css("cursor",b(c).attr("data-cursor"))})}},dragStart:function(d){null!=a&&null!=a.draggedItem&&a.dropItem();a=h[b(this).attr("data-listidx")];a.draggedItem=b(d.target).closest(f.itemSelector);a.draggedItem.attr("data-origpos",b(this).attr("data-listidx")+"-"+a.getItems().index(a.draggedItem)); var c=parseInt(a.draggedItem.css("marginTop")),e=parseInt(a.draggedItem.css("marginLeft"));a.offset=a.draggedItem.offset();a.offset.top=d.pageY-a.offset.top+(isNaN(c)?0:c)-1;a.offset.left=d.pageX-a.offset.left+(isNaN(e)?0:e)-1;f.dragBetween||(c=0==b(a.container).outerHeight()?Math.max(1,Math.round(0.5+a.getItems().size()*a.draggedItem.outerWidth()/b(a.container).outerWidth()))*a.draggedItem.outerHeight():b(a.container).outerHeight(),a.offsetLimit=b(a.container).offset(),a.offsetLimit.right=a.offsetLimit.left+ b(a.container).outerWidth()-a.draggedItem.outerWidth(),a.offsetLimit.bottom=a.offsetLimit.top+c-a.draggedItem.outerHeight());c=a.draggedItem.height();e=a.draggedItem.width();"tr"==f.itemSelector?(a.draggedItem.children().each(function(){b(this).width(b(this).width())}),a.placeHolderItem=a.draggedItem.clone().attr("data-placeholder",!0),a.draggedItem.after(a.placeHolderItem),a.placeHolderItem.children().each(function(){b(this).css({borderWidth:0,width:b(this).width()+1,height:b(this).height()+1}).html("&nbsp;")})): (a.draggedItem.after(f.placeHolderTemplate),a.placeHolderItem=a.draggedItem.next().css({height:c,width:e}).attr("data-placeholder",!0));if("td"==f.itemSelector){var g=a.draggedItem.closest("table").get(0);b("<table id='"+g.id+"' style='border-width: 0px;' class='dragSortItem "+g.className+"'><tr></tr></table>").appendTo("body").children().append(a.draggedItem)}g=a.draggedItem.attr("style");a.draggedItem.attr("data-origstyle",g?g:"");a.draggedItem.css({position:"absolute",opacity:0.8,"z-index":999, height:c,width:e});a.scroll={moveX:0,moveY:0,maxX:b(document).width()-b(window).width(),maxY:b(document).height()-b(window).height()};a.scroll.scrollY=window.setInterval(function(){if(f.scrollContainer!=window)b(f.scrollContainer).scrollTop(b(f.scrollContainer).scrollTop()+a.scroll.moveY);else{var c=b(f.scrollContainer).scrollTop();if(0<a.scroll.moveY&&c<a.scroll.maxY||0>a.scroll.moveY&&0<c)b(f.scrollContainer).scrollTop(c+a.scroll.moveY),a.draggedItem.css("top",a.draggedItem.offset().top+a.scroll.moveY+ 1)}},10);a.scroll.scrollX=window.setInterval(function(){if(f.scrollContainer!=window)b(f.scrollContainer).scrollLeft(b(f.scrollContainer).scrollLeft()+a.scroll.moveX);else{var c=b(f.scrollContainer).scrollLeft();if(0<a.scroll.moveX&&c<a.scroll.maxX||0>a.scroll.moveX&&0<c)b(f.scrollContainer).scrollLeft(c+a.scroll.moveX),a.draggedItem.css("left",a.draggedItem.offset().left+a.scroll.moveX+1)}},10);b(h).each(function(a,b){b.createDropTargets();b.buildPositionTable()});a.setPos(d.pageX,d.pageY);b(document).bind("mousemove", a.swapItems);b(document).bind("mouseup",a.dropItem);f.scrollContainer!=window&&b(window).bind("DOMMouseScroll mousewheel",a.wheel)},setPos:function(d,c){var e=c-this.offset.top,g=d-this.offset.left;f.dragBetween||(e=Math.min(this.offsetLimit.bottom,Math.max(e,this.offsetLimit.top)),g=Math.min(this.offsetLimit.right,Math.max(g,this.offsetLimit.left)));this.draggedItem.parents().each(function(){if("static"!=b(this).css("position")&&(!b.browser.mozilla||"table"!=b(this).css("display"))){var a=b(this).offset(); e-=a.top;g-=a.left;return!1}});if(f.scrollContainer==window)c-=b(window).scrollTop(),d-=b(window).scrollLeft(),c=Math.max(0,c-b(window).height()+5)+Math.min(0,c-5),d=Math.max(0,d-b(window).width()+5)+Math.min(0,d-5);else var i=b(f.scrollContainer),h=i.offset(),c=Math.max(0,c-i.height()-h.top)+Math.min(0,c-h.top),d=Math.max(0,d-i.width()-h.left)+Math.min(0,d-h.left);a.scroll.moveX=0==d?0:d*f.scrollSpeed/Math.abs(d);a.scroll.moveY=0==c?0:c*f.scrollSpeed/Math.abs(c);this.draggedItem.css({top:e,left:g})}, wheel:function(d){if((b.browser.safari||b.browser.mozilla)&&a&&f.scrollContainer!=window){var c=b(f.scrollContainer),e=c.offset();d.pageX>e.left&&d.pageX<e.left+c.width()&&d.pageY>e.top&&d.pageY<e.top+c.height()&&(e=d.detail?5*d.detail:d.wheelDelta/-2,c.scrollTop(c.scrollTop()+e),d.preventDefault())}},buildPositionTable:function(){var d=[];this.getItems().not([a.draggedItem[0],a.placeHolderItem[0]]).each(function(a){var e=b(this).offset();e.right=e.left+b(this).outerWidth();e.bottom=e.top+b(this).outerHeight(); e.elm=this;d[a]=e});this.pos=d},dropItem:function(){if(null!=a.draggedItem){var d=a.draggedItem.attr("data-origstyle");a.draggedItem.attr("style",d);""==d&&a.draggedItem.removeAttr("style");a.draggedItem.removeAttr("data-origstyle");a.styleDragHandlers(!0);a.placeHolderItem.before(a.draggedItem);a.placeHolderItem.remove();b("[data-droptarget], .dragSortItem").remove();window.clearInterval(a.scroll.scrollY);window.clearInterval(a.scroll.scrollX);a.draggedItem.attr("data-origpos")!=b(h).index(a)+"-"+ a.getItems().index(a.draggedItem)&&f.dragEnd.apply(a.draggedItem);a.draggedItem.removeAttr("data-origpos");a.draggedItem=null;b(document).unbind("mousemove",a.swapItems);b(document).unbind("mouseup",a.dropItem);f.scrollContainer!=window&&b(window).unbind("DOMMouseScroll mousewheel",a.wheel);return!1}},swapItems:function(d){if(null==a.draggedItem)return!1;a.setPos(d.pageX,d.pageY);for(var c=a.findPos(d.pageX,d.pageY),e=a,g=0;-1==c&&f.dragBetween&&g<h.length;g++)c=h[g].findPos(d.pageX,d.pageY),e=h[g]; if(-1==c)return!1;var i=function(){return b(e.container).children().not(e.draggedItem)},d=i().not(f.itemSelector).each(function(){this.idx=i().index(this)});null==l||l.top>a.draggedItem.offset().top||l.left>a.draggedItem.offset().left?b(e.pos[c].elm).before(a.placeHolderItem):b(e.pos[c].elm).after(a.placeHolderItem);d.each(function(){var a=i().eq(this.idx).get(0);this!=a&&i().index(this)<this.idx?b(this).insertAfter(a):this!=a&&b(this).insertBefore(a)});b(h).each(function(a,b){b.createDropTargets(); b.buildPositionTable()});l=a.draggedItem.offset();return!1},findPos:function(a,b){for(var e=0;e<this.pos.length;e++)if(this.pos[e].left<a&&this.pos[e].right>a&&this.pos[e].top<b&&this.pos[e].bottom>b)return e;return-1},createDropTargets:function(){f.dragBetween&&b(h).each(function(){var d=b(this.container).find("[data-placeholder]"),c=b(this.container).find("[data-droptarget]");0<d.size()&&0<c.size()?c.remove():0==d.size()&&0==c.size()&&("td"==f.itemSelector?b(f.placeHolderTemplate).attr("data-droptarget", !0).appendTo(this.container):b(this.container).append(a.placeHolderItem.removeAttr("data-placeholder").clone().attr("data-droptarget",!0)),a.placeHolderItem.attr("data-placeholder",!0))})}};m.init();h.push(m)});return this}};b.fn.dragsort.defaults={itemSelector:"",dragSelector:"",dragSelectorExclude:"input, textarea",dragEnd:function(){},dragBetween:!1,placeHolderTemplate:"",scrollContainer:window,scrollSpeed:5}})(jQuery);

/*global jQuery, document*/
jQuery(document).ready(function($) {
	jQuery("ul.text_sortable").dragsort({
		dragSelector: ".drag",
		dragBetween: true,
		dragEnd: triggerSaveNotice
	});

	function triggerSaveNotice() {
		jQuery('#redux-opts-save-warn').slideDown('slow');
	};
});

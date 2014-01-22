function Tabulatr(a){this.id=a,this.name="",this.moreResults=!0,this.currentData=null,this.locked=!1}var tabulatr_tables;Tabulatr.prototype={constructor:Tabulatr,createPaginationListItem:function(a,t){var e=$('<li><a href="" data-page="'+a+'">'+a+"</a></li>");return t&&e.addClass("active"),e},updatePagination:function(a,t){var e=$(".pagination[data-table="+this.id+"] > ul");if(e.html(""),13>t)for(var i=1;t>=i;i++)e.append(this.createPaginationListItem(i,i==a));else{a>1&&e.append(this.createPaginationListItem(1,!1));var r=Math.floor((1+a)/2);r>1&&a-2>r&&(e.append("<li><span>...</span></li>"),e.append(this.createPaginationListItem(r,!1))),a>4&&e.append("<li><span>...</span></li>"),a>3&&(e.append(this.createPaginationListItem(a-2,!1)),e.append(this.createPaginationListItem(a-1,!1))),e.append(this.createPaginationListItem(a,!0)),t-1>a&&e.append(this.createPaginationListItem(a+1,!1)),t-2>a&&e.append(this.createPaginationListItem(a+2,!1)),t-3>a&&e.append("<li><span>...</span></li>"),r=Math.floor((a+t)/2),r>a+3&&t-1>r&&(e.append(this.createPaginationListItem(r,!1)),e.append("<li><span>...</span></li>")),t>a&&e.append(this.createPaginationListItem(t,!1))}},updateTable:function(a,t){var e=$("#"+this.id);if(void 0===a.page||t)this.storePage=!1;else if(this.storePage=!0,e.find("tbody tr").hide(),e.find("tbody tr[data-page="+a.page+"]").length>0)return e.find("tbody tr[data-page="+a.page+"]").show(),this.updatePagination(a.page,$(".pagination[data-table="+this.id+"] a:last").data("page"),this.id),void 0;if(!this.locked){this.locked=!0;this.showLoadingSpinner(),$.ajax({context:this,type:"GET",url:$("table#"+this.id).data("path")+".json",data:this.createParameterString(a,this.id),success:this.handleResponse,complete:this.hideLoadingSpinner})}},checkIfCheckboxesAreMarked:function(){return $("tr[data-page] input[type=checkbox]:checked").length>0},handleResponse:function(a){this.insertTabulatrData(a),this.updatePagination(a.meta.page,a.meta.pages,a.meta.table_id),this.locked=!1},insertTabulatrData:function(a){var t=a.meta.table_id,e=$("#"+t+" tbody");if(a.meta.append||(this.storePage?$("#"+t+" tbody tr").hide():$("#"+t+" tbody").html("")),0===a.data.length)this.moreResults=!1,$(".pagination_trigger[data-table="+t+"]").unbind("inview");else{a.data.length<a.meta.pagesize?(this.moreResults=!1,$(".pagination_trigger[data-table="+t+"]").unbind("inview")):this.moreResults=!0;for(var i=0;i<a.data.length;i++){var r=a.data[i],l=r.id,n=$("tr.empty_row").clone();n.removeClass("empty_row"),r._row_config.data&&(n.data(r._row_config.data),delete r._row_config.data),n.attr(r._row_config),n.attr("data-page",a.meta.page),n.attr("data-id",l),n.find("td").each(function(a,t){var e=$(t),i=e.data("tabulatr-type"),n=e.data("tabulatr-column-name"),d=r[n];"checkbox"===i&&(d=$("<input>").attr("type","checkbox").val(l).addClass("tabulatr-checkbox")),e.html(d)}),e.append(n)}}var d=$(".tabulatr_count[data-table="+t+"]").data("format-string");d=d.replace(/%\{current\}/,a.meta.count),d=d.replace(/%\{total\}/,a.meta.total),d=d.replace(/%\{per_page\}/,a.meta.pagesize),$(".tabulatr_count[data-table="+t+"]").html(d)},replacer:function(a,t){return this.currentData[t]},makeAction:function(a,t){return this.currentData=t,unescape(a).replace(/{{([\w:]+)}}/g,this.replacer)},submitFilterForm:function(){return 0===$(".pagination[data-table="+this.id+"]").length&&($(".pagination_trigger[data-table="+this.id+"]").unbind("inview",cbfn),$(".pagination_trigger[data-table="+this.id+"]").bind("inview",cbfn)),this.updateTable({page:1,append:!1},!0),!1},createParameterString:function(a){var t=this.id.split("_")[0];void 0===a&&(a={},a.append=!1);var e=a.pagesize;void 0===e&&(e=$("table#"+this.id).data("pagesize")),void 0===a.page&&(a.page=Math.floor($("#"+this.id+" tbody tr[class!=empty_row]").length/e)+1,isFinite(a.page)||(a.page=1)),a.pagesize=e,a.arguments=$.map($("#"+this.id+" th"),function(a){return $(a).data("tabulatr-column-name")}).filter(function(a){return a}).join(),a.table_id=this.id,a[t+"_search"]=$("input#"+t+"_fuzzy_search_query").val();for(var i=$('.tabulatr_filter_form[data-table="'+this.id+'"]').find("input:visible,select:visible,input[type=hidden]").serializeArray(),r=0;r<i.length;r++)a[i[r].name]=i[r].value;return a},localDate:function(a){return new Date(a).toLocaleString()},showLoadingSpinner:function(){$(".tabulatr-spinner-box[data-table="+this.id+"]").show()},hideLoadingSpinner:function(){$(".tabulatr-spinner-box[data-table="+this.id+"]").hide()}},$(document).on("ready page:load",function(){if(tabulatr_tables=[],$("th.tabulatr-sortable").click(function(){for(var a=$(this),t=a.data("tabulatr-column-name"),e=a.attr("data-sorted"),i=a.parents("table"),r=i.attr("id"),l=void 0,n=0;n<tabulatr_tables.length;n++)tabulatr_tables[n].id==r&&(l=tabulatr_tables[n]);var d=l.id.split("_")[0];i.find("th.tabulatr-sortable.sorted").removeClass("sorted").removeAttr("data-sorted"),e="asc"===e?"desc":"asc",a.addClass("sorted").attr("data-sorted",e),$(".tabulatr_filter_form[data-table="+r+"] input[name="+d+"_sort]").val(t+" "+e),l.moreResults||(l.moreResults=!0,0===$(".pagination[data-table="+r+"]").length&&$(".pagination_trigger[data-table="+r+"]").bind("inview",cbfn)),$($(this).parents("table").find("tbody tr")).remove(),$(".tabulatr_mark_all[data-table="+d+"]").prop("checked",!1).prop("indeterminate",!1),l.updateTable({})}),$(".tabulatr_table").each(function(a,t){0===$('.pagination[data-table="'+$(t).attr("id")+'"]').length&&$('.pagination_trigger[data-table="'+$(t).attr("id")+'"]').bind("inview",cbfn)}),$(".batch-action-inputs").click(function(){var a=$(this),t=a.data("do-batch-action-name"),e=a.data("do-batch-action"),i=a.data("table-id"),r={page:1};r[t]=e,r.tabulatr_checked={checked_ids:jQuery.map($("#"+i+" .tabulatr-checkbox:checked"),function(a){return $(a).val()}).join(",")},$(".tabulatr_mark_all[data-table="+i+"]").prop("indeterminate",!1).prop("checked",!1),$("#"+i+" .tabulatr-wrench").addClass("disabled");for(var l=void 0,n=0;n<tabulatr_tables.length;n++)tabulatr_tables[n].id==i&&(l=tabulatr_tables[n]);l.updateTable(r,!0)}),$("form.tabulatr-fuzzy-search").submit(function(){var a=$(this).data("table");0===$(".pagination[data-table="+a+"]").length&&($(".pagination_trigger[data-table="+a+"]").unbind("inview",cbfn),$(".pagination_trigger[data-table="+a+"]").bind("inview",cbfn));for(var t=void 0,e=0;e<tabulatr_tables.length;e++)tabulatr_tables[e].id==a&&(t=tabulatr_tables[e]);return t.updateTable({page:1,append:!1},!0),!1}),$("form.tabulatr_filter_form").submit(function(){for(var a=$(this).data("table"),t=void 0,e=0;e<tabulatr_tables.length;e++)tabulatr_tables[e].id==a&&(t=tabulatr_tables[e]);return t.submitFilterForm(),!1}),$(".tabulatr_table").on("click","i.tabulatr_remove_filter",function(){var a=$(this).closest("th"),t=a.data("tabulatr-form-name").replace(/\[(like|checkbox|from|to)\]/,"");t=t.replace(/(:|\.|\[|\])/g,"\\$1"),a.removeClass("tabulatr_filtered_column"),$("[name^="+t+"]").is(":checkbox")?$("[name^="+t+"]").prop("checked",!1):$("[name^="+t+"]").val("");var e=$(this).closest(".tabulatr_table").attr("id");$(this).remove(),0===$(".pagination[data-table="+e+"]").length&&$(".pagination_trigger[data-table="+e+"]").bind("inview",cbfn);for(var i=void 0,r=0;r<tabulatr_tables.length;r++)tabulatr_tables[r].id==e&&(i=tabulatr_tables[r]);return i.updateTable({}),!1}),$(".tabulatr_mark_all").click(function(){for(var a=$(this).data("table"),t=void 0,e=0;e<tabulatr_tables.length;e++)tabulatr_tables[e].id==a&&(t=tabulatr_tables[e]);$(this).is(":checked")?($("#"+a+" tr[data-page]:visible input[type=checkbox]").prop("checked",!0),$("#"+a+" .tabulatr-wrench").removeClass("disabled")):($("#"+a+" tr[data-page]:visible input[type=checkbox]").prop("checked",!1),t.checkIfCheckboxesAreMarked()?$("#"+a+" .tabulatr-wrench").removeClass("disabled"):$("#"+a+" .tabulatr-wrench").addClass("disabled"))}),$(".tabulatr_table").on("click","input.tabulatr-checkbox",function(){for(var a=$(this).closest(".tabulatr_table").attr("id"),t=void 0,e=0;e<tabulatr_tables.length;e++)tabulatr_tables[e].id==a&&(t=tabulatr_tables[e]);$(this).is(":checked")?($("#"+a+" tr[data-page]:visible input[type=checkbox]").not(":checked").length>0?$(".tabulatr_mark_all[data-table="+a+"]").prop("indeterminate",!0):($(".tabulatr_mark_all[data-table="+a+"]").prop("indeterminate",!1),$(".tabulatr_mark_all[data-table="+a+"]").prop("checked",!0)),$("#"+a+" .tabulatr-wrench").removeClass("disabled")):$("#"+a+" tr[data-page]:visible input[type=checkbox]:checked").length>0?($(".tabulatr_mark_all[data-table="+a+"]").prop("indeterminate",!0),$("#"+a+" .tabulatr-wrench").removeClass("disabled")):($(".tabulatr_mark_all[data-table="+a+"]").prop("indeterminate",!1),$(".tabulatr_mark_all[data-table="+a+"]").prop("checked",!1),t.checkIfCheckboxesAreMarked()?$("#"+a+" .tabulatr-wrench").removeClass("disabled"):$("#"+a+" .tabulatr-wrench").addClass("disabled"))}),$(".tabulatr-per-page a").click(function(){if($(this).hasClass("active"))return!1;$(this).closest("div").find("a").removeClass("active"),$(this).addClass("active");for(var a=$(this).closest("div").data("table"),t=void 0,e=0;e<tabulatr_tables.length;e++)tabulatr_tables[e].id==a&&(t=tabulatr_tables[e]);t.moreResults=!0,0===$(".pagination[data-table="+a+"]").length&&$(".pagination_trigger[data-table="+a+"]").bind("inview",cbfn),void 0!==typeof Storage&&(localStorage.tabulatr_page_display_count=$(this).data("items-per-page")),t.updateTable({page:1},!0)}),$('.tabulatr_table:not(".tabulatr_static_table")').length>0){if(void 0!==typeof Storage){var a=localStorage.tabulatr_page_display_count;void 0!==a&&($(".tabulatr-per-page a").removeClass("active"),$(".tabulatr-per-page a[data-items-per-page="+a+"]").addClass("active"))}var t=void 0;$('.tabulatr_table:not(".tabulatr_static_table")').each(function(a,e){var i=$(e).attr("id");tabulatr_tables.push(new Tabulatr(i));for(var r=0;r<tabulatr_tables.length;r++)tabulatr_tables[r].id==i&&(t=tabulatr_tables[r]);t.updateTable({})})}}),$(document).on("click",".pagination a",function(){var a=$(this);if(a.parent().hasClass("active")||a.parent().hasClass("disabled"))return!1;var t=$(a).closest(".pagination").data("table");$(".tabulatr_mark_all[data-table="+t+"]").prop("checked",!1),$(".tabulatr_mark_all[data-table="+t+"]").prop("indeterminate",!1);for(var e=void 0,i=0;i<tabulatr_tables.length;i++)tabulatr_tables[i].id==t&&(e=tabulatr_tables[i]);return e.updateTable({append:!1,page:a.data("page")}),!1}),$(document).on("click","a[data-show-table-filter]",function(){var a=$(this),t=a.data("show-table-filter");return $('div[data-filter-column-name="'+t+'"]').show("blind"),$('div[data-filter-column-name="_submit"]').show("blind"),a.hide(),!1}),$(document).on("click","a[data-hide-table-filter]",function(){var a=$(this),t=a.data("hide-table-filter"),e=$('div[data-filter-column-name="'+t+'"]');e.hide("blind"),e.find("input[type=text]").val(""),$('a[data-show-table-filter="'+t+'"]').show(),$("div[data-filter-column-name]:visible").length<=2&&$('div[data-filter-column-name="_submit"]').hide("blind");for(var i=$(this).parents("form").data("table"),r=void 0,l=0;l<tabulatr_tables.length;l++)tabulatr_tables[l].id==i&&(r=tabulatr_tables[l]);return r.submitFilterForm(),!1}),$(document).on("change","select[data-tabulatr-date-filter]",function(){var a=$(this),t=a.find("option:selected"),e=t.val();"from_to"===e?a.parents(".controls").find(".from_to").show().removeClass("hidden"):a.parents(".controls").find(".from_to").hide().val("")});var cbfn=function(a,t,e,i){if(t)if("top"==i);else if("bottom"==i);else{for(var r=$(a.currentTarget).data("table"),l=void 0,n=0;n<tabulatr_tables.length;n++)tabulatr_tables[n].id==r&&(l=tabulatr_tables[n]);l.updateTable({append:!0})}};
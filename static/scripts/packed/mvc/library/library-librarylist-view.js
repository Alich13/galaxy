define(["galaxy.masthead","mvc/base-mvc","utils/utils","libs/toastr","mvc/library/library-model","mvc/library/library-libraryrow-view"],function(b,g,d,e,c,a){var f=Backbone.View.extend({el:"#libraries_element",events:{"click .sort-libraries-link":"sort_clicked"},modal:null,collection:null,rowViews:{},initialize:function(i){this.options=_.defaults(this.options||{},i);var h=this;this.rowViews={};this.collection=new c.Libraries();this.collection.fetch({success:function(){h.render()},error:function(k,j){if(typeof j.responseJSON!=="undefined"){e.error(j.responseJSON.err_msg)}else{e.error("An error ocurred :(")}}})},render:function(i){var j=this.templateLibraryList();var k=null;var h=Galaxy.libraries.preferences.get("with_deleted");var l=null;if(typeof i!=="undefined"){h=typeof i.with_deleted!=="undefined"?i.with_deleted:false;l=typeof i.models!=="undefined"?i.models:null}if(this.collection!==null&&l===null){this.sortLibraries();if(h){k=this.collection.models}else{k=this.collection.where({deleted:false})}}else{if(l!==null){k=l}else{k=[]}}this.$el.html(j({length:k.length,order:Galaxy.libraries.preferences.get("sort_order")}));if(k.length>0){this.renderRows(k)}$("#center [data-toggle]").tooltip();$("#center").css("overflow","auto")},renderRows:function(l){for(var k=0;k<l.length;k++){var j=l[k];var h=_.findWhere(this.rowViews,{id:j.get("id")});if(h!==undefined&&this instanceof Backbone.View){h.delegateEvents();this.$el.find("#library_list_body").append(h.el)}else{this.renderOne({library:j})}}},renderOne:function(j){var i=j.library;var h=new a.LibraryRowView(i);if(j.prepend){this.$el.find("#library_list_body").prepend(h.el)}else{this.$el.find("#library_list_body").append(h.el)}this.rowViews[i.get("id")]=h},sort_clicked:function(){if(Galaxy.libraries.preferences.get("sort_order")==="asc"){Galaxy.libraries.preferences.set({sort_order:"desc"})}else{Galaxy.libraries.preferences.set({sort_order:"asc"})}this.render()},sortLibraries:function(){if(Galaxy.libraries.preferences.get("sort_by")==="name"){if(Galaxy.libraries.preferences.get("sort_order")==="asc"){this.collection.sortByNameAsc()}else{if(Galaxy.libraries.preferences.get("sort_order")==="desc"){this.collection.sortByNameDesc()}}}},templateLibraryList:function(){tmpl_array=[];tmpl_array.push('<div class="library_container table-responsive">');tmpl_array.push("<% if(length === 0) { %>");tmpl_array.push('<div>There are no libraries visible to you. If you expected some to show up please consult the <a href="https://wiki.galaxyproject.org/Admin/DataLibraries/LibrarySecurity">library security wikipage</a>.</div>');tmpl_array.push("<% } else{ %>");tmpl_array.push('<table class="grid table table-condensed">');tmpl_array.push("   <thead>");tmpl_array.push('     <th style="width:30%;"><a class="sort-libraries-link" title="Click to reverse order" href="#">name</a> <span title="Sorted alphabetically" class="fa fa-sort-alpha-<%- order %>"></span></th>');tmpl_array.push('     <th style="width:22%;">description</th>');tmpl_array.push('     <th style="width:22%;">synopsis</th> ');tmpl_array.push('     <th style="width:26%;"></th> ');tmpl_array.push("   </thead>");tmpl_array.push('   <tbody id="library_list_body">');tmpl_array.push("   </tbody>");tmpl_array.push("</table>");tmpl_array.push("<% }%>");tmpl_array.push("</div>");return _.template(tmpl_array.join(""))},redirectToHome:function(){window.location="../"},redirectToLogin:function(){window.location="/user/login"},});return{LibraryListView:f}});
(function(){var e;e={},e.triggerOldOnload=function(){return"function"==typeof e.oldOnload?e.oldOnload():void 0},e.loadMaps=function(){var t,r,o,n,i;i=[];for(t in e)n=e[t],o=t.search(/load/),-1===o?(r="load_"+t,i.push(e[r]())):i.push(void 0);return i},window.Gmaps=e,this.Gmaps4Rails=function(){function e(){this.map=null,this.serviceObject=null,this.visibleInfoWindow=null,this.userLocation=null,this.geolocationSuccess=function(){return!1},this.geolocationFailure=function(){return!1},this.callback=function(){return!1},this.customClusterer=function(){return!1},this.infobox=function(){return!1},this.jsTemplate=!1,this.default_map_options={id:"map",draggable:!0,detect_location:!1,center_on_user:!1,center_latitude:0,center_longitude:0,zoom:7,maxZoom:null,minZoom:null,auto_adjust:!0,auto_zoom:!0,bounds:[],raw:{}},this.default_markers_conf={title:"",picture:"",width:22,length:32,draggable:!1,do_clustering:!1,randomize:!1,max_random_distance:100,list_container:null,offset:0,raw:{}},this.markers=[],this.boundsObject=null,this.polygons=[],this.polylines=[],this.circles=[],this.markerClusterer=null,this.markerImages=[],this.polylines_conf={strokeColor:"#FF0000",strokeOpacity:1,strokeWeight:2,clickable:!1,zIndex:null}}return e.prototype.initialize=function(){return this.serviceObject=this.createMap(),this.map=this.serviceObject,(this.map_options.detect_location===!0||this.map_options.center_on_user===!0)&&this.findUserLocation(this),this.resetSidebarContent()},e.prototype.findUserLocation=function(e){var t,r;return navigator.geolocation?(r=function(t){return e.userLocation=e.createLatLng(t.coords.latitude,t.coords.longitude),e.map_options.center_on_user===!0&&e.centerMapOnUser(),e.geolocationSuccess()},t=function(){return e.geolocationFailure(!0)},navigator.geolocation.getCurrentPosition(r,t)):e.geolocationFailure(!1)},e.prototype.create_direction=function(){var e,t,r;return e=new google.maps.DirectionsRenderer,t=new google.maps.DirectionsService,e.setMap(this.serviceObject),this.direction_conf.display_panel&&e.setPanel(document.getElementById(this.direction_conf.panel_id)),e.setOptions({suppressMarkers:!1,suppressInfoWindows:!1,suppressPolylines:!1}),r={origin:this.direction_conf.origin,destination:this.direction_conf.destination,waypoints:this.direction_conf.waypoints,optimizeWaypoints:this.direction_conf.optimizeWaypoints,unitSystem:google.maps.DirectionsUnitSystem[this.direction_conf.unitSystem],avoidHighways:this.direction_conf.avoidHighways,avoidTolls:this.direction_conf.avoidTolls,region:this.direction_conf.region,travelMode:google.maps.DirectionsTravelMode[this.direction_conf.travelMode],language:"en"},t.route(r,function(t,r){return r===google.maps.DirectionsStatus.OK?e.setDirections(t):void 0})},e.prototype.create_circles=function(){var e,t,r,o,n;for(o=this.circles,n=[],t=0,r=o.length;r>t;t++)e=o[t],n.push(this.create_circle(e));return n},e.prototype.create_circle=function(e){var t;return e===this.circles[0]&&(null!=e.strokeColor&&(this.circles_conf.strokeColor=e.strokeColor),null!=e.strokeOpacity&&(this.circles_conf.strokeOpacity=e.strokeOpacity),null!=e.strokeWeight&&(this.circles_conf.strokeWeight=e.strokeWeight),null!=e.fillColor&&(this.circles_conf.fillColor=e.fillColor),null!=e.fillOpacity&&(this.circles_conf.fillOpacity=e.fillOpacity)),null!=e.lat&&null!=e.lng?(t=new google.maps.Circle({center:this.createLatLng(e.lat,e.lng),strokeColor:e.strokeColor||this.circles_conf.strokeColor,strokeOpacity:e.strokeOpacity||this.circles_conf.strokeOpacity,strokeWeight:e.strokeWeight||this.circles_conf.strokeWeight,fillOpacity:e.fillOpacity||this.circles_conf.fillOpacity,fillColor:e.fillColor||this.circles_conf.fillColor,clickable:e.clickable||this.circles_conf.clickable,zIndex:e.zIndex||this.circles_conf.zIndex,radius:e.radius}),e.serviceObject=t,t.setMap(this.serviceObject)):void 0},e.prototype.clear_circles=function(){var e,t,r,o,n;for(o=this.circles,n=[],t=0,r=o.length;r>t;t++)e=o[t],n.push(this.clear_circle(e));return n},e.prototype.clear_circle=function(e){return e.serviceObject.setMap(null)},e.prototype.hide_circles=function(){var e,t,r,o,n;for(o=this.circles,n=[],t=0,r=o.length;r>t;t++)e=o[t],n.push(this.hide_circle(e));return n},e.prototype.hide_circle=function(e){return e.serviceObject.setMap(null)},e.prototype.show_circles=function(){var e,t,r,o,n;for(o=this.circles,n=[],t=0,r=o.length;r>t;t++)e=o[t],n.push(this.show_circle(this.circle));return n},e.prototype.show_circle=function(e){return e.serviceObject.setMap(this.serviceObject)},e.prototype.create_polygons=function(){var e,t,r,o,n;for(o=this.polygons,n=[],t=0,r=o.length;r>t;t++)e=o[t],n.push(this.create_polygon(e));return n},e.prototype.create_polygon=function(e){var t,r,o,n,i,s,a,c,p,l,u,h;for(a=[],u=0,h=e.length;h>u;u++)s=e[u],n=this.createLatLng(s.lat,s.lng),a.push(n),s===e[0]&&(c=s.strokeColor||this.polygons_conf.strokeColor,p=s.strokeOpacity||this.polygons_conf.strokeOpacity,l=s.strokeWeight||this.polygons_conf.strokeWeight,r=s.fillColor||this.polygons_conf.fillColor,o=s.fillOpacity||this.polygons_conf.fillOpacity,t=s.clickable||this.polygons_conf.clickable);return i=new google.maps.Polygon({paths:a,strokeColor:c,strokeOpacity:p,strokeWeight:l,fillColor:r,fillOpacity:o,clickable:t,map:this.serviceObject}),e.serviceObject=i},e.prototype.create_markers=function(){return this.createServiceMarkersFromMarkers(),this.clusterize()},e.prototype.createServiceMarkersFromMarkers=function(){var e,t,r,o,n,i,s,a;for(a=this.markers,o=i=0,s=a.length;s>i;o=++i)n=a[o],null==this.markers[o].serviceObject&&(e=this.markers[o].lat,r=this.markers[o].lng,this.markers_conf.randomize&&(t=this.randomize(e,r),e=t[0],r=t[1]),this.markers[o].serviceObject=this.createMarker({marker_picture:this.markers[o].picture?this.markers[o].picture:this.markers_conf.picture,marker_width:this.markers[o].width?this.markers[o].width:this.markers_conf.width,marker_height:this.markers[o].height?this.markers[o].height:this.markers_conf.length,marker_title:this.markers[o].title?this.markers[o].title:null,marker_anchor:this.markers[o].marker_anchor?this.markers[o].marker_anchor:null,shadow_anchor:this.markers[o].shadow_anchor?this.markers[o].shadow_anchor:null,shadow_picture:this.markers[o].shadow_picture?this.markers[o].shadow_picture:null,shadow_width:this.markers[o].shadow_width?this.markers[o].shadow_width:null,shadow_height:this.markers[o].shadow_height?this.markers[o].shadow_height:null,marker_draggable:this.markers[o].draggable?this.markers[o].draggable:this.markers_conf.draggable,rich_marker:this.markers[o].rich_marker?this.markers[o].rich_marker:null,zindex:this.markers[o].zindex?this.markers[o].zindex:null,Lat:e,Lng:r,index:o}),this.createInfoWindow(this.markers[o]),this.createSidebar(this.markers[o]));return this.markers_conf.offset=this.markers.length},e.prototype.createImageAnchorPosition=function(e){return null===e?null:this.createPoint(e[0],e[1])},e.prototype.replaceMarkers=function(e,t){return null==t&&(t=!0),this.clearMarkers(),this.markers=new Array,t&&(this.boundsObject=this.createLatLngBounds()),this.resetSidebarContent(),this.markers_conf.offset=0,this.addMarkers(e,t)},e.prototype.addMarkers=function(e,t){return null==t&&(t=!0),this.markers=this.markers.concat(e),this.create_markers(),t?this.adjustMapToBounds():void 0},e.prototype.createSidebar=function(e){var t,r,o,n,i;return this.markers_conf.list_container?(i=document.getElementById(this.markers_conf.list_container),n=document.createElement("li"),t=document.createElement("a"),t.href="javascript:void(0);",o=null!=e.sidebar?e.sidebar:"Marker",t.innerHTML=o,r=this,t.onclick=this.sidebar_element_handler(r,e.serviceObject,"click"),n.appendChild(t),i.appendChild(n)):void 0},e.prototype.sidebar_element_handler=function(e,t,r){return function(){return e.map.panTo(t.position),google.maps.event.trigger(t,r)}},e.prototype.resetSidebarContent=function(){var e;return null!==this.markers_conf.list_container?(e=document.getElementById(this.markers_conf.list_container),e.innerHTML=""):void 0},e.prototype.adjustMapToBounds=function(){return this.map_options.auto_adjust||null!==this.map_options.bounds?(this.boundsObject=this.createLatLngBounds(),this.map_options.auto_adjust&&(this.extendBoundsWithMarkers(),this.updateBoundsWithPolylines(),this.updateBoundsWithPolygons(),this.updateBoundsWithCircles()),this.extendMapBounds(),this.adaptMapToBounds()):void 0},e.prototype.replacePolylines=function(e){return this.destroy_polylines(),this.polylines=e,this.create_polylines(),this.adjustMapToBounds()},e.prototype.destroy_polylines=function(){var e,t,r,o;for(o=this.polylines,t=0,r=o.length;r>t;t++)e=o[t],e.serviceObject.setMap(null);return this.polylines=[]},e.prototype.create_polylines=function(){var e,t,r,o,n;for(o=this.polylines,n=[],t=0,r=o.length;r>t;t++)e=o[t],n.push(this.create_polyline(e));return n},e.prototype.exists=function(e){return""!==e&&"undefined"!=typeof e},e.prototype.randomize=function(e,t){var r,o,n,i;return n=this.markers_conf.max_random_distance*this.random(),i=this.markers_conf.max_random_distance*this.random(),r=parseFloat(e)+180/Math.PI*(i/6378137),o=parseFloat(t)+90/Math.PI*(n/6378137)/Math.cos(e),[r,o]},e.prototype.mergeObjectWithDefault=function(e,t){var r,o,n;r={};for(o in e)n=e[o],r[o]=n;for(o in t)n=t[o],null==r[o]&&(r[o]=n);return r},e.prototype.mergeWithDefault=function(e){var t,r;return t=this["default_"+e],r=this[e],this[e]=this.mergeObjectWithDefault(r,t),!0},e.prototype.random=function(){return 2*Math.random()-1},e}()}).call(this),function(){var e={}.hasOwnProperty,t=function(t,r){function o(){this.constructor=t}for(var n in r)e.call(r,n)&&(t[n]=r[n]);return o.prototype=r.prototype,t.prototype=new o,t.__super__=r.prototype,t};this.Gmaps4RailsBing=function(e){function r(){r.__super__.constructor.apply(this,arguments),this.map_options={type:"road"},this.markers_conf={infobox:"description"},this.mergeWithDefault("map_options"),this.mergeWithDefault("markers_conf")}return t(r,e),r.prototype.getMapType=function(){switch(this.map_options.type){case"road":return Microsoft.Maps.MapTypeId.road;case"aerial":return Microsoft.Maps.MapTypeId.aerial;case"auto":return Microsoft.Maps.MapTypeId.auto;case"birdseye":return Microsoft.Maps.MapTypeId.birdseye;case"collinsBart":return Microsoft.Maps.MapTypeId.collinsBart;case"mercator":return Microsoft.Maps.MapTypeId.mercator;case"ordnanceSurvey":return Microsoft.Maps.MapTypeId.ordnanceSurvey;default:return Microsoft.Maps.MapTypeId.auto}},r.prototype.createPoint=function(e,t){return new Microsoft.Maps.Point(e,t)},r.prototype.createLatLng=function(e,t){return new Microsoft.Maps.Location(e,t)},r.prototype.createLatLngBounds=function(){},r.prototype.createMap=function(){return new Microsoft.Maps.Map(document.getElementById(this.map_options.id),{credentials:this.map_options.provider_key,mapTypeId:this.getMapType(),center:this.createLatLng(this.map_options.center_latitude,this.map_options.center_longitude),zoom:this.map_options.zoom})},r.prototype.createSize=function(e,t){return new google.maps.Size(e,t)},r.prototype.createMarker=function(e){var t,r;return r=this.createLatLng(e.Lat,e.Lng),t=""===e.marker_picture?new Microsoft.Maps.Pushpin(this.createLatLng(e.Lat,e.Lng),{draggable:e.marker_draggable,anchor:this.createImageAnchorPosition(e.Lat,e.Lng),text:e.marker_title}):new Microsoft.Maps.Pushpin(this.createLatLng(e.Lat,e.Lng),{draggable:e.marker_draggable,anchor:this.createImageAnchorPosition(e.Lat,e.Lng),icon:e.marker_picture,height:e.marker_height,text:e.marker_title,width:e.marker_width}),this.addToMap(t),t},r.prototype.clearMarkers=function(){var e,t,r,o,n;for(o=this.markers,n=[],t=0,r=o.length;r>t;t++)e=o[t],n.push(this.clearMarker(e));return n},r.prototype.clearMarker=function(e){return this.removeFromMap(e.serviceObject)},r.prototype.showMarkers=function(){var e,t,r,o,n;for(o=this.markers,n=[],t=0,r=o.length;r>t;t++)e=o[t],n.push(this.showMarker(e));return n},r.prototype.showMarker=function(e){return e.serviceObject.setOptions({visible:!0})},r.prototype.hideMarkers=function(){var e,t,r,o,n;for(o=this.markers,n=[],t=0,r=o.length;r>t;t++)e=o[t],n.push(this.hideMarker(e));return n},r.prototype.hideMarker=function(e){return e.serviceObject.setOptions({visible:!1})},r.prototype.extendBoundsWithMarkers=function(){var e,t,r,o,n;for(e=[],n=this.markers,r=0,o=n.length;o>r;r++)t=n[r],e.push(t.serviceObject.getLocation());return this.boundsObject=Microsoft.Maps.LocationRect.fromLocations(e)},r.prototype.createClusterer=function(){},r.prototype.clearClusterer=function(){},r.prototype.clusterize=function(){},r.prototype.createInfoWindow=function(e){var t;return null!=e.description?(e.info_window="description"===this.markers_conf.infobox?new Microsoft.Maps.Infobox(e.serviceObject.getLocation(),{description:e.description,visible:!1,showCloseButton:!0}):new Microsoft.Maps.Infobox(e.serviceObject.getLocation(),{htmlContent:e.description,visible:!1}),t=this,Microsoft.Maps.Events.addHandler(e.serviceObject,"click",this.openInfoWindow(t,e.info_window)),this.addToMap(e.info_window)):void 0},r.prototype.openInfoWindow=function(e,t){return function(){return e.visibleInfoWindow&&e.visibleInfoWindow.setOptions({visible:!1}),t.setOptions({visible:!0}),e.visibleInfoWindow=t}},r.prototype.fitBounds=function(){return this.serviceObject.setView({bounds:this.boundsObject})},r.prototype.addToMap=function(e){return this.serviceObject.entities.push(e)},r.prototype.removeFromMap=function(e){return this.serviceObject.entities.remove(e)},r.prototype.centerMapOnUser=function(){return this.serviceObject.setView({center:this.userLocation})},r.prototype.updateBoundsWithPolylines=function(){},r.prototype.updateBoundsWithPolygons=function(){},r.prototype.updateBoundsWithCircles=function(){},r.prototype.extendMapBounds=function(){},r.prototype.adaptMapToBounds=function(){return this.fitBounds()},r}(Gmaps4Rails)}.call(this),function(){var e={}.hasOwnProperty,t=function(t,r){function o(){this.constructor=t}for(var n in r)e.call(r,n)&&(t[n]=r[n]);return o.prototype=r.prototype,t.prototype=new o,t.__super__=r.prototype,t};this.Gmaps4RailsGoogle=function(e){function r(){r.__super__.constructor.apply(this,arguments),this.map_options={disableDefaultUI:!1,disableDoubleClickZoom:!1,type:"ROADMAP"},this.markers_conf={clusterer_gridSize:50,clusterer_maxZoom:5,custom_cluster_pictures:null,custom_infowindow_class:null},this.mergeWithDefault("map_options"),this.mergeWithDefault("markers_conf"),this.kml_options={clickable:!0,preserveViewport:!1,suppressInfoWindows:!1},this.polygons_conf={strokeColor:"#FFAA00",strokeOpacity:.8,strokeWeight:2,fillColor:"#000000",fillOpacity:.35,clickable:!1},this.circles_conf={fillColor:"#00AAFF",fillOpacity:.35,strokeColor:"#FFAA00",strokeOpacity:.8,strokeWeight:2,clickable:!1,zIndex:null},this.direction_conf={panel_id:null,display_panel:!1,origin:null,destination:null,waypoints:[],optimizeWaypoints:!1,unitSystem:"METRIC",avoidHighways:!1,avoidTolls:!1,region:null,travelMode:"DRIVING"}}return t(r,e),r.prototype.createPoint=function(e,t){return new google.maps.Point(e,t)},r.prototype.createLatLng=function(e,t){return new google.maps.LatLng(e,t)},r.prototype.createLatLngBounds=function(){return new google.maps.LatLngBounds},r.prototype.createMap=function(){var e,t;return e={maxZoom:this.map_options.maxZoom,minZoom:this.map_options.minZoom,zoom:this.map_options.zoom,center:this.createLatLng(this.map_options.center_latitude,this.map_options.center_longitude),mapTypeId:google.maps.MapTypeId[this.map_options.type],mapTypeControl:this.map_options.mapTypeControl,disableDefaultUI:this.map_options.disableDefaultUI,disableDoubleClickZoom:this.map_options.disableDoubleClickZoom,draggable:this.map_options.draggable},t=this.mergeObjectWithDefault(this.map_options.raw,e),new google.maps.Map(document.getElementById(this.map_options.id),t)},r.prototype.createMarkerImage=function(e,t,r,o,n){return new google.maps.MarkerImage(e,t,r,o,n)},r.prototype.createSize=function(e,t){return new google.maps.Size(e,t)},r.prototype.createMarker=function(e){var t,r,o,n,i,s,a;return n=this.createLatLng(e.Lat,e.Lng),""===e.marker_picture&&null===e.rich_marker?(t={position:n,map:this.serviceObject,title:e.marker_title,draggable:e.marker_draggable,zIndex:e.zindex},i=this.mergeObjectWithDefault(this.markers_conf.raw,t),new google.maps.Marker(i)):null!==e.rich_marker?new RichMarker({position:n,map:this.serviceObject,draggable:e.marker_draggable,content:e.rich_marker,flat:null===e.marker_anchor?!1:e.marker_anchor[1],anchor:null===e.marker_anchor?0:e.marker_anchor[0],zIndex:e.zindex}):(r=this.createImageAnchorPosition(e.marker_anchor),s=this.createImageAnchorPosition(e.shadow_anchor),o=this.createOrRetrieveImage(e.marker_picture,e.marker_width,e.marker_height,r),a=this.createOrRetrieveImage(e.shadow_picture,e.shadow_width,e.shadow_height,s),t={position:n,map:this.serviceObject,icon:o,title:e.marker_title,draggable:e.marker_draggable,shadow:a,zIndex:e.zindex},i=this.mergeObjectWithDefault(this.markers_conf.raw,t),new google.maps.Marker(i))},r.prototype.includeMarkerImage=function(e,t){var r,o,n,i;for(r=n=0,i=e.length;i>n;r=++n)if(o=e[r],o.url===t)return r;return!1},r.prototype.createOrRetrieveImage=function(e,t,r,o){var n,i;if(""===e||null===e)return null;switch(i=this.includeMarkerImage(this.markerImages,e)){case!1:return n=this.createMarkerImage(e,this.createSize(t,r),null,o,null),this.markerImages.push(n),n;default:return"number"==typeof i?this.markerImages[i]:!1}},r.prototype.clearMarkers=function(){var e,t,r,o,n;for(o=this.markers,n=[],t=0,r=o.length;r>t;t++)e=o[t],n.push(this.clearMarker(e));return n},r.prototype.showMarkers=function(){var e,t,r,o,n;for(o=this.markers,n=[],t=0,r=o.length;r>t;t++)e=o[t],n.push(this.showMarker(e));return n},r.prototype.hideMarkers=function(){var e,t,r,o,n;for(o=this.markers,n=[],t=0,r=o.length;r>t;t++)e=o[t],n.push(this.hideMarker(e));return n},r.prototype.clearMarker=function(e){return e.serviceObject.setMap(null)},r.prototype.showMarker=function(e){return e.serviceObject.setVisible(!0)},r.prototype.hideMarker=function(e){return e.serviceObject.setVisible(!1)},r.prototype.extendBoundsWithMarkers=function(){var e,t,r,o,n;for(o=this.markers,n=[],t=0,r=o.length;r>t;t++)e=o[t],n.push(this.boundsObject.extend(e.serviceObject.position));return n},r.prototype.createClusterer=function(e){return new MarkerClusterer(this.serviceObject,e,{maxZoom:this.markers_conf.clusterer_maxZoom,gridSize:this.markers_conf.clusterer_gridSize,styles:this.customClusterer()})},r.prototype.clearClusterer=function(){return this.markerClusterer.clearMarkers()},r.prototype.clusterize=function(){var e,t,r,o,n;if(this.markers_conf.do_clustering===!0){for(null!==this.markerClusterer&&this.clearClusterer(),t=new Array,n=this.markers,r=0,o=n.length;o>r;r++)e=n[r],t.push(e.serviceObject);return this.markerClusterer=this.createClusterer(t)}},r.prototype.createInfoWindow=function(e){var t,r;return"function"==typeof this.jsTemplate||null!=e.description?("function"==typeof this.jsTemplate&&(e.description=this.jsTemplate(e)),null!==this.markers_conf.custom_infowindow_class?(t=document.createElement("div"),t.setAttribute("class",this.markers_conf.custom_infowindow_class),t.innerHTML=e.description,e.infowindow=new InfoBox(this.infobox(t)),r=this,google.maps.event.addListener(e.serviceObject,"click",this.openInfoWindow(r,e.infowindow,e.serviceObject))):(e.infowindow=new google.maps.InfoWindow({content:e.description}),r=this,google.maps.event.addListener(e.serviceObject,"click",this.openInfoWindow(r,e.infowindow,e.serviceObject)))):void 0},r.prototype.openInfoWindow=function(e,t,r){return function(){return null!==e.visibleInfoWindow&&e.visibleInfoWindow.close(),t.open(e.serviceObject,r),e.visibleInfoWindow=t}},r.prototype.createKmlLayer=function(e){var t;return t=e.options||{},t=this.mergeObjectWithDefault(t,this.kml_options),e=new google.maps.KmlLayer(e.url,t),e.setMap(this.serviceObject),e},r.prototype.create_polyline=function(e){var t,r,o,n,i,s,a,c,p,l,u,h,d,f,m;for(a=[],h=0,f=e.length;f>h;h++)if(o=e[h],null!=o.coded_array)for(r=new google.maps.geometry.encoding.decodePath(o.coded_array),d=0,m=r.length;m>d;d++)s=r[d],a.push(s);else o===e[0]&&(c=o.strokeColor||this.polylines_conf.strokeColor,p=o.strokeOpacity||this.polylines_conf.strokeOpacity,l=o.strokeWeight||this.polylines_conf.strokeWeight,t=o.clickable||this.polylines_conf.clickable,u=o.zIndex||this.polylines_conf.zIndex),null!=o.lat&&null!=o.lng&&(n=this.createLatLng(o.lat,o.lng),a.push(n));return i=new google.maps.Polyline({path:a,strokeColor:c,strokeOpacity:p,strokeWeight:l,clickable:t,zIndex:u}),e.serviceObject=i,i.setMap(this.serviceObject)},r.prototype.updateBoundsWithPolylines=function(){var e,t,r,o,n,i,s;for(i=this.polylines,s=[],o=0,n=i.length;n>o;o++)t=i[o],r=t.serviceObject.latLngs.getArray()[0].getArray(),s.push(function(){var t,o,n;for(n=[],t=0,o=r.length;o>t;t++)e=r[t],n.push(this.boundsObject.extend(e));return n}.call(this));return s},r.prototype.create_kml=function(){var e,t,r,o,n;for(o=this.kml,n=[],t=0,r=o.length;r>t;t++)e=o[t],n.push(e.serviceObject=this.createKmlLayer(e));return n},r.prototype.fitBounds=function(){return this.boundsObject.isEmpty()?void 0:this.serviceObject.fitBounds(this.boundsObject)},r.prototype.centerMapOnUser=function(){return this.serviceObject.setCenter(this.userLocation)},r.prototype.updateBoundsWithPolygons=function(){var e,t,r,o,n,i,s;for(i=this.polygons,s=[],o=0,n=i.length;n>o;o++)t=i[o],r=t.serviceObject.latLngs.getArray()[0].getArray(),s.push(function(){var t,o,n;for(n=[],t=0,o=r.length;o>t;t++)e=r[t],n.push(this.boundsObject.extend(e));return n}.call(this));return s},r.prototype.updateBoundsWithCircles=function(){var e,t,r,o,n;for(o=this.circles,n=[],t=0,r=o.length;r>t;t++)e=o[t],this.boundsObject.extend(e.serviceObject.getBounds().getNorthEast()),n.push(this.boundsObject.extend(e.serviceObject.getBounds().getSouthWest()));return n},r.prototype.extendMapBounds=function(){var e,t,r,o,n;for(o=this.map_options.bounds,n=[],t=0,r=o.length;r>t;t++)e=o[t],n.push(this.boundsObject.extend(this.createLatLng(e.lat,e.lng)));return n},r.prototype.adaptMapToBounds=function(){var e;return this.map_options.auto_zoom?this.fitBounds():(e=this.boundsObject.getCenter(),this.map_options.center_latitude=e.lat(),this.map_options.center_longitude=e.lng(),this.serviceObject.setCenter(e))},r}(Gmaps4Rails)}.call(this),function(){var e={}.hasOwnProperty,t=function(t,r){function o(){this.constructor=t}for(var n in r)e.call(r,n)&&(t[n]=r[n]);return o.prototype=r.prototype,t.prototype=new o,t.__super__=r.prototype,t};this.Gmaps4RailsMapquest=function(e){function r(){r.__super__.constructor.apply(this,arguments),this.map_options={type:"map"},this.markers_conf={},this.mergeWithDefault("markers_conf"),this.mergeWithDefault("map_options")}return t(r,e),r.prototype.createPoint=function(e,t){return new MQA.Poi({lat:e,lng:t})},r.prototype.createLatLng=function(e,t){return{lat:e,lng:t}},r.prototype.createLatLngBounds=function(){},r.prototype.createMap=function(){var e;return e=new MQA.TileMap(document.getElementById(this.map_options.id),this.map_options.zoom,{lat:this.map_options.center_latitude,lng:this.map_options.center_longitude},this.map_options.type),MQA.withModule("zoomcontrol3",function(){return e.addControl(new MQA.LargeZoomControl3,new MQA.MapCornerPlacement(MQA.MapCorner.TOP_LEFT))}),e},r.prototype.createMarkerImage=function(){},r.prototype.createMarker=function(e){var t,r;return r=new MQA.Poi({lat:e.Lat,lng:e.Lng}),""!==e.marker_picture&&(t=new MQA.Icon(e.marker_picture,e.marker_height,e.marker_width),r.setIcon(t),null!==e.marker_anchor&&r.setBias({x:e.marker_anchor[0],y:e.marker_anchor[1]})),""!==e.shadow_picture&&(t=new MQA.Icon(e.shadow_picture,e.shadow_height,e.shadow_width),r.setShadow(t),null!==e.shadow_anchor&&r.setShadowOffset({x:e.shadow_anchor[0],y:e.shadow_anchor[1]})),this.addToMap(r),r},r.prototype.clearMarkers=function(){var e,t,r,o;for(o=[],t=0,r=markers.length;r>t;t++)e=markers[t],o.push(this.clearMarker(e));return o},r.prototype.showMarkers=function(){var e,t,r,o;for(o=[],t=0,r=markers.length;r>t;t++)e=markers[t],o.push(this.showMarker(e));return o},r.prototype.hideMarkers=function(){var e,t,r,o;for(o=[],t=0,r=markers.length;r>t;t++)e=markers[t],o.push(this.hideMarker(e));return o},r.prototype.clearMarker=function(e){return this.removeFromMap(e.serviceObject)},r.prototype.showMarker=function(){},r.prototype.hideMarker=function(){},r.prototype.extendBoundsWithMarkers=function(){var e,t,r,o,n;if(this.markers.length>=2){for(this.boundsObject=new MQA.RectLL(this.markers[0].serviceObject.latLng,this.markers[1].serviceObject.latLng),o=this.markers,n=[],t=0,r=o.length;r>t;t++)e=o[t],n.push(this.boundsObject.extend(e.serviceObject.latLng));return n}},r.prototype.createClusterer=function(){},r.prototype.clearClusterer=function(){},r.prototype.clusterize=function(){},r.prototype.createInfoWindow=function(e){return e.serviceObject.setInfoTitleHTML(e.description)},r.prototype.fitBounds=function(){return this.markers.length>=2&&this.serviceObject.zoomToRect(this.boundsObject),1===this.markers.length?this.serviceObject.setCenter(this.markers[0].serviceObject.latLng):void 0},r.prototype.centerMapOnUser=function(){return this.serviceObject.setCenter(this.userLocation)},r.prototype.addToMap=function(e){return this.serviceObject.addShape(e)},r.prototype.removeFromMap=function(e){return this.serviceObject.removeShape(e)},r.prototype.updateBoundsWithPolylines=function(){},r.prototype.updateBoundsWithPolygons=function(){},r.prototype.updateBoundsWithCircles=function(){},r.prototype.extendMapBounds=function(){},r.prototype.adaptMapToBounds=function(){return this.fitBounds()},r}(Gmaps4Rails)}.call(this),function(){var e={}.hasOwnProperty,t=function(t,r){function o(){this.constructor=t}for(var n in r)e.call(r,n)&&(t[n]=r[n]);return o.prototype=r.prototype,t.prototype=new o,t.__super__=r.prototype,t};this.Gmaps4RailsOpenlayers=function(e){function r(){r.__super__.constructor.apply(this,arguments),this.map_options={},this.mergeWithDefault("map_options"),this.markers_conf={},this.mergeWithDefault("markers_conf"),this.openMarkers=null,this.markersLayer=null,this.markersControl=null,this.polylinesLayer=null}return t(r,e),r.prototype.createPoint=function(){},r.prototype.createLatLng=function(e,t){return new OpenLayers.LonLat(t,e).transform(new OpenLayers.Projection("EPSG:4326"),new OpenLayers.Projection("EPSG:900913"))},r.prototype.createAnchor=function(e){return null===e?null:new OpenLayers.Pixel(e[0],e[1])},r.prototype.createSize=function(e,t){return new OpenLayers.Size(e,t)},r.prototype.createLatLngBounds=function(){return new OpenLayers.Bounds},r.prototype.createMap=function(){var e;return e=new OpenLayers.Map(this.map_options.id),e.addLayer(new OpenLayers.Layer.OSM),e.setCenter(this.createLatLng(this.map_options.center_latitude,this.map_options.center_longitude),this.map_options.zoom),e},r.prototype.createMarker=function(e){var t,r;return r=OpenLayers.Util.extend({},OpenLayers.Feature.Vector.style["default"]),r.fillOpacity=1,null===this.markersLayer&&(this.markersLayer=new OpenLayers.Layer.Vector("Markers",null),this.serviceObject.addLayer(this.markersLayer),this.markersLayer.events.register("featureselected",this.markersLayer,this.onFeatureSelect),this.markersLayer.events.register("featureunselected",this.markersLayer,this.onFeatureUnselect),this.markersControl=new OpenLayers.Control.SelectFeature(this.markersLayer),this.serviceObject.addControl(this.markersControl),this.markersControl.activate()),""===e.marker_picture?(r.graphicHeight=30,r.externalGraphic="http://openlayers.org/dev/img/marker-blue.png"):(r.graphicWidth=e.marker_width,r.graphicHeight=e.marker_height,r.externalGraphic=e.marker_picture,null!==e.marker_anchor&&(r.graphicXOffset=e.marker_anchor[0],r.graphicYOffset=e.marker_anchor[1]),""!==e.shadow_picture&&(r.backgroundGraphic=e.shadow_picture,r.backgroundWidth=e.shadow_width,r.backgroundHeight=e.shadow_height,null!==e.shadow_anchor&&(r.backgroundXOffset=e.shadow_anchor[0],r.backgroundYOffset=e.shadow_anchor[1]))),r.graphicTitle=e.marker_title,t=new OpenLayers.Feature.Vector(new OpenLayers.Geometry.Point(e.Lng,e.Lat),null,r),t.geometry.transform(new OpenLayers.Projection("EPSG:4326"),new OpenLayers.Projection("EPSG:900913")),this.markersLayer.addFeatures([t]),t},r.prototype.clearMarkers=function(){return this.clearMarkersLayerIfExists(),this.markersLayer=null,this.boundsObject=new OpenLayers.Bounds},r.prototype.clearMarkersLayerIfExists=function(){return null!==this.markersLayer&&null!==this.serviceObject.getLayer(this.markersLayer.id)?this.serviceObject.removeLayer(this.markersLayer):void 0},r.prototype.extendBoundsWithMarkers=function(){var e,t,r,o,n;for(console.log("here"),o=this.markers,n=[],t=0,r=o.length;r>t;t++)e=o[t],n.push(this.boundsObject.extend(this.createLatLng(e.lat,e.lng)));return n},r.prototype.createClusterer=function(e){var t,r,o,n,i;return o={pointRadius:"${radius}",fillColor:"#ffcc66",fillOpacity:.8,strokeColor:"#cc6633",strokeWidth:"${width}",strokeOpacity:.8},r={context:{width:function(e){var t;return null!=(t=e.cluster)?t:{2:1}},radius:function(e){var t;return t=2,e.cluster&&(t=Math.min(e.attributes.count,7)+2),t}}},i=new OpenLayers.Style(o,r),n=new OpenLayers.Strategy.Cluster,t=new OpenLayers.Layer.Vector("Clusters",{strategies:[n],styleMap:new OpenLayers.StyleMap({"default":i,select:{fillColor:"#8aeeef",strokeColor:"#32a8a9"}})}),this.clearMarkersLayerIfExists(),this.serviceObject.addLayer(t),t.addFeatures(e),t},r.prototype.clusterize=function(){var e,t,r,o,n;if(this.markers_conf.do_clustering===!0){for(null!==this.markerClusterer&&this.clearClusterer(),t=new Array,n=this.markers,r=0,o=n.length;o>r;r++)e=n[r],t.push(e.serviceObject);return this.markerClusterer=this.createClusterer(t)}},r.prototype.clearClusterer=function(){return this.serviceObject.removeLayer(this.markerClusterer)},r.prototype.createInfoWindow=function(e){return null!=e.description?e.serviceObject.infoWindow=e.description:void 0},r.prototype.onPopupClose=function(){return this.markersControl.unselect(this.feature)},r.prototype.onFeatureSelect=function(e){var t,r;return t=e.feature,r=new OpenLayers.Popup.FramedCloud("featurePopup",t.geometry.getBounds().getCenterLonLat(),new OpenLayers.Size(300,200),t.infoWindow,null,!0,this.onPopupClose),t.popup=r,r.feature=t,this.map.addPopup(r)},r.prototype.onFeatureUnselect=function(e){var t;return t=e.feature,t.popup?(this.map.removePopup(t.popup),t.popup.destroy(),t.popup=null):void 0},r.prototype.create_polyline=function(e){var t,r,o,n,i,s,a,c,p,l,u,h;for(null===this.polylinesLayer&&(this.polylinesLayer=new OpenLayers.Layer.Vector("Polylines",null),this.serviceObject.addLayer(this.polylinesLayer),this.polylinesLayer.events.register("featureselected",this.polylinesLayer,this.onFeatureSelect),this.polylinesLayer.events.register("featureunselected",this.polylinesLayer,this.onFeatureUnselect),this.polylinesControl=new OpenLayers.Control.DrawFeature(this.polylinesLayer,OpenLayers.Handler.Path),this.serviceObject.addControl(this.polylinesControl)),s=[],u=0,h=e.length;h>u;u++)r=e[u],r===e[0]&&(a=r.strokeColor||this.polylines_conf.strokeColor,c=r.strokeOpacity||this.polylines_conf.strokeOpacity,p=r.strokeWeight||this.polylines_conf.strokeWeight,t=r.clickable||this.polylines_conf.clickable,l=r.zIndex||this.polylines_conf.zIndex),null!=r.lat&&null!=r.lng&&(o=new OpenLayers.Geometry.Point(r.lng,r.lat),s.push(o));return n=new OpenLayers.Geometry.LineString(s),i={strokeColor:a,strokeOpacity:c,strokeWidth:p},e=new OpenLayers.Feature.Vector(n,null,i),e.geometry.transform(new OpenLayers.Projection("EPSG:4326"),new OpenLayers.Projection("EPSG:900913")),this.polylinesLayer.addFeatures([e]),e},r.prototype.updateBoundsWithPolylines=function(){},r.prototype.updateBoundsWithPolygons=function(){},r.prototype.updateBoundsWithCircles=function(){},r.prototype.fitBounds=function(){return this.serviceObject.zoomToExtent(this.boundsObject,!0)},r.prototype.centerMapOnUser=function(){return this.serviceObject.setCenter(this.userLocation)},r.prototype.extendMapBounds=function(){},r.prototype.adaptMapToBounds=function(){return this.fitBounds()},r}(Gmaps4Rails)}.call(this);
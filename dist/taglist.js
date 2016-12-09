!function(t){var n,e,i,o,s,r,l,p,a,u,c,d,h,f,g,y,v;return o=function(n,e,i){var o,s,r,l;i&&(e=t.extend({},e,i)),r=n[0]||n;for(o in e)switch(l=e[o],typeof l){case"object":null!=r.style[o]&&this.applyStyles(r,l);break;case"function":s=l(this),"object"==typeof s?this.applyStyles(r,s):r.style[o]=s;break;default:r.style[o]=l}return n},y=function(t,n,e){var i;return i=new function(){var t;for(t in n)this[t]="";return this},this.applyStyles(t,i,e)},s={maxWidth:350,leftPadding:20,rightPadding:20,offset:25},c=function(e){var i;return i=t.extend({},s),i.leftPadding+=e.x,i.rightPadding+=n.windowWidth-(e.x+e.width),i},d=function(t,n){var e;return null==n&&(n=0),e=t.getBoundingClientRect(),e.x=e.left-n,e.y=e.top,e.centerLeft=e.left+e.width/2,e},a=function(t,n){var e,i,o;return e=null!=n?"scale("+n+")":"",o="translate("+t+")",i=o+" "+e,{webkitTransform:i,mozTransform:i,msTransform:i,oTransform:i,transform:i}},p=function(t){return{webkitTransformOrigin:t+" 0%",mozTransformOrigin:t+" 0%",msTransformOrigin:t+" 0%",oTransformOrigin:t+" 0%",transformOrigin:t+" 0%"}},g=/matrix3?d?\((.+)\)/,f=/,\s*/,u=function(t){var n,e,i,o;return n=window.getComputedStyle(t.els.subnotice[0]),e=n.transform||n.webkitTransform||n.mozTransform,(null!=e?e.length:void 0)&&"none"!==e?(o=e.match(g)[1],i=o.split(f).slice(-1)[0]):i=0,parseFloat(i)},v={},v.container={position:"relative",textAlign:"left"},v.overlay={position:"fixed",zIndex:2e3,top:0,left:0,width:"100vw",height:"100vh",visibility:"hidden"},v.overlay.isRevealed={visibility:"visible"},v.addButton={position:"relative",display:"inline-block",verticalAlign:"top",height:"28px",width:"28px",border:"2px dashed",borderRadius:"5px",boxSizing:"border-box",cursor:"pointer",userSelect:"none",opacity:.35,color:function(t){return t.options.tagTextColor}},v.addButton.text={position:"absolute",left:0,right:0,top:"55%",transform:function(){return a("0, -50%")},width:"100%",lineHeight:1,textAlign:"center",fontSize:"23px",fontWeight:600},v.tag={},v.tag.container={position:"relative",display:"inline-block",verticalAlign:"top",height:"28px",marginRight:"10px",marginBottom:"6px",padding:"0 25px 0 10px",borderRadius:"4px",textAlign:"center",boxSizing:"border-box",cursor:"pointer",userSelect:"none",backgroundColor:function(t){return t.list.options.tagBGColor},color:function(t){return t.list.options.tagTextColor}},v.tag.text={position:"relative",top:"9px",fontSize:"13.2px",lineHeight:1},v.tag.removeButton={position:"absolute",right:"8px",top:"55%",transform:function(){return a("0, -50%")},fontSize:"17px",lineHeight:1,opacity:.4,fontWeight:600},v.popup={},v.popup.container={position:"fixed",zIndex:2001,backgroundColor:"white",borderRadius:"5px",boxShadow:"0px 3px 18px rgba(0,0,0,0.24)",opacity:0,boxSizing:"border-box"},v.popup.container.transition={transition:"transform 0.3s cubic-bezier(0.785, 0.135, 0.15, 0.86), -webkit-transform 0.3s cubic-bezier(0.785, 0.135, 0.15, 0.86), opacity 0.3s cubic-bezier(0.785, 0.135, 0.15, 0.86)"},v.popup.content={display:"none",padding:function(t){return t.options.padding+"px"},boxSizing:"border-box"},v.popup.content.isRevealed={display:"block"},v.popup.button={position:"relative",display:"none",height:"50px",borderRadius:"0 0 5px 5px",boxSizing:"border-box",cursor:"pointer",userSelect:"none",backgroundColor:function(t){return t.list.options.buttonBGColor},color:function(t){return t.list.options.buttonTextColor}},v.popup.button.isRevealed={display:"block"},v.popup.button.text={position:"absolute",top:"53%",transform:function(){return a("0, -50%")},display:"block",width:"100%",fontSize:"16px",lineHeight:1,fontWeight:500,textAlign:"center",textTransform:"uppercase",letterSpacing:"1.5px"},v.popup.selectWrapper={position:"relative",width:"100%",height:"55px",borderBottom:"1px solid #ddd"},v.popup.selectArrow={position:"absolute",zIndex:2,right:"15px",top:"54%",transform:function(){return a("0, -50%")},width:"17px",height:"17px",backgroundSize:"100%",backgroundImage:"url(data:image/svg+xml;utf8;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pgo8IS0tIEdlbmVyYXRvcjogQWRvYmUgSWxsdXN0cmF0b3IgMTguMS4xLCBTVkcgRXhwb3J0IFBsdWctSW4gLiBTVkcgVmVyc2lvbjogNi4wMCBCdWlsZCAwKSAgLS0+CjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgdmVyc2lvbj0iMS4xIiBpZD0iQ2FwYV8xIiB4PSIwcHgiIHk9IjBweCIgdmlld0JveD0iMCAwIDMwOS4xNTYgMzA5LjE1NiIgc3R5bGU9ImVuYWJsZS1iYWNrZ3JvdW5kOm5ldyAwIDAgMzA5LjE1NiAzMDkuMTU2OyIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSIgd2lkdGg9IjY0cHgiIGhlaWdodD0iNjRweCI+CjxnPgoJPGc+CgkJPHBvbHlnb24gcG9pbnRzPSIyODguNDYxLDY0LjkyOSAxNTQuNTg5LDIwMi43NjYgMjAuNzIzLDY0Ljk0IDAsODUuMDcgMTU0LjU4OSwyNDQuMjI4IDMwOS4xNTYsODUuMDcgICAiIGZpbGw9IiMwMDAwMDAiLz4KCTwvZz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8L3N2Zz4K)",opacity:.5},v.popup.selectFake={position:"absolute",zIndex:1,left:0,top:"53%",transform:function(){return a("0, -50%")},height:"16px",padding:"0 15px",fontSize:"16px",fontWeight:500,lineHeight:1,textAlign:"left",userSelect:"none",boxSizing:"border-box",color:"#181818",opacity:.6},v.popup.selectFake.hasColor={opacity:1},v.popup.selectInput={position:"absolute",zIndex:3,top:0,left:0,width:"100%",height:"100%",opacity:0},h={container:function(){return"<div class='TagList'></div>"},overlay:function(){return"<div class='TagList-overlay'></div>"},addButton:function(){return"<div class='TagList-addButton'> <div class='TagList-addButton-icon'>&#43;</div> </div>"},tag:{container:function(){return"<div class='TagList-Tag'></div>"},removeButton:function(){return"<div class='TagList-Tag-removeButton'>×</div>"},text:function(){return"<div class='TagList-Tag-text'> <b>{{label}}</b>: {{value}} </div>"}},popup:{container:function(){return"<div class='TagList-Popup'></div>"},selectWrapper:function(){return"<div class='TagList-Popup-selectField'></div>"},selectArrow:function(){return"<div class='TagList-Popup-selectField-arrow'></div>"},selectFake:function(){return"<div class='TagList-Popup-selectField-fake'></div>"},selectInput:function(t){return"<select class='TagList-Popup-selectField-input'> <option value=''>Select "+t+"...</option> {{options}} </select>"},content:function(){return"<div class='TagList-Popup-content'></div>"},button:function(t){return"<div class='TagList-Popup-button'> <div class='TagList-Tag-button-text'>Add "+t+"</div> </div>"}}},r={default:{},boundingEl:document.body,itemLabel:"Option",tagBGColor:"#ccc",tagTextColor:"#181818",buttonBGColor:"#f74425",buttonTextColor:"#fff"},l={maxWidth:350,padding:20},n=function(n,e,i,s){return this.list=n,this.parent=e,null==i&&(i={}),this.hasSelect=s,this.applyStyles=o.bind(this),this.removeStyles=y.bind(this),this.options=t.extend({},l,i),this.isOpen=!1,this.currentOffset={x:0,y:0,scale:0},this.els={},this.els.container=t(h.popup.container()).data("Popup",this),this.els.content=t(h.popup.content()).appendTo(this.els.container),this.hasSelect&&(this.els.selectWrapper=t(h.popup.selectWrapper()).insertBefore(this.els.content),this.els.selectArrow=t(h.popup.selectArrow()).appendTo(this.els.selectWrapper),this.els.selectFake=t(h.popup.selectFake()).appendTo(this.els.selectWrapper),this.els.selectInput=t(h.popup.selectInput(this.list.options.itemLabel)).appendTo(this.els.selectWrapper),this.els.button=t(h.popup.button(this.list.options.itemLabel)).appendTo(this.els.container)),this.attachBindings(),this.appendToDOM(),this},n.prototype.appendToDOM=function(){return this.applyStyles(this.els.container,i.style.popup.container),this.applyStyles(this.els.content,i.style.popup.content),this.hasSelect&&(this.applyStyles(this.els.selectWrapper,i.style.popup.selectWrapper),this.applyStyles(this.els.selectArrow,i.style.popup.selectArrow),this.applyStyles(this.els.selectFake,i.style.popup.selectFake),this.applyStyles(this.els.selectInput,i.style.popup.selectInput),this.applyStyles(this.els.button,i.style.popup.button),this.applyStyles(this.els.button.children(),i.style.popup.button.text)),this.els.container.appendTo(this.parent)},n.prototype.attachBindings=function(){return SimplyBind("windowScrollY",{updateOnBind:!1}).of(n).to(function(t){return function(n,e){return t.resetYPosition(n,e)}}(this)).condition(function(t){return function(n,e){return t.isOpen}}(this)),SimplyBind("windowScrollX",{updateOnBind:!1}).of(n).to(function(t){return function(n,e){return t.resetXPosition(n,e)}}(this)).condition(function(t){return function(n,e){return t.isOpen}}(this)),SimplyBind("windowWidth",{updateOnBind:!1}).of(n).to(function(t){return function(n,e){return t.resetWidth(n,e)}}(this)).condition(function(t){return function(){return t.isOpen}}(this)),SimplyBind("currentOffset").of(this).to(function(t){return function(n){return t.applyStyles(t.els.container,a(n.x+"px, "+n.y+"px",n.scale))}}(this)),SimplyBind("event:click").of(this.list.els.overlay).to(function(t){return function(){return t.close()}}(this)),this.hasSelect?(SimplyBind(this.list.tagOptionsAvailable,{trackArrayChildren:!1}).to("innerHTML.options").of(this.els.selectInput).transform(function(t){var n,e,i,o;for(o="",n=0,e=t.length;n<e;n++)i=t[n],o+="<option>"+i.label+"</option>";return o}),SimplyBind("value").of(this.els.selectInput).to("innerHTML").of(this.els.selectFake).transform(function(t){return function(n){return n?n:t.els.selectInput[0].options[0].innerHTML}}(this)).and.to(function(t){return function(n){return n?(t.applyStyles(t.els.selectFake,i.style.popup.selectFake.hasColor),t.applyStyles(t.els.content,i.style.popup.content.isRevealed),t.applyStyles(t.els.button,i.style.popup.button.isRevealed)):(t.applyStyles(t.els.selectFake,i.style.popup.selectFake),t.applyStyles(t.els.content,i.style.popup.content),t.applyStyles(t.els.button,i.style.popup.button))}}(this))):SimplyBind("isOpen").of(this).to(function(t){return function(n){if(n)return t.applyStyles(t.els.content,i.style.popup.content.isRevealed)}}(this))},n.prototype.open=function(){return new Promise(function(t){return function(e){var o,s,r,l,a,u;return t.isOpen?e():(t.list.closeAllPopups(),t.isOpen=!0,s=d(t.list.options.boundingEl[0]),o=c(s),u=n.windowWidth-o.leftPadding-o.rightPadding,l=d(t.parent[0],o.leftPadding),a={y:l.y+l.height+o.offset},u>t.options.maxWidth+(o.leftPadding+o.rightPadding)?a.width=t.options.maxWidth:(a.width=u-(o.leftPadding+o.rightPadding),a.x=o.leftPadding),a.x||(a.x=l.centerLeft-a.width/2,a.x<o.leftPadding?a.x=o.leftPadding:a.x+a.width+o.rightPadding>u&&(a.x=u-a.width)),r=l.centerLeft-(a.x+a.width/2),a.scaleOrigin=a.width/2+r,t.els.container.insertAfter(t.list.els.overlay),setTimeout(function(){return t.applyStyles(t.list.els.overlay,i.style.overlay.isRevealed),t.applyStyles(t.els.container,i.style.popup.container.transition),t.applyStyles(t.els.container,{top:a.y+"px",left:a.x+"px",width:a.width+"px",opacity:1,transformOrigin:function(){return p(a.scaleOrigin+"px")}}),t.currentOffset={x:0,y:0,scale:1},setTimeout(function(){return t.removeStyles(t.els.container,i.style.popup.container.transition),e()},325)},50))}}(this))},n.prototype.close=function(){var n;return n=new Promise(function(n){return function(e){return n.isOpen?(n.isOpen=!1,n.applyStyles(n.list.els.overlay,i.style.overlay),n.applyStyles(n.els.container,i.style.popup.container.transition,{opacity:0}),n.currentOffset=t.extend({},n.currentOffset,{scale:0}),setTimeout(function(){return n.removeStyles(n.els.container,i.style.popup.container.transition),n.els.container.appendTo(n.parent),e()},325)):e()}}(this))},n.prototype.resetYPosition=function(n,e){var i;return null==e&&(e=0),i=n-e,this.currentOffset=t.extend({},this.currentOffset,{y:this.currentOffset.y-i})},n.prototype.resetXPosition=function(n,e){var i;return null==e&&(e=0),i=n+e,this.currentOffset=t.extend({},this.currentOffset,{x:this.currentOffset.x-i})},n.prototype.resetWidth=function(t){var e,i,o,s;return i=d(this.list.options.boundingEl[0]),e=c(i),s=n.windowWidth-e.leftPadding-e.rightPadding,o=s>this.options.maxWidth+(e.leftPadding+e.rightPadding)?this.options.maxWidth:s-(e.leftPadding+e.rightPadding),this.applyStyles(this.els.container,{width:o+"px"})},SimplyBind("event:scroll").of(window).to(function(){return n.windowScrollY=window.scrollY,n.windowScrollX=window.scrollX}),SimplyBind("event:resize").of(window).to(function(){return n.windowHeight=window.innerHeight,n.windowWidth=window.innerWidth}),n.windowScroll=window.scrollY,n.windowHeight=window.innerHeight,n.windowWidth=window.innerWidth,e=function(e,i,s,r){return this.list=e,this.options=i,this.data=null!=s?s:{},this.applyStyles=o.bind(this),this.removeStyles=y.bind(this),this.name=this.options.name,this.label=this.options.label,this.value=this.options.default||"",this.els={},this.els.container=t(h.tag.container()).data("Tag",this),this.els.text=t(h.tag.text()).appendTo(this.els.container),this.els.removeButton=t(h.tag.removeButton()).appendTo(this.els.container),this.popup=new n(this.list,this.els.container,this.options.popup),r?t(r).appendTo(this.popup.els.content):t(this.options.content(this.data)).appendTo(this.popup.els.content),this.attachBindings(),this.appendToDOM(),this},e.prototype.appendToDOM=function(){return this.applyStyles(this.els.container,i.style.tag.container),this.applyStyles(this.els.text,i.style.tag.text),this.applyStyles(this.els.removeButton,i.style.tag.removeButton),this.els.container.insertBefore(this.list.els.addButton)},e.prototype.attachBindings=function(){return SimplyBind("label").of(this).to("textContent.label").of(this.els.text).transform(function(t){return function(n){return t.options.labelFormatter?t.options.labelFormatter(n):n}}(this)),SimplyBind("value").of(this).to("textContent.value").of(this.els.text).transform(function(t){return function(n){return t.options.valueFormatter?t.options.valueFormatter(n):n}}(this)),SimplyBind("event:click").of(this.els.removeButton).to(function(t){return function(n){return t.list.remove(t),n.stopPropagation()}}(this)),SimplyBind("event:click").of(this.els.container).to(function(t){return function(n){return t.popup.open()}}(this)),SimplyBind("value",{updateOnBind:!!this.data.value}).of(this.data).to("value").of(this)},i=function(e,i,s){var l,p,a,u,c,d,f;for(this.targetContainer=e,this.tagOptions=null!=i?i:[],this.applyStyles=o.bind(this),this.removeStyles=y.bind(this),this.options=t.extend(!0,{},r,s),this.options.boundingEl=t(this.options.boundingEl),this.tagOptionsAvailable=this.tagOptions.slice(),this.tags=[],this.current={},this.els={},this.els.container=t(h.container()).data("TagList",this),this.els.overlay=t(h.overlay()).prependTo(document.body),this.els.addButton=t(h.addButton(this.options.itemLabel)).appendTo(this.els.container),this.popup=new n(this,this.els.addButton,null,!0),c=this.tagOptions,a=0,u=c.length;a<u;a++)f=c[a],null==f.name&&(f.name=f.label);d=this.options.default;for(l in d)p=d[l],f=this.tagOptions.find(function(t){return t.name===l}),this.add({value:p},f);return this.attachBindings(),this.appendToDOM(),this},i.prototype.addTagOption=function(t){return this.tagOptions.push(t)},i.prototype.add=function(t,n,i){var o;return this.tags.push(o=new e(this,n,t,i)),this.tagOptionsAvailable.splice(this.tagOptionsAvailable.indexOf(n),1),SimplyBind("value",{updateOnBind:!1}).of(o).to(function(t){return function(){return t.notifyChange()}}(this))},i.prototype.remove=function(t){return t.popup.close(),t.els.container.remove(),this.tags.splice(this.tags.indexOf(t),1),this.tagOptionsAvailable.push(t.options)},i.prototype.appendToDOM=function(){return this.applyStyles(this.els.container,i.style.container),this.applyStyles(this.els.overlay,i.style.overlay),this.applyStyles(this.els.addButton,i.style.addButton),this.applyStyles(this.els.addButton.children(),i.style.addButton.text),this.els.container.appendTo(this.targetContainer)},i.prototype.attachBindings=function(){return SimplyBind("event:click").of(this.els.addButton).to(function(t){return function(){return t.popup.open()}}(this)),SimplyBind("event:click").of(this.popup.els.button).to(function(t){return function(){return t.add(t.current.dataObj,t.current.tagOption,t.current.contentElement),t.popup.close().then(function(){return t.selectedTag=""})}}(this)),SimplyBind("value").of(this.popup.els.selectInput).to("selectedTag").of(this).bothWays().chainTo(function(n){return function(e){if(e)return n.current.dataObj={value:null},n.current.tagOption=n.getTagOptionByLabel(e),n.current.contentElement=t(n.current.tagOption.content(n.current.dataObj)),n.popup.els.content.empty().append(n.current.contentElement)}}(this)),SimplyBind(this.tags,{trackArrayChildren:!1,updateOnBind:!1}).to(function(t){return function(){return t.notifyChange()}}(this))},i.prototype.closeAllPopups=function(){var t,n,e,i,o;for(this.popup.close(),e=this.tags,i=[],t=0,n=e.length;t<n;t++)o=e[t],i.push(o.popup.close());return i},i.prototype.getValues=function(){var t;return t=this.tags,new function(){var n,e,i;for(n=0,e=t.length;n<e;n++)i=t[n],this[i.name]=i.options.valueTransform?i.options.valueTransform(i.value):i.value;return this}},i.prototype.notifyChange=function(){var t;return"function"==typeof(t=this.options).onChange?t.onChange(this.getValues(),this):void 0},i.prototype.getTagOptionByLabel=function(t){return this.tagOptions.find(function(n){return n.label===t})},i.style=v,i.version="1.0.1","undefined"!=typeof window&&null!==window&&(window.TagList=i),window.TagList=i}(jQuery);
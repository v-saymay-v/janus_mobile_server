(function(){ComboBox=function(a,j){this.edit=document.getElementById(a);if(!this.edit){return null}var c=document.getElementById(a).parentNode.getElementsByTagName("DIV");if(c.length==0||c[0].className!="dropdownlist"){return null}this.dropdownlist=c[0];this.comboBoxDiv=this.dropdownlist.parentNode.parentNode.getElementsByTagName("DIV")[0];this.isOpen=false;this.switchOpen=function(i){if(d.isOpen){d.dropdownlist.style.display="none";d.comboBoxDiv.className=d.comboBoxDiv.className.replace(/ combobox_active/g,"");setTimeout(function(){d.isOpen=false},150)}else{d.dropdownlist.style.display="block";d.comboBoxDiv.className=d.comboBoxDiv.className+" combobox_active";setTimeout(function(){d.isOpen=true;d.edit.focus()},150)}};var h=this;h.fnChange=null;if(j&&j.onChange){h.fnChange=j.onChange}this.currentitem=null;this.currentitemindex=null;this.visiblecount=0;var d=this;var f=document.getElementById(a).parentNode.getElementsByTagName("SPAN");f[0].onclick=function(){d.edit.click()};this.edit.onfocus=function(){if(!d.isOpen){d.switchOpen()}};this.edit.onclick=function(){d.switchOpen()};this.edit.onblur=function(){if(b&&d.isOpen){d.switchOpen(true)}};var b=true;d.dropdownlist.onmousedown=function(i){b=false;return false};d.dropdownlist.onmouseup=function(i){setTimeout(function(){b=true},150);return false};this.listitems=this.dropdownlist.getElementsByTagName("A");for(var e=0;e<this.listitems.length;e++){var g=e;this.listitems[e].onclick=function(){var i=this.innerHTML;i=i.replace(/\<b\>/ig,"");i=i.replace(/\<\/b\>/ig,"");d.edit.value=i;if(h.fnChange){h.fnChange.apply(h,[i])}d.switchOpen();return false};this.listitems[e].onmouseover=function(l){for(var k=0;k<d.listitems.length;k++){if(this==d.listitems[k]){if(d.currentitem){d.currentitem.className=d.currentitem.className.replace(/light/g,"")}d.currentitem=d.listitems[k];d.currentitemindex=k;d.currentitem.className+=" light"}}}}this.edit.onkeydown=function(k){k=k||window.event;if(k.keyCode==13){return false}else{if(k.keyCode==38){var l=0;if(d.visiblecount>0){if(d.visiblecount==1){d.currentitemindex=d.listitems.length-1}do{d.currentitemindex--;l++}while(d.currentitemindex>0&&d.listitems[d.currentitemindex].style.display=="none");if(d.currentitemindex<0){d.currentitemindex=d.listitems.length-1}if(d.currentitem){d.currentitem.className=d.currentitem.className.replace(/light/g,"")}d.currentitem=d.listitems[d.currentitemindex];d.currentitem.className+=" light";d.currentitem.scrollIntoView(false)}k.cancelBubble=true;if(navigator.appName!="Microsoft Internet Explorer"){k.preventDefault();k.stopPropagation()}return false}else{if(k.keyCode==40){var i=0;if(d.visiblecount>0){do{d.currentitemindex++}while(d.currentitemindex<d.listitems.length&&d.listitems[d.currentitemindex].style.display=="none");if(d.currentitemindex>=d.listitems.length){d.currentitemindex=0}if(d.currentitem){d.currentitem.className=d.currentitem.className.replace(/light/g,"")}d.currentitem=d.listitems[d.currentitemindex];d.currentitem.className+=" light";d.currentitem.scrollIntoView(false)}k.cancelBubble=true;if(navigator.appName!="Microsoft Internet Explorer"){k.preventDefault();k.stopPropagation()}return false}}}};this.edit.onkeyup=function(k){k=k||window.event;if(k.keyCode==9||k.keyCode==40||k.keyCode==38){if(d.visiblecount==0){d.visiblecount=d.listitems.length}return}else{if(k.keyCode==13){if(d.visiblecount!=0){var i=d.currentitem.innerHTML;d.edit.value=i}if(h.fnChange){h.fnChange.apply(h,[i])}else{d.switchOpen();k.cancelBubble=true;return false}}else{}}}}})();
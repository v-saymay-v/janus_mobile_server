$(function(){var a=function(){var c=$.cookie("_zm_plugin_chrome");if(c==="-1"){if(SB.isFirefox){$("#zm_plugin_firefox").show();return true}else{if(SB.isChrome){$("#zm_plugin_chrome").show();return true}}}if(SB.isWin||SB.isMac){var d=$.cookie("_zm_plugin_ical");if(d==="-1"){$("#zm_plugin_outlook").show();return true}}};a();var b=function(d){if(d.length>0){d.hide();var c=d.attr("id");if(c.indexOf("chrome")!=-1){$.cookie("_zm_plugin_chrome","1",{expires:3650,path:"/",secure:true})}if(c.indexOf("firefox")!=-1){$.cookie("_zm_plugin_chrome","1",{expires:3650,path:"/",secure:true})}if(c.indexOf("outlook")!=-1){$.cookie("_zm_plugin_ical","1",{expires:3650,path:"/",secure:true})}}};$(".zm-hide-tip").click(function(){var c=$(this);b(c.parents(".plugin-tip"))});$(".zm-plugin-down").click(function(){var c=$(this);b(c.parents(".plugin-tip"))})});
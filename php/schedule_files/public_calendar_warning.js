$(function(){var d=$("#option_public_calender_meeting");var k=$("#publicEventWarningDialog");var g=$("#publicEventWarningDialogBtn");var i=$("#option_password");var b=$("#option_jbh");var h=$("#schedule_form");var a=$("#meeting_form");var j=1;var f=2;h.delegate("#option_jbh","change",function(){c($(this))});a.delegate("#option_jbh","change",function(){c($(this))});function c(m){var l=m;if(d.length==0||!d.is(":visible")){return}if(typeof d.attr("data")!="undefined"&&d.attr("data")==="s"){return}if(!l.prop("checked")){return}if(i.prop("disabled")){return}if(i.prop("checked")){return}if(d.prop("checked")){e(f)}}g.click(function(){if($("input[name=userPassword4Meeting]:checked").val()=="1"){i.prop("checked",true);i.trigger("change")}k.find(".close").click()});k.find(".cancel").click(function(){var l=k.attr("data");if(l==f){b.prop("checked",!b.prop("checked"))}else{if(l==j){d.prop("checked",!d.prop("checked"))}}});d.change(function(){var l=$(this);if(!l.prop("checked")){return}if(i.prop("checked")){return}if(i.prop("disabled")){return}if(!b.prop("checked")){return}e(j)});function e(l){k.attr("data",l);$.modal(k,$.extend({},SB.MODAL_DEFAULTS,{overlayId:"publicEventDialogOverlay",containerId:"publicEventDialogcontainer",persist:true,minHeight:k.outerHeight(),onShow:function(){}}))}});
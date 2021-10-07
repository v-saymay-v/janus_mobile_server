/* モーダル */
jQuery(function() {
	//画像
	jQuery('.modal-gallery').each(function() {
		jQuery(this).find('.modal-img-card').magnificPopup({
			type:'image',
			removalDelay:300,
			mainClass:'modal-img-card',
			gallery:{
				enabled:true
			}
		});
	});
	//インライン
	jQuery('.popup-modal').magnificPopup({
		type:'inline',
		preloader:false
	});
	//閉じるリンクの設定
	jQuery(document).on('click', '.popup-modal-dismiss-close', function (e) {
		e.preventDefault();
		jQuery.magnificPopup.close();
	});
});

/* スライダー */
jQuery(function() {
	jQuery('.slide-multi').slick({
		infinite:false, //無限ループ
		slidesToShow:4, //表示するスライドの数
		slidesToScroll:4 //スクロールで切り替わるスライドの数
	});
});

/* input追加 */
jQuery(function() {
	jQuery('#add-phone').on('click', function(){
		jQuery(this).before('<input name="phones[]" type="text" class="w350" value="" />');
	});
});

/* input追加 */
jQuery(function() {
	jQuery('#add-mail').on('click', function(){
		jQuery(this).before('<input name="mails[]" type="text" class="w350" value="" />');
	});
});

/* デートタイムピッカー */
jQuery(function(){
	jQuery('.datetimepicker-YMDHm').each(function(){
		jQuery(this).datetimepicker({
			locale:'ja',
			focusOnShow:false,
			showClose:true,
			showClear:true,
			format:'YYYY.MM.DD HH:mm'
		});
	});
});

/* ソートボタン */
jQuery(function(){
	jQuery('.sortSwitch_input01').each(function() {
        if(jQuery(this).prop('checked')){
            jQuery(this).parent().addClass('is-active');
        }
	});
    jQuery('.sortSwitch01').on('click', function() {
        if(jQuery(this).children('input').prop('checked')){
			jQuery('.sortSwitch_input01').parent().removeClass('is-active');
            jQuery(this).addClass('is-active');
        }
    });
});

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
		vertical:true, //縦方向
		slidesToShow:2, //表示するスライドの数
		slidesToScroll:2, //スクロールで切り替わるスライドの数
	});
});

/* input追加 */
jQuery(function() {
	jQuery('.add-btn').on('click', function(){
		jQuery(this).before('<input type="text" class="wp100-40" value="" />');
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
    jQuery('.sort_switch').on('click', function() {
        if(jQuery(this).hasClass('sort_switch-up')){
			jQuery(this).removeClass('sort_switch-up').addClass('sort_switch-down');
        } else if(jQuery(this).hasClass('sort_switch-down')){
			jQuery(this).removeClass('sort_switch-down').addClass('sort_switch-up');
        }
    });
});

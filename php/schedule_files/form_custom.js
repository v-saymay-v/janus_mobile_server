
/* 予定追加　利用設備、定期的な予定等 */
$(window).on("load", function(){
	// ツールチップ表示処理
	$(document).on("click", '.formbtn_open, .sche_regular, .sche_irregular, .sche_icon_entrybtn, .destination_button', function(){
		//親にform_editboxが無かったら
		if (!$(this).parents().hasClass('form_editbox')) {
			$('#container').append('<div class="modal-overlay"></div>');

			// 背景の位置を固定
			var current_scrollY = $( window ).scrollTop(); 
			$( 'body' ).css( {
				position: 'fixed',
				top: -1 * current_scrollY
			} );
		} else{
			// 元の高さ
			var scrollH = $(this).parents('.form_editbox').get(0).scrollHeight;
			// 表示されている高さ
			var offsetH = $(this).parents('.form_editbox').get(0).offsetHeight;
			if (scrollH > offsetH) {
				// 背景の位置を固定
				$(this).parents('.form_editbox').css( {
					overflow: 'hidden'
				} );
			} else{
				// 背景の位置を固定
				$(this).parents('.form_editbox').css( {
					overflow: 'visible'
				} );
			}
		}
		
		// リンクの #plan** を取得
		var targetNote = $(this).attr('id');

		// [?]の座標を取得
		var position = $(this).position();
		var newPositionTop = position.top +0;			/* + 数値で下方向へ移動 */
		var newPositionLeft = position.left +0;			/* + 数値で右方向へ移動 */

		// ツールチップの class="invisible" を削除
		$('.comarea div.form_editbox'+targetNote).removeClass('invisible');
		$('.comarea div.form_editbox'+targetNote).addClass('visible');

		// sidebar-openとsidebar-miniを外す
		$('body').removeClass('sidebar-open');

		// 表示されたツールチップを隠す処理（マウスクリックで全て隠す）
		$(document).on("mousedown", '.li_close', function(){
			//親にmodal-crossが無かったら
			if ($(this).parent().hasClass('modal-cross')) {
				if($('.visible').not('.modal-cross').length){
					$(this).parent('.form_editbox').addClass('invisible');
					$(this).parent('.form_editbox').removeClass('visible');
					$('.form_editbox').css( {
						overflow: 'auto'
					} );
				} else {
					// オーバーレイを削除
					$('.modal-overlay').remove();
					$('.form_editbox').addClass('invisible');
					$('.form_editbox').removeClass('visible');
					// 位置調整
					$( 'body' ).css( { position: 'static' } );
					$( 'html, body' ).prop( { scrollTop: current_scrollY } );
				}
			} else{
				//親にform_editboxが無かったら
				//if (!$(this).parent().parents().hasClass('form_editbox:not(#filewindowadd)')) {
				if(!$(this).closest('.form_editbox').parents('.form_editbox').length) {
					// オーバーレイを削除
					$('.modal-overlay').remove();
					$('.form_editbox').addClass('invisible');
					$('.form_editbox').removeClass('visible');
					// 位置調整
					$( 'body' ).css( { position: 'static' } );
					$( 'html, body' ).prop( { scrollTop: current_scrollY } );
				} else{
					$(this).parent('.form_editbox').addClass('invisible');
					$(this).parent('.form_editbox').removeClass('visible');
					$(this).parents('.form_editbox').css( {
						overflow: 'auto'
					} );
				}
			}
		});
	});

	/* 予定アイコン　全ての登録アイコン表示 */
	$('.sche_iconlistbtn').on('click', function(){
		$('.sche_iconlist').slideToggle();
	});
});

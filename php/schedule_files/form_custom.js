
/* ͽ���ɲá��������������Ū��ͽ���� */
$(window).on("load", function(){
	// �ġ�����å�ɽ������
	$(document).on("click", '.formbtn_open, .sche_regular, .sche_irregular, .sche_icon_entrybtn, .destination_button', function(){
		//�Ƥ�form_editbox��̵���ä���
		if (!$(this).parents().hasClass('form_editbox')) {
			$('#container').append('<div class="modal-overlay"></div>');

			// �طʤΰ��֤����
			var current_scrollY = $( window ).scrollTop(); 
			$( 'body' ).css( {
				position: 'fixed',
				top: -1 * current_scrollY
			} );
		} else{
			// ���ι⤵
			var scrollH = $(this).parents('.form_editbox').get(0).scrollHeight;
			// ɽ������Ƥ���⤵
			var offsetH = $(this).parents('.form_editbox').get(0).offsetHeight;
			if (scrollH > offsetH) {
				// �طʤΰ��֤����
				$(this).parents('.form_editbox').css( {
					overflow: 'hidden'
				} );
			} else{
				// �طʤΰ��֤����
				$(this).parents('.form_editbox').css( {
					overflow: 'visible'
				} );
			}
		}
		
		// ��󥯤� #plan** �����
		var targetNote = $(this).attr('id');

		// [?]�κ�ɸ�����
		var position = $(this).position();
		var newPositionTop = position.top +0;			/* + ���ͤǲ������ذ�ư */
		var newPositionLeft = position.left +0;			/* + ���ͤǱ������ذ�ư */

		// �ġ�����åפ� class="invisible" ����
		$('.comarea div.form_editbox'+targetNote).removeClass('invisible');
		$('.comarea div.form_editbox'+targetNote).addClass('visible');

		// sidebar-open��sidebar-mini�򳰤�
		$('body').removeClass('sidebar-open');

		// ɽ�����줿�ġ�����åפ򱣤������ʥޥ�������å������Ʊ�����
		$(document).on("mousedown", '.li_close', function(){
			//�Ƥ�modal-cross��̵���ä���
			if ($(this).parent().hasClass('modal-cross')) {
				if($('.visible').not('.modal-cross').length){
					$(this).parent('.form_editbox').addClass('invisible');
					$(this).parent('.form_editbox').removeClass('visible');
					$('.form_editbox').css( {
						overflow: 'auto'
					} );
				} else {
					// �����С��쥤����
					$('.modal-overlay').remove();
					$('.form_editbox').addClass('invisible');
					$('.form_editbox').removeClass('visible');
					// ����Ĵ��
					$( 'body' ).css( { position: 'static' } );
					$( 'html, body' ).prop( { scrollTop: current_scrollY } );
				}
			} else{
				//�Ƥ�form_editbox��̵���ä���
				//if (!$(this).parent().parents().hasClass('form_editbox:not(#filewindowadd)')) {
				if(!$(this).closest('.form_editbox').parents('.form_editbox').length) {
					// �����С��쥤����
					$('.modal-overlay').remove();
					$('.form_editbox').addClass('invisible');
					$('.form_editbox').removeClass('visible');
					// ����Ĵ��
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

	/* ͽ�ꥢ���������Ƥ���Ͽ��������ɽ�� */
	$('.sche_iconlistbtn').on('click', function(){
		$('.sche_iconlist').slideToggle();
	});
});

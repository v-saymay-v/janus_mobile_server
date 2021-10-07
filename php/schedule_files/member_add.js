function searchMember(group) {
	var cmd;
	var item_id = $('#member_add .select_editbox').attr('id');
	var group_name = 'member_selected_group';
	if(item_id) {
		group_name = group_name + item_id;
	}
	if(item_id && group) {
		$(':hidden[name="' + group_name + '"]').remove();
		$('<input>').attr({
			type: 'hidden',
			id: group_name,
			name: group_name,
			value: group
		}).appendTo("#f1");
	}
	const data = new FormData();
	data.set('group', group);

	fetch('./search_member.php', {method:'POST', cache:'no-cache', credentials: "include", body: data})
	.then((res) => res.json())
	.then((users) => {
		displayMember(users);
	}).catch((reason) => {
		throw new Error('Failed to get members');
	});
}

function displayMember(users) {
	var item_id = $('#member_add .select_editbox').attr('id');
	var hidden_name = 'add_member_list_hidden';
	if(item_id) {
		$('#member_dellist').html('');
		hidden_name = hidden_name + item_id + '_';
	}
	var add_user = $('[name=add_member_list]:checked').map(function(){
		return $(this).val();
	}).get();
	var add_user_hidden = $(':hidden[name="' + hidden_name + '"]').map(function(){
		return $(this).val();
	}).get();
	for(var i in add_user_hidden) {
		if($.inArray(add_user_hidden[i], add_user) == -1) {
			add_user.push(add_user_hidden[i]);
		}
	}
	$(':hidden[name="' + hidden_name + '"]').remove();
	for(var i in add_user) {
		$('<input>').attr({
			type: 'hidden',
			id: hidden_name + add_user[i],
			name: hidden_name,
			value: add_user[i]
		}).appendTo("#f1");
	}
	$('#member_list').children().remove();

	for(var idx in users) {
		var flg = 0;
		var user = users[idx];
		var elms = document.getElementsByName("member");
		if(item_id) {
			elms = document.getElementsByName("member" + item_id);
		}
		for(var j = 0; j < elms.length; j++) {
			if(user['id'] == elms[j].value) {
				flg = 1;
				break;
			}
		}
		if(flg == 1) {
			if(item_id) {
				$('#member_dellist').append('<li value="' + user['id'] + '">'
					+ '<span class="list_delete" value="' + user['id'] + '"><a href="#" id="member' + results[0] + '">削除</a></span>'
					+ '<span class="list_name">' + user['name'] + '</span>'
					+ '<span class="list_department">' + user['group'] + '</span>'
					+ '</li>');
			}
			continue;
		}
		var checkbox_id = "add_user_check_" + user['id'];
		var user_name_id = "add_user_name_" + user['id'];
		var group_name_id = "add_group_name_" + user['id'];
		if($.inArray(user['id'], add_user) == -1) {
			contents = "<tbody>\n"+
								 "<tr>\n"+
								 "	<td class=\"tab_list_check\">\n"+
								 "		<label class=\"label-checkbox\">\n"+
								 "			<input type=\"checkbox\" name=\"add_member_list\" value=\"" + user['id'] + "\" class=\"checkbox checkmember\" id=\"" + checkbox_id + "\">\n"+
								 "			<span class=\"lever\"></span>\n"+
								 "		</label>\n"+
								 "	</td>\n"+
								 "	<td class=\"tab_list_name\"><span id=\"" + user_name_id + "\">" + user['name'] + "</span></td>\n"+
								 "	<td class=\"tab_list_department\"><span id=\"" + group_name_id + "\">" + user['group'] + "</span></td>\n"+
								 "</tr>\n"+
								 "</tbody>";
		} else {
			contents = "<tbody>\n"+
								 "<tr>\n"+
								 "	<td class=\"tab_list_check\">\n"+
								 "		<label class=\"label-checkbox\">\n"+
								 "			<input type=\"checkbox\" name=\"add_member_list\" value=\"" + user['id'] + "\" class=\"checkbox checkmember\" id=\"" + checkbox_id + "\" checked>\n"+
								 "			<span class=\"lever\"></span>\n"+
								 "		</label>\n"+
								 "	</td>\n"+
								 "	<td class=\"tab_list_name\"><span id=\"" + user_name_id + "\">" + user['name'] + "</span></td>\n"+
								 "	<td class=\"tab_list_department\"><span id=\"" + group_name_id + "\">" + user['group'] + "</span></td>\n"+
								 "</tr>\n"+
								 "</tbody>";
		}
		$('#member_list').append(contents);
		/* チェックを外したときにhidden値が存在していたら削除する */
		var S_checkbox = $('#' + checkbox_id);
		if(S_checkbox.length) {
			S_checkbox.on('change', function() {
				if($(this).prop(':checked')) {
				} else {
					$('#' + hidden_name + $(this).val()).remove();
				}
			});
		}
	}
}

$(window).on("load", function(){
	//メンバー等フォルダ開閉
	$(document).on('click', '.folder_cotegory, .subfolder_cotegory', function(){
		//「opened」クラスがあれば削除、なければ付与
		$(this).toggleClass('folder_opend');
		//アコーディオンを開閉する
		$(this).next().slideToggle();
	});

	$(document).on('click', 'span.cf_title', function(){
		$('span.cf_title').removeClass("clicked");
		$(this).addClass("clicked");
	});

	$(document).on("click", '#allmember-checkbox', function(){
		var checked_val = this.checked;
		$(':input[name="add_member_list"]').each(function() {
			$(this).prop("checked", checked_val);
			if(checked_val === false) {
				$('#add_member_list_hidden' + $(this).val()).remove();
			}
		});
	});

	/* ウインドウを閉じたときは追加していないhidden値削除 */
	/* チェックボックスを全て未選択状態にする */
	$(document).on("mousedown", '#member_add .li_close', function(){
		$(':input:hidden[id^="add_member_list_hidden"]').each(function() {
			$(this).remove();
		});
		$(':input[name="add_member_list"]').each(function() {
			$(this).prop("checked", false);
		});
	});

	//メンバー削除
	$(document).on("click", ".member_addlist li .list_delete", (function(ev) {
		var taget_value = $(this).attr("value");
		var memberListHidden = $(':input:hidden[type="hidden"][name="member"]');
		for(var i = 0; i < memberListHidden.length; i++) {
			if(parseInt(memberListHidden[i].value) == taget_value) {
				$(':input:hidden[type="hidden"][name="member"][value="' + taget_value + '"]').remove();
				break;
			}
		}
		$(this).parent().remove();
		var add_user_hidden = '#add_member_list_hidden' + taget_value;
		$(add_user_hidden).remove();

		var name = $(this).attr("name");
		if (name == 'guest') {
			const data = new FormData();
			data.set('userid', taget_value);
			fetch('./deleteguest.php', {method:'POST', cache:'no-cache', credentials:'include', body:data})
			.then((res) => res.json())
			.then((response) => {
				if (response.result == 0) {
				} else {
					SB.alert(response.result_string);
				}
			}).catch((reason) => {
				SB.alert(reason);
			});
		}
		return false;
	}));

	//メンバー追加
	$('#add_member').on("click", function(ev) {
		var users = [];
		var add_member_list = $('[name=add_member_list]:checked');
		for(var i = 0; i < add_member_list.length; i++) {
			var userid = add_member_list[i].value;
			var username = $('#add_user_name_'+userid).html();
			var groupname = $('#add_group_name_'+userid).html();
			var user = {id: userid, user: username, group: groupname};
			users.push(user);
		}
		$('.modal-overlay').remove();
		$('div#member_add').addClass('invisible');
		$('body').css({ position:'static'});
		var dispHtml = '';
		for (var idx in users) {
			var user = users[idx];
			var id = user.id;
			$('<input>').attr({
				type: 'hidden',
				name: 'member',
				value: id
			}).appendTo('#member_add_form');
			dispHtml += 
				'<li name="user" value="' + id + '">\n'
			+ '	<span class="list_delete" value="' + id + '"><a href="#" id="member' + id + '">削除</a></span>\n'
			+ '	<span class="list_name">' + user.user + '</span>\n'
			+ '	<span class="list_department">' + user.group + '</span>\n'
			+ '</li>\n';
		}
		$('#member_add_list').append(dispHtml);
		var selected_group = 0;
		if($('#member_selected_group').length && typeof $('#member_selected_group').val() !== 'undefined') {
			selected_group = parseInt($('#member_selected_group').val());
		}
		searchMember(selected_group);
		return false;
	});

	//ゲスト追加
	$('#add_guest').on("click", function(ev) {
		const data = new FormData();
		data.set('organization', $('#guest_organization').val());
		data.set('name', $('#guest_name').val());
		data.set('email', $('#guest_email').val());

		fetch('./addguest.php', {method:'POST', cache:'no-cache', credentials: "include", body: data})
		.then((res) => res.json())
		.then((result) => {
			if (result.result != 0) {
				$('#guest-error-mess').text(result.result_string);
				$('#guest-error').removeClass('invisible').show();
			} else {
				const dispHtml = 
					'<li name="guest" value="' + result.userid + '">\n'
				+ '	<span class="list_delete" value="' + result.userid + '"><a href="#" id="member' + result.userid + '">削除</a></span>\n'
				+ '	<span class="list_name">' + $('#guest_name').val() + '</span>\n'
				+ '	<span class="list_department">ゲスト</span>\n'
				+ '</li>\n';
				$('#member_add_list').append(dispHtml);
				$('div#guest_add').addClass('invisible');
			}
		}).catch((reason) => {
			$('#guest-error-mess').text(reason);
			$('#guest-error').removeClass('hideme').show();
		});
	});
});


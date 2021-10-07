IGNORE_DIRS=
JANUSMOBILE=/var/www/html/janusmobile
JANUSMOBILE_MODELS=/var/www/html/janusmobile/models
JANUSMOBILE_MODELS_LANGUAGES=/var/www/html/janusmobile/models/languages
JANUSMOBILE_MODELS_MAIL=/var/www/html/janusmobile/models/mail-templates
DATADIR=/var/www/data/room
INITDIR=/etc/init.d

default: \
	$(INITDIR)/pushdaemon.sh \
	$(DATADIR)/db_connect.php \
	$(DATADIR)/sns_keys.php \
	$(DATADIR)/pushdaemon.php \
	$(JANUSMOBILE)/index.php \
	$(JANUSMOBILE)/index.js \
	$(JANUSMOBILE)/index.css \
	$(JANUSMOBILE)/schedule.php \
	$(JANUSMOBILE)/meeting.php \
	$(JANUSMOBILE)/meeting_personal.php \
	$(JANUSMOBILE)/sidenav.php \
	$(JANUSMOBILE)/header.php \
	$(JANUSMOBILE)/dialog.php \
	$(JANUSMOBILE)/room.php \
	$(JANUSMOBILE)/addguest.php \
	$(JANUSMOBILE)/allowJoin.php \
	$(JANUSMOBILE)/answerpush.php \
	$(JANUSMOBILE)/app.php \
	$(JANUSMOBILE)/change_email.php \
	$(JANUSMOBILE)/company_class.php \
	$(JANUSMOBILE)/confirmguest.php \
	$(JANUSMOBILE)/deleteguest.php \
	$(JANUSMOBILE)/finishmeeting.php \
	$(JANUSMOBILE)/getphoto.php \
	$(JANUSMOBILE)/getuserlist.php \
	$(JANUSMOBILE)/getvideocalllist.php \
	$(JANUSMOBILE)/getvoicemaillist.php \
	$(JANUSMOBILE)/group_class.php \
	$(JANUSMOBILE)/groups_class.php \
	$(JANUSMOBILE)/listenmail.php \
	$(JANUSMOBILE)/login.php \
	$(JANUSMOBILE)/logout.php \
	$(JANUSMOBILE)/balogin.php \
	$(JANUSMOBILE)/guestlogin.php \
	$(JANUSMOBILE)/check_login.php \
	$(JANUSMOBILE)/check_session.php \
	$(JANUSMOBILE)/meetingHandle.php \
	$(JANUSMOBILE)/meetingInfo.php \
	$(JANUSMOBILE)/meeting_class.php \
	$(JANUSMOBILE)/new_schedule.php \
	$(JANUSMOBILE)/playvoicemail.php \
	$(JANUSMOBILE)/registerguest.php \
	$(JANUSMOBILE)/registersipsetting.php \
	$(JANUSMOBILE)/registervoicemail.php \
	$(JANUSMOBILE)/roomadmin.php \
	$(JANUSMOBILE)/roomlogin.php \
	$(JANUSMOBILE)/saveHostKey.php \
	$(JANUSMOBILE)/savephoto.php \
	$(JANUSMOBILE)/savepwd.php \
	$(JANUSMOBILE)/search_member.php \
	$(JANUSMOBILE)/sendpush.php \
	$(JANUSMOBILE)/subscribe.php \
	$(JANUSMOBILE)/textroom.php \
	$(JANUSMOBILE)/unsubscribe.php \
	$(JANUSMOBILE)/updateuserinfo.php \
	$(JANUSMOBILE)/upload.php \
	$(JANUSMOBILE)/user_class.php \
	$(JANUSMOBILE)/meeting_list.php \
	$(JANUSMOBILE)/group_list.php \
	$(JANUSMOBILE)/meeting_detail.php \
	$(JANUSMOBILE)/member_list.php \
	$(JANUSMOBILE)/janusmobile.php \
	$(JANUSMOBILE)/asktojoinroom.php \
	$(JANUSMOBILE)/joinroomrequest.php \
	$(JANUSMOBILE)/joinroom.php \
	$(JANUSMOBILE)/uuid_v4_factory.php \
	$(JANUSMOBILE)/write_voip_token.php \
	$(JANUSMOBILE)/service-worker.js \
	$(JANUSMOBILE)/get_admin_user.php \
	$(JANUSMOBILE)/make_me_new_admin.php \
	$(JANUSMOBILE)/add_group.php \
	$(JANUSMOBILE)/change_organization.php \
	$(JANUSMOBILE)/create_organization.php \
	$(JANUSMOBILE)/join_organization.php \
	$(JANUSMOBILE)/hand_over_admin.php \
	$(JANUSMOBILE)/change_group.php \
	$(JANUSMOBILE)/change_group_name.php \
	$(JANUSMOBILE)/delete_group.php \
	$(JANUSMOBILE)/set_group_order.php \
	$(JANUSMOBILE_MODELS)/class.mail.php \
	$(JANUSMOBILE_MODELS)/class.newuser.php \
	$(JANUSMOBILE_MODELS)/class.user.php \
	$(JANUSMOBILE_MODELS)/config.php \
	$(JANUSMOBILE_MODELS)/constants.php \
	$(JANUSMOBILE_MODELS)/db-settings.php \
	$(JANUSMOBILE_MODELS)/footer.php \
	$(JANUSMOBILE_MODELS)/funcs.js \
	$(JANUSMOBILE_MODELS)/funcs.php \
	$(JANUSMOBILE_MODELS)/left-nav.php \
	$(JANUSMOBILE_MODELS)/recaptcha.config.php \
	$(JANUSMOBILE_MODELS)/top-nav.php \
	$(JANUSMOBILE_MODELS_LANGUAGES)/en.php \
	$(JANUSMOBILE_MODELS_LANGUAGES)/ja.php \
	$(JANUSMOBILE_MODELS_MAIL)/lost-password-request.txt \
	$(JANUSMOBILE_MODELS_MAIL)/new-registration.txt \
	$(JANUSMOBILE_MODELS_MAIL)/resend-activation.txt \
	$(JANUSMOBILE_MODELS_MAIL)/your-lost-password.txt
	@for dir in *; do \
		if [ ! -d "$$dir" ]; then continue; fi; \
		for ignore in $(IGNORE_DIRS); do \
			if [ "$$dir" = "$$ignore" ]; then continue 2; fi \
		done; \
		if [ -f "$$dir/Makefile" ]; then (cd $$dir; pwd; $(MAKE)); fi \
	done;

$(INITDIR)/pushdaemon.sh: ../php/pushdaemon.sh
	sudo cp ../php/pushdaemon.sh $(INITDIR)/
	sudo chmod 755 $(INITDIR)/pushdaemon.sh
$(DATADIR)/db_connect.php: ../php/db_connect.php
	sudo cp ../php/db_connect.php $(DATADIR)/
$(DATADIR)/sns_keys.php: sns_keys.php
	sudo cp sns_keys.php $(DATADIR)/
$(DATADIR)/pushdaemon.php: ../php/pushdaemon.php
	sudo cp ../php/pushdaemon.php $(DATADIR)/

$(JANUSMOBILE)/index.php: index.php
	sudo cp index.php $(JANUSMOBILE)/
$(JANUSMOBILE)/index.js: index.js
	sudo cp index.js $(JANUSMOBILE)/
$(JANUSMOBILE)/index.css: index.css
	sudo cp index.css $(JANUSMOBILE)/
$(JANUSMOBILE)/schedule.php: schedule.php
	sudo cp schedule.php $(JANUSMOBILE)/
$(JANUSMOBILE)/meeting.php: meeting.php
	sudo cp meeting.php $(JANUSMOBILE)/
$(JANUSMOBILE)/meeting_personal.php: meeting_personal.php
	sudo cp meeting_personal.php $(JANUSMOBILE)/
$(JANUSMOBILE)/sidenav.php: sidenav.php
	sudo cp sidenav.php $(JANUSMOBILE)/
$(JANUSMOBILE)/header.php: header.php
	sudo cp header.php $(JANUSMOBILE)/
$(JANUSMOBILE)/dialog.php: dialog.php
	sudo cp dialog.php $(JANUSMOBILE)/
$(JANUSMOBILE)/janusmobile.php: janusmobile.php
	sudo cp janusmobile.php $(JANUSMOBILE)/
$(JANUSMOBILE)/balogin.php: balogin.php
	sudo cp balogin.php $(JANUSMOBILE)/
$(JANUSMOBILE)/guestlogin.php: guestlogin.php
	sudo cp guestlogin.php $(JANUSMOBILE)/
$(JANUSMOBILE)/check_login.php: check_login.php
	sudo cp check_login.php $(JANUSMOBILE)/
$(JANUSMOBILE)/check_session.php: check_session.php
	sudo cp check_session.php $(JANUSMOBILE)/
$(JANUSMOBILE)/meeting_list.php: meeting_list.php
	sudo cp meeting_list.php $(JANUSMOBILE)/
$(JANUSMOBILE)/group_list.php: group_list.php
	sudo cp group_list.php $(JANUSMOBILE)/
$(JANUSMOBILE)/meeting_detail.php: meeting_detail.php
	sudo cp meeting_detail.php $(JANUSMOBILE)/
$(JANUSMOBILE)/member_list.php: member_list.php
	sudo cp member_list.php $(JANUSMOBILE)/
$(JANUSMOBILE)/asktojoinroom.php: asktojoinroom.php
	sudo cp asktojoinroom.php $(JANUSMOBILE)/
$(JANUSMOBILE)/joinroomrequest.php: joinroomrequest.php
	sudo cp joinroomrequest.php $(JANUSMOBILE)/
$(JANUSMOBILE)/joinroom.php: joinroom.php
	sudo cp joinroom.php $(JANUSMOBILE)/
$(JANUSMOBILE)/uuid_v4_factory.php: uuid_v4_factory.php
	sudo cp uuid_v4_factory.php $(JANUSMOBILE)/
$(JANUSMOBILE)/write_voip_token.php: write_voip_token.php
	sudo cp write_voip_token.php $(JANUSMOBILE)/
$(JANUSMOBILE)/get_admin_user.php: get_admin_user.php
	sudo cp get_admin_user.php $(JANUSMOBILE)/
$(JANUSMOBILE)/make_me_new_admin.php: make_me_new_admin.php
	sudo cp make_me_new_admin.php $(JANUSMOBILE)/
$(JANUSMOBILE)/add_group.php: add_group.php
	sudo cp add_group.php $(JANUSMOBILE)/
$(JANUSMOBILE)/change_organization.php: change_organization.php
	sudo cp change_organization.php $(JANUSMOBILE)/
$(JANUSMOBILE)/create_organization.php: create_organization.php
	sudo cp create_organization.php $(JANUSMOBILE)/
$(JANUSMOBILE)/join_organization.php: join_organization.php
	sudo cp join_organization.php $(JANUSMOBILE)/
$(JANUSMOBILE)/hand_over_admin.php: hand_over_admin.php
	sudo cp hand_over_admin.php $(JANUSMOBILE)/
$(JANUSMOBILE)/change_group.php: change_group.php
	sudo cp change_group.php $(JANUSMOBILE)/
$(JANUSMOBILE)/change_group_name.php: change_group_name.php
	sudo cp change_group_name.php $(JANUSMOBILE)/
$(JANUSMOBILE)/delete_group.php: delete_group.php
	sudo cp delete_group.php $(JANUSMOBILE)/
$(JANUSMOBILE)/set_group_order.php: set_group_order.php
	sudo cp set_group_order.php $(JANUSMOBILE)/

$(JANUSMOBILE)/room.php: ../php/room.php
	sudo cp ../php/room.php $(JANUSMOBILE)/
$(JANUSMOBILE)/addguest.php: ../php/addguest.php
	sudo cp ../php/addguest.php $(JANUSMOBILE)/
$(JANUSMOBILE)/allowJoin.php: ../php/allowJoin.php
	sudo cp ../php/allowJoin.php $(JANUSMOBILE)/
$(JANUSMOBILE)/answerpush.php: ../php/answerpush.php
	sudo cp ../php/answerpush.php $(JANUSMOBILE)/
$(JANUSMOBILE)/app.php: ../php/app.php
	sudo cp ../php/app.php $(JANUSMOBILE)/
$(JANUSMOBILE)/change_email.php: ../php/change_email.php
	sudo cp ../php/change_email.php $(JANUSMOBILE)/
$(JANUSMOBILE)/company_class.php: ../php/company_class.php
	sudo cp ../php/company_class.php $(JANUSMOBILE)/
$(JANUSMOBILE)/confirmguest.php: ../php/confirmguest.php
	sudo cp ../php/confirmguest.php $(JANUSMOBILE)/
$(JANUSMOBILE)/deleteguest.php: ../php/deleteguest.php
	sudo cp ../php/deleteguest.php $(JANUSMOBILE)/
$(JANUSMOBILE)/finishmeeting.php: ../php/finishmeeting.php
	sudo cp ../php/finishmeeting.php $(JANUSMOBILE)/
$(JANUSMOBILE)/getphoto.php: ../php/getphoto.php
	sudo cp ../php/getphoto.php $(JANUSMOBILE)/
$(JANUSMOBILE)/getuserlist.php: ../php/getuserlist.php
	sudo cp ../php/getuserlist.php $(JANUSMOBILE)/
$(JANUSMOBILE)/getvideocalllist.php: ../php/getvideocalllist.php
	sudo cp ../php/getvideocalllist.php $(JANUSMOBILE)/
$(JANUSMOBILE)/getvoicemaillist.php: ../php/getvoicemaillist.php
	sudo cp ../php/getvoicemaillist.php $(JANUSMOBILE)/
$(JANUSMOBILE)/group_class.php: ../php/group_class.php
	sudo cp ../php/group_class.php $(JANUSMOBILE)/
$(JANUSMOBILE)/groups_class.php: ../php/groups_class.php
	sudo cp ../php/groups_class.php $(JANUSMOBILE)/
$(JANUSMOBILE)/listenmail.php: ../php/listenmail.php
	sudo cp ../php/listenmail.php $(JANUSMOBILE)/
$(JANUSMOBILE)/login.php: ../php/login.php
	sudo cp ../php/login.php $(JANUSMOBILE)/
$(JANUSMOBILE)/logout.php: ../php/logout.php
	sudo cp ../php/logout.php $(JANUSMOBILE)/
$(JANUSMOBILE)/meetingHandle.php: ../php/meetingHandle.php
	sudo cp ../php/meetingHandle.php $(JANUSMOBILE)/
$(JANUSMOBILE)/meetingInfo.php: ../php/meetingInfo.php
	sudo cp ../php/meetingInfo.php $(JANUSMOBILE)/
$(JANUSMOBILE)/meeting_class.php: ../php/meeting_class.php
	sudo cp ../php/meeting_class.php $(JANUSMOBILE)/
$(JANUSMOBILE)/new_schedule.php: ../php/new_schedule.php
	sudo cp ../php/new_schedule.php $(JANUSMOBILE)/
$(JANUSMOBILE)/playvoicemail.php: ../php/playvoicemail.php
	sudo cp ../php/playvoicemail.php $(JANUSMOBILE)/
$(JANUSMOBILE)/registerguest.php: ../php/registerguest.php
	sudo cp ../php/registerguest.php $(JANUSMOBILE)/
$(JANUSMOBILE)/registersipsetting.php: ../php/registersipsetting.php
	sudo cp ../php/registersipsetting.php $(JANUSMOBILE)/
$(JANUSMOBILE)/registervoicemail.php: ../php/registervoicemail.php
	sudo cp ../php/registervoicemail.php $(JANUSMOBILE)/
$(JANUSMOBILE)/roomadmin.php: ../php/roomadmin.php
	sudo cp ../php/roomadmin.php $(JANUSMOBILE)/
$(JANUSMOBILE)/roomlogin.php: ../php/roomlogin.php
	sudo cp ../php/roomlogin.php $(JANUSMOBILE)/
$(JANUSMOBILE)/saveHostKey.php: ../php/saveHostKey.php
	sudo cp ../php/saveHostKey.php $(JANUSMOBILE)/
$(JANUSMOBILE)/savephoto.php: ../php/savephoto.php
	sudo cp ../php/savephoto.php $(JANUSMOBILE)/
$(JANUSMOBILE)/savepwd.php: ../php/savepwd.php
	sudo cp ../php/savepwd.php $(JANUSMOBILE)/
$(JANUSMOBILE)/search_member.php: ../php/search_member.php
	sudo cp ../php/search_member.php $(JANUSMOBILE)/
$(JANUSMOBILE)/sendpush.php: ../php/sendpush.php
	sudo cp ../php/sendpush.php $(JANUSMOBILE)/
$(JANUSMOBILE)/subscribe.php: ../php/subscribe.php
	sudo cp ../php/subscribe.php $(JANUSMOBILE)/
$(JANUSMOBILE)/textroom.php: ../php/textroom.php
	sudo cp ../php/textroom.php $(JANUSMOBILE)/
$(JANUSMOBILE)/unsubscribe.php: ../php/unsubscribe.php
	sudo cp ../php/unsubscribe.php $(JANUSMOBILE)/
$(JANUSMOBILE)/updateuserinfo.php: ../php/updateuserinfo.php
	sudo cp ../php/updateuserinfo.php $(JANUSMOBILE)/
$(JANUSMOBILE)/upload.php: ../php/upload.php
	sudo cp ../php/upload.php $(JANUSMOBILE)/
$(JANUSMOBILE)/user_class.php: ../php/user_class.php
	sudo cp ../php/user_class.php $(JANUSMOBILE)/
$(JANUSMOBILE)/service-worker.js: ../php/service-worker.js
	sudo cp ../php/service-worker.js $(JANUSMOBILE)/

$(JANUSMOBILE_MODELS)/class.mail.php: ../php/admin/models/class.mail.php
	sudo cp ../php/admin/models/class.mail.php $(JANUSMOBILE_MODELS)/
$(JANUSMOBILE_MODELS)/class.newuser.php: ../php/admin/models/class.newuser.php
	sudo cp ../php/admin/models/class.newuser.php $(JANUSMOBILE_MODELS)/
$(JANUSMOBILE_MODELS)/class.user.php: ../php/admin/models/class.user.php
	sudo cp ../php/admin/models/class.user.php $(JANUSMOBILE_MODELS)/
$(JANUSMOBILE_MODELS)/config.php: ../php/admin/models/config.php
	sudo cp ../php/admin/models/config.php $(JANUSMOBILE_MODELS)/
$(JANUSMOBILE_MODELS)/constants.php: ../php/admin/models/constants.php
	sudo cp ../php/admin/models/constants.php $(JANUSMOBILE_MODELS)/
$(JANUSMOBILE_MODELS)/db-settings.php: ../php/admin/models/db-settings.php
	sudo cp ../php/admin/models/db-settings.php $(JANUSMOBILE_MODELS)/
$(JANUSMOBILE_MODELS)/footer.php: ../php/admin/models/footer.php
	sudo cp ../php/admin/models/footer.php $(JANUSMOBILE_MODELS)/
$(JANUSMOBILE_MODELS)/funcs.js: ../php/admin/models/funcs.js
	sudo cp ../php/admin/models/funcs.js $(JANUSMOBILE_MODELS)/
$(JANUSMOBILE_MODELS)/funcs.php: ../php/admin/models/funcs.php
	sudo cp ../php/admin/models/funcs.php $(JANUSMOBILE_MODELS)/
$(JANUSMOBILE_MODELS)/left-nav.php: ../php/admin/models/left-nav.php
	sudo cp ../php/admin/models/left-nav.php $(JANUSMOBILE_MODELS)/
$(JANUSMOBILE_MODELS)/recaptcha.config.php: ../php/admin/models/recaptcha.config.php
	sudo cp ../php/admin/models/recaptcha.config.php $(JANUSMOBILE_MODELS)/
$(JANUSMOBILE_MODELS)/top-nav.php: ../php/admin/models/top-nav.php
	sudo cp ../php/admin/models/top-nav.php $(JANUSMOBILE_MODELS)/

$(JANUSMOBILE_MODELS_LANGUAGES)/en.php: ../php/admin/models/languages/en.php
	sudo cp ../php/admin/models/languages/en.php $(JANUSMOBILE_MODELS_LANGUAGES)/
$(JANUSMOBILE_MODELS_LANGUAGES)/ja.php: ../php/admin/models/languages/ja.php
	sudo cp ../php/admin/models/languages/ja.php $(JANUSMOBILE_MODELS_LANGUAGES)/

$(JANUSMOBILE_MODELS_MAIL)/lost-password-request.txt: ../php/admin/models/mail-templates/lost-password-request.txt
	sudo cp ../php/admin/models/mail-templates/lost-password-request.txt $(JANUSMOBILE_MODELS_MAIL)/
$(JANUSMOBILE_MODELS_MAIL)/new-registration.txt: ../php/admin/models/mail-templates/new-registration.txt
	sudo cp ../php/admin/models/mail-templates/new-registration.txt $(JANUSMOBILE_MODELS_MAIL)/
$(JANUSMOBILE_MODELS_MAIL)/resend-activation.txt: ../php/admin/models/mail-templates/resend-activation.txt
	sudo cp ../php/admin/models/mail-templates/resend-activation.txt $(JANUSMOBILE_MODELS_MAIL)/
$(JANUSMOBILE_MODELS_MAIL)/your-lost-password.txt: ../php/admin/models/mail-templates/your-lost-password.txt
	sudo cp ../php/admin/models/mail-templates/your-lost-password.txt $(JANUSMOBILE_MODELS_MAIL)/

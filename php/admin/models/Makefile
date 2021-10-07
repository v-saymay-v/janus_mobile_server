JANUS=/var/www/html/hotroom/models

default: \
	$(JANUS)/class.mail.php \
	$(JANUS)/class.newuser.php \
	$(JANUS)/class.user.php \
	$(JANUS)/config.php \
	$(JANUS)/constants.php \
	$(JANUS)/db-settings.php \
	$(JANUS)/footer.php \
	$(JANUS)/funcs.js \
	$(JANUS)/funcs.php \
	$(JANUS)/left-nav.php \
	$(JANUS)/recaptcha.config.php \
	$(JANUS)/top-nav.php
	@for dir in *; do \
		if [ ! -d "$$dir" ]; then continue; fi; \
		for ignore in $(IGNORE_DIRS); do \
			if [ "$$dir" = "$$ignore" ]; then continue 2; fi \
		done; \
		if [ -f "$$dir/Makefile" ]; then (cd $$dir; pwd; $(MAKE)); fi \
	done;

$(JANUS)/class.mail.php: class.mail.php
	sudo cp class.mail.php $(JANUS)/
$(JANUS)/class.newuser.php: class.newuser.php
	sudo cp class.newuser.php $(JANUS)/
$(JANUS)/class.user.php: class.user.php
	sudo cp class.user.php $(JANUS)/
$(JANUS)/config.php: config.php
	sudo cp config.php $(JANUS)/
$(JANUS)/constants.php: constants.php
	sudo cp constants.php $(JANUS)/
$(JANUS)/db-settings.php: db-settings.php
	sudo cp db-settings.php $(JANUS)/
$(JANUS)/footer.php: footer.php
	sudo cp footer.php $(JANUS)/
$(JANUS)/funcs.js: funcs.js
	sudo cp funcs.js $(JANUS)/
$(JANUS)/funcs.php: funcs.php
	sudo cp funcs.php $(JANUS)/
$(JANUS)/left-nav.php: left-nav.php
	sudo cp left-nav.php $(JANUS)/
$(JANUS)/recaptcha.config.php: recaptcha.config.php
	sudo cp recaptcha.config.php $(JANUS)/
$(JANUS)/top-nav.php: top-nav.php
	sudo cp top-nav.php $(JANUS)/

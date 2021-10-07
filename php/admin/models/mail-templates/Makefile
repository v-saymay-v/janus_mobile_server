JANUS=/var/www/html/janus/models/mail-templates

default: \
	$(JANUS)/lost-password-request.txt \
	$(JANUS)/new-registration.txt \
	$(JANUS)/resend-activation.txt \
	$(JANUS)/your-lost-password.txt

$(JANUS)/lost-password-request.txt: lost-password-request.txt
	sudo cp lost-password-request.txt $(JANUS)/
$(JANUS)/new-registration.txt: new-registration.txt
	sudo cp new-registration.txt $(JANUS)/
$(JANUS)/resend-activation.txt: resend-activation.txt
	sudo cp resend-activation.txt $(JANUS)/
$(JANUS)/your-lost-password.txt: your-lost-password.txt
	sudo cp your-lost-password.txt $(JANUS)/

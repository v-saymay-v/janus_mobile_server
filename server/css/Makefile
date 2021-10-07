HOTROOM=/var/www/html/hotroom/css

default: $(HOTROOM)/common.css $(HOTROOM)/demo.css $(HOTROOM)/reset.css $(HOTROOM)/bootstrap.css $(HOTROOM)/toastr.css

$(HOTROOM)/common.css: common.css
	sudo cp common.css $(HOTROOM)/
$(HOTROOM)/reset.css: reset.css
	sudo cp reset.css $(HOTROOM)/

$(HOTROOM)/demo.css: ../../php/css/demo.css
	sudo cp ../../php/css/demo.css $(HOTROOM)/
$(HOTROOM)/bootstrap.css: ../../php/css/bootstrap.css
	sudo cp ../../php/css/bootstrap.css $(HOTROOM)/
$(HOTROOM)/toastr.css: ../../php/css/toastr.css
	sudo cp ../../php/css/toastr.css $(HOTROOM)/

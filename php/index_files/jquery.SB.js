(function() {
    var AJAX_DEFAULTS = {
        type: "POST",
        contentType: "application/x-www-form-urlencoded; charset=UTF-8",
        dataType: "json",
        error: function(xhr, status, e) {
            if (typeof console !== "undefined") {
                console.debug(e)
            }
        }
    };
    if (typeof (String.prototype.trim) !== "function") {
        String.prototype.trim = function() {
            return $.trim(this)
        }
    }
    var userAgent = navigator.userAgent.toLowerCase();
    var isWin = /windows/.test(userAgent);
    var isIPad = /ipad/.test(userAgent);
    var isIPhone = !isIPad && /(iphone|ipod)/.test(userAgent);
    var isMac = !isIPad && !isIPhone && /macintosh/.test(userAgent);
    var isAndroid = /android/.test(userAgent);
    var isLinux = !isAndroid && /linux (i686|x86_64)/.test(userAgent);
    var isChromeOS = /cros/.test(userAgent);
    var isFirefox = /firefox/.test(userAgent);
    var isOpera = /opera|opr\/[\d]+/.test(userAgent);
    var isIE = !isOpera && /(msie|trident)/.test(userAgent);
    var isIELower = userAgent.indexOf("compatible") > -1 && userAgent.indexOf("msie") > -1;
    var isEdge = /edge\/(\d+)/.test(userAgent);
    var isChrome = !isOpera && !isEdge && /chrome/.test(userAgent) && /webkit/.test(userAgent);
    var isSafari = !isOpera && !isEdge && !isChrome && /safari/.test(userAgent);
    var isIE8 = isIE && /(msie 8)/.test(userAgent);
    var isBrowser64 = /x64|win64|amd64|x86_64/.test(userAgent);
    var weSnsType = window.weSnsType = 100;
    var cookieDomain = $("body").attr("data-cd");
    if (!cookieDomain) {
        cookieDomain = ".zoom.us"
    }
    var MODAL_DEFAULTS = {
        closeClass: "simplemodal-close",
        closeHTML: null,
        minHeight: 171,
        opacity: 65,
        close: true,
        overlayClose: false,
        escClose: true,
        persist: false,
        modal: true,
        fixed: false,
        onClose: function(dialog) {
            dialog.container.fadeOut("fast", function() {
                dialog.overlay.fadeOut("fast", function() {
                    $.modal.close()
                })
            })
        }
    };
    if (!isIPad) {
        $.extend(MODAL_DEFAULTS, {
            onOpen: function(dialog) {
                dialog.overlay.fadeIn("fast", function() {
                    dialog.container.show();
                    dialog.data.fadeIn("fast")
                })
            }
        })
    }
    var originAjax = $.ajax;
    var popupCaptcha = null;
    $.ajax = function(options) {
        var success = options.success;
        return originAjax($.extend(options, {
            success: function(res, textStatus, jqXHR) {
                if (res && res.errorCode === 7300) {
                    var vm = new Vue();
                    var result = res.result;
                    popupCaptcha = vm.$createPopupCaptcha({
                        type: result.type,
                        routingUrl: result.routingUrl || window.resourceAccountIdRoutingURl,
                        errorMessage: res.errorMessage
                    }, function(captcha) {
                        if (!options.data) {
                            options.data = {}
                        }
                        options.data.recaptcha = captcha;
                        originAjax(options)
                    })
                } else {
                    if (popupCaptcha) {
                        popupCaptcha.hide()
                    }
                    success && success(res, textStatus, jqXHR)
                }
            }
        }))
    };
    $.extend(SB, {
        isWin: isWin,
        isMac: isMac,
        isIPad: isIPad,
        isIPhone: isIPhone,
        isAndroid: isAndroid,
        isLinux: isLinux,
        isChromeOS: isChromeOS,
        isIE: isIE,
        isIELower: isIELower,
        isIE8: isIE8,
        isEdge: isEdge,
        isFirefox: isFirefox,
        isChrome: isChrome,
        isOpera: isOpera,
        isSafari: isSafari,
        isBrowser64: isBrowser64,
        cookieDomain: cookieDomain,
        MODAL_DEFAULTS: MODAL_DEFAULTS,
        jump: function(url, loadInTop) {
            if (loadInTop) {
                top.location.href = SB.baseUrl + SB.contextPath + url
            } else {
                window.location.href = SB.baseUrl + SB.contextPath + url
            }
        },
        ajax: function(options) {
            return $.ajax($.extend({}, AJAX_DEFAULTS, options))
        },
        postForm: function(url, data, options) {
            var formName = "sb_post_form_";
            if (options && options.postActionName) {
                formName = formName + options.postActionName
            }
            var $form = $("<form>", {
                id: formName,
                name: formName,
                style: "display:none;",
                method: "POST",
                action: url
            });
            if (data) {
                for (var key in data) {
                    $form.append($("<input>", {
                        type: "hidden",
                        name: key,
                        value: data[key]
                    }))
                }
            }
            if (options && options.userIframe === true) {
                var iName = "sb_post_iframe_";
                if (options && options.postActionName) {
                    iName = iName + options.postActionName
                }
                var $iframe = $("<iframe>", {
                    id: iName,
                    name: iName,
                    style: "display:none;",
                    src: ""
                });
                $form.attr("target", iName);
                $(document.body).append($iframe).append($form)
            } else {
                $(document.body).append($form)
            }
            $form.submit()
        },
        clearPostForm: function(postActionName) {
            $("#sb_post_iframe_" + postActionName).remove();
            $("#sb_post_form_" + postActionName).remove()
        },
        post: function(url, data, success, error, complete) {
            if ($.isFunction(data)) {
                complete = error;
                error = success;
                success = data;
                data = {}
            }
            return SB.ajax({
                url: SB.contextPath + url,
                data: data,
                success: success,
                error: error,
                complete: complete
            })
        },
        post3: function(options) {
            var error, btn, showBusy = true, showBusyAfter = true, busyNode;
            if (options.errorNode) {
                error = options.errorNode
            } else {
                error = options.error
            }
            if (options.btnContainer) {
                btn = options.btnContainer
            } else {
                btn = options.btn
            }
            if (typeof (options.showBusy) == "boolean") {
                showBusy = options.showBusy
            }
            if (typeof (options.showBusyAfter) == "boolean") {
                showBusyAfter = options.showBusyAfter
            }
            if (options.busyNode) {
                busyNode = options.busyNode
            }
            return SB.post2(options.url, options.data, options.success, error, btn, showBusy, showBusyAfter, busyNode, options)
        },
        post2: function(url, data, success, error, btn, showBusy, showBusyAfter, busy, options) {
            var i18nUnknownError = SB.getI18nText("Unknown Error!", "common.unknown_error");
            var i18nError = SB.getI18nText("Error", "common.error");
            var submitButton = $(), errorNode;
            if (!$.isFunction(error)) {
                if (error && error.jquery) {
                    errorNode = error
                } else {
                    errorNode = $("#error_msg")
                }
                error = function(display, msg, erroCode) {
                    if (display) {
                        if (typeof (msg) === "undefined") {
                            msg = i18nUnknownError
                        }
                        if (options.containLink) {
                            errorNode.html(msg).show()
                        } else {
                            errorNode.text(msg).show()
                        }
                        if (options.errorCallBack && $.isFunction(options.errorCallBack)) {
                            options.errorCallBack(msg)
                        }
                    } else {
                        errorNode.empty().hide()
                    }
                }
            }
            if (btn) {
                btn = $(btn);
                if (btn.is("a") || btn.is("button") || btn.is("input") || btn.is("li")) {
                    submitButton = btn
                } else {
                    submitButton = btn.find("button[type=submit],input[type=submit],.submit")
                }
            }
            submitButton.disableBtn();
            if (showBusy) {
                if (busy) {
                    $(busy).show()
                } else {
                    if (showBusyAfter) {
                        submitButton.busy()
                    } else {
                        submitButton.busyBefore()
                    }
                }
            }
            error(false);
            return SB.ajax({
                url: SB.contextPath + url,
                data: data,
                dataType: options.dataType ? options.dataType : "json",
                headers: options.headers,
                crossDomain: options.crossDomain || false,
                xhrFields: options.xhrFields || {},
                success: function(response, textStatus, jqXHR) {
                    if (typeof (response.status) === "boolean") {
                        if (response.status) {
                            success(response, textStatus, jqXHR)
                        } else {
                            if (response.errorCode === 201) {
                                SB.jump("/signin")
                            } else {
                                error(true, response.errorMessage ? response.errorMessage : i18nUnknownError, response.errorCode)
                            }
                        }
                    } else {
                        if (response.error) {
                            error(true, response.error.message ? response.error.message : i18nUnknownError, response.errorCode)
                        } else {
                            success(response, textStatus, jqXHR)
                        }
                    }
                },
                error: function(jqXHR, textStatus, e) {
                    var message = e.message ? e.message : jqXHR ? ((textStatus ? textStatus : i18nError) + ": Http " + jqXHR.status + " " + jqXHR.statusText) : i18nUnknownError;
                    error(true, message)
                },
                complete: function(jqXHR, textStatus) {
                    if (options.preventComplete) {
                        return
                    }
                    submitButton.enableBtnDelay();
                    if (showBusy) {
                        if (busy) {
                            $(busy).hide()
                        } else {
                            if (showBusyAfter) {
                                submitButton.removeBusy()
                            } else {
                                submitButton.removeBusyBefore()
                            }
                        }
                    }
                    if (options.complete && $.isFunction(options.complete)) {
                        options.complete(jqXHR, textStatus)
                    }
                }
            })
        },
        buildUrl: function(url) {
            return SB.contextPath + url
        },
        initBtn: function(container) {
            if (!container) {
                container = window.body
            }
            $(".btn", container).click(function(event) {
                if ($(this).hasClass("disabled")) {
                    event.preventDefault();
                    event.stopImmediatePropagation()
                }
            })
        },
        toISOString: function(d) {
            function pad(n) {
                return n < 10 ? "0" + n : n
            }
            return d.getUTCFullYear() + "-" + pad(d.getUTCMonth() + 1) + "-" + pad(d.getUTCDate()) + "T" + pad(d.getUTCHours()) + ":" + pad(d.getUTCMinutes()) + ":" + pad(d.getUTCSeconds()) + "Z"
        },
        checkPlatform: function() {
            var platformCheck = $("#__platformCheck").val();
            if (platformCheck == "os" || platformCheck == "version") {
                SB.jump("/error/os");
                return false
            }
            return true
        },
        alert: function(msg, complete, containLink) {
            var i18nPrompt = SB.getI18nText("Prompt", "common.title.prompt");
            var i18nClose = SB.getI18nText("Close", "common.btn_close");
            var dialog = $('<div id="alert-dialog" class="modaldialog"><div class="modal-dialog"><div class="modal-content"><div class="modal-header clearfix"><button class="close simplemodal-close">&times;</button><h3>' + i18nPrompt + '</h3></div><div class="modal-body"><p></p></div><div class="modal-footer"><button class="btn btn-default simplemodal-close">' + i18nClose + "</button></div></div></div></div>");
            if (containLink) {
                dialog.find(".modal-body p").html(msg)
            } else {
                dialog.find(".modal-body p").text(msg)
            }
            $.modal(dialog, $.extend({}, MODAL_DEFAULTS, {
                overlayId: "alert-overlay",
                containerId: "alert-container",
                minHeight: 171,
                onClose: function(dialog) {
                    dialog.container.fadeOut("fast", function() {
                        dialog.overlay.fadeOut("fast", function() {
                            $.modal.close();
                            if ($.isFunction(complete)) {
                                setTimeout(function() {
                                    complete()
                                }, 10)
                            }
                        })
                    })
                }
            }))
        },
        alertWithOutTitle: function(msg, complete, containLink) {
            var i18nClose = SB.getI18nText("Close", "common.btn_close");
            var dialog = $('<div id="alert-dialog" class="modaldialog"><div class="modal-dialog"><div class="modal-content"><div class="modal-header clearfix"></div><div class="modal-body"><p></p></div><div class="modal-footer"><button class="btn btn-default simplemodal-close">' + i18nClose + "</button></div></div></div></div>");
            if (containLink) {
                dialog.find(".modal-body p").html(msg)
            } else {
                dialog.find(".modal-body p").text(msg)
            }
            $.modal(dialog, $.extend({}, MODAL_DEFAULTS, {
                overlayId: "alert-overlay",
                containerId: "alert-container",
                minHeight: 171,
                onClose: function(dialog) {
                    dialog.container.fadeOut("fast", function() {
                        dialog.overlay.fadeOut("fast", function() {
                            $.modal.close();
                            if (typeof complete === "function") {
                                setTimeout(function() {
                                    complete()
                                }, 10)
                            }
                        })
                    })
                }
            }))
        },
        confirm: function(options) {
            var msg, yes, no, minHeight = 171, beforeRender, buttonFocus;
            var yesText = SB.getI18nText("Yes", "common.btn_yes");
            var noText = SB.getI18nText("No", "common.btn_no");
            var i18nConfirmation = SB.getI18nText("Confirmation", "common.title.confirmation");
            var customerCss = "";
            if (typeof (options) === "string") {
                msg = arguments[0];
                yes = arguments[1];
                no = arguments[2];
                buttonFocus = arguments[3] ? arguments[3] : ""
            } else {
                msg = options.msg;
                yes = options.yes;
                no = options.no;
                buttonFocus = options.buttonFocus || "";
                if (options.yesText) {
                    yesText = options.yesText
                }
                if (options.noText) {
                    noText = options.noText
                }
                if (options.minHeight) {
                    minHeight = options.minHeight
                }
                if (options.beforeRender) {
                    beforeRender = options.beforeRender
                }
                if (options.confirmation) {
                    i18nConfirmation = options.confirmation
                }
                if (options.css) {
                    customerCss = options.css
                }
            }
            var dialog = $('<div id="confirm-dialog" class="modaldialog ' + customerCss + ' "><div class="modal-dialog"><div class="modal-content"><div class="modal-header clearfix"><button class="close simplemodal-close">&times;</button><h3 tabindex="-1" style="display: inline-block">' + i18nConfirmation + '</h3></div><div class="modal-body"><p></p></div><div class="modal-footer"><a role="button" href="javascript:;" class="btn btn-primary yes">' + yesText + '</a><a role="button" href="javascript:;" class="btn btn-default simplemodal-close no">' + noText + "</a></div></div></div></div>");
            dialog.find(".modal-body p").html(msg);
            if (beforeRender) {
                beforeRender(dialog)
            }
            var bYes = false;
            $.modal(dialog, $.extend({}, MODAL_DEFAULTS, {
                overlayId: "confirm-overlay",
                containerId: "confirm-container",
                minHeight: minHeight,
                onShow: function(dialog) {
                    dialog.data.find("a.yes").click(function() {
                        bYes = true;
                        $.modal.close()
                    });
                    setTimeout(function() {
                        $("#confirm-dialog .modal-header>h3").focus()
                    }, 300)
                },
                onClose: function(dialog) {
                    dialog.container.fadeOut("fast", function() {
                        dialog.overlay.fadeOut("fast", function() {
                            if (bYes) {
                                if ($.isFunction(yes)) {
                                    yes()
                                }
                            } else {
                                if ($.isFunction(no)) {
                                    no()
                                }
                            }
                            $.modal.close();
                            console.log(buttonFocus);
                            console.log($(buttonFocus));
                            if (buttonFocus) {
                                setTimeout(function() {
                                    $(buttonFocus).focus()
                                })
                            }
                        })
                    })
                }
            }))
        },
        replaceUrl: function(reg, withStr, originalUrl) {
            if (typeof (originalUrl) == "undefined") {
                originalUrl = window.location.href
            }
            var modifiedUrl = originalUrl;
            if (reg.test(originalUrl)) {
                modifiedUrl = originalUrl.replace(reg, withStr)
            } else {
                if (originalUrl.indexOf("?") >= 0) {
                    modifiedUrl = originalUrl + "&" + withStr
                } else {
                    modifiedUrl = originalUrl + "?" + withStr
                }
            }
            return modifiedUrl
        },
        saveSuccessCookie: function(methodName, param1, param2, param3) {
            $.cookie("__lsc", JSON.stringify(arguments), {
                path: "/"
            })
        },
        getSuccessCookie: function(keepSuccessCookie) {
            var cookieValue = $.cookie("__lsc");
            if (typeof (cookieValue) !== "undefined") {
                if (!keepSuccessCookie) {
                    SB.clearSuccessCookie()
                }
                return JSON.parse(cookieValue)
            }
            return null
        },
        clearSuccessCookie: function() {
            $.cookie("__lsc", null, {
                path: "/"
            })
        },
        showSuccessMsg: function(msg, msgNode, milliseconds, isHtml) {
            isHtml = isHtml || false;
            msgNode = msgNode || $("#content_success_msg");
            milliseconds = milliseconds || 5000;
            if (isHtml) {
                msgNode.html(msg)
            } else {
                msgNode.text(msg)
            }
            if (msgNode[0] === $("#content_success_msg")[0]) {
                msgNode.css("margin-left", -msgNode.width() / 2)
            }
            if (SB.showSuccessTimer) {
                window.clearTimeout(SB.showSuccessTimer)
            }
            msgNode.fadeIn("slow");
            SB.showSuccessTimer = window.setTimeout(function() {
                msgNode.fadeOut("slow")
            }, milliseconds)
        },
        validatePassword: function(passInput, nodeId) {
            var pass = passInput.val();
            var plen = pass.length;
            var ls = 0, score = 0, upperCase, lowerCase, digits, nonAlpha;
            if (plen < 6) {
                score += 0
            } else {
                if (plen < 8) {
                    score += 5
                } else {
                    if (plen < 16) {
                        score += 10
                    } else {
                        score += 15
                    }
                }
                lowerCase = pass.match(/[a-z]/g);
                if (lowerCase) {
                    score += 1
                }
                upperCase = pass.match(/[A-Z]/g);
                if (upperCase) {
                    score += 5
                }
                if (upperCase && lowerCase) {
                    score += 2
                }
                digits = pass.match(/\d/g);
                if (digits && digits.length > 1) {
                    score += 5
                }
                nonAlpha = pass.match(/\W/g);
                if (nonAlpha) {
                    score += (nonAlpha.length > 1) ? 15 : 10
                }
                if (upperCase && lowerCase && digits && nonAlpha) {
                    score += 15
                }
                if (pass.match(/\s/)) {
                    score += 10
                }
            }
            if (score > 1 && score < 15) {
                ls = 1
            }
            if (score >= 15 && score < 20) {
                ls = 2
            }
            if (score >= 20 && score < 35) {
                ls = 3
            }
            if (score >= 35) {
                ls = 4
            }
            var simple = SB.isOrderlyString(pass) || SB.isSameString(pass);
            if (ls > 0 && !simple) {
                nodeId.find("span").css({
                    "background-color": "transparent"
                });
                for (var j = 1; j <= ls; j++) {
                    nodeId.find("#meter" + j).css({
                        "background-color": "rgb(74, 232, 23)"
                    })
                }
            } else {
                nodeId.find("span").css({
                    "background-color": "transparent"
                });
                nodeId.find("#meter1").css({
                    "background-color": "red"
                })
            }
        },
        validateOneRepeatRule: function(passInput, nodeId) {
            var pass = passInput.val();
            if (SB.isSameString(pass)) {
                nodeId.removeClass("success").addClass("error")
            } else {
                nodeId.removeClass("error").addClass("success")
            }
        },
        validateConsecutiveRule: function(passInput, nodeId) {
            var pass = passInput.val();
            if (SB.isOrderlyString(pass)) {
                nodeId.removeClass("success").addClass("error")
            } else {
                nodeId.removeClass("error").addClass("success")
            }
        },
        validateLengthRule: function(passInput, nodeId, length) {
            var pass = passInput.val();
            var plen = pass.length;
            if (plen < length) {
                nodeId.removeClass("success").addClass("error");
                return false
            } else {
                nodeId.removeClass("error").addClass("success");
                return true
            }
        },
        validateNewConsecutiveRule: function(passInput, nodeId, length, ignoreCase) {
            var KEYBOARD_HORIZONTAL_ARR = ["qwertyuiop", "asdfghjkl", "zxcvbnm", "!@#$%^&*()", "01234567890"];
            var isConsecutiveString = function(str, len, ignoreCase) {
                if (ignoreCase) {
                    str = str.toLowerCase()
                }
                var strLen = str.length;
                len = parseInt(len);
                var sameCount, orderCount, reversedCount;
                for (var i = 0; i + len <= strLen; i++) {
                    sameCount = 0;
                    orderCount = 0;
                    reversedCount = 0;
                    for (var j = 0; j < len - 1; j++) {
                        if (str.charCodeAt(i + j) == str.charCodeAt(i + j + 1)) {
                            sameCount++;
                            if (sameCount == len - 1) {
                                return true
                            }
                        }
                        if (str.charCodeAt(i + j + 1) - str.charCodeAt(i + j) == 1) {
                            orderCount++;
                            if (orderCount == len - 1) {
                                return true
                            }
                        }
                        if (str.charCodeAt(i + j) - str.charCodeAt(i + j + 1) == 1) {
                            reversedCount++;
                            if (reversedCount == len - 1) {
                                return true
                            }
                        }
                    }
                    if (checkKeyboard(str.substring(i, i + len))) {
                        return true
                    }
                }
                return false
            };
            function checkKeyboard(str) {
                for (var i = 0; i < KEYBOARD_HORIZONTAL_ARR.length; i++) {
                    var arr = KEYBOARD_HORIZONTAL_ARR[i];
                    if (arr.indexOf(str) != -1) {
                        return true
                    }
                }
                return false
            }
            var pass = passInput.val();
            var result = isConsecutiveString(pass, length, ignoreCase);
            if (result) {
                nodeId.removeClass("success").addClass("error");
                return false
            } else {
                nodeId.removeClass("error").addClass("success");
                return true
            }
        },
        validateAlpabetRule: function(passInput, nodeId) {
            var pass = passInput.val();
            if (!pass.match(/[a-zA-Z]/g)) {
                nodeId.removeClass("success").addClass("error");
                return false
            } else {
                nodeId.removeClass("error").addClass("success");
                return true
            }
        },
        validateOnlyNumberRule: function(passInput, nodeId) {
            var pass = passInput.val();
            if (!pass || !pass.match(/^([0-9]+)$/)) {
                nodeId.removeClass("success").addClass("error");
                return false
            } else {
                nodeId.removeClass("error").addClass("success");
                return true
            }
        },
        validateNumberRule: function(passInput, nodeId) {
            var pass = passInput.val();
            if (!pass.match(/\d/g)) {
                nodeId.removeClass("success").addClass("error");
                return false
            } else {
                nodeId.removeClass("error").addClass("success");
                return true
            }
        },
        validateSpeicalRule: function(passInput, nodeId) {
            var pass = passInput.val();
            if (/^([a-zA-Z0-9]{1,})$/.test(pass) || (pass == "")) {
                nodeId.removeClass("success").addClass("error");
                return false
            } else {
                nodeId.removeClass("error").addClass("success");
                return true
            }
        },
        validateSpecialRule: function(passInput, nodeId) {
            var pass = passInput.val();
            if (!pass.match(/[!@#$%^&*.?_\-+=<>()[\]{},'"/\\|:;~`]/g)) {
                nodeId.removeClass("success").addClass("error");
                return false
            } else {
                nodeId.removeClass("error").addClass("success");
                return true
            }
        },
        validateCombineRule: function(passInput, nodeId) {
            var pass = passInput.val();
            if (pass.match(/[a-z]/g) && pass.match(/[A-Z]/g)) {
                nodeId.removeClass("error").addClass("success");
                return true
            } else {
                nodeId.removeClass("success").addClass("error");
                return false
            }
        },
        isOrderlyString: function(str) {
            var re = true;
            for (var i = 0; i < str.length - 1; i++) {
                var cVal = str.charCodeAt(i);
                var nVal = str.charCodeAt(i + 1);
                if (isNaN(nVal) || isNaN(cVal)) {
                    continue
                } else {
                    if (Math.abs(cVal - nVal) != 1 || cVal == 47 || cVal == 57 || cVal == 64 || cVal == 90 || cVal == 96 || cVal > 122) {
                        re = false;
                        break
                    }
                }
            }
            return re
        },
        isSameString: function(str) {
            var re = true;
            for (var i = 0; i < str.length - 1; i++) {
                var cVal = str.charCodeAt(i);
                var nVal = str.charCodeAt(i + 1);
                if (isNaN(nVal) || isNaN(cVal)) {
                    continue
                } else {
                    if (Math.abs(cVal - nVal) != 0) {
                        re = false;
                        break
                    }
                }
            }
            return re
        },
        formatCurrency: function(val) {
            var prefix = "$";
            if (val < 0) {
                val = 0 - val;
                prefix = "-$"
            }
            return prefix + (val / 100).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,")
        },
        formatNumber: function(val) {
            return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
        },
        htmlEncode: function(value) {
            return $("<div/>").text(value).html()
        },
        htmlDecode: function(value) {
            return $("<div/>").html(value).text()
        },
        hideHeader: function() {
            $("#header_container").hide();
            $("#content_container").removeClass("zoom-newcontent")
        },
        formatConfNo: function(confNo, fmtChar, maxLen) {
            fmtChar = fmtChar || " ";
            maxLen = maxLen || 11;
            confNo = $.trim(confNo).replace(/[^\d]/g, "");
            if (confNo.length > maxLen) {
                confNo = confNo.substr(0, maxLen)
            }
            var result = confNo.substr(0, 3);
            if (confNo.length == 11) {
                result += fmtChar + confNo.substr(3, 4) + fmtChar + confNo.substr(7)
            } else {
                if (confNo.length >= 3) {
                    result += fmtChar + confNo.substr(3, 3)
                }
                if (confNo.length >= 6) {
                    result += fmtChar + confNo.substr(6)
                }
            }
            return result
        },
        initConfInput: function(input, error, fmtChar, maxLen) {
            maxLen = maxLen || 11;
            var confNo = input.attr("confno");
            if (confNo) {
                input.val(SB.formatConfNo(confNo, fmtChar, maxLen))
            }
            input.keyup(function(e) {
                var el = $(this);
                var oval = el.val();
                if (oval.length > 0) {
                    window.setTimeout(function() {
                        var caretPos = el.caret();
                        var nval = SB.formatConfNo(oval, fmtChar, maxLen);
                        if (caretPos === 3 || caretPos === 7) {
                            if (e.keyCode == 8) {
                                caretPos--;
                                nval = SB.formatConfNo(nval.substr(0, caretPos) + nval.substr(caretPos + 2), fmtChar, maxLen)
                            } else {
                                caretPos++
                            }
                        }
                        if (oval !== nval) {
                            if (error) {
                                error.hide()
                            }
                            el.removeClass("error");
                            el.val(nval);
                            el.caret(caretPos)
                        }
                    }, 10)
                }
                return false
            }).keypress(function(e) {
                if (e.ctrlKey || e.altKey || e.metaKey || e.which < 32) {
                    return true
                }
                if (e.keyCode == 8 || e.keyCode == 46 || e.keyCode == 35 || e.keyCode == 36 || e.keyCode == 37 || e.keyCode == 39 || e.keyCode == 144) {
                    return true
                }
                if (!/[0-9]/.test(String.fromCharCode(e.which))) {
                    return false
                }
                var el = $(this);
                var caretPos = el.caret();
                var val = el.val();
                if (val.length === maxLen + 2 && caretPos === maxLen + 2) {
                    return false
                }
            })
        },
        isDigit: function(c) {
            return (c >= "0" && c <= "9")
        },
        initNoAndUrlInput: function(input, error) {
            var maxLen = 11;
            var fmtChar = " ";
            input.keyup(function(e) {
                var el = $(this);
                var oval = el.val();
                if (oval.length > 0) {
                    if (SB.isDigit(oval.charAt(0))) {
                        window.setTimeout(function() {
                            var caretPos = el.caret();
                            var nval = SB.formatConfNo(oval, fmtChar, maxLen);
                            if (caretPos === 3 || caretPos === 7) {
                                if (e.keyCode == 8) {
                                    caretPos--;
                                    nval = SB.formatConfNo(nval.substr(0, caretPos) + nval.substr(caretPos + 2), fmtChar, maxLen)
                                } else {
                                    caretPos++
                                }
                            }
                            if (oval !== nval) {
                                if (error) {
                                    error.hide()
                                }
                                el.removeClass("error");
                                el.val(nval);
                                el.caret(caretPos)
                            }
                        }, 10)
                    } else {
                        var nval = $.trim(oval).replace(/^\./, "").replace(/[^A-Za-z0-9\.]/g, "").toLowerCase();
                        if (error) {
                            error.hide()
                        }
                        el.removeClass("error");
                        if (oval !== nval) {
                            el.val(nval)
                        }
                    }
                    return false
                }
            }).keypress(function(e) {
                if (e.ctrlKey || e.altKey || e.metaKey || e.which < 32) {
                    return true
                }
                if (e.keyCode == 8 || e.keyCode == 46 || e.keyCode == 35 || e.keyCode == 36 || e.keyCode == 37 || e.keyCode == 39 || e.keyCode == 144) {
                    return true
                }
                var el = $(this);
                var caretPos = el.caret();
                var val = el.val();
                if (val.length == 0 || !SB.isDigit(val.charAt(0))) {
                    if (!/[A-Za-z0-9\.]/.test(String.fromCharCode(e.which))) {
                        return false
                    }
                } else {
                    if (!/[0-9]/.test(String.fromCharCode(e.which))) {
                        return false
                    }
                    if (val.length === maxLen + 2 && caretPos === maxLen + 2) {
                        return false
                    }
                }
            })
        },
        initLimitInput: function(input, limitRgx, error, lowercase) {
            input.keyup(function(e) {
                if (e.ctrlKey || e.altKey || e.metaKey || e.which < 32) {
                    return true
                }
                if (e.keyCode == 8 || e.keyCode == 46 || e.keyCode == 35 || e.keyCode == 36 || e.keyCode == 37 || e.keyCode == 39 || e.keyCode == 144 || e.keyCode == 38 || e.keyCode == 40) {
                    return true
                }
                var el = $(this);
                var oval = el.val();
                if (oval.length > 0) {
                    window.setTimeout(function() {
                        var caretPos = el.caret();
                        if (e.keyCode == 8) {
                            caretPos--
                        }
                        var nval = $.trim(oval).replace(limitRgx, "").toLowerCase();
                        if (lowercase) {
                            nval = nval.toLowerCase()
                        }
                        el.val(nval);
                        el.caret(caretPos)
                    }, 10)
                }
                if (error) {
                    error.hide()
                }
                input.removeClass("error");
                return true
            })
        },
        playVideo: function(videoUrl, title, href) {
            var videoDialog = $("#video_dialog");
            var header = videoDialog.find(".modal-header .modal-title");
            videoDialog.find(".modal-body-container").html('<div class="youtube-video-container"><iframe src="' + videoUrl + '" frameborder="0" title="Video Frame" allowfullscreen></iframe></div>');
            if (title && href) {
                header.html('<a href="' + href + '" target="_blank">' + title + "</a>")
            } else {
                if (title) {
                    header.html(title)
                } else {
                    header.html("")
                }
            }
            $.modal(videoDialog, $.extend({}, SB.MODAL_DEFAULTS, {
                overlayId: "video-dialog-overlay",
                containerId: "video-dialog-container",
                persist: true,
                minHeight: videoDialog.outerHeight(),
                overlayClose: true,
                onShow: function() {},
                onClose: function() {
                    $.modal.close();
                    videoDialog.find(".modal-body-container").html("")
                }
            }))
        },
        isNotValidPicFile: function(file, errorFun, sizeLimit, formatLimt) {
            var errCode = 0;
            var result = false;
            formatLimt = formatLimt || /.*\.(gif|jpe?g|png)$/i;
            sizeLimit = sizeLimit || 2 * 1024 * 1024;
            if (!formatLimt.test(file.name)) {
                errCode = 1;
                result = true
            }
            if ((file.size && file.size > sizeLimit)) {
                errCode = 2;
                result = true
            }
            errorFun(errCode, sizeLimit);
            return result
        },
        isNotValidAudioFile: function(file, errorFun, sizeLimit, formatLimt) {
            var errCode = 0;
            var result = false;
            formatLimt = formatLimt || /.*\.wav$/i;
            sizeLimit = sizeLimit || 2 * 1024 * 1024;
            if (!formatLimt.test(file.name)) {
                errCode = 1;
                result = true
            }
            if ((file.size && file.size > sizeLimit)) {
                errCode = 2;
                result = true
            }
            errorFun(errCode, sizeLimit);
            return result
        },
        sendJMF: function(mtgNumber, mtgId, reqId, reason, msg) {
            var data = {
                mn: mtgNumber,
                mi: mtgId,
                reason: reason,
                msg: msg,
                ua: navigator.userAgent,
                ff: window.top !== window
            };
            SB.post("/wjmf", data, function(response) {})
        },
        getI18nText: function(defaultText, resourceKey, resourceParameter) {
            if (typeof $.i18n == "undefined") {
                return !!defaultText ? defaultText : resourceKey
            }
            var i18nText = $.i18n.get(resourceKey, resourceParameter);
            if (!!i18nText) {
                if (i18nText != resourceKey) {
                    return i18nText
                }
            }
            return !!defaultText ? defaultText : resourceKey
        },
        showPastDueMessage: function() {
        },
        sendUserBehavior: function(htmlObj) {
            var data = {};
            if (htmlObj != null) {
                data = {
                    html_object_id: htmlObj.attr("tracking-id") || htmlObj.prop("id"),
                    html_object_category: htmlObj.attr("tracking-category") || "",
                    html_class: htmlObj.prop("class")
                }
            }
            if (data.html_object_id) {
                SB.post("/sendUserBehavior", data, function() {}, function() {}, function() {})
            }
        },
        getFirstLanguage: function() {
            var nav = window.navigator, browserLanguagePropertyKeys = ["language", "browserLanguage", "systemLanguage", "userLanguage"], i, language = null;
            if ($.isArray(nav.languages)) {
                for (i = 0; i < nav.languages.length; i++) {
                    language = nav.languages[i];
                    if (language && language.indexOf("-") != -1) {
                        return language
                    }
                }
            }
            for (i = 0; i < browserLanguagePropertyKeys.length; i++) {
                language = nav[browserLanguagePropertyKeys[i]];
                if (language && language.indexOf("-") != -1) {
                    return language
                }
            }
            if (language == null) {
                return "en-US"
            }
        },
        getDefCountry: function() {
            var country = "US";
            var code = SB.getFirstLanguage();
            if (code && code.indexOf("-") > 0) {
                country = code.split("-")[1]
            }
            return country.toUpperCase()
        },
        getDefLanguage: function() {
            var language = "en";
            var code = SB.getFirstLanguage();
            if (code && code.indexOf("-") > 0) {
                language = code.split("-")[0]
            }
            return language
        },
        sortObject: function(attribute) {
            return function(o, p) {
                var a, b;
                if (typeof o === "object" && typeof p === "object" && o && p) {
                    a = o[attribute];
                    b = p[attribute];
                    if (a === b) {
                        return 0
                    }
                    if (typeof a === typeof b) {
                        return a < b ? -1 : 1
                    }
                    return typeof a < typeof b ? -1 : 1
                } else {
                    return 0
                }
            }
        },
        loadScript: function(url, callback) {
            var script = document.createElement("script");
            script.type = "text/javascript";
            if (script.readyState) {
                script.onreadystatechange = function() {
                    if (script.readyState == "loaded" || script.readyState == "complete") {
                        script.onreadystatechange = null;
                        if (typeof callback === "function") {
                            callback()
                        }
                    }
                }
            } else {
                script.onload = function() {
                    if (typeof callback === "function") {
                        callback()
                    }
                }
            }
            script.src = url;
            document.getElementsByTagName("head")[0].appendChild(script)
        },
        sendSearchEmailCookie: function(value) {
            $.cookie("zm_search_key", value, {
                path: "/",
                secure: true
            })
        },
        xss: function(val) {
            val = val.toString();
            val = val.replace(/</g, "&lt;");
            val = val.replace(/>/g, "&gt;");
            val = val.replace(/ /g, "&nbsp;");
            val = val.replace(/"/g, "&quot;");
            val = val.replace(/'/g, "&#39;");
            val = val.replace(/&lt;\/br&gt;/g, "</br>");
            return val
        },
        getQueryString: function(name) {
            var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
            var r = window.location.search.substr(1).match(reg);
            if (r != null) {
                return decodeURIComponent(r[2])
            }
            return null
        }
    });
    $.validator.setDefaults({
        errorClass: "help-block",
        errorElement: "span",
        errorClass: "has-error",
        highlight: function(input, errorClass) {
            $(input).parents("div.form-group").addClass("has-error")
        },
        unhighlight: function(input, errorClass) {
            $(input).parents("div.form-group").removeClass("has-error")
        },
        errorPlacement: function(error, input) {
            error.addClass("help-block").insertAfter(input);
            error.attr("role", "alert").attr("aria-live", "assertive")
        }
    });
    jQuery.validator.addMethod("time12hNB", function(value, element) {
        return this.optional(element) || /^((0?[1-9]|1[012])(:[0-5]\d){1,2})$/i.test(value)
    }, function() {
        return SB.getI18nText("Please enter a valid time in 12-hour", "common.enter_time_in_12_hour")
    });
    $.fn.busy = function() {
        return this.each(function() {
            var n = $(this).next();
            if (!n.is("i.busy")) {
                $(this).after('<i class="busy busy24"></i>')
            }
        })
    }
    ;
    $.fn.removeBusy = function() {
        return this.each(function() {
            var n = $(this).next();
            if (n.is("i.busy")) {
                n.remove()
            }
        })
    }
    ;
    $.fn.busyBefore = function() {
        return this.each(function() {
            var n = $(this).prev();
            if (!n.is("i.busy")) {
                $(this).before('<i class="busy busy24"></i>')
            }
        })
    }
    ;
    $.fn.removeBusyBefore = function() {
        return this.each(function() {
            var n = $(this).prev();
            if (n.is("i.busy")) {
                n.remove()
            }
        })
    }
    ;
    $.fn.disableBtn = function() {
        return this.each(function() {
            $(this).addClass("disabled").attr("disabled", "disabled")
        })
    }
    ;
    $.fn.enableBtn = function() {
        return this.each(function() {
            var $this = $(this);
            $this.removeClass("disabled").removeAttr("disabled")
        })
    }
    ;
    $.fn.enableBtnDelay = function() {
        return this.each(function() {
            var $this = $(this);
            window.setTimeout(function() {
                $this.enableBtn()
            }, 3000)
        })
    }
    ;
    $(function() {
        $("[placeholder]").placeholder();
        if (typeof ga == "undefined") {
            ga = function() {}
        }
        function jsGuid() {
            return "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx".replace(/[xy]/g, function(c) {
                var r = Math.random() * 16 | 0
                  , v = c == "x" ? r : (r & 3 | 8);
                return v.toString(16)
            })
        }
        $(".home-video-link").click(function(event) {
            var $this = $(this);
            var videoHref = $this.attr("href");
            SB.playVideo(videoHref);
            event.preventDefault()
        });
        SB.initBtn();
        $("form .submit").click(function() {
            if (!$(this).hasClass("disabled")) {
                $(this).parents("form").submit()
            }
            return false
        });
        $("#btnProfile").click(function() {
            window.open(SB.baseUrl + "/profile")
        });
        $("#btnLogout").click(function() {
            if (!SB.loggedIn) {
                return
            }
            if (SB.stype == 101) {
                SB.jump("/saml/logout")
            } else {
                SB.jump("/logout")
            }
        });
        $("#btnOauth2NotMe").click(function() {
            if (!SB.loggedIn) {
                return
            }
            if (SB.stype == 101) {
                SB.jump("/saml/logout")
            } else {
                SB.jump("/logout?type=notme")
            }
        });
        $("#btnDevLogout").click(function() {
            if (!SB.loggedIn) {
                return
            }
            if (SB.stype == 101) {
                SB.jump("/saml/logout")
            } else {
                SB.jump("/developer/logout")
            }
        });
        $("#footerDownload").click(function() {
            if (!SB.checkPlatform()) {
                return false
            }
        });
        function evalInputNameFun(functionName) {
            if (typeof functionName != undefined && functionName !== "") {
                if (/^([a-zA-Z0-9-_]{1,})$/.test(functionName)) {
                    eval(functionName)()
                } else {
                    console.warn("prevent dangeous fun:" + functionName)
                }
            }
        }
        $(".adv-pagination input[name=page_input]").keypress(function(event) {
            var $this = $(this);
            if (event.which === 13) {
                var page = parseInt($this.val());
                if (!isNaN(page) && page > 0) {
                    var total = parseInt($this.attr("data-total"));
                    if (page > total) {
                        page = total
                    }
                    $this.val(page);
                    var preHandlerName = $(".adv-pagination").data("prehandler");
                    evalInputNameFun(preHandlerName);
                    window.location.href = SB.replaceUrl(/p=\d+/ig, "p=" + page)
                }
                event.preventDefault()
            } else {
                if (!(event.which === 8 || event.which === 0 || (event.shiftKey === false && (event.which > 47 && event.which < 58)))) {
                    event.preventDefault()
                }
            }
        });
        $(".adv-pagination ul").delegate("a", "click", function() {
            var li = $(this).parent();
            if (li.hasClass("disabled") || li.hasClass("active")) {
                return false
            }
            var page = parseInt($(this).attr("p"), 10);
            var preHandlerName = $(".adv-pagination").data("prehandler");
            evalInputNameFun(preHandlerName);
            window.location.href = SB.replaceUrl(/p=\d+/ig, "p=" + page);
            return false
        });
        function pageSizeChange($this) {
            var val = $this.val();
            var cookieName = $this.data("cookie");
            $.cookie(cookieName, val, {
                expires: 365,
                path: "/"
            });
            location.reload(true)
        }
        $(".adv-pagination input[name=page_size_input]").each(function() {
            var $this = $(this);
            new ComboBox($this.attr("id"),{
                onChange: function() {
                    pageSizeChange($this)
                }
            });
            $this.change(function() {
                pageSizeChange($this)
            })
        });
        $("body").delegate("[ui-cmd]", "click", function() {
            var $this = $(this);
            if (!$this.hasClass("disabled") && !$this.data("ui-cmd-sending")) {
                var nodeId = $this.attr("ui-cmd");
                var cat = $this.attr("ui-cat");
                SB.post("/wlog", {
                    node: nodeId,
                    cat: cat
                }, function(data) {});
                $this.data("ui-cmd-sending", 1);
                window.setTimeout(function() {
                    $this.removeData("ui-cmd-sending")
                }, 5000)
            }
        });
        if ($("#navbar ul.navbar-right").length > 0) {
            $("#navbar ul.navbar-right").append($("#header_outer #header_login>ul").children())
        } else {
            $("#header_login").removeClass("hideme").show()
        }
        var activeProfileItemIndex = -1;
        var profileMenu = $("#profile-menu");
        $("#pic > a").off("click").on("click", function(event) {
            var parentObj = $(this).closest("#pic");
            if (parentObj.hasClass("show-profile-menu")) {
                parentObj.removeClass("show-profile-menu").find("a.profile-pic").attr("aria-expanded", false)
            } else {
                parentObj.addClass("show-profile-menu").find("a.profile-pic").attr("aria-expanded", true);
                $("#profile-menu").focus();
                event.preventDefault();
                activeProfileItemIndex = -1
            }
        });
        profileMenu.off("keydown").on("keydown", function(event) {
            var menuLength = profileMenu.find("a").length;
            if (event.keyCode == 40 || event.keyCode == 39) {
                activeProfileItemIndex++;
                if (activeProfileItemIndex >= menuLength) {
                    activeProfileItemIndex = 0
                }
                event.stopPropagation();
                setProfileActiveItem(activeProfileItemIndex);
                return false
            } else {
                if (event.keyCode == 38 || event.keyCode == 37) {
                    activeProfileItemIndex--;
                    if (activeProfileItemIndex <= -1) {
                        activeProfileItemIndex = menuLength - 1
                    }
                    event.stopPropagation();
                    setProfileActiveItem(activeProfileItemIndex);
                    return false
                } else {
                    if (event.keyCode == 27) {
                        activeProfileItemIndex = -1;
                        $("#pic > a").focus();
                        $("#pic").removeClass("show-profile-menu").find("a.profile-pic").attr("aria-expanded", true);
                        setProfileActiveItem(activeProfileItemIndex);
                        return false
                    } else {
                        if (event.keyCode == 32 || event.keyCode == 13) {
                            if (activeProfileItemIndex != -1) {
                                var target = profileMenu.find(".avator-menu-item").eq(activeProfileItemIndex);
                                if (target.is($("#btnLogout"))) {
                                    target.click()
                                } else {
                                    location.href = target.attr("href")
                                }
                            }
                        }
                    }
                }
            }
            return false
        });
        function setProfileActiveItem(index) {
            if (index !== -1) {
                var target = profileMenu.find(".avator-menu-item").eq(index);
                target.addClass("hover").siblings(".avator-menu-item").removeClass("hover");
                profileMenu.attr("aria-activedescendant", target.attr("id"))
            } else {
                profileMenu.find(".avator-menu-item").removeClass("hover")
            }
        }
        $(document).on("click", function(event) {
            if (!$(event.target).is($("#pic > a")) && $("#pic").hasClass("show-profile-menu") && !$.contains($("#pic").get(0), event.target)) {
                $("#pic").removeClass("show-profile-menu")
            }
        });
        var sidenav = $("ul.zm-sidenav");
        var sidemenu = $(".sidebar-menu a>span");
        sidemenu.text(sidenav.find("li.active a").text().trim());
        var category = $(".category .itext");
        category.text(category.parents(".category").find("li.active a").text().trim());
        var btnHost = $("#btnHostMeeting");
        var btnMutipleJoin = $("#btnMutipleJoinMeeting");
        var btnSol = $("#btnSolutions");
        var dropdownSol = $("#solutionsDropdown");
        var btnRes = $("#btnResouces");
        var dropdownRes = $("#resourcesDropdown");
        var dropdownMenu = $("#hostMeetingDropdown");
        var dropdownMenu4join = $("#joinmeetingDropdown");
        $("#scheduleMtg").on("click", function() {
            var url = $("#start_url").val();
            window.location.href = url
        });
        if (dropdownMenu.length && !("ontouchstart"in document.documentElement)) {
            var mousePos = {
                x: 0,
                y: 0
            };
            $(document).mousemove(function(event) {
                mousePos.x = event.pageX;
                mousePos.y = event.pageY
            });
            function mouseInside(target) {
                var offset = target.offset();
                if (mousePos.x > offset.left && mousePos.x < offset.left + target.outerWidth() && mousePos.y > offset.top && mousePos.y < offset.top + target.outerHeight()) {
                    return true
                }
                return false
            }
            function closeDropdownIf(btn, drp) {
                window.setTimeout(function() {
                    if (mouseInside(btn) || mouseInside(drp)) {
                        return
                    }
                    btn.parent().removeClass("open")
                }, 500)
            }
            function closeImmediatenIf(btn) {
                btn.parent().removeClass("open")
            }
            btnHost.hover(function() {
                closeImmediatenIf(btnMutipleJoin);
                btnHost.parent().addClass("open");
                $("#pic").removeClass("show-profile-menu")
            }, function() {
                closeDropdownIf(btnHost, dropdownMenu)
            });
            btnMutipleJoin.hover(function() {
                closeImmediatenIf(btnHost);
                btnMutipleJoin.parent().addClass("open")
            }, function() {
                closeDropdownIf(btnMutipleJoin, dropdownMenu4join)
            });
            dropdownMenu.mouseleave(function() {
                closeDropdownIf(btnHost, dropdownMenu)
            });
            dropdownMenu4join.mouseleave(function() {
                closeDropdownIf(btnMutipleJoin, dropdownMenu4join)
            })
        }
        if (dropdownSol.length && !("ontouchstart"in document.documentElement)) {
            var mousePos = {
                x: 0,
                y: 0
            };
            $(document).mousemove(function(event) {
                mousePos.x = event.pageX;
                mousePos.y = event.pageY
            });
            function mouseInside(target) {
                var offset = target.offset();
                if (mousePos.x > offset.left && mousePos.x < offset.left + target.outerWidth() && mousePos.y > offset.top && mousePos.y < offset.top + target.outerHeight()) {
                    return true
                }
                return false
            }
            function closeDropdownIf() {
                window.setTimeout(function() {
                    if (mouseInside(btnSol) || mouseInside(dropdownSol)) {
                        return
                    }
                    btnSol.parent().removeClass("open")
                }, 500)
            }
            btnSol.hover(function() {
                btnSol.parent().addClass("open")
            }, function() {
                closeDropdownIf()
            });
            dropdownSol.mouseleave(function() {
                closeDropdownIf()
            })
        }
        if (dropdownRes.length && !("ontouchstart"in document.documentElement)) {
            var mousePos = {
                x: 0,
                y: 0
            };
            $(document).mousemove(function(event) {
                mousePos.x = event.pageX;
                mousePos.y = event.pageY
            });
            function mouseInside(target) {
                var offset = target.offset();
                if (mousePos.x > offset.left && mousePos.x < offset.left + target.outerWidth() && mousePos.y > offset.top && mousePos.y < offset.top + target.outerHeight()) {
                    return true
                }
                return false
            }
            function closeDropdownIf() {
                window.setTimeout(function() {
                    if (mouseInside(btnRes) || mouseInside(dropdownRes)) {
                        return
                    }
                    btnRes.parent().removeClass("open")
                }, 500)
            }
            btnRes.hover(function() {
                btnRes.parent().addClass("open")
            }, function() {
                closeDropdownIf()
            });
            dropdownRes.mouseleave(function() {
                closeDropdownIf()
            })
        }
        var langDPMenu = $("div.lanuages");
        langDPMenu.delegate("a", "click", function() {
            var self = $(this);
            $.cookie("_zm_lang", self.attr("data-lang"), {
                expires: 365,
                path: "/",
                domain: cookieDomain,
                secure: true
            });
            location.reload(true)
        });
        var reg = new RegExp("(^|&)MKTID=([^&]*)(&|$)");
        var r = window.location.search.substr(1).match(reg);
        var numOnlyExp = /^\d*$/;
        var mktid1 = $.cookie("MKTID1");
        if (r != null && numOnlyExp.test(r[2])) {
            if (mktid1 == "" || mktid1 == null) {
                $.cookie("MKTID1", decodeURIComponent(r[2]), {
                    expires: 30,
                    path: "/"
                });
                $.cookie("MKTID2", decodeURIComponent(r[2]), {
                    expires: 30,
                    path: "/"
                })
            } else {
                $.cookie("MKTID1", mktid1, {
                    expires: 30,
                    path: "/"
                });
                $.cookie("MKTID2", decodeURIComponent(r[2]), {
                    expires: 30,
                    path: "/"
                })
            }
        }
        $(".dropdown-language").delegate(".dropdown-menu a", "click", function(e) {
            var self = $(this);
            if (self.data("locale") != "") {
                $.cookie("_zm_lang", self.data("locale"), {
                    expires: 365,
                    path: "/",
                    domain: cookieDomain,
                    secure: true
                });
                $("html, body").animate({
                    scrollTop: 0
                }, "fast");
                location.reload(true)
            }
        });
        $(".dropdown-currency").delegate(".dropdown-menu a", "click", function(e) {
            var self = $(this);
            if (self.data("currency") != "") {
                $.cookie("_zm_currency", self.data("currency"), {
                    expires: 1,
                    path: "/",
                    domain: cookieDomain,
                    secure: true
                });
                $("html, body").animate({
                    scrollTop: 0
                }, "fast");
                location.reload(true)
            }
        });
        $("#past_due_msg_close").click(function() {
            $.cookie("_pastdue_msg_close", "true", {
                expires: 1,
                path: "/",
                secure: true
            })
        });
        var mktguid = $.cookie("_zm_mtk_guid");
        if (!(mktguid && "" != mktguid)) {
            mktguid = localStorage.getItem("_zm_mtk_guid");
            if (mktguid && mktguid.length === 32) {
                $.cookie("_zm_mtk_guid", mktguid, {
                    expires: 36500,
                    path: "/",
                    domain: cookieDomain,
                    secure: true
                })
            } else {
                var randomGuid = jsGuid();
                $.cookie("_zm_mtk_guid", randomGuid, {
                    expires: 36500,
                    path: "/",
                    domain: cookieDomain,
                    secure: true
                });
                localStorage.setItem("_zm_mtk_guid", randomGuid)
            }
        } else {
            if (mktguid !== localStorage.getItem("_zm_mtk_guid")) {
                localStorage.setItem("_zm_mtk_guid", mktguid)
            }
        }
        var campaignRes = window.location.search.substr(1).match(new RegExp("(^|&)zcid=([^&]*)(&|$)"));
        if (campaignRes != null && "" != campaignRes[2]) {
            SB.post3({
                url: "/market_mapping",
                data: {
                    url: window.location.href,
                    campaignid: campaignRes[2]
                },
                success: function(response) {}
            })
        }
        function clickEvent(obj) {
            if (!obj.data("user-behavior-clicked")) {
                //SB.sendUserBehavior(obj);
                obj.data("user-behavior-clicked", 1);
                window.setTimeout(function() {
                    obj.removeData("user-behavior-clicked")
                }, 3000)
            }
        }
        $(document).on("click", "a,button,input[type=button],input[type=submit]", function() {
            clickEvent($(this))
        });
        $("a,button,input[type=button],input[type=submit]").on("click", function() {
            clickEvent($(this))
        });
        $(document).on("mousedown", function() {
            $("body").removeClass("is-keyboard-event")
        }).on("keydown", function() {
            $("body").addClass("is-keyboard-event")
        });
        $("#header_outer.home a[data-toggle='dropdown'], #footer_container .home a[data-toggle='dropdown']").on("keydown", function(event) {
            if (event.keyCode == 32) {
                event.stopPropagation();
                event.preventDefault();
                $(this).parent().toggleClass("open");
                $(this).attr("aria-expanded", $(this).parent().hasClass("open"))
            }
            if (event.keyCode == 38 || event.keyCode == 40) {
                if (!$(this).parent().hasClass("open")) {
                    event.stopPropagation()
                }
            }
        });
        $("#header li.dropdown ~ li a, #header li.signin a, #footer_container .dropdown-currency a, #footer_container .info-icons a").on("keyup", function(event) {
            if (event.keyCode == 9) {
                $("#header li.dropdown").removeClass("open");
                $("#header #dropdown-hostmeeting").removeClass("open");
                $("#footer_container .dropdown-language").removeClass("open")
            }
        });
        $("#footer_container .info-icons a").on("keyup", function(event) {
            if (event.keyCode == 9) {
                $("#footer_container .dropdown-currency").removeClass("open")
            }
        })
    });
    $("#hostMeetingDropdown a,#mobile-host-btn").click(function() {
        var root = $(this);
        var start_url = root.attr("href");
        window.location.href = start_url
        return false
    });
    function getTime(mtg, mtgs_html) {
        var topic = SB.htmlEncode(mtg.topic);
        var time_display = SB.htmlEncode(mtg.startTimeStr) + " - " + SB.htmlEncode(mtg.endTimeStr);
        var url = mtg.startUrl;
        mtgs_html = mtgs_html + "<div style='position: relative'><div style='width: 500px;height: 18px;text-align: left;font:Bold 13px Open Sans;color: #232333;line-height: 18px'>" + time_display + "</div><div style='width: 360px;height: 36px;text-align: left;font:Regular 13px Open Sans;color: #747487'>" + topic + "</div><div style='position: absolute;top: 0px;z-index: 100;right: 0px'><a role='button' class='btn btn-default btn-sm' style='width: 87px;height: 28px;padding: 4px 26px;background-color: #2D8CFF;color: #fff;font-size: 13px' id='startMtg' ui-cmd='Start' ui-cat='Web.Meeting' href='" + url + "'>Start</a></div></div>";
        return mtgs_html
    }
})();


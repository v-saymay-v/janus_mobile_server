$(function() {
    var q = SB.getSuccessCookie();
    if (q) {
        if (q[0] === "saveLanguage") {
            SB.showSuccessMsg($.i18n.get("user.profile_save_userinfo_success"))
        } else {
            if (q[0] === "change_phone_success") {
                SB.showSuccessMsg($.i18n.get("phone.change_success"))
            } else {
                if (q[0] === "email_send_success") {
                    SB.showSuccessMsg($.i18n.get("email.send_confirm"))
                }
            }
        }
    }
    var X = $("#disablePMI").val();
    if (X === "true" && !(localStorage.getItem("notShowPMIAgain") === "true")) {
        var P = new Vue();
        var p = window.location.href + "/setting?tab=meeting";
        var B = $.i18n.get("user.profile.disable.pmi") + " <a  href=" + p + ">" + $.i18n.get("user.profile.disable.pmi.url") + "</a>";
        P.$message({
            type: "warning",
            dangerouslyUseHTMLString: true,
            showClose: true,
            iconClass: "false",
            customClass: "zm-message--warning",
            duration: 0,
            message: B,
            onClose: function() {
                localStorage.setItem("notShowPMIAgain", "true")
            }
        })
    }
    $(".learn-more-button").click(function() {
        var aG = $(this).data("learn-more");
        $("." + aG).slideToggle();
        return false
    });
    $(".help").on("click", function() {
        $(this).toggleClass("active")
    });
    var S = $("#is_admin_view").val() === "true";
    var h = $("#canAdminChangeSignInEmail").val() === "true";
    var y = $("#user_id").val();
    var az = $("#curr_user_id").val();
    var U = $("#info-form");
    var ak = U.validate({
        rules: {
            firstName: {
                required: function() {
                    return $("#firstName").attr("readonly") !== "readonly"
                },
                maxlength: 64
            },
            lastName: {
                required: false,
                maxlength: 63
            },
            displayName: {
                required: function() {
                    return $("#displayName").attr("readonly") !== "readonly"
                },
                maxlength: 128
            },
            phoneNumber: {
                maxlength: 40
            },
            companyName: {
                maxlength: 255
            }
        },
        submitHandler: function() {}
    });
    var aF = $("#canChangeName").val();
    var e = {};
    e.displayNameMappingEnabled = $("#displayNameMappingEnabled").val();
    e.companyMappingEnabled = $("#companyMappingEnabled").val();
    e.addressMappingEnabled = $("#addressMappingEnabled").val();
    e.jobTitleMappingEnabled = $("#jobTitleMappingEnabled").val();
    e.departmentMappingEnabled = $("#departmentMappingEnabled").val();
    var av = $("#canChangePicture").val();
    var K = $("#canChangeSignInEmail").val();
    $(".profile_content_container .z-row-action>a.edit[data-edit='profile-detail']").click(function() {
        $(this).hide();
        $(".profile-detail").show().prev().hide();
        $("#firstName").trigger("focus").trigger("select");
        return false
    });
    var F = $("#changePictureDialog");
    var b = F.find(".alert-danger");
    var al = F.find(".original-container img");
    var aC = F.find(".preview-container img");
    var G = $(".my-profile img");
    var aj = $("#changeNamePicHintDialog");
    var w = $("#teamConnectingDialog");
    var aB = w.find(".alert-danger");
    function a(aG) {
        if (!aG) {
            return false
        }
        return (aG.indexOf("facebook.com") != -1 || aG.indexOf("googleusercontent.com") != -1)
    }
    var ao = null, ab, ag, C = false, g = null;
    $(".my-profile a.change-picture").on("click", function() {
        var aG = this;
        if (av == "false") {
            A(aG)
        } else {
            H(aG)
        }
    });
    function W() {
        if (ao) {
            ao.destroy()
        }
    }
    function O() {
        $.modal(w, $.extend({}, SB.MODAL_DEFAULTS, {
            overlayId: "teams-connecting-dialog-overlay",
            containerId: "teams-connecting-dialog-container",
            persist: true,
            minHeight: w.outerHeight(),
            minWidth: 550,
            onShow: function() {
                aB.empty().hide()
            }
        }))
    }
    w.find("button.submit").on("click", function() {
        var aG = {
            userPrincipalName: $("#userPrincipalName").val(),
            newConnectingEmail: $("#newConnectingEmail").val(),
            serviceUrl: $("#serviceUrl").val(),
            recipientId: $("#recipientId").val(),
            conversationId: $("#conversationId").val(),
            activityId: $("#activityId").val(),
            teamsUserId: $("#teamsUserId").val()
        };
        SB.post3({
            url: "/msft/accountConnecting",
            data: aG,
            success: function(aH) {
                if (aH.result.message != null) {
                    aB.html(aH.result.message);
                    aB.show()
                } else {
                    $.modal.close();
                    SB.showSuccessMsg($.i18n.get("microsoftteams.connecting.success"))
                }
            },
            btn: $(this),
            errorNode: aB,
            showBusy: true,
            showBusyAfter: false
        })
    });
    w.find("button.cancel").on("click", function() {
        $.modal.close()
    });
    function H(aG) {
        $.modal(F, $.extend({}, SB.MODAL_DEFAULTS, {
            overlayId: "picture-dialog-overlay",
            containerId: "picture-dialog-container",
            persist: true,
            minHeight: 501,
            onShow: function() {
                setTimeout(function() {
                    $("#changePictureDialog .modal-header>h3").trigger("focus")
                }, 300);
                if (!C && G.attr("cp") == "1") {
                    var aH = G.attr("src");
                    if (aH.indexOf("facebook.com") >= 0) {
                        aH = aH.replace(/\?(_|type)=.*/, "") + "?type=large"
                    } else {
                        aH = aH.replace(/\?(_|type|sz)=.*/, "") + "?type=ori"
                    }
                    I(aH)
                }
                if (a(aH)) {
                    F.find("button.submit").addClass("disabled")
                } else {
                    F.find("button.submit").removeClass("disabled")
                }
                b.empty().hide()
            },
            escClose: true,
            onClose: function(aH) {
                $.modal.close();
                setTimeout(function() {
                    $(aG).trigger("focus")
                })
            }
        }))
    }
    function A(aG) {
        $.modal(aj, $.extend({}, SB.MODAL_DEFAULTS, {
            overlayId: "change-name-pic-dialog-overlay",
            containerId: "change-name-pic-dialog-container",
            persist: true,
            minHeight: 501,
            onShow: function() {
                setTimeout(function() {
                    $("#changeNamePicHintDialog .modal-header>h3").focus()
                }, 300)
            },
            escClose: true,
            onClose: function(aH) {
                $.modal.close();
                setTimeout(function() {
                    aG.focus()
                })
            }
        }))
    }
    function I(aG) {
        if (al.attr("src") == aG && !a(aG)) {
            ay();
            return
        }
        al.parent().find(".loading").show();
        al.removeAttr("style");
        al.attr("src", aG);
        aC.attr("src", aG);
        al.one("load", function() {
            if (!a(aG)) {
                ay()
            }
            al.parent().find(".loading").hide()
        });
        al.one("error", function() {
            al.parent().find(".loading").hide()
        })
    }
    function ad(aI) {
        if (parseInt(aI.w) > 0) {
            var aH = 100 / aI.w;
            var aG = 100 / aI.h;
            aC.css({
                width: Math.round(aH * ab) + "px",
                height: Math.round(aG * ag) + "px",
                marginLeft: "-" + Math.round(aH * aI.x) + "px",
                marginTop: "-" + Math.round(aG * aI.y) + "px"
            })
        }
    }
    function ay() {
        al.Jcrop({
            aspectRatio: 1,
            boxWidth: 400,
            boxHeight: 300,
            onChange: ad,
            onSelect: ad
        }, function() {
            ao = this;
            ab = al.width();
            ag = al.height();
            var aH = 100;
            if (ag > 200) {
                aH = ag / 2
            }
            var aG = Math.round((ab - aH) / 2);
            var aI = Math.round((ag - aH) / 2);
            ao.setSelect([aG, aI, aG + aH, aI + aH])
        });
        C = true
    }
    $(".my-profile a.delete-picture").click(function() {
        aE()
    });
    function aE() {
        var aG = S ? $.i18n.get("user.profile_delete_the_picture") : $.i18n.get("user.profile_delete_your_picture");
        SB.confirm(aG, function() {
            var aH = az;
            if (S) {
                aH = y
            }
            var aI = {
                userId: aH
            };
            SB.post3({
                url: "/p/delete",
                data: aI,
                success: function(aJ) {
                    location.reload(true)
                },
                btn: $(this),
                showBusy: false
            })
        })
    }
    $(".deletelink").click(function() {
        var aG = S ? $.i18n.get("user.profile_delete_personal_link_dialog") : $.i18n.get("user.profile_delete_personal_link_dialog");
        SB.confirm(aG, function() {
            SB.post3({
                url: "/profile/vanity",
                data: {
                    vanity_name: "",
                    userId: y
                },
                success: function(aH) {
                    SB.showSuccessMsg($.i18n.get("user.profile_save_userinfo_success"));
                    window.location.reload(true)
                },
                btn: $(".deletelink"),
                showBusy: true,
                errorNode: $(".vanityurl-detail #vanityurl_error_msg")
            })
        })
    });
    function l(aG) {
        if (aG == 0) {
            b.empty().hide()
        } else {
            if (aG == 1) {
                b.text($.i18n.get("user.profile_upload_picture")).show()
            } else {
                if (aG == 2) {
                    b.text($.i18n.get("user.profile_file_size")).show()
                } else {
                    b.text($.i18n.get("user.profile_errorcode") + " " + aG).show()
                }
            }
        }
    }
    $("#file").fileupload({
        dataType: "json",
        paramName: "file",
        formData: {
            userId: y
        },
        add: function(aH, aG) {
            if (SB.isNotValidPicFile(aG.files[0], l)) {
                return
            }
            F.find(".fileinput-button").disableBtn();
            F.find(".upload-msg").show();
            g = aG.submit()
        },
        progress: function(aI, aH) {
            var aG = parseInt(aH.loaded / aH.total * 100, 10);
            F.find(".progress .progress-bar").css("width", aG + "%");
            F.find(".upload-msg").hide();
            F.find(".fileupload-progress").show()
        },
        done: function(aH, aG) {
            if (aG.result.status) {
                if (C) {
                    W()
                }
                window.setTimeout(function() {
                    I(aG.result.result)
                }, 100);
                F.find("button.submit").removeClass("disabled")
            } else {
                b.text(aG.result.errorMessage ? aG.result.errorMessage : $.i18n.get("user.profile_unknown_error")).show()
            }
        },
        fail: function(aH, aG) {
            if (aG.errorThrown !== "abort") {
                b.text($.i18n.get("user.profile_error") + " " + aG.errorThrown).show()
            }
        },
        always: function(aH, aG) {
            F.find(".fileinput-button").enableBtn();
            F.find(".upload-msg").hide();
            F.find(".fileupload-progress").hide();
            g = null
        }
    });
    F.find("button.submit").click(function() {
        if (!ao) {
            $.modal.close();
            return
        }
        var aH = ao.tellSelect();
        if (!aH || aH.w <= 0 || aH.h <= 0) {
            b.text($.i18n.get("user.profile_crop_img")).show();
            return
        }
        var aG = {
            userId: y,
            file: al.attr("src"),
            x: Math.round(isNaN(aH.x) ? 0 : aH.x),
            y: Math.round(isNaN(aH.y) ? 0 : aH.y),
            w: Math.round(isNaN(aH.w) ? 100 : aH.w),
            h: Math.round(isNaN(aH.h) ? 100 : aH.h)
        };
        SB.post3({
            url: "./savephoto.php",
            data: aG,
            success: function(aI) {
                var aJ = Math.floor(Math.random() * 10000);
                $(".my-profile .profile-pic img").attr("src", aI.result + "?type=large&_=" + aJ).attr("cp", "1");
                if (!S) {
                    $("#headerPic").attr("src", aI.result + "?_=" + aJ)
                }
                $.modal.close();
                $(".my-profile a.delete-picture").show();
                $(".my-profile .pic-action a.change-picture").addClass("pull-left")
            },
            btn: $(this),
            errorNode: b,
            showBusy: true,
            showBusyAfter: false
        })
    });
    F.find("button.cancel").click(function() {
        if (g) {
            g.abort()
        }
        $.modal.close()
    });
    var V = $(".meetingid-detail #pmi");
    var am = $(".meetingid-detail #pmi_error_msg");
    $(".profile_content_container .z-row-action>a.edit[data-edit='meetingid-detail']").click(function() {
        $(".meetingid-detail").show().prev().hide();
        $(".meetingid-detail").find("#pmi").focus();
        $(this).hide();
        SB.initConfInput(V, am, " ", 11);
        $(".meetingid-detail #enableAlwaysUsePMI").prop("checked", "1" == $("#oldAlwaysUsePMI").val());
        $("#locked_by_admin_read").hide();
        return false
    });
    $(".z-form-row a.cancel[data-edit='meetingid-detail']").click(function() {
        $(".col-sm-9 .meetingid-detail").hide().prev().show();
        $('.z-row-action>a[data-edit="meetingid-detail"]').show().focus();
        $("#locked_by_admin_read").show();
        am.hide();
        V.val($(".meetingid-detail #oldpmi").val());
        V.removeClass("error")
    });
    $(".meetingid-detail .pmi_submit").click(function() {
        var aG = V.val().replace(/-/g, "").replace(/\s+/g, "").trim();
        if (aG.length < 10) {
            am.text($.i18n.get("user.profile_meeingid_required"));
            am.show();
            V.addClass("error").focus();
            return false
        }
        var aH = aG.charAt(0);
        if (aH == "0") {
            am.text($.i18n.get("error.meeting.pmi_start_with_0_1"));
            am.show();
            V.addClass("error").focus();
            return false
        }
        am.hide();
        V.removeClass("error");
        var aJ = $("#oldpmi").val().replace(/-/g, "").replace(/\s+/g, "");
        $(this).disableBtn();
        var aI = {
            userId: y,
            enableAlwaysUsePMI: $("#enableAlwaysUsePMI").is(":checked") ? 1 : 0,
            newPMI: aG
        };
        SB.post3({
            url: "/profile/meetingid",
            data: aI,
            success: function(aK) {
                SB.showSuccessMsg($.i18n.get("user.profile_save_userinfo_success"));
                $(".col-sm-9 .meetingid-detail").hide().prev().show();
                $('.z-row-action>a[data-edit="meetingid-detail"]').show().focus();
                if (aK.status) {
                    var aL = aK.result;
                    $(".meetingid-info .mypmi>strong.js-real-label").text(aL.PMI);
                    if ($(".meetingid-info .mypmi>strong.js-mark-label").length) {
                        $(".meetingid-info .mypmi>strong.js-mark-label").text(markPMI(aL.PMI))
                    }
                    $(".meetingid-info .mypmiurl .js-real-label").text(aL.PmiUrl);
                    if ($(".meetingid-info .mypmiurl .js-mark-label").length) {
                        $(".meetingid-info .mypmiurl .js-mark-label").text(markPMIURL(aL.PmiUrl))
                    }
                    $("#personal_link_hint1").text($.i18n.get("user.profile_personal_vanity_url_hint1", aL.PmiUrl));
                    if (!aL.alwaysUsePMI) {
                        $("label.instant").removeClass("checked");
                        $(".meetingid-detail .usepmi-input").removeAttr("checked")
                    } else {
                        $("label.instant").addClass("checked");
                        $(".meetingid-detail .usepmi-input").attr("checked", "checked")
                    }
                    $(".meetingid-detail #oldpmi").val(aL.PMI);
                    $(".meetingid-detail #oldAlwaysUsePMI").val(aL.alwaysUsePMI ? "1" : "0")
                }
            },
            btnContainer: $("#pmi_cancel"),
            showBusy: true,
            showBusyAfter: true,
            error: function(aM, aN, aL) {
                if (aL === 4106) {
                    var aK = new Vue();
                    aK.$message({
                        type: "error",
                        dangerouslyUseHTMLString: true,
                        showClose: false,
                        duration: 3000,
                        iconClass: "false",
                        customClass: "zm-message--error",
                        message: aN
                    })
                } else {
                    if (aM) {
                        am.text(aN);
                        am.show();
                        V.addClass("error").focus()
                    } else {
                        am.empty();
                        am.hide();
                        V.removeClass("error")
                    }
                }
            }
        });
        $(this).enableBtnDelay();
        return false
    });
    var m = $("#newpv");
    var aw = $(".vanityurl-detail #vanityurl_error_msg");
    var Q = false;
    m.on("input", function() {
        $(this).removeClass("remind");
        $(".vanityurl-detail .z-form-item-action>a.submit").html($.i18n.get("common.btn_save_changes"));
        Q = false
    });
    $(".profile_content_container .z-row-action>a.edit[data-edit='vanityurl-detail']").click(function() {
        var aG = $(this).data("edit");
        $("." + aG).show().prev().hide();
        $(this).hide();
        SB.initLimitInput(m, /[^A-Za-z0-9\.]/g, aw, true);
        m.removeClass("remind");
        m.removeClass("error").focus();
        aw.hide();
        $(".vanityurl-detail .z-form-item-action>a.submit").html($.i18n.get("common.btn_save_changes"));
        Q = false;
        return false
    });
    $(".z-form-row a.cancel[data-edit='vanityurl-detail']").click(function() {
        $(".col-sm-9 .vanityurl-detail").hide().prev().show();
        $('.z-row-action>a[data-edit="vanityurl-detail"]').show().focus();
        aw.hide();
        m.removeClass("error");
        m.val($(".vanityurl-detail #oldpv").val())
    });
    $("#addPersonalVanity").click(function() {
        $(this).parents(".vanityurl").hide();
        $(".vanityurl-detail").show().find("#newpv").val("")
    });
    $(".vanityurl-detail .z-form-item-action>a.submit").click(function() {
        var aG = $(this);
        var aI = m.val();
        aI = aI.toLowerCase();
        if (aI.length != 0 && !/^[a-z][a-z0-9.]+$/.test(aI)) {
            aw.text($.i18n.get("user.profile_start_with_a"));
            aw.show();
            m.addClass("error").focus();
            return false
        }
        if (aI.length != 0 && aI.length < 5) {
            aw.text($.i18n.get("user.proflie_enter_at_least_five_characters"));
            aw.show();
            m.addClass("error").focus();
            return false
        }
        aw.hide();
        m.removeClass("error");
        m.removeClass("remind");
        if ($(".vanityurl-detail #newpv").val() === $(".vanityurl-detail #oldpv").val()) {
            SB.showSuccessMsg($.i18n.get("common.no_change"));
            $(".col-sm-9 .vanityurl-detail").hide().prev().show();
            $('.z-row-action>a[data-edit="vanityurl-detail"]').show().focus();
            return false
        }
        var aH = {
            vanity_name: $(".vanityurl-detail #newpv").val().toLowerCase(),
            userId: y
        };
        if (Q) {
            aH.save_anyway = true
        }
        SB.post3({
            url: "/profile/vanity",
            data: aH,
            success: function(aJ) {
                var aK = aJ.result;
                if (aK && aK.existed) {
                    aw.html($.i18n.get("error.user.pvu_already_exists_global_for_vanity_account", aK.encodeVanityName, aK.myPMI, aK.vanityUrlNew));
                    aw.css({
                        color: "#ff742e"
                    });
                    aw.show();
                    m.addClass("remind").focus();
                    Q = true;
                    aG.html($.i18n.get("common.btn_save_anyway"));
                    return
                }
                SB.showSuccessMsg($.i18n.get("user.profile_save_userinfo_success"));
                $(".col-sm-9 .vanityurl-detail").hide().prev().show();
                $('.z-row-action>a[data-edit="vanityurl-detail"]').show();
                if (aK && aK.vanityUrl) {
                    $(".vanityurl span.url").removeClass("hideme");
                    $(".vanityurl span.vanityurl-add").addClass("hideme");
                    $(".vanityurl-info .vanityurl span.url .js-real-label").text(aK.encodeVanityName);
                    if ($(".vanityurl-info .vanityurl span.url .js-mark-label").length) {
                        $(".vanityurl-info .vanityurl span.url .js-mark-label").text(markVanityName(aK.encodeVanityName))
                    }
                    $(".vanityurl-info .z-row-action a.edit").parent().removeClass("hideme")
                } else {
                    $(".vanityurl span.vanityurl-add").removeClass("hideme");
                    $(".vanityurl span.url").addClass("hideme")
                }
                $(".vanityurl-detail #oldpv").val(aK.vanityName)
            },
            error: function(aL, aM, aK) {
                if (aK === 4106) {
                    var aJ = new Vue();
                    aJ.$message({
                        type: "error",
                        dangerouslyUseHTMLString: true,
                        showClose: false,
                        duration: 3000,
                        iconClass: "false",
                        customClass: "zm-message--error",
                        message: aM
                    })
                } else {
                    if (aL) {
                        aw.html(aM);
                        aw.show();
                        aw.css({
                            color: "#ff1e5a"
                        });
                        m.removeClass("remind");
                        m.addClass("error").focus()
                    } else {
                        aw.empty();
                        aw.hide();
                        m.removeClass("error")
                    }
                }
            },
            btn: $(".vanityurl-detail .z-form-item-action>a.cancel"),
            showBusy: true
        })
    });
    var D = 400;
    if ($(document.body).outerWidth(true) < 490) {
        D = parseInt($(document.body).outerWidth(true)) - 90
    }
    $("#timezone").select2({
        width: D
    });
    $("#locale").select2({
        width: D
    });
    $("#callinCountry").select2({
        width: D > 340 ? 340 : D
    });
    $(window).resize(function() {
        var aG = $(document.body).outerWidth(true);
        if (aG < 490) {
            aG = parseInt(aG) - 90;
            $("#s2id_timezone").css({
                width: aG
            });
            $("#s2id_callinCountry").css({
                width: aG > 340 ? 340 : aG
            })
        } else {
            $("#s2id_timezone").css({
                width: 400
            });
            $("#s2id_callinCountry").css({
                width: 340
            })
        }
    });
    $(".profile_content_container .z-row-action>a.edit[data-edit='audio-detail']").click(function() {
        var aG = $(this).data("edit");
        $("." + aG).show().prev().hide();
        $(this).hide();
        $(".audio-detail #oldcallinCountry").val($("#callinCountry").val());
        return false
    });
    $(".z-form-row a.cancel[data-edit='audio-detail']").click(function() {
        var aG = $(this).data("edit");
        $(".col-sm-9 ." + aG).hide().prev().show();
        $('.z-row-action>a[data-edit="' + aG + '"]').show();
        $(".audio-detail #callinCountry").val($(".audio-detail #oldcallinCountry").val()).trigger("change")
    });
    $(".audio-detail .submit").click(function() {
        var aG = $("#callinCountry").val();
        SB.post3({
            url: "/profile/saveCallinCountry",
            data: {
                userId: y,
                callinCountry: aG
            },
            success: function(aH) {
                SB.showSuccessMsg($.i18n.get("user.profile_save_userinfo_success"));
                $("#callinCountry").select2("val", aG);
                $(".col-sm-9 .audio-detail").hide().prev().show();
                $('.z-row-action>a[data-edit="audio-detail"]').show();
                $(".audio-info #oldcallinCountry").val(aG);
                var aI = aH.result;
                if (aI.callinCountry) {
                    $(".audio-info .callin-country").text($("#callinCountry").find("option:selected").text()).css({
                        color: "inherit"
                    })
                } else {
                    $(".audio-info .callin-country").text($.i18n.get("user.profile_no_option_selected")).css({
                        color: "#999"
                    })
                }
            },
            error: function() {
                return false
            },
            showBusy: false,
            errorNode: $(".audio-detail #error_msg")
        })
    });
    jQuery.validator.addMethod("zoompassword", function(aH, aG) {
        return !(SB.isOrderlyString(aH) || SB.isSameString(aH))
    }, $.i18n.get("user.profile_invalid_psd"));
    jQuery.validator.addMethod("notEqual2Old", function(aI, aH) {
        var aG = $("#oldPassword").val();
        return this.optional(aH) || (aG != aI)
    }, $.i18n.get("user.new_pwd_not_equal_to_old"));
    var d = $(".password-detail #pwd-form");
    function v() {
        $("#password-captcha-wrap").removeClass("required");
        $("#btn-get-code-password").off("click").on("click", function() {
            $("#password-captcha-wrap").rules("add", {
                required: true,
                messages: {
                    required: $.i18n.get("captcha.required")
                }
            });
            pwdValidator.element("#password-captcha-wrap");
            if ($("#password-captcha-wrap").closest(".form-group").hasClass("has-error")) {
                return
            } else {
                $("#password-captcha-wrap").removeClass("required");
                var aH = $(this);
                var aG = $("#password-captcha-wrap").val();
                var aJ = $("#password-captcha-wrap");
                var aI = $("#password-code-number");
                var aK = $("#password-error-message");
                j("", aH, aG, aJ, aI, aK, pwdValidator)
            }
        })
    }
    v();
    pwdValidator = d.validate({
        rules: {
            oldPassword: {
                required: function() {
                    return $("#oldPassword").is(":visible")
                }
            },
            newPassword: {
                required: true,
                notEqual2Old: function() {
                    return $("#oldPassword").is(":visible")
                }
            },
            confirmPassword: {
                equalTo: "#newPassword"
            }
        },
        messages: {
            confirmPassword: {
                equalTo: $.i18n.get("user.profile_confirm_psd")
            }
        },
        submitHandler: function() {
            var aG = $("li.error").length;
            if (aG > 0) {
                $("#newPassword").focus();
                return false
            }
            $.modal($("#revokeTokenPWDDialog"), $.extend({}, SB.MODAL_DEFAULTS, {
                overlayId: "picture-dialog-overlay",
                containerId: "picture-dialog-container",
                persist: true,
                minHeight: 501,
                onShow: function() {}
            }))
        }
    });
    var an = false;
    $("#pwd-form input[type=password]").change(function() {
        an = false;
        $(".password-detail #password_error_msg").hide()
    });
    $("#revokeTokenPWDDialog").find("button.submit").click(function() {
        $(".password-detail #password_error_msg").hide();
        if (an) {
            console.info("Password saved. Double click!");
            return
        }
        an = true;
        if ($("#update-password-SMS-box").is(":visible")) {
            SB.post3({
                url: "/profile/verify_sms",
                data: {
                    userId: y,
                    sms: $("#password-code-number").val()
                },
                success: function(aG) {
                    SB.post3({
                        url: "./savepwd.php",
                        data: {
                            password: $.trim($("#newPassword").val()),
                            sms_token: aG.result
                        },
                        success: function(aH) {
                            an = false;
                            SB.showSuccessMsg(SB.getI18nText("Your Zoom sign-in password has been  changed on all devices", "user.password.changed"));
                            $(".col-sm-9 .password-detail").hide().prev().show();
                            $('.z-row-action>a[data-edit="password-detail"]').show().focus();
                            if ($("#is_empty_pwd").val() == "true") {
                                location.reload()
                            }
                        },
                        btn: $(".password-detail .z-form-item-action>a.cancel"),
                        showBusy: true,
                        errorNode: $(".password-detail #password_error_msg")
                    })
                },
                btn: $(".password-detail .z-form-item-action>a.cancel"),
                showBusy: true,
                error: function(aI, aG, aH) {
                    if (aI) {
                        an = false;
                        if (aH === 3084) {
                            pwdValidator.showErrors({
                                code_number: aG
                            });
                            $("#password-code-number").focus()
                        } else {
                            $(".password-detail #password_error_msg").text(aG).show()
                        }
                    }
                }
            })
        } else {
            SB.post3({
                url: "./savepwd.php",
                data: {
                    userId: y,
                    oldPassword: $.trim($("#oldPassword").val()),
                    newPassword: $.trim($("#newPassword").val())
                },
                success: function(aG) {
                  if (aG.result.error) {
                    $(".password-detail #password_error_msg").text(aG.result.error).show()
                  } else {
                    an = false;
                    SB.showSuccessMsg(SB.getI18nText("Your Room sign-in password has been  changed on all devices", "user.password.changed"));
                    $(".col-sm-9 .password-detail").hide().prev().show();
                    $('.z-row-action>a[data-edit="password-detail"]').show().focus();
                    window.setTimeout(function() {
                      window.location.href = "logout.php";
                    }, 5000);
                  }
                },
                error: function(aH, aG) {
                    if (aH) {
                        an = false;
                        $(".password-detail #password_error_msg").text(aG).show()
                    }
                },
                btn: $(".password-detail .z-form-item-action>a.cancel"),
                showBusy: true
            })
        }
        $.modal.close()
    });
    $("#btn-change-password-by-sms").click(function() {
        captcha.refresh();
        $("#update-password-SMS-box").show();
        $("#update-password-old-box").hide();
        $("#password-captcha-wrap").focus()
    });
    $("#btn-cancel-change-password").click(function() {
        if ($("#update-password-old-box").length) {
            $("#update-password-old-box").show();
            $("#update-password-SMS-box").hide()
        }
    });
    $(".profile_content_container .z-row-action>a.edit[data-edit='password-detail']").click(function() {
        var aG = $(this).data("edit");
        $("." + aG).show().prev().hide();
        $("." + aG).find("#oldPassword").focus();
        $(this).hide();
        $("#setPassword li").removeClass("error").removeClass("success");
        $(".password-detail #oldPassword").val("");
        $(".password-detail #newPassword").val("");
        $(".password-detail #confirmPassword").val("");
        return false
    });
    $(".password-detail #oldPassword, .password-detail #newPassword, .password-detail #confirmPassword").keyup(function(aG) {
        $(this).val($(this).val().trim())
    });
    $(".z-form-row a.cancel[data-edit='password-detail']").click(function() {
        var aG = $(this).data("edit");
        $(".col-sm-9 ." + aG).hide().prev().show();
        $('.z-row-action>a[data-edit="' + aG + '"]').show().focus();
        pwdValidator.resetForm();
        $(".form-group").removeClass("has-error");
        $('#pwd-form input[type!="hidden"]').val("");
        $("#meter_tag>span").removeAttr("style");
        $(".password-detail #password_error_msg").hide();
        $("#setPassword").hide();
        $("#confirmPassDiv").hide();
        an = false
    });
    $("#newPassword").focus(function() {
        $("#setPassword").show();
        $("#confirmPassDiv").show()
    }).focusout(function() {});
    $("#newPassword").keyup(function() {
        var aI = $("#lengthRule").val();
        SB.validateLengthRule($(this), $(".lengthRule"), aI);
        if ($("#consecutiveRule").length) {
            SB.validateNewConsecutiveRule($(this), $(".notConsecutiveRule"), $("#consecutiveRule").val(), true)
        }
        var aG = $("#alpabetRule").val();
        if (aG != "") {
            SB.validateAlpabetRule($(this), $(".alpabetRule"))
        }
        var aK = $("#numberRule").val();
        if (aK != "") {
            SB.validateNumberRule($(this), $(".numberRule"))
        }
        var aH = $("#specialRule").val();
        if (aH != "") {
            SB.validateSpeicalRule($(this), $(".specialRule"))
        }
        var aJ = $("#combineRule").val();
        if (aJ != "") {
            SB.validateCombineRule($(this), $(".combineRule"))
        }
    });
    $("#changePassword").click(function() {
        $("#passwordFields").toggle()
    });
    $("#revokeToken").click(function() {
        var aG = $(this);
        $.modal($("#revokeTokenDialog"), $.extend({}, SB.MODAL_DEFAULTS, {
            overlayId: "picture-dialog-overlay",
            containerId: "picture-dialog-container",
            persist: true,
            minHeight: 501,
            onShow: function() {
                setTimeout(function() {
                    $("#revokeTokenDialog .modal-header>h3").focus()
                }, 300);
                $("#revokeTokenDialog").find(".alert-danger").hide()
            },
            escClose: true,
            onClose: function(aH) {
                $.modal.close();
                setTimeout(function() {
                    aG.focus()
                })
            }
        }))
    });
    $("#revokeTokenDialog").find("button.submit").click(function() {
        var aG = {
            userId: y
        };
        SB.post3({
            url: "/profile/revokeToken",
            data: aG,
            success: function(aH) {
                $.modal.close();
                SB.showSuccessMsg(SB.getI18nText("You have signed out of Zoom on all devices", "user.revoketoken.success"))
            },
            btn: $(this),
            errorNode: $("#revokeTokenDialog").find(".alert-danger"),
            showBusy: true,
            showBusyAfter: false
        })
    });
    var Z = $("#newHostKey");
    var R = $("#hostkey_error_msg");
    $("a.edit[data-edit='hostkey-detail']").click(function() {
        $("#editHostKeyDiv").show().prev().hide();
        $("#editHostKeyDiv #newHostKey").focus();
        $(this).hide();
        $("#hostkey_info").removeClass("hideme");
        return false
    });
    $("#showHostKey").click(function() {
        $("#hideHostkey").hide();
        $("#displayHostkey").show();
        $("#maskHostKey").show().focus();
        $(this).hide()
    });
    $("#maskHostKey").click(function() {
        $("#showHostKey").show().focus();
        $("#hideHostkey").show();
        $("#displayHostkey").hide();
        $(this).hide()
    });
    $("#hostkey_cancel").click(function() {
        R.hide();
        $("#showHostKey").parent().show();
        $("a.edit[data-edit='hostkey-detail']").show().focus();
        $("#editHostKeyDiv").hide();
        Z.val($("#oldHostKey").val());
        Z.removeClass("error");
        $("#hostkey_info").addClass("hideme")
    });
    function at(aJ, aG) {
        var aH = aJ;
        for (var aI = 1; aI < aG; aI++) {
            aJ += "" + aH
        }
        return aJ
    }
    function J(aI, aH) {
        var aG = aI;
        for (var aJ = 1; aJ < aH; aJ++) {
            if (aI == 9) {
                aI = 0
            } else {
                aI++
            }
            aG += "" + aI
        }
        return aG
    }
    $("#hostkey_submit").click(function() {
        var aG = Z.val().trim();
        var aL = $("#hostKeyLen").val();
        var aK = at("1", aL);
        var aJ = at("2", aL);
        var aH = J(1, aL);
        if (aG.length < aL || !/(^\d+$)/.test(aG) || /^(\d)\1{5,9}$/.test(aG) || aG == aH) {
            R.text($.i18n.get("user.profile_host_key_required", aL, aK, aJ, aH));
            R.show();
            Z.addClass("error").focus();
            return false
        }
        R.hide();
        Z.removeClass("error");
        var aM = $("#oldHostKey").val().trim();
        if (aG === aM) {
            SB.showSuccessMsg($.i18n.get("user.profile_no_change"));
            $("#hostkey_cancel").click();
            return false
        }
        $(this).disableBtn();
        var aI = {
            userId: y,
            newHostKey: aG,
            oldHostKey: aM
        };
        SB.post3({
            url: "saveHostKey.php",
            data: aI,
            success: function(aN) {
              if (!aN.result.error) {
                SB.showSuccessMsg($.i18n.get("user.profile_save_userinfo_success"));
                R.hide();
                $("#showHostKey").parent().show();
                $("a.edit[data-edit='hostkey-detail']").show().focus();
                $("#editHostKeyDiv").hide();
                Z.removeClass("error");
                $("#oldHostKey").val(aG);
                $("#displayHostkey").text(aG);
                $("#hostkey_info").addClass("hideme")
              } else {
                R.text(aN.result.error);
                R.show();
                Z.addClass("error").focus()
              }
            },
            btnContainer: $("#hostkey_cancel"),
            showBusy: true,
            showBusyAfter: true,
            error: function(aN, aO) {
                if (aN) {
                    R.text(aO);
                    R.show();
                    Z.addClass("error").focus()
                } else {
                    R.empty();
                    R.hide();
                    Z.removeClass("error")
                }
            }
        });
        $(this).enableBtnDelay();
        return false
    });
    $(".profile_content_container .z-row-action>a.edit[data-edit='passcode-detail']").click(function() {
        $(".passcode-detail").show().prev().hide();
        $(".passcode-detail").find("#passcode").focus();
        $(this).hide();
        return false
    });
    $(".z-form-row a.cancel[data-edit='passcode-detail']").click(function() {
        $(".col-sm-9 .passcode-detail").hide().prev().show();
        $('.z-row-action>a[data-edit="passcode-detail"]').show().focus();
        $(".passcode-detail #passcode_error_msg").hide();
        $(".passcode-detail #passcode").val($(".passcode-detail #oldPasscode").val())
    });
    $(".passcode-detail .passcode-submit").click(function() {
        var aG = $.trim($(".passcode-detail #passcode").val());
        SB.post3({
            url: "/profile/passcode",
            data: {
                userId: y,
                passcode: aG
            },
            success: function(aH) {
                SB.showSuccessMsg($.i18n.get("user.profile_save_userinfo_success"));
                $(".col-sm-9 .passcode-detail").hide().prev().show();
                $('.z-row-action>a[data-edit="passcode-detail"]').show().focus();
                $("#passcodeLable").text(aG);
                $(".passcode-info #passcode").text(aG);
                $(".passcode-detail #oldPasscode").val(aG)
            },
            btn: $(".passcode-detail .z-form-item-action>a.cancel"),
            showBusy: true,
            errorNode: $(".passcode-detail #passcode_error_msg")
        })
    });
    var au = $(".change-email-detail #change-email-form");
    var ac = $(".change-email-detail #newEmail");
    var ae = $(".change-email-detail #verifyPassword");
    var L = $("#hasWorkEmailSns").val() === "true";
    $.validator.setDefaults({
        ignore: ""
    });
    changeEmailValidator = au.validate({
        rules: ah(),
        errorPlacement: function(aG, aH) {
            aG.addClass("help-block");
            captcha.addErrorClass(aH, aG)
        },
        messages: {
            newEmail: {
                required: $.i18n.get("jquery.validation_required"),
                trimemail: $.i18n.get("jquery.validation_email")
            },
            verifyPassword: {
                required: $.i18n.get("jquery.validation_required")
            }
        },
        submitHandler: function() {
            SB.post3({
                url: "./change_email.php",
                data: {
                    userId: y,
                    password: $.trim(ae.val()),
                    newEmail: $.trim(ac.val()),
                    recaptcha: captcha.getValue()
                },
                success: function(aH) {
                    var aI = aH.result;
                    if (aI.error) {
                      $(".change-email-detail #email_error_msg").removeClass("hideme");
                      $(".change-email-detail #email_error_msg").html(aI.error).show();
                    } else {
                      if (aI.changed) {
                        SB.showSuccessMsg($.i18n.get("user.admin_change_sign_in_email_successfully"));
                        var aJ = $(".change-email-info #change_email_pre");
                        aJ.find(".login_email").html(aI.newEmail);
                        var aG = "";
                        $.each(aI.userSns, function(aK, aL) {
                            if (aL.type == 1) {
                                aG += '<span class="mailtype google" title="' + $.i18n.get("user.google_sns_type") + '"></span>'
                            } else {
                                if (aL.type == 100) {
                                    aG += '<span class="mailtype email" title="' + $.i18n.get("user.work_mail_sns_type") + '"></span>'
                                } else {
                                    if (aL.type == 101) {
                                        aG += '<span class="mailtype sso" title="' + $.i18n.get("user.sso_sns_type") + '"></span>'
                                    } else {
                                        if (aL.type == 99) {
                                            aG += '<span class="mailtype api" title="' + $.i18n.get("user.api_sns_type") + '"></span>'
                                        } else {
                                            if (aL.type == 0) {
                                                aG += '<span class="mailtype facebook" title="' + $.i18n.get("user.facebook_sns_type") + '"></span>'
                                            }
                                        }
                                    }
                                }
                            }
                        });
                        aJ.find(".icons").html(aG);
                        $('.z-row-action>a[data-edit="change-email-detail"]').show()
                      } else {
                          SB.showSuccessMsg($.i18n.get("user.changeemail.save_success"));
                          $("#change-new-email-real").text(aI.newEmail);
                          if ($("#change-new-email-mark").length) {
                              $("#change-new-email-mark").text(markEmail(aI.newEmail))
                          }
                          if (aI.status === "1") {
                              if (h) {
                                  $(".change-email-info .new-email-tip2").html($.i18n.get("user.changeemail.pending_tip3", aI.oldEmail))
                              } else {
                                  $(".change-email-info .new-email-tip2").html($.i18n.get("user.changeemail.pending_tip3", aI.oldEmail))
                              }
                              $(".change-email-info .new-email-tip2").show();
                              $(".change-email-info .new-email-tip1").hide()
                          } else {
                              if (h) {
                                  $(".change-email-info .new-email-tip1").html($.i18n.get("user.changeemail.pending_tip4", aI.newEmail))
                              } else {
                                  $(".change-email-info .new-email-tip1").html($.i18n.get("user.changeemail.pending_tip1", aI.newEmail))
                              }
                              $(".change-email-info .new-email-tip1").show();
                              $(".change-email-info .new-email-tip2").hide()
                          }
                          $(".change-email-info #change_email_after").show().find("a.resend_confirmation").focus();
                          $(".change-email-info #change_email_pre").hide();
                          $('.z-row-action>a[data-edit="change-email-detail"]').hide()
                      }
                      $(".col-sm-9 .change-email-detail").hide().prev().show()
                    }
                },
                btn: $(".change-email-detail .z-form-item-action>a.cancel"),
                showBusy: true,
                errorNode: $(".change-email-detail #email_error_msg"),
                errorCallBack: function(aG) {
                    if (captcha) {
                        captcha.refresh()
                    }
                }
            })
        }
    });
    $(".z-form-item-action a.cancel[data-edit='change-email-detail']").click(function() {
        var aG = $(this).data("edit");
        $(".col-sm-9 ." + aG).hide().prev().show();
        $('.z-row-action>a[data-edit="' + aG + '"]').show().focus();
        changeEmailValidator.resetForm();
        $(".form-group").removeClass("has-error");
        $('#change-email-form input[type!="hidden"]').val("");
        $("#meter_tag>span").removeAttr("style");
        $(".change-email-detail #email_error_msg").hide()
    });
    $(".change-email-info").find(".resend_confirmation").click(function() {
        SB.post3({
            url: "/profile/resend_confirmation",
            data: {
                userId: y
            },
            success: function() {
                SB.showSuccessMsg($.i18n.get("user.changeemail.resend_success"))
            },
            btn: $(this),
            errorNode: $(".change-email-detail #email_error_msg"),
            showBusy: true
        })
    });
    $(".change-email-info").delegate("a.cancel_request", "click", function() {
        var aG = $(this);
        SB.confirm($.i18n.get("user.changeemail.cancel_request_confirm"), function() {
            SB.post3({
                url: "/profile/cancel_request",
                data: {
                    userId: y
                },
                success: function(aH) {
                    var aI = aH.result;
                    SB.showSuccessMsg($.i18n.get("user.changeemail.cancel_msg"));
                    $(".change-email-info #change_email_after").hide();
                    $(".change-email-info #change_email_pre").show();
                    $('.z-row-action>a[data-edit="change-email-detail"]').show().focus()
                },
                btn: $(this),
                errorNode: $(".change-email-detail #email_error_msg"),
                showBusy: false
            })
        });
        return false
    });
    $(".change-email-info").find(".oauth_bind_btn").click(function() {
        var aH = $(this);
        var aG = aH.data("option");
        if (aG === "cancel") {
            SB.confirm($.i18n.get("user.changeemail.cancel_request_confirm"), function() {
                E(aG, aH)
            })
        } else {
            E(aG, aH)
        }
    });
    function E(aH, aG) {
        SB.post3({
            url: "/profile/oauth/bind_email",
            data: {
                opt: aH
            },
            success: function(aI) {
                if (aH === "resend") {
                    SB.showSuccessMsg($.i18n.get("user.changeemail.resend_success"))
                } else {
                    SB.showSuccessMsg($.i18n.get("user.changeemail.cancel_msg"));
                    $(".change-email-info #change_oauth_email").hide();
                    $(".change-email-info #change_email_pre").show()
                }
            },
            btn: aG,
            errorNode: $(".change-email-detail #email_error_msg"),
            showBusy: true
        })
    }
    $(".profile_content_container .z-row-action>a.edit[data-edit='kaltura_user_id-detail']").click(function() {
        $(".kaltura_user_id-detail").show().prev().hide();
        $(this).hide();
        return false
    });
    $(".z-form-row a.cancel[data-edit='kaltura_user_id-detail']").click(function() {
        $(".col-sm-9 .kaltura_user_id-detail").hide().prev().show();
        $('.z-row-action>a[data-edit="kaltura_user_id-detail"]').show();
        $(".kaltura_user_id-detail #kaltura_user_error_msg").hide();
        $(".kaltura_user_id-detail #kalturaUserId").val($(".kaltura_user_id-detail #oldKalturaUserId").val())
    });
    $(".kaltura_user_id-detail .kaltura_user_id-submit").click(function() {
        var aG = $.trim($(".kaltura_user_id-detail #kalturaUserId").val());
        SB.post3({
            url: "/profile/kalturaUserId",
            data: {
                userId: y,
                kalturaUserId: aG
            },
            success: function(aH) {
                SB.showSuccessMsg($.i18n.get("user.profile_save_userinfo_success"));
                setTimeout(function() {
                    top.location.reload()
                }, 1000)
            },
            btn: $(".kaltura_user_id-detail .z-form-item-action>a.cancel"),
            showBusy: true,
            errorNode: $(".kaltura_user_id-detail #kaltura_user_error_msg")
        })
    });
    $(".profile_content_container .z-row-action>a.edit[data-edit='panopto_user_folder_id-detail']").click(function() {
        $(".panopto_user_folder_id-detail").show().prev().hide();
        $(this).hide();
        return false
    });
    $(".z-form-row a.cancel[data-edit='panopto_user_folder_id-detail']").click(function() {
        $(".col-sm-9 .panopto_user_folder_id-detail").hide().prev().show();
        $('.z-row-action>a[data-edit="panopto_user_folder_id-detail"]').show();
        $(".panopto_user_folder_id-detail #panopto_user_error_msg").hide();
        $(".panopto_user_folder_id-detail #panoptoUserFolderId").val($(".panopto_user_folder_id-detail #oldPanoptoUserFolderId").val())
    });
    $(".panopto_user_folder_id-detail .panopto_user_folder_id-submit").click(function() {
        var aG = $.trim($(".panopto_user_folder_id-detail #panoptoUserFolderId").val());
        SB.post3({
            url: "/profile/panoptoUserFolderId",
            data: {
                userId: y,
                panoptoUserFolderId: aG
            },
            success: function(aH) {
                SB.showSuccessMsg($.i18n.get("user.profile_save_userinfo_success"));
                setTimeout(function() {
                    top.location.reload()
                }, 1000)
            },
            btn: $(".panopto_user_folder_id-detail .z-form-item-action>a.cancel"),
            showBusy: true,
            errorNode: $(".panopto_user_folder_id-detail #panopto_user_error_msg")
        })
    });
    $(document).ready(function() {
        var aG = $("#showConnectingDialog").val();
        if (aG == "true") {
            O()
        }
    });
    function ah() {
        var aG = captcha.getValidationRules();
        aG.newEmail = {
            required: true,
            trimemail: true
        };
        aG.verifyPassword = {
            required: L
        };
        return aG
    }
    $("#dateformat").on("change", function() {
        $("#exampleDateFormat")[0].innerText = $(this).find(":selected").data("example")
    });
    if ($("#profile-detail-el").length) {
        var s = null;
        var n = new Vue({
            el: "#profile-detail-el",
            data: {
                CountryCodeListData: countryList,
                profileExtcountry: profileExtcountry,
                profileCellPhoneCode: profileCellPhoneCode,
                countryVal: "",
                defaultCountryVal: "",
                allowChangeOwnPhone: allowChangeOwnPhone,
                firstName: profileDetail.firstName,
                lastName: profileDetail.lastName,
                displayName: profileDetail.displayName,
                fullName: profileDetail.fullName,
                cellPhone: profileDetail.cellPhone,
                dept: profileDetail.dept,
                jobTitle: profileDetail.jobTitle,
                company: profileDetail.company,
                address: profileDetail.address,
                showVerifyPhoneDialog: false,
                sendVerifyMethods: 0,
                captchaErrorMessage: "",
                errorMessage: "",
                captchaValue: "",
                verifyCode: "",
                startCount: false,
                countdownNumber: 60,
                isClickedByVerifyNow: 0,
                verifyLoading: false,
                isSendingSNS: false,
                captchaType: vueCaptchaType || "input",
            },
            computed: {
                verifyButtonDisabled: function() {
                    return !(this.verifyCode && this.captchaValue && this.cellPhone && this.countryVal)
                },
                sendCodeButtonDisable: function() {
                    if (this.startCount || (this.captchaType === "input" && this.captchaValue === "")) {
                        return true
                    }
                    return false
                },
                sendCodeButtonLoading: function() {
                    if (this.isSendingSNS) {
                        return true
                    }
                    return false
                },
                phoneNumberWithCountry: function() {
                    var aG = this;
                    var aH = this.cellPhone || "";
                    _.forEach(countryList, function(aI) {
                        if (aI.id === aG.countryVal) {
                            aH = "+" + aI.code + " " + aH
                        }
                    });
                    return aH
                },
                phoneNumberWithCountryDesense: function() {
                    var aG = this;
                    var aH = this.cellPhone || "";
                    _.forEach(countryList, function(aI) {
                        if (aI.id === aG.countryVal) {
                            aH = "+" + aI.code + " " + aH.replace(/(\d{3})\d*(\d{3})/, "$1*****$2")
                        }
                    });
                    return aH
                },
                canChangeName: function() {
                    if (aF == "false") {
                        return false
                    } else {
                        return true
                    }
                },
                canChangeDisplayName: function() {
                    if (aF == "false" || e.displayNameMappingEnabled == "true") {
                        return false
                    } else {
                        return true
                    }
                },
                canChangeCompany: function() {
                    if (e.companyMappingEnabled == "true") {
                        return false
                    } else {
                        return true
                    }
                },
                canChangeAddress: function() {
                    if (e.addressMappingEnabled == "true") {
                        return false
                    } else {
                        return true
                    }
                },
                canChangeJobTitle: function() {
                    if (e.jobTitleMappingEnabled == "true") {
                        return false
                    } else {
                        return true
                    }
                },
                canChangeDepartment: function() {
                    if (e.departmentMappingEnabled == "true") {
                        return false
                    } else {
                        return true
                    }
                }
            },
            created: function() {
                var aG = this;
                if (!_.isEmpty(profileExtcountry)) {
                    _.forEach(countryList, function(aH) {
                        if (aH.id == profileExtcountry) {
                            aG.countryVal = aH.id
                        }
                    })
                } else {
                    if (profileCellPhoneCode == "1") {
                        aG.countryVal = "US"
                    } else {
                        _.forEach(countryList, function(aH) {
                            if (aH.code == profileCellPhoneCode) {
                                aG.countryVal = aH.id
                            }
                            return
                        })
                    }
                }
                aG.defaultCountryVal = aG.countryVal
            },
            methods: {
                whenCaptchaError: function(aG) {
                    console.log(aG);
                    this.captchaType = "input"
                },
                save: function() {
                    var aI = $("#phoneNumber").val().replace(/\D/g, "");
                    var aJ = $("#phoneNumber").val().replace(/\D/g, "");
                    var aH = "";
                    var aG = this;
                    if (this.countryVal) {
                        _.forEach(countryList, function(aK) {
                            if (aK.id == aG.countryVal) {
                                aI = "+" + aK.code + " " + aI
                            }
                        });
                        aH = aG.countryVal
                    }
                    if (this.cellPhone === "") {
                        aH = aG.countryVal = "";
                        aI = ""
                    }
                    $("#phoneNumber").val($("#phoneNumber").val().replace(/\D/g, ""));
                    SB.post3({
                        url: "/profile/userinfo",
                        data: {
                            firstName: $.trim(aG.firstName),
                            lastName: $.trim(aG.lastName),
                            displayName: $.trim(aG.displayName),
                            phoneNumber: aI,
                            phoneCountry: aH,
                            companyName: aG.company,
                            location: aG.address,
                            department: aG.dept,
                            jobTitle: aG.jobTitle,
                            userId: y
                        },
                        success: function(aK) {
                            $(".profile-detail #detail_error_msg").hide();
                            SB.showSuccessMsg($.i18n.get("user.profile_save_userinfo_success"));
                            $(".col-sm-9 .profile-detail").hide().prev().show();
                            $('.z-row-action>a[data-edit="profile-detail"]').show().trigger("focus");
                            if (aK.status) {
                                var aL = aK.result;
                                $(".profile-info .fullName").text(aL.fullName);
                                $(".profile-info .displayName").text(aL.displayName);
                                $(".profile-info .department").text(aL.department);
                                $(".profile-info .location").text(aL.location);
                                $(".profile-info .jobTitle").text(aL.jobTitle);
                                $(".profile-info .company").text(aL.companyName);
                                aG.firstName = profileDetail.firstName = aL.firstName;
                                aG.lastName = profileDetail.lastName = aL.lastName;
                                aG.displayName = profileDetail.displayName = aL.displayName;
                                aG.fullName = profileDetail.fullName = aL.fullName;
                                aG.dept = profileDetail.dept = aL.department;
                                aG.jobTitle = profileDetail.jobTitle = aL.jobTitle;
                                aG.company = profileDetail.company = aL.companyName;
                                aG.address = profileDetail.address = aL.location;
                                profileDetail.cellPhone = aG.cellPhone;
                                cellPhoneVerified = aL.cellPhoneVerified || false;
                                ar.cellPhoneVerified = aL.cellPhoneVerified || false;
                                if ($(".profile-info .jobTitle").text() != "") {
                                    $(".profile-info .jobTitle-container").removeClass("hideme")
                                } else {
                                    $(".profile-info .jobTitle-container").addClass("hideme")
                                }
                                if ($(".profile-info .location").text() != "") {
                                    $(".profile-info .location-container").removeClass("hideme")
                                } else {
                                    $(".profile-info .location-container").addClass("hideme")
                                }
                                if ($(".profile-info .department").text() != "") {
                                    $(".profile-info .department-container").removeClass("hideme")
                                } else {
                                    $(".profile-info .department-container").addClass("hideme")
                                }
                                if ($(".profile-info .company").text() != "") {
                                    $(".profile-info .company-container").removeClass("hideme")
                                } else {
                                    $(".profile-info .company-container").addClass("hideme")
                                }
                                if ($("#phoneNumber").val().replace(/\D/g, "") != "") {
                                    $(".profile-info .cellphone").text(aL.cellPhoneNum);
                                    $(".profile-info .phone-container").removeClass("hideme")
                                } else {
                                    $(".profile-info .cellphone").empty();
                                    $(".profile-info .phone-container").addClass("hideme")
                                }
                                $(".profile-detail #companyName").text(aL.companyName);
                                aG.countryVal = aL.phoneCountry;
                                aG.defaultCountryVal = aL.phoneCountry;
                                $(".profile-detail .oldPhoneNumberCountryCode").val(aL.phoneCountry);
                                $(".profile-detail .oldPhoneNumber").val(aJ);
                                if ($("#nav_profile_displayname").length > 0) {
                                    $("#nav_profile_displayname").text(aL.displayName)
                                }
                            }
                        },
                        btn: $(".profile-detail .z-form-item-action>a.cancel"),
                        showBusy: true,
                        errorNode: $(".profile-detail #detail_error_msg")
                    })
                },
                cancel: function() {
                    $(".col-sm-9 .profile-detail").hide().prev().show();
                    $('.z-row-action>a[data-edit="profile-detail"]').show().trigger("focus");
                    $(".profile-detail #detail_error_msg").hide();
                    this.firstName = profileDetail.firstName;
                    this.lastName = profileDetail.lastName;
                    this.displayName = profileDetail.displayName;
                    this.fullName = profileDetail.fullName;
                    this.cellPhone = profileDetail.cellPhone;
                    this.dept = profileDetail.dept;
                    this.jobTitle = profileDetail.jobTitle;
                    this.company = profileDetail.company;
                    this.address = profileDetail.address;
                    this.countryVal = this.defaultCountryVal;
                    $(".form-group").removeClass("has-error");
                    ak.resetForm()
                },
                beforeSaveOp: function() {
                    if ((hasPhoneSns && realNamePhone === this.cellPhone) || !this.cellPhone || (S && y !== az)) {
                        this.save();
                        return false
                    }
                    if (verifyCellPhoneFlag && !cellPhoneVerified && this.cellPhone === profileDetail.cellPhone) {
                        if (!this.countryVal) {
                            $(".profile-detail #detail_error_msg").text($.i18n.get("billing.select_country")).show();
                            return false
                        }
                        if ((parseInt(this.cellPhone) + "").length !== this.cellPhone.length || (this.countryVal === "CN" && (parseInt(this.cellPhone) + "").length !== 11)) {
                            $(".profile-detail #detail_error_msg").text($.i18n.get("billing.buyItNow.please_provide_phone_number")).show();
                            return false
                        }
                        if (!this.countryVal) {
                            $(".profile-detail #detail_error_msg").text($.i18n.get("billing.select_country")).show();
                            return false
                        }
                        this.verifyCode = "";
                        this.showVerifyPhoneDialog = true;
                        this.captchaValue = "";
                        this.$refs.recaptcha && this.$refs.recaptcha.refresh();
                        return false
                    }
                    if (verifyCellPhoneFlag && (this.cellPhone !== profileDetail.cellPhone || this.countryVal !== this.defaultCountryVal) && !realNamePhone.includes(this.cellPhone)) {
                        if (!this.countryVal) {
                            $(".profile-detail #detail_error_msg").text($.i18n.get("billing.select_country")).show();
                            return false
                        }
                        if ((parseInt(this.cellPhone) + "").length !== this.cellPhone.length || (this.countryVal === "CN" && (parseInt(this.cellPhone) + "").length !== 11)) {
                            $(".profile-detail #detail_error_msg").text($.i18n.get("billing.buyItNow.please_provide_phone_number")).show();
                            return false
                        }
                        if (!this.countryVal) {
                            $(".profile-detail #detail_error_msg").text($.i18n.get("billing.select_country")).show();
                            return false
                        }
                        this.verifyCode = "";
                        this.showVerifyPhoneDialog = true;
                        this.captchaValue = "";
                        this.$refs.recaptcha && this.$refs.recaptcha.refresh()
                    } else {
                        this.save()
                    }
                },
                verify: function() {
                    var aG = this;
                    aG.$nextTick(function() {
                        aG.sendVerfyCode()
                    })
                },
                executeVerify: function() {
                    if (this.captchaType === "invisible" && this.captchaValue === "") {
                        this.$refs.recaptcha && this.$refs.recaptcha.executeReCAPTCHA()
                    } else {
                        this.sendVerfyCode()
                    }
                },
                sendVerfyCode: function() {
                    var aG = this;
                    aG.isSendingSNS = true;
                    SB.post3({
                        url: "/profile/cellphone/send",
                        data: {
                            userId: y,
                            captcha: aG.captchaValue,
                            phoneNumber: aG.phoneNumberWithCountry,
                            phoneCountry: aG.countryVal,
                            type: aG.sendVerifyMethods
                        },
                        success: function(aH) {
                            aG.isSendingSNS = false;
                            if (aH.status === false) {
                                aG.errorMessage = aH.errorMessage
                            } else {
                                aG.countdown()
                            }
                        },
                        error: function(aH, aI) {
                            if (aH) {
                                aG.isSendingSNS = false;
                                aG.errorMessage = aI
                            }
                        },
                    })
                },
                submitVerfy: function() {
                    var aG = this;
                    aG.verifyLoading = true;
                    SB.post3({
                        url: "/profile/cellphone/verify",
                        data: {
                            userId: y,
                            phoneNumber: aG.phoneNumberWithCountry,
                            verifyCode: aG.verifyCode,
                            phoneCountry: aG.countryVal,
                            type: aG.isClickedByVerifyNow
                        },
                        success: function(aH) {
                            if (aH.status === false) {
                                aG.errorMessage = aH.errorMessage
                            } else {
                                if (aG.isClickedByVerifyNow === 0) {
                                    aG.save()
                                } else {
                                    $(".profile-detail #detail_error_msg").hide();
                                    SB.showSuccessMsg($.i18n.get("user.profile_save_userinfo_success"));
                                    $(".col-sm-9 .profile-detail").hide().prev().show();
                                    $('.z-row-action>a[data-edit="profile-detail"]').show().trigger("focus")
                                }
                                aG.errorMessage = "";
                                aG.showVerifyPhoneDialog = false;
                                clearInterval(s);
                                aG.startCount = false;
                                aG.countdownNumber = 60;
                                aG.verifyLoading = false;
                                cellPhoneVerified = true;
                                ar.cellPhoneVerified = true
                            }
                        },
                        error: function(aH, aI) {
                            if (aH) {
                                aG.errorMessage = aI;
                                clearInterval(s);
                                aG.startCount = false;
                                aG.countdownNumber = 60;
                                aG.verifyLoading = false
                            }
                        },
                    })
                },
                cancelVerfy: function() {
                    this.verifyCode = "";
                    this.showVerifyPhoneDialog = false;
                    this.sendVerifyMethods = 0;
                    this.errorMessage = "";
                    this.cellPhone = profileDetail.cellPhone;
                    clearInterval(s);
                    this.startCount = false;
                    this.countdownNumber = 60;
                    SB.showSuccessMsg($.i18n.get("profile.verify.cancel_verify"));
                    if (this.isClickedByVerifyNow === 0) {
                        this.save()
                    } else {
                        this.isClickedByVerifyNow = 0;
                        $(".profile-detail #detail_error_msg").hide();
                        $(".col-sm-9 .profile-detail").hide().prev().show();
                        $('.z-row-action>a[data-edit="profile-detail"]').show().trigger("focus")
                    }
                },
                countdown: function() {
                    var aG = this;
                    aG.startCount = true;
                    clearInterval(s);
                    if (aG.countdownNumber > 0) {
                        s = setInterval(function() {
                            if (aG.countdownNumber <= 0) {
                                aG.startCount = false;
                                clearInterval(s);
                                aG.countdownNumber = 60
                            } else {
                                aG.countdownNumber--
                            }
                        }, 1000)
                    }
                }
            }
        })
    }
    if ($("#cellphone-content-el").length) {
        var ar = new Vue({
            el: "#cellphone-content-el",
            data: {
                cellPhoneVerified: cellPhoneVerified
            },
            computed: {
                showVerifyNowButton: function() {
                    return !this.cellPhoneVerified && verifyCellPhoneFlag
                }
            },
            methods: {
                verifyNow: function() {
                    $(".profile-detail").show().prev().hide();
                    n.showVerifyPhoneDialog = true;
                    n.isClickedByVerifyNow = 1;
                    n.captchaValue = "";
                    n.verifyCode = ""
                }
            }
        })
    }
    if ($("#modify-sign-in-email").length) {
        var aq = new Vue({
            el: "#modify-sign-in-email",
            data: {
                dialogVisible: false
            },
            methods: {
                changeSignInEmail: function() {
                    $("#sign-in-email-captcha").show();
                    $("#modify-sign-in-email .change-email-dialog").removeClass("hideme");
                    if (!h && K === "false") {
                        this.dialogVisible = true
                    } else {
                        var aH = $("#modify-sign-in-email .edit");
                        var aG = aH.data("edit");
                        $("." + aG).show().prev().hide();
                        $("." + aG).find("#newEmail").trigger("focus");
                        if (captcha) {
                            captcha.refresh()
                        }
                        aH.hide();
                        ac.val("");
                        ae.val("")
                    }
                }
            }
        })
    }
    var aa = new Vue({
        el: "#timezone-content",
        data: function() {
            var aG = "";
            if (defaultTimezone) {
                _.forEach(timezoneList, function(aH) {
                    if (aH.val == defaultTimezone) {
                        aG = aH.key
                    }
                })
            }
            return {
                dateformats: dateFormatList,
                val: defaultFormat.displayDateFormat,
                defaultExample: defaultFormat.exampleDate,
                timeZones: timezoneList,
                timezoneVal: aG,
                defaultTimezone: aG,
                timeFormat: timeFormatStr
            }
        },
        methods: {
            selectChange: function() {
                this.defaultExample = this.val
            },
            timezoneEdit: function() {
                $("#timezone_edit_group").show().prev().hide();
                $(".profile_content_container .z-row-action>a.edit[data-edit='timezone-detail']").hide();
                $(".timezone-detail .timezone-div .zm-select-input").addClass("is-focus");
                this.$nextTick(function() {
                    //this.$refs.timezoneSelect.focus()
                });
                this.timezoneVal = this.defaultTimezone;
                $(".timezone-detail #oldTimezone").val(this.timezoneVal);
                this.defaultExample = $(".timezone-info .dateExample-label").text();
                $(".timezone-detail #oldTimeFormat").val(this.timeFormat);
                if (this.timeFormat == "12") {
                    $("#use24hour").prop("checked", false)
                } else {
                    $("#use24hour").prop("checked", true)
                }
            },
            timezoneCancel: function() {
                $("#timezone_edit_group").hide().prev().show();
                $('.z-row-action>a[data-edit="timezone-detail"]').show().trigger("focus");
                this.defaultExample = defaultFormat.exampleDate;
                this.val = defaultFormat.displayDateFormat;
                this.timeFormat = $(".timezone-detail #oldTimeFormat").val()
            },
            submitDateTime: function() {
                var aH = this.timezoneVal;
                var aI = _.find(this.dateformats, {
                    exampleDate: this.defaultExample
                });
                var aJ = $("#use24hour").prop("checked") ? $("#use24hour").val() : "12";
                var aG = this;
                SB.post3({
                    url: "/profile/save_date_time",
                    data: {
                        userId: y,
                        timezone: aH,
                        dateFormatId: aI.backendFormat,
                        timeFormat: aJ
                    },
                    success: function(aK) {
                        SB.showSuccessMsg($.i18n.get("user.profile_save_userinfo_success"));
                        $("#timezone_edit_group").hide().prev().show();
                        $('.z-row-action>a[data-edit="timezone-detail"]').show().trigger("focus");
                        $(".timezone-info #oldTimezone").val(aH);
                        $("#dateformat").val(aI).trigger("change");
                        $("#oldDateFormat").val(aI);
                        $("#oldTimeFormat").val(aJ);
                        aG.defaultTimezone = aH;
                        aG.timeFormat = aJ;
                        var aL = aK.result;
                        if (aL.dateFormat) {
                            defaultFormat = aL.dateFormat;
                            if (az == y) {
                                $.cookie("_zm_date_format", aL.dateFormat.frontendFormat, {
                                    expires: null,
                                    path: "/",
                                    domain: SB.cookieDomain,
                                    secure: true
                                });
                                $.cookie("_zm_rd", null, {
                                    path: "/",
                                    domain: SB.cookieDomain,
                                    secure: true
                                });
                                $.cookie("_zm_rm", null, {
                                    path: "/",
                                    domain: SB.cookieDomain,
                                    secure: true
                                })
                            }
                            $(".timezone-info .dateFormat-label").text(aL.dateFormat.displayDateFormat).css({
                                color: "inherit"
                            });
                            $(".timezone-info .dateExample-label").text(aL.dateFormat.exampleDate)
                        }
                        if (aL.displayTimezone) {
                            $(".timezone-info .timezone-label").text(aL.displayTimezone).css({
                                color: "inherit"
                            })
                        } else {
                            $(".timezone-info .timezone-label").text($.i18n.get("user.profile_no_option_selected")).css({
                                color: "#999"
                            })
                        }
                        if (aJ == "12") {
                            $("#timeFormatLabel").removeClass("checked")
                        } else {
                            $("#timeFormatLabel").addClass("checked")
                        }
                    },
                    error: function() {
                        return false
                    },
                    showBusy: false,
                    errorNode: $(".timezone-detail #timezone_error_msg")
                })
            }
        },
        mounted: function() {
            if (!S && !defaultTimezone) {
                var aG = this;
                var aI = jstz.determine();
                var aH = aI.name();
                SB.post3({
                    url: "/profile/timezone",
                    data: {
                        timezone: aH
                    },
                    success: function(aJ) {
                        if (aJ && aJ.status) {
                            var aK = aJ.result;
                            if (aK.timezoneid) {
                                aG.timezoneVal = aK.timezoneid;
                                aG.defaultTimezone = aK.timezoneid;
                                $(".timezone-info #oldTimezone").val(aK.timezoneid)
                            }
                            if (aK.displayTimezone) {
                                $(".timezone-info .timezone-label").text(aK.displayTimezone).css({
                                    color: "inherit"
                                })
                            } else {
                                $(".timezone-info .timezone-label").text($.i18n.get("user.profile_no_option_selected")).css({
                                    color: "#999"
                                })
                            }
                        }
                    },
                    error: function() {
                        return false
                    },
                    showBusy: false
                })
            }
        }
    });
    if ($("#calendar-integration").length) {
        var x = new Vue({
            el: "#calendar-integration",
            data: {
                isMouseOp: false,
                isWaitingReauth: false,
                calendarInfo: {
                    name: "",
                    hasCalendarIntegration: false,
                    hasContactsIntegration: false,
                    type: "3",
                    autoOpenAddCrDialog: false,
                    isTokenExpired: true,
                    isExchangeOnPremise: true,
                    showAddCalendarDialog: false
                },
                authDialog: {
                    isOpen: false,
                    serviceType: ""
                },
                reauthDialog: {
                    isOpen: false,
                    reauthUrl: "/user/calendar/edit?userId=" + SB.xss(y)
                },
                deleteDialog: {
                    isOpen: false,
                    loading: false
                },
                authCheckList: ["hasCalendarIntegration", "hasContactsIntegration"],
                serviceType: {
                    "3": {
                        name: "Google",
                        smIcon: "google-service-sm",
                        icon: "google-service",
                        url: "/user/calendar/google/add?userId=" + SB.xss(y) + "&request_url=" + encodeURIComponent(document.URL)
                    },
                    "5": {
                        name: "Office 365",
                        smIcon: "office365-service-sm",
                        icon: "office365-service",
                        url: "/user/calendar/exchange/add?service_type=5&userId=" + SB.xss(y) + "&redirect_url=" + encodeURIComponent(document.URL)
                    },
                    "4": {
                        name: "Exchange",
                        smIcon: "exchange-service-sm",
                        icon: "exchange-service",
                        url: "/user/calendar/exchange/add?service_type=4&userId=" + SB.xss(y) + "&redirect_url=" + encodeURIComponent(document.URL)
                    }
                }
            },
            computed: {
                getParamsStr: function() {
                    var aG = this.authCheckList;
                    return this.getParam(aG.indexOf("hasCalendarIntegration") !== -1, aG.indexOf("hasContactsIntegration") !== -1)
                }
            },
            watch: {
                "reauthDialog.isOpen": function(aG) {
                    if (aG) {
                        this.authCheckList = [];
                        this.calendarInfo.hasCalendarIntegration && this.authCheckList.push("hasCalendarIntegration");
                        this.calendarInfo.hasContactsIntegration && this.authCheckList.push("hasContactsIntegration")
                    } else {
                        if (!aG && this.isWaitingReauth) {
                            this.calendarInfo[this.isWaitingReauth] = !this.calendarInfo[this.isWaitingReauth]
                        }
                    }
                }
            },
            mounted: function() {
                this.calendarInfo.name = $("#email").val();
                this.calendarInfo.type = $("#calendarType").val();
                this.calendarInfo.hasCalendarIntegration = $("#hasCalendarIntegration").val() === "true";
                this.calendarInfo.hasContactsIntegration = $("#hasContactsIntegration").val() === "true";
                this.calendarInfo.autoOpenAddCrDialog = $("#autoOpenAddCrDialog").val() === "true";
                this.calendarInfo.isExchangeOnPremise = $("#isExchangeOnPremise").val() === "true";
                this.calendarInfo.isTokenExpired = $("#isTokenExpired").val() === "true";
                this.calendarInfo.showAddCalendarDialog = $("#showAddCalendarDialog").val() === "true";
                this.calendarInfo.justAdded = $("#justAdded").val() === "true";
                if (this.calendarInfo.showAddCalendarDialog && !this.calendarInfo.name) {
                    this.authDialog.isOpen = true
                } else {
                    if (this.calendarInfo.showAddCalendarDialog && this.calendarInfo.name && !this.calendarInfo.justAdded) {
                        this.reauthDialog.isOpen = true
                    }
                }
                this.checkCalendarResult()
            },
            methods: {
                handleAuthChange: function(aH, aI) {
                    var aG = this;
                    SB.post3({
                        url: "/user/calendar/update/option",
                        data: {
                            optionKey: aI,
                            optionValue: aH,
                            userId: y
                        },
                        success: function(aJ) {
                            if (aJ && aJ.status) {
                                if (aJ.result === "success") {
                                    aG.$message.success($.i18n.get("user.profile_calendar_update_success"))
                                } else {
                                    if (aJ.result === "isNeedDoReauthorize") {
                                        aG.isWaitingReauth = aI;
                                        aG.reauthDialog.isOpen = true
                                    } else {
                                        aG.calendarInfo[aI] = !aG.calendarInfo[aI];
                                        aG.$message.success($.i18n.get("user.profile_calendar_update_failed"))
                                    }
                                }
                            }
                        }
                    })
                },
                handleMouseSelect: function(aG) {
                    this.isMouseOp = true;
                    this.authDialog.serviceType = aG
                },
                getParam: function(aG, aH) {
                    return "&is=" + window.btoa(JSON.stringify({
                        hasCalendarIntegration: aG,
                        hasContactsIntegration: aH
                    }))
                },
                jumpNext: function() {
                    var aG = this.authDialog.serviceType;
                    if (aG) {
                        window.location.href = this.serviceType[aG].url + this.getParamsStr
                    }
                },
                reauthorize: function() {
                    window.location.href = this.reauthDialog.reauthUrl + this.getParamsStr
                },
                deleteCalendar: function() {
                    var aG = this;
                    aG.deleteDialog.loading = true;
                    SB.post3({
                        url: "/user/calendar/del",
                        data: {
                            userId: y
                        },
                        success: function(aH) {
                            aG.deleteDialog.loading = false;
                            if (aH.result) {
                                window.location.href = "/profile"
                            }
                        },
                        error: function(aH) {
                            aG.deleteDialog.loading = false
                        }
                    })
                },
                checkCalendarResult: function() {
                    var aG = $.cookie("_calendar_result");
                    if (aG === "4043") {
                        this.$message.error($.i18n.get("error.calendar.integration.not_enough_scope"))
                    }
                    $.cookie("_calendar_result", null)
                }
            }
        })
    }
    var o = new Vue({
        el: "#language-content",
        data: function() {
            var aG = "";
            if (defaultLanguage) {
                _.forEach(localeList, function(aH) {
                    if (aH.val == defaultLanguage) {
                        aG = aH.key
                    }
                })
            }
            return {
                supportLanguages: localeList,
                defaultLocale: aG,
                localeVal: aG
            }
        },
        methods: {
            languageEdit: function() {
                $(".language-detail").show().prev().hide();
                $(".language-detail .zm-select-input").addClass("is-focus");
                this.$nextTick(function() {
                    //this.$refs.localeSelect.focus()
                });
                $('a.edit[data-edit="language-detail"]').hide();
                this.localeVal = this.defaultLocale;
                $(".language-detail #oldLocale").val(this.localeVal)
            },
            languageCancel: function() {
                $(".col-sm-9 .language-detail").hide().prev().show();
                $('.z-row-action>a[data-edit="language-detail"]').show().focus()
            },
            submitLanguage: function() {
                var aG = this.localeVal;
                var aH = $(".language-detail a.submit");
                SB.post3({
                    url: "/profile/saveLocale",
                    data: {
                        userId: y,
                        locale: aG
                    },
                    success: function(aI) {
                        var aJ = aI.result;
                        if (aJ) {
                            SB.saveSuccessCookie("saveLanguage");
                            if (az == y) {
                                $.cookie("_zm_lang", aG, {
                                    expires: 365,
                                    path: "/",
                                    domain: SB.cookieDomain,
                                    secure: false
                                })
                            }
                            sessionStorage.setItem("focusElement", '.z-row-action>a[data-edit="language-detail"]');
                            location.reload(true)
                        } else {
                            $(".language-info .language-label").text($.i18n.get("user.profile_no_option_selected")).css({
                                color: "#999"
                            })
                        }
                    },
                    error: function() {
                        return false
                    },
                    btn: aH,
                    busyNode: aH.parent().find("i.busy"),
                    showBusy: true,
                    errorNode: $(".language-detail #language_error_msg")
                })
            }
        },
        mounted: function() {
            var aG = sessionStorage.getItem("focusElement");
            if (aG) {
                $(aG).focus();
                sessionStorage.removeItem("focusElement")
            }
        }
    });
    if ($("#user-group").length) {
        var aD = new Vue({
            el: "#user-group",
            data: {
                groups: dataGroups,
                showMarkDialog: false,
                markLoading: false,
                showMoreDialog: false,
                lockView: false,
                currentId: dataProfileId,
                markGroupId: "",
                canSetPrimayGroup: canSetPrimayGroup,
                notFullGroup: not_full_group,
                noPrimaryGroup: no_primary_group
            },
            methods: {
                markPrimary: function(aG) {
                    this.showMarkDialog = true;
                    this.markGroupId = aG.groupId
                },
                onMarkOK: function(aH) {
                    var aG = this;
                    this.markLoading = true;
                    $.post("/account/group/set_primary", {
                        groupId: this.markGroupId,
                        userId: this.currentId
                    }, function(aK) {
                        aG.markLoading = false;
                        if (aK.result) {
                            var aI = aG.groups;
                            var aJ = -1;
                            var aM = null;
                            for (var aL = 0; aL < aI.length; aL++) {
                                if (aI[aL].groupId === aG.markGroupId) {
                                    aJ = aL;
                                    aM = aI[aL];
                                    break
                                }
                            }
                            aG.groups.splice(aJ, 1);
                            aG.groups.unshift(aM);
                            aG.$message({
                                type: "success",
                                message: $.i18n.get("user.set_primary_group_success", [aG.rexss(aM.name)])
                            })
                        }
                        aG.markGroupId = "";
                        aG.showMarkDialog = false
                    })
                },
                handleCommand: function(aI, aG) {
                    var aH = aG.$attrs["data-source"];
                    this.markGroupId = aH.groupId;
                    this.showMarkDialog = true
                },
                onVisibleChange: function(aG) {
                    this.lockView = aG
                },
                rexss: function(aG) {
                    aG = aG.toString();
                    aG = aG.replace(/&lt;/g, "<");
                    aG = aG.replace(/&gt;/g, ">");
                    aG = aG.replace(/&nbsp;/g, " ");
                    aG = aG.replace(/&quot;/g, '"');
                    aG = aG.replace(/&#39;/g, "'");
                    aG = aG.replace(/&amp;/g, "&");
                    aG = aG.replace(/&lt;\/br&gt;/g, "</br>");
                    return aG
                }
            }
        })
    }
    var M = $("#disableChangePLNTip").length > 0;
    var aA = $("#disableChangePMITip").length > 0;
    var ai = $("#canChangeHostKey").length > 0;
    if (M) {
        var af = new Vue({
            el: "#disableChangePLNTip"
        })
    }
    if (aA) {
        var z = new Vue({
            el: "#disableChangePMITip"
        })
    }
    if (ai) {
        var k = new Vue({
            el: "#canChangeHostKey"
        })
    }
    if ($("#bind-phone").length) {
        var r = $("#bindPhoneDialog");
        var f = $("#update-form");
        var T = $("#bind-form");
        $("input[name=captcha-text]", r).removeClass("required");
        var Y = f && f.validate();
        var u = T.validate({
            rules: {
                phone_number: {
                    required: true,
                    digits: true
                },
                code_number: {
                    required: true,
                    rangelength: [6, 6],
                    digits: true
                }
            },
            messages: {
                phone_number: {
                    required: $.i18n.get("phone_number_error"),
                    digits: $.i18n.get("user.real_name_verification.phoneDigitNumber")
                },
                code_number: {
                    required: $.i18n.get("code_required"),
                    rangelength: $.i18n.get("code_required"),
                    digits: $.i18n.get("code_required")
                },
                "captcha-text": {
                    required: $.i18n.get("captcha.please.enter.code")
                }
            },
            submitHandler: function() {
                var aH = $("#phone-number").val().trim()
                  , aJ = $("#countryCode option:selected").val() || "86";
                var aI = $("#is_phone_signup").val() == "true";
                var aG = "/real/verify/bind";
                if (aI) {
                    aG = "/real/verify/change_login_phone"
                }
                SB.post3({
                    url: aG,
                    data: {
                        pn: aH,
                        cc: aJ,
                        smscode: $("#code-number").val().trim(),
                        user_id: y
                    },
                    success: function(aK) {
                        t(aK.result, aI)
                    },
                    showBusy: true,
                    showBusyAfter: false,
                    btn: $("#btn-save-phone"),
                    error: function(aL, aM, aK) {
                        if (aL) {
                            if (aK == 3084) {
                                u.showErrors({
                                    code_number: aM
                                });
                                $("#code-number").focus()
                            } else {
                                $("#phone-error-tips").text(aM).show()
                            }
                        }
                    }
                });
                return false
            }
        });
        $("#bind-phone-btn").click(function() {
            $.modal(r, $.extend({}, SB.MODAL_DEFAULTS, {
                overlayId: "bind-phone-dialog-overlay",
                containerId: "bind-phone-dialog-container",
                persist: true,
                minHeight: r.outerHeight(),
                minWidth: 480,
                width: "480px",
                onShow: function() {
                    captcha.refresh();
                    c(r, u);
                    c(r, Y);
                    var aG = $("#real-name-phone").val() != "";
                    if (aG) {
                        N()
                    } else {
                        ap()
                    }
                }
            }))
        });
        function t(aI, aJ) {
            var aG = $("#check_token").val();
            var aK = {
                sms_token: aI,
                phone_country: $("#countryCode option:selected").attr("code-id") || "CN",
                userId: y
            };
            if (aG) {
                aK.check_token = aG
            }
            var aH = "/profile/bind";
            if (aJ) {
                aH = "/profile/change_login_phone"
            }
            SB.post3({
                url: aH,
                data: aK,
                success: function(aL) {
                    if (!aL.status) {
                        captcha.refresh();
                        $("#error-message").text(aL.errorMessage)
                    } else {
                        if (aJ) {
                            var aM = new Vue();
                            aM.$alert($.i18n.get("phone_update_success"), $.i18n.get("title_update_phone"), {
                                confirmButtonText: $.i18n.get("signin_again"),
                                callback: function(aN) {
                                    location.href = "/signin"
                                }
                            })
                        } else {
                            SB.saveSuccessCookie("change_phone_success");
                            location.reload()
                        }
                    }
                    if (aG) {
                        $("#check_token").val("")
                    }
                },
                btn: $("#btn-save-phone"),
                showBusy: true,
                showBusyAfter: false,
                error: $("#phone-error-tips")
            })
        }
        function i(aI) {
            var aG = "/profile/verify_pwd";
            var aH = {
                pwd: aI.code,
                userId: y
            };
            if (aI.type == 1) {
                aG = "/profile/verify_sms";
                aH = {
                    sms: aI.code,
                    userId: y
                }
            }
            SB.post3({
                url: aG,
                data: aH,
                success: function(aJ) {
                    $("#login-password").val("");
                    $("#check-code-number").val("");
                    $("#check-captcha-wrap").val("");
                    ap();
                    $("#check_token").val(aJ.result)
                },
                showBusy: true,
                showBusyAfter: false,
                btn: $("#btn-update-continue"),
                error: function(aK, aL, aJ) {
                    if (aK) {
                        $("#check-error-tips").text(aL).show();
                        $("#check_token").val("")
                    }
                }
            })
        }
        function N() {
            f.show();
            T.hide();
            captcha.refresh();
            $("#check-error-tips").text("").hide();
            if ($("#can-update-phone-by-pwd").val() == "true") {
                $("#changeByPassword").show();
                $("#changeByMSMCode").hide();
                $("#btn-switch-to-msm").show()
            } else {
                $("#changeByMSMCode").show();
                $("#btn-switch-to-msm").hide();
                setTimeout(function() {
                    $("#check-captcha-wrap").focus()
                }, 1000)
            }
            setTimeout(function() {
                $("#login-password").focus()
            }, 1000);
            $("#btn-update-continue").off("click").on("click", function() {
                var aH = $("#changeByPassword").is(":visible");
                if (aH) {
                    $("#login-password").rules("add", {
                        required: true
                    })
                } else {
                    $("#check-code-number").rules("add", {
                        required: true,
                        digits: true,
                        rangelength: [6, 6],
                        messages: {
                            required: $.i18n.get("code_required"),
                            rangelength: $.i18n.get("code_required"),
                            digits: $.i18n.get("code_required")
                        }
                    });
                    $("#check-captcha-wrap").rules("add", {
                        required: true,
                        messages: {
                            required: $.i18n.get("captcha.required")
                        }
                    })
                }
                var aI = f.validate();
                var aG = false;
                if (aH) {
                    aI.element("#login-password");
                    if ($("#login-password").closest(".form-group").hasClass("has-error")) {
                        aG = true
                    }
                } else {
                    aI.element("#check-captcha-wrap");
                    aI.element("#check-code-number");
                    if ($("#check-code-number").closest(".form-group").hasClass("has-error") || $("#check-captcha-wrap").closest(".form-group").hasClass("has-error")) {
                        aG = true
                    }
                }
                if (!aG) {
                    var aJ = {};
                    if (aH) {
                        aJ.type = 0;
                        aJ.code = $("#login-password").val().trim()
                    } else {
                        aJ.type = 1;
                        aJ.code = $("#check-code-number").val().trim()
                    }
                    i(aJ)
                }
            });
            $("#btn-get-code-check").off("click").on("click", function() {
                if ($("#check-captcha-wrap").closest(".form-group").hasClass("has-error")) {
                    return
                }
                var aM = {
                    captchaInput: "#check-captcha-wrap",
                    phoneNumberInput: ".code-number"
                };
                var aG = ax(aM, Y);
                if (aG) {
                    return
                }
                $("#check-captcha-wrap").rules("remove", "required");
                var aI = $(this);
                var aH = $("#check-captcha-wrap").val();
                var aK = $("#check-captcha-wrap");
                var aJ = $("#check-code-number");
                var aL = $("#check-error-tips");
                j("", aI, aH, aK, aJ, aL, Y)
            });
            $("#check-captcha-wrap").change(function() {
                $("#check-error-tips").text("").hide()
            });
            $("#btn-switch-to-msm").click(function() {
                $("#changeByMSMCode").show();
                $("#changeByPassword").hide();
                $("#check-error-tips").text("").hide();
                setTimeout(function() {
                    $("#check-captcha-wrap").focus()
                }, 100);
                $(this).hide()
            })
        }
        function c(aH, aG) {
            aG && aG.resetForm();
            $(".has-error", aH).each(function() {
                $(this).removeClass("has-error")
            })
        }
        function ap() {
            f.hide();
            T.show();
            captcha.refresh();
            setTimeout(function() {
                $("#phone-number").focus()
            }, 1000);
            if ($("#phoneNumber").length) {
                $("#countryCode").change(function() {
                    $("#phone-number").focus()
                });
                var aG = $("#realNamePhoneCountry").val() || "CN";
                var aH = $("#countryCode option[code-id=" + aG + "]").val();
                $("#countryCode").val(aH);
                $("#countryCode").select2({
                    width: "100%"
                })
            }
            $("#btn-get-code").off("click").on("click", function() {
                var aP = {
                    captchaInput: "#bind-phone-captcha",
                    phoneNumberInput: "#phone-number"
                };
                var aI = ax(aP, u);
                if (aI) {
                    return
                }
                $("#bind-phone-captcha").rules("remove", "required");
                var aJ = $("#phone-number").val().trim();
                var aL = $(this);
                var aK = $("#bind-phone-captcha").val();
                var aN = $("#bind-phone-captcha");
                var aM = $("#code-number");
                var aO = $("#phone-error-tips");
                j(aJ, aL, aK, aN, aM, aO, u)
            })
        }
    }
    $("#bind-email-btn").click(function() {
        var aG = $("#bindEmailDialog");
        var aI = $("#email-form", aG);
        var aH = aI.validate({
            rules: {
                email_address: {
                    required: true,
                    email: true
                },
                "captcha-tex": {
                    required: true,
                }
            },
            messages: {
                email_address: {
                    required: $.i18n.get("phone_number_error"),
                    digits: $.i18n.get("code_required")
                },
                "captcha-text": {
                    required: $.i18n.get("captcha.please.enter.code")
                }
            },
            submitHandler: function() {
                SB.post3({
                    url: "/profile/bind/email",
                    data: {
                        email: $("#email-address").val().trim(),
                        captcha: $("#bind-email-captcha").val().trim(),
                        userId: y
                    },
                    success: function(aJ) {
                        SB.saveSuccessCookie("email_send_success");
                        location.reload()
                    },
                    showBusy: true,
                    error: function(aK, aL, aJ) {
                        if (aK) {
                            $("#link-email-error-tips").text(aL).show()
                        }
                    }
                });
                return false
            }
        });
        $.modal(aG, $.extend({}, SB.MODAL_DEFAULTS, {
            overlayId: "bind-phone-dialog-overlay",
            containerId: "bind-phone-dialog-container",
            persist: true,
            minHeight: aG.outerHeight(),
            minWidth: 480,
            width: "480px",
            onShow: function() {
                captcha.refresh();
                setTimeout(function() {
                    $("#email-address").focus()
                }, 1000)
            }
        }))
    });
    $("#resend-email-btn").click(function() {
        var aG = $("#bindEmailDialog");
        var aI = $("#email-form", aG);
        var aH = aI.validate({
            rules: {
                "captcha-tex": {
                    required: true,
                }
            },
            messages: {
                "captcha-text": {
                    required: $.i18n.get("captcha.please.enter.code")
                }
            },
            submitHandler: function() {
                SB.post3({
                    url: "/profile/bind/email/option",
                    data: {
                        opt: "resend",
                        userId: y,
                        captcha: $("#bind-email-captcha").val()
                    },
                    success: function(aK) {
                        var aJ = new Vue();
                        aJ.$message({
                            type: "success",
                            duration: 5000,
                            dangerouslyUseHTMLString: true,
                            message: $.i18n.get("user.changeemail.pending_tip3", $("#real-name-binded-email").val())
                        });
                        $.modal.close()
                    },
                    btn: $("#btn-link-email"),
                    showBusy: true,
                    showBusyAfter: false,
                    error: function(aK, aL, aJ) {
                        if (aK) {
                            if ($("#real-name-binded-email").val()) {
                                $("#resend-email-error-tips").text(aL).show()
                            } else {
                                $("#link-email-error-tips").text(aL).show()
                            }
                            captcha.refresh()
                        }
                    }
                });
                return false
            }
        });
        $.modal(aG, $.extend({}, SB.MODAL_DEFAULTS, {
            overlayId: "bind-email-dialog-overlay",
            containerId: "bind-email-dialog-container",
            persist: true,
            minHeight: aG.outerHeight(),
            minWidth: 480,
            width: "480px",
            onShow: function() {
                captcha.refresh();
                setTimeout(function() {
                    $("#bind-email-captcha").focus()
                }, 1000);
                if ($("#real-name-binded-email").val()) {
                    $("#resend-email-error-tips").text().hide()
                } else {
                    $("#link-email-error-tips").text().hide()
                }
            }
        }))
    });
    $("#unlink-email-btn").click(function() {
        var aG = $("#real-name-binded-email").val() != "" && $("#confirmed-email").val() == "";
        var aH = new Vue();
        var aI = aG ? $.i18n.get("email.cancel_bind") : $.i18n.get("email.cancel_change");
        aH.$confirm(aI, $.i18n.get("common.title.confirmation"), {
            confirmButtonText: $.i18n.get("common.yes"),
            cancelButtonText: $.i18n.get("common.no"),
            callback: function(aJ) {
                if (aJ === "confirm") {
                    SB.post3({
                        url: "/profile/bind/email/option",
                        data: {
                            opt: "cancel",
                            userId: y
                        },
                        success: function(aK) {
                            location.reload()
                        }
                    })
                }
            }
        })
    });
    function j(aJ, aI, aM, aK, aN, aO, aH) {
        aI.html('<i class="zm-icon-loading"></i>');
        var aL = {};
        var aG = "";
        if (aJ) {
            aL = {
                pn: aJ,
                cc: $("#countryCode option:selected").val() || "86",
                captcha: aM,
                user_id: y
            };
            aG = "/real/smscode/bind"
        } else {
            aL = {
                captcha: aM,
                userId: y
            };
            aG = "/profile/sendsms"
        }
        SB.post3({
            url: aG,
            data: aL,
            success: function(aP) {
                if (typeof aP === "string") {
                    try {
                        aP = JSON.parse(aP)
                    } catch (aQ) {
                        console.log(error)
                    }
                }
                if (!aP.status) {
                    captcha.refresh();
                    setTimeout(function() {
                        aK.focus()
                    }, 500);
                    aI.attr("disabled", false).text($.i18n.get("send_code"))
                } else {
                    setTimeout(function() {
                        aN.focus()
                    }, 200);
                    aO.text("").hide();
                    var aR = 59;
                    aI.attr("disabled", true);
                    var aS = setInterval(function() {
                        var aT = $.i18n.get("resend_after", aR);
                        aR--;
                        aI.text(aT);
                        if (aR === -1) {
                            clearInterval(aS);
                            aI.attr("disabled", false).text($.i18n.get("send_code"))
                        }
                    }, 1000)
                }
            },
            showBusy: false,
            error: function(aR, aP, aQ) {
                if (aR) {
                    if (aQ == 300) {
                        aH.showErrors({
                            "captcha-text": aP
                        });
                        aK.focus()
                    } else {
                        aO.text(aP).show()
                    }
                    aI.text($.i18n.get("send_code"));
                    captcha.refresh()
                }
            }
        })
    }
    function ax(aI, aH) {
        $(aI.captchaInput).rules("add", {
            required: true,
            messages: {
                required: $.i18n.get("captcha.required")
            }
        });
        aH.element(aI.captchaInput);
        aH.element(aI.phoneNumberInput);
        var aG = false;
        if ($(aI.phoneNumberInput).closest(".form-group").hasClass("has-error") || $(aI.captchaInput).closest(".form-group").hasClass("has-error")) {
            aG = true
        }
        return aG
    }
    $(".js-mark-button-show").click(function() {
        var aG = $(this).closest(".js-mark-scope");
        aG.find(".js-mark-label").hide();
        aG.find(".js-real-label").show();
        $(this).hide();
        $(this).siblings(".js-mark-button-hide").show()
    });
    $(".js-mark-button-hide").click(function() {
        var aG = $(this).closest(".js-mark-scope");
        aG.find(".js-mark-label").show();
        aG.find(".js-real-label").hide();
        $(this).hide();
        $(this).siblings(".js-mark-button-show").show()
    })
});
function markEmail(a) {
    if (!a.length) {
        return ""
    }
    var c = a.split("@");
    var b = c[0];
    var d = "@" + c[1];
    if (b.length <= 3) {
        return b.substring(0, 1) + "**" + d
    } else {
        return b.substring(0, 3) + "***" + d
    }
}
function markPMIURL(g) {
    var b = g
      , j = ""
      , c = ""
      , h = "";
    if (g.indexOf("?pwd=") !== -1) {
        var f = g.split("?pwd=");
        b = f[0];
        h = f[1]
    }
    var a = "/j/";
    if (g.indexOf("/m/") !== -1) {
        a = "/m/"
    }
    var i = b.split(a);
    j = i[0];
    c = i[1];
    var e = "";
    var d = "";
    if (a === "/m/") {
        d = j + a + c
    } else {
        d = j + a + "*******" + c.substring(7)
    }
    if (h !== "") {
        e = d + "?pwd=********"
    } else {
        e = d
    }
    return e
}
function markVanityName(a) {
    if (a.length === 0) {
        return ""
    }
    return "********"
}
function markPMI(a) {
    if (a.length === 0) {
        return ""
    }
    return "*** *** *" + a.substring(9)
}
function markPhone(a) {
    if (a.length === 0) {
        return ""
    }
    return a.substring(0, 3) + "*****" + a.substring(8)
}
;
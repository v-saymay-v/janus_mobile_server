meetings = typeof meetings == "undefined" ? {} : meetings;
meetings.getUserSettingOptions = function() {
    var a;
    var c;
    if ($("#schedule_form").length > 0) {
        var b = $("#schedule_for option:selected").val();
        if (!b || b == "") {
            c = $("#m_default_options").length > 0 ? $("#m_default_options").val() : null
        } else {
            c = $("#m_default_options_schedulefor").length > 0 ? $("#m_default_options_schedulefor").val() : null
        }
    } else {
        if ($("#meeting_form").length > 0 || $("#pmi_form").length > 0) {
            c = $("#m_merged_options").length > 0 ? $("#m_merged_options").val() : null
        }
    }
    if (c != null && typeof c != "undefined" && $.trim(c).length > 0) {
        a = JSON.parse(c)
    }
    return a
}
;
meetings.setScheduleWithPMI = function(c) {
    if (typeof c.isPMIMeetingSetting == "undefined") {
        var a = ('usePMISchedule'in c) && c.usePMISchedule != "undefined" && c.usePMISchedule == "true";
        var d = c.usePMISchedule_locked != "undefined" && c.usePMISchedule_locked == "true";
        var b = $("input[name=option_schedulewithpmi]");
        if ($("#schedule_form").length > 0 || $("#meeting_form").length > 0) {
            if ($("#withPMI").length > 0 && $("#withPMI").is(":visible")) {
                if (typeof c.ignorePMI == "undefined") {
                    meetings.chooseMeetingId(a)
                }
                if (d) {
                    b.prop({
                        disabled: true
                    }).parent("label");
                    if (b.parent("label").find(".locked_by_admin").length == 0) {
                        b.parent("label").append(meetings.lockedTipDomStr)
                    }
                } else {
                    b.prop({
                        disabled: false
                    }).parent("label").find(".locked_by_admin").remove()
                }
            }
        }
    }
    if (c.isPMIMeetingSetting) {
        if (c.globalDialinCountries) {
            var f = {};
            try {
                f = JSON.parse(c.globalDialinCountries);
                changeGlobalDialinCountries(f)
            } catch (g) {
                console.log(g)
            }
        }
    }
    meetings.showJbhPriorStartMeeting()
}
;
meetings.isPMIMeetingSetting = function(a) {
    if (typeof a != "undefined" && a.isPMIMeetingSetting && a.isPMIMeetingSetting == "true") {
        return true
    }
    return false
}
;
meetings.chooseMeetingId = function(c) {
    var a = $("input[name=option_schedulewithpmi][value='off']");
    var b = $("input[name=option_schedulewithpmi][value='on']");
    if (c) {
        b.prop("checked", true).trigger("change")
    } else {
        a.prop("checked", true).trigger("change")
    }
}
;
meetings.isShowScheduleWithPMI = function() {
    return $("#withPMI").length > 0 && $("#withPMI").is(":visible")
}
;
$.extend(meetings, {
    showJbhPriorStartMeeting: function() {
        var e = $("input[name=option_schedulewithpmi][value='off']").prop("checked");
        var c = true;
        var d = window.recurrenceTypeVue;
        var b = $("#option_rm").prop("checked");
        if (b && typeof d !== "undefined") {
            c = d.recurrenceType !== "CLASSIC"
        }
        var a = $("#jbhPriorStartMeetingId");
        if (c && e) {
            a.show()
        } else {
            a.hide()
        }
    }
});
$(function() {
    if ($.validator) {
        $.validator.prototype.elements = function() {
            var i = this
              , e = {};
            return $([]).add(this.currentForm.elements).filter(":input").not(":submit, :reset, :image, [disabled]").not(this.settings.ignore).filter(function() {
                var bB = this.id || this.name;
                !bB && i.settings.debug && window.console && console.error("%o has no id nor name assigned", this);
                if (bB in e || !i.objectLength($(this).rules())) {
                    return false
                }
                e[bB] = true;
                return true
            })
        }
    }
    var y = $("#schedule_form");
    var aM = $("#meeting_form");
    var bu = $("#pmi_form");
    var bv = y.length > 0;
    var a8 = aM.length > 0;
    var Q = bu.length > 0;
    var bw = true;
    var R = $.cookie("_zm_date_format");
    if ($("#template").length > 0) {
        $("#template").select2({
            width: 420
        })
    }
    var aD = "NoDefaultTab";
    if ($("#showregistrationTab").length > 0) {
        aD = "registrationTab"
    }
    if ($("#showregistrationTab").length == 0 && $("#showpollTab").length > 0) {
        aD = "pollTab"
    }
    if (window.location.hash === "#managePoll" && $("#showpollTab").length > 0) {
        aD = "pollTab"
    }
    if (aD == "NoDefaultTab" && $("#showliveStreamingTab").length > 0) {
        aD = "liveStreamingTab"
    }
    if (aD == "pollTab" && $("#showliveStreamingTab").length <= 0 && $("#showregistrationTab").length <= 0) {
        aI($("#pollTab"))
    }
    if (aD == "liveStreamingTab" && $("#showpollTab").length <= 0 && $("#showregistrationTab").length <= 0) {
        aI($("#liveStreamingTab"))
    }
    if (aD == "NoDefaultTab") {
        $("#tab_container ul").removeAttr("class")
    }
    function aI(e) {
        $("#tab_container ul").addClass("hideme");
        e.removeAttr("style");
        e.removeAttr("class");
        e.attr("class", "admin-content-notab")
    }
    var B = SB.getSuccessCookie();
    if (B) {
        var be = B[0];
        if (be === "update_registration") {
            SB.clearSuccessCookie("update_registration");
            aD = "registrationTab"
        } else {
            if (be === "update_replayto") {
                SB.clearSuccessCookie("update_replayto");
                aD = "emailSettingsTab"
            } else {
                if (be === "update_remember_email") {
                    SB.clearSuccessCookie("update_remember_email");
                    aD = "emailSettingsTab"
                } else {
                    if (be === "add_polling") {
                        SB.clearSuccessCookie("add_polling");
                        aD = "pollTab"
                    } else {
                        if (be === "edit_polling") {
                            SB.clearSuccessCookie("edit_polling");
                            aD = "pollTab"
                        } else {
                            if (be === "liveStreamingSuccess") {
                                SB.clearSuccessCookie("liveStreamingSuccess");
                                aD = "liveStreamingTab"
                            }
                        }
                    }
                }
            }
        }
    }
    $("#registrationTab").addClass("hideme");
    $("#emailSettingsTab").addClass("hideme");
    $("#brandingTab").addClass("hideme");
    $("#liveStreamingTab").addClass("hideme");
    $("#tab_container ul li").removeClass("active");
    if ($("#" + aD).length > 0) {
        $("#" + aD).removeClass("hideme");
        $("#show" + aD).parent().addClass("active")
    }
    var K = $.i18n.get("empty.trackfield.error");
    var aL = "_zm_free_mtg_tip";
    var r = "";
    var aU = $("#tsp1").length > 0;
    var p = $("#tsp2").length > 0;
    var ba = null;
    var aS = null;
    var S = $("#isPMIWithJBHPwdLock").val();
    var aX = $("#isPMIWithJBHPwdEnabled").val();
    function J() {
        return !!$.cookie(aL)
    }
    function m() {
        var e = $("#free_meeting_40mins_tip");
        if (e.length && $("#hide_free_tip").prop("checked")) {
            if (!J()) {
                $.cookie(aL, "1", {
                    expires: 3650,
                    path: "/",
                    secure: true
                })
            }
        }
    }
    if (!J()) {
        $("#free_meeting_40mins_tip").show()
    }
    jQuery.validator.addMethod("multiemaildomains", function(bD, bB) {
        var bC = $.trim(bD);
        if (!bC) {
            return true
        }
        var bE = bC.split(/[;,\n\r]+/);
        valid = true;
        for (var e = 0; e < bE.length; e++) {
            bD = $.trim(bE[e]);
            if (!bD) {
                continue
            }
            if (bD.substr(0, 2) == "*.") {
                if (bD.split(".").length <= 2) {
                    valid = false
                } else {
                    continue
                }
            }
            valid = valid && jQuery.validator.methods.email.call(this, "a@" + bD, bB)
        }
        return valid === true
    }, $.i18n.get("meeting.email_domain_separate_by_semicolon"));
    jQuery.validator.addMethod("multiemails", function(bD, bB) {
        var bC = $.trim(bD);
        if (!bC) {
            return true
        }
        var bE = bC.split(/[;,\n\r]+/);
        valid = true;
        for (var e = 0; e < bE.length; e++) {
            bD = $.trim(bE[e]);
            if (!bD) {
                continue
            }
            valid = valid && jQuery.validator.methods.email.call(this, bD, bB)
        }
        return valid === true
    }, $.i18n.get("meeting.email_separate_by_semicolon"));
    jQuery.validator.addMethod("validate1224Hour", function() {
        var e = getErrorMessage4Time($("#start_time").val());
        if (e != "") {
            return false
        } else {
            return true
        }
    }, function() {
        var e = getErrorMessage4Time($("#start_time").val());
        if (e != "") {
            return e
        } else {
            return e
        }
    });
    jQuery.validator.addMethod("notEqualEmail", function(bC, bB) {
        var i = $(bB).attr("id");
        var e = true;
        $("input[name=interpreter_email]").each(function() {
            var bD = $(this).attr("id");
            var bE = $(this).val();
            if (bD < i && bE == bC && e) {
                e = false
            }
        });
        return e
    });
    jQuery.validator.addMethod("notEqualLanguage", function(bE, bB) {
        var i = $(bB).attr("id");
        var e = i.substr(16, 1);
        var bD = "first_Language_" + e;
        var bC = $("#" + bD).val();
        return bC != bE
    });
    $("#topic").focus().select();
    $(".learn-more-button").click(function() {
        var i = $(this).find("#advOptioni");
        if (i.length > 0) {
            var e = $(i).attr("class");
            if (e == "glyphicon glyphicon-menu-down") {
                $(i).removeClass(e).addClass("glyphicon glyphicon-menu-up")
            } else {
                if (e == "glyphicon glyphicon-menu-up") {
                    $(i).removeClass(e).addClass("glyphicon glyphicon-menu-down")
                }
            }
        }
        var bB = $(this).data("learn-more");
        $("." + bB).slideToggle();
        return false
    });
    $("#countryCheckbox").click(function() {
        var e = $(this).is(":checked");
        if (e) {
            $("#meetingCountryDiv").css("display", "")
        } else {
            $("#meetingCountryDiv").css("display", "none")
        }
    });
    var q = $("#deleteMeetingDialog");
    $("#meetings .admin-content").delegate("button.delete", "click", function() {
        var e = $(this);
        a1(e, "delete", "mtg_list")
    });
    $("#meetings .admin-content").delegate("button.end", "click", function() {
        var e = $(this);
        a1(e, "end")
    });
    $("#btn_Delete_meeting").click(function() {
        var e = $(this);
        $("#btn_Delete_meeting").attr({
            "aria-modal": "true",
            "aria-labelledby": "btn_Delete_meeting deleteTitle"
        });
        a1(e, "delete", "mtg_info")
    });
    function a1(bJ, bC, e) {
        var bL = bJ.attr("data-id");
        var bF = "";
        var bM = "";
        q.find("input[name=mid]").val(bL);
        q.find("input[name=action]").val(bC);
        if (bC == "delete") {
            q.find(".deleteNormalMeetingToTrash").removeClass("hideme");
            bM = bJ.attr("data-s");
            $(".endMeeting").addClass("hideme");
            $("#submitDeleteEndBtn").css({
                "background-color": "#E02828",
                "border-color": "#E02828",
                color: "#FFFFFF",
                "text-shadow": "1px 1px #E02828"
            }).text($.i18n.get("common.btn_delete"));
            $("#submitDeleteEndBtn").prop("disabled", false);
            $("#btnDeleteSingleOccurrence").prop("disabled", false).css({
                "background-color": "#E02828",
                "border-color": "#E02828",
                color: "#FFFFFF",
                "text-shadow": "1px 1px #E02828"
            });
            $("#btnDeleteAllOccurrences").prop("disabled", false).css({
                "background-color": "#FFFFFF",
                color: "#333",
                "border-color": "#ccc"
            });
            $(".deleteNormalMeeting").removeClass("hideme");
            $(".deleteRecurrenceMeeting").addClass("hideme");
            var bH = bJ.attr("data-t");
            if (bM != undefined && bM != "" && bM != "0" && bH == 8) {
                $("#delete_meeting_occurrence").val(bM);
                $(".deleteRecurrenceMeeting").removeClass("hideme");
                $(".deleteNormalMeeting").addClass("hideme")
            }
            q.find("#deleteTitle").removeClass("hideme");
            q.find("#deleteTopic").removeClass("hideme");
            q.find("#deleteScheduleFor").removeClass("hideme");
            q.find("#deleteTime").removeClass("hideme");
            q.find("#deleteTitle").css("display", "inline-block");
            q.find("#endTitle").css("display", "none");
            q.find("#deleteTitle").attr("tabindex", "-1");
            q.find("#endTitle").removeAttr("tabindex");
            q.find("#endTitle").addClass("hideme");
            q.find("#endTopic").addClass("hideme");
            q.find("#endScheduleFor").addClass("hideme")
        } else {
            if (bC = "end") {
                $(".deleteNormalMeeting").addClass("hideme");
                $(".deleteRecurrenceMeeting").addClass("hideme");
                $("#submitDeleteEndBtn").text($.i18n.get("common.btn_end"));
                $(".endMeeting").removeClass("hideme");
                q.find(".confirm").text($.i18n.get("meeting.confirm_end"));
                q.find("#deleteTitle").addClass("hideme");
                q.find("#deleteTopic").addClass("hideme");
                q.find("#deleteScheduleFor").addClass("hideme");
                q.find("#deleteTime").addClass("hideme");
                q.find("#endTitle").removeClass("hideme");
                q.find("#endTitle").css("display", "inline-block");
                q.find("#deleteTitle").css("display", "none");
                q.find("#endTitle").attr("tabindex", "-1");
                q.find("#deleteTitle").removeAttr("tabindex");
                q.find("#endTopic").removeClass("hideme");
                q.find("#endScheduleFor").removeClass("hideme")
            }
        }
        if ($("#m_user_id").length > 0) {
            q.find("input[name=uid]").val($("#m_user_id").val())
        }
        if (bC == "end") {
            var bE = bJ.attr("data-topic");
            q.find("span.endtopic").text(bE);
            var bO = "";
            if ($("#meeting_" + bL).length > 0) {
                bO = $("#meeting_" + bL).attr("data-display")
            }
            if (bO) {
                q.find("span.endhost").text(bO);
                q.find("div.endhost").show()
            } else {
                q.find("span.endhost").text("");
                q.find("div.endhost").hide()
            }
        } else {
            if (bC == "delete") {
                var bE = bJ.attr("data-topic");
                q.find("span.topic").css({
                    color: "#232333",
                    "font-size": "13px",
                    "font-weight": "bold"
                }).text(bE);
                var bO = "";
                var bG = bJ.attr("data-schedule-for");
                if ($("#meeting_" + bL).length > 0) {
                    userEmail = " (" + $("#meeting_" + bL).attr("title") + ")";
                    bO = $("#meeting_" + bL).attr("data-display")
                } else {
                    if (bG) {
                        var bI = bG.split(" (");
                        if (bI.length == 2) {
                            bO = bI[0];
                            userEmail = " (" + bI[1]
                        }
                    }
                }
                if (bO) {
                    q.find("span.host").css({
                        color: "#232333",
                        "font-size": "13px",
                        "font-weight": "bold"
                    }).text(bO);
                    q.find("span.email").css({
                        color: "#999",
                        "font-size": "13px",
                        "font-weight": "Regular"
                    }).text(userEmail);
                    q.find("div.host").show()
                } else {
                    q.find("span.host").text("");
                    q.find("span.email").text("");
                    q.find("div.host").hide()
                }
                var bK = bJ.attr("data-time") + "   ";
                var bB = bJ.attr("data-duration").replace(/,/, "");
                while (bB.indexOf(",") > -1) {
                    bB = bB.replace(/,/, "")
                }
                var i = parseInt(bB / 60);
                var bN = parseInt(bB % 60);
                if (i != 0) {
                    i = i + " hr "
                } else {
                    i = ""
                }
                if (bN != 0) {
                    bN = bN + " min "
                } else {
                    bN = ""
                }
                var bD = bK + i + bN;
                if (bD) {
                    q.find("span.time").css({
                        color: "#232333",
                        "font-size": "13px",
                        "font-weight": "Regular",
                        "white-space": "pre"
                    }).text(bD);
                    q.find("div.time").show()
                } else {
                    q.find("span.time").text("");
                    q.find("div.time").hide()
                }
            }
        }
        $(".hasregistrants").addClass("hideme");
        SB.post3({
            url: "/meeting/" + bL + "/confirm?occurrence=" + bM,
            success: function(bR) {
                if (bR.errorCode == 0) {
                    if (bR.result.registrants > 0) {
                        $("#option_send_mail").prop("checked", true);
                        $("#send_mail_body").removeClass("hideme").show();
                        $(".hasregistrants").removeClass("hideme");
                        q.find(".tip").find("b").text(bE);
                        var bQ = bR.result.occurrence_topic;
                        if (bQ == null) {
                            $("#mailbody").val(bR.result.display_body)
                        } else {
                            var bP = bQ + "\r\n\r\n" + bR.result.display_body;
                            $("#mailbody").val(bP)
                        }
                        $("#subject").val(bR.result.display_subject)
                    } else {
                        $("#option_send_mail").prop("checked", false);
                        $("#send_mail_body").removeClass("hideme").hide()
                    }
                    if (bC == "end") {
                        $(".hasregistrants").addClass("hideme")
                    }
                    q.find(".alert-danger").empty().hide();
                    $.modal(q, $.extend({}, SB.MODAL_DEFAULTS, {
                        overlayId: "deletemeeting-dialog-overlay",
                        containerId: "deletemeeting-dialog-container",
                        persist: true,
                        minHeight: q.outerHeight(),
                        onShow: function() {
                            setTimeout(function() {
                                if (bC == "delete") {
                                    $("#deleteMeetingDialog .modal-header>h3").focus()
                                } else {
                                    if (bC == "end") {
                                        $("#deleteMeetingDialog .modal-header>h3").focus()
                                    }
                                }
                            }, 300)
                        },
                        onClose: function(bS) {
                            $.modal.close();
                            setTimeout(function() {
                                if (e == "mtg_list") {
                                    bJ.focus()
                                } else {
                                    if (e == "mtg_info") {
                                        $("#btn_Delete_meeting").focus()
                                    } else {
                                        bJ.focus()
                                    }
                                }
                            })
                        }
                    }))
                }
            }
        })
    }
    $("#option_send_mail").on("change", function(bB) {
        var i = $(this);
        if (i.prop("checked")) {
            $("#send_mail_body").removeClass("hideme").show()
        } else {
            $("#send_mail_body").addClass("hideme").hide()
        }
    });
    function ae(bE) {
        $("#submitDeleteEndBtn").prop("disabled", true);
        $("#btnDeleteSingleOccurrence").prop("disabled", true);
        $("#btnDeleteAllOccurrences").prop("disabled", true);
        var e = $("#mid").val();
        var bD = $("#action").val();
        var bC = false;
        if ($(".send_mail").is(":visible")) {
            bC = $("#option_send_mail").prop("checked")
        }
        if (e) {
            var bB = {
                id: e,
                user_id: $("#uid").val(),
                occurrence: bE,
                sendMail: bC,
                subject: bC ? $("#subject").val() : "",
                mailBody: bC ? $("#mailbody").val() : ""
            };
            var i = aA() + "delete";
            if (bD == "end") {
                i = aA() + "end"
            }
            SB.post3({
                url: i,
                data: bB,
                success: function(bF) {
                    if ($("#meeting_number").length > 0) {
                        if ($("#uid").val() != undefined && $("#uid").val() != "") {
                            if ($("#view_from_group").length > 0) {
                                SB.jump("/user/" + $("#uid").val() + "/meeting?viewgid=" + $("#view_from_group").val(), false)
                            } else {
                                SB.jump("/user/" + $("#uid").val() + "/meeting", false)
                            }
                        } else {
                            SB.jump("/meeting", false)
                        }
                    } else {
                        location.reload(true)
                    }
                },
                btnContainer: q,
                errorNode: q.find(".alert-danger"),
                showBusy: true,
                showBusyAfter: false
            });
            return false
        }
    }
    q.find("button.submit").click(function() {
        ae("")
    });
    $("#btnDeleteAllOccurrences").on("click", function() {
        ae("")
    });
    $("#btnDeleteSingleOccurrence").on("click", function() {
        var e = $("#delete_meeting_occurrence").val();
        if (e === "") {
            e = -1
        }
        ae(e)
    });
    var M = $("#pacCopyInviteDialog");
    $("#meetings .admin-content").delegate("button.pac", "click", function() {
        var i = $(this);
        mid = i.attr("data-id");
        var e = {
            meeting_number: mid,
            listen_only: false
        };
        SB.post3({
            url: aA() + "pacInviteEmail",
            data: e,
            success: function(bB) {
                $.modal(M, $.extend({}, SB.MODAL_DEFAULTS, {
                    overlayId: "copy-invite-dialog-overlay",
                    containerId: "copy-invite-dialog-container",
                    persist: true,
                    overlayClose: true,
                    minHeight: M.outerHeight(),
                    minWidth: 630,
                    onShow: function() {
                        M.find("#invite_email").text(bB.result.scheduleEmail);
                        M.find("small").text($.i18n.get("meeting.invite_oper_step"))
                    }
                }))
            },
            error: function(bB, bC) {
                if (bB) {
                    SB.alert(bC)
                }
            },
            btnContainer: i,
            showBusy: false
        })
    });
    M.find(".select-all").click(function() {
        $("#invite_email").select();
        M.find("small").text($.i18n.get("meeting.invite_copy_method"))
    });
    $(".pagination").delegate("a", "click", function() {
        var e = $(this).parent();
        if (e.hasClass("disabled") || e.hasClass("active")) {
            return false
        }
        var i = parseInt($(this).attr("p"), 10);
        window.location.href = SB.replaceUrl(/p=\d+/ig, "p=" + i);
        return false
    });
    jQuery.validator.addMethod("confno", function(bB, e) {
        if (this.optional(e)) {
            return true
        }
        var i = bB.replace(/[^\d]/g, "");
        return i.length >= 9 && i.length <= 11
    }, $.i18n.get("meeting.invalid_meeting_id"));
    var ag = $("#roomSystemDialog");
    var a7 = ag.find("input[name=pairing_meeting]");
    var aN = ag.find("input[name=pairing_code]");
    var bp = ag.find("input[name=pairing_meeting_password]");
    var z = ag.find("div[id=pmpasswordFields]");
    SB.initConfInput(a7);
    function bj(e, i) {
        if (e) {
            X(e, i)
        } else {
            SB.ajax({
                url: "/meeting/inprogress",
                data: null,
                success: function(bB) {
                    if (bB.result) {
                        e = bB.result.number
                    }
                    X(e)
                },
                error: function(bB) {
                    X(e)
                }
            })
        }
    }
    function X(e, i) {
        z.hide();
        if (e) {
            a7.val(SB.formatConfNo(e))
        } else {
            a7.val("")
        }
        aN.val("");
        bp.val("");
        ag.find(".alert-danger").hide();
        ag.find(".form-group").removeClass("has-error");
        ag.valid();
        $.modal(ag, $.extend({}, SB.MODAL_DEFAULTS, {
            overlayId: "room-system-dialog-overlay",
            containerId: "room-system-dialog-container",
            persist: true,
            overlayClose: true,
            minHeight: ag.outerHeight(),
            minWidth: 550,
            onShow: function() {
                window.setTimeout(function() {
                    if (e) {
                        aN.focus()
                    } else {
                        a7.focus()
                    }
                }, 500)
            },
            onClose: function() {
                $.modal.close();
                if (e) {
                    i.focus()
                } else {
                    $("#btnRoomSystemJoin").focus()
                }
            }
        }))
    }
    $("#btnRoomSystemJoin").click(function() {
        bj();
        return false
    });
    $("#meetings .admin-content").delegate("button.room", "click", function() {
        bj($(this).attr("data-id"), $(this))
    });
    var ax = ag.validate({
        rules: {
            pairing_meeting: {
                required: true,
                confno: true
            },
            pairing_code: {
                required: true,
                maxlength: 5,
                minlength: 5
            }
        },
        submitHandler: function() {
            var i = a7.val().replace(/[^\d]/g, "");
            var e = aN.val().trim();
            var bB = {
                pairing_meeting: i,
                pairing_code: e,
                user_id: $("#m_user_id").val()
            };
            if (bp.is(":visible")) {
                $.extend(bB, {
                    password: bp.val()
                })
            }
            SB.post3({
                url: aA() + "pairing",
                data: bB,
                success: function(bC) {
                    SB.showSuccessMsg($.i18n.get("meeting.join_h323_success"));
                    $.modal.close()
                },
                error: function(bD, bE, bC) {
                    d(bD, bE, bC)
                },
                btnContainer: $("#btnPairSubmit"),
                showBusy: true,
                showBusyAfter: true
            });
            return false
        }
    });
    var br = {
        3004: "pairing_meeting_password",
        3021: "pairing_code",
        3001: "pairing_meeting",
        3022: "pairing_meeting"
    };
    function d(bC, bD, bB) {
        var e = ax;
        var i = ag.find(".alert-danger");
        if (bC) {
            if (bB === 3004 && z.is(":hidden")) {
                z.show();
                var bE = {};
                bE[br[3004]] = $.i18n.get("meeting.require_password");
                e.showErrors(bE)
            } else {
                if (typeof (bD) === "undefined") {
                    bD = $.i18n.get("common.unknown_error")
                }
                if (br[bB] != undefined) {
                    var bE = {};
                    bE[br[bB]] = bD;
                    e.showErrors(bE)
                } else {
                    i.text(bD).show()
                }
            }
        } else {
            i.empty().hide()
        }
    }
    var ap = $("#copyInviteDialog");
    $("#copyInvitation").attr({
        "aria-modal": "true",
        "aria-labelledby": "copyInvitation copy-invite-title"
    });
    var B = SB.getSuccessCookie();
    if (B) {
        if (B[0] === "schedule") {
            SB.showSuccessMsg($.i18n.get("meeting.schedule_success"))
        } else {
            if (B[0] === "edit") {
                SB.showSuccessMsg($.i18n.get("meeting.edit_success"))
            }
        }
    }
    ap.find(".select-all").click(function() {
        $("#invite_email").select();
        document.execCommand("copy");
        SB.showSuccessMsg($.i18n.get("webinar.info.copyied.clipboard"), ap.find(".alert-success"))
    });
    $("#copyInvitation").click(function() {
        $.modal(ap, $.extend({}, SB.MODAL_DEFAULTS, {
            overlayId: "copy-invite-dialog-overlay",
            containerId: "copy-invite-dialog-container",
            persist: true,
            overlayClose: true,
            minHeight: ap.outerHeight(),
            minWidth: 630,
            onShow: function() {
                ap.find("small").text($.i18n.get("meeting.invite_oper_step"));
                setTimeout(function() {
                    $("#copyInviteDialog .modal-header>h3").focus()
                }, 300)
            },
            onClose: function() {
                $.modal.close();
                setTimeout(function() {
                    $("#copyInvitation").focus()
                })
            }
        }))
    });
    var H = ($("#m_schedule_for").length > 0 && $("#m_schedule_for").val() != "") ? false : true;
    var aV = false;
    function aZ(bC, bB) {
        var e = window.localStorage;
        var i = e.getItem("meeting_schedule_disable_pmi_alert") || false;
        var bD = new Vue();
        if (bC) {
            $("#withPMI").addClass("hideme")
        } else {
            $("#withPMI").removeClass("hideme")
        }
        if ($(".schedule-meeting-page").length > 0) {
            if (bC && $("#current_user_pmi").val().length > 0) {
                if ($(".meeting-disabledpmi-alert").length > 0) {
                    $(".meeting-disabledpmi-alert").remove()
                }
                if (bB.trim() == "") {
                    if (!i) {
                        bD.$message({
                            dangerouslyUseHTMLString: true,
                            message: $.i18n.get("meeting.schedule.disabled.alert"),
                            type: "warning",
                            customClass: "zm-message zm-message--warning is-closable meeting-disabledpmi-alert",
                            iconClass: "no",
                            duration: 0,
                            showClose: true,
                            onClose: function() {
                                if (!i) {
                                    e.setItem("meeting_schedule_disable_pmi_alert", true)
                                }
                            }
                        })
                    }
                } else {
                    bD.$message({
                        message: $.i18n.get("meeting.schedule.for.disabled.alert", bB),
                        type: "warning",
                        customClass: "zm-message zm-message--warning is-closable meeting-disabledpmi-alert",
                        iconClass: "no",
                        duration: 0
                    })
                }
            } else {
                if ($(".meeting-disabledpmi-alert").length > 0) {
                    $(".meeting-disabledpmi-alert").remove()
                }
            }
        }
        if ($(".edit-meeting-page").length > 0) {
            if ($(".meeting-edit-disabledpmi-alert").length > 0) {
                $(".meeting-edit-disabledpmi-alert").remove()
            }
            if (bC && editWithPMI) {
                if (bB.trim() == "") {
                    bD.$message({
                        message: $.i18n.get("meeting.edit.disabled.alert"),
                        type: "warning",
                        customClass: "zm-message zm-message--warning is-closable meeting-edit-disabledpmi-alert",
                        iconClass: "no",
                        duration: 0
                    })
                } else {
                    bD.$message({
                        message: $.i18n.get("meeting.edit.schedule.for.disabled.alert", bB),
                        type: "warning",
                        customClass: "zm-message zm-message--warning is-closable meeting-edit-disabledpmi-alert",
                        iconClass: "no",
                        duration: 0
                    })
                }
            }
        }
    }
    var bx = "";
    function C() {
        var i = $("#schedule_for option:selected").attr("data-pmi");
        var bD = aF(i, " ");
        if (bD != "" && $("#withPMI").length > 0) {
            var bC = $.i18n.get("meeting.schedule_options_use_pmi", bD);
            $("#withPmiSpan").html(bC);
            var bB = $("#recurrence").val();
            if (!disablePMI) {
                if (bB === "") {
                    $("#withPMI").removeClass("hideme")
                } else {
                    var e = JSON.parse(bB);
                    var bE = e.type;
                    if (bE === "CLASSIC") {
                        $("#withPMI").removeClass("hideme")
                    } else {
                        if ($("#option_rm").prop("checked")) {
                            $("#withPMI").addClass("hideme")
                        } else {
                            $("#withPMI").removeClass("hideme")
                        }
                    }
                }
            } else {
                $("#withPMI").addClass("hideme")
            }
        } else {
            $("#withPMI").addClass("hideme")
        }
    }
    $("#schedule_for").change(function() {
        bx = $("#schedule_for option:selected").attr("data-displayname");
        var bB = $(this).val().trim();
        if (aV) {
            ak(bB)
        }
        C();
        var i = $("#schedule_for option:selected").attr("data-cnmeeting");
        var e = $("#schedule_for option:selected").attr("data-inmeeting");
        if (typeof (i) != "undefined" && typeof (e) != "undefined") {
            ah(i, e)
        }
        if (H) {
            var bC = $("#schedule_for option:selected").data("gdc");
            if (typeof changeGlobalDialinCountries != "undefined") {
                changeGlobalDialinCountries(bC)
            }
        }
        return false
    });
    $(".revert-pmi-change").click(function() {
        if (aQ()) {
            bn(a3());
            $(".pmi-change-warning").hide()
        }
    });
    $(".meeting-options-section input,textarea").change(function() {
        var e = $(this);
        var bB = e.attr("name");
        if (bB == "option_schedulewithpmi") {
            return
        }
        if (typeof aK == "undefined") {
            return
        }
        if (bw) {
            return
        }
        if (bB == "option_password") {
            if (typeof e.data("warning") == "undefined") {
                return
            }
        }
        if (!aK && aQ() && !$(".pmi-change-warning").is(":visible")) {
            if ($(this).parents(".z-form-row").find(".pmi-change-warning").length === 0) {
                var i = $(".pmi-change-warning")[0];
                $(this).parents(".form-group").after(i);
                $(this).parents(".form-group").next(".pmi-change-warning").show()
            } else {
                $(this).parents(".z-form-row").find(".pmi-change-warning").show()
            }
        }
    });
    function ak(e) {
        if (e == "" || typeof e == "undefined") {
            disablePMI = myDisablePMI;
            aZ(disablePMI, bx);
            ba = null;
            aS = null;
            bn();
            bh();
            return true
        }
        E(true);
        SB.post3({
            url: "/meeting/schedulefor",
            data: {
                userId: e
            },
            success: function(bD) {
                E(false);
                if (!bD.status) {
                    return true
                }
                var i = bD.result;
                if (typeof i == "undefined") {
                    return true
                }
                var bC = "{}";
                var bF;
                var bE = {};
                if (i.meetingDefaultOptions && i.meetingDefaultOptions.length > 0) {
                    bE = JSON.parse(i.meetingDefaultOptions)
                }
                if (bx.trim() == "") {
                    disablePMI = myDisablePMI
                } else {
                    if (bE.disablePMI) {
                        disablePMI = JSON.parse(bE.disablePMI)
                    } else {
                        disablePMI = false
                    }
                }
                aZ(disablePMI, bx);
                C();
                if (i.hasAccountSettings) {
                    bC = i.meetingDefaultOptions
                }
                bF = i.pmiMeetingSetting;
                if (typeof i.isPMIWithJBHPwdLock != "undefined") {
                    ba = i.isPMIWithJBHPwdLock ? "true" : "false";
                    aS = i.isPMIWithJBHPwdEnabled ? "true" : "false"
                }
                try {
                    $("#m_pmi_meeting_setting").val(bF);
                    $("#m_default_options_schedulefor").val(bC);
                    var bH = JSON.parse(bC);
                    var bB = JSON.parse(bF);
                    if (('usePMISchedule'in bH) && bH.usePMISchedule == "true" && meetings.isShowScheduleWithPMI()) {
                        meetings.chooseMeetingId(true);
                        bn(bB);
                        if (bv) {
                            D(bH, bB)
                        }
                    } else {
                        meetings.chooseMeetingId(false);
                        if (bv) {
                            bn(bH)
                        } else {
                            a2(W())
                        }
                    }
                    bh(bE.showAdditionalDC)
                } catch (bG) {
                    console.log(bG)
                }
            },
            busyNode: $("#schedule_for").parent("label").find(".busy"),
            error: function(i, bB) {
                if (i) {
                    E(false);
                    console.log(i + ",msg=" + bB + ", userId:" + e)
                }
            }
        })
    }
    function E(e) {
        var i = $("#mock-meeting-options-section");
        if (e) {
            i.show();
            $(".submit").disableBtn()
        } else {
            i.hide();
            $(".submit").enableBtn()
        }
    }
    function ah(i, e) {
        if (i == "false" && e == "false") {
            $("#cnMeetingDiv").hide();
            $("#inMeetingDiv").hide();
            $("#cinMeetingDiv").hide()
        } else {
            if (i == "true" && e == "false") {
                $("#cnMeetingDiv").show();
                $("#inMeetingDiv").hide();
                $("#cinMeetingDiv").hide()
            } else {
                if (i == "false" && e == "true") {
                    $("#cnMeetingDiv").hide();
                    $("#inMeetingDiv").show();
                    $("#cinMeetingDiv").hide()
                } else {
                    $("#cnMeetingDiv").hide();
                    $("#inMeetingDiv").hide();
                    $("#cinMeetingDiv").show()
                }
            }
        }
    }
    function bl() {
        var bB = 420;
        if ($(document.body).outerWidth(true) < 490) {
            bB = parseInt($(document.body).outerWidth(true)) - 70
        }
        var bC = $("#m_start_date").val();
        if (bC != null && bC != "") {
            bC = parseDateByCookies(bC);
            if (bC) {
                if (bC.getTime() > new Date().getTime()) {
                    bC = 0;
                }
            } else {
                bC = 0;
            }
        } else {
            bC = 0;
        }
        $(".input-datepicker").datepicker({
            dateFormat: R,
            minDate: bC,
            showOn: "button",
            buttonImage: $("#imgCalendarUrl").val(),
            buttonText: $.i18n.get("meeting.choose_another_date"),
            buttonImageOnly: false,
            showButtonPanel: true
        }).datepicker("setDate", $("#m_start_date").val());
        $(".input-datepicker").datepickeracc();
        $(".input-datepicker").next("button").attr("aria-label", "Date picker " + $.i18n.get("meeting.choose_another_date"));
        if ($("#schedule_for").length > 0) {
            $("#schedule_for").select2({
                width: bB
            });
            $("#schedule_for").val($("#m_schedule_for").val()).trigger("change");
            H = true;
            aZ(disablePMI, bx)
        } else {
            var i = $("#isCNMeetingEnable").val();
            var e = $("#isINMeetingEnable").val();
            ah(i, e);
            if ($(".schedule-meeting-page").length > 0 || $(".edit-meeting-page").length > 0) {
                aZ(myDisablePMI, bx)
            }
        }
        aV = true;
        $("#start_time_2").val($("#m_start_time_2").val()).trigger("change");
        $("input[name=trackfield]").map(function() {
            new ComboBox(this.id)
        });
        $("#changePMI").click(function() {
            $("#changePMI").parent().hide();
            $("#pmiDiv").show()
        })
    }
    function a6() {
        var e = $("input[name=option_audio]:checked").val();
        if ($("#show_tsp_info").length > 0) {
            if (e == "telephony" || e == "both") {
                $("#show_tsp_info").show()
            } else {
                $("#show_tsp_info").hide()
            }
        } else {
            if (e == "other") {
                $("#other_teleconf_info_container").show()
            } else {
                $("#other_teleconf_info_container").hide()
            }
        }
    }
    $("input[name=option_audio]").change(a6);
    a6();
    var am = 0;
    var aC = null;
    if ($("#meet-autorec").length == 1) {
        aC = $("#meet-autorec input[name=option_autorec]");
        am = $("#meet-autorec input[name=option_autorec_val]").length;
        function ao() {
            if (am == 1) {
                return
            }
            if (aC.prop("checked")) {
                $("#meet-autorec .sub-options").show()
            } else {
                $("#meet-autorec .sub-options").hide()
            }
        }
        ao();
        aC.change(ao)
    }
    function a4(e) {
        if (!am) {
            return
        }
        if (aC.prop("checked")) {
            $.extend(e, {
                autorec: $("#meet-autorec input[name=option_autorec_val]:checked").val()
            })
        } else {
            $.extend(e, {
                autorec: "none"
            })
        }
    }
    function U(bD) {
        var i = $("#breout-room");
        if (i.length > 0) {
            var e = i.attr("data-id");
            var bC = i.is(":checked") ? 1 : 0;
            bD[e] = bC;
            var bB = {};
            _.forEach(roomList, function(bG) {
                var bE = bG.name;
                var bF = bG.value;
                bB[bE] = bF
            });
            if (roomList.length == 0) {
                bD.breout_room_info = ""
            } else {
                bD.breout_room_info = JSON.stringify(bB)
            }
        }
    }
    $("#option_password").click(function() {
        if ($(this).prop("checked")) {
            $(this).data("focus", "1")
        }
        $(this).data("warning", "1")
    });
    $("#meeting_pass").keyup(function() {
        var e = $(this);
        if (aQ() && e.data("pwd") !== e.val()) {
            e.data("userChgPmiPwd", 1);
            e.trigger("change")
        }
    });
    $("#option_password").change(function() {
        if ($(this).prop("checked")) {
            var e = $("#meeting_pass");
            e.show();
            if (e.val() === "") {
                if (!aQ()) {
                    e.val(bm());
                    if (passErrorCount > 0) {
                        checkPassword($("#meeting_pass"))
                    }
                }
            }
            if (typeof $(this).data("focus") != "undefined") {
                e.focus()
            }
            $(this).removeData("focus");
            e.data("pwd", e.val())
        } else {
            $("#meeting_pass").hide();
            $(this).parents("form").valid();
            $(this).parents(".form-group").removeClass("has-error")
        }
    });
    if ($("#meeting_pass").val() != "") {
        $("#option_password").prop("checked", true).change()
    }
    $("#option_interpretation_enable").change(P);
    P();
    function P() {
        if ($("#option_interpretation_enable").prop("checked")) {
            $("#interpreters_info").show();
            $("#interpreter_email").focus()
        } else {
            $("#interpreters_info").hide()
        }
    }
    var O = $("#mtg_alternative_host_hidden").val();
    if (typeof (O) != "undefined" && O != "") {
        var Y = new Array();
        try {
            var aO = JSON.parse(O);
            for (var al = 0; al < aO.length; al++) {
                Y.push(aO[al].email)
            }
            var v = $("#mtg_alternative_host");
            if (v.is("input")) {
                v.val(Y.join(","))
            } else {
                if (v.is("div")) {
                    v.html(Y.join(", "))
                }
            }
        } catch (an) {}
    }
    function av() {
        if ($("#withPMI").length > 0 && $("#withPMI").is(":visible")) {
            var bE = $("input[name=option_schedulewithpmi][value='on']").prop("checked") ? true : false;
            if (!bq(bE)) {
                return false
            }
        }
        if ($("#option_additional_dcs").length > 0 && x && !L()) {
            if (!x.addAdditionalDcs()) {
                return false
            }
        }
        if (!aG()) {
            var bC = $("input[name=option_video_host]:checked").val();
            var i = $("input[name=option_video_participants]:checked").val();
            var bB = $("input[name=option_audio]:checked").val();
            var e = false;
            //var tz = (timezone_vue === undefined?'(GMT+9:00) 大阪、札幌、東京':timezone_vue.val);
            var tz = '(GMT+9:00) 大阪、札幌、東京';
            var bD = {
                number: $("#meeting_number").val(),
                topic: $("#topic").val(),
                agenda: $.trim($("#agenda").val()),
                start_date: $("#start_date").val(),
                start_time: getHHMM(),
                start_time_2: getAMPM(),
                timezone: tz,
                schedule_for: $("#schedule_for").val(),
                duration: parseInt($("#duration_hr").val(), 10) * 60 + parseInt($("#duration_min").val(), 10),
                option_jbh: $("#option_jbh").prop("checked") ? true : false,
                option_video_host: bC ? bC : "on",
                option_video_participants: i ? i : "on",
                option_audio_type: bB ? bB : "both",
                other_teleconf_info: $("#other_teleconf_info").val(),
                option_rm: $("#option_rm").prop("checked") ? true : false,
                password: $("#option_password").prop("checked") ? $("#meeting_pass").val() : "",
                mtg_alternative_host: $("#mtg_alternative_host").val(),
                user_id: $("#m_user_id").val(),
                option_pac: e,
                trackfields: aw(),
                recurrence_setting: $("#recurrence").val(),
                responseToSingleOccurrence: $("#responseToSingleOccurrence").val(),
                occurrence: $("#occurrence_time").val(),
                tsp_account: r,
                sendEmailToRegistrants: $("#sendEmailToRegistrants").prop("checked"),
                option_public_calender_meeting: $("#option_public_calender_meeting").prop("checked") ? 1 : 0,
                option_waiting_room: $("#option_waiting_room").prop("checked") ? 1 : 0,
                global_dialin_countries: $("#global_dialin_countries").val(),
                templateId: $("#template").val(),
            };
            a4(bD);
            if ($("#option_registration").length > 0) {
                $.extend(bD, {
                    option_registration: $("#option_registration").prop("checked") ? true : false,
                    registrationRequiredType: $("input[name='registrationRequiredType']:checked").val()
                })
            }
            if ($("#withPMI").length > 0 && $("#withPMI").is(":visible")) {
                $.extend(bD, {
                    with_pmi: $("input[name=option_schedulewithpmi][value='on']").prop("checked") ? true : false
                })
            }
            if ($("#auth").length > 0) {
                authVue.addAuthInfo(bD)
            }
            U(bD);
            bz($("#meeting_form"), bD);
            A(bD);
            ay(bD);
            checkPassword($("#meeting_pass"));
            if (passErrorCount > 0) {
                if ($("#meeting_pass").val()) {
                    $("#passwordErrorTips").show()
                }
                $("#meeting_pass").focus();
                return false
            }
            aq(bD);
            SB.post3({
                url: aA() + "save",
                data: bD,
                success: function(bF) {
                    SB.saveSuccessCookie("edit");
                    if ($("#responseToSingleOccurrence").val() === "true") {
                        if ($("#view_from_group").length > 0) {
                            SB.jump(aA(true) + $("#meeting_number").val() + "?occurrence=" + $("#occurrence_time").val() + "&viewgid=" + $("#view_from_group").val())
                        } else {
                            SB.jump(aA(true) + $("#meeting_number").val() + "?occurrence=" + $("#occurrence_time").val())
                        }
                    } else {
                        if ($("#view_from_group").length > 0) {
                            SB.jump(aA(true) + bF.result + "?viewgid=" + $("#view_from_group").val())
                        } else {
                            SB.jump(aA(true) + bF.result)
                        }
                    }
                },
                error: function(bH, bF, bG) {
                    if (bG == 3402) {
                        $("#passwordErrorTips").show();
                        return
                    }
                    if (bG == 3403) {
                        $("#weakPasswordDetectionTips").show();
                        $("#password_container").addClass("has-error");
                        return
                    }
                    if (bH) {
                        if (bG == 1113 || bG == 1114 || bG == 1115) {
                            w(false, $("#error_msg"), bF);
                            w(true, $("#error_mtg_alternative_host"), bF)
                        } else {
                            w(false, $("#error_mtg_alternative_host"), bF);
                            w(true, $("#error_msg"), bF);
                            return
                        }
                    } else {
                        w(false, $("#error_msg"), bF);
                        w(false, $("#error_mtg_alternative_host"), bF)
                    }
                },
                btnContainer: $("#meeting_form"),
                showBusy: true
            });
            return false
        }
    }
    function A(i) {
        if (L()) {
            $.extend(i, {
                option_interpretation: false
            })
        } else {
            if ($("#option_interpretation_enable").length > 0) {
                $.extend(i, {
                    option_interpretation: $("#option_interpretation_enable").prop("checked") ? true : false,
                });
                var e = [];
                interpreterInfoVue.list.forEach(function(bB) {
                    e.push(bB.email + "," + bB.firstLanguage + "," + bB.secondLanguage)
                });
                $.extend(i, {
                    interpreterInfos: e.join(";")
                })
            }
        }
    }
    function ay(e) {
        if (typeof jbhPriorStartMeetingIdObj != "undefined") {
            $.extend(e, {
                jbhPriorStartMeeting: $("#jbhPriorStartMeetingId").is(":visible") ? jbhPriorStartMeetingIdObj.jbhPriorTime : "0"
            })
        }
    }
    var F = $("#notifyRecurrenceMeetingDialog");
    function a(bD, i) {
        var bC = $.i18n.get("meeting.reschedule_notify_to_registrants_update");
        var e = $.i18n.get("meeting.reschedule_notify_to_registrants_update_email");
        var bB = "";
        $("#notify_note_container").addClass("hideme");
        if (bD && i && $("#recurrenceType").val() != "CLASSIC") {
            bC = $.i18n.get("meeting.reschedule_notify_to_registrants_reschedule");
            if ($("#m_newRecurrence").val() === "on") {
                e = $.i18n.get("meeting.reschedule_notify_to_registrants_reschedule_email_occurrence");
                bB = $.i18n.get("meeting.reschedule_notify_to_registrants_reschedule_note_occurrence")
            } else {
                e = $.i18n.get("meeting.reschedule_notify_to_registrants_reschedule_email");
                bB = $.i18n.get("meeting.reschedule_notify_to_registrants_reschedule_note")
            }
            $("#notify_note_container").removeClass("hideme")
        }
        $("#notify_msg").text(bC);
        $("#notify_checkbox_label").text(e);
        $("#notify_note").text(bB);
        $.modal(F, $.extend({}, SB.MODAL_DEFAULTS, {
            overlayId: "notify-recurrence-meeting-dialog-overlay",
            containerId: "notify-recurrence-meeting-dialog-container",
            persist: true,
            minHeight: F.outerHeight(),
            onShow: function() {}
        }))
    }
    $("#btn_saveMeetingAndSendEmail").click(function(i) {
        $.modal.close();
        av()
    });
    function ad(bC, bD) {
        for (var bB = 0; bB < bC.length; bB++) {
            var e = bC[bB];
            if (e.type === bD) {
                return e.value
            }
        }
        return ""
    }
    function aH(bL, bI) {
        if (bL === "" && bI === "") {
            return true
        }
        if (bL === bI) {
            return true
        }
        if (bL === "" || bI === "") {
            return false
        }
        var bE = JSON.parse(bL);
        var bJ = JSON.parse(bI);
        if (bE.type != bJ.type) {
            return false
        }
        if (bE.type === "CLASSIC") {
            return true
        }
        if (bE.timezone != bJ.timezone) {
            return false
        }
        if (bE.startTime != bJ.startTime) {
            return false
        }
        if (bE.endType != bE.endType) {
            return false
        }
        if (bE.endType === "END_TIMES") {
            if (bE.times != bJ.times) {
                return false
            }
        } else {
            if (bE.endTime != bJ.endTime) {
                return false
            }
        }
        var bD = ad(bE.recurrenceValues, "INTERVAL");
        var bK = ad(bJ.recurrenceValues, "INTERVAL");
        if (bD != bK) {
            return false
        }
        if (bE.type === "DAILY") {
            return true
        }
        if (bE.type === "WEEKLY") {
            var bF = ad(bE.recurrenceValues, "BYDAY");
            var bH = ad(bJ.recurrenceValues, "BYDAY");
            return bF == bH
        }
        if (bE.type === "MONTHLY") {
            var bG = ad(bE.recurrenceValues, "BYMONTHDAY");
            var e = ad(bJ.recurrenceValues, "BYMONTHDAY");
            if (bG != e) {
                return false
            }
            if (bG === "") {
                var i = ad(bE.recurrenceValues, "BYSETPOS");
                var bC = ad(bJ.recurrenceValues, "BYSETPOS");
                var bB = ad(bE.recurrenceValues, "BYDAY");
                var bM = ad(bJ.recurrenceValues, "BYDAY");
                return i == bC && bB == bM
            }
            return true
        }
        return true
    }
    function k() {
        if ($("#topic").attr("data-s") != $("#topic").val()) {
            return true
        }
        if ($("#meeting_pass").val() != $("#m_password").val()) {
            return true
        }
        if ($("#schedule_for").length > 0 && ($("#schedule_for").val() != $("#m_schedule_for").val())) {
            return true
        }
        if ($("#timezone").val() != $("#m_timezone").val()) {
            return true
        }
        if ($("#start_date").val() != $("#m_start_date").val()) {
            return true
        }
        if ($("#start_time").val() != $("#m_start_time").val() && "0" + $("#start_time").val() != $("#m_start_time").val()) {
            return true
        }
        if ($("#start_time_2").val() != $("#m_start_time_2").val()) {
            return true
        }
        if ($("input[name=option_audio]:checked").val() != $("#m_option_audio").val()) {
            return true
        }
        return false
    }
    function bb() {
        bl();
        $("#meeting_form").validate({
            onkeyup: false,
            rules: {
                topic: {
                    required: true
                },
                agenda: {
                    maxlength: 2000
                },
                start_date: {
                    required: true
                },
                start_time: {
                    required: true,
                    validate1224Hour: true
                },
                meeting_pass: {
                    required: function() {
                        return $("#option_password").prop("checked")
                    }
                },
                mtg_alternative_host: {
                    multiemails: true
                },
                enforce_loginSD_info: {
                    multiemaildomains: true,
                    maxlength: 1024
                },
                other_teleconf_info: {
                    maxlength: 65535
                },
                dailyInterval: {
                    max: 90
                },
                weeklyInterval: {
                    max: 12
                },
                monthlyInterval: {
                    max: 3
                },
                endTimes: {
                    max: 50
                },
                interpreter_email: {
                    required: true,
                    email: true,
                    notEqualEmail: true
                },
                second_language: {
                    required: true,
                    notEqualLanguage: true
                }
            },
            messages: {
                topic: {
                    required: $.i18n.get("meeting.require_topic")
                },
                start_date: {
                    required: $.i18n.get("meeting.require_start_date")
                },
                start_time: {
                    required: $.i18n.get("meeting.require_start_time")
                },
                meeting_pass: {
                    required: $.i18n.get("meeting.enter_password")
                },
                interpreter_email: {
                    required: $.i18n.get("meeting.require_email"),
                    notEqualEmail: $.i18n.get("meeting.repeat_email")
                },
                second_language: {
                    required: $.i18n.get("meeting.interpretation_language"),
                    notEqualLanguage: $.i18n.get("meeting.repeat_language")
                }
            },
            errorPlacement: function(bB, bC) {
                var i = bC.attr("id");
                var e = bC.attr("name");
                if ("dailyInterval" == i || "weeklyInterval" == i || "monthlyInterval" == i || "endTimes" == i) {
                    bB.addClass("interval-error");
                    bC.parents(".col-sm-9").append(bB)
                } else {
                    if ("endTimes" == i) {
                        bB.addClass("times-error");
                        bC.parents(".col-sm-9").append(bB)
                    } else {
                        if ("second_language" == e) {
                            bB.addClass("help-block");
                            bB.addClass("has-error");
                            bC.parent().parent().parent().append(bB)
                        } else {
                            bB.addClass("help-block");
                            bC.parent().append(bB)
                        }
                    }
                }
            },
            submitHandler: function() {
                var bE = false;
                var bC = false;
                var bD = "";
                var i = "";
                if ($("#option_registration").length > 0) {
                    bE = $("#option_registration").attr("data-s") == "true" ? true : false;
                    bD = $("#option_registration").attr("data-t");
                    bC = $("#option_registration").prop("checked") ? true : false;
                    i = $("input[name='registrationRequiredType']:checked").val()
                }
                var bF = false;
                var bI = false;
                if ($("#option_rm").length > 0) {
                    bF = $("#m_newRecurrence").val() === "on" ? true : false;
                    bI = $("#option_rm").prop("checked") ? true : false
                }
                if ($("#hasApprovedRegistrants").val() === "false" || $("#responseToSingleOccurrence").val() === "true") {
                    return av()
                }
                if (bF && bI) {
                    var bG = $("#recurrence").val();
                    var bH = $("#recurrence").attr("data-s");
                    if (!aH(bH, bG)) {
                        var e = (bD == 1 && i == 1);
                        a(!e, bC);
                        return false
                    }
                    if (bC) {
                        var bB = false;
                        if ((bD == 2 || bD == 3) && (i == 2 || i == 3)) {
                            bB = true
                        }
                        if (bD != i && !bB) {
                            a(true, bC);
                            return false
                        }
                    }
                    if (k()) {
                        a(false, bC);
                        return false
                    }
                }
                if (bE && !bF && bI) {
                    a(true, bC);
                    return false
                }
                if (bE && bF && !bI) {
                    a(true, bC);
                    return false
                }
                if (bE && !bF && !bI) {
                    if (k()) {
                        a(false, bC);
                        return false
                    }
                }
                return av()
            }
        })
    }
    function bz(bB, bC) {
        bB.find("input.m_option_chk:visible").each(function() {
            var bD = $(this).prop("name");
            var bE = $(this).is(":checked") ? 1 : 0;
            bC[bD] = bE
        });
        bB.find(".m_option_val:visible").each(function() {
            var bD = $(this).prop("name");
            var bE = $(this).val();
            if (bD == "enforce_loginSD_info") {
                bE = bE.replace(/\s+/g, "")
            }
            bC[bD] = bE
        });
        var i = $("#countryCheckbox");
        if (i.length > 0) {
            var e = $(i).is(":checked");
            if (e) {
                bB.find("input.m_option_country:visible").each(function() {
                    var bD = $(this).attr("data-id");
                    var bE = $(this).is(":checked") ? 1 : 0;
                    bC[bD] = bE
                })
            }
        }
    }
    function bq(e) {
        var bC = true;
        if (ai() == "true" && e) {
            var i = $("#option_jbh").prop("checked") ? true : false;
            var bB = $("#option_password").prop("checked") ? $("#meeting_pass").val() : "";
            if (i && !bB) {
                $("#error_password").show().html($.i18n.get("jquery.validation_required")).css({
                    color: "#FF1E5A"
                });
                bC = false
            }
        }
        return bC
    }
    function at() {
        bl();
        $("#pmi_form").validate({
            onkeyup: false,
            rules: {
                pmi: {
                    required: true
                },
                meeting_pass: {
                    required: function() {
                        return $("#option_password").prop("checked")
                    }
                },
                mtg_alternative_host: {
                    multiemails: true
                },
                enforce_loginSD_info: {
                    multiemaildomains: true,
                    maxlength: 256
                }
            },
            messages: {
                pmi: {
                    required: $.i18n.get("meeting.require_pmi")
                },
                meeting_pass: {
                    required: $.i18n.get("meeting.enter_password")
                }
            },
            errorPlacement: function(e, i) {
                e.addClass("help-block");
                i.parent().append(e)
            },
            submitHandler: function() {
                if (!bq(true)) {
                    return false
                }
                if (!aG()) {
                    var bC = $("input[name=option_video_host]:checked").val();
                    var i = $("input[name=option_video_participants]:checked").val();
                    var bB = $("input[name=option_audio]:checked").val();
                    var e = false;
                    var bD = {
                        newPMI: $("#pmi").val().replace(/-/g, "").replace(/\s+/g, ""),
                        oldPMI: $("#meeting_number").val(),
                        option_jbh: $("#option_jbh").prop("checked") ? true : false,
                        option_video_host: bC ? bC : "on",
                        option_video_participants: i ? i : "on",
                        option_audio_type: bB ? bB : "both",
                        option_pac: e,
                        other_teleconf_info: $("#other_teleconf_info").val(),
                        password: $("#option_password").prop("checked") ? $("#meeting_pass").val() : "",
                        mtg_alternative_host: $("#mtg_alternative_host").val(),
                        user_id: $("#m_user_id").val(),
                        trackfields: aw(),
                        global_dialin_countries: $("#global_dialin_countries").val(),
                        tsp_account: r
                    };
                    U(bD);
                    if ($("#auth").length > 0) {
                        authVue.addAuthInfo(bD)
                    }
                    a4(bD);
                    bz($("#pmi_form"), bD);
                    checkPassword($("#meeting_pass"));
                    if (passErrorCount > 0) {
                        if ($("#meeting_pass").val()) {
                            $("#passwordErrorTips").show()
                        }
                        $("#meeting_pass").focus();
                        return false
                    }
                    SB.post3({
                        url: aA() + "savePmi",
                        data: bD,
                        success: function(bE) {
                            SB.saveSuccessCookie("edit");
                            if ($("#view_from_group").length > 0) {
                                SB.jump(aA(true) + bE.result + "?viewgid=" + $("#view_from_group").val())
                            } else {
                                SB.jump(aA(true) + bE.result)
                            }
                        },
                        error: function(bG, bE, bF) {
                            if (bF == 3402) {
                                $("#passwordErrorTips").show();
                                return
                            }
                            if (bF == 3403) {
                                $("#weakPasswordDetectionTips").show();
                                $("#password_container").addClass("has-error");
                                return
                            }
                            if (bG) {
                                if (bF == 1113 || bF == 1114 || bF == 1115) {
                                    w(false, $("#error_msg"), bE);
                                    w(true, $("#error_mtg_alternative_host"), bE)
                                } else {
                                    w(false, $("#error_mtg_alternative_host"), bE);
                                    w(true, $("#error_msg"), bE);
                                    return
                                }
                            } else {
                                w(false, $("#error_msg"), bE);
                                w(false, $("#error_mtg_alternative_host"), bE)
                            }
                        },
                        btnContainer: $("#pmi_form"),
                        showBusy: true
                    });
                    return false
                }
            }
        })
    }
    function az() {
        var bC = $.cookie("_zm_mtg_options");
        if (bC) {
            try {
                var bB = JSON.parse(bC);
                if (bB) {
                    var i = $("#m_has_account_settings").val();
                    if (i == "false") {
                        if (bB.o4) {
                            $("input[name=option_audio][value=" + bB.o4 + "]").prop("checked", true);
                            if (bB.o4 === "other" && $("#other_teleconf_info_container").length > 0) {
                                $("#other_teleconf_info_container").removeClass("hideme").show()
                            }
                            if (bB.o4 !== "telephony" && bB.o4 !== "both" && $("#show_tsp_info").length > 0) {
                                $("#show_tsp_info").hide()
                            }
                        }
                    }
                    if (bB.o8) {
                        r = bB.o8
                    } else {
                        bc()
                    }
                    if (bB.o9 && !aC.prop("checked")) {
                        $("input[name=option_autorec_val][value=" + bB.o9 + "]").prop("checked", true)
                    }
                }
            } catch (bD) {}
        } else {
            bc()
        }
    }
    function bi(i) {
        var e = {
            o1: i.option_jbh,
            o2: i.option_video_host,
            o3: i.option_video_participants,
            o4: i.option_audio_type,
            o5: i.option_rm,
            o6: i.with_pmi
        };
        if (i.tsp_account) {
            e.o8 = i.tsp_account
        }
        if (i.autorec) {
            e.o9 = i.autorec
        }
        $.cookie("_zm_mtg_options", JSON.stringify(e), {
            expires: 365,
            path: "/"
        })
    }
    function bo() {
        bl();
        $("#schedule_form").validate({
            onkeyup: false,
            rules: {
                topic: {
                    required: true
                },
                agenda: {
                    maxlength: 2000
                },
                start_date: {
                    required: true
                },
                start_time: {
                    required: true,
                    validate1224Hour: true
                },
                meeting_pass: {
                    required: function() {
                        return $("#option_password").prop("checked")
                    }
                },
                mtg_alternative_host: {
                    multiemails: true
                },
                enforce_loginSD_info: {
                    multiemaildomains: true,
                    maxlength: 1024
                },
                other_teleconf_info: {
                    maxlength: 65535
                },
                dailyInterval: {
                    max: 90
                },
                weeklyInterval: {
                    max: 12
                },
                monthlyInterval: {
                    max: 3
                },
                endTimes: {
                    max: 50
                },
                interpreter_email: {
                    required: true,
                    email: true,
                    notEqualEmail: true
                },
                second_language: {
                    required: true,
                    notEqualLanguage: true
                }
            },
            messages: {
                topic: {
                    required: $.i18n.get("meeting.require_topic")
                },
                start_date: {
                    required: $.i18n.get("meeting.require_start_date")
                },
                start_time: {
                    required: $.i18n.get("meeting.require_start_time")
                },
                meeting_pass: {
                    required: $.i18n.get("meeting.enter_password")
                },
                interpreter_email: {
                    required: $.i18n.get("meeting.require_email"),
                    notEqualEmail: $.i18n.get("meeting.repeat_email")
                },
                second_language: {
                    required: $.i18n.get("meeting.interpretation_language"),
                    notEqualLanguage: $.i18n.get("meeting.repeat_language")
                }
            },
            errorPlacement: function(bB, bC) {
                var i = bC.attr("id");
                var e = bC.attr("name");
                if ("dailyInterval" == i || "weeklyInterval" == i || "monthlyInterval" == i || "endTimes" == i) {
                    bB.addClass("interval-error");
                    bC.parents(".col-sm-9").append(bB)
                } else {
                    if ("endTimes" == i) {
                        bB.addClass("times-error");
                        bC.parents(".col-sm-9").append(bB)
                    } else {
                        if ("second_language" == e) {
                            bB.addClass("help-block");
                            bB.addClass("has-error");
                            bC.parent().parent().parent().append(bB)
                        } else {
                            bB.addClass("help-block");
                            bC.parent().append(bB)
                        }
                    }
                }
            },
            submitHandler: function() {
                if ($("#withPMI").length > 0 && $("#withPMI").is(":visible")) {
                    var bE = $("input[name=option_schedulewithpmi][value='on']").prop("checked") ? true : false;
                    if (!bq(bE)) {
                        return false
                    }
                }
                if ($("#option_additional_dcs").length > 0 && x && !L()) {
                    if (!x.addAdditionalDcs()) {
                        return false
                    }
                }
                if (!aG()) {
                    var bC = $("input[name=option_video_host]:checked").val();
                    var i = $("input[name=option_video_participants]:checked").val();
                    var bB = $("input[name=option_audio]:checked").val();
                    var e = false;
                    //var tz = (timezone_vue === undefined?'(GMT+9:00) 大阪、札幌、東京':timezone_vue.val);
                    var tz = '(GMT+9:00) 大阪、札幌、東京';
                    var bD = {
                        topic: $("#topic").val(),
                        agenda: $.trim($("#agenda").val()),
                        start_date: $("#start_date").val(),
                        start_time: getHHMM(),
                        start_time_2: getAMPM(),
                        timezone: tz,
                        schedule_for: $("#schedule_for").val(),
                        duration: parseInt($("#duration_hr").val(), 10) * 60 + parseInt($("#duration_min").val(), 10),
                        option_jbh: $("#option_jbh").prop("checked") ? true : false,
                        option_video_host: bC ? bC : "on",
                        option_video_participants: i ? i : "on",
                        option_audio_type: bB ? bB : "both",
                        other_teleconf_info: $("#other_teleconf_info").val(),
                        option_rm: $("#option_rm").prop("checked") ? true : false,
                        password: $("#option_password").prop("checked") ? $("#meeting_pass").val() : "",
                        mtg_alternative_host: $("#mtg_alternative_host").val(),
                        user_id: $("#m_user_id").val(),
                        needUpUserTZ: $("#needUpUserTZ").val(),
                        option_pac: e,
                        trackfields: aw(),
                        recurrence_setting: $("#recurrence").val(),
                        tsp_account: r,
                        option_public_calender_meeting: $("#option_public_calender_meeting").prop("checked") ? 1 : 0,
                        option_waiting_room: $("#option_waiting_room").prop("checked") ? 1 : 0,
                        global_dialin_countries: $("#global_dialin_countries").val(),
                        templateId: $("#template").val(),
                    };
                    if ($("#auth").length > 0) {
                        authVue.addAuthInfo(bD)
                    }
                    U(bD);
                    a4(bD);
                    if ($("#option_registration").length > 0) {
                        $.extend(bD, {
                            option_registration: $("#option_registration").prop("checked") ? true : false,
                            registrationRequiredType: $("input[name='registrationRequiredType']:checked").val()
                        })
                    }
                    if ($("#withPMI").length > 0 && $("#withPMI").is(":visible")) {
                        $.extend(bD, {
                            with_pmi: $("input[name=option_schedulewithpmi][value='on']").prop("checked") ? true : false
                        })
                    }
                    bz($("#schedule_form"), bD);
                    A(bD);
                    ay(bD);
                    checkPassword($("#meeting_pass"));
                    if (passErrorCount > 0) {
                        if ($("#meeting_pass").val()) {
                            $("#passwordErrorTips").show()
                        }
                        $("#meeting_pass").focus();
                        return false
                    }
                    aq(bD);
                    /*
                    SB.post3({
                        url: aA() + "save",
                        data: bD,
                        success: function(bF) {
                            SB.saveSuccessCookie("schedule");
                            bi(bD);
                            m();
                            if ($("#view_from_group").length > 0) {
                                SB.jump(aA(true) + bF.result + "?viewgid=" + $("#view_from_group").val())
                            } else {
                                SB.jump(aA(true) + bF.result)
                            }
                        },
                        error: function(bH, bF, bG) {
                            if (bG == 3402) {
                                $("#passwordErrorTips").show();
                                return
                            }
                            if (bG == 3403) {
                                $("#weakPasswordDetectionTips").show();
                                $("#password_container").addClass("has-error");
                                return
                            }
                            if (bH) {
                                if (bG == 1113 || bG == 1114 || bG == 1115) {
                                    w(false, $("#error_msg"), bF);
                                    w(true, $("#error_mtg_alternative_host"), bF)
                                } else {
                                    w(false, $("#error_mtg_alternative_host"), bF);
                                    w(true, $("#error_msg"), bF);
                                    return
                                }
                            } else {
                                w(false, $("#error_msg"), bF);
                                w(false, $("#error_mtg_alternative_host"), bF)
                            }
                        },
                        btnContainer: $("#schedule_form"),
                        showBusy: true
                    });
                    */
                    return false
                }
            }
        })
    }
    function w(bB, i, e) {
        if (bB) {
            i.text(e).show()
        } else {
            i.empty().hide()
        }
    }
    function bt() {
        bl();
        $("#schedule_pac_form").validate({
            rules: {
                topic: {
                    required: true
                },
                start_date: {
                    required: true
                },
                start_time: {
                    required: true,
                    validate1224Hour: true
                }
            },
            messages: {
                topic: {
                    required: $.i18n.get("meeting.require_topic")
                },
                start_date: {
                    required: $.i18n.get("meeting.require_start_date")
                },
                start_time: {
                    required: $.i18n.get("meeting.require_start_time")
                }
            },
            submitHandler: function() {
                if (!aG()) {
                    //var tz = (timezone_vue === undefined?'(GMT+9:00) 大阪、札幌、東京':timezone_vue.val);
                    var tz = '(GMT+9:00) 大阪、札幌、東京';
                    var e = {
                        topic: $("#topic").val(),
                        start_date: $("#start_date").val(),
                        start_time: getHHMM(),
                        start_time_2: getAMPM(),
                        timezone: tz,
                        duration: parseInt($("#duration_hr").val(), 10) * 60 + parseInt($("#duration_min").val(), 10),
                        option_jbh: false,
                        option_video_host: "off",
                        option_video_participants: "off",
                        option_audio_type: "both",
                        other_teleconf_info: "",
                        option_rm: false,
                        password: "",
                        user_id: $("#m_user_id").val(),
                        needUpUserTZ: $("#needUpUserTZ").val(),
                        option_pac: true,
                        selected_pac_account: $("#selected_pac_account").val(),
                        trackfields: aw(),
                        recurrence_setting: $("#recurrence").val()
                    };
                    if ($("#option_registration").length > 0) {
                        $.extend(e, {
                            option_registration: $("#option_registration").prop("checked") ? true : false,
                            registrationRequiredType: $("input[name='registrationRequiredType']:checked").val()
                        })
                    }
                    SB.post3({
                        url: aA() + "save",
                        data: e,
                        success: function(i) {
                            SB.saveSuccessCookie("schedule");
                            SB.jump(aA(true) + i.result)
                        },
                        btnContainer: $("#schedule_pac_form"),
                        showBusy: true
                    });
                    return false
                }
            }
        })
    }
    function aB() {
        bl();
        $("#pac_meeting_form").validate({
            rules: {
                topic: {
                    required: true
                },
                start_date: {
                    required: true
                },
                start_time: {
                    required: true,
                    validate1224Hour: true
                }
            },
            messages: {
                topic: {
                    required: $.i18n.get("meeting.require_start_topic")
                },
                start_date: {
                    required: $.i18n.get("meeting.require_start_date")
                },
                start_time: {
                    required: $.i18n.get("meeting.require_start_time")
                }
            },
            submitHandler: function() {
                if (!aG()) {
                    //var tz = (timezone_vue === undefined?'(GMT+9:00) 大阪、札幌、東京':timezone_vue.val);
                    var tz = '(GMT+9:00) 大阪、札幌、東京';
                    var e = {
                        number: $("#meeting_number").val(),
                        topic: $("#topic").val(),
                        start_date: $("#start_date").val(),
                        start_time: getHHMM(),
                        start_time_2: getAMPM(),
                        timezone: tz,
                        duration: parseInt($("#duration_hr").val(), 10) * 60 + parseInt($("#duration_min").val(), 10),
                        option_jbh: false,
                        option_video_host: "off",
                        option_video_participants: "off",
                        option_audio_type: "both",
                        other_teleconf_info: "",
                        option_rm: false,
                        password: "",
                        user_id: $("#m_user_id").val(),
                        needUpUserTZ: $("#needUpUserTZ").val(),
                        option_pac: true,
                        selected_pac_account: $("#selected_pac_account").val(),
                        trackfields: aw(),
                        recurrence_setting: $("#recurrence").val()
                    };
                    if ($("#option_registration").length > 0) {
                        $.extend(e, {
                            option_registration: $("#option_registration").prop("checked") ? true : false,
                            registrationRequiredType: $("input[name='registrationRequiredType']:checked").val()
                        })
                    }
                    SB.post3({
                        url: aA() + "save",
                        data: e,
                        success: function(i) {
                            SB.saveSuccessCookie("edit");
                            SB.jump(aA(true) + i.result)
                        },
                        btnContainer: $("#pac_meeting_form"),
                        showBusy: true
                    });
                    return false
                }
            }
        })
    }
    meetings.lockedTipDomStr = '<a class="locked_by_admin" aria-label="' + $.i18n.get("common.locked_by_admin") + '" href="javascript:void()"><span class="version-inner">' + $.i18n.get("common.locked_by_admin") + "</span></a>";
    var a5 = meetings.lockedTipDomStr;
    function a2() {
        aK = true;
        try {
            var bD = W();
            if (typeof bD == "undefined") {
                return false
            }
            if (bD.hostVideo_locked && bD.hostVideo_locked == "true") {
                if (bD.hostVideo && bD.hostVideo == "true") {
                    $("input[name=option_video_host][value=on]").prop("checked", true)
                } else {
                    $("input[name=option_video_host][value=off]").prop("checked", true)
                }
                aR($("input[name=option_video_host]").prop({
                    disabled: true
                }).parent("label").parent())
            }
            if (bD.pVideo_locked && bD.pVideo_locked == "true") {
                if (bD.pVideo && bD.pVideo == "true") {
                    $("input[name=option_video_participants][value=on]").prop("checked", true)
                } else {
                    $("input[name=option_video_participants][value=off]").prop("checked", true)
                }
                aR($("input[name=option_video_participants]").prop({
                    disabled: true
                }).parent("label").parent())
            }
            if (bD.jbh_locked && bD.jbh_locked == "true") {
                $("input[name=option_jbh]").prop("checked", bD.jbh == "true");
                aR($("input[name=option_jbh]").prop({
                    disabled: true
                }).parent("label").parent())
            }
            aT($("input[name=option_jbh]").prop("checked"), $("#jbhpriorTime").val());
            if (bD.audio_locked && bD.audio_locked == "true") {
                if (bD.audio) {
                    $("input[name=option_audio][value=" + bD.audio + "]").prop("checked", true);
                    if (bD.audio == "telephony" || bD.audio == "both") {
                        $("#globalDialinCountries").show();
                        $("#show_tsp_info").show()
                    } else {
                        $("#globalDialinCountries").hide();
                        $("#show_tsp_info").hide()
                    }
                    if (bD.audio == "other") {
                        $("#other_teleconf_info_container").show()
                    } else {
                        $("#other_teleconf_info_container").hide()
                    }
                }
                aR($("input[name=option_audio]").prop({
                    disabled: true
                }).parent("label").parent())
            }
            if (bD.thirdAudio_locked && bD.thirdAudio_locked == "true") {}
            if (bD.mute_locked && bD.mute_locked == "true") {
                $("input[name=option_mute_upon_entry]").prop("checked", bD.mute == "true");
                aR($("input[name=option_mute_upon_entry]").prop({
                    disabled: true
                }).parent("label"))
            }
            if ($("#auth").length > 0) {
                authVue.setMergedOptionForAuthAndWatermark(bD)
            }
            var bF = $("#option_public_calender_meeting");
            if (bF.length > 0) {
                if (bD.public_calendar_locked && bD.public_calendar_locked == "true") {
                    if (typeof bF.attr("data") == "undefined") {
                        bF.prop("checked", bD.public_calendar == "true")
                    }
                    aR(bF.prop({
                        disabled: true
                    }).parent("label"))
                }
            }
            var bC = $("#option_waiting_room");
            if (bC.length > 0) {
                if (bD.waitingRoom_locked && bD.waitingRoom_locked == "true") {
                    bC.prop("checked", bD.waitingRoom == "true");
                    aR(bC.prop({
                        disabled: true
                    }).parent("label"))
                }
            }
            var i = $("input[name=option_schedulewithpmi]");
            if ($("#schedule_form").length > 0 || $("#meeting_form").length > 0) {
                if ($("#withPMI").length > 0 && $("#withPMI").is(":visible")) {
                    if (('usePMISchedule_locked'in bD) && bD.usePMISchedule_locked == "true") {
                        meetings.chooseMeetingId(('usePMISchedule'in bD) && bD.usePMISchedule == "true");
                        aR(i.prop({
                            disabled: true
                        }).parent("label"))
                    }
                }
            }
            var bB = $("#option_password");
            if (bB.length > 0 && bg() && L()) {
                if (bD.password_locked && bD.password_locked == "true") {
                    bB.prop("checked", bD.password == "true");
                    j(bD.password == "true", bD.passwordVal);
                    bA(true)
                }
            }
            if (bD.password4PMI_locked && L()) {
                if (bD.password4PMI_locked == "true") {
                    bB.prop("checked", bD.password4PMI == "true");
                    j(bD.password4PMI == "true", bD.passwordVal);
                    bA(bD.password4PMI_locked && bD.password4PMI_locked == "true")
                }
            }
            if (bD.password4Schedule_locked && !L()) {
                if (bD.password4Schedule_locked && bD.password4Schedule_locked == "true") {
                    bB.prop("checked", bD.password4Schedule == "true");
                    j(bD.password4Schedule == "true", bD.passwordVal);
                    bA(true)
                }
            }
            meetings.showJbhPriorStartMeeting();
            var e = [];
            if (bD.showAdditionalDC) {
                e = JSON.parse(bD.showAdditionalDC)
            }
            if (e.length > 0) {
                $("#meet-dcs").removeClass("hideme")
            } else {
                $("#meet-dcs").addClass("hideme")
            }
        } catch (bE) {
            if (typeof console !== "undefined") {
                console.debug(bE)
            }
        }
        aK = false
    }
    function aR(e) {
        if (e.find(".locked_by_admin").length == 0) {
            e.append(a5)
        }
    }
    function D(e, bB) {
        var bC = by(bB);
        var bD = by(e);
        var i = aj(e);
        if (bC != bD && bD == "true") {
            Z(i)
        }
    }
    var aK = false;
    function bn(bD) {
        aK = true;
        try {
            if (typeof bD == "undefined") {
                bD = W()
            }
            if (typeof bD == "undefined") {
                return false
            }
            if (bD.hostVideo) {
                $("input[name=option_video_host][value=" + bD.hostVideo + "]").prop("checked", true);
                if (bD.hostVideo_locked && bD.hostVideo_locked == "true") {
                    aR($("input[name=option_video_host]").prop({
                        disabled: true
                    }).parent("label").parent())
                }
            }
            if (bD.pVideo) {
                $("input[name=option_video_participants][value=" + bD.pVideo + "]").prop("checked", true);
                if (bD.pVideo_locked && bD.pVideo_locked == "true") {
                    aR($("input[name=option_video_participants]").prop({
                        disabled: true
                    }).parent("label").parent())
                }
            }
            if (bD.audio) {
                $("input[name=option_audio][value=" + bD.audio + "]").prop("checked", true);
                if (bD.audio == "telephony" || bD.audio == "both") {
                    $("#globalDialinCountries").show();
                    $("#show_tsp_info").show()
                } else {
                    $("#globalDialinCountries").hide();
                    $("#show_tsp_info").hide()
                }
                if (bD.audio == "other") {
                    $("#other_teleconf_info_container").show()
                } else {
                    $("#other_teleconf_info_container").hide()
                }
                if (bD.audio_locked && bD.audio_locked == "true") {
                    aR($("input[name=option_audio]").prop({
                        disabled: true
                    }).parent("label").parent())
                }
            }
            if (bD.thirdAudio_locked && bD.thirdAudio_locked == "true") {}
            if (bD.jbh) {
                $("input[name=option_jbh]").prop("checked", bD.jbh == "true");
                if (bD.jbh_locked && bD.jbh_locked == "true") {
                    aR($("input[name=option_jbh]").prop({
                        disabled: true
                    }).parent("label").parent())
                }
                aT(bD.jbh == "true", bD.JBHPriorStartMeeting)
            }
            var bE = $("#template_id").val();
            if (bE == "" || bE == undefined) {
                if (typeof authVue != "undefined") {
                    authVue.setDefaultOptionForAuthAndWatermark(bD)
                }
            }
            if (bD.mute) {
                $("input[name=option_mute_upon_entry]").prop("checked", bD.mute == "true");
                if (bD.mute_locked && bD.mute_locked == "true") {
                    aR($("input[name=option_mute_upon_entry]").prop({
                        disabled: true
                    }).parent("label"))
                }
            }
            var bC = $("#option_public_calender_meeting");
            if (bC.length > 0) {
                if (bD.public_calendar) {
                    bC.prop("checked", bD.public_calendar == "true");
                    if (bD.public_calendar_locked && bD.public_calendar_locked == "true") {
                        aR(bC.prop({
                            disabled: true
                        }).parent("label"))
                    }
                }
            }
            var i = $("#option_waiting_room");
            if (i.length > 0) {
                i.prop("checked", bD.waitingRoom == "true");
                if (bD.waitingRoom_locked && bD.waitingRoom_locked == "true") {
                    aR(i.prop({
                        disabled: true
                    }).parent("label"))
                }
            }
            meetings.setScheduleWithPMI(bD);
            Z(bD);
            if (bD.interpretation == "true") {
                $("#interpretation_option").parent().removeClass("hideme")
            } else {
                $("#interpretation_option").parent().addClass("hideme")
            }
            var e = [];
            if (bD.showAdditionalDC) {
                e = JSON.parse(bD.showAdditionalDC)
            }
            if (e.length > 0) {
                $("#meet-dcs").removeClass("hideme")
            } else {
                $("#meet-dcs").addClass("hideme")
            }
        } catch (bB) {
            if (typeof console !== "undefined") {
                console.debug(bB)
            }
        }
        aK = false
    }
    function Z(bB) {
        var i = $("#option_password");
        if (bB.password) {
            if (i.length > 0 && (bg() || meetings.isPMIMeetingSetting(bB)) && L()) {
                var e = false;
                if (meetings.isPMIMeetingSetting(bB) && !bg()) {
                    e = bB.pmiJbhMPwd == "true"
                } else {
                    e = bB.password == "true"
                }
                i.prop("checked", e);
                j(e, bB.passwordVal);
                bA(bg() && bB.password_locked && bB.password_locked == "true")
            }
        }
        if (typeof bB.password4PMI !== "undefined" && L()) {
            i.prop("checked", bB.password4PMI == "true");
            j(bB.password4PMI == "true", bB.passwordVal);
            bA(bB.password4PMI_locked && bB.password4PMI_locked == "true")
        }
        if (bB.password4Schedule && !L()) {
            i.prop("checked", bB.password4Schedule == "true");
            j(bB.password4Schedule == "true", bB.passwordVal);
            bA(bB.password4Schedule_locked && bB.password4Schedule_locked == "true")
        }
    }
    function j(bB, i) {
        var e = $("#meeting_pass");
        if (bB) {
            e.show();
            if (bv && aQ()) {
                e.val(typeof i != "undefined" && $.trim(i).length > 0 ? $.trim(i) : "")
            } else {
                if (typeof i != "undefined" && $.trim(i).length > 0) {
                    e.val(i)
                }
            }
        } else {
            if (bv && aQ() && typeof e.data("userChgPmiPwd") === "undefined") {
                e.val(i)
            }
            e.hide()
        }
    }
    function aJ(e) {
        if (e) {
            $("#option_password").prop("checked", true).attr("disabled", true).change();
            bA(e)
        } else {
            $("#option_password").prop("checked", true).change()
        }
    }
    function aQ() {
        if ($("#schedule_form").length > 0 || $("#meeting_form").length > 0) {
            if ($("#withPMI").length > 0 && $("#withPMI").is(":visible")) {
                return $("input[name=option_schedulewithpmi][value='on']").prop("checked") ? true : false
            }
        }
        return false
    }
    $("input[name=option_schedulewithpmi]").change(function() {
        var bE = aQ();
        var e = {
            ignorePMI: true
        };
        if (bE) {
            var i = a3();
            i = Object.assign(i, e);
            bn(i);
            D(W(), a3())
        } else {
            $(".pmi-change-warning").hide();
            var i = W();
            i = Object.assign(i, e);
            if (bv) {
                bn(i)
            } else {
                a2(i);
                var bD = $("#enable_interpretation_option").val();
                if (bD && bD == "true") {
                    $("#interpretation_option").parent().removeClass("hideme")
                }
                if (x && x.additionalDcs.length > 0) {
                    $("#meet-dcs").removeClass("hideme")
                } else {
                    $("#meet-dcs").addClass("hideme")
                }
            }
            if (i.password4Schedule) {
                $("#option_password").prop("checked", i.password4Schedule == "true");
                j(i.password4Schedule == "true", i.passwordVal)
            }
            var bC = $("#responseToSingleOccurrence").val();
            var bB = i.password4Schedule_locked && i.password4Schedule_locked == "true" || bC == "true";
            bA(bB)
        }
    });
    function bA(e) {
        if (e) {
            $("#option_password").prop("disabled", true).change();
            if ($("#option_password").parent("label").find(".locked_by_admin").length == 0) {
                I($("#option_password").parent("label"), a5)
            }
        } else {
            $("#option_password").prop("disabled", false).change();
            $("#option_password").parent("label").find(".locked_by_admin").remove()
        }
    }
    function ai() {
        if (ba == null) {
            return S
        }
        return ba
    }
    function s() {
        if (aS == null) {
            return aX
        }
        return aS
    }
    function aT(i, e) {
        if (typeof jbhPriorStartMeetingIdObj !== "undefined") {
            jbhPriorStartMeetingIdObj.jbh = i;
            if (typeof e != "undefined") {
                jbhPriorStartMeetingIdObj.jbhPriorTime = e
            }
        }
    }
    $("#option_jbh").change(function() {
        var bC = bg();
        aT(bC);
        if ($("#m_newRecurrence").length > 0 && $("#m_newRecurrence").val() === "on") {
            return
        }
        var bB = L();
        var i = W();
        if (s() == "true" && bB) {
            var bD = i.password_locked == "true";
            if (bC) {
                var e = $("#option_password").prop("checked");
                if (e) {
                    bA(bD)
                } else {
                    aJ(bD)
                }
            } else {
                $("#option_password").prop("disabled", false).change();
                bA(false)
            }
        }
    });
    function I(i, e) {
        if (i != null && i.find(".locked_by_admin").length == 0) {
            i.append(e)
        }
    }
    function L() {
        var e = false;
        if ($("#schedule_form").length > 0 || $("#meeting_form").length > 0) {
            e = aQ()
        } else {
            if ($("#pmi_form").length > 0) {
                e = true
            }
        }
        return e
    }
    function bg() {
        return $("#option_jbh").prop("checked")
    }
    function bm() {
        return generateMeetingPasswordByAccount()
    }
    if ($("#pmi_form").length > 0) {
        at()
    }
    if ($("#meeting_form").length > 0) {
        bb();
        a2();
        if (L()) {
            $("#interpretation_option").parent().addClass("hideme");
            $("#meet-dcs").addClass("hideme")
        }
    }
    if ($("#pmi_form").length > 0) {
        a2();
        $("#interpretation_option").parent().addClass("hideme");
        $("#meet-dcs").addClass("hideme")
    }
    if ($("#schedule_form").length > 0) {
        bo();
        az();
        var a0 = W();
        if (aQ() || a0 && typeof a0 != null && a0.usePMISchedule == "true") {
            meetings.chooseMeetingId(true);
            var bd = a3();
            a0 = Object.assign(a0, bd);
            a0.isPMIMeetingSetting = undefined;
            bn(a0);
            D(W(), bd)
        } else {
            bn()
        }
        if (L()) {
            $("#interpretation_option").parent().addClass("hideme");
            $("#meet-dcs").addClass("hideme")
        }
    }
    if ($("#schedule_pac_form").length > 0) {
        bt()
    }
    if ($("#pac_meeting_form").length > 0) {
        aB()
    }
    function W() {
        return meetings.getUserSettingOptions()
    }
    function a3() {
        var bC = $("#schedule_for option:selected").val();
        var i = "{}";
        if (bC == "") {
            i = $("#m_default_pmi_meeting_setting").val()
        } else {
            i = $("#m_pmi_meeting_setting").val()
        }
        var bB = {};
        if (i != null && typeof i != "undefined" && $.trim(i).length > 0) {
            try {
                bB = JSON.parse(i)
            } catch (bD) {
                console.log(bD)
            }
        }
        return bB
    }
    function by(e) {
        if (e == null) {
            return "false"
        }
        if (e.password) {
            return e.password
        } else {
            return e.password4PMI
        }
    }
    function aj(e) {
        if (e == null) {
            return {}
        }
        var i = {};
        if (e.password) {
            $.extend(i, {
                password: e.password
            })
        } else {
            $.extend(i, {
                password4PMI: e.password4PMI
            })
        }
        return i
    }
    if ($("#switchPacBtn").length > 0) {
        $("#switchPacBtn").click(function() {
            var e = $("#selected_pac_account").val();
            if (e === "pac2") {
                $("#selected_pac_account").val("pac1");
                $(".pac1-number-list").show();
                $(".pac2-number-list").hide();
                $(this).text($.i18n.get("pac.account_2_settings"));
                $("#pac_meeting_number").text($("#pac1_number").val());
                if ($("#pac1_password").val().trim().length > 0) {
                    $("#pac_meeting_pwd").text($("#pac1_password").val());
                    $("#pac-pwd-sec").show();
                    if ($("#pac1_listen_password").val().trim().length > 0) {
                        $("#pac_listen_meeting_pwd").text($("#pac1_listen_password").val());
                        $("#pac-listen-pwd-sec").show()
                    } else {
                        $("#pac-listen-pwd-sec").hide()
                    }
                } else {
                    $("#pac-pwd-sec").hide();
                    $("#pac-listen-pwd-sec").hide()
                }
            } else {
                $("#selected_pac_account").val("pac2");
                $(".pac1-number-list").hide();
                $(".pac2-number-list").show();
                $(this).text($.i18n.get("pac.account_1_settings"));
                $("#pac_meeting_number").text($("#pac2_number").val());
                if ($("#pac2_password").val().trim().length > 0) {
                    $("#pac_meeting_pwd").text($("#pac2_password").val());
                    $("#pac-pwd-sec").show();
                    if ($("#pac2_listen_password").val().trim().length > 0) {
                        $("#pac_listen_meeting_pwd").text($("#pac2_listen_password").val());
                        $("#pac-listen-pwd-sec").show()
                    } else {
                        $("#pac-listen-pwd-sec").hide()
                    }
                } else {
                    $("#pac-pwd-sec").hide();
                    $("#pac-listen-pwd-sec").hide()
                }
            }
        })
    }
    if (aU && p) {
        if ($("#schedule_form").length > 0) {
            if (r === "tsp1") {
                $("#tsp_account_info2").hide();
                $("#tsp_account_info1").show()
            } else {
                $("#tsp_account_info1").hide();
                $("#tsp_account_info2").show()
            }
        }
        $("#use_tsp1").click(function() {
            $("#tsp_account_info2").hide();
            $("#tsp_account_info1").show();
            r = "tsp1"
        });
        $("#use_tsp2").click(function() {
            $("#tsp_account_info1").hide();
            $("#tsp_account_info2").show();
            r = "tsp2"
        })
    }
    var af = $("#enable_tsp").length > 0;
    if (af) {
        if ($("#tsp_account").length > 0) {
            var au = $("#tsp_account").val();
            r = au;
            if (au === "tsp1") {
                $("#tsp_account_info2").hide();
                $("#tsp_account_info1").show()
            } else {
                $("#tsp_account_info1").hide();
                $("#tsp_account_info2").show()
            }
        } else {
            bc()
        }
    }
    function bc() {
        if (aU) {
            r = "tsp1"
        } else {
            if (p) {
                r = "tsp2"
            }
        }
    }
    function aA(e) {
        if ($("#m_user_id").length > 0) {
            if (e && $("#access_user_baseurl").length == 1) {
                return $("#access_user_baseurl").val() + "/" + $("#m_user_id").val() + "/meeting/"
            }
            return "/user/" + $("#m_user_id").val() + "/meeting/"
        } else {
            return "/meeting/"
        }
    }
    $(window).resize(function() {
        var e = $(document.body).outerWidth(true);
        if (e < 490) {
            e = parseInt(e) - 70;
            $("#s2id_timezone").css({
                width: e
            });
            $("#s2id_schedule_for").css({
                width: e
            })
        }
    });
    var bk = $("#detailPacCopyInviteDialog");
    bk.find(".select-all").click(function() {
        $("#invite_email").select();
        document.execCommand("copy");
        SB.showSuccessMsg($.i18n.get("webinar.info.copyied.clipboard"), bk.find(".alert-success"))
    });
    var aY = $("#copyPacInvitation");
    if (aY.length > 0) {
        aY.click(function() {
            var e = $.trim($(this).attr("data-id"));
            t(e, false)
        })
    }
    var T = $("#copyListenInvitation");
    if (T.length > 0) {
        T.click(function() {
            var e = $.trim($(this).attr("data-id"));
            t(e, true)
        })
    }
    var t = function(i, e) {
        var bB = {
            meeting_number: i,
            listen_only: e
        };
        SB.post3({
            url: "/meeting/pacInviteEmail",
            data: bB,
            success: function(bC) {
                $.modal(bk, $.extend({}, SB.MODAL_DEFAULTS, {
                    overlayId: "copy-invite-dialog-overlay",
                    containerId: "copy-invite-dialog-container",
                    persist: true,
                    overlayClose: true,
                    maxHeight: 750,
                    minWidth: 630,
                    onShow: function() {
                        bk.find("#invite_email").text(bC.result.scheduleEmail)
                    }
                }))
            },
            error: function(bC, bD) {
                if (bC) {
                    SB.alert(bD)
                }
            },
            showBusy: false
        })
    };
    var aG = function() {
        var e = false;
        $("div[name=trackfielderror]").remove();
        $("input[name=trackfield]").each(function(i, bB) {
            if ("true" == $(this).attr("require") && $(this).val().trim() == "") {
                $("<div name='trackfielderror'><span style='color:red;'>" + K + "</span></div>").insertAfter($(this.parentNode));
                e = true;
                $(this).focus();
                return false
            }
        });
        return e
    };
    var aw = function() {
        var e = [];
        $("input[name=trackfield]").map(function() {
            if ($(this).val().trim() != "") {
                e.push({
                    id: this.id,
                    mtValue: $(this).val()
                })
            }
        });
        if (e.length > 0) {
            return JSON.stringify(e)
        }
        return ""
    };
    function aF(e, i) {
        if (e != "0") {
            if (e.length < 9) {
                e = aP(9 - e.length) + e
            }
            if (e.length == 11) {
                return e.substring(0, 3) + i + e.substring(3, 7) + i + e.substring(7)
            }
            return e.substring(0, 3) + i + e.substring(3, 6) + i + e.substring(6)
        }
        return ""
    }
    function aP(bC) {
        var e = "";
        if (bC <= 0) {
            return ""
        }
        for (var bB = 0; bB < bC; bB++) {
            e += "0"
        }
        return e
    }
    $("#mHostId_Container ul li a").click(function(bB) {
        var bD = $(bB.target).attr("data-id");
        var bE = $(bB.target).text();
        $("#mHostIdSelect").val(bD);
        $("#mHostIdSelectName").text(bE);
        var i = $("#meetingsType").val().trim();
        var bC = [];
        if (i != "upcoming") {
            bC.push("type=" + i)
        }
        if (bD) {
            bC.push("hostId=" + bD)
        }
        if (bC.length) {
            SB.jump("/meeting?" + bC.join("&"))
        } else {
            SB.jump("/meeting")
        }
        return false
    });
    $("#tab_container ul li a").click(function(i) {
        $("#tab_container ul li").removeClass("active");
        $(i.target).parent().addClass("active");
        $("#registrationTab").addClass("hideme");
        $("#emailSettingsTab").addClass("hideme");
        $("#brandingTab").addClass("hideme");
        $("#pollTab").addClass("hideme");
        $("#liveStreamingTab").addClass("hideme");
        var bB = $(i.target).parent().attr("data-for");
        $("#" + bB).removeClass("hideme")
    });
    var l = $("#editRecurrenceMeetingDialog");
    $("#btnShowEditRecurrenceDialog").click(function(i) {
        $("#edit_meeting_number").val($(i.target).attr("data-id"));
        $("#edit_meeting_occurrence").val($(i.target).attr("data-s"));
        $.modal(l, $.extend({}, SB.MODAL_DEFAULTS, {
            overlayId: "edit-recurrence-meeting-dialog-overlay",
            containerId: "edit-recurrence-meeting-dialog-container",
            persist: true,
            minHeight: l.outerHeight(),
            onShow: function() {}
        }))
    });
    $("#btnEditThisOccurrence").click(function(bB) {
        var i = aA(false) + $("#edit_meeting_number").val() + "/edit?occurrence=" + $("#edit_meeting_occurrence").val();
        if ($("#view_from_group").length > 0) {
            i = i + "&viewgid=" + $("#view_from_group").val()
        }
        SB.jump(i)
    });
    $("#btnEditAllOccurrences").click(function(bB) {
        var i = aA(false) + $("#edit_meeting_number").val() + "/edit";
        if ($("#view_from_group").length > 0) {
            i = i + "?viewgid=" + $("#view_from_group").val()
        }
        SB.jump(i)
    });
    $("#see_all_domain").click(function() {
        $.modal($("#upload_domains_all"), $.extend({}, SB.MODAL_DEFAULTS, {
            overlayId: "schedule-dialog-overlay",
            containerId: "schedule-dialog-container",
            persist: true,
            minHeight: 501,
            onShow: function() {}
        }))
    });
    $("a.sort-headers").click(function() {
        var e = window.location.href;
        var bJ = $(this);
        var bI = bJ.attr("data");
        var bB = true;
        if (bJ.find("span.sort-headers").hasClass("sorting_asc")) {
            bB = false
        }
        var bD = e.split("?");
        if (bD.length == 1) {
            e = e + "?sortBy=" + bI + "&sortAsc=" + bB
        } else {
            var bC = bD[1].split("&");
            var bF = new Array();
            var bG = false;
            var bH = false;
            for (var bE in bC) {
                if (bC[bE].indexOf("sortAsc=") >= 0) {
                    bH = true;
                    bF.push("sortAsc=" + bB)
                } else {
                    if (bC[bE].indexOf("sortBy=") >= 0) {
                        bG = true;
                        bF.push("sortBy=" + bI)
                    } else {
                        if (bC[bE].indexOf("p=") >= 0) {} else {
                            bF.push(bC[bE])
                        }
                    }
                }
            }
            if (!bG) {
                bF.push("sortBy=" + bI)
            }
            if (!bH) {
                bF.push("sortAsc=" + bB)
            }
            bD[1] = bF.join("&");
            e = bD.join("?")
        }
        window.location.href = e;
        return false
    });
    var ar = $("#configLiveStreamUrl");
    $("#configStreamUrlId").attr({
        "aria-modal": "true",
        "aria-labelledby": "configStreamUrlId stream-title"
    });
    $("#configStreamUrlId").click(function() {
        V()
    });
    function V() {
        c();
        $.modal(ar, $.extend({}, SB.MODAL_DEFAULTS, {
            overlayId: "config-live-stream-dialog-overlay",
            containerId: "config-live-stream-dialog-container",
            persist: true,
            minHeight: ar.outerHeight(),
            onShow: function() {
                n()
            },
            onClose: function() {
                $.modal.close();
                setTimeout(function() {
                    $("#configStreamUrlId").focus()
                })
            }
        }))
    }
    function n() {
        var e = window.setInterval(function() {
            $(".live-instruction textarea").trigger("change")
        }, 50);
        window.setTimeout(function() {
            window.clearInterval(e);
            $("#configLiveStreamUrl .modal-header>h3").focus()
        }, 500)
    }
    function c() {
        N.resetForm();
        aE();
        $(".hide-key-section").show();
        $(".show-key-section").hide();
        ar.find(".alert-danger").hide();
        ar.find(".form-group").removeClass("has-error");
        ar.find("#stream_url").val(ar.find("#stream_url_bk").val());
        ar.find("#stream_key_h").val(ar.find("#stream_key_bk").val());
        ar.find("#stream_key_s").val(ar.find("#stream_key_bk").val());
        ar.find("#live_url").val(ar.find("#live_url_bk").val())
    }
    var b = $("#h323EncryEnabled").val() === "true";
    var aW = $("#h323EncryLocked").val() === "true";
    $("#stream_url").keyup(function() {
        ac()
    });
    function ac() {
        var e = $("#stream_url").val().trim();
        if (e.length > 5) {
            if (e.toLocaleLowerCase().indexOf("rtmps") === -1) {
                if (b && !aW) {
                    $("#h323Tips").removeClass("hideme")
                } else {
                    if (b && aW) {
                        $("#h323Tips").removeClass("hideme");
                        $("#h323Tips").addClass("help-block-streamUrl");
                        $("#stream_url_div").addClass("has-error");
                        $("#h323TipsIcon").removeClass("zm-icon-warning-outline");
                        $("#conf_live_stream_url_save").prop("disabled", true)
                    }
                }
            } else {
                aE()
            }
        } else {
            aE()
        }
    }
    function aE() {
        $("#h323Tips").addClass("hideme");
        $("#h323Tips").removeClass("help-block-streamUrl");
        $("#stream_url_div").removeClass("has-error");
        $("#h323TipsIcon").addClass("zm-icon-warning-outline");
        $("#conf_live_stream_url_save").prop("disabled", false)
    }
    $("#conf_live_stream_url_save").click(function() {
        var i = $(this);
        if (ar.valid()) {
            var e = {
                stream_url: ar.find("#stream_url").val().trim(),
                stream_key: ar.find("#stream_key_h").val(),
                live_url: ar.find("#live_url").val().trim(),
                number: $("#meeting_number").val()
            };
            SB.post3({
                url: aA() + "channel/config",
                data: e,
                success: function() {
                    SB.saveSuccessCookie("liveStreamingSuccess");
                    location.reload(true)
                },
                btn: i,
                showBusyAfter: false,
                error: function(bB, bC) {
                    if (bB) {
                        ar.find(".alert-danger").text(bC);
                        ar.find(".alert-danger").show()
                    }
                }
            })
        }
    });
    var N = ar.validate({
        rules: {
            stream_url: {
                required: true
            },
            stream_key_h: {
                required: true
            },
            stream_key_s: {
                required: true
            },
            live_url: {
                required: true,
                url: true
            }
        }
    });
    $(".dialog-stream-key span.key-pairs-h").click(function() {
        $(".hide-key-section").hide();
        $(".hide-key-section").removeClass("has-error");
        $(".show-key-section").show()
    });
    $(".dialog-stream-key span.key-pairs-s").click(function() {
        $(".hide-key-section").show();
        $(".show-key-section").hide();
        $(".show-key-section").removeClass("has-error")
    });
    $("#stream_key_h").change(function() {
        var e = $(this);
        $("#stream_key_s").val(e.val())
    });
    $("#stream_key_s").change(function() {
        var e = $(this);
        $("#stream_key_h").val(e.val())
    });
    $("#liveCustomConfigEditId").click(function() {
        V()
    });
    $("#hide-key-id").click(function() {
        $(".live-config-info .hide-key").hide();
        $(".live-config-info .show-key").show()
    });
    $("#show-key-id").click(function() {
        $(".live-config-info .hide-key").show();
        $(".live-config-info .show-key").hide()
    });
    $(document).on("change", ".live-instruction textarea", function() {
        $(this).outerHeight(38).outerHeight(this.scrollHeight)
    });
    window.addEventListener("resize", function(e) {
        $(".live-instruction textarea").trigger("change")
    });
    var o = $("#saveMeetingTemplateDialog");
    $(".saveMeetingTemplate").attr({
        "aria-modal": "true",
        "aria-labelledby": "saveMeetingTemplate saveMeetingTemplateDialog_title"
    });
    $(".saveMeetingTemplate").click(function() {
        var i = $(this);
        var e = i.attr("data-s");
        var bB = i.attr("data-id");
        o.find("#meetingNumberTemplate").val(bB);
        $.modal(o, $.extend({}, SB.MODAL_DEFAULTS, {
            overlayId: "save-meeting-template-dialog-overlay",
            containerId: "save-meeting-template-dialog-container",
            escClose: true,
            persist: true,
            minHeight: o.outerHeight(),
            onShow: function() {
                o.find("#template_name").val();
                $(".save-template").show();
                $(".overwrite-template").hide();
                $(".max-template").hide();
                setTimeout(function() {
                    $("#saveMeetingTemplateDialog .modal-header>h3").focus()
                }, 300)
            },
            onClose: function() {
                $.modal.close();
                setTimeout(function() {
                    $(".saveMeetingTemplate").focus()
                })
            }
        }))
    });
    o.find(".save").click(function() {
        var e = o.find("#template_name").val();
        var bC = $("#save_recurrence");
        var bB = false;
        if (bC.length > 0) {
            bB = bC.prop("checked")
        }
        var i = $("#meetingNumberTemplate").val();
        SB.post3({
            url: "/meeting/" + i + "/savetemplate",
            data: {
                template_name: e,
                is_save_recurrence: bB
            },
            success: function(bD) {
                $.modal.close();
                SB.showSuccessMsg($.i18n.get("js_webinar.info_save_template_success"))
            },
            error: function(bF, bD, bE) {
                if (bE == 404) {
                    location.reload(true)
                }
                if (bE == 3066) {
                    $("#existedTemplate").text($.i18n.get("webinar.info_exist_template", e));
                    $(".save-template").hide();
                    $(".overwrite-template").show();
                    $(".max-template").hide()
                }
                if (bE == 3067) {
                    $(".save-template").hide();
                    $(".overwrite-template").hide();
                    $(".max-template").show()
                }
            },
            btnContainer: o,
            showBusy: true
        })
    });
    $("#template").change(function() {
        var e = $(this);
        var i = e.val();
        if (i.length > 10) {
            g(i);
            $("#withPMI").addClass("hideme")
        } else {
            $("#template_id").val("");
            $("#withPMI").removeClass("hideme");
            az()
        }
    });
    var u = function(e) {
        if ($("#option_video_host_on").prop("disabled") || $("#option_video_host_off").prop("disabled")) {
            return
        }
        if (e) {
            $("#option_video_host_on").prop("checked", true);
            $("#option_video_host_off").prop("checked", false)
        } else {
            $("#option_video_host_on").prop("checked", false);
            $("#option_video_host_off").prop("checked", true)
        }
    };
    var h = function(e) {
        if ($("#option_video_panelist_on").prop("disabled") || $("#option_video_panelist_off").prop("disabled")) {
            return
        }
        if (e) {
            $("#option_video_participant_on").prop("checked", true);
            $("#option_video_participant_off").prop("checked", false)
        } else {
            $("#option_video_participant_on").prop("checked", false);
            $("#option_video_participant_off").prop("checked", true)
        }
    };
    var bf = function(e) {
        if ($("#option_audio_telephony").prop("disabled") || $("#option_audio_voip").prop("disabled")) {
            return
        }
        var bB = $("#option_audio_both");
        var bE = bB.length > 0;
        var i = $("#option_audio_other");
        var bC = i.length > 0;
        var bD = $("#isOtherTeleConfEnabled").val();
        if (bD || e === "other") {
            $("#other_teleconf_info_container").show()
        } else {
            $("#other_teleconf_info_container").hide()
        }
        if (e === "telephony") {
            $("#option_audio_telephony").prop("checked", true);
            $("#option_audio_voip").prop("checked", false);
            if (bE) {
                bB.prop("checked", false)
            }
            if (bC) {
                i.prop("checked", false)
            }
            $("#globalDialinCountries").show();
            $("#other_teleconf_info_container").hide()
        } else {
            if (e === "voip") {
                $("#option_audio_telephony").prop("checked", false);
                $("#option_audio_voip").prop("checked", true);
                if (bE) {
                    bB.prop("checked", false)
                }
                if (bC) {
                    i.prop("checked", false)
                }
                $("#globalDialinCountries").hide();
                $("#other_teleconf_info_container").hide();
                $("#show_tsp_info").hide()
            } else {
                if (e === "both") {
                    if (bE) {
                        bB.prop("checked", true);
                        $("#option_audio_telephony").prop("checked", false)
                    } else {
                        $("#option_audio_telephony").prop("checked", true)
                    }
                    $("#option_audio_voip").prop("checked", false);
                    if (bC) {
                        i.prop("checked", false)
                    }
                    $("#globalDialinCountries").show();
                    $("#other_teleconf_info_container").hide()
                } else {
                    if (e === "other") {
                        if (bC) {
                            i.prop("checked", true);
                            $("#option_audio_voip").prop("checked", false);
                            $("#option_audio_telephony").prop("checked", false);
                            if (bE) {
                                bB.prop("checked", false)
                            }
                        } else {
                            $("#option_audio_telephony").prop("checked", true);
                            $("#option_audio_voip").prop("checked", false);
                            if (bE) {
                                bB.prop("checked", false)
                            }
                        }
                        $("#globalDialinCountries").hide();
                        $("#other_teleconf_info_container").show()
                    }
                }
            }
        }
    };
    var ab = function(e) {
        if (e) {
            $("#mt_time").show()
        } else {
            $("#mt_time").hide()
        }
    };
    var f = function(e) {
        if (typeof e !== "undefined" && e.length > 0) {
            $("#show_tsp_info").show();
            if (e === "tsp1") {
                $("#tsp_account_info2").hide();
                $("#tsp_account_info1").show()
            } else {
                $("#tsp_account_info1").hide();
                $("#tsp_account_info2").show()
            }
        }
    };
    if ($("#option_additional_dcs").length > 0) {
        var G = $("#additional_dcs").val();
        if (typeof G == "undefined" || G == "") {
            G = "[]"
        }
        var aa = JSON.parse(G);
        bs(aa)
    }
    var x;
    function bs(e) {
        var i = [];
        e.forEach(function(bB) {
            i.push({
                displayName: bB.name,
                key: bB.key,
                dcValue: bB.checked
            })
        });
        x = new Vue({
            el: "#additionalDcSubOption",
            data: {
                additionalDcs: i
            },
            methods: {
                dcCheck: function(bB) {
                    if (bB.dcValue) {
                        $("#additionalDCError").hide()
                    }
                },
                addAdditionalDcs: function(bD) {
                    if ($("#option_additional_dcs").length > 0) {
                        var bC = $("#option_additional_dcs").prop("checked") ? true : false;
                        var bB = false;
                        x.additionalDcs.forEach(function(bE) {
                            bB = bB || bE.dcValue
                        });
                        if (bC && !bB) {
                            $("#additionalDCError").show();
                            return false
                        }
                    }
                    return true
                }
            }
        })
    }
    $("#option_additional_dcs").change(function() {
        a9()
    });
    a9();
    function a9() {
        if ($("#option_additional_dcs").prop("checked")) {
            $("#additionalDcSubOption").removeClass("hideme")
        } else {
            $("#additionalDcSubOption").addClass("hideme")
        }
    }
    function aq(i) {
        if (L()) {
            $.extend(i, {
                enable_additional_dcs: false
            })
        } else {
            if ($("#option_additional_dcs").length > 0) {
                $.extend(i, {
                    enable_additional_dcs: $("#option_additional_dcs").prop("checked") ? true : false,
                });
                var e = [];
                x.additionalDcs.forEach(function(bB) {
                    e.push({
                        key: bB.key,
                        checked: bB.dcValue
                    })
                });
                $.extend(i, {
                    additional_dcs: JSON.stringify(e)
                })
            }
        }
    }
    function bh(e) {
        if (typeof e == "undefined") {
            e = $("#additional_dcs").val()
        }
        if (typeof e == "undefined" || e == "") {
            e = "[]"
        }
        G = JSON.parse(e);
        var i = [];
        G.forEach(function(bB) {
            i.push({
                displayName: bB.name,
                key: bB.key,
                dcValue: bB.checked
            })
        });
        x.additionalDcs = i;
        if (G.length > 0) {
            $("#meet-dcs").removeClass("hideme")
        } else {
            $("#meet-dcs").addClass("hideme");
            $("#option_additional_dcs").prop("checked", false);
            a9()
        }
        if (L()) {
            $("#meet-dcs").addClass("hideme")
        }
    }
    var o = $("#saveMeetingTemplateDialog");
    o.find(".change").click(function() {
        $(".save-template").show();
        $(".overwrite-template").hide();
        $(".max-template").hide()
    });
    o.find(".overwrite").click(function() {
        var e = false;
        var i = $("#save_recurrence");
        if (i.length > 0) {
            e = i.prop("checked")
        }
        SB.post3({
            url: "/meeting/" + $("#meeting_number").val() + "/savetemplate",
            data: {
                overwrite: true,
                is_save_recurrence: e,
                template_name: o.find("#template_name").val()
            },
            success: function(bB) {
                SB.showSuccessMsg($.i18n.get("js_webinar.info_save_template_success"))
            },
            btnContainer: o,
            showBusy: true
        })
    });
    var g = function(e) {
        if (e.length > 10) {
            SB.post3({
                url: "/meeting/template/" + e + "/load",
                data: {},
                success: function(i) {
                    if (i.result.hasOwnProperty("topic")) {
                        $("#tem_schedule_flag").val("is_tem_schedule");
                        $("#template_id").val(e);
                        $("#topic").val(i.result.topic);
                        $("#agenda").val(i.result.agenda);
                        $("#option_rm").prop("checked", i.result.newRecurrence || i.result.classicRecurrence);
                        $("#duration_hr").val(i.result.duration_hr).trigger("change");
                        $("#duration_min").val(i.result.duration_min).trigger("change");
                        timezone_vue.val = i.result.timezone;
                        $("#option_registration").prop("checked", i.result.registrationEnabled);
                        $("#option_public_calender_meeting").prop("checked", i.result.isEnableMeeting2Public);
                        if ($("#option_video_host_row .locked_by_admin").length === 0) {
                            u(i.result.optionVideoHost)
                        }
                        if ($("#option_video_participant_row .locked_by_admin").length === 0) {
                            h(i.result.optionVideoParticipants)
                        }
                        bf(i.result.optionAudioType);
                        if (i.result.optionAudioType !== "voip" && $("#audio_row .locked_by_admin").length === 0) {
                            f(i.result.tsp_account)
                        }
                        if (i.result.password !== "") {
                            $("#option_password").prop("checked", true);
                            $("#meeting_pass").val(i.result.password).show()
                        } else {
                            $("#option_password").prop("checked", false);
                            $("#meeting_pass").hide()
                        }
                        if (!$("#option_jbh").prop("disabled")) {
                            $("#option_jbh").prop("checked", i.result.optionJBH)
                        }
                        if (!$("#option_mute_upon_entry").prop("disabled")) {
                            $("#option_mute_upon_entry").prop("checked", i.result.optionMuteUponEntry)
                        }
                        if (!$("#option_waiting_room").prop("disabled")) {
                            $("#option_waiting_room").prop("checked", i.result.optionWaitingRoom)
                        }
                        if ($("#auth").length > 0) {
                            authVue.reloadAuth4Template(i)
                        }
                        if (i.result.classicRecurrence) {
                            $("#recurrence").val(i.result.recurrenceSettings);
                            $("#recurrence").attr("data-s", i.result.recurrenceSettings);
                            $(document).trigger("changeClassicRecurrence");
                            $(".registrationRequiredType").hide();
                            hideDemand()
                        } else {
                            if (i.result.newRecurrence) {
                                $("#recurrence").val(i.result.recurrenceSettings);
                                $("#recurrence").attr("data-s", i.result.recurrenceSettings);
                                $(document).trigger("changeNewRecurrence");
                                if (i.result.registrationEnabled) {
                                    $(".registrationRequiredType").show();
                                    $("input[name='registrationRequiredType']").each(function() {
                                        if ($(this).val() === i.result.registrationRequiredType) {
                                            $(this).prop("checked", true)
                                        } else {
                                            $(this).prop("checked", false)
                                        }
                                    })
                                } else {
                                    $(".registrationRequiredType").hide()
                                }
                            } else {
                                ab(true);
                                $("#option_rm").prop("checked", false);
                                $("#recurrenceDialog").addClass("hideme");
                                $("#recurrence").val("");
                                $("#recurrence").attr("data-s", "");
                                $(".recurrence_desc").hide();
                                $(".registrationRequiredType").hide()
                            }
                        }
                        if (i.result.autorecVal === "local") {
                            $("#option_autorec").prop("checked", true);
                            $(".sub-options").show();
                            $("#option_autorec_local").prop("checked", true)
                        } else {
                            if (i.result.autorecVal === "cloud") {
                                $("#option_autorec").prop("checked", true);
                                $(".sub-options").show();
                                $("#option_autorec_cloud").prop("checked", true)
                            } else {
                                $("#option_autorec").prop("checked", false);
                                $(".sub-options").hide();
                                $("#option_autorec").prop("checked", false);
                                $("#option_autorec_cloud").prop("checked", false)
                            }
                        }
                        $("#tem_schedule_flag").val("")
                    }
                },
                error: function(bC, i, bB) {},
                showBusy: false
            })
        }
    };
    bw = false
});

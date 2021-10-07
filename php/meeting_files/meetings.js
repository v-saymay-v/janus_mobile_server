meetings = typeof meetings == "undefined" ? {} : meetings;
meetings.getUserSettingOptions = function() {
    var a;
    var c;
    if ($("#schedule_form").length > 0) {
        var b = $("#schedule_for option:selected").val();
        if (b == "") {
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
function setAlternativeHostInfo(b) {
    if (typeof (b) != "undefined" && b != "") {
        var c = new Array();
        try {
            var g = JSON.parse(b);
            for (var a = 0; a < g.length; a++) {
                c.push(g[a].email)
            }
            var f = $("#mtg_alternative_host");
            if (f.is("input")) {
                f.val(c.join(","))
            } else {
                if (f.is("div")) {
                    f.html(c.join(", "))
                }
            }
        } catch (d) {}
    }
}
meetings.setScheduleWithPMI = function(c) {
    if (c.usePMISchedule && typeof c.isPMIMeetingSetting == "undefined") {
        var a = c.usePMISchedule != "undefined" && c.usePMISchedule == "true";
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
            } catch (h) {
                console.log(h)
            }
        }
    }
    if (c.mtg_alternative_host) {
        setAlternativeHostInfo(c.mtg_alternative_host)
    } else {
        var g = $("#mtg_alternative_host");
        if (g.is("input")) {
            g.val("")
        } else {
            if (g.is("div")) {
                g.html("")
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
            var bF = this
              , bE = {};
            return $([]).add(this.currentForm.elements).filter(":input").not(":submit, :reset, :image, [disabled]").not(this.settings.ignore).filter(function() {
                var bG = this.id || this.name;
                !bG && bF.settings.debug && window.console && console.error("%o has no id nor name assigned", this);
                if (bG in bE || !bF.objectLength($(this).rules())) {
                    return false
                }
                bE[bG] = true;
                return true
            })
        }
    }
    var v = $("#schedule_form");
    var aI = $("#meeting_form");
    var bw = $("#pmi_form");
    var bx = v.length > 0;
    var a7 = aI.length > 0;
    var N = bw.length > 0;
    var by = true;
    var O = $.cookie("_zm_date_format");
    if ($("#template").length > 0) {
        $("#template").select2({
            width: 420
        })
    }
    var ay = "NoDefaultTab";
    if ($("#showregistrationTab").length > 0) {
        ay = "registrationTab"
    }
    if ($("#showregistrationTab").length == 0 && $("#showpollTab").length > 0) {
        ay = "pollTab"
    }
    if (window.location.hash === "#managePoll" && $("#showpollTab").length > 0) {
        ay = "pollTab"
    }
    if (ay == "NoDefaultTab" && $("#showliveStreamingTab").length > 0) {
        ay = "liveStreamingTab"
    }
    if (ay == "pollTab" && $("#showliveStreamingTab").length <= 0 && $("#showregistrationTab").length <= 0) {
        aE($("#pollTab"))
    }
    if (ay == "liveStreamingTab" && $("#showpollTab").length <= 0 && $("#showregistrationTab").length <= 0) {
        aE($("#liveStreamingTab"))
    }
    if (ay == "NoDefaultTab") {
        $("#tab_container ul").removeAttr("class")
    }
    function aE(bE) {
        $("#tab_container ul").addClass("hideme");
        bE.removeAttr("style");
        bE.removeAttr("class");
        bE.attr("class", "admin-content-notab")
    }
    var y = SB.getSuccessCookie();
    if (y) {
        var be = y[0];
        if (be === "update_registration") {
            SB.clearSuccessCookie("update_registration");
            ay = "registrationTab"
        } else {
            if (be === "update_replayto") {
                SB.clearSuccessCookie("update_replayto");
                ay = "emailSettingsTab"
            } else {
                if (be === "update_remember_email") {
                    SB.clearSuccessCookie("update_remember_email");
                    ay = "emailSettingsTab"
                } else {
                    if (be === "add_polling") {
                        SB.clearSuccessCookie("add_polling");
                        ay = "pollTab"
                    } else {
                        if (be === "edit_polling") {
                            SB.clearSuccessCookie("edit_polling");
                            ay = "pollTab"
                        } else {
                            if (be === "liveStreamingSuccess") {
                                SB.clearSuccessCookie("liveStreamingSuccess");
                                ay = "liveStreamingTab"
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
    if ($("#" + ay).length > 0) {
        $("#" + ay).removeClass("hideme");
        $("#show" + ay).parent().addClass("active")
    }
    var H = $.i18n.get("empty.trackfield.error");
    var aH = "_zm_free_mtg_tip";
    var p = "";
    var aP = $("#tsp1").length > 0;
    var n = $("#tsp2").length > 0;
    var a9 = null;
    var aN = null;
    var P = $("#isPMIWithJBHPwdLock").val();
    var aS = $("#isPMIWithJBHPwdEnabled").val();
    function G() {
        return !!$.cookie(aH)
    }
    function k() {
        var bE = $("#free_meeting_40mins_tip");
        if (bE.length && $("#hide_free_tip").prop("checked")) {
            if (!G()) {
                $.cookie(aH, "1", {
                    expires: 3650,
                    path: "/",
                    secure: true
                })
            }
        }
    }
    if (!G()) {
        $("#free_meeting_40mins_tip").show()
    }
    jQuery.validator.addMethod("multiemaildomains", function(bH, bF) {
        var bG = $.trim(bH);
        if (!bG) {
            return true
        }
        var bI = bG.split(/[;,\n\r]+/);
        valid = true;
        for (var bE = 0; bE < bI.length; bE++) {
            bH = $.trim(bI[bE]);
            if (!bH) {
                continue
            }
            if (bH.substr(0, 2) == "*.") {
                if (bH.split(".").length <= 2) {
                    valid = false
                } else {
                    continue
                }
            }
            valid = valid && jQuery.validator.methods.email.call(this, "a@" + bH, bF)
        }
        return valid === true
    }, $.i18n.get("meeting.email_domain_separate_by_semicolon"));
    jQuery.validator.addMethod("multiemails", function(bH, bF) {
        var bG = $.trim(bH);
        if (!bG) {
            return true
        }
        var bI = bG.split(/[;,\n\r]+/);
        valid = true;
        for (var bE = 0; bE < bI.length; bE++) {
            bH = $.trim(bI[bE]);
            if (!bH) {
                continue
            }
            valid = valid && jQuery.validator.methods.email.call(this, bH, bF)
        }
        return valid === true
    }, $.i18n.get("meeting.email_separate_by_semicolon"));
    jQuery.validator.addMethod("validate1224Hour", function() {
        var bE = getErrorMessage4Time($("#start_time").val());
        if (bE != "") {
            return false
        } else {
            return true
        }
    }, function() {
        var bE = getErrorMessage4Time($("#start_time").val());
        if (bE != "") {
            return bE
        } else {
            return bE
        }
    });
    jQuery.validator.addMethod("notEqualEmail", function(bH, bG) {
        var bF = $(bG).attr("id");
        var bE = true;
        $("input[name=interpreter_email]").each(function() {
            var bI = $(this).attr("id");
            var bJ = $(this).val();
            if (bI < bF && bJ == bH && bE) {
                bE = false
            }
        });
        return bE
    });
    jQuery.validator.addMethod("notEqualLanguage", function(bJ, bG) {
        var bF = $(bG).attr("id");
        var bE = bF.substr(16, 1);
        var bI = "first_Language_" + bE;
        var bH = $("#" + bI).val();
        return bH != bJ
    });
    $("#topic").focus().select();
    $(".learn-more-button").on("click", function() {
        var bF = $(this).find("#advOptioni");
        if (bF.length > 0) {
            var bE = $(bF).attr("class");
            if (bE == "glyphicon glyphicon-menu-down") {
                $(bF).removeClass(bE).addClass("glyphicon glyphicon-menu-up")
            } else {
                if (bE == "glyphicon glyphicon-menu-up") {
                    $(bF).removeClass(bE).addClass("glyphicon glyphicon-menu-down")
                }
            }
        }
        var bG = $(this).data("learn-more");
        $("." + bG).slideToggle();
        return false
    });
    $("#countryCheckbox").on("click", function() {
        var bE = $(this).is(":checked");
        if (bE) {
            $("#meetingCountryDiv").css("display", "")
        } else {
            $("#meetingCountryDiv").css("display", "none")
        }
    });
    var o = $("#deleteMeetingDialog");
    $("#meetings .admin-content").delegate("button.delete", "click", function() {
        var bE = $(this);
        aW(bE, "delete", "mtg_list")
    });
    $("#meetings .admin-content").delegate("button.end", "click", function() {
        var bE = $(this);
        aW(bE, "end")
    });
    $("#btn_Delete_meeting").click(function() {
        var bE = $(this);
        $("#btn_Delete_meeting").attr({
            "aria-modal": "true",
            "aria-labelledby": "btn_Delete_meeting deleteTitle"
        });
        aW(bE, "delete", "mtg_info")
    });
    function aW(bO, bH, bE) {
        var bQ = bO.attr("data-id");
        var bK = "";
        var bR = "";
        o.find("input[name=mid]").val(bQ);
        o.find("input[name=action]").val(bH);
        if (bH == "delete") {
            o.find(".deleteNormalMeetingToTrash").removeClass("hideme");
            bR = bO.attr("data-s");
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
            var bM = bO.attr("data-t");
            if (bR != undefined && bR != "" && bR != "0" && bM == 8) {
                $("#delete_meeting_occurrence").val(bR);
                $(".deleteRecurrenceMeeting").removeClass("hideme");
                $(".deleteNormalMeeting").addClass("hideme")
            }
            o.find("#deleteTitle").removeClass("hideme");
            o.find("#deleteTopic").removeClass("hideme");
            o.find("#deleteScheduleFor").removeClass("hideme");
            o.find("#deleteTime").removeClass("hideme");
            o.find("#deleteTitle").css("display", "inline-block");
            o.find("#endTitle").css("display", "none");
            o.find("#deleteTitle").attr("tabindex", "-1");
            o.find("#endTitle").removeAttr("tabindex");
            o.find("#endTitle").addClass("hideme");
            o.find("#endTopic").addClass("hideme");
            o.find("#endScheduleFor").addClass("hideme")
        } else {
            if (bH = "end") {
                $(".deleteNormalMeeting").addClass("hideme");
                $(".deleteRecurrenceMeeting").addClass("hideme");
                $("#submitDeleteEndBtn").text($.i18n.get("common.btn_end"));
                $(".endMeeting").removeClass("hideme");
                o.find(".confirm").text($.i18n.get("meeting.confirm_end"));
                o.find("#deleteTitle").addClass("hideme");
                o.find("#deleteTopic").addClass("hideme");
                o.find("#deleteScheduleFor").addClass("hideme");
                o.find("#deleteTime").addClass("hideme");
                o.find("#endTitle").removeClass("hideme");
                o.find("#endTitle").css("display", "inline-block");
                o.find("#deleteTitle").css("display", "none");
                o.find("#endTitle").attr("tabindex", "-1");
                o.find("#deleteTitle").removeAttr("tabindex");
                o.find("#endTopic").removeClass("hideme");
                o.find("#endScheduleFor").removeClass("hideme")
            }
        }
        if ($("#m_user_id").length > 0) {
            o.find("input[name=uid]").val($("#m_user_id").val())
        }
        if (bH == "end") {
            var bJ = bO.attr("data-topic");
            o.find("span.endtopic").text(bJ);
            var bT = "";
            if ($("#meeting_" + bQ).length > 0) {
                bT = $("#meeting_" + bQ).attr("data-display")
            }
            if (bT) {
                o.find("span.endhost").text(bT);
                o.find("div.endhost").show()
            } else {
                o.find("span.endhost").text("");
                o.find("div.endhost").hide()
            }
        } else {
            if (bH == "delete") {
                var bJ = bO.attr("data-topic");
                o.find("span.topic").css({
                    color: "#232333",
                    "font-size": "13px",
                    "font-weight": "bold"
                }).text(bJ);
                var bT = "";
                var bL = bO.attr("data-schedule-for");
                if ($("#meeting_" + bQ).length > 0) {
                    userEmail = " (" + $("#meeting_" + bQ).attr("title") + ")";
                    bT = $("#meeting_" + bQ).attr("data-display")
                } else {
                    if (bL) {
                        var bN = bL.split(" (");
                        if (bN.length == 2) {
                            bT = bN[0];
                            userEmail = " (" + bN[1]
                        }
                    }
                }
                if (bT) {
                    o.find("span.host").css({
                        color: "#232333",
                        "font-size": "13px",
                        "font-weight": "bold"
                    }).text(bT);
                    o.find("span.email").css({
                        color: "#999",
                        "font-size": "13px",
                        "font-weight": "Regular"
                    }).text(userEmail);
                    o.find("div.host").show()
                } else {
                    o.find("span.host").text("");
                    o.find("span.email").text("");
                    o.find("div.host").hide()
                }
                var bP = bO.attr("data-time") + "   ";
                var bG = bO.attr("data-duration").replace(/,/, "");
                while (bG.indexOf(",") > -1) {
                    bG = bG.replace(/,/, "")
                }
                var bF = parseInt(bG / 60);
                var bS = parseInt(bG % 60);
                if (bF != 0) {
                    bF = bF + " hr "
                } else {
                    bF = ""
                }
                if (bS != 0) {
                    bS = bS + " min "
                } else {
                    bS = ""
                }
                var bI = bP + bF + bS;
                if (bI) {
                    o.find("span.time").css({
                        color: "#232333",
                        "font-size": "13px",
                        "font-weight": "Regular",
                        "white-space": "pre"
                    }).text(bI);
                    o.find("div.time").show()
                } else {
                    o.find("span.time").text("");
                    o.find("div.time").hide()
                }
            }
        }
        $(".hasregistrants").addClass("hideme");
        SB.post3({
            url: "./meetingInfo.php",
            data: {
                meeting: bQ,
                occurrence: bR
            },
            success: function(bW) {
                if (bW.errorCode == 0) {
                    if (bW.result.registrants > 0) {
                        $("#option_send_mail").prop("checked", true);
                        $("#send_mail_body").removeClass("hideme").show();
                        $(".hasregistrants").removeClass("hideme");
                        o.find(".tip").find("b").text(bJ);
                        var bV = bW.result.occurrence_topic;
                        if (bV == null) {
                            $("#mailbody").val(bW.result.display_body)
                        } else {
                            var bU = bV + "\r\n\r\n" + bW.result.display_body;
                            $("#mailbody").val(bU)
                        }
                        $("#subject").val(bW.result.display_subject)
                    } else {
                        $("#option_send_mail").prop("checked", false);
                        $("#send_mail_body").removeClass("hideme").hide()
                    }
                    if (bH == "end") {
                        $(".hasregistrants").addClass("hideme")
                    }
                    o.find(".alert-danger").empty().hide();
                    $.modal(o, $.extend({}, SB.MODAL_DEFAULTS, {
                        overlayId: "deletemeeting-dialog-overlay",
                        containerId: "deletemeeting-dialog-container",
                        persist: true,
                        minHeight: o.outerHeight(),
                        onShow: function() {
                            setTimeout(function() {
                                if (bH == "delete") {
                                    $("#deleteMeetingDialog .modal-header>h3").focus()
                                } else {
                                    if (bH == "end") {
                                        $("#deleteMeetingDialog .modal-header>h3").focus()
                                    }
                                }
                            }, 300)
                        },
                        onClose: function(bX) {
                            $.modal.close();
                            setTimeout(function() {
                                if (bE == "mtg_list") {
                                    bO.focus()
                                } else {
                                    if (bE == "mtg_info") {
                                        $("#btn_Delete_meeting").focus()
                                    } else {
                                        bO.focus()
                                    }
                                }
                            })
                        }
                    }))
                }
            }
        })
    }
    $("#option_send_mail").on("change", function(bF) {
        var bE = $(this);
        if (bE.prop("checked")) {
            $("#send_mail_body").removeClass("hideme").show()
        } else {
            $("#send_mail_body").addClass("hideme").hide()
        }
    });
    function aa(bJ) {
        $("#submitDeleteEndBtn").prop("disabled", true);
        $("#btnDeleteSingleOccurrence").prop("disabled", true);
        $("#btnDeleteAllOccurrences").prop("disabled", true);
        var bE = $("#mid").val();
        var bI = $("#action").val();
        var bH = false;
        if ($(".send_mail").is(":visible")) {
            bH = $("#option_send_mail").prop("checked")
        }
        if (bE) {
            var bF = "delete";
            if (bI == "end") {
                bF = "end"
            }
            var bG = {
                id: bE,
                user_id: $("#uid").val(),
                command: bF,
                occurrence: bJ,
                sendMail: bH,
                subject: bH ? $("#subject").val() : "",
                mailBody: bH ? $("#mailbody").val() : ""
            };
            SB.post3({
                url: "./meetingHandle.php",
                data: bG,
                success: function(bK) {
                    if ($("#meeting_number").length > 0) {
                        if ($("#uid").val() != undefined && $("#uid").val() != "") {
                            if ($("#view_from_group").length > 0) {
                                SB.jump("/janus/meeting_private.php?meeting=" + $("#view_from_group").val(), false)
                            } else {
                                SB.jump("/janus/meeting.php", false)
                            }
                        } else {
                            SB.jump("/janus/meeting.php", false)
                        }
                    } else {
                        location.reload(true)
                    }
                },
                btnContainer: o,
                errorNode: o.find(".alert-danger"),
                showBusy: true,
                showBusyAfter: false
            });
            return false
        }
    }
    o.find("button.submit").click(function() {
        aa("")
    });
    $("#btnDeleteAllOccurrences").on("click", function() {
        aa("")
    });
    $("#btnDeleteSingleOccurrence").on("click", function() {
        var bE = $("#delete_meeting_occurrence").val();
        if (bE === "") {
            bE = -1
        }
        aa(bE)
    });
    var J = $("#pacCopyInviteDialog");
    $("#meetings .admin-content").delegate("button.pac", "click", function() {
        var bF = $(this);
        mid = bF.attr("data-id");
        var bE = {
            meeting_number: mid,
            listen_only: false
        };
        SB.post3({
            url: av() + "pacInviteEmail",
            data: bE,
            success: function(bG) {
                $.modal(J, $.extend({}, SB.MODAL_DEFAULTS, {
                    overlayId: "copy-invite-dialog-overlay",
                    containerId: "copy-invite-dialog-container",
                    persist: true,
                    overlayClose: true,
                    minHeight: J.outerHeight(),
                    minWidth: 630,
                    onShow: function() {
                        J.find("#invite_email").text(bG.result.scheduleEmail);
                        J.find("small").text($.i18n.get("meeting.invite_oper_step"))
                    }
                }))
            },
            error: function(bG, bH) {
                if (bG) {
                    SB.alert(bH)
                }
            },
            btnContainer: bF,
            showBusy: false
        })
    });
    J.find(".select-all").click(function() {
        $("#invite_email").select();
        J.find("small").text($.i18n.get("meeting.invite_copy_method"))
    });
    $(".pagination").delegate("a", "click", function() {
        var bE = $(this).parent();
        if (bE.hasClass("disabled") || bE.hasClass("active")) {
            return false
        }
        var bF = parseInt($(this).attr("p"), 10);
        window.location.href = SB.replaceUrl(/p=\d+/ig, "p=" + bF);
        return false
    });
    jQuery.validator.addMethod("confno", function(bG, bE) {
        if (this.optional(bE)) {
            return true
        }
        var bF = bG.replace(/[^\d]/g, "");
        return bF.length >= 9 && bF.length <= 11
    }, $.i18n.get("meeting.invalid_meeting_id"));
    var ac = $("#roomSystemDialog");
    var a4 = ac.find("input[name=pairing_meeting]");
    var aJ = ac.find("input[name=pairing_code]");
    var bq = ac.find("input[name=pairing_meeting_password]");
    var w = ac.find("div[id=pmpasswordFields]");
    SB.initConfInput(a4);
    function bk(bE, bF) {
        if (bE) {
            U(bE, bF)
        } else {
            SB.ajax({
                url: "/meeting/inprogress",
                data: null,
                success: function(bG) {
                    if (bG.result) {
                        bE = bG.result.number
                    }
                    U(bE)
                },
                error: function(bG) {
                    U(bE)
                }
            })
        }
    }
    function U(bE, bF) {
        w.hide();
        if (bE) {
            a4.val(SB.formatConfNo(bE))
        } else {
            a4.val("")
        }
        aJ.val("");
        bq.val("");
        ac.find(".alert-danger").hide();
        ac.find(".form-group").removeClass("has-error");
        ac.valid();
        $.modal(ac, $.extend({}, SB.MODAL_DEFAULTS, {
            overlayId: "room-system-dialog-overlay",
            containerId: "room-system-dialog-container",
            persist: true,
            overlayClose: true,
            minHeight: ac.outerHeight(),
            minWidth: 550,
            onShow: function() {
                window.setTimeout(function() {
                    if (bE) {
                        aJ.focus()
                    } else {
                        a4.focus()
                    }
                }, 500)
            },
            onClose: function() {
                $.modal.close();
                if (bE) {
                    bF.focus()
                } else {
                    $("#btnRoomSystemJoin").focus()
                }
            }
        }))
    }
    $("#btnRoomSystemJoin").click(function() {
        bk();
        return false
    });
    $("#meetings .admin-content").delegate("button.room", "click", function() {
        bk($(this).attr("data-id"), $(this))
    });
    var ar = ac.validate({
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
            var bF = a4.val().replace(/[^\d]/g, "");
            var bE = aJ.val().trim();
            var bG = {
                pairing_meeting: bF,
                pairing_code: bE,
                user_id: $("#m_user_id").val()
            };
            if (bq.is(":visible")) {
                $.extend(bG, {
                    password: bq.val()
                })
            }
            SB.post3({
                url: av() + "pairing",
                data: bG,
                success: function(bH) {
                    SB.showSuccessMsg($.i18n.get("meeting.join_h323_success"));
                    $.modal.close()
                },
                error: function(bI, bJ, bH) {
                    d(bI, bJ, bH)
                },
                btnContainer: $("#btnPairSubmit"),
                showBusy: true,
                showBusyAfter: true
            });
            return false
        }
    });
    var bs = {
        3004: "pairing_meeting_password",
        3021: "pairing_code",
        3001: "pairing_meeting",
        3022: "pairing_meeting"
    };
    function d(bH, bI, bG) {
        var bE = ar;
        var bF = ac.find(".alert-danger");
        if (bH) {
            if (bG === 3004 && w.is(":hidden")) {
                w.show();
                var bJ = {};
                bJ[bs[3004]] = $.i18n.get("meeting.require_password");
                bE.showErrors(bJ)
            } else {
                if (typeof (bI) === "undefined") {
                    bI = $.i18n.get("common.unknown_error")
                }
                if (bs[bG] != undefined) {
                    var bJ = {};
                    bJ[bs[bG]] = bI;
                    bE.showErrors(bJ)
                } else {
                    bF.text(bI).show()
                }
            }
        } else {
            bF.empty().hide()
        }
    }
    var ak = $("#copyInviteDialog");
    $("#copyInvitation").attr({
        "aria-modal": "true",
        "aria-labelledby": "copyInvitation copy-invite-title"
    });
    var y = SB.getSuccessCookie();
    if (y) {
        if (y[0] === "schedule") {
            SB.showSuccessMsg($.i18n.get("meeting.schedule_success"))
        } else {
            if (y[0] === "edit") {
                SB.showSuccessMsg($.i18n.get("meeting.edit_success"))
            }
        }
    }
    ak.find(".select-all").click(function() {
        $("#invite_email").select();
        document.execCommand("copy");
        SB.showSuccessMsg($.i18n.get("webinar.info.copyied.clipboard"), ak.find(".alert-success"))
    });
    $("#copyInvitation").click(function() {
        $.modal(ak, $.extend({}, SB.MODAL_DEFAULTS, {
            overlayId: "copy-invite-dialog-overlay",
            containerId: "copy-invite-dialog-container",
            persist: true,
            overlayClose: true,
            minHeight: ak.outerHeight(),
            minWidth: 630,
            onShow: function() {
                ak.find("small").text($.i18n.get("meeting.invite_oper_step"));
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
    var E = ($("#m_schedule_for").length > 0 && $("#m_schedule_for").val() != "") ? false : true;
    var aQ = false;
    function aU(bH, bG) {
        var bE = window.localStorage;
        var bF = bE.getItem("meeting_schedule_disable_pmi_alert") || false;
        var bI = new Vue();
        if (bH) {
            $("#withPMI").addClass("hideme")
        } else {
            $("#withPMI").removeClass("hideme")
        }
        if ($(".schedule-meeting-page").length > 0) {
            if (bH && $("#current_user_pmi").val().length > 0) {
                if ($(".meeting-disabledpmi-alert").length > 0) {
                    $(".meeting-disabledpmi-alert").remove()
                }
                if (bG.trim() == "") {
                    if (!bF) {
                        bI.$message({
                            dangerouslyUseHTMLString: true,
                            message: $.i18n.get("meeting.schedule.disabled.alert"),
                            type: "warning",
                            customClass: "zm-message zm-message--warning is-closable meeting-disabledpmi-alert",
                            iconClass: "no",
                            duration: 0,
                            showClose: true,
                            onClose: function() {
                                if (!bF) {
                                    bE.setItem("meeting_schedule_disable_pmi_alert", true)
                                }
                            }
                        })
                    }
                } else {
                    bI.$message({
                        message: $.i18n.get("meeting.schedule.for.disabled.alert", bG),
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
            if (bH && editWithPMI) {
                if (bG.trim() == "") {
                    bI.$message({
                        message: $.i18n.get("meeting.edit.disabled.alert"),
                        type: "warning",
                        customClass: "zm-message zm-message--warning is-closable meeting-edit-disabledpmi-alert",
                        iconClass: "no",
                        duration: 0
                    })
                } else {
                    bI.$message({
                        message: $.i18n.get("meeting.edit.schedule.for.disabled.alert", bG),
                        type: "warning",
                        customClass: "zm-message zm-message--warning is-closable meeting-edit-disabledpmi-alert",
                        iconClass: "no",
                        duration: 0
                    })
                }
            }
        }
    }
    var bA = "";
    function z() {
        var bF = $("#schedule_for option:selected").attr("data-pmi");
        var bI = aB(bF, " ");
        if (bI != "" && $("#withPMI").length > 0) {
            var bH = $.i18n.get("meeting.schedule_options_use_pmi", bI);
            $("#withPmiSpan").html(bH);
            var bG = $("#recurrence").val();
            if (!disablePMI) {
                if (bG === "") {
                    $("#withPMI").removeClass("hideme")
                } else {
                    var bE = JSON.parse(bG);
                    var bJ = bE.type;
                    if (bJ === "CLASSIC") {
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
        bA = $("#schedule_for option:selected").attr("data-displayname");
        var bG = $(this).val().trim();
        if (bt) {
            bt.currentMeetingOptions = bt.meetingDefaultOptions;
            bt.currentpmiMeetingOptions = bt.pmiMeetingSetting;
            bt.initVal()
        }
        if (aQ) {
            ah(bG)
        }
        z();
        ba();
        aA($("#option_password"), $("#option_waiting_room"));
        var bF = $("#schedule_for option:selected").attr("data-cnmeeting");
        var bE = $("#schedule_for option:selected").attr("data-inmeeting");
        if (typeof (bF) != "undefined" && typeof (bE) != "undefined") {
            ad(bF, bE)
        }
        if (E) {
            var bH = $("#schedule_for option:selected").data("gdc");
            if (typeof changeGlobalDialinCountries != "undefined") {
                changeGlobalDialinCountries(bH)
            }
        }
        return false
    });
    $(".revert-pmi-change").click(function() {
        if (aL()) {
            bo(aY());
            $(".pmi-change-warning").hide()
        }
    });
    $(".meeting-options-section input,textarea").change(function() {
        var bE = $(this);
        var bG = bE.attr("name");
        if (bG == "option_schedulewithpmi") {
            return
        }
        if (typeof aG == "undefined") {
            return
        }
        if (by) {
            return
        }
        if (bG == "option_password") {
            aA(bE, $("#option_waiting_room"));
            if (typeof bE.data("warning") == "undefined") {
                return
            }
        }
        if (!aG && aL() && !$(".pmi-change-warning").is(":visible")) {
            if ($(this).parents(".z-form-row").find(".pmi-change-warning").length === 0) {
                var bF = $(".pmi-change-warning")[0];
                $(this).parents(".form-group").after(bF);
                $(this).parents(".form-group").next(".pmi-change-warning").show()
            } else {
                $(this).parents(".z-form-row").find(".pmi-change-warning").show()
            }
        }
        if (bG == "option_waiting_room") {
            aA($("#option_password"), bE)
        }
    });
    $("#pmi_form #option_waiting_room, #meeting_form #option_waiting_room").on("change", function() {
        aA($("#option_password"), $(this))
    });
    function aA(bF, bE) {
        if (newPwdWaiting) {
            if (!bE.prop("checked") && !bF.prop("checked")) {
                $("#error_security").show();
                return false
            } else {
                $("#error_security").hide();
                return true
            }
        } else {
            $("#error_security").hide();
            return true
        }
    }
    function ba() {
        if (newPwdWaiting) {
            if (!$("#option_waiting_room").prop("checked") && !$("#option_password").prop("checked")) {
                if ($("#option_waiting_room").prop("disabled")) {
                    if (!$("#option_password").prop("disabled")) {
                        $("#option_password").prop("checked", true);
                        $("#option_password").trigger("change")
                    }
                } else {
                    $("#option_waiting_room").prop("checked", true)
                }
            }
            if (!$("#option_password").prop("checked") && $("#option_password").prop("disabled")) {
                $("#label_option_password").parent().hide();
                $("#option_waiting_room").prop("disabled", true).prop("checked", true)
            } else {
                $("#option_password").show()
            }
            if (!$("#option_waiting_room").prop("checked") && $("#option_waiting_room").prop("disabled")) {
                $("label[for='option_waiting_room']").hide();
                $("#option_password").prop("disabled", true).prop("checked", true)
            } else {
                $("#option_waiting_room").show()
            }
        }
    }
    function ah(bE) {
        if (bE == "" || typeof bE == "undefined") {
            disablePMI = myDisablePMI;
            aU(disablePMI, bA);
            a9 = null;
            aN = null;
            bo();
            bh();
            return true
        }
        B(true);
        SB.post3({
            url: "/meeting/schedulefor",
            data: {
                userId: bE
            },
            success: function(bK) {
                B(false);
                if (!bK.status) {
                    return true
                }
                var bN = bK.result;
                if (typeof bN == "undefined") {
                    return true
                }
                var bL = "{}";
                var bI;
                var bF = {};
                var bG = {};
                if (bN.meetingDefaultOptions && bN.meetingDefaultOptions.length > 0) {
                    bF = JSON.parse(bN.meetingDefaultOptions)
                }
                if (bN.pmiMeetingSetting && bN.pmiMeetingSetting.length > 0) {
                    bG = JSON.parse(bN.meetingDefaultOptions)
                }
                if (bA.trim() == "") {
                    disablePMI = myDisablePMI
                } else {
                    if (bF.disablePMI) {
                        disablePMI = JSON.parse(bF.disablePMI)
                    } else {
                        disablePMI = false
                    }
                }
                aU(disablePMI, bA);
                z();
                if (bN.hasAccountSettings) {
                    bL = bN.meetingDefaultOptions
                }
                bI = bN.pmiMeetingSetting;
                if (typeof bN.isPMIWithJBHPwdLock != "undefined") {
                    a9 = bN.isPMIWithJBHPwdLock ? "true" : "false";
                    aN = bN.isPMIWithJBHPwdEnabled ? "true" : "false"
                }
                try {
                    $("#m_pmi_meeting_setting").val(bI);
                    $("#m_default_options_schedulefor").val(bL);
                    var bH = JSON.parse(bL);
                    var bM = JSON.parse(bI);
                    bi = bH.showUnmuteAll;
                    bz = bH.interpretation;
                    if (bH.usePMISchedule && bH.usePMISchedule == "true" && meetings.isShowScheduleWithPMI()) {
                        meetings.chooseMeetingId(true);
                        bo(bM);
                        if (bx) {
                            A(bH, bM)
                        }
                    } else {
                        meetings.chooseMeetingId(false);
                        if (bx) {
                            bo(bH)
                        } else {
                            aX(T());
                            a3(bH);
                            ag(bH)
                        }
                    }
                    bh(bF.showAdditionalDC);
                    if (bt) {
                        bt.currentMeetingOptions = bF;
                        bt.currentpmiMeetingOptions = bG;
                        bt.initVal()
                    }
                    ba();
                    aA($("#option_password"), $("#option_waiting_room"))
                } catch (bJ) {
                    console.log(bJ)
                }
            },
            busyNode: $("#schedule_for").parent("label").find(".busy"),
            error: function(bF, bG) {
                if (bF) {
                    B(false);
                    console.log(bF + ",msg=" + bG + ", userId:" + bE)
                }
            }
        })
    }
    function B(bE) {
        var bF = $("#mock-meeting-options-section");
        if (bE) {
            bF.show();
            $(".submit").disableBtn()
        } else {
            bF.hide();
            $(".submit").enableBtn()
        }
    }
    function ad(bF, bE) {
        if (bF == "false" && bE == "false") {
            $("#cnMeetingDiv").hide();
            $("#inMeetingDiv").hide();
            $("#cinMeetingDiv").hide()
        } else {
            if (bF == "true" && bE == "false") {
                $("#cnMeetingDiv").show();
                $("#inMeetingDiv").hide();
                $("#cinMeetingDiv").hide()
            } else {
                if (bF == "false" && bE == "true") {
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
    function bm() {
        var bG = 420;
        if ($(document.body).outerWidth(true) < 490) {
            bG = parseInt($(document.body).outerWidth(true)) - 70
        }
        var bH = $("#m_start_date").val();
        if (bH != null && bH != "") {
            bH = parseDateByCookies(bH);
            if (bH.getTime() > new Date().getTime()) {
                bH = 0
            }
        } else {
            bH = 0
        }
        $(".input-datepicker").datepicker({
            dateFormat: O,
            minDate: bH,
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
                width: bG
            });
            $("#schedule_for").val($("#m_schedule_for").val()).trigger("change");
            E = true;
            aU(disablePMI, bA)
        } else {
            var bF = $("#isCNMeetingEnable").val();
            var bE = $("#isINMeetingEnable").val();
            ad(bF, bE);
            if ($(".schedule-meeting-page").length > 0 || $(".edit-meeting-page").length > 0) {
                aU(myDisablePMI, bA)
            }
        }
        aQ = true;
        $("#start_time_2").val($("#m_start_time_2").val()).trigger("change");
        $("input[name=trackfield]").map(function() {
            new ComboBox(this.id)
        });
        $("#changePMI").on("click", function() {
            $("#changePMI").parent().hide();
            $("#pmiDiv").show()
        })
    }
    function a2() {
        var bE = $("input[name=option_audio]:checked").val();
        if ($("#show_tsp_info").length > 0) {
            if (bE == "telephony" || bE == "both") {
                $("#show_tsp_info").show()
            } else {
                $("#show_tsp_info").hide()
            }
        } else {
            if (bE == "other") {
                $("#other_teleconf_info_container").show()
            } else {
                $("#other_teleconf_info_container").hide()
            }
        }
    }
    $("input[name=option_audio]").on("change", a2);
    a2();
    var ai = 0;
    var ax = null;
    if ($("#meet-autorec").length == 1) {
        ax = $("#meet-autorec input[name=option_autorec]");
        ai = $("#meet-autorec input[name=option_autorec_val]").length;
        function aj() {
            if (ai == 1) {
                return
            }
            if (ax.prop("checked")) {
                $("#meet-autorec .sub-options").show()
            } else {
                $("#meet-autorec .sub-options").hide()
            }
        }
        aj();
        ax.on("change", aj)
    }
    function a0(bE) {
        if (!ai) {
            return
        }
        if (ax.prop("checked")) {
            $.extend(bE, {
                autorec: $("#meet-autorec input[name=option_autorec_val]:checked").val()
            })
        } else {
            $.extend(bE, {
                autorec: "none"
            })
        }
    }
    function R(bI) {
        var bF = $("#breout-room");
        if (bF.length > 0) {
            var bE = bF.attr("data-id");
            var bH = bF.is(":checked") ? 1 : 0;
            bI[bE] = bH;
            var bG = {};
            _.forEach(roomList, function(bL) {
                var bJ = bL.name;
                var bK = bL.value;
                bG[bJ] = bK
            });
            if (roomList.length == 0) {
                bI.breout_room_info = ""
            } else {
                bI.breout_room_info = JSON.stringify(bG)
            }
        }
    }
    $("#option_password").on("click", function() {
        if ($(this).prop("checked")) {
            $(this).data("focus", "1")
        }
        $(this).data("warning", "1")
    });
    $("#meeting_pass").on("keyup", function() {
        var bE = $(this);
        if (aL() && bE.data("pwd") !== bE.val()) {
            bE.data("userChgPmiPwd", 1);
            bE.trigger("change")
        }
    });
    $("#option_password").on("change", function() {
        if ($(this).prop("checked")) {
            $("#error_security").hide();
            var bE = $("#meeting_pass");
            bE.show();
            if (bE.val() === "") {
                if (!aL()) {
                    bE.val(bn());
                    if (passErrorCount > 0) {
                        checkPassword($("#meeting_pass"))
                    }
                }
            }
            if (typeof $(this).data("focus") != "undefined") {
                bE.trigger("focus")
            }
            $(this).removeData("focus");
            bE.data("pwd", bE.val())
        } else {
            $("#meeting_pass").hide();
            $(this).parents("form").valid();
            $(this).parents(".form-group").removeClass("has-error");
            aA($(this), $("#option_waiting_room"))
        }
    });
    if ($("#meeting_pass").val() != "") {
        $("#option_password").prop("checked", true).trigger("change")
    }
    $("#option_interpretation_enable").on("change", M);
    M();
    function M() {
        if ($("#option_interpretation_enable").prop("checked")) {
            $("#interpreters_info").show();
            $("#interpreter_email").trigger("focus")
        } else {
            $("#interpreters_info").hide()
        }
    }
    var L = $("#mtg_alternative_host_hidden").val();
    setAlternativeHostInfo(L);
    function ap() {
        if ($("#withPMI").length > 0 && $("#withPMI").is(":visible")) {
            var bJ = $("input[name=option_schedulewithpmi][value='on']").prop("checked") ? true : false;
            if (!br(bJ)) {
                return false
            }
        }
        if ($("#option_additional_dcs").length > 0 && u && !I()) {
            if (!u.addAdditionalDcs()) {
                return false
            }
        }
        if (!aA($("#option_password"), $("#option_waiting_room"))) {
            return false
        }
        if (!aC()) {
            var bH = $("input[name=option_video_host]:checked").val();
            var bF = $("input[name=option_video_participants]:checked").val();
            var bG = $("input[name=option_audio]:checked").val();
            var bE = false;
            var bI = {
                number: $("#meeting_number").val(),
                topic: $("#topic").val(),
                agenda: $.trim($("#agenda").val()),
                start_date: $("#start_date").val(),
                start_time: getHHMM(),
                start_time_2: getAMPM(),
                timezone: timezone_vue.val,
                schedule_for: $("#schedule_for").val(),
                duration: parseInt($("#duration_hr").val(), 10) * 60 + parseInt($("#duration_min").val(), 10),
                option_jbh: $("#option_jbh").prop("checked") ? true : false,
                option_video_host: bH ? bH : "on",
                option_video_participants: bF ? bF : "on",
                option_audio_type: bG ? bG : "both",
                other_teleconf_info: $("#other_teleconf_info").val(),
                option_rm: $("#option_rm").prop("checked") ? true : false,
                password: $("#option_password").prop("checked") ? $("#meeting_pass").val() : "",
                mtg_alternative_host: $("#mtg_alternative_host").val(),
                user_id: $("#m_user_id").val(),
                option_pac: bE,
                trackfields: aq(),
                recurrence_setting: $("#recurrence").val(),
                responseToSingleOccurrence: $("#responseToSingleOccurrence").val(),
                occurrence: $("#occurrence_time").val(),
                tsp_account: p,
                sendEmailToRegistrants: $("#sendEmailToRegistrants").prop("checked"),
                option_public_calender_meeting: $("#option_public_calender_meeting").prop("checked") ? 1 : 0,
                option_waiting_room: $("#option_waiting_room").prop("checked") ? 1 : 0,
                global_dialin_countries: $("#global_dialin_countries").val(),
                templateId: $("#template").val(),
                option_e2ee: $("#encryption-option").length > 0 ? bt.encryptionVal : ""
            };
            a0(bI);
            if ($("#option_registration").length > 0) {
                $.extend(bI, {
                    option_registration: $("#option_registration").prop("checked") ? true : false,
                    registrationRequiredType: $("input[name='registrationRequiredType']:checked").val()
                })
            }
            if ($("#withPMI").length > 0 && $("#withPMI").is(":visible")) {
                $.extend(bI, {
                    with_pmi: $("input[name=option_schedulewithpmi][value='on']").prop("checked") ? true : false
                })
            }
            if ($("#auth").length > 0) {
                authVue.addAuthInfo(bI)
            }
            R(bI);
            bC($("#meeting_form"), bI);
            x(bI);
            at(bI);
            checkPassword($("#meeting_pass"));
            if (passErrorCount > 0) {
                if ($("#meeting_pass").val()) {
                    $("#passwordErrorTips").show()
                }
                $("#meeting_pass").trigger("focus");
                return false
            }
            al(bI);
            a5(bI);
            SB.post3({
                url: av() + "save",
                data: bI,
                success: function(bK) {
                    SB.saveSuccessCookie("edit");
                    if ($("#responseToSingleOccurrence").val() === "true") {
                        if ($("#view_from_group").length > 0) {
                            SB.jump(av(true) + $("#meeting_number").val() + "?occurrence=" + $("#occurrence_time").val() + "&viewgid=" + $("#view_from_group").val())
                        } else {
                            SB.jump(av(true) + $("#meeting_number").val() + "?occurrence=" + $("#occurrence_time").val())
                        }
                    } else {
                        if ($("#view_from_group").length > 0) {
                            SB.jump(av(true) + bK.result + "?viewgid=" + $("#view_from_group").val())
                        } else {
                            SB.jump(av(true) + bK.result)
                        }
                    }
                },
                error: function(bM, bK, bL) {
                    if (bL == 3402) {
                        $("#passwordErrorTips").show();
                        return
                    }
                    if (bL == 3403) {
                        $("#weakPasswordDetectionTips").show();
                        $("#password_container").addClass("has-error");
                        return
                    }
                    if (bM) {
                        if (bL == 1113 || bL == 1114 || bL == 1115) {
                            t(false, $("#error_msg"), bK);
                            t(true, $("#error_mtg_alternative_host"), bK)
                        } else {
                            t(false, $("#error_mtg_alternative_host"), bK);
                            t(true, $("#error_msg"), bK);
                            return
                        }
                    } else {
                        t(false, $("#error_msg"), bK);
                        t(false, $("#error_mtg_alternative_host"), bK)
                    }
                },
                btnContainer: $("#meeting_form"),
                showBusy: true
            });
            return false
        }
    }
    function x(bF) {
        if (I()) {
            $.extend(bF, {
                option_interpretation: false
            })
        } else {
            if ($("#meet-interpretation").length > 0 && $("#meet-interpretation").hasClass("hideme") == false) {
                $.extend(bF, {
                    option_interpretation: $("#option_interpretation_enable").prop("checked") ? true : false,
                });
                var bE = [];
                interpreterInfoVue.list.forEach(function(bG) {
                    bE.push(bG.email + "," + bG.firstLanguage + "," + bG.secondLanguage)
                });
                $.extend(bF, {
                    interpreterInfos: bE.join(";")
                })
            }
        }
    }
    function at(bE) {
        if (typeof jbhPriorStartMeetingIdObj != "undefined") {
            $.extend(bE, {
                jbhPriorStartMeeting: $("#jbhPriorStartMeetingId").is(":visible") ? jbhPriorStartMeetingIdObj.jbhPriorTime : "0"
            })
        }
    }
    var C = $("#notifyRecurrenceMeetingDialog");
    function a(bI, bF) {
        var bH = $.i18n.get("meeting.reschedule_notify_to_registrants_update");
        var bE = $.i18n.get("meeting.reschedule_notify_to_registrants_update_email");
        var bG = "";
        $("#notify_note_container").addClass("hideme");
        if (bI && bF && $("#recurrenceType").val() != "CLASSIC") {
            bH = $.i18n.get("meeting.reschedule_notify_to_registrants_reschedule");
            if ($("#m_newRecurrence").val() === "on") {
                bE = $.i18n.get("meeting.reschedule_notify_to_registrants_reschedule_email_occurrence");
                bG = $.i18n.get("meeting.reschedule_notify_to_registrants_reschedule_note_occurrence")
            } else {
                bE = $.i18n.get("meeting.reschedule_notify_to_registrants_reschedule_email");
                bG = $.i18n.get("meeting.reschedule_notify_to_registrants_reschedule_note")
            }
            $("#notify_note_container").removeClass("hideme")
        }
        $("#notify_msg").text(bH);
        $("#notify_checkbox_label").text(bE);
        $("#notify_note").text(bG);
        $.modal(C, $.extend({}, SB.MODAL_DEFAULTS, {
            overlayId: "notify-recurrence-meeting-dialog-overlay",
            containerId: "notify-recurrence-meeting-dialog-container",
            persist: true,
            minHeight: C.outerHeight(),
            onShow: function() {}
        }))
    }
    $("#btn_saveMeetingAndSendEmail").on("click", function(bE) {
        $.modal.close();
        ap()
    });
    function Z(bG, bH) {
        for (var bF = 0; bF < bG.length; bF++) {
            var bE = bG[bF];
            if (bE.type === bH) {
                return bE.value
            }
        }
        return ""
    }
    function aD(bQ, bN) {
        if (bQ === "" && bN === "") {
            return true
        }
        if (bQ === bN) {
            return true
        }
        if (bQ === "" || bN === "") {
            return false
        }
        var bJ = JSON.parse(bQ);
        var bO = JSON.parse(bN);
        if (bJ.type != bO.type) {
            return false
        }
        if (bJ.type === "CLASSIC") {
            return true
        }
        if (bJ.timezone != bO.timezone) {
            return false
        }
        if (bJ.startTime != bO.startTime) {
            return false
        }
        if (bJ.endType != bJ.endType) {
            return false
        }
        if (bJ.endType === "END_TIMES") {
            if (bJ.times != bO.times) {
                return false
            }
        } else {
            if (bJ.endTime != bO.endTime) {
                return false
            }
        }
        var bI = Z(bJ.recurrenceValues, "INTERVAL");
        var bP = Z(bO.recurrenceValues, "INTERVAL");
        if (bI != bP) {
            return false
        }
        if (bJ.type === "DAILY") {
            return true
        }
        if (bJ.type === "WEEKLY") {
            var bK = Z(bJ.recurrenceValues, "BYDAY");
            var bM = Z(bO.recurrenceValues, "BYDAY");
            return bK == bM
        }
        if (bJ.type === "MONTHLY") {
            var bL = Z(bJ.recurrenceValues, "BYMONTHDAY");
            var bE = Z(bO.recurrenceValues, "BYMONTHDAY");
            if (bL != bE) {
                return false
            }
            if (bL === "") {
                var bF = Z(bJ.recurrenceValues, "BYSETPOS");
                var bH = Z(bO.recurrenceValues, "BYSETPOS");
                var bG = Z(bJ.recurrenceValues, "BYDAY");
                var bR = Z(bO.recurrenceValues, "BYDAY");
                return bF == bH && bG == bR
            }
            return true
        }
        return true
    }
    function i() {
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
        bm();
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
            errorPlacement: function(bG, bH) {
                var bF = bH.attr("id");
                var bE = bH.attr("name");
                if ("dailyInterval" == bF || "weeklyInterval" == bF || "monthlyInterval" == bF || "endTimes" == bF) {
                    bG.addClass("interval-error");
                    bH.parents(".col-sm-9").append(bG)
                } else {
                    if ("endTimes" == bF) {
                        bG.addClass("times-error");
                        bH.parents(".col-sm-9").append(bG)
                    } else {
                        if ("second_language" == bE) {
                            bG.addClass("help-block");
                            bG.addClass("has-error");
                            bH.parent().parent().parent().append(bG)
                        } else {
                            if ("meeting_pass" == bE) {
                                bG.addClass("help-block");
                                $("#" + bF + "-error").remove();
                                bH.parents("#security-option").append(bG)
                            } else {
                                bG.addClass("help-block");
                                bH.parent().append(bG)
                            }
                        }
                    }
                }
            },
            submitHandler: function() {
                var bJ = false;
                var bH = false;
                var bI = "";
                var bF = "";
                if ($("#option_registration").length > 0) {
                    bJ = $("#option_registration").attr("data-s") == "true" ? true : false;
                    bI = $("#option_registration").attr("data-t");
                    bH = $("#option_registration").prop("checked") ? true : false;
                    bF = $("input[name='registrationRequiredType']:checked").val()
                }
                var bK = false;
                var bN = false;
                if ($("#option_rm").length > 0) {
                    bK = $("#m_newRecurrence").val() === "on" ? true : false;
                    bN = $("#option_rm").prop("checked") ? true : false
                }
                if ($("#hasApprovedRegistrants").val() === "false" || $("#responseToSingleOccurrence").val() === "true") {
                    return ap()
                }
                if (bK && bN) {
                    var bL = $("#recurrence").val();
                    var bM = $("#recurrence").attr("data-s");
                    if (!aD(bM, bL)) {
                        var bE = (bI == 1 && bF == 1);
                        a(!bE, bH);
                        return false
                    }
                    if (bH) {
                        var bG = false;
                        if ((bI == 2 || bI == 3) && (bF == 2 || bF == 3)) {
                            bG = true
                        }
                        if (bI != bF && !bG) {
                            a(true, bH);
                            return false
                        }
                    }
                    if (i()) {
                        a(false, bH);
                        return false
                    }
                }
                if (bJ && !bK && bN) {
                    a(true, bH);
                    return false
                }
                if (bJ && bK && !bN) {
                    a(true, bH);
                    return false
                }
                if (bJ && !bK && !bN) {
                    if (i()) {
                        a(false, bH);
                        return false
                    }
                }
                return ap()
            }
        })
    }
    function bC(bG, bH) {
        bG.find("input.m_option_chk:visible").each(function() {
            var bI = $(this).prop("name");
            var bJ = $(this).is(":checked") ? 1 : 0;
            bH[bI] = bJ
        });
        bG.find(".m_option_val:visible").each(function() {
            var bI = $(this).prop("name");
            var bJ = $(this).val();
            if (bI == "enforce_loginSD_info") {
                bJ = bJ.replace(/\s+/g, "")
            }
            bH[bI] = bJ
        });
        var bF = $("#countryCheckbox");
        if (bF.length > 0) {
            var bE = $(bF).is(":checked");
            if (bE) {
                bG.find("input.m_option_country:visible").each(function() {
                    var bI = $(this).attr("data-id");
                    var bJ = $(this).is(":checked") ? 1 : 0;
                    bH[bI] = bJ
                })
            }
        }
    }
    function br(bE) {
        var bH = true;
        if (ae() == "true" && bE) {
            var bF = $("#option_jbh").prop("checked") ? true : false;
            var bG = $("#option_password").prop("checked") ? $("#meeting_pass").val() : "";
            if (bF && !bG) {
                $("#error_password").show().html($.i18n.get("jquery.validation_required")).css({
                    color: "#FF1E5A"
                });
                bH = false
            }
        }
        return bH
    }
    function an() {
        bm();
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
            errorPlacement: function(bG, bH) {
                var bF = bH.attr("id");
                var bE = bH.attr("name");
                if ("meeting_pass" == bE) {
                    bG.addClass("help-block");
                    $("#" + bF + "-error").remove();
                    bH.parents("#security-option").append(bG)
                } else {
                    bG.addClass("help-block");
                    bH.parent().append(bG)
                }
            },
            submitHandler: function() {
                if (!br(true)) {
                    return false
                }
                if (!aA($("#option_password"), $("#option_waiting_room"))) {
                    return false
                }
                if (!aC()) {
                    var bH = $("input[name=option_video_host]:checked").val();
                    var bF = $("input[name=option_video_participants]:checked").val();
                    var bG = $("input[name=option_audio]:checked").val();
                    var bE = false;
                    var bI = {
                        newPMI: $("#pmi").val().replace(/-/g, "").replace(/\s+/g, ""),
                        oldPMI: $("#meeting_number").val(),
                        option_jbh: $("#option_jbh").prop("checked") ? true : false,
                        option_video_host: bH ? bH : "on",
                        option_video_participants: bF ? bF : "on",
                        option_audio_type: bG ? bG : "both",
                        option_pac: bE,
                        other_teleconf_info: $("#other_teleconf_info").val(),
                        password: $("#option_password").prop("checked") ? $("#meeting_pass").val() : "",
                        mtg_alternative_host: $("#mtg_alternative_host").val(),
                        user_id: $("#m_user_id").val(),
                        trackfields: aq(),
                        global_dialin_countries: $("#global_dialin_countries").val(),
                        tsp_account: p,
                        option_e2ee: $("#encryption-option").length > 0 ? bt.encryptionVal : ""
                    };
                    R(bI);
                    if ($("#auth").length > 0) {
                        authVue.addAuthInfo(bI)
                    }
                    a0(bI);
                    bC($("#pmi_form"), bI);
                    checkPassword($("#meeting_pass"));
                    if (passErrorCount > 0) {
                        if ($("#meeting_pass").val()) {
                            $("#passwordErrorTips").show()
                        }
                        $("#meeting_pass").trigger("focus");
                        return false
                    }
                    a5(bI);
                    SB.post3({
                        url: av() + "savePmi",
                        data: bI,
                        success: function(bJ) {
                            SB.saveSuccessCookie("edit");
                            if ($("#view_from_group").length > 0) {
                                SB.jump(av(true) + bJ.result + "?viewgid=" + $("#view_from_group").val())
                            } else {
                                SB.jump(av(true) + bJ.result)
                            }
                        },
                        error: function(bL, bJ, bK) {
                            if (bK == 3402) {
                                $("#passwordErrorTips").show();
                                return
                            }
                            if (bK == 3403) {
                                $("#weakPasswordDetectionTips").show();
                                $("#password_container").addClass("has-error");
                                return
                            }
                            if (bL) {
                                if (bK == 1113 || bK == 1114 || bK == 1115) {
                                    t(false, $("#error_msg"), bJ);
                                    t(true, $("#error_mtg_alternative_host"), bJ)
                                } else {
                                    t(false, $("#error_mtg_alternative_host"), bJ);
                                    t(true, $("#error_msg"), bJ);
                                    return
                                }
                            } else {
                                t(false, $("#error_msg"), bJ);
                                t(false, $("#error_mtg_alternative_host"), bJ)
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
    function au() {
        var bG = $.cookie("_zm_mtg_options");
        if (bG) {
            try {
                var bF = JSON.parse(bG);
                if (bF) {
                    var bE = $("#m_has_account_settings").val();
                    if (bE == "false") {
                        if (bF.o4) {
                            $("input[name=option_audio][value=" + bF.o4 + "]").prop("checked", true);
                            if (bF.o4 === "other" && $("#other_teleconf_info_container").length > 0) {
                                $("#other_teleconf_info_container").removeClass("hideme").show()
                            }
                            if (bF.o4 !== "telephony" && bF.o4 !== "both" && $("#show_tsp_info").length > 0) {
                                $("#show_tsp_info").hide()
                            }
                        }
                    }
                    if (bF.o8) {
                        p = bF.o8
                    } else {
                        bc()
                    }
                    if (bF.o9 && !ax.prop("checked")) {
                        $("input[name=option_autorec_val][value=" + bF.o9 + "]").prop("checked", true)
                    }
                }
            } catch (bH) {}
        } else {
            bc()
        }
    }
    function bj(bF) {
        var bE = {
            o1: bF.option_jbh,
            o2: bF.option_video_host,
            o3: bF.option_video_participants,
            o4: bF.option_audio_type,
            o5: bF.option_rm,
            o6: bF.with_pmi
        };
        if (bF.tsp_account) {
            bE.o8 = bF.tsp_account
        }
        if (bF.autorec) {
            bE.o9 = bF.autorec
        }
        $.cookie("_zm_mtg_options", JSON.stringify(bE), {
            expires: 365,
            path: "/"
        })
    }
    function bp() {
        bm();
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
            errorPlacement: function(bG, bH) {
                var bF = bH.attr("id");
                var bE = bH.attr("name");
                if ("dailyInterval" == bF || "weeklyInterval" == bF || "monthlyInterval" == bF || "endTimes" == bF) {
                    bG.addClass("interval-error");
                    bH.parents(".col-sm-9").append(bG)
                } else {
                    if ("endTimes" == bF) {
                        bG.addClass("times-error");
                        bH.parents(".col-sm-9").append(bG)
                    } else {
                        if ("second_language" == bE) {
                            bG.addClass("help-block");
                            bG.addClass("has-error");
                            bH.parent().parent().parent().append(bG)
                        } else {
                            if ("meeting_pass" == bE) {
                                bG.addClass("help-block");
                                $("#" + bF + "-error").remove();
                                bH.parents("#security-option").append(bG)
                            } else {
                                bG.addClass("help-block");
                                bH.parent().append(bG)
                            }
                        }
                    }
                }
            },
            submitHandler: function() {
                if ($("#withPMI").length > 0 && $("#withPMI").is(":visible")) {
                    var bJ = $("input[name=option_schedulewithpmi][value='on']").prop("checked") ? true : false;
                    if (!br(bJ)) {
                        return false
                    }
                }
                if ($("#option_additional_dcs").length > 0 && u && !I()) {
                    if (!u.addAdditionalDcs()) {
                        return false
                    }
                }
                if (!aA($("#option_password"), $("#option_waiting_room"))) {
                    return false
                }
                if (!aC()) {
                    var bH = $("input[name=option_video_host]:checked").val();
                    var bF = $("input[name=option_video_participants]:checked").val();
                    var bG = $("input[name=option_audio]:checked").val();
                    var bE = false;
                    var bI = {
                        topic: $("#topic").val(),
                        agenda: $.trim($("#agenda").val()),
                        start_date: $("#start_date").val(),
                        start_time: getHHMM(),
                        start_time_2: getAMPM(),
                        timezone: timezone_vue.val,
                        schedule_for: $("#schedule_for").val(),
                        duration: parseInt($("#duration_hr").val(), 10) * 60 + parseInt($("#duration_min").val(), 10),
                        option_jbh: $("#option_jbh").prop("checked") ? true : false,
                        option_video_host: bH ? bH : "on",
                        option_video_participants: bF ? bF : "on",
                        option_audio_type: bG ? bG : "both",
                        other_teleconf_info: $("#other_teleconf_info").val(),
                        option_rm: $("#option_rm").prop("checked") ? true : false,
                        password: $("#option_password").prop("checked") ? $("#meeting_pass").val() : "",
                        mtg_alternative_host: $("#mtg_alternative_host").val(),
                        user_id: $("#m_user_id").val(),
                        needUpUserTZ: $("#needUpUserTZ").val(),
                        option_pac: bE,
                        trackfields: aq(),
                        recurrence_setting: $("#recurrence").val(),
                        tsp_account: p,
                        option_public_calender_meeting: $("#option_public_calender_meeting").prop("checked") ? 1 : 0,
                        option_waiting_room: $("#option_waiting_room").prop("checked") ? 1 : 0,
                        global_dialin_countries: $("#global_dialin_countries").val(),
                        templateId: $("#template").val(),
                        option_e2ee: $("#encryption-option").length > 0 ? bt.encryptionVal : ""
                    };
                    if ($("#auth").length > 0) {
                        authVue.addAuthInfo(bI)
                    }
                    R(bI);
                    a0(bI);
                    if ($("#option_registration").length > 0) {
                        $.extend(bI, {
                            option_registration: $("#option_registration").prop("checked") ? true : false,
                            registrationRequiredType: $("input[name='registrationRequiredType']:checked").val()
                        })
                    }
                    if ($("#withPMI").length > 0 && $("#withPMI").is(":visible")) {
                        $.extend(bI, {
                            with_pmi: $("input[name=option_schedulewithpmi][value='on']").prop("checked") ? true : false
                        })
                    }
                    bC($("#schedule_form"), bI);
                    x(bI);
                    at(bI);
                    checkPassword($("#meeting_pass"));
                    if (passErrorCount > 0) {
                        if ($("#meeting_pass").val()) {
                            $("#passwordErrorTips").show()
                        }
                        $("#meeting_pass").trigger("focus");
                        return false
                    }
                    al(bI);
                    a5(bI);
                    SB.post3({
                        url: av() + "save",
                        data: bI,
                        success: function(bK) {
                            SB.saveSuccessCookie("schedule");
                            bj(bI);
                            k();
                            if ($("#view_from_group").length > 0) {
                                SB.jump(av(true) + bK.result + "?viewgid=" + $("#view_from_group").val())
                            } else {
                                SB.jump(av(true) + bK.result)
                            }
                        },
                        error: function(bM, bK, bL) {
                            if (bL == 3402) {
                                $("#passwordErrorTips").show();
                                return
                            }
                            if (bL == 3403) {
                                $("#weakPasswordDetectionTips").show();
                                $("#password_container").addClass("has-error");
                                return
                            }
                            if (bM) {
                                if (bL == 1113 || bL == 1114 || bL == 1115) {
                                    t(false, $("#error_msg"), bK);
                                    t(true, $("#error_mtg_alternative_host"), bK)
                                } else {
                                    t(false, $("#error_mtg_alternative_host"), bK);
                                    t(true, $("#error_msg"), bK);
                                    return
                                }
                            } else {
                                t(false, $("#error_msg"), bK);
                                t(false, $("#error_mtg_alternative_host"), bK)
                            }
                        },
                        btnContainer: $("#schedule_form"),
                        showBusy: true
                    });
                    return false
                }
            }
        })
    }
    function t(bG, bF, bE) {
        if (bG) {
            bF.text(bE).show()
        } else {
            bF.empty().hide()
        }
    }
    function bv() {
        bm();
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
                if (!aC()) {
                    var bE = {
                        topic: $("#topic").val(),
                        start_date: $("#start_date").val(),
                        start_time: getHHMM(),
                        start_time_2: getAMPM(),
                        timezone: timezone_vue.val,
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
                        trackfields: aq(),
                        recurrence_setting: $("#recurrence").val()
                    };
                    if ($("#option_registration").length > 0) {
                        $.extend(bE, {
                            option_registration: $("#option_registration").prop("checked") ? true : false,
                            registrationRequiredType: $("input[name='registrationRequiredType']:checked").val()
                        })
                    }
                    SB.post3({
                        url: av() + "save",
                        data: bE,
                        success: function(bF) {
                            SB.saveSuccessCookie("schedule");
                            SB.jump(av(true) + bF.result)
                        },
                        btnContainer: $("#schedule_pac_form"),
                        showBusy: true
                    });
                    return false
                }
            }
        })
    }
    function aw() {
        bm();
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
                if (!aC()) {
                    var bE = {
                        number: $("#meeting_number").val(),
                        topic: $("#topic").val(),
                        start_date: $("#start_date").val(),
                        start_time: getHHMM(),
                        start_time_2: getAMPM(),
                        timezone: timezone_vue.val,
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
                        trackfields: aq(),
                        recurrence_setting: $("#recurrence").val()
                    };
                    if ($("#option_registration").length > 0) {
                        $.extend(bE, {
                            option_registration: $("#option_registration").prop("checked") ? true : false,
                            registrationRequiredType: $("input[name='registrationRequiredType']:checked").val()
                        })
                    }
                    SB.post3({
                        url: av() + "save",
                        data: bE,
                        success: function(bF) {
                            SB.saveSuccessCookie("edit");
                            SB.jump(av(true) + bF.result)
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
    var a1 = meetings.lockedTipDomStr;
    function aX() {
        aG = true;
        try {
            var bI = T();
            if (typeof bI == "undefined") {
                return false
            }
            if (bI.hostVideo_locked && bI.hostVideo_locked == "true") {
                if (bI.hostVideo && bI.hostVideo == "true") {
                    $("input[name=option_video_host][value=on]").prop("checked", true)
                } else {
                    $("input[name=option_video_host][value=off]").prop("checked", true)
                }
                aM($("input[name=option_video_host]").prop({
                    disabled: true
                }).parent("label").parent())
            }
            if (bI.pVideo_locked && bI.pVideo_locked == "true") {
                if (bI.pVideo && bI.pVideo == "true") {
                    $("input[name=option_video_participants][value=on]").prop("checked", true)
                } else {
                    $("input[name=option_video_participants][value=off]").prop("checked", true)
                }
                aM($("input[name=option_video_participants]").prop({
                    disabled: true
                }).parent("label").parent())
            }
            if (bI.jbh_locked && bI.jbh_locked == "true") {
                $("input[name=option_jbh]").prop("checked", bI.jbh == "true");
                aM($("input[name=option_jbh]").prop({
                    disabled: true
                }).parent("label").parent())
            }
            aO($("input[name=option_jbh]").prop("checked"), $("#jbhpriorTime").val());
            if (bI.audio_locked && bI.audio_locked == "true") {
                if (bI.audio) {
                    $("input[name=option_audio][value=" + bI.audio + "]").prop("checked", true);
                    if (bI.audio == "telephony" || bI.audio == "both") {
                        $("#globalDialinCountries").show();
                        $("#show_tsp_info").show()
                    } else {
                        $("#globalDialinCountries").hide();
                        $("#show_tsp_info").hide()
                    }
                    if (bI.audio == "other") {
                        $("#other_teleconf_info_container").show()
                    } else {
                        $("#other_teleconf_info_container").hide()
                    }
                }
                aM($("input[name=option_audio]").prop({
                    disabled: true
                }).parent("label").parent())
            }
            if (bI.thirdAudio_locked && bI.thirdAudio_locked == "true") {}
            if (bI.mute_locked && bI.mute_locked == "true") {
                $("input[name=option_mute_upon_entry]").prop("checked", bI.mute == "true");
                aM($("input[name=option_mute_upon_entry]").prop({
                    disabled: true
                }).parent("label"))
            }
            if ($("#auth").length > 0) {
                authVue.setMergedOptionForAuthAndWatermark(bI)
            }
            var bK = $("#option_public_calender_meeting");
            if (bK.length > 0) {
                if (bI.public_calendar_locked && bI.public_calendar_locked == "true") {
                    if (typeof bK.attr("data") == "undefined") {
                        bK.prop("checked", bI.public_calendar == "true")
                    }
                    aM(bK.prop({
                        disabled: true
                    }).parent("label"))
                }
            }
            var bH = $("#option_waiting_room");
            if (bH.length > 0) {
                if (bI.waitingRoom_locked && bI.waitingRoom_locked == "true") {
                    bH.prop("checked", bI.waitingRoom == "true");
                    aM(bH.prop({
                        disabled: true
                    }).parent("label"))
                }
            }
            var bF = $("input[name=option_schedulewithpmi]");
            if ($("#schedule_form").length > 0 || $("#meeting_form").length > 0) {
                if ($("#withPMI").length > 0 && $("#withPMI").is(":visible")) {
                    if (bI.usePMISchedule_locked && bI.usePMISchedule_locked == "true") {
                        meetings.chooseMeetingId(bI.usePMISchedule == "true");
                        aM(bF.prop({
                            disabled: true
                        }).parent("label"))
                    }
                }
            }
            var bG = $("#option_password");
            if (bG.length > 0 && bg() && I()) {
                if (bI.password_locked && bI.password_locked == "true") {
                    bG.prop("checked", bI.password == "true");
                    h(bI.password == "true", bI.passwordVal);
                    bD(true)
                }
            }
            if (bI.password4PMI_locked && I()) {
                if (bI.password4PMI_locked == "true") {
                    bG.prop("checked", bI.password4PMI == "true");
                    h(bI.password4PMI == "true", bI.passwordVal);
                    bD(bI.password4PMI_locked && bI.password4PMI_locked == "true")
                }
            }
            if (bI.password4Schedule_locked && !I()) {
                if (bI.password4Schedule_locked && bI.password4Schedule_locked == "true") {
                    bG.prop("checked", bI.password4Schedule == "true");
                    h(bI.password4Schedule == "true", bI.passwordVal);
                    bD(true)
                }
            }
            meetings.showJbhPriorStartMeeting();
            var bE = [];
            if (bI.showAdditionalDC) {
                bE = JSON.parse(bI.showAdditionalDC)
            }
            if (bE.length > 0) {
                $("#meet-dcs").removeClass("hideme")
            } else {
                $("#meet-dcs").addClass("hideme")
            }
            a3(bI)
        } catch (bJ) {
            if (typeof console !== "undefined") {
                console.debug(bJ)
            }
        }
        aG = false
    }
    function aM(bE) {
        if (bE.find(".locked_by_admin").length == 0) {
            bE.append(a1)
        }
    }
    function A(bE, bG) {
        var bH = bB(bG);
        var bI = bB(bE);
        var bF = af(bE);
        if (bH != bI && bI == "true") {
            V(bF)
        }
    }
    var aG = false;
    function bo(bI) {
        aG = true;
        try {
            if (typeof bI == "undefined") {
                bI = T()
            }
            if (typeof bI == "undefined") {
                return false
            }
            if (bI.hostVideo) {
                $("input[name=option_video_host][value=" + bI.hostVideo + "]").prop("checked", true);
                if (bI.hostVideo_locked && bI.hostVideo_locked == "true") {
                    aM($("input[name=option_video_host]").prop({
                        disabled: true
                    }).parent("label").parent())
                }
            }
            if (bI.pVideo) {
                $("input[name=option_video_participants][value=" + bI.pVideo + "]").prop("checked", true);
                if (bI.pVideo_locked && bI.pVideo_locked == "true") {
                    aM($("input[name=option_video_participants]").prop({
                        disabled: true
                    }).parent("label").parent())
                }
            }
            if (bI.audio) {
                $("input[name=option_audio][value=" + bI.audio + "]").prop("checked", true);
                if (bI.audio == "telephony" || bI.audio == "both") {
                    $("#globalDialinCountries").show();
                    $("#show_tsp_info").show()
                } else {
                    $("#globalDialinCountries").hide();
                    $("#show_tsp_info").hide()
                }
                if (bI.audio == "other") {
                    $("#other_teleconf_info_container").show()
                } else {
                    $("#other_teleconf_info_container").hide()
                }
                if (bI.audio_locked && bI.audio_locked == "true") {
                    aM($("input[name=option_audio]").prop({
                        disabled: true
                    }).parent("label").parent())
                }
            }
            if (bI.thirdAudio_locked && bI.thirdAudio_locked == "true") {}
            if (bI.jbh) {
                $("input[name=option_jbh]").prop("checked", bI.jbh == "true");
                if (bI.jbh_locked && bI.jbh_locked == "true") {
                    aM($("input[name=option_jbh]").prop({
                        disabled: true
                    }).parent("label").parent())
                }
                aO(bI.jbh == "true", bI.JBHPriorStartMeeting)
            }
            if (bI.mute) {
                $("input[name=option_mute_upon_entry]").prop("checked", bI.mute == "true");
                if (bI.mute_locked && bI.mute_locked == "true") {
                    aM($("input[name=option_mute_upon_entry]").prop({
                        disabled: true
                    }).parent("label"))
                }
            }
            var bH = $("#option_public_calender_meeting");
            if (bH.length > 0) {
                if (bI.public_calendar) {
                    bH.prop("checked", bI.public_calendar == "true");
                    if (bI.public_calendar_locked && bI.public_calendar_locked == "true") {
                        aM(bH.prop({
                            disabled: true
                        }).parent("label"))
                    }
                }
            }
            var bF = $("#option_waiting_room");
            if (bF.length > 0) {
                bF.prop("checked", bI.waitingRoom == "true");
                if (bI.waitingRoom_locked && bI.waitingRoom_locked == "true") {
                    aM(bF.prop({
                        disabled: true
                    }).parent("label"))
                }
            }
            meetings.setScheduleWithPMI(bI);
            V(bI);
            if (bI.interpretation == "true") {
                $("#meet-interpretation").removeClass("hideme")
            } else {
                $("#meet-interpretation").addClass("hideme")
            }
            var bE = [];
            if (bI.showAdditionalDC) {
                bE = JSON.parse(bI.showAdditionalDC)
            }
            if (bE.length > 0) {
                $("#meet-dcs").removeClass("hideme")
            } else {
                $("#meet-dcs").addClass("hideme")
            }
            a3(bI);
            var bJ = $("#template_id").val();
            if (bJ == "" || bJ == undefined) {
                if (typeof authVue != "undefined") {
                    authVue.setDefaultOptionForAuthAndWatermark(bI)
                }
            }
        } catch (bG) {
            if (typeof console !== "undefined") {
                console.debug(bG)
            }
        }
        aG = false
    }
    function V(bG) {
        var bF = $("#option_password");
        if (bG.password) {
            if (bF.length > 0 && (bg() || meetings.isPMIMeetingSetting(bG)) && I()) {
                var bE = false;
                if (meetings.isPMIMeetingSetting(bG) && !bg()) {
                    bE = bG.pmiJbhMPwd == "true"
                } else {
                    bE = bG.password == "true"
                }
                bF.prop("checked", bE);
                h(bE, bG.passwordVal);
                bD(bg() && bG.password_locked && bG.password_locked == "true")
            }
        }
        if (typeof bG.password4PMI !== "undefined" && I()) {
            bF.prop("checked", bG.password4PMI == "true");
            h(bG.password4PMI == "true", bG.passwordVal);
            bD(bG.password4PMI_locked && bG.password4PMI_locked == "true")
        }
        if (bG.password4Schedule && !I()) {
            bF.prop("checked", bG.password4Schedule == "true");
            h(bG.password4Schedule == "true", bG.passwordVal);
            bD(bG.password4Schedule_locked && bG.password4Schedule_locked == "true")
        }
    }
    function h(bG, bF) {
        var bE = $("#meeting_pass");
        if (bG) {
            bE.show();
            if (bx && aL()) {
                bE.val(typeof bF != "undefined" && $.trim(bF).length > 0 ? $.trim(bF) : "")
            } else {
                if (typeof bF != "undefined" && $.trim(bF).length > 0) {
                    bE.val(bF)
                }
            }
        } else {
            if (bx && aL() && typeof bE.data("userChgPmiPwd") === "undefined") {
                bE.val(bF)
            }
            bE.hide()
        }
    }
    function aF(bE) {
        if (bE) {
            $("#option_password").prop("checked", true).attr("disabled", true).trigger("change");
            bD(bE)
        } else {
            $("#option_password").prop("checked", true).trigger("change")
        }
    }
    function aL() {
        if ($("#schedule_form").length > 0 || $("#meeting_form").length > 0) {
            if ($("#withPMI").length > 0 && $("#withPMI").is(":visible")) {
                return $("input[name=option_schedulewithpmi][value='on']").prop("checked") ? true : false
            }
        }
        return false
    }
    $("input[name=option_schedulewithpmi]").on("change", function() {
        var bI = aL();
        var bE = {
            ignorePMI: true
        };
        $("#error_security").hide();
        $("#meeting_pass-error").parent().parent().removeClass("has-error");
        $("#meeting_pass-error").remove();
        if (bI) {
            var bF = aY();
            bF = Object.assign(bF, bE);
            bo(bF);
            A(T(), aY());
            if (bt) {
                bt.currentpmiMeetingOptions = bF;
                bt.initVal()
            }
        } else {
            $(".pmi-change-warning").hide();
            var bF = T();
            bF = Object.assign(bF, bE);
            if (bx) {
                bo(bF)
            } else {
                aX(bF);
                a6();
                if (u && u.additionalDcs.length > 0) {
                    $("#meet-dcs").removeClass("hideme")
                } else {
                    $("#meet-dcs").addClass("hideme")
                }
                aZ()
            }
            if (bF.password4Schedule) {
                $("#option_password").prop("checked", bF.password4Schedule == "true");
                h(bF.password4Schedule == "true", bF.passwordVal)
            }
            var bH = $("#responseToSingleOccurrence").val();
            var bG = bF.password4Schedule_locked && bF.password4Schedule_locked == "true" || bH == "true";
            bD(bG);
            if (bt) {
                bt.currentMeetingOptions = bF;
                bt.initVal()
            }
        }
        ba();
        aA($("#option_password"), $("#option_waiting_room"))
    });
    var bi;
    function aZ() {
        var bE = $("#schedule_for option:selected").val();
        if (bE != "") {
            if (bi == "true") {
                $("#request-unmute").removeClass("hideme")
            } else {
                if (bi == "false") {
                    $("#request-unmute").addClass("hideme")
                }
            }
        }
    }
    var bz;
    function a6() {
        var bE = $("#schedule_for option:selected").val();
        if (bE != "") {
            if (bz == "true") {
                $("#meet-interpretation").removeClass("hideme")
            } else {
                if (bz == "false") {
                    $("#meet-interpretation").addClass("hideme")
                }
            }
        }
    }
    function bD(bE) {
        if (bE) {
            $("#option_password").prop("disabled", true).trigger("change");
            if ($("#option_password").parent("label").find(".locked_by_admin").length == 0) {
                F($("#option_password").parent("label"), a1)
            }
        } else {
            $("#option_password").prop("disabled", false).trigger("change");
            $("#option_password").parent("label").find(".locked_by_admin").remove()
        }
    }
    function ae() {
        if (a9 == null) {
            return P
        }
        return a9
    }
    function q() {
        if (aN == null) {
            return aS
        }
        return aN
    }
    function aO(bF, bE) {
        if (typeof jbhPriorStartMeetingIdObj !== "undefined") {
            jbhPriorStartMeetingIdObj.jbh = bF;
            if (typeof bE != "undefined") {
                jbhPriorStartMeetingIdObj.jbhPriorTime = bE
            }
        }
    }
    $("#option_jbh").on("change", function() {
        var bH = bg();
        aO(bH);
        if ($("#m_newRecurrence").length > 0 && $("#m_newRecurrence").val() === "on") {
            return
        }
        var bG = I();
        var bF = T();
        if (q() == "true" && bG) {
            var bI = bF.password_locked == "true";
            if (bH) {
                var bE = $("#option_password").prop("checked");
                if (bE) {
                    bD(bI)
                } else {
                    aF(bI)
                }
            } else {
                $("#option_password").prop("disabled", false).trigger("change");
                bD(false)
            }
        }
    });
    function F(bF, bE) {
        if (bF != null && bF.find(".locked_by_admin").length == 0) {
            bF.append(bE)
        }
    }
    function I() {
        var bE = false;
        if ($("#schedule_form").length > 0 || $("#meeting_form").length > 0) {
            bE = aL()
        } else {
            if ($("#pmi_form").length > 0) {
                bE = true
            }
        }
        return bE
    }
    function bg() {
        return $("#option_jbh").prop("checked")
    }
    function bn() {
        return generateMeetingPasswordByAccount()
    }
    if ($("#pmi_form").length > 0) {
        an()
    }
    if ($("#meeting_form").length > 0) {
        bb();
        aX();
        if (I()) {
            $("#meet-interpretation").addClass("hideme");
            $("#meet-dcs").addClass("hideme")
        }
        ba();
        aA($("#option_password"), $("#option_waiting_room"))
    }
    if ($("#pmi_form").length > 0) {
        aX();
        $("#meet-interpretation").addClass("hideme");
        $("#meet-dcs").addClass("hideme");
        ba();
        aA($("#option_password"), $("#option_waiting_room"))
    }
    if ($("#schedule_form").length > 0) {
        bp();
        au();
        var aV = T();
        if (aL() || typeof aV != null && aV.usePMISchedule == "true") {
            meetings.chooseMeetingId(true);
            var bd = aY();
            aV = Object.assign(aV, bd);
            aV.isPMIMeetingSetting = undefined;
            bo(aV);
            A(T(), bd)
        } else {
            bo()
        }
        if (I()) {
            $("#meet-interpretation").addClass("hideme");
            $("#meet-dcs").addClass("hideme")
        }
        ba();
        aA($("#option_password"), $("#option_waiting_room"))
    }
    if ($("#schedule_pac_form").length > 0) {
        bv()
    }
    if ($("#pac_meeting_form").length > 0) {
        aw()
    }
    function T() {
        return meetings.getUserSettingOptions()
    }
    function aY() {
        var bG = $("#schedule_for option:selected").val();
        var bE = "{}";
        if (bG == "") {
            bE = $("#m_default_pmi_meeting_setting").val()
        } else {
            bE = $("#m_pmi_meeting_setting").val()
        }
        var bF = {};
        if (bE != null && typeof bE != "undefined" && $.trim(bE).length > 0) {
            try {
                bF = JSON.parse(bE)
            } catch (bH) {
                console.log(bH)
            }
        }
        return bF
    }
    function bB(bE) {
        if (bE == null) {
            return "false"
        }
        if (bE.password) {
            return bE.password
        } else {
            return bE.password4PMI
        }
    }
    function af(bE) {
        if (bE == null) {
            return {}
        }
        var bF = {};
        if (bE.password) {
            $.extend(bF, {
                password: bE.password
            })
        } else {
            $.extend(bF, {
                password4PMI: bE.password4PMI
            })
        }
        return bF
    }
    if ($("#switchPacBtn").length > 0) {
        $("#switchPacBtn").on("click", function() {
            var bE = $("#selected_pac_account").val();
            if (bE === "pac2") {
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
    if (aP && n) {
        if ($("#schedule_form").length > 0) {
            if (p === "tsp1") {
                $("#tsp_account_info2").hide();
                $("#tsp_account_info1").show()
            } else {
                $("#tsp_account_info1").hide();
                $("#tsp_account_info2").show()
            }
        }
        $("#use_tsp1").on("click", function() {
            $("#tsp_account_info2").hide();
            $("#tsp_account_info1").show();
            p = "tsp1"
        });
        $("#use_tsp2").on("click", function() {
            $("#tsp_account_info1").hide();
            $("#tsp_account_info2").show();
            p = "tsp2"
        })
    }
    var ab = $("#enable_tsp").length > 0;
    if (ab) {
        if ($("#tsp_account").length > 0) {
            var ao = $("#tsp_account").val();
            p = ao;
            if (ao === "tsp1") {
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
        if (aP) {
            p = "tsp1"
        } else {
            if (n) {
                p = "tsp2"
            }
        }
    }
    function av(bE) {
        if ($("#m_user_id").length > 0) {
            if (bE && $("#access_user_baseurl").length == 1) {
                return $("#access_user_baseurl").val() + "/" + $("#m_user_id").val() + "/meeting/"
            }
            return "/user/" + $("#m_user_id").val() + "/meeting/"
        } else {
            return "/meeting/"
        }
    }
    $(window).on("resize", function() {
        var bE = $(document.body).outerWidth(true);
        if (bE < 490) {
            bE = parseInt(bE) - 70;
            $("#s2id_timezone").css({
                width: bE
            });
            $("#s2id_schedule_for").css({
                width: bE
            })
        }
    });
    var bl = $("#detailPacCopyInviteDialog");
    bl.find(".select-all").on("click", function() {
        $("#invite_email").select();
        document.execCommand("copy");
        SB.showSuccessMsg($.i18n.get("webinar.info.copyied.clipboard"), bl.find(".alert-success"))
    });
    var aT = $("#copyPacInvitation");
    if (aT.length > 0) {
        aT.on("click", function() {
            var bE = $(this).attr("data-id").trim();
            r(bE, false)
        })
    }
    var Q = $("#copyListenInvitation");
    if (Q.length > 0) {
        Q.on("click", function() {
            var bE = $(this).attr("data-id").trim();
            r(bE, true)
        })
    }
    var r = function(bF, bE) {
        var bG = {
            meeting_number: bF,
            listen_only: bE
        };
        SB.post3({
            url: "/meeting/pacInviteEmail",
            data: bG,
            success: function(bH) {
                $.modal(bl, $.extend({}, SB.MODAL_DEFAULTS, {
                    overlayId: "copy-invite-dialog-overlay",
                    containerId: "copy-invite-dialog-container",
                    persist: true,
                    overlayClose: true,
                    maxHeight: 750,
                    minWidth: 630,
                    onShow: function() {
                        bl.find("#invite_email").text(bH.result.scheduleEmail)
                    }
                }))
            },
            error: function(bH, bI) {
                if (bH) {
                    SB.alert(bI)
                }
            },
            showBusy: false
        })
    };
    var aC = function() {
        var bE = false;
        $("div[name=trackfielderror]").remove();
        $("input[name=trackfield]").each(function(bF, bG) {
            if ("true" == $(this).attr("require") && $(this).val().trim() == "") {
                $("<div name='trackfielderror'><span style='color:red;'>" + H + "</span></div>").insertAfter($(this.parentNode));
                bE = true;
                $(this).trigger("focus");
                return false
            }
        });
        return bE
    };
    var aq = function() {
        var bE = [];
        $("input[name=trackfield]").map(function() {
            if ($(this).val().trim() != "") {
                bE.push({
                    id: this.id,
                    mtValue: $(this).val()
                })
            }
        });
        if (bE.length > 0) {
            return JSON.stringify(bE)
        }
        return ""
    };
    function aB(bE, bF) {
        if (bE != "0") {
            if (bE.length < 9) {
                bE = aK(9 - bE.length) + bE
            }
            if (bE.length == 11) {
                return bE.substring(0, 3) + bF + bE.substring(3, 7) + bF + bE.substring(7)
            }
            return bE.substring(0, 3) + bF + bE.substring(3, 6) + bF + bE.substring(6)
        }
        return ""
    }
    function aK(bG) {
        var bE = "";
        if (bG <= 0) {
            return ""
        }
        for (var bF = 0; bF < bG; bF++) {
            bE += "0"
        }
        return bE
    }
    $("#mHostId_Container ul li a").on("click", function(bF) {
        var bH = $(bF.target).attr("data-id");
        var bI = $(bF.target).text();
        $("#mHostIdSelect").val(bH);
        $("#mHostIdSelectName").text(bI);
        var bE = $("#meetingsType").val().trim();
        var bG = [];
        if (bE != "upcoming") {
            bG.push("type=" + bE)
        }
        if (bH) {
            bG.push("hostId=" + bH)
        }
        if (bG.length) {
            SB.jump("/meeting?" + bG.join("&"))
        } else {
            SB.jump("/meeting")
        }
        return false
    });
    $("#tab_container ul li a").on("click", function(bE) {
        $("#tab_container ul li").removeClass("active");
        $(bE.target).parent().addClass("active");
        $("#registrationTab").addClass("hideme");
        $("#emailSettingsTab").addClass("hideme");
        $("#brandingTab").addClass("hideme");
        $("#pollTab").addClass("hideme");
        $("#liveStreamingTab").addClass("hideme");
        var bF = $(bE.target).parent().attr("data-for");
        $("#" + bF).removeClass("hideme")
    });
    var j = $("#editRecurrenceMeetingDialog");
    $("#btnShowEditRecurrenceDialog").on("click", function(bE) {
        $("#edit_meeting_number").val($(bE.target).attr("data-id"));
        $("#edit_meeting_occurrence").val($(bE.target).attr("data-s"));
        $.modal(j, $.extend({}, SB.MODAL_DEFAULTS, {
            overlayId: "edit-recurrence-meeting-dialog-overlay",
            containerId: "edit-recurrence-meeting-dialog-container",
            persist: true,
            minHeight: j.outerHeight(),
            onShow: function() {}
        }))
    });
    $("#btnEditThisOccurrence").on("click", function(bF) {
        var bE = av(false) + $("#edit_meeting_number").val() + "/edit?occurrence=" + $("#edit_meeting_occurrence").val();
        if ($("#view_from_group").length > 0) {
            bE = bE + "&viewgid=" + $("#view_from_group").val()
        }
        SB.jump(bE)
    });
    $("#btnEditAllOccurrences").on("click", function(bF) {
        var bE = av(false) + $("#edit_meeting_number").val() + "/edit";
        if ($("#view_from_group").length > 0) {
            bE = bE + "?viewgid=" + $("#view_from_group").val()
        }
        SB.jump(bE)
    });
    $("#see_all_domain").on("click", function() {
        $.modal($("#upload_domains_all"), $.extend({}, SB.MODAL_DEFAULTS, {
            overlayId: "schedule-dialog-overlay",
            containerId: "schedule-dialog-container",
            persist: true,
            minHeight: 501,
            onShow: function() {}
        }))
    });
    $("a.sort-headers").on("click", function() {
        var bE = window.location.href;
        var bN = $(this);
        var bM = bN.attr("data");
        var bF = true;
        if (bN.find("span.sort-headers").hasClass("sorting_asc")) {
            bF = false
        }
        var bH = bE.split("?");
        if (bH.length == 1) {
            bE = bE + "?sortBy=" + bM + "&sortAsc=" + bF
        } else {
            var bG = bH[1].split("&");
            var bJ = new Array();
            var bK = false;
            var bL = false;
            for (var bI in bG) {
                if (bG[bI].indexOf("sortAsc=") >= 0) {
                    bL = true;
                    bJ.push("sortAsc=" + bF)
                } else {
                    if (bG[bI].indexOf("sortBy=") >= 0) {
                        bK = true;
                        bJ.push("sortBy=" + bM)
                    } else {
                        if (bG[bI].indexOf("p=") >= 0) {} else {
                            bJ.push(bG[bI])
                        }
                    }
                }
            }
            if (!bK) {
                bJ.push("sortBy=" + bM)
            }
            if (!bL) {
                bJ.push("sortAsc=" + bF)
            }
            bH[1] = bJ.join("&");
            bE = bH.join("?")
        }
        window.location.href = bE;
        return false
    });
    var am = $("#configLiveStreamUrl");
    $("#configStreamUrlId").attr({
        "aria-modal": "true",
        "aria-labelledby": "configStreamUrlId stream-title"
    });
    $("#configStreamUrlId").on("click", function() {
        S()
    });
    function S() {
        c();
        $.modal(am, $.extend({}, SB.MODAL_DEFAULTS, {
            overlayId: "config-live-stream-dialog-overlay",
            containerId: "config-live-stream-dialog-container",
            persist: true,
            minHeight: am.outerHeight(),
            onShow: function() {
                l()
            },
            onClose: function() {
                $.modal.close();
                setTimeout(function() {
                    $("#configStreamUrlId").trigger("focus")
                })
            }
        }))
    }
    function l() {
        var bE = window.setInterval(function() {
            $(".live-instruction textarea").trigger("change")
        }, 50);
        window.setTimeout(function() {
            window.clearInterval(bE);
            $("#configLiveStreamUrl .modal-header>h3").trigger("focus")
        }, 500)
    }
    function c() {
        K.resetForm();
        az();
        $(".hide-key-section").show();
        $(".show-key-section").hide();
        am.find(".alert-danger").hide();
        am.find(".form-group").removeClass("has-error");
        am.find("#stream_url").val(am.find("#stream_url_bk").val());
        am.find("#stream_key_h").val(am.find("#stream_key_bk").val());
        am.find("#stream_key_s").val(am.find("#stream_key_bk").val());
        am.find("#live_url").val(am.find("#live_url_bk").val())
    }
    var b = $("#h323EncryEnabled").val() === "true";
    var aR = $("#h323EncryLocked").val() === "true";
    $("#stream_url").on("keyup", function() {
        Y()
    });
    function Y() {
        var bE = $("#stream_url").val().trim();
        if (bE.length > 5) {
            if (bE.toLocaleLowerCase().indexOf("rtmps") === -1) {
                if (b && !aR) {
                    $("#h323Tips").removeClass("hideme")
                } else {
                    if (b && aR) {
                        $("#h323Tips").removeClass("hideme");
                        $("#h323Tips").addClass("help-block-streamUrl");
                        $("#stream_url_div").addClass("has-error");
                        $("#h323TipsIcon").removeClass("zm-icon-warning-outline");
                        $("#conf_live_stream_url_save").prop("disabled", true)
                    }
                }
            } else {
                az()
            }
        } else {
            az()
        }
    }
    function az() {
        $("#h323Tips").addClass("hideme");
        $("#h323Tips").removeClass("help-block-streamUrl");
        $("#stream_url_div").removeClass("has-error");
        $("#h323TipsIcon").addClass("zm-icon-warning-outline");
        $("#conf_live_stream_url_save").prop("disabled", false)
    }
    $("#conf_live_stream_url_save").on("click", function() {
        var bF = $(this);
        if (am.valid()) {
            var bE = {
                stream_url: am.find("#stream_url").val().trim(),
                stream_key: am.find("#stream_key_h").val(),
                live_url: am.find("#live_url").val().trim(),
                number: $("#meeting_number").val()
            };
            SB.post3({
                url: av() + "channel/config",
                data: bE,
                success: function() {
                    SB.saveSuccessCookie("liveStreamingSuccess");
                    location.reload(true)
                },
                btn: bF,
                showBusyAfter: false,
                error: function(bG, bH) {
                    if (bG) {
                        am.find(".alert-danger").text(bH);
                        am.find(".alert-danger").show()
                    }
                }
            })
        }
    });
    var K = am.validate({
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
        var bE = $(this);
        $("#stream_key_s").val(bE.val())
    });
    $("#stream_key_s").change(function() {
        var bE = $(this);
        $("#stream_key_h").val(bE.val())
    });
    $("#liveCustomConfigEditId").click(function() {
        S()
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
    window.addEventListener("resize", function(bE) {
        $(".live-instruction textarea").trigger("change")
    });
    var m = $("#saveMeetingTemplateDialog");
    $(".saveMeetingTemplate").attr({
        "aria-modal": "true",
        "aria-labelledby": "saveMeetingTemplate saveMeetingTemplateDialog_title"
    });
    $(".saveMeetingTemplate").click(function() {
        var bF = $(this);
        var bE = bF.attr("data-s");
        var bG = bF.attr("data-id");
        m.find("#meetingNumberTemplate").val(bG);
        $.modal(m, $.extend({}, SB.MODAL_DEFAULTS, {
            overlayId: "save-meeting-template-dialog-overlay",
            containerId: "save-meeting-template-dialog-container",
            escClose: true,
            persist: true,
            minHeight: m.outerHeight(),
            onShow: function() {
                m.find("#template_name").val();
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
    m.find(".save").click(function() {
        var bE = m.find("#template_name").val();
        var bH = $("#save_recurrence");
        var bG = false;
        if (bH.length > 0) {
            bG = bH.prop("checked")
        }
        var bF = $("#meetingNumberTemplate").val();
        SB.post3({
            url: "/meeting/" + bF + "/savetemplate",
            data: {
                template_name: bE,
                is_save_recurrence: bG
            },
            success: function(bI) {
                $.modal.close();
                SB.showSuccessMsg($.i18n.get("js_webinar.info_save_template_success"))
            },
            error: function(bK, bI, bJ) {
                if (bJ == 404) {
                    location.reload(true)
                }
                if (bJ == 3066) {
                    $("#existedTemplate").text($.i18n.get("webinar.info_exist_template", bE));
                    $(".save-template").hide();
                    $(".overwrite-template").show();
                    $(".max-template").hide()
                }
                if (bJ == 3067) {
                    $(".save-template").hide();
                    $(".overwrite-template").hide();
                    $(".max-template").show()
                }
            },
            btnContainer: m,
            showBusy: true
        })
    });
    $("#template").change(function() {
        var bE = $(this);
        var bF = bE.val();
        if (bF.length > 10) {
            f(bF);
            $("#withPMI").addClass("hideme")
        } else {
            $("#template_id").val("");
            $("#withPMI").removeClass("hideme");
            au()
        }
    });
    var s = function(bE) {
        if ($("#option_video_host_on").prop("disabled") || $("#option_video_host_off").prop("disabled")) {
            return
        }
        if (bE) {
            $("#option_video_host_on").prop("checked", true);
            $("#option_video_host_off").prop("checked", false)
        } else {
            $("#option_video_host_on").prop("checked", false);
            $("#option_video_host_off").prop("checked", true)
        }
    };
    var g = function(bE) {
        if ($("#option_video_panelist_on").prop("disabled") || $("#option_video_panelist_off").prop("disabled")) {
            return
        }
        if (bE) {
            $("#option_video_participant_on").prop("checked", true);
            $("#option_video_participant_off").prop("checked", false)
        } else {
            $("#option_video_participant_on").prop("checked", false);
            $("#option_video_participant_off").prop("checked", true)
        }
    };
    var bf = function(bE) {
        if ($("#option_audio_telephony").prop("disabled") || $("#option_audio_voip").prop("disabled")) {
            return
        }
        var bG = $("#option_audio_both");
        var bJ = bG.length > 0;
        var bF = $("#option_audio_other");
        var bH = bF.length > 0;
        var bI = $("#isOtherTeleConfEnabled").val();
        if (bI || bE === "other") {
            $("#other_teleconf_info_container").show()
        } else {
            $("#other_teleconf_info_container").hide()
        }
        if (bE === "telephony") {
            $("#option_audio_telephony").prop("checked", true);
            $("#option_audio_voip").prop("checked", false);
            if (bJ) {
                bG.prop("checked", false)
            }
            if (bH) {
                bF.prop("checked", false)
            }
            $("#globalDialinCountries").show();
            $("#other_teleconf_info_container").hide()
        } else {
            if (bE === "voip") {
                $("#option_audio_telephony").prop("checked", false);
                $("#option_audio_voip").prop("checked", true);
                if (bJ) {
                    bG.prop("checked", false)
                }
                if (bH) {
                    bF.prop("checked", false)
                }
                $("#globalDialinCountries").hide();
                $("#other_teleconf_info_container").hide();
                $("#show_tsp_info").hide()
            } else {
                if (bE === "both") {
                    if (bJ) {
                        bG.prop("checked", true);
                        $("#option_audio_telephony").prop("checked", false)
                    } else {
                        $("#option_audio_telephony").prop("checked", true)
                    }
                    $("#option_audio_voip").prop("checked", false);
                    if (bH) {
                        bF.prop("checked", false)
                    }
                    $("#globalDialinCountries").show();
                    $("#other_teleconf_info_container").hide()
                } else {
                    if (bE === "other") {
                        if (bH) {
                            bF.prop("checked", true);
                            $("#option_audio_voip").prop("checked", false);
                            $("#option_audio_telephony").prop("checked", false);
                            if (bJ) {
                                bG.prop("checked", false)
                            }
                        } else {
                            $("#option_audio_telephony").prop("checked", true);
                            $("#option_audio_voip").prop("checked", false);
                            if (bJ) {
                                bG.prop("checked", false)
                            }
                        }
                        $("#globalDialinCountries").hide();
                        $("#other_teleconf_info_container").show()
                    }
                }
            }
        }
    };
    var X = function(bE) {
        if (bE) {
            $("#mt_time").show()
        } else {
            $("#mt_time").hide()
        }
    };
    var e = function(bE) {
        if (typeof bE !== "undefined" && bE.length > 0) {
            $("#show_tsp_info").show();
            if (bE === "tsp1") {
                $("#tsp_account_info2").hide();
                $("#tsp_account_info1").show()
            } else {
                $("#tsp_account_info1").hide();
                $("#tsp_account_info2").show()
            }
        }
    };
    if ($("#option_additional_dcs").length > 0) {
        var D = $("#additional_dcs").val();
        if (typeof D == "undefined" || D == "") {
            D = "[]"
        }
        var W = JSON.parse(D);
        bu(W)
    }
    var u;
    function bu(bE) {
        var bF = [];
        bE.forEach(function(bG) {
            bF.push({
                displayName: bG.name,
                key: bG.key,
                dcValue: bG.checked
            })
        });
        u = new Vue({
            el: "#additionalDcSubOption",
            data: {
                additionalDcs: bF
            },
            methods: {
                dcCheck: function(bG) {
                    if (bG.dcValue) {
                        $("#additionalDCError").hide()
                    }
                },
                addAdditionalDcs: function(bI) {
                    if ($("#option_additional_dcs").length > 0) {
                        var bH = $("#option_additional_dcs").prop("checked") ? true : false;
                        var bG = false;
                        u.additionalDcs.forEach(function(bJ) {
                            bG = bG || bJ.dcValue
                        });
                        if (bH && !bG) {
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
        a8()
    });
    a8();
    function a8() {
        if ($("#option_additional_dcs").prop("checked")) {
            $("#additionalDcSubOption").removeClass("hideme")
        } else {
            $("#additionalDcSubOption").addClass("hideme")
        }
    }
    function al(bF) {
        if (I()) {
            $.extend(bF, {
                enable_additional_dcs: false
            })
        } else {
            if ($("#option_additional_dcs").length > 0) {
                $.extend(bF, {
                    enable_additional_dcs: $("#option_additional_dcs").prop("checked") ? true : false,
                });
                var bE = [];
                u.additionalDcs.forEach(function(bG) {
                    bE.push({
                        key: bG.key,
                        checked: bG.dcValue
                    })
                });
                $.extend(bF, {
                    additional_dcs: JSON.stringify(bE)
                })
            }
        }
    }
    function bh(bE) {
        if (typeof bE == "undefined") {
            bE = $("#additional_dcs").val()
        }
        if (typeof bE == "undefined" || bE == "") {
            bE = "[]"
        }
        D = JSON.parse(bE);
        var bF = [];
        D.forEach(function(bG) {
            bF.push({
                displayName: bG.name,
                key: bG.key,
                dcValue: bG.checked
            })
        });
        u.additionalDcs = bF;
        if (D.length > 0) {
            $("#meet-dcs").removeClass("hideme")
        } else {
            $("#meet-dcs").addClass("hideme");
            $("#option_additional_dcs").prop("checked", false);
            a8()
        }
        if (I()) {
            $("#meet-dcs").addClass("hideme")
        }
    }
    function a5(bE) {
        if ($("#request-unmute").hasClass("hideme") == false) {
            $.extend(bE, {
                enable_unmute_all: $("#option_request_unmute_all").prop("checked") ? true : false,
            })
        }
    }
    function a3(bE) {
        if (bE.showUnmuteAll == "true") {
            $("#request-unmute").removeClass("hideme");
            if (bE.enableUnmuteAll == "true") {
                $("#option_request_unmute_all").prop("checked", true)
            } else {
                if (bE.enableUnmuteAll == "false") {
                    $("#option_request_unmute_all").prop("checked", false)
                }
            }
        } else {
            $("#request-unmute").addClass("hideme")
        }
    }
    function ag(bE) {
        if (bE.interpretation == "true") {
            $("#meet-interpretation").removeClass("hideme")
        } else {
            $("#meet-interpretation").addClass("hideme")
        }
    }
    var m = $("#saveMeetingTemplateDialog");
    m.find(".change").click(function() {
        $(".save-template").show();
        $(".overwrite-template").hide();
        $(".max-template").hide()
    });
    m.find(".overwrite").click(function() {
        var bE = false;
        var bF = $("#save_recurrence");
        if (bF.length > 0) {
            bE = bF.prop("checked")
        }
        SB.post3({
            url: "/meeting/" + $("#meeting_number").val() + "/savetemplate",
            data: {
                overwrite: true,
                is_save_recurrence: bE,
                template_name: m.find("#template_name").val()
            },
            success: function(bG) {
                SB.showSuccessMsg($.i18n.get("js_webinar.info_save_template_success"))
            },
            btnContainer: m,
            showBusy: true
        })
    });
    var f = function(bE) {
        if (bE.length > 10) {
            SB.post3({
                url: "/meeting/template/" + bE + "/load",
                data: {},
                success: function(bF) {
                    if (bF.result.hasOwnProperty("topic")) {
                        $("#tem_schedule_flag").val("is_tem_schedule");
                        $("#template_id").val(bE);
                        $("#topic").val(bF.result.topic);
                        $("#agenda").val(bF.result.agenda);
                        $("#option_rm").prop("checked", bF.result.newRecurrence || bF.result.classicRecurrence);
                        $("#duration_hr").val(bF.result.duration_hr).trigger("change");
                        $("#duration_min").val(bF.result.duration_min).trigger("change");
                        timezone_vue.val = bF.result.timezone;
                        $("#option_registration").prop("checked", bF.result.registrationEnabled);
                        $("#option_public_calender_meeting").prop("checked", bF.result.isEnableMeeting2Public);
                        if ($("#option_video_host_row .locked_by_admin").length === 0) {
                            s(bF.result.optionVideoHost)
                        }
                        if ($("#option_video_participant_row .locked_by_admin").length === 0) {
                            g(bF.result.optionVideoParticipants)
                        }
                        bf(bF.result.optionAudioType);
                        if (bF.result.optionAudioType !== "voip" && $("#audio_row .locked_by_admin").length === 0) {
                            e(bF.result.tsp_account)
                        }
                        if (bF.result.password !== "") {
                            $("#option_password").prop("checked", true);
                            $("#meeting_pass").val(bF.result.password).show()
                        } else {
                            $("#option_password").prop("checked", false);
                            $("#meeting_pass").hide()
                        }
                        if (!$("#option_jbh").prop("disabled")) {
                            $("#option_jbh").prop("checked", bF.result.optionJBH)
                        }
                        if (!$("#option_mute_upon_entry").prop("disabled")) {
                            $("#option_mute_upon_entry").prop("checked", bF.result.optionMuteUponEntry)
                        }
                        if (!$("#option_waiting_room").prop("disabled")) {
                            $("#option_waiting_room").prop("checked", bF.result.optionWaitingRoom)
                        }
                        if ($("#auth").length > 0) {
                            authVue.reloadAuth4Template(bF)
                        }
                        if (bF.result.classicRecurrence) {
                            $("#recurrence").val(bF.result.recurrenceSettings);
                            $("#recurrence").attr("data-s", bF.result.recurrenceSettings);
                            $(document).trigger("changeClassicRecurrence");
                            $(".registrationRequiredType").hide();
                            hideDemand()
                        } else {
                            if (bF.result.newRecurrence) {
                                $("#recurrence").val(bF.result.recurrenceSettings);
                                $("#recurrence").attr("data-s", bF.result.recurrenceSettings);
                                $(document).trigger("changeNewRecurrence");
                                if (bF.result.registrationEnabled) {
                                    $(".registrationRequiredType").show();
                                    $("input[name='registrationRequiredType']").each(function() {
                                        if ($(this).val() === bF.result.registrationRequiredType) {
                                            $(this).prop("checked", true)
                                        } else {
                                            $(this).prop("checked", false)
                                        }
                                    })
                                } else {
                                    $(".registrationRequiredType").hide()
                                }
                            } else {
                                X(true);
                                $("#option_rm").prop("checked", false);
                                $("#recurrenceDialog").addClass("hideme");
                                $("#recurrence").val("");
                                $("#recurrence").attr("data-s", "");
                                $(".recurrence_desc").hide();
                                $(".registrationRequiredType").hide()
                            }
                        }
                        if (bF.result.autorecVal === "local") {
                            $("#option_autorec").prop("checked", true);
                            $(".sub-options").show();
                            $("#option_autorec_local").prop("checked", true)
                        } else {
                            if (bF.result.autorecVal === "cloud") {
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
                        $("#tem_schedule_flag").val("");
                        if ($("#request-unmute").hasClass("hideme") == false) {
                            if (bF.result.enable_unmute_all) {
                                $("#option_request_unmute_all").prop("checked", true)
                            } else {
                                $("#option_request_unmute_all").prop("checked", false)
                            }
                        }
                    }
                },
                error: function(bH, bF, bG) {},
                showBusy: false
            })
        }
    };
    if ($("#encryption-option").length > 0) {
        var bt = new Vue({
            el: "#encryption-option",
            data: function() {
                return {
                    supportE2eeMeetingFlag: supportE2eeMeeting,
                    responseToSingleOccurrence: responseToSingleOccurrence,
                    canScheduleE2EEMeetingFlag: canScheduleE2EEMeeting,
                    meetingDefaultOptions: meetingDefaultOptions,
                    pmiMeetingSetting: pmiMeetingSetting,
                    currentMeetingOptions: meetingDefaultOptions,
                    currentpmiMeetingOptions: pmiMeetingSetting,
                    encryptionVal: e2eeMeetingOption,
                    e2eDisabled: false,
                    showAutoLocal: showAutoLocal,
                    relatedOption: {
                        jbhVal: false,
                        jbhDisabled: false,
                        signinVal: false,
                        signinDisabled: false,
                        localRecordingVal: false,
                        cloudRecordingVal: false,
                        cloudRecordingDIsabled: false,
                        audioVal: "",
                        audioDisabled: false
                    }
                }
            },
            methods: {
                initVal: function() {
                    this.$nextTick(function() {
                        if ($("#optionScheduleWithPMI").length > 0) {
                            if ($("#optionScheduleWithPMI").prop("checked")) {
                                this.supportE2eeMeetingFlag = JSON.parse(this.currentpmiMeetingOptions.supportE2eeMeeting || "false");
                                this.canScheduleE2EEMeetingFlag = JSON.parse(this.currentpmiMeetingOptions.canScheduleE2EEMeeting || "true");
                                if (this.supportE2eeMeetingFlag) {
                                    this.e2eDisabled = JSON.parse(this.currentpmiMeetingOptions.E2EEMeeting_locked || "false");
                                    if (this.e2eDisabled) {
                                        this.encryptionVal = JSON.parse(this.currentpmiMeetingOptions.E2EEMeeting)
                                    } else {
                                        this.encryptionVal = JSON.parse(this.currentpmiMeetingOptions.e2eeMeetingOption || "false")
                                    }
                                    this.relatedOption = {
                                        jbhVal: JSON.parse(this.currentpmiMeetingOptions.jbh || optionJBH),
                                        jbhDisabled: JSON.parse(this.currentpmiMeetingOptions.jbh_locked || "false"),
                                        signinVal: JSON.parse(this.currentpmiMeetingOptions.signed || "false"),
                                        signinDisabled: JSON.parse(this.currentpmiMeetingOptions.signed_checkbox_locked || "false"),
                                        localRecordingVal: $("#option_autorec_local").prop("checked"),
                                        cloudRecordingVal: $("#option_autorec_cloud").prop("checked"),
                                        cloudRecordingDIsabled: $("#option_autorec_cloud").prop("disabled"),
                                        audioVal: this.currentpmiMeetingOptions.audio || $("#m_option_audio").val(),
                                        audioDisabled: JSON.parse(this.currentpmiMeetingOptions.audio_locked || "false")
                                    }
                                }
                            } else {
                                this.supportE2eeMeetingFlag = JSON.parse(this.currentMeetingOptions.supportE2eeMeeting || "false");
                                this.canScheduleE2EEMeetingFlag = JSON.parse(this.currentMeetingOptions.canScheduleE2EEMeeting || "true");
                                if (this.supportE2eeMeetingFlag) {
                                    this.encryptionVal = JSON.parse(this.currentMeetingOptions.E2EEMeeting || e2eeMeetingOption);
                                    this.e2eDisabled = JSON.parse(this.currentMeetingOptions.E2EEMeeting_locked || "false");
                                    this.relatedOption = {
                                        jbhVal: JSON.parse(this.currentMeetingOptions.jbh || optionJBH),
                                        jbhDisabled: JSON.parse(this.currentMeetingOptions.jbh_locked || "false"),
                                        signinVal: JSON.parse(this.currentMeetingOptions.signed || window.setModel.authCheck),
                                        signinDisabled: JSON.parse(this.currentMeetingOptions.signed_checkbox_locked || "false"),
                                        localRecordingVal: $("#option_autorec_local").prop("checked"),
                                        cloudRecordingVal: $("#option_autorec_cloud").prop("checked"),
                                        cloudRecordingDIsabled: $("#option_autorec_cloud").prop("disabled"),
                                        audioVal: this.currentMeetingOptions.audio || $("#m_option_audio").val(),
                                        audioDisabled: JSON.parse(this.currentMeetingOptions.audio_locked || "false")
                                    }
                                }
                            }
                        } else {
                            this.supportE2eeMeetingFlag = JSON.parse(this.currentMeetingOptions.supportE2eeMeeting || supportE2eeMeeting);
                            this.canScheduleE2EEMeetingFlag = JSON.parse(this.currentMeetingOptions.canScheduleE2EEMeeting || canScheduleE2EEMeeting);
                            if (this.supportE2eeMeetingFlag) {
                                this.encryptionVal = JSON.parse(this.currentMeetingOptions.E2EEMeeting || e2eeMeetingOption);
                                this.e2eDisabled = JSON.parse(this.currentMeetingOptions.E2EEMeeting_locked || "false");
                                this.relatedOption = {
                                    jbhVal: JSON.parse(this.currentMeetingOptions.jbh || optionJBH),
                                    jbhDisabled: JSON.parse(this.currentMeetingOptions.jbh_locked || "false"),
                                    signinVal: JSON.parse(this.currentMeetingOptions.signed || window.setModel.authCheck),
                                    signinDisabled: JSON.parse(this.currentMeetingOptions.signed_checkbox_locked || "false"),
                                    localRecordingVal: $("#option_autorec_local").prop("checked"),
                                    cloudRecordingVal: $("#option_autorec_cloud").prop("checked"),
                                    cloudRecordingDIsabled: $("#option_autorec_cloud").prop("disabled"),
                                    audioVal: this.currentMeetingOptions.audio || $("#m_option_audio").val(),
                                    audioDisabled: JSON.parse(this.currentMeetingOptions.audio_locked || "false")
                                }
                            }
                        }
                        if (this.supportE2eeMeetingFlag) {
                            meetings.showJbhPriorStartMeeting();
                            this.changeEncryptionOption()
                        }
                    })
                },
                changeEncryptionOption: function() {
                    var bE = this;
                    if (this.supportE2eeMeetingFlag) {
                        if (this.encryptionVal) {
                            this.$nextTick(function() {
                                $("#option_jbh").prop("disabled", true).prop("checked", false);
                                $("#option_enforce_signed_in").prop("disabled", true).prop("checked", true);
                                if (window.authVue && $("#option_enforce_signed_in").length > 0) {
                                    window.authVue.authCheck = true;
                                    window.authVue.ssoDisabled = true;
                                    window.authVue.optionChange();
                                    if (window.authVue.selectAuthType == 2) {
                                        if (window.authVue.selectDefaultAuthType !== 2) {
                                            window.authVue.selectAuthType = window.authVue.selectDefaultAuthType;
                                            window.authVue.defaultAuth = window.authVue.selectDefaultAuth;
                                            window.authVue.selectAuthId = window.authVue.selectDefaultAuthId
                                        } else {
                                            window.authVue.optionsLimit.every(function(bF) {
                                                if (bF.type !== 2) {
                                                    window.authVue.selectAuthType = bF.type;
                                                    window.authVue.defaultAuth = bF.name;
                                                    window.authVue.selectAuthId = bF.id;
                                                    return false
                                                }
                                            });
                                            return false
                                        }
                                    }
                                }
                                if (this.showAutoLocal) {
                                    $("#option_autorec_cloud").prop("disabled", true).prop("checked", false);
                                    $("#option_autorec_local").prop("checked", true)
                                } else {
                                    $("#meet-autorec").hide()
                                }
                                bf("voip");
                                $("input[name='option_audio']").prop("disabled", true)
                            })
                        } else {
                            this.$nextTick(function() {
                                $("#option_jbh").prop("disabled", this.relatedOption.jbhDisabled).prop("checked", this.relatedOption.jbhVal);
                                $("#option_enforce_signed_in").prop("disabled", this.relatedOption.signinDisabled).prop("checked", this.relatedOption.signinVal);
                                if (window.authVue && $("#option_enforce_signed_in").length > 0) {
                                    window.authVue.authCheck = this.relatedOption.signinVal;
                                    window.authVue.ssoDisabled = false;
                                    window.authVue.optionChange()
                                }
                                if (this.showAutoLocal) {
                                    $("#option_autorec_cloud").prop("disabled", this.relatedOption.cloudRecordingDIsabled).prop("checked", this.relatedOption.cloudRecordingVal);
                                    $("#option_autorec_local").prop("checked", this.relatedOption.localRecordingVal)
                                } else {
                                    $("#meet-autorec").show()
                                }
                                $("input[name='option_audio']").prop("disabled", this.relatedOption.audioDisabled);
                                bf(bE.relatedOption.audioVal)
                            })
                        }
                    }
                }
            },
            mounted: function() {
                this.$nextTick(function() {
                    this.initVal();
                    $("#encryption-option-content").removeClass("hideme")
                })
            }
        })
    }
    by = false
});

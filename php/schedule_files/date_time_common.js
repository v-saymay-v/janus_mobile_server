function convert24HourTo12Hour(c) {
    if (!c || c == "") {
        return ""
    }
    var a = Number(c.match(/^(\d+)/)[1]);
    var b = Number(c.match(/:(\d+)/)[1]);
    if (a == 0) {
        return "12:" + padding0(b, 2) + " AM"
    } else {
        if (a < 12) {
            return padding0(a, 2) + ":" + padding0(b, 2) + " AM"
        } else {
            if (a == 12) {
                return a + ":" + padding0(b, 2) + " PM"
            } else {
                if (a > 12) {
                    return padding0(a - 12, 2) + ":" + padding0(b, 2) + " PM"
                }
            }
        }
    }
}
function padding0(a, b) {
    return (Array(b).join("0") + a).slice(-b)
}
function getHHMMByValue(a) {
    if (a.toUpperCase().endsWith("AM") || a.toUpperCase().endsWith("PM")) {
        return a.split(" ")[0]
    } else {
        return convert24HourTo12Hour(a).split(" ")[0]
    }
}
function getAMPMByValue(a) {
    if (a.toUpperCase().endsWith("AM") || a.toUpperCase().endsWith("PM")) {
        return a.split(" ")[1]
    } else {
        return convert24HourTo12Hour(a).split(" ")[1]
    }
}
function convert12HourTo24Hour(a, b) {
    if (b.toUpperCase() === "AM") {
        var d = a.split(":");
        var c = parseInt(d[0]);
        if (c < 10) {
            return "0" + c + ":" + d[1]
        } else {
            if (c == 12) {
                return "00:" + d[1]
            }
        }
        return a
    } else {
        if (a.indexOf("12:") == 0) {
            return a
        } else {
            var d = a.split(":");
            var c = 12 + parseInt(d[0]);
            return c + ":" + d[1]
        }
    }
}
function commonParseDate(a, b) {
    return $.datepicker.parseDate(b, a)
}
function commonFormatDate(a, b) {
    return $.datepicker.formatDate(b, a)
}
function parseDateByCookies(a) {
    var c = $.cookie("_zm_date_format");
    try {
        return $.datepicker.parseDate(c, a)
    } catch (b) {
        refreshDateFormatCookie()
    }
}
function formatDateByCookies(a) {
    var b = $.cookie("_zm_date_format");
    return $.datepicker.formatDate(b, a)
}
function convertDateFotmat(b, c, a) {
    try {
        return commonFormatDate(commonParseDate(b, c), a)
    } catch (d) {
        refreshDateFormatCookie()
    }
}
function refreshDateFormatCookie() {
    if ($.cookie("_zm_date_format_refresh_flag") == null || $.cookie("_zm_date_format_refresh_flag") == "") {
        $.cookie("_zm_date_format", null, {
            expires: null,
            path: "/",
            domain: SB.cookieDomain,
            secure: true
        });
        var a = new Date();
        var b = 2;
        a.setTime(a.getTime() + (b * 60 * 1000));
        $.cookie("_zm_date_format_refresh_flag", "refresh", {
            expires: a,
            path: "/",
            secure: true
        });
        location.reload()
    } else {
        console.log("Occurs error when parse date, please clear cookies and retry.")
    }
}
function getHHMM() {
    var a = $("#start_time").val();
    if ($("#start_time_2").length > 0) {
        return a
    } else {
        return convert24HourTo12Hour(a).split(" ")[0]
    }
}
function getAMPM() {
    var a = $("#start_time").val();
    if ($("#start_time_2").length > 0) {
        return ampmVue.val
    } else {
        return convert24HourTo12Hour(a).split(" ")[1]
    }
}
function validate12Time(a) {
    return /^((0?[1-9]|1[012])(:[0-5]\d){1,2})$/i.test(a)
}
function validate24Time(a) {
    return /^(([01]?[0-9]|2[0123])(:[0-5]\d){1,2})$/i.test(a)
}
function getErrorMessage4Time(b, a) {
    var d = "";
    var c = "#start_time_2";
    if (a) {
        c = "#" + a
    }
    if ($(c).length > 0 && !validate12Time(b)) {
        d = $.i18n.get("common.enter_time_in_12_hour")
    } else {
        if ($(c).length <= 0 && !validate24Time(b)) {
            d = $.i18n.get("common.enter_time_in_24_hour")
        }
    }
    return d
}
function initStartTime(b) {
    if ($("#start_time").length > 0) {
        var a = window.startTimeVue = new Vue({
            el: "#start_time",
            data: {
                times: times,
                val: b
            },
            methods: {
                selectChange: function(d) {
                    if (d) {
                        $(".webinar-error-time").text("");
                        $(".webinar-error-time").hide()
                    } else {
                        var c = getErrorMessage4Time(this.val);
                        if (c != "") {
                            $(".webinar-error-time").text(c);
                            $(".webinar-error-time").show();
                            return false
                        } else {
                            $(".webinar-error-time").text("");
                            $(".webinar-error-time").hide();
                            this.$nextTick(function() {
                                RecurrenceTools.saveRecurrenceSettings()
                            })
                        }
                    }
                }
            }
        })
    }
}
function initStartTime2(b) {
    if ($("#start_time_2").length > 0) {
        var a = window.ampmVue = new Vue({
            el: "#start_time_2",
            data: {
                val: b,
                options: [{
                    value: "AM",
                    name: $.i18n.get("common.time_am")
                }, {
                    value: "PM",
                    name: $.i18n.get("common.time_pm")
                }]
            },
            methods: {
                selectChange: function() {
                    this.$nextTick(function() {
                        RecurrenceTools.saveRecurrenceSettings()
                    })
                }
            }
        })
    }
}
function initRecurrenceDialogVues() {
    if ($("#recurrenceDialog").length > 0) {
        window.recurrenceTypeVue = new Vue({
            el: "#recurrenceDialog",
            data: {
                recurrenceType: "DAILY",
                dailyInterval: "1",
                weeklyInterval: "1",
                monthlyInterval: "1",
                endTimes: "7",
                monthlyByDay: "1",
                montlyByWeekdayIndex: "1",
                montlyByWeekday: "1",
                montlyByWeekdayIndex_opt: [{
                    value: "1",
                    name: $.i18n.get("webinar.recurrence_first")
                }, {
                    value: "2",
                    name: $.i18n.get("webinar.recurrence_second")
                }, {
                    value: "3",
                    name: $.i18n.get("webinar.recurrence_third")
                }, {
                    value: "4",
                    name: $.i18n.get("webinar.recurrence_fourth")
                }, {
                    value: "-1",
                    name: $.i18n.get("webinar.recurrence_last")
                }],
                montlyByWeekday_opt: [{
                    value: "1",
                    name: $.i18n.get("webinar.sunday")
                }, {
                    value: "2",
                    name: $.i18n.get("webinar.monday")
                }, {
                    value: "3",
                    name: $.i18n.get("webinar.tuesday")
                }, {
                    value: "4",
                    name: $.i18n.get("webinar.wednesday")
                }, {
                    value: "5",
                    name: $.i18n.get("webinar.thursday")
                }, {
                    value: "6",
                    name: $.i18n.get("webinar.friday")
                }, {
                    value: "7",
                    name: $.i18n.get("webinar.saturday")
                }],
                options: [{
                    value: "DAILY",
                    name: $.i18n.get("webinar.recurrence_type_daily")
                }, {
                    value: "WEEKLY",
                    name: $.i18n.get("webinar.recurrence_type_weekly")
                }, {
                    value: "MONTHLY",
                    name: $.i18n.get("webinar.recurrence_type_monthly")
                }, {
                    value: "CLASSIC",
                    name: $.i18n.get("webinar.recurrence_type_classic")
                }]
            },
            methods: {
                selectChange: function() {
                    RecurrenceTools.recurrenceTypeChanged(true)
                }
            }
        })
    }
}
function initDurationHour(a) {
    if ($("#duration_hr").length > 0) {
        new Vue({
            el: "#duration_hr",
            data: {
                hours: hours,
                val: a
            },
            methods: {
                selectChange: function() {}
            }
        })
    }
}
function initDurationMinute(a) {
    if ($("#duration_min").length > 0) {
        new Vue({
            el: "#duration_min",
            data: {
                minutes: minutes,
                val: a
            },
            methods: {
                selectChange: function() {}
            }
        })
    }
}
function initTimeZone(b) {
    if ($("#timezone").length > 0) {
        var a = window.timezone_vue = new Vue({
            el: "#timezone",
            data: {
                timezones: timezones,
                val: b
            },
            methods: {
                selectChange: function() {
                    this.$nextTick(function() {
                        RecurrenceTools.saveRecurrenceSettings()
                    })
                }
            },
            mounted: function() {
                this.$nextTick(function() {
                    RecurrenceTools.saveRecurrenceSettings()
                })
            }
        })
    }
}
function getAMPMValue(b) {
    var c = [{
        value: "AM",
        name: $.i18n.get("common.time_am")
    }, {
        value: "PM",
        name: $.i18n.get("common.time_pm")
    }];
    for (var a in c) {
        if (c[a].name == b) {
            return c[a].value
        }
    }
    return b
}
;
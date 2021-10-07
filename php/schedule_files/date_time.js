$(window).on("load", function() {
    initStartTime($("#m_start_time").val());
    initStartTime2($("#m_start_time_2").val());
    initDurationHour($("#m_duration_hr").val());
    initDurationMinute($("#m_duration_min").val());
    initRecurrenceDialogVues();
    if ($("#timezone").length > 0) {
        var timezone = $("#m_timezone").val();
        var timezoneVue = window.timezone_vue = new Vue({
            el: "#timezone",
            data: {
                timezones: timezones,
                val: timezone
            },
            methods: {
                selectChange: function() {
                    this.$nextTick(function() {
                        RecurrenceTools.saveRecurrenceSettings()
                    })
                }
            }
        })
    };
});

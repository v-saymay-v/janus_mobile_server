var editDomainDialog = {
    template: "#edit-domain-dialog",
    name: "editDomainDialog",
    props: ["editDomainDialogVisible", "authDomain", "lockedAuth"],
    data: function() {
        return {
            domain: "",
            hasErrorDomain: false
        }
    },
    computed: {
        visible: {
            get: function() {
                return this.editDomainDialogVisible
            },
            set: function(a) {
                this.$emit("update:editDomainDialogVisible", a)
            }
        }
    },
    watch: {
        editDomainDialogVisible: function(a) {
            if (a) {
                this.domain = _.cloneDeep(this.authDomain)
            }
        }
    },
    methods: {
        saveDomains: function() {
            var a = this.validateEmail(this.domain);
            if (!a) {
                this.hasErrorDomain = true
            } else {
                this.hasErrorDomain = false;
                this.visible = false;
                this.$emit("update:authDomain", this.domain)
            }
        },
        cancelDomains: function() {
            this.visible = false
        },
        validateEmail: function(d) {
            if (d == "") {
                return false
            }
            var c = $.trim(d);
            if (!c) {
                return true
            }
            var e = c.split(/[;,\n\r]+/);
            var b = true;
            for (var a = 0; a < e.length; a++) {
                d = $.trim(e[a]);
                if (d == "") {
                    return false
                }
                if (!d) {
                    continue
                }
                if (d.substr(0, 2) == "*.") {
                    if (d.split(".").length <= 2) {
                        b = false
                    } else {
                        continue
                    }
                }
                b = /^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))$/i.test("a@" + d)
            }
            return b === true
        }
    }
};
Vue.component("editDomainDialog", editDomainDialog);
if ($("#auth").length > 0) {
    var authVue = window.authVue = new Vue({
        el: "#auth",
        data: function() {
            return {
                showDomainDiv: setModel.defaultType == 1 ? true : false,
                showSelectInput: $("#option_enforce_signed_in").prop("checked"),
                defaultAuth: setModel.defaultAuth,
                authDomain: setModel.authDomain,
                optionsLimit: setModel.authInfoList,
                authDomainLength: setModel.authDomainLength,
                editDomainDialogVisible: false,
                selectAuthType: setModel.defaultType,
                selectAuthId: setModel.defaultAuthId,
                authDomainPart: setModel.authDomainPart,
                lockedAuth: setModel.lockedAuth,
                authMethodLength: setModel.authMethodLength,
                authCheck: setModel.authCheck,
                isUserSettingOpen: setModel.isUserSettingOpen,
                lastSelectAuthType: setModel.defaultType,
                lastSelectAuthName: setModel.defaultAuth,
                deleteAuthName: setModel.deleteAuthName,
                showRemoveAuth: false,
                featureWatermarkEnabled: setModel.featureWatermarkEnabled,
                featureAudioWatermarkEnabled: setModel.featureAudioWatermarkEnabled
            }
        },
        computed: {
            showDomainPart: function() {
                if (this.authDomainLength > 10) {
                    return true
                }
                return false
            }
        },
        watch: {
            defaultAuth: function(b, a) {
                if (this.deleteAuthName !== "" && this.deleteAuthName == a) {
                    this.lastSelectAuthName = a;
                    this.showRemoveAuth = true
                } else {
                    this.showRemoveAuth = false
                }
            },
            authDomain: function() {
                var a = this.authDomain.split(/[;,\n\r]+/);
                if (a.length > 10) {
                    var b = a.slice(0, 10);
                    this.authDomainPart = b.join(",");
                    this.authDomainLength = a.length;
                    this.showDomainPart = true
                } else {
                    this.showDomainPart = false;
                    this.authDomainPart = "";
                    this.authDomainLength = a.length
                }
            }
        },
        methods: {
            selectChange: function(d) {
                this.selectAuthId = d;
                var c = _.find(this.optionsLimit, {
                    id: d
                });
                var b = c.type;
                var a = c.name;
                this.lastSelectAuthType = b;
                if (b == 1) {
                    this.showDomainDiv = true;
                    this.selectAuthType = 1;
                    this.defaultAuth = a;
                    this.authDomain = c.authDomain;
                    this.authDomainLength = c.authDomainLength;
                    this.authDomainPart = c.authDomainPart
                } else {
                    if (b == 2) {
                        this.showDomainDiv = false;
                        this.selectAuthType = 2;
                        this.defaultAuth = a
                    } else {
                        this.showDomainDiv = false;
                        this.selectAuthType = 0;
                        this.defaultAuth = a
                    }
                }
            },
            optionChange: function() {
                if ($("#option_enforce_signed_in").prop("checked")) {
                    this.showSelectInput = true;
                    this.authCheck = true;
                    this.selectAuthType = this.lastSelectAuthType;
                    if (this.selectAuthType == 1) {
                        this.showDomainDiv = true
                    } else {
                        this.showDomainDiv = false
                    }
                    if (this.defaultAuth == undefined) {
                        this.defaultAuth = $.i18n.get("meeting.athenticated.join.sign_to_zoom");
                        this.selectAuthType = 0
                    }
                    if (!this.isUserSettingOpen) {
                        this.defaultAuth = $.i18n.get("meeting.athenticated.join.sign_to_zoom");
                        this.selectAuthType = 0
                    }
                } else {
                    this.showSelectInput = false;
                    this.showDomainDiv = false;
                    this.selectAuthType = -1;
                    this.authCheck = false
                }
            },
            openEditDomainDialog: function() {
                this.editDomainDialogVisible = true
            },
            reloadAuth4Template: function(b) {
                var c = $("#option_enforce_signed_in");
                if (c.length > 0 && !c.prop("disabled")) {
                    c.prop("checked", b.result.authCheck);
                    if (b.result.authCheck) {
                        authVue.defaultAuth = b.result.defaultAuth;
                        authVue.selectAuthType = b.result.defaultType;
                        authVue.authCheck = b.result.authCheck;
                        if (b.result.authMethodLength > 1) {
                            authVue.showSelectInput = true
                        }
                        if (b.result.defaultType != undefined && b.result.defaultType == 1) {
                            authVue.showDomainDiv = true
                        } else {
                            authVue.showDomainDiv = false
                        }
                        authVue.selectAuthId = b.result.defaultAuthId;
                        this.selectChange(authVue.selectAuthId);
                        if (b.result.authDomain !== undefined && b.result.authDomain !== "") {
                            authVue.authDomainPart = b.result.authDomainPart;
                            authVue.authDomain = b.result.authDomain;
                            authVue.authDomainLength = b.result.authDomainLength
                        }
                        var a = $(".water-mark-div");
                        if (a.length > 0) {
                            if (a.is(":hidden")) {
                                a.show()
                            }
                            if (!$("#option_water_mark").prop("disabled")) {
                                $("#option_water_mark").prop("checked", b.result.optionEnableWatermark)
                            }
                        }
                        var d = $(".audio-water-mark-div");
                        if (d.length > 0) {
                            if (d.is(":hidden")) {
                                d.show()
                            }
                            if (!$("#option_audio_water_mark").prop("disabled")) {
                                $("#option_audio_water_mark").prop("checked", b.result.optionEnableAudioWatermark)
                            }
                        }
                    } else {
                        authVue.authCheck = b.result.authCheck;
                        authVue.showSelectInput = false
                    }
                }
            },
            setMergedOptionForAuthAndWatermark: function(b) {
                if (b.signed) {
                    var a = b.signed == "true";
                    $("input[name=option_enforce_signed_in]").prop("checked", a);
                    if (b.signed_checkbox_locked && b.signed_checkbox_locked == "true") {
                        this.addLockIconIf($("input[name=option_enforce_signed_in]").prop({
                            disabled: true
                        }).parent("label"));
                        if (a) {
                            if (b.defaultType && b.defaultType == "1") {
                                authVue.authCheck = true
                            }
                            $("#auth_container").show()
                        } else {
                            $("#domain_list").hide();
                            $("#auth_container").hide()
                        }
                    }
                }
                if (b.watermark_locked && b.watermark_locked == "true") {
                    $("input[name=option_water_mark]").prop("checked", b.watermark == "true");
                    this.addLockIconIf($("input[name=option_water_mark]").prop({
                        disabled: true
                    }).parent("label").parent())
                }
                if (b.audioWaterMark_locked && b.audioWaterMark_locked == "true") {
                    $("input[name=option_audio_water_mark]").prop("checked", b.audioWaterMark == "true");
                    this.addLockIconIf($("input[name=option_audio_water_mark]").prop({
                        disabled: true
                    }).parent("label").parent())
                }
            },
            setDefaultOptionForAuthAndWatermark: function(b) {
                if (b.signed) {
                    var a = b.signed == "true";
                    $("input[name=option_enforce_signed_in]").prop("checked", a);
                    authVue.authCheck = a;
                    authVue.defaultAuth = b.defaultAuth;
                    authVue.selectAuthType = b.defaultType;
                    authVue.selectAuthId = b.defaultAuthId;
                    if (b.authDomain !== undefined) {
                        authVue.authDomainPart = b.authDomainPart;
                        authVue.authDomain = b.authDomain;
                        authVue.authDomainLength = b.authDomainLength
                    }
                    if (a) {
                        if (b.watermark && b.watermark == "true") {
                            $("#option_water_mark").parents("div.form-group").show()
                        }
                        if (b.audioWaterMark && b.audioWaterMark == "true") {
                            $("#option_audio_water_mark").parents("div.form-group").show()
                        }
                        if (b.defaultType !== undefined && b.defaultType == 1) {
                            authVue.authCheck = true;
                            authVue.showDomainDiv = true
                        }
                        if (b.defaultType !== undefined && (b.defaultType == 0 || b.defaultType == 2)) {
                            authVue.authCheck = true;
                            authVue.showDomainDiv = false
                        }
                        authVue.showSelectInput = true
                    } else {
                        authVue.showDomainDiv = false;
                        authVue.showSelectInput = false
                    }
                    if (b.signed_checkbox_locked && b.signed_checkbox_locked == "true") {
                        this.addLockIconIf($("input[name=option_enforce_signed_in]").prop({
                            disabled: true
                        }).parent("label"))
                    }
                }
                if (b.watermark_locked && b.watermark_locked == "true") {
                    $("input[name=option_water_mark]").prop("checked", b.watermark == "true");
                    this.addLockIconIf($("input[name=option_water_mark]").prop({
                        disabled: true
                    }).parent("label").parent())
                }
                if (b.audioWaterMark_locked && b.audioWaterMark_locked == "true") {
                    $("input[name=option_audio_water_mark]").prop("checked", b.audioWaterMark == "true");
                    this.addLockIconIf($("input[name=option_audio_water_mark]").prop({
                        disabled: true
                    }).parent("label").parent())
                }
            },
            addLockIconIf: function(b) {
                var a = '<a class="locked_by_admin" aria-label="' + $.i18n.get("common.locked_by_admin") + '" href="javascript:void()"><span class="version-inner">' + $.i18n.get("common.locked_by_admin") + "</span></a>";
                if (b.find(".locked_by_admin").length == 0) {
                    b.append(a)
                }
            },
            addAuthInfo: function(d) {
                var c = $("#auth");
                if (c.length > 0 && authVue.authCheck == true) {
                    var b = {
                        option_enforce_signed_in: authVue.selectAuthType,
                        selectAuthId: authVue.selectAuthId,
                        authDomain: authVue.authDomain,
                        selectAuthName: authVue.defaultAuth
                    };
                    var a = JSON.stringify(b);
                    d.authOptionsJson = a;
                    d.option_enforce_signed_in = authVue.selectAuthType
                }
            }
        },
        mounted: function() {}
    })
}
setBreoutRoomOptionsVisibility();
$("#breout-room").change(setBreoutRoomOptionsVisibility);
function setBreoutRoomOptionsVisibility() {
    if ($("#breout-room").prop("checked")) {
        $("#breout_room_container").show()
    } else {
        $("#breout_room_container").hide()
    }
}
if ($("#breakout-room-content").length > 0) {
    Vue.use(Upload);
    new Vue({
        el: "#breakout-room-content",
        data: function() {
            return {
                createRoomDialogVisible: false,
                uploadDialogVisible: false,
                roomList: roomList,
                breRoomLoading: false,
                breRoomVerify: ""
            }
        },
        methods: {
            openCreateRoomDialog: function() {
                this.createRoomDialogVisible = true
            },
            openUploadDialog: function() {
                this.uploadDialogVisible = true
            },
            onProcess: function() {
                this.uploadDialogVisible = false;
                this.breRoomLoading = true;
                this.breRoomVerify = $.i18n.get("meeting.breout_room_room_import_file")
            },
            onSuccess: function(c) {
                this.createRoomDialogVisible = true;
                this.breRoomVerify = $.i18n.get("meeting.breout_room_room_verify_file");
                var a = c.body;
                var b = a.result.error_type;
                if (typeof b !== "undefined") {
                    this.$message({
                        type: "error",
                        message: b
                    });
                    return
                }
                if (a.result.success === true) {
                    this.roomList.splice(0, this.roomList.length);
                    _.forEach(a.result.importResult, function(e, d) {
                        this.roomList.push({
                            name: d,
                            value: e
                        })
                    });
                    this.breRoomLoading = false
                }
            }
        }
    })
}
if ($("#view-breakout-room").length > 0) {
    new Vue({
        el: "#view-breakout-room",
        data: function() {
            return {
                createRoomDialogVisible: false,
                uploadDialogVisible: false,
                roomList: roomList,
                meetingNumber: meetingNumber
            }
        },
        methods: {
            openCreateRoomDialog: function() {
                this.createRoomDialogVisible = true
            }
        }
    })
}
if ($("#jbhPriorStartMeetingId").length > 0) {
    var jbhPriorStartMeetingIdObj = new Vue({
        el: "#jbhPriorStartMeetingId",
        data: {
            jbhB4TimeList: [{
                val: "5",
                label: $.i18n.get("meeting.jbh.prior.time.set", "5")
            }, {
                val: "10",
                label: $.i18n.get("meeting.jbh.prior.time.set", "10")
            }, {
                val: "15",
                label: $.i18n.get("meeting.jbh.prior.time.set", "15")
            }, {
                val: "0",
                label: $.i18n.get("meeting.jbh.prior.time.unlimited")
            }],
            jbhPriorTime: "5",
            jbh: false,
            isSingle: window.setModel !== undefined && window.setModel.isSingle !== undefined ? window.setModel.isSingle : false
        },
        computed: {
            isDisabled: function() {
                return this.isSingle || !this.jbh
            }
        }
    })
}
;
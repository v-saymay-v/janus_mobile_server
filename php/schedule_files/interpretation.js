if ($("#interpreters_info").length > 0) {
    var interpreterInfoVue = new Vue({
        el: "#interpreters_info",
        data: {
            list: interpreterInfos,
            id: currentId,
            languages: languageInfos
        },
        methods: {
            addInterpreter: function() {
                this.list.push({
                    id: this.id,
                    email: "",
                    firstLanguage: "US",
                    secondLanguage: ""
                });
                this.id = this.id + 1;
                this.$nextTick(function() {
                    var a = $("input[name='interpreter_email']").length;
                    if (a >= 1) {
                        a = a - 1;
                        this.$refs.inputEmail[a].focus()
                    }
                })
            },
            deleteInterpreter: function(a) {
                this.list.splice(a, 1);
                $("#add_interpreter_button").focus()
            },
            generatorId: function(a) {
                return "interpreter_" + a
            },
            getClassName: function(a) {
                return "language-" + this.languages[a].key.toLowerCase() + "-button language-button"
            },
            genEmailId: function(a) {
                return "interpreter_email_" + a
            },
            getFirLanguageId: function(a) {
                return "first_Language_" + a
            },
            getSecLanguageId: function(a) {
                return "second_language_" + a
            },
            selectChange: function() {},
            convertNative: function(e) {
                var a = e.split("\\u");
                var b = a[0];
                for (var c = 1; c < a.length; c++) {
                    var d = a[c];
                    b += String.fromCharCode(parseInt("0x" + d.substring(0, 4)));
                    if (d.length > 4) {
                        b += d.substring(4, d.length)
                    }
                }
                return b
            }
        },
        mounted: function() {
            $("#interpreters_info").removeClass("hideme")
        }
    })
};

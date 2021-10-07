var breakoutRoomCreateDialog = {
    template: "#breakout-room-create-dialog",
    name: "breakoutRoomCreateDialog",
    props: ["isView", "createRoomDialogVisible", "roomList", "uploadDialogVisible", "breRoomLoading", "breRoomVerify", "meetingNumber"],
    data: function() {
        return {
            roomNum: 1,
            members: {},
            activeRoom: 0,
            isEditName: false,
            addMember: "",
            errorMsg: "",
            moveRoomsList: [],
            hoverIndex: -1,
            emberExistRoom: "",
            list: [],
            hoverFlag: true,
            roomHoverIndex: -1,
            cache: "",
            hasClicked: false
        }
    },
    computed: {
        disenable: function() {
            return this.list.length >= 50
        },
        moreLength: function() {
            return this.list.length > 50 || this.totalMember > 200
        },
        noList: function() {
            return this.list.length === 0
        },
        showMemberEmpty: function() {
            if (this.members.value && this.members.value.length <= 0) {
                return true
            } else {
                return false
            }
        },
        visible: {
            get: function() {
                return this.createRoomDialogVisible
            },
            set: function(a) {
                this.$emit("update:createRoomDialogVisible", a)
            }
        },
        uploadVisible: {
            get: function() {
                return this.uploadDialogVisible
            },
            set: function(a) {
                this.$emit("update:uploadDialogVisible", a)
            }
        },
        totalMember: function() {
            var a = 0;
            _.forEach(this.list, function(b) {
                if (b.value) {
                    a += b.value.length
                }
            });
            return a
        },
        moveToRooms: function() {
            var a = [];
            var b = this;
            _.forEach(b.list, function(c) {
                if (c.name != b.members.name) {
                    a.push(c)
                }
            });
            return a
        }
    },
    watch: {
        noList: function() {
            this.selectRoom(this.list[0], 0)
        },
        createRoomDialogVisible: function(a) {
            if (a) {
                this.list = _.cloneDeep(this.roomList);
                this.selectRoom(this.list[0], 0)
            }
        }
    },
    methods: {
        addRooms: function() {
            var c = this;
            while (true) {
                var a = "Breakout Room " + c.roomNum;
                var b = {
                    name: a,
                    value: []
                };
                if (!c.contains(c.list, a)) {
                    c.roomNum += 1;
                    c.list.push(b);
                    break
                }
                c.roomNum += 1
            }
        },
        contains: function(c, a) {
            for (var b = 0; b < c.length; b++) {
                var d = c[b];
                if (d.name === a) {
                    return true
                }
            }
            return false
        },
        selectRoom: function(b, a) {
            this.members = b;
            this.activeRoom = a
        },
        saveName: function() {
            this.isEditName = false
        },
        appendMember: function() {
            var a = /^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))$/i;
            if (_.isEmpty(this.addMember)) {
                return false
            }
            if (a.test(this.addMember)) {
                if (!this.checkMemberExist()) {
                    this.members.value.unshift(this.addMember);
                    this.addMember = ""
                } else {
                    if (this.memberExistRoom === this.members.name) {
                        this.errorMsg = "This email has been added. Please enter a new email."
                    } else {
                        this.errorMsg = "This email has been added to " + this.isMemberExistRoom + ". Please enter a new email. "
                    }
                }
            } else {
                this.errorMsg = "Your email address must be in the format of name@domain.com"
            }
        },
        searchAsync: function(c, a) {
            var b = this;
            if (this.cache.length && c.length > this.cache.length && c.indexOf(this.cache) === 0) {
                a([]);
                return
            } else {
                this.cache = ""
            }
            if (c.length > 2) {
                $.ajax({
                    type: "POST",
                    url: "/meeting/search/user",
                    data: "keyword=" + c,
                    success: function(d) {
                        a(d.result);
                        if (!d.result.length) {
                            b.cache = c
                        }
                    },
                    error: function(d) {}
                })
            } else {
                a([])
            }
        },
        handleSelect: function(a) {
            this.addMember = a.email;
            this.appendMember()
        },
        checkMemberExist: function() {
            var d = this;
            for (var b = 0; b < d.list.length; b++) {
                var c = d.list[b];
                if (c.value) {
                    for (var a = 0; a < c.value.length; a++) {
                        var e = c.value[a];
                        if (e === d.addMember) {
                            d.memberExistRoom = c.name;
                            return true
                        }
                    }
                }
            }
            return false
        },
        deleteRoom: function(a) {
            this.list.splice(a, 1);
            this.$nextTick(function() {
                if (this.list.length <= this.activeRoom) {
                    this.activeRoom = this.list.length - 1
                }
                this.selectRoom(this.list[this.activeRoom], this.activeRoom)
            })
        },
        removeCurrentMember: function(a) {
            this.members.value.splice(a, 1)
        },
        openCsvDialog: function() {
            this.uploadVisible = true;
            this.visible = false
        },
        formatSubmitData: function() {
            var a = {};
            _.forEach(this.list, function(e) {
                var c = e.name;
                var d = e.value;
                a[c] = d
            });
            var b = JSON.stringify(a);
            return b
        },
        exportAsCsv: function() {
            var a = this.formatSubmitData();
            SB.postForm("/meeting/exportBreOutRoomAsCSV", {
                roomListStr: a
            })
        },
        swapItems: function(a, d, c) {
            a[d] = a.splice(c, 1, a[d])[0];
            Vue.set(this, "selectedList", a);
            var b = this;
            setTimeout(function() {
                $(b.$refs.memberList).find("li").eq(c).focus()
            }, 0)
        },
        itemKeyUp: function(a) {
            if (a == 0) {
                return false
            }
            this.swapItems(this.members.value, a, a - 1)
        },
        itemKeyDown: function(a) {
            if (a == this.members.value.length - 1) {
                return
            }
            this.swapItems(this.members.value, a, a + 1)
        },
        moveToOther: function(c, b, a) {
            this.removeCurrentMember(a);
            c.value.unshift(b)
        },
        leave: function() {
            this.hoverIndex = -1
        },
        saveRoomList: function() {
            var b = this;
            if (this.isView) {
                b.hasClicked = true;
                var a = this.formatSubmitData();
                SB.post3({
                    url: "/meeting/savebo",
                    data: {
                        breout_room_info: a,
                        number: b.meetingNumber
                    },
                    success: function(c) {
                        b.$message({
                            message: "Save Success",
                            type: "success"
                        });
                        this.visible = false
                    },
                    errorCallBack: function() {
                        b.$message.error("Save Failed!");
                        b.hasClicked = false
                    }
                })
            } else {
                this.list[this.activeRoom] = this.members;
                this.roomList.splice(0, this.roomList.length);
                _.forEach(this.list, function(c) {
                    this.roomList.push(c)
                });
                this.visible = false
            }
        },
        cancelBreakoutRoom: function() {
            this.visible = false;
            this.addMember = "";
            this.list = this.roomList
        }
    },
    mounted: function() {}
};
Vue.component("breakoutRoomCreateDialog", breakoutRoomCreateDialog);

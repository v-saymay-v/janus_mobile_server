(function(a) {
    if (typeof define === "function" && define.amd) {
        define(["jquery"], a)
    } else {
        a(jQuery)
    }
}(function(e) {
    var h = []
      , f = e(document)
      , c = navigator.userAgent.toLowerCase()
      , g = e(window)
      , a = [];
    var b = {
        ieQuirks: null,
        msie: /msie/.test(c) && !/opera/.test(c),
        opera: /opera/.test(c)
    };
    b.ie6 = b.msie && /msie 6./.test(c) && typeof window.XMLHttpRequest !== "object";
    b.ie7 = b.msie && /msie 7.0/.test(c);
    b.boxModel = (document.compatMode === "CSS1Compat");
    e.modal = function(i, d) {
        return e.modal.impl.init(i, d)
    };
    e.modal.close = function() {
        e.modal.impl.close()
    };
    e.modal.focus = function(d) {
        e.modal.impl.focus(d)
    };
    e.modal.setContainerDimensions = function() {
        e.modal.impl.setContainerDimensions()
    };
    e.modal.setPosition = function() {
        e.modal.impl.setPosition()
    };
    e.modal.update = function(d, i) {
        e.modal.impl.update(d, i)
    }
    ;
    e.fn.modal = function(d) {
        return e.modal.impl.init(this, d)
    };
    e.fn.modal.Constructor = {
      VERSION: '2.3.2'
    };
    e.modal.defaults = {
        appendTo: "body",
        focus: true,
        opacity: 50,
        overlayId: "simplemodal-overlay",
        overlayCss: {},
        containerId: "simplemodal-container",
        containerCss: {},
        dataId: "simplemodal-data",
        dataCss: {},
        minHeight: null,
        minWidth: null,
        maxHeight: null,
        maxWidth: null,
        autoResize: false,
        autoPosition: true,
        zIndex: 1000,
        close: true,
        closeHTML: '<a class="modalCloseImg" title="Close"></a>',
        closeClass: "simplemodal-close",
        escClose: true,
        overlayClose: false,
        fixed: true,
        position: null,
        persist: false,
        modal: true,
        onOpen: null,
        onShow: null,
        onClose: null
    };
    e.modal.impl = {
        d: {},
        init: function(j, d) {
            var i = this;
            if (i.d.data) {
                return false
            }
            b.ieQuirks = b.msie && !b.boxModel;
            i.o = e.extend({}, e.modal.defaults, d);
            i.zIndex = i.o.zIndex;
            i.occb = false;
            if (typeof j === "object") {
                j = j instanceof e ? j : e(j);
                i.d.placeholder = false;
                if (j.parent().parent().length > 0) {
                    j.before(e("<span></span>").attr("id", "simplemodal-placeholder").css({
                        display: "none"
                    }));
                    i.d.placeholder = true;
                    i.display = j.css("display");
                    if (!i.o.persist) {
                        i.d.orig = j.clone(true)
                    }
                }
            } else {
                if (typeof j === "string" || typeof j === "number") {
                    j = e("<div></div>").html(j)
                } else {
                    alert("SimpleModal Error: Unsupported data type: " + typeof j);
                    return i
                }
            }
            i.create(j);
            j = null;
            i.open();
            if (e.isFunction(i.o.onShow)) {
                e(".total-main-content").attr("aria-hidden", true);
                e("#" + i.o.containerId).attr("aria-hidden", false);
                i.o.onShow.apply(i, [i.d])
            }
            return i
        },
        create: function(i) {
            var d = this;
            d.getDimensions();
            if (d.o.modal && b.ie6) {
                d.d.iframe = e('<iframe src="javascript:false;"></iframe>').css(e.extend(d.o.iframeCss, {
                    display: "none",
                    opacity: 0,
                    position: "fixed",
                    height: a[0],
                    width: a[1],
                    zIndex: d.o.zIndex,
                    top: 0,
                    left: 0
                })).appendTo(d.o.appendTo)
            }
            d.d.overlay = e("<div></div>").attr("id", d.o.overlayId).addClass("simplemodal-overlay").css(e.extend(d.o.overlayCss, {
                display: "none",
                opacity: d.o.opacity / 100,
                height: d.o.modal ? h[0] : 0,
                width: d.o.modal ? h[1] : 0,
                position: "fixed",
                left: 0,
                top: 0,
                zIndex: d.o.zIndex + 1
            })).appendTo(d.o.appendTo);
            d.d.container = e("<div></div>").attr("id", d.o.containerId).addClass("simplemodal-container").css(e.extend({
                position: d.o.fixed ? "fixed" : "absolute"
            }, d.o.containerCss, {
                display: "none",
                zIndex: d.o.zIndex + 2
            })).append(d.o.close && d.o.closeHTML ? e(d.o.closeHTML).addClass(d.o.closeClass) : "").appendTo(d.o.appendTo);
            d.d.wrap = e("<div></div>").attr("tabIndex", -1).addClass("simplemodal-wrap").css({
                height: "100%",
                outline: 0,
                width: "100%"
            }).appendTo(d.d.container);
            d.d.data = i.attr("id", i.attr("id") || d.o.dataId).addClass("simplemodal-data").css(e.extend(d.o.dataCss, {
                display: "none"
            })).appendTo("body");
            i = null;
            d.setContainerDimensions();
            d.d.data.appendTo(d.d.wrap);
            if (b.ie6 || b.ieQuirks) {
                d.fixIE()
            }
        },
        bindEvents: function() {
            var d = this;
            e("." + d.o.closeClass).bind("click.simplemodal", function(i) {
                i.preventDefault();
                d.close()
            });
            if (d.o.modal && d.o.close && d.o.overlayClose) {
                d.d.overlay.bind("click.simplemodal", function(i) {
                    i.preventDefault();
                    d.close()
                })
            }
            f.bind("keydown.simplemodal", function(i) {
                if (d.o.modal && i.keyCode === 9) {
                    d.watchTab(i)
                } else {
                    if ((d.o.close && d.o.escClose) && i.keyCode === 27) {
                        i.preventDefault();
                        d.close()
                    }
                }
            });
            g.bind("resize.simplemodal orientationchange.simplemodal", function() {
                d.getDimensions();
                d.o.autoResize ? d.setContainerDimensions() : d.o.autoPosition && d.setPosition();
                if (b.ie6 || b.ieQuirks) {
                    d.fixIE()
                } else {
                    if (d.o.modal) {
                        d.d.iframe && d.d.iframe.css({
                            height: a[0],
                            width: a[1]
                        });
                        d.d.overlay.css({
                            height: h[0],
                            width: h[1]
                        })
                    }
                }
            })
        },
        unbindEvents: function() {
            e("." + this.o.closeClass).unbind("click.simplemodal");
            f.unbind("keydown.simplemodal");
            g.unbind(".simplemodal");
            this.d.overlay.unbind("click.simplemodal")
        },
        fixIE: function() {
            var d = this
              , i = d.o.position;
            e.each([d.d.iframe || null, !d.o.modal ? null : d.d.overlay, d.d.container.css("position") === "fixed" ? d.d.container : null], function(u, m) {
                if (m) {
                    var r = "document.body.clientHeight"
                      , w = "document.body.clientWidth"
                      , y = "document.body.scrollHeight"
                      , v = "document.body.scrollLeft"
                      , p = "document.body.scrollTop"
                      , l = "document.body.scrollWidth"
                      , k = "document.documentElement.clientHeight"
                      , t = "document.documentElement.clientWidth"
                      , q = "document.documentElement.scrollLeft"
                      , z = "document.documentElement.scrollTop"
                      , A = m[0].style;
                    A.position = "absolute";
                    if (u < 2) {
                        A.removeExpression("height");
                        A.removeExpression("width");
                        A.setExpression("height", "" + y + " > " + r + " ? " + y + " : " + r + ' + "px"');
                        A.setExpression("width", "" + l + " > " + w + " ? " + l + " : " + w + ' + "px"')
                    } else {
                        var o, j;
                        if (i && i.constructor === Array) {
                            var x = i[0] ? typeof i[0] === "number" ? i[0].toString() : i[0].replace(/px/, "") : m.css("top").replace(/px/, "");
                            o = x.indexOf("%") === -1 ? x + " + (t = " + z + " ? " + z + " : " + p + ') + "px"' : parseInt(x.replace(/%/, "")) + " * ((" + k + " || " + r + ") / 100) + (t = " + z + " ? " + z + " : " + p + ') + "px"';
                            if (i[1]) {
                                var n = typeof i[1] === "number" ? i[1].toString() : i[1].replace(/px/, "");
                                j = n.indexOf("%") === -1 ? n + " + (t = " + q + " ? " + q + " : " + v + ') + "px"' : parseInt(n.replace(/%/, "")) + " * ((" + t + " || " + w + ") / 100) + (t = " + q + " ? " + q + " : " + v + ') + "px"'
                            }
                        } else {
                            o = "(" + k + " || " + r + ") / 2 - (this.offsetHeight / 2) + (t = " + z + " ? " + z + " : " + p + ') + "px"';
                            j = "(" + t + " || " + w + ") / 2 - (this.offsetWidth / 2) + (t = " + q + " ? " + q + " : " + v + ') + "px"'
                        }
                        A.removeExpression("top");
                        A.removeExpression("left");
                        A.setExpression("top", o);
                        A.setExpression("left", j)
                    }
                }
            })
        },
        focus: function(k) {
            var i = this
              , j = k && e.inArray(k, ["first", "last"]) !== -1 ? k : "first";
            var d = e(":input:enabled:visible:" + j, i.d.wrap);
            setTimeout(function() {
                d.length > 0 ? d.focus() : i.d.wrap.focus()
            }, 10)
        },
        getDimensions: function() {
            var i = this
              , d = typeof window.innerHeight === "undefined" ? g.height() : window.innerHeight;
            h = [f.height(), f.width()];
            a = [d, g.width()]
        },
        getVal: function(i, j) {
            return i ? (typeof i === "number" ? i : i === "auto" ? 0 : i.indexOf("%") > 0 ? ((parseInt(i.replace(/%/, "")) / 100) * (j === "h" ? a[0] : a[1])) : parseInt(i.replace(/px/, ""))) : null
        },
        update: function(d, j) {
            var i = this;
            if (!i.d.data) {
                return false
            }
            i.d.origHeight = i.getVal(d, "h");
            i.d.origWidth = i.getVal(j, "w");
            i.d.data.hide();
            d && i.d.container.css("height", d);
            j && i.d.container.css("width", j);
            i.setContainerDimensions();
            i.d.data.show();
            i.o.focus && i.focus();
            i.unbindEvents();
            i.bindEvents()
        },
        setContainerDimensions: function() {
            var t = this
              , k = b.ie6 || b.ie7;
            var d = t.d.origHeight ? t.d.origHeight : b.opera ? t.d.container.height() : t.getVal(k ? t.d.container[0].currentStyle.height : t.d.container.css("height"), "h")
              , j = t.d.origWidth ? t.d.origWidth : b.opera ? t.d.container.width() : t.getVal(k ? t.d.container[0].currentStyle.width : t.d.container.css("width"), "w")
              , o = t.d.data.outerHeight(true)
              , i = t.d.data.outerWidth(true);
            t.d.origHeight = t.d.origHeight || d;
            t.d.origWidth = t.d.origWidth || j;
            var l = t.o.maxHeight ? t.getVal(t.o.maxHeight, "h") : null
              , p = t.o.maxWidth ? t.getVal(t.o.maxWidth, "w") : null
              , n = l && l < a[0] ? l : a[0]
              , r = p && p < a[1] ? p : a[1];
            var m = t.o.minHeight ? t.getVal(t.o.minHeight, "h") : "auto";
            if (!d) {
                if (!o) {
                    d = m
                } else {
                    if (o > n) {
                        d = n
                    } else {
                        if (t.o.minHeight && m !== "auto" && o < m) {
                            d = m
                        } else {
                            d = o
                        }
                    }
                }
            } else {
                d = t.o.autoResize && d > n ? n : d < m ? m : d
            }
            var q = t.o.minWidth ? t.getVal(t.o.minWidth, "w") : "auto";
            if (!j) {
                if (!i) {
                    j = q
                } else {
                    if (i > r) {
                        j = r
                    } else {
                        if (t.o.minWidth && q !== "auto" && i < q) {
                            j = q
                        } else {
                            j = i
                        }
                    }
                }
            } else {
                j = t.o.autoResize && j > r ? r : j < q ? q : j
            }
            t.d.genWidth = j;
            t.d.container.css({
                height: d,
                width: j
            });
            t.d.wrap.css({
                overflow: "visible"
            });
            t.o.autoPosition && t.setPosition()
        },
        setPosition: function() {
            var i = parseInt(e(document.body).outerWidth(true));
            var o = this.d.container.outerWidth(true);
            if (i < 768) {
                o = i * 0.95;
                this.d.container.css({
                    width: o
                })
            } else {
                this.d.container.css({
                    width: this.d.genWidth
                })
            }
            var k = this, m, l, n = (a[0] / 2) - (k.d.container.outerHeight(true) / 2), j = (a[1] / 2) - (o / 2), d = k.d.container.css("position") !== "fixed" ? g.scrollTop() : 0;
            if (k.o.position && Object.prototype.toString.call(k.o.position) === "[object Array]") {
                m = d + (k.o.position[0] || n);
                l = k.o.position[1] || j
            } else {
                m = d + n;
                l = j
            }
            k.d.container.css({
                left: l,
                top: m
            })
        },
        watchTab: function(i) {
            var d = this;
            if (e(i.target).parents(".simplemodal-container").length > 0) {
                d.inputs = e(":input:enabled:visible:first, :input:enabled:visible:last", d.d.data[0]);
                if ((!i.shiftKey && i.target === d.inputs[d.inputs.length - 1]) || (i.shiftKey && i.target === d.inputs[0]) || d.inputs.length === 0) {
                    i.preventDefault();
                    var j = i.shiftKey ? "last" : "first";
                    d.focus(j)
                }
            } else {
                i.preventDefault();
                d.focus()
            }
        },
        open: function() {
            var d = this;
            d.d.iframe && d.d.iframe.show();
            if (e.isFunction(d.o.onOpen)) {
                d.o.onOpen.apply(d, [d.d])
            } else {
                d.d.overlay.show();
                d.d.container.show();
                d.d.data.show()
            }
            d.o.focus && d.focus();
            d.bindEvents()
        },
        close: function() {
            var d = this;
            if (!d.d.data) {
                return false
            }
            d.unbindEvents();
            if (e.isFunction(d.o.onClose) && !d.occb) {
                d.occb = true;
                e(".total-main-content").removeAttr("aria-hidden");
                d.o.onClose.apply(d, [d.d])
            } else {
                if (d.d.placeholder) {
                    var i = e("#simplemodal-placeholder");
                    if (d.o.persist) {
                        i.replaceWith(d.d.data.removeClass("simplemodal-data").css("display", d.display))
                    } else {
                        d.d.data.hide().remove();
                        i.replaceWith(d.d.orig)
                    }
                } else {
                    d.d.data.hide().remove()
                }
                d.d.container.hide().remove();
                d.d.overlay.hide();
                d.d.iframe && d.d.iframe.hide().remove();
                d.d.overlay.remove();
                d.d = {}
            }
        }
    }
}));

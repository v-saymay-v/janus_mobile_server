!function(e, t) {
    "object" == typeof exports && "object" == typeof module ? module.exports = t() : "function" == typeof define && define.amd ? define("ZoomUI", [], t) : "object" == typeof exports ? exports.ZoomUI = t() : e.ZoomUI = t()
}(window, (function() {
    return function(e) {
        var t = {};
        function n(i) {
            if (t[i])
                return t[i].exports;
            var o = t[i] = {
                i: i,
                l: !1,
                exports: {}
            };
            return e[i].call(o.exports, o, o.exports, n),
            o.l = !0,
            o.exports
        }
        return n.m = e,
        n.c = t,
        n.d = function(e, t, i) {
            n.o(e, t) || Object.defineProperty(e, t, {
                enumerable: !0,
                get: i
            })
        }
        ,
        n.r = function(e) {
            "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(e, Symbol.toStringTag, {
                value: "Module"
            }),
            Object.defineProperty(e, "__esModule", {
                value: !0
            })
        }
        ,
        n.t = function(e, t) {
            if (1 & t && (e = n(e)),
            8 & t)
                return e;
            if (4 & t && "object" == typeof e && e && e.__esModule)
                return e;
            var i = Object.create(null);
            if (n.r(i),
            Object.defineProperty(i, "default", {
                enumerable: !0,
                value: e
            }),
            2 & t && "string" != typeof e)
                for (var o in e)
                    n.d(i, o, function(t) {
                        return e[t]
                    }
                    .bind(null, o));
            return i
        }
        ,
        n.n = function(e) {
            var t = e && e.__esModule ? function() {
                return e.default
            }
            : function() {
                return e
            }
            ;
            return n.d(t, "a", t),
            t
        }
        ,
        n.o = function(e, t) {
            return Object.prototype.hasOwnProperty.call(e, t)
        }
        ,
        n.p = "",
        n(n.s = 46)
    }([function(e, t, n) {
        "use strict";
        t.__esModule = !0;
        var i = s(n(94))
          , o = s(n(106))
          , r = "function" == typeof o.default && "symbol" == typeof i.default ? function(e) {
            return typeof e
        }
        : function(e) {
            return e && "function" == typeof o.default && e.constructor === o.default && e !== o.default.prototype ? "symbol" : typeof e
        }
        ;
        function s(e) {
            return e && e.__esModule ? e : {
                default: e
            }
        }
        t.default = "function" == typeof o.default && "symbol" === r(i.default) ? function(e) {
            return void 0 === e ? "undefined" : r(e)
        }
        : function(e) {
            return e && "function" == typeof o.default && e.constructor === o.default && e !== o.default.prototype ? "symbol" : void 0 === e ? "undefined" : r(e)
        }
    }
    , function(e, t, n) {
        var i = n(48);
        e.exports = function(e, t, n) {
            return void 0 === n ? i(e, t, !1) : i(e, n, !1 !== t)
        }
    }
    , function(e, t) {
        var n = e.exports = "undefined" != typeof window && window.Math == Math ? window : "undefined" != typeof self && self.Math == Math ? self : Function("return this")();
        "number" == typeof __g && (__g = n)
    }
    , function(e, t, n) {
        e.exports = !n(12)((function() {
            return 7 != Object.defineProperty({}, "a", {
                get: function() {
                    return 7
                }
            }).a
        }
        ))
    }
    , function(e, t) {
        var n = {}.hasOwnProperty;
        e.exports = function(e, t) {
            return n.call(e, t)
        }
    }
    , function(e, t, n) {
        "use strict";
        t.__esModule = !0;
        var i, o = n(85), r = (i = o) && i.__esModule ? i : {
            default: i
        };
        t.default = r.default || function(e) {
            for (var t = 1; t < arguments.length; t++) {
                var n = arguments[t];
                for (var i in n)
                    Object.prototype.hasOwnProperty.call(n, i) && (e[i] = n[i])
            }
            return e
        }
    }
    , function(e, t, n) {
        var i = n(7)
          , o = n(14);
        e.exports = n(3) ? function(e, t, n) {
            return i.f(e, t, o(1, n))
        }
        : function(e, t, n) {
            return e[t] = n,
            e
        }
    }
    , function(e, t, n) {
        var i = n(13)
          , o = n(33)
          , r = n(20)
          , s = Object.defineProperty;
        t.f = n(3) ? Object.defineProperty : function(e, t, n) {
            if (i(e),
            t = r(t, !0),
            i(n),
            o)
                try {
                    return s(e, t, n)
                } catch (e) {}
            if ("get"in n || "set"in n)
                throw TypeError("Accessors not supported!");
            return "value"in n && (e[t] = n.value),
            e
        }
    }
    , function(e, t, n) {
        var i = n(36)
          , o = n(21);
        e.exports = function(e) {
            return i(o(e))
        }
    }
    , function(e, t, n) {
        var i = n(24)("wks")
          , o = n(17)
          , r = n(2).Symbol
          , s = "function" == typeof r;
        (e.exports = function(e) {
            return i[e] || (i[e] = s && r[e] || (s ? r : o)("Symbol." + e))
        }
        ).store = i
    }
    , function(e, t) {
        var n = e.exports = {
            version: "2.6.9"
        };
        "number" == typeof __e && (__e = n)
    }
    , function(e, t) {
        e.exports = function(e) {
            return "object" == typeof e ? null !== e : "function" == typeof e
        }
    }
    , function(e, t) {
        e.exports = function(e) {
            try {
                return !!e()
            } catch (e) {
                return !0
            }
        }
    }
    , function(e, t, n) {
        var i = n(11);
        e.exports = function(e) {
            if (!i(e))
                throw TypeError(e + " is not an object!");
            return e
        }
    }
    , function(e, t) {
        e.exports = function(e, t) {
            return {
                enumerable: !(1 & e),
                configurable: !(2 & e),
                writable: !(4 & e),
                value: t
            }
        }
    }
    , function(e, t, n) {
        var i = n(35)
          , o = n(25);
        e.exports = Object.keys || function(e) {
            return i(e, o)
        }
    }
    , function(e, t) {
        e.exports = !0
    }
    , function(e, t) {
        var n = 0
          , i = Math.random();
        e.exports = function(e) {
            return "Symbol(".concat(void 0 === e ? "" : e, ")_", (++n + i).toString(36))
        }
    }
    , function(e, t) {
        t.f = {}.propertyIsEnumerable
    }
    , function(e, t, n) {
        var i = n(2)
          , o = n(10)
          , r = n(88)
          , s = n(6)
          , a = n(4)
          , l = function(e, t, n) {
            var u, c, d, h = e & l.F, f = e & l.G, p = e & l.S, m = e & l.P, v = e & l.B, g = e & l.W, b = f ? o : o[t] || (o[t] = {}), y = b.prototype, w = f ? i : p ? i[t] : (i[t] || {}).prototype;
            for (u in f && (n = t),
            n)
                (c = !h && w && void 0 !== w[u]) && a(b, u) || (d = c ? w[u] : n[u],
                b[u] = f && "function" != typeof w[u] ? n[u] : v && c ? r(d, i) : g && w[u] == d ? function(e) {
                    var t = function(t, n, i) {
                        if (this instanceof e) {
                            switch (arguments.length) {
                            case 0:
                                return new e;
                            case 1:
                                return new e(t);
                            case 2:
                                return new e(t,n)
                            }
                            return new e(t,n,i)
                        }
                        return e.apply(this, arguments)
                    };
                    return t.prototype = e.prototype,
                    t
                }(d) : m && "function" == typeof d ? r(Function.call, d) : d,
                m && ((b.virtual || (b.virtual = {}))[u] = d,
                e & l.R && y && !y[u] && s(y, u, d)))
        };
        l.F = 1,
        l.G = 2,
        l.S = 4,
        l.P = 8,
        l.B = 16,
        l.W = 32,
        l.U = 64,
        l.R = 128,
        e.exports = l
    }
    , function(e, t, n) {
        var i = n(11);
        e.exports = function(e, t) {
            if (!i(e))
                return e;
            var n, o;
            if (t && "function" == typeof (n = e.toString) && !i(o = n.call(e)))
                return o;
            if ("function" == typeof (n = e.valueOf) && !i(o = n.call(e)))
                return o;
            if (!t && "function" == typeof (n = e.toString) && !i(o = n.call(e)))
                return o;
            throw TypeError("Can't convert object to primitive value")
        }
    }
    , function(e, t) {
        e.exports = function(e) {
            if (null == e)
                throw TypeError("Can't call method on  " + e);
            return e
        }
    }
    , function(e, t) {
        var n = Math.ceil
          , i = Math.floor;
        e.exports = function(e) {
            return isNaN(e = +e) ? 0 : (e > 0 ? i : n)(e)
        }
    }
    , function(e, t, n) {
        var i = n(24)("keys")
          , o = n(17);
        e.exports = function(e) {
            return i[e] || (i[e] = o(e))
        }
    }
    , function(e, t, n) {
        var i = n(10)
          , o = n(2)
          , r = o["__core-js_shared__"] || (o["__core-js_shared__"] = {});
        (e.exports = function(e, t) {
            return r[e] || (r[e] = void 0 !== t ? t : {})
        }
        )("versions", []).push({
            version: i.version,
            mode: n(16) ? "pure" : "global",
            copyright: "© 2019 Denis Pushkarev (zloirock.ru)"
        })
    }
    , function(e, t) {
        e.exports = "constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf".split(",")
    }
    , function(e, t) {
        t.f = Object.getOwnPropertySymbols
    }
    , function(e, t, n) {
        var i = n(21);
        e.exports = function(e) {
            return Object(i(e))
        }
    }
    , function(e, t) {
        e.exports = {}
    }
    , function(e, t, n) {
        var i = n(7).f
          , o = n(4)
          , r = n(9)("toStringTag");
        e.exports = function(e, t, n) {
            e && !o(e = n ? e : e.prototype, r) && i(e, r, {
                configurable: !0,
                value: t
            })
        }
    }
    , function(e, t, n) {
        t.f = n(9)
    }
    , function(e, t, n) {
        var i = n(2)
          , o = n(10)
          , r = n(16)
          , s = n(30)
          , a = n(7).f;
        e.exports = function(e) {
            var t = o.Symbol || (o.Symbol = r ? {} : i.Symbol || {});
            "_" == e.charAt(0) || e in t || a(t, e, {
                value: s.f(e)
            })
        }
    }
    , function(e, t) {
        var n;
        n = function() {
            return this
        }();
        try {
            n = n || new Function("return this")()
        } catch (e) {
            "object" == typeof window && (n = window)
        }
        e.exports = n
    }
    , function(e, t, n) {
        e.exports = !n(3) && !n(12)((function() {
            return 7 != Object.defineProperty(n(34)("div"), "a", {
                get: function() {
                    return 7
                }
            }).a
        }
        ))
    }
    , function(e, t, n) {
        var i = n(11)
          , o = n(2).document
          , r = i(o) && i(o.createElement);
        e.exports = function(e) {
            return r ? o.createElement(e) : {}
        }
    }
    , function(e, t, n) {
        var i = n(4)
          , o = n(8)
          , r = n(91)(!1)
          , s = n(23)("IE_PROTO");
        e.exports = function(e, t) {
            var n, a = o(e), l = 0, u = [];
            for (n in a)
                n != s && i(a, n) && u.push(n);
            for (; t.length > l; )
                i(a, n = t[l++]) && (~r(u, n) || u.push(n));
            return u
        }
    }
    , function(e, t, n) {
        var i = n(37);
        e.exports = Object("z").propertyIsEnumerable(0) ? Object : function(e) {
            return "String" == i(e) ? e.split("") : Object(e)
        }
    }
    , function(e, t) {
        var n = {}.toString;
        e.exports = function(e) {
            return n.call(e).slice(8, -1)
        }
    }
    , function(e, t, n) {
        "use strict";
        var i = n(16)
          , o = n(19)
          , r = n(39)
          , s = n(6)
          , a = n(28)
          , l = n(98)
          , u = n(29)
          , c = n(101)
          , d = n(9)("iterator")
          , h = !([].keys && "next"in [].keys())
          , f = function() {
            return this
        };
        e.exports = function(e, t, n, p, m, v, g) {
            l(n, t, p);
            var b, y, w, x = function(e) {
                if (!h && e in S)
                    return S[e];
                switch (e) {
                case "keys":
                case "values":
                    return function() {
                        return new n(this,e)
                    }
                }
                return function() {
                    return new n(this,e)
                }
            }, k = t + " Iterator", C = "values" == m, _ = !1, S = e.prototype, O = S[d] || S["@@iterator"] || m && S[m], T = O || x(m), E = m ? C ? x("entries") : T : void 0, z = "Array" == t && S.entries || O;
            if (z && (w = c(z.call(new e))) !== Object.prototype && w.next && (u(w, k, !0),
            i || "function" == typeof w[d] || s(w, d, f)),
            C && O && "values" !== O.name && (_ = !0,
            T = function() {
                return O.call(this)
            }
            ),
            i && !g || !h && !_ && S[d] || s(S, d, T),
            a[t] = T,
            a[k] = f,
            m)
                if (b = {
                    values: C ? T : x("values"),
                    keys: v ? T : x("keys"),
                    entries: E
                },
                g)
                    for (y in b)
                        y in S || r(S, y, b[y]);
                else
                    o(o.P + o.F * (h || _), t, b);
            return b
        }
    }
    , function(e, t, n) {
        e.exports = n(6)
    }
    , function(e, t, n) {
        var i = n(13)
          , o = n(99)
          , r = n(25)
          , s = n(23)("IE_PROTO")
          , a = function() {}
          , l = function() {
            var e, t = n(34)("iframe"), i = r.length;
            for (t.style.display = "none",
            n(100).appendChild(t),
            t.src = "javascript:",
            (e = t.contentWindow.document).open(),
            e.write("<script>document.F=Object<\/script>"),
            e.close(),
            l = e.F; i--; )
                delete l.prototype[r[i]];
            return l()
        };
        e.exports = Object.create || function(e, t) {
            var n;
            return null !== e ? (a.prototype = i(e),
            n = new a,
            a.prototype = null,
            n[s] = e) : n = l(),
            void 0 === t ? n : o(n, t)
        }
    }
    , function(e, t, n) {
        var i = n(35)
          , o = n(25).concat("length", "prototype");
        t.f = Object.getOwnPropertyNames || function(e) {
            return i(e, o)
        }
    }
    , function(e, t, n) {
        "use strict";
        (function(e) {
            /**!
 * @fileOverview Kickass library to create and place poppers near their reference elements.
 * @version 1.16.0
 * @license
 * Copyright (c) 2016 Federico Zivolo and contributors
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */
            var n = "undefined" != typeof window && "undefined" != typeof document && "undefined" != typeof navigator
              , i = function() {
                for (var e = ["Edge", "Trident", "Firefox"], t = 0; t < e.length; t += 1)
                    if (n && navigator.userAgent.indexOf(e[t]) >= 0)
                        return 1;
                return 0
            }();
            var o = n && window.Promise ? function(e) {
                var t = !1;
                return function() {
                    t || (t = !0,
                    window.Promise.resolve().then((function() {
                        t = !1,
                        e()
                    }
                    )))
                }
            }
            : function(e) {
                var t = !1;
                return function() {
                    t || (t = !0,
                    setTimeout((function() {
                        t = !1,
                        e()
                    }
                    ), i))
                }
            }
            ;
            function r(e) {
                return e && "[object Function]" === {}.toString.call(e)
            }
            function s(e, t) {
                if (1 !== e.nodeType)
                    return [];
                var n = e.ownerDocument.defaultView.getComputedStyle(e, null);
                return t ? n[t] : n
            }
            function a(e) {
                return "HTML" === e.nodeName ? e : e.parentNode || e.host
            }
            function l(e) {
                if (!e)
                    return document.body;
                switch (e.nodeName) {
                case "HTML":
                case "BODY":
                    return e.ownerDocument.body;
                case "#document":
                    return e.body
                }
                var t = s(e)
                  , n = t.overflow
                  , i = t.overflowX
                  , o = t.overflowY;
                return /(auto|scroll|overlay)/.test(n + o + i) ? e : l(a(e))
            }
            function u(e) {
                return e && e.referenceNode ? e.referenceNode : e
            }
            var c = n && !(!window.MSInputMethodContext || !document.documentMode)
              , d = n && /MSIE 10/.test(navigator.userAgent);
            function h(e) {
                return 11 === e ? c : 10 === e ? d : c || d
            }
            function f(e) {
                if (!e)
                    return document.documentElement;
                for (var t = h(10) ? document.body : null, n = e.offsetParent || null; n === t && e.nextElementSibling; )
                    n = (e = e.nextElementSibling).offsetParent;
                var i = n && n.nodeName;
                return i && "BODY" !== i && "HTML" !== i ? -1 !== ["TH", "TD", "TABLE"].indexOf(n.nodeName) && "static" === s(n, "position") ? f(n) : n : e ? e.ownerDocument.documentElement : document.documentElement
            }
            function p(e) {
                return null !== e.parentNode ? p(e.parentNode) : e
            }
            function m(e, t) {
                if (!(e && e.nodeType && t && t.nodeType))
                    return document.documentElement;
                var n = e.compareDocumentPosition(t) & Node.DOCUMENT_POSITION_FOLLOWING
                  , i = n ? e : t
                  , o = n ? t : e
                  , r = document.createRange();
                r.setStart(i, 0),
                r.setEnd(o, 0);
                var s, a, l = r.commonAncestorContainer;
                if (e !== l && t !== l || i.contains(o))
                    return "BODY" === (a = (s = l).nodeName) || "HTML" !== a && f(s.firstElementChild) !== s ? f(l) : l;
                var u = p(e);
                return u.host ? m(u.host, t) : m(e, p(t).host)
            }
            function v(e) {
                var t = "top" === (arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : "top") ? "scrollTop" : "scrollLeft"
                  , n = e.nodeName;
                if ("BODY" === n || "HTML" === n) {
                    var i = e.ownerDocument.documentElement;
                    return (e.ownerDocument.scrollingElement || i)[t]
                }
                return e[t]
            }
            function g(e, t) {
                var n = "x" === t ? "Left" : "Top"
                  , i = "Left" === n ? "Right" : "Bottom";
                return parseFloat(e["border" + n + "Width"], 10) + parseFloat(e["border" + i + "Width"], 10)
            }
            function b(e, t, n, i) {
                return Math.max(t["offset" + e], t["scroll" + e], n["client" + e], n["offset" + e], n["scroll" + e], h(10) ? parseInt(n["offset" + e]) + parseInt(i["margin" + ("Height" === e ? "Top" : "Left")]) + parseInt(i["margin" + ("Height" === e ? "Bottom" : "Right")]) : 0)
            }
            function y(e) {
                var t = e.body
                  , n = e.documentElement
                  , i = h(10) && getComputedStyle(n);
                return {
                    height: b("Height", t, n, i),
                    width: b("Width", t, n, i)
                }
            }
            var w = function(e, t) {
                if (!(e instanceof t))
                    throw new TypeError("Cannot call a class as a function")
            }
              , x = function() {
                function e(e, t) {
                    for (var n = 0; n < t.length; n++) {
                        var i = t[n];
                        i.enumerable = i.enumerable || !1,
                        i.configurable = !0,
                        "value"in i && (i.writable = !0),
                        Object.defineProperty(e, i.key, i)
                    }
                }
                return function(t, n, i) {
                    return n && e(t.prototype, n),
                    i && e(t, i),
                    t
                }
            }()
              , k = function(e, t, n) {
                return t in e ? Object.defineProperty(e, t, {
                    value: n,
                    enumerable: !0,
                    configurable: !0,
                    writable: !0
                }) : e[t] = n,
                e
            }
              , C = Object.assign || function(e) {
                for (var t = 1; t < arguments.length; t++) {
                    var n = arguments[t];
                    for (var i in n)
                        Object.prototype.hasOwnProperty.call(n, i) && (e[i] = n[i])
                }
                return e
            }
            ;
            function _(e) {
                return C({}, e, {
                    right: e.left + e.width,
                    bottom: e.top + e.height
                })
            }
            function S(e) {
                var t = {};
                try {
                    if (h(10)) {
                        t = e.getBoundingClientRect();
                        var n = v(e, "top")
                          , i = v(e, "left");
                        t.top += n,
                        t.left += i,
                        t.bottom += n,
                        t.right += i
                    } else
                        t = e.getBoundingClientRect()
                } catch (e) {}
                var o = {
                    left: t.left,
                    top: t.top,
                    width: t.right - t.left,
                    height: t.bottom - t.top
                }
                  , r = "HTML" === e.nodeName ? y(e.ownerDocument) : {}
                  , a = r.width || e.clientWidth || o.width
                  , l = r.height || e.clientHeight || o.height
                  , u = e.offsetWidth - a
                  , c = e.offsetHeight - l;
                if (u || c) {
                    var d = s(e);
                    u -= g(d, "x"),
                    c -= g(d, "y"),
                    o.width -= u,
                    o.height -= c
                }
                return _(o)
            }
            function O(e, t) {
                var n = arguments.length > 2 && void 0 !== arguments[2] && arguments[2]
                  , i = h(10)
                  , o = "HTML" === t.nodeName
                  , r = S(e)
                  , a = S(t)
                  , u = l(e)
                  , c = s(t)
                  , d = parseFloat(c.borderTopWidth, 10)
                  , f = parseFloat(c.borderLeftWidth, 10);
                n && o && (a.top = Math.max(a.top, 0),
                a.left = Math.max(a.left, 0));
                var p = _({
                    top: r.top - a.top - d,
                    left: r.left - a.left - f,
                    width: r.width,
                    height: r.height
                });
                if (p.marginTop = 0,
                p.marginLeft = 0,
                !i && o) {
                    var m = parseFloat(c.marginTop, 10)
                      , g = parseFloat(c.marginLeft, 10);
                    p.top -= d - m,
                    p.bottom -= d - m,
                    p.left -= f - g,
                    p.right -= f - g,
                    p.marginTop = m,
                    p.marginLeft = g
                }
                return (i && !n ? t.contains(u) : t === u && "BODY" !== u.nodeName) && (p = function(e, t) {
                    var n = arguments.length > 2 && void 0 !== arguments[2] && arguments[2]
                      , i = v(t, "top")
                      , o = v(t, "left")
                      , r = n ? -1 : 1;
                    return e.top += i * r,
                    e.bottom += i * r,
                    e.left += o * r,
                    e.right += o * r,
                    e
                }(p, t)),
                p
            }
            function T(e) {
                if (!e || !e.parentElement || h())
                    return document.documentElement;
                for (var t = e.parentElement; t && "none" === s(t, "transform"); )
                    t = t.parentElement;
                return t || document.documentElement
            }
            function E(e, t, n, i) {
                var o = arguments.length > 4 && void 0 !== arguments[4] && arguments[4]
                  , r = {
                    top: 0,
                    left: 0
                }
                  , c = o ? T(e) : m(e, u(t));
                if ("viewport" === i)
                    r = function(e) {
                        var t = arguments.length > 1 && void 0 !== arguments[1] && arguments[1]
                          , n = e.ownerDocument.documentElement
                          , i = O(e, n)
                          , o = Math.max(n.clientWidth, window.innerWidth || 0)
                          , r = Math.max(n.clientHeight, window.innerHeight || 0)
                          , s = t ? 0 : v(n)
                          , a = t ? 0 : v(n, "left");
                        return _({
                            top: s - i.top + i.marginTop,
                            left: a - i.left + i.marginLeft,
                            width: o,
                            height: r
                        })
                    }(c, o);
                else {
                    var d = void 0;
                    "scrollParent" === i ? "BODY" === (d = l(a(t))).nodeName && (d = e.ownerDocument.documentElement) : d = "window" === i ? e.ownerDocument.documentElement : i;
                    var h = O(d, c, o);
                    if ("HTML" !== d.nodeName || function e(t) {
                        var n = t.nodeName;
                        if ("BODY" === n || "HTML" === n)
                            return !1;
                        if ("fixed" === s(t, "position"))
                            return !0;
                        var i = a(t);
                        return !!i && e(i)
                    }(c))
                        r = h;
                    else {
                        var f = y(e.ownerDocument)
                          , p = f.height
                          , g = f.width;
                        r.top += h.top - h.marginTop,
                        r.bottom = p + h.top,
                        r.left += h.left - h.marginLeft,
                        r.right = g + h.left
                    }
                }
                var b = "number" == typeof (n = n || 0);
                return r.left += b ? n : n.left || 0,
                r.top += b ? n : n.top || 0,
                r.right -= b ? n : n.right || 0,
                r.bottom -= b ? n : n.bottom || 0,
                r
            }
            function z(e, t, n, i, o) {
                var r = arguments.length > 5 && void 0 !== arguments[5] ? arguments[5] : 0;
                if (-1 === e.indexOf("auto"))
                    return e;
                var s = E(n, i, r, o)
                  , a = {
                    top: {
                        width: s.width,
                        height: t.top - s.top
                    },
                    right: {
                        width: s.right - t.right,
                        height: s.height
                    },
                    bottom: {
                        width: s.width,
                        height: s.bottom - t.bottom
                    },
                    left: {
                        width: t.left - s.left,
                        height: s.height
                    }
                }
                  , l = Object.keys(a).map((function(e) {
                    return C({
                        key: e
                    }, a[e], {
                        area: (t = a[e],
                        t.width * t.height)
                    });
                    var t
                }
                )).sort((function(e, t) {
                    return t.area - e.area
                }
                ))
                  , u = l.filter((function(e) {
                    var t = e.width
                      , i = e.height;
                    return t >= n.clientWidth && i >= n.clientHeight
                }
                ))
                  , c = u.length > 0 ? u[0].key : l[0].key
                  , d = e.split("-")[1];
                return c + (d ? "-" + d : "")
            }
            function N(e, t, n) {
                var i = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : null;
                return O(n, i ? T(t) : m(t, u(n)), i)
            }
            function F(e) {
                var t = e.ownerDocument.defaultView.getComputedStyle(e)
                  , n = parseFloat(t.marginTop || 0) + parseFloat(t.marginBottom || 0)
                  , i = parseFloat(t.marginLeft || 0) + parseFloat(t.marginRight || 0);
                return {
                    width: e.offsetWidth + i,
                    height: e.offsetHeight + n
                }
            }
            function $(e) {
                var t = {
                    left: "right",
                    right: "left",
                    bottom: "top",
                    top: "bottom"
                };
                return e.replace(/left|right|bottom|top/g, (function(e) {
                    return t[e]
                }
                ))
            }
            function A(e, t, n) {
                n = n.split("-")[0];
                var i = F(e)
                  , o = {
                    width: i.width,
                    height: i.height
                }
                  , r = -1 !== ["right", "left"].indexOf(n)
                  , s = r ? "top" : "left"
                  , a = r ? "left" : "top"
                  , l = r ? "height" : "width"
                  , u = r ? "width" : "height";
                return o[s] = t[s] + t[l] / 2 - i[l] / 2,
                o[a] = n === a ? t[a] - i[u] : t[$(a)],
                o
            }
            function L(e, t) {
                return Array.prototype.find ? e.find(t) : e.filter(t)[0]
            }
            function I(e, t, n) {
                return (void 0 === n ? e : e.slice(0, function(e, t, n) {
                    if (Array.prototype.findIndex)
                        return e.findIndex((function(e) {
                            return e[t] === n
                        }
                        ));
                    var i = L(e, (function(e) {
                        return e[t] === n
                    }
                    ));
                    return e.indexOf(i)
                }(e, "name", n))).forEach((function(e) {
                    e.function && console.warn("`modifier.function` is deprecated, use `modifier.fn`!");
                    var n = e.function || e.fn;
                    e.enabled && r(n) && (t.offsets.popper = _(t.offsets.popper),
                    t.offsets.reference = _(t.offsets.reference),
                    t = n(t, e))
                }
                )),
                t
            }
            function D() {
                if (!this.state.isDestroyed) {
                    var e = {
                        instance: this,
                        styles: {},
                        arrowStyles: {},
                        attributes: {},
                        flipped: !1,
                        offsets: {}
                    };
                    e.offsets.reference = N(this.state, this.popper, this.reference, this.options.positionFixed),
                    e.placement = z(this.options.placement, e.offsets.reference, this.popper, this.reference, this.options.modifiers.flip.boundariesElement, this.options.modifiers.flip.padding),
                    e.originalPlacement = e.placement,
                    e.positionFixed = this.options.positionFixed,
                    e.offsets.popper = A(this.popper, e.offsets.reference, e.placement),
                    e.offsets.popper.position = this.options.positionFixed ? "fixed" : "absolute",
                    e = I(this.modifiers, e),
                    this.state.isCreated ? this.options.onUpdate(e) : (this.state.isCreated = !0,
                    this.options.onCreate(e))
                }
            }
            function B(e, t) {
                return e.some((function(e) {
                    var n = e.name;
                    return e.enabled && n === t
                }
                ))
            }
            function P(e) {
                for (var t = [!1, "ms", "Webkit", "Moz", "O"], n = e.charAt(0).toUpperCase() + e.slice(1), i = 0; i < t.length; i++) {
                    var o = t[i]
                      , r = o ? "" + o + n : e;
                    if (void 0 !== document.body.style[r])
                        return r
                }
                return null
            }
            function M() {
                return this.state.isDestroyed = !0,
                B(this.modifiers, "applyStyle") && (this.popper.removeAttribute("x-placement"),
                this.popper.style.position = "",
                this.popper.style.top = "",
                this.popper.style.left = "",
                this.popper.style.right = "",
                this.popper.style.bottom = "",
                this.popper.style.willChange = "",
                this.popper.style[P("transform")] = ""),
                this.disableEventListeners(),
                this.options.removeOnDestroy && this.popper.parentNode.removeChild(this.popper),
                this
            }
            function j(e) {
                var t = e.ownerDocument;
                return t ? t.defaultView : window
            }
            function q(e, t, n, i) {
                n.updateBound = i,
                j(e).addEventListener("resize", n.updateBound, {
                    passive: !0
                });
                var o = l(e);
                return function e(t, n, i, o) {
                    var r = "BODY" === t.nodeName
                      , s = r ? t.ownerDocument.defaultView : t;
                    s.addEventListener(n, i, {
                        passive: !0
                    }),
                    r || e(l(s.parentNode), n, i, o),
                    o.push(s)
                }(o, "scroll", n.updateBound, n.scrollParents),
                n.scrollElement = o,
                n.eventsEnabled = !0,
                n
            }
            function Z() {
                this.state.eventsEnabled || (this.state = q(this.reference, this.options, this.state, this.scheduleUpdate))
            }
            function R() {
                var e, t;
                this.state.eventsEnabled && (cancelAnimationFrame(this.scheduleUpdate),
                this.state = (e = this.reference,
                t = this.state,
                j(e).removeEventListener("resize", t.updateBound),
                t.scrollParents.forEach((function(e) {
                    e.removeEventListener("scroll", t.updateBound)
                }
                )),
                t.updateBound = null,
                t.scrollParents = [],
                t.scrollElement = null,
                t.eventsEnabled = !1,
                t))
            }
            function H(e) {
                return "" !== e && !isNaN(parseFloat(e)) && isFinite(e)
            }
            function G(e, t) {
                Object.keys(t).forEach((function(n) {
                    var i = "";
                    -1 !== ["width", "height", "top", "right", "bottom", "left"].indexOf(n) && H(t[n]) && (i = "px"),
                    e.style[n] = t[n] + i
                }
                ))
            }
            var V = n && /Firefox/i.test(navigator.userAgent);
            function U(e, t, n) {
                var i = L(e, (function(e) {
                    return e.name === t
                }
                ))
                  , o = !!i && e.some((function(e) {
                    return e.name === n && e.enabled && e.order < i.order
                }
                ));
                if (!o) {
                    var r = "`" + t + "`"
                      , s = "`" + n + "`";
                    console.warn(s + " modifier is required by " + r + " modifier in order to work, be sure to include it before " + r + "!")
                }
                return o
            }
            var W = ["auto-start", "auto", "auto-end", "top-start", "top", "top-end", "right-start", "right", "right-end", "bottom-end", "bottom", "bottom-start", "left-end", "left", "left-start"]
              , K = W.slice(3);
            function J(e) {
                var t = arguments.length > 1 && void 0 !== arguments[1] && arguments[1]
                  , n = K.indexOf(e)
                  , i = K.slice(n + 1).concat(K.slice(0, n));
                return t ? i.reverse() : i
            }
            var Y = {
                FLIP: "flip",
                CLOCKWISE: "clockwise",
                COUNTERCLOCKWISE: "counterclockwise"
            };
            function Q(e, t, n, i) {
                var o = [0, 0]
                  , r = -1 !== ["right", "left"].indexOf(i)
                  , s = e.split(/(\+|\-)/).map((function(e) {
                    return e.trim()
                }
                ))
                  , a = s.indexOf(L(s, (function(e) {
                    return -1 !== e.search(/,|\s/)
                }
                )));
                s[a] && -1 === s[a].indexOf(",") && console.warn("Offsets separated by white space(s) are deprecated, use a comma (,) instead.");
                var l = /\s*,\s*|\s+/
                  , u = -1 !== a ? [s.slice(0, a).concat([s[a].split(l)[0]]), [s[a].split(l)[1]].concat(s.slice(a + 1))] : [s];
                return (u = u.map((function(e, i) {
                    var o = (1 === i ? !r : r) ? "height" : "width"
                      , s = !1;
                    return e.reduce((function(e, t) {
                        return "" === e[e.length - 1] && -1 !== ["+", "-"].indexOf(t) ? (e[e.length - 1] = t,
                        s = !0,
                        e) : s ? (e[e.length - 1] += t,
                        s = !1,
                        e) : e.concat(t)
                    }
                    ), []).map((function(e) {
                        return function(e, t, n, i) {
                            var o = e.match(/((?:\-|\+)?\d*\.?\d*)(.*)/)
                              , r = +o[1]
                              , s = o[2];
                            if (!r)
                                return e;
                            if (0 === s.indexOf("%")) {
                                var a = void 0;
                                switch (s) {
                                case "%p":
                                    a = n;
                                    break;
                                case "%":
                                case "%r":
                                default:
                                    a = i
                                }
                                return _(a)[t] / 100 * r
                            }
                            if ("vh" === s || "vw" === s) {
                                return ("vh" === s ? Math.max(document.documentElement.clientHeight, window.innerHeight || 0) : Math.max(document.documentElement.clientWidth, window.innerWidth || 0)) / 100 * r
                            }
                            return r
                        }(e, o, t, n)
                    }
                    ))
                }
                ))).forEach((function(e, t) {
                    e.forEach((function(n, i) {
                        H(n) && (o[t] += n * ("-" === e[i - 1] ? -1 : 1))
                    }
                    ))
                }
                )),
                o
            }
            var X = {
                placement: "bottom",
                positionFixed: !1,
                eventsEnabled: !0,
                removeOnDestroy: !1,
                onCreate: function() {},
                onUpdate: function() {},
                modifiers: {
                    shift: {
                        order: 100,
                        enabled: !0,
                        fn: function(e) {
                            var t = e.placement
                              , n = t.split("-")[0]
                              , i = t.split("-")[1];
                            if (i) {
                                var o = e.offsets
                                  , r = o.reference
                                  , s = o.popper
                                  , a = -1 !== ["bottom", "top"].indexOf(n)
                                  , l = a ? "left" : "top"
                                  , u = a ? "width" : "height"
                                  , c = {
                                    start: k({}, l, r[l]),
                                    end: k({}, l, r[l] + r[u] - s[u])
                                };
                                e.offsets.popper = C({}, s, c[i])
                            }
                            return e
                        }
                    },
                    offset: {
                        order: 200,
                        enabled: !0,
                        fn: function(e, t) {
                            var n = t.offset
                              , i = e.placement
                              , o = e.offsets
                              , r = o.popper
                              , s = o.reference
                              , a = i.split("-")[0]
                              , l = void 0;
                            return l = H(+n) ? [+n, 0] : Q(n, r, s, a),
                            "left" === a ? (r.top += l[0],
                            r.left -= l[1]) : "right" === a ? (r.top += l[0],
                            r.left += l[1]) : "top" === a ? (r.left += l[0],
                            r.top -= l[1]) : "bottom" === a && (r.left += l[0],
                            r.top += l[1]),
                            e.popper = r,
                            e
                        },
                        offset: 0
                    },
                    preventOverflow: {
                        order: 300,
                        enabled: !0,
                        fn: function(e, t) {
                            var n = t.boundariesElement || f(e.instance.popper);
                            e.instance.reference === n && (n = f(n));
                            var i = P("transform")
                              , o = e.instance.popper.style
                              , r = o.top
                              , s = o.left
                              , a = o[i];
                            o.top = "",
                            o.left = "",
                            o[i] = "";
                            var l = E(e.instance.popper, e.instance.reference, t.padding, n, e.positionFixed);
                            o.top = r,
                            o.left = s,
                            o[i] = a,
                            t.boundaries = l;
                            var u = t.priority
                              , c = e.offsets.popper
                              , d = {
                                primary: function(e) {
                                    var n = c[e];
                                    return c[e] < l[e] && !t.escapeWithReference && (n = Math.max(c[e], l[e])),
                                    k({}, e, n)
                                },
                                secondary: function(e) {
                                    var n = "right" === e ? "left" : "top"
                                      , i = c[n];
                                    return c[e] > l[e] && !t.escapeWithReference && (i = Math.min(c[n], l[e] - ("right" === e ? c.width : c.height))),
                                    k({}, n, i)
                                }
                            };
                            return u.forEach((function(e) {
                                var t = -1 !== ["left", "top"].indexOf(e) ? "primary" : "secondary";
                                c = C({}, c, d[t](e))
                            }
                            )),
                            e.offsets.popper = c,
                            e
                        },
                        priority: ["left", "right", "top", "bottom"],
                        padding: 5,
                        boundariesElement: "scrollParent"
                    },
                    keepTogether: {
                        order: 400,
                        enabled: !0,
                        fn: function(e) {
                            var t = e.offsets
                              , n = t.popper
                              , i = t.reference
                              , o = e.placement.split("-")[0]
                              , r = Math.floor
                              , s = -1 !== ["top", "bottom"].indexOf(o)
                              , a = s ? "right" : "bottom"
                              , l = s ? "left" : "top"
                              , u = s ? "width" : "height";
                            return n[a] < r(i[l]) && (e.offsets.popper[l] = r(i[l]) - n[u]),
                            n[l] > r(i[a]) && (e.offsets.popper[l] = r(i[a])),
                            e
                        }
                    },
                    arrow: {
                        order: 500,
                        enabled: !0,
                        fn: function(e, t) {
                            var n;
                            if (!U(e.instance.modifiers, "arrow", "keepTogether"))
                                return e;
                            var i = t.element;
                            if ("string" == typeof i) {
                                if (!(i = e.instance.popper.querySelector(i)))
                                    return e
                            } else if (!e.instance.popper.contains(i))
                                return console.warn("WARNING: `arrow.element` must be child of its popper element!"),
                                e;
                            var o = e.placement.split("-")[0]
                              , r = e.offsets
                              , a = r.popper
                              , l = r.reference
                              , u = -1 !== ["left", "right"].indexOf(o)
                              , c = u ? "height" : "width"
                              , d = u ? "Top" : "Left"
                              , h = d.toLowerCase()
                              , f = u ? "left" : "top"
                              , p = u ? "bottom" : "right"
                              , m = F(i)[c];
                            l[p] - m < a[h] && (e.offsets.popper[h] -= a[h] - (l[p] - m)),
                            l[h] + m > a[p] && (e.offsets.popper[h] += l[h] + m - a[p]),
                            e.offsets.popper = _(e.offsets.popper);
                            var v = l[h] + l[c] / 2 - m / 2
                              , g = s(e.instance.popper)
                              , b = parseFloat(g["margin" + d], 10)
                              , y = parseFloat(g["border" + d + "Width"], 10)
                              , w = v - e.offsets.popper[h] - b - y;
                            return w = Math.max(Math.min(a[c] - m, w), 0),
                            e.arrowElement = i,
                            e.offsets.arrow = (k(n = {}, h, Math.round(w)),
                            k(n, f, ""),
                            n),
                            e
                        },
                        element: "[x-arrow]"
                    },
                    flip: {
                        order: 600,
                        enabled: !0,
                        fn: function(e, t) {
                            if (B(e.instance.modifiers, "inner"))
                                return e;
                            if (e.flipped && e.placement === e.originalPlacement)
                                return e;
                            var n = E(e.instance.popper, e.instance.reference, t.padding, t.boundariesElement, e.positionFixed)
                              , i = e.placement.split("-")[0]
                              , o = $(i)
                              , r = e.placement.split("-")[1] || ""
                              , s = [];
                            switch (t.behavior) {
                            case Y.FLIP:
                                s = [i, o];
                                break;
                            case Y.CLOCKWISE:
                                s = J(i);
                                break;
                            case Y.COUNTERCLOCKWISE:
                                s = J(i, !0);
                                break;
                            default:
                                s = t.behavior
                            }
                            return s.forEach((function(a, l) {
                                if (i !== a || s.length === l + 1)
                                    return e;
                                i = e.placement.split("-")[0],
                                o = $(i);
                                var u = e.offsets.popper
                                  , c = e.offsets.reference
                                  , d = Math.floor
                                  , h = "left" === i && d(u.right) > d(c.left) || "right" === i && d(u.left) < d(c.right) || "top" === i && d(u.bottom) > d(c.top) || "bottom" === i && d(u.top) < d(c.bottom)
                                  , f = d(u.left) < d(n.left)
                                  , p = d(u.right) > d(n.right)
                                  , m = d(u.top) < d(n.top)
                                  , v = d(u.bottom) > d(n.bottom)
                                  , g = "left" === i && f || "right" === i && p || "top" === i && m || "bottom" === i && v
                                  , b = -1 !== ["top", "bottom"].indexOf(i)
                                  , y = !!t.flipVariations && (b && "start" === r && f || b && "end" === r && p || !b && "start" === r && m || !b && "end" === r && v)
                                  , w = !!t.flipVariationsByContent && (b && "start" === r && p || b && "end" === r && f || !b && "start" === r && v || !b && "end" === r && m)
                                  , x = y || w;
                                (h || g || x) && (e.flipped = !0,
                                (h || g) && (i = s[l + 1]),
                                x && (r = function(e) {
                                    return "end" === e ? "start" : "start" === e ? "end" : e
                                }(r)),
                                e.placement = i + (r ? "-" + r : ""),
                                e.offsets.popper = C({}, e.offsets.popper, A(e.instance.popper, e.offsets.reference, e.placement)),
                                e = I(e.instance.modifiers, e, "flip"))
                            }
                            )),
                            e
                        },
                        behavior: "flip",
                        padding: 5,
                        boundariesElement: "viewport",
                        flipVariations: !1,
                        flipVariationsByContent: !1
                    },
                    inner: {
                        order: 700,
                        enabled: !1,
                        fn: function(e) {
                            var t = e.placement
                              , n = t.split("-")[0]
                              , i = e.offsets
                              , o = i.popper
                              , r = i.reference
                              , s = -1 !== ["left", "right"].indexOf(n)
                              , a = -1 === ["top", "left"].indexOf(n);
                            return o[s ? "left" : "top"] = r[n] - (a ? o[s ? "width" : "height"] : 0),
                            e.placement = $(t),
                            e.offsets.popper = _(o),
                            e
                        }
                    },
                    hide: {
                        order: 800,
                        enabled: !0,
                        fn: function(e) {
                            if (!U(e.instance.modifiers, "hide", "preventOverflow"))
                                return e;
                            var t = e.offsets.reference
                              , n = L(e.instance.modifiers, (function(e) {
                                return "preventOverflow" === e.name
                            }
                            )).boundaries;
                            if (t.bottom < n.top || t.left > n.right || t.top > n.bottom || t.right < n.left) {
                                if (!0 === e.hide)
                                    return e;
                                e.hide = !0,
                                e.attributes["x-out-of-boundaries"] = ""
                            } else {
                                if (!1 === e.hide)
                                    return e;
                                e.hide = !1,
                                e.attributes["x-out-of-boundaries"] = !1
                            }
                            return e
                        }
                    },
                    computeStyle: {
                        order: 850,
                        enabled: !0,
                        fn: function(e, t) {
                            var n = t.x
                              , i = t.y
                              , o = e.offsets.popper
                              , r = L(e.instance.modifiers, (function(e) {
                                return "applyStyle" === e.name
                            }
                            )).gpuAcceleration;
                            void 0 !== r && console.warn("WARNING: `gpuAcceleration` option moved to `computeStyle` modifier and will not be supported in future versions of Popper.js!");
                            var s = void 0 !== r ? r : t.gpuAcceleration
                              , a = f(e.instance.popper)
                              , l = S(a)
                              , u = {
                                position: o.position
                            }
                              , c = function(e, t) {
                                var n = e.offsets
                                  , i = n.popper
                                  , o = n.reference
                                  , r = Math.round
                                  , s = Math.floor
                                  , a = function(e) {
                                    return e
                                }
                                  , l = r(o.width)
                                  , u = r(i.width)
                                  , c = -1 !== ["left", "right"].indexOf(e.placement)
                                  , d = -1 !== e.placement.indexOf("-")
                                  , h = t ? c || d || l % 2 == u % 2 ? r : s : a
                                  , f = t ? r : a;
                                return {
                                    left: h(l % 2 == 1 && u % 2 == 1 && !d && t ? i.left - 1 : i.left),
                                    top: f(i.top),
                                    bottom: f(i.bottom),
                                    right: h(i.right)
                                }
                            }(e, window.devicePixelRatio < 2 || !V)
                              , d = "bottom" === n ? "top" : "bottom"
                              , h = "right" === i ? "left" : "right"
                              , p = P("transform")
                              , m = void 0
                              , v = void 0;
                            if (v = "bottom" === d ? "HTML" === a.nodeName ? -a.clientHeight + c.bottom : -l.height + c.bottom : c.top,
                            m = "right" === h ? "HTML" === a.nodeName ? -a.clientWidth + c.right : -l.width + c.right : c.left,
                            s && p)
                                u[p] = "translate3d(" + m + "px, " + v + "px, 0)",
                                u[d] = 0,
                                u[h] = 0,
                                u.willChange = "transform";
                            else {
                                var g = "bottom" === d ? -1 : 1
                                  , b = "right" === h ? -1 : 1;
                                u[d] = v * g,
                                u[h] = m * b,
                                u.willChange = d + ", " + h
                            }
                            var y = {
                                "x-placement": e.placement
                            };
                            return e.attributes = C({}, y, e.attributes),
                            e.styles = C({}, u, e.styles),
                            e.arrowStyles = C({}, e.offsets.arrow, e.arrowStyles),
                            e
                        },
                        gpuAcceleration: !0,
                        x: "bottom",
                        y: "right"
                    },
                    applyStyle: {
                        order: 900,
                        enabled: !0,
                        fn: function(e) {
                            var t, n;
                            return G(e.instance.popper, e.styles),
                            t = e.instance.popper,
                            n = e.attributes,
                            Object.keys(n).forEach((function(e) {
                                !1 !== n[e] ? t.setAttribute(e, n[e]) : t.removeAttribute(e)
                            }
                            )),
                            e.arrowElement && Object.keys(e.arrowStyles).length && G(e.arrowElement, e.arrowStyles),
                            e
                        },
                        onLoad: function(e, t, n, i, o) {
                            var r = N(o, t, e, n.positionFixed)
                              , s = z(n.placement, r, t, e, n.modifiers.flip.boundariesElement, n.modifiers.flip.padding);
                            return t.setAttribute("x-placement", s),
                            G(t, {
                                position: n.positionFixed ? "fixed" : "absolute"
                            }),
                            n
                        },
                        gpuAcceleration: void 0
                    }
                }
            }
              , ee = function() {
                function e(t, n) {
                    var i = this
                      , s = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {};
                    w(this, e),
                    this.scheduleUpdate = function() {
                        return requestAnimationFrame(i.update)
                    }
                    ,
                    this.update = o(this.update.bind(this)),
                    this.options = C({}, e.Defaults, s),
                    this.state = {
                        isDestroyed: !1,
                        isCreated: !1,
                        scrollParents: []
                    },
                    this.reference = t && t.jquery ? t[0] : t,
                    this.popper = n && n.jquery ? n[0] : n,
                    this.options.modifiers = {},
                    Object.keys(C({}, e.Defaults.modifiers, s.modifiers)).forEach((function(t) {
                        i.options.modifiers[t] = C({}, e.Defaults.modifiers[t] || {}, s.modifiers ? s.modifiers[t] : {})
                    }
                    )),
                    this.modifiers = Object.keys(this.options.modifiers).map((function(e) {
                        return C({
                            name: e
                        }, i.options.modifiers[e])
                    }
                    )).sort((function(e, t) {
                        return e.order - t.order
                    }
                    )),
                    this.modifiers.forEach((function(e) {
                        e.enabled && r(e.onLoad) && e.onLoad(i.reference, i.popper, i.options, e, i.state)
                    }
                    )),
                    this.update();
                    var a = this.options.eventsEnabled;
                    a && this.enableEventListeners(),
                    this.state.eventsEnabled = a
                }
                return x(e, [{
                    key: "update",
                    value: function() {
                        return D.call(this)
                    }
                }, {
                    key: "destroy",
                    value: function() {
                        return M.call(this)
                    }
                }, {
                    key: "enableEventListeners",
                    value: function() {
                        return Z.call(this)
                    }
                }, {
                    key: "disableEventListeners",
                    value: function() {
                        return R.call(this)
                    }
                }]),
                e
            }();
            ee.Utils = ("undefined" != typeof window ? window : e).PopperUtils,
            ee.placements = W,
            ee.Defaults = X,
            t.a = ee
        }
        ).call(this, n(32))
    }
    , function(e, t, n) {
        "use strict";
        (function(e) {
            var n = function() {
                if ("undefined" != typeof Map)
                    return Map;
                function e(e, t) {
                    var n = -1;
                    return e.some((function(e, i) {
                        return e[0] === t && (n = i,
                        !0)
                    }
                    )),
                    n
                }
                return (function() {
                    function t() {
                        this.__entries__ = []
                    }
                    return Object.defineProperty(t.prototype, "size", {
                        get: function() {
                            return this.__entries__.length
                        },
                        enumerable: !0,
                        configurable: !0
                    }),
                    t.prototype.get = function(t) {
                        var n = e(this.__entries__, t)
                          , i = this.__entries__[n];
                        return i && i[1]
                    }
                    ,
                    t.prototype.set = function(t, n) {
                        var i = e(this.__entries__, t);
                        ~i ? this.__entries__[i][1] = n : this.__entries__.push([t, n])
                    }
                    ,
                    t.prototype.delete = function(t) {
                        var n = this.__entries__
                          , i = e(n, t);
                        ~i && n.splice(i, 1)
                    }
                    ,
                    t.prototype.has = function(t) {
                        return !!~e(this.__entries__, t)
                    }
                    ,
                    t.prototype.clear = function() {
                        this.__entries__.splice(0)
                    }
                    ,
                    t.prototype.forEach = function(e, t) {
                        void 0 === t && (t = null);
                        for (var n = 0, i = this.__entries__; n < i.length; n++) {
                            var o = i[n];
                            e.call(t, o[1], o[0])
                        }
                    }
                    ,
                    t
                }())
            }()
              , i = "undefined" != typeof window && "undefined" != typeof document && window.document === document
              , o = void 0 !== e && e.Math === Math ? e : "undefined" != typeof self && self.Math === Math ? self : "undefined" != typeof window && window.Math === Math ? window : Function("return this")()
              , r = "function" == typeof requestAnimationFrame ? requestAnimationFrame.bind(o) : function(e) {
                return setTimeout((function() {
                    return e(Date.now())
                }
                ), 1e3 / 60)
            }
              , s = 2;
            var a = 20
              , l = ["top", "right", "bottom", "left", "width", "height", "size", "weight"]
              , u = "undefined" != typeof MutationObserver
              , c = function() {
                function e() {
                    this.connected_ = !1,
                    this.mutationEventsAdded_ = !1,
                    this.mutationsObserver_ = null,
                    this.observers_ = [],
                    this.onTransitionEnd_ = this.onTransitionEnd_.bind(this),
                    this.refresh = function(e, t) {
                        var n = !1
                          , i = !1
                          , o = 0;
                        function a() {
                            n && (n = !1,
                            e()),
                            i && u()
                        }
                        function l() {
                            r(a)
                        }
                        function u() {
                            var e = Date.now();
                            if (n) {
                                if (e - o < s)
                                    return;
                                i = !0
                            } else
                                n = !0,
                                i = !1,
                                setTimeout(l, t);
                            o = e
                        }
                        return u
                    }(this.refresh.bind(this), a)
                }
                return e.prototype.addObserver = function(e) {
                    ~this.observers_.indexOf(e) || this.observers_.push(e),
                    this.connected_ || this.connect_()
                }
                ,
                e.prototype.removeObserver = function(e) {
                    var t = this.observers_
                      , n = t.indexOf(e);
                    ~n && t.splice(n, 1),
                    !t.length && this.connected_ && this.disconnect_()
                }
                ,
                e.prototype.refresh = function() {
                    this.updateObservers_() && this.refresh()
                }
                ,
                e.prototype.updateObservers_ = function() {
                    var e = this.observers_.filter((function(e) {
                        return e.gatherActive(),
                        e.hasActive()
                    }
                    ));
                    return e.forEach((function(e) {
                        return e.broadcastActive()
                    }
                    )),
                    e.length > 0
                }
                ,
                e.prototype.connect_ = function() {
                    i && !this.connected_ && (document.addEventListener("transitionend", this.onTransitionEnd_),
                    window.addEventListener("resize", this.refresh),
                    u ? (this.mutationsObserver_ = new MutationObserver(this.refresh),
                    this.mutationsObserver_.observe(document, {
                        attributes: !0,
                        childList: !0,
                        characterData: !0,
                        subtree: !0
                    })) : (document.addEventListener("DOMSubtreeModified", this.refresh),
                    this.mutationEventsAdded_ = !0),
                    this.connected_ = !0)
                }
                ,
                e.prototype.disconnect_ = function() {
                    i && this.connected_ && (document.removeEventListener("transitionend", this.onTransitionEnd_),
                    window.removeEventListener("resize", this.refresh),
                    this.mutationsObserver_ && this.mutationsObserver_.disconnect(),
                    this.mutationEventsAdded_ && document.removeEventListener("DOMSubtreeModified", this.refresh),
                    this.mutationsObserver_ = null,
                    this.mutationEventsAdded_ = !1,
                    this.connected_ = !1)
                }
                ,
                e.prototype.onTransitionEnd_ = function(e) {
                    var t = e.propertyName
                      , n = void 0 === t ? "" : t;
                    l.some((function(e) {
                        return !!~n.indexOf(e)
                    }
                    )) && this.refresh()
                }
                ,
                e.getInstance = function() {
                    return this.instance_ || (this.instance_ = new e),
                    this.instance_
                }
                ,
                e.instance_ = null,
                e
            }()
              , d = function(e, t) {
                for (var n = 0, i = Object.keys(t); n < i.length; n++) {
                    var o = i[n];
                    Object.defineProperty(e, o, {
                        value: t[o],
                        enumerable: !1,
                        writable: !1,
                        configurable: !0
                    })
                }
                return e
            }
              , h = function(e) {
                return e && e.ownerDocument && e.ownerDocument.defaultView || o
            }
              , f = y(0, 0, 0, 0);
            function p(e) {
                return parseFloat(e) || 0
            }
            function m(e) {
                for (var t = [], n = 1; n < arguments.length; n++)
                    t[n - 1] = arguments[n];
                return t.reduce((function(t, n) {
                    return t + p(e["border-" + n + "-width"])
                }
                ), 0)
            }
            function v(e) {
                var t = e.clientWidth
                  , n = e.clientHeight;
                if (!t && !n)
                    return f;
                var i = h(e).getComputedStyle(e)
                  , o = function(e) {
                    for (var t = {}, n = 0, i = ["top", "right", "bottom", "left"]; n < i.length; n++) {
                        var o = i[n]
                          , r = e["padding-" + o];
                        t[o] = p(r)
                    }
                    return t
                }(i)
                  , r = o.left + o.right
                  , s = o.top + o.bottom
                  , a = p(i.width)
                  , l = p(i.height);
                if ("border-box" === i.boxSizing && (Math.round(a + r) !== t && (a -= m(i, "left", "right") + r),
                Math.round(l + s) !== n && (l -= m(i, "top", "bottom") + s)),
                !function(e) {
                    return e === h(e).document.documentElement
                }(e)) {
                    var u = Math.round(a + r) - t
                      , c = Math.round(l + s) - n;
                    1 !== Math.abs(u) && (a -= u),
                    1 !== Math.abs(c) && (l -= c)
                }
                return y(o.left, o.top, a, l)
            }
            var g = "undefined" != typeof SVGGraphicsElement ? function(e) {
                return e instanceof h(e).SVGGraphicsElement
            }
            : function(e) {
                return e instanceof h(e).SVGElement && "function" == typeof e.getBBox
            }
            ;
            function b(e) {
                return i ? g(e) ? function(e) {
                    var t = e.getBBox();
                    return y(0, 0, t.width, t.height)
                }(e) : v(e) : f
            }
            function y(e, t, n, i) {
                return {
                    x: e,
                    y: t,
                    width: n,
                    height: i
                }
            }
            var w = function() {
                function e(e) {
                    this.broadcastWidth = 0,
                    this.broadcastHeight = 0,
                    this.contentRect_ = y(0, 0, 0, 0),
                    this.target = e
                }
                return e.prototype.isActive = function() {
                    var e = b(this.target);
                    return this.contentRect_ = e,
                    e.width !== this.broadcastWidth || e.height !== this.broadcastHeight
                }
                ,
                e.prototype.broadcastRect = function() {
                    var e = this.contentRect_;
                    return this.broadcastWidth = e.width,
                    this.broadcastHeight = e.height,
                    e
                }
                ,
                e
            }()
              , x = function(e, t) {
                var n, i, o, r, s, a, l, u = (i = (n = t).x,
                o = n.y,
                r = n.width,
                s = n.height,
                a = "undefined" != typeof DOMRectReadOnly ? DOMRectReadOnly : Object,
                l = Object.create(a.prototype),
                d(l, {
                    x: i,
                    y: o,
                    width: r,
                    height: s,
                    top: o,
                    right: i + r,
                    bottom: s + o,
                    left: i
                }),
                l);
                d(this, {
                    target: e,
                    contentRect: u
                })
            }
              , k = function() {
                function e(e, t, i) {
                    if (this.activeObservations_ = [],
                    this.observations_ = new n,
                    "function" != typeof e)
                        throw new TypeError("The callback provided as parameter 1 is not a function.");
                    this.callback_ = e,
                    this.controller_ = t,
                    this.callbackCtx_ = i
                }
                return e.prototype.observe = function(e) {
                    if (!arguments.length)
                        throw new TypeError("1 argument required, but only 0 present.");
                    if ("undefined" != typeof Element && Element instanceof Object) {
                        if (!(e instanceof h(e).Element))
                            throw new TypeError('parameter 1 is not of type "Element".');
                        var t = this.observations_;
                        t.has(e) || (t.set(e, new w(e)),
                        this.controller_.addObserver(this),
                        this.controller_.refresh())
                    }
                }
                ,
                e.prototype.unobserve = function(e) {
                    if (!arguments.length)
                        throw new TypeError("1 argument required, but only 0 present.");
                    if ("undefined" != typeof Element && Element instanceof Object) {
                        if (!(e instanceof h(e).Element))
                            throw new TypeError('parameter 1 is not of type "Element".');
                        var t = this.observations_;
                        t.has(e) && (t.delete(e),
                        t.size || this.controller_.removeObserver(this))
                    }
                }
                ,
                e.prototype.disconnect = function() {
                    this.clearActive(),
                    this.observations_.clear(),
                    this.controller_.removeObserver(this)
                }
                ,
                e.prototype.gatherActive = function() {
                    var e = this;
                    this.clearActive(),
                    this.observations_.forEach((function(t) {
                        t.isActive() && e.activeObservations_.push(t)
                    }
                    ))
                }
                ,
                e.prototype.broadcastActive = function() {
                    if (this.hasActive()) {
                        var e = this.callbackCtx_
                          , t = this.activeObservations_.map((function(e) {
                            return new x(e.target,e.broadcastRect())
                        }
                        ));
                        this.callback_.call(e, t, e),
                        this.clearActive()
                    }
                }
                ,
                e.prototype.clearActive = function() {
                    this.activeObservations_.splice(0)
                }
                ,
                e.prototype.hasActive = function() {
                    return this.activeObservations_.length > 0
                }
                ,
                e
            }()
              , C = "undefined" != typeof WeakMap ? new WeakMap : new n
              , _ = function e(t) {
                if (!(this instanceof e))
                    throw new TypeError("Cannot call a class as a function.");
                if (!arguments.length)
                    throw new TypeError("1 argument required, but only 0 present.");
                var n = c.getInstance()
                  , i = new k(t,n,this);
                C.set(this, i)
            };
            ["observe", "unobserve", "disconnect"].forEach((function(e) {
                _.prototype[e] = function() {
                    var t;
                    return (t = C.get(this))[e].apply(t, arguments)
                }
            }
            ));
            var S = void 0 !== o.ResizeObserver ? o.ResizeObserver : _;
            t.a = S
        }
        ).call(this, n(32))
    }
    , function(e, t, n) {
        var i, o;
        /*!
 * JavaScript Cookie v2.2.0
 * https://github.com/js-cookie/js-cookie
 *
 * Copyright 2006, 2015 Klaus Hartl & Fagner Brack
 * Released under the MIT license
 */
        !function(r) {
            if (void 0 === (o = "function" == typeof (i = r) ? i.call(t, n, t, e) : i) || (e.exports = o),
            !0,
            e.exports = r(),
            !!0) {
                var s = window.Cookies
                  , a = window.Cookies = r();
                a.noConflict = function() {
                    return window.Cookies = s,
                    a
                }
            }
        }((function() {
            function e() {
                for (var e = 0, t = {}; e < arguments.length; e++) {
                    var n = arguments[e];
                    for (var i in n)
                        t[i] = n[i]
                }
                return t
            }
            return function t(n) {
                function i(t, o, r) {
                    var s;
                    if ("undefined" != typeof document) {
                        if (arguments.length > 1) {
                            if ("number" == typeof (r = e({
                                path: "/"
                            }, i.defaults, r)).expires) {
                                var a = new Date;
                                a.setMilliseconds(a.getMilliseconds() + 864e5 * r.expires),
                                r.expires = a
                            }
                            r.expires = r.expires ? r.expires.toUTCString() : "";
                            try {
                                s = JSON.stringify(o),
                                /^[\{\[]/.test(s) && (o = s)
                            } catch (e) {}
                            o = n.write ? n.write(o, t) : encodeURIComponent(String(o)).replace(/%(23|24|26|2B|3A|3C|3E|3D|2F|3F|40|5B|5D|5E|60|7B|7D|7C)/g, decodeURIComponent),
                            t = (t = (t = encodeURIComponent(String(t))).replace(/%(23|24|26|2B|5E|60|7C)/g, decodeURIComponent)).replace(/[\(\)]/g, escape);
                            var l = "";
                            for (var u in r)
                                r[u] && (l += "; " + u,
                                !0 !== r[u] && (l += "=" + r[u]));
                            return document.cookie = t + "=" + o + l
                        }
                        t || (s = {});
                        for (var c = document.cookie ? document.cookie.split("; ") : [], d = /(%[0-9A-Z]{2})+/g, h = 0; h < c.length; h++) {
                            var f = c[h].split("=")
                              , p = f.slice(1).join("=");
                            this.json || '"' !== p.charAt(0) || (p = p.slice(1, -1));
                            try {
                                var m = f[0].replace(d, decodeURIComponent);
                                if (p = n.read ? n.read(p, m) : n(p, m) || p.replace(d, decodeURIComponent),
                                this.json)
                                    try {
                                        p = JSON.parse(p)
                                    } catch (e) {}
                                if (t === m) {
                                    s = p;
                                    break
                                }
                                t || (s[m] = p)
                            } catch (e) {}
                        }
                        return s
                    }
                }
                return i.set = i,
                i.get = function(e) {
                    return i.call(i, e)
                }
                ,
                i.getJSON = function() {
                    return i.apply({
                        json: !0
                    }, [].slice.call(arguments))
                }
                ,
                i.defaults = {},
                i.remove = function(t, n) {
                    i(t, "", e(n, {
                        expires: -1
                    }))
                }
                ,
                i.withConverter = t,
                i
            }((function() {}
            ))
        }
        ))
    }
    , function(e, t, n) {
        "use strict";
        var i = function(e) {
            return function(e) {
                return !!e && "object" == typeof e
            }(e) && !function(e) {
                var t = Object.prototype.toString.call(e);
                return "[object RegExp]" === t || "[object Date]" === t || function(e) {
                    return e.$$typeof === o
                }(e)
            }(e)
        };
        var o = "function" == typeof Symbol && Symbol.for ? Symbol.for("react.element") : 60103;
        function r(e, t) {
            var n;
            return t && !0 === t.clone && i(e) ? a((n = e,
            Array.isArray(n) ? [] : {}), e, t) : e
        }
        function s(e, t, n) {
            var o = e.slice();
            return t.forEach((function(t, s) {
                void 0 === o[s] ? o[s] = r(t, n) : i(t) ? o[s] = a(e[s], t, n) : -1 === e.indexOf(t) && o.push(r(t, n))
            }
            )),
            o
        }
        function a(e, t, n) {
            var o = Array.isArray(t);
            return o === Array.isArray(e) ? o ? ((n || {
                arrayMerge: s
            }).arrayMerge || s)(e, t, n) : function(e, t, n) {
                var o = {};
                return i(e) && Object.keys(e).forEach((function(t) {
                    o[t] = r(e[t], n)
                }
                )),
                Object.keys(t).forEach((function(s) {
                    i(t[s]) && e[s] ? o[s] = a(e[s], t[s], n) : o[s] = r(t[s], n)
                }
                )),
                o
            }(e, t, n) : r(t, n)
        }
        a.all = function(e, t) {
            if (!Array.isArray(e) || e.length < 2)
                throw new Error("first argument should be an array with at least two elements");
            return e.reduce((function(e, n) {
                return a(e, n, t)
            }
            ))
        }
        ;
        var l = a;
        e.exports = l
    }
    , function(e, t, n) {
        e.exports = n(124)
    }
    , function(e, t, n) {
        "use strict";
        var i = n(125);
        n.n(i).a
    }
    , function(e, t) {
        e.exports = function(e, t, n, i) {
            var o, r = 0;
            return "boolean" != typeof t && (i = n,
            n = t,
            t = void 0),
            function() {
                var s = this
                  , a = Number(new Date) - r
                  , l = arguments;
                function u() {
                    r = Number(new Date),
                    n.apply(s, l)
                }
                i && !o && u(),
                o && clearTimeout(o),
                void 0 === i && a > e ? u() : !0 !== t && (o = setTimeout(i ? function() {
                    o = void 0
                }
                : u, void 0 === i ? e - a : e))
            }
        }
    }
    , function(e, t, n) {
        "use strict";
        var i = n(130);
        n.n(i).a
    }
    , function(e, t, n) {
        "use strict";
        var i = n(132);
        n.n(i).a
    }
    , function(e, t, n) {
        "use strict";
        var i = n(134);
        n.n(i).a
    }
    , function(e, t, n) {
        "use strict";
        var i = n(136);
        n.n(i).a
    }
    , function(e, t, n) {
        "use strict";
        var i = n(138);
        n.n(i).a
    }
    , function(e, t, n) {
        "use strict";
        var i = n(140);
        n.n(i).a
    }
    , function(e, t, n) {
        "use strict";
        var i = n(142);
        n.n(i).a
    }
    , function(e, t, n) {
        "use strict";
        var i = n(144);
        n.n(i).a
    }
    , function(e, t, n) {
        "use strict";
        var i = n(146);
        n.n(i).a
    }
    , function(e, t, n) {
        "use strict";
        var i = n(148);
        n.n(i).a
    }
    , function(e, t, n) {
        "use strict";
        var i = n(150);
        n.n(i).a
    }
    , function(e, t, n) {
        "use strict";
        var i = n(152);
        n.n(i).a
    }
    , function(e, t, n) {
        "use strict";
        var i = n(154);
        n.n(i).a
    }
    , function(e, t, n) {
        "use strict";
        var i = n(156);
        n.n(i).a
    }
    , function(e, t, n) {
        "use strict";
        var i = n(158);
        n.n(i).a
    }
    , function(e, t, n) {
        "use strict";
        n.r(t),
        t.default = {
            el: {
                colorpicker: {
                    confirm: "OK",
                    clear: "Clear"
                },
                datepicker: {
                    now: "Now",
                    today: "Today",
                    cancel: "Cancel",
                    clear: "Clear",
                    confirm: "OK",
                    selectDate: "Select date",
                    selectTime: "Select time",
                    startDate: "Start Date",
                    startTime: "Start Time",
                    endDate: "End Date",
                    endTime: "End Time",
                    prevYear: "Previous Year",
                    nextYear: "Next Year",
                    prevMonth: "Previous Month",
                    nextMonth: "Next Month",
                    year: "",
                    month1: "January",
                    month2: "February",
                    month3: "March",
                    month4: "April",
                    month5: "May",
                    month6: "June",
                    month7: "July",
                    month8: "August",
                    month9: "September",
                    month10: "October",
                    month11: "November",
                    month12: "December",
                    weeks: {
                        sun: "Sun",
                        mon: "Mon",
                        tue: "Tue",
                        wed: "Wed",
                        thu: "Thu",
                        fri: "Fri",
                        sat: "Sat"
                    },
                    months: {
                        jan: "Jan",
                        feb: "Feb",
                        mar: "Mar",
                        apr: "Apr",
                        may: "May",
                        jun: "Jun",
                        jul: "Jul",
                        aug: "Aug",
                        sep: "Sep",
                        oct: "Oct",
                        nov: "Nov",
                        dec: "Dec"
                    }
                },
                select: {
                    loading: "Loading",
                    noMatch: "No matching data",
                    noData: "No data",
                    placeholder: "Select",
                    showOptions: "Show options",
                    hideOptions: "Hide options"
                },
                cascader: {
                    noMatch: "No matching data",
                    loading: "Loading",
                    placeholder: "Select"
                },
                pagination: {
                    goto: "Go to",
                    pagesize: " / page",
                    total: "Total {total}",
                    pageClassifier: ""
                },
                messagebox: {
                    title: "Message",
                    confirm: "OK",
                    cancel: "Cancel",
                    error: "Illegal input"
                },
                upload: {
                    deleteTip: "press delete to remove",
                    delete: "Delete",
                    preview: "Preview",
                    continue: "Continue"
                },
                table: {
                    emptyText: "No Data",
                    confirmFilter: "Confirm",
                    resetFilter: "Reset",
                    clearFilter: "All",
                    sumText: "Sum"
                },
                table2: {
                    confirm: "Confirm",
                    ascending: "Ascending",
                    descending: "Descending",
                    show: "Show",
                    order: "Order",
                    filters: "Filters",
                    retry: "Retry"
                },
                tree: {
                    emptyText: "No Data"
                },
                tag: {
                    delete: "Delete"
                },
                alert: {
                    close: "Close"
                },
                transfer: {
                    noMatch: "No matching data",
                    noData: "No data",
                    titles: ["List 1", "List 2"],
                    filterPlaceholder: "Enter keyword",
                    noCheckedFormat: "{total} items",
                    hasCheckedFormat: "{checked}/{total} checked"
                },
                settings: {
                    edit: "Edit",
                    add: "Add",
                    save: "Save",
                    cancel: "Cancel",
                    lock: "Lock",
                    unlock: "Unlock",
                    lockFor: 'Lock ON for "{featureName}"',
                    unlockFor: 'Unlock for "{featureName}"',
                    turnOn: "Turn On",
                    turnOff: "Turn Off",
                    turnOnFor: 'Turn ON for "{featureName}"',
                    turnOffFor: 'Turn OFF for "{featureName}"',
                    noset: "Not set.",
                    dependEffect: "The following settings depend on this setting, the change might affect them.",
                    dependsNoChange: "This option cannot be changed because",
                    dependsChanged: "This option has been changed because",
                    featureIsON: "{featureName} is ON",
                    featureIsOFF: "{featureName} is OFF",
                    featureUpdated: "{featureName} is updated.",
                    lockBefore: "{featureName} must be enabled and locked before you can lock this setting",
                    saveBeforeLocking: "You must save your changes before locking this setting",
                    noRemindAgain: "Do not remind me again",
                    modified: "Modified",
                    reset: "Reset",
                    resetFor: 'Reset for "{featureName}"',
                    resetWarning: "The setting will have the same value as the higher level setting.",
                    inheritedLevel: "Using {level} setting",
                    lockedBy: "Locked by {level} level setting",
                    updateBefore: 'You must update the field below and click "Save" before enabling this setting',
                    scheduleLockedTips: "The administrator has locked this setting and you cannot change it. All of your meetings will use this setting.",
                    required: "This field is required.",
                    noChange: "No Changes.",
                    lockedAtThisGroup: "Locked at this group",
                    lockedAtGroupName: "Locked at the group",
                    lockedAtGroupAdmin: "Locked at the group admin",
                    lockedAtAnotherGroup: "Locked at another group",
                    lockedByAdmin: "Locked by admin",
                    scheduleAccountTips: "All meetings in your account will immediately use this setting. Hosts cannot change this setting for their own meetings.",
                    scheduleAccountNotes: "Note: All meetings scheduled from the Zoom Client will also use this setting, even if the host has modified this setting. Zoom recommends informing meeting hosts that this setting is now locked.",
                    scheduleGroupTips: "All meetings in this group will immediately use this setting. Hosts cannot change this setting for their own meetings.",
                    scheduleGroupNotes: "Note: All meetings scheduled from the Zoom Client will also use this setting, even if the host has modified this setting. Zoom recommends informing meeting hosts that this setting is now locked."
                }
            }
        }
    }
    , function(e, t, n) {
        "use strict";
        n.r(t),
        t.default = {
            el: {
                colorpicker: {
                    confirm: "Confirmar",
                    clear: "Despejar"
                },
                datepicker: {
                    now: "Ahora",
                    today: "Hoy",
                    cancel: "Cancelar",
                    clear: "Despejar",
                    confirm: "Confirmar",
                    selectDate: "Seleccionar fecha",
                    selectTime: "Seleccionar hora",
                    startDate: "Fecha Incial",
                    startTime: "Hora Inicial",
                    endDate: "Fecha Final",
                    endTime: "Hora Final",
                    prevYear: "Año Anterior",
                    nextYear: "Próximo Año",
                    prevMonth: "Mes Anterior",
                    nextMonth: "Próximo Mes",
                    year: "",
                    month1: "enero",
                    month2: "febrero",
                    month3: "marzo",
                    month4: "abril",
                    month5: "mayo",
                    month6: "junio",
                    month7: "julio",
                    month8: "agosto",
                    month9: "septiembre",
                    month10: "octubre",
                    month11: "noviembre",
                    month12: "diciembre",
                    weeks: {
                        sun: "dom",
                        mon: "lun",
                        tue: "mar",
                        wed: "mié",
                        thu: "jue",
                        fri: "vie",
                        sat: "sáb"
                    },
                    months: {
                        jan: "ene",
                        feb: "feb",
                        mar: "mar",
                        apr: "abr",
                        may: "may",
                        jun: "jun",
                        jul: "jul",
                        aug: "ago",
                        sep: "sep",
                        oct: "oct",
                        nov: "nov",
                        dec: "dic"
                    }
                },
                select: {
                    loading: "Cargando",
                    noMatch: "No hay datos que coincidan",
                    noData: "Sin datos",
                    placeholder: "Seleccionar",
                    showOptions: "Montri eblojn",
                    hideOptions: "Kaŝi eblojn"
                },
                cascader: {
                    noMatch: "No hay datos que coincidan",
                    loading: "Cargando",
                    placeholder: "Seleccionar"
                },
                pagination: {
                    goto: "Ir a",
                    pagesize: " / página",
                    total: "Total {total}",
                    pageClassifier: ""
                },
                messagebox: {
                    confirm: "Aceptar",
                    cancel: "Cancelar",
                    error: "Entrada inválida"
                },
                upload: {
                    deleteTip: "press delete to remove",
                    delete: "Eliminar",
                    preview: "Vista Previa",
                    continue: "Continuar"
                },
                table: {
                    emptyText: "Sin Datos",
                    confirmFilter: "Confirmar",
                    resetFilter: "Reiniciar",
                    clearFilter: "Despejar",
                    sumText: "Suma"
                },
                table2: {
                    confirm: "Confirmar",
                    ascending: "Ascendente",
                    descending: "Descendiendo",
                    show: "Show",
                    order: "Orden",
                    filters: "Filtros",
                    retry: "Procesar de nuevo"
                },
                tree: {
                    emptyText: "Sin Datos"
                },
                tag: {
                    delete: "Eliminar"
                },
                alert: {
                    close: "Cerrar"
                },
                transfer: {
                    noMatch: "No hay datos que coincidan",
                    noData: "Sin datos",
                    titles: ["Lista 1", "Lista 2"],
                    filterPlaceholder: "Ingresar palabra clave",
                    noCheckedFormat: "{total} artículos",
                    hasCheckedFormat: "{checked}/{total} revisados"
                },
                settings: {
                    edit: "Edición",
                    add: "Adición",
                    save: "Guardar",
                    cancel: "Cancelar",
                    lock: "Boquear",
                    unlock: "Desbloquear",
                    lockFor: 'Bloquear ENCENDIDO por "{featureName}"',
                    unlockFor: 'Desbloquear para "{featureName}"',
                    turnOn: "Activar",
                    turnOff: "Desactivar",
                    turnOnFor: 'Turn ON for "{featureName}"',
                    turnOffFor: 'Turn OFF for "{featureName}"',
                    noset: "No se ha configurado todavía.",
                    dependEffect: "Los ajustes siguientes dependen de la configuración, y el cambio podría afectarlos.",
                    dependsNoChange: "Esta opción no se puede cambiar porque",
                    dependsChanged: "Esta opción se modificó porque",
                    featureIsON: "{featureName} está ACTIVADO",
                    featureIsOFF: "{featureName} está DESACTIVADO",
                    featureUpdated: "{featureName} se ha actualizado.",
                    lockBefore: "{featureName} debe estar habilitado y bloqueado antes de que pueda bloquear este ajuste",
                    saveBeforeLocking: "Debe guardar sus cambios antes de bloquear esta configuración",
                    noRemindAgain: "No recordarme de nuevo",
                    modified: "Modificado",
                    reset: "Restablecer",
                    resetFor: 'Reset for "{featureName}"',
                    resetWarning: "The setting will have the same value as the higher level setting.",
                    inheritedLevel: "Using {level} setting",
                    lockedBy: "Locked by {level} level setting",
                    updateBefore: "Debe actualizar el campo siguiente y hacer clic en “Guardar” antes de habilitar esta configuración",
                    scheduleLockedTips: "El administrador ha bloqueado esta configuración y no puede cambiarla. Todas sus reuniones usarán esta configuración.",
                    required: "Este campo es obligatorio.",
                    noChange: "Sin cambios.",
                    lockedAtThisGroup: "Locked at this group",
                    lockedAtGroupName: "Locked at the group",
                    lockedAtGroupAdmin: "Locked at the group admin",
                    lockedAtAnotherGroup: "Locked at another group",
                    lockedByAdmin: "Locked by admin",
                    scheduleAccountTips: "Todas las reuniones de su cuenta usarán de inmediato esta configuración. Los anfitriones no pueden cambiar esta configuración para sus propias reuniones.",
                    scheduleAccountNotes: "Nota: Todas las reuniones programadas desde el cliente de Zoom también usarán esta configuración, incluso si el anfitrión ha modificado esta configuración. Zoom recomienda informar a los anfitriones de la reunión que esta configuración ahora está bloqueada.",
                    scheduleGroupTips: "Todas las reuniones en este grupo usarán de inmediato esta configuración. Los anfitriones no pueden cambiar esta configuración para sus propias reuniones.",
                    scheduleGroupNotes: "Nota: Todas las reuniones programadas desde el cliente de Zoom también usarán esta configuración, incluso si el anfitrión ha modificado esta configuración. Zoom recomienda informar a los anfitriones de la reunión que esta configuración ahora está bloqueada."
                }
            }
        }
    }
    , function(e, t, n) {
        "use strict";
        n.r(t),
        t.default = {
            el: {
                colorpicker: {
                    confirm: "OK",
                    clear: "Leeren"
                },
                datepicker: {
                    now: "Jetzt",
                    today: "Heute",
                    cancel: "Abbrechen",
                    clear: "Leeren",
                    confirm: "OK",
                    selectDate: "Datum wählen",
                    selectTime: "Uhrzeit wählen",
                    startDate: "Startdatum",
                    startTime: "Startzeit",
                    endDate: "Enddatum",
                    endTime: "Endzeit",
                    prevYear: "Letztes Jahr",
                    nextYear: "Nächtes Jahr",
                    prevMonth: "Letzter Monat",
                    nextMonth: "Nächster Monat",
                    day: "Tag",
                    week: "Woche",
                    month: "Monat",
                    year: "",
                    month1: "Januar",
                    month2: "Februar",
                    month3: "März",
                    month4: "April",
                    month5: "Mai",
                    month6: "Juni",
                    month7: "Juli",
                    month8: "August",
                    month9: "September",
                    month10: "Oktober",
                    month11: "November",
                    month12: "Dezember",
                    weeks: {
                        sun: "So",
                        mon: "Mo",
                        tue: "Di",
                        wed: "Mi",
                        thu: "Do",
                        fri: "Fr",
                        sat: "Sa"
                    },
                    months: {
                        jan: "Jan",
                        feb: "Feb",
                        mar: "Mär",
                        apr: "Apr",
                        may: "Mai",
                        jun: "Jun",
                        jul: "Jul",
                        aug: "Aug",
                        sep: "Sep",
                        oct: "Okt",
                        nov: "Nov",
                        dec: "Dez"
                    }
                },
                select: {
                    loading: "Lädt.",
                    noMatch: "Nichts gefunden.",
                    noData: "Keine Daten",
                    placeholder: "Daten wählen",
                    showOptions: "Toon opties",
                    hideOptions: "Verberg opties"
                },
                cascader: {
                    noMatch: "Nichts gefunden.",
                    loading: "Lädt.",
                    placeholder: "Daten wählen"
                },
                pagination: {
                    goto: "Gehe zu",
                    pagesize: " pro Seite",
                    total: "Gesamt {total}",
                    pageClassifier: ""
                },
                messagebox: {
                    confirm: "OK",
                    cancel: "Abbrechen",
                    error: "Fehler"
                },
                upload: {
                    deleteTip: "Klicke löschen zum entfernen",
                    delete: "Löschen",
                    preview: "Vorschau",
                    continue: "Fortsetzen"
                },
                table: {
                    emptyText: "Keine Daten",
                    confirmFilter: "Anwenden",
                    resetFilter: "Zurücksetzen",
                    clearFilter: "Alles ",
                    sumText: "Summe"
                },
                table2: {
                    confirm: "Bestätigen",
                    ascending: "Aufsteigend",
                    descending: "Absteigend",
                    show: "Show",
                    order: "Auftrag",
                    filters: "Filters",
                    retry: "Wiederholen"
                },
                tree: {
                    emptyText: "Keine Einträge"
                },
                tag: {
                    delete: "Löschen"
                },
                alert: {
                    close: "Schließen"
                },
                transfer: {
                    noMatch: "Nichts gefunden.",
                    noData: "Keine Einträge",
                    titles: ["Liste 1", "Liste 2"],
                    filterPlaceholder: "Einträge filtern",
                    noCheckedFormat: "{total} Einträge",
                    hasCheckedFormat: "{checked}/{total} ausgewählt"
                },
                settings: {
                    edit: "Bearbeiten",
                    add: "Hinzufügen",
                    save: "Speichern",
                    cancel: "Abbrechen",
                    lock: "Sperren",
                    unlock: "Entsperren",
                    lockFor: 'AN sperren für "{featureName}"',
                    unlockFor: 'Entsperren für "{featureName}"',
                    turnOn: "Einschalten",
                    turnOff: "Deaktivieren",
                    turnOnFor: 'Turn ON for "{featureName}"',
                    turnOffFor: 'Turn OFF for "{featureName}"',
                    noset: "Noch nicht festgelegt.",
                    dependEffect: "Die folgenden Einstellungen hängen von dieser Einstellung ab, die Änderung beeinträchtigt sie möglicherweise.",
                    dependsNoChange: "Diese Option kann nicht geändert werden, weil",
                    dependsChanged: "Diese Option wurde geändert, weil",
                    featureIsON: "{featureName} ist EIN",
                    featureIsOFF: "{featureName} ist AUS",
                    featureUpdated: "{featureName} wird aktualisiert.",
                    lockBefore: "{featureName} muss aktiviert und gesperrt werden, ehe Sie diese Einstellung sperren können",
                    saveBeforeLocking: "Sie müssen Ihre Änderungen speichern, bevor Sie diese Einstellung sperren",
                    noRemindAgain: "Nicht erneut warnen",
                    modified: "Geändert",
                    reset: "Zurücksetzen",
                    resetFor: 'Reset for "{featureName}"',
                    resetWarning: "The setting will have the same value as the higher level setting.",
                    inheritedLevel: "Using {level} setting",
                    lockedBy: "Locked by {level} level setting",
                    updateBefore: 'Sie müssen das Feld unten aktualisieren und "Speichern" vor der Aktualisierung dieser Einstellung anklicken',
                    scheduleLockedTips: "Der Administrator hat diese Einstellung gesperrt und Sie können sie nicht ändern. Alle Ihre Meetings verwenden diese Einstellung.",
                    required: "Dieses Feld ist erforderlich.",
                    noChange: "Keine Änderungen.",
                    lockedAtThisGroup: "Locked at this group",
                    lockedAtGroupName: "Locked at the group",
                    lockedAtGroupAdmin: "Locked at the group admin",
                    lockedAtAnotherGroup: "Locked at another group",
                    lockedByAdmin: "Locked by admin",
                    scheduleAccountTips: "Alle Meetings auf Ihrem Konto verwenden sofort diese Einstellung. Hosts können diese Einstellung nicht für Ihre eigenen Meetings verwenden.",
                    scheduleAccountNotes: "Hinweis: Alle geplanten Meetings vom Zoom Kunden verwenden auch diese Einstellung, auch wenn der Host diese Einstellung geändert hat. Zoom empfiehlt, die Meeting Hosts darüber zu informieren, dass diese Einstellung jetzt gesperrt ist.",
                    scheduleGroupTips: "Alle Meetings in dieser Gruppe verwenden sofort diese Einstellung. Hosts können diese Einstellung nicht für Ihre eigenen Meetings verwenden.",
                    scheduleGroupNotes: "Hinweis: Alle geplanten Meetings vom Zoom Kunden verwenden auch diese Einstellung, auch wenn der Host diese Einstellung geändert hat. Zoom empfiehlt, die Meeting Hosts darüber zu informieren, dass diese Einstellung jetzt gesperrt ist."
                }
            }
        }
    }
    , function(e, t, n) {
        "use strict";
        n.r(t),
        t.default = {
            el: {
                colorpicker: {
                    confirm: "OK",
                    clear: "Effacer"
                },
                datepicker: {
                    now: "Maintenant",
                    today: "Auj.",
                    cancel: "Annuler",
                    clear: "Effacer",
                    confirm: "OK",
                    selectDate: "Choisir date",
                    selectTime: "Choisir horaire",
                    startDate: "Date début",
                    startTime: "Horaire début",
                    endDate: "Date fin",
                    endTime: "Horaire fin",
                    prevYear: "Année précédente",
                    nextYear: "Année suivante",
                    prevMonth: "Mois précédent",
                    nextMonth: "Mois suivant",
                    year: "",
                    month1: "Janvier",
                    month2: "Février",
                    month3: "Mars",
                    month4: "Avril",
                    month5: "Mai",
                    month6: "Juin",
                    month7: "Juillet",
                    month8: "Août",
                    month9: "Septembre",
                    month10: "Octobre",
                    month11: "Novembre",
                    month12: "Décembre",
                    weeks: {
                        sun: "Dim",
                        mon: "Lun",
                        tue: "Mar",
                        wed: "Mer",
                        thu: "Jeu",
                        fri: "Ven",
                        sat: "Sam"
                    },
                    months: {
                        jan: "Jan",
                        feb: "Fév",
                        mar: "Mar",
                        apr: "Avr",
                        may: "Mai",
                        jun: "Jun",
                        jul: "Jul",
                        aug: "Aoû",
                        sep: "Sep",
                        oct: "Oct",
                        nov: "Nov",
                        dec: "Déc"
                    }
                },
                select: {
                    loading: "Chargement",
                    noMatch: "Aucune correspondance",
                    noData: "Aucune donnée",
                    placeholder: "Choisir",
                    showOptions: "Afficher les options",
                    hideOptions: "Masquer les options"
                },
                cascader: {
                    noMatch: "Aucune correspondance",
                    loading: "Chargement",
                    placeholder: "Choisir"
                },
                pagination: {
                    goto: "Aller à",
                    pagesize: " / page",
                    total: "Total {total}",
                    pageClassifier: ""
                },
                messagebox: {
                    confirm: "Confirmer",
                    cancel: "Annuler",
                    error: "Erreur"
                },
                upload: {
                    deleteTip: "Cliquer sur supprimer pour retirer le fichier",
                    delete: "Supprimer",
                    preview: "Aperçu",
                    continue: "Continuer"
                },
                table: {
                    emptyText: "Aucune donnée",
                    confirmFilter: "Confirmer",
                    resetFilter: "Réinitialiser",
                    clearFilter: "Tous",
                    sumText: "Somme"
                },
                table2: {
                    confirm: "Confirmer",
                    ascending: "Ascendant",
                    descending: "Descendant",
                    show: "Spectacle",
                    order: "Ordre",
                    filters: "Les filtres",
                    retry: "Réessayez"
                },
                tree: {
                    emptyText: "Aucune donnée"
                },
                tag: {
                    delete: "Supprimer"
                },
                alert: {
                    close: "Fermer"
                },
                transfer: {
                    noMatch: "Aucune correspondance",
                    noData: "Aucune donnée",
                    titles: ["Liste 1", "Liste 2"],
                    filterPlaceholder: "Entrer un mot clef",
                    noCheckedFormat: "{total} elements",
                    hasCheckedFormat: "{checked}/{total} coché(s)"
                },
                settings: {
                    edit: "Editer",
                    add: "Ajouter",
                    save: "Enregistrer",
                    cancel: "Annuler",
                    lock: "Verrouiller",
                    unlock: "Déverrouiller",
                    lockFor: 'Verrouiller ON (activé) pour "{featureName}"',
                    unlockFor: 'Déverrouiller pour "{featureName}"',
                    turnOn: "Activer",
                    turnOff: "Désactivez",
                    turnOnFor: 'Turn ON for "{featureName}"',
                    turnOffFor: 'Turn OFF for "{featureName}"',
                    noset: "Pas encore paramétré.",
                    dependEffect: "Les paramètres suivants dépendent de ce paramètre, le changement peut les affecter.",
                    dependsNoChange: "Cette option ne peut pas être modifiée car",
                    dependsChanged: "Cette option a été modifiée car",
                    featureIsON: "{featureName} est activé",
                    featureIsOFF: "{featureName} est désactivé",
                    featureUpdated: "{featureName} est à jour.",
                    lockBefore: "{featureName} doit être activé et verrouillé afin de pouvoir verrouiller ce paramètre",
                    saveBeforeLocking: "Vous devez enregistrer vos modifications avant de verrouiller ce paramètre",
                    noRemindAgain: "Ne pas me le rappeler",
                    modified: "Modifié",
                    reset: "Réinitialiser",
                    resetFor: 'Reset for "{featureName}"',
                    resetWarning: "The setting will have the same value as the higher level setting.",
                    inheritedLevel: "Using {level} setting",
                    lockedBy: "Locked by {level} level setting",
                    updateBefore: "Vous devez mettre à jour le champ ci-dessous et cliquer sur « Enregistrer » avant d’activer ce paramètre",
                    scheduleLockedTips: "L’administrateur a verrouillé ce paramètre et vous ne pouvez pas le modifier. Toutes vos réunions utiliseront ce paramètre.",
                    required: "Ce champ est obligatoire.",
                    noChange: "Aucune modification.",
                    lockedAtThisGroup: "Locked at this group",
                    lockedAtGroupName: "Locked at the group",
                    lockedAtGroupAdmin: "Locked at the group admin",
                    lockedAtAnotherGroup: "Locked at another group",
                    lockedByAdmin: "Locked by admin",
                    scheduleAccountTips: "Toutes les réunions dans votre compte utiliseront immédiatement ce paramètre. Les animateurs ne peuvent pas modifier ce paramètre pour leur propre réunion.",
                    scheduleAccountNotes: "Remarque : Toutes les réunions programmées depuis le Client Zoom utiliseront également l ce paramètre même si l’animateur a modifié ce paramètre. Zoom suggère d’informer les animateurs de la réunion que ce paramètre est désormais verrouillé.",
                    scheduleGroupTips: "Toutes les réunions de ce groupe utiliseront immédiatement ce paramètre. Les animateurs ne peuvent pas modifier ce paramètre pour leur propre réunion.",
                    scheduleGroupNotes: "Remarque : Toutes les réunions programmées depuis le Client Zoom utiliseront également l ce paramètre même si l’animateur a modifié ce paramètre. Zoom suggère d’informer les animateurs de la réunion que ce paramètre est désormais verrouillé."
                }
            }
        }
    }
    , function(e, t, n) {
        "use strict";
        n.r(t),
        t.default = {
            el: {
                colorpicker: {
                    confirm: "OK",
                    clear: "クリア"
                },
                datepicker: {
                    now: "現在",
                    today: "今日",
                    cancel: "キャンセル",
                    clear: "クリア",
                    confirm: "OK",
                    selectDate: "日付を選択",
                    selectTime: "時間を選択",
                    startDate: "開始日",
                    startTime: "開始時間",
                    endDate: "終了日",
                    endTime: "終了時間",
                    prevYear: "前年",
                    nextYear: "翌年",
                    prevMonth: "前月",
                    nextMonth: "翌月",
                    year: "年",
                    month1: "1月",
                    month2: "2月",
                    month3: "3月",
                    month4: "4月",
                    month5: "5月",
                    month6: "6月",
                    month7: "7月",
                    month8: "8月",
                    month9: "9月",
                    month10: "10月",
                    month11: "11月",
                    month12: "12月",
                    weeks: {
                        sun: "日",
                        mon: "月",
                        tue: "火",
                        wed: "水",
                        thu: "木",
                        fri: "金",
                        sat: "土"
                    },
                    months: {
                        jan: "1月",
                        feb: "2月",
                        mar: "3月",
                        apr: "4月",
                        may: "5月",
                        jun: "6月",
                        jul: "7月",
                        aug: "8月",
                        sep: "9月",
                        oct: "10月",
                        nov: "11月",
                        dec: "12月"
                    }
                },
                select: {
                    loading: "ロード中",
                    noMatch: "データなし",
                    noData: "データなし",
                    placeholder: "選択してください",
                    showOptions: "オプションを表示する",
                    hideOptions: "オプションを非表示"
                },
                cascader: {
                    noMatch: "データなし",
                    loading: "ロード中",
                    placeholder: "選択してください"
                },
                pagination: {
                    goto: "",
                    pagesize: "件/ページ",
                    total: "総計 {total} 件",
                    pageClassifier: "ページ目へ"
                },
                messagebox: {
                    title: "メッセージ",
                    confirm: "OK",
                    cancel: "キャンセル",
                    error: "正しくない入力"
                },
                upload: {
                    deleteTip: "Delキーを押して削除する",
                    delete: "削除する",
                    preview: "プレビュー",
                    continue: "続行する"
                },
                table: {
                    emptyText: "データなし",
                    confirmFilter: "確認",
                    resetFilter: "初期化",
                    clearFilter: "すべて",
                    sumText: "合計"
                },
                table2: {
                    confirm: "確認する",
                    ascending: "上昇",
                    descending: "降順",
                    show: "見せる",
                    order: "注文",
                    filters: "フィルター",
                    retry: "リトライ"
                },
                tree: {
                    emptyText: "データなし"
                },
                tag: {
                    delete: "削除する"
                },
                alert: {
                    close: "閉鎖する"
                },
                transfer: {
                    noMatch: "データなし",
                    noData: "データなし",
                    titles: ["リスト 1", "リスト 2"],
                    filterPlaceholder: "キーワードを入力",
                    noCheckedFormat: "総計 {total} 件",
                    hasCheckedFormat: "{checked}/{total} を選択した"
                },
                settings: {
                    edit: "エディット",
                    add: "追加",
                    save: "保存",
                    cancel: "キャンセル",
                    lock: "ロック",
                    unlock: "ロック解除",
                    lockFor: 'ロックする "{featureName}"',
                    unlockFor: 'ロック解除 "{featureName}"',
                    turnOn: "オンにする",
                    turnOff: "オフにする",
                    turnOnFor: 'Turn ON for "{featureName}"',
                    turnOffFor: 'Turn OFF for "{featureName}"',
                    noset: "未設定",
                    dependEffect: "次の設定はこの設定に依存しており、変更によって影響が出るかもしれません。",
                    dependsNoChange: "このオプションは次の理由のため、変更できません",
                    dependsChanged: "このオプションは次の理由のために変更されました",
                    featureIsON: "{featureName} はオンです",
                    featureIsOFF: "{featureName} はオフです",
                    featureUpdated: "{featureName} が更新されました。",
                    lockBefore: "この設定をロックする前に、 {featureName} を有効にしてロックする必要があります",
                    saveBeforeLocking: "この設定をロックする前に変更を保存する必要があります",
                    noRemindAgain: "通知を再表示しない",
                    modified: "更新",
                    reset: "リセット",
                    resetFor: 'Reset for "{featureName}"',
                    resetWarning: "The setting will have the same value as the higher level setting.",
                    inheritedLevel: "Using {level} setting",
                    lockedBy: "Locked by {level} level setting",
                    updateBefore: "この設定を有効にする前に下記のフィールドを更新し、「保存」をクリックする必要があります",
                    scheduleLockedTips: "管理者がこの設定をロックしているため、設定の変更はできません。あなたのミーティングはすべて、この設定を使用します。",
                    required: "このフィールドは必須です。",
                    noChange: "変更はありません。",
                    lockedAtThisGroup: "Locked at this group",
                    lockedAtGroupName: "Locked at the group",
                    lockedAtGroupAdmin: "Locked at the group admin",
                    lockedAtAnotherGroup: "Locked at another group",
                    lockedByAdmin: "Locked by admin",
                    scheduleAccountTips: "あなたのアカウントの全ミーティングが即時にこの設定を使用するため。ホストが自身のミーティングに対するこの設定を変更できないため。",
                    scheduleAccountNotes: "注意：この設定がホストによって修正されている場合でも、Zoomクライアントで予定された全ミーティングはこの設定を使用します。Zoomは、この設定が現在ロックされている旨をミーティングホストに通知することをお勧めしています。",
                    scheduleGroupTips: "このグループのミーティングすべてが即時にこの設定を使用します。ホストは自身のミーティングに対するこの設定を変更できません。",
                    scheduleGroupNotes: "注意：この設定がホストによって修正されている場合でも、Zoomクライアントで予定された全ミーティングはこの設定を使用します。Zoomは、この設定が現在ロックされている旨をミーティングホストに通知することをお勧めしています。"
                }
            }
        }
    }
    , function(e, t, n) {
        "use strict";
        n.r(t),
        t.default = {
            el: {
                colorpicker: {
                    confirm: "Confirmar",
                    clear: "Limpar"
                },
                datepicker: {
                    now: "Agora",
                    today: "Hoje",
                    cancel: "Cancelar",
                    clear: "Limpar",
                    confirm: "Confirmar",
                    selectDate: "Selecione a data",
                    selectTime: "Selecione a hora",
                    startDate: "Data de inicio",
                    startTime: "Hora de inicio",
                    endDate: "Data de fim",
                    endTime: "Hora de fim",
                    prevYear: "Previous Year",
                    nextYear: "Next Year",
                    prevMonth: "Previous Month",
                    nextMonth: "Next Month",
                    year: "",
                    month1: "Janeiro",
                    month2: "Fevereiro",
                    month3: "Março",
                    month4: "Abril",
                    month5: "Maio",
                    month6: "Junho",
                    month7: "Julho",
                    month8: "Agosto",
                    month9: "Setembro",
                    month10: "Outubro",
                    month11: "Novembro",
                    month12: "Dezembro",
                    weeks: {
                        sun: "Dom",
                        mon: "Seg",
                        tue: "Ter",
                        wed: "Qua",
                        thu: "Qui",
                        fri: "Sex",
                        sat: "Sab"
                    },
                    months: {
                        jan: "Jan",
                        feb: "Fev",
                        mar: "Mar",
                        apr: "Abr",
                        may: "Mai",
                        jun: "Jun",
                        jul: "Jul",
                        aug: "Ago",
                        sep: "Set",
                        oct: "Out",
                        nov: "Nov",
                        dec: "Dez"
                    }
                },
                select: {
                    loading: "A carregar",
                    noMatch: "Sem correspondência",
                    noData: "Sem dados",
                    placeholder: "Selecione",
                    showOptions: "Mostrar opções",
                    hideOptions: "Ocultar opções"
                },
                cascader: {
                    noMatch: "Sem correspondência",
                    loading: "A carregar",
                    placeholder: "Selecione"
                },
                pagination: {
                    goto: "Ir para",
                    pagesize: " / pagina",
                    total: "Total {total}",
                    pageClassifier: ""
                },
                messagebox: {
                    title: "Mensagem",
                    confirm: "Confirmar",
                    cancel: "Cancelar",
                    error: "Erro!"
                },
                upload: {
                    deleteTip: "press delete to remove",
                    delete: "Apagar",
                    preview: "Previsualizar",
                    continue: "Continuar"
                },
                table: {
                    emptyText: "Sem dados",
                    confirmFilter: "Confirmar",
                    resetFilter: "Limpar",
                    clearFilter: "Todos",
                    sumText: "Sum"
                },
                table2: {
                    confirm: "confirme",
                    ascending: "Ascendente",
                    descending: "descendente",
                    show: "exposição",
                    order: "Ordem",
                    filters: "Filtros",
                    retry: "Tente novamente"
                },
                tree: {
                    emptyText: "Sem dados"
                },
                tag: {
                    delete: "Apagar"
                },
                alert: {
                    close: "Fechar"
                },
                transfer: {
                    noMatch: "Sem correspondência",
                    noData: "Sem dados",
                    titles: ["List 1", "List 2"],
                    filterPlaceholder: "Enter keyword",
                    noCheckedFormat: "{total} items",
                    hasCheckedFormat: "{checked}/{total} checked"
                },
                settings: {
                    edit: "Editar",
                    add: "Adicionar",
                    save: "Salvar",
                    cancel: "Cancelar",
                    lock: "Bloquear",
                    unlock: "Desbloquear",
                    lockFor: 'Bloquear "{featureName}"',
                    unlockFor: 'Desbloquear "{featureName}"',
                    turnOn: "Ligar",
                    turnOff: "Desligar",
                    turnOnFor: 'Turn ON for "{featureName}"',
                    turnOffFor: 'Turn OFF for "{featureName}"',
                    noset: "Não definido ainda.",
                    dependEffect: "As seguintes configurações dependem desta, a alteração dela pode modificá-las.",
                    dependsNoChange: "Esta opção não pode ser alterada porque",
                    dependsChanged: "Essa opção foi modificada porque",
                    featureIsON: "{featureName} está LIGADO",
                    featureIsOFF: "{featureName} está DESLIGADO",
                    featureUpdated: "{featureName} está atualizado.",
                    lockBefore: "{featureName} deve estar ativado e bloqueado para que você consiga bloquear essa configuração",
                    saveBeforeLocking: "As mudanças devem ser salvas antes de bloquear esta configuração",
                    noRemindAgain: "Não me lembre novamente",
                    modified: "Modificado",
                    reset: "Redefinir",
                    resetFor: 'Reset for "{featureName}"',
                    resetWarning: "The setting will have the same value as the higher level setting.",
                    inheritedLevel: "Using {level} setting",
                    lockedBy: "Locked by {level} level setting",
                    updateBefore: "É preciso atualizar o campo abaixo e clicar em “Salvar” antes de habilitar essa configuração",
                    scheduleLockedTips: "O administrador bloqueou esta configuração e não é possível alterá-la. Todas as suas reuniões usarão esta configuração.",
                    required: "Este campo é obrigatório.",
                    noChange: "Nenhuma Alteração.",
                    lockedAtThisGroup: "Locked at this group",
                    lockedAtGroupName: "Locked at the group",
                    lockedAtGroupAdmin: "Locked at the group admin",
                    lockedAtAnotherGroup: "Locked at another group",
                    lockedByAdmin: "Locked by admin",
                    scheduleAccountTips: "Todas as reuniões em sua conta usarão essa configuração imediatamente. Anfitriões não podem alterar esta configuração para suas próprias reuniões.",
                    scheduleAccountNotes: "Observação: Todas as reuniões agendadas do Cliente Zoom também usarão essa configuração, mesmo que o anfitrião tenha a alterado. O Zoom recomenda informar aos anfitriões de reunião que esta configuração está bloqueada.",
                    scheduleGroupTips: "Todas as reuniões em sua conta usarão essa configuração imediatamente. Anfitriões não podem alterar esta configuração para suas próprias reuniões.",
                    scheduleGroupNotes: "Observação: Todas as reuniões agendadas do Cliente Zoom também usarão essa configuração, mesmo que o anfitrião tenha a alterado. O Zoom recomenda informar aos anfitriões de reunião que esta configuração está bloqueada."
                }
            }
        }
    }
    , function(e, t, n) {
        "use strict";
        n.r(t),
        t.default = {
            el: {
                colorpicker: {
                    confirm: "OK",
                    clear: "Очистить"
                },
                datepicker: {
                    now: "Сейчас",
                    today: "Сегодня",
                    cancel: "Отмена",
                    clear: "Очистить",
                    confirm: "OK",
                    selectDate: "Выбрать дату",
                    selectTime: "Выбрать время",
                    startDate: "Дата начала",
                    startTime: "Время начала",
                    endDate: "Дата окончания",
                    endTime: "Время окончания",
                    prevYear: "Предыдущий год",
                    nextYear: "Следующий год",
                    prevMonth: "Предыдущий месяц",
                    nextMonth: "Следующий месяц",
                    year: "",
                    month1: "Январь",
                    month2: "Февраль",
                    month3: "Март",
                    month4: "Апрель",
                    month5: "Май",
                    month6: "Июнь",
                    month7: "Июль",
                    month8: "Август",
                    month9: "Сентябрь",
                    month10: "Октябрь",
                    month11: "Ноябрь",
                    month12: "Декабрь",
                    weeks: {
                        sun: "Вс",
                        mon: "Пн",
                        tue: "Вт",
                        wed: "Ср",
                        thu: "Чт",
                        fri: "Пт",
                        sat: "Сб"
                    },
                    months: {
                        jan: "Янв",
                        feb: "Фев",
                        mar: "Мар",
                        apr: "Апр",
                        may: "Май",
                        jun: "Июн",
                        jul: "Июл",
                        aug: "Авг",
                        sep: "Сен",
                        oct: "Окт",
                        nov: "Ноя",
                        dec: "Дек"
                    }
                },
                select: {
                    loading: "Загрузка",
                    noMatch: "Совпадений не найдено",
                    noData: "Нет данных",
                    placeholder: "Выбрать",
                    showOptions: "Показать параметры",
                    hideOptions: "Скрыть параметры"
                },
                cascader: {
                    noMatch: "Совпадений не найдено",
                    loading: "Загрузка",
                    placeholder: "Выбрать"
                },
                pagination: {
                    goto: "Перейти",
                    pagesize: " на странице",
                    total: "Всего {total}",
                    pageClassifier: ""
                },
                messagebox: {
                    title: "Сообщение",
                    confirm: "OK",
                    cancel: "Отмена",
                    error: "Недопустимый ввод данных"
                },
                upload: {
                    deleteTip: "Нажмите [Удалить] для удаления",
                    delete: "Удалить",
                    preview: "Превью",
                    continue: "Продолжить"
                },
                table: {
                    emptyText: "Нет данных",
                    confirmFilter: "Подтвердить",
                    resetFilter: "Сбросить",
                    clearFilter: "Все",
                    sumText: "Сумма"
                },
                table2: {
                    confirm: "подтвердить",
                    ascending: "по возрастанию",
                    descending: "нисходящий",
                    show: "Шоу",
                    order: "порядок",
                    filters: "фильтры",
                    retry: "Retry"
                },
                tree: {
                    emptyText: "Нет данных"
                },
                tag: {
                    delete: "Удалить"
                },
                alert: {
                    close: "закрывать"
                },
                transfer: {
                    noMatch: "Совпадений не найдено",
                    noData: "Нет данных",
                    titles: ["Список 1", "Список 2"],
                    filterPlaceholder: "Введите ключевое слово",
                    noCheckedFormat: "{total} пунктов",
                    hasCheckedFormat: "{checked}/{total} выбрано"
                },
                settings: {
                    edit: "редактор",
                    add: "Добавить",
                    save: "Сохранить",
                    cancel: "Отмена",
                    lock: "Заблокировать",
                    unlock: "Разблокировать",
                    lockFor: 'Заблокировать ВКЛ "{featureName}"',
                    unlockFor: 'Разблокировать для "{featureName}"',
                    turnOn: "Включить",
                    turnOff: "Выключить",
                    turnOnFor: 'Turn ON for "{featureName}"',
                    turnOffFor: 'Turn OFF for "{featureName}"',
                    noset: "Пока не задано.",
                    dependEffect: "От этой настройки зависят следующие настройки, изменение может их затронуть.",
                    dependsNoChange: "Эту настройку нельзя изменить, поскольку",
                    dependsChanged: "Эта настройка была изменена, поскольку",
                    featureIsON: "{featureName} вкл",
                    featureIsOFF: "{featureName} выкл.",
                    featureUpdated: "{featureName} обновлено.",
                    lockBefore: "Прежде чем заблокировать этот параметр, необходимо включить и заблокировать {featureName}",
                    saveBeforeLocking: "Вы должны сохранить изменения перед блокировкой этой настройки",
                    noRemindAgain: "Не напоминать больше об этом",
                    modified: "Изменено",
                    reset: "Сброс",
                    resetFor: 'Reset for "{featureName}"',
                    resetWarning: "The setting will have the same value as the higher level setting.",
                    inheritedLevel: "Using {level} setting",
                    lockedBy: "Locked by {level} level setting",
                    updateBefore: "Чтобы включить эту настройку, вам нужно обновить поле ниже и нажать «Сохранить»",
                    scheduleLockedTips: "Администратор заблокировал эту настройку, и вы не можете ее изменить. Эта настройка будет использоваться во всех ваших конференциях.",
                    required: "Это поле является обязательным.",
                    noChange: "Без изменений.",
                    lockedAtThisGroup: "Locked at this group",
                    lockedAtGroupName: "Locked at the group",
                    lockedAtGroupAdmin: "Locked at the group admin",
                    lockedAtAnotherGroup: "Locked at another group",
                    lockedByAdmin: "Locked by admin",
                    scheduleAccountTips: "Эта настройка вступает в силу немедленно для всех конференций вашей учетной записи. Организаторы не могут изменять эту настройку для своих конференций.",
                    scheduleAccountNotes: "Примечание: Эта настройка также будет использоваться для всех конференций, запланированных в клиенте Zoom, даже если организатор изменил эту настройку. Zoom рекомендует уведомить организаторов конференций о том, что эта настройка заблокирована.",
                    scheduleGroupTips: "Эта настройка вступает в силу немедленно для всех конференций этой группы. Организаторы не могут изменять эту настройку для своих конференций.",
                    scheduleGroupNotes: "Примечание: Эта настройка также будет использоваться для всех конференций, запланированных в клиенте Zoom, даже если организатор изменил эту настройку. Zoom рекомендует уведомить организаторов конференций о том, что эта настройка заблокирована."
                }
            }
        }
    }
    , function(e, t, n) {
        "use strict";
        n.r(t),
        t.default = {
            el: {
                colorpicker: {
                    confirm: "确定",
                    clear: "清空"
                },
                datepicker: {
                    now: "此刻",
                    today: "今天",
                    cancel: "取消",
                    clear: "清空",
                    confirm: "确定",
                    selectDate: "选择日期",
                    selectTime: "选择时间",
                    startDate: "开始日期",
                    startTime: "开始时间",
                    endDate: "结束日期",
                    endTime: "结束时间",
                    prevYear: "前一年",
                    nextYear: "后一年",
                    prevMonth: "上个月",
                    nextMonth: "下个月",
                    year: "年",
                    month1: "1 月",
                    month2: "2 月",
                    month3: "3 月",
                    month4: "4 月",
                    month5: "5 月",
                    month6: "6 月",
                    month7: "7 月",
                    month8: "8 月",
                    month9: "9 月",
                    month10: "10 月",
                    month11: "11 月",
                    month12: "12 月",
                    weeks: {
                        sun: "日",
                        mon: "一",
                        tue: "二",
                        wed: "三",
                        thu: "四",
                        fri: "五",
                        sat: "六"
                    },
                    months: {
                        jan: "一月",
                        feb: "二月",
                        mar: "三月",
                        apr: "四月",
                        may: "五月",
                        jun: "六月",
                        jul: "七月",
                        aug: "八月",
                        sep: "九月",
                        oct: "十月",
                        nov: "十一月",
                        dec: "十二月"
                    }
                },
                select: {
                    loading: "加载中",
                    noMatch: "无匹配数据",
                    noData: "无数据",
                    placeholder: "请选择",
                    showOptions: "显示选项",
                    hideOptions: "隐藏选项"
                },
                cascader: {
                    noMatch: "无匹配数据",
                    loading: "加载中",
                    placeholder: "请选择"
                },
                pagination: {
                    goto: "前往",
                    pagesize: "条/页",
                    total: "共 {total} 条",
                    pageClassifier: "页"
                },
                messagebox: {
                    title: "提示",
                    confirm: "确定",
                    cancel: "取消",
                    error: "输入的数据不合法!"
                },
                upload: {
                    deleteTip: "按 delete 键可删除",
                    delete: "删除",
                    preview: "查看图片",
                    continue: "继续上传"
                },
                table: {
                    emptyText: "暂无数据",
                    confirmFilter: "筛选",
                    resetFilter: "重置",
                    clearFilter: "全部",
                    sumText: "合计"
                },
                table2: {
                    confirm: "确认",
                    ascending: "升序",
                    descending: "降序",
                    show: "展示",
                    order: "排序",
                    filters: "过滤条件",
                    retry: "重试"
                },
                tree: {
                    emptyText: "暂无数据"
                },
                tag: {
                    delete: "删除"
                },
                alert: {
                    close: "关闭"
                },
                transfer: {
                    noMatch: "无匹配数据",
                    noData: "无数据",
                    titles: ["列表 1", "列表 2"],
                    filterPlaceholder: "请输入搜索内容",
                    noCheckedFormat: "共 {total} 项",
                    hasCheckedFormat: "已选 {checked}/{total} 项"
                },
                settings: {
                    edit: "编辑",
                    add: "添加",
                    save: "保存",
                    cancel: "取消",
                    lock: "锁定",
                    unlock: "解锁",
                    lockFor: '锁定 "{featureName}"',
                    unlockFor: '解锁对象 "{featureName}"',
                    turnOn: "打开",
                    turnOff: "关闭",
                    turnOnFor: '打开 "{featureName}"',
                    turnOffFor: '关闭 "{featureName}"',
                    noset: "尚未设定。",
                    dependEffect: "下列设置取决于该设置，变更可能会对它们产生影响。",
                    dependsNoChange: "无法更改该选项，因为",
                    dependsChanged: "该选项已被修改，因为",
                    featureIsON: '"{featureName}" 已开启',
                    featureIsOFF: '"{featureName}" 已关闭',
                    featureUpdated: '"{featureName}" 已更新。',
                    lockBefore: '必须先启用并锁定 "{featureName}"，然后才能锁定此设置',
                    saveBeforeLocking: "在锁定该设置前，您必须保存您的更改",
                    noRemindAgain: "不再提醒",
                    modified: "已修改",
                    reset: "重设",
                    resetFor: 'Reset for "{featureName}"',
                    resetWarning: "The setting will have the same value as the higher level setting.",
                    inheritedLevel: "Using {level} setting",
                    lockedBy: "Locked by {level} level setting",
                    updateBefore: "在启用该设置前，您必须更新以下字段，并单击“保存”",
                    scheduleLockedTips: "管理员已锁定该设置，您无法更改。您所有的会议都将使用该设置。",
                    required: "此字段为必填字段。",
                    noChange: "无变化。",
                    lockedAtThisGroup: "Locked at this group",
                    lockedAtGroupName: "Locked at the group",
                    lockedAtGroupAdmin: "Locked at the group admin",
                    lockedAtAnotherGroup: "Locked at another group",
                    lockedByAdmin: "Locked by admin",
                    scheduleAccountTips: "您账户中所有的会议都将立即使用该设置。主持人无法针对自己的会议更改该设置。",
                    scheduleAccountNotes: "注意：从Zoom客户端安排的所有会议也都将使用该设置，即使主持人已对其进行修改。Zoom建议告知会议主持人该设置目前已被锁定。",
                    scheduleGroupTips: "该群组中所有的会议都将立即使用该设置。主持人无法针对自己的会议更改该设置。",
                    scheduleGroupNotes: "注意：从Zoom客户端安排的所有会议也都将使用该设置，即使主持人已对其进行修改。Zoom建议告知会议主持人该设置目前已被锁定。"
                }
            }
        }
    }
    , function(e, t, n) {
        "use strict";
        n.r(t),
        t.default = {
            el: {
                colorpicker: {
                    confirm: "確認",
                    clear: "清空"
                },
                datepicker: {
                    now: "現在",
                    today: "今天",
                    cancel: "取消",
                    clear: "清空",
                    confirm: "確認",
                    selectDate: "選擇日期",
                    selectTime: "選擇時間",
                    startDate: "開始日期",
                    startTime: "開始時間",
                    endDate: "結束日期",
                    endTime: "結束時間",
                    prevYear: "前一年",
                    nextYear: "後一年",
                    prevMonth: "上個月",
                    nextMonth: "下個月",
                    year: "年",
                    month1: "1 月",
                    month2: "2 月",
                    month3: "3 月",
                    month4: "4 月",
                    month5: "5 月",
                    month6: "6 月",
                    month7: "7 月",
                    month8: "8 月",
                    month9: "9 月",
                    month10: "10 月",
                    month11: "11 月",
                    month12: "12 月",
                    weeks: {
                        sun: "日",
                        mon: "一",
                        tue: "二",
                        wed: "三",
                        thu: "四",
                        fri: "五",
                        sat: "六"
                    },
                    months: {
                        jan: "一月",
                        feb: "二月",
                        mar: "三月",
                        apr: "四月",
                        may: "五月",
                        jun: "六月",
                        jul: "七月",
                        aug: "八月",
                        sep: "九月",
                        oct: "十月",
                        nov: "十一月",
                        dec: "十二月"
                    }
                },
                select: {
                    loading: "加載中",
                    noMatch: "無匹配資料",
                    noData: "無資料",
                    placeholder: "請選擇",
                    showOptions: "顯示選項",
                    hideOptions: "隱藏選項"
                },
                cascader: {
                    noMatch: "無匹配資料",
                    loading: "加載中",
                    placeholder: "請選擇"
                },
                pagination: {
                    goto: "前往",
                    pagesize: "項/頁",
                    total: "共 {total} 項",
                    pageClassifier: "頁"
                },
                messagebox: {
                    title: "提示",
                    confirm: "確定",
                    cancel: "取消",
                    error: "輸入的資料不符規定!"
                },
                upload: {
                    deleteTip: "按 delete 鍵可刪除",
                    delete: "刪除",
                    preview: "查看圖片",
                    continue: "繼續上傳"
                },
                table: {
                    emptyText: "暫無資料",
                    confirmFilter: "篩選",
                    resetFilter: "重置",
                    clearFilter: "全部",
                    sumText: "Sum"
                },
                table2: {
                    confirm: "確認",
                    ascending: "升序",
                    descending: "降序",
                    show: "展示",
                    order: "排序",
                    filters: "過濾條件",
                    retry: "重試"
                },
                tree: {
                    emptyText: "暫無資料"
                },
                tag: {
                    delete: "刪除"
                },
                alert: {
                    close: "關閉"
                },
                transfer: {
                    noMatch: "無匹配資料",
                    noData: "無資料",
                    titles: ["List 1", "List 2"],
                    filterPlaceholder: "Enter keyword",
                    noCheckedFormat: "{total} items",
                    hasCheckedFormat: "{checked}/{total} checked"
                },
                settings: {
                    edit: "編輯",
                    add: "添加",
                    save: "儲存",
                    cancel: "取消",
                    lock: "鎖定",
                    unlock: "解除鎖定",
                    lockFor: '鎖定以下對象 "{featureName}"',
                    unlockFor: '解除鎖定以下對象 "{featureName}"',
                    turnOn: "開啟",
                    turnOff: "關閉",
                    turnOnFor: 'Turn ON for "{featureName}"',
                    turnOffFor: 'Turn OFF for "{featureName}"',
                    noset: "尚未設定。",
                    dependEffect: "以下設定依存於該設定，該變更可能會影響這些設定。",
                    dependsNoChange: "該選項無法變更，原因是",
                    dependsChanged: "該選項已被變更，原因是",
                    featureIsON: "{featureName} 已開啟",
                    featureIsOFF: "{featureName} 已關閉",
                    featureUpdated: "{featureName} 已更新。",
                    lockBefore: "必須先啟用並鎖定 {featureName}，然後您才能鎖定此設定",
                    saveBeforeLocking: "必須先保存變更，然後才能鎖定該設定",
                    noRemindAgain: "不再提醒",
                    modified: "已修改",
                    reset: "重設",
                    resetFor: 'Reset for "{featureName}"',
                    resetWarning: "The setting will have the same value as the higher level setting.",
                    inheritedLevel: "Using {level} setting",
                    lockedBy: "Locked by {level} level setting",
                    updateBefore: "必須先更新下方的欄位並按一下「儲存」，然後才能啟用該設定。",
                    scheduleLockedTips: "管理員已鎖定該設定，您無法變更。您的所有會議都將使用該設定。",
                    required: "該欄位為必填欄位。",
                    noChange: "無變更。",
                    lockedAtThisGroup: "Locked at this group",
                    lockedAtGroupName: "Locked at the group",
                    lockedAtGroupAdmin: "Locked at the group admin",
                    lockedAtAnotherGroup: "Locked at another group",
                    lockedByAdmin: "Locked by admin",
                    scheduleAccountTips: "您的帳戶中的所有會議將立即使用該設定。主持人無法針對自己的會議變更該設定。",
                    scheduleAccountNotes: "備註：即使主持人已修改該設定，從 Zoom 用戶端排程的所有會議仍將沿用該設定。Zoom 建議通知會議主持人該設定現已鎖定。",
                    scheduleGroupTips: "該群組中的所有會議將立即使用該設定。主持人無法針對自己的會議變更該設定。",
                    scheduleGroupNotes: "備註：即使主持人已修改該設定，從 Zoom 用戶端排程的所有會議仍將沿用該設定。Zoom 建議通知會議主持人該設定現已鎖定。"
                }
            }
        }
    }
    , function(e, t, n) {
        "use strict";
        n.r(t),
        t.default = {
            el: {
                colorpicker: {
                    confirm: "확인",
                    clear: "초기화"
                },
                datepicker: {
                    now: "지금",
                    today: "오늘",
                    cancel: "취소",
                    clear: "초기화",
                    confirm: "확인",
                    selectDate: "날짜 선택",
                    selectTime: "시간 선택",
                    startDate: "시작 날짜",
                    startTime: "시작 시간",
                    endDate: "종료 날짜",
                    endTime: "종료 시간",
                    prevYear: "지난해",
                    nextYear: "다음해",
                    prevMonth: "지난달",
                    nextMonth: "다음달",
                    year: "년",
                    month1: "1월",
                    month2: "2월",
                    month3: "3월",
                    month4: "4월",
                    month5: "5월",
                    month6: "6월",
                    month7: "7월",
                    month8: "8월",
                    month9: "9월",
                    month10: "10월",
                    month11: "11월",
                    month12: "12월",
                    weeks: {
                        sun: "일",
                        mon: "월",
                        tue: "화",
                        wed: "수",
                        thu: "목",
                        fri: "금",
                        sat: "토"
                    },
                    months: {
                        jan: "1월",
                        feb: "2월",
                        mar: "3월",
                        apr: "4월",
                        may: "5월",
                        jun: "6월",
                        jul: "7월",
                        aug: "8월",
                        sep: "9월",
                        oct: "10월",
                        nov: "11월",
                        dec: "12월"
                    }
                },
                select: {
                    loading: "불러오는 중",
                    noMatch: "맞는 데이터가 없습니다",
                    noData: "데이터 없음",
                    placeholder: "선택",
                    showOptions: "Show options",
                    hideOptions: "Hide options"
                },
                cascader: {
                    noMatch: "맞는 데이터가 없습니다",
                    loading: "불러오는 중",
                    placeholder: "선택"
                },
                pagination: {
                    goto: "이동",
                    pagesize: "/page",
                    total: "총 {total}",
                    pageClassifier: ""
                },
                messagebox: {
                    title: "메시지",
                    confirm: "확인",
                    cancel: "취소",
                    error: "올바르지 않은 입력"
                },
                upload: {
                    deleteTip: "클릭시 삭제됩니다",
                    delete: "삭제",
                    preview: "미리보기",
                    continue: "계속하기"
                },
                table: {
                    emptyText: "데이터 없음",
                    confirmFilter: "확인",
                    resetFilter: "초기화",
                    clearFilter: "전체",
                    sumText: "합"
                },
                table2: {
                    confirm: "Confirm",
                    ascending: "Ascending",
                    descending: "Descending",
                    show: "Show",
                    order: "Order",
                    filters: "Filters",
                    retry: "Retry"
                },
                tree: {
                    emptyText: "데이터 없음"
                },
                tag: {
                    delete: "삭제"
                },
                alert: {
                    close: "닫기"
                },
                transfer: {
                    noMatch: "맞는 데이터가 없습니다",
                    noData: "데이터 없음",
                    titles: ["리스트 1", "리스트 2"],
                    filterPlaceholder: " 입력하세요",
                    noCheckedFormat: "{total} 항목",
                    hasCheckedFormat: "{checked}/{total} 선택됨"
                },
                settings: {
                    edit: "편집",
                    add: "추가",
                    save: "저장",
                    cancel: "취소",
                    lock: "잠금",
                    unlock: "잠금 해제",
                    lockFor: '다음에 대해 잠금 설정 "{featureName}"',
                    unlockFor: '다음에 대해 잠금 해제 "{featureName}"',
                    turnOn: "켜기",
                    turnOff: "끄기",
                    turnOnFor: 'Turn ON for "{featureName}"',
                    turnOffFor: 'Turn OFF for "{featureName}"',
                    noset: "Not set.",
                    dependEffect: "다음 설정은 이 설정에 따라 달라집니다. 변경 사항이 다음 설정에 영향을 미칠 수 있습니다.",
                    dependsNoChange: "다음 이유로 이 옵션을 변경할 수 없음",
                    dependsChanged: "다음 이유로 이 옵션이 변경됨",
                    featureIsON: "{featureName} 이(가) 켜짐",
                    featureIsOFF: "{featureName} 이(가) 꺼짐",
                    featureUpdated: "{featureName} 이(가) 업데이트되었습니다.",
                    lockBefore: "이 설정을 잠그려면 {featureName}을(를) 사용하도록 설정하고 잠가야 합니다.",
                    saveBeforeLocking: "설정을 잠그기 전에 변경 사항을 저장해야 합니다.",
                    noRemindAgain: "다시 알리지 않음",
                    modified: "수정됨",
                    reset: "재설정",
                    resetFor: 'Reset for "{featureName}"',
                    resetWarning: "The setting will have the same value as the higher level setting.",
                    inheritedLevel: "Using {level} setting",
                    lockedBy: "{level} 설정에 의해 잠김",
                    updateBefore: '이 설정을 사용하려면 아래 필드를 업데이트하고 "저장"을 클릭해야 합니다.',
                    scheduleLockedTips: "관리자가 설정을 잠겼어서 설정을 변경할 수 없습니다. 모든 회의에서 이 설정을 사용합니다.",
                    required: "이 필드는 필수입니다.",
                    noChange: "변경 사항은 없습니다.",
                    lockedAtThisGroup: "Locked at this group",
                    lockedAtGroupName: "Locked at the group",
                    lockedAtGroupAdmin: "Locked at the group admin",
                    lockedAtAnotherGroup: "Locked at another group",
                    lockedByAdmin: "관리자가 잠금",
                    scheduleAccountTips: "계정의 모든 회의에서 이 설정을 바로 사용합니다. 호스트는 자신의 회의에 대한 이 설정을 변경할 수 없습니다.",
                    scheduleAccountNotes: "참고: 호스트가 이 설정을 변경했음에도 불구하고 Zoom 클라이언트에서 예약한 모든 회의에서도 이 설정을 사용합니다. 회의 호스트에게 설정이 이제 잠겼음을 알리는 것이 좋습니다.",
                    scheduleGroupTips: "그룹의 모든 회의에서 이 설정을 바로 사용합니다. 호스트는 자신의 회의에 대한 이 설정을 변경할 수 없습니다.",
                    scheduleGroupNotes: "참고: 호스트가 이 설정을 변경했음에도 불구하고 Zoom 클라이언트에서 예약한 모든 회의에서도 이 설정을 사용합니다. 회의 호스트에게 설정이 이제 잠겼음을 알리는 것이 좋습니다."
                }
            }
        }
    }
    , function(e, t, n) {
        "use strict";
        var i = n(160);
        n.n(i).a
    }
    , function(e, t, n) {
        "use strict";
        var i = n(162);
        n.n(i).a
    }
    , function(e, t, n) {
        "use strict";
        var i = n(164);
        n.n(i).a
    }
    , function(e, t, n) {
        "use strict";
        var i = n(166);
        n.n(i).a
    }
    , function(e, t, n) {
        "use strict";
        var i = n(168);
        n.n(i).a
    }
    , function(e, t, n) {
        "use strict";
        var i = n(170);
        n.n(i).a
    }
    , function(e, t, n) {
        "use strict";
        var i = n(172);
        n.n(i).a
    }
    , function(e, t, n) {
        "use strict";
        var i = n(174);
        n.n(i).a
    }
    , function(e, t, n) {
        "use strict";
        var i = n(176);
        n.n(i).a
    }
    , function(e, t, n) {
        "use strict";
        var i = n(178);
        n.n(i).a
    }
    , function(e, t, n) {
        "use strict";
        var i = n(180);
        n.n(i).a
    }
    , function(e, t, n) {
        e.exports = {
            default: n(86),
            __esModule: !0
        }
    }
    , function(e, t, n) {
        n(87),
        e.exports = n(10).Object.assign
    }
    , function(e, t, n) {
        var i = n(19);
        i(i.S + i.F, "Object", {
            assign: n(90)
        })
    }
    , function(e, t, n) {
        var i = n(89);
        e.exports = function(e, t, n) {
            if (i(e),
            void 0 === t)
                return e;
            switch (n) {
            case 1:
                return function(n) {
                    return e.call(t, n)
                }
                ;
            case 2:
                return function(n, i) {
                    return e.call(t, n, i)
                }
                ;
            case 3:
                return function(n, i, o) {
                    return e.call(t, n, i, o)
                }
            }
            return function() {
                return e.apply(t, arguments)
            }
        }
    }
    , function(e, t) {
        e.exports = function(e) {
            if ("function" != typeof e)
                throw TypeError(e + " is not a function!");
            return e
        }
    }
    , function(e, t, n) {
        "use strict";
        var i = n(3)
          , o = n(15)
          , r = n(26)
          , s = n(18)
          , a = n(27)
          , l = n(36)
          , u = Object.assign;
        e.exports = !u || n(12)((function() {
            var e = {}
              , t = {}
              , n = Symbol()
              , i = "abcdefghijklmnopqrst";
            return e[n] = 7,
            i.split("").forEach((function(e) {
                t[e] = e
            }
            )),
            7 != u({}, e)[n] || Object.keys(u({}, t)).join("") != i
        }
        )) ? function(e, t) {
            for (var n = a(e), u = arguments.length, c = 1, d = r.f, h = s.f; u > c; )
                for (var f, p = l(arguments[c++]), m = d ? o(p).concat(d(p)) : o(p), v = m.length, g = 0; v > g; )
                    f = m[g++],
                    i && !h.call(p, f) || (n[f] = p[f]);
            return n
        }
        : u
    }
    , function(e, t, n) {
        var i = n(8)
          , o = n(92)
          , r = n(93);
        e.exports = function(e) {
            return function(t, n, s) {
                var a, l = i(t), u = o(l.length), c = r(s, u);
                if (e && n != n) {
                    for (; u > c; )
                        if ((a = l[c++]) != a)
                            return !0
                } else
                    for (; u > c; c++)
                        if ((e || c in l) && l[c] === n)
                            return e || c || 0;
                return !e && -1
            }
        }
    }
    , function(e, t, n) {
        var i = n(22)
          , o = Math.min;
        e.exports = function(e) {
            return e > 0 ? o(i(e), 9007199254740991) : 0
        }
    }
    , function(e, t, n) {
        var i = n(22)
          , o = Math.max
          , r = Math.min;
        e.exports = function(e, t) {
            return (e = i(e)) < 0 ? o(e + t, 0) : r(e, t)
        }
    }
    , function(e, t, n) {
        e.exports = {
            default: n(95),
            __esModule: !0
        }
    }
    , function(e, t, n) {
        n(96),
        n(102),
        e.exports = n(30).f("iterator")
    }
    , function(e, t, n) {
        "use strict";
        var i = n(97)(!0);
        n(38)(String, "String", (function(e) {
            this._t = String(e),
            this._i = 0
        }
        ), (function() {
            var e, t = this._t, n = this._i;
            return n >= t.length ? {
                value: void 0,
                done: !0
            } : (e = i(t, n),
            this._i += e.length,
            {
                value: e,
                done: !1
            })
        }
        ))
    }
    , function(e, t, n) {
        var i = n(22)
          , o = n(21);
        e.exports = function(e) {
            return function(t, n) {
                var r, s, a = String(o(t)), l = i(n), u = a.length;
                return l < 0 || l >= u ? e ? "" : void 0 : (r = a.charCodeAt(l)) < 55296 || r > 56319 || l + 1 === u || (s = a.charCodeAt(l + 1)) < 56320 || s > 57343 ? e ? a.charAt(l) : r : e ? a.slice(l, l + 2) : s - 56320 + (r - 55296 << 10) + 65536
            }
        }
    }
    , function(e, t, n) {
        "use strict";
        var i = n(40)
          , o = n(14)
          , r = n(29)
          , s = {};
        n(6)(s, n(9)("iterator"), (function() {
            return this
        }
        )),
        e.exports = function(e, t, n) {
            e.prototype = i(s, {
                next: o(1, n)
            }),
            r(e, t + " Iterator")
        }
    }
    , function(e, t, n) {
        var i = n(7)
          , o = n(13)
          , r = n(15);
        e.exports = n(3) ? Object.defineProperties : function(e, t) {
            o(e);
            for (var n, s = r(t), a = s.length, l = 0; a > l; )
                i.f(e, n = s[l++], t[n]);
            return e
        }
    }
    , function(e, t, n) {
        var i = n(2).document;
        e.exports = i && i.documentElement
    }
    , function(e, t, n) {
        var i = n(4)
          , o = n(27)
          , r = n(23)("IE_PROTO")
          , s = Object.prototype;
        e.exports = Object.getPrototypeOf || function(e) {
            return e = o(e),
            i(e, r) ? e[r] : "function" == typeof e.constructor && e instanceof e.constructor ? e.constructor.prototype : e instanceof Object ? s : null
        }
    }
    , function(e, t, n) {
        n(103);
        for (var i = n(2), o = n(6), r = n(28), s = n(9)("toStringTag"), a = "CSSRuleList,CSSStyleDeclaration,CSSValueList,ClientRectList,DOMRectList,DOMStringList,DOMTokenList,DataTransferItemList,FileList,HTMLAllCollection,HTMLCollection,HTMLFormElement,HTMLSelectElement,MediaList,MimeTypeArray,NamedNodeMap,NodeList,PaintRequestList,Plugin,PluginArray,SVGLengthList,SVGNumberList,SVGPathSegList,SVGPointList,SVGStringList,SVGTransformList,SourceBufferList,StyleSheetList,TextTrackCueList,TextTrackList,TouchList".split(","), l = 0; l < a.length; l++) {
            var u = a[l]
              , c = i[u]
              , d = c && c.prototype;
            d && !d[s] && o(d, s, u),
            r[u] = r.Array
        }
    }
    , function(e, t, n) {
        "use strict";
        var i = n(104)
          , o = n(105)
          , r = n(28)
          , s = n(8);
        e.exports = n(38)(Array, "Array", (function(e, t) {
            this._t = s(e),
            this._i = 0,
            this._k = t
        }
        ), (function() {
            var e = this._t
              , t = this._k
              , n = this._i++;
            return !e || n >= e.length ? (this._t = void 0,
            o(1)) : o(0, "keys" == t ? n : "values" == t ? e[n] : [n, e[n]])
        }
        ), "values"),
        r.Arguments = r.Array,
        i("keys"),
        i("values"),
        i("entries")
    }
    , function(e, t) {
        e.exports = function() {}
    }
    , function(e, t) {
        e.exports = function(e, t) {
            return {
                value: t,
                done: !!e
            }
        }
    }
    , function(e, t, n) {
        e.exports = {
            default: n(107),
            __esModule: !0
        }
    }
    , function(e, t, n) {
        n(108),
        n(114),
        n(115),
        n(116),
        e.exports = n(10).Symbol
    }
    , function(e, t, n) {
        "use strict";
        var i = n(2)
          , o = n(4)
          , r = n(3)
          , s = n(19)
          , a = n(39)
          , l = n(109).KEY
          , u = n(12)
          , c = n(24)
          , d = n(29)
          , h = n(17)
          , f = n(9)
          , p = n(30)
          , m = n(31)
          , v = n(110)
          , g = n(111)
          , b = n(13)
          , y = n(11)
          , w = n(27)
          , x = n(8)
          , k = n(20)
          , C = n(14)
          , _ = n(40)
          , S = n(112)
          , O = n(113)
          , T = n(26)
          , E = n(7)
          , z = n(15)
          , N = O.f
          , F = E.f
          , $ = S.f
          , A = i.Symbol
          , L = i.JSON
          , I = L && L.stringify
          , D = f("_hidden")
          , B = f("toPrimitive")
          , P = {}.propertyIsEnumerable
          , M = c("symbol-registry")
          , j = c("symbols")
          , q = c("op-symbols")
          , Z = Object.prototype
          , R = "function" == typeof A && !!T.f
          , H = i.QObject
          , G = !H || !H.prototype || !H.prototype.findChild
          , V = r && u((function() {
            return 7 != _(F({}, "a", {
                get: function() {
                    return F(this, "a", {
                        value: 7
                    }).a
                }
            })).a
        }
        )) ? function(e, t, n) {
            var i = N(Z, t);
            i && delete Z[t],
            F(e, t, n),
            i && e !== Z && F(Z, t, i)
        }
        : F
          , U = function(e) {
            var t = j[e] = _(A.prototype);
            return t._k = e,
            t
        }
          , W = R && "symbol" == typeof A.iterator ? function(e) {
            return "symbol" == typeof e
        }
        : function(e) {
            return e instanceof A
        }
          , K = function(e, t, n) {
            return e === Z && K(q, t, n),
            b(e),
            t = k(t, !0),
            b(n),
            o(j, t) ? (n.enumerable ? (o(e, D) && e[D][t] && (e[D][t] = !1),
            n = _(n, {
                enumerable: C(0, !1)
            })) : (o(e, D) || F(e, D, C(1, {})),
            e[D][t] = !0),
            V(e, t, n)) : F(e, t, n)
        }
          , J = function(e, t) {
            b(e);
            for (var n, i = v(t = x(t)), o = 0, r = i.length; r > o; )
                K(e, n = i[o++], t[n]);
            return e
        }
          , Y = function(e) {
            var t = P.call(this, e = k(e, !0));
            return !(this === Z && o(j, e) && !o(q, e)) && (!(t || !o(this, e) || !o(j, e) || o(this, D) && this[D][e]) || t)
        }
          , Q = function(e, t) {
            if (e = x(e),
            t = k(t, !0),
            e !== Z || !o(j, t) || o(q, t)) {
                var n = N(e, t);
                return !n || !o(j, t) || o(e, D) && e[D][t] || (n.enumerable = !0),
                n
            }
        }
          , X = function(e) {
            for (var t, n = $(x(e)), i = [], r = 0; n.length > r; )
                o(j, t = n[r++]) || t == D || t == l || i.push(t);
            return i
        }
          , ee = function(e) {
            for (var t, n = e === Z, i = $(n ? q : x(e)), r = [], s = 0; i.length > s; )
                !o(j, t = i[s++]) || n && !o(Z, t) || r.push(j[t]);
            return r
        };
        R || (a((A = function() {
            if (this instanceof A)
                throw TypeError("Symbol is not a constructor!");
            var e = h(arguments.length > 0 ? arguments[0] : void 0)
              , t = function(n) {
                this === Z && t.call(q, n),
                o(this, D) && o(this[D], e) && (this[D][e] = !1),
                V(this, e, C(1, n))
            };
            return r && G && V(Z, e, {
                configurable: !0,
                set: t
            }),
            U(e)
        }
        ).prototype, "toString", (function() {
            return this._k
        }
        )),
        O.f = Q,
        E.f = K,
        n(41).f = S.f = X,
        n(18).f = Y,
        T.f = ee,
        r && !n(16) && a(Z, "propertyIsEnumerable", Y, !0),
        p.f = function(e) {
            return U(f(e))
        }
        ),
        s(s.G + s.W + s.F * !R, {
            Symbol: A
        });
        for (var te = "hasInstance,isConcatSpreadable,iterator,match,replace,search,species,split,toPrimitive,toStringTag,unscopables".split(","), ne = 0; te.length > ne; )
            f(te[ne++]);
        for (var ie = z(f.store), oe = 0; ie.length > oe; )
            m(ie[oe++]);
        s(s.S + s.F * !R, "Symbol", {
            for: function(e) {
                return o(M, e += "") ? M[e] : M[e] = A(e)
            },
            keyFor: function(e) {
                if (!W(e))
                    throw TypeError(e + " is not a symbol!");
                for (var t in M)
                    if (M[t] === e)
                        return t
            },
            useSetter: function() {
                G = !0
            },
            useSimple: function() {
                G = !1
            }
        }),
        s(s.S + s.F * !R, "Object", {
            create: function(e, t) {
                return void 0 === t ? _(e) : J(_(e), t)
            },
            defineProperty: K,
            defineProperties: J,
            getOwnPropertyDescriptor: Q,
            getOwnPropertyNames: X,
            getOwnPropertySymbols: ee
        });
        var re = u((function() {
            T.f(1)
        }
        ));
        s(s.S + s.F * re, "Object", {
            getOwnPropertySymbols: function(e) {
                return T.f(w(e))
            }
        }),
        L && s(s.S + s.F * (!R || u((function() {
            var e = A();
            return "[null]" != I([e]) || "{}" != I({
                a: e
            }) || "{}" != I(Object(e))
        }
        ))), "JSON", {
            stringify: function(e) {
                for (var t, n, i = [e], o = 1; arguments.length > o; )
                    i.push(arguments[o++]);
                if (n = t = i[1],
                (y(t) || void 0 !== e) && !W(e))
                    return g(t) || (t = function(e, t) {
                        if ("function" == typeof n && (t = n.call(this, e, t)),
                        !W(t))
                            return t
                    }
                    ),
                    i[1] = t,
                    I.apply(L, i)
            }
        }),
        A.prototype[B] || n(6)(A.prototype, B, A.prototype.valueOf),
        d(A, "Symbol"),
        d(Math, "Math", !0),
        d(i.JSON, "JSON", !0)
    }
    , function(e, t, n) {
        var i = n(17)("meta")
          , o = n(11)
          , r = n(4)
          , s = n(7).f
          , a = 0
          , l = Object.isExtensible || function() {
            return !0
        }
          , u = !n(12)((function() {
            return l(Object.preventExtensions({}))
        }
        ))
          , c = function(e) {
            s(e, i, {
                value: {
                    i: "O" + ++a,
                    w: {}
                }
            })
        }
          , d = e.exports = {
            KEY: i,
            NEED: !1,
            fastKey: function(e, t) {
                if (!o(e))
                    return "symbol" == typeof e ? e : ("string" == typeof e ? "S" : "P") + e;
                if (!r(e, i)) {
                    if (!l(e))
                        return "F";
                    if (!t)
                        return "E";
                    c(e)
                }
                return e[i].i
            },
            getWeak: function(e, t) {
                if (!r(e, i)) {
                    if (!l(e))
                        return !0;
                    if (!t)
                        return !1;
                    c(e)
                }
                return e[i].w
            },
            onFreeze: function(e) {
                return u && d.NEED && l(e) && !r(e, i) && c(e),
                e
            }
        }
    }
    , function(e, t, n) {
        var i = n(15)
          , o = n(26)
          , r = n(18);
        e.exports = function(e) {
            var t = i(e)
              , n = o.f;
            if (n)
                for (var s, a = n(e), l = r.f, u = 0; a.length > u; )
                    l.call(e, s = a[u++]) && t.push(s);
            return t
        }
    }
    , function(e, t, n) {
        var i = n(37);
        e.exports = Array.isArray || function(e) {
            return "Array" == i(e)
        }
    }
    , function(e, t, n) {
        var i = n(8)
          , o = n(41).f
          , r = {}.toString
          , s = "object" == typeof window && window && Object.getOwnPropertyNames ? Object.getOwnPropertyNames(window) : [];
        e.exports.f = function(e) {
            return s && "[object Window]" == r.call(e) ? function(e) {
                try {
                    return o(e)
                } catch (e) {
                    return s.slice()
                }
            }(e) : o(i(e))
        }
    }
    , function(e, t, n) {
        var i = n(18)
          , o = n(14)
          , r = n(8)
          , s = n(20)
          , a = n(4)
          , l = n(33)
          , u = Object.getOwnPropertyDescriptor;
        t.f = n(3) ? u : function(e, t) {
            if (e = r(e),
            t = s(t, !0),
            l)
                try {
                    return u(e, t)
                } catch (e) {}
            if (a(e, t))
                return o(!i.f.call(e, t), e[t])
        }
    }
    , function(e, t) {}
    , function(e, t, n) {
        n(31)("asyncIterator")
    }
    , function(e, t, n) {
        n(31)("observable")
    }
    , function(e, t, n) {
        "use strict";
        var i = n(182);
        n.n(i).a
    }
    , function(e, t, n) {
        "use strict";
        var i = n(184);
        n.n(i).a
    }
    , function(e, t, n) {
        "use strict";
        var i = n(186);
        n.n(i).a
    }
    , function(e, t, n) {
        "use strict";
        var i = n(188);
        n.n(i).a
    }
    , function(e, t, n) {
        "use strict";
        var i = n(190);
        n.n(i).a
    }
    , function(e, t, n) {
        "use strict";
        var i = n(192);
        n.n(i).a
    }
    , function(e, t, n) {
        "use strict";
        var i = n(194);
        n.n(i).a
    }
    , function(e, t, n) {
        "use strict";
        n.r(t);
        var i = function(e) {
            for (var t = 1, n = arguments.length; t < n; t++) {
                var i = arguments[t] || {};
                for (var o in i)
                    if (i.hasOwnProperty(o)) {
                        var r = i[o];
                        void 0 !== r && (e[o] = r)
                    }
            }
            return e
        }
          , o = ("function" == typeof Symbol && Symbol.iterator,
        "undefined" == typeof window)
          , r = /([\:\-\_]+(.))/g
          , s = /^moz([A-Z])/
          , a = o ? 0 : Number(document.documentMode)
          , l = function(e) {
            return (e || "").replace(/^[\s\uFEFF]+|[\s\uFEFF]+$/g, "")
        }
          , u = function(e) {
            return e.replace(r, (function(e, t, n, i) {
                return i ? n.toUpperCase() : n
            }
            )).replace(s, "Moz$1")
        }
          , c = !o && document.addEventListener ? function(e, t, n) {
            e && t && n && e.addEventListener(t, n, !1)
        }
        : function(e, t, n) {
            e && t && n && e.attachEvent("on" + t, n)
        }
          , d = !o && document.removeEventListener ? function(e, t, n) {
            e && t && e.removeEventListener(t, n, !1)
        }
        : function(e, t, n) {
            e && t && e.detachEvent("on" + t, n)
        }
        ;
        function h(e, t) {
            if (!e || !t)
                return !1;
            if (-1 !== t.indexOf(" "))
                throw new Error("className should not contain space.");
            return e.classList ? e.classList.contains(t) : (" " + e.className + " ").indexOf(" " + t + " ") > -1
        }
        function f(e, t) {
            if (e) {
                for (var n = e.className, i = (t || "").split(" "), o = 0, r = i.length; o < r; o++) {
                    var s = i[o];
                    s && (e.classList ? e.classList.add(s) : h(e, s) || (n += " " + s))
                }
                e.classList || (e.className = n)
            }
        }
        function p(e, t) {
            if (e && t) {
                for (var n = t.split(" "), i = " " + e.className + " ", o = 0, r = n.length; o < r; o++) {
                    var s = n[o];
                    s && (e.classList ? e.classList.remove(s) : h(e, s) && (i = i.replace(" " + s + " ", " ")))
                }
                e.classList || (e.className = l(i))
            }
        }
        var m = a < 9 ? function(e, t) {
            if (!o) {
                if (!e || !t)
                    return null;
                "float" === (t = u(t)) && (t = "styleFloat");
                try {
                    switch (t) {
                    case "opacity":
                        try {
                            return e.filters.item("alpha").opacity / 100
                        } catch (e) {
                            return 1
                        }
                    default:
                        return e.style[t] || e.currentStyle ? e.currentStyle[t] : null
                    }
                } catch (n) {
                    return e.style[t]
                }
            }
        }
        : function(e, t) {
            if (!o) {
                if (!e || !t)
                    return null;
                "float" === (t = u(t)) && (t = "cssFloat");
                try {
                    var n = document.defaultView.getComputedStyle(e, "");
                    return e.style[t] || n ? n[t] : null
                } catch (n) {
                    return e.style[t]
                }
            }
        }
        ;
        var v = !1
          , g = !1
          , b = 2e3
          , y = function() {
            if (!o) {
                var e = x.modalDom;
                return e ? v = !0 : (v = !1,
                e = document.createElement("div"),
                x.modalDom = e,
                e.addEventListener("touchmove", (function(e) {
                    e.preventDefault(),
                    e.stopPropagation()
                }
                )),
                e.addEventListener("click", (function() {
                    x.doOnModalClick && x.doOnModalClick()
                }
                ))),
                e
            }
        }
          , w = {}
          , x = {
            modalFade: !0,
            getInstance: function(e) {
                return w[e]
            },
            register: function(e, t) {
                e && t && (w[e] = t)
            },
            deregister: function(e) {
                e && (w[e] = null,
                delete w[e])
            },
            nextZIndex: function() {
                return x.zIndex++
            },
            modalStack: [],
            doOnModalClick: function() {
                var e = x.modalStack[x.modalStack.length - 1];
                if (e) {
                    var t = x.getInstance(e.id);
                    t && t.closeOnClickModal && t.close()
                }
            },
            openModal: function(e, t, n, i, r) {
                if (!o && e && void 0 !== t) {
                    this.modalFade = r;
                    for (var s = this.modalStack, a = 0, l = s.length; a < l; a++) {
                        if (s[a].id === e)
                            return
                    }
                    var u = y();
                    if (f(u, "v-modal"),
                    this.modalFade && !v && f(u, "v-modal-enter"),
                    i)
                        i.trim().split(/\s+/).forEach((function(e) {
                            return f(u, e)
                        }
                        ));
                    setTimeout((function() {
                        p(u, "v-modal-enter")
                    }
                    ), 200),
                    n && n.parentNode && 11 !== n.parentNode.nodeType ? n.parentNode.appendChild(u) : document.body.appendChild(u),
                    t && (u.style.zIndex = t),
                    u.tabIndex = 0,
                    u.style.display = "",
                    this.modalStack.push({
                        id: e,
                        zIndex: t,
                        modalClass: i
                    })
                }
            },
            closeModal: function(e) {
                var t = this.modalStack
                  , n = y();
                if (t.length > 0) {
                    var i = t[t.length - 1];
                    if (i.id === e) {
                        if (i.modalClass)
                            i.modalClass.trim().split(/\s+/).forEach((function(e) {
                                return p(n, e)
                            }
                            ));
                        t.pop(),
                        t.length > 0 && (n.style.zIndex = t[t.length - 1].zIndex)
                    } else
                        for (var o = t.length - 1; o >= 0; o--)
                            if (t[o].id === e) {
                                t.splice(o, 1);
                                break
                            }
                }
                0 === t.length && (this.modalFade && f(n, "v-modal-leave"),
                setTimeout((function() {
                    0 === t.length && (n.parentNode && n.parentNode.removeChild(n),
                    n.style.display = "none",
                    x.modalDom = void 0),
                    p(n, "v-modal-leave")
                }
                ), 200))
            }
        };
        Object.defineProperty(x, "zIndex", {
            configurable: !0,
            get: function() {
                return g || (b = {}.zIndex || b,
                g = !0),
                b
            },
            set: function(e) {
                b = e
            }
        });
        o || window.addEventListener("keydown", (function(e) {
            if (27 === e.keyCode) {
                var t = function() {
                    if (!o && x.modalStack.length > 0) {
                        var e = x.modalStack[x.modalStack.length - 1];
                        if (!e)
                            return;
                        return x.getInstance(e.id)
                    }
                }();
                t && t.closeOnPressEscape && (t.handleClose ? t.handleClose() : t.handleAction ? t.handleAction("cancel") : t.close())
            }
        }
        ));
        var k = x
          , C = void 0
          , _ = function() {
            if (o)
                return 0;
            if (void 0 !== C)
                return C;
            var e = document.createElement("div");
            e.className = "zm-scrollbar__wrap",
            e.style.visibility = "hidden",
            e.style.width = "100px",
            e.style.position = "absolute",
            e.style.top = "-9999px",
            document.body.appendChild(e);
            var t = e.offsetWidth;
            e.style.overflow = "scroll";
            var n = document.createElement("div");
            n.style.width = "100%",
            e.appendChild(n);
            var i = n.offsetWidth;
            return e.parentNode.removeChild(e),
            C = t - i
        }
          , S = 1
          , O = void 0
          , T = {
            props: {
                visible: {
                    type: Boolean,
                    default: !1
                },
                openDelay: {},
                closeDelay: {},
                zIndex: {},
                modal: {
                    type: Boolean,
                    default: !1
                },
                modalFade: {
                    type: Boolean,
                    default: !0
                },
                modalClass: {},
                modalAppendToBody: {
                    type: Boolean,
                    default: !1
                },
                lockScroll: {
                    type: Boolean,
                    default: !0
                },
                closeOnPressEscape: {
                    type: Boolean,
                    default: !1
                },
                closeOnClickModal: {
                    type: Boolean,
                    default: !1
                }
            },
            beforeMount: function() {
                this._popupId = "popup-" + S++,
                k.register(this._popupId, this)
            },
            beforeDestroy: function() {
                k.deregister(this._popupId),
                k.closeModal(this._popupId),
                this.restoreBodyStyle()
            },
            data: function() {
                return {
                    opened: !1,
                    bodyPaddingRight: null,
                    computedBodyPaddingRight: 0,
                    withoutHiddenClass: !0,
                    rendered: !1
                }
            },
            watch: {
                visible: function(e) {
                    var t = this;
                    if (e) {
                        if (this._opening)
                            return;
                        this.rendered ? this.open() : (this.rendered = !0,
                        this.$nextTick((function() {
                            t.open()
                        }
                        )))
                    } else
                        this.close()
                }
            },
            methods: {
                open: function(e) {
                    var t = this;
                    this.rendered || (this.rendered = !0);
                    var n = i({}, this.$props || this, e);
                    this._closeTimer && (clearTimeout(this._closeTimer),
                    this._closeTimer = null),
                    clearTimeout(this._openTimer);
                    var o = Number(n.openDelay);
                    o > 0 ? this._openTimer = setTimeout((function() {
                        t._openTimer = null,
                        t.doOpen(n)
                    }
                    ), o) : this.doOpen(n)
                },
                doOpen: function(e) {
                    if (!this.$isServer && (!this.willOpen || this.willOpen()) && !this.opened) {
                        this._opening = !0;
                        var t = this.$el
                          , n = e.modal
                          , i = e.zIndex;
                        if (i && (k.zIndex = i),
                        n && (this._closing && (k.closeModal(this._popupId),
                        this._closing = !1),
                        k.openModal(this._popupId, k.nextZIndex(), this.modalAppendToBody ? void 0 : t, e.modalClass, e.modalFade),
                        e.lockScroll)) {
                            this.withoutHiddenClass = !h(document.body, "zm-popup-parent--hidden"),
                            this.withoutHiddenClass && (this.bodyPaddingRight = document.body.style.paddingRight,
                            this.computedBodyPaddingRight = parseInt(m(document.body, "paddingRight"), 10)),
                            O = _();
                            var o = document.documentElement.clientHeight < document.body.scrollHeight
                              , r = m(document.body, "overflowY");
                            O > 0 && (o || "scroll" === r) && this.withoutHiddenClass && (document.body.style.paddingRight = this.computedBodyPaddingRight + O + "px"),
                            f(document.body, "zm-popup-parent--hidden")
                        }
                        "static" === getComputedStyle(t).position && (t.style.position = "absolute"),
                        t.style.zIndex = k.nextZIndex(),
                        this.opened = !0,
                        this.onOpen && this.onOpen(),
                        this.doAfterOpen()
                    }
                },
                doAfterOpen: function() {
                    this._opening = !1
                },
                close: function() {
                    var e = this;
                    if (!this.willClose || this.willClose()) {
                        null !== this._openTimer && (clearTimeout(this._openTimer),
                        this._openTimer = null),
                        clearTimeout(this._closeTimer);
                        var t = Number(this.closeDelay);
                        t > 0 ? this._closeTimer = setTimeout((function() {
                            e._closeTimer = null,
                            e.doClose()
                        }
                        ), t) : this.doClose()
                    }
                },
                doClose: function() {
                    this._closing = !0,
                    this.onClose && this.onClose(),
                    this.lockScroll && setTimeout(this.restoreBodyStyle, 200),
                    this.opened = !1,
                    this.doAfterClose()
                },
                doAfterClose: function() {
                    k.closeModal(this._popupId),
                    this._closing = !1
                },
                restoreBodyStyle: function() {
                    this.modal && this.withoutHiddenClass && (document.body.style.paddingRight = this.bodyPaddingRight,
                    p(document.body, "zm-popup-parent--hidden")),
                    this.withoutHiddenClass = !0
                }
            }
        }
          , E = {
            mounted: function() {},
            methods: {
                getMigratingConfig: function() {
                    return {
                        props: {},
                        events: {}
                    }
                }
            }
        };
        function z(e, t, n) {
            this.$children.forEach((function(i) {
                i.$options.componentName === e ? i.$emit.apply(i, [t].concat(n)) : z.apply(i, [e, t].concat([n]))
            }
            ))
        }
        var N = {
            methods: {
                dispatch: function(e, t, n) {
                    for (var i = this.$parent || this.$root, o = i.$options.componentName; i && (!o || o !== e); )
                        (i = i.$parent) && (o = i.$options.componentName);
                    i && i.$emit.apply(i, [t].concat(n))
                },
                broadcast: function(e, t, n) {
                    z.call(this, e, t, n)
                }
            }
        }
          , F = ("function" == typeof Symbol && Symbol.iterator,
        Object.prototype.hasOwnProperty);
        function $() {}
        function A(e, t) {
            return F.call(e, t)
        }
        function L(e) {
            for (var t = arguments.length, n = Array(t > 1 ? t - 1 : 0), i = 1; i < t; i++)
                n[i - 1] = arguments[i];
            for (var o = 0; o < n.length; o++) {
                var r = n[o];
                for (var s in r)
                    e[s] = r[s]
            }
            return e
        }
        var I = function(e, t) {
            for (var n = (t = t || "").split("."), i = e, o = null, r = 0, s = n.length; r < s; r++) {
                var a = n[r];
                if (!i)
                    break;
                if (r === s - 1) {
                    o = i[a];
                    break
                }
                i = i[a]
            }
            return o
        };
        function D(e, t, n) {
            for (var i = e, o = (t = (t = t.replace(/\[(\w+)\]/g, ".$1")).replace(/^\./, "")).split("."), r = 0, s = o.length; r < s - 1 && (i || n); ++r) {
                var a = o[r];
                if (!(a in i)) {
                    if (n)
                        throw new Error("please transfer a valid prop path to form item!");
                    break
                }
                i = i[a]
            }
            return {
                o: i,
                k: o[r],
                v: i ? i[o[r]] : null
            }
        }
        var B = function() {
            return Math.floor(1e4 * Math.random())
        }
          , P = function(e, t) {
            if (e === t)
                return !0;
            if (!(e instanceof Array))
                return !1;
            if (!(t instanceof Array))
                return !1;
            if (e.length !== t.length)
                return !1;
            for (var n = 0; n !== e.length; ++n)
                if (e[n] !== t[n])
                    return !1;
            return !0
        };
        var M = {};
        M.Utils = M.Utils || {},
        M.Utils.focusFirstDescendant = function(e) {
            for (var t = 0; t < e.childNodes.length; t++) {
                var n = e.childNodes[t];
                if (M.Utils.attemptFocus(n) || M.Utils.focusFirstDescendant(n))
                    return !0
            }
            return !1
        }
        ,
        M.Utils.focusNext = function(e, t) {
            var n = t || document.activeElement
              , i = n.nextSibling;
            if (i)
                return !!M.Utils.attemptFocus(i) || (!!M.Utils.focusFirstDescendant(i) || M.Utils.focusNext(e, i));
            var o = n.parentNode;
            return o !== e && M.Utils.focusNext(e, o)
        }
        ,
        M.Utils.focusPrevious = function(e, t) {
            var n = t || document.activeElement
              , i = n.previousSibling;
            if (i)
                return !!M.Utils.attemptFocus(i) || (!!M.Utils.focusLastDescendant(i) || M.Utils.focusPrevious(e, i));
            var o = n.parentNode;
            return o !== e && M.Utils.focusPrevious(e, o)
        }
        ,
        M.Utils.focusLastDescendant = function(e) {
            for (var t = e.childNodes.length - 1; t >= 0; t--) {
                var n = e.childNodes[t];
                if (M.Utils.attemptFocus(n) || M.Utils.focusLastDescendant(n))
                    return !0
            }
            return !1
        }
        ,
        M.Utils.attemptFocus = function(e) {
            if (!M.Utils.isFocusable(e))
                return !1;
            M.Utils.IgnoreUtilFocusChanges = !0;
            try {
                e.focus()
            } catch (e) {}
            return M.Utils.IgnoreUtilFocusChanges = !1,
            document.activeElement === e
        }
        ,
        M.Utils.isFocusable = function(e) {
            if (e.tabIndex > 0 || 0 === e.tabIndex && null !== e.getAttribute("tabIndex"))
                return !0;
            if (e.disabled)
                return !1;
            switch (e.nodeName) {
            case "A":
                return !!e.href && "ignore" !== e.rel;
            case "INPUT":
                return "hidden" !== e.type && "file" !== e.type;
            case "BUTTON":
            case "SELECT":
            case "TEXTAREA":
                return !0;
            default:
                return !1
            }
        }
        ,
        M.Utils.triggerEvent = function(e, t) {
            var n = void 0;
            n = /^mouse|click/.test(t) ? "MouseEvents" : /^key/.test(t) ? "KeyboardEvent" : "HTMLEvents";
            for (var i = document.createEvent(n), o = arguments.length, r = Array(o > 2 ? o - 2 : 0), s = 2; s < o; s++)
                r[s - 2] = arguments[s];
            return i.initEvent.apply(i, [t].concat(r)),
            e.dispatchEvent ? e.dispatchEvent(i) : e.fireEvent("on" + t, i),
            e
        }
        ,
        M.Utils.keys = {
            tab: 9,
            enter: 13,
            space: 32,
            left: 37,
            up: 38,
            right: 39,
            down: 40,
            esc: 27,
            home: 36,
            end: 35
        };
        var j = M.Utils
          , q = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
            return typeof e
        }
        : function(e) {
            return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
        }
          , Z = {}
          , R = void 0;
        Z.openDialogList = Z.openDialogList || new Array(0),
        Z.getCurrentDialog = function() {
            if (Z.openDialogList && Z.openDialogList.length)
                return Z.openDialogList[Z.openDialogList.length - 1]
        }
        ,
        Z.Dialog = function(e, t, n, i) {
            var o = this;
            this.dialogNode = e,
            this.options = i || {},
            "string" == typeof t ? this.focusAfterClosed = document.getElementById(t) : "object" === (void 0 === t ? "undefined" : q(t)) ? this.focusAfterClosed = t : this.focusAfterClosed = null,
            "string" == typeof n ? this.focusFirst = document.getElementById(n) : "object" === (void 0 === n ? "undefined" : q(n)) ? this.focusFirst = n : this.focusFirst = null,
            this.focusFirst ? setTimeout((function() {
                o.focusFirst.focus()
            }
            ), 0) : !1 !== this.focusFirst && j.focusFirstDescendant(this.dialogNode),
            Z.openDialogList.length > 0 && Z.getCurrentDialog().removeListeners(),
            this.lastFocus = document.activeElement,
            R = function(e) {
                o.trapFocus(e)
            }
            ,
            this.addListeners(),
            Z.openDialogList.push(this),
            this.hasReferenceNode() ? document.body.appendChild(this.hasReferenceNode()) : this.createReferenceNode()
        }
        ,
        Z.Dialog.prototype.addListeners = function() {
            document.addEventListener("focus", R, !0)
        }
        ,
        Z.Dialog.prototype.removeListeners = function() {
            document.removeEventListener("focus", R, !0)
        }
        ,
        Z.Dialog.prototype.closeDialog = function() {
            var e = this;
            Z.openDialogList.pop(),
            this.removeListeners(),
            this.focusAfterClosed && setTimeout((function() {
                e.focusAfterClosed.focus()
            }
            )),
            Z.openDialogList.length ? Z.getCurrentDialog().addListeners() : this.removeReferenceNode()
        }
        ,
        Z.Dialog.prototype.setFocusEl = function() {
            this.focusFirst ? this.focusFirst.focus() : j.focusFirstDescendant(this.dialogNode)
        }
        ,
        Z.Dialog.prototype.trapFocus = function(e) {
            var t = Z.getCurrentDialog().dialogNode;
            j.IgnoreUtilFocusChanges || this.options.ignoreFocusChanges || (t.contains(e.target) ? this.lastFocus = e.target : (j.focusFirstDescendant(t),
            this.lastFocus === document.activeElement && j.focusLastDescendant(t),
            this.lastFocus = document.activeElement))
        }
        ,
        Z.Dialog.prototype.focusNext = function() {
            return j.focusNext(this.dialogNode)
        }
        ,
        Z.Dialog.prototype.focusPrevious = function() {
            return j.focusPrevious(this.dialogNode)
        }
        ,
        Z.Dialog.prototype.focusFirstDescendant = function() {
            return j.focusFirstDescendant(this.dialogNode)
        }
        ,
        Z.Dialog.prototype.focusLastDescendant = function() {
            return j.focusLastDescendant(this.dialogNode)
        }
        ,
        Z.Dialog.prototype.hasReferenceNode = function() {
            return document.getElementById("tempNodeForAriaDialog")
        }
        ,
        Z.Dialog.prototype.createReferenceNode = function() {
            var e = document.createElement("button");
            e.setAttribute("id", "tempNodeForAriaDialog"),
            e.innerHTML = "Placeholder button for aria dialog",
            document.body.appendChild(e)
        }
        ,
        Z.Dialog.prototype.removeReferenceNode = function() {
            var e = document.getElementById("tempNodeForAriaDialog");
            e && document.body.removeChild(e)
        }
        ;
        var H = Z.Dialog
          , G = {
            name: "ZmDialog",
            mixins: [T, N, E],
            props: {
                title: {
                    type: String,
                    default: ""
                },
                modal: {
                    type: Boolean,
                    default: !0
                },
                modalAppendToBody: {
                    type: Boolean,
                    default: !0
                },
                appendToBody: {
                    type: Boolean,
                    default: !1
                },
                lockScroll: {
                    type: Boolean,
                    default: !0
                },
                closeOnClickModal: {
                    type: Boolean,
                    default: !1
                },
                closeOnPressEscape: {
                    type: Boolean,
                    default: !0
                },
                showClose: {
                    type: Boolean,
                    default: !1
                },
                width: String,
                fullscreen: Boolean,
                customClass: {
                    type: String,
                    default: ""
                },
                top: {
                    type: String,
                    default: "15vh"
                },
                beforeClose: Function,
                center: {
                    type: Boolean,
                    default: !1
                },
                ignoreFocusChanges: {
                    type: Boolean,
                    default: !1
                },
                ariaDescribedby: {
                    type: String,
                    default: ""
                },
                ariaLabelledby: {
                    type: String,
                    default: ""
                }
            },
            inheritAttrs: !1,
            data: function() {
                return {
                    closed: !1,
                    dialogId: "dialog-title-" + B() + "-" + B()
                }
            },
            watch: {
                visible: function(e) {
                    var t = this;
                    e ? (this.closed = !1,
                    this.$emit("open"),
                    this.$el.addEventListener("scroll", this.updatePopper),
                    this.$nextTick((function() {
                        t.$refs.dialog.scrollTop = 0
                    }
                    )),
                    this.appendToBody && document.body.appendChild(this.$el)) : (this.$el.removeEventListener("scroll", this.updatePopper),
                    this.closed || this.$emit("close"))
                }
            },
            computed: {
                style: function() {
                    var e = {};
                    return this.fullscreen || (e.marginTop = this.top,
                    this.width && (e.width = this.width)),
                    e
                }
            },
            methods: {
                getFirstFocus: function() {
                    var e = this.$el.querySelector("[focusFirst]");
                    return e || null
                },
                getMigratingConfig: function() {
                    return {
                        props: {
                            size: "size is removed."
                        }
                    }
                },
                handleWrapperClick: function() {
                    this.closeOnClickModal && this.handleClose()
                },
                handleClose: function() {
                    "function" == typeof this.beforeClose ? this.beforeClose(this.hide) : this.hide()
                },
                hide: function(e) {
                    !1 !== e && (this.$emit("update:visible", !1),
                    this.$emit("close"),
                    this.closed = !0)
                },
                updatePopper: function() {
                    this.broadcast("ZmSelectDropdown", "updatePopper"),
                    this.broadcast("ZmDropdownMenu", "updatePopper")
                },
                afterEnter: function() {
                    this.$emit("opened");
                    var e = document.activeElement
                      , t = this.getFirstFocus();
                    this.ariaDialog = new H(this.$refs.dialog,e,t,{
                        ignoreFocusChanges: this.ignoreFocusChanges
                    })
                },
                afterLeave: function() {
                    this.$emit("closed"),
                    this.ariaDialog && this.ariaDialog.closeDialog()
                }
            },
            mounted: function() {
                this.visible && (this.rendered = !0,
                this.open(),
                this.appendToBody && document.body.appendChild(this.$el))
            },
            destroyed: function() {
                this.appendToBody && this.$el && this.$el.parentNode && this.$el.parentNode.removeChild(this.$el),
                this.ariaDialog = null
            }
        };
        n(47);
        function V(e, t, n, i, o, r, s, a) {
            var l, u = "function" == typeof e ? e.options : e;
            if (t && (u.render = t,
            u.staticRenderFns = n,
            u._compiled = !0),
            i && (u.functional = !0),
            r && (u._scopeId = "data-v-" + r),
            s ? (l = function(e) {
                (e = e || this.$vnode && this.$vnode.ssrContext || this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext) || "undefined" == typeof __VUE_SSR_CONTEXT__ || (e = __VUE_SSR_CONTEXT__),
                o && o.call(this, e),
                e && e._registeredComponents && e._registeredComponents.add(s)
            }
            ,
            u._ssrRegister = l) : o && (l = a ? function() {
                o.call(this, this.$root.$options.shadowRoot)
            }
            : o),
            l)
                if (u.functional) {
                    u._injectStyles = l;
                    var c = u.render;
                    u.render = function(e, t) {
                        return l.call(t),
                        c(e, t)
                    }
                } else {
                    var d = u.beforeCreate;
                    u.beforeCreate = d ? [].concat(d, l) : [l]
                }
            return {
                exports: e,
                options: u
            }
        }
        var U = V(G, (function() {
            var e = this
              , t = e.$createElement
              , n = e._self._c || t;
            return n("transition", {
                attrs: {
                    name: "dialog-fade"
                },
                on: {
                    "after-enter": e.afterEnter,
                    "after-leave": e.afterLeave
                }
            }, [n("div", {
                directives: [{
                    name: "show",
                    rawName: "v-show",
                    value: e.visible,
                    expression: "visible"
                }],
                staticClass: "zm-dialog__wrapper",
                on: {
                    click: function(t) {
                        return t.target !== t.currentTarget ? null : e.handleWrapperClick(t)
                    }
                }
            }, [n("div", e._b({
                ref: "dialog",
                staticClass: "zm-dialog",
                class: [{
                    "is-fullscreen": e.fullscreen,
                    "zm-dialog--center": e.center
                }, e.customClass],
                style: e.style,
                attrs: {
                    role: "dialog",
                    "aria-describedby": e.visible ? e.ariaDescribedby : null,
                    "aria-labelledby": e.visible ? e.ariaLabelledby ? e.ariaLabelledby : e.dialogId : null,
                    "aria-modal": "true"
                }
            }, "div", e.$attrs, !1), [n("header", {
                staticClass: "zm-dialog__header"
            }, [e._t("title", [n("span", {
                staticClass: "zm-dialog__title",
                attrs: {
                    id: e.dialogId
                }
            }, [e._v(e._s(e.title))])]), e.showClose ? n("button", {
                staticClass: "zm-dialog__headerbtn",
                attrs: {
                    type: "button",
                    "aria-label": "Close"
                },
                on: {
                    click: e.handleClose
                }
            }, [n("i", {
                staticClass: "zm-dialog__close zm-icon zm-icon-close"
            })]) : e._e()], 2), e.rendered ? n("div", {
                staticClass: "zm-dialog__body"
            }, [e._t("default")], 2) : e._e(), e.$slots.footer ? n("footer", {
                staticClass: "zm-dialog__footer"
            }, [e._t("footer")], 2) : e._e()])])])
        }
        ), [], !1, null, null, null).exports;
        U.install = function(e) {
            e.component(U.name, U)
        }
        ;
        var W = U
          , K = n(1)
          , J = n.n(K)
          , Y = void 0
          , Q = "\n  height:0 !important;\n  visibility:hidden !important;\n  overflow:hidden !important;\n  position:absolute !important;\n  z-index:-1000 !important;\n  top:0 !important;\n  right:0 !important\n"
          , X = ["letter-spacing", "line-height", "padding-top", "padding-bottom", "font-family", "font-weight", "font-size", "text-rendering", "text-transform", "width", "text-indent", "padding-left", "padding-right", "border-width", "box-sizing"];
        function ee(e) {
            var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 1
              , n = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : null;
            Y || (Y = document.createElement("textarea"),
            document.body.appendChild(Y));
            var i = function(e) {
                var t = window.getComputedStyle(e)
                  , n = t.getPropertyValue("box-sizing")
                  , i = parseFloat(t.getPropertyValue("padding-bottom")) + parseFloat(t.getPropertyValue("padding-top"))
                  , o = parseFloat(t.getPropertyValue("border-bottom-width")) + parseFloat(t.getPropertyValue("border-top-width"));
                return {
                    contextStyle: X.map((function(e) {
                        return e + ":" + t.getPropertyValue(e)
                    }
                    )).join(";"),
                    paddingSize: i,
                    borderSize: o,
                    boxSizing: n
                }
            }(e)
              , o = i.paddingSize
              , r = i.borderSize
              , s = i.boxSizing
              , a = i.contextStyle;
            Y.setAttribute("style", a + ";" + Q),
            Y.value = e.value || e.placeholder || "";
            var l = Y.scrollHeight
              , u = {};
            "border-box" === s ? l += r : "content-box" === s && (l -= o),
            Y.value = "";
            var c = Y.scrollHeight - o;
            if (null !== t) {
                var d = c * t;
                "border-box" === s && (d = d + o + r),
                l = Math.max(d, l),
                u.minHeight = d + "px"
            }
            if (null !== n) {
                var h = c * n;
                "border-box" === s && (h = h + o + r),
                l = Math.min(h, l)
            }
            return u.height = l + "px",
            Y.parentNode && Y.parentNode.removeChild(Y),
            Y = null,
            u
        }
        var te = {
            name: "ZmInput",
            componentName: "ZmInput",
            mixins: [N, E],
            inheritAttrs: !1,
            inject: {
                ZmForm: {
                    default: ""
                },
                ZmFormItem: {
                    default: ""
                }
            },
            data: function() {
                return {
                    textareaCalcStyle: {},
                    hovering: !1,
                    focused: !1,
                    isComposing: !1,
                    passwordVisible: !1
                }
            },
            props: {
                value: [String, Number],
                size: String,
                resize: String,
                form: String,
                disabled: Boolean,
                readonly: Boolean,
                type: {
                    type: String,
                    default: "text"
                },
                autosize: {
                    type: [Boolean, Object],
                    default: !1
                },
                autocomplete: {
                    type: String,
                    default: "off"
                },
                autoComplete: {
                    type: String,
                    validator: function(e) {
                        return !0
                    }
                },
                validateEvent: {
                    type: Boolean,
                    default: !0
                },
                suffixIcon: String,
                prefixIcon: String,
                label: String,
                labelBy: String,
                clearable: {
                    type: Boolean,
                    default: !1
                },
                showPassword: {
                    type: Boolean,
                    default: !1
                },
                tabindex: String
            },
            computed: {
                _elFormItemSize: function() {
                    return (this.ZmFormItem || {}).elFormItemSize
                },
                validateState: function() {
                    return this.ZmFormItem ? this.ZmFormItem.validateState : ""
                },
                needStatusIcon: function() {
                    return !!this.ZmForm && this.ZmForm.statusIcon
                },
                validateIcon: function() {
                    return {
                        validating: "zm-icon-loading",
                        success: "zm-icon-success",
                        error: "zm-icon-error"
                    }[this.validateState]
                },
                textareaStyle: function() {
                    return i({}, this.textareaCalcStyle, {
                        resize: this.resize
                    })
                },
                inputSize: function() {
                    return this.size || this._elFormItemSize || (this.$ELEMENT || {}).size
                },
                inputDisabled: function() {
                    return this.disabled || (this.ZmForm || {}).disabled
                },
                nativeInputValue: function() {
                    return null === this.value || void 0 === this.value ? "" : String(this.value)
                },
                showClear: function() {
                    return this.clearable && !this.inputDisabled && !this.readonly && this.nativeInputValue && (this.focused || this.hovering)
                },
                showPwdVisible: function() {
                    return this.showPassword && !this.inputDisabled && !this.readonly && (!!this.nativeInputValue || this.focused)
                }
            },
            watch: {
                value: function(e) {
                    this.$nextTick(this.resizeTextarea),
                    this.validateEvent && this.dispatch("ZmFormItem", "el.form.change", [e])
                },
                nativeInputValue: function() {
                    this.setNativeInputValue()
                },
                type: function() {
                    var e = this;
                    this.$nextTick((function() {
                        e.setNativeInputValue(),
                        e.resizeTextarea(),
                        e.updateIconOffset()
                    }
                    ))
                }
            },
            methods: {
                focus: function() {
                    this.getInput().focus()
                },
                blur: function() {
                    this.getInput().blur()
                },
                getMigratingConfig: function() {
                    return {
                        props: {
                            icon: "icon is removed, use suffix-icon / prefix-icon instead.",
                            "on-icon-click": "on-icon-click is removed."
                        },
                        events: {
                            click: "click is removed."
                        }
                    }
                },
                handleBlur: function(e) {
                    this.focused = !1,
                    this.$emit("blur", e),
                    this.validateEvent && this.dispatch("ZmFormItem", "el.form.blur", [this.value])
                },
                select: function() {
                    this.getInput().select()
                },
                resizeTextarea: function() {
                    if (!this.$isServer) {
                        var e = this.autosize;
                        if ("textarea" === this.type)
                            if (e) {
                                var t = e.minRows
                                  , n = e.maxRows;
                                this.textareaCalcStyle = ee(this.$refs.textarea, t, n)
                            } else
                                this.textareaCalcStyle = {
                                    minHeight: ee(this.$refs.textarea).minHeight
                                }
                    }
                },
                setNativeInputValue: function() {
                    var e = this.getInput();
                    e && e.value !== this.nativeInputValue && (e.value = this.nativeInputValue)
                },
                handleFocus: function(e) {
                    this.focused = !0,
                    this.$emit("focus", e)
                },
                handleCompositionStart: function() {
                    this.isComposing = !0
                },
                handleCompositionEnd: function(e) {
                    this.isComposing = !1,
                    this.handleInput(e)
                },
                handleInput: function(e) {
                    this.isComposing || e.target.value !== this.nativeInputValue && (this.$emit("input", e.target.value),
                    this.$nextTick(this.setNativeInputValue))
                },
                handleChange: function(e) {
                    this.$emit("change", e.target.value)
                },
                calcIconOffset: function(e) {
                    var t = [].slice.call(this.$el.querySelectorAll(".zm-input__" + e) || []);
                    if (t.length) {
                        for (var n = null, i = 0; i < t.length; i++)
                            if (t[i].parentNode === this.$el) {
                                n = t[i];
                                break
                            }
                        if (n) {
                            var o = {
                                suffix: "append",
                                prefix: "prepend"
                            }[e];
                            this.$slots[o] ? n.style.transform = "translateX(" + ("suffix" === e ? "-" : "") + this.$el.querySelector(".zm-input-group__" + o).offsetWidth + "px)" : n.removeAttribute("style")
                        }
                    }
                },
                updateIconOffset: function() {
                    this.calcIconOffset("prefix"),
                    this.calcIconOffset("suffix")
                },
                clear: function() {
                    this.$emit("input", ""),
                    this.$emit("change", ""),
                    this.$emit("clear")
                },
                handlePasswordVisible: function() {
                    this.passwordVisible = !this.passwordVisible,
                    this.focus()
                },
                getInput: function() {
                    return this.$refs.input || this.$refs.textarea
                }
            },
            created: function() {
                this.$on("inputSelect", this.select)
            },
            mounted: function() {
                this.setNativeInputValue(),
                this.resizeTextarea(),
                this.updateIconOffset()
            },
            updated: function() {
                this.$nextTick(this.updateIconOffset)
            }
        }
          , ne = (n(49),
        V(te, (function() {
            var e = this
              , t = e.$createElement
              , n = e._self._c || t;
            return n("div", {
                class: ["textarea" === e.type ? "zm-textarea" : "zm-input", e.inputSize ? "zm-input--" + e.inputSize : "", {
                    "is-disabled": e.inputDisabled,
                    "zm-input-group": e.$slots.prepend || e.$slots.append,
                    "zm-input-group--append": e.$slots.append,
                    "zm-input-group--prepend": e.$slots.prepend,
                    "zm-input--prefix": e.$slots.prefix || e.prefixIcon,
                    "zm-input--suffix": e.$slots.suffix || e.suffixIcon || e.clearable || e.showPassword
                }],
                on: {
                    mouseenter: function(t) {
                        e.hovering = !0
                    },
                    mouseleave: function(t) {
                        e.hovering = !1
                    }
                }
            }, ["textarea" !== e.type ? [e.$slots.prepend ? n("div", {
                staticClass: "zm-input-group__prepend"
            }, [e._t("prepend")], 2) : e._e(), "textarea" !== e.type ? n("input", e._b({
                ref: "input",
                staticClass: "zm-input__inner",
                attrs: {
                    tabindex: e.tabindex,
                    type: e.showPassword ? e.passwordVisible ? "text" : "password" : e.type,
                    disabled: e.inputDisabled,
                    readonly: e.readonly,
                    autocomplete: e.autoComplete || e.autocomplete,
                    "aria-label": e.label,
                    "aria-labelledby": e.labelBy
                },
                on: {
                    compositionstart: e.handleCompositionStart,
                    compositionend: e.handleCompositionEnd,
                    input: e.handleInput,
                    focus: e.handleFocus,
                    blur: e.handleBlur,
                    change: e.handleChange
                }
            }, "input", e.$attrs, !1)) : e._e(), e.$slots.prefix || e.prefixIcon ? n("span", {
                staticClass: "zm-input__prefix"
            }, [e._t("prefix"), e.prefixIcon ? n("i", {
                staticClass: "zm-input__icon",
                class: e.prefixIcon
            }) : e._e()], 2) : e._e(), e.$slots.suffix || e.suffixIcon || e.showClear || e.showPassword || e.validateState && e.needStatusIcon ? n("span", {
                staticClass: "zm-input__suffix"
            }, [n("span", {
                staticClass: "zm-input__suffix-inner"
            }, [e.showClear && e.showPwdVisible ? e._e() : [e._t("suffix"), e.suffixIcon ? n("i", {
                staticClass: "zm-input__icon",
                class: e.suffixIcon
            }) : e._e()], e.showClear ? n("i", {
                staticClass: "zm-input__icon zm-icon-close zm-input__clear",
                on: {
                    click: e.clear
                }
            }) : e._e(), e.showPwdVisible ? n("i", {
                staticClass: "zm-input__icon zm-icon-view zm-input__clear",
                on: {
                    click: e.handlePasswordVisible
                }
            }) : e._e()], 2), e.validateState ? n("i", {
                staticClass: "zm-input__icon",
                class: ["zm-input__validateIcon", e.validateIcon]
            }) : e._e()]) : e._e(), e.$slots.append ? n("div", {
                staticClass: "zm-input-group__append"
            }, [e._t("append")], 2) : e._e()] : n("textarea", e._b({
                ref: "textarea",
                staticClass: "zm-textarea__inner",
                style: e.textareaStyle,
                attrs: {
                    tabindex: e.tabindex,
                    disabled: e.inputDisabled,
                    readonly: e.readonly,
                    autocomplete: e.autoComplete || e.autocomplete,
                    "aria-label": e.label,
                    "aria-labelledby": e.labelBy
                },
                on: {
                    compositionstart: e.handleCompositionStart,
                    compositionend: e.handleCompositionEnd,
                    input: e.handleInput,
                    focus: e.handleFocus,
                    blur: e.handleBlur,
                    change: e.handleChange
                }
            }, "textarea", e.$attrs, !1))], 2)
        }
        ), [], !1, null, null, null).exports);
        ne.install = function(e) {
            e.component(ne.name, ne)
        }
        ;
        var ie = ne
          , oe = !o && navigator.userAgent.toLowerCase()
          , re = (oe && /windows/.test(oe),
        oe && /ipad/.test(oe))
          , se = oe && !re && /(iphone|ipod)/.test(oe)
          , ae = oe && !re && !se && /macintosh/.test(oe)
          , le = []
          , ue = "@@clickoutsideContext"
          , ce = void 0
          , de = 0;
        function he(e, t, n) {
            return function() {
                var i = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}
                  , o = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
                !(n && n.context && i.target && o.target) || e.contains(i.target) || e.contains(o.target) || e === i.target || n.context.popperElm && (n.context.popperElm.contains(i.target) || n.context.popperElm.contains(o.target)) || (t.expression && e[ue].methodName && n.context[e[ue].methodName] ? n.context[e[ue].methodName]() : e[ue].bindingFn && e[ue].bindingFn())
            }
        }
        !o && c(document, "mousedown", (function(e) {
            return ce = e
        }
        )),
        !o && c(document, "mouseup", (function(e) {
            1 !== e.which || ae && e.ctrlKey || le.forEach((function(t) {
                return t[ue].documentHandler(e, ce)
            }
            ))
        }
        ));
        var fe = {
            bind: function(e, t, n) {
                le.push(e);
                var i = de++;
                e[ue] = {
                    id: i,
                    documentHandler: he(e, t, n),
                    methodName: t.expression,
                    bindingFn: t.value
                }
            },
            update: function(e, t, n) {
                e[ue].documentHandler = he(e, t, n),
                e[ue].methodName = t.expression,
                e[ue].bindingFn = t.value
            },
            unbind: function(e) {
                for (var t = le.length, n = 0; n < t; n++)
                    if (le[n][ue].id === e[ue].id) {
                        le.splice(n, 1);
                        break
                    }
                delete e[ue]
            }
        }
          , pe = n(42)
          , me = function(e) {
            return e.stopPropagation()
        }
          , ve = {
            props: {
                transformOrigin: {
                    type: [Boolean, String],
                    default: !0
                },
                placement: {
                    type: String,
                    default: "bottom"
                },
                boundariesPadding: {
                    type: Number,
                    default: 5
                },
                reference: {},
                popper: {},
                offset: {
                    default: 0
                },
                value: Boolean,
                visibleArrow: Boolean,
                arrowOffset: {
                    type: Number,
                    default: 35
                },
                appendToBody: {
                    type: Boolean,
                    default: !0
                },
                popperOptions: {
                    type: Object,
                    default: function() {
                        return {
                            gpuAcceleration: !1
                        }
                    }
                },
                modifiers: Object
            },
            data: function() {
                return {
                    showPopper: !1,
                    currentPlacement: ""
                }
            },
            watch: {
                value: {
                    immediate: !0,
                    handler: function(e) {
                        this.showPopper = e,
                        this.$emit("input", e)
                    }
                },
                showPopper: function(e) {
                    this.disabled || (e ? this.updatePopper() : this.destroyPopper(),
                    this.$emit("input", e))
                }
            },
            methods: {
                createPopper: function() {
                    var e = this;
                    if (!this.$isServer && (this.currentPlacement = this.currentPlacement || this.placement,
                    /^(top|bottom|left|right)(-start|-end)?$/g.test(this.currentPlacement))) {
                        var t = this.popperElm = this.popperElm || this.popper || this.$refs.popper
                          , n = this.referenceElm = this.referenceElm || this.reference || this.$refs.reference;
                        if (!n && this.$slots.reference && this.$slots.reference[0] && (n = this.referenceElm = this.$slots.reference[0].elm),
                        t && n) {
                            this.visibleArrow && this.appendArrow(t),
                            this.appendToBody && document.body.appendChild(this.popperElm),
                            this.popperJS && this.popperJS.destroy && this.popperJS.destroy();
                            var i = {};
                            i.modifiers = this.createModifiers(this.popperOptions),
                            i.modifiers.offset = {
                                offset: this.offset
                            },
                            i.placement = this.currentPlacement,
                            i.positionFixed = void 0 === this.popperOptions.positionFixed ? void 0 !== this.popperOptions.forceAbsolute && !this.popperOptions.forceAbsolute : this.popperOptions.positionFixed,
                            i.onCreate = function() {
                                e.$emit("created", e),
                                e.resetTransformOrigin(),
                                e.$nextTick(e.updatePopper)
                            }
                            ,
                            this.popperJS = new pe.a(n,t,i),
                            this.popperJS.popper.style.zIndex = k.nextZIndex(),
                            this.popperElm.addEventListener("click", me)
                        }
                    }
                },
                createModifiers: function(e) {
                    var t = this.modifiers || {}
                      , n = {
                        gpuAcceleration: "computeStyle",
                        boundariesElement: "preventOverflow"
                    };
                    return Object.keys(n).forEach((function(i) {
                        var o;
                        void 0 !== e[i] && void 0 === t[n[i]] && (t[n[i]] = ((o = {})[i] = e[i],
                        o))
                    }
                    )),
                    t
                },
                updatePopper: function() {
                    var e = this.popperJS;
                    e ? (e.enableEventListeners(),
                    e.update(),
                    e.popper && (e.popper.style.zIndex = k.nextZIndex())) : this.createPopper()
                },
                updatePopperReference: function(e) {
                    this.popperJS && (this.popperJS.reference = e)
                },
                updatePopperBoundaries: function(e) {
                    this.popperJS && (this.popperJS.options.modifiers.preventOverflow.boundariesElement = e,
                    this.popperJS.modifiers.some((function(t) {
                        if ("preventOverflow" === t.name)
                            return t.boundariesElement = e,
                            !0
                    }
                    )))
                },
                doDestroy: function(e) {
                    !this.popperJS || this.showPopper && !e || (this.popperJS.destroy(),
                    this.popperJS = null)
                },
                destroyPopper: function() {
                    this.popperJS && (this.popperJS.disableEventListeners(),
                    this.resetTransformOrigin())
                },
                resetTransformOrigin: function() {
                    if (this.transformOrigin) {
                        var e = this.popperJS.popper.getAttribute("x-placement").split("-")[0]
                          , t = {
                            top: "bottom",
                            bottom: "top",
                            left: "right",
                            right: "left"
                        }[e];
                        this.popperJS.popper.style.transformOrigin = "string" == typeof this.transformOrigin ? this.transformOrigin : ["top", "bottom"].indexOf(e) > -1 ? "center " + t : t + " center"
                    }
                },
                appendArrow: function(e) {
                    var t = void 0;
                    if (!this.appended) {
                        for (var n in this.appended = !0,
                        e.attributes)
                            if (/^_v-/.test(e.attributes[n].name)) {
                                t = e.attributes[n].name;
                                break
                            }
                        var i = document.createElement("div");
                        t && i.setAttribute(t, ""),
                        i.setAttribute("x-arrow", ""),
                        i.className = "popper__arrow",
                        e.appendChild(i)
                    }
                }
            },
            beforeDestroy: function() {
                this.doDestroy(!0),
                this.popperElm && this.popperElm.parentNode === document.body && (this.popperElm.removeEventListener("click", me),
                document.body.removeChild(this.popperElm))
            },
            deactivated: function() {
                this.$options.beforeDestroy[0].call(this)
            }
        }
          , ge = n(43)
          , be = "undefined" == typeof window
          , ye = function(e) {
            var t = e
              , n = Array.isArray(t)
              , i = 0;
            for (t = n ? t : t[Symbol.iterator](); ; ) {
                var o;
                if (n) {
                    if (i >= t.length)
                        break;
                    o = t[i++]
                } else {
                    if ((i = t.next()).done)
                        break;
                    o = i.value
                }
                var r = o.target.__resizeListeners__ || [];
                r.length && r.forEach((function(e) {
                    e()
                }
                ))
            }
        }
          , we = function(e, t) {
            be || (e.__resizeListeners__ || (e.__resizeListeners__ = [],
            e.__ro__ = new ge.a(ye),
            e.__ro__.observe(e)),
            e.__resizeListeners__.push(t))
        }
          , xe = function(e, t) {
            e && e.__resizeListeners__ && (e.__resizeListeners__.splice(e.__resizeListeners__.indexOf(t), 1),
            e.__resizeListeners__.length || e.__ro__.disconnect())
        }
          , ke = {
            vertical: {
                offset: "offsetHeight",
                scroll: "scrollTop",
                scrollSize: "scrollHeight",
                size: "height",
                key: "vertical",
                axis: "Y",
                client: "clientY",
                direction: "top"
            },
            horizontal: {
                offset: "offsetWidth",
                scroll: "scrollLeft",
                scrollSize: "scrollWidth",
                size: "width",
                key: "horizontal",
                axis: "X",
                client: "clientX",
                direction: "left"
            }
        };
        function Ce(e) {
            var t = e.move
              , n = e.size
              , i = e.bar
              , o = {}
              , r = "translate" + i.axis + "(" + t + "%)";
            return o[i.size] = n,
            o.transform = r,
            o.msTransform = r,
            o.webkitTransform = r,
            o
        }
        var _e = {
            name: "Bar",
            props: {
                vertical: Boolean,
                size: String,
                move: Number
            },
            computed: {
                bar: function() {
                    return ke[this.vertical ? "vertical" : "horizontal"]
                },
                wrap: function() {
                    return this.scrollbar.wrap
                }
            },
            inject: ["scrollbar"],
            render: function(e) {
                var t = this.size
                  , n = this.move
                  , i = this.bar;
                return e("div", {
                    class: ["zm-scrollbar__bar", "is-" + i.key],
                    on: {
                        mousedown: this.clickTrackHandler
                    }
                }, [e("div", {
                    ref: "thumb",
                    class: "zm-scrollbar__thumb",
                    on: {
                        mousedown: this.clickThumbHandler
                    },
                    style: Ce({
                        size: t,
                        move: n,
                        bar: i
                    })
                })])
            },
            methods: {
                clickThumbHandler: function(e) {
                    this.startDrag(e),
                    this[this.bar.axis] = e.currentTarget[this.bar.offset] - (e[this.bar.client] - e.currentTarget.getBoundingClientRect()[this.bar.direction])
                },
                clickTrackHandler: function(e) {
                    var t = 100 * (Math.abs(e.target.getBoundingClientRect()[this.bar.direction] - e[this.bar.client]) - this.$refs.thumb[this.bar.offset] / 2) / this.$el[this.bar.offset];
                    this.wrap[this.bar.scroll] = t * this.wrap[this.bar.scrollSize] / 100
                },
                startDrag: function(e) {
                    e.stopImmediatePropagation(),
                    this.cursorDown = !0,
                    c(document, "mousemove", this.mouseMoveDocumentHandler),
                    c(document, "mouseup", this.mouseUpDocumentHandler),
                    document.onselectstart = function() {
                        return !1
                    }
                },
                mouseMoveDocumentHandler: function(e) {
                    if (!1 !== this.cursorDown) {
                        var t = this[this.bar.axis];
                        if (t) {
                            var n = 100 * (-1 * (this.$el.getBoundingClientRect()[this.bar.direction] - e[this.bar.client]) - (this.$refs.thumb[this.bar.offset] - t)) / this.$el[this.bar.offset];
                            this.wrap[this.bar.scroll] = n * this.wrap[this.bar.scrollSize] / 100
                        }
                    }
                },
                mouseUpDocumentHandler: function(e) {
                    this.cursorDown = !1,
                    this[this.bar.axis] = 0,
                    d(document, "mousemove", this.mouseMoveDocumentHandler),
                    document.onselectstart = null
                },
                scrollToEnd: function() {
                    this.wrap[this.bar.scroll] = this.wrap[this.bar.scrollSize]
                },
                scrollToBegin: function() {
                    this.wrap[this.bar.scroll] = 0
                }
            },
            destroyed: function() {
                d(document, "mouseup", this.mouseUpDocumentHandler)
            }
        }
          , Se = {
            name: "ZmSticky",
            props: {
                checkPosition: {
                    type: String,
                    default: "bottom"
                },
                enabled: {
                    type: Boolean,
                    default: !1
                },
                offset: {
                    type: Number,
                    default: 0
                },
                bottomOffset: {
                    type: Number,
                    default: 0
                },
                stickyHeight: {
                    type: Number,
                    default: 0
                },
                zIndex: {
                    type: Number,
                    default: 0
                },
                maxTop: {
                    type: Number,
                    default: 0
                },
                flow: {
                    type: Boolean,
                    default: !1
                },
                appendCls: String
            },
            data: function() {
                return {
                    disabled: !this.enabled,
                    isSticky: !1
                }
            },
            mounted: function() {
                this.makeCloneNode(),
                window.addEventListener("scroll", this.onScroll, {
                    passive: !1
                }),
                window.addEventListener("resize", this.onResize, {
                    passive: !1
                }),
                this.triggerScroll()
            },
            methods: {
                makeCloneNode: function() {
                    this.cloneNode = this.$slots.default[0].elm.cloneNode(!0),
                    this.cloneNode.style.display = "",
                    this.cloneNode.style.visibility = "hidden",
                    this.cloneNode.style.position = "absolute",
                    this.cloneNode.style.top = 0,
                    this.$refs.normal.appendChild(this.cloneNode)
                },
                updateCloneNode: function() {
                    this.cloneNode && (this.$refs.normal.removeChild(this.cloneNode),
                    this.makeCloneNode(),
                    this.triggerScroll(!0))
                },
                makeSticky: function(e, t, n, i) {
                    this.isSticky = !0,
                    t.appendChild(e),
                    "top" === n ? t.style.top = this.offset + "px" : t.style.bottom = this.offset + "px",
                    t.style.left = i.left + "px",
                    t.style.width = i.width + "px",
                    this.stickyHeight && (t.style.height = this.stickyHeight + "px"),
                    this.zIndex && (t.style.zIndex = "" + this.zIndex),
                    document.body.appendChild(t)
                },
                makeNormal: function(e, t, n) {
                    this.isSticky && (this.isSticky = !1,
                    e && e.insertBefore(t, this.cloneNode),
                    n && document.body.removeChild(n))
                },
                onResize: function() {
                    this.onScroll(null, !0)
                },
                onScroll: function(e, t) {
                    if (!this.disabled) {
                        var n = this.$refs.normal
                          , i = this.$refs.sticky
                          , o = this.$slots.default[0].elm
                          , r = window.innerHeight
                          , s = o.clientHeight;
                        !this.flow && n && (n.style.height = s + "px");
                        var a = this.cloneNode.getBoundingClientRect()
                          , l = this.checkPosition
                          , u = this.offset
                          , c = this.maxTop
                          , d = this.isSticky
                          , h = this.bottomOffset;
                        if ("bottom" === l)
                            a.top <= r - u - a.height ? this.makeNormal(n, o, i) : !i || d && !t || this.makeSticky(o, i, l, a);
                        else if ("top" === l) {
                            var f = document.documentElement.scrollTop
                              , p = document.documentElement.scrollHeight - f - s - u;
                            a.top > u || c && a.top - u < -c || p <= h ? this.makeNormal(n, o, i) : !i || d && !t || this.makeSticky(o, i, l, a)
                        }
                    }
                },
                disable: function() {
                    this.disabled = !0
                },
                enable: function() {
                    this.disabled = !1,
                    this.triggerScroll()
                },
                triggerScroll: function(e) {
                    var t = this;
                    this.$nextTick((function() {
                        t.onScroll(null, e)
                    }
                    ))
                }
            },
            beforeDestroy: function() {
                window.removeEventListener("scroll", this.onScroll),
                window.removeEventListener("resize", this.onResize);
                var e = this.$refs.sticky
                  , t = e.parentNode && e.parentNode.tagName.toLowerCase();
                e && document.contains(e) && "body" === t && document.body.removeChild(e)
            },
            watch: {
                isSticky: function(e) {
                    this.$emit("sticky-change", e)
                },
                offset: function() {
                    this.triggerScroll(!0)
                }
            }
        }
          , Oe = (n(50),
        V(Se, (function() {
            var e = this.$createElement
              , t = this._self._c || e;
            return t("div", {
                ref: "normal",
                staticClass: "zm-sticky"
            }, [this._t("default"), t("div", {
                ref: "sticky",
                staticClass: "zm-sticky-fixed",
                class: this.appendCls
            })], 2)
        }
        ), [], !1, null, null, null).exports);
        Oe.install = function(e) {
            e.component(Oe.name, Oe)
        }
        ;
        var Te = {
            name: "ZmScrollbar",
            components: {
                ZmSticky: Oe,
                Bar: _e
            },
            props: {
                native: Boolean,
                wrapStyle: {},
                wrapClass: {},
                viewClass: {},
                viewStyle: {},
                noresize: Boolean,
                tag: {
                    type: String,
                    default: "div"
                },
                sticky: {
                    type: Boolean,
                    default: !1
                }
            },
            data: function() {
                return {
                    sizeWidth: "0",
                    sizeHeight: "0",
                    moveX: 0,
                    moveY: 0,
                    isFocus: !1
                }
            },
            computed: {
                wrap: function() {
                    return this.$refs.wrap
                },
                enabled: function() {
                    return this.sticky && "" !== this.sizeWidth && "0" !== this.sizeWidth
                },
                appendCls: function() {
                    return this.isFocus ? "zm-scrollbar zm-scrollbar__focus" : ""
                }
            },
            provide: function() {
                return {
                    scrollbar: this
                }
            },
            render: function(e) {
                var t = _()
                  , n = this.wrapStyle;
                if (t) {
                    var i = "-" + t + "px"
                      , o = "margin-bottom: " + i + "; margin-right: " + i + ";";
                    Array.isArray(this.wrapStyle) ? (n = function(e) {
                        for (var t = {}, n = 0; n < e.length; n++)
                            e[n] && L(t, e[n]);
                        return t
                    }(this.wrapStyle)).marginRight = n.marginBottom = i : "string" == typeof this.wrapStyle ? n += o : n = o
                }
                var r = e(this.tag, {
                    class: ["zm-scrollbar__view", this.viewClass],
                    style: this.viewStyle,
                    ref: "resize"
                }, this.$slots.default)
                  , s = e("div", {
                    ref: "wrap",
                    style: n,
                    on: {
                        scroll: this.handleScroll
                    },
                    class: [this.wrapClass, "zm-scrollbar__wrap", t ? "" : "zm-scrollbar__wrap--hidden-default"]
                }, [[r]])
                  , a = void 0;
                return a = this.native ? [e("div", {
                    ref: "wrap",
                    class: [this.wrapClass, "zm-scrollbar__wrap"],
                    style: n
                }, [[r]])] : this.sticky ? [s, e("zm-sticky", {
                    ref: "sticky",
                    attrs: {
                        enabled: this.enabled,
                        appendCls: this.appendCls,
                        stickyHeight: 8,
                        flow: !0
                    }
                }, [e(_e, {
                    ref: "barX",
                    attrs: {
                        move: this.moveX,
                        size: this.sizeWidth
                    },
                    nativeOn: {
                        mouseenter: this.focus
                    }
                })]), e(_e, {
                    ref: "barY",
                    attrs: {
                        vertical: !0,
                        move: this.moveY,
                        size: this.sizeHeight
                    }
                })] : [s, e(_e, {
                    ref: "barX",
                    attrs: {
                        move: this.moveX,
                        size: this.sizeWidth
                    }
                }), e(_e, {
                    ref: "barY",
                    attrs: {
                        vertical: !0,
                        move: this.moveY,
                        size: this.sizeHeight
                    }
                })],
                e("div", {
                    class: ["zm-scrollbar", {
                        "zm-scrollbar__focus": this.isFocus
                    }],
                    on: {
                        mouseenter: this.focus,
                        mouseleave: this.blur
                    }
                }, a)
            },
            methods: {
                handleScroll: function() {
                    var e = this.wrap;
                    this.$emit("scroll", e),
                    this.moveY = 100 * e.scrollTop / e.clientHeight,
                    this.moveX = 100 * e.scrollLeft / e.clientWidth
                },
                update: function() {
                    var e, t, n = this.wrap;
                    n && (e = this.hack100(100 * n.clientHeight / n.scrollHeight),
                    t = this.hack100(100 * n.clientWidth / n.scrollWidth),
                    this.sizeHeight = e < 100 ? e + "%" : "",
                    this.sizeWidth = t < 100 ? t + "%" : "")
                },
                updateSticky: function() {
                    this.sticky && this.$refs.sticky.triggerScroll(!0)
                },
                hack100: function(e) {
                    return e >= 99.5 && (e = 100),
                    e
                },
                scrollXToEndX: function() {
                    this.$refs.barX.scrollToEnd()
                },
                scrollToEndY: function() {
                    this.$refs.barY.scrollToEnd()
                },
                scrollToBeginX: function() {
                    this.$refs.barX.scrollToBegin()
                },
                scrollToBeginY: function() {
                    this.$refs.barY.scrollToBegin()
                },
                focus: function() {
                    this.isFocus = !0
                },
                blur: function() {
                    this.isFocus = !1
                }
            },
            mounted: function() {
                this.native || (this.$nextTick(this.update),
                !this.noresize && we(this.$refs.resize, this.update))
            },
            beforeDestroy: function() {
                this.native || !this.noresize && xe(this.$refs.resize, this.update)
            },
            activated: function() {
                this.wrap.scrollTop = this.moveY * this.wrap.clientHeight / 100,
                this.wrap.scrollLeft = this.moveX * this.wrap.clientWidth / 100
            },
            watch: {
                enabled: function(e) {
                    this.sticky && (e ? this.$refs.sticky.enable() : this.$refs.sticky.disable())
                },
                isFocus: function(e) {
                    e && this.updateSticky()
                }
            }
        }
          , Ee = (n(51),
        V(Te, void 0, void 0, !1, null, null, null).exports);
        Ee.install = function(e) {
            e.component(Ee.name, Ee)
        }
        ;
        var ze = Ee
          , Ne = {
            components: {
                ZmScrollbar: ze
            },
            mixins: [ve, N],
            componentName: "ZmAutocompleteSuggestions",
            data: function() {
                return {
                    parent: this.$parent,
                    dropdownWidth: ""
                }
            },
            props: {
                visibleArrow: !1,
                options: {
                    default: function() {
                        return {
                            gpuAcceleration: !1
                        }
                    }
                },
                id: String,
                listLabel: String,
                listLabelBy: String
            },
            methods: {
                select: function(e) {
                    this.dispatch("ZmAutocomplete", "item-click", e)
                }
            },
            updated: function() {
                var e = this;
                this.$nextTick((function(t) {
                    e.popperJS && e.updatePopper()
                }
                ))
            },
            mounted: function() {
                this.$parent.popperElm = this.popperElm = this.$el,
                this.referenceElm = this.$parent.$refs.input.$refs.input,
                this.referenceList = this.$el.querySelector(".zm-autocomplete-suggestion__list"),
                this.referenceList.setAttribute("role", "listbox"),
                this.referenceList.setAttribute("id", this.id)
            },
            created: function() {
                var e = this;
                this.$on("visible", (function(t, n) {
                    e.dropdownWidth = n + "px",
                    e.showPopper = t
                }
                ))
            }
        }
          , Fe = (n(52),
        V(Ne, (function() {
            var e = this
              , t = e.$createElement
              , n = e._self._c || t;
            return n("transition", {
                attrs: {
                    name: "zm-zoom-in-top"
                },
                on: {
                    "after-leave": e.doDestroy
                }
            }, [n("div", {
                directives: [{
                    name: "show",
                    rawName: "v-show",
                    value: e.showPopper,
                    expression: "showPopper"
                }],
                staticClass: "zm-autocomplete-suggestion zm-popper",
                class: {
                    "is-loading": !e.parent.hideLoading && e.parent.loading
                },
                style: {
                    width: e.dropdownWidth
                },
                attrs: {
                    role: "region"
                }
            }, [n("zm-scrollbar", {
                ref: "scrollbar",
                attrs: {
                    "wrap-class": "zm-autocomplete-suggestion__wrap"
                }
            }, [n("ul", {
                staticClass: "zm-autocomplete-suggestion__list",
                attrs: {
                    role: "listbox",
                    tabindex: "-1",
                    "aria-label": e.listLabel,
                    "aria-labelledby": e.listLabelBy,
                    id: e.id + "-autocomplete-list"
                }
            }, [!e.parent.hideLoading && e.parent.loading ? n("li", [n("i", {
                staticClass: "zm-icon-loading"
            })]) : e._t("default")], 2)])], 1)])
        }
        ), [], !1, null, null, null).exports)
          , $e = function(e) {
            return {
                methods: {
                    focus: function() {
                        this.$refs[e].focus()
                    }
                }
            }
        }
          , Ae = {
            name: "ZmAutocomplete",
            mixins: [N, $e("input"), E],
            inheritAttrs: !1,
            componentName: "ZmAutocomplete",
            components: {
                ZmInput: ie,
                ZmAutocompleteSuggestions: Fe
            },
            directives: {
                Clickoutside: fe
            },
            props: {
                valueKey: {
                    type: String,
                    default: "value"
                },
                popperClass: String,
                popperOptions: Object,
                placeholder: String,
                clearable: {
                    type: Boolean,
                    default: !1
                },
                disabled: Boolean,
                name: String,
                size: String,
                value: [String, Number],
                maxlength: Number,
                minlength: Number,
                autofocus: Boolean,
                fetchSuggestions: Function,
                triggerOnFocus: {
                    type: Boolean,
                    default: !0
                },
                customItem: String,
                selectWhenUnmatched: {
                    type: Boolean,
                    default: !1
                },
                prefixIcon: String,
                suffixIcon: String,
                label: String,
                labelBy: String,
                listLabel: String,
                listLabelBy: String,
                debounce: {
                    type: Number,
                    default: 300
                },
                placement: {
                    type: String,
                    default: "bottom-start"
                },
                hideLoading: Boolean,
                popperAppendToBody: {
                    type: Boolean,
                    default: !0
                }
            },
            data: function() {
                return {
                    activated: !1,
                    suggestions: [],
                    loading: !1,
                    highlightedIndex: -1,
                    suggestionDisabled: !1
                }
            },
            computed: {
                suggestionVisible: function() {
                    var e = this.suggestions;
                    return (Array.isArray(e) && e.length > 0 || this.loading) && this.activated
                },
                id: function() {
                    return "zm-autocomplete-" + B()
                }
            },
            watch: {
                suggestionVisible: function(e) {
                    this.broadcast("ZmAutocompleteSuggestions", "visible", [e, this.$refs.input.$refs.input.offsetWidth])
                }
            },
            methods: {
                getMigratingConfig: function() {
                    return {
                        props: {
                            "custom-item": "custom-item is removed, use scoped slot instead.",
                            props: "props is removed, use value-key instead."
                        }
                    }
                },
                getData: function(e) {
                    var t = this;
                    this.suggestionDisabled || (this.loading = !0,
                    this.fetchSuggestions(e, (function(e) {
                        t.loading = !1,
                        t.suggestionDisabled || (Array.isArray(e) ? t.suggestions = e : console.error("[Element Error][Autocomplete]autocomplete suggestions must be an array"))
                    }
                    )))
                },
                handleChange: function(e) {
                    if (this.$emit("input", e),
                    this.suggestionDisabled = !1,
                    !this.triggerOnFocus && !e)
                        return this.suggestionDisabled = !0,
                        void (this.suggestions = []);
                    this.debouncedGetData(e)
                },
                handleFocus: function(e) {
                    this.activated = !0,
                    this.$emit("focus", e),
                    this.triggerOnFocus && this.debouncedGetData(this.value)
                },
                handleBlur: function(e) {
                    this.$emit("blur", e)
                },
                handleClear: function() {
                    this.activated = !1,
                    this.$emit("clear")
                },
                close: function(e) {
                    this.activated = !1
                },
                handleKeyEnter: function(e) {
                    var t = this;
                    this.suggestionVisible && this.highlightedIndex >= 0 && this.highlightedIndex < this.suggestions.length ? (e.preventDefault(),
                    this.select(this.suggestions[this.highlightedIndex])) : this.selectWhenUnmatched && (this.$emit("select", {
                        value: this.value
                    }),
                    this.$nextTick((function(e) {
                        t.suggestions = [],
                        t.highlightedIndex = -1
                    }
                    )))
                },
                select: function(e) {
                    var t = this;
                    this.$emit("input", e[this.valueKey]),
                    this.$emit("select", e),
                    this.$nextTick((function(e) {
                        t.suggestions = [],
                        t.highlightedIndex = -1
                    }
                    ))
                },
                highlight: function(e) {
                    if (this.suggestionVisible && !this.loading)
                        if (e < 0)
                            this.highlightedIndex = -1;
                        else {
                            e >= this.suggestions.length && (e = this.suggestions.length - 1);
                            var t = this.$refs.suggestions.$el.querySelector(".zm-autocomplete-suggestion__wrap")
                              , n = t.querySelectorAll(".zm-autocomplete-suggestion__list li")[e]
                              , i = t.scrollTop
                              , o = n.offsetTop;
                            o + n.scrollHeight > i + t.clientHeight && (t.scrollTop += n.scrollHeight),
                            o < i && (t.scrollTop -= n.scrollHeight),
                            this.highlightedIndex = e,
                            this.$el.querySelector(".zm-input__inner").setAttribute("aria-activedescendant", this.id + "-item-" + this.highlightedIndex)
                        }
                }
            },
            mounted: function() {
                var e = this;
                this.debouncedGetData = J()(this.debounce, this.getData),
                this.$on("item-click", (function(t) {
                    e.select(t)
                }
                ));
                var t = this.$el.querySelector(".zm-input__inner");
                t.setAttribute("role", "textbox"),
                t.setAttribute("aria-autocomplete", "list"),
                t.setAttribute("aria-controls", "id"),
                t.setAttribute("aria-activedescendant", this.id + "-item-" + this.highlightedIndex)
            },
            beforeDestroy: function() {
                this.$refs.suggestions.$destroy()
            }
        }
          , Le = (n(53),
        V(Ae, (function() {
            var e = this
              , t = e.$createElement
              , n = e._self._c || t;
            return n("div", {
                directives: [{
                    name: "clickoutside",
                    rawName: "v-clickoutside",
                    value: e.close,
                    expression: "close"
                }],
                staticClass: "zm-autocomplete",
                attrs: {
                    "aria-haspopup": "listbox",
                    role: "combobox",
                    "aria-expanded": e.suggestionVisible,
                    "aria-owns": e.id
                }
            }, [n("zm-input", e._b({
                ref: "input",
                attrs: {
                    label: e.label,
                    "label-by": e.labelBy
                },
                on: {
                    input: e.handleChange,
                    focus: e.handleFocus,
                    blur: e.handleBlur,
                    clear: e.handleClear
                },
                nativeOn: {
                    keydown: [function(t) {
                        if (!("button"in t) && e._k(t.keyCode, "up", 38, t.key, ["Up", "ArrowUp"]))
                            return null;
                        t.preventDefault(),
                        e.highlight(e.highlightedIndex - 1)
                    }
                    , function(t) {
                        if (!("button"in t) && e._k(t.keyCode, "down", 40, t.key, ["Down", "ArrowDown"]))
                            return null;
                        t.preventDefault(),
                        e.highlight(e.highlightedIndex + 1)
                    }
                    , function(t) {
                        return "button"in t || !e._k(t.keyCode, "enter", 13, t.key, "Enter") ? e.handleKeyEnter(t) : null
                    }
                    , function(t) {
                        return "button"in t || !e._k(t.keyCode, "tab", 9, t.key, "Tab") ? e.close(t) : null
                    }
                    ]
                }
            }, "zm-input", [e.$props, e.$attrs], !1), [e.$slots.prepend ? n("template", {
                slot: "prepend"
            }, [e._t("prepend")], 2) : e._e(), e.$slots.append ? n("template", {
                slot: "append"
            }, [e._t("append")], 2) : e._e(), e.$slots.prefix ? n("template", {
                slot: "prefix"
            }, [e._t("prefix")], 2) : e._e(), e.$slots.suffix ? n("template", {
                slot: "suffix"
            }, [e._t("suffix")], 2) : e._e()], 2), n("zm-autocomplete-suggestions", {
                ref: "suggestions",
                class: [e.popperClass ? e.popperClass : ""],
                attrs: {
                    "visible-arrow": "",
                    "popper-options": e.popperOptions,
                    "append-to-body": e.popperAppendToBody,
                    placement: e.placement,
                    "list-label": e.listLabel,
                    "list-label-by": e.listLabelBy,
                    id: e.id
                }
            }, e._l(e.suggestions, (function(t, i) {
                return n("li", {
                    key: e.id + "-item-" + i,
                    class: {
                        highlighted: e.highlightedIndex === i
                    },
                    attrs: {
                        id: e.id + "-item-" + i,
                        role: "option",
                        "aria-selected": e.highlightedIndex === i
                    },
                    on: {
                        click: function(n) {
                            e.select(t)
                        }
                    }
                }, [e._t("default", [e._v("\n        " + e._s(t[e.valueKey]) + "\n      ")], {
                    item: t
                })], 2)
            }
            )), 0)], 1)
        }
        ), [], !1, null, null, null).exports);
        Le.install = function(e) {
            e.component(Le.name, Le)
        }
        ;
        var Ie = Le
          , De = {
            name: "ZmButton",
            inject: {
                ZmForm: {
                    default: ""
                },
                ZmFormItem: {
                    default: ""
                }
            },
            props: {
                type: {
                    type: String,
                    default: "default"
                },
                size: String,
                icon: {
                    type: String,
                    default: ""
                },
                nativeType: {
                    type: String,
                    default: "button"
                },
                loading: Boolean,
                disabled: Boolean,
                plain: Boolean,
                autofocus: Boolean,
                round: Boolean,
                circle: Boolean
            },
            computed: {
                _elFormItemSize: function() {
                    return (this.ZmFormItem || {}).elFormItemSize
                },
                buttonSize: function() {
                    return this.size || this._elFormItemSize || (this.$ELEMENT || {}).size
                },
                buttonDisabled: function() {
                    return this.disabled || (this.ZmForm || {}).disabled
                }
            },
            methods: {
                handleClick: function(e) {
                    this.$emit("click", e)
                }
            }
        }
          , Be = (n(54),
        V(De, (function() {
            var e = this
              , t = e.$createElement
              , n = e._self._c || t;
            return n("button", {
                staticClass: "zm-button",
                class: [e.type ? "zm-button--" + e.type : "", e.buttonSize ? "zm-button--" + e.buttonSize : "", {
                    "is-disabled": e.buttonDisabled,
                    "is-loading": e.loading,
                    "is-plain": e.plain,
                    "is-round": e.round,
                    "is-circle": e.circle
                }],
                attrs: {
                    disabled: e.buttonDisabled || e.loading,
                    autofocus: e.autofocus,
                    type: e.nativeType
                },
                on: {
                    click: e.handleClick
                }
            }, [e.loading ? n("i", {
                staticClass: "zm-icon-loading"
            }) : e._e(), e.icon && !e.loading ? n("i", {
                class: e.icon
            }) : e._e(), e.$slots.default ? n("span", {
                staticClass: "zm-button__slot"
            }, [e._t("default")], 2) : e._e()])
        }
        ), [], !1, null, null, null).exports);
        Be.install = function(e) {
            e.component(Be.name, Be)
        }
        ;
        var Pe = Be
          , Me = V({
            name: "ZmButtonGroup"
        }, (function() {
            var e = this.$createElement;
            return (this._self._c || e)("div", {
                staticClass: "zm-button-group"
            }, [this._t("default")], 2)
        }
        ), [], !1, null, null, null).exports;
        Me.install = function(e) {
            e.component(Me.name, Me)
        }
        ;
        var je = Me
          , qe = {
            name: "ZmDropdown",
            componentName: "ZmDropdown",
            mixins: [N, {
                data: function() {
                    return {
                        hoverOption: null,
                        activedescendant: null
                    }
                },
                computed: {
                    optionsAllDisabled: function() {
                        return this.options.every((function(e) {
                            return e.disabled
                        }
                        ))
                    }
                },
                watch: {
                    hoverIndex: function(e) {
                        var t = this;
                        "number" == typeof e && e > -1 && (this.hoverOption = this.options[e] || {}),
                        this.options.forEach((function(n) {
                            n.hover = -1 !== e && t.hoverOption === n
                        }
                        ))
                    }
                },
                methods: {
                    navigateOptions: function(e) {
                        var t = this;
                        0 === this.options.length || this.optionsAllDisabled || ("next" === e ? (this.hoverIndex++,
                        this.hoverIndex === this.options.length && (this.hoverIndex = 0)) : "prev" === e ? (this.hoverIndex--,
                        this.hoverIndex < 0 && (this.hoverIndex = this.options.length - 1)) : "home" === e ? this.hoverIndex = 0 : "end" === e && (this.hoverIndex = this.options.length - 1),
                        this.options[this.hoverIndex].disabled && this.navigateOptions(e),
                        this.$nextTick((function() {
                            t.activedescendant = t.hoverOption.itemId
                        }
                        )))
                    }
                }
            }, E],
            directives: {
                Clickoutside: fe
            },
            components: {
                ZmButton: Pe,
                ZmButtonGroup: je
            },
            provide: function() {
                return {
                    dropdown: this
                }
            },
            props: {
                trigger: {
                    type: String,
                    default: "hover"
                },
                type: String,
                size: {
                    type: String,
                    default: ""
                },
                splitButton: Boolean,
                hideOnClick: {
                    type: Boolean,
                    default: !0
                },
                placement: {
                    type: String,
                    default: "bottom-end"
                },
                visibleArrow: {
                    default: !0
                },
                showTimeout: {
                    type: Number,
                    default: 250
                },
                hideTimeout: {
                    type: Number,
                    default: 150
                }
            },
            data: function() {
                return {
                    options: [],
                    hoverIndex: -1,
                    timeout: null,
                    visible: !1,
                    triggerElm: null,
                    menuItems: null,
                    menuItemsArray: null,
                    dropdownElm: null,
                    focusing: !1,
                    listId: "dropdown-menu-" + B()
                }
            },
            computed: {
                dropdownSize: function() {
                    return this.size || (this.$ELEMENT || {}).size
                }
            },
            mounted: function() {
                this.$on("menu-item-click", this.handleMenuItemClick)
            },
            watch: {
                visible: function(e) {
                    this.broadcast("ZmDropdownMenu", "visible", e),
                    this.$emit("visible-change", e)
                },
                focusing: function(e) {
                    var t = this.$el.querySelector(".zm-dropdown-selfdefine");
                    t && (e ? t.className += " focusing" : t.className = t.className.replace("focusing", ""))
                },
                activedescendant: function(e) {
                    this.triggerElm && e ? this.triggerElm.setAttribute("aria-activedescendant", e) : this.triggerElm.removeAttribute("aria-activedescendant")
                }
            },
            methods: {
                getMigratingConfig: function() {
                    return {
                        props: {
                            "menu-align": "menu-align is renamed to placement."
                        }
                    }
                },
                show: function() {
                    var e = this;
                    this.triggerElm.disabled || (clearTimeout(this.timeout),
                    this.timeout = setTimeout((function() {
                        e.visible = !0,
                        e.triggerElm.setAttribute("aria-expanded", e.visible)
                    }
                    ), "click" === this.trigger ? 0 : this.showTimeout))
                },
                hide: function() {
                    var e = this;
                    this.triggerElm.disabled || (clearTimeout(this.timeout),
                    this.timeout = setTimeout((function() {
                        e.visible = !1,
                        e.triggerElm.setAttribute("aria-expanded", e.visible),
                        e.hoverIndex = -1,
                        e.activedescendant = null
                    }
                    ), "click" === this.trigger ? 0 : this.hideTimeout))
                },
                handleClick: function() {
                    this.triggerElm.disabled || (this.visible ? this.hide() : this.show())
                },
                handleTriggerKeyDown: function(e) {
                    var t = e.keyCode
                      , n = j.keys;
                    switch (t) {
                    case n.space:
                        this.handleClick(),
                        e.preventDefault();
                        break;
                    case n.enter:
                        this.visible ? this.hoverOption && this.handleMenuItemClick(this.hoverOption.command, this.hoverOption) : this.show(),
                        e.preventDefault();
                        break;
                    case n.down:
                        this.visible && (this.navigateOptions("next"),
                        e.stopPropagation()),
                        e.preventDefault();
                        break;
                    case n.up:
                        this.visible && (this.navigateOptions("prev"),
                        e.stopPropagation()),
                        e.preventDefault();
                        break;
                    case n.home:
                        this.visible && this.navigateOptions("home"),
                        e.preventDefault();
                        break;
                    case n.end:
                        this.visible && this.navigateOptions("end"),
                        e.preventDefault();
                        break;
                    case n.esc:
                        this.visible && this.hide(),
                        e.preventDefault();
                        break;
                    case n.tab:
                        this.visible && this.hide();
                        break;
                    case n.left:
                        this.visible && (this.hide(),
                        e.stopPropagation());
                        break;
                    case n.right:
                        -1 === this.hoverIndex && this.navigateOptions("next"),
                        this.visible && e.stopPropagation()
                    }
                },
                initAria: function() {
                    this.dropdownElm.setAttribute("id", this.listId),
                    this.triggerElm.setAttribute("aria-haspopup", "true"),
                    this.triggerElm.setAttribute("aria-controls", this.listId),
                    this.triggerElm.setAttribute("aria-expanded", this.visible),
                    this.menuItems = this.dropdownElm.querySelectorAll(".zm-dropdown-menu__item:not(.is-disabled)"),
                    this.menuItemsArray = Array.prototype.slice.call(this.menuItems),
                    this.splitButton || (this.triggerElm.setAttribute("tabindex", "0"),
                    this.triggerElm.setAttribute("class", (this.triggerElm.getAttribute("class") || "") + " zm-dropdown-selfdefine"))
                },
                initEvent: function() {
                    var e = this.trigger
                      , t = this.show
                      , n = this.hide
                      , i = this.handleClick
                      , o = this.splitButton
                      , r = this.handleTriggerKeyDown
                      , s = this.onTriggerElmFocus
                      , a = this.onTriggerElmBlur
                      , l = this.onTriggerElmClick;
                    this.triggerElm = o ? this.$refs.trigger.$el : this.$slots.default[0].elm;
                    var u = this.dropdownElm;
                    this.triggerElm.addEventListener("keydown", r),
                    o || (this.triggerElm.addEventListener("focus", s),
                    this.triggerElm.addEventListener("blur", a),
                    this.triggerElm.addEventListener("click", l)),
                    "hover" === e ? (this.triggerElm.addEventListener("mouseenter", t),
                    this.triggerElm.addEventListener("mouseleave", n),
                    u.addEventListener("mouseenter", t),
                    u.addEventListener("mouseleave", n)) : "click" === e && this.triggerElm.addEventListener("click", i)
                },
                removeEvent: function() {
                    var e = this.trigger
                      , t = this.show
                      , n = this.hide
                      , i = this.handleClick
                      , o = this.splitButton
                      , r = this.handleTriggerKeyDown
                      , s = this.onTriggerElmFocus
                      , a = this.onTriggerElmBlur
                      , l = this.onTriggerElmClick;
                    this.triggerElm = o ? this.$refs.trigger.$el : this.$slots.default[0].elm;
                    var u = this.dropdownElm;
                    this.triggerElm.removeEventListener("keydown", r),
                    o || (this.triggerElm.removeEventListener("focus", s),
                    this.triggerElm.removeEventListener("blur", a),
                    this.triggerElm.removeEventListener("click", l)),
                    "hover" === e ? (this.triggerElm.removeEventListener("mouseenter", t),
                    this.triggerElm.removeEventListener("mouseleave", n),
                    u.removeEventListener("mouseenter", t),
                    u.removeEventListener("mouseleave", n)) : "click" === e && this.triggerElm.removeEventListener("click", i)
                },
                handleMenuItemClick: function(e, t) {
                    this.hideOnClick && (this.visible = !1),
                    this.$emit("command", e, t)
                },
                focus: function() {
                    this.triggerElm.focus && this.triggerElm.focus()
                },
                initDomOperation: function() {
                    this.dropdownElm = this.popperElm,
                    this.menuItems = this.dropdownElm.querySelectorAll(".zm-dropdown-menu__item:not(.is-disabled)"),
                    this.menuItemsArray = [].slice.call(this.menuItems),
                    this.initEvent(),
                    this.initAria()
                },
                onTriggerElmFocus: function() {
                    this.focusing = !0
                },
                onTriggerElmBlur: function() {
                    this.focusing = !1
                },
                onTriggerElmClick: function(e) {
                    e.stopPropagation(),
                    this.focusing = !1
                }
            },
            beforeDestroy: function() {
                this.removeEvent()
            },
            render: function(e) {
                var t = this
                  , n = this.hide
                  , i = this.splitButton
                  , o = this.type
                  , r = this.dropdownSize
                  , s = i ? e("zm-button-group", [e("zm-button", {
                    attrs: {
                        type: o,
                        size: r
                    },
                    nativeOn: {
                        click: function(e) {
                            e.stopPropagation(),
                            t.$emit("click", e),
                            n()
                        }
                    }
                }, [this.$slots.default]), e("zm-button", {
                    ref: "trigger",
                    attrs: {
                        type: o,
                        size: r
                    },
                    class: "zm-dropdown__caret-button"
                }, [e("i", {
                    class: "zm-dropdown__icon zm-icon-down"
                })])]) : this.$slots.default;
                return e("div", {
                    class: "zm-dropdown",
                    directives: [{
                        name: "clickoutside",
                        value: n
                    }]
                }, [s, this.$slots.dropdown])
            }
        }
          , Ze = (n(55),
        V(qe, void 0, void 0, !1, null, null, null).exports)
          , Re = 0
          , He = {
            name: "ZmDropdownItem",
            mixins: [N],
            props: {
                command: {},
                disabled: Boolean,
                divided: Boolean,
                icon: String,
                ariaLabel: String
            },
            data: function() {
                return {
                    hover: !1
                }
            },
            computed: {
                listId: function() {
                    return this.dropdown.listId
                },
                itemId: function() {
                    return "dropdown_item_" + this.listId + "-" + Re++
                }
            },
            inject: ["dropdown"],
            created: function() {
                this.dropdown.options.push(this)
            },
            methods: {
                handleClick: function(e) {
                    this.dispatch("ZmDropdown", "menu-item-click", [this.command, this])
                }
            }
        }
          , Ge = (n(56),
        V(He, (function() {
            var e = this
              , t = e.$createElement
              , n = e._self._c || t;
            return n("li", {
                ref: "item",
                staticClass: "zm-dropdown-menu__item",
                class: {
                    "is-disabled": e.disabled,
                    "zm-dropdown-menu__item--divided": e.divided,
                    "is-hover": e.hover
                },
                attrs: {
                    "aria-disabled": e.disabled,
                    id: e.itemId,
                    role: "menuitem",
                    "arial-label": e.ariaLabel
                },
                on: {
                    click: e.handleClick
                }
            }, [e.icon ? n("i", {
                class: e.icon
            }) : e._e(), e._t("default")], 2)
        }
        ), [], !1, null, null, null).exports)
          , Ve = {
            name: "ZmDropdownMenu",
            componentName: "ZmDropdownMenu",
            mixins: [ve],
            props: {
                visibleArrow: {
                    type: Boolean,
                    default: !1
                },
                arrowOffset: {
                    type: Number,
                    default: 0
                }
            },
            data: function() {
                return {
                    size: this.dropdown.dropdownSize
                }
            },
            inject: ["dropdown"],
            created: function() {
                var e = this;
                this.$on("updatePopper", (function() {
                    e.showPopper && e.updatePopper()
                }
                )),
                this.$on("visible", (function(t) {
                    e.showPopper = t
                }
                ))
            },
            mounted: function() {
                this.dropdown.popperElm = this.popperElm = this.$el,
                this.referenceElm = this.dropdown.$el,
                this.dropdown.initDomOperation()
            },
            methods: {
                handleLeave: function() {
                    this.doDestroy()
                }
            },
            beforeDestroy: function() {
                this.handleLeave()
            },
            watch: {
                "dropdown.placement": {
                    immediate: !0,
                    handler: function(e) {
                        this.currentPlacement = e
                    }
                }
            }
        }
          , Ue = (n(57),
        V(Ve, (function() {
            var e = this.$createElement
              , t = this._self._c || e;
            return t("transition", {
                attrs: {
                    name: "zm-zoom-in-top"
                },
                on: {
                    "after-leave": this.handleLeave
                }
            }, [t("ul", {
                directives: [{
                    name: "show",
                    rawName: "v-show",
                    value: this.showPopper,
                    expression: "showPopper"
                }],
                staticClass: "zm-dropdown-menu zm-popper",
                class: [this.size && "zm-dropdown-menu--" + this.size],
                attrs: {
                    role: "menu"
                }
            }, [this._t("default")], 2)])
        }
        ), [], !1, null, null, null).exports);
        Ze.install = function(e) {
            e.component(Ze.name, Ze),
            e.component(Ge.name, Ge),
            e.component(Ue.name, Ue)
        }
        ;
        var We = Ze
          , Ke = {
            bind: function(e, t, n) {
                var i = null
                  , o = void 0
                  , r = function() {
                    return n.context[t.expression].apply()
                }
                  , s = function() {
                    new Date - o < 100 && r(),
                    clearInterval(i),
                    i = null
                };
                c(e, "mousedown", (function(e) {
                    0 === e.button && (o = new Date,
                    function(e, t, n) {
                        c(e, t, (function i() {
                            n && n.apply(this, arguments),
                            d(e, t, i)
                        }
                        ))
                    }(document, "mouseup", s),
                    clearInterval(i),
                    i = setInterval(r, 100))
                }
                ))
            }
        }
          , Je = {
            name: "ZmInputNumber",
            mixins: [$e("input")],
            inject: {
                ZmForm: {
                    default: ""
                },
                ZmFormItem: {
                    default: ""
                }
            },
            directives: {
                repeatClick: Ke
            },
            components: {
                ZmInput: ie
            },
            props: {
                step: {
                    type: Number,
                    default: 1
                },
                max: {
                    type: Number,
                    default: 1 / 0
                },
                min: {
                    type: Number,
                    default: -1 / 0
                },
                value: {},
                disabled: Boolean,
                size: String,
                controls: {
                    type: Boolean,
                    default: !0
                },
                controlsPosition: {
                    type: String,
                    default: "right"
                },
                name: String,
                label: String,
                placeholder: String,
                precision: {
                    type: Number,
                    validator: function(e) {
                        return e >= 0 && e === parseInt(e, 10)
                    }
                }
            },
            data: function() {
                return {
                    currentValue: 0,
                    userInput: null
                }
            },
            watch: {
                value: {
                    immediate: !0,
                    handler: function(e) {
                        var t = void 0 === e ? e : Number(e);
                        if (void 0 !== t) {
                            if (isNaN(t))
                                return;
                            void 0 !== this.precision && (t = this.toPrecision(t, this.precision))
                        }
                        t >= this.max && (t = this.max),
                        t <= this.min && (t = this.min),
                        this.currentValue = t,
                        this.userInput = null,
                        this.$emit("input", t)
                    }
                }
            },
            computed: {
                minDisabled: function() {
                    return this._decrease(this.value, this.step) < this.min
                },
                maxDisabled: function() {
                    return this._increase(this.value, this.step) > this.max
                },
                numPrecision: function() {
                    var e = this.value
                      , t = this.step
                      , n = this.getPrecision
                      , i = this.precision
                      , o = n(t);
                    return void 0 !== i ? (o > i && console.warn("[Element Warn][InputNumber]precision should not be less than the decimal places of step"),
                    i) : Math.max(n(e), o)
                },
                controlsAtRight: function() {
                    return this.controls && "right" === this.controlsPosition
                },
                _elFormItemSize: function() {
                    return (this.ZmFormItem || {}).elFormItemSize
                },
                inputNumberSize: function() {
                    return this.size || this._elFormItemSize || (this.$ELEMENT || {}).size
                },
                inputNumberDisabled: function() {
                    return this.disabled || (this.ZmForm || {}).disabled
                },
                displayValue: function() {
                    if (null !== this.userInput)
                        return this.userInput;
                    var e = this.currentValue;
                    return "number" == typeof e && void 0 !== this.precision ? e.toFixed(this.precision) : e
                }
            },
            methods: {
                toPrecision: function(e, t) {
                    return void 0 === t && (t = this.numPrecision),
                    parseFloat(Number(e).toFixed(t))
                },
                getPrecision: function(e) {
                    if (void 0 === e)
                        return 0;
                    var t = e.toString()
                      , n = t.indexOf(".")
                      , i = 0;
                    return -1 !== n && (i = t.length - n - 1),
                    i
                },
                _increase: function(e, t) {
                    if ("number" != typeof e && void 0 !== e)
                        return this.currentValue;
                    var n = Math.pow(10, this.numPrecision);
                    return this.toPrecision((n * e + n * t) / n)
                },
                _decrease: function(e, t) {
                    if ("number" != typeof e && void 0 !== e)
                        return this.currentValue;
                    var n = Math.pow(10, this.numPrecision);
                    return this.toPrecision((n * e - n * t) / n)
                },
                increase: function() {
                    if (!this.inputNumberDisabled && !this.maxDisabled) {
                        var e = this.value || 0
                          , t = this._increase(e, this.step);
                        this.setCurrentValue(t)
                    }
                },
                decrease: function() {
                    if (!this.inputNumberDisabled && !this.minDisabled) {
                        var e = this.value || 0
                          , t = this._decrease(e, this.step);
                        this.setCurrentValue(t)
                    }
                },
                handleBlur: function(e) {
                    this.$emit("blur", e)
                },
                handleFocus: function(e) {
                    this.$emit("focus", e)
                },
                setCurrentValue: function(e) {
                    var t = this.currentValue;
                    "number" == typeof e && void 0 !== this.precision && (e = this.toPrecision(e, this.precision)),
                    e >= this.max && (e = this.max),
                    e <= this.min && (e = this.min),
                    t !== e && (this.userInput = null,
                    this.$emit("input", e),
                    this.$emit("change", e, t),
                    this.currentValue = e)
                },
                handleInput: function(e) {
                    this.userInput = e
                },
                handleInputChange: function(e) {
                    var t = "" === e ? void 0 : Number(e);
                    isNaN(t) && "" !== e || this.setCurrentValue(t),
                    this.userInput = null
                },
                select: function() {
                    this.$refs.input.select()
                }
            },
            mounted: function() {
                var e = this.$refs.input.$refs.input;
                e.setAttribute("role", "spinbutton"),
                e.setAttribute("aria-valuemax", this.max),
                e.setAttribute("aria-valuemin", this.min),
                e.setAttribute("aria-valuenow", this.currentValue),
                e.setAttribute("aria-disabled", this.inputNumberDisabled)
            },
            updated: function() {
                this.$refs && this.$refs.input && this.$refs.input.$refs.input.setAttribute("aria-valuenow", this.currentValue)
            }
        }
          , Ye = (n(58),
        V(Je, (function() {
            var e = this
              , t = e.$createElement
              , n = e._self._c || t;
            return n("div", {
                class: ["zm-input-number", e.inputNumberSize ? "zm-input-number--" + e.inputNumberSize : "", {
                    "is-disabled": e.inputNumberDisabled
                }, {
                    "is-without-controls": !e.controls
                }, {
                    "is-controls-right": e.controlsAtRight
                }],
                on: {
                    dragstart: function(e) {
                        e.preventDefault()
                    }
                }
            }, [e.controls ? n("span", {
                directives: [{
                    name: "repeat-click",
                    rawName: "v-repeat-click",
                    value: e.decrease,
                    expression: "decrease"
                }],
                staticClass: "zm-input-number__decrease",
                class: {
                    "is-disabled": e.minDisabled
                },
                attrs: {
                    role: "button"
                },
                on: {
                    keydown: function(t) {
                        return "button"in t || !e._k(t.keyCode, "enter", 13, t.key, "Enter") ? e.decrease(t) : null
                    }
                }
            }, [n("i", {
                class: "zm-icon-" + (e.controlsAtRight ? "down" : "minus")
            })]) : e._e(), e.controls ? n("span", {
                directives: [{
                    name: "repeat-click",
                    rawName: "v-repeat-click",
                    value: e.increase,
                    expression: "increase"
                }],
                staticClass: "zm-input-number__increase",
                class: {
                    "is-disabled": e.maxDisabled
                },
                attrs: {
                    role: "button"
                },
                on: {
                    keydown: function(t) {
                        return "button"in t || !e._k(t.keyCode, "enter", 13, t.key, "Enter") ? e.increase(t) : null
                    }
                }
            }, [n("i", {
                class: "zm-icon-" + (e.controlsAtRight ? "up" : "add")
            })]) : e._e(), n("zm-input", {
                ref: "input",
                attrs: {
                    value: e.displayValue,
                    placeholder: e.placeholder,
                    disabled: e.inputNumberDisabled,
                    max: e.max,
                    min: e.min,
                    name: e.name,
                    label: e.label
                },
                on: {
                    blur: e.handleBlur,
                    focus: e.handleFocus,
                    input: e.handleInput,
                    change: e.handleInputChange
                },
                nativeOn: {
                    keydown: [function(t) {
                        return "button"in t || !e._k(t.keyCode, "up", 38, t.key, ["Up", "ArrowUp"]) ? (t.preventDefault(),
                        e.increase(t)) : null
                    }
                    , function(t) {
                        return "button"in t || !e._k(t.keyCode, "down", 40, t.key, ["Down", "ArrowDown"]) ? (t.preventDefault(),
                        e.decrease(t)) : null
                    }
                    ]
                }
            })], 1)
        }
        ), [], !1, null, null, null).exports);
        Ye.install = function(e) {
            e.component(Ye.name, Ye)
        }
        ;
        var Qe = Ye
          , Xe = {
            name: "ZmRadio",
            mixins: [N],
            inject: {
                ZmForm: {
                    default: ""
                },
                ZmFormItem: {
                    default: ""
                }
            },
            componentName: "ZmRadio",
            props: {
                value: {},
                label: {},
                disabled: Boolean,
                name: String
            },
            data: function() {
                return {
                    focus: !1
                }
            },
            computed: {
                isGroup: function() {
                    for (var e = this.$parent; e; ) {
                        if ("ZmRadioGroup" === e.$options.componentName)
                            return this._radioGroup = e,
                            !0;
                        e = e.$parent
                    }
                    return !1
                },
                model: {
                    get: function() {
                        return this.isGroup ? this._radioGroup.value : this.value
                    },
                    set: function(e) {
                        this.isGroup ? this.dispatch("ZmRadioGroup", "input", [e]) : this.$emit("input", e)
                    }
                },
                isDisabled: function() {
                    return this.isGroup ? this._radioGroup.disabled || this.disabled || (this.ZmForm || {}).disabled : this.disabled || (this.ZmForm || {}).disabled
                },
                tabIndex: function() {
                    return this.isDisabled ? -1 : this.isGroup ? this.model === this.label ? 0 : -1 : 0
                }
            },
            methods: {
                handleChange: function() {
                    var e = this;
                    this.$nextTick((function() {
                        e.$emit("change", e.model),
                        e.isGroup && e.dispatch("ZmRadioGroup", "handleChange", e.model)
                    }
                    ))
                }
            }
        }
          , et = (n(59),
        V(Xe, (function() {
            var e = this
              , t = e.$createElement
              , n = e._self._c || t;
            return n("span", {
                staticClass: "zm-radio"
            }, [n("label", {
                staticClass: "zm-radio-wrap",
                class: [{
                    "is-disabled": e.isDisabled
                }, {
                    "is-focus": e.focus
                }, {
                    "is-checked": e.model === e.label
                }]
            }, [n("input", {
                directives: [{
                    name: "model",
                    rawName: "v-model",
                    value: e.model,
                    expression: "model"
                }],
                staticClass: "zm-radio__original",
                attrs: {
                    type: "radio",
                    name: e.name,
                    disabled: e.isDisabled,
                    "aria-checked": (e.model === e.label).toString(),
                    tabIndex: e.tabIndex
                },
                domProps: {
                    value: e.label,
                    checked: e._q(e.model, e.label)
                },
                on: {
                    focus: function(t) {
                        e.focus = !0
                    },
                    blur: function(t) {
                        e.focus = !1
                    },
                    change: [function(t) {
                        e.model = e.label
                    }
                    , e.handleChange]
                }
            }), n("span", {
                staticClass: "zm-radio__inner"
            }), n("span", {
                staticClass: "zm-radio__label"
            }, [e._t("default"), e.$slots.default ? e._e() : [e._v(e._s(e.label))]], 2)]), e.$slots.suffix ? n("span", {
                staticClass: "zm-radio__suffix"
            }, [e._t("suffix")], 2) : e._e()])
        }
        ), [], !1, null, null, null).exports);
        et.install = function(e) {
            e.component("zm-radio", et)
        }
        ;
        var tt = et
          , nt = Object.freeze({
            RETURN: 13,
            SPACE: 32,
            LEFT: 37,
            UP: 38,
            RIGHT: 39,
            DOWN: 40
        })
          , it = {
            name: "ZmRadioGroup",
            componentName: "ZmRadioGroup",
            inject: {
                ZmFormItem: {
                    default: ""
                }
            },
            mixins: [N],
            props: {
                value: {},
                size: String,
                fill: String,
                textColor: String,
                disabled: Boolean
            },
            computed: {
                _elFormItemSize: function() {
                    return (this.ZmFormItem || {}).elFormItemSize
                },
                radioGroupSize: function() {
                    return this.size || this._elFormItemSize || (this.$ELEMENT || {}).size
                }
            },
            created: function() {
                var e = this;
                this.$on("handleChange", (function(t) {
                    e.$emit("change", t)
                }
                ))
            },
            mounted: function() {
                this.keyCode = nt,
                this.radios = [];
                for (var e = this.$refs.radioGroup.querySelectorAll("[type=radio]"), t = 0; t < e.length; t++)
                    this.radios.push(e[t]);
                this.firstRadio = this.radios[0];
                var n = this.radios.length;
                this.lastRadio = this.radios[n - 1],
                ![].some.call(this.radios, (function(e) {
                    return e.checked
                }
                )) && this.firstRadio && (this.firstRadio.tabIndex = 0)
            },
            methods: {
                handleKeydown: function(e) {
                    var t = e.target
                      , n = !1;
                    switch (e.keyCode) {
                    case this.keyCode.SPACE:
                    case this.keyCode.RETURN:
                        this.setChecked(t),
                        n = !0;
                        break;
                    case nt.LEFT:
                    case nt.UP:
                        this.setCheckedToPreviousItem(t),
                        n = !0;
                        break;
                    case nt.RIGHT:
                    case nt.DOWN:
                        this.setCheckedToNextItem(t),
                        n = !0
                    }
                    n && (e.stopPropagation(),
                    e.preventDefault())
                },
                setChecked: function(e) {
                    e.click(),
                    e.focus()
                },
                setCheckedToPreviousItem: function(e) {
                    var t;
                    e === this.firstRadio ? this.setChecked(this.lastRadio) : (t = this.radios.indexOf(e),
                    this.setChecked(this.radios[t - 1]))
                },
                setCheckedToNextItem: function(e) {
                    var t;
                    e === this.lastRadio ? this.setChecked(this.firstRadio) : (t = this.radios.indexOf(e),
                    this.setChecked(this.radios[t + 1]))
                }
            },
            watch: {
                value: function(e) {
                    this.dispatch("ZmFormItem", "el.form.change", [this.value])
                }
            }
        }
          , ot = (n(60),
        V(it, (function() {
            var e = this.$createElement;
            return (this._self._c || e)("div", {
                ref: "radioGroup",
                staticClass: "zm-radio-group",
                class: [this.size ? "zm-radio-group--" + this.size : ""],
                attrs: {
                    role: "radiogroup"
                },
                on: {
                    keydown: this.handleKeydown
                }
            }, [this._t("default")], 2)
        }
        ), [], !1, null, null, null).exports);
        ot.install = function(e) {
            e.component(ot.name, ot)
        }
        ;
        var rt = ot
          , st = {
            name: "ZmCheckbox",
            mixins: [N],
            inject: {
                ZmForm: {
                    default: ""
                },
                ZmFormItem: {
                    default: ""
                }
            },
            componentName: "ZmCheckbox",
            data: function() {
                return {
                    selfModel: !1,
                    focused: !1,
                    isLimitExceeded: !1
                }
            },
            computed: {
                model: {
                    get: function() {
                        return this.isGroupOrList ? this.store : void 0 !== this.value ? this.value : this.selfModel
                    },
                    set: function(e) {
                        this.isGroup ? this.dispatch("ZmCheckboxGroup", "input", [e]) : this.isList ? this.dispatch("ZmCheckboxList", "input", [e]) : (this.$emit("input", e),
                        this.selfModel = e)
                    }
                },
                isChecked: function() {
                    return "[object Boolean]" === {}.toString.call(this.model) ? this.model : Array.isArray(this.model) ? this.model.indexOf(this.label) > -1 : null !== this.model && void 0 !== this.model ? !0 === this.model : void 0
                },
                isGroup: function() {
                    for (var e = this.$parent; e; ) {
                        if ("ZmCheckboxGroup" === e.$options.componentName)
                            return this._checkboxGroupOrList = e,
                            !0;
                        e = e.$parent
                    }
                    return !1
                },
                isList: function() {
                    for (var e = this.$parent; e; ) {
                        if ("ZmCheckboxList" === e.$options.componentName)
                            return this._checkboxGroupOrList = e,
                            !0;
                        e = e.$parent
                    }
                    return !1
                },
                isGroupOrList: function() {
                    return this.isList || this.isGroup
                },
                store: function() {
                    return this._checkboxGroupOrList ? this._checkboxGroupOrList.value : this.value
                },
                isDisabled: function() {
                    return this.isGroupOrList ? this._checkboxGroupOrList.disabled || this.disabled || (this.ZmForm || {}).disabled : this.disabled || (this.ZmForm || {}).disabled
                },
                _elFormItemSize: function() {
                    return (this.ZmFormItem || {}).elFormItemSize
                }
            },
            props: {
                value: {},
                label: {},
                x: Number,
                y: Number,
                indeterminate: Boolean,
                disabled: Boolean,
                checked: Boolean,
                ariaLabel: String,
                name: String,
                tabindex: Number,
                id: String,
                controls: String,
                disableTransition: {
                    type: Boolean,
                    default: !1
                }
            },
            methods: {
                focus: function() {
                    this.focused = !0,
                    this.$refs.input.focus()
                },
                blur: function() {
                    this.focused = !1,
                    this.$refs.input.focus()
                },
                addToStore: function() {
                    Array.isArray(this.model) && -1 === this.model.indexOf(this.label) ? this.model.push(this.label) : this.model = !0
                },
                handleEnter: function(e) {
                    if (e.target.checked = !e.target.checked,
                    this.isGroup || this.isList)
                        if (Array.isArray(this.model))
                            if (-1 === this.model.indexOf(this.label))
                                this.model.push(this.label);
                            else {
                                var t = this.model.indexOf(this.label);
                                this.model.splice(t, 1)
                            }
                        else
                            console.warn("Checkbox group or checkbox list model must be an array");
                    else
                        this.model = e.target.checked;
                    this.handleChange(e)
                },
                handleChange: function(e) {
                    var t = this;
                    if (!this.isLimitExceeded) {
                        var n = void 0;
                        n = !!e.target.checked,
                        this.$emit("change", n, e),
                        this.$nextTick((function() {
                            t.isGroup ? t.dispatch("ZmCheckboxGroup", "change", [t._checkboxGroupOrList.value]) : t.isList && t.dispatch("ZmCheckboxList", "change", [t._checkboxGroupOrList.value, t])
                        }
                        ))
                    }
                }
            },
            created: function() {
                this.checked && this.addToStore()
            },
            watch: {
                value: function(e) {
                    this.dispatch("ZmFormItem", "el.form.change", e)
                }
            }
        }
          , at = (n(61),
        V(st, (function() {
            var e = this
              , t = e.$createElement
              , n = e._self._c || t;
            return n("span", {
                staticClass: "zm-checkbox"
            }, [n("label", {
                staticClass: "zm-checkbox-wrap",
                class: [{
                    "is-disabled": e.isDisabled
                }, {
                    "is-checked": e.isChecked
                }, {
                    "is-indeterminate": e.indeterminate
                }, {
                    "is-disable-transition": e.disableTransition
                }]
            }, [n("input", {
                directives: [{
                    name: "model",
                    rawName: "v-model",
                    value: e.model,
                    expression: "model"
                }],
                ref: "input",
                staticClass: "zm-checkbox__original",
                attrs: {
                    type: "checkbox",
                    disabled: e.isDisabled,
                    name: e.name,
                    "aria-checked": e.indeterminate ? "mixed" : void 0 === e.isChecked ? "false" : e.isChecked.toString(),
                    "aria-label": e.ariaLabel || e.label,
                    id: e.id,
                    tabindex: e.tabindex ? e.tabindex : e.isList ? -1 : 0,
                    "aria-controls": e.controls
                },
                domProps: {
                    value: e.label,
                    checked: Array.isArray(e.model) ? e._i(e.model, e.label) > -1 : e.model
                },
                on: {
                    change: [function(t) {
                        var n = e.model
                          , i = t.target
                          , o = !!i.checked;
                        if (Array.isArray(n)) {
                            var r = e.label
                              , s = e._i(n, r);
                            i.checked ? s < 0 && (e.model = n.concat([r])) : s > -1 && (e.model = n.slice(0, s).concat(n.slice(s + 1)))
                        } else
                            e.model = o
                    }
                    , e.handleChange],
                    focus: function(t) {
                        e.focused = !0
                    },
                    blur: function(t) {
                        e.focused = !1
                    },
                    keydown: function(t) {
                        return "button"in t || !e._k(t.keyCode, "enter", 13, t.key, "Enter") ? (t.stopPropagation(),
                        e.handleEnter(t)) : null
                    }
                }
            }), n("span", {
                staticClass: "zm-checkbox__inner"
            }), e.$slots.default || e.label ? n("span", {
                staticClass: "zm-checkbox__label"
            }, [e._t("default"), e.$slots.default ? e._e() : [e._v(e._s(e.label))]], 2) : e.ariaLabel ? n("span", {
                staticClass: "zm-sr-only"
            }, [e._v(e._s(e.ariaLabel))]) : e._e()]), e.$slots.suffix ? n("span", {
                staticClass: "zm-checkbox__suffix"
            }, [e._t("suffix")], 2) : e._e()])
        }
        ), [], !1, null, null, null).exports);
        at.install = function(e) {
            e.component(at.name, at)
        }
        ;
        var lt = at
          , ut = {
            name: "ZmCheckboxGroup",
            componentName: "ZmCheckboxGroup",
            mixins: [N],
            inject: {
                ZmFormItem: {
                    default: ""
                }
            },
            props: {
                value: {},
                disabled: Boolean,
                size: String
            },
            computed: {
                _elFormItemSize: function() {
                    return (this.ZmFormItem || {}).elFormItemSize
                },
                checkboxGroupSize: function() {
                    return this.size || this._elFormItemSize || (this.$ELEMENT || {}).size
                }
            },
            watch: {
                value: function(e) {
                    this.dispatch("ZmFormItem", "el.form.change", [e])
                }
            }
        }
          , ct = (n(62),
        V(ut, (function() {
            var e = this.$createElement;
            return (this._self._c || e)("div", {
                staticClass: "zm-checkbox-group",
                class: [this.size ? "zm-checkbox-group--" + this.size : ""],
                attrs: {
                    role: "group"
                }
            }, [this._t("default")], 2)
        }
        ), [], !1, null, null, null).exports);
        ct.install = function(e) {
            e.component(ct.name, ct)
        }
        ;
        var dt = ct
          , ht = {
            name: "ZmSwitch",
            mixins: [$e("input"), E],
            inject: {
                ZmForm: {
                    default: ""
                }
            },
            props: {
                value: {
                    type: [Boolean, String, Number],
                    default: !1
                },
                disabled: {
                    type: Boolean,
                    default: !1
                },
                activeIconClass: {
                    type: String,
                    default: ""
                },
                inactiveIconClass: {
                    type: String,
                    default: ""
                },
                activeText: String,
                inactiveText: String,
                activeColor: {
                    type: String,
                    default: ""
                },
                inactiveColor: {
                    type: String,
                    default: ""
                },
                activeValue: {
                    type: [Boolean, String, Number],
                    default: !0
                },
                inactiveValue: {
                    type: [Boolean, String, Number],
                    default: !1
                },
                name: {
                    type: String,
                    default: ""
                },
                id: String,
                labelText: String,
                labelBy: String
            },
            data: function() {
                return {}
            },
            created: function() {
                var e = this;
                ~[this.activeValue, this.inactiveValue].indexOf(this.value) || this.$emit("input", this.inactiveValue),
                this.debouncedOnInputChange = J()(300, (function() {
                    e.handleChange()
                }
                ))
            },
            computed: {
                checked: function() {
                    return this.value === this.activeValue
                },
                switchDisabled: function() {
                    return this.disabled || (this.ZmForm || {}).disabled
                }
            },
            watch: {
                checked: function() {
                    this.$refs.input.checked = this.checked,
                    (this.activeColor || this.inactiveColor) && this.setBackgroundColor()
                }
            },
            methods: {
                handleChange: function() {
                    var e = this;
                    this.$emit("input", this.checked ? this.inactiveValue : this.activeValue),
                    this.$emit("change", this.checked ? this.inactiveValue : this.activeValue),
                    this.$nextTick((function() {
                        e.$refs.input.checked = e.checked
                    }
                    ))
                },
                setBackgroundColor: function() {
                    var e = this.checked ? this.activeColor : this.inactiveColor;
                    this.$refs.core.style.borderColor = e,
                    this.$refs.core.style.backgroundColor = e
                },
                switchValue: function() {
                    !this.switchDisabled && this.handleChange()
                },
                getMigratingConfig: function() {
                    return {
                        props: {
                            "on-color": "on-color is renamed to active-color.",
                            "off-color": "off-color is renamed to inactive-color.",
                            "on-text": "on-text is renamed to active-text.",
                            "off-text": "off-text is renamed to inactive-text.",
                            "on-value": "on-value is renamed to active-value.",
                            "off-value": "off-value is renamed to inactive-value.",
                            "on-icon-class": "on-icon-class is renamed to active-icon-class.",
                            "off-icon-class": "off-icon-class is renamed to inactive-icon-class."
                        }
                    }
                }
            },
            mounted: function() {
                (this.activeColor || this.inactiveColor) && this.setBackgroundColor(),
                this.$refs.input.checked = this.checked
            }
        }
          , ft = (n(63),
        V(ht, (function() {
            var e = this
              , t = e.$createElement
              , n = e._self._c || t;
            return n("label", {
                staticClass: "zm-switch",
                class: {
                    "is-disabled": e.switchDisabled,
                    "is-checked": e.checked
                }
            }, [n("input", {
                ref: "input",
                staticClass: "zm-switch__input",
                attrs: {
                    type: "checkbox",
                    id: e.id,
                    name: e.name,
                    "true-value": e.activeValue,
                    "false-value": e.inactiveValue,
                    disabled: e.switchDisabled,
                    autocomplete: "off",
                    role: "button",
                    "data-toggle": "button",
                    "aria-pressed": e.checked.toString(),
                    "aria-describedby": e.labelBy,
                    "aria-label": e.labelText
                },
                on: {
                    click: e.debouncedOnInputChange,
                    keydown: function(t) {
                        return "button"in t || !e._k(t.keyCode, "enter", 13, t.key, "Enter") ? e.switchValue(t) : null
                    }
                }
            }), e.inactiveIconClass || e.inactiveText ? n("span", {
                class: ["zm-switch__label", "zm-switch__label--left", e.checked ? "" : "is-active"]
            }, [e.inactiveIconClass ? n("i", {
                class: [e.inactiveIconClass]
            }) : e._e(), !e.inactiveIconClass && e.inactiveText ? n("span", {
                attrs: {
                    "aria-hidden": e.checked
                }
            }, [e._v(e._s(e.inactiveText))]) : e._e()]) : e._e(), n("span", {
                ref: "core",
                staticClass: "zm-switch__core"
            }), n("span", {
                directives: [{
                    name: "show",
                    rawName: "v-show",
                    value: !1,
                    expression: "false"
                }],
                domProps: {
                    textContent: e._s(e.labelText)
                }
            }), e.activeIconClass || e.activeText ? n("span", {
                class: ["zm-switch__label", "zm-switch__label--right", e.checked ? "is-active" : ""]
            }, [e.activeIconClass ? n("i", {
                class: [e.activeIconClass]
            }) : e._e(), !e.activeIconClass && e.activeText ? n("span", {
                attrs: {
                    "aria-hidden": !e.checked
                }
            }, [e._v(e._s(e.activeText))]) : e._e()]) : e._e()])
        }
        ), [], !1, null, null, null).exports);
        ft.install = function(e) {
            e.component(ft.name, ft)
        }
        ;
        var pt = ft
          , mt = n(44)
          , vt = n.n(mt)
          , gt = n(45)
          , bt = n.n(gt)
          , yt = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
            return typeof e
        }
        : function(e) {
            return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
        }
          , wt = /(%|)\{([0-9a-zA-Z_]+)\}/g
          , xt = function(e) {
            return function(e) {
                for (var t = arguments.length, n = Array(t > 1 ? t - 1 : 0), i = 1; i < t; i++)
                    n[i - 1] = arguments[i];
                return 1 === n.length && "object" === yt(n[0]) && (n = n[0]),
                n && n.hasOwnProperty || (n = {}),
                e.replace(wt, (function(t, i, o, r) {
                    var s = void 0;
                    return "{" === e[r - 1] && "}" === e[r + t.length] ? o : null == (s = A(n, o) ? n[o] : null) ? "" : s
                }
                ))
            }
        }
          , kt = {
            "en-US": n(64).default,
            "es-ES": n(65).default,
            "de-DE": n(66).default,
            "fr-FR": n(67).default,
            "jp-JP": n(68).default,
            "pt-PT": n(69).default,
            "ru-RU": n(70).default,
            "zh-CN": n(71).default,
            "zh-TW": n(72).default,
            "ko-KO": n(73).default
        }
          , Ct = kt[vt.a.get("_zm_lang")] || kt["en-US"]
          , _t = void 0
          , St = void 0
          , Ot = !1
          , Tt = function() {
            var e = Object.getPrototypeOf(this || _t).$t;
            if ("function" == typeof e && _t.locale)
                return Ot || (Ot = !0,
                _t.locale(_t.config.lang, bt()(Ct, _t.locale(_t.config.lang) || {}, {
                    clone: !0
                }))),
                e.apply(this, arguments)
        }
          , Et = function(e, t) {
            var n = Tt.apply(this, arguments);
            if (null != n)
                return n;
            for (var i = e.split("."), o = Ct, r = 0, s = i.length; r < s; r++) {
                var a = i[r];
                if (n = o[a],
                r === s - 1)
                    return St(n, t);
                if (!n)
                    return "";
                o = n
            }
            return ""
        }
          , zt = function(e) {
            Ct = e || Ct
        };
        var Nt = {
            install: function(e, t) {
                St = xt(_t = e),
                zt(t)
            },
            t: Et,
            i18n: function(e) {
                Tt = e || Tt
            }
        }
          , Ft = {
            methods: {
                t: function() {
                    for (var e = arguments.length, t = Array(e), n = 0; n < e; n++)
                        t[n] = arguments[n];
                    return Et.apply(this, t)
                }
            }
        }
          , $t = {
            name: "ZmSelectDropdown",
            componentName: "ZmSelectDropdown",
            mixins: [ve],
            props: {
                placement: {
                    default: "bottom-start"
                },
                boundariesPadding: {
                    default: 0
                },
                popperOptions: {
                    default: function() {
                        return {
                            gpuAcceleration: !1
                        }
                    }
                },
                visibleArrow: {
                    default: !1
                },
                appendToBody: {
                    type: Boolean,
                    default: !0
                },
                widthLimit: Boolean
            },
            data: function() {
                return {
                    minWidth: ""
                }
            },
            computed: {
                popperClass: function() {
                    return this.$parent.popperClass
                }
            },
            watch: {
                "$parent.inputWidth": function() {
                    this.minWidth = this.$parent.$el.getBoundingClientRect().width + "px"
                }
            },
            mounted: function() {
                var e = this;
                this.referenceElm = this.$parent.$refs.reference,
                this.$parent.popperElm = this.popperElm = this.$el,
                this.$on("updatePopper", (function() {
                    e.$parent.visible && e.$nextTick(e.updatePopper)
                }
                )),
                this.$on("destroyPopper", this.destroyPopper)
            }
        }
          , At = (n(74),
        V($t, (function() {
            var e = this.$createElement;
            return (this._self._c || e)("div", {
                staticClass: "zm-select-dropdown zm-popper",
                class: [{
                    "is-multiple": this.$parent.multiple
                }, this.popperClass],
                style: {
                    minWidth: this.minWidth,
                    width: this.widthLimit ? this.minWidth : "auto"
                }
            }, [this._t("default")], 2)
        }
        ), [], !1, null, null, null).exports)
          , Lt = {
            name: "ZmTooltip",
            mixins: [ve],
            props: {
                openDelay: {
                    type: Number,
                    default: 0
                },
                disabled: Boolean,
                manual: Boolean,
                effect: {
                    type: String,
                    default: "light"
                },
                arrowOffset: {
                    type: Number,
                    default: 0
                },
                popperClass: String,
                content: String,
                visibleArrow: {
                    default: !0
                },
                transition: {
                    type: String,
                    default: "zm-fade-in-linear"
                },
                popperOptions: {
                    default: function() {
                        return {
                            boundariesElement: "window",
                            boundariesPadding: 10,
                            gpuAcceleration: !1
                        }
                    }
                },
                enterable: {
                    type: Boolean,
                    default: !0
                },
                hideAfter: {
                    type: Number,
                    default: 0
                }
            },
            data: function() {
                return {
                    tooltipId: "zm-tooltip-" + B(),
                    timeoutPending: null,
                    focusing: !1,
                    focusInPopper: !1
                }
            },
            beforeCreate: function() {
                var e = this;
                this.$isServer || (this.popperVM = new Dt({
                    data: {
                        node: ""
                    },
                    render: function(e) {
                        return this.node
                    }
                }).$mount(),
                this.debounceClose = J()(200, (function() {
                    return e.handleClosePopper()
                }
                )))
            },
            computed: {
                hasATag: function() {
                    return !!this.$slots.content && Boolean(this.$refs.popper.getElementsByTagName("a").length)
                }
            },
            render: function(e) {
                var t = this;
                if (this.popperVM) {
                    var n = this.content;
                    if (this.$slots.content) {
                        var i = this.$slots.content[0].elm;
                        i && (n = i.innerText || i.textContent)
                    }
                    this.popperVM.node = e("transition", {
                        attrs: {
                            name: this.transition
                        },
                        on: {
                            afterLeave: this.doDestroy
                        }
                    }, [e("div", {
                        on: {
                            mouseleave: function() {
                                t.setExpectedState(!1),
                                t.debounceClose()
                            },
                            mouseenter: function() {
                                t.setExpectedState(!0)
                            },
                            keyup: function(e) {
                                t.popperKeyup(e)
                            }
                        },
                        ref: "popper",
                        attrs: {
                            role: "tooltip",
                            "aria-label": n,
                            id: this.tooltipId,
                            "aria-hidden": this.disabled || !this.showPopper ? "true" : "false"
                        },
                        directives: [{
                            name: "show",
                            value: !this.disabled && this.showPopper
                        }],
                        class: ["zm-tooltip__popper", "is-" + this.effect, this.popperClass]
                    }, [this.$slots.content || this.content])])
                }
                var o = this.getFirstElement();
                if (!o)
                    return null;
                var r = o.data = o.data || {};
                return r.staticClass = this.addTooltipClass(r.staticClass),
                o
            },
            mounted: function() {
                var e = this;
                this.referenceElm = this.$el,
                this.popperElm = this.$refs.popper,
                1 === this.$el.nodeType && (c(this.referenceElm, "mouseenter", this.show),
                c(this.referenceElm, "mouseleave", this.hide),
                c(this.referenceElm, "keyup", this.handleKeyup),
                c(this.referenceElm, "blur", this.handleBlur),
                c(this.referenceElm, "click", this.removeFocusing)),
                this.value && this.popperVM && this.popperVM.$nextTick((function() {
                    e.value && e.updatePopper()
                }
                ))
            },
            watch: {
                focusing: function(e) {
                    e ? f(this.referenceElm, "focusing") : p(this.referenceElm, "focusing")
                }
            },
            methods: {
                show: function() {
                    this.setExpectedState(!0),
                    this.handleShowPopper()
                },
                hide: function() {
                    this.setExpectedState(!1),
                    this.debounceClose()
                },
                popperKeyup: function(e) {
                    27 === e.keyCode && this.hide()
                },
                handleKeyup: function(e) {
                    if (13 === e.keyCode || 32 === e.keyCode) {
                        if (!this.disabled && this.showPopper)
                            this.hide();
                        else {
                            if (!this.$slots.default || !this.$slots.default.length)
                                return void this.handleFocus();
                            var t = this.$slots.default[0].componentInstance;
                            t && t.focus ? t.focus() : this.handleFocus()
                        }
                        e.stopPropagation()
                    }
                },
                handleFocus: function() {
                    this.focusing = !0,
                    this.show()
                },
                handleBlur: function() {
                    this.focusInPopper || (this.focusing = !1,
                    this.hide())
                },
                removeFocusing: function() {
                    this.focusing = !1
                },
                addTooltipClass: function(e) {
                    return e ? "zm-tooltip " + e.replace("zm-tooltip", "") : "zm-tooltip"
                },
                getFirstFocus: function() {
                    var e = this.$refs.popper.querySelector("[focusFirst]");
                    return e || null
                },
                handleShowPopper: function() {
                    var e = this;
                    this.expectedState && !this.manual && (clearTimeout(this.timeout),
                    this.timeout = setTimeout((function() {
                        1 === e.$el.nodeType && e.$el.setAttribute("aria-describedby", e.tooltipId),
                        e.showPopper = !0,
                        e.hasATag && setTimeout((function() {
                            var t = document.activeElement
                              , n = e.getFirstFocus();
                            e.ariaDialog = new H(e.$refs.popper,t,n),
                            e.focusInPopper = !0
                        }
                        ), 0)
                    }
                    ), this.openDelay),
                    this.hideAfter > 0 && (this.timeoutPending = setTimeout((function() {
                        e.showPopper = !1
                    }
                    ), this.hideAfter)))
                },
                handleClosePopper: function() {
                    this.enterable && this.expectedState || this.manual || (clearTimeout(this.timeout),
                    this.timeoutPending && clearTimeout(this.timeoutPending),
                    this.ariaDialog && (this.ariaDialog.closeDialog(),
                    this.ariaDialog = null,
                    this.focusInPopper = !1),
                    this.showPopper = !1,
                    1 === this.$el.nodeType && this.$el.getAttribute("aria-describedby") && this.$el.removeAttribute("aria-describedby"),
                    this.disabled && this.doDestroy())
                },
                setExpectedState: function(e) {
                    !1 === e && clearTimeout(this.timeoutPending),
                    this.expectedState = e
                },
                getFirstElement: function() {
                    var e = this.$slots.default;
                    if (!Array.isArray(e))
                        return null;
                    for (var t = null, n = 0; n < e.length; n++)
                        e[n] && e[n].tag && (t = e[n]);
                    return t
                }
            },
            beforeDestroy: function() {
                this.popperVM && this.popperVM.$destroy()
            },
            destroyed: function() {
                var e = this.referenceElm;
                d(e, "mouseenter", this.show),
                d(e, "mouseleave", this.hide),
                d(e, "keyup", this.handleKeyup),
                d(e, "blur", this.handleBlur),
                d(e, "click", this.removeFocusing)
            }
        }
          , It = (n(75),
        V(Lt, void 0, void 0, !1, null, null, null).exports)
          , Dt = void 0;
        It.install = function(e) {
            Dt = e,
            e.component(It.name, It)
        }
        ;
        var Bt = It
          , Pt = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
            return typeof e
        }
        : function(e) {
            return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
        }
          , Mt = {
            mixins: [N],
            components: {
                ZmTooltip: Bt
            },
            name: "ZmOption",
            componentName: "ZmOption",
            inject: ["select"],
            props: {
                value: {
                    required: !0
                },
                label: [String, Number],
                ariaLabel: String,
                created: Boolean,
                disabled: {
                    type: Boolean,
                    default: !1
                },
                isMenuShow: Boolean
            },
            data: function() {
                return {
                    groupDisabled: !1,
                    hover: !1,
                    visible: !0,
                    hitState: !1,
                    isHover: !1,
                    hasTips: !1,
                    widthLimit: this.select.widthLimit
                }
            },
            computed: {
                optionId: function() {
                    return "select-item-" + this.selectId + "-" + this.itemIndex
                },
                isObject: function() {
                    return "[object object]" === Object.prototype.toString.call(this.value).toLowerCase()
                },
                currentLabel: function() {
                    return this.label || (this.isObject ? "" : this.value)
                },
                currentValue: function() {
                    return this.value || this.label || ""
                },
                itemSelected: function() {
                    return this.select.multiple ? this.contains(this.select.value, this.value) : this.isEqual(this.value, this.select.value)
                },
                limitReached: function() {
                    return !!this.select.multiple && (!this.itemSelected && (this.select.value || []).length >= this.select.multipleLimit && this.select.multipleLimit > 0)
                },
                selectId: function() {
                    return this.select.id || this.select.listId
                },
                itemIndex: function() {
                    return this.select.options.indexOf(this)
                }
            },
            watch: {
                hover: function(e) {
                    this.isHover = e
                },
                isHover: function(e) {
                    this.widthLimit && this.hasTips && (e ? this.$refs.tooltips && (this.$refs.tooltips.showPopper = !0) : this.$refs.tooltips && (this.$refs.tooltips.showPopper = !1))
                },
                "select.visible": function(e) {
                    this.widthLimit && (e ? this.checkShowTips() : this.isHover = !1)
                },
                currentLabel: function() {
                    this.created || this.select.remote || this.dispatch("ZmSelect", "setSelected")
                },
                value: function(e, t) {
                    var n = this.select
                      , i = n.remote
                      , o = n.valueKey;
                    if (!this.created && !i) {
                        if (o && "object" === (void 0 === e ? "undefined" : Pt(e)) && "object" === (void 0 === t ? "undefined" : Pt(t)) && e[o] === t[o])
                            return;
                        this.dispatch("ZmSelect", "setSelected")
                    }
                }
            },
            methods: {
                isEqual: function(e, t) {
                    if (this.isObject) {
                        var n = this.select.valueKey;
                        return I(e, n) === I(t, n)
                    }
                    return e === t
                },
                contains: function() {
                    var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : []
                      , t = arguments[1];
                    if (this.isObject) {
                        var n = this.select.valueKey;
                        return e.some((function(e) {
                            return I(e, n) === I(t, n)
                        }
                        ))
                    }
                    return e.indexOf(t) > -1
                },
                handleGroupDisabled: function(e) {
                    this.groupDisabled = e
                },
                checkShowTips: function() {
                    if (this.widthLimit) {
                        var e = this.$refs.optionLi && this.$refs.optionLi.getBoundingClientRect().width
                          , t = this.$refs.realLabelSpan && this.$refs.realLabelSpan.getBoundingClientRect().width;
                        this.hasTips = t > e
                    }
                },
                hoverItem: function() {
                    this.isHover = !0,
                    this.disabled || this.groupDisabled || (this.select.hoverIndex = this.select.options.indexOf(this))
                },
                leaveItem: function() {
                    this.isHover = !1
                },
                selectOptionClick: function() {
                    !0 !== this.disabled && !0 !== this.groupDisabled && this.dispatch("ZmSelect", "handleOptionClick", [this, !0])
                },
                queryChange: function(e) {
                    this.visible = new RegExp(function() {
                        var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "";
                        return String(e).replace(/[|\\{}()[\]^$+*?.]/g, "\\$&")
                    }(e),"i").test(this.currentLabel) || this.created,
                    this.visible || this.select.filteredOptionsCount--
                }
            },
            created: function() {
                this.select.options.push(this),
                this.select.cachedOptions.push(this),
                this.select.optionsCount++,
                this.select.filteredOptionsCount++,
                this.$on("queryChange", this.queryChange),
                this.$on("handleGroupDisabled", this.handleGroupDisabled)
            },
            beforeDestroy: function() {
                this.$refs.tooltips && (this.$refs.tooltips.showPopper = !1),
                this.select.onOptionDestroy(this.select.options.indexOf(this))
            }
        }
          , jt = (n(76),
        V(Mt, (function() {
            var e = this
              , t = e.$createElement
              , n = e._self._c || t;
            return e.visible ? n("li", {
                ref: "optionLi",
                staticClass: "zm-select-dropdown__item",
                class: {
                    selected: e.itemSelected,
                    "is-disabled": e.disabled || e.groupDisabled || e.limitReached,
                    hover: e.hover
                },
                attrs: {
                    id: e.optionId,
                    role: "option",
                    "aria-selected": e.itemSelected,
                    "aria-label": e.ariaLabel || e.currentLabel,
                    tabindex: e.disabled ? -1 : 0
                },
                on: {
                    mouseenter: e.hoverItem,
                    mouseleave: e.leaveItem,
                    click: function(t) {
                        return t.stopPropagation(),
                        e.selectOptionClick(t)
                    },
                    keydown: function(t) {
                        return "button"in t || !e._k(t.keyCode, "enter", 13, t.key, "Enter") ? e.selectOptionClick(t) : null
                    }
                }
            }, [e._t("default", [n("span", {
                ref: "realLabelSpan",
                staticClass: "real-label-span"
            }, [e._v(e._s(e.currentLabel))]), e.widthLimit ? n("div", [e.hasTips ? n("zm-tooltip", {
                ref: "tooltips",
                attrs: {
                    "popper-class": "zm-select-dropdown__item__tooltips",
                    placement: "right",
                    manual: !0
                }
            }, [n("div", {
                staticClass: "zm-select-dropdown__item__tooltips__content",
                attrs: {
                    slot: "content"
                },
                domProps: {
                    textContent: e._s(e.currentLabel)
                },
                slot: "content"
            }), n("span", {
                staticClass: "zm-select-dropdown__label_span"
            }, [e._v(e._s(e.currentLabel))])]) : n("span", {
                staticClass: "zm-select-dropdown__label_span"
            }, [e._v(e._s(e.currentLabel))])], 1) : n("span", [e._v(e._s(e.currentLabel))])])], 2) : e._e()
        }
        ), [], !1, null, null, null).exports)
          , qt = {
            name: "ZmTag",
            mixins: [Ft],
            props: {
                text: String,
                closable: Boolean,
                type: String,
                hit: Boolean,
                disableTransitions: Boolean,
                color: String,
                size: String,
                deleteText: {
                    type: String,
                    default: function() {
                        return Et("el.tag.delete")
                    }
                }
            },
            methods: {
                handleClose: function(e) {
                    this.$emit("close", e)
                }
            },
            computed: {
                tagSize: function() {
                    return this.size || (this.$ELEMENT || {}).size
                }
            }
        }
          , Zt = (n(77),
        V(qt, (function() {
            var e = this
              , t = e.$createElement
              , n = e._self._c || t;
            return n("transition", {
                attrs: {
                    name: e.disableTransitions ? "" : "zm-zoom-in-center"
                }
            }, [n("span", {
                staticClass: "zm-tag",
                class: [e.type ? "zm-tag--" + e.type : "", e.tagSize && "zm-tag--" + e.tagSize, {
                    "is-hit": e.hit
                }],
                style: {
                    backgroundColor: e.color
                }
            }, [e._t("default"), e.closable ? n("button", {
                staticClass: "zm-tag__close",
                attrs: {
                    tabindex: "0",
                    role: "button",
                    "aria-label": e.deleteText
                },
                on: {
                    click: function(t) {
                        return t.stopPropagation(),
                        e.handleClose(t)
                    }
                }
            }, [n("i", {
                staticClass: "zm-icon-close"
            })]) : e._e()], 2)])
        }
        ), [], !1, null, null, null).exports);
        Zt.install = function(e) {
            e.component(Zt.name, Zt)
        }
        ;
        var Rt = Zt;
        var Ht = {
            large: 40,
            medium: 30,
            small: 24
        }
          , Gt = {
            mixins: [N, Ft, {
                data: function() {
                    return {
                        hoverOption: -1,
                        activedescendant: ""
                    }
                },
                computed: {
                    optionsAllDisabled: function() {
                        return this.options.filter((function(e) {
                            return e.visible
                        }
                        )).every((function(e) {
                            return e.disabled
                        }
                        ))
                    }
                },
                watch: {
                    hoverIndex: function(e) {
                        var t = this;
                        "number" == typeof e && e > -1 && (this.hoverOption = this.options[e] || {}),
                        this.options.forEach((function(e) {
                            e.hover = t.hoverOption === e
                        }
                        ))
                    }
                },
                methods: {
                    navigateOptions: function(e) {
                        var t = this;
                        if (this.visible) {
                            if (0 !== this.options.length && 0 !== this.filteredOptionsCount && !this.optionsAllDisabled) {
                                "next" === e ? (this.hoverIndex++,
                                this.hoverIndex === this.options.length && (this.hoverIndex = 0)) : "prev" === e ? (this.hoverIndex--,
                                this.hoverIndex < 0 && (this.hoverIndex = this.options.length - 1)) : "home" === e ? this.hoverIndex = 0 : "end" === e && (this.hoverIndex = this.options.length - 1);
                                var n = this.options[this.hoverIndex];
                                !0 !== n.disabled && !0 !== n.groupDisabled && n.visible || this.navigateOptions(e),
                                this.$nextTick((function() {
                                    t.scrollToOption(t.hoverOption),
                                    t.hoverOption.optionId ? t.activedescendant = t.hoverOption.optionId : t.activedescendant = t.hoverOption.value
                                }
                                ))
                            }
                        } else
                            this.visible = !0
                    }
                }
            }],
            name: "ZmSelect",
            componentName: "ZmSelect",
            inject: {
                ZmForm: {
                    default: ""
                },
                ZmFormItem: {
                    default: ""
                }
            },
            provide: function() {
                return {
                    select: this
                }
            },
            computed: {
                _elFormItemSize: function() {
                    return (this.ZmFormItem || {}).elFormItemSize
                },
                readonly: function() {
                    var e = !this.$isServer && !isNaN(Number(document.documentMode));
                    return !this.filterable || this.multiple || !e && !this.visible
                },
                iconClass: function() {
                    return this.clearable && !this.selectDisabled && this.inputHovering && !this.multiple && void 0 !== this.value && null !== this.value && "" !== this.value ? "error is-show-close" : this.remote && this.filterable ? "" : "up"
                },
                debounce: function() {
                    return this.remote ? 300 : 0
                },
                toggleText: function() {
                    return this.visible ? this.t("el.select.hideOptions") : this.t("el.select.showOptions")
                },
                emptyText: function() {
                    return this.loading ? this.loadingText || this.t("el.select.loading") : !(this.remote && !this.firstQuery && "" === this.query && 0 === this.options.length) && (this.filterable && this.query && this.options.length > 0 && 0 === this.filteredOptionsCount ? this.noMatchText || this.t("el.select.noMatch") : 0 === this.options.length ? this.noDataText || this.t("el.select.noData") : null)
                },
                showNewOption: function() {
                    var e = this
                      , t = this.options.filter((function(e) {
                        return !e.created
                    }
                    )).some((function(t) {
                        return t.currentLabel === e.query
                    }
                    ));
                    return this.filterable && this.allowCreate && "" !== this.query && !t
                },
                selectSize: function() {
                    return this.size || this._elFormItemSize || (this.$ELEMENT || {}).size
                },
                selectDisabled: function() {
                    return this.disabled || (this.ZmForm || {}).disabled
                },
                collapseTagSize: function() {
                    return ["small", "mini"].indexOf(this.selectSize) > -1 ? "mini" : "small"
                }
            },
            components: {
                ZmInput: ie,
                ZmSelectDropdown: At,
                ZmOption: jt,
                ZmTag: Rt,
                ZmScrollbar: ze
            },
            directives: {
                Clickoutside: fe
            },
            props: {
                name: String,
                id: String,
                value: {
                    required: !0
                },
                autocomplete: {
                    type: String,
                    default: "off"
                },
                ariaRequired: {
                    type: Boolean,
                    default: !1
                },
                autoComplete: {
                    type: String,
                    validator: function(e) {
                        return !0
                    }
                },
                automaticDropdown: Boolean,
                size: String,
                disabled: Boolean,
                clearable: Boolean,
                filterable: Boolean,
                allowCreate: Boolean,
                loading: Boolean,
                popperClass: String,
                remote: Boolean,
                firstQuery: Boolean,
                loadingText: String,
                noMatchText: String,
                noDataText: String,
                remoteMethod: Function,
                filterMethod: Function,
                widthLimit: {
                    type: Boolean,
                    default: !1
                },
                multiple: Boolean,
                multipleLimit: {
                    type: Number,
                    default: 0
                },
                placeholder: {
                    type: String,
                    default: function() {
                        return Et("el.select.placeholder")
                    }
                },
                defaultFirstOption: Boolean,
                reserveKeyword: Boolean,
                valueKey: {
                    type: String,
                    default: "value"
                },
                collapseTags: Boolean,
                popperAppendToBody: {
                    type: Boolean,
                    default: !0
                },
                listLabel: String,
                listLabelBy: String,
                label: String,
                labelBy: String,
                popperOptions: {
                    default: function() {
                        return {
                            gpuAcceleration: !1
                        }
                    }
                }
            },
            data: function() {
                return {
                    options: [],
                    cachedOptions: [],
                    createdLabel: null,
                    createdSelected: !1,
                    selected: this.multiple ? [] : {},
                    inputLength: 20,
                    inputWidth: 0,
                    initialInputHeight: 0,
                    cachedPlaceHolder: "",
                    optionsCount: 0,
                    filteredOptionsCount: 0,
                    visible: !1,
                    softFocus: !1,
                    selectedLabel: "",
                    hoverIndex: -1,
                    query: "",
                    previousQuery: null,
                    inputHovering: !1,
                    currentPlaceholder: "",
                    menuVisibleOnFocus: !1,
                    isOnComposition: !1,
                    isSilentBlur: !1,
                    activedescendant: "",
                    isInputFucus: !1,
                    firstFocusElm: null,
                    listId: this.id ? this.id + "-popup-list" : "select-menu-" + B()
                }
            },
            watch: {
                selectDisabled: function() {
                    var e = this;
                    this.$nextTick((function() {
                        e.resetInputHeight()
                    }
                    ))
                },
                placeholder: function(e) {
                    this.cachedPlaceHolder = this.currentPlaceholder = e
                },
                value: function(e, t) {
                    this.multiple && (this.resetInputHeight(),
                    e.length > 0 || this.$refs.input && "" !== this.query ? this.currentPlaceholder = "" : this.currentPlaceholder = this.cachedPlaceHolder,
                    this.filterable && !this.reserveKeyword && (this.query = "",
                    this.handleQueryChange(this.query))),
                    this.setSelected(),
                    this.filterable && !this.multiple && (this.inputLength = 20),
                    P(e, t) || this.dispatch("ZmFormItem", "el.form.change", e)
                },
                visible: function(e) {
                    var t = this;
                    e ? (this.handleIconShow(),
                    this.broadcast("ZmSelectDropdown", "updatePopper"),
                    this.filterable && (this.query = this.selectedLabel,
                    this.handleQueryChange(this.query),
                    this.multiple ? this.$refs.input.focus() : (this.remote || (this.broadcast("ZmOption", "queryChange", ""),
                    this.broadcast("ZmOptionGroup", "queryChange")),
                    this.broadcast("ZmInput", "inputSelect")))) : (this.handleIconHide(),
                    this.broadcast("ZmSelectDropdown", "destroyPopper"),
                    this.$refs.input && this.$refs.input.blur(),
                    this.query = "",
                    this.previousQuery = null,
                    this.selectedLabel = "",
                    this.inputLength = 20,
                    this.resetHoverIndex(),
                    this.$nextTick((function() {
                        t.$refs.input && "" === t.$refs.input.value && 0 === t.selected.length && (t.currentPlaceholder = t.cachedPlaceHolder)
                    }
                    )),
                    this.multiple || this.selected && (this.filterable && this.allowCreate && this.createdSelected && this.createdLabel ? this.selectedLabel = this.createdLabel : this.selectedLabel = this.selected.currentLabel,
                    this.filterable && (this.query = this.selectedLabel))),
                    this.$emit("visible-change", e)
                },
                options: function() {
                    var e = this;
                    if (!this.$isServer) {
                        this.$nextTick((function() {
                            e.broadcast("ZmSelectDropdown", "updatePopper")
                        }
                        )),
                        this.multiple && this.resetInputHeight();
                        var t = this.$el.querySelectorAll("input");
                        -1 === [].indexOf.call(t, document.activeElement) && this.setSelected(),
                        this.defaultFirstOption && (this.filterable || this.remote) && this.filteredOptionsCount && this.checkDefaultFirstOption()
                    }
                }
            },
            methods: {
                handleComposition: function(e) {
                    var t = e.target.value;
                    if ("compositionend" === e.type)
                        this.isOnComposition = !1,
                        this.handleQueryChange(t);
                    else {
                        var n = t[t.length - 1] || "";
                        this.isOnComposition = !function(e) {
                            return /([(\uAC00-\uD7AF)|(\u3130-\u318F)])+/gi.test(e)
                        }(n)
                    }
                },
                handleQueryChange: function(e) {
                    var t = this;
                    if (this.previousQuery !== e && !this.isOnComposition)
                        if (null !== this.previousQuery || "function" != typeof this.filterMethod && "function" != typeof this.remoteMethod || this.firstQuery && "" === e) {
                            if (this.previousQuery = e,
                            this.$nextTick((function() {
                                t.visible && t.broadcast("ZmSelectDropdown", "updatePopper")
                            }
                            )),
                            this.hoverIndex = -1,
                            this.multiple && this.filterable) {
                                var n = 15 * this.$refs.input.value.length + 20;
                                this.inputLength = this.collapseTags ? Math.min(50, n) : n,
                                this.managePlaceholder(),
                                this.resetInputHeight()
                            }
                            this.remote && "function" == typeof this.remoteMethod ? (this.hoverIndex = -1,
                            this.remoteMethod(e)) : "function" == typeof this.filterMethod ? (this.filterMethod(e),
                            this.broadcast("ZmOptionGroup", "queryChange")) : (this.filteredOptionsCount = this.optionsCount,
                            this.broadcast("ZmOption", "queryChange", e),
                            this.broadcast("ZmOptionGroup", "queryChange")),
                            this.defaultFirstOption && (this.filterable || this.remote) && this.filteredOptionsCount && this.checkDefaultFirstOption()
                        } else
                            this.previousQuery = e
                },
                handleIconHide: function() {
                    var e = this.$el.querySelector(".zm-input__icon");
                    e && p(e, "is-reverse")
                },
                handleIconShow: function() {
                    var e = this.$el.querySelector(".zm-input__icon");
                    e && !h(e, "zm-icon-outline-error") && f(e, "is-reverse")
                },
                scrollToOption: function(e) {
                    var t = Array.isArray(e) && e[0] ? e[0].$el : e.$el;
                    this.$refs.popper && t && function(e, t) {
                        if (!o)
                            if (t) {
                                for (var n = [], i = t.offsetParent; i && e !== i && e.contains(i); )
                                    n.push(i),
                                    i = i.offsetParent;
                                var r = t.offsetTop + n.reduce((function(e, t) {
                                    return e + t.offsetTop
                                }
                                ), 0)
                                  , s = r + t.offsetHeight
                                  , a = e.scrollTop
                                  , l = a + e.clientHeight;
                                r < a ? e.scrollTop = r : s > l && (e.scrollTop = s - e.clientHeight)
                            } else
                                e.scrollTop = 0
                    }(this.$refs.popper.$el.querySelector(".zm-select-dropdown__wrap"), t);
                    this.$refs.scrollbar && this.$refs.scrollbar.handleScroll()
                },
                handleMenuEnter: function() {
                    var e = this;
                    this.resetHoverIndex(),
                    this.filterable || this.$nextTick((function() {
                        e.scrollToOption(e.selected)
                    }
                    ))
                },
                handleMenuLeave: function() {
                    this.hoverIndex = -1,
                    this.filterable
                },
                emitChange: function(e) {
                    P(this.value, e) || this.$emit("change", e)
                },
                getOption: function(e) {
                    for (var t = void 0, n = "[object object]" === Object.prototype.toString.call(e).toLowerCase(), i = "[object null]" === Object.prototype.toString.call(e).toLowerCase(), o = this.cachedOptions.length - 1; o >= 0; o--) {
                        var r = this.cachedOptions[o];
                        if (n ? I(r.value, this.valueKey) === I(e, this.valueKey) : r.value === e) {
                            t = r;
                            break
                        }
                    }
                    if (t)
                        return t;
                    var s = {
                        value: e,
                        currentLabel: n || i ? "" : e
                    };
                    return this.multiple && (s.hitState = !1),
                    s
                },
                setSelected: function() {
                    var e = this;
                    if (!this.multiple) {
                        var t = this.getOption(this.value);
                        return t.created ? (this.createdLabel = t.currentLabel,
                        this.createdSelected = !0) : this.createdSelected = !1,
                        this.selectedLabel = t.currentLabel,
                        this.selected = t,
                        void (this.filterable && (this.query = this.selectedLabel))
                    }
                    var n = [];
                    Array.isArray(this.value) && this.value.forEach((function(t) {
                        n.push(e.getOption(t))
                    }
                    )),
                    this.selected = n,
                    this.$nextTick((function() {
                        e.resetInputHeight()
                    }
                    ))
                },
                handleFocus: function(e) {
                    this.isInputFucus = !0,
                    this.softFocus ? this.softFocus = !1 : ((this.automaticDropdown || this.filterable) && (this.visible = !0,
                    this.menuVisibleOnFocus = !0),
                    this.$emit("focus", e))
                },
                focus: function() {
                    this.visible = !0,
                    this.menuVisibleOnFocus = !0,
                    this.$refs.referenceInner.focus(),
                    this.handleMenuEnter()
                },
                blur: function() {
                    this.visible = !1,
                    this.$refs.referenceInner.blur()
                },
                handleBlur: function(e) {
                    var t = this;
                    this.isInputFucus = !1,
                    setTimeout((function() {
                        t.isSilentBlur ? t.isSilentBlur = !1 : t.$emit("blur", e)
                    }
                    ), 50),
                    this.softFocus = !1
                },
                handleIconClick: function(e) {
                    this.selectDisabled || (this.iconClass.indexOf("up") > -1 && (this.visible = !this.visible,
                    this.visible && (this.$refs.input || this.$refs.referenceInner).focus()),
                    this.iconClass.indexOf("error") > -1 && this.deleteSelected(e))
                },
                handleEsc: function() {
                    this.visible = !1,
                    this.$refs.referenceInner.blur()
                },
                doDestroy: function() {
                    this.$refs.popper && this.$refs.popper.doDestroy()
                },
                handleClose: function() {
                    this.visible = !1
                },
                toggleLastOptionHitState: function(e) {
                    if (Array.isArray(this.selected)) {
                        var t = this.selected[this.selected.length - 1];
                        if (t)
                            return !0 === e || !1 === e ? (t.hitState = e,
                            e) : (t.hitState = !t.hitState,
                            t.hitState)
                    }
                },
                deletePrevTag: function(e) {
                    if (e.target.value.length <= 0 && !this.toggleLastOptionHitState()) {
                        var t = this.value.slice();
                        t.pop(),
                        this.$emit("input", t),
                        this.emitChange(t)
                    }
                },
                managePlaceholder: function() {
                    "" !== this.currentPlaceholder && (this.currentPlaceholder = this.$refs.input.value ? "" : this.cachedPlaceHolder)
                },
                resetInputState: function(e) {
                    8 !== e.keyCode && this.toggleLastOptionHitState(!1),
                    this.inputLength = 15 * this.$refs.input.value.length + 20,
                    this.resetInputHeight()
                },
                resetInputHeight: function() {
                    var e = this;
                    this.collapseTags && !this.filterable || this.$nextTick((function() {
                        if (e.$refs.reference) {
                            var t = e.$refs.referenceInner
                              , n = e.$refs.tags
                              , i = Ht[e.selectSize] || 30;
                            t.style.height = 0 === e.selected.length ? i + "px" : Math.max(n ? n.clientHeight + (n.clientHeight > i ? 6 : 0) : 0, i) + "px",
                            e.visible && !1 !== e.emptyText && e.broadcast("ZmSelectDropdown", "updatePopper")
                        }
                    }
                    ))
                },
                resetHoverIndex: function() {
                    var e = this;
                    this.multiple ? this.selected.length > 0 ? this.hoverIndex = Math.min.apply(null, this.selected.map((function(t) {
                        return e.options.indexOf(t)
                    }
                    ))) : this.hoverIndex = -1 : this.hoverIndex = this.options.indexOf(this.selected)
                },
                handleOptionSelect: function(e, t) {
                    var n = this;
                    if (this.firstFocusElm = e.$refs.optionLi,
                    this.multiple) {
                        var i = this.value.slice()
                          , o = this.getValueIndex(i, e.value);
                        o > -1 ? i.splice(o, 1) : (this.multipleLimit <= 0 || i.length < this.multipleLimit) && i.push(e.value),
                        this.$emit("input", i),
                        this.emitChange(i),
                        e.created && (this.query = "",
                        this.handleQueryChange(""),
                        this.inputLength = 20),
                        this.filterable && this.$refs.input.focus()
                    } else
                        this.$emit("input", e.value),
                        this.emitChange(e.value),
                        this.$nextTick((function() {
                            n.visible = !1
                        }
                        ));
                    e.optionId ? this.activedescendant = e.optionId : this.activedescendant = e.value,
                    this.isSilentBlur = t,
                    this.setSoftFocus(),
                    this.visible || this.$nextTick((function() {
                        n.scrollToOption(e)
                    }
                    ))
                },
                setSoftFocus: function() {
                    this.softFocus = !0;
                    var e = this.$refs.input || this.$refs.referenceInner;
                    e && e.focus()
                },
                getValueIndex: function() {
                    var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : []
                      , t = arguments[1]
                      , n = "[object object]" === Object.prototype.toString.call(t).toLowerCase();
                    if (n) {
                        var i = this.valueKey
                          , o = -1;
                        return e.some((function(e, n) {
                            return I(e, i) === I(t, i) && (o = n,
                            !0)
                        }
                        )),
                        o
                    }
                    return e.indexOf(t)
                },
                toggleMenu: function() {
                    this.selectDisabled || (this.menuVisibleOnFocus ? this.menuVisibleOnFocus = !1 : this.visible = !0,
                    this.visible && (this.$refs.input || this.$refs.referenceInner).focus())
                },
                selectOption: function() {
                    this.visible ? this.options[this.hoverIndex] && this.handleOptionSelect(this.options[this.hoverIndex]) : this.toggleMenu()
                },
                deleteSelected: function(e) {
                    e.stopPropagation(),
                    this.$emit("input", ""),
                    this.emitChange(""),
                    this.visible = !1,
                    this.$emit("clear")
                },
                deleteTag: function(e, t) {
                    var n = this.selected.indexOf(t);
                    if (n > -1 && !this.selectDisabled) {
                        var i = this.value.slice();
                        i.splice(n, 1),
                        this.$emit("input", i),
                        this.emitChange(i),
                        this.$emit("remove-tag", t.value)
                    }
                    e.stopPropagation()
                },
                onInputChange: function() {
                    this.filterable && this.query !== this.selectedLabel && (this.query = this.selectedLabel,
                    this.handleQueryChange(this.query))
                },
                onOptionDestroy: function(e) {
                    e > -1 && (this.optionsCount--,
                    this.filteredOptionsCount--,
                    this.options.splice(e, 1))
                },
                resetInputWidth: function() {
                    this.inputWidth = this.$refs.reference.getBoundingClientRect().width
                },
                handleResize: function() {
                    this.resetInputWidth(),
                    this.multiple && this.resetInputHeight()
                },
                checkDefaultFirstOption: function() {
                    this.hoverIndex = -1;
                    for (var e = !1, t = this.options.length - 1; t >= 0; t--)
                        if (this.options[t].created) {
                            e = !0,
                            this.hoverIndex = t;
                            break
                        }
                    if (!e)
                        for (var n = 0; n !== this.options.length; ++n) {
                            var i = this.options[n];
                            if (this.query) {
                                if (!i.disabled && !i.groupDisabled && i.visible) {
                                    this.hoverIndex = n;
                                    break
                                }
                            } else if (i.itemSelected) {
                                this.hoverIndex = n;
                                break
                            }
                        }
                },
                getValueKey: function(e) {
                    return "[object object]" !== Object.prototype.toString.call(e.value).toLowerCase() ? e.value : I(e.value, this.valueKey)
                }
            },
            created: function() {
                var e = this;
                this.cachedPlaceHolder = this.currentPlaceholder = this.placeholder,
                this.multiple && !Array.isArray(this.value) && this.$emit("input", []),
                !this.multiple && Array.isArray(this.value) && this.$emit("input", ""),
                this.debouncedOnInputChange = J()(this.debounce, (function(t) {
                    var n = j.keys
                      , i = t.keyCode;
                    Object.keys(n).some((function(e) {
                        if (n[e] === i)
                            return !0
                    }
                    )) || e.onInputChange()
                }
                )),
                this.debouncedQueryChange = J()(this.debounce, (function(t) {
                    e.handleQueryChange(t.target.value)
                }
                )),
                this.$on("handleOptionClick", this.handleOptionSelect),
                this.$on("setSelected", this.setSelected)
            },
            mounted: function() {
                var e = this;
                this.multiple && Array.isArray(this.value) && this.value.length > 0 && (this.currentPlaceholder = ""),
                we(this.$el, this.handleResize);
                var t = this.$refs.reference;
                t && (this.initialInputHeight = t.getBoundingClientRect().height),
                this.remote && this.multiple && this.resetInputHeight(),
                this.$nextTick((function() {
                    t && (e.inputWidth = t.getBoundingClientRect().width)
                }
                )),
                this.setSelected(),
                this.value && (this.activedescendant = this.value)
            },
            beforeDestroy: function() {
                this.$el && this.handleResize && xe(this.$el, this.handleResize),
                this.handleMenuLeave()
            }
        }
          , Vt = (n(78),
        V(Gt, (function() {
            var e = this
              , t = e.$createElement
              , n = e._self._c || t;
            return n("div", {
                directives: [{
                    name: "clickoutside",
                    rawName: "v-clickoutside",
                    value: e.handleClose,
                    expression: "handleClose"
                }],
                staticClass: "zm-select",
                class: [e.selectSize ? "zm-select--" + e.selectSize : "", e.widthLimit ? "zm-select-width-limit" : ""],
                on: {
                    click: function(t) {
                        return t.stopPropagation(),
                        e.toggleMenu(t)
                    },
                    keydown: function(t) {
                        return "button"in t || !e._k(t.keyCode, "enter", 13, t.key, "Enter") ? (t.preventDefault(),
                        e.toggleMenu(t)) : null
                    }
                }
            }, [e.multiple ? n("div", {
                ref: "tags",
                staticClass: "zm-select__tags",
                style: {
                    "max-width": e.inputWidth - 25 + "px"
                }
            }, [e.collapseTags && e.selected.length ? n("span", [n("zm-tag", {
                attrs: {
                    closable: !e.selectDisabled,
                    size: e.collapseTagSize,
                    hit: e.selected[0].hitState,
                    type: "info",
                    "disable-transitions": ""
                },
                on: {
                    close: function(t) {
                        e.deleteTag(t, e.selected[0])
                    }
                }
            }, [n("span", {
                staticClass: "zm-select__tags-text"
            }, [e._v(e._s(e.selected[0].currentLabel))])]), e.selected.length > 1 ? n("zm-tag", {
                attrs: {
                    closable: !1,
                    size: e.collapseTagSize,
                    type: "info",
                    "disable-transitions": ""
                }
            }, [n("span", {
                staticClass: "zm-select__tags-text"
            }, [e._v("+ " + e._s(e.selected.length - 1))])]) : e._e()], 1) : e._e(), e.collapseTags ? e._e() : n("transition-group", {
                on: {
                    "after-leave": e.resetInputHeight
                }
            }, e._l(e.selected, (function(t) {
                return n("zm-tag", {
                    key: e.getValueKey(t),
                    attrs: {
                        closable: !e.selectDisabled,
                        size: e.collapseTagSize,
                        hit: t.hitState,
                        type: "info",
                        "disable-transitions": ""
                    },
                    on: {
                        close: function(n) {
                            e.deleteTag(n, t)
                        }
                    }
                }, [n("span", {
                    staticClass: "zm-select__tags-text"
                }, [e._v(e._s(t.currentLabel))])])
            }
            )), 1), e.filterable ? n("input", {
                directives: [{
                    name: "model",
                    rawName: "v-model",
                    value: e.query,
                    expression: "query"
                }],
                ref: "input",
                staticClass: "zm-select__input",
                class: [e.selectSize ? "is-" + e.selectSize : ""],
                style: {
                    width: e.inputLength + "px",
                    "max-width": e.inputWidth - 42 + "px"
                },
                attrs: {
                    type: "text",
                    "aria-required": e.ariaRequired,
                    disabled: e.selectDisabled,
                    autocomplete: e.autoComplete || e.autocomplete
                },
                domProps: {
                    value: e.query
                },
                on: {
                    focus: e.handleFocus,
                    blur: function(t) {
                        e.softFocus = !1
                    },
                    click: function(e) {
                        e.stopPropagation()
                    },
                    keydown: [function(t) {
                        if (!("button"in t) && e._k(t.keyCode, "down", 40, t.key, ["Down", "ArrowDown"]))
                            return null;
                        t.preventDefault(),
                        e.navigateOptions("next")
                    }
                    , function(t) {
                        if (!("button"in t) && e._k(t.keyCode, "up", 38, t.key, ["Up", "ArrowUp"]))
                            return null;
                        t.preventDefault(),
                        e.navigateOptions("prev")
                    }
                    , function(t) {
                        return "button"in t || !e._k(t.keyCode, "enter", 13, t.key, "Enter") ? (t.preventDefault(),
                        e.selectOption(t)) : null
                    }
                    , function(t) {
                        if (!("button"in t) && e._k(t.keyCode, "esc", 27, t.key, ["Esc", "Escape"]))
                            return null;
                        t.stopPropagation(),
                        t.preventDefault(),
                        e.visible = !1
                    }
                    , e.resetInputState, function(t) {
                        return "button"in t || !e._k(t.keyCode, "delete", [8, 46], t.key, ["Backspace", "Delete", "Del"]) ? e.deletePrevTag(t) : null
                    }
                    ],
                    keyup: e.managePlaceholder,
                    compositionstart: e.handleComposition,
                    compositionupdate: e.handleComposition,
                    compositionend: e.handleComposition,
                    input: [function(t) {
                        t.target.composing || (e.query = t.target.value)
                    }
                    , e.debouncedQueryChange]
                },
                nativeOn: {
                    keydown: [function(t) {
                        if (!("button"in t) && e._k(t.keyCode, "home", void 0, t.key, void 0))
                            return null;
                        t.stopPropagation(),
                        t.preventDefault(),
                        e.navigateOptions("home")
                    }
                    , function(t) {
                        if (!("button"in t) && e._k(t.keyCode, "end", void 0, t.key, void 0))
                            return null;
                        t.stopPropagation(),
                        t.preventDefault(),
                        e.navigateOptions("end")
                    }
                    ]
                }
            }) : e._e()], 1) : e._e(), n("div", {
                ref: "reference",
                staticClass: "zm-select-input",
                class: {
                    "is-focus": e.visible || e.isInputFucus,
                    "is-disabled": e.selectDisabled,
                    "has-slot": e.$slots.prefix
                },
                on: {
                    mouseenter: function(t) {
                        e.inputHovering = !0
                    },
                    mouseleave: function(t) {
                        e.inputHovering = !1
                    }
                }
            }, [e.$slots.prefix ? n("template", {
                staticClass: "zm-select-prefix",
                slot: "prefix"
            }, [e._t("prefix")], 2) : e._e(), n("input", {
                directives: [{
                    name: "model",
                    rawName: "v-model",
                    value: e.selectedLabel,
                    expression: "selectedLabel"
                }],
                ref: "referenceInner",
                staticClass: "zm-select-input__inner",
                attrs: {
                    role: "combobox",
                    "aria-owns": e.id + "-popup-list",
                    "aria-activedescendant": e.visible ? e.activedescendant : null,
                    "aria-controls": e.id + "-popup-list",
                    "aria-autocomplete": "both",
                    "aria-required": e.ariaRequired,
                    "aria-expanded": (e.visible && !1 !== e.emptyText).toString(),
                    "aria-haspopup": "true",
                    type: "text",
                    placeholder: e.currentPlaceholder,
                    name: e.name,
                    readonly: e.readonly,
                    id: e.id,
                    disabled: e.selectDisabled,
                    "aria-label": e.label,
                    "aria-labelledby": e.labelBy,
                    "validate-event": !1
                },
                domProps: {
                    value: e.selectedLabel
                },
                on: {
                    focus: e.handleFocus,
                    blur: e.handleBlur,
                    keydown: [function(t) {
                        if (!("button"in t) && e._k(t.keyCode, "down", 40, t.key, ["Down", "ArrowDown"]))
                            return null;
                        t.stopPropagation(),
                        t.preventDefault(),
                        e.navigateOptions("next")
                    }
                    , function(t) {
                        if (!("button"in t) && e._k(t.keyCode, "up", 38, t.key, ["Up", "ArrowUp"]))
                            return null;
                        t.stopPropagation(),
                        t.preventDefault(),
                        e.navigateOptions("prev")
                    }
                    , function(t) {
                        if (!("button"in t) && e._k(t.keyCode, "home", void 0, t.key, void 0))
                            return null;
                        t.stopPropagation(),
                        t.preventDefault(),
                        e.navigateOptions("home")
                    }
                    , function(t) {
                        if (!("button"in t) && e._k(t.keyCode, "end", void 0, t.key, void 0))
                            return null;
                        t.stopPropagation(),
                        t.preventDefault(),
                        e.navigateOptions("end")
                    }
                    , function(t) {
                        return "button"in t || !e._k(t.keyCode, "enter", 13, t.key, "Enter") ? (t.stopPropagation(),
                        t.preventDefault(),
                        e.selectOption(t)) : null
                    }
                    , function(t) {
                        return "button"in t || !e._k(t.keyCode, "space", 32, t.key, [" ", "Spacebar"]) ? (t.stopPropagation(),
                        t.preventDefault(),
                        e.selectOption(t)) : null
                    }
                    , function(t) {
                        return "button"in t || !e._k(t.keyCode, "esc", 27, t.key, ["Esc", "Escape"]) ? (t.stopPropagation(),
                        t.preventDefault(),
                        e.handleEsc(t)) : null
                    }
                    , function(t) {
                        if (!("button"in t) && e._k(t.keyCode, "tab", 9, t.key, "Tab"))
                            return null;
                        e.visible = !1
                    }
                    ],
                    keyup: e.debouncedOnInputChange,
                    paste: e.debouncedOnInputChange,
                    input: function(t) {
                        t.target.composing || (e.selectedLabel = t.target.value)
                    }
                }
            }), n("button", {
                staticClass: "zm-select-toggle",
                attrs: {
                    tabindex: "-1",
                    type: "button",
                    "aria-label": e.toggleText
                },
                on: {
                    click: function(t) {
                        return t.stopPropagation(),
                        e.handleIconClick(t)
                    }
                }
            }, [n("i", {
                class: ["zm-select__caret", "zm-input__icon", "zm-icon-" + e.iconClass]
            })])], 2), n("transition", {
                attrs: {
                    name: "zm-zoom-in-top"
                },
                on: {
                    "after-enter": e.handleMenuEnter,
                    "after-leave": e.handleMenuLeave
                }
            }, [n("zm-select-dropdown", {
                directives: [{
                    name: "show",
                    rawName: "v-show",
                    value: e.visible && !1 !== e.emptyText,
                    expression: "visible && emptyText !== false"
                }],
                ref: "popper",
                class: {
                    "zm-select-menu-width-limit": e.widthLimit
                },
                attrs: {
                    "append-to-body": e.popperAppendToBody,
                    "width-limit": e.widthLimit,
                    "popper-options": e.popperOptions
                }
            }, [n("zm-scrollbar", {
                directives: [{
                    name: "show",
                    rawName: "v-show",
                    value: e.options.length > 0 && !e.loading,
                    expression: "options.length > 0 && !loading"
                }],
                ref: "scrollbar",
                class: {
                    "is-empty": !e.allowCreate && e.query && 0 === e.filteredOptionsCount
                },
                attrs: {
                    "wrap-class": "zm-select-dropdown__wrap"
                }
            }, [n("ul", {
                staticClass: "zm-select-dropdown__list",
                attrs: {
                    role: "listbox",
                    tabindex: "-1",
                    "aria-label": e.listLabel,
                    "aria-labelledby": e.listLabelBy,
                    id: e.listId
                }
            }, [e.showNewOption ? n("zm-option", {
                attrs: {
                    value: e.query,
                    created: "",
                    "option-id": e.query,
                    "is-menu-show": e.visible,
                    "width-limit": e.widthLimit
                }
            }) : e._e(), e._t("default")], 2)]), e.emptyText && (!e.allowCreate || e.loading || e.allowCreate && 0 === e.options.length) ? [e.$slots.empty ? e._t("empty") : n("p", {
                staticClass: "zm-select-dropdown__empty"
            }, [e._v("\n          " + e._s(e.emptyText) + "\n        ")])] : e._e()], 2)], 1)], 1)
        }
        ), [], !1, null, null, null).exports)
          , Ut = {
            mixins: [N],
            name: "ZmOptionGroup",
            componentName: "ZmOptionGroup",
            props: {
                label: String,
                disabled: {
                    type: Boolean,
                    default: !1
                }
            },
            data: function() {
                return {
                    visible: !0
                }
            },
            watch: {
                disabled: function(e) {
                    this.broadcast("ZmOption", "handleGroupDisabled", e)
                }
            },
            methods: {
                queryChange: function() {
                    this.visible = this.$children && Array.isArray(this.$children) && this.$children.some((function(e) {
                        return !0 === e.visible
                    }
                    ))
                }
            },
            created: function() {
                this.$on("queryChange", this.queryChange)
            },
            mounted: function() {
                this.disabled && this.broadcast("ZmOption", "handleGroupDisabled", this.disabled)
            }
        }
          , Wt = (n(79),
        V(Ut, (function() {
            var e = this.$createElement
              , t = this._self._c || e;
            return t("ul", {
                directives: [{
                    name: "show",
                    rawName: "v-show",
                    value: this.visible,
                    expression: "visible"
                }],
                staticClass: "zm-select-group__wrap"
            }, [t("li", {
                staticClass: "zm-select-group__title"
            }, [this._v(this._s(this.label))]), t("li", [t("ul", {
                staticClass: "zm-select-group"
            }, [this._t("default")], 2)])])
        }
        ), [], !1, null, null, null).exports);
        Vt.install = function(e) {
            e.component(Vt.name, Vt),
            e.component(jt.name, jt),
            e.component(Wt.name, Wt)
        }
        ;
        var Kt = Vt
          , Jt = {
            name: "ZmPopover",
            mixins: [ve],
            props: {
                trigger: {
                    type: String,
                    default: "click",
                    validator: function(e) {
                        return ["click", "focus", "hover", "manual"].indexOf(e) > -1
                    }
                },
                openDelay: {
                    type: Number,
                    default: 0
                },
                title: String,
                disabled: Boolean,
                content: String,
                reference: {},
                popperClass: String,
                width: {},
                visibleArrow: {
                    default: !0
                },
                arrowOffset: {
                    type: Number,
                    default: 0
                },
                transition: {
                    type: String,
                    default: "fade-in-linear"
                }
            },
            computed: {
                tooltipId: function() {
                    return "zm-popover-" + B()
                }
            },
            watch: {
                showPopper: function(e) {
                    this.disabled || (e ? this.$emit("show") : this.$emit("hide"))
                }
            },
            mounted: function() {
                var e = this
                  , t = this.referenceElm = this.reference || this.$refs.reference
                  , n = this.popper || this.$refs.popper;
                !t && this.$slots.reference && this.$slots.reference[0] && (t = this.referenceElm = this.$slots.reference[0].elm),
                t && (f(t, "zm-popover__reference"),
                t.setAttribute("aria-describedby", this.tooltipId),
                t.setAttribute("tabindex", 0),
                n.setAttribute("tabindex", 0),
                "click" !== this.trigger && (c(t, "focusin", (function() {
                    e.handleFocus();
                    var n = t.__vue__;
                    n && "function" == typeof n.focus && n.focus()
                }
                )),
                c(n, "focusin", this.handleFocus),
                c(t, "focusout", this.handleBlur),
                c(n, "focusout", this.handleBlur)),
                c(t, "keydown", this.handleKeydown),
                c(t, "click", this.handleClick)),
                "click" === this.trigger ? (c(t, "click", this.doToggle),
                c(document, "click", this.handleDocumentClick)) : "hover" === this.trigger ? (c(t, "mouseenter", this.handleMouseEnter),
                c(n, "mouseenter", this.handleMouseEnter),
                c(t, "mouseleave", this.handleMouseLeave),
                c(n, "mouseleave", this.handleMouseLeave)) : "focus" === this.trigger && (t.querySelector("input, textarea") ? (c(t, "focusin", this.doShow),
                c(t, "focusout", this.doClose)) : (c(t, "mousedown", this.doShow),
                c(t, "mouseup", this.doClose)))
            },
            methods: {
                doToggle: function() {
                    this.showPopper = !this.showPopper
                },
                doShow: function() {
                    this.showPopper = !0
                },
                doClose: function() {
                    this.showPopper = !1
                },
                handleFocus: function() {
                    f(this.referenceElm, "focusing"),
                    "manual" !== this.trigger && (this.showPopper = !0)
                },
                handleClick: function() {
                    p(this.referenceElm, "focusing")
                },
                handleBlur: function() {
                    p(this.referenceElm, "focusing"),
                    "manual" !== this.trigger && (this.showPopper = !1)
                },
                handleMouseEnter: function() {
                    var e = this;
                    clearTimeout(this._timer),
                    this.openDelay ? this._timer = setTimeout((function() {
                        e.showPopper = !0
                    }
                    ), this.openDelay) : this.showPopper = !0
                },
                handleKeydown: function(e) {
                    27 === e.keyCode && "manual" !== this.trigger && this.doClose()
                },
                handleMouseLeave: function() {
                    var e = this;
                    clearTimeout(this._timer),
                    this._timer = setTimeout((function() {
                        e.showPopper = !1
                    }
                    ), 200)
                },
                handleDocumentClick: function(e) {
                    var t = this.reference || this.$refs.reference
                      , n = this.popper || this.$refs.popper;
                    !t && this.$slots.reference && this.$slots.reference[0] && (t = this.referenceElm = this.$slots.reference[0].elm),
                    this.$el && t && !this.$el.contains(e.target) && !t.contains(e.target) && n && !n.contains(e.target) && (this.showPopper = !1)
                },
                handleAfterEnter: function() {
                    this.$emit("after-enter")
                },
                handleAfterLeave: function() {
                    this.$emit("after-leave"),
                    this.doDestroy()
                }
            },
            destroyed: function() {
                var e = this.reference;
                d(e, "click", this.doToggle),
                d(e, "mouseup", this.doClose),
                d(e, "mousedown", this.doShow),
                d(e, "focusin", this.doShow),
                d(e, "focusout", this.doClose),
                d(e, "mousedown", this.doShow),
                d(e, "mouseup", this.doClose),
                d(e, "mouseleave", this.handleMouseLeave),
                d(e, "mouseenter", this.handleMouseEnter),
                d(document, "click", this.handleDocumentClick)
            }
        }
          , Yt = (n(80),
        V(Jt, (function() {
            var e = this
              , t = e.$createElement
              , n = e._self._c || t;
            return n("span", [n("transition", {
                attrs: {
                    name: e.transition
                },
                on: {
                    "after-enter": e.handleAfterEnter,
                    "after-leave": e.handleAfterLeave
                }
            }, [n("div", {
                directives: [{
                    name: "show",
                    rawName: "v-show",
                    value: !e.disabled && e.showPopper,
                    expression: "!disabled && showPopper"
                }],
                ref: "popper",
                staticClass: "zm-popover zm-popper",
                class: [e.popperClass, e.content && "zm-popover--plain"],
                style: {
                    width: e.width + "px"
                },
                attrs: {
                    role: "tooltip",
                    id: e.tooltipId,
                    "aria-hidden": e.disabled || !e.showPopper ? "true" : "false"
                }
            }, [e.title ? n("div", {
                staticClass: "zm-popover__title",
                domProps: {
                    textContent: e._s(e.title)
                }
            }) : e._e(), e._t("default", [e._v(e._s(e.content))])], 2)]), e._t("reference")], 2)
        }
        ), [], !1, null, null, null).exports)
          , Qt = function(e, t, n) {
            var i = t.expression ? t.value : t.arg
              , o = n.context.$refs[i];
            o && (Array.isArray(o) ? o[0].$refs.reference = e : o.$refs.reference = e)
        }
          , Xt = {
            bind: function(e, t, n) {
                Qt(e, t, n)
            },
            inserted: function(e, t, n) {
                Qt(e, t, n)
            }
        };
        Yt.install = function(e) {
            e.directive("popover", Xt),
            e.component(Yt.name, Yt)
        }
        ,
        Yt.directive = Xt;
        var en = Yt
          , tn = B()
          , nn = void 0
          , on = {
            success: "success",
            info: "info",
            warning: "warning",
            error: "error"
        }
          , rn = {
            mixins: [T, Ft],
            props: {
                modal: {
                    default: !0
                },
                lockScroll: {
                    default: !0
                },
                showClose: {
                    type: Boolean,
                    default: !1
                },
                closeOnClickModal: {
                    default: !0
                },
                closeOnPressEscape: {
                    default: !0
                },
                closeOnHashChange: {
                    default: !0
                },
                center: {
                    default: !1,
                    type: Boolean
                },
                roundButton: {
                    default: !1,
                    type: Boolean
                }
            },
            components: {
                ZmInput: ie,
                ZmButton: Pe
            },
            computed: {
                icon: function() {
                    var e = this.type;
                    return this.iconClass || (e && on[e] ? "zm-icon-" + on[e] : "")
                },
                confirmButtonClasses: function() {
                    return "zm-button--primary " + this.confirmButtonClass
                },
                cancelButtonClasses: function() {
                    return "" + this.cancelButtonClass
                }
            },
            methods: {
                getSafeClose: function() {
                    var e = this
                      , t = this.uid;
                    return function() {
                        e.$nextTick((function() {
                            t === e.uid && e.doClose()
                        }
                        ))
                    }
                },
                doClose: function() {
                    var e = this;
                    this.visible && (this.visible = !1,
                    this._closing = !0,
                    this.onClose && this.onClose(),
                    nn.closeDialog(),
                    this.lockScroll && setTimeout(this.restoreBodyStyle, 200),
                    this.opened = !1,
                    this.doAfterClose(),
                    setTimeout((function() {
                        e.action && e.callback(e.action, e)
                    }
                    )))
                },
                handleWrapperClick: function() {
                    this.closeOnClickModal && this.handleAction(this.distinguishCancelAndClose ? "close" : "cancel")
                },
                handleInputEnter: function() {
                    if ("textarea" !== this.inputType)
                        return this.handleAction("confirm")
                },
                handleAction: function(e) {
                    ("prompt" !== this.$type || "confirm" !== e || this.validate()) && (this.action = e,
                    "function" == typeof this.beforeClose ? (this.close = this.getSafeClose(),
                    this.beforeClose(e, this, this.close)) : this.doClose())
                },
                validate: function() {
                    if ("prompt" === this.$type) {
                        var e = this.inputPattern;
                        if (e && !e.test(this.inputValue || ""))
                            return this.editorErrorMessage = this.inputErrorMessage || Et("el.messagebox.error"),
                            f(this.getInputElement(), "invalid"),
                            !1;
                        var t = this.inputValidator;
                        if ("function" == typeof t) {
                            var n = t(this.inputValue);
                            if (!1 === n)
                                return this.editorErrorMessage = this.inputErrorMessage || Et("el.messagebox.error"),
                                f(this.getInputElement(), "invalid"),
                                !1;
                            if ("string" == typeof n)
                                return this.editorErrorMessage = n,
                                f(this.getInputElement(), "invalid"),
                                !1
                        }
                    }
                    return this.editorErrorMessage = "",
                    p(this.getInputElement(), "invalid"),
                    !0
                },
                getFirstFocus: function() {
                    var e = this.$el.querySelector(".zm-message-box__btns .zm-button")
                      , t = this.$el.querySelector(".zm-message-box__btns .zm-message-box__title");
                    return e || t
                },
                getInputElement: function() {
                    var e = this.$refs.input.$refs;
                    return e.input || e.textarea
                }
            },
            watch: {
                inputValue: {
                    immediate: !0,
                    handler: function(e) {
                        var t = this;
                        this.$nextTick((function(n) {
                            "prompt" === t.$type && null !== e && t.validate()
                        }
                        ))
                    }
                },
                visible: function(e) {
                    var t = this;
                    e && (this.uid++,
                    "alert" !== this.$type && "confirm" !== this.$type || this.$nextTick((function() {
                        t.$refs.confirm.$el.focus()
                    }
                    )),
                    this.focusAfterClosed = document.activeElement,
                    nn = new H(this.$el,this.focusAfterClosed,this.getFirstFocus())),
                    "prompt" === this.$type && (e ? setTimeout((function() {
                        t.$refs.input && t.$refs.input.$el && t.getInputElement().focus()
                    }
                    ), 500) : (this.editorErrorMessage = "",
                    p(this.getInputElement(), "invalid")))
                }
            },
            mounted: function() {
                var e = this;
                this.$nextTick((function() {
                    e.closeOnHashChange && window.addEventListener("hashchange", e.close)
                }
                ))
            },
            beforeDestroy: function() {
                this.closeOnHashChange && window.removeEventListener("hashchange", this.close),
                setTimeout((function() {
                    nn.closeDialog()
                }
                ))
            },
            data: function() {
                return {
                    uid: 1,
                    title: void 0,
                    message: "",
                    type: "",
                    iconClass: "",
                    customClass: "",
                    showInput: !1,
                    inputValue: null,
                    inputPlaceholder: "",
                    inputType: "text",
                    inputPattern: null,
                    inputValidator: null,
                    inputErrorMessage: "",
                    showConfirmButton: !0,
                    showCancelButton: !1,
                    action: "",
                    confirmButtonText: "",
                    cancelButtonText: "",
                    confirmButtonLoading: !1,
                    cancelButtonLoading: !1,
                    confirmButtonClass: "",
                    confirmButtonDisabled: !1,
                    cancelButtonClass: "",
                    editorErrorMessage: null,
                    callback: null,
                    dangerouslyUseHTMLString: !1,
                    focusAfterClosed: null,
                    isOnComposition: !1,
                    distinguishCancelAndClose: !1,
                    dialogTitleId: "message-box-title-" + tn,
                    dialogContentId: "message-box-content-" + tn
                }
            }
        }
          , sn = (n(81),
        V(rn, (function() {
            var e = this
              , t = e.$createElement
              , n = e._self._c || t;
            return n("transition", {
                attrs: {
                    name: "msgbox-fade"
                }
            }, [n("div", {
                directives: [{
                    name: "show",
                    rawName: "v-show",
                    value: e.visible,
                    expression: "visible"
                }],
                staticClass: "zm-message-box__wrapper",
                attrs: {
                    tabindex: "-1",
                    role: "dialog",
                    "aria-modal": "true",
                    "aria-labelledby": e.dialogTitleId,
                    "aria-describedby": e.dialogContentId
                },
                on: {
                    click: function(t) {
                        return t.target !== t.currentTarget ? null : e.handleWrapperClick(t)
                    }
                }
            }, [n("div", {
                staticClass: "zm-message-box",
                class: [e.customClass, e.center && "zm-message-box--center"]
            }, [null !== e.title ? n("div", {
                staticClass: "zm-message-box__header"
            }, [n("div", {
                staticClass: "zm-message-box__title"
            }, [e.icon && e.center ? n("div", {
                class: ["zm-message-box__status", e.icon]
            }) : e._e(), n("span", {
                attrs: {
                    id: e.dialogTitleId
                }
            }, [e._v(e._s(e.title))])]), e.showClose ? n("button", {
                staticClass: "zm-message-box__headerbtn",
                attrs: {
                    type: "button",
                    "aria-label": "Close"
                },
                on: {
                    click: function(t) {
                        e.handleAction(e.distinguishCancelAndClose ? "close" : "cancel")
                    },
                    keydown: function(t) {
                        if (!("button"in t) && e._k(t.keyCode, "enter", 13, t.key, "Enter"))
                            return null;
                        e.handleAction(e.distinguishCancelAndClose ? "close" : "cancel")
                    }
                }
            }, [n("i", {
                staticClass: "zm-message-box__close zm-icon-close"
            })]) : e._e()]) : e._e(), n("div", {
                staticClass: "zm-message-box__content"
            }, [e.icon && !e.center && "" !== e.message ? n("div", {
                class: ["zm-message-box__status", e.icon]
            }) : e._e(), "" !== e.message ? n("div", {
                staticClass: "zm-message-box__message",
                attrs: {
                    id: e.dialogContentId
                }
            }, [e._t("default", [e.dangerouslyUseHTMLString ? n("p", {
                domProps: {
                    innerHTML: e._s(e.message)
                }
            }) : n("p", [e._v(e._s(e.message))])])], 2) : e._e(), n("div", {
                directives: [{
                    name: "show",
                    rawName: "v-show",
                    value: e.showInput,
                    expression: "showInput"
                }],
                staticClass: "zm-message-box__input"
            }, [n("zm-input", {
                ref: "input",
                attrs: {
                    type: e.inputType,
                    "label-by": e.dialogTitleId,
                    placeholder: e.inputPlaceholder
                },
                nativeOn: {
                    keydown: function(t) {
                        return "button"in t || !e._k(t.keyCode, "enter", 13, t.key, "Enter") ? e.handleInputEnter(t) : null
                    }
                },
                model: {
                    value: e.inputValue,
                    callback: function(t) {
                        e.inputValue = t
                    },
                    expression: "inputValue"
                }
            }), n("div", {
                staticClass: "zm-message-box__errormsg",
                style: {
                    visibility: e.editorErrorMessage ? "visible" : "hidden"
                }
            }, [e._v("\n            " + e._s(e.editorErrorMessage) + "\n          ")])], 1)]), n("div", {
                staticClass: "zm-message-box__btns"
            }, [n("zm-button", {
                directives: [{
                    name: "show",
                    rawName: "v-show",
                    value: e.showConfirmButton,
                    expression: "showConfirmButton"
                }],
                ref: "confirm",
                class: [e.confirmButtonClasses],
                attrs: {
                    loading: e.confirmButtonLoading,
                    round: e.roundButton
                },
                on: {
                    keydown: function(t) {
                        if (!("button"in t) && e._k(t.keyCode, "enter", 13, t.key, "Enter"))
                            return null;
                        e.handleAction("confirm")
                    }
                },
                nativeOn: {
                    click: function(t) {
                        e.handleAction("confirm")
                    }
                }
            }, [e._v("\n          " + e._s(e.confirmButtonText || e.t("el.messagebox.confirm")) + "\n        ")]), e.showCancelButton ? n("zm-button", {
                class: [e.cancelButtonClasses],
                attrs: {
                    loading: e.cancelButtonLoading,
                    round: e.roundButton,
                    plain: ""
                },
                on: {
                    keydown: function(t) {
                        if (!("button"in t) && e._k(t.keyCode, "enter", 13, t.key, "Enter"))
                            return null;
                        e.handleAction("cancel")
                    }
                },
                nativeOn: {
                    click: function(t) {
                        e.handleAction("cancel")
                    }
                }
            }, [e._v("\n          " + e._s(e.cancelButtonText || e.t("el.messagebox.cancel")) + "\n        ")]) : e._e()], 1)])])])
        }
        ), [], !1, null, null, null).exports)
          , an = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
            return typeof e
        }
        : function(e) {
            return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
        }
        ;
        function ln(e) {
            return null !== e && "object" === (void 0 === e ? "undefined" : an(e)) && A(e, "componentOptions")
        }
        var un = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
            return typeof e
        }
        : function(e) {
            return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
        }
          , cn = {
            title: null,
            message: "",
            type: "",
            iconClass: "",
            showInput: !1,
            showClose: !1,
            modalFade: !0,
            lockScroll: !0,
            closeOnClickModal: !0,
            closeOnPressEscape: !0,
            closeOnHashChange: !0,
            inputValue: null,
            inputPlaceholder: "",
            inputType: "text",
            inputPattern: null,
            inputValidator: null,
            inputErrorMessage: "",
            showConfirmButton: !0,
            showCancelButton: !1,
            confirmButtonPosition: "right",
            confirmButtonHighlight: !1,
            cancelButtonHighlight: !1,
            confirmButtonText: "",
            cancelButtonText: "",
            confirmButtonClass: "",
            cancelButtonClass: "",
            customClass: "",
            beforeClose: null,
            dangerouslyUseHTMLString: !1,
            center: !1,
            roundButton: !1,
            distinguishCancelAndClose: !1
        }
          , dn = void 0
          , hn = void 0
          , fn = []
          , pn = function(e) {
            if (dn) {
                var t = dn.callback;
                "function" == typeof t && (hn.showInput ? t(hn.inputValue, e) : t(e)),
                dn.resolve && ("confirm" === e ? hn.showInput ? dn.resolve({
                    value: hn.inputValue,
                    action: e
                }) : dn.resolve(e) : !dn.reject || "cancel" !== e && "close" !== e || dn.reject(e))
            }
        }
          , mn = function e() {
            var t;
            if (hn || (t = bn.extend(sn),
            (hn = new t({
                el: document.createElement("div")
            })).callback = pn),
            hn.action = "",
            (!hn.visible || hn.closeTimer) && fn.length > 0) {
                var n = (dn = fn.shift()).options;
                for (var i in n)
                    n.hasOwnProperty(i) && (hn[i] = n[i]);
                void 0 === n.callback && (hn.callback = pn);
                var o = hn.callback;
                hn.callback = function(t, n) {
                    o(t, n),
                    e()
                }
                ,
                ln(hn.message) ? (hn.$slots.default = [hn.message],
                hn.message = null) : delete hn.$slots.default,
                ["modal", "showClose", "closeOnClickModal", "closeOnPressEscape", "closeOnHashChange"].forEach((function(e) {
                    void 0 === hn[e] && (hn[e] = !0)
                }
                )),
                document.body.appendChild(hn.$el),
                bn.nextTick((function() {
                    hn.visible = !0
                }
                ))
            }
        }
          , vn = function e(t, n) {
            if (!o) {
                if ("string" == typeof t || ln(t) ? (t = {
                    message: t
                },
                "string" == typeof arguments[1] && (t.title = arguments[1])) : t.callback && !n && (n = t.callback),
                "undefined" != typeof Promise)
                    return new Promise((function(o, r) {
                        fn.push({
                            options: i({}, cn, e.defaults, t),
                            callback: n,
                            resolve: o,
                            reject: r
                        }),
                        mn()
                    }
                    ));
                fn.push({
                    options: i({}, cn, e.defaults, t),
                    callback: n
                }),
                mn()
            }
        };
        vn.setDefaults = function(e) {
            vn.defaults = e
        }
        ,
        vn.alert = function(e, t, n) {
            return "object" === (void 0 === t ? "undefined" : un(t)) ? (n = t,
            t = "") : void 0 === t && (t = ""),
            vn(i({
                title: t,
                message: e,
                $type: "alert",
                closeOnPressEscape: !1,
                closeOnClickModal: !1
            }, n))
        }
        ,
        vn.confirm = function(e, t, n) {
            return "object" === (void 0 === t ? "undefined" : un(t)) ? (n = t,
            t = "") : void 0 === t && (t = ""),
            vn(i({
                title: t,
                message: e,
                $type: "confirm",
                showCancelButton: !0
            }, n))
        }
        ,
        vn.prompt = function(e, t, n) {
            return "object" === (void 0 === t ? "undefined" : un(t)) ? (n = t,
            t = "") : void 0 === t && (t = ""),
            vn(i({
                title: t,
                message: e,
                showCancelButton: !0,
                showInput: !0,
                $type: "prompt"
            }, n))
        }
        ,
        vn.close = function() {
            hn.doClose(),
            hn.visible = !1,
            fn = [],
            dn = null
        }
        ;
        var gn = vn
          , bn = void 0
          , yn = {
            install: function(e) {
                bn = e,
                e.prototype.$msgbox = gn,
                e.prototype.$alert = gn.alert,
                e.prototype.$confirm = gn.confirm,
                e.prototype.$prompt = gn.prompt
            }
        }
          , wn = {
            name: "ZmBreadcrumb",
            props: {
                separator: {
                    type: String,
                    default: "/"
                },
                separatorClass: {
                    type: String,
                    default: ""
                }
            },
            provide: function() {
                return {
                    ZmBreadcrumb: this
                }
            },
            mounted: function() {
                var e = this.$el.querySelectorAll(".zm-breadcrumb__item");
                e.length && e[e.length - 1].setAttribute("aria-current", "page")
            }
        }
          , xn = (n(82),
        V(wn, (function() {
            var e = this.$createElement;
            return (this._self._c || e)("div", {
                staticClass: "zm-breadcrumb",
                attrs: {
                    "aria-label": "Breadcrumb",
                    role: "navigation"
                }
            }, [this._t("default")], 2)
        }
        ), [], !1, null, null, null).exports)
          , kn = {
            name: "ZmBreadcrumbItem",
            props: {
                to: {},
                replace: Boolean
            },
            data: function() {
                return {
                    separator: "",
                    separatorClass: ""
                }
            },
            inject: ["ZmBreadcrumb"],
            mounted: function() {
                var e = this;
                this.separator = this.ZmBreadcrumb.separator,
                this.separatorClass = this.ZmBreadcrumb.separatorClass;
                var t = this.$refs.link;
                t.setAttribute("role", "link"),
                t.addEventListener("click", (function(t) {
                    var n = e.to
                      , i = e.$router;
                    n && i && (e.replace ? i.replace(n) : i.push(n))
                }
                ))
            }
        }
          , Cn = (n(83),
        V(kn, (function() {
            var e = this.$createElement
              , t = this._self._c || e;
            return t("span", {
                staticClass: "zm-breadcrumb__item"
            }, [t("span", {
                ref: "link",
                class: ["zm-breadcrumb__inner", this.to ? "is-link" : ""],
                attrs: {
                    role: "link"
                }
            }, [this._t("default")], 2), this.separatorClass ? t("i", {
                staticClass: "zm-breadcrumb__separator",
                class: this.separatorClass
            }) : t("span", {
                staticClass: "zm-breadcrumb__separator",
                attrs: {
                    role: "presentation"
                }
            }, [this._v(this._s(this.separator))])])
        }
        ), [], !1, null, null, null).exports);
        xn.install = function(e) {
            e.component(xn.name, xn),
            e.component(Cn.name, Cn)
        }
        ;
        var _n = xn
          , Sn = {
            name: "ZmForm",
            componentName: "ZmForm",
            provide: function() {
                return {
                    ZmForm: this
                }
            },
            props: {
                model: Object,
                rules: Object,
                labelPosition: String,
                labelWidth: String,
                labelSuffix: {
                    type: String,
                    default: ""
                },
                inline: Boolean,
                inlineMessage: Boolean,
                statusIcon: Boolean,
                showMessage: {
                    type: Boolean,
                    default: !0
                },
                size: String,
                disabled: Boolean,
                validateOnRuleChange: {
                    type: Boolean,
                    default: !0
                },
                hideRequiredAsterisk: {
                    type: Boolean,
                    default: !1
                }
            },
            watch: {
                rules: function() {
                    this.validateOnRuleChange && this.validate((function() {}
                    ))
                }
            },
            data: function() {
                return {
                    fields: []
                }
            },
            created: function() {
                var e = this;
                this.$on("el.form.addField", (function(t) {
                    t && e.fields.push(t)
                }
                )),
                this.$on("el.form.removeField", (function(t) {
                    t.prop && e.fields.splice(e.fields.indexOf(t), 1)
                }
                ))
            },
            methods: {
                resetFields: function() {
                    this.model ? this.fields.forEach((function(e) {
                        e.resetField()
                    }
                    )) : console.warn("[Element Warn][Form]model is required for resetFields to work.")
                },
                clearValidate: function() {
                    var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : []
                      , t = e.length ? "string" == typeof e ? this.fields.filter((function(t) {
                        return e === t.prop
                    }
                    )) : this.fields.filter((function(t) {
                        return e.indexOf(t.prop) > -1
                    }
                    )) : this.fields;
                    t.forEach((function(e) {
                        e.clearValidate()
                    }
                    ))
                },
                validate: function(e) {
                    var t = this;
                    if (this.model) {
                        var n = void 0;
                        "function" != typeof e && window.Promise && (n = new window.Promise((function(t, n) {
                            e = function(e) {
                                e ? t(e) : n(e)
                            }
                        }
                        )));
                        var o = !0
                          , r = 0;
                        0 === this.fields.length && e && e(!0);
                        var s = {};
                        return this.fields.forEach((function(n) {
                            n.validate("", (function(n, a) {
                                n && (o = !1),
                                s = i({}, s, a),
                                "function" == typeof e && ++r === t.fields.length && e(o, s)
                            }
                            ))
                        }
                        )),
                        n || void 0
                    }
                    console.warn("[Element Warn][Form]model is required for validate to work!")
                },
                validateField: function(e, t) {
                    e = [].concat(e);
                    var n = this.fields.filter((function(t) {
                        return -1 !== e.indexOf(t.prop)
                    }
                    ));
                    n.length ? n.forEach((function(e) {
                        e.validate("", t)
                    }
                    )) : confirm.warn("[Element Warn]please pass correct props!")
                }
            }
        }
          , On = (n(84),
        V(Sn, (function() {
            var e = this.$createElement;
            return (this._self._c || e)("form", {
                staticClass: "zm-form",
                class: [this.labelPosition ? "zm-form--label-" + this.labelPosition : "", {
                    "zm-form--inline": this.inline
                }]
            }, [this._t("default")], 2)
        }
        ), [], !1, null, null, null).exports)
          , Tn = n(5)
          , En = n.n(Tn)
          , zn = n(0)
          , Nn = n.n(zn)
          , Fn = /%[sdj%]/g
          , $n = function() {};
        function An() {
            for (var e = arguments.length, t = Array(e), n = 0; n < e; n++)
                t[n] = arguments[n];
            var i = 1
              , o = t[0]
              , r = t.length;
            if ("function" == typeof o)
                return o.apply(null, t.slice(1));
            if ("string" == typeof o) {
                for (var s = String(o).replace(Fn, (function(e) {
                    if ("%%" === e)
                        return "%";
                    if (i >= r)
                        return e;
                    switch (e) {
                    case "%s":
                        return String(t[i++]);
                    case "%d":
                        return Number(t[i++]);
                    case "%j":
                        try {
                            return JSON.stringify(t[i++])
                        } catch (e) {
                            return "[Circular]"
                        }
                        break;
                    default:
                        return e
                    }
                }
                )), a = t[i]; i < r; a = t[++i])
                    s += " " + a;
                return s
            }
            return o
        }
        function Ln(e, t) {
            return null == e || (!("array" !== t || !Array.isArray(e) || e.length) || !(!function(e) {
                return "string" === e || "url" === e || "hex" === e || "email" === e || "pattern" === e
            }(t) || "string" != typeof e || e))
        }
        function In(e, t, n) {
            var i = 0
              , o = e.length;
            !function r(s) {
                if (s && s.length)
                    n(s);
                else {
                    var a = i;
                    i += 1,
                    a < o ? t(e[a], r) : n([])
                }
            }([])
        }
        function Dn(e, t, n, i) {
            if (t.first)
                return In(function(e) {
                    var t = [];
                    return Object.keys(e).forEach((function(n) {
                        t.push.apply(t, e[n])
                    }
                    )),
                    t
                }(e), n, i);
            var o = t.firstFields || [];
            !0 === o && (o = Object.keys(e));
            var r = Object.keys(e)
              , s = r.length
              , a = 0
              , l = []
              , u = function(e) {
                l.push.apply(l, e),
                ++a === s && i(l)
            };
            r.forEach((function(t) {
                var i = e[t];
                -1 !== o.indexOf(t) ? In(i, n, u) : function(e, t, n) {
                    var i = []
                      , o = 0
                      , r = e.length;
                    function s(e) {
                        i.push.apply(i, e),
                        ++o === r && n(i)
                    }
                    e.forEach((function(e) {
                        t(e, s)
                    }
                    ))
                }(i, n, u)
            }
            ))
        }
        function Bn(e) {
            return function(t) {
                return t && t.message ? (t.field = t.field || e.fullField,
                t) : {
                    message: t,
                    field: t.field || e.fullField
                }
            }
        }
        function Pn(e, t) {
            if (t)
                for (var n in t)
                    if (t.hasOwnProperty(n)) {
                        var i = t[n];
                        "object" === (void 0 === i ? "undefined" : Nn()(i)) && "object" === Nn()(e[n]) ? e[n] = En()({}, e[n], i) : e[n] = i
                    }
            return e
        }
        var Mn = function(e, t, n, i, o, r) {
            !e.required || n.hasOwnProperty(e.field) && !Ln(t, r || e.type) || i.push(An(o.messages.required, e.fullField))
        };
        var jn = function(e, t, n, i, o) {
            (/^\s+$/.test(t) || "" === t) && i.push(An(o.messages.whitespace, e.fullField))
        }
          , qn = {
            email: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            url: new RegExp("^(?!mailto:)(?:(?:http|https|ftp)://|//)(?:\\S+(?::\\S*)?@)?(?:(?:(?:[1-9]\\d?|1\\d\\d|2[01]\\d|22[0-3])(?:\\.(?:1?\\d{1,2}|2[0-4]\\d|25[0-5])){2}(?:\\.(?:[0-9]\\d?|1\\d\\d|2[0-4]\\d|25[0-4]))|(?:(?:[a-z\\u00a1-\\uffff0-9]+-?)*[a-z\\u00a1-\\uffff0-9]+)(?:\\.(?:[a-z\\u00a1-\\uffff0-9]+-?)*[a-z\\u00a1-\\uffff0-9]+)*(?:\\.(?:[a-z\\u00a1-\\uffff]{2,})))|localhost)(?::\\d{2,5})?(?:(/|\\?|#)[^\\s]*)?$","i"),
            hex: /^#?([a-f0-9]{6}|[a-f0-9]{3})$/i
        }
          , Zn = {
            integer: function(e) {
                return Zn.number(e) && parseInt(e, 10) === e
            },
            float: function(e) {
                return Zn.number(e) && !Zn.integer(e)
            },
            array: function(e) {
                return Array.isArray(e)
            },
            regexp: function(e) {
                if (e instanceof RegExp)
                    return !0;
                try {
                    return !!new RegExp(e)
                } catch (e) {
                    return !1
                }
            },
            date: function(e) {
                return "function" == typeof e.getTime && "function" == typeof e.getMonth && "function" == typeof e.getYear
            },
            number: function(e) {
                return !isNaN(e) && "number" == typeof e
            },
            object: function(e) {
                return "object" === (void 0 === e ? "undefined" : Nn()(e)) && !Zn.array(e)
            },
            method: function(e) {
                return "function" == typeof e
            },
            email: function(e) {
                return "string" == typeof e && !!e.match(qn.email) && e.length < 255
            },
            url: function(e) {
                return "string" == typeof e && !!e.match(qn.url)
            },
            hex: function(e) {
                return "string" == typeof e && !!e.match(qn.hex)
            }
        };
        var Rn = function(e, t, n, i, o) {
            if (e.required && void 0 === t)
                Mn(e, t, n, i, o);
            else {
                var r = e.type;
                ["integer", "float", "array", "regexp", "object", "method", "email", "number", "date", "url", "hex"].indexOf(r) > -1 ? Zn[r](t) || i.push(An(o.messages.types[r], e.fullField, e.type)) : r && (void 0 === t ? "undefined" : Nn()(t)) !== e.type && i.push(An(o.messages.types[r], e.fullField, e.type))
            }
        };
        var Hn = "enum";
        var Gn = {
            required: Mn,
            whitespace: jn,
            type: Rn,
            range: function(e, t, n, i, o) {
                var r = "number" == typeof e.len
                  , s = "number" == typeof e.min
                  , a = "number" == typeof e.max
                  , l = t
                  , u = null
                  , c = "number" == typeof t
                  , d = "string" == typeof t
                  , h = Array.isArray(t);
                if (c ? u = "number" : d ? u = "string" : h && (u = "array"),
                !u)
                    return !1;
                h && (l = t.length),
                d && (l = t.replace(/[\uD800-\uDBFF][\uDC00-\uDFFF]/g, "_").length),
                r ? l !== e.len && i.push(An(o.messages[u].len, e.fullField, e.len)) : s && !a && l < e.min ? i.push(An(o.messages[u].min, e.fullField, e.min)) : a && !s && l > e.max ? i.push(An(o.messages[u].max, e.fullField, e.max)) : s && a && (l < e.min || l > e.max) && i.push(An(o.messages[u].range, e.fullField, e.min, e.max))
            },
            enum: function(e, t, n, i, o) {
                e[Hn] = Array.isArray(e[Hn]) ? e[Hn] : [],
                -1 === e[Hn].indexOf(t) && i.push(An(o.messages[Hn], e.fullField, e[Hn].join(", ")))
            },
            pattern: function(e, t, n, i, o) {
                if (e.pattern)
                    if (e.pattern instanceof RegExp)
                        e.pattern.lastIndex = 0,
                        e.pattern.test(t) || i.push(An(o.messages.pattern.mismatch, e.fullField, t, e.pattern));
                    else if ("string" == typeof e.pattern) {
                        new RegExp(e.pattern).test(t) || i.push(An(o.messages.pattern.mismatch, e.fullField, t, e.pattern))
                    }
            }
        };
        var Vn = "enum";
        var Un = function(e, t, n, i, o) {
            var r = e.type
              , s = [];
            if (e.required || !e.required && i.hasOwnProperty(e.field)) {
                if (Ln(t, r) && !e.required)
                    return n();
                Gn.required(e, t, i, s, o, r),
                Ln(t, r) || Gn.type(e, t, i, s, o)
            }
            n(s)
        }
          , Wn = {
            string: function(e, t, n, i, o) {
                var r = [];
                if (e.required || !e.required && i.hasOwnProperty(e.field)) {
                    if (Ln(t, "string") && !e.required)
                        return n();
                    Gn.required(e, t, i, r, o, "string"),
                    Ln(t, "string") || (Gn.type(e, t, i, r, o),
                    Gn.range(e, t, i, r, o),
                    Gn.pattern(e, t, i, r, o),
                    !0 === e.whitespace && Gn.whitespace(e, t, i, r, o))
                }
                n(r)
            },
            method: function(e, t, n, i, o) {
                var r = [];
                if (e.required || !e.required && i.hasOwnProperty(e.field)) {
                    if (Ln(t) && !e.required)
                        return n();
                    Gn.required(e, t, i, r, o),
                    void 0 !== t && Gn.type(e, t, i, r, o)
                }
                n(r)
            },
            number: function(e, t, n, i, o) {
                var r = [];
                if (e.required || !e.required && i.hasOwnProperty(e.field)) {
                    if (Ln(t) && !e.required)
                        return n();
                    Gn.required(e, t, i, r, o),
                    void 0 !== t && (Gn.type(e, t, i, r, o),
                    Gn.range(e, t, i, r, o))
                }
                n(r)
            },
            boolean: function(e, t, n, i, o) {
                var r = [];
                if (e.required || !e.required && i.hasOwnProperty(e.field)) {
                    if (Ln(t) && !e.required)
                        return n();
                    Gn.required(e, t, i, r, o),
                    void 0 !== t && Gn.type(e, t, i, r, o)
                }
                n(r)
            },
            regexp: function(e, t, n, i, o) {
                var r = [];
                if (e.required || !e.required && i.hasOwnProperty(e.field)) {
                    if (Ln(t) && !e.required)
                        return n();
                    Gn.required(e, t, i, r, o),
                    Ln(t) || Gn.type(e, t, i, r, o)
                }
                n(r)
            },
            integer: function(e, t, n, i, o) {
                var r = [];
                if (e.required || !e.required && i.hasOwnProperty(e.field)) {
                    if (Ln(t) && !e.required)
                        return n();
                    Gn.required(e, t, i, r, o),
                    void 0 !== t && (Gn.type(e, t, i, r, o),
                    Gn.range(e, t, i, r, o))
                }
                n(r)
            },
            float: function(e, t, n, i, o) {
                var r = [];
                if (e.required || !e.required && i.hasOwnProperty(e.field)) {
                    if (Ln(t) && !e.required)
                        return n();
                    Gn.required(e, t, i, r, o),
                    void 0 !== t && (Gn.type(e, t, i, r, o),
                    Gn.range(e, t, i, r, o))
                }
                n(r)
            },
            array: function(e, t, n, i, o) {
                var r = [];
                if (e.required || !e.required && i.hasOwnProperty(e.field)) {
                    if (Ln(t, "array") && !e.required)
                        return n();
                    Gn.required(e, t, i, r, o, "array"),
                    Ln(t, "array") || (Gn.type(e, t, i, r, o),
                    Gn.range(e, t, i, r, o))
                }
                n(r)
            },
            object: function(e, t, n, i, o) {
                var r = [];
                if (e.required || !e.required && i.hasOwnProperty(e.field)) {
                    if (Ln(t) && !e.required)
                        return n();
                    Gn.required(e, t, i, r, o),
                    void 0 !== t && Gn.type(e, t, i, r, o)
                }
                n(r)
            },
            enum: function(e, t, n, i, o) {
                var r = [];
                if (e.required || !e.required && i.hasOwnProperty(e.field)) {
                    if (Ln(t) && !e.required)
                        return n();
                    Gn.required(e, t, i, r, o),
                    t && Gn[Vn](e, t, i, r, o)
                }
                n(r)
            },
            pattern: function(e, t, n, i, o) {
                var r = [];
                if (e.required || !e.required && i.hasOwnProperty(e.field)) {
                    if (Ln(t, "string") && !e.required)
                        return n();
                    Gn.required(e, t, i, r, o),
                    Ln(t, "string") || Gn.pattern(e, t, i, r, o)
                }
                n(r)
            },
            date: function(e, t, n, i, o) {
                var r = [];
                if (e.required || !e.required && i.hasOwnProperty(e.field)) {
                    if (Ln(t) && !e.required)
                        return n();
                    if (Gn.required(e, t, i, r, o),
                    !Ln(t)) {
                        var s = void 0;
                        s = "number" == typeof t ? new Date(t) : t,
                        Gn.type(e, s, i, r, o),
                        s && Gn.range(e, s.getTime(), i, r, o)
                    }
                }
                n(r)
            },
            url: Un,
            hex: Un,
            email: Un,
            required: function(e, t, n, i, o) {
                var r = []
                  , s = Array.isArray(t) ? "array" : void 0 === t ? "undefined" : Nn()(t);
                Gn.required(e, t, i, r, o, s),
                n(r)
            }
        };
        function Kn() {
            return {
                default: "Validation error on field %s",
                required: "%s is required",
                enum: "%s must be one of %s",
                whitespace: "%s cannot be empty",
                date: {
                    format: "%s date %s is invalid for format %s",
                    parse: "%s date could not be parsed, %s is invalid ",
                    invalid: "%s date %s is invalid"
                },
                types: {
                    string: "%s is not a %s",
                    method: "%s is not a %s (function)",
                    array: "%s is not an %s",
                    object: "%s is not an %s",
                    number: "%s is not a %s",
                    date: "%s is not a %s",
                    boolean: "%s is not a %s",
                    integer: "%s is not an %s",
                    float: "%s is not a %s",
                    regexp: "%s is not a valid %s",
                    email: "%s is not a valid %s",
                    url: "%s is not a valid %s",
                    hex: "%s is not a valid %s"
                },
                string: {
                    len: "%s must be exactly %s characters",
                    min: "%s must be at least %s characters",
                    max: "%s cannot be longer than %s characters",
                    range: "%s must be between %s and %s characters"
                },
                number: {
                    len: "%s must equal %s",
                    min: "%s cannot be less than %s",
                    max: "%s cannot be greater than %s",
                    range: "%s must be between %s and %s"
                },
                array: {
                    len: "%s must be exactly %s in length",
                    min: "%s cannot be less than %s in length",
                    max: "%s cannot be greater than %s in length",
                    range: "%s must be between %s and %s in length"
                },
                pattern: {
                    mismatch: "%s value %s does not match pattern %s"
                },
                clone: function() {
                    var e = JSON.parse(JSON.stringify(this));
                    return e.clone = this.clone,
                    e
                }
            }
        }
        var Jn = Kn();
        function Yn(e) {
            this.rules = null,
            this._messages = Jn,
            this.define(e)
        }
        Yn.prototype = {
            messages: function(e) {
                return e && (this._messages = Pn(Kn(), e)),
                this._messages
            },
            define: function(e) {
                if (!e)
                    throw new Error("Cannot configure a schema with no rules");
                if ("object" !== (void 0 === e ? "undefined" : Nn()(e)) || Array.isArray(e))
                    throw new Error("Rules must be an object");
                this.rules = {};
                var t = void 0
                  , n = void 0;
                for (t in e)
                    e.hasOwnProperty(t) && (n = e[t],
                    this.rules[t] = Array.isArray(n) ? n : [n])
            },
            validate: function(e) {
                var t = this
                  , n = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {}
                  , i = arguments[2]
                  , o = e
                  , r = n
                  , s = i;
                if ("function" == typeof r && (s = r,
                r = {}),
                this.rules && 0 !== Object.keys(this.rules).length) {
                    if (r.messages) {
                        var a = this.messages();
                        a === Jn && (a = Kn()),
                        Pn(a, r.messages),
                        r.messages = a
                    } else
                        r.messages = this.messages();
                    var l = void 0
                      , u = void 0
                      , c = {}
                      , d = r.keys || Object.keys(this.rules);
                    d.forEach((function(n) {
                        l = t.rules[n],
                        u = o[n],
                        l.forEach((function(i) {
                            var r = i;
                            "function" == typeof r.transform && (o === e && (o = En()({}, o)),
                            u = o[n] = r.transform(u)),
                            (r = "function" == typeof r ? {
                                validator: r
                            } : En()({}, r)).validator = t.getValidationMethod(r),
                            r.field = n,
                            r.fullField = r.fullField || n,
                            r.type = t.getType(r),
                            r.validator && (c[n] = c[n] || [],
                            c[n].push({
                                rule: r,
                                value: u,
                                source: o,
                                field: n
                            }))
                        }
                        ))
                    }
                    ));
                    var h = {};
                    Dn(c, r, (function(e, t) {
                        var n = e.rule
                          , i = !("object" !== n.type && "array" !== n.type || "object" !== Nn()(n.fields) && "object" !== Nn()(n.defaultField));
                        function o(e, t) {
                            return En()({}, t, {
                                fullField: n.fullField + "." + e
                            })
                        }
                        function s() {
                            var s = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : [];
                            if (Array.isArray(s) || (s = [s]),
                            s.length && $n("async-validator:", s),
                            s.length && n.message && (s = [].concat(n.message)),
                            s = s.map(Bn(n)),
                            r.first && s.length)
                                return h[n.field] = 1,
                                t(s);
                            if (i) {
                                if (n.required && !e.value)
                                    return s = n.message ? [].concat(n.message).map(Bn(n)) : r.error ? [r.error(n, An(r.messages.required, n.field))] : [],
                                    t(s);
                                var a = {};
                                if (n.defaultField)
                                    for (var l in e.value)
                                        e.value.hasOwnProperty(l) && (a[l] = n.defaultField);
                                for (var u in a = En()({}, a, e.rule.fields))
                                    if (a.hasOwnProperty(u)) {
                                        var c = Array.isArray(a[u]) ? a[u] : [a[u]];
                                        a[u] = c.map(o.bind(null, u))
                                    }
                                var d = new Yn(a);
                                d.messages(r.messages),
                                e.rule.options && (e.rule.options.messages = r.messages,
                                e.rule.options.error = r.error),
                                d.validate(e.value, e.rule.options || r, (function(e) {
                                    t(e && e.length ? s.concat(e) : e)
                                }
                                ))
                            } else
                                t(s)
                        }
                        i = i && (n.required || !n.required && e.value),
                        n.field = e.field;
                        var a = n.validator(n, e.value, s, e.source, r);
                        a && a.then && a.then((function() {
                            return s()
                        }
                        ), (function(e) {
                            return s(e)
                        }
                        ))
                    }
                    ), (function(e) {
                        f(e)
                    }
                    ))
                } else
                    s && s();
                function f(e) {
                    var t, n = void 0, i = void 0, o = [], r = {};
                    for (n = 0; n < e.length; n++)
                        t = e[n],
                        Array.isArray(t) ? o = o.concat.apply(o, t) : o.push(t);
                    if (o.length)
                        for (n = 0; n < o.length; n++)
                            r[i = o[n].field] = r[i] || [],
                            r[i].push(o[n]);
                    else
                        o = null,
                        r = null;
                    s(o, r)
                }
            },
            getType: function(e) {
                if (void 0 === e.type && e.pattern instanceof RegExp && (e.type = "pattern"),
                "function" != typeof e.validator && e.type && !Wn.hasOwnProperty(e.type))
                    throw new Error(An("Unknown rule type %s", e.type));
                return e.type || "string"
            },
            getValidationMethod: function(e) {
                if ("function" == typeof e.validator)
                    return e.validator;
                var t = Object.keys(e)
                  , n = t.indexOf("message");
                return -1 !== n && t.splice(n, 1),
                1 === t.length && "required" === t[0] ? Wn.required : Wn[this.getType(e)] || !1
            }
        },
        Yn.register = function(e, t) {
            if ("function" != typeof t)
                throw new Error("Cannot register a validator by type, validator is not a function");
            Wn[e] = t
        }
        ,
        Yn.messages = Jn;
        var Qn = Yn
          , Xn = {
            name: "ZmFormItem",
            componentName: "ZmFormItem",
            mixins: [N],
            provide: function() {
                return {
                    ZmFormItem: this
                }
            },
            inject: ["ZmForm"],
            props: {
                label: String,
                labelWidth: String,
                prop: String,
                required: {
                    type: Boolean,
                    default: void 0
                },
                rules: [Object, Array],
                error: String,
                validateStatus: String,
                for: String,
                inlineMessage: {
                    type: [String, Boolean],
                    default: ""
                },
                showMessage: {
                    type: Boolean,
                    default: !0
                },
                size: String
            },
            watch: {
                error: {
                    immediate: !0,
                    handler: function(e) {
                        this.validateMessage = e,
                        this.validateState = e ? "error" : ""
                    }
                },
                validateStatus: function(e) {
                    this.validateState = e
                }
            },
            computed: {
                labelFor: function() {
                    return this.for || this.prop
                },
                labelStyle: function() {
                    var e = {};
                    if ("top" === this.form.labelPosition)
                        return e;
                    var t = this.labelWidth || this.form.labelWidth;
                    return t && (e.width = t),
                    e
                },
                contentStyle: function() {
                    var e = {}
                      , t = this.label;
                    if ("top" === this.form.labelPosition || this.form.inline)
                        return e;
                    if (!t && !this.labelWidth && this.isNested)
                        return e;
                    var n = this.labelWidth || this.form.labelWidth;
                    return n && (e.marginLeft = n),
                    e
                },
                form: function() {
                    for (var e = this.$parent, t = e.$options.componentName; "ZmForm" !== t; )
                        "ZmFormItem" === t && (this.isNested = !0),
                        t = (e = e.$parent).$options.componentName;
                    return e
                },
                fieldValue: function() {
                    var e = this.form.model;
                    if (e && this.prop) {
                        var t = this.prop;
                        return -1 !== t.indexOf(":") && (t = t.replace(/:/, ".")),
                        D(e, t, !0).v
                    }
                },
                isRequired: function() {
                    var e = this.getRules()
                      , t = !1;
                    return e && e.length && e.every((function(e) {
                        return !e.required || (t = !0,
                        !1)
                    }
                    )),
                    t
                },
                _formSize: function() {
                    return this.ZmForm.size
                },
                elFormItemSize: function() {
                    return this.size || this._formSize
                },
                sizeClass: function() {
                    return this.elFormItemSize || (this.$ELEMENT || {}).size
                }
            },
            data: function() {
                return {
                    validateState: "",
                    validateMessage: "",
                    validateDisabled: !1,
                    validator: {},
                    isNested: !1
                }
            },
            methods: {
                validate: function(e) {
                    var t = this
                      , n = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : $;
                    this.validateDisabled = !1;
                    var i = this.getFilteredRule(e);
                    if ((!i || 0 === i.length) && void 0 === this.required)
                        return n(),
                        !0;
                    this.validateState = "validating";
                    var o = {};
                    i && i.length > 0 && i.forEach((function(e) {
                        delete e.trigger
                    }
                    )),
                    o[this.prop] = i;
                    var r = new Qn(o)
                      , s = {};
                    s[this.prop] = this.fieldValue,
                    r.validate(s, {
                        firstFields: !0
                    }, (function(e, i) {
                        t.validateState = e ? "error" : "success",
                        t.validateMessage = e ? e[0].message : "",
                        n(t.validateMessage, i),
                        t.ZmForm && t.ZmForm.$emit("validate", t.prop, !e, t.validateMessage || null)
                    }
                    ))
                },
                clearValidate: function() {
                    this.validateState = "",
                    this.validateMessage = "",
                    this.validateDisabled = !1
                },
                resetField: function() {
                    this.validateState = "",
                    this.validateMessage = "";
                    var e = this.form.model
                      , t = this.fieldValue
                      , n = this.prop;
                    -1 !== n.indexOf(":") && (n = n.replace(/:/, "."));
                    var i = D(e, n, !0);
                    this.validateDisabled = !0,
                    Array.isArray(t) ? i.o[i.k] = [].concat(this.initialValue) : i.o[i.k] = this.initialValue,
                    this.broadcast("ZmTimeSelect", "fieldReset", this.initialValue)
                },
                getRules: function() {
                    var e = this.form.rules
                      , t = this.rules
                      , n = void 0 !== this.required ? {
                        required: !!this.required
                    } : []
                      , i = D(e, this.prop || "");
                    return e = e ? i.o[this.prop || ""] || i.v : [],
                    [].concat(t || e || []).concat(n)
                },
                getFilteredRule: function(e) {
                    return this.getRules().filter((function(t) {
                        return !t.trigger || "" === e || (Array.isArray(t.trigger) ? t.trigger.indexOf(e) > -1 : t.trigger === e)
                    }
                    )).map((function(e) {
                        return i({}, e)
                    }
                    ))
                },
                onFieldBlur: function() {
                    this.validate("blur")
                },
                onFieldChange: function() {
                    this.validateDisabled ? this.validateDisabled = !1 : this.validate("change")
                }
            },
            mounted: function() {
                if (this.prop) {
                    this.dispatch("ZmForm", "el.form.addField", [this]);
                    var e = this.fieldValue;
                    Array.isArray(e) && (e = [].concat(e)),
                    Object.defineProperty(this, "initialValue", {
                        value: e
                    }),
                    (this.getRules().length || void 0 !== this.required) && (this.$on("el.form.blur", this.onFieldBlur),
                    this.$on("el.form.change", this.onFieldChange))
                }
            },
            beforeDestroy: function() {
                this.dispatch("ZmForm", "el.form.removeField", [this])
            }
        }
          , ei = (n(117),
        V(Xn, (function() {
            var e = this
              , t = e.$createElement
              , n = e._self._c || t;
            return n("div", {
                staticClass: "zm-form-item",
                class: [{
                    "zm-form-item--feedback": e.ZmForm && e.ZmForm.statusIcon,
                    "is-error": "error" === e.validateState,
                    "is-validating": "validating" === e.validateState,
                    "is-success": "success" === e.validateState,
                    "is-required": e.isRequired || e.required,
                    "is-no-asterisk": e.ZmForm && e.ZmForm.hideRequiredAsterisk
                }, e.sizeClass ? "zm-form-item--" + e.sizeClass : ""]
            }, [e.label || e.$slots.label ? n("label", {
                staticClass: "zm-form-item__label",
                style: e.labelStyle,
                attrs: {
                    for: e.labelFor
                }
            }, [e._t("label", [e._v(e._s(e.label + e.form.labelSuffix))])], 2) : e._e(), n("div", {
                staticClass: "zm-form-item__content",
                style: e.contentStyle
            }, [e._t("default"), n("transition", {
                attrs: {
                    name: "zm-zoom-in-top"
                }
            }, ["error" === e.validateState && e.showMessage && e.form.showMessage ? e._t("error", [n("div", {
                staticClass: "zm-form-item__error",
                class: {
                    "zm-form-item__error--inline": "boolean" == typeof e.inlineMessage ? e.inlineMessage : e.ZmForm && e.ZmForm.inlineMessage || !1
                },
                attrs: {
                    role: "alert"
                }
            }, [e._v("\n          " + e._s(e.validateMessage) + "\n        ")])], {
                error: e.validateMessage
            }) : e._e()], 2)], 2)])
        }
        ), [], !1, null, null, null).exports);
        On.install = function(e) {
            e.component(On.name, On),
            e.component(ei.name, ei)
        }
        ;
        var ti = On;
        function ni() {}
        var ii = function(e) {
            return e.toLowerCase().replace(/( |^)[a-z]/g, (function(e) {
                return e.toUpperCase()
            }
            ))
        }
          , oi = {
            name: "ZmTabs",
            components: {
                TabNav: V({
                    name: "TabNav",
                    inject: ["rootTabs"],
                    props: {
                        panes: Array,
                        currentName: String,
                        editable: Boolean,
                        onTabClick: {
                            type: Function,
                            default: ni
                        },
                        onTabEnter: {
                            type: Function,
                            default: ni
                        },
                        onTabRemove: {
                            type: Function,
                            default: ni
                        },
                        type: String,
                        stretch: Boolean,
                        ariaLabel: String
                    },
                    data: function() {
                        return {
                            scrollable: !1,
                            navOffset: 0,
                            isFocus: !1,
                            focusable: !0
                        }
                    },
                    computed: {
                        navStyle: function() {
                            return {
                                transform: "translate" + (-1 !== ["top", "bottom"].indexOf(this.rootTabs.tabPosition) ? "X" : "Y") + "(-" + this.navOffset + "px)"
                            }
                        },
                        sizeName: function() {
                            return -1 !== ["top", "bottom"].indexOf(this.rootTabs.tabPosition) ? "width" : "height"
                        }
                    },
                    methods: {
                        scrollPrev: function() {
                            var e = this.$refs.navScroll["offset" + ii(this.sizeName)]
                              , t = this.navOffset;
                            if (t) {
                                var n = t > e ? t - e : 0;
                                this.navOffset = n
                            }
                        },
                        scrollNext: function() {
                            var e = this.$refs.nav["offset" + ii(this.sizeName)]
                              , t = this.$refs.navScroll["offset" + ii(this.sizeName)]
                              , n = this.navOffset;
                            if (!(e - n <= t)) {
                                var i = e - n > 2 * t ? n + t : e - t;
                                this.navOffset = i
                            }
                        },
                        scrollToActiveTab: function() {
                            if (this.scrollable) {
                                var e = this.$refs.nav
                                  , t = this.$el.querySelector(".is-active");
                                if (t) {
                                    var n = this.$refs.navScroll
                                      , i = t.getBoundingClientRect()
                                      , o = n.getBoundingClientRect()
                                      , r = e.offsetWidth - o.width
                                      , s = this.navOffset
                                      , a = s;
                                    i.left < o.left && (a = s - (o.left - i.left)),
                                    i.right > o.right && (a = s + i.right - o.right),
                                    a = Math.max(a, 0),
                                    this.navOffset = Math.min(a, r)
                                }
                            }
                        },
                        update: function() {
                            if (this.$refs.nav) {
                                var e = this.sizeName
                                  , t = this.$refs.nav["offset" + ii(e)]
                                  , n = this.$refs.navScroll["offset" + ii(e)]
                                  , i = this.navOffset;
                                if (n < t) {
                                    var o = this.navOffset;
                                    this.scrollable = this.scrollable || {},
                                    this.scrollable.prev = o,
                                    this.scrollable.next = o + n < t,
                                    t - o < n && (this.navOffset = t - n)
                                } else
                                    this.scrollable = !1,
                                    i > 0 && (this.navOffset = 0)
                            }
                        },
                        changeTab: function(e) {
                            var t = e.keyCode
                              , n = void 0
                              , i = void 0
                              , o = void 0;
                            -1 !== [35, 36, 37, 38, 39, 40].indexOf(t) && (o = e.currentTarget.querySelectorAll("[role=tab]"),
                            i = Array.prototype.indexOf.call(o, e.target),
                            37 === t || 38 === t ? n = 0 === i ? o.length - 1 : i - 1 : 39 === t || 40 === t ? n = i < o.length - 1 ? i + 1 : 0 : 36 === t ? n = 0 : 35 === t && (n = o.length - 1),
                            o[n].focus(),
                            e.preventDefault())
                        },
                        setFocus: function() {
                            this.focusable && (this.isFocus = !0)
                        },
                        removeFocus: function() {
                            this.isFocus = !1
                        },
                        keyDownHandler: function(e, t, n, i) {
                            13 === i.keyCode && this.onTabEnter(t, n, i),
                            !e || 46 !== i.keyCode && 8 !== i.keyCode || this.onTabRemove(t, i)
                        },
                        visibilityChangeHandler: function() {
                            var e = this
                              , t = document.visibilityState;
                            "hidden" === t ? this.focusable = !1 : "visible" === t && setTimeout((function() {
                                e.focusable = !0
                            }
                            ), 50)
                        },
                        windowBlurHandler: function() {
                            this.focusable = !1
                        },
                        windowFocusHandler: function() {
                            var e = this;
                            setTimeout((function() {
                                e.focusable = !0
                            }
                            ), 50)
                        }
                    },
                    updated: function() {
                        this.update()
                    },
                    render: function(e) {
                        var t = this
                          , n = this.panes
                          , i = this.editable
                          , o = this.stretch
                          , r = this.onTabClick
                          , s = this.keyDownHandler
                          , a = this.onTabRemove
                          , l = this.navStyle
                          , u = this.scrollable
                          , c = this.scrollNext
                          , d = this.scrollPrev
                          , h = this.changeTab
                          , f = this.setFocus
                          , p = this.removeFocus
                          , m = this.ariaLabel
                          , v = u ? [e("span", {
                            class: ["zm-tabs__nav-prev", u.prev ? "" : "is-disabled"],
                            on: {
                                click: d
                            }
                        }, [e("i", {
                            class: "zm-icon-left"
                        })]), e("span", {
                            class: ["zm-tabs__nav-next", u.next ? "" : "is-disabled"],
                            on: {
                                click: c
                            }
                        }, [e("i", {
                            class: "zm-icon-right"
                        })])] : null
                          , g = this._l(n, (function(n, o) {
                            var l, u = n.name || n.index || o, c = n.isClosable || i;
                            n.index = "" + o;
                            var d = c ? e("span", {
                                class: "zm-icon-close",
                                on: {
                                    click: function(e) {
                                        a(n, e)
                                    }
                                }
                            }) : null
                              , h = n.$slots.label || n.label
                              , m = n.active ? 0 : -1;
                            return e("div", {
                                class: (l = {
                                    "zm-tabs__item": !0
                                },
                                l["is-" + t.rootTabs.tabPosition] = !0,
                                l["is-active"] = n.active,
                                l["is-disabled"] = n.disabled,
                                l["is-closable"] = c,
                                l),
                                attrs: {
                                    id: "tab-" + u,
                                    "aria-controls": "pane-" + u,
                                    role: "tab",
                                    "aria-selected": n.active.toString(),
                                    tabindex: m
                                },
                                ref: "tabs",
                                refInFor: !0,
                                on: {
                                    focus: function() {
                                        f()
                                    },
                                    blur: function() {
                                        p()
                                    },
                                    click: function(e) {
                                        p(),
                                        r(n, u, e)
                                    },
                                    keydown: function(e) {
                                        s(c, n, u, e)
                                    }
                                }
                            }, [h, d])
                        }
                        ));
                        return e("div", {
                            class: ["zm-tabs__nav-wrap", u ? "is-scrollable" : "", "is-" + this.rootTabs.tabPosition]
                        }, [v, e("div", {
                            class: ["zm-tabs__nav-scroll"],
                            ref: "navScroll"
                        }, [e("div", {
                            class: ["zm-tabs__nav", "is-" + this.rootTabs.tabPosition, o && -1 !== ["top", "bottom"].indexOf(this.rootTabs.tabPosition) ? "is-stretch" : ""],
                            ref: "nav",
                            style: l,
                            attrs: {
                                role: "tablist",
                                "aria-label": m
                            },
                            on: {
                                keydown: h
                            }
                        }, [g])])])
                    },
                    mounted: function() {
                        we(this.$el, this.update),
                        document.addEventListener("visibilitychange", this.visibilityChangeHandler),
                        window.addEventListener("blur", this.windowBlurHandler),
                        window.addEventListener("focus", this.windowFocusHandler)
                    },
                    beforeDestroy: function() {
                        this.$el && this.update && xe(this.$el, this.update),
                        document.removeEventListener("visibilitychange", this.visibilityChangeHandler),
                        window.removeEventListener("blur", this.windowBlurHandler),
                        window.removeEventListener("focus", this.windowFocusHandler)
                    }
                }, void 0, void 0, !1, null, null, null).exports
            },
            props: {
                type: String,
                activeName: String,
                closable: Boolean,
                addable: Boolean,
                value: {},
                editable: Boolean,
                tabPosition: {
                    type: String,
                    default: "top"
                },
                beforeLeave: Function,
                stretch: Boolean,
                ariaLabel: String
            },
            provide: function() {
                return {
                    rootTabs: this
                }
            },
            data: function() {
                return {
                    currentName: this.value || this.activeName,
                    panes: []
                }
            },
            watch: {
                activeName: function(e) {
                    this.setCurrentName(e)
                },
                value: function(e) {
                    this.setCurrentName(e)
                },
                currentName: function(e) {
                    var t = this;
                    this.$refs.nav && this.$nextTick((function() {
                        t.$refs.nav.$nextTick((function(e) {
                            t.$refs.nav.scrollToActiveTab()
                        }
                        ))
                    }
                    ))
                }
            },
            methods: {
                calcPaneInstances: function() {
                    var e = this;
                    if (this.$slots.default) {
                        var t = this.$slots.default.filter((function(e) {
                            return e.tag && e.componentOptions && "ZmTabPane" === e.componentOptions.Ctor.options.name
                        }
                        )).map((function(e) {
                            return e.componentInstance
                        }
                        ));
                        t.length === this.panes.length && t.every((function(t, n) {
                            return t === e.panes[n]
                        }
                        )) || (this.panes = t)
                    }
                },
                handleTabClick: function(e, t, n) {
                    e.disabled || (this.setCurrentName(t),
                    this.$emit("tab-click", e, n))
                },
                handleTabEnter: function(e, t, n) {
                    e.disabled || (this.setCurrentName(t),
                    this.$emit("tab-enter", e, n))
                },
                setCurrentName: function(e) {
                    var t = this
                      , n = function() {
                        t.currentName = e,
                        t.$emit("input", e)
                    };
                    if (this.currentName !== e && this.beforeLeave) {
                        var i = this.beforeLeave(e, this.currentName);
                        i && i.then ? i.then((function() {
                            n(),
                            t.$refs.nav && t.$refs.nav.removeFocus()
                        }
                        )) : !1 !== i && n()
                    } else
                        n()
                },
                setActiveName: function(e) {
                    this.setCurrentName(e),
                    this.$refs.nav && this.$refs.nav.$el.querySelector("[id=tab-" + e + "]") && this.$refs.nav.$el.querySelector("[id=tab-" + e + "]").focus()
                }
            },
            render: function(e) {
                var t, n = this.type, i = this.handleTabClick, o = this.handleTabEnter, r = this.currentName, s = this.panes, a = this.tabPosition, l = e("div", {
                    class: ["zm-tabs__header", "is-" + a]
                }, [e("tab-nav", {
                    props: {
                        currentName: r,
                        onTabClick: i,
                        onTabEnter: o,
                        type: n,
                        panes: s,
                        stretch: this.stretch,
                        ariaLabel: this.ariaLabel
                    },
                    ref: "nav"
                })]), u = e("div", {
                    class: "zm-tabs__content"
                }, [this.$slots.default]);
                return e("div", {
                    class: (t = {
                        "zm-tabs": !0,
                        "zm-tabs--card": "card" === n
                    },
                    t["zm-tabs--" + a] = !0,
                    t["zm-tabs--border-card"] = "border-card" === n,
                    t)
                }, ["bottom" !== a ? [l, u] : [u, l]])
            },
            created: function() {
                this.currentName || this.setCurrentName("0")
            },
            mounted: function() {
                this.calcPaneInstances()
            },
            updated: function() {
                this.calcPaneInstances()
            }
        }
          , ri = (n(118),
        V(oi, void 0, void 0, !1, null, null, null).exports)
          , si = V({
            name: "ZmTabPane",
            componentName: "ZmTabPane",
            props: {
                label: String,
                labelContent: Function,
                name: String,
                closable: Boolean,
                disabled: Boolean,
                lazy: Boolean
            },
            data: function() {
                return {
                    index: null,
                    loaded: !1
                }
            },
            computed: {
                isClosable: function() {
                    return this.closable || this.$parent.closable
                },
                active: function() {
                    var e = this.$parent.currentName === (this.name || this.index);
                    return e && (this.loaded = !0),
                    e
                },
                paneName: function() {
                    return this.name || this.index
                }
            },
            watch: {
                label: function() {
                    this.$parent.$forceUpdate()
                }
            }
        }, (function() {
            var e = this
              , t = e.$createElement
              , n = e._self._c || t;
            return !e.lazy || e.loaded || e.active ? n("div", {
                directives: [{
                    name: "show",
                    rawName: "v-show",
                    value: e.active,
                    expression: "active"
                }],
                staticClass: "zm-tab-pane",
                attrs: {
                    role: "tabpanel",
                    "aria-hidden": !e.active,
                    id: "pane-" + e.paneName,
                    "aria-labelledby": "tab-" + e.paneName
                }
            }, [e._t("default")], 2) : e._e()
        }
        ), [], !1, null, null, null).exports;
        ri.install = function(e) {
            e.component(ri.name, ri),
            e.component(si.name, si)
        }
        ;
        var ai = ri
          , li = {
            success: "zm-icon-success",
            warning: "zm-icon-warning",
            error: "zm-icon-error"
        }
          , ui = {
            name: "ZmAlert",
            mixins: [Ft],
            props: {
                title: {
                    type: String,
                    default: ""
                },
                description: {
                    type: String,
                    default: ""
                },
                type: {
                    type: String,
                    default: "info"
                },
                closable: {
                    type: Boolean,
                    default: !0
                },
                closeText: {
                    type: String,
                    default: ""
                },
                closeLabel: {
                    type: String,
                    default: ""
                },
                defaultCloseText: {
                    type: String,
                    default: function() {
                        return Et("el.alert.close")
                    }
                },
                showIcon: Boolean,
                center: Boolean
            },
            data: function() {
                return {
                    visible: !0
                }
            },
            methods: {
                close: function() {
                    this.visible = !1,
                    this.$emit("close")
                }
            },
            computed: {
                typeClass: function() {
                    return "zm-alert--" + this.type
                },
                iconClass: function() {
                    return li[this.type] || "zm-icon-info"
                },
                isBigIcon: function() {
                    return this.description || this.$slots.default ? "is-big" : ""
                },
                isBoldTitle: function() {
                    return this.description || this.$slots.default ? "is-bold" : ""
                }
            }
        }
          , ci = (n(119),
        V(ui, (function() {
            var e = this
              , t = e.$createElement
              , n = e._self._c || t;
            return n("transition", {
                attrs: {
                    name: "zm-alert-fade"
                }
            }, [n("div", {
                directives: [{
                    name: "show",
                    rawName: "v-show",
                    value: e.visible,
                    expression: "visible"
                }],
                staticClass: "zm-alert",
                class: [e.typeClass, e.center ? "is-center" : ""],
                attrs: {
                    role: "alert"
                }
            }, [e.showIcon ? n("i", {
                staticClass: "zm-alert__icon",
                class: [e.iconClass, e.isBigIcon]
            }) : e._e(), n("div", {
                staticClass: "zm-alert__content"
            }, [n("div", {
                staticClass: "zm-alert__body"
            }, [e.title || e.$slots.title ? n("span", {
                staticClass: "zm-alert__title",
                class: [e.isBoldTitle]
            }, [e._t("title", [e._v(e._s(e.title))])], 2) : e._e(), e.$slots.default && !e.description ? n("div", {
                staticClass: "zm-alert__description"
            }, [e._t("default")], 2) : e._e(), e.description && !e.$slots.default ? n("p", {
                staticClass: "zm-alert__description"
            }, [e._v(e._s(e.description))]) : e._e()]), e.closable ? n("zm-button", {
                staticClass: "zm-alert__closebtn",
                class: {
                    "is-customed": "" !== e.closeText,
                    "zm-icon-close": "" === e.closeText
                },
                attrs: {
                    type: "text",
                    "aria-label": e.closeLabel || e.closeText || e.t("el.alert.close")
                },
                on: {
                    click: function(t) {
                        e.close()
                    }
                }
            }, [e._v("\n        " + e._s(e.closeText) + "\n      ")]) : e._e()], 1)])])
        }
        ), [], !1, null, null, null).exports);
        ci.install = function(e) {
            e.component(ci.name, ci)
        }
        ;
        var di = ci
          , hi = {
            data: function() {
                return {
                    text: null,
                    spinner: null,
                    background: null,
                    fullscreen: !0,
                    visible: !1,
                    customClass: ""
                }
            },
            methods: {
                handleAfterLeave: function() {
                    this.$emit("after-leave")
                },
                setText: function(e) {
                    this.text = e
                }
            }
        }
          , fi = (n(120),
        V(hi, (function() {
            var e = this
              , t = e.$createElement
              , n = e._self._c || t;
            return n("transition", {
                attrs: {
                    name: "zm-loading-fade"
                },
                on: {
                    "after-leave": e.handleAfterLeave
                }
            }, [n("div", {
                directives: [{
                    name: "show",
                    rawName: "v-show",
                    value: e.visible,
                    expression: "visible"
                }],
                staticClass: "zm-loading-mask",
                class: [e.customClass, {
                    "is-fullscreen": e.fullscreen
                }],
                style: {
                    backgroundColor: e.background || ""
                }
            }, [n("div", {
                staticClass: "zm-loading-spinner"
            }, [e.spinner ? n("i", {
                class: e.spinner
            }) : n("svg", {
                staticClass: "circular",
                attrs: {
                    viewBox: "25 25 50 50"
                }
            }, [n("circle", {
                staticClass: "path",
                attrs: {
                    cx: "50",
                    cy: "50",
                    r: "20",
                    fill: "none"
                }
            })]), e.text ? n("p", {
                staticClass: "zm-loading-text"
            }, [e._v(e._s(e.text))]) : e._e()])])])
        }
        ), [], !1, null, null, null).exports)
          , pi = function(e, t) {
            var n = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : 300
              , i = arguments.length > 3 && void 0 !== arguments[3] && arguments[3];
            if (!e || !t)
                throw new Error("instance & callback is required");
            var o = !1
              , r = function() {
                o || (o = !0,
                t && t.apply(null, arguments))
            };
            i ? e.$once("after-leave", r) : e.$on("after-leave", r),
            setTimeout((function() {
                r()
            }
            ), n + 100)
        }
          , mi = {
            install: function(e) {
                if (!o) {
                    var t = function(t, i) {
                        i.value ? e.nextTick((function() {
                            i.modifiers.fullscreen ? (t.originalPosition = m(document.body, "position"),
                            t.originalOverflow = m(document.body, "overflow"),
                            t.maskStyle.zIndex = k.nextZIndex(),
                            f(t.mask, "is-fullscreen"),
                            n(document.body, t, i)) : (p(t.mask, "is-fullscreen"),
                            i.modifiers.body ? (t.originalPosition = m(document.body, "position"),
                            ["top", "left"].forEach((function(e) {
                                var n = "top" === e ? "scrollTop" : "scrollLeft";
                                t.maskStyle[e] = t.getBoundingClientRect()[e] + document.body[n] + document.documentElement[n] - parseInt(m(document.body, "margin-" + e), 10) + "px"
                            }
                            )),
                            ["height", "width"].forEach((function(e) {
                                t.maskStyle[e] = t.getBoundingClientRect()[e] + "px"
                            }
                            )),
                            n(document.body, t, i)) : (t.originalPosition = m(t, "position"),
                            n(t, t, i)))
                        }
                        )) : (pi(t.instance, (function(e) {
                            t.domVisible = !1;
                            var n = i.modifiers.fullscreen || i.modifiers.body ? document.body : t;
                            p(n, "zm-loading-parent--relative"),
                            p(n, "zm-loading-parent--hidden"),
                            t.instance.hiding = !1
                        }
                        ), 300, !0),
                        t.instance.visible = !1,
                        t.instance.hiding = !0)
                    }
                      , n = function(t, n, i) {
                        n.domVisible || "none" === m(n, "display") || "hidden" === m(n, "visibility") || (Object.keys(n.maskStyle).forEach((function(e) {
                            n.mask.style[e] = n.maskStyle[e]
                        }
                        )),
                        "absolute" !== n.originalPosition && "fixed" !== n.originalPosition && f(t, "zm-loading-parent--relative"),
                        i.modifiers.fullscreen && i.modifiers.lock && f(t, "zm-loading-parent--hidden"),
                        n.domVisible = !0,
                        t.appendChild(n.mask),
                        e.nextTick((function() {
                            n.instance.hiding ? n.instance.$emit("after-leave") : n.instance.visible = !0
                        }
                        )),
                        n.domInserted = !0)
                    };
                    e.directive("loading", {
                        bind: function(n, i, o) {
                            var r = n.getAttribute("element-loading-text")
                              , s = n.getAttribute("element-loading-spinner")
                              , a = n.getAttribute("element-loading-background")
                              , l = n.getAttribute("element-loading-custom-class")
                              , u = o.context
                              , c = new (e.extend(fi))({
                                el: document.createElement("div"),
                                data: {
                                    text: u && u[r] || r,
                                    spinner: u && u[s] || s,
                                    background: u && u[a] || a,
                                    customClass: u && u[l] || l,
                                    fullscreen: !!i.modifiers.fullscreen
                                }
                            });
                            n.instance = c,
                            n.mask = c.$el,
                            n.maskStyle = {},
                            i.value && t(n, i)
                        },
                        update: function(e, n) {
                            e.instance.setText(e.getAttribute("element-loading-text")),
                            n.oldValue !== n.value && t(e, n)
                        },
                        unbind: function(e, n) {
                            e.domInserted && (e.mask && e.mask.parentNode && e.mask.parentNode.removeChild(e.mask),
                            t(e, {
                                value: !1,
                                modifiers: n.modifiers
                            }))
                        }
                    })
                }
            }
        }
          , vi = mi
          , gi = {
            text: null,
            fullscreen: !0,
            body: !1,
            lock: !1,
            customClass: ""
        }
          , bi = void 0
          , yi = void 0
          , wi = function() {
            return yi || ((yi = Ci.extend(fi)).prototype.originalPosition = "",
            yi.prototype.originalOverflow = "",
            yi.prototype.close = function() {
                var e = this;
                this.fullscreen && (bi = void 0),
                pi(this, (function(t) {
                    var n = e.fullscreen || e.body ? document.body : e.target;
                    p(n, "zm-loading-parent--relative"),
                    p(n, "zm-loading-parent--hidden"),
                    e.$el && e.$el.parentNode && e.$el.parentNode.removeChild(e.$el),
                    e.$destroy()
                }
                ), 300),
                this.visible = !1
            }
            ,
            yi)
        }
          , xi = function(e, t, n) {
            var i = {};
            e.fullscreen ? (n.originalPosition = m(document.body, "position"),
            n.originalOverflow = m(document.body, "overflow"),
            i.zIndex = k.nextZIndex()) : e.body ? (n.originalPosition = m(document.body, "position"),
            ["top", "left"].forEach((function(t) {
                var n = "top" === t ? "scrollTop" : "scrollLeft";
                i[t] = e.target.getBoundingClientRect()[t] + document.body[n] + document.documentElement[n] + "px"
            }
            )),
            ["height", "width"].forEach((function(t) {
                i[t] = e.target.getBoundingClientRect()[t] + "px"
            }
            ))) : n.originalPosition = m(t, "position"),
            Object.keys(i).forEach((function(e) {
                n.$el.style[e] = i[e]
            }
            ))
        }
          , ki = function() {
            var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
            if (!o) {
                if ("string" == typeof (e = i({}, gi, e)).target && (e.target = document.querySelector(e.target)),
                e.target = e.target || document.body,
                e.target !== document.body ? e.fullscreen = !1 : e.body = !0,
                e.fullscreen && bi)
                    return bi;
                var t = e.body ? document.body : e.target
                  , n = wi()
                  , r = new n({
                    el: document.createElement("div"),
                    data: e
                });
                return xi(e, t, r),
                "absolute" !== r.originalPosition && "fixed" !== r.originalPosition && f(t, "zm-loading-parent--relative"),
                e.fullscreen && e.lock && f(t, "zm-loading-parent--hidden"),
                t.appendChild(r.$el),
                Ci.nextTick((function() {
                    r.visible = !0
                }
                )),
                e.fullscreen && (bi = r),
                r
            }
        }
          , Ci = void 0
          , _i = {
            install: function(e) {
                Ci = e,
                e.use(vi),
                e.prototype.$loading = ki
            },
            directive: vi,
            service: ki
        }
          , Si = {
            name: "ZmRow",
            componentName: "ZmRow",
            props: {
                tag: {
                    type: String,
                    default: "div"
                },
                gutter: Number,
                type: String,
                justify: {
                    type: String,
                    default: "start"
                },
                align: {
                    type: String,
                    default: "top"
                }
            },
            provide: function() {
                return {
                    row: this
                }
            },
            computed: {
                style: function() {
                    var e = {};
                    return this.gutter && (e.marginLeft = "-" + this.gutter / 2 + "px",
                    e.marginRight = e.marginLeft),
                    e
                },
                classList: function() {
                    var e = ["zm-row"]
                      , t = this.justify
                      , n = this.align;
                    return "start" !== t && e.push("is-justify-" + t),
                    "top" !== n && e.push("is-align-" + n),
                    e.push({
                        "zm-row--flex": "flex" === this.type
                    }),
                    e
                }
            },
            render: function(e) {
                return e(this.tag, {
                    class: this.classList,
                    style: this.style
                }, this.$slots.default)
            }
        }
          , Oi = (n(121),
        V(Si, void 0, void 0, !1, null, null, null).exports);
        Oi.install = function(e) {
            e.component(Oi.name, Oi)
        }
        ;
        var Ti = Oi
          , Ei = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
            return typeof e
        }
        : function(e) {
            return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
        }
          , zi = {
            name: "ZmCol",
            props: {
                span: {
                    type: Number,
                    default: 24
                },
                tag: {
                    type: String,
                    default: "div"
                },
                offset: Number,
                pull: Number,
                push: Number,
                xs: [Number, Object],
                sm: [Number, Object],
                md: [Number, Object],
                lg: [Number, Object],
                xl: [Number, Object]
            },
            computed: {
                gutter: function() {
                    return this.row.gutter
                },
                style: function() {
                    var e = {};
                    return this.gutter && (e.paddingLeft = this.gutter / 2 + "px",
                    e.paddingRight = e.paddingLeft),
                    e
                },
                classList: function() {
                    var e = this
                      , t = ["zm-col"];
                    return ["span", "offset", "pull", "push"].forEach((function(n) {
                        (e[n] || 0 === e[n]) && t.push("span" !== n ? "zm-col-" + n + "-" + e[n] : "zm-col-" + e[n])
                    }
                    )),
                    ["xs", "sm", "md", "lg", "xl"].forEach((function(n) {
                        if ("number" == typeof e[n])
                            t.push("zm-col-" + n + "-" + e[n]);
                        else if ("object" === Ei(e[n])) {
                            var i = e[n];
                            Object.keys(i).forEach((function(e) {
                                t.push("span" !== e ? "zm-col-" + n + "-" + e + "-" + i[e] : "zm-col-" + n + "-" + i[e])
                            }
                            ))
                        }
                    }
                    )),
                    t
                }
            },
            inject: ["row"],
            render: function(e) {
                return e(this.tag, {
                    class: this.classList,
                    style: this.style
                }, this.$slots.default)
            }
        }
          , Ni = (n(122),
        V(zi, void 0, void 0, !1, null, null, null).exports);
        Ni.install = function(e) {
            e.component(Ni.name, Ni)
        }
        ;
        var Fi = Ni
          , $i = {
            success: "success",
            info: "info",
            warning: "warning",
            error: "error"
        }
          , Ai = {
            data: function() {
                return {
                    visible: !1,
                    message: "",
                    duration: 3e3,
                    type: "info",
                    iconClass: "",
                    customClass: "",
                    onClose: null,
                    showClose: !1,
                    closed: !1,
                    timer: null,
                    dangerouslyUseHTMLString: !1,
                    center: !1
                }
            },
            computed: {
                typeClass: function() {
                    return this.type && !this.iconClass ? "zm-message__icon zm-icon-" + $i[this.type] : ""
                }
            },
            watch: {
                closed: function(e) {
                    e && (this.visible = !1,
                    this.$el.addEventListener("transitionend", this.destroyElement))
                }
            },
            methods: {
                destroyElement: function() {
                    this.$el.removeEventListener("transitionend", this.destroyElement),
                    this.$destroy(!0),
                    this.$el.parentNode.removeChild(this.$el)
                },
                close: function() {
                    this.closed = !0,
                    "function" == typeof this.onClose && this.onClose(this)
                },
                clearTimer: function() {
                    clearTimeout(this.timer)
                },
                startTimer: function() {
                    var e = this;
                    this.duration > 0 && (this.timer = setTimeout((function() {
                        e.closed || e.close()
                    }
                    ), this.duration))
                },
                keydown: function(e) {
                    27 === e.keyCode && (this.closed || this.close())
                }
            },
            mounted: function() {
                this.startTimer(),
                document.addEventListener("keydown", this.keydown)
            },
            beforeDestroy: function() {
                document.removeEventListener("keydown", this.keydown)
            }
        }
          , Li = (n(123),
        V(Ai, (function() {
            var e = this
              , t = e.$createElement
              , n = e._self._c || t;
            return n("transition", {
                attrs: {
                    name: "zm-message-fade"
                }
            }, [n("div", {
                directives: [{
                    name: "show",
                    rawName: "v-show",
                    value: e.visible,
                    expression: "visible"
                }],
                class: ["zm-message", e.type && !e.iconClass ? "zm-message--" + e.type : "", e.center ? "is-center" : "", e.showClose ? "is-closable" : "", e.customClass],
                attrs: {
                    role: "alert"
                },
                on: {
                    mouseenter: e.clearTimer,
                    mouseleave: e.startTimer
                }
            }, [e.iconClass ? n("i", {
                class: e.iconClass
            }) : n("i", {
                class: e.typeClass
            }), e._t("default", [e.dangerouslyUseHTMLString ? n("p", {
                staticClass: "zm-message__content",
                domProps: {
                    innerHTML: e._s(e.message)
                }
            }) : n("p", {
                staticClass: "zm-message__content"
            }, [e._v(e._s(e.message))])]), e.showClose ? n("i", {
                staticClass: "zm-message__closeBtn zm-icon-close",
                on: {
                    click: e.close
                }
            }) : e._e()], 2)])
        }
        ), [], !1, null, null, null).exports)
          , Ii = void 0
          , Di = []
          , Bi = 1
          , Pi = function e(t) {
            if (!o) {
                "string" == typeof (t = t || {}) && (t = {
                    message: t
                });
                var n = t.onClose
                  , i = "message_" + Bi++;
                t.onClose = function() {
                    e.close(i, n)
                }
                ;
                var r = ji.extend(Li);
                return (Ii = new r({
                    data: t
                })).id = i,
                ln(Ii.message) && (Ii.$slots.default = [Ii.message],
                Ii.message = null),
                Ii.vm = Ii.$mount(),
                document.body.appendChild(Ii.vm.$el),
                Ii.vm.visible = !0,
                Ii.dom = Ii.vm.$el,
                Ii.dom.style.zIndex = 1e3 + k.nextZIndex(),
                Di.push(Ii),
                Ii.vm
            }
        };
        ["success", "warning", "info", "error"].forEach((function(e) {
            Pi[e] = function(t) {
                return "string" == typeof t && (t = {
                    message: t
                }),
                t.type = e,
                Pi(t)
            }
        }
        )),
        Pi.close = function(e, t) {
            for (var n = 0, i = Di.length; n < i; n++)
                if (e === Di[n].id) {
                    "function" == typeof t && t(Di[n]),
                    Di.splice(n, 1);
                    break
                }
        }
        ,
        Pi.closeAll = function() {
            for (var e = Di.length - 1; e >= 0; e--)
                Di[e].close()
        }
        ;
        var Mi = Pi
          , ji = void 0
          , qi = {
            install: function(e) {
                ji = e,
                e.prototype.$message = Mi
            }
        }
          , Zi = (n(196),
        {
            install: function() {}
        })
          , Ri = Nt;
        var Hi = function() {
            function e() {
                !function(e, t) {
                    if (!(e instanceof t))
                        throw new TypeError("Cannot call a class as a function")
                }(this, e)
            }
            return e.prototype.beforeEnter = function(e) {
                f(e, "collapse-transition"),
                e.dataset || (e.dataset = {}),
                e.dataset.oldPaddingTop = e.style.paddingTop,
                e.dataset.oldPaddingBottom = e.style.paddingBottom,
                e.style.height = "0",
                e.style.paddingTop = 0,
                e.style.paddingBottom = 0
            }
            ,
            e.prototype.enter = function(e) {
                e.dataset.oldOverflow = e.style.overflow,
                0 !== e.scrollHeight ? (e.style.height = e.scrollHeight + "px",
                e.style.paddingTop = e.dataset.oldPaddingTop,
                e.style.paddingBottom = e.dataset.oldPaddingBottom) : (e.style.height = "",
                e.style.paddingTop = e.dataset.oldPaddingTop,
                e.style.paddingBottom = e.dataset.oldPaddingBottom),
                e.style.overflow = "hidden"
            }
            ,
            e.prototype.afterEnter = function(e) {
                p(e, "collapse-transition"),
                e.style.height = "",
                e.style.overflow = e.dataset.oldOverflow
            }
            ,
            e.prototype.beforeLeave = function(e) {
                e.dataset || (e.dataset = {}),
                e.dataset.oldPaddingTop = e.style.paddingTop,
                e.dataset.oldPaddingBottom = e.style.paddingBottom,
                e.dataset.oldOverflow = e.style.overflow,
                e.style.height = e.scrollHeight + "px",
                e.style.overflow = "hidden"
            }
            ,
            e.prototype.leave = function(e) {
                0 !== e.scrollHeight && (f(e, "collapse-transition"),
                e.style.height = 0,
                e.style.paddingTop = 0,
                e.style.paddingBottom = 0)
            }
            ,
            e.prototype.afterLeave = function(e) {
                p(e, "collapse-transition"),
                e.style.height = "",
                e.style.overflow = e.dataset.oldOverflow,
                e.style.paddingTop = e.dataset.oldPaddingTop,
                e.style.paddingBottom = e.dataset.oldPaddingBottom
            }
            ,
            e
        }()
          , Gi = {
            name: "ZmCollapseTransition",
            functional: !0,
            render: function(e, t) {
                var n = t.children;
                return e("transition", {
                    on: new Hi
                }, n)
            }
        };
        n.d(t, "_Vue", (function() {
            return Vi
        }
        ));
        var Vi = void 0
          , Ui = [W, Ie, We, ie, Qe, tt, rt, lt, dt, pt, Kt, Pe, je, en, Bt, yn, _n, ti, ai, Rt, di, _i, Ti, Fi, qi, Zi, Ri, Gi]
          , Wi = function(e) {
            var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
            Vi = e,
            e.use(Ri, t.locale),
            Ri.i18n(t.i18n),
            Ui.map((function(t) {
                e.use(t)
            }
            )),
            e.prototype.$ELEMENT = {
                size: t.size || "",
                zIndex: t.zIndex || 2e3
            }
        };
        "undefined" != typeof window && window.Vue && Wi(window.Vue);
        var Ki = {
            version: "3.3.15",
            locale: Ri.use,
            i18n: Ri.i18n,
            install: Wi,
            CollapseTransition: Gi,
            Loading: _i,
            Dialog: W,
            Autocomplete: Ie,
            Dropdown: We,
            Input: ie,
            InputNumber: Qe,
            Radio: tt,
            RadioGroup: rt,
            Checkbox: lt,
            CheckboxGroup: dt,
            Switch: pt,
            Select: Kt,
            Button: Pe,
            ButtonGroup: je,
            Popover: en,
            Tooltip: Bt,
            MessageBox: yn,
            Breadcrumb: _n,
            Form: ti,
            Tabs: ai,
            Tag: Rt,
            Alert: di,
            Row: Ti,
            Col: Fi,
            Message: qi,
            Style: Zi,
            Locale: Ri
        };
        t.default = Ki
    }
    , function(e, t) {}
    , , , , , function(e, t) {}
    , , function(e, t) {}
    , , function(e, t) {}
    , , function(e, t) {}
    , , function(e, t) {}
    , , function(e, t) {}
    , , function(e, t) {}
    , , function(e, t) {}
    , , function(e, t) {}
    , , function(e, t) {}
    , , function(e, t) {}
    , , function(e, t) {}
    , , function(e, t) {}
    , , function(e, t) {}
    , , function(e, t) {}
    , , function(e, t) {}
    , , function(e, t) {}
    , , function(e, t) {}
    , , function(e, t) {}
    , , function(e, t) {}
    , , function(e, t) {}
    , , function(e, t) {}
    , , function(e, t) {}
    , , function(e, t) {}
    , , function(e, t) {}
    , , function(e, t) {}
    , , function(e, t) {}
    , , function(e, t) {}
    , , function(e, t) {}
    , , function(e, t) {}
    , , function(e, t) {}
    , , function(e, t) {}
    , , function(e, t) {}
    , , function(e, t) {}
    ])
}
));

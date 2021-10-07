/*! jQuery v1.12.0 | (c) jQuery Foundation | jquery.org/license */
!function(a, b) {
    "object" == typeof module && "object" == typeof module.exports ? module.exports = a.document ? b(a, !0) : function(a) {
        if (!a.document)
            throw new Error("jQuery requires a window with a document");
        return b(a)
    }
    : b(a)
}("undefined" != typeof window ? window : this, function(a, b) {
    var c = []
      , d = a.document
      , e = c.slice
      , f = c.concat
      , g = c.push
      , h = c.indexOf
      , i = {}
      , j = i.toString
      , k = i.hasOwnProperty
      , l = {}
      , m = "1.12.0"
      , n = function(a, b) {
        return new n.fn.init(a,b)
    }
      , o = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g
      , p = /^-ms-/
      , q = /-([\da-z])/gi
      , r = function(a, b) {
        return b.toUpperCase()
    };
    n.fn = n.prototype = {
        jquery: m,
        constructor: n,
        selector: "",
        length: 0,
        toArray: function() {
            return e.call(this)
        },
        get: function(a) {
            return null != a ? 0 > a ? this[a + this.length] : this[a] : e.call(this)
        },
        pushStack: function(a) {
            var b = n.merge(this.constructor(), a);
            return b.prevObject = this,
            b.context = this.context,
            b
        },
        each: function(a) {
            return n.each(this, a)
        },
        map: function(a) {
            return this.pushStack(n.map(this, function(b, c) {
                return a.call(b, c, b)
            }))
        },
        slice: function() {
            return this.pushStack(e.apply(this, arguments))
        },
        first: function() {
            return this.eq(0)
        },
        last: function() {
            return this.eq(-1)
        },
        eq: function(a) {
            var b = this.length
              , c = +a + (0 > a ? b : 0);
            return this.pushStack(c >= 0 && b > c ? [this[c]] : [])
        },
        end: function() {
            return this.prevObject || this.constructor()
        },
        push: g,
        sort: c.sort,
        splice: c.splice
    },
    n.extend = n.fn.extend = function() {
        var a, b, c, d, e, f, g = arguments[0] || {}, h = 1, i = arguments.length, j = !1;
        for ("boolean" == typeof g && (j = g,
        g = arguments[h] || {},
        h++),
        "object" == typeof g || n.isFunction(g) || (g = {}),
        h === i && (g = this,
        h--); i > h; h++)
            if (null != (e = arguments[h]))
                for (d in e)
                    a = g[d],
                    c = e[d],
                    g !== c && (j && c && (n.isPlainObject(c) || (b = n.isArray(c))) ? (b ? (b = !1,
                    f = a && n.isArray(a) ? a : []) : f = a && n.isPlainObject(a) ? a : {},
                    g[d] = n.extend(j, f, c)) : void 0 !== c && (g[d] = c));
        return g
    }
    ,
    n.extend({
        expando: "jQuery" + (m + Math.random()).replace(/\D/g, ""),
        isReady: !0,
        error: function(a) {
            throw new Error(a)
        },
        noop: function() {},
        isFunction: function(a) {
            return "function" === n.type(a)
        },
        isArray: Array.isArray || function(a) {
            return "array" === n.type(a)
        }
        ,
        isWindow: function(a) {
            return null != a && a == a.window
        },
        isNumeric: function(a) {
            var b = a && a.toString();
            return !n.isArray(a) && b - parseFloat(b) + 1 >= 0
        },
        isEmptyObject: function(a) {
            var b;
            for (b in a)
                return !1;
            return !0
        },
        isPlainObject: function(a) {
            var b;
            if (!a || "object" !== n.type(a) || a.nodeType || n.isWindow(a))
                return !1;
            try {
                if (a.constructor && !k.call(a, "constructor") && !k.call(a.constructor.prototype, "isPrototypeOf"))
                    return !1
            } catch (c) {
                return !1
            }
            if (!l.ownFirst)
                for (b in a)
                    return k.call(a, b);
            for (b in a)
                ;
            return void 0 === b || k.call(a, b)
        },
        type: function(a) {
            return null == a ? a + "" : "object" == typeof a || "function" == typeof a ? i[j.call(a)] || "object" : typeof a
        },
        globalEval: function(b) {
            b && n.trim(b) && (a.execScript || function(b) {
                a.eval.call(a, b)
            }
            )(b)
        },
        camelCase: function(a) {
            return a.replace(p, "ms-").replace(q, r)
        },
        nodeName: function(a, b) {
            return a.nodeName && a.nodeName.toLowerCase() === b.toLowerCase()
        },
        each: function(a, b) {
            var c, d = 0;
            if (s(a)) {
                for (c = a.length; c > d; d++)
                    if (b.call(a[d], d, a[d]) === !1)
                        break
            } else
                for (d in a)
                    if (b.call(a[d], d, a[d]) === !1)
                        break;
            return a
        },
        trim: function(a) {
            return null == a ? "" : (a + "").replace(o, "")
        },
        makeArray: function(a, b) {
            var c = b || [];
            return null != a && (s(Object(a)) ? n.merge(c, "string" == typeof a ? [a] : a) : g.call(c, a)),
            c
        },
        inArray: function(a, b, c) {
            var d;
            if (b) {
                if (h)
                    return h.call(b, a, c);
                for (d = b.length,
                c = c ? 0 > c ? Math.max(0, d + c) : c : 0; d > c; c++)
                    if (c in b && b[c] === a)
                        return c
            }
            return -1
        },
        merge: function(a, b) {
            var c = +b.length
              , d = 0
              , e = a.length;
            while (c > d)
                a[e++] = b[d++];
            if (c !== c)
                while (void 0 !== b[d])
                    a[e++] = b[d++];
            return a.length = e,
            a
        },
        grep: function(a, b, c) {
            for (var d, e = [], f = 0, g = a.length, h = !c; g > f; f++)
                d = !b(a[f], f),
                d !== h && e.push(a[f]);
            return e
        },
        map: function(a, b, c) {
            var d, e, g = 0, h = [];
            if (s(a))
                for (d = a.length; d > g; g++)
                    e = b(a[g], g, c),
                    null != e && h.push(e);
            else
                for (g in a)
                    e = b(a[g], g, c),
                    null != e && h.push(e);
            return f.apply([], h)
        },
        guid: 1,
        proxy: function(a, b) {
            var c, d, f;
            return "string" == typeof b && (f = a[b],
            b = a,
            a = f),
            n.isFunction(a) ? (c = e.call(arguments, 2),
            d = function() {
                return a.apply(b || this, c.concat(e.call(arguments)))
            }
            ,
            d.guid = a.guid = a.guid || n.guid++,
            d) : void 0
        },
        now: function() {
            return +new Date
        },
        support: l
    }),
    "function" == typeof Symbol && (n.fn[Symbol.iterator] = c[Symbol.iterator]),
    n.each("Boolean Number String Function Array Date RegExp Object Error Symbol".split(" "), function(a, b) {
        i["[object " + b + "]"] = b.toLowerCase()
    });
    function s(a) {
        var b = !!a && "length"in a && a.length
          , c = n.type(a);
        return "function" === c || n.isWindow(a) ? !1 : "array" === c || 0 === b || "number" == typeof b && b > 0 && b - 1 in a
    }
    var t = function(a) {
        var b, c, d, e, f, g, h, i, j, k, l, m, n, o, p, q, r, s, t, u = "sizzle" + 1 * new Date, v = a.document, w = 0, x = 0, y = ga(), z = ga(), A = ga(), B = function(a, b) {
            return a === b && (l = !0),
            0
        }, C = 1 << 31, D = {}.hasOwnProperty, E = [], F = E.pop, G = E.push, H = E.push, I = E.slice, J = function(a, b) {
            for (var c = 0, d = a.length; d > c; c++)
                if (a[c] === b)
                    return c;
            return -1
        }, K = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped", L = "[\\x20\\t\\r\\n\\f]", M = "(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+", N = "\\[" + L + "*(" + M + ")(?:" + L + "*([*^$|!~]?=)" + L + "*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|(" + M + "))|)" + L + "*\\]", O = ":(" + M + ")(?:\\((('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|((?:\\\\.|[^\\\\()[\\]]|" + N + ")*)|.*)\\)|)", P = new RegExp(L + "+","g"), Q = new RegExp("^" + L + "+|((?:^|[^\\\\])(?:\\\\.)*)" + L + "+$","g"), R = new RegExp("^" + L + "*," + L + "*"), S = new RegExp("^" + L + "*([>+~]|" + L + ")" + L + "*"), T = new RegExp("=" + L + "*([^\\]'\"]*?)" + L + "*\\]","g"), U = new RegExp(O), V = new RegExp("^" + M + "$"), W = {
            ID: new RegExp("^#(" + M + ")"),
            CLASS: new RegExp("^\\.(" + M + ")"),
            TAG: new RegExp("^(" + M + "|[*])"),
            ATTR: new RegExp("^" + N),
            PSEUDO: new RegExp("^" + O),
            CHILD: new RegExp("^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + L + "*(even|odd|(([+-]|)(\\d*)n|)" + L + "*(?:([+-]|)" + L + "*(\\d+)|))" + L + "*\\)|)","i"),
            bool: new RegExp("^(?:" + K + ")$","i"),
            needsContext: new RegExp("^" + L + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" + L + "*((?:-\\d)?\\d*)" + L + "*\\)|)(?=[^-]|$)","i")
        }, X = /^(?:input|select|textarea|button)$/i, Y = /^h\d$/i, Z = /^[^{]+\{\s*\[native \w/, $ = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/, _ = /[+~]/, aa = /'|\\/g, ba = new RegExp("\\\\([\\da-f]{1,6}" + L + "?|(" + L + ")|.)","ig"), ca = function(a, b, c) {
            var d = "0x" + b - 65536;
            return d !== d || c ? b : 0 > d ? String.fromCharCode(d + 65536) : String.fromCharCode(d >> 10 | 55296, 1023 & d | 56320)
        }, da = function() {
            m()
        };
        try {
            H.apply(E = I.call(v.childNodes), v.childNodes),
            E[v.childNodes.length].nodeType
        } catch (ea) {
            H = {
                apply: E.length ? function(a, b) {
                    G.apply(a, I.call(b))
                }
                : function(a, b) {
                    var c = a.length
                      , d = 0;
                    while (a[c++] = b[d++])
                        ;
                    a.length = c - 1
                }
            }
        }
        function fa(a, b, d, e) {
            var f, h, j, k, l, o, r, s, w = b && b.ownerDocument, x = b ? b.nodeType : 9;
            if (d = d || [],
            "string" != typeof a || !a || 1 !== x && 9 !== x && 11 !== x)
                return d;
            if (!e && ((b ? b.ownerDocument || b : v) !== n && m(b),
            b = b || n,
            p)) {
                if (11 !== x && (o = $.exec(a)))
                    if (f = o[1]) {
                        if (9 === x) {
                            if (!(j = b.getElementById(f)))
                                return d;
                            if (j.id === f)
                                return d.push(j),
                                d
                        } else if (w && (j = w.getElementById(f)) && t(b, j) && j.id === f)
                            return d.push(j),
                            d
                    } else {
                        if (o[2])
                            return H.apply(d, b.getElementsByTagName(a)),
                            d;
                        if ((f = o[3]) && c.getElementsByClassName && b.getElementsByClassName)
                            return H.apply(d, b.getElementsByClassName(f)),
                            d
                    }
                if (c.qsa && !A[a + " "] && (!q || !q.test(a))) {
                    if (1 !== x)
                        w = b,
                        s = a;
                    else if ("object" !== b.nodeName.toLowerCase()) {
                        (k = b.getAttribute("id")) ? k = k.replace(aa, "\\$&") : b.setAttribute("id", k = u),
                        r = g(a),
                        h = r.length,
                        l = V.test(k) ? "#" + k : "[id='" + k + "']";
                        while (h--)
                            r[h] = l + " " + qa(r[h]);
                        s = r.join(","),
                        w = _.test(a) && oa(b.parentNode) || b
                    }
                    if (s)
                        try {
                            return H.apply(d, w.querySelectorAll(s)),
                            d
                        } catch (y) {} finally {
                            k === u && b.removeAttribute("id")
                        }
                }
            }
            return i(a.replace(Q, "$1"), b, d, e)
        }
        function ga() {
            var a = [];
            function b(c, e) {
                return a.push(c + " ") > d.cacheLength && delete b[a.shift()],
                b[c + " "] = e
            }
            return b
        }
        function ha(a) {
            return a[u] = !0,
            a
        }
        function ia(a) {
            var b = n.createElement("div");
            try {
                return !!a(b)
            } catch (c) {
                return !1
            } finally {
                b.parentNode && b.parentNode.removeChild(b),
                b = null
            }
        }
        function ja(a, b) {
            var c = a.split("|")
              , e = c.length;
            while (e--)
                d.attrHandle[c[e]] = b
        }
        function ka(a, b) {
            var c = b && a
              , d = c && 1 === a.nodeType && 1 === b.nodeType && (~b.sourceIndex || C) - (~a.sourceIndex || C);
            if (d)
                return d;
            if (c)
                while (c = c.nextSibling)
                    if (c === b)
                        return -1;
            return a ? 1 : -1
        }
        function la(a) {
            return function(b) {
                var c = b.nodeName.toLowerCase();
                return "input" === c && b.type === a
            }
        }
        function ma(a) {
            return function(b) {
                var c = b.nodeName.toLowerCase();
                return ("input" === c || "button" === c) && b.type === a
            }
        }
        function na(a) {
            return ha(function(b) {
                return b = +b,
                ha(function(c, d) {
                    var e, f = a([], c.length, b), g = f.length;
                    while (g--)
                        c[e = f[g]] && (c[e] = !(d[e] = c[e]))
                })
            })
        }
        function oa(a) {
            return a && "undefined" != typeof a.getElementsByTagName && a
        }
        c = fa.support = {},
        f = fa.isXML = function(a) {
            var b = a && (a.ownerDocument || a).documentElement;
            return b ? "HTML" !== b.nodeName : !1
        }
        ,
        m = fa.setDocument = function(a) {
            var b, e, g = a ? a.ownerDocument || a : v;
            return g !== n && 9 === g.nodeType && g.documentElement ? (n = g,
            o = n.documentElement,
            p = !f(n),
            (e = n.defaultView) && e.top !== e && (e.addEventListener ? e.addEventListener("unload", da, !1) : e.attachEvent && e.attachEvent("onunload", da)),
            c.attributes = ia(function(a) {
                return a.className = "i",
                !a.getAttribute("className")
            }),
            c.getElementsByTagName = ia(function(a) {
                return a.appendChild(n.createComment("")),
                !a.getElementsByTagName("*").length
            }),
            c.getElementsByClassName = Z.test(n.getElementsByClassName),
            c.getById = ia(function(a) {
                return o.appendChild(a).id = u,
                !n.getElementsByName || !n.getElementsByName(u).length
            }),
            c.getById ? (d.find.ID = function(a, b) {
                if ("undefined" != typeof b.getElementById && p) {
                    var c = b.getElementById(a);
                    return c ? [c] : []
                }
            }
            ,
            d.filter.ID = function(a) {
                var b = a.replace(ba, ca);
                return function(a) {
                    return a.getAttribute("id") === b
                }
            }
            ) : (delete d.find.ID,
            d.filter.ID = function(a) {
                var b = a.replace(ba, ca);
                return function(a) {
                    var c = "undefined" != typeof a.getAttributeNode && a.getAttributeNode("id");
                    return c && c.value === b
                }
            }
            ),
            d.find.TAG = c.getElementsByTagName ? function(a, b) {
                return "undefined" != typeof b.getElementsByTagName ? b.getElementsByTagName(a) : c.qsa ? b.querySelectorAll(a) : void 0
            }
            : function(a, b) {
                var c, d = [], e = 0, f = b.getElementsByTagName(a);
                if ("*" === a) {
                    while (c = f[e++])
                        1 === c.nodeType && d.push(c);
                    return d
                }
                return f
            }
            ,
            d.find.CLASS = c.getElementsByClassName && function(a, b) {
                return "undefined" != typeof b.getElementsByClassName && p ? b.getElementsByClassName(a) : void 0
            }
            ,
            r = [],
            q = [],
            (c.qsa = Z.test(n.querySelectorAll)) && (ia(function(a) {
                o.appendChild(a).innerHTML = "<a id='" + u + "'></a><select id='" + u + "-\r\\' msallowcapture=''><option selected=''></option></select>",
                a.querySelectorAll("[msallowcapture^='']").length && q.push("[*^$]=" + L + "*(?:''|\"\")"),
                a.querySelectorAll("[selected]").length || q.push("\\[" + L + "*(?:value|" + K + ")"),
                a.querySelectorAll("[id~=" + u + "-]").length || q.push("~="),
                a.querySelectorAll(":checked").length || q.push(":checked"),
                a.querySelectorAll("a#" + u + "+*").length || q.push(".#.+[+~]")
            }),
            ia(function(a) {
                var b = n.createElement("input");
                b.setAttribute("type", "hidden"),
                a.appendChild(b).setAttribute("name", "D"),
                a.querySelectorAll("[name=d]").length && q.push("name" + L + "*[*^$|!~]?="),
                a.querySelectorAll(":enabled").length || q.push(":enabled", ":disabled"),
                a.querySelectorAll("*,:x"),
                q.push(",.*:")
            })),
            (c.matchesSelector = Z.test(s = o.matches || o.webkitMatchesSelector || o.mozMatchesSelector || o.oMatchesSelector || o.msMatchesSelector)) && ia(function(a) {
                c.disconnectedMatch = s.call(a, "div"),
                s.call(a, "[s!='']:x"),
                r.push("!=", O)
            }),
            q = q.length && new RegExp(q.join("|")),
            r = r.length && new RegExp(r.join("|")),
            b = Z.test(o.compareDocumentPosition),
            t = b || Z.test(o.contains) ? function(a, b) {
                var c = 9 === a.nodeType ? a.documentElement : a
                  , d = b && b.parentNode;
                return a === d || !(!d || 1 !== d.nodeType || !(c.contains ? c.contains(d) : a.compareDocumentPosition && 16 & a.compareDocumentPosition(d)))
            }
            : function(a, b) {
                if (b)
                    while (b = b.parentNode)
                        if (b === a)
                            return !0;
                return !1
            }
            ,
            B = b ? function(a, b) {
                if (a === b)
                    return l = !0,
                    0;
                var d = !a.compareDocumentPosition - !b.compareDocumentPosition;
                return d ? d : (d = (a.ownerDocument || a) === (b.ownerDocument || b) ? a.compareDocumentPosition(b) : 1,
                1 & d || !c.sortDetached && b.compareDocumentPosition(a) === d ? a === n || a.ownerDocument === v && t(v, a) ? -1 : b === n || b.ownerDocument === v && t(v, b) ? 1 : k ? J(k, a) - J(k, b) : 0 : 4 & d ? -1 : 1)
            }
            : function(a, b) {
                if (a === b)
                    return l = !0,
                    0;
                var c, d = 0, e = a.parentNode, f = b.parentNode, g = [a], h = [b];
                if (!e || !f)
                    return a === n ? -1 : b === n ? 1 : e ? -1 : f ? 1 : k ? J(k, a) - J(k, b) : 0;
                if (e === f)
                    return ka(a, b);
                c = a;
                while (c = c.parentNode)
                    g.unshift(c);
                c = b;
                while (c = c.parentNode)
                    h.unshift(c);
                while (g[d] === h[d])
                    d++;
                return d ? ka(g[d], h[d]) : g[d] === v ? -1 : h[d] === v ? 1 : 0
            }
            ,
            n) : n
        }
        ,
        fa.matches = function(a, b) {
            return fa(a, null, null, b)
        }
        ,
        fa.matchesSelector = function(a, b) {
            if ((a.ownerDocument || a) !== n && m(a),
            b = b.replace(T, "='$1']"),
            c.matchesSelector && p && !A[b + " "] && (!r || !r.test(b)) && (!q || !q.test(b)))
                try {
                    var d = s.call(a, b);
                    if (d || c.disconnectedMatch || a.document && 11 !== a.document.nodeType)
                        return d
                } catch (e) {}
            return fa(b, n, null, [a]).length > 0
        }
        ,
        fa.contains = function(a, b) {
            return (a.ownerDocument || a) !== n && m(a),
            t(a, b)
        }
        ,
        fa.attr = function(a, b) {
            (a.ownerDocument || a) !== n && m(a);
            var e = d.attrHandle[b.toLowerCase()]
              , f = e && D.call(d.attrHandle, b.toLowerCase()) ? e(a, b, !p) : void 0;
            return void 0 !== f ? f : c.attributes || !p ? a.getAttribute(b) : (f = a.getAttributeNode(b)) && f.specified ? f.value : null
        }
        ,
        fa.error = function(a) {
            throw new Error("Syntax error, unrecognized expression: " + a)
        }
        ,
        fa.uniqueSort = function(a) {
            var b, d = [], e = 0, f = 0;
            if (l = !c.detectDuplicates,
            k = !c.sortStable && a.slice(0),
            a.sort(B),
            l) {
                while (b = a[f++])
                    b === a[f] && (e = d.push(f));
                while (e--)
                    a.splice(d[e], 1)
            }
            return k = null,
            a
        }
        ,
        e = fa.getText = function(a) {
            var b, c = "", d = 0, f = a.nodeType;
            if (f) {
                if (1 === f || 9 === f || 11 === f) {
                    if ("string" == typeof a.textContent)
                        return a.textContent;
                    for (a = a.firstChild; a; a = a.nextSibling)
                        c += e(a)
                } else if (3 === f || 4 === f)
                    return a.nodeValue
            } else
                while (b = a[d++])
                    c += e(b);
            return c
        }
        ,
        d = fa.selectors = {
            cacheLength: 50,
            createPseudo: ha,
            match: W,
            attrHandle: {},
            find: {},
            relative: {
                ">": {
                    dir: "parentNode",
                    first: !0
                },
                " ": {
                    dir: "parentNode"
                },
                "+": {
                    dir: "previousSibling",
                    first: !0
                },
                "~": {
                    dir: "previousSibling"
                }
            },
            preFilter: {
                ATTR: function(a) {
                    return a[1] = a[1].replace(ba, ca),
                    a[3] = (a[3] || a[4] || a[5] || "").replace(ba, ca),
                    "~=" === a[2] && (a[3] = " " + a[3] + " "),
                    a.slice(0, 4)
                },
                CHILD: function(a) {
                    return a[1] = a[1].toLowerCase(),
                    "nth" === a[1].slice(0, 3) ? (a[3] || fa.error(a[0]),
                    a[4] = +(a[4] ? a[5] + (a[6] || 1) : 2 * ("even" === a[3] || "odd" === a[3])),
                    a[5] = +(a[7] + a[8] || "odd" === a[3])) : a[3] && fa.error(a[0]),
                    a
                },
                PSEUDO: function(a) {
                    var b, c = !a[6] && a[2];
                    return W.CHILD.test(a[0]) ? null : (a[3] ? a[2] = a[4] || a[5] || "" : c && U.test(c) && (b = g(c, !0)) && (b = c.indexOf(")", c.length - b) - c.length) && (a[0] = a[0].slice(0, b),
                    a[2] = c.slice(0, b)),
                    a.slice(0, 3))
                }
            },
            filter: {
                TAG: function(a) {
                    var b = a.replace(ba, ca).toLowerCase();
                    return "*" === a ? function() {
                        return !0
                    }
                    : function(a) {
                        return a.nodeName && a.nodeName.toLowerCase() === b
                    }
                },
                CLASS: function(a) {
                    var b = y[a + " "];
                    return b || (b = new RegExp("(^|" + L + ")" + a + "(" + L + "|$)")) && y(a, function(a) {
                        return b.test("string" == typeof a.className && a.className || "undefined" != typeof a.getAttribute && a.getAttribute("class") || "")
                    })
                },
                ATTR: function(a, b, c) {
                    return function(d) {
                        var e = fa.attr(d, a);
                        return null == e ? "!=" === b : b ? (e += "",
                        "=" === b ? e === c : "!=" === b ? e !== c : "^=" === b ? c && 0 === e.indexOf(c) : "*=" === b ? c && e.indexOf(c) > -1 : "$=" === b ? c && e.slice(-c.length) === c : "~=" === b ? (" " + e.replace(P, " ") + " ").indexOf(c) > -1 : "|=" === b ? e === c || e.slice(0, c.length + 1) === c + "-" : !1) : !0
                    }
                },
                CHILD: function(a, b, c, d, e) {
                    var f = "nth" !== a.slice(0, 3)
                      , g = "last" !== a.slice(-4)
                      , h = "of-type" === b;
                    return 1 === d && 0 === e ? function(a) {
                        return !!a.parentNode
                    }
                    : function(b, c, i) {
                        var j, k, l, m, n, o, p = f !== g ? "nextSibling" : "previousSibling", q = b.parentNode, r = h && b.nodeName.toLowerCase(), s = !i && !h, t = !1;
                        if (q) {
                            if (f) {
                                while (p) {
                                    m = b;
                                    while (m = m[p])
                                        if (h ? m.nodeName.toLowerCase() === r : 1 === m.nodeType)
                                            return !1;
                                    o = p = "only" === a && !o && "nextSibling"
                                }
                                return !0
                            }
                            if (o = [g ? q.firstChild : q.lastChild],
                            g && s) {
                                m = q,
                                l = m[u] || (m[u] = {}),
                                k = l[m.uniqueID] || (l[m.uniqueID] = {}),
                                j = k[a] || [],
                                n = j[0] === w && j[1],
                                t = n && j[2],
                                m = n && q.childNodes[n];
                                while (m = ++n && m && m[p] || (t = n = 0) || o.pop())
                                    if (1 === m.nodeType && ++t && m === b) {
                                        k[a] = [w, n, t];
                                        break
                                    }
                            } else if (s && (m = b,
                            l = m[u] || (m[u] = {}),
                            k = l[m.uniqueID] || (l[m.uniqueID] = {}),
                            j = k[a] || [],
                            n = j[0] === w && j[1],
                            t = n),
                            t === !1)
                                while (m = ++n && m && m[p] || (t = n = 0) || o.pop())
                                    if ((h ? m.nodeName.toLowerCase() === r : 1 === m.nodeType) && ++t && (s && (l = m[u] || (m[u] = {}),
                                    k = l[m.uniqueID] || (l[m.uniqueID] = {}),
                                    k[a] = [w, t]),
                                    m === b))
                                        break;
                            return t -= e,
                            t === d || t % d === 0 && t / d >= 0
                        }
                    }
                },
                PSEUDO: function(a, b) {
                    var c, e = d.pseudos[a] || d.setFilters[a.toLowerCase()] || fa.error("unsupported pseudo: " + a);
                    return e[u] ? e(b) : e.length > 1 ? (c = [a, a, "", b],
                    d.setFilters.hasOwnProperty(a.toLowerCase()) ? ha(function(a, c) {
                        var d, f = e(a, b), g = f.length;
                        while (g--)
                            d = J(a, f[g]),
                            a[d] = !(c[d] = f[g])
                    }) : function(a) {
                        return e(a, 0, c)
                    }
                    ) : e
                }
            },
            pseudos: {
                not: ha(function(a) {
                    var b = []
                      , c = []
                      , d = h(a.replace(Q, "$1"));
                    return d[u] ? ha(function(a, b, c, e) {
                        var f, g = d(a, null, e, []), h = a.length;
                        while (h--)
                            (f = g[h]) && (a[h] = !(b[h] = f))
                    }) : function(a, e, f) {
                        return b[0] = a,
                        d(b, null, f, c),
                        b[0] = null,
                        !c.pop()
                    }
                }),
                has: ha(function(a) {
                    return function(b) {
                        return fa(a, b).length > 0
                    }
                }),
                contains: ha(function(a) {
                    return a = a.replace(ba, ca),
                    function(b) {
                        return (b.textContent || b.innerText || e(b)).indexOf(a) > -1
                    }
                }),
                lang: ha(function(a) {
                    return V.test(a || "") || fa.error("unsupported lang: " + a),
                    a = a.replace(ba, ca).toLowerCase(),
                    function(b) {
                        var c;
                        do
                            if (c = p ? b.lang : b.getAttribute("xml:lang") || b.getAttribute("lang"))
                                return c = c.toLowerCase(),
                                c === a || 0 === c.indexOf(a + "-");
                        while ((b = b.parentNode) && 1 === b.nodeType);return !1
                    }
                }),
                target: function(b) {
                    var c = a.location && a.location.hash;
                    return c && c.slice(1) === b.id
                },
                root: function(a) {
                    return a === o
                },
                focus: function(a) {
                    return a === n.activeElement && (!n.hasFocus || n.hasFocus()) && !!(a.type || a.href || ~a.tabIndex)
                },
                enabled: function(a) {
                    return a.disabled === !1
                },
                disabled: function(a) {
                    return a.disabled === !0
                },
                checked: function(a) {
                    var b = a.nodeName.toLowerCase();
                    return "input" === b && !!a.checked || "option" === b && !!a.selected
                },
                selected: function(a) {
                    return a.parentNode && a.parentNode.selectedIndex,
                    a.selected === !0
                },
                empty: function(a) {
                    for (a = a.firstChild; a; a = a.nextSibling)
                        if (a.nodeType < 6)
                            return !1;
                    return !0
                },
                parent: function(a) {
                    return !d.pseudos.empty(a)
                },
                header: function(a) {
                    return Y.test(a.nodeName)
                },
                input: function(a) {
                    return X.test(a.nodeName)
                },
                button: function(a) {
                    var b = a.nodeName.toLowerCase();
                    return "input" === b && "button" === a.type || "button" === b
                },
                text: function(a) {
                    var b;
                    return "input" === a.nodeName.toLowerCase() && "text" === a.type && (null == (b = a.getAttribute("type")) || "text" === b.toLowerCase())
                },
                first: na(function() {
                    return [0]
                }),
                last: na(function(a, b) {
                    return [b - 1]
                }),
                eq: na(function(a, b, c) {
                    return [0 > c ? c + b : c]
                }),
                even: na(function(a, b) {
                    for (var c = 0; b > c; c += 2)
                        a.push(c);
                    return a
                }),
                odd: na(function(a, b) {
                    for (var c = 1; b > c; c += 2)
                        a.push(c);
                    return a
                }),
                lt: na(function(a, b, c) {
                    for (var d = 0 > c ? c + b : c; --d >= 0; )
                        a.push(d);
                    return a
                }),
                gt: na(function(a, b, c) {
                    for (var d = 0 > c ? c + b : c; ++d < b; )
                        a.push(d);
                    return a
                })
            }
        },
        d.pseudos.nth = d.pseudos.eq;
        for (b in {
            radio: !0,
            checkbox: !0,
            file: !0,
            password: !0,
            image: !0
        })
            d.pseudos[b] = la(b);
        for (b in {
            submit: !0,
            reset: !0
        })
            d.pseudos[b] = ma(b);
        function pa() {}
        pa.prototype = d.filters = d.pseudos,
        d.setFilters = new pa,
        g = fa.tokenize = function(a, b) {
            var c, e, f, g, h, i, j, k = z[a + " "];
            if (k)
                return b ? 0 : k.slice(0);
            h = a,
            i = [],
            j = d.preFilter;
            while (h) {
                (!c || (e = R.exec(h))) && (e && (h = h.slice(e[0].length) || h),
                i.push(f = [])),
                c = !1,
                (e = S.exec(h)) && (c = e.shift(),
                f.push({
                    value: c,
                    type: e[0].replace(Q, " ")
                }),
                h = h.slice(c.length));
                for (g in d.filter)
                    !(e = W[g].exec(h)) || j[g] && !(e = j[g](e)) || (c = e.shift(),
                    f.push({
                        value: c,
                        type: g,
                        matches: e
                    }),
                    h = h.slice(c.length));
                if (!c)
                    break
            }
            return b ? h.length : h ? fa.error(a) : z(a, i).slice(0)
        }
        ;
        function qa(a) {
            for (var b = 0, c = a.length, d = ""; c > b; b++)
                d += a[b].value;
            return d
        }
        function ra(a, b, c) {
            var d = b.dir
              , e = c && "parentNode" === d
              , f = x++;
            return b.first ? function(b, c, f) {
                while (b = b[d])
                    if (1 === b.nodeType || e)
                        return a(b, c, f)
            }
            : function(b, c, g) {
                var h, i, j, k = [w, f];
                if (g) {
                    while (b = b[d])
                        if ((1 === b.nodeType || e) && a(b, c, g))
                            return !0
                } else
                    while (b = b[d])
                        if (1 === b.nodeType || e) {
                            if (j = b[u] || (b[u] = {}),
                            i = j[b.uniqueID] || (j[b.uniqueID] = {}),
                            (h = i[d]) && h[0] === w && h[1] === f)
                                return k[2] = h[2];
                            if (i[d] = k,
                            k[2] = a(b, c, g))
                                return !0
                        }
            }
        }
        function sa(a) {
            return a.length > 1 ? function(b, c, d) {
                var e = a.length;
                while (e--)
                    if (!a[e](b, c, d))
                        return !1;
                return !0
            }
            : a[0]
        }
        function ta(a, b, c) {
            for (var d = 0, e = b.length; e > d; d++)
                fa(a, b[d], c);
            return c
        }
        function ua(a, b, c, d, e) {
            for (var f, g = [], h = 0, i = a.length, j = null != b; i > h; h++)
                (f = a[h]) && (!c || c(f, d, e)) && (g.push(f),
                j && b.push(h));
            return g
        }
        function va(a, b, c, d, e, f) {
            return d && !d[u] && (d = va(d)),
            e && !e[u] && (e = va(e, f)),
            ha(function(f, g, h, i) {
                var j, k, l, m = [], n = [], o = g.length, p = f || ta(b || "*", h.nodeType ? [h] : h, []), q = !a || !f && b ? p : ua(p, m, a, h, i), r = c ? e || (f ? a : o || d) ? [] : g : q;
                if (c && c(q, r, h, i),
                d) {
                    j = ua(r, n),
                    d(j, [], h, i),
                    k = j.length;
                    while (k--)
                        (l = j[k]) && (r[n[k]] = !(q[n[k]] = l))
                }
                if (f) {
                    if (e || a) {
                        if (e) {
                            j = [],
                            k = r.length;
                            while (k--)
                                (l = r[k]) && j.push(q[k] = l);
                            e(null, r = [], j, i)
                        }
                        k = r.length;
                        while (k--)
                            (l = r[k]) && (j = e ? J(f, l) : m[k]) > -1 && (f[j] = !(g[j] = l))
                    }
                } else
                    r = ua(r === g ? r.splice(o, r.length) : r),
                    e ? e(null, g, r, i) : H.apply(g, r)
            })
        }
        function wa(a) {
            for (var b, c, e, f = a.length, g = d.relative[a[0].type], h = g || d.relative[" "], i = g ? 1 : 0, k = ra(function(a) {
                return a === b
            }, h, !0), l = ra(function(a) {
                return J(b, a) > -1
            }, h, !0), m = [function(a, c, d) {
                var e = !g && (d || c !== j) || ((b = c).nodeType ? k(a, c, d) : l(a, c, d));
                return b = null,
                e
            }
            ]; f > i; i++)
                if (c = d.relative[a[i].type])
                    m = [ra(sa(m), c)];
                else {
                    if (c = d.filter[a[i].type].apply(null, a[i].matches),
                    c[u]) {
                        for (e = ++i; f > e; e++)
                            if (d.relative[a[e].type])
                                break;
                        return va(i > 1 && sa(m), i > 1 && qa(a.slice(0, i - 1).concat({
                            value: " " === a[i - 2].type ? "*" : ""
                        })).replace(Q, "$1"), c, e > i && wa(a.slice(i, e)), f > e && wa(a = a.slice(e)), f > e && qa(a))
                    }
                    m.push(c)
                }
            return sa(m)
        }
        function xa(a, b) {
            var c = b.length > 0
              , e = a.length > 0
              , f = function(f, g, h, i, k) {
                var l, o, q, r = 0, s = "0", t = f && [], u = [], v = j, x = f || e && d.find.TAG("*", k), y = w += null == v ? 1 : Math.random() || .1, z = x.length;
                for (k && (j = g === n || g || k); s !== z && null != (l = x[s]); s++) {
                    if (e && l) {
                        o = 0,
                        g || l.ownerDocument === n || (m(l),
                        h = !p);
                        while (q = a[o++])
                            if (q(l, g || n, h)) {
                                i.push(l);
                                break
                            }
                        k && (w = y)
                    }
                    c && ((l = !q && l) && r--,
                    f && t.push(l))
                }
                if (r += s,
                c && s !== r) {
                    o = 0;
                    while (q = b[o++])
                        q(t, u, g, h);
                    if (f) {
                        if (r > 0)
                            while (s--)
                                t[s] || u[s] || (u[s] = F.call(i));
                        u = ua(u)
                    }
                    H.apply(i, u),
                    k && !f && u.length > 0 && r + b.length > 1 && fa.uniqueSort(i)
                }
                return k && (w = y,
                j = v),
                t
            };
            return c ? ha(f) : f
        }
        return h = fa.compile = function(a, b) {
            var c, d = [], e = [], f = A[a + " "];
            if (!f) {
                b || (b = g(a)),
                c = b.length;
                while (c--)
                    f = wa(b[c]),
                    f[u] ? d.push(f) : e.push(f);
                f = A(a, xa(e, d)),
                f.selector = a
            }
            return f
        }
        ,
        i = fa.select = function(a, b, e, f) {
            var i, j, k, l, m, n = "function" == typeof a && a, o = !f && g(a = n.selector || a);
            if (e = e || [],
            1 === o.length) {
                if (j = o[0] = o[0].slice(0),
                j.length > 2 && "ID" === (k = j[0]).type && c.getById && 9 === b.nodeType && p && d.relative[j[1].type]) {
                    if (b = (d.find.ID(k.matches[0].replace(ba, ca), b) || [])[0],
                    !b)
                        return e;
                    n && (b = b.parentNode),
                    a = a.slice(j.shift().value.length)
                }
                i = W.needsContext.test(a) ? 0 : j.length;
                while (i--) {
                    if (k = j[i],
                    d.relative[l = k.type])
                        break;
                    if ((m = d.find[l]) && (f = m(k.matches[0].replace(ba, ca), _.test(j[0].type) && oa(b.parentNode) || b))) {
                        if (j.splice(i, 1),
                        a = f.length && qa(j),
                        !a)
                            return H.apply(e, f),
                            e;
                        break
                    }
                }
            }
            return (n || h(a, o))(f, b, !p, e, !b || _.test(a) && oa(b.parentNode) || b),
            e
        }
        ,
        c.sortStable = u.split("").sort(B).join("") === u,
        c.detectDuplicates = !!l,
        m(),
        c.sortDetached = ia(function(a) {
            return 1 & a.compareDocumentPosition(n.createElement("div"))
        }),
        ia(function(a) {
            return a.innerHTML = "<a href='#'></a>",
            "#" === a.firstChild.getAttribute("href")
        }) || ja("type|href|height|width", function(a, b, c) {
            return c ? void 0 : a.getAttribute(b, "type" === b.toLowerCase() ? 1 : 2)
        }),
        c.attributes && ia(function(a) {
            return a.innerHTML = "<input/>",
            a.firstChild.setAttribute("value", ""),
            "" === a.firstChild.getAttribute("value")
        }) || ja("value", function(a, b, c) {
            return c || "input" !== a.nodeName.toLowerCase() ? void 0 : a.defaultValue
        }),
        ia(function(a) {
            return null == a.getAttribute("disabled")
        }) || ja(K, function(a, b, c) {
            var d;
            return c ? void 0 : a[b] === !0 ? b.toLowerCase() : (d = a.getAttributeNode(b)) && d.specified ? d.value : null
        }),
        fa
    }(a);
    n.find = t,
    n.expr = t.selectors,
    n.expr[":"] = n.expr.pseudos,
    n.uniqueSort = n.unique = t.uniqueSort,
    n.text = t.getText,
    n.isXMLDoc = t.isXML,
    n.contains = t.contains;
    var u = function(a, b, c) {
        var d = []
          , e = void 0 !== c;
        while ((a = a[b]) && 9 !== a.nodeType)
            if (1 === a.nodeType) {
                if (e && n(a).is(c))
                    break;
                d.push(a)
            }
        return d
    }
      , v = function(a, b) {
        for (var c = []; a; a = a.nextSibling)
            1 === a.nodeType && a !== b && c.push(a);
        return c
    }
      , w = n.expr.match.needsContext
      , x = /^<([\w-]+)\s*\/?>(?:<\/\1>|)$/
      , y = /^.[^:#\[\.,]*$/;
    function z(a, b, c) {
        if (n.isFunction(b))
            return n.grep(a, function(a, d) {
                return !!b.call(a, d, a) !== c
            });
        if (b.nodeType)
            return n.grep(a, function(a) {
                return a === b !== c
            });
        if ("string" == typeof b) {
            if (y.test(b))
                return n.filter(b, a, c);
            b = n.filter(b, a)
        }
        return n.grep(a, function(a) {
            return n.inArray(a, b) > -1 !== c
        })
    }
    n.filter = function(a, b, c) {
        var d = b[0];
        return c && (a = ":not(" + a + ")"),
        1 === b.length && 1 === d.nodeType ? n.find.matchesSelector(d, a) ? [d] : [] : n.find.matches(a, n.grep(b, function(a) {
            return 1 === a.nodeType
        }))
    }
    ,
    n.fn.extend({
        find: function(a) {
            var b, c = [], d = this, e = d.length;
            if ("string" != typeof a)
                return this.pushStack(n(a).filter(function() {
                    for (b = 0; e > b; b++)
                        if (n.contains(d[b], this))
                            return !0
                }));
            for (b = 0; e > b; b++)
                n.find(a, d[b], c);
            return c = this.pushStack(e > 1 ? n.unique(c) : c),
            c.selector = this.selector ? this.selector + " " + a : a,
            c
        },
        filter: function(a) {
            return this.pushStack(z(this, a || [], !1))
        },
        not: function(a) {
            return this.pushStack(z(this, a || [], !0))
        },
        is: function(a) {
            return !!z(this, "string" == typeof a && w.test(a) ? n(a) : a || [], !1).length
        }
    });
    var A, B = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]*))$/, C = n.fn.init = function(a, b, c) {
        var e, f;
        if (!a)
            return this;
        if (c = c || A,
        "string" == typeof a) {
            if (e = "<" === a.charAt(0) && ">" === a.charAt(a.length - 1) && a.length >= 3 ? [null, a, null] : B.exec(a),
            !e || !e[1] && b)
                return !b || b.jquery ? (b || c).find(a) : this.constructor(b).find(a);
            if (e[1]) {
                if (b = b instanceof n ? b[0] : b,
                n.merge(this, n.parseHTML(e[1], b && b.nodeType ? b.ownerDocument || b : d, !0)),
                x.test(e[1]) && n.isPlainObject(b))
                    for (e in b)
                        n.isFunction(this[e]) ? this[e](b[e]) : this.attr(e, b[e]);
                return this
            }
            if (f = d.getElementById(e[2]),
            f && f.parentNode) {
                if (f.id !== e[2])
                    return A.find(a);
                this.length = 1,
                this[0] = f
            }
            return this.context = d,
            this.selector = a,
            this
        }
        return a.nodeType ? (this.context = this[0] = a,
        this.length = 1,
        this) : n.isFunction(a) ? "undefined" != typeof c.ready ? c.ready(a) : a(n) : (void 0 !== a.selector && (this.selector = a.selector,
        this.context = a.context),
        n.makeArray(a, this))
    }
    ;
    C.prototype = n.fn,
    A = n(d);
    var D = /^(?:parents|prev(?:Until|All))/
      , E = {
        children: !0,
        contents: !0,
        next: !0,
        prev: !0
    };
    n.fn.extend({
        has: function(a) {
            var b, c = n(a, this), d = c.length;
            return this.filter(function() {
                for (b = 0; d > b; b++)
                    if (n.contains(this, c[b]))
                        return !0
            })
        },
        closest: function(a, b) {
            for (var c, d = 0, e = this.length, f = [], g = w.test(a) || "string" != typeof a ? n(a, b || this.context) : 0; e > d; d++)
                for (c = this[d]; c && c !== b; c = c.parentNode)
                    if (c.nodeType < 11 && (g ? g.index(c) > -1 : 1 === c.nodeType && n.find.matchesSelector(c, a))) {
                        f.push(c);
                        break
                    }
            return this.pushStack(f.length > 1 ? n.uniqueSort(f) : f)
        },
        index: function(a) {
            return a ? "string" == typeof a ? n.inArray(this[0], n(a)) : n.inArray(a.jquery ? a[0] : a, this) : this[0] && this[0].parentNode ? this.first().prevAll().length : -1
        },
        add: function(a, b) {
            return this.pushStack(n.uniqueSort(n.merge(this.get(), n(a, b))))
        },
        addBack: function(a) {
            return this.add(null == a ? this.prevObject : this.prevObject.filter(a))
        }
    });
    function F(a, b) {
        do
            a = a[b];
        while (a && 1 !== a.nodeType);return a
    }
    n.each({
        parent: function(a) {
            var b = a.parentNode;
            return b && 11 !== b.nodeType ? b : null
        },
        parents: function(a) {
            return u(a, "parentNode")
        },
        parentsUntil: function(a, b, c) {
            return u(a, "parentNode", c)
        },
        next: function(a) {
            return F(a, "nextSibling")
        },
        prev: function(a) {
            return F(a, "previousSibling")
        },
        nextAll: function(a) {
            return u(a, "nextSibling")
        },
        prevAll: function(a) {
            return u(a, "previousSibling")
        },
        nextUntil: function(a, b, c) {
            return u(a, "nextSibling", c)
        },
        prevUntil: function(a, b, c) {
            return u(a, "previousSibling", c)
        },
        siblings: function(a) {
            return v((a.parentNode || {}).firstChild, a)
        },
        children: function(a) {
            return v(a.firstChild)
        },
        contents: function(a) {
            return n.nodeName(a, "iframe") ? a.contentDocument || a.contentWindow.document : n.merge([], a.childNodes)
        }
    }, function(a, b) {
        n.fn[a] = function(c, d) {
            var e = n.map(this, b, c);
            return "Until" !== a.slice(-5) && (d = c),
            d && "string" == typeof d && (e = n.filter(d, e)),
            this.length > 1 && (E[a] || (e = n.uniqueSort(e)),
            D.test(a) && (e = e.reverse())),
            this.pushStack(e)
        }
    });
    var G = /\S+/g;
    function H(a) {
        var b = {};
        return n.each(a.match(G) || [], function(a, c) {
            b[c] = !0
        }),
        b
    }
    n.Callbacks = function(a) {
        a = "string" == typeof a ? H(a) : n.extend({}, a);
        var b, c, d, e, f = [], g = [], h = -1, i = function() {
            for (e = a.once,
            d = b = !0; g.length; h = -1) {
                c = g.shift();
                while (++h < f.length)
                    f[h].apply(c[0], c[1]) === !1 && a.stopOnFalse && (h = f.length,
                    c = !1)
            }
            a.memory || (c = !1),
            b = !1,
            e && (f = c ? [] : "")
        }, j = {
            add: function() {
                return f && (c && !b && (h = f.length - 1,
                g.push(c)),
                function d(b) {
                    n.each(b, function(b, c) {
                        n.isFunction(c) ? a.unique && j.has(c) || f.push(c) : c && c.length && "string" !== n.type(c) && d(c)
                    })
                }(arguments),
                c && !b && i()),
                this
            },
            remove: function() {
                return n.each(arguments, function(a, b) {
                    var c;
                    while ((c = n.inArray(b, f, c)) > -1)
                        f.splice(c, 1),
                        h >= c && h--
                }),
                this
            },
            has: function(a) {
                return a ? n.inArray(a, f) > -1 : f.length > 0
            },
            empty: function() {
                return f && (f = []),
                this
            },
            disable: function() {
                return e = g = [],
                f = c = "",
                this
            },
            disabled: function() {
                return !f
            },
            lock: function() {
                return e = !0,
                c || j.disable(),
                this
            },
            locked: function() {
                return !!e
            },
            fireWith: function(a, c) {
                return e || (c = c || [],
                c = [a, c.slice ? c.slice() : c],
                g.push(c),
                b || i()),
                this
            },
            fire: function() {
                return j.fireWith(this, arguments),
                this
            },
            fired: function() {
                return !!d
            }
        };
        return j
    }
    ,
    n.extend({
        Deferred: function(a) {
            var b = [["resolve", "done", n.Callbacks("once memory"), "resolved"], ["reject", "fail", n.Callbacks("once memory"), "rejected"], ["notify", "progress", n.Callbacks("memory")]]
              , c = "pending"
              , d = {
                state: function() {
                    return c
                },
                always: function() {
                    return e.done(arguments).fail(arguments),
                    this
                },
                then: function() {
                    var a = arguments;
                    return n.Deferred(function(c) {
                        n.each(b, function(b, f) {
                            var g = n.isFunction(a[b]) && a[b];
                            e[f[1]](function() {
                                var a = g && g.apply(this, arguments);
                                a && n.isFunction(a.promise) ? a.promise().progress(c.notify).done(c.resolve).fail(c.reject) : c[f[0] + "With"](this === d ? c.promise() : this, g ? [a] : arguments)
                            })
                        }),
                        a = null
                    }).promise()
                },
                promise: function(a) {
                    return null != a ? n.extend(a, d) : d
                }
            }
              , e = {};
            return d.pipe = d.then,
            n.each(b, function(a, f) {
                var g = f[2]
                  , h = f[3];
                d[f[1]] = g.add,
                h && g.add(function() {
                    c = h
                }, b[1 ^ a][2].disable, b[2][2].lock),
                e[f[0]] = function() {
                    return e[f[0] + "With"](this === e ? d : this, arguments),
                    this
                }
                ,
                e[f[0] + "With"] = g.fireWith
            }),
            d.promise(e),
            a && a.call(e, e),
            e
        },
        when: function(a) {
            var b = 0, c = e.call(arguments), d = c.length, f = 1 !== d || a && n.isFunction(a.promise) ? d : 0, g = 1 === f ? a : n.Deferred(), h = function(a, b, c) {
                return function(d) {
                    b[a] = this,
                    c[a] = arguments.length > 1 ? e.call(arguments) : d,
                    c === i ? g.notifyWith(b, c) : --f || g.resolveWith(b, c)
                }
            }, i, j, k;
            if (d > 1)
                for (i = new Array(d),
                j = new Array(d),
                k = new Array(d); d > b; b++)
                    c[b] && n.isFunction(c[b].promise) ? c[b].promise().progress(h(b, j, i)).done(h(b, k, c)).fail(g.reject) : --f;
            return f || g.resolveWith(k, c),
            g.promise()
        }
    });
    var I;
    n.fn.ready = function(a) {
        return n.ready.promise().done(a),
        this
    }
    ,
    n.extend({
        isReady: !1,
        readyWait: 1,
        holdReady: function(a) {
            a ? n.readyWait++ : n.ready(!0)
        },
        ready: function(a) {
            (a === !0 ? --n.readyWait : n.isReady) || (n.isReady = !0,
            a !== !0 && --n.readyWait > 0 || (I.resolveWith(d, [n]),
            n.fn.triggerHandler && (n(d).triggerHandler("ready"),
            n(d).off("ready"))))
        }
    });
    function J() {
        d.addEventListener ? (d.removeEventListener("DOMContentLoaded", K),
        a.removeEventListener("load", K)) : (d.detachEvent("onreadystatechange", K),
        a.detachEvent("onload", K))
    }
    function K() {
        (d.addEventListener || "load" === a.event.type || "complete" === d.readyState) && (J(),
        n.ready())
    }
    n.ready.promise = function(b) {
        if (!I)
            if (I = n.Deferred(),
            "complete" === d.readyState)
                a.setTimeout(n.ready);
            else if (d.addEventListener)
                d.addEventListener("DOMContentLoaded", K),
                a.addEventListener("load", K);
            else {
                d.attachEvent("onreadystatechange", K),
                a.attachEvent("onload", K);
                var c = !1;
                try {
                    c = null == a.frameElement && d.documentElement
                } catch (e) {}
                c && c.doScroll && !function f() {
                    if (!n.isReady) {
                        try {
                            c.doScroll("left")
                        } catch (b) {
                            return a.setTimeout(f, 50)
                        }
                        J(),
                        n.ready()
                    }
                }()
            }
        return I.promise(b)
    }
    ,
    n.ready.promise();
    var L;
    for (L in n(l))
        break;
    l.ownFirst = "0" === L,
    l.inlineBlockNeedsLayout = !1,
    n(function() {
        var a, b, c, e;
        c = d.getElementsByTagName("body")[0],
        c && c.style && (b = d.createElement("div"),
        e = d.createElement("div"),
        e.style.cssText = "position:absolute;border:0;width:0;height:0;top:0;left:-9999px",
        c.appendChild(e).appendChild(b),
        "undefined" != typeof b.style.zoom && (b.style.cssText = "display:inline;margin:0;border:0;padding:1px;width:1px;zoom:1",
        l.inlineBlockNeedsLayout = a = 3 === b.offsetWidth,
        a && (c.style.zoom = 1)),
        c.removeChild(e))
    }),
    function() {
        var a = d.createElement("div");
        l.deleteExpando = !0;
        try {
            delete a.test
        } catch (b) {
            l.deleteExpando = !1
        }
        a = null
    }();
    var M = function(a) {
        var b = n.noData[(a.nodeName + " ").toLowerCase()]
          , c = +a.nodeType || 1;
        return 1 !== c && 9 !== c ? !1 : !b || b !== !0 && a.getAttribute("classid") === b
    }
      , N = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/
      , O = /([A-Z])/g;
    function P(a, b, c) {
        if (void 0 === c && 1 === a.nodeType) {
            var d = "data-" + b.replace(O, "-$1").toLowerCase();
            if (c = a.getAttribute(d),
            "string" == typeof c) {
                try {
                    c = "true" === c ? !0 : "false" === c ? !1 : "null" === c ? null : +c + "" === c ? +c : N.test(c) ? n.parseJSON(c) : c
                } catch (e) {}
                n.data(a, b, c)
            } else
                c = void 0
        }
        return c
    }
    function Q(a) {
        var b;
        for (b in a)
            if (("data" !== b || !n.isEmptyObject(a[b])) && "toJSON" !== b)
                return !1;
        return !0
    }
    function R(a, b, d, e) {
        if (M(a)) {
            var f, g, h = n.expando, i = a.nodeType, j = i ? n.cache : a, k = i ? a[h] : a[h] && h;
            if (k && j[k] && (e || j[k].data) || void 0 !== d || "string" != typeof b)
                return k || (k = i ? a[h] = c.pop() || n.guid++ : h),
                j[k] || (j[k] = i ? {} : {
                    toJSON: n.noop
                }),
                ("object" == typeof b || "function" == typeof b) && (e ? j[k] = n.extend(j[k], b) : j[k].data = n.extend(j[k].data, b)),
                g = j[k],
                e || (g.data || (g.data = {}),
                g = g.data),
                void 0 !== d && (g[n.camelCase(b)] = d),
                "string" == typeof b ? (f = g[b],
                null == f && (f = g[n.camelCase(b)])) : f = g,
                f
        }
    }
    function S(a, b, c) {
        if (M(a)) {
            var d, e, f = a.nodeType, g = f ? n.cache : a, h = f ? a[n.expando] : n.expando;
            if (g[h]) {
                if (b && (d = c ? g[h] : g[h].data)) {
                    n.isArray(b) ? b = b.concat(n.map(b, n.camelCase)) : b in d ? b = [b] : (b = n.camelCase(b),
                    b = b in d ? [b] : b.split(" ")),
                    e = b.length;
                    while (e--)
                        delete d[b[e]];
                    if (c ? !Q(d) : !n.isEmptyObject(d))
                        return
                }
                (c || (delete g[h].data,
                Q(g[h]))) && (f ? n.cleanData([a], !0) : l.deleteExpando || g != g.window ? delete g[h] : g[h] = void 0)
            }
        }
    }
    n.extend({
        cache: {},
        noData: {
            "applet ": !0,
            "embed ": !0,
            "object ": "clsid:D27CDB6E-AE6D-11cf-96B8-444553540000"
        },
        hasData: function(a) {
            return a = a.nodeType ? n.cache[a[n.expando]] : a[n.expando],
            !!a && !Q(a)
        },
        data: function(a, b, c) {
            return R(a, b, c)
        },
        removeData: function(a, b) {
            return S(a, b)
        },
        _data: function(a, b, c) {
            return R(a, b, c, !0)
        },
        _removeData: function(a, b) {
            return S(a, b, !0)
        }
    }),
    n.fn.extend({
        data: function(a, b) {
            var c, d, e, f = this[0], g = f && f.attributes;
            if (void 0 === a) {
                if (this.length && (e = n.data(f),
                1 === f.nodeType && !n._data(f, "parsedAttrs"))) {
                    c = g.length;
                    while (c--)
                        g[c] && (d = g[c].name,
                        0 === d.indexOf("data-") && (d = n.camelCase(d.slice(5)),
                        P(f, d, e[d])));
                    n._data(f, "parsedAttrs", !0)
                }
                return e
            }
            return "object" == typeof a ? this.each(function() {
                n.data(this, a)
            }) : arguments.length > 1 ? this.each(function() {
                n.data(this, a, b)
            }) : f ? P(f, a, n.data(f, a)) : void 0
        },
        removeData: function(a) {
            return this.each(function() {
                n.removeData(this, a)
            })
        }
    }),
    n.extend({
        queue: function(a, b, c) {
            var d;
            return a ? (b = (b || "fx") + "queue",
            d = n._data(a, b),
            c && (!d || n.isArray(c) ? d = n._data(a, b, n.makeArray(c)) : d.push(c)),
            d || []) : void 0
        },
        dequeue: function(a, b) {
            b = b || "fx";
            var c = n.queue(a, b)
              , d = c.length
              , e = c.shift()
              , f = n._queueHooks(a, b)
              , g = function() {
                n.dequeue(a, b)
            };
            "inprogress" === e && (e = c.shift(),
            d--),
            e && ("fx" === b && c.unshift("inprogress"),
            delete f.stop,
            e.call(a, g, f)),
            !d && f && f.empty.fire()
        },
        _queueHooks: function(a, b) {
            var c = b + "queueHooks";
            return n._data(a, c) || n._data(a, c, {
                empty: n.Callbacks("once memory").add(function() {
                    n._removeData(a, b + "queue"),
                    n._removeData(a, c)
                })
            })
        }
    }),
    n.fn.extend({
        queue: function(a, b) {
            var c = 2;
            return "string" != typeof a && (b = a,
            a = "fx",
            c--),
            arguments.length < c ? n.queue(this[0], a) : void 0 === b ? this : this.each(function() {
                var c = n.queue(this, a, b);
                n._queueHooks(this, a),
                "fx" === a && "inprogress" !== c[0] && n.dequeue(this, a)
            })
        },
        dequeue: function(a) {
            return this.each(function() {
                n.dequeue(this, a)
            })
        },
        clearQueue: function(a) {
            return this.queue(a || "fx", [])
        },
        promise: function(a, b) {
            var c, d = 1, e = n.Deferred(), f = this, g = this.length, h = function() {
                --d || e.resolveWith(f, [f])
            };
            "string" != typeof a && (b = a,
            a = void 0),
            a = a || "fx";
            while (g--)
                c = n._data(f[g], a + "queueHooks"),
                c && c.empty && (d++,
                c.empty.add(h));
            return h(),
            e.promise(b)
        }
    }),
    function() {
        var a;
        l.shrinkWrapBlocks = function() {
            if (null != a)
                return a;
            a = !1;
            var b, c, e;
            return c = d.getElementsByTagName("body")[0],
            c && c.style ? (b = d.createElement("div"),
            e = d.createElement("div"),
            e.style.cssText = "position:absolute;border:0;width:0;height:0;top:0;left:-9999px",
            c.appendChild(e).appendChild(b),
            "undefined" != typeof b.style.zoom && (b.style.cssText = "-webkit-box-sizing:content-box;-moz-box-sizing:content-box;box-sizing:content-box;display:block;margin:0;border:0;padding:1px;width:1px;zoom:1",
            b.appendChild(d.createElement("div")).style.width = "5px",
            a = 3 !== b.offsetWidth),
            c.removeChild(e),
            a) : void 0
        }
    }();
    var T = /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source
      , U = new RegExp("^(?:([+-])=|)(" + T + ")([a-z%]*)$","i")
      , V = ["Top", "Right", "Bottom", "Left"]
      , W = function(a, b) {
        return a = b || a,
        "none" === n.css(a, "display") || !n.contains(a.ownerDocument, a)
    };
    function X(a, b, c, d) {
        var e, f = 1, g = 20, h = d ? function() {
            return d.cur()
        }
        : function() {
            return n.css(a, b, "")
        }
        , i = h(), j = c && c[3] || (n.cssNumber[b] ? "" : "px"), k = (n.cssNumber[b] || "px" !== j && +i) && U.exec(n.css(a, b));
        if (k && k[3] !== j) {
            j = j || k[3],
            c = c || [],
            k = +i || 1;
            do
                f = f || ".5",
                k /= f,
                n.style(a, b, k + j);
            while (f !== (f = h() / i) && 1 !== f && --g)
        }
        return c && (k = +k || +i || 0,
        e = c[1] ? k + (c[1] + 1) * c[2] : +c[2],
        d && (d.unit = j,
        d.start = k,
        d.end = e)),
        e
    }
    var Y = function(a, b, c, d, e, f, g) {
        var h = 0
          , i = a.length
          , j = null == c;
        if ("object" === n.type(c)) {
            e = !0;
            for (h in c)
                Y(a, b, h, c[h], !0, f, g)
        } else if (void 0 !== d && (e = !0,
        n.isFunction(d) || (g = !0),
        j && (g ? (b.call(a, d),
        b = null) : (j = b,
        b = function(a, b, c) {
            return j.call(n(a), c)
        }
        )),
        b))
            for (; i > h; h++)
                b(a[h], c, g ? d : d.call(a[h], h, b(a[h], c)));
        return e ? a : j ? b.call(a) : i ? b(a[0], c) : f
    }
      , Z = /^(?:checkbox|radio)$/i
      , $ = /<([\w:-]+)/
      , _ = /^$|\/(?:java|ecma)script/i
      , aa = /^\s+/
      , ba = "abbr|article|aside|audio|bdi|canvas|data|datalist|details|dialog|figcaption|figure|footer|header|hgroup|main|mark|meter|nav|output|picture|progress|section|summary|template|time|video";
    function ca(a) {
        var b = ba.split("|")
          , c = a.createDocumentFragment();
        if (c.createElement)
            while (b.length)
                c.createElement(b.pop());
        return c
    }
    !function() {
        var a = d.createElement("div")
          , b = d.createDocumentFragment()
          , c = d.createElement("input");
        a.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>",
        l.leadingWhitespace = 3 === a.firstChild.nodeType,
        l.tbody = !a.getElementsByTagName("tbody").length,
        l.htmlSerialize = !!a.getElementsByTagName("link").length,
        l.html5Clone = "<:nav></:nav>" !== d.createElement("nav").cloneNode(!0).outerHTML,
        c.type = "checkbox",
        c.checked = !0,
        b.appendChild(c),
        l.appendChecked = c.checked,
        a.innerHTML = "<textarea>x</textarea>",
        l.noCloneChecked = !!a.cloneNode(!0).lastChild.defaultValue,
        b.appendChild(a),
        c = d.createElement("input"),
        c.setAttribute("type", "radio"),
        c.setAttribute("checked", "checked"),
        c.setAttribute("name", "t"),
        a.appendChild(c),
        l.checkClone = a.cloneNode(!0).cloneNode(!0).lastChild.checked,
        l.noCloneEvent = !!a.addEventListener,
        a[n.expando] = 1,
        l.attributes = !a.getAttribute(n.expando)
    }();
    var da = {
        option: [1, "<select multiple='multiple'>", "</select>"],
        legend: [1, "<fieldset>", "</fieldset>"],
        area: [1, "<map>", "</map>"],
        param: [1, "<object>", "</object>"],
        thead: [1, "<table>", "</table>"],
        tr: [2, "<table><tbody>", "</tbody></table>"],
        col: [2, "<table><tbody></tbody><colgroup>", "</colgroup></table>"],
        td: [3, "<table><tbody><tr>", "</tr></tbody></table>"],
        _default: l.htmlSerialize ? [0, "", ""] : [1, "X<div>", "</div>"]
    };
    da.optgroup = da.option,
    da.tbody = da.tfoot = da.colgroup = da.caption = da.thead,
    da.th = da.td;
    function ea(a, b) {
        var c, d, e = 0, f = "undefined" != typeof a.getElementsByTagName ? a.getElementsByTagName(b || "*") : "undefined" != typeof a.querySelectorAll ? a.querySelectorAll(b || "*") : void 0;
        if (!f)
            for (f = [],
            c = a.childNodes || a; null != (d = c[e]); e++)
                !b || n.nodeName(d, b) ? f.push(d) : n.merge(f, ea(d, b));
        return void 0 === b || b && n.nodeName(a, b) ? n.merge([a], f) : f
    }
    function fa(a, b) {
        for (var c, d = 0; null != (c = a[d]); d++)
            n._data(c, "globalEval", !b || n._data(b[d], "globalEval"))
    }
    var ga = /<|&#?\w+;/
      , ha = /<tbody/i;
    function ia(a) {
        Z.test(a.type) && (a.defaultChecked = a.checked)
    }
    function ja(a, b, c, d, e) {
        for (var f, g, h, i, j, k, m, o = a.length, p = ca(b), q = [], r = 0; o > r; r++)
            if (g = a[r],
            g || 0 === g)
                if ("object" === n.type(g))
                    n.merge(q, g.nodeType ? [g] : g);
                else if (ga.test(g)) {
                    i = i || p.appendChild(b.createElement("div")),
                    j = ($.exec(g) || ["", ""])[1].toLowerCase(),
                    m = da[j] || da._default,
                    i.innerHTML = m[1] + n.htmlPrefilter(g) + m[2],
                    f = m[0];
                    while (f--)
                        i = i.lastChild;
                    if (!l.leadingWhitespace && aa.test(g) && q.push(b.createTextNode(aa.exec(g)[0])),
                    !l.tbody) {
                        g = "table" !== j || ha.test(g) ? "<table>" !== m[1] || ha.test(g) ? 0 : i : i.firstChild,
                        f = g && g.childNodes.length;
                        while (f--)
                            n.nodeName(k = g.childNodes[f], "tbody") && !k.childNodes.length && g.removeChild(k)
                    }
                    n.merge(q, i.childNodes),
                    i.textContent = "";
                    while (i.firstChild)
                        i.removeChild(i.firstChild);
                    i = p.lastChild
                } else
                    q.push(b.createTextNode(g));
        i && p.removeChild(i),
        l.appendChecked || n.grep(ea(q, "input"), ia),
        r = 0;
        while (g = q[r++])
            if (d && n.inArray(g, d) > -1)
                e && e.push(g);
            else if (h = n.contains(g.ownerDocument, g),
            i = ea(p.appendChild(g), "script"),
            h && fa(i),
            c) {
                f = 0;
                while (g = i[f++])
                    _.test(g.type || "") && c.push(g)
            }
        return i = null,
        p
    }
    !function() {
        var b, c, e = d.createElement("div");
        for (b in {
            submit: !0,
            change: !0,
            focusin: !0
        })
            c = "on" + b,
            (l[b] = c in a) || (e.setAttribute(c, "t"),
            l[b] = e.attributes[c].expando === !1);
        e = null
    }();
    var ka = /^(?:input|select|textarea)$/i
      , la = /^key/
      , ma = /^(?:mouse|pointer|contextmenu|drag|drop)|click/
      , na = /^(?:focusinfocus|focusoutblur)$/
      , oa = /^([^.]*)(?:\.(.+)|)/;
    function pa() {
        return !0
    }
    function qa() {
        return !1
    }
    function ra() {
        try {
            return d.activeElement
        } catch (a) {}
    }
    function sa(a, b, c, d, e, f) {
        var g, h;
        if ("object" == typeof b) {
            "string" != typeof c && (d = d || c,
            c = void 0);
            for (h in b)
                sa(a, h, c, d, b[h], f);
            return a
        }
        if (null == d && null == e ? (e = c,
        d = c = void 0) : null == e && ("string" == typeof c ? (e = d,
        d = void 0) : (e = d,
        d = c,
        c = void 0)),
        e === !1)
            e = qa;
        else if (!e)
            return a;
        return 1 === f && (g = e,
        e = function(a) {
            return n().off(a),
            g.apply(this, arguments)
        }
        ,
        e.guid = g.guid || (g.guid = n.guid++)),
        a.each(function() {
            n.event.add(this, b, e, d, c)
        })
    }
    n.event = {
        global: {},
        add: function(a, b, c, d, e) {
            var f, g, h, i, j, k, l, m, o, p, q, r = n._data(a);
            if (r) {
                c.handler && (i = c,
                c = i.handler,
                e = i.selector),
                c.guid || (c.guid = n.guid++),
                (g = r.events) || (g = r.events = {}),
                (k = r.handle) || (k = r.handle = function(a) {
                    return "undefined" == typeof n || a && n.event.triggered === a.type ? void 0 : n.event.dispatch.apply(k.elem, arguments)
                }
                ,
                k.elem = a),
                b = (b || "").match(G) || [""],
                h = b.length;
                while (h--)
                    f = oa.exec(b[h]) || [],
                    o = q = f[1],
                    p = (f[2] || "").split(".").sort(),
                    o && (j = n.event.special[o] || {},
                    o = (e ? j.delegateType : j.bindType) || o,
                    j = n.event.special[o] || {},
                    l = n.extend({
                        type: o,
                        origType: q,
                        data: d,
                        handler: c,
                        guid: c.guid,
                        selector: e,
                        needsContext: e && n.expr.match.needsContext.test(e),
                        namespace: p.join(".")
                    }, i),
                    (m = g[o]) || (m = g[o] = [],
                    m.delegateCount = 0,
                    j.setup && j.setup.call(a, d, p, k) !== !1 || (a.addEventListener ? a.addEventListener(o, k, !1) : a.attachEvent && a.attachEvent("on" + o, k))),
                    j.add && (j.add.call(a, l),
                    l.handler.guid || (l.handler.guid = c.guid)),
                    e ? m.splice(m.delegateCount++, 0, l) : m.push(l),
                    n.event.global[o] = !0);
                a = null
            }
        },
        remove: function(a, b, c, d, e) {
            var f, g, h, i, j, k, l, m, o, p, q, r = n.hasData(a) && n._data(a);
            if (r && (k = r.events)) {
                b = (b || "").match(G) || [""],
                j = b.length;
                while (j--)
                    if (h = oa.exec(b[j]) || [],
                    o = q = h[1],
                    p = (h[2] || "").split(".").sort(),
                    o) {
                        l = n.event.special[o] || {},
                        o = (d ? l.delegateType : l.bindType) || o,
                        m = k[o] || [],
                        h = h[2] && new RegExp("(^|\\.)" + p.join("\\.(?:.*\\.|)") + "(\\.|$)"),
                        i = f = m.length;
                        while (f--)
                            g = m[f],
                            !e && q !== g.origType || c && c.guid !== g.guid || h && !h.test(g.namespace) || d && d !== g.selector && ("**" !== d || !g.selector) || (m.splice(f, 1),
                            g.selector && m.delegateCount--,
                            l.remove && l.remove.call(a, g));
                        i && !m.length && (l.teardown && l.teardown.call(a, p, r.handle) !== !1 || n.removeEvent(a, o, r.handle),
                        delete k[o])
                    } else
                        for (o in k)
                            n.event.remove(a, o + b[j], c, d, !0);
                n.isEmptyObject(k) && (delete r.handle,
                n._removeData(a, "events"))
            }
        },
        trigger: function(b, c, e, f) {
            var g, h, i, j, l, m, o, p = [e || d], q = k.call(b, "type") ? b.type : b, r = k.call(b, "namespace") ? b.namespace.split(".") : [];
            if (i = m = e = e || d,
            3 !== e.nodeType && 8 !== e.nodeType && !na.test(q + n.event.triggered) && (q.indexOf(".") > -1 && (r = q.split("."),
            q = r.shift(),
            r.sort()),
            h = q.indexOf(":") < 0 && "on" + q,
            b = b[n.expando] ? b : new n.Event(q,"object" == typeof b && b),
            b.isTrigger = f ? 2 : 3,
            b.namespace = r.join("."),
            b.rnamespace = b.namespace ? new RegExp("(^|\\.)" + r.join("\\.(?:.*\\.|)") + "(\\.|$)") : null,
            b.result = void 0,
            b.target || (b.target = e),
            c = null == c ? [b] : n.makeArray(c, [b]),
            l = n.event.special[q] || {},
            f || !l.trigger || l.trigger.apply(e, c) !== !1)) {
                if (!f && !l.noBubble && !n.isWindow(e)) {
                    for (j = l.delegateType || q,
                    na.test(j + q) || (i = i.parentNode); i; i = i.parentNode)
                        p.push(i),
                        m = i;
                    m === (e.ownerDocument || d) && p.push(m.defaultView || m.parentWindow || a)
                }
                o = 0;
                while ((i = p[o++]) && !b.isPropagationStopped())
                    b.type = o > 1 ? j : l.bindType || q,
                    g = (n._data(i, "events") || {})[b.type] && n._data(i, "handle"),
                    g && g.apply(i, c),
                    g = h && i[h],
                    g && g.apply && M(i) && (b.result = g.apply(i, c),
                    b.result === !1 && b.preventDefault());
                if (b.type = q,
                !f && !b.isDefaultPrevented() && (!l._default || l._default.apply(p.pop(), c) === !1) && M(e) && h && e[q] && !n.isWindow(e)) {
                    m = e[h],
                    m && (e[h] = null),
                    n.event.triggered = q;
                    try {
                        e[q]()
                    } catch (s) {}
                    n.event.triggered = void 0,
                    m && (e[h] = m)
                }
                return b.result
            }
        },
        dispatch: function(a) {
            a = n.event.fix(a);
            var b, c, d, f, g, h = [], i = e.call(arguments), j = (n._data(this, "events") || {})[a.type] || [], k = n.event.special[a.type] || {};
            if (i[0] = a,
            a.delegateTarget = this,
            !k.preDispatch || k.preDispatch.call(this, a) !== !1) {
                h = n.event.handlers.call(this, a, j),
                b = 0;
                while ((f = h[b++]) && !a.isPropagationStopped()) {
                    a.currentTarget = f.elem,
                    c = 0;
                    while ((g = f.handlers[c++]) && !a.isImmediatePropagationStopped())
                        (!a.rnamespace || a.rnamespace.test(g.namespace)) && (a.handleObj = g,
                        a.data = g.data,
                        d = ((n.event.special[g.origType] || {}).handle || g.handler).apply(f.elem, i),
                        void 0 !== d && (a.result = d) === !1 && (a.preventDefault(),
                        a.stopPropagation()))
                }
                return k.postDispatch && k.postDispatch.call(this, a),
                a.result
            }
        },
        handlers: function(a, b) {
            var c, d, e, f, g = [], h = b.delegateCount, i = a.target;
            if (h && i.nodeType && ("click" !== a.type || isNaN(a.button) || a.button < 1))
                for (; i != this; i = i.parentNode || this)
                    if (1 === i.nodeType && (i.disabled !== !0 || "click" !== a.type)) {
                        for (d = [],
                        c = 0; h > c; c++)
                            f = b[c],
                            e = f.selector + " ",
                            void 0 === d[e] && (d[e] = f.needsContext ? n(e, this).index(i) > -1 : n.find(e, this, null, [i]).length),
                            d[e] && d.push(f);
                        d.length && g.push({
                            elem: i,
                            handlers: d
                        })
                    }
            return h < b.length && g.push({
                elem: this,
                handlers: b.slice(h)
            }),
            g
        },
        fix: function(a) {
            if (a[n.expando])
                return a;
            var b, c, e, f = a.type, g = a, h = this.fixHooks[f];
            h || (this.fixHooks[f] = h = ma.test(f) ? this.mouseHooks : la.test(f) ? this.keyHooks : {}),
            e = h.props ? this.props.concat(h.props) : this.props,
            a = new n.Event(g),
            b = e.length;
            while (b--)
                c = e[b],
                a[c] = g[c];
            return a.target || (a.target = g.srcElement || d),
            3 === a.target.nodeType && (a.target = a.target.parentNode),
            a.metaKey = !!a.metaKey,
            h.filter ? h.filter(a, g) : a
        },
        props: "altKey bubbles cancelable ctrlKey currentTarget detail eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(" "),
        fixHooks: {},
        keyHooks: {
            props: "char charCode key keyCode".split(" "),
            filter: function(a, b) {
                return null == a.which && (a.which = null != b.charCode ? b.charCode : b.keyCode),
                a
            }
        },
        mouseHooks: {
            props: "button buttons clientX clientY fromElement offsetX offsetY pageX pageY screenX screenY toElement".split(" "),
            filter: function(a, b) {
                var c, e, f, g = b.button, h = b.fromElement;
                return null == a.pageX && null != b.clientX && (e = a.target.ownerDocument || d,
                f = e.documentElement,
                c = e.body,
                a.pageX = b.clientX + (f && f.scrollLeft || c && c.scrollLeft || 0) - (f && f.clientLeft || c && c.clientLeft || 0),
                a.pageY = b.clientY + (f && f.scrollTop || c && c.scrollTop || 0) - (f && f.clientTop || c && c.clientTop || 0)),
                !a.relatedTarget && h && (a.relatedTarget = h === a.target ? b.toElement : h),
                a.which || void 0 === g || (a.which = 1 & g ? 1 : 2 & g ? 3 : 4 & g ? 2 : 0),
                a
            }
        },
        special: {
            load: {
                noBubble: !0
            },
            focus: {
                trigger: function() {
                    if (this !== ra() && this.focus)
                        try {
                            return this.focus(),
                            !1
                        } catch (a) {}
                },
                delegateType: "focusin"
            },
            blur: {
                trigger: function() {
                    return this === ra() && this.blur ? (this.blur(),
                    !1) : void 0
                },
                delegateType: "focusout"
            },
            click: {
                trigger: function() {
                    return n.nodeName(this, "input") && "checkbox" === this.type && this.click ? (this.click(),
                    !1) : void 0
                },
                _default: function(a) {
                    return n.nodeName(a.target, "a")
                }
            },
            beforeunload: {
                postDispatch: function(a) {
                    void 0 !== a.result && a.originalEvent && (a.originalEvent.returnValue = a.result)
                }
            }
        },
        simulate: function(a, b, c) {
            var d = n.extend(new n.Event, c, {
                type: a,
                isSimulated: !0
            });
            n.event.trigger(d, null, b),
            d.isDefaultPrevented() && c.preventDefault()
        }
    },
    n.removeEvent = d.removeEventListener ? function(a, b, c) {
        a.removeEventListener && a.removeEventListener(b, c)
    }
    : function(a, b, c) {
        var d = "on" + b;
        a.detachEvent && ("undefined" == typeof a[d] && (a[d] = null),
        a.detachEvent(d, c))
    }
    ,
    n.Event = function(a, b) {
        return this instanceof n.Event ? (a && a.type ? (this.originalEvent = a,
        this.type = a.type,
        this.isDefaultPrevented = a.defaultPrevented || void 0 === a.defaultPrevented && a.returnValue === !1 ? pa : qa) : this.type = a,
        b && n.extend(this, b),
        this.timeStamp = a && a.timeStamp || n.now(),
        void (this[n.expando] = !0)) : new n.Event(a,b)
    }
    ,
    n.Event.prototype = {
        constructor: n.Event,
        isDefaultPrevented: qa,
        isPropagationStopped: qa,
        isImmediatePropagationStopped: qa,
        preventDefault: function() {
            var a = this.originalEvent;
            this.isDefaultPrevented = pa,
            a && (a.preventDefault ? a.preventDefault() : a.returnValue = !1)
        },
        stopPropagation: function() {
            var a = this.originalEvent;
            this.isPropagationStopped = pa,
            a && !this.isSimulated && (a.stopPropagation && a.stopPropagation(),
            a.cancelBubble = !0)
        },
        stopImmediatePropagation: function() {
            var a = this.originalEvent;
            this.isImmediatePropagationStopped = pa,
            a && a.stopImmediatePropagation && a.stopImmediatePropagation(),
            this.stopPropagation()
        }
    },
    n.each({
        mouseenter: "mouseover",
        mouseleave: "mouseout",
        pointerenter: "pointerover",
        pointerleave: "pointerout"
    }, function(a, b) {
        n.event.special[a] = {
            delegateType: b,
            bindType: b,
            handle: function(a) {
                var c, d = this, e = a.relatedTarget, f = a.handleObj;
                return (!e || e !== d && !n.contains(d, e)) && (a.type = f.origType,
                c = f.handler.apply(this, arguments),
                a.type = b),
                c
            }
        }
    }),
    l.submit || (n.event.special.submit = {
        setup: function() {
            return n.nodeName(this, "form") ? !1 : void n.event.add(this, "click._submit keypress._submit", function(a) {
                var b = a.target
                  , c = n.nodeName(b, "input") || n.nodeName(b, "button") ? n.prop(b, "form") : void 0;
                c && !n._data(c, "submit") && (n.event.add(c, "submit._submit", function(a) {
                    a._submitBubble = !0
                }),
                n._data(c, "submit", !0))
            })
        },
        postDispatch: function(a) {
            a._submitBubble && (delete a._submitBubble,
            this.parentNode && !a.isTrigger && n.event.simulate("submit", this.parentNode, a))
        },
        teardown: function() {
            return n.nodeName(this, "form") ? !1 : void n.event.remove(this, "._submit")
        }
    }),
    l.change || (n.event.special.change = {
        setup: function() {
            return ka.test(this.nodeName) ? (("checkbox" === this.type || "radio" === this.type) && (n.event.add(this, "propertychange._change", function(a) {
                "checked" === a.originalEvent.propertyName && (this._justChanged = !0)
            }),
            n.event.add(this, "click._change", function(a) {
                this._justChanged && !a.isTrigger && (this._justChanged = !1),
                n.event.simulate("change", this, a)
            })),
            !1) : void n.event.add(this, "beforeactivate._change", function(a) {
                var b = a.target;
                ka.test(b.nodeName) && !n._data(b, "change") && (n.event.add(b, "change._change", function(a) {
                    !this.parentNode || a.isSimulated || a.isTrigger || n.event.simulate("change", this.parentNode, a)
                }),
                n._data(b, "change", !0))
            })
        },
        handle: function(a) {
            var b = a.target;
            return this !== b || a.isSimulated || a.isTrigger || "radio" !== b.type && "checkbox" !== b.type ? a.handleObj.handler.apply(this, arguments) : void 0
        },
        teardown: function() {
            return n.event.remove(this, "._change"),
            !ka.test(this.nodeName)
        }
    }),
    l.focusin || n.each({
        focus: "focusin",
        blur: "focusout"
    }, function(a, b) {
        var c = function(a) {
            n.event.simulate(b, a.target, n.event.fix(a))
        };
        n.event.special[b] = {
            setup: function() {
                var d = this.ownerDocument || this
                  , e = n._data(d, b);
                e || d.addEventListener(a, c, !0),
                n._data(d, b, (e || 0) + 1)
            },
            teardown: function() {
                var d = this.ownerDocument || this
                  , e = n._data(d, b) - 1;
                e ? n._data(d, b, e) : (d.removeEventListener(a, c, !0),
                n._removeData(d, b))
            }
        }
    }),
    n.fn.extend({
        on: function(a, b, c, d) {
            return sa(this, a, b, c, d)
        },
        one: function(a, b, c, d) {
            return sa(this, a, b, c, d, 1)
        },
        off: function(a, b, c) {
            var d, e;
            if (a && a.preventDefault && a.handleObj)
                return d = a.handleObj,
                n(a.delegateTarget).off(d.namespace ? d.origType + "." + d.namespace : d.origType, d.selector, d.handler),
                this;
            if ("object" == typeof a) {
                for (e in a)
                    this.off(e, b, a[e]);
                return this
            }
            return (b === !1 || "function" == typeof b) && (c = b,
            b = void 0),
            c === !1 && (c = qa),
            this.each(function() {
                n.event.remove(this, a, c, b)
            })
        },
        trigger: function(a, b) {
            return this.each(function() {
                n.event.trigger(a, b, this)
            })
        },
        triggerHandler: function(a, b) {
            var c = this[0];
            return c ? n.event.trigger(a, b, c, !0) : void 0
        }
    });
    var ta = / jQuery\d+="(?:null|\d+)"/g
      , ua = new RegExp("<(?:" + ba + ")[\\s/>]","i")
      , va = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:-]+)[^>]*)\/>/gi
      , wa = /<script|<style|<link/i
      , xa = /checked\s*(?:[^=]|=\s*.checked.)/i
      , ya = /^true\/(.*)/
      , za = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g
      , Aa = ca(d)
      , Ba = Aa.appendChild(d.createElement("div"));
    function Ca(a, b) {
        return n.nodeName(a, "table") && n.nodeName(11 !== b.nodeType ? b : b.firstChild, "tr") ? a.getElementsByTagName("tbody")[0] || a.appendChild(a.ownerDocument.createElement("tbody")) : a
    }
    function Da(a) {
        return a.type = (null !== n.find.attr(a, "type")) + "/" + a.type,
        a
    }
    function Ea(a) {
        var b = ya.exec(a.type);
        return b ? a.type = b[1] : a.removeAttribute("type"),
        a
    }
    function Fa(a, b) {
        if (1 === b.nodeType && n.hasData(a)) {
            var c, d, e, f = n._data(a), g = n._data(b, f), h = f.events;
            if (h) {
                delete g.handle,
                g.events = {};
                for (c in h)
                    for (d = 0,
                    e = h[c].length; e > d; d++)
                        n.event.add(b, c, h[c][d])
            }
            g.data && (g.data = n.extend({}, g.data))
        }
    }
    function Ga(a, b) {
        var c, d, e;
        if (1 === b.nodeType) {
            if (c = b.nodeName.toLowerCase(),
            !l.noCloneEvent && b[n.expando]) {
                e = n._data(b);
                for (d in e.events)
                    n.removeEvent(b, d, e.handle);
                b.removeAttribute(n.expando)
            }
            "script" === c && b.text !== a.text ? (Da(b).text = a.text,
            Ea(b)) : "object" === c ? (b.parentNode && (b.outerHTML = a.outerHTML),
            l.html5Clone && a.innerHTML && !n.trim(b.innerHTML) && (b.innerHTML = a.innerHTML)) : "input" === c && Z.test(a.type) ? (b.defaultChecked = b.checked = a.checked,
            b.value !== a.value && (b.value = a.value)) : "option" === c ? b.defaultSelected = b.selected = a.defaultSelected : ("input" === c || "textarea" === c) && (b.defaultValue = a.defaultValue)
        }
    }
    function Ha(a, b, c, d) {
        b = f.apply([], b);
        var e, g, h, i, j, k, m = 0, o = a.length, p = o - 1, q = b[0], r = n.isFunction(q);
        if (r || o > 1 && "string" == typeof q && !l.checkClone && xa.test(q))
            return a.each(function(e) {
                var f = a.eq(e);
                r && (b[0] = q.call(this, e, f.html())),
                Ha(f, b, c, d)
            });
        if (o && (k = ja(b, a[0].ownerDocument, !1, a, d),
        e = k.firstChild,
        1 === k.childNodes.length && (k = e),
        e || d)) {
            for (i = n.map(ea(k, "script"), Da),
            h = i.length; o > m; m++)
                g = k,
                m !== p && (g = n.clone(g, !0, !0),
                h && n.merge(i, ea(g, "script"))),
                c.call(a[m], g, m);
            if (h)
                for (j = i[i.length - 1].ownerDocument,
                n.map(i, Ea),
                m = 0; h > m; m++)
                    g = i[m],
                    _.test(g.type || "") && !n._data(g, "globalEval") && n.contains(j, g) && (g.src ? n._evalUrl && n._evalUrl(g.src) : n.globalEval((g.text || g.textContent || g.innerHTML || "").replace(za, "")));
            k = e = null
        }
        return a
    }
    function Ia(a, b, c) {
        for (var d, e = b ? n.filter(b, a) : a, f = 0; null != (d = e[f]); f++)
            c || 1 !== d.nodeType || n.cleanData(ea(d)),
            d.parentNode && (c && n.contains(d.ownerDocument, d) && fa(ea(d, "script")),
            d.parentNode.removeChild(d));
        return a
    }
    n.extend({
        htmlPrefilter: function(a) {
            return a.replace(va, "<$1></$2>")
        },
        clone: function(a, b, c) {
            var d, e, f, g, h, i = n.contains(a.ownerDocument, a);
            if (l.html5Clone || n.isXMLDoc(a) || !ua.test("<" + a.nodeName + ">") ? f = a.cloneNode(!0) : (Ba.innerHTML = a.outerHTML,
            Ba.removeChild(f = Ba.firstChild)),
            !(l.noCloneEvent && l.noCloneChecked || 1 !== a.nodeType && 11 !== a.nodeType || n.isXMLDoc(a)))
                for (d = ea(f),
                h = ea(a),
                g = 0; null != (e = h[g]); ++g)
                    d[g] && Ga(e, d[g]);
            if (b)
                if (c)
                    for (h = h || ea(a),
                    d = d || ea(f),
                    g = 0; null != (e = h[g]); g++)
                        Fa(e, d[g]);
                else
                    Fa(a, f);
            return d = ea(f, "script"),
            d.length > 0 && fa(d, !i && ea(a, "script")),
            d = h = e = null,
            f
        },
        cleanData: function(a, b) {
            for (var d, e, f, g, h = 0, i = n.expando, j = n.cache, k = l.attributes, m = n.event.special; null != (d = a[h]); h++)
                if ((b || M(d)) && (f = d[i],
                g = f && j[f])) {
                    if (g.events)
                        for (e in g.events)
                            m[e] ? n.event.remove(d, e) : n.removeEvent(d, e, g.handle);
                    j[f] && (delete j[f],
                    k || "undefined" == typeof d.removeAttribute ? d[i] = void 0 : d.removeAttribute(i),
                    c.push(f))
                }
        }
    }),
    n.fn.extend({
        domManip: Ha,
        detach: function(a) {
            return Ia(this, a, !0)
        },
        remove: function(a) {
            return Ia(this, a)
        },
        text: function(a) {
            return Y(this, function(a) {
                return void 0 === a ? n.text(this) : this.empty().append((this[0] && this[0].ownerDocument || d).createTextNode(a))
            }, null, a, arguments.length)
        },
        append: function() {
            return Ha(this, arguments, function(a) {
                if (1 === this.nodeType || 11 === this.nodeType || 9 === this.nodeType) {
                    var b = Ca(this, a);
                    b.appendChild(a)
                }
            })
        },
        prepend: function() {
            return Ha(this, arguments, function(a) {
                if (1 === this.nodeType || 11 === this.nodeType || 9 === this.nodeType) {
                    var b = Ca(this, a);
                    b.insertBefore(a, b.firstChild)
                }
            })
        },
        before: function() {
            return Ha(this, arguments, function(a) {
                this.parentNode && this.parentNode.insertBefore(a, this)
            })
        },
        after: function() {
            return Ha(this, arguments, function(a) {
                this.parentNode && this.parentNode.insertBefore(a, this.nextSibling)
            })
        },
        empty: function() {
            for (var a, b = 0; null != (a = this[b]); b++) {
                1 === a.nodeType && n.cleanData(ea(a, !1));
                while (a.firstChild)
                    a.removeChild(a.firstChild);
                a.options && n.nodeName(a, "select") && (a.options.length = 0)
            }
            return this
        },
        clone: function(a, b) {
            return a = null == a ? !1 : a,
            b = null == b ? a : b,
            this.map(function() {
                return n.clone(this, a, b)
            })
        },
        html: function(a) {
            return Y(this, function(a) {
                var b = this[0] || {}
                  , c = 0
                  , d = this.length;
                if (void 0 === a)
                    return 1 === b.nodeType ? b.innerHTML.replace(ta, "") : void 0;
                if ("string" == typeof a && !wa.test(a) && (l.htmlSerialize || !ua.test(a)) && (l.leadingWhitespace || !aa.test(a)) && !da[($.exec(a) || ["", ""])[1].toLowerCase()]) {
                    a = n.htmlPrefilter(a);
                    try {
                        for (; d > c; c++)
                            b = this[c] || {},
                            1 === b.nodeType && (n.cleanData(ea(b, !1)),
                            b.innerHTML = a);
                        b = 0
                    } catch (e) {}
                }
                b && this.empty().append(a)
            }, null, a, arguments.length)
        },
        replaceWith: function() {
            var a = [];
            return Ha(this, arguments, function(b) {
                var c = this.parentNode;
                n.inArray(this, a) < 0 && (n.cleanData(ea(this)),
                c && c.replaceChild(b, this))
            }, a)
        }
    }),
    n.each({
        appendTo: "append",
        prependTo: "prepend",
        insertBefore: "before",
        insertAfter: "after",
        replaceAll: "replaceWith"
    }, function(a, b) {
        n.fn[a] = function(a) {
            for (var c, d = 0, e = [], f = n(a), h = f.length - 1; h >= d; d++)
                c = d === h ? this : this.clone(!0),
                n(f[d])[b](c),
                g.apply(e, c.get());
            return this.pushStack(e)
        }
    });
    var Ja, Ka = {
        HTML: "block",
        BODY: "block"
    };
    function La(a, b) {
        var c = n(b.createElement(a)).appendTo(b.body)
          , d = n.css(c[0], "display");
        return c.detach(),
        d
    }
    function Ma(a) {
        var b = d
          , c = Ka[a];
        return c || (c = La(a, b),
        "none" !== c && c || (Ja = (Ja || n("<iframe frameborder='0' width='0' height='0'/>")).appendTo(b.documentElement),
        b = (Ja[0].contentWindow || Ja[0].contentDocument).document,
        b.write(),
        b.close(),
        c = La(a, b),
        Ja.detach()),
        Ka[a] = c),
        c
    }
    var Na = /^margin/
      , Oa = new RegExp("^(" + T + ")(?!px)[a-z%]+$","i")
      , Pa = function(a, b, c, d) {
        var e, f, g = {};
        for (f in b)
            g[f] = a.style[f],
            a.style[f] = b[f];
        e = c.apply(a, d || []);
        for (f in b)
            a.style[f] = g[f];
        return e
    }
      , Qa = d.documentElement;
    !function() {
        var b, c, e, f, g, h, i = d.createElement("div"), j = d.createElement("div");
        if (j.style) {
            j.style.cssText = "float:left;opacity:.5",
            l.opacity = "0.5" === j.style.opacity,
            l.cssFloat = !!j.style.cssFloat,
            j.style.backgroundClip = "content-box",
            j.cloneNode(!0).style.backgroundClip = "",
            l.clearCloneStyle = "content-box" === j.style.backgroundClip,
            i = d.createElement("div"),
            i.style.cssText = "border:0;width:8px;height:0;top:0;left:-9999px;padding:0;margin-top:1px;position:absolute",
            j.innerHTML = "",
            i.appendChild(j),
            l.boxSizing = "" === j.style.boxSizing || "" === j.style.MozBoxSizing || "" === j.style.WebkitBoxSizing,
            n.extend(l, {
                reliableHiddenOffsets: function() {
                    return null == b && k(),
                    f
                },
                boxSizingReliable: function() {
                    return null == b && k(),
                    e
                },
                pixelMarginRight: function() {
                    return null == b && k(),
                    c
                },
                pixelPosition: function() {
                    return null == b && k(),
                    b
                },
                reliableMarginRight: function() {
                    return null == b && k(),
                    g
                },
                reliableMarginLeft: function() {
                    return null == b && k(),
                    h
                }
            });
            function k() {
                var k, l, m = d.documentElement;
                m.appendChild(i),
                j.style.cssText = "-webkit-box-sizing:border-box;box-sizing:border-box;position:relative;display:block;margin:auto;border:1px;padding:1px;top:1%;width:50%",
                b = e = h = !1,
                c = g = !0,
                a.getComputedStyle && (l = a.getComputedStyle(j),
                b = "1%" !== (l || {}).top,
                h = "2px" === (l || {}).marginLeft,
                e = "4px" === (l || {
                    width: "4px"
                }).width,
                j.style.marginRight = "50%",
                c = "4px" === (l || {
                    marginRight: "4px"
                }).marginRight,
                k = j.appendChild(d.createElement("div")),
                k.style.cssText = j.style.cssText = "-webkit-box-sizing:content-box;-moz-box-sizing:content-box;box-sizing:content-box;display:block;margin:0;border:0;padding:0",
                k.style.marginRight = k.style.width = "0",
                j.style.width = "1px",
                g = !parseFloat((a.getComputedStyle(k) || {}).marginRight),
                j.removeChild(k)),
                j.style.display = "none",
                f = 0 === j.getClientRects().length,
                f && (j.style.display = "",
                j.innerHTML = "<table><tr><td></td><td>t</td></tr></table>",
                k = j.getElementsByTagName("td"),
                k[0].style.cssText = "margin:0;border:0;padding:0;display:none",
                f = 0 === k[0].offsetHeight,
                f && (k[0].style.display = "",
                k[1].style.display = "none",
                f = 0 === k[0].offsetHeight)),
                m.removeChild(i)
            }
        }
    }();
    var Ra, Sa, Ta = /^(top|right|bottom|left)$/;
    a.getComputedStyle ? (Ra = function(b) {
        var c = b.ownerDocument.defaultView;
        return c.opener || (c = a),
        c.getComputedStyle(b)
    }
    ,
    Sa = function(a, b, c) {
        var d, e, f, g, h = a.style;
        return c = c || Ra(a),
        g = c ? c.getPropertyValue(b) || c[b] : void 0,
        c && ("" !== g || n.contains(a.ownerDocument, a) || (g = n.style(a, b)),
        !l.pixelMarginRight() && Oa.test(g) && Na.test(b) && (d = h.width,
        e = h.minWidth,
        f = h.maxWidth,
        h.minWidth = h.maxWidth = h.width = g,
        g = c.width,
        h.width = d,
        h.minWidth = e,
        h.maxWidth = f)),
        void 0 === g ? g : g + ""
    }
    ) : Qa.currentStyle && (Ra = function(a) {
        return a.currentStyle
    }
    ,
    Sa = function(a, b, c) {
        var d, e, f, g, h = a.style;
        return c = c || Ra(a),
        g = c ? c[b] : void 0,
        null == g && h && h[b] && (g = h[b]),
        Oa.test(g) && !Ta.test(b) && (d = h.left,
        e = a.runtimeStyle,
        f = e && e.left,
        f && (e.left = a.currentStyle.left),
        h.left = "fontSize" === b ? "1em" : g,
        g = h.pixelLeft + "px",
        h.left = d,
        f && (e.left = f)),
        void 0 === g ? g : g + "" || "auto"
    }
    );
    function Ua(a, b) {
        return {
            get: function() {
                return a() ? void delete this.get : (this.get = b).apply(this, arguments)
            }
        }
    }
    var Va = /alpha\([^)]*\)/i
      , Wa = /opacity\s*=\s*([^)]*)/i
      , Xa = /^(none|table(?!-c[ea]).+)/
      , Ya = new RegExp("^(" + T + ")(.*)$","i")
      , Za = {
        position: "absolute",
        visibility: "hidden",
        display: "block"
    }
      , $a = {
        letterSpacing: "0",
        fontWeight: "400"
    }
      , _a = ["Webkit", "O", "Moz", "ms"]
      , ab = d.createElement("div").style;
    function bb(a) {
        if (a in ab)
            return a;
        var b = a.charAt(0).toUpperCase() + a.slice(1)
          , c = _a.length;
        while (c--)
            if (a = _a[c] + b,
            a in ab)
                return a
    }
    function cb(a, b) {
        for (var c, d, e, f = [], g = 0, h = a.length; h > g; g++)
            d = a[g],
            d.style && (f[g] = n._data(d, "olddisplay"),
            c = d.style.display,
            b ? (f[g] || "none" !== c || (d.style.display = ""),
            "" === d.style.display && W(d) && (f[g] = n._data(d, "olddisplay", Ma(d.nodeName)))) : (e = W(d),
            (c && "none" !== c || !e) && n._data(d, "olddisplay", e ? c : n.css(d, "display"))));
        for (g = 0; h > g; g++)
            d = a[g],
            d.style && (b && "none" !== d.style.display && "" !== d.style.display || (d.style.display = b ? f[g] || "" : "none"));
        return a
    }
    function db(a, b, c) {
        var d = Ya.exec(b);
        return d ? Math.max(0, d[1] - (c || 0)) + (d[2] || "px") : b
    }
    function eb(a, b, c, d, e) {
        for (var f = c === (d ? "border" : "content") ? 4 : "width" === b ? 1 : 0, g = 0; 4 > f; f += 2)
            "margin" === c && (g += n.css(a, c + V[f], !0, e)),
            d ? ("content" === c && (g -= n.css(a, "padding" + V[f], !0, e)),
            "margin" !== c && (g -= n.css(a, "border" + V[f] + "Width", !0, e))) : (g += n.css(a, "padding" + V[f], !0, e),
            "padding" !== c && (g += n.css(a, "border" + V[f] + "Width", !0, e)));
        return g
    }
    function fb(b, c, e) {
        var f = !0
          , g = "width" === c ? b.offsetWidth : b.offsetHeight
          , h = Ra(b)
          , i = l.boxSizing && "border-box" === n.css(b, "boxSizing", !1, h);
        if (d.msFullscreenElement && a.top !== a && b.getClientRects().length && (g = Math.round(100 * b.getBoundingClientRect()[c])),
        0 >= g || null == g) {
            if (g = Sa(b, c, h),
            (0 > g || null == g) && (g = b.style[c]),
            Oa.test(g))
                return g;
            f = i && (l.boxSizingReliable() || g === b.style[c]),
            g = parseFloat(g) || 0
        }
        return g + eb(b, c, e || (i ? "border" : "content"), f, h) + "px"
    }
    n.extend({
        cssHooks: {
            opacity: {
                get: function(a, b) {
                    if (b) {
                        var c = Sa(a, "opacity");
                        return "" === c ? "1" : c
                    }
                }
            }
        },
        cssNumber: {
            animationIterationCount: !0,
            columnCount: !0,
            fillOpacity: !0,
            flexGrow: !0,
            flexShrink: !0,
            fontWeight: !0,
            lineHeight: !0,
            opacity: !0,
            order: !0,
            orphans: !0,
            widows: !0,
            zIndex: !0,
            zoom: !0
        },
        cssProps: {
            "float": l.cssFloat ? "cssFloat" : "styleFloat"
        },
        style: function(a, b, c, d) {
            if (a && 3 !== a.nodeType && 8 !== a.nodeType && a.style) {
                var e, f, g, h = n.camelCase(b), i = a.style;
                if (b = n.cssProps[h] || (n.cssProps[h] = bb(h) || h),
                g = n.cssHooks[b] || n.cssHooks[h],
                void 0 === c)
                    return g && "get"in g && void 0 !== (e = g.get(a, !1, d)) ? e : i[b];
                if (f = typeof c,
                "string" === f && (e = U.exec(c)) && e[1] && (c = X(a, b, e),
                f = "number"),
                null != c && c === c && ("number" === f && (c += e && e[3] || (n.cssNumber[h] ? "" : "px")),
                l.clearCloneStyle || "" !== c || 0 !== b.indexOf("background") || (i[b] = "inherit"),
                !(g && "set"in g && void 0 === (c = g.set(a, c, d)))))
                    try {
                        i[b] = c
                    } catch (j) {}
            }
        },
        css: function(a, b, c, d) {
            var e, f, g, h = n.camelCase(b);
            return b = n.cssProps[h] || (n.cssProps[h] = bb(h) || h),
            g = n.cssHooks[b] || n.cssHooks[h],
            g && "get"in g && (f = g.get(a, !0, c)),
            void 0 === f && (f = Sa(a, b, d)),
            "normal" === f && b in $a && (f = $a[b]),
            "" === c || c ? (e = parseFloat(f),
            c === !0 || isFinite(e) ? e || 0 : f) : f
        }
    }),
    n.each(["height", "width"], function(a, b) {
        n.cssHooks[b] = {
            get: function(a, c, d) {
                return c ? Xa.test(n.css(a, "display")) && 0 === a.offsetWidth ? Pa(a, Za, function() {
                    return fb(a, b, d)
                }) : fb(a, b, d) : void 0
            },
            set: function(a, c, d) {
                var e = d && Ra(a);
                return db(a, c, d ? eb(a, b, d, l.boxSizing && "border-box" === n.css(a, "boxSizing", !1, e), e) : 0)
            }
        }
    }),
    l.opacity || (n.cssHooks.opacity = {
        get: function(a, b) {
            return Wa.test((b && a.currentStyle ? a.currentStyle.filter : a.style.filter) || "") ? .01 * parseFloat(RegExp.$1) + "" : b ? "1" : ""
        },
        set: function(a, b) {
            var c = a.style
              , d = a.currentStyle
              , e = n.isNumeric(b) ? "alpha(opacity=" + 100 * b + ")" : ""
              , f = d && d.filter || c.filter || "";
            c.zoom = 1,
            (b >= 1 || "" === b) && "" === n.trim(f.replace(Va, "")) && c.removeAttribute && (c.removeAttribute("filter"),
            "" === b || d && !d.filter) || (c.filter = Va.test(f) ? f.replace(Va, e) : f + " " + e)
        }
    }),
    n.cssHooks.marginRight = Ua(l.reliableMarginRight, function(a, b) {
        return b ? Pa(a, {
            display: "inline-block"
        }, Sa, [a, "marginRight"]) : void 0
    }),
    n.cssHooks.marginLeft = Ua(l.reliableMarginLeft, function(a, b) {
        return b ? (parseFloat(Sa(a, "marginLeft")) || (n.contains(a.ownerDocument, a) ? a.getBoundingClientRect().left - Pa(a, {
            marginLeft: 0
        }, function() {
            return a.getBoundingClientRect().left
        }) : 0)) + "px" : void 0
    }),
    n.each({
        margin: "",
        padding: "",
        border: "Width"
    }, function(a, b) {
        n.cssHooks[a + b] = {
            expand: function(c) {
                for (var d = 0, e = {}, f = "string" == typeof c ? c.split(" ") : [c]; 4 > d; d++)
                    e[a + V[d] + b] = f[d] || f[d - 2] || f[0];
                return e
            }
        },
        Na.test(a) || (n.cssHooks[a + b].set = db)
    }),
    n.fn.extend({
        css: function(a, b) {
            return Y(this, function(a, b, c) {
                var d, e, f = {}, g = 0;
                if (n.isArray(b)) {
                    for (d = Ra(a),
                    e = b.length; e > g; g++)
                        f[b[g]] = n.css(a, b[g], !1, d);
                    return f
                }
                return void 0 !== c ? n.style(a, b, c) : n.css(a, b)
            }, a, b, arguments.length > 1)
        },
        show: function() {
            return cb(this, !0)
        },
        hide: function() {
            return cb(this)
        },
        toggle: function(a) {
            return "boolean" == typeof a ? a ? this.show() : this.hide() : this.each(function() {
                W(this) ? n(this).show() : n(this).hide()
            })
        }
    });
    function gb(a, b, c, d, e) {
        return new gb.prototype.init(a,b,c,d,e)
    }
    n.Tween = gb,
    gb.prototype = {
        constructor: gb,
        init: function(a, b, c, d, e, f) {
            this.elem = a,
            this.prop = c,
            this.easing = e || n.easing._default,
            this.options = b,
            this.start = this.now = this.cur(),
            this.end = d,
            this.unit = f || (n.cssNumber[c] ? "" : "px")
        },
        cur: function() {
            var a = gb.propHooks[this.prop];
            return a && a.get ? a.get(this) : gb.propHooks._default.get(this)
        },
        run: function(a) {
            var b, c = gb.propHooks[this.prop];
            return this.options.duration ? this.pos = b = n.easing[this.easing](a, this.options.duration * a, 0, 1, this.options.duration) : this.pos = b = a,
            this.now = (this.end - this.start) * b + this.start,
            this.options.step && this.options.step.call(this.elem, this.now, this),
            c && c.set ? c.set(this) : gb.propHooks._default.set(this),
            this
        }
    },
    gb.prototype.init.prototype = gb.prototype,
    gb.propHooks = {
        _default: {
            get: function(a) {
                var b;
                return 1 !== a.elem.nodeType || null != a.elem[a.prop] && null == a.elem.style[a.prop] ? a.elem[a.prop] : (b = n.css(a.elem, a.prop, ""),
                b && "auto" !== b ? b : 0)
            },
            set: function(a) {
                n.fx.step[a.prop] ? n.fx.step[a.prop](a) : 1 !== a.elem.nodeType || null == a.elem.style[n.cssProps[a.prop]] && !n.cssHooks[a.prop] ? a.elem[a.prop] = a.now : n.style(a.elem, a.prop, a.now + a.unit)
            }
        }
    },
    gb.propHooks.scrollTop = gb.propHooks.scrollLeft = {
        set: function(a) {
            a.elem.nodeType && a.elem.parentNode && (a.elem[a.prop] = a.now)
        }
    },
    n.easing = {
        linear: function(a) {
            return a
        },
        swing: function(a) {
            return .5 - Math.cos(a * Math.PI) / 2
        },
        _default: "swing"
    },
    n.fx = gb.prototype.init,
    n.fx.step = {};
    var hb, ib, jb = /^(?:toggle|show|hide)$/, kb = /queueHooks$/;
    function lb() {
        return a.setTimeout(function() {
            hb = void 0
        }),
        hb = n.now()
    }
    function mb(a, b) {
        var c, d = {
            height: a
        }, e = 0;
        for (b = b ? 1 : 0; 4 > e; e += 2 - b)
            c = V[e],
            d["margin" + c] = d["padding" + c] = a;
        return b && (d.opacity = d.width = a),
        d
    }
    function nb(a, b, c) {
        for (var d, e = (qb.tweeners[b] || []).concat(qb.tweeners["*"]), f = 0, g = e.length; g > f; f++)
            if (d = e[f].call(c, b, a))
                return d
    }
    function ob(a, b, c) {
        var d, e, f, g, h, i, j, k, m = this, o = {}, p = a.style, q = a.nodeType && W(a), r = n._data(a, "fxshow");
        c.queue || (h = n._queueHooks(a, "fx"),
        null == h.unqueued && (h.unqueued = 0,
        i = h.empty.fire,
        h.empty.fire = function() {
            h.unqueued || i()
        }
        ),
        h.unqueued++,
        m.always(function() {
            m.always(function() {
                h.unqueued--,
                n.queue(a, "fx").length || h.empty.fire()
            })
        })),
        1 === a.nodeType && ("height"in b || "width"in b) && (c.overflow = [p.overflow, p.overflowX, p.overflowY],
        j = n.css(a, "display"),
        k = "none" === j ? n._data(a, "olddisplay") || Ma(a.nodeName) : j,
        "inline" === k && "none" === n.css(a, "float") && (l.inlineBlockNeedsLayout && "inline" !== Ma(a.nodeName) ? p.zoom = 1 : p.display = "inline-block")),
        c.overflow && (p.overflow = "hidden",
        l.shrinkWrapBlocks() || m.always(function() {
            p.overflow = c.overflow[0],
            p.overflowX = c.overflow[1],
            p.overflowY = c.overflow[2]
        }));
        for (d in b)
            if (e = b[d],
            jb.exec(e)) {
                if (delete b[d],
                f = f || "toggle" === e,
                e === (q ? "hide" : "show")) {
                    if ("show" !== e || !r || void 0 === r[d])
                        continue;
                    q = !0
                }
                o[d] = r && r[d] || n.style(a, d)
            } else
                j = void 0;
        if (n.isEmptyObject(o))
            "inline" === ("none" === j ? Ma(a.nodeName) : j) && (p.display = j);
        else {
            r ? "hidden"in r && (q = r.hidden) : r = n._data(a, "fxshow", {}),
            f && (r.hidden = !q),
            q ? n(a).show() : m.done(function() {
                n(a).hide()
            }),
            m.done(function() {
                var b;
                n._removeData(a, "fxshow");
                for (b in o)
                    n.style(a, b, o[b])
            });
            for (d in o)
                g = nb(q ? r[d] : 0, d, m),
                d in r || (r[d] = g.start,
                q && (g.end = g.start,
                g.start = "width" === d || "height" === d ? 1 : 0))
        }
    }
    function pb(a, b) {
        var c, d, e, f, g;
        for (c in a)
            if (d = n.camelCase(c),
            e = b[d],
            f = a[c],
            n.isArray(f) && (e = f[1],
            f = a[c] = f[0]),
            c !== d && (a[d] = f,
            delete a[c]),
            g = n.cssHooks[d],
            g && "expand"in g) {
                f = g.expand(f),
                delete a[d];
                for (c in f)
                    c in a || (a[c] = f[c],
                    b[c] = e)
            } else
                b[d] = e
    }
    function qb(a, b, c) {
        var d, e, f = 0, g = qb.prefilters.length, h = n.Deferred().always(function() {
            delete i.elem
        }), i = function() {
            if (e)
                return !1;
            for (var b = hb || lb(), c = Math.max(0, j.startTime + j.duration - b), d = c / j.duration || 0, f = 1 - d, g = 0, i = j.tweens.length; i > g; g++)
                j.tweens[g].run(f);
            return h.notifyWith(a, [j, f, c]),
            1 > f && i ? c : (h.resolveWith(a, [j]),
            !1)
        }, j = h.promise({
            elem: a,
            props: n.extend({}, b),
            opts: n.extend(!0, {
                specialEasing: {},
                easing: n.easing._default
            }, c),
            originalProperties: b,
            originalOptions: c,
            startTime: hb || lb(),
            duration: c.duration,
            tweens: [],
            createTween: function(b, c) {
                var d = n.Tween(a, j.opts, b, c, j.opts.specialEasing[b] || j.opts.easing);
                return j.tweens.push(d),
                d
            },
            stop: function(b) {
                var c = 0
                  , d = b ? j.tweens.length : 0;
                if (e)
                    return this;
                for (e = !0; d > c; c++)
                    j.tweens[c].run(1);
                return b ? (h.notifyWith(a, [j, 1, 0]),
                h.resolveWith(a, [j, b])) : h.rejectWith(a, [j, b]),
                this
            }
        }), k = j.props;
        for (pb(k, j.opts.specialEasing); g > f; f++)
            if (d = qb.prefilters[f].call(j, a, k, j.opts))
                return n.isFunction(d.stop) && (n._queueHooks(j.elem, j.opts.queue).stop = n.proxy(d.stop, d)),
                d;
        return n.map(k, nb, j),
        n.isFunction(j.opts.start) && j.opts.start.call(a, j),
        n.fx.timer(n.extend(i, {
            elem: a,
            anim: j,
            queue: j.opts.queue
        })),
        j.progress(j.opts.progress).done(j.opts.done, j.opts.complete).fail(j.opts.fail).always(j.opts.always)
    }
    n.Animation = n.extend(qb, {
        tweeners: {
            "*": [function(a, b) {
                var c = this.createTween(a, b);
                return X(c.elem, a, U.exec(b), c),
                c
            }
            ]
        },
        tweener: function(a, b) {
            n.isFunction(a) ? (b = a,
            a = ["*"]) : a = a.match(G);
            for (var c, d = 0, e = a.length; e > d; d++)
                c = a[d],
                qb.tweeners[c] = qb.tweeners[c] || [],
                qb.tweeners[c].unshift(b)
        },
        prefilters: [ob],
        prefilter: function(a, b) {
            b ? qb.prefilters.unshift(a) : qb.prefilters.push(a)
        }
    }),
    n.speed = function(a, b, c) {
        var d = a && "object" == typeof a ? n.extend({}, a) : {
            complete: c || !c && b || n.isFunction(a) && a,
            duration: a,
            easing: c && b || b && !n.isFunction(b) && b
        };
        return d.duration = n.fx.off ? 0 : "number" == typeof d.duration ? d.duration : d.duration in n.fx.speeds ? n.fx.speeds[d.duration] : n.fx.speeds._default,
        (null == d.queue || d.queue === !0) && (d.queue = "fx"),
        d.old = d.complete,
        d.complete = function() {
            n.isFunction(d.old) && d.old.call(this),
            d.queue && n.dequeue(this, d.queue)
        }
        ,
        d
    }
    ,
    n.fn.extend({
        fadeTo: function(a, b, c, d) {
            return this.filter(W).css("opacity", 0).show().end().animate({
                opacity: b
            }, a, c, d)
        },
        animate: function(a, b, c, d) {
            var e = n.isEmptyObject(a)
              , f = n.speed(b, c, d)
              , g = function() {
                var b = qb(this, n.extend({}, a), f);
                (e || n._data(this, "finish")) && b.stop(!0)
            };
            return g.finish = g,
            e || f.queue === !1 ? this.each(g) : this.queue(f.queue, g)
        },
        stop: function(a, b, c) {
            var d = function(a) {
                var b = a.stop;
                delete a.stop,
                b(c)
            };
            return "string" != typeof a && (c = b,
            b = a,
            a = void 0),
            b && a !== !1 && this.queue(a || "fx", []),
            this.each(function() {
                var b = !0
                  , e = null != a && a + "queueHooks"
                  , f = n.timers
                  , g = n._data(this);
                if (e)
                    g[e] && g[e].stop && d(g[e]);
                else
                    for (e in g)
                        g[e] && g[e].stop && kb.test(e) && d(g[e]);
                for (e = f.length; e--; )
                    f[e].elem !== this || null != a && f[e].queue !== a || (f[e].anim.stop(c),
                    b = !1,
                    f.splice(e, 1));
                (b || !c) && n.dequeue(this, a)
            })
        },
        finish: function(a) {
            return a !== !1 && (a = a || "fx"),
            this.each(function() {
                var b, c = n._data(this), d = c[a + "queue"], e = c[a + "queueHooks"], f = n.timers, g = d ? d.length : 0;
                for (c.finish = !0,
                n.queue(this, a, []),
                e && e.stop && e.stop.call(this, !0),
                b = f.length; b--; )
                    f[b].elem === this && f[b].queue === a && (f[b].anim.stop(!0),
                    f.splice(b, 1));
                for (b = 0; g > b; b++)
                    d[b] && d[b].finish && d[b].finish.call(this);
                delete c.finish
            })
        }
    }),
    n.each(["toggle", "show", "hide"], function(a, b) {
        var c = n.fn[b];
        n.fn[b] = function(a, d, e) {
            return null == a || "boolean" == typeof a ? c.apply(this, arguments) : this.animate(mb(b, !0), a, d, e)
        }
    }),
    n.each({
        slideDown: mb("show"),
        slideUp: mb("hide"),
        slideToggle: mb("toggle"),
        fadeIn: {
            opacity: "show"
        },
        fadeOut: {
            opacity: "hide"
        },
        fadeToggle: {
            opacity: "toggle"
        }
    }, function(a, b) {
        n.fn[a] = function(a, c, d) {
            return this.animate(b, a, c, d)
        }
    }),
    n.timers = [],
    n.fx.tick = function() {
        var a, b = n.timers, c = 0;
        for (hb = n.now(); c < b.length; c++)
            a = b[c],
            a() || b[c] !== a || b.splice(c--, 1);
        b.length || n.fx.stop(),
        hb = void 0
    }
    ,
    n.fx.timer = function(a) {
        n.timers.push(a),
        a() ? n.fx.start() : n.timers.pop()
    }
    ,
    n.fx.interval = 13,
    n.fx.start = function() {
        ib || (ib = a.setInterval(n.fx.tick, n.fx.interval))
    }
    ,
    n.fx.stop = function() {
        a.clearInterval(ib),
        ib = null
    }
    ,
    n.fx.speeds = {
        slow: 600,
        fast: 200,
        _default: 400
    },
    n.fn.delay = function(b, c) {
        return b = n.fx ? n.fx.speeds[b] || b : b,
        c = c || "fx",
        this.queue(c, function(c, d) {
            var e = a.setTimeout(c, b);
            d.stop = function() {
                a.clearTimeout(e)
            }
        })
    }
    ,
    function() {
        var a, b = d.createElement("input"), c = d.createElement("div"), e = d.createElement("select"), f = e.appendChild(d.createElement("option"));
        c = d.createElement("div"),
        c.setAttribute("className", "t"),
        c.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>",
        a = c.getElementsByTagName("a")[0],
        b.setAttribute("type", "checkbox"),
        c.appendChild(b),
        a = c.getElementsByTagName("a")[0],
        a.style.cssText = "top:1px",
        l.getSetAttribute = "t" !== c.className,
        l.style = /top/.test(a.getAttribute("style")),
        l.hrefNormalized = "/a" === a.getAttribute("href"),
        l.checkOn = !!b.value,
        l.optSelected = f.selected,
        l.enctype = !!d.createElement("form").enctype,
        e.disabled = !0,
        l.optDisabled = !f.disabled,
        b = d.createElement("input"),
        b.setAttribute("value", ""),
        l.input = "" === b.getAttribute("value"),
        b.value = "t",
        b.setAttribute("type", "radio"),
        l.radioValue = "t" === b.value
    }();
    var rb = /\r/g;
    n.fn.extend({
        val: function(a) {
            var b, c, d, e = this[0];
            {
                if (arguments.length)
                    return d = n.isFunction(a),
                    this.each(function(c) {
                        var e;
                        1 === this.nodeType && (e = d ? a.call(this, c, n(this).val()) : a,
                        null == e ? e = "" : "number" == typeof e ? e += "" : n.isArray(e) && (e = n.map(e, function(a) {
                            return null == a ? "" : a + ""
                        })),
                        b = n.valHooks[this.type] || n.valHooks[this.nodeName.toLowerCase()],
                        b && "set"in b && void 0 !== b.set(this, e, "value") || (this.value = e))
                    });
                if (e)
                    return b = n.valHooks[e.type] || n.valHooks[e.nodeName.toLowerCase()],
                    b && "get"in b && void 0 !== (c = b.get(e, "value")) ? c : (c = e.value,
                    "string" == typeof c ? c.replace(rb, "") : null == c ? "" : c)
            }
        }
    }),
    n.extend({
        valHooks: {
            option: {
                get: function(a) {
                    var b = n.find.attr(a, "value");
                    return null != b ? b : n.trim(n.text(a))
                }
            },
            select: {
                get: function(a) {
                    for (var b, c, d = a.options, e = a.selectedIndex, f = "select-one" === a.type || 0 > e, g = f ? null : [], h = f ? e + 1 : d.length, i = 0 > e ? h : f ? e : 0; h > i; i++)
                        if (c = d[i],
                        (c.selected || i === e) && (l.optDisabled ? !c.disabled : null === c.getAttribute("disabled")) && (!c.parentNode.disabled || !n.nodeName(c.parentNode, "optgroup"))) {
                            if (b = n(c).val(),
                            f)
                                return b;
                            g.push(b)
                        }
                    return g
                },
                set: function(a, b) {
                    var c, d, e = a.options, f = n.makeArray(b), g = e.length;
                    while (g--)
                        if (d = e[g],
                        n.inArray(n.valHooks.option.get(d), f) >= 0)
                            try {
                                d.selected = c = !0
                            } catch (h) {
                                d.scrollHeight
                            }
                        else
                            d.selected = !1;
                    return c || (a.selectedIndex = -1),
                    e
                }
            }
        }
    }),
    n.each(["radio", "checkbox"], function() {
        n.valHooks[this] = {
            set: function(a, b) {
                return n.isArray(b) ? a.checked = n.inArray(n(a).val(), b) > -1 : void 0
            }
        },
        l.checkOn || (n.valHooks[this].get = function(a) {
            return null === a.getAttribute("value") ? "on" : a.value
        }
        )
    });
    var sb, tb, ub = n.expr.attrHandle, vb = /^(?:checked|selected)$/i, wb = l.getSetAttribute, xb = l.input;
    n.fn.extend({
        attr: function(a, b) {
            return Y(this, n.attr, a, b, arguments.length > 1)
        },
        removeAttr: function(a) {
            return this.each(function() {
                n.removeAttr(this, a)
            })
        }
    }),
    n.extend({
        attr: function(a, b, c) {
            var d, e, f = a.nodeType;
            if (3 !== f && 8 !== f && 2 !== f)
                return "undefined" == typeof a.getAttribute ? n.prop(a, b, c) : (1 === f && n.isXMLDoc(a) || (b = b.toLowerCase(),
                e = n.attrHooks[b] || (n.expr.match.bool.test(b) ? tb : sb)),
                void 0 !== c ? null === c ? void n.removeAttr(a, b) : e && "set"in e && void 0 !== (d = e.set(a, c, b)) ? d : (a.setAttribute(b, c + ""),
                c) : e && "get"in e && null !== (d = e.get(a, b)) ? d : (d = n.find.attr(a, b),
                null == d ? void 0 : d))
        },
        attrHooks: {
            type: {
                set: function(a, b) {
                    if (!l.radioValue && "radio" === b && n.nodeName(a, "input")) {
                        var c = a.value;
                        return a.setAttribute("type", b),
                        c && (a.value = c),
                        b
                    }
                }
            }
        },
        removeAttr: function(a, b) {
            var c, d, e = 0, f = b && b.match(G);
            if (f && 1 === a.nodeType)
                while (c = f[e++])
                    d = n.propFix[c] || c,
                    n.expr.match.bool.test(c) ? xb && wb || !vb.test(c) ? a[d] = !1 : a[n.camelCase("default-" + c)] = a[d] = !1 : n.attr(a, c, ""),
                    a.removeAttribute(wb ? c : d)
        }
    }),
    tb = {
        set: function(a, b, c) {
            return b === !1 ? n.removeAttr(a, c) : xb && wb || !vb.test(c) ? a.setAttribute(!wb && n.propFix[c] || c, c) : a[n.camelCase("default-" + c)] = a[c] = !0,
            c
        }
    },
    n.each(n.expr.match.bool.source.match(/\w+/g), function(a, b) {
        var c = ub[b] || n.find.attr;
        xb && wb || !vb.test(b) ? ub[b] = function(a, b, d) {
            var e, f;
            return d || (f = ub[b],
            ub[b] = e,
            e = null != c(a, b, d) ? b.toLowerCase() : null,
            ub[b] = f),
            e
        }
        : ub[b] = function(a, b, c) {
            return c ? void 0 : a[n.camelCase("default-" + b)] ? b.toLowerCase() : null
        }
    }),
    xb && wb || (n.attrHooks.value = {
        set: function(a, b, c) {
            return n.nodeName(a, "input") ? void (a.defaultValue = b) : sb && sb.set(a, b, c)
        }
    }),
    wb || (sb = {
        set: function(a, b, c) {
            var d = a.getAttributeNode(c);
            return d || a.setAttributeNode(d = a.ownerDocument.createAttribute(c)),
            d.value = b += "",
            "value" === c || b === a.getAttribute(c) ? b : void 0
        }
    },
    ub.id = ub.name = ub.coords = function(a, b, c) {
        var d;
        return c ? void 0 : (d = a.getAttributeNode(b)) && "" !== d.value ? d.value : null
    }
    ,
    n.valHooks.button = {
        get: function(a, b) {
            var c = a.getAttributeNode(b);
            return c && c.specified ? c.value : void 0
        },
        set: sb.set
    },
    n.attrHooks.contenteditable = {
        set: function(a, b, c) {
            sb.set(a, "" === b ? !1 : b, c)
        }
    },
    n.each(["width", "height"], function(a, b) {
        n.attrHooks[b] = {
            set: function(a, c) {
                return "" === c ? (a.setAttribute(b, "auto"),
                c) : void 0
            }
        }
    })),
    l.style || (n.attrHooks.style = {
        get: function(a) {
            return a.style.cssText || void 0
        },
        set: function(a, b) {
            return a.style.cssText = b + ""
        }
    });
    var yb = /^(?:input|select|textarea|button|object)$/i
      , zb = /^(?:a|area)$/i;
    n.fn.extend({
        prop: function(a, b) {
            return Y(this, n.prop, a, b, arguments.length > 1)
        },
        removeProp: function(a) {
            return a = n.propFix[a] || a,
            this.each(function() {
                try {
                    this[a] = void 0,
                    delete this[a]
                } catch (b) {}
            })
        }
    }),
    n.extend({
        prop: function(a, b, c) {
            var d, e, f = a.nodeType;
            if (3 !== f && 8 !== f && 2 !== f)
                return 1 === f && n.isXMLDoc(a) || (b = n.propFix[b] || b,
                e = n.propHooks[b]),
                void 0 !== c ? e && "set"in e && void 0 !== (d = e.set(a, c, b)) ? d : a[b] = c : e && "get"in e && null !== (d = e.get(a, b)) ? d : a[b]
        },
        propHooks: {
            tabIndex: {
                get: function(a) {
                    var b = n.find.attr(a, "tabindex");
                    return b ? parseInt(b, 10) : yb.test(a.nodeName) || zb.test(a.nodeName) && a.href ? 0 : -1
                }
            }
        },
        propFix: {
            "for": "htmlFor",
            "class": "className"
        }
    }),
    l.hrefNormalized || n.each(["href", "src"], function(a, b) {
        n.propHooks[b] = {
            get: function(a) {
                return a.getAttribute(b, 4)
            }
        }
    }),
    l.optSelected || (n.propHooks.selected = {
        get: function(a) {
            var b = a.parentNode;
            return b && (b.selectedIndex,
            b.parentNode && b.parentNode.selectedIndex),
            null
        }
    }),
    n.each(["tabIndex", "readOnly", "maxLength", "cellSpacing", "cellPadding", "rowSpan", "colSpan", "useMap", "frameBorder", "contentEditable"], function() {
        n.propFix[this.toLowerCase()] = this
    }),
    l.enctype || (n.propFix.enctype = "encoding");
    var Ab = /[\t\r\n\f]/g;
    function Bb(a) {
        return n.attr(a, "class") || ""
    }
    n.fn.extend({
        addClass: function(a) {
            var b, c, d, e, f, g, h, i = 0;
            if (n.isFunction(a))
                return this.each(function(b) {
                    n(this).addClass(a.call(this, b, Bb(this)))
                });
            if ("string" == typeof a && a) {
                b = a.match(G) || [];
                while (c = this[i++])
                    if (e = Bb(c),
                    d = 1 === c.nodeType && (" " + e + " ").replace(Ab, " ")) {
                        g = 0;
                        while (f = b[g++])
                            d.indexOf(" " + f + " ") < 0 && (d += f + " ");
                        h = n.trim(d),
                        e !== h && n.attr(c, "class", h)
                    }
            }
            return this
        },
        removeClass: function(a) {
            var b, c, d, e, f, g, h, i = 0;
            if (n.isFunction(a))
                return this.each(function(b) {
                    n(this).removeClass(a.call(this, b, Bb(this)))
                });
            if (!arguments.length)
                return this.attr("class", "");
            if ("string" == typeof a && a) {
                b = a.match(G) || [];
                while (c = this[i++])
                    if (e = Bb(c),
                    d = 1 === c.nodeType && (" " + e + " ").replace(Ab, " ")) {
                        g = 0;
                        while (f = b[g++])
                            while (d.indexOf(" " + f + " ") > -1)
                                d = d.replace(" " + f + " ", " ");
                        h = n.trim(d),
                        e !== h && n.attr(c, "class", h)
                    }
            }
            return this
        },
        toggleClass: function(a, b) {
            var c = typeof a;
            return "boolean" == typeof b && "string" === c ? b ? this.addClass(a) : this.removeClass(a) : n.isFunction(a) ? this.each(function(c) {
                n(this).toggleClass(a.call(this, c, Bb(this), b), b)
            }) : this.each(function() {
                var b, d, e, f;
                if ("string" === c) {
                    d = 0,
                    e = n(this),
                    f = a.match(G) || [];
                    while (b = f[d++])
                        e.hasClass(b) ? e.removeClass(b) : e.addClass(b)
                } else
                    (void 0 === a || "boolean" === c) && (b = Bb(this),
                    b && n._data(this, "__className__", b),
                    n.attr(this, "class", b || a === !1 ? "" : n._data(this, "__className__") || ""))
            })
        },
        hasClass: function(a) {
            var b, c, d = 0;
            b = " " + a + " ";
            while (c = this[d++])
                if (1 === c.nodeType && (" " + Bb(c) + " ").replace(Ab, " ").indexOf(b) > -1)
                    return !0;
            return !1
        }
    }),
    n.each("blur focus focusin focusout load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup error contextmenu".split(" "), function(a, b) {
        n.fn[b] = function(a, c) {
            return arguments.length > 0 ? this.on(b, null, a, c) : this.trigger(b)
        }
    }),
    n.fn.extend({
        hover: function(a, b) {
            return this.mouseenter(a).mouseleave(b || a)
        }
    });
    var Cb = a.location
      , Db = n.now()
      , Eb = /\?/
      , Fb = /(,)|(\[|{)|(}|])|"(?:[^"\\\r\n]|\\["\\\/bfnrt]|\\u[\da-fA-F]{4})*"\s*:?|true|false|null|-?(?!0\d)\d+(?:\.\d+|)(?:[eE][+-]?\d+|)/g;
    n.parseJSON = function(b) {
        if (a.JSON && a.JSON.parse)
            return a.JSON.parse(b + "");
        var c, d = null, e = n.trim(b + "");
        return e && !n.trim(e.replace(Fb, function(a, b, e, f) {
            return c && b && (d = 0),
            0 === d ? a : (c = e || b,
            d += !f - !e,
            "")
        })) ? Function("return " + e)() : n.error("Invalid JSON: " + b)
    }
    ,
    n.parseXML = function(b) {
        var c, d;
        if (!b || "string" != typeof b)
            return null;
        try {
            a.DOMParser ? (d = new a.DOMParser,
            c = d.parseFromString(b, "text/xml")) : (c = new a.ActiveXObject("Microsoft.XMLDOM"),
            c.async = "false",
            c.loadXML(b))
        } catch (e) {
            c = void 0
        }
        return c && c.documentElement && !c.getElementsByTagName("parsererror").length || n.error("Invalid XML: " + b),
        c
    }
    ;
    var Gb = /#.*$/
      , Hb = /([?&])_=[^&]*/
      , Ib = /^(.*?):[ \t]*([^\r\n]*)\r?$/gm
      , Jb = /^(?:about|app|app-storage|.+-extension|file|res|widget):$/
      , Kb = /^(?:GET|HEAD)$/
      , Lb = /^\/\//
      , Mb = /^([\w.+-]+:)(?:\/\/(?:[^\/?#]*@|)([^\/?#:]*)(?::(\d+)|)|)/
      , Nb = {}
      , Ob = {}
      , Pb = "*/".concat("*")
      , Qb = Cb.href
      , Rb = Mb.exec(Qb.toLowerCase()) || [];
    function Sb(a) {
        return function(b, c) {
            "string" != typeof b && (c = b,
            b = "*");
            var d, e = 0, f = b.toLowerCase().match(G) || [];
            if (n.isFunction(c))
                while (d = f[e++])
                    "+" === d.charAt(0) ? (d = d.slice(1) || "*",
                    (a[d] = a[d] || []).unshift(c)) : (a[d] = a[d] || []).push(c)
        }
    }
    function Tb(a, b, c, d) {
        var e = {}
          , f = a === Ob;
        function g(h) {
            var i;
            return e[h] = !0,
            n.each(a[h] || [], function(a, h) {
                var j = h(b, c, d);
                return "string" != typeof j || f || e[j] ? f ? !(i = j) : void 0 : (b.dataTypes.unshift(j),
                g(j),
                !1)
            }),
            i
        }
        return g(b.dataTypes[0]) || !e["*"] && g("*")
    }
    function Ub(a, b) {
        var c, d, e = n.ajaxSettings.flatOptions || {};
        for (d in b)
            void 0 !== b[d] && ((e[d] ? a : c || (c = {}))[d] = b[d]);
        return c && n.extend(!0, a, c),
        a
    }
    function Vb(a, b, c) {
        var d, e, f, g, h = a.contents, i = a.dataTypes;
        while ("*" === i[0])
            i.shift(),
            void 0 === e && (e = a.mimeType || b.getResponseHeader("Content-Type"));
        if (e)
            for (g in h)
                if (h[g] && h[g].test(e)) {
                    i.unshift(g);
                    break
                }
        if (i[0]in c)
            f = i[0];
        else {
            for (g in c) {
                if (!i[0] || a.converters[g + " " + i[0]]) {
                    f = g;
                    break
                }
                d || (d = g)
            }
            f = f || d
        }
        return f ? (f !== i[0] && i.unshift(f),
        c[f]) : void 0
    }
    function Wb(a, b, c, d) {
        var e, f, g, h, i, j = {}, k = a.dataTypes.slice();
        if (k[1])
            for (g in a.converters)
                j[g.toLowerCase()] = a.converters[g];
        f = k.shift();
        while (f)
            if (a.responseFields[f] && (c[a.responseFields[f]] = b),
            !i && d && a.dataFilter && (b = a.dataFilter(b, a.dataType)),
            i = f,
            f = k.shift())
                if ("*" === f)
                    f = i;
                else if ("*" !== i && i !== f) {
                    if (g = j[i + " " + f] || j["* " + f],
                    !g)
                        for (e in j)
                            if (h = e.split(" "),
                            h[1] === f && (g = j[i + " " + h[0]] || j["* " + h[0]])) {
                                g === !0 ? g = j[e] : j[e] !== !0 && (f = h[0],
                                k.unshift(h[1]));
                                break
                            }
                    if (g !== !0)
                        if (g && a["throws"])
                            b = g(b);
                        else
                            try {
                                b = g(b)
                            } catch (l) {
                                return {
                                    state: "parsererror",
                                    error: g ? l : "No conversion from " + i + " to " + f
                                }
                            }
                }
        return {
            state: "success",
            data: b
        }
    }
    n.extend({
        active: 0,
        lastModified: {},
        etag: {},
        ajaxSettings: {
            url: Qb,
            type: "GET",
            isLocal: Jb.test(Rb[1]),
            global: !0,
            processData: !0,
            async: !0,
            contentType: "application/x-www-form-urlencoded; charset=UTF-8",
            accepts: {
                "*": Pb,
                text: "text/plain",
                html: "text/html",
                xml: "application/xml, text/xml",
                json: "application/json, text/javascript"
            },
            contents: {
                xml: /\bxml\b/,
                html: /\bhtml/,
                json: /\bjson\b/
            },
            responseFields: {
                xml: "responseXML",
                text: "responseText",
                json: "responseJSON"
            },
            converters: {
                "* text": String,
                "text html": !0,
                "text json": n.parseJSON,
                "text xml": n.parseXML
            },
            flatOptions: {
                url: !0,
                context: !0
            }
        },
        ajaxSetup: function(a, b) {
            return b ? Ub(Ub(a, n.ajaxSettings), b) : Ub(n.ajaxSettings, a)
        },
        ajaxPrefilter: Sb(Nb),
        ajaxTransport: Sb(Ob),
        ajax: function(b, c) {
            "object" == typeof b && (c = b,
            b = void 0),
            c = c || {};
            var d, e, f, g, h, i, j, k, l = n.ajaxSetup({}, c), m = l.context || l, o = l.context && (m.nodeType || m.jquery) ? n(m) : n.event, p = n.Deferred(), q = n.Callbacks("once memory"), r = l.statusCode || {}, s = {}, t = {}, u = 0, v = "canceled", w = {
                readyState: 0,
                getResponseHeader: function(a) {
                    var b;
                    if (2 === u) {
                        if (!k) {
                            k = {};
                            while (b = Ib.exec(g))
                                k[b[1].toLowerCase()] = b[2]
                        }
                        b = k[a.toLowerCase()]
                    }
                    return null == b ? null : b
                },
                getAllResponseHeaders: function() {
                    return 2 === u ? g : null
                },
                setRequestHeader: function(a, b) {
                    var c = a.toLowerCase();
                    return u || (a = t[c] = t[c] || a,
                    s[a] = b),
                    this
                },
                overrideMimeType: function(a) {
                    return u || (l.mimeType = a),
                    this
                },
                statusCode: function(a) {
                    var b;
                    if (a)
                        if (2 > u)
                            for (b in a)
                                r[b] = [r[b], a[b]];
                        else
                            w.always(a[w.status]);
                    return this
                },
                abort: function(a) {
                    var b = a || v;
                    return j && j.abort(b),
                    y(0, b),
                    this
                }
            };
            if (p.promise(w).complete = q.add,
            w.success = w.done,
            w.error = w.fail,
            l.url = ((b || l.url || Qb) + "").replace(Gb, "").replace(Lb, Rb[1] + "//"),
            l.type = c.method || c.type || l.method || l.type,
            l.dataTypes = n.trim(l.dataType || "*").toLowerCase().match(G) || [""],
            null == l.crossDomain && (d = Mb.exec(l.url.toLowerCase()),
            l.crossDomain = !(!d || d[1] === Rb[1] && d[2] === Rb[2] && (d[3] || ("http:" === d[1] ? "80" : "443")) === (Rb[3] || ("http:" === Rb[1] ? "80" : "443")))),
            l.data && l.processData && "string" != typeof l.data && (l.data = n.param(l.data, l.traditional)),
            Tb(Nb, l, c, w),
            2 === u)
                return w;
            i = n.event && l.global,
            i && 0 === n.active++ && n.event.trigger("ajaxStart"),
            l.type = l.type.toUpperCase(),
            l.hasContent = !Kb.test(l.type),
            f = l.url,
            l.hasContent || (l.data && (f = l.url += (Eb.test(f) ? "&" : "?") + l.data,
            delete l.data),
            l.cache === !1 && (l.url = Hb.test(f) ? f.replace(Hb, "$1_=" + Db++) : f + (Eb.test(f) ? "&" : "?") + "_=" + Db++)),
            l.ifModified && (n.lastModified[f] && w.setRequestHeader("If-Modified-Since", n.lastModified[f]),
            n.etag[f] && w.setRequestHeader("If-None-Match", n.etag[f])),
            (l.data && l.hasContent && l.contentType !== !1 || c.contentType) && w.setRequestHeader("Content-Type", l.contentType),
            w.setRequestHeader("Accept", l.dataTypes[0] && l.accepts[l.dataTypes[0]] ? l.accepts[l.dataTypes[0]] + ("*" !== l.dataTypes[0] ? ", " + Pb + "; q=0.01" : "") : l.accepts["*"]);
            for (e in l.headers)
                w.setRequestHeader(e, l.headers[e]);
            if (l.beforeSend && (l.beforeSend.call(m, w, l) === !1 || 2 === u))
                return w.abort();
            v = "abort";
            for (e in {
                success: 1,
                error: 1,
                complete: 1
            })
                w[e](l[e]);
            if (j = Tb(Ob, l, c, w)) {
                if (w.readyState = 1,
                i && o.trigger("ajaxSend", [w, l]),
                2 === u)
                    return w;
                l.async && l.timeout > 0 && (h = a.setTimeout(function() {
                    w.abort("timeout")
                }, l.timeout));
                try {
                    u = 1,
                    j.send(s, y)
                } catch (x) {
                    if (!(2 > u))
                        throw x;
                    y(-1, x)
                }
            } else
                y(-1, "No Transport");
            function y(b, c, d, e) {
                var k, s, t, v, x, y = c;
                2 !== u && (u = 2,
                h && a.clearTimeout(h),
                j = void 0,
                g = e || "",
                w.readyState = b > 0 ? 4 : 0,
                k = b >= 200 && 300 > b || 304 === b,
                d && (v = Vb(l, w, d)),
                v = Wb(l, v, w, k),
                k ? (l.ifModified && (x = w.getResponseHeader("Last-Modified"),
                x && (n.lastModified[f] = x),
                x = w.getResponseHeader("etag"),
                x && (n.etag[f] = x)),
                204 === b || "HEAD" === l.type ? y = "nocontent" : 304 === b ? y = "notmodified" : (y = v.state,
                s = v.data,
                t = v.error,
                k = !t)) : (t = y,
                (b || !y) && (y = "error",
                0 > b && (b = 0))),
                w.status = b,
                w.statusText = (c || y) + "",
                k ? p.resolveWith(m, [s, y, w]) : p.rejectWith(m, [w, y, t]),
                w.statusCode(r),
                r = void 0,
                i && o.trigger(k ? "ajaxSuccess" : "ajaxError", [w, l, k ? s : t]),
                q.fireWith(m, [w, y]),
                i && (o.trigger("ajaxComplete", [w, l]),
                --n.active || n.event.trigger("ajaxStop")))
            }
            return w
        },
        getJSON: function(a, b, c) {
            return n.get(a, b, c, "json")
        },
        getScript: function(a, b) {
            return n.get(a, void 0, b, "script")
        }
    }),
    n.each(["get", "post"], function(a, b) {
        n[b] = function(a, c, d, e) {
            return n.isFunction(c) && (e = e || d,
            d = c,
            c = void 0),
            n.ajax(n.extend({
                url: a,
                type: b,
                dataType: e,
                data: c,
                success: d
            }, n.isPlainObject(a) && a))
        }
    }),
    n._evalUrl = function(a) {
        return n.ajax({
            url: a,
            type: "GET",
            dataType: "script",
            cache: !0,
            async: !1,
            global: !1,
            "throws": !0
        })
    }
    ,
    n.fn.extend({
        wrapAll: function(a) {
            if (n.isFunction(a))
                return this.each(function(b) {
                    n(this).wrapAll(a.call(this, b))
                });
            if (this[0]) {
                var b = n(a, this[0].ownerDocument).eq(0).clone(!0);
                this[0].parentNode && b.insertBefore(this[0]),
                b.map(function() {
                    var a = this;
                    while (a.firstChild && 1 === a.firstChild.nodeType)
                        a = a.firstChild;
                    return a
                }).append(this)
            }
            return this
        },
        wrapInner: function(a) {
            return n.isFunction(a) ? this.each(function(b) {
                n(this).wrapInner(a.call(this, b))
            }) : this.each(function() {
                var b = n(this)
                  , c = b.contents();
                c.length ? c.wrapAll(a) : b.append(a)
            })
        },
        wrap: function(a) {
            var b = n.isFunction(a);
            return this.each(function(c) {
                n(this).wrapAll(b ? a.call(this, c) : a)
            })
        },
        unwrap: function() {
            return this.parent().each(function() {
                n.nodeName(this, "body") || n(this).replaceWith(this.childNodes)
            }).end()
        }
    });
    function Xb(a) {
        return a.style && a.style.display || n.css(a, "display")
    }
    function Yb(a) {
        while (a && 1 === a.nodeType) {
            if ("none" === Xb(a) || "hidden" === a.type)
                return !0;
            a = a.parentNode
        }
        return !1
    }
    n.expr.filters.hidden = function(a) {
        return l.reliableHiddenOffsets() ? a.offsetWidth <= 0 && a.offsetHeight <= 0 && !a.getClientRects().length : Yb(a)
    }
    ,
    n.expr.filters.visible = function(a) {
        return !n.expr.filters.hidden(a)
    }
    ;
    var Zb = /%20/g
      , $b = /\[\]$/
      , _b = /\r?\n/g
      , ac = /^(?:submit|button|image|reset|file)$/i
      , bc = /^(?:input|select|textarea|keygen)/i;
    function cc(a, b, c, d) {
        var e;
        if (n.isArray(b))
            n.each(b, function(b, e) {
                c || $b.test(a) ? d(a, e) : cc(a + "[" + ("object" == typeof e && null != e ? b : "") + "]", e, c, d)
            });
        else if (c || "object" !== n.type(b))
            d(a, b);
        else
            for (e in b)
                cc(a + "[" + e + "]", b[e], c, d)
    }
    n.param = function(a, b) {
        var c, d = [], e = function(a, b) {
            b = n.isFunction(b) ? b() : null == b ? "" : b,
            d[d.length] = encodeURIComponent(a) + "=" + encodeURIComponent(b)
        };
        if (void 0 === b && (b = n.ajaxSettings && n.ajaxSettings.traditional),
        n.isArray(a) || a.jquery && !n.isPlainObject(a))
            n.each(a, function() {
                e(this.name, this.value)
            });
        else
            for (c in a)
                cc(c, a[c], b, e);
        return d.join("&").replace(Zb, "+")
    }
    ,
    n.fn.extend({
        serialize: function() {
            return n.param(this.serializeArray())
        },
        serializeArray: function() {
            return this.map(function() {
                var a = n.prop(this, "elements");
                return a ? n.makeArray(a) : this
            }).filter(function() {
                var a = this.type;
                return this.name && !n(this).is(":disabled") && bc.test(this.nodeName) && !ac.test(a) && (this.checked || !Z.test(a))
            }).map(function(a, b) {
                var c = n(this).val();
                return null == c ? null : n.isArray(c) ? n.map(c, function(a) {
                    return {
                        name: b.name,
                        value: a.replace(_b, "\r\n")
                    }
                }) : {
                    name: b.name,
                    value: c.replace(_b, "\r\n")
                }
            }).get()
        }
    }),
    n.ajaxSettings.xhr = void 0 !== a.ActiveXObject ? function() {
        return this.isLocal ? hc() : d.documentMode > 8 ? gc() : /^(get|post|head|put|delete|options)$/i.test(this.type) && gc() || hc()
    }
    : gc;
    var dc = 0
      , ec = {}
      , fc = n.ajaxSettings.xhr();
    a.attachEvent && a.attachEvent("onunload", function() {
        for (var a in ec)
            ec[a](void 0, !0)
    }),
    l.cors = !!fc && "withCredentials"in fc,
    fc = l.ajax = !!fc,
    fc && n.ajaxTransport(function(b) {
        if (!b.crossDomain || l.cors) {
            var c;
            return {
                send: function(d, e) {
                    var f, g = b.xhr(), h = ++dc;
                    if (g.open(b.type, b.url, b.async, b.username, b.password),
                    b.xhrFields)
                        for (f in b.xhrFields)
                            g[f] = b.xhrFields[f];
                    b.mimeType && g.overrideMimeType && g.overrideMimeType(b.mimeType),
                    b.crossDomain || d["X-Requested-With"] || (d["X-Requested-With"] = "XMLHttpRequest");
                    for (f in d)
                        void 0 !== d[f] && g.setRequestHeader(f, d[f] + "");
                    g.send(b.hasContent && b.data || null),
                    c = function(a, d) {
                        var f, i, j;
                        if (c && (d || 4 === g.readyState))
                            if (delete ec[h],
                            c = void 0,
                            g.onreadystatechange = n.noop,
                            d)
                                4 !== g.readyState && g.abort();
                            else {
                                j = {},
                                f = g.status,
                                "string" == typeof g.responseText && (j.text = g.responseText);
                                try {
                                    i = g.statusText
                                } catch (k) {
                                    i = ""
                                }
                                f || !b.isLocal || b.crossDomain ? 1223 === f && (f = 204) : f = j.text ? 200 : 404
                            }
                        j && e(f, i, j, g.getAllResponseHeaders())
                    }
                    ,
                    b.async ? 4 === g.readyState ? a.setTimeout(c) : g.onreadystatechange = ec[h] = c : c()
                },
                abort: function() {
                    c && c(void 0, !0)
                }
            }
        }
    });
    function gc() {
        try {
            return new a.XMLHttpRequest
        } catch (b) {}
    }
    function hc() {
        try {
            return new a.ActiveXObject("Microsoft.XMLHTTP")
        } catch (b) {}
    }
    n.ajaxPrefilter(function(a) {
        a.crossDomain && (a.contents.script = !1)
    }),
    n.ajaxSetup({
        accepts: {
            script: "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"
        },
        contents: {
            script: /\b(?:java|ecma)script\b/
        },
        converters: {
            "text script": function(a) {
                return n.globalEval(a),
                a
            }
        }
    }),
    n.ajaxPrefilter("script", function(a) {
        void 0 === a.cache && (a.cache = !1),
        a.crossDomain && (a.type = "GET",
        a.global = !1)
    }),
    n.ajaxTransport("script", function(a) {
        if (a.crossDomain) {
            var b, c = d.head || n("head")[0] || d.documentElement;
            return {
                send: function(e, f) {
                    b = d.createElement("script"),
                    b.async = !0,
                    a.scriptCharset && (b.charset = a.scriptCharset),
                    b.src = a.url,
                    b.onload = b.onreadystatechange = function(a, c) {
                        (c || !b.readyState || /loaded|complete/.test(b.readyState)) && (b.onload = b.onreadystatechange = null,
                        b.parentNode && b.parentNode.removeChild(b),
                        b = null,
                        c || f(200, "success"))
                    }
                    ,
                    c.insertBefore(b, c.firstChild)
                },
                abort: function() {
                    b && b.onload(void 0, !0)
                }
            }
        }
    });
    var ic = []
      , jc = /(=)\?(?=&|$)|\?\?/;
    n.ajaxSetup({
        jsonp: "callback",
        jsonpCallback: function() {
            var a = ic.pop() || n.expando + "_" + Db++;
            return this[a] = !0,
            a
        }
    }),
    n.ajaxPrefilter("json jsonp", function(b, c, d) {
        var e, f, g, h = b.jsonp !== !1 && (jc.test(b.url) ? "url" : "string" == typeof b.data && 0 === (b.contentType || "").indexOf("application/x-www-form-urlencoded") && jc.test(b.data) && "data");
        return h || "jsonp" === b.dataTypes[0] ? (e = b.jsonpCallback = n.isFunction(b.jsonpCallback) ? b.jsonpCallback() : b.jsonpCallback,
        h ? b[h] = b[h].replace(jc, "$1" + e) : b.jsonp !== !1 && (b.url += (Eb.test(b.url) ? "&" : "?") + b.jsonp + "=" + e),
        b.converters["script json"] = function() {
            return g || n.error(e + " was not called"),
            g[0]
        }
        ,
        b.dataTypes[0] = "json",
        f = a[e],
        a[e] = function() {
            g = arguments
        }
        ,
        d.always(function() {
            void 0 === f ? n(a).removeProp(e) : a[e] = f,
            b[e] && (b.jsonpCallback = c.jsonpCallback,
            ic.push(e)),
            g && n.isFunction(f) && f(g[0]),
            g = f = void 0
        }),
        "script") : void 0
    }),
    l.createHTMLDocument = function() {
        if (!d.implementation.createHTMLDocument)
            return !1;
        var a = d.implementation.createHTMLDocument("");
        return a.body.innerHTML = "<form></form><form></form>",
        2 === a.body.childNodes.length
    }(),
    n.parseHTML = function(a, b, c) {
        if (!a || "string" != typeof a)
            return null;
        "boolean" == typeof b && (c = b,
        b = !1),
        b = b || (l.createHTMLDocument ? d.implementation.createHTMLDocument("") : d);
        var e = x.exec(a)
          , f = !c && [];
        return e ? [b.createElement(e[1])] : (e = ja([a], b, f),
        f && f.length && n(f).remove(),
        n.merge([], e.childNodes))
    }
    ;
    var kc = n.fn.load;
    n.fn.load = function(a, b, c) {
        if ("string" != typeof a && kc)
            return kc.apply(this, arguments);
        var d, e, f, g = this, h = a.indexOf(" ");
        return h > -1 && (d = n.trim(a.slice(h, a.length)),
        a = a.slice(0, h)),
        n.isFunction(b) ? (c = b,
        b = void 0) : b && "object" == typeof b && (e = "POST"),
        g.length > 0 && n.ajax({
            url: a,
            type: e || "GET",
            dataType: "html",
            data: b
        }).done(function(a) {
            f = arguments,
            g.html(d ? n("<div>").append(n.parseHTML(a)).find(d) : a)
        }).always(c && function(a, b) {
            g.each(function() {
                c.apply(g, f || [a.responseText, b, a])
            })
        }
        ),
        this
    }
    ,
    n.each(["ajaxStart", "ajaxStop", "ajaxComplete", "ajaxError", "ajaxSuccess", "ajaxSend"], function(a, b) {
        n.fn[b] = function(a) {
            return this.on(b, a)
        }
    }),
    n.expr.filters.animated = function(a) {
        return n.grep(n.timers, function(b) {
            return a === b.elem
        }).length
    }
    ;
    function lc(a) {
        return n.isWindow(a) ? a : 9 === a.nodeType ? a.defaultView || a.parentWindow : !1
    }
    n.offset = {
        setOffset: function(a, b, c) {
            var d, e, f, g, h, i, j, k = n.css(a, "position"), l = n(a), m = {};
            "static" === k && (a.style.position = "relative"),
            h = l.offset(),
            f = n.css(a, "top"),
            i = n.css(a, "left"),
            j = ("absolute" === k || "fixed" === k) && n.inArray("auto", [f, i]) > -1,
            j ? (d = l.position(),
            g = d.top,
            e = d.left) : (g = parseFloat(f) || 0,
            e = parseFloat(i) || 0),
            n.isFunction(b) && (b = b.call(a, c, n.extend({}, h))),
            null != b.top && (m.top = b.top - h.top + g),
            null != b.left && (m.left = b.left - h.left + e),
            "using"in b ? b.using.call(a, m) : l.css(m)
        }
    },
    n.fn.extend({
        offset: function(a) {
            if (arguments.length)
                return void 0 === a ? this : this.each(function(b) {
                    n.offset.setOffset(this, a, b)
                });
            var b, c, d = {
                top: 0,
                left: 0
            }, e = this[0], f = e && e.ownerDocument;
            if (f)
                return b = f.documentElement,
                n.contains(b, e) ? ("undefined" != typeof e.getBoundingClientRect && (d = e.getBoundingClientRect()),
                c = lc(f),
                {
                    top: d.top + (c.pageYOffset || b.scrollTop) - (b.clientTop || 0),
                    left: d.left + (c.pageXOffset || b.scrollLeft) - (b.clientLeft || 0)
                }) : d
        },
        position: function() {
            if (this[0]) {
                var a, b, c = {
                    top: 0,
                    left: 0
                }, d = this[0];
                return "fixed" === n.css(d, "position") ? b = d.getBoundingClientRect() : (a = this.offsetParent(),
                b = this.offset(),
                n.nodeName(a[0], "html") || (c = a.offset()),
                c.top += n.css(a[0], "borderTopWidth", !0) - a.scrollTop(),
                c.left += n.css(a[0], "borderLeftWidth", !0) - a.scrollLeft()),
                {
                    top: b.top - c.top - n.css(d, "marginTop", !0),
                    left: b.left - c.left - n.css(d, "marginLeft", !0)
                }
            }
        },
        offsetParent: function() {
            return this.map(function() {
                var a = this.offsetParent;
                while (a && !n.nodeName(a, "html") && "static" === n.css(a, "position"))
                    a = a.offsetParent;
                return a || Qa
            })
        }
    }),
    n.each({
        scrollLeft: "pageXOffset",
        scrollTop: "pageYOffset"
    }, function(a, b) {
        var c = /Y/.test(b);
        n.fn[a] = function(d) {
            return Y(this, function(a, d, e) {
                var f = lc(a);
                return void 0 === e ? f ? b in f ? f[b] : f.document.documentElement[d] : a[d] : void (f ? f.scrollTo(c ? n(f).scrollLeft() : e, c ? e : n(f).scrollTop()) : a[d] = e)
            }, a, d, arguments.length, null)
        }
    }),
    n.each(["top", "left"], function(a, b) {
        n.cssHooks[b] = Ua(l.pixelPosition, function(a, c) {
            return c ? (c = Sa(a, b),
            Oa.test(c) ? n(a).position()[b] + "px" : c) : void 0
        })
    }),
    n.each({
        Height: "height",
        Width: "width"
    }, function(a, b) {
        n.each({
            padding: "inner" + a,
            content: b,
            "": "outer" + a
        }, function(c, d) {
            n.fn[d] = function(d, e) {
                var f = arguments.length && (c || "boolean" != typeof d)
                  , g = c || (d === !0 || e === !0 ? "margin" : "border");
                return Y(this, function(b, c, d) {
                    var e;
                    return n.isWindow(b) ? b.document.documentElement["client" + a] : 9 === b.nodeType ? (e = b.documentElement,
                    Math.max(b.body["scroll" + a], e["scroll" + a], b.body["offset" + a], e["offset" + a], e["client" + a])) : void 0 === d ? n.css(b, c, g) : n.style(b, c, d, g)
                }, b, f ? d : void 0, f, null)
            }
        })
    }),
    n.fn.extend({
        bind: function(a, b, c) {
            return this.on(a, null, b, c)
        },
        unbind: function(a, b) {
            return this.off(a, null, b)
        },
        delegate: function(a, b, c, d) {
            return this.on(b, a, c, d)
        },
        undelegate: function(a, b, c) {
            return 1 === arguments.length ? this.off(a, "**") : this.off(b, a || "**", c)
        }
    }),
    n.fn.size = function() {
        return this.length
    }
    ,
    n.fn.andSelf = n.fn.addBack,
    "function" == typeof define && define.amd && define("jquery", [], function() {
        return n
    });
    var mc = a.jQuery
      , nc = a.$;
    return n.noConflict = function(b) {
        return a.$ === n && (a.$ = nc),
        b && a.jQuery === n && (a.jQuery = mc),
        n
    }
    ,
    b || (a.jQuery = a.$ = n),
    n
});

if (typeof JSON !== "object") {
    JSON = {}
}
(function() {
    function f(n) {
        return n < 10 ? "0" + n : n
    }
    if (typeof Date.prototype.toJSON !== "function") {
        Date.prototype.toJSON = function() {
            return isFinite(this.valueOf()) ? this.getUTCFullYear() + "-" + f(this.getUTCMonth() + 1) + "-" + f(this.getUTCDate()) + "T" + f(this.getUTCHours()) + ":" + f(this.getUTCMinutes()) + ":" + f(this.getUTCSeconds()) + "Z" : null
        }
        ;
        String.prototype.toJSON = Number.prototype.toJSON = Boolean.prototype.toJSON = function() {
            return this.valueOf()
        }
    }
    var cx, escapable, gap, indent, meta, rep;
    function quote(string) {
        escapable.lastIndex = 0;
        return escapable.test(string) ? '"' + string.replace(escapable, function(a) {
            var c = meta[a];
            return typeof c === "string" ? c : "\\u" + ("0000" + a.charCodeAt(0).toString(16)).slice(-4)
        }) + '"' : '"' + string + '"'
    }
    function str(key, holder) {
        var i, k, v, length, mind = gap, partial, value = holder[key];
        if (value && typeof value === "object" && typeof value.toJSON === "function") {
            value = value.toJSON(key)
        }
        if (typeof rep === "function") {
            value = rep.call(holder, key, value)
        }
        switch (typeof value) {
        case "string":
            return quote(value);
        case "number":
            return isFinite(value) ? String(value) : "null";
        case "boolean":
        case "null":
            return String(value);
        case "object":
            if (!value) {
                return "null"
            }
            gap += indent;
            partial = [];
            if (Object.prototype.toString.apply(value) === "[object Array]") {
                length = value.length;
                for (i = 0; i < length; i += 1) {
                    partial[i] = str(i, value) || "null"
                }
                v = partial.length === 0 ? "[]" : gap ? "[\n" + gap + partial.join(",\n" + gap) + "\n" + mind + "]" : "[" + partial.join(",") + "]";
                gap = mind;
                return v
            }
            if (rep && typeof rep === "object") {
                length = rep.length;
                for (i = 0; i < length; i += 1) {
                    if (typeof rep[i] === "string") {
                        k = rep[i];
                        v = str(k, value);
                        if (v) {
                            partial.push(quote(k) + (gap ? ": " : ":") + v)
                        }
                    }
                }
            } else {
                for (k in value) {
                    if (Object.prototype.hasOwnProperty.call(value, k)) {
                        v = str(k, value);
                        if (v) {
                            partial.push(quote(k) + (gap ? ": " : ":") + v)
                        }
                    }
                }
            }
            v = partial.length === 0 ? "{}" : gap ? "{\n" + gap + partial.join(",\n" + gap) + "\n" + mind + "}" : "{" + partial.join(",") + "}";
            gap = mind;
            return v
        }
    }
    if (typeof JSON.stringify !== "function") {
        escapable = /[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g;
        meta = {
            "\b": "\\b",
            "\t": "\\t",
            "\n": "\\n",
            "\f": "\\f",
            "\r": "\\r",
            '"': '\\"',
            "\\": "\\\\"
        };
        JSON.stringify = function(value, replacer, space) {
            var i;
            gap = "";
            indent = "";
            if (typeof space === "number") {
                for (i = 0; i < space; i += 1) {
                    indent += " "
                }
            } else {
                if (typeof space === "string") {
                    indent = space
                }
            }
            rep = replacer;
            if (replacer && typeof replacer !== "function" && (typeof replacer !== "object" || typeof replacer.length !== "number")) {
                throw new Error("JSON.stringify")
            }
            return str("", {
                "": value
            })
        }
    }
    if (typeof JSON.parse !== "function") {
        cx = /[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g;
        JSON.parse = function(text, reviver) {
            var j;
            function walk(holder, key) {
                var k, v, value = holder[key];
                if (value && typeof value === "object") {
                    for (k in value) {
                        if (Object.prototype.hasOwnProperty.call(value, k)) {
                            v = walk(value, k);
                            if (v !== undefined) {
                                value[k] = v
                            } else {
                                delete value[k]
                            }
                        }
                    }
                }
                return reviver.call(holder, key, value)
            }
            text = String(text);
            cx.lastIndex = 0;
            if (cx.test(text)) {
                text = text.replace(cx, function(a) {
                    return "\\u" + ("0000" + a.charCodeAt(0).toString(16)).slice(-4)
                })
            }
            if (/^[\],:{}\s]*$/.test(text.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g, "@").replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, "]").replace(/(?:^|:|,)(?:\s*\[)+/g, ""))) {
                j = eval("(" + text + ")");
                return typeof reviver === "function" ? walk({
                    "": j
                }, "") : j
            }
            throw new SyntaxError("JSON.parse")
        }
    }
}());
(function(d) {
    var f = Array.prototype.slice;
    var e = {
        dict: null,
        load: function(a) {
            if (this.dict !== null) {
                d.extend(this.dict, a)
            } else {
                this.dict = a
            }
        },
        get: function(a) {
            dict = this.dict;
            if (dict && dict.hasOwnProperty(a)) {
                a = dict[a]
            }
            if (arguments.length == 1) {
                return a
            }
            args = f.call(arguments);
            args[0] = a;
            return this.printf.apply(this, args)
        },
        printf: function(a, b) {
            if (arguments.length < 2) {
                return a
            }
            b = d.isArray(b) ? b : f.call(arguments, 1);
            return a.replace(/\{(\d+)\}/g, function(c, i, j) {
                if (b[parseInt(i)] !== undefined) {
                    return b[parseInt(i)]
                }
                return c
            })
        }
    };
    d.i18n = e
}
)(jQuery);
(function(a) {
    a.caretTo = function(d, c) {
        if (d.createTextRange) {
            var b = d.createTextRange();
            b.move("character", c);
            b.select()
        } else {
            if (d.selectionStart != null) {
                d.focus();
                d.setSelectionRange(c, c)
            }
        }
    }
    ;
    a.caretPos = function(c) {
        if ("selection"in document) {
            var b = c.createTextRange();
            try {
                b.setEndPoint("EndToStart", document.selection.createRange())
            } catch (d) {
                return 0
            }
            return b.text.length
        } else {
            if (c.selectionStart != null) {
                return c.selectionStart
            }
        }
    }
    ;
    a.fn.caret = function(b, c) {
        if (typeof (b) === "undefined") {
            return a.caretPos(this.get(0))
        }
        return this.queue(function(e) {
            if (isNaN(b)) {
                var d = a(this).val().indexOf(b);
                if (c === true) {
                    d += b.length
                } else {
                    if (typeof (c) !== "undefined") {
                        d += c
                    }
                }
                a.caretTo(this, d)
            } else {
                a.caretTo(this, b)
            }
            e()
        })
    }
    ;
    a.fn.caretToStart = function() {
        return this.caret(0)
    }
    ;
    a.fn.caretToEnd = function() {
        return this.queue(function(b) {
            a.caretTo(this, a(this).val().length);
            b()
        })
    }
}(jQuery));
jQuery.cookie = function(b, j, m) {
    if (typeof j != "undefined") {
        m = m || {};
        if (j === null) {
            j = "";
            m.expires = -1
        }
        var e = "";
        if (m.expires && (typeof m.expires == "number" || m.expires.toUTCString)) {
            var f;
            if (typeof m.expires == "number") {
                f = new Date();
                f.setTime(f.getTime() + (m.expires * 24 * 60 * 60 * 1000))
            } else {
                f = m.expires
            }
            e = "; expires=" + f.toUTCString()
        }
        var l = m.path ? "; path=" + (m.path) : "";
        var g = m.domain ? "; domain=" + (m.domain) : "";
        var a = m.secure ? "; secure" : "";
        document.cookie = [b, "=", encodeURIComponent(j), e, l, g, a].join("")
    } else {
        var d = null;
        if (document.cookie && document.cookie != "") {
            var k = document.cookie.split(";");
            for (var h = 0; h < k.length; h++) {
                var c = jQuery.trim(k[h]);
                if (c.substring(0, b.length + 1) == (b + "=")) {
                    d = decodeURIComponent(c.substring(b.length + 1));
                    break
                }
            }
        }
        return d
    }
}
;
/*!
 * Bootstrap v3.4.1 (https://getbootstrap.com/)
 * Copyright 2011-2019 Twitter, Inc.
 * Licensed under the MIT license
 */
if ("undefined" == typeof jQuery)
    throw new Error("Bootstrap's JavaScript requires jQuery");
!function(t) {
    "use strict";
    var e = jQuery.fn.jquery.split(" ")[0].split(".");
    if (e[0] < 2 && e[1] < 9 || 1 == e[0] && 9 == e[1] && e[2] < 1 || 3 < e[0])
        throw new Error("Bootstrap's JavaScript requires jQuery version 1.9.1 or higher, but lower than version 4")
}(),
function(n) {
    "use strict";
    n.fn.emulateTransitionEnd = function(t) {
        var e = !1
          , i = this;
        n(this).one("bsTransitionEnd", function() {
            e = !0
        });
        return setTimeout(function() {
            e || n(i).trigger(n.support.transition.end)
        }, t),
        this
    }
    ,
    n(function() {
        n.support.transition = function o() {
            var t = document.createElement("bootstrap")
              , e = {
                WebkitTransition: "webkitTransitionEnd",
                MozTransition: "transitionend",
                OTransition: "oTransitionEnd otransitionend",
                transition: "transitionend"
            };
            for (var i in e)
                if (t.style[i] !== undefined)
                    return {
                        end: e[i]
                    };
            return !1
        }(),
        n.support.transition && (n.event.special.bsTransitionEnd = {
            bindType: n.support.transition.end,
            delegateType: n.support.transition.end,
            handle: function(t) {
                if (n(t.target).is(this))
                    return t.handleObj.handler.apply(this, arguments)
            }
        })
    })
}(jQuery),
function(s) {
    "use strict";
    var e = '[data-dismiss="alert"]'
      , a = function(t) {
        s(t).on("click", e, this.close)
    };
    a.VERSION = "3.4.1",
    a.TRANSITION_DURATION = 150,
    a.prototype.close = function(t) {
        var e = s(this)
          , i = e.attr("data-target");
        i || (i = (i = e.attr("href")) && i.replace(/.*(?=#[^\s]*$)/, "")),
        i = "#" === i ? [] : i;
        var o = s(document).find(i);
        function n() {
            o.detach().trigger("closed.bs.alert").remove()
        }
        t && t.preventDefault(),
        o.length || (o = e.closest(".alert")),
        o.trigger(t = s.Event("close.bs.alert")),
        t.isDefaultPrevented() || (o.removeClass("in"),
        s.support.transition && o.hasClass("fade") ? o.one("bsTransitionEnd", n).emulateTransitionEnd(a.TRANSITION_DURATION) : n())
    }
    ;
    var t = s.fn.alert;
    s.fn.alert = function o(i) {
        return this.each(function() {
            var t = s(this)
              , e = t.data("bs.alert");
            e || t.data("bs.alert", e = new a(this)),
            "string" == typeof i && e[i].call(t)
        })
    }
    ,
    s.fn.alert.Constructor = a,
    s.fn.alert.noConflict = function() {
        return s.fn.alert = t,
        this
    }
    ,
    s(document).on("click.bs.alert.data-api", e, a.prototype.close)
}(jQuery),
function(s) {
    "use strict";
    var n = function(t, e) {
        this.$element = s(t),
        this.options = s.extend({}, n.DEFAULTS, e),
        this.isLoading = !1
    };
    function i(o) {
        return this.each(function() {
            var t = s(this)
              , e = t.data("bs.button")
              , i = "object" == typeof o && o;
            e || t.data("bs.button", e = new n(this,i)),
            "toggle" == o ? e.toggle() : o && e.setState(o)
        })
    }
    n.VERSION = "3.4.1",
    n.DEFAULTS = {
        loadingText: "loading..."
    },
    n.prototype.setState = function(t) {
        var e = "disabled"
          , i = this.$element
          , o = i.is("input") ? "val" : "html"
          , n = i.data();
        t += "Text",
        null == n.resetText && i.data("resetText", i[o]()),
        setTimeout(s.proxy(function() {
            i[o](null == n[t] ? this.options[t] : n[t]),
            "loadingText" == t ? (this.isLoading = !0,
            i.addClass(e).attr(e, e).prop(e, !0)) : this.isLoading && (this.isLoading = !1,
            i.removeClass(e).removeAttr(e).prop(e, !1))
        }, this), 0)
    }
    ,
    n.prototype.toggle = function() {
        var t = !0
          , e = this.$element.closest('[data-toggle="buttons"]');
        if (e.length) {
            var i = this.$element.find("input");
            "radio" == i.prop("type") ? (i.prop("checked") && (t = !1),
            e.find(".active").removeClass("active"),
            this.$element.addClass("active")) : "checkbox" == i.prop("type") && (i.prop("checked") !== this.$element.hasClass("active") && (t = !1),
            this.$element.toggleClass("active")),
            i.prop("checked", this.$element.hasClass("active")),
            t && i.trigger("change")
        } else
            this.$element.attr("aria-pressed", !this.$element.hasClass("active")),
            this.$element.toggleClass("active")
    }
    ;
    var t = s.fn.button;
    s.fn.button = i,
    s.fn.button.Constructor = n,
    s.fn.button.noConflict = function() {
        return s.fn.button = t,
        this
    }
    ,
    s(document).on("click.bs.button.data-api", '[data-toggle^="button"]', function(t) {
        var e = s(t.target).closest(".btn");
        i.call(e, "toggle"),
        s(t.target).is('input[type="radio"], input[type="checkbox"]') || (t.preventDefault(),
        e.is("input,button") ? e.trigger("focus") : e.find("input:visible,button:visible").first().trigger("focus"))
    }).on("focus.bs.button.data-api blur.bs.button.data-api", '[data-toggle^="button"]', function(t) {
        s(t.target).closest(".btn").toggleClass("focus", /^focus(in)?$/.test(t.type))
    })
}(jQuery),
function(p) {
    "use strict";
    var c = function(t, e) {
        this.$element = p(t),
        this.$indicators = this.$element.find(".carousel-indicators"),
        this.options = e,
        this.paused = null,
        this.sliding = null,
        this.interval = null,
        this.$active = null,
        this.$items = null,
        this.options.keyboard && this.$element.on("keydown.bs.carousel", p.proxy(this.keydown, this)),
        "hover" == this.options.pause && !("ontouchstart"in document.documentElement) && this.$element.on("mouseenter.bs.carousel", p.proxy(this.pause, this)).on("mouseleave.bs.carousel", p.proxy(this.cycle, this))
    };
    function r(n) {
        return this.each(function() {
            var t = p(this)
              , e = t.data("bs.carousel")
              , i = p.extend({}, c.DEFAULTS, t.data(), "object" == typeof n && n)
              , o = "string" == typeof n ? n : i.slide;
            e || t.data("bs.carousel", e = new c(this,i)),
            "number" == typeof n ? e.to(n) : o ? e[o]() : i.interval && e.pause().cycle()
        })
    }
    c.VERSION = "3.4.1",
    c.TRANSITION_DURATION = 600,
    c.DEFAULTS = {
        interval: 5e3,
        pause: "hover",
        wrap: !0,
        keyboard: !0
    },
    c.prototype.keydown = function(t) {
        if (!/input|textarea/i.test(t.target.tagName)) {
            switch (t.which) {
            case 37:
                this.prev();
                break;
            case 39:
                this.next();
                break;
            default:
                return
            }
            t.preventDefault()
        }
    }
    ,
    c.prototype.cycle = function(t) {
        return t || (this.paused = !1),
        this.interval && clearInterval(this.interval),
        this.options.interval && !this.paused && (this.interval = setInterval(p.proxy(this.next, this), this.options.interval)),
        this
    }
    ,
    c.prototype.getItemIndex = function(t) {
        return this.$items = t.parent().children(".item"),
        this.$items.index(t || this.$active)
    }
    ,
    c.prototype.getItemForDirection = function(t, e) {
        var i = this.getItemIndex(e);
        if (("prev" == t && 0 === i || "next" == t && i == this.$items.length - 1) && !this.options.wrap)
            return e;
        var o = (i + ("prev" == t ? -1 : 1)) % this.$items.length;
        return this.$items.eq(o)
    }
    ,
    c.prototype.to = function(t) {
        var e = this
          , i = this.getItemIndex(this.$active = this.$element.find(".item.active"));
        if (!(t > this.$items.length - 1 || t < 0))
            return this.sliding ? this.$element.one("slid.bs.carousel", function() {
                e.to(t)
            }) : i == t ? this.pause().cycle() : this.slide(i < t ? "next" : "prev", this.$items.eq(t))
    }
    ,
    c.prototype.pause = function(t) {
        return t || (this.paused = !0),
        this.$element.find(".next, .prev").length && p.support.transition && (this.$element.trigger(p.support.transition.end),
        this.cycle(!0)),
        this.interval = clearInterval(this.interval),
        this
    }
    ,
    c.prototype.next = function() {
        if (!this.sliding)
            return this.slide("next")
    }
    ,
    c.prototype.prev = function() {
        if (!this.sliding)
            return this.slide("prev")
    }
    ,
    c.prototype.slide = function(t, e) {
        var i = this.$element.find(".item.active")
          , o = e || this.getItemForDirection(t, i)
          , n = this.interval
          , s = "next" == t ? "left" : "right"
          , a = this;
        if (o.hasClass("active"))
            return this.sliding = !1;
        var r = o[0]
          , l = p.Event("slide.bs.carousel", {
            relatedTarget: r,
            direction: s
        });
        if (this.$element.trigger(l),
        !l.isDefaultPrevented()) {
            if (this.sliding = !0,
            n && this.pause(),
            this.$indicators.length) {
                this.$indicators.find(".active").removeClass("active");
                var h = p(this.$indicators.children()[this.getItemIndex(o)]);
                h && h.addClass("active")
            }
            var d = p.Event("slid.bs.carousel", {
                relatedTarget: r,
                direction: s
            });
            return p.support.transition && this.$element.hasClass("slide") ? (o.addClass(t),
            "object" == typeof o && o.length && o[0].offsetWidth,
            i.addClass(s),
            o.addClass(s),
            i.one("bsTransitionEnd", function() {
                o.removeClass([t, s].join(" ")).addClass("active"),
                i.removeClass(["active", s].join(" ")),
                a.sliding = !1,
                setTimeout(function() {
                    a.$element.trigger(d)
                }, 0)
            }).emulateTransitionEnd(c.TRANSITION_DURATION)) : (i.removeClass("active"),
            o.addClass("active"),
            this.sliding = !1,
            this.$element.trigger(d)),
            n && this.cycle(),
            this
        }
    }
    ;
    var t = p.fn.carousel;
    p.fn.carousel = r,
    p.fn.carousel.Constructor = c,
    p.fn.carousel.noConflict = function() {
        return p.fn.carousel = t,
        this
    }
    ;
    var e = function(t) {
        var e = p(this)
          , i = e.attr("href");
        i && (i = i.replace(/.*(?=#[^\s]+$)/, ""));
        var o = e.attr("data-target") || i
          , n = p(document).find(o);
        if (n.hasClass("carousel")) {
            var s = p.extend({}, n.data(), e.data())
              , a = e.attr("data-slide-to");
            a && (s.interval = !1),
            r.call(n, s),
            a && n.data("bs.carousel").to(a),
            t.preventDefault()
        }
    };
    p(document).on("click.bs.carousel.data-api", "[data-slide]", e).on("click.bs.carousel.data-api", "[data-slide-to]", e),
    p(window).on("load", function() {
        p('[data-ride="carousel"]').each(function() {
            var t = p(this);
            r.call(t, t.data())
        })
    })
}(jQuery),
function(a) {
    "use strict";
    var r = function(t, e) {
        this.$element = a(t),
        this.options = a.extend({}, r.DEFAULTS, e),
        this.$trigger = a('[data-toggle="collapse"][href="#' + t.id + '"],[data-toggle="collapse"][data-target="#' + t.id + '"]'),
        this.transitioning = null,
        this.options.parent ? this.$parent = this.getParent() : this.addAriaAndCollapsedClass(this.$element, this.$trigger),
        this.options.toggle && this.toggle()
    };
    function n(t) {
        var e, i = t.attr("data-target") || (e = t.attr("href")) && e.replace(/.*(?=#[^\s]+$)/, "");
        return a(document).find(i)
    }
    function l(o) {
        return this.each(function() {
            var t = a(this)
              , e = t.data("bs.collapse")
              , i = a.extend({}, r.DEFAULTS, t.data(), "object" == typeof o && o);
            !e && i.toggle && /show|hide/.test(o) && (i.toggle = !1),
            e || t.data("bs.collapse", e = new r(this,i)),
            "string" == typeof o && e[o]()
        })
    }
    r.VERSION = "3.4.1",
    r.TRANSITION_DURATION = 350,
    r.DEFAULTS = {
        toggle: !0
    },
    r.prototype.dimension = function() {
        return this.$element.hasClass("width") ? "width" : "height"
    }
    ,
    r.prototype.show = function() {
        if (!this.transitioning && !this.$element.hasClass("in")) {
            var t, e = this.$parent && this.$parent.children(".panel").children(".in, .collapsing");
            if (!(e && e.length && (t = e.data("bs.collapse")) && t.transitioning)) {
                var i = a.Event("show.bs.collapse");
                if (this.$element.trigger(i),
                !i.isDefaultPrevented()) {
                    e && e.length && (l.call(e, "hide"),
                    t || e.data("bs.collapse", null));
                    var o = this.dimension();
                    this.$element.removeClass("collapse").addClass("collapsing")[o](0).attr("aria-expanded", !0),
                    this.$trigger.removeClass("collapsed").attr("aria-expanded", !0),
                    this.transitioning = 1;
                    var n = function() {
                        this.$element.removeClass("collapsing").addClass("collapse in")[o](""),
                        this.transitioning = 0,
                        this.$element.trigger("shown.bs.collapse")
                    };
                    if (!a.support.transition)
                        return n.call(this);
                    var s = a.camelCase(["scroll", o].join("-"));
                    this.$element.one("bsTransitionEnd", a.proxy(n, this)).emulateTransitionEnd(r.TRANSITION_DURATION)[o](this.$element[0][s])
                }
            }
        }
    }
    ,
    r.prototype.hide = function() {
        if (!this.transitioning && this.$element.hasClass("in")) {
            var t = a.Event("hide.bs.collapse");
            if (this.$element.trigger(t),
            !t.isDefaultPrevented()) {
                var e = this.dimension();
                this.$element[e](this.$element[e]())[0].offsetHeight,
                this.$element.addClass("collapsing").removeClass("collapse in").attr("aria-expanded", !1),
                this.$trigger.addClass("collapsed").attr("aria-expanded", !1),
                this.transitioning = 1;
                var i = function() {
                    this.transitioning = 0,
                    this.$element.removeClass("collapsing").addClass("collapse").trigger("hidden.bs.collapse")
                };
                if (!a.support.transition)
                    return i.call(this);
                this.$element[e](0).one("bsTransitionEnd", a.proxy(i, this)).emulateTransitionEnd(r.TRANSITION_DURATION)
            }
        }
    }
    ,
    r.prototype.toggle = function() {
        this[this.$element.hasClass("in") ? "hide" : "show"]()
    }
    ,
    r.prototype.getParent = function() {
        return a(document).find(this.options.parent).find('[data-toggle="collapse"][data-parent="' + this.options.parent + '"]').each(a.proxy(function(t, e) {
            var i = a(e);
            this.addAriaAndCollapsedClass(n(i), i)
        }, this)).end()
    }
    ,
    r.prototype.addAriaAndCollapsedClass = function(t, e) {
        var i = t.hasClass("in");
        t.attr("aria-expanded", i),
        e.toggleClass("collapsed", !i).attr("aria-expanded", i)
    }
    ;
    var t = a.fn.collapse;
    a.fn.collapse = l,
    a.fn.collapse.Constructor = r,
    a.fn.collapse.noConflict = function() {
        return a.fn.collapse = t,
        this
    }
    ,
    a(document).on("click.bs.collapse.data-api", '[data-toggle="collapse"]', function(t) {
        var e = a(this);
        e.attr("data-target") || t.preventDefault();
        var i = n(e)
          , o = i.data("bs.collapse") ? "toggle" : e.data();
        l.call(i, o)
    })
}(jQuery),
function(a) {
    "use strict";
    var r = '[data-toggle="dropdown"]'
      , o = function(t) {
        a(t).on("click.bs.dropdown", this.toggle)
    };
    function l(t) {
        var e = t.attr("data-target");
        e || (e = (e = t.attr("href")) && /#[A-Za-z]/.test(e) && e.replace(/.*(?=#[^\s]*$)/, ""));
        var i = "#" !== e ? a(document).find(e) : null;
        return i && i.length ? i : t.parent()
    }
    function s(o) {
        o && 3 === o.which || (a(".dropdown-backdrop").remove(),
        a(r).each(function() {
            var t = a(this)
              , e = l(t)
              , i = {
                relatedTarget: this
            };
            e.hasClass("open") && (o && "click" == o.type && /input|textarea/i.test(o.target.tagName) && a.contains(e[0], o.target) || (e.trigger(o = a.Event("hide.bs.dropdown", i)),
            o.isDefaultPrevented() || (t.attr("aria-expanded", "false"),
            e.removeClass("open").trigger(a.Event("hidden.bs.dropdown", i)))))
        }))
    }
    o.VERSION = "3.4.1",
    o.prototype.toggle = function(t) {
        var e = a(this);
        if (!e.is(".disabled, :disabled")) {
            var i = l(e)
              , o = i.hasClass("open");
            if (s(),
            !o) {
                "ontouchstart"in document.documentElement && !i.closest(".navbar-nav").length && a(document.createElement("div")).addClass("dropdown-backdrop").insertAfter(a(this)).on("click", s);
                var n = {
                    relatedTarget: this
                };
                if (i.trigger(t = a.Event("show.bs.dropdown", n)),
                t.isDefaultPrevented())
                    return;
                e.trigger("focus").attr("aria-expanded", "true"),
                i.toggleClass("open").trigger(a.Event("shown.bs.dropdown", n))
            }
            return !1
        }
    }
    ,
    o.prototype.keydown = function(t) {
        if (/(38|40|27|32)/.test(t.which) && !/input|textarea/i.test(t.target.tagName)) {
            var e = a(this);
            if (t.preventDefault(),
            t.stopPropagation(),
            !e.is(".disabled, :disabled")) {
                var i = l(e)
                  , o = i.hasClass("open");
                if (!o && 27 != t.which || o && 27 == t.which)
                    return 27 == t.which && i.find(r).trigger("focus"),
                    e.trigger("click");
                var n = i.find(".dropdown-menu li:not(.disabled):visible a");
                if (n.length) {
                    var s = n.index(t.target);
                    38 == t.which && 0 < s && s--,
                    40 == t.which && s < n.length - 1 && s++,
                    ~s || (s = 0),
                    n.eq(s).trigger("focus")
                }
            }
        }
    }
    ;
    var t = a.fn.dropdown;
    a.fn.dropdown = function e(i) {
        return this.each(function() {
            var t = a(this)
              , e = t.data("bs.dropdown");
            e || t.data("bs.dropdown", e = new o(this)),
            "string" == typeof i && e[i].call(t)
        })
    }
    ,
    a.fn.dropdown.Constructor = o,
    a.fn.dropdown.noConflict = function() {
        return a.fn.dropdown = t,
        this
    }
    ,
    a(document).on("click.bs.dropdown.data-api", s).on("click.bs.dropdown.data-api", ".dropdown form", function(t) {
        t.stopPropagation()
    }).on("click.bs.dropdown.data-api", r, o.prototype.toggle).on("keydown.bs.dropdown.data-api", r, o.prototype.keydown).on("keydown.bs.dropdown.data-api", ".dropdown-menu", o.prototype.keydown)
}(jQuery),
function(a) {
    "use strict";
    var s = function(t, e) {
        this.options = e,
        this.$body = a(document.body),
        this.$element = a(t),
        this.$dialog = this.$element.find(".modal-dialog"),
        this.$backdrop = null,
        this.isShown = null,
        this.originalBodyPad = null,
        this.scrollbarWidth = 0,
        this.ignoreBackdropClick = !1,
        this.fixedContent = ".navbar-fixed-top, .navbar-fixed-bottom",
        this.options.remote && this.$element.find(".modal-content").load(this.options.remote, a.proxy(function() {
            this.$element.trigger("loaded.bs.modal")
        }, this))
    };
    function r(o, n) {
        return this.each(function() {
            var t = a(this)
              , e = t.data("bs.modal")
              , i = a.extend({}, s.DEFAULTS, t.data(), "object" == typeof o && o);
            e || t.data("bs.modal", e = new s(this,i)),
            "string" == typeof o ? e[o](n) : i.show && e.show(n)
        })
    }
    s.VERSION = "3.4.1",
    s.TRANSITION_DURATION = 300,
    s.BACKDROP_TRANSITION_DURATION = 150,
    s.DEFAULTS = {
        backdrop: !0,
        keyboard: !0,
        show: !0
    },
    s.prototype.toggle = function(t) {
        return this.isShown ? this.hide() : this.show(t)
    }
    ,
    s.prototype.show = function(i) {
        var o = this
          , t = a.Event("show.bs.modal", {
            relatedTarget: i
        });
        this.$element.trigger(t),
        this.isShown || t.isDefaultPrevented() || (this.isShown = !0,
        this.checkScrollbar(),
        this.setScrollbar(),
        this.$body.addClass("modal-open"),
        this.escape(),
        this.resize(),
        this.$element.on("click.dismiss.bs.modal", '[data-dismiss="modal"]', a.proxy(this.hide, this)),
        this.$dialog.on("mousedown.dismiss.bs.modal", function() {
            o.$element.one("mouseup.dismiss.bs.modal", function(t) {
                a(t.target).is(o.$element) && (o.ignoreBackdropClick = !0)
            })
        }),
        this.backdrop(function() {
            var t = a.support.transition && o.$element.hasClass("fade");
            o.$element.parent().length || o.$element.appendTo(o.$body),
            o.$element.show().scrollTop(0),
            o.adjustDialog(),
            t && o.$element[0].offsetWidth,
            o.$element.addClass("in"),
            o.enforceFocus();
            var e = a.Event("shown.bs.modal", {
                relatedTarget: i
            });
            t ? o.$dialog.one("bsTransitionEnd", function() {
                o.$element.trigger("focus").trigger(e)
            }).emulateTransitionEnd(s.TRANSITION_DURATION) : o.$element.trigger("focus").trigger(e)
        }))
    }
    ,
    s.prototype.hide = function(t) {
        t && t.preventDefault(),
        t = a.Event("hide.bs.modal"),
        this.$element.trigger(t),
        this.isShown && !t.isDefaultPrevented() && (this.isShown = !1,
        this.escape(),
        this.resize(),
        a(document).off("focusin.bs.modal"),
        this.$element.removeClass("in").off("click.dismiss.bs.modal").off("mouseup.dismiss.bs.modal"),
        this.$dialog.off("mousedown.dismiss.bs.modal"),
        a.support.transition && this.$element.hasClass("fade") ? this.$element.one("bsTransitionEnd", a.proxy(this.hideModal, this)).emulateTransitionEnd(s.TRANSITION_DURATION) : this.hideModal())
    }
    ,
    s.prototype.enforceFocus = function() {
        a(document).off("focusin.bs.modal").on("focusin.bs.modal", a.proxy(function(t) {
            document === t.target || this.$element[0] === t.target || this.$element.has(t.target).length || this.$element.trigger("focus")
        }, this))
    }
    ,
    s.prototype.escape = function() {
        this.isShown && this.options.keyboard ? this.$element.on("keydown.dismiss.bs.modal", a.proxy(function(t) {
            27 == t.which && this.hide()
        }, this)) : this.isShown || this.$element.off("keydown.dismiss.bs.modal")
    }
    ,
    s.prototype.resize = function() {
        this.isShown ? a(window).on("resize.bs.modal", a.proxy(this.handleUpdate, this)) : a(window).off("resize.bs.modal")
    }
    ,
    s.prototype.hideModal = function() {
        var t = this;
        this.$element.hide(),
        this.backdrop(function() {
            t.$body.removeClass("modal-open"),
            t.resetAdjustments(),
            t.resetScrollbar(),
            t.$element.trigger("hidden.bs.modal")
        })
    }
    ,
    s.prototype.removeBackdrop = function() {
        this.$backdrop && this.$backdrop.remove(),
        this.$backdrop = null
    }
    ,
    s.prototype.backdrop = function(t) {
        var e = this
          , i = this.$element.hasClass("fade") ? "fade" : "";
        if (this.isShown && this.options.backdrop) {
            var o = a.support.transition && i;
            if (this.$backdrop = a(document.createElement("div")).addClass("modal-backdrop " + i).appendTo(this.$body),
            this.$element.on("click.dismiss.bs.modal", a.proxy(function(t) {
                this.ignoreBackdropClick ? this.ignoreBackdropClick = !1 : t.target === t.currentTarget && ("static" == this.options.backdrop ? this.$element[0].focus() : this.hide())
            }, this)),
            o && this.$backdrop[0].offsetWidth,
            this.$backdrop.addClass("in"),
            !t)
                return;
            o ? this.$backdrop.one("bsTransitionEnd", t).emulateTransitionEnd(s.BACKDROP_TRANSITION_DURATION) : t()
        } else if (!this.isShown && this.$backdrop) {
            this.$backdrop.removeClass("in");
            var n = function() {
                e.removeBackdrop(),
                t && t()
            };
            a.support.transition && this.$element.hasClass("fade") ? this.$backdrop.one("bsTransitionEnd", n).emulateTransitionEnd(s.BACKDROP_TRANSITION_DURATION) : n()
        } else
            t && t()
    }
    ,
    s.prototype.handleUpdate = function() {
        this.adjustDialog()
    }
    ,
    s.prototype.adjustDialog = function() {
        var t = this.$element[0].scrollHeight > document.documentElement.clientHeight;
        this.$element.css({
            paddingLeft: !this.bodyIsOverflowing && t ? this.scrollbarWidth : "",
            paddingRight: this.bodyIsOverflowing && !t ? this.scrollbarWidth : ""
        })
    }
    ,
    s.prototype.resetAdjustments = function() {
        this.$element.css({
            paddingLeft: "",
            paddingRight: ""
        })
    }
    ,
    s.prototype.checkScrollbar = function() {
        var t = window.innerWidth;
        if (!t) {
            var e = document.documentElement.getBoundingClientRect();
            t = e.right - Math.abs(e.left)
        }
        this.bodyIsOverflowing = document.body.clientWidth < t,
        this.scrollbarWidth = this.measureScrollbar()
    }
    ,
    s.prototype.setScrollbar = function() {
        var t = parseInt(this.$body.css("padding-right") || 0, 10);
        this.originalBodyPad = document.body.style.paddingRight || "";
        var n = this.scrollbarWidth;
        this.bodyIsOverflowing && (this.$body.css("padding-right", t + n),
        a(this.fixedContent).each(function(t, e) {
            var i = e.style.paddingRight
              , o = a(e).css("padding-right");
            a(e).data("padding-right", i).css("padding-right", parseFloat(o) + n + "px")
        }))
    }
    ,
    s.prototype.resetScrollbar = function() {
        this.$body.css("padding-right", this.originalBodyPad),
        a(this.fixedContent).each(function(t, e) {
            var i = a(e).data("padding-right");
            a(e).removeData("padding-right"),
            e.style.paddingRight = i || ""
        })
    }
    ,
    s.prototype.measureScrollbar = function() {
        var t = document.createElement("div");
        t.className = "modal-scrollbar-measure",
        this.$body.append(t);
        var e = t.offsetWidth - t.clientWidth;
        return this.$body[0].removeChild(t),
        e
    }
    ;
    var t = a.fn.modal;
    a.fn.modal = r,
    a.fn.modal.Constructor = s,
    a.fn.modal.noConflict = function() {
        return a.fn.modal = t,
        this
    }
    ,
    a(document).on("click.bs.modal.data-api", '[data-toggle="modal"]', function(t) {
        var e = a(this)
          , i = e.attr("href")
          , o = e.attr("data-target") || i && i.replace(/.*(?=#[^\s]+$)/, "")
          , n = a(document).find(o)
          , s = n.data("bs.modal") ? "toggle" : a.extend({
            remote: !/#/.test(i) && i
        }, n.data(), e.data());
        e.is("a") && t.preventDefault(),
        n.one("show.bs.modal", function(t) {
            t.isDefaultPrevented() || n.one("hidden.bs.modal", function() {
                e.is(":visible") && e.trigger("focus")
            })
        }),
        r.call(n, s, this)
    })
}(jQuery),
function(g) {
    "use strict";
    var o = ["sanitize", "whiteList", "sanitizeFn"]
      , a = ["background", "cite", "href", "itemtype", "longdesc", "poster", "src", "xlink:href"]
      , t = {
        "*": ["class", "dir", "id", "lang", "role", /^aria-[\w-]*$/i],
        a: ["target", "href", "title", "rel"],
        area: [],
        b: [],
        br: [],
        col: [],
        code: [],
        div: [],
        em: [],
        hr: [],
        h1: [],
        h2: [],
        h3: [],
        h4: [],
        h5: [],
        h6: [],
        i: [],
        img: ["src", "alt", "title", "width", "height"],
        li: [],
        ol: [],
        p: [],
        pre: [],
        s: [],
        small: [],
        span: [],
        sub: [],
        sup: [],
        strong: [],
        u: [],
        ul: []
    }
      , r = /^(?:(?:https?|mailto|ftp|tel|file):|[^&:/?#]*(?:[/?#]|$))/gi
      , l = /^data:(?:image\/(?:bmp|gif|jpeg|jpg|png|tiff|webp)|video\/(?:mpeg|mp4|ogg|webm)|audio\/(?:mp3|oga|ogg|opus));base64,[a-z0-9+/]+=*$/i;
    function u(t, e) {
        var i = t.nodeName.toLowerCase();
        if (-1 !== g.inArray(i, e))
            return -1 === g.inArray(i, a) || Boolean(t.nodeValue.match(r) || t.nodeValue.match(l));
        for (var o = g(e).filter(function(t, e) {
            return e instanceof RegExp
        }), n = 0, s = o.length; n < s; n++)
            if (i.match(o[n]))
                return !0;
        return !1
    }
    function n(t, e, i) {
        if (0 === t.length)
            return t;
        if (i && "function" == typeof i)
            return i(t);
        if (!document.implementation || !document.implementation.createHTMLDocument)
            return t;
        var o = document.implementation.createHTMLDocument("sanitization");
        o.body.innerHTML = t;
        for (var n = g.map(e, function(t, e) {
            return e
        }), s = g(o.body).find("*"), a = 0, r = s.length; a < r; a++) {
            var l = s[a]
              , h = l.nodeName.toLowerCase();
            if (-1 !== g.inArray(h, n))
                for (var d = g.map(l.attributes, function(t) {
                    return t
                }), p = [].concat(e["*"] || [], e[h] || []), c = 0, f = d.length; c < f; c++)
                    u(d[c], p) || l.removeAttribute(d[c].nodeName);
            else
                l.parentNode.removeChild(l)
        }
        return o.body.innerHTML
    }
    var m = function(t, e) {
        this.type = null,
        this.options = null,
        this.enabled = null,
        this.timeout = null,
        this.hoverState = null,
        this.$element = null,
        this.inState = null,
        this.init("tooltip", t, e)
    };
    m.VERSION = "3.4.1",
    m.TRANSITION_DURATION = 150,
    m.DEFAULTS = {
        animation: !0,
        placement: "top",
        selector: !1,
        template: '<div class="tooltip" role="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>',
        trigger: "hover focus",
        title: "",
        delay: 0,
        html: !1,
        container: !1,
        viewport: {
            selector: "body",
            padding: 0
        },
        sanitize: !0,
        sanitizeFn: null,
        whiteList: t
    },
    m.prototype.init = function(t, e, i) {
        if (this.enabled = !0,
        this.type = t,
        this.$element = g(e),
        this.options = this.getOptions(i),
        this.$viewport = this.options.viewport && g(document).find(g.isFunction(this.options.viewport) ? this.options.viewport.call(this, this.$element) : this.options.viewport.selector || this.options.viewport),
        this.inState = {
            click: !1,
            hover: !1,
            focus: !1
        },
        this.$element[0]instanceof document.constructor && !this.options.selector)
            throw new Error("`selector` option must be specified when initializing " + this.type + " on the window.document object!");
        for (var o = this.options.trigger.split(" "), n = o.length; n--; ) {
            var s = o[n];
            if ("click" == s)
                this.$element.on("click." + this.type, this.options.selector, g.proxy(this.toggle, this));
            else if ("manual" != s) {
                var a = "hover" == s ? "mouseenter" : "focusin"
                  , r = "hover" == s ? "mouseleave" : "focusout";
                this.$element.on(a + "." + this.type, this.options.selector, g.proxy(this.enter, this)),
                this.$element.on(r + "." + this.type, this.options.selector, g.proxy(this.leave, this))
            }
        }
        this.options.selector ? this._options = g.extend({}, this.options, {
            trigger: "manual",
            selector: ""
        }) : this.fixTitle()
    }
    ,
    m.prototype.getDefaults = function() {
        return m.DEFAULTS
    }
    ,
    m.prototype.getOptions = function(t) {
        var e = this.$element.data();
        for (var i in e)
            e.hasOwnProperty(i) && -1 !== g.inArray(i, o) && delete e[i];
        return (t = g.extend({}, this.getDefaults(), e, t)).delay && "number" == typeof t.delay && (t.delay = {
            show: t.delay,
            hide: t.delay
        }),
        t.sanitize && (t.template = n(t.template, t.whiteList, t.sanitizeFn)),
        t
    }
    ,
    m.prototype.getDelegateOptions = function() {
        var i = {}
          , o = this.getDefaults();
        return this._options && g.each(this._options, function(t, e) {
            o[t] != e && (i[t] = e)
        }),
        i
    }
    ,
    m.prototype.enter = function(t) {
        var e = t instanceof this.constructor ? t : g(t.currentTarget).data("bs." + this.type);
        if (e || (e = new this.constructor(t.currentTarget,this.getDelegateOptions()),
        g(t.currentTarget).data("bs." + this.type, e)),
        t instanceof g.Event && (e.inState["focusin" == t.type ? "focus" : "hover"] = !0),
        e.tip().hasClass("in") || "in" == e.hoverState)
            e.hoverState = "in";
        else {
            if (clearTimeout(e.timeout),
            e.hoverState = "in",
            !e.options.delay || !e.options.delay.show)
                return e.show();
            e.timeout = setTimeout(function() {
                "in" == e.hoverState && e.show()
            }, e.options.delay.show)
        }
    }
    ,
    m.prototype.isInStateTrue = function() {
        for (var t in this.inState)
            if (this.inState[t])
                return !0;
        return !1
    }
    ,
    m.prototype.leave = function(t) {
        var e = t instanceof this.constructor ? t : g(t.currentTarget).data("bs." + this.type);
        if (e || (e = new this.constructor(t.currentTarget,this.getDelegateOptions()),
        g(t.currentTarget).data("bs." + this.type, e)),
        t instanceof g.Event && (e.inState["focusout" == t.type ? "focus" : "hover"] = !1),
        !e.isInStateTrue()) {
            if (clearTimeout(e.timeout),
            e.hoverState = "out",
            !e.options.delay || !e.options.delay.hide)
                return e.hide();
            e.timeout = setTimeout(function() {
                "out" == e.hoverState && e.hide()
            }, e.options.delay.hide)
        }
    }
    ,
    m.prototype.show = function() {
        var t = g.Event("show.bs." + this.type);
        if (this.hasContent() && this.enabled) {
            this.$element.trigger(t);
            var e = g.contains(this.$element[0].ownerDocument.documentElement, this.$element[0]);
            if (t.isDefaultPrevented() || !e)
                return;
            var i = this
              , o = this.tip()
              , n = this.getUID(this.type);
            this.setContent(),
            o.attr("id", n),
            this.$element.attr("aria-describedby", n),
            this.options.animation && o.addClass("fade");
            var s = "function" == typeof this.options.placement ? this.options.placement.call(this, o[0], this.$element[0]) : this.options.placement
              , a = /\s?auto?\s?/i
              , r = a.test(s);
            r && (s = s.replace(a, "") || "top"),
            o.detach().css({
                top: 0,
                left: 0,
                display: "block"
            }).addClass(s).data("bs." + this.type, this),
            this.options.container ? o.appendTo(g(document).find(this.options.container)) : o.insertAfter(this.$element),
            this.$element.trigger("inserted.bs." + this.type);
            var l = this.getPosition()
              , h = o[0].offsetWidth
              , d = o[0].offsetHeight;
            if (r) {
                var p = s
                  , c = this.getPosition(this.$viewport);
                s = "bottom" == s && l.bottom + d > c.bottom ? "top" : "top" == s && l.top - d < c.top ? "bottom" : "right" == s && l.right + h > c.width ? "left" : "left" == s && l.left - h < c.left ? "right" : s,
                o.removeClass(p).addClass(s)
            }
            var f = this.getCalculatedOffset(s, l, h, d);
            this.applyPlacement(f, s);
            var u = function() {
                var t = i.hoverState;
                i.$element.trigger("shown.bs." + i.type),
                i.hoverState = null,
                "out" == t && i.leave(i)
            };
            g.support.transition && this.$tip.hasClass("fade") ? o.one("bsTransitionEnd", u).emulateTransitionEnd(m.TRANSITION_DURATION) : u()
        }
    }
    ,
    m.prototype.applyPlacement = function(t, e) {
        var i = this.tip()
          , o = i[0].offsetWidth
          , n = i[0].offsetHeight
          , s = parseInt(i.css("margin-top"), 10)
          , a = parseInt(i.css("margin-left"), 10);
        isNaN(s) && (s = 0),
        isNaN(a) && (a = 0),
        t.top += s,
        t.left += a,
        g.offset.setOffset(i[0], g.extend({
            using: function(t) {
                i.css({
                    top: Math.round(t.top),
                    left: Math.round(t.left)
                })
            }
        }, t), 0),
        i.addClass("in");
        var r = i[0].offsetWidth
          , l = i[0].offsetHeight;
        "top" == e && l != n && (t.top = t.top + n - l);
        var h = this.getViewportAdjustedDelta(e, t, r, l);
        h.left ? t.left += h.left : t.top += h.top;
        var d = /top|bottom/.test(e)
          , p = d ? 2 * h.left - o + r : 2 * h.top - n + l
          , c = d ? "offsetWidth" : "offsetHeight";
        i.offset(t),
        this.replaceArrow(p, i[0][c], d)
    }
    ,
    m.prototype.replaceArrow = function(t, e, i) {
        this.arrow().css(i ? "left" : "top", 50 * (1 - t / e) + "%").css(i ? "top" : "left", "")
    }
    ,
    m.prototype.setContent = function() {
        var t = this.tip()
          , e = this.getTitle();
        this.options.html ? (this.options.sanitize && (e = n(e, this.options.whiteList, this.options.sanitizeFn)),
        t.find(".tooltip-inner").html(e)) : t.find(".tooltip-inner").text(e),
        t.removeClass("fade in top bottom left right")
    }
    ,
    m.prototype.hide = function(t) {
        var e = this
          , i = g(this.$tip)
          , o = g.Event("hide.bs." + this.type);
        function n() {
            "in" != e.hoverState && i.detach(),
            e.$element && e.$element.removeAttr("aria-describedby").trigger("hidden.bs." + e.type),
            t && t()
        }
        if (this.$element.trigger(o),
        !o.isDefaultPrevented())
            return i.removeClass("in"),
            g.support.transition && i.hasClass("fade") ? i.one("bsTransitionEnd", n).emulateTransitionEnd(m.TRANSITION_DURATION) : n(),
            this.hoverState = null,
            this
    }
    ,
    m.prototype.fixTitle = function() {
        var t = this.$element;
        (t.attr("title") || "string" != typeof t.attr("data-original-title")) && t.attr("data-original-title", t.attr("title") || "").attr("title", "")
    }
    ,
    m.prototype.hasContent = function() {
        return this.getTitle()
    }
    ,
    m.prototype.getPosition = function(t) {
        var e = (t = t || this.$element)[0]
          , i = "BODY" == e.tagName
          , o = e.getBoundingClientRect();
        null == o.width && (o = g.extend({}, o, {
            width: o.right - o.left,
            height: o.bottom - o.top
        }));
        var n = window.SVGElement && e instanceof window.SVGElement
          , s = i ? {
            top: 0,
            left: 0
        } : n ? null : t.offset()
          , a = {
            scroll: i ? document.documentElement.scrollTop || document.body.scrollTop : t.scrollTop()
        }
          , r = i ? {
            width: g(window).width(),
            height: g(window).height()
        } : null;
        return g.extend({}, o, a, r, s)
    }
    ,
    m.prototype.getCalculatedOffset = function(t, e, i, o) {
        return "bottom" == t ? {
            top: e.top + e.height,
            left: e.left + e.width / 2 - i / 2
        } : "top" == t ? {
            top: e.top - o,
            left: e.left + e.width / 2 - i / 2
        } : "left" == t ? {
            top: e.top + e.height / 2 - o / 2,
            left: e.left - i
        } : {
            top: e.top + e.height / 2 - o / 2,
            left: e.left + e.width
        }
    }
    ,
    m.prototype.getViewportAdjustedDelta = function(t, e, i, o) {
        var n = {
            top: 0,
            left: 0
        };
        if (!this.$viewport)
            return n;
        var s = this.options.viewport && this.options.viewport.padding || 0
          , a = this.getPosition(this.$viewport);
        if (/right|left/.test(t)) {
            var r = e.top - s - a.scroll
              , l = e.top + s - a.scroll + o;
            r < a.top ? n.top = a.top - r : l > a.top + a.height && (n.top = a.top + a.height - l)
        } else {
            var h = e.left - s
              , d = e.left + s + i;
            h < a.left ? n.left = a.left - h : d > a.right && (n.left = a.left + a.width - d)
        }
        return n
    }
    ,
    m.prototype.getTitle = function() {
        var t = this.$element
          , e = this.options;
        return t.attr("data-original-title") || ("function" == typeof e.title ? e.title.call(t[0]) : e.title)
    }
    ,
    m.prototype.getUID = function(t) {
        for (; t += ~~(1e6 * Math.random()),
        document.getElementById(t); )
            ;
        return t
    }
    ,
    m.prototype.tip = function() {
        if (!this.$tip && (this.$tip = g(this.options.template),
        1 != this.$tip.length))
            throw new Error(this.type + " `template` option must consist of exactly 1 top-level element!");
        return this.$tip
    }
    ,
    m.prototype.arrow = function() {
        return this.$arrow = this.$arrow || this.tip().find(".tooltip-arrow")
    }
    ,
    m.prototype.enable = function() {
        this.enabled = !0
    }
    ,
    m.prototype.disable = function() {
        this.enabled = !1
    }
    ,
    m.prototype.toggleEnabled = function() {
        this.enabled = !this.enabled
    }
    ,
    m.prototype.toggle = function(t) {
        var e = this;
        t && ((e = g(t.currentTarget).data("bs." + this.type)) || (e = new this.constructor(t.currentTarget,this.getDelegateOptions()),
        g(t.currentTarget).data("bs." + this.type, e))),
        t ? (e.inState.click = !e.inState.click,
        e.isInStateTrue() ? e.enter(e) : e.leave(e)) : e.tip().hasClass("in") ? e.leave(e) : e.enter(e)
    }
    ,
    m.prototype.destroy = function() {
        var t = this;
        clearTimeout(this.timeout),
        this.hide(function() {
            t.$element.off("." + t.type).removeData("bs." + t.type),
            t.$tip && t.$tip.detach(),
            t.$tip = null,
            t.$arrow = null,
            t.$viewport = null,
            t.$element = null
        })
    }
    ,
    m.prototype.sanitizeHtml = function(t) {
        return n(t, this.options.whiteList, this.options.sanitizeFn)
    }
    ;
    var e = g.fn.tooltip;
    g.fn.tooltip = function i(o) {
        return this.each(function() {
            var t = g(this)
              , e = t.data("bs.tooltip")
              , i = "object" == typeof o && o;
            !e && /destroy|hide/.test(o) || (e || t.data("bs.tooltip", e = new m(this,i)),
            "string" == typeof o && e[o]())
        })
    }
    ,
    g.fn.tooltip.Constructor = m,
    g.fn.tooltip.noConflict = function() {
        return g.fn.tooltip = e,
        this
    }
}(jQuery),
function(n) {
    "use strict";
    var s = function(t, e) {
        this.init("popover", t, e)
    };
    if (!n.fn.tooltip)
        throw new Error("Popover requires tooltip.js");
    s.VERSION = "3.4.1",
    s.DEFAULTS = n.extend({}, n.fn.tooltip.Constructor.DEFAULTS, {
        placement: "right",
        trigger: "click",
        content: "",
        template: '<div class="popover" role="tooltip"><div class="arrow"></div><h3 class="popover-title"></h3><div class="popover-content"></div></div>'
    }),
    ((s.prototype = n.extend({}, n.fn.tooltip.Constructor.prototype)).constructor = s).prototype.getDefaults = function() {
        return s.DEFAULTS
    }
    ,
    s.prototype.setContent = function() {
        var t = this.tip()
          , e = this.getTitle()
          , i = this.getContent();
        if (this.options.html) {
            var o = typeof i;
            this.options.sanitize && (e = this.sanitizeHtml(e),
            "string" === o && (i = this.sanitizeHtml(i))),
            t.find(".popover-title").html(e),
            t.find(".popover-content").children().detach().end()["string" === o ? "html" : "append"](i)
        } else
            t.find(".popover-title").text(e),
            t.find(".popover-content").children().detach().end().text(i);
        t.removeClass("fade top bottom left right in"),
        t.find(".popover-title").html() || t.find(".popover-title").hide()
    }
    ,
    s.prototype.hasContent = function() {
        return this.getTitle() || this.getContent()
    }
    ,
    s.prototype.getContent = function() {
        var t = this.$element
          , e = this.options;
        return t.attr("data-content") || ("function" == typeof e.content ? e.content.call(t[0]) : e.content)
    }
    ,
    s.prototype.arrow = function() {
        return this.$arrow = this.$arrow || this.tip().find(".arrow")
    }
    ;
    var t = n.fn.popover;
    n.fn.popover = function e(o) {
        return this.each(function() {
            var t = n(this)
              , e = t.data("bs.popover")
              , i = "object" == typeof o && o;
            !e && /destroy|hide/.test(o) || (e || t.data("bs.popover", e = new s(this,i)),
            "string" == typeof o && e[o]())
        })
    }
    ,
    n.fn.popover.Constructor = s,
    n.fn.popover.noConflict = function() {
        return n.fn.popover = t,
        this
    }
}(jQuery),
function(s) {
    "use strict";
    function n(t, e) {
        this.$body = s(document.body),
        this.$scrollElement = s(t).is(document.body) ? s(window) : s(t),
        this.options = s.extend({}, n.DEFAULTS, e),
        this.selector = (this.options.target || "") + " .nav li > a",
        this.offsets = [],
        this.targets = [],
        this.activeTarget = null,
        this.scrollHeight = 0,
        this.$scrollElement.on("scroll.bs.scrollspy", s.proxy(this.process, this)),
        this.refresh(),
        this.process()
    }
    function e(o) {
        return this.each(function() {
            var t = s(this)
              , e = t.data("bs.scrollspy")
              , i = "object" == typeof o && o;
            e || t.data("bs.scrollspy", e = new n(this,i)),
            "string" == typeof o && e[o]()
        })
    }
    n.VERSION = "3.4.1",
    n.DEFAULTS = {
        offset: 10
    },
    n.prototype.getScrollHeight = function() {
        return this.$scrollElement[0].scrollHeight || Math.max(this.$body[0].scrollHeight, document.documentElement.scrollHeight)
    }
    ,
    n.prototype.refresh = function() {
        var t = this
          , o = "offset"
          , n = 0;
        this.offsets = [],
        this.targets = [],
        this.scrollHeight = this.getScrollHeight(),
        s.isWindow(this.$scrollElement[0]) || (o = "position",
        n = this.$scrollElement.scrollTop()),
        this.$body.find(this.selector).map(function() {
            var t = s(this)
              , e = t.data("target") || t.attr("href")
              , i = /^#./.test(e) && s(e);
            return i && i.length && i.is(":visible") && [[i[o]().top + n, e]] || null
        }).sort(function(t, e) {
            return t[0] - e[0]
        }).each(function() {
            t.offsets.push(this[0]),
            t.targets.push(this[1])
        })
    }
    ,
    n.prototype.process = function() {
        var t, e = this.$scrollElement.scrollTop() + this.options.offset, i = this.getScrollHeight(), o = this.options.offset + i - this.$scrollElement.height(), n = this.offsets, s = this.targets, a = this.activeTarget;
        if (this.scrollHeight != i && this.refresh(),
        o <= e)
            return a != (t = s[s.length - 1]) && this.activate(t);
        if (a && e < n[0])
            return this.activeTarget = null,
            this.clear();
        for (t = n.length; t--; )
            a != s[t] && e >= n[t] && (n[t + 1] === undefined || e < n[t + 1]) && this.activate(s[t])
    }
    ,
    n.prototype.activate = function(t) {
        this.activeTarget = t,
        this.clear();
        var e = this.selector + '[data-target="' + t + '"],' + this.selector + '[href="' + t + '"]'
          , i = s(e).parents("li").addClass("active");
        i.parent(".dropdown-menu").length && (i = i.closest("li.dropdown").addClass("active")),
        i.trigger("activate.bs.scrollspy")
    }
    ,
    n.prototype.clear = function() {
        s(this.selector).parentsUntil(this.options.target, ".active").removeClass("active")
    }
    ;
    var t = s.fn.scrollspy;
    s.fn.scrollspy = e,
    s.fn.scrollspy.Constructor = n,
    s.fn.scrollspy.noConflict = function() {
        return s.fn.scrollspy = t,
        this
    }
    ,
    s(window).on("load.bs.scrollspy.data-api", function() {
        s('[data-spy="scroll"]').each(function() {
            var t = s(this);
            e.call(t, t.data())
        })
    })
}(jQuery),
function(r) {
    "use strict";
    var a = function(t) {
        this.element = r(t)
    };
    function e(i) {
        return this.each(function() {
            var t = r(this)
              , e = t.data("bs.tab");
            e || t.data("bs.tab", e = new a(this)),
            "string" == typeof i && e[i]()
        })
    }
    a.VERSION = "3.4.1",
    a.TRANSITION_DURATION = 150,
    a.prototype.show = function() {
        var t = this.element
          , e = t.closest("ul:not(.dropdown-menu)")
          , i = t.data("target");
        if (i || (i = (i = t.attr("href")) && i.replace(/.*(?=#[^\s]*$)/, "")),
        !t.parent("li").hasClass("active")) {
            var o = e.find(".active:last a")
              , n = r.Event("hide.bs.tab", {
                relatedTarget: t[0]
            })
              , s = r.Event("show.bs.tab", {
                relatedTarget: o[0]
            });
            if (o.trigger(n),
            t.trigger(s),
            !s.isDefaultPrevented() && !n.isDefaultPrevented()) {
                var a = r(document).find(i);
                this.activate(t.closest("li"), e),
                this.activate(a, a.parent(), function() {
                    o.trigger({
                        type: "hidden.bs.tab",
                        relatedTarget: t[0]
                    }),
                    t.trigger({
                        type: "shown.bs.tab",
                        relatedTarget: o[0]
                    })
                })
            }
        }
    }
    ,
    a.prototype.activate = function(t, e, i) {
        var o = e.find("> .active")
          , n = i && r.support.transition && (o.length && o.hasClass("fade") || !!e.find("> .fade").length);
        function s() {
            o.removeClass("active").find("> .dropdown-menu > .active").removeClass("active").end().find('[data-toggle="tab"]').attr("aria-expanded", !1),
            t.addClass("active").find('[data-toggle="tab"]').attr("aria-expanded", !0),
            n ? (t[0].offsetWidth,
            t.addClass("in")) : t.removeClass("fade"),
            t.parent(".dropdown-menu").length && t.closest("li.dropdown").addClass("active").end().find('[data-toggle="tab"]').attr("aria-expanded", !0),
            i && i()
        }
        o.length && n ? o.one("bsTransitionEnd", s).emulateTransitionEnd(a.TRANSITION_DURATION) : s(),
        o.removeClass("in")
    }
    ;
    var t = r.fn.tab;
    r.fn.tab = e,
    r.fn.tab.Constructor = a,
    r.fn.tab.noConflict = function() {
        return r.fn.tab = t,
        this
    }
    ;
    var i = function(t) {
        t.preventDefault(),
        e.call(r(this), "show")
    };
    r(document).on("click.bs.tab.data-api", '[data-toggle="tab"]', i).on("click.bs.tab.data-api", '[data-toggle="pill"]', i)
}(jQuery),
function(l) {
    "use strict";
    var h = function(t, e) {
        this.options = l.extend({}, h.DEFAULTS, e);
        var i = this.options.target === h.DEFAULTS.target ? l(this.options.target) : l(document).find(this.options.target);
        this.$target = i.on("scroll.bs.affix.data-api", l.proxy(this.checkPosition, this)).on("click.bs.affix.data-api", l.proxy(this.checkPositionWithEventLoop, this)),
        this.$element = l(t),
        this.affixed = null,
        this.unpin = null,
        this.pinnedOffset = null,
        this.checkPosition()
    };
    function i(o) {
        return this.each(function() {
            var t = l(this)
              , e = t.data("bs.affix")
              , i = "object" == typeof o && o;
            e || t.data("bs.affix", e = new h(this,i)),
            "string" == typeof o && e[o]()
        })
    }
    h.VERSION = "3.4.1",
    h.RESET = "affix affix-top affix-bottom",
    h.DEFAULTS = {
        offset: 0,
        target: window
    },
    h.prototype.getState = function(t, e, i, o) {
        var n = this.$target.scrollTop()
          , s = this.$element.offset()
          , a = this.$target.height();
        if (null != i && "top" == this.affixed)
            return n < i && "top";
        if ("bottom" == this.affixed)
            return null != i ? !(n + this.unpin <= s.top) && "bottom" : !(n + a <= t - o) && "bottom";
        var r = null == this.affixed
          , l = r ? n : s.top;
        return null != i && n <= i ? "top" : null != o && t - o <= l + (r ? a : e) && "bottom"
    }
    ,
    h.prototype.getPinnedOffset = function() {
        if (this.pinnedOffset)
            return this.pinnedOffset;
        this.$element.removeClass(h.RESET).addClass("affix");
        var t = this.$target.scrollTop()
          , e = this.$element.offset();
        return this.pinnedOffset = e.top - t
    }
    ,
    h.prototype.checkPositionWithEventLoop = function() {
        setTimeout(l.proxy(this.checkPosition, this), 1)
    }
    ,
    h.prototype.checkPosition = function() {
        if (this.$element.is(":visible")) {
            var t = this.$element.height()
              , e = this.options.offset
              , i = e.top
              , o = e.bottom
              , n = Math.max(l(document).height(), l(document.body).height());
            "object" != typeof e && (o = i = e),
            "function" == typeof i && (i = e.top(this.$element)),
            "function" == typeof o && (o = e.bottom(this.$element));
            var s = this.getState(n, t, i, o);
            if (this.affixed != s) {
                null != this.unpin && this.$element.css("top", "");
                var a = "affix" + (s ? "-" + s : "")
                  , r = l.Event(a + ".bs.affix");
                if (this.$element.trigger(r),
                r.isDefaultPrevented())
                    return;
                this.affixed = s,
                this.unpin = "bottom" == s ? this.getPinnedOffset() : null,
                this.$element.removeClass(h.RESET).addClass(a).trigger(a.replace("affix", "affixed") + ".bs.affix")
            }
            "bottom" == s && this.$element.offset({
                top: n - t - o
            })
        }
    }
    ;
    var t = l.fn.affix;
    l.fn.affix = i,
    l.fn.affix.Constructor = h,
    l.fn.affix.noConflict = function() {
        return l.fn.affix = t,
        this
    }
    ,
    l(window).on("load", function() {
        l('[data-spy="affix"]').each(function() {
            var t = l(this)
              , e = t.data();
            e.offset = e.offset || {},
            null != e.offsetBottom && (e.offset.bottom = e.offsetBottom),
            null != e.offsetTop && (e.offset.top = e.offsetTop),
            i.call(t, e)
        })
    })
}(jQuery);
/*!
 * jQuery Validation Plugin 1.11.1
 *
 * http://bassistance.de/jquery-plugins/jquery-plugin-validation/
 * http://docs.jquery.com/Plugins/Validation
 *
 * Copyright 2013 Jörn Zaefferer
 * Released under the MIT license:
 *   http://www.opensource.org/licenses/mit-license.php
 */
(function(a) {
    a.extend(a.fn, {
        validate: function(b) {
            if (!this.length) {
                if (b && b.debug && window.console) {
                    console.warn("Nothing selected, can't validate, returning nothing.")
                }
                return
            }
            var c = a.data(this[0], "validator");
            if (c) {
                return c
            }
            this.attr("novalidate", "novalidate");
            c = new a.validator(b,this[0]);
            a.data(this[0], "validator", c);
            if (c.settings.onsubmit) {
                this.validateDelegate(":submit", "click", function(d) {
                    if (c.settings.submitHandler) {
                        c.submitButton = d.target
                    }
                    if (a(d.target).hasClass("cancel")) {
                        c.cancelSubmit = true
                    }
                    if (a(d.target).attr("formnovalidate") !== undefined) {
                        c.cancelSubmit = true
                    }
                });
                this.submit(function(d) {
                    if (c.settings.debug) {
                        d.preventDefault()
                    }
                    function e() {
                        var f;
                        if (c.settings.submitHandler) {
                            if (c.submitButton) {
                                f = a("<input type='hidden'/>").attr("name", c.submitButton.name).val(a(c.submitButton).val()).appendTo(c.currentForm)
                            }
                            c.settings.submitHandler.call(c, c.currentForm, d);
                            if (c.submitButton) {
                                f.remove()
                            }
                            return false
                        }
                        return true
                    }
                    if (c.cancelSubmit) {
                        c.cancelSubmit = false;
                        return e()
                    }
                    if (c.form()) {
                        if (c.pendingRequest) {
                            c.formSubmitted = true;
                            return false
                        }
                        return e()
                    } else {
                        c.focusInvalid();
                        return false
                    }
                })
            }
            return c
        },
        valid: function() {
            if (a(this[0]).is("form")) {
                return this.validate().form()
            } else {
                var c = true;
                var b = a(this[0].form).validate();
                this.each(function() {
                    c = c && b.element(this)
                });
                return c
            }
        },
        removeAttrs: function(d) {
            var b = {}
              , c = this;
            a.each(d.split(/\s/), function(e, f) {
                b[f] = c.attr(f);
                c.removeAttr(f)
            });
            return b
        },
        rules: function(e, b) {
            var g = this[0];
            if (e) {
                var d = a.data(g.form, "validator").settings;
                var i = d.rules;
                var j = a.validator.staticRules(g);
                switch (e) {
                case "add":
                    a.extend(j, a.validator.normalizeRule(b));
                    delete j.messages;
                    i[g.name] = j;
                    if (b.messages) {
                        d.messages[g.name] = a.extend(d.messages[g.name], b.messages)
                    }
                    break;
                case "remove":
                    if (!b) {
                        delete i[g.name];
                        return j
                    }
                    var h = {};
                    a.each(b.split(/\s/), function(k, l) {
                        h[l] = j[l];
                        delete j[l]
                    });
                    return h
                }
            }
            var f = a.validator.normalizeRules(a.extend({}, a.validator.classRules(g), a.validator.attributeRules(g), a.validator.dataRules(g), a.validator.staticRules(g)), g);
            if (f.required) {
                var c = f.required;
                delete f.required;
                f = a.extend({
                    required: c
                }, f)
            }
            return f
        }
    });
    a.extend(a.expr[":"], {
        blank: function(b) {
            return !a.trim("" + a(b).val())
        },
        filled: function(b) {
            return !!a.trim("" + a(b).val())
        },
        unchecked: function(b) {
            return !a(b).prop("checked")
        }
    });
    a.validator = function(b, c) {
        this.settings = a.extend(true, {}, a.validator.defaults, b);
        this.currentForm = c;
        this.init()
    }
    ;
    a.validator.format = function(b, c) {
        if (arguments.length === 1) {
            return function() {
                var d = a.makeArray(arguments);
                d.unshift(b);
                return a.validator.format.apply(this, d)
            }
        }
        if (arguments.length > 2 && c.constructor !== Array) {
            c = a.makeArray(arguments).slice(1)
        }
        if (c.constructor !== Array) {
            c = [c]
        }
        a.each(c, function(d, e) {
            b = b.replace(new RegExp("\\{" + d + "\\}","g"), function() {
                return e
            })
        });
        return b
    }
    ;
    a.extend(a.validator, {
        defaults: {
            messages: {},
            groups: {},
            rules: {},
            errorClass: "error",
            validClass: "valid",
            errorElement: "label",
            focusInvalid: true,
            errorContainer: a([]),
            errorLabelContainer: a([]),
            onsubmit: true,
            ignore: ":hidden",
            ignoreTitle: false,
            onfocusin: function(b, c) {
                this.lastActive = b;
                if (this.settings.focusCleanup && !this.blockFocusCleanup) {
                    if (this.settings.unhighlight) {
                        this.settings.unhighlight.call(this, b, this.settings.errorClass, this.settings.validClass)
                    }
                    this.addWrapper(this.errorsFor(b)).hide()
                }
            },
            onfocusout: function(b, c) {
                if (!this.checkable(b) && (b.name in this.submitted || !this.optional(b))) {
                    this.element(b)
                }
            },
            onkeyup: function(b, c) {
                if (c.which === 9 && this.elementValue(b) === "") {
                    return
                } else {
                    if (b.name in this.submitted || b === this.lastElement) {
                        this.element(b)
                    }
                }
            },
            onclick: function(b, c) {
                if (b.name in this.submitted) {
                    this.element(b)
                } else {
                    if (b.parentNode.name in this.submitted) {
                        this.element(b.parentNode)
                    }
                }
            },
            highlight: function(d, b, c) {
                if (d.type === "radio") {
                    this.findByName(d.name).addClass(b).removeClass(c)
                } else {
                    a(d).addClass(b).removeClass(c)
                }
            },
            unhighlight: function(d, b, c) {
                if (d.type === "radio") {
                    this.findByName(d.name).removeClass(b).addClass(c)
                } else {
                    a(d).removeClass(b).addClass(c)
                }
            }
        },
        setDefaults: function(b) {
            a.extend(a.validator.defaults, b)
        },
        messages: {
            required: "This field is required.",
            remote: "Please fix this field.",
            email: "Please enter a valid email address.",
            url: "Please enter a valid URL.",
            date: "Please enter a valid date.",
            dateISO: "Please enter a valid date (ISO).",
            number: "Please enter a valid number.",
            digits: "Please enter only digits.",
            creditcard: "Please enter a valid credit card number.",
            equalTo: "Please enter the same value again.",
            maxlength: a.validator.format("Please enter no more than {0} characters."),
            minlength: a.validator.format("Please enter at least {0} characters."),
            rangelength: a.validator.format("Please enter a value between {0} and {1} characters long."),
            range: a.validator.format("Please enter a value between {0} and {1}."),
            max: a.validator.format("Please enter a value less than or equal to {0}."),
            min: a.validator.format("Please enter a value greater than or equal to {0}.")
        },
        autoCreateRanges: false,
        prototype: {
            init: function() {
                this.labelContainer = a(this.settings.errorLabelContainer);
                this.errorContext = this.labelContainer.length && this.labelContainer || a(this.currentForm);
                this.containers = a(this.settings.errorContainer).add(this.settings.errorLabelContainer);
                this.submitted = {};
                this.valueCache = {};
                this.pendingRequest = 0;
                this.pending = {};
                this.invalid = {};
                this.reset();
                var b = (this.groups = {});
                a.each(this.settings.groups, function(e, f) {
                    if (typeof f === "string") {
                        f = f.split(/\s/)
                    }
                    a.each(f, function(h, g) {
                        b[g] = e
                    })
                });
                var d = this.settings.rules;
                a.each(d, function(e, f) {
                    d[e] = a.validator.normalizeRule(f)
                });
                function c(g) {
                    var f = a.data(this[0].form, "validator")
                      , e = "on" + g.type.replace(/^validate/, "");
                    if (f.settings[e]) {
                        f.settings[e].call(f, this[0], g)
                    }
                }
                a(this.currentForm).validateDelegate(":text, [type='password'], [type='file'], select, textarea, [type='number'], [type='search'] ,[type='tel'], [type='url'], [type='email'], [type='datetime'], [type='date'], [type='month'], [type='week'], [type='time'], [type='datetime-local'], [type='range'], [type='color'] ", "focusin focusout keyup", c).validateDelegate("[type='radio'], [type='checkbox'], select, option", "click", c);
                if (this.settings.invalidHandler) {
                    a(this.currentForm).bind("invalid-form.validate", this.settings.invalidHandler)
                }
            },
            form: function() {
                this.checkForm();
                a.extend(this.submitted, this.errorMap);
                this.invalid = a.extend({}, this.errorMap);
                if (!this.valid()) {
                    a(this.currentForm).triggerHandler("invalid-form", [this])
                }
                this.showErrors();
                return this.valid()
            },
            checkForm: function() {
                this.prepareForm();
                for (var b = 0, c = (this.currentElements = this.elements()); c[b]; b++) {
                    this.check(c[b])
                }
                return this.valid()
            },
            element: function(c) {
                c = this.validationTargetFor(this.clean(c));
                this.lastElement = c;
                this.prepareElement(c);
                this.currentElements = a(c);
                var b = this.check(c) !== false;
                if (b) {
                    delete this.invalid[c.name]
                } else {
                    this.invalid[c.name] = true
                }
                if (!this.numberOfInvalids()) {
                    this.toHide = this.toHide.add(this.containers)
                }
                this.showErrors();
                return b
            },
            showErrors: function(c) {
                if (c) {
                    a.extend(this.errorMap, c);
                    this.errorList = [];
                    for (var b in c) {
                        this.errorList.push({
                            message: c[b],
                            element: this.findByName(b)[0]
                        })
                    }
                    this.successList = a.grep(this.successList, function(d) {
                        return !(d.name in c)
                    })
                }
                if (this.settings.showErrors) {
                    this.settings.showErrors.call(this, this.errorMap, this.errorList)
                } else {
                    this.defaultShowErrors()
                }
            },
            resetForm: function() {
                if (a.fn.resetForm) {
                    a(this.currentForm).resetForm()
                }
                this.submitted = {};
                this.lastElement = null;
                this.prepareForm();
                this.hideErrors();
                this.elements().removeClass(this.settings.errorClass).removeData("previousValue")
            },
            numberOfInvalids: function() {
                return this.objectLength(this.invalid)
            },
            objectLength: function(d) {
                var c = 0;
                for (var b in d) {
                    c++
                }
                return c
            },
            hideErrors: function() {
                this.addWrapper(this.toHide).hide()
            },
            valid: function() {
                return this.size() === 0
            },
            size: function() {
                return this.errorList.length
            },
            focusInvalid: function() {
                if (this.settings.focusInvalid) {
                    try {
                        a(this.findLastActive() || this.errorList.length && this.errorList[0].element || []).filter(":visible").focus().trigger("focusin")
                    } catch (b) {}
                }
            },
            findLastActive: function() {
                var b = this.lastActive;
                return b && a.grep(this.errorList, function(c) {
                    return c.element.name === b.name
                }).length === 1 && b
            },
            elements: function() {
                var c = this
                  , b = {};
                return a(this.currentForm).find("input, select, textarea").not(":submit, :reset, :image, [disabled]").not(this.settings.ignore).filter(function() {
                    if (!this.name && c.settings.debug && window.console) {
                        console.error("%o has no name assigned", this)
                    }
                    if (this.name in b || !c.objectLength(a(this).rules())) {
                        return false
                    }
                    b[this.name] = true;
                    return true
                })
            },
            clean: function(b) {
                return a(b)[0]
            },
            errors: function() {
                var b = this.settings.errorClass.replace(" ", ".");
                return a(this.settings.errorElement + "." + b, this.errorContext)
            },
            reset: function() {
                this.successList = [];
                this.errorList = [];
                this.errorMap = {};
                this.toShow = a([]);
                this.toHide = a([]);
                this.currentElements = a([])
            },
            prepareForm: function() {
                this.reset();
                this.toHide = this.errors().add(this.containers)
            },
            prepareElement: function(b) {
                this.reset();
                this.toHide = this.errorsFor(b)
            },
            elementValue: function(b) {
                var c = a(b).attr("type")
                  , d = a(b).val();
                if (c === "radio" || c === "checkbox") {
                    return a("input[name='" + a(b).attr("name") + "']:checked").val()
                }
                if (typeof d === "string") {
                    return d.replace(/\r/g, "")
                }
                return d
            },
            check: function(c) {
                c = this.validationTargetFor(this.clean(c));
                var i = a(c).rules();
                var d = false;
                var h = this.elementValue(c);
                var b;
                for (var j in i) {
                    var g = {
                        method: j,
                        parameters: i[j]
                    };
                    try {
                        b = a.validator.methods[j].call(this, h, c, g.parameters);
                        if (b === "dependency-mismatch") {
                            d = true;
                            continue
                        }
                        d = false;
                        if (b === "pending") {
                            this.toHide = this.toHide.not(this.errorsFor(c));
                            return
                        }
                        if (!b) {
                            this.formatAndAdd(c, g);
                            return false
                        }
                    } catch (f) {
                        if (this.settings.debug && window.console) {
                            console.log("Exception occurred when checking element " + c.id + ", check the '" + g.method + "' method.", f)
                        }
                        throw f
                    }
                }
                if (d) {
                    return
                }
                if (this.objectLength(i)) {
                    this.successList.push(c)
                }
                return true
            },
            customDataMessage: function(b, c) {
                return a(b).data("msg-" + c.toLowerCase()) || (b.attributes && a(b).attr("data-msg-" + c.toLowerCase()))
            },
            customMessage: function(c, d) {
                var b = this.settings.messages[c];
                return b && (b.constructor === String ? b : b[d])
            },
            findDefined: function() {
                for (var b = 0; b < arguments.length; b++) {
                    if (arguments[b] !== undefined) {
                        return arguments[b]
                    }
                }
                return undefined
            },
            defaultMessage: function(b, c) {
                return this.findDefined(this.customMessage(b.name, c), this.customDataMessage(b, c), !this.settings.ignoreTitle && b.title || undefined, a.validator.messages[c], "<strong>Warning: No message defined for " + b.name + "</strong>")
            },
            formatAndAdd: function(c, e) {
                var d = this.defaultMessage(c, e.method)
                  , b = /\$?\{(\d+)\}/g;
                if (typeof d === "function") {
                    d = d.call(this, e.parameters, c)
                } else {
                    if (b.test(d)) {
                        d = a.validator.format(d.replace(b, "{$1}"), e.parameters)
                    }
                }
                this.errorList.push({
                    message: d,
                    element: c
                });
                this.errorMap[c.name] = d;
                this.submitted[c.name] = d
            },
            addWrapper: function(b) {
                if (this.settings.wrapper) {
                    b = b.add(b.parent(this.settings.wrapper))
                }
                return b
            },
            defaultShowErrors: function() {
                var c, d;
                for (c = 0; this.errorList[c]; c++) {
                    var b = this.errorList[c];
                    if (this.settings.highlight) {
                        this.settings.highlight.call(this, b.element, this.settings.errorClass, this.settings.validClass)
                    }
                    this.showLabel(b.element, b.message)
                }
                if (this.errorList.length) {
                    this.toShow = this.toShow.add(this.containers)
                }
                if (this.settings.success) {
                    for (c = 0; this.successList[c]; c++) {
                        this.showLabel(this.successList[c])
                    }
                }
                if (this.settings.unhighlight) {
                    for (c = 0,
                    d = this.validElements(); d[c]; c++) {
                        this.settings.unhighlight.call(this, d[c], this.settings.errorClass, this.settings.validClass)
                    }
                }
                this.toHide = this.toHide.not(this.toShow);
                this.hideErrors();
                this.addWrapper(this.toShow).show()
            },
            validElements: function() {
                return this.currentElements.not(this.invalidElements())
            },
            invalidElements: function() {
                return a(this.errorList).map(function() {
                    return this.element
                })
            },
            showLabel: function(c, d) {
                var b = this.errorsFor(c);
                if (b.length) {
                    b.removeClass(this.settings.validClass).addClass(this.settings.errorClass);
                    b.html(d)
                } else {
                    b = a("<" + this.settings.errorElement + ">").attr("for", this.idOrName(c)).attr("role", "alert").addClass(this.settings.errorClass).html(d || "");
                    if (this.settings.wrapper) {
                        b = b.hide().show().wrap("<" + this.settings.wrapper + "/>").parent()
                    }
                    if (!this.labelContainer.append(b).length) {
                        if (this.settings.errorPlacement) {
                            this.settings.errorPlacement(b, a(c))
                        } else {
                            b.insertAfter(c)
                        }
                    }
                }
                if (!d && this.settings.success) {
                    b.text("");
                    if (typeof this.settings.success === "string") {
                        b.addClass(this.settings.success)
                    } else {
                        this.settings.success(b, c)
                    }
                }
                this.toShow = this.toShow.add(b)
            },
            errorsFor: function(c) {
                var b = this.idOrName(c);
                return this.errors().filter(function() {
                    return a(this).attr("for") === b
                })
            },
            idOrName: function(b) {
                return this.groups[b.name] || (this.checkable(b) ? b.name : b.id || b.name)
            },
            validationTargetFor: function(b) {
                if (this.checkable(b)) {
                    b = this.findByName(b.name).not(this.settings.ignore)[0]
                }
                return b
            },
            checkable: function(b) {
                return (/radio|checkbox/i).test(b.type)
            },
            findByName: function(b) {
                return a(this.currentForm).find("[name='" + b + "']")
            },
            getLength: function(c, b) {
                switch (b.nodeName.toLowerCase()) {
                case "select":
                    return a("option:selected", b).length;
                case "input":
                    if (this.checkable(b)) {
                        return this.findByName(b.name).filter(":checked").length
                    }
                }
                return c.length
            },
            depend: function(c, b) {
                return this.dependTypes[typeof c] ? this.dependTypes[typeof c](c, b) : true
            },
            dependTypes: {
                "boolean": function(c, b) {
                    return c
                },
                string: function(c, b) {
                    return !!a(c, b.form).length
                },
                "function": function(c, b) {
                    return c(b)
                }
            },
            optional: function(b) {
                var c = this.elementValue(b);
                return !a.validator.methods.required.call(this, c, b) && "dependency-mismatch"
            },
            startRequest: function(b) {
                if (!this.pending[b.name]) {
                    this.pendingRequest++;
                    this.pending[b.name] = true
                }
            },
            stopRequest: function(b, c) {
                this.pendingRequest--;
                if (this.pendingRequest < 0) {
                    this.pendingRequest = 0
                }
                delete this.pending[b.name];
                if (c && this.pendingRequest === 0 && this.formSubmitted && this.form()) {
                    a(this.currentForm).submit();
                    this.formSubmitted = false
                } else {
                    if (!c && this.pendingRequest === 0 && this.formSubmitted) {
                        a(this.currentForm).triggerHandler("invalid-form", [this]);
                        this.formSubmitted = false
                    }
                }
            },
            previousValue: function(b) {
                return a.data(b, "previousValue") || a.data(b, "previousValue", {
                    old: null,
                    valid: true,
                    message: this.defaultMessage(b, "remote")
                })
            }
        },
        classRuleSettings: {
            required: {
                required: true
            },
            email: {
                email: true
            },
            url: {
                url: true
            },
            date: {
                date: true
            },
            dateISO: {
                dateISO: true
            },
            number: {
                number: true
            },
            digits: {
                digits: true
            },
            creditcard: {
                creditcard: true
            }
        },
        addClassRules: function(b, c) {
            if (b.constructor === String) {
                this.classRuleSettings[b] = c
            } else {
                a.extend(this.classRuleSettings, b)
            }
        },
        classRules: function(c) {
            var d = {};
            var b = a(c).attr("class");
            if (b) {
                a.each(b.split(" "), function() {
                    if (this in a.validator.classRuleSettings) {
                        a.extend(d, a.validator.classRuleSettings[this])
                    }
                })
            }
            return d
        },
        attributeRules: function(c) {
            var f = {};
            var b = a(c);
            var d = b[0].getAttribute("type");
            for (var g in a.validator.methods) {
                var e;
                if (g === "required") {
                    e = b.get(0).getAttribute(g);
                    if (e === "") {
                        e = true
                    }
                    e = !!e
                } else {
                    e = b.attr(g)
                }
                if (/min|max/.test(g) && (d === null || /number|range|text/.test(d))) {
                    e = Number(e)
                }
                if (e) {
                    f[g] = e
                } else {
                    if (d === g && d !== "range") {
                        f[g] = true
                    }
                }
            }
            if (f.maxlength && /-1|2147483647|524288/.test(f.maxlength)) {
                delete f.maxlength
            }
            return f
        },
        dataRules: function(c) {
            var f, d, e = {}, b = a(c);
            for (f in a.validator.methods) {
                d = b.data("rule-" + f.toLowerCase());
                if (d !== undefined) {
                    e[f] = d
                }
            }
            return e
        },
        staticRules: function(c) {
            var d = {};
            var b = a.data(c.form, "validator");
            if (b.settings.rules) {
                d = a.validator.normalizeRule(b.settings.rules[c.name]) || {}
            }
            return d
        },
        normalizeRules: function(c, b) {
            a.each(c, function(f, e) {
                if (e === false) {
                    delete c[f];
                    return
                }
                if (e.param || e.depends) {
                    var d = true;
                    switch (typeof e.depends) {
                    case "string":
                        d = !!a(e.depends, b.form).length;
                        break;
                    case "function":
                        d = e.depends.call(b, b);
                        break
                    }
                    if (d) {
                        c[f] = e.param !== undefined ? e.param : true
                    } else {
                        delete c[f]
                    }
                }
            });
            a.each(c, function(d, e) {
                c[d] = a.isFunction(e) ? e(b) : e
            });
            a.each(["minlength", "maxlength"], function() {
                if (c[this]) {
                    c[this] = Number(c[this])
                }
            });
            a.each(["rangelength", "range"], function() {
                var d;
                if (c[this]) {
                    if (a.isArray(c[this])) {
                        c[this] = [Number(c[this][0]), Number(c[this][1])]
                    } else {
                        if (typeof c[this] === "string") {
                            d = c[this].split(/[\s,]+/);
                            c[this] = [Number(d[0]), Number(d[1])]
                        }
                    }
                }
            });
            if (a.validator.autoCreateRanges) {
                if (c.min && c.max) {
                    c.range = [c.min, c.max];
                    delete c.min;
                    delete c.max
                }
                if (c.minlength && c.maxlength) {
                    c.rangelength = [c.minlength, c.maxlength];
                    delete c.minlength;
                    delete c.maxlength
                }
            }
            return c
        },
        normalizeRule: function(c) {
            if (typeof c === "string") {
                var b = {};
                a.each(c.split(/\s/), function() {
                    b[this] = true
                });
                c = b
            }
            return c
        },
        addMethod: function(b, d, c) {
            a.validator.methods[b] = d;
            a.validator.messages[b] = c !== undefined ? c : a.validator.messages[b];
            if (d.length < 3) {
                a.validator.addClassRules(b, a.validator.normalizeRule(b))
            }
        },
        methods: {
            required: function(c, b, e) {
                if (!this.depend(e, b)) {
                    return "dependency-mismatch"
                }
                if (b.nodeName.toLowerCase() === "select") {
                    var d = a(b).val();
                    return d && d.length > 0
                }
                if (this.checkable(b)) {
                    return this.getLength(c, b) > 0
                }
                return a.trim(c).length > 0
            },
            email: function(c, b) {
                return this.optional(b) || /^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))$/i.test(c.trim())
            },
            trimemail: function(c, b) {
                return this.optional(b) || /^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))$/i.test(a.trim(c))
            },
            url: function(c, b) {
                return this.optional(b) || /^(https?|s?ftp):\/\/(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/i.test(c)
            },
            date: function(c, b) {
                return this.optional(b) || !/Invalid|NaN/.test(new Date(c).toString())
            },
            dateISO: function(c, b) {
                return this.optional(b) || /^\d{4}[\/\-]\d{1,2}[\/\-]\d{1,2}$/.test(c)
            },
            number: function(c, b) {
                return this.optional(b) || /^-?(?:\d+|\d{1,3}(?:,\d{3})+)?(?:\.\d+)?$/.test(c)
            },
            digits: function(c, b) {
                return this.optional(b) || /^\d+$/.test(c)
            },
            creditcard: function(f, c) {
                if (this.optional(c)) {
                    return "dependency-mismatch"
                }
                if (/[^0-9 \-]+/.test(f)) {
                    return false
                }
                var g = 0
                  , e = 0
                  , b = false;
                f = f.replace(/\D/g, "");
                for (var h = f.length - 1; h >= 0; h--) {
                    var d = f.charAt(h);
                    e = parseInt(d, 10);
                    if (b) {
                        if ((e *= 2) > 9) {
                            e -= 9
                        }
                    }
                    g += e;
                    b = !b
                }
                return (g % 10) === 0
            },
            minlength: function(d, b, e) {
                var c = a.isArray(d) ? d.length : this.getLength(a.trim(d), b);
                return this.optional(b) || c >= e
            },
            maxlength: function(d, b, e) {
                var c = a.isArray(d) ? d.length : this.getLength(a.trim(d), b);
                return this.optional(b) || c <= e
            },
            rangelength: function(d, b, e) {
                var c = a.isArray(d) ? d.length : this.getLength(a.trim(d), b);
                return this.optional(b) || (c >= e[0] && c <= e[1])
            },
            min: function(c, b, d) {
                return this.optional(b) || c >= d
            },
            max: function(c, b, d) {
                return this.optional(b) || c <= d
            },
            range: function(c, b, d) {
                return this.optional(b) || (c >= d[0] && c <= d[1])
            },
            equalTo: function(c, b, e) {
                var d = a(e);
                if (this.settings.onfocusout) {
                    d.unbind(".validate-equalTo").bind("blur.validate-equalTo", function() {
                        a(b).valid()
                    })
                }
                return c === d.val()
            },
            remote: function(f, c, g) {
                if (this.optional(c)) {
                    return "dependency-mismatch"
                }
                var d = this.previousValue(c);
                if (!this.settings.messages[c.name]) {
                    this.settings.messages[c.name] = {}
                }
                d.originalMessage = this.settings.messages[c.name].remote;
                this.settings.messages[c.name].remote = d.message;
                g = typeof g === "string" && {
                    url: g
                } || g;
                if (d.old === f) {
                    return d.valid
                }
                d.old = f;
                var b = this;
                this.startRequest(c);
                var e = {};
                e[c.name] = f;
                a.ajax(a.extend(true, {
                    url: g,
                    mode: "abort",
                    port: "validate" + c.name,
                    dataType: "json",
                    data: e,
                    success: function(i) {
                        b.settings.messages[c.name].remote = d.originalMessage;
                        var k = i === true || i === "true";
                        if (k) {
                            var h = b.formSubmitted;
                            b.prepareElement(c);
                            b.formSubmitted = h;
                            b.successList.push(c);
                            delete b.invalid[c.name];
                            b.showErrors()
                        } else {
                            var l = {};
                            var j = i || b.defaultMessage(c, "remote");
                            l[c.name] = d.message = a.isFunction(j) ? j(f) : j;
                            b.invalid[c.name] = true;
                            b.showErrors(l)
                        }
                        d.valid = k;
                        b.stopRequest(c, k)
                    }
                }, g));
                return "pending"
            }
        }
    });
    a.format = a.validator.format
}(jQuery));
(function(c) {
    var a = {};
    if (c.ajaxPrefilter) {
        c.ajaxPrefilter(function(f, e, g) {
            var d = f.port;
            if (f.mode === "abort") {
                if (a[d]) {
                    a[d].abort()
                }
                a[d] = g
            }
        })
    } else {
        var b = c.ajax;
        c.ajax = function(e) {
            var f = ("mode"in e ? e : c.ajaxSettings).mode
              , d = ("port"in e ? e : c.ajaxSettings).port;
            if (f === "abort") {
                if (a[d]) {
                    a[d].abort()
                }
                a[d] = b.apply(this, arguments);
                return a[d]
            }
            return b.apply(this, arguments)
        }
    }
}(jQuery));
(function(a) {
    a.extend(a.fn, {
        validateDelegate: function(d, c, b) {
            return this.bind(c, function(e) {
                var f = a(e.target);
                if (f.is(d)) {
                    return b.apply(f, arguments)
                }
            })
        }
    })
}(jQuery));
/*! http://mths.be/placeholder v2.0.8 by @mathias */
(function(i, k, f) {
    var b = Object.prototype.toString.call(i.operamini) == "[object OperaMini]";
    var a = "placeholder"in k.createElement("input") && !b;
    var g = "placeholder"in k.createElement("textarea") && !b;
    var l = f.fn;
    var e = f.valHooks;
    var c = f.propHooks;
    var n;
    var m;
    if (a && g) {
        m = l.placeholder = function() {
            return this
        }
        ;
        m.input = m.textarea = true
    } else {
        m = l.placeholder = function() {
            var p = this;
            p.filter((a ? "textarea" : ":input") + "[placeholder]").not(".placeholder").bind({
                "focus.placeholder": d,
                "blur.placeholder": h
            }).data("placeholder-enabled", true).trigger("blur.placeholder");
            return p
        }
        ;
        m.input = a;
        m.textarea = g;
        n = {
            get: function(q) {
                var p = f(q);
                var r = p.data("placeholder-password");
                if (r) {
                    return r[0].value
                }
                return p.data("placeholder-enabled") && p.hasClass("placeholder") ? "" : q.value
            },
            set: function(q, s) {
                var p = f(q);
                var r = p.data("placeholder-password");
                if (r) {
                    return r[0].value = s
                }
                if (!p.data("placeholder-enabled")) {
                    return q.value = s
                }
                if (s == "") {
                    q.value = s;
                    if (q != o()) {
                        h.call(q)
                    }
                } else {
                    if (p.hasClass("placeholder")) {
                        d.call(q, true, s) || (q.value = s)
                    } else {
                        q.value = s
                    }
                }
                return p
            }
        };
        if (!a) {
            e.input = n;
            c.value = n
        }
        if (!g) {
            e.textarea = n;
            c.value = n
        }
        f(function() {
            f(k).delegate("form", "submit.placeholder", function() {
                var p = f(".placeholder", this).each(d);
                setTimeout(function() {
                    p.each(h)
                }, 10)
            })
        });
        f(i).bind("beforeunload.placeholder", function() {
            f(".placeholder").each(function() {
                this.value = ""
            })
        })
    }
    function j(q) {
        var p = {};
        var r = /^jQuery\d+$/;
        f.each(q.attributes, function(t, s) {
            if (s.specified && !r.test(s.name)) {
                p[s.name] = s.value
            }
        });
        return p
    }
    function d(q, r) {
        var p = this;
        var s = f(p);
        if (p.value == s.attr("placeholder") && s.hasClass("placeholder")) {
            if (s.data("placeholder-password")) {
                s = s.hide().next().show().attr("id", s.removeAttr("id").data("placeholder-id"));
                if (q === true) {
                    return s[0].value = r
                }
                s.focus()
            } else {
                p.value = "";
                s.removeClass("placeholder");
                p == o() && p.select()
            }
        }
    }
    function h() {
        var t;
        var p = this;
        var s = f(p);
        var r = this.id;
        if (p.value == "") {
            if (p.type == "password") {
                if (!s.data("placeholder-textinput")) {
                    try {
                        t = s.clone().attr({
                            type: "text"
                        })
                    } catch (q) {
                        t = f("<input>").attr(f.extend(j(this), {
                            type: "text"
                        }))
                    }
                    t.removeAttr("name").data({
                        "placeholder-password": s,
                        "placeholder-id": r
                    }).bind("focus.placeholder", d);
                    s.data({
                        "placeholder-textinput": t,
                        "placeholder-id": r
                    }).before(t)
                }
                s = s.removeAttr("id").hide().prev().attr("id", r).show()
            }
            s.addClass("placeholder");
            s[0].value = s.attr("placeholder")
        } else {
            s.removeClass("placeholder")
        }
    }
    function o() {
        try {
            return k.activeElement
        } catch (p) {}
    }
}(this, document, jQuery));
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
    }
    ;
    e.modal.close = function() {
        e.modal.impl.close()
    }
    ;
    e.modal.focus = function(d) {
        e.modal.impl.focus(d)
    }
    ;
    e.modal.setContainerDimensions = function() {
        e.modal.impl.setContainerDimensions()
    }
    ;
    e.modal.setPosition = function() {
        e.modal.impl.setPosition()
    }
    ;
    e.modal.update = function(d, i) {
        e.modal.impl.update(d, i)
    }
    ;
    e.fn.modal = function(d) {
        return e.modal.impl.init(this, d)
    }
    ;
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
                if (j.parent().parent().size() > 0) {
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
/*! JsRender v1.0pre: http://github.com/BorisMoore/jsrender */
(function(b, v, m) {
    if (v && v.views || b.jsviews) {
        return
    }
    var Z = "v1.0pre", G, q, w, s, k = "{", j = "{", f = "}", e = "}", o = "!", O = {}, U = false, C = true, y = /^(?:null|true|false|\d[\d.]*|([\w$]+|~([\w$]+)|#(view|([\w$]+))?)([\w$.]*?)(?:[.[]([\w$]+)\]?)?|(['"]).*\8)$/g, Q = /(\()(?=|\s*\()|(?:([([])\s*)?(?:([#~]?[\w$.]+)?\s*((\+\+|--)|\+|-|&&|\|\||===|!==|==|!=|<=|>=|[<>%*!:?\/]|(=))\s*|([#~]?[\w$.]+)([([])?)|(,\s*)|(\(?)\\?(?:(')|("))|(?:\s*([)\]])([([]?))|(\s+)/g, M = /\r?\n/g, d = /\\(['"])/g, Y = /\\?(['"])/g, l = /\x08(~)?([^\x08]+)\x08/g, aa = 0, R = {
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;"
    }, N = "data-jsv-tmpl", V = "var j=j||" + (v ? "jQuery." : "js") + "views,", x = /[\x00"&'<>]/g, p = Array.prototype.slice, J = {}, H = {
        jsviews: Z,
        sub: O,
        debugMode: C,
        render: J,
        templates: E,
        tags: F,
        helpers: X,
        converters: a,
        delimiters: t,
        View: W,
        _convert: L,
        _err: function(ab) {
            return H.debugMode ? ("Error: " + (ab.message || ab)) + ". " : ""
        },
        _tmplFn: A,
        _tag: c,
        error: D,
        Error: B
    };
    function B(ab) {
        this.name = "JsRender Error",
        this.message = ab || "JsRender error"
    }
    (B.prototype = new Error()).constructor = B;
    function t(ab, ac, ad) {
        if (!H.rTag || arguments.length) {
            k = ab ? "\\" + ab.charAt(0) : k;
            j = ab ? "\\" + ab.charAt(1) : j;
            f = ac ? "\\" + ac.charAt(0) : f;
            e = ac ? "\\" + ac.charAt(0) : e;
            ad = ad ? "\\" + ad : o;
            H.rTag = q = "(\\w*" + ad + ")?(?:(?:(\\w+(?=[\\/\\s" + f + "]))|(?:(\\w+)?(:)|(>)|(\\*)))\\s*((?:[^" + f + "]|" + f + "(?!" + e + "))*?)";
            q = new RegExp(k + j + q + "(\\/)?|(?:\\/(\\w+)))" + f + e,"g");
            w = new RegExp("<.*>|([^\\\\]|^)[{}]|" + k + j + ".*" + f + e)
        }
        return [k, j, f, e, o]
    }
    function P(ac) {
        var ab = this
          , ad = ab.tmpl.helpers || {};
        ac = (ab.dynCtx && ab.dynCtx[ac] !== m ? ab.dynCtx : ab.ctx[ac] !== m ? ab.ctx : ad[ac] !== m ? ad : X[ac] !== m ? X : {})[ac];
        return typeof ac !== "function" ? ac : function() {
            return ac.apply(ab, arguments)
        }
    }
    function L(af, ad, ae, ag) {
        var ac = !ae.markup && ae || m
          , ab = ad.tmpl.converters;
        ab = ab && ab[af] || a[af];
        return ab ? ab.call(ad, ag, ac) : (D("Unknown converter: {{" + af + ":"),
        ag)
    }
    function c(ao, al, am, ag, af) {
        var ah, ad = !am.markup && am, an = ad ? ad.view.tmpl : am, ae = an.tags, ac = an.templates, aj = af.props = af.props || {}, ak = aj.tmpl, ai = arguments.length > 5 ? p.call(arguments, 5) : [], ab = ae && ae[ao] || F[ao];
        if (!ab) {
            D("Unknown tag: {{" + ao + "}}");
            return ""
        }
        ag = ag && an.tmpls[ag - 1];
        ak = ak || ag || ab.template || m;
        af.view = al;
        ak = af.tmpl = "" + ak === ak ? ac && ac[ak] || E[ak] || E(ak) : ak;
        af.attr = am.attr = am.attr || ab.attr;
        af.tagName = ao;
        af.renderContent = i;
        if (ad) {
            ad.tagCtx = {
                args: ai,
                props: aj,
                path: af.path,
                tag: ab
            }
        }
        if (ab.render) {
            ah = ab.render.apply(af, ai)
        }
        return ah || (ah == m ? (ak ? af.renderContent(ai[0], m, al) : "") : ah.toString())
    }
    function W(ab, aj, ai, ac, ae, af, ak, ad) {
        var ag, ah = {
            data: ac,
            tmpl: ae,
            views: ad ? [] : {},
            parent: ai,
            ctx: ab,
            path: aj,
            _useKey: ad ? 0 : 1,
            _onRender: ak,
            _hlp: P,
            renderLink: function(al) {
                var am = this.tmpl.tmpls[al];
                return am.render(ac, ab, this)
            }
        };
        if (ai) {
            ag = ai.views;
            if (ai._useKey) {
                ag[ah.key = "_" + ai._useKey++] = ah;
                ah.index = ai.index
            } else {
                ag.splice(ah.key = ah.index = af !== m ? af : ag.length, 0, ah)
            }
        }
        return ah
    }
    function T(ac, ab, ad, ag, ah) {
        var ae, af;
        if (ad && typeof ad === "object" && !ad.nodeType) {
            for (ae in ad) {
                ab(ae, ad[ae])
            }
            return ac
        }
        if (ag === m) {
            ag = ad;
            ad = m
        }
        if (af = O.onBeforeStoreItem) {
            ah = af(ab, ad, ag, ah) || ah
        }
        if (!ad) {
            ag = ah ? ah(ag) : ag
        } else {
            if ("" + ad === ad) {
                if (ag === null) {
                    delete ab[ad]
                } else {
                    ab[ad] = ah ? (ag = ah(ag, ad)) : ag
                }
            }
        }
        if (af = O.onStoreItem) {
            af(ab, ad, ag, ah)
        }
        return ag
    }
    function n(ac, ab) {
        ac = typeof ac === "function" ? {
            render: ac
        } : ac;
        ac.name = ab;
        ac.is = "tag";
        return ac
    }
    function E(ac, ab) {
        return T(this, E, ac, ab, h)
    }
    function F(ac, ab) {
        return T(this, F, ac, ab, n)
    }
    function X(ab, ac) {
        return T(this, X, ab, ac)
    }
    function a(ac, ab) {
        return T(this, a, ac, ab)
    }
    function i(av, ab, ad, aw, ai, ap, af) {
        var ar, aq, ak, au, an, ag, aj, ac, am, at, ae, ah, ao = this, al = "";
        if (aw === C) {
            am = C;
            aw = 0
        }
        if (ao.tagName) {
            aj = ao.tmpl;
            if (ab || ao.ctx) {
                at = {};
                if (ao.ctx) {
                    s(at, ao.ctx)
                }
                if (ab) {
                    s(at, ab)
                }
            }
            ab = at;
            ac = ao.props;
            if (ac && ac.link === U) {
                ab = ab || {};
                ab.link = U
            }
            ad = ad || ao.view;
            ap = ap || ao.path;
            aw = aw || ao.key;
            af = ad && ad._onRender
        } else {
            aj = ao.jquery && (ao[0] || D('Unknown template: "' + ao.selector + '"')) || ao;
            af = af || ad && ad._onRender
        }
        if (aj) {
            if (ad) {
                ag = ad.ctx;
                ae = ad.dynCtx;
                if (av === ad) {
                    av = ad.data;
                    ai = C
                }
            } else {
                ag = X
            }
            ah = (ab && ab !== ag);
            if (ae || ah) {
                ag = s({}, ag);
                if (ah) {
                    s(ag, ab)
                }
                if (ae) {
                    s(ag, ae)
                }
            }
            ab = ag;
            if (!aj.fn) {
                aj = E[aj] || E(aj)
            }
            if (aj) {
                af = ab.link !== U && af;
                if (G.isArray(av) && !ai) {
                    au = am ? ad : (aw !== m && ad) || W(ab, ap, ad, av, aj, aw, af, C);
                    for (ar = 0,
                    aq = av.length; ar < aq; ar++) {
                        ak = av[ar];
                        an = aj.fn(ak, W(ab, ap, au, ak, aj, (aw || 0) + ar, af), H);
                        al += af ? af(an, aj, ac) : an
                    }
                } else {
                    au = am ? ad : W(ab, ap, ad, av, aj, aw, af);
                    au._onRender = af;
                    al += aj.fn(av, au, H, r)
                }
                return af ? af(al, aj, ac, au.key, ap) : al
            }
        }
        D("No template found");
        return ""
    }
    function r(ab) {
        return ab
    }
    function D(ab) {
        if (H.debugMode) {
            throw new H.Error(ab)
        }
    }
    function K(ab) {
        D("Syntax error\n" + ab)
    }
    function A(an, ak, ai) {
        var al, ad = ak && ak.allowCode, ac = [], af = 0, aj = [], ah = ac, ag = [, , , ac];
        function ae(ao) {
            ao -= af;
            if (ao) {
                ah.push(an.substr(af, ao).replace(M, "\\n"))
            }
        }
        function am(ao) {
            ao && K('Unmatched or missing tag: "{{/' + ao + '}}" in template:\n' + an)
        }
        function ab(aC, ao, ar, at, az, ay, aq, av, aw, ap, aA) {
            if (ay) {
                az = ":";
                at = "html"
            }
            var aD, ax = "", aB = "", au = !aw && !az && !ai;
            ar = ar || az;
            ae(aA);
            af = aA + aC.length;
            if (aq) {
                if (ad) {
                    ah.push(["*", av.replace(d, "$1")])
                }
            } else {
                if (ar) {
                    if (ar === "else") {
                        ag[5] = an.substring(ag[5], aA);
                        ag = aj.pop();
                        ah = ag[3];
                        au = C
                    } else {
                        if (ao) {
                            aj.push(ag);
                            ag = ["!", , , [], , aA];
                            ah.push(ag);
                            ah = ag[3]
                        }
                    }
                    av = (av ? u(av, ai, ao).replace(l, function(aE, aF, aG) {
                        if (aF) {
                            aB += aG + ","
                        } else {
                            ax += aG + ","
                        }
                        return ""
                    }) : "");
                    ax = ax.slice(0, -1);
                    av = av.slice(0, -1);
                    al = [ar, at || "", av, au && [], "{" + (ax ? ("props:{" + ax + "},") : "") + "data: data" + (aB ? ",ctx:{" + aB.slice(0, -1) + "}" : "") + "}"];
                    ah.push(al);
                    if (au) {
                        aj.push(ag);
                        ag = al;
                        ag[5] = af
                    } else {
                        if (ao) {
                            ag[5] = an.substring(ag[5], af);
                            ag = aj.pop()
                        }
                    }
                } else {
                    if (ap) {
                        aD = ag[0];
                        am(ap !== aD && !(ap === "if" && aD === "else") && aD);
                        ag[5] = an.substring(ag[5], aA);
                        if (aD === "!") {
                            ag[5] = an.substring(ag[5], af);
                            ag = aj.pop()
                        }
                        ag = aj.pop()
                    }
                }
            }
            am(!ag && ap);
            ah = ag[3]
        }
        an = an.replace(Y, "\\$1");
        am(aj[0] && aj[0][3].pop()[0]);
        an.replace(q, ab);
        ae(an.length);
        return z(ac, ak)
    }
    function z(ai, al) {
        var an, aq, ao, ac, ay, ab, ad, af, ah, ax, av, au, ae, ag, aw, ap, am, at, ak = al ? {
            allowCode: aw = al.allowCode,
            debug: al.debug
        } : {}, aj = al && al.tmpls;
        ao = ai.length;
        ac = (ao ? "" : '"";');
        for (aq = 0; aq < ao; aq++) {
            an = ai[aq];
            if ("" + an === an) {
                ac += '"' + an + '"+'
            } else {
                ax = an[0];
                if (ax === "*") {
                    ac = ac.slice(0, aq ? -1 : -3) + ";" + an[1] + (aq + 1 < ao ? "ret+=" : "")
                } else {
                    av = an[1];
                    au = an[2];
                    ap = an[3];
                    ae = an[4];
                    markup = an[5];
                    if (ax.slice(-1) === "!") {
                        ag = g(markup, ak, al, aj.length);
                        z(ap, ag);
                        if (am = /\s+[\w-]*\s*\=\s*\\['"]$/.exec(ai[aq - 1])) {
                            D("'{{!' in attribute:\n..." + ai[aq - 1] + "{{!...\nUse data-link")
                        }
                        ac += "view.renderLink(" + aj.length + ")+";
                        ag.bound = C;
                        ag.fn.attr = am || "leaf";
                        aj.push(ag)
                    } else {
                        if (ap) {
                            ag = g(markup, ak, al, aj.length);
                            z(ap, ag);
                            aj.push(ag)
                        }
                        ah = ah || ae.indexOf("view") > -1;
                        ac += (ax === ":" ? (av === "html" ? (ab = C,
                        "h(" + au) : av ? (af = C,
                        'c("' + av + '",view,this,' + au) : (ad = C,
                        "((v=" + au + ')!=u?v:""')) : (ay = C,
                        't("' + ax + '",view,this,' + (ap ? aj.length : '""') + "," + ae + (au ? "," : "") + au)) + ")+"
                    }
                }
            }
        }
        ac = V + (ad ? "v," : "") + (ay ? "t=j._tag," : "") + (af ? "c=j._convert," : "") + (ab ? "h=j.converters.html," : "") + "ret; try{\n\n" + (ak.debug ? "debugger;" : "") + (aw ? "ret=" : "return ") + ac.slice(0, -1) + ";\n\n" + (aw ? "return ret;" : "") + "}catch(e){return j._err(e);}";
        try {
            ac = new Function("data, view, j, b, u",ac)
        } catch (ar) {
            K("Compiled template code:\n\n" + ac, ar)
        }
        if (al) {
            al.fn = ac
        }
        return ac
    }
    function u(af, ai, ab) {
        var ag, ac = {}, ad = 0, ae = U, ah = U;
        function aj(al, aB, an, at, aq, ao, aC, ak, ar, aA, az, av, ay, ap, am, ax) {
            aq = aq || "";
            an = an || aB || az;
            at = at || ak;
            ar = ar || am || "";
            aq = aq || "";
            var aw = (ai || ab) && ar !== "(";
            function au(aL, aE, aD, aK, aI, aF, aG) {
                if (aE) {
                    var aJ, aH = (aD ? 'view._hlp("' + aD + '")' : aK ? "view" : "data") + (aG ? (aI ? "." + aI : aD ? "" : (aK ? "" : "." + aE)) + (aF || "") : (aG = aD ? "" : aK ? aI || "" : aE,
                    ""));
                    aJ = (aG ? "." + aG : "");
                    if (!aw) {
                        aH = aH + aJ
                    }
                    aH = aH.slice(0, 9) === "view.data" ? aH.slice(5) : aH;
                    if (aw) {
                        aH = "b(" + aH + ',"' + aG + '")' + aJ
                    }
                    return aH
                }
                return aL
            }
            if (ao) {
                K(af)
            } else {
                return (ah ? (ah = !av,
                (ah ? al : '"')) : ae ? (ae = !ay,
                (ae ? al : '"')) : ((an ? (ad++,
                an) : "") + (ax ? (ad ? "" : ag ? (ag = U,
                "\b") : ",") : aC ? (ad && K(af),
                ag = C,
                "\b" + at + ":") : at ? (at.replace(y, au) + (ar ? (ac[++ad] = C,
                ar) : aq)) : aq ? aq : ap ? ((ac[ad--] = U,
                ap) + (ar ? (ac[++ad] = C,
                ar) : "")) : aA ? (ac[ad] || K(af),
                ",") : aB ? "" : (ah = av,
                ae = ay,
                '"'))))
            }
        }
        af = (af + " ").replace(Q, aj);
        return af
    }
    function S(ab, af, ac) {
        var ad, ae;
        if (ab) {
            for (ad in ab) {
                ae = ab[ad];
                if (!ae.is) {
                    ab[ad] = af(ae, ad, ac)
                }
            }
        }
    }
    function h(ab, ad, ae, ac) {
        var ag, af;
        function ah(ai) {
            if (("" + ai === ai) || ai.nodeType > 0) {
                try {
                    af = ai.nodeType > 0 ? ai : !w.test(ai) && v && v(ai)[0]
                } catch (aj) {}
                if (af) {
                    ai = E[af.getAttribute(N)];
                    if (!ai) {
                        ad = ad || "_" + aa++;
                        af.setAttribute(N, ad);
                        ai = h(af.innerHTML, ad, ae, ac);
                        E[ad] = ai
                    }
                }
                return ai
            }
        }
        ab = ab || "";
        ag = ah(ab);
        ac = ac || (ab.markup ? ab : {});
        ac.name = ad;
        ac.is = "tmpl";
        if (!ag && ab.markup && (ag = ah(ab.markup))) {
            if (ag.fn && (ag.debug !== ab.debug || ag.allowCode !== ab.allowCode)) {
                ag = ag.markup
            }
        }
        if (ag !== m) {
            if (ad && !ae) {
                J[ad] = function() {
                    return ab.render.apply(ab, arguments)
                }
            }
            if (ag.fn || ab.fn) {
                if (ag.fn) {
                    if (ad && ad !== ag.name) {
                        ab = s(s({}, ag), ac)
                    } else {
                        ab = ag
                    }
                }
            } else {
                ab = g(ag, ac, ae, 0);
                A(ag, ab)
            }
            S(ac.templates, h, ab);
            S(ac.tags, n);
            return ab
        }
    }
    function g(ac, ad, af, ae) {
        function ag(ah) {
            if (af[ah]) {
                ab[ah] = s(s({}, af[ah]), ad[ah])
            }
        }
        ad = ad || {};
        var ab = {
            markup: ac,
            tmpls: [],
            links: [],
            render: i
        };
        if (af) {
            if (af.templates) {
                ab.templates = s(s({}, af.templates), ad.templates)
            }
            ab.parent = af;
            ab.name = af.name + "[" + ae + "]";
            ab.key = ae
        }
        s(ab, ad);
        if (af) {
            ag("templates");
            ag("tags");
            ag("helpers");
            ag("converters")
        }
        return ab
    }
    if (v) {
        G = v;
        G.templates = E;
        G.render = J;
        G.views = H;
        G.fn.render = i
    } else {
        G = b.jsviews = H;
        G.extend = function(ad, ac) {
            var ab;
            ad = ad || {};
            for (ab in ac) {
                ad[ab] = ac[ab]
            }
            return ad
        }
        ;
        G.isArray = Array && Array.isArray || function(ab) {
            return Object.prototype.toString.call(ab) === "[object Array]"
        }
    }
    s = G.extend;
    function I(ab) {
        return R[ab] || (R[ab] = "&#" + ab.charCodeAt(0) + ";")
    }
    F({
        "if": function() {
            var ac = this
              , ab = ac.view;
            ab.onElse = function(ag, ae) {
                var af = 0
                  , ad = ae.length;
                while (ad && !ae[af++]) {
                    if (af === ad) {
                        return ""
                    }
                }
                ab.onElse = m;
                ag.path = "";
                return ag.renderContent(ab)
            }
            ;
            return ab.onElse(this, arguments)
        },
        "else": function() {
            var ab = this.view;
            return ab.onElse ? ab.onElse(this, arguments) : ""
        },
        "for": function() {
            var af, ad = this, ab = "", ae = arguments, ac = ae.length;
            if (ac === 0) {
                ac = 1
            }
            for (af = 0; af < ac; af++) {
                ab += ad.renderContent(ae[af])
            }
            return ab
        },
        "*": function(ab) {
            return ab
        }
    });
    a({
        html: function(ab) {
            return ab != m ? String(ab).replace(x, I) : ""
        }
    });
    t()
}
)(this, this.jQuery);
jQuery.easing.jswing = jQuery.easing.swing;
jQuery.extend(jQuery.easing, {
    def: "easeOutQuad",
    swing: function(e, f, a, h, g) {
        return jQuery.easing[jQuery.easing.def](e, f, a, h, g)
    },
    easeInQuad: function(e, f, a, h, g) {
        return h * (f /= g) * f + a
    },
    easeOutQuad: function(e, f, a, h, g) {
        return -h * (f /= g) * (f - 2) + a
    },
    easeInOutQuad: function(e, f, a, h, g) {
        if ((f /= g / 2) < 1) {
            return h / 2 * f * f + a
        }
        return -h / 2 * ((--f) * (f - 2) - 1) + a
    },
    easeInCubic: function(e, f, a, h, g) {
        return h * (f /= g) * f * f + a
    },
    easeOutCubic: function(e, f, a, h, g) {
        return h * ((f = f / g - 1) * f * f + 1) + a
    },
    easeInOutCubic: function(e, f, a, h, g) {
        if ((f /= g / 2) < 1) {
            return h / 2 * f * f * f + a
        }
        return h / 2 * ((f -= 2) * f * f + 2) + a
    },
    easeInQuart: function(e, f, a, h, g) {
        return h * (f /= g) * f * f * f + a
    },
    easeOutQuart: function(e, f, a, h, g) {
        return -h * ((f = f / g - 1) * f * f * f - 1) + a
    },
    easeInOutQuart: function(e, f, a, h, g) {
        if ((f /= g / 2) < 1) {
            return h / 2 * f * f * f * f + a
        }
        return -h / 2 * ((f -= 2) * f * f * f - 2) + a
    },
    easeInQuint: function(e, f, a, h, g) {
        return h * (f /= g) * f * f * f * f + a
    },
    easeOutQuint: function(e, f, a, h, g) {
        return h * ((f = f / g - 1) * f * f * f * f + 1) + a
    },
    easeInOutQuint: function(e, f, a, h, g) {
        if ((f /= g / 2) < 1) {
            return h / 2 * f * f * f * f * f + a
        }
        return h / 2 * ((f -= 2) * f * f * f * f + 2) + a
    },
    easeInSine: function(e, f, a, h, g) {
        return -h * Math.cos(f / g * (Math.PI / 2)) + h + a
    },
    easeOutSine: function(e, f, a, h, g) {
        return h * Math.sin(f / g * (Math.PI / 2)) + a
    },
    easeInOutSine: function(e, f, a, h, g) {
        return -h / 2 * (Math.cos(Math.PI * f / g) - 1) + a
    },
    easeInExpo: function(e, f, a, h, g) {
        return (f == 0) ? a : h * Math.pow(2, 10 * (f / g - 1)) + a
    },
    easeOutExpo: function(e, f, a, h, g) {
        return (f == g) ? a + h : h * (-Math.pow(2, -10 * f / g) + 1) + a
    },
    easeInOutExpo: function(e, f, a, h, g) {
        if (f == 0) {
            return a
        }
        if (f == g) {
            return a + h
        }
        if ((f /= g / 2) < 1) {
            return h / 2 * Math.pow(2, 10 * (f - 1)) + a
        }
        return h / 2 * (-Math.pow(2, -10 * --f) + 2) + a
    },
    easeInCirc: function(e, f, a, h, g) {
        return -h * (Math.sqrt(1 - (f /= g) * f) - 1) + a
    },
    easeOutCirc: function(e, f, a, h, g) {
        return h * Math.sqrt(1 - (f = f / g - 1) * f) + a
    },
    easeInOutCirc: function(e, f, a, h, g) {
        if ((f /= g / 2) < 1) {
            return -h / 2 * (Math.sqrt(1 - f * f) - 1) + a
        }
        return h / 2 * (Math.sqrt(1 - (f -= 2) * f) + 1) + a
    },
    easeInElastic: function(f, h, e, l, k) {
        var i = 1.70158;
        var j = 0;
        var g = l;
        if (h == 0) {
            return e
        }
        if ((h /= k) == 1) {
            return e + l
        }
        if (!j) {
            j = k * 0.3
        }
        if (g < Math.abs(l)) {
            g = l;
            var i = j / 4
        } else {
            var i = j / (2 * Math.PI) * Math.asin(l / g)
        }
        return -(g * Math.pow(2, 10 * (h -= 1)) * Math.sin((h * k - i) * (2 * Math.PI) / j)) + e
    },
    easeOutElastic: function(f, h, e, l, k) {
        var i = 1.70158;
        var j = 0;
        var g = l;
        if (h == 0) {
            return e
        }
        if ((h /= k) == 1) {
            return e + l
        }
        if (!j) {
            j = k * 0.3
        }
        if (g < Math.abs(l)) {
            g = l;
            var i = j / 4
        } else {
            var i = j / (2 * Math.PI) * Math.asin(l / g)
        }
        return g * Math.pow(2, -10 * h) * Math.sin((h * k - i) * (2 * Math.PI) / j) + l + e
    },
    easeInOutElastic: function(f, h, e, l, k) {
        var i = 1.70158;
        var j = 0;
        var g = l;
        if (h == 0) {
            return e
        }
        if ((h /= k / 2) == 2) {
            return e + l
        }
        if (!j) {
            j = k * (0.3 * 1.5)
        }
        if (g < Math.abs(l)) {
            g = l;
            var i = j / 4
        } else {
            var i = j / (2 * Math.PI) * Math.asin(l / g)
        }
        if (h < 1) {
            return -0.5 * (g * Math.pow(2, 10 * (h -= 1)) * Math.sin((h * k - i) * (2 * Math.PI) / j)) + e
        }
        return g * Math.pow(2, -10 * (h -= 1)) * Math.sin((h * k - i) * (2 * Math.PI) / j) * 0.5 + l + e
    },
    easeInBack: function(e, f, a, i, h, g) {
        if (g == undefined) {
            g = 1.70158
        }
        return i * (f /= h) * f * ((g + 1) * f - g) + a
    },
    easeOutBack: function(e, f, a, i, h, g) {
        if (g == undefined) {
            g = 1.70158
        }
        return i * ((f = f / h - 1) * f * ((g + 1) * f + g) + 1) + a
    },
    easeInOutBack: function(e, f, a, i, h, g) {
        if (g == undefined) {
            g = 1.70158
        }
        if ((f /= h / 2) < 1) {
            return i / 2 * (f * f * (((g *= (1.525)) + 1) * f - g)) + a
        }
        return i / 2 * ((f -= 2) * f * (((g *= (1.525)) + 1) * f + g) + 2) + a
    },
    easeInBounce: function(e, f, a, h, g) {
        return h - jQuery.easing.easeOutBounce(e, g - f, 0, h, g) + a
    },
    easeOutBounce: function(e, f, a, h, g) {
        if ((f /= g) < (1 / 2.75)) {
            return h * (7.5625 * f * f) + a
        } else {
            if (f < (2 / 2.75)) {
                return h * (7.5625 * (f -= (1.5 / 2.75)) * f + 0.75) + a
            } else {
                if (f < (2.5 / 2.75)) {
                    return h * (7.5625 * (f -= (2.25 / 2.75)) * f + 0.9375) + a
                } else {
                    return h * (7.5625 * (f -= (2.625 / 2.75)) * f + 0.984375) + a
                }
            }
        }
    },
    easeInOutBounce: function(e, f, a, h, g) {
        if (f < g / 2) {
            return jQuery.easing.easeInBounce(e, f * 2, 0, h, g) * 0.5 + a
        }
        return jQuery.easing.easeOutBounce(e, f * 2 - g, 0, h, g) * 0.5 + h * 0.5 + a
    }
});
(function() {
    var AJAX_DEFAULTS = {
        type: "POST",
        contentType: "application/x-www-form-urlencoded; charset=UTF-8",
        dataType: "json",
        error: function(xhr, status, e) {
            if (typeof console !== "undefined") {
                console.debug(e)
            }
        }
    };
    if (typeof (String.prototype.trim) !== "function") {
        String.prototype.trim = function() {
            return $.trim(this)
        }
    }
    var userAgent = navigator.userAgent.toLowerCase();
    var isWin = /windows/.test(userAgent);
    var isIPad = /ipad/.test(userAgent);
    var isIPhone = !isIPad && /(iphone|ipod)/.test(userAgent);
    var isMac = !isIPad && !isIPhone && /macintosh/.test(userAgent);
    var isAndroid = /android/.test(userAgent);
    var isLinux = !isAndroid && /linux (i686|x86_64)/.test(userAgent);
    var isChromeOS = /cros/.test(userAgent);
    var isFirefox = /firefox/.test(userAgent);
    var isOpera = /opera|opr\/[\d]+/.test(userAgent);
    var isIE = !isOpera && /(msie|trident)/.test(userAgent);
    var isIELower = userAgent.indexOf("compatible") > -1 && userAgent.indexOf("msie") > -1;
    var isEdge = /edge\/(\d+)/.test(userAgent);
    var isChrome = !isOpera && !isEdge && /chrome/.test(userAgent) && /webkit/.test(userAgent);
    var isSafari = !isOpera && !isEdge && !isChrome && /safari/.test(userAgent);
    var isIE8 = isIE && /(msie 8)/.test(userAgent);
    var isBrowser64 = /x64|win64|amd64|x86_64/.test(userAgent);
    var weSnsType = window.weSnsType = 100;
    var cookieDomain = $("body").attr("data-cd");
    if (!cookieDomain) {
        cookieDomain = ".zoom.us"
    }
    var MODAL_DEFAULTS = {
        closeClass: "simplemodal-close",
        closeHTML: null,
        minHeight: 171,
        opacity: 65,
        close: true,
        overlayClose: false,
        escClose: true,
        persist: false,
        modal: true,
        fixed: false,
        onClose: function(dialog) {
            dialog.container.fadeOut("fast", function() {
                dialog.overlay.fadeOut("fast", function() {
                    $.modal.close()
                })
            })
        }
    };
    if (!isIPad) {
        $.extend(MODAL_DEFAULTS, {
            onOpen: function(dialog) {
                dialog.overlay.fadeIn("fast", function() {
                    dialog.container.show();
                    dialog.data.fadeIn("fast")
                })
            }
        })
    }
    var originAjax = $.ajax;
    var popupCaptcha = null;
    $.ajax = function(options) {
        var success = options.success;
        return originAjax($.extend(options, {
            success: function(res, textStatus, jqXHR) {
                if (res && res.errorCode === 7300) {
                    var vm = new Vue();
                    var result = res.result;
                    popupCaptcha = vm.$createPopupCaptcha({
                        type: result.type,
                        routingUrl: result.routingUrl || window.resourceAccountIdRoutingURl,
                        errorMessage: res.errorMessage
                    }, function(captcha) {
                        if (!options.data) {
                            options.data = {}
                        }
                        options.data.recaptcha = captcha;
                        originAjax(options)
                    })
                } else {
                    if (popupCaptcha) {
                        popupCaptcha.hide()
                    }
                    success && success(res, textStatus, jqXHR)
                }
            }
        }))
    }
    ;
    $.extend(SB, {
        isWin: isWin,
        isMac: isMac,
        isIPad: isIPad,
        isIPhone: isIPhone,
        isAndroid: isAndroid,
        isLinux: isLinux,
        isChromeOS: isChromeOS,
        isIE: isIE,
        isIELower: isIELower,
        isIE8: isIE8,
        isEdge: isEdge,
        isFirefox: isFirefox,
        isChrome: isChrome,
        isOpera: isOpera,
        isSafari: isSafari,
        isBrowser64: isBrowser64,
        cookieDomain: cookieDomain,
        MODAL_DEFAULTS: MODAL_DEFAULTS,
        jump: function(url, loadInTop) {
            if (loadInTop) {
                top.location.href = SB.baseUrl + SB.contextPath + url
            } else {
                window.location.href = SB.baseUrl + SB.contextPath + url
            }
        },
        ajax: function(options) {
            return $.ajax($.extend({}, AJAX_DEFAULTS, options))
        },
        postForm: function(url, data, options) {
            var formName = "sb_post_form_";
            if (options && options.postActionName) {
                formName = formName + options.postActionName
            }
            var $form = $("<form>", {
                id: formName,
                name: formName,
                style: "display:none;",
                method: "POST",
                action: url
            });
            if (data) {
                for (var key in data) {
                    $form.append($("<input>", {
                        type: "hidden",
                        name: key,
                        value: data[key]
                    }))
                }
            }
            if (options && options.userIframe === true) {
                var iName = "sb_post_iframe_";
                if (options && options.postActionName) {
                    iName = iName + options.postActionName
                }
                var $iframe = $("<iframe>", {
                    id: iName,
                    name: iName,
                    style: "display:none;",
                    src: ""
                });
                $form.attr("target", iName);
                $(document.body).append($iframe).append($form)
            } else {
                $(document.body).append($form)
            }
            $form.submit()
        },
        clearPostForm: function(postActionName) {
            $("#sb_post_iframe_" + postActionName).remove();
            $("#sb_post_form_" + postActionName).remove()
        },
        post: function(url, data, success, error, complete) {
            if ($.isFunction(data)) {
                complete = error;
                error = success;
                success = data;
                data = {}
            }
            return SB.ajax({
                url: SB.contextPath + url,
                data: data,
                success: success,
                error: error,
                complete: complete
            })
        },
        post3: function(options) {
            var error, btn, showBusy = true, showBusyAfter = true, busyNode;
            if (options.errorNode) {
                error = options.errorNode
            } else {
                error = options.error
            }
            if (options.btnContainer) {
                btn = options.btnContainer
            } else {
                btn = options.btn
            }
            if (typeof (options.showBusy) == "boolean") {
                showBusy = options.showBusy
            }
            if (typeof (options.showBusyAfter) == "boolean") {
                showBusyAfter = options.showBusyAfter
            }
            if (options.busyNode) {
                busyNode = options.busyNode
            }
            return SB.post2(options.url, options.data, options.success, error, btn, showBusy, showBusyAfter, busyNode, options)
        },
        post2: function(url, data, success, error, btn, showBusy, showBusyAfter, busy, options) {
            var i18nUnknownError = SB.getI18nText("Unknown Error!", "common.unknown_error");
            var i18nError = SB.getI18nText("Error", "common.error");
            var submitButton = $(), errorNode;
            if (!$.isFunction(error)) {
                if (error && error.jquery) {
                    errorNode = error
                } else {
                    errorNode = $("#error_msg")
                }
                error = function(display, msg, erroCode) {
                    if (display) {
                        if (typeof (msg) === "undefined") {
                            msg = i18nUnknownError
                        }
                        if (options.containLink) {
                            errorNode.html(msg).show()
                        } else {
                            errorNode.text(msg).show()
                        }
                        if (options.errorCallBack && $.isFunction(options.errorCallBack)) {
                            options.errorCallBack(msg)
                        }
                    } else {
                        errorNode.empty().hide()
                    }
                }
            }
            if (btn) {
                btn = $(btn);
                if (btn.is("a") || btn.is("button") || btn.is("input") || btn.is("li")) {
                    submitButton = btn
                } else {
                    submitButton = btn.find("button[type=submit],input[type=submit],.submit")
                }
            }
            submitButton.disableBtn();
            if (showBusy) {
                if (busy) {
                    $(busy).show()
                } else {
                    if (showBusyAfter) {
                        submitButton.busy()
                    } else {
                        submitButton.busyBefore()
                    }
                }
            }
            error(false);
            return SB.ajax({
                url: SB.contextPath + url,
                data: data,
                dataType: options.dataType ? options.dataType : "json",
                headers: options.headers,
                crossDomain: options.crossDomain || false,
                xhrFields: options.xhrFields || {},
                success: function(response, textStatus, jqXHR) {
                    if (typeof (response.status) === "boolean") {
                        if (response.status) {
                            success(response, textStatus, jqXHR)
                        } else {
                            if (response.errorCode === 201) {
                                SB.jump("/signin")
                            } else {
                                error(true, response.errorMessage ? response.errorMessage : i18nUnknownError, response.errorCode)
                            }
                        }
                    } else {
                        if (response.error) {
                            error(true, response.error.message ? response.error.message : i18nUnknownError, response.errorCode)
                        } else {
                            success(response, textStatus, jqXHR)
                        }
                    }
                },
                error: function(jqXHR, textStatus, e) {
                    var message = e.message ? e.message : jqXHR ? ((textStatus ? textStatus : i18nError) + ": Http " + jqXHR.status + " " + jqXHR.statusText) : i18nUnknownError;
                    error(true, message)
                },
                complete: function(jqXHR, textStatus) {
                    if (options.preventComplete) {
                        return
                    }
                    submitButton.enableBtnDelay();
                    if (showBusy) {
                        if (busy) {
                            $(busy).hide()
                        } else {
                            if (showBusyAfter) {
                                submitButton.removeBusy()
                            } else {
                                submitButton.removeBusyBefore()
                            }
                        }
                    }
                    if (options.complete && $.isFunction(options.complete)) {
                        options.complete(jqXHR, textStatus)
                    }
                }
            })
        },
        buildUrl: function(url) {
            return SB.contextPath + url
        },
        initBtn: function(container) {
            if (!container) {
                container = window.body
            }
            $(".btn", container).click(function(event) {
                if ($(this).hasClass("disabled")) {
                    event.preventDefault();
                    event.stopImmediatePropagation()
                }
            })
        },
        toISOString: function(d) {
            function pad(n) {
                return n < 10 ? "0" + n : n
            }
            return d.getUTCFullYear() + "-" + pad(d.getUTCMonth() + 1) + "-" + pad(d.getUTCDate()) + "T" + pad(d.getUTCHours()) + ":" + pad(d.getUTCMinutes()) + ":" + pad(d.getUTCSeconds()) + "Z"
        },
        checkPlatform: function() {
            var platformCheck = $("#__platformCheck").val();
            if (platformCheck == "os" || platformCheck == "version") {
                SB.jump("/error/os");
                return false
            }
            return true
        },
        alert: function(msg, complete, containLink) {
            var i18nPrompt = SB.getI18nText("Prompt", "common.title.prompt");
            var i18nClose = SB.getI18nText("Close", "common.btn_close");
            var dialog = $('<div id="alert-dialog" class="modaldialog"><div class="modal-dialog"><div class="modal-content"><div class="modal-header clearfix"><button class="close simplemodal-close">&times;</button><h3>' + i18nPrompt + '</h3></div><div class="modal-body"><p></p></div><div class="modal-footer"><button class="btn btn-default simplemodal-close">' + i18nClose + "</button></div></div></div></div>");
            if (containLink) {
                dialog.find(".modal-body p").html(msg)
            } else {
                dialog.find(".modal-body p").text(msg)
            }
            $.modal(dialog, $.extend({}, MODAL_DEFAULTS, {
                overlayId: "alert-overlay",
                containerId: "alert-container",
                minHeight: 171,
                onClose: function(dialog) {
                    dialog.container.fadeOut("fast", function() {
                        dialog.overlay.fadeOut("fast", function() {
                            $.modal.close();
                            if ($.isFunction(complete)) {
                                setTimeout(function() {
                                    complete()
                                }, 10)
                            }
                        })
                    })
                }
            }))
        },
        alertWithOutTitle: function(msg, complete, containLink) {
            var i18nClose = SB.getI18nText("Close", "common.btn_close");
            var dialog = $('<div id="alert-dialog" class="modaldialog"><div class="modal-dialog"><div class="modal-content"><div class="modal-header clearfix"></div><div class="modal-body"><p></p></div><div class="modal-footer"><button class="btn btn-default simplemodal-close">' + i18nClose + "</button></div></div></div></div>");
            if (containLink) {
                dialog.find(".modal-body p").html(msg)
            } else {
                dialog.find(".modal-body p").text(msg)
            }
            $.modal(dialog, $.extend({}, MODAL_DEFAULTS, {
                overlayId: "alert-overlay",
                containerId: "alert-container",
                minHeight: 171,
                onClose: function(dialog) {
                    dialog.container.fadeOut("fast", function() {
                        dialog.overlay.fadeOut("fast", function() {
                            $.modal.close();
                            if (typeof complete === "function") {
                                setTimeout(function() {
                                    complete()
                                }, 10)
                            }
                        })
                    })
                }
            }))
        },
        confirm: function(options) {
            var msg, yes, no, minHeight = 171, beforeRender, buttonFocus;
            var yesText = SB.getI18nText("Yes", "common.btn_yes");
            var noText = SB.getI18nText("No", "common.btn_no");
            var i18nConfirmation = SB.getI18nText("Confirmation", "common.title.confirmation");
            var customerCss = "";
            if (typeof (options) === "string") {
                msg = arguments[0];
                yes = arguments[1];
                no = arguments[2];
                buttonFocus = arguments[3] ? arguments[3] : ""
            } else {
                msg = options.msg;
                yes = options.yes;
                no = options.no;
                buttonFocus = options.buttonFocus || "";
                if (options.yesText) {
                    yesText = options.yesText
                }
                if (options.noText) {
                    noText = options.noText
                }
                if (options.minHeight) {
                    minHeight = options.minHeight
                }
                if (options.beforeRender) {
                    beforeRender = options.beforeRender
                }
                if (options.confirmation) {
                    i18nConfirmation = options.confirmation
                }
                if (options.css) {
                    customerCss = options.css
                }
            }
            var dialog = $('<div id="confirm-dialog" class="modaldialog ' + customerCss + ' "><div class="modal-dialog"><div class="modal-content"><div class="modal-header clearfix"><button class="close simplemodal-close">&times;</button><h3 tabindex="-1" style="display: inline-block">' + i18nConfirmation + '</h3></div><div class="modal-body"><p></p></div><div class="modal-footer"><a role="button" href="javascript:;" class="btn btn-primary yes">' + yesText + '</a><a role="button" href="javascript:;" class="btn btn-default simplemodal-close no">' + noText + "</a></div></div></div></div>");
            dialog.find(".modal-body p").html(msg);
            if (beforeRender) {
                beforeRender(dialog)
            }
            var bYes = false;
            $.modal(dialog, $.extend({}, MODAL_DEFAULTS, {
                overlayId: "confirm-overlay",
                containerId: "confirm-container",
                minHeight: minHeight,
                onShow: function(dialog) {
                    dialog.data.find("a.yes").click(function() {
                        bYes = true;
                        $.modal.close()
                    });
                    setTimeout(function() {
                        $("#confirm-dialog .modal-header>h3").focus()
                    }, 300)
                },
                onClose: function(dialog) {
                    dialog.container.fadeOut("fast", function() {
                        dialog.overlay.fadeOut("fast", function() {
                            if (bYes) {
                                if ($.isFunction(yes)) {
                                    yes()
                                }
                            } else {
                                if ($.isFunction(no)) {
                                    no()
                                }
                            }
                            $.modal.close();
                            console.log(buttonFocus);
                            console.log($(buttonFocus));
                            if (buttonFocus) {
                                setTimeout(function() {
                                    $(buttonFocus).focus()
                                })
                            }
                        })
                    })
                }
            }))
        },
        replaceUrl: function(reg, withStr, originalUrl) {
            if (typeof (originalUrl) == "undefined") {
                originalUrl = window.location.href
            }
            var modifiedUrl = originalUrl;
            if (reg.test(originalUrl)) {
                modifiedUrl = originalUrl.replace(reg, withStr)
            } else {
                if (originalUrl.indexOf("?") >= 0) {
                    modifiedUrl = originalUrl + "&" + withStr
                } else {
                    modifiedUrl = originalUrl + "?" + withStr
                }
            }
            return modifiedUrl
        },
        saveSuccessCookie: function(methodName, param1, param2, param3) {
            $.cookie("__lsc", JSON.stringify(arguments), {
                path: "/"
            })
        },
        getSuccessCookie: function(keepSuccessCookie) {
            var cookieValue = $.cookie("__lsc");
            if (typeof (cookieValue) !== "undefined") {
                if (!keepSuccessCookie) {
                    SB.clearSuccessCookie()
                }
                return JSON.parse(cookieValue)
            }
            return null
        },
        clearSuccessCookie: function() {
            $.cookie("__lsc", null, {
                path: "/"
            })
        },
        showSuccessMsg: function(msg, msgNode, milliseconds, isHtml) {
            isHtml = isHtml || false;
            msgNode = msgNode || $("#content_success_msg");
            milliseconds = milliseconds || 5000;
            if (isHtml) {
                msgNode.html(msg)
            } else {
                msgNode.text(msg)
            }
            if (msgNode[0] === $("#content_success_msg")[0]) {
                msgNode.css("margin-left", -msgNode.width() / 2)
            }
            if (SB.showSuccessTimer) {
                window.clearTimeout(SB.showSuccessTimer)
            }
            msgNode.fadeIn("slow");
            SB.showSuccessTimer = window.setTimeout(function() {
                msgNode.fadeOut("slow")
            }, milliseconds)
        },
        validatePassword: function(passInput, nodeId) {
            var pass = passInput.val();
            var plen = pass.length;
            var ls = 0, score = 0, upperCase, lowerCase, digits, nonAlpha;
            if (plen < 6) {
                score += 0
            } else {
                if (plen < 8) {
                    score += 5
                } else {
                    if (plen < 16) {
                        score += 10
                    } else {
                        score += 15
                    }
                }
                lowerCase = pass.match(/[a-z]/g);
                if (lowerCase) {
                    score += 1
                }
                upperCase = pass.match(/[A-Z]/g);
                if (upperCase) {
                    score += 5
                }
                if (upperCase && lowerCase) {
                    score += 2
                }
                digits = pass.match(/\d/g);
                if (digits && digits.length > 1) {
                    score += 5
                }
                nonAlpha = pass.match(/\W/g);
                if (nonAlpha) {
                    score += (nonAlpha.length > 1) ? 15 : 10
                }
                if (upperCase && lowerCase && digits && nonAlpha) {
                    score += 15
                }
                if (pass.match(/\s/)) {
                    score += 10
                }
            }
            if (score > 1 && score < 15) {
                ls = 1
            }
            if (score >= 15 && score < 20) {
                ls = 2
            }
            if (score >= 20 && score < 35) {
                ls = 3
            }
            if (score >= 35) {
                ls = 4
            }
            var simple = SB.isOrderlyString(pass) || SB.isSameString(pass);
            if (ls > 0 && !simple) {
                nodeId.find("span").css({
                    "background-color": "transparent"
                });
                for (var j = 1; j <= ls; j++) {
                    nodeId.find("#meter" + j).css({
                        "background-color": "rgb(74, 232, 23)"
                    })
                }
            } else {
                nodeId.find("span").css({
                    "background-color": "transparent"
                });
                nodeId.find("#meter1").css({
                    "background-color": "red"
                })
            }
        },
        validateOneRepeatRule: function(passInput, nodeId) {
            var pass = passInput.val();
            if (SB.isSameString(pass)) {
                nodeId.removeClass("success").addClass("error")
            } else {
                nodeId.removeClass("error").addClass("success")
            }
        },
        validateConsecutiveRule: function(passInput, nodeId) {
            var pass = passInput.val();
            if (SB.isOrderlyString(pass)) {
                nodeId.removeClass("success").addClass("error")
            } else {
                nodeId.removeClass("error").addClass("success")
            }
        },
        validateLengthRule: function(passInput, nodeId, length) {
            var pass = passInput.val();
            var plen = pass.length;
            if (plen < length) {
                nodeId.removeClass("success").addClass("error");
                return false
            } else {
                nodeId.removeClass("error").addClass("success");
                return true
            }
        },
        validateNewConsecutiveRule: function(passInput, nodeId, length, ignoreCase) {
            var KEYBOARD_HORIZONTAL_ARR = ["qwertyuiop", "asdfghjkl", "zxcvbnm", "!@#$%^&*()", "01234567890"];
            var isConsecutiveString = function(str, len, ignoreCase) {
                if (ignoreCase) {
                    str = str.toLowerCase()
                }
                var strLen = str.length;
                len = parseInt(len);
                var sameCount, orderCount, reversedCount;
                for (var i = 0; i + len <= strLen; i++) {
                    sameCount = 0;
                    orderCount = 0;
                    reversedCount = 0;
                    for (var j = 0; j < len - 1; j++) {
                        if (str.charCodeAt(i + j) == str.charCodeAt(i + j + 1)) {
                            sameCount++;
                            if (sameCount == len - 1) {
                                return true
                            }
                        }
                        if (str.charCodeAt(i + j + 1) - str.charCodeAt(i + j) == 1) {
                            orderCount++;
                            if (orderCount == len - 1) {
                                return true
                            }
                        }
                        if (str.charCodeAt(i + j) - str.charCodeAt(i + j + 1) == 1) {
                            reversedCount++;
                            if (reversedCount == len - 1) {
                                return true
                            }
                        }
                    }
                    if (checkKeyboard(str.substring(i, i + len))) {
                        return true
                    }
                }
                return false
            };
            function checkKeyboard(str) {
                for (var i = 0; i < KEYBOARD_HORIZONTAL_ARR.length; i++) {
                    var arr = KEYBOARD_HORIZONTAL_ARR[i];
                    if (arr.indexOf(str) != -1) {
                        return true
                    }
                }
                return false
            }
            var pass = passInput.val();
            var result = isConsecutiveString(pass, length, ignoreCase);
            if (result) {
                nodeId.removeClass("success").addClass("error");
                return false
            } else {
                nodeId.removeClass("error").addClass("success");
                return true
            }
        },
        validateAlpabetRule: function(passInput, nodeId) {
            var pass = passInput.val();
            if (!pass.match(/[a-zA-Z]/g)) {
                nodeId.removeClass("success").addClass("error");
                return false
            } else {
                nodeId.removeClass("error").addClass("success");
                return true
            }
        },
        validateOnlyNumberRule: function(passInput, nodeId) {
            var pass = passInput.val();
            if (!pass || !pass.match(/^([0-9]+)$/)) {
                nodeId.removeClass("success").addClass("error");
                return false
            } else {
                nodeId.removeClass("error").addClass("success");
                return true
            }
        },
        validateNumberRule: function(passInput, nodeId) {
            var pass = passInput.val();
            if (!pass.match(/\d/g)) {
                nodeId.removeClass("success").addClass("error");
                return false
            } else {
                nodeId.removeClass("error").addClass("success");
                return true
            }
        },
        validateSpeicalRule: function(passInput, nodeId) {
            var pass = passInput.val();
            if (/^([a-zA-Z0-9]{1,})$/.test(pass) || (pass == "")) {
                nodeId.removeClass("success").addClass("error");
                return false
            } else {
                nodeId.removeClass("error").addClass("success");
                return true
            }
        },
        validateSpecialRule: function(passInput, nodeId) {
            var pass = passInput.val();
            if (!pass.match(/[!@#$%^&*.?_\-+=<>()[\]{},'"/\\|:;~`]/g)) {
                nodeId.removeClass("success").addClass("error");
                return false
            } else {
                nodeId.removeClass("error").addClass("success");
                return true
            }
        },
        validateCombineRule: function(passInput, nodeId) {
            var pass = passInput.val();
            if (pass.match(/[a-z]/g) && pass.match(/[A-Z]/g)) {
                nodeId.removeClass("error").addClass("success");
                return true
            } else {
                nodeId.removeClass("success").addClass("error");
                return false
            }
        },
        isOrderlyString: function(str) {
            var re = true;
            for (var i = 0; i < str.length - 1; i++) {
                var cVal = str.charCodeAt(i);
                var nVal = str.charCodeAt(i + 1);
                if (isNaN(nVal) || isNaN(cVal)) {
                    continue
                } else {
                    if (Math.abs(cVal - nVal) != 1 || cVal == 47 || cVal == 57 || cVal == 64 || cVal == 90 || cVal == 96 || cVal > 122) {
                        re = false;
                        break
                    }
                }
            }
            return re
        },
        isSameString: function(str) {
            var re = true;
            for (var i = 0; i < str.length - 1; i++) {
                var cVal = str.charCodeAt(i);
                var nVal = str.charCodeAt(i + 1);
                if (isNaN(nVal) || isNaN(cVal)) {
                    continue
                } else {
                    if (Math.abs(cVal - nVal) != 0) {
                        re = false;
                        break
                    }
                }
            }
            return re
        },
        formatCurrency: function(val) {
            var prefix = "$";
            if (val < 0) {
                val = 0 - val;
                prefix = "-$"
            }
            return prefix + (val / 100).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,")
        },
        formatNumber: function(val) {
            return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
        },
        htmlEncode: function(value) {
            return $("<div/>").text(value).html()
        },
        htmlDecode: function(value) {
            return $("<div/>").html(value).text()
        },
        hideHeader: function() {
            $("#header_container").hide();
            $("#content_container").removeClass("zoom-newcontent")
        },
        formatConfNo: function(confNo, fmtChar, maxLen) {
            fmtChar = fmtChar || " ";
            maxLen = maxLen || 11;
            confNo = $.trim(confNo).replace(/[^\d]/g, "");
            if (confNo.length > maxLen) {
                confNo = confNo.substr(0, maxLen)
            }
            var result = confNo.substr(0, 3);
            if (confNo.length == 11) {
                result += fmtChar + confNo.substr(3, 4) + fmtChar + confNo.substr(7)
            } else {
                if (confNo.length >= 3) {
                    result += fmtChar + confNo.substr(3, 3)
                }
                if (confNo.length >= 6) {
                    result += fmtChar + confNo.substr(6)
                }
            }
            return result
        },
        initConfInput: function(input, error, fmtChar, maxLen) {
            maxLen = maxLen || 11;
            var confNo = input.attr("confno");
            if (confNo) {
                input.val(SB.formatConfNo(confNo, fmtChar, maxLen))
            }
            input.keyup(function(e) {
                var el = $(this);
                var oval = el.val();
                if (oval.length > 0) {
                    window.setTimeout(function() {
                        var caretPos = el.caret();
                        var nval = SB.formatConfNo(oval, fmtChar, maxLen);
                        if (caretPos === 3 || caretPos === 7) {
                            if (e.keyCode == 8) {
                                caretPos--;
                                nval = SB.formatConfNo(nval.substr(0, caretPos) + nval.substr(caretPos + 2), fmtChar, maxLen)
                            } else {
                                caretPos++
                            }
                        }
                        if (oval !== nval) {
                            if (error) {
                                error.hide()
                            }
                            el.removeClass("error");
                            el.val(nval);
                            el.caret(caretPos)
                        }
                    }, 10)
                }
                return false
            }).keypress(function(e) {
                if (e.ctrlKey || e.altKey || e.metaKey || e.which < 32) {
                    return true
                }
                if (e.keyCode == 8 || e.keyCode == 46 || e.keyCode == 35 || e.keyCode == 36 || e.keyCode == 37 || e.keyCode == 39 || e.keyCode == 144) {
                    return true
                }
                if (!/[0-9]/.test(String.fromCharCode(e.which))) {
                    return false
                }
                var el = $(this);
                var caretPos = el.caret();
                var val = el.val();
                if (val.length === maxLen + 2 && caretPos === maxLen + 2) {
                    return false
                }
            })
        },
        isDigit: function(c) {
            return (c >= "0" && c <= "9")
        },
        initNoAndUrlInput: function(input, error) {
            var maxLen = 11;
            var fmtChar = " ";
            input.keyup(function(e) {
                var el = $(this);
                var oval = el.val();
                if (oval.length > 0) {
                    if (SB.isDigit(oval.charAt(0))) {
                        window.setTimeout(function() {
                            var caretPos = el.caret();
                            var nval = SB.formatConfNo(oval, fmtChar, maxLen);
                            if (caretPos === 3 || caretPos === 7) {
                                if (e.keyCode == 8) {
                                    caretPos--;
                                    nval = SB.formatConfNo(nval.substr(0, caretPos) + nval.substr(caretPos + 2), fmtChar, maxLen)
                                } else {
                                    caretPos++
                                }
                            }
                            if (oval !== nval) {
                                if (error) {
                                    error.hide()
                                }
                                el.removeClass("error");
                                el.val(nval);
                                el.caret(caretPos)
                            }
                        }, 10)
                    } else {
                        var nval = $.trim(oval).replace(/^\./, "").replace(/[^A-Za-z0-9\.]/g, "").toLowerCase();
                        if (error) {
                            error.hide()
                        }
                        el.removeClass("error");
                        if (oval !== nval) {
                            el.val(nval)
                        }
                    }
                    return false
                }
            }).keypress(function(e) {
                if (e.ctrlKey || e.altKey || e.metaKey || e.which < 32) {
                    return true
                }
                if (e.keyCode == 8 || e.keyCode == 46 || e.keyCode == 35 || e.keyCode == 36 || e.keyCode == 37 || e.keyCode == 39 || e.keyCode == 144) {
                    return true
                }
                var el = $(this);
                var caretPos = el.caret();
                var val = el.val();
                if (val.length == 0 || !SB.isDigit(val.charAt(0))) {
                    if (!/[A-Za-z0-9\.]/.test(String.fromCharCode(e.which))) {
                        return false
                    }
                } else {
                    if (!/[0-9]/.test(String.fromCharCode(e.which))) {
                        return false
                    }
                    if (val.length === maxLen + 2 && caretPos === maxLen + 2) {
                        return false
                    }
                }
            })
        },
        initLimitInput: function(input, limitRgx, error, lowercase) {
            input.keyup(function(e) {
                if (e.ctrlKey || e.altKey || e.metaKey || e.which < 32) {
                    return true
                }
                if (e.keyCode == 8 || e.keyCode == 46 || e.keyCode == 35 || e.keyCode == 36 || e.keyCode == 37 || e.keyCode == 39 || e.keyCode == 144 || e.keyCode == 38 || e.keyCode == 40) {
                    return true
                }
                var el = $(this);
                var oval = el.val();
                if (oval.length > 0) {
                    window.setTimeout(function() {
                        var caretPos = el.caret();
                        if (e.keyCode == 8) {
                            caretPos--
                        }
                        var nval = $.trim(oval).replace(limitRgx, "").toLowerCase();
                        if (lowercase) {
                            nval = nval.toLowerCase()
                        }
                        el.val(nval);
                        el.caret(caretPos)
                    }, 10)
                }
                if (error) {
                    error.hide()
                }
                input.removeClass("error");
                return true
            })
        },
        playVideo: function(videoUrl, title, href) {
            var videoDialog = $("#video_dialog");
            var header = videoDialog.find(".modal-header .modal-title");
            videoDialog.find(".modal-body-container").html('<div class="youtube-video-container"><iframe src="' + videoUrl + '" frameborder="0" title="Video Frame" allowfullscreen></iframe></div>');
            if (title && href) {
                header.html('<a href="' + href + '" target="_blank">' + title + "</a>")
            } else {
                if (title) {
                    header.html(title)
                } else {
                    header.html("")
                }
            }
            $.modal(videoDialog, $.extend({}, SB.MODAL_DEFAULTS, {
                overlayId: "video-dialog-overlay",
                containerId: "video-dialog-container",
                persist: true,
                minHeight: videoDialog.outerHeight(),
                overlayClose: true,
                onShow: function() {},
                onClose: function() {
                    $.modal.close();
                    videoDialog.find(".modal-body-container").html("")
                }
            }))
        },
        isNotValidPicFile: function(file, errorFun, sizeLimit, formatLimt) {
            var errCode = 0;
            var result = false;
            formatLimt = formatLimt || /.*\.(gif|jpe?g|png)$/i;
            sizeLimit = sizeLimit || 2 * 1024 * 1024;
            if (!formatLimt.test(file.name)) {
                errCode = 1;
                result = true
            }
            if ((file.size && file.size > sizeLimit)) {
                errCode = 2;
                result = true
            }
            errorFun(errCode, sizeLimit);
            return result
        },
        isNotValidAudioFile: function(file, errorFun, sizeLimit, formatLimt) {
            var errCode = 0;
            var result = false;
            formatLimt = formatLimt || /.*\.wav$/i;
            sizeLimit = sizeLimit || 2 * 1024 * 1024;
            if (!formatLimt.test(file.name)) {
                errCode = 1;
                result = true
            }
            if ((file.size && file.size > sizeLimit)) {
                errCode = 2;
                result = true
            }
            errorFun(errCode, sizeLimit);
            return result
        },
        sendJMF: function(mtgNumber, mtgId, reqId, reason, msg) {
            var data = {
                mn: mtgNumber,
                mi: mtgId,
                reason: reason,
                msg: msg,
                ua: navigator.userAgent,
                ff: window.top !== window
            };
            SB.post("/wjmf", data, function(response) {})
        },
        getI18nText: function(defaultText, resourceKey, resourceParameter) {
            if (typeof $.i18n == "undefined") {
                return !!defaultText ? defaultText : resourceKey
            }
            var i18nText = $.i18n.get(resourceKey, resourceParameter);
            if (!!i18nText) {
                if (i18nText != resourceKey) {
                    return i18nText
                }
            }
            return !!defaultText ? defaultText : resourceKey
        },
        showPastDueMessage: function() {
            var pastdue_msg_close = $.cookie("_pastdue_msg_close");
            if (pastdue_msg_close && pastdue_msg_close == "true") {} else {
                /*
                SB.post("/past_due_message", {}, function(response) {
                    if (response.status) {
                        var pastdueMSGNode = $("#pastdue_msg");
                        var contentNode = $("#pastdue_msg_content");
                        if (response.result && response.result != undefined) {
                            var pastdueData = JSON.parse(response.result);
                            if (typeof pastdueData != "undefined") {
                                if (pastdueData.show_pastdue_msg && pastdueData.show_pastdue_msg == "true") {
                                    contentNode.empty();
                                    var content = '<h4 class="alert-heading">' + $.i18n.get("billing.pastdue.notice") + "</h4>";
                                    content = content + $.i18n.get("billing.pastdue.balance_new", pastdueData.currency_flag, pastdueData.pastdue_balance);
                                    if (pastdueData.pastdue_date_show && pastdueData.pastdue_date_show == "true" && pastdueData.pastdue_terminate_date) {
                                        content = content + " " + $.i18n.get("billing.pastdue.terminate_time", pastdueData.pastdue_terminate_date)
                                    } else {
                                        content = content + " " + $.i18n.get("billing.pastdue.terminate_soon")
                                    }
                                    content = content + " " + $.i18n.get("billing.pastdue.this_means");
                                    if (pastdueData.pastdue_autopay && pastdueData.pastdue_autopay == "true") {
                                        content = content + " " + $.i18n.get("billing.pastdue.pay_online")
                                    } else {
                                        content = content + " " + $.i18n.get("billing.pastdue.contact_sales")
                                    }
                                    contentNode.html(content);
                                    pastdueMSGNode.removeClass("hideme");
                                    pastdueMSGNode.removeAttr("style")
                                }
                            }
                        }
                    }
                })
                */
            }
        },
        sendUserBehavior: function(htmlObj) {
            var data = {};
            if (htmlObj != null) {
                data = {
                    html_object_id: htmlObj.attr("tracking-id") || htmlObj.prop("id"),
                    html_object_category: htmlObj.attr("tracking-category") || "",
                    html_class: htmlObj.prop("class")
                }
            }
            /*
            if (data.html_object_id) {
                SB.post("/sendUserBehavior", data, function() {}, function() {}, function() {})
            }
            */
        },
        getFirstLanguage: function() {
            var nav = window.navigator, browserLanguagePropertyKeys = ["language", "browserLanguage", "systemLanguage", "userLanguage"], i, language = null;
            if ($.isArray(nav.languages)) {
                for (i = 0; i < nav.languages.length; i++) {
                    language = nav.languages[i];
                    if (language && language.indexOf("-") != -1) {
                        return language
                    }
                }
            }
            for (i = 0; i < browserLanguagePropertyKeys.length; i++) {
                language = nav[browserLanguagePropertyKeys[i]];
                if (language && language.indexOf("-") != -1) {
                    return language
                }
            }
            if (language == null) {
                return "en-US"
            }
        },
        getDefCountry: function() {
            var country = "US";
            var code = SB.getFirstLanguage();
            if (code && code.indexOf("-") > 0) {
                country = code.split("-")[1]
            }
            return country.toUpperCase()
        },
        getDefLanguage: function() {
            var language = "en";
            var code = SB.getFirstLanguage();
            if (code && code.indexOf("-") > 0) {
                language = code.split("-")[0]
            }
            return language
        },
        sortObject: function(attribute) {
            return function(o, p) {
                var a, b;
                if (typeof o === "object" && typeof p === "object" && o && p) {
                    a = o[attribute];
                    b = p[attribute];
                    if (a === b) {
                        return 0
                    }
                    if (typeof a === typeof b) {
                        return a < b ? -1 : 1
                    }
                    return typeof a < typeof b ? -1 : 1
                } else {
                    return 0
                }
            }
        },
        loadScript: function(url, callback) {
            var script = document.createElement("script");
            script.type = "text/javascript";
            if (script.readyState) {
                script.onreadystatechange = function() {
                    if (script.readyState == "loaded" || script.readyState == "complete") {
                        script.onreadystatechange = null;
                        if (typeof callback === "function") {
                            callback()
                        }
                    }
                }
            } else {
                script.onload = function() {
                    if (typeof callback === "function") {
                        callback()
                    }
                }
            }
            script.src = url;
            document.getElementsByTagName("head")[0].appendChild(script)
        },
        sendSearchEmailCookie: function(value) {
            $.cookie("zm_search_key", value, {
                path: "/",
                secure: true
            })
        },
        xss: function(val) {
            val = val.toString();
            val = val.replace(/</g, "&lt;");
            val = val.replace(/>/g, "&gt;");
            val = val.replace(/ /g, "&nbsp;");
            val = val.replace(/"/g, "&quot;");
            val = val.replace(/'/g, "&#39;");
            val = val.replace(/&lt;\/br&gt;/g, "</br>");
            return val
        },
        getQueryString: function(name) {
            var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
            var r = window.location.search.substr(1).match(reg);
            if (r != null) {
                return decodeURIComponent(r[2])
            }
            return null
        }
    });
    $.validator.setDefaults({
        errorClass: "help-block",
        errorElement: "span",
        errorClass: "has-error",
        highlight: function(input, errorClass) {
            $(input).parents("div.form-group").addClass("has-error")
        },
        unhighlight: function(input, errorClass) {
            $(input).parents("div.form-group").removeClass("has-error")
        },
        errorPlacement: function(error, input) {
            error.addClass("help-block").insertAfter(input);
            error.attr("role", "alert").attr("aria-live", "assertive")
        }
    });
    jQuery.validator.addMethod("time12hNB", function(value, element) {
        return this.optional(element) || /^((0?[1-9]|1[012])(:[0-5]\d){1,2})$/i.test(value)
    }, function() {
        return SB.getI18nText("Please enter a valid time in 12-hour", "common.enter_time_in_12_hour")
    });
    $.fn.busy = function() {
        return this.each(function() {
            var n = $(this).next();
            if (!n.is("i.busy")) {
                $(this).after('<i class="busy busy24"></i>')
            }
        })
    }
    ;
    $.fn.removeBusy = function() {
        return this.each(function() {
            var n = $(this).next();
            if (n.is("i.busy")) {
                n.remove()
            }
        })
    }
    ;
    $.fn.busyBefore = function() {
        return this.each(function() {
            var n = $(this).prev();
            if (!n.is("i.busy")) {
                $(this).before('<i class="busy busy24"></i>')
            }
        })
    }
    ;
    $.fn.removeBusyBefore = function() {
        return this.each(function() {
            var n = $(this).prev();
            if (n.is("i.busy")) {
                n.remove()
            }
        })
    }
    ;
    $.fn.disableBtn = function() {
        return this.each(function() {
            $(this).addClass("disabled").attr("disabled", "disabled")
        })
    }
    ;
    $.fn.enableBtn = function() {
        return this.each(function() {
            var $this = $(this);
            $this.removeClass("disabled").removeAttr("disabled")
        })
    }
    ;
    $.fn.enableBtnDelay = function() {
        return this.each(function() {
            var $this = $(this);
            window.setTimeout(function() {
                $this.enableBtn()
            }, 3000)
        })
    }
    ;
    $(function() {
        $("[placeholder]").placeholder();
        if (typeof ga == "undefined") {
            ga = function() {}
        }
        function jsGuid() {
            return "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx".replace(/[xy]/g, function(c) {
                var r = Math.random() * 16 | 0
                  , v = c == "x" ? r : (r & 3 | 8);
                return v.toString(16)
            })
        }
        $(".home-video-link").click(function(event) {
            var $this = $(this);
            var videoHref = $this.attr("href");
            SB.playVideo(videoHref);
            event.preventDefault()
        });
        SB.initBtn();
        /*$("form .submit").click(function(){if(!$(this).hasClass("disabled")){$(this).parents("form").submit()}return false});*/
        $("#btnProfile").click(function() {
            window.open(SB.baseUrl + "/profile")
        });
        $("#btnLogout").click(function() {
            if (!SB.loggedIn) {
                return
            }
            if (SB.stype == 101) {
                SB.jump("/saml/logout")
            } else {
                SB.jump("/logout")
            }
        });
        $("#btnOauth2NotMe").click(function() {
            if (!SB.loggedIn) {
                return
            }
            if (SB.stype == 101) {
                SB.jump("/saml/logout")
            } else {
                SB.jump("/logout?type=notme")
            }
        });
        $("#btnDevLogout").click(function() {
            if (!SB.loggedIn) {
                return
            }
            if (SB.stype == 101) {
                SB.jump("/saml/logout")
            } else {
                SB.jump("/developer/logout")
            }
        });
        $("#footerDownload").click(function() {
            if (!SB.checkPlatform()) {
                return false
            }
        });
        function evalInputNameFun(functionName) {
            if (typeof functionName != undefined && functionName !== "") {
                if (/^([a-zA-Z0-9-_]{1,})$/.test(functionName)) {
                    eval(functionName)()
                } else {
                    console.warn("prevent dangeous fun:" + functionName)
                }
            }
        }
        $(".adv-pagination input[name=page_input]").keypress(function(event) {
            var $this = $(this);
            if (event.which === 13) {
                var page = parseInt($this.val());
                if (!isNaN(page) && page > 0) {
                    var total = parseInt($this.attr("data-total"));
                    if (page > total) {
                        page = total
                    }
                    $this.val(page);
                    var preHandlerName = $(".adv-pagination").data("prehandler");
                    evalInputNameFun(preHandlerName);
                    window.location.href = SB.replaceUrl(/p=\d+/ig, "p=" + page)
                }
                event.preventDefault()
            } else {
                if (!(event.which === 8 || event.which === 0 || (event.shiftKey === false && (event.which > 47 && event.which < 58)))) {
                    event.preventDefault()
                }
            }
        });
        $(".adv-pagination ul").delegate("a", "click", function() {
            var li = $(this).parent();
            if (li.hasClass("disabled") || li.hasClass("active")) {
                return false
            }
            var page = parseInt($(this).attr("p"), 10);
            var preHandlerName = $(".adv-pagination").data("prehandler");
            evalInputNameFun(preHandlerName);
            window.location.href = SB.replaceUrl(/p=\d+/ig, "p=" + page);
            return false
        });
        function pageSizeChange($this) {
            var val = $this.val();
            var cookieName = $this.data("cookie");
            $.cookie(cookieName, val, {
                expires: 365,
                path: "/"
            });
            location.reload(true)
        }
        $(".adv-pagination input[name=page_size_input]").each(function() {
            var $this = $(this);
            new ComboBox($this.attr("id"),{
                onChange: function() {
                    pageSizeChange($this)
                }
            });
            $this.change(function() {
                pageSizeChange($this)
            })
        });
        $("body").delegate("[ui-cmd]", "click", function() {
            var $this = $(this);
            if (!$this.hasClass("disabled") && !$this.data("ui-cmd-sending")) {
                var nodeId = $this.attr("ui-cmd");
                var cat = $this.attr("ui-cat");
                SB.post("/wlog", {
                    node: nodeId,
                    cat: cat
                }, function(data) {});
                $this.data("ui-cmd-sending", 1);
                window.setTimeout(function() {
                    $this.removeData("ui-cmd-sending")
                }, 5000)
            }
        });
        if ($("#navbar ul.navbar-right").length > 0) {
            $("#navbar ul.navbar-right").append($("#header_outer #header_login>ul").children())
        } else {
            $("#header_login").removeClass("hideme").show()
        }
        var activeProfileItemIndex = -1;
        var profileMenu = $("#profile-menu");
        $("#pic > a").off("click").on("click", function(event) {
            var parentObj = $(this).closest("#pic");
            if (parentObj.hasClass("show-profile-menu")) {
                parentObj.removeClass("show-profile-menu").find("a.profile-pic").attr("aria-expanded", false)
            } else {
                parentObj.addClass("show-profile-menu").find("a.profile-pic").attr("aria-expanded", true);
                $("#profile-menu").focus();
                event.preventDefault();
                activeProfileItemIndex = -1
            }
        });
        profileMenu.off("keydown").on("keydown", function(event) {
            var menuLength = profileMenu.find("a").length;
            if (event.keyCode == 40 || event.keyCode == 39) {
                activeProfileItemIndex++;
                if (activeProfileItemIndex >= menuLength) {
                    activeProfileItemIndex = 0
                }
                event.stopPropagation();
                setProfileActiveItem(activeProfileItemIndex);
                return false
            } else {
                if (event.keyCode == 38 || event.keyCode == 37) {
                    activeProfileItemIndex--;
                    if (activeProfileItemIndex <= -1) {
                        activeProfileItemIndex = menuLength - 1
                    }
                    event.stopPropagation();
                    setProfileActiveItem(activeProfileItemIndex);
                    return false
                } else {
                    if (event.keyCode == 27) {
                        activeProfileItemIndex = -1;
                        $("#pic > a").focus();
                        $("#pic").removeClass("show-profile-menu").find("a.profile-pic").attr("aria-expanded", true);
                        setProfileActiveItem(activeProfileItemIndex);
                        return false
                    } else {
                        if (event.keyCode == 32 || event.keyCode == 13) {
                            if (activeProfileItemIndex != -1) {
                                var target = profileMenu.find(".avator-menu-item").eq(activeProfileItemIndex);
                                if (target.is($("#btnLogout"))) {
                                    target.click()
                                } else {
                                    location.href = target.attr("href")
                                }
                            }
                        }
                    }
                }
            }
            return false
        });
        function setProfileActiveItem(index) {
            if (index !== -1) {
                var target = profileMenu.find(".avator-menu-item").eq(index);
                target.addClass("hover").siblings(".avator-menu-item").removeClass("hover");
                profileMenu.attr("aria-activedescendant", target.attr("id"))
            } else {
                profileMenu.find(".avator-menu-item").removeClass("hover")
            }
        }
        $(document).on("click", function(event) {
            if (!$(event.target).is($("#pic > a")) && $("#pic").hasClass("show-profile-menu") && !$.contains($("#pic").get(0), event.target)) {
                $("#pic").removeClass("show-profile-menu")
            }
        });
        var sidenav = $("ul.zm-sidenav");
        var sidemenu = $(".sidebar-menu a>span");
        sidemenu.text(sidenav.find("li.active a").text().trim());
        var category = $(".category .itext");
        category.text(category.parents(".category").find("li.active a").text().trim());
        var btnHost = $("#btnHostMeeting");
        var btnMutipleJoin = $("#btnMutipleJoinMeeting");
        var btnSol = $("#btnSolutions");
        var dropdownSol = $("#solutionsDropdown");
        var btnRes = $("#btnResouces");
        var dropdownRes = $("#resourcesDropdown");
        var dropdownMenu = $("#hostMeetingDropdown");
        var dropdownMenu4join = $("#joinmeetingDropdown");
        $("#scheduleMtg").on("click", function() {
            var url = $("#start_url").val();
            window.location.href = url
        });
        if (dropdownMenu.length && !("ontouchstart"in document.documentElement)) {
            var mousePos = {
                x: 0,
                y: 0
            };
            $(document).mousemove(function(event) {
                mousePos.x = event.pageX;
                mousePos.y = event.pageY
            });
            function mouseInside(target) {
                var offset = target.offset();
                if (mousePos.x > offset.left && mousePos.x < offset.left + target.outerWidth() && mousePos.y > offset.top && mousePos.y < offset.top + target.outerHeight()) {
                    return true
                }
                return false
            }
            function closeDropdownIf(btn, drp) {
                window.setTimeout(function() {
                    if (mouseInside(btn) || mouseInside(drp)) {
                        return
                    }
                    btn.parent().removeClass("open")
                }, 500)
            }
            function closeImmediatenIf(btn) {
                btn.parent().removeClass("open")
            }
            btnHost.hover(function() {
                closeImmediatenIf(btnMutipleJoin);
                btnHost.parent().addClass("open");
                $("#pic").removeClass("show-profile-menu")
            }, function() {
                closeDropdownIf(btnHost, dropdownMenu)
            });
            btnMutipleJoin.hover(function() {
                closeImmediatenIf(btnHost);
                btnMutipleJoin.parent().addClass("open")
            }, function() {
                closeDropdownIf(btnMutipleJoin, dropdownMenu4join)
            });
            dropdownMenu.mouseleave(function() {
                closeDropdownIf(btnHost, dropdownMenu)
            });
            dropdownMenu4join.mouseleave(function() {
                closeDropdownIf(btnMutipleJoin, dropdownMenu4join)
            })
        }
        if (dropdownSol.length && !("ontouchstart"in document.documentElement)) {
            var mousePos = {
                x: 0,
                y: 0
            };
            $(document).mousemove(function(event) {
                mousePos.x = event.pageX;
                mousePos.y = event.pageY
            });
            function mouseInside(target) {
                var offset = target.offset();
                if (mousePos.x > offset.left && mousePos.x < offset.left + target.outerWidth() && mousePos.y > offset.top && mousePos.y < offset.top + target.outerHeight()) {
                    return true
                }
                return false
            }
            function closeDropdownIf() {
                window.setTimeout(function() {
                    if (mouseInside(btnSol) || mouseInside(dropdownSol)) {
                        return
                    }
                    btnSol.parent().removeClass("open")
                }, 500)
            }
            btnSol.hover(function() {
                btnSol.parent().addClass("open")
            }, function() {
                closeDropdownIf()
            });
            dropdownSol.mouseleave(function() {
                closeDropdownIf()
            })
        }
        if (dropdownRes.length && !("ontouchstart"in document.documentElement)) {
            var mousePos = {
                x: 0,
                y: 0
            };
            $(document).mousemove(function(event) {
                mousePos.x = event.pageX;
                mousePos.y = event.pageY
            });
            function mouseInside(target) {
                var offset = target.offset();
                if (mousePos.x > offset.left && mousePos.x < offset.left + target.outerWidth() && mousePos.y > offset.top && mousePos.y < offset.top + target.outerHeight()) {
                    return true
                }
                return false
            }
            function closeDropdownIf() {
                window.setTimeout(function() {
                    if (mouseInside(btnRes) || mouseInside(dropdownRes)) {
                        return
                    }
                    btnRes.parent().removeClass("open")
                }, 500)
            }
            btnRes.hover(function() {
                btnRes.parent().addClass("open")
            }, function() {
                closeDropdownIf()
            });
            dropdownRes.mouseleave(function() {
                closeDropdownIf()
            })
        }
        var langDPMenu = $("div.lanuages");
        langDPMenu.delegate("a", "click", function() {
            var self = $(this);
            $.cookie("_zm_lang", self.attr("data-lang"), {
                expires: 365,
                path: "/",
                domain: cookieDomain,
                secure: true
            });
            location.reload(true)
        });
        var reg = new RegExp("(^|&)MKTID=([^&]*)(&|$)");
        var r = window.location.search.substr(1).match(reg);
        var numOnlyExp = /^\d*$/;
        var mktid1 = $.cookie("MKTID1");
        if (r != null && numOnlyExp.test(r[2])) {
            if (mktid1 == "" || mktid1 == null) {
                $.cookie("MKTID1", decodeURIComponent(r[2]), {
                    expires: 30,
                    path: "/"
                });
                $.cookie("MKTID2", decodeURIComponent(r[2]), {
                    expires: 30,
                    path: "/"
                })
            } else {
                $.cookie("MKTID1", mktid1, {
                    expires: 30,
                    path: "/"
                });
                $.cookie("MKTID2", decodeURIComponent(r[2]), {
                    expires: 30,
                    path: "/"
                })
            }
        }
        $(".dropdown-language").delegate(".dropdown-menu a", "click", function(e) {
            var self = $(this);
            if (self.data("locale") != "") {
                $.cookie("_zm_lang", self.data("locale"), {
                    expires: 365,
                    path: "/",
                    domain: cookieDomain,
                    secure: true
                });
                $("html, body").animate({
                    scrollTop: 0
                }, "fast");
                location.reload(true)
            }
        });
        $(".dropdown-currency").delegate(".dropdown-menu a", "click", function(e) {
            var self = $(this);
            if (self.data("currency") != "") {
                $.cookie("_zm_currency", self.data("currency"), {
                    expires: 1,
                    path: "/",
                    domain: cookieDomain,
                    secure: true
                });
                $("html, body").animate({
                    scrollTop: 0
                }, "fast");
                location.reload(true)
            }
        });
        $("#past_due_msg_close").click(function() {
            $.cookie("_pastdue_msg_close", "true", {
                expires: 1,
                path: "/",
                secure: true
            })
        });
        var mktguid = $.cookie("_zm_mtk_guid");
        if (!(mktguid && "" != mktguid)) {
            mktguid = localStorage.getItem("_zm_mtk_guid");
            if (mktguid && mktguid.length === 32) {
                $.cookie("_zm_mtk_guid", mktguid, {
                    expires: 36500,
                    path: "/",
                    domain: cookieDomain,
                    secure: true
                })
            } else {
                var randomGuid = jsGuid();
                $.cookie("_zm_mtk_guid", randomGuid, {
                    expires: 36500,
                    path: "/",
                    domain: cookieDomain,
                    secure: true
                });
                localStorage.setItem("_zm_mtk_guid", randomGuid)
            }
        } else {
            if (mktguid !== localStorage.getItem("_zm_mtk_guid")) {
                localStorage.setItem("_zm_mtk_guid", mktguid)
            }
        }
        var campaignRes = window.location.search.substr(1).match(new RegExp("(^|&)zcid=([^&]*)(&|$)"));
        if (campaignRes != null && "" != campaignRes[2]) {
            SB.post3({
                url: "/market_mapping",
                data: {
                    url: window.location.href,
                    campaignid: campaignRes[2]
                },
                success: function(response) {}
            })
        }
        function clickEvent(obj) {
            if (!obj.data("user-behavior-clicked")) {
                SB.sendUserBehavior(obj);
                obj.data("user-behavior-clicked", 1);
                window.setTimeout(function() {
                    obj.removeData("user-behavior-clicked")
                }, 3000)
            }
        }
        $(document).on("click", "a,button,input[type=button],input[type=submit]", function() {
            clickEvent($(this))
        });
        $("a,button,input[type=button],input[type=submit]").on("click", function() {
            clickEvent($(this))
        });
        $(document).on("mousedown", function() {
            $("body").removeClass("is-keyboard-event")
        }).on("keydown", function() {
            $("body").addClass("is-keyboard-event")
        });
        $("#header_outer.home a[data-toggle='dropdown'], #footer_container .home a[data-toggle='dropdown']").on("keydown", function(event) {
            if (event.keyCode == 32) {
                event.stopPropagation();
                event.preventDefault();
                $(this).parent().toggleClass("open");
                $(this).attr("aria-expanded", $(this).parent().hasClass("open"))
            }
            if (event.keyCode == 38 || event.keyCode == 40) {
                if (!$(this).parent().hasClass("open")) {
                    event.stopPropagation()
                }
            }
        });
        $("#header li.dropdown ~ li a, #header li.signin a, #footer_container .dropdown-currency a, #footer_container .info-icons a").on("keyup", function(event) {
            if (event.keyCode == 9) {
                $("#header li.dropdown").removeClass("open");
                $("#header #dropdown-hostmeeting").removeClass("open");
                $("#footer_container .dropdown-language").removeClass("open")
            }
        });
        $("#footer_container .info-icons a").on("keyup", function(event) {
            if (event.keyCode == 9) {
                $("#footer_container .dropdown-currency").removeClass("open")
            }
        })
    });
    $("#hostMeetingDropdown a,#mobile-host-btn").click(function() {
        var root = $(this);
        var start_url = root.attr("href");
        SB.post3({
            url: "/meeting/meetingIn5Minutes",
            success: function(data) {
                if (data.result === 404) {
                    window.location.href = start_url
                } else {
                    $("#mtgs").html("");
                    var array = data.result.mtgList;
                    var mtgs_html = "";
                    var mtg_length = array.length;
                    if (mtg_length == 1) {
                        $("#one-mtg").removeClass("hideme");
                        $("#more-mtg").addClass("hideme");
                        $("#viwe-more").addClass("hideme");
                        mtgs_html = getTime(array[0], mtgs_html)
                    }
                    if (mtg_length >= 2) {
                        $("#more-mtg").removeClass("hideme");
                        $("#one-mtg").addClass("hideme");
                        $("#viwe-more").addClass("hideme");
                        for (var i = 0; i < 2; i++) {
                            var mtg = array[i];
                            mtgs_html = getTime(mtg, mtgs_html)
                        }
                    }
                    $("#mtgs").append(mtgs_html);
                    if (mtg_length > 2) {
                        $("#viwe-more").removeClass("hideme");
                        $("#more-mtg").removeClass("hideme");
                        $("#one-mtg").addClass("hideme")
                    }
                    var upcomingMeetingDialog = $("#upcomingMeetingDialog");
                    upcomingMeetingDialog.find("input[name='start_url']").val(start_url);
                    $.modal(upcomingMeetingDialog, $.extend({}, SB.MODAL_DEFAULTS, {
                        overlayId: "upcomingMeeting-dialog-overlay",
                        containerId: "upcomingMeeting-dialog-container",
                        escClose: true,
                        persist: true,
                        minHeight: upcomingMeetingDialog.outerHeight(),
                        minWidth: 560,
                        onShow: function() {
                            setTimeout(function() {
                                $("#upcomingMeetingDialog .modal-header>h4").focus()
                            }, 300)
                        },
                        onClose: function() {
                            $.modal.close()
                        }
                    }))
                }
            }
        });
        return false
    });
    function getTime(mtg, mtgs_html) {
        var topic = SB.htmlEncode(mtg.topic);
        var time_display = SB.htmlEncode(mtg.startTimeStr) + " - " + SB.htmlEncode(mtg.endTimeStr);
        var url = mtg.startUrl;
        mtgs_html = mtgs_html + "<div style='position: relative'><div style='width: 500px;height: 18px;text-align: left;font:Bold 13px Open Sans;color: #232333;line-height: 18px'>" + time_display + "</div><div style='width: 360px;height: 36px;text-align: left;font:Regular 13px Open Sans;color: #747487'>" + topic + "</div><div style='position: absolute;top: 0px;z-index: 100;right: 0px'><a role='button' class='btn btn-default btn-sm' style='width: 87px;height: 28px;padding: 4px 26px;background-color: #2D8CFF;color: #fff;font-size: 13px' id='startMtg' ui-cmd='Start' ui-cat='Web.Meeting' href='" + url + "'>Start</a></div></div>";
        return mtgs_html
    }
}
)();

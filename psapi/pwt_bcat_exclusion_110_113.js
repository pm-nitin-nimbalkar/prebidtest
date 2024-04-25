//Custom code by publisher starts
(function() {
    window.PWT = window.PWT || {};
    if (window.PWT && !window.PWT.HookForPrebidSetConfig) {
        window.PWT.HookForPrebidSetConfig = function() {
            owpbjs.setConfig({
                fledgeForGpt: {
                    enabled: true,
                    bidders: [], // empty array means all bidders will be participating. For specific bidders, mention the bidder codes in the array for eg: ["pubmatic"]
                    defaultForSlots: 1
                },
                ortb2: {
                    bcat: ["IAB7", "IAB22", "IAB2", "IAB10-1"],
                    badv: ["cartoonnetwork.com", "brandstack.com"]
                }
            });
        }
    }
})();
//Custom code by publisher ends
/* prebid.js v8.30.0Updated : 2024-02-13*/
(() => {
    var e, t = {
            33984: (e, t, n) => {
                n.d(t, {
                    QP: () => u,
                    Y5: () => l,
                    eA: () => d
                });
                var r = n(39024),
                    i = n(28768),
                    o = n(52420),
                    s = n(11636);
                const a = (0, n(48176).A)(),
                    c = "outstream";

                function d(e) {
                    const {
                        url: t,
                        config: n,
                        id: d,
                        callback: l,
                        loaded: u,
                        adUnitCode: f,
                        renderNow: g
                    } = e;
                    this.url = t, this.config = n, this.handlers = {}, this.id = d, this.renderNow = g, this.loaded = u, this.cmd = [], this.push = e => {
                        "function" == typeof e ? this.loaded ? e.call() : this.cmd.push(e) : (0, i.logError)("Commands given to Renderer.push must be wrapped in a function")
                    }, this.callback = l || (() => {
                        this.loaded = !0, this.process()
                    }), this.render = function() {
                        const e = arguments,
                            n = () => {
                                this._render ? this._render.apply(this, e) : (0, i.logWarn)("No render function was provided, please use .setRender on the renderer")
                            };
                        ! function(e) {
                            const t = a.adUnits,
                                n = (0, s.iw)(t, (t => t.code === e));
                            if (!n) return !1;
                            const r = (0, o.c)(n, "renderer"),
                                i = !!(r && r.url && r.render),
                                c = (0, o.c)(n, "mediaTypes.video.renderer"),
                                d = !!(c && c.url && c.render);
                            return !!(i && !0 !== r.backupOnly || d && !0 !== c.backupOnly)
                        }(f) ? g ? n() : (this.cmd.unshift(n), (0, r.M)(t, c, this.callback, this.documentContext)): ((0, i.logWarn)("External Js not loaded by Renderer since renderer url and callback is already defined on adUnit ".concat(f)), n())
                    }.bind(this)
                }

                function l(e) {
                    return !(!e || !e.url && !e.renderNow)
                }

                function u(e, t, n) {
                    let r = null;
                    e.config && e.config.documentResolver && (r = e.config.documentResolver(t, document, n)), r || (r = document), e.documentContext = r, e.render(t, e.documentContext)
                }
                d.install = function(e) {
                    let {
                        url: t,
                        config: n,
                        id: r,
                        callback: i,
                        loaded: o,
                        adUnitCode: s,
                        renderNow: a
                    } = e;
                    return new d({
                        url: t,
                        config: n,
                        id: r,
                        callback: i,
                        loaded: o,
                        adUnitCode: s,
                        renderNow: a
                    })
                }, d.prototype.getConfig = function() {
                    return this.config
                }, d.prototype.setRender = function(e) {
                    this._render = e
                }, d.prototype.setEventHandlers = function(e) {
                    this.handlers = e
                }, d.prototype.handleVideoEvent = function(e) {
                    let {
                        id: t,
                        eventName: n
                    } = e;
                    "function" == typeof this.handlers[n] && this.handlers[n](), (0, i.logMessage)("Prebid Renderer event for id ".concat(t, " type ").concat(n))
                }, d.prototype.process = function() {
                    for (; this.cmd.length > 0;) try {
                        this.cmd.shift().call()
                    } catch (e) {
                        (0, i.logError)("Error processing Renderer command: ", e)
                    }
                }
            },
            95960: (e, t, n) => {
                n.d(t, {
                    CW: () => o,
                    Go: () => l,
                    Mb: () => f,
                    SB: () => c,
                    Wi: () => i,
                    Y$: () => r,
                    kb: () => u,
                    m0: () => d,
                    yE: () => s,
                    y_: () => a
                });
                const r = "accessDevice",
                    i = "syncUser",
                    o = "enrichUfpd",
                    s = "enrichEids",
                    a = "fetchBids",
                    c = "reportAnalytics",
                    d = "transmitEids",
                    l = "transmitUfpd",
                    u = "transmitPreciseGeo",
                    f = "transmitTid"
            },
            88176: (e, t, n) => {
                n.d(t, {
                    Q: () => i
                });
                var r = n(12576);
                const i = (0, n(74228).MZ)((e => r.cp.resolveAlias(e)))
            },
            39824: (e, t, n) => {
                n.d(t, {
                    AF: () => r,
                    Yf: () => i,
                    _K: () => o,
                    k9: () => s,
                    m6: () => a
                });
                const r = "prebid",
                    i = "bidder",
                    o = "userId",
                    s = "rtd",
                    a = "analytics"
            },
            74228: (e, t, n) => {
                n.d(t, {
                    Eb: () => s,
                    MZ: () => p,
                    QN: () => f,
                    W2: () => a,
                    Wk: () => g,
                    XQ: () => l,
                    aE: () => u,
                    cb: () => d,
                    is: () => o,
                    kB: () => m,
                    wT: () => c
                });
                var r = n(39824),
                    i = n(74712);
                const o = "component",
                    s = o + "Type",
                    a = o + "Name",
                    c = "adapterCode",
                    d = "storageType",
                    l = "configName",
                    u = "syncType",
                    f = "syncUrl",
                    g = "_config";

                function p(e) {
                    return function(t, n, i) {
                        const d = {
                            [s]: t,
                            [a]: n,
                            [o]: "".concat(t, ".").concat(n)
                        };
                        return t === r.Yf && (d[c] = e(n)), m(Object.assign(d, i))
                    }
                }
                const m = (0, i.Ok)("sync", (e => e))
            },
            66212: (e, t, n) => {
                n.d(t, {
                    MR: () => f,
                    U9: () => c,
                    Wu: () => g,
                    am: () => h,
                    im: () => p,
                    mM: () => a,
                    oz: () => u,
                    q2: () => m
                });
                var r = n(52420),
                    i = n(65576),
                    o = n(53260),
                    s = n(95960);
                const a = ["data", "ext.data", "yob", "gender", "keywords", "kwarray", "id", "buyeruid", "customdata"].map((e => "user.".concat(e))).concat("device.ext.cdep"),
                    c = ["user.eids", "user.ext.eids"],
                    d = ["user.geo.lat", "user.geo.lon", "device.geo.lat", "device.geo.lon"];

                function l(e) {
                    return Object.assign({
                        get() {},
                        run(e, t, n, r, i) {
                            const o = n && n[r];
                            if (g(o) && i()) {
                                const e = this.get(o);
                                void 0 === e ? delete n[r] : n[r] = e
                            }
                        }
                    }, e)
                }

                function u(e) {
                    return e.forEach((e => {
                            e.paths = e.paths.map((e => {
                                const t = e.split("."),
                                    n = t.pop();
                                return [t.length > 0 ? t.join(".") : null, n]
                            }))
                        })),
                        function(t, n) {
                            const i = [];
                            for (var o = arguments.length, s = new Array(o > 2 ? o - 2 : 0), a = 2; a < o; a++) s[a - 2] = arguments[a];
                            const c = f(t, ...s);
                            return e.forEach((e => {
                                if (!1 !== t[e.name])
                                    for (const [o, s] of e.paths) {
                                        const a = null == o ? n : (0, r.c)(n, o);
                                        if (i.push(e.run(n, o, a, s, c.bind(null, e))), !1 === t[e.name]) return
                                    }
                            })), i.filter((e => null != e))
                        }
                }

                function f(e) {
                    for (var t = arguments.length, n = new Array(t > 1 ? t - 1 : 0), r = 1; r < t; r++) n[r - 1] = arguments[r];
                    return function(t) {
                        return e.hasOwnProperty(t.name) || (e[t.name] = !!t.applies(...n)), e[t.name]
                    }
                }

                function g(e) {
                    return null != e && ("object" != typeof e || Object.keys(e).length > 0)
                }

                function p(e) {
                    let t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : o.ic;
                    return function(n) {
                        return !t(e, n)
                    }
                }

                function m() {
                    let e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : o.ic;
                    return [{
                        name: s.Go,
                        paths: a,
                        applies: p(s.Go, e)
                    }, {
                        name: s.m0,
                        paths: c,
                        applies: p(s.m0, e)
                    }, {
                        name: s.kb,
                        paths: d,
                        applies: p(s.kb, e),
                        get: e => Math.round(100 * (e + Number.EPSILON)) / 100
                    }, {
                        name: s.Mb,
                        paths: ["source.tid"],
                        applies: p(s.Mb, e)
                    }].map(l)
                }
                const h = function() {
                    let e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : o.ic;
                    const t = u(m(e)),
                        n = u(function() {
                            let e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : o.ic;
                            return [{
                                name: s.m0,
                                paths: ["userId", "userIdAsEids"],
                                applies: p(s.m0, e)
                            }, {
                                name: s.Mb,
                                paths: ["ortb2Imp.ext.tid"],
                                applies: p(s.Mb, e)
                            }].map(l)
                        }(e));
                    return function(e) {
                        const r = {};
                        return {
                            ortb2: n => (t(r, n, e), n),
                            bidRequest: t => (n(r, t, e), t)
                        }
                    }
                }();
                (0, o.u6)(s.Mb, "enableTIDs config", (() => {
                    if (!i.config.getConfig("enableTIDs")) return {
                        allow: !1,
                        reason: "TIDs are disabled"
                    }
                }))
            },
            53260: (e, t, n) => {
                n.d(t, {
                    ic: () => s,
                    u6: () => o
                });
                var r = n(28768),
                    i = n(74228);
                const [o, s] = function() {
                    let e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : (0, r.prefixLog)("Activity control:");
                    const t = {};

                    function n(e) {
                        return t[e] = t[e] || []
                    }

                    function o(t, n, r, o) {
                        let s;
                        try {
                            s = r(o)
                        } catch (r) {
                            e.logError("Exception in rule ".concat(n, " for '").concat(t, "'"), r), s = {
                                allow: !1,
                                reason: r
                            }
                        }
                        return s && Object.assign({
                            activity: t,
                            name: n,
                            component: o[i.is]
                        }, s)
                    }
                    const s = {};

                    function a(t) {
                        let {
                            activity: n,
                            name: r,
                            allow: i,
                            reason: o,
                            component: a
                        } = t;
                        const c = "".concat(r, " ").concat(i ? "allowed" : "denied", " '").concat(n, "' for '").concat(a, "'").concat(o ? ":" : ""),
                            d = s.hasOwnProperty(c);
                        if (d && clearTimeout(s[c]), s[c] = setTimeout((() => delete s[c]), 1e3), !d) {
                            const t = [c];
                            o && t.push(o), (i ? e.logInfo : e.logWarn).apply(e, t)
                        }
                    }
                    return [function(e, t, r) {
                        let i = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : 10;
                        const o = n(e),
                            s = o.findIndex((e => {
                                let [t] = e;
                                return i < t
                            })),
                            a = [i, t, r];
                        return o.splice(s < 0 ? o.length : s, 0, a),
                            function() {
                                const e = o.indexOf(a);
                                e >= 0 && o.splice(e, 1)
                            }
                    }, function(e, t) {
                        let r, i;
                        for (const [s, c, d] of n(e)) {
                            if (r !== s && i) break;
                            r = s;
                            const n = o(e, c, d, t);
                            if (n) {
                                if (!n.allow) return a(n), !1;
                                i = n
                            }
                        }
                        return i && a(i), !0
                    }]
                }()
            },
            91632: (e, t, n) => {
                n.d(t, {
                    CA: () => m,
                    g1: () => h,
                    ke: () => b
                });
                var r = n(28768),
                    i = n(52420),
                    o = n(1276),
                    s = n(16112),
                    a = n(65576),
                    c = n(33984),
                    d = n(48636),
                    l = n(71695);
                const {
                    AD_RENDER_FAILED: u,
                    AD_RENDER_SUCCEEDED: f,
                    STALE_RENDER: g,
                    BID_WON: p
                } = s.EVENTS;

                function m(e) {
                    let {
                        reason: t,
                        message: n,
                        bid: i,
                        id: s
                    } = e;
                    const a = {
                        reason: t,
                        message: n
                    };
                    i && (a.bid = i), s && (a.adId = s), (0, r.logError)("Error rendering ad (id: ".concat(s, "): ").concat(n)), o.emit(u, a)
                }

                function h(e) {
                    let {
                        doc: t,
                        bid: n,
                        id: r
                    } = e;
                    const i = {
                        doc: t
                    };
                    n && (i.bid = n), r && (i.adId = r), o.emit(f, i)
                }

                function b(e, t) {
                    let {
                        adId: n,
                        options: u,
                        bidResponse: f
                    } = t;
                    if (null != f) {
                        if (f.status !== s.BID_STATUS.RENDERED || ((0, r.logWarn)("Ad id ".concat(n, " has been rendered before")), o.emit(g, f), !(0, i.c)(a.config.getConfig("auctionOptions"), "suppressStaleRender"))) {
                            try {
                                const {
                                    adId: t,
                                    ad: n,
                                    adUrl: i,
                                    width: o,
                                    height: a,
                                    renderer: l,
                                    cpm: g,
                                    originalCpm: p,
                                    mediaType: h
                                } = f;
                                if ((0, c.Y5)(l))(0, c.QP)(l, f);
                                else if (t) {
                                    if (h === d.im) return void m({
                                        reason: s.Af.c3,
                                        message: "Cannot render video ad",
                                        bid: f,
                                        id: t
                                    });
                                    const c = {
                                        AUCTION_PRICE: p || g,
                                        CLICKTHROUGH: (null == u ? void 0 : u.clickUrl) || ""
                                    };
                                    e({
                                        ad: (0, r.replaceMacros)(n, c),
                                        adUrl: (0, r.replaceMacros)(i, c),
                                        adId: t,
                                        width: o,
                                        height: a
                                    })
                                }
                            } catch (e) {
                                return void m({
                                    reason: s.Af.Qz,
                                    message: e.message,
                                    id: n,
                                    bid: f
                                })
                            }
                            l.M.addWinningBid(f), o.emit(p, f)
                        }
                    } else m({
                        reason: s.Af.U7,
                        message: "Cannot find ad '".concat(n, "'"),
                        id: n
                    })
                }
            },
            57168: (e, t, n) => {
                n.d(t, {
                    w: () => s
                });
                var r = n(52420);
                let i = {};

                function o(e, t, n) {
                    let r = function(e, t) {
                        let n = i[e] = i[e] || {
                            bidders: {}
                        };
                        return t ? n.bidders[t] = n.bidders[t] || {} : n
                    }(e, n);
                    return r[t] = (r[t] || 0) + 1, r[t]
                }
                let s = {
                    incrementRequestsCounter: function(e) {
                        return o(e, "requestsCounter")
                    },
                    incrementBidderRequestsCounter: function(e, t) {
                        return o(e, "requestsCounter", t)
                    },
                    incrementBidderWinsCounter: function(e, t) {
                        return o(e, "winsCounter", t)
                    },
                    getRequestsCounter: function(e) {
                        return (0, r.c)(i, "".concat(e, ".requestsCounter")) || 0
                    },
                    getBidderRequestsCounter: function(e, t) {
                        return (0, r.c)(i, "".concat(e, ".bidders.").concat(t, ".requestsCounter")) || 0
                    },
                    getBidderWinsCounter: function(e, t) {
                        return (0, r.c)(i, "".concat(e, ".bidders.").concat(t, ".winsCounter")) || 0
                    }
                }
            },
            24376: (e, t, n) => {
                function r(e) {
                    var t = e;
                    return {
                        callBids: function() {},
                        setBidderCode: function(e) {
                            t = e
                        },
                        getBidderCode: function() {
                            return t
                        }
                    }
                }
                n.d(t, {
                    c: () => r
                })
            },
            12576: (e, t, n) => {
                n.d(t, {
                    E3: () => M,
                    Ki: () => j,
                    Oy: () => _,
                    PARTITIONS: () => C,
                    cT: () => D,
                    cp: () => K,
                    uS: () => q
                });
                var r = n(28768),
                    i = n(52420),
                    o = n(68332),
                    s = n(96008),
                    a = n(37280),
                    c = n(65576),
                    d = n(74712),
                    l = n(11636),
                    u = n(57168),
                    f = n(94228),
                    g = n(47356),
                    p = n(1276),
                    m = n(16112),
                    h = n(61820),
                    b = n(71695),
                    y = n(39824),
                    v = n(53260),
                    E = n(95960),
                    w = n(74228),
                    T = n(66212);
                const A = "pbsBidAdapter",
                    C = {
                        CLIENT: "client",
                        SERVER: "server"
                    },
                    I = {
                        isAllowed: v.ic,
                        redact: T.am
                    };
                let S = {},
                    k = S.bidderRegistry = {},
                    O = S.aliasRegistry = {},
                    B = [];
                c.config.getConfig("s2sConfig", (e => {
                    e && e.s2sConfig && (B = (0, r.isArray)(e.s2sConfig) ? e.s2sConfig : [e.s2sConfig])
                }));
                var U = {};
                const R = (0, w.MZ)((e => S.resolveAlias(e)));

                function j(e) {
                    return R(y.AF, A, {
                        [w.XQ]: e.configName
                    })
                }
                const N = (0, d.Ok)("sync", (function(e) {
                    let {
                        bidderCode: t,
                        auctionId: n,
                        bidderRequestId: o,
                        adUnits: s,
                        src: a,
                        metrics: c
                    } = e;
                    return s.reduce(((e, s) => {
                        const d = s.bids.filter((e => e.bidder === t));
                        return null == t && 0 === d.length && null != s.s2sBid && d.push({
                            bidder: null
                        }), e.push(d.reduce(((e, t) => {
                            const d = null == (t = Object.assign({}, t, {
                                ortb2Imp: (0, r.mergeDeep)({}, s.ortb2Imp, t.ortb2Imp)
                            }, (0, r.getDefinedParams)(s, ["nativeParams", "nativeOrtbRequest", "mediaType", "renderer"]))).mediaTypes ? s.mediaTypes : t.mediaTypes;
                            return (0, r.isValidMediaTypes)(d) ? t = Object.assign({}, t, {
                                mediaTypes: d
                            }) : (0, r.logError)("mediaTypes is not correctly configured for adunit ".concat(s.code)), e.push(Object.assign({}, t, {
                                adUnitCode: s.code,
                                transactionId: s.transactionId,
                                sizes: (0, i.c)(d, "banner.sizes") || (0, i.c)(d, "video.playerSize") || [],
                                bidId: t.bid_id || (0, r.getUniqueIdentifierStr)(),
                                bidderRequestId: o,
                                auctionId: n,
                                src: a,
                                metrics: c,
                                bidRequestsCount: u.w.getRequestsCounter(s.code),
                                bidderRequestsCount: u.w.getBidderRequestsCounter(s.code, t.bidder),
                                bidderWinsCount: u.w.getBidderWinsCounter(s.code, t.bidder)
                            })), e
                        }), [])), e
                    }), []).reduce(r.flatten, []).filter((e => "" !== e))
                }), "getBids");
                const D = (0, d.Ok)("sync", (function(e, t) {
                    let {
                        getS2SBidders: n = M
                    } = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {};
                    if (null == t) return e;
                    {
                        const r = n(t);
                        return e.filter((e => r.has(e.bidder)))
                    }
                }), "filterBidsForAdUnit");
                const _ = (0, d.Ok)("sync", ((e, t) => e), "setupAdUnitMediaTypes");

                function M(e) {
                    (0, r.isArray)(e) || (e = [e]);
                    const t = new Set([null]);
                    return e.filter((e => e && e.enabled)).flatMap((e => e.bidders)).forEach((e => t.add(e))), t
                }
                const q = (0, d.Ok)("sync", (function(e, t) {
                    let {
                        getS2SBidders: n = M
                    } = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {};
                    const i = n(t);
                    return (0, r.getBidderCodes)(e).reduce(((e, t) => (e[i.has(t) ? C.SERVER : C.CLIENT].push(t), e)), {
                        [C.CLIENT]: [],
                        [C.SERVER]: []
                    })
                }), "partitionBidders");

                function x(e, t) {
                    const n = k[e],
                        r = (null == n ? void 0 : n.getSpec) && n.getSpec();
                    if (r && r[t] && "function" == typeof r[t]) return [r, r[t]]
                }

                function P(e, t, n, i) {
                    try {
                        (0, r.logInfo)("Invoking ".concat(e, ".").concat(t));
                        for (var o = arguments.length, s = new Array(o > 4 ? o - 4 : 0), a = 4; a < o; a++) s[a - 4] = arguments[a];
                        c.config.runWithBidder(e, i.bind(n, ...s))
                    } catch (n) {
                        (0, r.logWarn)("Error calling ".concat(t, " of ").concat(e))
                    }
                }

                function W(e, t, n) {
                    if ((null == n ? void 0 : n.src) !== m.xP.iu) {
                        const r = x(e, t);
                        null != r && P(e, t, ...r, n)
                    }
                }
                S.makeBidRequests = (0, d.Ok)("sync", (function(e, t, n, i, s) {
                    let a = arguments.length > 5 && void 0 !== arguments[5] ? arguments[5] : {},
                        d = arguments.length > 6 ? arguments[6] : void 0;
                    d = (0, h.hC)(d), p.emit(m.EVENTS.BEFORE_REQUEST_BIDS, e), (0, o.AB)(e), e.forEach((e => {
                        (0, r.isPlainObject)(e.mediaTypes) || (e.mediaTypes = {}), e.bids = e.bids.filter((e => !e.bidder || I.isAllowed(E.y_, R(y.Yf, e.bidder))))
                    })), e = _(e, s);
                    let {
                        [C.CLIENT]: u, [C.SERVER]: b
                    } = q(e, B);
                    c.config.getConfig("bidderSequence") === c.Q && (u = (0, r.shuffle)(u));
                    const v = (0, f.CS)();
                    let w = [];
                    const T = a.global || {},
                        S = a.bidder || {};

                    function O(e, t) {
                        const i = I.redact(null != t ? t : R(y.Yf, e.bidderCode)),
                            o = Object.freeze(i.ortb2((0, r.mergeDeep)({
                                source: {
                                    tid: n
                                }
                            }, T, S[e.bidderCode])));
                        return e.ortb2 = o, e.bids = e.bids.map((e => (e.ortb2 = o, i.bidRequest(e)))), e
                    }
                    B.forEach((i => {
                        const o = j(i);
                        if (i && i.enabled && I.isAllowed(E.y_, o)) {
                            let {
                                adUnits: s,
                                hasModuleBids: a
                            } = function(e, t) {
                                let n = (0, r.deepClone)(e),
                                    i = !1;
                                return n.forEach((e => {
                                    const n = e.bids.filter((e => {
                                        var n;
                                        return e.module === A && (null === (n = e.params) || void 0 === n ? void 0 : n.configName) === t.configName
                                    }));
                                    1 === n.length ? (e.s2sBid = n[0], i = !0, e.ortb2Imp = (0, r.mergeDeep)({}, e.s2sBid.ortb2Imp, e.ortb2Imp)) : n.length > 1 && (0, r.logWarn)('Multiple "module" bids for the same s2s configuration; all will be ignored', n), e.bids = D(e.bids, t).map((e => (e.bid_id = (0, r.getUniqueIdentifierStr)(), e)))
                                })), n = n.filter((e => 0 !== e.bids.length || null != e.s2sBid)), {
                                    adUnits: n,
                                    hasModuleBids: i
                                }
                            }(e, i), c = (0, r.generateUUID)();
                            (0 === b.length && a ? [null] : b).forEach((e => {
                                const a = (0, r.getUniqueIdentifierStr)(),
                                    l = d.fork(),
                                    u = O({
                                        bidderCode: e,
                                        auctionId: n,
                                        bidderRequestId: a,
                                        uniquePbsTid: c,
                                        bids: N({
                                            bidderCode: e,
                                            auctionId: n,
                                            bidderRequestId: a,
                                            adUnits: (0, r.deepClone)(s),
                                            src: m.xP.iu,
                                            metrics: l
                                        }),
                                        auctionStart: t,
                                        timeout: i.timeout,
                                        src: m.xP.iu,
                                        refererInfo: v,
                                        metrics: l
                                    }, o);
                                0 !== u.bids.length && w.push(u)
                            })), s.forEach((e => {
                                let t = e.bids.filter((e => (0, l.iw)(w, (t => (0, l.iw)(t.bids, (t => t.bidId === e.bid_id))))));
                                e.bids = t
                            })), w.forEach((e => {
                                void 0 === e.adUnitsS2SCopy && (e.adUnitsS2SCopy = s.filter((e => e.bids.length > 0 || null != e.s2sBid)))
                            }))
                        }
                    }));
                    let U = function(e) {
                        let t = (0, r.deepClone)(e);
                        return t.forEach((e => {
                            e.bids = D(e.bids, null)
                        })), t = t.filter((e => 0 !== e.bids.length)), t
                    }(e);
                    return u.forEach((e => {
                        const o = (0, r.getUniqueIdentifierStr)(),
                            a = d.fork(),
                            c = O({
                                bidderCode: e,
                                auctionId: n,
                                bidderRequestId: o,
                                bids: N({
                                    bidderCode: e,
                                    auctionId: n,
                                    bidderRequestId: o,
                                    adUnits: (0, r.deepClone)(U),
                                    labels: s,
                                    src: "client",
                                    metrics: a
                                }),
                                auctionStart: t,
                                timeout: i,
                                refererInfo: v,
                                metrics: a
                            }),
                            l = k[e];
                        l || (0, r.logError)("Trying to make a request for bidder that does not exist: ".concat(e)), l && c.bids && 0 !== c.bids.length && w.push(c)
                    })), w.forEach((e => {
                        g.Gq.getConsentData() && (e.gdprConsent = g.Gq.getConsentData()), g.U$.getConsentData() && (e.uspConsent = g.U$.getConsentData()), g.S_.getConsentData() && (e.gppConsent = g.S_.getConsentData())
                    })), w
                }), "makeBidRequests"), S.callBids = function(e, t, n, i, o, s, d) {
                    let l = arguments.length > 7 && void 0 !== arguments[7] ? arguments[7] : {};
                    if (!t.length) return void(0, r.logWarn)("callBids executed with no bidRequests.  Were they filtered by labels or sizing?");
                    let [u, f] = t.reduce(((e, t) => (e[Number(void 0 !== t.src && t.src === m.xP.iu)].push(t), e)), [
                        [],
                        []
                    ]);
                    var g = [];
                    f.forEach((e => {
                        for (var t = -1, n = 0; n < g.length; ++n)
                            if (e.uniquePbsTid === g[n].uniquePbsTid) {
                                t = n;
                                break
                            } t <= -1 && g.push(e)
                    }));
                    let h = 0;
                    B.forEach((e => {
                        if (e && g[h] && M(e).has(g[h].bidderCode)) {
                            const t = (0, a.aO)(s, o ? {
                                request: o.request.bind(null, "s2s"),
                                done: o.done
                            } : void 0);
                            let c = e.bidders;
                            const u = k[e.adapter];
                            let b = g[h].uniquePbsTid,
                                y = g[h].adUnitsS2SCopy,
                                v = f.filter((e => e.uniquePbsTid === b));
                            if (u) {
                                let o = {
                                    ad_units: y,
                                    s2sConfig: e,
                                    ortb2Fragments: l
                                };
                                if (o.ad_units.length) {
                                    let e = v.map((e => (e.start = (0, r.timestamp)(), function() {
                                        d(e.bidderRequestId), i.apply(e, arguments)
                                    })));
                                    const s = (0, r.getBidderCodes)(o.ad_units).filter((e => c.includes(e)));
                                    (0, r.logMessage)("CALLING S2S HEADER BIDDERS ==== ".concat(s.length > 0 ? s.join(", ") : 'No bidder specified, using "ortb2Imp" definition(s) only')), v.forEach((e => {
                                        p.emit(m.EVENTS.BID_REQUESTED, {
                                            ...e,
                                            tid: e.auctionId
                                        })
                                    })), u.callBids(o, f, n, (() => e.forEach((e => e()))), t)
                                }
                            } else(0, r.logError)("missing " + e.adapter);
                            h++
                        }
                    })), u.forEach((e => {
                        e.start = (0, r.timestamp)();
                        const t = k[e.bidderCode];
                        c.config.runWithBidder(e.bidderCode, (() => {
                            (0, r.logMessage)("CALLING BIDDER"), p.emit(m.EVENTS.BID_REQUESTED, e)
                        }));
                        let l = (0, a.aO)(s, o ? {
                            request: o.request.bind(null, e.bidderCode),
                            done: o.done
                        } : void 0);
                        const u = i.bind(e);
                        try {
                            c.config.runWithBidder(e.bidderCode, t.callBids.bind(t, e, n, u, l, (() => d(e.bidderRequestId)), c.config.callbackWithBidder(e.bidderCode)))
                        } catch (t) {
                            (0, r.logError)("".concat(e.bidderCode, " Bid Adapter emitted an uncaught error when parsing their bidRequest"), {
                                e: t,
                                bidRequest: e
                            }), u()
                        }
                    }))
                }, S.videoAdapters = [], S.registerBidAdapter = function(e, t) {
                    let {
                        supportedMediaTypes: n = []
                    } = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {};
                    var i;
                    e && t ? "function" == typeof e.callBids ? (k[t] = e, g.wv.register(y.Yf, t, null === (i = e.getSpec) || void 0 === i ? void 0 : i.call(e).gvlid), (0, l.KM)(n, "video") && S.videoAdapters.push(t), (0, l.KM)(n, "native") && o.__.push(t)) : (0, r.logError)("Bidder adaptor error for bidder code: " + t + "bidder must implement a callBids() function") : (0, r.logError)("bidAdapter or bidderCode not specified")
                }, S.aliasBidAdapter = function(e, t, n) {
                    if (void 0 === k[t]) {
                        let i = k[e];
                        if (void 0 === i) {
                            const n = [];
                            B.forEach((r => {
                                if (r.bidders && r.bidders.length) {
                                    const i = r && r.bidders;
                                    r && (0, l.KM)(i, t) ? O[t] = e : n.push(e)
                                }
                            })), n.forEach((e => {
                                (0, r.logError)('bidderCode "' + e + '" is not an existing bidder.', "adapterManager.aliasBidAdapter")
                            }))
                        } else try {
                            let a, c = function(e) {
                                let t = [];
                                return (0, l.KM)(S.videoAdapters, e) && t.push("video"), (0, l.KM)(o.__, e) && t.push("native"), t
                            }(e);
                            if (i.constructor.prototype != Object.prototype) a = new i.constructor, a.setBidderCode(t);
                            else {
                                let o = i.getSpec(),
                                    c = n && n.gvlid;
                                null != o.gvlid && null == c && (0, r.logWarn)("Alias '".concat(t, "' will NOT re-use the GVL ID of the original adapter ('").concat(o.code, "', gvlid: ").concat(o.gvlid, "). Functionality that requires TCF consent may not work as expected."));
                                let d = n && n.skipPbsAliasing;
                                a = (0, s.Kc)(Object.assign({}, o, {
                                    code: t,
                                    gvlid: c,
                                    skipPbsAliasing: d
                                })), O[t] = e
                            }
                            S.registerBidAdapter(a, t, {
                                supportedMediaTypes: c
                            })
                        } catch (t) {
                            (0, r.logError)(e + " bidder does not currently support aliasing.", "adapterManager.aliasBidAdapter")
                        }
                    } else(0, r.logMessage)('alias name "' + t + '" has been already specified.')
                }, S.resolveAlias = function(e) {
                    let t, n = e;
                    for (; O[n] && (!t || !t.has(n));) n = O[n], (t = t || new Set).add(n);
                    return n
                }, S.registerAnalyticsAdapter = function(e) {
                    let {
                        adapter: t,
                        code: n,
                        gvlid: i
                    } = e;
                    t && n ? "function" == typeof t.enableAnalytics ? (t.code = n, U[n] = {
                        adapter: t,
                        gvlid: i
                    }, g.wv.register(y.m6, n, i)) : (0, r.logError)('Prebid Error: Analytics adaptor error for analytics "'.concat(n, '"\n        analytics adapter must implement an enableAnalytics() function')) : (0, r.logError)("Prebid Error: analyticsAdapter or analyticsCode not specified")
                }, S.enableAnalytics = function(e) {
                    (0, r.isArray)(e) || (e = [e]), e.forEach((e => {
                        const t = U[e.provider];
                        t && t.adapter ? I.isAllowed(E.SB, R(y.m6, e.provider, {
                            [w.Wk]: e
                        })) && t.adapter.enableAnalytics(e) : (0, r.logError)("Prebid Error: no analytics adapter found in registry for '".concat(e.provider, "'."))
                    }))
                }, S.getBidAdapter = function(e) {
                    return k[e]
                }, S.getAnalyticsAdapter = function(e) {
                    return U[e]
                }, S.callTimedOutBidders = function(e, t, n) {
                    t = t.map((t => (t.params = (0, r.getUserConfiguredParams)(e, t.adUnitCode, t.bidder), t.timeout = n, t))), t = (0, r.groupBy)(t, "bidder"), Object.keys(t).forEach((e => {
                        W(e, "onTimeout", t[e])
                    }))
                }, S.callBidWonBidder = function(e, t, n) {
                    t.params = (0, r.getUserConfiguredParams)(n, t.adUnitCode, t.bidder), u.w.incrementBidderWinsCounter(t.adUnitCode, t.bidder), W(e, "onBidWon", t)
                }, S.callBidBillableBidder = function(e) {
                    W(e.bidder, "onBidBillable", e)
                }, S.callSetTargetingBidder = function(e, t) {
                    W(e, "onSetTargeting", t)
                }, S.callBidViewableBidder = function(e, t) {
                    W(e, "onBidViewable", t)
                }, S.callBidderError = function(e, t, n) {
                    W(e, "onBidderError", {
                        error: t,
                        bidderRequest: n
                    })
                }, S.callDataDeletionRequest = (0, d.Ok)("sync", (function() {
                    for (var e = arguments.length, t = new Array(e), n = 0; n < e; n++) t[n] = arguments[n];
                    const i = "onDataDeletionRequest";
                    Object.keys(k).filter((e => !O.hasOwnProperty(e))).forEach((e => {
                        const n = x(e, i);
                        if (null != n) {
                            const r = b.M.getBidsRequested().filter((t => function(e) {
                                const t = new Set;
                                for (; O.hasOwnProperty(e) && !t.has(e);) t.add(e), e = O[e];
                                return e
                            }(t.bidderCode) === e));
                            P(e, i, ...n, r, ...t)
                        }
                    })), Object.entries(U).forEach((e => {
                        var n;
                        let [o, s] = e;
                        const a = null == s || null === (n = s.adapter) || void 0 === n ? void 0 : n[i];
                        if ("function" == typeof a) try {
                            a.apply(s.adapter, t)
                        } catch (e) {
                            (0, r.logError)("error calling ".concat(i, " of ").concat(o), e)
                        }
                    }))
                }));
                const K = S
            },
            96008: (e, t, n) => {
                n.d(t, {
                    K6: () => C,
                    Kc: () => I,
                    U3: () => B,
                    e8: () => O
                });
                var r = n(24376),
                    i = n(12576),
                    o = n(65576),
                    s = n(17580),
                    a = n(51840),
                    c = n(68332),
                    d = n(52224),
                    l = n(16112),
                    u = n(1276),
                    f = n(11636),
                    g = n(28768),
                    p = n(74712),
                    m = n(71695),
                    h = n(16923),
                    b = n(61820),
                    y = n(53260),
                    v = n(88176),
                    E = n(39824),
                    w = n(95960);
                const T = ["cpm", "ttl", "creativeId", "netRevenue", "currency"],
                    A = ["auctionId", "transactionId"];

                function C(e) {
                    const t = Array.isArray(e.supportedMediaTypes) ? {
                        supportedMediaTypes: e.supportedMediaTypes
                    } : void 0;

                    function n(e) {
                        const n = I(e);
                        i.cp.registerBidAdapter(n, e.code, t)
                    }
                    n(e), Array.isArray(e.aliases) && e.aliases.forEach((t => {
                        let r, o, s = t;
                        (0, g.isPlainObject)(t) && (s = t.code, r = t.gvlid, o = t.skipPbsAliasing), i.cp.aliasRegistry[s] = e.code, n(Object.assign({}, e, {
                            code: s,
                            gvlid: r,
                            skipPbsAliasing: o
                        }))
                    }))
                }

                function I(e) {
                    return Object.assign(new r.c(e.code), {
                        getSpec: function() {
                            return Object.freeze(Object.assign({}, e))
                        },
                        registerSyncs: t,
                        callBids: function(n, r, a, c, d, f) {
                            if (!Array.isArray(n.bids)) return;
                            const p = function(e) {
                                    if ((0, y.ic)(w.Mb, (0, v.Q)(E.Yf, e))) return {
                                        bidRequest: e => e,
                                        bidderRequest: e => e
                                    };

                                    function t(e, t, n) {
                                        return A.includes(t) ? null : Reflect.get(e, t, n)
                                    }

                                    function n(e, t) {
                                        const n = new Proxy(e, t);
                                        return Object.entries(e).filter((e => {
                                            let [t, n] = e;
                                            return "function" == typeof n
                                        })).forEach((t => {
                                            let [r, i] = t;
                                            return n[r] = i.bind(e)
                                        })), n
                                    }
                                    const r = (0, g.memoize)((e => n(e, {
                                        get: t
                                    })), (e => e.bidId));
                                    return {
                                        bidRequest: r,
                                        bidderRequest: e => n(e, {
                                            get: (n, i, o) => "bids" === i ? e.bids.map(r) : t(n, i, o)
                                        })
                                    }
                                }(n.bidderCode),
                                m = {};
                            const T = [];

                            function C() {
                                a(), o.config.runWithBidder(e.code, (() => {
                                    u.emit(l.EVENTS.BIDDER_DONE, n), t(T, n.gdprConsent, n.uspConsent, n.gppConsent)
                                }))
                            }
                            const I = U(n).measureTime("validate", (() => n.bids.filter((t => function(t) {
                                if (!e.isBidRequestValid(t)) return (0, g.logWarn)("Invalid bid sent to bidder ".concat(e.code, ": ").concat(JSON.stringify(t))), !1;
                                return !0
                            }(p.bidRequest(t))))));
                            if (0 === I.length) return void C();
                            const k = {};
                            I.forEach((e => {
                                k[e.bidId] = e, e.adUnitCode || (e.adUnitCode = e.placementCode)
                            })), S(e, I.map(p.bidRequest), p.bidderRequest(n), c, f, {
                                onRequest: e => u.emit(l.EVENTS.BEFORE_BIDDER_HTTP, n, e),
                                onResponse: t => {
                                    d(e.code), T.push(t)
                                },
                                onFledgeAuctionConfigs: e => {
                                    e.forEach((e => {
                                        const t = k[e.bidId];
                                        t ? O(t, e.config) : (0, g.logWarn)("Received fledge auction configuration for an unknown bidId", e)
                                    }))
                                },
                                onError: (t, r) => {
                                    d(e.code), i.cp.callBidderError(e.code, r, n), u.emit(l.EVENTS.BIDDER_ERROR, {
                                        error: r,
                                        bidderRequest: n
                                    }), (0, g.logError)("Server call for ".concat(e.code, " failed: ").concat(t, " ").concat(r.status, ". Continuing without bids."))
                                },
                                onBid: t => {
                                    const n = k[t.requestId];
                                    if (n) {
                                        if (t.adapterCode = n.bidder, function(e, t) {
                                                let n = h.m.get(t, "allowAlternateBidderCodes") || !1,
                                                    r = h.m.get(t, "allowedAlternateBidderCodes");
                                                if (e && t && t !== e && (r = (0, g.isArray)(r) ? r.map((e => e.trim().toLowerCase())).filter((e => !!e)).filter(g.uniques) : r, !n || (0, g.isArray)(r) && "*" !== r[0] && !r.includes(e))) return !0;
                                                return !1
                                            }(t.bidderCode, n.bidder)) return (0, g.logWarn)("".concat(t.bidderCode, " is not a registered partner or known bidder of ").concat(n.bidder, ", hence continuing without bid. If you wish to support this bidder, please mark allowAlternateBidderCodes as true in bidderSettings.")), void r.reject(n.adUnitCode, t, l.ST.Sg);
                                        t.originalCpm = t.cpm, t.originalCurrency = t.currency, t.meta = t.meta || Object.assign({}, t[n.bidder]);
                                        const e = Object.assign((0, s.g)(l.bL.I, n), t, (0, g.pick)(n, A));
                                        ! function(e, t) {
                                            const n = (0, b.hC)(t.metrics);
                                            n.checkpoint("addBidResponse"), m[e] = !0, n.measureTime("addBidResponse.validate", (() => B(e, t))) ? r(e, t) : r.reject(e, t, l.ST.IP)
                                        }(n.adUnitCode, e)
                                    } else(0, g.logWarn)("Bidder ".concat(e.code, " made bid for unknown request ID: ").concat(t.requestId, ". Ignoring.")), r.reject(null, t, l.ST.op)
                                },
                                onCompletion: C
                            })
                        }
                    });

                    function t(t, n, r, i) {
                        k(e, t, n, r, i)
                    }
                }
                const S = (0, p.Ok)("sync", (function(e, t, n, r, i, o) {
                        let {
                            onRequest: s,
                            onResponse: a,
                            onFledgeAuctionConfigs: c,
                            onError: d,
                            onBid: l,
                            onCompletion: u
                        } = o;
                        const f = U(n);
                        u = f.startTiming("total").stopBefore(u);
                        let p = f.measureTime("buildRequests", (() => e.buildRequests(t, n)));
                        if (!p || 0 === p.length) return void u();
                        Array.isArray(p) || (p = [p]);
                        const m = (0, g.delayExecution)(u, p.length);
                        p.forEach((t => {
                            const n = f.fork();

                            function o(e) {
                                null != e && (e.metrics = n.fork().renameWith()), l(e)
                            }
                            const u = i((function(r, i) {
                                    b();
                                    try {
                                        r = JSON.parse(r)
                                    } catch (e) {}
                                    r = {
                                        body: r,
                                        headers: {
                                            get: i.getResponseHeader.bind(i)
                                        }
                                    }, a(r);
                                    try {
                                        r = n.measureTime("interpretResponse", (() => e.interpretResponse(r, t)))
                                    } catch (t) {
                                        return (0, g.logError)("Bidder ".concat(e.code, " failed to interpret the server's response. Continuing without bids"), null, t), void m()
                                    }
                                    let s;
                                    r && (0, g.isArray)(r.fledgeAuctionConfigs) ? (c(r.fledgeAuctionConfigs), s = r.bids) : s = r, s && ((0, g.isArray)(s) ? s.forEach(o) : o(s)), m()
                                })),
                                p = i((function(e, t) {
                                    b(), d(e, t), m()
                                }));
                            s(t);
                            const b = n.startTiming("net");

                            function T(n) {
                                var r;
                                const i = t.options;
                                return Object.assign(n, i, {
                                    browsingTopics: !(null != i && i.hasOwnProperty("browsingTopics") && !i.browsingTopics) && ((null === (r = h.m.get(e.code, "topicsHeader")) || void 0 === r || r) && (0, y.ic)(w.Go, (0, v.Q)(E.Yf, e.code)))
                                })
                            }
                            switch (t.method) {
                                case "GET":
                                    r("".concat(t.url).concat(function(e) {
                                        if (e) return "?".concat("object" == typeof e ? (0, g.parseQueryStringParameters)(e) : e);
                                        return ""
                                    }(t.data)), {
                                        success: u,
                                        error: p
                                    }, void 0, T({
                                        method: "GET",
                                        withCredentials: !0
                                    }));
                                    break;
                                case "POST":
                                    r(t.url, {
                                        success: u,
                                        error: p
                                    }, "string" == typeof t.data ? t.data : JSON.stringify(t.data), T({
                                        method: "POST",
                                        contentType: "text/plain",
                                        withCredentials: !0
                                    }));
                                    break;
                                default:
                                    (0, g.logWarn)("Skipping invalid request from ".concat(e.code, ". Request type ").concat(t.type, " must be GET or POST")), m()
                            }
                        }))
                    }), "processBidderRequests"),
                    k = (0, p.Ok)("async", (function(e, t, n, r, s) {
                        const c = o.config.getConfig("userSync.aliasSyncEnabled");
                        if (e.getUserSyncs && (c || !i.cp.aliasRegistry[e.code])) {
                            let i = o.config.getConfig("userSync.filterSettings"),
                                c = e.getUserSyncs({
                                    iframeEnabled: !(!i || !i.iframe && !i.all),
                                    pixelEnabled: !(!i || !i.image && !i.all)
                                }, t, n, r, s);
                            c && (Array.isArray(c) || (c = [c]), c.forEach((t => {
                                a.userSync.registerSync(t.type, e.code, t.url)
                            })), a.userSync.bidderDone(e.code))
                        }
                    }), "registerSyncs"),
                    O = (0, p.Ok)("sync", ((e, t) => {}), "addComponentAuction");

                function B(e, t) {
                    let {
                        index: n = m.M.index
                    } = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {};

                    function r(e) {
                        return "Invalid bid from ".concat(t.bidderCode, ". Ignoring bid: ").concat(e)
                    }
                    return e ? t ? function() {
                        let e = Object.keys(t);
                        return T.every((n => (0, f.KM)(e, n) && !(0, f.KM)([void 0, null], t[n])))
                    }() ? "native" !== t.mediaType || (0, c.M1)(t, {
                        index: n
                    }) ? "video" !== t.mediaType || (0, d.wn)(t, {
                        index: n
                    }) ? !("banner" === t.mediaType && ! function(e, t) {
                        let {
                            index: n = m.M.index
                        } = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {};
                        if ((t.width || 0 === parseInt(t.width, 10)) && (t.height || 0 === parseInt(t.height, 10))) return t.width = parseInt(t.width, 10), t.height = parseInt(t.height, 10), !0;
                        const r = n.getBidRequest(t),
                            i = n.getMediaTypes(t),
                            o = r && r.sizes || i && i.banner && i.banner.sizes,
                            s = (0, g.parseSizesInput)(o);
                        if (1 === s.length) {
                            const [e, n] = s[0].split("x");
                            return t.width = parseInt(e, 10), t.height = parseInt(n, 10), !0
                        }
                        return !1
                    }(e, t, {
                        index: n
                    })) || ((0, g.logError)(r("Banner bids require a width and height")), !1) : ((0, g.logError)(r("Video bid does not have required vastUrl or renderer property")), !1) : ((0, g.logError)(r("Native bid missing some required properties.")), !1) : ((0, g.logError)(r("Bidder ".concat(t.bidderCode, " is missing required params. Check http://prebid.org/dev-docs/bidder-adapter-1.html for list of params."))), !1) : ((0, g.logWarn)("Some adapter tried to add an undefined bid for ".concat(e, ".")), !1) : ((0, g.logWarn)("No adUnitCode was supplied to addBidResponse."), !1)
                }

                function U(e) {
                    return (0, b.hC)(e.metrics).renameWith((t => ["adapter.client.".concat(t), "adapters.client.".concat(e.bidderCode, ".").concat(t)]))
                }
            },
            39024: (e, t, n) => {
                n.d(t, {
                    M: () => a
                });
                var r = n(11636),
                    i = n(28768);
                const o = new WeakMap,
                    s = ["debugging", "adloox", "criteo", "outstream", "adagio", "spotx", "browsi", "brandmetrics", "justtag", "tncId", "akamaidap", "ftrackId", "inskin", "hadron", "medianet", "improvedigital", "aaxBlockmeter", "pbjs-debug-ui", "confiant", "arcspan", "airgrid", "clean.io", "a1Media", "geoedge", "mediafilter", "qortex", "dynamicAdBoost"];

                function a(e, t, n, a, c) {
                    if (!t || !e) return void(0, i.logError)("cannot load external script without url and moduleCode");
                    if (!(0, r.KM)(s, t)) return void(0, i.logError)("".concat(t, " not whitelisted for loading external JavaScript"));
                    a || (a = document);
                    const d = f(a, e);
                    if (d) return n && "function" == typeof n && (d.loaded ? n() : d.callbacks.push(n)), d.tag;
                    const l = o.get(a) || {},
                        u = {
                            loaded: !1,
                            tag: null,
                            callbacks: []
                        };
                    return l[e] = u, o.set(a, l), n && "function" == typeof n && u.callbacks.push(n), (0, i.logWarn)("module ".concat(t, " is loading external JavaScript")),
                        function(t, n, r, o) {
                            r || (r = document);
                            var s = r.createElement("script");
                            s.type = "text/javascript", s.async = !0;
                            const a = f(r, e);
                            a && (a.tag = s);
                            s.readyState ? s.onreadystatechange = function() {
                                "loaded" !== s.readyState && "complete" !== s.readyState || (s.onreadystatechange = null, n())
                            } : s.onload = function() {
                                n()
                            };
                            s.src = t, o && (0, i.setScriptAttributes)(s, o);
                            return (0, i.insertElement)(s, r), s
                        }(e, (function() {
                            u.loaded = !0;
                            try {
                                for (let e = 0; e < u.callbacks.length; e++) u.callbacks[e]()
                            } catch (e) {
                                (0, i.logError)("Error executing callback", "adloader.js:loadExternalScript", e)
                            }
                        }), a, c);

                    function f(e, t) {
                        const n = o.get(e);
                        return n && n[t] ? n[t] : null
                    }
                }
            },
            37280: (e, t, n) => {
                n.d(t, {
                    I5: () => g,
                    Kk: () => f,
                    aO: () => u
                });
                var r = n(65576),
                    i = n(28768);
                const o = {
                        fetch: window.fetch.bind(window),
                        makeRequest: (e, t) => new Request(e, t),
                        timeout(e, t) {
                            const n = new AbortController;
                            let r = setTimeout((() => {
                                n.abort(), (0, i.logError)("Request timeout after ".concat(e, "ms"), t), r = null
                            }), e);
                            return {
                                signal: n.signal,
                                done() {
                                    r && clearTimeout(r)
                                }
                            }
                        }
                    },
                    s = "GET",
                    a = "POST",
                    c = "Content-Type";

                function d() {
                    let e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : 3e3,
                        {
                            request: t,
                            done: n
                        } = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {},
                        i = (t, n) => {
                            var i, s;
                            let a;
                            null == e || null != (null === (i = n) || void 0 === i ? void 0 : i.signal) || r.config.getConfig("disableAjaxTimeout") || (a = o.timeout(e, t), n = Object.assign({
                                signal: a.signal
                            }, n));
                            let c = o.fetch(t, n);
                            return null != (null === (s = a) || void 0 === s ? void 0 : s.done) && (c = c.finally(a.done)), c
                        };
                    return null == t && null == n || (i = (e => function(r, i) {
                        const o = new URL(null == (null == r ? void 0 : r.url) ? r : r.url, document.location).origin;
                        let s = e(r, i);
                        return t && t(o), n && (s = s.finally((() => n(o)))), s
                    })(i)), i
                }

                function l(e, t) {
                    let {
                        status: n,
                        statusText: r = "",
                        headers: o,
                        url: s
                    } = e, a = 0;

                    function d(e) {
                        if (0 === a) try {
                            var n;
                            a = (new DOMParser).parseFromString(t, null == o || null === (n = o.get(c)) || void 0 === n || null === (n = n.split(";")) || void 0 === n ? void 0 : n[0])
                        } catch (t) {
                            a = null, e && e(t)
                        }
                        return a
                    }
                    return {
                        readyState: XMLHttpRequest.DONE,
                        status: n,
                        statusText: r,
                        responseText: t,
                        response: t,
                        responseType: "",
                        responseURL: s,
                        get responseXML() {
                            return d(i.logError)
                        },
                        getResponseHeader: e => null != o && o.has(e) ? o.get(e) : null,
                        toJSON() {
                            return Object.assign({
                                responseXML: d()
                            }, this)
                        }
                    }
                }

                function u() {
                    let e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : 3e3,
                        {
                            request: t,
                            done: n
                        } = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
                    const r = d(e, {
                        request: t,
                        done: n
                    });
                    return function(e, t, n) {
                        ! function(e, t) {
                            const {
                                success: n,
                                error: r
                            } = "object" == typeof t && null != t ? t : {
                                success: "function" == typeof t ? t : () => null,
                                error: (e, t) => (0, i.logError)("Network error", e, t)
                            };
                            e.then((e => e.text().then((t => [e, t])))).then((e => {
                                let [t, i] = e;
                                const o = l(t, i);
                                t.ok || 304 === t.status ? n(i, o) : r(t.statusText, o)
                            }), (() => r("", l({
                                status: 0
                            }, ""))))
                        }(r(function(e, t) {
                            let n = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {};
                            const r = n.method || (t ? a : s);
                            if (r === s && t) {
                                const r = (0, i.parseUrl)(e, n);
                                Object.assign(r.search, t), e = (0, i.buildUrl)(r)
                            }
                            const d = new Headers(n.customHeaders);
                            d.set(c, n.contentType || "text/plain");
                            const l = {
                                method: r,
                                headers: d
                            };
                            return r !== s && t && (l.body = t), n.withCredentials && (l.credentials = "include"), n.browsingTopics && isSecureContext && (l.browsingTopics = !0), o.makeRequest(e, l)
                        }(e, n, arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : {})), t)
                    }
                }
                const f = u(),
                    g = d()
            },
            57120: (e, t, n) => {
                n.d(t, {
                    AD: () => Z,
                    AJ: () => k,
                    EF: () => S,
                    O6: () => D,
                    SP: () => N,
                    a2: () => z,
                    ui: () => M,
                    uw: () => x,
                    yw: () => H
                });
                var r = n(28768),
                    i = n(52420),
                    o = n(25928),
                    s = n(68332),
                    a = n(63160),
                    c = n(33984),
                    d = n(65576),
                    l = n(51840),
                    u = n(74712),
                    f = n(11636),
                    g = n(52224),
                    p = n(48636),
                    m = n(71695),
                    h = n(16923),
                    b = n(1276),
                    y = n(12576),
                    v = n(16112),
                    E = n(86576),
                    w = n(61820),
                    T = n(79323),
                    A = n(48176);
                const {
                    syncUsers: C
                } = l.userSync, I = "started", S = "inProgress", k = "completed";
                b.on(v.EVENTS.BID_ADJUSTMENT, (function(e) {
                    ! function(e) {
                        let t = (0, T.g)(e.cpm, e);
                        t >= 0 && (e.cpm = t)
                    }(e)
                }));
                const O = 4,
                    B = {},
                    U = {},
                    R = [],
                    j = (0, A.A)();

                function N(e) {
                    let {
                        adUnits: t,
                        adUnitCodes: n,
                        callback: s,
                        cbTimeout: a,
                        labels: l,
                        auctionId: u,
                        ortb2Fragments: h,
                        metrics: T
                    } = e;
                    T = (0, w.hC)(T);
                    const A = t,
                        N = l,
                        W = n,
                        K = u || (0, r.generateUUID)(),
                        F = a,
                        G = new Set,
                        z = (0, E.Q)();
                    let H, Y, Q, J, $ = [],
                        X = s,
                        Z = [],
                        ee = [],
                        ne = [],
                        re = [],
                        ie = [];

                    function oe() {
                        return {
                            auctionId: K,
                            timestamp: H,
                            auctionEnd: Y,
                            auctionStatus: J,
                            adUnits: A,
                            adUnitCodes: W,
                            labels: N,
                            bidderRequests: Z,
                            noBids: ne,
                            bidsReceived: ee,
                            bidsRejected: $,
                            winningBids: re,
                            timeout: F,
                            metrics: T,
                            seatNonBids: ie
                        }
                    }

                    function se(e) {
                        if (e ? b.emit(v.EVENTS.AUCTION_TIMEOUT, oe()) : clearTimeout(Q), void 0 === Y) {
                            let n = [];
                            e && ((0, r.logMessage)("Auction ".concat(K, " timedOut")), n = Z.filter((e => !G.has(e.bidderRequestId))).flatMap((e => e.bids)), n.length && b.emit(v.EVENTS.BID_TIMEOUT, n)), J = k, Y = Date.now(), T.checkpoint("auctionEnd"), T.timeBetween("requestBids", "auctionEnd", "requestBids.total"), T.timeBetween("callBids", "auctionEnd", "requestBids.callBids"), z.resolve(), b.emit(v.EVENTS.AUCTION_END, oe()), q(A, (function() {
                                try {
                                    if (null != X) {
                                        const t = ee.filter((e => W.includes(e.adUnitCode))).reduce(te, {});
                                        X.apply(j, [t, e, K]), X = null
                                    }
                                } catch (e) {
                                    (0, r.logError)("Error executing bidsBackHandler", null, e)
                                } finally {
                                    n.length && y.cp.callTimedOutBidders(t, n, F);
                                    let e = d.config.getConfig("userSync") || {};
                                    e.enableOverride || C(e.syncDelay)
                                }
                            }))
                        }
                    }

                    function ae() {
                        d.config.resetBidder(), (0, r.logInfo)("Bids Received for Auction with id: ".concat(K), ee), J = k, se(!1)
                    }

                    function ce(e) {
                        G.add(e)
                    }

                    function de(e) {
                        e.forEach((e => {
                            var t;
                            t = e, Z = Z.concat(t)
                        }));
                        let t = {},
                            n = {
                                bidRequests: e,
                                run: () => {
                                    Q = setTimeout((() => se(!0)), F), J = S, b.emit(v.EVENTS.AUCTION_INIT, oe());
                                    let n = function(e, t) {
                                        let {
                                            index: n = m.M.index
                                        } = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {}, s = 0, a = !1, l = new Set, u = {};

                                        function h() {
                                            s--, a && 0 === s && e()
                                        }

                                        function y(e, t, n) {
                                            return u[t.requestId] = !0,
                                                function(e, t) {
                                                    let {
                                                        index: n = m.M.index
                                                    } = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {};
                                                    const i = n.getBidderRequest(e),
                                                        o = n.getAdUnit(e),
                                                        s = i && i.start || e.requestTimestamp;
                                                    Object.assign(e, {
                                                        responseTimestamp: e.responseTimestamp || (0, r.timestamp)(),
                                                        requestTimestamp: e.requestTimestamp || s,
                                                        cpm: parseFloat(e.cpm) || 0,
                                                        bidder: e.bidder || e.bidderCode,
                                                        adUnitCode: t
                                                    }), null != (null == o ? void 0 : o.ttlBuffer) && (e.ttlBuffer = o.ttlBuffer);
                                                    e.timeToRespond = e.responseTimestamp - e.requestTimestamp
                                                }(t, e), s++, n(h)
                                        }

                                        function w(e, n) {
                                            y(e, n, (e => {
                                                let s = function(e) {
                                                    var t;
                                                    let {
                                                        index: n = m.M.index
                                                    } = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
                                                    b.emit(v.EVENTS.BID_ADJUSTMENT, e);
                                                    const r = (null === (t = n.getBidRequest(e)) || void 0 === t ? void 0 : t.renderer) || n.getAdUnit(e).renderer,
                                                        i = e.mediaType,
                                                        s = n.getMediaTypes(e),
                                                        a = s && s[i];
                                                    var l = a && a.renderer,
                                                        u = null;
                                                    l && l.url && l.render && (!0 !== l.backupOnly || !e.renderer) ? u = l : r && r.url && r.render && (!0 !== r.backupOnly || !e.renderer) && (u = r);
                                                    u && (e.renderer = c.eA.install({
                                                        url: u.url,
                                                        config: u.options
                                                    }), e.renderer.setRender(u.render));
                                                    const f = V(e.mediaType, s, d.config.getConfig("mediaTypePriceGranularity")),
                                                        g = (0, o.k)(e.cpm, "object" == typeof f ? f : d.config.getConfig("customPriceBucket"), d.config.getConfig("currency.granularityMultiplier"));
                                                    return e.pbLg = g.low, e.pbMg = g.med, e.pbHg = g.high, e.pbAg = g.auto, e.pbDg = g.dense, e.pbCg = g.custom, e
                                                }(n);
                                                b.emit(v.EVENTS.BID_ACCEPTED, s), s.mediaType === p.im ? function(e, t, n) {
                                                    let {
                                                        index: o = m.M.index
                                                    } = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : {}, s = !0;
                                                    const a = (0, i.c)(o.getMediaTypes({
                                                            requestId: t.originalRequestId || t.requestId,
                                                            transactionId: t.transactionId
                                                        }), "video"),
                                                        c = a && (0, i.c)(a, "context"),
                                                        l = a && (0, i.c)(a, "useCacheKey");
                                                    d.config.getConfig("cache.url") && (l || c !== g.KQ) && (!t.videoCacheKey || d.config.getConfig("cache.ignoreBidderCacheKey") ? (s = !1, L(e, t, n, a)) : t.vastUrl || ((0, r.logError)("videoCacheKey specified but not required vastUrl for video bid"), s = !1));
                                                    s && (x(e, t), n())
                                                }(t, s, e) : (null != s.native && "object" == typeof s.native && P(s), x(t, s), e())
                                            }))
                                        }

                                        function T(e, n, i) {
                                            return y(e, n, (e => {
                                                n.rejectionReason = i, (0, r.logWarn)("Bid from ".concat(n.bidder || "unknown bidder", " was rejected: ").concat(i), n), b.emit(v.EVENTS.BID_REJECTED, n), t.addBidRejected(n), e()
                                            }))
                                        }

                                        function A() {
                                            let n = this,
                                                i = t.getBidRequests();
                                            const o = d.config.getConfig("auctionOptions");
                                            if (l.add(n), o && !(0, r.isEmpty)(o)) {
                                                const e = o.secondaryBidders;
                                                e && !i.every((t => (0, f.KM)(e, t.bidderCode))) && (i = i.filter((t => !(0, f.KM)(e, t.bidderCode))))
                                            }
                                            a = i.every((e => l.has(e))), n.bids.forEach((e => {
                                                u[e.bidId] || (t.addNoBid(e), b.emit(v.EVENTS.NO_BID, e))
                                            })), a && 0 === s && e()
                                        }
                                        return {
                                            addBidResponse: function() {
                                                function e(e, t) {
                                                    D.call({
                                                        dispatch: w
                                                    }, e, t, (() => {
                                                        let n = !1;
                                                        return r => {
                                                            n || (T(e, t, r), n = !0)
                                                        }
                                                    })())
                                                }
                                                return e.reject = T, e
                                            }(),
                                            adapterDone: function() {
                                                _(E.i.resolve()).finally((() => A.call(this)))
                                            }
                                        }
                                    }(ae, this);
                                    y.cp.callBids(A, e, n.addBidResponse, n.adapterDone, {
                                        request(e, n) {
                                            a(B, n), a(t, e), U[e] || (U[e] = {
                                                SRA: !0,
                                                origin: n
                                            }), t[e] > 1 && (U[e].SRA = !1)
                                        },
                                        done(e) {
                                            B[e]--, R[0] && s(R[0]) && R.shift()
                                        }
                                    }, F, ce, h)
                                }
                            };

                        function s(e) {
                            let t = !0,
                                n = d.config.getConfig("maxRequestsPerOrigin") || O;
                            return e.bidRequests.some((e => {
                                let r = 1,
                                    i = void 0 !== e.src && e.src === v.xP.iu ? "s2s" : e.bidderCode;
                                return U[i] && (!1 === U[i].SRA && (r = Math.min(e.bids.length, n)), B[U[i].origin] + r > n && (t = !1)), !t
                            })), t && e.run(), t
                        }

                        function a(e, t) {
                            void 0 === e[t] ? e[t] = 1 : e[t]++
                        }
                        s(n) || ((0, r.logWarn)("queueing auction due to limited endpoint capacity"), R.push(n))
                    }
                    return b.on(v.EVENTS.SEAT_NON_BID, (e => {
                        var t;
                        e.auctionId === K && (t = e.seatnonbid, ie = ie.concat(t))
                    })), {
                        addBidReceived: function(e) {
                            ee = ee.concat(e)
                        },
                        addBidRejected: function(e) {
                            $ = $.concat(e)
                        },
                        addNoBid: function(e) {
                            ne = ne.concat(e)
                        },
                        callBids: function() {
                            J = I, H = Date.now();
                            let e = T.measureTime("requestBids.makeRequests", (() => y.cp.makeBidRequests(A, H, K, F, N, h, T)));
                            (0, r.logInfo)("Bids Requested for Auction with id: ".concat(K), e), T.checkpoint("callBids"), e.length < 1 ? ((0, r.logWarn)("No valid bid requests returned for auction"), ae()) : M.call({
                                dispatch: de,
                                context: this
                            }, e)
                        },
                        addWinningBid: function(e) {
                            const n = t.find((t => t.transactionId === e.transactionId));
                            re = re.concat(e), (0, r.callBurl)(e), y.cp.callBidWonBidder(e.adapterCode || e.bidder, e, t), n && !n.deferBilling && y.cp.callBidBillableBidder(e)
                        },
                        setBidTargeting: function(e) {
                            y.cp.callSetTargetingBidder(e.adapterCode || e.bidder, e)
                        },
                        getWinningBids: () => re,
                        getAuctionStart: () => H,
                        getAuctionEnd: () => Y,
                        getTimeout: () => F,
                        getAuctionId: () => K,
                        getAuctionStatus: () => J,
                        getAdUnits: () => A,
                        getAdUnitCodes: () => W,
                        getBidRequests: () => Z,
                        getBidsReceived: () => ee,
                        getNoBids: () => ne,
                        getNonBids: () => ie,
                        getFPD: () => h,
                        getMetrics: () => T,
                        end: z.promise
                    }
                }
                const D = (0, u.Ok)("sync", (function(e, t, n) {
                        this.dispatch.call(null, e, t)
                    }), "addBidResponse"),
                    _ = (0, u.Ok)("sync", (e => e), "responsesReady"),
                    M = (0, u.Ok)("sync", (function(e) {
                        this.dispatch.call(this.context, e)
                    }), "addBidderRequests"),
                    q = (0, u.Ok)("async", (function(e, t) {
                        t && t()
                    }), "bidsBackCallback");

                function x(e, t) {
                    ! function(e) {
                        let t;
                        const n = !0 === h.m.get(e.bidderCode, "allowZeroCpmBids") ? e.cpm >= 0 : e.cpm > 0;
                        e.bidderCode && (n || e.dealId) && (t = function(e, t) {
                            let {
                                index: n = m.M.index
                            } = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {};
                            if (!t) return {};
                            const r = n.getBidRequest(t);
                            var i = {};
                            const o = Z(t.mediaType, e);
                            ee(i, o, t, r), e && h.m.getOwn(e, v.L7.s1) && (ee(i, h.m.ownSettingsFor(e), t, r), t.sendStandardTargeting = h.m.get(e, "sendStandardTargeting"));
                            t.native && (i = Object.assign({}, i, (0, s.IX)(t)));
                            return i
                        }(e.bidderCode, e));
                        e.adserverTargeting = Object.assign(e.adserverTargeting || {}, t)
                    }(t), (0, w.hC)(t.metrics).timeSince("addBidResponse", "addBidResponse.total"), e.addBidReceived(t), b.emit(v.EVENTS.BID_RESPONSE, t)
                }
                const P = e => {
                        var t, n;
                        const r = null === (t = m.M.index.getAdUnit(e)) || void 0 === t ? void 0 : t.nativeOrtbRequest,
                            i = null === (n = e.native) || void 0 === n ? void 0 : n.ortb;
                        if (r && i) {
                            const t = (0, s.$s)(i, r);
                            Object.assign(e.native, t)
                        }
                    },
                    W = e => {
                        (0, a.i)(e.map((e => e.bidResponse)), (function(t, n) {
                            n.forEach(((n, i) => {
                                const {
                                    auctionInstance: o,
                                    bidResponse: s,
                                    afterBidAdded: c
                                } = e[i];
                                t ? (0, r.logWarn)("Failed to save to the video cache: ".concat(t, ". Video bid must be discarded.")) : "" === n.uuid ? (0, r.logWarn)("Supplied video cache key was already in use by Prebid Cache; caching attempt was rejected. Video bid must be discarded.") : (s.videoCacheKey = n.uuid, s.vastUrl || (s.vastUrl = (0, a.I)(s.videoCacheKey)), x(o, s), c())
                            }))
                        }))
                    };
                let K, F;
                d.config.getConfig("cache", (e => {
                    K = "number" == typeof e.cache.batchSize && e.cache.batchSize > 0 ? e.cache.batchSize : 1, F = "number" == typeof e.cache.batchTimeout && e.cache.batchTimeout > 0 ? e.cache.batchTimeout : 0
                }));
                const G = function() {
                        let e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : setTimeout,
                            t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : W,
                            n = [
                                []
                            ],
                            r = !1;
                        const i = e => e();
                        return function(o, s, a) {
                            const c = F > 0 ? e : i;
                            n[n.length - 1].length >= K && n.push([]), n[n.length - 1].push({
                                auctionInstance: o,
                                bidResponse: s,
                                afterBidAdded: a
                            }), r || (r = !0, c((() => {
                                n.forEach(t), n = [
                                    []
                                ], r = !1
                            }), F))
                        }
                    }(),
                    L = (0, u.Ok)("async", (function(e, t, n, r) {
                        G(e, t, n)
                    }), "callPrebidCache");

                function V(e, t, n) {
                    if (e && n) {
                        if (e === p.im) {
                            const e = (0, i.c)(t, "".concat(p.im, ".context"), "instream");
                            if (n["".concat(p.im, "-").concat(e)]) return n["".concat(p.im, "-").concat(e)]
                        }
                        return n[e]
                    }
                }
                const z = function(e) {
                        let {
                            index: t = m.M.index
                        } = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
                        const n = V(e.mediaType, t.getMediaTypes(e), d.config.getConfig("mediaTypePriceGranularity"));
                        return "string" == typeof e.mediaType && n ? "string" == typeof n ? n : "custom" : d.config.getConfig("priceGranularity")
                    },
                    H = e => t => {
                        const n = e || z(t);
                        return n === v.F2.CO ? t.pbAg : n === v.F2.K_ ? t.pbDg : n === v.F2.i6 ? t.pbLg : n === v.F2.IF ? t.pbMg : n === v.F2.I9 ? t.pbHg : n === v.F2.K0 ? t.pbCg : void 0
                    },
                    Y = () => e => e.creativeId ? e.creativeId : "",
                    Q = () => e => e.meta && e.meta.advertiserDomains && e.meta.advertiserDomains.length > 0 ? [e.meta.advertiserDomains].flat()[0] : "",
                    J = () => e => e.meta && (e.meta.networkId || e.meta.networkName) ? (0, i.c)(e, "meta.networkName") || (0, i.c)(e, "meta.networkId") : "",
                    $ = () => e => e.meta && e.meta.primaryCatId ? e.meta.primaryCatId : "";

                function X(e, t) {
                    return {
                        key: e,
                        val: "function" == typeof t ? function(e, n) {
                            return t(e, n)
                        } : function(e) {
                            return (0, r.getValue)(e, t)
                        }
                    }
                }

                function Z(e, t) {
                    const n = v.TARGETING_KEYS,
                        o = Object.assign({}, h.m.settingsFor(null));
                    if (o[v.L7.s1] || (o[v.L7.s1] = function() {
                            const e = v.TARGETING_KEYS;
                            return [X(e.BIDDER, "bidderCode"), X(e.AD_ID, "adId"), X(e.PRICE_BUCKET, H()), X(e.SIZE, "size"), X(e.DEAL, "dealId"), X(e.SOURCE, "source"), X(e.FORMAT, "mediaType"), X(e.ADOMAIN, Q()), X(e.ACAT, $()), X(e.DSP, J()), X(e.CRID, Y())]
                        }()), "video" === e) {
                        const e = o[v.L7.s1].slice();
                        if (o[v.L7.s1] = e, [n.UUID, n.CACHE_ID].forEach((t => {
                                void 0 === (0, f.iw)(e, (e => e.key === t)) && e.push(X(t, "videoCacheKey"))
                            })), d.config.getConfig("cache.url") && (!t || !1 !== h.m.get(t, "sendStandardTargeting"))) {
                            const t = (0, r.parseUrl)(d.config.getConfig("cache.url"));
                            void 0 === (0, f.iw)(e, (e => e.key === n.CACHE_HOST)) && e.push(X(n.CACHE_HOST, (function(e) {
                                return (0, i.c)(e, "adserverTargeting.".concat(n.CACHE_HOST)) ? e.adserverTargeting[n.CACHE_HOST] : t.hostname
                            })))
                        }
                    }
                    return o
                }

                function ee(e, t, n, i) {
                    var o = t[v.L7.s1];
                    return n.size = n.getSize(), (o || []).forEach((function(o) {
                        var s = o.key,
                            a = o.val;
                        if (e[s] && (0, r.logWarn)("The key: " + s + " is being overwritten"), (0, r.isFn)(a)) try {
                            a = a(n, i)
                        } catch (e) {
                            (0, r.logError)("bidmanager", "ERROR", e)
                        }(void 0 === t.suppressEmptyKeys || !0 !== t.suppressEmptyKeys) && s !== v.TARGETING_KEYS.DEAL && s !== v.TARGETING_KEYS.ACAT && s !== v.TARGETING_KEYS.DSP && s !== v.TARGETING_KEYS.CRID || !(0, r.isEmptyStr)(a) && null != a ? e[s] = a : (0, r.logInfo)("suppressing empty key '" + s + "' from adserver targeting")
                    })), e
                }

                function te(e, t) {
                    return e[t.adUnitCode] || (e[t.adUnitCode] = {
                        bids: []
                    }), e[t.adUnitCode].bids.push(t), e
                }
            },
            71695: (e, t, n) => {
                n.d(t, {
                    M: () => f
                });
                var r = n(28768),
                    i = n(57120);

                function o(e) {
                    Object.assign(this, {
                        getAuction(t) {
                            let {
                                auctionId: n
                            } = t;
                            if (null != n) return e().find((e => e.getAuctionId() === n))
                        },
                        getAdUnit(t) {
                            let {
                                transactionId: n
                            } = t;
                            if (null != n) return e().flatMap((e => e.getAdUnits())).find((e => e.transactionId === n))
                        },
                        getMediaTypes(e) {
                            let {
                                transactionId: t,
                                requestId: n
                            } = e;
                            if (null != n) {
                                const e = this.getBidRequest({
                                    requestId: n
                                });
                                if (null != e && (null == t || e.transactionId === t)) return e.mediaTypes
                            } else if (null != t) {
                                const e = this.getAdUnit({
                                    transactionId: t
                                });
                                if (null != e) return e.mediaTypes
                            }
                        },
                        getBidderRequest(t) {
                            let {
                                requestId: n,
                                bidderRequestId: r
                            } = t;
                            if (null != n || null != r) {
                                let t = e().flatMap((e => e.getBidRequests()));
                                return null != r && (t = t.filter((e => e.bidderRequestId === r))), null == n ? t[0] : t.find((e => e.bids && null != e.bids.find((e => e.bidId === n))))
                            }
                        },
                        getBidRequest(t) {
                            let {
                                requestId: n
                            } = t;
                            if (null != n) return e().flatMap((e => e.getBidRequests())).flatMap((e => e.bids)).find((e => e && e.bidId === n))
                        }
                    })
                }
                var s = n(16112),
                    a = n(61820),
                    c = n(69677),
                    d = n(91500),
                    l = n(65576);
                const u = "minBidCacheTTL";
                const f = function() {
                    let e = null;
                    const t = (0, c.q)({
                        startTime: e => e.end.then((() => e.getAuctionEnd())),
                        ttl: t => null == e ? null : t.end.then((() => 1e3 * Math.max(e, ...t.getBidsReceived().map(d.o))))
                    });
                    (0, d.W)((() => {
                        null != e && t.refresh()
                    })), l.config.getConfig(u, (n => {
                        const r = e;
                        e = null == n ? void 0 : n[u], e = "number" == typeof e ? e : null, r !== e && t.refresh()
                    }));
                    const n = {};

                    function f(e) {
                        for (const n of t)
                            if (n.getAuctionId() === e) return n
                    }

                    function g() {
                        return t.toArray().flatMap((e => e.getBidsReceived()))
                    }
                    return n.addWinningBid = function(e) {
                        const t = (0, a.hC)(e.metrics);
                        t.checkpoint("bidWon"), t.timeBetween("auctionEnd", "bidWon", "render.pending"), t.timeBetween("requestBids", "bidWon", "render.e2e");
                        const n = f(e.auctionId);
                        n ? (e.status = s.BID_STATUS.RENDERED, n.addWinningBid(e)) : (0, r.logWarn)("Auction not found when adding winning bid")
                    }, Object.entries({
                        getAllWinningBids: {
                            name: "getWinningBids"
                        },
                        getBidsRequested: {
                            name: "getBidRequests"
                        },
                        getNoBids: {},
                        getAdUnits: {},
                        getBidsReceived: {
                            pre: e => e.getAuctionStatus() === i.AJ
                        },
                        getAdUnitCodes: {
                            post: r.uniques
                        }
                    }).forEach((e => {
                        let [r, {
                            name: i = r,
                            pre: o,
                            post: s
                        }] = e;
                        const a = null == o ? e => e[i]() : e => o(e) ? e[i]() : [],
                            c = null == s ? e => e : e => e.filter(s);
                        n[r] = () => c(t.toArray().flatMap(a))
                    })), n.getAllBidsForAdUnitCode = function(e) {
                        return g().filter((t => t && t.adUnitCode === e))
                    }, n.createAuction = function(e) {
                        const n = (0, i.SP)(e);
                        return function(e) {
                            t.add(e)
                        }(n), n
                    }, n.findBidByAdId = function(e) {
                        return g().find((t => t.adId === e))
                    }, n.getStandardBidderAdServerTargeting = function() {
                        return (0, i.AD)()[s.L7.s1]
                    }, n.setStatusForBids = function(e, t) {
                        let r = n.findBidByAdId(e);
                        if (r && (r.status = t), r && t === s.BID_STATUS.W) {
                            const e = f(r.auctionId);
                            e && e.setBidTargeting(r)
                        }
                    }, n.getLastAuctionId = function() {
                        const e = t.toArray();
                        return e.length && e[e.length - 1].getAuctionId()
                    }, n.clearAllAuctions = function() {
                        t.clear()
                    }, n.index = new o((() => t.toArray())), n
                }()
            },
            91500: (e, t, n) => {
                n.d(t, {
                    W: () => c,
                    o: () => a
                });
                var r = n(65576),
                    i = n(28768);
                let o = 1;
                const s = [];

                function a(e) {
                    return e.ttl - (e.hasOwnProperty("ttlBuffer") ? e.ttlBuffer : o)
                }

                function c(e) {
                    s.push(e)
                }
                r.config.getConfig("ttlBuffer", (e => {
                    if ("number" == typeof e.ttlBuffer) {
                        const t = o;
                        o = e.ttlBuffer, t !== o && s.forEach((e => e(o)))
                    } else(0, i.logError)("Invalid value for ttlBuffer", e.ttlBuffer)
                }))
            },
            16923: (e, t, n) => {
                n.d(t, {
                    m: () => u
                });
                var r = n(52420),
                    i = n(28768),
                    o = n(48176),
                    s = n(16112);

                function a(e, t) {
                    ! function(e, t) {
                        if (t.has(e)) throw new TypeError("Cannot initialize the same private elements twice on an object")
                    }(e, t), t.add(e)
                }

                function c(e, t, n) {
                    if (!t.has(e)) throw new TypeError("attempted to get private field on non-instance");
                    return n
                }
                var d = new WeakSet;

                function l(e) {
                    return null == e ? this.defaultScope : e
                }
                const u = new class {
                    constructor(e, t) {
                        a(this, d), this.getSettings = e, this.defaultScope = t
                    }
                    get(e, t) {
                        let n = this.getOwn(e, t);
                        return void 0 === n && (n = this.getOwn(null, t)), n
                    }
                    getOwn(e, t) {
                        return e = c(this, d, l).call(this, e), (0, r.c)(this.getSettings(), "".concat(e, ".").concat(t))
                    }
                    getScopes() {
                        return Object.keys(this.getSettings()).filter((e => e !== this.defaultScope))
                    }
                    settingsFor(e) {
                        return (0, i.mergeDeep)({}, this.ownSettingsFor(null), this.ownSettingsFor(e))
                    }
                    ownSettingsFor(e) {
                        return e = c(this, d, l).call(this, e), this.getSettings()[e] || {}
                    }
                }((() => (0, o.A)().bidderSettings || {}), s.L7.e4)
            },
            17580: (e, t, n) => {
                n.d(t, {
                    g: () => o
                });
                var r = n(28768);

                function i(e) {
                    let {
                        src: t = "client",
                        bidder: n = "",
                        bidId: i,
                        transactionId: o,
                        auctionId: s
                    } = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
                    var a = t,
                        c = e || 0;
                    this.bidderCode = n, this.width = 0, this.height = 0, this.statusMessage = function() {
                        switch (c) {
                            case 0:
                                return "Pending";
                            case 1:
                                return "Bid available";
                            case 2:
                                return "Bid returned empty or error response";
                            case 3:
                                return "Bid timed out"
                        }
                    }(), this.adId = (0, r.getUniqueIdentifierStr)(), this.requestId = i, this.transactionId = o, this.auctionId = s, this.mediaType = "banner", this.source = a, this.getStatusCode = function() {
                        return c
                    }, this.getSize = function() {
                        return this.width + "x" + this.height
                    }, this.getIdentifiers = function() {
                        return {
                            src: this.source,
                            bidder: this.bidderCode,
                            bidId: this.requestId,
                            transactionId: this.transactionId,
                            auctionId: this.auctionId
                        }
                    }
                }

                function o(e, t) {
                    return new i(e, t)
                }
            },
            65576: (e, t, n) => {
                n.d(t, {
                    Q: () => d,
                    config: () => g
                });
                var r = n(25928),
                    i = n(11636),
                    o = n(28768),
                    s = n(52420),
                    a = n(16112);
                const c = "TRUE" === (0, o.getParameterByName)(a.Mj).toUpperCase(),
                    d = "random",
                    l = {};
                l[d] = !0, l.fixed = !0;
                const u = d,
                    f = {
                        LOW: "low",
                        MEDIUM: "medium",
                        HIGH: "high",
                        AUTO: "auto",
                        DENSE: "dense",
                        CUSTOM: "custom"
                    };
                const g = function() {
                    let e, t, n, a = [],
                        d = null;

                    function g() {
                        function s(e) {
                            return d[e].val
                        }

                        function a(e, t) {
                            d[e].val = t
                        }
                        e = {};
                        const d = {
                            publisherDomain: {
                                set(e) {
                                    null != e && (0, o.logWarn)("publisherDomain is deprecated and has no effect since v7 - use pageUrl instead"), a("publisherDomain", e)
                                }
                            },
                            priceGranularity: {
                                val: f.MEDIUM,
                                set(e) {
                                    m(e) && ("string" == typeof e ? a("priceGranularity", p(e) ? e : f.MEDIUM) : (0, o.isPlainObject)(e) && (a("customPriceBucket", e), a("priceGranularity", f.CUSTOM), (0, o.logMessage)("Using custom price granularity")))
                                }
                            },
                            customPriceBucket: {
                                val: {},
                                set() {}
                            },
                            mediaTypePriceGranularity: {
                                val: {},
                                set(e) {
                                    null != e && a("mediaTypePriceGranularity", Object.keys(e).reduce(((t, n) => (m(e[n]) ? "string" == typeof e ? t[n] = p(e[n]) ? e[n] : s("priceGranularity") : (0, o.isPlainObject)(e) && (t[n] = e[n], (0, o.logMessage)("Using custom price granularity for ".concat(n))) : (0, o.logWarn)("Invalid price granularity for media type: ".concat(n)), t)), {}))
                                }
                            },
                            bidderSequence: {
                                val: u,
                                set(e) {
                                    l[e] ? a("bidderSequence", e) : (0, o.logWarn)("Invalid order: ".concat(e, ". Bidder Sequence was not set."))
                                }
                            },
                            auctionOptions: {
                                val: {},
                                set(e) {
                                    (function(e) {
                                        if (!(0, o.isPlainObject)(e)) return (0, o.logWarn)("Auction Options must be an object"), !1;
                                        for (let t of Object.keys(e)) {
                                            if ("secondaryBidders" !== t && "suppressStaleRender" !== t) return (0, o.logWarn)("Auction Options given an incorrect param: ".concat(t)), !1;
                                            if ("secondaryBidders" === t) {
                                                if (!(0, o.isArray)(e[t])) return (0, o.logWarn)("Auction Options ".concat(t, " must be of type Array")), !1;
                                                if (!e[t].every(o.isStr)) return (0, o.logWarn)("Auction Options ".concat(t, " must be only string")), !1
                                            } else if ("suppressStaleRender" === t && !(0, o.isBoolean)(e[t])) return (0, o.logWarn)("Auction Options ".concat(t, " must be of type boolean")), !1
                                        }
                                        return !0
                                    })(e) && a("auctionOptions", e)
                                }
                            }
                        };
                        let g = {
                            debug: c,
                            bidderTimeout: 3e3,
                            enableSendAllBids: true,
                            useBidCache: false,
                            deviceAccess: true,
                            timeoutBuffer: 400,
                            disableAjaxTimeout: false,
                            maxNestedIframes: 10
                        };

                        function p(e) {
                            return (0, i.iw)(Object.keys(f), (t => e === f[t]))
                        }

                        function m(e) {
                            if (!e) return (0, o.logError)("Prebid Error: no value passed to `setPriceGranularity()`"), !1;
                            if ("string" == typeof e) p(e) || (0, o.logWarn)("Prebid Warning: setPriceGranularity was called with invalid setting, using `medium` as default.");
                            else if ((0, o.isPlainObject)(e) && !(0, r.Y)(e)) return (0, o.logError)("Invalid custom price value passed to `setPriceGranularity()`"), !1;
                            return !0
                        }
                        Object.defineProperties(g, Object.fromEntries(Object.entries(d).map((e => {
                            let [t, n] = e;
                            return [t, Object.assign({
                                get: s.bind(null, t),
                                set: a.bind(null, t),
                                enumerable: !0
                            }, n)]
                        })))), t && w(Object.keys(t).reduce(((e, n) => (t[n] !== g[n] && (e[n] = g[n] || {}), e)), {})), t = g, n = {}
                    }

                    function p() {
                        if (d && n && (0, o.isPlainObject)(n[d])) {
                            let e = n[d];
                            const r = new Set(Object.keys(t).concat(Object.keys(e)));
                            return (0, i.A5)(r).reduce(((n, r) => (void 0 === e[r] ? n[r] = t[r] : void 0 === t[r] ? n[r] = e[r] : (0, o.isPlainObject)(e[r]) ? n[r] = (0, o.mergeDeep)({}, t[r], e[r]) : n[r] = e[r], n)), {})
                        }
                        return Object.assign({}, t)
                    }
                    const [m, h] = [p, function() {
                        const e = p();
                        return Object.defineProperty(e, "ortb2", {
                            get: function() {
                                throw new Error("invalid access to 'orbt2' config - use request parameters instead")
                            }
                        }), e
                    }].map((e => function() {
                        if (arguments.length <= 1 && "function" != typeof(arguments.length <= 0 ? void 0 : arguments[0])) {
                            const t = arguments.length <= 0 ? void 0 : arguments[0];
                            return t ? (0, s.c)(e(), t) : p()
                        }
                        return E(...arguments)
                    })), [b, y] = [h, m].map((e => function() {
                        let t = e(...arguments);
                        return t && "object" == typeof t && (t = (0, o.deepClone)(t)), t
                    }));

                    function v(n) {
                        if (!(0, o.isPlainObject)(n)) return void(0, o.logError)("setConfig options must be an object");
                        let r = Object.keys(n),
                            i = {};
                        r.forEach((r => {
                            let s = n[r];
                            (0, o.isPlainObject)(e[r]) && (0, o.isPlainObject)(s) && (s = Object.assign({}, e[r], s));
                            try {
                                i[r] = t[r] = s
                            } catch (e) {
                                (0, o.logWarn)("Cannot set config for property ".concat(r, " : "), e)
                            }
                        })), w(i)
                    }

                    function E(e, t) {
                        let n = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {},
                            r = t;
                        if ("string" != typeof e && (r = e, e = "*", n = t || {}), "function" != typeof r) return void(0, o.logError)("listener must be a function");
                        const i = {
                            topic: e,
                            callback: r
                        };
                        return a.push(i), n.init && r("*" === e ? h() : {
                                [e]: h(e)
                            }),
                            function() {
                                a.splice(a.indexOf(i), 1)
                            }
                    }

                    function w(e) {
                        const t = Object.keys(e);
                        a.filter((e => (0, i.KM)(t, e.topic))).forEach((t => {
                            t.callback({
                                [t.topic]: e[t.topic]
                            })
                        })), a.filter((e => "*" === e.topic)).forEach((t => t.callback(e)))
                    }

                    function T(e) {
                        let t = arguments.length > 1 && void 0 !== arguments[1] && arguments[1];
                        try {
                            ! function(e) {
                                if (!(0, o.isPlainObject)(e)) throw "setBidderConfig bidder options must be an object";
                                if (!Array.isArray(e.bidders) || !e.bidders.length) throw "setBidderConfig bidder options must contain a bidders list with at least 1 bidder";
                                if (!(0, o.isPlainObject)(e.config)) throw "setBidderConfig bidder options must contain a config object"
                            }(e), e.bidders.forEach((r => {
                                n[r] || (n[r] = {}), Object.keys(e.config).forEach((i => {
                                    let s = e.config[i];
                                    if ((0, o.isPlainObject)(s)) {
                                        const e = t ? o.mergeDeep : Object.assign;
                                        n[r][i] = e({}, n[r][i] || {}, s)
                                    } else n[r][i] = s
                                }))
                            }))
                        } catch (e) {
                            (0, o.logError)(e)
                        }
                    }

                    function A(e, t) {
                        d = e;
                        try {
                            return t()
                        } finally {
                            C()
                        }
                    }

                    function C() {
                        d = null
                    }
                    return g(), {
                        getCurrentBidder: function() {
                            return d
                        },
                        resetBidder: C,
                        getConfig: h,
                        getAnyConfig: m,
                        readConfig: b,
                        readAnyConfig: y,
                        setConfig: v,
                        mergeConfig: function(e) {
                            if (!(0, o.isPlainObject)(e)) return void(0, o.logError)("mergeConfig input must be an object");
                            const t = (0, o.mergeDeep)(p(), e);
                            return v({
                                ...t
                            }), t
                        },
                        setDefaults: function(n) {
                            (0, o.isPlainObject)(e) ? (Object.assign(e, n), Object.assign(t, n)) : (0, o.logError)("defaults must be an object")
                        },
                        resetConfig: g,
                        runWithBidder: A,
                        callbackWithBidder: function(e) {
                            return function(t) {
                                return function() {
                                    if ("function" == typeof t) {
                                        for (var n = arguments.length, r = new Array(n), i = 0; i < n; i++) r[i] = arguments[i];
                                        return A(e, t.bind(this, ...r))
                                    }(0, o.logWarn)("config.callbackWithBidder callback is not a function")
                                }
                            }
                        },
                        setBidderConfig: T,
                        getBidderConfig: function() {
                            return n
                        },
                        mergeBidderConfig: function(e) {
                            return T(e, !0)
                        }
                    }
                }()
            },
            47356: (e, t, n) => {
                n.d(t, {
                    Gq: () => A,
                    S_: () => I,
                    U$: () => C,
                    Yf: () => g,
                    _i: () => f,
                    iy: () => B,
                    wv: () => k,
                    yM: () => S
                });
                var r = n(68376),
                    i = n(43484),
                    o = n(22796),
                    s = n(28768),
                    a = n(86576),
                    c = n(65576);

                function d(e, t, n) {
                    l(e, t), t.set(e, n)
                }

                function l(e, t) {
                    if (t.has(e)) throw new TypeError("Cannot initialize the same private elements twice on an object")
                }

                function u(e, t, n) {
                    if (!t.has(e)) throw new TypeError("attempted to get private field on non-instance");
                    return n
                }
                const f = Object.freeze({}),
                    g = Object.freeze({});
                var p = new WeakMap,
                    m = new WeakMap,
                    h = new WeakMap,
                    b = new WeakMap,
                    y = new WeakMap,
                    v = new WeakMap,
                    E = new WeakSet;
                class w {
                    constructor() {
                        var e, t;
                        l(e = this, t = E), t.add(e), d(this, p, {
                            writable: !0,
                            value: void 0
                        }), d(this, m, {
                            writable: !0,
                            value: void 0
                        }), d(this, h, {
                            writable: !0,
                            value: void 0
                        }), d(this, b, {
                            writable: !0,
                            value: void 0
                        }), d(this, y, {
                            writable: !0,
                            value: !0
                        }), d(this, v, {
                            writable: !0,
                            value: void 0
                        }), (0, r.c)(this, "generatedTime", void 0), (0, r.c)(this, "hashFields", void 0), this.reset()
                    }
                    reset() {
                        (0, o.c)(this, h, (0, a.Q)()), (0, o.c)(this, p, !1), (0, o.c)(this, m, null), (0, o.c)(this, b, !1), this.generatedTime = null
                    }
                    enable() {
                        (0, o.c)(this, p, !0)
                    }
                    get enabled() {
                        return (0, i.c)(this, p)
                    }
                    get ready() {
                        return (0, i.c)(this, b)
                    }
                    get promise() {
                        return (0, i.c)(this, b) ? a.i.resolve((0, i.c)(this, m)) : ((0, i.c)(this, p) || u(this, E, T).call(this, null), (0, i.c)(this, h).promise)
                    }
                    setConsentData(e) {
                        let t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : (0, s.timestamp)();
                        this.generatedTime = t, (0, o.c)(this, y, !0), u(this, E, T).call(this, e)
                    }
                    getConsentData() {
                        return (0, i.c)(this, m)
                    }
                    get hash() {
                        return (0, i.c)(this, y) && ((0, o.c)(this, v, (0, s.cyrb53Hash)(JSON.stringify((0, i.c)(this, m) && this.hashFields ? this.hashFields.map((e => (0, i.c)(this, m)[e])) : (0, i.c)(this, m)))), (0, o.c)(this, y, !1)), (0, i.c)(this, v)
                    }
                }

                function T(e) {
                    (0, o.c)(this, b, !0), (0, o.c)(this, m, e), (0, i.c)(this, h).resolve(e)
                }
                const A = new class extends w {
                        constructor() {
                            super(...arguments), (0, r.c)(this, "hashFields", ["gdprApplies", "consentString"])
                        }
                        getConsentMeta() {
                            const e = this.getConsentData();
                            if (e && e.vendorData && this.generatedTime) return {
                                gdprApplies: e.gdprApplies,
                                consentStringSize: (0, s.isStr)(e.vendorData.tcString) ? e.vendorData.tcString.length : 0,
                                generatedAt: this.generatedTime,
                                apiVersion: e.apiVersion
                            }
                        }
                    },
                    C = new class extends w {
                        getConsentMeta() {
                            const e = this.getConsentData();
                            if (e && this.generatedTime) return {
                                usp: e,
                                generatedAt: this.generatedTime
                            }
                        }
                    },
                    I = new class extends w {
                        constructor() {
                            super(...arguments), (0, r.c)(this, "hashFields", ["applicableSections", "gppString"])
                        }
                        getConsentMeta() {
                            if (this.getConsentData() && this.generatedTime) return {
                                generatedAt: this.generatedTime
                            }
                        }
                    },
                    S = (() => {
                        function e() {
                            return !!c.config.getConfig("coppa")
                        }
                        return {
                            getCoppa: e,
                            getConsentData: e,
                            getConsentMeta: e,
                            reset() {},
                            get promise() {
                                return a.i.resolve(e())
                            },
                            get hash() {
                                return e() ? "1" : "0"
                            }
                        }
                    })(),
                    k = function() {
                        const e = {},
                            t = {},
                            n = {};
                        return {
                            register(r, i, o) {
                                o && ((e[i] = e[i] || {})[r] = o, t.hasOwnProperty(i) ? t[i] !== o && (t[i] = n) : t[i] = o)
                            },
                            get(r) {
                                const i = {
                                    modules: e[r] || {}
                                };
                                return t.hasOwnProperty(r) && t[r] !== n && (i.gvlid = t[r]), i
                            }
                        }
                    }(),
                    O = {
                        gdpr: A,
                        usp: C,
                        gpp: I,
                        coppa: S
                    };
                const B = function() {
                    let e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : O;
                    return e = Object.entries(e), Object.assign({
                        get promise() {
                            return a.i.all(e.map((e => {
                                let [t, n] = e;
                                return n.promise.then((e => [t, e]))
                            }))).then((e => Object.fromEntries(e)))
                        },
                        get hash() {
                            return (0, s.cyrb53Hash)(e.map((e => {
                                let [t, n] = e;
                                return n.hash
                            })).join(":"))
                        }
                    }, Object.fromEntries(["getConsentData", "getConsentMeta", "reset"].map((t => {
                        return [t, (n = t, function() {
                            return Object.fromEntries(e.map((e => {
                                let [t, r] = e;
                                return [t, r[n]()]
                            })))
                        })];
                        var n
                    }))))
                }()
            },
            25928: (e, t, n) => {
                n.d(t, {
                    Y: () => p,
                    k: () => f
                });
                var r = n(11636),
                    i = n(28768),
                    o = n(65576);
                const s = 2,
                    a = {
                        buckets: [{
                            max: 5,
                            increment: .5
                        }]
                    },
                    c = {
                        buckets: [{
                            max: 20,
                            increment: .1
                        }]
                    },
                    d = {
                        buckets: [{
                            max: 20,
                            increment: .01
                        }]
                    },
                    l = {
                        buckets: [{
                            max: 3,
                            increment: .01
                        }, {
                            max: 8,
                            increment: .05
                        }, {
                            max: 20,
                            increment: .5
                        }]
                    },
                    u = {
                        buckets: [{
                            max: 5,
                            increment: .05
                        }, {
                            max: 10,
                            increment: .1
                        }, {
                            max: 20,
                            increment: .5
                        }]
                    };

                function f(e, t) {
                    let n = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : 1,
                        r = parseFloat(e);
                    return isNaN(r) && (r = ""), {
                        low: "" === r ? "" : g(e, a, n),
                        med: "" === r ? "" : g(e, c, n),
                        high: "" === r ? "" : g(e, d, n),
                        auto: "" === r ? "" : g(e, u, n),
                        dense: "" === r ? "" : g(e, l, n),
                        custom: "" === r ? "" : g(e, t, n)
                    }
                }

                function g(e, t, n) {
                    let a = "";
                    if (!p(t)) return a;
                    const c = t.buckets.reduce(((e, t) => e.max > t.max ? e : t), {
                        max: 0
                    });
                    let d = 0,
                        l = (0, r.iw)(t.buckets, (t => {
                            if (e > c.max * n) {
                                let e = t.precision;
                                void 0 === e && (e = s), a = (t.max * n).toFixed(e)
                            } else {
                                if (e <= t.max * n && e >= d * n) return t.min = d, t;
                                d = t.max
                            }
                        }));
                    return l && (a = function(e, t, n) {
                        const r = void 0 !== t.precision ? t.precision : s,
                            a = t.increment * n,
                            c = t.min * n;
                        let d = Math.floor,
                            l = o.config.getConfig("cpmRoundingFunction");
                        "function" == typeof l && (d = l);
                        let u, f, g = Math.pow(10, r + 2),
                            p = (e * g - c * g) / (a * g);
                        try {
                            u = d(p) * a + c
                        } catch (e) {
                            f = !0
                        }(f || "number" != typeof u) && ((0, i.logWarn)("Invalid rounding function passed in config"), u = Math.floor(p) * a + c);
                        return u = Number(u.toFixed(10)), u.toFixed(r)
                    }(e, l, n)), a
                }

                function p(e) {
                    if ((0, i.isEmpty)(e) || !e.buckets || !Array.isArray(e.buckets)) return !1;
                    let t = !0;
                    return e.buckets.forEach((e => {
                        e.max && e.increment || (t = !1)
                    })), t
                }
            },
            89724: (e, t, n) => {
                n.d(t, {
                    A5: () => l,
                    uB: () => m
                });
                var r = n(65576),
                    i = n(74712),
                    o = n(48176),
                    s = n(28768),
                    a = n(17580),
                    c = n(39024),
                    d = n(86576);
                const l = "__owpbjs_debugging__";

                function u() {
                    return (0, o.A)().installedModules.includes("debugging")
                }

                function f(e) {
                    return new d.i((t => {
                        (0, c.M)(e, "debugging", t)
                    }))
                }

                function g() {
                    let {
                        alreadyInstalled: e = u,
                        script: t = f
                    } = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}, n = null;
                    return function() {
                        return null == n && (n = new d.i(((n, c) => {
                            setTimeout((() => {
                                if (e()) n();
                                else {
                                    const e = "https://cdn.jsdelivr.net/npm/prebid.js@8.30.0/dist/debugging-standalone.js";
                                    (0, s.logMessage)('Debugging module not installed, loading it from "'.concat(e, '"...')), (0, o.A)()._installDebugging = !0, t(e).then((() => {
                                        (0, o.A)()._installDebugging({
                                            DEBUG_KEY: l,
                                            hook: i.Ok,
                                            config: r.config,
                                            createBid: a.g,
                                            logger: (0, s.prefixLog)("DEBUG:")
                                        })
                                    })).then(n, c)
                                }
                            }))
                        }))), n
                    }
                }
                const p = function() {
                    let {
                        load: e = g(),
                        hook: t = (0, i.E$)("requestBids")
                    } = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}, n = null, r = !1;

                    function o(e) {
                        for (var t = arguments.length, r = new Array(t > 1 ? t - 1 : 0), i = 1; i < t; i++) r[i - 1] = arguments[i];
                        return (n || d.i.resolve()).then((() => e.apply(this, r)))
                    }

                    function s() {
                        t.getHooks({
                            hook: o
                        }).remove(), r = !1
                    }
                    return {
                        enable: function() {
                            r || (n = e(), t.before(o, 99), r = !0)
                        },
                        disable: s,
                        reset: function() {
                            n = null, s()
                        }
                    }
                }();
                p.reset;

                function m() {
                    let e = null;
                    try {
                        e = window.sessionStorage
                    } catch (e) {}
                    if (null !== e) {
                        let t = p,
                            n = null;
                        try {
                            n = e.getItem(l)
                        } catch (e) {}
                        null !== n && t.enable()
                    }
                }
                r.config.getConfig("debugging", (function(e) {
                    let {
                        debugging: t
                    } = e;
                    null != t && t.enabled ? p.enable() : p.disable()
                }))
            },
            1276: (e, t, n) => {
                n.r(t), n.d(t, {
                    addEvents: () => E,
                    clearEvents: () => T,
                    emit: () => v,
                    get: () => b,
                    getEvents: () => y,
                    has: () => w,
                    off: () => h,
                    on: () => m
                });
                var r = n(28768),
                    i = n(16112),
                    o = n(69677),
                    s = n(65576);
                const a = "eventHistoryTTL";
                let c = null;
                const d = (0, o.q)({
                    monotonic: !0,
                    ttl: () => c
                });
                s.config.getConfig(a, (e => {
                    var t;
                    const n = c;
                    e = null === (t = e) || void 0 === t ? void 0 : t[a], c = "number" == typeof e ? 1e3 * e : null, n !== c && d.refresh()
                }));
                let l = Array.prototype.slice,
                    u = Array.prototype.push,
                    f = Object.values(i.EVENTS);
                const g = i.$X,
                    p = function() {
                        let e = {},
                            t = {};

                        function n(e) {
                            return f.includes(e)
                        }
                        return t.has = n, t.on = function(t, i, o) {
                            if (n(t)) {
                                let n = e[t] || {
                                    que: []
                                };
                                o ? (n[o] = n[o] || {
                                    que: []
                                }, n[o].que.push(i)) : n.que.push(i), e[t] = n
                            } else r.logError("Wrong event name : " + t + " Valid event names :" + f)
                        }, t.emit = function(t) {
                            ! function(t, n) {
                                r.logMessage("Emitting event for: " + t);
                                let i = n[0] || {},
                                    o = i[g[t]],
                                    s = e[t] || {
                                        que: []
                                    };
                                var a = Object.keys(s);
                                let c = [];
                                d.add({
                                    eventType: t,
                                    args: i,
                                    id: o,
                                    elapsedTime: r.getPerformanceNow()
                                }), o && a.includes(o) && u.apply(c, s[o].que), u.apply(c, s.que), (c || []).forEach((function(e) {
                                    if (e) try {
                                        e.apply(null, n)
                                    } catch (e) {
                                        r.logError("Error executing handler:", "events.js", e, t)
                                    }
                                }))
                            }(t, l.call(arguments, 1))
                        }, t.off = function(t, n, i) {
                            let o = e[t];
                            r.isEmpty(o) || r.isEmpty(o.que) && r.isEmpty(o[i]) || i && (r.isEmpty(o[i]) || r.isEmpty(o[i].que)) || (i ? (o[i].que || []).forEach((function(e) {
                                let t = o[i].que;
                                e === n && t.splice(t.indexOf(e), 1)
                            })) : (o.que || []).forEach((function(e) {
                                let t = o.que;
                                e === n && t.splice(t.indexOf(e), 1)
                            })), e[t] = o)
                        }, t.get = function() {
                            return e
                        }, t.addEvents = function(e) {
                            f = f.concat(e)
                        }, t.getEvents = function() {
                            return d.toArray().map((e => Object.assign({}, e)))
                        }, t
                    }();
                r._setEventEmitter(p.emit.bind(p));
                const {
                    on: m,
                    off: h,
                    get: b,
                    getEvents: y,
                    emit: v,
                    addEvents: E,
                    has: w
                } = p;

                function T() {
                    d.clear()
                }
            },
            47588: (e, t, n) => {
                n.d(t, {
                    e: () => T
                });
                var r = n(74712),
                    i = n(94228),
                    o = n(42696),
                    s = n(28768),
                    a = n(79344),
                    c = n(65576),
                    d = n(86576);
                const l = ["architecture", "bitness", "model", "platformVersion", "fullVersionList"],
                    u = ["brands", "mobile", "platform"],
                    f = function() {
                        var e;
                        let t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : null === (e = window.navigator) || void 0 === e ? void 0 : e.userAgentData;
                        const n = t && u.some((e => void 0 !== t[e])) ? Object.freeze(p(1, t)) : null;
                        return function() {
                            return n
                        }
                    }(),
                    g = function() {
                        var e;
                        let t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : null === (e = window.navigator) || void 0 === e ? void 0 : e.userAgentData;
                        const n = {},
                            r = new WeakMap;
                        return function() {
                            let e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : l;
                            if (!r.has(e)) {
                                const t = Array.from(e);
                                t.sort(), r.set(e, t.join("|"))
                            }
                            const i = r.get(e);
                            if (!n.hasOwnProperty(i)) try {
                                n[i] = t.getHighEntropyValues(e).then((e => (0, s.isEmpty)(e) ? null : Object.freeze(p(2, e)))).catch((() => null))
                            } catch (e) {
                                n[i] = d.i.resolve(null)
                            }
                            return n[i]
                        }
                    }();

                function p(e, t) {
                    function n(e, t) {
                        const n = {
                            brand: e
                        };
                        return (0, s.isStr)(t) && !(0, s.isEmptyStr)(t) && (n.version = t.split(".")), n
                    }
                    const r = {
                        source: e
                    };
                    return t.platform && (r.platform = n(t.platform, t.platformVersion)), (t.fullVersionList || t.brands) && (r.browsers = (t.fullVersionList || t.brands).map((e => {
                        let {
                            brand: t,
                            version: r
                        } = e;
                        return n(t, r)
                    }))), void 0 !== t.mobile && (r.mobile = t.mobile ? 1 : 0), ["model", "bitness", "architecture"].forEach((e => {
                        const n = t[e];
                        (0, s.isStr)(n) && (r[e] = n)
                    })), r
                }
                var m = n(6848),
                    h = n(53260),
                    b = n(88176),
                    y = n(95960),
                    v = n(39824);
                const E = {
                        getRefererInfo: i.CS,
                        findRootDomain: o.e,
                        getWindowTop: s.getWindowTop,
                        getWindowSelf: s.getWindowSelf,
                        getHighEntropySUA: g,
                        getLowEntropySUA: f
                    },
                    w = (0, m.OP)("FPD"),
                    T = (0, r.Ok)("sync", (e => {
                        const t = [e, C().catch((() => null)), d.i.resolve("cookieDeprecationLabel" in navigator && (0, h.ic)(y.Y$, (0, b.Q)(v.AF, "cdep")) && navigator.cookieDeprecationLabel.getValue()).catch((() => null))];
                        return d.i.all(t).then((e => {
                            let [t, n, r] = e;
                            const i = E.getRefererInfo();
                            if (function(e) {
                                    ["app", "site", "device"].forEach((t => {
                                        const n = c.config.getConfig(t);
                                        null != n && (e[t] = (0, s.mergeDeep)({}, n, e[t]))
                                    }))
                                }(t), Object.entries(S).forEach((e => {
                                    let [n, r] = e;
                                    const o = r(t, i);
                                    o && Object.keys(o).length > 0 && (t[n] = (0, s.mergeDeep)({}, o, t[n]))
                                })), n && (0, a.e)(t, "device.sua", Object.assign({}, n, t.device.sua)), r) {
                                const e = {
                                    cdep: r
                                };
                                (0, a.e)(t, "device.ext", Object.assign({}, e, t.device.ext))
                            }
                            t = w(t);
                            for (let e of m.C4)
                                if ((0, m._c)(t, e)) {
                                    t[e] = (0, s.mergeDeep)({}, k(t, i), t[e]);
                                    break
                                } return t
                        }))
                    }));

                function A(e) {
                    try {
                        return e(E.getWindowTop())
                    } catch (t) {
                        return e(E.getWindowSelf())
                    }
                }

                function C() {
                    const e = c.config.getConfig("firstPartyData.uaHints");
                    return Array.isArray(e) && 0 !== e.length ? E.getHighEntropySUA(e) : d.i.resolve(E.getLowEntropySUA())
                }

                function I(e) {
                    return (0, s.getDefinedParams)(e, Object.keys(e))
                }
                const S = {
                    site(e, t) {
                        if (!m.C4.filter((e => "site" !== e)).some(m._c.bind(null, e))) return I({
                            page: t.page,
                            ref: t.ref
                        })
                    },
                    device: () => A((e => ({
                        w: e.innerWidth || e.document.documentElement.clientWidth || e.document.body.clientWidth,
                        h: e.innerHeight || e.document.documentElement.clientHeight || e.document.body.clientHeight,
                        dnt: (0, s.getDNT)() ? 1 : 0,
                        ua: e.navigator.userAgent,
                        language: e.navigator.language.split("-").shift()
                    }))),
                    regs() {
                        const e = {};
                        A((e => e.navigator.globalPrivacyControl)) && (0, a.e)(e, "ext.gpc", 1);
                        const t = c.config.getConfig("coppa");
                        return "boolean" == typeof t && (e.coppa = t ? 1 : 0), e
                    }
                };

                function k(e, t) {
                    var n, r;
                    const o = (0, i.Y$)(t.page, {
                        noLeadingWww: !0
                    });
                    return I({
                        domain: o,
                        keywords: null === (n = A((e => e.document.querySelector("meta[name='keywords']")))) || void 0 === n || null === (n = n.content) || void 0 === n || null === (r = n.replace) || void 0 === r ? void 0 : r.call(n, /\s/g, ""),
                        publisher: I({
                            domain: E.findRootDomain(o)
                        })
                    })
                }
            },
            6848: (e, t, n) => {
                n.d(t, {
                    C4: () => i,
                    OP: () => o,
                    _c: () => s
                });
                var r = n(28768);
                const i = ["dooh", "app", "site"];

                function o(e) {
                    return function(t) {
                        return i.reduce(((n, i) => (s(t, i) && (null != n ? ((0, r.logWarn)("".concat(e, " specifies both '").concat(n, "' and '").concat(i, "'; dropping the latter.")), delete t[i]) : n = i), n)), null), t
                    }
                }

                function s(e, t) {
                    return null != e[t] && Object.keys(e[t]).length > 0
                }
            },
            42696: (e, t, n) => {
                n.d(t, {
                    e: () => o
                });
                var r = n(28768);
                const i = (0, n(97200).w$)("fpdEnrichment"),
                    o = (0, r.memoize)((function() {
                        let e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : window.location.host;
                        if (!i.cookiesAreEnabled()) return e;
                        const t = e.split(".");
                        if (2 === t.length) return e;
                        let n, o, s = -2;
                        const a = "_rdc".concat(Date.now()),
                            c = "writeable";
                        do {
                            n = t.slice(s).join(".");
                            let e = new Date((0, r.timestamp)() + 1e4).toUTCString();
                            i.setCookie(a, c, e, "Lax", n, void 0);
                            i.getCookie(a, void 0) === c ? (o = !1, i.setCookie(a, "", "Thu, 01 Jan 1970 00:00:01 GMT", void 0, n, void 0)) : (s += -1, o = Math.abs(s) <= t.length)
                        } while (o);
                        return n
                    }))
            },
            74712: (e, t, n) => {
                n.d(t, {
                    C4: () => p,
                    E$: () => d,
                    GU: () => l,
                    OS: () => g,
                    Ok: () => s,
                    mO: () => f,
                    oh: () => c
                });
                var r = n(10324),
                    i = n.n(r),
                    o = n(86576);
                let s = i()({
                    useProxy: !1,
                    ready: i().SYNC | i().ASYNC | i().QUEUE
                });
                const a = (0, o.Q)();
                s.ready = (() => {
                    const e = s.ready;
                    return function() {
                        try {
                            return e.apply(s, arguments)
                        } finally {
                            a.resolve()
                        }
                    }
                })();
                const c = a.promise,
                    d = s.get;

                function l(e, t) {
                    let n = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : 15;
                    0 === e.getHooks({
                        hook: t
                    }).length && e.before(t, n)
                }
                const u = {};

                function f(e, t) {
                    let {
                        postInstallAllowed: n = !1
                    } = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {};
                    s("async", (function(r) {
                        r.forEach((e => t(...e))), n && (u[e] = t)
                    }), e)([])
                }

                function g(e) {
                    for (var t = arguments.length, n = new Array(t > 1 ? t - 1 : 0), r = 1; r < t; r++) n[r - 1] = arguments[r];
                    const i = u[e];
                    if (i) return i(...n);
                    d(e).before(((e, t) => {
                        t.push(n), e(t)
                    }))
                }

                function p(e, t) {
                    return Object.defineProperties(t, Object.fromEntries(["before", "after", "getHooks", "removeAll"].map((t => [t, {
                        get: () => e[t]
                    }])))), t
                }
            },
            48636: (e, t, n) => {
                n.d(t, {
                    So: () => s,
                    W4: () => o,
                    im: () => i,
                    sl: () => r
                });
                const r = "native",
                    i = "video",
                    o = "banner",
                    s = "adpod"
            },
            68332: (e, t, n) => {
                n.d(t, {
                    $s: () => q,
                    AB: () => T,
                    Cs: () => I,
                    IX: () => S,
                    M1: () => C,
                    Md: () => U,
                    __: () => d,
                    cz: () => D,
                    kP: () => B,
                    mG: () => l
                });
                var r = n(52420),
                    i = n(28768),
                    o = n(11636),
                    s = n(71695),
                    a = n(16112),
                    c = n(48636);
                const d = [],
                    l = Object.keys(a.NATIVE_KEYS).map((e => a.NATIVE_KEYS[e])),
                    u = {
                        image: {
                            ortb: {
                                ver: "1.2",
                                assets: [{
                                    required: 1,
                                    id: 1,
                                    img: {
                                        type: 3,
                                        wmin: 100,
                                        hmin: 100
                                    }
                                }, {
                                    required: 1,
                                    id: 2,
                                    title: {
                                        len: 140
                                    }
                                }, {
                                    required: 1,
                                    id: 3,
                                    data: {
                                        type: 1
                                    }
                                }, {
                                    required: 0,
                                    id: 4,
                                    data: {
                                        type: 2
                                    }
                                }, {
                                    required: 0,
                                    id: 5,
                                    img: {
                                        type: 1,
                                        wmin: 20,
                                        hmin: 20
                                    }
                                }]
                            },
                            image: {
                                required: !0
                            },
                            title: {
                                required: !0
                            },
                            sponsoredBy: {
                                required: !0
                            },
                            clickUrl: {
                                required: !0
                            },
                            body: {
                                required: !1
                            },
                            icon: {
                                required: !1
                            }
                        }
                    },
                    {
                        NATIVE_ASSET_TYPES: f,
                        NATIVE_IMAGE_TYPES: g,
                        PREBID_NATIVE_DATA_KEYS_TO_ORTB: p,
                        NATIVE_KEYS_THAT_ARE_NOT_ASSETS: m,
                        NATIVE_KEYS: h
                    } = a,
                    b = x(p),
                    y = x(f),
                    v = {
                        img: 1,
                        js: 2,
                        1: "img",
                        2: "js"
                    },
                    E = {
                        impression: 1,
                        "viewable-mrc50": 2,
                        "viewable-mrc100": 3,
                        "viewable-video50": 4
                    };

                function w(e) {
                    if (e && e.type && function(e) {
                            if (!e || !(0, o.KM)(Object.keys(u), e)) return (0, i.logError)("".concat(e, " nativeParam is not supported")), !1;
                            return !0
                        }(e.type) && (e = u[e.type]), !e || !e.ortb || A(e.ortb)) return e
                }

                function T(e) {
                    e.forEach((e => {
                        const t = e.nativeParams || (0, r.c)(e, "mediaTypes.native");
                        t && (e.nativeParams = w(t)), e.nativeParams && (e.nativeOrtbRequest = e.nativeParams.ortb || function(e) {
                            if (!e && !(0, i.isPlainObject)(e)) return void(0, i.logError)("Native assets object is empty or not an object: ", e);
                            const t = {
                                ver: "1.2",
                                assets: []
                            };
                            for (let n in e) {
                                if (m.includes(n)) continue;
                                if (!h.hasOwnProperty(n)) {
                                    (0, i.logError)("Unrecognized native asset code: ".concat(n, ". Asset will be ignored."));
                                    continue
                                }
                                if ("privacyLink" === n) {
                                    t.privacy = 1;
                                    continue
                                }
                                const r = e[n];
                                let o = 0;
                                r.required && (0, i.isBoolean)(r.required) && (o = Number(r.required));
                                const s = {
                                    id: t.assets.length,
                                    required: o
                                };
                                if (n in p) s.data = {
                                    type: f[p[n]]
                                }, r.len && (s.data.len = r.len);
                                else if ("icon" === n || "image" === n) {
                                    if (s.img = {
                                            type: "icon" === n ? g.ICON : g.MAIN
                                        }, r.aspect_ratios)
                                        if ((0, i.isArray)(r.aspect_ratios))
                                            if (r.aspect_ratios.length) {
                                                const {
                                                    min_width: e,
                                                    min_height: t
                                                } = r.aspect_ratios[0];
                                                (0, i.isInteger)(e) && (0, i.isInteger)(t) ? (s.img.wmin = e, s.img.hmin = t) : (0, i.logError)("image.aspect_ratios min_width or min_height are invalid: ", e, t);
                                                const n = r.aspect_ratios.filter((e => e.ratio_width && e.ratio_height)).map((e => "".concat(e.ratio_width, ":").concat(e.ratio_height)));
                                                n.length > 0 && (s.img.ext = {
                                                    aspectratios: n
                                                })
                                            } else(0, i.logError)("image.aspect_ratios was passed, but it's empty:", r.aspect_ratios);
                                    else(0, i.logError)("image.aspect_ratios was passed, but it's not a an array:", r.aspect_ratios);
                                    r.sizes && (2 === r.sizes.length && (0, i.isInteger)(r.sizes[0]) && (0, i.isInteger)(r.sizes[1]) ? (s.img.w = r.sizes[0], s.img.h = r.sizes[1], delete s.img.hmin, delete s.img.wmin) : (0, i.logError)("image.sizes was passed, but its value is not an array of integers:", r.sizes))
                                } else "title" === n ? s.title = {
                                    len: r.len || 140
                                } : "ext" === n && (s.ext = r, delete s.required);
                                t.assets.push(s)
                            }
                            return t
                        }(e.nativeParams))
                    }))
                }

                function A(e) {
                    const t = e.assets;
                    if (!Array.isArray(t) || 0 === t.length) return (0, i.logError)("assets in mediaTypes.native.ortb is not an array, or it's empty. Assets: ", t), !1;
                    const n = t.map((e => e.id));
                    return t.length !== new Set(n).size || n.some((e => e !== parseInt(e, 10))) ? ((0, i.logError)("each asset object must have 'id' property, it must be unique and it must be an integer"), !1) : e.hasOwnProperty("eventtrackers") && !Array.isArray(e.eventtrackers) ? ((0, i.logError)("ortb.eventtrackers is not an array. Eventtrackers: ", e.eventtrackers), !1) : t.every((e => function(e) {
                        if (!(0, i.isPlainObject)(e)) return (0, i.logError)("asset must be an object. Provided asset: ", e), !1;
                        if (e.img) {
                            if (!(0, i.isNumber)(e.img.w) && !(0, i.isNumber)(e.img.wmin)) return (0, i.logError)("for img asset there must be 'w' or 'wmin' property"), !1;
                            if (!(0, i.isNumber)(e.img.h) && !(0, i.isNumber)(e.img.hmin)) return (0, i.logError)("for img asset there must be 'h' or 'hmin' property"), !1
                        } else if (e.title) {
                            if (!(0, i.isNumber)(e.title.len)) return (0, i.logError)("for title asset there must be 'len' property defined"), !1
                        } else if (e.data) {
                            if (!(0, i.isNumber)(e.data.type)) return (0, i.logError)("for data asset 'type' property must be a number"), !1
                        } else if (e.video && !(Array.isArray(e.video.mimes) && Array.isArray(e.video.protocols) && (0, i.isNumber)(e.video.minduration) && (0, i.isNumber)(e.video.maxduration))) return (0, i.logError)("video asset is not properly configured"), !1;
                        return !0
                    }(e)))
                }

                function C(e) {
                    var t;
                    let {
                        index: n = s.M.index
                    } = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
                    const a = n.getAdUnit(e);
                    if (!a) return !1;
                    let c = a.nativeOrtbRequest;
                    return function(e, t) {
                        if (!(0, r.c)(e, "link.url")) return (0, i.logError)("native response doesn't have 'link' property. Ortb response: ", e), !1;
                        let n = t.assets.filter((e => 1 === e.required)).map((e => e.id)),
                            s = e.assets.map((e => e.id));
                        const a = n.every((e => (0, o.KM)(s, e)));
                        a || (0, i.logError)("didn't receive a bid with all required assets. Required ids: ".concat(n, ", but received ids in response: ").concat(s));
                        return a
                    }((null === (t = e.native) || void 0 === t ? void 0 : t.ortb) || M(e.native, c), c)
                }

                function I(e, t) {
                    const n = t.native.ortb || _(t.native);
                    return "click" === e.action ? function(e) {
                        let t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : null,
                            {
                                fetchURL: n = i.triggerPixel
                            } = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {};
                        if (t) {
                            var r;
                            const i = (e.assets || []).filter((e => e.link)).reduce(((e, t) => (e[t.id] = t.link, e)), {}),
                                o = (null === (r = e.link) || void 0 === r ? void 0 : r.clicktrackers) || [];
                            let s = i[t],
                                a = o;
                            s && (a = s.clicktrackers || []), a.forEach((e => n(e)))
                        } else {
                            var o;
                            ((null === (o = e.link) || void 0 === o ? void 0 : o.clicktrackers) || []).forEach((e => n(e)))
                        }
                    }(n, null == e ? void 0 : e.assetId) : function(e) {
                        let {
                            runMarkup: t = (e => (0, i.insertHtmlIntoIframe)(e)),
                            fetchURL: n = i.triggerPixel
                        } = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
                        const r = (e.eventtrackers || []).filter((e => e.event === E.impression));
                        let {
                            img: o,
                            js: s
                        } = r.reduce(((e, t) => (v.hasOwnProperty(t.method) && e[v[t.method]].push(t.url), e)), {
                            img: [],
                            js: []
                        });
                        e.imptrackers && (o = o.concat(e.imptrackers));
                        o.forEach((e => n(e))), s = s.map((e => '<script async src="'.concat(e, '"><\/script>'))), e.jstracker && (s = s.concat([e.jstracker]));
                        s.length && t(s.join("\n"))
                    }(n), e.action
                }

                function S(e) {
                    let {
                        index: t = s.M.index
                    } = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {}, n = {};
                    const i = t.getAdUnit(e);
                    (0, r.c)(i, "nativeParams.rendererUrl") ? e.native.rendererUrl = R(i.nativeParams.rendererUrl): (0, r.c)(i, "nativeParams.adTemplate") && (e.native.adTemplate = R(i.nativeParams.adTemplate));
                    const o = !1 !== (0, r.c)(i, "nativeParams.sendTargetingKeys"),
                        c = function(e) {
                            const t = {};
                            (0, r.c)(e, "nativeParams.ext") && Object.keys(e.nativeParams.ext).forEach((e => {
                                t[e] = "hb_native_".concat(e)
                            }));
                            return {
                                ...a.NATIVE_KEYS,
                                ...t
                            }
                        }(i),
                        d = {
                            ...e.native,
                            ...e.native.ext
                        };
                    return delete d.ext, Object.keys(d).forEach((t => {
                        const s = c[t];
                        let a = R(e.native[t]) || R((0, r.c)(e, "native.ext.".concat(t)));
                        if ("adTemplate" === t || !s || !a) return;
                        let d = (0, r.c)(i, "nativeParams.".concat(t, ".sendId"));
                        if ("boolean" != typeof d && (d = (0, r.c)(i, "nativeParams.ext.".concat(t, ".sendId"))), d) {
                            a = "".concat(s, ":").concat(e.adId)
                        }
                        let l = (0, r.c)(i, "nativeParams.".concat(t, ".sendTargetingKeys"));
                        "boolean" != typeof l && (l = (0, r.c)(i, "nativeParams.ext.".concat(t, ".sendTargetingKeys")));
                        ("boolean" == typeof l ? l : o) && (n[s] = a)
                    })), n
                }

                function k(e, t, n) {
                    var r;
                    let {
                        index: i = s.M.index
                    } = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : {};
                    const o = {
                            message: "assetResponse",
                            adId: e.adId
                        },
                        c = i.getAdUnit(t);
                    let d = t.native;
                    return t.native.ortb ? o.ortb = t.native.ortb : null !== (r = c.mediaTypes) && void 0 !== r && null !== (r = r.native) && void 0 !== r && r.ortb && (o.ortb = M(t.native, c.nativeOrtbRequest)), o.assets = [], (null == n ? Object.keys(d) : n).forEach((function(e) {
                        if ("adTemplate" === e && d[e]) o.adTemplate = R(d[e]);
                        else if ("rendererUrl" === e && d[e]) o.rendererUrl = R(d[e]);
                        else if ("ext" === e) Object.keys(d[e]).forEach((t => {
                            if (d[e][t]) {
                                const n = R(d[e][t]);
                                o.assets.push({
                                    key: t,
                                    value: n
                                })
                            }
                        }));
                        else if (d[e] && a.NATIVE_KEYS.hasOwnProperty(e)) {
                            const t = R(d[e]);
                            o.assets.push({
                                key: e,
                                value: t
                            })
                        }
                    })), o
                }
                const O = Object.fromEntries(Object.entries(a.NATIVE_KEYS).map((e => {
                    let [t, n] = e;
                    return [n, t]
                })));

                function B(e, t) {
                    const n = e.assets.map((e => O[e]));
                    return k(e, t, n)
                }

                function U(e, t) {
                    return k(e, t, null)
                }

                function R(e) {
                    return (null == e ? void 0 : e.url) || e
                }

                function j(e, t) {
                    for (; e && t && e !== t;) e > t ? e -= t : t -= e;
                    return e || t
                }

                function N(e) {
                    if (!A(e)) return;
                    const t = {};
                    for (const n of e.assets) {
                        if (n.title) {
                            const e = {
                                required: !!n.required && Boolean(n.required),
                                len: n.title.len
                            };
                            t.title = e
                        } else if (n.img) {
                            const e = {
                                required: !!n.required && Boolean(n.required)
                            };
                            if (n.img.w && n.img.h) e.sizes = [n.img.w, n.img.h];
                            else if (n.img.wmin && n.img.hmin) {
                                const t = j(n.img.wmin, n.img.hmin);
                                e.aspect_ratios = [{
                                    min_width: n.img.wmin,
                                    min_height: n.img.hmin,
                                    ratio_width: n.img.wmin / t,
                                    ratio_height: n.img.hmin / t
                                }]
                            }
                            n.img.type === g.MAIN ? t.image = e : t.icon = e
                        } else if (n.data) {
                            let e = Object.keys(f).find((e => f[e] === n.data.type)),
                                r = Object.keys(p).find((t => p[t] === e));
                            t[r] = {
                                required: !!n.required && Boolean(n.required)
                            }, n.data.len && (t[r].len = n.data.len)
                        }
                        e.privacy && (t.privacyLink = {
                            required: !1
                        })
                    }
                    return t
                }

                function D(e) {
                    {
                        if (!e || !(0, i.isArray)(e)) return e;
                        if (!e.some((e => {
                                var t;
                                return null === (t = ((null == e ? void 0 : e.mediaTypes) || {})[c.sl]) || void 0 === t ? void 0 : t.ortb
                            }))) return e;
                        let t = (0, i.deepClone)(e);
                        for (const e of t) e.mediaTypes && e.mediaTypes[c.sl] && e.mediaTypes[c.sl].ortb && (e.mediaTypes[c.sl] = Object.assign((0, i.pick)(e.mediaTypes[c.sl], m), N(e.mediaTypes[c.sl].ortb)), e.nativeParams = w(e.mediaTypes[c.sl]));
                        return t
                    }
                }

                function _(e) {
                    const t = {
                        link: {},
                        eventtrackers: []
                    };
                    return Object.entries(e).forEach((e => {
                        let [n, r] = e;
                        switch (n) {
                            case "clickUrl":
                                t.link.url = r;
                                break;
                            case "clickTrackers":
                                t.link.clicktrackers = Array.isArray(r) ? r : [r];
                                break;
                            case "impressionTrackers":
                                (Array.isArray(r) ? r : [r]).forEach((e => {
                                    t.eventtrackers.push({
                                        event: E.impression,
                                        method: v.img,
                                        url: e
                                    })
                                }));
                                break;
                            case "javascriptTrackers":
                                t.jstracker = Array.isArray(r) ? r.join("") : r;
                                break;
                            case "privacyLink":
                                t.privacy = r
                        }
                    })), t
                }

                function M(e, t) {
                    const n = {
                        ..._(e),
                        assets: []
                    };

                    function r(e, r) {
                        let o = t.assets.find(e);
                        null != o && (o = (0, i.deepClone)(o), r(o), n.assets.push(o))
                    }
                    return Object.keys(e).filter((t => !!e[t])).forEach((t => {
                        const n = R(e[t]);
                        switch (t) {
                            case "title":
                                r((e => null != e.title), (e => {
                                    e.title = {
                                        text: n
                                    }
                                }));
                                break;
                            case "image":
                            case "icon":
                                const e = "image" === t ? g.MAIN : g.ICON;
                                r((t => null != t.img && t.img.type === e), (e => {
                                    e.img = {
                                        url: n
                                    }
                                }));
                                break;
                            default:
                                t in p && r((e => null != e.data && e.data.type === f[p[t]]), (e => {
                                    e.data = {
                                        value: n
                                    }
                                }))
                        }
                    })), n
                }

                function q(e, t) {
                    const n = {},
                        r = (null == t ? void 0 : t.assets) || [];
                    n.clickUrl = e.link.url, n.privacyLink = e.privacy;
                    for (const t of (null == e ? void 0 : e.assets) || []) {
                        const e = r.find((e => t.id === e.id));
                        t.title ? n.title = t.title.text : t.img ? n[e.img.type === g.MAIN ? "image" : "icon"] = {
                            url: t.img.url,
                            width: t.img.w,
                            height: t.img.h
                        } : t.data && (n[b[y[e.data.type]]] = t.data.value)
                    }
                    n.impressionTrackers = [];
                    let i = [];
                    e.imptrackers && n.impressionTrackers.push(...e.imptrackers);
                    for (const t of (null == e ? void 0 : e.eventtrackers) || []) t.event === E.impression && t.method === v.img && n.impressionTrackers.push(t.url), t.event === E.impression && t.method === v.js && i.push(t.url);
                    return i = i.map((e => '<script async src="'.concat(e, '"><\/script>'))), null != e && e.jstracker && i.push(e.jstracker), i.length && (n.javascriptTrackers = i.join("\n")), n
                }

                function x(e) {
                    var t = {};
                    for (var n in e) t[e[n]] = n;
                    return t
                }
            },
            11636: (e, t, n) => {
                function r(e, t, n) {
                    return e && e.includes(t, n) || !1
                }

                function i() {
                    return Array.from.apply(Array, arguments)
                }

                function o(e, t, n) {
                    return e && e.find(t, n)
                }

                function s(e, t, n) {
                    return e && e.findIndex(t, n)
                }
                n.d(t, {
                    A5: () => i,
                    KM: () => r,
                    Ws: () => s,
                    iw: () => o
                })
            },
            56360: (e, t, n) => {
                n.d(t, {
                    kL: () => H,
                    ae: () => Y,
                    yq: () => J
                });
                var r = n(48176),
                    i = n(28768),
                    o = n(52420),
                    s = n(79344),
                    a = n(1276),
                    c = n(68332),
                    d = n(16112),
                    l = n(71695),
                    u = n(11636),
                    f = n(91632),
                    g = n(1796);
                const p = d.EVENTS.BID_WON,
                    m = new WeakSet,
                    h = {
                        [g.c3]: function(e, t, n) {
                            (0, f.ke)((function(t) {
                                y(n), e(Object.assign({
                                    message: g.iI
                                }, t))
                            }), {
                                options: t.options,
                                adId: t.adId,
                                bidResponse: n
                            })
                        },
                        [g.q6]: function(e, t, n) {
                            if (null == n) return void(0, i.logError)("Cannot find ad '".concat(t.adId, "' for x-origin event request"));
                            if (n.status !== d.BID_STATUS.RENDERED) return void(0, i.logWarn)("Received x-origin event request without corresponding render request for ad '".concat(t.adId, "'"));
                            switch (t.event) {
                                case d.EVENTS.AD_RENDER_FAILED:
                                    (0, f.CA)({
                                        bid: n,
                                        id: t.adId,
                                        reason: t.info.reason,
                                        message: t.info.message
                                    });
                                    break;
                                case d.EVENTS.AD_RENDER_SUCCEEDED:
                                    (0, f.g1)({
                                        doc: null,
                                        bid: n,
                                        id: t.adId
                                    });
                                    break;
                                default:
                                    (0, i.logError)("Received x-origin event request for unsupported event: '".concat(t.event, "' (adId: '").concat(t.adId, "')"))
                            }
                        }
                    };

                function b(e) {
                    var t = e.message ? "message" : "data",
                        n = {};
                    try {
                        n = JSON.parse(e[t])
                    } catch (e) {
                        return
                    }
                    if (n && n.adId && n.message) {
                        const t = (0, u.iw)(l.M.getBidsReceived(), (function(e) {
                            return e.adId === n.adId
                        }));
                        h.hasOwnProperty(n.message) && h[n.message](function(e) {
                            return null == e.origin && 0 === e.ports.length ? function() {
                                const e = "Cannot post message to a frame with null origin. Please update creatives to use MessageChannel, see https://github.com/prebid/Prebid.js/issues/7870";
                                throw (0, i.logError)(e), new Error(e)
                            } : e.ports.length > 0 ? function(t) {
                                e.ports[0].postMessage(JSON.stringify(t))
                            } : function(t) {
                                e.source.postMessage(JSON.stringify(t), e.origin)
                            }
                        }(e), n, t)
                    }
                }

                function y(e) {
                    let {
                        adId: t,
                        adUnitCode: n,
                        width: r,
                        height: o
                    } = e;
                    ["div", "iframe"].forEach((e => {
                        let s = function(e) {
                            let r = function(e, t) {
                                    return (0, i.isGptPubadsDefined)() ? function(e) {
                                        const t = (0, u.iw)(window.googletag.pubads().getSlots(), (t => (0, u.iw)(t.getTargetingKeys(), (n => (0, u.KM)(t.getTargeting(n), e)))));
                                        return t ? t.getSlotElementId() : null
                                    }(e) : (0, i.isApnGetTagDefined)() ? function(e) {
                                        let t = window.apntag.getTag(e);
                                        return t && t.targetId
                                    }(t) : t
                                }(t, n),
                                o = document.getElementById(r);
                            return o && o.querySelector(e)
                        }(e + ':not([style*="display: none"])');
                        if (s) {
                            let e = s.style;
                            e.width = r ? r + "px" : "100%", e.height = o + "px"
                        } else(0, i.logWarn)("Unable to locate matching page element for adUnitCode ".concat(n, ".  Can't resize it to ad's dimensions.  Please review setup."))
                    }))
                }
                Object.assign(h, {
                    [g.cZ]: function(e, t, n) {
                        if (null == n) return void(0, i.logError)("Cannot find ad for x-origin event request: '".concat(t.adId, "'"));
                        m.has(n) || (m.add(n), l.M.addWinningBid(n), a.emit(p, n));
                        switch (t.action) {
                            case "assetRequest":
                                e((0, c.kP)(t, n));
                                break;
                            case "allAssetRequest":
                                e((0, c.Md)(t, n));
                                break;
                            case "resizeNativeHeight":
                                n.height = t.height, n.width = t.width, y(n);
                                break;
                            default:
                                (0, c.Cs)(t, n)
                        }
                    }
                });
                var v = n(51840),
                    E = n(65576),
                    w = n(8892),
                    T = n(74712),
                    A = n(89724),
                    C = n(57168),
                    I = n(17580),
                    S = n(97200),
                    k = n(12576),
                    O = n(61820),
                    B = n(86576),
                    U = n(47588),
                    R = n(47356),
                    j = n(16192),
                    N = n(16259),
                    D = n(52224);
                const _ = (0, r.A)(),
                    {
                        triggerUserSyncs: M
                    } = v.userSync,
                    {
                        ADD_AD_UNITS: q,
                        REQUEST_BIDS: x,
                        SET_TARGETING: P
                    } = d.EVENTS,
                    W = {
                        bidWon: function(e) {
                            if (!l.M.getBidsRequested().map((e => e.bids.map((e => e.adUnitCode)))).reduce(i.flatten).filter(i.uniques).includes(e)) return void(0, i.logError)('The "' + e + '" placement is not defined.');
                            return !0
                        }
                    };

                function K(e, t) {
                    let n = [];
                    return (0, i.isArray)(e) && (t ? e.length === t : e.length > 0) && (e.every((e => (0, i.isArrayOfNums)(e, 2))) ? n = e : (0, i.isArrayOfNums)(e, 2) && n.push(e)), n
                }

                function F(e) {
                    const t = (0, i.deepClone)(e),
                        n = t.mediaTypes.banner,
                        r = K(n.sizes);
                    return r.length > 0 ? (n.sizes = r, t.sizes = r) : ((0, i.logError)("Detected a mediaTypes.banner object without a proper sizes field.  Please ensure the sizes are listed like: [[300, 250], ...].  Removing invalid mediaTypes.banner object from request."), delete t.mediaTypes.banner), t
                }

                function G(e) {
                    const t = (0, i.deepClone)(e),
                        n = t.mediaTypes.video;
                    if (n.playerSize) {
                        let e = "number" == typeof n.playerSize[0] ? 2 : 1;
                        const r = K(n.playerSize, e);
                        r.length > 0 ? (2 === e && (0, i.logInfo)("Transforming video.playerSize from [640,480] to [[640,480]] so it's in the proper format."), n.playerSize = r, t.sizes = r) : ((0, i.logError)("Detected incorrect configuration of mediaTypes.video.playerSize.  Please specify only one set of dimensions in a format like: [[640, 480]]. Removing invalid mediaTypes.video.playerSize property from request."), delete t.mediaTypes.video.playerSize)
                    }
                    return t
                }

                function L(e) {
                    const t = (0, i.deepClone)(e),
                        n = t.mediaTypes.native;
                    if (n.ortb) {
                        const e = Object.keys(d.NATIVE_KEYS).filter((e => d.NATIVE_KEYS[e].includes("hb_native_"))),
                            r = Object.keys(n).filter((t => e.includes(t)));
                        r.length > 0 && ((0, i.logError)("when using native OpenRTB format, you cannot use legacy native properties. Deleting ".concat(r, " keys from request.")), r.forEach((e => delete t.mediaTypes.native[e])))
                    }
                    return n.image && n.image.sizes && !Array.isArray(n.image.sizes) && ((0, i.logError)("Please use an array of sizes for native.image.sizes field.  Removing invalid mediaTypes.native.image.sizes property from request."), delete t.mediaTypes.native.image.sizes), n.image && n.image.aspect_ratios && !Array.isArray(n.image.aspect_ratios) && ((0, i.logError)("Please use an array of sizes for native.image.aspect_ratios field.  Removing invalid mediaTypes.native.image.aspect_ratios property from request."), delete t.mediaTypes.native.image.aspect_ratios), n.icon && n.icon.sizes && !Array.isArray(n.icon.sizes) && ((0, i.logError)("Please use an array of sizes for native.icon.sizes field.  Removing invalid mediaTypes.native.icon.sizes property from request."), delete t.mediaTypes.native.icon.sizes), t
                }

                function V(e, t) {
                    let n = (0, o.c)(e, "mediaTypes.".concat(t, ".pos"));
                    if (!(0, i.isNumber)(n) || isNaN(n) || !isFinite(n)) {
                        let n = "Value of property 'pos' on ad unit ".concat(e.code, " should be of type: Number");
                        (0, i.logWarn)(n), a.emit(d.EVENTS.AUCTION_DEBUG, {
                            type: "WARNING",
                            arguments: n
                        }), delete e.mediaTypes[t].pos
                    }
                    return e
                }

                function z(e) {
                    const t = t => "adUnit.code '".concat(e.code, "' ").concat(t),
                        n = e.mediaTypes,
                        r = e.bids;
                    return null == r || (0, i.isArray)(r) ? null == r && null == e.ortb2Imp ? ((0, i.logError)(t("has no 'adUnit.bids' and no 'adUnit.ortb2Imp'. Removing adUnit from auction")), null) : n && 0 !== Object.keys(n).length ? (null == e.ortb2Imp || null != r && 0 !== r.length || (e.bids = [{
                        bidder: null
                    }], (0, i.logMessage)(t("defines 'adUnit.ortb2Imp' with no 'adUnit.bids'; it will be seen only by S2S adapters"))), e) : ((0, i.logError)(t("does not define a 'mediaTypes' object.  This is a required field for the auction, so this adUnit has been removed.")), null) : ((0, i.logError)(t("defines 'adUnit.bids' that is not an array. Removing adUnit from auction")), null)
                }(0, A.uB)(), _.bidderSettings = _.bidderSettings || {}, _.libLoaded = !0, _.version = "v8.30.0", (0, i.logInfo)("Prebid.js v8.30.0 loaded"), _.installedModules = _.installedModules || [], _.adUnits = _.adUnits || [], _.triggerUserSyncs = M;
                const H = {
                    validateAdUnit: z,
                    validateBannerMediaType: F,
                    validateSizes: K
                };
                Object.assign(H, {
                    validateNativeMediaType: L
                }), Object.assign(H, {
                    validateVideoMediaType: G
                });
                const Y = (0, T.Ok)("sync", (function(e) {
                    const t = [];
                    return e.forEach((e => {
                        if (null == (e = z(e))) return;
                        const n = e.mediaTypes;
                        let r, i, o;
                        n.banner && (r = F(e), n.banner.hasOwnProperty("pos") && (r = V(r, "banner"))), n.video && (i = G(r || e), n.video.hasOwnProperty("pos") && (i = V(i, "video"))), n.native && (o = L(i || (r || e)));
                        const s = Object.assign({}, r, i, o);
                        t.push(s)
                    })), t
                }), "checkAdUnitSetup");

                function Q(e) {
                    const t = l.M[e]().filter((e => l.M.getAdUnitCodes().includes(e.adUnitCode))),
                        n = l.M.getLastAuctionId();
                    return t.map((e => e.adUnitCode)).filter(i.uniques).map((e => t.filter((t => t.auctionId === n && t.adUnitCode === e)))).filter((e => e && e[0] && e[0].adUnitCode)).map((e => ({
                        [e[0].adUnitCode]: {
                            bids: e
                        }
                    }))).reduce(((e, t) => Object.assign(e, t)), {})
                }
                _.getAdserverTargetingForAdUnitCodeStr = function(e) {
                    if ((0, i.logInfo)("Invoking owpbjs.getAdserverTargetingForAdUnitCodeStr", arguments), e) {
                        var t = _.getAdserverTargetingForAdUnitCode(e);
                        return (0, i.transformAdServerTargetingObj)(t)
                    }(0, i.logMessage)("Need to call getAdserverTargetingForAdUnitCodeStr with adunitCode")
                }, _.getHighestUnusedBidResponseForAdUnitCode = function(e) {
                    if (e) {
                        const t = l.M.getAllBidsForAdUnitCode(e).filter(w.SO);
                        return t.length ? t.reduce(N.Cm) : {}
                    }(0, i.logMessage)("Need to call getHighestUnusedBidResponseForAdUnitCode with adunitCode")
                }, _.getAdserverTargetingForAdUnitCode = function(e) {
                    return _.getAdserverTargeting(e)[e]
                }, _.getAdserverTargeting = function(e) {
                    return (0, i.logInfo)("Invoking owpbjs.getAdserverTargeting", arguments), w.U7.getAllTargeting(e)
                }, _.getConsentMetadata = function() {
                    return (0, i.logInfo)("Invoking owpbjs.getConsentMetadata"), R.iy.getConsentMeta()
                }, _.getNoBids = function() {
                    return (0, i.logInfo)("Invoking owpbjs.getNoBids", arguments), Q("getNoBids")
                }, _.getNoBidsForAdUnitCode = function(e) {
                    return {
                        bids: l.M.getNoBids().filter((t => t.adUnitCode === e))
                    }
                }, _.getBidResponses = function() {
                    return (0, i.logInfo)("Invoking owpbjs.getBidResponses", arguments), Q("getBidsReceived")
                }, _.getBidResponsesForAdUnitCode = function(e) {
                    return {
                        bids: l.M.getBidsReceived().filter((t => t.adUnitCode === e))
                    }
                }, _.setTargetingForGPTAsync = function(e, t) {
                    if ((0, i.logInfo)("Invoking owpbjs.setTargetingForGPTAsync", arguments), !(0, i.isGptPubadsDefined)()) return void(0, i.logError)("window.googletag is not defined on the page");
                    let n = w.U7.getAllTargeting(e);
                    w.U7.resetPresetTargeting(e, t), w.U7.setTargetingForGPT(n, t), Object.keys(n).forEach((e => {
                        Object.keys(n[e]).forEach((t => {
                            "hb_adid" === t && l.M.setStatusForBids(n[e][t], d.BID_STATUS.W)
                        }))
                    })), a.emit(P, n)
                }, _.setTargetingForAst = function(e) {
                    (0, i.logInfo)("Invoking owpbjs.setTargetingForAn", arguments), w.U7.isApntagDefined() ? (w.U7.setTargetingForAst(e), a.emit(P, w.U7.getAllTargeting())) : (0, i.logError)("window.apntag is not defined on the page")
                }, _.renderAd = (0, T.Ok)("async", (function(e, t, n) {
                    (0, i.logInfo)("Invoking owpbjs.renderAd", arguments), (0, i.logMessage)("Calling renderAd with adId :" + t), (0, j.w)(e, t, n)
                })), _.removeAdUnit = function(e) {
                    if ((0, i.logInfo)("Invoking owpbjs.removeAdUnit", arguments), !e) return void(_.adUnits = []);
                    let t;
                    t = (0, i.isArray)(e) ? e : [e], t.forEach((e => {
                        for (let t = _.adUnits.length - 1; t >= 0; t--) _.adUnits[t].code === e && _.adUnits.splice(t, 1)
                    }))
                }, _.requestBids = function() {
                    const e = (0, T.Ok)("async", (function() {
                        let {
                            bidsBackHandler: e,
                            timeout: t,
                            adUnits: n,
                            adUnitCodes: r,
                            labels: o,
                            auctionId: s,
                            ttlBuffer: c,
                            ortb2: d,
                            metrics: l,
                            defer: f
                        } = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
                        a.emit(x);
                        const g = t || E.config.getConfig("bidderTimeout");
                        (0, i.logInfo)("Invoking owpbjs.requestBids", arguments), r && r.length ? n = n.filter((e => (0, u.KM)(r, e.code))) : r = n && n.map((e => e.code));
                        const p = {
                            global: (0, i.mergeDeep)({}, E.config.getAnyConfig("ortb2") || {}, d || {}),
                            bidder: Object.fromEntries(Object.entries(E.config.getBidderConfig()).map((e => {
                                let [t, n] = e;
                                return [t, n.ortb2]
                            })).filter((e => {
                                let [t, n] = e;
                                return null != n
                            })))
                        };
                        return (0, U.e)(B.i.resolve(p.global)).then((t => (p.global = t, J({
                            bidsBackHandler: e,
                            timeout: g,
                            adUnits: n,
                            adUnitCodes: r,
                            labels: o,
                            auctionId: s,
                            ttlBuffer: c,
                            ortb2Fragments: p,
                            metrics: l,
                            defer: f
                        }))))
                    }), "requestBids");
                    return (0, T.C4)(e, (function() {
                        let t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {},
                            n = t.adUnits || _.adUnits;
                        return t.adUnits = (0, i.isArray)(n) ? n.slice() : [n], t.metrics = (0, O.qm)(), t.metrics.checkpoint("requestBids"), t.defer = (0, B.Q)({
                            promiseFactory: e => new Promise(e)
                        }), e.call(this, t), t.defer.promise
                    }))
                }();
                const J = (0, T.Ok)("async", (function() {
                    let {
                        bidsBackHandler: e,
                        timeout: t,
                        adUnits: n,
                        ttlBuffer: r,
                        adUnitCodes: o,
                        labels: a,
                        auctionId: c,
                        ortb2Fragments: d,
                        metrics: f,
                        defer: g
                    } = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
                    const p = (0, k.E3)(E.config.getConfig("s2sConfig") || []);

                    function m(t, n, r) {
                        if ("function" == typeof e) try {
                            e(t, n, r)
                        } catch (e) {
                            (0, i.logError)("Error executing bidsBackHandler", null, e)
                        }
                        g.resolve({
                            bids: t,
                            timedOut: n,
                            auctionId: r
                        })
                    }
                    if (function(e) {
                            e.forEach((e => (0, D.PL)(e)))
                        }(n), n = (0, O.hC)(f).measureTime("requestBids.validate", (() => Y(n))), n.forEach((e => {
                            var t;
                            const n = Object.keys(e.mediaTypes || {
                                    banner: "banner"
                                }),
                                o = e.bids.map((e => e.bidder)),
                                a = k.cp.bidderRegistry,
                                c = o.filter((e => !p.has(e))),
                                d = (null === (t = e.ortb2Imp) || void 0 === t || null === (t = t.ext) || void 0 === t ? void 0 : t.tid) || (0, i.generateUUID)();
                            e.transactionId = d, null == r || e.hasOwnProperty("ttlBuffer") || (e.ttlBuffer = r), (0, s.e)(e, "ortb2Imp.ext.tid", d), c.forEach((t => {
                                const r = a[t],
                                    o = r && r.getSpec && r.getSpec(),
                                    s = o && o.supportedMediaTypes || ["banner"];
                                n.some((e => (0, u.KM)(s, e))) ? C.w.incrementBidderRequestsCounter(e.code, t) : ((0, i.logWarn)((0, i.unsupportedBidderMessage)(e, t)), e.bids = e.bids.filter((e => e.bidder !== t)))
                            })), C.w.incrementRequestsCounter(e.code)
                        })), n && 0 !== n.length) {
                        const e = l.M.createAuction({
                            adUnits: n,
                            adUnitCodes: o,
                            callback: m,
                            cbTimeout: t,
                            labels: a,
                            auctionId: c,
                            ortb2Fragments: d,
                            metrics: f
                        });
                        let r = n.length;
                        r > 15 && (0, i.logInfo)("Current auction ".concat(e.getAuctionId(), " contains ").concat(r, " adUnits."), n), o.forEach((t => w.U7.setLatestAuctionForAdUnit(t, e.getAuctionId()))), e.callBids()
                    } else(0, i.logMessage)("No adUnits configured. No bids requested."), m()
                }), "startAuction");
                _.requestBids.before((function(e, t) {
                    function n(e) {
                        for (var t; t = e.shift();) t()
                    }
                    n(S.NO), n($), e.call(this, t)
                }), 49), _.addAdUnits = function(e) {
                    (0, i.logInfo)("Invoking owpbjs.addAdUnits", arguments), _.adUnits.push.apply(_.adUnits, (0, i.isArray)(e) ? e : [e]), a.emit(q)
                }, _.onEvent = function(e, t, n) {
                    (0, i.logInfo)("Invoking owpbjs.onEvent", arguments), (0, i.isFn)(t) ? !n || W[e].call(null, n) ? a.on(e, t, n) : (0, i.logError)('The id provided is not valid for event "' + e + '" and no handler was set.'): (0, i.logError)('The event handler provided is not a function and was not set on event "' + e + '".')
                }, _.offEvent = function(e, t, n) {
                    (0, i.logInfo)("Invoking owpbjs.offEvent", arguments), n && !W[e].call(null, n) || a.off(e, t, n)
                }, _.getEvents = function() {
                    return (0, i.logInfo)("Invoking owpbjs.getEvents"), a.getEvents()
                }, _.registerBidAdapter = function(e, t) {
                    (0, i.logInfo)("Invoking owpbjs.registerBidAdapter", arguments);
                    try {
                        k.cp.registerBidAdapter(e(), t)
                    } catch (e) {
                        (0, i.logError)("Error registering bidder adapter : " + e.message)
                    }
                }, _.registerAnalyticsAdapter = function(e) {
                    (0, i.logInfo)("Invoking owpbjs.registerAnalyticsAdapter", arguments);
                    try {
                        k.cp.registerAnalyticsAdapter(e)
                    } catch (e) {
                        (0, i.logError)("Error registering analytics adapter : " + e.message)
                    }
                }, _.createBid = function(e) {
                    return (0, i.logInfo)("Invoking owpbjs.createBid", arguments), (0, I.g)(e)
                };
                const $ = [],
                    X = (0, T.Ok)("async", (function(e) {
                        e && !(0, i.isEmpty)(e) ? ((0, i.logInfo)("Invoking owpbjs.enableAnalytics for: ", e), k.cp.enableAnalytics(e)) : (0, i.logError)("owpbjs.enableAnalytics should be called with option {}")
                    }), "enableAnalyticsCb");
                _.enableAnalytics = function(e) {
                    $.push(X.bind(this, e))
                }, _.aliasBidder = function(e, t, n) {
                    (0, i.logInfo)("Invoking owpbjs.aliasBidder", arguments), e && t ? k.cp.aliasBidAdapter(e, t, n) : (0, i.logError)("bidderCode and alias must be passed as arguments", "owpbjs.aliasBidder")
                }, _.aliasRegistry = k.cp.aliasRegistry, E.config.getConfig("aliasRegistry", (e => {
                    "private" === e.aliasRegistry && delete _.aliasRegistry
                })), _.getAllWinningBids = function() {
                    return l.M.getAllWinningBids()
                }, _.getAllPrebidWinningBids = function() {
                    return l.M.getBidsReceived().filter((e => e.status === d.BID_STATUS.W))
                }, _.getHighestCpmBids = function(e) {
                    return w.U7.getWinningBids(e)
                }, _.markWinningBidAsUsed = function(e) {
                    const t = Z(e, "Improper use of markWinningBidAsUsed. It needs an adUnitCode or an adId to function.");
                    t.length > 0 && l.M.addWinningBid(t[0])
                };
                const Z = (e, t) => {
                    let n = [];
                    return e.adUnitCode && e.adId ? n = l.M.getBidsReceived().filter((t => t.adId === e.adId && t.adUnitCode === e.adUnitCode)) : e.adUnitCode ? n = w.U7.getWinningBids(e.adUnitCode) : e.adId ? n = l.M.getBidsReceived().filter((t => t.adId === e.adId)) : (0, i.logWarn)(t), n
                };

                function ee(e) {
                    e.forEach((function(e) {
                        if (void 0 === e.called) try {
                            e.call(), e.called = !0
                        } catch (e) {
                            (0, i.logError)("Error processing command :", "prebid.js", e)
                        }
                    }))
                }
                _.getConfig = E.config.getAnyConfig, _.readConfig = E.config.readAnyConfig, _.mergeConfig = E.config.mergeConfig, _.mergeBidderConfig = E.config.mergeBidderConfig, _.setConfig = E.config.setConfig, _.setBidderConfig = E.config.setBidderConfig, _.que.push((() => {
                    window.addEventListener("message", b, !1)
                })), _.cmd.push = function(e) {
                    if ("function" == typeof e) try {
                        e.call()
                    } catch (e) {
                        (0, i.logError)("Error processing command :", e.message, e.stack)
                    } else(0, i.logError)("Commands written into owpbjs.cmd.push must be wrapped in a function")
                }, _.que.push = _.cmd.push, _.processQueue = function() {
                    T.Ok.ready(), ee(_.que), ee(_.cmd)
                }, _.triggerBilling = e => {
                    const t = Z(e, "Improper use of triggerBilling. It requires a bid with at least an adUnitCode or an adId to function."),
                        n = t.find((t => t.requestId === e.requestId)) || t[0];
                    if (t.length > 0 && n) try {
                        k.cp.callBidBillableBidder(n)
                    } catch (e) {
                        (0, i.logError)("Error when triggering billing :", e)
                    } else(0, i.logWarn)("The bid provided to triggerBilling did not match any bids received.")
                }
            },
            48176: (e, t, n) => {
                var r;
                (n.d(t, {
                    A: () => s,
                    g: () => a
                }), window.owpbjs) && console.warn("Namespace clash happened, with name: ".concat("window.owpbjs", ", now you can provide your custom namespace, by creating new profile version in the UI. Existing PWT version details: ", JSON.stringify(null === (r = window) || void 0 === r || null === (r = r.PWT) || void 0 === r ? void 0 : r.versionDetails)));
                const i = window,
                    o = i.owpbjs = i.owpbjs || {};

                function s() {
                    return o
                }

                function a(e) {
                    o.installedModules.push(e)
                }
                o.cmd = o.cmd || [], o.que = o.que || [], i === window && (i._pbjsGlobals = i._pbjsGlobals || [], i._pbjsGlobals.push("owpbjs"))
            },
            94228: (e, t, n) => {
                n.d(t, {
                    CS: () => c,
                    Y$: () => s
                });
                var r = n(65576),
                    i = n(28768);

                function o(e) {
                    let t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : window;
                    if (!e) return e;
                    if (/\w+:\/\//.exec(e)) return e;
                    let n = t.location.protocol;
                    try {
                        n = t.top.location.protocol
                    } catch (e) {}
                    return /^\/\//.exec(e) ? n + e : "".concat(n, "//").concat(e)
                }

                function s(e) {
                    let {
                        noLeadingWww: t = !1,
                        noPort: n = !1
                    } = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
                    try {
                        e = new URL(o(e))
                    } catch (e) {
                        return
                    }
                    return e = n ? e.hostname : e.host, t && e.startsWith("www.") && (e = e.substring(4)), e
                }

                function a(e) {
                    try {
                        const t = e.querySelector("link[rel='canonical']");
                        if (null !== t) return t.href
                    } catch (e) {}
                    return null
                }
                const c = function(e) {
                    let t, n, r, i = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : window;
                    return i.top !== i ? e : function() {
                        const o = a(i.document),
                            s = i.location.href;
                        return t === o && s === n || (t = o, n = s, r = e()), r
                    }
                }((d = window, function() {
                    const e = [],
                        t = function(e) {
                            try {
                                if (!e.location.ancestorOrigins) return;
                                return e.location.ancestorOrigins
                            } catch (e) {}
                        }(d),
                        n = r.config.getConfig("maxNestedIframes");
                    let c, l, u, f, g = !1,
                        p = 0,
                        m = !1,
                        h = !1,
                        b = !1;
                    do {
                        const n = c,
                            r = h;
                        let o, s = !1,
                            f = null;
                        h = !1, c = c ? c.parent : d;
                        try {
                            o = c.location.href || null
                        } catch (e) {
                            s = !0
                        }
                        if (s)
                            if (r) {
                                const e = n.context;
                                try {
                                    f = e.sourceUrl, l = f, b = !0, m = !0, c === d.top && (g = !0), e.canonicalUrl && (u = e.canonicalUrl)
                                } catch (e) {}
                            } else {
                                (0, i.logWarn)("Trying to access cross domain iframe. Continuing without referrer and location");
                                try {
                                    const e = n.document.referrer;
                                    e && (f = e, c === d.top && (g = !0))
                                } catch (e) {}!f && t && t[p - 1] && (f = t[p - 1], c === d.top && (b = !0)), f && !m && (l = f)
                            }
                        else {
                            if (o && (f = o, l = f, m = !1, c === d.top)) {
                                g = !0;
                                const e = a(c.document);
                                e && (u = e)
                            }
                            c.context && c.context.sourceUrl && (h = !0)
                        }
                        e.push(f), p++
                    } while (c !== d.top && p < n);
                    e.reverse();
                    try {
                        f = d.top.document.referrer
                    } catch (e) {}
                    const y = g || b ? l : null,
                        v = r.config.getConfig("pageUrl") || u || null;
                    let E = r.config.getConfig("pageUrl") || y || o(v, d);
                    return y && y.indexOf("?") > -1 && -1 === E.indexOf("?") && (E = "".concat(E).concat(y.substring(y.indexOf("?")))), {
                        reachedTop: g,
                        isAmp: m,
                        numIframes: p - 1,
                        stack: e,
                        topmostLocation: l || null,
                        location: y,
                        canonicalUrl: v,
                        page: E,
                        domain: s(E) || null,
                        ref: f || null,
                        legacy: {
                            reachedTop: g,
                            isAmp: m,
                            numIframes: p - 1,
                            stack: e,
                            referer: l || null,
                            canonicalUrl: v
                        }
                    }
                }));
                var d
            },
            97200: (e, t, n) => {
                n.d(t, {
                    KX: () => h,
                    NO: () => p,
                    SM: () => f,
                    on: () => g,
                    w$: () => b
                });
                var r = n(28768),
                    i = n(16923),
                    o = n(39824),
                    s = n(53260),
                    a = n(74228),
                    c = n(95960),
                    d = n(65576),
                    l = n(12576),
                    u = n(88176);
                const f = "html5",
                    g = "cookie";
                let p = [];

                function m() {
                    let {
                        moduleName: e,
                        moduleType: t
                    } = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}, {
                        isAllowed: n = s.ic
                    } = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};

                    function i(r, i) {
                        let s = e;
                        const f = d.config.getCurrentBidder();
                        f && t === o.Yf && l.cp.aliasRegistry[f] === e && (s = f);
                        return r({
                            valid: n(c.Y$, (0, u.Q)(t, s, {
                                [a.cb]: i
                            }))
                        })
                    }

                    function m(e, t, n) {
                        if (!n || "function" != typeof n) return i(e, t);
                        p.push((function() {
                            let r = i(e, t);
                            n(r)
                        }))
                    }
                    const h = function(e) {
                        return m((function(e) {
                            if (e && e.valid) try {
                                return !!window.localStorage
                            } catch (e) {
                                (0, r.logError)("Local storage api disabled")
                            }
                            return !1
                        }), f, e)
                    };
                    return {
                        setCookie: function(e, t, n, r, i, o) {
                            return m((function(o) {
                                if (o && o.valid) {
                                    const o = i && "" !== i ? " ;domain=".concat(encodeURIComponent(i)) : "",
                                        s = n && "" !== n ? " ;expires=".concat(n) : "",
                                        a = null != r && "none" == r.toLowerCase() ? "; Secure" : "";
                                    document.cookie = "".concat(e, "=").concat(encodeURIComponent(t)).concat(s, "; path=/").concat(o).concat(r ? "; SameSite=".concat(r) : "").concat(a)
                                }
                            }), g, o)
                        },
                        getCookie: function(e, t) {
                            return m((function(t) {
                                if (t && t.valid) {
                                    let t = window.document.cookie.match("(^|;)\\s*" + e + "\\s*=\\s*([^;]*)\\s*(;|$)");
                                    return t ? decodeURIComponent(t[2]) : null
                                }
                                return null
                            }), g, t)
                        },
                        localStorageIsEnabled: function(e) {
                            return m((function(e) {
                                if (e && e.valid) try {
                                    return localStorage.setItem("prebid.cookieTest", "1"), "1" === localStorage.getItem("prebid.cookieTest")
                                } catch (e) {} finally {
                                    try {
                                        localStorage.removeItem("prebid.cookieTest")
                                    } catch (e) {}
                                }
                                return !1
                            }), f, e)
                        },
                        cookiesAreEnabled: function(e) {
                            return m((function(e) {
                                return !(!e || !e.valid) && (0, r.checkCookieSupport)()
                            }), g, e)
                        },
                        setDataInLocalStorage: function(e, t, n) {
                            return m((function(n) {
                                n && n.valid && h() && window.localStorage.setItem(e, t)
                            }), f, n)
                        },
                        getDataFromLocalStorage: function(e, t) {
                            return m((function(t) {
                                return t && t.valid && h() ? window.localStorage.getItem(e) : null
                            }), f, t)
                        },
                        removeDataFromLocalStorage: function(e, t) {
                            return m((function(t) {
                                t && t.valid && h() && window.localStorage.removeItem(e)
                            }), f, t)
                        },
                        hasLocalStorage: h,
                        findSimilarCookies: function(e, t) {
                            return m((function(t) {
                                if (t && t.valid) {
                                    const t = [];
                                    if ((0, r.hasDeviceAccess)()) {
                                        const n = document.cookie.split(";");
                                        for (; n.length;) {
                                            const r = n.pop();
                                            let i = r.indexOf("=");
                                            i = i < 0 ? r.length : i;
                                            decodeURIComponent(r.slice(0, i).replace(/^\s+/, "")).indexOf(e) >= 0 && t.push(decodeURIComponent(r.slice(i + 1)))
                                        }
                                    }
                                    return t
                                }
                            }), g, t)
                        }
                    }
                }

                function h() {
                    let {
                        moduleType: e,
                        moduleName: t,
                        bidderCode: n
                    } = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};

                    function r() {
                        throw new Error("Invalid invocation for getStorageManager: must set either bidderCode, or moduleType + moduleName")
                    }
                    return n ? ((e && e !== o.Yf || t) && r(), e = o.Yf, t = n) : t && e || r(), m({
                        moduleType: e,
                        moduleName: t
                    })
                }

                function b(e) {
                    return m({
                        moduleName: e,
                        moduleType: o.AF
                    })
                }(0, s.u6)(c.Y$, "deviceAccess config", (function() {
                    if (!(0, r.hasDeviceAccess)()) return {
                        allow: !1
                    }
                })), (0, s.u6)(c.Y$, "bidderSettings.*.storageAllowed", (function(e) {
                    let t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : i.m;
                    if (e[a.Eb] !== o.Yf) return;
                    let n = t.get(e[a.wT], "storageAllowed");
                    if (n && !0 !== n) {
                        const t = e[a.cb];
                        n = Array.isArray(n) ? n.some((e => e === t)) : n === t
                    } else n = !!n;
                    return n ? void 0 : {
                        allow: n
                    }
                }))
            },
            8892: (e, t, n) => {
                n.d(t, {
                    Ks: () => A,
                    SO: () => w,
                    U7: () => C,
                    sZ: () => T
                });
                var r = n(28768),
                    i = n(52420),
                    o = n(65576),
                    s = n(68332),
                    a = n(71695),
                    c = n(48636),
                    d = n(74712),
                    l = n(16923),
                    u = n(11636),
                    f = n(16112),
                    g = n(16259),
                    p = n(91500),
                    m = [];
                const h = "targetingControls.allowTargetingKeys",
                    b = "targetingControls.addTargetingKeys",
                    y = 'Only one of "'.concat(h, '" or "').concat(b, '" can be set'),
                    v = Object.keys(f.TARGETING_KEYS).map((e => f.TARGETING_KEYS[e]));
                let E = {
                    isActualBid: e => e.getStatusCode() === f.bL.I,
                    isBidNotExpired: e => e.responseTimestamp + 1e3 * (0, p.o)(e) > (0, r.timestamp)(),
                    isUnusedBid: e => e && (e.status && !(0, u.KM)([f.BID_STATUS.RENDERED], e.status) || !e.status)
                };

                function w(e) {
                    return !Object.values(E).some((t => !t(e)))
                }
                const T = (0, d.Ok)("sync", (function(e, t) {
                    let n = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : 0;
                    if (!(arguments.length > 3 && void 0 !== arguments[3] && arguments[3])) {
                        const i = [],
                            s = o.config.getConfig("sendBidsControl.dealPrioritization");
                        let a = (0, r.groupBy)(e, "adUnitCode");
                        return Object.keys(a).forEach((e => {
                            let o = [],
                                c = (0, r.groupBy)(a[e], "bidderCode");
                            Object.keys(c).forEach((e => o.push(c[e].reduce(t)))), n > 0 ? (o = s ? o.sort(A(!0)) : o.sort(((e, t) => t.cpm - e.cpm)), i.push(...o.slice(0, n))) : i.push(...o)
                        })), i
                    }
                    return e
                }));

                function A() {
                    let e = arguments.length > 0 && void 0 !== arguments[0] && arguments[0];
                    return function(t, n) {
                        return void 0 !== t.adserverTargeting.hb_deal && void 0 === n.adserverTargeting.hb_deal ? -1 : void 0 === t.adserverTargeting.hb_deal && void 0 !== n.adserverTargeting.hb_deal ? 1 : e ? n.cpm - t.cpm : n.adserverTargeting.hb_pb - t.adserverTargeting.hb_pb
                    }
                }
                const C = function(e) {
                    let t = {},
                        n = {};

                    function a(e, t) {
                        return e.adserverTargeting && t && ((0, r.isArray)(t) && (0, u.KM)(t, e.adUnitCode) || "string" == typeof t && e.adUnitCode === t)
                    }

                    function d(t) {
                        return "string" == typeof t ? [t] : (0, r.isArray)(t) ? t : e.getAdUnitCodes() || []
                    }

                    function p() {
                        let t = e.getBidsReceived();
                        if (o.config.getConfig("useBidCache")) {
                            const e = o.config.getConfig("bidCacheFilterFunction");
                            "function" == typeof e && (t = t.filter((t => n[t.adUnitCode] === t.auctionId || !!e(t))))
                        } else t = t.filter((e => n[e.adUnitCode] === e.auctionId));
                        return t = t.filter((e => (0, i.c)(e, "video.context") !== c.So)).filter(w), t.forEach((e => (e.latestTargetedAuctionId = n[e.adUnitCode], e))), T(t, g.Az)
                    }

                    function E(e, n) {
                        let r = t.getWinningBids(e, n),
                            i = C();
                        return r = r.map((e => ({
                            [e.adUnitCode]: Object.keys(e.adserverTargeting).filter((t => void 0 === e.sendStandardTargeting || e.sendStandardTargeting || -1 === i.indexOf(t))).reduce(((t, n) => {
                                const r = [e.adserverTargeting[n]],
                                    i = {
                                        [n.substring(0, 20)]: r
                                    };
                                if (n === f.TARGETING_KEYS.DEAL) {
                                    const o = {
                                        ["".concat(n, "_").concat(e.bidderCode).substring(0, 20)]: r
                                    };
                                    return [...t, i, o]
                                }
                                return [...t, i]
                            }), [])
                        }))), r
                    }

                    function C() {
                        return e.getStandardBidderAdServerTargeting().map((e => e.key)).concat(v).filter(r.uniques)
                    }

                    function I(e, t, n, i) {
                        return Object.keys(t.adserverTargeting).filter(S()).forEach((n => {
                            e.length && e.filter(function(e) {
                                return function(n) {
                                    return n.adUnitCode === t.adUnitCode && n.adserverTargeting[e]
                                }
                            }(n)).forEach(function(e) {
                                return function(n) {
                                    (0, r.isArray)(n.adserverTargeting[e]) || (n.adserverTargeting[e] = [n.adserverTargeting[e]]), n.adserverTargeting[e] = n.adserverTargeting[e].concat(t.adserverTargeting[e]).filter(r.uniques), delete t.adserverTargeting[e]
                                }
                            }(n))
                        })), e.push(t), e
                    }

                    function S() {
                        let e = C();
                        return e = e.concat(s.mG),
                            function(t) {
                                return -1 === e.indexOf(t)
                            }
                    }

                    function k(e) {
                        return {
                            [e.adUnitCode]: Object.keys(e.adserverTargeting).filter(S()).map((t => ({
                                [t.substring(0, 20)]: [e.adserverTargeting[t]]
                            })))
                        }
                    }

                    function O(e, t) {
                        return t.map((t => ({
                            ["".concat(t, "_").concat(e.bidderCode).substring(0, 20)]: [e.adserverTargeting[t]]
                        })))
                    }
                    return t.setLatestAuctionForAdUnit = function(e, t) {
                        n[e] = t
                    }, t.resetPresetTargeting = function(t, n) {
                        if ((0, r.isGptPubadsDefined)()) {
                            const i = d(t),
                                o = e.getAdUnits().filter((e => (0, u.KM)(i, e.code)));
                            let s = m.reduce(((e, t) => (e[t] = null, e)), {});
                            window.googletag.pubads().getSlots().forEach((e => {
                                let t = (0, r.isFn)(n) && n(e);
                                o.forEach((n => {
                                    (n.code === e.getAdUnitPath() || n.code === e.getSlotElementId() || (0, r.isFn)(t) && t(n.code)) && e.updateTargetingFromMap(s)
                                }))
                            }))
                        }
                    }, t.resetPresetTargetingAST = function(e) {
                        d(e).forEach((function(e) {
                            const t = window.apntag.getTag(e);
                            if (t && t.keywords) {
                                const n = Object.keys(t.keywords),
                                    r = {};
                                n.forEach((e => {
                                    (0, u.KM)(m, e.toLowerCase()) || (r[e] = t.keywords[e])
                                })), window.apntag.modifyTag(e, {
                                    keywords: r
                                })
                            }
                        }))
                    }, t.getAllTargeting = function(t) {
                        let n = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : p();
                        const c = d(t);
                        var l = E(c, n).concat(function(e, t) {
                            return t.filter((t => (0, u.KM)(e, t.adUnitCode))).map((e => Object.assign({}, e))).reduce(I, []).map(k).filter((e => e))
                        }(c, n)).concat(o.config.getConfig("enableSendAllBids") ? function(e, t) {
                            const n = v.concat(s.mG),
                                r = o.config.getConfig("sendBidsControl.bidLimit"),
                                i = T(t, g.Cm, r),
                                c = o.config.getConfig("targetingControls.allowSendAllBidsTargetingKeys"),
                                d = c ? c.map((e => f.TARGETING_KEYS[e])) : n;
                            return i.map((t => {
                                if (a(t, e)) return {
                                    [t.adUnitCode]: O(t, n.filter((e => void 0 !== t.adserverTargeting[e] && -1 !== d.indexOf(e))))
                                }
                            })).filter((e => e))
                        }(c, n) : function(e, t) {
                            if (!0 === o.config.getConfig("targetingControls.alwaysIncludeDeals")) {
                                const n = v.concat(s.mG);
                                return T(t, g.Cm).map((t => {
                                    if (t.dealId && a(t, e)) return {
                                        [t.adUnitCode]: O(t, n.filter((e => void 0 !== t.adserverTargeting[e])))
                                    }
                                })).filter((e => e))
                            }
                            return []
                        }(c, n)).concat(function(t) {
                            function n(e) {
                                return (0, i.c)(e, f.L7.s1)
                            }

                            function o(e) {
                                const t = n(e);
                                return Object.keys(t).map((function(e) {
                                    return (0, r.isStr)(t[e]) && (t[e] = t[e].split(",").map((e => e.trim()))), (0, r.isArray)(t[e]) || (t[e] = [t[e]]), {
                                        [e]: t[e]
                                    }
                                }))
                            }
                            return e.getAdUnits().filter((e => (0, u.KM)(t, e.code) && n(e))).map((e => ({
                                [e.code]: o(e)
                            })))
                        }(c));
                        l.map((e => {
                            Object.keys(e).map((t => {
                                e[t].map((e => {
                                    -1 === m.indexOf(Object.keys(e)[0]) && (m = Object.keys(e).concat(m))
                                }))
                            }))
                        }));
                        const w = Object.keys(Object.assign({}, f.YJ, f.NATIVE_KEYS));
                        let C = o.config.getConfig(h);
                        const S = o.config.getConfig(b);
                        if (null != S && null != C) throw new Error(y);
                        C = null != S ? w.concat(S) : C || w, Array.isArray(C) && C.length > 0 && (l = function(e, t) {
                            const n = Object.assign({}, f.TARGETING_KEYS, f.NATIVE_KEYS),
                                i = Object.keys(n),
                                o = {};
                            (0, r.logInfo)("allowTargetingKeys - allowed keys [ ".concat(t.map((e => n[e])).join(", "), " ]")), e.map((e => {
                                const r = Object.keys(e)[0],
                                    s = e[r].filter((e => {
                                        const r = Object.keys(e)[0],
                                            s = 0 === i.filter((e => 0 === r.indexOf(n[e]))).length || (0, u.iw)(t, (e => {
                                                const t = n[e];
                                                return 0 === r.indexOf(t)
                                            }));
                                        return o[r] = !s, s
                                    }));
                                e[r] = s
                            }));
                            const s = Object.keys(o).filter((e => o[e]));
                            return (0, r.logInfo)("allowTargetingKeys - removed keys [ ".concat(s.join(", "), " ]")), e.filter((e => e[Object.keys(e)[0]].length > 0))
                        }(l, C)), l = function(e) {
                            let t = e.map((e => ({
                                [Object.keys(e)[0]]: e[Object.keys(e)[0]].map((e => ({
                                    [Object.keys(e)[0]]: e[Object.keys(e)[0]].join(",")
                                }))).reduce(((e, t) => Object.assign(t, e)), {})
                            }))).reduce((function(e, t) {
                                var n = Object.keys(t)[0];
                                return e[n] = Object.assign({}, e[n], t[n]), e
                            }), {});
                            return t
                        }(l);
                        const B = o.config.getConfig("targetingControls.auctionKeyMaxChars");
                        return B && ((0, r.logInfo)("Detected 'targetingControls.auctionKeyMaxChars' was active for this auction; set with a limit of ".concat(B, " characters.  Running checks on auction keys...")), l = function(e, t) {
                            let n = (0, r.deepClone)(e),
                                i = Object.keys(n).map((e => ({
                                    adUnitCode: e,
                                    adserverTargeting: n[e]
                                }))).sort(A());
                            return i.reduce((function(e, i, o, s) {
                                let a = (c = i.adserverTargeting, Object.keys(c).reduce((function(e, t) {
                                    return e + "".concat(t, "%3d").concat(encodeURIComponent(c[t]), "%26")
                                }), ""));
                                var c;
                                o + 1 === s.length && (a = a.slice(0, -3));
                                let d = i.adUnitCode,
                                    l = a.length;
                                return l <= t ? (t -= l, (0, r.logInfo)("AdUnit '".concat(d, "' auction keys comprised of ").concat(l, " characters.  Deducted from running threshold; new limit is ").concat(t), n[d]), e[d] = n[d]) : (0, r.logWarn)("The following keys for adUnitCode '".concat(d, "' exceeded the current limit of the 'auctionKeyMaxChars' setting.\nThe key-set size was ").concat(l, ", the current allotted amount was ").concat(t, ".\n"), n[d]), o + 1 === s.length && 0 === Object.keys(e).length && (0, r.logError)("No auction targeting keys were permitted due to the setting in setConfig(targetingControls.auctionKeyMaxChars).  Please review setup and consider adjusting."), e
                            }), {})
                        }(l, B)), c.forEach((e => {
                            l[e] || (l[e] = {})
                        })), l
                    }, o.config.getConfig("targetingControls", (function(e) {
                        null != (0, i.c)(e, h) && null != (0, i.c)(e, b) && (0, r.logError)(y)
                    })), t.setTargetingForGPT = function(e, t) {
                        window.googletag.pubads().getSlots().forEach((n => {
                            Object.keys(e).filter(t ? t(n) : (0, r.isAdUnitCodeMatchingSlot)(n)).forEach((t => {
                                Object.keys(e[t]).forEach((n => {
                                    let r = e[t][n];
                                    "string" == typeof r && -1 !== r.indexOf(",") && (r = r.split(",")), e[t][n] = r
                                })), (0, r.logMessage)("Attempting to set targeting-map for slot: ".concat(n.getSlotElementId(), " with targeting-map:"), e[t]), n.updateTargetingFromMap(e[t])
                            }))
                        }))
                    }, t.getWinningBids = function(e) {
                        let t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : p();
                        const n = d(e);
                        return t.filter((e => (0, u.KM)(n, e.adUnitCode))).filter((e => !0 === l.m.get(e.bidderCode, "allowZeroCpmBids") ? e.cpm >= 0 : e.cpm > 0)).map((e => e.adUnitCode)).filter(r.uniques).map((e => t.filter((t => t.adUnitCode === e ? t : null)).reduce(g.Cm)))
                    }, t.setTargetingForAst = function(e) {
                        let n = t.getAllTargeting(e);
                        try {
                            t.resetPresetTargetingAST(e)
                        } catch (e) {
                            (0, r.logError)("unable to reset targeting for AST" + e)
                        }
                        Object.keys(n).forEach((e => Object.keys(n[e]).forEach((t => {
                            if ((0, r.logMessage)("Attempting to set targeting for targetId: ".concat(e, " key: ").concat(t, " value: ").concat(n[e][t])), (0, r.isStr)(n[e][t]) || (0, r.isArray)(n[e][t])) {
                                let r = {},
                                    i = /pt[0-9]/;
                                t.search(i) < 0 ? r[t.toUpperCase()] = n[e][t] : r[t] = n[e][t], window.apntag.setKeywords(e, r, {
                                    overrideKeyValue: !0
                                })
                            }
                        }))))
                    }, t.isApntagDefined = function() {
                        if (window.apntag && (0, r.isFn)(window.apntag.setKeywords)) return !0
                    }, t
                }(a.M)
            },
            51840: (e, t, n) => {
                n.d(t, {
                    M: () => f,
                    userSync: () => p
                });
                var r = n(28768),
                    i = n(65576),
                    o = n(11636),
                    s = n(97200),
                    a = n(53260),
                    c = n(95960),
                    d = n(74228),
                    l = n(39824),
                    u = n(88176);
                const f = {
                    syncEnabled: !0,
                    filterSettings: {
                        image: {
                            bidders: "*",
                            filter: "include"
                        }
                    },
                    syncsPerBidder: 5,
                    syncDelay: 3e3,
                    auctionDelay: 0
                };
                i.config.setDefaults({
                    userSync: (0, r.deepClone)(f)
                });
                const g = (0, s.w$)("usersync");
                const p = function(e) {
                    let t = {},
                        n = {
                            image: [],
                            iframe: []
                        },
                        s = new Set,
                        a = {},
                        f = {
                            image: !0,
                            iframe: !1
                        },
                        g = e.config;

                    function p() {
                        if (g.syncEnabled && e.browserSupportsCookies) {
                            try {
                                ! function() {
                                    if (!f.iframe) return;
                                    m(n.iframe, (e => {
                                        let [t, i] = e;
                                        (0, r.logMessage)("Invoking iframe user sync for bidder: ".concat(t)), (0, r.insertUserSyncIframe)(i),
                                        function(e, t) {
                                            e.image = e.image.filter((e => e[0] !== t))
                                        }(n, t)
                                    }))
                                }(),
                                function() {
                                    if (!f.image) return;
                                    m(n.image, (e => {
                                        let [t, n] = e;
                                        (0, r.logMessage)("Invoking image pixel user sync for bidder: ".concat(t)), (0, r.triggerPixel)(n)
                                    }))
                                }()
                            } catch (e) {
                                return (0, r.logError)("Error firing user syncs", e)
                            }
                            n = {
                                image: [],
                                iframe: []
                            }
                        }
                    }

                    function m(e, t) {
                        (0, r.shuffle)(e).forEach(t)
                    }

                    function h(e, t) {
                        let n = g.filterSettings;
                        if (function(e, t) {
                                if (e.all && e[t]) return (0, r.logWarn)('Detected presence of the "filterSettings.all" and "filterSettings.'.concat(t, '" in userSync config.  You cannot mix "all" with "iframe/image" configs; they are mutually exclusive.')), !1;
                                let n = e.all ? e.all : e[t],
                                    i = e.all ? "all" : t;
                                if (!n) return !1;
                                let o = n.filter,
                                    s = n.bidders;
                                if (o && "include" !== o && "exclude" !== o) return (0, r.logWarn)('UserSync "filterSettings.'.concat(i, ".filter\" setting '").concat(o, "' is not a valid option; use either 'include' or 'exclude'.")), !1;
                                if ("*" !== s && !(Array.isArray(s) && s.length > 0 && s.every((e => (0, r.isStr)(e) && "*" !== e)))) return (0, r.logWarn)('Detected an invalid setup in userSync "filterSettings.'.concat(i, ".bidders\"; use either '*' (to represent all bidders) or an array of bidders.")), !1;
                                return !0
                            }(n, e)) {
                            f[e] = !0;
                            let r = n.all ? n.all : n[e],
                                i = "*" === r.bidders ? [t] : r.bidders;
                            const s = {
                                include: (e, t) => !(0, o.KM)(e, t),
                                exclude: (e, t) => (0, o.KM)(e, t)
                            };
                            return s[r.filter || "include"](i, t)
                        }
                        return !f[e]
                    }
                    return i.config.getConfig("userSync", (e => {
                        if (e.userSync) {
                            let t = e.userSync.filterSettings;
                            (0, r.isPlainObject)(t) && (t.image || t.all || (e.userSync.filterSettings.image = {
                                bidders: "*",
                                filter: "include"
                            }))
                        }
                        g = Object.assign(g, e.userSync)
                    })), e.regRule(c.Wi, "userSync config", (e => {
                        if (!g.syncEnabled) return {
                            allow: !1,
                            reason: "syncs are disabled"
                        };
                        if (e[d.Eb] === l.Yf) {
                            const n = e[d.aE],
                                r = e[d.W2];
                            if (!t.canBidderRegisterSync(n, r)) return {
                                allow: !1,
                                reason: "".concat(n, " syncs are not enabled for ").concat(r)
                            }
                        }
                    })), t.registerSync = (t, i, o) => s.has(i) ? (0, r.logMessage)('already fired syncs for "'.concat(i, '", ignoring registerSync call')) : g.syncEnabled && (0, r.isArray)(n[t]) ? i ? 0 !== g.syncsPerBidder && Number(a[i]) >= g.syncsPerBidder ? (0, r.logWarn)('Number of user syncs exceeded for "'.concat(i, '"')) : void(e.isAllowed(c.Wi, (0, u.Q)(l.Yf, i, {
                        [d.aE]: t,
                        [d.QN]: o
                    })) && (n[t].push([i, o]), a = function(e, t) {
                        return e[t] ? e[t] += 1 : e[t] = 1, e
                    }(a, i))) : (0, r.logWarn)("Bidder is required for registering sync") : (0, r.logWarn)('User sync type "'.concat(t, '" not supported')), t.bidderDone = s.add.bind(s), t.syncUsers = function() {
                        let e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : 0;
                        if (e) return setTimeout(p, Number(e));
                        p()
                    }, t.triggerUserSyncs = () => {
                        g.enableOverride && t.syncUsers()
                    }, t.canBidderRegisterSync = (e, t) => !g.filterSettings || !h(e, t), t
                }(Object.defineProperties({
                    config: i.config.getConfig("userSync"),
                    isAllowed: a.ic,
                    regRule: a.u6
                }, {
                    browserSupportsCookies: {
                        get: function() {
                            return !(0, r.isSafariBrowser)() && g.cookiesAreEnabled()
                        }
                    }
                }))
            },
            28768: (e, t, n) => {
                n.r(t), n.d(t, {
                    _each: () => de,
                    _map: () => ue,
                    _setEventEmitter: () => I,
                    binarySearch: () => ct,
                    buildUrl: () => et,
                    callBurl: () => me,
                    checkCookieSupport: () => qe,
                    cleanObj: () => Ye,
                    compareCodeAndSlot: () => Le,
                    contains: () => le,
                    createInvisibleIframe: () => X,
                    createTrackPixelHtml: () => ye,
                    createTrackPixelIframeHtml: () => ve,
                    cyrb53Hash: () => rt,
                    debugTurnedOn: () => $,
                    deepAccess: () => l.c,
                    deepClone: () => Oe,
                    deepEqual: () => tt,
                    deepSetValue: () => u.e,
                    delayExecution: () => xe,
                    flatten: () => we,
                    formatQS: () => Xe,
                    generateUUID: () => N,
                    getBidIdParameter: () => D,
                    getBidRequest: () => Te,
                    getBidderCodes: () => Ce,
                    getDNT: () => Ge,
                    getDefinedParams: () => We,
                    getParameterByName: () => Z,
                    getPerformanceNow: () => _e,
                    getPrebidInternal: () => B,
                    getUniqueIdentifierStr: () => j,
                    getUserConfiguredParams: () => Fe,
                    getValue: () => Ae,
                    getWindowLocation: () => G,
                    getWindowSelf: () => F,
                    getWindowTop: () => K,
                    groupBy: () => Pe,
                    hasConsoleLogger: () => J,
                    hasDeviceAccess: () => Me,
                    inIframe: () => Be,
                    insertElement: () => fe,
                    insertHtmlIntoIframe: () => he,
                    insertUserSyncIframe: () => be,
                    internal: () => k,
                    isA: () => ee,
                    isAdUnitCodeMatchingSlot: () => Ve,
                    isApnGetTagDefined: () => Se,
                    isArray: () => re,
                    isArrayOfNums: () => Je,
                    isBoolean: () => se,
                    isEmpty: () => ae,
                    isEmptyStr: () => ce,
                    isFn: () => te,
                    isGptPubadsDefined: () => Ie,
                    isInteger: () => He,
                    isNumber: () => ie,
                    isPlainObject: () => oe,
                    isSafariBrowser: () => Ue,
                    isStr: () => ne,
                    isValidMediaTypes: () => Ke,
                    logError: () => H,
                    logInfo: () => V,
                    logMessage: () => L,
                    logWarn: () => z,
                    memoize: () => st,
                    mergeDeep: () => nt,
                    parseGPTSingleSizeArray: () => x,
                    parseGPTSingleSizeArrayToRtbSize: () => P,
                    parseQS: () => $e,
                    parseQueryStringParameters: () => _,
                    parseSizesInput: () => q,
                    parseUrl: () => Ze,
                    pick: () => Qe,
                    prefixLog: () => Y,
                    replaceAuctionPrice: () => je,
                    replaceClickThrough: () => Ne,
                    replaceMacros: () => Re,
                    safeJSONParse: () => ot,
                    setScriptAttributes: () => at,
                    shuffle: () => ke,
                    skipUndefinedValues: () => it,
                    timestamp: () => De,
                    transformAdServerTargetingObj: () => M,
                    triggerPixel: () => pe,
                    uniques: () => Ee,
                    unsupportedBidderMessage: () => ze,
                    waitForElementToLoad: () => ge
                });
                var r = n(65576),
                    i = n(86288),
                    o = n.n(i),
                    s = n(11636),
                    a = n(16112),
                    c = n(86576),
                    d = n(48176),
                    l = n(52420),
                    u = n(79344),
                    f = "String",
                    g = "Function",
                    p = "Number",
                    m = "Object",
                    h = "Boolean",
                    b = Object.prototype.toString;
                let y, v = Boolean(window.console),
                    E = Boolean(v && window.console.log),
                    w = Boolean(v && window.console.info),
                    T = Boolean(v && window.console.warn),
                    A = Boolean(v && window.console.error);
                const C = (0, d.A)();

                function I(e) {
                    y = e
                }

                function S() {
                    null != y && y(...arguments)
                }
                const k = {
                    checkCookieSupport: qe,
                    createTrackPixelIframeHtml: ve,
                    getWindowSelf: F,
                    getWindowTop: K,
                    getWindowLocation: G,
                    insertUserSyncIframe: be,
                    insertElement: fe,
                    isFn: te,
                    triggerPixel: pe,
                    logError: H,
                    logWarn: z,
                    logMessage: L,
                    logInfo: V,
                    parseQS: $e,
                    formatQS: Xe,
                    deepEqual: tt,
                    isEmpty: ae,
                    skipUndefinedValues: it
                };
                let O = {};

                function B() {
                    return O
                }
                var U, R = (U = 0, function() {
                    return ++U
                });

                function j() {
                    return R() + Math.random().toString(16).substr(2)
                }

                function N(e) {
                    return e ? (e ^ (window && window.crypto && window.crypto.getRandomValues ? crypto.getRandomValues(new Uint8Array(1))[0] % 16 : 16 * Math.random()) >> e / 4).toString(16) : ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, N)
                }

                function D(e, t) {
                    return (null == t ? void 0 : t[e]) || ""
                }

                function _(e) {
                    let t = "";
                    for (var n in e) e.hasOwnProperty(n) && (t += n + "=" + encodeURIComponent(e[n]) + "&");
                    return t = t.replace(/&$/, ""), t
                }

                function M(e) {
                    return e && Object.getOwnPropertyNames(e).length > 0 ? Object.keys(e).map((t => "".concat(t, "=").concat(encodeURIComponent(e[t])))).join("&") : ""
                }

                function q(e) {
                    return "string" == typeof e ? e.split(",").filter((e => e.match(/^(\d)+x(\d)+$/i))) : "object" == typeof e ? 2 === e.length && "number" == typeof e[0] && "number" == typeof e[1] ? [x(e)] : e.map(x) : []
                }

                function x(e) {
                    if (W(e)) return e[0] + "x" + e[1]
                }

                function P(e) {
                    if (W(e)) return {
                        w: e[0],
                        h: e[1]
                    }
                }

                function W(e) {
                    return re(e) && 2 === e.length && !isNaN(e[0]) && !isNaN(e[1])
                }

                function K() {
                    return window.top
                }

                function F() {
                    return window.self
                }

                function G() {
                    return window.location
                }

                function L() {
                    $() && E && console.log.apply(console, Q(arguments, "MESSAGE:"))
                }

                function V() {
                    $() && w && console.info.apply(console, Q(arguments, "INFO:"))
                }

                function z() {
                    $() && T && console.warn.apply(console, Q(arguments, "WARNING:")), S(a.EVENTS.AUCTION_DEBUG, {
                        type: "WARNING",
                        arguments
                    })
                }

                function H() {
                    $() && A && console.error.apply(console, Q(arguments, "ERROR:")), S(a.EVENTS.AUCTION_DEBUG, {
                        type: "ERROR",
                        arguments
                    })
                }

                function Y(e) {
                    function t(t) {
                        return function() {
                            for (var n = arguments.length, r = new Array(n), i = 0; i < n; i++) r[i] = arguments[i];
                            t(e, ...r)
                        }
                    }
                    return {
                        logError: t(H),
                        logWarn: t(z),
                        logMessage: t(L),
                        logInfo: t(V)
                    }
                }

                function Q(e, t) {
                    e = [].slice.call(e);
                    let n = r.config.getCurrentBidder();
                    return t && e.unshift(t), n && e.unshift(i("#aaa")), e.unshift(i("#3b88c3")), e.unshift("%cPrebid" + (n ? "%c".concat(n) : "")), e;

                    function i(e) {
                        return "display: inline-block; color: #fff; background: ".concat(e, "; padding: 1px 4px; border-radius: 3px;")
                    }
                }

                function J() {
                    return E
                }

                function $() {
                    return !!r.config.getConfig("debug")
                }

                function X() {
                    var e = document.createElement("iframe");
                    return e.id = j(), e.height = 0, e.width = 0, e.border = "0px", e.hspace = "0", e.vspace = "0", e.marginWidth = "0", e.marginHeight = "0", e.style.border = "0", e.scrolling = "no", e.frameBorder = "0", e.src = "about:blank", e.style.display = "none", e.style.height = "0px", e.style.width = "0px", e.allowtransparency = "true", e
                }

                function Z(e) {
                    return $e(G().search)[e] || ""
                }

                function ee(e, t) {
                    return b.call(e) === "[object " + t + "]"
                }

                function te(e) {
                    return ee(e, g)
                }

                function ne(e) {
                    return ee(e, f)
                }
                const re = Array.isArray.bind(Array);

                function ie(e) {
                    return ee(e, p)
                }

                function oe(e) {
                    return ee(e, m)
                }

                function se(e) {
                    return ee(e, h)
                }

                function ae(e) {
                    return !e || (re(e) || ne(e) ? !(e.length > 0) : Object.keys(e).length <= 0)
                }

                function ce(e) {
                    return ne(e) && (!e || 0 === e.length)
                }

                function de(e, t) {
                    if (te(null == e ? void 0 : e.forEach)) return e.forEach(t, this);
                    Object.entries(e || {}).forEach((e => {
                        let [n, r] = e;
                        return t.call(this, r, n)
                    }))
                }

                function le(e, t) {
                    return te(null == e ? void 0 : e.includes) && e.includes(t)
                }

                function ue(e, t) {
                    return te(null == e ? void 0 : e.map) ? e.map(t) : Object.entries(e || {}).map((n => {
                        let [r, i] = n;
                        return t(i, r, e)
                    }))
                }

                function fe(e, t, n, r) {
                    let i;
                    t = t || document, i = n ? t.getElementsByTagName(n) : t.getElementsByTagName("head");
                    try {
                        if (i = i.length ? i : t.getElementsByTagName("body"), i.length) {
                            i = i[0];
                            let t = r ? null : i.firstChild;
                            return i.insertBefore(e, t)
                        }
                    } catch (e) {}
                }

                function ge(e, t) {
                    let n = null;
                    return new c.i((r => {
                        const i = function() {
                            e.removeEventListener("load", i), e.removeEventListener("error", i), null != n && window.clearTimeout(n), r()
                        };
                        e.addEventListener("load", i), e.addEventListener("error", i), null != t && (n = window.setTimeout(i, t))
                    }))
                }

                function pe(e, t, n) {
                    const r = new Image;
                    t && k.isFn(t) && ge(r, n).then(t), r.src = e
                }

                function me(e) {
                    let {
                        source: t,
                        burl: n
                    } = e;
                    t === a.xP.iu && n && k.triggerPixel(n)
                }

                function he(e) {
                    if (!e) return;
                    const t = X();
                    var n;
                    k.insertElement(t, document, "body"), (n = t.contentWindow.document).open(), n.write(e), n.close()
                }

                function be(e, t, n) {
                    let r = k.createTrackPixelIframeHtml(e, !1, "allow-scripts allow-same-origin"),
                        i = document.createElement("div");
                    i.innerHTML = r;
                    let o = i.firstChild;
                    t && k.isFn(t) && ge(o, n).then(t), k.insertElement(o, document, "html", !0)
                }

                function ye(e) {
                    if (!e) return "";
                    let t = '<div style="position:absolute;left:0px;top:0px;visibility:hidden;">';
                    return t += '<img src="' + encodeURI(e) + '"></div>', t
                }

                function ve(e) {
                    let t = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : "";
                    return e ? ((!(arguments.length > 1 && void 0 !== arguments[1]) || arguments[1]) && (e = encodeURI(e)), t && (t = 'sandbox="'.concat(t, '"')), "<iframe ".concat(t, ' id="').concat(j(), '"\n      frameborder="0"\n      allowtransparency="true"\n      marginheight="0" marginwidth="0"\n      width="0" hspace="0" vspace="0" height="0"\n      style="height:0px;width:0px;display:none;"\n      scrolling="no"\n      src="').concat(e, '">\n    </iframe>')) : ""
                }

                function Ee(e, t, n) {
                    return n.indexOf(e) === t
                }

                function we(e, t) {
                    return e.concat(t)
                }

                function Te(e, t) {
                    if (e) return t.flatMap((e => e.bids)).find((t => ["bidId", "adId", "bid_id"].some((n => t[n] === e))))
                }

                function Ae(e, t) {
                    return e[t]
                }

                function Ce() {
                    return (arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : C.adUnits).map((e => e.bids.map((e => e.bidder)).reduce(we, []))).reduce(we, []).filter((e => void 0 !== e)).filter(Ee)
                }

                function Ie() {
                    if (window.googletag && te(window.googletag.pubads) && te(window.googletag.pubads().getSlots)) return !0
                }

                function Se() {
                    if (window.apntag && te(window.apntag.getTag)) return !0
                }

                function ke(e) {
                    let t = e.length;
                    for (; t > 0;) {
                        let n = Math.floor(Math.random() * t);
                        t--;
                        let r = e[t];
                        e[t] = e[n], e[n] = r
                    }
                    return e
                }

                function Oe(e) {
                    return o()(e)
                }

                function Be() {
                    try {
                        return k.getWindowSelf() !== k.getWindowTop()
                    } catch (e) {
                        return !0
                    }
                }

                function Ue() {
                    return /^((?!chrome|android|crios|fxios).)*safari/i.test(navigator.userAgent)
                }

                function Re(e, t) {
                    if (e) return Object.entries(t).reduce(((e, t) => {
                        let [n, r] = t;
                        return e.replace(new RegExp("\\$\\{" + n + "\\}", "g"), r || "")
                    }), e)
                }

                function je(e, t) {
                    return Re(e, {
                        AUCTION_PRICE: t
                    })
                }

                function Ne(e, t) {
                    if (e && t && "string" == typeof t) return e.replace(/\${CLICKTHROUGH}/g, t)
                }

                function De() {
                    return (new Date).getTime()
                }

                function _e() {
                    return window.performance && window.performance.now && window.performance.now() || 0
                }

                function Me() {
                    return !1 !== r.config.getConfig("deviceAccess")
                }

                function qe() {
                    if (window.navigator.cookieEnabled || document.cookie.length) return !0
                }

                function xe(e, t) {
                    if (t < 1) throw new Error("numRequiredCalls must be a positive number. Got ".concat(t));
                    let n = 0;
                    return function() {
                        n++, n === t && e.apply(this, arguments)
                    }
                }

                function Pe(e, t) {
                    return e.reduce((function(e, n) {
                        return (e[n[t]] = e[n[t]] || []).push(n), e
                    }), {})
                }

                function We(e, t) {
                    return t.filter((t => e[t])).reduce(((t, n) => Object.assign(t, {
                        [n]: e[n]
                    })), {})
                }

                function Ke(e) {
                    const t = ["banner", "native", "video"],
                        n = ["instream", "outstream", "adpod"];
                    return !!Object.keys(e).every((e => (0, s.KM)(t, e))) && (!e.video || !e.video.context || (0, s.KM)(n, e.video.context))
                }

                function Fe(e, t, n) {
                    return e.filter((e => e.code === t)).flatMap((e => e.bids)).filter((e => e.bidder === n)).map((e => e.params || {}))
                }

                function Ge() {
                    return "1" === navigator.doNotTrack || "1" === window.doNotTrack || "1" === navigator.msDoNotTrack || "yes" === navigator.doNotTrack
                }
                const Le = (e, t) => e.getAdUnitPath() === t || e.getSlotElementId() === t;

                function Ve(e) {
                    return t => Le(e, t)
                }

                function ze(e, t) {
                    const n = Object.keys(e.mediaTypes || {
                        banner: "banner"
                    }).join(", ");
                    return "\n    ".concat(e.code, " is a ").concat(n, " ad unit\n    containing bidders that don't support ").concat(n, ": ").concat(t, ".\n    This bidder won't fetch demand.\n  ")
                }
                const He = Number.isInteger.bind(Number);

                function Ye(e) {
                    return Object.fromEntries(Object.entries(e).filter((e => {
                        let [t, n] = e;
                        return void 0 !== n
                    })))
                }

                function Qe(e, t) {
                    return "object" != typeof e ? {} : t.reduce(((n, r, i) => {
                        if ("function" == typeof r) return n;
                        let o = r,
                            s = r.match(/^(.+?)\sas\s(.+?)$/i);
                        s && (r = s[1], o = s[2]);
                        let a = e[r];
                        return "function" == typeof t[i + 1] && (a = t[i + 1](a, n)), void 0 !== a && (n[o] = a), n
                    }), {})
                }

                function Je(e, t) {
                    return re(e) && (!t || e.length === t) && e.every((e => He(e)))
                }

                function $e(e) {
                    return e ? e.replace(/^\?/, "").split("&").reduce(((e, t) => {
                        let [n, r] = t.split("=");
                        return /\[\]$/.test(n) ? (n = n.replace("[]", ""), e[n] = e[n] || [], e[n].push(r)) : e[n] = r || "", e
                    }), {}) : {}
                }

                function Xe(e) {
                    return Object.keys(e).map((t => Array.isArray(e[t]) ? e[t].map((e => "".concat(t, "[]=").concat(e))).join("&") : "".concat(t, "=").concat(e[t]))).join("&")
                }

                function Ze(e, t) {
                    let n = document.createElement("a");
                    t && "noDecodeWholeURL" in t && t.noDecodeWholeURL ? n.href = e : n.href = decodeURIComponent(e);
                    let r = t && "decodeSearchAsString" in t && t.decodeSearchAsString;
                    return {
                        href: n.href,
                        protocol: (n.protocol || "").replace(/:$/, ""),
                        hostname: n.hostname,
                        port: +n.port,
                        pathname: n.pathname.replace(/^(?!\/)/, "/"),
                        search: r ? n.search : k.parseQS(n.search || ""),
                        hash: (n.hash || "").replace(/^#/, ""),
                        host: n.host || window.location.host
                    }
                }

                function et(e) {
                    return (e.protocol || "http") + "://" + (e.host || e.hostname + (e.port ? ":".concat(e.port) : "")) + (e.pathname || "") + (e.search ? "?".concat(k.formatQS(e.search || "")) : "") + (e.hash ? "#".concat(e.hash) : "")
                }

                function tt(e, t) {
                    let {
                        checkTypes: n = !1
                    } = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {};
                    if (e === t) return !0;
                    if ("object" != typeof e || null === e || "object" != typeof t || null === t || n && e.constructor !== t.constructor) return !1;
                    if (Object.keys(e).length !== Object.keys(t).length) return !1;
                    for (let r in e) {
                        if (!t.hasOwnProperty(r)) return !1;
                        if (!tt(e[r], t[r], {
                                checkTypes: n
                            })) return !1
                    }
                    return !0
                }

                function nt(e) {
                    for (var t = arguments.length, n = new Array(t > 1 ? t - 1 : 0), r = 1; r < t; r++) n[r - 1] = arguments[r];
                    if (!n.length) return e;
                    const i = n.shift();
                    if (oe(e) && oe(i))
                        for (const t in i) oe(i[t]) ? (e[t] || Object.assign(e, {
                            [t]: {}
                        }), nt(e[t], i[t])) : re(i[t]) ? e[t] ? re(e[t]) && i[t].forEach((n => {
                            let r = 1;
                            for (let i = 0; i < e[t].length; i++)
                                if (tt(e[t][i], n)) {
                                    r = 0;
                                    break
                                } r && e[t].push(n)
                        })) : Object.assign(e, {
                            [t]: [...i[t]]
                        }) : Object.assign(e, {
                            [t]: i[t]
                        });
                    return nt(e, ...n)
                }

                function rt(e) {
                    let t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 0,
                        n = function(e, t) {
                            if (te(Math.imul)) return Math.imul(e, t);
                            var n = (4194303 & e) * (t |= 0);
                            return 4290772992 & e && (n += (4290772992 & e) * t | 0), 0 | n
                        },
                        r = 3735928559 ^ t,
                        i = 1103547991 ^ t;
                    for (let t, o = 0; o < e.length; o++) t = e.charCodeAt(o), r = n(r ^ t, 2654435761), i = n(i ^ t, 1597334677);
                    return r = n(r ^ r >>> 16, 2246822507) ^ n(i ^ i >>> 13, 3266489909), i = n(i ^ i >>> 16, 2246822507) ^ n(r ^ r >>> 13, 3266489909), (4294967296 * (2097151 & i) + (r >>> 0)).toString()
                }

                function it(e) {
                    var t, n = {};
                    for (t in e) e[t] && (n[t] = e[t]);
                    return n
                }

                function ot(e) {
                    try {
                        return JSON.parse(e)
                    } catch (e) {}
                }

                function st(e) {
                    let t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : function(e) {
                        return e
                    };
                    const n = new Map,
                        r = function() {
                            const r = t.apply(this, arguments);
                            return n.has(r) || n.set(r, e.apply(this, arguments)), n.get(r)
                        };
                    return r.clear = n.clear.bind(n), r
                }

                function at(e, t) {
                    Object.entries(t).forEach((t => {
                        let [n, r] = t;
                        return e.setAttribute(n, r)
                    }))
                }

                function ct(e, t) {
                    let n = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : e => e,
                        r = 0,
                        i = e.length && e.length - 1;
                    const o = n(t);
                    for (; i - r > 1;) {
                        const t = r + Math.round((i - r) / 2);
                        o > n(e[t]) ? r = t : i = t
                    }
                    for (; e.length > r && o > n(e[r]);) r++;
                    return r
                }
            },
            79323: (e, t, n) => {
                n.d(t, {
                    g: () => s
                });
                var r = n(71695),
                    i = n(16923),
                    o = n(28768);

                function s(e, t, n) {
                    var s;
                    let {
                        index: a = r.M.index,
                        bs: c = i.m
                    } = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : {};
                    n = n || a.getBidRequest(t);
                    const d = null == t ? void 0 : t.adapterCode,
                        l = (null == t ? void 0 : t.bidderCode) || (null === (s = n) || void 0 === s ? void 0 : s.bidder),
                        u = c.get(null == t ? void 0 : t.adapterCode, "adjustAlternateBids"),
                        f = c.getOwn(l, "bidCpmAdjustment") || c.get(u ? d : l, "bidCpmAdjustment");
                    if (f && "function" == typeof f) try {
                        return f(e, Object.assign({}, t), n)
                    } catch (e) {
                        (0, o.logError)("Error during bid adjustment", e)
                    }
                    return e
                }
            },
            61820: (e, t, n) => {
                n.d(t, {
                    Gc: () => h,
                    hC: () => g,
                    qC: () => b,
                    qm: () => p
                });
                var r = n(65576);
                const i = "performanceMetrics",
                    o = window.performance && window.performance.now ? () => window.performance.now() : () => Date.now(),
                    s = new WeakMap;

                function a() {
                    let {
                        now: e = o,
                        mkNode: t = l,
                        mkTimer: n = d,
                        mkRenamer: r = (e => e),
                        nodes: i = s
                    } = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
                    return function() {
                        return function o(s) {
                            let a = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : e => ({
                                forEach(t) {
                                    t(e)
                                }
                            });
                            a = r(a);
                            const c = (d = "timestamps", function(e) {
                                return s.dfWalk({
                                    visit(t, n) {
                                        const r = n[d];
                                        if (r.hasOwnProperty(e)) return r[e]
                                    }
                                })
                            });
                            var d;

                            function l(e, t) {
                                const n = a(e);
                                s.dfWalk({
                                    follow: (e, t) => t.propagate && (!e || !e.stopPropagation),
                                    visit(e, r) {
                                        n.forEach((n => {
                                            null == e ? r.metrics[n] = t : (r.groups.hasOwnProperty(n) || (r.groups[n] = []), r.groups[n].push(t))
                                        }))
                                    }
                                })
                            }

                            function u(t) {
                                return n(e, (e => l(t, e)))
                            }

                            function f() {
                                let e = {};
                                return s.dfWalk({
                                    visit(t, n) {
                                        e = Object.assign({}, !t || t.includeGroups ? n.groups : null, n.metrics, e)
                                    }
                                }), e
                            }
                            const g = {
                                startTiming: u,
                                measureTime: function(e, t) {
                                    return u(e).stopAfter(t)()
                                },
                                measureHookTime: function(e, t, n) {
                                    const r = u(e);
                                    return n(function(e) {
                                        const t = r.stopBefore(e);
                                        return t.bail = e.bail && r.stopBefore(e.bail), t.stopTiming = r, t.untimed = e, t
                                    }(t))
                                },
                                checkpoint: function(t) {
                                    s.timestamps[t] = e()
                                },
                                timeSince: function(t, n) {
                                    const r = c(t),
                                        i = null != r ? e() - r : null;
                                    return null != n && l(n, i), i
                                },
                                timeBetween: function(e, t, n) {
                                    const r = c(e),
                                        i = c(t),
                                        o = null != r && null != i ? i - r : null;
                                    return null != n && l(n, o), o
                                },
                                setMetric: l,
                                getMetrics: f,
                                fork: function() {
                                    let {
                                        propagate: e = !0,
                                        stopPropagation: n = !1,
                                        includeGroups: r = !1
                                    } = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
                                    return o(t([
                                        [s, {
                                            propagate: e,
                                            stopPropagation: n,
                                            includeGroups: r
                                        }]
                                    ]), a)
                                },
                                join: function(e) {
                                    let {
                                        propagate: t = !0,
                                        stopPropagation: n = !1,
                                        includeGroups: r = !1
                                    } = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
                                    const o = i.get(e);
                                    null != o && o.addParent(s, {
                                        propagate: t,
                                        stopPropagation: n,
                                        includeGroups: r
                                    })
                                },
                                newMetrics: function() {
                                    return o(s.newSibling(), a)
                                },
                                renameWith: function(e) {
                                    return o(s, e)
                                },
                                toJSON: () => f()
                            };
                            return i.set(g, s), g
                        }(t([]))
                    }
                }

                function c(e, t, n) {
                    return function() {
                        t && t();
                        try {
                            return e.apply(this, arguments)
                        } finally {
                            n && n()
                        }
                    }
                }

                function d(e, t) {
                    const n = e();
                    let r = !1;

                    function i() {
                        r || (t(e() - n), r = !0)
                    }
                    return i.stopBefore = e => c(e, i), i.stopAfter = e => c(e, null, i), i
                }

                function l(e) {
                    return {
                        metrics: {},
                        timestamps: {},
                        groups: {},
                        addParent(t, n) {
                            e.push([t, n])
                        },
                        newSibling: () => l(e.slice()),
                        dfWalk() {
                            let t, {
                                visit: n,
                                follow: r = (() => !0),
                                visited: i = new Set,
                                inEdge: o
                            } = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
                            if (!i.has(this)) {
                                if (i.add(this), t = n(o, this), null != t) return t;
                                for (const [s, a] of e)
                                    if (r(o, a) && (t = s.dfWalk({
                                            visit: n,
                                            follow: r,
                                            visited: i,
                                            inEdge: a
                                        }), null != t)) return t
                            }
                        }
                    }
                }
                const u = (() => {
                    const e = function() {},
                        t = () => ({}),
                        n = {
                            forEach: e
                        },
                        r = () => null;
                    r.stopBefore = e => e, r.stopAfter = e => e;
                    const i = Object.defineProperties({
                        dfWalk: e,
                        newSibling: () => i,
                        addParent: e
                    }, Object.fromEntries(["metrics", "timestamps", "groups"].map((e => [e, {
                        get: t
                    }]))));
                    return a({
                        now: () => 0,
                        mkNode: () => i,
                        mkRenamer: () => () => n,
                        mkTimer: () => r,
                        nodes: {
                            get: e,
                            set: e
                        }
                    })()
                })();
                let f = !0;

                function g(e) {
                    return f && e || u
                }
                r.config.getConfig(i, (e => {
                    f = !!e[i]
                }));
                const p = (() => {
                    const e = a();
                    return function() {
                        return f ? e() : u
                    }
                })();

                function m(e, t) {
                    return function(n, r) {
                        return function(i) {
                            for (var o = arguments.length, s = new Array(o > 1 ? o - 1 : 0), a = 1; a < o; a++) s[a - 1] = arguments[a];
                            const c = this;
                            return g(t.apply(c, s)).measureHookTime(e + n, i, (function(e) {
                                return r.call(c, e, ...s)
                            }))
                        }
                    }
                }
                const h = m("requestBids.", (e => e.metrics)),
                    b = m("addBidResponse.", ((e, t) => t.metrics))
            },
            86576: (e, t, n) => {
                n.d(t, {
                    Q: () => g,
                    i: () => u
                });
                var r = n(43484),
                    i = n(22796);

                function o(e, t, n) {
                    ! function(e, t) {
                        if (t.has(e)) throw new TypeError("Cannot initialize the same private elements twice on an object")
                    }(e, t), t.set(e, n)
                }

                function s(e, t, n) {
                    return function(e, t) {
                        if (e !== t) throw new TypeError("Private static access of wrong provenance")
                    }(e, t), n
                }
                const a = 0,
                    c = 1;
                var d = new WeakMap,
                    l = new WeakMap;
                class u {
                    static timeout() {
                        let e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : 0;
                        return new u((t => {
                            0 === e ? t() : setTimeout(t, e)
                        }))
                    }
                    constructor(e) {
                        if (o(this, d, {
                                writable: !0,
                                value: void 0
                            }), o(this, l, {
                                writable: !0,
                                value: void 0
                            }), "function" != typeof e) throw new Error("resolver not a function");
                        const t = [],
                            n = [];
                        let [r, s] = [a, c].map((e => function(i) {
                            if (e === a && "function" == typeof(null == i ? void 0 : i.then)) i.then(r, s);
                            else if (!t.length)
                                for (t.push(e, i); n.length;) n.shift()()
                        }));
                        try {
                            e(r, s)
                        } catch (e) {
                            s(e)
                        }(0, i.c)(this, d, t), (0, i.c)(this, l, n)
                    }
                    then(e, t) {
                        const n = (0, r.c)(this, d);
                        return new this.constructor(((i, o) => {
                            const s = () => {
                                let r = n[1],
                                    [s, c] = n[0] === a ? [e, i] : [t, o];
                                if ("function" == typeof s) {
                                    try {
                                        r = s(r)
                                    } catch (e) {
                                        return void o(e)
                                    }
                                    c = i
                                }
                                c(r)
                            };
                            n.length ? s() : (0, r.c)(this, l).push(s)
                        }))
                    } catch (e) {
                        return this.then(null, e)
                    } finally(e) {
                        let t;
                        return this.then((n => (t = n, e())), (n => (t = this.constructor.reject(n), e()))).then((() => t))
                    }
                    static race(e) {
                        return new this(((t, n) => {
                            s(this, u, f).call(this, e, ((e, r) => e ? t(r) : n(r)))
                        }))
                    }
                    static all(e) {
                        return new this(((t, n) => {
                            let r = [];
                            s(this, u, f).call(this, e, ((e, t, i) => e ? r[i] = t : n(t)), (() => t(r)))
                        }))
                    }
                    static allSettled(e) {
                        return new this((t => {
                            let n = [];
                            s(this, u, f).call(this, e, ((e, t, r) => n[r] = e ? {
                                status: "fulfilled",
                                value: t
                            } : {
                                status: "rejected",
                                reason: t
                            }), (() => t(n)))
                        }))
                    }
                    static resolve(e) {
                        return new this((t => t(e)))
                    }
                    static reject(e) {
                        return new this(((t, n) => n(e)))
                    }
                }

                function f(e, t, n) {
                    let r = e.length;

                    function i() {
                        t.apply(this, arguments), --r <= 0 && n && n()
                    }
                    0 === e.length && n ? n() : e.forEach(((e, t) => this.resolve(e).then((e => i(!0, e, t)), (e => i(!1, e, t)))))
                }

                function g() {
                    let e, t, {
                        promiseFactory: n = (e => new u(e))
                    } = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};

                    function r(e) {
                        return t => e(t)
                    }
                    return {
                        promise: n(((n, r) => {
                            e = n, t = r
                        })),
                        resolve: r(e),
                        reject: r(t)
                    }
                }
            },
            16259: (e, t, n) => {
                function r(e, t) {
                    return e === t ? 0 : e < t ? -1 : 1
                }

                function i() {
                    let e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : e => e;
                    return (t, n) => r(e(t), e(n))
                }

                function o() {
                    let e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : r;
                    return (t, n) => -e(t, n) || 0
                }

                function s() {
                    for (var e = arguments.length, t = new Array(e), n = 0; n < e; n++) t[n] = arguments[n];
                    return function(e, n) {
                        for (const r of t) {
                            const t = r(e, n);
                            if (0 !== t) return t
                        }
                        return 0
                    }
                }

                function a() {
                    let e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : r;
                    return (t, n) => e(n, t) < 0 ? n : t
                }

                function c() {
                    return a(o(arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : r))
                }
                n.d(t, {
                    Az: () => f,
                    Cm: () => u,
                    OC: () => a,
                    Wi: () => c,
                    Yp: () => i
                });
                const d = i((e => e.cpm)),
                    l = i((e => e.responseTimestamp)),
                    u = c(s(d, o(i((e => e.timeToRespond))))),
                    f = c(s(d, o(l)));
                c(s(d, l))
            },
            69677: (e, t, n) => {
                n.d(t, {
                    q: () => o
                });
                var r = n(86576),
                    i = n(28768);

                function o() {
                    let {
                        startTime: e = i.timestamp,
                        ttl: t = (() => null),
                        monotonic: n = !1,
                        slack: o = 5e3
                    } = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
                    const s = new Map,
                        a = [],
                        c = n ? e => a.push(e) : e => a.splice((0, i.binarySearch)(a, e, (e => e.expiry)), 0, e);
                    let d, l;

                    function u() {
                        if (l && clearTimeout(l), a.length > 0) {
                            const e = (0, i.timestamp)();
                            d = Math.max(e, a[0].expiry + o), l = setTimeout((() => {
                                const e = (0, i.timestamp)();
                                let t = 0;
                                for (const n of a) {
                                    if (n.expiry > e) break;
                                    s.delete(n.item), t++
                                }
                                a.splice(0, t), l = null, u()
                            }), d - e)
                        } else l = null
                    }

                    function f(n) {
                        const i = {},
                            s = g;
                        let a;
                        const [f, p] = Object.entries({
                            start: e,
                            delta: t
                        }).map((e => {
                            let t, [f, p] = e;
                            return function() {
                                const e = t = {};
                                r.i.resolve(p(n)).then((n => {
                                    e === t && (i[f] = n, s === g && null != i.start && null != i.delta && (a = i.start + i.delta, c(m), (null == l || d > a + o) && u()))
                                }))
                            }
                        })), m = {
                            item: n,
                            refresh: p,
                            get expiry() {
                                return a
                            }
                        };
                        return f(), p(), m
                    }
                    let g = {};
                    return {
                        [Symbol.iterator]: () => s.keys(),
                        add(e) {
                            !s.has(e) && s.set(e, f(e))
                        },
                        clear() {
                            a.length = 0, u(), s.clear(), g = {}
                        },
                        toArray: () => Array.from(s.keys()),
                        refresh() {
                            a.length = 0, u();
                            for (const e of s.values()) e.refresh()
                        }
                    }
                }
            },
            52224: (e, t, n) => {
                n.d(t, {
                    KQ: () => c,
                    PL: () => l,
                    SW: () => d,
                    ue: () => f,
                    wn: () => u
                });
                var r = n(52420),
                    i = n(28768),
                    o = n(65576),
                    s = n(74712),
                    a = n(71695);
                const c = "outstream",
                    d = "instream";

                function l(e) {
                    var t;
                    const n = null == e || null === (t = e.mediaTypes) || void 0 === t ? void 0 : t.video;
                    null != n && null == n.plcmt && (n.context === c || [2, 3, 4].includes(n.placement) ? n.plcmt = 4 : n.context !== c && [2, 6].includes(n.playbackmethod) && (n.plcmt = 2))
                }

                function u(e) {
                    let {
                        index: t = a.M.index
                    } = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
                    const n = (0, r.c)(t.getMediaTypes(e), "video"),
                        i = n && (0, r.c)(n, "context"),
                        o = n && (0, r.c)(n, "useCacheKey"),
                        s = t.getAdUnit(e);
                    return f(e, s, n, i, o)
                }
                const f = (0, s.Ok)("sync", (function(e, t, n, r, s) {
                    return n && (s || r !== c) ? o.config.getConfig("cache.url") || !e.vastXml || e.vastUrl ? !(!e.vastUrl && !e.vastXml) : ((0, i.logError)('\n        This bid contains only vastXml and will not work when a prebid cache url is not specified.\n        Try enabling prebid cache with owpbjs.setConfig({ cache: {url: "..."} });\n      '), !1) : !(r === c && !s) || !!(e.renderer || t && t.renderer || n.renderer)
                }), "checkVideoBidSetup")
            },
            63160: (e, t, n) => {
                n.d(t, {
                    I: () => d,
                    i: () => c
                });
                var r = n(37280),
                    i = n(65576),
                    o = n(71695);
                const s = 15;

                function a(e) {
                    let {
                        index: t = o.M.index
                    } = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {}, n = e.vastXml ? e.vastXml : function(e, t) {
                        let n = t ? "<![CDATA[".concat(t, "]]>") : "";
                        return '<VAST version="3.0">\n    <Ad>\n      <Wrapper>\n        <AdSystem>prebid.org wrapper</AdSystem>\n        <VASTAdTagURI><![CDATA['.concat(e, "]]></VASTAdTagURI>\n        <Impression>").concat(n, "</Impression>\n        <Creatives></Creatives>\n      </Wrapper>\n    </Ad>\n  </VAST>")
                    }(e.vastUrl, e.vastImpUrl);
                    const r = t.getAuction(e);
                    window && window.PWT && (n = window.PWT.UpdateVastWithTracker(e, n));
                    let a = {
                        type: "xml",
                        value: n,
                        ttlseconds: Number(e.ttl) + s
                    };
                    return i.config.getConfig("cache.vasttrack") && (a.bidder = e.bidder, a.bidid = e.requestId, a.aid = e.auctionId), null != r && (a.timestamp = r.getAuctionStart()), "string" == typeof e.customCacheKey && "" !== e.customCacheKey && (a.key = e.customCacheKey), a
                }

                function c(e, t) {
                    let n = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : r.aO;
                    const o = {
                        puts: e.map(a)
                    };
                    n(i.config.getConfig("cache.timeout"))(i.config.getConfig("cache.url"), function(e) {
                        return {
                            success: function(t) {
                                let n;
                                try {
                                    n = JSON.parse(t).responses
                                } catch (t) {
                                    return void e(t, [])
                                }
                                n ? e(null, n) : e(new Error("The cache server didn't respond with a responses property."), [])
                            },
                            error: function(t, n) {
                                e(new Error("Error storing video ad in the cache: ".concat(t, ": ").concat(JSON.stringify(n))), [])
                            }
                        }
                    }(t), JSON.stringify(o), {
                        contentType: "text/plain",
                        withCredentials: !0
                    })
                }

                function d(e) {
                    return "".concat(i.config.getConfig("cache.url"), "?uuid=").concat(e)
                }
            },
            52420: (e, t, n) => {
                function r(e, t, n, r, i) {
                    for (t = t.split ? t.split(".") : t, r = 0; r < t.length; r++) e = e ? e[t[r]] : i;
                    return e === i ? n : e
                }
                n.d(t, {
                    c: () => r
                })
            },
            10324: e => {
                /** @license MIT* Fun Hooks v0.9.10* (c) @snapwich*/
                a.SYNC = 1, a.ASYNC = 2, a.QUEUE = 4;
                var t = "fun-hooks";
                var n = Object.freeze({
                        useProxy: !0,
                        ready: 0
                    }),
                    r = new WeakMap,
                    i = "2,1,0" === [1].reduce((function(e, t, n) {
                        return [e, t, n]
                    }), 2).toString() ? Array.prototype.reduce : function(e, t) {
                        var n, r = Object(this),
                            i = r.length >>> 0,
                            o = 0;
                        if (t) n = t;
                        else {
                            for (; o < i && !(o in r);) o++;
                            n = r[o++]
                        }
                        for (; o < i;) o in r && (n = e(n, r[o], o, r)), o++;
                        return n
                    };

                function o(e, t) {
                    return Array.prototype.slice.call(e, t)
                }
                var s = Object.assign || function(e) {
                    return i.call(o(arguments, 1), (function(e, t) {
                        return t && Object.keys(t).forEach((function(n) {
                            e[n] = t[n]
                        })), e
                    }), e)
                };

                function a(e) {
                    var c, d = {},
                        l = [];

                    function u(e, t) {
                        return "function" == typeof e ? m.call(null, "sync", e, t) : "string" == typeof e && "function" == typeof t ? m.apply(null, arguments) : "object" == typeof e ? f.apply(null, arguments) : void 0
                    }

                    function f(e, t, n) {
                        var r = !0;
                        void 0 === t && (t = Object.getOwnPropertyNames(e), r = !1);
                        var i = {},
                            o = ["constructor"];
                        do {
                            (t = t.filter((function(t) {
                                return !("function" != typeof e[t] || -1 !== o.indexOf(t) || t.match(/^_/))
                            }))).forEach((function(t) {
                                var r = t.split(":"),
                                    o = r[0],
                                    s = r[1] || "sync";
                                if (!i[o]) {
                                    var a = e[o];
                                    i[o] = e[o] = m(s, a, n ? [n, o] : void 0)
                                }
                            })), e = Object.getPrototypeOf(e)
                        } while (r && e);
                        return i
                    }

                    function g(e) {
                        var n = Array.isArray(e) ? e : e.split(".");
                        return i.call(n, (function(r, i, o) {
                            var s = r[i],
                                a = !1;
                            return s || (o === n.length - 1 ? (c || l.push((function() {
                                a || console.warn(t + ": referenced '" + e + "' but it was never created")
                            })), r[i] = p((function(e) {
                                r[i] = e, a = !0
                            }))) : r[i] = {})
                        }), d)
                    }

                    function p(e) {
                        var t = [],
                            n = [],
                            i = function() {},
                            o = {
                                before: function(e, n) {
                                    return c.call(this, t, "before", e, n)
                                },
                                after: function(e, t) {
                                    return c.call(this, n, "after", e, t)
                                },
                                getHooks: function(e) {
                                    var r = t.concat(n);
                                    "object" == typeof e && (r = r.filter((function(t) {
                                        return Object.keys(e).every((function(n) {
                                            return t[n] === e[n]
                                        }))
                                    })));
                                    try {
                                        s(r, {
                                            remove: function() {
                                                return r.forEach((function(e) {
                                                    e.remove()
                                                })), this
                                            }
                                        })
                                    } catch (e) {
                                        console.error("error adding `remove` to array, did you modify Array.prototype?")
                                    }
                                    return r
                                },
                                removeAll: function() {
                                    return this.getHooks().remove()
                                }
                            },
                            a = {
                                install: function(r, o, s) {
                                    this.type = r, i = s, s(t, n), e && e(o)
                                }
                            };
                        return r.set(o.after, a), o;

                        function c(e, r, o, s) {
                            var a = {
                                hook: o,
                                type: r,
                                priority: s || 10,
                                remove: function() {
                                    var r = e.indexOf(a); - 1 !== r && (e.splice(r, 1), i(t, n))
                                }
                            };
                            return e.push(a), e.sort((function(e, t) {
                                return t.priority - e.priority
                            })), i(t, n), this
                        }
                    }

                    function m(n, i, d) {
                        var u = i.after && r.get(i.after);
                        if (u) {
                            if (u.type !== n) throw t + ": recreated hookable with different type";
                            return i
                        }
                        var f, m, h = d ? g(d) : p(),
                            b = {
                                get: function(e, t) {
                                    return h[t] || Reflect.get.apply(Reflect, arguments)
                                }
                            };
                        return c || l.push(y), e.useProxy && "function" == typeof Proxy && Proxy.revocable ? m = new Proxy(i, b) : (m = function() {
                            return b.apply ? b.apply(i, this, o(arguments)) : i.apply(this, arguments)
                        }, s(m, h)), r.get(m.after).install(n, m, (function(e, t) {
                            var r, i = [];
                            e.length || t.length ? (e.forEach(s), r = i.push(void 0) - 1, t.forEach(s), f = function(e, t, s) {
                                var a, c = 0,
                                    d = "async" === n && "function" == typeof s[s.length - 1] && s.pop();

                                function l(e) {
                                    "sync" === n ? a = e : d && d.apply(null, arguments)
                                }

                                function u(e) {
                                    if (i[c]) {
                                        var r = o(arguments);
                                        return u.bail = l, r.unshift(u), i[c++].apply(t, r)
                                    }
                                    "sync" === n ? a = e : d && d.apply(null, arguments)
                                }
                                return i[r] = function() {
                                    var r = o(arguments, 1);
                                    "async" === n && d && (delete u.bail, r.push(u));
                                    var i = e.apply(t, r);
                                    "sync" === n && u(i)
                                }, u.apply(null, s), a
                            }) : f = void 0;

                            function s(e) {
                                i.push(e.hook)
                            }
                            y()
                        })), m;

                        function y() {
                            !c && ("sync" !== n || e.ready & a.SYNC) && ("async" !== n || e.ready & a.ASYNC) ? "sync" !== n && e.ready & a.QUEUE ? b.apply = function() {
                                var e = arguments;
                                l.push((function() {
                                    m.apply(e[1], e[2])
                                }))
                            } : b.apply = function() {
                                throw t + ": hooked function not ready"
                            } : b.apply = f
                        }
                    }
                    return (e = s({}, n, e)).ready ? u.ready = function() {
                        c = !0,
                            function(e) {
                                for (var t; t = e.shift();) t()
                            }(l)
                    } : c = !0, u.get = g, u
                }
                e.exports = a
            },
            86288: e => {
                e.exports = function e(t) {
                    var n = Array.isArray(t) ? [] : {};
                    for (var r in t) {
                        var i = t[r];
                        n[r] = i && "object" == typeof i ? e(i) : i
                    }
                    return n
                }
            },
            45564: (e, t, n) => {
                function r(e, t) {
                    return t.get ? t.get.call(e) : t.value
                }
                n.d(t, {
                    c: () => r
                })
            },
            47256: (e, t, n) => {
                function r(e, t, n) {
                    if (t.set) t.set.call(e, n);
                    else {
                        if (!t.writable) throw new TypeError("attempted to set read only private field");
                        t.value = n
                    }
                }
                n.d(t, {
                    c: () => r
                })
            },
            75468: (e, t, n) => {
                function r(e, t, n) {
                    if (!t.has(e)) throw new TypeError("attempted to " + n + " private field on non-instance");
                    return t.get(e)
                }
                n.d(t, {
                    c: () => r
                })
            },
            43484: (e, t, n) => {
                n.d(t, {
                    c: () => o
                });
                var r = n(45564),
                    i = n(75468);

                function o(e, t) {
                    var n = (0, i.c)(e, t, "get");
                    return (0, r.c)(e, n)
                }
            },
            22796: (e, t, n) => {
                n.d(t, {
                    c: () => o
                });
                var r = n(47256),
                    i = n(75468);

                function o(e, t, n) {
                    var o = (0, i.c)(e, t, "set");
                    return (0, r.c)(e, o, n), n
                }
            },
            68376: (e, t, n) => {
                function r(e) {
                    return r = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
                        return typeof e
                    } : function(e) {
                        return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
                    }, r(e)
                }

                function i(e) {
                    var t = function(e, t) {
                        if ("object" != r(e) || !e) return e;
                        var n = e[Symbol.toPrimitive];
                        if (void 0 !== n) {
                            var i = n.call(e, t || "default");
                            if ("object" != r(i)) return i;
                            throw new TypeError("@@toPrimitive must return a primitive value.")
                        }
                        return ("string" === t ? String : Number)(e)
                    }(e, "string");
                    return "symbol" == r(t) ? t : String(t)
                }

                function o(e, t, n) {
                    return (t = i(t)) in e ? Object.defineProperty(e, t, {
                        value: n,
                        enumerable: !0,
                        configurable: !0,
                        writable: !0
                    }) : e[t] = n, e
                }
                n.d(t, {
                    c: () => o
                })
            },
            79344: (e, t, n) => {
                function r(e, t, n) {
                    t.split && (t = t.split("."));
                    for (var r, i, o = 0, s = t.length, a = e; o < s && "__proto__" !== (i = t[o++]) && "constructor" !== i && "prototype" !== i;) a = a[i] = o === s ? n : typeof(r = a[i]) == typeof t ? r : 0 * t[o] != 0 || ~("" + t[o]).indexOf(".") ? {} : []
                }
                n.d(t, {
                    e: () => r
                })
            },
            16112: e => {
                e.exports = JSON.parse('{"L7":{"s1":"adserverTargeting","e4":"standard"},"Mj":"pbjs_debug","bL":{"I":1},"EVENTS":{"AUCTION_INIT":"auctionInit","AUCTION_TIMEOUT":"auctionTimeout","AUCTION_END":"auctionEnd","BID_ADJUSTMENT":"bidAdjustment","BID_TIMEOUT":"bidTimeout","BID_REQUESTED":"bidRequested","BID_RESPONSE":"bidResponse","BID_REJECTED":"bidRejected","NO_BID":"noBid","SEAT_NON_BID":"seatNonBid","BID_WON":"bidWon","BIDDER_DONE":"bidderDone","BIDDER_ERROR":"bidderError","SET_TARGETING":"setTargeting","BEFORE_REQUEST_BIDS":"beforeRequestBids","BEFORE_BIDDER_HTTP":"beforeBidderHttp","REQUEST_BIDS":"requestBids","ADD_AD_UNITS":"addAdUnits","AD_RENDER_FAILED":"adRenderFailed","AD_RENDER_SUCCEEDED":"adRenderSucceeded","TCF2_ENFORCEMENT":"tcf2Enforcement","AUCTION_DEBUG":"auctionDebug","BID_VIEWABLE":"bidViewable","STALE_RENDER":"staleRender","BILLABLE_EVENT":"billableEvent","IH_INIT":"initIdentityHub","BID_ACCEPTED":"bidAccepted"},"Af":{"c3":"preventWritingOnMainDocument","UF":"noAd","Qz":"exception","U7":"cannotFindAd","QR":"missingDocOrAdid"},"$X":{"bidWon":"adUnitCode"},"F2":{"i6":"low","IF":"medium","I9":"high","CO":"auto","K_":"dense","K0":"custom"},"TARGETING_KEYS":{"STATUS":"pwtbst","BIDDER":"pwtpid","AD_ID":"pwtsid","PRICE_BUCKET":"pwtecp","SIZE":"pwtsz","DEAL":"pwtdeal","DEAL_ID":"pwtdid","SOURCE":"","FORMAT":"pwtplt","UUID":"pwtuuid","CACHE_ID":"pwtcid","CACHE_HOST":"pwtcurl","ADOMAIN":"pwtadomain"},"YJ":{"BIDDER":"hb_bidder","AD_ID":"hb_adid","PRICE_BUCKET":"hb_pb","SIZE":"hb_size","DEAL":"hb_deal","SOURCE":"hb_source","FORMAT":"hb_format","UUID":"hb_uuid","CACHE_ID":"hb_cache_id","CACHE_HOST":"hb_cache_host","ADOMAIN":"hb_adomain","ACAT":"hb_acat","CRID":"hb_crid","DSP":"hb_dsp"},"NATIVE_KEYS":{"title":"pwt_native_title","body":"pwt_native_body","body2":"pwt_native_body2","privacyLink":"pwt_native_privacy","sponsoredBy":"pwt_native_brand","image":"pwt_native_image","icon":"pwt_native_icon","clickUrl":"pwt_native_linkurl","displayUrl":"pwt_native_displayurl","cta":"pwt_native_cta","rating":"pwt_native_rating","address":"pwt_native_address","downloads":"pwt_native_downloads","likes":"pwt_native_likes","phone":"pwt_native_phone","price":"pwt_native_price","salePrice":"pwt_native_saleprice"},"xP":{"iu":"s2s"},"BID_STATUS":{"W":"targetingSet","RENDERED":"rendered","E":"bidRejected"},"EL":{"s":["id5Id","publinkId","connectId"],"g":["zeotapIdPlus","identityLink","publinkId"]},"_S":{"id5Id":[{"key":"pd"}],"publinkId":[{"key":"e","hashType":"MD5"}],"connectId":[{"key":"he","hashType":"SHA256"}]},"ST":{"IP":"Bid has missing or invalid properties","op":"Invalid request ID","Sg":"Bidder code is not allowed by allowedAlternateBidderCodes / allowUnknownBidderCodes","_E":"Bid does not meet price floor","k9":"Unable to convert currency"},"PREBID_NATIVE_DATA_KEYS_TO_ORTB":{"body":"desc","body2":"desc2","sponsoredBy":"sponsored","cta":"ctatext","rating":"rating","address":"address","downloads":"downloads","likes":"likes","phone":"phone","price":"price","salePrice":"saleprice","displayUrl":"displayurl"},"NATIVE_ASSET_TYPES":{"sponsored":1,"desc":2,"rating":3,"likes":4,"downloads":5,"price":6,"saleprice":7,"phone":8,"address":9,"desc2":10,"displayurl":11,"ctatext":12},"NATIVE_IMAGE_TYPES":{"ICON":1,"MAIN":3},"NATIVE_KEYS_THAT_ARE_NOT_ASSETS":["privacyIcon","clickUrl","sendTargetingKeys","adTemplate","rendererUrl","type"],"C6":{"Ih":"noData","OC":"adUnit","Gu":"setConfig","ew":"fetch","_Y":"success","_b":"error","o9":"timeout"}}')
            }
        },
        n = {};

    function r(e) {
        var i = n[e];
        if (void 0 !== i) return i.exports;
        var o = n[e] = {
            exports: {}
        };
        return t[e].call(o.exports, o, o.exports, r), o.exports
    }
    r.m = t, e = [], r.O = (t, n, i, o) => {
        if (!n) {
            var s = 1 / 0;
            for (l = 0; l < e.length; l++) {
                n = e[l][0], i = e[l][1], o = e[l][2];
                for (var a = !0, c = 0; c < n.length; c++)(!1 & o || s >= o) && Object.keys(r.O).every((e => r.O[e](n[c]))) ? n.splice(c--, 1) : (a = !1, o < s && (s = o));
                if (a) {
                    e.splice(l--, 1);
                    var d = i();
                    void 0 !== d && (t = d)
                }
            }
            return t
        }
        o = o || 0;
        for (var l = e.length; l > 0 && e[l - 1][2] > o; l--) e[l] = e[l - 1];
        e[l] = [n, i, o]
    }, r.n = e => {
        var t = e && e.__esModule ? () => e.default : () => e;
        return r.d(t, {
            a: t
        }), t
    }, r.d = (e, t) => {
        for (var n in t) r.o(t, n) && !r.o(e, n) && Object.defineProperty(e, n, {
            enumerable: !0,
            get: t[n]
        })
    }, r.g = function() {
        if ("object" == typeof globalThis) return globalThis;
        try {
            return this || new Function("return this")()
        } catch (e) {
            if ("object" == typeof window) return window
        }
    }(), r.o = (e, t) => Object.prototype.hasOwnProperty.call(e, t), r.r = e => {
        "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(e, Symbol.toStringTag, {
            value: "Module"
        }), Object.defineProperty(e, "__esModule", {
            value: !0
        })
    }, (() => {
        var e = {
            32844: 0
        };
        r.O.j = t => 0 === e[t];
        var t = (t, n) => {
                var i, o, s = n[0],
                    a = n[1],
                    c = n[2],
                    d = 0;
                if (s.some((t => 0 !== e[t]))) {
                    for (i in a) r.o(a, i) && (r.m[i] = a[i]);
                    if (c) var l = c(r)
                }
                for (t && t(n); d < s.length; d++) o = s[d], r.o(e, o) && e[o] && e[o][0](), e[o] = 0;
                return r.O(l)
            },
            n = self.owpbjsChunk = self.owpbjsChunk || [];
        n.forEach(t.bind(null, 0)), n.push = t.bind(null, n.push.bind(n))
    })();
    var i = r.O(void 0, [21240], (() => r(56360)));
    i = r.O(i)
})();
(self.owpbjsChunk = self.owpbjsChunk || []).push([
    [21240], {
        1796: (e, i, t) => {
            t.d(i, {
                Qz: () => c,
                UF: () => s,
                c3: () => r,
                cZ: () => d,
                iI: () => a,
                q6: () => o
            });
            var n = t(16112);
            const d = "Prebid Native",
                r = "Prebid Request",
                a = "Prebid Response",
                o = "Prebid Event",
                s = (n.EVENTS.AD_RENDER_SUCCEEDED, n.EVENTS.AD_RENDER_FAILED, n.Af.UF),
                c = n.Af.Qz
        },
        16192: (e, i, t) => {
            t.d(i, {
                w: () => m
            });
            var n = t(91632),
                d = t(1796);
            const r = {
                frameBorder: 0,
                scrolling: "no",
                marginHeight: 0,
                marginWidth: 0,
                topMargin: 0,
                leftMargin: 0,
                allowTransparency: "true"
            };

            function a(e, i) {
                let {
                    ad: t,
                    adUrl: n,
                    width: a,
                    height: o
                } = e, s = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : document;
                t || n ? (n && !t ? function(e, i) {
                    const t = e.createElement("iframe");
                    i = Object.assign({}, i, r), Object.entries(i).forEach((e => {
                        let [i, n] = e;
                        return t.setAttribute(i, n)
                    })), e.body.appendChild(t)
                }(s, {
                    width: a,
                    height: o,
                    src: n
                }) : (s.write(t), s.close()), i()) : i({
                    reason: d.UF,
                    message: "Missing ad markup or URL"
                })
            }
            var o = t(71695),
                s = t(16112),
                c = t(28768),
                l = t(48176);

            function m(e, i, t) {
                let r;

                function m(t) {
                    null != t ? (0, n.CA)(Object.assign({
                        id: i,
                        bid: r
                    }, t)) : (0, n.g1)({
                        doc: e,
                        bid: r,
                        adId: i
                    })
                }
                try {
                    if (i && e) {
                        r = o.M.findBidByAdId(i);
                        {
                            const e = r && o.M.index.getAdUnit(r),
                                i = (0, l.A)().videoModule;
                            if (null != e && e.video && i) return void i.renderBid(e.video.divId, r)
                        }
                        e !== document || (0, c.inIframe)() ? (0, n.ke)((function(i) {
                            a(i, m, e), e.defaultView && e.defaultView.frameElement && (e.defaultView.frameElement.width = i.width, e.defaultView.frameElement.height = i.height);
                            const t = document.createComment("Creative ".concat(r.creativeId, " served by ").concat(r.bidder, " Prebid.js Header Bidding"));
                            (0, c.insertElement)(t, e, "html")
                        }), {
                            adId: i,
                            options: {
                                clickUrl: null == t ? void 0 : t.clickThrough
                            },
                            bidResponse: r
                        }) : m({
                            reason: s.Af.c3,
                            message: "renderAd was prevented from writing to the main document."
                        })
                    } else m({
                        reason: s.Af.QR,
                        message: "missing ".concat(i ? "doc" : "adId")
                    })
                } catch (e) {
                    m({
                        reason: d.Qz,
                        message: e.message
                    })
                }
            }
        }
    }
]);
(self.owpbjsChunk = self.owpbjsChunk || []).push([
    [78444], {
        228: (t, n, e) => {
            e.d(n, {
                iC: () => d,
                k5: () => s,
                u0: () => i
            });
            var o = e(11636),
                u = e(28768);

            function d(t) {
                return n => (0, u.compareCodeAndSlot)(n, t)
            }

            function i(t) {
                let n;
                return (0, u.isGptPubadsDefined)() && (n = (0, o.iw)(window.googletag.pubads().getSlots(), d(t))), n
            }

            function s(t) {
                const n = i(t);
                return n ? {
                    gptSlot: n.getAdUnitPath(),
                    divId: n.getSlotElementId()
                } : {}
            }
        }
    }
]);
(self.owpbjsChunk = self.owpbjsChunk || []).push([
    [90912], {
        97e3: (n, t, e) => {
            e.d(t, {
                ie: () => u,
                yg: () => o
            });
            var l = e(48176),
                r = e(16259);

            function u(n, t, e) {
                let r = !(arguments.length > 3 && void 0 !== arguments[3]) || arguments[3];
                if (t === e) return n;
                let u = n;
                try {
                    u = (0, l.A)().convertCurrency(n, t, e)
                } catch (n) {
                    if (!r) throw n
                }
                return u
            }

            function o() {
                let n = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : n => [n.cpm, n.currency],
                    t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : function() {
                        let n = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : null,
                            t = !(arguments.length > 1 && void 0 !== arguments[1]) || arguments[1],
                            e = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : u;
                        return function(l, r) {
                            return null == n && (n = r), e(l, r, n, t)
                        }
                    }();
                return (0, r.Yp)((e => t.apply(null, n(e))))
            }
        }
    }
]);
(self.owpbjsChunk = self.owpbjsChunk || []).push([
    [72706], {
        87732: (e, t, n) => {
            n.d(t, {
                YP: () => d,
                cp: () => f
            });
            var l = n(16112),
                a = n(37280),
                s = n(28768),
                i = n(1276);
            const o = {
                    ajax: a.Kk
                },
                r = "endpoint",
                c = "bundle",
                p = Object.values(l.EVENTS).filter((e => e !== l.EVENTS.AUCTION_DEBUG));
            let u = 100;

            function d(e) {
                u = e
            }

            function f(e) {
                let {
                    url: t,
                    analyticsType: n,
                    global: a,
                    handler: d
                } = e;
                const f = [];
                let g, y, b = !1,
                    h = !0;
                const v = (() => {
                    let e, t = !1;
                    const n = () => {
                        if (!t) {
                            t = !0;
                            try {
                                let e = 0,
                                    t = 0;
                                for (; f.length > 0;) {
                                    e++;
                                    const n = f.length;
                                    if (f.shift()(), f.length >= n ? t++ : t = 0, t >= 10) return (0, s.logError)("Detected probable infinite loop, discarding events", f), void(f.length = 0)
                                }(0, s.logMessage)("".concat(y, " analytics: processed ").concat(e, " events"))
                            } finally {
                                t = !1
                            }
                        }
                    };
                    return function() {
                        null != e && (clearTimeout(e), e = null), 0 === u ? n() : e = setTimeout(n, u)
                    }
                })();
                return Object.defineProperties({
                    track: function(e) {
                        let {
                            eventType: n,
                            args: l
                        } = e;
                        this.getAdapterType() === c && window[a](d, n, l);
                        this.getAdapterType() === r && function(e) {
                            let {
                                eventType: n,
                                args: l,
                                callback: a
                            } = e;
                            o.ajax(t, a, JSON.stringify({
                                eventType: n,
                                args: l
                            }))
                        }(...arguments)
                    },
                    enqueue: T,
                    enableAnalytics: E,
                    disableAnalytics: function() {
                        Object.entries(g || {}).forEach((e => {
                            let [t, n] = e;
                            i.off(t, n)
                        })), this.enableAnalytics = this._oldEnable ? this._oldEnable : E, b = !1
                    },
                    getAdapterType: () => n,
                    getGlobal: () => a,
                    getHandler: () => d,
                    getUrl: () => t
                }, {
                    enabled: {
                        get: () => b
                    }
                });

                function T(e) {
                    let {
                        eventType: t,
                        args: n
                    } = e;
                    f.push((() => {
                        this.track({
                            eventType: t,
                            args: n
                        })
                    })), v()
                }

                function E(e) {
                    y = null == e ? void 0 : e.provider;
                    var t = this;
                    if (h = "object" != typeof e || "object" != typeof e.options || (void 0 === e.options.sampling || Math.random() < parseFloat(e.options.sampling)), h) {
                        const n = (() => {
                            const {
                                includeEvents: t = p,
                                excludeEvents: n = []
                            } = e || {};
                            return new Set(Object.values(l.EVENTS).filter((e => t.includes(e))).filter((e => !n.includes(e))))
                        })();
                        i.getEvents().forEach((e => {
                            if (!e || !n.has(e.eventType)) return;
                            const {
                                eventType: l,
                                args: a
                            } = e;
                            T.call(t, {
                                eventType: l,
                                args: a
                            })
                        })), g = Object.fromEntries(Array.from(n).map((e => {
                            const t = t => this.enqueue({
                                eventType: e,
                                args: t
                            });
                            return i.on(e, t), [e, t]
                        })))
                    } else(0, s.logMessage)('Analytics adapter for "'.concat(a, '" disabled by sampling'));
                    this._oldEnable = this.enableAnalytics, this.enableAnalytics = function() {
                        return (0, s.logMessage)('Analytics adapter for "'.concat(a, '" already enabled, unnecessary call to `enableAnalytics`.'))
                    }, b = !0
                }
            }
        }
    }
]);
(self.owpbjsChunk = self.owpbjsChunk || []).push([
    [68376], {
        84928: (e, n, r) => {
            r.d(n, {
                U: () => t
            });
            var s = r(28768);

            function t(e, n) {
                return Object.keys(e).forEach((r => {
                    var t, u;
                    n[r] && ((0, s.isFn)(e[r]) ? n[r] = e[r](n[r]) : n[r] = (t = e[r], u = n[r], "string" === t ? u && u.toString() : "number" === t ? Number(u) : u), isNaN(n[r]) && delete n.key)
                })), n
            }
        }
    }
]);
(self.owpbjsChunk = self.owpbjsChunk || []).push([
    [95648], {
        43156: (e, i, t) => {
            var n = t(48176),
                o = t(28768),
                a = t(52420),
                d = t(57120),
                r = t(56360),
                c = t(52224),
                u = t(74712),
                l = t(63160),
                s = t(65576),
                g = t(48636),
                f = t(11636),
                h = t(71695),
                p = t(16112);
            const v = "hb_pb_cat_dur",
                m = "hb_cache_id";
            let b = 50,
                T = 5,
                C = function() {
                    let e = {};

                    function i(i) {
                        e[i] = {}, e[i].bidStorage = new Set, e[i].queueDispatcher = function(e) {
                            let i, t = 1;
                            return function(n, o, a, d) {
                                const r = this;
                                var c = function() {
                                    S.call(r, n, o, a)
                                };
                                clearTimeout(i), d ? t = 1 : t === T ? (t = 1, c()) : (t++, i = setTimeout(c, e))
                            }
                        }(b), e[i].initialCacheKey = (0, o.generateUUID)()
                    }
                    return {
                        addBid: function(t) {
                            e[t.auctionId] || i(t.auctionId), e[t.auctionId].bidStorage.add(t)
                        },
                        removeBid: function(i) {
                            e[i.auctionId].bidStorage.delete(i)
                        },
                        getBids: function(i) {
                            return e[i.auctionId] && e[i.auctionId].bidStorage.values()
                        },
                        getQueueDispatcher: function(i) {
                            return e[i.auctionId] && e[i.auctionId].queueDispatcher
                        },
                        setupInitialCacheKey: function(i) {
                            e[i.auctionId] || (e[i.auctionId] = {}, e[i.auctionId].initialCacheKey = (0, o.generateUUID)())
                        },
                        getInitialCacheKey: function(i) {
                            return e[i.auctionId] && e[i.auctionId].initialCacheKey
                        }
                    }
                }();

            function y(e, i) {
                let t = C.getInitialCacheKey(e),
                    n = (0, a.c)(e, "video.durationBucket");
                const o = function(e) {
                    let i;
                    if (s.config.getConfig("adpod.prioritizeDeals") && (0, a.c)(e, "video.dealTier")) {
                        const t = s.config.getConfig("adpod.dealTier.".concat(e.bidderCode, ".prefix"));
                        i = t ? t + (0, a.c)(e, "video.dealTier") : (0, a.c)(e, "video.dealTier")
                    } else {
                        const t = (0, d.a2)(e);
                        i = (0, d.yw)(t)(e)
                    }
                    return i
                }(e);
                let r;
                if (i) {
                    let i = (0, a.c)(e, "meta.adServerCatId");
                    r = "".concat(o, "_").concat(i, "_").concat(n, "s")
                } else r = "".concat(o, "_").concat(n, "s");
                e.adserverTargeting || (e.adserverTargeting = {}), e.adserverTargeting[v] = r, e.adserverTargeting[m] = t, e.videoCacheKey = t, e.customCacheKey = "".concat(r, "_").concat(t)
            }

            function S(e, i, t) {
                ! function(e) {
                    for (let i = 0; i < e.length; i++) C.removeBid(e[i])
                }(i), (0, l.i)(i, (function(n, a) {
                    if (n)(0, o.logWarn)("Failed to save to the video cache: ".concat(n, ". Video bid(s) must be discarded."));
                    else
                        for (let n = 0; n < a.length; n++) "" !== a[n].uuid ? (0, d.uw)(e, i[n]) : (0, o.logInfo)("Detected a bid was not cached because the custom key was already registered.  Attempted to use key: ".concat(i[n].customCacheKey, ". Bid was: "), i[n]), t()
                }))
            }

            function E(e, i, t, n, r) {
                if (r && r.context === g.So) {
                    let e = s.config.getConfig("adpod.brandCategoryExclusion");
                    !(0, a.c)(t, "meta.adServerCatId") && e ? ((0, o.logWarn)("Detected a bid without meta.adServerCatId while setConfig({adpod.brandCategoryExclusion}) was enabled.  This bid has been rejected:", t), n()) : !1 === s.config.getConfig("adpod.deferCaching") ? (C.addBid(t), y(t, e), function(e, i, t) {
                        let n = C.getBids(i);
                        if (n) {
                            let o = (0, f.A5)(n),
                                a = C.getQueueDispatcher(i),
                                r = !(e.getAuctionStatus() === d.EF);
                            a(e, o, t, r)
                        } else(0, o.logWarn)("Attempted to cache a bid from an unknown auction. Bid:", i)
                    }(i, t, n)) : (C.setupInitialCacheKey(t), y(t, e), (0, d.uw)(i, t), n())
                } else e.call(this, i, t, n, r)
            }

            function I(e, i) {
                let t = i.filter((e => {
                    let i = (0, a.c)(e, "mediaTypes"),
                        t = (0, a.c)(i, "video");
                    if (t && t.context === g.So) {
                        if (Object.keys(i).length > 1) return (0, o.logWarn)("Detected more than one mediaType in adUnitCode: ".concat(e.code, " while attempting to define an 'adpod' video adUnit.  'adpod' adUnits cannot be mixed with other mediaTypes.  This adUnit will be removed from the auction.")), !1;
                        let n = "Detected missing or incorrectly setup fields for an adpod adUnit.  Please review the following fields of adUnitCode: ".concat(e.code, ".  This adUnit will be removed from the auction."),
                            a = !!(t.playerSize && ((0, o.isArrayOfNums)(t.playerSize, 2) || (0, o.isArray)(t.playerSize) && t.playerSize.every((e => (0, o.isArrayOfNums)(e, 2)))) || t.sizeConfig),
                            d = !!(t.adPodDurationSec && (0, o.isNumber)(t.adPodDurationSec) && t.adPodDurationSec > 0),
                            r = !!(t.durationRangeSec && (0, o.isArrayOfNums)(t.durationRangeSec) && t.durationRangeSec.every((e => e > 0)));
                        if (!a || !d || !r) return n += a ? "" : "\nmediaTypes.video.playerSize", n += d ? "" : "\nmediaTypes.video.adPodDurationSec", n += r ? "" : "\nmediaTypes.video.durationRangeSec", (0, o.logWarn)(n), !1
                    }
                    return !0
                }));
                i = t, e.call(this, i)
            }

            function D(e, i, t, n, d) {
                if (d === g.So) {
                    let t = !0;
                    if (s.config.getConfig("adpod.brandCategoryExclusion") && !(0, a.c)(i, "meta.primaryCatId") && (t = !1), (0, a.c)(i, "video"))
                        if ((0, a.c)(i, "video.context") && i.video.context === g.So || (t = !1), !(0, a.c)(i, "video.durationSeconds") || i.video.durationSeconds <= 0) t = !1;
                        else {
                            let e = function(e, i) {
                                let t = (0, a.c)(i, "video.durationSeconds"),
                                    n = e.durationRangeSec;
                                if (n.sort(((e, i) => e - i)), e.requireExactDuration) {
                                    if (!(0, f.iw)(n, (e => e === t))) return (0, o.logWarn)("Detected a bid with a duration value not part of the list of accepted ranges specified in adUnit.mediaTypes.video.durationRangeSec.  Exact match durations must be used for this adUnit. Rejecting bid: ", i), !1;
                                    i.video.durationBucket = t
                                } else {
                                    let e = Math.max(...n);
                                    if (!(t <= e + 2)) return (0, o.logWarn)("Detected a bid with a duration value outside the accepted ranges specified in adUnit.mediaTypes.video.durationRangeSec.  Rejecting bid: ", i), !1;
                                    {
                                        let e = (0, f.iw)(n, (e => e + 2 >= t));
                                        i.video.durationBucket = e
                                    }
                                }
                                return !0
                            }(n, i);
                            e || (t = !1)
                        } s.config.getConfig("cache.url") || !i.vastXml || i.vastUrl || ((0, o.logError)('\n        This bid contains only vastXml and will not work when a prebid cache url is not specified.\n        Try enabling prebid cache with pbjs.setConfig({ cache: {url: "..."} });\n      '), t = !1), e.bail(t)
                } else e.call(this, i, t, n, d)
            }

            function U(e, i) {
                return e.adserverTargeting[p.TARGETING_KEYS.PRICE_BUCKET] / e.video.durationBucket < i.adserverTargeting[p.TARGETING_KEYS.PRICE_BUCKET] / i.video.durationBucket ? 1 : e.adserverTargeting[p.TARGETING_KEYS.PRICE_BUCKET] / e.video.durationBucket > i.adserverTargeting[p.TARGETING_KEYS.PRICE_BUCKET] / i.video.durationBucket ? -1 : 0
            }
            s.config.getConfig("adpod", (e => function(e) {
                void 0 !== e.bidQueueTimeDelay && ("number" == typeof e.bidQueueTimeDelay && e.bidQueueTimeDelay > 0 ? b = e.bidQueueTimeDelay : (0, o.logWarn)("Detected invalid value for adpod.bidQueueTimeDelay in setConfig; must be a positive number.  Using default: ".concat(b))), void 0 !== e.bidQueueSizeLimit && ("number" == typeof e.bidQueueSizeLimit && e.bidQueueSizeLimit > 0 ? T = e.bidQueueSizeLimit : (0, o.logWarn)("Detected invalid value for adpod.bidQueueSizeLimit in setConfig; must be a positive number.  Using default: ".concat(T)))
            }(e.adpod))), (0, u.GU)((0, u.E$)("callPrebidCache"), E), (0, u.GU)(r.ae, I), (0, u.GU)(c.ue, D);
            const w = {
                TARGETING_KEY_PB_CAT_DUR: v,
                TARGETING_KEY_CACHE_ID: m,
                getTargeting: function() {
                    let {
                        codes: e,
                        callback: i
                    } = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
                    if (!i) return void(0, o.logError)("No callback function was defined in the getTargeting call.  Aborting getTargeting().");
                    e = e || [];
                    const t = function(e) {
                            return h.M.getAdUnits().filter((e => (0, a.c)(e, "mediaTypes.video.context") === g.So)).filter((i => !(e.length > 0) || -1 != e.indexOf(i.code)))
                        }(e),
                        n = h.M.getBidsReceived(),
                        d = s.config.getConfig("adpod.brandCategoryExclusion"),
                        r = s.config.getConfig("adpod.deferCaching"),
                        c = "boolean" != typeof r || r;
                    let u = function(e, i) {
                        let t = i.map((e => e.code));
                        return e.filter((e => -1 != t.indexOf(e.adUnitCode) && e.video && e.video.context === g.So))
                    }(n, t);
                    if (u = d || c ? function(e) {
                            let i = e.map((e => Object.assign({}, e, {
                                [v]: e.adserverTargeting[v]
                            })));
                            i = (0, o.groupBy)(i, v);
                            let t = [];
                            return Object.keys(i).forEach((e => {
                                var n;
                                i[e].sort((n = "responseTimestamp", function(e, i) {
                                    return e[n] < i[n] ? 1 : e[n] > i[n] ? -1 : 0
                                })), t.push(i[e][0])
                            })), t
                        }(u) : u, s.config.getConfig("adpod.prioritizeDeals")) {
                        let [e, i] = u.reduce(((e, i) => {
                            let t = (0, a.c)(i, "video.dealTier"),
                                n = s.config.getConfig("adpod.dealTier.".concat(i.bidderCode, ".minDealTier"));
                            return n && t ? t >= n ? e[1].push(i) : e[0].push(i) : t ? e[1].push(i) : e[0].push(i), e
                        }), [
                            [],
                            []
                        ]);
                        i.sort(U), e.sort(U), u = i.concat(e)
                    } else u.sort(U);
                    let f = {};
                    if (!1 === c) t.forEach((e => {
                        let i = [],
                            t = (0, a.c)(e, "mediaTypes.video.adPodDurationSec");
                        u.filter((i => i.adUnitCode === e.code)).forEach(((e, n, o) => {
                            e.video.durationBucket <= t && (i.push({
                                [v]: e.adserverTargeting[v]
                            }), t -= e.video.durationBucket), n === o.length - 1 && i.length > 0 && i.push({
                                [m]: e.adserverTargeting[m]
                            })
                        })), f[e.code] = i
                    })), i(null, f);
                    else {
                        let e = [];
                        t.forEach((i => {
                                let t = (0, a.c)(i, "mediaTypes.video.adPodDurationSec");
                                u.filter((e => e.adUnitCode === i.code)).forEach((i => {
                                    i.video.durationBucket <= t && (e.push(i), t -= i.video.durationBucket)
                                }))
                            })),
                            function(e, i) {
                                (0, l.i)(e, (function(t, n) {
                                    if (t) i(t, null);
                                    else {
                                        let t = [];
                                        for (let i = 0; i < n.length; i++) "" !== n[i] && t.push(e[i]);
                                        i(null, t)
                                    }
                                }))
                            }(e, (function(e, t) {
                                if (e) i(e, null);
                                else {
                                    let e = (0, o.groupBy)(t, "adUnitCode");
                                    Object.keys(e).forEach((i => {
                                        let t = [];
                                        e[i].forEach(((e, i, n) => {
                                            t.push({
                                                [v]: e.adserverTargeting[v]
                                            }), i === n.length - 1 && t.length > 0 && t.push({
                                                [m]: e.adserverTargeting[m]
                                            })
                                        })), f[i] = t
                                    })), i(null, f)
                                }
                            }))
                    }
                    return f
                }
            };
            Object.freeze(w), (0, u.mO)("adpod", (function() {
                (0, o.isPlainObject)(arguments.length <= 0 ? void 0 : arguments[0]) ? function(e, i) {
                    for (let t in i) e[t] = i[t]
                }(arguments.length <= 0 ? void 0 : arguments[0], w) : (0, o.logError)("Adpod module needs plain object to share methods with submodule")
            })), (0, n.g)("adpod")
        }
    },
    e => {
        e.O(0, [21240], (() => {
            return i = 43156, e(e.s = i);
            var i
        }));
        e.O()
    }
]);
(self.owpbjsChunk = self.owpbjsChunk || []).push([
    [33540], {
        15912: (e, t, o) => {
            var i = o(48176),
                a = o(1276),
                n = o(16112);
            const r = (0, o(97200).KX)({
                    bidderCode: "pubmatic"
                }),
                d = window.location.host,
                s = "PROFILE_AUCTION_INFO_";
            let l, c = {},
                p = {
                    pageView: 0,
                    slotCnt: 0,
                    bidServed: 0,
                    impressionServed: 0,
                    slotLevelFrquencyDepth: {},
                    viewedSlot: {},
                    timestamp: {
                        date: (new Date).getDate()
                    },
                    userAgentDetails: function() {
                        if (navigator.userAgentData) {
                            const {
                                brands: e,
                                mobile: t,
                                platform: o
                            } = navigator.userAgentData;
                            return {
                                browser: e && e[0] && e[0].brand,
                                isMobile: t,
                                platform: o
                            }
                        } {
                            const e = navigator.userAgent;
                            return {
                                isMobile: !!/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(e),
                                platform: e.platform,
                                browser: v(e)
                            }
                        }
                    }(),
                    lip: []
                },
                g = {};

            function v(e) {
                let t = "";
                return e.match(/chrome|chromium|crios/i) ? t = "chrome" : e.match(/firefox|fxios/i) ? t = "firefox" : e.match(/safari/i) ? t = "safari" : e.match(/opr\//i) ? t = "opera" : e.match(/edg/i) && (t = "edge"), t
            }

            function S(e) {
                if (p) {
                    c = r.getDataFromLocalStorage(s + d);
                    let t = window.owpbjs.adUnits.length + (null == c ? p.slotCnt : 0);
                    if (null !== c) {
                        l = JSON.parse(c).timestamp.date;
                        const e = function(e) {
                            return e !== (new Date).getDate() && (r.removeDataFromLocalStorage(s + d), !0)
                        }(l);
                        e && (p.viewedSlot = function() {
                            const e = new Date(JSON.parse(c).viewedSlot.timestamp),
                                t = new Date((new Date).toJSON().slice(0, 10));
                            return !(Math.ceil(Math.abs(t - e) / 864e5) <= 10)
                        }() ? {} : JSON.parse(c).viewedSlot), p = e ? p : JSON.parse(c), p.pageView = p.pageView + 1, p.slotCnt = p.slotCnt + t
                    } else p.pageView = 1, p.slotCnt = t;
                    e.adUnits.forEach((e => {
                        var t, o, i;
                        p.slotLevelFrquencyDepth[e.adUnitId] = {
                            slotCnt: ((null === (t = p.slotLevelFrquencyDepth[e.adUnitId]) || void 0 === t ? void 0 : t.slotCnt) || 0) + 1,
                            bidServed: ((null === (o = p.slotLevelFrquencyDepth[e.adUnitId]) || void 0 === o ? void 0 : o.bidServed) || 0) + 0,
                            impressionServed: ((null === (i = p.slotLevelFrquencyDepth[e.adUnitId]) || void 0 === i ? void 0 : i.impressionServed) || 0) + 0
                        }, g[e.code] = e.adUnitId
                    })), p.codeAdUnitMap = g
                }
                return p
            }
            window.googletag = window.googletag || {}, window.googletag.cmd = window.googletag.cmd || [], window.googletag.cmd.push((() => {
                window.googletag.pubads().addEventListener("impressionViewable", (function(e) {
                    var t;
                    t = e.slot, p = JSON.parse(r.getDataFromLocalStorage(s + d)), p && (p.viewedSlot.timestamp = p.viewedSlot.timestamp ? p.viewedSlot.timestamp : (new Date).toJSON().slice(0, 10), p.viewedSlot[p.codeAdUnitMap[t.getSlotId().getDomId()]] = (p.viewedSlot[p.codeAdUnitMap[t.getSlotId().getDomId()]] || 0) + 1, r.setDataInLocalStorage(s + d, JSON.stringify(p)))
                }))
            })), a.on(n.EVENTS.AUCTION_INIT, (e => {
                p = S(e)
            })), a.on(n.EVENTS.AUCTION_END, (() => {
                var e;
                p && (p.lip = (null === (e = window.owpbjs.adUnits[0]) || void 0 === e || null === (e = e.bids[0]) || void 0 === e ? void 0 : e.userId) && Object.keys(window.owpbjs.adUnits[0].bids[0].userId), r.setDataInLocalStorage(s + d, JSON.stringify(p)))
            })), a.on(n.EVENTS.BID_RESPONSE, (e => {
                p = function(e) {
                    return p && e.cpm > 0 && (p.slotLevelFrquencyDepth[g[e.adUnitCode]].bidServed = p.slotLevelFrquencyDepth[g[e.adUnitCode]].bidServed + 1, p.bidServed = p.bidServed + 1), p
                }(e)
            })), a.on(n.EVENTS.BID_WON, (e => {
                p = function(e) {
                    return p = JSON.parse(r.getDataFromLocalStorage(s + d)), p && (p.impressionServed = p.impressionServed + 1, p.slotLevelFrquencyDepth[g[e.adUnitCode]].impressionServed = p.slotLevelFrquencyDepth[g[e.adUnitCode]].impressionServed + 1, r.setDataInLocalStorage(s + d, JSON.stringify(p))), p
                }(e)
            })), (0, i.g)("auctionUserDetails")
        }
    },
    e => {
        e.O(0, [21240], (() => {
            return t = 15912, e(e.s = t);
            var t
        }));
        e.O()
    }
]);
(self.owpbjsChunk = self.owpbjsChunk || []).push([
    [92092], {
        96556: (e, t, r) => {
            var n = r(48176),
                o = r(25756),
                s = r(8892),
                a = r(28768),
                d = r(52420),
                c = r(65576),
                i = r(74712),
                p = r(71695),
                l = r(47356),
                u = r(1276),
                _ = r(16112),
                g = r(16496),
                T = r(94228);
            const A = {
                    env: "vp",
                    gdfp_req: 1,
                    output: "vast",
                    unviewed_position_start: 1
                },
                C = {},
                b = {
                    ri: T.CS
                };

            function f(e, t, r) {
                return (0, d.c)(t, "".concat(r, ".description_url")) || encodeURIComponent(b.ri().page)
            }

            function m(e, t, r) {
                const n = e && e.adserverTargeting || {};
                let o = {};
                const c = t && t.adUnit;
                if (c) {
                    let e = s.U7.getAllTargeting(c.code);
                    o = e ? e[c.code] : {}
                }
                const i = Object.assign({}, {
                    hb_uuid: e && e.videoCacheKey
                }, {
                    hb_cache_id: e && e.videoCacheKey
                }, o, n);
                u.emit(_.EVENTS.SET_TARGETING, {
                    [c.code]: i
                });
                const p = (0, d.c)(t, "params.cust_params");
                var l = {};
                window.PWT && window.PWT.getCustomParamsForDFPVideo && (l = window.PWT.getCustomParamsForDFPVideo(p, e));
                const g = Object.assign({}, n, p, l);
                return encodeURIComponent((0, a.formatQS)(g))
            }
            c.config.getConfig("brandCategoryTranslation.translationFile") && (0, i.E$)("registerAdserver").before((function(e) {
                e.call(this, "dfp")
            })), (0, o.s)("dfp", {
                buildVideoUrl: function(e) {
                    if (!e.params && !e.url) return void(0, a.logError)("A params object or a url is required to use owpbjs.adServers.dfp.buildVideoUrl");
                    const t = e.adUnit,
                        r = e.bid || s.U7.getWinningBids(t.code)[0];
                    let n = {};
                    if (e.url && (n = (0, a.parseUrl)(e.url, {
                            noDecodeWholeURL: !0
                        }), (0, a.isEmpty)(e.params))) return function(e, t, r) {
                        const n = f(t, e, "search");
                        n && (e.search.description_url = n);
                        return e.search.cust_params = m(t, r, e.search.cust_params), (0, a.buildUrl)(e)
                    }(n, r, e);
                    const o = {
                            correlator: Date.now(),
                            sz: (0, a.parseSizesInput)((0, d.c)(t, "mediaTypes.video.playerSize")).join("|"),
                            url: encodeURIComponent(location.href)
                        },
                        c = n.search,
                        i = c && c.sz;
                    i && (o.sz = i + "|" + o.sz);
                    let p = m(r, e, c && c.cust_params);
                    const u = Object.assign({}, A, n.search, o, e.params, {
                            cust_params: p
                        }),
                        _ = f(r, e, "params");
                    _ && (u.description_url = _);
                    const T = l.Gq.getConsentData();
                    T && ("boolean" == typeof T.gdprApplies && (u.gdpr = Number(T.gdprApplies)), T.consentString && (u.gdpr_consent = T.consentString), T.addtlConsent && (u.addtl_consent = T.addtlConsent));
                    const C = l.U$.getConsentData();
                    if (C && (u.us_privacy = C), l.S_.getConsentData(), !u.ppid) {
                        const e = (0, g.k)();
                        null != e && (u.ppid = e)
                    }
                    return (0, a.buildUrl)(Object.assign({
                        protocol: "https",
                        host: "securepubads.g.doubleclick.net",
                        pathname: "/gampad/ads"
                    }, n, {
                        search: u
                    }))
                },
                buildAdpodVideoUrl: function() {
                    let {
                        code: e,
                        params: t,
                        callback: r
                    } = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
                    if (!t || !r) return void(0, a.logError)("A params object and a callback is required to use pbjs.adServers.dfp.buildAdpodVideoUrl");
                    const n = {
                        correlator: Date.now(),
                        sz: function(e) {
                            let t = p.M.getAdUnits().filter((t => t.code === e)),
                                r = (0, d.c)(t[0], "mediaTypes.video.playerSize");
                            return (0, a.parseSizesInput)(r).join("|")
                        }(e),
                        url: encodeURIComponent(location.href)
                    };
                    C.getTargeting({
                        codes: [e],
                        callback: function(o, s) {
                            if (o) return void r(o, null);
                            let d = {
                                    [C.TARGETING_KEY_PB_CAT_DUR]: void 0,
                                    [C.TARGETING_KEY_CACHE_ID]: void 0
                                },
                                c = {};
                            s[e] && (c = s[e].reduce(((e, t) => (Object.keys(t)[0] === C.TARGETING_KEY_PB_CAT_DUR ? e[C.TARGETING_KEY_PB_CAT_DUR] = void 0 !== e[C.TARGETING_KEY_PB_CAT_DUR] ? e[C.TARGETING_KEY_PB_CAT_DUR] + "," + t[C.TARGETING_KEY_PB_CAT_DUR] : t[C.TARGETING_KEY_PB_CAT_DUR] : Object.keys(t)[0] === C.TARGETING_KEY_CACHE_ID && (e[C.TARGETING_KEY_CACHE_ID] = t[C.TARGETING_KEY_CACHE_ID]), e)), d));
                            let i = encodeURIComponent((0, a.formatQS)(c));
                            const p = Object.assign({}, A, n, t, {
                                    cust_params: i
                                }),
                                u = l.Gq.getConsentData();
                            u && ("boolean" == typeof u.gdprApplies && (p.gdpr = Number(u.gdprApplies)), u.consentString && (p.gdpr_consent = u.consentString), u.addtlConsent && (p.addtl_consent = u.addtlConsent));
                            const _ = l.U$.getConsentData();
                            _ && (p.us_privacy = _);
                            const g = (0, a.buildUrl)({
                                protocol: "https",
                                host: "securepubads.g.doubleclick.net",
                                pathname: "/gampad/ads",
                                search: p
                            });
                            r(null, g)
                        }
                    })
                },
                getAdpodTargeting: e => C.getTargeting(e)
            }), (0, i.OS)("adpod", C), (0, n.g)("dfpAdServerVideo")
        },
        25756: (e, t, r) => {
            r.d(t, {
                s: () => a
            });
            var n = r(48176),
                o = r(28768);
            const s = (0, n.A)();

            function a(e, t) {
                s.adServers = s.adServers || {}, s.adServers[e] = s.adServers[e] || {}, Object.keys(t).forEach((r => {
                    s.adServers[e][r] ? (0, o.logWarn)("Attempting to add an already registered function property ".concat(r, " for AdServer ").concat(e, ".")) : s.adServers[e][r] = t[r]
                }))
            }
        },
        16496: (e, t, r) => {
            r.d(t, {
                k: () => n
            });
            const n = (0, r(74712).Ok)("sync", (() => {}))
        }
    },
    e => {
        e.O(0, [21240], (() => {
            return t = 96556, e(e.s = t);
            var t
        }));
        e.O()
    }
]);
(self.owpbjsChunk = self.owpbjsChunk || []).push([
    [10328], {
        62996: (e, s, n) => {
            (0, n(48176).g)("enrichmentFpdModule")
        }
    },
    e => {
        e.O(0, [21240], (() => {
            return s = 62996, e(e.s = s);
            var s
        }));
        e.O()
    }
]);
(self.owpbjsChunk = self.owpbjsChunk || []).push([
    [62596], {
        79528: (e, o, n) => {
            var t = n(48176),
                i = n(65576),
                r = n(74712),
                l = n(28768),
                d = n(79344),
                c = n(2280),
                s = n(1276),
                a = n(16112),
                f = n(97e3),
                u = n(16259),
                g = n(228);
            const p = "fledgeForGpt",
                v = {};
            let b = !1;

            function m(e) {
                let {
                    auctionId: o
                } = e;
                v[o] = {}
            }

            function h(e) {
                let {
                    auctionId: o,
                    bidsReceived: n,
                    bidderRequests: t
                } = e;
                try {
                    const e = null == t ? void 0 : t.flatMap((e => e.bids));
                    Object.entries(v[o]).forEach((o => {
                        let [t, i] = o;
                        const r = e => e.adUnitCode === t,
                            c = function() {
                                let e, o, n = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : [],
                                    t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : [];
                                if (n.length > 0) {
                                    const t = n.reduce((0, u.Wi)((0, f.yg)((e => [e.cpm, e.currency]))));
                                    e = t.cpm, o = t.currency
                                } else {
                                    const n = t.map((e => "function" == typeof e.getFloor && e.getFloor())).filter((e => e)),
                                        i = n.length && n.reduce((0, u.OC)((0, f.yg)((e => [e.floor, e.currency]))));
                                    e = null == i ? void 0 : i.floor, o = null == i ? void 0 : i.currency
                                }
                                const i = {};
                                return e && ((0, d.e)(i, "auctionSignals.prebid.bidfloor", e), o && (0, d.e)(i, "auctionSignals.prebid.bidfloorcur", o)), i
                            }(null == n ? void 0 : n.filter(r), null == e ? void 0 : e.filter(r));
                        ! function(e, o) {
                            const n = (0, g.u0)(e);
                            n && n.setConfig ? (n.setConfig({
                                componentAuction: o.map((e => ({
                                    configKey: e.seller,
                                    auctionConfig: e
                                })))
                            }), (0, l.logInfo)(p, "register component auction configs for: ".concat(e, ": ").concat(n.getAdUnitPath()), o)) : (0, l.logWarn)(p, "unable to register component auction config for ".concat(e), o)
                        }(t, i.map((e => (0, l.mergeDeep)({}, c, e))))
                    }))
                } finally {
                    delete v[o]
                }
            }

            function C(e, o, n) {
                const {
                    adUnitCode: t,
                    auctionId: i,
                    ortb2: r,
                    ortb2Imp: d
                } = o;
                var c, s;
                v.hasOwnProperty(i) ? (s = {
                    ortb2: r,
                    ortb2Imp: d
                }, (c = n).auctionSignals = (0, l.mergeDeep)({}, {
                    prebid: s
                }, c.auctionSignals), !v[i].hasOwnProperty(t) && (v[i][t] = []), v[i][t].push(n)) : (0, l.logWarn)(p, "Received component auction config for auction that has closed (auction '".concat(i, "', adUnit '").concat(t, "')"), n), e(o, n)
            }

            function E() {
                return "runAdAuction" in navigator && "joinAdInterestGroup" in navigator
            }

            function y(e, o) {
                if (E()) {
                    var n;
                    const e = i.config.getConfig("fledgeForGpt"),
                        t = null !== (n = null == e ? void 0 : e.bidders) && void 0 !== n ? n : [];
                    o.forEach((o => {
                        const n = (null == e ? void 0 : e.enabled) && (0 === t.length || t.includes(o.bidderCode));
                        i.config.runWithBidder(o.bidderCode, (() => {
                            var t, r;
                            const l = null !== (t = i.config.getConfig("fledgeEnabled")) && void 0 !== t ? t : n ? e.enabled : void 0,
                                c = null !== (r = i.config.getConfig("defaultForSlots")) && void 0 !== r ? r : n ? null == e ? void 0 : e.defaultForSlots : void 0;
                            Object.assign(o, {
                                fledgeEnabled: l
                            }), o.bids.forEach((e => {
                                var o, n;
                                (0, d.e)(e, "ortb2Imp.ext.ae", null !== (o = null === (n = e.ortb2Imp) || void 0 === n || null === (n = n.ext) || void 0 === n ? void 0 : n.ae) && void 0 !== o ? o : c)
                            }))
                        }))
                    }))
                }
                e(o)
            }
            i.config.getConfig("fledgeForGpt", (e => {
                var o;
                (o = e.fledgeForGpt) && !0 === o.enabled ? (b || ((0, r.E$)("addComponentAuction").before(C), (0, r.E$)("makeBidRequests").after(y), s.on(a.EVENTS.AUCTION_INIT, m), s.on(a.EVENTS.AUCTION_END, h), b = !0), (0, l.logInfo)("".concat(p, " enabled (browser ").concat(E() ? "supports" : "does NOT support", " fledge)"), o)) : (b && ((0, r.E$)("addComponentAuction").getHooks({
                    hook: C
                }).remove(), (0, r.E$)("makeBidRequests").getHooks({
                    hook: y
                }).remove(), s.off(a.EVENTS.AUCTION_INIT, m), s.off(a.EVENTS.AUCTION_END, h), b = !1), (0, l.logInfo)("".concat(p, " disabled"), o))
            })), (0, c.G0)({
                type: c.Mz,
                name: "impExtAe",
                fn: function(e, o, n) {
                    var t, i;
                    null !== (t = e.ext) && void 0 !== t && t.ae && !n.bidderRequest.fledgeEnabled && (null === (i = e.ext) || void 0 === i || delete i.ae)
                }
            }), (0, c.G0)({
                type: c.O4,
                name: "extPrebidFledge",
                fn: function(e, o, n) {
                    var t;
                    ((null === (t = o.ext) || void 0 === t || null === (t = t.prebid) || void 0 === t || null === (t = t.fledge) || void 0 === t ? void 0 : t.auctionconfigs) || []).forEach((e => {
                        var o;
                        const t = n.impContext[e.impid];
                        null != t && null !== (o = t.imp) && void 0 !== o && null !== (o = o.ext) && void 0 !== o && o.ae ? (t.fledgeConfigs = t.fledgeConfigs || [], t.fledgeConfigs.push(e)) : (0, l.logWarn)("Received fledge auction configuration for an impression that was not in the request or did not ask for it", e, null == t ? void 0 : t.imp)
                    }))
                },
                dialects: [c.mw]
            }), (0, c.G0)({
                type: c.O4,
                name: "fledgeAuctionConfigs",
                priority: -1,
                fn: function(e, o, n) {
                    const t = Object.values(n.impContext).flatMap((e => (e.fledgeConfigs || []).map((o => ({
                        bidId: e.bidRequest.bidId,
                        config: o.config
                    })))));
                    t.length > 0 && (e.fledgeAuctionConfigs = t)
                },
                dialects: [c.mw]
            }), (0, t.g)("fledgeForGpt")
        },
        2280: (e, o, n) => {
            n.d(o, {
                G0: () => f,
                Mz: () => r,
                O4: () => d,
                OM: () => i,
                _8: () => l,
                iW: () => u,
                mw: () => s,
                qs: () => t,
                sT: () => c
            });
            const t = ["request", "imp", "bidResponse", "response"],
                [i, r, l, d] = t,
                [c, s] = ["default", "pbs"],
                a = new Set(t);
            const {
                registerOrtbProcessor: f,
                getProcessors: u
            } = function() {
                const e = {};
                return {
                    registerOrtbProcessor(o) {
                        let {
                            type: n,
                            name: i,
                            fn: r,
                            priority: l = 0,
                            dialects: d = [c]
                        } = o;
                        if (!a.has(n)) throw new Error("ORTB processor type must be one of: ".concat(t.join(", ")));
                        d.forEach((o => {
                            e.hasOwnProperty(o) || (e[o] = {}), e[o].hasOwnProperty(n) || (e[o][n] = {}), e[o][n][i] = {
                                priority: l,
                                fn: r
                            }
                        }))
                    },
                    getProcessors: o => e[o] || {}
                }
            }()
        }
    },
    e => {
        e.O(0, [78444, 90912, 21240], (() => {
            return o = 79528, e(e.s = o);
            var o
        }));
        e.O()
    }
]);
(self.owpbjsChunk = self.owpbjsChunk || []).push([
    [82912], {
        48232: (t, e, r) => {
            var a = r(48176),
                o = r(28768),
                n = r(37280),
                c = r(97200);
            (0, a.A)().detectLocation = function(t, e) {
                const r = function(t) {
                    try {
                        let r = JSON.parse(t);
                        e(r)
                    } catch (t) {
                        (0, o.logInfo)("Location data is expected to be an object"), e({
                            error: t
                        })
                    }
                };
                try {
                    (0, n.aO)(500)(t, {
                        success: r,
                        error: function(t) {
                            e({
                                error: t
                            })
                        }
                    }, null, {
                        contentType: "application/x-www-form-urlencoded",
                        method: "GET"
                    })
                } catch (t) {
                    e({
                        error: t
                    })
                }
            };
            var i = (0, c.KX)({
                bidderCode: "pubmatic"
            });
            (0, a.A)().getDataFromLocalStorage = function(t, e) {
                try {
                    var r = i.getDataFromLocalStorage(t);
                    if (r) {
                        var a = JSON.parse(r).createdDate;
                        let o = (new Date).valueOf();
                        return Math.abs(o - a) > e ? void i.removeDataFromLocalStorage(t) : r
                    }
                    return
                } catch (t) {
                    return
                }
            }, (0, a.A)().setAndStringifyToLocalStorage = function(t, e) {
                try {
                    e.createdDate = (new Date).valueOf(), i.setDataInLocalStorage(t, JSON.stringify(e))
                } catch (t) {
                    (0, o.logError)("Error in setting localstorage ", t)
                }
            }, (0, a.g)("geoDetection")
        }
    },
    t => {
        t.O(0, [21240], (() => {
            return e = 48232, t(t.s = e);
            var e
        }));
        t.O()
    }
]);
(self.owpbjsChunk = self.owpbjsChunk || []).push([
    [46374], {
        29648: (t, e, o) => {
            var a = o(48176),
                d = o(28768),
                n = o(79344),
                s = o(52420),
                c = o(65576),
                r = o(74712),
                i = o(11636);
            let l = {},
                u = !1;
            const p = t => (c.config.getConfig("gptPreAuction") || {}).mcmEnabled ? t.replace(/(^\/\d*),\d*\//, "$1/") : t,
                f = function(t, e) {
                    (t => {
                        const {
                            customGptSlotMatching: e
                        } = l;
                        if (!(0, d.isGptPubadsDefined)()) return;
                        const o = t.reduce(((t, e) => (t[e.code] = t[e.code] || [], t[e.code].push(e), t)), {});
                        window.googletag.pubads().getSlots().forEach((t => {
                            const a = (0, i.iw)(Object.keys(o), e ? e(t) : (0, d.isAdUnitCodeMatchingSlot)(t));
                            if (a) {
                                const e = {
                                    name: "gam",
                                    adslot: p(t.getAdUnitPath())
                                };
                                o[a].forEach((t => {
                                    var o;
                                    (0, n.e)(t, "ortb2Imp.ext.data.adserver", Object.assign({}, null === (o = t.ortb2Imp) || void 0 === o || null === (o = o.ext) || void 0 === o || null === (o = o.data) || void 0 === o ? void 0 : o.adserver, e))
                                }))
                            }
                        }))
                    })(e);
                    const {
                        useDefaultPreAuction: o,
                        customPreAuction: a
                    } = l;
                    e.forEach((t => {
                        t.ortb2Imp = t.ortb2Imp || {}, t.ortb2Imp.ext = t.ortb2Imp.ext || {}, t.ortb2Imp.ext.data = t.ortb2Imp.ext.data || {};
                        const e = t.ortb2Imp.ext;
                        if (a || o) {
                            let n, c = (0, s.c)(e, "data.adserver.adslot");
                            a ? n = a(t, c) : o && (n = ((t, e) => {
                                const o = t.ortb2Imp.ext.data;
                                if (o.pbadslot) return o.pbadslot;
                                if ((0, d.isGptPubadsDefined)()) {
                                    var a = window.googletag.pubads().getSlots().filter((t => t.getAdUnitPath() === e));
                                    if (0 !== a.length) return 1 === a.length ? e : "".concat(e, "#").concat(t.code)
                                }
                            })(t, c)), n && (e.gpid = e.data.pbadslot = n)
                        } else {
                            const o = (t => {
                                const e = t.ortb2Imp.ext.data,
                                    {
                                        customPbAdSlot: o
                                    } = l;
                                if (!e.pbadslot)
                                    if (o) e.pbadslot = o(t.code, (0, s.c)(e, "adserver.adslot"));
                                    else {
                                        try {
                                            const o = document.getElementById(t.code);
                                            if (o.dataset.adslotid) return void(e.pbadslot = o.dataset.adslotid)
                                        } catch (t) {}
                                        if (!(0, s.c)(e, "adserver.adslot")) return e.pbadslot = t.code, !0;
                                        e.pbadslot = e.adserver.adslot
                                    }
                            })(t);
                            e.gpid || o || (e.gpid = e.data.pbadslot)
                        }
                    }));
                    for (var c = arguments.length, r = new Array(c > 2 ? c - 2 : 0), u = 2; u < c; u++) r[u - 2] = arguments[u];
                    return t.call(undefined, e, ...r)
                },
                g = t => {
                    l = (0, d.pick)(t, ["enabled", t => !1 !== t, "customGptSlotMatching", t => "function" == typeof t && t, "customPbAdSlot", t => "function" == typeof t && t, "customPreAuction", t => "function" == typeof t && t, "useDefaultPreAuction", t => !0 === t]), l.enabled ? u || ((0, r.E$)("makeBidRequests").before(f), u = !0) : ((0, d.logInfo)("".concat("GPT Pre-Auction", ": Turning off module")), l = {}, (0, r.E$)("makeBidRequests").getHooks({
                        hook: f
                    }).remove(), u = !1)
                };
            c.config.getConfig("gptPreAuction", (t => g(t.gptPreAuction))), g({}), (0, a.g)("gptPreAuction")
        }
    },
    t => {
        t.O(0, [21240], (() => {
            return e = 29648, t(t.s = e);
            var e
        }));
        t.O()
    }
]);
(self.owpbjsChunk = self.owpbjsChunk || []).push([
    [46332], {
        58416: (e, t, n) => {
            var o = n(48176),
                i = n(28768),
                s = n(52420),
                r = n(65576),
                c = n(71695),
                a = n(52224),
                d = n(1276),
                f = n(16112);
            const {
                CACHE_ID: u,
                UUID: l
            } = f.TARGETING_KEYS, {
                BID_WON: g,
                AUCTION_END: p
            } = f.EVENTS, {
                RENDERED: T
            } = f.BID_STATUS;
            r.config.setDefaults({
                instreamTracking: (0, i.deepClone)({
                    enabled: !1,
                    maxWindow: 6e4,
                    pollingFreq: 500
                })
            });
            const m = /video|fetch|xmlhttprequest|other/;
            d.on(p, (function(e) {
                let {
                    adUnits: t,
                    bidsReceived: n,
                    bidderRequests: o
                } = e;
                const f = r.config.getConfig("instreamTracking") || {};
                if (!f.enabled || !window.performance || !window.performance.getEntriesByType) return !1;
                const p = n.filter((e => {
                    const t = (0, i.getBidRequest)(e.requestId, o);
                    return t && (0, s.c)(t, "mediaTypes.video.context") === a.SW && e.videoCacheKey
                }));
                if (!p.length) return !1;
                const E = {};
                t.forEach((e => {
                    E[e.code] || (0, s.c)(e, "mediaTypes.video.context") !== a.SW || (E[e.code] = !0)
                }));
                const h = Object.keys(E).length,
                    w = Date.now(),
                    {
                        maxWindow: y,
                        pollingFreq: D,
                        urlPattern: x
                    } = f;
                let C = 0,
                    v = 0;
                return setTimeout((function e() {
                    const t = window.performance.getEntriesByType("resource").splice(v);
                    for (const e of t) {
                        const t = e.name;
                        m.test(e.initiatorType) && p.forEach((e => {
                            const n = !(-1 !== t.indexOf(u) || -1 !== t.indexOf(l)) && -1 !== t.indexOf(e.videoCacheKey);
                            x && x instanceof RegExp && !x.test(t) || n && e.status !== T && (C++, c.M.addWinningBid(e), d.emit(g, e))
                        }))
                    }
                    v += t.length, Date.now() - w < y && C < h && setTimeout(e, D)
                }), D), !0
            })), (0, o.g)("instreamTracking")
        }
    },
    e => {
        e.O(0, [21240], (() => {
            return t = 58416, e(e.s = t);
            var t
        }));
        e.O()
    }
]);
(self.owpbjsChunk = self.owpbjsChunk || []).push([
    [48364], {
        37564: (n, t, i) => {
            var o = i(48176),
                u = i(65576),
                e = i(1276),
                c = i(16112),
                s = i(28768),
                d = i(39024);
            const a = "https://pm-harshad-mane.github.io/pbjs-debug-ui/bundle.js",
                E = 3e3,
                f = "_pbjsDebugUI",
                A = "_auctions",
                b = "_init",
                r = "_end",
                N = "_bidsWon",
                T = "_debug",
                g = "_targeting",
                I = "_tcf2Enforcement";
            let _ = !1,
                p = !1;

            function O() {
                !1 === p && (p = !0, (0, d.M)(a, "pbjs-debug-ui"))
            }

            function j() {
                !1 === (0, s.isPlainObject)((0, o.A)()[f]) && ((0, o.A)()[f] = {})
            }

            function l() {
                !1 === (0, s.isArray)((0, o.A)()[f][A]) && ((0, o.A)()[f][A] = [])
            }

            function S(n) {
                let t = (0, o.A)()[f][A].find((t => t.auctionId === n));
                return !1 === (0, s.isPlainObject)(t) && (t = {
                    auctionId: n
                }, (0, o.A)()[f][A].push(t)), t
            }

            function h(n) {
                j(), l(), S(n.auctionId)[b] = n
            }

            function C(n) {
                j(), l(), n.auctionStart = n.timestamp, S(n.auctionId)[r] = n
            }

            function m(n) {
                j(), !1 === (0, s.isArray)((0, o.A)()[f][T]) && ((0, o.A)()[f][T] = []),
                    function(n) {
                        (0, o.A)()[f][T].push(n)
                    }(n)
            }

            function w(n) {
                j(), !1 === (0, s.isPlainObject)((0, o.A)()[f][I]) && ((0, o.A)()[f][I] = {}),
                    function(n) {
                        (0, o.A)()[f][I] = n
                    }(n)
            }

            function D(n) {
                j(), l(), (0, o.A)()[f][A][(0, o.A)()[f][A].length - 1][g] = n
            }

            function P(n) {
                j(), l();
                let t = S(n.auctionId);
                (0, s.isPlainObject)(t[N]) || (t[N] = {}), t[N][n.adId] = n
            }

            function U(n) {
                !0 !== n || _ || (e.on(c.EVENTS.AUCTION_INIT, h), e.on(c.EVENTS.AUCTION_END, C), e.on(c.EVENTS.AUCTION_DEBUG, m), e.on(c.EVENTS.SET_TARGETING, D), e.on(c.EVENTS.TCF2_ENFORCEMENT, w), e.on(c.EVENTS.BID_WON, P), _ = !0, window.PBJS_NAMESPACE = "owpbjs", j(), l(), window.document.addEventListener("DOMContentLoaded", (function() {
                    O()
                })), setTimeout((function() {
                    O()
                }), E))
            }
            u.config.getConfig("debug", (n => U(n.debug))), (0, o.g)("prebidJSDebugUI")
        }
    },
    n => {
        n.O(0, [21240], (() => {
            return t = 37564, n(n.s = t);
            var t
        }));
        n.O()
    }
]);
(self.owpbjsChunk = self.owpbjsChunk || []).push([
    [80512], {
        18728: (e, i, n) => {
            var o = n(48176),
                d = n(28768),
                t = n(87732),
                s = n(12576),
                r = n(16112),
                a = n(37280),
                u = n(65576),
                p = n(97200),
                l = n(228);
            const c = "pubmatic",
                b = "https://t.pubmatic.com/",
                m = b + "wl?",
                f = b + "wt?",
                v = "PubMatic-Analytics: ",
                g = {
                    auctions: {}
                },
                C = "success",
                w = "no-bid",
                I = "error",
                R = "request-error",
                h = "timeout-error",
                y = "",
                T = "-1",
                D = "banner",
                U = "USD",
                N = 2,
                E = window.encodeURIComponent,
                k = {
                    BANNER: 0,
                    VIDEO: 1,
                    NATIVE: 2
                },
                S = "PROFILE_AUCTION_INFO_";
            let P = 0,
                A = 0,
                x = 0,
                O = [],
                q = 0;
            const F = (0, p.KX)({
                bidderCode: c
            });

            function L(e) {
                return {
                    width: e.w || e[0],
                    height: e.h || e[1]
                }
            }

            function W(e) {
                return {
                    banner: 1,
                    native: 1,
                    video: 1
                }.hasOwnProperty(e)
            }

            function V(e) {
                return (0, d.pick)(e, ["bidder", "bidderCode", "adapterCode", "bidId", "status", () => w, "finalSource as source", "params", "floorData", "adUnit", () => (0, d.pick)(e, ["adUnitCode", "transactionId", "sizes as dimensions", e => e && e.map(L), "mediaTypes", i => function(e, i) {
                    return i.mediaType && W(i.mediaType) ? [i.mediaType] : Array.isArray(e) ? e.filter(W) : "object" == typeof e ? (i.sizes || (i.dimensions = [], (0, d._each)(e, (e => i.dimensions = i.dimensions.concat(e.sizes.map(L))))), Object.keys(e).filter(W)) : [D]
                }(i, e)])])
            }

            function _(e) {
                let i = window.document.createElement("a");
                return i.href = e, i.hostname
            }

            function j() {
                var e = 3;
                try {
                    var i = navigator.userAgent;
                    if (i && (0, d.isStr)(i) && "" != i.trim()) {
                        i = i.toLowerCase().trim();
                        var n = new RegExp("(mobi|tablet|ios).*");
                        e = i.match(n) ? 2 : 1
                    }
                } catch (e) {}
                return e
            }

            function M(e, i) {
                return e.params && (e.params.regexPattern || e.params.regex_pattern) ? e.params.regexPattern || e.params.regex_pattern : e.bidResponse && e.bidResponse.regexPattern ? e.bidResponse.regexPattern : e.params && e.params.kgpv ? B(e.params.kgpv, e.bidResponse) : i
            }

            function B(e, i) {
                if (i && i.mediaType && "video" == i.mediaType) {
                    var n = ["", "0x0"],
                        o = e.split("@");
                    if (o.length > 1) {
                        if (2 == o.length) {
                            if (o[1].indexOf(":") > -1) {
                                var d = o[1].split(":");
                                n[1] = n[1] + ":" + d[1]
                            }
                            n[0] = o[0]
                        }
                        e = n.join("@")
                    }
                }
                return e
            }

            function G(e) {
                return window.PWT && (0, d.isFn)(window.PWT.getAdapterNameForAlias) ? window.PWT.getAdapterNameForAlias(e) : s.cp.aliasRegistry[e] || e
            }

            function K(e) {
                if (e.meta && e.meta.advertiserDomains && e.meta.advertiserDomains.length > 0) {
                    let i = e.meta.advertiserDomains[0];
                    if (i) try {
                        return new URL(i).hostname.replace("www.", "")
                    } catch (e) {
                        return (0, d.logWarn)(v + "Adomain URL (Not a proper URL):", i), i.split("/")[0].replace("www.", "")
                    }
                }
            }

            function z(e) {
                return function(e) {
                    return "object" == typeof e && null !== e
                }(e) && 0 === Object.keys(e).length
            }

            function J(e) {
                return O.indexOf(e) > -1 ? 1 : 0
            }

            function H(e) {
                if (!e || z(e)) return;
                const i = {};
                return e.networkId && (i.nwid = e.networkId), e.advertiserId && (i.adid = e.advertiserId), e.networkName && (i.nwnm = e.networkName), e.primaryCatId && (i.pcid = e.primaryCatId), e.advertiserName && (i.adnm = e.advertiserName), e.agencyId && (i.agid = e.agencyId), e.agencyName && (i.agnm = e.agencyName), e.brandId && (i.brid = e.brandId), e.brandName && (i.brnm = e.brandName), e.dchain && (i.dc = e.dchain), e.demandSource && (i.ds = e.demandSource), e.secondaryCatIds && (i.scids = e.secondaryCatIds), z(i) ? void 0 : i
            }

            function Y(e, i, n) {
                return n = n && n.length > 0 ? n[0] : null, Object.keys(e.bids).reduce((function(o, d) {
                    return e.bids[d].forEach((function(e) {
                        var d;
                        const t = e.bidResponse && e.bidResponse.prebidBidId;
                        o.push({
                            pn: G(e.adapterCode || e.bidder),
                            bc: e.bidderCode || e.bidder,
                            bidid: t || e.bidId,
                            origbidid: e.bidId,
                            db: e.bidResponse ? 0 : 1,
                            kgpv: M(e, i),
                            kgpsv: e.params && e.params.kgpv ? B(e.params.kgpv, e.bidResponse) : i,
                            psz: e.bidResponse ? e.bidResponse.dimensions.width + "x" + e.bidResponse.dimensions.height : "0x0",
                            eg: e.bidResponse ? e.bidResponse.bidGrossCpmUSD : 0,
                            en: e.bidResponse ? e.bidResponse.bidPriceUSD : 0,
                            di: e.bidResponse && e.bidResponse.dealId || T,
                            dc: e.bidResponse && e.bidResponse.dealChannel || y,
                            l1: e.serverLatencyTimeMs ? e.serverLatencyTimeMs : e.partnerTimeToRespond || 0,
                            ol1: e.bidResponse ? e.clientLatencyTimeMs : 0,
                            l2: 0,
                            adv: e.bidResponse && K(e.bidResponse) || void 0,
                            ss: J(e.bidder),
                            t: e.status == I && e.error.code == h ? 1 : 0,
                            wb: n && n.adId === e.adId ? 1 : 0,
                            mi: e.bidResponse ? e.bidResponse.mi : window.matchedimpressions && window.matchedimpressions[e.bidder],
                            af: e.bidResponse && e.bidResponse.mediaType || void 0,
                            ocpm: e.bidResponse && e.bidResponse.originalCpm || 0,
                            ocry: e.bidResponse && e.bidResponse.originalCurrency || U,
                            piid: e.bidResponse && e.bidResponse.partnerImpId || y,
                            frv: e.bidResponse ? null === (d = e.bidResponse.floorData) || void 0 === d ? void 0 : d.floorRuleValue : void 0,
                            md: e.bidResponse ? H(e.bidResponse.meta) : void 0
                        })
                    })), o
                }), [])
            }

            function X(e) {
                var i = Object.values(e.bids).filter((e => !!e.bidResponse && "native" === e.bidResponse.mediaType))[0];
                return i || void 0 === i && 0 === e.dimensions.length ? ["1x1"] : e.dimensions.map((function(e) {
                    return e[0] + "x" + e[1]
                }))
            }

            function Q(e) {
                return e ? Object.keys(e.mediaTypes || {}).map((e => k[e.toUpperCase()])) : []
            }

            function Z(e, i) {
                return e.filter((e => e.divID && e.divID == i || e.code == i))[0]
            }

            function $() {
                var e = parseInt(u.config.getConfig("testGroupId") || 0);
                return e <= 15 && e >= 0 ? e : 0
            }

            function ee(e) {
                if (null == e || !e.floorRequestData) return !1;
                const {
                    location: i,
                    fetchStatus: n
                } = null == e ? void 0 : e.floorRequestData, o = i !== r.C6.Ih, d = i === r.C6.ew && n === r.C6._Y, t = i === r.C6.OC || i === r.C6.Gu;
                return o && (t || d)
            }

            function ie() {
                var e = u.config.getConfig("cds"),
                    i = "";
                return e && (Object.keys(e).map((function(n) {
                    var o = e[n].value;
                    o = Array.isArray(o) || "object" == typeof o || "function" == typeof o || void 0 === o ? "" : o, i += n + "=" + o + ";"
                })), i = i.slice(0, -1)), E(i)
            }

            function ne(e, i) {
                var n, t, s, p;
                const c = window.location.host,
                    b = F.getDataFromLocalStorage(S + c),
                    f = null !== b ? JSON.parse(b) : {};
                let v = e.auctionId,
                    C = u.config.getConfig("pageUrl") || (null === (n = g.auctions[v]) || void 0 === n ? void 0 : n.referer) || "",
                    w = g.auctions[v],
                    I = ee(null == w ? void 0 : w.floorData),
                    R = (null == w ? void 0 : w.wiid) || v,
                    h = null == w ? void 0 : w.floorData,
                    y = {
                        s: []
                    },
                    T = m;
                w && (w.sent || (T += "pubid=" + P, y.pubid = "" + P, y.iid = "" + R, y.to = "" + w.timeout, y.purl = C, y.orig = _(C), y.tst = Math.round((new window.Date).getTime() / 1e3), y.pid = "" + A, y.pdvid = "" + x, y.psl = function(e) {
                    let i = window.pbsLatency,
                        n = i && i[e],
                        o = n ? 0 : void 0;
                    return n && n.startTime && n.endTime && (o = n.endTime - n.startTime), o
                }(v), y.dvc = {
                    plt: j()
                }, y.bm = window.PWT && window.PWT.browserMapping, y.ih = q, y.it = function() {
                    var e;
                    let i = u.config.getConfig("s2sConfig");
                    return null != i && null !== (e = i.bidders) && void 0 !== e && e.length ? "hybrid" : "web"
                }(), y.tpv = null == f ? void 0 : f.pageView, y.trc = null == f ? void 0 : f.slotCnt, y.tbs = null == f ? void 0 : f.bidServed, y.tis = null == f ? void 0 : f.impressionServed, y.lip = null == f ? void 0 : f.lip, y.tgid = $(), y.pbv = (null === (t = (0, o.A)()) || void 0 === t ? void 0 : t.version) || "-1", h && I && (y.fmv = h.floorRequestData && h.floorRequestData.modelVersion || void 0, y.ft = h.floorResponseData ? 0 == h.floorResponseData.enforcements.enforceJS ? 0 : 1 : void 0), (null === (s = window.PWT) || void 0 === s || null === (s = s.CC) || void 0 === s ? void 0 : s.cc) && (y.ctr = window.PWT.CC.cc), y.s = Object.keys(w.adUnitCodes).reduce((function(e, n) {
                    var o, t, s, a, u, p;
                    let c = w.adUnitCodes[n],
                        b = Z(w.origAdUnits, n) || {},
                        m = {
                            sn: n,
                            au: b.adUnitId || (null === (o = (0, l.k5)(n)) || void 0 === o ? void 0 : o.gptSlot) || n,
                            mt: Q(b),
                            sz: X(c),
                            ps: Y(c, n, i.filter((e => e.adUnitCode === n))),
                            bs: null == f || null === (t = f.slotLevelFrquencyDepth) || void 0 === t || null === (t = t[b.adUnitId]) || void 0 === t ? void 0 : t.bidServed,
                            is: null == f || null === (s = f.slotLevelFrquencyDepth) || void 0 === s || null === (s = s[b.adUnitId]) || void 0 === s ? void 0 : s.impressionServed,
                            rc: null == f || null === (a = f.slotLevelFrquencyDepth) || void 0 === a || null === (a = a[b.adUnitId]) || void 0 === a ? void 0 : a.slotCnt,
                            vw: null == f || null === (u = f.viewedSlot) || void 0 === u ? void 0 : u[b.adUnitId],
                            rf: null != b && null !== (p = b.pubmaticAutoRefresh) && void 0 !== p && p.isRefreshed ? 1 : 0,
                            fskp: h && I && h.floorRequestData ? 0 == h.floorRequestData.skipped ? 0 : 1 : void 0,
                            sid: (0, d.generateUUID)()
                        };
                    if (null != h && h.floorRequestData) {
                        const {
                            location: e,
                            fetchStatus: i,
                            floorProvider: n
                        } = null == h ? void 0 : h.floorRequestData;
                        m.ffs = {
                            [r.C6._Y]: 1,
                            [r.C6._b]: 2,
                            [r.C6.o9]: 4,
                            undefined: 0
                        } [i], m.fsrc = {
                            [r.C6.ew]: 2,
                            [r.C6.Ih]: 0,
                            [r.C6.OC]: 1,
                            [r.C6.Gu]: 1
                        } [e], m.fp = n
                    }
                    return e.push(m), e
                }), []), y.owv = (null === (p = window.PWT) || void 0 === p || null === (p = p.versionDetails) || void 0 === p ? void 0 : p.openwrap_version) || "-1", y.cds = ie(), w.sent = !0, (0, a.Kk)(T, null, "json=" + E(JSON.stringify(y)), {
                    contentType: "application/x-www-form-urlencoded",
                    withCredentials: !0,
                    method: "POST"
                })))
            }

            function oe(e) {
                let i = g.auctions[e.auctionId].adUnitCodes[e.adUnitCode].bids[e.requestId][0];
                if (!i) return void(0, d.logError)(v + "Could not find associated bid request for bid response with requestId: ", e.requestId);
                var n, t;
                (i.bidder && e.bidderCode && i.bidder !== e.bidderCode || i.bidder === e.bidderCode && i.status === C) && (i.params && (e.params = i.params), null !== (n = i) && void 0 !== n && null !== (n = n.bidResponse) && void 0 !== n && n.partnerImpId && (e.partnerImpId = i.bidResponse.partnerImpId), i = V(e), i.bidId = e.requestId, g.auctions[e.auctionId].adUnitCodes[e.adUnitCode].bids[e.requestId].push(i));
                e.floorData && (g.auctions[e.auctionId].floorData.floorResponseData = e.floorData), i.adId = e.adId, i.source = (void 0 === (t = i.source || e.source) ? t = "client" : "s2s" === t && (t = "server"), t.toLowerCase()),
                    function(e, i) {
                        var n;
                        (null == e ? void 0 : e.status) === I && (null == e || null === (n = e.error) || void 0 === n ? void 0 : n.code) === h || (i.getStatusCode() === r.bL.I ? (e.status = C, delete e.error) : (e.status = I, e.error = {
                            code: R
                        }))
                    }(i, e);
                const s = (null == e ? void 0 : e.timeToRespond) || Date.now() - g.auctions[e.auctionId].timestamp,
                    a = g.auctions[e.auctionId].timeout;
                i.partnerTimeToRespond = s > a + 150 ? a + 150 : s, i.clientLatencyTimeMs = Date.now() - g.auctions[e.auctionId].timestamp, window.PWT && (0, d.isFn)(window.PWT.HookForBidReceived) && window.PWT.HookForBidReceived(e.adUnitCode, e), i.bidResponse = function(e) {
                    return (0, d.pick)(e, ["bidPriceUSD", () => "string" == typeof e.currency && e.currency.toUpperCase() === U ? window.parseFloat(Number(e.cpm).toFixed(N)) : "function" == typeof e.getCpmInNewCurrency ? window.parseFloat(Number(e.getCpmInNewCurrency(U)).toFixed(N)) : ((0, d.logWarn)(v + "Could not determine the Net cpm in USD for the bid thus using bid.cpm", e), e.cpm), "bidGrossCpmUSD", () => "string" == typeof e.originalCurrency && e.originalCurrency.toUpperCase() === U ? window.parseFloat(Number(e.originalCpm).toFixed(N)) : "function" == typeof(0, o.A)().convertCurrency ? window.parseFloat(Number((0, o.A)().convertCurrency(e.originalCpm, e.originalCurrency, U)).toFixed(N)) : ((0, d.logWarn)(v + "Could not determine the Gross cpm in USD for the bid, thus using bid.originalCpm", e), e.originalCpm), "dealId", "currency", "cpm", () => window.parseFloat(Number(e.cpm).toFixed(N)), "originalCpm", () => window.parseFloat(Number(e.originalCpm).toFixed(N)), "originalCurrency", "dealChannel", "meta", "status", "error", "bidId", "mediaType", "params", "floorData", "mi", "regexPattern", () => e.regexPattern || void 0, "partnerImpId", "prebidBidId", "dimensions", () => (0, d.pick)(e, ["width", "height"])])
                }(e);
                var u = function(e) {
                    var i = {
                            responseKGPV: e.params.kgpv,
                            responseRegex: e.params.regexPattern
                        },
                        n = i.responseKGPV.split("@"),
                        o = 1,
                        d = !1;
                    if (n && (2 == n.length || 3 == n.length && (o = 2) && (d = !0)) && "video" != e.bidResponse.mediaType) {
                        var t = n[o],
                            s = null;
                        n[o].indexOf(":") > 0 && (t = n[o].split(":")[0], s = n[o].split(":")[1]), e.bidResponse.dimensions && e.bidResponse.dimensions.width + "x" + e.bidResponse.dimensions.height != t && "0X0" != (e.bidResponse.dimensions.width + "x" + e.bidResponse.dimensions.height).toUpperCase() && (n[0].toUpperCase() == t.toUpperCase() && (n[0] = (e.bidResponse.dimensions.width + "x" + e.bidResponse.dimensions.height).toLowerCase()), i.responseKGPV = d ? n[0] + "@" + n[1] + "@" + e.bidResponse.dimensions.width + "x" + e.bidResponse.dimensions.height : n[0] + "@" + e.bidResponse.dimensions.width + "x" + e.bidResponse.dimensions.height, s && (i.responseKGPV = i.responseKGPV + ":" + s))
                    }
                    return i
                }(i);
                i.params.kgpv = u.responseKGPV, i.params.regexPattern = u.responseRegex
            }

            function de(e) {
                let i = g.auctions[e.auctionId];
                i.adUnitCodes[e.adUnitCode].bidWon = e.requestId, i.adUnitCodes[e.adUnitCode].bidWonAdId = e.adId,
                    function(e, i) {
                        var n, o, d, t, s;
                        const r = g.auctions[e].adUnitCodes[i].bidWon,
                            p = g.auctions[e].adUnitCodes[i].bids[r];
                        let l = p[0];
                        p.length > 1 && (l = p.filter((n => n.adId === g.auctions[e].adUnitCodes[i].bidWonAdId))[0]);
                        const c = G(l.adapterCode || l.bidder),
                            b = l.bidResponse && l.bidResponse.prebidBidId;
                        let m = Z(g.auctions[e].origAdUnits, i) || {},
                            v = m.adUnitId || i,
                            C = g.auctions[e].floorData,
                            w = (null === (n = g.auctions[e]) || void 0 === n ? void 0 : n.wiid) || e,
                            I = u.config.getConfig("pageUrl") || g.auctions[e].referer || "",
                            R = l.bidResponse && K(l.bidResponse) || void 0,
                            h = ee(C),
                            D = C && h && C.floorRequestData ? 0 == C.floorRequestData.skipped ? 0 : 1 : void 0,
                            U = f;
                        U += "pubid=" + P, U += "&purl=" + E(I), U += "&tst=" + Math.round((new window.Date).getTime() / 1e3), U += "&iid=" + E(w), U += "&bidid=" + E(b || r), U += "&origbidid=" + E(r), U += "&pid=" + E(A), U += "&pdvid=" + E(x), U += "&slot=" + E(i), U += "&au=" + E(v), U += "&pn=" + E(c), U += "&bc=" + E(l.bidderCode || l.bidder), U += "&en=" + E(l.bidResponse.bidPriceUSD), U += "&eg=" + E(l.bidResponse.bidGrossCpmUSD), U += "&kgpv=" + E(M(l, i)), U += "&piid=" + E(l.bidResponse.partnerImpId || y), U += "&rf=" + E(null != m && null !== (o = m.pubmaticAutoRefresh) && void 0 !== o && o.isRefreshed ? 1 : 0), U += "&di=" + E((null === (d = l) || void 0 === d || null === (d = d.bidResponse) || void 0 === d ? void 0 : d.dealId) || T), U += "&plt=" + E(j()), U += "&psz=" + E(((null === (t = l) || void 0 === t || null === (t = t.bidResponse) || void 0 === t || null === (t = t.dimensions) || void 0 === t ? void 0 : t.width) || "0") + "x" + ((null === (s = l) || void 0 === s || null === (s = s.bidResponse) || void 0 === s || null === (s = s.dimensions) || void 0 === s ? void 0 : s.height) || "0")), U += "&tgid=" + E($()), R && (U += "&adv=" + E(R)), U += "&orig=" + E(_(I)), U += "&ss=" + E(J(l.bidder)), null != D && (U += "&fskp=" + E(D)), U += "&af=" + E(l.bidResponse && l.bidResponse.mediaType || void 0), U += "&cds=" + ie(), (0, a.Kk)(U, null, null, {
                            contentType: "application/x-www-form-urlencoded",
                            withCredentials: !0,
                            method: "GET"
                        })
                    }(e.auctionId, e.adUnitCode)
            }(0, t.YP)(0);
            let te = (0, t.cp)({
                    analyticsType: "endpoint"
                }),
                se = Object.assign({}, te, {
                    enableAnalytics() {
                        let e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {},
                            i = !1;
                        "object" == typeof e.options ? (e.options.publisherId && (P = Number(e.options.publisherId)), A = Number(e.options.profileId) || 0, x = Number(e.options.profileVersionId) || 0, q = Number(e.options.identityOnly) || 0) : ((0, d.logError)(v + "Config not found."), i = !0), P || ((0, d.logError)(v + "Missing publisherId(Number)."), i = !0), i ? (0, d.logError)(v + "Not collecting data due to error(s).") : te.enableAnalytics.call(this, e)
                    },
                    disableAnalytics() {
                        P = 0, A = 0, x = 0, O = [], te.disableAnalytics.apply(this, arguments)
                    },
                    track(e) {
                        let {
                            eventType: i,
                            args: n
                        } = e;
                        switch (i) {
                            case r.EVENTS.AUCTION_INIT:
                                ! function(e) {
                                    O = function() {
                                        let e = u.config.getConfig("s2sConfig");
                                        return e && (0, d.isArray)(e.bidders) ? e.bidders : []
                                    }();
                                    let i = (0, d.pick)(e, ["timestamp", "timeout", "bidderDonePendingCount", () => e.bidderRequests.length]);
                                    i.adUnitCodes = {}, i.floorData = {}, i.origAdUnits = e.adUnits, i.referer = e.bidderRequests[0].refererInfo.topmostLocation, g.auctions[e.auctionId] = i
                                }(n);
                                break;
                            case r.EVENTS.BID_REQUESTED:
                                ! function(e) {
                                    e.bids.forEach((function(i) {
                                        var n;
                                        g.auctions[e.auctionId].adUnitCodes.hasOwnProperty(i.adUnitCode) || (g.auctions[e.auctionId].adUnitCodes[i.adUnitCode] = {
                                            bids: {},
                                            bidWon: !1,
                                            dimensions: i.sizes
                                        }), "pubmatic" === i.bidder && null != i && null !== (n = i.params) && void 0 !== n && n.wiid && (g.auctions[e.auctionId].wiid = i.params.wiid), g.auctions[e.auctionId].adUnitCodes[i.adUnitCode].bids[i.bidId] = [V(i)], i.floorData && (g.auctions[e.auctionId].floorData.floorRequestData = i.floorData)
                                    }))
                                }(n);
                                break;
                            case r.EVENTS.BID_RESPONSE:
                                oe(n);
                                break;
                            case r.EVENTS.BID_REJECTED:
                                ! function(e) {
                                    e.rejectionReason === r.ST._E && (e.cpm = 0, e.status = r.BID_STATUS.E, oe(e))
                                }(n);
                                break;
                            case r.EVENTS.BIDDER_DONE:
                                ! function(e) {
                                    g.auctions[e.auctionId].bidderDonePendingCount--, e.bids.forEach((e => {
                                        let i = g.auctions[e.auctionId].adUnitCodes[e.adUnitCode].bids[e.bidId || e.requestId][0];
                                        void 0 !== e.serverResponseTimeMs && (i.serverLatencyTimeMs = e.serverResponseTimeMs), i.status || (i.status = w), i.clientLatencyTimeMs || (i.clientLatencyTimeMs = Date.now() - g.auctions[e.auctionId].timestamp)
                                    }))
                                }(n);
                                break;
                            case r.EVENTS.BID_WON:
                                de(n);
                                break;
                            case r.EVENTS.AUCTION_END:
                                ! function(e) {
                                    var i;
                                    let n = (0, o.A)().getHighestCpmBids() || [];
                                    setTimeout((() => {
                                        ne.call(this, e, n)
                                    }), 0 === (null === (i = g.auctions[e.auctionId]) || void 0 === i ? void 0 : i.bidderDonePendingCount) ? 500 : 2e3)
                                }(n);
                                break;
                            case r.EVENTS.BID_TIMEOUT:
                                ! function(e) {
                                    e.forEach((e => {
                                        let i = g.auctions[e.auctionId].adUnitCodes[e.adUnitCode].bids[e.bidId || e.requestId][0];
                                        i ? (i.status = I, i.error = {
                                            code: h
                                        }) : (0, d.logWarn)(v + "bid not found")
                                    }))
                                }(n)
                        }
                    }
                });
            s.cp.registerAnalyticsAdapter({
                adapter: se,
                code: c
            }), (0, o.g)("pubmaticAnalyticsAdapter")
        }
    },
    e => {
        e.O(0, [72706, 78444, 21240], (() => {
            return i = 18728, e(e.s = i);
            var i
        }));
        e.O()
    }
]);
(self.owpbjsChunk = self.owpbjsChunk || []).push([
    [73754], {
        77200: (e, t, r) => {
            var a = r(48176),
                i = r(28768),
                n = r(52420),
                s = r(79344),
                o = r(96008),
                d = r(48636),
                p = r(65576),
                l = r(33984),
                c = r(16923),
                m = r(16112),
                g = r(84928);
            const u = "pubmatic",
                h = "PubMatic: ",
                f = "https://hbopenbid.pubmatic.com/translator",
                y = "USD",
                b = void 0,
                v = "https://pubmatic.bbvms.com/r/".concat("$RENDERER", ".js"),
                w = "Video.Placement param missing",
                x = {
                    kadpageurl: "",
                    gender: "",
                    yob: "",
                    lat: "",
                    lon: "",
                    wiid: "",
                    profId: "",
                    verId: ""
                },
                I = {
                    NUMBER: "number",
                    STRING: "string",
                    BOOLEAN: "boolean",
                    ARRAY: "array",
                    OBJECT: "object"
                },
                T = {
                    mimes: I.ARRAY,
                    minduration: I.NUMBER,
                    maxduration: I.NUMBER,
                    startdelay: I.NUMBER,
                    playbackmethod: I.ARRAY,
                    api: I.ARRAY,
                    protocols: I.ARRAY,
                    w: I.NUMBER,
                    h: I.NUMBER,
                    battr: I.ARRAY,
                    linearity: I.NUMBER,
                    placement: I.NUMBER,
                    plcmt: I.NUMBER,
                    minbitrate: I.NUMBER,
                    maxbitrate: I.NUMBER,
                    skip: I.NUMBER
                },
                R = {
                    ICON: 1,
                    IMAGE: 3
                },
                E = {
                    1: "PMP",
                    5: "PREF",
                    6: "PMPG"
                },
                S = {
                    bootstrapPlayer: function(e) {
                        const t = {
                            code: e.adUnitCode
                        };
                        if (e.vastXml ? t.vastXml = e.vastXml : e.vastUrl && (t.vastUrl = e.vastUrl), !e.vastXml && !e.vastUrl) return void(0, i.logWarn)("".concat(h, ": No vastXml or vastUrl on bid, bailing..."));
                        const r = S.getRendererId("pubmatic", e.rendererCode),
                            a = document.getElementById(e.adUnitCode);
                        let n;
                        for (let e = 0; e < window.bluebillywig.renderers.length; e++)
                            if (window.bluebillywig.renderers[e]._id === r) {
                                n = window.bluebillywig.renderers[e];
                                break
                            } n ? n.bootstrap(t, a) : (0, i.logWarn)("".concat(h, ": Couldn't find a renderer with ").concat(r))
                    },
                    newRenderer: function(e, t) {
                        var r = v.replace("$RENDERER", e);
                        const a = l.eA.install({
                            url: r,
                            loaded: !1,
                            adUnitCode: t
                        });
                        try {
                            a.setRender(S.outstreamRender)
                        } catch (e) {
                            (0, i.logWarn)("".concat(h, ": Error tying to setRender on renderer"), e)
                        }
                        return a
                    },
                    outstreamRender: function(e) {
                        e.renderer.push((function() {
                            S.bootstrapPlayer(e)
                        }))
                    },
                    getRendererId: function(e, t) {
                        return "".concat(e, "-").concat(t)
                    }
                },
                O = [d.W4, d.im, d.sl];
            let A = 0,
                z = !1,
                C = ["pubmatic"];
            const U = ["all"];

            function P(e, t) {
                if (!(0, i.isStr)(t)) return t && (0, i.logWarn)(h + "Ignoring param key: " + e + ", expects string-value, found " + typeof t), b;
                switch (e) {
                    case "pmzoneid":
                        return t.split(",").slice(0, 50).map((e => e.trim())).join();
                    case "kadfloor":
                    case "lat":
                    case "lon":
                        return parseFloat(t) || b;
                    case "yob":
                        return parseInt(t) || b;
                    default:
                        return t
                }
            }

            function _(e) {
                var t;
                e.params.adUnit = "", e.params.adUnitIndex = "0", e.params.width = 0, e.params.height = 0, e.params.adSlot = (t = e.params.adSlot, (0, i.isStr)(t) ? t.replace(/^\s+/g, "").replace(/\s+$/g, "") : (t && (0, i.logWarn)(u + ": adSlot must be a string. Ignoring adSlot"), ""));
                var r = e.params.adSlot,
                    a = r.split(":");
                if (r = a[0], 2 == a.length && (e.params.adUnitIndex = a[1]), a = r.split("@"), e.params.adUnit = a[0], a.length > 1) {
                    if (2 != (a = 2 == a.length ? a[1].split("x") : 3 == a.length ? a[2].split("x") : []).length) return void(0, i.logWarn)(h + "AdSlot Error: adSlot not in required format");
                    e.params.width = parseInt(a[0], 10), e.params.height = parseInt(a[1], 10)
                }
                if (e.hasOwnProperty("mediaTypes") && e.mediaTypes.hasOwnProperty(d.W4) && e.mediaTypes.banner.hasOwnProperty("sizes")) {
                    for (var n = 0, s = []; n < e.mediaTypes.banner.sizes.length; n++) 2 === e.mediaTypes.banner.sizes[n].length && s.push(e.mediaTypes.banner.sizes[n]);
                    e.mediaTypes.banner.sizes = s, e.mediaTypes.banner.sizes.length >= 1 && (e.params.width || e.params.height ? e.params.width == e.mediaTypes.banner.sizes[0][0] && e.params.height == e.mediaTypes.banner.sizes[0][1] && (e.mediaTypes.banner.sizes = e.mediaTypes.banner.sizes.splice(1, e.mediaTypes.banner.sizes.length - 1)) : (e.params.width = e.mediaTypes.banner.sizes[0][0], e.params.height = e.mediaTypes.banner.sizes[0][1], e.mediaTypes.banner.sizes = e.mediaTypes.banner.sizes.splice(1, e.mediaTypes.banner.sizes.length - 1)))
                }
            }

            function N(e, t, r) {
                var a, n = "Ignoring param key: " + e + ", expects " + r + ", found " + typeof t;
                switch (r) {
                    case I.BOOLEAN:
                        a = i.isBoolean;
                        break;
                    case I.NUMBER:
                        a = i.isNumber;
                        break;
                    case I.STRING:
                        a = i.isStr;
                        break;
                    case I.ARRAY:
                        a = i.isArray
                }
                return a(t) ? t : ((0, i.logWarn)(h + n), b)
            }
            const W = {
                    desc: "desc",
                    desc2: "desc2",
                    body: "desc",
                    body2: "desc2",
                    sponsoredBy: "sponsored",
                    cta: "ctatext",
                    rating: "rating",
                    address: "address",
                    downloads: "downloads",
                    likes: "likes",
                    phone: "phone",
                    price: "price",
                    salePrice: "saleprice",
                    displayUrl: "displayurl",
                    saleprice: "saleprice",
                    displayurl: "displayurl"
                },
                {
                    NATIVE_IMAGE_TYPES: k,
                    NATIVE_KEYS_THAT_ARE_NOT_ASSETS: j,
                    NATIVE_KEYS: q,
                    NATIVE_ASSET_TYPES: M
                } = m,
                B = Object.values(W);

            function D(e) {
                var t;
                if (e.ortb) {
                    e = e.ortb, t = {
                        ver: "1.2",
                        ...e,
                        assets: []
                    };
                    const {
                        assets: r
                    } = e, a = e => e.title || e.img || e.data || e.video;
                    if (r.length < 1 || !r.some((e => a(e)))) return (0, i.logWarn)("".concat(h, ": Native assets object is empty or contains some invalid object")), z = !0, t;
                    r.forEach((e => {
                        var r = e;
                        r.img && (r.img.type == R.IMAGE ? (r.w = r.w || r.width || (r.sizes ? r.sizes[0] : b), r.h = r.h || r.height || (r.sizes ? r.sizes[1] : b), r.wmin = r.wmin || r.minimumWidth || (r.minsizes ? r.minsizes[0] : b), r.hmin = r.hmin || r.minimumHeight || (r.minsizes ? r.minsizes[1] : b)) : r.img.type == R.ICON && (r.w = r.w || r.width || (r.sizes ? r.sizes[0] : b), r.h = r.h || r.height || (r.sizes ? r.sizes[1] : b))), r && void 0 !== r.id && a(r) && t.assets.push(r)
                    }))
                } else t = function(e) {
                    if (!e && !(0, i.isPlainObject)(e)) return (0, i.logWarn)("".concat(h, ": Native assets object is empty or not an object: ").concat(e)), void(z = !0);
                    const t = {
                        ver: "1.2",
                        assets: []
                    };
                    for (let r in e) {
                        if (j.includes(r)) continue;
                        if (!q.hasOwnProperty(r) && !B.includes(r)) {
                            (0, i.logWarn)("".concat(h, ": Unrecognized native asset code: ").concat(r, ". Asset will be ignored."));
                            continue
                        }
                        const a = e[r];
                        let n = 0;
                        a.required && (0, i.isBoolean)(a.required) && (n = Number(a.required));
                        const s = {
                            id: t.assets.length,
                            required: n
                        };
                        if (r in W) s.data = {
                            type: M[W[r]]
                        }, (a.len || a.length) && (s.data.len = a.len || a.length), a.ext && (s.data.ext = a.ext);
                        else if ("icon" === r || "image" === r) {
                            if (s.img = {
                                    type: "icon" === r ? k.ICON : k.MAIN
                                }, a.aspect_ratios)
                                if ((0, i.isArray)(a.aspect_ratios))
                                    if (a.aspect_ratios.length) {
                                        const {
                                            min_width: e,
                                            min_height: t
                                        } = a.aspect_ratios[0];
                                        (0, i.isInteger)(e) && (0, i.isInteger)(t) ? (s.img.wmin = e, s.img.hmin = t) : (0, i.logWarn)("".concat(h, ": image.aspect_ratios min_width or min_height are invalid: ").concat(e, ", ").concat(t));
                                        const r = a.aspect_ratios.filter((e => e.ratio_width && e.ratio_height)).map((e => "".concat(e.ratio_width, ":").concat(e.ratio_height)));
                                        r.length > 0 && (s.img.ext = {
                                            aspectratios: r
                                        })
                                    } else(0, i.logWarn)("".concat(h, ": image.aspect_ratios was passed, but it's empty: ").concat(a.aspect_ratios));
                            else(0, i.logWarn)("".concat(h, ": image.aspect_ratios was passed, but it's not a an array: ").concat(a.aspect_ratios));
                            s.img.w = a.w || a.width, s.img.h = a.h || a.height, s.img.wmin = a.wmin || a.minimumWidth || (a.minsizes ? a.minsizes[0] : b), s.img.hmin = a.hmin || a.minimumHeight || (a.minsizes ? a.minsizes[1] : b), a.sizes && (2 === a.sizes.length && (0, i.isInteger)(a.sizes[0]) && (0, i.isInteger)(a.sizes[1]) ? ((0, i.logInfo)("".concat(h, ": if asset.sizes exist, by OpenRTB spec we should remove wmin and hmin")), s.img.w = a.sizes[0], s.img.h = a.sizes[1], delete s.img.hmin, delete s.img.wmin) : (0, i.logWarn)("".concat(h, ": image.sizes was passed, but its value is not an array of integers: ").concat(a.sizes))), a.ext && (s.img.ext = a.ext), a.mimes && (s.img.mimes = a.mimes)
                        } else "title" === r ? (s.title = {
                            len: a.len || a.length || 140
                        }, a.ext && (s.title.ext = a.ext)) : "ext" === r && (s.ext = a, delete s.required);
                        t.assets.push(s)
                    }
                    return t.assets.length < 1 ? ((0, i.logWarn)("".concat(h, ": Could not find any valid asset")), void(z = !0)) : t
                }(e);
                return t
            }

            function G(e) {
                var t, r = e.mediaTypes.banner.sizes,
                    a = [];
                if (r !== b && (0, i.isArray)(r)) {
                    if (t = {}, e.params.width || e.params.height) t.w = e.params.width, t.h = e.params.height;
                    else {
                        if (0 === r.length) return t = b, (0, i.logWarn)(h + "Error: mediaTypes.banner.size missing for adunit: " + e.params.adUnit + ". Ignoring the banner impression in the adunit."), t;
                        t.w = parseInt(r[0][0], 10), t.h = parseInt(r[0][1], 10), r = r.splice(1, r.length - 1)
                    }
                    r.length > 0 && (a = [], r.forEach((function(e) {
                        e.length > 1 && a.push({
                            w: e[0],
                            h: e[1]
                        })
                    })), a.length > 0 && (t.format = a)), t.pos = 0, t.topframe = (0, i.inIframe)() ? 0 : 1
                } else(0, i.logWarn)(h + "Error: mediaTypes.banner.size missing for adunit: " + e.params.adUnit + ". Ignoring the banner impression in the adunit."), t = b;
                return t
            }

            function J(e) {
                var t, r = (0, i.mergeDeep)((0, n.c)(e.mediaTypes, "video"), e.params.video);
                if (r !== b) {
                    for (var a in t = {},
                            function(e, t) {
                                (0, n.c)(e, "placement") || (0, i.logWarn)(w + " for " + t)
                            }(r, e.adUnitCode), T) r.hasOwnProperty(a) && (t[a] = N(a, r[a], T[a]));
                    if (e.mediaTypes.video.playerSize)(0, i.isArray)(e.mediaTypes.video.playerSize[0]) ? (t.w = parseInt(e.mediaTypes.video.playerSize[0][0], 10), t.h = parseInt(e.mediaTypes.video.playerSize[0][1], 10)) : (0, i.isNumber)(e.mediaTypes.video.playerSize[0]) && (t.w = parseInt(e.mediaTypes.video.playerSize[0], 10), t.h = parseInt(e.mediaTypes.video.playerSize[1], 10));
                    else {
                        if (!e.mediaTypes.video.w || !e.mediaTypes.video.h) return t = b, (0, i.logWarn)(h + "Error: Video size params(playersize or w&h) missing for adunit: " + e.params.adUnit + " with mediaType set as video. Ignoring video impression in the adunit."), t;
                        t.w = parseInt(e.mediaTypes.video.w, 10), t.h = parseInt(e.mediaTypes.video.h, 10)
                    }
                } else t = b, (0, i.logWarn)(h + "Error: Video config params missing for adunit: " + e.params.adUnit + " with mediaType set as video. Ignoring video impression in the adunit.");
                return t
            }

            function Y(e, t) {
                var r, a, o = {},
                    l = {},
                    c = e.hasOwnProperty("sizes") ? e.sizes : [],
                    m = "",
                    g = [],
                    u = null == t ? void 0 : t.fledgeEnabled;
                if (function(e, t) {
                        t.params.deals && ((0, i.isArray)(t.params.deals) ? t.params.deals.forEach((function(t) {
                            (0, i.isStr)(t) && t.length > 3 ? (e.pmp || (e.pmp = {
                                private_auction: 0,
                                deals: []
                            }), e.pmp.deals.push({
                                id: t
                            })) : (0, i.logWarn)(h + "Error: deal-id present in array bid.params.deals should be a strings with more than 3 charaters length, deal-id ignored: " + t)
                        })) : (0, i.logWarn)(h + "Error: bid.params.deals should be an array of strings."))
                    }(o = {
                        id: e.bidId,
                        tagid: e.params.hashedKey || e.params.adUnit || void 0,
                        bidfloor: P("kadfloor", e.params.kadfloor),
                        secure: 1,
                        ext: {
                            pmZoneId: P("pmzoneid", e.params.pmzoneid)
                        },
                        bidfloorcur: e.params.currency ? P("currency", e.params.currency) : y
                    }, e), function(e, t) {
                        var r, a = "";
                        if (t.params.dctr)
                            if (a = t.params.dctr, (0, i.isStr)(a) && a.length > 0) {
                                var n = a.split("|");
                                a = "", n.forEach((e => {
                                    a += e.length > 0 ? e.trim() + "|" : ""
                                })), r = a.length, "|" === a.substring(r, r - 1) && (a = a.substring(0, r - 1)), e.ext.key_val = a.trim()
                            } else(0, i.logWarn)(h + "Ignoring param : dctr with value : " + a + ", expects string-value, found empty or non-string value")
                    }(o, e), function(e, t) {
                        var r = t.rtd && t.rtd.jwplayer && t.rtd.jwplayer.targeting || void 0,
                            a = "";
                        if (void 0 !== r && "" !== r && r.hasOwnProperty("segments")) {
                            var i, n = r.segments.length;
                            a += "jw-id=" + r.content.id;
                            for (var s = 0; s < n; s++) a += "|jw-" + r.segments[s] + "=1";
                            (i = e.ext) && void 0 === i.key_val ? i.key_val = a : i.key_val += "|" + a
                        }
                    }(o, e), e.hasOwnProperty("mediaTypes"))
                    for (m in e.mediaTypes) switch (m) {
                        case d.W4:
                            (r = G(e)) !== b && (o.banner = r);
                            break;
                        case d.sl:
                            l.request = JSON.stringify(D(e.nativeParams)), z ? ((0, i.logWarn)(h + "Error: Error in Native adunit " + e.params.adUnit + ". Ignoring the adunit. Refer to http://prebid.org/dev-docs/show-native-ads.html for more details."), z = !1) : o.native = l, z = !1;
                            break;
                        case d.im:
                            (a = J(e)) !== b && (o.video = a)
                    } else r = {
                        pos: 0,
                        w: e.params.width,
                        h: e.params.height,
                        topframe: (0, i.inIframe)() ? 0 : 1
                    }, (0, i.isArray)(c) && c.length > 1 && ((c = c.splice(1, c.length - 1)).forEach((e => {
                        (0, i.isArray)(e) && 2 == e.length && g.push({
                            w: e[0],
                            h: e[1]
                        })
                    })), r.format = g), o.banner = r;
                return function(e, t) {
                        const r = {
                            ...(0, n.c)(t, "ortb2Imp.ext.data")
                        };
                        Object.keys(r).forEach((t => {
                            "pbadslot" === t ? "string" == typeof r[t] && r[t] && (0, s.e)(e, "ext.data.pbadslot", r[t]) : "adserver" === t ? ["name", "adslot"].forEach((t => {
                                const a = (0, n.c)(r, "adserver.".concat(t));
                                "string" == typeof a && a && ((0, s.e)(e, "ext.data.adserver.".concat(t.toLowerCase()), a), "adslot" === t && (0, s.e)(e, "ext.dfp_ad_unit_code", a))
                            })) : (0, s.e)(e, "ext.data.".concat(t), r[t])
                        }));
                        const a = (0, n.c)(t, "ortb2Imp.ext.gpid");
                        a && (0, s.e)(e, "ext.gpid", a)
                    }(o, e),
                    function(e, t) {
                        let r = -1;
                        "function" != typeof t.getFloor || p.config.getConfig("pubmatic.disableFloors") || [d.W4, d.im, d.sl].forEach((a => {
                            if (e.hasOwnProperty(a)) {
                                let n = [];
                                "banner" === a && (e[a].w && e[a].h && n.push([e[a].w, e[a].h]), (0, i.isArray)(e[a].format) && e[a].format.forEach((e => n.push([e.w, e.h])))), 0 === n.length && n.push("*"), n.forEach((n => {
                                    let s = t.getFloor({
                                        currency: e.bidfloorcur,
                                        mediaType: a,
                                        size: n
                                    });
                                    if ((0, i.logInfo)(h, "floor from floor module returned for mediatype:", a, " and size:", n, " is: currency", s.currency, "floor", s.floor), "object" == typeof s && s.currency === e.bidfloorcur && !isNaN(parseInt(s.floor))) {
                                        let e = parseFloat(s.floor);
                                        (0, i.logInfo)(h, "floor from floor module:", e, "previous floor value", r, "Min:", Math.min(e, r)), r = -1 === r ? e : Math.min(e, r), (0, i.logInfo)(h, "new floor value:", r)
                                    }
                                }))
                            }
                        }));
                        e.bidfloor && ((0, i.logInfo)(h, "floor from floor module:", r, "impObj.bidfloor", e.bidfloor, "Max:", Math.max(r, e.bidfloor)), r = Math.max(r, e.bidfloor));
                        e.bidfloor = !isNaN(r) && r > 0 ? r : b, (0, i.logInfo)(h, "new impObj.bidfloor value:", e.bidfloor)
                    }(o, e),
                    function(e, t, r) {
                        if (r) {
                            var a;
                            e.ext = e.ext || {}, void 0 !== (null == t || null === (a = t.ortb2Imp) || void 0 === a || null === (a = a.ext) || void 0 === a ? void 0 : a.ae) && (e.ext.ae = t.ortb2Imp.ext.ae)
                        } else {
                            var i;
                            null !== (i = e.ext) && void 0 !== i && i.ae && delete e.ext.ae
                        }
                    }(o, e, u), o.hasOwnProperty(d.W4) || o.hasOwnProperty(d.sl) || o.hasOwnProperty(d.im) ? o : b
            }

            function L(e, t) {
                (t = t.filter((function(e) {
                    return "string" == typeof e || ((0, i.logWarn)(h + "acat: Each category should be a string, ignoring category: " + e), !1)
                })).map((e => e.trim())).filter(((e, t, r) => r.indexOf(e) === t))).length > 0 && ((0, i.logWarn)(h + "acat: Selected: ", t), e.ext.acat = t)
            }

            function V(e) {
                return !0 === (0, i.isArray)(e) && e.length > 0
            }
            const F = {
                code: u,
                gvlid: 76,
                supportedMediaTypes: [d.W4, d.im, d.sl],
                aliases: ["pubmatic2"],
                isBidRequestValid: e => {
                    if (e && e.params) {
                        if (!(0, i.isStr)(e.params.publisherId)) return (0, i.logWarn)(h + "Error: publisherId is mandatory and cannot be numeric (wrap it in quotes in your config). Call to OpenBid will not be sent for ad unit: " + JSON.stringify(e)), !1;
                        if (e.hasOwnProperty("mediaTypes") && e.mediaTypes.hasOwnProperty(d.im)) {
                            let t = (0, n.c)(e.mediaTypes, "video.mimes"),
                                r = (0, n.c)(e, "params.video.mimes");
                            if (!1 === V(t) && !1 === V(r)) return (0, i.logWarn)(h + "Error: For video ads, bid.mediaTypes.video.mimes OR bid.params.video.mimes should be present and must be a non-empty array. Call to OpenBid will not be sent for ad unit:" + JSON.stringify(e)), !1;
                            if (!e.mediaTypes[d.im].hasOwnProperty("context")) return (0, i.logError)("".concat(h, ": no context specified in bid. Rejecting bid: "), e), !1;
                            if ("outstream" === e.mediaTypes[d.im].context && !(0, i.isStr)(e.params.outstreamAU) && !e.hasOwnProperty("renderer") && !e.mediaTypes[d.im].hasOwnProperty("renderer")) return e.mediaTypes.hasOwnProperty(d.W4) || e.mediaTypes.hasOwnProperty(d.sl) ? (delete e.mediaTypes[d.im], (0, i.logWarn)("".concat(h, ': for "outstream" bids either outstreamAU parameter must be provided or ad unit supplied renderer is required. Rejecting mediatype Video of bid: '), e), !0) : ((0, i.logError)("".concat(h, ': for "outstream" bids either outstreamAU parameter must be provided or ad unit supplied renderer is required. Rejecting bid: '), e), !1)
                        }
                        return !0
                    }
                    return !1
                },
                buildRequests: (e, t) => {
                    var r, a, o, l, m, g;
                    t && t.refererInfo && (g = t.refererInfo);
                    var u, v = function(e) {
                            return {
                                pageURL: (null == e ? void 0 : e.page) || window.location.href,
                                refURL: (null == e ? void 0 : e.ref) || window.document.referrer
                            }
                        }(g),
                        w = function(e) {
                            return {
                                id: "" + (new Date).getTime(),
                                at: 1,
                                cur: [y],
                                imp: [],
                                site: {
                                    page: e.pageURL,
                                    ref: e.refURL,
                                    publisher: {}
                                },
                                device: {
                                    ua: navigator.userAgent,
                                    js: 1,
                                    dnt: "yes" == navigator.doNotTrack || "1" == navigator.doNotTrack || "1" == navigator.msDoNotTrack ? 1 : 0,
                                    h: screen.height,
                                    w: screen.width,
                                    language: navigator.language
                                },
                                user: {},
                                ext: {}
                            }
                        }(v),
                        I = "",
                        T = [],
                        R = [],
                        E = [],
                        S = (0, i.generateUUID)();
                    if (e.forEach((e => {
                            var r;
                            if (e.params.wiid = e.params.wiid || t.auctionId || S, (u = (0, i.deepClone)(e)).params.adSlot = u.params.adSlot || "", _(u), u.mediaTypes && u.mediaTypes.hasOwnProperty("video") || u.params.hasOwnProperty("video"));
                            else if (!(u.hasOwnProperty("mediaTypes") && u.mediaTypes.hasOwnProperty(d.sl) || 0 !== u.params.width || 0 !== u.params.height)) return void(0, i.logWarn)(h + "Skipping the non-standard adslot: ", u.params.adSlot, JSON.stringify(u));
                            v.pubId = v.pubId || u.params.publisherId, (v = function(e, t) {
                                var r, a, n;
                                for (r in t.kadpageurl || (t.kadpageurl = t.pageURL), x) x.hasOwnProperty(r) && (a = e[r]) && ("object" == typeof(n = x[r]) && (a = n.f(a, t)), (0, i.isStr)(a) ? t[r] = a : (0, i.logWarn)(h + "Ignoring param : " + r + " with value : " + x[r] + ", expects string-value, found " + typeof a));
                                return t
                            }(u.params, v)).transactionId = null === (r = u.ortb2Imp) || void 0 === r || null === (r = r.ext) || void 0 === r ? void 0 : r.tid, "" === I ? I = u.params.currency || b : u.params.hasOwnProperty("currency") && I !== u.params.currency && (0, i.logWarn)(h + "Currency specifier ignored. Only one currency permitted."), u.params.currency = I, u.params.hasOwnProperty("dctr") && (0, i.isStr)(u.params.dctr) && T.push(u.params.dctr), u.params.hasOwnProperty("bcat") && (0, i.isArray)(u.params.bcat) && (R = R.concat(u.params.bcat)), u.params.hasOwnProperty("acat") && (0, i.isArray)(u.params.acat) && (E = E.concat(u.params.acat));
                            var a = Y(u, t);
                            a && w.imp.push(a)
                        })), 0 == w.imp.length) return;
                    w.site.publisher.id = v.pubId.trim(), A = v.pubId.trim(), w.ext.wrapper = {}, w.ext.wrapper.profile = parseInt(v.profId) || b, w.ext.wrapper.version = parseInt(v.verId) || b, w.ext.wrapper.wiid = v.wiid || t.auctionId, w.ext.wrapper.wv = "prebid_prebid_8.30.0", w.ext.wrapper.transactionId = v.transactionId, w.ext.wrapper.wp = "pbjs";
                    const O = t ? c.m.get(t.bidderCode, "allowAlternateBidderCodes") : void 0;
                    if (void 0 !== O) {
                        if (w.ext.marketplace = {}, t && 1 == O) {
                            let e = c.m.get(t.bidderCode, "allowedAlternateBidderCodes");
                            (0, i.isArray)(e) ? (e = e.map((e => e.trim().toLowerCase())).filter((e => !!e)).filter(i.uniques), C = e.includes("*") ? U : [...C, ...e]) : C = U
                        }
                        w.ext.marketplace.allowedbidders = C.filter(i.uniques)
                    }
                    var z;
                    (w.user.gender = v.gender ? v.gender.trim() : b, w.user.geo = {}, w.user.yob = P("yob", v.yob), w.site.page = v.kadpageurl.trim() || w.site.page.trim(), w.site.domain = function(e) {
                        let t = document.createElement("a");
                        return t.href = e, t.hostname
                    }(w.site.page), "object" == typeof p.config.getConfig("content") && (w.site.content = p.config.getConfig("content")), "object" == typeof p.config.getConfig("device") && (w.device = Object.assign(w.device, p.config.getConfig("device"))), w.device.language = w.device.language && w.device.language.split("-")[0], null != t && null !== (r = t.ortb2) && void 0 !== r && null !== (r = r.source) && void 0 !== r && r.tid) && (0, s.e)(w, "source.tid", null == t || null === (z = t.ortb2) || void 0 === z || null === (z = z.source) || void 0 === z ? void 0 : z.tid); - 1 !== window.location.href.indexOf("pubmaticTest=true") && (w.test = 1), e[0].schain && (0, s.e)(w, "source.ext.schain", e[0].schain), t && t.gdprConsent && ((0, s.e)(w, "user.ext.consent", t.gdprConsent.consentString), (0, s.e)(w, "regs.ext.gdpr", t.gdprConsent.gdprApplies ? 1 : 0)), t && t.uspConsent && (0, s.e)(w, "regs.ext.us_privacy", t.uspConsent), null != t && null !== (a = t.gppConsent) && void 0 !== a && a.gppString ? ((0, s.e)(w, "regs.gpp", t.gppConsent.gppString), (0, s.e)(w, "regs.gpp_sid", t.gppConsent.applicableSections)) : null != t && null !== (o = t.ortb2) && void 0 !== o && null !== (o = o.regs) && void 0 !== o && o.gpp && ((0, s.e)(w, "regs.gpp", t.ortb2.regs.gpp), (0, s.e)(w, "regs.gpp_sid", t.ortb2.regs.gpp_sid)), !0 === p.config.getConfig("coppa") && (0, s.e)(w, "regs.coppa", 1),
                        function(e, t) {
                            let r = (0, n.c)(t, "0.userIdAsEids");
                            (0, i.isArray)(r) && r.length > 0 && (0, s.e)(e, "user.eids", r)
                        }(w, e);
                    const N = t && t.ortb2 || {},
                        {
                            user: W,
                            device: k,
                            site: j,
                            bcat: q,
                            badv: M
                        } = N;
                    if (j) {
                        const {
                            page: e,
                            domain: t,
                            ref: r
                        } = w.site;
                        (0, i.mergeDeep)(w, {
                            site: j
                        }), w.site.page = e, w.site.domain = t, w.site.ref = r
                    }
                    if (W && (0, i.mergeDeep)(w, {
                            user: W
                        }), M && (0, i.mergeDeep)(w, {
                            badv: M
                        }), q && (R = R.concat(q)), null != k && k.sua && (w.device.sua = null == k ? void 0 : k.sua), null != k && null !== (l = k.ext) && void 0 !== l && l.cdep && (0, s.e)(w, "device.ext.cdep", k.ext.cdep), null != W && W.geo && null != k && k.geo ? (w.device.geo = {
                            ...w.device.geo,
                            ...k.geo
                        }, w.user.geo = {
                            ...w.user.geo,
                            ...W.geo
                        }) : (null != W && W.geo || null != k && k.geo) && (w.user.geo = w.device.geo = null != W && W.geo ? {
                            ...w.user.geo,
                            ...W.geo
                        } : {
                            ...w.user.geo,
                            ...k.geo
                        }), null !== (m = N.ext) && void 0 !== m && null !== (m = m.prebid) && void 0 !== m && null !== (m = m.bidderparams) && void 0 !== m && null !== (m = m[t.bidderCode]) && void 0 !== m && m.acat) {
                        const e = N.ext.prebid.bidderparams[t.bidderCode].acat;
                        L(w, e)
                    } else E.length && L(w, E);
                    var B;
                    (function(e, t) {
                        (t = t.filter((function(e) {
                            return "string" == typeof e || ((0, i.logWarn)(h + "bcat: Each category should be a string, ignoring category: " + e), !1)
                        })).map((e => e.trim())).filter((function(e, t, r) {
                            if (e.length > 3) return r.indexOf(e) === t;
                            (0, i.logWarn)(h + "bcat: Each category should have a value of a length of more than 3 characters, ignoring category: " + e)
                        }))).length > 0 && ((0, i.logWarn)(h + "bcat: Selected: ", t), e.bcat = t)
                    }(w, R), null != t && t.timeout) ? w.tmax = t.timeout: w.tmax = null === (B = window) || void 0 === B || null === (B = B.PWT) || void 0 === B || null === (B = B.versionDetails) || void 0 === B ? void 0 : B.timeout;
                    w.ext.epoch = (new Date).getTime(), "object" == typeof p.config.getConfig("app") && (w.app = p.config.getConfig("app"), w.app.publisher = w.site.publisher, w.app.ext = w.site.ext || b, "object" != typeof w.app.content && (w.app.content = w.site.content || b), delete w.site);
                    let D = {
                        method: "POST",
                        url: f + "?source=ow-client",
                        data: JSON.stringify(w),
                        bidderRequest: t
                    };
                    if (!0 === p.config.getConfig("translatorGetRequest.enabled") && Math.ceil(100 * Math.random()) <= (p.config.getConfig("translatorGetRequest.testGroupPercentage") || 0)) {
                        var G;
                        const e = p.config.getConfig("translatorGetRequest.maxUrlLength") || 63e3,
                            r = p.config.getConfig("translatorGetRequest.endPoint") || f,
                            a = (0, i.parseQueryStringParameters)({
                                source: "ow-client",
                                payload: JSON.stringify(w)
                            });
                        (null === (G = r + "?" + a) || void 0 === G ? void 0 : G.length) <= e && (D = {
                            method: "GET",
                            url: r,
                            data: a,
                            bidderRequest: t,
                            payloadStr: JSON.stringify(w)
                        })
                    }
                    return D
                },
                interpretResponse: (e, t) => {
                    var r = [],
                        a = y;
                    null != t && t.payloadStr && (t.data = t.payloadStr);
                    let s = JSON.parse(t.data),
                        o = s.site && s.site.ref ? s.site.ref : "";
                    try {
                        let p = JSON.parse(t.data);
                        if (e.body && e.body.seatbid && (0, i.isArray)(e.body.seatbid) && (r = [], a = e.body.cur || a, e.body.seatbid.forEach((p => {
                                p.bid && (0, i.isArray)(p.bid) && p.bid.forEach((l => {
                                    let c = {
                                        requestId: l.impid,
                                        cpm: parseFloat((l.price || 0).toFixed(2)),
                                        width: l.w,
                                        height: l.h,
                                        sspID: l.id || "",
                                        creativeId: l.crid || l.id,
                                        dealId: l.dealid,
                                        currency: a,
                                        netRevenue: true,
                                        ttl: 300,
                                        referrer: o,
                                        ad: l.adm,
                                        pm_seat: p.seat || null,
                                        pm_dspid: l.ext && l.ext.dspid ? l.ext.dspid : null,
                                        partnerImpId: l.id || ""
                                    };
                                    s.imp && s.imp.length > 0 && s.imp.forEach((e => {
                                            if (l.impid === e.id) switch (function(e, t) {
                                                    if (e.ext && null != e.ext.bidtype) t.mediaType = O[e.ext.bidtype];
                                                    else {
                                                        (0, i.logInfo)(h + "bid.ext.bidtype does not exist, checking alternatively for mediaType");
                                                        var r = e.adm,
                                                            a = "",
                                                            n = new RegExp(/VAST\s+version/);
                                                        if (r.indexOf('span class="PubAPIAd"') >= 0) t.mediaType = d.W4;
                                                        else if (n.test(r)) t.mediaType = d.im;
                                                        else try {
                                                            (a = JSON.parse(r.replace(/\\/g, ""))) && a.native && (t.mediaType = d.sl)
                                                        } catch (e) {
                                                            (0, i.logWarn)(h + "Error: Cannot parse native reponse for ad response: " + r)
                                                        }
                                                    }
                                                }(l, c), c.mediaType) {
                                                case d.W4:
                                                    break;
                                                case d.im:
                                                    c.width = l.hasOwnProperty("w") ? l.w : e.video.w, c.height = l.hasOwnProperty("h") ? l.h : e.video.h, c.vastXml = l.adm,
                                                        function(e, t) {
                                                            let r, a, i;
                                                            if (t.bidderRequest && t.bidderRequest.bids) {
                                                                for (let n = 0; n < t.bidderRequest.bids.length; n++) t.bidderRequest.bids[n].bidId === e.requestId && (r = t.bidderRequest.bids[n].params, a = t.bidderRequest.bids[n].mediaTypes[d.im].context, i = t.bidderRequest.bids[n].adUnitCode);
                                                                a && "outstream" === a && r && r.outstreamAU && i && (e.rendererCode = r.outstreamAU, e.renderer = S.newRenderer(e.rendererCode, i))
                                                            }
                                                        }(c, t),
                                                        function(e, t, r) {
                                                            var a, s;
                                                            if (null == t || null === (a = t.ext) || void 0 === a || !a.prebiddealpriority) return;
                                                            const o = (0, i.getBidRequest)(e.requestId, [r.bidderRequest]),
                                                                p = (0, n.c)(o, "mediaTypes.video");
                                                            if ((null == p ? void 0 : p.context) != d.So) return;
                                                            const l = (null == t || null === (s = t.ext) || void 0 === s || null === (s = s.video) || void 0 === s ? void 0 : s.duration) || (null == p ? void 0 : p.maxduration);
                                                            e.video = {
                                                                context: d.So,
                                                                durationSeconds: l,
                                                                dealTier: t.ext.prebiddealpriority
                                                            }
                                                        }(c, l, t);
                                                    break;
                                                case d.sl:
                                                    ! function(e, t) {
                                                        if (e.hasOwnProperty("adm")) {
                                                            var r = "";
                                                            try {
                                                                r = JSON.parse(e.adm.replace(/\\/g, ""))
                                                            } catch (e) {
                                                                return void(0, i.logWarn)(h + "Error: Cannot parse native reponse for ad response: " + t.adm)
                                                            }
                                                            t.native = {
                                                                ortb: {
                                                                    ...r.native
                                                                }
                                                            }, t.mediaType = d.sl, t.width || (t.width = 0), t.height || (t.height = 0)
                                                        }
                                                    }(l, c)
                                            }
                                        })), c.dealId && (c.dealChannel = "PMP"), c.dealId && l.ext && l.ext.deal_channel && (c.dealChannel = E[l.ext.deal_channel] || null),
                                        function(e, t, r) {
                                            e.meta = {}, t.ext && t.ext.dspid && (e.meta.networkId = t.ext.dspid, e.meta.demandSource = t.ext.dspid), t.ext && t.ext.dchain && (e.meta.dchain = t.ext.dchain);
                                            const a = r || t.ext && t.ext.advid;
                                            a && (e.meta.advertiserId = a, e.meta.agencyId = a, e.meta.buyerId = a), t.adomain && V(t.adomain) && (e.meta.advertiserDomains = t.adomain, e.meta.clickUrl = t.adomain[0], e.meta.brandId = t.adomain[0]), t.cat && V(t.cat) && (e.meta.secondaryCatIds = t.cat, e.meta.primaryCatId = t.cat[0])
                                        }(c, l, p.seat), e.body.ext && (c.ext = e.body.ext), p.ext && p.ext.buyid && (c.adserverTargeting = {
                                            hb_buyid_pubmatic: p.ext.buyid
                                        }), l.ext && l.ext.marketplace && (c.bidderCode = l.ext.marketplace), r.push(c)
                                }))
                            }))), p && p.imp && p.imp.length > 0) {
                            let e = p.imp.map((e => e.id)),
                                t = r.map((e => e.requestId)).filter(((e, t, r) => r.indexOf(e) === t));
                            e.filter((e => !t.includes(e))).forEach((function(e) {
                                p.imp.forEach((function(t) {
                                    t.id === e && r.push({
                                        requestId: t.id,
                                        width: 0,
                                        height: 0,
                                        ttl: 300,
                                        ad: "",
                                        creativeId: 0,
                                        netRevenue: true,
                                        cpm: 0,
                                        currency: a,
                                        referrer: o
                                    })
                                }))
                            }))
                        }
                        let l = (0, n.c)(e.body, "ext.fledge_auction_configs");
                        if (l)
                        Object.keys(l)?.forEach(function(key){
//								l[key]["interestGroupBuyers"] = ["https://ebay.com"];
//								l[key]["decisionLogicUrl"] = "https://ebay.com/inte/automation/ProtectedAudience/worklet/ssp.js";
//								l[key]["trustedScoringSignalsURL"] = "https://ebay.com/inte/automation/ProtectedAudience/worklet/kv_server.json";
//								l[key]["seller"] = "https://ebay.com";
//								l[key]["sellerTimeout"] = 500;
//								l[key]["perBuyerSignals"] = "https://ebay.com";
//                                delete l[key]["perBuyerSignals"]["https://owsdk-stagingams.pubmatic.com:8443"];
//							    l[key]["perBuyerSignals"]["https://ebay.com"] = {
//									"multiplier": 1,
//									"win_reporting_id": "164074"
//								};
//								l[key]["perBuyerTimeouts"] = {
//									"*": 500
//								};
							});
							return l = Object.entries(l).map((e => {
                            let [t, r] = e;
                            return {
                                bidId: t,
                                config: Object.assign({
                                    auctionSignals: {}
                                }, r)
                            }
                        })), {
                            bids: r,
                            fledgeAuctionConfigs: l
                        }
                    } catch (e) {
                        (0, i.logError)(e)
                    }
                    return r
                },
                getUserSyncs: (e, t, r, a, i) => {
                    var n;
                    let s = "" + A;
                    var o;
                    (r && (s += "&gdpr=" + (r.gdprApplies ? 1 : 0), s += "&gdpr_consent=" + encodeURIComponent(r.consentString || "")), a && (s += "&us_privacy=" + encodeURIComponent(a)), null != i && i.gppString && null != i && null !== (n = i.applicableSections) && void 0 !== n && n.length) && (s += "&gpp=" + encodeURIComponent(i.gppString), s += "&gpp_sid=" + encodeURIComponent(null == i || null === (o = i.applicableSections) || void 0 === o ? void 0 : o.join(",")));
                    return !0 === p.config.getConfig("coppa") && (s += "&coppa=1"), e.iframeEnabled ? [{
                        type: "iframe",
                        url: "https://ads.pubmatic.com/AdServer/js/user_sync.html?kdntuid=1&p=" + s
                    }] : [{
                        type: "image",
                        url: "https://image8.pubmatic.com/AdServer/ImgSync?p=" + s
                    }]
                },
                transformBidParams: function(e, t, r, a) {
                    return (0, g.U)({
                        publisherId: "string",
                        adSlot: "string"
                    }, e)
                }
            };
            (0, o.K6)(F), (0, a.g)("pubmaticBidAdapter")
        }
    },
    e => {
        e.O(0, [68376, 21240], (() => {
            return t = 77200, e(e.s = t);
            var t
        }));
        e.O()
    }
]);
owpbjs.processQueue();
!(function(e) {
    function t(i) {
        if (n[i]) return n[i].exports;
        var r = n[i] = {
            i: i,
            l: !1,
            exports: {}
        };
        return e[i].call(r.exports, r, r.exports, t), r.l = !0, r.exports
    }
    var n = {};
    t.m = e, t.c = n, t.d = function(e, n, i) {
        t.o(e, n) || Object.defineProperty(e, n, {
            enumerable: !0,
            get: i
        })
    }, t.r = function(e) {
        "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(e, Symbol.toStringTag, {
            value: "Module"
        }), Object.defineProperty(e, "__esModule", {
            value: !0
        })
    }, t.t = function(e, n) {
        if (1 & n && (e = t(e)), 8 & n) return e;
        if (4 & n && "object" == typeof e && e && e.__esModule) return e;
        var i = Object.create(null);
        if (t.r(i), Object.defineProperty(i, "default", {
                enumerable: !0,
                value: e
            }), 2 & n && "string" != typeof e)
            for (var r in e) t.d(i, r, function(t) {
                return e[t]
            }.bind(null, r));
        return i
    }, t.n = function(e) {
        var n = e && e.__esModule ? function() {
            return e.default
        } : function() {
            return e
        };
        return t.d(n, "a", n), n
    }, t.o = function(e, t) {
        return Object.prototype.hasOwnProperty.call(e, t)
    }, t.p = "", t(t.s = 8)
})([(function(e, t) {
    t.COMMON = {
        BID_PRECISION: 2,
        DEAL_KEY_FIRST_PART: "pwtdeal_",
        DEAL_KEY_VALUE_SEPARATOR: "_-_",
        PREBID_PREFIX: "PB_",
        CONFIG: "config",
        DIV_ID: "divID",
        PARAMS: "params",
        SIZES: "sizes",
        HEIGHT: "height",
        WIDTH: "width",
        SLOTS: "slots",
        KEY_GENERATION_PATTERN_VALUE: "kgpv",
        KEY_VALUE_PAIRS: "kvp",
        IMPRESSION_ID: "iid",
        PARENT_ADAPTER_PREBID: "prebid",
        ANALYTICS_CURRENCY: "USD",
        NATIVE_MEDIA_TYPE_CONFIG: "nativeConfig",
        NATIVE_ONLY: "nativeOnly",
        OW_CLICK_NATIVE: "openwrap-native-click",
        BID_ID: "owbidid",
        AD_SERVER_CURRENCY: "adServerCurrency",
        SINGLE_IMPRESSION: "singleImpression",
        OPENWRAP_NAMESPACE: "PWT",
        IH_OW_NAMESPACE: "IHPWT",
        PREBID_NAMESPACE: "owpbjs",
        IH_NAMESPACE: "ihowpbjs",
        ENABLE_USER_ID: "identityEnabled",
        IDENTITY_PARTNERS: "identityPartners",
        IDENTITY_CONSUMERS: "identityConsumers",
        IDENTITY_ONLY: "identityOnly",
        PREBID: "prebid",
        PROTOCOL: "https://",
        SLOT_CONFIG: "slotConfig",
        DEFAULT: "default",
        MCONF_REGEX: "regex",
        ADSERVER: "adserver",
        OWVERSION: "owv",
        PBVERSION: "pbv",
        SCHAINOBJECT: "sChainObj",
        SCHAIN: "sChain",
        PBJS_NAMESPACE: "prebidObjName",
        TEST_GROUP_DETAILS: "testConfigDetails",
        TEST_PWT: "test_pwt",
        PRICE_GRANULARITY: "priceGranularity",
        GRANULARITY_MULTIPLIER: "granularityMultiplier",
        TEST_PARTNER: "test_adapters",
        REDUCE_CODE_SIZE: "reduceCodeSize",
        TEST_IDENTITY_PARTNER: "test_identityPartners",
        IH_ANALYTICS_ADAPTER_EXPIRY: "ihAnalyticsAdapterExpiry",
        IH_ANALYTICS_ADAPTER_DEFAULT_EXPIRY: 7,
        EXTERNAL_FLOOR_WO_CONFIG: "External Floor w/o Config",
        HARD_FLOOR: "hard"
    }, t.CONFIG = {
        GLOBAL: "global",
        ADAPTERS: "adapters",
        COMMON: "pwt",
        TIMEOUT: "t",
        KEY_GENERATION_PATTERN: "kgp",
        REGEX_KEY_GENERATION_PATTERN: "kgp_rx",
        REGEX_KEY_LOOKUP_MAP: "klm_rx",
        KEY_LOOKUP_MAP: "klm",
        SERVER_SIDE_KEY: "sk",
        PUBLISHER_ID: "pubid",
        PROFILE_ID: "pid",
        PROFILE_VERSION_ID: "pdvid",
        LOGGER_URL: "dataURL",
        TRACKER_URL: "winURL",
        REV_SHARE: "rev_share",
        THROTTLE: "throttle",
        BID_PASS_THROUGH: "pt",
        GLOBAL_KEY_VALUE: "gkv",
        MASK_BIDS: "maksBids",
        META_DATA_PATTERN: "metaDataPattern",
        SEND_ALL_BIDS: "sendAllBids",
        SERVER_SIDE_ENABLED: "serverSideEnabled",
        GDPR_CONSENT: "gdpr",
        CONSENT_STRING: "cns",
        GDPR_CMPAPI: "cmpApi",
        GDPR_TIMEOUT: "gdprTimeout",
        GDPR_AWC: "awc",
        DEFAULT_GDPR_CMPAPI: "iab",
        DEFAULT_GDPR_TIMEOUT: 1e4,
        DEFAULT_GDPR_AWC: "0",
        DEFAULT_SINGLE_IMPRESSION: "0",
        DEFAULT_USER_ID_MODULE: "0",
        DEFAULT_IDENTITY_ONLY: "0",
        DEFAULT_GDPR_CONSENT: "0",
        DISABLE_AJAX_TIMEOUT: "disableAjaxTimeout",
        CCPA_CONSENT: "ccpa",
        CCPA_CMPAPI: "ccpaCmpApi",
        CCPA_TIMEOUT: "ccpaTimeout",
        DEFAULT_CCPA_CMPAPI: "iab",
        DEFAULT_CCPA_TIMEOUT: 1e4,
        CACHE_PATH: "/cache",
        CACHE_URL: "https://ow.pubmatic.com",
        VIDEO_PARAM: "video",
        ENABLE_PB_PM_ANALYTICS: "pubAnalyticsAdapter",
        FLOOR_PRICE_MODULE_ENABLED: "floorPriceModuleEnabled",
        FLOOR_AUCTION_DELAY: "floorAuctionDelay",
        DEFAULT_FLOOR_AUCTION_DELAY: 100,
        FLOOR_JSON_URL: "jsonUrl",
        FLOOR_ENFORCE_JS: "floorType",
        DEFAULT_FLOOR_ENFORCE_JS: !0,
        USE_PREBID_KEYS: "usePBJSKeys",
        AB_TEST_ENABLED: "abTestEnabled",
        TIMEOUT_ADJUSTMENT: 50,
        SSO_ENABLED: "ssoEnabled",
        FLOOR_SOURCE: "floorSource",
        GDPR_ACTION_TIMEOUT: "gdprActionTimeout",
        PB_GLOBAL_VAR_NAMESPACE: "pbGlobalVarNamespace",
        OW_GLOBAL_VAR_NAMESPACE: "owGlobalVarNamespace"
    }, t.METADATA_MACROS = {
        WIDTH: "_W_",
        HEIGHT: "_H_",
        PARTNER: "_P_",
        GROSS_ECPM: "_GE_",
        NET_ECPM: "_NE_",
        BID_COUNT: "_BC_",
        PARTNER_COUNT: "_PC_"
    }, t.MACROS = {
        WIDTH: "_W_",
        HEIGHT: "_H_",
        AD_UNIT_ID: "_AU_",
        AD_UNIT_INDEX: "_AUI_",
        INTEGER: "_I_",
        DIV: "_DIV_"
    }, t.SLOT_STATUS = {
        CREATED: 0,
        PARTNERS_CALLED: 1,
        TARGETING_ADDED: 2,
        DISPLAYED: 3
    }, t.WRAPPER_TARGETING_KEYS = {
        BID_ID: "pwtsid",
        BID_STATUS: "pwtbst",
        BID_ECPM: "pwtecp",
        BID_DEAL_ID: "pwtdid",
        BID_ADAPTER_ID: "pwtpid",
        BID_SIZE: "pwtsz",
        PUBLISHER_ID: "pwtpubid",
        PROFILE_ID: "pwtprofid",
        PROFILE_VERSION_ID: "pwtverid",
        META_DATA: "pwtm",
        PLATFORM_KEY: "pwtplt",
        USER_IDS: "pwtuid",
        CACHE_ID: "pwtcid",
        CACHE_URL: "pwtcurl",
        CACHE_PATH: "pwtcpath",
        ACAT: "pwtacat",
        CRID: "pwtcrid",
        DSP: "pwtdsp"
    }, t.IGNORE_PREBID_KEYS = {
        hb_bidder: 1,
        hb_adid: 1,
        hb_pb: 1,
        hb_size: 1,
        hb_deal: 1,
        hb_uuid: 1,
        hb_cache_host: 1,
        hb_cache_id: 1,
        hb_adomain: 1
    }, t.LOGGER_PIXEL_PARAMS = {
        TIMESTAMP: "tst",
        PAGE_URL: "purl",
        PAGE_DOMAIN: "orig",
        TIMEOUT: "to"
    }, t.MESSAGES = {
        M1: ": In fetchbids.",
        M2: ": Throttled.",
        M3: ": adapter must implement the fetchBids() function.",
        M4: "BidManager: entry ",
        M5: ": Callback.",
        M6: "bidAlreadExists : ",
        M7: ": Exiting from fetchBids.",
        M8: ". Config not found, ignored.",
        M10: "Bid is rejected as ecpm is NULL.",
        M11: "Bid is rejected as ecpm is NaN: ",
        M12: "Existing bid ecpm: ",
        M13: ", is lower than new bid ecpm ",
        M14: ", so we are replacing bid from partner ",
        M15: ", is greater than new bid ecpm ",
        M16: ", so we are not replacing bid from partner ",
        M17: "Post timeout bid, ignored.",
        M18: "Bid is selected for partner ",
        M19: ": Found winning adapterID: ",
        M20: "Bid is rejected as ecpm is empty string.",
        M21: ": error in respose handler.",
        M22: "Bid is rejected as ecpm is <= 0.",
        M23: "Existing bid is default-bid with zero ecpm, thus replacing it with the new bid from partner ",
        M24: "Passsed argument is not a bidAdaptor",
        M25: "Bid details not found for bidID: ",
        M26: "Currency Module is Activated. Ad Server Currency is: ",
        M27: "Invalid regex pattern ",
        M28: "Unable to match regex pattern as kgpv length is not 3",
        M29: "Unable to parse Partner configuration",
        M30: "AB Test Enabled With Config",
        M31: "AB Test Enabled With Partner Config",
        M32: "Invalid MediaConfig regex pattern : ",
        IDENTITY: {
            M1: "Unable to get User Id from OpenIdentity",
            M2: "Setting UserIds to EB ",
            M3: "Unable to parse User ID configuration",
            M4: "User Id Configuration Sent to prebid ",
            M5: "Identity only enabled, no need to process. Calling Original function ",
            M6: " function is not available. Make sure userId module is included."
        }
    }, t.PLATFORM_VALUES = {
        DISPLAY: "display",
        NATIVE: "native",
        VIDEO: "video"
    }, t.FORMAT_VALUES = {
        BANNER: "banner",
        VIDEO: "video",
        NATIVE: "native",
        OTHER: "other"
    }, t.HOOKS = {
        PREBID_SET_CONFIG: "HookForPrebidSetConfig",
        PREBID_REQUEST_BIDS: "HookForPrebidRequestBids",
        BID_RECEIVED: "HookForBidReceived",
        POST_AUCTION_KEY_VALUES: "HookForPostAuctionKeyValues"
    }, t.SRA_ENABLED_BIDDERS = {
        rubicon: 1,
        improvedigital: 2
    }, t.EXCLUDE_IDENTITY_PARAMS = ["rev_share", "timeout", "throttle"], t.TOLOWERCASE_IDENTITY_PARAMS = ["storage.type"], t.JSON_VALUE_KEYS = ["params.clientIdentifier"], t.AD_SERVER = {
        DFP: "DFP",
        CUSTOM: "CUSTOM"
    }, t.SPECIAL_CASE_ID_PARTNERS = {
        intentIqId: {
            "params.partner": "number"
        },
        sharedId: {
            "params.syncTime": "number"
        },
        id5Id: {
            "params.partner": "number",
            "storage.refreshInSeconds": "number",
            "storage.expires": "number"
        },
        parrableId: {
            "params.timezoneFilter.allowedZones": "array"
        },
        imuid: {
            "params.cid": "number"
        },
        identityLink: {
            "storage.refreshInSeconds": "number"
        },
        merkleId: {
            "params.ssp_ids": "array"
        },
        liveIntentId: {
            "params.requestedAttributesOverrides": "customObject"
        }
    }, t.ID_PARTNERS_CUSTOM_VALUES = {
        id5Id: [{
            key: "params.provider",
            value: "pubmatic-identity-hub"
        }],
        identityLink: [{
            key: "storage.refreshInSeconds",
            value: "1800"
        }]
    }, t.EXCLUDE_PARTNER_LIST = ["pubProvidedId"], t.MEDIATYPE = {
        BANNER: 0,
        VIDEO: 1,
        NATIVE: 2
    }, t.BID_STATUS = {
        BID_REJECTED: "bidRejected"
    }, t.PUBMATIC_ALIASES = ["pubmatic2"], t.PBSPARAMS = {
        adapter: "prebidServer",
        endpoint: "https://ow.pubmatic.com/pbs/openrtb2/auction",
        syncEndpoint: "https://ow.pubmatic.com/cookie_sync/?sec=1"
    }, t.TIMEOUT_CONFIG = {
        MaxTimeout: 500,
        MinTimeout: 200
    }, t.DEFAULT_ALIASES = {
        adg: "adgeneration",
        districtm: "appnexus",
        districtmDMX: "dmx",
        pubmatic2: "pubmatic"
    }, t.YAHOOSSP = "yahoossp", t.REGEX_BROWSERS = [/\b(?:crmo|crios)\/([\w\.]+)/i, /edg(?:e|ios|a)?\/([\w\.]+)/i, /(opera mini)\/([-\w\.]+)/i, /(opera [mobiletab]{3,6})\b.+version\/([-\w\.]+)/i, /(opera)(?:.+version\/|[\/ ]+)([\w\.]+)/i, /opios[\/ ]+([\w\.]+)/i, /\bopr\/([\w\.]+)/i, /(kindle)\/([\w\.]+)/i, /(lunascape)[\/ ]?([\w\.]*)/i, /(maxthon)[\/ ]?([\w\.]*)/i, /(netfront)[\/ ]?([\w\.]*)/i, /(jasmine)[\/ ]?([\w\.]*)/i, /(blazer)[\/ ]?([\w\.]*)/i, /(avant |iemobile|slim)(?:browser)?[\/ ]?([\w\.]*)/i, /(ba?idubrowser)[\/ ]?([\w\.]+)/i, /(?:ms|\()(ie) ([\w\.]+)/i, /(flock)\/([-\w\.]+)/i, /(rockmelt)\/([-\w\.]+)/i, /(midori)\/([-\w\.]+)/i, /(epiphany)\/([-\w\.]+)/i, /(silk)\/([-\w\.]+)/i, /(skyfire)\/([-\w\.]+)/i, /(ovibrowser)\/([-\w\.]+)/i, /(bolt)\/([-\w\.]+)/i, /(iron)\/([-\w\.]+)/i, /(vivaldi)\/([-\w\.]+)/i, /(iridium)\/([-\w\.]+)/i, /(phantomjs)\/([-\w\.]+)/i, /(bowser)\/([-\w\.]+)/i, /(quark)\/([-\w\.]+)/i, /(qupzilla)\/([-\w\.]+)/i, /(falkon)\/([-\w\.]+)/i, /(rekonq)\/([-\w\.]+)/i, /(puffin)\/([-\w\.]+)/i, /(brave)\/([-\w\.]+)/i, /(whale)\/([-\w\.]+)/i, /(qqbrowserlite)\/([-\w\.]+)/i, /(qq)\/([-\w\.]+)/i, /(duckduckgo)\/([-\w\.]+)/i, /(weibo)__([\d\.]+)/i, /(?:\buc? ?browser|(?:juc.+)ucweb)[\/ ]?([\w\.]+)/i, /microm.+\bqbcore\/([\w\.]+)/i, /\bqbcore\/([\w\.]+).+microm/i, /micromessenger\/([\w\.]+)/i, /konqueror\/([\w\.]+)/i, /trident.+rv[: ]([\w\.]{1,9})\b.+like gecko/i, /yabrowser\/([\w\.]+)/i, /(avast|avg)\/([\w\.]+)/i, /\bfocus\/([\w\.]+)/i, /\bopt\/([\w\.]+)/i, /coc_coc\w+\/([\w\.]+)/i, /dolfin\/([\w\.]+)/i, /coast\/([\w\.]+)/i, /miuibrowser\/([\w\.]+)/i, /fxios\/([-\w\.]+)/i, /\bqihu|(qi?ho?o?|360)browser/i, /(oculus)browser\/([\w\.]+)/i, /(samsung)browser\/([\w\.]+)/i, /(sailfish)browser\/([\w\.]+)/i, /(huawei)browser\/([\w\.]+)/i, /(comodo_dragon)\/([\w\.]+)/i, /(electron)\/([\w\.]+) safari/i, /(tesla)(?: qtcarbrowser|\/(20\d\d\.[-\w\.]+))/i, /m?(qqbrowser|baiduboxapp|2345Explorer)[\/ ]?([\w\.]+)/i, /(metasr)[\/ ]?([\w\.]+)/i, /(lbbrowser)/i, /\[(linkedin)app\]/i, /((?:fban\/fbios|fb_iab\/fb4a)(?!.+fbav)|;fbav\/([\w\.]+);)/i, /safari (line)\/([\w\.]+)/i, /\b(line)\/([\w\.]+)\/iab/i, /(chromium|instagram)[\/ ]([-\w\.]+)/i, /\bgsa\/([\w\.]+) .*safari\//i, /headlesschrome(?:\/([\w\.]+)| )/i, / wv\).+(chrome)\/([\w\.]+)/i, /droid.+ version\/([\w\.]+)\b.+(?:mobile safari|safari)/i, /(chrome|chromium|crios)\/v?([\w\.]+)/i, /(chrome|omniweb|arora|[tizenoka]{5} ?browser)\/v?([\w\.]+)/i, /version\/([\w\.\,]+) .*mobile\/\w+ (safari)/i, /version\/([\w(\.|\,)]+) .*(mobile ?safari|safari)/i, /webkit.+?(mobile ?safari|safari)(\/[\w\.]+)/i, /(navigator|netscape\d?)\/([-\w\.]+)/i, /mobile vr; rv:([\w\.]+)\).+firefox/i, /ekiohf.+(flow)\/([\w\.]+)/i, /(swiftfox)/i, /(icedragon|iceweasel|camino|chimera|fennec|maemo browser|minimo|conkeror|klar)[\/ ]?([\w\.\+]+)/i, /(seamonkey|k-meleon|icecat|iceape|firebird|phoenix|palemoon|basilisk|waterfox)\/([-\w\.]+)$/i, /(firefox)\/([\w\.]+)/i, /(mozilla)\/([\w\.]+) .+rv\:.+gecko\/\d+/i, /(polaris|lynx|dillo|icab|doris|amaya|w3m|netsurf|sleipnir|obigo|mosaic|(?:go|ice|up)[\. ]?browser)[-\/ ]?v?([\w\.]+)/i, /(links) \(([\w\.]+)/i], t.BROWSER_MAPPING = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 42, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 77, 78, 79, 80, 81, 82, 83, 84, 85, 86, 87, 88, 89, 90]
}), (function(e, t, n) {
    var i = n(2),
        r = n(0),
        o = n(3),
        a = n(5),
        s = n(4);
    t.debugLogIsEnabled = !1, t.visualDebugLogIsEnabled = !1;
    var d = Object.prototype.toString,
        c = this;
    c.idsAppendedToAdUnits = !1, t.mediaTypeConfig = {};
    var u = parseInt(o[r.CONFIG.COMMON][r.COMMON.IDENTITY_ONLY] || r.CONFIG.DEFAULT_IDENTITY_ONLY) ? r.COMMON.IH_NAMESPACE : r.COMMON.PREBID_NAMESPACE;
    t.pbNameSpace = u, t.isA = function(e, t) {
        return d.call(e) === "[object " + t + "]"
    }, t.isFunction = function(e) {
        return c.isA(e, "Function")
    }, t.isString = function(e) {
        return c.isA(e, "String")
    }, t.isArray = function(e) {
        return c.isA(e, "Array")
    }, t.isNumber = function(e) {
        return c.isA(e, "Number")
    }, t.isObject = function(e) {
        return "object" == typeof e && null !== e
    }, t.isOwnProperty = function(e, t) {
        return !(!c.isObject(e) || !e.hasOwnProperty) && e.hasOwnProperty(t)
    }, t.isUndefined = function(e) {
        return void 0 === e
    }, t.enableDebugLog = function() {
        c.debugLogIsEnabled = !0
    }, t.isDebugLogEnabled = function() {
        return c.debugLogIsEnabled
    }, t.enableVisualDebugLog = function() {
        c.debugLogIsEnabled = !0, c.visualDebugLogIsEnabled = !0
    }, t.isEmptyObject = function(e) {
        return c.isObject(e) && 0 === Object.keys(e).length
    }, t.log = function(e) {
        c.debugLogIsEnabled && console && this.isFunction(console.log) && (this.isString(e) ? console.log((new Date).getTime() + " : [OpenWrap] : " + e) : console.log(e))
    }, t.logError = function(e) {
        c.debugLogIsEnabled && console && this.isFunction(console.log) && (this.isString(e) ? console.error((new Date).getTime() + " : [OpenWrap] : " + e) : console.error(e))
    }, t.logWarning = function(e) {
        c.debugLogIsEnabled && console && this.isFunction(console.log) && (this.isString(e) ? console.warn((new Date).getTime() + " : [OpenWrap] : " + e) : console.warn(e))
    }, t.error = function(e) {
        console.log((new Date).getTime() + " : [OpenWrap] : [Error]", e)
    }, t.getCurrentTimestampInMs = function() {
        return (new window.Date).getTime()
    }, t.getCurrentTimestamp = function() {
        var e = new Date;
        return Math.round(e.getTime() / 1e3)
    };
    var l, p = (l = 0, function() {
        return ++l
    });
    t.utilGetIncrementalInteger = p, t.getUniqueIdentifierStr = function() {
        return p() + window.Math.random().toString(16).substr(2)
    }, t.copyKeyValueObject = function(e, t) {
        if (c.isObject(e) && c.isObject(t)) {
            var n = c;
            c.forEachOnObject(t, (function(i, r) {
                if (t[i] = n.isArray(r) ? r : [r], n.isOwnProperty(e, i)) {
                    if (!c.isArray(e[i])) {
                        var o = e[i];
                        e[i] = [o]
                    }
                    e[i].push(r)
                } else e[i] = [r]
            }))
        }
    }, t.getIncrementalInteger = (function() {
        var e = 0;
        return function() {
            return ++e
        }
    })(), t.generateUUID = function() {
        var e = (new window.Date).getTime(),
            t = window.decodeURIComponent(this.pageURL).toLowerCase().replace(/[^a-z,A-Z,0-9]/gi, ""),
            n = t.length;
        return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx-zzzzz".replace(/[xyz]/g, (function(i) {
            var r, o = (e + 16 * Math.random()) % 16 | 0;
            switch (e = Math.floor(e / 16), i) {
                case "x":
                    r = o;
                    break;
                case "z":
                    r = t[Math.floor(Math.random() * n)];
                    break;
                default:
                    r = 3 & o | 8
            }
            return r.toString(16)
        }))
    };
    var g = new RegExp(r.MACROS.WIDTH, "g"),
        f = new RegExp(r.MACROS.HEIGHT, "g"),
        m = new RegExp(r.MACROS.AD_UNIT_ID, "g"),
        E = new RegExp(r.MACROS.AD_UNIT_INDEX, "g"),
        I = new RegExp(r.MACROS.INTEGER, "g"),
        w = new RegExp(r.MACROS.DIV, "g");
    t.generateSlotNamesFromPattern = function(e, t, n, i) {
        var r, o, a, s, d = [],
            u = {};
        if (c.isObject(e) && c.isFunction(e.getSizes)) {
            o = e.getSizes();
            var l = c.isFunction(e.getDivID) ? e.getDivID() : e.getSlotId().getDomId();
            if (n) {
                o = [].concat(e.getSizes());
                var p = c.mediaTypeConfig[l];
                p && p.video && o.unshift([0, 0])
            }
            if ((a = o.length) > 0)
                for (s = 0; a > s; s++)
                    if (2 == o[s].length && o[s][0] && o[s][1] || 0 == o[s][0] && 0 == o[s][1] || c.isFunction(o[s].getWidth) && c.isFunction(o[s].getHeight)) {
                        var h = c.isFunction(e.getAdUnitID) ? e.getAdUnitID() : e.getSlotId().getAdUnitPath(),
                            O = (l = c.isFunction(e.getDivID) ? e.getDivID() : e.getSlotId().getDomId(), c.isFunction(e.getAdUnitIndex) ? e.getAdUnitIndex() : e.getSlotId().getId().split("_")[1]),
                            S = 0 == o[s][0] ? 0 : o[s][0] || o[s].getWidth(),
                            A = 0 == o[s][1] ? 0 : o[s][1] || o[s].getHeight();
                        r = (r = t).replace(m, h).replace(E, O).replace(I, c.getIncrementalInteger()).replace(w, l).replace(g, S).replace(f, A), 0 == S && 0 == A ? i[0] = r : c.isOwnProperty(u, r) || (u[r] = "", d.push(r))
                    }
        }
        return d
    }, t.forEachGeneratedKey = function(e, t, n, i, o, a, s, d) {
        var u = a.length,
            l = n[r.CONFIG.KEY_GENERATION_PATTERN] || n[r.CONFIG.REGEX_KEY_GENERATION_PATTERN] || "";
        u > 0 && l.length > 3 && c.forEachOnArray(a, (function(r, a) {
            var u = [],
                p = c.generateSlotNamesFromPattern(a, l, !0, u);
            p.length > 0 && c.callHandlerFunctionForMapping(e, t, n, i, o, p, a, s, d, l, u)
        }))
    }, t.callHandlerFunctionForMapping = function(e, t, n, o, d, u, l, p, g, f, m) {
        var E = n[r.CONFIG.KEY_LOOKUP_MAP] || n[r.CONFIG.REGEX_KEY_LOOKUP_MAP] || null,
            I = f.indexOf(r.MACROS.WIDTH) >= 0 && f.indexOf(r.MACROS.HEIGHT) >= 0,
            w = !!n[r.CONFIG.REGEX_KEY_LOOKUP_MAP],
            h = void 0;
        const O = i.getAdapterNameForAlias(e);
        var S = r.PUBMATIC_ALIASES.indexOf(O) > -1,
            A = !1;
        c.forEachOnArray(u, (function(i, d) {
            var u = null,
                f = !1,
                O = l.getSizes();
            if (null == E) m && 1 == m.length && (d = m[0]), f = !0;
            else {
                if (w) {
                    c.debugLogIsEnabled && c.log(console.time("Time for regexMatching for key " + d));
                    var y = c.getConfigFromRegex(E, d);
                    c.debugLogIsEnabled && c.log(console.timeEnd("Time for regexMatching for key " + d)), y ? (u = y.config, h = y.regexPattern) : A = !!S
                } else m && 1 == m.length && (u = E[Object.keys(E).filter((function(e) {
                    return e.toLowerCase() === m[0].toLowerCase()
                }))]) && (d = m[0]), u || (u = E[Object.keys(E).filter((function(e) {
                    return e.toLowerCase() === d.toLowerCase()
                }))[0]]);
                !u && !S || A ? c.log(e + ": " + d + r.MESSAGES.M8) : f = !0
            }
            if (f) {
                if (1 == g) {
                    var T = a.createBid(e, d);
                    T.setDefaultBidStatus(1).setReceivedTime(c.getCurrentTimestampInMs()), s.setBidFromBidder(l.getDivID(), T), T.setRegexPattern(h)
                }
                p(e, t, n, o, d, I, l, c.getPartnerParams(u), O[i][0], O[i][1], h)
            }
        }))
    }, t.resizeWindow = function(e, t, n, i) {
        if (n && t) try {
            var r = e.defaultView.frameElement,
                o = [];
            if (i) {
                var a = document.getElementById(i),
                    s = a.querySelector("div");
                o.push(s), o.push(s.querySelector("iframe")), r = a.querySelector("iframe")
            }
            o.push(r), o.forEach((function(e) {
                e && (e.width = "" + t, e.height = "" + n, e.style.width = t + "px", e.style.height = n + "px")
            }))
        } catch (e) {
            c.logError("Creative-Resize; Error in resizing creative")
        }
    }, t.writeIframe = function(e, t, n, i, r) {
        e.write('<iframe frameborder="0" allowtransparency="true" marginheight="0" marginwidth="0" scrolling="no" width="' + n + '" hspace="0" vspace="0" height="' + i + '"' + (r ? ' style="' + r + '"' : "") + ' src="' + t + '"></iframe>')
    }, t.displayCreative = function(e, t) {
        t && t.pbbid && "video" == t.pbbid.mediaType && t.renderer && c.isObject(t.renderer) ? c.isFunction(t.renderer.render) && t.renderer.render(t.getPbBid()) : (c.resizeWindow(e, t.width, t.height), t.adHtml ? (t.adHtml = c.replaceAuctionPrice(t.adHtml, t.getGrossEcpm()), e.write(t.adHtml)) : t.adUrl ? (t.adUrl = c.replaceAuctionPrice(t.adUrl, t.getGrossEcpm()), c.writeIframe(e, t.adUrl, t.width, t.height, "")) : (c.logError("creative details are not found"), c.logError(t)))
    }, t.forEachOnObject = function(e, t) {
        if (c.isObject(e) && c.isFunction(t))
            for (var n in e) c.isOwnProperty(e, n) && t(n, e[n])
    }, t.forEachOnArray = function(e, t) {
        if (c.isArray(e) && c.isFunction(t))
            for (var n = 0, i = e.length; i > n; n++) t(n, e[n])
    }, t.trim = function(e) {
        return c.isString(e) ? e.replace(/^\s+/g, "").replace(/\s+$/g, "") : e
    }, t.getTopFrameOfSameDomain = function(e) {
        try {
            if (e.parent.document != e.document) return c.getTopFrameOfSameDomain(e.parent)
        } catch (e) {}
        return e
    }, t.metaInfo = {}, t.getMetaInfo = function(e) {
        var t, n = {};
        n.pageURL = "", n.refURL = "", n.protocol = "https://", n.secure = 1, n.isInIframe = c.isIframe(e);
        try {
            t = c.getTopFrameOfSameDomain(e), n.refURL = (t.refurl || t.document.referrer || "").substr(0, 512), n.pageURL = (t !== window.top && "" != t.document.referrer ? t.document.referrer : t.location.href).substr(0, 512), n.protocol = (function(e) {
                return "http:" === e.location.protocol ? (n.secure = 0, "http://") : (n.secure = 1, "https://")
            })(t)
        } catch (e) {}
        return n.pageDomain = c.getDomainFromURL(n.pageURL), c.metaInfo = n, n
    }, t.isIframe = function(e) {
        try {
            return e.self !== e.top
        } catch (e) {
            return !1
        }
    }, t.findQueryParamInURL = function(e, t) {
        return c.isOwnProperty(c.parseQueryParams(e), t)
    }, t.parseQueryParams = function(e) {
        var t = c.createDocElement(window, "a");
        t.href = e;
        var n = {};
        if (t.search) {
            var i = t.search.replace("?", "");
            i = i.split("&"), c.forEachOnArray(i, (function(e, t) {
                var i = (t = t.split("="))[0] || "",
                    r = t[1] || "";
                n[i] = r
            }))
        }
        return n
    }, t.createDocElement = function(e, t) {
        return e.document.createElement(t)
    }, t.addHookOnFunction = function(e, t, n, i) {
        var r = e;
        if (e = t ? e.__proto__ : e, c.isObject(e) && c.isFunction(e[n])) {
            var o = e[n];
            e[n] = i(r, o)
        } else c.logWarning("in assignNewDefination: oldReference is not a function")
    }, t.getBididForPMP = function(e, t) {
        var n = (e = e.split(",")).length,
            i = t.length,
            o = "",
            a = "";
        if (0 != n) {
            for (var s = 0; i > s; s++) {
                for (var d = 0; n > d; d++)
                    if (e[d].indexOf(t[s]) >= 0) {
                        o = e[d];
                        break
                    } if ("" != o) break
            }
            "" == o ? (o = e[0], this.log("No PMP-Deal was found matching PriorityArray, So Selecting first PMP-Deal: " + o)) : this.log("Selecting PMP-Deal: " + o);
            var c = o.split(r.COMMON.DEAL_KEY_VALUE_SEPARATOR);
            if (3 == c.length && (a = c[2]), a) return a;
            this.log("Error: bidID not found in PMP-Deal: " + o)
        } else this.log("Error: Unable to find bidID as values array is empty.")
    }, t.insertHtmlIntoIframe = function(e) {
        if (e) {
            var t = document.createElement("iframe");
            t.id = c.getUniqueIdentifierStr(), t.width = 0, t.height = 0, t.hspace = "0", t.vspace = "0", t.marginWidth = "0", t.marginHeight = "0", t.style.display = "none", t.style.height = "0px", t.style.width = "0px", t.scrolling = "no", t.frameBorder = "0", t.allowtransparency = "true", (function(e, t, n, i) {
                var r;
                t = t || document, r = n ? t.getElementsByTagName(n) : t.getElementsByTagName("head");
                try {
                    if ((r = r.length ? r : t.getElementsByTagName("body")).length) {
                        r = r[0];
                        var o = i ? null : r.firstChild;
                        r.insertBefore(e, o)
                    }
                } catch (e) {}
            })(t, document, "body"), t.contentWindow.document.open(), t.contentWindow.document.write(e), t.contentWindow.document.close()
        }
    }, t.createInvisibleIframe = function() {
        var e = c.createDocElement(window, "iframe");
        return e.id = c.getUniqueIdentifierStr(), e.height = 0, e.width = 0, e.border = "0px", e.hspace = "0", e.vspace = "0", e.marginWidth = "0", e.marginHeight = "0", e.style.border = "0", e.scrolling = "no", e.frameBorder = "0", e.style = "display:none", e
    }, t.addMessageEventListener = function(e, t) {
        return "function" != typeof t ? (c.log("EventHandler should be a function"), !1) : (e.addEventListener ? e.addEventListener("message", t, !1) : e.attachEvent("onmessage", t), !0)
    }, t.safeFrameCommunicationProtocol = function(e) {
        try {
            var t;
            if (msgData = window.JSON.parse(e.data), !msgData.pwt_type) return;
            switch (window.parseInt(msgData.pwt_type)) {
                case 1:
                    if (window.PWT.isSafeFrame) return;
                    if (l = t = s.getBidById(msgData.pwt_bidID)) {
                        var n = (p = l.bid).getAdapterID(),
                            r = l.slotid,
                            o = {
                                pwt_type: 2,
                                pwt_bid: p
                            };
                        c.vLogInfo(r, {
                            type: "disp",
                            adapter: n
                        }), s.executeMonetizationPixel(r, p), p && p.pbbid && "video" == p.pbbid.mediaType && p.renderer && c.isObject(p.renderer) ? c.isFunction(p.renderer.render) && p.renderer.render(p.getPbBid()) : (c.resizeWindow(window.document, p.width, p.height, r), e.source.postMessage(window.JSON.stringify(o), msgData.pwt_origin))
                    }
                    break;
                case 2:
                    if (!window.PWT.isSafeFrame) return;
                    if (msgData.pwt_bid)
                        if ((p = msgData.pwt_bid).adHtml) try {
                            var a = c.createInvisibleIframe(window.document);
                            if (!a) throw {
                                message: "Failed to create invisible frame.",
                                name: ""
                            };
                            if (a.setAttribute("width", p.width), a.setAttribute("height", p.height), a.style = "", window.document.body.appendChild(a), !a.contentWindow) throw {
                                message: "Unable to access frame window.",
                                name: ""
                            };
                            var d = a.contentWindow.document;
                            if (!d) throw {
                                message: "Unable to access frame window document.",
                                name: ""
                            };
                            var u = '<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd"><html><head><base target="_top" /><script>inDapIF=true;</script></head>';
                            u += "<body>", u += "<script>var $sf = window.parent.$sf;</script>", u += "<script>setInterval(function(){try{var fr = window.document.defaultView.frameElement;fr.width = window.parent.document.defaultView.innerWidth;fr.height = window.parent.document.defaultView.innerHeight;}catch(e){}}, 200);</script>", u += p.adHtml, u += "</body></html>", d.write(u), d.close()
                        } catch (e) {
                            c.logError("Error in rendering creative in safe frame."), c.log(e), c.log("Rendering synchronously."), c.displayCreative(window.document, msgData.pwt_bid)
                        } else p.adUrl ? c.writeIframe(window.document, p.adUrl, p.width, p.height, "") : (c.logWarning("creative details are not found"), c.log(p));
                    break;
                case 3:
                    if (i.isPrebidPubMaticAnalyticsEnabled()) e = {
                        message: "Prebid Native",
                        adId: msgData.pwt_bidID,
                        action: msgData.pwt_action
                    }, window.postMessage(JSON.stringify(e), "*");
                    else {
                        var l;
                        if (l = t = s.getBidById(msgData.pwt_bidID)) {
                            var p;
                            n = (p = l.bid).getAdapterID(), r = l.slotid, c.vLogInfo(r, {
                                type: "disp",
                                adapter: n
                            }), msgData.pwt_action && "imptrackers" == msgData.pwt_action && s.executeMonetizationPixel(r, p), s.fireTracker(p, msgData.pwt_action)
                        }
                    }
            }
            var g = JSON.parse(localStorage.getItem("PROFILE_AUCTION_INFO_" + window.location.hostname)) || {};
            null !== g && g.slotLevelFrquencyDepth && (g.slotLevelFrquencyDepth[g.codeAdUnitMap[t && t.slotid]].impressionServed = g.slotLevelFrquencyDepth[g.codeAdUnitMap[t && t.slotid]].impressionServed + 1, g.impressionServed = g.impressionServed + 1), localStorage.setItem("PROFILE_AUCTION_INFO_" + window.location.hostname, JSON.stringify(g))
        } catch (e) {}
    }, t.addMessageEventListenerForSafeFrame = function(e) {
        c.addMessageEventListener(e, c.safeFrameCommunicationProtocol)
    }, t.getElementLocation = function(e) {
        var t, n = 0,
            i = 0;
        if (c.isFunction(e.getBoundingClientRect)) t = e.getBoundingClientRect(), n = Math.floor(t.left), i = Math.floor(t.top);
        else
            for (; e;) n += e.offsetLeft, i += e.offsetTop, e = e.offsetParent;
        return {
            x: n,
            y: i
        }
    }, t.createVLogInfoPanel = function(e, t) {
        var n, i, r, o = window.document;
        if (c.visualDebugLogIsEnabled && (n = o.getElementById(e)) && t.length && t[0][0] && t[0][1] && (r = e + "-pwtc-info", !c.isUndefined(o.getElementById(r)))) {
            var a = c.getElementLocation(n);
            (i = o.createElement("div")).id = r, i.style = "position: absolute; /*top: " + a.y + "px;*/ left: " + a.x + "px; width: " + t[0][0] + "px; height: " + t[0][1] + "px; border: 1px solid rgb(255, 204, 52); padding-left: 11px; background: rgb(247, 248, 224) none repeat scroll 0% 0%; overflow: auto; z-index: 9999997; visibility: hidden;opacity:0.9;font-size:13px;font-family:monospace;";
            var s = o.createElement("img");
            s.src = c.metaInfo.protocol + "ads.pubmatic.com/AdServer/js/pwt/close.png", s.style = "cursor:pointer; position: absolute; top: 2px; left: " + (a.x + t[0][0] - 16 - 15) + "px; z-index: 9999998;", s.title = "close", s.onclick = function() {
                i.style.display = "none"
            }, i.appendChild(s), i.appendChild(o.createElement("br"));
            for (var d = "Slot: " + e + " | ", u = 0; u < t.length; u++) d += (0 != u ? ", " : "") + t[u][0] + "x" + t[u][1];
            i.appendChild(o.createTextNode(d)), i.appendChild(o.createElement("br")), n.parentNode.insertBefore(i, n)
        }
    }, t.realignVLogInfoPanel = function(e) {
        var t, n, i, r = window.document;
        if (c.visualDebugLogIsEnabled && (t = r.getElementById(e)) && (i = e + "-pwtc-info", n = r.getElementById(i))) {
            var o = c.getElementLocation(t);
            n.style.visibility = "visible", n.style.left = o.x + "px", n.style.height = t.clientHeight + "px"
        }
    }, t.vLogInfo = function(e, t) {
        var n, i, r = window.document;
        if (c.visualDebugLogIsEnabled) {
            var o = e + "-pwtc-info";
            if (n = r.getElementById(o)) {
                switch (t.type) {
                    case "bid":
                        var a = t.latency,
                            s = t.bidDetails,
                            d = "";
                        0 > a && (a = 0), d = t.hasOwnProperty("adServerCurrency") && void 0 !== t.adServerCurrency ? 0 == t.adServerCurrency ? "USD" : t.adServerCurrency : "USD", i = "Bid: " + t.bidder + (t.s2s ? "(s2s)" : "") + ": " + s.getNetEcpm() + "(" + s.getGrossEcpm() + ")" + d + " :" + a + "ms", s.getPostTimeoutStatus() && (i += ": POST-TIMEOUT");
                        break;
                    case "win-bid":
                        s = t.bidDetails, d = "", d = t.hasOwnProperty("adServerCurrency") && void 0 !== t.adServerCurrency ? 0 == t.adServerCurrency ? "USD" : t.adServerCurrency : "USD", i = "Winning Bid: " + s.getAdapterID() + ": " + s.getNetEcpm() + d;
                        break;
                    case "win-bid-fail":
                        i = "There are no bids from PWT";
                        break;
                    case "hr":
                        i = "----------------------";
                        break;
                    case "disp":
                        i = "Displaying creative from " + t.adapter
                }
                n.appendChild(r.createTextNode(i)), n.appendChild(r.createElement("br"))
            }
        }
    }, t.getExternalBidderStatus = function(e) {
        var t = !0;
        return c.forEachOnArray(e, (function(e, n) {
            t = window.OWT.externalBidderStatuses[n] ? t && window.OWT.externalBidderStatuses[n].status : t
        })), t
    }, t.resetExternalBidderStatus = function(e) {
        c.forEachOnArray(e, (function(e, t) {
            c.log("resetExternalBidderStatus: " + t), window.OWT.externalBidderStatuses[t] = void 0
        }))
    }, t.ajaxRequest = function(e, t, n, i) {
        try {
            var r, o = !0,
                a = (i = i || {}).method || (n ? "POST" : "GET");
            if (window.XMLHttpRequest ? (r = new window.XMLHttpRequest, c.isUndefined(r.responseType) && (o = !1)) : o = !1, !o) return void c.log("Ajax is not supported");
            r.onreadystatechange = function() {
                4 === r.readyState && t && t(r.responseText, r)
            }, r.open(a, e), i.withCredentials && (r.withCredentials = !0), i.preflight && r.setRequestHeader("X-Requested-With", "XMLHttpRequest"), r.setRequestHeader("Content-Type", i.contentType || "text/plain"), r.send("POST" === a && n)
        } catch (e) {
            c.log("Failed in Ajax"), c.log(e)
        }
    }, t.addFloorConfigIfPresent = function(e, t, n) {
        (e.floors || n) && (t.floors = e.floors || n)
    }, t.getAdUnitConfig = function(e, t) {
        function n() {
            return w ? Object.keys(u.config).toString().toLowerCase().indexOf(w.toLowerCase()) > -1 : void 0
        }

        function o() {
            return !(!u || 1 != u[r.COMMON.MCONF_REGEX])
        }
        var a, s = {},
            d = {},
            u = i.getSlotConfiguration();
        if (u)
            if (u.configPattern && "" != u.configPattern.trim() || (u.configPattern = "_AU_")) {
                var l = u.configPattern,
                    p = !0,
                    g = !0,
                    f = !0,
                    m = void 0,
                    E = void 0,
                    I = c.isFunction(t.getDivID) ? t.getDivID() : t.getSlotId().getDomId(),
                    w = c.generateSlotNamesFromPattern(t, l, !1)[0];
                if (c.isOwnProperty(u.config, r.COMMON.DEFAULT) && (u.config[r.COMMON.DEFAULT].banner && c.isOwnProperty(u.config[r.COMMON.DEFAULT].banner, "enabled") && !u.config[r.COMMON.DEFAULT].banner.enabled && (f = !1), u.config[r.COMMON.DEFAULT].native && c.isOwnProperty(u.config[r.COMMON.DEFAULT].native, "enabled") && !u.config[r.COMMON.DEFAULT].native.enabled && (g = !1), u.config[r.COMMON.DEFAULT].video && c.isOwnProperty(u.config[r.COMMON.DEFAULT].video, "enabled") && !u.config[r.COMMON.DEFAULT].video.enabled && (p = !1), E = (m = u.config[r.COMMON.DEFAULT]) && m.floors, m.renderer && !c.isEmptyObject(m.renderer) && (s.renderer = m.renderer)), c.isOwnProperty(u.config, w) || n() || o()) {
                    const e = n() ? u.config[w] : o() ? (Object.keys(u.config).forEach((function(e) {
                        try {
                            if (e.length > 0 && e != r.COMMON.DEFAULT && w.match(new RegExp(e, "i"))) return void(a = e)
                        } catch (t) {
                            c.log(r.MESSAGES.M32 + JSON.stringify(e))
                        }
                    })), a ? u.config[a] : void 0) : void 0;
                    e && (m = e), m || (m = u.config[Object.keys(u.config).filter((function(e) {
                        return e.toLocaleLowerCase() === w.toLowerCase()
                    }))]), c.log("Config" + JSON.stringify(m) + " found for adSlot: " + JSON.stringify(t))
                } else c.log("Considering Default Config for " + JSON.stringify(t));
                if (m) {
                    if (g && m.native && (!c.isOwnProperty(m.native, "enabled") || m.native.enabled) && (m.native.config ? d.native = m.native.config : c.logWarning("Native Config will not be considered as no config has been provided for slot" + JSON.stringify(t) + " or there is no configuration defined in default.")), p && m.video && (!c.isOwnProperty(m.video, "enabled") || m.video.enabled) && (i.getAdServer() != r.AD_SERVER.DFP ? m.video.config ? (d.video = m.video.config, m.video.partnerConfig && (d.partnerConfig = m.video.partnerConfig)) : c.logWarning("Video Config will not be considered as no config has been provided for slot" + JSON.stringify(t) + " or there is no configuration defined in default.") : c.logWarning("Video Config will not be considered with DFP selected as AdServer.")), m.renderer && !c.isEmptyObject(m.renderer) && (s.renderer = m.renderer), m.ortb2Imp && !c.isEmptyObject(m.ortb2Imp) && (s.ortb2Imp = m.ortb2Imp), !f || m.banner && c.isOwnProperty(m.banner, "enabled") && !m.banner.enabled) return c.mediaTypeConfig[I] = d, s.mediaTypeObject = d, c.addFloorConfigIfPresent(m, s, E), s;
                    c.addFloorConfigIfPresent(m, s, E)
                } else c.log("Config not found for adSlot: " + JSON.stringify(t))
            } else c.logWarning("Slot Type not found in config. Please provide slotType in configuration");
        return d.banner = {
            sizes: e
        }, c.mediaTypeConfig[I] = d, s.mediaTypeObject = d, s
    }, t.addEventListenerForClass = function(e, t, n, i) {
        if ("function" != typeof i) return c.log("EventHandler should be a function"), !1;
        var r = c.findElementsByClass(e, n);
        e.addEventListener || (t = "on" + t);
        for (var o = 0; o < r.length; o++) r[o].addEventListener(t, i, !0);
        return !0
    }, t.findElementsByClass = function(e, t) {
        return e.document.getElementsByClassName(t) || []
    }, t.getBidFromEvent = function(e) {
        return e && e.target && e.target.attributes && e.target.attributes[r.COMMON.BID_ID] && e.target.attributes[r.COMMON.BID_ID].value || ""
    }, t.getAdFormatFromBidAd = function(e) {
        var t = void 0;
        if (e && c.isString(e)) try {
            if (new RegExp(/VAST\s+version/).test(e)) t = r.FORMAT_VALUES.VIDEO;
            else {
                var n = JSON.parse(e.replace(/\\/g, ""));
                n && n.native && (t = r.FORMAT_VALUES.NATIVE)
            }
        } catch (e) {
            t = r.FORMAT_VALUES.BANNER
        }
        return t
    }, t.handleHook = function(e, t) {
        c.isFunction(window.PWT[e]) && (c.log("For Hook-name: " + e + ", calling window.PWT." + e + "function."), window.PWT[e].apply(window.PWT, t))
    }, t.getCurrencyToDisplay = function() {
        var e = i.getAdServerCurrency();
        if (0 == e && (e = "USD"), i.getAdServerCurrency() && window[r.COMMON.PREBID_NAMESPACE] && c.isFunction(window[r.COMMON.PREBID_NAMESPACE].getConfig)) {
            var t = window[r.COMMON.PREBID_NAMESPACE].getConfig();
            if (t && t.currency && t.currency.adServerCurrency) return t.currency.adServerCurrency
        }
        return e
    }, t.getConfigFromRegex = function(e, t) {
        for (var n = null, i = t.split("@"), o = 0; o < e.length; o++) {
            var a = e[o],
                s = a.rx;
            if (3 == i.length) try {
                if (i[0].match(new RegExp(s.AU, "i")) && i[1].match(new RegExp(s.DIV, "i")) && i[2].match(new RegExp(s.SIZE, "i"))) {
                    n = {
                        config: a.rx_config,
                        regexPattern: s.AU + "@" + s.DIV + "@" + s.SIZE
                    };
                    break
                }
            } catch (e) {
                c.logError(r.MESSAGES.M27 + JSON.stringify(s))
            } else c.logWarning(r.MESSAGES.M28 + t)
        }
        return n
    }, t.getUserIdConfiguration = function() {
        var e = [];
        return window[u].onSSOLogin({}), c.forEachOnObject(i.getIdentityPartners(), (function(t, n) {
            r.EXCLUDE_PARTNER_LIST.indexOf(t) < 0 && e.push(c.getUserIdParams(n))
        })), c.log(r.MESSAGES.IDENTITY.M4 + JSON.stringify(e)), e
    }, t.getUserIds = function() {
        return c.isFunction(window[r.COMMON.PREBID_NAMESPACE].getUserIds) ? window[r.COMMON.PREBID_NAMESPACE].getUserIds() : (c.logWarning("getUserIds" + r.MESSAGES.IDENTITY.M6), void 0)
    }, t.getUserIdsAsEids = function() {
        return c.isFunction(window[r.COMMON.PREBID_NAMESPACE].getUserIdsAsEids) ? window[r.COMMON.PREBID_NAMESPACE].getUserIdsAsEids() : (c.logWarning("getUserIdsAsEids" + r.MESSAGES.IDENTITY.M6), void 0)
    }, t.getNestedObjectFromArray = function(e, t, n) {
        for (var i = e, r = i, o = 0; o < t.length - 1; o++) r[t[o]] || (r[t[o]] = {}), r = r[t[o]];
        return r[t[t.length - 1]] = n, i
    }, t.getNestedObjectFromString = function(e, t, n, i) {
        var r = n.split(t);
        return 1 == r.length ? e[n] = i : e = c.getNestedObjectFromArray(e, r, i), e
    }, t.deleteCustomParams = function(e) {
        return delete e.custom, e
    }, t.getUserIdParams = function(e) {
        var t = {};
        for (var n in c.applyDataTypeChangesIfApplicable(e), c.applyCustomParamValuesfApplicable(e), e) try {
            -1 == r.EXCLUDE_IDENTITY_PARAMS.indexOf(n) && (r.TOLOWERCASE_IDENTITY_PARAMS.indexOf(n) > -1 && (e[n] = e[n].toLowerCase()), r.JSON_VALUE_KEYS.indexOf(n) > -1 && (e[n] = JSON.parse(e[n])), t = c.getNestedObjectFromString(t, ".", n, e[n]))
        } catch (e) {
            c.logWarning(r.MESSAGES.IDENTITY.M3, e)
        }
        return t && t.params && "true" == t.params.loadATS && c.initLiveRampAts(t), t && t.params && "true" == t.params.loadIDP && c.initZeoTapJs(t), t && t.params && "true" == t.params.loadLauncher && c.initLauncherJs(t), t && t.custom && "true" == t.custom.loadLaunchPad && c.initLiveRampLaunchPad(t), c.deleteCustomParams(t)
    }, t.getPartnerParams = function(e) {
        var t = {};
        for (var n in e) try {
            t = c.getNestedObjectFromString(t, ".", n, e[n])
        } catch (e) {
            c.logWarning(r.MESSAGES.M29, e)
        }
        return t
    }, t.getAdDomain = function(e) {
        if (e.meta && e.meta.advertiserDomains && e.meta.advertiserDomains.length > 0) {
            var t = e.meta.advertiserDomains[0];
            if (t) try {
                return new URL(t).hostname.replace("www.", "")
            } catch (e) {
                return c.log("Adomain URL (Not a proper URL):" + t), t.split("/")[0].replace("www.", "")
            }
        }
    }, t.getTgid = function() {
        var e = parseInt(PWT.testGroupId || 0);
        return 15 >= e && e >= 0 ? e : 0
    }, t.generateMonetizationPixel = function(e, t) {
        var n, o, a, d, u, l, p, g = i.getMonetizationPixelURL(),
            f = i.getPublisherId(),
            m = "";
        const E = t.pbbid && t.pbbid.prebidBidId || t.prebidBidId;
        if (g) {
            o = c.isFunction(t.getGrossEcpm) ? t.getGrossEcpm(!0) : i.getAdServerCurrency() && c.isFunction(t.getCpmInNewCurrency) ? window.parseFloat(t.getCpmInNewCurrency(r.COMMON.ANALYTICS_CURRENCY)) : i.isPrebidPubMaticAnalyticsEnabled() && t.originalCpm ? t.originalCpm : t.cpm, "pubmaticServer" == (u = c.isFunction(t.getAdapterID) ? t.getAdapterID() : t.bidderCode) && (u = t.originalBidder || "pubmatic"), l = i.getAdapterNameForAlias(u), n = c.isFunction(t.getNetEcpm) ? t.getNetEcpm(!0) : window.parseFloat((o * i.getAdapterRevShare(u)).toFixed(r.COMMON.BID_PRECISION)), d = c.isFunction(t.getBidID) ? t.getBidID() : i.isPrebidPubMaticAnalyticsEnabled() && t.adId ? t.adId : window.PWT.bidMap[e].adapters[u].bids[Object.keys(window.PWT.bidMap[e].adapters[u].bids)[0]].bidID, a = c.isFunction(t.getKGPV) ? t.getKGPV() : window.PWT.bidMap[e].adapters[u].bids[Object.keys(window.PWT.bidMap[e].adapters[u].bids)[0]].getKGPV(!1, t.mediaType), m = c.isFunction(t.getsspID) ? t.getsspID() : t.sspID || "", p = s.getAdUnitInfo(e).adUnitId || e;
            var I = window.PWT.bidMap[e].getImpressionID(),
                w = window.PWT.newAdUnits && window.PWT.newAdUnits[I] && window.PWT.newAdUnits[I][e] && window.PWT.newAdUnits[I][e].pubmaticAutoRefresh && window.PWT.newAdUnits[I][e].pubmaticAutoRefresh.isRefreshed ? 1 : 0;
            const h = c.getAdDomain(t.pbbid || t) || void 0,
                O = window.PWT.floorData && window.PWT.floorData[I] && window.PWT.floorData[I].floorRequestData ? 0 == window.PWT.floorData[I].floorRequestData.skipped ? 0 : 1 : void 0;
            return g += "pubid=" + f, g += "&purl=" + window.encodeURIComponent(c.metaInfo.pageURL), g += "&tst=" + c.getCurrentTimestamp(), g += "&iid=" + window.encodeURIComponent(window.PWT.bidMap[e].getImpressionID()), g += "&bidid=" + (E ? window.encodeURIComponent(E) : window.encodeURIComponent(d)), g += "&origbidid=" + window.encodeURIComponent(d), g += "&pid=" + window.encodeURIComponent(i.getProfileID()), g += "&pdvid=" + window.encodeURIComponent(i.getProfileDisplayVersionID()), g += "&slot=" + window.encodeURIComponent(e), g += "&au=" + window.encodeURIComponent(p), g += "&bc=" + window.encodeURIComponent(u), g += "&pn=" + window.encodeURIComponent(l), g += "&en=" + window.encodeURIComponent(n), g += "&eg=" + window.encodeURIComponent(o), g += "&kgpv=" + window.encodeURIComponent(a), g += "&piid=" + window.encodeURIComponent(m), g += "&rf=" + window.encodeURIComponent(w), g += "&di=" + window.encodeURIComponent(t.getDealID() || "-1"), g += "&plt=" + window.encodeURIComponent(c.getDevicePlatform()), g += c.isFunction(t.getWidth) && c.isFunction(t.getHeight) ? "&psz=" + window.encodeURIComponent(t.getWidth() + "x" + t.getHeight()) : c.isFunction(t.getSize) ? "&psz=" + window.encodeURIComponent(t.getSize()) : "&psz=" + window.encodeURIComponent(t.width + "x" + t.height), g += "&tgid=" + window.encodeURIComponent(c.getTgid()), h && (g += "&adv=" + window.encodeURIComponent(h)), g += "&orig=" + window.encodeURIComponent(c.metaInfo && c.metaInfo.pageDomain || ""), g += "&ss=" + window.encodeURIComponent(c.isFunction(t.getServerSideStatus) ? t.getServerSideStatus() ? 1 : 0 : i.isServerSideAdapter(u) ? 1 : 0), null != O && (g += "&fskp=" + window.encodeURIComponent(O)), g += "&af=" + window.encodeURIComponent(c.isFunction(t.getAdFormat) ? t.getAdFormat() : t.mediaType || void 0), r.COMMON.PROTOCOL + g
        }
    }, t.UpdateVastWithTracker = function(e, t) {
        try {
            var n = (new DOMParser).parseFromString(t, "application/xml"),
                r = n.createElement("Impression");
            return r.innerHTML = i.isPrebidPubMaticAnalyticsEnabled() ? "" : "<![CDATA[" + c.generateMonetizationPixel(e.adUnitCode, e) + "]]>", 1 == n.getElementsByTagName("Wrapper").length ? n.getElementsByTagName("Wrapper")[0].appendChild(r) : 1 == n.getElementsByTagName("InLine").length && n.getElementsByTagName("InLine")[0].appendChild(r), (new XMLSerializer).serializeToString(n)
        } catch (e) {
            return t
        }
    }, t.getDomainFromURL = function(e) {
        var t = window.document.createElement("a");
        return t.href = e, t.hostname
    }, t.replaceAuctionPrice = function(e, t) {
        return e ? e.replace(/\$\{AUCTION_PRICE\}/g, t) : void 0
    }, t.getCustomParamsForDFPVideo = function(e, t) {
        const n = t && t.adserverTargeting || {};
        var i = {};
        for (var r in n) c.isOwnProperty(n, r) && (i[r] = c.isArray(n[r]) ? n[r].join() : n[r]);
        return e = Object.assign({}, i, e)
    }, t.getDevicePlatform = function() {
        var e = 3;
        try {
            var t = navigator.userAgent;
            if (t && c.isString(t) && "" != t.trim()) {
                t = t.toLowerCase().trim();
                var n = new RegExp("(mobi|tablet|ios).*");
                e = t.match(n) ? 2 : 1
            }
        } catch (e) {
            c.logError("Unable to get device platform", e)
        }
        return e
    }, t.getOWConfig = function() {
        return {
            timeout: i.getTimeout(),
            openwrap_version: i[r.COMMON.OWVERSION],
            prebid_version: i[r.COMMON.PBVERSION],
            profileId: i.getProfileID(),
            profileVersionId: i.getProfileDisplayVersionID()
        }
    }, t.updateAdUnits = function(e) {
        c.isArray(e) ? e.forEach((function(e) {
            e.bids.forEach((function(e) {
                c.updateUserIds(e)
            }))
        })) : c.isEmptyObject(e) || e.bids.forEach((function(e) {
            c.updateUserIds(e)
        }))
    }, t.updateUserIds = function(e) {
        if (c.isUndefined(e.userId) ? e.userId = c.getUserIds() : e.userId && (e.userId = Object.assign(e.userId, c.getUserIds())), c.isUndefined(e.userIdAsEids)) e.userIdAsEids = c.getUserIdsAsEids();
        else if (c.isArray(e.userIdAsEids)) {
            var t = new Set,
                n = c.getUserIdsAsEids().concat(e.userIdAsEids);
            c.isArray(n) && n.length > 0 && (n = n.filter((function(e) {
                if (e.source) {
                    if (t.has(e.source)) return !1;
                    t.add(e.source)
                }
                return !0
            }))), e.userIdAsEids = n
        }
    }, t.getLiverampParams = function(e) {
        e.params.cssSelectors && e.params.cssSelectors.length > 0 && (e.params.cssSelectors = e.params.cssSelectors.split(","));
        var t = window[u].getUserIdentities() || {},
            n = i.isSSOEnabled() || !1,
            r = e.params.detectionMechanism,
            o = "true" === e.params.enableCustomId,
            a = {
                placementID: e.params.pid,
                storageType: e.params.storageType,
                logging: e.params.logging
            };
        switch (o && (a.accountID = e.params.accountID, a.customerIDRegex = e.params.customerIDRegex, a.detectionSubject = "customerIdentifier"), r) {
            case void 0:
            case "detect":
                a.detectionType = e.params.detectionType, a.urlParameter = e.params.urlParameter, a.cssSelectors = e.params.cssSelectors, a.detectDynamicNodes = e.params.detectDynamicNodes, a.detectionEventType = e.params.detectionEventType, e.params.triggerElements && e.params.triggerElements.length > 0 && (e.params.triggerElements = e.params.triggerElements.split(","), a.triggerElements = e.params.triggerElements);
                break;
            case "direct":
                if (a.emailHashes = void 0, window.PWT && window.PWT.OVERRIDES_SCRIPT_BASED_MODULES && window.PWT.OVERRIDES_SCRIPT_BASED_MODULES.includes("identityLink") || void 0 === window.PWT.OVERRIDES_SCRIPT_BASED_MODULES) {
                    var s = n && t.emailHash ? t.emailHash : t.pubProvidedEmailHash ? t.pubProvidedEmailHash : void 0;
                    a.emailHashes = s && [s.MD5, s.SHA1, s.SHA256] || void 0
                }
                o && c.isFunction(window[u].getUserIdentities) && void 0 !== window[u].getUserIdentities() && (a.customerID = window[u].getUserIdentities().customerID || void 0)
        }
        return a
    }, t.getEmailHashes = function() {
        var e = window[u].getUserIdentities() || {},
            t = i.isSSOEnabled() && e.emailHash ? e.emailHash : e.pubProvidedEmailHash ? e.pubProvidedEmailHash : void 0,
            n = [];
        return c.forEachOnObject(t, (function(e, t) {
            void 0 !== t && n.push(t)
        })), n.length > 0 ? n : void 0
    }, t.initLiveRampLaunchPad = function(e) {
        var t, n = "https://launchpad-wrapper.privacymanager.io/" + e.custom.configurationId + "/launchpad-liveramp.js";
        (t = document.createElement("script")).onload = function() {
            __launchpad("addEventListener", 1, (function() {
                if ((!ats.outputCurrentConfiguration().DETECTION_MODULE_INFO || ats.outputCurrentConfiguration().ENVELOPE_MODULE_INFO.ENVELOPE_MODULE_CONFIG.startWithExternalId) && (window.PWT && window.PWT.OVERRIDES_SCRIPT_BASED_MODULES && window.PWT.OVERRIDES_SCRIPT_BASED_MODULES.includes("identityLink") || void 0 === window.PWT.OVERRIDES_SCRIPT_BASED_MODULES)) {
                    var e = c.getEmailHashes();
                    e && window.ats.setAdditionalData({
                        type: "emailHashes",
                        id: e
                    })
                }
            }), ["atsWrapperLoaded"])
        }, t.src = n, document.body.appendChild(t)
    }, t.getPublinkLauncherParams = function(e) {
        e.params.cssSelectors && e.params.cssSelectors.length > 0 && (e.params.cssSelectors = e.params.cssSelectors.split(","));
        var t = window[u].getUserIdentities() || {},
            n = i.isSSOEnabled() || !1,
            r = e.params.detectionMechanism,
            o = {
                apiKey: e.params.api_key,
                siteId: e.params.site_id
            };
        switch (r) {
            case void 0:
            case "detect":
                o.urlParameter = e.params.urlParameter, o.cssSelectors = e.params.cssSelectors, o.detectionSubject = "email";
                break;
            case "direct":
                if (window.PWT && window.PWT.OVERRIDES_SCRIPT_BASED_MODULES && window.PWT.OVERRIDES_SCRIPT_BASED_MODULES.includes("publinkId") || void 0 === window.PWT.OVERRIDES_SCRIPT_BASED_MODULES) {
                    var a = n && t.emailHash ? t.emailHash : t.pubProvidedEmailHash ? t.pubProvidedEmailHash : void 0;
                    o.emailHashes = a && [a.MD5, a.SHA256] || void 0
                }
        }
        return o
    }, t.initLiveRampAts = function(e) {
        function t() {
            var t = document.createElement("script"),
                n = c.getLiverampParams(e);
            t.onload = function() {
                window.ats && window.ats.start(n)
            }, t.src = "https://ats.rlcdn.com/ats.js", document.body.appendChild(t)
        }
        "complete" == document.readyState ? t() : window.addEventListener("load", (function() {
            setTimeout(t, 1e3)
        }))
    }, t.initZeoTapJs = function(e) {
        function t() {
            var t = document,
                n = window,
                r = window[u].getUserIdentities() || {},
                o = i.isSSOEnabled() || !1,
                a = {};
            (window.PWT && window.PWT.OVERRIDES_SCRIPT_BASED_MODULES && window.PWT.OVERRIDES_SCRIPT_BASED_MODULES.includes("zeotapIdPlus") || void 0 === window.PWT.OVERRIDES_SCRIPT_BASED_MODULES) && (a = {
                email: o && r.emailHash ? r.emailHash.SHA256 : r.pubProvidedEmailHash ? r.pubProvidedEmailHash.SHA256 : void 0
            });
            var s = t.createElement("script");
            s.type = "text/javascript", s.crossorigin = "anonymous", s.async = !0, s.src = "https://content.zeotap.com/sdk/idp.min.js", s.onload = function() {}, t = t.getElementsByTagName("script")[0];
            var d = {
                partnerId: e.partnerId,
                allowIDP: !0,
                useConsent: i.getCCPA() || i.getGdpr(),
                checkForCMP: i.getCCPA() || i.getGdpr()
            };
            t.parentNode.insertBefore(s, t), (function(e, t) {
                for (var n = 0; n < t.length; n++) !(function(t) {
                    e[t] = function() {
                        e._q.push([t].concat(Array.prototype.slice.call(arguments, 0)))
                    }
                })(t[n])
            })(t = n.zeotap || {
                _q: [],
                _qcmp: []
            }, ["callMethod"]), n.zeotap = t, n.zeotap.callMethod("init", d), n.zeotap.callMethod("setUserIdentities", a, !0)
        }
        "complete" == document.readyState ? t() : window.addEventListener("load", (function() {
            setTimeout(t, 1e3)
        }))
    }, t.initLauncherJs = function(e) {
        function t() {
            var t = document.createElement("script"),
                n = c.getPublinkLauncherParams(e);
            t.onload = function() {
                window.conversant.getLauncherObject = function() {
                    return n
                }, window.conversant && window.conversant.launch("publink", "start", n)
            }, t.src = "https://secure.cdn.fastclick.net/js/cnvr-launcher/latest/launcher-stub.min.js", document.body.appendChild(t)
        }
        window.cnvr_launcher_options = {
            lid: e.params.launcher_id
        }, "complete" == document.readyState ? t() : window.addEventListener("load", (function() {
            setTimeout(t, 1e3)
        }))
    }, t.getRandomNumberBelow100 = function() {
        return Math.floor(100 * Math.random())
    }, t.getUpdatedKGPVForVideo = function(e, t) {
        if (t == r.FORMAT_VALUES.VIDEO) {
            var n = ["", "0x0"],
                i = e.split("@");
            if (i.length > 1) {
                if (2 == i.length) {
                    if (i[1].indexOf(":") > -1) {
                        var o = i[1].split(":");
                        n[1] = n[1] + ":" + o[1]
                    }
                    n[0] = i[0]
                }
                e = n.join("@")
            }
        }
        return e
    }, t.applyDataTypeChangesIfApplicable = function(e) {
        var t;
        if (e.name in r.SPECIAL_CASE_ID_PARTNERS)
            for (partnerName in r.SPECIAL_CASE_ID_PARTNERS)
                if (partnerName === e.name)
                    for (key in r.SPECIAL_CASE_ID_PARTNERS[partnerName]) {
                        var n = e[key];
                        switch (r.SPECIAL_CASE_ID_PARTNERS[partnerName][key]) {
                            case "number":
                                n && "number" != typeof n && (t = parseInt(n), isNaN(t) ? c.logError(partnerName + ": Invalid parameter value '" + n + "' for parameter " + key) : e[key] = t);
                                break;
                            case "array":
                                if (n)
                                    if ("string" == typeof n) {
                                        var i = n.split(",").map((function(e) {
                                            return e.trim()
                                        }));
                                        i.length > 0 && (e[key] = i)
                                    } else "number" == typeof n && (e[key] = [n]);
                                break;
                            case "customObject":
                                if (n && "params.requestedAttributesOverrides" === key) try {
                                    e[key] = JSON.parse(n)
                                } catch (e) {
                                    c.logError("Error parsing requestedAttributesOverrides for partner ", partnerName)
                                }
                                break;
                            default:
                                return
                        }
                    }
    }, t.applyCustomParamValuesfApplicable = function(e) {
        if (e.name in r.ID_PARTNERS_CUSTOM_VALUES)
            for (var t = r.ID_PARTNERS_CUSTOM_VALUES[e.name], n = 0; n < t.length; n++) e[t[n].key] || (e[t[n].key] = t[n].value)
    }, t.getBrowserDetails = function() {
        return s.getBrowser().toString()
    }, t.getPltForFloor = function() {
        return c.getDevicePlatform().toString()
    }, t.getGeoInfo = function() {
        var e = "https://ut.pubmatic.com/geo?pubid=" + o[r.CONFIG.COMMON][r.CONFIG.PUBLISHER_ID],
            t = window[u].getDataFromLocalStorage("UINFO", 1728e5);
        t && JSON.parse(t).cc ? window.PWT.CC = JSON.parse(t) : window[u].detectLocation(e, (function(e) {
            window[u].setAndStringifyToLocalStorage("UINFO", e), window.PWT.CC = e
        }))
    }, t.getCDSTargetingData = function(e) {
        e = e || {};
        var t = window[r.COMMON.PREBID_NAMESPACE].getConfig("cds");
        return t && Object.keys(t).map((function(n) {
            if (!1 !== t[n].sendtoGAM) {
                var i = t[n].value;
                i = Array.isArray(i) || "object" == typeof i || "function" == typeof i || void 0 === i ? "" : i, e[n] = i
            }
        })), e
    }
}), (function(e, t, n) {
    var i, r = n(3),
        o = n(0),
        a = n(1);
    (i = this)[o.COMMON.OWVERSION] = r[o.CONFIG.COMMON][o.COMMON.OWVERSION], i[o.COMMON.PBVERSION] = r[o.CONFIG.COMMON][o.COMMON.PBVERSION], t.getPublisherId = function() {
        return a.trim(r.pwt.pubid) || "0"
    }, t.getMataDataPattern = function() {
        return a.isString(r[o.CONFIG.COMMON][o.CONFIG.META_DATA_PATTERN]) ? r[o.CONFIG.COMMON][o.CONFIG.META_DATA_PATTERN] : null
    }, t.getSendAllBidsStatus = function() {
        return window.parseInt(r[o.CONFIG.COMMON][o.CONFIG.SEND_ALL_BIDS]) || 0
    }, t.getTimeout = function() {
        return window.parseInt(r.pwt.t) || 1e3
    }, t.getDisableAjaxTimeout = function() {
        var e = r.pwt;
        return !a.isOwnProperty(e, o.CONFIG.DISABLE_AJAX_TIMEOUT) || 1 == r.pwt.disableAjaxTimeout
    }, t.getAdapterRevShare = function(e) {
        var t = r.adapters;
        return a.isOwnProperty(t[e], o.CONFIG.REV_SHARE) ? 1 - window.parseFloat(t[e][o.CONFIG.REV_SHARE]) / 100 : 1
    }, t.getAdapterThrottle = function(e) {
        var t = r.adapters;
        return a.isOwnProperty(t[e], o.CONFIG.THROTTLE) ? 100 - window.parseFloat(t[e][o.CONFIG.THROTTLE]) : 0
    }, t.isServerSideAdapter = function(e) {
        var t = r.adapters;
        return !(!t[e] || !a.isOwnProperty(t[e], o.CONFIG.SERVER_SIDE_ENABLED)) && 1 === window.parseInt(t[e][o.CONFIG.SERVER_SIDE_ENABLED])
    }, t.getAdapterMaskBidsStatus = function(e) {
        var t = r.adapters,
            n = {
                audienceNetwork: 1
            };
        return a.isOwnProperty(n, e) ? n[e] : a.isOwnProperty(t[e], o.CONFIG.MASK_BIDS) && window.parseInt(t[e][o.CONFIG.MASK_BIDS]) || 0
    }, t.getBidPassThroughStatus = function(e) {
        var t = r.adapters;
        return a.isOwnProperty(t[e], o.CONFIG.BID_PASS_THROUGH) ? window.parseInt(t[e][o.CONFIG.BID_PASS_THROUGH]) : 0
    }, t.getProfileID = function() {
        return a.trim(r.pwt[o.CONFIG.PROFILE_ID]) || "0"
    }, t.getProfileDisplayVersionID = function() {
        return a.trim(r.pwt[o.CONFIG.PROFILE_VERSION_ID]) || "0"
    }, t.getAnalyticsPixelURL = function() {
        return r.pwt[o.CONFIG.LOGGER_URL] || !1
    }, t.getMonetizationPixelURL = function() {
        return r.pwt[o.CONFIG.TRACKER_URL] || !1
    }, t.forEachAdapter = function(e) {
        a.forEachOnObject(r.adapters, e)
    }, t.getGdpr = function() {
        return "1" === (r[o.CONFIG.COMMON][o.CONFIG.GDPR_CONSENT] || o.CONFIG.DEFAULT_GDPR_CONSENT)
    }, t.getCmpApi = function() {
        return r[o.CONFIG.COMMON][o.CONFIG.GDPR_CMPAPI] || o.CONFIG.DEFAULT_GDPR_CMPAPI
    }, t.getGdprTimeout = function() {
        var e = r[o.CONFIG.COMMON][o.CONFIG.GDPR_TIMEOUT];
        return e ? window.parseInt(e) : o.CONFIG.DEFAULT_GDPR_TIMEOUT
    }, t.getAwc = function() {
        return "1" === (r[o.CONFIG.COMMON][o.CONFIG.GDPR_AWC] || o.CONFIG.DEFAULT_GDPR_AWC)
    }, t.getOverrideNamespace = function(e, t, n) {
        var i = r[o.CONFIG.COMMON][e];
        return i ? i === t ? n : i : n
    }, t.addPrebidAdapter = function() {
        var e = o.COMMON.PARENT_ADAPTER_PREBID;
        if (!a.isOwnProperty(r.adapters, e)) {
            var t = {};
            t[o.CONFIG.REV_SHARE] = "0.0", t[o.CONFIG.THROTTLE] = "100", t[o.CONFIG.KEY_GENERATION_PATTERN] = "_DIV_", t[o.CONFIG.KEY_LOOKUP_MAP] = {}, r.adapters[e] = t
        }
    }, t.initConfig = function() {
        i.updateABTestConfig(), i.addPrebidAdapter();
        var e = {};
        a.forEachOnObject(o.CONFIG, (function(t, n) {
            e[n] = ""
        })), a.forEachOnObject(r.adapters, (function(t, n) {
            var i = {};
            a.forEachOnObject(n, (function(t, n) {
                a.isOwnProperty(e, t) || (i[t] = n)
            })), a.forEachOnObject(n[o.CONFIG.KEY_LOOKUP_MAP], (function(e, t) {
                a.forEachOnObject(i, (function(e, n) {
                    t[e] = n
                }))
            })), "pubmatic" != t && "pubmatic2" != t && a.forEachOnObject(n[o.CONFIG.REGEX_KEY_LOOKUP_MAP], (function(e, t) {
                a.forEachOnObject(i, (function(e, n) {
                    a.isOwnProperty(t, "rx_config") && (t.rx_config[e] = n)
                }))
            }))
        }))
    }, t.getNativeConfiguration = function() {
        return r[o.COMMON.NATIVE_MEDIA_TYPE_CONFIG]
    }, t.getAdServerCurrency = function() {
        return r[o.CONFIG.COMMON][o.COMMON.AD_SERVER_CURRENCY]
    }, t.isSingleImpressionSettingEnabled = function() {
        return parseInt(r[o.CONFIG.COMMON][o.COMMON.SINGLE_IMPRESSION] || o.CONFIG.DEFAULT_SINGLE_IMPRESSION)
    }, t.isUserIdModuleEnabled = function() {
        return parseInt(r[o.CONFIG.COMMON][o.COMMON.ENABLE_USER_ID] || o.CONFIG.DEFAULT_USER_ID_MODULE)
    }, t.getIdentityPartners = function() {
        return r[o.COMMON.IDENTITY_PARTNERS]
    }, t.isIdentityOnly = function() {
        return parseInt(r[o.CONFIG.COMMON][o.COMMON.IDENTITY_ONLY] || o.CONFIG.DEFAULT_IDENTITY_ONLY)
    }, t.getIdentityConsumers = function() {
        return (r[o.CONFIG.COMMON][o.COMMON.IDENTITY_CONSUMERS] || "").toLowerCase()
    }, t.getSlotConfiguration = function() {
        return r[o.COMMON.SLOT_CONFIG]
    }, t.getAdServer = function() {
        return r[o.COMMON.ADSERVER]
    }, t.getCCPA = function() {
        return "1" === (r[o.CONFIG.COMMON][o.CONFIG.CCPA_CONSENT] || o.CONFIG.DEFAULT_CCPA_CONSENT)
    }, t.getCCPACmpApi = function() {
        return r[o.CONFIG.COMMON][o.CONFIG.CCPA_CMPAPI] || o.CONFIG.DEFAULT_CCPA_CMPAPI
    }, t.getCCPATimeout = function() {
        var e = r[o.CONFIG.COMMON][o.CONFIG.CCPA_TIMEOUT];
        return e ? window.parseInt(e) : o.CONFIG.DEFAULT_CCPA_TIMEOUT
    }, t.getSchainObject = function() {
        return r[o.CONFIG.COMMON][o.COMMON.SCHAINOBJECT] || {}
    }, t.isSchainEnabled = function() {
        return window.parseInt(r[o.CONFIG.COMMON][o.COMMON.SCHAIN]) || 0
    }, t.isFloorPriceModuleEnabled = function() {
        return 1 === window.parseInt(r[o.CONFIG.COMMON][o.CONFIG.FLOOR_PRICE_MODULE_ENABLED])
    }, t.getFloorSource = function() {
        return r[o.CONFIG.COMMON][o.CONFIG.FLOOR_SOURCE]
    }, t.getFloorJsonUrl = function() {
        return r[o.CONFIG.COMMON][o.CONFIG.FLOOR_JSON_URL]
    }, t.getFloorAuctionDelay = function() {
        var e = r[o.CONFIG.COMMON][o.CONFIG.FLOOR_AUCTION_DELAY];
        return e ? window.parseInt(e) : o.CONFIG.DEFAULT_FLOOR_AUCTION_DELAY
    }, t.getFloorType = function() {
        return !(!r[o.CONFIG.COMMON][o.CONFIG.FLOOR_ENFORCE_JS] || r[o.CONFIG.COMMON][o.CONFIG.FLOOR_ENFORCE_JS].toLowerCase() !== o.COMMON.HARD_FLOOR)
    }, t.isPrebidPubMaticAnalyticsEnabled = function() {
        return 1 === parseInt(r[o.CONFIG.COMMON][o.CONFIG.ENABLE_PB_PM_ANALYTICS])
    }, t.isUsePrebidKeysEnabled = function() {
        return 1 === parseInt(r[o.CONFIG.COMMON][o.CONFIG.USE_PREBID_KEYS])
    }, t.PBJS_NAMESPACE = r[o.CONFIG.COMMON][o.COMMON.PBJS_NAMESPACE] || "pbjs", t.isReduceCodeSizeFeatureEnabled = function() {
        return 1 === parseInt(r[o.CONFIG.COMMON][o.COMMON.REDUCE_CODE_SIZE])
    }, t.getPriceGranularity = function() {
        return r[o.CONFIG.COMMON][o.COMMON.PRICE_GRANULARITY] || null
    }, t.getGranularityMultiplier = function() {
        return parseFloat(r[o.CONFIG.COMMON][o.COMMON.GRANULARITY_MULTIPLIER]) || 1
    }, t.isAbTestEnabled = function() {
        return 1 === parseInt(r[o.CONFIG.COMMON][o.CONFIG.AB_TEST_ENABLED])
    }, t.getTestPWTConfig = function() {
        return r[o.COMMON.TEST_PWT] || {}
    }, t.getTestGroupDetails = function() {
        return r[o.COMMON.TEST_GROUP_DETAILS] || {}
    }, t.getTestPartnerConfig = function() {
        return r[o.COMMON.TEST_PARTNER] || {}
    }, t.getTestIdentityPartners = function() {
        return r[o.COMMON.TEST_IDENTITY_PARTNER] || {}
    }, t.updateABTestConfig = function() {
        if (i.isAbTestEnabled()) {
            var e = a.getRandomNumberBelow100(),
                t = i.getTestGroupDetails();
            t && t.testGroupSize && e < t.testGroupSize && (i.updatePWTConfig(), r.adapters = i.updatePartnerConfig(i.getTestPartnerConfig(), r.adapters), i.getTestIdentityPartners() && i.getIdentityPartners() && (Object.keys(i.getTestIdentityPartners()).length > 0 && 0 == Object.keys(i.getIdentityPartners()).length ? (a.log(o.MESSAGES.M31, JSON.stringify(i.getTestIdentityPartners())), r.identityPartners = i.getTestIdentityPartners()) : 0 == Object.keys(i.getTestIdentityPartners()).length && Object.keys(i.getIdentityPartners()).length > 0 ? (a.log(o.MESSAGES.M31, JSON.stringify({})), r.identityPartners = {}) : r.identityPartners = i.updatePartnerConfig(i.getTestIdentityPartners(), i.getIdentityPartners())), window.PWT.testGroupId = 1)
        }
    }, t.updatePWTConfig = function() {
        var e = i.getTestPWTConfig();
        if (e && Object.keys(e).length > 0)
            for (var t in a.log(o.MESSAGES.M30, JSON.stringify(e)), e) r[o.CONFIG.COMMON][t] && (r[o.CONFIG.COMMON][t] = e[t])
    }, t.updatePartnerConfig = function(e, t) {
        if (e && t && Object.keys(e).length > 0 && Object.keys(t).length > 0) {
            for (var n in a.log(o.MESSAGES.M31, JSON.stringify(e)), e) a.isOwnProperty(e, n) && a.isObject(e[n]) && (0 == Object.keys(e[n]).length && t[n] && Object.keys(t[n]).length > 0 ? e[n] = t[n] : Object.keys(e[n]).length > 0 && t[n] && Object.keys(t[n]).length > 0 && (e[n] = i.getMergedConfig(e[n], t[n])));
            return window.PWT.testGroupId = 1, e
        }
        return t
    }, t.getTestGroupDetails = function() {
        return r[o.COMMON.TEST_GROUP_DETAILS] || {}
    }, t.getMergedConfig = function(e, t) {
        for (var n in t) Object.prototype.hasOwnProperty.call(e, n) || (e[n] = a.isObject(t[n]) || a.isArray(t[n]) ? JSON.parse(JSON.stringify(t[n])) : t[n]);
        return e
    }, t.forEachBidderAlias = function(e) {
        a.forEachOnObject(r.alias, e)
    }, t.getAdapterNameForAlias = function(e) {
        return r.alias && r.alias[e] ? r.alias[e] && r.alias[e].name ? r.alias[e].name : r.alias[e] : e
    }, t.isSSOEnabled = function() {
        return 1 === parseInt(r[o.CONFIG.COMMON][o.CONFIG.SSO_ENABLED])
    }, t.getServerEnabledAdaptars = function() {
        return Object.keys(r.adapters).filter((function(e) {
            return "1" == r.adapters[e].serverSideEnabled ? e : void 0
        }))
    }, t.getTimeoutForPBSRequest = function() {
        var e = parseInt(r.pwt.ssTimeout),
            t = o.TIMEOUT_CONFIG.MaxTimeout,
            n = o.TIMEOUT_CONFIG.MinTimeout;
        return e >= n && t >= e ? e : e >= n ? t : n
    }, t.getPubMaticAndAlias = function(e) {
        return e.filter((function(e) {
            return r.alias && r.alias[e] && (r.alias[e].name ? r.alias[e].name.includes("pubmatic") : r.alias[e].includes("pubmatic")) || e.includes("pubmatic") ? e : void 0
        }))
    }, t.usePBSAdapter = function() {
        return "1" == r.pwt.usePBSAdapter
    }, t.createMacros = function() {
        return {
            "[PLATFORM]": a.getDevicePlatform().toString(),
            "[PROFILE_ID]": i.getProfileID().toString(),
            "[PROFILE_VERSION]": i.getProfileDisplayVersionID().toString()
        }
    }, t.getMarketplaceBidders = function() {
        return !!r.pwt.marketplaceBidders && r.pwt.marketplaceBidders.split(",")
    }, t.shouldClearTargeting = function() {
        return void 0 === window.PWT.shouldClearTargeting || Boolean(window.PWT.shouldClearTargeting)
    }
}), (function(e, t) {
    t.pwt = {
        pid: "12012",
        gcv: "227",
        pdvid: "4",
        pubid: "164074",
        dataURL: "t.pubmatic.com/wl?",
        winURL: "t.pubmatic.com/wt?",
        owv: "v28.0.0",
        pbv: "v8.30.0",
        usePBSAdapter: "0",
        reduceCodeSize: "1",
        metaDataPattern: 0,
        sendAllBids: "0",
        adserver: "DFP",
        gdpr: "0",
        cmp: 0,
        gdprTimeout: 0,
        awc: 0,
        platform: "display",
        refreshInterval: 0,
        priceGranularity: 0,
        adServerCurrency: 0,
        singleImpression: "1",
        identityEnabled: 0,
        identityConsumers: 0,
        ccpa: "0",
        ccpaCmpApi: 0,
        ccpaTimeout: 0,
        sChain: "0",
        sChainObj: 0,
        auTimeout: "2000",
        t: "2000",
        ssTimeout: 0,
        prebidObjName: 0,
        pubAnalyticsAdapter: "1",
        usePBJSKeys: "0",
        abTestEnabled: "0",
        testGroupSize: 0,
        testType: 0,
        granularityMultiplier: 0,
        floorPriceModuleEnabled: "0",
        floorSource: 0,
        floorAuctionDelay: 0,
        jsonUrl: 0,
        ssoEnabled: 0,
        autoRefreshAdslots: "0",
        videoAdDuration: 0,
        videoAdDurationMatching: 0,
        adPodConfiguration: 0,
        customPriceGranularityConfig: 0,
        marketplaceBidders: 0,
        owRedirectURL: 0,
        topicsFPDModule: 0,
        enableVastUnwrapper: 0,
        floorType: 0,
        pubId: 0,
        zone: 0,
        gdprActionTimeout: 0,
        pbGlobalVarNamespace: "owpbjs",
        owGlobalVarNamespace: "PWT",
        globalNamespaceType: "Default",
        localStorageAccess: "1",
        dealTierLineItemSetup: 0,
        dealIdLineItemSetup: 0
    }, t.adapters = {
        pubmatic: {
            publisherId: "164074",
            kgp: "_AU_@_W_x_H_:_AUI_",
            sk: "true",
            rev_share: "0.0",
            timeout: 0,
            throttle: "100",
            pt: 0,
            serverSideEnabled: "0",
            amp: 0,
            video: 0,
            "in-app": 0,
            display: 0
        }
    }, t.slotConfig = {
        configPattern: "_AU_",
        config: {
            "default": {
                banner: {
                    enabled: !0
                }
            },
            "/43743431/owfledge": {
                banner: {
                    enabled: !0
                },
                ortb2Imp: {
                    ext: {
                        ae: 1
                    }
                }
            }
        }
    }, t.identityPartners = {}, t.testConfigDetails = {}, t.test_pwt = {}
}), (function(e, t, n) {
    function i(e, t, n) {
        var i = "",
            o = 0,
            a = 0,
            s = d.METADATA_MACROS;
        c.forEachOnObject(t.adapters, (function(t, n) {
            "" != n.getLastBidID() && ("pubmaticServer" !== t && a++, c.forEachOnObject(n.bids, (function(t, n) {
                1 != n.getDefaultBidStatus() && 1 != n.getPostTimeoutStatus() && 0 != n.getGrossEcpm() && (o++, i += r(e, n))
            })))
        })), 0 == i.length && (i = e), i = (i = i.replace(new RegExp(s.BID_COUNT, "g"), o)).replace(new RegExp(s.PARTNER_COUNT, "g"), a), n[d.WRAPPER_TARGETING_KEYS.META_DATA] = encodeURIComponent(i)
    }

    function r(e, t) {
        var n = d.METADATA_MACROS;
        return e.replace(new RegExp(n.PARTNER, "g"), t.getAdapterID()).replace(new RegExp(n.WIDTH, "g"), t.getWidth()).replace(new RegExp(n.HEIGHT, "g"), t.getHeight()).replace(new RegExp(n.GROSS_ECPM, "g"), t.getGrossEcpm()).replace(new RegExp(n.NET_ECPM, "g"), t.getNetEcpm())
    }
    var o, a, s = n(2),
        d = n(0),
        c = n(1),
        u = n(9),
        l = this;
    const p = "PROFILE_AUCTION_INFO_",
        g = {
            img: 1,
            js: 2,
            1: "img",
            2: "js"
        };
    t.createBidEntry = function(e) {
        c.isOwnProperty(window.PWT.bidMap, e) || (window.PWT.bidMap[e] = u.createBMEntry(e))
    }, t.setSizes = function(e, t) {
        l.createBidEntry(e), window.PWT.bidMap[e].setSizes(t)
    }, t.setCallInitTime = function(e, t) {
        l.createBidEntry(e), window.PWT.bidMap[e].setAdapterEntry(t)
    }, t.setAllPossibleBidsReceived = function(e) {
        window.PWT.bidMap[e].setAllPossibleBidsReceived()
    }, t.setBidFromBidder = function(e, t) {
        var n = t.getAdapterID(),
            i = (t.getBidID(), window.PWT.bidMap[e]);
        if (c.isOwnProperty(window.PWT.bidMap, e)) {
            var r = i.getCreationTime() + s.getTimeout() < t.getReceivedTime(),
                o = t.getReceivedTime() - i.getCreationTime();
            l.createBidEntry(e), c.log("BdManagerSetBid: divID: " + e + ", bidderID: " + n + ", ecpm: " + t.getGrossEcpm() + ", size: " + t.getWidth() + "x" + t.getHeight() + ", postTimeout: " + r + ", defaultBid: " + t.getDefaultBidStatus()), !0 === r && t.setPostTimeoutStatus();
            var a = i.getLastBidIDForAdapter(n);
            if ("" != a) {
                var u = i.getBid(n, a),
                    p = 1 === u.getDefaultBidStatus(),
                    g = -1 === u.getDefaultBidStatus();
                p || !r || g ? (p && c.log(d.MESSAGES.M23 + n), p || u.getNetEcpm() < t.getNetEcpm() || g ? (c.log(d.MESSAGES.M12 + u.getNetEcpm() + d.MESSAGES.M13 + t.getNetEcpm() + d.MESSAGES.M14 + n), l.storeBidInBidMap(e, n, t, o)) : c.log(d.MESSAGES.M12 + u.getNetEcpm() + d.MESSAGES.M15 + t.getNetEcpm() + d.MESSAGES.M16 + n)) : c.log(d.MESSAGES.M17)
            } else c.log(d.MESSAGES.M18 + n), l.storeBidInBidMap(e, n, t, o);
            r && setTimeout(window[d.COMMON.PREBID_NAMESPACE].triggerUserSyncs, 10)
        } else c.logWarning("BidManager is not expecting bid for " + e + ", from " + n)
    }, t.storeBidInBidMap = function(e, t, n, i) {
        window.PWT.bidMap[e].setNewBid(t, n), window.PWT.bidIdMap[n.getBidID()] = {
            s: e,
            a: t
        }, 0 === n.getDefaultBidStatus() && "pubmaticServer" !== n.adapterID && c.vLogInfo(e, {
            type: "bid",
            bidder: t + (0 !== s.getBidPassThroughStatus(t) ? "(Passthrough)" : ""),
            bidDetails: n,
            latency: i,
            s2s: s.isServerSideAdapter(t),
            adServerCurrency: c.getCurrencyToDisplay()
        })
    }, t.resetBid = function(e, t) {
        c.vLogInfo(e, {
            type: "hr"
        }), delete window.PWT.bidMap[e], l.createBidEntry(e), window.PWT.bidMap[e].setImpressionID(t)
    }, t.createMetaDataKey = i, t.replaceMetaDataMacros = r, t.auctionBids = function(e) {
        var t = null,
            n = {};
        return c.forEachOnObject(e.adapters, (function(e, i) {
            var r = l.auctionBidsCallBack(e, i, n, t);
            t = r.winningBid, n = r.keyValuePairs
        })), null !== s.getMataDataPattern() && i(s.getMataDataPattern(), e, n), {
            wb: t,
            kvp: n
        }
    }, t.updateNativeTargtingKeys = function(e) {
        for (var t in e) t.indexOf("native") >= 0 && 3 === t.split("_").length && delete e[t]
    }, t.auctionBidsCallBack = function(e, t, n, i) {
        var r = this;
        return "" != t.getLastBidID() ? (c.forEachOnObject(t.bids, (function(t, o) {
            if (!0 === o.getPostTimeoutStatus()) return {
                winningBid: i,
                keyValuePairs: n
            };
            if (1 !== o.getDefaultBidStatus() && 1 == s.getSendAllBidsStatus() && o.setSendAllBidsKeys(), null !== i)
                if (i.getNetEcpm() < o.getNetEcpm()) r.updateNativeTargtingKeys(n);
                else {
                    var a = o.getKeyValuePairs();
                    r.updateNativeTargtingKeys(a), o.keyValuePairs = a
                } return c.copyKeyValueObject(n, o.getKeyValuePairs()), 0 !== s.getBidPassThroughStatus(e) ? {
                winningBid: i,
                keyValuePairs: n
            } : ((null == i || i.getNetEcpm() < o.getNetEcpm()) && (i = o), void 0)
        })), {
            winningBid: i,
            keyValuePairs: n
        }) : {
            winningBid: i,
            keyValuePairs: n
        }
    }, t.getBid = function(e) {
        var t = null,
            n = null;
        if (c.isOwnProperty(window.PWT.bidMap, e)) {
            var i = l.auctionBids(window.PWT.bidMap[e]);
            t = i.wb, n = i.kvp, window.PWT.bidMap[e].setAnalyticEnabled(), t && t.getNetEcpm() > 0 ? (t.setStatus(1), t.setWinningBidStatus(), c.vLogInfo(e, {
                type: "win-bid",
                bidDetails: t,
                adServerCurrency: c.getCurrencyToDisplay()
            })) : c.vLogInfo(e, {
                type: "win-bid-fail"
            })
        }
        return {
            wb: t,
            kvp: n
        }
    }, t.getBidById = function(e) {
        if (!c.isOwnProperty(window.PWT.bidIdMap, e)) return c.log(d.MESSAGES.M25 + e), null;
        var t = window.PWT.bidIdMap[e].s,
            n = window.PWT.bidIdMap[e].a;
        if (c.isOwnProperty(window.PWT.bidMap, t)) {
            c.log("BidID: " + e + ", DivID: " + t + d.MESSAGES.M19 + n);
            var i = window.PWT.bidMap[t].getBid(n, e);
            return null == i ? null : {
                bid: i,
                slotid: t
            }
        }
        return c.log(d.MESSAGES.M25 + e), null
    }, t.displayCreative = function(e, t) {
        o = localStorage.getItem(p + window.location.hostname);
        var n = l.getBidById(t);
        if (n) {
            var i = n.bid,
                r = n.slotid;
            c.displayCreative(e, i), c.vLogInfo(r, {
                type: "disp",
                adapter: i.getAdapterID()
            }), l.executeMonetizationPixel(r, i);
            var a = JSON.parse(localStorage.getItem(p + window.location.hostname)) || {};
            null !== a && a.slotLevelFrquencyDepth && (a.slotLevelFrquencyDepth[a.codeAdUnitMap[r]].impressionServed = a.slotLevelFrquencyDepth[a.codeAdUnitMap[r]].impressionServed + 1, a.impressionServed = a.impressionServed + 1), localStorage.setItem(p + window.location.hostname, JSON.stringify(a))
        }
    }, t.executeAnalyticsPixel = function() {
        o = localStorage.getItem(p + window.location.hostname), a = null !== o ? JSON.parse(o) : {};
        var e = {
                s: []
            },
            t = s.getPublisherId(),
            n = s.getAnalyticsPixelURL(),
            i = {};
        n && (n = d.COMMON.PROTOCOL + n + "pubid=" + t, e[d.CONFIG.PUBLISHER_ID] = s.getPublisherId(), e[d.LOGGER_PIXEL_PARAMS.TIMEOUT] = "" + s.getTimeout(), e[d.LOGGER_PIXEL_PARAMS.PAGE_URL] = window.decodeURIComponent(c.metaInfo.pageURL), e[d.LOGGER_PIXEL_PARAMS.PAGE_DOMAIN] = c.metaInfo.pageDomain, e[d.LOGGER_PIXEL_PARAMS.TIMESTAMP] = c.getCurrentTimestamp(), e[d.CONFIG.PROFILE_ID] = s.getProfileID(), e[d.CONFIG.PROFILE_VERSION_ID] = s.getProfileDisplayVersionID(), e.ih = s.isUserIdModuleEnabled() ? 1 : 0, e.bm = l.getBrowser(), e.tgid = c.getTgid(), Object.keys(a).length && (e.tpv = a.pageView, e.trc = a.slotCnt, e.tbs = a.bidServed, e.tis = a.impressionServed, e.lip = a.lip), window.PWT.CC && window.PWT.CC.cc && (e.ctr = window.PWT.CC.cc), c.forEachOnObject(window.PWT.bidMap, (function(e, t) {
            l.analyticalPixelCallback(e, t, i)
        })), c.forEachOnObject(i, (function(t, i) {
            if (i.length > 0) {
                if (e.s = i, e[d.COMMON.IMPRESSION_ID] = window.encodeURIComponent(t), s.isFloorPriceModuleEnabled()) {
                    var r = window.PWT.floorData[e[d.COMMON.IMPRESSION_ID]];
                    e.fmv = r.floorRequestData && r.floorRequestData.modelVersion || void 0, e.ft = r.floorResponseData ? 0 == r.floorResponseData.enforcements.enforceJS ? 0 : 1 : void 0
                }
                e.psl = i.psl, e.dvc = {
                    plt: c.getDevicePlatform()
                }, c.ajaxRequest(n, (function() {}), "json=" + window.encodeURIComponent(JSON.stringify(e)), {
                    contentType: "application/x-www-form-urlencoded",
                    withCredentials: !0
                })
            }
        })))
    }, t.executeMonetizationPixel = function(e, t) {
        var n = c.generateMonetizationPixel(e, t);
        n && l.setImageSrcToPixelURL(n)
    }, t.getAdUnitSizes = function(e) {
        return Object.keys(e.adapters).filter((function(t) {
            return 1 == Object.keys(e.adapters[t].bids).filter((function(n) {
                return e.adapters[t].bids[n].isWinningBid && "native" === e.adapters[t].bids[n].adFormat ? e.adapters[t].bids[n] : void 0
            })).length ? t : void 0
        })).length ? ["1x1"] : e.getSizes()
    }, t.getAdUnitInfo = function(e) {
        return window.PWT.adUnits[e] || e
    }, t.getAdUnitAdFormats = function(e) {
        return (e ? Object.keys(e).map((function(e) {
            return d.MEDIATYPE[e.toUpperCase()]
        })).filter((function(e) {
            return null != e
        })) : []) || []
    }, t.getSlotLevelFrequencyDepth = function(e, t, n) {
        var i;
        return Object.keys(e).length && e.slotLevelFrquencyDepth && (i = e.slotLevelFrquencyDepth[n] && e.slotLevelFrquencyDepth[n][t]), i
    }, t.getMetadata = function(e) {
        if (e && !c.isEmptyObject(e)) {
            const t = {};
            return e.networkId && (t.nwid = e.networkId), e.advertiserId && (t.adid = e.advertiserId), e.networkName && (t.nwnm = e.networkName), e.primaryCatId && (t.pcid = e.primaryCatId), e.advertiserName && (t.adnm = e.advertiserName), e.agencyId && (t.agid = e.agencyId), e.agencyName && (t.agnm = e.agencyName), e.brandId && (t.brid = e.brandId), e.brandName && (t.brnm = e.brandName), e.dchain && (t.dc = e.dchain), e.demandSource && (t.ds = e.demandSource), e.secondaryCatIds && (t.scids = e.secondaryCatIds), c.isEmptyObject(t) ? void 0 : t
        }
    }, t.analyticalPixelCallback = function(e, t, n) {
        var i = null !== (o = localStorage.getItem(p + window.location.hostname)) ? JSON.parse(o) : {},
            r = s.usePBSAdapter(),
            a = t.getCreationTime() || 0,
            u = r && window.pbsLatency ? 0 : void 0,
            g = t.getImpressionID(),
            f = l.getAdUnitInfo(e),
            m = {};
        if (t.getAnalyticEnabledStatus() && !t.getExpiredStatus()) {
            var E = {
                sn: e,
                sz: l.getAdUnitSizes(t),
                au: f.adUnitId || e,
                fskp: window.PWT.floorData && window.PWT.floorData[g] && window.PWT.floorData[g].floorRequestData ? 0 == window.PWT.floorData[g].floorRequestData.skipped ? 0 : 1 : void 0,
                mt: l.getAdUnitAdFormats(f.mediaTypes),
                ps: [],
                bs: l.getSlotLevelFrequencyDepth(i, "bidServed", f.adUnitId),
                is: l.getSlotLevelFrequencyDepth(i, "impressionServed", f.adUnitId),
                rc: l.getSlotLevelFrequencyDepth(i, "slotCnt", f.adUnitId),
                vw: i && i.viewedSlot && i.viewedSlot[f.adUnitId],
                rf: window.PWT.newAdUnits && window.PWT.newAdUnits[g] && window.PWT.newAdUnits[g][e] && window.PWT.newAdUnits[g][e].pubmaticAutoRefresh && window.PWT.newAdUnits[g][e].pubmaticAutoRefresh.isRefreshed ? 1 : 0
            };
            t.setExpired(), n[g] = n[g] || [], c.forEachOnObject(t.adapters, (function(e, t) {
                1 != s.getBidPassThroughStatus(e) && c.forEachOnObject(t.bids, (function(t, n) {
                    r && ((m = window.pbsLatency && window.pbsLatency[g]) && m.endTime && m.startTime && (u = m.endTime - m.startTime), (("pubmatic" === e || "pubmatic2" === e) && c.isOwnProperty(window.partnersWithoutErrorAndBids, g) && window.partnersWithoutErrorAndBids[g].includes(e) || c.isOwnProperty(window.partnersWithoutErrorAndBids, g) && window.partnersWithoutErrorAndBids[g].includes(e) && s.getAdapterNameForAlias(e).includes("pubmatic")) && (n.defaultBid = 0));
                    var i = n.getReceivedTime();
                    if ("pubmaticServer" === e) return c.isOwnProperty(window.PWT.owLatency, g) && c.isOwnProperty(window.PWT.owLatency[g], "startTime") && c.isOwnProperty(window.PWT.owLatency[g], "endTime") ? u = window.PWT.owLatency[g].endTime - window.PWT.owLatency[g].startTime : (u = 0, c.log("Logging pubmaticServer latency as 0 for impressionID: " + g)), void c.log("PSL logging: time logged for id " + g + " is " + u);
                    if ((1 != s.getAdapterMaskBidsStatus(e) || !1 !== n.getWinningBidStatus()) && !(n.getServerSideStatus() && -1 === n.getDefaultBidStatus() && -1 === n.getServerSideResponseTime() || ("pubmatic" === e || "pubmatic2" === e) && (n.getDefaultBidStatus() || n.getPostTimeoutStatus() && 0 == n.getGrossEcpm(!0)))) {
                        var o = n.getPbBid(),
                            p = n.getServerSideStatus() ? n.getServerSideResponseTime() : i - a,
                            f = o && o.timeToRespond || p;
                        f = f > s.getTimeout() + 100 ? s.getTimeout() + 100 : f, E.ps.push({
                            pn: s.getAdapterNameForAlias(e),
                            bc: e,
                            bidid: o && o.prebidBidId ? o.prebidBidId : t,
                            origbidid: t,
                            db: n.getDefaultBidStatus(),
                            kgpv: n.getKGPV(),
                            kgpsv: n.getKGPV(!0),
                            psz: n.getWidth() + "x" + n.getHeight(),
                            eg: n.getGrossEcpm(!0),
                            en: n.getNetEcpm(!0),
                            di: n.getDealID() || "-1",
                            dc: n.getDealChannel(),
                            l1: f,
                            ol1: p,
                            l2: 0,
                            adv: o && c.getAdDomain(o) || void 0,
                            ss: n.getServerSideStatus(),
                            t: !1 === n.getPostTimeoutStatus() ? 0 : 1,
                            wb: !0 === n.getWinningBidStatus() ? 1 : 0,
                            mi: n.getServerSideStatus() ? n.getMi(e) : void 0,
                            af: n.getAdFormat(),
                            ocpm: s.getAdServerCurrency() ? n.getOriginalCpm() : n.getGrossEcpm(),
                            ocry: s.getAdServerCurrency() ? n.getOriginalCurrency() : d.COMMON.ANALYTICS_CURRENCY,
                            piid: n.getsspID(),
                            frv: n.getServerSideStatus() ? void 0 : o && o.floorData ? o.floorData.floorRuleValue : void 0,
                            md: o ? l.getMetadata(o.meta) : void 0
                        })
                    }
                }))
            })), n[g].push(E), r && s.getServerEnabledAdaptars().length && null == u && !window.pbsLatency && (u = 0), void 0 !== u && (n[g].psl = u)
        }
    }, t.setImageSrcToPixelURL = function(e, t) {
        var n = new window.Image;
        null == t || t ? (String(e).trim().substring(0, 8) != d.COMMON.PROTOCOL && (e = d.COMMON.PROTOCOL + e), n.src = e) : n.src = e
    }, t.getAllPartnersBidStatuses = function(e, t) {
        var n = !0;
        return c.forEachOnArray(t, (function(t, i) {
            e[i] && (n = n && !0 === e[i].hasAllPossibleBidsReceived())
        })), n
    }, t.loadTrackers = function(e) {
        var t = c.getBidFromEvent(e);
        window.parent.postMessage(JSON.stringify({
            pwt_type: "3",
            pwt_bidID: t,
            pwt_origin: d.COMMON.PROTOCOL + window.location.hostname,
            pwt_action: "click"
        }), "*")
    }, t.executeTracker = function(e) {
        window.parent.postMessage(JSON.stringify({
            pwt_type: "3",
            pwt_bidID: e,
            pwt_origin: d.COMMON.PROTOCOL + window.location.hostname,
            pwt_action: "imptrackers"
        }), "*")
    }, t.fireTracker = function(e, t) {
        var n;
        if ("click" === t) n = e.native && e.native.ortb && e.native.ortb.link && e.native.ortb.link.clickTrackers;
        else if ("imptrackers" === t) {
            const t = e.native.ortb || e.native,
                i = (t.eventtrackers || []).filter((function(e) {
                    e.event
                })),
                r = {
                    img: [],
                    js: []
                };
            i.forEach((function(e) {
                g.hasOwnProperty(e.method) && r[g[e.method]].push(e.url)
            })), 0 == r.img.length && t.imptrackers && (r.img = r.img.concat(t.imptrackers)), n = r.img, 0 == r.js.length && t.jstracker && (r.js = r.js.concat([t.jstracker])), r.js.length && c.insertHtmlIntoIframe(r.js.join("\n"))
        }(n || []).forEach((function(e) {
            l.setImageSrcToPixelURL(e, !1)
        }))
    }, t.setStandardKeys = function(e, t) {
        if (e) {
            t[d.WRAPPER_TARGETING_KEYS.BID_ID] = e.getBidID(), t[d.WRAPPER_TARGETING_KEYS.BID_STATUS] = e.getStatus(), t[d.WRAPPER_TARGETING_KEYS.BID_ECPM] = e.getNetEcpm().toFixed(d.COMMON.BID_PRECISION);
            var n = e.getDealID();
            n && (t[d.WRAPPER_TARGETING_KEYS.BID_DEAL_ID] = n), t[d.WRAPPER_TARGETING_KEYS.BID_ADAPTER_ID] = e.getAdapterID(), t[d.WRAPPER_TARGETING_KEYS.PUBLISHER_ID] = s.getPublisherId(), t[d.WRAPPER_TARGETING_KEYS.PROFILE_ID] = s.getProfileID(), t[d.WRAPPER_TARGETING_KEYS.PROFILE_VERSION_ID] = s.getProfileDisplayVersionID(), t[d.WRAPPER_TARGETING_KEYS.BID_SIZE] = e.width + "x" + e.height, t[d.WRAPPER_TARGETING_KEYS.PLATFORM_KEY] = e.getAdFormat() == d.FORMAT_VALUES.VIDEO && e.getcacheUUID() ? d.PLATFORM_VALUES.VIDEO : e.getNative() ? d.PLATFORM_VALUES.NATIVE : d.PLATFORM_VALUES.DISPLAY, e.getAdFormat() == d.FORMAT_VALUES.VIDEO && e.getcacheUUID() && (t[d.WRAPPER_TARGETING_KEYS.CACHE_PATH] = d.CONFIG.CACHE_PATH, t[d.WRAPPER_TARGETING_KEYS.CACHE_URL] = d.CONFIG.CACHE_URL, t[d.WRAPPER_TARGETING_KEYS.CACHE_ID] = e.getcacheUUID())
        } else c.logWarning("Not generating key-value pairs as invalid winningBid object passed. WinningBid: "), c.logWarning(e)
    }, t.getBrowser = function() {
        var e = d.REGEX_BROWSERS,
            t = d.BROWSER_MAPPING,
            n = navigator.userAgent,
            i = null == n ? -1 : 0;
        if (n)
            for (var r = 0; r < e.length; r++)
                if (n.match(e[r])) {
                    i = t[r];
                    break
                } return i
    }
}), (function(e, t, n) {
    function i(e, t) {
        this.adapterID = e, this.kgpv = t, this.bidID = a.getUniqueIdentifierStr(), this.grossEcpm = 0, this.netEcpm = 0, this.defaultBid = 0, this.adHtml = "", this.adUrl = "", this.height = 0, this.width = 0, this.creativeID = "", this.keyValuePairs = {}, this.isPostTimeout = !1, this.receivedTime = 0, this.isServerSide = r.isServerSideAdapter(e) ? 1 : 0, this.dealID = "", this.dealChannel = "", this.isWinningBid = !1, this.status = 0, this.serverSideResponseTime = 0, this.mi = void 0, this.originalCpm = 0, this.originalCurrency = "", this.analyticsGrossCpm = 0, this.analyticsNetCpm = 0, this.native = void 0, this.adFormat = void 0, this.regexPattern = void 0, this.cacheUUID = void 0, this.sspID = "", this.vastUrl = void 0, this.vastCache = void 0, this.renderer = void 0, this.pbBid = void 0
    }
    var r = n(2),
        o = n(0),
        a = n(1),
        s = function(e, t) {
            return window.parseFloat((e * r.getAdapterRevShare(t)).toFixed(o.COMMON.BID_PRECISION))
        };
    i.prototype.setServerSideResponseTime = function(e) {
        this.serverSideResponseTime = e
    }, i.prototype.getServerSideResponseTime = function() {
        return this.serverSideResponseTime
    }, i.prototype.getServerSideStatus = function() {
        return this.isServerSide
    }, i.prototype.setServerSideStatus = function(e) {
        this.isServerSide = e
    }, i.prototype.getAdapterID = function() {
        return this.adapterID
    }, i.prototype.getBidID = function() {
        return this.bidID
    }, i.prototype.setGrossEcpm = function(e, t, n, i) {
        if (null === e) return a.log(o.MESSAGES.M10), a.log(this), this;
        if (a.isString(e)) {
            if (0 === (e = e.replace(/\s/g, "")).length) return a.log(o.MESSAGES.M20), a.log(this), this;
            e = window.parseFloat(e)
        }
        return window.isNaN(e) ? (a.log(o.MESSAGES.M11 + e), a.log(this), this) : (r.getAdServerCurrency() && t && n && (a.isFunction(window[o.COMMON.PREBID_NAMESPACE].convertCurrency) || "function" == typeof window[o.COMMON.PREBID_NAMESPACE].convertCurrency) && (e = window[o.COMMON.PREBID_NAMESPACE].convertCurrency(e, t, n)), e = window.parseFloat(e.toFixed(o.COMMON.BID_PRECISION)), this.grossEcpm = e, this.netEcpm = i == o.BID_STATUS.BID_REJECTED ? 0 : s(this.grossEcpm, this.getAdapterID()), this)
    }, i.prototype.getGrossEcpm = function(e) {
        return r.getAdServerCurrency() && this.analyticsGrossCpm && e ? this.analyticsGrossCpm : this.grossEcpm
    }, i.prototype.getNetEcpm = function(e) {
        return r.getAdServerCurrency() && this.analyticsNetCpm && e ? this.analyticsNetCpm : this.netEcpm
    }, i.prototype.setDefaultBidStatus = function(e) {
        return this.defaultBid = e, this
    }, i.prototype.getDefaultBidStatus = function() {
        return this.defaultBid
    }, i.prototype.setAdHtml = function(e) {
        return this.adHtml = e, this.setAdFormat(e), this
    }, i.prototype.getAdHtml = function() {
        return this.adHtml
    }, i.prototype.setAdUrl = function(e) {
        return this.adUrl = e, this
    }, i.prototype.getAdUrl = function() {
        return this.adUrl
    }, i.prototype.setHeight = function(e) {
        return this.height = e, this
    }, i.prototype.getHeight = function() {
        return this.height
    }, i.prototype.setWidth = function(e) {
        return this.width = e, this
    }, i.prototype.getWidth = function() {
        return this.width
    }, i.prototype.getKGPV = function(e, t) {
        return !e && this.regexPattern ? this.regexPattern : this.adFormat == o.FORMAT_VALUES.VIDEO || t == o.FORMAT_VALUES.VIDEO ? a.getUpdatedKGPVForVideo(this.kgpv, o.FORMAT_VALUES.VIDEO) : this.kgpv
    }, i.prototype.setKeyValuePair = function(e, t) {
        return this.keyValuePairs[e.substr(0, 20)] = t, this
    }, i.prototype.getKeyValuePairs = function() {
        return this.keyValuePairs
    }, i.prototype.setPostTimeoutStatus = function() {
        return this.isPostTimeout = !0, this
    }, i.prototype.getPostTimeoutStatus = function() {
        return this.isPostTimeout
    }, i.prototype.setReceivedTime = function(e) {
        return this.receivedTime = e, this
    }, i.prototype.getReceivedTime = function() {
        return this.receivedTime
    }, i.prototype.setDealID = function(e) {
        return e && (this.dealID = e, this.dealChannel = this.dealChannel || "PMP", this.setKeyValuePair(o.COMMON.DEAL_KEY_FIRST_PART + this.adapterID, this.dealChannel + o.COMMON.DEAL_KEY_VALUE_SEPARATOR + this.dealID + o.COMMON.DEAL_KEY_VALUE_SEPARATOR + this.bidID)), this
    }, i.prototype.getDealID = function() {
        return this.dealID
    }, i.prototype.setDealChannel = function(e) {
        return this.dealID && e && (this.dealChannel = e, this.setKeyValuePair(o.COMMON.DEAL_KEY_FIRST_PART + this.adapterID, this.dealChannel + o.COMMON.DEAL_KEY_VALUE_SEPARATOR + this.dealID + o.COMMON.DEAL_KEY_VALUE_SEPARATOR + this.bidID)), this
    }, i.prototype.getDealChannel = function() {
        return this.dealChannel
    }, i.prototype.setWinningBidStatus = function() {
        return this.isWinningBid = !0, this
    }, i.prototype.getWinningBidStatus = function() {
        return this.isWinningBid
    }, i.prototype.setStatus = function(e) {
        return this.status = e, this
    }, i.prototype.getStatus = function() {
        return this.status
    }, i.prototype.setSendAllBidsKeys = function() {
        if (this.setKeyValuePair(o.WRAPPER_TARGETING_KEYS.BID_ID + "_" + this.adapterID, this.bidID), this.setKeyValuePair(o.WRAPPER_TARGETING_KEYS.BID_STATUS + "_" + this.adapterID, this.getNetEcpm() > 0 ? 1 : 0), this.setKeyValuePair(o.WRAPPER_TARGETING_KEYS.BID_ECPM + "_" + this.adapterID, this.getNetEcpm().toFixed(o.COMMON.BID_PRECISION)), this.setKeyValuePair(o.WRAPPER_TARGETING_KEYS.BID_SIZE + "_" + this.adapterID, this.width + "x" + this.height), this.native) {
            var e = this.keyValuePairs,
                t = this;
            a.forEachOnObject(e, (function(e, n) {
                e.indexOf("native") >= 0 && t.setKeyValuePair(e + "_" + t.adapterID, n)
            }))
        }
    }, i.prototype.setMi = function(e) {
        return this.mi = e, this
    }, i.prototype.getMi = function(e) {
        return a.isUndefined(this.mi) && (this.mi = window.matchedimpressions && window.matchedimpressions[e]), this.mi
    }, i.prototype.setOriginalCpm = function(e) {
        return this.originalCpm = window.parseFloat(e.toFixed(o.COMMON.BID_PRECISION)), this
    }, i.prototype.getOriginalCpm = function() {
        return this.originalCpm
    }, i.prototype.setOriginalCurrency = function(e) {
        return this.originalCurrency = e, this
    }, i.prototype.getOriginalCurrency = function() {
        return this.originalCurrency
    }, i.prototype.setAnalyticsCpm = function(e, t) {
        return this.analyticsGrossCpm = window.parseFloat(e.toFixed(o.COMMON.BID_PRECISION)), this.analyticsNetCpm = t == o.BID_STATUS.BID_REJECTED ? 0 : s(this.analyticsGrossCpm, this.getAdapterID()), this
    }, i.prototype.getAnalyticsCpm = function() {
        return this.analyticsGrossCpm
    }, i.prototype.getNative = function() {
        return this.native
    }, i.prototype.setNative = function(e) {
        return this.native = e, this
    }, i.prototype.getAdFormat = function() {
        return this.adFormat
    }, i.prototype.setAdFormat = function(e, t) {
        return this.adFormat = t || a.getAdFormatFromBidAd(e), this
    }, i.prototype.getRegexPattern = function() {
        return this.regexPattern
    }, i.prototype.setRegexPattern = function(e) {
        return this.regexPattern = e, this
    }, i.prototype.getcacheUUID = function() {
        return this.cacheUUID
    }, i.prototype.setcacheUUID = function(e) {
        return this.cacheUUID = e, this.adFormat || (this.adFormat = o.FORMAT_VALUES.VIDEO), this
    }, i.prototype.getsspID = function() {
        return this.sspID
    }, i.prototype.setsspID = function(e) {
        return this.sspID = e, this
    }, i.prototype.setRenderer = function(e) {
        return a.isEmptyObject(e) || (this.renderer = e), this
    }, i.prototype.getRenderer = function() {
        return this.renderer
    }, i.prototype.setVastCache = function(e) {
        return a.isString(e) && (this.vastCache = e), this
    }, i.prototype.getVastCache = function() {
        return this.vastCache
    }, i.prototype.setVastUrl = function(e) {
        return a.isString(e) && (this.vastUrl = e), this
    }, i.prototype.getVastUrl = function() {
        return this.vastUrl
    }, i.prototype.setVastXml = function(e) {
        return a.isString(e) && (this.vastXml = e), this
    }, i.prototype.getVastXml = function() {
        return this.vastXml
    }, i.prototype.setPbBid = function(e) {
        return this.pbbid = e, this
    }, i.prototype.getPbBid = function() {
        return this.pbbid
    }, i.prototype.updateBidId = function(e) {
        if (window.PWT.bidMap[e] && window.PWT.bidMap[e].adapters && Object.keys(window.PWT.bidMap[e].adapters).length > 0) {
            var t = window.PWT.bidMap[e].adapters[this.adapterID].bids[Object.keys(window.PWT.bidMap[e].adapters[this.adapterID].bids)[0]].bidID;
            t && this.adFormat == o.FORMAT_VALUES.VIDEO && (this.bidID = t)
        } else a.logWarning("Error in Updating BidId. It might be possible singleImpressionEnabled is false"), console.warn("Setup for video might not be correct. Try setting up Optimize MultiSize AdSlot to true.");
        return this
    }, e.exports.Bid = i, t.createBid = function(e, t) {
        return new i(e, t)
    }
}), (function(e, t, n) {
    var i = n(3),
        r = n(0);
    t.getGdprActionTimeout = function() {
        var e = i[r.CONFIG.COMMON][r.CONFIG.GDPR_ACTION_TIMEOUT];
        return e ? window.parseInt(e) : 0
    }
}), (function(e, t, n) {
    var i = n(3),
        r = n(0);
    this[r.COMMON.OWVERSION] = i[r.CONFIG.COMMON][r.COMMON.OWVERSION], this[r.COMMON.PBVERSION] = i[r.CONFIG.COMMON][r.COMMON.PBVERSION], t.getGdpr = function() {
        return "1" === (i[r.CONFIG.COMMON][r.CONFIG.GDPR_CONSENT] || r.CONFIG.DEFAULT_GDPR_CONSENT)
    }, t.getCmpApi = function() {
        return i[r.CONFIG.COMMON][r.CONFIG.GDPR_CMPAPI] || r.CONFIG.DEFAULT_GDPR_CMPAPI
    }, t.getGdprTimeout = function() {
        var e = i[r.CONFIG.COMMON][r.CONFIG.GDPR_TIMEOUT];
        return e ? window.parseInt(e) : r.CONFIG.DEFAULT_GDPR_TIMEOUT
    }, t.getAwc = function() {
        return "1" === (i[r.CONFIG.COMMON][r.CONFIG.GDPR_AWC] || r.CONFIG.DEFAULT_GDPR_AWC)
    }, t.isUserIdModuleEnabled = function() {
        return parseInt(i[r.CONFIG.COMMON][r.COMMON.ENABLE_USER_ID] || r.CONFIG.DEFAULT_USER_ID_MODULE)
    }, t.getIdentityPartners = function() {
        return i[r.COMMON.IDENTITY_PARTNERS]
    }, t.isIdentityOnly = function() {
        return parseInt(i[r.CONFIG.COMMON][r.COMMON.IDENTITY_ONLY] || r.CONFIG.DEFAULT_IDENTITY_ONLY)
    }, t.getIdentityConsumers = function() {
        return (i[r.CONFIG.COMMON][r.COMMON.IDENTITY_CONSUMERS] || "").toLowerCase()
    }, t.getCCPA = function() {
        return "1" === (i[r.CONFIG.COMMON][r.CONFIG.CCPA_CONSENT] || r.CONFIG.DEFAULT_CCPA_CONSENT)
    }, t.getCCPACmpApi = function() {
        return i[r.CONFIG.COMMON][r.CONFIG.CCPA_CMPAPI] || r.CONFIG.DEFAULT_CCPA_CMPAPI
    }, t.getCCPATimeout = function() {
        var e = i[r.CONFIG.COMMON][r.CONFIG.CCPA_TIMEOUT];
        return e ? window.parseInt(e) : r.CONFIG.DEFAULT_CCPA_TIMEOUT
    }, t.getProfileID = function() {
        return i.pwt[r.CONFIG.PROFILE_ID] || "0"
    }, t.getProfileDisplayVersionID = function() {
        return i.pwt[r.CONFIG.PROFILE_VERSION_ID] || "0"
    }, t.isSSOEnabled = function() {
        return 1 === parseInt(i[r.CONFIG.COMMON][r.CONFIG.SSO_ENABLED])
    }, t.getPublisherId = function() {
        return i.pwt[r.CONFIG.PUBLISHER_ID] || "0"
    }, t.isPubMaticIHAnalyticsEnabled = function() {
        var e = parseInt(i[r.CONFIG.COMMON][r.CONFIG.ENABLE_PB_IH_ANALYTICS]);
        return isNaN(e) ? 1 : e
    }, t.getIHAnalyticsAdapterExpiry = function() {
        return parseInt(i[r.CONFIG.COMMON][r.COMMON.IH_ANALYTICS_ADAPTER_EXPIRY]) || r.COMMON.IH_ANALYTICS_ADAPTER_DEFAULT_EXPIRY
    }, t.PBJS_NAMESPACE = i[r.CONFIG.COMMON][r.COMMON.PBJS_NAMESPACE] || "pbjs"
}), (function(e, t, n) {
    var i = n(1),
        r = n(11),
        o = n(4),
        a = n(0),
        s = n(2),
        d = n(16),
        c = n(3),
        u = i.getMetaInfo(window);
    window.PWT = window.PWT || {}, window.PWT.bidMap = window.PWT.bidMap || {}, window.PWT.bidIdMap = window.PWT.bidIdMap || {}, window.PWT.adUnits = window.PWT.adUnits || {}, window.PWT.floorData = window.PWT.floorData || {}, window.PWT.isIframe = window.PWT.isIframe || u.isInIframe, window.PWT.protocol = window.PWT.protocol || u.protocol, window.PWT.secure = window.PWT.secure || u.secure, window.PWT.pageURL = window.PWT.pageURL || u.pageURL, window.PWT.refURL = window.PWT.refURL || u.refURL, window.PWT.isSafeFrame = window.PWT.isSafeFrame || !1, window.PWT.safeFrameMessageListenerAdded = window.PWT.safeFrameMessageListenerAdded || !1, window.PWT.isSyncAuction = window.PWT.isSyncAuction || !1, window.PWT.shouldClearTargeting = void 0 === window.PWT.shouldClearTargeting || Boolean(window.PWT.shouldClearTargeting), window.PWT.udpv = window.PWT.udpv || i.findQueryParamInURL(u.isIframe ? u.refURL : u.pageURL, "pwtv"), i.findQueryParamInURL(u.isIframe ? u.refURL : u.pageURL, "pwtc") && i.enableDebugLog(), i.findQueryParamInURL(u.isIframe ? u.refURL : u.pageURL, "pwtvc") && i.enableVisualDebugLog();
    var l = s.isPrebidPubMaticAnalyticsEnabled();
    window.PWT.displayCreative = function(e, t) {
        i.log("In displayCreative for: " + t), l ? window[a.COMMON.PREBID_NAMESPACE].renderAd(e, t) : o.displayCreative(e, t)
    }, window.PWT.displayPMPCreative = function(e, t, n) {
        i.log("In displayPMPCreative for: " + t);
        var r = i.getBididForPMP(t, n);
        r && (l ? window[a.COMMON.PREBID_NAMESPACE].renderAd(e, r) : o.displayCreative(e, r))
    }, window.PWT.sfDisplayCreative = function(e, t) {
        i.log("In sfDisplayCreative for: " + t), d = window.ucTag || {}, this.isSafeFrame = !0, d = window.ucTag || {}, l ? d.renderAd(e, {
            adId: t,
            pubUrl: document.referrer
        }) : window.parent.postMessage(JSON.stringify({
            pwt_type: "1",
            pwt_bidID: t,
            pwt_origin: a.COMMON.PROTOCOL + window.location.hostname
        }), "*")
    }, window.PWT.sfDisplayPMPCreative = function(e, t, n) {
        i.log("In sfDisplayPMPCreative for: " + t), this.isSafeFrame = !0, d = window.ucTag || {};
        var r = i.getBididForPMP(t, n);
        r && (s.isPrebidPubMaticAnalyticsEnabled() ? d.renderAd(e, {
            adId: r,
            pubUrl: document.referrer
        }) : window.parent.postMessage(JSON.stringify({
            pwt_type: "1",
            pwt_bidID: r,
            pwt_origin: a.COMMON.PROTOCOL + window.location.hostname
        }), "*"))
    }, window.PWT.initNativeTrackers = function(e, t) {
        i.log("In startTrackers for: " + t), i.addEventListenerForClass(window, "click", a.COMMON.OW_CLICK_NATIVE, o.loadTrackers), o.executeTracker(t)
    }, window.PWT.getUserIds = function() {
        return i.getUserIds()
    }, window.OWT = {
        notifyCount: 0,
        externalBidderStatuses: {}
    }, window.OWT.registerExternalBidders = function(e) {
        return window.OWT.notifyCount++, i.forEachOnArray(e, (function(e, t) {
            i.log("registerExternalBidders: " + t), window.OWT.externalBidderStatuses[t] = {
                id: window.OWT.notifyCount,
                status: !1
            }
        })), window.OWT.notifyCount
    }, window.OWT.notifyExternalBiddingComplete = function(e) {
        i.forEachOnObject(window.OWT.externalBidderStatuses, (function(t, n) {
            n && n.id === e && (i.log("notify externalBidding complete: " + t), window.OWT.externalBidderStatuses[t] = {
                id: n.id,
                status: !0
            })
        }))
    }, window.PWT.UpdateVastWithTracker = function(e, t) {
        return i.UpdateVastWithTracker(e, t)
    }, window.PWT.generateDFPURL = function(e, t) {
        e && i.isObject(e) || i.logError("An AdUnit should be an Object", e), e.bidData && e.bidData.wb && e.bidData.kvp ? (e.bid = e.bidData.wb, e.bid.adserverTargeting = e.bidData.kvp) : i.logWarning("No bid found for given adUnit"), i.getCDSTargetingData(t);
        var n = {
            adUnit: e,
            params: {
                iu: e.adUnitId,
                cust_params: t,
                output: "vast"
            }
        };
        return e.bid && (n.bid = e.bid), window.owpbjs.adServers.dfp.buildVideoUrl(n)
    }, window.PWT.getCustomParamsForDFPVideo = function(e, t) {
        return i.getCustomParamsForDFPVideo(e, t)
    }, window.PWT.setAuctionTimeout = function(e) {
        isNaN(e) || (i.log("updating aution timeout from: " + c.pwt.t + " to: " + e), c.pwt.t = e)
    }, window.PWT.versionDetails = i.getOWConfig(), window.PWT.getAdapterNameForAlias = s.getAdapterNameForAlias, window.PWT.browserMapping = o.getBrowser(), r.init(window)
}), (function(e, t, n) {
    function i(e) {
        this.name = e, this.sizes = [], this.adapters = {}, this.creationTime = o.getCurrentTimestampInMs(), this.impressionID = "", this.analyticsEnabled = !1, this.expired = !1, this.allPossibleBidsReceived = !1
    }
    var r = n(0),
        o = n(1),
        a = n(10).AdapterEntry;
    i.prototype.setExpired = function() {
        return this.expired = !0, this
    }, i.prototype.getExpiredStatus = function() {
        return this.expired
    }, i.prototype.setAnalyticEnabled = function() {
        return this.analyticsEnabled = !0, this
    }, i.prototype.getAnalyticEnabledStatus = function() {
        return this.analyticsEnabled
    }, i.prototype.setNewBid = function(e, t) {
        o.isOwnProperty(this.adapters, e) || (this.adapters[e] = new a(e)), this.adapters[e].setNewBid(t)
    }, i.prototype.getBid = function(e, t) {
        return o.isOwnProperty(this.adapters, e) ? this.adapters[e].getBid(t) : void 0
    }, i.prototype.getName = function() {
        return this.name
    }, i.prototype.getCreationTime = function() {
        return this.creationTime
    }, i.prototype.setImpressionID = function(e) {
        return this.impressionID = e, this
    }, i.prototype.getImpressionID = function() {
        return this.impressionID
    }, i.prototype.setSizes = function(e) {
        return this.sizes = e, this
    }, i.prototype.getSizes = function() {
        return this.sizes
    }, i.prototype.setAdapterEntry = function(e) {
        return o.isOwnProperty(this.adapters, e) || (this.adapters[e] = new a(e), o.log(r.MESSAGES.M4 + this.name + " " + e + " " + this.adapters[e].getCallInitiatedTime())), this
    }, i.prototype.getLastBidIDForAdapter = function(e) {
        return o.isOwnProperty(this.adapters, e) ? this.adapters[e].getLastBidID() : ""
    }, i.prototype.setAllPossibleBidsReceived = function() {
        return this.allPossibleBidsReceived = !0, this
    }, i.prototype.hasAllPossibleBidsReceived = function() {
        return this.allPossibleBidsReceived
    }, e.exports.BMEntry = i, t.createBMEntry = function(e) {
        return new i(e)
    }
}), (function(e, t, n) {
    function i(e) {
        this.adapterID = e, this.callInitiatedTime = r.getCurrentTimestampInMs(), this.bids = {}, this.lastBidID = ""
    }
    var r = n(1);
    i.prototype.getCallInitiatedTime = function() {
        return this.callInitiatedTime
    }, i.prototype.getLastBidID = function() {
        return this.lastBidID
    }, i.prototype.getBid = function(e) {
        return r.isOwnProperty(this.bids, e) ? this.bids[e] : null
    }, i.prototype.setNewBid = function(e) {
        delete this.bids[this.lastBidID];
        var t = e.getBidID();
        this.bids[t] = e, this.lastBidID = t
    }, e.exports.AdapterEntry = i
}), (function(e, t, n) {
    function i(e) {
        return "object" == typeof e && "function" == typeof e.getSlotId && "function" == typeof e.getSlotId().getDomId && (e = e.getSlotId().getDomId()), d.isOwnProperty(h.slotsMap, e) ? h.slotsMap[e].getStatus() : s.SLOT_STATUS.DISPLAYED
    }

    function r(e) {
        var t = [];
        return d.forEachOnObject(h.slotsMap, (function(n, i) {
            d.isOwnProperty(e, i.getStatus()) && t.push(n)
        })), t
    }

    function o(e, t) {
        var n, i = [];
        return n = 0 == e.length || null == e[0] ? t.getSlots() : e[0], d.forEachOnArray(n, (function(e, t) {
            var n = h.generateSlotName(t);
            n.length > 0 && (i = i.concat(n))
        })), i
    }
    var a = n(2),
        s = n(0),
        d = n(1),
        c = n(4),
        u = n(12),
        l = n(13),
        p = a.isUsePrebidKeysEnabled(),
        g = a.isPrebidPubMaticAnalyticsEnabled(),
        f = n(14);
    t.displayHookIsAdded = !1;
    var m = !1;
    t.wrapperTargetingKeys = {};
    var E = {};
    t.slotsMap = E;
    var I = {},
        w = null,
        h = this;
    t.setWindowReference = function(e) {
        d.isObject(e) && (w = e)
    }, t.getWindowReference = function() {
        return w
    }, t.getAdUnitIndex = function(e) {
        var t = 0;
        try {
            var n = e.getSlotId().getId().split("_");
            t = parseInt(n[n.length - 1])
        } catch (e) {}
        return t
    }, t.getAdSlotSizesArray = function(e, t) {
        var n = [];
        return d.isFunction(t.getSizes) && d.forEachOnArray(t.getSizes(window.innerWidth, window.innerHeight), (function(t, i) {
            d.isFunction(i.getWidth) && d.isFunction(i.getHeight) ? n.push([i.getWidth(), i.getHeight()]) : (d.logWarning(e + ", size object does not have getWidth and getHeight method. Ignoring: "), d.logWarning(i))
        })), n
    }, t.setDisplayFunctionCalledIfRequired = function(e, t) {
        d.isObject(e) && d.isFunction(e.getDivID) && d.isArray(t) && t[0] && t[0] == e.getDivID() && (e.setDisplayFunctionCalled(!0), e.setArguments(t))
    }, t.storeInSlotsMap = function(e, t, n) {
        if (d.isOwnProperty(h.slotsMap, e)) n || h.slotsMap[e].setSizes(h.getAdSlotSizesArray(e, t));
        else {
            var i = u.createSlot(e);
            i.setDivID(e), i.setPubAdServerObject(t), i.setAdUnitID(t.getAdUnitPath()), i.setAdUnitIndex(h.getAdUnitIndex(t)), i.setSizes(h.getAdSlotSizesArray(e, t)), i.setStatus(s.SLOT_STATUS.CREATED), d.isObject(JSON) && d.isFunction(JSON.stringify) && d.forEachOnArray(t.getTargetingKeys(), (function(e, n) {
                i.setKeyValue(n, t.getTargeting(n))
            })), h.slotsMap[e] = i, d.createVLogInfoPanel(e, i.getSizes(window.innerWidth, window.innerHeight))
        }
    }, t.generateSlotName = function(e) {
        if (d.isObject(e) && d.isFunction(e.getSlotId)) {
            var t = e.getSlotId();
            if (t && d.isFunction(t.getDomId)) return t.getDomId()
        }
        return ""
    }, t.updateSlotsMapFromGoogleSlots = function(e, t, n) {
        d.log("Generating slotsMap"), d.forEachOnArray(e, (function(e, i) {
            var r = h.generateSlotName(i);
            h.storeInSlotsMap(r, i, n), n && d.isOwnProperty(h.slotsMap, r) && h.setDisplayFunctionCalledIfRequired(h.slotsMap[r], t)
        })), window.PWT.adUnits = window.PWT.adUnits || {}, Object.keys(h.slotsMap).forEach((function(e) {
            var t = h.slotsMap[e];
            window.PWT.adUnits[t.divID] = {
                divID: t.divID,
                adUnitId: t.adUnitID,
                mediaTypes: d.getAdUnitConfig(t.sizes, t).mediaTypeObject
            }
        })), d.log(h.slotsMap)
    }, t.getStatusOfSlotForDivId = i, t.updateStatusAfterRendering = function(e, t) {
        d.isOwnProperty(h.slotsMap, e) && h.slotsMap[e].updateStatusAfterRendering(t)
    }, t.getSlotNamesByStatus = r, t.removeDMTargetingFromSlot = function(e) {
        var t, n = {};
        d.isOwnProperty(h.slotsMap, e) && (t = h.slotsMap[e].getPubAdServerObject(), d.forEachOnArray(t.getTargetingKeys(), (function(e, i) {
            n[i] = t.getTargeting(i)
        })), a.shouldClearTargeting() && t.clearTargeting(), d.forEachOnObject(n, (function(e, n) {
            d.isOwnProperty(h.wrapperTargetingKeys, e) || t.setTargeting(e, n)
        })))
    }, t.updateStatusOfQualifyingSlotsBeforeCallingAdapters = function(e, t, n) {
        d.forEachOnArray(e, (function(e, i) {
            if (d.isOwnProperty(h.slotsMap, i)) {
                var r = h.slotsMap[i];
                r.setStatus(s.SLOT_STATUS.PARTNERS_CALLED), n && (h.removeDMTargetingFromSlot(i), r.setRefreshFunctionCalled(!0), r.setArguments(t))
            }
        }))
    }, t.arrayOfSelectedSlots = function(e) {
        var t = [];
        return d.forEachOnArray(e, (function(e, n) {
            t.push(h.slotsMap[n])
        })), t
    }, t.defineWrapperTargetingKeys = function(e) {
        var t = {};
        return d.forEachOnObject(e, (function(e, n) {
            t[n] = ""
        })), t
    }, t.findWinningBidAndApplyTargeting = function(e, t) {
        var n, i = (n = g ? l.getBid(e) : c.getBid(e)).wb || null,
            r = n.kvp || {},
            o = h.slotsMap[e].getPubAdServerObject(),
            u = p ? {} : s.IGNORE_PREBID_KEYS;
        d.log("DIV: " + e + " winningBid: "), d.log(i), !1 === g && i && i.getNetEcpm() > 0 && (h.slotsMap[e].setStatus(s.SLOT_STATUS.TARGETING_ADDED), c.setStandardKeys(i, r)), (!t || t && t[0] == e) && d.handleHook(s.HOOKS.POST_AUCTION_KEY_VALUES, [r, o]), d.forEachOnObject(r, (function(e, t) {
            !a.getSendAllBidsStatus() && i && "pubmatic" !== i.adapterID && d.isOwnProperty({
                hb_buyid_pubmatic: 1,
                pwtbuyid_pubmatic: 1
            }, e) ? delete r[e] : d.isOwnProperty(u, e) || d.isOwnProperty({
                pwtpb: 1
            }, e) || (o.setTargeting(e, t), h.defineWrapperTargetingKey(e))
        })), d.forEachOnObject(d.getCDSTargetingData(), (function(e, t) {
            window.googletag && window.googletag.pubads().setTargeting(e, t)
        }))
    }, t.defineWrapperTargetingKey = function(e) {
        d.isObject(h.wrapperTargetingKeys) || (h.wrapperTargetingKeys = {}), h.wrapperTargetingKeys[e] = ""
    }, t.newDisableInitialLoadFunction = function(e, t) {
        return d.isObject(e) && d.isFunction(t) ? function() {
            return m = !0, d.log("Disable Initial Load is called"), a.isIdentityOnly() ? (d.log(s.MESSAGES.IDENTITY.M5, " DisableInitial Load function"), t.apply(e, arguments)) : t.apply(e, arguments)
        } : (d.logError("disableInitialLoad: originalFunction is not a function"), null)
    }, t.newEnableSingleRequestFunction = function(e, t) {
        return d.isObject(e) && d.isFunction(t) ? function() {
            return d.log("enableSingleRequest is called"), t.apply(e, arguments)
        } : (d.log("enableSingleRequest: originalFunction is not a function"), null)
    }, t.newSetTargetingFunction = function(e, t) {
        return d.isObject(e) && d.isFunction(t) ? a.isIdentityOnly() ? (d.log(s.MESSAGES.IDENTITY.M5, " Original Set Targeting function"), function() {
            return t.apply(e, arguments)
        }) : function() {
            var n = arguments,
                i = n[0] ? n[0] : null;
            return null != i && (d.isOwnProperty(I, i) || (I[i] = []), I[i] = I[i].concat(n[1])), t.apply(e, arguments)
        } : (d.log("setTargeting: originalFunction is not a function"), null)
    }, t.newDestroySlotsFunction = function(e, t) {
        return d.isObject(e) && d.isFunction(t) ? function() {
            var n = arguments[0] || window.googletag.pubads().getSlots();
            return d.forEachOnArray(n, (function(e, t) {
                delete E[h.generateSlotName(t)]
            })), t.apply(e, arguments)
        } : (d.log("destroySlots: originalFunction is not a function"), null)
    }, t.newAddAdUnitFunction = function(e, t) {
        return d.isObject(e) && d.isFunction(t) ? function() {
            var n = arguments[0];
            return d.updateAdUnits(n), t.apply(e, arguments)
        } : (d.log("newAddAunitfunction: originalFunction is not a function"), null)
    }, t.updateStatusAndCallOriginalFunction_Display = function(e, t, n, i) {
        d.log(e), d.log(i), h.updateStatusAfterRendering(i[0], !1), n.apply(t, i)
    }, t.findWinningBidIfRequired_Display = function(e, t, n) {
        var i = t.getStatus();
        i != s.SLOT_STATUS.DISPLAYED && i != s.SLOT_STATUS.TARGETING_ADDED && h.findWinningBidAndApplyTargeting(e, n)
    }, t.processDisplayCalledSlot = function(e, t, n) {
        h.getStatusOfSlotForDivId(n[0]) != s.SLOT_STATUS.DISPLAYED ? h.updateStatusAndCallOriginalFunction_Display("Calling original display function after timeout with arguments, ", e, t, n) : d.log("AdSlot already rendered")
    }, t.executeDisplay = function(e, t, n) {
        var i = 0,
            r = window.setInterval((function() {
                (d.getExternalBidderStatus(t) && c.getAllPartnersBidStatuses(window.PWT.bidMap, t) || i >= e) && (window.clearInterval(r), d.resetExternalBidderStatus(t), n()), i += 10
            }), 10)
    }, t.displayFunctionStatusHandler = function(e, t, n, i) {
        switch (e) {
            case s.SLOT_STATUS.CREATED:
            case s.SLOT_STATUS.PARTNERS_CALLED:
                h.executeDisplay(a.getTimeout(), Object.keys(h.slotsMap), (function() {
                    d.forEachOnObject(h.slotsMap, (function(e, t) {
                        h.findWinningBidIfRequired_Display(e, t, i)
                    })), h.processDisplayCalledSlot(t, n, i)
                }));
                break;
            case s.SLOT_STATUS.TARGETING_ADDED:
                h.updateStatusAndCallOriginalFunction_Display("As DM processing is already done, Calling original display function with arguments", t, n, i);
                break;
            case s.SLOT_STATUS.DISPLAYED:
                h.updateStatusAndCallOriginalFunction_Display("As slot is already displayed, Calling original display function with arguments", t, n, i)
        }
    }, t.forQualifyingSlotNamesCallAdapters = function(e, t, n) {
        if (e.length > 0) {
            h.updateStatusOfQualifyingSlotsBeforeCallingAdapters(e, t, n);
            var i = h.arrayOfSelectedSlots(e);
            l.fetchBids(i)
        }
    }, t.newDisplayFunction = function(e, t) {
        return d.isObject(e) && d.isFunction(t) ? a.isIdentityOnly() ? (d.log(s.MESSAGES.IDENTITY.M5, " Original Display function"), function() {
            return t.apply(e, arguments)
        }) : function() {
            if (d.log("In display function, with arguments: "), d.log(arguments), m) return d.log("DisableInitialLoad was called, Nothing to do"), t.apply(e, arguments);
            h.updateSlotsMapFromGoogleSlots(e.pubads().getSlots(), arguments, !0), h.displayFunctionStatusHandler(i(arguments[0]), e, t, arguments);
            var n = {};
            n[s.SLOT_STATUS.CREATED] = "", h.forQualifyingSlotNamesCallAdapters(r(n), arguments, !1);
            var o = arguments[0];
            setTimeout((function() {
                d.realignVLogInfoPanel(o), c.executeAnalyticsPixel()
            }), 2e3 + a.getTimeout())
        } : (d.log("display: originalFunction is not a function"), null)
    }, t.newAddHookOnGoogletagDisplay = function(e) {
        h.displayHookIsAdded || (h.displayHookIsAdded = !0, d.log("Adding hook on googletag.display."), d.addHookOnFunction(e, !1, "display", this.newDisplayFunction))
    }, t.findWinningBidIfRequired_Refresh = function(e, t, n) {
        return d.isOwnProperty(h.slotsMap, e) && !0 === h.slotsMap[e].isRefreshFunctionCalled() && h.slotsMap[e].getStatus() !== s.SLOT_STATUS.DISPLAYED ? (h.findWinningBidAndApplyTargeting(t), h.updateStatusAfterRendering(t, !0), !0) : n
    }, t.postRederingChores = function(e, t) {
        const n = h.slotsMap[t];
        n ? d.createVLogInfoPanel(e, n.getSizes(window.innerWidth, window.innerHeight)) : d.log("Could not find slot in postRederingChores"), d.realignVLogInfoPanel(e), c.executeAnalyticsPixel()
    }, t.postTimeoutRefreshExecution = function(e, t, n, i) {
        d.log("Executing post timeout events, arguments: "), d.log(i);
        var r = !1;
        d.forEachOnArray(e, (function(e, t) {
            var n = h.slotsMap[t] && h.slotsMap[t].getDivID();
            n ? (r = h.findWinningBidIfRequired_Refresh(t, n, r), window.setTimeout((function() {
                h.postRederingChores(n, t)
            }), 2e3)) : d.log("Could not find divID")
        })), this.callOriginalRefeshFunction(r, t, n, i)
    }, t.callOriginalRefeshFunction = function(e, t, n, i) {
        !0 === e ? (d.log("Calling original refresh function post timeout"), n.apply(t, i)) : d.log("AdSlot already rendered")
    }, t.getQualifyingSlotNamesForRefresh = o, t.newRefreshFuncton = function(e, t) {
        return d.isObject(e) && d.isFunction(t) ? a.isIdentityOnly() ? (d.log("Identity Only Enabled. No Process Need. Calling Original Display function"), function() {
            return t.apply(e, arguments)
        }) : function() {
            d.log("In Refresh function"), h.updateSlotsMapFromGoogleSlots(e.getSlots(), arguments, !1);
            var n = o(arguments, e);
            h.forQualifyingSlotNamesCallAdapters(n, arguments, !0), d.log("Intiating Call to original refresh function with Timeout: " + a.getTimeout() + " ms");
            var i = arguments;
            h.executeDisplay(a.getTimeout(), n, (function() {
                h.postTimeoutRefreshExecution(n, e, t, i)
            }))
        } : (d.log("refresh: originalFunction is not a function"), null)
    }, t.addHooks = function(e) {
        if (d.isObject(e) && d.isObject(e.googletag) && d.isFunction(e.googletag.pubads)) {
            var t = e.googletag,
                n = t.pubads();
            return !!d.isObject(n) && (d.addHookOnFunction(n, !1, "disableInitialLoad", h.newDisableInitialLoadFunction), d.addHookOnFunction(n, !1, "enableSingleRequest", h.newEnableSingleRequestFunction), h.newAddHookOnGoogletagDisplay(t), d.addHookOnFunction(n, !1, "refresh", h.newRefreshFuncton), d.addHookOnFunction(n, !1, "setTargeting", h.newSetTargetingFunction), d.addHookOnFunction(t, !1, "destroySlots", h.newDestroySlotsFunction), !0)
        }
        return !1
    }, t.defineGPTVariables = function(e) {
        return !!d.isObject(e) && (e.googletag = e.googletag || {}, e.googletag.cmd = e.googletag.cmd || [], !0)
    }, t.addHooksIfPossible = function(e) {
        if (a.isIdentityOnly()) return !1;
        if (d.isObject(e.googletag) && !e.googletag.apiReady && d.isArray(e.googletag.cmd) && d.isFunction(e.googletag.cmd.unshift)) {
            d.log("Succeeded to load before GPT");
            var t = this;
            return e.googletag.cmd.unshift((function() {
                d.log("OpenWrap initialization started"), t.addHooks(e), d.log("OpenWrap initialization completed")
            })), !0
        }
        return d.logError("Failed to load before GPT"), !1
    }, t.initSafeFrameListener = function(e) {
        e.PWT.safeFrameMessageListenerAdded || (d.addMessageEventListenerForSafeFrame(e), e.PWT.safeFrameMessageListenerAdded = !0)
    }, t.init = function(e) {
        return a.initConfig(), !!d.isObject(e) && (h.setWindowReference(e), h.initSafeFrameListener(e), l.initPbjsConfig(), h.wrapperTargetingKeys = h.defineWrapperTargetingKeys(s.WRAPPER_TARGETING_KEYS), h.defineGPTVariables(e), h.addHooksIfPossible(e), f.initIdHub(e), !0)
    }
}), (function(e, t, n) {
    function i(e) {
        this.name = e, this.status = r.SLOT_STATUS.CREATED, this.divID = "", this.adUnitID = "", this.adUnitIndex = 0, this.sizes = [], this.keyValues = {}, this.arguments = [], this.pubAdServerObject = null, this.displayFunctionCalled = !1, this.refreshFunctionCalled = !1
    }
    var r = n(0);
    i.prototype.getName = function() {
        return this.name
    }, i.prototype.setStatus = function(e) {
        return this.status = e, this
    }, i.prototype.getStatus = function() {
        return this.status
    }, i.prototype.setDivID = function(e) {
        return this.divID = e, this
    }, i.prototype.getDivID = function() {
        return this.divID
    }, i.prototype.setAdUnitID = function(e) {
        return this.adUnitID = e, this
    }, i.prototype.getAdUnitID = function() {
        return this.adUnitID
    }, i.prototype.setAdUnitIndex = function(e) {
        return this.adUnitIndex = e, this
    }, i.prototype.getAdUnitIndex = function() {
        return this.adUnitIndex
    }, i.prototype.setSizes = function(e) {
        return this.sizes = e, this
    }, i.prototype.getSizes = function() {
        return this.sizes
    }, i.prototype.setKeyValue = function(e, t) {
        return this.keyValues[e] = t, this
    }, i.prototype.setKeyValues = function(e) {
        return this.keyValues = e, this
    }, i.prototype.getkeyValues = function() {
        return this.keyValues
    }, i.prototype.setArguments = function(e) {
        return this.arguments = e, this
    }, i.prototype.getArguments = function() {
        return this.arguments
    }, i.prototype.setPubAdServerObject = function(e) {
        return this.pubAdServerObject = e, this
    }, i.prototype.getPubAdServerObject = function() {
        return this.pubAdServerObject
    }, i.prototype.setDisplayFunctionCalled = function(e) {
        return this.displayFunctionCalled = e, this
    }, i.prototype.isDisplayFunctionCalled = function() {
        return this.displayFunctionCalled
    }, i.prototype.setRefreshFunctionCalled = function(e) {
        return this.refreshFunctionCalled = e, this
    }, i.prototype.isRefreshFunctionCalled = function() {
        return this.refreshFunctionCalled
    }, i.prototype.updateStatusAfterRendering = function(e) {
        this.status = r.SLOT_STATUS.DISPLAYED, this.arguments = [], e ? this.refreshFunctionCalled = !1 : this.displayFunctionCalled = !1
    }, e.exports.Slot = i, t.createSlot = function(e) {
        return new i(e)
    }
}), (function(e, t, n) {
    function i(e, t, n) {
        var i = !1;
        return c.isOwnProperty(e, t) && e[t].bids.forEach((function(e) {
            e.bidder == n && (i = !0)
        })), i
    }

    function r(e, t, n, r, o, s, d, u, p, g) {
        var f = {},
            E = u[d].mediaTypes,
            I = u[d].sizes,
            h = !1;
        E && c.isOwnProperty(E, "video") && "telaria" != e && (f.video = E.video), c.forEachOnObject(r, (function(e, t) {
            f[e] = t
        })), w && (f.kgpv = t, f.regexPattern = g), p && Object.keys(p).length > 0 && c.forEachOnObject(p, (function(t, n) {
            t == e && c.forEachOnObject(n, (function(e, t) {
                f[e] = t
            }))
        })), E && c.isOwnProperty(E, "video") && "telaria" != e && (c.isOwnProperty(f, "video") && c.isObject(f.video) ? c.forEachOnObject(E.video, (function(e, t) {
            c.isOwnProperty(f.video, e) || (f.video[e] = t)
        })) : f.video = E.video), a.usePBSAdapter() && (f.wiid = n, h = !0);
        var O = a.getAdapterNameForAlias(e) || e;
        switch (O) {
            case "pubmaticServer":
                f.publisherId = o.publisherId, f.adUnitIndex = "" + s.getAdUnitIndex(), f.adUnitId = s.getAdUnitID(), f.divId = s.getDivID(), f.adSlot = t, f.wiid = n, f.profId = a.getProfileID(), window.PWT.udpv && (f.verId = a.getProfileDisplayVersionID()), u[d].bids.push({
                    bidder: e,
                    params: f
                });
                break;
            case "pubmatic":
            case "pubmatic2":
                f.publisherId = o.publisherId, f.adSlot = f.slotName || t, f.wiid = n, f.profId = "pubmatic2" == e || "pubmatic2" == O ? o.profileId : a.getProfileID(), "pubmatic2" != e && "pubmatic2" != O && window.PWT.udpv && (f.verId = a.getProfileDisplayVersionID()), 1 == a.usePBSAdapter() && a.isServerSideAdapter(e) && (f.wrapper = {
                    profile: parseInt(l.pwt.pid),
                    version: parseInt(l.pwt.pdvid)
                }, f.hashedKey && (f.adSlot = f.hashedKey)), u[d].bids.push({
                    bidder: e,
                    params: f
                });
                break;
            case "pulsepoint":
                c.forEachOnArray(I, (function(t, i) {
                    var o = {};
                    c.forEachOnObject(r, (function(e, t) {
                        o[e] = t
                    })), o.cf = i[0] + "x" + i[1], h && (o.wiid = n), u[d].bids.push({
                        bidder: e,
                        params: o
                    })
                }));
                break;
            case "adg":
                c.forEachOnArray(I, (function(t, o) {
                    var a = {};
                    c.forEachOnObject(r, (function(e, t) {
                        a[e] = t
                    })), a.width = o[0], a.height = o[1], h && (a.wiid = n), m.isSingleImpressionSettingEnabled && i(u, d, e) || u[d].bids.push({
                        bidder: e,
                        params: a
                    })
                }));
                break;
            case "yieldlab":
                c.forEachOnArray(I, (function(t, o) {
                    var a = {};
                    c.forEachOnObject(r, (function(e, t) {
                        a[e] = t
                    })), a.adSize = o[0] + "x" + o[1], h && (a.wiid = n), m.isSingleImpressionSettingEnabled && i(u, d, e) || u[d].bids.push({
                        bidder: e,
                        params: a
                    })
                }));
                break;
            case "ix":
            case "indexExchange":
                f.siteID && (f.siteId = f.siteID, delete f.siteID), h && (f.wiid = n), u[d].bids.push({
                    bidder: e,
                    params: f
                });
                break;
            default:
                u[d].bids.push({
                    bidder: e,
                    params: f
                })
        }
    }

    function o() {
        return [{
            key: "pwtpid",
            val: function(e) {
                return e.bidderCode
            }
        }, {
            key: "pwtsid",
            val: function(e) {
                return e.adId
            }
        }, {
            key: "pwtecp",
            val: function(e) {
                return (e.cpm || 0).toFixed(s.COMMON.BID_PRECISION)
            }
        }, {
            key: "pwtsz",
            val: function(e) {
                return e.size
            }
        }, {
            key: "hb_source",
            val: function() {
                return ""
            }
        }, {
            key: "pwtplt",
            val: function(e) {
                return "video" == e.mediaType && e.videoCacheKey ? s.PLATFORM_VALUES.VIDEO : e.native ? s.PLATFORM_VALUES.NATIVE : s.PLATFORM_VALUES.DISPLAY
            }
        }, {
            key: "pwtdid",
            val: function(e) {
                return e.dealId || ""
            }
        }, {
            key: "pwtdeal",
            val: function(e) {
                return e.dealId ? (e.dealChannel = e.dealChannel || "PMP", e.dealChannel + s.COMMON.DEAL_KEY_VALUE_SEPARATOR + e.dealId + s.COMMON.DEAL_KEY_VALUE_SEPARATOR + e.adId) : ""
            }
        }, {
            key: "pwtbst",
            val: function() {
                return 1
            }
        }, {
            key: "pwtpubid",
            val: function() {
                return a.getPublisherId()
            }
        }, {
            key: "pwtprofid",
            val: function() {
                return a.getProfileID()
            }
        }, {
            key: "pwtverid",
            val: function() {
                return a.getProfileDisplayVersionID()
            }
        }, {
            key: "pwtcid",
            val: function(e) {
                return "video" == e.mediaType && e.videoCacheKey ? e.videoCacheKey : ""
            }
        }, {
            key: "pwtcurl",
            val: function(e) {
                return "video" == e.mediaType && e.videoCacheKey ? s.CONFIG.CACHE_URL : ""
            }
        }, {
            key: "pwtcpath",
            val: function(e) {
                return "video" == e.mediaType && e.videoCacheKey ? s.CONFIG.CACHE_PATH : ""
            }
        }, {
            key: "pwtuuid",
            val: function() {
                return ""
            }
        }, {
            key: "pwtacat",
            val: function(e) {
                return e.meta && e.meta.primaryCatId ? e.meta.primaryCatId : ""
            }
        }, {
            key: "pwtdsp",
            val: function(e) {
                return e.meta && e.meta.networkId ? e.meta.networkId : ""
            }
        }, {
            key: "pwtcrid",
            val: function(e) {
                return e.creativeId ? e.creativeId : ""
            }
        }]
    }
    var a = n(2),
        s = n(0),
        d = n(5),
        c = n(1),
        u = n(4),
        l = n(3),
        p = n(6),
        g = s.COMMON.PARENT_ADAPTER_PREBID,
        f = s.COMMON.PREBID_NAMESPACE;
    t.parentAdapterID = g, t.kgpvMap = {};
    var m = this,
        E = !1,
        I = !1,
        w = a.isPrebidPubMaticAnalyticsEnabled(),
        h = a.isSingleImpressionSettingEnabled(),
        O = s.DEFAULT_ALIASES;
    t.isSingleImpressionSettingEnabled = h, t.transformPBBidToOWBid = function(e, t, n) {
        var i = n || e.regexPattern || void 0,
            r = d.createBid(e.bidderCode, t),
            o = parseInt(e.pubmaticServerErrorCode);
        return a.getAdServerCurrency() && (c.isOwnProperty(e, "originalCpm") || (e.originalCpm = e.cpm), c.isOwnProperty(e, "originalCurrency") || (e.originalCurrency = c.getCurrencyToDisplay())), e.status == s.BID_STATUS.BID_REJECTED ? r.setGrossEcpm(e.originalCpm, e.originalCurrency, c.getCurrencyToDisplay(), e.status) : r.setGrossEcpm(e.cpm), r.setDealID(e.dealId), r.setDealChannel(e.dealChannel), r.setAdHtml(e.ad || ""), r.setAdUrl(e.adUrl || ""), r.setWidth(e.width), r.setHeight(e.height), r.setMi(e.mi), e.videoCacheKey && r.setVastCache(e.videoCacheKey), e.vastUrl && r.setVastUrl(e.vastUrl), e.vastXml && r.setVastUrl(e.vastUrl), e.renderer && r.setRenderer(e.renderer), e.native && r.setNative(e.native), i && r.setRegexPattern(i), e.mediaType == s.FORMAT_VALUES.VIDEO && (e.videoCacheKey && r.setcacheUUID(e.videoCacheKey), r.updateBidId(e.adUnitCode)), e.mediaType && (parseFloat(e.cpm) > 0 || e.status == s.BID_STATUS.BID_REJECTED) && r.setAdFormat(e.adHtml, e.mediaType), e.sspID && r.setsspID(e.sspID), r.setReceivedTime(e.responseTimestamp), r.setServerSideResponseTime(e.serverSideResponseTime), a.getAdServerCurrency() && (r.setOriginalCpm(window.parseFloat(e.originalCpm)), r.setOriginalCurrency(e.originalCurrency), c.isFunction(e.getCpmInNewCurrency) ? r.setAnalyticsCpm(window.parseFloat(e.getCpmInNewCurrency(s.COMMON.ANALYTICS_CURRENCY)), e.status) : r.setAnalyticsCpm(r.getGrossEcpm(), e.status)), 1 === o || 2 === o || 6 === o || 11 === o || 12 === o ? (r.setDefaultBidStatus(-1), r.setWidth(0), r.setHeight(0)) : 3 === o || 4 === o || 5 === o ? (r.setDefaultBidStatus(0), 0 === r.isServerSide && r.setPostTimeoutStatus()) : o && r.setDefaultBidStatus(1), c.forEachOnObject(e.adserverTargeting, (function(e, t) {
            "hb_format" !== e && "hb_source" !== e && r.setKeyValuePair(e, t)
        })), r.setPbBid(e), r
    }, t.checkAndModifySizeOfKGPVIfRequired = function(e, t) {
        var n = {
            responseKGPV: "",
            responseRegex: ""
        };
        t.kgpvs.length > 0 && t.kgpvs.forEach((function(t) {
            e.bidderCode == t.adapterID && (n.responseKGPV = t.kgpv, n.responseRegex = t.regexPattern)
        }));
        var i = n.responseKGPV.split("@"),
            r = 1,
            o = !1;
        if (i && (2 == i.length || 3 == i.length && (r = 2) && (o = !0)) && "video" != e.mediaType) {
            var a = i[r],
                s = null;
            i[r].indexOf(":") > 0 && (a = i[r].split(":")[0], s = i[r].split(":")[1]), e.getSize() && e.getSize() != a && "0X0" != e.getSize().toUpperCase() && (i[0].toUpperCase() == a.toUpperCase() && (i[0] = e.getSize().toLowerCase()), n.responseKGPV = o ? i[0] + "@" + i[1] + "@" + e.getSize() : i[0] + "@" + e.getSize(), s && (n.responseKGPV = n.responseKGPV + ":" + s))
        }
        return n
    }, t.pbBidStreamHandler = function(e) {
        var t = e.adUnitCode || "";
        if (c.isOwnProperty(m.kgpvMap, t)) {
            if (e.floorData && (window.PWT.floorData[window.PWT.bidMap[e.adUnitCode].impressionID].floorResponseData = e.floorData), "pubmaticServer" === e.bidderCode && (e.bidderCode = e.originalBidder), m.isSingleImpressionSettingEnabled) {
                var n = m.checkAndModifySizeOfKGPVIfRequired(e, m.kgpvMap[t]);
                m.kgpvMap[t].kgpv = n.responseKGPV, m.kgpvMap[t].regexPattern = n.responseRegex
            }
            if (e.bidderCode && a.isServerSideAdapter(e.bidderCode)) {
                var i = m.kgpvMap[t].divID;
                if (!m.isSingleImpressionSettingEnabled) {
                    var r = m.getPBCodeWithWidthAndHeight(i, e.bidderCode, e.width, e.height),
                        o = m.getPBCodeWithoutWidthAndHeight(i, e.bidderCode);
                    if (c.isOwnProperty(m.kgpvMap, r)) t = r;
                    else {
                        if (!c.isOwnProperty(m.kgpvMap, o)) return void c.logWarning("Failed to find kgpv details for S2S-adapter:" + e.bidderCode);
                        t = o
                    }
                }
                e.ss = a.isServerSideAdapter(e.bidderCode) ? 1 : 0
            }
            e.bidderCode && (e.timeToRespond < a.getTimeout() - s.CONFIG.TIMEOUT_ADJUSTMENT && c.handleHook(s.HOOKS.BID_RECEIVED, [m.kgpvMap[t].divID, e]), u.setBidFromBidder(m.kgpvMap[t].divID, m.transformPBBidToOWBid(e, m.kgpvMap[t].kgpv, m.kgpvMap[t].regexPattern)))
        } else c.logWarning("Failed to find pbBid.adUnitCode in kgpvMap, pbBid.adUnitCode:" + e.adUnitCode)
    }, t.pbBidRequestHandler = function(e) {
        e.bids.forEach((function(e) {
            window.PWT.floorData[window.PWT.bidMap[e.adUnitCode].impressionID] || (window.PWT.floorData[window.PWT.bidMap[e.adUnitCode].impressionID] = {}), window.PWT.floorData[window.PWT.bidMap[e.adUnitCode].impressionID].floorRequestData = e.floorData
        }))
    }, t.pbAuctionEndHandler = function(e) {
        window.PWT.newAdUnits = window.PWT.newAdUnits || {}, e.adUnits.forEach((function(e) {
            e.pubmaticAutoRefresh && (window.PWT.newAdUnits[window.PWT.bidMap[e.code].impressionID] || (window.PWT.newAdUnits[window.PWT.bidMap[e.code].impressionID] = {}), window.PWT.newAdUnits[window.PWT.bidMap[e.code].impressionID][e.code] || (window.PWT.newAdUnits[window.PWT.bidMap[e.code].impressionID][e.code] = {}), window.PWT.newAdUnits[window.PWT.bidMap[e.code].impressionID][e.code].pubmaticAutoRefresh = e.pubmaticAutoRefresh)
        }))
    }, t.getPBCodeWithWidthAndHeight = function(e, t, n, i) {
        return e + "@" + t + "@" + n + "X" + i
    }, t.getPBCodeWithoutWidthAndHeight = function(e, t) {
        return e + "@" + t
    }, t.isAdUnitsCodeContainBidder = i, t.generatedKeyCallbackForPbAnalytics = function(e, t, n, o, s, d, u, l, p, g, f) {
        var m, E, I, w, h, O;
        if (a.isServerSideAdapter(e) && 1 != a.usePBSAdapter()) c.log("Not calling adapter: " + e + ", for " + s + ", as it is serverSideEnabled.");
        else {
            I = u.getDivID(), m = u.getDivID(), E = u.getSizes(), w = u.getAdUnitID();
            var S = c.getAdUnitConfig(E, u);
            if ((h = S.mediaTypeObject).partnerConfig && (O = h.partnerConfig), c.isOwnProperty(t, m)) {
                if (a.isSingleImpressionSettingEnabled() && i(t, m, e)) return
            } else t[m] = {
                code: m,
                mediaTypes: {},
                sizes: E,
                adUnitId: w,
                bids: [],
                divID: I
            }, h.banner && (t[m].mediaTypes.banner = h.banner), h.native && (t[m].mediaTypes.native = h.native), h.video && (t[m].mediaTypes.video = h.video), S.renderer && (t[m].renderer = S.renderer), S.ortb2Imp && (t[m].ortb2Imp = S.ortb2Imp), S.floors && (t[m].floors = S.floors), window.PWT.adUnits = window.PWT.adUnits || {}, window.PWT.adUnits[m] = t[m];
            r(e, s, o, l, n, u, m, t, O, f)
        }
    }, t.generatedKeyCallback = function(e, t, n, o, s, d, u, l, p, g, f) {
        var E, I, w, h, O = u.getDivID(),
            S = u.getAdUnitID();
        if (m.isSingleImpressionSettingEnabled) {
            E = u.getDivID(), I = u.getSizes();
            var A = !1;
            if (m.kgpvMap[E] && m.kgpvMap[E].kgpvs && m.kgpvMap[E].kgpvs.length > 0) {
                if (c.forEachOnArray(m.kgpvMap[E].kgpvs, (function(t, n) {
                        n.adapterID == e && (A = !0)
                    })), A && i(t, E, e)) return
            } else m.kgpvMap[E] = {
                kgpvs: [],
                divID: O
            };
            if (!A) {
                var y = {
                    adapterID: e,
                    kgpv: s,
                    regexPattern: f
                };
                m.kgpvMap[E].kgpvs.push(y)
            }
        } else d ? (E = m.getPBCodeWithWidthAndHeight(O, e, p, g), I = [
            [p, g]
        ]) : (E = m.getPBCodeWithoutWidthAndHeight(O, e), I = u.getSizes()), m.kgpvMap[E] = {
            kgpv: s,
            divID: O,
            regexPattern: f
        };
        if (a.isServerSideAdapter(e) && 1 != a.usePBSAdapter()) c.log("Not calling adapter: " + e + ", for " + s + ", as it is serverSideEnabled.");
        else {
            var T = c.getAdUnitConfig(I, u);
            if ((w = T.mediaTypeObject).partnerConfig && (h = w.partnerConfig), c.isOwnProperty(t, E)) {
                if (m.isSingleImpressionSettingEnabled && i(t, E, e)) return
            } else t[E] = {
                code: E,
                mediaTypes: {},
                sizes: I,
                adUnitId: S,
                bids: [],
                divID: O
            }, w.banner && (t[E].mediaTypes.banner = w.banner), w.native && (t[E].mediaTypes.native = w.native), w.video && (t[E].mediaTypes.video = w.video), T.renderer && (t[E].renderer = T.renderer), window.PWT.adUnits = window.PWT.adUnits || {}, window.PWT.adUnits[E] = t[E];
            c.isOwnProperty(t, E) && (w = t[E].mediaTypes), r(e, s, o, l, n, u, E, t, h, f)
        }
    }, t.pushAdapterParamsInAdunits = r, t.generatePbConf = function(e, t, n, i, r) {
        c.log(e + s.MESSAGES.M1), t && c.forEachGeneratedKey(e, i, t, r, [], n, w ? m.generatedKeyCallbackForPbAnalytics : m.generatedKeyCallback, !0)
    }, t.assignSingleRequestConfigForBidders = function(e) {
        c.forEachOnObject(s.SRA_ENABLED_BIDDERS, (function(t) {
            c.isOwnProperty(l.adapters, t) && (e[t] = {
                singleRequest: !0
            })
        }))
    }, t.assignUserSyncConfig = function(e) {
        var t;
        e.userSync = {
            enableOverride: !0,
            syncsPerBidder: 0,
            iframeEnabled: !0,
            pixelEnabled: !0,
            filterSettings: {
                iframe: {
                    bidders: "*",
                    filter: "include"
                }
            },
            enabledBidders: (t = [], a.forEachAdapter((function(e) {
                var n = a.getAdapterNameForAlias(e) || e; - 1 == t.indexOf(n) && t.push(n)
            })), t),
            syncDelay: 2e3,
            aliasSyncEnabled: !0
        }, a.isUserIdModuleEnabled() && (e.userSync.userIds = c.getUserIdConfiguration())
    }, t.assignGdprConfigIfRequired = function(e) {
        if (a.getGdpr()) {
            e.consentManagement || (e.consentManagement = {}), e.consentManagement.gdpr = {
                cmpApi: a.getCmpApi(),
                timeout: a.getGdprTimeout(),
                allowAuctionWithoutConsent: a.getAwc(),
                defaultGdprScope: !0
            };
            var t = p.getGdprActionTimeout();
            t && (c.log("GDPR IS ENABLED, TIMEOUT: " + e.consentManagement.gdpr.timeout + ", ACTION TIMEOUT: " + t), e.consentManagement.gdpr.actionTimeout = t)
        }
    }, t.assignCcpaConfigIfRequired = function(e) {
        a.getCCPA() && (e.consentManagement || (e.consentManagement = {}), e.consentManagement.usp = {
            cmpApi: a.getCCPACmpApi(),
            timeout: a.getCCPATimeout()
        })
    }, t.assignCurrencyConfigIfRequired = function(e) {
        a.getAdServerCurrency() && (c.log(s.MESSAGES.M26 + a.getAdServerCurrency()), e.currency = {
            adServerCurrency: a.getAdServerCurrency(),
            granularityMultiplier: a.getGranularityMultiplier()
        })
    }, t.assignSchainConfigIfRequired = function(e) {
        a.isSchainEnabled() && (e.schain = a.getSchainObject())
    }, t.configureBidderAliasesIfAvailable = function() {
        c.isFunction(window[f].aliasBidder) ? a.forEachBidderAlias((function(e) {
            window[f].aliasBidder(l.alias[e] && l.alias[e].name ? l.alias[e].name : l.alias[e], e, l.alias[e] && l.alias[e].gvlid ? {
                gvlid: l.alias[e].gvlid
            } : {})
        })) : c.logWarning("PreBid js aliasBidder method is not available")
    }, t.enablePrebidPubMaticAnalyticIfRequired = function() {
        w && c.isFunction(window[f].enableAnalytics) && window[f].enableAnalytics({
            provider: "pubmatic",
            options: {
                publisherId: a.getPublisherId(),
                profileId: a.getProfileID(),
                profileVersionId: a.getProfileDisplayVersionID(),
                identityOnly: a.isUserIdModuleEnabled() ? 1 : 0
            }
        })
    }, t.throttleAdapter = function(e, t) {
        return !(e >= a.getAdapterThrottle(t))
    }, t.generateAdUnitsArray = function(e, t) {
        var n = {},
            i = c.getRandomNumberBelow100();
        a.forEachAdapter((function(r, o) {
            r !== m.parentAdapterID && (1 == a.usePBSAdapter() && a.isServerSideAdapter(r) ? 0 == m.throttleAdapter(i, r) ? m.generateConfig(r, o, e, n, t) : c.log(r + s.MESSAGES.M2) : a.isServerSideAdapter(r) || 0 == m.throttleAdapter(i, r) ? m.generateConfig(r, o, e, n, t) : c.log(r + s.MESSAGES.M2))
        }));
        var r = [];
        for (var o in n) c.isOwnProperty(n, o) && r.push(n[o]);
        return r
    }, t.generateConfig = function(e, t, n, i, r) {
        c.forEachOnObject(n, (function(t, n) {
            u.setCallInitTime(n.getDivID(), e)
        })), m.generatePbConf(e, t, n, i, r)
    }, t.addOnBidResponseHandler = function() {
        c.isFunction(window[f].onEvent) ? E || (window[f].onEvent("bidResponse", m.pbBidStreamHandler), E = !0) : c.logWarning("PreBid js onEvent method is not available")
    }, t.addOnAuctionEndHandler = function() {
        c.isFunction(window[f].onEvent) ? I || (window[f].onEvent("auctionEnd", m.pbAuctionEndHandler), I = !0) : c.logWarning("PreBid js onEvent method is not available")
    }, t.addOnBidRequestHandler = function() {
        c.isFunction(window[f].onEvent) ? window[f].onEvent("bidRequested", m.pbBidRequestHandler) : c.logWarning("PreBid js onEvent method is not available")
    }, t.setPrebidConfig = function() {
        if (c.isFunction(window[f].setConfig) || "function" == typeof window[f].setConfig) {
            var e = {
                debug: c.isDebugLogEnabled(),
                cache: {
                    url: s.CONFIG.CACHE_URL + s.CONFIG.CACHE_PATH,
                    ignoreBidderCacheKey: !0
                },
                bidderSequence: "random",
                disableAjaxTimeout: a.getDisableAjaxTimeout(),
                enableSendAllBids: a.getSendAllBidsStatus(),
                targetingControls: {
                    alwaysIncludeDeals: !0
                },
                testGroupId: parseInt(window.PWT.testGroupId || 0)
            };
            a.getPriceGranularity() && (e.priceGranularity = a.getPriceGranularity()), !0 === w && (e.instreamTracking = {
                enabled: !0
            }), window.PWT.ssoEnabled = a.isSSOEnabled() || !1, m.getFloorsConfiguration(e), m.checkConfigLevelFloor(e), m.assignUserSyncConfig(e), m.assignGdprConfigIfRequired(e), m.assignCcpaConfigIfRequired(e), m.assignCurrencyConfigIfRequired(e), m.assignSchainConfigIfRequired(e), m.assignSingleRequestConfigForBidders(e), m.readCustDimenData(e), a.usePBSAdapter() && m.gets2sConfig(e), m.checkForYahooSSPBidder(e), c.handleHook(s.HOOKS.PREBID_SET_CONFIG, [e]), window[f].setConfig(e)
        } else c.logWarning("PreBidJS setConfig method is not available")
    }, t.realignPubmaticAdapters = function() {
        if (l.adapters && l.adapters.pubmatic) {
            var e = {
                pubmatic: l.adapters.pubmatic
            };
            l.adapters = Object.assign(e, l.adapters)
        }
    }, t.gets2sConfig = function(e) {
        var t = {},
            n = a.getServerEnabledAdaptars();
        for (var i in l.alias) O[i] = l.alias[i] && l.alias[i].name ? l.alias[i].name : l.alias[i];
        var r = a.getPubMaticAndAlias(n);
        r.length && r.forEach((function(e) {
            t[e] = {}
        })), e.s2sConfig = {
            accountId: a.getPublisherId(),
            adapter: s.PBSPARAMS.adapter,
            enabled: !0,
            bidders: n,
            endpoint: s.PBSPARAMS.endpoint,
            syncEndpoint: s.PBSPARAMS.syncEndpoint,
            timeout: a.getTimeoutForPBSRequest(),
            secure: 1,
            extPrebid: {
                aliases: O,
                bidderparams: t,
                targeting: {
                    pricegranularity: a.getPriceGranularity()
                },
                isPrebidPubMaticAnalyticsEnabled: a.isPrebidPubMaticAnalyticsEnabled(),
                isUsePrebidKeysEnabled: a.isUsePrebidKeysEnabled(),
                macros: a.createMacros()
            }
        }, a.getMarketplaceBidders() && (e.s2sConfig.allowUnknownBidderCodes = !0, e.s2sConfig.extPrebid.alternatebiddercodes = {
            enabled: !0,
            bidders: {
                pubmatic: {
                    enabled: !0,
                    allowedbiddercodes: a.getMarketplaceBidders()
                }
            }
        })
    }, t.hasFloorsSchema = function S(e, t) {
        for (var n in e)
            if (e.hasOwnProperty(n) && ("floors" === n || "object" == typeof e[n] && S(e[n], t))) return t.floors = {
                enforcement: {
                    enforceJS: a.getFloorType()
                }
            };
        return !1
    }, t.checkConfigLevelFloor = function(e) {
        e.hasOwnProperty("floors") || l.slotConfig && l.slotConfig.config && m.hasFloorsSchema(l.slotConfig.config, e)
    }, t.getFloorsConfiguration = function(e) {
        1 == a.isFloorPriceModuleEnabled() && a.getFloorSource() !== s.COMMON.EXTERNAL_FLOOR_WO_CONFIG && (e.floors = {
            enforcement: {
                enforceJS: a.getFloorType()
            },
            auctionDelay: a.getFloorAuctionDelay(),
            endpoint: {
                url: a.getFloorJsonUrl()
            },
            additionalSchemaFields: {
                browser: c.getBrowserDetails,
                platform_id: c.getPltForFloor
            }
        })
    }, t.checkForYahooSSPBidder = function(e) {
        var t = !1,
            n = l.adapters.hasOwnProperty(s.YAHOOSSP);
        if (!n)
            for (var i in l.alias) i = i.name ? i.name : i, a.getAdapterNameForAlias(i) == s.YAHOOSSP && (t = !0);
        (n || t) && (e[s.YAHOOSSP] = {
            mode: "all"
        })
    }, t.readCustDimenData = function(e) {
        const t = c.isFunction(window.getCustomDimensionsDataFromPublisher) ? window.getCustomDimensionsDataFromPublisher() : null;
        t && (e.cds = t.cds)
    }, t.getPbjsAdServerTargetingConfig = o, t.setPbjsBidderSettingsIfRequired = function() {
        if (!1 !== w) {
            var e = window[f].bidderSettings || {};
            window[f].bidderSettings = {
                standard: {
                    suppressEmptyKeys: !0,
                    storageAllowed: "1" === l.pwt.localStorageAccess || null
                }
            }, !1 === a.isUsePrebidKeysEnabled() && (window[f].bidderSettings.standard.adserverTargeting = o()), a.forEachAdapter((function(t) {
                !1 === window[f].bidderSettings.hasOwnProperty(t) && (window[f].bidderSettings[t] = {}, "pubmatic" === t && a.getMarketplaceBidders() && (window[f].bidderSettings[t].allowAlternateBidderCodes = !0, window[f].bidderSettings[t].allowedAlternateBidderCodes = a.getMarketplaceBidders()), window[f].bidderSettings[t].bidCpmAdjustment = function(e) {
                    return window.parseFloat((e * a.getAdapterRevShare(t)).toFixed(s.COMMON.BID_PRECISION))
                }, e[t] && (window[f].bidderSettings[t].storageAllowed = e[t].storageAllowed))
            })), e.standard && (window[f].bidderSettings.standard.storageAllowed = e.standard.storageAllowed)
        } else window[f].bidderSettings = {
            standard: {
                storageAllowed: "1" === l.pwt.localStorageAccess || null
            }
        }
    }, t.pbjsBidsBackHandler = function(e, t) {
        function n() {
            c.forEachOnArray(t, (function(e, t) {
                u.setAllPossibleBidsReceived(t.getDivID())
            }))
        }
        c.log("In PreBid bidsBackHandler with bidResponses: "), c.log(e), setTimeout(window[f].triggerUserSyncs, 10), a.getAdServerCurrency() ? setTimeout(n, 300) : n()
    }, t.initPbjsConfig = function() {
        window[f] ? (window[f].logging = c.isDebugLogEnabled(), m.realignPubmaticAdapters(), m.setPrebidConfig(), m.configureBidderAliasesIfAvailable(), m.enablePrebidPubMaticAnalyticIfRequired(), m.setPbjsBidderSettingsIfRequired(), c.getGeoInfo()) : c.logError("PreBid js is not loaded")
    }, t.fetchBids = function(e) {
        var t = c.generateUUID();
        if (window[f]) {
            c.forEachOnArray(e, (function(e, n) {
                var i = n.getDivID();
                u.resetBid(i, t), u.setSizes(i, c.generateSlotNamesFromPattern(n, "_W_x_H_"))
            }));
            var n = m.generateAdUnitsArray(e, t);
            if (n.length > 0 && window[f]) try {
                if (!c.isFunction(window[f].requestBids) && "function" != typeof window[f].requestBids) return void c.log("PreBid js requestBids function is not available");
                c.handleHook(s.HOOKS.PREBID_REQUEST_BIDS, [n]), !1 === w && (m.addOnBidResponseHandler(), m.addOnBidRequestHandler(), m.addOnAuctionEndHandler()), window[f].removeAdUnit(), window[f].addAdUnits(n), window[f].requestBids({
                    bidsBackHandler: function(t) {
                        m.pbjsBidsBackHandler(t, e)
                    },
                    timeout: a.getTimeout() - s.CONFIG.TIMEOUT_ADJUSTMENT
                })
            } catch (e) {
                c.logError("Error occured in calling PreBid."), c.logError(e)
            }
        } else c.logError("PreBid js is not loaded")
    }, t.getBid = function(e) {
        var t = window[f].getHighestCpmBids([e])[0] || null;
        t && (t.adHtml = t.ad, t.adapterID = t.bidder, t.netEcpm = t.cpm, t.grossEcpm = t.originalCpm);
        var n = {
            wb: t,
            kvp: window[f].getAdserverTargetingForAdUnitCode([e]) || null
        };
        return w && n.kvp.pwtdeal && delete n.kvp.pwtdeal, n
    }
}), (function(e, t, n) {
    var i = n(7),
        r = n(0),
        o = n(15),
        a = n(6),
        s = this,
        d = i.isIdentityOnly() ? r.COMMON.IH_NAMESPACE : r.COMMON.PREBID_NAMESPACE,
        c = i.isPubMaticIHAnalyticsEnabled();
    s.enablePubMaticIdentityAnalyticsIfRequired = function() {
        window.IHPWT.ihAnalyticsAdapterExpiry = i.getIHAnalyticsAdapterExpiry(), c && o.isFunction(window[d].enableAnalytics) && window[d].enableAnalytics({
            provider: "pubmaticIH",
            options: {
                publisherId: i.getPublisherId(),
                profileId: i.getProfileID(),
                profileVersionId: i.getProfileDisplayVersionID(),
                identityOnly: i.isUserIdModuleEnabled() ? i.isIdentityOnly() ? 2 : 1 : 0,
                domain: o.getDomainFromURL()
            }
        })
    }, s.setConfig = function() {
        if (o.isFunction(window[d].setConfig) || "function" == typeof window[d].setConfig) {
            if (i.isIdentityOnly()) {
                var e = {
                    debug: o.isDebugLogEnabled(),
                    userSync: {
                        syncDelay: 2e3,
                        auctionDelay: 1
                    }
                };
                if (i.getGdpr()) {
                    e.consentManagement || (e.consentManagement = {}), e.consentManagement.gdpr = {
                        cmpApi: i.getCmpApi(),
                        timeout: i.getGdprTimeout(),
                        allowAuctionWithoutConsent: i.getAwc(),
                        defaultGdprScope: !0
                    };
                    var t = a.getGdprActionTimeout();
                    t && (o.log("GDPR IS ENABLED, TIMEOUT: " + e.consentManagement.gdpr.timeout + ", ACTION TIMEOUT: " + t), e.consentManagement.gdpr.actionTimeout = t)
                }
                i.getCCPA() && (e.consentManagement || (e.consentManagement = {}), e.consentManagement.usp = {
                    cmpApi: i.getCCPACmpApi(),
                    timeout: i.getCCPATimeout()
                }), window.IHPWT.ssoEnabled = i.isSSOEnabled() || !1, i.isUserIdModuleEnabled() && (e.userSync.userIds = o.getUserIdConfiguration()), o.handleHook(r.HOOKS.PREBID_SET_CONFIG, [e]), window[d].setConfig(e)
            }
            i.isUserIdModuleEnabled() && i.isIdentityOnly() && s.enablePubMaticIdentityAnalyticsIfRequired(), o.isFunction(window[d].firePubMaticIHLoggerCall) && window[d].firePubMaticIHLoggerCall(), window[d].requestBids([])
        }
    }, t.initIdHub = function(e) {
        i.isUserIdModuleEnabled() && (s.setConfig(), i.isIdentityOnly() && (i.getIdentityConsumers().indexOf(r.COMMON.PREBID) > -1 && !o.isUndefined(e[i.PBJS_NAMESPACE]) && !o.isUndefined(e[i.PBJS_NAMESPACE].que) ? (e[i.PBJS_NAMESPACE].que.unshift((function() {
            var t = e[i.PBJS_NAMESPACE].version.split(".");
            if (3 === t.length && (+t[0].split("v")[1] > 3 || "v3" === t[0] && +t[1] >= 3)) o.log("Adding On Event " + e[i.PBJS_NAMESPACE] + ".addAddUnits()"), e[i.PBJS_NAMESPACE].onEvent("addAdUnits", (function() {
                o.updateAdUnits(e[i.PBJS_NAMESPACE].adUnits)
            })), e[i.PBJS_NAMESPACE].onEvent("beforeRequestBids", (function(e) {
                o.updateAdUnits(e)
            }));
            else {
                o.log("Adding Hook on" + e[i.PBJS_NAMESPACE] + ".addAddUnits()");
                var n = e[i.PBJS_NAMESPACE];
                o.addHookOnFunction(n, !1, "addAdUnits", s.newAddAdUnitFunction)
            }
        })), o.log("Identity Only Enabled and setting config")) : o.logWarning("window.pbjs is undefined")))
    }, t.init = function(e) {
        return !!o.isObject(e) && (s.initIdHub(e), !0)
    }
}), (function(e, t, n) {
    var i = n(7),
        r = n(0);
    t.debugLogIsEnabled = !1;
    var o = Object.prototype.toString,
        a = this,
        s = i.isIdentityOnly() ? r.COMMON.IH_NAMESPACE : r.COMMON.PREBID_NAMESPACE;
    a.idsAppendedToAdUnits = !1, t.isA = function(e, t) {
        return o.call(e) === "[object " + t + "]"
    }, t.isFunction = function(e) {
        return a.isA(e, "Function")
    }, t.isString = function(e) {
        return a.isA(e, "String")
    }, t.isArray = function(e) {
        return a.isA(e, "Array")
    }, t.isNumber = function(e) {
        return a.isA(e, "Number")
    }, t.isObject = function(e) {
        return "object" == typeof e && null !== e
    }, t.isOwnProperty = function(e, t) {
        return !(!a.isObject(e) || !e.hasOwnProperty) && Object.prototype.hasOwnProperty.call(e, t)
    }, t.isUndefined = function(e) {
        return void 0 === e
    }, t.enableDebugLog = function() {
        a.debugLogIsEnabled = !0
    }, t.isDebugLogEnabled = function() {
        return a.debugLogIsEnabled
    }, t.enableVisualDebugLog = function() {
        a.debugLogIsEnabled = !0, a.visualDebugLogIsEnabled = !0
    }, t.isEmptyObject = function(e) {
        return a.isObject(e) && 0 === Object.keys(e).length
    }, t.log = function(e) {
        a.debugLogIsEnabled && console && this.isFunction(console.log) && (this.isString(e) ? console.log((new Date).getTime() + " : [OpenWrap] : " + e) : console.log(e))
    }, t.logError = function(e) {
        a.debugLogIsEnabled && console && this.isFunction(console.log) && (this.isString(e) ? console.error((new Date).getTime() + " : [OpenWrap] : " + e) : console.error(e))
    }, t.logWarning = function(e) {
        a.debugLogIsEnabled && console && this.isFunction(console.log) && (this.isString(e) ? console.warn((new Date).getTime() + " : [OpenWrap] : " + e) : console.warn(e))
    }, t.error = function(e) {
        console.log((new Date).getTime() + " : [OpenWrap] : [Error]", e)
    }, t.forEachOnObject = function(e, t) {
        if (a.isObject(e) && a.isFunction(t))
            for (var n in e) a.isOwnProperty(e, n) && t(n, e[n])
    }, t.getTopFrameOfSameDomain = function(e) {
        try {
            if (e.parent.document != e.document) return a.getTopFrameOfSameDomain(e.parent)
        } catch (e) {}
        return e
    }, t.metaInfo = {}, t.getMetaInfo = function(e) {
        var t, n = {};
        n.pageURL = "", n.refURL = "", n.protocol = "https://", n.secure = 1, n.isInIframe = a.isIframe(e);
        try {
            t = a.getTopFrameOfSameDomain(e), n.refURL = (t.refurl || t.document.referrer || "").substr(0, 512), n.pageURL = (t !== window.top && "" != t.document.referrer ? t.document.referrer : t.location.href).substr(0, 512), n.protocol = (function(e) {
                return "http:" === e.location.protocol ? (n.secure = 0, "http://") : (n.secure = 1, "https://")
            })(t)
        } catch (e) {}
        return n.pageDomain = a.getDomainFromURL(n.pageURL), a.metaInfo = n, n
    }, t.isIframe = function(e) {
        try {
            return e.self !== e.top
        } catch (e) {
            return !1
        }
    }, t.findQueryParamInURL = function(e, t) {
        return a.isOwnProperty(a.parseQueryParams(e), t)
    }, t.parseQueryParams = function(e) {
        var t = a.createDocElement(window, "a");
        t.href = e;
        var n = {};
        if (t.search) {
            var i = t.search.replace("?", "");
            i = i.split("&"), a.forEachOnArray(i, (function(e, t) {
                var i = (t = t.split("="))[0] || "",
                    r = t[1] || "";
                n[i] = r
            }))
        }
        return n
    }, t.createDocElement = function(e, t) {
        return e.document.createElement(t)
    }, t.addHookOnFunction = function(e, t, n, i) {
        var r = e;
        if (e = t ? e.__proto__ : e, a.isObject(e) && a.isFunction(e[n])) {
            var o = e[n];
            e[n] = i(r, o)
        } else a.logWarning("in assignNewDefination: oldReference is not a function")
    }, t.getUserIdConfiguration = function() {
        var e = [];
        return window[s].onSSOLogin({}), a.forEachOnObject(i.getIdentityPartners(), (function(t, n) {
            r.EXCLUDE_PARTNER_LIST.includes(t) || e.push(a.getUserIdParams(n))
        })), a.log(r.MESSAGES.IDENTITY.M4 + JSON.stringify(e)), e
    }, t.deleteCustomParams = function(e) {
        return delete e.custom, e
    }, t.getUserIdParams = function(e) {
        var t = {};
        for (var n in a.applyDataTypeChangesIfApplicable(e), a.applyCustomParamValuesfApplicable(e), e) try {
            -1 == r.EXCLUDE_IDENTITY_PARAMS.indexOf(n) && (r.TOLOWERCASE_IDENTITY_PARAMS.indexOf(n) > -1 && (e[n] = e[n].toLowerCase()), r.JSON_VALUE_KEYS.indexOf(n) > -1 && (e[n] = JSON.parse(e[n])), t = a.getNestedObjectFromString(t, ".", n, e[n]))
        } catch (e) {
            a.logWarning(r.MESSAGES.IDENTITY.M3, e)
        }
        return t && t.params && "true" == t.params.loadATS && a.initLiveRampAts(t), t && t.params && "true" == t.params.loadIDP && a.initZeoTapJs(t), t && t.params && "true" == t.params.loadLauncher && a.initLauncherJs(t), t && t.custom && "true" == t.custom.loadLaunchPad && a.initLiveRampLaunchPad(t), a.deleteCustomParams(t)
    }, t.getUserIds = function() {
        return a.isFunction(window[s].getUserIds) ? window[s].getUserIds() : (a.logWarning("getUserIds" + r.MESSAGES.IDENTITY.M6), void 0)
    }, t.getDomainFromURL = function(e) {
        var t = window.document.createElement("a");
        return t.href = e, t.hostname
    }, t.handleHook = function(e, t) {
        a.isFunction(window.IHPWT[e]) && (a.log("For Hook-name: " + e + ", calling window.IHPWT." + e + "function."), window.IHPWT[e].apply(window.IHPWT, t))
    }, t.forEachOnArray = function(e, t) {
        if (a.isArray(e) && a.isFunction(t))
            for (var n = 0, i = e.length; i > n; n++) t(n, e[n])
    }, t.getUserIdsAsEids = function() {
        return a.isFunction(window[s].getUserIdsAsEids) ? window[s].getUserIdsAsEids() : (a.logWarning("getUserIdsAsEids" + r.MESSAGES.IDENTITY.M6), void 0)
    }, t.getNestedObjectFromArray = function(e, t, n) {
        for (var i = e, r = i, o = 0; o < t.length - 1; o++) r[t[o]] || (r[t[o]] = {}), r = r[t[o]];
        return r[t[t.length - 1]] = n, i
    }, t.getNestedObjectFromString = function(e, t, n, i) {
        var r = n.split(t);
        return 1 == r.length ? e[n] = i : e = a.getNestedObjectFromArray(e, r, i), e
    }, t.getLiverampParams = function(e) {
        e.params.cssSelectors && e.params.cssSelectors.length > 0 && (e.params.cssSelectors = e.params.cssSelectors.split(","));
        var t = window[s].getUserIdentities() || {},
            n = i.isSSOEnabled() || !1,
            r = e.params.detectionMechanism,
            o = "true" === e.params.enableCustomId,
            d = {
                placementID: e.params.pid,
                storageType: e.params.storageType,
                logging: e.params.logging
            };
        switch (o && (d.accountID = e.params.accountID, d.customerIDRegex = e.params.customerIDRegex, d.detectionSubject = "customerIdentifier"), r) {
            case void 0:
            case "detect":
                d.detectionType = e.params.detectionType, d.urlParameter = e.params.urlParameter, d.cssSelectors = e.params.cssSelectors, d.detectDynamicNodes = e.params.detectDynamicNodes, d.detectionEventType = e.params.detectionEventType, e.params.triggerElements && e.params.triggerElements.length > 0 && (e.params.triggerElements = e.params.triggerElements.split(","), d.triggerElements = e.params.triggerElements);
                break;
            case "direct":
                if (d.emailHashes = void 0, window.IHPWT && window.IHPWT.OVERRIDES_SCRIPT_BASED_MODULES && window.IHPWT.OVERRIDES_SCRIPT_BASED_MODULES.includes("identityLink") || void 0 === window.IHPWT.OVERRIDES_SCRIPT_BASED_MODULES) {
                    var c = n && t.emailHash ? t.emailHash : t.pubProvidedEmailHash ? t.pubProvidedEmailHash : void 0;
                    d.emailHashes = c && [c.MD5, c.SHA1, c.SHA256] || void 0
                }
                o && a.isFunction(window[s].getUserIdentities) && void 0 !== window[s].getUserIdentities() && (d.customerID = window[s].getUserIdentities().customerID || void 0)
        }
        return d
    }, t.initLiveRampAts = function(e) {
        function t() {
            var t = document.createElement("script"),
                n = a.getLiverampParams(e);
            t.onload = function() {
                window.ats && window.ats.start(n)
            }, t.src = "https://ats.rlcdn.com/ats.js", document.body.appendChild(t)
        }
        "complete" == document.readyState ? t() : window.addEventListener("load", (function() {
            setTimeout(t, 1e3)
        }))
    }, t.getEmailHashes = function() {
        var e = window[s].getUserIdentities() || {},
            t = i.isSSOEnabled() && e.emailHash ? e.emailHash : e.pubProvidedEmailHash ? e.pubProvidedEmailHash : void 0,
            n = [];
        return a.forEachOnObject(t, (function(e, t) {
            void 0 !== t && n.push(t)
        })), n.length > 0 ? n : void 0
    }, t.initLiveRampLaunchPad = function(e) {
        var t, n = "https://launchpad-wrapper.privacymanager.io/" + e.custom.configurationId + "/launchpad-liveramp.js";
        (t = document.createElement("script")).onload = function() {
            __launchpad("addEventListener", 1, (function() {
                if ((!ats.outputCurrentConfiguration().DETECTION_MODULE_INFO || ats.outputCurrentConfiguration().ENVELOPE_MODULE_INFO.ENVELOPE_MODULE_CONFIG.startWithExternalId) && (window.IHPWT && window.IHPWT.OVERRIDES_SCRIPT_BASED_MODULES && window.IHPWT.OVERRIDES_SCRIPT_BASED_MODULES.includes("identityLink") || void 0 === window.IHPWT.OVERRIDES_SCRIPT_BASED_MODULES)) {
                    var e = a.getEmailHashes();
                    e && window.ats.setAdditionalData({
                        type: "emailHashes",
                        id: e
                    })
                }
            }), ["atsWrapperLoaded"])
        }, t.src = n, document.body.appendChild(t)
    }, t.initLauncherJs = function(e) {
        function t() {
            var t = document.createElement("script"),
                n = a.getPublinkLauncherParams(e);
            t.onload = function() {
                window.conversant.getLauncherObject = function() {
                    return n
                }, window.conversant && window.conversant.launch("publink", "start", n)
            }, t.src = "https://secure.cdn.fastclick.net/js/cnvr-launcher/latest/launcher-stub.min.js", document.body.appendChild(t)
        }
        window.cnvr_launcher_options = {
            lid: e.params.launcher_id
        }, "complete" == document.readyState ? t() : window.addEventListener("load", (function() {
            setTimeout(t, 1e3)
        }))
    }, t.getPublinkLauncherParams = function(e) {
        e.params.cssSelectors && e.params.cssSelectors.length > 0 && (e.params.cssSelectors = e.params.cssSelectors.split(","));
        var t = window[s].getUserIdentities() || {},
            n = i.isSSOEnabled() || !1,
            r = e.params.detectionMechanism,
            o = {
                apiKey: e.params.api_key,
                siteId: e.params.site_id
            };
        switch (r) {
            case void 0:
            case "detect":
                o.urlParameter = e.params.urlParameter, o.cssSelectors = e.params.cssSelectors, o.detectionSubject = "email";
                break;
            case "direct":
                if (o.emailHashes = void 0, window.IHPWT && window.IHPWT.OVERRIDES_SCRIPT_BASED_MODULES && window.IHPWT.OVERRIDES_SCRIPT_BASED_MODULES.includes("publinkId") || void 0 === window.IHPWT.OVERRIDES_SCRIPT_BASED_MODULES) {
                    var a = n && t.emailHash ? t.emailHash : t.pubProvidedEmailHash ? t.pubProvidedEmailHash : void 0;
                    o.emailHashes = a && [a.MD5, a.SHA256] || void 0
                }
        }
        return o
    }, t.initZeoTapJs = function(e) {
        function t() {
            var t = document,
                n = window,
                r = window[s].getUserIdentities() || {},
                o = i.isSSOEnabled() || !1,
                a = {};
            (window.IHPWT && window.IHPWT.OVERRIDES_SCRIPT_BASED_MODULES && window.IHPWT.OVERRIDES_SCRIPT_BASED_MODULES.includes("zeotapIdPlus") || void 0 === window.IHPWT.OVERRIDES_SCRIPT_BASED_MODULES) && (a = {
                email: o && r.emailHash ? r.emailHash.SHA256 : r.pubProvidedEmailHash ? r.pubProvidedEmailHash.SHA256 : void 0
            });
            var d = t.createElement("script");
            d.type = "text/javascript", d.crossorigin = "anonymous", d.async = !0, d.src = "https://content.zeotap.com/sdk/idp.min.js", d.onload = function() {}, t = t.getElementsByTagName("script")[0];
            var c = {
                partnerId: e.partnerId,
                allowIDP: !0,
                useConsent: i.getCCPA() || i.getGdpr(),
                checkForCMP: i.getCCPA() || i.getGdpr()
            };
            t.parentNode.insertBefore(d, t), (function(e, t) {
                for (var n = 0; n < t.length; n++) !(function(t) {
                    e[t] = function() {
                        e._q.push([t].concat(Array.prototype.slice.call(arguments, 0)))
                    }
                })(t[n])
            })(t = n.zeotap || {
                _q: [],
                _qcmp: []
            }, ["callMethod"]), n.zeotap = t, n.zeotap.callMethod("init", c), n.zeotap.callMethod("setUserIdentities", a, !0)
        }
        "complete" == document.readyState ? t() : window.addEventListener("load", (function() {
            setTimeout(t, 1e3)
        }))
    }, t.updateAdUnits = function(e) {
        a.isArray(e) ? e.forEach((function(e) {
            e.bids.forEach((function(e) {
                a.updateUserIds(e)
            }))
        })) : a.isEmptyObject(e) || e.bids.forEach((function(e) {
            a.updateUserIds(e)
        }))
    }, t.updateUserIds = function(e) {
        if (a.isUndefined(e.userId) ? e.userId = a.getUserIds() : e.userId && (e.userId = Object.assign(e.userId, a.getUserIds())), a.isUndefined(e.userIdAsEids)) e.userIdAsEids = a.getUserIdsAsEids();
        else if (a.isArray(e.userIdAsEids)) {
            var t = new Set,
                n = e.userIdAsEids.concat(a.getUserIdsAsEids());
            a.isArray(n) && n.length > 0 && (n = n.filter((function(e) {
                if (e.source) {
                    if (t.has(e.source)) return !1;
                    t.add(e.source)
                }
                return !0
            }))), e.userIdAsEids = n
        }
    }, t.applyDataTypeChangesIfApplicable = function(e) {
        var t;
        if (e.name in r.SPECIAL_CASE_ID_PARTNERS)
            for (partnerName in r.SPECIAL_CASE_ID_PARTNERS)
                if (partnerName === e.name)
                    for (key in r.SPECIAL_CASE_ID_PARTNERS[partnerName]) {
                        var n = e[key];
                        switch (r.SPECIAL_CASE_ID_PARTNERS[partnerName][key]) {
                            case "number":
                                n && "number" != typeof n && (t = parseInt(n), isNaN(t) ? a.logError(partnerName + ": Invalid parameter value '" + n + "' for parameter " + key) : e[key] = t);
                                break;
                            case "array":
                                if (n)
                                    if ("string" == typeof n) {
                                        var i = n.split(",").map((function(e) {
                                            return e.trim()
                                        }));
                                        i.length > 0 && (e[key] = i)
                                    } else "number" == typeof n && (e[key] = [n]);
                                break;
                            case "customObject":
                                if (n && "params.requestedAttributesOverrides" === key) try {
                                    e[key] = JSON.parse(n)
                                } catch (e) {
                                    a.logError("Error parsing requestedAttributesOverrides for partner ", partnerName)
                                }
                                break;
                            default:
                                return
                        }
                    }
    }, t.applyCustomParamValuesfApplicable = function(e) {
        if (e.name in r.ID_PARTNERS_CUSTOM_VALUES)
            for (var t = r.ID_PARTNERS_CUSTOM_VALUES[e.name], n = 0; n < t.length; n++) e[t[n].key] || (e[t[n].key] = t[n].value)
    }, t.getOWConfig = function() {
        return {
            openwrap_version: i[r.COMMON.OWVERSION],
            prebid_version: i[r.COMMON.PBVERSION],
            profileId: i.getProfileID(),
            profileVersionId: i.getProfileDisplayVersionID()
        }
    }, t.deepMerge = function(e, t, n) {
        if (n = n || "source", a.isArray(e) && a.isArray(t)) {
            var i = [].concat(e);
            return t.forEach((function(e) {
                var t = !1;
                i.forEach((function(r, o) {
                    r[n] === e[n] && (i[o] = a.deepMerge(r, e), t = !0)
                })), t || i.push(e)
            })), i
        }
        if (a.isObject(e) && a.isObject(t)) {
            var r = Object.assign({}, e);
            return Object.keys(t).forEach((function(e) {
                r[e] = r[e] && "object" == typeof r[e] && "object" == typeof t[e] ? a.deepMerge(r[e], t[e]) : t[e]
            })), r
        }
        return t
    }
}), (function() {
    !(function(e) {
        function t(i) {
            if (n[i]) return n[i].exports;
            var r = n[i] = {
                i: i,
                l: !1,
                exports: {}
            };
            return e[i].call(r.exports, r, r.exports, t), r.l = !0, r.exports
        }
        var n = {};
        t.m = e, t.c = n, t.d = function(e, n, i) {
            t.o(e, n) || Object.defineProperty(e, n, {
                configurable: !1,
                enumerable: !0,
                get: i
            })
        }, t.n = function(e) {
            var n = e && e.__esModule ? function() {
                return e.default
            } : function() {
                return e
            };
            return t.d(n, "a", n), n
        }, t.o = function(e, t) {
            return Object.prototype.hasOwnProperty.call(e, t)
        }, t.p = "", t(t.s = 1)
    })([(function(e, t) {
        "use strict";
        Object.defineProperty(t, "__esModule", {
            value: !0
        }), t.getEmptyIframe = function(e, t) {
            var n = document.createElement("iframe");
            return n.setAttribute("frameborder", 0), n.setAttribute("scrolling", "no"), n.setAttribute("marginheight", 0), n.setAttribute("marginwidth", 0), n.setAttribute("TOPMARGIN", 0), n.setAttribute("LEFTMARGIN", 0), n.setAttribute("allowtransparency", "true"), n.setAttribute("width", t), n.setAttribute("height", e), n
        }, t.insertElement = function(e, t, n) {
            var i;
            t = t || document, i = n ? t.getElementsByTagName(n) : t.getElementsByTagName("head");
            try {
                (i = i.length ? i : t.getElementsByTagName("body")).length && (i = i[0]).insertBefore(e, i.firstChild)
            } catch (e) {}
        }
    }), (function(e, t, n) {
        "use strict";
        var i = n(2),
            r = n(5);
        window.ucTag = window.ucTag || {};
        var o = r.newEnvironment(window),
            a = i.newRenderingManager(window, o);
        window.ucTag.renderAd = a.renderAd
    }), (function(e, t, n) {
        "use strict";

        function i() {
            if ("function" != typeof WeakMap) return null;
            var e = new WeakMap;
            return i = function() {
                return e
            }, e
        }

        function r(e) {
            if (e && e.__esModule) return e;
            var t = i();
            if (t && t.has(e)) return t.get(e);
            var n = {};
            if (null != e) {
                var r = Object.defineProperty && Object.getOwnPropertyDescriptor;
                for (var o in e)
                    if (Object.prototype.hasOwnProperty.call(e, o)) {
                        var a = r ? Object.getOwnPropertyDescriptor(e, o) : null;
                        a && (a.get || a.set) ? Object.defineProperty(n, o, a) : n[o] = e[o]
                    }
            }
            return n.default = e, t && t.set(e, n), n
        }
        Object.defineProperty(t, "__esModule", {
            value: !0
        }), t.newRenderingManager = function(e, t) {
            function n(n) {
                if (n) {
                    var i = n.split("x").map(Number);
                    !(function(n, i) {
                        if (t.isSafeFrame()) {
                            var r = e.innerWidth,
                                o = e.innerHeight;
                            r === n && o === i || (e.$sf.ext.register(n, i, (function() {
                                var t = n - r,
                                    a = i - o;
                                e.$sf.ext.expand({
                                    r: t,
                                    b: a,
                                    push: !0
                                })
                            })), e.parent.postMessage({
                                sentinel: "amp",
                                type: "embed-size",
                                width: n,
                                height: i
                            }, "*"))
                        }
                    })(i[0], i[1])
                } else console.log("Targeting key hb_size not found to resize creative")
            }

            function i(t, i, a, c, u, l) {
                var p = 2 < arguments.length && void 0 !== a ? a : "",
                    g = 3 < arguments.length ? c : void 0,
                    f = 4 < arguments.length ? u : void 0,
                    m = 5 < arguments.length ? l : void 0,
                    E = "Prebid_";
                if (p.substr(0, E.length) === E) !(function(t) {
                    var n = e.localStorage.getItem(t);
                    r(!0)(n)
                })(p), n(g);
                else {
                    var I = "".concat(function(e, t) {
                        var n = void 0 === t || "" === t ? d : t;
                        return "https://".concat(void 0 === e || "" === e ? s : e).concat(n)
                    }(t, i), "?uuid=").concat(p);
                    n(g), o.sendRequest(I, r(m, f))
                }
            }

            function r(t, n) {
                return function(i) {
                    var r = (function(e) {
                            var t;
                            try {
                                t = JSON.parse(e)
                            } catch (e) {
                                console.log("Error parsing response from cache host: ".concat(e))
                            }
                            return t
                        })(i),
                        s = r.price || n,
                        d = o.getCreativeCommentMarkup(r),
                        u = r.width ? r.width : r.w,
                        l = r.height ? r.height : r.h;
                    if (r.wurl && o.triggerPixel(decodeURIComponent(r.wurl)), r.adm) {
                        if (r.adm = s ? r.adm.replace("${AUCTION_PRICE}", s) : r.adm.replace("${AUCTION_PRICE}", ""), d += t ? c(r.adm, u, l) : r.adm, r.nurl && (d += o.createTrackPixelHtml(decodeURIComponent(r.nurl))), r.burl) {
                            var p = function() {
                                o.triggerPixel(r.burl)
                            };
                            t ? o.loadScript(e, "mraid.js", (function() {
                                !(function(t) {
                                    function n(e) {
                                        e > 0 && (mraid.removeEventListener("exposureChange", n), t())
                                    }

                                    function i(e) {
                                        e && (mraid.removeEventListener("viewableChange", i), t())
                                    }

                                    function r() {
                                        e.MRAID_ENV && 3 <= parseFloat(e.MRAID_ENV.version) ? mraid.addEventListener("exposureChange", n) : e.MRAID_ENV && parseFloat(e.MRAID_ENV.version) < 3 && (mraid.isViewable() ? t() : mraid.addEventListener("viewableChange", i))
                                    }
                                    return !(!e.mraid || !e.MRAID_ENV || ("loading" == mraid.getState() ? mraid.addEventListener("ready", (function o() {
                                        mraid.removeEventListener("ready", o), r()
                                    })) : r(), 0))
                                })(p) && p()
                            }), p) : p()
                        }
                        o.writeAdHtml(d)
                    } else if (r.nurl)
                        if (t) d += c(o.loadScript(e, r.nurl).outerHTML, u, l), o.writeAdHtml(d);
                        else {
                            var g = r.nurl,
                                f = o.getCreativeComment(r);
                            a.insertElement(f, document, "body"), o.writeAdUrl(g, u, l)
                        }
                }
            }

            function c(e, t, n) {
                var i = o.getUUID();
                return '<div id="'.concat(i, '" style="border-style: none; position: absolute; width:100%; height:100%;">\n      <div id="').concat(i, '_inner" style="margin: 0 auto; width:').concat(t, "px; height:").concat(n, 'px; position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%);">').concat(e, "</div>\n      </div>")
            }
            return {
                renderAd: function(n, r) {
                    var s = o.transformAuctionTargetingData(r);
                    t.isMobileApp(s.env) ? i(s.cacheHost, s.cachePath, s.uuid, s.size, s.hbPb, !0) : t.isAmp(s.uuid) ? i(s.cacheHost, s.cachePath, s.uuid, s.size, s.hbPb) : t.canLocatePrebid() ? (function(t, n) {
                        for (var i = e, r = 0; 10 > r; r++)
                            if ((i = i.parent).pbjs) try {
                                i.pbjs.renderAd(t, n);
                                break
                            } catch (t) {
                                continue
                            }
                    })(n, s.adId) : (function(t, n, i) {
                        function r(n) {
                            var i = n.message ? "message" : "data",
                                r = {};
                            try {
                                r = JSON.parse(n[i])
                            } catch (n) {
                                return
                            }
                            var o = n.origin || n.originalEvent.origin;
                            if (r.message && "Prebid Response" === r.message && p === o && r.adId === t && (r.ad || r.adUrl)) {
                                var s = e.document.body,
                                    d = r.ad,
                                    c = r.adUrl,
                                    u = r.width,
                                    l = r.height;
                                if ("video" === r.mediaType) console.log("Error trying to write ad.");
                                else if (d) {
                                    var g = a.getEmptyIframe(r.height, r.width);
                                    s.appendChild(g), g.contentDocument.open(), g.contentDocument.write(d), g.contentDocument.close()
                                } else if (c) {
                                    var f = a.getEmptyIframe(l, u);
                                    f.style.display = "inline", f.style.overflow = "hidden", f.src = c, a.insertElement(f, document, "body")
                                } else console.log("Error trying to write ad. No ad for bid response id: ".concat(id))
                            }
                        }
                        var s, d = 1 < arguments.length && void 0 !== n ? n : "",
                            c = 2 < arguments.length ? i : void 0,
                            u = e.location,
                            l = o.parseUrl(c),
                            p = l.protocol + "://" + l.host,
                            g = d || e.location.hostname,
                            f = u.protocol + "//" + g;
                        e.addEventListener("message", r, !1), s = JSON.stringify({
                            message: "Prebid Request",
                            adId: t,
                            adServerDomain: f
                        }), e.parent.postMessage(s, p)
                    })(s.adId, s.adServerDomain, s.pubUrl)
                }
            }
        };
        var o = r(n(3)),
            a = r(n(0)),
            s = "prebid.adnxs.com",
            d = "/pbc/v1/cache"
    }), (function(e, t, n) {
        "use strict";

        function i(e, t) {
            return Object.prototype.toString.call(e) === "[object " + t + "]"
        }

        function r(e) {
            return i(e, "String")
        }
        Object.defineProperty(t, "__esModule", {
            value: !0
        }), t.triggerPixel = function(e, t) {
            var n = new Image;
            t && "function" == typeof t && (n.addEventListener("load", t), n.addEventListener("error", t)), n.src = e
        }, t.createTrackPixelHtml = function(e) {
            if (!e) return "";
            var t = encodeURI(e);
            return '<div style="position:absolute;left:0px;top:0px;visibility:hidden;"><img src="'.concat(t, '"></div>')
        }, t.writeAdUrl = function(e, t, n) {
            var i = o.getEmptyIframe(n, t);
            i.src = e, document.body.appendChild(i)
        }, t.writeAdHtml = function(e) {
            a(document.body, e, {
                error: console.error
            })
        }, t.sendRequest = function(e, t) {
            var n = new XMLHttpRequest;
            n.addEventListener("load", (function() {
                t(n.responseText)
            })), n.open("GET", e), n.send()
        }, t.getUUID = function() {
            var e = (new Date).getTime();
            return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (function(t) {
                var n = (e + 16 * Math.random()) % 16 | 0;
                return e = Math.floor(e / 16), ("x" === t ? n : 3 & n | 8).toString(16)
            }))
        }, t.loadScript = function(e, t, n, i) {
            var r = e.document,
                o = r.createElement("script");
            o.type = "text/javascript", n && "function" == typeof n && (o.readyState ? o.onreadystatechange = function() {
                "loaded" !== o.readyState && "complete" !== o.readyState || (o.onreadystatechange = null, n())
            } : o.onload = function() {
                n()
            }), i && "function" == typeof i && (o.onerror = function() {
                i()
            }), o.src = t;
            var a = r.getElementsByTagName("head");
            return (a = a.length ? a : r.getElementsByTagName("body")).length && (a = a[0]).insertBefore(o, a.firstChild), o
        }, t.getCreativeComment = function(e) {
            return document.createComment("Creative ".concat(e.crid, " served by Prebid.js Header Bidding"))
        }, t.getCreativeCommentMarkup = function(e) {
            var n = t.getCreativeComment(e),
                i = document.createElement("div");
            return i.appendChild(n), i.innerHTML
        }, t.transformAuctionTargetingData = function(e) {
            function t(t) {
                return !(!e[t] || !(function(e) {
                    return i(e, "Object")
                }(e[t]) && 0 < Object.keys(e[t]).length || r(e[t]) && "" !== e[t]))
            }
            var n = {
                    hb_adid: "adId",
                    hb_cache_host: "cacheHost",
                    hb_cache_path: "cachePath",
                    hb_cache_id: "uuid",
                    hb_format: "mediaType",
                    hb_env: "env",
                    hb_size: "size",
                    hb_pb: "hbPb"
                },
                o = {},
                a = {};
            return t("targetingMap") ? a = (function(e) {
                var t = {};
                return Object.keys(e).forEach((function(n) {
                    Array.isArray(e[n]) && 0 < e[n].length && (t[n] = e[n][0])
                })), t
            })(e.targetingMap) : t("targetingKeywords") && (a = (function(e) {
                var t = {},
                    n = e.split(",");
                return 0 < n.length && n.forEach((function(e) {
                    var n = e.split(":");
                    if (2 === n.length) {
                        var i = n[0],
                            r = n[1];
                        t[i] = r
                    }
                })), t
            })(e.targetingKeywords)), (function(e) {
                Object.keys(e).forEach((function(t) {
                    o[n[t] || t] = e[t]
                }))
            })(a), Object.keys(e).forEach((function(t) {
                "targetingMap" !== t && "targetingKeywords" !== t && r(e[t]) && "" !== e[t] && (o[t] = e[t])
            })), o
        }, t.parseUrl = function(e) {
            var t = document.createElement("a");
            return t.href = decodeURIComponent(e), {
                href: t.href,
                protocol: (t.protocol || "").replace(/:$/, ""),
                hostname: t.hostname,
                port: +t.port,
                pathname: t.pathname.replace(/^(?!\/)/, "/"),
                hash: (t.hash || "").replace(/^#/, ""),
                host: (t.host || window.location.host).replace(/:(443|80)$/, "")
            }
        };
        var o = (function(e) {
                if (e && e.__esModule) return e;
                var t = (function() {
                    if ("function" != typeof WeakMap) return null;
                    var e = new WeakMap;
                    return e
                })();
                if (t && t.has(e)) return t.get(e);
                var n = {};
                if (null != e) {
                    var i = Object.defineProperty && Object.getOwnPropertyDescriptor;
                    for (var r in e)
                        if (Object.prototype.hasOwnProperty.call(e, r)) {
                            var o = i ? Object.getOwnPropertyDescriptor(e, r) : null;
                            o && (o.get || o.set) ? Object.defineProperty(n, r, o) : n[r] = e[r]
                        }
                }
                return n.default = e, t && t.set(e, n), n
            })(n(0)),
            a = n(4)
    }), (function(e) {
        var t;
        t = function() {
            function e(i) {
                if (n[i]) return n[i].exports;
                var r = n[i] = {
                    exports: {},
                    id: i,
                    loaded: !1
                };
                return t[i].call(r.exports, r, r.exports, e), r.loaded = !0, r.exports
            }
            return n = {}, e.m = t = [function(e, t, n) {
                "use strict";
                var i, r = (i = n(1)) && i.__esModule ? i : {
                    "default": i
                };
                e.exports = r.default
            }, function(e, t, n) {
                "use strict";

                function i() {}

                function r(e, t, n) {
                    if (d.isFunction(n)) n = {
                        done: n
                    };
                    else if ("clear" === n) return l = [], p = null, void(u = 0);
                    n = d.defaults(n, c);
                    var a = [e = /^#/.test(e) ? window.document.getElementById(e.substr(1)) : e.jquery ? e[0] : e, t, n];
                    return e.postscribe = {
                        cancel: function() {
                            a.stream ? a.stream.abort() : a[1] = i
                        }
                    }, n.beforeEnqueue(a), l.push(a), p || (function g() {
                        var e = l.shift();
                        if (e) {
                            var t = d.last(e);
                            t.afterDequeue(), e.stream = function(e, t, n) {
                                function a(e) {
                                    e = n.beforeWrite(e), p.write(e), n.afterWrite(e)
                                }(p = new s.default(e, n)).id = u++, p.name = n.name || p.id, r.streams[p.name] = p;
                                var d = e.ownerDocument,
                                    c = {
                                        close: d.close,
                                        open: d.open,
                                        write: d.write,
                                        writeln: d.writeln
                                    };
                                o(d, {
                                    close: i,
                                    open: i,
                                    write: function() {
                                        for (var e = arguments.length, t = Array(e), n = 0; e > n; n++) t[n] = arguments[n];
                                        return a(t.join(""))
                                    },
                                    writeln: function() {
                                        for (var e = arguments.length, t = Array(e), n = 0; e > n; n++) t[n] = arguments[n];
                                        return a(t.join("") + "\n")
                                    }
                                });
                                var l = p.win.onerror || i;
                                return p.win.onerror = function(e, t, i) {
                                    n.error({
                                        msg: e + " - " + t + ": " + i
                                    }), l.apply(p.win, [e, t, i])
                                }, p.write(t, (function() {
                                    o(d, c), p.win.onerror = l, n.done(), p = null, g()
                                })), p
                            }.apply(void 0, e), t.afterStreamStart()
                        }
                    })(), e.postscribe
                }
                t.__esModule = !0;
                var o = Object.assign || function(e) {
                    for (var t = 1; t < arguments.length; t++) {
                        var n = arguments[t];
                        for (var i in n) Object.prototype.hasOwnProperty.call(n, i) && (e[i] = n[i])
                    }
                    return e
                };
                t.default = r;
                var a, s = (a = n(2)) && a.__esModule ? a : {
                        "default": a
                    },
                    d = (function(e) {
                        if (e && e.__esModule) return e;
                        var t = {};
                        if (null != e)
                            for (var n in e) Object.prototype.hasOwnProperty.call(e, n) && (t[n] = e[n]);
                        return t.default = e, t
                    })(n(4)),
                    c = {
                        afterAsync: i,
                        afterDequeue: i,
                        afterStreamStart: i,
                        afterWrite: i,
                        autoFix: !0,
                        beforeEnqueue: i,
                        beforeWriteToken: function(e) {
                            return e
                        },
                        beforeWrite: function(e) {
                            return e
                        },
                        done: i,
                        error: function(e) {
                            throw new Error(e.msg)
                        },
                        releaseAsync: !1
                    },
                    u = 0,
                    l = [],
                    p = null;
                o(r, {
                    streams: {},
                    queue: l,
                    WriteStream: s.default
                })
            }, function(e, t, n) {
                "use strict";

                function i(e, t) {
                    var n = u + t,
                        i = e.getAttribute(n);
                    return c.existy(i) ? String(i) : i
                }

                function r(e, t, n) {
                    var i = 2 < arguments.length && void 0 !== n ? n : null,
                        r = u + t;
                    c.existy(i) && "" !== i ? e.setAttribute(r, i) : e.removeAttribute(r)
                }

                function o(e) {
                    var t = 1 < arguments.length && void 0 !== arguments[1] ? arguments[1] : {};
                    !(function(e, t) {
                        if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
                    })(this, o), this.root = e, this.options = t, this.doc = e.ownerDocument, this.win = this.doc.defaultView || this.doc.parentWindow, this.parser = new d.default("", {
                        autoFix: t.autoFix
                    }), this.actuals = [e], this.proxyHistory = "", this.proxyRoot = this.doc.createElement(e.nodeName), this.scriptStack = [], this.writeQueue = [], r(this.proxyRoot, "proxyof", 0)
                }
                t.__esModule = !0;
                var a, s = Object.assign || function(e) {
                        for (var t = 1; t < arguments.length; t++) {
                            var n = arguments[t];
                            for (var i in n) Object.prototype.hasOwnProperty.call(n, i) && (e[i] = n[i])
                        }
                        return e
                    },
                    d = (a = n(3)) && a.__esModule ? a : {
                        "default": a
                    },
                    c = (function(e) {
                        if (e && e.__esModule) return e;
                        var t = {};
                        if (null != e)
                            for (var n in e) Object.prototype.hasOwnProperty.call(e, n) && (t[n] = e[n]);
                        return t.default = e, t
                    })(n(4)),
                    u = "data-ps-",
                    l = "ps-style",
                    p = "ps-script",
                    g = (o.prototype.write = function() {
                        var e;
                        for ((e = this.writeQueue).push.apply(e, arguments); !this.deferredRemote && this.writeQueue.length;) {
                            var t = this.writeQueue.shift();
                            c.isFunction(t) ? this._callFunction(t) : this._writeImpl(t)
                        }
                    }, o.prototype._callFunction = function(e) {
                        var t = {
                            type: "function",
                            value: e.name || e.toString()
                        };
                        this._onScriptStart(t), e.call(this.win, this.doc), this._onScriptDone(t)
                    }, o.prototype._writeImpl = function(e) {
                        this.parser.append(e);
                        for (var t = void 0, n = void 0, i = void 0, r = [];
                            (t = this.parser.readToken()) && !(n = c.isScript(t)) && !(i = c.isStyle(t));)(t = this.options.beforeWriteToken(t)) && r.push(t);
                        0 < r.length && this._writeStaticTokens(r), n && this._handleScriptToken(t), i && this._handleStyleToken(t)
                    }, o.prototype._writeStaticTokens = function(e) {
                        var t = this._buildChunk(e);
                        return t.actual ? (t.html = this.proxyHistory + t.actual, this.proxyHistory += t.proxy, this.proxyRoot.innerHTML = t.html, this._walkChunk(), t) : null
                    }, o.prototype._buildChunk = function(e) {
                        for (var t = this.actuals.length, n = [], i = [], r = [], o = e.length, a = 0; o > a; a++) {
                            var s = e[a],
                                d = s.toString();
                            if (n.push(d), s.attrs) {
                                if (!/^noscript$/i.test(s.tagName)) {
                                    var c = t++;
                                    i.push(d.replace(/(\/?>)/, " " + u + "id=" + c + " $1")), s.attrs.id !== p && s.attrs.id !== l && r.push("atomicTag" === s.type ? "" : "<" + s.tagName + " " + u + "proxyof=" + c + (s.unary ? " />" : ">"))
                                }
                            } else i.push(d), r.push("endTag" === s.type ? d : "")
                        }
                        return {
                            tokens: e,
                            raw: n.join(""),
                            actual: i.join(""),
                            proxy: r.join("")
                        }
                    }, o.prototype._walkChunk = function() {
                        for (var e = void 0, t = [this.proxyRoot]; c.existy(e = t.shift());) {
                            var n = 1 === e.nodeType;
                            if (!n || !i(e, "proxyof")) {
                                n && r(this.actuals[i(e, "id")] = e, "id");
                                var o = e.parentNode && i(e.parentNode, "proxyof");
                                o && this.actuals[o].appendChild(e)
                            }
                            t.unshift.apply(t, c.toArray(e.childNodes))
                        }
                    }, o.prototype._handleScriptToken = function(e) {
                        var t = this,
                            n = this.parser.clear();
                        n && this.writeQueue.unshift(n), e.src = e.attrs.src || e.attrs.SRC, (e = this.options.beforeWriteToken(e)) && (e.src && this.scriptStack.length ? this.deferredRemote = e : this._onScriptStart(e), this._writeScriptToken(e, (function() {
                            t._onScriptDone(e)
                        })))
                    }, o.prototype._handleStyleToken = function(e) {
                        var t = this.parser.clear();
                        t && this.writeQueue.unshift(t), e.type = e.attrs.type || e.attrs.TYPE || "text/css", (e = this.options.beforeWriteToken(e)) && this._writeStyleToken(e), t && this.write()
                    }, o.prototype._writeStyleToken = function(e) {
                        var t = this._buildStyle(e);
                        this._insertCursor(t, l), e.content && (t.styleSheet && !t.sheet ? t.styleSheet.cssText = e.content : t.appendChild(this.doc.createTextNode(e.content)))
                    }, o.prototype._buildStyle = function(e) {
                        var t = this.doc.createElement(e.tagName);
                        return t.setAttribute("type", e.type), c.eachKey(e.attrs, (function(e, n) {
                            t.setAttribute(e, n)
                        })), t
                    }, o.prototype._insertCursor = function(e, t) {
                        this._writeImpl('<span id="' + t + '"/>');
                        var n = this.doc.getElementById(t);
                        n && n.parentNode.replaceChild(e, n)
                    }, o.prototype._onScriptStart = function(e) {
                        e.outerWrites = this.writeQueue, this.writeQueue = [], this.scriptStack.unshift(e)
                    }, o.prototype._onScriptDone = function(e) {
                        e === this.scriptStack[0] ? (this.scriptStack.shift(), this.write.apply(this, e.outerWrites), !this.scriptStack.length && this.deferredRemote && (this._onScriptStart(this.deferredRemote), this.deferredRemote = null)) : this.options.error({
                            msg: "Bad script nesting or script finished twice"
                        })
                    }, o.prototype._writeScriptToken = function(e, t) {
                        var n = this._buildScript(e),
                            i = this._shouldRelease(n),
                            r = this.options.afterAsync;
                        e.src && (n.src = e.src, this._scriptLoadHandler(n, i ? r : function() {
                            t(), r()
                        }));
                        try {
                            this._insertCursor(n, p), n.src && !i || t()
                        } catch (e) {
                            this.options.error(e), t()
                        }
                    }, o.prototype._buildScript = function(e) {
                        var t = this.doc.createElement(e.tagName);
                        return c.eachKey(e.attrs, (function(e, n) {
                            t.setAttribute(e, n)
                        })), e.content && (t.text = e.content), t
                    }, o.prototype._scriptLoadHandler = function(e, t) {
                        function n() {
                            e = e.onload = e.onreadystatechange = e.onerror = null
                        }

                        function i() {
                            n(), null != t && t(), t = null
                        }

                        function r(e) {
                            n(), a(e), null != t && t(), t = null
                        }

                        function o(e, t) {
                            var n = e["on" + t];
                            null != n && (e["_on" + t] = n)
                        }
                        var a = this.options.error;
                        o(e, "load"), o(e, "error"), s(e, {
                            onload: function() {
                                if (e._onload) try {
                                    e._onload.apply(this, Array.prototype.slice.call(arguments, 0))
                                } catch (t) {
                                    r({
                                        msg: "onload handler failed " + t + " @ " + e.src
                                    })
                                }
                                i()
                            },
                            onerror: function() {
                                if (e._onerror) try {
                                    e._onerror.apply(this, Array.prototype.slice.call(arguments, 0))
                                } catch (t) {
                                    return void r({
                                        msg: "onerror handler failed " + t + " @ " + e.src
                                    })
                                }
                                r({
                                    msg: "remote script failed " + e.src
                                })
                            },
                            onreadystatechange: function() {
                                /^(loaded|complete)$/.test(e.readyState) && i()
                            }
                        })
                    }, o.prototype._shouldRelease = function(e) {
                        return !/^script$/i.test(e.nodeName) || !!(this.options.releaseAsync && e.src && e.hasAttribute("async"))
                    }, o);
                t.default = g
            }, function(e) {
                var t;
                t = function() {
                    function e(i) {
                        if (n[i]) return n[i].exports;
                        var r = n[i] = {
                            exports: {},
                            id: i,
                            loaded: !1
                        };
                        return t[i].call(r.exports, r, r.exports, e), r.loaded = !0, r.exports
                    }
                    return n = {}, e.m = t = [function(e, t, n) {
                        "use strict";
                        var i, r = (i = n(1)) && i.__esModule ? i : {
                            "default": i
                        };
                        e.exports = r.default
                    }, function(e, t, n) {
                        "use strict";

                        function i(e) {
                            if (e && e.__esModule) return e;
                            var t = {};
                            if (null != e)
                                for (var n in e) Object.prototype.hasOwnProperty.call(e, n) && (t[n] = e[n]);
                            return t.default = e, t
                        }

                        function r() {
                            var e = this,
                                t = 0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : "",
                                n = 1 < arguments.length && void 0 !== arguments[1] ? arguments[1] : {};
                            !(function(e, t) {
                                if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
                            })(this, r), this.stream = t;
                            var i = !1,
                                o = {};
                            for (var s in a) a.hasOwnProperty(s) && (n.autoFix && (o[s + "Fix"] = !0), i = i || o[s + "Fix"]);
                            i ? (this._readToken = d.default(this, o, (function() {
                                return e._readTokenImpl()
                            })), this._peekToken = d.default(this, o, (function() {
                                return e._peekTokenImpl()
                            }))) : (this._readToken = this._readTokenImpl, this._peekToken = this._peekTokenImpl)
                        }
                        t.__esModule = !0;
                        var o, a = i(n(2)),
                            s = i(n(3)),
                            d = (o = n(6)) && o.__esModule ? o : {
                                "default": o
                            },
                            c = n(5),
                            u = {
                                comment: /^<!--/,
                                endTag: /^<\//,
                                atomicTag: /^<\s*(script|style|noscript|iframe|textarea)[\s\/>]/i,
                                startTag: /^</,
                                chars: /^[^<]/
                            },
                            l = (r.prototype.append = function(e) {
                                this.stream += e
                            }, r.prototype.prepend = function(e) {
                                this.stream = e + this.stream
                            }, r.prototype._readTokenImpl = function() {
                                var e = this._peekTokenImpl();
                                return e ? (this.stream = this.stream.slice(e.length), e) : void 0
                            }, r.prototype._peekTokenImpl = function() {
                                for (var e in u)
                                    if (u.hasOwnProperty(e) && u[e].test(this.stream)) {
                                        var t = s[e](this.stream);
                                        if (t) return "startTag" === t.type && /script|style/i.test(t.tagName) ? null : (t.text = this.stream.substr(0, t.length), t)
                                    }
                            }, r.prototype.peekToken = function() {
                                return this._peekToken()
                            }, r.prototype.readToken = function() {
                                return this._readToken()
                            }, r.prototype.readTokens = function(e) {
                                for (var t = void 0; t = this.readToken();)
                                    if (e[t.type] && !1 === e[t.type](t)) return
                            }, r.prototype.clear = function() {
                                var e = this.stream;
                                return this.stream = "", e
                            }, r.prototype.rest = function() {
                                return this.stream
                            }, r);
                        for (var p in (t.default = l).tokenToString = function(e) {
                                return e.toString()
                            }, l.escapeAttributes = function(e) {
                                var t = {};
                                for (var n in e) e.hasOwnProperty(n) && (t[n] = c.escapeQuotes(e[n], null));
                                return t
                            }, l.supports = a) a.hasOwnProperty(p) && (l.browserHasFlaw = l.browserHasFlaw || !a[p] && p)
                    }, function(e, t) {
                        "use strict";
                        var n = !(t.__esModule = !0),
                            i = !1,
                            r = window.document.createElement("div");
                        try {
                            var o = "<P><I></P></I>";
                            r.innerHTML = o, t.tagSoup = n = r.innerHTML !== o
                        } catch (e) {
                            t.tagSoup = n = !1
                        }
                        try {
                            r.innerHTML = "<P><i><P></P></i></P>", t.selfClose = i = 2 === r.childNodes.length
                        } catch (e) {
                            t.selfClose = i = !1
                        }
                        r = null, t.tagSoup = n, t.selfClose = i
                    }, function(e, t, n) {
                        "use strict";

                        function i(e) {
                            var t, n, i;
                            if (-1 !== e.indexOf(">")) {
                                var s = e.match(a.startTag);
                                if (s) {
                                    var d = (t = {}, n = {}, i = s[2], s[2].replace(a.attr, (function(e, r) {
                                        arguments[2] || arguments[3] || arguments[4] || arguments[5] ? arguments[5] ? (t[arguments[5]] = "", n[arguments[5]] = !0) : t[r] = arguments[2] || arguments[3] || arguments[4] || a.fillAttr.test(r) && r || "" : t[r] = "", i = i.replace(e, "")
                                    })), {
                                        v: new o.StartTagToken(s[1], s[0].length, t, n, !!s[3], i.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, ""))
                                    });
                                    if ("object" === (void 0 === d ? "undefined" : r(d))) return d.v
                                }
                            }
                        }
                        t.__esModule = !0;
                        var r = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
                            return typeof e
                        } : function(e) {
                            return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
                        };
                        t.comment = function(e) {
                            var t = e.indexOf("-->");
                            return t >= 0 ? new o.CommentToken(e.substr(4, t - 1), t + 3) : void 0
                        }, t.chars = function(e) {
                            var t = e.indexOf("<");
                            return new o.CharsToken(t >= 0 ? t : e.length)
                        }, t.startTag = i, t.atomicTag = function(e) {
                            var t = i(e);
                            if (t) {
                                var n = e.slice(t.length);
                                if (n.match(new RegExp("</\\s*" + t.tagName + "\\s*>", "i"))) {
                                    var r = n.match(new RegExp("([\\s\\S]*?)</\\s*" + t.tagName + "\\s*>", "i"));
                                    if (r) return new o.AtomicTagToken(t.tagName, r[0].length + t.length, t.attrs, t.booleanAttrs, r[1])
                                }
                            }
                        }, t.endTag = function(e) {
                            var t = e.match(a.endTag);
                            return t ? new o.EndTagToken(t[1], t[0].length) : void 0
                        };
                        var o = n(4),
                            a = {
                                startTag: /^<([\-A-Za-z0-9_]+)((?:\s+[\w\-]+(?:\s*=?\s*(?:(?:"[^"]*")|(?:'[^']*')|[^>\s]+))?)*)\s*(\/?)>/,
                                endTag: /^<\/([\-A-Za-z0-9_]+)[^>]*>/,
                                attr: /(?:([\-A-Za-z0-9_]+)\s*=\s*(?:(?:"((?:\\.|[^"])*)")|(?:'((?:\\.|[^'])*)')|([^>\s]+)))|(?:([\-A-Za-z0-9_]+)(\s|$)+)/g,
                                fillAttr: /^(checked|compact|declare|defer|disabled|ismap|multiple|nohref|noresize|noshade|nowrap|readonly|selected)$/i
                            }
                    }, function(e, t, n) {
                        "use strict";

                        function i(e, t) {
                            if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
                        }

                        function r(e, t) {
                            i(this, r), this.type = "comment", this.length = t || (e ? e.length : 0), this.text = "", this.content = e
                        }

                        function o(e) {
                            i(this, o), this.type = "chars", this.length = e, this.text = ""
                        }

                        function a(e, t, n, r, o) {
                            i(this, a), this.type = e, this.length = n, this.text = "", this.tagName = t, this.attrs = r, this.booleanAttrs = o, this.unary = !1, this.html5Unary = !1
                        }

                        function s(e, t, n, r, o, a) {
                            i(this, s), this.type = "startTag", this.length = t, this.text = "", this.tagName = e, this.attrs = n, this.booleanAttrs = r, this.html5Unary = !1, this.unary = o, this.rest = a
                        }

                        function d(e, t, n, r, o) {
                            i(this, d), this.type = "atomicTag", this.length = t, this.text = "", this.tagName = e, this.attrs = n, this.booleanAttrs = r, this.unary = !1, this.html5Unary = !1, this.content = o
                        }

                        function c(e, t) {
                            i(this, c), this.type = "endTag", this.length = t, this.text = "", this.tagName = e
                        }
                        t.__esModule = !0, t.EndTagToken = t.AtomicTagToken = t.StartTagToken = t.TagToken = t.CharsToken = t.CommentToken = t.Token = void 0;
                        var u = n(5);
                        t.Token = function p(e, t) {
                            i(this, p), this.type = e, this.length = t, this.text = ""
                        }, t.CommentToken = (r.prototype.toString = function() {
                            return "<!--" + this.content
                        }, r), t.CharsToken = (o.prototype.toString = function() {
                            return this.text
                        }, o);
                        var l = t.TagToken = (a.formatTag = function(e, t) {
                            var n = 1 < arguments.length && void 0 !== t ? t : null,
                                i = "<" + e.tagName;
                            for (var r in e.attrs)
                                if (e.attrs.hasOwnProperty(r)) {
                                    i += " " + r;
                                    var o = e.attrs[r];
                                    void 0 !== e.booleanAttrs && void 0 !== e.booleanAttrs[r] || (i += '="' + u.escapeQuotes(o) + '"')
                                } return e.rest && (i += " " + e.rest), i += e.unary && !e.html5Unary ? "/>" : ">", null != n && (i += n + "</" + e.tagName + ">"), i
                        }, a);
                        t.StartTagToken = (s.prototype.toString = function() {
                            return l.formatTag(this)
                        }, s), t.AtomicTagToken = (d.prototype.toString = function() {
                            return l.formatTag(this, this.content)
                        }, d), t.EndTagToken = (c.prototype.toString = function() {
                            return "</" + this.tagName + ">"
                        }, c)
                    }, function(e, t) {
                        "use strict";
                        t.__esModule = !0, t.escapeQuotes = function(e) {
                            var t = 1 < arguments.length && void 0 !== arguments[1] ? arguments[1] : "";
                            return e ? e.replace(/([^"]*)"/g, (function(e, t) {
                                return /\\/.test(t) ? t + '"' : t + '\\"'
                            })) : t
                        }
                    }, function(e, t) {
                        "use strict";

                        function n(e) {
                            return e && "startTag" === e.type && (e.unary = r.test(e.tagName) || e.unary, e.html5Unary = !/\/>$/.test(e.text)), e
                        }

                        function i(e, t) {
                            var n = t.pop();
                            e.prepend("</" + n.tagName + ">")
                        }
                        t.__esModule = !0, t.default = function(e, t, r) {
                            function a() {
                                var t = (function(e, t) {
                                    var i = e.stream,
                                        r = n(t());
                                    return e.stream = i, r
                                })(e, r);
                                t && d[t.type] && d[t.type](t)
                            }
                            var s = (function() {
                                    var e = [];
                                    return e.last = function() {
                                        return this[this.length - 1]
                                    }, e.lastTagNameEq = function(e) {
                                        var t = this.last();
                                        return t && t.tagName && t.tagName.toUpperCase() === e.toUpperCase()
                                    }, e.containsTagName = function(e) {
                                        for (var t, n = 0; t = this[n]; n++)
                                            if (t.tagName === e) return !0;
                                        return !1
                                    }, e
                                })(),
                                d = {
                                    startTag: function(n) {
                                        var r = n.tagName;
                                        "TR" === r.toUpperCase() && s.lastTagNameEq("TABLE") ? (e.prepend("<TBODY>"), a()) : t.selfCloseFix && o.test(r) && s.containsTagName(r) ? s.lastTagNameEq(r) ? i(e, s) : (e.prepend("</" + n.tagName + ">"), a()) : n.unary || s.push(n)
                                    },
                                    endTag: function(n) {
                                        s.last() ? t.tagSoupFix && !s.lastTagNameEq(n.tagName) ? i(e, s) : s.pop() : t.tagSoupFix && (r(), a())
                                    }
                                };
                            return function() {
                                return a(), n(r())
                            }
                        };
                        var r = /^(AREA|BASE|BASEFONT|BR|COL|FRAME|HR|IMG|INPUT|ISINDEX|LINK|META|PARAM|EMBED)$/i,
                            o = /^(COLGROUP|DD|DT|LI|OPTIONS|P|TD|TFOOT|TH|THEAD|TR)$/i
                    }], e.c = n, e.p = "", e(0);
                    var t, n
                }, e.exports = t()
            }, function(e, t) {
                "use strict";

                function n(e) {
                    return null != e
                }

                function i(e, t, n) {
                    var i = void 0,
                        r = e && e.length || 0;
                    for (i = 0; r > i; i++) t.call(n, e[i], i)
                }

                function r(e, t, n) {
                    for (var i in e) e.hasOwnProperty(i) && t.call(n, i, e[i])
                }

                function o(e, t) {
                    return !(!e || "startTag" !== e.type && "atomicTag" !== e.type || !("tagName" in e) || !~e.tagName.toLowerCase().indexOf(t))
                }
                t.__esModule = !0;
                var a = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
                    return typeof e
                } : function(e) {
                    return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
                };
                t.existy = n, t.isFunction = function(e) {
                    return "function" == typeof e
                }, t.each = i, t.eachKey = r, t.defaults = function(e, t) {
                    return e = e || {}, r(t, (function(t, i) {
                        n(e[t]) || (e[t] = i)
                    })), e
                }, t.toArray = function(e) {
                    try {
                        return Array.prototype.slice.call(e)
                    } catch (t) {
                        var n = (function() {
                            var t = [];
                            return i(e, (function(e) {
                                t.push(e)
                            })), {
                                v: t
                            }
                        })();
                        if ("object" === (void 0 === n ? "undefined" : a(n))) return n.v
                    }
                }, t.last = function(e) {
                    return e[e.length - 1]
                }, t.isTag = o, t.isScript = function(e) {
                    return o(e, "script")
                }, t.isStyle = function(e) {
                    return o(e, "style")
                }
            }], e.c = n, e.p = "", e(0);
            var t, n
        }, e.exports = t()
    }), (function(e, t) {
        "use strict";
        Object.defineProperty(t, "__esModule", {
            value: !0
        }), t.newEnvironment = function(e) {
            function t() {
                return e.top !== e && !(function(e) {
                    try {
                        return e.top.location.toString(), !0
                    } catch (e) {
                        return !1
                    }
                })(e)
            }
            return {
                isMobileApp: function(e) {
                    return e && "mobile-app" === e
                },
                isCrossDomain: t,
                isSafeFrame: function() {
                    return !(!e.$sf || !e.$sf.ext)
                },
                isAmp: function(e) {
                    return "string" == typeof e && "" !== e && t()
                },
                canLocatePrebid: function() {
                    for (var t = !1, n = e; !t;) {
                        try {
                            if (n.pbjs) {
                                t = !0;
                                break
                            }
                        } catch (t) {}
                        if (n === window.top) break;
                        n = n.parent
                    }
                    return t
                }
            }
        }
    })])
})]);
if (typeof window.PWT === "object" && typeof window.PWT.jsLoaded === "function") {
    window.PWT.jsLoaded();
}
var i = 10;
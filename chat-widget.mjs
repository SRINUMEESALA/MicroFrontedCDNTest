import * as he from "react";
import cn, { useContext as Bn, useRef as ir, useEffect as Jr, useCallback as kn, useMemo as Pr, createElement as Ao, useState as Yn, forwardRef as Zp, useLayoutEffect as Nv, createContext as Jp, Component as Gv, Fragment as xu } from "react";
import _v, { createPortal as Mv } from "react-dom";
function Hn(e) {
  return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default") ? e.default : e;
}
var Ei = {}, ad;
function Vv() {
  if (ad) return Ei;
  ad = 1;
  var e = {}, t = _v;
  if (e.NODE_ENV === "production")
    Ei.createRoot = t.createRoot, Ei.hydrateRoot = t.hydrateRoot;
  else {
    var n = t.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;
    Ei.createRoot = function(r, i) {
      n.usingClientEntryPoint = !0;
      try {
        return t.createRoot(r, i);
      } finally {
        n.usingClientEntryPoint = !1;
      }
    }, Ei.hydrateRoot = function(r, i, a) {
      n.usingClientEntryPoint = !0;
      try {
        return t.hydrateRoot(r, i, a);
      } finally {
        n.usingClientEntryPoint = !1;
      }
    };
  }
  return Ei;
}
var Lv = Vv();
const Dv = /* @__PURE__ */ Hn(Lv);
var jv = Object.defineProperty, zv = (e, t, n) => t in e ? jv(e, t, { enumerable: !0, configurable: !0, writable: !0, value: n }) : e[t] = n, ha = (e, t, n) => zv(e, typeof t != "symbol" ? t + "" : t, n);
const Hv = {
  stringify: (e) => e ? "true" : "false",
  parse: (e) => /^[ty1-9]/i.test(e)
}, Wv = {
  stringify: (e) => e.name,
  parse: (e, t, n) => {
    const r = (() => {
      if (typeof window < "u" && e in window)
        return window[e];
      if (typeof global < "u" && e in global)
        return global[e];
    })();
    return typeof r == "function" ? r.bind(n) : void 0;
  }
}, $v = {
  stringify: (e) => JSON.stringify(e),
  parse: (e) => JSON.parse(e)
}, Xv = {
  stringify: (e) => `${e}`,
  parse: (e) => parseFloat(e)
}, Yv = {
  stringify: (e) => e,
  parse: (e) => e
}, gl = {
  string: Yv,
  number: Xv,
  boolean: Hv,
  function: Wv,
  json: $v
};
function Zv(e) {
  return e.replace(
    /([a-z0-9])([A-Z])/g,
    (t, n, r) => `${n}-${r.toLowerCase()}`
  );
}
const ma = Symbol.for("r2wc.render"), va = Symbol.for("r2wc.connected"), ai = Symbol.for("r2wc.context"), Rr = Symbol.for("r2wc.props");
function Jv(e, t, n) {
  var r, i, a;
  t.props || (t.props = e.propTypes ? Object.keys(e.propTypes) : []), t.events || (t.events = []);
  const o = Array.isArray(t.props) ? t.props.slice() : Object.keys(t.props), l = Array.isArray(t.events) ? t.events.slice() : Object.keys(t.events), u = {}, s = {}, d = {}, c = {};
  for (const h of o) {
    u[h] = Array.isArray(t.props) ? "string" : t.props[h];
    const x = Zv(h);
    d[h] = x, c[x] = h;
  }
  for (const h of l)
    s[h] = Array.isArray(t.events) ? {} : t.events[h];
  class m extends HTMLElement {
    constructor() {
      super(), ha(this, a, !0), ha(this, i), ha(this, r, {}), ha(this, "container"), t.shadow ? this.container = this.attachShadow({
        mode: t.shadow
      }) : this.container = this, this[Rr].container = this.container;
      for (const x of o) {
        const v = d[x], b = this.getAttribute(v), I = u[x], O = I ? gl[I] : null;
        O != null && O.parse && b && (this[Rr][x] = O.parse(b, v, this));
      }
      for (const x of l)
        this[Rr][x] = (v) => {
          const b = x.replace(/^on/, "").toLowerCase();
          this.dispatchEvent(
            new CustomEvent(b, { detail: v, ...s[x] })
          );
        };
    }
    static get observedAttributes() {
      return Object.keys(c);
    }
    connectedCallback() {
      this[va] = !0, this[ma]();
    }
    disconnectedCallback() {
      this[va] = !1, this[ai] && n.unmount(this[ai]), delete this[ai];
    }
    attributeChangedCallback(x, v, b) {
      const I = c[x], O = u[I], T = O ? gl[O] : null;
      I in u && T != null && T.parse && b && (this[Rr][I] = T.parse(b, x, this), this[ma]());
    }
    [(a = va, i = ai, r = Rr, ma)]() {
      this[va] && (this[ai] ? n.update(this[ai], this[Rr]) : this[ai] = n.mount(
        this.container,
        e,
        this[Rr]
      ));
    }
  }
  for (const h of o) {
    const x = d[h], v = u[h];
    Object.defineProperty(m.prototype, h, {
      enumerable: !0,
      configurable: !0,
      get() {
        return this[Rr][h];
      },
      set(b) {
        this[Rr][h] = b;
        const I = v ? gl[v] : null;
        if (I != null && I.stringify) {
          const O = I.stringify(b, x, this);
          this.getAttribute(x) !== O && this.setAttribute(x, O);
        } else
          this[ma]();
      }
    });
  }
  return m;
}
function Uv(e, t, n, r = {}) {
  function i(l, u, s) {
    const d = t.createElement(u, s);
    if ("createRoot" in n) {
      const c = n.createRoot(l);
      return c.render(d), {
        container: l,
        root: c,
        ReactComponent: u
      };
    }
    if ("render" in n)
      return n.render(d, l), {
        container: l,
        ReactComponent: u
      };
    throw new Error("Invalid ReactDOM instance provided.");
  }
  function a({ container: l, root: u, ReactComponent: s }, d) {
    const c = t.createElement(s, d);
    if (u) {
      u.render(c);
      return;
    }
    if ("render" in n) {
      n.render(c, l);
      return;
    }
  }
  function o({ container: l, root: u }) {
    if (u) {
      u.unmount();
      return;
    }
    if ("unmountComponentAtNode" in n) {
      n.unmountComponentAtNode(l);
      return;
    }
  }
  return Jv(e, r, { mount: i, unmount: o, update: a });
}
var ba = { exports: {} }, lo = {};
/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var sd;
function qv() {
  if (sd) return lo;
  sd = 1;
  var e = cn, t = Symbol.for("react.element"), n = Symbol.for("react.fragment"), r = Object.prototype.hasOwnProperty, i = e.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner, a = { key: !0, ref: !0, __self: !0, __source: !0 };
  function o(l, u, s) {
    var d, c = {}, m = null, h = null;
    s !== void 0 && (m = "" + s), u.key !== void 0 && (m = "" + u.key), u.ref !== void 0 && (h = u.ref);
    for (d in u) r.call(u, d) && !a.hasOwnProperty(d) && (c[d] = u[d]);
    if (l && l.defaultProps) for (d in u = l.defaultProps, u) c[d] === void 0 && (c[d] = u[d]);
    return { $$typeof: t, type: l, key: m, ref: h, props: c, _owner: i.current };
  }
  return lo.Fragment = n, lo.jsx = o, lo.jsxs = o, lo;
}
var uo = {}, ld;
function Qv() {
  if (ld) return uo;
  ld = 1;
  var e = {};
  /**
   * @license React
   * react-jsx-runtime.development.js
   *
   * Copyright (c) Facebook, Inc. and its affiliates.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   */
  return e.NODE_ENV !== "production" && function() {
    var t = cn, n = Symbol.for("react.element"), r = Symbol.for("react.portal"), i = Symbol.for("react.fragment"), a = Symbol.for("react.strict_mode"), o = Symbol.for("react.profiler"), l = Symbol.for("react.provider"), u = Symbol.for("react.context"), s = Symbol.for("react.forward_ref"), d = Symbol.for("react.suspense"), c = Symbol.for("react.suspense_list"), m = Symbol.for("react.memo"), h = Symbol.for("react.lazy"), x = Symbol.for("react.offscreen"), v = Symbol.iterator, b = "@@iterator";
    function I(L) {
      if (L === null || typeof L != "object")
        return null;
      var be = v && L[v] || L[b];
      return typeof be == "function" ? be : null;
    }
    var O = t.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;
    function T(L) {
      {
        for (var be = arguments.length, ze = new Array(be > 1 ? be - 1 : 0), lt = 1; lt < be; lt++)
          ze[lt - 1] = arguments[lt];
        D("error", L, ze);
      }
    }
    function D(L, be, ze) {
      {
        var lt = O.ReactDebugCurrentFrame, Gt = lt.getStackAddendum();
        Gt !== "" && (be += "%s", ze = ze.concat([Gt]));
        var Vt = ze.map(function(Pt) {
          return String(Pt);
        });
        Vt.unshift("Warning: " + be), Function.prototype.apply.call(console[L], console, Vt);
      }
    }
    var E = !1, B = !1, X = !1, U = !1, K = !1, Fe;
    Fe = Symbol.for("react.module.reference");
    function oe(L) {
      return !!(typeof L == "string" || typeof L == "function" || L === i || L === o || K || L === a || L === d || L === c || U || L === x || E || B || X || typeof L == "object" && L !== null && (L.$$typeof === h || L.$$typeof === m || L.$$typeof === l || L.$$typeof === u || L.$$typeof === s || // This needs to include all possible module reference object
      // types supported by any Flight configuration anywhere since
      // we don't know which Flight build this will end up being used
      // with.
      L.$$typeof === Fe || L.getModuleId !== void 0));
    }
    function ce(L, be, ze) {
      var lt = L.displayName;
      if (lt)
        return lt;
      var Gt = be.displayName || be.name || "";
      return Gt !== "" ? ze + "(" + Gt + ")" : ze;
    }
    function ye(L) {
      return L.displayName || "Context";
    }
    function Q(L) {
      if (L == null)
        return null;
      if (typeof L.tag == "number" && T("Received an unexpected object in getComponentNameFromType(). This is likely a bug in React. Please file an issue."), typeof L == "function")
        return L.displayName || L.name || null;
      if (typeof L == "string")
        return L;
      switch (L) {
        case i:
          return "Fragment";
        case r:
          return "Portal";
        case o:
          return "Profiler";
        case a:
          return "StrictMode";
        case d:
          return "Suspense";
        case c:
          return "SuspenseList";
      }
      if (typeof L == "object")
        switch (L.$$typeof) {
          case u:
            var be = L;
            return ye(be) + ".Consumer";
          case l:
            var ze = L;
            return ye(ze._context) + ".Provider";
          case s:
            return ce(L, L.render, "ForwardRef");
          case m:
            var lt = L.displayName || null;
            return lt !== null ? lt : Q(L.type) || "Memo";
          case h: {
            var Gt = L, Vt = Gt._payload, Pt = Gt._init;
            try {
              return Q(Pt(Vt));
            } catch {
              return null;
            }
          }
        }
      return null;
    }
    var ue = Object.assign, Ee = 0, We, $e, ht, G, Z, A, w;
    function H() {
    }
    H.__reactDisabledLog = !0;
    function $() {
      {
        if (Ee === 0) {
          We = console.log, $e = console.info, ht = console.warn, G = console.error, Z = console.group, A = console.groupCollapsed, w = console.groupEnd;
          var L = {
            configurable: !0,
            enumerable: !0,
            value: H,
            writable: !0
          };
          Object.defineProperties(console, {
            info: L,
            log: L,
            warn: L,
            error: L,
            group: L,
            groupCollapsed: L,
            groupEnd: L
          });
        }
        Ee++;
      }
    }
    function _() {
      {
        if (Ee--, Ee === 0) {
          var L = {
            configurable: !0,
            enumerable: !0,
            writable: !0
          };
          Object.defineProperties(console, {
            log: ue({}, L, {
              value: We
            }),
            info: ue({}, L, {
              value: $e
            }),
            warn: ue({}, L, {
              value: ht
            }),
            error: ue({}, L, {
              value: G
            }),
            group: ue({}, L, {
              value: Z
            }),
            groupCollapsed: ue({}, L, {
              value: A
            }),
            groupEnd: ue({}, L, {
              value: w
            })
          });
        }
        Ee < 0 && T("disabledDepth fell below zero. This is a bug in React. Please file an issue.");
      }
    }
    var re = O.ReactCurrentDispatcher, Y;
    function fe(L, be, ze) {
      {
        if (Y === void 0)
          try {
            throw Error();
          } catch (Gt) {
            var lt = Gt.stack.trim().match(/\n( *(at )?)/);
            Y = lt && lt[1] || "";
          }
        return `
` + Y + L;
      }
    }
    var ge = !1, ve;
    {
      var Te = typeof WeakMap == "function" ? WeakMap : Map;
      ve = new Te();
    }
    function J(L, be) {
      if (!L || ge)
        return "";
      {
        var ze = ve.get(L);
        if (ze !== void 0)
          return ze;
      }
      var lt;
      ge = !0;
      var Gt = Error.prepareStackTrace;
      Error.prepareStackTrace = void 0;
      var Vt;
      Vt = re.current, re.current = null, $();
      try {
        if (be) {
          var Pt = function() {
            throw Error();
          };
          if (Object.defineProperty(Pt.prototype, "props", {
            set: function() {
              throw Error();
            }
          }), typeof Reflect == "object" && Reflect.construct) {
            try {
              Reflect.construct(Pt, []);
            } catch (yn) {
              lt = yn;
            }
            Reflect.construct(L, [], Pt);
          } else {
            try {
              Pt.call();
            } catch (yn) {
              lt = yn;
            }
            L.call(Pt.prototype);
          }
        } else {
          try {
            throw Error();
          } catch (yn) {
            lt = yn;
          }
          L();
        }
      } catch (yn) {
        if (yn && lt && typeof yn.stack == "string") {
          for (var St = yn.stack.split(`
`), hn = lt.stack.split(`
`), nn = St.length - 1, rn = hn.length - 1; nn >= 1 && rn >= 0 && St[nn] !== hn[rn]; )
            rn--;
          for (; nn >= 1 && rn >= 0; nn--, rn--)
            if (St[nn] !== hn[rn]) {
              if (nn !== 1 || rn !== 1)
                do
                  if (nn--, rn--, rn < 0 || St[nn] !== hn[rn]) {
                    var Pn = `
` + St[nn].replace(" at new ", " at ");
                    return L.displayName && Pn.includes("<anonymous>") && (Pn = Pn.replace("<anonymous>", L.displayName)), typeof L == "function" && ve.set(L, Pn), Pn;
                  }
                while (nn >= 1 && rn >= 0);
              break;
            }
        }
      } finally {
        ge = !1, re.current = Vt, _(), Error.prepareStackTrace = Gt;
      }
      var dr = L ? L.displayName || L.name : "", sr = dr ? fe(dr) : "";
      return typeof L == "function" && ve.set(L, sr), sr;
    }
    function ft(L, be, ze) {
      return J(L, !1);
    }
    function je(L) {
      var be = L.prototype;
      return !!(be && be.isReactComponent);
    }
    function et(L, be, ze) {
      if (L == null)
        return "";
      if (typeof L == "function")
        return J(L, je(L));
      if (typeof L == "string")
        return fe(L);
      switch (L) {
        case d:
          return fe("Suspense");
        case c:
          return fe("SuspenseList");
      }
      if (typeof L == "object")
        switch (L.$$typeof) {
          case s:
            return ft(L.render);
          case m:
            return et(L.type, be, ze);
          case h: {
            var lt = L, Gt = lt._payload, Vt = lt._init;
            try {
              return et(Vt(Gt), be, ze);
            } catch {
            }
          }
        }
      return "";
    }
    var pt = Object.prototype.hasOwnProperty, Yt = {}, Cn = O.ReactDebugCurrentFrame;
    function kt(L) {
      if (L) {
        var be = L._owner, ze = et(L.type, L._source, be ? be.type : null);
        Cn.setExtraStackFrame(ze);
      } else
        Cn.setExtraStackFrame(null);
    }
    function gn(L, be, ze, lt, Gt) {
      {
        var Vt = Function.call.bind(pt);
        for (var Pt in L)
          if (Vt(L, Pt)) {
            var St = void 0;
            try {
              if (typeof L[Pt] != "function") {
                var hn = Error((lt || "React class") + ": " + ze + " type `" + Pt + "` is invalid; it must be a function, usually from the `prop-types` package, but received `" + typeof L[Pt] + "`.This often happens because of typos such as `PropTypes.function` instead of `PropTypes.func`.");
                throw hn.name = "Invariant Violation", hn;
              }
              St = L[Pt](be, Pt, lt, ze, null, "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED");
            } catch (nn) {
              St = nn;
            }
            St && !(St instanceof Error) && (kt(Gt), T("%s: type specification of %s `%s` is invalid; the type checker function must return `null` or an `Error` but returned a %s. You may have forgotten to pass an argument to the type checker creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and shape all require an argument).", lt || "React class", ze, Pt, typeof St), kt(null)), St instanceof Error && !(St.message in Yt) && (Yt[St.message] = !0, kt(Gt), T("Failed %s type: %s", ze, St.message), kt(null));
          }
      }
    }
    var on = Array.isArray;
    function an(L) {
      return on(L);
    }
    function Ke(L) {
      {
        var be = typeof Symbol == "function" && Symbol.toStringTag, ze = be && L[Symbol.toStringTag] || L.constructor.name || "Object";
        return ze;
      }
    }
    function Ot(L) {
      try {
        return ee(L), !1;
      } catch {
        return !0;
      }
    }
    function ee(L) {
      return "" + L;
    }
    function we(L) {
      if (Ot(L))
        return T("The provided key is an unsupported type %s. This value must be coerced to a string before before using it here.", Ke(L)), ee(L);
    }
    var Ze = O.ReactCurrentOwner, Rt = {
      key: !0,
      ref: !0,
      __self: !0,
      __source: !0
    }, Bt, Sn;
    function Wn(L) {
      if (pt.call(L, "ref")) {
        var be = Object.getOwnPropertyDescriptor(L, "ref").get;
        if (be && be.isReactWarning)
          return !1;
      }
      return L.ref !== void 0;
    }
    function Gn(L) {
      if (pt.call(L, "key")) {
        var be = Object.getOwnPropertyDescriptor(L, "key").get;
        if (be && be.isReactWarning)
          return !1;
      }
      return L.key !== void 0;
    }
    function er(L, be) {
      typeof L.ref == "string" && Ze.current;
    }
    function tr(L, be) {
      {
        var ze = function() {
          Bt || (Bt = !0, T("%s: `key` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", be));
        };
        ze.isReactWarning = !0, Object.defineProperty(L, "key", {
          get: ze,
          configurable: !0
        });
      }
    }
    function pn(L, be) {
      {
        var ze = function() {
          Sn || (Sn = !0, T("%s: `ref` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", be));
        };
        ze.isReactWarning = !0, Object.defineProperty(L, "ref", {
          get: ze,
          configurable: !0
        });
      }
    }
    var $n = function(L, be, ze, lt, Gt, Vt, Pt) {
      var St = {
        // This tag allows us to uniquely identify this as a React Element
        $$typeof: n,
        // Built-in properties that belong on the element
        type: L,
        key: be,
        ref: ze,
        props: Pt,
        // Record the component responsible for creating this element.
        _owner: Vt
      };
      return St._store = {}, Object.defineProperty(St._store, "validated", {
        configurable: !1,
        enumerable: !1,
        writable: !0,
        value: !1
      }), Object.defineProperty(St, "_self", {
        configurable: !1,
        enumerable: !1,
        writable: !1,
        value: lt
      }), Object.defineProperty(St, "_source", {
        configurable: !1,
        enumerable: !1,
        writable: !1,
        value: Gt
      }), Object.freeze && (Object.freeze(St.props), Object.freeze(St)), St;
    };
    function Rn(L, be, ze, lt, Gt) {
      {
        var Vt, Pt = {}, St = null, hn = null;
        ze !== void 0 && (we(ze), St = "" + ze), Gn(be) && (we(be.key), St = "" + be.key), Wn(be) && (hn = be.ref, er(be, Gt));
        for (Vt in be)
          pt.call(be, Vt) && !Rt.hasOwnProperty(Vt) && (Pt[Vt] = be[Vt]);
        if (L && L.defaultProps) {
          var nn = L.defaultProps;
          for (Vt in nn)
            Pt[Vt] === void 0 && (Pt[Vt] = nn[Vt]);
        }
        if (St || hn) {
          var rn = typeof L == "function" ? L.displayName || L.name || "Unknown" : L;
          St && tr(Pt, rn), hn && pn(Pt, rn);
        }
        return $n(L, St, hn, Gt, lt, Ze.current, Pt);
      }
    }
    var _r = O.ReactCurrentOwner, Mr = O.ReactDebugCurrentFrame;
    function ar(L) {
      if (L) {
        var be = L._owner, ze = et(L.type, L._source, be ? be.type : null);
        Mr.setExtraStackFrame(ze);
      } else
        Mr.setExtraStackFrame(null);
    }
    var Vr;
    Vr = !1;
    function Lr(L) {
      return typeof L == "object" && L !== null && L.$$typeof === n;
    }
    function cr() {
      {
        if (_r.current) {
          var L = Q(_r.current.type);
          if (L)
            return `

Check the render method of \`` + L + "`.";
        }
        return "";
      }
    }
    function bi(L) {
      return "";
    }
    var yi = {};
    function wi(L) {
      {
        var be = cr();
        if (!be) {
          var ze = typeof L == "string" ? L : L.displayName || L.name;
          ze && (be = `

Check the top-level render call using <` + ze + ">.");
        }
        return be;
      }
    }
    function Dr(L, be) {
      {
        if (!L._store || L._store.validated || L.key != null)
          return;
        L._store.validated = !0;
        var ze = wi(be);
        if (yi[ze])
          return;
        yi[ze] = !0;
        var lt = "";
        L && L._owner && L._owner !== _r.current && (lt = " It was passed a child from " + Q(L._owner.type) + "."), ar(L), T('Each child in a list should have a unique "key" prop.%s%s See https://reactjs.org/link/warning-keys for more information.', ze, lt), ar(null);
      }
    }
    function Kr(L, be) {
      {
        if (typeof L != "object")
          return;
        if (an(L))
          for (var ze = 0; ze < L.length; ze++) {
            var lt = L[ze];
            Lr(lt) && Dr(lt, be);
          }
        else if (Lr(L))
          L._store && (L._store.validated = !0);
        else if (L) {
          var Gt = I(L);
          if (typeof Gt == "function" && Gt !== L.entries)
            for (var Vt = Gt.call(L), Pt; !(Pt = Vt.next()).done; )
              Lr(Pt.value) && Dr(Pt.value, be);
        }
      }
    }
    function xi(L) {
      {
        var be = L.type;
        if (be == null || typeof be == "string")
          return;
        var ze;
        if (typeof be == "function")
          ze = be.propTypes;
        else if (typeof be == "object" && (be.$$typeof === s || // Note: Memo only checks outer props here.
        // Inner props are checked in the reconciler.
        be.$$typeof === m))
          ze = be.propTypes;
        else
          return;
        if (ze) {
          var lt = Q(be);
          gn(ze, L.props, "prop", lt, L);
        } else if (be.PropTypes !== void 0 && !Vr) {
          Vr = !0;
          var Gt = Q(be);
          T("Component %s declared `PropTypes` instead of `propTypes`. Did you misspell the property assignment?", Gt || "Unknown");
        }
        typeof be.getDefaultProps == "function" && !be.getDefaultProps.isReactClassApproved && T("getDefaultProps is only used on classic React.createClass definitions. Use a static property named `defaultProps` instead.");
      }
    }
    function ei(L) {
      {
        for (var be = Object.keys(L.props), ze = 0; ze < be.length; ze++) {
          var lt = be[ze];
          if (lt !== "children" && lt !== "key") {
            ar(L), T("Invalid prop `%s` supplied to `React.Fragment`. React.Fragment can only have `key` and `children` props.", lt), ar(null);
            break;
          }
        }
        L.ref !== null && (ar(L), T("Invalid attribute `ref` supplied to `React.Fragment`."), ar(null));
      }
    }
    var jr = {};
    function ti(L, be, ze, lt, Gt, Vt) {
      {
        var Pt = oe(L);
        if (!Pt) {
          var St = "";
          (L === void 0 || typeof L == "object" && L !== null && Object.keys(L).length === 0) && (St += " You likely forgot to export your component from the file it's defined in, or you might have mixed up default and named imports.");
          var hn = bi();
          hn ? St += hn : St += cr();
          var nn;
          L === null ? nn = "null" : an(L) ? nn = "array" : L !== void 0 && L.$$typeof === n ? (nn = "<" + (Q(L.type) || "Unknown") + " />", St = " Did you accidentally export a JSX literal instead of a component?") : nn = typeof L, T("React.jsx: type is invalid -- expected a string (for built-in components) or a class/function (for composite components) but got: %s.%s", nn, St);
        }
        var rn = Rn(L, be, ze, Gt, Vt);
        if (rn == null)
          return rn;
        if (Pt) {
          var Pn = be.children;
          if (Pn !== void 0)
            if (lt)
              if (an(Pn)) {
                for (var dr = 0; dr < Pn.length; dr++)
                  Kr(Pn[dr], L);
                Object.freeze && Object.freeze(Pn);
              } else
                T("React.jsx: Static children should always be an array. You are likely explicitly calling React.jsxs or React.jsxDEV. Use the Babel transform instead.");
            else
              Kr(Pn, L);
        }
        if (pt.call(be, "key")) {
          var sr = Q(L), yn = Object.keys(be).filter(function(qi) {
            return qi !== "key";
          }), Ir = yn.length > 0 ? "{key: someKey, " + yn.join(": ..., ") + ": ...}" : "{key: someKey}";
          if (!jr[sr + Ir]) {
            var Ui = yn.length > 0 ? "{" + yn.join(": ..., ") + ": ...}" : "{}";
            T(`A props object containing a "key" prop is being spread into JSX:
  let props = %s;
  <%s {...props} />
React keys must be passed directly to JSX without using spread:
  let props = %s;
  <%s key={someKey} {...props} />`, Ir, sr, Ui, sr), jr[sr + Ir] = !0;
          }
        }
        return L === i ? ei(rn) : xi(rn), rn;
      }
    }
    function Ci(L, be, ze) {
      return ti(L, be, ze, !0);
    }
    function ni(L, be, ze) {
      return ti(L, be, ze, !1);
    }
    var Si = ni, Sr = Ci;
    uo.Fragment = i, uo.jsx = Si, uo.jsxs = Sr;
  }(), uo;
}
var ud;
function Kv() {
  if (ud) return ba.exports;
  ud = 1;
  var e = {};
  return e.NODE_ENV === "production" ? ba.exports = qv() : ba.exports = Qv(), ba.exports;
}
var W = Kv(), ya = { exports: {} }, hl = {};
/**
 * @license React
 * use-sync-external-store-with-selector.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var cd;
function eb() {
  if (cd) return hl;
  cd = 1;
  var e = cn;
  function t(u, s) {
    return u === s && (u !== 0 || 1 / u === 1 / s) || u !== u && s !== s;
  }
  var n = typeof Object.is == "function" ? Object.is : t, r = e.useSyncExternalStore, i = e.useRef, a = e.useEffect, o = e.useMemo, l = e.useDebugValue;
  return hl.useSyncExternalStoreWithSelector = function(u, s, d, c, m) {
    var h = i(null);
    if (h.current === null) {
      var x = { hasValue: !1, value: null };
      h.current = x;
    } else x = h.current;
    h = o(
      function() {
        function b(E) {
          if (!I) {
            if (I = !0, O = E, E = c(E), m !== void 0 && x.hasValue) {
              var B = x.value;
              if (m(B, E))
                return T = B;
            }
            return T = E;
          }
          if (B = T, n(O, E)) return B;
          var X = c(E);
          return m !== void 0 && m(B, X) ? (O = E, B) : (O = E, T = X);
        }
        var I = !1, O, T, D = d === void 0 ? null : d;
        return [
          function() {
            return b(s());
          },
          D === null ? void 0 : function() {
            return b(D());
          }
        ];
      },
      [s, d, c, m]
    );
    var v = r(u, h[0], h[1]);
    return a(
      function() {
        x.hasValue = !0, x.value = v;
      },
      [v]
    ), l(v), v;
  }, hl;
}
var ml = {}, dd;
function tb() {
  if (dd) return ml;
  dd = 1;
  var e = {};
  /**
   * @license React
   * use-sync-external-store-with-selector.development.js
   *
   * Copyright (c) Meta Platforms, Inc. and affiliates.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   */
  return e.NODE_ENV !== "production" && function() {
    function t(s, d) {
      return s === d && (s !== 0 || 1 / s === 1 / d) || s !== s && d !== d;
    }
    typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u" && typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart == "function" && __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart(Error());
    var n = cn, r = typeof Object.is == "function" ? Object.is : t, i = n.useSyncExternalStore, a = n.useRef, o = n.useEffect, l = n.useMemo, u = n.useDebugValue;
    ml.useSyncExternalStoreWithSelector = function(s, d, c, m, h) {
      var x = a(null);
      if (x.current === null) {
        var v = { hasValue: !1, value: null };
        x.current = v;
      } else v = x.current;
      x = l(
        function() {
          function I(B) {
            if (!O) {
              if (O = !0, T = B, B = m(B), h !== void 0 && v.hasValue) {
                var X = v.value;
                if (h(X, B))
                  return D = X;
              }
              return D = B;
            }
            if (X = D, r(T, B))
              return X;
            var U = m(B);
            return h !== void 0 && h(X, U) ? (T = B, X) : (T = B, D = U);
          }
          var O = !1, T, D, E = c === void 0 ? null : c;
          return [
            function() {
              return I(d());
            },
            E === null ? void 0 : function() {
              return I(E());
            }
          ];
        },
        [d, c, m, h]
      );
      var b = i(s, x[0], x[1]);
      return o(
        function() {
          v.hasValue = !0, v.value = b;
        },
        [b]
      ), u(b), b;
    }, typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u" && typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop == "function" && __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop(Error());
  }(), ml;
}
var fd;
function nb() {
  if (fd) return ya.exports;
  fd = 1;
  var e = {};
  return e.NODE_ENV === "production" ? ya.exports = eb() : ya.exports = tb(), ya.exports;
}
var rb = nb(), qa = {}, vl = /* @__PURE__ */ Symbol.for("react-redux-context"), bl = typeof globalThis < "u" ? globalThis : (
  /* fall back to a per-module scope (pre-8.1 behaviour) if `globalThis` is not available */
  {}
);
function ib() {
  if (!he.createContext) return {};
  const e = bl[vl] ?? (bl[vl] = /* @__PURE__ */ new Map());
  let t = e.get(he.createContext);
  return t || (t = he.createContext(
    null
  ), qa.NODE_ENV !== "production" && (t.displayName = "ReactRedux"), e.set(he.createContext, t)), t;
}
var fi = /* @__PURE__ */ ib();
function cc(e = fi) {
  return function() {
    const n = he.useContext(e);
    if (qa.NODE_ENV !== "production" && !n)
      throw new Error(
        "could not find react-redux context value; please ensure the component is wrapped in a <Provider>"
      );
    return n;
  };
}
var Up = /* @__PURE__ */ cc();
function qp(e = fi) {
  const t = e === fi ? Up : (
    // @ts-ignore
    cc(e)
  ), n = () => {
    const { store: r } = t();
    return r;
  };
  return Object.assign(n, {
    withTypes: () => n
  }), n;
}
var ob = /* @__PURE__ */ qp();
function ab(e = fi) {
  const t = e === fi ? ob : qp(e), n = () => t().dispatch;
  return Object.assign(n, {
    withTypes: () => n
  }), n;
}
var sb = /* @__PURE__ */ ab(), lb = (e, t) => e === t;
function ub(e = fi) {
  const t = e === fi ? Up : cc(e), n = (r, i = {}) => {
    const { equalityFn: a = lb } = typeof i == "function" ? { equalityFn: i } : i;
    if (qa.NODE_ENV !== "production") {
      if (!r)
        throw new Error("You must pass a selector to useSelector");
      if (typeof r != "function")
        throw new Error("You must pass a function as a selector to useSelector");
      if (typeof a != "function")
        throw new Error(
          "You must pass a function as an equality function to useSelector"
        );
    }
    const o = t(), { store: l, subscription: u, getServerState: s } = o, d = he.useRef(!0), c = he.useCallback(
      {
        [r.name](h) {
          const x = r(h);
          if (qa.NODE_ENV !== "production") {
            const { devModeChecks: v = {} } = typeof i == "function" ? {} : i, { identityFunctionCheck: b, stabilityCheck: I } = o, {
              identityFunctionCheck: O,
              stabilityCheck: T
            } = {
              stabilityCheck: I,
              identityFunctionCheck: b,
              ...v
            };
            if (T === "always" || T === "once" && d.current) {
              const D = r(h);
              if (!a(x, D)) {
                let E;
                try {
                  throw new Error();
                } catch (B) {
                  ({ stack: E } = B);
                }
                console.warn(
                  "Selector " + (r.name || "unknown") + ` returned a different result when called with the same parameters. This can lead to unnecessary rerenders.
Selectors that return a new reference (such as an object or an array) should be memoized: https://redux.js.org/usage/deriving-data-selectors#optimizing-selectors-with-memoization`,
                  {
                    state: h,
                    selected: x,
                    selected2: D,
                    stack: E
                  }
                );
              }
            }
            if ((O === "always" || O === "once" && d.current) && x === h) {
              let D;
              try {
                throw new Error();
              } catch (E) {
                ({ stack: D } = E);
              }
              console.warn(
                "Selector " + (r.name || "unknown") + ` returned the root state when called. This can lead to unnecessary rerenders.
Selectors that return the entire state are almost certainly a mistake, as they will cause a rerender whenever *anything* in state changes.`,
                { stack: D }
              );
            }
            d.current && (d.current = !1);
          }
          return x;
        }
      }[r.name],
      [r]
    ), m = rb.useSyncExternalStoreWithSelector(
      u.addNestedSub,
      l.getState,
      s || l.getState,
      c,
      a
    );
    return he.useDebugValue(m), m;
  };
  return Object.assign(n, {
    withTypes: () => n
  }), n;
}
var Cu = /* @__PURE__ */ ub(), yl = { exports: {} };
/*!
	Copyright (c) 2018 Jed Watson.
	Licensed under the MIT License (MIT), see
	http://jedwatson.github.io/classnames
*/
var pd;
function cb() {
  return pd || (pd = 1, function(e) {
    (function() {
      var t = {}.hasOwnProperty;
      function n() {
        for (var a = "", o = 0; o < arguments.length; o++) {
          var l = arguments[o];
          l && (a = i(a, r(l)));
        }
        return a;
      }
      function r(a) {
        if (typeof a == "string" || typeof a == "number")
          return a;
        if (typeof a != "object")
          return "";
        if (Array.isArray(a))
          return n.apply(null, a);
        if (a.toString !== Object.prototype.toString && !a.toString.toString().includes("[native code]"))
          return a.toString();
        var o = "";
        for (var l in a)
          t.call(a, l) && a[l] && (o = i(o, l));
        return o;
      }
      function i(a, o) {
        return o ? a ? a + " " + o : a + o : a;
      }
      e.exports ? (n.default = n, e.exports = n) : window.classNames = n;
    })();
  }(yl)), yl.exports;
}
var db = cb();
const Mt = /* @__PURE__ */ Hn(db);
function ke() {
  return ke = Object.assign ? Object.assign.bind() : function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var n = arguments[t];
      for (var r in n) ({}).hasOwnProperty.call(n, r) && (e[r] = n[r]);
    }
    return e;
  }, ke.apply(null, arguments);
}
function Lo(e, t) {
  if (e == null) return {};
  var n = {};
  for (var r in e) if ({}.hasOwnProperty.call(e, r)) {
    if (t.indexOf(r) !== -1) continue;
    n[r] = e[r];
  }
  return n;
}
function _i(e, t) {
  return _i = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(n, r) {
    return n.__proto__ = r, n;
  }, _i(e, t);
}
function fb(e, t) {
  e.prototype = Object.create(t.prototype), e.prototype.constructor = e, _i(e, t);
}
const pb = ["xxl", "xl", "lg", "md", "sm", "xs"], gb = "xs", ws = /* @__PURE__ */ he.createContext({
  prefixes: {},
  breakpoints: pb,
  minBreakpoint: gb
}), {
  Consumer: bO,
  Provider: yO
} = ws;
function Zt(e, t) {
  const {
    prefixes: n
  } = Bn(ws);
  return e || n[t] || t;
}
function Qp() {
  const {
    breakpoints: e
  } = Bn(ws);
  return e;
}
function Kp() {
  const {
    minBreakpoint: e
  } = Bn(ws);
  return e;
}
var wa = { exports: {} }, xa = { exports: {} }, Ht = {};
/** @license React v16.13.1
 * react-is.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var gd;
function hb() {
  if (gd) return Ht;
  gd = 1;
  var e = typeof Symbol == "function" && Symbol.for, t = e ? Symbol.for("react.element") : 60103, n = e ? Symbol.for("react.portal") : 60106, r = e ? Symbol.for("react.fragment") : 60107, i = e ? Symbol.for("react.strict_mode") : 60108, a = e ? Symbol.for("react.profiler") : 60114, o = e ? Symbol.for("react.provider") : 60109, l = e ? Symbol.for("react.context") : 60110, u = e ? Symbol.for("react.async_mode") : 60111, s = e ? Symbol.for("react.concurrent_mode") : 60111, d = e ? Symbol.for("react.forward_ref") : 60112, c = e ? Symbol.for("react.suspense") : 60113, m = e ? Symbol.for("react.suspense_list") : 60120, h = e ? Symbol.for("react.memo") : 60115, x = e ? Symbol.for("react.lazy") : 60116, v = e ? Symbol.for("react.block") : 60121, b = e ? Symbol.for("react.fundamental") : 60117, I = e ? Symbol.for("react.responder") : 60118, O = e ? Symbol.for("react.scope") : 60119;
  function T(E) {
    if (typeof E == "object" && E !== null) {
      var B = E.$$typeof;
      switch (B) {
        case t:
          switch (E = E.type, E) {
            case u:
            case s:
            case r:
            case a:
            case i:
            case c:
              return E;
            default:
              switch (E = E && E.$$typeof, E) {
                case l:
                case d:
                case x:
                case h:
                case o:
                  return E;
                default:
                  return B;
              }
          }
        case n:
          return B;
      }
    }
  }
  function D(E) {
    return T(E) === s;
  }
  return Ht.AsyncMode = u, Ht.ConcurrentMode = s, Ht.ContextConsumer = l, Ht.ContextProvider = o, Ht.Element = t, Ht.ForwardRef = d, Ht.Fragment = r, Ht.Lazy = x, Ht.Memo = h, Ht.Portal = n, Ht.Profiler = a, Ht.StrictMode = i, Ht.Suspense = c, Ht.isAsyncMode = function(E) {
    return D(E) || T(E) === u;
  }, Ht.isConcurrentMode = D, Ht.isContextConsumer = function(E) {
    return T(E) === l;
  }, Ht.isContextProvider = function(E) {
    return T(E) === o;
  }, Ht.isElement = function(E) {
    return typeof E == "object" && E !== null && E.$$typeof === t;
  }, Ht.isForwardRef = function(E) {
    return T(E) === d;
  }, Ht.isFragment = function(E) {
    return T(E) === r;
  }, Ht.isLazy = function(E) {
    return T(E) === x;
  }, Ht.isMemo = function(E) {
    return T(E) === h;
  }, Ht.isPortal = function(E) {
    return T(E) === n;
  }, Ht.isProfiler = function(E) {
    return T(E) === a;
  }, Ht.isStrictMode = function(E) {
    return T(E) === i;
  }, Ht.isSuspense = function(E) {
    return T(E) === c;
  }, Ht.isValidElementType = function(E) {
    return typeof E == "string" || typeof E == "function" || E === r || E === s || E === a || E === i || E === c || E === m || typeof E == "object" && E !== null && (E.$$typeof === x || E.$$typeof === h || E.$$typeof === o || E.$$typeof === l || E.$$typeof === d || E.$$typeof === b || E.$$typeof === I || E.$$typeof === O || E.$$typeof === v);
  }, Ht.typeOf = T, Ht;
}
var Wt = {}, hd;
function mb() {
  if (hd) return Wt;
  hd = 1;
  var e = {};
  /** @license React v16.13.1
   * react-is.development.js
   *
   * Copyright (c) Facebook, Inc. and its affiliates.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   */
  return e.NODE_ENV !== "production" && function() {
    var t = typeof Symbol == "function" && Symbol.for, n = t ? Symbol.for("react.element") : 60103, r = t ? Symbol.for("react.portal") : 60106, i = t ? Symbol.for("react.fragment") : 60107, a = t ? Symbol.for("react.strict_mode") : 60108, o = t ? Symbol.for("react.profiler") : 60114, l = t ? Symbol.for("react.provider") : 60109, u = t ? Symbol.for("react.context") : 60110, s = t ? Symbol.for("react.async_mode") : 60111, d = t ? Symbol.for("react.concurrent_mode") : 60111, c = t ? Symbol.for("react.forward_ref") : 60112, m = t ? Symbol.for("react.suspense") : 60113, h = t ? Symbol.for("react.suspense_list") : 60120, x = t ? Symbol.for("react.memo") : 60115, v = t ? Symbol.for("react.lazy") : 60116, b = t ? Symbol.for("react.block") : 60121, I = t ? Symbol.for("react.fundamental") : 60117, O = t ? Symbol.for("react.responder") : 60118, T = t ? Symbol.for("react.scope") : 60119;
    function D(J) {
      return typeof J == "string" || typeof J == "function" || // Note: its typeof might be other than 'symbol' or 'number' if it's a polyfill.
      J === i || J === d || J === o || J === a || J === m || J === h || typeof J == "object" && J !== null && (J.$$typeof === v || J.$$typeof === x || J.$$typeof === l || J.$$typeof === u || J.$$typeof === c || J.$$typeof === I || J.$$typeof === O || J.$$typeof === T || J.$$typeof === b);
    }
    function E(J) {
      if (typeof J == "object" && J !== null) {
        var ft = J.$$typeof;
        switch (ft) {
          case n:
            var je = J.type;
            switch (je) {
              case s:
              case d:
              case i:
              case o:
              case a:
              case m:
                return je;
              default:
                var et = je && je.$$typeof;
                switch (et) {
                  case u:
                  case c:
                  case v:
                  case x:
                  case l:
                    return et;
                  default:
                    return ft;
                }
            }
          case r:
            return ft;
        }
      }
    }
    var B = s, X = d, U = u, K = l, Fe = n, oe = c, ce = i, ye = v, Q = x, ue = r, Ee = o, We = a, $e = m, ht = !1;
    function G(J) {
      return ht || (ht = !0, console.warn("The ReactIs.isAsyncMode() alias has been deprecated, and will be removed in React 17+. Update your code to use ReactIs.isConcurrentMode() instead. It has the exact same API.")), Z(J) || E(J) === s;
    }
    function Z(J) {
      return E(J) === d;
    }
    function A(J) {
      return E(J) === u;
    }
    function w(J) {
      return E(J) === l;
    }
    function H(J) {
      return typeof J == "object" && J !== null && J.$$typeof === n;
    }
    function $(J) {
      return E(J) === c;
    }
    function _(J) {
      return E(J) === i;
    }
    function re(J) {
      return E(J) === v;
    }
    function Y(J) {
      return E(J) === x;
    }
    function fe(J) {
      return E(J) === r;
    }
    function ge(J) {
      return E(J) === o;
    }
    function ve(J) {
      return E(J) === a;
    }
    function Te(J) {
      return E(J) === m;
    }
    Wt.AsyncMode = B, Wt.ConcurrentMode = X, Wt.ContextConsumer = U, Wt.ContextProvider = K, Wt.Element = Fe, Wt.ForwardRef = oe, Wt.Fragment = ce, Wt.Lazy = ye, Wt.Memo = Q, Wt.Portal = ue, Wt.Profiler = Ee, Wt.StrictMode = We, Wt.Suspense = $e, Wt.isAsyncMode = G, Wt.isConcurrentMode = Z, Wt.isContextConsumer = A, Wt.isContextProvider = w, Wt.isElement = H, Wt.isForwardRef = $, Wt.isFragment = _, Wt.isLazy = re, Wt.isMemo = Y, Wt.isPortal = fe, Wt.isProfiler = ge, Wt.isStrictMode = ve, Wt.isSuspense = Te, Wt.isValidElementType = D, Wt.typeOf = E;
  }(), Wt;
}
var md;
function eg() {
  if (md) return xa.exports;
  md = 1;
  var e = {};
  return e.NODE_ENV === "production" ? xa.exports = hb() : xa.exports = mb(), xa.exports;
}
/*
object-assign
(c) Sindre Sorhus
@license MIT
*/
var wl, vd;
function vb() {
  if (vd) return wl;
  vd = 1;
  var e = Object.getOwnPropertySymbols, t = Object.prototype.hasOwnProperty, n = Object.prototype.propertyIsEnumerable;
  function r(a) {
    if (a == null)
      throw new TypeError("Object.assign cannot be called with null or undefined");
    return Object(a);
  }
  function i() {
    try {
      if (!Object.assign)
        return !1;
      var a = new String("abc");
      if (a[5] = "de", Object.getOwnPropertyNames(a)[0] === "5")
        return !1;
      for (var o = {}, l = 0; l < 10; l++)
        o["_" + String.fromCharCode(l)] = l;
      var u = Object.getOwnPropertyNames(o).map(function(d) {
        return o[d];
      });
      if (u.join("") !== "0123456789")
        return !1;
      var s = {};
      return "abcdefghijklmnopqrst".split("").forEach(function(d) {
        s[d] = d;
      }), Object.keys(Object.assign({}, s)).join("") === "abcdefghijklmnopqrst";
    } catch {
      return !1;
    }
  }
  return wl = i() ? Object.assign : function(a, o) {
    for (var l, u = r(a), s, d = 1; d < arguments.length; d++) {
      l = Object(arguments[d]);
      for (var c in l)
        t.call(l, c) && (u[c] = l[c]);
      if (e) {
        s = e(l);
        for (var m = 0; m < s.length; m++)
          n.call(l, s[m]) && (u[s[m]] = l[s[m]]);
      }
    }
    return u;
  }, wl;
}
var xl, bd;
function dc() {
  if (bd) return xl;
  bd = 1;
  var e = "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED";
  return xl = e, xl;
}
var Cl, yd;
function tg() {
  return yd || (yd = 1, Cl = Function.call.bind(Object.prototype.hasOwnProperty)), Cl;
}
var Sl, wd;
function bb() {
  if (wd) return Sl;
  wd = 1;
  var e = {}, t = function() {
  };
  if (e.NODE_ENV !== "production") {
    var n = /* @__PURE__ */ dc(), r = {}, i = /* @__PURE__ */ tg();
    t = function(o) {
      var l = "Warning: " + o;
      typeof console < "u" && console.error(l);
      try {
        throw new Error(l);
      } catch {
      }
    };
  }
  function a(o, l, u, s, d) {
    if (e.NODE_ENV !== "production") {
      for (var c in o)
        if (i(o, c)) {
          var m;
          try {
            if (typeof o[c] != "function") {
              var h = Error(
                (s || "React class") + ": " + u + " type `" + c + "` is invalid; it must be a function, usually from the `prop-types` package, but received `" + typeof o[c] + "`.This often happens because of typos such as `PropTypes.function` instead of `PropTypes.func`."
              );
              throw h.name = "Invariant Violation", h;
            }
            m = o[c](l, c, s, u, null, n);
          } catch (v) {
            m = v;
          }
          if (m && !(m instanceof Error) && t(
            (s || "React class") + ": type specification of " + u + " `" + c + "` is invalid; the type checker function must return `null` or an `Error` but returned a " + typeof m + ". You may have forgotten to pass an argument to the type checker creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and shape all require an argument)."
          ), m instanceof Error && !(m.message in r)) {
            r[m.message] = !0;
            var x = d ? d() : "";
            t(
              "Failed " + u + " type: " + m.message + (x ?? "")
            );
          }
        }
    }
  }
  return a.resetWarningCache = function() {
    e.NODE_ENV !== "production" && (r = {});
  }, Sl = a, Sl;
}
var Il, xd;
function yb() {
  if (xd) return Il;
  xd = 1;
  var e = {}, t = eg(), n = vb(), r = /* @__PURE__ */ dc(), i = /* @__PURE__ */ tg(), a = /* @__PURE__ */ bb(), o = function() {
  };
  e.NODE_ENV !== "production" && (o = function(u) {
    var s = "Warning: " + u;
    typeof console < "u" && console.error(s);
    try {
      throw new Error(s);
    } catch {
    }
  });
  function l() {
    return null;
  }
  return Il = function(u, s) {
    var d = typeof Symbol == "function" && Symbol.iterator, c = "@@iterator";
    function m(Z) {
      var A = Z && (d && Z[d] || Z[c]);
      if (typeof A == "function")
        return A;
    }
    var h = "<<anonymous>>", x = {
      array: O("array"),
      bigint: O("bigint"),
      bool: O("boolean"),
      func: O("function"),
      number: O("number"),
      object: O("object"),
      string: O("string"),
      symbol: O("symbol"),
      any: T(),
      arrayOf: D,
      element: E(),
      elementType: B(),
      instanceOf: X,
      node: oe(),
      objectOf: K,
      oneOf: U,
      oneOfType: Fe,
      shape: ye,
      exact: Q
    };
    function v(Z, A) {
      return Z === A ? Z !== 0 || 1 / Z === 1 / A : Z !== Z && A !== A;
    }
    function b(Z, A) {
      this.message = Z, this.data = A && typeof A == "object" ? A : {}, this.stack = "";
    }
    b.prototype = Error.prototype;
    function I(Z) {
      if (e.NODE_ENV !== "production")
        var A = {}, w = 0;
      function H(_, re, Y, fe, ge, ve, Te) {
        if (fe = fe || h, ve = ve || Y, Te !== r) {
          if (s) {
            var J = new Error(
              "Calling PropTypes validators directly is not supported by the `prop-types` package. Use `PropTypes.checkPropTypes()` to call them. Read more at http://fb.me/use-check-prop-types"
            );
            throw J.name = "Invariant Violation", J;
          } else if (e.NODE_ENV !== "production" && typeof console < "u") {
            var ft = fe + ":" + Y;
            !A[ft] && // Avoid spamming the console because they are often not actionable except for lib authors
            w < 3 && (o(
              "You are manually calling a React.PropTypes validation function for the `" + ve + "` prop on `" + fe + "`. This is deprecated and will throw in the standalone `prop-types` package. You may be seeing this warning due to a third-party PropTypes library. See https://fb.me/react-warning-dont-call-proptypes for details."
            ), A[ft] = !0, w++);
          }
        }
        return re[Y] == null ? _ ? re[Y] === null ? new b("The " + ge + " `" + ve + "` is marked as required " + ("in `" + fe + "`, but its value is `null`.")) : new b("The " + ge + " `" + ve + "` is marked as required in " + ("`" + fe + "`, but its value is `undefined`.")) : null : Z(re, Y, fe, ge, ve);
      }
      var $ = H.bind(null, !1);
      return $.isRequired = H.bind(null, !0), $;
    }
    function O(Z) {
      function A(w, H, $, _, re, Y) {
        var fe = w[H], ge = We(fe);
        if (ge !== Z) {
          var ve = $e(fe);
          return new b(
            "Invalid " + _ + " `" + re + "` of type " + ("`" + ve + "` supplied to `" + $ + "`, expected ") + ("`" + Z + "`."),
            { expectedType: Z }
          );
        }
        return null;
      }
      return I(A);
    }
    function T() {
      return I(l);
    }
    function D(Z) {
      function A(w, H, $, _, re) {
        if (typeof Z != "function")
          return new b("Property `" + re + "` of component `" + $ + "` has invalid PropType notation inside arrayOf.");
        var Y = w[H];
        if (!Array.isArray(Y)) {
          var fe = We(Y);
          return new b("Invalid " + _ + " `" + re + "` of type " + ("`" + fe + "` supplied to `" + $ + "`, expected an array."));
        }
        for (var ge = 0; ge < Y.length; ge++) {
          var ve = Z(Y, ge, $, _, re + "[" + ge + "]", r);
          if (ve instanceof Error)
            return ve;
        }
        return null;
      }
      return I(A);
    }
    function E() {
      function Z(A, w, H, $, _) {
        var re = A[w];
        if (!u(re)) {
          var Y = We(re);
          return new b("Invalid " + $ + " `" + _ + "` of type " + ("`" + Y + "` supplied to `" + H + "`, expected a single ReactElement."));
        }
        return null;
      }
      return I(Z);
    }
    function B() {
      function Z(A, w, H, $, _) {
        var re = A[w];
        if (!t.isValidElementType(re)) {
          var Y = We(re);
          return new b("Invalid " + $ + " `" + _ + "` of type " + ("`" + Y + "` supplied to `" + H + "`, expected a single ReactElement type."));
        }
        return null;
      }
      return I(Z);
    }
    function X(Z) {
      function A(w, H, $, _, re) {
        if (!(w[H] instanceof Z)) {
          var Y = Z.name || h, fe = G(w[H]);
          return new b("Invalid " + _ + " `" + re + "` of type " + ("`" + fe + "` supplied to `" + $ + "`, expected ") + ("instance of `" + Y + "`."));
        }
        return null;
      }
      return I(A);
    }
    function U(Z) {
      if (!Array.isArray(Z))
        return e.NODE_ENV !== "production" && (arguments.length > 1 ? o(
          "Invalid arguments supplied to oneOf, expected an array, got " + arguments.length + " arguments. A common mistake is to write oneOf(x, y, z) instead of oneOf([x, y, z])."
        ) : o("Invalid argument supplied to oneOf, expected an array.")), l;
      function A(w, H, $, _, re) {
        for (var Y = w[H], fe = 0; fe < Z.length; fe++)
          if (v(Y, Z[fe]))
            return null;
        var ge = JSON.stringify(Z, function(Te, J) {
          var ft = $e(J);
          return ft === "symbol" ? String(J) : J;
        });
        return new b("Invalid " + _ + " `" + re + "` of value `" + String(Y) + "` " + ("supplied to `" + $ + "`, expected one of " + ge + "."));
      }
      return I(A);
    }
    function K(Z) {
      function A(w, H, $, _, re) {
        if (typeof Z != "function")
          return new b("Property `" + re + "` of component `" + $ + "` has invalid PropType notation inside objectOf.");
        var Y = w[H], fe = We(Y);
        if (fe !== "object")
          return new b("Invalid " + _ + " `" + re + "` of type " + ("`" + fe + "` supplied to `" + $ + "`, expected an object."));
        for (var ge in Y)
          if (i(Y, ge)) {
            var ve = Z(Y, ge, $, _, re + "." + ge, r);
            if (ve instanceof Error)
              return ve;
          }
        return null;
      }
      return I(A);
    }
    function Fe(Z) {
      if (!Array.isArray(Z))
        return e.NODE_ENV !== "production" && o("Invalid argument supplied to oneOfType, expected an instance of array."), l;
      for (var A = 0; A < Z.length; A++) {
        var w = Z[A];
        if (typeof w != "function")
          return o(
            "Invalid argument supplied to oneOfType. Expected an array of check functions, but received " + ht(w) + " at index " + A + "."
          ), l;
      }
      function H($, _, re, Y, fe) {
        for (var ge = [], ve = 0; ve < Z.length; ve++) {
          var Te = Z[ve], J = Te($, _, re, Y, fe, r);
          if (J == null)
            return null;
          J.data && i(J.data, "expectedType") && ge.push(J.data.expectedType);
        }
        var ft = ge.length > 0 ? ", expected one of type [" + ge.join(", ") + "]" : "";
        return new b("Invalid " + Y + " `" + fe + "` supplied to " + ("`" + re + "`" + ft + "."));
      }
      return I(H);
    }
    function oe() {
      function Z(A, w, H, $, _) {
        return ue(A[w]) ? null : new b("Invalid " + $ + " `" + _ + "` supplied to " + ("`" + H + "`, expected a ReactNode."));
      }
      return I(Z);
    }
    function ce(Z, A, w, H, $) {
      return new b(
        (Z || "React class") + ": " + A + " type `" + w + "." + H + "` is invalid; it must be a function, usually from the `prop-types` package, but received `" + $ + "`."
      );
    }
    function ye(Z) {
      function A(w, H, $, _, re) {
        var Y = w[H], fe = We(Y);
        if (fe !== "object")
          return new b("Invalid " + _ + " `" + re + "` of type `" + fe + "` " + ("supplied to `" + $ + "`, expected `object`."));
        for (var ge in Z) {
          var ve = Z[ge];
          if (typeof ve != "function")
            return ce($, _, re, ge, $e(ve));
          var Te = ve(Y, ge, $, _, re + "." + ge, r);
          if (Te)
            return Te;
        }
        return null;
      }
      return I(A);
    }
    function Q(Z) {
      function A(w, H, $, _, re) {
        var Y = w[H], fe = We(Y);
        if (fe !== "object")
          return new b("Invalid " + _ + " `" + re + "` of type `" + fe + "` " + ("supplied to `" + $ + "`, expected `object`."));
        var ge = n({}, w[H], Z);
        for (var ve in ge) {
          var Te = Z[ve];
          if (i(Z, ve) && typeof Te != "function")
            return ce($, _, re, ve, $e(Te));
          if (!Te)
            return new b(
              "Invalid " + _ + " `" + re + "` key `" + ve + "` supplied to `" + $ + "`.\nBad object: " + JSON.stringify(w[H], null, "  ") + `
Valid keys: ` + JSON.stringify(Object.keys(Z), null, "  ")
            );
          var J = Te(Y, ve, $, _, re + "." + ve, r);
          if (J)
            return J;
        }
        return null;
      }
      return I(A);
    }
    function ue(Z) {
      switch (typeof Z) {
        case "number":
        case "string":
        case "undefined":
          return !0;
        case "boolean":
          return !Z;
        case "object":
          if (Array.isArray(Z))
            return Z.every(ue);
          if (Z === null || u(Z))
            return !0;
          var A = m(Z);
          if (A) {
            var w = A.call(Z), H;
            if (A !== Z.entries) {
              for (; !(H = w.next()).done; )
                if (!ue(H.value))
                  return !1;
            } else
              for (; !(H = w.next()).done; ) {
                var $ = H.value;
                if ($ && !ue($[1]))
                  return !1;
              }
          } else
            return !1;
          return !0;
        default:
          return !1;
      }
    }
    function Ee(Z, A) {
      return Z === "symbol" ? !0 : A ? A["@@toStringTag"] === "Symbol" || typeof Symbol == "function" && A instanceof Symbol : !1;
    }
    function We(Z) {
      var A = typeof Z;
      return Array.isArray(Z) ? "array" : Z instanceof RegExp ? "object" : Ee(A, Z) ? "symbol" : A;
    }
    function $e(Z) {
      if (typeof Z > "u" || Z === null)
        return "" + Z;
      var A = We(Z);
      if (A === "object") {
        if (Z instanceof Date)
          return "date";
        if (Z instanceof RegExp)
          return "regexp";
      }
      return A;
    }
    function ht(Z) {
      var A = $e(Z);
      switch (A) {
        case "array":
        case "object":
          return "an " + A;
        case "boolean":
        case "date":
        case "regexp":
          return "a " + A;
        default:
          return A;
      }
    }
    function G(Z) {
      return !Z.constructor || !Z.constructor.name ? h : Z.constructor.name;
    }
    return x.checkPropTypes = a, x.resetWarningCache = a.resetWarningCache, x.PropTypes = x, x;
  }, Il;
}
var Rl, Cd;
function wb() {
  if (Cd) return Rl;
  Cd = 1;
  var e = /* @__PURE__ */ dc();
  function t() {
  }
  function n() {
  }
  return n.resetWarningCache = t, Rl = function() {
    function r(o, l, u, s, d, c) {
      if (c !== e) {
        var m = new Error(
          "Calling PropTypes validators directly is not supported by the `prop-types` package. Use PropTypes.checkPropTypes() to call them. Read more at http://fb.me/use-check-prop-types"
        );
        throw m.name = "Invariant Violation", m;
      }
    }
    r.isRequired = r;
    function i() {
      return r;
    }
    var a = {
      array: r,
      bigint: r,
      bool: r,
      func: r,
      number: r,
      object: r,
      string: r,
      symbol: r,
      any: r,
      arrayOf: i,
      element: r,
      elementType: r,
      instanceOf: i,
      node: r,
      objectOf: i,
      oneOf: i,
      oneOfType: i,
      shape: i,
      exact: i,
      checkPropTypes: n,
      resetWarningCache: t
    };
    return a.PropTypes = a, a;
  }, Rl;
}
var Sd;
function xb() {
  if (Sd) return wa.exports;
  Sd = 1;
  var e = {};
  if (e.NODE_ENV !== "production") {
    var t = eg(), n = !0;
    wa.exports = /* @__PURE__ */ yb()(t.isElement, n);
  } else
    wa.exports = /* @__PURE__ */ wb()();
  return wa.exports;
}
var Cb = /* @__PURE__ */ xb();
const _e = /* @__PURE__ */ Hn(Cb), ng = (e) => /* @__PURE__ */ he.forwardRef((t, n) => /* @__PURE__ */ W.jsx("div", {
  ...t,
  ref: n,
  className: Mt(t.className, e)
}));
function Sb(e) {
  const t = ir(e);
  return Jr(() => {
    t.current = e;
  }, [e]), t;
}
function Ib(e) {
  const t = Sb(e);
  return kn(function(...n) {
    return t.current && t.current(...n);
  }, [t]);
}
const Rb = ["as", "disabled"];
function Eb(e, t) {
  if (e == null) return {};
  var n = {};
  for (var r in e) if ({}.hasOwnProperty.call(e, r)) {
    if (t.indexOf(r) >= 0) continue;
    n[r] = e[r];
  }
  return n;
}
function Ab(e) {
  return !e || e.trim() === "#";
}
function fc({
  tagName: e,
  disabled: t,
  href: n,
  target: r,
  rel: i,
  role: a,
  onClick: o,
  tabIndex: l = 0,
  type: u
}) {
  e || (n != null || r != null || i != null ? e = "a" : e = "button");
  const s = {
    tagName: e
  };
  if (e === "button")
    return [{
      type: u || "button",
      disabled: t
    }, s];
  const d = (m) => {
    if ((t || e === "a" && Ab(n)) && m.preventDefault(), t) {
      m.stopPropagation();
      return;
    }
    o == null || o(m);
  }, c = (m) => {
    m.key === " " && (m.preventDefault(), d(m));
  };
  return e === "a" && (n || (n = "#"), t && (n = void 0)), [{
    role: a ?? "button",
    // explicitly undefined so that it overrides the props disabled in a spread
    // e.g. <Tag {...props} {...hookProps} />
    disabled: void 0,
    tabIndex: t ? void 0 : l,
    href: n,
    target: e === "a" ? r : void 0,
    "aria-disabled": t || void 0,
    rel: e === "a" ? i : void 0,
    onClick: d,
    onKeyDown: c
  }, s];
}
const Pb = /* @__PURE__ */ he.forwardRef((e, t) => {
  let {
    as: n,
    disabled: r
  } = e, i = Eb(e, Rb);
  const [a, {
    tagName: o
  }] = fc(Object.assign({
    tagName: n,
    disabled: r
  }, i));
  return /* @__PURE__ */ W.jsx(o, Object.assign({}, i, a, {
    ref: t
  }));
});
Pb.displayName = "Button";
const Tb = ["onKeyDown"];
function kb(e, t) {
  if (e == null) return {};
  var n = {};
  for (var r in e) if ({}.hasOwnProperty.call(e, r)) {
    if (t.indexOf(r) >= 0) continue;
    n[r] = e[r];
  }
  return n;
}
function Ob(e) {
  return !e || e.trim() === "#";
}
const rg = /* @__PURE__ */ he.forwardRef((e, t) => {
  let {
    onKeyDown: n
  } = e, r = kb(e, Tb);
  const [i] = fc(Object.assign({
    tagName: "a"
  }, r)), a = Ib((o) => {
    i.onKeyDown(o), n == null || n(o);
  });
  return Ob(r.href) || r.role === "button" ? /* @__PURE__ */ W.jsx("a", Object.assign({
    ref: t
  }, r, i, {
    onKeyDown: a
  })) : /* @__PURE__ */ W.jsx("a", Object.assign({
    ref: t
  }, r, {
    onKeyDown: n
  }));
});
rg.displayName = "Anchor";
const ig = /* @__PURE__ */ he.forwardRef(({
  as: e,
  bsPrefix: t,
  variant: n = "primary",
  size: r,
  active: i = !1,
  disabled: a = !1,
  className: o,
  ...l
}, u) => {
  const s = Zt(t, "btn"), [d, {
    tagName: c
  }] = fc({
    tagName: e,
    disabled: a,
    ...l
  }), m = c;
  return /* @__PURE__ */ W.jsx(m, {
    ...d,
    ...l,
    ref: u,
    disabled: a,
    className: Mt(o, s, i && "active", n && `${s}-${n}`, r && `${s}-${r}`, l.href && a && "disabled")
  });
});
ig.displayName = "Button";
const og = /* @__PURE__ */ he.forwardRef(({
  bsPrefix: e,
  size: t,
  vertical: n = !1,
  className: r,
  role: i = "group",
  // Need to define the default "as" during prop destructuring to be compatible with styled-components github.com/react-bootstrap/react-bootstrap/issues/3595
  as: a = "div",
  ...o
}, l) => {
  const u = Zt(e, "btn-group");
  let s = u;
  return n && (s = `${u}-vertical`), /* @__PURE__ */ W.jsx(a, {
    ...o,
    ref: l,
    role: i,
    className: Mt(r, s, t && `${u}-${t}`)
  });
});
og.displayName = "ButtonGroup";
const ag = /* @__PURE__ */ he.forwardRef(({
  bsPrefix: e,
  className: t,
  role: n = "toolbar",
  ...r
}, i) => {
  const a = Zt(e, "btn-toolbar");
  return /* @__PURE__ */ W.jsx("div", {
    ...r,
    ref: i,
    className: Mt(t, a),
    role: n
  });
});
ag.displayName = "ButtonToolbar";
const pc = /* @__PURE__ */ he.forwardRef(({
  className: e,
  bsPrefix: t,
  as: n = "div",
  ...r
}, i) => (t = Zt(t, "card-body"), /* @__PURE__ */ W.jsx(n, {
  ref: i,
  className: Mt(e, t),
  ...r
})));
pc.displayName = "CardBody";
const sg = /* @__PURE__ */ he.forwardRef(({
  className: e,
  bsPrefix: t,
  as: n = "div",
  ...r
}, i) => (t = Zt(t, "card-footer"), /* @__PURE__ */ W.jsx(n, {
  ref: i,
  className: Mt(e, t),
  ...r
})));
sg.displayName = "CardFooter";
const lg = /* @__PURE__ */ he.createContext(null);
lg.displayName = "CardHeaderContext";
const ug = /* @__PURE__ */ he.forwardRef(({
  bsPrefix: e,
  className: t,
  // Need to define the default "as" during prop destructuring to be compatible with styled-components github.com/react-bootstrap/react-bootstrap/issues/3595
  as: n = "div",
  ...r
}, i) => {
  const a = Zt(e, "card-header"), o = Pr(() => ({
    cardHeaderBsPrefix: a
  }), [a]);
  return /* @__PURE__ */ W.jsx(lg.Provider, {
    value: o,
    children: /* @__PURE__ */ W.jsx(n, {
      ref: i,
      ...r,
      className: Mt(t, a)
    })
  });
});
ug.displayName = "CardHeader";
const cg = /* @__PURE__ */ he.forwardRef(
  // Need to define the default "as" during prop destructuring to be compatible with styled-components github.com/react-bootstrap/react-bootstrap/issues/3595
  ({
    bsPrefix: e,
    className: t,
    variant: n,
    as: r = "img",
    ...i
  }, a) => {
    const o = Zt(e, "card-img");
    return /* @__PURE__ */ W.jsx(r, {
      ref: a,
      className: Mt(n ? `${o}-${n}` : o, t),
      ...i
    });
  }
);
cg.displayName = "CardImg";
const dg = /* @__PURE__ */ he.forwardRef(({
  className: e,
  bsPrefix: t,
  as: n = "div",
  ...r
}, i) => (t = Zt(t, "card-img-overlay"), /* @__PURE__ */ W.jsx(n, {
  ref: i,
  className: Mt(e, t),
  ...r
})));
dg.displayName = "CardImgOverlay";
const fg = /* @__PURE__ */ he.forwardRef(({
  className: e,
  bsPrefix: t,
  as: n = "a",
  ...r
}, i) => (t = Zt(t, "card-link"), /* @__PURE__ */ W.jsx(n, {
  ref: i,
  className: Mt(e, t),
  ...r
})));
fg.displayName = "CardLink";
const Fb = ng("h6"), pg = /* @__PURE__ */ he.forwardRef(({
  className: e,
  bsPrefix: t,
  as: n = Fb,
  ...r
}, i) => (t = Zt(t, "card-subtitle"), /* @__PURE__ */ W.jsx(n, {
  ref: i,
  className: Mt(e, t),
  ...r
})));
pg.displayName = "CardSubtitle";
const gg = /* @__PURE__ */ he.forwardRef(({
  className: e,
  bsPrefix: t,
  as: n = "p",
  ...r
}, i) => (t = Zt(t, "card-text"), /* @__PURE__ */ W.jsx(n, {
  ref: i,
  className: Mt(e, t),
  ...r
})));
gg.displayName = "CardText";
const Bb = ng("h5"), hg = /* @__PURE__ */ he.forwardRef(({
  className: e,
  bsPrefix: t,
  as: n = Bb,
  ...r
}, i) => (t = Zt(t, "card-title"), /* @__PURE__ */ W.jsx(n, {
  ref: i,
  className: Mt(e, t),
  ...r
})));
hg.displayName = "CardTitle";
const mg = /* @__PURE__ */ he.forwardRef(({
  bsPrefix: e,
  className: t,
  bg: n,
  text: r,
  border: i,
  body: a = !1,
  children: o,
  // Need to define the default "as" during prop destructuring to be compatible with styled-components github.com/react-bootstrap/react-bootstrap/issues/3595
  as: l = "div",
  ...u
}, s) => {
  const d = Zt(e, "card");
  return /* @__PURE__ */ W.jsx(l, {
    ref: s,
    ...u,
    className: Mt(t, d, n && `bg-${n}`, r && `text-${r}`, i && `border-${i}`),
    children: a ? /* @__PURE__ */ W.jsx(pc, {
      children: o
    }) : o
  });
});
mg.displayName = "Card";
const Nb = Object.assign(mg, {
  Img: cg,
  Title: hg,
  Subtitle: pg,
  Body: pc,
  Link: fg,
  Text: gg,
  Header: ug,
  Footer: sg,
  ImgOverlay: dg
});
function Gb(e, t) {
  return he.Children.toArray(e).some((n) => /* @__PURE__ */ he.isValidElement(n) && n.type === t);
}
function _b({
  as: e,
  bsPrefix: t,
  className: n,
  ...r
}) {
  t = Zt(t, "col");
  const i = Qp(), a = Kp(), o = [], l = [];
  return i.forEach((u) => {
    const s = r[u];
    delete r[u];
    let d, c, m;
    typeof s == "object" && s != null ? {
      span: d,
      offset: c,
      order: m
    } = s : d = s;
    const h = u !== a ? `-${u}` : "";
    d && o.push(d === !0 ? `${t}${h}` : `${t}${h}-${d}`), m != null && l.push(`order${h}-${m}`), c != null && l.push(`offset${h}-${c}`);
  }), [{
    ...r,
    className: Mt(n, ...o, ...l)
  }, {
    as: e,
    bsPrefix: t,
    spans: o
  }];
}
const gc = /* @__PURE__ */ he.forwardRef(
  // Need to define the default "as" during prop destructuring to be compatible with styled-components github.com/react-bootstrap/react-bootstrap/issues/3595
  (e, t) => {
    const [{
      className: n,
      ...r
    }, {
      as: i = "div",
      bsPrefix: a,
      spans: o
    }] = _b(e);
    return /* @__PURE__ */ W.jsx(i, {
      ...r,
      ref: t,
      className: Mt(n, !o.length && a)
    });
  }
);
gc.displayName = "Col";
const vg = /* @__PURE__ */ he.forwardRef(({
  bsPrefix: e,
  fluid: t = !1,
  // Need to define the default "as" during prop destructuring to be compatible with styled-components github.com/react-bootstrap/react-bootstrap/issues/3595
  as: n = "div",
  className: r,
  ...i
}, a) => {
  const o = Zt(e, "container"), l = typeof t == "string" ? `-${t}` : "-fluid";
  return /* @__PURE__ */ W.jsx(n, {
    ref: a,
    ...i,
    className: Mt(r, t ? `${o}${l}` : o)
  });
});
vg.displayName = "Container";
var El, Id;
function Mb() {
  if (Id) return El;
  Id = 1;
  var e = {}, t = e.NODE_ENV !== "production", n = function() {
  };
  if (t) {
    var r = function(a, o) {
      var l = arguments.length;
      o = new Array(l > 1 ? l - 1 : 0);
      for (var u = 1; u < l; u++)
        o[u - 1] = arguments[u];
      var s = 0, d = "Warning: " + a.replace(/%s/g, function() {
        return o[s++];
      });
      typeof console < "u" && console.error(d);
      try {
        throw new Error(d);
      } catch {
      }
    };
    n = function(i, a, o) {
      var l = arguments.length;
      o = new Array(l > 2 ? l - 2 : 0);
      for (var u = 2; u < l; u++)
        o[u - 2] = arguments[u];
      if (a === void 0)
        throw new Error(
          "`warning(condition, format, ...args)` requires a warning message argument"
        );
      i || r.apply(null, [a].concat(o));
    };
  }
  return El = n, El;
}
var Vb = Mb();
const bg = /* @__PURE__ */ Hn(Vb), Lb = {
  /**
   * Specify whether the feedback is for valid or invalid fields
   *
   * @type {('valid'|'invalid')}
   */
  type: _e.string,
  /** Display feedback as a tooltip. */
  tooltip: _e.bool,
  as: _e.elementType
}, xs = /* @__PURE__ */ he.forwardRef(
  // Need to define the default "as" during prop destructuring to be compatible with styled-components github.com/react-bootstrap/react-bootstrap/issues/3595
  ({
    as: e = "div",
    className: t,
    type: n = "valid",
    tooltip: r = !1,
    ...i
  }, a) => /* @__PURE__ */ W.jsx(e, {
    ...i,
    ref: a,
    className: Mt(t, `${n}-${r ? "tooltip" : "feedback"}`)
  })
);
xs.displayName = "Feedback";
xs.propTypes = Lb;
const Or = /* @__PURE__ */ he.createContext({}), hc = /* @__PURE__ */ he.forwardRef(({
  id: e,
  bsPrefix: t,
  className: n,
  type: r = "checkbox",
  isValid: i = !1,
  isInvalid: a = !1,
  // Need to define the default "as" during prop destructuring to be compatible with styled-components github.com/react-bootstrap/react-bootstrap/issues/3595
  as: o = "input",
  ...l
}, u) => {
  const {
    controlId: s
  } = Bn(Or);
  return t = Zt(t, "form-check-input"), /* @__PURE__ */ W.jsx(o, {
    ...l,
    ref: u,
    type: r,
    id: e || s,
    className: Mt(n, t, i && "is-valid", a && "is-invalid")
  });
});
hc.displayName = "FormCheckInput";
const Qa = /* @__PURE__ */ he.forwardRef(({
  bsPrefix: e,
  className: t,
  htmlFor: n,
  ...r
}, i) => {
  const {
    controlId: a
  } = Bn(Or);
  return e = Zt(e, "form-check-label"), /* @__PURE__ */ W.jsx("label", {
    ...r,
    ref: i,
    htmlFor: n || a,
    className: Mt(t, e)
  });
});
Qa.displayName = "FormCheckLabel";
const yg = /* @__PURE__ */ he.forwardRef(({
  id: e,
  bsPrefix: t,
  bsSwitchPrefix: n,
  inline: r = !1,
  reverse: i = !1,
  disabled: a = !1,
  isValid: o = !1,
  isInvalid: l = !1,
  feedbackTooltip: u = !1,
  feedback: s,
  feedbackType: d,
  className: c,
  style: m,
  title: h = "",
  type: x = "checkbox",
  label: v,
  children: b,
  // Need to define the default "as" during prop destructuring to be compatible with styled-components github.com/react-bootstrap/react-bootstrap/issues/3595
  as: I = "input",
  ...O
}, T) => {
  t = Zt(t, "form-check"), n = Zt(n, "form-switch");
  const {
    controlId: D
  } = Bn(Or), E = Pr(() => ({
    controlId: e || D
  }), [D, e]), B = !b && v != null && v !== !1 || Gb(b, Qa), X = /* @__PURE__ */ W.jsx(hc, {
    ...O,
    type: x === "switch" ? "checkbox" : x,
    ref: T,
    isValid: o,
    isInvalid: l,
    disabled: a,
    as: I
  });
  return /* @__PURE__ */ W.jsx(Or.Provider, {
    value: E,
    children: /* @__PURE__ */ W.jsx("div", {
      style: m,
      className: Mt(c, B && t, r && `${t}-inline`, i && `${t}-reverse`, x === "switch" && n),
      children: b || /* @__PURE__ */ W.jsxs(W.Fragment, {
        children: [X, B && /* @__PURE__ */ W.jsx(Qa, {
          title: h,
          children: v
        }), s && /* @__PURE__ */ W.jsx(xs, {
          type: d,
          tooltip: u,
          children: s
        })]
      })
    })
  });
});
yg.displayName = "FormCheck";
const Ka = Object.assign(yg, {
  Input: hc,
  Label: Qa
});
var Db = {};
const wg = /* @__PURE__ */ he.forwardRef(({
  bsPrefix: e,
  type: t,
  size: n,
  htmlSize: r,
  id: i,
  className: a,
  isValid: o = !1,
  isInvalid: l = !1,
  plaintext: u,
  readOnly: s,
  // Need to define the default "as" during prop destructuring to be compatible with styled-components github.com/react-bootstrap/react-bootstrap/issues/3595
  as: d = "input",
  ...c
}, m) => {
  const {
    controlId: h
  } = Bn(Or);
  return e = Zt(e, "form-control"), Db.NODE_ENV !== "production" && bg(h == null || !i, "`controlId` is ignored on `<FormControl>` when `id` is specified."), /* @__PURE__ */ W.jsx(d, {
    ...c,
    type: t,
    size: r,
    ref: m,
    readOnly: s,
    id: i || h,
    className: Mt(a, u ? `${e}-plaintext` : e, n && `${e}-${n}`, t === "color" && `${e}-color`, o && "is-valid", l && "is-invalid")
  });
});
wg.displayName = "FormControl";
const jb = Object.assign(wg, {
  Feedback: xs
}), xg = /* @__PURE__ */ he.forwardRef(({
  className: e,
  bsPrefix: t,
  as: n = "div",
  ...r
}, i) => (t = Zt(t, "form-floating"), /* @__PURE__ */ W.jsx(n, {
  ref: i,
  className: Mt(e, t),
  ...r
})));
xg.displayName = "FormFloating";
const mc = /* @__PURE__ */ he.forwardRef(({
  controlId: e,
  // Need to define the default "as" during prop destructuring to be compatible with styled-components github.com/react-bootstrap/react-bootstrap/issues/3595
  as: t = "div",
  ...n
}, r) => {
  const i = Pr(() => ({
    controlId: e
  }), [e]);
  return /* @__PURE__ */ W.jsx(Or.Provider, {
    value: i,
    children: /* @__PURE__ */ W.jsx(t, {
      ...n,
      ref: r
    })
  });
});
mc.displayName = "FormGroup";
var zb = {};
const Cg = /* @__PURE__ */ he.forwardRef(({
  // Need to define the default "as" during prop destructuring to be compatible with styled-components github.com/react-bootstrap/react-bootstrap/issues/3595
  as: e = "label",
  bsPrefix: t,
  column: n = !1,
  visuallyHidden: r = !1,
  className: i,
  htmlFor: a,
  ...o
}, l) => {
  const {
    controlId: u
  } = Bn(Or);
  t = Zt(t, "form-label");
  let s = "col-form-label";
  typeof n == "string" && (s = `${s} ${s}-${n}`);
  const d = Mt(i, t, r && "visually-hidden", n && s);
  return zb.NODE_ENV !== "production" && bg(u == null || !a, "`controlId` is ignored on `<FormLabel>` when `htmlFor` is specified."), a = a || u, n ? /* @__PURE__ */ W.jsx(gc, {
    ref: l,
    as: "label",
    className: d,
    htmlFor: a,
    ...o
  }) : (
    // eslint-disable-next-line jsx-a11y/label-has-for, jsx-a11y/label-has-associated-control
    /* @__PURE__ */ W.jsx(e, {
      ref: l,
      className: d,
      htmlFor: a,
      ...o
    })
  );
});
Cg.displayName = "FormLabel";
const Sg = /* @__PURE__ */ he.forwardRef(({
  bsPrefix: e,
  className: t,
  id: n,
  ...r
}, i) => {
  const {
    controlId: a
  } = Bn(Or);
  return e = Zt(e, "form-range"), /* @__PURE__ */ W.jsx("input", {
    ...r,
    type: "range",
    ref: i,
    className: Mt(t, e),
    id: n || a
  });
});
Sg.displayName = "FormRange";
const Ig = /* @__PURE__ */ he.forwardRef(({
  bsPrefix: e,
  size: t,
  htmlSize: n,
  className: r,
  isValid: i = !1,
  isInvalid: a = !1,
  id: o,
  ...l
}, u) => {
  const {
    controlId: s
  } = Bn(Or);
  return e = Zt(e, "form-select"), /* @__PURE__ */ W.jsx("select", {
    ...l,
    size: n,
    ref: u,
    className: Mt(r, e, t && `${e}-${t}`, i && "is-valid", a && "is-invalid"),
    id: o || s
  });
});
Ig.displayName = "FormSelect";
const Rg = /* @__PURE__ */ he.forwardRef(
  // Need to define the default "as" during prop destructuring to be compatible with styled-components github.com/react-bootstrap/react-bootstrap/issues/3595
  ({
    bsPrefix: e,
    className: t,
    as: n = "small",
    muted: r,
    ...i
  }, a) => (e = Zt(e, "form-text"), /* @__PURE__ */ W.jsx(n, {
    ...i,
    ref: a,
    className: Mt(t, e, r && "text-muted")
  }))
);
Rg.displayName = "FormText";
const Eg = /* @__PURE__ */ he.forwardRef((e, t) => /* @__PURE__ */ W.jsx(Ka, {
  ...e,
  ref: t,
  type: "switch"
}));
Eg.displayName = "Switch";
const Hb = Object.assign(Eg, {
  Input: Ka.Input,
  Label: Ka.Label
}), Ag = /* @__PURE__ */ he.forwardRef(({
  bsPrefix: e,
  className: t,
  children: n,
  controlId: r,
  label: i,
  ...a
}, o) => (e = Zt(e, "form-floating"), /* @__PURE__ */ W.jsxs(mc, {
  ref: o,
  className: Mt(t, e),
  controlId: r,
  ...a,
  children: [n, /* @__PURE__ */ W.jsx("label", {
    htmlFor: r,
    children: i
  })]
})));
Ag.displayName = "FloatingLabel";
const Wb = {
  /**
   * The Form `ref` will be forwarded to the underlying element,
   * which means, unless it's rendered `as` a composite component,
   * it will be a DOM node, when resolved.
   *
   * @type {ReactRef}
   * @alias ref
   */
  _ref: _e.any,
  /**
   * Mark a form as having been validated. Setting it to `true` will
   * toggle any validation styles on the forms elements.
   */
  validated: _e.bool,
  as: _e.elementType
}, vc = /* @__PURE__ */ he.forwardRef(({
  className: e,
  validated: t,
  // Need to define the default "as" during prop destructuring to be compatible with styled-components github.com/react-bootstrap/react-bootstrap/issues/3595
  as: n = "form",
  ...r
}, i) => /* @__PURE__ */ W.jsx(n, {
  ...r,
  ref: i,
  className: Mt(e, t && "was-validated")
}));
vc.displayName = "Form";
vc.propTypes = Wb;
const $b = Object.assign(vc, {
  Group: mc,
  Control: jb,
  Floating: xg,
  Check: Ka,
  Switch: Hb,
  Label: Cg,
  Text: Rg,
  Range: Sg,
  Select: Ig,
  FloatingLabel: Ag
}), bc = /* @__PURE__ */ he.forwardRef(({
  active: e = !1,
  disabled: t = !1,
  className: n,
  style: r,
  activeLabel: i = "(current)",
  children: a,
  linkStyle: o,
  linkClassName: l,
  as: u = rg,
  ...s
}, d) => {
  const c = e || t ? "span" : u;
  return /* @__PURE__ */ W.jsx("li", {
    ref: d,
    style: r,
    className: Mt(n, "page-item", {
      active: e,
      disabled: t
    }),
    children: /* @__PURE__ */ W.jsxs(c, {
      className: Mt("page-link", l),
      style: o,
      ...s,
      children: [a, e && i && /* @__PURE__ */ W.jsx("span", {
        className: "visually-hidden",
        children: i
      })]
    })
  });
});
bc.displayName = "PageItem";
function Do(e, t, n = e) {
  const r = /* @__PURE__ */ he.forwardRef(({
    children: i,
    ...a
  }, o) => /* @__PURE__ */ W.jsxs(bc, {
    ...a,
    ref: o,
    children: [/* @__PURE__ */ W.jsx("span", {
      "aria-hidden": "true",
      children: i || t
    }), /* @__PURE__ */ W.jsx("span", {
      className: "visually-hidden",
      children: n
    })]
  }));
  return r.displayName = e, r;
}
const Xb = Do("First", "«"), Yb = Do("Prev", "‹", "Previous"), Zb = Do("Ellipsis", "…", "More"), Jb = Do("Next", "›"), Ub = Do("Last", "»"), Pg = /* @__PURE__ */ he.forwardRef(({
  bsPrefix: e,
  className: t,
  size: n,
  ...r
}, i) => {
  const a = Zt(e, "pagination");
  return /* @__PURE__ */ W.jsx("ul", {
    ref: i,
    ...r,
    className: Mt(t, a, n && `${a}-${n}`)
  });
});
Pg.displayName = "Pagination";
const Ai = Object.assign(Pg, {
  First: Xb,
  Prev: Yb,
  Ellipsis: Zb,
  Item: bc,
  Next: Jb,
  Last: Ub
}), Tg = /* @__PURE__ */ he.forwardRef(({
  bsPrefix: e,
  className: t,
  // Need to define the default "as" during prop destructuring to be compatible with styled-components github.com/react-bootstrap/react-bootstrap/issues/3595
  as: n = "div",
  ...r
}, i) => {
  const a = Zt(e, "row"), o = Qp(), l = Kp(), u = `${a}-cols`, s = [];
  return o.forEach((d) => {
    const c = r[d];
    delete r[d];
    let m;
    c != null && typeof c == "object" ? {
      cols: m
    } = c : m = c;
    const h = d !== l ? `-${d}` : "";
    m != null && s.push(`${u}${h}-${m}`);
  }), /* @__PURE__ */ W.jsx(n, {
    ref: i,
    ...r,
    className: Mt(t, a, ...s)
  });
});
Tg.displayName = "Row";
const qb = /* @__PURE__ */ he.forwardRef(({
  bsPrefix: e,
  className: t,
  striped: n,
  bordered: r,
  borderless: i,
  hover: a,
  size: o,
  variant: l,
  responsive: u,
  ...s
}, d) => {
  const c = Zt(e, "table"), m = Mt(t, c, l && `${c}-${l}`, o && `${c}-${o}`, n && `${c}-${typeof n == "string" ? `striped-${n}` : "striped"}`, r && `${c}-bordered`, i && `${c}-borderless`, a && `${c}-hover`), h = /* @__PURE__ */ W.jsx("table", {
    ...s,
    className: m,
    ref: d
  });
  if (u) {
    let x = `${c}-responsive`;
    return typeof u == "string" && (x = `${x}-${u}`), /* @__PURE__ */ W.jsx("div", {
      className: x,
      children: h
    });
  }
  return h;
});
var Ca = { exports: {} }, Ut = {};
/**
 * @license React
 * react-is.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Rd;
function Qb() {
  if (Rd) return Ut;
  Rd = 1;
  var e = Symbol.for("react.transitional.element"), t = Symbol.for("react.portal"), n = Symbol.for("react.fragment"), r = Symbol.for("react.strict_mode"), i = Symbol.for("react.profiler"), a = Symbol.for("react.consumer"), o = Symbol.for("react.context"), l = Symbol.for("react.forward_ref"), u = Symbol.for("react.suspense"), s = Symbol.for("react.suspense_list"), d = Symbol.for("react.memo"), c = Symbol.for("react.lazy"), m = Symbol.for("react.offscreen"), h = Symbol.for("react.client.reference");
  function x(v) {
    if (typeof v == "object" && v !== null) {
      var b = v.$$typeof;
      switch (b) {
        case e:
          switch (v = v.type, v) {
            case n:
            case i:
            case r:
            case u:
            case s:
              return v;
            default:
              switch (v = v && v.$$typeof, v) {
                case o:
                case l:
                case c:
                case d:
                  return v;
                case a:
                  return v;
                default:
                  return b;
              }
          }
        case t:
          return b;
      }
    }
  }
  return Ut.ContextConsumer = a, Ut.ContextProvider = o, Ut.Element = e, Ut.ForwardRef = l, Ut.Fragment = n, Ut.Lazy = c, Ut.Memo = d, Ut.Portal = t, Ut.Profiler = i, Ut.StrictMode = r, Ut.Suspense = u, Ut.SuspenseList = s, Ut.isContextConsumer = function(v) {
    return x(v) === a;
  }, Ut.isContextProvider = function(v) {
    return x(v) === o;
  }, Ut.isElement = function(v) {
    return typeof v == "object" && v !== null && v.$$typeof === e;
  }, Ut.isForwardRef = function(v) {
    return x(v) === l;
  }, Ut.isFragment = function(v) {
    return x(v) === n;
  }, Ut.isLazy = function(v) {
    return x(v) === c;
  }, Ut.isMemo = function(v) {
    return x(v) === d;
  }, Ut.isPortal = function(v) {
    return x(v) === t;
  }, Ut.isProfiler = function(v) {
    return x(v) === i;
  }, Ut.isStrictMode = function(v) {
    return x(v) === r;
  }, Ut.isSuspense = function(v) {
    return x(v) === u;
  }, Ut.isSuspenseList = function(v) {
    return x(v) === s;
  }, Ut.isValidElementType = function(v) {
    return typeof v == "string" || typeof v == "function" || v === n || v === i || v === r || v === u || v === s || v === m || typeof v == "object" && v !== null && (v.$$typeof === c || v.$$typeof === d || v.$$typeof === o || v.$$typeof === a || v.$$typeof === l || v.$$typeof === h || v.getModuleId !== void 0);
  }, Ut.typeOf = x, Ut;
}
var qt = {}, Ed;
function Kb() {
  if (Ed) return qt;
  Ed = 1;
  var e = {};
  /**
   * @license React
   * react-is.development.js
   *
   * Copyright (c) Meta Platforms, Inc. and affiliates.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   */
  return e.NODE_ENV !== "production" && function() {
    function t(b) {
      if (typeof b == "object" && b !== null) {
        var I = b.$$typeof;
        switch (I) {
          case n:
            switch (b = b.type, b) {
              case i:
              case o:
              case a:
              case d:
              case c:
                return b;
              default:
                switch (b = b && b.$$typeof, b) {
                  case u:
                  case s:
                  case h:
                  case m:
                    return b;
                  case l:
                    return b;
                  default:
                    return I;
                }
            }
          case r:
            return I;
        }
      }
    }
    var n = Symbol.for("react.transitional.element"), r = Symbol.for("react.portal"), i = Symbol.for("react.fragment"), a = Symbol.for("react.strict_mode"), o = Symbol.for("react.profiler"), l = Symbol.for("react.consumer"), u = Symbol.for("react.context"), s = Symbol.for("react.forward_ref"), d = Symbol.for("react.suspense"), c = Symbol.for("react.suspense_list"), m = Symbol.for("react.memo"), h = Symbol.for("react.lazy"), x = Symbol.for("react.offscreen"), v = Symbol.for("react.client.reference");
    qt.ContextConsumer = l, qt.ContextProvider = u, qt.Element = n, qt.ForwardRef = s, qt.Fragment = i, qt.Lazy = h, qt.Memo = m, qt.Portal = r, qt.Profiler = o, qt.StrictMode = a, qt.Suspense = d, qt.SuspenseList = c, qt.isContextConsumer = function(b) {
      return t(b) === l;
    }, qt.isContextProvider = function(b) {
      return t(b) === u;
    }, qt.isElement = function(b) {
      return typeof b == "object" && b !== null && b.$$typeof === n;
    }, qt.isForwardRef = function(b) {
      return t(b) === s;
    }, qt.isFragment = function(b) {
      return t(b) === i;
    }, qt.isLazy = function(b) {
      return t(b) === h;
    }, qt.isMemo = function(b) {
      return t(b) === m;
    }, qt.isPortal = function(b) {
      return t(b) === r;
    }, qt.isProfiler = function(b) {
      return t(b) === o;
    }, qt.isStrictMode = function(b) {
      return t(b) === a;
    }, qt.isSuspense = function(b) {
      return t(b) === d;
    }, qt.isSuspenseList = function(b) {
      return t(b) === c;
    }, qt.isValidElementType = function(b) {
      return typeof b == "string" || typeof b == "function" || b === i || b === o || b === a || b === d || b === c || b === x || typeof b == "object" && b !== null && (b.$$typeof === h || b.$$typeof === m || b.$$typeof === u || b.$$typeof === l || b.$$typeof === s || b.$$typeof === v || b.getModuleId !== void 0);
    }, qt.typeOf = t;
  }(), qt;
}
var Ad;
function ey() {
  if (Ad) return Ca.exports;
  Ad = 1;
  var e = {};
  return e.NODE_ENV === "production" ? Ca.exports = /* @__PURE__ */ Qb() : Ca.exports = /* @__PURE__ */ Kb(), Ca.exports;
}
var yc = /* @__PURE__ */ ey();
function ty(e) {
  function t(A, w, H, $, _) {
    for (var re = 0, Y = 0, fe = 0, ge = 0, ve, Te, J = 0, ft = 0, je, et = je = ve = 0, pt = 0, Yt = 0, Cn = 0, kt = 0, gn = H.length, on = gn - 1, an, Ke = "", Ot = "", ee = "", we = "", Ze; pt < gn; ) {
      if (Te = H.charCodeAt(pt), pt === on && Y + ge + fe + re !== 0 && (Y !== 0 && (Te = Y === 47 ? 10 : 47), ge = fe = re = 0, gn++, on++), Y + ge + fe + re === 0) {
        if (pt === on && (0 < Yt && (Ke = Ke.replace(m, "")), 0 < Ke.trim().length)) {
          switch (Te) {
            case 32:
            case 9:
            case 59:
            case 13:
            case 10:
              break;
            default:
              Ke += H.charAt(pt);
          }
          Te = 59;
        }
        switch (Te) {
          case 123:
            for (Ke = Ke.trim(), ve = Ke.charCodeAt(0), je = 1, kt = ++pt; pt < gn; ) {
              switch (Te = H.charCodeAt(pt)) {
                case 123:
                  je++;
                  break;
                case 125:
                  je--;
                  break;
                case 47:
                  switch (Te = H.charCodeAt(pt + 1)) {
                    case 42:
                    case 47:
                      e: {
                        for (et = pt + 1; et < on; ++et)
                          switch (H.charCodeAt(et)) {
                            case 47:
                              if (Te === 42 && H.charCodeAt(et - 1) === 42 && pt + 2 !== et) {
                                pt = et + 1;
                                break e;
                              }
                              break;
                            case 10:
                              if (Te === 47) {
                                pt = et + 1;
                                break e;
                              }
                          }
                        pt = et;
                      }
                  }
                  break;
                case 91:
                  Te++;
                case 40:
                  Te++;
                case 34:
                case 39:
                  for (; pt++ < on && H.charCodeAt(pt) !== Te; )
                    ;
              }
              if (je === 0) break;
              pt++;
            }
            switch (je = H.substring(kt, pt), ve === 0 && (ve = (Ke = Ke.replace(c, "").trim()).charCodeAt(0)), ve) {
              case 64:
                switch (0 < Yt && (Ke = Ke.replace(m, "")), Te = Ke.charCodeAt(1), Te) {
                  case 100:
                  case 109:
                  case 115:
                  case 45:
                    Yt = w;
                    break;
                  default:
                    Yt = Ee;
                }
                if (je = t(w, Yt, je, Te, _ + 1), kt = je.length, 0 < $e && (Yt = n(Ee, Ke, Cn), Ze = l(3, je, Yt, w, ye, ce, kt, Te, _, $), Ke = Yt.join(""), Ze !== void 0 && (kt = (je = Ze.trim()).length) === 0 && (Te = 0, je = "")), 0 < kt) switch (Te) {
                  case 115:
                    Ke = Ke.replace(B, o);
                  case 100:
                  case 109:
                  case 45:
                    je = Ke + "{" + je + "}";
                    break;
                  case 107:
                    Ke = Ke.replace(O, "$1 $2"), je = Ke + "{" + je + "}", je = ue === 1 || ue === 2 && a("@" + je, 3) ? "@-webkit-" + je + "@" + je : "@" + je;
                    break;
                  default:
                    je = Ke + je, $ === 112 && (je = (Ot += je, ""));
                }
                else je = "";
                break;
              default:
                je = t(w, n(w, Ke, Cn), je, $, _ + 1);
            }
            ee += je, je = Cn = Yt = et = ve = 0, Ke = "", Te = H.charCodeAt(++pt);
            break;
          case 125:
          case 59:
            if (Ke = (0 < Yt ? Ke.replace(m, "") : Ke).trim(), 1 < (kt = Ke.length)) switch (et === 0 && (ve = Ke.charCodeAt(0), ve === 45 || 96 < ve && 123 > ve) && (kt = (Ke = Ke.replace(" ", ":")).length), 0 < $e && (Ze = l(1, Ke, w, A, ye, ce, Ot.length, $, _, $)) !== void 0 && (kt = (Ke = Ze.trim()).length) === 0 && (Ke = "\0\0"), ve = Ke.charCodeAt(0), Te = Ke.charCodeAt(1), ve) {
              case 0:
                break;
              case 64:
                if (Te === 105 || Te === 99) {
                  we += Ke + H.charAt(pt);
                  break;
                }
              default:
                Ke.charCodeAt(kt - 1) !== 58 && (Ot += i(Ke, ve, Te, Ke.charCodeAt(2)));
            }
            Cn = Yt = et = ve = 0, Ke = "", Te = H.charCodeAt(++pt);
        }
      }
      switch (Te) {
        case 13:
        case 10:
          Y === 47 ? Y = 0 : 1 + ve === 0 && $ !== 107 && 0 < Ke.length && (Yt = 1, Ke += "\0"), 0 < $e * G && l(0, Ke, w, A, ye, ce, Ot.length, $, _, $), ce = 1, ye++;
          break;
        case 59:
        case 125:
          if (Y + ge + fe + re === 0) {
            ce++;
            break;
          }
        default:
          switch (ce++, an = H.charAt(pt), Te) {
            case 9:
            case 32:
              if (ge + re + Y === 0) switch (J) {
                case 44:
                case 58:
                case 9:
                case 32:
                  an = "";
                  break;
                default:
                  Te !== 32 && (an = " ");
              }
              break;
            case 0:
              an = "\\0";
              break;
            case 12:
              an = "\\f";
              break;
            case 11:
              an = "\\v";
              break;
            case 38:
              ge + Y + re === 0 && (Yt = Cn = 1, an = "\f" + an);
              break;
            case 108:
              if (ge + Y + re + Q === 0 && 0 < et) switch (pt - et) {
                case 2:
                  J === 112 && H.charCodeAt(pt - 3) === 58 && (Q = J);
                case 8:
                  ft === 111 && (Q = ft);
              }
              break;
            case 58:
              ge + Y + re === 0 && (et = pt);
              break;
            case 44:
              Y + fe + ge + re === 0 && (Yt = 1, an += "\r");
              break;
            case 34:
            case 39:
              Y === 0 && (ge = ge === Te ? 0 : ge === 0 ? Te : ge);
              break;
            case 91:
              ge + Y + fe === 0 && re++;
              break;
            case 93:
              ge + Y + fe === 0 && re--;
              break;
            case 41:
              ge + Y + re === 0 && fe--;
              break;
            case 40:
              if (ge + Y + re === 0) {
                if (ve === 0) switch (2 * J + 3 * ft) {
                  case 533:
                    break;
                  default:
                    ve = 1;
                }
                fe++;
              }
              break;
            case 64:
              Y + fe + ge + re + et + je === 0 && (je = 1);
              break;
            case 42:
            case 47:
              if (!(0 < ge + re + fe)) switch (Y) {
                case 0:
                  switch (2 * Te + 3 * H.charCodeAt(pt + 1)) {
                    case 235:
                      Y = 47;
                      break;
                    case 220:
                      kt = pt, Y = 42;
                  }
                  break;
                case 42:
                  Te === 47 && J === 42 && kt + 2 !== pt && (H.charCodeAt(kt + 2) === 33 && (Ot += H.substring(kt, pt + 1)), an = "", Y = 0);
              }
          }
          Y === 0 && (Ke += an);
      }
      ft = J, J = Te, pt++;
    }
    if (kt = Ot.length, 0 < kt) {
      if (Yt = w, 0 < $e && (Ze = l(2, Ot, Yt, A, ye, ce, kt, $, _, $), Ze !== void 0 && (Ot = Ze).length === 0)) return we + Ot + ee;
      if (Ot = Yt.join(",") + "{" + Ot + "}", ue * Q !== 0) {
        switch (ue !== 2 || a(Ot, 2) || (Q = 0), Q) {
          case 111:
            Ot = Ot.replace(D, ":-moz-$1") + Ot;
            break;
          case 112:
            Ot = Ot.replace(T, "::-webkit-input-$1") + Ot.replace(T, "::-moz-$1") + Ot.replace(T, ":-ms-input-$1") + Ot;
        }
        Q = 0;
      }
    }
    return we + Ot + ee;
  }
  function n(A, w, H) {
    var $ = w.trim().split(b);
    w = $;
    var _ = $.length, re = A.length;
    switch (re) {
      case 0:
      case 1:
        var Y = 0;
        for (A = re === 0 ? "" : A[0] + " "; Y < _; ++Y)
          w[Y] = r(A, w[Y], H).trim();
        break;
      default:
        var fe = Y = 0;
        for (w = []; Y < _; ++Y)
          for (var ge = 0; ge < re; ++ge)
            w[fe++] = r(A[ge] + " ", $[Y], H).trim();
    }
    return w;
  }
  function r(A, w, H) {
    var $ = w.charCodeAt(0);
    switch (33 > $ && ($ = (w = w.trim()).charCodeAt(0)), $) {
      case 38:
        return w.replace(I, "$1" + A.trim());
      case 58:
        return A.trim() + w.replace(I, "$1" + A.trim());
      default:
        if (0 < 1 * H && 0 < w.indexOf("\f")) return w.replace(I, (A.charCodeAt(0) === 58 ? "" : "$1") + A.trim());
    }
    return A + w;
  }
  function i(A, w, H, $) {
    var _ = A + ";", re = 2 * w + 3 * H + 4 * $;
    if (re === 944) {
      A = _.indexOf(":", 9) + 1;
      var Y = _.substring(A, _.length - 1).trim();
      return Y = _.substring(0, A).trim() + Y + ";", ue === 1 || ue === 2 && a(Y, 1) ? "-webkit-" + Y + Y : Y;
    }
    if (ue === 0 || ue === 2 && !a(_, 1)) return _;
    switch (re) {
      case 1015:
        return _.charCodeAt(10) === 97 ? "-webkit-" + _ + _ : _;
      case 951:
        return _.charCodeAt(3) === 116 ? "-webkit-" + _ + _ : _;
      case 963:
        return _.charCodeAt(5) === 110 ? "-webkit-" + _ + _ : _;
      case 1009:
        if (_.charCodeAt(4) !== 100) break;
      case 969:
      case 942:
        return "-webkit-" + _ + _;
      case 978:
        return "-webkit-" + _ + "-moz-" + _ + _;
      case 1019:
      case 983:
        return "-webkit-" + _ + "-moz-" + _ + "-ms-" + _ + _;
      case 883:
        if (_.charCodeAt(8) === 45) return "-webkit-" + _ + _;
        if (0 < _.indexOf("image-set(", 11)) return _.replace(oe, "$1-webkit-$2") + _;
        break;
      case 932:
        if (_.charCodeAt(4) === 45) switch (_.charCodeAt(5)) {
          case 103:
            return "-webkit-box-" + _.replace("-grow", "") + "-webkit-" + _ + "-ms-" + _.replace("grow", "positive") + _;
          case 115:
            return "-webkit-" + _ + "-ms-" + _.replace("shrink", "negative") + _;
          case 98:
            return "-webkit-" + _ + "-ms-" + _.replace("basis", "preferred-size") + _;
        }
        return "-webkit-" + _ + "-ms-" + _ + _;
      case 964:
        return "-webkit-" + _ + "-ms-flex-" + _ + _;
      case 1023:
        if (_.charCodeAt(8) !== 99) break;
        return Y = _.substring(_.indexOf(":", 15)).replace("flex-", "").replace("space-between", "justify"), "-webkit-box-pack" + Y + "-webkit-" + _ + "-ms-flex-pack" + Y + _;
      case 1005:
        return x.test(_) ? _.replace(h, ":-webkit-") + _.replace(h, ":-moz-") + _ : _;
      case 1e3:
        switch (Y = _.substring(13).trim(), w = Y.indexOf("-") + 1, Y.charCodeAt(0) + Y.charCodeAt(w)) {
          case 226:
            Y = _.replace(E, "tb");
            break;
          case 232:
            Y = _.replace(E, "tb-rl");
            break;
          case 220:
            Y = _.replace(E, "lr");
            break;
          default:
            return _;
        }
        return "-webkit-" + _ + "-ms-" + Y + _;
      case 1017:
        if (_.indexOf("sticky", 9) === -1) break;
      case 975:
        switch (w = (_ = A).length - 10, Y = (_.charCodeAt(w) === 33 ? _.substring(0, w) : _).substring(A.indexOf(":", 7) + 1).trim(), re = Y.charCodeAt(0) + (Y.charCodeAt(7) | 0)) {
          case 203:
            if (111 > Y.charCodeAt(8)) break;
          case 115:
            _ = _.replace(Y, "-webkit-" + Y) + ";" + _;
            break;
          case 207:
          case 102:
            _ = _.replace(Y, "-webkit-" + (102 < re ? "inline-" : "") + "box") + ";" + _.replace(Y, "-webkit-" + Y) + ";" + _.replace(Y, "-ms-" + Y + "box") + ";" + _;
        }
        return _ + ";";
      case 938:
        if (_.charCodeAt(5) === 45) switch (_.charCodeAt(6)) {
          case 105:
            return Y = _.replace("-items", ""), "-webkit-" + _ + "-webkit-box-" + Y + "-ms-flex-" + Y + _;
          case 115:
            return "-webkit-" + _ + "-ms-flex-item-" + _.replace(U, "") + _;
          default:
            return "-webkit-" + _ + "-ms-flex-line-pack" + _.replace("align-content", "").replace(U, "") + _;
        }
        break;
      case 973:
      case 989:
        if (_.charCodeAt(3) !== 45 || _.charCodeAt(4) === 122) break;
      case 931:
      case 953:
        if (Fe.test(A) === !0) return (Y = A.substring(A.indexOf(":") + 1)).charCodeAt(0) === 115 ? i(A.replace("stretch", "fill-available"), w, H, $).replace(":fill-available", ":stretch") : _.replace(Y, "-webkit-" + Y) + _.replace(Y, "-moz-" + Y.replace("fill-", "")) + _;
        break;
      case 962:
        if (_ = "-webkit-" + _ + (_.charCodeAt(5) === 102 ? "-ms-" + _ : "") + _, H + $ === 211 && _.charCodeAt(13) === 105 && 0 < _.indexOf("transform", 10)) return _.substring(0, _.indexOf(";", 27) + 1).replace(v, "$1-webkit-$2") + _;
    }
    return _;
  }
  function a(A, w) {
    var H = A.indexOf(w === 1 ? ":" : "{"), $ = A.substring(0, w !== 3 ? H : 10);
    return H = A.substring(H + 1, A.length - 1), ht(w !== 2 ? $ : $.replace(K, "$1"), H, w);
  }
  function o(A, w) {
    var H = i(w, w.charCodeAt(0), w.charCodeAt(1), w.charCodeAt(2));
    return H !== w + ";" ? H.replace(X, " or ($1)").substring(4) : "(" + w + ")";
  }
  function l(A, w, H, $, _, re, Y, fe, ge, ve) {
    for (var Te = 0, J = w, ft; Te < $e; ++Te)
      switch (ft = We[Te].call(d, A, J, H, $, _, re, Y, fe, ge, ve)) {
        case void 0:
        case !1:
        case !0:
        case null:
          break;
        default:
          J = ft;
      }
    if (J !== w) return J;
  }
  function u(A) {
    switch (A) {
      case void 0:
      case null:
        $e = We.length = 0;
        break;
      default:
        if (typeof A == "function") We[$e++] = A;
        else if (typeof A == "object") for (var w = 0, H = A.length; w < H; ++w)
          u(A[w]);
        else G = !!A | 0;
    }
    return u;
  }
  function s(A) {
    return A = A.prefix, A !== void 0 && (ht = null, A ? typeof A != "function" ? ue = 1 : (ue = 2, ht = A) : ue = 0), s;
  }
  function d(A, w) {
    var H = A;
    if (33 > H.charCodeAt(0) && (H = H.trim()), Z = H, H = [Z], 0 < $e) {
      var $ = l(-1, w, H, H, ye, ce, 0, 0, 0, 0);
      $ !== void 0 && typeof $ == "string" && (w = $);
    }
    var _ = t(Ee, H, w, 0, 0);
    return 0 < $e && ($ = l(-2, _, H, H, ye, ce, _.length, 0, 0, 0), $ !== void 0 && (_ = $)), Z = "", Q = 0, ce = ye = 1, _;
  }
  var c = /^\0+/g, m = /[\0\r\f]/g, h = /: */g, x = /zoo|gra/, v = /([,: ])(transform)/g, b = /,\r+?/g, I = /([\t\r\n ])*\f?&/g, O = /@(k\w+)\s*(\S*)\s*/, T = /::(place)/g, D = /:(read-only)/g, E = /[svh]\w+-[tblr]{2}/, B = /\(\s*(.*)\s*\)/g, X = /([\s\S]*?);/g, U = /-self|flex-/g, K = /[^]*?(:[rp][el]a[\w-]+)[^]*/, Fe = /stretch|:\s*\w+\-(?:conte|avail)/, oe = /([^-])(image-set\()/, ce = 1, ye = 1, Q = 0, ue = 1, Ee = [], We = [], $e = 0, ht = null, G = 0, Z = "";
  return d.use = u, d.set = s, e !== void 0 && s(e), d;
}
var ny = {
  animationIterationCount: 1,
  borderImageOutset: 1,
  borderImageSlice: 1,
  borderImageWidth: 1,
  boxFlex: 1,
  boxFlexGroup: 1,
  boxOrdinalGroup: 1,
  columnCount: 1,
  columns: 1,
  flex: 1,
  flexGrow: 1,
  flexPositive: 1,
  flexShrink: 1,
  flexNegative: 1,
  flexOrder: 1,
  gridRow: 1,
  gridRowEnd: 1,
  gridRowSpan: 1,
  gridRowStart: 1,
  gridColumn: 1,
  gridColumnEnd: 1,
  gridColumnSpan: 1,
  gridColumnStart: 1,
  msGridRow: 1,
  msGridRowSpan: 1,
  msGridColumn: 1,
  msGridColumnSpan: 1,
  fontWeight: 1,
  lineHeight: 1,
  opacity: 1,
  order: 1,
  orphans: 1,
  tabSize: 1,
  widows: 1,
  zIndex: 1,
  zoom: 1,
  WebkitLineClamp: 1,
  // SVG-related properties
  fillOpacity: 1,
  floodOpacity: 1,
  stopOpacity: 1,
  strokeDasharray: 1,
  strokeDashoffset: 1,
  strokeMiterlimit: 1,
  strokeOpacity: 1,
  strokeWidth: 1
};
function kg(e) {
  var t = /* @__PURE__ */ Object.create(null);
  return function(n) {
    return t[n] === void 0 && (t[n] = e(n)), t[n];
  };
}
var ry = /^((children|dangerouslySetInnerHTML|key|ref|autoFocus|defaultValue|defaultChecked|innerHTML|suppressContentEditableWarning|suppressHydrationWarning|valueLink|abbr|accept|acceptCharset|accessKey|action|allow|allowUserMedia|allowPaymentRequest|allowFullScreen|allowTransparency|alt|async|autoComplete|autoPlay|capture|cellPadding|cellSpacing|challenge|charSet|checked|cite|classID|className|cols|colSpan|content|contentEditable|contextMenu|controls|controlsList|coords|crossOrigin|data|dateTime|decoding|default|defer|dir|disabled|disablePictureInPicture|disableRemotePlayback|download|draggable|encType|enterKeyHint|fetchpriority|fetchPriority|form|formAction|formEncType|formMethod|formNoValidate|formTarget|frameBorder|headers|height|hidden|high|href|hrefLang|htmlFor|httpEquiv|id|inputMode|integrity|is|keyParams|keyType|kind|label|lang|list|loading|loop|low|marginHeight|marginWidth|max|maxLength|media|mediaGroup|method|min|minLength|multiple|muted|name|nonce|noValidate|open|optimum|pattern|placeholder|playsInline|poster|preload|profile|radioGroup|readOnly|referrerPolicy|rel|required|reversed|role|rows|rowSpan|sandbox|scope|scoped|scrolling|seamless|selected|shape|size|sizes|slot|span|spellCheck|src|srcDoc|srcLang|srcSet|start|step|style|summary|tabIndex|target|title|translate|type|useMap|value|width|wmode|wrap|about|datatype|inlist|prefix|property|resource|typeof|vocab|autoCapitalize|autoCorrect|autoSave|color|incremental|fallback|inert|itemProp|itemScope|itemType|itemID|itemRef|on|option|results|security|unselectable|accentHeight|accumulate|additive|alignmentBaseline|allowReorder|alphabetic|amplitude|arabicForm|ascent|attributeName|attributeType|autoReverse|azimuth|baseFrequency|baselineShift|baseProfile|bbox|begin|bias|by|calcMode|capHeight|clip|clipPathUnits|clipPath|clipRule|colorInterpolation|colorInterpolationFilters|colorProfile|colorRendering|contentScriptType|contentStyleType|cursor|cx|cy|d|decelerate|descent|diffuseConstant|direction|display|divisor|dominantBaseline|dur|dx|dy|edgeMode|elevation|enableBackground|end|exponent|externalResourcesRequired|fill|fillOpacity|fillRule|filter|filterRes|filterUnits|floodColor|floodOpacity|focusable|fontFamily|fontSize|fontSizeAdjust|fontStretch|fontStyle|fontVariant|fontWeight|format|from|fr|fx|fy|g1|g2|glyphName|glyphOrientationHorizontal|glyphOrientationVertical|glyphRef|gradientTransform|gradientUnits|hanging|horizAdvX|horizOriginX|ideographic|imageRendering|in|in2|intercept|k|k1|k2|k3|k4|kernelMatrix|kernelUnitLength|kerning|keyPoints|keySplines|keyTimes|lengthAdjust|letterSpacing|lightingColor|limitingConeAngle|local|markerEnd|markerMid|markerStart|markerHeight|markerUnits|markerWidth|mask|maskContentUnits|maskUnits|mathematical|mode|numOctaves|offset|opacity|operator|order|orient|orientation|origin|overflow|overlinePosition|overlineThickness|panose1|paintOrder|pathLength|patternContentUnits|patternTransform|patternUnits|pointerEvents|points|pointsAtX|pointsAtY|pointsAtZ|preserveAlpha|preserveAspectRatio|primitiveUnits|r|radius|refX|refY|renderingIntent|repeatCount|repeatDur|requiredExtensions|requiredFeatures|restart|result|rotate|rx|ry|scale|seed|shapeRendering|slope|spacing|specularConstant|specularExponent|speed|spreadMethod|startOffset|stdDeviation|stemh|stemv|stitchTiles|stopColor|stopOpacity|strikethroughPosition|strikethroughThickness|string|stroke|strokeDasharray|strokeDashoffset|strokeLinecap|strokeLinejoin|strokeMiterlimit|strokeOpacity|strokeWidth|surfaceScale|systemLanguage|tableValues|targetX|targetY|textAnchor|textDecoration|textRendering|textLength|to|transform|u1|u2|underlinePosition|underlineThickness|unicode|unicodeBidi|unicodeRange|unitsPerEm|vAlphabetic|vHanging|vIdeographic|vMathematical|values|vectorEffect|version|vertAdvY|vertOriginX|vertOriginY|viewBox|viewTarget|visibility|widths|wordSpacing|writingMode|x|xHeight|x1|x2|xChannelSelector|xlinkActuate|xlinkArcrole|xlinkHref|xlinkRole|xlinkShow|xlinkTitle|xlinkType|xmlBase|xmlns|xmlnsXlink|xmlLang|xmlSpace|y|y1|y2|yChannelSelector|z|zoomAndPan|for|class|autofocus)|(([Dd][Aa][Tt][Aa]|[Aa][Rr][Ii][Aa]|x)-.*))$/, Pd = /* @__PURE__ */ kg(
  function(e) {
    return ry.test(e) || e.charCodeAt(0) === 111 && e.charCodeAt(1) === 110 && e.charCodeAt(2) < 91;
  }
  /* Z+1 */
), Sa = { exports: {} }, $t = {};
/** @license React v16.13.1
 * react-is.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Td;
function iy() {
  if (Td) return $t;
  Td = 1;
  var e = typeof Symbol == "function" && Symbol.for, t = e ? Symbol.for("react.element") : 60103, n = e ? Symbol.for("react.portal") : 60106, r = e ? Symbol.for("react.fragment") : 60107, i = e ? Symbol.for("react.strict_mode") : 60108, a = e ? Symbol.for("react.profiler") : 60114, o = e ? Symbol.for("react.provider") : 60109, l = e ? Symbol.for("react.context") : 60110, u = e ? Symbol.for("react.async_mode") : 60111, s = e ? Symbol.for("react.concurrent_mode") : 60111, d = e ? Symbol.for("react.forward_ref") : 60112, c = e ? Symbol.for("react.suspense") : 60113, m = e ? Symbol.for("react.suspense_list") : 60120, h = e ? Symbol.for("react.memo") : 60115, x = e ? Symbol.for("react.lazy") : 60116, v = e ? Symbol.for("react.block") : 60121, b = e ? Symbol.for("react.fundamental") : 60117, I = e ? Symbol.for("react.responder") : 60118, O = e ? Symbol.for("react.scope") : 60119;
  function T(E) {
    if (typeof E == "object" && E !== null) {
      var B = E.$$typeof;
      switch (B) {
        case t:
          switch (E = E.type, E) {
            case u:
            case s:
            case r:
            case a:
            case i:
            case c:
              return E;
            default:
              switch (E = E && E.$$typeof, E) {
                case l:
                case d:
                case x:
                case h:
                case o:
                  return E;
                default:
                  return B;
              }
          }
        case n:
          return B;
      }
    }
  }
  function D(E) {
    return T(E) === s;
  }
  return $t.AsyncMode = u, $t.ConcurrentMode = s, $t.ContextConsumer = l, $t.ContextProvider = o, $t.Element = t, $t.ForwardRef = d, $t.Fragment = r, $t.Lazy = x, $t.Memo = h, $t.Portal = n, $t.Profiler = a, $t.StrictMode = i, $t.Suspense = c, $t.isAsyncMode = function(E) {
    return D(E) || T(E) === u;
  }, $t.isConcurrentMode = D, $t.isContextConsumer = function(E) {
    return T(E) === l;
  }, $t.isContextProvider = function(E) {
    return T(E) === o;
  }, $t.isElement = function(E) {
    return typeof E == "object" && E !== null && E.$$typeof === t;
  }, $t.isForwardRef = function(E) {
    return T(E) === d;
  }, $t.isFragment = function(E) {
    return T(E) === r;
  }, $t.isLazy = function(E) {
    return T(E) === x;
  }, $t.isMemo = function(E) {
    return T(E) === h;
  }, $t.isPortal = function(E) {
    return T(E) === n;
  }, $t.isProfiler = function(E) {
    return T(E) === a;
  }, $t.isStrictMode = function(E) {
    return T(E) === i;
  }, $t.isSuspense = function(E) {
    return T(E) === c;
  }, $t.isValidElementType = function(E) {
    return typeof E == "string" || typeof E == "function" || E === r || E === s || E === a || E === i || E === c || E === m || typeof E == "object" && E !== null && (E.$$typeof === x || E.$$typeof === h || E.$$typeof === o || E.$$typeof === l || E.$$typeof === d || E.$$typeof === b || E.$$typeof === I || E.$$typeof === O || E.$$typeof === v);
  }, $t.typeOf = T, $t;
}
var Xt = {}, kd;
function oy() {
  if (kd) return Xt;
  kd = 1;
  var e = {};
  /** @license React v16.13.1
   * react-is.development.js
   *
   * Copyright (c) Facebook, Inc. and its affiliates.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   */
  return e.NODE_ENV !== "production" && function() {
    var t = typeof Symbol == "function" && Symbol.for, n = t ? Symbol.for("react.element") : 60103, r = t ? Symbol.for("react.portal") : 60106, i = t ? Symbol.for("react.fragment") : 60107, a = t ? Symbol.for("react.strict_mode") : 60108, o = t ? Symbol.for("react.profiler") : 60114, l = t ? Symbol.for("react.provider") : 60109, u = t ? Symbol.for("react.context") : 60110, s = t ? Symbol.for("react.async_mode") : 60111, d = t ? Symbol.for("react.concurrent_mode") : 60111, c = t ? Symbol.for("react.forward_ref") : 60112, m = t ? Symbol.for("react.suspense") : 60113, h = t ? Symbol.for("react.suspense_list") : 60120, x = t ? Symbol.for("react.memo") : 60115, v = t ? Symbol.for("react.lazy") : 60116, b = t ? Symbol.for("react.block") : 60121, I = t ? Symbol.for("react.fundamental") : 60117, O = t ? Symbol.for("react.responder") : 60118, T = t ? Symbol.for("react.scope") : 60119;
    function D(J) {
      return typeof J == "string" || typeof J == "function" || // Note: its typeof might be other than 'symbol' or 'number' if it's a polyfill.
      J === i || J === d || J === o || J === a || J === m || J === h || typeof J == "object" && J !== null && (J.$$typeof === v || J.$$typeof === x || J.$$typeof === l || J.$$typeof === u || J.$$typeof === c || J.$$typeof === I || J.$$typeof === O || J.$$typeof === T || J.$$typeof === b);
    }
    function E(J) {
      if (typeof J == "object" && J !== null) {
        var ft = J.$$typeof;
        switch (ft) {
          case n:
            var je = J.type;
            switch (je) {
              case s:
              case d:
              case i:
              case o:
              case a:
              case m:
                return je;
              default:
                var et = je && je.$$typeof;
                switch (et) {
                  case u:
                  case c:
                  case v:
                  case x:
                  case l:
                    return et;
                  default:
                    return ft;
                }
            }
          case r:
            return ft;
        }
      }
    }
    var B = s, X = d, U = u, K = l, Fe = n, oe = c, ce = i, ye = v, Q = x, ue = r, Ee = o, We = a, $e = m, ht = !1;
    function G(J) {
      return ht || (ht = !0, console.warn("The ReactIs.isAsyncMode() alias has been deprecated, and will be removed in React 17+. Update your code to use ReactIs.isConcurrentMode() instead. It has the exact same API.")), Z(J) || E(J) === s;
    }
    function Z(J) {
      return E(J) === d;
    }
    function A(J) {
      return E(J) === u;
    }
    function w(J) {
      return E(J) === l;
    }
    function H(J) {
      return typeof J == "object" && J !== null && J.$$typeof === n;
    }
    function $(J) {
      return E(J) === c;
    }
    function _(J) {
      return E(J) === i;
    }
    function re(J) {
      return E(J) === v;
    }
    function Y(J) {
      return E(J) === x;
    }
    function fe(J) {
      return E(J) === r;
    }
    function ge(J) {
      return E(J) === o;
    }
    function ve(J) {
      return E(J) === a;
    }
    function Te(J) {
      return E(J) === m;
    }
    Xt.AsyncMode = B, Xt.ConcurrentMode = X, Xt.ContextConsumer = U, Xt.ContextProvider = K, Xt.Element = Fe, Xt.ForwardRef = oe, Xt.Fragment = ce, Xt.Lazy = ye, Xt.Memo = Q, Xt.Portal = ue, Xt.Profiler = Ee, Xt.StrictMode = We, Xt.Suspense = $e, Xt.isAsyncMode = G, Xt.isConcurrentMode = Z, Xt.isContextConsumer = A, Xt.isContextProvider = w, Xt.isElement = H, Xt.isForwardRef = $, Xt.isFragment = _, Xt.isLazy = re, Xt.isMemo = Y, Xt.isPortal = fe, Xt.isProfiler = ge, Xt.isStrictMode = ve, Xt.isSuspense = Te, Xt.isValidElementType = D, Xt.typeOf = E;
  }(), Xt;
}
var Od;
function ay() {
  if (Od) return Sa.exports;
  Od = 1;
  var e = {};
  return e.NODE_ENV === "production" ? Sa.exports = iy() : Sa.exports = oy(), Sa.exports;
}
var Al, Fd;
function sy() {
  if (Fd) return Al;
  Fd = 1;
  var e = ay(), t = {
    childContextTypes: !0,
    contextType: !0,
    contextTypes: !0,
    defaultProps: !0,
    displayName: !0,
    getDefaultProps: !0,
    getDerivedStateFromError: !0,
    getDerivedStateFromProps: !0,
    mixins: !0,
    propTypes: !0,
    type: !0
  }, n = {
    name: !0,
    length: !0,
    prototype: !0,
    caller: !0,
    callee: !0,
    arguments: !0,
    arity: !0
  }, r = {
    $$typeof: !0,
    render: !0,
    defaultProps: !0,
    displayName: !0,
    propTypes: !0
  }, i = {
    $$typeof: !0,
    compare: !0,
    defaultProps: !0,
    displayName: !0,
    propTypes: !0,
    type: !0
  }, a = {};
  a[e.ForwardRef] = r, a[e.Memo] = i;
  function o(x) {
    return e.isMemo(x) ? i : a[x.$$typeof] || t;
  }
  var l = Object.defineProperty, u = Object.getOwnPropertyNames, s = Object.getOwnPropertySymbols, d = Object.getOwnPropertyDescriptor, c = Object.getPrototypeOf, m = Object.prototype;
  function h(x, v, b) {
    if (typeof v != "string") {
      if (m) {
        var I = c(v);
        I && I !== m && h(x, I, b);
      }
      var O = u(v);
      s && (O = O.concat(s(v)));
      for (var T = o(x), D = o(v), E = 0; E < O.length; ++E) {
        var B = O[E];
        if (!n[B] && !(b && b[B]) && !(D && D[B]) && !(T && T[B])) {
          var X = d(v, B);
          try {
            l(x, B, X);
          } catch {
          }
        }
      }
    }
    return x;
  }
  return Al = h, Al;
}
var ly = sy();
const uy = /* @__PURE__ */ Hn(ly);
var Qt = {};
function Tr() {
  return (Tr = Object.assign || function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var n = arguments[t];
      for (var r in n) Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r]);
    }
    return e;
  }).apply(this, arguments);
}
var Bd = function(e, t) {
  for (var n = [e[0]], r = 0, i = t.length; r < i; r += 1) n.push(t[r], e[r + 1]);
  return n;
}, Su = function(e) {
  return e !== null && typeof e == "object" && (e.toString ? e.toString() : Object.prototype.toString.call(e)) === "[object Object]" && !yc.typeOf(e);
}, es = Object.freeze([]), Zr = Object.freeze({});
function Po(e) {
  return typeof e == "function";
}
function Iu(e) {
  return Qt.NODE_ENV !== "production" && typeof e == "string" && e || e.displayName || e.name || "Component";
}
function wc(e) {
  return e && typeof e.styledComponentId == "string";
}
var Mi = typeof process < "u" && Qt !== void 0 && (Qt.REACT_APP_SC_ATTR || Qt.SC_ATTR) || "data-styled", xc = typeof window < "u" && "HTMLElement" in window, cy = !!(typeof SC_DISABLE_SPEEDY == "boolean" ? SC_DISABLE_SPEEDY : typeof process < "u" && Qt !== void 0 && (Qt.REACT_APP_SC_DISABLE_SPEEDY !== void 0 && Qt.REACT_APP_SC_DISABLE_SPEEDY !== "" ? Qt.REACT_APP_SC_DISABLE_SPEEDY !== "false" && Qt.REACT_APP_SC_DISABLE_SPEEDY : Qt.SC_DISABLE_SPEEDY !== void 0 && Qt.SC_DISABLE_SPEEDY !== "" ? Qt.SC_DISABLE_SPEEDY !== "false" && Qt.SC_DISABLE_SPEEDY : Qt.NODE_ENV !== "production")), dy = Qt.NODE_ENV !== "production" ? { 1: `Cannot create styled-component for component: %s.

`, 2: `Can't collect styles once you've consumed a \`ServerStyleSheet\`'s styles! \`ServerStyleSheet\` is a one off instance for each server-side render cycle.

- Are you trying to reuse it across renders?
- Are you accidentally calling collectStyles twice?

`, 3: `Streaming SSR is only supported in a Node.js environment; Please do not try to call this method in the browser.

`, 4: `The \`StyleSheetManager\` expects a valid target or sheet prop!

- Does this error occur on the client and is your target falsy?
- Does this error occur on the server and is the sheet falsy?

`, 5: `The clone method cannot be used on the client!

- Are you running in a client-like environment on the server?
- Are you trying to run SSR on the client?

`, 6: `Trying to insert a new style tag, but the given Node is unmounted!

- Are you using a custom target that isn't mounted?
- Does your document not have a valid head element?
- Have you accidentally removed a style tag manually?

`, 7: 'ThemeProvider: Please return an object from your "theme" prop function, e.g.\n\n```js\ntheme={() => ({})}\n```\n\n', 8: `ThemeProvider: Please make your "theme" prop an object.

`, 9: "Missing document `<head>`\n\n", 10: `Cannot find a StyleSheet instance. Usually this happens if there are multiple copies of styled-components loaded at once. Check out this issue for how to troubleshoot and fix the common cases where this situation can happen: https://github.com/styled-components/styled-components/issues/1941#issuecomment-417862021

`, 11: `_This error was replaced with a dev-time warning, it will be deleted for v4 final._ [createGlobalStyle] received children which will not be rendered. Please use the component without passing children elements.

`, 12: "It seems you are interpolating a keyframe declaration (%s) into an untagged string. This was supported in styled-components v3, but is not longer supported in v4 as keyframes are now injected on-demand. Please wrap your string in the css\\`\\` helper which ensures the styles are injected correctly. See https://www.styled-components.com/docs/api#css\n\n", 13: `%s is not a styled component and cannot be referred to via component selector. See https://www.styled-components.com/docs/advanced#referring-to-other-components for more details.

`, 14: `ThemeProvider: "theme" prop is required.

`, 15: "A stylis plugin has been supplied that is not named. We need a name for each plugin to be able to prevent styling collisions between different stylis configurations within the same app. Before you pass your plugin to `<StyleSheetManager stylisPlugins={[]}>`, please make sure each plugin is uniquely-named, e.g.\n\n```js\nObject.defineProperty(importedPlugin, 'name', { value: 'some-unique-name' });\n```\n\n", 16: `Reached the limit of how many styled components may be created at group %s.
You may only create up to 1,073,741,824 components. If you're creating components dynamically,
as for instance in your render method then you may be running into this limitation.

`, 17: `CSSStyleSheet could not be found on HTMLStyleElement.
Has styled-components' style tag been unmounted or altered by another script?
` } : {};
function fy() {
  for (var e = arguments.length <= 0 ? void 0 : arguments[0], t = [], n = 1, r = arguments.length; n < r; n += 1) t.push(n < 0 || arguments.length <= n ? void 0 : arguments[n]);
  return t.forEach(function(i) {
    e = e.replace(/%[a-z]/, i);
  }), e;
}
function Hi(e) {
  for (var t = arguments.length, n = new Array(t > 1 ? t - 1 : 0), r = 1; r < t; r++) n[r - 1] = arguments[r];
  throw Qt.NODE_ENV === "production" ? new Error("An error occurred. See https://git.io/JUIaE#" + e + " for more information." + (n.length > 0 ? " Args: " + n.join(", ") : "")) : new Error(fy.apply(void 0, [dy[e]].concat(n)).trim());
}
var py = function() {
  function e(n) {
    this.groupSizes = new Uint32Array(512), this.length = 512, this.tag = n;
  }
  var t = e.prototype;
  return t.indexOfGroup = function(n) {
    for (var r = 0, i = 0; i < n; i++) r += this.groupSizes[i];
    return r;
  }, t.insertRules = function(n, r) {
    if (n >= this.groupSizes.length) {
      for (var i = this.groupSizes, a = i.length, o = a; n >= o; ) (o <<= 1) < 0 && Hi(16, "" + n);
      this.groupSizes = new Uint32Array(o), this.groupSizes.set(i), this.length = o;
      for (var l = a; l < o; l++) this.groupSizes[l] = 0;
    }
    for (var u = this.indexOfGroup(n + 1), s = 0, d = r.length; s < d; s++) this.tag.insertRule(u, r[s]) && (this.groupSizes[n]++, u++);
  }, t.clearGroup = function(n) {
    if (n < this.length) {
      var r = this.groupSizes[n], i = this.indexOfGroup(n), a = i + r;
      this.groupSizes[n] = 0;
      for (var o = i; o < a; o++) this.tag.deleteRule(i);
    }
  }, t.getGroup = function(n) {
    var r = "";
    if (n >= this.length || this.groupSizes[n] === 0) return r;
    for (var i = this.groupSizes[n], a = this.indexOfGroup(n), o = a + i, l = a; l < o; l++) r += this.tag.getRule(l) + `/*!sc*/
`;
    return r;
  }, e;
}(), Da = /* @__PURE__ */ new Map(), ts = /* @__PURE__ */ new Map(), wo = 1, Ia = function(e) {
  if (Da.has(e)) return Da.get(e);
  for (; ts.has(wo); ) wo++;
  var t = wo++;
  return Qt.NODE_ENV !== "production" && ((0 | t) < 0 || t > 1 << 30) && Hi(16, "" + t), Da.set(e, t), ts.set(t, e), t;
}, gy = function(e) {
  return ts.get(e);
}, hy = function(e, t) {
  t >= wo && (wo = t + 1), Da.set(e, t), ts.set(t, e);
}, my = "style[" + Mi + '][data-styled-version="5.3.11"]', vy = new RegExp("^" + Mi + '\\.g(\\d+)\\[id="([\\w\\d-]+)"\\].*?"([^"]*)'), by = function(e, t, n) {
  for (var r, i = n.split(","), a = 0, o = i.length; a < o; a++) (r = i[a]) && e.registerName(t, r);
}, yy = function(e, t) {
  for (var n = (t.textContent || "").split(`/*!sc*/
`), r = [], i = 0, a = n.length; i < a; i++) {
    var o = n[i].trim();
    if (o) {
      var l = o.match(vy);
      if (l) {
        var u = 0 | parseInt(l[1], 10), s = l[2];
        u !== 0 && (hy(s, u), by(e, s, l[3]), e.getTag().insertRules(u, r)), r.length = 0;
      } else r.push(o);
    }
  }
}, wy = function() {
  return typeof __webpack_nonce__ < "u" ? __webpack_nonce__ : null;
}, Og = function(e) {
  var t = document.head, n = e || t, r = document.createElement("style"), i = function(l) {
    for (var u = l.childNodes, s = u.length; s >= 0; s--) {
      var d = u[s];
      if (d && d.nodeType === 1 && d.hasAttribute(Mi)) return d;
    }
  }(n), a = i !== void 0 ? i.nextSibling : null;
  r.setAttribute(Mi, "active"), r.setAttribute("data-styled-version", "5.3.11");
  var o = wy();
  return o && r.setAttribute("nonce", o), n.insertBefore(r, a), r;
}, xy = function() {
  function e(n) {
    var r = this.element = Og(n);
    r.appendChild(document.createTextNode("")), this.sheet = function(i) {
      if (i.sheet) return i.sheet;
      for (var a = document.styleSheets, o = 0, l = a.length; o < l; o++) {
        var u = a[o];
        if (u.ownerNode === i) return u;
      }
      Hi(17);
    }(r), this.length = 0;
  }
  var t = e.prototype;
  return t.insertRule = function(n, r) {
    try {
      return this.sheet.insertRule(r, n), this.length++, !0;
    } catch {
      return !1;
    }
  }, t.deleteRule = function(n) {
    this.sheet.deleteRule(n), this.length--;
  }, t.getRule = function(n) {
    var r = this.sheet.cssRules[n];
    return r !== void 0 && typeof r.cssText == "string" ? r.cssText : "";
  }, e;
}(), Cy = function() {
  function e(n) {
    var r = this.element = Og(n);
    this.nodes = r.childNodes, this.length = 0;
  }
  var t = e.prototype;
  return t.insertRule = function(n, r) {
    if (n <= this.length && n >= 0) {
      var i = document.createTextNode(r), a = this.nodes[n];
      return this.element.insertBefore(i, a || null), this.length++, !0;
    }
    return !1;
  }, t.deleteRule = function(n) {
    this.element.removeChild(this.nodes[n]), this.length--;
  }, t.getRule = function(n) {
    return n < this.length ? this.nodes[n].textContent : "";
  }, e;
}(), Sy = function() {
  function e(n) {
    this.rules = [], this.length = 0;
  }
  var t = e.prototype;
  return t.insertRule = function(n, r) {
    return n <= this.length && (this.rules.splice(n, 0, r), this.length++, !0);
  }, t.deleteRule = function(n) {
    this.rules.splice(n, 1), this.length--;
  }, t.getRule = function(n) {
    return n < this.length ? this.rules[n] : "";
  }, e;
}(), Nd = xc, Iy = { isServer: !xc, useCSSOMInjection: !cy }, Fg = function() {
  function e(n, r, i) {
    n === void 0 && (n = Zr), r === void 0 && (r = {}), this.options = Tr({}, Iy, {}, n), this.gs = r, this.names = new Map(i), this.server = !!n.isServer, !this.server && xc && Nd && (Nd = !1, function(a) {
      for (var o = document.querySelectorAll(my), l = 0, u = o.length; l < u; l++) {
        var s = o[l];
        s && s.getAttribute(Mi) !== "active" && (yy(a, s), s.parentNode && s.parentNode.removeChild(s));
      }
    }(this));
  }
  e.registerId = function(n) {
    return Ia(n);
  };
  var t = e.prototype;
  return t.reconstructWithOptions = function(n, r) {
    return r === void 0 && (r = !0), new e(Tr({}, this.options, {}, n), this.gs, r && this.names || void 0);
  }, t.allocateGSInstance = function(n) {
    return this.gs[n] = (this.gs[n] || 0) + 1;
  }, t.getTag = function() {
    return this.tag || (this.tag = (i = (r = this.options).isServer, a = r.useCSSOMInjection, o = r.target, n = i ? new Sy(o) : a ? new xy(o) : new Cy(o), new py(n)));
    var n, r, i, a, o;
  }, t.hasNameForId = function(n, r) {
    return this.names.has(n) && this.names.get(n).has(r);
  }, t.registerName = function(n, r) {
    if (Ia(n), this.names.has(n)) this.names.get(n).add(r);
    else {
      var i = /* @__PURE__ */ new Set();
      i.add(r), this.names.set(n, i);
    }
  }, t.insertRules = function(n, r, i) {
    this.registerName(n, r), this.getTag().insertRules(Ia(n), i);
  }, t.clearNames = function(n) {
    this.names.has(n) && this.names.get(n).clear();
  }, t.clearRules = function(n) {
    this.getTag().clearGroup(Ia(n)), this.clearNames(n);
  }, t.clearTag = function() {
    this.tag = void 0;
  }, t.toString = function() {
    return function(n) {
      for (var r = n.getTag(), i = r.length, a = "", o = 0; o < i; o++) {
        var l = gy(o);
        if (l !== void 0) {
          var u = n.names.get(l), s = r.getGroup(o);
          if (u && s && u.size) {
            var d = Mi + ".g" + o + '[id="' + l + '"]', c = "";
            u !== void 0 && u.forEach(function(m) {
              m.length > 0 && (c += m + ",");
            }), a += "" + s + d + '{content:"' + c + `"}/*!sc*/
`;
          }
        }
      }
      return a;
    }(this);
  }, e;
}(), Ry = /(a)(d)/gi, Gd = function(e) {
  return String.fromCharCode(e + (e > 25 ? 39 : 97));
};
function Ru(e) {
  var t, n = "";
  for (t = Math.abs(e); t > 52; t = t / 52 | 0) n = Gd(t % 52) + n;
  return (Gd(t % 52) + n).replace(Ry, "$1-$2");
}
var ui = function(e, t) {
  for (var n = t.length; n; ) e = 33 * e ^ t.charCodeAt(--n);
  return e;
}, Bg = function(e) {
  return ui(5381, e);
};
function Ey(e) {
  for (var t = 0; t < e.length; t += 1) {
    var n = e[t];
    if (Po(n) && !wc(n)) return !1;
  }
  return !0;
}
var Ay = Bg("5.3.11"), Py = function() {
  function e(t, n, r) {
    this.rules = t, this.staticRulesId = "", this.isStatic = Qt.NODE_ENV === "production" && (r === void 0 || r.isStatic) && Ey(t), this.componentId = n, this.baseHash = ui(Ay, n), this.baseStyle = r, Fg.registerId(n);
  }
  return e.prototype.generateAndInjectStyles = function(t, n, r) {
    var i = this.componentId, a = [];
    if (this.baseStyle && a.push(this.baseStyle.generateAndInjectStyles(t, n, r)), this.isStatic && !r.hash) if (this.staticRulesId && n.hasNameForId(i, this.staticRulesId)) a.push(this.staticRulesId);
    else {
      var o = Vi(this.rules, t, n, r).join(""), l = Ru(ui(this.baseHash, o) >>> 0);
      if (!n.hasNameForId(i, l)) {
        var u = r(o, "." + l, void 0, i);
        n.insertRules(i, l, u);
      }
      a.push(l), this.staticRulesId = l;
    }
    else {
      for (var s = this.rules.length, d = ui(this.baseHash, r.hash), c = "", m = 0; m < s; m++) {
        var h = this.rules[m];
        if (typeof h == "string") c += h, Qt.NODE_ENV !== "production" && (d = ui(d, h + m));
        else if (h) {
          var x = Vi(h, t, n, r), v = Array.isArray(x) ? x.join("") : x;
          d = ui(d, v + m), c += v;
        }
      }
      if (c) {
        var b = Ru(d >>> 0);
        if (!n.hasNameForId(i, b)) {
          var I = r(c, "." + b, void 0, i);
          n.insertRules(i, b, I);
        }
        a.push(b);
      }
    }
    return a.join(" ");
  }, e;
}(), Ty = /^\s*\/\/.*$/gm, ky = [":", "[", ".", "#"];
function Oy(e) {
  var t, n, r, i, a = Zr, o = a.options, l = o === void 0 ? Zr : o, u = a.plugins, s = u === void 0 ? es : u, d = new ty(l), c = [], m = /* @__PURE__ */ function(v) {
    function b(I) {
      if (I) try {
        v(I + "}");
      } catch {
      }
    }
    return function(I, O, T, D, E, B, X, U, K, Fe) {
      switch (I) {
        case 1:
          if (K === 0 && O.charCodeAt(0) === 64) return v(O + ";"), "";
          break;
        case 2:
          if (U === 0) return O + "/*|*/";
          break;
        case 3:
          switch (U) {
            case 102:
            case 112:
              return v(T[0] + O), "";
            default:
              return O + (Fe === 0 ? "/*|*/" : "");
          }
        case -2:
          O.split("/*|*/}").forEach(b);
      }
    };
  }(function(v) {
    c.push(v);
  }), h = function(v, b, I) {
    return b === 0 && ky.indexOf(I[n.length]) !== -1 || I.match(i) ? v : "." + t;
  };
  function x(v, b, I, O) {
    O === void 0 && (O = "&");
    var T = v.replace(Ty, ""), D = b && I ? I + " " + b + " { " + T + " }" : T;
    return t = O, n = b, r = new RegExp("\\" + n + "\\b", "g"), i = new RegExp("(\\" + n + "\\b){2,}"), d(I || !b ? "" : b, D);
  }
  return d.use([].concat(s, [function(v, b, I) {
    v === 2 && I.length && I[0].lastIndexOf(n) > 0 && (I[0] = I[0].replace(r, h));
  }, m, function(v) {
    if (v === -2) {
      var b = c;
      return c = [], b;
    }
  }])), x.hash = s.length ? s.reduce(function(v, b) {
    return b.name || Hi(15), ui(v, b.name);
  }, 5381).toString() : "", x;
}
var Ng = cn.createContext();
Ng.Consumer;
var Gg = cn.createContext(), Fy = (Gg.Consumer, new Fg()), Eu = Oy();
function By() {
  return Bn(Ng) || Fy;
}
function Ny() {
  return Bn(Gg) || Eu;
}
var Gy = function() {
  function e(t, n) {
    var r = this;
    this.inject = function(i, a) {
      a === void 0 && (a = Eu);
      var o = r.name + a.hash;
      i.hasNameForId(r.id, o) || i.insertRules(r.id, o, a(r.rules, o, "@keyframes"));
    }, this.toString = function() {
      return Hi(12, String(r.name));
    }, this.name = t, this.id = "sc-keyframes-" + t, this.rules = n;
  }
  return e.prototype.getName = function(t) {
    return t === void 0 && (t = Eu), this.name + t.hash;
  }, e;
}(), _y = /([A-Z])/, My = /([A-Z])/g, Vy = /^ms-/, Ly = function(e) {
  return "-" + e.toLowerCase();
};
function _d(e) {
  return _y.test(e) ? e.replace(My, Ly).replace(Vy, "-ms-") : e;
}
var Md = function(e) {
  return e == null || e === !1 || e === "";
};
function Vi(e, t, n, r) {
  if (Array.isArray(e)) {
    for (var i, a = [], o = 0, l = e.length; o < l; o += 1) (i = Vi(e[o], t, n, r)) !== "" && (Array.isArray(i) ? a.push.apply(a, i) : a.push(i));
    return a;
  }
  if (Md(e)) return "";
  if (wc(e)) return "." + e.styledComponentId;
  if (Po(e)) {
    if (typeof (s = e) != "function" || s.prototype && s.prototype.isReactComponent || !t) return e;
    var u = e(t);
    return Qt.NODE_ENV !== "production" && yc.isElement(u) && console.warn(Iu(e) + " is not a styled component and cannot be referred to via component selector. See https://www.styled-components.com/docs/advanced#referring-to-other-components for more details."), Vi(u, t, n, r);
  }
  var s;
  return e instanceof Gy ? n ? (e.inject(n, r), e.getName(r)) : e : Su(e) ? function d(c, m) {
    var h, x, v = [];
    for (var b in c) c.hasOwnProperty(b) && !Md(c[b]) && (Array.isArray(c[b]) && c[b].isCss || Po(c[b]) ? v.push(_d(b) + ":", c[b], ";") : Su(c[b]) ? v.push.apply(v, d(c[b], b)) : v.push(_d(b) + ": " + (h = b, (x = c[b]) == null || typeof x == "boolean" || x === "" ? "" : typeof x != "number" || x === 0 || h in ny || h.startsWith("--") ? String(x).trim() : x + "px") + ";"));
    return m ? [m + " {"].concat(v, ["}"]) : v;
  }(e) : e.toString();
}
var Vd = function(e) {
  return Array.isArray(e) && (e.isCss = !0), e;
};
function Dy(e) {
  for (var t = arguments.length, n = new Array(t > 1 ? t - 1 : 0), r = 1; r < t; r++) n[r - 1] = arguments[r];
  return Po(e) || Su(e) ? Vd(Vi(Bd(es, [e].concat(n)))) : n.length === 0 && e.length === 1 && typeof e[0] == "string" ? e : Vd(Vi(Bd(e, n)));
}
var Ld = /invalid hook call/i, Ra = /* @__PURE__ */ new Set(), jy = function(e, t) {
  if (Qt.NODE_ENV !== "production") {
    var n = "The component " + e + (t ? ' with the id of "' + t + '"' : "") + ` has been created dynamically.
You may see this warning because you've called styled inside another component.
To resolve this only create new StyledComponents outside of any render method and function component.`, r = console.error;
    try {
      var i = !0;
      console.error = function(a) {
        if (Ld.test(a)) i = !1, Ra.delete(n);
        else {
          for (var o = arguments.length, l = new Array(o > 1 ? o - 1 : 0), u = 1; u < o; u++) l[u - 1] = arguments[u];
          r.apply(void 0, [a].concat(l));
        }
      }, ir(), i && !Ra.has(n) && (console.warn(n), Ra.add(n));
    } catch (a) {
      Ld.test(a.message) && Ra.delete(n);
    } finally {
      console.error = r;
    }
  }
}, zy = function(e, t, n) {
  return n === void 0 && (n = Zr), e.theme !== n.theme && e.theme || t || n.theme;
}, Hy = /[!"#$%&'()*+,./:;<=>?@[\\\]^`{|}~-]+/g, Wy = /(^-|-$)/g;
function Pl(e) {
  return e.replace(Hy, "-").replace(Wy, "");
}
var $y = function(e) {
  return Ru(Bg(e) >>> 0);
};
function Ea(e) {
  return typeof e == "string" && (Qt.NODE_ENV === "production" || e.charAt(0) === e.charAt(0).toLowerCase());
}
var Au = function(e) {
  return typeof e == "function" || typeof e == "object" && e !== null && !Array.isArray(e);
}, Xy = function(e) {
  return e !== "__proto__" && e !== "constructor" && e !== "prototype";
};
function Yy(e, t, n) {
  var r = e[n];
  Au(t) && Au(r) ? _g(r, t) : e[n] = t;
}
function _g(e) {
  for (var t = arguments.length, n = new Array(t > 1 ? t - 1 : 0), r = 1; r < t; r++) n[r - 1] = arguments[r];
  for (var i = 0, a = n; i < a.length; i++) {
    var o = a[i];
    if (Au(o)) for (var l in o) Xy(l) && Yy(e, o[l], l);
  }
  return e;
}
var Mg = cn.createContext();
Mg.Consumer;
var Tl = {};
function Vg(e, t, n) {
  var r = wc(e), i = !Ea(e), a = t.attrs, o = a === void 0 ? es : a, l = t.componentId, u = l === void 0 ? function(O, T) {
    var D = typeof O != "string" ? "sc" : Pl(O);
    Tl[D] = (Tl[D] || 0) + 1;
    var E = D + "-" + $y("5.3.11" + D + Tl[D]);
    return T ? T + "-" + E : E;
  }(t.displayName, t.parentComponentId) : l, s = t.displayName, d = s === void 0 ? function(O) {
    return Ea(O) ? "styled." + O : "Styled(" + Iu(O) + ")";
  }(e) : s, c = t.displayName && t.componentId ? Pl(t.displayName) + "-" + t.componentId : t.componentId || u, m = r && e.attrs ? Array.prototype.concat(e.attrs, o).filter(Boolean) : o, h = t.shouldForwardProp;
  r && e.shouldForwardProp && (h = t.shouldForwardProp ? function(O, T, D) {
    return e.shouldForwardProp(O, T, D) && t.shouldForwardProp(O, T, D);
  } : e.shouldForwardProp);
  var x, v = new Py(n, c, r ? e.componentStyle : void 0), b = v.isStatic && o.length === 0, I = function(O, T) {
    return function(D, E, B, X) {
      var U = D.attrs, K = D.componentStyle, Fe = D.defaultProps, oe = D.foldedComponentIds, ce = D.shouldForwardProp, ye = D.styledComponentId, Q = D.target, ue = function($, _, re) {
        $ === void 0 && ($ = Zr);
        var Y = Tr({}, _, { theme: $ }), fe = {};
        return re.forEach(function(ge) {
          var ve, Te, J, ft = ge;
          for (ve in Po(ft) && (ft = ft(Y)), ft) Y[ve] = fe[ve] = ve === "className" ? (Te = fe[ve], J = ft[ve], Te && J ? Te + " " + J : Te || J) : ft[ve];
        }), [Y, fe];
      }(zy(E, Bn(Mg), Fe) || Zr, E, U), Ee = ue[0], We = ue[1], $e = function($, _, re, Y) {
        var fe = By(), ge = Ny(), ve = _ ? $.generateAndInjectStyles(Zr, fe, ge) : $.generateAndInjectStyles(re, fe, ge);
        return Qt.NODE_ENV !== "production" && !_ && Y && Y(ve), ve;
      }(K, X, Ee, Qt.NODE_ENV !== "production" ? D.warnTooManyClasses : void 0), ht = B, G = We.$as || E.$as || We.as || E.as || Q, Z = Ea(G), A = We !== E ? Tr({}, E, {}, We) : E, w = {};
      for (var H in A) H[0] !== "$" && H !== "as" && (H === "forwardedAs" ? w.as = A[H] : (ce ? ce(H, Pd, G) : !Z || Pd(H)) && (w[H] = A[H]));
      return E.style && We.style !== E.style && (w.style = Tr({}, E.style, {}, We.style)), w.className = Array.prototype.concat(oe, ye, $e !== ye ? $e : null, E.className, We.className).filter(Boolean).join(" "), w.ref = ht, Ao(G, w);
    }(x, O, T, b);
  };
  return I.displayName = d, (x = cn.forwardRef(I)).attrs = m, x.componentStyle = v, x.displayName = d, x.shouldForwardProp = h, x.foldedComponentIds = r ? Array.prototype.concat(e.foldedComponentIds, e.styledComponentId) : es, x.styledComponentId = c, x.target = r ? e.target : e, x.withComponent = function(O) {
    var T = t.componentId, D = function(B, X) {
      if (B == null) return {};
      var U, K, Fe = {}, oe = Object.keys(B);
      for (K = 0; K < oe.length; K++) U = oe[K], X.indexOf(U) >= 0 || (Fe[U] = B[U]);
      return Fe;
    }(t, ["componentId"]), E = T && T + "-" + (Ea(O) ? O : Pl(Iu(O)));
    return Vg(O, Tr({}, D, { attrs: m, componentId: E }), n);
  }, Object.defineProperty(x, "defaultProps", { get: function() {
    return this._foldedDefaultProps;
  }, set: function(O) {
    this._foldedDefaultProps = r ? _g({}, e.defaultProps, O) : O;
  } }), Qt.NODE_ENV !== "production" && (jy(d, c), x.warnTooManyClasses = /* @__PURE__ */ function(O, T) {
    var D = {}, E = !1;
    return function(B) {
      if (!E && (D[B] = !0, Object.keys(D).length >= 200)) {
        var X = T ? ' with the id of "' + T + '"' : "";
        console.warn("Over 200 classes were generated for component " + O + X + `.
Consider using the attrs method, together with a style object for frequently changed styles.
Example:
  const Component = styled.div.attrs(props => ({
    style: {
      background: props.background,
    },
  }))\`width: 100%;\`

  <Component />`), E = !0, D = {};
      }
    };
  }(d, c)), Object.defineProperty(x, "toString", { value: function() {
    return "." + x.styledComponentId;
  } }), i && uy(x, e, { attrs: !0, componentStyle: !0, displayName: !0, foldedComponentIds: !0, shouldForwardProp: !0, styledComponentId: !0, target: !0, withComponent: !0 }), x;
}
var dt = function(e) {
  return function t(n, r, i) {
    if (i === void 0 && (i = Zr), !yc.isValidElementType(r)) return Hi(1, String(r));
    var a = function() {
      return n(r, i, Dy.apply(void 0, arguments));
    };
    return a.withConfig = function(o) {
      return t(n, r, Tr({}, i, {}, o));
    }, a.attrs = function(o) {
      return t(n, r, Tr({}, i, { attrs: Array.prototype.concat(i.attrs, o).filter(Boolean) }));
    }, a;
  }(Vg, e);
};
["a", "abbr", "address", "area", "article", "aside", "audio", "b", "base", "bdi", "bdo", "big", "blockquote", "body", "br", "button", "canvas", "caption", "cite", "code", "col", "colgroup", "data", "datalist", "dd", "del", "details", "dfn", "dialog", "div", "dl", "dt", "em", "embed", "fieldset", "figcaption", "figure", "footer", "form", "h1", "h2", "h3", "h4", "h5", "h6", "head", "header", "hgroup", "hr", "html", "i", "iframe", "img", "input", "ins", "kbd", "keygen", "label", "legend", "li", "link", "main", "map", "mark", "marquee", "menu", "menuitem", "meta", "meter", "nav", "noscript", "object", "ol", "optgroup", "option", "output", "p", "param", "picture", "pre", "progress", "q", "rp", "rt", "ruby", "s", "samp", "script", "section", "select", "small", "source", "span", "strong", "style", "sub", "summary", "sup", "table", "tbody", "td", "textarea", "tfoot", "th", "thead", "time", "title", "tr", "track", "u", "ul", "var", "video", "wbr", "circle", "clipPath", "defs", "ellipse", "foreignObject", "g", "image", "line", "linearGradient", "marker", "mask", "path", "pattern", "polygon", "polyline", "radialGradient", "rect", "stop", "svg", "text", "textPath", "tspan"].forEach(function(e) {
  dt[e] = dt(e);
});
Qt.NODE_ENV !== "production" && typeof navigator < "u" && navigator.product === "ReactNative" && console.warn(`It looks like you've imported 'styled-components' on React Native.
Perhaps you're looking to import 'styled-components/native'?
Read more about this at https://www.styled-components.com/docs/basics#react-native`), Qt.NODE_ENV !== "production" && Qt.NODE_ENV !== "test" && typeof window < "u" && (window["__styled-components-init__"] = window["__styled-components-init__"] || 0, window["__styled-components-init__"] === 1 && console.warn(`It looks like there are several instances of 'styled-components' initialized in this application. This may cause dynamic styles to not render properly, errors during the rehydration process, a missing theme prop, and makes your application bigger without good reason.

See https://s-c.sh/2BAXzed for more info.`), window["__styled-components-init__"] += 1);
var kl, Dd;
function Zy() {
  if (Dd) return kl;
  Dd = 1;
  function e(n, r, i) {
    var a = r.theme && r.theme[n], o;
    return typeof a == "function" ? o = a(i) : o = i[a], typeof o == "function" ? o(r) : o;
  }
  function t(n, r) {
    return function(i) {
      return e(n, i, r);
    };
  }
  return t.variants = function(n, r, i) {
    return function(a) {
      var o = a[r] && i[a[r]];
      return o && e(n, a, o);
    };
  }, kl = t, kl;
}
var Jy = Zy();
const Nt = /* @__PURE__ */ Hn(Jy);
function Lg(e) {
  if (e === void 0) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  return e;
}
function To(e) {
  return To = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(t) {
    return t.__proto__ || Object.getPrototypeOf(t);
  }, To(e);
}
function Uy(e) {
  try {
    return Function.toString.call(e).indexOf("[native code]") !== -1;
  } catch {
    return typeof e == "function";
  }
}
function Cc() {
  try {
    var e = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
    }));
  } catch {
  }
  return (Cc = function() {
    return !!e;
  })();
}
function qy(e, t, n) {
  if (Cc()) return Reflect.construct.apply(null, arguments);
  var r = [null];
  r.push.apply(r, t);
  var i = new (e.bind.apply(e, r))();
  return n && _i(i, n.prototype), i;
}
function Pu(e) {
  var t = typeof Map == "function" ? /* @__PURE__ */ new Map() : void 0;
  return Pu = function(r) {
    if (r === null || !Uy(r)) return r;
    if (typeof r != "function") throw new TypeError("Super expression must either be null or a function");
    if (t !== void 0) {
      if (t.has(r)) return t.get(r);
      t.set(r, i);
    }
    function i() {
      return qy(r, arguments, To(this).constructor);
    }
    return i.prototype = Object.create(r.prototype, {
      constructor: {
        value: i,
        enumerable: !1,
        writable: !0,
        configurable: !0
      }
    }), _i(i, r);
  }, Pu(e);
}
var Qy = {}, Ky = {
  1: `Passed invalid arguments to hsl, please pass multiple numbers e.g. hsl(360, 0.75, 0.4) or an object e.g. rgb({ hue: 255, saturation: 0.4, lightness: 0.75 }).

`,
  2: `Passed invalid arguments to hsla, please pass multiple numbers e.g. hsla(360, 0.75, 0.4, 0.7) or an object e.g. rgb({ hue: 255, saturation: 0.4, lightness: 0.75, alpha: 0.7 }).

`,
  3: `Passed an incorrect argument to a color function, please pass a string representation of a color.

`,
  4: `Couldn't generate valid rgb string from %s, it returned %s.

`,
  5: `Couldn't parse the color string. Please provide the color as a string in hex, rgb, rgba, hsl or hsla notation.

`,
  6: `Passed invalid arguments to rgb, please pass multiple numbers e.g. rgb(255, 205, 100) or an object e.g. rgb({ red: 255, green: 205, blue: 100 }).

`,
  7: `Passed invalid arguments to rgba, please pass multiple numbers e.g. rgb(255, 205, 100, 0.75) or an object e.g. rgb({ red: 255, green: 205, blue: 100, alpha: 0.75 }).

`,
  8: `Passed invalid argument to toColorString, please pass a RgbColor, RgbaColor, HslColor or HslaColor object.

`,
  9: `Please provide a number of steps to the modularScale helper.

`,
  10: `Please pass a number or one of the predefined scales to the modularScale helper as the ratio.

`,
  11: `Invalid value passed as base to modularScale, expected number or em string but got "%s"

`,
  12: `Expected a string ending in "px" or a number passed as the first argument to %s(), got "%s" instead.

`,
  13: `Expected a string ending in "px" or a number passed as the second argument to %s(), got "%s" instead.

`,
  14: `Passed invalid pixel value ("%s") to %s(), please pass a value like "12px" or 12.

`,
  15: `Passed invalid base value ("%s") to %s(), please pass a value like "12px" or 12.

`,
  16: `You must provide a template to this method.

`,
  17: `You passed an unsupported selector state to this method.

`,
  18: `minScreen and maxScreen must be provided as stringified numbers with the same units.

`,
  19: `fromSize and toSize must be provided as stringified numbers with the same units.

`,
  20: `expects either an array of objects or a single object with the properties prop, fromSize, and toSize.

`,
  21: "expects the objects in the first argument array to have the properties `prop`, `fromSize`, and `toSize`.\n\n",
  22: "expects the first argument object to have the properties `prop`, `fromSize`, and `toSize`.\n\n",
  23: `fontFace expects a name of a font-family.

`,
  24: `fontFace expects either the path to the font file(s) or a name of a local copy.

`,
  25: `fontFace expects localFonts to be an array.

`,
  26: `fontFace expects fileFormats to be an array.

`,
  27: `radialGradient requries at least 2 color-stops to properly render.

`,
  28: `Please supply a filename to retinaImage() as the first argument.

`,
  29: `Passed invalid argument to triangle, please pass correct pointingDirection e.g. 'right'.

`,
  30: "Passed an invalid value to `height` or `width`. Please provide a pixel based unit.\n\n",
  31: `The animation shorthand only takes 8 arguments. See the specification for more information: http://mdn.io/animation

`,
  32: `To pass multiple animations please supply them in arrays, e.g. animation(['rotate', '2s'], ['move', '1s'])
To pass a single animation please supply them in simple values, e.g. animation('rotate', '2s')

`,
  33: `The animation shorthand arrays can only have 8 elements. See the specification for more information: http://mdn.io/animation

`,
  34: `borderRadius expects a radius value as a string or number as the second argument.

`,
  35: `borderRadius expects one of "top", "bottom", "left" or "right" as the first argument.

`,
  36: `Property must be a string value.

`,
  37: `Syntax Error at %s.

`,
  38: `Formula contains a function that needs parentheses at %s.

`,
  39: `Formula is missing closing parenthesis at %s.

`,
  40: `Formula has too many closing parentheses at %s.

`,
  41: `All values in a formula must have the same unit or be unitless.

`,
  42: `Please provide a number of steps to the modularScale helper.

`,
  43: `Please pass a number or one of the predefined scales to the modularScale helper as the ratio.

`,
  44: `Invalid value passed as base to modularScale, expected number or em/rem string but got %s.

`,
  45: `Passed invalid argument to hslToColorString, please pass a HslColor or HslaColor object.

`,
  46: `Passed invalid argument to rgbToColorString, please pass a RgbColor or RgbaColor object.

`,
  47: `minScreen and maxScreen must be provided as stringified numbers with the same units.

`,
  48: `fromSize and toSize must be provided as stringified numbers with the same units.

`,
  49: `Expects either an array of objects or a single object with the properties prop, fromSize, and toSize.

`,
  50: `Expects the objects in the first argument array to have the properties prop, fromSize, and toSize.

`,
  51: `Expects the first argument object to have the properties prop, fromSize, and toSize.

`,
  52: `fontFace expects either the path to the font file(s) or a name of a local copy.

`,
  53: `fontFace expects localFonts to be an array.

`,
  54: `fontFace expects fileFormats to be an array.

`,
  55: `fontFace expects a name of a font-family.

`,
  56: `linearGradient requries at least 2 color-stops to properly render.

`,
  57: `radialGradient requries at least 2 color-stops to properly render.

`,
  58: `Please supply a filename to retinaImage() as the first argument.

`,
  59: `Passed invalid argument to triangle, please pass correct pointingDirection e.g. 'right'.

`,
  60: "Passed an invalid value to `height` or `width`. Please provide a pixel based unit.\n\n",
  61: `Property must be a string value.

`,
  62: `borderRadius expects a radius value as a string or number as the second argument.

`,
  63: `borderRadius expects one of "top", "bottom", "left" or "right" as the first argument.

`,
  64: `The animation shorthand only takes 8 arguments. See the specification for more information: http://mdn.io/animation.

`,
  65: `To pass multiple animations please supply them in arrays, e.g. animation(['rotate', '2s'], ['move', '1s'])\\nTo pass a single animation please supply them in simple values, e.g. animation('rotate', '2s').

`,
  66: `The animation shorthand arrays can only have 8 elements. See the specification for more information: http://mdn.io/animation.

`,
  67: `You must provide a template to this method.

`,
  68: `You passed an unsupported selector state to this method.

`,
  69: `Expected a string ending in "px" or a number passed as the first argument to %s(), got %s instead.

`,
  70: `Expected a string ending in "px" or a number passed as the second argument to %s(), got %s instead.

`,
  71: `Passed invalid pixel value %s to %s(), please pass a value like "12px" or 12.

`,
  72: `Passed invalid base value %s to %s(), please pass a value like "12px" or 12.

`,
  73: `Please provide a valid CSS variable.

`,
  74: `CSS variable not found and no default was provided.

`,
  75: `important requires a valid style object, got a %s instead.

`,
  76: `fromSize and toSize must be provided as stringified numbers with the same units as minScreen and maxScreen.

`,
  77: `remToPx expects a value in "rem" but you provided it in "%s".

`,
  78: `base must be set in "px" or "%" but you set it in "%s".
`
};
function e0() {
  for (var e = arguments.length, t = new Array(e), n = 0; n < e; n++)
    t[n] = arguments[n];
  var r = t[0], i = [], a;
  for (a = 1; a < t.length; a += 1)
    i.push(t[a]);
  return i.forEach(function(o) {
    r = r.replace(/%[a-z]/, o);
  }), r;
}
var yr = /* @__PURE__ */ function(e) {
  fb(t, e);
  function t(n) {
    var r;
    if (Qy.NODE_ENV === "production")
      r = e.call(this, "An error occurred. See https://github.com/styled-components/polished/blob/main/src/internalHelpers/errors.md#" + n + " for more information.") || this;
    else {
      for (var i = arguments.length, a = new Array(i > 1 ? i - 1 : 0), o = 1; o < i; o++)
        a[o - 1] = arguments[o];
      r = e.call(this, e0.apply(void 0, [Ky[n]].concat(a))) || this;
    }
    return Lg(r);
  }
  return t;
}(/* @__PURE__ */ Pu(Error));
function Ol(e) {
  return Math.round(e * 255);
}
function t0(e, t, n) {
  return Ol(e) + "," + Ol(t) + "," + Ol(n);
}
function ns(e, t, n, r) {
  if (r === void 0 && (r = t0), t === 0)
    return r(n, n, n);
  var i = (e % 360 + 360) % 360 / 60, a = (1 - Math.abs(2 * n - 1)) * t, o = a * (1 - Math.abs(i % 2 - 1)), l = 0, u = 0, s = 0;
  i >= 0 && i < 1 ? (l = a, u = o) : i >= 1 && i < 2 ? (l = o, u = a) : i >= 2 && i < 3 ? (u = a, s = o) : i >= 3 && i < 4 ? (u = o, s = a) : i >= 4 && i < 5 ? (l = o, s = a) : i >= 5 && i < 6 && (l = a, s = o);
  var d = n - a / 2, c = l + d, m = u + d, h = s + d;
  return r(c, m, h);
}
var jd = {
  aliceblue: "f0f8ff",
  antiquewhite: "faebd7",
  aqua: "00ffff",
  aquamarine: "7fffd4",
  azure: "f0ffff",
  beige: "f5f5dc",
  bisque: "ffe4c4",
  black: "000",
  blanchedalmond: "ffebcd",
  blue: "0000ff",
  blueviolet: "8a2be2",
  brown: "a52a2a",
  burlywood: "deb887",
  cadetblue: "5f9ea0",
  chartreuse: "7fff00",
  chocolate: "d2691e",
  coral: "ff7f50",
  cornflowerblue: "6495ed",
  cornsilk: "fff8dc",
  crimson: "dc143c",
  cyan: "00ffff",
  darkblue: "00008b",
  darkcyan: "008b8b",
  darkgoldenrod: "b8860b",
  darkgray: "a9a9a9",
  darkgreen: "006400",
  darkgrey: "a9a9a9",
  darkkhaki: "bdb76b",
  darkmagenta: "8b008b",
  darkolivegreen: "556b2f",
  darkorange: "ff8c00",
  darkorchid: "9932cc",
  darkred: "8b0000",
  darksalmon: "e9967a",
  darkseagreen: "8fbc8f",
  darkslateblue: "483d8b",
  darkslategray: "2f4f4f",
  darkslategrey: "2f4f4f",
  darkturquoise: "00ced1",
  darkviolet: "9400d3",
  deeppink: "ff1493",
  deepskyblue: "00bfff",
  dimgray: "696969",
  dimgrey: "696969",
  dodgerblue: "1e90ff",
  firebrick: "b22222",
  floralwhite: "fffaf0",
  forestgreen: "228b22",
  fuchsia: "ff00ff",
  gainsboro: "dcdcdc",
  ghostwhite: "f8f8ff",
  gold: "ffd700",
  goldenrod: "daa520",
  gray: "808080",
  green: "008000",
  greenyellow: "adff2f",
  grey: "808080",
  honeydew: "f0fff0",
  hotpink: "ff69b4",
  indianred: "cd5c5c",
  indigo: "4b0082",
  ivory: "fffff0",
  khaki: "f0e68c",
  lavender: "e6e6fa",
  lavenderblush: "fff0f5",
  lawngreen: "7cfc00",
  lemonchiffon: "fffacd",
  lightblue: "add8e6",
  lightcoral: "f08080",
  lightcyan: "e0ffff",
  lightgoldenrodyellow: "fafad2",
  lightgray: "d3d3d3",
  lightgreen: "90ee90",
  lightgrey: "d3d3d3",
  lightpink: "ffb6c1",
  lightsalmon: "ffa07a",
  lightseagreen: "20b2aa",
  lightskyblue: "87cefa",
  lightslategray: "789",
  lightslategrey: "789",
  lightsteelblue: "b0c4de",
  lightyellow: "ffffe0",
  lime: "0f0",
  limegreen: "32cd32",
  linen: "faf0e6",
  magenta: "f0f",
  maroon: "800000",
  mediumaquamarine: "66cdaa",
  mediumblue: "0000cd",
  mediumorchid: "ba55d3",
  mediumpurple: "9370db",
  mediumseagreen: "3cb371",
  mediumslateblue: "7b68ee",
  mediumspringgreen: "00fa9a",
  mediumturquoise: "48d1cc",
  mediumvioletred: "c71585",
  midnightblue: "191970",
  mintcream: "f5fffa",
  mistyrose: "ffe4e1",
  moccasin: "ffe4b5",
  navajowhite: "ffdead",
  navy: "000080",
  oldlace: "fdf5e6",
  olive: "808000",
  olivedrab: "6b8e23",
  orange: "ffa500",
  orangered: "ff4500",
  orchid: "da70d6",
  palegoldenrod: "eee8aa",
  palegreen: "98fb98",
  paleturquoise: "afeeee",
  palevioletred: "db7093",
  papayawhip: "ffefd5",
  peachpuff: "ffdab9",
  peru: "cd853f",
  pink: "ffc0cb",
  plum: "dda0dd",
  powderblue: "b0e0e6",
  purple: "800080",
  rebeccapurple: "639",
  red: "f00",
  rosybrown: "bc8f8f",
  royalblue: "4169e1",
  saddlebrown: "8b4513",
  salmon: "fa8072",
  sandybrown: "f4a460",
  seagreen: "2e8b57",
  seashell: "fff5ee",
  sienna: "a0522d",
  silver: "c0c0c0",
  skyblue: "87ceeb",
  slateblue: "6a5acd",
  slategray: "708090",
  slategrey: "708090",
  snow: "fffafa",
  springgreen: "00ff7f",
  steelblue: "4682b4",
  tan: "d2b48c",
  teal: "008080",
  thistle: "d8bfd8",
  tomato: "ff6347",
  turquoise: "40e0d0",
  violet: "ee82ee",
  wheat: "f5deb3",
  white: "fff",
  whitesmoke: "f5f5f5",
  yellow: "ff0",
  yellowgreen: "9acd32"
};
function n0(e) {
  if (typeof e != "string") return e;
  var t = e.toLowerCase();
  return jd[t] ? "#" + jd[t] : e;
}
var r0 = /^#[a-fA-F0-9]{6}$/, i0 = /^#[a-fA-F0-9]{8}$/, o0 = /^#[a-fA-F0-9]{3}$/, a0 = /^#[a-fA-F0-9]{4}$/, Fl = /^rgb\(\s*(\d{1,3})\s*(?:,)?\s*(\d{1,3})\s*(?:,)?\s*(\d{1,3})\s*\)$/i, s0 = /^rgb(?:a)?\(\s*(\d{1,3})\s*(?:,)?\s*(\d{1,3})\s*(?:,)?\s*(\d{1,3})\s*(?:,|\/)\s*([-+]?\d*[.]?\d+[%]?)\s*\)$/i, l0 = /^hsl\(\s*(\d{0,3}[.]?[0-9]+(?:deg)?)\s*(?:,)?\s*(\d{1,3}[.]?[0-9]?)%\s*(?:,)?\s*(\d{1,3}[.]?[0-9]?)%\s*\)$/i, u0 = /^hsl(?:a)?\(\s*(\d{0,3}[.]?[0-9]+(?:deg)?)\s*(?:,)?\s*(\d{1,3}[.]?[0-9]?)%\s*(?:,)?\s*(\d{1,3}[.]?[0-9]?)%\s*(?:,|\/)\s*([-+]?\d*[.]?\d+[%]?)\s*\)$/i;
function ko(e) {
  if (typeof e != "string")
    throw new yr(3);
  var t = n0(e);
  if (t.match(r0))
    return {
      red: parseInt("" + t[1] + t[2], 16),
      green: parseInt("" + t[3] + t[4], 16),
      blue: parseInt("" + t[5] + t[6], 16)
    };
  if (t.match(i0)) {
    var n = parseFloat((parseInt("" + t[7] + t[8], 16) / 255).toFixed(2));
    return {
      red: parseInt("" + t[1] + t[2], 16),
      green: parseInt("" + t[3] + t[4], 16),
      blue: parseInt("" + t[5] + t[6], 16),
      alpha: n
    };
  }
  if (t.match(o0))
    return {
      red: parseInt("" + t[1] + t[1], 16),
      green: parseInt("" + t[2] + t[2], 16),
      blue: parseInt("" + t[3] + t[3], 16)
    };
  if (t.match(a0)) {
    var r = parseFloat((parseInt("" + t[4] + t[4], 16) / 255).toFixed(2));
    return {
      red: parseInt("" + t[1] + t[1], 16),
      green: parseInt("" + t[2] + t[2], 16),
      blue: parseInt("" + t[3] + t[3], 16),
      alpha: r
    };
  }
  var i = Fl.exec(t);
  if (i)
    return {
      red: parseInt("" + i[1], 10),
      green: parseInt("" + i[2], 10),
      blue: parseInt("" + i[3], 10)
    };
  var a = s0.exec(t.substring(0, 50));
  if (a)
    return {
      red: parseInt("" + a[1], 10),
      green: parseInt("" + a[2], 10),
      blue: parseInt("" + a[3], 10),
      alpha: parseFloat("" + a[4]) > 1 ? parseFloat("" + a[4]) / 100 : parseFloat("" + a[4])
    };
  var o = l0.exec(t);
  if (o) {
    var l = parseInt("" + o[1], 10), u = parseInt("" + o[2], 10) / 100, s = parseInt("" + o[3], 10) / 100, d = "rgb(" + ns(l, u, s) + ")", c = Fl.exec(d);
    if (!c)
      throw new yr(4, t, d);
    return {
      red: parseInt("" + c[1], 10),
      green: parseInt("" + c[2], 10),
      blue: parseInt("" + c[3], 10)
    };
  }
  var m = u0.exec(t.substring(0, 50));
  if (m) {
    var h = parseInt("" + m[1], 10), x = parseInt("" + m[2], 10) / 100, v = parseInt("" + m[3], 10) / 100, b = "rgb(" + ns(h, x, v) + ")", I = Fl.exec(b);
    if (!I)
      throw new yr(4, t, b);
    return {
      red: parseInt("" + I[1], 10),
      green: parseInt("" + I[2], 10),
      blue: parseInt("" + I[3], 10),
      alpha: parseFloat("" + m[4]) > 1 ? parseFloat("" + m[4]) / 100 : parseFloat("" + m[4])
    };
  }
  throw new yr(5);
}
function c0(e) {
  var t = e.red / 255, n = e.green / 255, r = e.blue / 255, i = Math.max(t, n, r), a = Math.min(t, n, r), o = (i + a) / 2;
  if (i === a)
    return e.alpha !== void 0 ? {
      hue: 0,
      saturation: 0,
      lightness: o,
      alpha: e.alpha
    } : {
      hue: 0,
      saturation: 0,
      lightness: o
    };
  var l, u = i - a, s = o > 0.5 ? u / (2 - i - a) : u / (i + a);
  switch (i) {
    case t:
      l = (n - r) / u + (n < r ? 6 : 0);
      break;
    case n:
      l = (r - t) / u + 2;
      break;
    default:
      l = (t - n) / u + 4;
      break;
  }
  return l *= 60, e.alpha !== void 0 ? {
    hue: l,
    saturation: s,
    lightness: o,
    alpha: e.alpha
  } : {
    hue: l,
    saturation: s,
    lightness: o
  };
}
function Ur(e) {
  return c0(ko(e));
}
var d0 = function(t) {
  return t.length === 7 && t[1] === t[2] && t[3] === t[4] && t[5] === t[6] ? "#" + t[1] + t[3] + t[5] : t;
}, Tu = d0;
function si(e) {
  var t = e.toString(16);
  return t.length === 1 ? "0" + t : t;
}
function Bl(e) {
  return si(Math.round(e * 255));
}
function f0(e, t, n) {
  return Tu("#" + Bl(e) + Bl(t) + Bl(n));
}
function Dg(e, t, n) {
  return ns(e, t, n, f0);
}
function p0(e, t, n) {
  if (typeof e == "object" && t === void 0 && n === void 0)
    return Dg(e.hue, e.saturation, e.lightness);
  throw new yr(1);
}
function g0(e, t, n, r) {
  if (typeof e == "object" && t === void 0 && n === void 0 && r === void 0)
    return e.alpha >= 1 ? Dg(e.hue, e.saturation, e.lightness) : "rgba(" + ns(e.hue, e.saturation, e.lightness) + "," + e.alpha + ")";
  throw new yr(2);
}
function jg(e, t, n) {
  if (typeof e == "number" && typeof t == "number" && typeof n == "number")
    return Tu("#" + si(e) + si(t) + si(n));
  if (typeof e == "object" && t === void 0 && n === void 0)
    return Tu("#" + si(e.red) + si(e.green) + si(e.blue));
  throw new yr(6);
}
function Cs(e, t, n, r) {
  if (typeof e == "object" && t === void 0 && n === void 0 && r === void 0)
    return e.alpha >= 1 ? jg(e.red, e.green, e.blue) : "rgba(" + e.red + "," + e.green + "," + e.blue + "," + e.alpha + ")";
  throw new yr(7);
}
var h0 = function(t) {
  return typeof t.red == "number" && typeof t.green == "number" && typeof t.blue == "number" && (typeof t.alpha != "number" || typeof t.alpha > "u");
}, m0 = function(t) {
  return typeof t.red == "number" && typeof t.green == "number" && typeof t.blue == "number" && typeof t.alpha == "number";
}, v0 = function(t) {
  return typeof t.hue == "number" && typeof t.saturation == "number" && typeof t.lightness == "number" && (typeof t.alpha != "number" || typeof t.alpha > "u");
}, b0 = function(t) {
  return typeof t.hue == "number" && typeof t.saturation == "number" && typeof t.lightness == "number" && typeof t.alpha == "number";
};
function qr(e) {
  if (typeof e != "object") throw new yr(8);
  if (m0(e)) return Cs(e);
  if (h0(e)) return jg(e);
  if (b0(e)) return g0(e);
  if (v0(e)) return p0(e);
  throw new yr(8);
}
function zg(e, t, n) {
  return function() {
    var i = n.concat(Array.prototype.slice.call(arguments));
    return i.length >= t ? e.apply(this, i) : zg(e, t, i);
  };
}
function Kn(e) {
  return zg(e, e.length, []);
}
function y0(e, t) {
  if (t === "transparent") return t;
  var n = Ur(t);
  return qr(ke({}, n, {
    hue: n.hue + parseFloat(e)
  }));
}
Kn(y0);
function Wi(e, t, n) {
  return Math.max(e, Math.min(t, n));
}
function w0(e, t) {
  if (t === "transparent") return t;
  var n = Ur(t);
  return qr(ke({}, n, {
    lightness: Wi(0, 1, n.lightness - parseFloat(e))
  }));
}
var x0 = Kn(w0), Fr = x0;
function C0(e, t) {
  if (t === "transparent") return t;
  var n = Ur(t);
  return qr(ke({}, n, {
    saturation: Wi(0, 1, n.saturation - parseFloat(e))
  }));
}
Kn(C0);
function S0(e, t) {
  if (t === "transparent") return t;
  var n = Ur(t);
  return qr(ke({}, n, {
    lightness: Wi(0, 1, n.lightness + parseFloat(e))
  }));
}
Kn(S0);
function I0(e, t, n) {
  if (t === "transparent") return n;
  if (n === "transparent") return t;
  if (e === 0) return n;
  var r = ko(t), i = ke({}, r, {
    alpha: typeof r.alpha == "number" ? r.alpha : 1
  }), a = ko(n), o = ke({}, a, {
    alpha: typeof a.alpha == "number" ? a.alpha : 1
  }), l = i.alpha - o.alpha, u = parseFloat(e) * 2 - 1, s = u * l === -1 ? u : u + l, d = 1 + u * l, c = (s / d + 1) / 2, m = 1 - c, h = {
    red: Math.floor(i.red * c + o.red * m),
    green: Math.floor(i.green * c + o.green * m),
    blue: Math.floor(i.blue * c + o.blue * m),
    alpha: i.alpha * parseFloat(e) + o.alpha * (1 - parseFloat(e))
  };
  return Cs(h);
}
var R0 = Kn(I0), Hg = R0;
function E0(e, t) {
  if (t === "transparent") return t;
  var n = ko(t), r = typeof n.alpha == "number" ? n.alpha : 1, i = ke({}, n, {
    alpha: Wi(0, 1, (r * 100 + parseFloat(e) * 100) / 100)
  });
  return Cs(i);
}
Kn(E0);
function A0(e, t) {
  if (t === "transparent") return t;
  var n = Ur(t);
  return qr(ke({}, n, {
    saturation: Wi(0, 1, n.saturation + parseFloat(e))
  }));
}
Kn(A0);
function P0(e, t) {
  return t === "transparent" ? t : qr(ke({}, Ur(t), {
    hue: parseFloat(e)
  }));
}
Kn(P0);
function T0(e, t) {
  return t === "transparent" ? t : qr(ke({}, Ur(t), {
    lightness: parseFloat(e)
  }));
}
Kn(T0);
function k0(e, t) {
  return t === "transparent" ? t : qr(ke({}, Ur(t), {
    saturation: parseFloat(e)
  }));
}
Kn(k0);
function O0(e, t) {
  return t === "transparent" ? t : Hg(parseFloat(e), "rgb(0, 0, 0)", t);
}
Kn(O0);
function F0(e, t) {
  return t === "transparent" ? t : Hg(parseFloat(e), "rgb(255, 255, 255)", t);
}
Kn(F0);
function B0(e, t) {
  if (t === "transparent") return t;
  var n = ko(t), r = typeof n.alpha == "number" ? n.alpha : 1, i = ke({}, n, {
    alpha: Wi(0, 1, +(r * 100 - parseFloat(e) * 100).toFixed(2) / 100)
  });
  return Cs(i);
}
Kn(B0);
const Fi = "#509EE3", Ss = "#DCECF9", N0 = "#C0DCF4", Wg = "#18181B", xr = "#509EE3", G0 = "rgba(76, 169, 166, 0.2)";
Nt("mode", {
  light: "url(/img/logo.svg)",
  dark: "url(/img/logo.svg)"
});
const Li = Nt("mode", {
  light: "#2F2F2F",
  dark: "#FFFFFF"
}), Mn = "#545454";
Fr(0.1, Mn);
Fr(0.1, xr);
const Aa = Nt("mode", {
  light: "rgba(76, 169, 166, 0.2)",
  dark: "rgba(76, 169, 166, 0.2)"
});
Nt("mode", {
  light: "#4CA9A6",
  dark: "#232329"
});
const zd = Nt("mode", { light: "#323238", dark: "#FFFFFF" }), _0 = Nt("mode", { light: "#E1E1E6", dark: "#E1E1E6" }), Is = Nt("mode", {
  light: "#FFFFFF",
  dark: "#232329"
}), rs = Nt("mode", {
  light: "#f2f4f7",
  dark: "#2a2a31"
}), Nl = Nt("mode", {
  light: "#646777",
  dark: "#eaeaea"
}), ja = Nt("mode", {
  light: "#eff1f5",
  dark: "#333246"
}), M0 = Nt("mode", {
  light: "#dddddd",
  dark: "#ffffff"
}), Di = Nt("mode", {
  light: "#f2f4f7",
  dark: "#33333a"
}), V0 = Nt("mode", {
  light: "#B4BFD0",
  dark: "#606071"
});
Nt("mode", {
  light: "#646777",
  dark: "#FFFFFF"
});
const L0 = "#e9f1f6";
Fr(0.1, L0);
const Hd = Fr(0.1, xr), $g = "#f6da6e", D0 = Fr(0.1, $g), Sc = "#ff4861", Wd = "#f8d7da", j0 = Fr(0.1, Sc), z0 = "#1368B1";
Fr(0.1, z0);
const Xg = "#787985", is = "#d8dfe9", Gl = "#dddddd", Ic = "#ffffff", H0 = (e) => `
  &::-webkit-scrollbar {
    height: 5px;
    width: 5px;
    opacity: 0.3;
  }
  
  &::-webkit-scrollbar-thumb {
    border-radius: 10px;
    border: 1px solid transparent;
  }
  
  &::-webkit-scrollbar-thumb {
    background-color: ${V0(e)};
  }   
`, Yg = dt(Nb)`
  width: 100%;
  padding-bottom: 12px;
  height: ${(e) => e.height || "100%"};
  border: none;
  background-color: transparent;
`, W0 = dt(Yg.Body)`
  background-color: ${Is};
  border-radius: 2px;
  border: 1px solid #e4e4e7;
  padding: 20px;
  min-height: ${(e) => e.height || "100%"};
  border-radius: 10px;
`;
dt.div`
  margin-bottom: 20px;
  text-transform: capitalize; //TODO: Change to Capitalize
  text-align: left;

  &:not(:first-child) {
    margin-top: 40px;
  }

  * {
    margin-bottom: 0;
  }
`;
dt.h5`
  // font-size: 12px;
  // text-align: left;
  // font-weight: 500;
  // line-height: 14.4px;
  // border-radius: 8px;
  // padding: 6px 8px;
  // color: ${Fi};
  font-style: normal;
  font-weight: 600;
  font-size: 15px;
  line-height: 20px;
  color: #646970;
`;
dt.p`
  text-transform: none;
  font-size: 10px;
  line-height: 18px;
  color: ${Wg};

  // max-width: 50%; //TODO:
`;
dt.div`
  display: flex;
  justify-content: space-between;

  & > div:first-child {
    margin-right: auto;
  }
`;
var _l, $d;
function $0() {
  if ($d) return _l;
  $d = 1;
  function e(o) {
    return o && typeof o == "object" && "default" in o ? o.default : o;
  }
  var t = e(cn), n = Object.assign || function(o) {
    for (var l = 1; l < arguments.length; l++) {
      var u = arguments[l];
      for (var s in u)
        Object.prototype.hasOwnProperty.call(u, s) && (o[s] = u[s]);
    }
    return o;
  }, r = function(o, l) {
    var u = {};
    for (var s in o)
      l.indexOf(s) >= 0 || Object.prototype.hasOwnProperty.call(o, s) && (u[s] = o[s]);
    return u;
  }, i = function(l) {
    var u = l.color, s = u === void 0 ? "currentColor" : u, d = l.size, c = d === void 0 ? 24 : d;
    l.children;
    var m = r(l, ["color", "size", "children"]), h = "mdi-icon " + (m.className || "");
    return t.createElement(
      "svg",
      n({}, m, { className: h, width: c, height: c, fill: s, viewBox: "0 0 24 24" }),
      t.createElement("path", { d: "M5,20H19V18H5M19,9H15V3H9V9H5L12,16L19,9Z" })
    );
  }, a = t.memo ? t.memo(i) : i;
  return _l = a, _l;
}
var X0 = $0();
const Y0 = /* @__PURE__ */ Hn(X0), Z0 = dt.div`
  height: calc(100vh - 200px);
  width: 100%;
  margin-top: 20px;
  min-height: 300px;
  overflow: auto;
  position: relative;
  padding: 0 10px 20px 10px;
  background-color: ${Is};
`, J0 = dt.div`
  padding: 0 8px;
  text-align: left;
  display: flex;
  justify-content: space-between;
  align-items: center;

  & > p {
    font-style: normal;
    font-weight: 700;
    font-size: 20px;
    color: ${Li};
  }
`, U0 = dt.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
`, q0 = dt.div`
  margin: 5px 5px;
  right: 0;
  padding: 7px 12px;
  display: inline-block;
  // background: rgba(76, 169, 166, 0.2);
  background: ${Ss};
  border-radius: 8px 2px 8px 8px;
`, Q0 = dt.p`
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 18px;
  color: #595959;
  padding: 0;
  margin: 0;
`, Zg = dt.div`
  display: flex;
`, Jg = dt.div`
  margin: 5px 5px;
  padding: 10px 0;
  width: 100%;
`, Ug = dt.div`
  margin: 15px 15px 15px 0;
`, K0 = dt.div`
  align-content: left;
  font-style: italic;
`, qg = dt.div`
  background-color: ${N0};
  height: 34px;
  display: flex;
  justify-content: space-between;
  align-content: center;
  align-items: center;
  font-size: 14px;
  padding: 8px;
  border-top-left-radius: 2px;
  border-top-right-radius: 8px;
`, Qg = dt.p`
  font-ize: 14px;
`, Rc = dt.div`
  border: 1px solid #eaeaea;
  padding: 10px;
  border-bottom-left-radius: 8px;
  border-bottom-right-radius: 8px;
  background-color: ${Ss};
`, ew = dt(Y0)`
  height: 14px;
  width: 14px;
  color: ${Wg};
  cursor: pointer;
`, tw = dt.div`
  display: flex;
  flex-direction: row;
  text-align: right;
  justify-content: flex-end;
  font-size: 10px;
  color: #000000;
  line-height: 12.6px;
  opacity: 50%;
`, nw = dt.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  flex-wrap: wrap;
  gap: 10px;
  // padding: 20px;
`, ku = ({ item: e, index: t }) => /* @__PURE__ */ W.jsx(U0, { children: /* @__PURE__ */ W.jsx(q0, { children: /* @__PURE__ */ W.jsx(Q0, { children: e.data }) }) }, t);
ku.propTypes = {
  item: _e.any,
  index: _e.any
};
const rw = "data:image/svg+xml,%3csvg%20width='24'%20height='24'%20viewBox='0%200%2024%2024'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3cpath%20d='M19%203H5C3.89543%203%203%203.89543%203%205V19C3%2020.1046%203.89543%2021%205%2021H19C20.1046%2021%2021%2020.1046%2021%2019V5C21%203.89543%2020.1046%203%2019%203Z'%20stroke='%23509EE3'%20stroke-width='2'%20stroke-linecap='round'%20stroke-linejoin='round'/%3e%3cpath%20d='M3%209H21'%20stroke='%23509EE3'%20stroke-width='2'%20stroke-linecap='round'%20stroke-linejoin='round'/%3e%3cpath%20d='M9%2021V9'%20stroke='%23509EE3'%20stroke-width='2'%20stroke-linecap='round'%20stroke-linejoin='round'/%3e%3c/svg%3e", Kg = () => /* @__PURE__ */ W.jsx(iw, { children: /* @__PURE__ */ W.jsx("img", { src: rw, alt: "bot" }) }), iw = dt.span`
  border-radius: 50%;
  padding: 8px;
  height: 32px;
  width: 32px;
  display: flex;
  background-color: ${Ss};
`;
var Pa = { exports: {} }, mo = { exports: {} }, ow = mo.exports, Xd;
function aw() {
  return Xd || (Xd = 1, function(e, t) {
    (function(n, r) {
      r(t, cn);
    })(ow, function(n, r) {
      function i(f, C, R, P, V, N, j) {
        try {
          var te = f[N](j), ae = te.value;
        } catch (se) {
          return void R(se);
        }
        te.done ? C(ae) : Promise.resolve(ae).then(P, V);
      }
      function a(f) {
        return function() {
          var C = this, R = arguments;
          return new Promise(function(P, V) {
            var N = f.apply(C, R);
            function j(ae) {
              i(N, P, V, j, te, "next", ae);
            }
            function te(ae) {
              i(N, P, V, j, te, "throw", ae);
            }
            j(void 0);
          });
        };
      }
      function o() {
        return (o = Object.assign || function(f) {
          for (var C = 1; C < arguments.length; C++) {
            var R = arguments[C];
            for (var P in R) Object.prototype.hasOwnProperty.call(R, P) && (f[P] = R[P]);
          }
          return f;
        }).apply(this, arguments);
      }
      function l(f, C) {
        if (f == null) return {};
        var R, P, V = {}, N = Object.keys(f);
        for (P = 0; P < N.length; P++) R = N[P], C.indexOf(R) >= 0 || (V[R] = f[R]);
        return V;
      }
      function u(f) {
        var C = function(R, P) {
          if (typeof R != "object" || R === null) return R;
          var V = R[Symbol.toPrimitive];
          if (V !== void 0) {
            var N = V.call(R, P);
            if (typeof N != "object") return N;
            throw new TypeError("@@toPrimitive must return a primitive value.");
          }
          return String(R);
        }(f, "string");
        return typeof C == "symbol" ? C : String(C);
      }
      r = r && Object.prototype.hasOwnProperty.call(r, "default") ? r.default : r;
      var s = { init: "init" }, d = function(f) {
        var C = f.value;
        return C === void 0 ? "" : C;
      }, c = function() {
        return r.createElement(r.Fragment, null, " ");
      }, m = { Cell: d, width: 150, minWidth: 0, maxWidth: Number.MAX_SAFE_INTEGER };
      function h() {
        for (var f = arguments.length, C = new Array(f), R = 0; R < f; R++) C[R] = arguments[R];
        return C.reduce(function(P, V) {
          var N = V.style, j = V.className;
          return P = o({}, P, {}, l(V, ["style", "className"])), N && (P.style = P.style ? o({}, P.style || {}, {}, N || {}) : N), j && (P.className = P.className ? P.className + " " + j : j), P.className === "" && delete P.className, P;
        }, {});
      }
      var x = function(f, C) {
        return C === void 0 && (C = {}), function(R) {
          return R === void 0 && (R = {}), [].concat(f, [R]).reduce(function(P, V) {
            return function N(j, te, ae) {
              return typeof te == "function" ? N({}, te(j, ae)) : Array.isArray(te) ? h.apply(void 0, [j].concat(te)) : h(j, te);
            }(P, V, o({}, C, { userProps: R }));
          }, {});
        };
      }, v = function(f, C, R, P) {
        return R === void 0 && (R = {}), f.reduce(function(V, N) {
          return N(V, R);
        }, C);
      }, b = function(f, C, R) {
        return R === void 0 && (R = {}), f.forEach(function(P) {
          P(C, R);
        });
      };
      function I(f, C, R, P) {
        f.findIndex(function(V) {
          return V.pluginName === R;
        }), C.forEach(function(V) {
          f.findIndex(function(N) {
            return N.pluginName === V;
          });
        });
      }
      function O(f, C) {
        return typeof f == "function" ? f(C) : f;
      }
      function T(f) {
        var C = r.useRef();
        return C.current = f, r.useCallback(function() {
          return C.current;
        }, []);
      }
      var D = typeof document < "u" ? r.useLayoutEffect : r.useEffect;
      function E(f, C) {
        var R = r.useRef(!1);
        D(function() {
          R.current && f(), R.current = !0;
        }, C);
      }
      function B(f, C, R) {
        return R === void 0 && (R = {}), function(P, V) {
          V === void 0 && (V = {});
          var N = typeof P == "string" ? C[P] : P;
          if (N === void 0) throw console.info(C), new Error("Renderer Error ☝️");
          return X(N, o({}, f, { column: C }, R, {}, V));
        };
      }
      function X(f, C) {
        return function(P) {
          return typeof P == "function" && (V = Object.getPrototypeOf(P)).prototype && V.prototype.isReactComponent;
          var V;
        }(R = f) || typeof R == "function" || function(P) {
          return typeof P == "object" && typeof P.$$typeof == "symbol" && ["react.memo", "react.forward_ref"].includes(P.$$typeof.description);
        }(R) ? r.createElement(f, C) : f;
        var R;
      }
      function U(f, C, R) {
        return R === void 0 && (R = 0), f.map(function(P) {
          return Fe(P = o({}, P, { parent: C, depth: R })), P.columns && (P.columns = U(P.columns, P, R + 1)), P;
        });
      }
      function K(f) {
        return Ee(f, "columns");
      }
      function Fe(f) {
        var C = f.id, R = f.accessor, P = f.Header;
        if (typeof R == "string") {
          C = C || R;
          var V = R.split(".");
          R = function(N) {
            return function(j, te, ae) {
              if (!te) return j;
              var se, Ae = typeof te == "function" ? te : JSON.stringify(te), Ce = ye.get(Ae) || function() {
                var Se = function(de) {
                  return function xe(Ne, Ve) {
                    if (Ve === void 0 && (Ve = []), Array.isArray(Ne)) for (var Je = 0; Je < Ne.length; Je += 1) xe(Ne[Je], Ve);
                    else Ve.push(Ne);
                    return Ve;
                  }(de).map(function(xe) {
                    return String(xe).replace(".", "_");
                  }).join(".").replace(A, ".").replace(w, "").split(".");
                }(te);
                return ye.set(Ae, Se), Se;
              }();
              try {
                se = Ce.reduce(function(Se, de) {
                  return Se[de];
                }, j);
              } catch {
              }
              return se !== void 0 ? se : ae;
            }(N, V);
          };
        }
        if (!C && typeof P == "string" && P && (C = P), !C && f.columns) throw console.error(f), new Error('A column ID (or unique "Header" value) is required!');
        if (!C) throw console.error(f), new Error("A column ID (or string accessor) is required!");
        return Object.assign(f, { id: C, accessor: R }), f;
      }
      function oe(f, C) {
        if (!C) throw new Error();
        return Object.assign(f, o({ Header: c, Footer: c }, m, {}, C, {}, f)), Object.assign(f, { originalWidth: f.width }), f;
      }
      function ce(f, C, R) {
        R === void 0 && (R = function() {
          return {};
        });
        for (var P = [], V = f, N = 0, j = function() {
          return N++;
        }, te = function() {
          var ae = { headers: [] }, se = [], Ae = V.some(function(Ce) {
            return Ce.parent;
          });
          V.forEach(function(Ce) {
            var Se, de = [].concat(se).reverse()[0];
            Ae && (Ce.parent ? Se = o({}, Ce.parent, { originalId: Ce.parent.id, id: Ce.parent.id + "_" + j(), headers: [Ce] }, R(Ce)) : Se = oe(o({ originalId: Ce.id + "_placeholder", id: Ce.id + "_placeholder_" + j(), placeholderOf: Ce, headers: [Ce] }, R(Ce)), C), de && de.originalId === Se.originalId ? de.headers.push(Ce) : se.push(Se)), ae.headers.push(Ce);
          }), P.push(ae), V = se;
        }; V.length; ) te();
        return P.reverse();
      }
      var ye = /* @__PURE__ */ new Map();
      function Q() {
        for (var f = arguments.length, C = new Array(f), R = 0; R < f; R++) C[R] = arguments[R];
        for (var P = 0; P < C.length; P += 1) if (C[P] !== void 0) return C[P];
      }
      function ue(f) {
        if (typeof f == "function") return f;
      }
      function Ee(f, C) {
        var R = [];
        return function P(V) {
          V.forEach(function(N) {
            N[C] ? P(N[C]) : R.push(N);
          });
        }(f), R;
      }
      function We(f, C) {
        var R = C.manualExpandedKey, P = C.expanded, V = C.expandSubRows, N = V === void 0 || V, j = [];
        return f.forEach(function(te) {
          return function ae(se, Ae) {
            Ae === void 0 && (Ae = !0), se.isExpanded = se.original && se.original[R] || P[se.id], se.canExpand = se.subRows && !!se.subRows.length, Ae && j.push(se), se.subRows && se.subRows.length && se.isExpanded && se.subRows.forEach(function(Ce) {
              return ae(Ce, N);
            });
          }(te);
        }), j;
      }
      function $e(f, C, R) {
        return ue(f) || C[f] || R[f] || R.text;
      }
      function ht(f, C, R) {
        return f ? f(C, R) : C === void 0;
      }
      function G() {
        throw new Error("React-Table: You have not called prepareRow(row) one or more rows you are attempting to render.");
      }
      var Z = null, A = /\[/g, w = /\]/g, H = function(f) {
        return o({ role: "table" }, f);
      }, $ = function(f) {
        return o({ role: "rowgroup" }, f);
      }, _ = function(f, C) {
        var R = C.column;
        return o({ key: "header_" + R.id, colSpan: R.totalVisibleHeaderCount, role: "columnheader" }, f);
      }, re = function(f, C) {
        var R = C.column;
        return o({ key: "footer_" + R.id, colSpan: R.totalVisibleHeaderCount }, f);
      }, Y = function(f, C) {
        return o({ key: "headerGroup_" + C.index, role: "row" }, f);
      }, fe = function(f, C) {
        return o({ key: "footerGroup_" + C.index }, f);
      }, ge = function(f, C) {
        return o({ key: "row_" + C.row.id, role: "row" }, f);
      }, ve = function(f, C) {
        var R = C.cell;
        return o({ key: "cell_" + R.row.id + "_" + R.column.id, role: "cell" }, f);
      };
      function Te() {
        return { useOptions: [], stateReducers: [], useControlledState: [], columns: [], columnsDeps: [], allColumns: [], allColumnsDeps: [], accessValue: [], materializedColumns: [], materializedColumnsDeps: [], useInstanceAfterData: [], visibleColumns: [], visibleColumnsDeps: [], headerGroups: [], headerGroupsDeps: [], useInstanceBeforeDimensions: [], useInstance: [], prepareRow: [], getTableProps: [H], getTableBodyProps: [$], getHeaderGroupProps: [Y], getFooterGroupProps: [fe], getHeaderProps: [_], getFooterProps: [re], getRowProps: [ge], getCellProps: [ve], useFinalInstance: [] };
      }
      s.resetHiddenColumns = "resetHiddenColumns", s.toggleHideColumn = "toggleHideColumn", s.setHiddenColumns = "setHiddenColumns", s.toggleHideAllColumns = "toggleHideAllColumns";
      var J = function(f) {
        f.getToggleHiddenProps = [ft], f.getToggleHideAllColumnsProps = [je], f.stateReducers.push(et), f.useInstanceBeforeDimensions.push(pt), f.headerGroupsDeps.push(function(C, R) {
          var P = R.instance;
          return [].concat(C, [P.state.hiddenColumns]);
        }), f.useInstance.push(Yt);
      };
      J.pluginName = "useColumnVisibility";
      var ft = function(f, C) {
        var R = C.column;
        return [f, { onChange: function(P) {
          R.toggleHidden(!P.target.checked);
        }, style: { cursor: "pointer" }, checked: R.isVisible, title: "Toggle Column Visible" }];
      }, je = function(f, C) {
        var R = C.instance;
        return [f, { onChange: function(P) {
          R.toggleHideAllColumns(!P.target.checked);
        }, style: { cursor: "pointer" }, checked: !R.allColumnsHidden && !R.state.hiddenColumns.length, title: "Toggle All Columns Hidden", indeterminate: !R.allColumnsHidden && R.state.hiddenColumns.length }];
      };
      function et(f, C, R, P) {
        if (C.type === s.init) return o({ hiddenColumns: [] }, f);
        if (C.type === s.resetHiddenColumns) return o({}, f, { hiddenColumns: P.initialState.hiddenColumns || [] });
        if (C.type === s.toggleHideColumn) {
          var V = (C.value !== void 0 ? C.value : !f.hiddenColumns.includes(C.columnId)) ? [].concat(f.hiddenColumns, [C.columnId]) : f.hiddenColumns.filter(function(N) {
            return N !== C.columnId;
          });
          return o({}, f, { hiddenColumns: V });
        }
        return C.type === s.setHiddenColumns ? o({}, f, { hiddenColumns: O(C.value, f.hiddenColumns) }) : C.type === s.toggleHideAllColumns ? o({}, f, { hiddenColumns: (C.value !== void 0 ? C.value : !f.hiddenColumns.length) ? P.allColumns.map(function(N) {
          return N.id;
        }) : [] }) : void 0;
      }
      function pt(f) {
        var C = f.headers, R = f.state.hiddenColumns;
        r.useRef(!1).current;
        var P = 0;
        C.forEach(function(V) {
          return P += function N(j, te) {
            j.isVisible = te && !R.includes(j.id);
            var ae = 0;
            return j.headers && j.headers.length ? j.headers.forEach(function(se) {
              return ae += N(se, j.isVisible);
            }) : ae = j.isVisible ? 1 : 0, j.totalVisibleHeaderCount = ae, ae;
          }(V, !0);
        });
      }
      function Yt(f) {
        var C = f.columns, R = f.flatHeaders, P = f.dispatch, V = f.allColumns, N = f.getHooks, j = f.state.hiddenColumns, te = f.autoResetHiddenColumns, ae = te === void 0 || te, se = T(f), Ae = V.length === j.length, Ce = r.useCallback(function(Ve, Je) {
          return P({ type: s.toggleHideColumn, columnId: Ve, value: Je });
        }, [P]), Se = r.useCallback(function(Ve) {
          return P({ type: s.setHiddenColumns, value: Ve });
        }, [P]), de = r.useCallback(function(Ve) {
          return P({ type: s.toggleHideAllColumns, value: Ve });
        }, [P]), xe = x(N().getToggleHideAllColumnsProps, { instance: se() });
        R.forEach(function(Ve) {
          Ve.toggleHidden = function(Je) {
            P({ type: s.toggleHideColumn, columnId: Ve.id, value: Je });
          }, Ve.getToggleHiddenProps = x(N().getToggleHiddenProps, { instance: se(), column: Ve });
        });
        var Ne = T(ae);
        E(function() {
          Ne() && P({ type: s.resetHiddenColumns });
        }, [P, C]), Object.assign(f, { allColumnsHidden: Ae, toggleHideColumn: Ce, setHiddenColumns: Se, toggleHideAllColumns: de, getToggleHideAllColumnsProps: xe });
      }
      var Cn = {}, kt = {}, gn = function(f, C, R) {
        return f;
      }, on = function(f, C) {
        return f.subRows || [];
      }, an = function(f, C, R) {
        return "" + (R ? [R.id, C].join(".") : C);
      }, Ke = function(f) {
        return f;
      };
      function Ot(f) {
        var C = f.initialState, R = C === void 0 ? Cn : C, P = f.defaultColumn, V = P === void 0 ? kt : P, N = f.getSubRows, j = N === void 0 ? on : N, te = f.getRowId, ae = te === void 0 ? an : te, se = f.stateReducer, Ae = se === void 0 ? gn : se, Ce = f.useControlledState, Se = Ce === void 0 ? Ke : Ce;
        return o({}, l(f, ["initialState", "defaultColumn", "getSubRows", "getRowId", "stateReducer", "useControlledState"]), { initialState: R, defaultColumn: V, getSubRows: j, getRowId: ae, stateReducer: Ae, useControlledState: Se });
      }
      function ee(f, C) {
        C === void 0 && (C = 0);
        var R = 0, P = 0, V = 0, N = 0;
        return f.forEach(function(j) {
          var te = j.headers;
          if (j.totalLeft = C, te && te.length) {
            var ae = ee(te, C), se = ae[0], Ae = ae[1], Ce = ae[2], Se = ae[3];
            j.totalMinWidth = se, j.totalWidth = Ae, j.totalMaxWidth = Ce, j.totalFlexWidth = Se;
          } else j.totalMinWidth = j.minWidth, j.totalWidth = Math.min(Math.max(j.minWidth, j.width), j.maxWidth), j.totalMaxWidth = j.maxWidth, j.totalFlexWidth = j.canResize ? j.totalWidth : 0;
          j.isVisible && (C += j.totalWidth, R += j.totalMinWidth, P += j.totalWidth, V += j.totalMaxWidth, N += j.totalFlexWidth);
        }), [R, P, V, N];
      }
      function we(f) {
        var C = f.data, R = f.rows, P = f.flatRows, V = f.rowsById, N = f.column, j = f.getRowId, te = f.getSubRows, ae = f.accessValueHooks, se = f.getInstance;
        C.forEach(function(Ae, Ce) {
          return function Se(de, xe, Ne, Ve, Je) {
            Ne === void 0 && (Ne = 0);
            var yt = de, Ue = j(de, xe, Ve), Pe = V[Ue];
            if (Pe) Pe.subRows && Pe.originalSubRows.forEach(function(Xe, ut) {
              return Se(Xe, ut, Ne + 1, Pe);
            });
            else if ((Pe = { id: Ue, original: yt, index: xe, depth: Ne, cells: [{}] }).cells.map = G, Pe.cells.filter = G, Pe.cells.forEach = G, Pe.cells[0].getCellProps = G, Pe.values = {}, Je.push(Pe), P.push(Pe), V[Ue] = Pe, Pe.originalSubRows = te(de, xe), Pe.originalSubRows) {
              var mt = [];
              Pe.originalSubRows.forEach(function(Xe, ut) {
                return Se(Xe, ut, Ne + 1, Pe, mt);
              }), Pe.subRows = mt;
            }
            N.accessor && (Pe.values[N.id] = N.accessor(de, xe, Pe, Je, C)), Pe.values[N.id] = v(ae, Pe.values[N.id], { row: Pe, column: N, instance: se() });
          }(Ae, Ce, 0, void 0, R);
        });
      }
      s.resetExpanded = "resetExpanded", s.toggleRowExpanded = "toggleRowExpanded", s.toggleAllRowsExpanded = "toggleAllRowsExpanded";
      var Ze = function(f) {
        f.getToggleAllRowsExpandedProps = [Rt], f.getToggleRowExpandedProps = [Bt], f.stateReducers.push(Sn), f.useInstance.push(Wn), f.prepareRow.push(Gn);
      };
      Ze.pluginName = "useExpanded";
      var Rt = function(f, C) {
        var R = C.instance;
        return [f, { onClick: function(P) {
          R.toggleAllRowsExpanded();
        }, style: { cursor: "pointer" }, title: "Toggle All Rows Expanded" }];
      }, Bt = function(f, C) {
        var R = C.row;
        return [f, { onClick: function() {
          R.toggleRowExpanded();
        }, style: { cursor: "pointer" }, title: "Toggle Row Expanded" }];
      };
      function Sn(f, C, R, P) {
        if (C.type === s.init) return o({ expanded: {} }, f);
        if (C.type === s.resetExpanded) return o({}, f, { expanded: P.initialState.expanded || {} });
        if (C.type === s.toggleAllRowsExpanded) {
          var V = C.value, N = P.rowsById, j = Object.keys(N).length === Object.keys(f.expanded).length;
          if (V !== void 0 ? V : !j) {
            var te = {};
            return Object.keys(N).forEach(function(xe) {
              te[xe] = !0;
            }), o({}, f, { expanded: te });
          }
          return o({}, f, { expanded: {} });
        }
        if (C.type === s.toggleRowExpanded) {
          var ae, se = C.id, Ae = C.value, Ce = f.expanded[se], Se = Ae !== void 0 ? Ae : !Ce;
          if (!Ce && Se) return o({}, f, { expanded: o({}, f.expanded, (ae = {}, ae[se] = !0, ae)) });
          if (Ce && !Se) {
            var de = f.expanded;
            return de[se], o({}, f, { expanded: l(de, [se].map(u)) });
          }
          return f;
        }
      }
      function Wn(f) {
        var C = f.data, R = f.rows, P = f.rowsById, V = f.manualExpandedKey, N = V === void 0 ? "expanded" : V, j = f.paginateExpandedRows, te = j === void 0 || j, ae = f.expandSubRows, se = ae === void 0 || ae, Ae = f.autoResetExpanded, Ce = Ae === void 0 || Ae, Se = f.getHooks, de = f.plugins, xe = f.state.expanded, Ne = f.dispatch;
        I(de, ["useSortBy", "useGroupBy", "usePivotColumns", "useGlobalFilter"], "useExpanded");
        var Ve = T(Ce), Je = !!(Object.keys(P).length && Object.keys(xe).length);
        Je && Object.keys(P).some(function(Tt) {
          return !xe[Tt];
        }) && (Je = !1), E(function() {
          Ve() && Ne({ type: s.resetExpanded });
        }, [Ne, C]);
        var yt = r.useCallback(function(Tt, nt) {
          Ne({ type: s.toggleRowExpanded, id: Tt, value: nt });
        }, [Ne]), Ue = r.useCallback(function(Tt) {
          return Ne({ type: s.toggleAllRowsExpanded, value: Tt });
        }, [Ne]), Pe = r.useMemo(function() {
          return te ? We(R, { manualExpandedKey: N, expanded: xe, expandSubRows: se }) : R;
        }, [te, R, N, xe, se]), mt = r.useMemo(function() {
          return function(Tt) {
            var nt = 0;
            return Object.keys(Tt).forEach(function(ot) {
              var _t = ot.split(".");
              nt = Math.max(nt, _t.length);
            }), nt;
          }(xe);
        }, [xe]), Xe = T(f), ut = x(Se().getToggleAllRowsExpandedProps, { instance: Xe() });
        Object.assign(f, { preExpandedRows: R, expandedRows: Pe, rows: Pe, expandedDepth: mt, isAllRowsExpanded: Je, toggleRowExpanded: yt, toggleAllRowsExpanded: Ue, getToggleAllRowsExpandedProps: ut });
      }
      function Gn(f, C) {
        var R = C.instance.getHooks, P = C.instance;
        f.toggleRowExpanded = function(V) {
          return P.toggleRowExpanded(f.id, V);
        }, f.getToggleRowExpandedProps = x(R().getToggleRowExpandedProps, { instance: P, row: f });
      }
      var er = function(f, C, R) {
        return f = f.filter(function(P) {
          return C.some(function(V) {
            var N = P.values[V];
            return String(N).toLowerCase().includes(String(R).toLowerCase());
          });
        });
      };
      er.autoRemove = function(f) {
        return !f;
      };
      var tr = function(f, C, R) {
        return f.filter(function(P) {
          return C.some(function(V) {
            var N = P.values[V];
            return N === void 0 || String(N).toLowerCase() === String(R).toLowerCase();
          });
        });
      };
      tr.autoRemove = function(f) {
        return !f;
      };
      var pn = function(f, C, R) {
        return f.filter(function(P) {
          return C.some(function(V) {
            var N = P.values[V];
            return N === void 0 || String(N) === String(R);
          });
        });
      };
      pn.autoRemove = function(f) {
        return !f;
      };
      var $n = function(f, C, R) {
        return f.filter(function(P) {
          return C.some(function(V) {
            return P.values[V].includes(R);
          });
        });
      };
      $n.autoRemove = function(f) {
        return !f || !f.length;
      };
      var Rn = function(f, C, R) {
        return f.filter(function(P) {
          return C.some(function(V) {
            var N = P.values[V];
            return N && N.length && R.every(function(j) {
              return N.includes(j);
            });
          });
        });
      };
      Rn.autoRemove = function(f) {
        return !f || !f.length;
      };
      var _r = function(f, C, R) {
        return f.filter(function(P) {
          return C.some(function(V) {
            var N = P.values[V];
            return N && N.length && R.some(function(j) {
              return N.includes(j);
            });
          });
        });
      };
      _r.autoRemove = function(f) {
        return !f || !f.length;
      };
      var Mr = function(f, C, R) {
        return f.filter(function(P) {
          return C.some(function(V) {
            var N = P.values[V];
            return R.includes(N);
          });
        });
      };
      Mr.autoRemove = function(f) {
        return !f || !f.length;
      };
      var ar = function(f, C, R) {
        return f.filter(function(P) {
          return C.some(function(V) {
            return P.values[V] === R;
          });
        });
      };
      ar.autoRemove = function(f) {
        return f === void 0;
      };
      var Vr = function(f, C, R) {
        return f.filter(function(P) {
          return C.some(function(V) {
            return P.values[V] == R;
          });
        });
      };
      Vr.autoRemove = function(f) {
        return f == null;
      };
      var Lr = function(f, C, R) {
        var P = R || [], V = P[0], N = P[1];
        if ((V = typeof V == "number" ? V : -1 / 0) > (N = typeof N == "number" ? N : 1 / 0)) {
          var j = V;
          V = N, N = j;
        }
        return f.filter(function(te) {
          return C.some(function(ae) {
            var se = te.values[ae];
            return se >= V && se <= N;
          });
        });
      };
      Lr.autoRemove = function(f) {
        return !f || typeof f[0] != "number" && typeof f[1] != "number";
      };
      var cr = Object.freeze({ __proto__: null, text: er, exactText: tr, exactTextCase: pn, includes: $n, includesAll: Rn, includesSome: _r, includesValue: Mr, exact: ar, equals: Vr, between: Lr });
      s.resetFilters = "resetFilters", s.setFilter = "setFilter", s.setAllFilters = "setAllFilters";
      var bi = function(f) {
        f.stateReducers.push(yi), f.useInstance.push(wi);
      };
      function yi(f, C, R, P) {
        if (C.type === s.init) return o({ filters: [] }, f);
        if (C.type === s.resetFilters) return o({}, f, { filters: P.initialState.filters || [] });
        if (C.type === s.setFilter) {
          var V = C.columnId, N = C.filterValue, j = P.allColumns, te = P.filterTypes, ae = j.find(function(Ne) {
            return Ne.id === V;
          });
          if (!ae) throw new Error("React-Table: Could not find a column with id: " + V);
          var se = $e(ae.filter, te || {}, cr), Ae = f.filters.find(function(Ne) {
            return Ne.id === V;
          }), Ce = O(N, Ae && Ae.value);
          return ht(se.autoRemove, Ce, ae) ? o({}, f, { filters: f.filters.filter(function(Ne) {
            return Ne.id !== V;
          }) }) : o({}, f, Ae ? { filters: f.filters.map(function(Ne) {
            return Ne.id === V ? { id: V, value: Ce } : Ne;
          }) } : { filters: [].concat(f.filters, [{ id: V, value: Ce }]) });
        }
        if (C.type === s.setAllFilters) {
          var Se = C.filters, de = P.allColumns, xe = P.filterTypes;
          return o({}, f, { filters: O(Se, f.filters).filter(function(Ne) {
            var Ve = de.find(function(Je) {
              return Je.id === Ne.id;
            });
            return !ht($e(Ve.filter, xe || {}, cr).autoRemove, Ne.value, Ve);
          }) });
        }
      }
      function wi(f) {
        var C = f.data, R = f.rows, P = f.flatRows, V = f.rowsById, N = f.allColumns, j = f.filterTypes, te = f.manualFilters, ae = f.defaultCanFilter, se = ae !== void 0 && ae, Ae = f.disableFilters, Ce = f.state.filters, Se = f.dispatch, de = f.autoResetFilters, xe = de === void 0 || de, Ne = r.useCallback(function(Xe, ut) {
          Se({ type: s.setFilter, columnId: Xe, filterValue: ut });
        }, [Se]), Ve = r.useCallback(function(Xe) {
          Se({ type: s.setAllFilters, filters: Xe });
        }, [Se]);
        N.forEach(function(Xe) {
          var ut = Xe.id, Tt = Xe.accessor, nt = Xe.defaultCanFilter, ot = Xe.disableFilters;
          Xe.canFilter = Tt ? Q(ot !== !0 && void 0, Ae !== !0 && void 0, !0) : Q(nt, se, !1), Xe.setFilter = function(gt) {
            return Ne(Xe.id, gt);
          };
          var _t = Ce.find(function(gt) {
            return gt.id === ut;
          });
          Xe.filterValue = _t && _t.value;
        });
        var Je = r.useMemo(function() {
          if (te || !Ce.length) return [R, P, V];
          var Xe = [], ut = {};
          return [function Tt(nt, ot) {
            ot === void 0 && (ot = 0);
            var _t = nt;
            return (_t = Ce.reduce(function(gt, Ft) {
              var p = Ft.id, g = Ft.value, S = N.find(function(F) {
                return F.id === p;
              });
              if (!S) return gt;
              ot === 0 && (S.preFilteredRows = gt);
              var y = $e(S.filter, j || {}, cr);
              return y ? (S.filteredRows = y(gt, [p], g), S.filteredRows) : (console.warn("Could not find a valid 'column.filter' for column with the ID: " + S.id + "."), gt);
            }, nt)).forEach(function(gt) {
              Xe.push(gt), ut[gt.id] = gt, gt.subRows && (gt.subRows = gt.subRows && gt.subRows.length > 0 ? Tt(gt.subRows, ot + 1) : gt.subRows);
            }), _t;
          }(R), Xe, ut];
        }, [te, Ce, R, P, V, N, j]), yt = Je[0], Ue = Je[1], Pe = Je[2];
        r.useMemo(function() {
          N.filter(function(Xe) {
            return !Ce.find(function(ut) {
              return ut.id === Xe.id;
            });
          }).forEach(function(Xe) {
            Xe.preFilteredRows = yt, Xe.filteredRows = yt;
          });
        }, [yt, Ce, N]);
        var mt = T(xe);
        E(function() {
          mt() && Se({ type: s.resetFilters });
        }, [Se, te ? null : C]), Object.assign(f, { preFilteredRows: R, preFilteredFlatRows: P, preFilteredRowsById: V, filteredRows: yt, filteredFlatRows: Ue, filteredRowsById: Pe, rows: yt, flatRows: Ue, rowsById: Pe, setFilter: Ne, setAllFilters: Ve });
      }
      bi.pluginName = "useFilters", s.resetGlobalFilter = "resetGlobalFilter", s.setGlobalFilter = "setGlobalFilter";
      var Dr = function(f) {
        f.stateReducers.push(Kr), f.useInstance.push(xi);
      };
      function Kr(f, C, R, P) {
        if (C.type === s.resetGlobalFilter) return o({}, f, { globalFilter: P.initialState.globalFilter || void 0 });
        if (C.type === s.setGlobalFilter) {
          var V = C.filterValue, N = P.userFilterTypes, j = $e(P.globalFilter, N || {}, cr), te = O(V, f.globalFilter);
          return ht(j.autoRemove, te) ? (f.globalFilter, l(f, ["globalFilter"])) : o({}, f, { globalFilter: te });
        }
      }
      function xi(f) {
        var C = f.data, R = f.rows, P = f.flatRows, V = f.rowsById, N = f.allColumns, j = f.filterTypes, te = f.globalFilter, ae = f.manualGlobalFilter, se = f.state.globalFilter, Ae = f.dispatch, Ce = f.autoResetGlobalFilter, Se = Ce === void 0 || Ce, de = f.disableGlobalFilter, xe = r.useCallback(function(Pe) {
          Ae({ type: s.setGlobalFilter, filterValue: Pe });
        }, [Ae]), Ne = r.useMemo(function() {
          if (ae || se === void 0) return [R, P, V];
          var Pe = [], mt = {}, Xe = $e(te, j || {}, cr);
          if (!Xe) return console.warn("Could not find a valid 'globalFilter' option."), R;
          N.forEach(function(Tt) {
            var nt = Tt.disableGlobalFilter;
            Tt.canFilter = Q(nt !== !0 && void 0, de !== !0 && void 0, !0);
          });
          var ut = N.filter(function(Tt) {
            return Tt.canFilter === !0;
          });
          return [function Tt(nt) {
            return (nt = Xe(nt, ut.map(function(ot) {
              return ot.id;
            }), se)).forEach(function(ot) {
              Pe.push(ot), mt[ot.id] = ot, ot.subRows = ot.subRows && ot.subRows.length ? Tt(ot.subRows) : ot.subRows;
            }), nt;
          }(R), Pe, mt];
        }, [ae, se, te, j, N, R, P, V, de]), Ve = Ne[0], Je = Ne[1], yt = Ne[2], Ue = T(Se);
        E(function() {
          Ue() && Ae({ type: s.resetGlobalFilter });
        }, [Ae, ae ? null : C]), Object.assign(f, { preGlobalFilteredRows: R, preGlobalFilteredFlatRows: P, preGlobalFilteredRowsById: V, globalFilteredRows: Ve, globalFilteredFlatRows: Je, globalFilteredRowsById: yt, rows: Ve, flatRows: Je, rowsById: yt, setGlobalFilter: xe, disableGlobalFilter: de });
      }
      function ei(f, C) {
        return C.reduce(function(R, P) {
          return R + (typeof P == "number" ? P : 0);
        }, 0);
      }
      Dr.pluginName = "useGlobalFilter";
      var jr = Object.freeze({ __proto__: null, sum: ei, min: function(f) {
        var C = f[0] || 0;
        return f.forEach(function(R) {
          typeof R == "number" && (C = Math.min(C, R));
        }), C;
      }, max: function(f) {
        var C = f[0] || 0;
        return f.forEach(function(R) {
          typeof R == "number" && (C = Math.max(C, R));
        }), C;
      }, minMax: function(f) {
        var C = f[0] || 0, R = f[0] || 0;
        return f.forEach(function(P) {
          typeof P == "number" && (C = Math.min(C, P), R = Math.max(R, P));
        }), C + ".." + R;
      }, average: function(f) {
        return ei(0, f) / f.length;
      }, median: function(f) {
        if (!f.length) return null;
        var C = Math.floor(f.length / 2), R = [].concat(f).sort(function(P, V) {
          return P - V;
        });
        return f.length % 2 != 0 ? R[C] : (R[C - 1] + R[C]) / 2;
      }, unique: function(f) {
        return Array.from(new Set(f).values());
      }, uniqueCount: function(f) {
        return new Set(f).size;
      }, count: function(f) {
        return f.length;
      } }), ti = [], Ci = {};
      s.resetGroupBy = "resetGroupBy", s.setGroupBy = "setGroupBy", s.toggleGroupBy = "toggleGroupBy";
      var ni = function(f) {
        f.getGroupByToggleProps = [Si], f.stateReducers.push(Sr), f.visibleColumnsDeps.push(function(C, R) {
          var P = R.instance;
          return [].concat(C, [P.state.groupBy]);
        }), f.visibleColumns.push(L), f.useInstance.push(ze), f.prepareRow.push(lt);
      };
      ni.pluginName = "useGroupBy";
      var Si = function(f, C) {
        var R = C.header;
        return [f, { onClick: R.canGroupBy ? function(P) {
          P.persist(), R.toggleGroupBy();
        } : void 0, style: { cursor: R.canGroupBy ? "pointer" : void 0 }, title: "Toggle GroupBy" }];
      };
      function Sr(f, C, R, P) {
        if (C.type === s.init) return o({ groupBy: [] }, f);
        if (C.type === s.resetGroupBy) return o({}, f, { groupBy: P.initialState.groupBy || [] });
        if (C.type === s.setGroupBy) return o({}, f, { groupBy: C.value });
        if (C.type === s.toggleGroupBy) {
          var V = C.columnId, N = C.value, j = N !== void 0 ? N : !f.groupBy.includes(V);
          return o({}, f, j ? { groupBy: [].concat(f.groupBy, [V]) } : { groupBy: f.groupBy.filter(function(te) {
            return te !== V;
          }) });
        }
      }
      function L(f, C) {
        var R = C.instance.state.groupBy, P = R.map(function(N) {
          return f.find(function(j) {
            return j.id === N;
          });
        }).filter(Boolean), V = f.filter(function(N) {
          return !R.includes(N.id);
        });
        return (f = [].concat(P, V)).forEach(function(N) {
          N.isGrouped = R.includes(N.id), N.groupedIndex = R.indexOf(N.id);
        }), f;
      }
      var be = {};
      function ze(f) {
        var C = f.data, R = f.rows, P = f.flatRows, V = f.rowsById, N = f.allColumns, j = f.flatHeaders, te = f.groupByFn, ae = te === void 0 ? Gt : te, se = f.manualGroupBy, Ae = f.aggregations, Ce = Ae === void 0 ? be : Ae, Se = f.plugins, de = f.state.groupBy, xe = f.dispatch, Ne = f.autoResetGroupBy, Ve = Ne === void 0 || Ne, Je = f.disableGroupBy, yt = f.defaultCanGroupBy, Ue = f.getHooks;
        I(Se, ["useColumnOrder", "useFilters"], "useGroupBy");
        var Pe = T(f);
        N.forEach(function(S) {
          var y = S.accessor, F = S.defaultGroupBy, M = S.disableGroupBy;
          S.canGroupBy = y ? Q(S.canGroupBy, M !== !0 && void 0, Je !== !0 && void 0, !0) : Q(S.canGroupBy, F, yt, !1), S.canGroupBy && (S.toggleGroupBy = function() {
            return f.toggleGroupBy(S.id);
          }), S.Aggregated = S.Aggregated || S.Cell;
        });
        var mt = r.useCallback(function(S, y) {
          xe({ type: s.toggleGroupBy, columnId: S, value: y });
        }, [xe]), Xe = r.useCallback(function(S) {
          xe({ type: s.setGroupBy, value: S });
        }, [xe]);
        j.forEach(function(S) {
          S.getGroupByToggleProps = x(Ue().getGroupByToggleProps, { instance: Pe(), header: S });
        });
        var ut = r.useMemo(function() {
          if (se || !de.length) return [R, P, V, ti, Ci, P, V];
          var S = de.filter(function(le) {
            return N.find(function(Oe) {
              return Oe.id === le;
            });
          }), y = [], F = {}, M = [], k = {}, z = [], q = {}, ne = function le(Oe, me, Ie) {
            if (me === void 0 && (me = 0), me === S.length) return Oe.map(function(He) {
              return o({}, He, { depth: me });
            });
            var Be = S[me], pe = ae(Oe, Be);
            return Object.entries(pe).map(function(He, Qe) {
              var it = He[0], Me = He[1], vt = Be + ":" + it, It = le(Me, me + 1, vt = Ie ? Ie + ">" + vt : vt), Le = me ? Ee(Me, "leafRows") : Me, Ge = function(qe, wt, xt) {
                var zt = {};
                return N.forEach(function(Ye) {
                  if (S.includes(Ye.id)) zt[Ye.id] = wt[0] ? wt[0].values[Ye.id] : null;
                  else {
                    var wn = typeof Ye.aggregate == "function" ? Ye.aggregate : Ce[Ye.aggregate] || jr[Ye.aggregate];
                    if (wn) {
                      var Ct = wt.map(function(ct) {
                        return ct.values[Ye.id];
                      }), at = qe.map(function(ct) {
                        var Jt = ct.values[Ye.id];
                        if (!xt && Ye.aggregateValue) {
                          var In = typeof Ye.aggregateValue == "function" ? Ye.aggregateValue : Ce[Ye.aggregateValue] || jr[Ye.aggregateValue];
                          if (!In) throw console.info({ column: Ye }), new Error("React Table: Invalid column.aggregateValue option for column listed above");
                          Jt = In(Jt, ct, Ye);
                        }
                        return Jt;
                      });
                      zt[Ye.id] = wn(at, Ct);
                    } else {
                      if (Ye.aggregate) throw console.info({ column: Ye }), new Error("React Table: Invalid column.aggregate option for column listed above");
                      zt[Ye.id] = null;
                    }
                  }
                }), zt;
              }(Le, Me, me), De = { id: vt, isGrouped: !0, groupByID: Be, groupByVal: it, values: Ge, subRows: It, leafRows: Le, depth: me, index: Qe };
              return It.forEach(function(qe) {
                y.push(qe), F[qe.id] = qe, qe.isGrouped ? (M.push(qe), k[qe.id] = qe) : (z.push(qe), q[qe.id] = qe);
              }), De;
            });
          }(R);
          return ne.forEach(function(le) {
            y.push(le), F[le.id] = le, le.isGrouped ? (M.push(le), k[le.id] = le) : (z.push(le), q[le.id] = le);
          }), [ne, y, F, M, k, z, q];
        }, [se, de, R, P, V, N, Ce, ae]), Tt = ut[0], nt = ut[1], ot = ut[2], _t = ut[3], gt = ut[4], Ft = ut[5], p = ut[6], g = T(Ve);
        E(function() {
          g() && xe({ type: s.resetGroupBy });
        }, [xe, se ? null : C]), Object.assign(f, { preGroupedRows: R, preGroupedFlatRow: P, preGroupedRowsById: V, groupedRows: Tt, groupedFlatRows: nt, groupedRowsById: ot, onlyGroupedFlatRows: _t, onlyGroupedRowsById: gt, nonGroupedFlatRows: Ft, nonGroupedRowsById: p, rows: Tt, flatRows: nt, rowsById: ot, toggleGroupBy: mt, setGroupBy: Xe });
      }
      function lt(f) {
        f.allCells.forEach(function(C) {
          var R;
          C.isGrouped = C.column.isGrouped && C.column.id === f.groupByID, C.isPlaceholder = !C.isGrouped && C.column.isGrouped, C.isAggregated = !C.isGrouped && !C.isPlaceholder && ((R = f.subRows) == null ? void 0 : R.length);
        });
      }
      function Gt(f, C) {
        return f.reduce(function(R, P, V) {
          var N = "" + P.values[C];
          return R[N] = Array.isArray(R[N]) ? R[N] : [], R[N].push(P), R;
        }, {});
      }
      var Vt = /([0-9]+)/gm;
      function Pt(f, C) {
        return f === C ? 0 : f > C ? 1 : -1;
      }
      function St(f, C, R) {
        return [f.values[R], C.values[R]];
      }
      function hn(f) {
        return typeof f == "number" ? isNaN(f) || f === 1 / 0 || f === -1 / 0 ? "" : String(f) : typeof f == "string" ? f : "";
      }
      var nn = Object.freeze({ __proto__: null, alphanumeric: function(f, C, R) {
        var P = St(f, C, R), V = P[0], N = P[1];
        for (V = hn(V), N = hn(N), V = V.split(Vt).filter(Boolean), N = N.split(Vt).filter(Boolean); V.length && N.length; ) {
          var j = V.shift(), te = N.shift(), ae = parseInt(j, 10), se = parseInt(te, 10), Ae = [ae, se].sort();
          if (isNaN(Ae[0])) {
            if (j > te) return 1;
            if (te > j) return -1;
          } else {
            if (isNaN(Ae[1])) return isNaN(ae) ? -1 : 1;
            if (ae > se) return 1;
            if (se > ae) return -1;
          }
        }
        return V.length - N.length;
      }, datetime: function(f, C, R) {
        var P = St(f, C, R), V = P[0], N = P[1];
        return Pt(V = V.getTime(), N = N.getTime());
      }, basic: function(f, C, R) {
        var P = St(f, C, R);
        return Pt(P[0], P[1]);
      }, string: function(f, C, R) {
        var P = St(f, C, R), V = P[0], N = P[1];
        for (V = V.split("").filter(Boolean), N = N.split("").filter(Boolean); V.length && N.length; ) {
          var j = V.shift(), te = N.shift(), ae = j.toLowerCase(), se = te.toLowerCase();
          if (ae > se) return 1;
          if (se > ae) return -1;
          if (j > te) return 1;
          if (te > j) return -1;
        }
        return V.length - N.length;
      }, number: function(f, C, R) {
        var P = St(f, C, R), V = P[0], N = P[1], j = /[^0-9.]/gi;
        return Pt(V = Number(String(V).replace(j, "")), N = Number(String(N).replace(j, "")));
      } });
      s.resetSortBy = "resetSortBy", s.setSortBy = "setSortBy", s.toggleSortBy = "toggleSortBy", s.clearSortBy = "clearSortBy", m.sortType = "alphanumeric", m.sortDescFirst = !1;
      var rn = function(f) {
        f.getSortByToggleProps = [Pn], f.stateReducers.push(dr), f.useInstance.push(sr);
      };
      rn.pluginName = "useSortBy";
      var Pn = function(f, C) {
        var R = C.instance, P = C.column, V = R.isMultiSortEvent, N = V === void 0 ? function(j) {
          return j.shiftKey;
        } : V;
        return [f, { onClick: P.canSort ? function(j) {
          j.persist(), P.toggleSortBy(void 0, !R.disableMultiSort && N(j));
        } : void 0, style: { cursor: P.canSort ? "pointer" : void 0 }, title: P.canSort ? "Toggle SortBy" : void 0 }];
      };
      function dr(f, C, R, P) {
        if (C.type === s.init) return o({ sortBy: [] }, f);
        if (C.type === s.resetSortBy) return o({}, f, { sortBy: P.initialState.sortBy || [] });
        if (C.type === s.clearSortBy) return o({}, f, { sortBy: f.sortBy.filter(function(Pe) {
          return Pe.id !== C.columnId;
        }) });
        if (C.type === s.setSortBy) return o({}, f, { sortBy: C.sortBy });
        if (C.type === s.toggleSortBy) {
          var V, N = C.columnId, j = C.desc, te = C.multi, ae = P.allColumns, se = P.disableMultiSort, Ae = P.disableSortRemove, Ce = P.disableMultiRemove, Se = P.maxMultiSortColCount, de = Se === void 0 ? Number.MAX_SAFE_INTEGER : Se, xe = f.sortBy, Ne = ae.find(function(Pe) {
            return Pe.id === N;
          }).sortDescFirst, Ve = xe.find(function(Pe) {
            return Pe.id === N;
          }), Je = xe.findIndex(function(Pe) {
            return Pe.id === N;
          }), yt = j != null, Ue = [];
          return (V = !se && te ? Ve ? "toggle" : "add" : Je !== xe.length - 1 || xe.length !== 1 ? "replace" : Ve ? "toggle" : "replace") != "toggle" || Ae || yt || te && Ce || !(Ve && Ve.desc && !Ne || !Ve.desc && Ne) || (V = "remove"), V === "replace" ? Ue = [{ id: N, desc: yt ? j : Ne }] : V === "add" ? (Ue = [].concat(xe, [{ id: N, desc: yt ? j : Ne }])).splice(0, Ue.length - de) : V === "toggle" ? Ue = xe.map(function(Pe) {
            return Pe.id === N ? o({}, Pe, { desc: yt ? j : !Ve.desc }) : Pe;
          }) : V === "remove" && (Ue = xe.filter(function(Pe) {
            return Pe.id !== N;
          })), o({}, f, { sortBy: Ue });
        }
      }
      function sr(f) {
        var C = f.data, R = f.rows, P = f.flatRows, V = f.allColumns, N = f.orderByFn, j = N === void 0 ? yn : N, te = f.sortTypes, ae = f.manualSortBy, se = f.defaultCanSort, Ae = f.disableSortBy, Ce = f.flatHeaders, Se = f.state.sortBy, de = f.dispatch, xe = f.plugins, Ne = f.getHooks, Ve = f.autoResetSortBy, Je = Ve === void 0 || Ve;
        I(xe, ["useFilters", "useGlobalFilter", "useGroupBy", "usePivotColumns"], "useSortBy");
        var yt = r.useCallback(function(nt) {
          de({ type: s.setSortBy, sortBy: nt });
        }, [de]), Ue = r.useCallback(function(nt, ot, _t) {
          de({ type: s.toggleSortBy, columnId: nt, desc: ot, multi: _t });
        }, [de]), Pe = T(f);
        Ce.forEach(function(nt) {
          var ot = nt.accessor, _t = nt.canSort, gt = nt.disableSortBy, Ft = nt.id, p = ot ? Q(gt !== !0 && void 0, Ae !== !0 && void 0, !0) : Q(se, _t, !1);
          nt.canSort = p, nt.canSort && (nt.toggleSortBy = function(S, y) {
            return Ue(nt.id, S, y);
          }, nt.clearSortBy = function() {
            de({ type: s.clearSortBy, columnId: nt.id });
          }), nt.getSortByToggleProps = x(Ne().getSortByToggleProps, { instance: Pe(), column: nt });
          var g = Se.find(function(S) {
            return S.id === Ft;
          });
          nt.isSorted = !!g, nt.sortedIndex = Se.findIndex(function(S) {
            return S.id === Ft;
          }), nt.isSortedDesc = nt.isSorted ? g.desc : void 0;
        });
        var mt = r.useMemo(function() {
          if (ae || !Se.length) return [R, P];
          var nt = [], ot = Se.filter(function(_t) {
            return V.find(function(gt) {
              return gt.id === _t.id;
            });
          });
          return [function _t(gt) {
            var Ft = j(gt, ot.map(function(p) {
              var g = V.find(function(F) {
                return F.id === p.id;
              });
              if (!g) throw new Error("React-Table: Could not find a column with id: " + p.id + " while sorting");
              var S = g.sortType, y = ue(S) || (te || {})[S] || nn[S];
              if (!y) throw new Error("React-Table: Could not find a valid sortType of '" + S + "' for column '" + p.id + "'.");
              return function(F, M) {
                return y(F, M, p.id, p.desc);
              };
            }), ot.map(function(p) {
              var g = V.find(function(S) {
                return S.id === p.id;
              });
              return g && g.sortInverted ? p.desc : !p.desc;
            }));
            return Ft.forEach(function(p) {
              nt.push(p), p.subRows && p.subRows.length !== 0 && (p.subRows = _t(p.subRows));
            }), Ft;
          }(R), nt];
        }, [ae, Se, R, P, V, j, te]), Xe = mt[0], ut = mt[1], Tt = T(Je);
        E(function() {
          Tt() && de({ type: s.resetSortBy });
        }, [ae ? null : C]), Object.assign(f, { preSortedRows: R, preSortedFlatRows: P, sortedRows: Xe, sortedFlatRows: ut, rows: Xe, flatRows: ut, setSortBy: yt, toggleSortBy: Ue });
      }
      function yn(f, C, R) {
        return [].concat(f).sort(function(P, V) {
          for (var N = 0; N < C.length; N += 1) {
            var j = C[N], te = R[N] === !1 || R[N] === "desc", ae = j(P, V);
            if (ae !== 0) return te ? -ae : ae;
          }
          return R[0] ? P.index - V.index : V.index - P.index;
        });
      }
      s.resetPage = "resetPage", s.gotoPage = "gotoPage", s.setPageSize = "setPageSize";
      var Ir = function(f) {
        f.stateReducers.push(Ui), f.useInstance.push(qi);
      };
      function Ui(f, C, R, P) {
        if (C.type === s.init) return o({ pageSize: 10, pageIndex: 0 }, f);
        if (C.type === s.resetPage) return o({}, f, { pageIndex: P.initialState.pageIndex || 0 });
        if (C.type === s.gotoPage) {
          var V = P.pageCount, N = P.page, j = O(C.pageIndex, f.pageIndex), te = !1;
          return j > f.pageIndex ? te = V === -1 ? N.length >= f.pageSize : j < V : j < f.pageIndex && (te = j > -1), te ? o({}, f, { pageIndex: j }) : f;
        }
        if (C.type === s.setPageSize) {
          var ae = C.pageSize, se = f.pageSize * f.pageIndex;
          return o({}, f, { pageIndex: Math.floor(se / ae), pageSize: ae });
        }
      }
      function qi(f) {
        var C = f.rows, R = f.autoResetPage, P = R === void 0 || R, V = f.manualExpandedKey, N = V === void 0 ? "expanded" : V, j = f.plugins, te = f.pageCount, ae = f.paginateExpandedRows, se = ae === void 0 || ae, Ae = f.expandSubRows, Ce = Ae === void 0 || Ae, Se = f.state, de = Se.pageSize, xe = Se.pageIndex, Ne = Se.expanded, Ve = Se.globalFilter, Je = Se.filters, yt = Se.groupBy, Ue = Se.sortBy, Pe = f.dispatch, mt = f.data, Xe = f.manualPagination;
        I(j, ["useGlobalFilter", "useFilters", "useGroupBy", "useSortBy", "useExpanded"], "usePagination");
        var ut = T(P);
        E(function() {
          ut() && Pe({ type: s.resetPage });
        }, [Pe, Xe ? null : mt, Ve, Je, yt, Ue]);
        var Tt = Xe ? te : Math.ceil(C.length / de), nt = r.useMemo(function() {
          return Tt > 0 ? [].concat(new Array(Tt)).fill(null).map(function(y, F) {
            return F;
          }) : [];
        }, [Tt]), ot = r.useMemo(function() {
          var y;
          if (Xe) y = C;
          else {
            var F = de * xe, M = F + de;
            y = C.slice(F, M);
          }
          return se ? y : We(y, { manualExpandedKey: N, expanded: Ne, expandSubRows: Ce });
        }, [Ce, Ne, N, Xe, xe, de, se, C]), _t = xe > 0, gt = Tt === -1 ? ot.length >= de : xe < Tt - 1, Ft = r.useCallback(function(y) {
          Pe({ type: s.gotoPage, pageIndex: y });
        }, [Pe]), p = r.useCallback(function() {
          return Ft(function(y) {
            return y - 1;
          });
        }, [Ft]), g = r.useCallback(function() {
          return Ft(function(y) {
            return y + 1;
          });
        }, [Ft]), S = r.useCallback(function(y) {
          Pe({ type: s.setPageSize, pageSize: y });
        }, [Pe]);
        Object.assign(f, { pageOptions: nt, pageCount: Tt, page: ot, canPreviousPage: _t, canNextPage: gt, gotoPage: Ft, previousPage: p, nextPage: g, setPageSize: S });
      }
      Ir.pluginName = "usePagination", s.resetPivot = "resetPivot", s.togglePivot = "togglePivot";
      var Qi = function(f) {
        f.getPivotToggleProps = [$s], f.stateReducers.push(Xs), f.useInstanceAfterData.push(Ys), f.allColumns.push(Zs), f.accessValue.push(Js), f.materializedColumns.push(Zo), f.materializedColumnsDeps.push(Jo), f.visibleColumns.push(Us), f.visibleColumnsDeps.push(qs), f.useInstance.push(Qs), f.prepareRow.push(Ks);
      };
      Qi.pluginName = "usePivotColumns";
      var Yo = [], $s = function(f, C) {
        var R = C.header;
        return [f, { onClick: R.canPivot ? function(P) {
          P.persist(), R.togglePivot();
        } : void 0, style: { cursor: R.canPivot ? "pointer" : void 0 }, title: "Toggle Pivot" }];
      };
      function Xs(f, C, R, P) {
        if (C.type === s.init) return o({ pivotColumns: Yo }, f);
        if (C.type === s.resetPivot) return o({}, f, { pivotColumns: P.initialState.pivotColumns || Yo });
        if (C.type === s.togglePivot) {
          var V = C.columnId, N = C.value, j = N !== void 0 ? N : !f.pivotColumns.includes(V);
          return o({}, f, j ? { pivotColumns: [].concat(f.pivotColumns, [V]) } : { pivotColumns: f.pivotColumns.filter(function(te) {
            return te !== V;
          }) });
        }
      }
      function Ys(f) {
        f.allColumns.forEach(function(C) {
          C.isPivotSource = f.state.pivotColumns.includes(C.id);
        });
      }
      function Zs(f, C) {
        var R = C.instance;
        return f.forEach(function(P) {
          P.isPivotSource = R.state.pivotColumns.includes(P.id), P.uniqueValues = /* @__PURE__ */ new Set();
        }), f;
      }
      function Js(f, C) {
        var R = C.column;
        return R.uniqueValues && f !== void 0 && R.uniqueValues.add(f), f;
      }
      function Zo(f, C) {
        var R = C.instance, P = R.allColumns, V = R.state;
        if (!V.pivotColumns.length || !V.groupBy || !V.groupBy.length) return f;
        var N = V.pivotColumns.map(function(ae) {
          return P.find(function(se) {
            return se.id === ae;
          });
        }).filter(Boolean), j = P.filter(function(ae) {
          return !ae.isPivotSource && !V.groupBy.includes(ae.id) && !V.pivotColumns.includes(ae.id);
        }), te = K(function ae(se, Ae, Ce) {
          se === void 0 && (se = 0), Ce === void 0 && (Ce = []);
          var Se = N[se];
          return Se ? Array.from(Se.uniqueValues).sort().map(function(de) {
            var xe = o({}, Se, { Header: Se.PivotHeader || typeof Se.header == "string" ? Se.Header + ": " + de : de, isPivotGroup: !0, parent: Ae, depth: se, id: Ae ? Ae.id + "." + Se.id + "." + de : Se.id + "." + de, pivotValue: de });
            return xe.columns = ae(se + 1, xe, [].concat(Ce, [function(Ne) {
              return Ne.values[Se.id] === de;
            }])), xe;
          }) : j.map(function(de) {
            return o({}, de, { canPivot: !1, isPivoted: !0, parent: Ae, depth: se, id: "" + (Ae ? Ae.id + "." + de.id : de.id), accessor: function(xe, Ne, Ve) {
              if (Ce.every(function(Je) {
                return Je(Ve);
              })) return Ve.values[de.id];
            } });
          });
        }());
        return [].concat(f, te);
      }
      function Jo(f, C) {
        var R = C.instance.state, P = R.pivotColumns, V = R.groupBy;
        return [].concat(f, [P, V]);
      }
      function Us(f, C) {
        var R = C.instance.state;
        return f = f.filter(function(P) {
          return !P.isPivotSource;
        }), R.pivotColumns.length && R.groupBy && R.groupBy.length && (f = f.filter(function(P) {
          return P.isGrouped || P.isPivoted;
        })), f;
      }
      function qs(f, C) {
        var R = C.instance;
        return [].concat(f, [R.state.pivotColumns, R.state.groupBy]);
      }
      function Qs(f) {
        var C = f.columns, R = f.allColumns, P = f.flatHeaders, V = f.getHooks, N = f.plugins, j = f.dispatch, te = f.autoResetPivot, ae = te === void 0 || te, se = f.manaulPivot, Ae = f.disablePivot, Ce = f.defaultCanPivot;
        I(N, ["useGroupBy"], "usePivotColumns");
        var Se = T(f);
        R.forEach(function(xe) {
          var Ne = xe.accessor, Ve = xe.defaultPivot, Je = xe.disablePivot;
          xe.canPivot = Ne ? Q(xe.canPivot, Je !== !0 && void 0, Ae !== !0 && void 0, !0) : Q(xe.canPivot, Ve, Ce, !1), xe.canPivot && (xe.togglePivot = function() {
            return f.togglePivot(xe.id);
          }), xe.Aggregated = xe.Aggregated || xe.Cell;
        }), P.forEach(function(xe) {
          xe.getPivotToggleProps = x(V().getPivotToggleProps, { instance: Se(), header: xe });
        });
        var de = T(ae);
        E(function() {
          de() && j({ type: s.resetPivot });
        }, [j, se ? null : C]), Object.assign(f, { togglePivot: function(xe, Ne) {
          j({ type: s.togglePivot, columnId: xe, value: Ne });
        } });
      }
      function Ks(f) {
        f.allCells.forEach(function(C) {
          C.isPivoted = C.column.isPivoted;
        });
      }
      s.resetSelectedRows = "resetSelectedRows", s.toggleAllRowsSelected = "toggleAllRowsSelected", s.toggleRowSelected = "toggleRowSelected", s.toggleAllPageRowsSelected = "toggleAllPageRowsSelected";
      var Uo = function(f) {
        f.getToggleRowSelectedProps = [Ki], f.getToggleAllRowsSelectedProps = [ri], f.getToggleAllPageRowsSelectedProps = [qo], f.stateReducers.push(el), f.useInstance.push(Qo), f.prepareRow.push(tl);
      };
      Uo.pluginName = "useRowSelect";
      var Ki = function(f, C) {
        var R = C.instance, P = C.row, V = R.manualRowSelectedKey, N = V === void 0 ? "isSelected" : V;
        return [f, { onChange: function(j) {
          P.toggleRowSelected(j.target.checked);
        }, style: { cursor: "pointer" }, checked: !(!P.original || !P.original[N]) || P.isSelected, title: "Toggle Row Selected", indeterminate: P.isSomeSelected }];
      }, ri = function(f, C) {
        var R = C.instance;
        return [f, { onChange: function(P) {
          R.toggleAllRowsSelected(P.target.checked);
        }, style: { cursor: "pointer" }, checked: R.isAllRowsSelected, title: "Toggle All Rows Selected", indeterminate: !!(!R.isAllRowsSelected && Object.keys(R.state.selectedRowIds).length) }];
      }, qo = function(f, C) {
        var R = C.instance;
        return [f, { onChange: function(P) {
          R.toggleAllPageRowsSelected(P.target.checked);
        }, style: { cursor: "pointer" }, checked: R.isAllPageRowsSelected, title: "Toggle All Current Page Rows Selected", indeterminate: !!(!R.isAllPageRowsSelected && R.page.some(function(P) {
          var V = P.id;
          return R.state.selectedRowIds[V];
        })) }];
      };
      function el(f, C, R, P) {
        if (C.type === s.init) return o({ selectedRowIds: {} }, f);
        if (C.type === s.resetSelectedRows) return o({}, f, { selectedRowIds: P.initialState.selectedRowIds || {} });
        if (C.type === s.toggleAllRowsSelected) {
          var V = C.value, N = P.isAllRowsSelected, j = P.rowsById, te = P.nonGroupedRowsById, ae = te === void 0 ? j : te, se = V !== void 0 ? V : !N, Ae = Object.assign({}, f.selectedRowIds);
          return se ? Object.keys(ae).forEach(function(Ft) {
            Ae[Ft] = !0;
          }) : Object.keys(ae).forEach(function(Ft) {
            delete Ae[Ft];
          }), o({}, f, { selectedRowIds: Ae });
        }
        if (C.type === s.toggleRowSelected) {
          var Ce = C.id, Se = C.value, de = P.rowsById, xe = P.selectSubRows, Ne = xe === void 0 || xe, Ve = P.getSubRows, Je = f.selectedRowIds[Ce], yt = Se !== void 0 ? Se : !Je;
          if (Je === yt) return f;
          var Ue = o({}, f.selectedRowIds);
          return function Ft(p) {
            var g = de[p];
            if (g && (g.isGrouped || (yt ? Ue[p] = !0 : delete Ue[p]), Ne && Ve(g))) return Ve(g).forEach(function(S) {
              return Ft(S.id);
            });
          }(Ce), o({}, f, { selectedRowIds: Ue });
        }
        if (C.type === s.toggleAllPageRowsSelected) {
          var Pe = C.value, mt = P.page, Xe = P.rowsById, ut = P.selectSubRows, Tt = ut === void 0 || ut, nt = P.isAllPageRowsSelected, ot = P.getSubRows, _t = Pe !== void 0 ? Pe : !nt, gt = o({}, f.selectedRowIds);
          return mt.forEach(function(Ft) {
            return function p(g) {
              var S = Xe[g];
              if (S.isGrouped || (_t ? gt[g] = !0 : delete gt[g]), Tt && ot(S)) return ot(S).forEach(function(y) {
                return p(y.id);
              });
            }(Ft.id);
          }), o({}, f, { selectedRowIds: gt });
        }
        return f;
      }
      function Qo(f) {
        var C = f.data, R = f.rows, P = f.getHooks, V = f.plugins, N = f.rowsById, j = f.nonGroupedRowsById, te = j === void 0 ? N : j, ae = f.autoResetSelectedRows, se = ae === void 0 || ae, Ae = f.state.selectedRowIds, Ce = f.selectSubRows, Se = Ce === void 0 || Ce, de = f.dispatch, xe = f.page, Ne = f.getSubRows;
        I(V, ["useFilters", "useGroupBy", "useSortBy", "useExpanded", "usePagination"], "useRowSelect");
        var Ve = r.useMemo(function() {
          var ot = [];
          return R.forEach(function(_t) {
            var gt = Se ? function Ft(p, g, S) {
              if (g[p.id]) return !0;
              var y = S(p);
              if (y && y.length) {
                var F = !0, M = !1;
                return y.forEach(function(k) {
                  M && !F || (Ft(k, g, S) ? M = !0 : F = !1);
                }), !!F || !!M && null;
              }
              return !1;
            }(_t, Ae, Ne) : !!Ae[_t.id];
            _t.isSelected = !!gt, _t.isSomeSelected = gt === null, gt && ot.push(_t);
          }), ot;
        }, [R, Se, Ae, Ne]), Je = !!(Object.keys(te).length && Object.keys(Ae).length), yt = Je;
        Je && Object.keys(te).some(function(ot) {
          return !Ae[ot];
        }) && (Je = !1), Je || xe && xe.length && xe.some(function(ot) {
          var _t = ot.id;
          return !Ae[_t];
        }) && (yt = !1);
        var Ue = T(se);
        E(function() {
          Ue() && de({ type: s.resetSelectedRows });
        }, [de, C]);
        var Pe = r.useCallback(function(ot) {
          return de({ type: s.toggleAllRowsSelected, value: ot });
        }, [de]), mt = r.useCallback(function(ot) {
          return de({ type: s.toggleAllPageRowsSelected, value: ot });
        }, [de]), Xe = r.useCallback(function(ot, _t) {
          return de({ type: s.toggleRowSelected, id: ot, value: _t });
        }, [de]), ut = T(f), Tt = x(P().getToggleAllRowsSelectedProps, { instance: ut() }), nt = x(P().getToggleAllPageRowsSelectedProps, { instance: ut() });
        Object.assign(f, { selectedFlatRows: Ve, isAllRowsSelected: Je, isAllPageRowsSelected: yt, toggleRowSelected: Xe, toggleAllRowsSelected: Pe, getToggleAllRowsSelectedProps: Tt, getToggleAllPageRowsSelectedProps: nt, toggleAllPageRowsSelected: mt });
      }
      function tl(f, C) {
        var R = C.instance;
        f.toggleRowSelected = function(P) {
          return R.toggleRowSelected(f.id, P);
        }, f.getToggleRowSelectedProps = x(R.getHooks().getToggleRowSelectedProps, { instance: R, row: f });
      }
      var Ko = function(f) {
        return {};
      }, ea = function(f) {
        return {};
      };
      s.setRowState = "setRowState", s.setCellState = "setCellState", s.resetRowState = "resetRowState";
      var eo = function(f) {
        f.stateReducers.push(nl), f.useInstance.push(ta), f.prepareRow.push(rl);
      };
      function nl(f, C, R, P) {
        var V = P.initialRowStateAccessor, N = V === void 0 ? Ko : V, j = P.initialCellStateAccessor, te = j === void 0 ? ea : j, ae = P.rowsById;
        if (C.type === s.init) return o({ rowState: {} }, f);
        if (C.type === s.resetRowState) return o({}, f, { rowState: P.initialState.rowState || {} });
        if (C.type === s.setRowState) {
          var se, Ae = C.rowId, Ce = C.value, Se = f.rowState[Ae] !== void 0 ? f.rowState[Ae] : N(ae[Ae]);
          return o({}, f, { rowState: o({}, f.rowState, (se = {}, se[Ae] = O(Ce, Se), se)) });
        }
        if (C.type === s.setCellState) {
          var de, xe, Ne, Ve, Je, yt = C.rowId, Ue = C.columnId, Pe = C.value, mt = f.rowState[yt] !== void 0 ? f.rowState[yt] : N(ae[yt]), Xe = (mt == null || (de = mt.cellState) == null ? void 0 : de[Ue]) !== void 0 ? mt.cellState[Ue] : te((xe = ae[yt]) == null || (Ne = xe.cells) == null ? void 0 : Ne.find(function(ut) {
            return ut.column.id === Ue;
          }));
          return o({}, f, { rowState: o({}, f.rowState, (Je = {}, Je[yt] = o({}, mt, { cellState: o({}, mt.cellState || {}, (Ve = {}, Ve[Ue] = O(Pe, Xe), Ve)) }), Je)) });
        }
      }
      function ta(f) {
        var C = f.autoResetRowState, R = C === void 0 || C, P = f.data, V = f.dispatch, N = r.useCallback(function(ae, se) {
          return V({ type: s.setRowState, rowId: ae, value: se });
        }, [V]), j = r.useCallback(function(ae, se, Ae) {
          return V({ type: s.setCellState, rowId: ae, columnId: se, value: Ae });
        }, [V]), te = T(R);
        E(function() {
          te() && V({ type: s.resetRowState });
        }, [P]), Object.assign(f, { setRowState: N, setCellState: j });
      }
      function rl(f, C) {
        var R = C.instance, P = R.initialRowStateAccessor, V = P === void 0 ? Ko : P, N = R.initialCellStateAccessor, j = N === void 0 ? ea : N, te = R.state.rowState;
        f && (f.state = te[f.id] !== void 0 ? te[f.id] : V(f), f.setState = function(ae) {
          return R.setRowState(f.id, ae);
        }, f.cells.forEach(function(ae) {
          f.state.cellState || (f.state.cellState = {}), ae.state = f.state.cellState[ae.column.id] !== void 0 ? f.state.cellState[ae.column.id] : j(ae), ae.setState = function(se) {
            return R.setCellState(f.id, ae.column.id, se);
          };
        }));
      }
      eo.pluginName = "useRowState", s.resetColumnOrder = "resetColumnOrder", s.setColumnOrder = "setColumnOrder";
      var na = function(f) {
        f.stateReducers.push(ra), f.visibleColumnsDeps.push(function(C, R) {
          var P = R.instance;
          return [].concat(C, [P.state.columnOrder]);
        }), f.visibleColumns.push(ia), f.useInstance.push(il);
      };
      function ra(f, C, R, P) {
        return C.type === s.init ? o({ columnOrder: [] }, f) : C.type === s.resetColumnOrder ? o({}, f, { columnOrder: P.initialState.columnOrder || [] }) : C.type === s.setColumnOrder ? o({}, f, { columnOrder: O(C.columnOrder, f.columnOrder) }) : void 0;
      }
      function ia(f, C) {
        var R = C.instance.state.columnOrder;
        if (!R || !R.length) return f;
        for (var P = [].concat(R), V = [].concat(f), N = [], j = function() {
          var te = P.shift(), ae = V.findIndex(function(se) {
            return se.id === te;
          });
          ae > -1 && N.push(V.splice(ae, 1)[0]);
        }; V.length && P.length; ) j();
        return [].concat(N, V);
      }
      function il(f) {
        var C = f.dispatch;
        f.setColumnOrder = r.useCallback(function(R) {
          return C({ type: s.setColumnOrder, columnOrder: R });
        }, [C]);
      }
      na.pluginName = "useColumnOrder", m.canResize = !0, s.columnStartResizing = "columnStartResizing", s.columnResizing = "columnResizing", s.columnDoneResizing = "columnDoneResizing", s.resetResize = "resetResize";
      var oa = function(f) {
        f.getResizerProps = [ol], f.getHeaderProps.push({ style: { position: "relative" } }), f.stateReducers.push(al), f.useInstance.push(ll), f.useInstanceBeforeDimensions.push(sl);
      }, ol = function(f, C) {
        var R = C.instance, P = C.header, V = R.dispatch, N = function(j, te) {
          var ae = !1;
          if (j.type === "touchstart") {
            if (j.touches && j.touches.length > 1) return;
            ae = !0;
          }
          var se, Ae, Ce = function(Ue) {
            var Pe = [];
            return function mt(Xe) {
              Xe.columns && Xe.columns.length && Xe.columns.map(mt), Pe.push(Xe);
            }(Ue), Pe;
          }(te).map(function(Ue) {
            return [Ue.id, Ue.totalWidth];
          }), Se = ae ? Math.round(j.touches[0].clientX) : j.clientX, de = function() {
            window.cancelAnimationFrame(se), se = null, V({ type: s.columnDoneResizing });
          }, xe = function() {
            window.cancelAnimationFrame(se), se = null, V({ type: s.columnResizing, clientX: Ae });
          }, Ne = function(Ue) {
            Ae = Ue, se || (se = window.requestAnimationFrame(xe));
          }, Ve = { mouse: { moveEvent: "mousemove", moveHandler: function(Ue) {
            return Ne(Ue.clientX);
          }, upEvent: "mouseup", upHandler: function(Ue) {
            document.removeEventListener("mousemove", Ve.mouse.moveHandler), document.removeEventListener("mouseup", Ve.mouse.upHandler), de();
          } }, touch: { moveEvent: "touchmove", moveHandler: function(Ue) {
            return Ue.cancelable && (Ue.preventDefault(), Ue.stopPropagation()), Ne(Ue.touches[0].clientX), !1;
          }, upEvent: "touchend", upHandler: function(Ue) {
            document.removeEventListener(Ve.touch.moveEvent, Ve.touch.moveHandler), document.removeEventListener(Ve.touch.upEvent, Ve.touch.moveHandler), de();
          } } }, Je = ae ? Ve.touch : Ve.mouse, yt = !!function() {
            if (typeof Z == "boolean") return Z;
            var Ue = !1;
            try {
              var Pe = { get passive() {
                return Ue = !0, !1;
              } };
              window.addEventListener("test", null, Pe), window.removeEventListener("test", null, Pe);
            } catch {
              Ue = !1;
            }
            return Z = Ue;
          }() && { passive: !1 };
          document.addEventListener(Je.moveEvent, Je.moveHandler, yt), document.addEventListener(Je.upEvent, Je.upHandler, yt), V({ type: s.columnStartResizing, columnId: te.id, columnWidth: te.totalWidth, headerIdWidths: Ce, clientX: Se });
        };
        return [f, { onMouseDown: function(j) {
          return j.persist() || N(j, P);
        }, onTouchStart: function(j) {
          return j.persist() || N(j, P);
        }, style: { cursor: "col-resize" }, draggable: !1, role: "separator" }];
      };
      function al(f, C) {
        if (C.type === s.init) return o({ columnResizing: { columnWidths: {} } }, f);
        if (C.type === s.resetResize) return o({}, f, { columnResizing: { columnWidths: {} } });
        if (C.type === s.columnStartResizing) {
          var R = C.clientX, P = C.columnId, V = C.columnWidth, N = C.headerIdWidths;
          return o({}, f, { columnResizing: o({}, f.columnResizing, { startX: R, headerIdWidths: N, columnWidth: V, isResizingColumn: P }) });
        }
        if (C.type === s.columnResizing) {
          var j = C.clientX, te = f.columnResizing, ae = te.startX, se = te.columnWidth, Ae = te.headerIdWidths, Ce = (j - ae) / se, Se = {};
          return (Ae === void 0 ? [] : Ae).forEach(function(de) {
            var xe = de[0], Ne = de[1];
            Se[xe] = Math.max(Ne + Ne * Ce, 0);
          }), o({}, f, { columnResizing: o({}, f.columnResizing, { columnWidths: o({}, f.columnResizing.columnWidths, {}, Se) }) });
        }
        return C.type === s.columnDoneResizing ? o({}, f, { columnResizing: o({}, f.columnResizing, { startX: null, isResizingColumn: null }) }) : void 0;
      }
      oa.pluginName = "useResizeColumns";
      var sl = function(f) {
        var C = f.flatHeaders, R = f.disableResizing, P = f.getHooks, V = f.state.columnResizing, N = T(f);
        C.forEach(function(j) {
          var te = Q(j.disableResizing !== !0 && void 0, R !== !0 && void 0, !0);
          j.canResize = te, j.width = V.columnWidths[j.id] || j.originalWidth || j.width, j.isResizing = V.isResizingColumn === j.id, te && (j.getResizerProps = x(P().getResizerProps, { instance: N(), header: j }));
        });
      };
      function ll(f) {
        var C = f.plugins, R = f.dispatch, P = f.autoResetResize, V = P === void 0 || P, N = f.columns;
        I(C, ["useAbsoluteLayout"], "useResizeColumns");
        var j = T(V);
        E(function() {
          j() && R({ type: s.resetResize });
        }, [N]);
        var te = r.useCallback(function() {
          return R({ type: s.resetResize });
        }, [R]);
        Object.assign(f, { resetResizing: te });
      }
      var to = { position: "absolute", top: 0 }, aa = function(f) {
        f.getTableBodyProps.push(Ii), f.getRowProps.push(Ii), f.getHeaderGroupProps.push(Ii), f.getFooterGroupProps.push(Ii), f.getHeaderProps.push(function(C, R) {
          var P = R.column;
          return [C, { style: o({}, to, { left: P.totalLeft + "px", width: P.totalWidth + "px" }) }];
        }), f.getCellProps.push(function(C, R) {
          var P = R.cell;
          return [C, { style: o({}, to, { left: P.column.totalLeft + "px", width: P.column.totalWidth + "px" }) }];
        }), f.getFooterProps.push(function(C, R) {
          var P = R.column;
          return [C, { style: o({}, to, { left: P.totalLeft + "px", width: P.totalWidth + "px" }) }];
        });
      };
      aa.pluginName = "useAbsoluteLayout";
      var Ii = function(f, C) {
        return [f, { style: { position: "relative", width: C.instance.totalColumnsWidth + "px" } }];
      }, no = { display: "inline-block", boxSizing: "border-box" }, ro = function(f, C) {
        return [f, { style: { display: "flex", width: C.instance.totalColumnsWidth + "px" } }];
      }, sa = function(f) {
        f.getRowProps.push(ro), f.getHeaderGroupProps.push(ro), f.getFooterGroupProps.push(ro), f.getHeaderProps.push(function(C, R) {
          var P = R.column;
          return [C, { style: o({}, no, { width: P.totalWidth + "px" }) }];
        }), f.getCellProps.push(function(C, R) {
          var P = R.cell;
          return [C, { style: o({}, no, { width: P.column.totalWidth + "px" }) }];
        }), f.getFooterProps.push(function(C, R) {
          var P = R.column;
          return [C, { style: o({}, no, { width: P.totalWidth + "px" }) }];
        });
      };
      function io(f) {
        f.getTableProps.push(ul), f.getRowProps.push(oo), f.getHeaderGroupProps.push(oo), f.getFooterGroupProps.push(oo), f.getHeaderProps.push(cl), f.getCellProps.push(dl), f.getFooterProps.push(fl);
      }
      sa.pluginName = "useBlockLayout", io.pluginName = "useFlexLayout";
      var ul = function(f, C) {
        return [f, { style: { minWidth: C.instance.totalColumnsMinWidth + "px" } }];
      }, oo = function(f, C) {
        return [f, { style: { display: "flex", flex: "1 0 auto", minWidth: C.instance.totalColumnsMinWidth + "px" } }];
      }, cl = function(f, C) {
        var R = C.column;
        return [f, { style: { boxSizing: "border-box", flex: R.totalFlexWidth ? R.totalFlexWidth + " 0 auto" : void 0, minWidth: R.totalMinWidth + "px", width: R.totalWidth + "px" } }];
      }, dl = function(f, C) {
        var R = C.cell;
        return [f, { style: { boxSizing: "border-box", flex: R.column.totalFlexWidth + " 0 auto", minWidth: R.column.totalMinWidth + "px", width: R.column.totalWidth + "px" } }];
      }, fl = function(f, C) {
        var R = C.column;
        return [f, { style: { boxSizing: "border-box", flex: R.totalFlexWidth ? R.totalFlexWidth + " 0 auto" : void 0, minWidth: R.totalMinWidth + "px", width: R.totalWidth + "px" } }];
      };
      function la(f) {
        f.stateReducers.push(fa), f.getTableProps.push(ua), f.getHeaderProps.push(ca), f.getRowProps.push(da);
      }
      s.columnStartResizing = "columnStartResizing", s.columnResizing = "columnResizing", s.columnDoneResizing = "columnDoneResizing", s.resetResize = "resetResize", la.pluginName = "useGridLayout";
      var ua = function(f, C) {
        var R = C.instance;
        return [f, { style: { display: "grid", gridTemplateColumns: R.visibleColumns.map(function(P) {
          var V;
          return R.state.gridLayout.columnWidths[P.id] ? R.state.gridLayout.columnWidths[P.id] + "px" : (V = R.state.columnResizing) != null && V.isResizingColumn ? R.state.gridLayout.startWidths[P.id] + "px" : typeof P.width == "number" ? P.width + "px" : P.width;
        }).join(" ") } }];
      }, ca = function(f, C) {
        var R = C.column;
        return [f, { id: "header-cell-" + R.id, style: { position: "sticky", gridColumn: "span " + R.totalVisibleHeaderCount } }];
      }, da = function(f, C) {
        var R = C.row;
        return R.isExpanded ? [f, { style: { gridColumn: "1 / " + (R.cells.length + 1) } }] : [f, {}];
      };
      function fa(f, C, R, P) {
        if (C.type === s.init) return o({ gridLayout: { columnWidths: {} } }, f);
        if (C.type === s.resetResize) return o({}, f, { gridLayout: { columnWidths: {} } });
        if (C.type === s.columnStartResizing) {
          var V = C.columnId, N = C.headerIdWidths, j = ao(V);
          if (j !== void 0) {
            var te = P.visibleColumns.reduce(function(Pe, mt) {
              var Xe;
              return o({}, Pe, ((Xe = {})[mt.id] = ao(mt.id), Xe));
            }, {}), ae = P.visibleColumns.reduce(function(Pe, mt) {
              var Xe;
              return o({}, Pe, ((Xe = {})[mt.id] = mt.minWidth, Xe));
            }, {}), se = P.visibleColumns.reduce(function(Pe, mt) {
              var Xe;
              return o({}, Pe, ((Xe = {})[mt.id] = mt.maxWidth, Xe));
            }, {}), Ae = N.map(function(Pe) {
              var mt = Pe[0];
              return [mt, ao(mt)];
            });
            return o({}, f, { gridLayout: o({}, f.gridLayout, { startWidths: te, minWidths: ae, maxWidths: se, headerIdGridWidths: Ae, columnWidth: j }) });
          }
          return f;
        }
        if (C.type === s.columnResizing) {
          var Ce = C.clientX, Se = f.columnResizing.startX, de = f.gridLayout, xe = de.columnWidth, Ne = de.minWidths, Ve = de.maxWidths, Je = de.headerIdGridWidths, yt = (Ce - Se) / xe, Ue = {};
          return (Je === void 0 ? [] : Je).forEach(function(Pe) {
            var mt = Pe[0], Xe = Pe[1];
            Ue[mt] = Math.min(Math.max(Ne[mt], Xe + Xe * yt), Ve[mt]);
          }), o({}, f, { gridLayout: o({}, f.gridLayout, { columnWidths: o({}, f.gridLayout.columnWidths, {}, Ue) }) });
        }
        return C.type === s.columnDoneResizing ? o({}, f, { gridLayout: o({}, f.gridLayout, { startWidths: {}, minWidths: {}, maxWidths: {} }) }) : void 0;
      }
      function ao(f) {
        var C, R = (C = document.getElementById("header-cell-" + f)) == null ? void 0 : C.offsetWidth;
        if (R !== void 0) return R;
      }
      n._UNSTABLE_usePivotColumns = Qi, n.actions = s, n.defaultColumn = m, n.defaultGroupByFn = Gt, n.defaultOrderByFn = yn, n.defaultRenderer = d, n.emptyRenderer = c, n.ensurePluginOrder = I, n.flexRender = X, n.functionalUpdate = O, n.loopHooks = b, n.makePropGetter = x, n.makeRenderer = B, n.reduceHooks = v, n.safeUseLayoutEffect = D, n.useAbsoluteLayout = aa, n.useAsyncDebounce = function(f, C) {
        C === void 0 && (C = 0);
        var R = r.useRef({}), P = T(f), V = T(C);
        return r.useCallback(function() {
          var N = a(regeneratorRuntime.mark(function j() {
            var te, ae, se, Ae = arguments;
            return regeneratorRuntime.wrap(function(Ce) {
              for (; ; ) switch (Ce.prev = Ce.next) {
                case 0:
                  for (te = Ae.length, ae = new Array(te), se = 0; se < te; se++) ae[se] = Ae[se];
                  return R.current.promise || (R.current.promise = new Promise(function(Se, de) {
                    R.current.resolve = Se, R.current.reject = de;
                  })), R.current.timeout && clearTimeout(R.current.timeout), R.current.timeout = setTimeout(a(regeneratorRuntime.mark(function Se() {
                    return regeneratorRuntime.wrap(function(de) {
                      for (; ; ) switch (de.prev = de.next) {
                        case 0:
                          return delete R.current.timeout, de.prev = 1, de.t0 = R.current, de.next = 5, P().apply(void 0, ae);
                        case 5:
                          de.t1 = de.sent, de.t0.resolve.call(de.t0, de.t1), de.next = 12;
                          break;
                        case 9:
                          de.prev = 9, de.t2 = de.catch(1), R.current.reject(de.t2);
                        case 12:
                          return de.prev = 12, delete R.current.promise, de.finish(12);
                        case 15:
                        case "end":
                          return de.stop();
                      }
                    }, Se, null, [[1, 9, 12, 15]]);
                  })), V()), Ce.abrupt("return", R.current.promise);
                case 5:
                case "end":
                  return Ce.stop();
              }
            }, j);
          }));
          return function() {
            return N.apply(this, arguments);
          };
        }(), [P, V]);
      }, n.useBlockLayout = sa, n.useColumnOrder = na, n.useExpanded = Ze, n.useFilters = bi, n.useFlexLayout = io, n.useGetLatest = T, n.useGlobalFilter = Dr, n.useGridLayout = la, n.useGroupBy = ni, n.useMountedLayoutEffect = E, n.usePagination = Ir, n.useResizeColumns = oa, n.useRowSelect = Uo, n.useRowState = eo, n.useSortBy = rn, n.useTable = function(f) {
        for (var C = arguments.length, R = new Array(C > 1 ? C - 1 : 0), P = 1; P < C; P++) R[P - 1] = arguments[P];
        f = Ot(f), R = [J].concat(R);
        var V = r.useRef({}), N = T(V.current);
        Object.assign(N(), o({}, f, { plugins: R, hooks: Te() })), R.filter(Boolean).forEach(function(k) {
          k(N().hooks);
        });
        var j = T(N().hooks);
        N().getHooks = j, delete N().hooks, Object.assign(N(), v(j().useOptions, Ot(f)));
        var te = N(), ae = te.data, se = te.columns, Ae = te.initialState, Ce = te.defaultColumn, Se = te.getSubRows, de = te.getRowId, xe = te.stateReducer, Ne = te.useControlledState, Ve = T(xe), Je = r.useCallback(function(k, z) {
          if (!z.type) throw console.info({ action: z }), new Error("Unknown Action 👆");
          return [].concat(j().stateReducers, Array.isArray(Ve()) ? Ve() : [Ve()]).reduce(function(q, ne) {
            return ne(q, z, k, N()) || q;
          }, k);
        }, [j, Ve, N]), yt = r.useReducer(Je, void 0, function() {
          return Je(Ae, { type: s.init });
        }), Ue = yt[0], Pe = yt[1], mt = v([].concat(j().useControlledState, [Ne]), Ue, { instance: N() });
        Object.assign(N(), { state: mt, dispatch: Pe });
        var Xe = r.useMemo(function() {
          return U(v(j().columns, se, { instance: N() }));
        }, [j, N, se].concat(v(j().columnsDeps, [], { instance: N() })));
        N().columns = Xe;
        var ut = r.useMemo(function() {
          return v(j().allColumns, K(Xe), { instance: N() }).map(Fe);
        }, [Xe, j, N].concat(v(j().allColumnsDeps, [], { instance: N() })));
        N().allColumns = ut;
        var Tt = r.useMemo(function() {
          for (var k = [], z = [], q = {}, ne = [].concat(ut); ne.length; ) {
            var le = ne.shift();
            we({ data: ae, rows: k, flatRows: z, rowsById: q, column: le, getRowId: de, getSubRows: Se, accessValueHooks: j().accessValue, getInstance: N });
          }
          return [k, z, q];
        }, [ut, ae, de, Se, j, N]), nt = Tt[0], ot = Tt[1], _t = Tt[2];
        Object.assign(N(), { rows: nt, initialRows: [].concat(nt), flatRows: ot, rowsById: _t }), b(j().useInstanceAfterData, N());
        var gt = r.useMemo(function() {
          return v(j().visibleColumns, ut, { instance: N() }).map(function(k) {
            return oe(k, Ce);
          });
        }, [j, ut, N, Ce].concat(v(j().visibleColumnsDeps, [], { instance: N() })));
        ut = r.useMemo(function() {
          var k = [].concat(gt);
          return ut.forEach(function(z) {
            k.find(function(q) {
              return q.id === z.id;
            }) || k.push(z);
          }), k;
        }, [ut, gt]), N().allColumns = ut;
        var Ft = r.useMemo(function() {
          return v(j().headerGroups, ce(gt, Ce), N());
        }, [j, gt, Ce, N].concat(v(j().headerGroupsDeps, [], { instance: N() })));
        N().headerGroups = Ft;
        var p = r.useMemo(function() {
          return Ft.length ? Ft[0].headers : [];
        }, [Ft]);
        N().headers = p, N().flatHeaders = Ft.reduce(function(k, z) {
          return [].concat(k, z.headers);
        }, []), b(j().useInstanceBeforeDimensions, N());
        var g = gt.filter(function(k) {
          return k.isVisible;
        }).map(function(k) {
          return k.id;
        }).sort().join("_");
        gt = r.useMemo(function() {
          return gt.filter(function(k) {
            return k.isVisible;
          });
        }, [gt, g]), N().visibleColumns = gt;
        var S = ee(p), y = S[0], F = S[1], M = S[2];
        return N().totalColumnsMinWidth = y, N().totalColumnsWidth = F, N().totalColumnsMaxWidth = M, b(j().useInstance, N()), [].concat(N().flatHeaders, N().allColumns).forEach(function(k) {
          k.render = B(N(), k), k.getHeaderProps = x(j().getHeaderProps, { instance: N(), column: k }), k.getFooterProps = x(j().getFooterProps, { instance: N(), column: k });
        }), N().headerGroups = r.useMemo(function() {
          return Ft.filter(function(k, z) {
            return k.headers = k.headers.filter(function(q) {
              return q.headers ? function ne(le) {
                return le.filter(function(Oe) {
                  return Oe.headers ? ne(Oe.headers) : Oe.isVisible;
                }).length;
              }(q.headers) : q.isVisible;
            }), !!k.headers.length && (k.getHeaderGroupProps = x(j().getHeaderGroupProps, { instance: N(), headerGroup: k, index: z }), k.getFooterGroupProps = x(j().getFooterGroupProps, { instance: N(), headerGroup: k, index: z }), !0);
          });
        }, [Ft, N, j]), N().footerGroups = [].concat(N().headerGroups).reverse(), N().prepareRow = r.useCallback(function(k) {
          k.getRowProps = x(j().getRowProps, { instance: N(), row: k }), k.allCells = ut.map(function(z) {
            var q = k.values[z.id], ne = { column: z, row: k, value: q };
            return ne.getCellProps = x(j().getCellProps, { instance: N(), cell: ne }), ne.render = B(N(), z, { row: k, cell: ne, value: q }), ne;
          }), k.cells = gt.map(function(z) {
            return k.allCells.find(function(q) {
              return q.column.id === z.id;
            });
          }), b(j().prepareRow, k, { instance: N() });
        }, [j, N, ut, gt]), N().getTableProps = x(j().getTableProps, { instance: N() }), N().getTableBodyProps = x(j().getTableBodyProps, { instance: N() }), b(j().useFinalInstance, N()), N();
      }, Object.defineProperty(n, "__esModule", { value: !0 });
    });
  }(mo, mo.exports)), mo.exports;
}
var vo = { exports: {} }, sw = vo.exports, Yd;
function lw() {
  return Yd || (Yd = 1, function(e, t) {
    (function(n, r) {
      r(t, cn);
    })(sw, function(n, r) {
      r = r && Object.prototype.hasOwnProperty.call(r, "default") ? r.default : r;
      function i(p, g, S, y, F, M, k) {
        try {
          var z = p[M](k), q = z.value;
        } catch (ne) {
          S(ne);
          return;
        }
        z.done ? g(q) : Promise.resolve(q).then(y, F);
      }
      function a(p) {
        return function() {
          var g = this, S = arguments;
          return new Promise(function(y, F) {
            var M = p.apply(g, S);
            function k(q) {
              i(M, y, F, k, z, "next", q);
            }
            function z(q) {
              i(M, y, F, k, z, "throw", q);
            }
            k(void 0);
          });
        };
      }
      function o() {
        return o = Object.assign || function(p) {
          for (var g = 1; g < arguments.length; g++) {
            var S = arguments[g];
            for (var y in S)
              Object.prototype.hasOwnProperty.call(S, y) && (p[y] = S[y]);
          }
          return p;
        }, o.apply(this, arguments);
      }
      function l(p, g) {
        if (p == null) return {};
        var S = {}, y = Object.keys(p), F, M;
        for (M = 0; M < y.length; M++)
          F = y[M], !(g.indexOf(F) >= 0) && (S[F] = p[F]);
        return S;
      }
      function u(p, g) {
        if (typeof p != "object" || p === null) return p;
        var S = p[Symbol.toPrimitive];
        if (S !== void 0) {
          var y = S.call(p, g);
          if (typeof y != "object") return y;
          throw new TypeError("@@toPrimitive must return a primitive value.");
        }
        return String(p);
      }
      function s(p) {
        var g = u(p, "string");
        return typeof g == "symbol" ? g : String(g);
      }
      var d = "Renderer Error ☝️", c = {
        init: "init"
      }, m = function(g) {
        var S = g.value, y = S === void 0 ? "" : S;
        return y;
      }, h = function() {
        return r.createElement(r.Fragment, null, " ");
      }, x = {
        Cell: m,
        width: 150,
        minWidth: 0,
        maxWidth: Number.MAX_SAFE_INTEGER
      };
      function v() {
        for (var p = arguments.length, g = new Array(p), S = 0; S < p; S++)
          g[S] = arguments[S];
        return g.reduce(function(y, F) {
          var M = F.style, k = F.className, z = l(F, ["style", "className"]);
          return y = o({}, y, {}, z), M && (y.style = y.style ? o({}, y.style || {}, {}, M || {}) : M), k && (y.className = y.className ? y.className + " " + k : k), y.className === "" && delete y.className, y;
        }, {});
      }
      function b(p, g, S) {
        return typeof g == "function" ? b({}, g(p, S)) : Array.isArray(g) ? v.apply(void 0, [p].concat(g)) : v(p, g);
      }
      var I = function(g, S) {
        return S === void 0 && (S = {}), function(y) {
          return y === void 0 && (y = {}), [].concat(g, [y]).reduce(function(F, M) {
            return b(F, M, o({}, S, {
              userProps: y
            }));
          }, {});
        };
      }, O = function(g, S, y, F) {
        return y === void 0 && (y = {}), g.reduce(function(M, k) {
          var z = k(M, y);
          if (!F && typeof z > "u")
            throw console.info(k), new Error("React Table: A reducer hook ☝️ just returned undefined! This is not allowed.");
          return z;
        }, S);
      }, T = function(g, S, y) {
        return y === void 0 && (y = {}), g.forEach(function(F) {
          var M = F(S, y);
          if (typeof M < "u")
            throw console.info(F, M), new Error("React Table: A loop-type hook ☝️ just returned a value! This is not allowed.");
        });
      };
      function D(p, g, S, y) {
        if (y)
          throw new Error('Defining plugins in the "after" section of ensurePluginOrder is no longer supported (see plugin ' + S + ")");
        var F = p.findIndex(function(M) {
          return M.pluginName === S;
        });
        if (F === -1)
          throw new Error('The plugin "' + S + `" was not found in the plugin list!
This usually means you need to need to name your plugin hook by setting the 'pluginName' property of the hook function, eg:

  ` + S + ".pluginName = '" + S + `'
`);
        g.forEach(function(M) {
          var k = p.findIndex(function(z) {
            return z.pluginName === M;
          });
          if (k > -1 && k > F)
            throw new Error("React Table: The " + S + " plugin hook must be placed after the " + M + " plugin hook!");
        });
      }
      function E(p, g) {
        return typeof p == "function" ? p(g) : p;
      }
      function B(p) {
        var g = r.useRef();
        return g.current = p, r.useCallback(function() {
          return g.current;
        }, []);
      }
      var X = typeof document < "u" ? r.useLayoutEffect : r.useEffect;
      function U(p, g) {
        var S = r.useRef(!1);
        X(function() {
          S.current && p(), S.current = !0;
        }, g);
      }
      function K(p, g) {
        g === void 0 && (g = 0);
        var S = r.useRef({}), y = B(p), F = B(g);
        return r.useCallback(
          /* @__PURE__ */ function() {
            var M = a(
              /* @__PURE__ */ regeneratorRuntime.mark(function k() {
                var z, q, ne, le = arguments;
                return regeneratorRuntime.wrap(function(me) {
                  for (; ; )
                    switch (me.prev = me.next) {
                      case 0:
                        for (z = le.length, q = new Array(z), ne = 0; ne < z; ne++)
                          q[ne] = le[ne];
                        return S.current.promise || (S.current.promise = new Promise(function(Ie, Be) {
                          S.current.resolve = Ie, S.current.reject = Be;
                        })), S.current.timeout && clearTimeout(S.current.timeout), S.current.timeout = setTimeout(
                          /* @__PURE__ */ a(
                            /* @__PURE__ */ regeneratorRuntime.mark(function Ie() {
                              return regeneratorRuntime.wrap(function(pe) {
                                for (; ; )
                                  switch (pe.prev = pe.next) {
                                    case 0:
                                      return delete S.current.timeout, pe.prev = 1, pe.t0 = S.current, pe.next = 5, y().apply(void 0, q);
                                    case 5:
                                      pe.t1 = pe.sent, pe.t0.resolve.call(pe.t0, pe.t1), pe.next = 12;
                                      break;
                                    case 9:
                                      pe.prev = 9, pe.t2 = pe.catch(1), S.current.reject(pe.t2);
                                    case 12:
                                      return pe.prev = 12, delete S.current.promise, pe.finish(12);
                                    case 15:
                                    case "end":
                                      return pe.stop();
                                  }
                              }, Ie, null, [[1, 9, 12, 15]]);
                            })
                          ),
                          F()
                        ), me.abrupt("return", S.current.promise);
                      case 5:
                      case "end":
                        return me.stop();
                    }
                }, k);
              })
            );
            return function() {
              return M.apply(this, arguments);
            };
          }(),
          [y, F]
        );
      }
      function Fe(p, g, S) {
        return S === void 0 && (S = {}), function(y, F) {
          F === void 0 && (F = {});
          var M = typeof y == "string" ? g[y] : y;
          if (typeof M > "u")
            throw console.info(g), new Error(d);
          return oe(M, o({}, p, {
            column: g
          }, S, {}, F));
        };
      }
      function oe(p, g) {
        return ce(p) ? r.createElement(p, g) : p;
      }
      function ce(p) {
        return ye(p) || typeof p == "function" || Q(p);
      }
      function ye(p) {
        return typeof p == "function" && function() {
          var g = Object.getPrototypeOf(p);
          return g.prototype && g.prototype.isReactComponent;
        }();
      }
      function Q(p) {
        return typeof p == "object" && typeof p.$$typeof == "symbol" && ["react.memo", "react.forward_ref"].includes(p.$$typeof.description);
      }
      function ue(p, g, S) {
        return S === void 0 && (S = 0), p.map(function(y) {
          return y = o({}, y, {
            parent: g,
            depth: S
          }), We(y), y.columns && (y.columns = ue(y.columns, y, S + 1)), y;
        });
      }
      function Ee(p) {
        return H(p, "columns");
      }
      function We(p) {
        var g = p.id, S = p.accessor, y = p.Header;
        if (typeof S == "string") {
          g = g || S;
          var F = S.split(".");
          S = function(k) {
            return Z(k, F);
          };
        }
        if (!g && typeof y == "string" && y && (g = y), !g && p.columns)
          throw console.error(p), new Error('A column ID (or unique "Header" value) is required!');
        if (!g)
          throw console.error(p), new Error("A column ID (or string accessor) is required!");
        return Object.assign(p, {
          id: g,
          accessor: S
        }), p;
      }
      function $e(p, g) {
        if (!g)
          throw new Error();
        return Object.assign(p, o({
          // Make sure there is a fallback header, just in case
          Header: h,
          Footer: h
        }, x, {}, g, {}, p)), Object.assign(p, {
          originalWidth: p.width
        }), p;
      }
      function ht(p, g, S) {
        S === void 0 && (S = function() {
          return {};
        });
        for (var y = [], F = p, M = 0, k = function() {
          return M++;
        }, z = function() {
          var ne = {
            headers: []
          }, le = [], Oe = F.some(function(me) {
            return me.parent;
          });
          F.forEach(function(me) {
            var Ie = [].concat(le).reverse()[0], Be;
            if (Oe) {
              if (me.parent)
                Be = o({}, me.parent, {
                  originalId: me.parent.id,
                  id: me.parent.id + "_" + k(),
                  headers: [me]
                }, S(me));
              else {
                var pe = me.id + "_placeholder";
                Be = $e(o({
                  originalId: pe,
                  id: me.id + "_placeholder_" + k(),
                  placeholderOf: me,
                  headers: [me]
                }, S(me)), g);
              }
              Ie && Ie.originalId === Be.originalId ? Ie.headers.push(me) : le.push(Be);
            }
            ne.headers.push(me);
          }), y.push(ne), F = le;
        }; F.length; )
          z();
        return y.reverse();
      }
      var G = /* @__PURE__ */ new Map();
      function Z(p, g, S) {
        if (!g)
          return p;
        var y = typeof g == "function" ? g : JSON.stringify(g), F = G.get(y) || function() {
          var k = J(g);
          return G.set(y, k), k;
        }(), M;
        try {
          M = F.reduce(function(k, z) {
            return k[z];
          }, p);
        } catch {
        }
        return typeof M < "u" ? M : S;
      }
      function A() {
        for (var p = arguments.length, g = new Array(p), S = 0; S < p; S++)
          g[S] = arguments[S];
        for (var y = 0; y < g.length; y += 1)
          if (typeof g[y] < "u")
            return g[y];
      }
      function w(p) {
        if (typeof p == "function")
          return p;
      }
      function H(p, g) {
        var S = [], y = function F(M) {
          M.forEach(function(k) {
            k[g] ? F(k[g]) : S.push(k);
          });
        };
        return y(p), S;
      }
      function $(p, g) {
        var S = g.manualExpandedKey, y = g.expanded, F = g.expandSubRows, M = F === void 0 ? !0 : F, k = [], z = function q(ne, le) {
          le === void 0 && (le = !0), ne.isExpanded = ne.original && ne.original[S] || y[ne.id], ne.canExpand = ne.subRows && !!ne.subRows.length, le && k.push(ne), ne.subRows && ne.subRows.length && ne.isExpanded && ne.subRows.forEach(function(Oe) {
            return q(Oe, M);
          });
        };
        return p.forEach(function(q) {
          return z(q);
        }), k;
      }
      function _(p, g, S) {
        return w(p) || g[p] || S[p] || S.text;
      }
      function re(p, g, S) {
        return p ? p(g, S) : typeof g > "u";
      }
      function Y() {
        throw new Error("React-Table: You have not called prepareRow(row) one or more rows you are attempting to render.");
      }
      var fe = null;
      function ge() {
        if (typeof fe == "boolean") return fe;
        var p = !1;
        try {
          var g = {
            get passive() {
              return p = !0, !1;
            }
          };
          window.addEventListener("test", null, g), window.removeEventListener("test", null, g);
        } catch {
          p = !1;
        }
        return fe = p, fe;
      }
      var ve = /\[/g, Te = /\]/g;
      function J(p) {
        return ft(p).map(function(g) {
          return String(g).replace(".", "_");
        }).join(".").replace(ve, ".").replace(Te, "").split(".");
      }
      function ft(p, g) {
        if (g === void 0 && (g = []), !Array.isArray(p))
          g.push(p);
        else
          for (var S = 0; S < p.length; S += 1)
            ft(p[S], g);
        return g;
      }
      var je = function(g) {
        return o({
          role: "table"
        }, g);
      }, et = function(g) {
        return o({
          role: "rowgroup"
        }, g);
      }, pt = function(g, S) {
        var y = S.column;
        return o({
          key: "header_" + y.id,
          colSpan: y.totalVisibleHeaderCount,
          role: "columnheader"
        }, g);
      }, Yt = function(g, S) {
        var y = S.column;
        return o({
          key: "footer_" + y.id,
          colSpan: y.totalVisibleHeaderCount
        }, g);
      }, Cn = function(g, S) {
        var y = S.index;
        return o({
          key: "headerGroup_" + y,
          role: "row"
        }, g);
      }, kt = function(g, S) {
        var y = S.index;
        return o({
          key: "footerGroup_" + y
        }, g);
      }, gn = function(g, S) {
        var y = S.row;
        return o({
          key: "row_" + y.id,
          role: "row"
        }, g);
      }, on = function(g, S) {
        var y = S.cell;
        return o({
          key: "cell_" + y.row.id + "_" + y.column.id,
          role: "cell"
        }, g);
      };
      function an() {
        return {
          useOptions: [],
          stateReducers: [],
          useControlledState: [],
          columns: [],
          columnsDeps: [],
          allColumns: [],
          allColumnsDeps: [],
          accessValue: [],
          materializedColumns: [],
          materializedColumnsDeps: [],
          useInstanceAfterData: [],
          visibleColumns: [],
          visibleColumnsDeps: [],
          headerGroups: [],
          headerGroupsDeps: [],
          useInstanceBeforeDimensions: [],
          useInstance: [],
          prepareRow: [],
          getTableProps: [je],
          getTableBodyProps: [et],
          getHeaderGroupProps: [Cn],
          getFooterGroupProps: [kt],
          getHeaderProps: [pt],
          getFooterProps: [Yt],
          getRowProps: [gn],
          getCellProps: [on],
          useFinalInstance: []
        };
      }
      c.resetHiddenColumns = "resetHiddenColumns", c.toggleHideColumn = "toggleHideColumn", c.setHiddenColumns = "setHiddenColumns", c.toggleHideAllColumns = "toggleHideAllColumns";
      var Ke = function(g) {
        g.getToggleHiddenProps = [Ot], g.getToggleHideAllColumnsProps = [ee], g.stateReducers.push(we), g.useInstanceBeforeDimensions.push(Ze), g.headerGroupsDeps.push(function(S, y) {
          var F = y.instance;
          return [].concat(S, [F.state.hiddenColumns]);
        }), g.useInstance.push(Rt);
      };
      Ke.pluginName = "useColumnVisibility";
      var Ot = function(g, S) {
        var y = S.column;
        return [g, {
          onChange: function(M) {
            y.toggleHidden(!M.target.checked);
          },
          style: {
            cursor: "pointer"
          },
          checked: y.isVisible,
          title: "Toggle Column Visible"
        }];
      }, ee = function(g, S) {
        var y = S.instance;
        return [g, {
          onChange: function(M) {
            y.toggleHideAllColumns(!M.target.checked);
          },
          style: {
            cursor: "pointer"
          },
          checked: !y.allColumnsHidden && !y.state.hiddenColumns.length,
          title: "Toggle All Columns Hidden",
          indeterminate: !y.allColumnsHidden && y.state.hiddenColumns.length
        }];
      };
      function we(p, g, S, y) {
        if (g.type === c.init)
          return o({
            hiddenColumns: []
          }, p);
        if (g.type === c.resetHiddenColumns)
          return o({}, p, {
            hiddenColumns: y.initialState.hiddenColumns || []
          });
        if (g.type === c.toggleHideColumn) {
          var F = typeof g.value < "u" ? g.value : !p.hiddenColumns.includes(g.columnId), M = F ? [].concat(p.hiddenColumns, [g.columnId]) : p.hiddenColumns.filter(function(z) {
            return z !== g.columnId;
          });
          return o({}, p, {
            hiddenColumns: M
          });
        }
        if (g.type === c.setHiddenColumns)
          return o({}, p, {
            hiddenColumns: E(g.value, p.hiddenColumns)
          });
        if (g.type === c.toggleHideAllColumns) {
          var k = typeof g.value < "u" ? g.value : !p.hiddenColumns.length;
          return o({}, p, {
            hiddenColumns: k ? y.allColumns.map(function(z) {
              return z.id;
            }) : []
          });
        }
      }
      function Ze(p) {
        var g = p.headers, S = p.state.hiddenColumns, y = r.useRef(!1);
        y.current;
        var F = function k(z, q) {
          z.isVisible = q && !S.includes(z.id);
          var ne = 0;
          return z.headers && z.headers.length ? z.headers.forEach(function(le) {
            return ne += k(le, z.isVisible);
          }) : ne = z.isVisible ? 1 : 0, z.totalVisibleHeaderCount = ne, ne;
        }, M = 0;
        g.forEach(function(k) {
          return M += F(k, !0);
        });
      }
      function Rt(p) {
        var g = p.columns, S = p.flatHeaders, y = p.dispatch, F = p.allColumns, M = p.getHooks, k = p.state.hiddenColumns, z = p.autoResetHiddenColumns, q = z === void 0 ? !0 : z, ne = B(p), le = F.length === k.length, Oe = r.useCallback(function(He, Qe) {
          return y({
            type: c.toggleHideColumn,
            columnId: He,
            value: Qe
          });
        }, [y]), me = r.useCallback(function(He) {
          return y({
            type: c.setHiddenColumns,
            value: He
          });
        }, [y]), Ie = r.useCallback(function(He) {
          return y({
            type: c.toggleHideAllColumns,
            value: He
          });
        }, [y]), Be = I(M().getToggleHideAllColumnsProps, {
          instance: ne()
        });
        S.forEach(function(He) {
          He.toggleHidden = function(Qe) {
            y({
              type: c.toggleHideColumn,
              columnId: He.id,
              value: Qe
            });
          }, He.getToggleHiddenProps = I(M().getToggleHiddenProps, {
            instance: ne(),
            column: He
          });
        });
        var pe = B(q);
        U(function() {
          pe() && y({
            type: c.resetHiddenColumns
          });
        }, [y, g]), Object.assign(p, {
          allColumnsHidden: le,
          toggleHideColumn: Oe,
          setHiddenColumns: me,
          toggleHideAllColumns: Ie,
          getToggleHideAllColumnsProps: Be
        });
      }
      var Bt = {}, Sn = {}, Wn = function(g, S, y) {
        return g;
      }, Gn = function(g, S) {
        return g.subRows || [];
      }, er = function(g, S, y) {
        return "" + (y ? [y.id, S].join(".") : S);
      }, tr = function(g) {
        return g;
      };
      function pn(p) {
        var g = p.initialState, S = g === void 0 ? Bt : g, y = p.defaultColumn, F = y === void 0 ? Sn : y, M = p.getSubRows, k = M === void 0 ? Gn : M, z = p.getRowId, q = z === void 0 ? er : z, ne = p.stateReducer, le = ne === void 0 ? Wn : ne, Oe = p.useControlledState, me = Oe === void 0 ? tr : Oe, Ie = l(p, ["initialState", "defaultColumn", "getSubRows", "getRowId", "stateReducer", "useControlledState"]);
        return o({}, Ie, {
          initialState: S,
          defaultColumn: F,
          getSubRows: k,
          getRowId: q,
          stateReducer: le,
          useControlledState: me
        });
      }
      var $n = function(g) {
        for (var S = arguments.length, y = new Array(S > 1 ? S - 1 : 0), F = 1; F < S; F++)
          y[F - 1] = arguments[F];
        g = pn(g), y = [Ke].concat(y);
        var M = r.useRef({}), k = B(M.current);
        Object.assign(k(), o({}, g, {
          plugins: y,
          hooks: an()
        })), y.filter(Boolean).forEach(function(rt) {
          rt(k().hooks);
        });
        var z = B(k().hooks);
        k().getHooks = z, delete k().hooks, Object.assign(k(), O(z().useOptions, pn(g)));
        var q = k(), ne = q.data, le = q.columns, Oe = q.initialState, me = q.defaultColumn, Ie = q.getSubRows, Be = q.getRowId, pe = q.stateReducer, He = q.useControlledState, Qe = B(pe), it = r.useCallback(function(rt, Kt) {
          if (!Kt.type)
            throw console.info({
              action: Kt
            }), new Error("Unknown Action 👆");
          return [].concat(z().stateReducers, Array.isArray(Qe()) ? Qe() : [Qe()]).reduce(function(mn, _n) {
            return _n(mn, Kt, rt, k()) || mn;
          }, rt);
        }, [z, Qe, k]), Me = r.useReducer(it, void 0, function() {
          return it(Oe, {
            type: c.init
          });
        }), vt = Me[0], It = Me[1], Le = O([].concat(z().useControlledState, [He]), vt, {
          instance: k()
        });
        Object.assign(k(), {
          state: Le,
          dispatch: It
        });
        var Ge = r.useMemo(function() {
          return ue(O(z().columns, le, {
            instance: k()
          }));
        }, [z, k, le].concat(O(z().columnsDeps, [], {
          instance: k()
        })));
        k().columns = Ge;
        var De = r.useMemo(function() {
          return O(z().allColumns, Ee(Ge), {
            instance: k()
          }).map(We);
        }, [Ge, z, k].concat(O(z().allColumnsDeps, [], {
          instance: k()
        })));
        k().allColumns = De;
        var qe = r.useMemo(function() {
          for (var rt = [], Kt = [], mn = {}, _n = [].concat(De); _n.length; ) {
            var xn = _n.shift();
            _r({
              data: ne,
              rows: rt,
              flatRows: Kt,
              rowsById: mn,
              column: xn,
              getRowId: Be,
              getSubRows: Ie,
              accessValueHooks: z().accessValue,
              getInstance: k
            });
          }
          return [rt, Kt, mn];
        }, [De, ne, Be, Ie, z, k]), wt = qe[0], xt = qe[1], zt = qe[2];
        Object.assign(k(), {
          rows: wt,
          initialRows: [].concat(wt),
          flatRows: xt,
          rowsById: zt
          // materializedColumns,
        }), T(z().useInstanceAfterData, k());
        var Ye = r.useMemo(function() {
          return O(z().visibleColumns, De, {
            instance: k()
          }).map(function(rt) {
            return $e(rt, me);
          });
        }, [z, De, k, me].concat(O(z().visibleColumnsDeps, [], {
          instance: k()
        })));
        De = r.useMemo(function() {
          var rt = [].concat(Ye);
          return De.forEach(function(Kt) {
            rt.find(function(mn) {
              return mn.id === Kt.id;
            }) || rt.push(Kt);
          }), rt;
        }, [De, Ye]), k().allColumns = De;
        {
          var wn = De.filter(function(rt, Kt) {
            return De.findIndex(function(mn) {
              return mn.id === rt.id;
            }) !== Kt;
          });
          if (wn.length)
            throw console.info(De), new Error('Duplicate columns were found with ids: "' + wn.map(function(rt) {
              return rt.id;
            }).join(", ") + '" in the columns array above');
        }
        var Ct = r.useMemo(function() {
          return O(z().headerGroups, ht(Ye, me), k());
        }, [z, Ye, me, k].concat(O(z().headerGroupsDeps, [], {
          instance: k()
        })));
        k().headerGroups = Ct;
        var at = r.useMemo(function() {
          return Ct.length ? Ct[0].headers : [];
        }, [Ct]);
        k().headers = at, k().flatHeaders = Ct.reduce(function(rt, Kt) {
          return [].concat(rt, Kt.headers);
        }, []), T(z().useInstanceBeforeDimensions, k());
        var ct = Ye.filter(function(rt) {
          return rt.isVisible;
        }).map(function(rt) {
          return rt.id;
        }).sort().join("_");
        Ye = r.useMemo(
          function() {
            return Ye.filter(function(rt) {
              return rt.isVisible;
            });
          },
          // eslint-disable-next-line react-hooks/exhaustive-deps
          [Ye, ct]
        ), k().visibleColumns = Ye;
        var Jt = Rn(at), In = Jt[0], ii = Jt[1], so = Jt[2];
        return k().totalColumnsMinWidth = In, k().totalColumnsWidth = ii, k().totalColumnsMaxWidth = so, T(z().useInstance, k()), [].concat(k().flatHeaders, k().allColumns).forEach(function(rt) {
          rt.render = Fe(k(), rt), rt.getHeaderProps = I(z().getHeaderProps, {
            instance: k(),
            column: rt
          }), rt.getFooterProps = I(z().getFooterProps, {
            instance: k(),
            column: rt
          });
        }), k().headerGroups = r.useMemo(function() {
          return Ct.filter(function(rt, Kt) {
            return rt.headers = rt.headers.filter(function(mn) {
              var _n = function xn(zr) {
                return zr.filter(function(En) {
                  return En.headers ? xn(En.headers) : En.isVisible;
                }).length;
              };
              return mn.headers ? _n(mn.headers) : mn.isVisible;
            }), rt.headers.length ? (rt.getHeaderGroupProps = I(z().getHeaderGroupProps, {
              instance: k(),
              headerGroup: rt,
              index: Kt
            }), rt.getFooterGroupProps = I(z().getFooterGroupProps, {
              instance: k(),
              headerGroup: rt,
              index: Kt
            }), !0) : !1;
          });
        }, [Ct, k, z]), k().footerGroups = [].concat(k().headerGroups).reverse(), k().prepareRow = r.useCallback(function(rt) {
          rt.getRowProps = I(z().getRowProps, {
            instance: k(),
            row: rt
          }), rt.allCells = De.map(function(Kt) {
            var mn = rt.values[Kt.id], _n = {
              column: Kt,
              row: rt,
              value: mn
            };
            return _n.getCellProps = I(z().getCellProps, {
              instance: k(),
              cell: _n
            }), _n.render = Fe(k(), Kt, {
              row: rt,
              cell: _n,
              value: mn
            }), _n;
          }), rt.cells = Ye.map(function(Kt) {
            return rt.allCells.find(function(mn) {
              return mn.column.id === Kt.id;
            });
          }), T(z().prepareRow, rt, {
            instance: k()
          });
        }, [z, k, De, Ye]), k().getTableProps = I(z().getTableProps, {
          instance: k()
        }), k().getTableBodyProps = I(z().getTableBodyProps, {
          instance: k()
        }), T(z().useFinalInstance, k()), k();
      };
      function Rn(p, g) {
        g === void 0 && (g = 0);
        var S = 0, y = 0, F = 0, M = 0;
        return p.forEach(function(k) {
          var z = k.headers;
          if (k.totalLeft = g, z && z.length) {
            var q = Rn(z, g), ne = q[0], le = q[1], Oe = q[2], me = q[3];
            k.totalMinWidth = ne, k.totalWidth = le, k.totalMaxWidth = Oe, k.totalFlexWidth = me;
          } else
            k.totalMinWidth = k.minWidth, k.totalWidth = Math.min(Math.max(k.minWidth, k.width), k.maxWidth), k.totalMaxWidth = k.maxWidth, k.totalFlexWidth = k.canResize ? k.totalWidth : 0;
          k.isVisible && (g += k.totalWidth, S += k.totalMinWidth, y += k.totalWidth, F += k.totalMaxWidth, M += k.totalFlexWidth);
        }), [S, y, F, M];
      }
      function _r(p) {
        var g = p.data, S = p.rows, y = p.flatRows, F = p.rowsById, M = p.column, k = p.getRowId, z = p.getSubRows, q = p.accessValueHooks, ne = p.getInstance, le = function Oe(me, Ie, Be, pe, He) {
          Be === void 0 && (Be = 0);
          var Qe = me, it = k(me, Ie, pe), Me = F[it];
          if (Me)
            Me.subRows && Me.originalSubRows.forEach(function(It, Le) {
              return Oe(It, Le, Be + 1, Me);
            });
          else if (Me = {
            id: it,
            original: Qe,
            index: Ie,
            depth: Be,
            cells: [{}]
            // This is a dummy cell
          }, Me.cells.map = Y, Me.cells.filter = Y, Me.cells.forEach = Y, Me.cells[0].getCellProps = Y, Me.values = {}, He.push(Me), y.push(Me), F[it] = Me, Me.originalSubRows = z(me, Ie), Me.originalSubRows) {
            var vt = [];
            Me.originalSubRows.forEach(function(It, Le) {
              return Oe(It, Le, Be + 1, Me, vt);
            }), Me.subRows = vt;
          }
          M.accessor && (Me.values[M.id] = M.accessor(me, Ie, Me, He, g)), Me.values[M.id] = O(q, Me.values[M.id], {
            row: Me,
            column: M,
            instance: ne()
          }, !0);
        };
        g.forEach(function(Oe, me) {
          return le(Oe, me, 0, void 0, S);
        });
      }
      c.resetExpanded = "resetExpanded", c.toggleRowExpanded = "toggleRowExpanded", c.toggleAllRowsExpanded = "toggleAllRowsExpanded";
      var Mr = function(g) {
        g.getToggleAllRowsExpandedProps = [ar], g.getToggleRowExpandedProps = [Vr], g.stateReducers.push(Lr), g.useInstance.push(cr), g.prepareRow.push(bi);
      };
      Mr.pluginName = "useExpanded";
      var ar = function(g, S) {
        var y = S.instance;
        return [g, {
          onClick: function(M) {
            y.toggleAllRowsExpanded();
          },
          style: {
            cursor: "pointer"
          },
          title: "Toggle All Rows Expanded"
        }];
      }, Vr = function(g, S) {
        var y = S.row;
        return [g, {
          onClick: function() {
            y.toggleRowExpanded();
          },
          style: {
            cursor: "pointer"
          },
          title: "Toggle Row Expanded"
        }];
      };
      function Lr(p, g, S, y) {
        if (g.type === c.init)
          return o({
            expanded: {}
          }, p);
        if (g.type === c.resetExpanded)
          return o({}, p, {
            expanded: y.initialState.expanded || {}
          });
        if (g.type === c.toggleAllRowsExpanded) {
          var F = g.value, M = y.rowsById, k = Object.keys(M).length === Object.keys(p.expanded).length, z = typeof F < "u" ? F : !k;
          if (z) {
            var q = {};
            return Object.keys(M).forEach(function(He) {
              q[He] = !0;
            }), o({}, p, {
              expanded: q
            });
          }
          return o({}, p, {
            expanded: {}
          });
        }
        if (g.type === c.toggleRowExpanded) {
          var ne = g.id, le = g.value, Oe = p.expanded[ne], me = typeof le < "u" ? le : !Oe;
          if (!Oe && me) {
            var Ie;
            return o({}, p, {
              expanded: o({}, p.expanded, (Ie = {}, Ie[ne] = !0, Ie))
            });
          } else if (Oe && !me) {
            var Be = p.expanded;
            Be[ne];
            var pe = l(Be, [ne].map(s));
            return o({}, p, {
              expanded: pe
            });
          } else
            return p;
        }
      }
      function cr(p) {
        var g = p.data, S = p.rows, y = p.rowsById, F = p.manualExpandedKey, M = F === void 0 ? "expanded" : F, k = p.paginateExpandedRows, z = k === void 0 ? !0 : k, q = p.expandSubRows, ne = q === void 0 ? !0 : q, le = p.autoResetExpanded, Oe = le === void 0 ? !0 : le, me = p.getHooks, Ie = p.plugins, Be = p.state.expanded, pe = p.dispatch;
        D(Ie, ["useSortBy", "useGroupBy", "usePivotColumns", "useGlobalFilter"], "useExpanded");
        var He = B(Oe), Qe = !!(Object.keys(y).length && Object.keys(Be).length);
        Qe && Object.keys(y).some(function(De) {
          return !Be[De];
        }) && (Qe = !1), U(function() {
          He() && pe({
            type: c.resetExpanded
          });
        }, [pe, g]);
        var it = r.useCallback(function(De, qe) {
          pe({
            type: c.toggleRowExpanded,
            id: De,
            value: qe
          });
        }, [pe]), Me = r.useCallback(function(De) {
          return pe({
            type: c.toggleAllRowsExpanded,
            value: De
          });
        }, [pe]), vt = r.useMemo(function() {
          return z ? $(S, {
            manualExpandedKey: M,
            expanded: Be,
            expandSubRows: ne
          }) : S;
        }, [z, S, M, Be, ne]), It = r.useMemo(function() {
          return yi(Be);
        }, [Be]), Le = B(p), Ge = I(me().getToggleAllRowsExpandedProps, {
          instance: Le()
        });
        Object.assign(p, {
          preExpandedRows: S,
          expandedRows: vt,
          rows: vt,
          expandedDepth: It,
          isAllRowsExpanded: Qe,
          toggleRowExpanded: it,
          toggleAllRowsExpanded: Me,
          getToggleAllRowsExpandedProps: Ge
        });
      }
      function bi(p, g) {
        var S = g.instance.getHooks, y = g.instance;
        p.toggleRowExpanded = function(F) {
          return y.toggleRowExpanded(p.id, F);
        }, p.getToggleRowExpandedProps = I(S().getToggleRowExpandedProps, {
          instance: y,
          row: p
        });
      }
      function yi(p) {
        var g = 0;
        return Object.keys(p).forEach(function(S) {
          var y = S.split(".");
          g = Math.max(g, y.length);
        }), g;
      }
      var wi = function(g, S, y) {
        return g = g.filter(function(F) {
          return S.some(function(M) {
            var k = F.values[M];
            return String(k).toLowerCase().includes(String(y).toLowerCase());
          });
        }), g;
      };
      wi.autoRemove = function(p) {
        return !p;
      };
      var Dr = function(g, S, y) {
        return g.filter(function(F) {
          return S.some(function(M) {
            var k = F.values[M];
            return k !== void 0 ? String(k).toLowerCase() === String(y).toLowerCase() : !0;
          });
        });
      };
      Dr.autoRemove = function(p) {
        return !p;
      };
      var Kr = function(g, S, y) {
        return g.filter(function(F) {
          return S.some(function(M) {
            var k = F.values[M];
            return k !== void 0 ? String(k) === String(y) : !0;
          });
        });
      };
      Kr.autoRemove = function(p) {
        return !p;
      };
      var xi = function(g, S, y) {
        return g.filter(function(F) {
          return S.some(function(M) {
            var k = F.values[M];
            return k.includes(y);
          });
        });
      };
      xi.autoRemove = function(p) {
        return !p || !p.length;
      };
      var ei = function(g, S, y) {
        return g.filter(function(F) {
          return S.some(function(M) {
            var k = F.values[M];
            return k && k.length && y.every(function(z) {
              return k.includes(z);
            });
          });
        });
      };
      ei.autoRemove = function(p) {
        return !p || !p.length;
      };
      var jr = function(g, S, y) {
        return g.filter(function(F) {
          return S.some(function(M) {
            var k = F.values[M];
            return k && k.length && y.some(function(z) {
              return k.includes(z);
            });
          });
        });
      };
      jr.autoRemove = function(p) {
        return !p || !p.length;
      };
      var ti = function(g, S, y) {
        return g.filter(function(F) {
          return S.some(function(M) {
            var k = F.values[M];
            return y.includes(k);
          });
        });
      };
      ti.autoRemove = function(p) {
        return !p || !p.length;
      };
      var Ci = function(g, S, y) {
        return g.filter(function(F) {
          return S.some(function(M) {
            var k = F.values[M];
            return k === y;
          });
        });
      };
      Ci.autoRemove = function(p) {
        return typeof p > "u";
      };
      var ni = function(g, S, y) {
        return g.filter(function(F) {
          return S.some(function(M) {
            var k = F.values[M];
            return k == y;
          });
        });
      };
      ni.autoRemove = function(p) {
        return p == null;
      };
      var Si = function(g, S, y) {
        var F = y || [], M = F[0], k = F[1];
        if (M = typeof M == "number" ? M : -1 / 0, k = typeof k == "number" ? k : 1 / 0, M > k) {
          var z = M;
          M = k, k = z;
        }
        return g.filter(function(q) {
          return S.some(function(ne) {
            var le = q.values[ne];
            return le >= M && le <= k;
          });
        });
      };
      Si.autoRemove = function(p) {
        return !p || typeof p[0] != "number" && typeof p[1] != "number";
      };
      var Sr = /* @__PURE__ */ Object.freeze({
        __proto__: null,
        text: wi,
        exactText: Dr,
        exactTextCase: Kr,
        includes: xi,
        includesAll: ei,
        includesSome: jr,
        includesValue: ti,
        exact: Ci,
        equals: ni,
        between: Si
      });
      c.resetFilters = "resetFilters", c.setFilter = "setFilter", c.setAllFilters = "setAllFilters";
      var L = function(g) {
        g.stateReducers.push(be), g.useInstance.push(ze);
      };
      L.pluginName = "useFilters";
      function be(p, g, S, y) {
        if (g.type === c.init)
          return o({
            filters: []
          }, p);
        if (g.type === c.resetFilters)
          return o({}, p, {
            filters: y.initialState.filters || []
          });
        if (g.type === c.setFilter) {
          var F = g.columnId, M = g.filterValue, k = y.allColumns, z = y.filterTypes, q = k.find(function(pe) {
            return pe.id === F;
          });
          if (!q)
            throw new Error("React-Table: Could not find a column with id: " + F);
          var ne = _(q.filter, z || {}, Sr), le = p.filters.find(function(pe) {
            return pe.id === F;
          }), Oe = E(M, le && le.value);
          return re(ne.autoRemove, Oe, q) ? o({}, p, {
            filters: p.filters.filter(function(pe) {
              return pe.id !== F;
            })
          }) : le ? o({}, p, {
            filters: p.filters.map(function(pe) {
              return pe.id === F ? {
                id: F,
                value: Oe
              } : pe;
            })
          }) : o({}, p, {
            filters: [].concat(p.filters, [{
              id: F,
              value: Oe
            }])
          });
        }
        if (g.type === c.setAllFilters) {
          var me = g.filters, Ie = y.allColumns, Be = y.filterTypes;
          return o({}, p, {
            // Filter out undefined values
            filters: E(me, p.filters).filter(function(pe) {
              var He = Ie.find(function(it) {
                return it.id === pe.id;
              }), Qe = _(He.filter, Be || {}, Sr);
              return !re(Qe.autoRemove, pe.value, He);
            })
          });
        }
      }
      function ze(p) {
        var g = p.data, S = p.rows, y = p.flatRows, F = p.rowsById, M = p.allColumns, k = p.filterTypes, z = p.manualFilters, q = p.defaultCanFilter, ne = q === void 0 ? !1 : q, le = p.disableFilters, Oe = p.state.filters, me = p.dispatch, Ie = p.autoResetFilters, Be = Ie === void 0 ? !0 : Ie, pe = r.useCallback(function(Le, Ge) {
          me({
            type: c.setFilter,
            columnId: Le,
            filterValue: Ge
          });
        }, [me]), He = r.useCallback(function(Le) {
          me({
            type: c.setAllFilters,
            filters: Le
          });
        }, [me]);
        M.forEach(function(Le) {
          var Ge = Le.id, De = Le.accessor, qe = Le.defaultCanFilter, wt = Le.disableFilters;
          Le.canFilter = De ? A(wt === !0 ? !1 : void 0, le === !0 ? !1 : void 0, !0) : A(qe, ne, !1), Le.setFilter = function(zt) {
            return pe(Le.id, zt);
          };
          var xt = Oe.find(function(zt) {
            return zt.id === Ge;
          });
          Le.filterValue = xt && xt.value;
        });
        var Qe = r.useMemo(function() {
          if (z || !Oe.length)
            return [S, y, F];
          var Le = [], Ge = {}, De = function qe(wt, xt) {
            xt === void 0 && (xt = 0);
            var zt = wt;
            return zt = Oe.reduce(function(Ye, wn) {
              var Ct = wn.id, at = wn.value, ct = M.find(function(In) {
                return In.id === Ct;
              });
              if (!ct)
                return Ye;
              xt === 0 && (ct.preFilteredRows = Ye);
              var Jt = _(ct.filter, k || {}, Sr);
              return Jt ? (ct.filteredRows = Jt(Ye, [Ct], at), ct.filteredRows) : (console.warn("Could not find a valid 'column.filter' for column with the ID: " + ct.id + "."), Ye);
            }, wt), zt.forEach(function(Ye) {
              Le.push(Ye), Ge[Ye.id] = Ye, Ye.subRows && (Ye.subRows = Ye.subRows && Ye.subRows.length > 0 ? qe(Ye.subRows, xt + 1) : Ye.subRows);
            }), zt;
          };
          return [De(S), Le, Ge];
        }, [z, Oe, S, y, F, M, k]), it = Qe[0], Me = Qe[1], vt = Qe[2];
        r.useMemo(function() {
          var Le = M.filter(function(Ge) {
            return !Oe.find(function(De) {
              return De.id === Ge.id;
            });
          });
          Le.forEach(function(Ge) {
            Ge.preFilteredRows = it, Ge.filteredRows = it;
          });
        }, [it, Oe, M]);
        var It = B(Be);
        U(function() {
          It() && me({
            type: c.resetFilters
          });
        }, [me, z ? null : g]), Object.assign(p, {
          preFilteredRows: S,
          preFilteredFlatRows: y,
          preFilteredRowsById: F,
          filteredRows: it,
          filteredFlatRows: Me,
          filteredRowsById: vt,
          rows: it,
          flatRows: Me,
          rowsById: vt,
          setFilter: pe,
          setAllFilters: He
        });
      }
      c.resetGlobalFilter = "resetGlobalFilter", c.setGlobalFilter = "setGlobalFilter";
      var lt = function(g) {
        g.stateReducers.push(Gt), g.useInstance.push(Vt);
      };
      lt.pluginName = "useGlobalFilter";
      function Gt(p, g, S, y) {
        if (g.type === c.resetGlobalFilter)
          return o({}, p, {
            globalFilter: y.initialState.globalFilter || void 0
          });
        if (g.type === c.setGlobalFilter) {
          var F = g.filterValue, M = y.userFilterTypes, k = _(y.globalFilter, M || {}, Sr), z = E(F, p.globalFilter);
          if (re(k.autoRemove, z)) {
            p.globalFilter;
            var q = l(p, ["globalFilter"]);
            return q;
          }
          return o({}, p, {
            globalFilter: z
          });
        }
      }
      function Vt(p) {
        var g = p.data, S = p.rows, y = p.flatRows, F = p.rowsById, M = p.allColumns, k = p.filterTypes, z = p.globalFilter, q = p.manualGlobalFilter, ne = p.state.globalFilter, le = p.dispatch, Oe = p.autoResetGlobalFilter, me = Oe === void 0 ? !0 : Oe, Ie = p.disableGlobalFilter, Be = r.useCallback(function(vt) {
          le({
            type: c.setGlobalFilter,
            filterValue: vt
          });
        }, [le]), pe = r.useMemo(function() {
          if (q || typeof ne > "u")
            return [S, y, F];
          var vt = [], It = {}, Le = _(z, k || {}, Sr);
          if (!Le)
            return console.warn("Could not find a valid 'globalFilter' option."), S;
          M.forEach(function(qe) {
            var wt = qe.disableGlobalFilter;
            qe.canFilter = A(wt === !0 ? !1 : void 0, Ie === !0 ? !1 : void 0, !0);
          });
          var Ge = M.filter(function(qe) {
            return qe.canFilter === !0;
          }), De = function qe(wt) {
            return wt = Le(wt, Ge.map(function(xt) {
              return xt.id;
            }), ne), wt.forEach(function(xt) {
              vt.push(xt), It[xt.id] = xt, xt.subRows = xt.subRows && xt.subRows.length ? qe(xt.subRows) : xt.subRows;
            }), wt;
          };
          return [De(S), vt, It];
        }, [q, ne, z, k, M, S, y, F, Ie]), He = pe[0], Qe = pe[1], it = pe[2], Me = B(me);
        U(function() {
          Me() && le({
            type: c.resetGlobalFilter
          });
        }, [le, q ? null : g]), Object.assign(p, {
          preGlobalFilteredRows: S,
          preGlobalFilteredFlatRows: y,
          preGlobalFilteredRowsById: F,
          globalFilteredRows: He,
          globalFilteredFlatRows: Qe,
          globalFilteredRowsById: it,
          rows: He,
          flatRows: Qe,
          rowsById: it,
          setGlobalFilter: Be,
          disableGlobalFilter: Ie
        });
      }
      function Pt(p, g) {
        return g.reduce(function(S, y) {
          return S + (typeof y == "number" ? y : 0);
        }, 0);
      }
      function St(p) {
        var g = p[0] || 0;
        return p.forEach(function(S) {
          typeof S == "number" && (g = Math.min(g, S));
        }), g;
      }
      function hn(p) {
        var g = p[0] || 0;
        return p.forEach(function(S) {
          typeof S == "number" && (g = Math.max(g, S));
        }), g;
      }
      function nn(p) {
        var g = p[0] || 0, S = p[0] || 0;
        return p.forEach(function(y) {
          typeof y == "number" && (g = Math.min(g, y), S = Math.max(S, y));
        }), g + ".." + S;
      }
      function rn(p) {
        return Pt(null, p) / p.length;
      }
      function Pn(p) {
        if (!p.length)
          return null;
        var g = Math.floor(p.length / 2), S = [].concat(p).sort(function(y, F) {
          return y - F;
        });
        return p.length % 2 !== 0 ? S[g] : (S[g - 1] + S[g]) / 2;
      }
      function dr(p) {
        return Array.from(new Set(p).values());
      }
      function sr(p) {
        return new Set(p).size;
      }
      function yn(p) {
        return p.length;
      }
      var Ir = /* @__PURE__ */ Object.freeze({
        __proto__: null,
        sum: Pt,
        min: St,
        max: hn,
        minMax: nn,
        average: rn,
        median: Pn,
        unique: dr,
        uniqueCount: sr,
        count: yn
      }), Ui = [], qi = {};
      c.resetGroupBy = "resetGroupBy", c.setGroupBy = "setGroupBy", c.toggleGroupBy = "toggleGroupBy";
      var Qi = function(g) {
        g.getGroupByToggleProps = [Yo], g.stateReducers.push($s), g.visibleColumnsDeps.push(function(S, y) {
          var F = y.instance;
          return [].concat(S, [F.state.groupBy]);
        }), g.visibleColumns.push(Xs), g.useInstance.push(Zs), g.prepareRow.push(Js);
      };
      Qi.pluginName = "useGroupBy";
      var Yo = function(g, S) {
        var y = S.header;
        return [g, {
          onClick: y.canGroupBy ? function(F) {
            F.persist(), y.toggleGroupBy();
          } : void 0,
          style: {
            cursor: y.canGroupBy ? "pointer" : void 0
          },
          title: "Toggle GroupBy"
        }];
      };
      function $s(p, g, S, y) {
        if (g.type === c.init)
          return o({
            groupBy: []
          }, p);
        if (g.type === c.resetGroupBy)
          return o({}, p, {
            groupBy: y.initialState.groupBy || []
          });
        if (g.type === c.setGroupBy) {
          var F = g.value;
          return o({}, p, {
            groupBy: F
          });
        }
        if (g.type === c.toggleGroupBy) {
          var M = g.columnId, k = g.value, z = typeof k < "u" ? k : !p.groupBy.includes(M);
          return z ? o({}, p, {
            groupBy: [].concat(p.groupBy, [M])
          }) : o({}, p, {
            groupBy: p.groupBy.filter(function(q) {
              return q !== M;
            })
          });
        }
      }
      function Xs(p, g) {
        var S = g.instance.state.groupBy, y = S.map(function(M) {
          return p.find(function(k) {
            return k.id === M;
          });
        }).filter(Boolean), F = p.filter(function(M) {
          return !S.includes(M.id);
        });
        return p = [].concat(y, F), p.forEach(function(M) {
          M.isGrouped = S.includes(M.id), M.groupedIndex = S.indexOf(M.id);
        }), p;
      }
      var Ys = {};
      function Zs(p) {
        var g = p.data, S = p.rows, y = p.flatRows, F = p.rowsById, M = p.allColumns, k = p.flatHeaders, z = p.groupByFn, q = z === void 0 ? Zo : z, ne = p.manualGroupBy, le = p.aggregations, Oe = le === void 0 ? Ys : le, me = p.plugins, Ie = p.state.groupBy, Be = p.dispatch, pe = p.autoResetGroupBy, He = pe === void 0 ? !0 : pe, Qe = p.disableGroupBy, it = p.defaultCanGroupBy, Me = p.getHooks;
        D(me, ["useColumnOrder", "useFilters"], "useGroupBy");
        var vt = B(p);
        M.forEach(function(at) {
          var ct = at.accessor, Jt = at.defaultGroupBy, In = at.disableGroupBy;
          at.canGroupBy = ct ? A(at.canGroupBy, In === !0 ? !1 : void 0, Qe === !0 ? !1 : void 0, !0) : A(at.canGroupBy, Jt, it, !1), at.canGroupBy && (at.toggleGroupBy = function() {
            return p.toggleGroupBy(at.id);
          }), at.Aggregated = at.Aggregated || at.Cell;
        });
        var It = r.useCallback(function(at, ct) {
          Be({
            type: c.toggleGroupBy,
            columnId: at,
            value: ct
          });
        }, [Be]), Le = r.useCallback(function(at) {
          Be({
            type: c.setGroupBy,
            value: at
          });
        }, [Be]);
        k.forEach(function(at) {
          at.getGroupByToggleProps = I(Me().getGroupByToggleProps, {
            instance: vt(),
            header: at
          });
        });
        var Ge = r.useMemo(function() {
          if (ne || !Ie.length)
            return [S, y, F, Ui, qi, y, F];
          var at = Ie.filter(function(xn) {
            return M.find(function(zr) {
              return zr.id === xn;
            });
          }), ct = function(zr, En, pa) {
            var Hr = {};
            return M.forEach(function(dn) {
              if (at.includes(dn.id)) {
                Hr[dn.id] = En[0] ? En[0].values[dn.id] : null;
                return;
              }
              var ga = typeof dn.aggregate == "function" ? dn.aggregate : Oe[dn.aggregate] || Ir[dn.aggregate];
              if (ga) {
                var Ri = En.map(function(oi) {
                  return oi.values[dn.id];
                }), pl = zr.map(function(oi) {
                  var Wr = oi.values[dn.id];
                  if (!pa && dn.aggregateValue) {
                    var $r = typeof dn.aggregateValue == "function" ? dn.aggregateValue : Oe[dn.aggregateValue] || Ir[dn.aggregateValue];
                    if (!$r)
                      throw console.info({
                        column: dn
                      }), new Error("React Table: Invalid column.aggregateValue option for column listed above");
                    Wr = $r(Wr, oi, dn);
                  }
                  return Wr;
                });
                Hr[dn.id] = ga(pl, Ri);
              } else {
                if (dn.aggregate)
                  throw console.info({
                    column: dn
                  }), new Error("React Table: Invalid column.aggregate option for column listed above");
                Hr[dn.id] = null;
              }
            }), Hr;
          }, Jt = [], In = {}, ii = [], so = {}, rt = [], Kt = {}, mn = function xn(zr, En, pa) {
            if (En === void 0 && (En = 0), En === at.length)
              return zr.map(function(Ri) {
                return o({}, Ri, {
                  depth: En
                });
              });
            var Hr = at[En], dn = q(zr, Hr), ga = Object.entries(dn).map(function(Ri, pl) {
              var oi = Ri[0], Wr = Ri[1], $r = Hr + ":" + oi;
              $r = pa ? pa + ">" + $r : $r;
              var id = xn(Wr, En + 1, $r), od = En ? H(Wr, "leafRows") : Wr, Fv = ct(od, Wr, En), Bv = {
                id: $r,
                isGrouped: !0,
                groupByID: Hr,
                groupByVal: oi,
                values: Fv,
                subRows: id,
                leafRows: od,
                depth: En,
                index: pl
              };
              return id.forEach(function(fr) {
                Jt.push(fr), In[fr.id] = fr, fr.isGrouped ? (ii.push(fr), so[fr.id] = fr) : (rt.push(fr), Kt[fr.id] = fr);
              }), Bv;
            });
            return ga;
          }, _n = mn(S);
          return _n.forEach(function(xn) {
            Jt.push(xn), In[xn.id] = xn, xn.isGrouped ? (ii.push(xn), so[xn.id] = xn) : (rt.push(xn), Kt[xn.id] = xn);
          }), [_n, Jt, In, ii, so, rt, Kt];
        }, [ne, Ie, S, y, F, M, Oe, q]), De = Ge[0], qe = Ge[1], wt = Ge[2], xt = Ge[3], zt = Ge[4], Ye = Ge[5], wn = Ge[6], Ct = B(He);
        U(function() {
          Ct() && Be({
            type: c.resetGroupBy
          });
        }, [Be, ne ? null : g]), Object.assign(p, {
          preGroupedRows: S,
          preGroupedFlatRow: y,
          preGroupedRowsById: F,
          groupedRows: De,
          groupedFlatRows: qe,
          groupedRowsById: wt,
          onlyGroupedFlatRows: xt,
          onlyGroupedRowsById: zt,
          nonGroupedFlatRows: Ye,
          nonGroupedRowsById: wn,
          rows: De,
          flatRows: qe,
          rowsById: wt,
          toggleGroupBy: It,
          setGroupBy: Le
        });
      }
      function Js(p) {
        p.allCells.forEach(function(g) {
          var S;
          g.isGrouped = g.column.isGrouped && g.column.id === p.groupByID, g.isPlaceholder = !g.isGrouped && g.column.isGrouped, g.isAggregated = !g.isGrouped && !g.isPlaceholder && ((S = p.subRows) == null ? void 0 : S.length);
        });
      }
      function Zo(p, g) {
        return p.reduce(function(S, y, F) {
          var M = "" + y.values[g];
          return S[M] = Array.isArray(S[M]) ? S[M] : [], S[M].push(y), S;
        }, {});
      }
      var Jo = /([0-9]+)/gm, Us = function(g, S, y) {
        var F = ri(g, S, y), M = F[0], k = F[1];
        for (M = qo(M), k = qo(k), M = M.split(Jo).filter(Boolean), k = k.split(Jo).filter(Boolean); M.length && k.length; ) {
          var z = M.shift(), q = k.shift(), ne = parseInt(z, 10), le = parseInt(q, 10), Oe = [ne, le].sort();
          if (isNaN(Oe[0])) {
            if (z > q)
              return 1;
            if (q > z)
              return -1;
            continue;
          }
          if (isNaN(Oe[1]))
            return isNaN(ne) ? -1 : 1;
          if (ne > le)
            return 1;
          if (le > ne)
            return -1;
        }
        return M.length - k.length;
      };
      function qs(p, g, S) {
        var y = ri(p, g, S), F = y[0], M = y[1];
        return F = F.getTime(), M = M.getTime(), Ki(F, M);
      }
      function Qs(p, g, S) {
        var y = ri(p, g, S), F = y[0], M = y[1];
        return Ki(F, M);
      }
      function Ks(p, g, S) {
        var y = ri(p, g, S), F = y[0], M = y[1];
        for (F = F.split("").filter(Boolean), M = M.split("").filter(Boolean); F.length && M.length; ) {
          var k = F.shift(), z = M.shift(), q = k.toLowerCase(), ne = z.toLowerCase();
          if (q > ne)
            return 1;
          if (ne > q)
            return -1;
          if (k > z)
            return 1;
          if (z > k)
            return -1;
        }
        return F.length - M.length;
      }
      function Uo(p, g, S) {
        var y = ri(p, g, S), F = y[0], M = y[1], k = /[^0-9.]/gi;
        return F = Number(String(F).replace(k, "")), M = Number(String(M).replace(k, "")), Ki(F, M);
      }
      function Ki(p, g) {
        return p === g ? 0 : p > g ? 1 : -1;
      }
      function ri(p, g, S) {
        return [p.values[S], g.values[S]];
      }
      function qo(p) {
        return typeof p == "number" ? isNaN(p) || p === 1 / 0 || p === -1 / 0 ? "" : String(p) : typeof p == "string" ? p : "";
      }
      var el = /* @__PURE__ */ Object.freeze({
        __proto__: null,
        alphanumeric: Us,
        datetime: qs,
        basic: Qs,
        string: Ks,
        number: Uo
      });
      c.resetSortBy = "resetSortBy", c.setSortBy = "setSortBy", c.toggleSortBy = "toggleSortBy", c.clearSortBy = "clearSortBy", x.sortType = "alphanumeric", x.sortDescFirst = !1;
      var Qo = function(g) {
        g.getSortByToggleProps = [tl], g.stateReducers.push(Ko), g.useInstance.push(ea);
      };
      Qo.pluginName = "useSortBy";
      var tl = function(g, S) {
        var y = S.instance, F = S.column, M = y.isMultiSortEvent, k = M === void 0 ? function(z) {
          return z.shiftKey;
        } : M;
        return [g, {
          onClick: F.canSort ? function(z) {
            z.persist(), F.toggleSortBy(void 0, !y.disableMultiSort && k(z));
          } : void 0,
          style: {
            cursor: F.canSort ? "pointer" : void 0
          },
          title: F.canSort ? "Toggle SortBy" : void 0
        }];
      };
      function Ko(p, g, S, y) {
        if (g.type === c.init)
          return o({
            sortBy: []
          }, p);
        if (g.type === c.resetSortBy)
          return o({}, p, {
            sortBy: y.initialState.sortBy || []
          });
        if (g.type === c.clearSortBy) {
          var F = p.sortBy, M = F.filter(function(De) {
            return De.id !== g.columnId;
          });
          return o({}, p, {
            sortBy: M
          });
        }
        if (g.type === c.setSortBy) {
          var k = g.sortBy;
          return o({}, p, {
            sortBy: k
          });
        }
        if (g.type === c.toggleSortBy) {
          var z = g.columnId, q = g.desc, ne = g.multi, le = y.allColumns, Oe = y.disableMultiSort, me = y.disableSortRemove, Ie = y.disableMultiRemove, Be = y.maxMultiSortColCount, pe = Be === void 0 ? Number.MAX_SAFE_INTEGER : Be, He = p.sortBy, Qe = le.find(function(De) {
            return De.id === z;
          }), it = Qe.sortDescFirst, Me = He.find(function(De) {
            return De.id === z;
          }), vt = He.findIndex(function(De) {
            return De.id === z;
          }), It = typeof q < "u" && q !== null, Le = [], Ge;
          return !Oe && ne ? Me ? Ge = "toggle" : Ge = "add" : vt !== He.length - 1 || He.length !== 1 ? Ge = "replace" : Me ? Ge = "toggle" : Ge = "replace", Ge === "toggle" && // Must be toggling
          !me && // If disableSortRemove, disable in general
          !It && // Must not be setting desc
          (!ne || !Ie) && // If multi, don't allow if disableMultiRemove
          (Me && // Finally, detect if it should indeed be removed
          Me.desc && !it || !Me.desc && it) && (Ge = "remove"), Ge === "replace" ? Le = [{
            id: z,
            desc: It ? q : it
          }] : Ge === "add" ? (Le = [].concat(He, [{
            id: z,
            desc: It ? q : it
          }]), Le.splice(0, Le.length - pe)) : Ge === "toggle" ? Le = He.map(function(De) {
            return De.id === z ? o({}, De, {
              desc: It ? q : !Me.desc
            }) : De;
          }) : Ge === "remove" && (Le = He.filter(function(De) {
            return De.id !== z;
          })), o({}, p, {
            sortBy: Le
          });
        }
      }
      function ea(p) {
        var g = p.data, S = p.rows, y = p.flatRows, F = p.allColumns, M = p.orderByFn, k = M === void 0 ? eo : M, z = p.sortTypes, q = p.manualSortBy, ne = p.defaultCanSort, le = p.disableSortBy, Oe = p.flatHeaders, me = p.state.sortBy, Ie = p.dispatch, Be = p.plugins, pe = p.getHooks, He = p.autoResetSortBy, Qe = He === void 0 ? !0 : He;
        D(Be, ["useFilters", "useGlobalFilter", "useGroupBy", "usePivotColumns"], "useSortBy");
        var it = r.useCallback(function(qe) {
          Ie({
            type: c.setSortBy,
            sortBy: qe
          });
        }, [Ie]), Me = r.useCallback(function(qe, wt, xt) {
          Ie({
            type: c.toggleSortBy,
            columnId: qe,
            desc: wt,
            multi: xt
          });
        }, [Ie]), vt = B(p);
        Oe.forEach(function(qe) {
          var wt = qe.accessor, xt = qe.canSort, zt = qe.disableSortBy, Ye = qe.id, wn = wt ? A(zt === !0 ? !1 : void 0, le === !0 ? !1 : void 0, !0) : A(ne, xt, !1);
          qe.canSort = wn, qe.canSort && (qe.toggleSortBy = function(at, ct) {
            return Me(qe.id, at, ct);
          }, qe.clearSortBy = function() {
            Ie({
              type: c.clearSortBy,
              columnId: qe.id
            });
          }), qe.getSortByToggleProps = I(pe().getSortByToggleProps, {
            instance: vt(),
            column: qe
          });
          var Ct = me.find(function(at) {
            return at.id === Ye;
          });
          qe.isSorted = !!Ct, qe.sortedIndex = me.findIndex(function(at) {
            return at.id === Ye;
          }), qe.isSortedDesc = qe.isSorted ? Ct.desc : void 0;
        });
        var It = r.useMemo(function() {
          if (q || !me.length)
            return [S, y];
          var qe = [], wt = me.filter(function(zt) {
            return F.find(function(Ye) {
              return Ye.id === zt.id;
            });
          }), xt = function zt(Ye) {
            var wn = k(
              Ye,
              wt.map(function(Ct) {
                var at = F.find(function(In) {
                  return In.id === Ct.id;
                });
                if (!at)
                  throw new Error("React-Table: Could not find a column with id: " + Ct.id + " while sorting");
                var ct = at.sortType, Jt = w(ct) || (z || {})[ct] || el[ct];
                if (!Jt)
                  throw new Error("React-Table: Could not find a valid sortType of '" + ct + "' for column '" + Ct.id + "'.");
                return function(In, ii) {
                  return Jt(In, ii, Ct.id, Ct.desc);
                };
              }),
              // Map the directions
              wt.map(function(Ct) {
                var at = F.find(function(ct) {
                  return ct.id === Ct.id;
                });
                return at && at.sortInverted ? Ct.desc : !Ct.desc;
              })
            );
            return wn.forEach(function(Ct) {
              qe.push(Ct), !(!Ct.subRows || Ct.subRows.length === 0) && (Ct.subRows = zt(Ct.subRows));
            }), wn;
          };
          return [xt(S), qe];
        }, [q, me, S, y, F, k, z]), Le = It[0], Ge = It[1], De = B(Qe);
        U(function() {
          De() && Ie({
            type: c.resetSortBy
          });
        }, [q ? null : g]), Object.assign(p, {
          preSortedRows: S,
          preSortedFlatRows: y,
          sortedRows: Le,
          sortedFlatRows: Ge,
          rows: Le,
          flatRows: Ge,
          setSortBy: it,
          toggleSortBy: Me
        });
      }
      function eo(p, g, S) {
        return [].concat(p).sort(function(y, F) {
          for (var M = 0; M < g.length; M += 1) {
            var k = g[M], z = S[M] === !1 || S[M] === "desc", q = k(y, F);
            if (q !== 0)
              return z ? -q : q;
          }
          return S[0] ? y.index - F.index : F.index - y.index;
        });
      }
      var nl = "usePagination";
      c.resetPage = "resetPage", c.gotoPage = "gotoPage", c.setPageSize = "setPageSize";
      var ta = function(g) {
        g.stateReducers.push(rl), g.useInstance.push(na);
      };
      ta.pluginName = nl;
      function rl(p, g, S, y) {
        if (g.type === c.init)
          return o({
            pageSize: 10,
            pageIndex: 0
          }, p);
        if (g.type === c.resetPage)
          return o({}, p, {
            pageIndex: y.initialState.pageIndex || 0
          });
        if (g.type === c.gotoPage) {
          var F = y.pageCount, M = y.page, k = E(g.pageIndex, p.pageIndex), z = !1;
          return k > p.pageIndex ? z = F === -1 ? M.length >= p.pageSize : k < F : k < p.pageIndex && (z = k > -1), z ? o({}, p, {
            pageIndex: k
          }) : p;
        }
        if (g.type === c.setPageSize) {
          var q = g.pageSize, ne = p.pageSize * p.pageIndex, le = Math.floor(ne / q);
          return o({}, p, {
            pageIndex: le,
            pageSize: q
          });
        }
      }
      function na(p) {
        var g = p.rows, S = p.autoResetPage, y = S === void 0 ? !0 : S, F = p.manualExpandedKey, M = F === void 0 ? "expanded" : F, k = p.plugins, z = p.pageCount, q = p.paginateExpandedRows, ne = q === void 0 ? !0 : q, le = p.expandSubRows, Oe = le === void 0 ? !0 : le, me = p.state, Ie = me.pageSize, Be = me.pageIndex, pe = me.expanded, He = me.globalFilter, Qe = me.filters, it = me.groupBy, Me = me.sortBy, vt = p.dispatch, It = p.data, Le = p.manualPagination;
        D(k, ["useGlobalFilter", "useFilters", "useGroupBy", "useSortBy", "useExpanded"], "usePagination");
        var Ge = B(y);
        U(function() {
          Ge() && vt({
            type: c.resetPage
          });
        }, [vt, Le ? null : It, He, Qe, it, Me]);
        var De = Le ? z : Math.ceil(g.length / Ie), qe = r.useMemo(function() {
          return De > 0 ? [].concat(new Array(De)).fill(null).map(function(ct, Jt) {
            return Jt;
          }) : [];
        }, [De]), wt = r.useMemo(function() {
          var ct;
          if (Le)
            ct = g;
          else {
            var Jt = Ie * Be, In = Jt + Ie;
            ct = g.slice(Jt, In);
          }
          return ne ? ct : $(ct, {
            manualExpandedKey: M,
            expanded: pe,
            expandSubRows: Oe
          });
        }, [Oe, pe, M, Le, Be, Ie, ne, g]), xt = Be > 0, zt = De === -1 ? wt.length >= Ie : Be < De - 1, Ye = r.useCallback(function(ct) {
          vt({
            type: c.gotoPage,
            pageIndex: ct
          });
        }, [vt]), wn = r.useCallback(function() {
          return Ye(function(ct) {
            return ct - 1;
          });
        }, [Ye]), Ct = r.useCallback(function() {
          return Ye(function(ct) {
            return ct + 1;
          });
        }, [Ye]), at = r.useCallback(function(ct) {
          vt({
            type: c.setPageSize,
            pageSize: ct
          });
        }, [vt]);
        Object.assign(p, {
          pageOptions: qe,
          pageCount: De,
          page: wt,
          canPreviousPage: xt,
          canNextPage: zt,
          gotoPage: Ye,
          previousPage: wn,
          nextPage: Ct,
          setPageSize: at
        });
      }
      c.resetPivot = "resetPivot", c.togglePivot = "togglePivot";
      var ra = function(g) {
        g.getPivotToggleProps = [il], g.stateReducers.push(oa), g.useInstanceAfterData.push(ol), g.allColumns.push(al), g.accessValue.push(sl), g.materializedColumns.push(ll), g.materializedColumnsDeps.push(to), g.visibleColumns.push(aa), g.visibleColumnsDeps.push(Ii), g.useInstance.push(no), g.prepareRow.push(ro);
      };
      ra.pluginName = "usePivotColumns";
      var ia = [], il = function(g, S) {
        var y = S.header;
        return [g, {
          onClick: y.canPivot ? function(F) {
            F.persist(), y.togglePivot();
          } : void 0,
          style: {
            cursor: y.canPivot ? "pointer" : void 0
          },
          title: "Toggle Pivot"
        }];
      };
      function oa(p, g, S, y) {
        if (g.type === c.init)
          return o({
            pivotColumns: ia
          }, p);
        if (g.type === c.resetPivot)
          return o({}, p, {
            pivotColumns: y.initialState.pivotColumns || ia
          });
        if (g.type === c.togglePivot) {
          var F = g.columnId, M = g.value, k = typeof M < "u" ? M : !p.pivotColumns.includes(F);
          return k ? o({}, p, {
            pivotColumns: [].concat(p.pivotColumns, [F])
          }) : o({}, p, {
            pivotColumns: p.pivotColumns.filter(function(z) {
              return z !== F;
            })
          });
        }
      }
      function ol(p) {
        p.allColumns.forEach(function(g) {
          g.isPivotSource = p.state.pivotColumns.includes(g.id);
        });
      }
      function al(p, g) {
        var S = g.instance;
        return p.forEach(function(y) {
          y.isPivotSource = S.state.pivotColumns.includes(y.id), y.uniqueValues = /* @__PURE__ */ new Set();
        }), p;
      }
      function sl(p, g) {
        var S = g.column;
        return S.uniqueValues && typeof p < "u" && S.uniqueValues.add(p), p;
      }
      function ll(p, g) {
        var S = g.instance, y = S.allColumns, F = S.state;
        if (!F.pivotColumns.length || !F.groupBy || !F.groupBy.length)
          return p;
        var M = F.pivotColumns.map(function(ne) {
          return y.find(function(le) {
            return le.id === ne;
          });
        }).filter(Boolean), k = y.filter(function(ne) {
          return !ne.isPivotSource && !F.groupBy.includes(ne.id) && !F.pivotColumns.includes(ne.id);
        }), z = function ne(le, Oe, me) {
          le === void 0 && (le = 0), me === void 0 && (me = []);
          var Ie = M[le];
          if (!Ie)
            return k.map(function(pe) {
              return o({}, pe, {
                canPivot: !1,
                isPivoted: !0,
                parent: Oe,
                depth: le,
                id: "" + (Oe ? Oe.id + "." + pe.id : pe.id),
                accessor: function(Qe, it, Me) {
                  if (me.every(function(vt) {
                    return vt(Me);
                  }))
                    return Me.values[pe.id];
                }
              });
            });
          var Be = Array.from(Ie.uniqueValues).sort();
          return Be.map(function(pe) {
            var He = o({}, Ie, {
              Header: Ie.PivotHeader || typeof Ie.header == "string" ? Ie.Header + ": " + pe : pe,
              isPivotGroup: !0,
              parent: Oe,
              depth: le,
              id: Oe ? Oe.id + "." + Ie.id + "." + pe : Ie.id + "." + pe,
              pivotValue: pe
            });
            return He.columns = ne(le + 1, He, [].concat(me, [function(Qe) {
              return Qe.values[Ie.id] === pe;
            }])), He;
          });
        }, q = Ee(z());
        return [].concat(p, q);
      }
      function to(p, g) {
        var S = g.instance.state, y = S.pivotColumns, F = S.groupBy;
        return [].concat(p, [y, F]);
      }
      function aa(p, g) {
        var S = g.instance.state;
        return p = p.filter(function(y) {
          return !y.isPivotSource;
        }), S.pivotColumns.length && S.groupBy && S.groupBy.length && (p = p.filter(function(y) {
          return y.isGrouped || y.isPivoted;
        })), p;
      }
      function Ii(p, g) {
        var S = g.instance;
        return [].concat(p, [S.state.pivotColumns, S.state.groupBy]);
      }
      function no(p) {
        var g = p.columns, S = p.allColumns, y = p.flatHeaders, F = p.getHooks, M = p.plugins, k = p.dispatch, z = p.autoResetPivot, q = z === void 0 ? !0 : z, ne = p.manaulPivot, le = p.disablePivot, Oe = p.defaultCanPivot;
        D(M, ["useGroupBy"], "usePivotColumns");
        var me = B(p);
        S.forEach(function(pe) {
          var He = pe.accessor, Qe = pe.defaultPivot, it = pe.disablePivot;
          pe.canPivot = He ? A(pe.canPivot, it === !0 ? !1 : void 0, le === !0 ? !1 : void 0, !0) : A(pe.canPivot, Qe, Oe, !1), pe.canPivot && (pe.togglePivot = function() {
            return p.togglePivot(pe.id);
          }), pe.Aggregated = pe.Aggregated || pe.Cell;
        });
        var Ie = function(He, Qe) {
          k({
            type: c.togglePivot,
            columnId: He,
            value: Qe
          });
        };
        y.forEach(function(pe) {
          pe.getPivotToggleProps = I(F().getPivotToggleProps, {
            instance: me(),
            header: pe
          });
        });
        var Be = B(q);
        U(function() {
          Be() && k({
            type: c.resetPivot
          });
        }, [k, ne ? null : g]), Object.assign(p, {
          togglePivot: Ie
        });
      }
      function ro(p) {
        p.allCells.forEach(function(g) {
          g.isPivoted = g.column.isPivoted;
        });
      }
      var sa = "useRowSelect";
      c.resetSelectedRows = "resetSelectedRows", c.toggleAllRowsSelected = "toggleAllRowsSelected", c.toggleRowSelected = "toggleRowSelected", c.toggleAllPageRowsSelected = "toggleAllPageRowsSelected";
      var io = function(g) {
        g.getToggleRowSelectedProps = [ul], g.getToggleAllRowsSelectedProps = [oo], g.getToggleAllPageRowsSelectedProps = [cl], g.stateReducers.push(dl), g.useInstance.push(fl), g.prepareRow.push(la);
      };
      io.pluginName = sa;
      var ul = function(g, S) {
        var y = S.instance, F = S.row, M = y.manualRowSelectedKey, k = M === void 0 ? "isSelected" : M, z = !1;
        return F.original && F.original[k] ? z = !0 : z = F.isSelected, [g, {
          onChange: function(ne) {
            F.toggleRowSelected(ne.target.checked);
          },
          style: {
            cursor: "pointer"
          },
          checked: z,
          title: "Toggle Row Selected",
          indeterminate: F.isSomeSelected
        }];
      }, oo = function(g, S) {
        var y = S.instance;
        return [g, {
          onChange: function(M) {
            y.toggleAllRowsSelected(M.target.checked);
          },
          style: {
            cursor: "pointer"
          },
          checked: y.isAllRowsSelected,
          title: "Toggle All Rows Selected",
          indeterminate: !!(!y.isAllRowsSelected && Object.keys(y.state.selectedRowIds).length)
        }];
      }, cl = function(g, S) {
        var y = S.instance;
        return [g, {
          onChange: function(M) {
            y.toggleAllPageRowsSelected(M.target.checked);
          },
          style: {
            cursor: "pointer"
          },
          checked: y.isAllPageRowsSelected,
          title: "Toggle All Current Page Rows Selected",
          indeterminate: !!(!y.isAllPageRowsSelected && y.page.some(function(F) {
            var M = F.id;
            return y.state.selectedRowIds[M];
          }))
        }];
      };
      function dl(p, g, S, y) {
        if (g.type === c.init)
          return o({
            selectedRowIds: {}
          }, p);
        if (g.type === c.resetSelectedRows)
          return o({}, p, {
            selectedRowIds: y.initialState.selectedRowIds || {}
          });
        if (g.type === c.toggleAllRowsSelected) {
          var F = g.value, M = y.isAllRowsSelected, k = y.rowsById, z = y.nonGroupedRowsById, q = z === void 0 ? k : z, ne = typeof F < "u" ? F : !M, le = Object.assign({}, p.selectedRowIds);
          return ne ? Object.keys(q).forEach(function(Ct) {
            le[Ct] = !0;
          }) : Object.keys(q).forEach(function(Ct) {
            delete le[Ct];
          }), o({}, p, {
            selectedRowIds: le
          });
        }
        if (g.type === c.toggleRowSelected) {
          var Oe = g.id, me = g.value, Ie = y.rowsById, Be = y.selectSubRows, pe = Be === void 0 ? !0 : Be, He = y.getSubRows, Qe = p.selectedRowIds[Oe], it = typeof me < "u" ? me : !Qe;
          if (Qe === it)
            return p;
          var Me = o({}, p.selectedRowIds), vt = function Ct(at) {
            var ct = Ie[at];
            if (ct && (ct.isGrouped || (it ? Me[at] = !0 : delete Me[at]), pe && He(ct)))
              return He(ct).forEach(function(Jt) {
                return Ct(Jt.id);
              });
          };
          return vt(Oe), o({}, p, {
            selectedRowIds: Me
          });
        }
        if (g.type === c.toggleAllPageRowsSelected) {
          var It = g.value, Le = y.page, Ge = y.rowsById, De = y.selectSubRows, qe = De === void 0 ? !0 : De, wt = y.isAllPageRowsSelected, xt = y.getSubRows, zt = typeof It < "u" ? It : !wt, Ye = o({}, p.selectedRowIds), wn = function Ct(at) {
            var ct = Ge[at];
            if (ct.isGrouped || (zt ? Ye[at] = !0 : delete Ye[at]), qe && xt(ct))
              return xt(ct).forEach(function(Jt) {
                return Ct(Jt.id);
              });
          };
          return Le.forEach(function(Ct) {
            return wn(Ct.id);
          }), o({}, p, {
            selectedRowIds: Ye
          });
        }
        return p;
      }
      function fl(p) {
        var g = p.data, S = p.rows, y = p.getHooks, F = p.plugins, M = p.rowsById, k = p.nonGroupedRowsById, z = k === void 0 ? M : k, q = p.autoResetSelectedRows, ne = q === void 0 ? !0 : q, le = p.state.selectedRowIds, Oe = p.selectSubRows, me = Oe === void 0 ? !0 : Oe, Ie = p.dispatch, Be = p.page, pe = p.getSubRows;
        D(F, ["useFilters", "useGroupBy", "useSortBy", "useExpanded", "usePagination"], "useRowSelect");
        var He = r.useMemo(function() {
          var wt = [];
          return S.forEach(function(xt) {
            var zt = me ? ua(xt, le, pe) : !!le[xt.id];
            xt.isSelected = !!zt, xt.isSomeSelected = zt === null, zt && wt.push(xt);
          }), wt;
        }, [S, me, le, pe]), Qe = !!(Object.keys(z).length && Object.keys(le).length), it = Qe;
        Qe && Object.keys(z).some(function(wt) {
          return !le[wt];
        }) && (Qe = !1), Qe || Be && Be.length && Be.some(function(wt) {
          var xt = wt.id;
          return !le[xt];
        }) && (it = !1);
        var Me = B(ne);
        U(function() {
          Me() && Ie({
            type: c.resetSelectedRows
          });
        }, [Ie, g]);
        var vt = r.useCallback(function(wt) {
          return Ie({
            type: c.toggleAllRowsSelected,
            value: wt
          });
        }, [Ie]), It = r.useCallback(function(wt) {
          return Ie({
            type: c.toggleAllPageRowsSelected,
            value: wt
          });
        }, [Ie]), Le = r.useCallback(function(wt, xt) {
          return Ie({
            type: c.toggleRowSelected,
            id: wt,
            value: xt
          });
        }, [Ie]), Ge = B(p), De = I(y().getToggleAllRowsSelectedProps, {
          instance: Ge()
        }), qe = I(y().getToggleAllPageRowsSelectedProps, {
          instance: Ge()
        });
        Object.assign(p, {
          selectedFlatRows: He,
          isAllRowsSelected: Qe,
          isAllPageRowsSelected: it,
          toggleRowSelected: Le,
          toggleAllRowsSelected: vt,
          getToggleAllRowsSelectedProps: De,
          getToggleAllPageRowsSelectedProps: qe,
          toggleAllPageRowsSelected: It
        });
      }
      function la(p, g) {
        var S = g.instance;
        p.toggleRowSelected = function(y) {
          return S.toggleRowSelected(p.id, y);
        }, p.getToggleRowSelectedProps = I(S.getHooks().getToggleRowSelectedProps, {
          instance: S,
          row: p
        });
      }
      function ua(p, g, S) {
        if (g[p.id])
          return !0;
        var y = S(p);
        if (y && y.length) {
          var F = !0, M = !1;
          return y.forEach(function(k) {
            M && !F || (ua(k, g, S) ? M = !0 : F = !1);
          }), F ? !0 : M ? null : !1;
        }
        return !1;
      }
      var ca = function(g) {
        return {};
      }, da = function(g) {
        return {};
      };
      c.setRowState = "setRowState", c.setCellState = "setCellState", c.resetRowState = "resetRowState";
      var fa = function(g) {
        g.stateReducers.push(ao), g.useInstance.push(f), g.prepareRow.push(C);
      };
      fa.pluginName = "useRowState";
      function ao(p, g, S, y) {
        var F = y.initialRowStateAccessor, M = F === void 0 ? ca : F, k = y.initialCellStateAccessor, z = k === void 0 ? da : k, q = y.rowsById;
        if (g.type === c.init)
          return o({
            rowState: {}
          }, p);
        if (g.type === c.resetRowState)
          return o({}, p, {
            rowState: y.initialState.rowState || {}
          });
        if (g.type === c.setRowState) {
          var ne, le = g.rowId, Oe = g.value, me = typeof p.rowState[le] < "u" ? p.rowState[le] : M(q[le]);
          return o({}, p, {
            rowState: o({}, p.rowState, (ne = {}, ne[le] = E(Oe, me), ne))
          });
        }
        if (g.type === c.setCellState) {
          var Ie, Be, pe, He, Qe, it = g.rowId, Me = g.columnId, vt = g.value, It = typeof p.rowState[it] < "u" ? p.rowState[it] : M(q[it]), Le = typeof (It == null || (Ie = It.cellState) == null ? void 0 : Ie[Me]) < "u" ? It.cellState[Me] : z((Be = q[it]) == null || (pe = Be.cells) == null ? void 0 : pe.find(function(Ge) {
            return Ge.column.id === Me;
          }));
          return o({}, p, {
            rowState: o({}, p.rowState, (Qe = {}, Qe[it] = o({}, It, {
              cellState: o({}, It.cellState || {}, (He = {}, He[Me] = E(vt, Le), He))
            }), Qe))
          });
        }
      }
      function f(p) {
        var g = p.autoResetRowState, S = g === void 0 ? !0 : g, y = p.data, F = p.dispatch, M = r.useCallback(function(q, ne) {
          return F({
            type: c.setRowState,
            rowId: q,
            value: ne
          });
        }, [F]), k = r.useCallback(function(q, ne, le) {
          return F({
            type: c.setCellState,
            rowId: q,
            columnId: ne,
            value: le
          });
        }, [F]), z = B(S);
        U(function() {
          z() && F({
            type: c.resetRowState
          });
        }, [y]), Object.assign(p, {
          setRowState: M,
          setCellState: k
        });
      }
      function C(p, g) {
        var S = g.instance, y = S.initialRowStateAccessor, F = y === void 0 ? ca : y, M = S.initialCellStateAccessor, k = M === void 0 ? da : M, z = S.state.rowState;
        p && (p.state = typeof z[p.id] < "u" ? z[p.id] : F(p), p.setState = function(q) {
          return S.setRowState(p.id, q);
        }, p.cells.forEach(function(q) {
          p.state.cellState || (p.state.cellState = {}), q.state = typeof p.state.cellState[q.column.id] < "u" ? p.state.cellState[q.column.id] : k(q), q.setState = function(ne) {
            return S.setCellState(p.id, q.column.id, ne);
          };
        }));
      }
      c.resetColumnOrder = "resetColumnOrder", c.setColumnOrder = "setColumnOrder";
      var R = function(g) {
        g.stateReducers.push(P), g.visibleColumnsDeps.push(function(S, y) {
          var F = y.instance;
          return [].concat(S, [F.state.columnOrder]);
        }), g.visibleColumns.push(V), g.useInstance.push(N);
      };
      R.pluginName = "useColumnOrder";
      function P(p, g, S, y) {
        if (g.type === c.init)
          return o({
            columnOrder: []
          }, p);
        if (g.type === c.resetColumnOrder)
          return o({}, p, {
            columnOrder: y.initialState.columnOrder || []
          });
        if (g.type === c.setColumnOrder)
          return o({}, p, {
            columnOrder: E(g.columnOrder, p.columnOrder)
          });
      }
      function V(p, g) {
        var S = g.instance.state.columnOrder;
        if (!S || !S.length)
          return p;
        for (var y = [].concat(S), F = [].concat(p), M = [], k = function() {
          var q = y.shift(), ne = F.findIndex(function(le) {
            return le.id === q;
          });
          ne > -1 && M.push(F.splice(ne, 1)[0]);
        }; F.length && y.length; )
          k();
        return [].concat(M, F);
      }
      function N(p) {
        var g = p.dispatch;
        p.setColumnOrder = r.useCallback(function(S) {
          return g({
            type: c.setColumnOrder,
            columnOrder: S
          });
        }, [g]);
      }
      x.canResize = !0, c.columnStartResizing = "columnStartResizing", c.columnResizing = "columnResizing", c.columnDoneResizing = "columnDoneResizing", c.resetResize = "resetResize";
      var j = function(g) {
        g.getResizerProps = [te], g.getHeaderProps.push({
          style: {
            position: "relative"
          }
        }), g.stateReducers.push(ae), g.useInstance.push(Ae), g.useInstanceBeforeDimensions.push(se);
      }, te = function(g, S) {
        var y = S.instance, F = S.header, M = y.dispatch, k = function(q, ne) {
          var le = !1;
          if (q.type === "touchstart") {
            if (q.touches && q.touches.length > 1)
              return;
            le = !0;
          }
          var Oe = Ce(ne), me = Oe.map(function(Le) {
            return [Le.id, Le.totalWidth];
          }), Ie = le ? Math.round(q.touches[0].clientX) : q.clientX, Be, pe, He = function() {
            window.cancelAnimationFrame(Be), Be = null, M({
              type: c.columnDoneResizing
            });
          }, Qe = function() {
            window.cancelAnimationFrame(Be), Be = null, M({
              type: c.columnResizing,
              clientX: pe
            });
          }, it = function(Ge) {
            pe = Ge, Be || (Be = window.requestAnimationFrame(Qe));
          }, Me = {
            mouse: {
              moveEvent: "mousemove",
              moveHandler: function(Ge) {
                return it(Ge.clientX);
              },
              upEvent: "mouseup",
              upHandler: function(Ge) {
                document.removeEventListener("mousemove", Me.mouse.moveHandler), document.removeEventListener("mouseup", Me.mouse.upHandler), He();
              }
            },
            touch: {
              moveEvent: "touchmove",
              moveHandler: function(Ge) {
                return Ge.cancelable && (Ge.preventDefault(), Ge.stopPropagation()), it(Ge.touches[0].clientX), !1;
              },
              upEvent: "touchend",
              upHandler: function(Ge) {
                document.removeEventListener(Me.touch.moveEvent, Me.touch.moveHandler), document.removeEventListener(Me.touch.upEvent, Me.touch.moveHandler), He();
              }
            }
          }, vt = le ? Me.touch : Me.mouse, It = ge() ? {
            passive: !1
          } : !1;
          document.addEventListener(vt.moveEvent, vt.moveHandler, It), document.addEventListener(vt.upEvent, vt.upHandler, It), M({
            type: c.columnStartResizing,
            columnId: ne.id,
            columnWidth: ne.totalWidth,
            headerIdWidths: me,
            clientX: Ie
          });
        };
        return [g, {
          onMouseDown: function(q) {
            return q.persist() || k(q, F);
          },
          onTouchStart: function(q) {
            return q.persist() || k(q, F);
          },
          style: {
            cursor: "col-resize"
          },
          draggable: !1,
          role: "separator"
        }];
      };
      j.pluginName = "useResizeColumns";
      function ae(p, g) {
        if (g.type === c.init)
          return o({
            columnResizing: {
              columnWidths: {}
            }
          }, p);
        if (g.type === c.resetResize)
          return o({}, p, {
            columnResizing: {
              columnWidths: {}
            }
          });
        if (g.type === c.columnStartResizing) {
          var S = g.clientX, y = g.columnId, F = g.columnWidth, M = g.headerIdWidths;
          return o({}, p, {
            columnResizing: o({}, p.columnResizing, {
              startX: S,
              headerIdWidths: M,
              columnWidth: F,
              isResizingColumn: y
            })
          });
        }
        if (g.type === c.columnResizing) {
          var k = g.clientX, z = p.columnResizing, q = z.startX, ne = z.columnWidth, le = z.headerIdWidths, Oe = le === void 0 ? [] : le, me = k - q, Ie = me / ne, Be = {};
          return Oe.forEach(function(pe) {
            var He = pe[0], Qe = pe[1];
            Be[He] = Math.max(Qe + Qe * Ie, 0);
          }), o({}, p, {
            columnResizing: o({}, p.columnResizing, {
              columnWidths: o({}, p.columnResizing.columnWidths, {}, Be)
            })
          });
        }
        if (g.type === c.columnDoneResizing)
          return o({}, p, {
            columnResizing: o({}, p.columnResizing, {
              startX: null,
              isResizingColumn: null
            })
          });
      }
      var se = function(g) {
        var S = g.flatHeaders, y = g.disableResizing, F = g.getHooks, M = g.state.columnResizing, k = B(g);
        S.forEach(function(z) {
          var q = A(z.disableResizing === !0 ? !1 : void 0, y === !0 ? !1 : void 0, !0);
          z.canResize = q, z.width = M.columnWidths[z.id] || z.originalWidth || z.width, z.isResizing = M.isResizingColumn === z.id, q && (z.getResizerProps = I(F().getResizerProps, {
            instance: k(),
            header: z
          }));
        });
      };
      function Ae(p) {
        var g = p.plugins, S = p.dispatch, y = p.autoResetResize, F = y === void 0 ? !0 : y, M = p.columns;
        D(g, ["useAbsoluteLayout"], "useResizeColumns");
        var k = B(F);
        U(function() {
          k() && S({
            type: c.resetResize
          });
        }, [M]);
        var z = r.useCallback(function() {
          return S({
            type: c.resetResize
          });
        }, [S]);
        Object.assign(p, {
          resetResizing: z
        });
      }
      function Ce(p) {
        var g = [], S = function y(F) {
          F.columns && F.columns.length && F.columns.map(y), g.push(F);
        };
        return S(p), g;
      }
      var Se = {
        position: "absolute",
        top: 0
      }, de = function(g) {
        g.getTableBodyProps.push(xe), g.getRowProps.push(xe), g.getHeaderGroupProps.push(xe), g.getFooterGroupProps.push(xe), g.getHeaderProps.push(function(S, y) {
          var F = y.column;
          return [S, {
            style: o({}, Se, {
              left: F.totalLeft + "px",
              width: F.totalWidth + "px"
            })
          }];
        }), g.getCellProps.push(function(S, y) {
          var F = y.cell;
          return [S, {
            style: o({}, Se, {
              left: F.column.totalLeft + "px",
              width: F.column.totalWidth + "px"
            })
          }];
        }), g.getFooterProps.push(function(S, y) {
          var F = y.column;
          return [S, {
            style: o({}, Se, {
              left: F.totalLeft + "px",
              width: F.totalWidth + "px"
            })
          }];
        });
      };
      de.pluginName = "useAbsoluteLayout";
      var xe = function(g, S) {
        var y = S.instance;
        return [g, {
          style: {
            position: "relative",
            width: y.totalColumnsWidth + "px"
          }
        }];
      }, Ne = {
        display: "inline-block",
        boxSizing: "border-box"
      }, Ve = function(g, S) {
        var y = S.instance;
        return [g, {
          style: {
            display: "flex",
            width: y.totalColumnsWidth + "px"
          }
        }];
      }, Je = function(g) {
        g.getRowProps.push(Ve), g.getHeaderGroupProps.push(Ve), g.getFooterGroupProps.push(Ve), g.getHeaderProps.push(function(S, y) {
          var F = y.column;
          return [S, {
            style: o({}, Ne, {
              width: F.totalWidth + "px"
            })
          }];
        }), g.getCellProps.push(function(S, y) {
          var F = y.cell;
          return [S, {
            style: o({}, Ne, {
              width: F.column.totalWidth + "px"
            })
          }];
        }), g.getFooterProps.push(function(S, y) {
          var F = y.column;
          return [S, {
            style: o({}, Ne, {
              width: F.totalWidth + "px"
            })
          }];
        });
      };
      Je.pluginName = "useBlockLayout";
      function yt(p) {
        p.getTableProps.push(Ue), p.getRowProps.push(Pe), p.getHeaderGroupProps.push(Pe), p.getFooterGroupProps.push(Pe), p.getHeaderProps.push(mt), p.getCellProps.push(Xe), p.getFooterProps.push(ut);
      }
      yt.pluginName = "useFlexLayout";
      var Ue = function(g, S) {
        var y = S.instance;
        return [g, {
          style: {
            minWidth: y.totalColumnsMinWidth + "px"
          }
        }];
      }, Pe = function(g, S) {
        var y = S.instance;
        return [g, {
          style: {
            display: "flex",
            flex: "1 0 auto",
            minWidth: y.totalColumnsMinWidth + "px"
          }
        }];
      }, mt = function(g, S) {
        var y = S.column;
        return [g, {
          style: {
            boxSizing: "border-box",
            flex: y.totalFlexWidth ? y.totalFlexWidth + " 0 auto" : void 0,
            minWidth: y.totalMinWidth + "px",
            width: y.totalWidth + "px"
          }
        }];
      }, Xe = function(g, S) {
        var y = S.cell;
        return [g, {
          style: {
            boxSizing: "border-box",
            flex: y.column.totalFlexWidth + " 0 auto",
            minWidth: y.column.totalMinWidth + "px",
            width: y.column.totalWidth + "px"
          }
        }];
      }, ut = function(g, S) {
        var y = S.column;
        return [g, {
          style: {
            boxSizing: "border-box",
            flex: y.totalFlexWidth ? y.totalFlexWidth + " 0 auto" : void 0,
            minWidth: y.totalMinWidth + "px",
            width: y.totalWidth + "px"
          }
        }];
      };
      c.columnStartResizing = "columnStartResizing", c.columnResizing = "columnResizing", c.columnDoneResizing = "columnDoneResizing", c.resetResize = "resetResize";
      function Tt(p) {
        p.stateReducers.push(gt), p.getTableProps.push(nt), p.getHeaderProps.push(ot), p.getRowProps.push(_t);
      }
      Tt.pluginName = "useGridLayout";
      var nt = function(g, S) {
        var y = S.instance, F = y.visibleColumns.map(function(M) {
          var k;
          return y.state.gridLayout.columnWidths[M.id] ? y.state.gridLayout.columnWidths[M.id] + "px" : (k = y.state.columnResizing) != null && k.isResizingColumn ? y.state.gridLayout.startWidths[M.id] + "px" : typeof M.width == "number" ? M.width + "px" : M.width;
        });
        return [g, {
          style: {
            display: "grid",
            gridTemplateColumns: F.join(" ")
          }
        }];
      }, ot = function(g, S) {
        var y = S.column;
        return [g, {
          id: "header-cell-" + y.id,
          style: {
            position: "sticky",
            //enables a scroll wrapper to be placed around the table and have sticky headers
            gridColumn: "span " + y.totalVisibleHeaderCount
          }
        }];
      }, _t = function(g, S) {
        var y = S.row;
        return y.isExpanded ? [g, {
          style: {
            gridColumn: "1 / " + (y.cells.length + 1)
          }
        }] : [g, {}];
      };
      function gt(p, g, S, y) {
        if (g.type === c.init)
          return o({
            gridLayout: {
              columnWidths: {}
            }
          }, p);
        if (g.type === c.resetResize)
          return o({}, p, {
            gridLayout: {
              columnWidths: {}
            }
          });
        if (g.type === c.columnStartResizing) {
          var F = g.columnId, M = g.headerIdWidths, k = Ft(F);
          if (k !== void 0) {
            var z = y.visibleColumns.reduce(function(Le, Ge) {
              var De;
              return o({}, Le, (De = {}, De[Ge.id] = Ft(Ge.id), De));
            }, {}), q = y.visibleColumns.reduce(function(Le, Ge) {
              var De;
              return o({}, Le, (De = {}, De[Ge.id] = Ge.minWidth, De));
            }, {}), ne = y.visibleColumns.reduce(function(Le, Ge) {
              var De;
              return o({}, Le, (De = {}, De[Ge.id] = Ge.maxWidth, De));
            }, {}), le = M.map(function(Le) {
              var Ge = Le[0];
              return [Ge, Ft(Ge)];
            });
            return o({}, p, {
              gridLayout: o({}, p.gridLayout, {
                startWidths: z,
                minWidths: q,
                maxWidths: ne,
                headerIdGridWidths: le,
                columnWidth: k
              })
            });
          } else
            return p;
        }
        if (g.type === c.columnResizing) {
          var Oe = g.clientX, me = p.columnResizing.startX, Ie = p.gridLayout, Be = Ie.columnWidth, pe = Ie.minWidths, He = Ie.maxWidths, Qe = Ie.headerIdGridWidths, it = Qe === void 0 ? [] : Qe, Me = Oe - me, vt = Me / Be, It = {};
          return it.forEach(function(Le) {
            var Ge = Le[0], De = Le[1];
            It[Ge] = Math.min(Math.max(pe[Ge], De + De * vt), He[Ge]);
          }), o({}, p, {
            gridLayout: o({}, p.gridLayout, {
              columnWidths: o({}, p.gridLayout.columnWidths, {}, It)
            })
          });
        }
        if (g.type === c.columnDoneResizing)
          return o({}, p, {
            gridLayout: o({}, p.gridLayout, {
              startWidths: {},
              minWidths: {},
              maxWidths: {}
            })
          });
      }
      function Ft(p) {
        var g, S = (g = document.getElementById("header-cell-" + p)) == null ? void 0 : g.offsetWidth;
        if (S !== void 0)
          return S;
      }
      n._UNSTABLE_usePivotColumns = ra, n.actions = c, n.defaultColumn = x, n.defaultGroupByFn = Zo, n.defaultOrderByFn = eo, n.defaultRenderer = m, n.emptyRenderer = h, n.ensurePluginOrder = D, n.flexRender = oe, n.functionalUpdate = E, n.loopHooks = T, n.makePropGetter = I, n.makeRenderer = Fe, n.reduceHooks = O, n.safeUseLayoutEffect = X, n.useAbsoluteLayout = de, n.useAsyncDebounce = K, n.useBlockLayout = Je, n.useColumnOrder = R, n.useExpanded = Mr, n.useFilters = L, n.useFlexLayout = yt, n.useGetLatest = B, n.useGlobalFilter = lt, n.useGridLayout = Tt, n.useGroupBy = Qi, n.useMountedLayoutEffect = U, n.usePagination = ta, n.useResizeColumns = j, n.useRowSelect = io, n.useRowState = fa, n.useSortBy = Qo, n.useTable = $n, Object.defineProperty(n, "__esModule", { value: !0 });
    });
  }(vo, vo.exports)), vo.exports;
}
var Zd;
function uw() {
  if (Zd) return Pa.exports;
  Zd = 1;
  var e = {};
  return e.NODE_ENV === "production" ? Pa.exports = aw() : Pa.exports = lw(), Pa.exports;
}
var Ml = uw();
const Ec = Nt("direction", {
  ltr: "ltr",
  rtl: "rtl"
}), Ou = Nt("direction", {
  ltr: "right",
  rtl: "left"
}), os = Nt("direction", {
  ltr: "left",
  rtl: "right"
}), lr = Nt("direction", {
  ltr: "margin-right",
  rtl: "margin-left"
}), Ar = Nt("direction", {
  ltr: "margin-left",
  rtl: "margin-right"
}), Jd = Nt("direction", {
  ltr: "padding-left",
  rtl: "padding-right"
});
Nt("direction", {
  ltr: "padding-right",
  rtl: "padding-left"
});
Nt("direction", {
  ltr: "border-top-left-radius",
  rtl: "border-top-right-radius"
});
Nt("direction", {
  ltr: "border-bottom-left-radius",
  rtl: "border-bottom-right-radius"
});
Nt("direction", {
  ltr: "border-top-right-radius",
  rtl: "border-top-left-radius'"
});
Nt("direction", {
  ltr: "border-bottom-right-radius",
  rtl: "border-bottom-left-radius"
});
Nt("direction", {
  ltr: "border-left",
  rtl: "border-right"
});
Nt("direction", {
  ltr: "border-right",
  rtl: "border-left"
});
const cw = Nt("direction", {
  ltr: "translate(-50%, -50%);",
  rtl: "translate(50%, -50%);"
});
Nt("direction", {
  ltr: "scale(1, 1)",
  rtl: "scale(1, -1)"
});
Nt("direction", {
  ltr: "border-right-color",
  rtl: "border-left-color"
});
Nt("direction", {
  ltr: "row nowrap",
  rtl: "row-reverse nowrap"
});
Nt("direction", {
  ltr: "row",
  rtl: "row-reverse"
});
Nt("direction", {
  ltr: "translateX(0)",
  rtl: "translateX(0)"
});
Nt("direction", {
  ltr: "translateX(calc(0%))",
  rtl: "translateX(calc(100%))"
});
Nt("border", {
  on: "15px",
  off: "5px"
});
Nt("shadow", {
  on: "0 10px 30px 1px rgba(0, 0, 0, 0.06)",
  off: "none"
});
const dw = dt(qb)`
  text-align: ${os};

  &:last-child {
    margin-bottom: 0;
  }

  table {
    width: inherit;
  }

  thead tr {
    position: sticky;
    top: 0;
    border-top: none;
  }

  thead th {
    min-height: 45px;
    min-width: 120px;
    padding: 10px;
    top: 0;
    position: sticky;
    color: ${Li};
    border-bottom: 2px solid ${ja};
    border-bottom-color: ${ja} !important;
    background: ${Is} !important;
    verticle-align: top;

    &:first-child {
      min-width: 45px;
    }
  }

  tbody td,
  tfoot td,
  th {
    border: none;
    padding: 10px;
    color: ${Nl};
  }

  th {
    vertical-align: top;
    background: transparent !important;

    &:first-child {
      padding-left: 10px;
    }

    &:last-child {
      padding-right: 10px;
    }
  }
  td {
    vertical-align: middle;
    background: transparent !important;

    &:first-child {
      padding-left: 10px;
    }

    &:last-child {
      padding-right: 10px;
    }
  }

  .badge {
    font-size: 100%;
  }

  tfoot {
    tr {
      border-bottom: none;
    }
    td {
      min-height: 45px;
      max-width: 100px;
      padding: 10px 5px 10px 5px;
      font-family: 'Roboto', sans-serif;
      color: ${Li};
      font-weight: 700;

      &:first-child {
        min-width: 45px;
        white-space: nowrap;
      }
    }
  }

  ${(e) => e.bordered && `
    text-align: ${os(e)};

    tr {
      border-top: none;
      border-bottom: 1px solid ${ja(e)};
    }
    
    tbody tr:last-child {
      border-bottom: none;
    }
    // tr:hover {
    //   background-color: ${Aa(e)};
    // }
  `}

  ${(e) => e.headAccent && `

    thead {
      color: ${Nl(e)};
      background-color: ${Aa(e)};

      th {
        border-bottom: none;
      }
    }
  `}

  ${(e) => e.striped && `

    tbody tr:nth-of-type(odd) {
      --bs-table-accent-bg: ${Aa(e)};
      background-color: ${Aa(e)};
      --bs-table-striped-color: ${Nl(e)};
    }
    
  `}

  &.table-hover {
    tbody tr {
      transition: all 0.3s;
      cursor: pointer;

      &:hover {
        background-color: ${rs};
      }
    }
  }

  &.react-table {
    thead tr {
      position: sticky;
      top: 0;
      background: white;
    }
  }

  .react-table__column-header {
    &.sortable {
      cursor: pointer;

      svg {
        width: 16px;
        height: 16px;
        ${Ou}: -20px;
      }
    }
  }
`;
var Vl, Ud;
function fw() {
  if (Ud) return Vl;
  Ud = 1;
  function e(o) {
    return o && typeof o == "object" && "default" in o ? o.default : o;
  }
  var t = e(cn), n = Object.assign || function(o) {
    for (var l = 1; l < arguments.length; l++) {
      var u = arguments[l];
      for (var s in u)
        Object.prototype.hasOwnProperty.call(u, s) && (o[s] = u[s]);
    }
    return o;
  }, r = function(o, l) {
    var u = {};
    for (var s in o)
      l.indexOf(s) >= 0 || Object.prototype.hasOwnProperty.call(o, s) && (u[s] = o[s]);
    return u;
  }, i = function(l) {
    var u = l.color, s = u === void 0 ? "currentColor" : u, d = l.size, c = d === void 0 ? 24 : d;
    l.children;
    var m = r(l, ["color", "size", "children"]), h = "mdi-icon " + (m.className || "");
    return t.createElement(
      "svg",
      n({}, m, { className: h, width: c, height: c, fill: s, viewBox: "0 0 24 24" }),
      t.createElement("path", { d: "M8.59,16.58L13.17,12L8.59,7.41L10,6L16,12L10,18L8.59,16.58Z" })
    );
  }, a = t.memo ? t.memo(i) : i;
  return Vl = a, Vl;
}
var pw = fw();
const gw = /* @__PURE__ */ Hn(pw);
var Ll, qd;
function hw() {
  if (qd) return Ll;
  qd = 1;
  function e(o) {
    return o && typeof o == "object" && "default" in o ? o.default : o;
  }
  var t = e(cn), n = Object.assign || function(o) {
    for (var l = 1; l < arguments.length; l++) {
      var u = arguments[l];
      for (var s in u)
        Object.prototype.hasOwnProperty.call(u, s) && (o[s] = u[s]);
    }
    return o;
  }, r = function(o, l) {
    var u = {};
    for (var s in o)
      l.indexOf(s) >= 0 || Object.prototype.hasOwnProperty.call(o, s) && (u[s] = o[s]);
    return u;
  }, i = function(l) {
    var u = l.color, s = u === void 0 ? "currentColor" : u, d = l.size, c = d === void 0 ? 24 : d;
    l.children;
    var m = r(l, ["color", "size", "children"]), h = "mdi-icon " + (m.className || "");
    return t.createElement(
      "svg",
      n({}, m, { className: h, width: c, height: c, fill: s, viewBox: "0 0 24 24" }),
      t.createElement("path", { d: "M5.59,7.41L7,6L13,12L7,18L5.59,16.59L10.17,12L5.59,7.41M11.59,7.41L13,6L19,12L13,18L11.59,16.59L16.17,12L11.59,7.41Z" })
    );
  }, a = t.memo ? t.memo(i) : i;
  return Ll = a, Ll;
}
var mw = hw();
const vw = /* @__PURE__ */ Hn(mw);
var Dl, Qd;
function bw() {
  if (Qd) return Dl;
  Qd = 1;
  function e(o) {
    return o && typeof o == "object" && "default" in o ? o.default : o;
  }
  var t = e(cn), n = Object.assign || function(o) {
    for (var l = 1; l < arguments.length; l++) {
      var u = arguments[l];
      for (var s in u)
        Object.prototype.hasOwnProperty.call(u, s) && (o[s] = u[s]);
    }
    return o;
  }, r = function(o, l) {
    var u = {};
    for (var s in o)
      l.indexOf(s) >= 0 || Object.prototype.hasOwnProperty.call(o, s) && (u[s] = o[s]);
    return u;
  }, i = function(l) {
    var u = l.color, s = u === void 0 ? "currentColor" : u, d = l.size, c = d === void 0 ? 24 : d;
    l.children;
    var m = r(l, ["color", "size", "children"]), h = "mdi-icon " + (m.className || "");
    return t.createElement(
      "svg",
      n({}, m, { className: h, width: c, height: c, fill: s, viewBox: "0 0 24 24" }),
      t.createElement("path", { d: "M15.41,16.58L10.83,12L15.41,7.41L14,6L8,12L14,18L15.41,16.58Z" })
    );
  }, a = t.memo ? t.memo(i) : i;
  return Dl = a, Dl;
}
var yw = bw();
const ww = /* @__PURE__ */ Hn(yw);
var jl, Kd;
function xw() {
  if (Kd) return jl;
  Kd = 1;
  function e(o) {
    return o && typeof o == "object" && "default" in o ? o.default : o;
  }
  var t = e(cn), n = Object.assign || function(o) {
    for (var l = 1; l < arguments.length; l++) {
      var u = arguments[l];
      for (var s in u)
        Object.prototype.hasOwnProperty.call(u, s) && (o[s] = u[s]);
    }
    return o;
  }, r = function(o, l) {
    var u = {};
    for (var s in o)
      l.indexOf(s) >= 0 || Object.prototype.hasOwnProperty.call(o, s) && (u[s] = o[s]);
    return u;
  }, i = function(l) {
    var u = l.color, s = u === void 0 ? "currentColor" : u, d = l.size, c = d === void 0 ? 24 : d;
    l.children;
    var m = r(l, ["color", "size", "children"]), h = "mdi-icon " + (m.className || "");
    return t.createElement(
      "svg",
      n({}, m, { className: h, width: c, height: c, fill: s, viewBox: "0 0 24 24" }),
      t.createElement("path", { d: "M18.41,7.41L17,6L11,12L17,18L18.41,16.59L13.83,12L18.41,7.41M12.41,7.41L11,6L5,12L11,18L12.41,16.59L7.83,12L12.41,7.41Z" })
    );
  }, a = t.memo ? t.memo(i) : i;
  return jl = a, jl;
}
var Cw = xw();
const Sw = /* @__PURE__ */ Hn(Cw), eh = ({
  page: e,
  gotoPage: t,
  canPreviousPage: n,
  pageOptions: r,
  pageSize: i,
  pageIndex: a,
  previousPage: o,
  nextPage: l,
  canNextPage: u,
  totalRecords: s
}) => {
  const d = a - 2 < 0 ? r.slice(0, a + 3) : r.slice(a - 1, a + 3);
  return /* @__PURE__ */ W.jsxs(Iw, { children: [
    /* @__PURE__ */ W.jsxs(Ai, { children: [
      /* @__PURE__ */ W.jsx(
        Ai.First,
        {
          disabled: !n,
          className: "pagination__item--arrow",
          onClick: () => t(0),
          children: /* @__PURE__ */ W.jsx(Sw, {})
        }
      ),
      /* @__PURE__ */ W.jsx(
        Ai.Prev,
        {
          disabled: !n,
          className: "pagination__item--arrow",
          onClick: o,
          children: /* @__PURE__ */ W.jsx(ww, {})
        }
      ),
      d.map((c) => /* @__PURE__ */ W.jsx(Ai.Item, { active: a === c, onClick: () => t(c), children: c + 1 }, c)),
      /* @__PURE__ */ W.jsx(
        Ai.Next,
        {
          disabled: !u,
          className: "pagination__item--arrow",
          onClick: l,
          children: /* @__PURE__ */ W.jsx(gw, {})
        }
      ),
      /* @__PURE__ */ W.jsx(
        Ai.Last,
        {
          disabled: !u,
          className: "pagination__item--arrow",
          onClick: () => t(r.length - 1),
          children: /* @__PURE__ */ W.jsx(vw, {})
        }
      )
    ] }),
    /* @__PURE__ */ W.jsxs(th, { children: [
      "Showing ",
      i * a + 1,
      " to ",
      i * a + e.length,
      " of ",
      s
    ] })
  ] });
};
eh.propTypes = {
  page: _e.arrayOf(_e.shape()),
  gotoPage: _e.func,
  canNextPage: _e.bool,
  canPreviousPage: _e.bool,
  pageOptions: _e.arrayOf(_e.number),
  pageSize: _e.number,
  pageIndex: _e.number,
  previousPage: _e.func,
  nextPage: _e.func,
  totalRecords: _e.any
};
const Iw = dt.div`
  display: flex;
  align-items: center;

  @media screen and (max-width: 768px) {
    flex-direction: column-reverse;

    & > * {
      margin: 10px 0;
    }
  }

  .page-item {
    ${lr}: 2px;

    .page-link {
      background: transparent;
      border: none;
      color: ${Mn};
      height: 28px;
      font-size: 10px;
      padding: 5px;
      text-align: center;
      min-width: 28px;
      transition: all 0.3s;

      &:hover {
        color: ${xr};
        background: transparent;
      }

      &:focus,
      &:active {
        box-shadow: none;
      }

      svg {
        width: 13px;
        height: 13px;
        fill: ${Mn};
        transition: 0.3s;
        position: absolute;
        top: 7px;
        left: 8px;
      }
    }

    &.pagination__item--arrow .page-link {
      border-radius: 50%;
      width: 28px;
      height: 28px;
      background: ${Di};

      &:hover {
        background: ${xr};

        svg {
          fill: white;
        }
      }
    }

    &.pagination__item--arrow.disabled .page-link {
      cursor: default;
      opacity: 0.4;
      background: ${Di};

      svg {
        fill: ${Mn};
      }
    }

    &.active .page-link {
      background-color: transparent;
      font-weight: bold;
      color: ${Li};
    }

    &.disabled .page-link svg {
      fill: ${M0};
    }
  }
`, th = dt.div`
  color: ${Mn};
  font-size: 12px;
  ${lr}: 0;
  ${Ar}: 10px;
`;
dt(th)`
  ${Ar}: 20px;
  color: ${Mn};
`;
dt($b.Select)`
  color: ${Mn};
  font-size: 12px;
  background-color: ${Is};
  padding: 6px 12px;
  appearance: auto;
  background-image: none;
`;
dt.option`
  color: ${Mn};
  font-size: 14px;
`;
const nh = ({ color: e }) => /* @__PURE__ */ W.jsxs(Rw, { className: "bouncing-loader", color: e, children: [
  /* @__PURE__ */ W.jsx("div", {}),
  /* @__PURE__ */ W.jsx("div", {}),
  /* @__PURE__ */ W.jsx("div", {}),
  /* @__PURE__ */ W.jsx("div", {})
] });
nh.propTypes = {
  color: _e.any
};
const Rw = dt.div`
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 15px 0 0 0;
  // height: 32px;
  background: transparent !important;

  & > div {
    width: 5px;
    height: 5px;
    background: ${(e) => e.color || Fi};
    border-radius: 50%;
    margin: 0 2.5px;
    display: block;
    -webkit-animation-play-state: running;
    animation-play-state: running;
  }

  & > div:nth-child(1) {
    opacity: 0;
    -webkit-animation: bouncing-loader 0.5s linear infinite;
    animation: bouncing-loader 0.5s linear infinite;
    -webkit-transform: translateX(-9.375px);
    -ms-transform: translateX(-9.375px);
    transform: translateX(-9.375px);
  }

  & > div:nth-child(2) {
    -webkit-animation: bouncing-loader 0.5s linear infinite;
    animation: bouncing-loader 0.5s linear infinite;
  }
  & > div:nth-child(3) {
    -webkit-animation: bouncing-loader 0.5s linear infinite;
    animation: bouncing-loader 0.5s linear infinite;
  }
  & > div:nth-child(4) {
    -webkit-animation: bouncing-loader-out 0.5s linear infinite;
    animation: bouncing-loader-out 0.5s linear infinite;
  }
  @keyframes bouncing-loader {
    to {
      opacity: 1;
      transform: translateX(9.375px);
      filter: none;
    }
  }
  @keyframes bouncing-loader-out {
    to {
      transform: translateX(18.75px);
      opacity: 0;
    }
  }
`, rh = ({ page: e, getTableBodyProps: t, prepareRow: n, onRowClick: r, loading: i, isClickable: a }) => /* @__PURE__ */ W.jsxs(
  "tbody",
  {
    ...t(),
    style: {
      cursor: a ? "pointer" : "default",
      position: "relative",
      height: "100%"
    },
    children: [
      i && /* @__PURE__ */ W.jsx(
        "tr",
        {
          style: {
            width: "100%",
            height: "100%",
            position: "absolute",
            textAlign: "center",
            alignContent: "center",
            backgroundColor: "rgba(242, 244, 247, 0.2)",
            backdropFilter: "blur(2px)"
          },
          children: /* @__PURE__ */ W.jsx(
            "td",
            {
              style: {
                display: "flex",
                textAlign: "center",
                alignContent: "center",
                justifyContent: "center"
              },
              children: /* @__PURE__ */ W.jsx(nh, {})
            }
          )
        }
      ),
      e.map((o) => (n(o), /* @__PURE__ */ Ao(
        "tr",
        {
          ...o.getRowProps(),
          onClick: () => a ? r(o.original) : null,
          key: o.id
        },
        o.cells.map((l) => /* @__PURE__ */ Ao("td", { ...l.getCellProps(), key: l.value }, l.render("Cell")))
      )))
    ]
  }
);
rh.propTypes = {
  page: _e.any,
  getTableBodyProps: _e.any,
  prepareRow: _e.any,
  onRowClick: _e.any,
  loading: _e.any,
  isClickable: _e.any
};
const ih = ({ headerGroups: e }) => {
  const t = e.map((n, r) => ({
    id: r + 1,
    ...n
  }));
  return /* @__PURE__ */ W.jsx("thead", { children: t == null ? void 0 : t.map((n) => /* @__PURE__ */ Ao("tr", { ...n.getHeaderGroupProps(), className: "react-table thead tr", key: n.id }, n.headers.map((r) => /* @__PURE__ */ Ao("th", { ...r.getHeaderProps(r.getSortByToggleProps()), key: r.id }, /* @__PURE__ */ W.jsx("div", { style: { display: "flex" }, children: /* @__PURE__ */ W.jsx("span", { className: "react-table__column-header", children: r.render("Header") }) }))))) });
};
ih.propTypes = {
  headerGroups: _e.any
};
const oh = ({ columns: e, data: t, loading: n, pagination: r, fetchData: i, totalRecords: a, onRowClick: o }) => {
  const { pageCount: l, pageSize: u } = r, {
    getTableProps: s,
    getTableBodyProps: d,
    headerGroups: c,
    prepareRow: m,
    page: h,
    canPreviousPage: x,
    canNextPage: v,
    pageOptions: b,
    gotoPage: I,
    nextPage: O,
    previousPage: T,
    setPageSize: D,
    state: { pageIndex: E, pageSize: B, sortBy: X }
  } = Ml.useTable(
    {
      columns: e,
      data: t,
      manualPagination: !0,
      manualSortBy: !0,
      pageCount: l,
      initialState: { pageIndex: 0, pageSize: u }
    },
    Ml.useSortBy,
    Ml.usePagination
  ), U = [10, 20, 30, 40];
  return Jr(() => {
    i({ pageIndex: E, pageSize: B, sortBy: X });
  }, [E, B, X]), /* @__PURE__ */ W.jsxs("div", { children: [
    /* @__PURE__ */ W.jsx(Ew, { children: /* @__PURE__ */ W.jsxs(dw, { ...s(), bordered: !0, children: [
      /* @__PURE__ */ W.jsx(ih, { headerGroups: c }),
      /* @__PURE__ */ W.jsx(
        rh,
        {
          page: h,
          prepareRow: m,
          getTableBodyProps: d,
          onRowClick: o,
          loading: n
        }
      )
    ] }) }),
    Object.keys(r).length > 0 && /* @__PURE__ */ W.jsx(
      eh,
      {
        page: h,
        gotoPage: I,
        canPreviousPage: x,
        pageOptions: b,
        pageSize: u,
        pageIndex: E,
        previousPage: T,
        nextPage: O,
        canNextPage: v,
        setPageSize: D,
        manualPageSize: U,
        totalRecords: a
      }
    )
  ] });
};
oh.propTypes = {
  columns: _e.any,
  data: _e.any,
  loading: _e.any,
  pagination: _e.any,
  fetchData: _e.any,
  totalRecords: _e.any,
  onRowClick: _e.any
};
const Ew = dt.div`
  overflow-x: auto;

  ${H0};

  ${(e) => e.pagination ? `
    margin-bottom: 1rem;
  ` : `
    // height: 458px;
  
    // tbody {
    //   top: 30px;
    // }
  `}
`, ah = ({ item: e, handleDownload: t }) => {
  var r, i, a;
  const n = ((r = e == null ? void 0 : e.data) == null ? void 0 : r.length) > 0 ? (a = Object.keys((i = e == null ? void 0 : e.data) == null ? void 0 : i[0])) == null ? void 0 : a.map((o) => ({
    Header: o,
    accessor: o
  })) : [];
  return /* @__PURE__ */ W.jsxs(W.Fragment, { children: [
    /* @__PURE__ */ W.jsxs(qg, { children: [
      /* @__PURE__ */ W.jsx(Qg, { children: "Table" }),
      /* @__PURE__ */ W.jsx(ew, { onClick: t })
    ] }),
    /* @__PURE__ */ W.jsx(Rc, { children: /* @__PURE__ */ W.jsx(
      oh,
      {
        columns: n || [],
        data: (e == null ? void 0 : e.data) || [],
        loading: !1,
        pagination: {},
        fetchData: () => {
        },
        totalRecords: 0
      }
    ) })
  ] });
};
ah.propTypes = {
  item: _e.any,
  handleDownload: _e.any
};
const Fu = ({ cost: e, time: t }) => /* @__PURE__ */ W.jsx(tw, { children: /* @__PURE__ */ W.jsx("div", { children: e && `$${e} spent` }) });
Fu.propTypes = {
  cost: _e.any,
  time: _e.any
};
const sh = ({ item: e }) => {
  var t;
  return /* @__PURE__ */ W.jsx(Rc, { style: { backgroundColor: "#fff", border: "none" }, children: /* @__PURE__ */ W.jsx(nw, { children: /* @__PURE__ */ W.jsx("div", { style: { display: "flex", flexWrap: "wrap", gap: "50px", width: "100%" }, children: Object.entries((t = e == null ? void 0 : e.data) == null ? void 0 : t.images).map(([n, { image64: r, s3_uri: i }]) => /* @__PURE__ */ W.jsx(W.Fragment, { children: r.map((a) => /* @__PURE__ */ W.jsxs(
    "div",
    {
      style: {
        maxWidth: "300px",
        marginBottom: "10px",
        display: "flex",
        flexDirection: "column",
        border: "1px solid #e5e7eb"
      },
      children: [
        /* @__PURE__ */ W.jsx(
          "img",
          {
            src: `data:image/*;base64,${a}`,
            style: { marginBottom: "20px" },
            alt: "-img"
          }
        ),
        /* @__PURE__ */ W.jsxs("div", { style: { padding: "10px" }, children: [
          /* @__PURE__ */ W.jsxs("p", { style: { color: "#999da4" }, children: [
            "Page Number: ",
            n
          ] }),
          /* @__PURE__ */ W.jsxs("p", { style: { color: "#999da4" }, children: [
            "Document: ",
            i
          ] })
        ] })
      ]
    },
    a
  )) })) }) }) });
};
sh.propTypes = {
  item: _e.any
};
function Aw(e, t) {
  const n = {};
  return (e[e.length - 1] === "" ? [...e, ""] : e).join(
    (n.padRight ? " " : "") + "," + (n.padLeft === !1 ? "" : " ")
  ).trim();
}
const Pw = /^[$_\p{ID_Start}][$_\u{200C}\u{200D}\p{ID_Continue}]*$/u, Tw = /^[$_\p{ID_Start}][-$_\u{200C}\u{200D}\p{ID_Continue}]*$/u, kw = {};
function ef(e, t) {
  return (kw.jsx ? Tw : Pw).test(e);
}
const Ow = /[ \t\n\f\r]/g;
function Fw(e) {
  return typeof e == "object" ? e.type === "text" ? tf(e.value) : !1 : tf(e);
}
function tf(e) {
  return e.replace(Ow, "") === "";
}
class jo {
  /**
   * @constructor
   * @param {Properties} property
   * @param {Normal} normal
   * @param {string} [space]
   */
  constructor(t, n, r) {
    this.property = t, this.normal = n, r && (this.space = r);
  }
}
jo.prototype.property = {};
jo.prototype.normal = {};
jo.prototype.space = null;
function lh(e, t) {
  const n = {}, r = {};
  let i = -1;
  for (; ++i < e.length; )
    Object.assign(n, e[i].property), Object.assign(r, e[i].normal);
  return new jo(n, r, t);
}
function Bu(e) {
  return e.toLowerCase();
}
class or {
  /**
   * @constructor
   * @param {string} property
   * @param {string} attribute
   */
  constructor(t, n) {
    this.property = t, this.attribute = n;
  }
}
or.prototype.space = null;
or.prototype.boolean = !1;
or.prototype.booleanish = !1;
or.prototype.overloadedBoolean = !1;
or.prototype.number = !1;
or.prototype.commaSeparated = !1;
or.prototype.spaceSeparated = !1;
or.prototype.commaOrSpaceSeparated = !1;
or.prototype.mustUseProperty = !1;
or.prototype.defined = !1;
let Bw = 0;
const Et = vi(), vn = vi(), uh = vi(), Re = vi(), en = vi(), Bi = vi(), Xn = vi();
function vi() {
  return 2 ** ++Bw;
}
const Nu = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  boolean: Et,
  booleanish: vn,
  commaOrSpaceSeparated: Xn,
  commaSeparated: Bi,
  number: Re,
  overloadedBoolean: uh,
  spaceSeparated: en
}, Symbol.toStringTag, { value: "Module" })), zl = Object.keys(Nu);
class Ac extends or {
  /**
   * @constructor
   * @param {string} property
   * @param {string} attribute
   * @param {number|null} [mask]
   * @param {string} [space]
   */
  constructor(t, n, r, i) {
    let a = -1;
    if (super(t, n), nf(this, "space", i), typeof r == "number")
      for (; ++a < zl.length; ) {
        const o = zl[a];
        nf(this, zl[a], (r & Nu[o]) === Nu[o]);
      }
  }
}
Ac.prototype.defined = !0;
function nf(e, t, n) {
  n && (e[t] = n);
}
const Nw = {}.hasOwnProperty;
function $i(e) {
  const t = {}, n = {};
  let r;
  for (r in e.properties)
    if (Nw.call(e.properties, r)) {
      const i = e.properties[r], a = new Ac(
        r,
        e.transform(e.attributes || {}, r),
        i,
        e.space
      );
      e.mustUseProperty && e.mustUseProperty.includes(r) && (a.mustUseProperty = !0), t[r] = a, n[Bu(r)] = r, n[Bu(a.attribute)] = r;
    }
  return new jo(t, n, e.space);
}
const ch = $i({
  space: "xlink",
  transform(e, t) {
    return "xlink:" + t.slice(5).toLowerCase();
  },
  properties: {
    xLinkActuate: null,
    xLinkArcRole: null,
    xLinkHref: null,
    xLinkRole: null,
    xLinkShow: null,
    xLinkTitle: null,
    xLinkType: null
  }
}), dh = $i({
  space: "xml",
  transform(e, t) {
    return "xml:" + t.slice(3).toLowerCase();
  },
  properties: { xmlLang: null, xmlBase: null, xmlSpace: null }
});
function fh(e, t) {
  return t in e ? e[t] : t;
}
function ph(e, t) {
  return fh(e, t.toLowerCase());
}
const gh = $i({
  space: "xmlns",
  attributes: { xmlnsxlink: "xmlns:xlink" },
  transform: ph,
  properties: { xmlns: null, xmlnsXLink: null }
}), hh = $i({
  transform(e, t) {
    return t === "role" ? t : "aria-" + t.slice(4).toLowerCase();
  },
  properties: {
    ariaActiveDescendant: null,
    ariaAtomic: vn,
    ariaAutoComplete: null,
    ariaBusy: vn,
    ariaChecked: vn,
    ariaColCount: Re,
    ariaColIndex: Re,
    ariaColSpan: Re,
    ariaControls: en,
    ariaCurrent: null,
    ariaDescribedBy: en,
    ariaDetails: null,
    ariaDisabled: vn,
    ariaDropEffect: en,
    ariaErrorMessage: null,
    ariaExpanded: vn,
    ariaFlowTo: en,
    ariaGrabbed: vn,
    ariaHasPopup: null,
    ariaHidden: vn,
    ariaInvalid: null,
    ariaKeyShortcuts: null,
    ariaLabel: null,
    ariaLabelledBy: en,
    ariaLevel: Re,
    ariaLive: null,
    ariaModal: vn,
    ariaMultiLine: vn,
    ariaMultiSelectable: vn,
    ariaOrientation: null,
    ariaOwns: en,
    ariaPlaceholder: null,
    ariaPosInSet: Re,
    ariaPressed: vn,
    ariaReadOnly: vn,
    ariaRelevant: null,
    ariaRequired: vn,
    ariaRoleDescription: en,
    ariaRowCount: Re,
    ariaRowIndex: Re,
    ariaRowSpan: Re,
    ariaSelected: vn,
    ariaSetSize: Re,
    ariaSort: null,
    ariaValueMax: Re,
    ariaValueMin: Re,
    ariaValueNow: Re,
    ariaValueText: null,
    role: null
  }
}), Gw = $i({
  space: "html",
  attributes: {
    acceptcharset: "accept-charset",
    classname: "class",
    htmlfor: "for",
    httpequiv: "http-equiv"
  },
  transform: ph,
  mustUseProperty: ["checked", "multiple", "muted", "selected"],
  properties: {
    // Standard Properties.
    abbr: null,
    accept: Bi,
    acceptCharset: en,
    accessKey: en,
    action: null,
    allow: null,
    allowFullScreen: Et,
    allowPaymentRequest: Et,
    allowUserMedia: Et,
    alt: null,
    as: null,
    async: Et,
    autoCapitalize: null,
    autoComplete: en,
    autoFocus: Et,
    autoPlay: Et,
    blocking: en,
    capture: null,
    charSet: null,
    checked: Et,
    cite: null,
    className: en,
    cols: Re,
    colSpan: null,
    content: null,
    contentEditable: vn,
    controls: Et,
    controlsList: en,
    coords: Re | Bi,
    crossOrigin: null,
    data: null,
    dateTime: null,
    decoding: null,
    default: Et,
    defer: Et,
    dir: null,
    dirName: null,
    disabled: Et,
    download: uh,
    draggable: vn,
    encType: null,
    enterKeyHint: null,
    fetchPriority: null,
    form: null,
    formAction: null,
    formEncType: null,
    formMethod: null,
    formNoValidate: Et,
    formTarget: null,
    headers: en,
    height: Re,
    hidden: Et,
    high: Re,
    href: null,
    hrefLang: null,
    htmlFor: en,
    httpEquiv: en,
    id: null,
    imageSizes: null,
    imageSrcSet: null,
    inert: Et,
    inputMode: null,
    integrity: null,
    is: null,
    isMap: Et,
    itemId: null,
    itemProp: en,
    itemRef: en,
    itemScope: Et,
    itemType: en,
    kind: null,
    label: null,
    lang: null,
    language: null,
    list: null,
    loading: null,
    loop: Et,
    low: Re,
    manifest: null,
    max: null,
    maxLength: Re,
    media: null,
    method: null,
    min: null,
    minLength: Re,
    multiple: Et,
    muted: Et,
    name: null,
    nonce: null,
    noModule: Et,
    noValidate: Et,
    onAbort: null,
    onAfterPrint: null,
    onAuxClick: null,
    onBeforeMatch: null,
    onBeforePrint: null,
    onBeforeToggle: null,
    onBeforeUnload: null,
    onBlur: null,
    onCancel: null,
    onCanPlay: null,
    onCanPlayThrough: null,
    onChange: null,
    onClick: null,
    onClose: null,
    onContextLost: null,
    onContextMenu: null,
    onContextRestored: null,
    onCopy: null,
    onCueChange: null,
    onCut: null,
    onDblClick: null,
    onDrag: null,
    onDragEnd: null,
    onDragEnter: null,
    onDragExit: null,
    onDragLeave: null,
    onDragOver: null,
    onDragStart: null,
    onDrop: null,
    onDurationChange: null,
    onEmptied: null,
    onEnded: null,
    onError: null,
    onFocus: null,
    onFormData: null,
    onHashChange: null,
    onInput: null,
    onInvalid: null,
    onKeyDown: null,
    onKeyPress: null,
    onKeyUp: null,
    onLanguageChange: null,
    onLoad: null,
    onLoadedData: null,
    onLoadedMetadata: null,
    onLoadEnd: null,
    onLoadStart: null,
    onMessage: null,
    onMessageError: null,
    onMouseDown: null,
    onMouseEnter: null,
    onMouseLeave: null,
    onMouseMove: null,
    onMouseOut: null,
    onMouseOver: null,
    onMouseUp: null,
    onOffline: null,
    onOnline: null,
    onPageHide: null,
    onPageShow: null,
    onPaste: null,
    onPause: null,
    onPlay: null,
    onPlaying: null,
    onPopState: null,
    onProgress: null,
    onRateChange: null,
    onRejectionHandled: null,
    onReset: null,
    onResize: null,
    onScroll: null,
    onScrollEnd: null,
    onSecurityPolicyViolation: null,
    onSeeked: null,
    onSeeking: null,
    onSelect: null,
    onSlotChange: null,
    onStalled: null,
    onStorage: null,
    onSubmit: null,
    onSuspend: null,
    onTimeUpdate: null,
    onToggle: null,
    onUnhandledRejection: null,
    onUnload: null,
    onVolumeChange: null,
    onWaiting: null,
    onWheel: null,
    open: Et,
    optimum: Re,
    pattern: null,
    ping: en,
    placeholder: null,
    playsInline: Et,
    popover: null,
    popoverTarget: null,
    popoverTargetAction: null,
    poster: null,
    preload: null,
    readOnly: Et,
    referrerPolicy: null,
    rel: en,
    required: Et,
    reversed: Et,
    rows: Re,
    rowSpan: Re,
    sandbox: en,
    scope: null,
    scoped: Et,
    seamless: Et,
    selected: Et,
    shadowRootClonable: Et,
    shadowRootDelegatesFocus: Et,
    shadowRootMode: null,
    shape: null,
    size: Re,
    sizes: null,
    slot: null,
    span: Re,
    spellCheck: vn,
    src: null,
    srcDoc: null,
    srcLang: null,
    srcSet: null,
    start: Re,
    step: null,
    style: null,
    tabIndex: Re,
    target: null,
    title: null,
    translate: null,
    type: null,
    typeMustMatch: Et,
    useMap: null,
    value: vn,
    width: Re,
    wrap: null,
    writingSuggestions: null,
    // Legacy.
    // See: https://html.spec.whatwg.org/#other-elements,-attributes-and-apis
    align: null,
    // Several. Use CSS `text-align` instead,
    aLink: null,
    // `<body>`. Use CSS `a:active {color}` instead
    archive: en,
    // `<object>`. List of URIs to archives
    axis: null,
    // `<td>` and `<th>`. Use `scope` on `<th>`
    background: null,
    // `<body>`. Use CSS `background-image` instead
    bgColor: null,
    // `<body>` and table elements. Use CSS `background-color` instead
    border: Re,
    // `<table>`. Use CSS `border-width` instead,
    borderColor: null,
    // `<table>`. Use CSS `border-color` instead,
    bottomMargin: Re,
    // `<body>`
    cellPadding: null,
    // `<table>`
    cellSpacing: null,
    // `<table>`
    char: null,
    // Several table elements. When `align=char`, sets the character to align on
    charOff: null,
    // Several table elements. When `char`, offsets the alignment
    classId: null,
    // `<object>`
    clear: null,
    // `<br>`. Use CSS `clear` instead
    code: null,
    // `<object>`
    codeBase: null,
    // `<object>`
    codeType: null,
    // `<object>`
    color: null,
    // `<font>` and `<hr>`. Use CSS instead
    compact: Et,
    // Lists. Use CSS to reduce space between items instead
    declare: Et,
    // `<object>`
    event: null,
    // `<script>`
    face: null,
    // `<font>`. Use CSS instead
    frame: null,
    // `<table>`
    frameBorder: null,
    // `<iframe>`. Use CSS `border` instead
    hSpace: Re,
    // `<img>` and `<object>`
    leftMargin: Re,
    // `<body>`
    link: null,
    // `<body>`. Use CSS `a:link {color: *}` instead
    longDesc: null,
    // `<frame>`, `<iframe>`, and `<img>`. Use an `<a>`
    lowSrc: null,
    // `<img>`. Use a `<picture>`
    marginHeight: Re,
    // `<body>`
    marginWidth: Re,
    // `<body>`
    noResize: Et,
    // `<frame>`
    noHref: Et,
    // `<area>`. Use no href instead of an explicit `nohref`
    noShade: Et,
    // `<hr>`. Use background-color and height instead of borders
    noWrap: Et,
    // `<td>` and `<th>`
    object: null,
    // `<applet>`
    profile: null,
    // `<head>`
    prompt: null,
    // `<isindex>`
    rev: null,
    // `<link>`
    rightMargin: Re,
    // `<body>`
    rules: null,
    // `<table>`
    scheme: null,
    // `<meta>`
    scrolling: vn,
    // `<frame>`. Use overflow in the child context
    standby: null,
    // `<object>`
    summary: null,
    // `<table>`
    text: null,
    // `<body>`. Use CSS `color` instead
    topMargin: Re,
    // `<body>`
    valueType: null,
    // `<param>`
    version: null,
    // `<html>`. Use a doctype.
    vAlign: null,
    // Several. Use CSS `vertical-align` instead
    vLink: null,
    // `<body>`. Use CSS `a:visited {color}` instead
    vSpace: Re,
    // `<img>` and `<object>`
    // Non-standard Properties.
    allowTransparency: null,
    autoCorrect: null,
    autoSave: null,
    disablePictureInPicture: Et,
    disableRemotePlayback: Et,
    prefix: null,
    property: null,
    results: Re,
    security: null,
    unselectable: null
  }
}), _w = $i({
  space: "svg",
  attributes: {
    accentHeight: "accent-height",
    alignmentBaseline: "alignment-baseline",
    arabicForm: "arabic-form",
    baselineShift: "baseline-shift",
    capHeight: "cap-height",
    className: "class",
    clipPath: "clip-path",
    clipRule: "clip-rule",
    colorInterpolation: "color-interpolation",
    colorInterpolationFilters: "color-interpolation-filters",
    colorProfile: "color-profile",
    colorRendering: "color-rendering",
    crossOrigin: "crossorigin",
    dataType: "datatype",
    dominantBaseline: "dominant-baseline",
    enableBackground: "enable-background",
    fillOpacity: "fill-opacity",
    fillRule: "fill-rule",
    floodColor: "flood-color",
    floodOpacity: "flood-opacity",
    fontFamily: "font-family",
    fontSize: "font-size",
    fontSizeAdjust: "font-size-adjust",
    fontStretch: "font-stretch",
    fontStyle: "font-style",
    fontVariant: "font-variant",
    fontWeight: "font-weight",
    glyphName: "glyph-name",
    glyphOrientationHorizontal: "glyph-orientation-horizontal",
    glyphOrientationVertical: "glyph-orientation-vertical",
    hrefLang: "hreflang",
    horizAdvX: "horiz-adv-x",
    horizOriginX: "horiz-origin-x",
    horizOriginY: "horiz-origin-y",
    imageRendering: "image-rendering",
    letterSpacing: "letter-spacing",
    lightingColor: "lighting-color",
    markerEnd: "marker-end",
    markerMid: "marker-mid",
    markerStart: "marker-start",
    navDown: "nav-down",
    navDownLeft: "nav-down-left",
    navDownRight: "nav-down-right",
    navLeft: "nav-left",
    navNext: "nav-next",
    navPrev: "nav-prev",
    navRight: "nav-right",
    navUp: "nav-up",
    navUpLeft: "nav-up-left",
    navUpRight: "nav-up-right",
    onAbort: "onabort",
    onActivate: "onactivate",
    onAfterPrint: "onafterprint",
    onBeforePrint: "onbeforeprint",
    onBegin: "onbegin",
    onCancel: "oncancel",
    onCanPlay: "oncanplay",
    onCanPlayThrough: "oncanplaythrough",
    onChange: "onchange",
    onClick: "onclick",
    onClose: "onclose",
    onCopy: "oncopy",
    onCueChange: "oncuechange",
    onCut: "oncut",
    onDblClick: "ondblclick",
    onDrag: "ondrag",
    onDragEnd: "ondragend",
    onDragEnter: "ondragenter",
    onDragExit: "ondragexit",
    onDragLeave: "ondragleave",
    onDragOver: "ondragover",
    onDragStart: "ondragstart",
    onDrop: "ondrop",
    onDurationChange: "ondurationchange",
    onEmptied: "onemptied",
    onEnd: "onend",
    onEnded: "onended",
    onError: "onerror",
    onFocus: "onfocus",
    onFocusIn: "onfocusin",
    onFocusOut: "onfocusout",
    onHashChange: "onhashchange",
    onInput: "oninput",
    onInvalid: "oninvalid",
    onKeyDown: "onkeydown",
    onKeyPress: "onkeypress",
    onKeyUp: "onkeyup",
    onLoad: "onload",
    onLoadedData: "onloadeddata",
    onLoadedMetadata: "onloadedmetadata",
    onLoadStart: "onloadstart",
    onMessage: "onmessage",
    onMouseDown: "onmousedown",
    onMouseEnter: "onmouseenter",
    onMouseLeave: "onmouseleave",
    onMouseMove: "onmousemove",
    onMouseOut: "onmouseout",
    onMouseOver: "onmouseover",
    onMouseUp: "onmouseup",
    onMouseWheel: "onmousewheel",
    onOffline: "onoffline",
    onOnline: "ononline",
    onPageHide: "onpagehide",
    onPageShow: "onpageshow",
    onPaste: "onpaste",
    onPause: "onpause",
    onPlay: "onplay",
    onPlaying: "onplaying",
    onPopState: "onpopstate",
    onProgress: "onprogress",
    onRateChange: "onratechange",
    onRepeat: "onrepeat",
    onReset: "onreset",
    onResize: "onresize",
    onScroll: "onscroll",
    onSeeked: "onseeked",
    onSeeking: "onseeking",
    onSelect: "onselect",
    onShow: "onshow",
    onStalled: "onstalled",
    onStorage: "onstorage",
    onSubmit: "onsubmit",
    onSuspend: "onsuspend",
    onTimeUpdate: "ontimeupdate",
    onToggle: "ontoggle",
    onUnload: "onunload",
    onVolumeChange: "onvolumechange",
    onWaiting: "onwaiting",
    onZoom: "onzoom",
    overlinePosition: "overline-position",
    overlineThickness: "overline-thickness",
    paintOrder: "paint-order",
    panose1: "panose-1",
    pointerEvents: "pointer-events",
    referrerPolicy: "referrerpolicy",
    renderingIntent: "rendering-intent",
    shapeRendering: "shape-rendering",
    stopColor: "stop-color",
    stopOpacity: "stop-opacity",
    strikethroughPosition: "strikethrough-position",
    strikethroughThickness: "strikethrough-thickness",
    strokeDashArray: "stroke-dasharray",
    strokeDashOffset: "stroke-dashoffset",
    strokeLineCap: "stroke-linecap",
    strokeLineJoin: "stroke-linejoin",
    strokeMiterLimit: "stroke-miterlimit",
    strokeOpacity: "stroke-opacity",
    strokeWidth: "stroke-width",
    tabIndex: "tabindex",
    textAnchor: "text-anchor",
    textDecoration: "text-decoration",
    textRendering: "text-rendering",
    transformOrigin: "transform-origin",
    typeOf: "typeof",
    underlinePosition: "underline-position",
    underlineThickness: "underline-thickness",
    unicodeBidi: "unicode-bidi",
    unicodeRange: "unicode-range",
    unitsPerEm: "units-per-em",
    vAlphabetic: "v-alphabetic",
    vHanging: "v-hanging",
    vIdeographic: "v-ideographic",
    vMathematical: "v-mathematical",
    vectorEffect: "vector-effect",
    vertAdvY: "vert-adv-y",
    vertOriginX: "vert-origin-x",
    vertOriginY: "vert-origin-y",
    wordSpacing: "word-spacing",
    writingMode: "writing-mode",
    xHeight: "x-height",
    // These were camelcased in Tiny. Now lowercased in SVG 2
    playbackOrder: "playbackorder",
    timelineBegin: "timelinebegin"
  },
  transform: fh,
  properties: {
    about: Xn,
    accentHeight: Re,
    accumulate: null,
    additive: null,
    alignmentBaseline: null,
    alphabetic: Re,
    amplitude: Re,
    arabicForm: null,
    ascent: Re,
    attributeName: null,
    attributeType: null,
    azimuth: Re,
    bandwidth: null,
    baselineShift: null,
    baseFrequency: null,
    baseProfile: null,
    bbox: null,
    begin: null,
    bias: Re,
    by: null,
    calcMode: null,
    capHeight: Re,
    className: en,
    clip: null,
    clipPath: null,
    clipPathUnits: null,
    clipRule: null,
    color: null,
    colorInterpolation: null,
    colorInterpolationFilters: null,
    colorProfile: null,
    colorRendering: null,
    content: null,
    contentScriptType: null,
    contentStyleType: null,
    crossOrigin: null,
    cursor: null,
    cx: null,
    cy: null,
    d: null,
    dataType: null,
    defaultAction: null,
    descent: Re,
    diffuseConstant: Re,
    direction: null,
    display: null,
    dur: null,
    divisor: Re,
    dominantBaseline: null,
    download: Et,
    dx: null,
    dy: null,
    edgeMode: null,
    editable: null,
    elevation: Re,
    enableBackground: null,
    end: null,
    event: null,
    exponent: Re,
    externalResourcesRequired: null,
    fill: null,
    fillOpacity: Re,
    fillRule: null,
    filter: null,
    filterRes: null,
    filterUnits: null,
    floodColor: null,
    floodOpacity: null,
    focusable: null,
    focusHighlight: null,
    fontFamily: null,
    fontSize: null,
    fontSizeAdjust: null,
    fontStretch: null,
    fontStyle: null,
    fontVariant: null,
    fontWeight: null,
    format: null,
    fr: null,
    from: null,
    fx: null,
    fy: null,
    g1: Bi,
    g2: Bi,
    glyphName: Bi,
    glyphOrientationHorizontal: null,
    glyphOrientationVertical: null,
    glyphRef: null,
    gradientTransform: null,
    gradientUnits: null,
    handler: null,
    hanging: Re,
    hatchContentUnits: null,
    hatchUnits: null,
    height: null,
    href: null,
    hrefLang: null,
    horizAdvX: Re,
    horizOriginX: Re,
    horizOriginY: Re,
    id: null,
    ideographic: Re,
    imageRendering: null,
    initialVisibility: null,
    in: null,
    in2: null,
    intercept: Re,
    k: Re,
    k1: Re,
    k2: Re,
    k3: Re,
    k4: Re,
    kernelMatrix: Xn,
    kernelUnitLength: null,
    keyPoints: null,
    // SEMI_COLON_SEPARATED
    keySplines: null,
    // SEMI_COLON_SEPARATED
    keyTimes: null,
    // SEMI_COLON_SEPARATED
    kerning: null,
    lang: null,
    lengthAdjust: null,
    letterSpacing: null,
    lightingColor: null,
    limitingConeAngle: Re,
    local: null,
    markerEnd: null,
    markerMid: null,
    markerStart: null,
    markerHeight: null,
    markerUnits: null,
    markerWidth: null,
    mask: null,
    maskContentUnits: null,
    maskUnits: null,
    mathematical: null,
    max: null,
    media: null,
    mediaCharacterEncoding: null,
    mediaContentEncodings: null,
    mediaSize: Re,
    mediaTime: null,
    method: null,
    min: null,
    mode: null,
    name: null,
    navDown: null,
    navDownLeft: null,
    navDownRight: null,
    navLeft: null,
    navNext: null,
    navPrev: null,
    navRight: null,
    navUp: null,
    navUpLeft: null,
    navUpRight: null,
    numOctaves: null,
    observer: null,
    offset: null,
    onAbort: null,
    onActivate: null,
    onAfterPrint: null,
    onBeforePrint: null,
    onBegin: null,
    onCancel: null,
    onCanPlay: null,
    onCanPlayThrough: null,
    onChange: null,
    onClick: null,
    onClose: null,
    onCopy: null,
    onCueChange: null,
    onCut: null,
    onDblClick: null,
    onDrag: null,
    onDragEnd: null,
    onDragEnter: null,
    onDragExit: null,
    onDragLeave: null,
    onDragOver: null,
    onDragStart: null,
    onDrop: null,
    onDurationChange: null,
    onEmptied: null,
    onEnd: null,
    onEnded: null,
    onError: null,
    onFocus: null,
    onFocusIn: null,
    onFocusOut: null,
    onHashChange: null,
    onInput: null,
    onInvalid: null,
    onKeyDown: null,
    onKeyPress: null,
    onKeyUp: null,
    onLoad: null,
    onLoadedData: null,
    onLoadedMetadata: null,
    onLoadStart: null,
    onMessage: null,
    onMouseDown: null,
    onMouseEnter: null,
    onMouseLeave: null,
    onMouseMove: null,
    onMouseOut: null,
    onMouseOver: null,
    onMouseUp: null,
    onMouseWheel: null,
    onOffline: null,
    onOnline: null,
    onPageHide: null,
    onPageShow: null,
    onPaste: null,
    onPause: null,
    onPlay: null,
    onPlaying: null,
    onPopState: null,
    onProgress: null,
    onRateChange: null,
    onRepeat: null,
    onReset: null,
    onResize: null,
    onScroll: null,
    onSeeked: null,
    onSeeking: null,
    onSelect: null,
    onShow: null,
    onStalled: null,
    onStorage: null,
    onSubmit: null,
    onSuspend: null,
    onTimeUpdate: null,
    onToggle: null,
    onUnload: null,
    onVolumeChange: null,
    onWaiting: null,
    onZoom: null,
    opacity: null,
    operator: null,
    order: null,
    orient: null,
    orientation: null,
    origin: null,
    overflow: null,
    overlay: null,
    overlinePosition: Re,
    overlineThickness: Re,
    paintOrder: null,
    panose1: null,
    path: null,
    pathLength: Re,
    patternContentUnits: null,
    patternTransform: null,
    patternUnits: null,
    phase: null,
    ping: en,
    pitch: null,
    playbackOrder: null,
    pointerEvents: null,
    points: null,
    pointsAtX: Re,
    pointsAtY: Re,
    pointsAtZ: Re,
    preserveAlpha: null,
    preserveAspectRatio: null,
    primitiveUnits: null,
    propagate: null,
    property: Xn,
    r: null,
    radius: null,
    referrerPolicy: null,
    refX: null,
    refY: null,
    rel: Xn,
    rev: Xn,
    renderingIntent: null,
    repeatCount: null,
    repeatDur: null,
    requiredExtensions: Xn,
    requiredFeatures: Xn,
    requiredFonts: Xn,
    requiredFormats: Xn,
    resource: null,
    restart: null,
    result: null,
    rotate: null,
    rx: null,
    ry: null,
    scale: null,
    seed: null,
    shapeRendering: null,
    side: null,
    slope: null,
    snapshotTime: null,
    specularConstant: Re,
    specularExponent: Re,
    spreadMethod: null,
    spacing: null,
    startOffset: null,
    stdDeviation: null,
    stemh: null,
    stemv: null,
    stitchTiles: null,
    stopColor: null,
    stopOpacity: null,
    strikethroughPosition: Re,
    strikethroughThickness: Re,
    string: null,
    stroke: null,
    strokeDashArray: Xn,
    strokeDashOffset: null,
    strokeLineCap: null,
    strokeLineJoin: null,
    strokeMiterLimit: Re,
    strokeOpacity: Re,
    strokeWidth: null,
    style: null,
    surfaceScale: Re,
    syncBehavior: null,
    syncBehaviorDefault: null,
    syncMaster: null,
    syncTolerance: null,
    syncToleranceDefault: null,
    systemLanguage: Xn,
    tabIndex: Re,
    tableValues: null,
    target: null,
    targetX: Re,
    targetY: Re,
    textAnchor: null,
    textDecoration: null,
    textRendering: null,
    textLength: null,
    timelineBegin: null,
    title: null,
    transformBehavior: null,
    type: null,
    typeOf: Xn,
    to: null,
    transform: null,
    transformOrigin: null,
    u1: null,
    u2: null,
    underlinePosition: Re,
    underlineThickness: Re,
    unicode: null,
    unicodeBidi: null,
    unicodeRange: null,
    unitsPerEm: Re,
    values: null,
    vAlphabetic: Re,
    vMathematical: Re,
    vectorEffect: null,
    vHanging: Re,
    vIdeographic: Re,
    version: null,
    vertAdvY: Re,
    vertOriginX: Re,
    vertOriginY: Re,
    viewBox: null,
    viewTarget: null,
    visibility: null,
    width: null,
    widths: null,
    wordSpacing: null,
    writingMode: null,
    x: null,
    x1: null,
    x2: null,
    xChannelSelector: null,
    xHeight: Re,
    y: null,
    y1: null,
    y2: null,
    yChannelSelector: null,
    z: null,
    zoomAndPan: null
  }
}), Mw = /^data[-\w.:]+$/i, rf = /-[a-z]/g, Vw = /[A-Z]/g;
function Lw(e, t) {
  const n = Bu(t);
  let r = t, i = or;
  if (n in e.normal)
    return e.property[e.normal[n]];
  if (n.length > 4 && n.slice(0, 4) === "data" && Mw.test(t)) {
    if (t.charAt(4) === "-") {
      const a = t.slice(5).replace(rf, jw);
      r = "data" + a.charAt(0).toUpperCase() + a.slice(1);
    } else {
      const a = t.slice(4);
      if (!rf.test(a)) {
        let o = a.replace(Vw, Dw);
        o.charAt(0) !== "-" && (o = "-" + o), t = "data" + o;
      }
    }
    i = Ac;
  }
  return new i(r, t);
}
function Dw(e) {
  return "-" + e.toLowerCase();
}
function jw(e) {
  return e.charAt(1).toUpperCase();
}
const zw = {
  classId: "classID",
  dataType: "datatype",
  itemId: "itemID",
  strokeDashArray: "strokeDasharray",
  strokeDashOffset: "strokeDashoffset",
  strokeLineCap: "strokeLinecap",
  strokeLineJoin: "strokeLinejoin",
  strokeMiterLimit: "strokeMiterlimit",
  typeOf: "typeof",
  xLinkActuate: "xlinkActuate",
  xLinkArcRole: "xlinkArcrole",
  xLinkHref: "xlinkHref",
  xLinkRole: "xlinkRole",
  xLinkShow: "xlinkShow",
  xLinkTitle: "xlinkTitle",
  xLinkType: "xlinkType",
  xmlnsXLink: "xmlnsXlink"
}, Hw = lh([dh, ch, gh, hh, Gw], "html"), Pc = lh([dh, ch, gh, hh, _w], "svg");
function Ww(e) {
  return e.join(" ").trim();
}
var Pi = {}, Hl, of;
function $w() {
  if (of) return Hl;
  of = 1;
  var e = /\/\*[^*]*\*+([^/*][^*]*\*+)*\//g, t = /\n/g, n = /^\s*/, r = /^(\*?[-#/*\\\w]+(\[[0-9a-z_-]+\])?)\s*/, i = /^:\s*/, a = /^((?:'(?:\\'|.)*?'|"(?:\\"|.)*?"|\([^)]*?\)|[^};])+)/, o = /^[;\s]*/, l = /^\s+|\s+$/g, u = `
`, s = "/", d = "*", c = "", m = "comment", h = "declaration";
  Hl = function(v, b) {
    if (typeof v != "string")
      throw new TypeError("First argument must be a string");
    if (!v) return [];
    b = b || {};
    var I = 1, O = 1;
    function T(ye) {
      var Q = ye.match(t);
      Q && (I += Q.length);
      var ue = ye.lastIndexOf(u);
      O = ~ue ? ye.length - ue : O + ye.length;
    }
    function D() {
      var ye = { line: I, column: O };
      return function(Q) {
        return Q.position = new E(ye), U(), Q;
      };
    }
    function E(ye) {
      this.start = ye, this.end = { line: I, column: O }, this.source = b.source;
    }
    E.prototype.content = v;
    function B(ye) {
      var Q = new Error(
        b.source + ":" + I + ":" + O + ": " + ye
      );
      if (Q.reason = ye, Q.filename = b.source, Q.line = I, Q.column = O, Q.source = v, !b.silent) throw Q;
    }
    function X(ye) {
      var Q = ye.exec(v);
      if (Q) {
        var ue = Q[0];
        return T(ue), v = v.slice(ue.length), Q;
      }
    }
    function U() {
      X(n);
    }
    function K(ye) {
      var Q;
      for (ye = ye || []; Q = Fe(); )
        Q !== !1 && ye.push(Q);
      return ye;
    }
    function Fe() {
      var ye = D();
      if (!(s != v.charAt(0) || d != v.charAt(1))) {
        for (var Q = 2; c != v.charAt(Q) && (d != v.charAt(Q) || s != v.charAt(Q + 1)); )
          ++Q;
        if (Q += 2, c === v.charAt(Q - 1))
          return B("End of comment missing");
        var ue = v.slice(2, Q - 2);
        return O += 2, T(ue), v = v.slice(Q), O += 2, ye({
          type: m,
          comment: ue
        });
      }
    }
    function oe() {
      var ye = D(), Q = X(r);
      if (Q) {
        if (Fe(), !X(i)) return B("property missing ':'");
        var ue = X(a), Ee = ye({
          type: h,
          property: x(Q[0].replace(e, c)),
          value: ue ? x(ue[0].replace(e, c)) : c
        });
        return X(o), Ee;
      }
    }
    function ce() {
      var ye = [];
      K(ye);
      for (var Q; Q = oe(); )
        Q !== !1 && (ye.push(Q), K(ye));
      return ye;
    }
    return U(), ce();
  };
  function x(v) {
    return v ? v.replace(l, c) : c;
  }
  return Hl;
}
var af;
function Xw() {
  if (af) return Pi;
  af = 1;
  var e = Pi && Pi.__importDefault || function(r) {
    return r && r.__esModule ? r : { default: r };
  };
  Object.defineProperty(Pi, "__esModule", { value: !0 }), Pi.default = n;
  var t = e($w());
  function n(r, i) {
    var a = null;
    if (!r || typeof r != "string")
      return a;
    var o = (0, t.default)(r), l = typeof i == "function";
    return o.forEach(function(u) {
      if (u.type === "declaration") {
        var s = u.property, d = u.value;
        l ? i(s, d, u) : d && (a = a || {}, a[s] = d);
      }
    }), a;
  }
  return Pi;
}
var Yw = Xw();
const sf = /* @__PURE__ */ Hn(Yw), Zw = sf.default || sf, mh = vh("end"), Tc = vh("start");
function vh(e) {
  return t;
  function t(n) {
    const r = n && n.position && n.position[e] || {};
    if (typeof r.line == "number" && r.line > 0 && typeof r.column == "number" && r.column > 0)
      return {
        line: r.line,
        column: r.column,
        offset: typeof r.offset == "number" && r.offset > -1 ? r.offset : void 0
      };
  }
}
function Jw(e) {
  const t = Tc(e), n = mh(e);
  if (t && n)
    return { start: t, end: n };
}
function xo(e) {
  return !e || typeof e != "object" ? "" : "position" in e || "type" in e ? lf(e.position) : "start" in e || "end" in e ? lf(e) : "line" in e || "column" in e ? Gu(e) : "";
}
function Gu(e) {
  return uf(e && e.line) + ":" + uf(e && e.column);
}
function lf(e) {
  return Gu(e && e.start) + "-" + Gu(e && e.end);
}
function uf(e) {
  return e && typeof e == "number" ? e : 1;
}
class Nn extends Error {
  /**
   * Create a message for `reason`.
   *
   * > 🪦 **Note**: also has obsolete signatures.
   *
   * @overload
   * @param {string} reason
   * @param {Options | null | undefined} [options]
   * @returns
   *
   * @overload
   * @param {string} reason
   * @param {Node | NodeLike | null | undefined} parent
   * @param {string | null | undefined} [origin]
   * @returns
   *
   * @overload
   * @param {string} reason
   * @param {Point | Position | null | undefined} place
   * @param {string | null | undefined} [origin]
   * @returns
   *
   * @overload
   * @param {string} reason
   * @param {string | null | undefined} [origin]
   * @returns
   *
   * @overload
   * @param {Error | VFileMessage} cause
   * @param {Node | NodeLike | null | undefined} parent
   * @param {string | null | undefined} [origin]
   * @returns
   *
   * @overload
   * @param {Error | VFileMessage} cause
   * @param {Point | Position | null | undefined} place
   * @param {string | null | undefined} [origin]
   * @returns
   *
   * @overload
   * @param {Error | VFileMessage} cause
   * @param {string | null | undefined} [origin]
   * @returns
   *
   * @param {Error | VFileMessage | string} causeOrReason
   *   Reason for message, should use markdown.
   * @param {Node | NodeLike | Options | Point | Position | string | null | undefined} [optionsOrParentOrPlace]
   *   Configuration (optional).
   * @param {string | null | undefined} [origin]
   *   Place in code where the message originates (example:
   *   `'my-package:my-rule'` or `'my-rule'`).
   * @returns
   *   Instance of `VFileMessage`.
   */
  // eslint-disable-next-line complexity
  constructor(t, n, r) {
    super(), typeof n == "string" && (r = n, n = void 0);
    let i = "", a = {}, o = !1;
    if (n && ("line" in n && "column" in n ? a = { place: n } : "start" in n && "end" in n ? a = { place: n } : "type" in n ? a = {
      ancestors: [n],
      place: n.position
    } : a = { ...n }), typeof t == "string" ? i = t : !a.cause && t && (o = !0, i = t.message, a.cause = t), !a.ruleId && !a.source && typeof r == "string") {
      const u = r.indexOf(":");
      u === -1 ? a.ruleId = r : (a.source = r.slice(0, u), a.ruleId = r.slice(u + 1));
    }
    if (!a.place && a.ancestors && a.ancestors) {
      const u = a.ancestors[a.ancestors.length - 1];
      u && (a.place = u.position);
    }
    const l = a.place && "start" in a.place ? a.place.start : a.place;
    this.ancestors = a.ancestors || void 0, this.cause = a.cause || void 0, this.column = l ? l.column : void 0, this.fatal = void 0, this.file, this.message = i, this.line = l ? l.line : void 0, this.name = xo(a.place) || "1:1", this.place = a.place || void 0, this.reason = this.message, this.ruleId = a.ruleId || void 0, this.source = a.source || void 0, this.stack = o && a.cause && typeof a.cause.stack == "string" ? a.cause.stack : "", this.actual, this.expected, this.note, this.url;
  }
}
Nn.prototype.file = "";
Nn.prototype.name = "";
Nn.prototype.reason = "";
Nn.prototype.message = "";
Nn.prototype.stack = "";
Nn.prototype.column = void 0;
Nn.prototype.line = void 0;
Nn.prototype.ancestors = void 0;
Nn.prototype.cause = void 0;
Nn.prototype.fatal = void 0;
Nn.prototype.place = void 0;
Nn.prototype.ruleId = void 0;
Nn.prototype.source = void 0;
const kc = {}.hasOwnProperty, Uw = /* @__PURE__ */ new Map(), qw = /[A-Z]/g, Qw = /-([a-z])/g, Kw = /* @__PURE__ */ new Set(["table", "tbody", "thead", "tfoot", "tr"]), ex = /* @__PURE__ */ new Set(["td", "th"]), bh = "https://github.com/syntax-tree/hast-util-to-jsx-runtime";
function tx(e, t) {
  if (!t || t.Fragment === void 0)
    throw new TypeError("Expected `Fragment` in options");
  const n = t.filePath || void 0;
  let r;
  if (t.development) {
    if (typeof t.jsxDEV != "function")
      throw new TypeError(
        "Expected `jsxDEV` in options when `development: true`"
      );
    r = ux(n, t.jsxDEV);
  } else {
    if (typeof t.jsx != "function")
      throw new TypeError("Expected `jsx` in production options");
    if (typeof t.jsxs != "function")
      throw new TypeError("Expected `jsxs` in production options");
    r = lx(n, t.jsx, t.jsxs);
  }
  const i = {
    Fragment: t.Fragment,
    ancestors: [],
    components: t.components || {},
    create: r,
    elementAttributeNameCase: t.elementAttributeNameCase || "react",
    evaluater: t.createEvaluater ? t.createEvaluater() : void 0,
    filePath: n,
    ignoreInvalidStyle: t.ignoreInvalidStyle || !1,
    passKeys: t.passKeys !== !1,
    passNode: t.passNode || !1,
    schema: t.space === "svg" ? Pc : Hw,
    stylePropertyNameCase: t.stylePropertyNameCase || "dom",
    tableCellAlignToStyle: t.tableCellAlignToStyle !== !1
  }, a = yh(i, e, void 0);
  return a && typeof a != "string" ? a : i.create(
    e,
    i.Fragment,
    { children: a || void 0 },
    void 0
  );
}
function yh(e, t, n) {
  if (t.type === "element")
    return nx(e, t, n);
  if (t.type === "mdxFlowExpression" || t.type === "mdxTextExpression")
    return rx(e, t);
  if (t.type === "mdxJsxFlowElement" || t.type === "mdxJsxTextElement")
    return ox(e, t, n);
  if (t.type === "mdxjsEsm")
    return ix(e, t);
  if (t.type === "root")
    return ax(e, t, n);
  if (t.type === "text")
    return sx(e, t);
}
function nx(e, t, n) {
  const r = e.schema;
  let i = r;
  t.tagName.toLowerCase() === "svg" && r.space === "html" && (i = Pc, e.schema = i), e.ancestors.push(t);
  const a = xh(e, t.tagName, !1), o = cx(e, t);
  let l = Fc(e, t);
  return Kw.has(t.tagName) && (l = l.filter(function(u) {
    return typeof u == "string" ? !Fw(u) : !0;
  })), wh(e, o, a, t), Oc(o, l), e.ancestors.pop(), e.schema = r, e.create(t, a, o, n);
}
function rx(e, t) {
  if (t.data && t.data.estree && e.evaluater) {
    const r = t.data.estree.body[0];
    return r.type, /** @type {Child | undefined} */
    e.evaluater.evaluateExpression(r.expression);
  }
  Oo(e, t.position);
}
function ix(e, t) {
  if (t.data && t.data.estree && e.evaluater)
    return (
      /** @type {Child | undefined} */
      e.evaluater.evaluateProgram(t.data.estree)
    );
  Oo(e, t.position);
}
function ox(e, t, n) {
  const r = e.schema;
  let i = r;
  t.name === "svg" && r.space === "html" && (i = Pc, e.schema = i), e.ancestors.push(t);
  const a = t.name === null ? e.Fragment : xh(e, t.name, !0), o = dx(e, t), l = Fc(e, t);
  return wh(e, o, a, t), Oc(o, l), e.ancestors.pop(), e.schema = r, e.create(t, a, o, n);
}
function ax(e, t, n) {
  const r = {};
  return Oc(r, Fc(e, t)), e.create(t, e.Fragment, r, n);
}
function sx(e, t) {
  return t.value;
}
function wh(e, t, n, r) {
  typeof n != "string" && n !== e.Fragment && e.passNode && (t.node = r);
}
function Oc(e, t) {
  if (t.length > 0) {
    const n = t.length > 1 ? t : t[0];
    n && (e.children = n);
  }
}
function lx(e, t, n) {
  return r;
  function r(i, a, o, l) {
    const s = Array.isArray(o.children) ? n : t;
    return l ? s(a, o, l) : s(a, o);
  }
}
function ux(e, t) {
  return n;
  function n(r, i, a, o) {
    const l = Array.isArray(a.children), u = Tc(r);
    return t(
      i,
      a,
      o,
      l,
      {
        columnNumber: u ? u.column - 1 : void 0,
        fileName: e,
        lineNumber: u ? u.line : void 0
      },
      void 0
    );
  }
}
function cx(e, t) {
  const n = {};
  let r, i;
  for (i in t.properties)
    if (i !== "children" && kc.call(t.properties, i)) {
      const a = fx(e, i, t.properties[i]);
      if (a) {
        const [o, l] = a;
        e.tableCellAlignToStyle && o === "align" && typeof l == "string" && ex.has(t.tagName) ? r = l : n[o] = l;
      }
    }
  if (r) {
    const a = (
      /** @type {Style} */
      n.style || (n.style = {})
    );
    a[e.stylePropertyNameCase === "css" ? "text-align" : "textAlign"] = r;
  }
  return n;
}
function dx(e, t) {
  const n = {};
  for (const r of t.attributes)
    if (r.type === "mdxJsxExpressionAttribute")
      if (r.data && r.data.estree && e.evaluater) {
        const a = r.data.estree.body[0];
        a.type;
        const o = a.expression;
        o.type;
        const l = o.properties[0];
        l.type, Object.assign(
          n,
          e.evaluater.evaluateExpression(l.argument)
        );
      } else
        Oo(e, t.position);
    else {
      const i = r.name;
      let a;
      if (r.value && typeof r.value == "object")
        if (r.value.data && r.value.data.estree && e.evaluater) {
          const l = r.value.data.estree.body[0];
          l.type, a = e.evaluater.evaluateExpression(l.expression);
        } else
          Oo(e, t.position);
      else
        a = r.value === null ? !0 : r.value;
      n[i] = /** @type {Props[keyof Props]} */
      a;
    }
  return n;
}
function Fc(e, t) {
  const n = [];
  let r = -1;
  const i = e.passKeys ? /* @__PURE__ */ new Map() : Uw;
  for (; ++r < t.children.length; ) {
    const a = t.children[r];
    let o;
    if (e.passKeys) {
      const u = a.type === "element" ? a.tagName : a.type === "mdxJsxFlowElement" || a.type === "mdxJsxTextElement" ? a.name : void 0;
      if (u) {
        const s = i.get(u) || 0;
        o = u + "-" + s, i.set(u, s + 1);
      }
    }
    const l = yh(e, a, o);
    l !== void 0 && n.push(l);
  }
  return n;
}
function fx(e, t, n) {
  const r = Lw(e.schema, t);
  if (!(n == null || typeof n == "number" && Number.isNaN(n))) {
    if (Array.isArray(n) && (n = r.commaSeparated ? Aw(n) : Ww(n)), r.property === "style") {
      let i = typeof n == "object" ? n : px(e, String(n));
      return e.stylePropertyNameCase === "css" && (i = gx(i)), ["style", i];
    }
    return [
      e.elementAttributeNameCase === "react" && r.space ? zw[r.property] || r.property : r.attribute,
      n
    ];
  }
}
function px(e, t) {
  const n = {};
  try {
    Zw(t, r);
  } catch (i) {
    if (!e.ignoreInvalidStyle) {
      const a = (
        /** @type {Error} */
        i
      ), o = new Nn("Cannot parse `style` attribute", {
        ancestors: e.ancestors,
        cause: a,
        ruleId: "style",
        source: "hast-util-to-jsx-runtime"
      });
      throw o.file = e.filePath || void 0, o.url = bh + "#cannot-parse-style-attribute", o;
    }
  }
  return n;
  function r(i, a) {
    let o = i;
    o.slice(0, 2) !== "--" && (o.slice(0, 4) === "-ms-" && (o = "ms-" + o.slice(4)), o = o.replace(Qw, mx)), n[o] = a;
  }
}
function xh(e, t, n) {
  let r;
  if (!n)
    r = { type: "Literal", value: t };
  else if (t.includes(".")) {
    const i = t.split(".");
    let a = -1, o;
    for (; ++a < i.length; ) {
      const l = ef(i[a]) ? { type: "Identifier", name: i[a] } : { type: "Literal", value: i[a] };
      o = o ? {
        type: "MemberExpression",
        object: o,
        property: l,
        computed: !!(a && l.type === "Literal"),
        optional: !1
      } : l;
    }
    r = o;
  } else
    r = ef(t) && !/^[a-z]/.test(t) ? { type: "Identifier", name: t } : { type: "Literal", value: t };
  if (r.type === "Literal") {
    const i = (
      /** @type {keyof JSX.IntrinsicElements} */
      r.value
    );
    return kc.call(e.components, i) ? e.components[i] : i;
  }
  if (e.evaluater)
    return e.evaluater.evaluateExpression(r);
  Oo(e);
}
function Oo(e, t) {
  const n = new Nn(
    "Cannot handle MDX estrees without `createEvaluater`",
    {
      ancestors: e.ancestors,
      place: t,
      ruleId: "mdx-estree",
      source: "hast-util-to-jsx-runtime"
    }
  );
  throw n.file = e.filePath || void 0, n.url = bh + "#cannot-handle-mdx-estrees-without-createevaluater", n;
}
function gx(e) {
  const t = {};
  let n;
  for (n in e)
    kc.call(e, n) && (t[hx(n)] = e[n]);
  return t;
}
function hx(e) {
  let t = e.replace(qw, vx);
  return t.slice(0, 3) === "ms-" && (t = "-" + t), t;
}
function mx(e, t) {
  return t.toUpperCase();
}
function vx(e) {
  return "-" + e.toLowerCase();
}
const Wl = {
  action: ["form"],
  cite: ["blockquote", "del", "ins", "q"],
  data: ["object"],
  formAction: ["button", "input"],
  href: ["a", "area", "base", "link"],
  icon: ["menuitem"],
  itemId: null,
  manifest: ["html"],
  ping: ["a", "area"],
  poster: ["video"],
  src: [
    "audio",
    "embed",
    "iframe",
    "img",
    "input",
    "script",
    "source",
    "track",
    "video"
  ]
}, bx = {};
function yx(e, t) {
  const n = bx, r = typeof n.includeImageAlt == "boolean" ? n.includeImageAlt : !0, i = typeof n.includeHtml == "boolean" ? n.includeHtml : !0;
  return Ch(e, r, i);
}
function Ch(e, t, n) {
  if (wx(e)) {
    if ("value" in e)
      return e.type === "html" && !n ? "" : e.value;
    if (t && "alt" in e && e.alt)
      return e.alt;
    if ("children" in e)
      return cf(e.children, t, n);
  }
  return Array.isArray(e) ? cf(e, t, n) : "";
}
function cf(e, t, n) {
  const r = [];
  let i = -1;
  for (; ++i < e.length; )
    r[i] = Ch(e[i], t, n);
  return r.join("");
}
function wx(e) {
  return !!(e && typeof e == "object");
}
const df = document.createElement("i");
function Bc(e) {
  const t = "&" + e + ";";
  df.innerHTML = t;
  const n = df.textContent;
  return n.charCodeAt(n.length - 1) === 59 && e !== "semi" || n === t ? !1 : n;
}
function Cr(e, t, n, r) {
  const i = e.length;
  let a = 0, o;
  if (t < 0 ? t = -t > i ? 0 : i + t : t = t > i ? i : t, n = n > 0 ? n : 0, r.length < 1e4)
    o = Array.from(r), o.unshift(t, n), e.splice(...o);
  else
    for (n && e.splice(t, n); a < r.length; )
      o = r.slice(a, a + 1e4), o.unshift(t, 0), e.splice(...o), a += 1e4, t += 1e4;
}
function rr(e, t) {
  return e.length > 0 ? (Cr(e, e.length, 0, t), e) : t;
}
const ff = {}.hasOwnProperty;
function xx(e) {
  const t = {};
  let n = -1;
  for (; ++n < e.length; )
    Cx(t, e[n]);
  return t;
}
function Cx(e, t) {
  let n;
  for (n in t) {
    const i = (ff.call(e, n) ? e[n] : void 0) || (e[n] = {}), a = t[n];
    let o;
    if (a)
      for (o in a) {
        ff.call(i, o) || (i[o] = []);
        const l = a[o];
        Sx(
          // @ts-expect-error Looks like a list.
          i[o],
          Array.isArray(l) ? l : l ? [l] : []
        );
      }
  }
}
function Sx(e, t) {
  let n = -1;
  const r = [];
  for (; ++n < t.length; )
    (t[n].add === "after" ? e : r).push(t[n]);
  Cr(e, 0, 0, r);
}
function Sh(e, t) {
  const n = Number.parseInt(e, t);
  return (
    // C0 except for HT, LF, FF, CR, space.
    n < 9 || n === 11 || n > 13 && n < 32 || // Control character (DEL) of C0, and C1 controls.
    n > 126 && n < 160 || // Lone high surrogates and low surrogates.
    n > 55295 && n < 57344 || // Noncharacters.
    n > 64975 && n < 65008 || /* eslint-disable no-bitwise */
    (n & 65535) === 65535 || (n & 65535) === 65534 || /* eslint-enable no-bitwise */
    // Out of range
    n > 1114111 ? "�" : String.fromCodePoint(n)
  );
}
function Ni(e) {
  return e.replace(/[\t\n\r ]+/g, " ").replace(/^ | $/g, "").toLowerCase().toUpperCase();
}
const br = Qr(/[A-Za-z]/), Zn = Qr(/[\dA-Za-z]/), Ix = Qr(/[#-'*+\--9=?A-Z^-~]/);
function _u(e) {
  return (
    // Special whitespace codes (which have negative values), C0 and Control
    // character DEL
    e !== null && (e < 32 || e === 127)
  );
}
const Mu = Qr(/\d/), Rx = Qr(/[\dA-Fa-f]/), Ex = Qr(/[!-/:-@[-`{-~]/);
function bt(e) {
  return e !== null && e < -2;
}
function Dn(e) {
  return e !== null && (e < 0 || e === 32);
}
function jt(e) {
  return e === -2 || e === -1 || e === 32;
}
const Ax = Qr(new RegExp("\\p{P}|\\p{S}", "u")), Px = Qr(/\s/);
function Qr(e) {
  return t;
  function t(n) {
    return n !== null && n > -1 && e.test(String.fromCharCode(n));
  }
}
function Xi(e) {
  const t = [];
  let n = -1, r = 0, i = 0;
  for (; ++n < e.length; ) {
    const a = e.charCodeAt(n);
    let o = "";
    if (a === 37 && Zn(e.charCodeAt(n + 1)) && Zn(e.charCodeAt(n + 2)))
      i = 2;
    else if (a < 128)
      /[!#$&-;=?-Z_a-z~]/.test(String.fromCharCode(a)) || (o = String.fromCharCode(a));
    else if (a > 55295 && a < 57344) {
      const l = e.charCodeAt(n + 1);
      a < 56320 && l > 56319 && l < 57344 ? (o = String.fromCharCode(a, l), i = 1) : o = "�";
    } else
      o = String.fromCharCode(a);
    o && (t.push(e.slice(r, n), encodeURIComponent(o)), r = n + i + 1, o = ""), i && (n += i, i = 0);
  }
  return t.join("") + e.slice(r);
}
function tn(e, t, n, r) {
  const i = r ? r - 1 : Number.POSITIVE_INFINITY;
  let a = 0;
  return o;
  function o(u) {
    return jt(u) ? (e.enter(n), l(u)) : t(u);
  }
  function l(u) {
    return jt(u) && a++ < i ? (e.consume(u), l) : (e.exit(n), t(u));
  }
}
const Tx = {
  tokenize: kx
};
function kx(e) {
  const t = e.attempt(this.parser.constructs.contentInitial, r, i);
  let n;
  return t;
  function r(l) {
    if (l === null) {
      e.consume(l);
      return;
    }
    return e.enter("lineEnding"), e.consume(l), e.exit("lineEnding"), tn(e, t, "linePrefix");
  }
  function i(l) {
    return e.enter("paragraph"), a(l);
  }
  function a(l) {
    const u = e.enter("chunkText", {
      contentType: "text",
      previous: n
    });
    return n && (n.next = u), n = u, o(l);
  }
  function o(l) {
    if (l === null) {
      e.exit("chunkText"), e.exit("paragraph"), e.consume(l);
      return;
    }
    return bt(l) ? (e.consume(l), e.exit("chunkText"), a) : (e.consume(l), o);
  }
}
const Ox = {
  tokenize: Fx
}, pf = {
  tokenize: Bx
};
function Fx(e) {
  const t = this, n = [];
  let r = 0, i, a, o;
  return l;
  function l(T) {
    if (r < n.length) {
      const D = n[r];
      return t.containerState = D[1], e.attempt(D[0].continuation, u, s)(T);
    }
    return s(T);
  }
  function u(T) {
    if (r++, t.containerState._closeFlow) {
      t.containerState._closeFlow = void 0, i && O();
      const D = t.events.length;
      let E = D, B;
      for (; E--; )
        if (t.events[E][0] === "exit" && t.events[E][1].type === "chunkFlow") {
          B = t.events[E][1].end;
          break;
        }
      I(r);
      let X = D;
      for (; X < t.events.length; )
        t.events[X][1].end = {
          ...B
        }, X++;
      return Cr(t.events, E + 1, 0, t.events.slice(D)), t.events.length = X, s(T);
    }
    return l(T);
  }
  function s(T) {
    if (r === n.length) {
      if (!i)
        return m(T);
      if (i.currentConstruct && i.currentConstruct.concrete)
        return x(T);
      t.interrupt = !!(i.currentConstruct && !i._gfmTableDynamicInterruptHack);
    }
    return t.containerState = {}, e.check(pf, d, c)(T);
  }
  function d(T) {
    return i && O(), I(r), m(T);
  }
  function c(T) {
    return t.parser.lazy[t.now().line] = r !== n.length, o = t.now().offset, x(T);
  }
  function m(T) {
    return t.containerState = {}, e.attempt(pf, h, x)(T);
  }
  function h(T) {
    return r++, n.push([t.currentConstruct, t.containerState]), m(T);
  }
  function x(T) {
    if (T === null) {
      i && O(), I(0), e.consume(T);
      return;
    }
    return i = i || t.parser.flow(t.now()), e.enter("chunkFlow", {
      _tokenizer: i,
      contentType: "flow",
      previous: a
    }), v(T);
  }
  function v(T) {
    if (T === null) {
      b(e.exit("chunkFlow"), !0), I(0), e.consume(T);
      return;
    }
    return bt(T) ? (e.consume(T), b(e.exit("chunkFlow")), r = 0, t.interrupt = void 0, l) : (e.consume(T), v);
  }
  function b(T, D) {
    const E = t.sliceStream(T);
    if (D && E.push(null), T.previous = a, a && (a.next = T), a = T, i.defineSkip(T.start), i.write(E), t.parser.lazy[T.start.line]) {
      let B = i.events.length;
      for (; B--; )
        if (
          // The token starts before the line ending…
          i.events[B][1].start.offset < o && // …and either is not ended yet…
          (!i.events[B][1].end || // …or ends after it.
          i.events[B][1].end.offset > o)
        )
          return;
      const X = t.events.length;
      let U = X, K, Fe;
      for (; U--; )
        if (t.events[U][0] === "exit" && t.events[U][1].type === "chunkFlow") {
          if (K) {
            Fe = t.events[U][1].end;
            break;
          }
          K = !0;
        }
      for (I(r), B = X; B < t.events.length; )
        t.events[B][1].end = {
          ...Fe
        }, B++;
      Cr(t.events, U + 1, 0, t.events.slice(X)), t.events.length = B;
    }
  }
  function I(T) {
    let D = n.length;
    for (; D-- > T; ) {
      const E = n[D];
      t.containerState = E[1], E[0].exit.call(t, e);
    }
    n.length = T;
  }
  function O() {
    i.write([null]), a = void 0, i = void 0, t.containerState._closeFlow = void 0;
  }
}
function Bx(e, t, n) {
  return tn(e, e.attempt(this.parser.constructs.document, t, n), "linePrefix", this.parser.constructs.disable.null.includes("codeIndented") ? void 0 : 4);
}
function gf(e) {
  if (e === null || Dn(e) || Px(e))
    return 1;
  if (Ax(e))
    return 2;
}
function Nc(e, t, n) {
  const r = [];
  let i = -1;
  for (; ++i < e.length; ) {
    const a = e[i].resolveAll;
    a && !r.includes(a) && (t = a(t, n), r.push(a));
  }
  return t;
}
const Vu = {
  name: "attention",
  resolveAll: Nx,
  tokenize: Gx
};
function Nx(e, t) {
  let n = -1, r, i, a, o, l, u, s, d;
  for (; ++n < e.length; )
    if (e[n][0] === "enter" && e[n][1].type === "attentionSequence" && e[n][1]._close) {
      for (r = n; r--; )
        if (e[r][0] === "exit" && e[r][1].type === "attentionSequence" && e[r][1]._open && // If the markers are the same:
        t.sliceSerialize(e[r][1]).charCodeAt(0) === t.sliceSerialize(e[n][1]).charCodeAt(0)) {
          if ((e[r][1]._close || e[n][1]._open) && (e[n][1].end.offset - e[n][1].start.offset) % 3 && !((e[r][1].end.offset - e[r][1].start.offset + e[n][1].end.offset - e[n][1].start.offset) % 3))
            continue;
          u = e[r][1].end.offset - e[r][1].start.offset > 1 && e[n][1].end.offset - e[n][1].start.offset > 1 ? 2 : 1;
          const c = {
            ...e[r][1].end
          }, m = {
            ...e[n][1].start
          };
          hf(c, -u), hf(m, u), o = {
            type: u > 1 ? "strongSequence" : "emphasisSequence",
            start: c,
            end: {
              ...e[r][1].end
            }
          }, l = {
            type: u > 1 ? "strongSequence" : "emphasisSequence",
            start: {
              ...e[n][1].start
            },
            end: m
          }, a = {
            type: u > 1 ? "strongText" : "emphasisText",
            start: {
              ...e[r][1].end
            },
            end: {
              ...e[n][1].start
            }
          }, i = {
            type: u > 1 ? "strong" : "emphasis",
            start: {
              ...o.start
            },
            end: {
              ...l.end
            }
          }, e[r][1].end = {
            ...o.start
          }, e[n][1].start = {
            ...l.end
          }, s = [], e[r][1].end.offset - e[r][1].start.offset && (s = rr(s, [["enter", e[r][1], t], ["exit", e[r][1], t]])), s = rr(s, [["enter", i, t], ["enter", o, t], ["exit", o, t], ["enter", a, t]]), s = rr(s, Nc(t.parser.constructs.insideSpan.null, e.slice(r + 1, n), t)), s = rr(s, [["exit", a, t], ["enter", l, t], ["exit", l, t], ["exit", i, t]]), e[n][1].end.offset - e[n][1].start.offset ? (d = 2, s = rr(s, [["enter", e[n][1], t], ["exit", e[n][1], t]])) : d = 0, Cr(e, r - 1, n - r + 3, s), n = r + s.length - d - 2;
          break;
        }
    }
  for (n = -1; ++n < e.length; )
    e[n][1].type === "attentionSequence" && (e[n][1].type = "data");
  return e;
}
function Gx(e, t) {
  const n = this.parser.constructs.attentionMarkers.null, r = this.previous, i = gf(r);
  let a;
  return o;
  function o(u) {
    return a = u, e.enter("attentionSequence"), l(u);
  }
  function l(u) {
    if (u === a)
      return e.consume(u), l;
    const s = e.exit("attentionSequence"), d = gf(u), c = !d || d === 2 && i || n.includes(u), m = !i || i === 2 && d || n.includes(r);
    return s._open = !!(a === 42 ? c : c && (i || !m)), s._close = !!(a === 42 ? m : m && (d || !c)), t(u);
  }
}
function hf(e, t) {
  e.column += t, e.offset += t, e._bufferIndex += t;
}
const _x = {
  name: "autolink",
  tokenize: Mx
};
function Mx(e, t, n) {
  let r = 0;
  return i;
  function i(h) {
    return e.enter("autolink"), e.enter("autolinkMarker"), e.consume(h), e.exit("autolinkMarker"), e.enter("autolinkProtocol"), a;
  }
  function a(h) {
    return br(h) ? (e.consume(h), o) : h === 64 ? n(h) : s(h);
  }
  function o(h) {
    return h === 43 || h === 45 || h === 46 || Zn(h) ? (r = 1, l(h)) : s(h);
  }
  function l(h) {
    return h === 58 ? (e.consume(h), r = 0, u) : (h === 43 || h === 45 || h === 46 || Zn(h)) && r++ < 32 ? (e.consume(h), l) : (r = 0, s(h));
  }
  function u(h) {
    return h === 62 ? (e.exit("autolinkProtocol"), e.enter("autolinkMarker"), e.consume(h), e.exit("autolinkMarker"), e.exit("autolink"), t) : h === null || h === 32 || h === 60 || _u(h) ? n(h) : (e.consume(h), u);
  }
  function s(h) {
    return h === 64 ? (e.consume(h), d) : Ix(h) ? (e.consume(h), s) : n(h);
  }
  function d(h) {
    return Zn(h) ? c(h) : n(h);
  }
  function c(h) {
    return h === 46 ? (e.consume(h), r = 0, d) : h === 62 ? (e.exit("autolinkProtocol").type = "autolinkEmail", e.enter("autolinkMarker"), e.consume(h), e.exit("autolinkMarker"), e.exit("autolink"), t) : m(h);
  }
  function m(h) {
    if ((h === 45 || Zn(h)) && r++ < 63) {
      const x = h === 45 ? m : c;
      return e.consume(h), x;
    }
    return n(h);
  }
}
const Rs = {
  partial: !0,
  tokenize: Vx
};
function Vx(e, t, n) {
  return r;
  function r(a) {
    return jt(a) ? tn(e, i, "linePrefix")(a) : i(a);
  }
  function i(a) {
    return a === null || bt(a) ? t(a) : n(a);
  }
}
const Ih = {
  continuation: {
    tokenize: Dx
  },
  exit: jx,
  name: "blockQuote",
  tokenize: Lx
};
function Lx(e, t, n) {
  const r = this;
  return i;
  function i(o) {
    if (o === 62) {
      const l = r.containerState;
      return l.open || (e.enter("blockQuote", {
        _container: !0
      }), l.open = !0), e.enter("blockQuotePrefix"), e.enter("blockQuoteMarker"), e.consume(o), e.exit("blockQuoteMarker"), a;
    }
    return n(o);
  }
  function a(o) {
    return jt(o) ? (e.enter("blockQuotePrefixWhitespace"), e.consume(o), e.exit("blockQuotePrefixWhitespace"), e.exit("blockQuotePrefix"), t) : (e.exit("blockQuotePrefix"), t(o));
  }
}
function Dx(e, t, n) {
  const r = this;
  return i;
  function i(o) {
    return jt(o) ? tn(e, a, "linePrefix", r.parser.constructs.disable.null.includes("codeIndented") ? void 0 : 4)(o) : a(o);
  }
  function a(o) {
    return e.attempt(Ih, t, n)(o);
  }
}
function jx(e) {
  e.exit("blockQuote");
}
const Rh = {
  name: "characterEscape",
  tokenize: zx
};
function zx(e, t, n) {
  return r;
  function r(a) {
    return e.enter("characterEscape"), e.enter("escapeMarker"), e.consume(a), e.exit("escapeMarker"), i;
  }
  function i(a) {
    return Ex(a) ? (e.enter("characterEscapeValue"), e.consume(a), e.exit("characterEscapeValue"), e.exit("characterEscape"), t) : n(a);
  }
}
const Eh = {
  name: "characterReference",
  tokenize: Hx
};
function Hx(e, t, n) {
  const r = this;
  let i = 0, a, o;
  return l;
  function l(c) {
    return e.enter("characterReference"), e.enter("characterReferenceMarker"), e.consume(c), e.exit("characterReferenceMarker"), u;
  }
  function u(c) {
    return c === 35 ? (e.enter("characterReferenceMarkerNumeric"), e.consume(c), e.exit("characterReferenceMarkerNumeric"), s) : (e.enter("characterReferenceValue"), a = 31, o = Zn, d(c));
  }
  function s(c) {
    return c === 88 || c === 120 ? (e.enter("characterReferenceMarkerHexadecimal"), e.consume(c), e.exit("characterReferenceMarkerHexadecimal"), e.enter("characterReferenceValue"), a = 6, o = Rx, d) : (e.enter("characterReferenceValue"), a = 7, o = Mu, d(c));
  }
  function d(c) {
    if (c === 59 && i) {
      const m = e.exit("characterReferenceValue");
      return o === Zn && !Bc(r.sliceSerialize(m)) ? n(c) : (e.enter("characterReferenceMarker"), e.consume(c), e.exit("characterReferenceMarker"), e.exit("characterReference"), t);
    }
    return o(c) && i++ < a ? (e.consume(c), d) : n(c);
  }
}
const mf = {
  partial: !0,
  tokenize: $x
}, vf = {
  concrete: !0,
  name: "codeFenced",
  tokenize: Wx
};
function Wx(e, t, n) {
  const r = this, i = {
    partial: !0,
    tokenize: E
  };
  let a = 0, o = 0, l;
  return u;
  function u(B) {
    return s(B);
  }
  function s(B) {
    const X = r.events[r.events.length - 1];
    return a = X && X[1].type === "linePrefix" ? X[2].sliceSerialize(X[1], !0).length : 0, l = B, e.enter("codeFenced"), e.enter("codeFencedFence"), e.enter("codeFencedFenceSequence"), d(B);
  }
  function d(B) {
    return B === l ? (o++, e.consume(B), d) : o < 3 ? n(B) : (e.exit("codeFencedFenceSequence"), jt(B) ? tn(e, c, "whitespace")(B) : c(B));
  }
  function c(B) {
    return B === null || bt(B) ? (e.exit("codeFencedFence"), r.interrupt ? t(B) : e.check(mf, v, D)(B)) : (e.enter("codeFencedFenceInfo"), e.enter("chunkString", {
      contentType: "string"
    }), m(B));
  }
  function m(B) {
    return B === null || bt(B) ? (e.exit("chunkString"), e.exit("codeFencedFenceInfo"), c(B)) : jt(B) ? (e.exit("chunkString"), e.exit("codeFencedFenceInfo"), tn(e, h, "whitespace")(B)) : B === 96 && B === l ? n(B) : (e.consume(B), m);
  }
  function h(B) {
    return B === null || bt(B) ? c(B) : (e.enter("codeFencedFenceMeta"), e.enter("chunkString", {
      contentType: "string"
    }), x(B));
  }
  function x(B) {
    return B === null || bt(B) ? (e.exit("chunkString"), e.exit("codeFencedFenceMeta"), c(B)) : B === 96 && B === l ? n(B) : (e.consume(B), x);
  }
  function v(B) {
    return e.attempt(i, D, b)(B);
  }
  function b(B) {
    return e.enter("lineEnding"), e.consume(B), e.exit("lineEnding"), I;
  }
  function I(B) {
    return a > 0 && jt(B) ? tn(e, O, "linePrefix", a + 1)(B) : O(B);
  }
  function O(B) {
    return B === null || bt(B) ? e.check(mf, v, D)(B) : (e.enter("codeFlowValue"), T(B));
  }
  function T(B) {
    return B === null || bt(B) ? (e.exit("codeFlowValue"), O(B)) : (e.consume(B), T);
  }
  function D(B) {
    return e.exit("codeFenced"), t(B);
  }
  function E(B, X, U) {
    let K = 0;
    return Fe;
    function Fe(ue) {
      return B.enter("lineEnding"), B.consume(ue), B.exit("lineEnding"), oe;
    }
    function oe(ue) {
      return B.enter("codeFencedFence"), jt(ue) ? tn(B, ce, "linePrefix", r.parser.constructs.disable.null.includes("codeIndented") ? void 0 : 4)(ue) : ce(ue);
    }
    function ce(ue) {
      return ue === l ? (B.enter("codeFencedFenceSequence"), ye(ue)) : U(ue);
    }
    function ye(ue) {
      return ue === l ? (K++, B.consume(ue), ye) : K >= o ? (B.exit("codeFencedFenceSequence"), jt(ue) ? tn(B, Q, "whitespace")(ue) : Q(ue)) : U(ue);
    }
    function Q(ue) {
      return ue === null || bt(ue) ? (B.exit("codeFencedFence"), X(ue)) : U(ue);
    }
  }
}
function $x(e, t, n) {
  const r = this;
  return i;
  function i(o) {
    return o === null ? n(o) : (e.enter("lineEnding"), e.consume(o), e.exit("lineEnding"), a);
  }
  function a(o) {
    return r.parser.lazy[r.now().line] ? n(o) : t(o);
  }
}
const $l = {
  name: "codeIndented",
  tokenize: Yx
}, Xx = {
  partial: !0,
  tokenize: Zx
};
function Yx(e, t, n) {
  const r = this;
  return i;
  function i(s) {
    return e.enter("codeIndented"), tn(e, a, "linePrefix", 5)(s);
  }
  function a(s) {
    const d = r.events[r.events.length - 1];
    return d && d[1].type === "linePrefix" && d[2].sliceSerialize(d[1], !0).length >= 4 ? o(s) : n(s);
  }
  function o(s) {
    return s === null ? u(s) : bt(s) ? e.attempt(Xx, o, u)(s) : (e.enter("codeFlowValue"), l(s));
  }
  function l(s) {
    return s === null || bt(s) ? (e.exit("codeFlowValue"), o(s)) : (e.consume(s), l);
  }
  function u(s) {
    return e.exit("codeIndented"), t(s);
  }
}
function Zx(e, t, n) {
  const r = this;
  return i;
  function i(o) {
    return r.parser.lazy[r.now().line] ? n(o) : bt(o) ? (e.enter("lineEnding"), e.consume(o), e.exit("lineEnding"), i) : tn(e, a, "linePrefix", 5)(o);
  }
  function a(o) {
    const l = r.events[r.events.length - 1];
    return l && l[1].type === "linePrefix" && l[2].sliceSerialize(l[1], !0).length >= 4 ? t(o) : bt(o) ? i(o) : n(o);
  }
}
const Jx = {
  name: "codeText",
  previous: qx,
  resolve: Ux,
  tokenize: Qx
};
function Ux(e) {
  let t = e.length - 4, n = 3, r, i;
  if ((e[n][1].type === "lineEnding" || e[n][1].type === "space") && (e[t][1].type === "lineEnding" || e[t][1].type === "space")) {
    for (r = n; ++r < t; )
      if (e[r][1].type === "codeTextData") {
        e[n][1].type = "codeTextPadding", e[t][1].type = "codeTextPadding", n += 2, t -= 2;
        break;
      }
  }
  for (r = n - 1, t++; ++r <= t; )
    i === void 0 ? r !== t && e[r][1].type !== "lineEnding" && (i = r) : (r === t || e[r][1].type === "lineEnding") && (e[i][1].type = "codeTextData", r !== i + 2 && (e[i][1].end = e[r - 1][1].end, e.splice(i + 2, r - i - 2), t -= r - i - 2, r = i + 2), i = void 0);
  return e;
}
function qx(e) {
  return e !== 96 || this.events[this.events.length - 1][1].type === "characterEscape";
}
function Qx(e, t, n) {
  let r = 0, i, a;
  return o;
  function o(c) {
    return e.enter("codeText"), e.enter("codeTextSequence"), l(c);
  }
  function l(c) {
    return c === 96 ? (e.consume(c), r++, l) : (e.exit("codeTextSequence"), u(c));
  }
  function u(c) {
    return c === null ? n(c) : c === 32 ? (e.enter("space"), e.consume(c), e.exit("space"), u) : c === 96 ? (a = e.enter("codeTextSequence"), i = 0, d(c)) : bt(c) ? (e.enter("lineEnding"), e.consume(c), e.exit("lineEnding"), u) : (e.enter("codeTextData"), s(c));
  }
  function s(c) {
    return c === null || c === 32 || c === 96 || bt(c) ? (e.exit("codeTextData"), u(c)) : (e.consume(c), s);
  }
  function d(c) {
    return c === 96 ? (e.consume(c), i++, d) : i === r ? (e.exit("codeTextSequence"), e.exit("codeText"), t(c)) : (a.type = "codeTextData", s(c));
  }
}
class Kx {
  /**
   * @param {ReadonlyArray<T> | null | undefined} [initial]
   *   Initial items (optional).
   * @returns
   *   Splice buffer.
   */
  constructor(t) {
    this.left = t ? [...t] : [], this.right = [];
  }
  /**
   * Array access;
   * does not move the cursor.
   *
   * @param {number} index
   *   Index.
   * @return {T}
   *   Item.
   */
  get(t) {
    if (t < 0 || t >= this.left.length + this.right.length)
      throw new RangeError("Cannot access index `" + t + "` in a splice buffer of size `" + (this.left.length + this.right.length) + "`");
    return t < this.left.length ? this.left[t] : this.right[this.right.length - t + this.left.length - 1];
  }
  /**
   * The length of the splice buffer, one greater than the largest index in the
   * array.
   */
  get length() {
    return this.left.length + this.right.length;
  }
  /**
   * Remove and return `list[0]`;
   * moves the cursor to `0`.
   *
   * @returns {T | undefined}
   *   Item, optional.
   */
  shift() {
    return this.setCursor(0), this.right.pop();
  }
  /**
   * Slice the buffer to get an array;
   * does not move the cursor.
   *
   * @param {number} start
   *   Start.
   * @param {number | null | undefined} [end]
   *   End (optional).
   * @returns {Array<T>}
   *   Array of items.
   */
  slice(t, n) {
    const r = n ?? Number.POSITIVE_INFINITY;
    return r < this.left.length ? this.left.slice(t, r) : t > this.left.length ? this.right.slice(this.right.length - r + this.left.length, this.right.length - t + this.left.length).reverse() : this.left.slice(t).concat(this.right.slice(this.right.length - r + this.left.length).reverse());
  }
  /**
   * Mimics the behavior of Array.prototype.splice() except for the change of
   * interface necessary to avoid segfaults when patching in very large arrays.
   *
   * This operation moves cursor is moved to `start` and results in the cursor
   * placed after any inserted items.
   *
   * @param {number} start
   *   Start;
   *   zero-based index at which to start changing the array;
   *   negative numbers count backwards from the end of the array and values
   *   that are out-of bounds are clamped to the appropriate end of the array.
   * @param {number | null | undefined} [deleteCount=0]
   *   Delete count (default: `0`);
   *   maximum number of elements to delete, starting from start.
   * @param {Array<T> | null | undefined} [items=[]]
   *   Items to include in place of the deleted items (default: `[]`).
   * @return {Array<T>}
   *   Any removed items.
   */
  splice(t, n, r) {
    const i = n || 0;
    this.setCursor(Math.trunc(t));
    const a = this.right.splice(this.right.length - i, Number.POSITIVE_INFINITY);
    return r && co(this.left, r), a.reverse();
  }
  /**
   * Remove and return the highest-numbered item in the array, so
   * `list[list.length - 1]`;
   * Moves the cursor to `length`.
   *
   * @returns {T | undefined}
   *   Item, optional.
   */
  pop() {
    return this.setCursor(Number.POSITIVE_INFINITY), this.left.pop();
  }
  /**
   * Inserts a single item to the high-numbered side of the array;
   * moves the cursor to `length`.
   *
   * @param {T} item
   *   Item.
   * @returns {undefined}
   *   Nothing.
   */
  push(t) {
    this.setCursor(Number.POSITIVE_INFINITY), this.left.push(t);
  }
  /**
   * Inserts many items to the high-numbered side of the array.
   * Moves the cursor to `length`.
   *
   * @param {Array<T>} items
   *   Items.
   * @returns {undefined}
   *   Nothing.
   */
  pushMany(t) {
    this.setCursor(Number.POSITIVE_INFINITY), co(this.left, t);
  }
  /**
   * Inserts a single item to the low-numbered side of the array;
   * Moves the cursor to `0`.
   *
   * @param {T} item
   *   Item.
   * @returns {undefined}
   *   Nothing.
   */
  unshift(t) {
    this.setCursor(0), this.right.push(t);
  }
  /**
   * Inserts many items to the low-numbered side of the array;
   * moves the cursor to `0`.
   *
   * @param {Array<T>} items
   *   Items.
   * @returns {undefined}
   *   Nothing.
   */
  unshiftMany(t) {
    this.setCursor(0), co(this.right, t.reverse());
  }
  /**
   * Move the cursor to a specific position in the array. Requires
   * time proportional to the distance moved.
   *
   * If `n < 0`, the cursor will end up at the beginning.
   * If `n > length`, the cursor will end up at the end.
   *
   * @param {number} n
   *   Position.
   * @return {undefined}
   *   Nothing.
   */
  setCursor(t) {
    if (!(t === this.left.length || t > this.left.length && this.right.length === 0 || t < 0 && this.left.length === 0))
      if (t < this.left.length) {
        const n = this.left.splice(t, Number.POSITIVE_INFINITY);
        co(this.right, n.reverse());
      } else {
        const n = this.right.splice(this.left.length + this.right.length - t, Number.POSITIVE_INFINITY);
        co(this.left, n.reverse());
      }
  }
}
function co(e, t) {
  let n = 0;
  if (t.length < 1e4)
    e.push(...t);
  else
    for (; n < t.length; )
      e.push(...t.slice(n, n + 1e4)), n += 1e4;
}
function Ah(e) {
  const t = {};
  let n = -1, r, i, a, o, l, u, s;
  const d = new Kx(e);
  for (; ++n < d.length; ) {
    for (; n in t; )
      n = t[n];
    if (r = d.get(n), n && r[1].type === "chunkFlow" && d.get(n - 1)[1].type === "listItemPrefix" && (u = r[1]._tokenizer.events, a = 0, a < u.length && u[a][1].type === "lineEndingBlank" && (a += 2), a < u.length && u[a][1].type === "content"))
      for (; ++a < u.length && u[a][1].type !== "content"; )
        u[a][1].type === "chunkText" && (u[a][1]._isInFirstContentOfListItem = !0, a++);
    if (r[0] === "enter")
      r[1].contentType && (Object.assign(t, eC(d, n)), n = t[n], s = !0);
    else if (r[1]._container) {
      for (a = n, i = void 0; a--; )
        if (o = d.get(a), o[1].type === "lineEnding" || o[1].type === "lineEndingBlank")
          o[0] === "enter" && (i && (d.get(i)[1].type = "lineEndingBlank"), o[1].type = "lineEnding", i = a);
        else if (o[1].type !== "linePrefix") break;
      i && (r[1].end = {
        ...d.get(i)[1].start
      }, l = d.slice(i, n), l.unshift(r), d.splice(i, n - i + 1, l));
    }
  }
  return Cr(e, 0, Number.POSITIVE_INFINITY, d.slice(0)), !s;
}
function eC(e, t) {
  const n = e.get(t)[1], r = e.get(t)[2];
  let i = t - 1;
  const a = [], o = n._tokenizer || r.parser[n.contentType](n.start), l = o.events, u = [], s = {};
  let d, c, m = -1, h = n, x = 0, v = 0;
  const b = [v];
  for (; h; ) {
    for (; e.get(++i)[1] !== h; )
      ;
    a.push(i), h._tokenizer || (d = r.sliceStream(h), h.next || d.push(null), c && o.defineSkip(h.start), h._isInFirstContentOfListItem && (o._gfmTasklistFirstContentOfListItem = !0), o.write(d), h._isInFirstContentOfListItem && (o._gfmTasklistFirstContentOfListItem = void 0)), c = h, h = h.next;
  }
  for (h = n; ++m < l.length; )
    // Find a void token that includes a break.
    l[m][0] === "exit" && l[m - 1][0] === "enter" && l[m][1].type === l[m - 1][1].type && l[m][1].start.line !== l[m][1].end.line && (v = m + 1, b.push(v), h._tokenizer = void 0, h.previous = void 0, h = h.next);
  for (o.events = [], h ? (h._tokenizer = void 0, h.previous = void 0) : b.pop(), m = b.length; m--; ) {
    const I = l.slice(b[m], b[m + 1]), O = a.pop();
    u.push([O, O + I.length - 1]), e.splice(O, 2, I);
  }
  for (u.reverse(), m = -1; ++m < u.length; )
    s[x + u[m][0]] = x + u[m][1], x += u[m][1] - u[m][0] - 1;
  return s;
}
const tC = {
  resolve: rC,
  tokenize: iC
}, nC = {
  partial: !0,
  tokenize: oC
};
function rC(e) {
  return Ah(e), e;
}
function iC(e, t) {
  let n;
  return r;
  function r(l) {
    return e.enter("content"), n = e.enter("chunkContent", {
      contentType: "content"
    }), i(l);
  }
  function i(l) {
    return l === null ? a(l) : bt(l) ? e.check(nC, o, a)(l) : (e.consume(l), i);
  }
  function a(l) {
    return e.exit("chunkContent"), e.exit("content"), t(l);
  }
  function o(l) {
    return e.consume(l), e.exit("chunkContent"), n.next = e.enter("chunkContent", {
      contentType: "content",
      previous: n
    }), n = n.next, i;
  }
}
function oC(e, t, n) {
  const r = this;
  return i;
  function i(o) {
    return e.exit("chunkContent"), e.enter("lineEnding"), e.consume(o), e.exit("lineEnding"), tn(e, a, "linePrefix");
  }
  function a(o) {
    if (o === null || bt(o))
      return n(o);
    const l = r.events[r.events.length - 1];
    return !r.parser.constructs.disable.null.includes("codeIndented") && l && l[1].type === "linePrefix" && l[2].sliceSerialize(l[1], !0).length >= 4 ? t(o) : e.interrupt(r.parser.constructs.flow, n, t)(o);
  }
}
function Ph(e, t, n, r, i, a, o, l, u) {
  const s = u || Number.POSITIVE_INFINITY;
  let d = 0;
  return c;
  function c(I) {
    return I === 60 ? (e.enter(r), e.enter(i), e.enter(a), e.consume(I), e.exit(a), m) : I === null || I === 32 || I === 41 || _u(I) ? n(I) : (e.enter(r), e.enter(o), e.enter(l), e.enter("chunkString", {
      contentType: "string"
    }), v(I));
  }
  function m(I) {
    return I === 62 ? (e.enter(a), e.consume(I), e.exit(a), e.exit(i), e.exit(r), t) : (e.enter(l), e.enter("chunkString", {
      contentType: "string"
    }), h(I));
  }
  function h(I) {
    return I === 62 ? (e.exit("chunkString"), e.exit(l), m(I)) : I === null || I === 60 || bt(I) ? n(I) : (e.consume(I), I === 92 ? x : h);
  }
  function x(I) {
    return I === 60 || I === 62 || I === 92 ? (e.consume(I), h) : h(I);
  }
  function v(I) {
    return !d && (I === null || I === 41 || Dn(I)) ? (e.exit("chunkString"), e.exit(l), e.exit(o), e.exit(r), t(I)) : d < s && I === 40 ? (e.consume(I), d++, v) : I === 41 ? (e.consume(I), d--, v) : I === null || I === 32 || I === 40 || _u(I) ? n(I) : (e.consume(I), I === 92 ? b : v);
  }
  function b(I) {
    return I === 40 || I === 41 || I === 92 ? (e.consume(I), v) : v(I);
  }
}
function Th(e, t, n, r, i, a) {
  const o = this;
  let l = 0, u;
  return s;
  function s(h) {
    return e.enter(r), e.enter(i), e.consume(h), e.exit(i), e.enter(a), d;
  }
  function d(h) {
    return l > 999 || h === null || h === 91 || h === 93 && !u || // To do: remove in the future once we’ve switched from
    // `micromark-extension-footnote` to `micromark-extension-gfm-footnote`,
    // which doesn’t need this.
    // Hidden footnotes hook.
    /* c8 ignore next 3 */
    h === 94 && !l && "_hiddenFootnoteSupport" in o.parser.constructs ? n(h) : h === 93 ? (e.exit(a), e.enter(i), e.consume(h), e.exit(i), e.exit(r), t) : bt(h) ? (e.enter("lineEnding"), e.consume(h), e.exit("lineEnding"), d) : (e.enter("chunkString", {
      contentType: "string"
    }), c(h));
  }
  function c(h) {
    return h === null || h === 91 || h === 93 || bt(h) || l++ > 999 ? (e.exit("chunkString"), d(h)) : (e.consume(h), u || (u = !jt(h)), h === 92 ? m : c);
  }
  function m(h) {
    return h === 91 || h === 92 || h === 93 ? (e.consume(h), l++, c) : c(h);
  }
}
function kh(e, t, n, r, i, a) {
  let o;
  return l;
  function l(m) {
    return m === 34 || m === 39 || m === 40 ? (e.enter(r), e.enter(i), e.consume(m), e.exit(i), o = m === 40 ? 41 : m, u) : n(m);
  }
  function u(m) {
    return m === o ? (e.enter(i), e.consume(m), e.exit(i), e.exit(r), t) : (e.enter(a), s(m));
  }
  function s(m) {
    return m === o ? (e.exit(a), u(o)) : m === null ? n(m) : bt(m) ? (e.enter("lineEnding"), e.consume(m), e.exit("lineEnding"), tn(e, s, "linePrefix")) : (e.enter("chunkString", {
      contentType: "string"
    }), d(m));
  }
  function d(m) {
    return m === o || m === null || bt(m) ? (e.exit("chunkString"), s(m)) : (e.consume(m), m === 92 ? c : d);
  }
  function c(m) {
    return m === o || m === 92 ? (e.consume(m), d) : d(m);
  }
}
function Co(e, t) {
  let n;
  return r;
  function r(i) {
    return bt(i) ? (e.enter("lineEnding"), e.consume(i), e.exit("lineEnding"), n = !0, r) : jt(i) ? tn(e, r, n ? "linePrefix" : "lineSuffix")(i) : t(i);
  }
}
const aC = {
  name: "definition",
  tokenize: lC
}, sC = {
  partial: !0,
  tokenize: uC
};
function lC(e, t, n) {
  const r = this;
  let i;
  return a;
  function a(h) {
    return e.enter("definition"), o(h);
  }
  function o(h) {
    return Th.call(
      r,
      e,
      l,
      // Note: we don’t need to reset the way `markdown-rs` does.
      n,
      "definitionLabel",
      "definitionLabelMarker",
      "definitionLabelString"
    )(h);
  }
  function l(h) {
    return i = Ni(r.sliceSerialize(r.events[r.events.length - 1][1]).slice(1, -1)), h === 58 ? (e.enter("definitionMarker"), e.consume(h), e.exit("definitionMarker"), u) : n(h);
  }
  function u(h) {
    return Dn(h) ? Co(e, s)(h) : s(h);
  }
  function s(h) {
    return Ph(
      e,
      d,
      // Note: we don’t need to reset the way `markdown-rs` does.
      n,
      "definitionDestination",
      "definitionDestinationLiteral",
      "definitionDestinationLiteralMarker",
      "definitionDestinationRaw",
      "definitionDestinationString"
    )(h);
  }
  function d(h) {
    return e.attempt(sC, c, c)(h);
  }
  function c(h) {
    return jt(h) ? tn(e, m, "whitespace")(h) : m(h);
  }
  function m(h) {
    return h === null || bt(h) ? (e.exit("definition"), r.parser.defined.push(i), t(h)) : n(h);
  }
}
function uC(e, t, n) {
  return r;
  function r(l) {
    return Dn(l) ? Co(e, i)(l) : n(l);
  }
  function i(l) {
    return kh(e, a, n, "definitionTitle", "definitionTitleMarker", "definitionTitleString")(l);
  }
  function a(l) {
    return jt(l) ? tn(e, o, "whitespace")(l) : o(l);
  }
  function o(l) {
    return l === null || bt(l) ? t(l) : n(l);
  }
}
const cC = {
  name: "hardBreakEscape",
  tokenize: dC
};
function dC(e, t, n) {
  return r;
  function r(a) {
    return e.enter("hardBreakEscape"), e.consume(a), i;
  }
  function i(a) {
    return bt(a) ? (e.exit("hardBreakEscape"), t(a)) : n(a);
  }
}
const fC = {
  name: "headingAtx",
  resolve: pC,
  tokenize: gC
};
function pC(e, t) {
  let n = e.length - 2, r = 3, i, a;
  return e[r][1].type === "whitespace" && (r += 2), n - 2 > r && e[n][1].type === "whitespace" && (n -= 2), e[n][1].type === "atxHeadingSequence" && (r === n - 1 || n - 4 > r && e[n - 2][1].type === "whitespace") && (n -= r + 1 === n ? 2 : 4), n > r && (i = {
    type: "atxHeadingText",
    start: e[r][1].start,
    end: e[n][1].end
  }, a = {
    type: "chunkText",
    start: e[r][1].start,
    end: e[n][1].end,
    contentType: "text"
  }, Cr(e, r, n - r + 1, [["enter", i, t], ["enter", a, t], ["exit", a, t], ["exit", i, t]])), e;
}
function gC(e, t, n) {
  let r = 0;
  return i;
  function i(d) {
    return e.enter("atxHeading"), a(d);
  }
  function a(d) {
    return e.enter("atxHeadingSequence"), o(d);
  }
  function o(d) {
    return d === 35 && r++ < 6 ? (e.consume(d), o) : d === null || Dn(d) ? (e.exit("atxHeadingSequence"), l(d)) : n(d);
  }
  function l(d) {
    return d === 35 ? (e.enter("atxHeadingSequence"), u(d)) : d === null || bt(d) ? (e.exit("atxHeading"), t(d)) : jt(d) ? tn(e, l, "whitespace")(d) : (e.enter("atxHeadingText"), s(d));
  }
  function u(d) {
    return d === 35 ? (e.consume(d), u) : (e.exit("atxHeadingSequence"), l(d));
  }
  function s(d) {
    return d === null || d === 35 || Dn(d) ? (e.exit("atxHeadingText"), l(d)) : (e.consume(d), s);
  }
}
const hC = [
  "address",
  "article",
  "aside",
  "base",
  "basefont",
  "blockquote",
  "body",
  "caption",
  "center",
  "col",
  "colgroup",
  "dd",
  "details",
  "dialog",
  "dir",
  "div",
  "dl",
  "dt",
  "fieldset",
  "figcaption",
  "figure",
  "footer",
  "form",
  "frame",
  "frameset",
  "h1",
  "h2",
  "h3",
  "h4",
  "h5",
  "h6",
  "head",
  "header",
  "hr",
  "html",
  "iframe",
  "legend",
  "li",
  "link",
  "main",
  "menu",
  "menuitem",
  "nav",
  "noframes",
  "ol",
  "optgroup",
  "option",
  "p",
  "param",
  "search",
  "section",
  "summary",
  "table",
  "tbody",
  "td",
  "tfoot",
  "th",
  "thead",
  "title",
  "tr",
  "track",
  "ul"
], bf = ["pre", "script", "style", "textarea"], mC = {
  concrete: !0,
  name: "htmlFlow",
  resolveTo: yC,
  tokenize: wC
}, vC = {
  partial: !0,
  tokenize: CC
}, bC = {
  partial: !0,
  tokenize: xC
};
function yC(e) {
  let t = e.length;
  for (; t-- && !(e[t][0] === "enter" && e[t][1].type === "htmlFlow"); )
    ;
  return t > 1 && e[t - 2][1].type === "linePrefix" && (e[t][1].start = e[t - 2][1].start, e[t + 1][1].start = e[t - 2][1].start, e.splice(t - 2, 2)), e;
}
function wC(e, t, n) {
  const r = this;
  let i, a, o, l, u;
  return s;
  function s(w) {
    return d(w);
  }
  function d(w) {
    return e.enter("htmlFlow"), e.enter("htmlFlowData"), e.consume(w), c;
  }
  function c(w) {
    return w === 33 ? (e.consume(w), m) : w === 47 ? (e.consume(w), a = !0, v) : w === 63 ? (e.consume(w), i = 3, r.interrupt ? t : G) : br(w) ? (e.consume(w), o = String.fromCharCode(w), b) : n(w);
  }
  function m(w) {
    return w === 45 ? (e.consume(w), i = 2, h) : w === 91 ? (e.consume(w), i = 5, l = 0, x) : br(w) ? (e.consume(w), i = 4, r.interrupt ? t : G) : n(w);
  }
  function h(w) {
    return w === 45 ? (e.consume(w), r.interrupt ? t : G) : n(w);
  }
  function x(w) {
    const H = "CDATA[";
    return w === H.charCodeAt(l++) ? (e.consume(w), l === H.length ? r.interrupt ? t : ce : x) : n(w);
  }
  function v(w) {
    return br(w) ? (e.consume(w), o = String.fromCharCode(w), b) : n(w);
  }
  function b(w) {
    if (w === null || w === 47 || w === 62 || Dn(w)) {
      const H = w === 47, $ = o.toLowerCase();
      return !H && !a && bf.includes($) ? (i = 1, r.interrupt ? t(w) : ce(w)) : hC.includes(o.toLowerCase()) ? (i = 6, H ? (e.consume(w), I) : r.interrupt ? t(w) : ce(w)) : (i = 7, r.interrupt && !r.parser.lazy[r.now().line] ? n(w) : a ? O(w) : T(w));
    }
    return w === 45 || Zn(w) ? (e.consume(w), o += String.fromCharCode(w), b) : n(w);
  }
  function I(w) {
    return w === 62 ? (e.consume(w), r.interrupt ? t : ce) : n(w);
  }
  function O(w) {
    return jt(w) ? (e.consume(w), O) : Fe(w);
  }
  function T(w) {
    return w === 47 ? (e.consume(w), Fe) : w === 58 || w === 95 || br(w) ? (e.consume(w), D) : jt(w) ? (e.consume(w), T) : Fe(w);
  }
  function D(w) {
    return w === 45 || w === 46 || w === 58 || w === 95 || Zn(w) ? (e.consume(w), D) : E(w);
  }
  function E(w) {
    return w === 61 ? (e.consume(w), B) : jt(w) ? (e.consume(w), E) : T(w);
  }
  function B(w) {
    return w === null || w === 60 || w === 61 || w === 62 || w === 96 ? n(w) : w === 34 || w === 39 ? (e.consume(w), u = w, X) : jt(w) ? (e.consume(w), B) : U(w);
  }
  function X(w) {
    return w === u ? (e.consume(w), u = null, K) : w === null || bt(w) ? n(w) : (e.consume(w), X);
  }
  function U(w) {
    return w === null || w === 34 || w === 39 || w === 47 || w === 60 || w === 61 || w === 62 || w === 96 || Dn(w) ? E(w) : (e.consume(w), U);
  }
  function K(w) {
    return w === 47 || w === 62 || jt(w) ? T(w) : n(w);
  }
  function Fe(w) {
    return w === 62 ? (e.consume(w), oe) : n(w);
  }
  function oe(w) {
    return w === null || bt(w) ? ce(w) : jt(w) ? (e.consume(w), oe) : n(w);
  }
  function ce(w) {
    return w === 45 && i === 2 ? (e.consume(w), Ee) : w === 60 && i === 1 ? (e.consume(w), We) : w === 62 && i === 4 ? (e.consume(w), Z) : w === 63 && i === 3 ? (e.consume(w), G) : w === 93 && i === 5 ? (e.consume(w), ht) : bt(w) && (i === 6 || i === 7) ? (e.exit("htmlFlowData"), e.check(vC, A, ye)(w)) : w === null || bt(w) ? (e.exit("htmlFlowData"), ye(w)) : (e.consume(w), ce);
  }
  function ye(w) {
    return e.check(bC, Q, A)(w);
  }
  function Q(w) {
    return e.enter("lineEnding"), e.consume(w), e.exit("lineEnding"), ue;
  }
  function ue(w) {
    return w === null || bt(w) ? ye(w) : (e.enter("htmlFlowData"), ce(w));
  }
  function Ee(w) {
    return w === 45 ? (e.consume(w), G) : ce(w);
  }
  function We(w) {
    return w === 47 ? (e.consume(w), o = "", $e) : ce(w);
  }
  function $e(w) {
    if (w === 62) {
      const H = o.toLowerCase();
      return bf.includes(H) ? (e.consume(w), Z) : ce(w);
    }
    return br(w) && o.length < 8 ? (e.consume(w), o += String.fromCharCode(w), $e) : ce(w);
  }
  function ht(w) {
    return w === 93 ? (e.consume(w), G) : ce(w);
  }
  function G(w) {
    return w === 62 ? (e.consume(w), Z) : w === 45 && i === 2 ? (e.consume(w), G) : ce(w);
  }
  function Z(w) {
    return w === null || bt(w) ? (e.exit("htmlFlowData"), A(w)) : (e.consume(w), Z);
  }
  function A(w) {
    return e.exit("htmlFlow"), t(w);
  }
}
function xC(e, t, n) {
  const r = this;
  return i;
  function i(o) {
    return bt(o) ? (e.enter("lineEnding"), e.consume(o), e.exit("lineEnding"), a) : n(o);
  }
  function a(o) {
    return r.parser.lazy[r.now().line] ? n(o) : t(o);
  }
}
function CC(e, t, n) {
  return r;
  function r(i) {
    return e.enter("lineEnding"), e.consume(i), e.exit("lineEnding"), e.attempt(Rs, t, n);
  }
}
const SC = {
  name: "htmlText",
  tokenize: IC
};
function IC(e, t, n) {
  const r = this;
  let i, a, o;
  return l;
  function l(G) {
    return e.enter("htmlText"), e.enter("htmlTextData"), e.consume(G), u;
  }
  function u(G) {
    return G === 33 ? (e.consume(G), s) : G === 47 ? (e.consume(G), E) : G === 63 ? (e.consume(G), T) : br(G) ? (e.consume(G), U) : n(G);
  }
  function s(G) {
    return G === 45 ? (e.consume(G), d) : G === 91 ? (e.consume(G), a = 0, x) : br(G) ? (e.consume(G), O) : n(G);
  }
  function d(G) {
    return G === 45 ? (e.consume(G), h) : n(G);
  }
  function c(G) {
    return G === null ? n(G) : G === 45 ? (e.consume(G), m) : bt(G) ? (o = c, We(G)) : (e.consume(G), c);
  }
  function m(G) {
    return G === 45 ? (e.consume(G), h) : c(G);
  }
  function h(G) {
    return G === 62 ? Ee(G) : G === 45 ? m(G) : c(G);
  }
  function x(G) {
    const Z = "CDATA[";
    return G === Z.charCodeAt(a++) ? (e.consume(G), a === Z.length ? v : x) : n(G);
  }
  function v(G) {
    return G === null ? n(G) : G === 93 ? (e.consume(G), b) : bt(G) ? (o = v, We(G)) : (e.consume(G), v);
  }
  function b(G) {
    return G === 93 ? (e.consume(G), I) : v(G);
  }
  function I(G) {
    return G === 62 ? Ee(G) : G === 93 ? (e.consume(G), I) : v(G);
  }
  function O(G) {
    return G === null || G === 62 ? Ee(G) : bt(G) ? (o = O, We(G)) : (e.consume(G), O);
  }
  function T(G) {
    return G === null ? n(G) : G === 63 ? (e.consume(G), D) : bt(G) ? (o = T, We(G)) : (e.consume(G), T);
  }
  function D(G) {
    return G === 62 ? Ee(G) : T(G);
  }
  function E(G) {
    return br(G) ? (e.consume(G), B) : n(G);
  }
  function B(G) {
    return G === 45 || Zn(G) ? (e.consume(G), B) : X(G);
  }
  function X(G) {
    return bt(G) ? (o = X, We(G)) : jt(G) ? (e.consume(G), X) : Ee(G);
  }
  function U(G) {
    return G === 45 || Zn(G) ? (e.consume(G), U) : G === 47 || G === 62 || Dn(G) ? K(G) : n(G);
  }
  function K(G) {
    return G === 47 ? (e.consume(G), Ee) : G === 58 || G === 95 || br(G) ? (e.consume(G), Fe) : bt(G) ? (o = K, We(G)) : jt(G) ? (e.consume(G), K) : Ee(G);
  }
  function Fe(G) {
    return G === 45 || G === 46 || G === 58 || G === 95 || Zn(G) ? (e.consume(G), Fe) : oe(G);
  }
  function oe(G) {
    return G === 61 ? (e.consume(G), ce) : bt(G) ? (o = oe, We(G)) : jt(G) ? (e.consume(G), oe) : K(G);
  }
  function ce(G) {
    return G === null || G === 60 || G === 61 || G === 62 || G === 96 ? n(G) : G === 34 || G === 39 ? (e.consume(G), i = G, ye) : bt(G) ? (o = ce, We(G)) : jt(G) ? (e.consume(G), ce) : (e.consume(G), Q);
  }
  function ye(G) {
    return G === i ? (e.consume(G), i = void 0, ue) : G === null ? n(G) : bt(G) ? (o = ye, We(G)) : (e.consume(G), ye);
  }
  function Q(G) {
    return G === null || G === 34 || G === 39 || G === 60 || G === 61 || G === 96 ? n(G) : G === 47 || G === 62 || Dn(G) ? K(G) : (e.consume(G), Q);
  }
  function ue(G) {
    return G === 47 || G === 62 || Dn(G) ? K(G) : n(G);
  }
  function Ee(G) {
    return G === 62 ? (e.consume(G), e.exit("htmlTextData"), e.exit("htmlText"), t) : n(G);
  }
  function We(G) {
    return e.exit("htmlTextData"), e.enter("lineEnding"), e.consume(G), e.exit("lineEnding"), $e;
  }
  function $e(G) {
    return jt(G) ? tn(e, ht, "linePrefix", r.parser.constructs.disable.null.includes("codeIndented") ? void 0 : 4)(G) : ht(G);
  }
  function ht(G) {
    return e.enter("htmlTextData"), o(G);
  }
}
const Gc = {
  name: "labelEnd",
  resolveAll: PC,
  resolveTo: TC,
  tokenize: kC
}, RC = {
  tokenize: OC
}, EC = {
  tokenize: FC
}, AC = {
  tokenize: BC
};
function PC(e) {
  let t = -1;
  const n = [];
  for (; ++t < e.length; ) {
    const r = e[t][1];
    if (n.push(e[t]), r.type === "labelImage" || r.type === "labelLink" || r.type === "labelEnd") {
      const i = r.type === "labelImage" ? 4 : 2;
      r.type = "data", t += i;
    }
  }
  return e.length !== n.length && Cr(e, 0, e.length, n), e;
}
function TC(e, t) {
  let n = e.length, r = 0, i, a, o, l;
  for (; n--; )
    if (i = e[n][1], a) {
      if (i.type === "link" || i.type === "labelLink" && i._inactive)
        break;
      e[n][0] === "enter" && i.type === "labelLink" && (i._inactive = !0);
    } else if (o) {
      if (e[n][0] === "enter" && (i.type === "labelImage" || i.type === "labelLink") && !i._balanced && (a = n, i.type !== "labelLink")) {
        r = 2;
        break;
      }
    } else i.type === "labelEnd" && (o = n);
  const u = {
    type: e[a][1].type === "labelLink" ? "link" : "image",
    start: {
      ...e[a][1].start
    },
    end: {
      ...e[e.length - 1][1].end
    }
  }, s = {
    type: "label",
    start: {
      ...e[a][1].start
    },
    end: {
      ...e[o][1].end
    }
  }, d = {
    type: "labelText",
    start: {
      ...e[a + r + 2][1].end
    },
    end: {
      ...e[o - 2][1].start
    }
  };
  return l = [["enter", u, t], ["enter", s, t]], l = rr(l, e.slice(a + 1, a + r + 3)), l = rr(l, [["enter", d, t]]), l = rr(l, Nc(t.parser.constructs.insideSpan.null, e.slice(a + r + 4, o - 3), t)), l = rr(l, [["exit", d, t], e[o - 2], e[o - 1], ["exit", s, t]]), l = rr(l, e.slice(o + 1)), l = rr(l, [["exit", u, t]]), Cr(e, a, e.length, l), e;
}
function kC(e, t, n) {
  const r = this;
  let i = r.events.length, a, o;
  for (; i--; )
    if ((r.events[i][1].type === "labelImage" || r.events[i][1].type === "labelLink") && !r.events[i][1]._balanced) {
      a = r.events[i][1];
      break;
    }
  return l;
  function l(m) {
    return a ? a._inactive ? c(m) : (o = r.parser.defined.includes(Ni(r.sliceSerialize({
      start: a.end,
      end: r.now()
    }))), e.enter("labelEnd"), e.enter("labelMarker"), e.consume(m), e.exit("labelMarker"), e.exit("labelEnd"), u) : n(m);
  }
  function u(m) {
    return m === 40 ? e.attempt(RC, d, o ? d : c)(m) : m === 91 ? e.attempt(EC, d, o ? s : c)(m) : o ? d(m) : c(m);
  }
  function s(m) {
    return e.attempt(AC, d, c)(m);
  }
  function d(m) {
    return t(m);
  }
  function c(m) {
    return a._balanced = !0, n(m);
  }
}
function OC(e, t, n) {
  return r;
  function r(c) {
    return e.enter("resource"), e.enter("resourceMarker"), e.consume(c), e.exit("resourceMarker"), i;
  }
  function i(c) {
    return Dn(c) ? Co(e, a)(c) : a(c);
  }
  function a(c) {
    return c === 41 ? d(c) : Ph(e, o, l, "resourceDestination", "resourceDestinationLiteral", "resourceDestinationLiteralMarker", "resourceDestinationRaw", "resourceDestinationString", 32)(c);
  }
  function o(c) {
    return Dn(c) ? Co(e, u)(c) : d(c);
  }
  function l(c) {
    return n(c);
  }
  function u(c) {
    return c === 34 || c === 39 || c === 40 ? kh(e, s, n, "resourceTitle", "resourceTitleMarker", "resourceTitleString")(c) : d(c);
  }
  function s(c) {
    return Dn(c) ? Co(e, d)(c) : d(c);
  }
  function d(c) {
    return c === 41 ? (e.enter("resourceMarker"), e.consume(c), e.exit("resourceMarker"), e.exit("resource"), t) : n(c);
  }
}
function FC(e, t, n) {
  const r = this;
  return i;
  function i(l) {
    return Th.call(r, e, a, o, "reference", "referenceMarker", "referenceString")(l);
  }
  function a(l) {
    return r.parser.defined.includes(Ni(r.sliceSerialize(r.events[r.events.length - 1][1]).slice(1, -1))) ? t(l) : n(l);
  }
  function o(l) {
    return n(l);
  }
}
function BC(e, t, n) {
  return r;
  function r(a) {
    return e.enter("reference"), e.enter("referenceMarker"), e.consume(a), e.exit("referenceMarker"), i;
  }
  function i(a) {
    return a === 93 ? (e.enter("referenceMarker"), e.consume(a), e.exit("referenceMarker"), e.exit("reference"), t) : n(a);
  }
}
const NC = {
  name: "labelStartImage",
  resolveAll: Gc.resolveAll,
  tokenize: GC
};
function GC(e, t, n) {
  const r = this;
  return i;
  function i(l) {
    return e.enter("labelImage"), e.enter("labelImageMarker"), e.consume(l), e.exit("labelImageMarker"), a;
  }
  function a(l) {
    return l === 91 ? (e.enter("labelMarker"), e.consume(l), e.exit("labelMarker"), e.exit("labelImage"), o) : n(l);
  }
  function o(l) {
    return l === 94 && "_hiddenFootnoteSupport" in r.parser.constructs ? n(l) : t(l);
  }
}
const _C = {
  name: "labelStartLink",
  resolveAll: Gc.resolveAll,
  tokenize: MC
};
function MC(e, t, n) {
  const r = this;
  return i;
  function i(o) {
    return e.enter("labelLink"), e.enter("labelMarker"), e.consume(o), e.exit("labelMarker"), e.exit("labelLink"), a;
  }
  function a(o) {
    return o === 94 && "_hiddenFootnoteSupport" in r.parser.constructs ? n(o) : t(o);
  }
}
const Xl = {
  name: "lineEnding",
  tokenize: VC
};
function VC(e, t) {
  return n;
  function n(r) {
    return e.enter("lineEnding"), e.consume(r), e.exit("lineEnding"), tn(e, t, "linePrefix");
  }
}
const za = {
  name: "thematicBreak",
  tokenize: LC
};
function LC(e, t, n) {
  let r = 0, i;
  return a;
  function a(s) {
    return e.enter("thematicBreak"), o(s);
  }
  function o(s) {
    return i = s, l(s);
  }
  function l(s) {
    return s === i ? (e.enter("thematicBreakSequence"), u(s)) : r >= 3 && (s === null || bt(s)) ? (e.exit("thematicBreak"), t(s)) : n(s);
  }
  function u(s) {
    return s === i ? (e.consume(s), r++, u) : (e.exit("thematicBreakSequence"), jt(s) ? tn(e, l, "whitespace")(s) : l(s));
  }
}
const Vn = {
  continuation: {
    tokenize: HC
  },
  exit: $C,
  name: "list",
  tokenize: zC
}, DC = {
  partial: !0,
  tokenize: XC
}, jC = {
  partial: !0,
  tokenize: WC
};
function zC(e, t, n) {
  const r = this, i = r.events[r.events.length - 1];
  let a = i && i[1].type === "linePrefix" ? i[2].sliceSerialize(i[1], !0).length : 0, o = 0;
  return l;
  function l(h) {
    const x = r.containerState.type || (h === 42 || h === 43 || h === 45 ? "listUnordered" : "listOrdered");
    if (x === "listUnordered" ? !r.containerState.marker || h === r.containerState.marker : Mu(h)) {
      if (r.containerState.type || (r.containerState.type = x, e.enter(x, {
        _container: !0
      })), x === "listUnordered")
        return e.enter("listItemPrefix"), h === 42 || h === 45 ? e.check(za, n, s)(h) : s(h);
      if (!r.interrupt || h === 49)
        return e.enter("listItemPrefix"), e.enter("listItemValue"), u(h);
    }
    return n(h);
  }
  function u(h) {
    return Mu(h) && ++o < 10 ? (e.consume(h), u) : (!r.interrupt || o < 2) && (r.containerState.marker ? h === r.containerState.marker : h === 41 || h === 46) ? (e.exit("listItemValue"), s(h)) : n(h);
  }
  function s(h) {
    return e.enter("listItemMarker"), e.consume(h), e.exit("listItemMarker"), r.containerState.marker = r.containerState.marker || h, e.check(
      Rs,
      // Can’t be empty when interrupting.
      r.interrupt ? n : d,
      e.attempt(DC, m, c)
    );
  }
  function d(h) {
    return r.containerState.initialBlankLine = !0, a++, m(h);
  }
  function c(h) {
    return jt(h) ? (e.enter("listItemPrefixWhitespace"), e.consume(h), e.exit("listItemPrefixWhitespace"), m) : n(h);
  }
  function m(h) {
    return r.containerState.size = a + r.sliceSerialize(e.exit("listItemPrefix"), !0).length, t(h);
  }
}
function HC(e, t, n) {
  const r = this;
  return r.containerState._closeFlow = void 0, e.check(Rs, i, a);
  function i(l) {
    return r.containerState.furtherBlankLines = r.containerState.furtherBlankLines || r.containerState.initialBlankLine, tn(e, t, "listItemIndent", r.containerState.size + 1)(l);
  }
  function a(l) {
    return r.containerState.furtherBlankLines || !jt(l) ? (r.containerState.furtherBlankLines = void 0, r.containerState.initialBlankLine = void 0, o(l)) : (r.containerState.furtherBlankLines = void 0, r.containerState.initialBlankLine = void 0, e.attempt(jC, t, o)(l));
  }
  function o(l) {
    return r.containerState._closeFlow = !0, r.interrupt = void 0, tn(e, e.attempt(Vn, t, n), "linePrefix", r.parser.constructs.disable.null.includes("codeIndented") ? void 0 : 4)(l);
  }
}
function WC(e, t, n) {
  const r = this;
  return tn(e, i, "listItemIndent", r.containerState.size + 1);
  function i(a) {
    const o = r.events[r.events.length - 1];
    return o && o[1].type === "listItemIndent" && o[2].sliceSerialize(o[1], !0).length === r.containerState.size ? t(a) : n(a);
  }
}
function $C(e) {
  e.exit(this.containerState.type);
}
function XC(e, t, n) {
  const r = this;
  return tn(e, i, "listItemPrefixWhitespace", r.parser.constructs.disable.null.includes("codeIndented") ? void 0 : 5);
  function i(a) {
    const o = r.events[r.events.length - 1];
    return !jt(a) && o && o[1].type === "listItemPrefixWhitespace" ? t(a) : n(a);
  }
}
const yf = {
  name: "setextUnderline",
  resolveTo: YC,
  tokenize: ZC
};
function YC(e, t) {
  let n = e.length, r, i, a;
  for (; n--; )
    if (e[n][0] === "enter") {
      if (e[n][1].type === "content") {
        r = n;
        break;
      }
      e[n][1].type === "paragraph" && (i = n);
    } else
      e[n][1].type === "content" && e.splice(n, 1), !a && e[n][1].type === "definition" && (a = n);
  const o = {
    type: "setextHeading",
    start: {
      ...e[i][1].start
    },
    end: {
      ...e[e.length - 1][1].end
    }
  };
  return e[i][1].type = "setextHeadingText", a ? (e.splice(i, 0, ["enter", o, t]), e.splice(a + 1, 0, ["exit", e[r][1], t]), e[r][1].end = {
    ...e[a][1].end
  }) : e[r][1] = o, e.push(["exit", o, t]), e;
}
function ZC(e, t, n) {
  const r = this;
  let i;
  return a;
  function a(s) {
    let d = r.events.length, c;
    for (; d--; )
      if (r.events[d][1].type !== "lineEnding" && r.events[d][1].type !== "linePrefix" && r.events[d][1].type !== "content") {
        c = r.events[d][1].type === "paragraph";
        break;
      }
    return !r.parser.lazy[r.now().line] && (r.interrupt || c) ? (e.enter("setextHeadingLine"), i = s, o(s)) : n(s);
  }
  function o(s) {
    return e.enter("setextHeadingLineSequence"), l(s);
  }
  function l(s) {
    return s === i ? (e.consume(s), l) : (e.exit("setextHeadingLineSequence"), jt(s) ? tn(e, u, "lineSuffix")(s) : u(s));
  }
  function u(s) {
    return s === null || bt(s) ? (e.exit("setextHeadingLine"), t(s)) : n(s);
  }
}
const JC = {
  tokenize: UC
};
function UC(e) {
  const t = this, n = e.attempt(
    // Try to parse a blank line.
    Rs,
    r,
    // Try to parse initial flow (essentially, only code).
    e.attempt(this.parser.constructs.flowInitial, i, tn(e, e.attempt(this.parser.constructs.flow, i, e.attempt(tC, i)), "linePrefix"))
  );
  return n;
  function r(a) {
    if (a === null) {
      e.consume(a);
      return;
    }
    return e.enter("lineEndingBlank"), e.consume(a), e.exit("lineEndingBlank"), t.currentConstruct = void 0, n;
  }
  function i(a) {
    if (a === null) {
      e.consume(a);
      return;
    }
    return e.enter("lineEnding"), e.consume(a), e.exit("lineEnding"), t.currentConstruct = void 0, n;
  }
}
const qC = {
  resolveAll: Fh()
}, QC = Oh("string"), KC = Oh("text");
function Oh(e) {
  return {
    resolveAll: Fh(e === "text" ? eS : void 0),
    tokenize: t
  };
  function t(n) {
    const r = this, i = this.parser.constructs[e], a = n.attempt(i, o, l);
    return o;
    function o(d) {
      return s(d) ? a(d) : l(d);
    }
    function l(d) {
      if (d === null) {
        n.consume(d);
        return;
      }
      return n.enter("data"), n.consume(d), u;
    }
    function u(d) {
      return s(d) ? (n.exit("data"), a(d)) : (n.consume(d), u);
    }
    function s(d) {
      if (d === null)
        return !0;
      const c = i[d];
      let m = -1;
      if (c)
        for (; ++m < c.length; ) {
          const h = c[m];
          if (!h.previous || h.previous.call(r, r.previous))
            return !0;
        }
      return !1;
    }
  }
}
function Fh(e) {
  return t;
  function t(n, r) {
    let i = -1, a;
    for (; ++i <= n.length; )
      a === void 0 ? n[i] && n[i][1].type === "data" && (a = i, i++) : (!n[i] || n[i][1].type !== "data") && (i !== a + 2 && (n[a][1].end = n[i - 1][1].end, n.splice(a + 2, i - a - 2), i = a + 2), a = void 0);
    return e ? e(n, r) : n;
  }
}
function eS(e, t) {
  let n = 0;
  for (; ++n <= e.length; )
    if ((n === e.length || e[n][1].type === "lineEnding") && e[n - 1][1].type === "data") {
      const r = e[n - 1][1], i = t.sliceStream(r);
      let a = i.length, o = -1, l = 0, u;
      for (; a--; ) {
        const s = i[a];
        if (typeof s == "string") {
          for (o = s.length; s.charCodeAt(o - 1) === 32; )
            l++, o--;
          if (o) break;
          o = -1;
        } else if (s === -2)
          u = !0, l++;
        else if (s !== -1) {
          a++;
          break;
        }
      }
      if (l) {
        const s = {
          type: n === e.length || u || l < 2 ? "lineSuffix" : "hardBreakTrailing",
          start: {
            _bufferIndex: a ? o : r.start._bufferIndex + o,
            _index: r.start._index + a,
            line: r.end.line,
            column: r.end.column - l,
            offset: r.end.offset - l
          },
          end: {
            ...r.end
          }
        };
        r.end = {
          ...s.start
        }, r.start.offset === r.end.offset ? Object.assign(r, s) : (e.splice(n, 0, ["enter", s, t], ["exit", s, t]), n += 2);
      }
      n++;
    }
  return e;
}
const tS = {
  42: Vn,
  43: Vn,
  45: Vn,
  48: Vn,
  49: Vn,
  50: Vn,
  51: Vn,
  52: Vn,
  53: Vn,
  54: Vn,
  55: Vn,
  56: Vn,
  57: Vn,
  62: Ih
}, nS = {
  91: aC
}, rS = {
  [-2]: $l,
  [-1]: $l,
  32: $l
}, iS = {
  35: fC,
  42: za,
  45: [yf, za],
  60: mC,
  61: yf,
  95: za,
  96: vf,
  126: vf
}, oS = {
  38: Eh,
  92: Rh
}, aS = {
  [-5]: Xl,
  [-4]: Xl,
  [-3]: Xl,
  33: NC,
  38: Eh,
  42: Vu,
  60: [_x, SC],
  91: _C,
  92: [cC, Rh],
  93: Gc,
  95: Vu,
  96: Jx
}, sS = {
  null: [Vu, qC]
}, lS = {
  null: [42, 95]
}, uS = {
  null: []
}, cS = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  attentionMarkers: lS,
  contentInitial: nS,
  disable: uS,
  document: tS,
  flow: iS,
  flowInitial: rS,
  insideSpan: sS,
  string: oS,
  text: aS
}, Symbol.toStringTag, { value: "Module" }));
function dS(e, t, n) {
  let r = {
    _bufferIndex: -1,
    _index: 0,
    line: n && n.line || 1,
    column: n && n.column || 1,
    offset: n && n.offset || 0
  };
  const i = {}, a = [];
  let o = [], l = [];
  const u = {
    attempt: X(E),
    check: X(B),
    consume: O,
    enter: T,
    exit: D,
    interrupt: X(B, {
      interrupt: !0
    })
  }, s = {
    code: null,
    containerState: {},
    defineSkip: v,
    events: [],
    now: x,
    parser: e,
    previous: null,
    sliceSerialize: m,
    sliceStream: h,
    write: c
  };
  let d = t.tokenize.call(s, u);
  return t.resolveAll && a.push(t), s;
  function c(oe) {
    return o = rr(o, oe), b(), o[o.length - 1] !== null ? [] : (U(t, 0), s.events = Nc(a, s.events, s), s.events);
  }
  function m(oe, ce) {
    return pS(h(oe), ce);
  }
  function h(oe) {
    return fS(o, oe);
  }
  function x() {
    const {
      _bufferIndex: oe,
      _index: ce,
      line: ye,
      column: Q,
      offset: ue
    } = r;
    return {
      _bufferIndex: oe,
      _index: ce,
      line: ye,
      column: Q,
      offset: ue
    };
  }
  function v(oe) {
    i[oe.line] = oe.column, Fe();
  }
  function b() {
    let oe;
    for (; r._index < o.length; ) {
      const ce = o[r._index];
      if (typeof ce == "string")
        for (oe = r._index, r._bufferIndex < 0 && (r._bufferIndex = 0); r._index === oe && r._bufferIndex < ce.length; )
          I(ce.charCodeAt(r._bufferIndex));
      else
        I(ce);
    }
  }
  function I(oe) {
    d = d(oe);
  }
  function O(oe) {
    bt(oe) ? (r.line++, r.column = 1, r.offset += oe === -3 ? 2 : 1, Fe()) : oe !== -1 && (r.column++, r.offset++), r._bufferIndex < 0 ? r._index++ : (r._bufferIndex++, r._bufferIndex === // Points w/ non-negative `_bufferIndex` reference
    // strings.
    /** @type {string} */
    o[r._index].length && (r._bufferIndex = -1, r._index++)), s.previous = oe;
  }
  function T(oe, ce) {
    const ye = ce || {};
    return ye.type = oe, ye.start = x(), s.events.push(["enter", ye, s]), l.push(ye), ye;
  }
  function D(oe) {
    const ce = l.pop();
    return ce.end = x(), s.events.push(["exit", ce, s]), ce;
  }
  function E(oe, ce) {
    U(oe, ce.from);
  }
  function B(oe, ce) {
    ce.restore();
  }
  function X(oe, ce) {
    return ye;
    function ye(Q, ue, Ee) {
      let We, $e, ht, G;
      return Array.isArray(Q) ? (
        /* c8 ignore next 1 */
        A(Q)
      ) : "tokenize" in Q ? (
        // Looks like a construct.
        A([
          /** @type {Construct} */
          Q
        ])
      ) : Z(Q);
      function Z(_) {
        return re;
        function re(Y) {
          const fe = Y !== null && _[Y], ge = Y !== null && _.null, ve = [
            // To do: add more extension tests.
            /* c8 ignore next 2 */
            ...Array.isArray(fe) ? fe : fe ? [fe] : [],
            ...Array.isArray(ge) ? ge : ge ? [ge] : []
          ];
          return A(ve)(Y);
        }
      }
      function A(_) {
        return We = _, $e = 0, _.length === 0 ? Ee : w(_[$e]);
      }
      function w(_) {
        return re;
        function re(Y) {
          return G = K(), ht = _, _.partial || (s.currentConstruct = _), _.name && s.parser.constructs.disable.null.includes(_.name) ? $() : _.tokenize.call(
            // If we do have fields, create an object w/ `context` as its
            // prototype.
            // This allows a “live binding”, which is needed for `interrupt`.
            ce ? Object.assign(Object.create(s), ce) : s,
            u,
            H,
            $
          )(Y);
        }
      }
      function H(_) {
        return oe(ht, G), ue;
      }
      function $(_) {
        return G.restore(), ++$e < We.length ? w(We[$e]) : Ee;
      }
    }
  }
  function U(oe, ce) {
    oe.resolveAll && !a.includes(oe) && a.push(oe), oe.resolve && Cr(s.events, ce, s.events.length - ce, oe.resolve(s.events.slice(ce), s)), oe.resolveTo && (s.events = oe.resolveTo(s.events, s));
  }
  function K() {
    const oe = x(), ce = s.previous, ye = s.currentConstruct, Q = s.events.length, ue = Array.from(l);
    return {
      from: Q,
      restore: Ee
    };
    function Ee() {
      r = oe, s.previous = ce, s.currentConstruct = ye, s.events.length = Q, l = ue, Fe();
    }
  }
  function Fe() {
    r.line in i && r.column < 2 && (r.column = i[r.line], r.offset += i[r.line] - 1);
  }
}
function fS(e, t) {
  const n = t.start._index, r = t.start._bufferIndex, i = t.end._index, a = t.end._bufferIndex;
  let o;
  if (n === i)
    o = [e[n].slice(r, a)];
  else {
    if (o = e.slice(n, i), r > -1) {
      const l = o[0];
      typeof l == "string" ? o[0] = l.slice(r) : o.shift();
    }
    a > 0 && o.push(e[i].slice(0, a));
  }
  return o;
}
function pS(e, t) {
  let n = -1;
  const r = [];
  let i;
  for (; ++n < e.length; ) {
    const a = e[n];
    let o;
    if (typeof a == "string")
      o = a;
    else switch (a) {
      case -5: {
        o = "\r";
        break;
      }
      case -4: {
        o = `
`;
        break;
      }
      case -3: {
        o = `\r
`;
        break;
      }
      case -2: {
        o = t ? " " : "	";
        break;
      }
      case -1: {
        if (!t && i) continue;
        o = " ";
        break;
      }
      default:
        o = String.fromCharCode(a);
    }
    i = a === -2, r.push(o);
  }
  return r.join("");
}
function gS(e) {
  const r = {
    constructs: (
      /** @type {FullNormalizedExtension} */
      xx([cS, ...(e || {}).extensions || []])
    ),
    content: i(Tx),
    defined: [],
    document: i(Ox),
    flow: i(JC),
    lazy: {},
    string: i(QC),
    text: i(KC)
  };
  return r;
  function i(a) {
    return o;
    function o(l) {
      return dS(r, a, l);
    }
  }
}
function hS(e) {
  for (; !Ah(e); )
    ;
  return e;
}
const wf = /[\0\t\n\r]/g;
function mS() {
  let e = 1, t = "", n = !0, r;
  return i;
  function i(a, o, l) {
    const u = [];
    let s, d, c, m, h;
    for (a = t + (typeof a == "string" ? a.toString() : new TextDecoder(o || void 0).decode(a)), c = 0, t = "", n && (a.charCodeAt(0) === 65279 && c++, n = void 0); c < a.length; ) {
      if (wf.lastIndex = c, s = wf.exec(a), m = s && s.index !== void 0 ? s.index : a.length, h = a.charCodeAt(m), !s) {
        t = a.slice(c);
        break;
      }
      if (h === 10 && c === m && r)
        u.push(-3), r = void 0;
      else
        switch (r && (u.push(-5), r = void 0), c < m && (u.push(a.slice(c, m)), e += m - c), h) {
          case 0: {
            u.push(65533), e++;
            break;
          }
          case 9: {
            for (d = Math.ceil(e / 4) * 4, u.push(-2); e++ < d; ) u.push(-1);
            break;
          }
          case 10: {
            u.push(-4), e = 1;
            break;
          }
          default:
            r = !0, e = 1;
        }
      c = m + 1;
    }
    return l && (r && u.push(-5), t && u.push(t), u.push(null)), u;
  }
}
const vS = /\\([!-/:-@[-`{-~])|&(#(?:\d{1,7}|x[\da-f]{1,6})|[\da-z]{1,31});/gi;
function bS(e) {
  return e.replace(vS, yS);
}
function yS(e, t, n) {
  if (t)
    return t;
  if (n.charCodeAt(0) === 35) {
    const i = n.charCodeAt(1), a = i === 120 || i === 88;
    return Sh(n.slice(a ? 2 : 1), a ? 16 : 10);
  }
  return Bc(n) || e;
}
const Bh = {}.hasOwnProperty;
function wS(e, t, n) {
  return typeof t != "string" && (n = t, t = void 0), xS(n)(hS(gS(n).document().write(mS()(e, t, !0))));
}
function xS(e) {
  const t = {
    transforms: [],
    canContainEols: ["emphasis", "fragment", "heading", "paragraph", "strong"],
    enter: {
      autolink: a(Cn),
      autolinkProtocol: K,
      autolinkEmail: K,
      atxHeading: a(je),
      blockQuote: a(ge),
      characterEscape: K,
      characterReference: K,
      codeFenced: a(ve),
      codeFencedFenceInfo: o,
      codeFencedFenceMeta: o,
      codeIndented: a(ve, o),
      codeText: a(Te, o),
      codeTextData: K,
      data: K,
      codeFlowValue: K,
      definition: a(J),
      definitionDestinationString: o,
      definitionLabelString: o,
      definitionTitleString: o,
      emphasis: a(ft),
      hardBreakEscape: a(et),
      hardBreakTrailing: a(et),
      htmlFlow: a(pt, o),
      htmlFlowData: K,
      htmlText: a(pt, o),
      htmlTextData: K,
      image: a(Yt),
      label: o,
      link: a(Cn),
      listItem: a(gn),
      listItemValue: m,
      listOrdered: a(kt, c),
      listUnordered: a(kt),
      paragraph: a(on),
      reference: w,
      referenceString: o,
      resourceDestinationString: o,
      resourceTitleString: o,
      setextHeading: a(je),
      strong: a(an),
      thematicBreak: a(Ot)
    },
    exit: {
      atxHeading: u(),
      atxHeadingSequence: E,
      autolink: u(),
      autolinkEmail: fe,
      autolinkProtocol: Y,
      blockQuote: u(),
      characterEscapeValue: Fe,
      characterReferenceMarkerHexadecimal: $,
      characterReferenceMarkerNumeric: $,
      characterReferenceValue: _,
      characterReference: re,
      codeFenced: u(b),
      codeFencedFence: v,
      codeFencedFenceInfo: h,
      codeFencedFenceMeta: x,
      codeFlowValue: Fe,
      codeIndented: u(I),
      codeText: u(ue),
      codeTextData: Fe,
      data: Fe,
      definition: u(),
      definitionDestinationString: D,
      definitionLabelString: O,
      definitionTitleString: T,
      emphasis: u(),
      hardBreakEscape: u(ce),
      hardBreakTrailing: u(ce),
      htmlFlow: u(ye),
      htmlFlowData: Fe,
      htmlText: u(Q),
      htmlTextData: Fe,
      image: u(We),
      label: ht,
      labelText: $e,
      lineEnding: oe,
      link: u(Ee),
      listItem: u(),
      listOrdered: u(),
      listUnordered: u(),
      paragraph: u(),
      referenceString: H,
      resourceDestinationString: G,
      resourceTitleString: Z,
      resource: A,
      setextHeading: u(U),
      setextHeadingLineSequence: X,
      setextHeadingText: B,
      strong: u(),
      thematicBreak: u()
    }
  };
  Nh(t, (e || {}).mdastExtensions || []);
  const n = {};
  return r;
  function r(ee) {
    let we = {
      type: "root",
      children: []
    };
    const Ze = {
      stack: [we],
      tokenStack: [],
      config: t,
      enter: l,
      exit: s,
      buffer: o,
      resume: d,
      data: n
    }, Rt = [];
    let Bt = -1;
    for (; ++Bt < ee.length; )
      if (ee[Bt][1].type === "listOrdered" || ee[Bt][1].type === "listUnordered")
        if (ee[Bt][0] === "enter")
          Rt.push(Bt);
        else {
          const Sn = Rt.pop();
          Bt = i(ee, Sn, Bt);
        }
    for (Bt = -1; ++Bt < ee.length; ) {
      const Sn = t[ee[Bt][0]];
      Bh.call(Sn, ee[Bt][1].type) && Sn[ee[Bt][1].type].call(Object.assign({
        sliceSerialize: ee[Bt][2].sliceSerialize
      }, Ze), ee[Bt][1]);
    }
    if (Ze.tokenStack.length > 0) {
      const Sn = Ze.tokenStack[Ze.tokenStack.length - 1];
      (Sn[1] || xf).call(Ze, void 0, Sn[0]);
    }
    for (we.position = {
      start: Xr(ee.length > 0 ? ee[0][1].start : {
        line: 1,
        column: 1,
        offset: 0
      }),
      end: Xr(ee.length > 0 ? ee[ee.length - 2][1].end : {
        line: 1,
        column: 1,
        offset: 0
      })
    }, Bt = -1; ++Bt < t.transforms.length; )
      we = t.transforms[Bt](we) || we;
    return we;
  }
  function i(ee, we, Ze) {
    let Rt = we - 1, Bt = -1, Sn = !1, Wn, Gn, er, tr;
    for (; ++Rt <= Ze; ) {
      const pn = ee[Rt];
      switch (pn[1].type) {
        case "listUnordered":
        case "listOrdered":
        case "blockQuote": {
          pn[0] === "enter" ? Bt++ : Bt--, tr = void 0;
          break;
        }
        case "lineEndingBlank": {
          pn[0] === "enter" && (Wn && !tr && !Bt && !er && (er = Rt), tr = void 0);
          break;
        }
        case "linePrefix":
        case "listItemValue":
        case "listItemMarker":
        case "listItemPrefix":
        case "listItemPrefixWhitespace":
          break;
        default:
          tr = void 0;
      }
      if (!Bt && pn[0] === "enter" && pn[1].type === "listItemPrefix" || Bt === -1 && pn[0] === "exit" && (pn[1].type === "listUnordered" || pn[1].type === "listOrdered")) {
        if (Wn) {
          let $n = Rt;
          for (Gn = void 0; $n--; ) {
            const Rn = ee[$n];
            if (Rn[1].type === "lineEnding" || Rn[1].type === "lineEndingBlank") {
              if (Rn[0] === "exit") continue;
              Gn && (ee[Gn][1].type = "lineEndingBlank", Sn = !0), Rn[1].type = "lineEnding", Gn = $n;
            } else if (!(Rn[1].type === "linePrefix" || Rn[1].type === "blockQuotePrefix" || Rn[1].type === "blockQuotePrefixWhitespace" || Rn[1].type === "blockQuoteMarker" || Rn[1].type === "listItemIndent")) break;
          }
          er && (!Gn || er < Gn) && (Wn._spread = !0), Wn.end = Object.assign({}, Gn ? ee[Gn][1].start : pn[1].end), ee.splice(Gn || Rt, 0, ["exit", Wn, pn[2]]), Rt++, Ze++;
        }
        if (pn[1].type === "listItemPrefix") {
          const $n = {
            type: "listItem",
            _spread: !1,
            start: Object.assign({}, pn[1].start),
            // @ts-expect-error: we’ll add `end` in a second.
            end: void 0
          };
          Wn = $n, ee.splice(Rt, 0, ["enter", $n, pn[2]]), Rt++, Ze++, er = void 0, tr = !0;
        }
      }
    }
    return ee[we][1]._spread = Sn, Ze;
  }
  function a(ee, we) {
    return Ze;
    function Ze(Rt) {
      l.call(this, ee(Rt), Rt), we && we.call(this, Rt);
    }
  }
  function o() {
    this.stack.push({
      type: "fragment",
      children: []
    });
  }
  function l(ee, we, Ze) {
    this.stack[this.stack.length - 1].children.push(ee), this.stack.push(ee), this.tokenStack.push([we, Ze || void 0]), ee.position = {
      start: Xr(we.start),
      // @ts-expect-error: `end` will be patched later.
      end: void 0
    };
  }
  function u(ee) {
    return we;
    function we(Ze) {
      ee && ee.call(this, Ze), s.call(this, Ze);
    }
  }
  function s(ee, we) {
    const Ze = this.stack.pop(), Rt = this.tokenStack.pop();
    if (Rt)
      Rt[0].type !== ee.type && (we ? we.call(this, ee, Rt[0]) : (Rt[1] || xf).call(this, ee, Rt[0]));
    else throw new Error("Cannot close `" + ee.type + "` (" + xo({
      start: ee.start,
      end: ee.end
    }) + "): it’s not open");
    Ze.position.end = Xr(ee.end);
  }
  function d() {
    return yx(this.stack.pop());
  }
  function c() {
    this.data.expectingFirstListItemValue = !0;
  }
  function m(ee) {
    if (this.data.expectingFirstListItemValue) {
      const we = this.stack[this.stack.length - 2];
      we.start = Number.parseInt(this.sliceSerialize(ee), 10), this.data.expectingFirstListItemValue = void 0;
    }
  }
  function h() {
    const ee = this.resume(), we = this.stack[this.stack.length - 1];
    we.lang = ee;
  }
  function x() {
    const ee = this.resume(), we = this.stack[this.stack.length - 1];
    we.meta = ee;
  }
  function v() {
    this.data.flowCodeInside || (this.buffer(), this.data.flowCodeInside = !0);
  }
  function b() {
    const ee = this.resume(), we = this.stack[this.stack.length - 1];
    we.value = ee.replace(/^(\r?\n|\r)|(\r?\n|\r)$/g, ""), this.data.flowCodeInside = void 0;
  }
  function I() {
    const ee = this.resume(), we = this.stack[this.stack.length - 1];
    we.value = ee.replace(/(\r?\n|\r)$/g, "");
  }
  function O(ee) {
    const we = this.resume(), Ze = this.stack[this.stack.length - 1];
    Ze.label = we, Ze.identifier = Ni(this.sliceSerialize(ee)).toLowerCase();
  }
  function T() {
    const ee = this.resume(), we = this.stack[this.stack.length - 1];
    we.title = ee;
  }
  function D() {
    const ee = this.resume(), we = this.stack[this.stack.length - 1];
    we.url = ee;
  }
  function E(ee) {
    const we = this.stack[this.stack.length - 1];
    if (!we.depth) {
      const Ze = this.sliceSerialize(ee).length;
      we.depth = Ze;
    }
  }
  function B() {
    this.data.setextHeadingSlurpLineEnding = !0;
  }
  function X(ee) {
    const we = this.stack[this.stack.length - 1];
    we.depth = this.sliceSerialize(ee).codePointAt(0) === 61 ? 1 : 2;
  }
  function U() {
    this.data.setextHeadingSlurpLineEnding = void 0;
  }
  function K(ee) {
    const Ze = this.stack[this.stack.length - 1].children;
    let Rt = Ze[Ze.length - 1];
    (!Rt || Rt.type !== "text") && (Rt = Ke(), Rt.position = {
      start: Xr(ee.start),
      // @ts-expect-error: we’ll add `end` later.
      end: void 0
    }, Ze.push(Rt)), this.stack.push(Rt);
  }
  function Fe(ee) {
    const we = this.stack.pop();
    we.value += this.sliceSerialize(ee), we.position.end = Xr(ee.end);
  }
  function oe(ee) {
    const we = this.stack[this.stack.length - 1];
    if (this.data.atHardBreak) {
      const Ze = we.children[we.children.length - 1];
      Ze.position.end = Xr(ee.end), this.data.atHardBreak = void 0;
      return;
    }
    !this.data.setextHeadingSlurpLineEnding && t.canContainEols.includes(we.type) && (K.call(this, ee), Fe.call(this, ee));
  }
  function ce() {
    this.data.atHardBreak = !0;
  }
  function ye() {
    const ee = this.resume(), we = this.stack[this.stack.length - 1];
    we.value = ee;
  }
  function Q() {
    const ee = this.resume(), we = this.stack[this.stack.length - 1];
    we.value = ee;
  }
  function ue() {
    const ee = this.resume(), we = this.stack[this.stack.length - 1];
    we.value = ee;
  }
  function Ee() {
    const ee = this.stack[this.stack.length - 1];
    if (this.data.inReference) {
      const we = this.data.referenceType || "shortcut";
      ee.type += "Reference", ee.referenceType = we, delete ee.url, delete ee.title;
    } else
      delete ee.identifier, delete ee.label;
    this.data.referenceType = void 0;
  }
  function We() {
    const ee = this.stack[this.stack.length - 1];
    if (this.data.inReference) {
      const we = this.data.referenceType || "shortcut";
      ee.type += "Reference", ee.referenceType = we, delete ee.url, delete ee.title;
    } else
      delete ee.identifier, delete ee.label;
    this.data.referenceType = void 0;
  }
  function $e(ee) {
    const we = this.sliceSerialize(ee), Ze = this.stack[this.stack.length - 2];
    Ze.label = bS(we), Ze.identifier = Ni(we).toLowerCase();
  }
  function ht() {
    const ee = this.stack[this.stack.length - 1], we = this.resume(), Ze = this.stack[this.stack.length - 1];
    if (this.data.inReference = !0, Ze.type === "link") {
      const Rt = ee.children;
      Ze.children = Rt;
    } else
      Ze.alt = we;
  }
  function G() {
    const ee = this.resume(), we = this.stack[this.stack.length - 1];
    we.url = ee;
  }
  function Z() {
    const ee = this.resume(), we = this.stack[this.stack.length - 1];
    we.title = ee;
  }
  function A() {
    this.data.inReference = void 0;
  }
  function w() {
    this.data.referenceType = "collapsed";
  }
  function H(ee) {
    const we = this.resume(), Ze = this.stack[this.stack.length - 1];
    Ze.label = we, Ze.identifier = Ni(this.sliceSerialize(ee)).toLowerCase(), this.data.referenceType = "full";
  }
  function $(ee) {
    this.data.characterReferenceType = ee.type;
  }
  function _(ee) {
    const we = this.sliceSerialize(ee), Ze = this.data.characterReferenceType;
    let Rt;
    Ze ? (Rt = Sh(we, Ze === "characterReferenceMarkerNumeric" ? 10 : 16), this.data.characterReferenceType = void 0) : Rt = Bc(we);
    const Bt = this.stack[this.stack.length - 1];
    Bt.value += Rt;
  }
  function re(ee) {
    const we = this.stack.pop();
    we.position.end = Xr(ee.end);
  }
  function Y(ee) {
    Fe.call(this, ee);
    const we = this.stack[this.stack.length - 1];
    we.url = this.sliceSerialize(ee);
  }
  function fe(ee) {
    Fe.call(this, ee);
    const we = this.stack[this.stack.length - 1];
    we.url = "mailto:" + this.sliceSerialize(ee);
  }
  function ge() {
    return {
      type: "blockquote",
      children: []
    };
  }
  function ve() {
    return {
      type: "code",
      lang: null,
      meta: null,
      value: ""
    };
  }
  function Te() {
    return {
      type: "inlineCode",
      value: ""
    };
  }
  function J() {
    return {
      type: "definition",
      identifier: "",
      label: null,
      title: null,
      url: ""
    };
  }
  function ft() {
    return {
      type: "emphasis",
      children: []
    };
  }
  function je() {
    return {
      type: "heading",
      // @ts-expect-error `depth` will be set later.
      depth: 0,
      children: []
    };
  }
  function et() {
    return {
      type: "break"
    };
  }
  function pt() {
    return {
      type: "html",
      value: ""
    };
  }
  function Yt() {
    return {
      type: "image",
      title: null,
      url: "",
      alt: null
    };
  }
  function Cn() {
    return {
      type: "link",
      title: null,
      url: "",
      children: []
    };
  }
  function kt(ee) {
    return {
      type: "list",
      ordered: ee.type === "listOrdered",
      start: null,
      spread: ee._spread,
      children: []
    };
  }
  function gn(ee) {
    return {
      type: "listItem",
      spread: ee._spread,
      checked: null,
      children: []
    };
  }
  function on() {
    return {
      type: "paragraph",
      children: []
    };
  }
  function an() {
    return {
      type: "strong",
      children: []
    };
  }
  function Ke() {
    return {
      type: "text",
      value: ""
    };
  }
  function Ot() {
    return {
      type: "thematicBreak"
    };
  }
}
function Xr(e) {
  return {
    line: e.line,
    column: e.column,
    offset: e.offset
  };
}
function Nh(e, t) {
  let n = -1;
  for (; ++n < t.length; ) {
    const r = t[n];
    Array.isArray(r) ? Nh(e, r) : CS(e, r);
  }
}
function CS(e, t) {
  let n;
  for (n in t)
    if (Bh.call(t, n))
      switch (n) {
        case "canContainEols": {
          const r = t[n];
          r && e[n].push(...r);
          break;
        }
        case "transforms": {
          const r = t[n];
          r && e[n].push(...r);
          break;
        }
        case "enter":
        case "exit": {
          const r = t[n];
          r && Object.assign(e[n], r);
          break;
        }
      }
}
function xf(e, t) {
  throw e ? new Error("Cannot close `" + e.type + "` (" + xo({
    start: e.start,
    end: e.end
  }) + "): a different token (`" + t.type + "`, " + xo({
    start: t.start,
    end: t.end
  }) + ") is open") : new Error("Cannot close document, a token (`" + t.type + "`, " + xo({
    start: t.start,
    end: t.end
  }) + ") is still open");
}
function SS(e) {
  const t = this;
  t.parser = n;
  function n(r) {
    return wS(r, {
      ...t.data("settings"),
      ...e,
      // Note: these options are not in the readme.
      // The goal is for them to be set by plugins on `data` instead of being
      // passed by users.
      extensions: t.data("micromarkExtensions") || [],
      mdastExtensions: t.data("fromMarkdownExtensions") || []
    });
  }
}
function IS(e, t) {
  const n = {
    type: "element",
    tagName: "blockquote",
    properties: {},
    children: e.wrap(e.all(t), !0)
  };
  return e.patch(t, n), e.applyData(t, n);
}
function RS(e, t) {
  const n = { type: "element", tagName: "br", properties: {}, children: [] };
  return e.patch(t, n), [e.applyData(t, n), { type: "text", value: `
` }];
}
function ES(e, t) {
  const n = t.value ? t.value + `
` : "", r = {};
  t.lang && (r.className = ["language-" + t.lang]);
  let i = {
    type: "element",
    tagName: "code",
    properties: r,
    children: [{ type: "text", value: n }]
  };
  return t.meta && (i.data = { meta: t.meta }), e.patch(t, i), i = e.applyData(t, i), i = { type: "element", tagName: "pre", properties: {}, children: [i] }, e.patch(t, i), i;
}
function AS(e, t) {
  const n = {
    type: "element",
    tagName: "del",
    properties: {},
    children: e.all(t)
  };
  return e.patch(t, n), e.applyData(t, n);
}
function PS(e, t) {
  const n = {
    type: "element",
    tagName: "em",
    properties: {},
    children: e.all(t)
  };
  return e.patch(t, n), e.applyData(t, n);
}
function TS(e, t) {
  const n = typeof e.options.clobberPrefix == "string" ? e.options.clobberPrefix : "user-content-", r = String(t.identifier).toUpperCase(), i = Xi(r.toLowerCase()), a = e.footnoteOrder.indexOf(r);
  let o, l = e.footnoteCounts.get(r);
  l === void 0 ? (l = 0, e.footnoteOrder.push(r), o = e.footnoteOrder.length) : o = a + 1, l += 1, e.footnoteCounts.set(r, l);
  const u = {
    type: "element",
    tagName: "a",
    properties: {
      href: "#" + n + "fn-" + i,
      id: n + "fnref-" + i + (l > 1 ? "-" + l : ""),
      dataFootnoteRef: !0,
      ariaDescribedBy: ["footnote-label"]
    },
    children: [{ type: "text", value: String(o) }]
  };
  e.patch(t, u);
  const s = {
    type: "element",
    tagName: "sup",
    properties: {},
    children: [u]
  };
  return e.patch(t, s), e.applyData(t, s);
}
function kS(e, t) {
  const n = {
    type: "element",
    tagName: "h" + t.depth,
    properties: {},
    children: e.all(t)
  };
  return e.patch(t, n), e.applyData(t, n);
}
function OS(e, t) {
  if (e.options.allowDangerousHtml) {
    const n = { type: "raw", value: t.value };
    return e.patch(t, n), e.applyData(t, n);
  }
}
function Gh(e, t) {
  const n = t.referenceType;
  let r = "]";
  if (n === "collapsed" ? r += "[]" : n === "full" && (r += "[" + (t.label || t.identifier) + "]"), t.type === "imageReference")
    return [{ type: "text", value: "![" + t.alt + r }];
  const i = e.all(t), a = i[0];
  a && a.type === "text" ? a.value = "[" + a.value : i.unshift({ type: "text", value: "[" });
  const o = i[i.length - 1];
  return o && o.type === "text" ? o.value += r : i.push({ type: "text", value: r }), i;
}
function FS(e, t) {
  const n = String(t.identifier).toUpperCase(), r = e.definitionById.get(n);
  if (!r)
    return Gh(e, t);
  const i = { src: Xi(r.url || ""), alt: t.alt };
  r.title !== null && r.title !== void 0 && (i.title = r.title);
  const a = { type: "element", tagName: "img", properties: i, children: [] };
  return e.patch(t, a), e.applyData(t, a);
}
function BS(e, t) {
  const n = { src: Xi(t.url) };
  t.alt !== null && t.alt !== void 0 && (n.alt = t.alt), t.title !== null && t.title !== void 0 && (n.title = t.title);
  const r = { type: "element", tagName: "img", properties: n, children: [] };
  return e.patch(t, r), e.applyData(t, r);
}
function NS(e, t) {
  const n = { type: "text", value: t.value.replace(/\r?\n|\r/g, " ") };
  e.patch(t, n);
  const r = {
    type: "element",
    tagName: "code",
    properties: {},
    children: [n]
  };
  return e.patch(t, r), e.applyData(t, r);
}
function GS(e, t) {
  const n = String(t.identifier).toUpperCase(), r = e.definitionById.get(n);
  if (!r)
    return Gh(e, t);
  const i = { href: Xi(r.url || "") };
  r.title !== null && r.title !== void 0 && (i.title = r.title);
  const a = {
    type: "element",
    tagName: "a",
    properties: i,
    children: e.all(t)
  };
  return e.patch(t, a), e.applyData(t, a);
}
function _S(e, t) {
  const n = { href: Xi(t.url) };
  t.title !== null && t.title !== void 0 && (n.title = t.title);
  const r = {
    type: "element",
    tagName: "a",
    properties: n,
    children: e.all(t)
  };
  return e.patch(t, r), e.applyData(t, r);
}
function MS(e, t, n) {
  const r = e.all(t), i = n ? VS(n) : _h(t), a = {}, o = [];
  if (typeof t.checked == "boolean") {
    const d = r[0];
    let c;
    d && d.type === "element" && d.tagName === "p" ? c = d : (c = { type: "element", tagName: "p", properties: {}, children: [] }, r.unshift(c)), c.children.length > 0 && c.children.unshift({ type: "text", value: " " }), c.children.unshift({
      type: "element",
      tagName: "input",
      properties: { type: "checkbox", checked: t.checked, disabled: !0 },
      children: []
    }), a.className = ["task-list-item"];
  }
  let l = -1;
  for (; ++l < r.length; ) {
    const d = r[l];
    (i || l !== 0 || d.type !== "element" || d.tagName !== "p") && o.push({ type: "text", value: `
` }), d.type === "element" && d.tagName === "p" && !i ? o.push(...d.children) : o.push(d);
  }
  const u = r[r.length - 1];
  u && (i || u.type !== "element" || u.tagName !== "p") && o.push({ type: "text", value: `
` });
  const s = { type: "element", tagName: "li", properties: a, children: o };
  return e.patch(t, s), e.applyData(t, s);
}
function VS(e) {
  let t = !1;
  if (e.type === "list") {
    t = e.spread || !1;
    const n = e.children;
    let r = -1;
    for (; !t && ++r < n.length; )
      t = _h(n[r]);
  }
  return t;
}
function _h(e) {
  const t = e.spread;
  return t ?? e.children.length > 1;
}
function LS(e, t) {
  const n = {}, r = e.all(t);
  let i = -1;
  for (typeof t.start == "number" && t.start !== 1 && (n.start = t.start); ++i < r.length; ) {
    const o = r[i];
    if (o.type === "element" && o.tagName === "li" && o.properties && Array.isArray(o.properties.className) && o.properties.className.includes("task-list-item")) {
      n.className = ["contains-task-list"];
      break;
    }
  }
  const a = {
    type: "element",
    tagName: t.ordered ? "ol" : "ul",
    properties: n,
    children: e.wrap(r, !0)
  };
  return e.patch(t, a), e.applyData(t, a);
}
function DS(e, t) {
  const n = {
    type: "element",
    tagName: "p",
    properties: {},
    children: e.all(t)
  };
  return e.patch(t, n), e.applyData(t, n);
}
function jS(e, t) {
  const n = { type: "root", children: e.wrap(e.all(t)) };
  return e.patch(t, n), e.applyData(t, n);
}
function zS(e, t) {
  const n = {
    type: "element",
    tagName: "strong",
    properties: {},
    children: e.all(t)
  };
  return e.patch(t, n), e.applyData(t, n);
}
function HS(e, t) {
  const n = e.all(t), r = n.shift(), i = [];
  if (r) {
    const o = {
      type: "element",
      tagName: "thead",
      properties: {},
      children: e.wrap([r], !0)
    };
    e.patch(t.children[0], o), i.push(o);
  }
  if (n.length > 0) {
    const o = {
      type: "element",
      tagName: "tbody",
      properties: {},
      children: e.wrap(n, !0)
    }, l = Tc(t.children[1]), u = mh(t.children[t.children.length - 1]);
    l && u && (o.position = { start: l, end: u }), i.push(o);
  }
  const a = {
    type: "element",
    tagName: "table",
    properties: {},
    children: e.wrap(i, !0)
  };
  return e.patch(t, a), e.applyData(t, a);
}
function WS(e, t, n) {
  const r = n ? n.children : void 0, a = (r ? r.indexOf(t) : 1) === 0 ? "th" : "td", o = n && n.type === "table" ? n.align : void 0, l = o ? o.length : t.children.length;
  let u = -1;
  const s = [];
  for (; ++u < l; ) {
    const c = t.children[u], m = {}, h = o ? o[u] : void 0;
    h && (m.align = h);
    let x = { type: "element", tagName: a, properties: m, children: [] };
    c && (x.children = e.all(c), e.patch(c, x), x = e.applyData(c, x)), s.push(x);
  }
  const d = {
    type: "element",
    tagName: "tr",
    properties: {},
    children: e.wrap(s, !0)
  };
  return e.patch(t, d), e.applyData(t, d);
}
function $S(e, t) {
  const n = {
    type: "element",
    tagName: "td",
    // Assume body cell.
    properties: {},
    children: e.all(t)
  };
  return e.patch(t, n), e.applyData(t, n);
}
const Cf = 9, Sf = 32;
function XS(e) {
  const t = String(e), n = /\r?\n|\r/g;
  let r = n.exec(t), i = 0;
  const a = [];
  for (; r; )
    a.push(
      If(t.slice(i, r.index), i > 0, !0),
      r[0]
    ), i = r.index + r[0].length, r = n.exec(t);
  return a.push(If(t.slice(i), i > 0, !1)), a.join("");
}
function If(e, t, n) {
  let r = 0, i = e.length;
  if (t) {
    let a = e.codePointAt(r);
    for (; a === Cf || a === Sf; )
      r++, a = e.codePointAt(r);
  }
  if (n) {
    let a = e.codePointAt(i - 1);
    for (; a === Cf || a === Sf; )
      i--, a = e.codePointAt(i - 1);
  }
  return i > r ? e.slice(r, i) : "";
}
function YS(e, t) {
  const n = { type: "text", value: XS(String(t.value)) };
  return e.patch(t, n), e.applyData(t, n);
}
function ZS(e, t) {
  const n = {
    type: "element",
    tagName: "hr",
    properties: {},
    children: []
  };
  return e.patch(t, n), e.applyData(t, n);
}
const JS = {
  blockquote: IS,
  break: RS,
  code: ES,
  delete: AS,
  emphasis: PS,
  footnoteReference: TS,
  heading: kS,
  html: OS,
  imageReference: FS,
  image: BS,
  inlineCode: NS,
  linkReference: GS,
  link: _S,
  listItem: MS,
  list: LS,
  paragraph: DS,
  // @ts-expect-error: root is different, but hard to type.
  root: jS,
  strong: zS,
  table: HS,
  tableCell: $S,
  tableRow: WS,
  text: YS,
  thematicBreak: ZS,
  toml: Ta,
  yaml: Ta,
  definition: Ta,
  footnoteDefinition: Ta
};
function Ta() {
}
const Mh = -1, Es = 0, So = 1, as = 2, _c = 3, Mc = 4, Vc = 5, Lc = 6, Vh = 7, Lh = 8, Rf = typeof self == "object" ? self : globalThis, US = (e, t) => {
  const n = (i, a) => (e.set(a, i), i), r = (i) => {
    if (e.has(i))
      return e.get(i);
    const [a, o] = t[i];
    switch (a) {
      case Es:
      case Mh:
        return n(o, i);
      case So: {
        const l = n([], i);
        for (const u of o)
          l.push(r(u));
        return l;
      }
      case as: {
        const l = n({}, i);
        for (const [u, s] of o)
          l[r(u)] = r(s);
        return l;
      }
      case _c:
        return n(new Date(o), i);
      case Mc: {
        const { source: l, flags: u } = o;
        return n(new RegExp(l, u), i);
      }
      case Vc: {
        const l = n(/* @__PURE__ */ new Map(), i);
        for (const [u, s] of o)
          l.set(r(u), r(s));
        return l;
      }
      case Lc: {
        const l = n(/* @__PURE__ */ new Set(), i);
        for (const u of o)
          l.add(r(u));
        return l;
      }
      case Vh: {
        const { name: l, message: u } = o;
        return n(new Rf[l](u), i);
      }
      case Lh:
        return n(BigInt(o), i);
      case "BigInt":
        return n(Object(BigInt(o)), i);
      case "ArrayBuffer":
        return n(new Uint8Array(o).buffer, o);
      case "DataView": {
        const { buffer: l } = new Uint8Array(o);
        return n(new DataView(l), o);
      }
    }
    return n(new Rf[a](o), i);
  };
  return r;
}, Ef = (e) => US(/* @__PURE__ */ new Map(), e)(0), Ti = "", { toString: qS } = {}, { keys: QS } = Object, fo = (e) => {
  const t = typeof e;
  if (t !== "object" || !e)
    return [Es, t];
  const n = qS.call(e).slice(8, -1);
  switch (n) {
    case "Array":
      return [So, Ti];
    case "Object":
      return [as, Ti];
    case "Date":
      return [_c, Ti];
    case "RegExp":
      return [Mc, Ti];
    case "Map":
      return [Vc, Ti];
    case "Set":
      return [Lc, Ti];
    case "DataView":
      return [So, n];
  }
  return n.includes("Array") ? [So, n] : n.includes("Error") ? [Vh, n] : [as, n];
}, ka = ([e, t]) => e === Es && (t === "function" || t === "symbol"), KS = (e, t, n, r) => {
  const i = (o, l) => {
    const u = r.push(o) - 1;
    return n.set(l, u), u;
  }, a = (o) => {
    if (n.has(o))
      return n.get(o);
    let [l, u] = fo(o);
    switch (l) {
      case Es: {
        let d = o;
        switch (u) {
          case "bigint":
            l = Lh, d = o.toString();
            break;
          case "function":
          case "symbol":
            if (e)
              throw new TypeError("unable to serialize " + u);
            d = null;
            break;
          case "undefined":
            return i([Mh], o);
        }
        return i([l, d], o);
      }
      case So: {
        if (u) {
          let m = o;
          return u === "DataView" ? m = new Uint8Array(o.buffer) : u === "ArrayBuffer" && (m = new Uint8Array(o)), i([u, [...m]], o);
        }
        const d = [], c = i([l, d], o);
        for (const m of o)
          d.push(a(m));
        return c;
      }
      case as: {
        if (u)
          switch (u) {
            case "BigInt":
              return i([u, o.toString()], o);
            case "Boolean":
            case "Number":
            case "String":
              return i([u, o.valueOf()], o);
          }
        if (t && "toJSON" in o)
          return a(o.toJSON());
        const d = [], c = i([l, d], o);
        for (const m of QS(o))
          (e || !ka(fo(o[m]))) && d.push([a(m), a(o[m])]);
        return c;
      }
      case _c:
        return i([l, o.toISOString()], o);
      case Mc: {
        const { source: d, flags: c } = o;
        return i([l, { source: d, flags: c }], o);
      }
      case Vc: {
        const d = [], c = i([l, d], o);
        for (const [m, h] of o)
          (e || !(ka(fo(m)) || ka(fo(h)))) && d.push([a(m), a(h)]);
        return c;
      }
      case Lc: {
        const d = [], c = i([l, d], o);
        for (const m of o)
          (e || !ka(fo(m))) && d.push(a(m));
        return c;
      }
    }
    const { message: s } = o;
    return i([l, { name: u, message: s }], o);
  };
  return a;
}, Af = (e, { json: t, lossy: n } = {}) => {
  const r = [];
  return KS(!(t || n), !!t, /* @__PURE__ */ new Map(), r)(e), r;
}, ss = typeof structuredClone == "function" ? (
  /* c8 ignore start */
  (e, t) => t && ("json" in t || "lossy" in t) ? Ef(Af(e, t)) : structuredClone(e)
) : (e, t) => Ef(Af(e, t));
function eI(e, t) {
  const n = [{ type: "text", value: "↩" }];
  return t > 1 && n.push({
    type: "element",
    tagName: "sup",
    properties: {},
    children: [{ type: "text", value: String(t) }]
  }), n;
}
function tI(e, t) {
  return "Back to reference " + (e + 1) + (t > 1 ? "-" + t : "");
}
function nI(e) {
  const t = typeof e.options.clobberPrefix == "string" ? e.options.clobberPrefix : "user-content-", n = e.options.footnoteBackContent || eI, r = e.options.footnoteBackLabel || tI, i = e.options.footnoteLabel || "Footnotes", a = e.options.footnoteLabelTagName || "h2", o = e.options.footnoteLabelProperties || {
    className: ["sr-only"]
  }, l = [];
  let u = -1;
  for (; ++u < e.footnoteOrder.length; ) {
    const s = e.footnoteById.get(
      e.footnoteOrder[u]
    );
    if (!s)
      continue;
    const d = e.all(s), c = String(s.identifier).toUpperCase(), m = Xi(c.toLowerCase());
    let h = 0;
    const x = [], v = e.footnoteCounts.get(c);
    for (; v !== void 0 && ++h <= v; ) {
      x.length > 0 && x.push({ type: "text", value: " " });
      let O = typeof n == "string" ? n : n(u, h);
      typeof O == "string" && (O = { type: "text", value: O }), x.push({
        type: "element",
        tagName: "a",
        properties: {
          href: "#" + t + "fnref-" + m + (h > 1 ? "-" + h : ""),
          dataFootnoteBackref: "",
          ariaLabel: typeof r == "string" ? r : r(u, h),
          className: ["data-footnote-backref"]
        },
        children: Array.isArray(O) ? O : [O]
      });
    }
    const b = d[d.length - 1];
    if (b && b.type === "element" && b.tagName === "p") {
      const O = b.children[b.children.length - 1];
      O && O.type === "text" ? O.value += " " : b.children.push({ type: "text", value: " " }), b.children.push(...x);
    } else
      d.push(...x);
    const I = {
      type: "element",
      tagName: "li",
      properties: { id: t + "fn-" + m },
      children: e.wrap(d, !0)
    };
    e.patch(s, I), l.push(I);
  }
  if (l.length !== 0)
    return {
      type: "element",
      tagName: "section",
      properties: { dataFootnotes: !0, className: ["footnotes"] },
      children: [
        {
          type: "element",
          tagName: a,
          properties: {
            ...ss(o),
            id: "footnote-label"
          },
          children: [{ type: "text", value: i }]
        },
        { type: "text", value: `
` },
        {
          type: "element",
          tagName: "ol",
          properties: {},
          children: e.wrap(l, !0)
        },
        { type: "text", value: `
` }
      ]
    };
}
const Dh = (
  // Note: overloads in JSDoc can’t yet use different `@template`s.
  /**
   * @type {(
   *   (<Condition extends string>(test: Condition) => (node: unknown, index?: number | null | undefined, parent?: Parent | null | undefined, context?: unknown) => node is Node & {type: Condition}) &
   *   (<Condition extends Props>(test: Condition) => (node: unknown, index?: number | null | undefined, parent?: Parent | null | undefined, context?: unknown) => node is Node & Condition) &
   *   (<Condition extends TestFunction>(test: Condition) => (node: unknown, index?: number | null | undefined, parent?: Parent | null | undefined, context?: unknown) => node is Node & Predicate<Condition, Node>) &
   *   ((test?: null | undefined) => (node?: unknown, index?: number | null | undefined, parent?: Parent | null | undefined, context?: unknown) => node is Node) &
   *   ((test?: Test) => Check)
   * )}
   */
  /**
   * @param {Test} [test]
   * @returns {Check}
   */
  function(e) {
    if (e == null)
      return aI;
    if (typeof e == "function")
      return As(e);
    if (typeof e == "object")
      return Array.isArray(e) ? rI(e) : iI(e);
    if (typeof e == "string")
      return oI(e);
    throw new Error("Expected function, string, or object as test");
  }
);
function rI(e) {
  const t = [];
  let n = -1;
  for (; ++n < e.length; )
    t[n] = Dh(e[n]);
  return As(r);
  function r(...i) {
    let a = -1;
    for (; ++a < t.length; )
      if (t[a].apply(this, i)) return !0;
    return !1;
  }
}
function iI(e) {
  const t = (
    /** @type {Record<string, unknown>} */
    e
  );
  return As(n);
  function n(r) {
    const i = (
      /** @type {Record<string, unknown>} */
      /** @type {unknown} */
      r
    );
    let a;
    for (a in e)
      if (i[a] !== t[a]) return !1;
    return !0;
  }
}
function oI(e) {
  return As(t);
  function t(n) {
    return n && n.type === e;
  }
}
function As(e) {
  return t;
  function t(n, r, i) {
    return !!(sI(n) && e.call(
      this,
      n,
      typeof r == "number" ? r : void 0,
      i || void 0
    ));
  }
}
function aI() {
  return !0;
}
function sI(e) {
  return e !== null && typeof e == "object" && "type" in e;
}
const jh = [], lI = !0, Pf = !1, uI = "skip";
function cI(e, t, n, r) {
  let i;
  typeof t == "function" && typeof n != "function" ? (r = n, n = t) : i = t;
  const a = Dh(i), o = r ? -1 : 1;
  l(e, void 0, [])();
  function l(u, s, d) {
    const c = (
      /** @type {Record<string, unknown>} */
      u && typeof u == "object" ? u : {}
    );
    if (typeof c.type == "string") {
      const h = (
        // `hast`
        typeof c.tagName == "string" ? c.tagName : (
          // `xast`
          typeof c.name == "string" ? c.name : void 0
        )
      );
      Object.defineProperty(m, "name", {
        value: "node (" + (u.type + (h ? "<" + h + ">" : "")) + ")"
      });
    }
    return m;
    function m() {
      let h = jh, x, v, b;
      if ((!t || a(u, s, d[d.length - 1] || void 0)) && (h = dI(n(u, d)), h[0] === Pf))
        return h;
      if ("children" in u && u.children) {
        const I = (
          /** @type {UnistParent} */
          u
        );
        if (I.children && h[0] !== uI)
          for (v = (r ? I.children.length : -1) + o, b = d.concat(I); v > -1 && v < I.children.length; ) {
            const O = I.children[v];
            if (x = l(O, v, b)(), x[0] === Pf)
              return x;
            v = typeof x[1] == "number" ? x[1] : v + o;
          }
      }
      return h;
    }
  }
}
function dI(e) {
  return Array.isArray(e) ? e : typeof e == "number" ? [lI, e] : e == null ? jh : [e];
}
function zh(e, t, n, r) {
  let i, a, o;
  typeof t == "function" ? (a = void 0, o = t, i = n) : (a = t, o = n, i = r), cI(e, a, l, i);
  function l(u, s) {
    const d = s[s.length - 1], c = d ? d.children.indexOf(u) : void 0;
    return o(u, c, d);
  }
}
const Lu = {}.hasOwnProperty, fI = {};
function pI(e, t) {
  const n = t || fI, r = /* @__PURE__ */ new Map(), i = /* @__PURE__ */ new Map(), a = /* @__PURE__ */ new Map(), o = { ...JS, ...n.handlers }, l = {
    all: s,
    applyData: hI,
    definitionById: r,
    footnoteById: i,
    footnoteCounts: a,
    footnoteOrder: [],
    handlers: o,
    one: u,
    options: n,
    patch: gI,
    wrap: vI
  };
  return zh(e, function(d) {
    if (d.type === "definition" || d.type === "footnoteDefinition") {
      const c = d.type === "definition" ? r : i, m = String(d.identifier).toUpperCase();
      c.has(m) || c.set(m, d);
    }
  }), l;
  function u(d, c) {
    const m = d.type, h = l.handlers[m];
    if (Lu.call(l.handlers, m) && h)
      return h(l, d, c);
    if (l.options.passThrough && l.options.passThrough.includes(m)) {
      if ("children" in d) {
        const { children: v, ...b } = d, I = ss(b);
        return I.children = l.all(d), I;
      }
      return ss(d);
    }
    return (l.options.unknownHandler || mI)(l, d, c);
  }
  function s(d) {
    const c = [];
    if ("children" in d) {
      const m = d.children;
      let h = -1;
      for (; ++h < m.length; ) {
        const x = l.one(m[h], d);
        if (x) {
          if (h && m[h - 1].type === "break" && (!Array.isArray(x) && x.type === "text" && (x.value = Tf(x.value)), !Array.isArray(x) && x.type === "element")) {
            const v = x.children[0];
            v && v.type === "text" && (v.value = Tf(v.value));
          }
          Array.isArray(x) ? c.push(...x) : c.push(x);
        }
      }
    }
    return c;
  }
}
function gI(e, t) {
  e.position && (t.position = Jw(e));
}
function hI(e, t) {
  let n = t;
  if (e && e.data) {
    const r = e.data.hName, i = e.data.hChildren, a = e.data.hProperties;
    if (typeof r == "string")
      if (n.type === "element")
        n.tagName = r;
      else {
        const o = "children" in n ? n.children : [n];
        n = { type: "element", tagName: r, properties: {}, children: o };
      }
    n.type === "element" && a && Object.assign(n.properties, ss(a)), "children" in n && n.children && i !== null && i !== void 0 && (n.children = i);
  }
  return n;
}
function mI(e, t) {
  const n = t.data || {}, r = "value" in t && !(Lu.call(n, "hProperties") || Lu.call(n, "hChildren")) ? { type: "text", value: t.value } : {
    type: "element",
    tagName: "div",
    properties: {},
    children: e.all(t)
  };
  return e.patch(t, r), e.applyData(t, r);
}
function vI(e, t) {
  const n = [];
  let r = -1;
  for (t && n.push({ type: "text", value: `
` }); ++r < e.length; )
    r && n.push({ type: "text", value: `
` }), n.push(e[r]);
  return t && e.length > 0 && n.push({ type: "text", value: `
` }), n;
}
function Tf(e) {
  let t = 0, n = e.charCodeAt(t);
  for (; n === 9 || n === 32; )
    t++, n = e.charCodeAt(t);
  return e.slice(t);
}
function kf(e, t) {
  const n = pI(e, t), r = n.one(e, void 0), i = nI(n), a = Array.isArray(r) ? { type: "root", children: r } : r || { type: "root", children: [] };
  return i && a.children.push({ type: "text", value: `
` }, i), a;
}
function bI(e, t) {
  return e && "run" in e ? async function(n, r) {
    const i = (
      /** @type {HastRoot} */
      kf(n, { file: r, ...t })
    );
    await e.run(i, r);
  } : function(n, r) {
    return (
      /** @type {HastRoot} */
      kf(n, { file: r, ...e || t })
    );
  };
}
function Of(e) {
  if (e)
    throw e;
}
var Yl, Ff;
function yI() {
  if (Ff) return Yl;
  Ff = 1;
  var e = Object.prototype.hasOwnProperty, t = Object.prototype.toString, n = Object.defineProperty, r = Object.getOwnPropertyDescriptor, i = function(s) {
    return typeof Array.isArray == "function" ? Array.isArray(s) : t.call(s) === "[object Array]";
  }, a = function(s) {
    if (!s || t.call(s) !== "[object Object]")
      return !1;
    var d = e.call(s, "constructor"), c = s.constructor && s.constructor.prototype && e.call(s.constructor.prototype, "isPrototypeOf");
    if (s.constructor && !d && !c)
      return !1;
    var m;
    for (m in s)
      ;
    return typeof m > "u" || e.call(s, m);
  }, o = function(s, d) {
    n && d.name === "__proto__" ? n(s, d.name, {
      enumerable: !0,
      configurable: !0,
      value: d.newValue,
      writable: !0
    }) : s[d.name] = d.newValue;
  }, l = function(s, d) {
    if (d === "__proto__")
      if (e.call(s, d)) {
        if (r)
          return r(s, d).value;
      } else return;
    return s[d];
  };
  return Yl = function u() {
    var s, d, c, m, h, x, v = arguments[0], b = 1, I = arguments.length, O = !1;
    for (typeof v == "boolean" && (O = v, v = arguments[1] || {}, b = 2), (v == null || typeof v != "object" && typeof v != "function") && (v = {}); b < I; ++b)
      if (s = arguments[b], s != null)
        for (d in s)
          c = l(v, d), m = l(s, d), v !== m && (O && m && (a(m) || (h = i(m))) ? (h ? (h = !1, x = c && i(c) ? c : []) : x = c && a(c) ? c : {}, o(v, { name: d, newValue: u(O, x, m) })) : typeof m < "u" && o(v, { name: d, newValue: m }));
    return v;
  }, Yl;
}
var wI = yI();
const Zl = /* @__PURE__ */ Hn(wI);
function Du(e) {
  if (typeof e != "object" || e === null)
    return !1;
  const t = Object.getPrototypeOf(e);
  return (t === null || t === Object.prototype || Object.getPrototypeOf(t) === null) && !(Symbol.toStringTag in e) && !(Symbol.iterator in e);
}
function xI() {
  const e = [], t = { run: n, use: r };
  return t;
  function n(...i) {
    let a = -1;
    const o = i.pop();
    if (typeof o != "function")
      throw new TypeError("Expected function as last argument, not " + o);
    l(null, ...i);
    function l(u, ...s) {
      const d = e[++a];
      let c = -1;
      if (u) {
        o(u);
        return;
      }
      for (; ++c < i.length; )
        (s[c] === null || s[c] === void 0) && (s[c] = i[c]);
      i = s, d ? CI(d, l)(...s) : o(null, ...s);
    }
  }
  function r(i) {
    if (typeof i != "function")
      throw new TypeError(
        "Expected `middelware` to be a function, not " + i
      );
    return e.push(i), t;
  }
}
function CI(e, t) {
  let n;
  return r;
  function r(...o) {
    const l = e.length > o.length;
    let u;
    l && o.push(i);
    try {
      u = e.apply(this, o);
    } catch (s) {
      const d = (
        /** @type {Error} */
        s
      );
      if (l && n)
        throw d;
      return i(d);
    }
    l || (u && u.then && typeof u.then == "function" ? u.then(a, i) : u instanceof Error ? i(u) : a(u));
  }
  function i(o, ...l) {
    n || (n = !0, t(o, ...l));
  }
  function a(o) {
    i(null, o);
  }
}
const gr = { basename: SI, dirname: II, extname: RI, join: EI, sep: "/" };
function SI(e, t) {
  if (t !== void 0 && typeof t != "string")
    throw new TypeError('"ext" argument must be a string');
  zo(e);
  let n = 0, r = -1, i = e.length, a;
  if (t === void 0 || t.length === 0 || t.length > e.length) {
    for (; i--; )
      if (e.codePointAt(i) === 47) {
        if (a) {
          n = i + 1;
          break;
        }
      } else r < 0 && (a = !0, r = i + 1);
    return r < 0 ? "" : e.slice(n, r);
  }
  if (t === e)
    return "";
  let o = -1, l = t.length - 1;
  for (; i--; )
    if (e.codePointAt(i) === 47) {
      if (a) {
        n = i + 1;
        break;
      }
    } else
      o < 0 && (a = !0, o = i + 1), l > -1 && (e.codePointAt(i) === t.codePointAt(l--) ? l < 0 && (r = i) : (l = -1, r = o));
  return n === r ? r = o : r < 0 && (r = e.length), e.slice(n, r);
}
function II(e) {
  if (zo(e), e.length === 0)
    return ".";
  let t = -1, n = e.length, r;
  for (; --n; )
    if (e.codePointAt(n) === 47) {
      if (r) {
        t = n;
        break;
      }
    } else r || (r = !0);
  return t < 0 ? e.codePointAt(0) === 47 ? "/" : "." : t === 1 && e.codePointAt(0) === 47 ? "//" : e.slice(0, t);
}
function RI(e) {
  zo(e);
  let t = e.length, n = -1, r = 0, i = -1, a = 0, o;
  for (; t--; ) {
    const l = e.codePointAt(t);
    if (l === 47) {
      if (o) {
        r = t + 1;
        break;
      }
      continue;
    }
    n < 0 && (o = !0, n = t + 1), l === 46 ? i < 0 ? i = t : a !== 1 && (a = 1) : i > -1 && (a = -1);
  }
  return i < 0 || n < 0 || // We saw a non-dot character immediately before the dot.
  a === 0 || // The (right-most) trimmed path component is exactly `..`.
  a === 1 && i === n - 1 && i === r + 1 ? "" : e.slice(i, n);
}
function EI(...e) {
  let t = -1, n;
  for (; ++t < e.length; )
    zo(e[t]), e[t] && (n = n === void 0 ? e[t] : n + "/" + e[t]);
  return n === void 0 ? "." : AI(n);
}
function AI(e) {
  zo(e);
  const t = e.codePointAt(0) === 47;
  let n = PI(e, !t);
  return n.length === 0 && !t && (n = "."), n.length > 0 && e.codePointAt(e.length - 1) === 47 && (n += "/"), t ? "/" + n : n;
}
function PI(e, t) {
  let n = "", r = 0, i = -1, a = 0, o = -1, l, u;
  for (; ++o <= e.length; ) {
    if (o < e.length)
      l = e.codePointAt(o);
    else {
      if (l === 47)
        break;
      l = 47;
    }
    if (l === 47) {
      if (!(i === o - 1 || a === 1)) if (i !== o - 1 && a === 2) {
        if (n.length < 2 || r !== 2 || n.codePointAt(n.length - 1) !== 46 || n.codePointAt(n.length - 2) !== 46) {
          if (n.length > 2) {
            if (u = n.lastIndexOf("/"), u !== n.length - 1) {
              u < 0 ? (n = "", r = 0) : (n = n.slice(0, u), r = n.length - 1 - n.lastIndexOf("/")), i = o, a = 0;
              continue;
            }
          } else if (n.length > 0) {
            n = "", r = 0, i = o, a = 0;
            continue;
          }
        }
        t && (n = n.length > 0 ? n + "/.." : "..", r = 2);
      } else
        n.length > 0 ? n += "/" + e.slice(i + 1, o) : n = e.slice(i + 1, o), r = o - i - 1;
      i = o, a = 0;
    } else l === 46 && a > -1 ? a++ : a = -1;
  }
  return n;
}
function zo(e) {
  if (typeof e != "string")
    throw new TypeError(
      "Path must be a string. Received " + JSON.stringify(e)
    );
}
const TI = { cwd: kI };
function kI() {
  return "/";
}
function ju(e) {
  return !!(e !== null && typeof e == "object" && "href" in e && e.href && "protocol" in e && e.protocol && // @ts-expect-error: indexing is fine.
  e.auth === void 0);
}
function OI(e) {
  if (typeof e == "string")
    e = new URL(e);
  else if (!ju(e)) {
    const t = new TypeError(
      'The "path" argument must be of type string or an instance of URL. Received `' + e + "`"
    );
    throw t.code = "ERR_INVALID_ARG_TYPE", t;
  }
  if (e.protocol !== "file:") {
    const t = new TypeError("The URL must be of scheme file");
    throw t.code = "ERR_INVALID_URL_SCHEME", t;
  }
  return FI(e);
}
function FI(e) {
  if (e.hostname !== "") {
    const r = new TypeError(
      'File URL host must be "localhost" or empty on darwin'
    );
    throw r.code = "ERR_INVALID_FILE_URL_HOST", r;
  }
  const t = e.pathname;
  let n = -1;
  for (; ++n < t.length; )
    if (t.codePointAt(n) === 37 && t.codePointAt(n + 1) === 50) {
      const r = t.codePointAt(n + 2);
      if (r === 70 || r === 102) {
        const i = new TypeError(
          "File URL path must not include encoded / characters"
        );
        throw i.code = "ERR_INVALID_FILE_URL_PATH", i;
      }
    }
  return decodeURIComponent(t);
}
const Jl = (
  /** @type {const} */
  [
    "history",
    "path",
    "basename",
    "stem",
    "extname",
    "dirname"
  ]
);
class Hh {
  /**
   * Create a new virtual file.
   *
   * `options` is treated as:
   *
   * *   `string` or `Uint8Array` — `{value: options}`
   * *   `URL` — `{path: options}`
   * *   `VFile` — shallow copies its data over to the new file
   * *   `object` — all fields are shallow copied over to the new file
   *
   * Path related fields are set in the following order (least specific to
   * most specific): `history`, `path`, `basename`, `stem`, `extname`,
   * `dirname`.
   *
   * You cannot set `dirname` or `extname` without setting either `history`,
   * `path`, `basename`, or `stem` too.
   *
   * @param {Compatible | null | undefined} [value]
   *   File value.
   * @returns
   *   New instance.
   */
  constructor(t) {
    let n;
    t ? ju(t) ? n = { path: t } : typeof t == "string" || BI(t) ? n = { value: t } : n = t : n = {}, this.cwd = "cwd" in n ? "" : TI.cwd(), this.data = {}, this.history = [], this.messages = [], this.value, this.map, this.result, this.stored;
    let r = -1;
    for (; ++r < Jl.length; ) {
      const a = Jl[r];
      a in n && n[a] !== void 0 && n[a] !== null && (this[a] = a === "history" ? [...n[a]] : n[a]);
    }
    let i;
    for (i in n)
      Jl.includes(i) || (this[i] = n[i]);
  }
  /**
   * Get the basename (including extname) (example: `'index.min.js'`).
   *
   * @returns {string | undefined}
   *   Basename.
   */
  get basename() {
    return typeof this.path == "string" ? gr.basename(this.path) : void 0;
  }
  /**
   * Set basename (including extname) (`'index.min.js'`).
   *
   * Cannot contain path separators (`'/'` on unix, macOS, and browsers, `'\'`
   * on windows).
   * Cannot be nullified (use `file.path = file.dirname` instead).
   *
   * @param {string} basename
   *   Basename.
   * @returns {undefined}
   *   Nothing.
   */
  set basename(t) {
    ql(t, "basename"), Ul(t, "basename"), this.path = gr.join(this.dirname || "", t);
  }
  /**
   * Get the parent path (example: `'~'`).
   *
   * @returns {string | undefined}
   *   Dirname.
   */
  get dirname() {
    return typeof this.path == "string" ? gr.dirname(this.path) : void 0;
  }
  /**
   * Set the parent path (example: `'~'`).
   *
   * Cannot be set if there’s no `path` yet.
   *
   * @param {string | undefined} dirname
   *   Dirname.
   * @returns {undefined}
   *   Nothing.
   */
  set dirname(t) {
    Bf(this.basename, "dirname"), this.path = gr.join(t || "", this.basename);
  }
  /**
   * Get the extname (including dot) (example: `'.js'`).
   *
   * @returns {string | undefined}
   *   Extname.
   */
  get extname() {
    return typeof this.path == "string" ? gr.extname(this.path) : void 0;
  }
  /**
   * Set the extname (including dot) (example: `'.js'`).
   *
   * Cannot contain path separators (`'/'` on unix, macOS, and browsers, `'\'`
   * on windows).
   * Cannot be set if there’s no `path` yet.
   *
   * @param {string | undefined} extname
   *   Extname.
   * @returns {undefined}
   *   Nothing.
   */
  set extname(t) {
    if (Ul(t, "extname"), Bf(this.dirname, "extname"), t) {
      if (t.codePointAt(0) !== 46)
        throw new Error("`extname` must start with `.`");
      if (t.includes(".", 1))
        throw new Error("`extname` cannot contain multiple dots");
    }
    this.path = gr.join(this.dirname, this.stem + (t || ""));
  }
  /**
   * Get the full path (example: `'~/index.min.js'`).
   *
   * @returns {string}
   *   Path.
   */
  get path() {
    return this.history[this.history.length - 1];
  }
  /**
   * Set the full path (example: `'~/index.min.js'`).
   *
   * Cannot be nullified.
   * You can set a file URL (a `URL` object with a `file:` protocol) which will
   * be turned into a path with `url.fileURLToPath`.
   *
   * @param {URL | string} path
   *   Path.
   * @returns {undefined}
   *   Nothing.
   */
  set path(t) {
    ju(t) && (t = OI(t)), ql(t, "path"), this.path !== t && this.history.push(t);
  }
  /**
   * Get the stem (basename w/o extname) (example: `'index.min'`).
   *
   * @returns {string | undefined}
   *   Stem.
   */
  get stem() {
    return typeof this.path == "string" ? gr.basename(this.path, this.extname) : void 0;
  }
  /**
   * Set the stem (basename w/o extname) (example: `'index.min'`).
   *
   * Cannot contain path separators (`'/'` on unix, macOS, and browsers, `'\'`
   * on windows).
   * Cannot be nullified (use `file.path = file.dirname` instead).
   *
   * @param {string} stem
   *   Stem.
   * @returns {undefined}
   *   Nothing.
   */
  set stem(t) {
    ql(t, "stem"), Ul(t, "stem"), this.path = gr.join(this.dirname || "", t + (this.extname || ""));
  }
  // Normal prototypal methods.
  /**
   * Create a fatal message for `reason` associated with the file.
   *
   * The `fatal` field of the message is set to `true` (error; file not usable)
   * and the `file` field is set to the current file path.
   * The message is added to the `messages` field on `file`.
   *
   * > 🪦 **Note**: also has obsolete signatures.
   *
   * @overload
   * @param {string} reason
   * @param {MessageOptions | null | undefined} [options]
   * @returns {never}
   *
   * @overload
   * @param {string} reason
   * @param {Node | NodeLike | null | undefined} parent
   * @param {string | null | undefined} [origin]
   * @returns {never}
   *
   * @overload
   * @param {string} reason
   * @param {Point | Position | null | undefined} place
   * @param {string | null | undefined} [origin]
   * @returns {never}
   *
   * @overload
   * @param {string} reason
   * @param {string | null | undefined} [origin]
   * @returns {never}
   *
   * @overload
   * @param {Error | VFileMessage} cause
   * @param {Node | NodeLike | null | undefined} parent
   * @param {string | null | undefined} [origin]
   * @returns {never}
   *
   * @overload
   * @param {Error | VFileMessage} cause
   * @param {Point | Position | null | undefined} place
   * @param {string | null | undefined} [origin]
   * @returns {never}
   *
   * @overload
   * @param {Error | VFileMessage} cause
   * @param {string | null | undefined} [origin]
   * @returns {never}
   *
   * @param {Error | VFileMessage | string} causeOrReason
   *   Reason for message, should use markdown.
   * @param {Node | NodeLike | MessageOptions | Point | Position | string | null | undefined} [optionsOrParentOrPlace]
   *   Configuration (optional).
   * @param {string | null | undefined} [origin]
   *   Place in code where the message originates (example:
   *   `'my-package:my-rule'` or `'my-rule'`).
   * @returns {never}
   *   Never.
   * @throws {VFileMessage}
   *   Message.
   */
  fail(t, n, r) {
    const i = this.message(t, n, r);
    throw i.fatal = !0, i;
  }
  /**
   * Create an info message for `reason` associated with the file.
   *
   * The `fatal` field of the message is set to `undefined` (info; change
   * likely not needed) and the `file` field is set to the current file path.
   * The message is added to the `messages` field on `file`.
   *
   * > 🪦 **Note**: also has obsolete signatures.
   *
   * @overload
   * @param {string} reason
   * @param {MessageOptions | null | undefined} [options]
   * @returns {VFileMessage}
   *
   * @overload
   * @param {string} reason
   * @param {Node | NodeLike | null | undefined} parent
   * @param {string | null | undefined} [origin]
   * @returns {VFileMessage}
   *
   * @overload
   * @param {string} reason
   * @param {Point | Position | null | undefined} place
   * @param {string | null | undefined} [origin]
   * @returns {VFileMessage}
   *
   * @overload
   * @param {string} reason
   * @param {string | null | undefined} [origin]
   * @returns {VFileMessage}
   *
   * @overload
   * @param {Error | VFileMessage} cause
   * @param {Node | NodeLike | null | undefined} parent
   * @param {string | null | undefined} [origin]
   * @returns {VFileMessage}
   *
   * @overload
   * @param {Error | VFileMessage} cause
   * @param {Point | Position | null | undefined} place
   * @param {string | null | undefined} [origin]
   * @returns {VFileMessage}
   *
   * @overload
   * @param {Error | VFileMessage} cause
   * @param {string | null | undefined} [origin]
   * @returns {VFileMessage}
   *
   * @param {Error | VFileMessage | string} causeOrReason
   *   Reason for message, should use markdown.
   * @param {Node | NodeLike | MessageOptions | Point | Position | string | null | undefined} [optionsOrParentOrPlace]
   *   Configuration (optional).
   * @param {string | null | undefined} [origin]
   *   Place in code where the message originates (example:
   *   `'my-package:my-rule'` or `'my-rule'`).
   * @returns {VFileMessage}
   *   Message.
   */
  info(t, n, r) {
    const i = this.message(t, n, r);
    return i.fatal = void 0, i;
  }
  /**
   * Create a message for `reason` associated with the file.
   *
   * The `fatal` field of the message is set to `false` (warning; change may be
   * needed) and the `file` field is set to the current file path.
   * The message is added to the `messages` field on `file`.
   *
   * > 🪦 **Note**: also has obsolete signatures.
   *
   * @overload
   * @param {string} reason
   * @param {MessageOptions | null | undefined} [options]
   * @returns {VFileMessage}
   *
   * @overload
   * @param {string} reason
   * @param {Node | NodeLike | null | undefined} parent
   * @param {string | null | undefined} [origin]
   * @returns {VFileMessage}
   *
   * @overload
   * @param {string} reason
   * @param {Point | Position | null | undefined} place
   * @param {string | null | undefined} [origin]
   * @returns {VFileMessage}
   *
   * @overload
   * @param {string} reason
   * @param {string | null | undefined} [origin]
   * @returns {VFileMessage}
   *
   * @overload
   * @param {Error | VFileMessage} cause
   * @param {Node | NodeLike | null | undefined} parent
   * @param {string | null | undefined} [origin]
   * @returns {VFileMessage}
   *
   * @overload
   * @param {Error | VFileMessage} cause
   * @param {Point | Position | null | undefined} place
   * @param {string | null | undefined} [origin]
   * @returns {VFileMessage}
   *
   * @overload
   * @param {Error | VFileMessage} cause
   * @param {string | null | undefined} [origin]
   * @returns {VFileMessage}
   *
   * @param {Error | VFileMessage | string} causeOrReason
   *   Reason for message, should use markdown.
   * @param {Node | NodeLike | MessageOptions | Point | Position | string | null | undefined} [optionsOrParentOrPlace]
   *   Configuration (optional).
   * @param {string | null | undefined} [origin]
   *   Place in code where the message originates (example:
   *   `'my-package:my-rule'` or `'my-rule'`).
   * @returns {VFileMessage}
   *   Message.
   */
  message(t, n, r) {
    const i = new Nn(
      // @ts-expect-error: the overloads are fine.
      t,
      n,
      r
    );
    return this.path && (i.name = this.path + ":" + i.name, i.file = this.path), i.fatal = !1, this.messages.push(i), i;
  }
  /**
   * Serialize the file.
   *
   * > **Note**: which encodings are supported depends on the engine.
   * > For info on Node.js, see:
   * > <https://nodejs.org/api/util.html#whatwg-supported-encodings>.
   *
   * @param {string | null | undefined} [encoding='utf8']
   *   Character encoding to understand `value` as when it’s a `Uint8Array`
   *   (default: `'utf-8'`).
   * @returns {string}
   *   Serialized file.
   */
  toString(t) {
    return this.value === void 0 ? "" : typeof this.value == "string" ? this.value : new TextDecoder(t || void 0).decode(this.value);
  }
}
function Ul(e, t) {
  if (e && e.includes(gr.sep))
    throw new Error(
      "`" + t + "` cannot be a path: did not expect `" + gr.sep + "`"
    );
}
function ql(e, t) {
  if (!e)
    throw new Error("`" + t + "` cannot be empty");
}
function Bf(e, t) {
  if (!e)
    throw new Error("Setting `" + t + "` requires `path` to be set too");
}
function BI(e) {
  return !!(e && typeof e == "object" && "byteLength" in e && "byteOffset" in e);
}
const NI = (
  /**
   * @type {new <Parameters extends Array<unknown>, Result>(property: string | symbol) => (...parameters: Parameters) => Result}
   */
  /** @type {unknown} */
  /**
   * @this {Function}
   * @param {string | symbol} property
   * @returns {(...parameters: Array<unknown>) => unknown}
   */
  function(e) {
    const r = (
      /** @type {Record<string | symbol, Function>} */
      // Prototypes do exist.
      // type-coverage:ignore-next-line
      this.constructor.prototype
    ), i = r[e], a = function() {
      return i.apply(a, arguments);
    };
    return Object.setPrototypeOf(a, r), a;
  }
), GI = {}.hasOwnProperty;
class Dc extends NI {
  /**
   * Create a processor.
   */
  constructor() {
    super("copy"), this.Compiler = void 0, this.Parser = void 0, this.attachers = [], this.compiler = void 0, this.freezeIndex = -1, this.frozen = void 0, this.namespace = {}, this.parser = void 0, this.transformers = xI();
  }
  /**
   * Copy a processor.
   *
   * @deprecated
   *   This is a private internal method and should not be used.
   * @returns {Processor<ParseTree, HeadTree, TailTree, CompileTree, CompileResult>}
   *   New *unfrozen* processor ({@linkcode Processor}) that is
   *   configured to work the same as its ancestor.
   *   When the descendant processor is configured in the future it does not
   *   affect the ancestral processor.
   */
  copy() {
    const t = (
      /** @type {Processor<ParseTree, HeadTree, TailTree, CompileTree, CompileResult>} */
      new Dc()
    );
    let n = -1;
    for (; ++n < this.attachers.length; ) {
      const r = this.attachers[n];
      t.use(...r);
    }
    return t.data(Zl(!0, {}, this.namespace)), t;
  }
  /**
   * Configure the processor with info available to all plugins.
   * Information is stored in an object.
   *
   * Typically, options can be given to a specific plugin, but sometimes it
   * makes sense to have information shared with several plugins.
   * For example, a list of HTML elements that are self-closing, which is
   * needed during all phases.
   *
   * > **Note**: setting information cannot occur on *frozen* processors.
   * > Call the processor first to create a new unfrozen processor.
   *
   * > **Note**: to register custom data in TypeScript, augment the
   * > {@linkcode Data} interface.
   *
   * @example
   *   This example show how to get and set info:
   *
   *   ```js
   *   import {unified} from 'unified'
   *
   *   const processor = unified().data('alpha', 'bravo')
   *
   *   processor.data('alpha') // => 'bravo'
   *
   *   processor.data() // => {alpha: 'bravo'}
   *
   *   processor.data({charlie: 'delta'})
   *
   *   processor.data() // => {charlie: 'delta'}
   *   ```
   *
   * @template {keyof Data} Key
   *
   * @overload
   * @returns {Data}
   *
   * @overload
   * @param {Data} dataset
   * @returns {Processor<ParseTree, HeadTree, TailTree, CompileTree, CompileResult>}
   *
   * @overload
   * @param {Key} key
   * @returns {Data[Key]}
   *
   * @overload
   * @param {Key} key
   * @param {Data[Key]} value
   * @returns {Processor<ParseTree, HeadTree, TailTree, CompileTree, CompileResult>}
   *
   * @param {Data | Key} [key]
   *   Key to get or set, or entire dataset to set, or nothing to get the
   *   entire dataset (optional).
   * @param {Data[Key]} [value]
   *   Value to set (optional).
   * @returns {unknown}
   *   The current processor when setting, the value at `key` when getting, or
   *   the entire dataset when getting without key.
   */
  data(t, n) {
    return typeof t == "string" ? arguments.length === 2 ? (eu("data", this.frozen), this.namespace[t] = n, this) : GI.call(this.namespace, t) && this.namespace[t] || void 0 : t ? (eu("data", this.frozen), this.namespace = t, this) : this.namespace;
  }
  /**
   * Freeze a processor.
   *
   * Frozen processors are meant to be extended and not to be configured
   * directly.
   *
   * When a processor is frozen it cannot be unfrozen.
   * New processors working the same way can be created by calling the
   * processor.
   *
   * It’s possible to freeze processors explicitly by calling `.freeze()`.
   * Processors freeze automatically when `.parse()`, `.run()`, `.runSync()`,
   * `.stringify()`, `.process()`, or `.processSync()` are called.
   *
   * @returns {Processor<ParseTree, HeadTree, TailTree, CompileTree, CompileResult>}
   *   The current processor.
   */
  freeze() {
    if (this.frozen)
      return this;
    const t = (
      /** @type {Processor} */
      /** @type {unknown} */
      this
    );
    for (; ++this.freezeIndex < this.attachers.length; ) {
      const [n, ...r] = this.attachers[this.freezeIndex];
      if (r[0] === !1)
        continue;
      r[0] === !0 && (r[0] = void 0);
      const i = n.call(t, ...r);
      typeof i == "function" && this.transformers.use(i);
    }
    return this.frozen = !0, this.freezeIndex = Number.POSITIVE_INFINITY, this;
  }
  /**
   * Parse text to a syntax tree.
   *
   * > **Note**: `parse` freezes the processor if not already *frozen*.
   *
   * > **Note**: `parse` performs the parse phase, not the run phase or other
   * > phases.
   *
   * @param {Compatible | undefined} [file]
   *   file to parse (optional); typically `string` or `VFile`; any value
   *   accepted as `x` in `new VFile(x)`.
   * @returns {ParseTree extends undefined ? Node : ParseTree}
   *   Syntax tree representing `file`.
   */
  parse(t) {
    this.freeze();
    const n = Oa(t), r = this.parser || this.Parser;
    return Ql("parse", r), r(String(n), n);
  }
  /**
   * Process the given file as configured on the processor.
   *
   * > **Note**: `process` freezes the processor if not already *frozen*.
   *
   * > **Note**: `process` performs the parse, run, and stringify phases.
   *
   * @overload
   * @param {Compatible | undefined} file
   * @param {ProcessCallback<VFileWithOutput<CompileResult>>} done
   * @returns {undefined}
   *
   * @overload
   * @param {Compatible | undefined} [file]
   * @returns {Promise<VFileWithOutput<CompileResult>>}
   *
   * @param {Compatible | undefined} [file]
   *   File (optional); typically `string` or `VFile`]; any value accepted as
   *   `x` in `new VFile(x)`.
   * @param {ProcessCallback<VFileWithOutput<CompileResult>> | undefined} [done]
   *   Callback (optional).
   * @returns {Promise<VFile> | undefined}
   *   Nothing if `done` is given.
   *   Otherwise a promise, rejected with a fatal error or resolved with the
   *   processed file.
   *
   *   The parsed, transformed, and compiled value is available at
   *   `file.value` (see note).
   *
   *   > **Note**: unified typically compiles by serializing: most
   *   > compilers return `string` (or `Uint8Array`).
   *   > Some compilers, such as the one configured with
   *   > [`rehype-react`][rehype-react], return other values (in this case, a
   *   > React tree).
   *   > If you’re using a compiler that doesn’t serialize, expect different
   *   > result values.
   *   >
   *   > To register custom results in TypeScript, add them to
   *   > {@linkcode CompileResultMap}.
   *
   *   [rehype-react]: https://github.com/rehypejs/rehype-react
   */
  process(t, n) {
    const r = this;
    return this.freeze(), Ql("process", this.parser || this.Parser), Kl("process", this.compiler || this.Compiler), n ? i(void 0, n) : new Promise(i);
    function i(a, o) {
      const l = Oa(t), u = (
        /** @type {HeadTree extends undefined ? Node : HeadTree} */
        /** @type {unknown} */
        r.parse(l)
      );
      r.run(u, l, function(d, c, m) {
        if (d || !c || !m)
          return s(d);
        const h = (
          /** @type {CompileTree extends undefined ? Node : CompileTree} */
          /** @type {unknown} */
          c
        ), x = r.stringify(h, m);
        VI(x) ? m.value = x : m.result = x, s(
          d,
          /** @type {VFileWithOutput<CompileResult>} */
          m
        );
      });
      function s(d, c) {
        d || !c ? o(d) : a ? a(c) : n(void 0, c);
      }
    }
  }
  /**
   * Process the given file as configured on the processor.
   *
   * An error is thrown if asynchronous transforms are configured.
   *
   * > **Note**: `processSync` freezes the processor if not already *frozen*.
   *
   * > **Note**: `processSync` performs the parse, run, and stringify phases.
   *
   * @param {Compatible | undefined} [file]
   *   File (optional); typically `string` or `VFile`; any value accepted as
   *   `x` in `new VFile(x)`.
   * @returns {VFileWithOutput<CompileResult>}
   *   The processed file.
   *
   *   The parsed, transformed, and compiled value is available at
   *   `file.value` (see note).
   *
   *   > **Note**: unified typically compiles by serializing: most
   *   > compilers return `string` (or `Uint8Array`).
   *   > Some compilers, such as the one configured with
   *   > [`rehype-react`][rehype-react], return other values (in this case, a
   *   > React tree).
   *   > If you’re using a compiler that doesn’t serialize, expect different
   *   > result values.
   *   >
   *   > To register custom results in TypeScript, add them to
   *   > {@linkcode CompileResultMap}.
   *
   *   [rehype-react]: https://github.com/rehypejs/rehype-react
   */
  processSync(t) {
    let n = !1, r;
    return this.freeze(), Ql("processSync", this.parser || this.Parser), Kl("processSync", this.compiler || this.Compiler), this.process(t, i), Gf("processSync", "process", n), r;
    function i(a, o) {
      n = !0, Of(a), r = o;
    }
  }
  /**
   * Run *transformers* on a syntax tree.
   *
   * > **Note**: `run` freezes the processor if not already *frozen*.
   *
   * > **Note**: `run` performs the run phase, not other phases.
   *
   * @overload
   * @param {HeadTree extends undefined ? Node : HeadTree} tree
   * @param {RunCallback<TailTree extends undefined ? Node : TailTree>} done
   * @returns {undefined}
   *
   * @overload
   * @param {HeadTree extends undefined ? Node : HeadTree} tree
   * @param {Compatible | undefined} file
   * @param {RunCallback<TailTree extends undefined ? Node : TailTree>} done
   * @returns {undefined}
   *
   * @overload
   * @param {HeadTree extends undefined ? Node : HeadTree} tree
   * @param {Compatible | undefined} [file]
   * @returns {Promise<TailTree extends undefined ? Node : TailTree>}
   *
   * @param {HeadTree extends undefined ? Node : HeadTree} tree
   *   Tree to transform and inspect.
   * @param {(
   *   RunCallback<TailTree extends undefined ? Node : TailTree> |
   *   Compatible
   * )} [file]
   *   File associated with `node` (optional); any value accepted as `x` in
   *   `new VFile(x)`.
   * @param {RunCallback<TailTree extends undefined ? Node : TailTree>} [done]
   *   Callback (optional).
   * @returns {Promise<TailTree extends undefined ? Node : TailTree> | undefined}
   *   Nothing if `done` is given.
   *   Otherwise, a promise rejected with a fatal error or resolved with the
   *   transformed tree.
   */
  run(t, n, r) {
    Nf(t), this.freeze();
    const i = this.transformers;
    return !r && typeof n == "function" && (r = n, n = void 0), r ? a(void 0, r) : new Promise(a);
    function a(o, l) {
      const u = Oa(n);
      i.run(t, u, s);
      function s(d, c, m) {
        const h = (
          /** @type {TailTree extends undefined ? Node : TailTree} */
          c || t
        );
        d ? l(d) : o ? o(h) : r(void 0, h, m);
      }
    }
  }
  /**
   * Run *transformers* on a syntax tree.
   *
   * An error is thrown if asynchronous transforms are configured.
   *
   * > **Note**: `runSync` freezes the processor if not already *frozen*.
   *
   * > **Note**: `runSync` performs the run phase, not other phases.
   *
   * @param {HeadTree extends undefined ? Node : HeadTree} tree
   *   Tree to transform and inspect.
   * @param {Compatible | undefined} [file]
   *   File associated with `node` (optional); any value accepted as `x` in
   *   `new VFile(x)`.
   * @returns {TailTree extends undefined ? Node : TailTree}
   *   Transformed tree.
   */
  runSync(t, n) {
    let r = !1, i;
    return this.run(t, n, a), Gf("runSync", "run", r), i;
    function a(o, l) {
      Of(o), i = l, r = !0;
    }
  }
  /**
   * Compile a syntax tree.
   *
   * > **Note**: `stringify` freezes the processor if not already *frozen*.
   *
   * > **Note**: `stringify` performs the stringify phase, not the run phase
   * > or other phases.
   *
   * @param {CompileTree extends undefined ? Node : CompileTree} tree
   *   Tree to compile.
   * @param {Compatible | undefined} [file]
   *   File associated with `node` (optional); any value accepted as `x` in
   *   `new VFile(x)`.
   * @returns {CompileResult extends undefined ? Value : CompileResult}
   *   Textual representation of the tree (see note).
   *
   *   > **Note**: unified typically compiles by serializing: most compilers
   *   > return `string` (or `Uint8Array`).
   *   > Some compilers, such as the one configured with
   *   > [`rehype-react`][rehype-react], return other values (in this case, a
   *   > React tree).
   *   > If you’re using a compiler that doesn’t serialize, expect different
   *   > result values.
   *   >
   *   > To register custom results in TypeScript, add them to
   *   > {@linkcode CompileResultMap}.
   *
   *   [rehype-react]: https://github.com/rehypejs/rehype-react
   */
  stringify(t, n) {
    this.freeze();
    const r = Oa(n), i = this.compiler || this.Compiler;
    return Kl("stringify", i), Nf(t), i(t, r);
  }
  /**
   * Configure the processor to use a plugin, a list of usable values, or a
   * preset.
   *
   * If the processor is already using a plugin, the previous plugin
   * configuration is changed based on the options that are passed in.
   * In other words, the plugin is not added a second time.
   *
   * > **Note**: `use` cannot be called on *frozen* processors.
   * > Call the processor first to create a new unfrozen processor.
   *
   * @example
   *   There are many ways to pass plugins to `.use()`.
   *   This example gives an overview:
   *
   *   ```js
   *   import {unified} from 'unified'
   *
   *   unified()
   *     // Plugin with options:
   *     .use(pluginA, {x: true, y: true})
   *     // Passing the same plugin again merges configuration (to `{x: true, y: false, z: true}`):
   *     .use(pluginA, {y: false, z: true})
   *     // Plugins:
   *     .use([pluginB, pluginC])
   *     // Two plugins, the second with options:
   *     .use([pluginD, [pluginE, {}]])
   *     // Preset with plugins and settings:
   *     .use({plugins: [pluginF, [pluginG, {}]], settings: {position: false}})
   *     // Settings only:
   *     .use({settings: {position: false}})
   *   ```
   *
   * @template {Array<unknown>} [Parameters=[]]
   * @template {Node | string | undefined} [Input=undefined]
   * @template [Output=Input]
   *
   * @overload
   * @param {Preset | null | undefined} [preset]
   * @returns {Processor<ParseTree, HeadTree, TailTree, CompileTree, CompileResult>}
   *
   * @overload
   * @param {PluggableList} list
   * @returns {Processor<ParseTree, HeadTree, TailTree, CompileTree, CompileResult>}
   *
   * @overload
   * @param {Plugin<Parameters, Input, Output>} plugin
   * @param {...(Parameters | [boolean])} parameters
   * @returns {UsePlugin<ParseTree, HeadTree, TailTree, CompileTree, CompileResult, Input, Output>}
   *
   * @param {PluggableList | Plugin | Preset | null | undefined} value
   *   Usable value.
   * @param {...unknown} parameters
   *   Parameters, when a plugin is given as a usable value.
   * @returns {Processor<ParseTree, HeadTree, TailTree, CompileTree, CompileResult>}
   *   Current processor.
   */
  use(t, ...n) {
    const r = this.attachers, i = this.namespace;
    if (eu("use", this.frozen), t != null) if (typeof t == "function")
      u(t, n);
    else if (typeof t == "object")
      Array.isArray(t) ? l(t) : o(t);
    else
      throw new TypeError("Expected usable value, not `" + t + "`");
    return this;
    function a(s) {
      if (typeof s == "function")
        u(s, []);
      else if (typeof s == "object")
        if (Array.isArray(s)) {
          const [d, ...c] = (
            /** @type {PluginTuple<Array<unknown>>} */
            s
          );
          u(d, c);
        } else
          o(s);
      else
        throw new TypeError("Expected usable value, not `" + s + "`");
    }
    function o(s) {
      if (!("plugins" in s) && !("settings" in s))
        throw new Error(
          "Expected usable value but received an empty preset, which is probably a mistake: presets typically come with `plugins` and sometimes with `settings`, but this has neither"
        );
      l(s.plugins), s.settings && (i.settings = Zl(!0, i.settings, s.settings));
    }
    function l(s) {
      let d = -1;
      if (s != null) if (Array.isArray(s))
        for (; ++d < s.length; ) {
          const c = s[d];
          a(c);
        }
      else
        throw new TypeError("Expected a list of plugins, not `" + s + "`");
    }
    function u(s, d) {
      let c = -1, m = -1;
      for (; ++c < r.length; )
        if (r[c][0] === s) {
          m = c;
          break;
        }
      if (m === -1)
        r.push([s, ...d]);
      else if (d.length > 0) {
        let [h, ...x] = d;
        const v = r[m][1];
        Du(v) && Du(h) && (h = Zl(!0, v, h)), r[m] = [s, h, ...x];
      }
    }
  }
}
const _I = new Dc().freeze();
function Ql(e, t) {
  if (typeof t != "function")
    throw new TypeError("Cannot `" + e + "` without `parser`");
}
function Kl(e, t) {
  if (typeof t != "function")
    throw new TypeError("Cannot `" + e + "` without `compiler`");
}
function eu(e, t) {
  if (t)
    throw new Error(
      "Cannot call `" + e + "` on a frozen processor.\nCreate a new processor first, by calling it: use `processor()` instead of `processor`."
    );
}
function Nf(e) {
  if (!Du(e) || typeof e.type != "string")
    throw new TypeError("Expected node, got `" + e + "`");
}
function Gf(e, t, n) {
  if (!n)
    throw new Error(
      "`" + e + "` finished async. Use `" + t + "` instead"
    );
}
function Oa(e) {
  return MI(e) ? e : new Hh(e);
}
function MI(e) {
  return !!(e && typeof e == "object" && "message" in e && "messages" in e);
}
function VI(e) {
  return typeof e == "string" || LI(e);
}
function LI(e) {
  return !!(e && typeof e == "object" && "byteLength" in e && "byteOffset" in e);
}
const DI = "https://github.com/remarkjs/react-markdown/blob/main/changelog.md", _f = [], Mf = { allowDangerousHtml: !0 }, jI = /^(https?|ircs?|mailto|xmpp)$/i, zI = [
  { from: "astPlugins", id: "remove-buggy-html-in-markdown-parser" },
  { from: "allowDangerousHtml", id: "remove-buggy-html-in-markdown-parser" },
  {
    from: "allowNode",
    id: "replace-allownode-allowedtypes-and-disallowedtypes",
    to: "allowElement"
  },
  {
    from: "allowedTypes",
    id: "replace-allownode-allowedtypes-and-disallowedtypes",
    to: "allowedElements"
  },
  {
    from: "disallowedTypes",
    id: "replace-allownode-allowedtypes-and-disallowedtypes",
    to: "disallowedElements"
  },
  { from: "escapeHtml", id: "remove-buggy-html-in-markdown-parser" },
  { from: "includeElementIndex", id: "#remove-includeelementindex" },
  {
    from: "includeNodeIndex",
    id: "change-includenodeindex-to-includeelementindex"
  },
  { from: "linkTarget", id: "remove-linktarget" },
  { from: "plugins", id: "change-plugins-to-remarkplugins", to: "remarkPlugins" },
  { from: "rawSourcePos", id: "#remove-rawsourcepos" },
  { from: "renderers", id: "change-renderers-to-components", to: "components" },
  { from: "source", id: "change-source-to-children", to: "children" },
  { from: "sourcePos", id: "#remove-sourcepos" },
  { from: "transformImageUri", id: "#add-urltransform", to: "urlTransform" },
  { from: "transformLinkUri", id: "#add-urltransform", to: "urlTransform" }
];
function HI(e) {
  const t = e.allowedElements, n = e.allowElement, r = e.children || "", i = e.className, a = e.components, o = e.disallowedElements, l = e.rehypePlugins || _f, u = e.remarkPlugins || _f, s = e.remarkRehypeOptions ? { ...e.remarkRehypeOptions, ...Mf } : Mf, d = e.skipHtml, c = e.unwrapDisallowed, m = e.urlTransform || WI, h = _I().use(SS).use(u).use(bI, s).use(l), x = new Hh();
  typeof r == "string" && (x.value = r);
  for (const O of zI)
    Object.hasOwn(e, O.from) && ("" + O.from + (O.to ? "use `" + O.to + "` instead" : "remove it") + DI + O.id, void 0);
  const v = h.parse(x);
  let b = h.runSync(v, x);
  return i && (b = {
    type: "element",
    tagName: "div",
    properties: { className: i },
    // Assume no doctypes.
    children: (
      /** @type {Array<ElementContent>} */
      b.type === "root" ? b.children : [b]
    )
  }), zh(b, I), tx(b, {
    Fragment: W.Fragment,
    // @ts-expect-error
    // React components are allowed to return numbers,
    // but not according to the types in hast-util-to-jsx-runtime
    components: a,
    ignoreInvalidStyle: !0,
    jsx: W.jsx,
    jsxs: W.jsxs,
    passKeys: !0,
    passNode: !0
  });
  function I(O, T, D) {
    if (O.type === "raw" && D && typeof T == "number")
      return d ? D.children.splice(T, 1) : D.children[T] = { type: "text", value: O.value }, T;
    if (O.type === "element") {
      let E;
      for (E in Wl)
        if (Object.hasOwn(Wl, E) && Object.hasOwn(O.properties, E)) {
          const B = O.properties[E], X = Wl[E];
          (X === null || X.includes(O.tagName)) && (O.properties[E] = m(String(B || ""), E, O));
        }
    }
    if (O.type === "element") {
      let E = t ? !t.includes(O.tagName) : o ? o.includes(O.tagName) : !1;
      if (!E && n && typeof T == "number" && (E = !n(O, T, D)), E && D && typeof T == "number")
        return c && O.children ? D.children.splice(T, 1, ...O.children) : D.children.splice(T, 1), T;
    }
  }
}
function WI(e) {
  const t = e.indexOf(":"), n = e.indexOf("?"), r = e.indexOf("#"), i = e.indexOf("/");
  return (
    // If there is no protocol, it’s relative.
    t === -1 || // If the first colon is after a `?`, `#`, or `/`, it’s not a protocol.
    i !== -1 && t > i || n !== -1 && t > n || r !== -1 && t > r || // It is a protocol, it should be allowed.
    jI.test(e.slice(0, t)) ? e : ""
  );
}
const zu = ({ item: e, index: t, handleDownload: n }) => {
  var o, l, u, s, d, c;
  const { info: r } = Cu((m) => m.chatInterfaceSliceReducer), i = {
    KPI: "kpi",
    TABLE: "table",
    SUMMARY: "summary",
    TTYD: "ttyd"
  };
  let a;
  return e.type === i.KPI ? a = /* @__PURE__ */ W.jsxs(W.Fragment, { children: [
    /* @__PURE__ */ W.jsx("h4", { children: Object.keys(e.data[0])[0] }),
    /* @__PURE__ */ W.jsx("p", { children: Object.values(e.data[0])[0] })
  ] }) : e.type === i.TABLE ? a = /* @__PURE__ */ W.jsx(ah, { item: e, handleDownload: n }) : e.type === i.SUMMARY && t === (r == null ? void 0 : r.length) - 1 ? a = /* @__PURE__ */ W.jsxs(W.Fragment, { children: [
    /* @__PURE__ */ W.jsx("p", { children: JSON.stringify(e.data).slice(1, -1) }),
    /* @__PURE__ */ W.jsxs(
      "div",
      {
        style: {
          display: "flex",
          justifyContent: "space-between"
        },
        children: [
          /* @__PURE__ */ W.jsx("div", { style: { width: "100%", position: "relative" }, children: /* @__PURE__ */ W.jsx(
            "p",
            {
              style: {
                fontSize: "10px",
                color: "#000000",
                lineHeight: "12.6px",
                opacity: "50%"
              }
            }
          ) }),
          /* @__PURE__ */ W.jsx("div", { style: { position: "absolute", right: "20px" }, children: /* @__PURE__ */ W.jsx(Fu, { cost: e.cost, time: e.time }) })
        ]
      }
    )
  ] }) : e.type === i.TTYD ? a = /* @__PURE__ */ W.jsxs(W.Fragment, { children: [
    /* @__PURE__ */ W.jsx(HI, { children: (o = e.data) == null ? void 0 : o.text }),
    /* @__PURE__ */ W.jsx("div", { style: { marginTop: "20px" }, children: /* @__PURE__ */ W.jsx(sh, { item: e }) }),
    ((u = (l = e == null ? void 0 : e.data) == null ? void 0 : l.extras) == null ? void 0 : u.citations) && /* @__PURE__ */ W.jsxs(W.Fragment, { children: [
      /* @__PURE__ */ W.jsx(qg, { children: /* @__PURE__ */ W.jsx(Qg, { children: "Citations" }) }),
      /* @__PURE__ */ W.jsx(Rc, { style: { padding: "30px" }, children: (c = Object.keys((d = (s = e == null ? void 0 : e.data) == null ? void 0 : s.extras) == null ? void 0 : d.citations)) == null ? void 0 : c.map((m) => {
        var h, x;
        return /* @__PURE__ */ W.jsx("p", { children: `${m}: ${(x = (h = e.data) == null ? void 0 : h.extras) == null ? void 0 : x.citations[m]}` }, m);
      }) })
    ] })
  ] }) : a = /* @__PURE__ */ W.jsxs(W.Fragment, { children: [
    /* @__PURE__ */ W.jsx("p", { children: JSON.stringify(e.data).slice(1, -1) }),
    /* @__PURE__ */ W.jsx(Fu, { cost: e.cost, time: e.time })
  ] }), /* @__PURE__ */ W.jsxs(Zg, { children: [
    /* @__PURE__ */ W.jsx(Ug, { children: /* @__PURE__ */ W.jsx(Kg, {}) }),
    /* @__PURE__ */ W.jsx(Jg, { children: a })
  ] }, t);
};
zu.propTypes = {
  item: _e.any,
  index: _e.any,
  handleDownload: _e.any
};
const $I = () => /* @__PURE__ */ W.jsxs(Zg, { children: [
  /* @__PURE__ */ W.jsx(Ug, { children: /* @__PURE__ */ W.jsx(Kg, {}) }),
  /* @__PURE__ */ W.jsx(Jg, { children: /* @__PURE__ */ W.jsx(K0, { children: "Generating ..." }) })
] });
var XI = 46, YI = /\\(\\)?/g, ZI = RegExp(
  // Match anything that isn't a dot or bracket.
  `[^.[\\]]+|\\[(?:([^"'][^[]*)|(["'])((?:(?!\\2)[^\\\\]|\\\\.)*?)\\2)\\]|(?=(?:\\.|\\[\\])(?:\\.|\\[\\]|$))`,
  "g"
), JI = function(t) {
  var n = [];
  return t.charCodeAt(0) === XI && n.push(""), t.replace(ZI, function(r, i, a, o) {
    var l = r;
    a ? l = o.replace(YI, "$1") : i && (l = i.trim()), n.push(l);
  }), n;
}, Fa = {}, UI = /[.[\]]+/, Wh = function(t) {
  if (t == null || !t.length)
    return [];
  if (typeof t != "string")
    throw new Error("toPath() expects a string");
  return Fa[t] == null && (t.endsWith("[]") ? Fa[t] = t.split(UI).filter(Boolean) : Fa[t] = JI(t)), Fa[t];
}, sn = function(t, n) {
  for (var r = Wh(n), i = t, a = 0; a < r.length; a++) {
    var o = r[a];
    if (i == null || typeof i != "object" || Array.isArray(i) && isNaN(o))
      return;
    i = i[o];
  }
  return i;
};
function qI(e) {
  var t = QI(e, "string");
  return typeof t == "symbol" ? t : String(t);
}
function QI(e, t) {
  if (typeof e != "object" || e === null) return e;
  var n = e[Symbol.toPrimitive];
  if (n !== void 0) {
    var r = n.call(e, t);
    if (typeof r != "object") return r;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return String(e);
}
var KI = function e(t, n, r, i, a) {
  if (n >= r.length)
    return i;
  var o = r[n];
  if (isNaN(o)) {
    var l;
    if (t == null) {
      var u, s = e(void 0, n + 1, r, i, a);
      return s === void 0 ? void 0 : (u = {}, u[o] = s, u);
    }
    if (Array.isArray(t))
      throw new Error("Cannot set a non-numeric property on an array");
    var d = e(t[o], n + 1, r, i, a);
    if (d === void 0) {
      var c = Object.keys(t).length;
      if (t[o] === void 0 && c === 0)
        return;
      if (t[o] !== void 0 && c <= 1)
        return !isNaN(r[n - 1]) && !a ? {} : void 0;
      t[o];
      var m = Lo(t, [o].map(qI));
      return m;
    }
    return ke({}, t, (l = {}, l[o] = d, l));
  }
  var h = Number(o);
  if (t == null) {
    var x = e(void 0, n + 1, r, i, a);
    if (x === void 0)
      return;
    var v = [];
    return v[h] = x, v;
  }
  if (!Array.isArray(t))
    throw new Error("Cannot set a numeric property on an object");
  var b = t[h], I = e(b, n + 1, r, i, a), O = [].concat(t);
  if (a && I === void 0) {
    if (O.splice(h, 1), O.length === 0)
      return;
  } else
    O[h] = I;
  return O;
}, nr = function(t, n, r, i) {
  if (i === void 0 && (i = !1), t == null)
    throw new Error("Cannot call setIn() with " + String(t) + " state");
  if (n == null)
    throw new Error("Cannot call setIn() with " + String(n) + " key");
  return KI(t, 0, Wh(n), r, i);
}, Vf = "FINAL_FORM/form-error", Io = "FINAL_FORM/array-error";
function Lf(e, t) {
  var n = e.errors, r = e.initialValues, i = e.lastSubmittedValues, a = e.submitErrors, o = e.submitFailed, l = e.submitSucceeded, u = e.submitting, s = e.values, d = t.active, c = t.blur, m = t.change, h = t.data, x = t.focus, v = t.modified, b = t.modifiedSinceLastSubmit, I = t.name, O = t.touched, T = t.validating, D = t.visited, E = sn(s, I), B = sn(n, I);
  B && B[Io] && (B = B[Io]);
  var X = a && sn(a, I), U = r && sn(r, I), K = t.isEqual(U, E), Fe = !!(i && !t.isEqual(sn(i, I), E)), oe = !B && !X;
  return {
    active: d,
    blur: c,
    change: m,
    data: h,
    dirty: !K,
    dirtySinceLastSubmit: Fe,
    error: B,
    focus: x,
    initial: U,
    invalid: !oe,
    length: Array.isArray(E) ? E.length : void 0,
    modified: v,
    modifiedSinceLastSubmit: b,
    name: I,
    pristine: K,
    submitError: X,
    submitFailed: o,
    submitSucceeded: l,
    submitting: u,
    touched: O,
    valid: oe,
    value: E,
    visited: D,
    validating: T
  };
}
var $h = ["active", "data", "dirty", "dirtySinceLastSubmit", "error", "initial", "invalid", "length", "modified", "modifiedSinceLastSubmit", "pristine", "submitError", "submitFailed", "submitSucceeded", "submitting", "touched", "valid", "value", "visited", "validating"], hr = function(t, n) {
  if (t === n)
    return !0;
  if (typeof t != "object" || !t || typeof n != "object" || !n)
    return !1;
  var r = Object.keys(t), i = Object.keys(n);
  if (r.length !== i.length)
    return !1;
  for (var a = Object.prototype.hasOwnProperty.bind(n), o = 0; o < r.length; o++) {
    var l = r[o];
    if (!a(l) || t[l] !== n[l])
      return !1;
  }
  return !0;
};
function Xh(e, t, n, r, i, a) {
  var o = !1;
  return i.forEach(function(l) {
    r[l] && (e[l] = t[l], (!n || (~a.indexOf(l) ? !hr(t[l], n[l]) : t[l] !== n[l])) && (o = !0));
  }), o;
}
var e1 = ["data"], t1 = function(t, n, r, i) {
  var a = {
    blur: t.blur,
    change: t.change,
    focus: t.focus,
    name: t.name
  }, o = Xh(a, t, n, r, $h, e1) || !n;
  return o || i ? a : void 0;
}, Yh = ["active", "dirty", "dirtyFields", "dirtyFieldsSinceLastSubmit", "dirtySinceLastSubmit", "error", "errors", "hasSubmitErrors", "hasValidationErrors", "initialValues", "invalid", "modified", "modifiedSinceLastSubmit", "pristine", "submitting", "submitError", "submitErrors", "submitFailed", "submitSucceeded", "touched", "valid", "validating", "values", "visited"], n1 = ["touched", "visited"];
function Df(e, t, n, r) {
  var i = {}, a = Xh(i, e, t, n, Yh, n1) || !t;
  return a || r ? i : void 0;
}
var jf = function(t) {
  var n, r;
  return function() {
    for (var i = arguments.length, a = new Array(i), o = 0; o < i; o++)
      a[o] = arguments[o];
    return (!n || a.length !== n.length || a.some(function(l, u) {
      return !hr(n[u], l);
    })) && (n = a, r = t.apply(void 0, a)), r;
  };
}, tu = function(e) {
  return !!e && (typeof e == "object" || typeof e == "function") && typeof e.then == "function";
}, r1 = "4.20.10", i1 = function(t, n) {
  return t === n;
}, Oi = function e(t) {
  return Object.keys(t).some(function(n) {
    var r = t[n];
    return r && typeof r == "object" && !(r instanceof Error) ? e(r) : typeof r < "u";
  });
};
function o1(e) {
  var t = e.active, n = e.dirtySinceLastSubmit, r = e.modifiedSinceLastSubmit, i = e.error, a = e.errors, o = e.initialValues, l = e.pristine, u = e.submitting, s = e.submitFailed, d = e.submitSucceeded, c = e.submitError, m = e.submitErrors, h = e.valid, x = e.validating, v = e.values;
  return {
    active: t,
    dirty: !l,
    dirtySinceLastSubmit: n,
    modifiedSinceLastSubmit: r,
    error: i,
    errors: a,
    hasSubmitErrors: !!(c || m && Oi(m)),
    hasValidationErrors: !!(i || Oi(a)),
    invalid: !h,
    initialValues: o,
    pristine: l,
    submitting: u,
    submitFailed: s,
    submitSucceeded: d,
    submitError: c,
    submitErrors: m,
    valid: h,
    validating: x > 0,
    values: v
  };
}
function Zh(e, t, n, r, i, a) {
  var o = i(n, r, t, a);
  return o ? (e(o), !0) : !1;
}
function zf(e, t, n, r, i) {
  var a = e.entries;
  Object.keys(a).forEach(function(o) {
    var l = a[Number(o)];
    if (l) {
      var u = l.subscription, s = l.subscriber, d = l.notified;
      Zh(s, u, t, n, r, i || !d) && (l.notified = !0);
    }
  });
}
function a1(e) {
  if (!e)
    throw new Error("No config specified");
  var t = e.debug, n = e.destroyOnUnregister, r = e.keepDirtyOnReinitialize, i = e.initialValues, a = e.mutators, o = e.onSubmit, l = e.validate, u = e.validateOnBlur;
  if (!o)
    throw new Error("No onSubmit function specified");
  var s = {
    subscribers: {
      index: 0,
      entries: {}
    },
    fieldSubscribers: {},
    fields: {},
    formState: {
      asyncErrors: {},
      dirtySinceLastSubmit: !1,
      modifiedSinceLastSubmit: !1,
      errors: {},
      initialValues: i && ke({}, i),
      invalid: !1,
      pristine: !0,
      submitting: !1,
      submitFailed: !1,
      submitSucceeded: !1,
      resetWhileSubmitting: !1,
      valid: !0,
      validating: 0,
      values: i ? ke({}, i) : {}
    },
    lastFormState: void 0
  }, d = 0, c = !1, m = !1, h = !1, x = 0, v = {}, b = function(A) {
    return function(w) {
      return delete v[A], w;
    };
  }, I = function(A, w, H) {
    var $ = sn(A.formState.values, w), _ = H($);
    A.formState.values = nr(A.formState.values, w, _) || {};
  }, O = function(A, w, H) {
    if (A.fields[w]) {
      var $, _;
      A.fields = ke({}, A.fields, ($ = {}, $[H] = ke({}, A.fields[w], {
        name: H,
        // rebind event handlers
        blur: function() {
          return G.blur(H);
        },
        change: function(fe) {
          return G.change(H, fe);
        },
        focus: function() {
          return G.focus(H);
        },
        lastFieldState: void 0
      }), $)), delete A.fields[w], A.fieldSubscribers = ke({}, A.fieldSubscribers, (_ = {}, _[H] = A.fieldSubscribers[w], _)), delete A.fieldSubscribers[w];
      var re = sn(A.formState.values, w);
      A.formState.values = nr(A.formState.values, w, void 0) || {}, A.formState.values = nr(A.formState.values, H, re), delete A.lastFormState;
    }
  }, T = function(A) {
    return function() {
      if (a) {
        for (var w = {
          formState: s.formState,
          fields: s.fields,
          fieldSubscribers: s.fieldSubscribers,
          lastFormState: s.lastFormState
        }, H = arguments.length, $ = new Array(H), _ = 0; _ < H; _++)
          $[_] = arguments[_];
        var re = a[A]($, w, {
          changeValue: I,
          getIn: sn,
          renameField: O,
          resetFieldState: G.resetFieldState,
          setIn: nr,
          shallowEqual: hr
        });
        return s.formState = w.formState, s.fields = w.fields, s.fieldSubscribers = w.fieldSubscribers, s.lastFormState = w.lastFormState, U(void 0, function() {
          K(), Ee();
        }), re;
      }
    };
  }, D = a ? Object.keys(a).reduce(function(Z, A) {
    return Z[A] = T(A), Z;
  }, {}) : {}, E = function(A) {
    var w = [];
    if (l) {
      var H = l(ke({}, s.formState.values));
      tu(H) ? w.push(H.then(function($) {
        return A($, !0);
      })) : A(H, !1);
    }
    return w;
  }, B = function(A) {
    return Object.keys(A.validators).reduce(function(w, H) {
      var $ = A.validators[Number(H)]();
      return $ && w.push($), w;
    }, []);
  }, X = function(A, w) {
    var H = [], $ = B(A);
    if ($.length) {
      var _;
      $.forEach(function(re) {
        var Y = re(sn(s.formState.values, A.name), s.formState.values, re.length === 0 || re.length === 3 ? Lf(s.formState, s.fields[A.name]) : void 0);
        if (Y && tu(Y)) {
          A.validating = !0;
          var fe = Y.then(function(ge) {
            s.fields[A.name] && (s.fields[A.name].validating = !1, w(ge));
          });
          H.push(fe);
        } else _ || (_ = Y);
      }), w(_);
    }
    return H;
  }, U = function(A, w) {
    if (c) {
      m = !0, w();
      return;
    }
    var H = s.fields, $ = s.formState, _ = ke({}, H), re = Object.keys(_);
    if (!l && !re.some(function(kt) {
      return B(_[kt]).length;
    })) {
      w();
      return;
    }
    var Y = !1;
    if (A) {
      var fe = _[A];
      if (fe) {
        var ge = fe.validateFields;
        ge && (Y = !0, re = ge.length ? ge.concat(A) : [A]);
      }
    }
    var ve = {}, Te = {}, J = {}, ft = [].concat(E(function(kt, gn) {
      gn ? Te = kt || {} : ve = kt || {};
    }), re.reduce(function(kt, gn) {
      return kt.concat(X(H[gn], function(on) {
        J[gn] = on;
      }));
    }, [])), je = ft.length > 0, et = ++x, pt = Promise.all(ft).then(b(et));
    je && (v[et] = pt);
    var Yt = function(gn) {
      var on = ke({}, Y ? $.errors : {}, ve, gn ? Te : $.asyncErrors), an = function(Ot) {
        re.forEach(function(ee) {
          if (H[ee]) {
            var we = sn(ve, ee), Ze = sn(on, ee), Rt = B(_[ee]).length, Bt = J[ee];
            Ot(ee, Rt && Bt || l && we || (!we && !Y ? Ze : void 0));
          }
        });
      };
      an(function(Ke, Ot) {
        on = nr(on, Ke, Ot) || {};
      }), an(function(Ke, Ot) {
        if (Ot && Ot[Io]) {
          var ee = sn(on, Ke), we = [].concat(ee);
          we[Io] = Ot[Io], on = nr(on, Ke, we);
        }
      }), hr($.errors, on) || ($.errors = on), gn && ($.asyncErrors = Te), $.error = ve[Vf];
    };
    if (je && (s.formState.validating++, w()), Yt(!1), w(), je) {
      var Cn = function() {
        s.formState.validating--, w(), s.formState.validating === 0 && s.lastFormState.validating && Ee();
      };
      pt.then(function() {
        x > et || Yt(!0);
      }).then(Cn, Cn);
    }
  }, K = function(A) {
    if (!d) {
      var w = s.fields, H = s.fieldSubscribers, $ = s.formState, _ = ke({}, w), re = function(fe) {
        var ge = _[fe], ve = Lf($, ge), Te = ge.lastFieldState;
        ge.lastFieldState = ve;
        var J = H[fe];
        J && zf(J, ve, Te, t1, Te === void 0);
      };
      A ? re(A) : Object.keys(_).forEach(re);
    }
  }, Fe = function() {
    Object.keys(s.fields).forEach(function(A) {
      s.fields[A].touched = !0;
    });
  }, oe = function() {
    return !!(s.formState.error || Oi(s.formState.errors));
  }, ce = function() {
    var A = s.fields, w = s.formState, H = s.lastFormState, $ = ke({}, A), _ = Object.keys($), re = !1, Y = _.reduce(function(je, et) {
      var pt = !$[et].isEqual(sn(w.values, et), sn(w.initialValues || {}, et));
      return pt && (re = !0, je[et] = !0), je;
    }, {}), fe = _.reduce(function(je, et) {
      var pt = w.lastSubmittedValues || {};
      return $[et].isEqual(sn(w.values, et), sn(pt, et)) || (je[et] = !0), je;
    }, {});
    w.pristine = !re, w.dirtySinceLastSubmit = !!(w.lastSubmittedValues && Object.values(fe).some(function(je) {
      return je;
    })), w.modifiedSinceLastSubmit = !!(w.lastSubmittedValues && // Object.values would treat values as mixed (facebook/flow#2221)
    Object.keys($).some(function(je) {
      return $[je].modifiedSinceLastSubmit;
    })), w.valid = !w.error && !w.submitError && !Oi(w.errors) && !(w.submitErrors && Oi(w.submitErrors));
    var ge = o1(w), ve = _.reduce(function(je, et) {
      return je.modified[et] = $[et].modified, je.touched[et] = $[et].touched, je.visited[et] = $[et].visited, je;
    }, {
      modified: {},
      touched: {},
      visited: {}
    }), Te = ve.modified, J = ve.touched, ft = ve.visited;
    return ge.dirtyFields = H && hr(H.dirtyFields, Y) ? H.dirtyFields : Y, ge.dirtyFieldsSinceLastSubmit = H && hr(H.dirtyFieldsSinceLastSubmit, fe) ? H.dirtyFieldsSinceLastSubmit : fe, ge.modified = H && hr(H.modified, Te) ? H.modified : Te, ge.touched = H && hr(H.touched, J) ? H.touched : J, ge.visited = H && hr(H.visited, ft) ? H.visited : ft, H && hr(H, ge) ? H : ge;
  }, ye = function() {
    return t && !0 && t(ce(), Object.keys(s.fields).reduce(function(A, w) {
      return A[w] = s.fields[w], A;
    }, {}));
  }, Q = !1, ue = !1, Ee = function Z() {
    if (Q)
      ue = !0;
    else {
      if (Q = !0, ye(), !d && !(c && h)) {
        var A = s.lastFormState, w = ce();
        w !== A && (s.lastFormState = w, zf(s.subscribers, w, A, Df));
      }
      Q = !1, ue && (ue = !1, Z());
    }
  }, We = function() {
    return Object.keys(s.fields).some(function(A) {
      return s.fields[A].beforeSubmit && s.fields[A].beforeSubmit() === !1;
    });
  }, $e = function() {
    return Object.keys(s.fields).forEach(function(A) {
      return s.fields[A].afterSubmit && s.fields[A].afterSubmit();
    });
  }, ht = function() {
    return Object.keys(s.fields).forEach(function(A) {
      return s.fields[A].modifiedSinceLastSubmit = !1;
    });
  };
  U(void 0, function() {
    Ee();
  });
  var G = {
    batch: function(A) {
      d++, A(), d--, K(), Ee();
    },
    blur: function(A) {
      var w = s.fields, H = s.formState, $ = w[A];
      $ && (delete H.active, w[A] = ke({}, $, {
        active: !1,
        touched: !0
      }), u ? U(A, function() {
        K(), Ee();
      }) : (K(), Ee()));
    },
    change: function(A, w) {
      var H = s.fields, $ = s.formState;
      if (sn($.values, A) !== w) {
        I(s, A, function() {
          return w;
        });
        var _ = H[A];
        _ && (H[A] = ke({}, _, {
          modified: !0,
          modifiedSinceLastSubmit: !!$.lastSubmittedValues
        })), u ? (K(), Ee()) : U(A, function() {
          K(), Ee();
        });
      }
    },
    get destroyOnUnregister() {
      return !!n;
    },
    set destroyOnUnregister(Z) {
      n = Z;
    },
    focus: function(A) {
      var w = s.fields[A];
      w && !w.active && (s.formState.active = A, w.active = !0, w.visited = !0, K(), Ee());
    },
    mutators: D,
    getFieldState: function(A) {
      var w = s.fields[A];
      return w && w.lastFieldState;
    },
    getRegisteredFields: function() {
      return Object.keys(s.fields);
    },
    getState: function() {
      return ce();
    },
    initialize: function(A) {
      var w = s.fields, H = s.formState, $ = ke({}, w), _ = typeof A == "function" ? A(H.values) : A;
      r || (H.values = _);
      var re = r ? Object.keys($).reduce(function(Y, fe) {
        var ge = $[fe], ve = ge.isEqual(sn(H.values, fe), sn(H.initialValues || {}, fe));
        return ve || (Y[fe] = sn(H.values, fe)), Y;
      }, {}) : {};
      H.initialValues = _, H.values = _, Object.keys(re).forEach(function(Y) {
        H.values = nr(H.values, Y, re[Y]) || {};
      }), U(void 0, function() {
        K(), Ee();
      });
    },
    isValidationPaused: function() {
      return c;
    },
    pauseValidation: function(A) {
      A === void 0 && (A = !0), c = !0, h = A;
    },
    registerField: function(A, w, H, $) {
      H === void 0 && (H = {}), s.fieldSubscribers[A] || (s.fieldSubscribers[A] = {
        index: 0,
        entries: {}
      });
      var _ = s.fieldSubscribers[A].index++;
      s.fieldSubscribers[A].entries[_] = {
        subscriber: jf(w),
        subscription: H,
        notified: !1
      };
      var re = s.fields[A] || {
        active: !1,
        afterSubmit: $ && $.afterSubmit,
        beforeSubmit: $ && $.beforeSubmit,
        data: $ && $.data || {},
        isEqual: $ && $.isEqual || i1,
        lastFieldState: void 0,
        modified: !1,
        modifiedSinceLastSubmit: !1,
        name: A,
        touched: !1,
        valid: !0,
        validateFields: $ && $.validateFields,
        validators: {},
        validating: !1,
        visited: !1
      };
      re.blur = re.blur || function() {
        return G.blur(A);
      }, re.change = re.change || function(Te) {
        return G.change(A, Te);
      }, re.focus = re.focus || function() {
        return G.focus(A);
      }, s.fields[A] = re;
      var Y = !1, fe = $ && $.silent, ge = function() {
        fe && s.fields[A] ? K(A) : (Ee(), K());
      };
      if ($) {
        Y = !!($.getValidator && $.getValidator()), $.getValidator && (s.fields[A].validators[_] = $.getValidator);
        var ve = sn(s.formState.values, A) === void 0;
        $.initialValue !== void 0 && (ve || sn(s.formState.values, A) === sn(s.formState.initialValues, A)) && (s.formState.initialValues = nr(s.formState.initialValues || {}, A, $.initialValue), s.formState.values = nr(s.formState.values, A, $.initialValue), U(void 0, ge)), $.defaultValue !== void 0 && $.initialValue === void 0 && sn(s.formState.initialValues, A) === void 0 && ve && (s.formState.values = nr(s.formState.values, A, $.defaultValue));
      }
      return Y ? U(void 0, ge) : ge(), function() {
        var Te = !1;
        s.fields[A] && (Te = !!(s.fields[A].validators[_] && s.fields[A].validators[_]()), delete s.fields[A].validators[_]);
        var J = !!s.fieldSubscribers[A];
        J && delete s.fieldSubscribers[A].entries[_];
        var ft = J && !Object.keys(s.fieldSubscribers[A].entries).length;
        ft && (delete s.fieldSubscribers[A], delete s.fields[A], Te && (s.formState.errors = nr(s.formState.errors, A, void 0) || {}), n && (s.formState.values = nr(s.formState.values, A, void 0, !0) || {})), fe || (Te ? U(void 0, function() {
          Ee(), K();
        }) : ft && Ee());
      };
    },
    reset: function(A) {
      A === void 0 && (A = s.formState.initialValues), s.formState.submitting && (s.formState.resetWhileSubmitting = !0), s.formState.submitFailed = !1, s.formState.submitSucceeded = !1, delete s.formState.submitError, delete s.formState.submitErrors, delete s.formState.lastSubmittedValues, G.initialize(A || {});
    },
    /**
     * Resets all field flags (e.g. touched, visited, etc.) to their initial state
     */
    resetFieldState: function(A) {
      s.fields[A] = ke({}, s.fields[A], {
        active: !1,
        lastFieldState: void 0,
        modified: !1,
        touched: !1,
        valid: !0,
        validating: !1,
        visited: !1
      }), U(void 0, function() {
        K(), Ee();
      });
    },
    /**
     * Returns the form to a clean slate; that is:
     * - Clear all values
     * - Resets all fields to their initial state
     */
    restart: function(A) {
      A === void 0 && (A = s.formState.initialValues), G.batch(function() {
        for (var w in s.fields)
          G.resetFieldState(w), s.fields[w] = ke({}, s.fields[w], {
            active: !1,
            lastFieldState: void 0,
            modified: !1,
            modifiedSinceLastSubmit: !1,
            touched: !1,
            valid: !0,
            validating: !1,
            visited: !1
          });
        G.reset(A);
      });
    },
    resumeValidation: function() {
      c = !1, h = !1, m && U(void 0, function() {
        K(), Ee();
      }), m = !1;
    },
    setConfig: function(A, w) {
      switch (A) {
        case "debug":
          t = w;
          break;
        case "destroyOnUnregister":
          n = w;
          break;
        case "initialValues":
          G.initialize(w);
          break;
        case "keepDirtyOnReinitialize":
          r = w;
          break;
        case "mutators":
          a = w, w ? (Object.keys(D).forEach(function(H) {
            H in w || delete D[H];
          }), Object.keys(w).forEach(function(H) {
            D[H] = T(H);
          })) : Object.keys(D).forEach(function(H) {
            delete D[H];
          });
          break;
        case "onSubmit":
          o = w;
          break;
        case "validate":
          l = w, U(void 0, function() {
            K(), Ee();
          });
          break;
        case "validateOnBlur":
          u = w;
          break;
        default:
          throw new Error("Unrecognised option " + A);
      }
    },
    submit: function() {
      var A = s.formState;
      if (!A.submitting) {
        if (delete A.submitErrors, delete A.submitError, A.lastSubmittedValues = ke({}, A.values), oe()) {
          Fe(), ht(), s.formState.submitFailed = !0, Ee(), K();
          return;
        }
        var w = Object.keys(v);
        if (w.length) {
          Promise.all(w.map(function(fe) {
            return v[Number(fe)];
          })).then(G.submit, console.error);
          return;
        }
        var H = We();
        if (!H) {
          var $, _ = !1, re = function(ge) {
            A.submitting = !1;
            var ve = A.resetWhileSubmitting;
            return ve && (A.resetWhileSubmitting = !1), ge && Oi(ge) ? (A.submitFailed = !0, A.submitSucceeded = !1, A.submitErrors = ge, A.submitError = ge[Vf], Fe()) : (ve || (A.submitFailed = !1, A.submitSucceeded = !0), $e()), Ee(), K(), _ = !0, $ && $(ge), ge;
          };
          A.submitting = !0, A.submitFailed = !1, A.submitSucceeded = !1, A.lastSubmittedValues = ke({}, A.values), ht();
          var Y = o(A.values, G, re);
          if (!_) {
            if (Y && tu(Y))
              return Ee(), K(), Y.then(re, function(fe) {
                throw re(), fe;
              });
            if (o.length >= 3)
              return Ee(), K(), new Promise(function(fe) {
                $ = fe;
              });
            re(Y);
          }
        }
      }
    },
    subscribe: function(A, w) {
      if (!A)
        throw new Error("No callback given.");
      if (!w)
        throw new Error("No subscription provided. What values do you want to listen to?");
      var H = jf(A), $ = s.subscribers, _ = $.index++;
      $.entries[_] = {
        subscriber: H,
        subscription: w,
        notified: !1
      };
      var re = ce();
      return Zh(H, w, re, re, Df, !0), function() {
        delete $.entries[_];
      };
    }
  };
  return G;
}
var Jh = {}, s1 = ["render", "children", "component"];
function Uh(e, t, n) {
  var r = e.render, i = e.children, a = e.component, o = Lo(e, s1);
  if (a)
    return /* @__PURE__ */ he.createElement(a, Object.assign(t, o, {
      children: i,
      render: r
    }));
  if (r)
    return r(i === void 0 ? Object.assign(t, o) : (
      // inject children back in
      Object.assign(t, o, {
        children: i
      })
    ));
  if (typeof i != "function")
    throw new Error("Must specify either a render prop, a render function as children, or a component prop to " + n);
  return i(Object.assign(t, o));
}
function Er(e, t, n) {
  n === void 0 && (n = function(a, o) {
    return a === o;
  });
  var r = cn.useRef(e);
  cn.useEffect(function() {
    n(e, r.current) || (t(), r.current = e);
  });
}
function l1(e) {
  var t = cn.useRef();
  return t.current || (t.current = e()), t.current;
}
var nu = function(t, n) {
  if (t === n)
    return !0;
  if (typeof t != "object" || !t || typeof n != "object" || !n)
    return !1;
  var r = Object.keys(t), i = Object.keys(n);
  if (r.length !== i.length)
    return !1;
  for (var a = Object.prototype.hasOwnProperty.bind(n), o = 0; o < r.length; o++) {
    var l = r[o];
    if (!a(l) || t[l] !== n[l])
      return !1;
  }
  return !0;
}, u1 = function(t) {
  return !!(t && typeof t.stopPropagation == "function");
}, qh = /* @__PURE__ */ he.createContext();
function Qh(e) {
  var t = cn.useRef(e);
  return cn.useEffect(function() {
    t.current = e;
  }), t;
}
var c1 = "6.5.8", Kh = function(t, n, r) {
  r.forEach(function(i) {
    Object.defineProperty(t, i, {
      get: function() {
        return n[i];
      },
      enumerable: !0
    });
  });
}, d1 = function(t, n) {
  return Kh(t, n, ["active", "dirty", "dirtyFields", "dirtySinceLastSubmit", "dirtyFieldsSinceLastSubmit", "error", "errors", "hasSubmitErrors", "hasValidationErrors", "initialValues", "invalid", "modified", "modifiedSinceLastSubmit", "pristine", "submitError", "submitErrors", "submitFailed", "submitSucceeded", "submitting", "touched", "valid", "validating", "values", "visited"]);
}, f1 = function(t, n) {
  return Kh(t, n, ["active", "data", "dirty", "dirtySinceLastSubmit", "error", "initial", "invalid", "length", "modified", "modifiedSinceLastSubmit", "pristine", "submitError", "submitFailed", "submitSucceeded", "submitting", "touched", "valid", "validating", "visited"]);
}, p1 = ["debug", "decorators", "destroyOnUnregister", "form", "initialValues", "initialValuesEqual", "keepDirtyOnReinitialize", "mutators", "onSubmit", "subscription", "validate", "validateOnBlur"], g1 = {
  "final-form": r1,
  "react-final-form": c1
}, h1 = Yh.reduce(function(e, t) {
  return e[t] = !0, e;
}, {});
function em(e) {
  var t = e.debug, n = e.decorators, r = n === void 0 ? [] : n, i = e.destroyOnUnregister, a = e.form, o = e.initialValues, l = e.initialValuesEqual, u = e.keepDirtyOnReinitialize, s = e.mutators, d = e.onSubmit, c = e.subscription, m = c === void 0 ? h1 : c, h = e.validate, x = e.validateOnBlur, v = Lo(e, p1), b = {
    debug: t,
    destroyOnUnregister: i,
    initialValues: o,
    keepDirtyOnReinitialize: u,
    mutators: s,
    onSubmit: d,
    validate: h,
    validateOnBlur: x
  }, I = l1(function() {
    var U = a || a1(b);
    return U.pauseValidation(), U;
  }), O = he.useState(function() {
    var U = {};
    return I.subscribe(function(K) {
      U = K;
    }, m)(), U;
  }), T = O[0], D = O[1], E = Qh(T);
  he.useEffect(function() {
    I.isValidationPaused() && I.resumeValidation();
    var U = [I.subscribe(function(K) {
      nu(K, E.current) || D(K);
    }, m)].concat(r ? r.map(function(K) {
      return (
        // this noop ternary is to appease the flow gods
        // istanbul ignore next
        K(I)
      );
    }) : []);
    return function() {
      I.pauseValidation(), U.reverse().forEach(function(K) {
        return K();
      });
    };
  }, r), Jh.NODE_ENV !== "production" && Er(r, function() {
    console.error("Form decorators should not change from one render to the next as new values will be ignored");
  }, nu), Er(t, function() {
    I.setConfig("debug", t);
  }), Er(i, function() {
    I.destroyOnUnregister = !!i;
  }), Er(u, function() {
    I.setConfig("keepDirtyOnReinitialize", u);
  }), Er(o, function() {
    I.setConfig("initialValues", o);
  }, l || nu), Er(s, function() {
    I.setConfig("mutators", s);
  }), Er(d, function() {
    I.setConfig("onSubmit", d);
  }), Er(h, function() {
    I.setConfig("validate", h);
  }), Er(x, function() {
    I.setConfig("validateOnBlur", x);
  });
  var B = function(K) {
    return K && (typeof K.preventDefault == "function" && K.preventDefault(), typeof K.stopPropagation == "function" && K.stopPropagation()), I.submit();
  }, X = {
    form: ke({}, I, {
      reset: function(K) {
        u1(K) ? I.reset() : I.reset(K);
      }
    }),
    handleSubmit: B
  };
  return d1(X, T), /* @__PURE__ */ he.createElement(qh.Provider, {
    value: I
  }, Uh(ke({}, v, {
    __versions: g1
  }), X, "ReactFinalForm"));
}
function m1(e) {
  var t = he.useContext(qh);
  if (!t)
    throw new Error(e + " must be used inside of a <Form> component");
  return t;
}
var v1 = typeof window < "u" && window.navigator && window.navigator.product && window.navigator.product === "ReactNative", b1 = function(t) {
  var n = [];
  if (t)
    for (var r = 0; r < t.length; r++) {
      var i = t[r];
      i.selected && n.push(i.value);
    }
  return n;
}, y1 = function(t, n, r, i) {
  if (!i && t.nativeEvent && t.nativeEvent.text !== void 0 || i && t.nativeEvent)
    return t.nativeEvent.text;
  var a = t, o = a.target, l = o.type, u = o.value, s = o.checked;
  switch (l) {
    case "checkbox":
      if (r !== void 0) {
        if (s)
          return Array.isArray(n) ? n.concat(r) : [r];
        if (!Array.isArray(n))
          return n;
        var d = n.indexOf(r);
        return d < 0 ? n : n.slice(0, d).concat(n.slice(d + 1));
      } else
        return !!s;
    case "select-multiple":
      return b1(t.target.options);
    default:
      return u;
  }
};
function ru(e) {
  var t = he.useRef(e);
  return he.useEffect(function() {
    t.current = e;
  }), he.useCallback(function() {
    for (var n = arguments.length, r = new Array(n), i = 0; i < n; i++)
      r[i] = arguments[i];
    return t.current.apply(null, r);
  }, []);
}
var w1 = $h.reduce(function(e, t) {
  return e[t] = !0, e;
}, {}), iu = function(t, n) {
  return t === void 0 ? "" : t;
}, x1 = function(t, n) {
  return t === "" ? void 0 : t;
}, C1 = function(t, n) {
  return t === n;
};
function S1(e, t) {
  t === void 0 && (t = {});
  var n = t, r = n.afterSubmit, i = n.allowNull, a = n.component, o = n.data, l = n.defaultValue, u = n.format, s = u === void 0 ? iu : u, d = n.formatOnBlur, c = n.initialValue, m = n.multiple, h = n.parse, x = h === void 0 ? x1 : h, v = n.subscription, b = v === void 0 ? w1 : v, I = n.type, O = n.validateFields, T = n.value, D = m1("useField"), E = Qh(t), B = function(ue, Ee) {
    return (
      // avoid using `state` const in any closures created inside `register`
      // because they would refer `state` from current execution context
      // whereas actual `state` would defined in the subsequent `useField` hook
      // execution
      // (that would be caused by `setState` call performed in `register` callback)
      D.registerField(e, ue, b, {
        afterSubmit: r,
        beforeSubmit: function() {
          var $e = E.current, ht = $e.beforeSubmit, G = $e.formatOnBlur, Z = $e.format, A = Z === void 0 ? iu : Z;
          if (G) {
            var w = D.getFieldState(e), H = w.value, $ = A(H, e);
            $ !== H && D.change(e, $);
          }
          return ht && ht();
        },
        data: o,
        defaultValue: l,
        getValidator: function() {
          return E.current.validate;
        },
        initialValue: c,
        isEqual: function($e, ht) {
          return (E.current.isEqual || C1)($e, ht);
        },
        silent: Ee,
        validateFields: O
      })
    );
  }, X = he.useRef(!0), U = he.useState(function() {
    var Q = {}, ue = D.destroyOnUnregister;
    return D.destroyOnUnregister = !1, B(function(Ee) {
      Q = Ee;
    }, !0)(), D.destroyOnUnregister = ue, Q;
  }), K = U[0], Fe = U[1];
  he.useEffect(
    function() {
      return B(function(Q) {
        X.current ? X.current = !1 : Fe(Q);
      }, !1);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [
      e,
      o,
      l,
      // If we want to allow inline fat-arrow field-level validation functions, we
      // cannot reregister field every time validate function !==.
      // validate,
      c
      // The validateFields array is often passed as validateFields={[]}, creating
      // a !== new array every time. If it needs to be changed, a rerender/reregister
      // can be forced by changing the key prop
      // validateFields
    ]
  );
  var oe = {};
  f1(oe, K);
  var ce = {
    name: e,
    get value() {
      var Q = K.value;
      return d ? a === "input" && (Q = iu(Q)) : Q = s(Q, e), Q === null && !i && (Q = ""), I === "checkbox" || I === "radio" ? T : a === "select" && m ? Q || [] : Q;
    },
    get checked() {
      var Q = K.value;
      if (I === "checkbox")
        return Q = s(Q, e), T === void 0 ? !!Q : !!(Array.isArray(Q) && ~Q.indexOf(T));
      if (I === "radio")
        return s(Q, e) === T;
    },
    onBlur: ru(function(Q) {
      if (K.blur(), d) {
        var ue = D.getFieldState(K.name);
        K.change(s(ue.value, K.name));
      }
    }),
    onChange: ru(function(Q) {
      if (Jh.NODE_ENV !== "production" && Q && Q.target) {
        var ue = Q.target.type, Ee = ~["checkbox", "radio", "select-multiple"].indexOf(ue) && !I && a !== "select", We = ue === "select-multiple" ? K.value : T;
        Ee && console.error('You must pass `type="' + (ue === "select-multiple" ? "select" : ue) + '"` prop to your Field(' + e + `) component.
` + ("Without it we don't know how to unpack your `value` prop - " + (Array.isArray(We) ? "[" + We + "]" : '"' + We + '"') + "."));
      }
      var $e = Q && Q.target ? y1(Q, K.value, T, v1) : Q;
      K.change(x($e, e));
    }),
    onFocus: ru(function(Q) {
      return K.focus();
    })
  };
  m && (ce.multiple = m), I !== void 0 && (ce.type = I);
  var ye = {
    input: ce,
    meta: oe
  };
  return ye;
}
var I1 = ["afterSubmit", "allowNull", "beforeSubmit", "children", "component", "data", "defaultValue", "format", "formatOnBlur", "initialValue", "isEqual", "multiple", "name", "parse", "subscription", "type", "validate", "validateFields", "value"], Hu = /* @__PURE__ */ he.forwardRef(function(t, n) {
  var r = t.afterSubmit, i = t.allowNull, a = t.beforeSubmit, o = t.children, l = t.component, u = t.data, s = t.defaultValue, d = t.format, c = t.formatOnBlur, m = t.initialValue, h = t.isEqual, x = t.multiple, v = t.name, b = t.parse, I = t.subscription, O = t.type, T = t.validate, D = t.validateFields, E = t.value, B = Lo(t, I1), X = S1(v, {
    afterSubmit: r,
    allowNull: i,
    beforeSubmit: a,
    children: o,
    component: l,
    data: u,
    defaultValue: s,
    format: d,
    formatOnBlur: c,
    initialValue: m,
    isEqual: h,
    multiple: x,
    parse: b,
    subscription: I,
    type: O,
    validate: T,
    validateFields: D,
    value: E
  });
  if (typeof o == "function")
    return o(ke({}, X, B));
  if (typeof l == "string")
    return /* @__PURE__ */ he.createElement(l, ke({}, X.input, {
      children: o,
      ref: n
    }, B));
  if (!v)
    throw new Error("prop name cannot be undefined in <Field> component");
  return Uh(ke({
    children: o,
    component: l,
    ref: n
  }, B), X, "Field(" + v + ")");
});
const Ps = (e) => {
  switch (!0) {
    case (e == null ? void 0 : e.includes("secondary")):
      return is;
    case (e == null ? void 0 : e.includes("primary")):
      return xr;
    case (e == null ? void 0 : e.includes("success")):
      return xr;
    case (e == null ? void 0 : e.includes("warning")):
      return $g;
    case (e == null ? void 0 : e.includes("danger")):
      return Sc;
    default:
      return is;
  }
}, Hf = (e) => !e || e != null && e.includes("outline") ? null : Ps(e), Wf = (e) => {
  if (e != null && e.includes("outline"))
    return Ps(e);
  switch (!0) {
    case (e == null ? void 0 : e.includes("secondary")):
      return null;
    case (e == null ? void 0 : e.includes("primary")):
      return Hd;
    case (e == null ? void 0 : e.includes("success")):
      return Hd;
    case (e == null ? void 0 : e.includes("warning")):
      return D0;
    case (e == null ? void 0 : e.includes("danger")):
      return j0;
    default:
      return null;
  }
}, ou = (e) => !e || e != null && e.includes("secondary") ? Xg : Ic, au = (e) => e != null && e.includes("outline") ? e != null && e.includes("secondary") ? Li : Ps(e) : e != null && e.includes("secondary") ? Xg : Ic, R1 = (e) => {
  switch (e) {
    case "sm":
      return "5px 25px";
    case "lg":
      return "12px 25px";
    default:
      return "10px 25px";
  }
}, E1 = (e, t) => {
  switch (!0) {
    case e:
      return "30px";
    case t:
      return "0";
    default:
      return "0";
  }
};
dt(ig)`
  border-radius: ${(e) => E1(e.rounded, e.squared)};
  padding: ${(e) => R1(e.size)};
  transition: all 0.4s;
  font-size: 14px;
  margin-bottom: 20px;
  position: relative;
  overflow: hidden;
  z-index: 0;
  ${lr}: 15px;
  background-color: ${(e) => Hf(e.variant) || "transparent"};
  border: 1px solid;
  border-color: ${(e) => Ps(e.variant)};
  color: ${(e) => au(e.variant)};
  display: inline-flex;
  align-items: center;
  justify-content: center;
  text-align: center;

  &:last-child {
    margin-right: 0;
    ${lr}: 0;
  }

  &:before {
    position: absolute;
    height: 0;
    width: 0;
    border-radius: 50%;
    background-color: ${xr};
    transition: width 0.3s ease-in-out, height 0.3s ease-in-out;
    z-index: -1;
    content: '';
    top: 0;
    transform: ${cw};
    ${os}: 0;
    background-color: ${(e) => Wf(e.variant) || Fr(0.1, is)};
  }

  span {
    transition: all 0.3s;
    font-weight: 500;
    color: ${(e) => au(e.variant)};
  }

  svg {
    height: 14px;
    width: 14px;
    transition: all 0.3s;
    fill: ${(e) => au(e.variant)};

    &:not(:last-child) {
      ${lr}: 5px;
    }

    &:not(:first-child) {
      ${Ar}: 5px;
    }
  }

  &:hover,
  &:focus,
  &:active,
  &:active:focus {
    outline: none;
    box-shadow: none !important;
    color: ${(e) => ou(e.variant)};
    border-color: ${(e) => Wf(e.variant) || Fr(0.1, is)};
    background-color: ${(e) => Hf(e.variant) || "transparent"};

    &:before {
      height: 500%;
      width: 225%;
    }

    span {
      color: ${(e) => ou(e.variant)};
    }

    svg {
      fill: ${(e) => ou(e.variant)};
    }
  }

  &:focus,
  &:active,
  &:active:focus {
    &:before {
      transition: all 0s;
    }
  }

  &:disabled {
    background-color: ${rs};
    border-color: ${rs};
    color: ${Gl};
    pointer-events: none;

    span {
      color: ${Gl};
    }

    svg {
      fill: ${Gl};
    }
  }
`;
const A1 = dt(ag)`
  margin-top: 15px;
  margin-bottom: 10px;

  & > * {
    ${lr}: 15px;

    @media screen and (max-width: 767px) {
      ${lr}: 0 !important;
      margin-bottom: 20px;
    }

    &:last-child {
      margin-right: 0;
    }
  }

  &:first-child {
    margin-top: 0;
  }

  &:last-child {
    margin-bottom: -10px;
  }

  ${(e) => e.centered && `
    & > * {
      &,
      &:last-child,
      &:first-child {
        margin-right: auto;
        margin-left: auto;
      }
    }
  `}
`;
dt(og)`
  border-radius: 5px;
  margin-bottom: -10px;

  .btn {
    padding: 10px 15px;
    font-weight: 500;
    ${lr}: 0;
  }

  ${(e) => e.justified && `
    display: flex;
    justify-content: space-between;
    width: 100%;

    .btn {
      width: 100%;
    }
  `}

  ${(e) => e.icons && `
    .btn {
      padding: 7px 8px;
      line-height: 14px;
    }
  `}

  &.open .dropdown-toggle {
    box-shadow: none;
  }
`;
const Ro = dt.div`
  width: 100%;
  position: relative;
`, Eo = dt.div`
  width: 100%;
  display: flex;
  margin: auto;
  direction: ${Ec};
`, $f = dt.span`
  margin-bottom: 4px;
  display: inline-block;
  font-weight: 700;
  line-height: 24px;
  color: ${zd};

  // span {
  //   color: ${zd};
  // }
`, Ha = dt(A1)`
  margin-top: 10px;
  direction: ${Ec};
`, Xf = dt.span`
  font-size: 10px;
  color: ${Mn};
  line-height: 13px;
  margin-top: 2px;
`;
dt.div`
  padding: 6px;
  height: 32px;
  background: ${Di};
  border: 1px solid ${Di};
  display: flex;
  align-items: center;
  justify-content: center;

  svg {
    fill: ${Mn};
    width: 18px;
    height: 18px;
    transition: all 0.3s;
  }
`;
const tm = dt.form`
  display: flex;
  flex-wrap: wrap;
  text-align: ${os};
  direction: ${Ec};

  input,
  textarea {
    width: 100%;
    padding: 5px 10px;
    font-size: 12px;
    height: 32px;
    transition: border 0.3s;
    background: #ffffff;
    border: 1px solid ${_0};
    border-radius: 10px;
    color: ${Li};

    &::-webkit-input-placeholder {
      color: ${Mn};
    }
    &::-moz-placeholder {
      color: ${Mn};
    }
    /* Firefox 19+ */
    &:-moz-placeholder {
      color: ${Mn};
    }
    /* Firefox 18- */
    &:-ms-input-placeholder {
      color: ${Mn};
    }

    &[disabled] {
      background: ${rs};

      &:focus,
      &:active {
        border-color: ${ja};
      }
    }

    &:focus,
    &:active {
      outline: none;
      border-color: ${Fi};
    }
  }

  textarea {
    min-height: 85px;
    border-top-left-radius: 0px !important;
    border-top-right-radius: 0px !important;
    border-bottom-left-radius: 8px !important;
    border-bottom-right-radius: 8px !important;
  }

  ${(e) => e.horizontal && `

    ${Ro} {
      display: flex;
      flex-wrap: wrap;
    }

    ${Eo} {
      width: calc(100% - 80px);
      ${Jd(e)}: 10px;
      ${Ar(e)}: 80px;
    }

    ${$f} {
      width: 80px;
      max-height: 32px;
      line-height: 18px;
      margin: auto 0;

      & + ${Eo} {
        ${Ar(e)}: 0;
      }
    }

    ${Xf} {
      ${Ar(e)}: 90px;
    }

    ${Ha} {
      ${Ar(e)}: 0;
    }

    @media screen and (min-width: 480px) {

      ${$f} {
        width: 120px;
      }

      ${Eo} {
        width: calc(100% - 120px);
        ${Ar(e)}: 120px;
        ${Jd(e)}: 20px;
      }

      ${Xf}, ${Ha} {
        ${Ar(e)}: 140px;
      }
    }
  `}

  ${(e) => e.preview && `
    display: flex;

    & > div:nth-child(2) {
      ${lr(e)}: 50px;
    }

    ${Ro} {
      margin-bottom: 10px;
      width: auto;
      min-height: 18px;
    }

    p {
      margin-bottom: 10px;
    }
  `}

  ${(e) => e.justify && `
    display: flex;
    flex-wrap: wrap;

    ${Ro} {
      width: 33.3333%;
    }

    ${Ha} {
      width: 100%;
    }
  `}
`;
dt.div`
  width: calc(50% - 15px);
  height: 100%;

  &:first-child {
    ${lr}: 30px;
  }

  ${Ha} {
    float: right;
  }

  @media screen and (max-width: 1200px) {
    width: 100%;
    ${lr}: 0;
  }
`;
dt.button`
  padding: 6px;
  height: 32px;
  cursor: pointer;
  transition: all 0.3s;
  // background: ${(e) => e.active ? xr : Di};
  // border: 1px solid ${(e) => e.active ? xr : Di};
  display: flex;
  align-items: center;
  justify-content: center;

  svg {
    fill: ${(e) => e.active ? Ic : Mn};
    width: 18px;
    height: 18px;
    transition: all 0.3s;
  }
`;
const P1 = "data:image/svg+xml,%3csvg%20width='32'%20height='32'%20viewBox='0%200%2032%2032'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3crect%20width='32'%20height='32'%20rx='4'%20fill='%23509EE3'/%3e%3cpath%20d='M24%2016L8%208L12.5714%2016L8%2024L24%2016Z'%20fill='white'/%3e%3c/svg%3e", nm = ({ error: e, top: t }) => /* @__PURE__ */ W.jsx(T1, { top: t, children: e });
nm.propTypes = {
  error: _e.string,
  top: _e.bool
};
const T1 = dt.span`
  font-size: 10px;
  line-height: 13px;
  color: ${Sc};
  margin-bottom: -5px;
  display: block;
  // margin-top: 10px;

  ${(e) => e.top && `
    position: absolute;
    margin: 0;
    ${Ou(e)}: 0;
    top: 0;
    padding: 5px 10px;
    background: ${Wd};
    border-radius: 3px;

    &:after {
      content: '';
      position: absolute;
      ${Ou(e)}: 10px;
      bottom: -8px;
      border: 4px solid transparent;
      border-top: 4px solid ${Wd};
    }
  `}
`, jc = ({
  input: e = null,
  meta: { touched: t = !1, error: n = "" },
  component: r = "input",
  isAboveError: i = !1,
  wrapperClassName: a = "",
  icon: o,
  icondisabled: l,
  onSubmit: u,
  ...s
}) => /* @__PURE__ */ W.jsxs(O1, { className: a, children: [
  /* @__PURE__ */ W.jsx(r, { ...s, ...e }),
  t && n && /* @__PURE__ */ W.jsx(nm, { error: n, top: i }),
  o && /* @__PURE__ */ W.jsx(
    F1,
    {
      type: "button",
      onClick: l ? null : u,
      disabled: l,
      children: /* @__PURE__ */ W.jsx(B1, { disabled: l, src: P1, alt: "send" })
    }
  )
] });
jc.propTypes = {
  input: _e.shape({
    name: _e.string,
    value: _e.any,
    onChange: _e.func,
    onBlur: _e.func,
    onFocus: _e.func
  }),
  meta: _e.shape({
    touched: _e.bool,
    error: _e.string
  }),
  component: _e.elementType,
  isAboveError: _e.bool,
  wrapperClassName: _e.string,
  icon: _e.bool,
  icondisabled: _e.bool,
  onSubmit: _e.func
};
const k1 = (e) => (t) => /* @__PURE__ */ W.jsx(jc, { component: e, ...t }), O1 = dt.div`
  width: 100%;
  position: relative;
  border-radius: 4px;
`, F1 = dt.div`
  position: absolute;
  right: 0;
  top: 1px;
  padding: 8px;
  border-radius: 4px;
  cursor: ${(e) => e.disabled ? "default !important" : "pointer"};
  display: flex;
  align-items: center;
  justify-content: center;
`, B1 = dt.img`
  ${(e) => e.disabled ? `background-color: ${G0} !important` : `background-color: ${xr}`};
  width: 32px;
  height: 32px;
  border-radius: 4px;
  color: #ffffff;
  cursor: ${(e) => e.disabled ? "default" : "pointer"};
`, rm = ({ onSubmit: e }) => {
  const { loading: t } = {}, n = {
    height: "50px",
    boxShadow: "0px 20px 26px 0px #3635351A"
  };
  return /* @__PURE__ */ W.jsx(
    em,
    {
      onSubmit: e,
      render: ({ handleSubmit: r, pristine: i }) => /* @__PURE__ */ W.jsx(tm, { onSubmit: r, children: /* @__PURE__ */ W.jsx(Ro, { children: /* @__PURE__ */ W.jsx(Eo, { children: /* @__PURE__ */ W.jsx(
        Hu,
        {
          name: "message",
          type: "text",
          component: jc,
          placeholder: "Ask your question...",
          style: n,
          icon: !0,
          icondisabled: i || t,
          onSubmit: r,
          className: "custom-input"
        }
      ) }) }) })
    }
  );
};
rm.propTypes = {
  onSubmit: _e.any
};
function pi(e) {
  "@babel/helpers - typeof";
  return pi = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(t) {
    return typeof t;
  } : function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
  }, pi(e);
}
function N1(e, t) {
  if (pi(e) != "object" || !e) return e;
  var n = e[Symbol.toPrimitive];
  if (n !== void 0) {
    var r = n.call(e, t);
    if (pi(r) != "object") return r;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
function im(e) {
  var t = N1(e, "string");
  return pi(t) == "symbol" ? t : t + "";
}
function bo(e, t, n) {
  return (t = im(t)) in e ? Object.defineProperty(e, t, {
    value: n,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : e[t] = n, e;
}
function Yf(e, t) {
  var n = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var r = Object.getOwnPropertySymbols(e);
    t && (r = r.filter(function(i) {
      return Object.getOwnPropertyDescriptor(e, i).enumerable;
    })), n.push.apply(n, r);
  }
  return n;
}
function st(e) {
  for (var t = 1; t < arguments.length; t++) {
    var n = arguments[t] != null ? arguments[t] : {};
    t % 2 ? Yf(Object(n), !0).forEach(function(r) {
      bo(e, r, n[r]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : Yf(Object(n)).forEach(function(r) {
      Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(n, r));
    });
  }
  return e;
}
function G1(e) {
  if (Array.isArray(e)) return e;
}
function _1(e, t) {
  var n = e == null ? null : typeof Symbol < "u" && e[Symbol.iterator] || e["@@iterator"];
  if (n != null) {
    var r, i, a, o, l = [], u = !0, s = !1;
    try {
      if (a = (n = n.call(e)).next, t === 0) {
        if (Object(n) !== n) return;
        u = !1;
      } else for (; !(u = (r = a.call(n)).done) && (l.push(r.value), l.length !== t); u = !0) ;
    } catch (d) {
      s = !0, i = d;
    } finally {
      try {
        if (!u && n.return != null && (o = n.return(), Object(o) !== o)) return;
      } finally {
        if (s) throw i;
      }
    }
    return l;
  }
}
function Wu(e, t) {
  (t == null || t > e.length) && (t = e.length);
  for (var n = 0, r = Array(t); n < t; n++) r[n] = e[n];
  return r;
}
function om(e, t) {
  if (e) {
    if (typeof e == "string") return Wu(e, t);
    var n = {}.toString.call(e).slice(8, -1);
    return n === "Object" && e.constructor && (n = e.constructor.name), n === "Map" || n === "Set" ? Array.from(e) : n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n) ? Wu(e, t) : void 0;
  }
}
function M1() {
  throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
function kr(e, t) {
  return G1(e) || _1(e, t) || om(e, t) || M1();
}
function Gr(e, t) {
  if (e == null) return {};
  var n, r, i = Lo(e, t);
  if (Object.getOwnPropertySymbols) {
    var a = Object.getOwnPropertySymbols(e);
    for (r = 0; r < a.length; r++) n = a[r], t.indexOf(n) === -1 && {}.propertyIsEnumerable.call(e, n) && (i[n] = e[n]);
  }
  return i;
}
var V1 = ["defaultInputValue", "defaultMenuIsOpen", "defaultValue", "inputValue", "menuIsOpen", "onChange", "onInputChange", "onMenuClose", "onMenuOpen", "value"];
function L1(e) {
  var t = e.defaultInputValue, n = t === void 0 ? "" : t, r = e.defaultMenuIsOpen, i = r === void 0 ? !1 : r, a = e.defaultValue, o = a === void 0 ? null : a, l = e.inputValue, u = e.menuIsOpen, s = e.onChange, d = e.onInputChange, c = e.onMenuClose, m = e.onMenuOpen, h = e.value, x = Gr(e, V1), v = Yn(l !== void 0 ? l : n), b = kr(v, 2), I = b[0], O = b[1], T = Yn(u !== void 0 ? u : i), D = kr(T, 2), E = D[0], B = D[1], X = Yn(h !== void 0 ? h : o), U = kr(X, 2), K = U[0], Fe = U[1], oe = kn(function($e, ht) {
    typeof s == "function" && s($e, ht), Fe($e);
  }, [s]), ce = kn(function($e, ht) {
    var G;
    typeof d == "function" && (G = d($e, ht)), O(G !== void 0 ? G : $e);
  }, [d]), ye = kn(function() {
    typeof m == "function" && m(), B(!0);
  }, [m]), Q = kn(function() {
    typeof c == "function" && c(), B(!1);
  }, [c]), ue = l !== void 0 ? l : I, Ee = u !== void 0 ? u : E, We = h !== void 0 ? h : K;
  return st(st({}, x), {}, {
    inputValue: ue,
    menuIsOpen: Ee,
    onChange: oe,
    onInputChange: ce,
    onMenuClose: Q,
    onMenuOpen: ye,
    value: We
  });
}
function D1(e, t) {
  if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
}
function Zf(e, t) {
  for (var n = 0; n < t.length; n++) {
    var r = t[n];
    r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, im(r.key), r);
  }
}
function j1(e, t, n) {
  return t && Zf(e.prototype, t), n && Zf(e, n), Object.defineProperty(e, "prototype", {
    writable: !1
  }), e;
}
function z1(e, t) {
  if (typeof t != "function" && t !== null) throw new TypeError("Super expression must either be null or a function");
  e.prototype = Object.create(t && t.prototype, {
    constructor: {
      value: e,
      writable: !0,
      configurable: !0
    }
  }), Object.defineProperty(e, "prototype", {
    writable: !1
  }), t && _i(e, t);
}
function H1(e, t) {
  if (t && (pi(t) == "object" || typeof t == "function")) return t;
  if (t !== void 0) throw new TypeError("Derived constructors may only return object or undefined");
  return Lg(e);
}
function W1(e) {
  var t = Cc();
  return function() {
    var n, r = To(e);
    if (t) {
      var i = To(this).constructor;
      n = Reflect.construct(r, arguments, i);
    } else n = r.apply(this, arguments);
    return H1(this, n);
  };
}
function $1(e) {
  if (Array.isArray(e)) return Wu(e);
}
function X1(e) {
  if (typeof Symbol < "u" && e[Symbol.iterator] != null || e["@@iterator"] != null) return Array.from(e);
}
function Y1() {
  throw new TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
function zc(e) {
  return $1(e) || X1(e) || om(e) || Y1();
}
function Z1(e) {
  if (e.sheet)
    return e.sheet;
  for (var t = 0; t < document.styleSheets.length; t++)
    if (document.styleSheets[t].ownerNode === e)
      return document.styleSheets[t];
}
function J1(e) {
  var t = document.createElement("style");
  return t.setAttribute("data-emotion", e.key), e.nonce !== void 0 && t.setAttribute("nonce", e.nonce), t.appendChild(document.createTextNode("")), t.setAttribute("data-s", ""), t;
}
var U1 = /* @__PURE__ */ function() {
  function e(n) {
    var r = this;
    this._insertTag = function(i) {
      var a;
      r.tags.length === 0 ? r.insertionPoint ? a = r.insertionPoint.nextSibling : r.prepend ? a = r.container.firstChild : a = r.before : a = r.tags[r.tags.length - 1].nextSibling, r.container.insertBefore(i, a), r.tags.push(i);
    }, this.isSpeedy = n.speedy === void 0 ? !0 : n.speedy, this.tags = [], this.ctr = 0, this.nonce = n.nonce, this.key = n.key, this.container = n.container, this.prepend = n.prepend, this.insertionPoint = n.insertionPoint, this.before = null;
  }
  var t = e.prototype;
  return t.hydrate = function(r) {
    r.forEach(this._insertTag);
  }, t.insert = function(r) {
    this.ctr % (this.isSpeedy ? 65e3 : 1) === 0 && this._insertTag(J1(this));
    var i = this.tags[this.tags.length - 1];
    if (this.isSpeedy) {
      var a = Z1(i);
      try {
        a.insertRule(r, a.cssRules.length);
      } catch {
      }
    } else
      i.appendChild(document.createTextNode(r));
    this.ctr++;
  }, t.flush = function() {
    this.tags.forEach(function(r) {
      var i;
      return (i = r.parentNode) == null ? void 0 : i.removeChild(r);
    }), this.tags = [], this.ctr = 0;
  }, e;
}(), Tn = "-ms-", ls = "-moz-", Lt = "-webkit-", am = "comm", Hc = "rule", Wc = "decl", q1 = "@import", sm = "@keyframes", Q1 = "@layer", K1 = Math.abs, Ts = String.fromCharCode, eR = Object.assign;
function tR(e, t) {
  return An(e, 0) ^ 45 ? (((t << 2 ^ An(e, 0)) << 2 ^ An(e, 1)) << 2 ^ An(e, 2)) << 2 ^ An(e, 3) : 0;
}
function lm(e) {
  return e.trim();
}
function nR(e, t) {
  return (e = t.exec(e)) ? e[0] : e;
}
function Dt(e, t, n) {
  return e.replace(t, n);
}
function $u(e, t) {
  return e.indexOf(t);
}
function An(e, t) {
  return e.charCodeAt(t) | 0;
}
function Fo(e, t, n) {
  return e.slice(t, n);
}
function mr(e) {
  return e.length;
}
function $c(e) {
  return e.length;
}
function Ba(e, t) {
  return t.push(e), e;
}
function rR(e, t) {
  return e.map(t).join("");
}
var ks = 1, ji = 1, um = 0, zn = 0, bn = 0, Yi = "";
function Os(e, t, n, r, i, a, o) {
  return { value: e, root: t, parent: n, type: r, props: i, children: a, line: ks, column: ji, length: o, return: "" };
}
function po(e, t) {
  return eR(Os("", null, null, "", null, null, 0), e, { length: -e.length }, t);
}
function iR() {
  return bn;
}
function oR() {
  return bn = zn > 0 ? An(Yi, --zn) : 0, ji--, bn === 10 && (ji = 1, ks--), bn;
}
function Jn() {
  return bn = zn < um ? An(Yi, zn++) : 0, ji++, bn === 10 && (ji = 1, ks++), bn;
}
function wr() {
  return An(Yi, zn);
}
function Wa() {
  return zn;
}
function Ho(e, t) {
  return Fo(Yi, e, t);
}
function Bo(e) {
  switch (e) {
    // \0 \t \n \r \s whitespace token
    case 0:
    case 9:
    case 10:
    case 13:
    case 32:
      return 5;
    // ! + , / > @ ~ isolate token
    case 33:
    case 43:
    case 44:
    case 47:
    case 62:
    case 64:
    case 126:
    // ; { } breakpoint token
    case 59:
    case 123:
    case 125:
      return 4;
    // : accompanied token
    case 58:
      return 3;
    // " ' ( [ opening delimit token
    case 34:
    case 39:
    case 40:
    case 91:
      return 2;
    // ) ] closing delimit token
    case 41:
    case 93:
      return 1;
  }
  return 0;
}
function cm(e) {
  return ks = ji = 1, um = mr(Yi = e), zn = 0, [];
}
function dm(e) {
  return Yi = "", e;
}
function $a(e) {
  return lm(Ho(zn - 1, Xu(e === 91 ? e + 2 : e === 40 ? e + 1 : e)));
}
function aR(e) {
  for (; (bn = wr()) && bn < 33; )
    Jn();
  return Bo(e) > 2 || Bo(bn) > 3 ? "" : " ";
}
function sR(e, t) {
  for (; --t && Jn() && !(bn < 48 || bn > 102 || bn > 57 && bn < 65 || bn > 70 && bn < 97); )
    ;
  return Ho(e, Wa() + (t < 6 && wr() == 32 && Jn() == 32));
}
function Xu(e) {
  for (; Jn(); )
    switch (bn) {
      // ] ) " '
      case e:
        return zn;
      // " '
      case 34:
      case 39:
        e !== 34 && e !== 39 && Xu(bn);
        break;
      // (
      case 40:
        e === 41 && Xu(e);
        break;
      // \
      case 92:
        Jn();
        break;
    }
  return zn;
}
function lR(e, t) {
  for (; Jn() && e + bn !== 57; )
    if (e + bn === 84 && wr() === 47)
      break;
  return "/*" + Ho(t, zn - 1) + "*" + Ts(e === 47 ? e : Jn());
}
function uR(e) {
  for (; !Bo(wr()); )
    Jn();
  return Ho(e, zn);
}
function cR(e) {
  return dm(Xa("", null, null, null, [""], e = cm(e), 0, [0], e));
}
function Xa(e, t, n, r, i, a, o, l, u) {
  for (var s = 0, d = 0, c = o, m = 0, h = 0, x = 0, v = 1, b = 1, I = 1, O = 0, T = "", D = i, E = a, B = r, X = T; b; )
    switch (x = O, O = Jn()) {
      // (
      case 40:
        if (x != 108 && An(X, c - 1) == 58) {
          $u(X += Dt($a(O), "&", "&\f"), "&\f") != -1 && (I = -1);
          break;
        }
      // " ' [
      case 34:
      case 39:
      case 91:
        X += $a(O);
        break;
      // \t \n \r \s
      case 9:
      case 10:
      case 13:
      case 32:
        X += aR(x);
        break;
      // \
      case 92:
        X += sR(Wa() - 1, 7);
        continue;
      // /
      case 47:
        switch (wr()) {
          case 42:
          case 47:
            Ba(dR(lR(Jn(), Wa()), t, n), u);
            break;
          default:
            X += "/";
        }
        break;
      // {
      case 123 * v:
        l[s++] = mr(X) * I;
      // } ; \0
      case 125 * v:
      case 59:
      case 0:
        switch (O) {
          // \0 }
          case 0:
          case 125:
            b = 0;
          // ;
          case 59 + d:
            I == -1 && (X = Dt(X, /\f/g, "")), h > 0 && mr(X) - c && Ba(h > 32 ? Uf(X + ";", r, n, c - 1) : Uf(Dt(X, " ", "") + ";", r, n, c - 2), u);
            break;
          // @ ;
          case 59:
            X += ";";
          // { rule/at-rule
          default:
            if (Ba(B = Jf(X, t, n, s, d, i, l, T, D = [], E = [], c), a), O === 123)
              if (d === 0)
                Xa(X, t, B, B, D, a, c, l, E);
              else
                switch (m === 99 && An(X, 3) === 110 ? 100 : m) {
                  // d l m s
                  case 100:
                  case 108:
                  case 109:
                  case 115:
                    Xa(e, B, B, r && Ba(Jf(e, B, B, 0, 0, i, l, T, i, D = [], c), E), i, E, c, l, r ? D : E);
                    break;
                  default:
                    Xa(X, B, B, B, [""], E, 0, l, E);
                }
        }
        s = d = h = 0, v = I = 1, T = X = "", c = o;
        break;
      // :
      case 58:
        c = 1 + mr(X), h = x;
      default:
        if (v < 1) {
          if (O == 123)
            --v;
          else if (O == 125 && v++ == 0 && oR() == 125)
            continue;
        }
        switch (X += Ts(O), O * v) {
          // &
          case 38:
            I = d > 0 ? 1 : (X += "\f", -1);
            break;
          // ,
          case 44:
            l[s++] = (mr(X) - 1) * I, I = 1;
            break;
          // @
          case 64:
            wr() === 45 && (X += $a(Jn())), m = wr(), d = c = mr(T = X += uR(Wa())), O++;
            break;
          // -
          case 45:
            x === 45 && mr(X) == 2 && (v = 0);
        }
    }
  return a;
}
function Jf(e, t, n, r, i, a, o, l, u, s, d) {
  for (var c = i - 1, m = i === 0 ? a : [""], h = $c(m), x = 0, v = 0, b = 0; x < r; ++x)
    for (var I = 0, O = Fo(e, c + 1, c = K1(v = o[x])), T = e; I < h; ++I)
      (T = lm(v > 0 ? m[I] + " " + O : Dt(O, /&\f/g, m[I]))) && (u[b++] = T);
  return Os(e, t, n, i === 0 ? Hc : l, u, s, d);
}
function dR(e, t, n) {
  return Os(e, t, n, am, Ts(iR()), Fo(e, 2, -2), 0);
}
function Uf(e, t, n, r) {
  return Os(e, t, n, Wc, Fo(e, 0, r), Fo(e, r + 1, -1), r);
}
function Gi(e, t) {
  for (var n = "", r = $c(e), i = 0; i < r; i++)
    n += t(e[i], i, e, t) || "";
  return n;
}
function fR(e, t, n, r) {
  switch (e.type) {
    case Q1:
      if (e.children.length) break;
    case q1:
    case Wc:
      return e.return = e.return || e.value;
    case am:
      return "";
    case sm:
      return e.return = e.value + "{" + Gi(e.children, r) + "}";
    case Hc:
      e.value = e.props.join(",");
  }
  return mr(n = Gi(e.children, r)) ? e.return = e.value + "{" + n + "}" : "";
}
function pR(e) {
  var t = $c(e);
  return function(n, r, i, a) {
    for (var o = "", l = 0; l < t; l++)
      o += e[l](n, r, i, a) || "";
    return o;
  };
}
function gR(e) {
  return function(t) {
    t.root || (t = t.return) && e(t);
  };
}
var hR = function(t, n, r) {
  for (var i = 0, a = 0; i = a, a = wr(), i === 38 && a === 12 && (n[r] = 1), !Bo(a); )
    Jn();
  return Ho(t, zn);
}, mR = function(t, n) {
  var r = -1, i = 44;
  do
    switch (Bo(i)) {
      case 0:
        i === 38 && wr() === 12 && (n[r] = 1), t[r] += hR(zn - 1, n, r);
        break;
      case 2:
        t[r] += $a(i);
        break;
      case 4:
        if (i === 44) {
          t[++r] = wr() === 58 ? "&\f" : "", n[r] = t[r].length;
          break;
        }
      // fallthrough
      default:
        t[r] += Ts(i);
    }
  while (i = Jn());
  return t;
}, vR = function(t, n) {
  return dm(mR(cm(t), n));
}, qf = /* @__PURE__ */ new WeakMap(), bR = function(t) {
  if (!(t.type !== "rule" || !t.parent || // positive .length indicates that this rule contains pseudo
  // negative .length indicates that this rule has been already prefixed
  t.length < 1)) {
    for (var n = t.value, r = t.parent, i = t.column === r.column && t.line === r.line; r.type !== "rule"; )
      if (r = r.parent, !r) return;
    if (!(t.props.length === 1 && n.charCodeAt(0) !== 58 && !qf.get(r)) && !i) {
      qf.set(t, !0);
      for (var a = [], o = vR(n, a), l = r.props, u = 0, s = 0; u < o.length; u++)
        for (var d = 0; d < l.length; d++, s++)
          t.props[s] = a[u] ? o[u].replace(/&\f/g, l[d]) : l[d] + " " + o[u];
    }
  }
}, yR = function(t) {
  if (t.type === "decl") {
    var n = t.value;
    // charcode for l
    n.charCodeAt(0) === 108 && // charcode for b
    n.charCodeAt(2) === 98 && (t.return = "", t.value = "");
  }
};
function fm(e, t) {
  switch (tR(e, t)) {
    // color-adjust
    case 5103:
      return Lt + "print-" + e + e;
    // animation, animation-(delay|direction|duration|fill-mode|iteration-count|name|play-state|timing-function)
    case 5737:
    case 4201:
    case 3177:
    case 3433:
    case 1641:
    case 4457:
    case 2921:
    // text-decoration, filter, clip-path, backface-visibility, column, box-decoration-break
    case 5572:
    case 6356:
    case 5844:
    case 3191:
    case 6645:
    case 3005:
    // mask, mask-image, mask-(mode|clip|size), mask-(repeat|origin), mask-position, mask-composite,
    case 6391:
    case 5879:
    case 5623:
    case 6135:
    case 4599:
    case 4855:
    // background-clip, columns, column-(count|fill|gap|rule|rule-color|rule-style|rule-width|span|width)
    case 4215:
    case 6389:
    case 5109:
    case 5365:
    case 5621:
    case 3829:
      return Lt + e + e;
    // appearance, user-select, transform, hyphens, text-size-adjust
    case 5349:
    case 4246:
    case 4810:
    case 6968:
    case 2756:
      return Lt + e + ls + e + Tn + e + e;
    // flex, flex-direction
    case 6828:
    case 4268:
      return Lt + e + Tn + e + e;
    // order
    case 6165:
      return Lt + e + Tn + "flex-" + e + e;
    // align-items
    case 5187:
      return Lt + e + Dt(e, /(\w+).+(:[^]+)/, Lt + "box-$1$2" + Tn + "flex-$1$2") + e;
    // align-self
    case 5443:
      return Lt + e + Tn + "flex-item-" + Dt(e, /flex-|-self/, "") + e;
    // align-content
    case 4675:
      return Lt + e + Tn + "flex-line-pack" + Dt(e, /align-content|flex-|-self/, "") + e;
    // flex-shrink
    case 5548:
      return Lt + e + Tn + Dt(e, "shrink", "negative") + e;
    // flex-basis
    case 5292:
      return Lt + e + Tn + Dt(e, "basis", "preferred-size") + e;
    // flex-grow
    case 6060:
      return Lt + "box-" + Dt(e, "-grow", "") + Lt + e + Tn + Dt(e, "grow", "positive") + e;
    // transition
    case 4554:
      return Lt + Dt(e, /([^-])(transform)/g, "$1" + Lt + "$2") + e;
    // cursor
    case 6187:
      return Dt(Dt(Dt(e, /(zoom-|grab)/, Lt + "$1"), /(image-set)/, Lt + "$1"), e, "") + e;
    // background, background-image
    case 5495:
    case 3959:
      return Dt(e, /(image-set\([^]*)/, Lt + "$1$`$1");
    // justify-content
    case 4968:
      return Dt(Dt(e, /(.+:)(flex-)?(.*)/, Lt + "box-pack:$3" + Tn + "flex-pack:$3"), /s.+-b[^;]+/, "justify") + Lt + e + e;
    // (margin|padding)-inline-(start|end)
    case 4095:
    case 3583:
    case 4068:
    case 2532:
      return Dt(e, /(.+)-inline(.+)/, Lt + "$1$2") + e;
    // (min|max)?(width|height|inline-size|block-size)
    case 8116:
    case 7059:
    case 5753:
    case 5535:
    case 5445:
    case 5701:
    case 4933:
    case 4677:
    case 5533:
    case 5789:
    case 5021:
    case 4765:
      if (mr(e) - 1 - t > 6) switch (An(e, t + 1)) {
        // (m)ax-content, (m)in-content
        case 109:
          if (An(e, t + 4) !== 45) break;
        // (f)ill-available, (f)it-content
        case 102:
          return Dt(e, /(.+:)(.+)-([^]+)/, "$1" + Lt + "$2-$3$1" + ls + (An(e, t + 3) == 108 ? "$3" : "$2-$3")) + e;
        // (s)tretch
        case 115:
          return ~$u(e, "stretch") ? fm(Dt(e, "stretch", "fill-available"), t) + e : e;
      }
      break;
    // position: sticky
    case 4949:
      if (An(e, t + 1) !== 115) break;
    // display: (flex|inline-flex)
    case 6444:
      switch (An(e, mr(e) - 3 - (~$u(e, "!important") && 10))) {
        // stic(k)y
        case 107:
          return Dt(e, ":", ":" + Lt) + e;
        // (inline-)?fl(e)x
        case 101:
          return Dt(e, /(.+:)([^;!]+)(;|!.+)?/, "$1" + Lt + (An(e, 14) === 45 ? "inline-" : "") + "box$3$1" + Lt + "$2$3$1" + Tn + "$2box$3") + e;
      }
      break;
    // writing-mode
    case 5936:
      switch (An(e, t + 11)) {
        // vertical-l(r)
        case 114:
          return Lt + e + Tn + Dt(e, /[svh]\w+-[tblr]{2}/, "tb") + e;
        // vertical-r(l)
        case 108:
          return Lt + e + Tn + Dt(e, /[svh]\w+-[tblr]{2}/, "tb-rl") + e;
        // horizontal(-)tb
        case 45:
          return Lt + e + Tn + Dt(e, /[svh]\w+-[tblr]{2}/, "lr") + e;
      }
      return Lt + e + Tn + e + e;
  }
  return e;
}
var wR = function(t, n, r, i) {
  if (t.length > -1 && !t.return) switch (t.type) {
    case Wc:
      t.return = fm(t.value, t.length);
      break;
    case sm:
      return Gi([po(t, {
        value: Dt(t.value, "@", "@" + Lt)
      })], i);
    case Hc:
      if (t.length) return rR(t.props, function(a) {
        switch (nR(a, /(::plac\w+|:read-\w+)/)) {
          // :read-(only|write)
          case ":read-only":
          case ":read-write":
            return Gi([po(t, {
              props: [Dt(a, /:(read-\w+)/, ":" + ls + "$1")]
            })], i);
          // :placeholder
          case "::placeholder":
            return Gi([po(t, {
              props: [Dt(a, /:(plac\w+)/, ":" + Lt + "input-$1")]
            }), po(t, {
              props: [Dt(a, /:(plac\w+)/, ":" + ls + "$1")]
            }), po(t, {
              props: [Dt(a, /:(plac\w+)/, Tn + "input-$1")]
            })], i);
        }
        return "";
      });
  }
}, xR = [wR], CR = function(t) {
  var n = t.key;
  if (n === "css") {
    var r = document.querySelectorAll("style[data-emotion]:not([data-s])");
    Array.prototype.forEach.call(r, function(v) {
      var b = v.getAttribute("data-emotion");
      b.indexOf(" ") !== -1 && (document.head.appendChild(v), v.setAttribute("data-s", ""));
    });
  }
  var i = t.stylisPlugins || xR, a = {}, o, l = [];
  o = t.container || document.head, Array.prototype.forEach.call(
    // this means we will ignore elements which don't have a space in them which
    // means that the style elements we're looking at are only Emotion 11 server-rendered style elements
    document.querySelectorAll('style[data-emotion^="' + n + ' "]'),
    function(v) {
      for (var b = v.getAttribute("data-emotion").split(" "), I = 1; I < b.length; I++)
        a[b[I]] = !0;
      l.push(v);
    }
  );
  var u, s = [bR, yR];
  {
    var d, c = [fR, gR(function(v) {
      d.insert(v);
    })], m = pR(s.concat(i, c)), h = function(b) {
      return Gi(cR(b), m);
    };
    u = function(b, I, O, T) {
      d = O, h(b ? b + "{" + I.styles + "}" : I.styles), T && (x.inserted[I.name] = !0);
    };
  }
  var x = {
    key: n,
    sheet: new U1({
      key: n,
      container: o,
      nonce: t.nonce,
      speedy: t.speedy,
      prepend: t.prepend,
      insertionPoint: t.insertionPoint
    }),
    nonce: t.nonce,
    inserted: a,
    registered: {},
    insert: u
  };
  return x.sheet.hydrate(l), x;
}, SR = !0;
function IR(e, t, n) {
  var r = "";
  return n.split(" ").forEach(function(i) {
    e[i] !== void 0 ? t.push(e[i] + ";") : i && (r += i + " ");
  }), r;
}
var pm = function(t, n, r) {
  var i = t.key + "-" + n.name;
  // we only need to add the styles to the registered cache if the
  // class name could be used further down
  // the tree but if it's a string tag, we know it won't
  // so we don't have to add it to registered cache.
  // this improves memory usage since we can avoid storing the whole style string
  (r === !1 || // we need to always store it if we're in compat mode and
  // in node since emotion-server relies on whether a style is in
  // the registered cache to know whether a style is global or not
  // also, note that this check will be dead code eliminated in the browser
  SR === !1) && t.registered[i] === void 0 && (t.registered[i] = n.styles);
}, RR = function(t, n, r) {
  pm(t, n, r);
  var i = t.key + "-" + n.name;
  if (t.inserted[n.name] === void 0) {
    var a = n;
    do
      t.insert(n === a ? "." + i : "", a, t.sheet, !0), a = a.next;
    while (a !== void 0);
  }
};
function ER(e) {
  for (var t = 0, n, r = 0, i = e.length; i >= 4; ++r, i -= 4)
    n = e.charCodeAt(r) & 255 | (e.charCodeAt(++r) & 255) << 8 | (e.charCodeAt(++r) & 255) << 16 | (e.charCodeAt(++r) & 255) << 24, n = /* Math.imul(k, m): */
    (n & 65535) * 1540483477 + ((n >>> 16) * 59797 << 16), n ^= /* k >>> r: */
    n >>> 24, t = /* Math.imul(k, m): */
    (n & 65535) * 1540483477 + ((n >>> 16) * 59797 << 16) ^ /* Math.imul(h, m): */
    (t & 65535) * 1540483477 + ((t >>> 16) * 59797 << 16);
  switch (i) {
    case 3:
      t ^= (e.charCodeAt(r + 2) & 255) << 16;
    case 2:
      t ^= (e.charCodeAt(r + 1) & 255) << 8;
    case 1:
      t ^= e.charCodeAt(r) & 255, t = /* Math.imul(h, m): */
      (t & 65535) * 1540483477 + ((t >>> 16) * 59797 << 16);
  }
  return t ^= t >>> 13, t = /* Math.imul(h, m): */
  (t & 65535) * 1540483477 + ((t >>> 16) * 59797 << 16), ((t ^ t >>> 15) >>> 0).toString(36);
}
var AR = {
  animationIterationCount: 1,
  aspectRatio: 1,
  borderImageOutset: 1,
  borderImageSlice: 1,
  borderImageWidth: 1,
  boxFlex: 1,
  boxFlexGroup: 1,
  boxOrdinalGroup: 1,
  columnCount: 1,
  columns: 1,
  flex: 1,
  flexGrow: 1,
  flexPositive: 1,
  flexShrink: 1,
  flexNegative: 1,
  flexOrder: 1,
  gridRow: 1,
  gridRowEnd: 1,
  gridRowSpan: 1,
  gridRowStart: 1,
  gridColumn: 1,
  gridColumnEnd: 1,
  gridColumnSpan: 1,
  gridColumnStart: 1,
  msGridRow: 1,
  msGridRowSpan: 1,
  msGridColumn: 1,
  msGridColumnSpan: 1,
  fontWeight: 1,
  lineHeight: 1,
  opacity: 1,
  order: 1,
  orphans: 1,
  scale: 1,
  tabSize: 1,
  widows: 1,
  zIndex: 1,
  zoom: 1,
  WebkitLineClamp: 1,
  // SVG-related properties
  fillOpacity: 1,
  floodOpacity: 1,
  stopOpacity: 1,
  strokeDasharray: 1,
  strokeDashoffset: 1,
  strokeMiterlimit: 1,
  strokeOpacity: 1,
  strokeWidth: 1
}, PR = /[A-Z]|^ms/g, TR = /_EMO_([^_]+?)_([^]*?)_EMO_/g, gm = function(t) {
  return t.charCodeAt(1) === 45;
}, Qf = function(t) {
  return t != null && typeof t != "boolean";
}, su = /* @__PURE__ */ kg(function(e) {
  return gm(e) ? e : e.replace(PR, "-$&").toLowerCase();
}), Kf = function(t, n) {
  switch (t) {
    case "animation":
    case "animationName":
      if (typeof n == "string")
        return n.replace(TR, function(r, i, a) {
          return vr = {
            name: i,
            styles: a,
            next: vr
          }, i;
        });
  }
  return AR[t] !== 1 && !gm(t) && typeof n == "number" && n !== 0 ? n + "px" : n;
};
function No(e, t, n) {
  if (n == null)
    return "";
  var r = n;
  if (r.__emotion_styles !== void 0)
    return r;
  switch (typeof n) {
    case "boolean":
      return "";
    case "object": {
      var i = n;
      if (i.anim === 1)
        return vr = {
          name: i.name,
          styles: i.styles,
          next: vr
        }, i.name;
      var a = n;
      if (a.styles !== void 0) {
        var o = a.next;
        if (o !== void 0)
          for (; o !== void 0; )
            vr = {
              name: o.name,
              styles: o.styles,
              next: vr
            }, o = o.next;
        var l = a.styles + ";";
        return l;
      }
      return kR(e, t, n);
    }
    case "function": {
      if (e !== void 0) {
        var u = vr, s = n(e);
        return vr = u, No(e, t, s);
      }
      break;
    }
  }
  var d = n;
  return d;
}
function kR(e, t, n) {
  var r = "";
  if (Array.isArray(n))
    for (var i = 0; i < n.length; i++)
      r += No(e, t, n[i]) + ";";
  else
    for (var a in n) {
      var o = n[a];
      if (typeof o != "object") {
        var l = o;
        Qf(l) && (r += su(a) + ":" + Kf(a, l) + ";");
      } else if (Array.isArray(o) && typeof o[0] == "string" && t == null)
        for (var u = 0; u < o.length; u++)
          Qf(o[u]) && (r += su(a) + ":" + Kf(a, o[u]) + ";");
      else {
        var s = No(e, t, o);
        switch (a) {
          case "animation":
          case "animationName": {
            r += su(a) + ":" + s + ";";
            break;
          }
          default:
            r += a + "{" + s + "}";
        }
      }
    }
  return r;
}
var ep = /label:\s*([^\s;{]+)\s*(;|$)/g, vr;
function hm(e, t, n) {
  if (e.length === 1 && typeof e[0] == "object" && e[0] !== null && e[0].styles !== void 0)
    return e[0];
  var r = !0, i = "";
  vr = void 0;
  var a = e[0];
  if (a == null || a.raw === void 0)
    r = !1, i += No(n, t, a);
  else {
    var o = a;
    i += o[0];
  }
  for (var l = 1; l < e.length; l++)
    if (i += No(n, t, e[l]), r) {
      var u = a;
      i += u[l];
    }
  ep.lastIndex = 0;
  for (var s = "", d; (d = ep.exec(i)) !== null; )
    s += "-" + d[1];
  var c = ER(i) + s;
  return {
    name: c,
    styles: i,
    next: vr
  };
}
var OR = function(t) {
  return t();
}, FR = he.useInsertionEffect ? he.useInsertionEffect : !1, BR = FR || OR, mm = /* @__PURE__ */ he.createContext(
  // we're doing this to avoid preconstruct's dead code elimination in this one case
  // because this module is primarily intended for the browser and node
  // but it's also required in react native and similar environments sometimes
  // and we could have a special build just for that
  // but this is much easier and the native packages
  // might use a different theme context in the future anyway
  typeof HTMLElement < "u" ? /* @__PURE__ */ CR({
    key: "css"
  }) : null
);
mm.Provider;
var NR = function(t) {
  return /* @__PURE__ */ Zp(function(n, r) {
    var i = Bn(mm);
    return t(n, i, r);
  });
}, GR = /* @__PURE__ */ he.createContext({}), Xc = {}.hasOwnProperty, Yu = "__EMOTION_TYPE_PLEASE_DO_NOT_USE__", _R = function(t, n) {
  var r = {};
  for (var i in n)
    Xc.call(n, i) && (r[i] = n[i]);
  return r[Yu] = t, r;
}, MR = function(t) {
  var n = t.cache, r = t.serialized, i = t.isStringTag;
  return pm(n, r, i), BR(function() {
    return RR(n, r, i);
  }), null;
}, VR = /* @__PURE__ */ NR(function(e, t, n) {
  var r = e.css;
  typeof r == "string" && t.registered[r] !== void 0 && (r = t.registered[r]);
  var i = e[Yu], a = [r], o = "";
  typeof e.className == "string" ? o = IR(t.registered, a, e.className) : e.className != null && (o = e.className + " ");
  var l = hm(a, void 0, he.useContext(GR));
  o += t.key + "-" + l.name;
  var u = {};
  for (var s in e)
    Xc.call(e, s) && s !== "css" && s !== Yu && (u[s] = e[s]);
  return u.className = o, n && (u.ref = n), /* @__PURE__ */ he.createElement(he.Fragment, null, /* @__PURE__ */ he.createElement(MR, {
    cache: t,
    serialized: l,
    isStringTag: typeof i == "string"
  }), /* @__PURE__ */ he.createElement(i, u));
}), LR = VR, tt = function(t, n) {
  var r = arguments;
  if (n == null || !Xc.call(n, "css"))
    return he.createElement.apply(void 0, r);
  var i = r.length, a = new Array(i);
  a[0] = LR, a[1] = _R(t, n);
  for (var o = 2; o < i; o++)
    a[o] = r[o];
  return he.createElement.apply(null, a);
};
(function(e) {
  var t;
  t || (t = e.JSX || (e.JSX = {}));
})(tt || (tt = {}));
function Yc() {
  for (var e = arguments.length, t = new Array(e), n = 0; n < e; n++)
    t[n] = arguments[n];
  return hm(t);
}
function DR() {
  var e = Yc.apply(void 0, arguments), t = "animation-" + e.name;
  return {
    name: t,
    styles: "@keyframes " + t + "{" + e.styles + "}",
    anim: 1,
    toString: function() {
      return "_EMO_" + this.name + "_" + this.styles + "_EMO_";
    }
  };
}
function jR(e, t) {
  return t || (t = e.slice(0)), Object.freeze(Object.defineProperties(e, {
    raw: {
      value: Object.freeze(t)
    }
  }));
}
const zR = Math.min, HR = Math.max, us = Math.round, Na = Math.floor, cs = (e) => ({
  x: e,
  y: e
});
function WR(e) {
  const {
    x: t,
    y: n,
    width: r,
    height: i
  } = e;
  return {
    width: r,
    height: i,
    top: n,
    left: t,
    right: t + r,
    bottom: n + i,
    x: t,
    y: n
  };
}
function Fs() {
  return typeof window < "u";
}
function vm(e) {
  return ym(e) ? (e.nodeName || "").toLowerCase() : "#document";
}
function Br(e) {
  var t;
  return (e == null || (t = e.ownerDocument) == null ? void 0 : t.defaultView) || window;
}
function bm(e) {
  var t;
  return (t = (ym(e) ? e.ownerDocument : e.document) || window.document) == null ? void 0 : t.documentElement;
}
function ym(e) {
  return Fs() ? e instanceof Node || e instanceof Br(e).Node : !1;
}
function $R(e) {
  return Fs() ? e instanceof Element || e instanceof Br(e).Element : !1;
}
function Zc(e) {
  return Fs() ? e instanceof HTMLElement || e instanceof Br(e).HTMLElement : !1;
}
function tp(e) {
  return !Fs() || typeof ShadowRoot > "u" ? !1 : e instanceof ShadowRoot || e instanceof Br(e).ShadowRoot;
}
function wm(e) {
  const {
    overflow: t,
    overflowX: n,
    overflowY: r,
    display: i
  } = Jc(e);
  return /auto|scroll|overlay|hidden|clip/.test(t + r + n) && !["inline", "contents"].includes(i);
}
function XR() {
  return typeof CSS > "u" || !CSS.supports ? !1 : CSS.supports("-webkit-backdrop-filter", "none");
}
function YR(e) {
  return ["html", "body", "#document"].includes(vm(e));
}
function Jc(e) {
  return Br(e).getComputedStyle(e);
}
function ZR(e) {
  if (vm(e) === "html")
    return e;
  const t = (
    // Step into the shadow DOM of the parent of a slotted node.
    e.assignedSlot || // DOM Element detected.
    e.parentNode || // ShadowRoot detected.
    tp(e) && e.host || // Fallback.
    bm(e)
  );
  return tp(t) ? t.host : t;
}
function xm(e) {
  const t = ZR(e);
  return YR(t) ? e.ownerDocument ? e.ownerDocument.body : e.body : Zc(t) && wm(t) ? t : xm(t);
}
function ds(e, t, n) {
  var r;
  t === void 0 && (t = []), n === void 0 && (n = !0);
  const i = xm(e), a = i === ((r = e.ownerDocument) == null ? void 0 : r.body), o = Br(i);
  if (a) {
    const l = Zu(o);
    return t.concat(o, o.visualViewport || [], wm(i) ? i : [], l && n ? ds(l) : []);
  }
  return t.concat(i, ds(i, [], n));
}
function Zu(e) {
  return e.parent && Object.getPrototypeOf(e.parent) ? e.frameElement : null;
}
function JR(e) {
  const t = Jc(e);
  let n = parseFloat(t.width) || 0, r = parseFloat(t.height) || 0;
  const i = Zc(e), a = i ? e.offsetWidth : n, o = i ? e.offsetHeight : r, l = us(n) !== a || us(r) !== o;
  return l && (n = a, r = o), {
    width: n,
    height: r,
    $: l
  };
}
function Uc(e) {
  return $R(e) ? e : e.contextElement;
}
function np(e) {
  const t = Uc(e);
  if (!Zc(t))
    return cs(1);
  const n = t.getBoundingClientRect(), {
    width: r,
    height: i,
    $: a
  } = JR(t);
  let o = (a ? us(n.width) : n.width) / r, l = (a ? us(n.height) : n.height) / i;
  return (!o || !Number.isFinite(o)) && (o = 1), (!l || !Number.isFinite(l)) && (l = 1), {
    x: o,
    y: l
  };
}
const UR = /* @__PURE__ */ cs(0);
function qR(e) {
  const t = Br(e);
  return !XR() || !t.visualViewport ? UR : {
    x: t.visualViewport.offsetLeft,
    y: t.visualViewport.offsetTop
  };
}
function QR(e, t, n) {
  return !1;
}
function rp(e, t, n, r) {
  t === void 0 && (t = !1);
  const i = e.getBoundingClientRect(), a = Uc(e);
  let o = cs(1);
  t && (o = np(e));
  const l = QR() ? qR(a) : cs(0);
  let u = (i.left + l.x) / o.x, s = (i.top + l.y) / o.y, d = i.width / o.x, c = i.height / o.y;
  if (a) {
    const m = Br(a), h = r;
    let x = m, v = Zu(x);
    for (; v && r && h !== x; ) {
      const b = np(v), I = v.getBoundingClientRect(), O = Jc(v), T = I.left + (v.clientLeft + parseFloat(O.paddingLeft)) * b.x, D = I.top + (v.clientTop + parseFloat(O.paddingTop)) * b.y;
      u *= b.x, s *= b.y, d *= b.x, c *= b.y, u += T, s += D, x = Br(v), v = Zu(x);
    }
  }
  return WR({
    width: d,
    height: c,
    x: u,
    y: s
  });
}
function Cm(e, t) {
  return e.x === t.x && e.y === t.y && e.width === t.width && e.height === t.height;
}
function KR(e, t) {
  let n = null, r;
  const i = bm(e);
  function a() {
    var l;
    clearTimeout(r), (l = n) == null || l.disconnect(), n = null;
  }
  function o(l, u) {
    l === void 0 && (l = !1), u === void 0 && (u = 1), a();
    const s = e.getBoundingClientRect(), {
      left: d,
      top: c,
      width: m,
      height: h
    } = s;
    if (l || t(), !m || !h)
      return;
    const x = Na(c), v = Na(i.clientWidth - (d + m)), b = Na(i.clientHeight - (c + h)), I = Na(d), T = {
      rootMargin: -x + "px " + -v + "px " + -b + "px " + -I + "px",
      threshold: HR(0, zR(1, u)) || 1
    };
    let D = !0;
    function E(B) {
      const X = B[0].intersectionRatio;
      if (X !== u) {
        if (!D)
          return o();
        X ? o(!1, X) : r = setTimeout(() => {
          o(!1, 1e-7);
        }, 1e3);
      }
      X === 1 && !Cm(s, e.getBoundingClientRect()) && o(), D = !1;
    }
    try {
      n = new IntersectionObserver(E, {
        ...T,
        // Handle <iframe>s
        root: i.ownerDocument
      });
    } catch {
      n = new IntersectionObserver(E, T);
    }
    n.observe(e);
  }
  return o(!0), a;
}
function eE(e, t, n, r) {
  r === void 0 && (r = {});
  const {
    ancestorScroll: i = !0,
    ancestorResize: a = !0,
    elementResize: o = typeof ResizeObserver == "function",
    layoutShift: l = typeof IntersectionObserver == "function",
    animationFrame: u = !1
  } = r, s = Uc(e), d = i || a ? [...s ? ds(s) : [], ...ds(t)] : [];
  d.forEach((I) => {
    i && I.addEventListener("scroll", n, {
      passive: !0
    }), a && I.addEventListener("resize", n);
  });
  const c = s && l ? KR(s, n) : null;
  let m = -1, h = null;
  o && (h = new ResizeObserver((I) => {
    let [O] = I;
    O && O.target === s && h && (h.unobserve(t), cancelAnimationFrame(m), m = requestAnimationFrame(() => {
      var T;
      (T = h) == null || T.observe(t);
    })), n();
  }), s && !u && h.observe(s), h.observe(t));
  let x, v = u ? rp(e) : null;
  u && b();
  function b() {
    const I = rp(e);
    v && !Cm(v, I) && n(), v = I, x = requestAnimationFrame(b);
  }
  return n(), () => {
    var I;
    d.forEach((O) => {
      i && O.removeEventListener("scroll", n), a && O.removeEventListener("resize", n);
    }), c == null || c(), (I = h) == null || I.disconnect(), h = null, u && cancelAnimationFrame(x);
  };
}
var Ju = Nv, Uu = {}, tE = ["className", "clearValue", "cx", "getStyles", "getClassNames", "getValue", "hasValue", "isMulti", "isRtl", "options", "selectOption", "selectProps", "setValue", "theme"], fs = function() {
};
function nE(e, t) {
  return t ? t[0] === "-" ? e + t : e + "__" + t : e;
}
function rE(e, t) {
  for (var n = arguments.length, r = new Array(n > 2 ? n - 2 : 0), i = 2; i < n; i++)
    r[i - 2] = arguments[i];
  var a = [].concat(r);
  if (t && e)
    for (var o in t)
      t.hasOwnProperty(o) && t[o] && a.push("".concat(nE(e, o)));
  return a.filter(function(l) {
    return l;
  }).map(function(l) {
    return String(l).trim();
  }).join(" ");
}
var ip = function(t) {
  return fE(t) ? t.filter(Boolean) : pi(t) === "object" && t !== null ? [t] : [];
}, Sm = function(t) {
  t.className, t.clearValue, t.cx, t.getStyles, t.getClassNames, t.getValue, t.hasValue, t.isMulti, t.isRtl, t.options, t.selectOption, t.selectProps, t.setValue, t.theme;
  var n = Gr(t, tE);
  return st({}, n);
}, fn = function(t, n, r) {
  var i = t.cx, a = t.getStyles, o = t.getClassNames, l = t.className;
  return {
    css: a(n, t),
    className: i(r ?? {}, o(n, t), l)
  };
};
function Bs(e) {
  return [document.documentElement, document.body, window].indexOf(e) > -1;
}
function iE(e) {
  return Bs(e) ? window.innerHeight : e.clientHeight;
}
function Im(e) {
  return Bs(e) ? window.pageYOffset : e.scrollTop;
}
function ps(e, t) {
  if (Bs(e)) {
    window.scrollTo(0, t);
    return;
  }
  e.scrollTop = t;
}
function oE(e) {
  var t = getComputedStyle(e), n = t.position === "absolute", r = /(auto|scroll)/;
  if (t.position === "fixed") return document.documentElement;
  for (var i = e; i = i.parentElement; )
    if (t = getComputedStyle(i), !(n && t.position === "static") && r.test(t.overflow + t.overflowY + t.overflowX))
      return i;
  return document.documentElement;
}
function aE(e, t, n, r) {
  return n * ((e = e / r - 1) * e * e + 1) + t;
}
function Ga(e, t) {
  var n = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : 200, r = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : fs, i = Im(e), a = t - i, o = 10, l = 0;
  function u() {
    l += o;
    var s = aE(l, i, a, n);
    ps(e, s), l < n ? window.requestAnimationFrame(u) : r(e);
  }
  u();
}
function op(e, t) {
  var n = e.getBoundingClientRect(), r = t.getBoundingClientRect(), i = t.offsetHeight / 3;
  r.bottom + i > n.bottom ? ps(e, Math.min(t.offsetTop + t.clientHeight - e.offsetHeight + i, e.scrollHeight)) : r.top - i < n.top && ps(e, Math.max(t.offsetTop - i, 0));
}
function sE(e) {
  var t = e.getBoundingClientRect();
  return {
    bottom: t.bottom,
    height: t.height,
    left: t.left,
    right: t.right,
    top: t.top,
    width: t.width
  };
}
function ap() {
  try {
    return document.createEvent("TouchEvent"), !0;
  } catch {
    return !1;
  }
}
function lE() {
  try {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
  } catch {
    return !1;
  }
}
var Rm = !1, uE = {
  get passive() {
    return Rm = !0;
  }
}, _a = typeof window < "u" ? window : {};
_a.addEventListener && _a.removeEventListener && (_a.addEventListener("p", fs, uE), _a.removeEventListener("p", fs, !1));
var cE = Rm;
function dE(e) {
  return e != null;
}
function fE(e) {
  return Array.isArray(e);
}
function Ma(e, t, n) {
  return e ? t : n;
}
var pE = function(t) {
  for (var n = arguments.length, r = new Array(n > 1 ? n - 1 : 0), i = 1; i < n; i++)
    r[i - 1] = arguments[i];
  var a = Object.entries(t).filter(function(o) {
    var l = kr(o, 1), u = l[0];
    return !r.includes(u);
  });
  return a.reduce(function(o, l) {
    var u = kr(l, 2), s = u[0], d = u[1];
    return o[s] = d, o;
  }, {});
}, gE = ["children", "innerProps"], hE = ["children", "innerProps"];
function mE(e) {
  var t = e.maxHeight, n = e.menuEl, r = e.minHeight, i = e.placement, a = e.shouldScroll, o = e.isFixedPosition, l = e.controlHeight, u = oE(n), s = {
    placement: "bottom",
    maxHeight: t
  };
  if (!n || !n.offsetParent) return s;
  var d = u.getBoundingClientRect(), c = d.height, m = n.getBoundingClientRect(), h = m.bottom, x = m.height, v = m.top, b = n.offsetParent.getBoundingClientRect(), I = b.top, O = o ? window.innerHeight : iE(u), T = Im(u), D = parseInt(getComputedStyle(n).marginBottom, 10), E = parseInt(getComputedStyle(n).marginTop, 10), B = I - E, X = O - v, U = B + T, K = c - T - v, Fe = h - O + T + D, oe = T + v - E, ce = 160;
  switch (i) {
    case "auto":
    case "bottom":
      if (X >= x)
        return {
          placement: "bottom",
          maxHeight: t
        };
      if (K >= x && !o)
        return a && Ga(u, Fe, ce), {
          placement: "bottom",
          maxHeight: t
        };
      if (!o && K >= r || o && X >= r) {
        a && Ga(u, Fe, ce);
        var ye = o ? X - D : K - D;
        return {
          placement: "bottom",
          maxHeight: ye
        };
      }
      if (i === "auto" || o) {
        var Q = t, ue = o ? B : U;
        return ue >= r && (Q = Math.min(ue - D - l, t)), {
          placement: "top",
          maxHeight: Q
        };
      }
      if (i === "bottom")
        return a && ps(u, Fe), {
          placement: "bottom",
          maxHeight: t
        };
      break;
    case "top":
      if (B >= x)
        return {
          placement: "top",
          maxHeight: t
        };
      if (U >= x && !o)
        return a && Ga(u, oe, ce), {
          placement: "top",
          maxHeight: t
        };
      if (!o && U >= r || o && B >= r) {
        var Ee = t;
        return (!o && U >= r || o && B >= r) && (Ee = o ? B - E : U - E), a && Ga(u, oe, ce), {
          placement: "top",
          maxHeight: Ee
        };
      }
      return {
        placement: "bottom",
        maxHeight: t
      };
    default:
      throw new Error('Invalid placement provided "'.concat(i, '".'));
  }
  return s;
}
function vE(e) {
  var t = {
    bottom: "top",
    top: "bottom"
  };
  return e ? t[e] : "bottom";
}
var Em = function(t) {
  return t === "auto" ? "bottom" : t;
}, bE = function(t, n) {
  var r, i = t.placement, a = t.theme, o = a.borderRadius, l = a.spacing, u = a.colors;
  return st((r = {
    label: "menu"
  }, bo(r, vE(i), "100%"), bo(r, "position", "absolute"), bo(r, "width", "100%"), bo(r, "zIndex", 1), r), n ? {} : {
    backgroundColor: u.neutral0,
    borderRadius: o,
    boxShadow: "0 0 0 1px hsla(0, 0%, 0%, 0.1), 0 4px 11px hsla(0, 0%, 0%, 0.1)",
    marginBottom: l.menuGutter,
    marginTop: l.menuGutter
  });
}, Am = /* @__PURE__ */ Jp(null), yE = function(t) {
  var n = t.children, r = t.minMenuHeight, i = t.maxMenuHeight, a = t.menuPlacement, o = t.menuPosition, l = t.menuShouldScrollIntoView, u = t.theme, s = Bn(Am) || {}, d = s.setPortalPlacement, c = ir(null), m = Yn(i), h = kr(m, 2), x = h[0], v = h[1], b = Yn(null), I = kr(b, 2), O = I[0], T = I[1], D = u.spacing.controlHeight;
  return Ju(function() {
    var E = c.current;
    if (E) {
      var B = o === "fixed", X = l && !B, U = mE({
        maxHeight: i,
        menuEl: E,
        minHeight: r,
        placement: a,
        shouldScroll: X,
        isFixedPosition: B,
        controlHeight: D
      });
      v(U.maxHeight), T(U.placement), d == null || d(U.placement);
    }
  }, [i, a, o, l, r, d, D]), n({
    ref: c,
    placerProps: st(st({}, t), {}, {
      placement: O || Em(a),
      maxHeight: x
    })
  });
}, wE = function(t) {
  var n = t.children, r = t.innerRef, i = t.innerProps;
  return tt("div", ke({}, fn(t, "menu", {
    menu: !0
  }), {
    ref: r
  }, i), n);
}, xE = wE, CE = function(t, n) {
  var r = t.maxHeight, i = t.theme.spacing.baseUnit;
  return st({
    maxHeight: r,
    overflowY: "auto",
    position: "relative",
    // required for offset[Height, Top] > keyboard scroll
    WebkitOverflowScrolling: "touch"
  }, n ? {} : {
    paddingBottom: i,
    paddingTop: i
  });
}, SE = function(t) {
  var n = t.children, r = t.innerProps, i = t.innerRef, a = t.isMulti;
  return tt("div", ke({}, fn(t, "menuList", {
    "menu-list": !0,
    "menu-list--is-multi": a
  }), {
    ref: i
  }, r), n);
}, Pm = function(t, n) {
  var r = t.theme, i = r.spacing.baseUnit, a = r.colors;
  return st({
    textAlign: "center"
  }, n ? {} : {
    color: a.neutral40,
    padding: "".concat(i * 2, "px ").concat(i * 3, "px")
  });
}, IE = Pm, RE = Pm, EE = function(t) {
  var n = t.children, r = n === void 0 ? "No options" : n, i = t.innerProps, a = Gr(t, gE);
  return tt("div", ke({}, fn(st(st({}, a), {}, {
    children: r,
    innerProps: i
  }), "noOptionsMessage", {
    "menu-notice": !0,
    "menu-notice--no-options": !0
  }), i), r);
}, AE = function(t) {
  var n = t.children, r = n === void 0 ? "Loading..." : n, i = t.innerProps, a = Gr(t, hE);
  return tt("div", ke({}, fn(st(st({}, a), {}, {
    children: r,
    innerProps: i
  }), "loadingMessage", {
    "menu-notice": !0,
    "menu-notice--loading": !0
  }), i), r);
}, PE = function(t) {
  var n = t.rect, r = t.offset, i = t.position;
  return {
    left: n.left,
    position: i,
    top: r,
    width: n.width,
    zIndex: 1
  };
}, TE = function(t) {
  var n = t.appendTo, r = t.children, i = t.controlElement, a = t.innerProps, o = t.menuPlacement, l = t.menuPosition, u = ir(null), s = ir(null), d = Yn(Em(o)), c = kr(d, 2), m = c[0], h = c[1], x = Pr(function() {
    return {
      setPortalPlacement: h
    };
  }, []), v = Yn(null), b = kr(v, 2), I = b[0], O = b[1], T = kn(function() {
    if (i) {
      var X = sE(i), U = l === "fixed" ? 0 : window.pageYOffset, K = X[m] + U;
      (K !== (I == null ? void 0 : I.offset) || X.left !== (I == null ? void 0 : I.rect.left) || X.width !== (I == null ? void 0 : I.rect.width)) && O({
        offset: K,
        rect: X
      });
    }
  }, [i, l, m, I == null ? void 0 : I.offset, I == null ? void 0 : I.rect.left, I == null ? void 0 : I.rect.width]);
  Ju(function() {
    T();
  }, [T]);
  var D = kn(function() {
    typeof s.current == "function" && (s.current(), s.current = null), i && u.current && (s.current = eE(i, u.current, T, {
      elementResize: "ResizeObserver" in window
    }));
  }, [i, T]);
  Ju(function() {
    D();
  }, [D]);
  var E = kn(function(X) {
    u.current = X, D();
  }, [D]);
  if (!n && l !== "fixed" || !I) return null;
  var B = tt("div", ke({
    ref: E
  }, fn(st(st({}, t), {}, {
    offset: I.offset,
    position: l,
    rect: I.rect
  }), "menuPortal", {
    "menu-portal": !0
  }), a), r);
  return tt(Am.Provider, {
    value: x
  }, n ? /* @__PURE__ */ Mv(B, n) : B);
}, kE = function(t) {
  var n = t.isDisabled, r = t.isRtl;
  return {
    label: "container",
    direction: r ? "rtl" : void 0,
    pointerEvents: n ? "none" : void 0,
    // cancel mouse events when disabled
    position: "relative"
  };
}, OE = function(t) {
  var n = t.children, r = t.innerProps, i = t.isDisabled, a = t.isRtl;
  return tt("div", ke({}, fn(t, "container", {
    "--is-disabled": i,
    "--is-rtl": a
  }), r), n);
}, FE = function(t, n) {
  var r = t.theme.spacing, i = t.isMulti, a = t.hasValue, o = t.selectProps.controlShouldRenderValue;
  return st({
    alignItems: "center",
    display: i && a && o ? "flex" : "grid",
    flex: 1,
    flexWrap: "wrap",
    WebkitOverflowScrolling: "touch",
    position: "relative",
    overflow: "hidden"
  }, n ? {} : {
    padding: "".concat(r.baseUnit / 2, "px ").concat(r.baseUnit * 2, "px")
  });
}, BE = function(t) {
  var n = t.children, r = t.innerProps, i = t.isMulti, a = t.hasValue;
  return tt("div", ke({}, fn(t, "valueContainer", {
    "value-container": !0,
    "value-container--is-multi": i,
    "value-container--has-value": a
  }), r), n);
}, NE = function() {
  return {
    alignItems: "center",
    alignSelf: "stretch",
    display: "flex",
    flexShrink: 0
  };
}, GE = function(t) {
  var n = t.children, r = t.innerProps;
  return tt("div", ke({}, fn(t, "indicatorsContainer", {
    indicators: !0
  }), r), n);
}, sp, _E = ["size"], ME = ["innerProps", "isRtl", "size"];
function VE() {
  return "You have tried to stringify object returned from `css` function. It isn't supposed to be used directly (e.g. as value of the `className` prop), but rather handed to emotion so it can handle it (e.g. as value of `css` prop).";
}
var LE = Uu.NODE_ENV === "production" ? {
  name: "8mmkcg",
  styles: "display:inline-block;fill:currentColor;line-height:1;stroke:currentColor;stroke-width:0"
} : {
  name: "tj5bde-Svg",
  styles: "display:inline-block;fill:currentColor;line-height:1;stroke:currentColor;stroke-width:0;label:Svg;",
  map: "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImluZGljYXRvcnMudHN4Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQXlCSSIsImZpbGUiOiJpbmRpY2F0b3JzLnRzeCIsInNvdXJjZXNDb250ZW50IjpbIi8qKiBAanN4IGpzeCAqL1xuaW1wb3J0IHsgSlNYLCBSZWFjdE5vZGUgfSBmcm9tICdyZWFjdCc7XG5pbXBvcnQgeyBqc3gsIGtleWZyYW1lcyB9IGZyb20gJ0BlbW90aW9uL3JlYWN0JztcblxuaW1wb3J0IHtcbiAgQ29tbW9uUHJvcHNBbmRDbGFzc05hbWUsXG4gIENTU09iamVjdFdpdGhMYWJlbCxcbiAgR3JvdXBCYXNlLFxufSBmcm9tICcuLi90eXBlcyc7XG5pbXBvcnQgeyBnZXRTdHlsZVByb3BzIH0gZnJvbSAnLi4vdXRpbHMnO1xuXG4vLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbi8vIERyb3Bkb3duICYgQ2xlYXIgSWNvbnNcbi8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuXG5jb25zdCBTdmcgPSAoe1xuICBzaXplLFxuICAuLi5wcm9wc1xufTogSlNYLkludHJpbnNpY0VsZW1lbnRzWydzdmcnXSAmIHsgc2l6ZTogbnVtYmVyIH0pID0+IChcbiAgPHN2Z1xuICAgIGhlaWdodD17c2l6ZX1cbiAgICB3aWR0aD17c2l6ZX1cbiAgICB2aWV3Qm94PVwiMCAwIDIwIDIwXCJcbiAgICBhcmlhLWhpZGRlbj1cInRydWVcIlxuICAgIGZvY3VzYWJsZT1cImZhbHNlXCJcbiAgICBjc3M9e3tcbiAgICAgIGRpc3BsYXk6ICdpbmxpbmUtYmxvY2snLFxuICAgICAgZmlsbDogJ2N1cnJlbnRDb2xvcicsXG4gICAgICBsaW5lSGVpZ2h0OiAxLFxuICAgICAgc3Ryb2tlOiAnY3VycmVudENvbG9yJyxcbiAgICAgIHN0cm9rZVdpZHRoOiAwLFxuICAgIH19XG4gICAgey4uLnByb3BzfVxuICAvPlxuKTtcblxuZXhwb3J0IHR5cGUgQ3Jvc3NJY29uUHJvcHMgPSBKU1guSW50cmluc2ljRWxlbWVudHNbJ3N2ZyddICYgeyBzaXplPzogbnVtYmVyIH07XG5leHBvcnQgY29uc3QgQ3Jvc3NJY29uID0gKHByb3BzOiBDcm9zc0ljb25Qcm9wcykgPT4gKFxuICA8U3ZnIHNpemU9ezIwfSB7Li4ucHJvcHN9PlxuICAgIDxwYXRoIGQ9XCJNMTQuMzQ4IDE0Ljg0OWMtMC40NjkgMC40NjktMS4yMjkgMC40NjktMS42OTcgMGwtMi42NTEtMy4wMzAtMi42NTEgMy4wMjljLTAuNDY5IDAuNDY5LTEuMjI5IDAuNDY5LTEuNjk3IDAtMC40NjktMC40NjktMC40NjktMS4yMjkgMC0xLjY5N2wyLjc1OC0zLjE1LTIuNzU5LTMuMTUyYy0wLjQ2OS0wLjQ2OS0wLjQ2OS0xLjIyOCAwLTEuNjk3czEuMjI4LTAuNDY5IDEuNjk3IDBsMi42NTIgMy4wMzEgMi42NTEtMy4wMzFjMC40NjktMC40NjkgMS4yMjgtMC40NjkgMS42OTcgMHMwLjQ2OSAxLjIyOSAwIDEuNjk3bC0yLjc1OCAzLjE1MiAyLjc1OCAzLjE1YzAuNDY5IDAuNDY5IDAuNDY5IDEuMjI5IDAgMS42OTh6XCIgLz5cbiAgPC9Tdmc+XG4pO1xuZXhwb3J0IHR5cGUgRG93bkNoZXZyb25Qcm9wcyA9IEpTWC5JbnRyaW5zaWNFbGVtZW50c1snc3ZnJ10gJiB7IHNpemU/OiBudW1iZXIgfTtcbmV4cG9ydCBjb25zdCBEb3duQ2hldnJvbiA9IChwcm9wczogRG93bkNoZXZyb25Qcm9wcykgPT4gKFxuICA8U3ZnIHNpemU9ezIwfSB7Li4ucHJvcHN9PlxuICAgIDxwYXRoIGQ9XCJNNC41MTYgNy41NDhjMC40MzYtMC40NDYgMS4wNDMtMC40ODEgMS41NzYgMGwzLjkwOCAzLjc0NyAzLjkwOC0zLjc0N2MwLjUzMy0wLjQ4MSAxLjE0MS0wLjQ0NiAxLjU3NCAwIDAuNDM2IDAuNDQ1IDAuNDA4IDEuMTk3IDAgMS42MTUtMC40MDYgMC40MTgtNC42OTUgNC41MDItNC42OTUgNC41MDItMC4yMTcgMC4yMjMtMC41MDIgMC4zMzUtMC43ODcgMC4zMzVzLTAuNTctMC4xMTItMC43ODktMC4zMzVjMCAwLTQuMjg3LTQuMDg0LTQuNjk1LTQuNTAycy0wLjQzNi0xLjE3IDAtMS42MTV6XCIgLz5cbiAgPC9Tdmc+XG4pO1xuXG4vLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbi8vIERyb3Bkb3duICYgQ2xlYXIgQnV0dG9uc1xuLy8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG5cbmV4cG9ydCBpbnRlcmZhY2UgRHJvcGRvd25JbmRpY2F0b3JQcm9wczxcbiAgT3B0aW9uID0gdW5rbm93bixcbiAgSXNNdWx0aSBleHRlbmRzIGJvb2xlYW4gPSBib29sZWFuLFxuICBHcm91cCBleHRlbmRzIEdyb3VwQmFzZTxPcHRpb24+ID0gR3JvdXBCYXNlPE9wdGlvbj5cbj4gZXh0ZW5kcyBDb21tb25Qcm9wc0FuZENsYXNzTmFtZTxPcHRpb24sIElzTXVsdGksIEdyb3VwPiB7XG4gIC8qKiBUaGUgY2hpbGRyZW4gdG8gYmUgcmVuZGVyZWQgaW5zaWRlIHRoZSBpbmRpY2F0b3IuICovXG4gIGNoaWxkcmVuPzogUmVhY3ROb2RlO1xuICAvKiogUHJvcHMgdGhhdCB3aWxsIGJlIHBhc3NlZCBvbiB0byB0aGUgY2hpbGRyZW4uICovXG4gIGlubmVyUHJvcHM6IEpTWC5JbnRyaW5zaWNFbGVtZW50c1snZGl2J107XG4gIC8qKiBUaGUgZm9jdXNlZCBzdGF0ZSBvZiB0aGUgc2VsZWN0LiAqL1xuICBpc0ZvY3VzZWQ6IGJvb2xlYW47XG4gIGlzRGlzYWJsZWQ6IGJvb2xlYW47XG59XG5cbmNvbnN0IGJhc2VDU1MgPSA8XG4gIE9wdGlvbixcbiAgSXNNdWx0aSBleHRlbmRzIGJvb2xlYW4sXG4gIEdyb3VwIGV4dGVuZHMgR3JvdXBCYXNlPE9wdGlvbj5cbj4oXG4gIHtcbiAgICBpc0ZvY3VzZWQsXG4gICAgdGhlbWU6IHtcbiAgICAgIHNwYWNpbmc6IHsgYmFzZVVuaXQgfSxcbiAgICAgIGNvbG9ycyxcbiAgICB9LFxuICB9OlxuICAgIHwgRHJvcGRvd25JbmRpY2F0b3JQcm9wczxPcHRpb24sIElzTXVsdGksIEdyb3VwPlxuICAgIHwgQ2xlYXJJbmRpY2F0b3JQcm9wczxPcHRpb24sIElzTXVsdGksIEdyb3VwPixcbiAgdW5zdHlsZWQ6IGJvb2xlYW5cbik6IENTU09iamVjdFdpdGhMYWJlbCA9PiAoe1xuICBsYWJlbDogJ2luZGljYXRvckNvbnRhaW5lcicsXG4gIGRpc3BsYXk6ICdmbGV4JyxcbiAgdHJhbnNpdGlvbjogJ2NvbG9yIDE1MG1zJyxcbiAgLi4uKHVuc3R5bGVkXG4gICAgPyB7fVxuICAgIDoge1xuICAgICAgICBjb2xvcjogaXNGb2N1c2VkID8gY29sb3JzLm5ldXRyYWw2MCA6IGNvbG9ycy5uZXV0cmFsMjAsXG4gICAgICAgIHBhZGRpbmc6IGJhc2VVbml0ICogMixcbiAgICAgICAgJzpob3Zlcic6IHtcbiAgICAgICAgICBjb2xvcjogaXNGb2N1c2VkID8gY29sb3JzLm5ldXRyYWw4MCA6IGNvbG9ycy5uZXV0cmFsNDAsXG4gICAgICAgIH0sXG4gICAgICB9KSxcbn0pO1xuXG5leHBvcnQgY29uc3QgZHJvcGRvd25JbmRpY2F0b3JDU1MgPSBiYXNlQ1NTO1xuZXhwb3J0IGNvbnN0IERyb3Bkb3duSW5kaWNhdG9yID0gPFxuICBPcHRpb24sXG4gIElzTXVsdGkgZXh0ZW5kcyBib29sZWFuLFxuICBHcm91cCBleHRlbmRzIEdyb3VwQmFzZTxPcHRpb24+XG4+KFxuICBwcm9wczogRHJvcGRvd25JbmRpY2F0b3JQcm9wczxPcHRpb24sIElzTXVsdGksIEdyb3VwPlxuKSA9PiB7XG4gIGNvbnN0IHsgY2hpbGRyZW4sIGlubmVyUHJvcHMgfSA9IHByb3BzO1xuICByZXR1cm4gKFxuICAgIDxkaXZcbiAgICAgIHsuLi5nZXRTdHlsZVByb3BzKHByb3BzLCAnZHJvcGRvd25JbmRpY2F0b3InLCB7XG4gICAgICAgIGluZGljYXRvcjogdHJ1ZSxcbiAgICAgICAgJ2Ryb3Bkb3duLWluZGljYXRvcic6IHRydWUsXG4gICAgICB9KX1cbiAgICAgIHsuLi5pbm5lclByb3BzfVxuICAgID5cbiAgICAgIHtjaGlsZHJlbiB8fCA8RG93bkNoZXZyb24gLz59XG4gICAgPC9kaXY+XG4gICk7XG59O1xuXG5leHBvcnQgaW50ZXJmYWNlIENsZWFySW5kaWNhdG9yUHJvcHM8XG4gIE9wdGlvbiA9IHVua25vd24sXG4gIElzTXVsdGkgZXh0ZW5kcyBib29sZWFuID0gYm9vbGVhbixcbiAgR3JvdXAgZXh0ZW5kcyBHcm91cEJhc2U8T3B0aW9uPiA9IEdyb3VwQmFzZTxPcHRpb24+XG4+IGV4dGVuZHMgQ29tbW9uUHJvcHNBbmRDbGFzc05hbWU8T3B0aW9uLCBJc011bHRpLCBHcm91cD4ge1xuICAvKiogVGhlIGNoaWxkcmVuIHRvIGJlIHJlbmRlcmVkIGluc2lkZSB0aGUgaW5kaWNhdG9yLiAqL1xuICBjaGlsZHJlbj86IFJlYWN0Tm9kZTtcbiAgLyoqIFByb3BzIHRoYXQgd2lsbCBiZSBwYXNzZWQgb24gdG8gdGhlIGNoaWxkcmVuLiAqL1xuICBpbm5lclByb3BzOiBKU1guSW50cmluc2ljRWxlbWVudHNbJ2RpdiddO1xuICAvKiogVGhlIGZvY3VzZWQgc3RhdGUgb2YgdGhlIHNlbGVjdC4gKi9cbiAgaXNGb2N1c2VkOiBib29sZWFuO1xufVxuXG5leHBvcnQgY29uc3QgY2xlYXJJbmRpY2F0b3JDU1MgPSBiYXNlQ1NTO1xuZXhwb3J0IGNvbnN0IENsZWFySW5kaWNhdG9yID0gPFxuICBPcHRpb24sXG4gIElzTXVsdGkgZXh0ZW5kcyBib29sZWFuLFxuICBHcm91cCBleHRlbmRzIEdyb3VwQmFzZTxPcHRpb24+XG4+KFxuICBwcm9wczogQ2xlYXJJbmRpY2F0b3JQcm9wczxPcHRpb24sIElzTXVsdGksIEdyb3VwPlxuKSA9PiB7XG4gIGNvbnN0IHsgY2hpbGRyZW4sIGlubmVyUHJvcHMgfSA9IHByb3BzO1xuICByZXR1cm4gKFxuICAgIDxkaXZcbiAgICAgIHsuLi5nZXRTdHlsZVByb3BzKHByb3BzLCAnY2xlYXJJbmRpY2F0b3InLCB7XG4gICAgICAgIGluZGljYXRvcjogdHJ1ZSxcbiAgICAgICAgJ2NsZWFyLWluZGljYXRvcic6IHRydWUsXG4gICAgICB9KX1cbiAgICAgIHsuLi5pbm5lclByb3BzfVxuICAgID5cbiAgICAgIHtjaGlsZHJlbiB8fCA8Q3Jvc3NJY29uIC8+fVxuICAgIDwvZGl2PlxuICApO1xufTtcblxuLy8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG4vLyBTZXBhcmF0b3Jcbi8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuXG5leHBvcnQgaW50ZXJmYWNlIEluZGljYXRvclNlcGFyYXRvclByb3BzPFxuICBPcHRpb24gPSB1bmtub3duLFxuICBJc011bHRpIGV4dGVuZHMgYm9vbGVhbiA9IGJvb2xlYW4sXG4gIEdyb3VwIGV4dGVuZHMgR3JvdXBCYXNlPE9wdGlvbj4gPSBHcm91cEJhc2U8T3B0aW9uPlxuPiBleHRlbmRzIENvbW1vblByb3BzQW5kQ2xhc3NOYW1lPE9wdGlvbiwgSXNNdWx0aSwgR3JvdXA+IHtcbiAgaXNEaXNhYmxlZDogYm9vbGVhbjtcbiAgaXNGb2N1c2VkOiBib29sZWFuO1xuICBpbm5lclByb3BzPzogSlNYLkludHJpbnNpY0VsZW1lbnRzWydzcGFuJ107XG59XG5cbmV4cG9ydCBjb25zdCBpbmRpY2F0b3JTZXBhcmF0b3JDU1MgPSA8XG4gIE9wdGlvbixcbiAgSXNNdWx0aSBleHRlbmRzIGJvb2xlYW4sXG4gIEdyb3VwIGV4dGVuZHMgR3JvdXBCYXNlPE9wdGlvbj5cbj4oXG4gIHtcbiAgICBpc0Rpc2FibGVkLFxuICAgIHRoZW1lOiB7XG4gICAgICBzcGFjaW5nOiB7IGJhc2VVbml0IH0sXG4gICAgICBjb2xvcnMsXG4gICAgfSxcbiAgfTogSW5kaWNhdG9yU2VwYXJhdG9yUHJvcHM8T3B0aW9uLCBJc011bHRpLCBHcm91cD4sXG4gIHVuc3R5bGVkOiBib29sZWFuXG4pOiBDU1NPYmplY3RXaXRoTGFiZWwgPT4gKHtcbiAgbGFiZWw6ICdpbmRpY2F0b3JTZXBhcmF0b3InLFxuICBhbGlnblNlbGY6ICdzdHJldGNoJyxcbiAgd2lkdGg6IDEsXG4gIC4uLih1bnN0eWxlZFxuICAgID8ge31cbiAgICA6IHtcbiAgICAgICAgYmFja2dyb3VuZENvbG9yOiBpc0Rpc2FibGVkID8gY29sb3JzLm5ldXRyYWwxMCA6IGNvbG9ycy5uZXV0cmFsMjAsXG4gICAgICAgIG1hcmdpbkJvdHRvbTogYmFzZVVuaXQgKiAyLFxuICAgICAgICBtYXJnaW5Ub3A6IGJhc2VVbml0ICogMixcbiAgICAgIH0pLFxufSk7XG5cbmV4cG9ydCBjb25zdCBJbmRpY2F0b3JTZXBhcmF0b3IgPSA8XG4gIE9wdGlvbixcbiAgSXNNdWx0aSBleHRlbmRzIGJvb2xlYW4sXG4gIEdyb3VwIGV4dGVuZHMgR3JvdXBCYXNlPE9wdGlvbj5cbj4oXG4gIHByb3BzOiBJbmRpY2F0b3JTZXBhcmF0b3JQcm9wczxPcHRpb24sIElzTXVsdGksIEdyb3VwPlxuKSA9PiB7XG4gIGNvbnN0IHsgaW5uZXJQcm9wcyB9ID0gcHJvcHM7XG4gIHJldHVybiAoXG4gICAgPHNwYW5cbiAgICAgIHsuLi5pbm5lclByb3BzfVxuICAgICAgey4uLmdldFN0eWxlUHJvcHMocHJvcHMsICdpbmRpY2F0b3JTZXBhcmF0b3InLCB7XG4gICAgICAgICdpbmRpY2F0b3Itc2VwYXJhdG9yJzogdHJ1ZSxcbiAgICAgIH0pfVxuICAgIC8+XG4gICk7XG59O1xuXG4vLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbi8vIExvYWRpbmdcbi8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuXG5jb25zdCBsb2FkaW5nRG90QW5pbWF0aW9ucyA9IGtleWZyYW1lc2BcbiAgMCUsIDgwJSwgMTAwJSB7IG9wYWNpdHk6IDA7IH1cbiAgNDAlIHsgb3BhY2l0eTogMTsgfVxuYDtcblxuZXhwb3J0IGNvbnN0IGxvYWRpbmdJbmRpY2F0b3JDU1MgPSA8XG4gIE9wdGlvbixcbiAgSXNNdWx0aSBleHRlbmRzIGJvb2xlYW4sXG4gIEdyb3VwIGV4dGVuZHMgR3JvdXBCYXNlPE9wdGlvbj5cbj4oXG4gIHtcbiAgICBpc0ZvY3VzZWQsXG4gICAgc2l6ZSxcbiAgICB0aGVtZToge1xuICAgICAgY29sb3JzLFxuICAgICAgc3BhY2luZzogeyBiYXNlVW5pdCB9LFxuICAgIH0sXG4gIH06IExvYWRpbmdJbmRpY2F0b3JQcm9wczxPcHRpb24sIElzTXVsdGksIEdyb3VwPixcbiAgdW5zdHlsZWQ6IGJvb2xlYW5cbik6IENTU09iamVjdFdpdGhMYWJlbCA9PiAoe1xuICBsYWJlbDogJ2xvYWRpbmdJbmRpY2F0b3InLFxuICBkaXNwbGF5OiAnZmxleCcsXG4gIHRyYW5zaXRpb246ICdjb2xvciAxNTBtcycsXG4gIGFsaWduU2VsZjogJ2NlbnRlcicsXG4gIGZvbnRTaXplOiBzaXplLFxuICBsaW5lSGVpZ2h0OiAxLFxuICBtYXJnaW5SaWdodDogc2l6ZSxcbiAgdGV4dEFsaWduOiAnY2VudGVyJyxcbiAgdmVydGljYWxBbGlnbjogJ21pZGRsZScsXG4gIC4uLih1bnN0eWxlZFxuICAgID8ge31cbiAgICA6IHtcbiAgICAgICAgY29sb3I6IGlzRm9jdXNlZCA/IGNvbG9ycy5uZXV0cmFsNjAgOiBjb2xvcnMubmV1dHJhbDIwLFxuICAgICAgICBwYWRkaW5nOiBiYXNlVW5pdCAqIDIsXG4gICAgICB9KSxcbn0pO1xuXG5pbnRlcmZhY2UgTG9hZGluZ0RvdFByb3BzIHtcbiAgZGVsYXk6IG51bWJlcjtcbiAgb2Zmc2V0OiBib29sZWFuO1xufVxuY29uc3QgTG9hZGluZ0RvdCA9ICh7IGRlbGF5LCBvZmZzZXQgfTogTG9hZGluZ0RvdFByb3BzKSA9PiAoXG4gIDxzcGFuXG4gICAgY3NzPXt7XG4gICAgICBhbmltYXRpb246IGAke2xvYWRpbmdEb3RBbmltYXRpb25zfSAxcyBlYXNlLWluLW91dCAke2RlbGF5fW1zIGluZmluaXRlO2AsXG4gICAgICBiYWNrZ3JvdW5kQ29sb3I6ICdjdXJyZW50Q29sb3InLFxuICAgICAgYm9yZGVyUmFkaXVzOiAnMWVtJyxcbiAgICAgIGRpc3BsYXk6ICdpbmxpbmUtYmxvY2snLFxuICAgICAgbWFyZ2luTGVmdDogb2Zmc2V0ID8gJzFlbScgOiB1bmRlZmluZWQsXG4gICAgICBoZWlnaHQ6ICcxZW0nLFxuICAgICAgdmVydGljYWxBbGlnbjogJ3RvcCcsXG4gICAgICB3aWR0aDogJzFlbScsXG4gICAgfX1cbiAgLz5cbik7XG5cbmV4cG9ydCBpbnRlcmZhY2UgTG9hZGluZ0luZGljYXRvclByb3BzPFxuICBPcHRpb24gPSB1bmtub3duLFxuICBJc011bHRpIGV4dGVuZHMgYm9vbGVhbiA9IGJvb2xlYW4sXG4gIEdyb3VwIGV4dGVuZHMgR3JvdXBCYXNlPE9wdGlvbj4gPSBHcm91cEJhc2U8T3B0aW9uPlxuPiBleHRlbmRzIENvbW1vblByb3BzQW5kQ2xhc3NOYW1lPE9wdGlvbiwgSXNNdWx0aSwgR3JvdXA+IHtcbiAgLyoqIFByb3BzIHRoYXQgd2lsbCBiZSBwYXNzZWQgb24gdG8gdGhlIGNoaWxkcmVuLiAqL1xuICBpbm5lclByb3BzOiBKU1guSW50cmluc2ljRWxlbWVudHNbJ2RpdiddO1xuICAvKiogVGhlIGZvY3VzZWQgc3RhdGUgb2YgdGhlIHNlbGVjdC4gKi9cbiAgaXNGb2N1c2VkOiBib29sZWFuO1xuICBpc0Rpc2FibGVkOiBib29sZWFuO1xuICAvKiogU2V0IHNpemUgb2YgdGhlIGNvbnRhaW5lci4gKi9cbiAgc2l6ZTogbnVtYmVyO1xufVxuZXhwb3J0IGNvbnN0IExvYWRpbmdJbmRpY2F0b3IgPSA8XG4gIE9wdGlvbixcbiAgSXNNdWx0aSBleHRlbmRzIGJvb2xlYW4sXG4gIEdyb3VwIGV4dGVuZHMgR3JvdXBCYXNlPE9wdGlvbj5cbj4oe1xuICBpbm5lclByb3BzLFxuICBpc1J0bCxcbiAgc2l6ZSA9IDQsXG4gIC4uLnJlc3RQcm9wc1xufTogTG9hZGluZ0luZGljYXRvclByb3BzPE9wdGlvbiwgSXNNdWx0aSwgR3JvdXA+KSA9PiB7XG4gIHJldHVybiAoXG4gICAgPGRpdlxuICAgICAgey4uLmdldFN0eWxlUHJvcHMoXG4gICAgICAgIHsgLi4ucmVzdFByb3BzLCBpbm5lclByb3BzLCBpc1J0bCwgc2l6ZSB9LFxuICAgICAgICAnbG9hZGluZ0luZGljYXRvcicsXG4gICAgICAgIHtcbiAgICAgICAgICBpbmRpY2F0b3I6IHRydWUsXG4gICAgICAgICAgJ2xvYWRpbmctaW5kaWNhdG9yJzogdHJ1ZSxcbiAgICAgICAgfVxuICAgICAgKX1cbiAgICAgIHsuLi5pbm5lclByb3BzfVxuICAgID5cbiAgICAgIDxMb2FkaW5nRG90IGRlbGF5PXswfSBvZmZzZXQ9e2lzUnRsfSAvPlxuICAgICAgPExvYWRpbmdEb3QgZGVsYXk9ezE2MH0gb2Zmc2V0IC8+XG4gICAgICA8TG9hZGluZ0RvdCBkZWxheT17MzIwfSBvZmZzZXQ9eyFpc1J0bH0gLz5cbiAgICA8L2Rpdj5cbiAgKTtcbn07XG4iXX0= */",
  toString: VE
}, Tm = function(t) {
  var n = t.size, r = Gr(t, _E);
  return tt("svg", ke({
    height: n,
    width: n,
    viewBox: "0 0 20 20",
    "aria-hidden": "true",
    focusable: "false",
    css: LE
  }, r));
}, qc = function(t) {
  return tt(Tm, ke({
    size: 20
  }, t), tt("path", {
    d: "M14.348 14.849c-0.469 0.469-1.229 0.469-1.697 0l-2.651-3.030-2.651 3.029c-0.469 0.469-1.229 0.469-1.697 0-0.469-0.469-0.469-1.229 0-1.697l2.758-3.15-2.759-3.152c-0.469-0.469-0.469-1.228 0-1.697s1.228-0.469 1.697 0l2.652 3.031 2.651-3.031c0.469-0.469 1.228-0.469 1.697 0s0.469 1.229 0 1.697l-2.758 3.152 2.758 3.15c0.469 0.469 0.469 1.229 0 1.698z"
  }));
}, km = function(t) {
  return tt(Tm, ke({
    size: 20
  }, t), tt("path", {
    d: "M4.516 7.548c0.436-0.446 1.043-0.481 1.576 0l3.908 3.747 3.908-3.747c0.533-0.481 1.141-0.446 1.574 0 0.436 0.445 0.408 1.197 0 1.615-0.406 0.418-4.695 4.502-4.695 4.502-0.217 0.223-0.502 0.335-0.787 0.335s-0.57-0.112-0.789-0.335c0 0-4.287-4.084-4.695-4.502s-0.436-1.17 0-1.615z"
  }));
}, Om = function(t, n) {
  var r = t.isFocused, i = t.theme, a = i.spacing.baseUnit, o = i.colors;
  return st({
    label: "indicatorContainer",
    display: "flex",
    transition: "color 150ms"
  }, n ? {} : {
    color: r ? o.neutral60 : o.neutral20,
    padding: a * 2,
    ":hover": {
      color: r ? o.neutral80 : o.neutral40
    }
  });
}, DE = Om, jE = function(t) {
  var n = t.children, r = t.innerProps;
  return tt("div", ke({}, fn(t, "dropdownIndicator", {
    indicator: !0,
    "dropdown-indicator": !0
  }), r), n || tt(km, null));
}, zE = Om, HE = function(t) {
  var n = t.children, r = t.innerProps;
  return tt("div", ke({}, fn(t, "clearIndicator", {
    indicator: !0,
    "clear-indicator": !0
  }), r), n || tt(qc, null));
}, WE = function(t, n) {
  var r = t.isDisabled, i = t.theme, a = i.spacing.baseUnit, o = i.colors;
  return st({
    label: "indicatorSeparator",
    alignSelf: "stretch",
    width: 1
  }, n ? {} : {
    backgroundColor: r ? o.neutral10 : o.neutral20,
    marginBottom: a * 2,
    marginTop: a * 2
  });
}, $E = function(t) {
  var n = t.innerProps;
  return tt("span", ke({}, n, fn(t, "indicatorSeparator", {
    "indicator-separator": !0
  })));
}, XE = DR(sp || (sp = jR([`
  0%, 80%, 100% { opacity: 0; }
  40% { opacity: 1; }
`]))), YE = function(t, n) {
  var r = t.isFocused, i = t.size, a = t.theme, o = a.colors, l = a.spacing.baseUnit;
  return st({
    label: "loadingIndicator",
    display: "flex",
    transition: "color 150ms",
    alignSelf: "center",
    fontSize: i,
    lineHeight: 1,
    marginRight: i,
    textAlign: "center",
    verticalAlign: "middle"
  }, n ? {} : {
    color: r ? o.neutral60 : o.neutral20,
    padding: l * 2
  });
}, lu = function(t) {
  var n = t.delay, r = t.offset;
  return tt("span", {
    css: /* @__PURE__ */ Yc({
      animation: "".concat(XE, " 1s ease-in-out ").concat(n, "ms infinite;"),
      backgroundColor: "currentColor",
      borderRadius: "1em",
      display: "inline-block",
      marginLeft: r ? "1em" : void 0,
      height: "1em",
      verticalAlign: "top",
      width: "1em"
    }, Uu.NODE_ENV === "production" ? "" : ";label:LoadingDot;", Uu.NODE_ENV === "production" ? "" : "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImluZGljYXRvcnMudHN4Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQW1RSSIsImZpbGUiOiJpbmRpY2F0b3JzLnRzeCIsInNvdXJjZXNDb250ZW50IjpbIi8qKiBAanN4IGpzeCAqL1xuaW1wb3J0IHsgSlNYLCBSZWFjdE5vZGUgfSBmcm9tICdyZWFjdCc7XG5pbXBvcnQgeyBqc3gsIGtleWZyYW1lcyB9IGZyb20gJ0BlbW90aW9uL3JlYWN0JztcblxuaW1wb3J0IHtcbiAgQ29tbW9uUHJvcHNBbmRDbGFzc05hbWUsXG4gIENTU09iamVjdFdpdGhMYWJlbCxcbiAgR3JvdXBCYXNlLFxufSBmcm9tICcuLi90eXBlcyc7XG5pbXBvcnQgeyBnZXRTdHlsZVByb3BzIH0gZnJvbSAnLi4vdXRpbHMnO1xuXG4vLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbi8vIERyb3Bkb3duICYgQ2xlYXIgSWNvbnNcbi8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuXG5jb25zdCBTdmcgPSAoe1xuICBzaXplLFxuICAuLi5wcm9wc1xufTogSlNYLkludHJpbnNpY0VsZW1lbnRzWydzdmcnXSAmIHsgc2l6ZTogbnVtYmVyIH0pID0+IChcbiAgPHN2Z1xuICAgIGhlaWdodD17c2l6ZX1cbiAgICB3aWR0aD17c2l6ZX1cbiAgICB2aWV3Qm94PVwiMCAwIDIwIDIwXCJcbiAgICBhcmlhLWhpZGRlbj1cInRydWVcIlxuICAgIGZvY3VzYWJsZT1cImZhbHNlXCJcbiAgICBjc3M9e3tcbiAgICAgIGRpc3BsYXk6ICdpbmxpbmUtYmxvY2snLFxuICAgICAgZmlsbDogJ2N1cnJlbnRDb2xvcicsXG4gICAgICBsaW5lSGVpZ2h0OiAxLFxuICAgICAgc3Ryb2tlOiAnY3VycmVudENvbG9yJyxcbiAgICAgIHN0cm9rZVdpZHRoOiAwLFxuICAgIH19XG4gICAgey4uLnByb3BzfVxuICAvPlxuKTtcblxuZXhwb3J0IHR5cGUgQ3Jvc3NJY29uUHJvcHMgPSBKU1guSW50cmluc2ljRWxlbWVudHNbJ3N2ZyddICYgeyBzaXplPzogbnVtYmVyIH07XG5leHBvcnQgY29uc3QgQ3Jvc3NJY29uID0gKHByb3BzOiBDcm9zc0ljb25Qcm9wcykgPT4gKFxuICA8U3ZnIHNpemU9ezIwfSB7Li4ucHJvcHN9PlxuICAgIDxwYXRoIGQ9XCJNMTQuMzQ4IDE0Ljg0OWMtMC40NjkgMC40NjktMS4yMjkgMC40NjktMS42OTcgMGwtMi42NTEtMy4wMzAtMi42NTEgMy4wMjljLTAuNDY5IDAuNDY5LTEuMjI5IDAuNDY5LTEuNjk3IDAtMC40NjktMC40NjktMC40NjktMS4yMjkgMC0xLjY5N2wyLjc1OC0zLjE1LTIuNzU5LTMuMTUyYy0wLjQ2OS0wLjQ2OS0wLjQ2OS0xLjIyOCAwLTEuNjk3czEuMjI4LTAuNDY5IDEuNjk3IDBsMi42NTIgMy4wMzEgMi42NTEtMy4wMzFjMC40NjktMC40NjkgMS4yMjgtMC40NjkgMS42OTcgMHMwLjQ2OSAxLjIyOSAwIDEuNjk3bC0yLjc1OCAzLjE1MiAyLjc1OCAzLjE1YzAuNDY5IDAuNDY5IDAuNDY5IDEuMjI5IDAgMS42OTh6XCIgLz5cbiAgPC9Tdmc+XG4pO1xuZXhwb3J0IHR5cGUgRG93bkNoZXZyb25Qcm9wcyA9IEpTWC5JbnRyaW5zaWNFbGVtZW50c1snc3ZnJ10gJiB7IHNpemU/OiBudW1iZXIgfTtcbmV4cG9ydCBjb25zdCBEb3duQ2hldnJvbiA9IChwcm9wczogRG93bkNoZXZyb25Qcm9wcykgPT4gKFxuICA8U3ZnIHNpemU9ezIwfSB7Li4ucHJvcHN9PlxuICAgIDxwYXRoIGQ9XCJNNC41MTYgNy41NDhjMC40MzYtMC40NDYgMS4wNDMtMC40ODEgMS41NzYgMGwzLjkwOCAzLjc0NyAzLjkwOC0zLjc0N2MwLjUzMy0wLjQ4MSAxLjE0MS0wLjQ0NiAxLjU3NCAwIDAuNDM2IDAuNDQ1IDAuNDA4IDEuMTk3IDAgMS42MTUtMC40MDYgMC40MTgtNC42OTUgNC41MDItNC42OTUgNC41MDItMC4yMTcgMC4yMjMtMC41MDIgMC4zMzUtMC43ODcgMC4zMzVzLTAuNTctMC4xMTItMC43ODktMC4zMzVjMCAwLTQuMjg3LTQuMDg0LTQuNjk1LTQuNTAycy0wLjQzNi0xLjE3IDAtMS42MTV6XCIgLz5cbiAgPC9Tdmc+XG4pO1xuXG4vLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbi8vIERyb3Bkb3duICYgQ2xlYXIgQnV0dG9uc1xuLy8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG5cbmV4cG9ydCBpbnRlcmZhY2UgRHJvcGRvd25JbmRpY2F0b3JQcm9wczxcbiAgT3B0aW9uID0gdW5rbm93bixcbiAgSXNNdWx0aSBleHRlbmRzIGJvb2xlYW4gPSBib29sZWFuLFxuICBHcm91cCBleHRlbmRzIEdyb3VwQmFzZTxPcHRpb24+ID0gR3JvdXBCYXNlPE9wdGlvbj5cbj4gZXh0ZW5kcyBDb21tb25Qcm9wc0FuZENsYXNzTmFtZTxPcHRpb24sIElzTXVsdGksIEdyb3VwPiB7XG4gIC8qKiBUaGUgY2hpbGRyZW4gdG8gYmUgcmVuZGVyZWQgaW5zaWRlIHRoZSBpbmRpY2F0b3IuICovXG4gIGNoaWxkcmVuPzogUmVhY3ROb2RlO1xuICAvKiogUHJvcHMgdGhhdCB3aWxsIGJlIHBhc3NlZCBvbiB0byB0aGUgY2hpbGRyZW4uICovXG4gIGlubmVyUHJvcHM6IEpTWC5JbnRyaW5zaWNFbGVtZW50c1snZGl2J107XG4gIC8qKiBUaGUgZm9jdXNlZCBzdGF0ZSBvZiB0aGUgc2VsZWN0LiAqL1xuICBpc0ZvY3VzZWQ6IGJvb2xlYW47XG4gIGlzRGlzYWJsZWQ6IGJvb2xlYW47XG59XG5cbmNvbnN0IGJhc2VDU1MgPSA8XG4gIE9wdGlvbixcbiAgSXNNdWx0aSBleHRlbmRzIGJvb2xlYW4sXG4gIEdyb3VwIGV4dGVuZHMgR3JvdXBCYXNlPE9wdGlvbj5cbj4oXG4gIHtcbiAgICBpc0ZvY3VzZWQsXG4gICAgdGhlbWU6IHtcbiAgICAgIHNwYWNpbmc6IHsgYmFzZVVuaXQgfSxcbiAgICAgIGNvbG9ycyxcbiAgICB9LFxuICB9OlxuICAgIHwgRHJvcGRvd25JbmRpY2F0b3JQcm9wczxPcHRpb24sIElzTXVsdGksIEdyb3VwPlxuICAgIHwgQ2xlYXJJbmRpY2F0b3JQcm9wczxPcHRpb24sIElzTXVsdGksIEdyb3VwPixcbiAgdW5zdHlsZWQ6IGJvb2xlYW5cbik6IENTU09iamVjdFdpdGhMYWJlbCA9PiAoe1xuICBsYWJlbDogJ2luZGljYXRvckNvbnRhaW5lcicsXG4gIGRpc3BsYXk6ICdmbGV4JyxcbiAgdHJhbnNpdGlvbjogJ2NvbG9yIDE1MG1zJyxcbiAgLi4uKHVuc3R5bGVkXG4gICAgPyB7fVxuICAgIDoge1xuICAgICAgICBjb2xvcjogaXNGb2N1c2VkID8gY29sb3JzLm5ldXRyYWw2MCA6IGNvbG9ycy5uZXV0cmFsMjAsXG4gICAgICAgIHBhZGRpbmc6IGJhc2VVbml0ICogMixcbiAgICAgICAgJzpob3Zlcic6IHtcbiAgICAgICAgICBjb2xvcjogaXNGb2N1c2VkID8gY29sb3JzLm5ldXRyYWw4MCA6IGNvbG9ycy5uZXV0cmFsNDAsXG4gICAgICAgIH0sXG4gICAgICB9KSxcbn0pO1xuXG5leHBvcnQgY29uc3QgZHJvcGRvd25JbmRpY2F0b3JDU1MgPSBiYXNlQ1NTO1xuZXhwb3J0IGNvbnN0IERyb3Bkb3duSW5kaWNhdG9yID0gPFxuICBPcHRpb24sXG4gIElzTXVsdGkgZXh0ZW5kcyBib29sZWFuLFxuICBHcm91cCBleHRlbmRzIEdyb3VwQmFzZTxPcHRpb24+XG4+KFxuICBwcm9wczogRHJvcGRvd25JbmRpY2F0b3JQcm9wczxPcHRpb24sIElzTXVsdGksIEdyb3VwPlxuKSA9PiB7XG4gIGNvbnN0IHsgY2hpbGRyZW4sIGlubmVyUHJvcHMgfSA9IHByb3BzO1xuICByZXR1cm4gKFxuICAgIDxkaXZcbiAgICAgIHsuLi5nZXRTdHlsZVByb3BzKHByb3BzLCAnZHJvcGRvd25JbmRpY2F0b3InLCB7XG4gICAgICAgIGluZGljYXRvcjogdHJ1ZSxcbiAgICAgICAgJ2Ryb3Bkb3duLWluZGljYXRvcic6IHRydWUsXG4gICAgICB9KX1cbiAgICAgIHsuLi5pbm5lclByb3BzfVxuICAgID5cbiAgICAgIHtjaGlsZHJlbiB8fCA8RG93bkNoZXZyb24gLz59XG4gICAgPC9kaXY+XG4gICk7XG59O1xuXG5leHBvcnQgaW50ZXJmYWNlIENsZWFySW5kaWNhdG9yUHJvcHM8XG4gIE9wdGlvbiA9IHVua25vd24sXG4gIElzTXVsdGkgZXh0ZW5kcyBib29sZWFuID0gYm9vbGVhbixcbiAgR3JvdXAgZXh0ZW5kcyBHcm91cEJhc2U8T3B0aW9uPiA9IEdyb3VwQmFzZTxPcHRpb24+XG4+IGV4dGVuZHMgQ29tbW9uUHJvcHNBbmRDbGFzc05hbWU8T3B0aW9uLCBJc011bHRpLCBHcm91cD4ge1xuICAvKiogVGhlIGNoaWxkcmVuIHRvIGJlIHJlbmRlcmVkIGluc2lkZSB0aGUgaW5kaWNhdG9yLiAqL1xuICBjaGlsZHJlbj86IFJlYWN0Tm9kZTtcbiAgLyoqIFByb3BzIHRoYXQgd2lsbCBiZSBwYXNzZWQgb24gdG8gdGhlIGNoaWxkcmVuLiAqL1xuICBpbm5lclByb3BzOiBKU1guSW50cmluc2ljRWxlbWVudHNbJ2RpdiddO1xuICAvKiogVGhlIGZvY3VzZWQgc3RhdGUgb2YgdGhlIHNlbGVjdC4gKi9cbiAgaXNGb2N1c2VkOiBib29sZWFuO1xufVxuXG5leHBvcnQgY29uc3QgY2xlYXJJbmRpY2F0b3JDU1MgPSBiYXNlQ1NTO1xuZXhwb3J0IGNvbnN0IENsZWFySW5kaWNhdG9yID0gPFxuICBPcHRpb24sXG4gIElzTXVsdGkgZXh0ZW5kcyBib29sZWFuLFxuICBHcm91cCBleHRlbmRzIEdyb3VwQmFzZTxPcHRpb24+XG4+KFxuICBwcm9wczogQ2xlYXJJbmRpY2F0b3JQcm9wczxPcHRpb24sIElzTXVsdGksIEdyb3VwPlxuKSA9PiB7XG4gIGNvbnN0IHsgY2hpbGRyZW4sIGlubmVyUHJvcHMgfSA9IHByb3BzO1xuICByZXR1cm4gKFxuICAgIDxkaXZcbiAgICAgIHsuLi5nZXRTdHlsZVByb3BzKHByb3BzLCAnY2xlYXJJbmRpY2F0b3InLCB7XG4gICAgICAgIGluZGljYXRvcjogdHJ1ZSxcbiAgICAgICAgJ2NsZWFyLWluZGljYXRvcic6IHRydWUsXG4gICAgICB9KX1cbiAgICAgIHsuLi5pbm5lclByb3BzfVxuICAgID5cbiAgICAgIHtjaGlsZHJlbiB8fCA8Q3Jvc3NJY29uIC8+fVxuICAgIDwvZGl2PlxuICApO1xufTtcblxuLy8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG4vLyBTZXBhcmF0b3Jcbi8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuXG5leHBvcnQgaW50ZXJmYWNlIEluZGljYXRvclNlcGFyYXRvclByb3BzPFxuICBPcHRpb24gPSB1bmtub3duLFxuICBJc011bHRpIGV4dGVuZHMgYm9vbGVhbiA9IGJvb2xlYW4sXG4gIEdyb3VwIGV4dGVuZHMgR3JvdXBCYXNlPE9wdGlvbj4gPSBHcm91cEJhc2U8T3B0aW9uPlxuPiBleHRlbmRzIENvbW1vblByb3BzQW5kQ2xhc3NOYW1lPE9wdGlvbiwgSXNNdWx0aSwgR3JvdXA+IHtcbiAgaXNEaXNhYmxlZDogYm9vbGVhbjtcbiAgaXNGb2N1c2VkOiBib29sZWFuO1xuICBpbm5lclByb3BzPzogSlNYLkludHJpbnNpY0VsZW1lbnRzWydzcGFuJ107XG59XG5cbmV4cG9ydCBjb25zdCBpbmRpY2F0b3JTZXBhcmF0b3JDU1MgPSA8XG4gIE9wdGlvbixcbiAgSXNNdWx0aSBleHRlbmRzIGJvb2xlYW4sXG4gIEdyb3VwIGV4dGVuZHMgR3JvdXBCYXNlPE9wdGlvbj5cbj4oXG4gIHtcbiAgICBpc0Rpc2FibGVkLFxuICAgIHRoZW1lOiB7XG4gICAgICBzcGFjaW5nOiB7IGJhc2VVbml0IH0sXG4gICAgICBjb2xvcnMsXG4gICAgfSxcbiAgfTogSW5kaWNhdG9yU2VwYXJhdG9yUHJvcHM8T3B0aW9uLCBJc011bHRpLCBHcm91cD4sXG4gIHVuc3R5bGVkOiBib29sZWFuXG4pOiBDU1NPYmplY3RXaXRoTGFiZWwgPT4gKHtcbiAgbGFiZWw6ICdpbmRpY2F0b3JTZXBhcmF0b3InLFxuICBhbGlnblNlbGY6ICdzdHJldGNoJyxcbiAgd2lkdGg6IDEsXG4gIC4uLih1bnN0eWxlZFxuICAgID8ge31cbiAgICA6IHtcbiAgICAgICAgYmFja2dyb3VuZENvbG9yOiBpc0Rpc2FibGVkID8gY29sb3JzLm5ldXRyYWwxMCA6IGNvbG9ycy5uZXV0cmFsMjAsXG4gICAgICAgIG1hcmdpbkJvdHRvbTogYmFzZVVuaXQgKiAyLFxuICAgICAgICBtYXJnaW5Ub3A6IGJhc2VVbml0ICogMixcbiAgICAgIH0pLFxufSk7XG5cbmV4cG9ydCBjb25zdCBJbmRpY2F0b3JTZXBhcmF0b3IgPSA8XG4gIE9wdGlvbixcbiAgSXNNdWx0aSBleHRlbmRzIGJvb2xlYW4sXG4gIEdyb3VwIGV4dGVuZHMgR3JvdXBCYXNlPE9wdGlvbj5cbj4oXG4gIHByb3BzOiBJbmRpY2F0b3JTZXBhcmF0b3JQcm9wczxPcHRpb24sIElzTXVsdGksIEdyb3VwPlxuKSA9PiB7XG4gIGNvbnN0IHsgaW5uZXJQcm9wcyB9ID0gcHJvcHM7XG4gIHJldHVybiAoXG4gICAgPHNwYW5cbiAgICAgIHsuLi5pbm5lclByb3BzfVxuICAgICAgey4uLmdldFN0eWxlUHJvcHMocHJvcHMsICdpbmRpY2F0b3JTZXBhcmF0b3InLCB7XG4gICAgICAgICdpbmRpY2F0b3Itc2VwYXJhdG9yJzogdHJ1ZSxcbiAgICAgIH0pfVxuICAgIC8+XG4gICk7XG59O1xuXG4vLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbi8vIExvYWRpbmdcbi8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuXG5jb25zdCBsb2FkaW5nRG90QW5pbWF0aW9ucyA9IGtleWZyYW1lc2BcbiAgMCUsIDgwJSwgMTAwJSB7IG9wYWNpdHk6IDA7IH1cbiAgNDAlIHsgb3BhY2l0eTogMTsgfVxuYDtcblxuZXhwb3J0IGNvbnN0IGxvYWRpbmdJbmRpY2F0b3JDU1MgPSA8XG4gIE9wdGlvbixcbiAgSXNNdWx0aSBleHRlbmRzIGJvb2xlYW4sXG4gIEdyb3VwIGV4dGVuZHMgR3JvdXBCYXNlPE9wdGlvbj5cbj4oXG4gIHtcbiAgICBpc0ZvY3VzZWQsXG4gICAgc2l6ZSxcbiAgICB0aGVtZToge1xuICAgICAgY29sb3JzLFxuICAgICAgc3BhY2luZzogeyBiYXNlVW5pdCB9LFxuICAgIH0sXG4gIH06IExvYWRpbmdJbmRpY2F0b3JQcm9wczxPcHRpb24sIElzTXVsdGksIEdyb3VwPixcbiAgdW5zdHlsZWQ6IGJvb2xlYW5cbik6IENTU09iamVjdFdpdGhMYWJlbCA9PiAoe1xuICBsYWJlbDogJ2xvYWRpbmdJbmRpY2F0b3InLFxuICBkaXNwbGF5OiAnZmxleCcsXG4gIHRyYW5zaXRpb246ICdjb2xvciAxNTBtcycsXG4gIGFsaWduU2VsZjogJ2NlbnRlcicsXG4gIGZvbnRTaXplOiBzaXplLFxuICBsaW5lSGVpZ2h0OiAxLFxuICBtYXJnaW5SaWdodDogc2l6ZSxcbiAgdGV4dEFsaWduOiAnY2VudGVyJyxcbiAgdmVydGljYWxBbGlnbjogJ21pZGRsZScsXG4gIC4uLih1bnN0eWxlZFxuICAgID8ge31cbiAgICA6IHtcbiAgICAgICAgY29sb3I6IGlzRm9jdXNlZCA/IGNvbG9ycy5uZXV0cmFsNjAgOiBjb2xvcnMubmV1dHJhbDIwLFxuICAgICAgICBwYWRkaW5nOiBiYXNlVW5pdCAqIDIsXG4gICAgICB9KSxcbn0pO1xuXG5pbnRlcmZhY2UgTG9hZGluZ0RvdFByb3BzIHtcbiAgZGVsYXk6IG51bWJlcjtcbiAgb2Zmc2V0OiBib29sZWFuO1xufVxuY29uc3QgTG9hZGluZ0RvdCA9ICh7IGRlbGF5LCBvZmZzZXQgfTogTG9hZGluZ0RvdFByb3BzKSA9PiAoXG4gIDxzcGFuXG4gICAgY3NzPXt7XG4gICAgICBhbmltYXRpb246IGAke2xvYWRpbmdEb3RBbmltYXRpb25zfSAxcyBlYXNlLWluLW91dCAke2RlbGF5fW1zIGluZmluaXRlO2AsXG4gICAgICBiYWNrZ3JvdW5kQ29sb3I6ICdjdXJyZW50Q29sb3InLFxuICAgICAgYm9yZGVyUmFkaXVzOiAnMWVtJyxcbiAgICAgIGRpc3BsYXk6ICdpbmxpbmUtYmxvY2snLFxuICAgICAgbWFyZ2luTGVmdDogb2Zmc2V0ID8gJzFlbScgOiB1bmRlZmluZWQsXG4gICAgICBoZWlnaHQ6ICcxZW0nLFxuICAgICAgdmVydGljYWxBbGlnbjogJ3RvcCcsXG4gICAgICB3aWR0aDogJzFlbScsXG4gICAgfX1cbiAgLz5cbik7XG5cbmV4cG9ydCBpbnRlcmZhY2UgTG9hZGluZ0luZGljYXRvclByb3BzPFxuICBPcHRpb24gPSB1bmtub3duLFxuICBJc011bHRpIGV4dGVuZHMgYm9vbGVhbiA9IGJvb2xlYW4sXG4gIEdyb3VwIGV4dGVuZHMgR3JvdXBCYXNlPE9wdGlvbj4gPSBHcm91cEJhc2U8T3B0aW9uPlxuPiBleHRlbmRzIENvbW1vblByb3BzQW5kQ2xhc3NOYW1lPE9wdGlvbiwgSXNNdWx0aSwgR3JvdXA+IHtcbiAgLyoqIFByb3BzIHRoYXQgd2lsbCBiZSBwYXNzZWQgb24gdG8gdGhlIGNoaWxkcmVuLiAqL1xuICBpbm5lclByb3BzOiBKU1guSW50cmluc2ljRWxlbWVudHNbJ2RpdiddO1xuICAvKiogVGhlIGZvY3VzZWQgc3RhdGUgb2YgdGhlIHNlbGVjdC4gKi9cbiAgaXNGb2N1c2VkOiBib29sZWFuO1xuICBpc0Rpc2FibGVkOiBib29sZWFuO1xuICAvKiogU2V0IHNpemUgb2YgdGhlIGNvbnRhaW5lci4gKi9cbiAgc2l6ZTogbnVtYmVyO1xufVxuZXhwb3J0IGNvbnN0IExvYWRpbmdJbmRpY2F0b3IgPSA8XG4gIE9wdGlvbixcbiAgSXNNdWx0aSBleHRlbmRzIGJvb2xlYW4sXG4gIEdyb3VwIGV4dGVuZHMgR3JvdXBCYXNlPE9wdGlvbj5cbj4oe1xuICBpbm5lclByb3BzLFxuICBpc1J0bCxcbiAgc2l6ZSA9IDQsXG4gIC4uLnJlc3RQcm9wc1xufTogTG9hZGluZ0luZGljYXRvclByb3BzPE9wdGlvbiwgSXNNdWx0aSwgR3JvdXA+KSA9PiB7XG4gIHJldHVybiAoXG4gICAgPGRpdlxuICAgICAgey4uLmdldFN0eWxlUHJvcHMoXG4gICAgICAgIHsgLi4ucmVzdFByb3BzLCBpbm5lclByb3BzLCBpc1J0bCwgc2l6ZSB9LFxuICAgICAgICAnbG9hZGluZ0luZGljYXRvcicsXG4gICAgICAgIHtcbiAgICAgICAgICBpbmRpY2F0b3I6IHRydWUsXG4gICAgICAgICAgJ2xvYWRpbmctaW5kaWNhdG9yJzogdHJ1ZSxcbiAgICAgICAgfVxuICAgICAgKX1cbiAgICAgIHsuLi5pbm5lclByb3BzfVxuICAgID5cbiAgICAgIDxMb2FkaW5nRG90IGRlbGF5PXswfSBvZmZzZXQ9e2lzUnRsfSAvPlxuICAgICAgPExvYWRpbmdEb3QgZGVsYXk9ezE2MH0gb2Zmc2V0IC8+XG4gICAgICA8TG9hZGluZ0RvdCBkZWxheT17MzIwfSBvZmZzZXQ9eyFpc1J0bH0gLz5cbiAgICA8L2Rpdj5cbiAgKTtcbn07XG4iXX0= */")
  });
}, ZE = function(t) {
  var n = t.innerProps, r = t.isRtl, i = t.size, a = i === void 0 ? 4 : i, o = Gr(t, ME);
  return tt("div", ke({}, fn(st(st({}, o), {}, {
    innerProps: n,
    isRtl: r,
    size: a
  }), "loadingIndicator", {
    indicator: !0,
    "loading-indicator": !0
  }), n), tt(lu, {
    delay: 0,
    offset: r
  }), tt(lu, {
    delay: 160,
    offset: !0
  }), tt(lu, {
    delay: 320,
    offset: !r
  }));
}, JE = function(t, n) {
  var r = t.isDisabled, i = t.isFocused, a = t.theme, o = a.colors, l = a.borderRadius, u = a.spacing;
  return st({
    label: "control",
    alignItems: "center",
    cursor: "default",
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-between",
    minHeight: u.controlHeight,
    outline: "0 !important",
    position: "relative",
    transition: "all 100ms"
  }, n ? {} : {
    backgroundColor: r ? o.neutral5 : o.neutral0,
    borderColor: r ? o.neutral10 : i ? o.primary : o.neutral20,
    borderRadius: l,
    borderStyle: "solid",
    borderWidth: 1,
    boxShadow: i ? "0 0 0 1px ".concat(o.primary) : void 0,
    "&:hover": {
      borderColor: i ? o.primary : o.neutral30
    }
  });
}, UE = function(t) {
  var n = t.children, r = t.isDisabled, i = t.isFocused, a = t.innerRef, o = t.innerProps, l = t.menuIsOpen;
  return tt("div", ke({
    ref: a
  }, fn(t, "control", {
    control: !0,
    "control--is-disabled": r,
    "control--is-focused": i,
    "control--menu-is-open": l
  }), o, {
    "aria-disabled": r || void 0
  }), n);
}, qE = UE, QE = ["data"], KE = function(t, n) {
  var r = t.theme.spacing;
  return n ? {} : {
    paddingBottom: r.baseUnit * 2,
    paddingTop: r.baseUnit * 2
  };
}, eA = function(t) {
  var n = t.children, r = t.cx, i = t.getStyles, a = t.getClassNames, o = t.Heading, l = t.headingProps, u = t.innerProps, s = t.label, d = t.theme, c = t.selectProps;
  return tt("div", ke({}, fn(t, "group", {
    group: !0
  }), u), tt(o, ke({}, l, {
    selectProps: c,
    theme: d,
    getStyles: i,
    getClassNames: a,
    cx: r
  }), s), tt("div", null, n));
}, tA = function(t, n) {
  var r = t.theme, i = r.colors, a = r.spacing;
  return st({
    label: "group",
    cursor: "default",
    display: "block"
  }, n ? {} : {
    color: i.neutral40,
    fontSize: "75%",
    fontWeight: 500,
    marginBottom: "0.25em",
    paddingLeft: a.baseUnit * 3,
    paddingRight: a.baseUnit * 3,
    textTransform: "uppercase"
  });
}, nA = function(t) {
  var n = Sm(t);
  n.data;
  var r = Gr(n, QE);
  return tt("div", ke({}, fn(t, "groupHeading", {
    "group-heading": !0
  }), r));
}, rA = eA, iA = ["innerRef", "isDisabled", "isHidden", "inputClassName"], oA = function(t, n) {
  var r = t.isDisabled, i = t.value, a = t.theme, o = a.spacing, l = a.colors;
  return st(st({
    visibility: r ? "hidden" : "visible",
    // force css to recompute when value change due to @emotion bug.
    // We can remove it whenever the bug is fixed.
    transform: i ? "translateZ(0)" : ""
  }, aA), n ? {} : {
    margin: o.baseUnit / 2,
    paddingBottom: o.baseUnit / 2,
    paddingTop: o.baseUnit / 2,
    color: l.neutral80
  });
}, Fm = {
  gridArea: "1 / 2",
  font: "inherit",
  minWidth: "2px",
  border: 0,
  margin: 0,
  outline: 0,
  padding: 0
}, aA = {
  flex: "1 1 auto",
  display: "inline-grid",
  gridArea: "1 / 1 / 2 / 3",
  gridTemplateColumns: "0 min-content",
  "&:after": st({
    content: 'attr(data-value) " "',
    visibility: "hidden",
    whiteSpace: "pre"
  }, Fm)
}, sA = function(t) {
  return st({
    label: "input",
    color: "inherit",
    background: 0,
    opacity: t ? 0 : 1,
    width: "100%"
  }, Fm);
}, lA = function(t) {
  var n = t.cx, r = t.value, i = Sm(t), a = i.innerRef, o = i.isDisabled, l = i.isHidden, u = i.inputClassName, s = Gr(i, iA);
  return tt("div", ke({}, fn(t, "input", {
    "input-container": !0
  }), {
    "data-value": r || ""
  }), tt("input", ke({
    className: n({
      input: !0
    }, u),
    ref: a,
    style: sA(l),
    disabled: o
  }, s)));
}, uA = lA, cA = function(t, n) {
  var r = t.theme, i = r.spacing, a = r.borderRadius, o = r.colors;
  return st({
    label: "multiValue",
    display: "flex",
    minWidth: 0
  }, n ? {} : {
    backgroundColor: o.neutral10,
    borderRadius: a / 2,
    margin: i.baseUnit / 2
  });
}, dA = function(t, n) {
  var r = t.theme, i = r.borderRadius, a = r.colors, o = t.cropWithEllipsis;
  return st({
    overflow: "hidden",
    textOverflow: o || o === void 0 ? "ellipsis" : void 0,
    whiteSpace: "nowrap"
  }, n ? {} : {
    borderRadius: i / 2,
    color: a.neutral80,
    fontSize: "85%",
    padding: 3,
    paddingLeft: 6
  });
}, fA = function(t, n) {
  var r = t.theme, i = r.spacing, a = r.borderRadius, o = r.colors, l = t.isFocused;
  return st({
    alignItems: "center",
    display: "flex"
  }, n ? {} : {
    borderRadius: a / 2,
    backgroundColor: l ? o.dangerLight : void 0,
    paddingLeft: i.baseUnit,
    paddingRight: i.baseUnit,
    ":hover": {
      backgroundColor: o.dangerLight,
      color: o.danger
    }
  });
}, Bm = function(t) {
  var n = t.children, r = t.innerProps;
  return tt("div", r, n);
}, pA = Bm, gA = Bm;
function hA(e) {
  var t = e.children, n = e.innerProps;
  return tt("div", ke({
    role: "button"
  }, n), t || tt(qc, {
    size: 14
  }));
}
var mA = function(t) {
  var n = t.children, r = t.components, i = t.data, a = t.innerProps, o = t.isDisabled, l = t.removeProps, u = t.selectProps, s = r.Container, d = r.Label, c = r.Remove;
  return tt(s, {
    data: i,
    innerProps: st(st({}, fn(t, "multiValue", {
      "multi-value": !0,
      "multi-value--is-disabled": o
    })), a),
    selectProps: u
  }, tt(d, {
    data: i,
    innerProps: st({}, fn(t, "multiValueLabel", {
      "multi-value__label": !0
    })),
    selectProps: u
  }, n), tt(c, {
    data: i,
    innerProps: st(st({}, fn(t, "multiValueRemove", {
      "multi-value__remove": !0
    })), {}, {
      "aria-label": "Remove ".concat(n || "option")
    }, l),
    selectProps: u
  }));
}, vA = mA, bA = function(t, n) {
  var r = t.isDisabled, i = t.isFocused, a = t.isSelected, o = t.theme, l = o.spacing, u = o.colors;
  return st({
    label: "option",
    cursor: "default",
    display: "block",
    fontSize: "inherit",
    width: "100%",
    userSelect: "none",
    WebkitTapHighlightColor: "rgba(0, 0, 0, 0)"
  }, n ? {} : {
    backgroundColor: a ? u.primary : i ? u.primary25 : "transparent",
    color: r ? u.neutral20 : a ? u.neutral0 : "inherit",
    padding: "".concat(l.baseUnit * 2, "px ").concat(l.baseUnit * 3, "px"),
    // provide some affordance on touch devices
    ":active": {
      backgroundColor: r ? void 0 : a ? u.primary : u.primary50
    }
  });
}, yA = function(t) {
  var n = t.children, r = t.isDisabled, i = t.isFocused, a = t.isSelected, o = t.innerRef, l = t.innerProps;
  return tt("div", ke({}, fn(t, "option", {
    option: !0,
    "option--is-disabled": r,
    "option--is-focused": i,
    "option--is-selected": a
  }), {
    ref: o,
    "aria-disabled": r
  }, l), n);
}, wA = yA, xA = function(t, n) {
  var r = t.theme, i = r.spacing, a = r.colors;
  return st({
    label: "placeholder",
    gridArea: "1 / 1 / 2 / 3"
  }, n ? {} : {
    color: a.neutral50,
    marginLeft: i.baseUnit / 2,
    marginRight: i.baseUnit / 2
  });
}, CA = function(t) {
  var n = t.children, r = t.innerProps;
  return tt("div", ke({}, fn(t, "placeholder", {
    placeholder: !0
  }), r), n);
}, SA = CA, IA = function(t, n) {
  var r = t.isDisabled, i = t.theme, a = i.spacing, o = i.colors;
  return st({
    label: "singleValue",
    gridArea: "1 / 1 / 2 / 3",
    maxWidth: "100%",
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap"
  }, n ? {} : {
    color: r ? o.neutral40 : o.neutral80,
    marginLeft: a.baseUnit / 2,
    marginRight: a.baseUnit / 2
  });
}, RA = function(t) {
  var n = t.children, r = t.isDisabled, i = t.innerProps;
  return tt("div", ke({}, fn(t, "singleValue", {
    "single-value": !0,
    "single-value--is-disabled": r
  }), i), n);
}, EA = RA, Nm = {
  ClearIndicator: HE,
  Control: qE,
  DropdownIndicator: jE,
  DownChevron: km,
  CrossIcon: qc,
  Group: rA,
  GroupHeading: nA,
  IndicatorsContainer: GE,
  IndicatorSeparator: $E,
  Input: uA,
  LoadingIndicator: ZE,
  Menu: xE,
  MenuList: SE,
  MenuPortal: TE,
  LoadingMessage: AE,
  NoOptionsMessage: EE,
  MultiValue: vA,
  MultiValueContainer: pA,
  MultiValueLabel: gA,
  MultiValueRemove: hA,
  Option: wA,
  Placeholder: SA,
  SelectContainer: OE,
  SingleValue: EA,
  ValueContainer: BE
}, AA = function(t) {
  return st(st({}, Nm), t.components);
}, lp = Number.isNaN || function(t) {
  return typeof t == "number" && t !== t;
};
function PA(e, t) {
  return !!(e === t || lp(e) && lp(t));
}
function TA(e, t) {
  if (e.length !== t.length)
    return !1;
  for (var n = 0; n < e.length; n++)
    if (!PA(e[n], t[n]))
      return !1;
  return !0;
}
function kA(e, t) {
  t === void 0 && (t = TA);
  var n = null;
  function r() {
    for (var i = [], a = 0; a < arguments.length; a++)
      i[a] = arguments[a];
    if (n && n.lastThis === this && t(i, n.lastArgs))
      return n.lastResult;
    var o = e.apply(this, i);
    return n = {
      lastResult: o,
      lastArgs: i,
      lastThis: this
    }, o;
  }
  return r.clear = function() {
    n = null;
  }, r;
}
var Go = {};
function OA() {
  return "You have tried to stringify object returned from `css` function. It isn't supposed to be used directly (e.g. as value of the `className` prop), but rather handed to emotion so it can handle it (e.g. as value of `css` prop).";
}
var FA = Go.NODE_ENV === "production" ? {
  name: "7pg0cj-a11yText",
  styles: "label:a11yText;z-index:9999;border:0;clip:rect(1px, 1px, 1px, 1px);height:1px;width:1px;position:absolute;overflow:hidden;padding:0;white-space:nowrap"
} : {
  name: "1f43avz-a11yText-A11yText",
  styles: "label:a11yText;z-index:9999;border:0;clip:rect(1px, 1px, 1px, 1px);height:1px;width:1px;position:absolute;overflow:hidden;padding:0;white-space:nowrap;label:A11yText;",
  map: "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkExMXlUZXh0LnRzeCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFPSSIsImZpbGUiOiJBMTF5VGV4dC50c3giLCJzb3VyY2VzQ29udGVudCI6WyIvKiogQGpzeCBqc3ggKi9cbmltcG9ydCB7IEpTWCB9IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7IGpzeCB9IGZyb20gJ0BlbW90aW9uL3JlYWN0JztcblxuLy8gQXNzaXN0aXZlIHRleHQgdG8gZGVzY3JpYmUgdmlzdWFsIGVsZW1lbnRzLiBIaWRkZW4gZm9yIHNpZ2h0ZWQgdXNlcnMuXG5jb25zdCBBMTF5VGV4dCA9IChwcm9wczogSlNYLkludHJpbnNpY0VsZW1lbnRzWydzcGFuJ10pID0+IChcbiAgPHNwYW5cbiAgICBjc3M9e3tcbiAgICAgIGxhYmVsOiAnYTExeVRleHQnLFxuICAgICAgekluZGV4OiA5OTk5LFxuICAgICAgYm9yZGVyOiAwLFxuICAgICAgY2xpcDogJ3JlY3QoMXB4LCAxcHgsIDFweCwgMXB4KScsXG4gICAgICBoZWlnaHQ6IDEsXG4gICAgICB3aWR0aDogMSxcbiAgICAgIHBvc2l0aW9uOiAnYWJzb2x1dGUnLFxuICAgICAgb3ZlcmZsb3c6ICdoaWRkZW4nLFxuICAgICAgcGFkZGluZzogMCxcbiAgICAgIHdoaXRlU3BhY2U6ICdub3dyYXAnLFxuICAgIH19XG4gICAgey4uLnByb3BzfVxuICAvPlxuKTtcblxuZXhwb3J0IGRlZmF1bHQgQTExeVRleHQ7XG4iXX0= */",
  toString: OA
}, BA = function(t) {
  return tt("span", ke({
    css: FA
  }, t));
}, up = BA, NA = {
  guidance: function(t) {
    var n = t.isSearchable, r = t.isMulti, i = t.tabSelectsValue, a = t.context, o = t.isInitialFocus;
    switch (a) {
      case "menu":
        return "Use Up and Down to choose options, press Enter to select the currently focused option, press Escape to exit the menu".concat(i ? ", press Tab to select the option and exit the menu" : "", ".");
      case "input":
        return o ? "".concat(t["aria-label"] || "Select", " is focused ").concat(n ? ",type to refine list" : "", ", press Down to open the menu, ").concat(r ? " press left to focus selected values" : "") : "";
      case "value":
        return "Use left and right to toggle between focused values, press Backspace to remove the currently focused value";
      default:
        return "";
    }
  },
  onChange: function(t) {
    var n = t.action, r = t.label, i = r === void 0 ? "" : r, a = t.labels, o = t.isDisabled;
    switch (n) {
      case "deselect-option":
      case "pop-value":
      case "remove-value":
        return "option ".concat(i, ", deselected.");
      case "clear":
        return "All selected options have been cleared.";
      case "initial-input-focus":
        return "option".concat(a.length > 1 ? "s" : "", " ").concat(a.join(","), ", selected.");
      case "select-option":
        return o ? "option ".concat(i, " is disabled. Select another option.") : "option ".concat(i, ", selected.");
      default:
        return "";
    }
  },
  onFocus: function(t) {
    var n = t.context, r = t.focused, i = t.options, a = t.label, o = a === void 0 ? "" : a, l = t.selectValue, u = t.isDisabled, s = t.isSelected, d = t.isAppleDevice, c = function(v, b) {
      return v && v.length ? "".concat(v.indexOf(b) + 1, " of ").concat(v.length) : "";
    };
    if (n === "value" && l)
      return "value ".concat(o, " focused, ").concat(c(l, r), ".");
    if (n === "menu" && d) {
      var m = u ? " disabled" : "", h = "".concat(s ? " selected" : "").concat(m);
      return "".concat(o).concat(h, ", ").concat(c(i, r), ".");
    }
    return "";
  },
  onFilter: function(t) {
    var n = t.inputValue, r = t.resultsMessage;
    return "".concat(r).concat(n ? " for search term " + n : "", ".");
  }
}, GA = function(t) {
  var n = t.ariaSelection, r = t.focusedOption, i = t.focusedValue, a = t.focusableOptions, o = t.isFocused, l = t.selectValue, u = t.selectProps, s = t.id, d = t.isAppleDevice, c = u.ariaLiveMessages, m = u.getOptionLabel, h = u.inputValue, x = u.isMulti, v = u.isOptionDisabled, b = u.isSearchable, I = u.menuIsOpen, O = u.options, T = u.screenReaderStatus, D = u.tabSelectsValue, E = u.isLoading, B = u["aria-label"], X = u["aria-live"], U = Pr(function() {
    return st(st({}, NA), c || {});
  }, [c]), K = Pr(function() {
    var ue = "";
    if (n && U.onChange) {
      var Ee = n.option, We = n.options, $e = n.removedValue, ht = n.removedValues, G = n.value, Z = function(Y) {
        return Array.isArray(Y) ? null : Y;
      }, A = $e || Ee || Z(G), w = A ? m(A) : "", H = We || ht || void 0, $ = H ? H.map(m) : [], _ = st({
        // multiSelected items are usually items that have already been selected
        // or set by the user as a default value so we assume they are not disabled
        isDisabled: A && v(A, l),
        label: w,
        labels: $
      }, n);
      ue = U.onChange(_);
    }
    return ue;
  }, [n, U, v, l, m]), Fe = Pr(function() {
    var ue = "", Ee = r || i, We = !!(r && l && l.includes(r));
    if (Ee && U.onFocus) {
      var $e = {
        focused: Ee,
        label: m(Ee),
        isDisabled: v(Ee, l),
        isSelected: We,
        options: a,
        context: Ee === r ? "menu" : "value",
        selectValue: l,
        isAppleDevice: d
      };
      ue = U.onFocus($e);
    }
    return ue;
  }, [r, i, m, v, U, a, l, d]), oe = Pr(function() {
    var ue = "";
    if (I && O.length && !E && U.onFilter) {
      var Ee = T({
        count: a.length
      });
      ue = U.onFilter({
        inputValue: h,
        resultsMessage: Ee
      });
    }
    return ue;
  }, [a, h, I, U, O, T, E]), ce = (n == null ? void 0 : n.action) === "initial-input-focus", ye = Pr(function() {
    var ue = "";
    if (U.guidance) {
      var Ee = i ? "value" : I ? "menu" : "input";
      ue = U.guidance({
        "aria-label": B,
        context: Ee,
        isDisabled: r && v(r, l),
        isMulti: x,
        isSearchable: b,
        tabSelectsValue: D,
        isInitialFocus: ce
      });
    }
    return ue;
  }, [B, r, i, x, v, b, I, U, l, D, ce]), Q = tt(xu, null, tt("span", {
    id: "aria-selection"
  }, K), tt("span", {
    id: "aria-focused"
  }, Fe), tt("span", {
    id: "aria-results"
  }, oe), tt("span", {
    id: "aria-guidance"
  }, ye));
  return tt(xu, null, tt(up, {
    id: s
  }, ce && Q), tt(up, {
    "aria-live": X,
    "aria-atomic": "false",
    "aria-relevant": "additions text",
    role: "log"
  }, o && !ce && Q));
}, _A = GA, qu = [{
  base: "A",
  letters: "AⒶＡÀÁÂẦẤẪẨÃĀĂẰẮẴẲȦǠÄǞẢÅǺǍȀȂẠẬẶḀĄȺⱯ"
}, {
  base: "AA",
  letters: "Ꜳ"
}, {
  base: "AE",
  letters: "ÆǼǢ"
}, {
  base: "AO",
  letters: "Ꜵ"
}, {
  base: "AU",
  letters: "Ꜷ"
}, {
  base: "AV",
  letters: "ꜸꜺ"
}, {
  base: "AY",
  letters: "Ꜽ"
}, {
  base: "B",
  letters: "BⒷＢḂḄḆɃƂƁ"
}, {
  base: "C",
  letters: "CⒸＣĆĈĊČÇḈƇȻꜾ"
}, {
  base: "D",
  letters: "DⒹＤḊĎḌḐḒḎĐƋƊƉꝹ"
}, {
  base: "DZ",
  letters: "ǱǄ"
}, {
  base: "Dz",
  letters: "ǲǅ"
}, {
  base: "E",
  letters: "EⒺＥÈÉÊỀẾỄỂẼĒḔḖĔĖËẺĚȄȆẸỆȨḜĘḘḚƐƎ"
}, {
  base: "F",
  letters: "FⒻＦḞƑꝻ"
}, {
  base: "G",
  letters: "GⒼＧǴĜḠĞĠǦĢǤƓꞠꝽꝾ"
}, {
  base: "H",
  letters: "HⒽＨĤḢḦȞḤḨḪĦⱧⱵꞍ"
}, {
  base: "I",
  letters: "IⒾＩÌÍÎĨĪĬİÏḮỈǏȈȊỊĮḬƗ"
}, {
  base: "J",
  letters: "JⒿＪĴɈ"
}, {
  base: "K",
  letters: "KⓀＫḰǨḲĶḴƘⱩꝀꝂꝄꞢ"
}, {
  base: "L",
  letters: "LⓁＬĿĹĽḶḸĻḼḺŁȽⱢⱠꝈꝆꞀ"
}, {
  base: "LJ",
  letters: "Ǉ"
}, {
  base: "Lj",
  letters: "ǈ"
}, {
  base: "M",
  letters: "MⓂＭḾṀṂⱮƜ"
}, {
  base: "N",
  letters: "NⓃＮǸŃÑṄŇṆŅṊṈȠƝꞐꞤ"
}, {
  base: "NJ",
  letters: "Ǌ"
}, {
  base: "Nj",
  letters: "ǋ"
}, {
  base: "O",
  letters: "OⓄＯÒÓÔỒỐỖỔÕṌȬṎŌṐṒŎȮȰÖȪỎŐǑȌȎƠỜỚỠỞỢỌỘǪǬØǾƆƟꝊꝌ"
}, {
  base: "OI",
  letters: "Ƣ"
}, {
  base: "OO",
  letters: "Ꝏ"
}, {
  base: "OU",
  letters: "Ȣ"
}, {
  base: "P",
  letters: "PⓅＰṔṖƤⱣꝐꝒꝔ"
}, {
  base: "Q",
  letters: "QⓆＱꝖꝘɊ"
}, {
  base: "R",
  letters: "RⓇＲŔṘŘȐȒṚṜŖṞɌⱤꝚꞦꞂ"
}, {
  base: "S",
  letters: "SⓈＳẞŚṤŜṠŠṦṢṨȘŞⱾꞨꞄ"
}, {
  base: "T",
  letters: "TⓉＴṪŤṬȚŢṰṮŦƬƮȾꞆ"
}, {
  base: "TZ",
  letters: "Ꜩ"
}, {
  base: "U",
  letters: "UⓊＵÙÚÛŨṸŪṺŬÜǛǗǕǙỦŮŰǓȔȖƯỪỨỮỬỰỤṲŲṶṴɄ"
}, {
  base: "V",
  letters: "VⓋＶṼṾƲꝞɅ"
}, {
  base: "VY",
  letters: "Ꝡ"
}, {
  base: "W",
  letters: "WⓌＷẀẂŴẆẄẈⱲ"
}, {
  base: "X",
  letters: "XⓍＸẊẌ"
}, {
  base: "Y",
  letters: "YⓎＹỲÝŶỸȲẎŸỶỴƳɎỾ"
}, {
  base: "Z",
  letters: "ZⓏＺŹẐŻŽẒẔƵȤⱿⱫꝢ"
}, {
  base: "a",
  letters: "aⓐａẚàáâầấẫẩãāăằắẵẳȧǡäǟảåǻǎȁȃạậặḁąⱥɐ"
}, {
  base: "aa",
  letters: "ꜳ"
}, {
  base: "ae",
  letters: "æǽǣ"
}, {
  base: "ao",
  letters: "ꜵ"
}, {
  base: "au",
  letters: "ꜷ"
}, {
  base: "av",
  letters: "ꜹꜻ"
}, {
  base: "ay",
  letters: "ꜽ"
}, {
  base: "b",
  letters: "bⓑｂḃḅḇƀƃɓ"
}, {
  base: "c",
  letters: "cⓒｃćĉċčçḉƈȼꜿↄ"
}, {
  base: "d",
  letters: "dⓓｄḋďḍḑḓḏđƌɖɗꝺ"
}, {
  base: "dz",
  letters: "ǳǆ"
}, {
  base: "e",
  letters: "eⓔｅèéêềếễểẽēḕḗĕėëẻěȅȇẹệȩḝęḙḛɇɛǝ"
}, {
  base: "f",
  letters: "fⓕｆḟƒꝼ"
}, {
  base: "g",
  letters: "gⓖｇǵĝḡğġǧģǥɠꞡᵹꝿ"
}, {
  base: "h",
  letters: "hⓗｈĥḣḧȟḥḩḫẖħⱨⱶɥ"
}, {
  base: "hv",
  letters: "ƕ"
}, {
  base: "i",
  letters: "iⓘｉìíîĩīĭïḯỉǐȉȋịįḭɨı"
}, {
  base: "j",
  letters: "jⓙｊĵǰɉ"
}, {
  base: "k",
  letters: "kⓚｋḱǩḳķḵƙⱪꝁꝃꝅꞣ"
}, {
  base: "l",
  letters: "lⓛｌŀĺľḷḹļḽḻſłƚɫⱡꝉꞁꝇ"
}, {
  base: "lj",
  letters: "ǉ"
}, {
  base: "m",
  letters: "mⓜｍḿṁṃɱɯ"
}, {
  base: "n",
  letters: "nⓝｎǹńñṅňṇņṋṉƞɲŉꞑꞥ"
}, {
  base: "nj",
  letters: "ǌ"
}, {
  base: "o",
  letters: "oⓞｏòóôồốỗổõṍȭṏōṑṓŏȯȱöȫỏőǒȍȏơờớỡởợọộǫǭøǿɔꝋꝍɵ"
}, {
  base: "oi",
  letters: "ƣ"
}, {
  base: "ou",
  letters: "ȣ"
}, {
  base: "oo",
  letters: "ꝏ"
}, {
  base: "p",
  letters: "pⓟｐṕṗƥᵽꝑꝓꝕ"
}, {
  base: "q",
  letters: "qⓠｑɋꝗꝙ"
}, {
  base: "r",
  letters: "rⓡｒŕṙřȑȓṛṝŗṟɍɽꝛꞧꞃ"
}, {
  base: "s",
  letters: "sⓢｓßśṥŝṡšṧṣṩșşȿꞩꞅẛ"
}, {
  base: "t",
  letters: "tⓣｔṫẗťṭțţṱṯŧƭʈⱦꞇ"
}, {
  base: "tz",
  letters: "ꜩ"
}, {
  base: "u",
  letters: "uⓤｕùúûũṹūṻŭüǜǘǖǚủůűǔȕȗưừứữửựụṳųṷṵʉ"
}, {
  base: "v",
  letters: "vⓥｖṽṿʋꝟʌ"
}, {
  base: "vy",
  letters: "ꝡ"
}, {
  base: "w",
  letters: "wⓦｗẁẃŵẇẅẘẉⱳ"
}, {
  base: "x",
  letters: "xⓧｘẋẍ"
}, {
  base: "y",
  letters: "yⓨｙỳýŷỹȳẏÿỷẙỵƴɏỿ"
}, {
  base: "z",
  letters: "zⓩｚźẑżžẓẕƶȥɀⱬꝣ"
}], MA = new RegExp("[" + qu.map(function(e) {
  return e.letters;
}).join("") + "]", "g"), Gm = {};
for (var uu = 0; uu < qu.length; uu++)
  for (var cu = qu[uu], du = 0; du < cu.letters.length; du++)
    Gm[cu.letters[du]] = cu.base;
var _m = function(t) {
  return t.replace(MA, function(n) {
    return Gm[n];
  });
}, VA = kA(_m), cp = function(t) {
  return t.replace(/^\s+|\s+$/g, "");
}, LA = function(t) {
  return "".concat(t.label, " ").concat(t.value);
}, DA = function(t) {
  return function(n, r) {
    if (n.data.__isNew__) return !0;
    var i = st({
      ignoreCase: !0,
      ignoreAccents: !0,
      stringify: LA,
      trim: !0,
      matchFrom: "any"
    }, t), a = i.ignoreCase, o = i.ignoreAccents, l = i.stringify, u = i.trim, s = i.matchFrom, d = u ? cp(r) : r, c = u ? cp(l(n)) : l(n);
    return a && (d = d.toLowerCase(), c = c.toLowerCase()), o && (d = VA(d), c = _m(c)), s === "start" ? c.substr(0, d.length) === d : c.indexOf(d) > -1;
  };
}, jA = ["innerRef"];
function zA(e) {
  var t = e.innerRef, n = Gr(e, jA), r = pE(n, "onExited", "in", "enter", "exit", "appear");
  return tt("input", ke({
    ref: t
  }, r, {
    css: /* @__PURE__ */ Yc({
      label: "dummyInput",
      // get rid of any default styles
      background: 0,
      border: 0,
      // important! this hides the flashing cursor
      caretColor: "transparent",
      fontSize: "inherit",
      gridArea: "1 / 1 / 2 / 3",
      outline: 0,
      padding: 0,
      // important! without `width` browsers won't allow focus
      width: 1,
      // remove cursor on desktop
      color: "transparent",
      // remove cursor on mobile whilst maintaining "scroll into view" behaviour
      left: -100,
      opacity: 0,
      position: "relative",
      transform: "scale(.01)"
    }, Go.NODE_ENV === "production" ? "" : ";label:DummyInput;", Go.NODE_ENV === "production" ? "" : "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkR1bW15SW5wdXQudHN4Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQXlCTSIsImZpbGUiOiJEdW1teUlucHV0LnRzeCIsInNvdXJjZXNDb250ZW50IjpbIi8qKiBAanN4IGpzeCAqL1xuaW1wb3J0IHsgSlNYLCBSZWYgfSBmcm9tICdyZWFjdCc7XG5pbXBvcnQgeyBqc3ggfSBmcm9tICdAZW1vdGlvbi9yZWFjdCc7XG5pbXBvcnQgeyByZW1vdmVQcm9wcyB9IGZyb20gJy4uL3V0aWxzJztcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gRHVtbXlJbnB1dCh7XG4gIGlubmVyUmVmLFxuICAuLi5wcm9wc1xufTogSlNYLkludHJpbnNpY0VsZW1lbnRzWydpbnB1dCddICYge1xuICByZWFkb25seSBpbm5lclJlZjogUmVmPEhUTUxJbnB1dEVsZW1lbnQ+O1xufSkge1xuICAvLyBSZW1vdmUgYW5pbWF0aW9uIHByb3BzIG5vdCBtZWFudCBmb3IgSFRNTCBlbGVtZW50c1xuICBjb25zdCBmaWx0ZXJlZFByb3BzID0gcmVtb3ZlUHJvcHMoXG4gICAgcHJvcHMsXG4gICAgJ29uRXhpdGVkJyxcbiAgICAnaW4nLFxuICAgICdlbnRlcicsXG4gICAgJ2V4aXQnLFxuICAgICdhcHBlYXInXG4gICk7XG5cbiAgcmV0dXJuIChcbiAgICA8aW5wdXRcbiAgICAgIHJlZj17aW5uZXJSZWZ9XG4gICAgICB7Li4uZmlsdGVyZWRQcm9wc31cbiAgICAgIGNzcz17e1xuICAgICAgICBsYWJlbDogJ2R1bW15SW5wdXQnLFxuICAgICAgICAvLyBnZXQgcmlkIG9mIGFueSBkZWZhdWx0IHN0eWxlc1xuICAgICAgICBiYWNrZ3JvdW5kOiAwLFxuICAgICAgICBib3JkZXI6IDAsXG4gICAgICAgIC8vIGltcG9ydGFudCEgdGhpcyBoaWRlcyB0aGUgZmxhc2hpbmcgY3Vyc29yXG4gICAgICAgIGNhcmV0Q29sb3I6ICd0cmFuc3BhcmVudCcsXG4gICAgICAgIGZvbnRTaXplOiAnaW5oZXJpdCcsXG4gICAgICAgIGdyaWRBcmVhOiAnMSAvIDEgLyAyIC8gMycsXG4gICAgICAgIG91dGxpbmU6IDAsXG4gICAgICAgIHBhZGRpbmc6IDAsXG4gICAgICAgIC8vIGltcG9ydGFudCEgd2l0aG91dCBgd2lkdGhgIGJyb3dzZXJzIHdvbid0IGFsbG93IGZvY3VzXG4gICAgICAgIHdpZHRoOiAxLFxuXG4gICAgICAgIC8vIHJlbW92ZSBjdXJzb3Igb24gZGVza3RvcFxuICAgICAgICBjb2xvcjogJ3RyYW5zcGFyZW50JyxcblxuICAgICAgICAvLyByZW1vdmUgY3Vyc29yIG9uIG1vYmlsZSB3aGlsc3QgbWFpbnRhaW5pbmcgXCJzY3JvbGwgaW50byB2aWV3XCIgYmVoYXZpb3VyXG4gICAgICAgIGxlZnQ6IC0xMDAsXG4gICAgICAgIG9wYWNpdHk6IDAsXG4gICAgICAgIHBvc2l0aW9uOiAncmVsYXRpdmUnLFxuICAgICAgICB0cmFuc2Zvcm06ICdzY2FsZSguMDEpJyxcbiAgICAgIH19XG4gICAgLz5cbiAgKTtcbn1cbiJdfQ== */")
  }));
}
var HA = function(t) {
  t.cancelable && t.preventDefault(), t.stopPropagation();
};
function WA(e) {
  var t = e.isEnabled, n = e.onBottomArrive, r = e.onBottomLeave, i = e.onTopArrive, a = e.onTopLeave, o = ir(!1), l = ir(!1), u = ir(0), s = ir(null), d = kn(function(b, I) {
    if (s.current !== null) {
      var O = s.current, T = O.scrollTop, D = O.scrollHeight, E = O.clientHeight, B = s.current, X = I > 0, U = D - E - T, K = !1;
      U > I && o.current && (r && r(b), o.current = !1), X && l.current && (a && a(b), l.current = !1), X && I > U ? (n && !o.current && n(b), B.scrollTop = D, K = !0, o.current = !0) : !X && -I > T && (i && !l.current && i(b), B.scrollTop = 0, K = !0, l.current = !0), K && HA(b);
    }
  }, [n, r, i, a]), c = kn(function(b) {
    d(b, b.deltaY);
  }, [d]), m = kn(function(b) {
    u.current = b.changedTouches[0].clientY;
  }, []), h = kn(function(b) {
    var I = u.current - b.changedTouches[0].clientY;
    d(b, I);
  }, [d]), x = kn(function(b) {
    if (b) {
      var I = cE ? {
        passive: !1
      } : !1;
      b.addEventListener("wheel", c, I), b.addEventListener("touchstart", m, I), b.addEventListener("touchmove", h, I);
    }
  }, [h, m, c]), v = kn(function(b) {
    b && (b.removeEventListener("wheel", c, !1), b.removeEventListener("touchstart", m, !1), b.removeEventListener("touchmove", h, !1));
  }, [h, m, c]);
  return Jr(function() {
    if (t) {
      var b = s.current;
      return x(b), function() {
        v(b);
      };
    }
  }, [t, x, v]), function(b) {
    s.current = b;
  };
}
var dp = ["boxSizing", "height", "overflow", "paddingRight", "position"], fp = {
  boxSizing: "border-box",
  // account for possible declaration `width: 100%;` on body
  overflow: "hidden",
  position: "relative",
  height: "100%"
};
function pp(e) {
  e.cancelable && e.preventDefault();
}
function gp(e) {
  e.stopPropagation();
}
function hp() {
  var e = this.scrollTop, t = this.scrollHeight, n = e + this.offsetHeight;
  e === 0 ? this.scrollTop = 1 : n === t && (this.scrollTop = e - 1);
}
function mp() {
  return "ontouchstart" in window || navigator.maxTouchPoints;
}
var vp = !!(typeof window < "u" && window.document && window.document.createElement), go = 0, ki = {
  capture: !1,
  passive: !1
};
function $A(e) {
  var t = e.isEnabled, n = e.accountForScrollbars, r = n === void 0 ? !0 : n, i = ir({}), a = ir(null), o = kn(function(u) {
    if (vp) {
      var s = document.body, d = s && s.style;
      if (r && dp.forEach(function(x) {
        var v = d && d[x];
        i.current[x] = v;
      }), r && go < 1) {
        var c = parseInt(i.current.paddingRight, 10) || 0, m = document.body ? document.body.clientWidth : 0, h = window.innerWidth - m + c || 0;
        Object.keys(fp).forEach(function(x) {
          var v = fp[x];
          d && (d[x] = v);
        }), d && (d.paddingRight = "".concat(h, "px"));
      }
      s && mp() && (s.addEventListener("touchmove", pp, ki), u && (u.addEventListener("touchstart", hp, ki), u.addEventListener("touchmove", gp, ki))), go += 1;
    }
  }, [r]), l = kn(function(u) {
    if (vp) {
      var s = document.body, d = s && s.style;
      go = Math.max(go - 1, 0), r && go < 1 && dp.forEach(function(c) {
        var m = i.current[c];
        d && (d[c] = m);
      }), s && mp() && (s.removeEventListener("touchmove", pp, ki), u && (u.removeEventListener("touchstart", hp, ki), u.removeEventListener("touchmove", gp, ki)));
    }
  }, [r]);
  return Jr(function() {
    if (t) {
      var u = a.current;
      return o(u), function() {
        l(u);
      };
    }
  }, [t, o, l]), function(u) {
    a.current = u;
  };
}
function XA() {
  return "You have tried to stringify object returned from `css` function. It isn't supposed to be used directly (e.g. as value of the `className` prop), but rather handed to emotion so it can handle it (e.g. as value of `css` prop).";
}
var YA = function(t) {
  var n = t.target;
  return n.ownerDocument.activeElement && n.ownerDocument.activeElement.blur();
}, ZA = Go.NODE_ENV === "production" ? {
  name: "1kfdb0e",
  styles: "position:fixed;left:0;bottom:0;right:0;top:0"
} : {
  name: "bp8cua-ScrollManager",
  styles: "position:fixed;left:0;bottom:0;right:0;top:0;label:ScrollManager;",
  map: "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIlNjcm9sbE1hbmFnZXIudHN4Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQW9EVSIsImZpbGUiOiJTY3JvbGxNYW5hZ2VyLnRzeCIsInNvdXJjZXNDb250ZW50IjpbIi8qKiBAanN4IGpzeCAqL1xuaW1wb3J0IHsganN4IH0gZnJvbSAnQGVtb3Rpb24vcmVhY3QnO1xuaW1wb3J0IHsgRnJhZ21lbnQsIFJlYWN0RWxlbWVudCwgUmVmQ2FsbGJhY2ssIE1vdXNlRXZlbnQgfSBmcm9tICdyZWFjdCc7XG5pbXBvcnQgdXNlU2Nyb2xsQ2FwdHVyZSBmcm9tICcuL3VzZVNjcm9sbENhcHR1cmUnO1xuaW1wb3J0IHVzZVNjcm9sbExvY2sgZnJvbSAnLi91c2VTY3JvbGxMb2NrJztcblxuaW50ZXJmYWNlIFByb3BzIHtcbiAgcmVhZG9ubHkgY2hpbGRyZW46IChyZWY6IFJlZkNhbGxiYWNrPEhUTUxFbGVtZW50PikgPT4gUmVhY3RFbGVtZW50O1xuICByZWFkb25seSBsb2NrRW5hYmxlZDogYm9vbGVhbjtcbiAgcmVhZG9ubHkgY2FwdHVyZUVuYWJsZWQ6IGJvb2xlYW47XG4gIHJlYWRvbmx5IG9uQm90dG9tQXJyaXZlPzogKGV2ZW50OiBXaGVlbEV2ZW50IHwgVG91Y2hFdmVudCkgPT4gdm9pZDtcbiAgcmVhZG9ubHkgb25Cb3R0b21MZWF2ZT86IChldmVudDogV2hlZWxFdmVudCB8IFRvdWNoRXZlbnQpID0+IHZvaWQ7XG4gIHJlYWRvbmx5IG9uVG9wQXJyaXZlPzogKGV2ZW50OiBXaGVlbEV2ZW50IHwgVG91Y2hFdmVudCkgPT4gdm9pZDtcbiAgcmVhZG9ubHkgb25Ub3BMZWF2ZT86IChldmVudDogV2hlZWxFdmVudCB8IFRvdWNoRXZlbnQpID0+IHZvaWQ7XG59XG5cbmNvbnN0IGJsdXJTZWxlY3RJbnB1dCA9IChldmVudDogTW91c2VFdmVudDxIVE1MRGl2RWxlbWVudD4pID0+IHtcbiAgY29uc3QgZWxlbWVudCA9IGV2ZW50LnRhcmdldCBhcyBIVE1MRGl2RWxlbWVudDtcbiAgcmV0dXJuIChcbiAgICBlbGVtZW50Lm93bmVyRG9jdW1lbnQuYWN0aXZlRWxlbWVudCAmJlxuICAgIChlbGVtZW50Lm93bmVyRG9jdW1lbnQuYWN0aXZlRWxlbWVudCBhcyBIVE1MRWxlbWVudCkuYmx1cigpXG4gICk7XG59O1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBTY3JvbGxNYW5hZ2VyKHtcbiAgY2hpbGRyZW4sXG4gIGxvY2tFbmFibGVkLFxuICBjYXB0dXJlRW5hYmxlZCA9IHRydWUsXG4gIG9uQm90dG9tQXJyaXZlLFxuICBvbkJvdHRvbUxlYXZlLFxuICBvblRvcEFycml2ZSxcbiAgb25Ub3BMZWF2ZSxcbn06IFByb3BzKSB7XG4gIGNvbnN0IHNldFNjcm9sbENhcHR1cmVUYXJnZXQgPSB1c2VTY3JvbGxDYXB0dXJlKHtcbiAgICBpc0VuYWJsZWQ6IGNhcHR1cmVFbmFibGVkLFxuICAgIG9uQm90dG9tQXJyaXZlLFxuICAgIG9uQm90dG9tTGVhdmUsXG4gICAgb25Ub3BBcnJpdmUsXG4gICAgb25Ub3BMZWF2ZSxcbiAgfSk7XG4gIGNvbnN0IHNldFNjcm9sbExvY2tUYXJnZXQgPSB1c2VTY3JvbGxMb2NrKHsgaXNFbmFibGVkOiBsb2NrRW5hYmxlZCB9KTtcblxuICBjb25zdCB0YXJnZXRSZWY6IFJlZkNhbGxiYWNrPEhUTUxFbGVtZW50PiA9IChlbGVtZW50KSA9PiB7XG4gICAgc2V0U2Nyb2xsQ2FwdHVyZVRhcmdldChlbGVtZW50KTtcbiAgICBzZXRTY3JvbGxMb2NrVGFyZ2V0KGVsZW1lbnQpO1xuICB9O1xuXG4gIHJldHVybiAoXG4gICAgPEZyYWdtZW50PlxuICAgICAge2xvY2tFbmFibGVkICYmIChcbiAgICAgICAgPGRpdlxuICAgICAgICAgIG9uQ2xpY2s9e2JsdXJTZWxlY3RJbnB1dH1cbiAgICAgICAgICBjc3M9e3sgcG9zaXRpb246ICdmaXhlZCcsIGxlZnQ6IDAsIGJvdHRvbTogMCwgcmlnaHQ6IDAsIHRvcDogMCB9fVxuICAgICAgICAvPlxuICAgICAgKX1cbiAgICAgIHtjaGlsZHJlbih0YXJnZXRSZWYpfVxuICAgIDwvRnJhZ21lbnQ+XG4gICk7XG59XG4iXX0= */",
  toString: XA
};
function JA(e) {
  var t = e.children, n = e.lockEnabled, r = e.captureEnabled, i = r === void 0 ? !0 : r, a = e.onBottomArrive, o = e.onBottomLeave, l = e.onTopArrive, u = e.onTopLeave, s = WA({
    isEnabled: i,
    onBottomArrive: a,
    onBottomLeave: o,
    onTopArrive: l,
    onTopLeave: u
  }), d = $A({
    isEnabled: n
  }), c = function(h) {
    s(h), d(h);
  };
  return tt(xu, null, n && tt("div", {
    onClick: YA,
    css: ZA
  }), t(c));
}
function UA() {
  return "You have tried to stringify object returned from `css` function. It isn't supposed to be used directly (e.g. as value of the `className` prop), but rather handed to emotion so it can handle it (e.g. as value of `css` prop).";
}
var qA = Go.NODE_ENV === "production" ? {
  name: "1a0ro4n-requiredInput",
  styles: "label:requiredInput;opacity:0;pointer-events:none;position:absolute;bottom:0;left:0;right:0;width:100%"
} : {
  name: "5kkxb2-requiredInput-RequiredInput",
  styles: "label:requiredInput;opacity:0;pointer-events:none;position:absolute;bottom:0;left:0;right:0;width:100%;label:RequiredInput;",
  map: "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIlJlcXVpcmVkSW5wdXQudHN4Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQWNJIiwiZmlsZSI6IlJlcXVpcmVkSW5wdXQudHN4Iiwic291cmNlc0NvbnRlbnQiOlsiLyoqIEBqc3gganN4ICovXG5pbXBvcnQgeyBGb2N1c0V2ZW50SGFuZGxlciwgRnVuY3Rpb25Db21wb25lbnQgfSBmcm9tICdyZWFjdCc7XG5pbXBvcnQgeyBqc3ggfSBmcm9tICdAZW1vdGlvbi9yZWFjdCc7XG5cbmNvbnN0IFJlcXVpcmVkSW5wdXQ6IEZ1bmN0aW9uQ29tcG9uZW50PHtcbiAgcmVhZG9ubHkgbmFtZT86IHN0cmluZztcbiAgcmVhZG9ubHkgb25Gb2N1czogRm9jdXNFdmVudEhhbmRsZXI8SFRNTElucHV0RWxlbWVudD47XG59PiA9ICh7IG5hbWUsIG9uRm9jdXMgfSkgPT4gKFxuICA8aW5wdXRcbiAgICByZXF1aXJlZFxuICAgIG5hbWU9e25hbWV9XG4gICAgdGFiSW5kZXg9ey0xfVxuICAgIGFyaWEtaGlkZGVuPVwidHJ1ZVwiXG4gICAgb25Gb2N1cz17b25Gb2N1c31cbiAgICBjc3M9e3tcbiAgICAgIGxhYmVsOiAncmVxdWlyZWRJbnB1dCcsXG4gICAgICBvcGFjaXR5OiAwLFxuICAgICAgcG9pbnRlckV2ZW50czogJ25vbmUnLFxuICAgICAgcG9zaXRpb246ICdhYnNvbHV0ZScsXG4gICAgICBib3R0b206IDAsXG4gICAgICBsZWZ0OiAwLFxuICAgICAgcmlnaHQ6IDAsXG4gICAgICB3aWR0aDogJzEwMCUnLFxuICAgIH19XG4gICAgLy8gUHJldmVudCBgU3dpdGNoaW5nIGZyb20gdW5jb250cm9sbGVkIHRvIGNvbnRyb2xsZWRgIGVycm9yXG4gICAgdmFsdWU9XCJcIlxuICAgIG9uQ2hhbmdlPXsoKSA9PiB7fX1cbiAgLz5cbik7XG5cbmV4cG9ydCBkZWZhdWx0IFJlcXVpcmVkSW5wdXQ7XG4iXX0= */",
  toString: UA
}, QA = function(t) {
  var n = t.name, r = t.onFocus;
  return tt("input", {
    required: !0,
    name: n,
    tabIndex: -1,
    "aria-hidden": "true",
    onFocus: r,
    css: qA,
    value: "",
    onChange: function() {
    }
  });
}, KA = QA;
function Qc(e) {
  var t;
  return typeof window < "u" && window.navigator != null ? e.test(((t = window.navigator.userAgentData) === null || t === void 0 ? void 0 : t.platform) || window.navigator.platform) : !1;
}
function eP() {
  return Qc(/^iPhone/i);
}
function Mm() {
  return Qc(/^Mac/i);
}
function tP() {
  return Qc(/^iPad/i) || // iPadOS 13 lies and says it's a Mac, but we can distinguish by detecting touch support.
  Mm() && navigator.maxTouchPoints > 1;
}
function nP() {
  return eP() || tP();
}
function rP() {
  return Mm() || nP();
}
var iP = function(t) {
  return t.label;
}, oP = function(t) {
  return t.label;
}, aP = function(t) {
  return t.value;
}, sP = function(t) {
  return !!t.isDisabled;
}, lP = {
  clearIndicator: zE,
  container: kE,
  control: JE,
  dropdownIndicator: DE,
  group: KE,
  groupHeading: tA,
  indicatorsContainer: NE,
  indicatorSeparator: WE,
  input: oA,
  loadingIndicator: YE,
  loadingMessage: RE,
  menu: bE,
  menuList: CE,
  menuPortal: PE,
  multiValue: cA,
  multiValueLabel: dA,
  multiValueRemove: fA,
  noOptionsMessage: IE,
  option: bA,
  placeholder: xA,
  singleValue: IA,
  valueContainer: FE
}, uP = {
  primary: "#2684FF",
  primary75: "#4C9AFF",
  primary50: "#B2D4FF",
  primary25: "#DEEBFF",
  danger: "#DE350B",
  dangerLight: "#FFBDAD",
  neutral0: "hsl(0, 0%, 100%)",
  neutral5: "hsl(0, 0%, 95%)",
  neutral10: "hsl(0, 0%, 90%)",
  neutral20: "hsl(0, 0%, 80%)",
  neutral30: "hsl(0, 0%, 70%)",
  neutral40: "hsl(0, 0%, 60%)",
  neutral50: "hsl(0, 0%, 50%)",
  neutral60: "hsl(0, 0%, 40%)",
  neutral70: "hsl(0, 0%, 30%)",
  neutral80: "hsl(0, 0%, 20%)",
  neutral90: "hsl(0, 0%, 10%)"
}, cP = 4, Vm = 4, dP = 38, fP = Vm * 2, pP = {
  baseUnit: Vm,
  controlHeight: dP,
  menuGutter: fP
}, fu = {
  borderRadius: cP,
  colors: uP,
  spacing: pP
}, gP = {
  "aria-live": "polite",
  backspaceRemovesValue: !0,
  blurInputOnSelect: ap(),
  captureMenuScroll: !ap(),
  classNames: {},
  closeMenuOnSelect: !0,
  closeMenuOnScroll: !1,
  components: {},
  controlShouldRenderValue: !0,
  escapeClearsValue: !1,
  filterOption: DA(),
  formatGroupLabel: iP,
  getOptionLabel: oP,
  getOptionValue: aP,
  isDisabled: !1,
  isLoading: !1,
  isMulti: !1,
  isRtl: !1,
  isSearchable: !0,
  isOptionDisabled: sP,
  loadingMessage: function() {
    return "Loading...";
  },
  maxMenuHeight: 300,
  minMenuHeight: 140,
  menuIsOpen: !1,
  menuPlacement: "bottom",
  menuPosition: "absolute",
  menuShouldBlockScroll: !1,
  menuShouldScrollIntoView: !lE(),
  noOptionsMessage: function() {
    return "No options";
  },
  openMenuOnFocus: !1,
  openMenuOnClick: !0,
  options: [],
  pageSize: 5,
  placeholder: "Select...",
  screenReaderStatus: function(t) {
    var n = t.count;
    return "".concat(n, " result").concat(n !== 1 ? "s" : "", " available");
  },
  styles: {},
  tabIndex: 0,
  tabSelectsValue: !0,
  unstyled: !1
};
function bp(e, t, n, r) {
  var i = jm(e, t, n), a = zm(e, t, n), o = Dm(e, t), l = gs(e, t);
  return {
    type: "option",
    data: t,
    isDisabled: i,
    isSelected: a,
    label: o,
    value: l,
    index: r
  };
}
function Ya(e, t) {
  return e.options.map(function(n, r) {
    if ("options" in n) {
      var i = n.options.map(function(o, l) {
        return bp(e, o, t, l);
      }).filter(function(o) {
        return wp(e, o);
      });
      return i.length > 0 ? {
        type: "group",
        data: n,
        options: i,
        index: r
      } : void 0;
    }
    var a = bp(e, n, t, r);
    return wp(e, a) ? a : void 0;
  }).filter(dE);
}
function Lm(e) {
  return e.reduce(function(t, n) {
    return n.type === "group" ? t.push.apply(t, zc(n.options.map(function(r) {
      return r.data;
    }))) : t.push(n.data), t;
  }, []);
}
function yp(e, t) {
  return e.reduce(function(n, r) {
    return r.type === "group" ? n.push.apply(n, zc(r.options.map(function(i) {
      return {
        data: i.data,
        id: "".concat(t, "-").concat(r.index, "-").concat(i.index)
      };
    }))) : n.push({
      data: r.data,
      id: "".concat(t, "-").concat(r.index)
    }), n;
  }, []);
}
function hP(e, t) {
  return Lm(Ya(e, t));
}
function wp(e, t) {
  var n = e.inputValue, r = n === void 0 ? "" : n, i = t.data, a = t.isSelected, o = t.label, l = t.value;
  return (!Wm(e) || !a) && Hm(e, {
    label: o,
    value: l,
    data: i
  }, r);
}
function mP(e, t) {
  var n = e.focusedValue, r = e.selectValue, i = r.indexOf(n);
  if (i > -1) {
    var a = t.indexOf(n);
    if (a > -1)
      return n;
    if (i < t.length)
      return t[i];
  }
  return null;
}
function vP(e, t) {
  var n = e.focusedOption;
  return n && t.indexOf(n) > -1 ? n : t[0];
}
var pu = function(t, n) {
  var r, i = (r = t.find(function(a) {
    return a.data === n;
  })) === null || r === void 0 ? void 0 : r.id;
  return i || null;
}, Dm = function(t, n) {
  return t.getOptionLabel(n);
}, gs = function(t, n) {
  return t.getOptionValue(n);
};
function jm(e, t, n) {
  return typeof e.isOptionDisabled == "function" ? e.isOptionDisabled(t, n) : !1;
}
function zm(e, t, n) {
  if (n.indexOf(t) > -1) return !0;
  if (typeof e.isOptionSelected == "function")
    return e.isOptionSelected(t, n);
  var r = gs(e, t);
  return n.some(function(i) {
    return gs(e, i) === r;
  });
}
function Hm(e, t, n) {
  return e.filterOption ? e.filterOption(t, n) : !0;
}
var Wm = function(t) {
  var n = t.hideSelectedOptions, r = t.isMulti;
  return n === void 0 ? r : n;
}, bP = 1, $m = /* @__PURE__ */ function(e) {
  z1(n, e);
  var t = W1(n);
  function n(r) {
    var i;
    if (D1(this, n), i = t.call(this, r), i.state = {
      ariaSelection: null,
      focusedOption: null,
      focusedOptionId: null,
      focusableOptionsWithIds: [],
      focusedValue: null,
      inputIsHidden: !1,
      isFocused: !1,
      selectValue: [],
      clearFocusValueOnUpdate: !1,
      prevWasFocused: !1,
      inputIsHiddenAfterUpdate: void 0,
      prevProps: void 0,
      instancePrefix: ""
    }, i.blockOptionHover = !1, i.isComposing = !1, i.commonProps = void 0, i.initialTouchX = 0, i.initialTouchY = 0, i.openAfterFocus = !1, i.scrollToFocusedOptionOnUpdate = !1, i.userIsDragging = void 0, i.isAppleDevice = rP(), i.controlRef = null, i.getControlRef = function(u) {
      i.controlRef = u;
    }, i.focusedOptionRef = null, i.getFocusedOptionRef = function(u) {
      i.focusedOptionRef = u;
    }, i.menuListRef = null, i.getMenuListRef = function(u) {
      i.menuListRef = u;
    }, i.inputRef = null, i.getInputRef = function(u) {
      i.inputRef = u;
    }, i.focus = i.focusInput, i.blur = i.blurInput, i.onChange = function(u, s) {
      var d = i.props, c = d.onChange, m = d.name;
      s.name = m, i.ariaOnChange(u, s), c(u, s);
    }, i.setValue = function(u, s, d) {
      var c = i.props, m = c.closeMenuOnSelect, h = c.isMulti, x = c.inputValue;
      i.onInputChange("", {
        action: "set-value",
        prevInputValue: x
      }), m && (i.setState({
        inputIsHiddenAfterUpdate: !h
      }), i.onMenuClose()), i.setState({
        clearFocusValueOnUpdate: !0
      }), i.onChange(u, {
        action: s,
        option: d
      });
    }, i.selectOption = function(u) {
      var s = i.props, d = s.blurInputOnSelect, c = s.isMulti, m = s.name, h = i.state.selectValue, x = c && i.isOptionSelected(u, h), v = i.isOptionDisabled(u, h);
      if (x) {
        var b = i.getOptionValue(u);
        i.setValue(h.filter(function(I) {
          return i.getOptionValue(I) !== b;
        }), "deselect-option", u);
      } else if (!v)
        c ? i.setValue([].concat(zc(h), [u]), "select-option", u) : i.setValue(u, "select-option");
      else {
        i.ariaOnChange(u, {
          action: "select-option",
          option: u,
          name: m
        });
        return;
      }
      d && i.blurInput();
    }, i.removeValue = function(u) {
      var s = i.props.isMulti, d = i.state.selectValue, c = i.getOptionValue(u), m = d.filter(function(x) {
        return i.getOptionValue(x) !== c;
      }), h = Ma(s, m, m[0] || null);
      i.onChange(h, {
        action: "remove-value",
        removedValue: u
      }), i.focusInput();
    }, i.clearValue = function() {
      var u = i.state.selectValue;
      i.onChange(Ma(i.props.isMulti, [], null), {
        action: "clear",
        removedValues: u
      });
    }, i.popValue = function() {
      var u = i.props.isMulti, s = i.state.selectValue, d = s[s.length - 1], c = s.slice(0, s.length - 1), m = Ma(u, c, c[0] || null);
      d && i.onChange(m, {
        action: "pop-value",
        removedValue: d
      });
    }, i.getFocusedOptionId = function(u) {
      return pu(i.state.focusableOptionsWithIds, u);
    }, i.getFocusableOptionsWithIds = function() {
      return yp(Ya(i.props, i.state.selectValue), i.getElementId("option"));
    }, i.getValue = function() {
      return i.state.selectValue;
    }, i.cx = function() {
      for (var u = arguments.length, s = new Array(u), d = 0; d < u; d++)
        s[d] = arguments[d];
      return rE.apply(void 0, [i.props.classNamePrefix].concat(s));
    }, i.getOptionLabel = function(u) {
      return Dm(i.props, u);
    }, i.getOptionValue = function(u) {
      return gs(i.props, u);
    }, i.getStyles = function(u, s) {
      var d = i.props.unstyled, c = lP[u](s, d);
      c.boxSizing = "border-box";
      var m = i.props.styles[u];
      return m ? m(c, s) : c;
    }, i.getClassNames = function(u, s) {
      var d, c;
      return (d = (c = i.props.classNames)[u]) === null || d === void 0 ? void 0 : d.call(c, s);
    }, i.getElementId = function(u) {
      return "".concat(i.state.instancePrefix, "-").concat(u);
    }, i.getComponents = function() {
      return AA(i.props);
    }, i.buildCategorizedOptions = function() {
      return Ya(i.props, i.state.selectValue);
    }, i.getCategorizedOptions = function() {
      return i.props.menuIsOpen ? i.buildCategorizedOptions() : [];
    }, i.buildFocusableOptions = function() {
      return Lm(i.buildCategorizedOptions());
    }, i.getFocusableOptions = function() {
      return i.props.menuIsOpen ? i.buildFocusableOptions() : [];
    }, i.ariaOnChange = function(u, s) {
      i.setState({
        ariaSelection: st({
          value: u
        }, s)
      });
    }, i.onMenuMouseDown = function(u) {
      u.button === 0 && (u.stopPropagation(), u.preventDefault(), i.focusInput());
    }, i.onMenuMouseMove = function(u) {
      i.blockOptionHover = !1;
    }, i.onControlMouseDown = function(u) {
      if (!u.defaultPrevented) {
        var s = i.props.openMenuOnClick;
        i.state.isFocused ? i.props.menuIsOpen ? u.target.tagName !== "INPUT" && u.target.tagName !== "TEXTAREA" && i.onMenuClose() : s && i.openMenu("first") : (s && (i.openAfterFocus = !0), i.focusInput()), u.target.tagName !== "INPUT" && u.target.tagName !== "TEXTAREA" && u.preventDefault();
      }
    }, i.onDropdownIndicatorMouseDown = function(u) {
      if (!(u && u.type === "mousedown" && u.button !== 0) && !i.props.isDisabled) {
        var s = i.props, d = s.isMulti, c = s.menuIsOpen;
        i.focusInput(), c ? (i.setState({
          inputIsHiddenAfterUpdate: !d
        }), i.onMenuClose()) : i.openMenu("first"), u.preventDefault();
      }
    }, i.onClearIndicatorMouseDown = function(u) {
      u && u.type === "mousedown" && u.button !== 0 || (i.clearValue(), u.preventDefault(), i.openAfterFocus = !1, u.type === "touchend" ? i.focusInput() : setTimeout(function() {
        return i.focusInput();
      }));
    }, i.onScroll = function(u) {
      typeof i.props.closeMenuOnScroll == "boolean" ? u.target instanceof HTMLElement && Bs(u.target) && i.props.onMenuClose() : typeof i.props.closeMenuOnScroll == "function" && i.props.closeMenuOnScroll(u) && i.props.onMenuClose();
    }, i.onCompositionStart = function() {
      i.isComposing = !0;
    }, i.onCompositionEnd = function() {
      i.isComposing = !1;
    }, i.onTouchStart = function(u) {
      var s = u.touches, d = s && s.item(0);
      d && (i.initialTouchX = d.clientX, i.initialTouchY = d.clientY, i.userIsDragging = !1);
    }, i.onTouchMove = function(u) {
      var s = u.touches, d = s && s.item(0);
      if (d) {
        var c = Math.abs(d.clientX - i.initialTouchX), m = Math.abs(d.clientY - i.initialTouchY), h = 5;
        i.userIsDragging = c > h || m > h;
      }
    }, i.onTouchEnd = function(u) {
      i.userIsDragging || (i.controlRef && !i.controlRef.contains(u.target) && i.menuListRef && !i.menuListRef.contains(u.target) && i.blurInput(), i.initialTouchX = 0, i.initialTouchY = 0);
    }, i.onControlTouchEnd = function(u) {
      i.userIsDragging || i.onControlMouseDown(u);
    }, i.onClearIndicatorTouchEnd = function(u) {
      i.userIsDragging || i.onClearIndicatorMouseDown(u);
    }, i.onDropdownIndicatorTouchEnd = function(u) {
      i.userIsDragging || i.onDropdownIndicatorMouseDown(u);
    }, i.handleInputChange = function(u) {
      var s = i.props.inputValue, d = u.currentTarget.value;
      i.setState({
        inputIsHiddenAfterUpdate: !1
      }), i.onInputChange(d, {
        action: "input-change",
        prevInputValue: s
      }), i.props.menuIsOpen || i.onMenuOpen();
    }, i.onInputFocus = function(u) {
      i.props.onFocus && i.props.onFocus(u), i.setState({
        inputIsHiddenAfterUpdate: !1,
        isFocused: !0
      }), (i.openAfterFocus || i.props.openMenuOnFocus) && i.openMenu("first"), i.openAfterFocus = !1;
    }, i.onInputBlur = function(u) {
      var s = i.props.inputValue;
      if (i.menuListRef && i.menuListRef.contains(document.activeElement)) {
        i.inputRef.focus();
        return;
      }
      i.props.onBlur && i.props.onBlur(u), i.onInputChange("", {
        action: "input-blur",
        prevInputValue: s
      }), i.onMenuClose(), i.setState({
        focusedValue: null,
        isFocused: !1
      });
    }, i.onOptionHover = function(u) {
      if (!(i.blockOptionHover || i.state.focusedOption === u)) {
        var s = i.getFocusableOptions(), d = s.indexOf(u);
        i.setState({
          focusedOption: u,
          focusedOptionId: d > -1 ? i.getFocusedOptionId(u) : null
        });
      }
    }, i.shouldHideSelectedOptions = function() {
      return Wm(i.props);
    }, i.onValueInputFocus = function(u) {
      u.preventDefault(), u.stopPropagation(), i.focus();
    }, i.onKeyDown = function(u) {
      var s = i.props, d = s.isMulti, c = s.backspaceRemovesValue, m = s.escapeClearsValue, h = s.inputValue, x = s.isClearable, v = s.isDisabled, b = s.menuIsOpen, I = s.onKeyDown, O = s.tabSelectsValue, T = s.openMenuOnFocus, D = i.state, E = D.focusedOption, B = D.focusedValue, X = D.selectValue;
      if (!v && !(typeof I == "function" && (I(u), u.defaultPrevented))) {
        switch (i.blockOptionHover = !0, u.key) {
          case "ArrowLeft":
            if (!d || h) return;
            i.focusValue("previous");
            break;
          case "ArrowRight":
            if (!d || h) return;
            i.focusValue("next");
            break;
          case "Delete":
          case "Backspace":
            if (h) return;
            if (B)
              i.removeValue(B);
            else {
              if (!c) return;
              d ? i.popValue() : x && i.clearValue();
            }
            break;
          case "Tab":
            if (i.isComposing || u.shiftKey || !b || !O || !E || // don't capture the event if the menu opens on focus and the focused
            // option is already selected; it breaks the flow of navigation
            T && i.isOptionSelected(E, X))
              return;
            i.selectOption(E);
            break;
          case "Enter":
            if (u.keyCode === 229)
              break;
            if (b) {
              if (!E || i.isComposing) return;
              i.selectOption(E);
              break;
            }
            return;
          case "Escape":
            b ? (i.setState({
              inputIsHiddenAfterUpdate: !1
            }), i.onInputChange("", {
              action: "menu-close",
              prevInputValue: h
            }), i.onMenuClose()) : x && m && i.clearValue();
            break;
          case " ":
            if (h)
              return;
            if (!b) {
              i.openMenu("first");
              break;
            }
            if (!E) return;
            i.selectOption(E);
            break;
          case "ArrowUp":
            b ? i.focusOption("up") : i.openMenu("last");
            break;
          case "ArrowDown":
            b ? i.focusOption("down") : i.openMenu("first");
            break;
          case "PageUp":
            if (!b) return;
            i.focusOption("pageup");
            break;
          case "PageDown":
            if (!b) return;
            i.focusOption("pagedown");
            break;
          case "Home":
            if (!b) return;
            i.focusOption("first");
            break;
          case "End":
            if (!b) return;
            i.focusOption("last");
            break;
          default:
            return;
        }
        u.preventDefault();
      }
    }, i.state.instancePrefix = "react-select-" + (i.props.instanceId || ++bP), i.state.selectValue = ip(r.value), r.menuIsOpen && i.state.selectValue.length) {
      var a = i.getFocusableOptionsWithIds(), o = i.buildFocusableOptions(), l = o.indexOf(i.state.selectValue[0]);
      i.state.focusableOptionsWithIds = a, i.state.focusedOption = o[l], i.state.focusedOptionId = pu(a, o[l]);
    }
    return i;
  }
  return j1(n, [{
    key: "componentDidMount",
    value: function() {
      this.startListeningComposition(), this.startListeningToTouch(), this.props.closeMenuOnScroll && document && document.addEventListener && document.addEventListener("scroll", this.onScroll, !0), this.props.autoFocus && this.focusInput(), this.props.menuIsOpen && this.state.focusedOption && this.menuListRef && this.focusedOptionRef && op(this.menuListRef, this.focusedOptionRef);
    }
  }, {
    key: "componentDidUpdate",
    value: function(i) {
      var a = this.props, o = a.isDisabled, l = a.menuIsOpen, u = this.state.isFocused;
      // ensure focus is restored correctly when the control becomes enabled
      (u && !o && i.isDisabled || // ensure focus is on the Input when the menu opens
      u && l && !i.menuIsOpen) && this.focusInput(), u && o && !i.isDisabled ? this.setState({
        isFocused: !1
      }, this.onMenuClose) : !u && !o && i.isDisabled && this.inputRef === document.activeElement && this.setState({
        isFocused: !0
      }), this.menuListRef && this.focusedOptionRef && this.scrollToFocusedOptionOnUpdate && (op(this.menuListRef, this.focusedOptionRef), this.scrollToFocusedOptionOnUpdate = !1);
    }
  }, {
    key: "componentWillUnmount",
    value: function() {
      this.stopListeningComposition(), this.stopListeningToTouch(), document.removeEventListener("scroll", this.onScroll, !0);
    }
    // ==============================
    // Consumer Handlers
    // ==============================
  }, {
    key: "onMenuOpen",
    value: function() {
      this.props.onMenuOpen();
    }
  }, {
    key: "onMenuClose",
    value: function() {
      this.onInputChange("", {
        action: "menu-close",
        prevInputValue: this.props.inputValue
      }), this.props.onMenuClose();
    }
  }, {
    key: "onInputChange",
    value: function(i, a) {
      this.props.onInputChange(i, a);
    }
    // ==============================
    // Methods
    // ==============================
  }, {
    key: "focusInput",
    value: function() {
      this.inputRef && this.inputRef.focus();
    }
  }, {
    key: "blurInput",
    value: function() {
      this.inputRef && this.inputRef.blur();
    }
    // aliased for consumers
  }, {
    key: "openMenu",
    value: function(i) {
      var a = this, o = this.state, l = o.selectValue, u = o.isFocused, s = this.buildFocusableOptions(), d = i === "first" ? 0 : s.length - 1;
      if (!this.props.isMulti) {
        var c = s.indexOf(l[0]);
        c > -1 && (d = c);
      }
      this.scrollToFocusedOptionOnUpdate = !(u && this.menuListRef), this.setState({
        inputIsHiddenAfterUpdate: !1,
        focusedValue: null,
        focusedOption: s[d],
        focusedOptionId: this.getFocusedOptionId(s[d])
      }, function() {
        return a.onMenuOpen();
      });
    }
  }, {
    key: "focusValue",
    value: function(i) {
      var a = this.state, o = a.selectValue, l = a.focusedValue;
      if (this.props.isMulti) {
        this.setState({
          focusedOption: null
        });
        var u = o.indexOf(l);
        l || (u = -1);
        var s = o.length - 1, d = -1;
        if (o.length) {
          switch (i) {
            case "previous":
              u === 0 ? d = 0 : u === -1 ? d = s : d = u - 1;
              break;
            case "next":
              u > -1 && u < s && (d = u + 1);
              break;
          }
          this.setState({
            inputIsHidden: d !== -1,
            focusedValue: o[d]
          });
        }
      }
    }
  }, {
    key: "focusOption",
    value: function() {
      var i = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : "first", a = this.props.pageSize, o = this.state.focusedOption, l = this.getFocusableOptions();
      if (l.length) {
        var u = 0, s = l.indexOf(o);
        o || (s = -1), i === "up" ? u = s > 0 ? s - 1 : l.length - 1 : i === "down" ? u = (s + 1) % l.length : i === "pageup" ? (u = s - a, u < 0 && (u = 0)) : i === "pagedown" ? (u = s + a, u > l.length - 1 && (u = l.length - 1)) : i === "last" && (u = l.length - 1), this.scrollToFocusedOptionOnUpdate = !0, this.setState({
          focusedOption: l[u],
          focusedValue: null,
          focusedOptionId: this.getFocusedOptionId(l[u])
        });
      }
    }
  }, {
    key: "getTheme",
    value: (
      // ==============================
      // Getters
      // ==============================
      function() {
        return this.props.theme ? typeof this.props.theme == "function" ? this.props.theme(fu) : st(st({}, fu), this.props.theme) : fu;
      }
    )
  }, {
    key: "getCommonProps",
    value: function() {
      var i = this.clearValue, a = this.cx, o = this.getStyles, l = this.getClassNames, u = this.getValue, s = this.selectOption, d = this.setValue, c = this.props, m = c.isMulti, h = c.isRtl, x = c.options, v = this.hasValue();
      return {
        clearValue: i,
        cx: a,
        getStyles: o,
        getClassNames: l,
        getValue: u,
        hasValue: v,
        isMulti: m,
        isRtl: h,
        options: x,
        selectOption: s,
        selectProps: c,
        setValue: d,
        theme: this.getTheme()
      };
    }
  }, {
    key: "hasValue",
    value: function() {
      var i = this.state.selectValue;
      return i.length > 0;
    }
  }, {
    key: "hasOptions",
    value: function() {
      return !!this.getFocusableOptions().length;
    }
  }, {
    key: "isClearable",
    value: function() {
      var i = this.props, a = i.isClearable, o = i.isMulti;
      return a === void 0 ? o : a;
    }
  }, {
    key: "isOptionDisabled",
    value: function(i, a) {
      return jm(this.props, i, a);
    }
  }, {
    key: "isOptionSelected",
    value: function(i, a) {
      return zm(this.props, i, a);
    }
  }, {
    key: "filterOption",
    value: function(i, a) {
      return Hm(this.props, i, a);
    }
  }, {
    key: "formatOptionLabel",
    value: function(i, a) {
      if (typeof this.props.formatOptionLabel == "function") {
        var o = this.props.inputValue, l = this.state.selectValue;
        return this.props.formatOptionLabel(i, {
          context: a,
          inputValue: o,
          selectValue: l
        });
      } else
        return this.getOptionLabel(i);
    }
  }, {
    key: "formatGroupLabel",
    value: function(i) {
      return this.props.formatGroupLabel(i);
    }
    // ==============================
    // Mouse Handlers
    // ==============================
  }, {
    key: "startListeningComposition",
    value: (
      // ==============================
      // Composition Handlers
      // ==============================
      function() {
        document && document.addEventListener && (document.addEventListener("compositionstart", this.onCompositionStart, !1), document.addEventListener("compositionend", this.onCompositionEnd, !1));
      }
    )
  }, {
    key: "stopListeningComposition",
    value: function() {
      document && document.removeEventListener && (document.removeEventListener("compositionstart", this.onCompositionStart), document.removeEventListener("compositionend", this.onCompositionEnd));
    }
  }, {
    key: "startListeningToTouch",
    value: (
      // ==============================
      // Touch Handlers
      // ==============================
      function() {
        document && document.addEventListener && (document.addEventListener("touchstart", this.onTouchStart, !1), document.addEventListener("touchmove", this.onTouchMove, !1), document.addEventListener("touchend", this.onTouchEnd, !1));
      }
    )
  }, {
    key: "stopListeningToTouch",
    value: function() {
      document && document.removeEventListener && (document.removeEventListener("touchstart", this.onTouchStart), document.removeEventListener("touchmove", this.onTouchMove), document.removeEventListener("touchend", this.onTouchEnd));
    }
  }, {
    key: "renderInput",
    value: (
      // ==============================
      // Renderers
      // ==============================
      function() {
        var i = this.props, a = i.isDisabled, o = i.isSearchable, l = i.inputId, u = i.inputValue, s = i.tabIndex, d = i.form, c = i.menuIsOpen, m = i.required, h = this.getComponents(), x = h.Input, v = this.state, b = v.inputIsHidden, I = v.ariaSelection, O = this.commonProps, T = l || this.getElementId("input"), D = st(st(st({
          "aria-autocomplete": "list",
          "aria-expanded": c,
          "aria-haspopup": !0,
          "aria-errormessage": this.props["aria-errormessage"],
          "aria-invalid": this.props["aria-invalid"],
          "aria-label": this.props["aria-label"],
          "aria-labelledby": this.props["aria-labelledby"],
          "aria-required": m,
          role: "combobox",
          "aria-activedescendant": this.isAppleDevice ? void 0 : this.state.focusedOptionId || ""
        }, c && {
          "aria-controls": this.getElementId("listbox")
        }), !o && {
          "aria-readonly": !0
        }), this.hasValue() ? (I == null ? void 0 : I.action) === "initial-input-focus" && {
          "aria-describedby": this.getElementId("live-region")
        } : {
          "aria-describedby": this.getElementId("placeholder")
        });
        return o ? /* @__PURE__ */ he.createElement(x, ke({}, O, {
          autoCapitalize: "none",
          autoComplete: "off",
          autoCorrect: "off",
          id: T,
          innerRef: this.getInputRef,
          isDisabled: a,
          isHidden: b,
          onBlur: this.onInputBlur,
          onChange: this.handleInputChange,
          onFocus: this.onInputFocus,
          spellCheck: "false",
          tabIndex: s,
          form: d,
          type: "text",
          value: u
        }, D)) : /* @__PURE__ */ he.createElement(zA, ke({
          id: T,
          innerRef: this.getInputRef,
          onBlur: this.onInputBlur,
          onChange: fs,
          onFocus: this.onInputFocus,
          disabled: a,
          tabIndex: s,
          inputMode: "none",
          form: d,
          value: ""
        }, D));
      }
    )
  }, {
    key: "renderPlaceholderOrValue",
    value: function() {
      var i = this, a = this.getComponents(), o = a.MultiValue, l = a.MultiValueContainer, u = a.MultiValueLabel, s = a.MultiValueRemove, d = a.SingleValue, c = a.Placeholder, m = this.commonProps, h = this.props, x = h.controlShouldRenderValue, v = h.isDisabled, b = h.isMulti, I = h.inputValue, O = h.placeholder, T = this.state, D = T.selectValue, E = T.focusedValue, B = T.isFocused;
      if (!this.hasValue() || !x)
        return I ? null : /* @__PURE__ */ he.createElement(c, ke({}, m, {
          key: "placeholder",
          isDisabled: v,
          isFocused: B,
          innerProps: {
            id: this.getElementId("placeholder")
          }
        }), O);
      if (b)
        return D.map(function(U, K) {
          var Fe = U === E, oe = "".concat(i.getOptionLabel(U), "-").concat(i.getOptionValue(U));
          return /* @__PURE__ */ he.createElement(o, ke({}, m, {
            components: {
              Container: l,
              Label: u,
              Remove: s
            },
            isFocused: Fe,
            isDisabled: v,
            key: oe,
            index: K,
            removeProps: {
              onClick: function() {
                return i.removeValue(U);
              },
              onTouchEnd: function() {
                return i.removeValue(U);
              },
              onMouseDown: function(ye) {
                ye.preventDefault();
              }
            },
            data: U
          }), i.formatOptionLabel(U, "value"));
        });
      if (I)
        return null;
      var X = D[0];
      return /* @__PURE__ */ he.createElement(d, ke({}, m, {
        data: X,
        isDisabled: v
      }), this.formatOptionLabel(X, "value"));
    }
  }, {
    key: "renderClearIndicator",
    value: function() {
      var i = this.getComponents(), a = i.ClearIndicator, o = this.commonProps, l = this.props, u = l.isDisabled, s = l.isLoading, d = this.state.isFocused;
      if (!this.isClearable() || !a || u || !this.hasValue() || s)
        return null;
      var c = {
        onMouseDown: this.onClearIndicatorMouseDown,
        onTouchEnd: this.onClearIndicatorTouchEnd,
        "aria-hidden": "true"
      };
      return /* @__PURE__ */ he.createElement(a, ke({}, o, {
        innerProps: c,
        isFocused: d
      }));
    }
  }, {
    key: "renderLoadingIndicator",
    value: function() {
      var i = this.getComponents(), a = i.LoadingIndicator, o = this.commonProps, l = this.props, u = l.isDisabled, s = l.isLoading, d = this.state.isFocused;
      if (!a || !s) return null;
      var c = {
        "aria-hidden": "true"
      };
      return /* @__PURE__ */ he.createElement(a, ke({}, o, {
        innerProps: c,
        isDisabled: u,
        isFocused: d
      }));
    }
  }, {
    key: "renderIndicatorSeparator",
    value: function() {
      var i = this.getComponents(), a = i.DropdownIndicator, o = i.IndicatorSeparator;
      if (!a || !o) return null;
      var l = this.commonProps, u = this.props.isDisabled, s = this.state.isFocused;
      return /* @__PURE__ */ he.createElement(o, ke({}, l, {
        isDisabled: u,
        isFocused: s
      }));
    }
  }, {
    key: "renderDropdownIndicator",
    value: function() {
      var i = this.getComponents(), a = i.DropdownIndicator;
      if (!a) return null;
      var o = this.commonProps, l = this.props.isDisabled, u = this.state.isFocused, s = {
        onMouseDown: this.onDropdownIndicatorMouseDown,
        onTouchEnd: this.onDropdownIndicatorTouchEnd,
        "aria-hidden": "true"
      };
      return /* @__PURE__ */ he.createElement(a, ke({}, o, {
        innerProps: s,
        isDisabled: l,
        isFocused: u
      }));
    }
  }, {
    key: "renderMenu",
    value: function() {
      var i = this, a = this.getComponents(), o = a.Group, l = a.GroupHeading, u = a.Menu, s = a.MenuList, d = a.MenuPortal, c = a.LoadingMessage, m = a.NoOptionsMessage, h = a.Option, x = this.commonProps, v = this.state.focusedOption, b = this.props, I = b.captureMenuScroll, O = b.inputValue, T = b.isLoading, D = b.loadingMessage, E = b.minMenuHeight, B = b.maxMenuHeight, X = b.menuIsOpen, U = b.menuPlacement, K = b.menuPosition, Fe = b.menuPortalTarget, oe = b.menuShouldBlockScroll, ce = b.menuShouldScrollIntoView, ye = b.noOptionsMessage, Q = b.onMenuScrollToTop, ue = b.onMenuScrollToBottom;
      if (!X) return null;
      var Ee = function(w, H) {
        var $ = w.type, _ = w.data, re = w.isDisabled, Y = w.isSelected, fe = w.label, ge = w.value, ve = v === _, Te = re ? void 0 : function() {
          return i.onOptionHover(_);
        }, J = re ? void 0 : function() {
          return i.selectOption(_);
        }, ft = "".concat(i.getElementId("option"), "-").concat(H), je = {
          id: ft,
          onClick: J,
          onMouseMove: Te,
          onMouseOver: Te,
          tabIndex: -1,
          role: "option",
          "aria-selected": i.isAppleDevice ? void 0 : Y
          // is not supported on Apple devices
        };
        return /* @__PURE__ */ he.createElement(h, ke({}, x, {
          innerProps: je,
          data: _,
          isDisabled: re,
          isSelected: Y,
          key: ft,
          label: fe,
          type: $,
          value: ge,
          isFocused: ve,
          innerRef: ve ? i.getFocusedOptionRef : void 0
        }), i.formatOptionLabel(w.data, "menu"));
      }, We;
      if (this.hasOptions())
        We = this.getCategorizedOptions().map(function(A) {
          if (A.type === "group") {
            var w = A.data, H = A.options, $ = A.index, _ = "".concat(i.getElementId("group"), "-").concat($), re = "".concat(_, "-heading");
            return /* @__PURE__ */ he.createElement(o, ke({}, x, {
              key: _,
              data: w,
              options: H,
              Heading: l,
              headingProps: {
                id: re,
                data: A.data
              },
              label: i.formatGroupLabel(A.data)
            }), A.options.map(function(Y) {
              return Ee(Y, "".concat($, "-").concat(Y.index));
            }));
          } else if (A.type === "option")
            return Ee(A, "".concat(A.index));
        });
      else if (T) {
        var $e = D({
          inputValue: O
        });
        if ($e === null) return null;
        We = /* @__PURE__ */ he.createElement(c, x, $e);
      } else {
        var ht = ye({
          inputValue: O
        });
        if (ht === null) return null;
        We = /* @__PURE__ */ he.createElement(m, x, ht);
      }
      var G = {
        minMenuHeight: E,
        maxMenuHeight: B,
        menuPlacement: U,
        menuPosition: K,
        menuShouldScrollIntoView: ce
      }, Z = /* @__PURE__ */ he.createElement(yE, ke({}, x, G), function(A) {
        var w = A.ref, H = A.placerProps, $ = H.placement, _ = H.maxHeight;
        return /* @__PURE__ */ he.createElement(u, ke({}, x, G, {
          innerRef: w,
          innerProps: {
            onMouseDown: i.onMenuMouseDown,
            onMouseMove: i.onMenuMouseMove
          },
          isLoading: T,
          placement: $
        }), /* @__PURE__ */ he.createElement(JA, {
          captureEnabled: I,
          onTopArrive: Q,
          onBottomArrive: ue,
          lockEnabled: oe
        }, function(re) {
          return /* @__PURE__ */ he.createElement(s, ke({}, x, {
            innerRef: function(fe) {
              i.getMenuListRef(fe), re(fe);
            },
            innerProps: {
              role: "listbox",
              "aria-multiselectable": x.isMulti,
              id: i.getElementId("listbox")
            },
            isLoading: T,
            maxHeight: _,
            focusedOption: v
          }), We);
        }));
      });
      return Fe || K === "fixed" ? /* @__PURE__ */ he.createElement(d, ke({}, x, {
        appendTo: Fe,
        controlElement: this.controlRef,
        menuPlacement: U,
        menuPosition: K
      }), Z) : Z;
    }
  }, {
    key: "renderFormField",
    value: function() {
      var i = this, a = this.props, o = a.delimiter, l = a.isDisabled, u = a.isMulti, s = a.name, d = a.required, c = this.state.selectValue;
      if (d && !this.hasValue() && !l)
        return /* @__PURE__ */ he.createElement(KA, {
          name: s,
          onFocus: this.onValueInputFocus
        });
      if (!(!s || l))
        if (u)
          if (o) {
            var m = c.map(function(v) {
              return i.getOptionValue(v);
            }).join(o);
            return /* @__PURE__ */ he.createElement("input", {
              name: s,
              type: "hidden",
              value: m
            });
          } else {
            var h = c.length > 0 ? c.map(function(v, b) {
              return /* @__PURE__ */ he.createElement("input", {
                key: "i-".concat(b),
                name: s,
                type: "hidden",
                value: i.getOptionValue(v)
              });
            }) : /* @__PURE__ */ he.createElement("input", {
              name: s,
              type: "hidden",
              value: ""
            });
            return /* @__PURE__ */ he.createElement("div", null, h);
          }
        else {
          var x = c[0] ? this.getOptionValue(c[0]) : "";
          return /* @__PURE__ */ he.createElement("input", {
            name: s,
            type: "hidden",
            value: x
          });
        }
    }
  }, {
    key: "renderLiveRegion",
    value: function() {
      var i = this.commonProps, a = this.state, o = a.ariaSelection, l = a.focusedOption, u = a.focusedValue, s = a.isFocused, d = a.selectValue, c = this.getFocusableOptions();
      return /* @__PURE__ */ he.createElement(_A, ke({}, i, {
        id: this.getElementId("live-region"),
        ariaSelection: o,
        focusedOption: l,
        focusedValue: u,
        isFocused: s,
        selectValue: d,
        focusableOptions: c,
        isAppleDevice: this.isAppleDevice
      }));
    }
  }, {
    key: "render",
    value: function() {
      var i = this.getComponents(), a = i.Control, o = i.IndicatorsContainer, l = i.SelectContainer, u = i.ValueContainer, s = this.props, d = s.className, c = s.id, m = s.isDisabled, h = s.menuIsOpen, x = this.state.isFocused, v = this.commonProps = this.getCommonProps();
      return /* @__PURE__ */ he.createElement(l, ke({}, v, {
        className: d,
        innerProps: {
          id: c,
          onKeyDown: this.onKeyDown
        },
        isDisabled: m,
        isFocused: x
      }), this.renderLiveRegion(), /* @__PURE__ */ he.createElement(a, ke({}, v, {
        innerRef: this.getControlRef,
        innerProps: {
          onMouseDown: this.onControlMouseDown,
          onTouchEnd: this.onControlTouchEnd
        },
        isDisabled: m,
        isFocused: x,
        menuIsOpen: h
      }), /* @__PURE__ */ he.createElement(u, ke({}, v, {
        isDisabled: m
      }), this.renderPlaceholderOrValue(), this.renderInput()), /* @__PURE__ */ he.createElement(o, ke({}, v, {
        isDisabled: m
      }), this.renderClearIndicator(), this.renderLoadingIndicator(), this.renderIndicatorSeparator(), this.renderDropdownIndicator())), this.renderMenu(), this.renderFormField());
    }
  }], [{
    key: "getDerivedStateFromProps",
    value: function(i, a) {
      var o = a.prevProps, l = a.clearFocusValueOnUpdate, u = a.inputIsHiddenAfterUpdate, s = a.ariaSelection, d = a.isFocused, c = a.prevWasFocused, m = a.instancePrefix, h = i.options, x = i.value, v = i.menuIsOpen, b = i.inputValue, I = i.isMulti, O = ip(x), T = {};
      if (o && (x !== o.value || h !== o.options || v !== o.menuIsOpen || b !== o.inputValue)) {
        var D = v ? hP(i, O) : [], E = v ? yp(Ya(i, O), "".concat(m, "-option")) : [], B = l ? mP(a, O) : null, X = vP(a, D), U = pu(E, X);
        T = {
          selectValue: O,
          focusedOption: X,
          focusedOptionId: U,
          focusableOptionsWithIds: E,
          focusedValue: B,
          clearFocusValueOnUpdate: !1
        };
      }
      var K = u != null && i !== o ? {
        inputIsHidden: u,
        inputIsHiddenAfterUpdate: void 0
      } : {}, Fe = s, oe = d && c;
      return d && !oe && (Fe = {
        value: Ma(I, O, O[0] || null),
        options: O,
        action: "initial-input-focus"
      }, oe = !c), (s == null ? void 0 : s.action) === "initial-input-focus" && (Fe = null), st(st(st({}, T), K), {}, {
        prevProps: i,
        ariaSelection: Fe,
        prevWasFocused: oe
      });
    }
  }]), n;
}(Gv);
$m.defaultProps = gP;
var yP = /* @__PURE__ */ Zp(function(e, t) {
  var n = L1(e);
  return /* @__PURE__ */ he.createElement($m, ke({
    ref: t
  }, n));
}), Xm = yP, gu, xp;
function wP() {
  if (xp) return gu;
  xp = 1;
  function e(o) {
    return o && typeof o == "object" && "default" in o ? o.default : o;
  }
  var t = e(cn), n = Object.assign || function(o) {
    for (var l = 1; l < arguments.length; l++) {
      var u = arguments[l];
      for (var s in u)
        Object.prototype.hasOwnProperty.call(u, s) && (o[s] = u[s]);
    }
    return o;
  }, r = function(o, l) {
    var u = {};
    for (var s in o)
      l.indexOf(s) >= 0 || Object.prototype.hasOwnProperty.call(o, s) && (u[s] = o[s]);
    return u;
  }, i = function(l) {
    var u = l.color, s = u === void 0 ? "currentColor" : u, d = l.size, c = d === void 0 ? 24 : d;
    l.children;
    var m = r(l, ["color", "size", "children"]), h = "mdi-icon " + (m.className || "");
    return t.createElement(
      "svg",
      n({}, m, { className: h, width: c, height: c, fill: s, viewBox: "0 0 24 24" }),
      t.createElement("path", { d: "M12 2C6.5 2 2 6.5 2 12S6.5 22 12 22 22 17.5 22 12 17.5 2 12 2M10 17L5 12L6.41 10.59L10 14.17L17.59 6.58L19 8L10 17Z" })
    );
  }, a = t.memo ? t.memo(i) : i;
  return gu = a, gu;
}
var xP = wP();
const CP = /* @__PURE__ */ Hn(xP), Ym = (e) => /* @__PURE__ */ W.jsx(Nm.Option, { ...e, children: /* @__PURE__ */ W.jsxs(IP, { children: [
  /* @__PURE__ */ W.jsx("span", { children: e.label }),
  e.isSelected && /* @__PURE__ */ W.jsx(CP, { className: "check-icon" })
] }) });
Ym.propTypes = {
  label: _e.any,
  isSelected: _e.any,
  data: _e.any,
  innerRef: _e.oneOfType([
    _e.any,
    _e.any
  ])
};
const Zm = cn.forwardRef(
  ({ onChange: e, value: t, name: n, placeholder: r, options: i, ...a }, o) => {
    const l = (s) => {
      e(s);
    }, u = {
      loadingIndicator: (s) => ({
        ...s,
        color: "#a1a1aa",
        padding: "0",
        margin: "0"
      })
    };
    return /* @__PURE__ */ W.jsx(
      SP,
      {
        name: n,
        value: t,
        onChange: l,
        options: i,
        clearable: !1,
        className: "react-select",
        placeholder: r,
        classNamePrefix: "react-select",
        components: {
          Option: Ym
        },
        styles: u,
        ref: o,
        ...a
      }
    );
  }
);
Zm.propTypes = {
  ...Xm.propTypes,
  onChange: _e.func,
  name: _e.string,
  placeholder: _e.string,
  options: _e.arrayOf(
    _e.shape({
      value: _e.string,
      label: _e.string
    })
  ),
  value: _e.oneOfType([
    _e.any,
    _e.shape({
      value: _e.any,
      label: _e.any
    })
  ])
};
const Cp = k1(Zm), SP = dt(Xm)`
  width: 450px;
  height: auto;

  .react-select__control {
    height: auto;
    border-radius: 10px;
    transition: all 0.3s;
    border: 0.25px solid #a1a1aa;
    // background-color: #edf0f5;
    padding: 0 5px;

    &.react-select__control--is-focused,
    &:hover {
      border-color: ${Fi} !important;
      box-shadow: none;
    }
    // diabled field colors changed
    &.react-select__control--is-disabled {
      background-color: #fafafa;
      border-color: #d7d7d7;
    }
  }

  .react-select__option {
    border-radius: 10px;
    min-height: 44px;
    margin: 11px auto;
    color: #a1a1aa;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    text-align: left;
    font-size: 14px;
    font-weight: 500;
    line-height: 17.64px;
    white-space: normal;
    overflow-wrap: break-word;
    word-break: break-word;

    &.react-select__option--is-selected,
    &:hover {
      // background: rgba(76, 169, 166, 0.2) !important;
      background: transparent !important;
      color: ${Fi};
      cursor: pointer !important;
    }

    &.react-select__option--is-focused,
    &:hover,
    &:active {
      background: ${Ss} !important;
      color: ${Fi};
      outline: none;
      cursor: pointer !important;
    }
  }

  .react-select__input {
    height: auto;
    color: #509ee3;
    border-radius: 0;
  }

  .react-select__indicator-separator {
    display: none;
  }

  .react-select__dropdown-indicator,
  .react-select__clear-indicator {
    cursor: pointer;
    color: #a1a1aa;

    svg {
      height: 16px;
      width: 16px;
    }
  }

  .react-select__single-value {
    color: #a1a1aa;
  }

  .react-select__menu {
    box-shadow: none !important;
    border: 1px solid #d9d9dd;
    padding: 0px 10px;
  }

  .react-select__menu-list {
    top: calc(100% + 1px);
    box-shadow: none;
    overflow: auto;
  }

  @keyframes open {
    0% {
      max-height: 0;
    }
    100% {
      max-height: 200px;
    }
  }

  .react-select__placeholder {
    font-size: 14px;
    color: #a1a1aa;
  }

  //disabled placeholder-text
  .react-select__control--is-disabled .react-select__placeholder {
    color: #d7d7d7;
  }
  .react-select__dropdown-indicator,
  .react-select__control--is-disabled {
    color: #d7d7d7;
  }
  //till here

  .react-select__value-container {
    padding-top: 0;
    padding-bottom: 0;

    & > div {
      margin-top: 0;
      margin-bottom: 0;
    }
  }
`, IP = dt.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  align-items: center;
`;
function Jm(e, t) {
  return function() {
    return e.apply(t, arguments);
  };
}
const { toString: RP } = Object.prototype, { getPrototypeOf: Kc } = Object, Ns = /* @__PURE__ */ ((e) => (t) => {
  const n = RP.call(t);
  return e[n] || (e[n] = n.slice(8, -1).toLowerCase());
})(/* @__PURE__ */ Object.create(null)), ur = (e) => (e = e.toLowerCase(), (t) => Ns(t) === e), Gs = (e) => (t) => typeof t === e, { isArray: Zi } = Array, _o = Gs("undefined");
function EP(e) {
  return e !== null && !_o(e) && e.constructor !== null && !_o(e.constructor) && Un(e.constructor.isBuffer) && e.constructor.isBuffer(e);
}
const Um = ur("ArrayBuffer");
function AP(e) {
  let t;
  return typeof ArrayBuffer < "u" && ArrayBuffer.isView ? t = ArrayBuffer.isView(e) : t = e && e.buffer && Um(e.buffer), t;
}
const PP = Gs("string"), Un = Gs("function"), qm = Gs("number"), _s = (e) => e !== null && typeof e == "object", TP = (e) => e === !0 || e === !1, Za = (e) => {
  if (Ns(e) !== "object")
    return !1;
  const t = Kc(e);
  return (t === null || t === Object.prototype || Object.getPrototypeOf(t) === null) && !(Symbol.toStringTag in e) && !(Symbol.iterator in e);
}, kP = ur("Date"), OP = ur("File"), FP = ur("Blob"), BP = ur("FileList"), NP = (e) => _s(e) && Un(e.pipe), GP = (e) => {
  let t;
  return e && (typeof FormData == "function" && e instanceof FormData || Un(e.append) && ((t = Ns(e)) === "formdata" || // detect form-data instance
  t === "object" && Un(e.toString) && e.toString() === "[object FormData]"));
}, _P = ur("URLSearchParams"), [MP, VP, LP, DP] = ["ReadableStream", "Request", "Response", "Headers"].map(ur), jP = (e) => e.trim ? e.trim() : e.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, "");
function Wo(e, t, { allOwnKeys: n = !1 } = {}) {
  if (e === null || typeof e > "u")
    return;
  let r, i;
  if (typeof e != "object" && (e = [e]), Zi(e))
    for (r = 0, i = e.length; r < i; r++)
      t.call(null, e[r], r, e);
  else {
    const a = n ? Object.getOwnPropertyNames(e) : Object.keys(e), o = a.length;
    let l;
    for (r = 0; r < o; r++)
      l = a[r], t.call(null, e[l], l, e);
  }
}
function Qm(e, t) {
  t = t.toLowerCase();
  const n = Object.keys(e);
  let r = n.length, i;
  for (; r-- > 0; )
    if (i = n[r], t === i.toLowerCase())
      return i;
  return null;
}
const ci = typeof globalThis < "u" ? globalThis : typeof self < "u" ? self : typeof window < "u" ? window : global, Km = (e) => !_o(e) && e !== ci;
function Qu() {
  const { caseless: e } = Km(this) && this || {}, t = {}, n = (r, i) => {
    const a = e && Qm(t, i) || i;
    Za(t[a]) && Za(r) ? t[a] = Qu(t[a], r) : Za(r) ? t[a] = Qu({}, r) : Zi(r) ? t[a] = r.slice() : t[a] = r;
  };
  for (let r = 0, i = arguments.length; r < i; r++)
    arguments[r] && Wo(arguments[r], n);
  return t;
}
const zP = (e, t, n, { allOwnKeys: r } = {}) => (Wo(t, (i, a) => {
  n && Un(i) ? e[a] = Jm(i, n) : e[a] = i;
}, { allOwnKeys: r }), e), HP = (e) => (e.charCodeAt(0) === 65279 && (e = e.slice(1)), e), WP = (e, t, n, r) => {
  e.prototype = Object.create(t.prototype, r), e.prototype.constructor = e, Object.defineProperty(e, "super", {
    value: t.prototype
  }), n && Object.assign(e.prototype, n);
}, $P = (e, t, n, r) => {
  let i, a, o;
  const l = {};
  if (t = t || {}, e == null) return t;
  do {
    for (i = Object.getOwnPropertyNames(e), a = i.length; a-- > 0; )
      o = i[a], (!r || r(o, e, t)) && !l[o] && (t[o] = e[o], l[o] = !0);
    e = n !== !1 && Kc(e);
  } while (e && (!n || n(e, t)) && e !== Object.prototype);
  return t;
}, XP = (e, t, n) => {
  e = String(e), (n === void 0 || n > e.length) && (n = e.length), n -= t.length;
  const r = e.indexOf(t, n);
  return r !== -1 && r === n;
}, YP = (e) => {
  if (!e) return null;
  if (Zi(e)) return e;
  let t = e.length;
  if (!qm(t)) return null;
  const n = new Array(t);
  for (; t-- > 0; )
    n[t] = e[t];
  return n;
}, ZP = /* @__PURE__ */ ((e) => (t) => e && t instanceof e)(typeof Uint8Array < "u" && Kc(Uint8Array)), JP = (e, t) => {
  const r = (e && e[Symbol.iterator]).call(e);
  let i;
  for (; (i = r.next()) && !i.done; ) {
    const a = i.value;
    t.call(e, a[0], a[1]);
  }
}, UP = (e, t) => {
  let n;
  const r = [];
  for (; (n = e.exec(t)) !== null; )
    r.push(n);
  return r;
}, qP = ur("HTMLFormElement"), QP = (e) => e.toLowerCase().replace(
  /[-_\s]([a-z\d])(\w*)/g,
  function(n, r, i) {
    return r.toUpperCase() + i;
  }
), Sp = (({ hasOwnProperty: e }) => (t, n) => e.call(t, n))(Object.prototype), KP = ur("RegExp"), ev = (e, t) => {
  const n = Object.getOwnPropertyDescriptors(e), r = {};
  Wo(n, (i, a) => {
    let o;
    (o = t(i, a, e)) !== !1 && (r[a] = o || i);
  }), Object.defineProperties(e, r);
}, eT = (e) => {
  ev(e, (t, n) => {
    if (Un(e) && ["arguments", "caller", "callee"].indexOf(n) !== -1)
      return !1;
    const r = e[n];
    if (Un(r)) {
      if (t.enumerable = !1, "writable" in t) {
        t.writable = !1;
        return;
      }
      t.set || (t.set = () => {
        throw Error("Can not rewrite read-only method '" + n + "'");
      });
    }
  });
}, tT = (e, t) => {
  const n = {}, r = (i) => {
    i.forEach((a) => {
      n[a] = !0;
    });
  };
  return Zi(e) ? r(e) : r(String(e).split(t)), n;
}, nT = () => {
}, rT = (e, t) => e != null && Number.isFinite(e = +e) ? e : t, hu = "abcdefghijklmnopqrstuvwxyz", Ip = "0123456789", tv = {
  DIGIT: Ip,
  ALPHA: hu,
  ALPHA_DIGIT: hu + hu.toUpperCase() + Ip
}, iT = (e = 16, t = tv.ALPHA_DIGIT) => {
  let n = "";
  const { length: r } = t;
  for (; e--; )
    n += t[Math.random() * r | 0];
  return n;
};
function oT(e) {
  return !!(e && Un(e.append) && e[Symbol.toStringTag] === "FormData" && e[Symbol.iterator]);
}
const aT = (e) => {
  const t = new Array(10), n = (r, i) => {
    if (_s(r)) {
      if (t.indexOf(r) >= 0)
        return;
      if (!("toJSON" in r)) {
        t[i] = r;
        const a = Zi(r) ? [] : {};
        return Wo(r, (o, l) => {
          const u = n(o, i + 1);
          !_o(u) && (a[l] = u);
        }), t[i] = void 0, a;
      }
    }
    return r;
  };
  return n(e, 0);
}, sT = ur("AsyncFunction"), lT = (e) => e && (_s(e) || Un(e)) && Un(e.then) && Un(e.catch), nv = ((e, t) => e ? setImmediate : t ? ((n, r) => (ci.addEventListener("message", ({ source: i, data: a }) => {
  i === ci && a === n && r.length && r.shift()();
}, !1), (i) => {
  r.push(i), ci.postMessage(n, "*");
}))(`axios@${Math.random()}`, []) : (n) => setTimeout(n))(
  typeof setImmediate == "function",
  Un(ci.postMessage)
), uT = typeof queueMicrotask < "u" ? queueMicrotask.bind(ci) : typeof process < "u" && process.nextTick || nv, ie = {
  isArray: Zi,
  isArrayBuffer: Um,
  isBuffer: EP,
  isFormData: GP,
  isArrayBufferView: AP,
  isString: PP,
  isNumber: qm,
  isBoolean: TP,
  isObject: _s,
  isPlainObject: Za,
  isReadableStream: MP,
  isRequest: VP,
  isResponse: LP,
  isHeaders: DP,
  isUndefined: _o,
  isDate: kP,
  isFile: OP,
  isBlob: FP,
  isRegExp: KP,
  isFunction: Un,
  isStream: NP,
  isURLSearchParams: _P,
  isTypedArray: ZP,
  isFileList: BP,
  forEach: Wo,
  merge: Qu,
  extend: zP,
  trim: jP,
  stripBOM: HP,
  inherits: WP,
  toFlatObject: $P,
  kindOf: Ns,
  kindOfTest: ur,
  endsWith: XP,
  toArray: YP,
  forEachEntry: JP,
  matchAll: UP,
  isHTMLForm: qP,
  hasOwnProperty: Sp,
  hasOwnProp: Sp,
  // an alias to avoid ESLint no-prototype-builtins detection
  reduceDescriptors: ev,
  freezeMethods: eT,
  toObjectSet: tT,
  toCamelCase: QP,
  noop: nT,
  toFiniteNumber: rT,
  findKey: Qm,
  global: ci,
  isContextDefined: Km,
  ALPHABET: tv,
  generateString: iT,
  isSpecCompliantForm: oT,
  toJSONObject: aT,
  isAsyncFn: sT,
  isThenable: lT,
  setImmediate: nv,
  asap: uT
};
function At(e, t, n, r, i) {
  Error.call(this), Error.captureStackTrace ? Error.captureStackTrace(this, this.constructor) : this.stack = new Error().stack, this.message = e, this.name = "AxiosError", t && (this.code = t), n && (this.config = n), r && (this.request = r), i && (this.response = i, this.status = i.status ? i.status : null);
}
ie.inherits(At, Error, {
  toJSON: function() {
    return {
      // Standard
      message: this.message,
      name: this.name,
      // Microsoft
      description: this.description,
      number: this.number,
      // Mozilla
      fileName: this.fileName,
      lineNumber: this.lineNumber,
      columnNumber: this.columnNumber,
      stack: this.stack,
      // Axios
      config: ie.toJSONObject(this.config),
      code: this.code,
      status: this.status
    };
  }
});
const rv = At.prototype, iv = {};
[
  "ERR_BAD_OPTION_VALUE",
  "ERR_BAD_OPTION",
  "ECONNABORTED",
  "ETIMEDOUT",
  "ERR_NETWORK",
  "ERR_FR_TOO_MANY_REDIRECTS",
  "ERR_DEPRECATED",
  "ERR_BAD_RESPONSE",
  "ERR_BAD_REQUEST",
  "ERR_CANCELED",
  "ERR_NOT_SUPPORT",
  "ERR_INVALID_URL"
  // eslint-disable-next-line func-names
].forEach((e) => {
  iv[e] = { value: e };
});
Object.defineProperties(At, iv);
Object.defineProperty(rv, "isAxiosError", { value: !0 });
At.from = (e, t, n, r, i, a) => {
  const o = Object.create(rv);
  return ie.toFlatObject(e, o, function(u) {
    return u !== Error.prototype;
  }, (l) => l !== "isAxiosError"), At.call(o, e.message, t, n, r, i), o.cause = e, o.name = e.name, a && Object.assign(o, a), o;
};
const cT = null;
function Ku(e) {
  return ie.isPlainObject(e) || ie.isArray(e);
}
function ov(e) {
  return ie.endsWith(e, "[]") ? e.slice(0, -2) : e;
}
function Rp(e, t, n) {
  return e ? e.concat(t).map(function(i, a) {
    return i = ov(i), !n && a ? "[" + i + "]" : i;
  }).join(n ? "." : "") : t;
}
function dT(e) {
  return ie.isArray(e) && !e.some(Ku);
}
const fT = ie.toFlatObject(ie, {}, null, function(t) {
  return /^is[A-Z]/.test(t);
});
function Ms(e, t, n) {
  if (!ie.isObject(e))
    throw new TypeError("target must be an object");
  t = t || new FormData(), n = ie.toFlatObject(n, {
    metaTokens: !0,
    dots: !1,
    indexes: !1
  }, !1, function(v, b) {
    return !ie.isUndefined(b[v]);
  });
  const r = n.metaTokens, i = n.visitor || d, a = n.dots, o = n.indexes, u = (n.Blob || typeof Blob < "u" && Blob) && ie.isSpecCompliantForm(t);
  if (!ie.isFunction(i))
    throw new TypeError("visitor must be a function");
  function s(x) {
    if (x === null) return "";
    if (ie.isDate(x))
      return x.toISOString();
    if (!u && ie.isBlob(x))
      throw new At("Blob is not supported. Use a Buffer instead.");
    return ie.isArrayBuffer(x) || ie.isTypedArray(x) ? u && typeof Blob == "function" ? new Blob([x]) : Buffer.from(x) : x;
  }
  function d(x, v, b) {
    let I = x;
    if (x && !b && typeof x == "object") {
      if (ie.endsWith(v, "{}"))
        v = r ? v : v.slice(0, -2), x = JSON.stringify(x);
      else if (ie.isArray(x) && dT(x) || (ie.isFileList(x) || ie.endsWith(v, "[]")) && (I = ie.toArray(x)))
        return v = ov(v), I.forEach(function(T, D) {
          !(ie.isUndefined(T) || T === null) && t.append(
            // eslint-disable-next-line no-nested-ternary
            o === !0 ? Rp([v], D, a) : o === null ? v : v + "[]",
            s(T)
          );
        }), !1;
    }
    return Ku(x) ? !0 : (t.append(Rp(b, v, a), s(x)), !1);
  }
  const c = [], m = Object.assign(fT, {
    defaultVisitor: d,
    convertValue: s,
    isVisitable: Ku
  });
  function h(x, v) {
    if (!ie.isUndefined(x)) {
      if (c.indexOf(x) !== -1)
        throw Error("Circular reference detected in " + v.join("."));
      c.push(x), ie.forEach(x, function(I, O) {
        (!(ie.isUndefined(I) || I === null) && i.call(
          t,
          I,
          ie.isString(O) ? O.trim() : O,
          v,
          m
        )) === !0 && h(I, v ? v.concat(O) : [O]);
      }), c.pop();
    }
  }
  if (!ie.isObject(e))
    throw new TypeError("data must be an object");
  return h(e), t;
}
function Ep(e) {
  const t = {
    "!": "%21",
    "'": "%27",
    "(": "%28",
    ")": "%29",
    "~": "%7E",
    "%20": "+",
    "%00": "\0"
  };
  return encodeURIComponent(e).replace(/[!'()~]|%20|%00/g, function(r) {
    return t[r];
  });
}
function ed(e, t) {
  this._pairs = [], e && Ms(e, this, t);
}
const av = ed.prototype;
av.append = function(t, n) {
  this._pairs.push([t, n]);
};
av.toString = function(t) {
  const n = t ? function(r) {
    return t.call(this, r, Ep);
  } : Ep;
  return this._pairs.map(function(i) {
    return n(i[0]) + "=" + n(i[1]);
  }, "").join("&");
};
function pT(e) {
  return encodeURIComponent(e).replace(/%3A/gi, ":").replace(/%24/g, "$").replace(/%2C/gi, ",").replace(/%20/g, "+").replace(/%5B/gi, "[").replace(/%5D/gi, "]");
}
function sv(e, t, n) {
  if (!t)
    return e;
  const r = n && n.encode || pT;
  ie.isFunction(n) && (n = {
    serialize: n
  });
  const i = n && n.serialize;
  let a;
  if (i ? a = i(t, n) : a = ie.isURLSearchParams(t) ? t.toString() : new ed(t, n).toString(r), a) {
    const o = e.indexOf("#");
    o !== -1 && (e = e.slice(0, o)), e += (e.indexOf("?") === -1 ? "?" : "&") + a;
  }
  return e;
}
class Ap {
  constructor() {
    this.handlers = [];
  }
  /**
   * Add a new interceptor to the stack
   *
   * @param {Function} fulfilled The function to handle `then` for a `Promise`
   * @param {Function} rejected The function to handle `reject` for a `Promise`
   *
   * @return {Number} An ID used to remove interceptor later
   */
  use(t, n, r) {
    return this.handlers.push({
      fulfilled: t,
      rejected: n,
      synchronous: r ? r.synchronous : !1,
      runWhen: r ? r.runWhen : null
    }), this.handlers.length - 1;
  }
  /**
   * Remove an interceptor from the stack
   *
   * @param {Number} id The ID that was returned by `use`
   *
   * @returns {Boolean} `true` if the interceptor was removed, `false` otherwise
   */
  eject(t) {
    this.handlers[t] && (this.handlers[t] = null);
  }
  /**
   * Clear all interceptors from the stack
   *
   * @returns {void}
   */
  clear() {
    this.handlers && (this.handlers = []);
  }
  /**
   * Iterate over all the registered interceptors
   *
   * This method is particularly useful for skipping over any
   * interceptors that may have become `null` calling `eject`.
   *
   * @param {Function} fn The function to call for each interceptor
   *
   * @returns {void}
   */
  forEach(t) {
    ie.forEach(this.handlers, function(r) {
      r !== null && t(r);
    });
  }
}
const lv = {
  silentJSONParsing: !0,
  forcedJSONParsing: !0,
  clarifyTimeoutError: !1
}, gT = typeof URLSearchParams < "u" ? URLSearchParams : ed, hT = typeof FormData < "u" ? FormData : null, mT = typeof Blob < "u" ? Blob : null, vT = {
  isBrowser: !0,
  classes: {
    URLSearchParams: gT,
    FormData: hT,
    Blob: mT
  },
  protocols: ["http", "https", "file", "blob", "url", "data"]
}, td = typeof window < "u" && typeof document < "u", ec = typeof navigator == "object" && navigator || void 0, bT = td && (!ec || ["ReactNative", "NativeScript", "NS"].indexOf(ec.product) < 0), yT = typeof WorkerGlobalScope < "u" && // eslint-disable-next-line no-undef
self instanceof WorkerGlobalScope && typeof self.importScripts == "function", wT = td && window.location.href || "http://localhost", xT = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  hasBrowserEnv: td,
  hasStandardBrowserEnv: bT,
  hasStandardBrowserWebWorkerEnv: yT,
  navigator: ec,
  origin: wT
}, Symbol.toStringTag, { value: "Module" })), Fn = {
  ...xT,
  ...vT
};
function CT(e, t) {
  return Ms(e, new Fn.classes.URLSearchParams(), Object.assign({
    visitor: function(n, r, i, a) {
      return Fn.isNode && ie.isBuffer(n) ? (this.append(r, n.toString("base64")), !1) : a.defaultVisitor.apply(this, arguments);
    }
  }, t));
}
function ST(e) {
  return ie.matchAll(/\w+|\[(\w*)]/g, e).map((t) => t[0] === "[]" ? "" : t[1] || t[0]);
}
function IT(e) {
  const t = {}, n = Object.keys(e);
  let r;
  const i = n.length;
  let a;
  for (r = 0; r < i; r++)
    a = n[r], t[a] = e[a];
  return t;
}
function uv(e) {
  function t(n, r, i, a) {
    let o = n[a++];
    if (o === "__proto__") return !0;
    const l = Number.isFinite(+o), u = a >= n.length;
    return o = !o && ie.isArray(i) ? i.length : o, u ? (ie.hasOwnProp(i, o) ? i[o] = [i[o], r] : i[o] = r, !l) : ((!i[o] || !ie.isObject(i[o])) && (i[o] = []), t(n, r, i[o], a) && ie.isArray(i[o]) && (i[o] = IT(i[o])), !l);
  }
  if (ie.isFormData(e) && ie.isFunction(e.entries)) {
    const n = {};
    return ie.forEachEntry(e, (r, i) => {
      t(ST(r), i, n, 0);
    }), n;
  }
  return null;
}
function RT(e, t, n) {
  if (ie.isString(e))
    try {
      return (t || JSON.parse)(e), ie.trim(e);
    } catch (r) {
      if (r.name !== "SyntaxError")
        throw r;
    }
  return (n || JSON.stringify)(e);
}
const $o = {
  transitional: lv,
  adapter: ["xhr", "http", "fetch"],
  transformRequest: [function(t, n) {
    const r = n.getContentType() || "", i = r.indexOf("application/json") > -1, a = ie.isObject(t);
    if (a && ie.isHTMLForm(t) && (t = new FormData(t)), ie.isFormData(t))
      return i ? JSON.stringify(uv(t)) : t;
    if (ie.isArrayBuffer(t) || ie.isBuffer(t) || ie.isStream(t) || ie.isFile(t) || ie.isBlob(t) || ie.isReadableStream(t))
      return t;
    if (ie.isArrayBufferView(t))
      return t.buffer;
    if (ie.isURLSearchParams(t))
      return n.setContentType("application/x-www-form-urlencoded;charset=utf-8", !1), t.toString();
    let l;
    if (a) {
      if (r.indexOf("application/x-www-form-urlencoded") > -1)
        return CT(t, this.formSerializer).toString();
      if ((l = ie.isFileList(t)) || r.indexOf("multipart/form-data") > -1) {
        const u = this.env && this.env.FormData;
        return Ms(
          l ? { "files[]": t } : t,
          u && new u(),
          this.formSerializer
        );
      }
    }
    return a || i ? (n.setContentType("application/json", !1), RT(t)) : t;
  }],
  transformResponse: [function(t) {
    const n = this.transitional || $o.transitional, r = n && n.forcedJSONParsing, i = this.responseType === "json";
    if (ie.isResponse(t) || ie.isReadableStream(t))
      return t;
    if (t && ie.isString(t) && (r && !this.responseType || i)) {
      const o = !(n && n.silentJSONParsing) && i;
      try {
        return JSON.parse(t);
      } catch (l) {
        if (o)
          throw l.name === "SyntaxError" ? At.from(l, At.ERR_BAD_RESPONSE, this, null, this.response) : l;
      }
    }
    return t;
  }],
  /**
   * A timeout in milliseconds to abort a request. If set to 0 (default) a
   * timeout is not created.
   */
  timeout: 0,
  xsrfCookieName: "XSRF-TOKEN",
  xsrfHeaderName: "X-XSRF-TOKEN",
  maxContentLength: -1,
  maxBodyLength: -1,
  env: {
    FormData: Fn.classes.FormData,
    Blob: Fn.classes.Blob
  },
  validateStatus: function(t) {
    return t >= 200 && t < 300;
  },
  headers: {
    common: {
      Accept: "application/json, text/plain, */*",
      "Content-Type": void 0
    }
  }
};
ie.forEach(["delete", "get", "head", "post", "put", "patch"], (e) => {
  $o.headers[e] = {};
});
const ET = ie.toObjectSet([
  "age",
  "authorization",
  "content-length",
  "content-type",
  "etag",
  "expires",
  "from",
  "host",
  "if-modified-since",
  "if-unmodified-since",
  "last-modified",
  "location",
  "max-forwards",
  "proxy-authorization",
  "referer",
  "retry-after",
  "user-agent"
]), AT = (e) => {
  const t = {};
  let n, r, i;
  return e && e.split(`
`).forEach(function(o) {
    i = o.indexOf(":"), n = o.substring(0, i).trim().toLowerCase(), r = o.substring(i + 1).trim(), !(!n || t[n] && ET[n]) && (n === "set-cookie" ? t[n] ? t[n].push(r) : t[n] = [r] : t[n] = t[n] ? t[n] + ", " + r : r);
  }), t;
}, Pp = Symbol("internals");
function ho(e) {
  return e && String(e).trim().toLowerCase();
}
function Ja(e) {
  return e === !1 || e == null ? e : ie.isArray(e) ? e.map(Ja) : String(e);
}
function PT(e) {
  const t = /* @__PURE__ */ Object.create(null), n = /([^\s,;=]+)\s*(?:=\s*([^,;]+))?/g;
  let r;
  for (; r = n.exec(e); )
    t[r[1]] = r[2];
  return t;
}
const TT = (e) => /^[-_a-zA-Z0-9^`|~,!#$%&'*+.]+$/.test(e.trim());
function mu(e, t, n, r, i) {
  if (ie.isFunction(r))
    return r.call(this, t, n);
  if (i && (t = n), !!ie.isString(t)) {
    if (ie.isString(r))
      return t.indexOf(r) !== -1;
    if (ie.isRegExp(r))
      return r.test(t);
  }
}
function kT(e) {
  return e.trim().toLowerCase().replace(/([a-z\d])(\w*)/g, (t, n, r) => n.toUpperCase() + r);
}
function OT(e, t) {
  const n = ie.toCamelCase(" " + t);
  ["get", "set", "has"].forEach((r) => {
    Object.defineProperty(e, r + n, {
      value: function(i, a, o) {
        return this[r].call(this, t, i, a, o);
      },
      configurable: !0
    });
  });
}
let jn = class {
  constructor(t) {
    t && this.set(t);
  }
  set(t, n, r) {
    const i = this;
    function a(l, u, s) {
      const d = ho(u);
      if (!d)
        throw new Error("header name must be a non-empty string");
      const c = ie.findKey(i, d);
      (!c || i[c] === void 0 || s === !0 || s === void 0 && i[c] !== !1) && (i[c || u] = Ja(l));
    }
    const o = (l, u) => ie.forEach(l, (s, d) => a(s, d, u));
    if (ie.isPlainObject(t) || t instanceof this.constructor)
      o(t, n);
    else if (ie.isString(t) && (t = t.trim()) && !TT(t))
      o(AT(t), n);
    else if (ie.isHeaders(t))
      for (const [l, u] of t.entries())
        a(u, l, r);
    else
      t != null && a(n, t, r);
    return this;
  }
  get(t, n) {
    if (t = ho(t), t) {
      const r = ie.findKey(this, t);
      if (r) {
        const i = this[r];
        if (!n)
          return i;
        if (n === !0)
          return PT(i);
        if (ie.isFunction(n))
          return n.call(this, i, r);
        if (ie.isRegExp(n))
          return n.exec(i);
        throw new TypeError("parser must be boolean|regexp|function");
      }
    }
  }
  has(t, n) {
    if (t = ho(t), t) {
      const r = ie.findKey(this, t);
      return !!(r && this[r] !== void 0 && (!n || mu(this, this[r], r, n)));
    }
    return !1;
  }
  delete(t, n) {
    const r = this;
    let i = !1;
    function a(o) {
      if (o = ho(o), o) {
        const l = ie.findKey(r, o);
        l && (!n || mu(r, r[l], l, n)) && (delete r[l], i = !0);
      }
    }
    return ie.isArray(t) ? t.forEach(a) : a(t), i;
  }
  clear(t) {
    const n = Object.keys(this);
    let r = n.length, i = !1;
    for (; r--; ) {
      const a = n[r];
      (!t || mu(this, this[a], a, t, !0)) && (delete this[a], i = !0);
    }
    return i;
  }
  normalize(t) {
    const n = this, r = {};
    return ie.forEach(this, (i, a) => {
      const o = ie.findKey(r, a);
      if (o) {
        n[o] = Ja(i), delete n[a];
        return;
      }
      const l = t ? kT(a) : String(a).trim();
      l !== a && delete n[a], n[l] = Ja(i), r[l] = !0;
    }), this;
  }
  concat(...t) {
    return this.constructor.concat(this, ...t);
  }
  toJSON(t) {
    const n = /* @__PURE__ */ Object.create(null);
    return ie.forEach(this, (r, i) => {
      r != null && r !== !1 && (n[i] = t && ie.isArray(r) ? r.join(", ") : r);
    }), n;
  }
  [Symbol.iterator]() {
    return Object.entries(this.toJSON())[Symbol.iterator]();
  }
  toString() {
    return Object.entries(this.toJSON()).map(([t, n]) => t + ": " + n).join(`
`);
  }
  get [Symbol.toStringTag]() {
    return "AxiosHeaders";
  }
  static from(t) {
    return t instanceof this ? t : new this(t);
  }
  static concat(t, ...n) {
    const r = new this(t);
    return n.forEach((i) => r.set(i)), r;
  }
  static accessor(t) {
    const r = (this[Pp] = this[Pp] = {
      accessors: {}
    }).accessors, i = this.prototype;
    function a(o) {
      const l = ho(o);
      r[l] || (OT(i, o), r[l] = !0);
    }
    return ie.isArray(t) ? t.forEach(a) : a(t), this;
  }
};
jn.accessor(["Content-Type", "Content-Length", "Accept", "Accept-Encoding", "User-Agent", "Authorization"]);
ie.reduceDescriptors(jn.prototype, ({ value: e }, t) => {
  let n = t[0].toUpperCase() + t.slice(1);
  return {
    get: () => e,
    set(r) {
      this[n] = r;
    }
  };
});
ie.freezeMethods(jn);
function vu(e, t) {
  const n = this || $o, r = t || n, i = jn.from(r.headers);
  let a = r.data;
  return ie.forEach(e, function(l) {
    a = l.call(n, a, i.normalize(), t ? t.status : void 0);
  }), i.normalize(), a;
}
function cv(e) {
  return !!(e && e.__CANCEL__);
}
function Ji(e, t, n) {
  At.call(this, e ?? "canceled", At.ERR_CANCELED, t, n), this.name = "CanceledError";
}
ie.inherits(Ji, At, {
  __CANCEL__: !0
});
function dv(e, t, n) {
  const r = n.config.validateStatus;
  !n.status || !r || r(n.status) ? e(n) : t(new At(
    "Request failed with status code " + n.status,
    [At.ERR_BAD_REQUEST, At.ERR_BAD_RESPONSE][Math.floor(n.status / 100) - 4],
    n.config,
    n.request,
    n
  ));
}
function FT(e) {
  const t = /^([-+\w]{1,25})(:?\/\/|:)/.exec(e);
  return t && t[1] || "";
}
function BT(e, t) {
  e = e || 10;
  const n = new Array(e), r = new Array(e);
  let i = 0, a = 0, o;
  return t = t !== void 0 ? t : 1e3, function(u) {
    const s = Date.now(), d = r[a];
    o || (o = s), n[i] = u, r[i] = s;
    let c = a, m = 0;
    for (; c !== i; )
      m += n[c++], c = c % e;
    if (i = (i + 1) % e, i === a && (a = (a + 1) % e), s - o < t)
      return;
    const h = d && s - d;
    return h ? Math.round(m * 1e3 / h) : void 0;
  };
}
function NT(e, t) {
  let n = 0, r = 1e3 / t, i, a;
  const o = (s, d = Date.now()) => {
    n = d, i = null, a && (clearTimeout(a), a = null), e.apply(null, s);
  };
  return [(...s) => {
    const d = Date.now(), c = d - n;
    c >= r ? o(s, d) : (i = s, a || (a = setTimeout(() => {
      a = null, o(i);
    }, r - c)));
  }, () => i && o(i)];
}
const hs = (e, t, n = 3) => {
  let r = 0;
  const i = BT(50, 250);
  return NT((a) => {
    const o = a.loaded, l = a.lengthComputable ? a.total : void 0, u = o - r, s = i(u), d = o <= l;
    r = o;
    const c = {
      loaded: o,
      total: l,
      progress: l ? o / l : void 0,
      bytes: u,
      rate: s || void 0,
      estimated: s && l && d ? (l - o) / s : void 0,
      event: a,
      lengthComputable: l != null,
      [t ? "download" : "upload"]: !0
    };
    e(c);
  }, n);
}, Tp = (e, t) => {
  const n = e != null;
  return [(r) => t[0]({
    lengthComputable: n,
    total: e,
    loaded: r
  }), t[1]];
}, kp = (e) => (...t) => ie.asap(() => e(...t)), GT = Fn.hasStandardBrowserEnv ? /* @__PURE__ */ ((e, t) => (n) => (n = new URL(n, Fn.origin), e.protocol === n.protocol && e.host === n.host && (t || e.port === n.port)))(
  new URL(Fn.origin),
  Fn.navigator && /(msie|trident)/i.test(Fn.navigator.userAgent)
) : () => !0, _T = Fn.hasStandardBrowserEnv ? (
  // Standard browser envs support document.cookie
  {
    write(e, t, n, r, i, a) {
      const o = [e + "=" + encodeURIComponent(t)];
      ie.isNumber(n) && o.push("expires=" + new Date(n).toGMTString()), ie.isString(r) && o.push("path=" + r), ie.isString(i) && o.push("domain=" + i), a === !0 && o.push("secure"), document.cookie = o.join("; ");
    },
    read(e) {
      const t = document.cookie.match(new RegExp("(^|;\\s*)(" + e + ")=([^;]*)"));
      return t ? decodeURIComponent(t[3]) : null;
    },
    remove(e) {
      this.write(e, "", Date.now() - 864e5);
    }
  }
) : (
  // Non-standard browser env (web workers, react-native) lack needed support.
  {
    write() {
    },
    read() {
      return null;
    },
    remove() {
    }
  }
);
function MT(e) {
  return /^([a-z][a-z\d+\-.]*:)?\/\//i.test(e);
}
function VT(e, t) {
  return t ? e.replace(/\/?\/$/, "") + "/" + t.replace(/^\/+/, "") : e;
}
function fv(e, t) {
  return e && !MT(t) ? VT(e, t) : t;
}
const Op = (e) => e instanceof jn ? { ...e } : e;
function gi(e, t) {
  t = t || {};
  const n = {};
  function r(s, d, c, m) {
    return ie.isPlainObject(s) && ie.isPlainObject(d) ? ie.merge.call({ caseless: m }, s, d) : ie.isPlainObject(d) ? ie.merge({}, d) : ie.isArray(d) ? d.slice() : d;
  }
  function i(s, d, c, m) {
    if (ie.isUndefined(d)) {
      if (!ie.isUndefined(s))
        return r(void 0, s, c, m);
    } else return r(s, d, c, m);
  }
  function a(s, d) {
    if (!ie.isUndefined(d))
      return r(void 0, d);
  }
  function o(s, d) {
    if (ie.isUndefined(d)) {
      if (!ie.isUndefined(s))
        return r(void 0, s);
    } else return r(void 0, d);
  }
  function l(s, d, c) {
    if (c in t)
      return r(s, d);
    if (c in e)
      return r(void 0, s);
  }
  const u = {
    url: a,
    method: a,
    data: a,
    baseURL: o,
    transformRequest: o,
    transformResponse: o,
    paramsSerializer: o,
    timeout: o,
    timeoutMessage: o,
    withCredentials: o,
    withXSRFToken: o,
    adapter: o,
    responseType: o,
    xsrfCookieName: o,
    xsrfHeaderName: o,
    onUploadProgress: o,
    onDownloadProgress: o,
    decompress: o,
    maxContentLength: o,
    maxBodyLength: o,
    beforeRedirect: o,
    transport: o,
    httpAgent: o,
    httpsAgent: o,
    cancelToken: o,
    socketPath: o,
    responseEncoding: o,
    validateStatus: l,
    headers: (s, d, c) => i(Op(s), Op(d), c, !0)
  };
  return ie.forEach(Object.keys(Object.assign({}, e, t)), function(d) {
    const c = u[d] || i, m = c(e[d], t[d], d);
    ie.isUndefined(m) && c !== l || (n[d] = m);
  }), n;
}
const pv = (e) => {
  const t = gi({}, e);
  let { data: n, withXSRFToken: r, xsrfHeaderName: i, xsrfCookieName: a, headers: o, auth: l } = t;
  t.headers = o = jn.from(o), t.url = sv(fv(t.baseURL, t.url), e.params, e.paramsSerializer), l && o.set(
    "Authorization",
    "Basic " + btoa((l.username || "") + ":" + (l.password ? unescape(encodeURIComponent(l.password)) : ""))
  );
  let u;
  if (ie.isFormData(n)) {
    if (Fn.hasStandardBrowserEnv || Fn.hasStandardBrowserWebWorkerEnv)
      o.setContentType(void 0);
    else if ((u = o.getContentType()) !== !1) {
      const [s, ...d] = u ? u.split(";").map((c) => c.trim()).filter(Boolean) : [];
      o.setContentType([s || "multipart/form-data", ...d].join("; "));
    }
  }
  if (Fn.hasStandardBrowserEnv && (r && ie.isFunction(r) && (r = r(t)), r || r !== !1 && GT(t.url))) {
    const s = i && a && _T.read(a);
    s && o.set(i, s);
  }
  return t;
}, LT = typeof XMLHttpRequest < "u", DT = LT && function(e) {
  return new Promise(function(n, r) {
    const i = pv(e);
    let a = i.data;
    const o = jn.from(i.headers).normalize();
    let { responseType: l, onUploadProgress: u, onDownloadProgress: s } = i, d, c, m, h, x;
    function v() {
      h && h(), x && x(), i.cancelToken && i.cancelToken.unsubscribe(d), i.signal && i.signal.removeEventListener("abort", d);
    }
    let b = new XMLHttpRequest();
    b.open(i.method.toUpperCase(), i.url, !0), b.timeout = i.timeout;
    function I() {
      if (!b)
        return;
      const T = jn.from(
        "getAllResponseHeaders" in b && b.getAllResponseHeaders()
      ), E = {
        data: !l || l === "text" || l === "json" ? b.responseText : b.response,
        status: b.status,
        statusText: b.statusText,
        headers: T,
        config: e,
        request: b
      };
      dv(function(X) {
        n(X), v();
      }, function(X) {
        r(X), v();
      }, E), b = null;
    }
    "onloadend" in b ? b.onloadend = I : b.onreadystatechange = function() {
      !b || b.readyState !== 4 || b.status === 0 && !(b.responseURL && b.responseURL.indexOf("file:") === 0) || setTimeout(I);
    }, b.onabort = function() {
      b && (r(new At("Request aborted", At.ECONNABORTED, e, b)), b = null);
    }, b.onerror = function() {
      r(new At("Network Error", At.ERR_NETWORK, e, b)), b = null;
    }, b.ontimeout = function() {
      let D = i.timeout ? "timeout of " + i.timeout + "ms exceeded" : "timeout exceeded";
      const E = i.transitional || lv;
      i.timeoutErrorMessage && (D = i.timeoutErrorMessage), r(new At(
        D,
        E.clarifyTimeoutError ? At.ETIMEDOUT : At.ECONNABORTED,
        e,
        b
      )), b = null;
    }, a === void 0 && o.setContentType(null), "setRequestHeader" in b && ie.forEach(o.toJSON(), function(D, E) {
      b.setRequestHeader(E, D);
    }), ie.isUndefined(i.withCredentials) || (b.withCredentials = !!i.withCredentials), l && l !== "json" && (b.responseType = i.responseType), s && ([m, x] = hs(s, !0), b.addEventListener("progress", m)), u && b.upload && ([c, h] = hs(u), b.upload.addEventListener("progress", c), b.upload.addEventListener("loadend", h)), (i.cancelToken || i.signal) && (d = (T) => {
      b && (r(!T || T.type ? new Ji(null, e, b) : T), b.abort(), b = null);
    }, i.cancelToken && i.cancelToken.subscribe(d), i.signal && (i.signal.aborted ? d() : i.signal.addEventListener("abort", d)));
    const O = FT(i.url);
    if (O && Fn.protocols.indexOf(O) === -1) {
      r(new At("Unsupported protocol " + O + ":", At.ERR_BAD_REQUEST, e));
      return;
    }
    b.send(a || null);
  });
}, jT = (e, t) => {
  const { length: n } = e = e ? e.filter(Boolean) : [];
  if (t || n) {
    let r = new AbortController(), i;
    const a = function(s) {
      if (!i) {
        i = !0, l();
        const d = s instanceof Error ? s : this.reason;
        r.abort(d instanceof At ? d : new Ji(d instanceof Error ? d.message : d));
      }
    };
    let o = t && setTimeout(() => {
      o = null, a(new At(`timeout ${t} of ms exceeded`, At.ETIMEDOUT));
    }, t);
    const l = () => {
      e && (o && clearTimeout(o), o = null, e.forEach((s) => {
        s.unsubscribe ? s.unsubscribe(a) : s.removeEventListener("abort", a);
      }), e = null);
    };
    e.forEach((s) => s.addEventListener("abort", a));
    const { signal: u } = r;
    return u.unsubscribe = () => ie.asap(l), u;
  }
}, zT = function* (e, t) {
  let n = e.byteLength;
  if (n < t) {
    yield e;
    return;
  }
  let r = 0, i;
  for (; r < n; )
    i = r + t, yield e.slice(r, i), r = i;
}, HT = async function* (e, t) {
  for await (const n of WT(e))
    yield* zT(n, t);
}, WT = async function* (e) {
  if (e[Symbol.asyncIterator]) {
    yield* e;
    return;
  }
  const t = e.getReader();
  try {
    for (; ; ) {
      const { done: n, value: r } = await t.read();
      if (n)
        break;
      yield r;
    }
  } finally {
    await t.cancel();
  }
}, Fp = (e, t, n, r) => {
  const i = HT(e, t);
  let a = 0, o, l = (u) => {
    o || (o = !0, r && r(u));
  };
  return new ReadableStream({
    async pull(u) {
      try {
        const { done: s, value: d } = await i.next();
        if (s) {
          l(), u.close();
          return;
        }
        let c = d.byteLength;
        if (n) {
          let m = a += c;
          n(m);
        }
        u.enqueue(new Uint8Array(d));
      } catch (s) {
        throw l(s), s;
      }
    },
    cancel(u) {
      return l(u), i.return();
    }
  }, {
    highWaterMark: 2
  });
}, Vs = typeof fetch == "function" && typeof Request == "function" && typeof Response == "function", gv = Vs && typeof ReadableStream == "function", $T = Vs && (typeof TextEncoder == "function" ? /* @__PURE__ */ ((e) => (t) => e.encode(t))(new TextEncoder()) : async (e) => new Uint8Array(await new Response(e).arrayBuffer())), hv = (e, ...t) => {
  try {
    return !!e(...t);
  } catch {
    return !1;
  }
}, XT = gv && hv(() => {
  let e = !1;
  const t = new Request(Fn.origin, {
    body: new ReadableStream(),
    method: "POST",
    get duplex() {
      return e = !0, "half";
    }
  }).headers.has("Content-Type");
  return e && !t;
}), Bp = 64 * 1024, tc = gv && hv(() => ie.isReadableStream(new Response("").body)), ms = {
  stream: tc && ((e) => e.body)
};
Vs && ((e) => {
  ["text", "arrayBuffer", "blob", "formData", "stream"].forEach((t) => {
    !ms[t] && (ms[t] = ie.isFunction(e[t]) ? (n) => n[t]() : (n, r) => {
      throw new At(`Response type '${t}' is not supported`, At.ERR_NOT_SUPPORT, r);
    });
  });
})(new Response());
const YT = async (e) => {
  if (e == null)
    return 0;
  if (ie.isBlob(e))
    return e.size;
  if (ie.isSpecCompliantForm(e))
    return (await new Request(Fn.origin, {
      method: "POST",
      body: e
    }).arrayBuffer()).byteLength;
  if (ie.isArrayBufferView(e) || ie.isArrayBuffer(e))
    return e.byteLength;
  if (ie.isURLSearchParams(e) && (e = e + ""), ie.isString(e))
    return (await $T(e)).byteLength;
}, ZT = async (e, t) => {
  const n = ie.toFiniteNumber(e.getContentLength());
  return n ?? YT(t);
}, JT = Vs && (async (e) => {
  let {
    url: t,
    method: n,
    data: r,
    signal: i,
    cancelToken: a,
    timeout: o,
    onDownloadProgress: l,
    onUploadProgress: u,
    responseType: s,
    headers: d,
    withCredentials: c = "same-origin",
    fetchOptions: m
  } = pv(e);
  s = s ? (s + "").toLowerCase() : "text";
  let h = jT([i, a && a.toAbortSignal()], o), x;
  const v = h && h.unsubscribe && (() => {
    h.unsubscribe();
  });
  let b;
  try {
    if (u && XT && n !== "get" && n !== "head" && (b = await ZT(d, r)) !== 0) {
      let E = new Request(t, {
        method: "POST",
        body: r,
        duplex: "half"
      }), B;
      if (ie.isFormData(r) && (B = E.headers.get("content-type")) && d.setContentType(B), E.body) {
        const [X, U] = Tp(
          b,
          hs(kp(u))
        );
        r = Fp(E.body, Bp, X, U);
      }
    }
    ie.isString(c) || (c = c ? "include" : "omit");
    const I = "credentials" in Request.prototype;
    x = new Request(t, {
      ...m,
      signal: h,
      method: n.toUpperCase(),
      headers: d.normalize().toJSON(),
      body: r,
      duplex: "half",
      credentials: I ? c : void 0
    });
    let O = await fetch(x);
    const T = tc && (s === "stream" || s === "response");
    if (tc && (l || T && v)) {
      const E = {};
      ["status", "statusText", "headers"].forEach((K) => {
        E[K] = O[K];
      });
      const B = ie.toFiniteNumber(O.headers.get("content-length")), [X, U] = l && Tp(
        B,
        hs(kp(l), !0)
      ) || [];
      O = new Response(
        Fp(O.body, Bp, X, () => {
          U && U(), v && v();
        }),
        E
      );
    }
    s = s || "text";
    let D = await ms[ie.findKey(ms, s) || "text"](O, e);
    return !T && v && v(), await new Promise((E, B) => {
      dv(E, B, {
        data: D,
        headers: jn.from(O.headers),
        status: O.status,
        statusText: O.statusText,
        config: e,
        request: x
      });
    });
  } catch (I) {
    throw v && v(), I && I.name === "TypeError" && /fetch/i.test(I.message) ? Object.assign(
      new At("Network Error", At.ERR_NETWORK, e, x),
      {
        cause: I.cause || I
      }
    ) : At.from(I, I && I.code, e, x);
  }
}), nc = {
  http: cT,
  xhr: DT,
  fetch: JT
};
ie.forEach(nc, (e, t) => {
  if (e) {
    try {
      Object.defineProperty(e, "name", { value: t });
    } catch {
    }
    Object.defineProperty(e, "adapterName", { value: t });
  }
});
const Np = (e) => `- ${e}`, UT = (e) => ie.isFunction(e) || e === null || e === !1, mv = {
  getAdapter: (e) => {
    e = ie.isArray(e) ? e : [e];
    const { length: t } = e;
    let n, r;
    const i = {};
    for (let a = 0; a < t; a++) {
      n = e[a];
      let o;
      if (r = n, !UT(n) && (r = nc[(o = String(n)).toLowerCase()], r === void 0))
        throw new At(`Unknown adapter '${o}'`);
      if (r)
        break;
      i[o || "#" + a] = r;
    }
    if (!r) {
      const a = Object.entries(i).map(
        ([l, u]) => `adapter ${l} ` + (u === !1 ? "is not supported by the environment" : "is not available in the build")
      );
      let o = t ? a.length > 1 ? `since :
` + a.map(Np).join(`
`) : " " + Np(a[0]) : "as no adapter specified";
      throw new At(
        "There is no suitable adapter to dispatch the request " + o,
        "ERR_NOT_SUPPORT"
      );
    }
    return r;
  },
  adapters: nc
};
function bu(e) {
  if (e.cancelToken && e.cancelToken.throwIfRequested(), e.signal && e.signal.aborted)
    throw new Ji(null, e);
}
function Gp(e) {
  return bu(e), e.headers = jn.from(e.headers), e.data = vu.call(
    e,
    e.transformRequest
  ), ["post", "put", "patch"].indexOf(e.method) !== -1 && e.headers.setContentType("application/x-www-form-urlencoded", !1), mv.getAdapter(e.adapter || $o.adapter)(e).then(function(r) {
    return bu(e), r.data = vu.call(
      e,
      e.transformResponse,
      r
    ), r.headers = jn.from(r.headers), r;
  }, function(r) {
    return cv(r) || (bu(e), r && r.response && (r.response.data = vu.call(
      e,
      e.transformResponse,
      r.response
    ), r.response.headers = jn.from(r.response.headers))), Promise.reject(r);
  });
}
const vv = "1.7.9", Ls = {};
["object", "boolean", "number", "function", "string", "symbol"].forEach((e, t) => {
  Ls[e] = function(r) {
    return typeof r === e || "a" + (t < 1 ? "n " : " ") + e;
  };
});
const _p = {};
Ls.transitional = function(t, n, r) {
  function i(a, o) {
    return "[Axios v" + vv + "] Transitional option '" + a + "'" + o + (r ? ". " + r : "");
  }
  return (a, o, l) => {
    if (t === !1)
      throw new At(
        i(o, " has been removed" + (n ? " in " + n : "")),
        At.ERR_DEPRECATED
      );
    return n && !_p[o] && (_p[o] = !0, console.warn(
      i(
        o,
        " has been deprecated since v" + n + " and will be removed in the near future"
      )
    )), t ? t(a, o, l) : !0;
  };
};
Ls.spelling = function(t) {
  return (n, r) => (console.warn(`${r} is likely a misspelling of ${t}`), !0);
};
function qT(e, t, n) {
  if (typeof e != "object")
    throw new At("options must be an object", At.ERR_BAD_OPTION_VALUE);
  const r = Object.keys(e);
  let i = r.length;
  for (; i-- > 0; ) {
    const a = r[i], o = t[a];
    if (o) {
      const l = e[a], u = l === void 0 || o(l, a, e);
      if (u !== !0)
        throw new At("option " + a + " must be " + u, At.ERR_BAD_OPTION_VALUE);
      continue;
    }
    if (n !== !0)
      throw new At("Unknown option " + a, At.ERR_BAD_OPTION);
  }
}
const Ua = {
  assertOptions: qT,
  validators: Ls
}, pr = Ua.validators;
let di = class {
  constructor(t) {
    this.defaults = t, this.interceptors = {
      request: new Ap(),
      response: new Ap()
    };
  }
  /**
   * Dispatch a request
   *
   * @param {String|Object} configOrUrl The config specific for this request (merged with this.defaults)
   * @param {?Object} config
   *
   * @returns {Promise} The Promise to be fulfilled
   */
  async request(t, n) {
    try {
      return await this._request(t, n);
    } catch (r) {
      if (r instanceof Error) {
        let i = {};
        Error.captureStackTrace ? Error.captureStackTrace(i) : i = new Error();
        const a = i.stack ? i.stack.replace(/^.+\n/, "") : "";
        try {
          r.stack ? a && !String(r.stack).endsWith(a.replace(/^.+\n.+\n/, "")) && (r.stack += `
` + a) : r.stack = a;
        } catch {
        }
      }
      throw r;
    }
  }
  _request(t, n) {
    typeof t == "string" ? (n = n || {}, n.url = t) : n = t || {}, n = gi(this.defaults, n);
    const { transitional: r, paramsSerializer: i, headers: a } = n;
    r !== void 0 && Ua.assertOptions(r, {
      silentJSONParsing: pr.transitional(pr.boolean),
      forcedJSONParsing: pr.transitional(pr.boolean),
      clarifyTimeoutError: pr.transitional(pr.boolean)
    }, !1), i != null && (ie.isFunction(i) ? n.paramsSerializer = {
      serialize: i
    } : Ua.assertOptions(i, {
      encode: pr.function,
      serialize: pr.function
    }, !0)), Ua.assertOptions(n, {
      baseUrl: pr.spelling("baseURL"),
      withXsrfToken: pr.spelling("withXSRFToken")
    }, !0), n.method = (n.method || this.defaults.method || "get").toLowerCase();
    let o = a && ie.merge(
      a.common,
      a[n.method]
    );
    a && ie.forEach(
      ["delete", "get", "head", "post", "put", "patch", "common"],
      (x) => {
        delete a[x];
      }
    ), n.headers = jn.concat(o, a);
    const l = [];
    let u = !0;
    this.interceptors.request.forEach(function(v) {
      typeof v.runWhen == "function" && v.runWhen(n) === !1 || (u = u && v.synchronous, l.unshift(v.fulfilled, v.rejected));
    });
    const s = [];
    this.interceptors.response.forEach(function(v) {
      s.push(v.fulfilled, v.rejected);
    });
    let d, c = 0, m;
    if (!u) {
      const x = [Gp.bind(this), void 0];
      for (x.unshift.apply(x, l), x.push.apply(x, s), m = x.length, d = Promise.resolve(n); c < m; )
        d = d.then(x[c++], x[c++]);
      return d;
    }
    m = l.length;
    let h = n;
    for (c = 0; c < m; ) {
      const x = l[c++], v = l[c++];
      try {
        h = x(h);
      } catch (b) {
        v.call(this, b);
        break;
      }
    }
    try {
      d = Gp.call(this, h);
    } catch (x) {
      return Promise.reject(x);
    }
    for (c = 0, m = s.length; c < m; )
      d = d.then(s[c++], s[c++]);
    return d;
  }
  getUri(t) {
    t = gi(this.defaults, t);
    const n = fv(t.baseURL, t.url);
    return sv(n, t.params, t.paramsSerializer);
  }
};
ie.forEach(["delete", "get", "head", "options"], function(t) {
  di.prototype[t] = function(n, r) {
    return this.request(gi(r || {}, {
      method: t,
      url: n,
      data: (r || {}).data
    }));
  };
});
ie.forEach(["post", "put", "patch"], function(t) {
  function n(r) {
    return function(a, o, l) {
      return this.request(gi(l || {}, {
        method: t,
        headers: r ? {
          "Content-Type": "multipart/form-data"
        } : {},
        url: a,
        data: o
      }));
    };
  }
  di.prototype[t] = n(), di.prototype[t + "Form"] = n(!0);
});
let QT = class bv {
  constructor(t) {
    if (typeof t != "function")
      throw new TypeError("executor must be a function.");
    let n;
    this.promise = new Promise(function(a) {
      n = a;
    });
    const r = this;
    this.promise.then((i) => {
      if (!r._listeners) return;
      let a = r._listeners.length;
      for (; a-- > 0; )
        r._listeners[a](i);
      r._listeners = null;
    }), this.promise.then = (i) => {
      let a;
      const o = new Promise((l) => {
        r.subscribe(l), a = l;
      }).then(i);
      return o.cancel = function() {
        r.unsubscribe(a);
      }, o;
    }, t(function(a, o, l) {
      r.reason || (r.reason = new Ji(a, o, l), n(r.reason));
    });
  }
  /**
   * Throws a `CanceledError` if cancellation has been requested.
   */
  throwIfRequested() {
    if (this.reason)
      throw this.reason;
  }
  /**
   * Subscribe to the cancel signal
   */
  subscribe(t) {
    if (this.reason) {
      t(this.reason);
      return;
    }
    this._listeners ? this._listeners.push(t) : this._listeners = [t];
  }
  /**
   * Unsubscribe from the cancel signal
   */
  unsubscribe(t) {
    if (!this._listeners)
      return;
    const n = this._listeners.indexOf(t);
    n !== -1 && this._listeners.splice(n, 1);
  }
  toAbortSignal() {
    const t = new AbortController(), n = (r) => {
      t.abort(r);
    };
    return this.subscribe(n), t.signal.unsubscribe = () => this.unsubscribe(n), t.signal;
  }
  /**
   * Returns an object that contains a new `CancelToken` and a function that, when called,
   * cancels the `CancelToken`.
   */
  static source() {
    let t;
    return {
      token: new bv(function(i) {
        t = i;
      }),
      cancel: t
    };
  }
};
function KT(e) {
  return function(n) {
    return e.apply(null, n);
  };
}
function ek(e) {
  return ie.isObject(e) && e.isAxiosError === !0;
}
const rc = {
  Continue: 100,
  SwitchingProtocols: 101,
  Processing: 102,
  EarlyHints: 103,
  Ok: 200,
  Created: 201,
  Accepted: 202,
  NonAuthoritativeInformation: 203,
  NoContent: 204,
  ResetContent: 205,
  PartialContent: 206,
  MultiStatus: 207,
  AlreadyReported: 208,
  ImUsed: 226,
  MultipleChoices: 300,
  MovedPermanently: 301,
  Found: 302,
  SeeOther: 303,
  NotModified: 304,
  UseProxy: 305,
  Unused: 306,
  TemporaryRedirect: 307,
  PermanentRedirect: 308,
  BadRequest: 400,
  Unauthorized: 401,
  PaymentRequired: 402,
  Forbidden: 403,
  NotFound: 404,
  MethodNotAllowed: 405,
  NotAcceptable: 406,
  ProxyAuthenticationRequired: 407,
  RequestTimeout: 408,
  Conflict: 409,
  Gone: 410,
  LengthRequired: 411,
  PreconditionFailed: 412,
  PayloadTooLarge: 413,
  UriTooLong: 414,
  UnsupportedMediaType: 415,
  RangeNotSatisfiable: 416,
  ExpectationFailed: 417,
  ImATeapot: 418,
  MisdirectedRequest: 421,
  UnprocessableEntity: 422,
  Locked: 423,
  FailedDependency: 424,
  TooEarly: 425,
  UpgradeRequired: 426,
  PreconditionRequired: 428,
  TooManyRequests: 429,
  RequestHeaderFieldsTooLarge: 431,
  UnavailableForLegalReasons: 451,
  InternalServerError: 500,
  NotImplemented: 501,
  BadGateway: 502,
  ServiceUnavailable: 503,
  GatewayTimeout: 504,
  HttpVersionNotSupported: 505,
  VariantAlsoNegotiates: 506,
  InsufficientStorage: 507,
  LoopDetected: 508,
  NotExtended: 510,
  NetworkAuthenticationRequired: 511
};
Object.entries(rc).forEach(([e, t]) => {
  rc[t] = e;
});
function yv(e) {
  const t = new di(e), n = Jm(di.prototype.request, t);
  return ie.extend(n, di.prototype, t, { allOwnKeys: !0 }), ie.extend(n, t, null, { allOwnKeys: !0 }), n.create = function(i) {
    return yv(gi(e, i));
  }, n;
}
const un = yv($o);
un.Axios = di;
un.CanceledError = Ji;
un.CancelToken = QT;
un.isCancel = cv;
un.VERSION = vv;
un.toFormData = Ms;
un.AxiosError = At;
un.Cancel = un.CanceledError;
un.all = function(t) {
  return Promise.all(t);
};
un.spread = KT;
un.isAxiosError = ek;
un.mergeConfig = gi;
un.AxiosHeaders = jn;
un.formToJSON = (e) => uv(ie.isHTMLForm(e) ? new FormData(e) : e);
un.getAdapter = mv.getAdapter;
un.HttpStatusCode = rc;
un.default = un;
const {
  Axios: CO,
  AxiosError: SO,
  CanceledError: IO,
  isCancel: RO,
  CancelToken: EO,
  VERSION: AO,
  all: PO,
  Cancel: TO,
  isAxiosError: kO,
  spread: OO,
  toFormData: FO,
  AxiosHeaders: BO,
  HttpStatusCode: NO,
  formToJSON: GO,
  getAdapter: _O,
  mergeConfig: MO
} = un;
class yo extends Error {
}
yo.prototype.name = "InvalidTokenError";
function tk(e) {
  return decodeURIComponent(atob(e).replace(/(.)/g, (t, n) => {
    let r = n.charCodeAt(0).toString(16).toUpperCase();
    return r.length < 2 && (r = "0" + r), "%" + r;
  }));
}
function nk(e) {
  let t = e.replace(/-/g, "+").replace(/_/g, "/");
  switch (t.length % 4) {
    case 0:
      break;
    case 2:
      t += "==";
      break;
    case 3:
      t += "=";
      break;
    default:
      throw new Error("base64 string is not of the correct length");
  }
  try {
    return tk(t);
  } catch {
    return atob(t);
  }
}
function rk(e, t) {
  if (typeof e != "string")
    throw new yo("Invalid token specified: must be a string");
  t || (t = {});
  const n = t.header === !0 ? 0 : 1, r = e.split(".")[n];
  if (typeof r != "string")
    throw new yo(`Invalid token specified: missing part #${n + 1}`);
  let i;
  try {
    i = nk(r);
  } catch (a) {
    throw new yo(`Invalid token specified: invalid base64 for part #${n + 1} (${a.message})`);
  }
  try {
    return JSON.parse(i);
  } catch (a) {
    throw new yo(`Invalid token specified: invalid json for part #${n + 1} (${a.message})`);
  }
}
const Yr = "https://apidashboard.dev.orahi.com/api", ik = {
  CHAT_API: "https://chatai.dev.orahi.com",
  SAVE_DASHBOARD: `${Yr}/update-component-id/`,
  DELETE_DASHBOARD: `${Yr}/update-component-id/`,
  GET_KPI_DATA: `${Yr}/component-ids/1-4`,
  GET_BAR_CHART_DATA: `${Yr}/component-ids/5`,
  GET_LINE_CHART_DATA: `${Yr}/component-ids/6`,
  GET_TABLE_DATA: `${Yr}/component-ids/7`,
  GET_USER_DASHBOARDS: `${Yr}/manage_dashboard`,
  CREATE_USER_DASHBOARD: `${Yr}/manage_dashboard/?`
}, ok = () => {
  const e = localStorage.getItem("token");
  e ? (un.defaults.headers.post["Content-Type"] = "application/json", un.defaults.headers.common.Authorization = `Bearer ${e}`) : delete un.defaults.headers.common.Authorization;
};
function ak(e) {
  if (typeof e != "object" || e === null)
    return !1;
  let t = e;
  for (; Object.getPrototypeOf(t) !== null; )
    t = Object.getPrototypeOf(t);
  return Object.getPrototypeOf(e) === t || Object.getPrototypeOf(e) === null;
}
function sk(e) {
  return ak(e) && "type" in e && typeof e.type == "string";
}
var Xo = {}, wv = Symbol.for("immer-nothing"), Mp = Symbol.for("immer-draftable"), qn = Symbol.for("immer-state"), lk = Xo.NODE_ENV !== "production" ? [
  // All error codes, starting by 0:
  function(e) {
    return `The plugin for '${e}' has not been loaded into Immer. To enable the plugin, import and call \`enable${e}()\` when initializing your application.`;
  },
  function(e) {
    return `produce can only be called on things that are draftable: plain objects, arrays, Map, Set or classes that are marked with '[immerable]: true'. Got '${e}'`;
  },
  "This object has been frozen and should not be mutated",
  function(e) {
    return "Cannot use a proxy that has been revoked. Did you pass an object from inside an immer function to an async process? " + e;
  },
  "An immer producer returned a new value *and* modified its draft. Either return a new value *or* modify the draft.",
  "Immer forbids circular references",
  "The first or second argument to `produce` must be a function",
  "The third argument to `produce` must be a function or undefined",
  "First argument to `createDraft` must be a plain object, an array, or an immerable object",
  "First argument to `finishDraft` must be a draft returned by `createDraft`",
  function(e) {
    return `'current' expects a draft, got: ${e}`;
  },
  "Object.defineProperty() cannot be used on an Immer draft",
  "Object.setPrototypeOf() cannot be used on an Immer draft",
  "Immer only supports deleting array indices",
  "Immer only supports setting array indices and the 'length' property",
  function(e) {
    return `'original' expects a draft, got: ${e}`;
  }
  // Note: if more errors are added, the errorOffset in Patches.ts should be increased
  // See Patches.ts for additional errors
] : [];
function Ln(e, ...t) {
  if (Xo.NODE_ENV !== "production") {
    const n = lk[e], r = typeof n == "function" ? n.apply(null, t) : n;
    throw new Error(`[Immer] ${r}`);
  }
  throw new Error(
    `[Immer] minified error nr: ${e}. Full error at: https://bit.ly/3cXEKWf`
  );
}
var zi = Object.getPrototypeOf;
function hi(e) {
  return !!e && !!e[qn];
}
function Nr(e) {
  var t;
  return e ? xv(e) || Array.isArray(e) || !!e[Mp] || !!((t = e.constructor) != null && t[Mp]) || js(e) || zs(e) : !1;
}
var uk = Object.prototype.constructor.toString();
function xv(e) {
  if (!e || typeof e != "object")
    return !1;
  const t = zi(e);
  if (t === null)
    return !0;
  const n = Object.hasOwnProperty.call(t, "constructor") && t.constructor;
  return n === Object ? !0 : typeof n == "function" && Function.toString.call(n) === uk;
}
function vs(e, t) {
  Ds(e) === 0 ? Reflect.ownKeys(e).forEach((n) => {
    t(n, e[n], e);
  }) : e.forEach((n, r) => t(r, n, e));
}
function Ds(e) {
  const t = e[qn];
  return t ? t.type_ : Array.isArray(e) ? 1 : js(e) ? 2 : zs(e) ? 3 : 0;
}
function ic(e, t) {
  return Ds(e) === 2 ? e.has(t) : Object.prototype.hasOwnProperty.call(e, t);
}
function Cv(e, t, n) {
  const r = Ds(e);
  r === 2 ? e.set(t, n) : r === 3 ? e.add(n) : e[t] = n;
}
function ck(e, t) {
  return e === t ? e !== 0 || 1 / e === 1 / t : e !== e && t !== t;
}
function js(e) {
  return e instanceof Map;
}
function zs(e) {
  return e instanceof Set;
}
function li(e) {
  return e.copy_ || e.base_;
}
function oc(e, t) {
  if (js(e))
    return new Map(e);
  if (zs(e))
    return new Set(e);
  if (Array.isArray(e))
    return Array.prototype.slice.call(e);
  const n = xv(e);
  if (t === !0 || t === "class_only" && !n) {
    const r = Object.getOwnPropertyDescriptors(e);
    delete r[qn];
    let i = Reflect.ownKeys(r);
    for (let a = 0; a < i.length; a++) {
      const o = i[a], l = r[o];
      l.writable === !1 && (l.writable = !0, l.configurable = !0), (l.get || l.set) && (r[o] = {
        configurable: !0,
        writable: !0,
        // could live with !!desc.set as well here...
        enumerable: l.enumerable,
        value: e[o]
      });
    }
    return Object.create(zi(e), r);
  } else {
    const r = zi(e);
    if (r !== null && n)
      return { ...e };
    const i = Object.create(r);
    return Object.assign(i, e);
  }
}
function nd(e, t = !1) {
  return Hs(e) || hi(e) || !Nr(e) || (Ds(e) > 1 && (e.set = e.add = e.clear = e.delete = dk), Object.freeze(e), t && Object.entries(e).forEach(([n, r]) => nd(r, !0))), e;
}
function dk() {
  Ln(2);
}
function Hs(e) {
  return Object.isFrozen(e);
}
var fk = {};
function mi(e) {
  const t = fk[e];
  return t || Ln(0, e), t;
}
var Mo;
function Sv() {
  return Mo;
}
function pk(e, t) {
  return {
    drafts_: [],
    parent_: e,
    immer_: t,
    // Whenever the modified draft contains a draft from another scope, we
    // need to prevent auto-freezing so the unowned draft can be finalized.
    canAutoFreeze_: !0,
    unfinalizedDrafts_: 0
  };
}
function Vp(e, t) {
  t && (mi("Patches"), e.patches_ = [], e.inversePatches_ = [], e.patchListener_ = t);
}
function ac(e) {
  sc(e), e.drafts_.forEach(gk), e.drafts_ = null;
}
function sc(e) {
  e === Mo && (Mo = e.parent_);
}
function Lp(e) {
  return Mo = pk(Mo, e);
}
function gk(e) {
  const t = e[qn];
  t.type_ === 0 || t.type_ === 1 ? t.revoke_() : t.revoked_ = !0;
}
function Dp(e, t) {
  t.unfinalizedDrafts_ = t.drafts_.length;
  const n = t.drafts_[0];
  return e !== void 0 && e !== n ? (n[qn].modified_ && (ac(t), Ln(4)), Nr(e) && (e = bs(t, e), t.parent_ || ys(t, e)), t.patches_ && mi("Patches").generateReplacementPatches_(
    n[qn].base_,
    e,
    t.patches_,
    t.inversePatches_
  )) : e = bs(t, n, []), ac(t), t.patches_ && t.patchListener_(t.patches_, t.inversePatches_), e !== wv ? e : void 0;
}
function bs(e, t, n) {
  if (Hs(t))
    return t;
  const r = t[qn];
  if (!r)
    return vs(
      t,
      (i, a) => jp(e, r, t, i, a, n)
    ), t;
  if (r.scope_ !== e)
    return t;
  if (!r.modified_)
    return ys(e, r.base_, !0), r.base_;
  if (!r.finalized_) {
    r.finalized_ = !0, r.scope_.unfinalizedDrafts_--;
    const i = r.copy_;
    let a = i, o = !1;
    r.type_ === 3 && (a = new Set(i), i.clear(), o = !0), vs(
      a,
      (l, u) => jp(e, r, i, l, u, n, o)
    ), ys(e, i, !1), n && e.patches_ && mi("Patches").generatePatches_(
      r,
      n,
      e.patches_,
      e.inversePatches_
    );
  }
  return r.copy_;
}
function jp(e, t, n, r, i, a, o) {
  if (Xo.NODE_ENV !== "production" && i === n && Ln(5), hi(i)) {
    const l = a && t && t.type_ !== 3 && // Set objects are atomic since they have no keys.
    !ic(t.assigned_, r) ? a.concat(r) : void 0, u = bs(e, i, l);
    if (Cv(n, r, u), hi(u))
      e.canAutoFreeze_ = !1;
    else
      return;
  } else o && n.add(i);
  if (Nr(i) && !Hs(i)) {
    if (!e.immer_.autoFreeze_ && e.unfinalizedDrafts_ < 1)
      return;
    bs(e, i), (!t || !t.scope_.parent_) && typeof r != "symbol" && Object.prototype.propertyIsEnumerable.call(n, r) && ys(e, i);
  }
}
function ys(e, t, n = !1) {
  !e.parent_ && e.immer_.autoFreeze_ && e.canAutoFreeze_ && nd(t, n);
}
function hk(e, t) {
  const n = Array.isArray(e), r = {
    type_: n ? 1 : 0,
    // Track which produce call this is associated with.
    scope_: t ? t.scope_ : Sv(),
    // True for both shallow and deep changes.
    modified_: !1,
    // Used during finalization.
    finalized_: !1,
    // Track which properties have been assigned (true) or deleted (false).
    assigned_: {},
    // The parent draft state.
    parent_: t,
    // The base state.
    base_: e,
    // The base proxy.
    draft_: null,
    // set below
    // The base copy with any updated values.
    copy_: null,
    // Called by the `produce` function.
    revoke_: null,
    isManual_: !1
  };
  let i = r, a = rd;
  n && (i = [r], a = Vo);
  const { revoke: o, proxy: l } = Proxy.revocable(i, a);
  return r.draft_ = l, r.revoke_ = o, l;
}
var rd = {
  get(e, t) {
    if (t === qn)
      return e;
    const n = li(e);
    if (!ic(n, t))
      return mk(e, n, t);
    const r = n[t];
    return e.finalized_ || !Nr(r) ? r : r === yu(e.base_, t) ? (wu(e), e.copy_[t] = uc(r, e)) : r;
  },
  has(e, t) {
    return t in li(e);
  },
  ownKeys(e) {
    return Reflect.ownKeys(li(e));
  },
  set(e, t, n) {
    const r = Iv(li(e), t);
    if (r != null && r.set)
      return r.set.call(e.draft_, n), !0;
    if (!e.modified_) {
      const i = yu(li(e), t), a = i == null ? void 0 : i[qn];
      if (a && a.base_ === n)
        return e.copy_[t] = n, e.assigned_[t] = !1, !0;
      if (ck(n, i) && (n !== void 0 || ic(e.base_, t)))
        return !0;
      wu(e), lc(e);
    }
    return e.copy_[t] === n && // special case: handle new props with value 'undefined'
    (n !== void 0 || t in e.copy_) || // special case: NaN
    Number.isNaN(n) && Number.isNaN(e.copy_[t]) || (e.copy_[t] = n, e.assigned_[t] = !0), !0;
  },
  deleteProperty(e, t) {
    return yu(e.base_, t) !== void 0 || t in e.base_ ? (e.assigned_[t] = !1, wu(e), lc(e)) : delete e.assigned_[t], e.copy_ && delete e.copy_[t], !0;
  },
  // Note: We never coerce `desc.value` into an Immer draft, because we can't make
  // the same guarantee in ES5 mode.
  getOwnPropertyDescriptor(e, t) {
    const n = li(e), r = Reflect.getOwnPropertyDescriptor(n, t);
    return r && {
      writable: !0,
      configurable: e.type_ !== 1 || t !== "length",
      enumerable: r.enumerable,
      value: n[t]
    };
  },
  defineProperty() {
    Ln(11);
  },
  getPrototypeOf(e) {
    return zi(e.base_);
  },
  setPrototypeOf() {
    Ln(12);
  }
}, Vo = {};
vs(rd, (e, t) => {
  Vo[e] = function() {
    return arguments[0] = arguments[0][0], t.apply(this, arguments);
  };
});
Vo.deleteProperty = function(e, t) {
  return Xo.NODE_ENV !== "production" && isNaN(parseInt(t)) && Ln(13), Vo.set.call(this, e, t, void 0);
};
Vo.set = function(e, t, n) {
  return Xo.NODE_ENV !== "production" && t !== "length" && isNaN(parseInt(t)) && Ln(14), rd.set.call(this, e[0], t, n, e[0]);
};
function yu(e, t) {
  const n = e[qn];
  return (n ? li(n) : e)[t];
}
function mk(e, t, n) {
  var i;
  const r = Iv(t, n);
  return r ? "value" in r ? r.value : (
    // This is a very special case, if the prop is a getter defined by the
    // prototype, we should invoke it with the draft as context!
    (i = r.get) == null ? void 0 : i.call(e.draft_)
  ) : void 0;
}
function Iv(e, t) {
  if (!(t in e))
    return;
  let n = zi(e);
  for (; n; ) {
    const r = Object.getOwnPropertyDescriptor(n, t);
    if (r)
      return r;
    n = zi(n);
  }
}
function lc(e) {
  e.modified_ || (e.modified_ = !0, e.parent_ && lc(e.parent_));
}
function wu(e) {
  e.copy_ || (e.copy_ = oc(
    e.base_,
    e.scope_.immer_.useStrictShallowCopy_
  ));
}
var vk = class {
  constructor(e) {
    this.autoFreeze_ = !0, this.useStrictShallowCopy_ = !1, this.produce = (t, n, r) => {
      if (typeof t == "function" && typeof n != "function") {
        const a = n;
        n = t;
        const o = this;
        return function(u = a, ...s) {
          return o.produce(u, (d) => n.call(this, d, ...s));
        };
      }
      typeof n != "function" && Ln(6), r !== void 0 && typeof r != "function" && Ln(7);
      let i;
      if (Nr(t)) {
        const a = Lp(this), o = uc(t, void 0);
        let l = !0;
        try {
          i = n(o), l = !1;
        } finally {
          l ? ac(a) : sc(a);
        }
        return Vp(a, r), Dp(i, a);
      } else if (!t || typeof t != "object") {
        if (i = n(t), i === void 0 && (i = t), i === wv && (i = void 0), this.autoFreeze_ && nd(i, !0), r) {
          const a = [], o = [];
          mi("Patches").generateReplacementPatches_(t, i, a, o), r(a, o);
        }
        return i;
      } else
        Ln(1, t);
    }, this.produceWithPatches = (t, n) => {
      if (typeof t == "function")
        return (o, ...l) => this.produceWithPatches(o, (u) => t(u, ...l));
      let r, i;
      return [this.produce(t, n, (o, l) => {
        r = o, i = l;
      }), r, i];
    }, typeof (e == null ? void 0 : e.autoFreeze) == "boolean" && this.setAutoFreeze(e.autoFreeze), typeof (e == null ? void 0 : e.useStrictShallowCopy) == "boolean" && this.setUseStrictShallowCopy(e.useStrictShallowCopy);
  }
  createDraft(e) {
    Nr(e) || Ln(8), hi(e) && (e = bk(e));
    const t = Lp(this), n = uc(e, void 0);
    return n[qn].isManual_ = !0, sc(t), n;
  }
  finishDraft(e, t) {
    const n = e && e[qn];
    (!n || !n.isManual_) && Ln(9);
    const { scope_: r } = n;
    return Vp(r, t), Dp(void 0, r);
  }
  /**
   * Pass true to automatically freeze all copies created by Immer.
   *
   * By default, auto-freezing is enabled.
   */
  setAutoFreeze(e) {
    this.autoFreeze_ = e;
  }
  /**
   * Pass true to enable strict shallow copy.
   *
   * By default, immer does not copy the object descriptors such as getter, setter and non-enumrable properties.
   */
  setUseStrictShallowCopy(e) {
    this.useStrictShallowCopy_ = e;
  }
  applyPatches(e, t) {
    let n;
    for (n = t.length - 1; n >= 0; n--) {
      const i = t[n];
      if (i.path.length === 0 && i.op === "replace") {
        e = i.value;
        break;
      }
    }
    n > -1 && (t = t.slice(n + 1));
    const r = mi("Patches").applyPatches_;
    return hi(e) ? r(e, t) : this.produce(
      e,
      (i) => r(i, t)
    );
  }
};
function uc(e, t) {
  const n = js(e) ? mi("MapSet").proxyMap_(e, t) : zs(e) ? mi("MapSet").proxySet_(e, t) : hk(e, t);
  return (t ? t.scope_ : Sv()).drafts_.push(n), n;
}
function bk(e) {
  return hi(e) || Ln(10, e), Rv(e);
}
function Rv(e) {
  if (!Nr(e) || Hs(e))
    return e;
  const t = e[qn];
  let n;
  if (t) {
    if (!t.modified_)
      return t.base_;
    t.finalized_ = !0, n = oc(e, t.scope_.immer_.useStrictShallowCopy_);
  } else
    n = oc(e, !0);
  return vs(n, (r, i) => {
    Cv(n, r, Rv(i));
  }), t && (t.finalized_ = !1), n;
}
var Qn = new vk(), Ev = Qn.produce;
Qn.produceWithPatches.bind(
  Qn
);
Qn.setAutoFreeze.bind(Qn);
Qn.setUseStrictShallowCopy.bind(Qn);
Qn.applyPatches.bind(Qn);
Qn.createDraft.bind(Qn);
Qn.finishDraft.bind(Qn);
var yk = {}, wk = (e, t, n) => {
  if (t.length === 1 && t[0] === n) {
    let r = !1;
    try {
      const i = {};
      e(i) === i && (r = !0);
    } catch {
    }
    if (r) {
      let i;
      try {
        throw new Error();
      } catch (a) {
        ({ stack: i } = a);
      }
      console.warn(
        `The result function returned its own inputs without modification. e.g
\`createSelector([state => state.todos], todos => todos)\`
This could lead to inefficient memoization and unnecessary re-renders.
Ensure transformation logic is in the result function, and extraction logic is in the input selectors.`,
        { stack: i }
      );
    }
  }
}, xk = (e, t, n) => {
  const { memoize: r, memoizeOptions: i } = t, { inputSelectorResults: a, inputSelectorResultsCopy: o } = e, l = r(() => ({}), ...i);
  if (!(l.apply(null, a) === l.apply(null, o))) {
    let s;
    try {
      throw new Error();
    } catch (d) {
      ({ stack: s } = d);
    }
    console.warn(
      `An input selector returned a different result when passed same arguments.
This means your output selector will likely run more frequently than intended.
Avoid returning a new reference inside your input selector, e.g.
\`createSelector([state => state.todos.map(todo => todo.id)], todoIds => todoIds.length)\``,
      {
        arguments: n,
        firstInputs: a,
        secondInputs: o,
        stack: s
      }
    );
  }
}, Ck = {
  inputStabilityCheck: "once",
  identityFunctionCheck: "once"
};
function Sk(e, t = `expected a function, instead received ${typeof e}`) {
  if (typeof e != "function")
    throw new TypeError(t);
}
function Ik(e, t = `expected an object, instead received ${typeof e}`) {
  if (typeof e != "object")
    throw new TypeError(t);
}
function Rk(e, t = "expected all items to be functions, instead received the following types: ") {
  if (!e.every((n) => typeof n == "function")) {
    const n = e.map(
      (r) => typeof r == "function" ? `function ${r.name || "unnamed"}()` : typeof r
    ).join(", ");
    throw new TypeError(`${t}[${n}]`);
  }
}
var zp = (e) => Array.isArray(e) ? e : [e];
function Ek(e) {
  const t = Array.isArray(e[0]) ? e[0] : e;
  return Rk(
    t,
    "createSelector expects all input-selectors to be functions, but received the following types: "
  ), t;
}
function Hp(e, t) {
  const n = [], { length: r } = e;
  for (let i = 0; i < r; i++)
    n.push(e[i].apply(null, t));
  return n;
}
var Ak = (e, t) => {
  const { identityFunctionCheck: n, inputStabilityCheck: r } = {
    ...Ck,
    ...t
  };
  return {
    identityFunctionCheck: {
      shouldRun: n === "always" || n === "once" && e,
      run: wk
    },
    inputStabilityCheck: {
      shouldRun: r === "always" || r === "once" && e,
      run: xk
    }
  };
}, Pk = class {
  constructor(e) {
    this.value = e;
  }
  deref() {
    return this.value;
  }
}, Tk = typeof WeakRef < "u" ? WeakRef : Pk, kk = 0, Wp = 1;
function Va() {
  return {
    s: kk,
    v: void 0,
    o: null,
    p: null
  };
}
function Av(e, t = {}) {
  let n = Va();
  const { resultEqualityCheck: r } = t;
  let i, a = 0;
  function o() {
    var c;
    let l = n;
    const { length: u } = arguments;
    for (let m = 0, h = u; m < h; m++) {
      const x = arguments[m];
      if (typeof x == "function" || typeof x == "object" && x !== null) {
        let v = l.o;
        v === null && (l.o = v = /* @__PURE__ */ new WeakMap());
        const b = v.get(x);
        b === void 0 ? (l = Va(), v.set(x, l)) : l = b;
      } else {
        let v = l.p;
        v === null && (l.p = v = /* @__PURE__ */ new Map());
        const b = v.get(x);
        b === void 0 ? (l = Va(), v.set(x, l)) : l = b;
      }
    }
    const s = l;
    let d;
    if (l.s === Wp)
      d = l.v;
    else if (d = e.apply(null, arguments), a++, r) {
      const m = ((c = i == null ? void 0 : i.deref) == null ? void 0 : c.call(i)) ?? i;
      m != null && r(m, d) && (d = m, a !== 0 && a--), i = typeof d == "object" && d !== null || typeof d == "function" ? new Tk(d) : d;
    }
    return s.s = Wp, s.v = d, d;
  }
  return o.clearCache = () => {
    n = Va(), o.resetResultsCount();
  }, o.resultsCount = () => a, o.resetResultsCount = () => {
    a = 0;
  }, o;
}
function Ok(e, ...t) {
  const n = typeof e == "function" ? {
    memoize: e,
    memoizeOptions: t
  } : e, r = (...i) => {
    let a = 0, o = 0, l, u = {}, s = i.pop();
    typeof s == "object" && (u = s, s = i.pop()), Sk(
      s,
      `createSelector expects an output function after the inputs, but received: [${typeof s}]`
    );
    const d = {
      ...n,
      ...u
    }, {
      memoize: c,
      memoizeOptions: m = [],
      argsMemoize: h = Av,
      argsMemoizeOptions: x = [],
      devModeChecks: v = {}
    } = d, b = zp(m), I = zp(x), O = Ek(i), T = c(function() {
      return a++, s.apply(
        null,
        arguments
      );
    }, ...b);
    let D = !0;
    const E = h(function() {
      o++;
      const X = Hp(
        O,
        arguments
      );
      if (l = T.apply(null, X), yk.NODE_ENV !== "production") {
        const { identityFunctionCheck: U, inputStabilityCheck: K } = Ak(D, v);
        if (U.shouldRun && U.run(
          s,
          X,
          l
        ), K.shouldRun) {
          const Fe = Hp(
            O,
            arguments
          );
          K.run(
            { inputSelectorResults: X, inputSelectorResultsCopy: Fe },
            { memoize: c, memoizeOptions: b },
            arguments
          );
        }
        D && (D = !1);
      }
      return l;
    }, ...I);
    return Object.assign(E, {
      resultFunc: s,
      memoizedResultFunc: T,
      dependencies: O,
      dependencyRecomputations: () => o,
      resetDependencyRecomputations: () => {
        o = 0;
      },
      lastResult: () => l,
      recomputations: () => a,
      resetRecomputations: () => {
        a = 0;
      },
      memoize: c,
      argsMemoize: h
    });
  };
  return Object.assign(r, {
    withTypes: () => r
  }), r;
}
var Fk = /* @__PURE__ */ Ok(Av), Bk = Object.assign(
  (e, t = Fk) => {
    Ik(
      e,
      `createStructuredSelector expects first argument to be an object where each property is a selector, instead received a ${typeof e}`
    );
    const n = Object.keys(e), r = n.map(
      (a) => e[a]
    );
    return t(
      r,
      (...a) => a.reduce((o, l, u) => (o[n[u]] = l, o), {})
    );
  },
  { withTypes: () => Bk }
), ln = {};
function $p(e, t) {
  function n(...r) {
    if (t) {
      let i = t(...r);
      if (!i)
        throw new Error(ln.NODE_ENV === "production" ? On(0) : "prepareAction did not return an object");
      return {
        type: e,
        payload: i.payload,
        ..."meta" in i && {
          meta: i.meta
        },
        ..."error" in i && {
          error: i.error
        }
      };
    }
    return {
      type: e,
      payload: r[0]
    };
  }
  return n.toString = () => `${e}`, n.type = e, n.match = (r) => sk(r) && r.type === e, n;
}
function Xp(e) {
  return Nr(e) ? Ev(e, () => {
  }) : e;
}
function Yp(e, t, n) {
  return e.has(t) ? e.get(t) : e.set(t, n(t)).get(t);
}
function Pv(e) {
  const t = {}, n = [];
  let r;
  const i = {
    addCase(a, o) {
      if (ln.NODE_ENV !== "production") {
        if (n.length > 0)
          throw new Error(ln.NODE_ENV === "production" ? On(26) : "`builder.addCase` should only be called before calling `builder.addMatcher`");
        if (r)
          throw new Error(ln.NODE_ENV === "production" ? On(27) : "`builder.addCase` should only be called before calling `builder.addDefaultCase`");
      }
      const l = typeof a == "string" ? a : a.type;
      if (!l)
        throw new Error(ln.NODE_ENV === "production" ? On(28) : "`builder.addCase` cannot be called with an empty action type");
      if (l in t)
        throw new Error(ln.NODE_ENV === "production" ? On(29) : `\`builder.addCase\` cannot be called with two reducers for the same action type '${l}'`);
      return t[l] = o, i;
    },
    addMatcher(a, o) {
      if (ln.NODE_ENV !== "production" && r)
        throw new Error(ln.NODE_ENV === "production" ? On(30) : "`builder.addMatcher` should only be called before calling `builder.addDefaultCase`");
      return n.push({
        matcher: a,
        reducer: o
      }), i;
    },
    addDefaultCase(a) {
      if (ln.NODE_ENV !== "production" && r)
        throw new Error(ln.NODE_ENV === "production" ? On(31) : "`builder.addDefaultCase` can only be called once");
      return r = a, i;
    }
  };
  return e(i), [t, n, r];
}
function Nk(e) {
  return typeof e == "function";
}
function Gk(e, t) {
  if (ln.NODE_ENV !== "production" && typeof t == "object")
    throw new Error(ln.NODE_ENV === "production" ? On(8) : "The object notation for `createReducer` has been removed. Please use the 'builder callback' notation instead: https://redux-toolkit.js.org/api/createReducer");
  let [n, r, i] = Pv(t), a;
  if (Nk(e))
    a = () => Xp(e());
  else {
    const l = Xp(e);
    a = () => l;
  }
  function o(l = a(), u) {
    let s = [n[u.type], ...r.filter(({
      matcher: d
    }) => d(u)).map(({
      reducer: d
    }) => d)];
    return s.filter((d) => !!d).length === 0 && (s = [i]), s.reduce((d, c) => {
      if (c)
        if (hi(d)) {
          const h = c(d, u);
          return h === void 0 ? d : h;
        } else {
          if (Nr(d))
            return Ev(d, (m) => c(m, u));
          {
            const m = c(d, u);
            if (m === void 0) {
              if (d === null)
                return d;
              throw Error("A case reducer on a non-draftable value must not return undefined");
            }
            return m;
          }
        }
      return d;
    }, l);
  }
  return o.getInitialState = a, o;
}
var _k = /* @__PURE__ */ Symbol.for("rtk-slice-createasyncthunk");
function Mk(e, t) {
  return `${e}/${t}`;
}
function Vk({
  creators: e
} = {}) {
  var n;
  const t = (n = e == null ? void 0 : e.asyncThunk) == null ? void 0 : n[_k];
  return function(i) {
    const {
      name: a,
      reducerPath: o = a
    } = i;
    if (!a)
      throw new Error(ln.NODE_ENV === "production" ? On(11) : "`name` is a required option for createSlice");
    typeof process < "u" && ln.NODE_ENV === "development" && i.initialState === void 0 && console.error("You must provide an `initialState` value that is not `undefined`. You may have misspelled `initialState`");
    const l = (typeof i.reducers == "function" ? i.reducers(jk()) : i.reducers) || {}, u = Object.keys(l), s = {
      sliceCaseReducersByName: {},
      sliceCaseReducersByType: {},
      actionCreators: {},
      sliceMatchers: []
    }, d = {
      addCase(T, D) {
        const E = typeof T == "string" ? T : T.type;
        if (!E)
          throw new Error(ln.NODE_ENV === "production" ? On(12) : "`context.addCase` cannot be called with an empty action type");
        if (E in s.sliceCaseReducersByType)
          throw new Error(ln.NODE_ENV === "production" ? On(13) : "`context.addCase` cannot be called with two reducers for the same action type: " + E);
        return s.sliceCaseReducersByType[E] = D, d;
      },
      addMatcher(T, D) {
        return s.sliceMatchers.push({
          matcher: T,
          reducer: D
        }), d;
      },
      exposeAction(T, D) {
        return s.actionCreators[T] = D, d;
      },
      exposeCaseReducer(T, D) {
        return s.sliceCaseReducersByName[T] = D, d;
      }
    };
    u.forEach((T) => {
      const D = l[T], E = {
        reducerName: T,
        type: Mk(a, T),
        createNotation: typeof i.reducers == "function"
      };
      Hk(D) ? $k(E, D, d, t) : zk(E, D, d);
    });
    function c() {
      if (ln.NODE_ENV !== "production" && typeof i.extraReducers == "object")
        throw new Error(ln.NODE_ENV === "production" ? On(14) : "The object notation for `createSlice.extraReducers` has been removed. Please use the 'builder callback' notation instead: https://redux-toolkit.js.org/api/createSlice");
      const [T = {}, D = [], E = void 0] = typeof i.extraReducers == "function" ? Pv(i.extraReducers) : [i.extraReducers], B = {
        ...T,
        ...s.sliceCaseReducersByType
      };
      return Gk(i.initialState, (X) => {
        for (let U in B)
          X.addCase(U, B[U]);
        for (let U of s.sliceMatchers)
          X.addMatcher(U.matcher, U.reducer);
        for (let U of D)
          X.addMatcher(U.matcher, U.reducer);
        E && X.addDefaultCase(E);
      });
    }
    const m = (T) => T, h = /* @__PURE__ */ new Map();
    let x;
    function v(T, D) {
      return x || (x = c()), x(T, D);
    }
    function b() {
      return x || (x = c()), x.getInitialState();
    }
    function I(T, D = !1) {
      function E(X) {
        let U = X[T];
        if (typeof U > "u") {
          if (D)
            U = b();
          else if (ln.NODE_ENV !== "production")
            throw new Error(ln.NODE_ENV === "production" ? On(15) : "selectSlice returned undefined for an uninjected slice reducer");
        }
        return U;
      }
      function B(X = m) {
        const U = Yp(h, D, () => /* @__PURE__ */ new WeakMap());
        return Yp(U, X, () => {
          const K = {};
          for (const [Fe, oe] of Object.entries(i.selectors ?? {}))
            K[Fe] = Lk(oe, X, b, D);
          return K;
        });
      }
      return {
        reducerPath: T,
        getSelectors: B,
        get selectors() {
          return B(E);
        },
        selectSlice: E
      };
    }
    const O = {
      name: a,
      reducer: v,
      actions: s.actionCreators,
      caseReducers: s.sliceCaseReducersByName,
      getInitialState: b,
      ...I(o),
      injectInto(T, {
        reducerPath: D,
        ...E
      } = {}) {
        const B = D ?? o;
        return T.inject({
          reducerPath: B,
          reducer: v
        }, E), {
          ...O,
          ...I(B, !0)
        };
      }
    };
    return O;
  };
}
function Lk(e, t, n, r) {
  function i(a, ...o) {
    let l = t(a);
    if (typeof l > "u") {
      if (r)
        l = n();
      else if (ln.NODE_ENV !== "production")
        throw new Error(ln.NODE_ENV === "production" ? On(16) : "selectState returned undefined for an uninjected slice reducer");
    }
    return e(l, ...o);
  }
  return i.unwrapped = e, i;
}
var Dk = /* @__PURE__ */ Vk();
function jk() {
  function e(t, n) {
    return {
      _reducerDefinitionType: "asyncThunk",
      payloadCreator: t,
      ...n
    };
  }
  return e.withTypes = () => e, {
    reducer(t) {
      return Object.assign({
        // hack so the wrapping function has the same name as the original
        // we need to create a wrapper so the `reducerDefinitionType` is not assigned to the original
        [t.name](...n) {
          return t(...n);
        }
      }[t.name], {
        _reducerDefinitionType: "reducer"
        /* reducer */
      });
    },
    preparedReducer(t, n) {
      return {
        _reducerDefinitionType: "reducerWithPrepare",
        prepare: t,
        reducer: n
      };
    },
    asyncThunk: e
  };
}
function zk({
  type: e,
  reducerName: t,
  createNotation: n
}, r, i) {
  let a, o;
  if ("reducer" in r) {
    if (n && !Wk(r))
      throw new Error(ln.NODE_ENV === "production" ? On(17) : "Please use the `create.preparedReducer` notation for prepared action creators with the `create` notation.");
    a = r.reducer, o = r.prepare;
  } else
    a = r;
  i.addCase(e, a).exposeCaseReducer(t, a).exposeAction(t, o ? $p(e, o) : $p(e));
}
function Hk(e) {
  return e._reducerDefinitionType === "asyncThunk";
}
function Wk(e) {
  return e._reducerDefinitionType === "reducerWithPrepare";
}
function $k({
  type: e,
  reducerName: t
}, n, r, i) {
  if (!i)
    throw new Error(ln.NODE_ENV === "production" ? On(18) : "Cannot use `create.asyncThunk` in the built-in `createSlice`. Use `buildCreateSlice({ creators: { asyncThunk: asyncThunkCreator } })` to create a customised version of `createSlice`.");
  const {
    payloadCreator: a,
    fulfilled: o,
    pending: l,
    rejected: u,
    settled: s,
    options: d
  } = n, c = i(e, a, d);
  r.exposeAction(t, c), o && r.addCase(c.fulfilled, o), l && r.addCase(c.pending, l), u && r.addCase(c.rejected, u), s && r.addMatcher(c.settled, s), r.exposeCaseReducer(t, {
    fulfilled: o || La,
    pending: l || La,
    rejected: u || La,
    settled: s || La
  });
}
function La() {
}
function On(e) {
  return `Minified Redux Toolkit error #${e}; visit https://redux-toolkit.js.org/Errors?code=${e} for the full message or use the non-minified dev environment for full errors. `;
}
const Ws = (e, t) => Dk({
  name: e,
  initialState: t,
  reducers: {
    loading(n) {
      n.loading = !0, n.error = "";
    },
    success(n, r) {
      n.loading = !1, n.info = r.payload;
    },
    error(n, r) {
      n.loading = !1, n.error = r.payload;
    },
    reset() {
      return t;
    }
  }
}), Xk = (e, t, n) => {
  var r;
  !e || e.response === void 0 ? t(n("network error")) : t(n((r = e == null ? void 0 : e.response) == null ? void 0 : r.data));
}, Yk = {
  loading: !1,
  info: [],
  error: ""
}, Zk = Ws("getBusinessList", Yk), { loading: Jk, success: Uk, error: qk, reset: Qk } = Zk.actions, Kk = () => async (e) => {
  var t, n, r;
  e(Jk());
  try {
    const i = rk(localStorage.getItem("token")), { signupApplication: a } = i, o = await un.get(
      `${ik.CHAT_API}/api/v1/companies/${a}/businesses`,
      ok()
    ), l = (t = o == null ? void 0 : o.data) == null ? void 0 : t.clients, u = l == null ? void 0 : l.map((m) => ({
      id: m.uuid,
      value: m.name,
      label: m.name
    })), s = JSON.parse(localStorage.getItem("business_details")), d = (n = s == null ? void 0 : s.user) == null ? void 0 : n.company_name, c = (r = s == null ? void 0 : s.user) == null ? void 0 : r.company_query_id;
    return localStorage.setItem("business_name", d), localStorage.setItem("business_id", c), e(Uk(u)), o;
  } catch (i) {
    Xk(i, e, qk);
  }
}, eO = () => async (e) => {
  e(Qk());
}, tO = {
  loading: !1,
  info: [],
  error: ""
}, nO = Ws("getLogs", tO), { loading: VO, success: LO, error: DO } = nO.actions, rO = {
  loading: !1,
  info: [],
  error: ""
}, iO = Ws("getProfileBalance", rO), { loading: jO, success: zO, error: HO } = iO.actions, oO = {
  loading: !1,
  info: [
    {
      data: "Hello! How can I assist you?",
      id: 0,
      from: "bot"
    }
  ],
  error: ""
}, aO = Ws("chatInterface", oO), { loading: WO, success: $O, error: XO, reset: sO } = aO.actions, lO = () => (e) => e(sO()), Tv = {
  admin: ["company_admin"],
  operator: ["company_operator"],
  company_business_user_chat_ttd: ["company_business_user_chat_ttd"],
  company_business_user_chat_tts: ["company_business_user_chat_tts"]
}, uO = Jp(), kv = () => Bn(uO), Ov = ({ disableSelect: e }) => {
  const t = sb(), { loading: n, info: r } = Cu(
    (v) => v.getBusinessListReducer
  ), i = Cu((v) => v.sidebar), a = JSON.parse(localStorage.getItem("business_details")) || null, o = JSON.parse(localStorage.getItem("decoded_token")) || null, l = o == null ? void 0 : o.affiliation, u = kv(), { admin: s, operator: d } = Tv, c = s.includes(u) || d.includes(u);
  Jr(() => {
    var v;
    (r == null ? void 0 : r.length) === 0 && (i != null && i.showRightSidebar) && c && (t(Kk()), localStorage.setItem("business_name", l), localStorage.setItem("business_id", (v = a == null ? void 0 : a.user) == null ? void 0 : v.company_query_id));
  }, [i == null ? void 0 : i.showRightSidebar]);
  const m = (v) => {
    v && (localStorage.setItem("business_id", v.id), localStorage.setItem("business_name", v.label), t(lO()));
  };
  Jr(() => () => {
    localStorage.removeItem("business_id"), localStorage.removeItem("business_name"), t(eO());
  }, []);
  const h = {
    id: l,
    value: l,
    label: l
  };
  let x = "";
  return e || (x = r.length > 0 ? h : ""), /* @__PURE__ */ W.jsx(em, { onSubmit: m, children: ({ handleSubmit: v }) => /* @__PURE__ */ W.jsx(tm, { onSubmit: v, children: /* @__PURE__ */ W.jsx(Ro, { children: /* @__PURE__ */ W.jsx(Eo, { children: e ? /* @__PURE__ */ W.jsx(
    Hu,
    {
      name: "business_name2",
      component: Cp,
      placeholder: "Please select your business",
      isDisabled: !0
    }
  ) : /* @__PURE__ */ W.jsx(
    Hu,
    {
      name: "business_name",
      component: Cp,
      placeholder: "Please select your business",
      options: r,
      isLoading: n,
      initialValue: x,
      isDisabled: e,
      parse: (b) => (m(b), b)
    }
  ) }) }) }) });
};
Ov.propTypes = {
  disableSelect: _e.any
};
dt.div`
  display: flex;
  padding: 10px;
  position: relative;
  margin: auto 0 15px;
  float: right;

  @media screen and (min-width: 768px) {
    display: flex;
  }
`;
const cO = () => {
  const [e, t] = Yn([]), [n, r] = Yn(""), i = ir(null), a = () => {
    n.trim() && (t((oe) => [...oe, n]), r(""));
  };
  Jr(() => {
    var oe;
    (oe = i.current) == null || oe.scrollIntoView({ behavior: "smooth" });
  }, [e]);
  const o = kv(), l = localStorage.getItem("aff_name"), {
    admin: u,
    operator: s,
    company_business_user_chat_tts: d,
    company_business_user_chat_ttd: c
  } = Tv, m = u.includes(o), h = s.includes(o), x = d.includes(o), v = c.includes(o), b = {
    normal: "Normal",
    ttyd: "TTYD"
  }, [I, O] = Yn(!0), [T, D] = Yn(() => x ? b.normal : v ? b.ttyd : b.normal), { loading: E, info: B } = {}, X = {}, U = {}, K = (oe, ce) => {
    ce.reset(), oe != null && oe.message && T === b.normal && (I || O((ye) => !ye)), oe != null && oe.message && T === b.ttyd && (I || O((ye) => !ye));
  }, Fe = (oe) => {
    oe != null && oe.id;
  };
  return Jr(() => {
    location.pathname === "/chat-dash-doc" ? D(b.ttyd) : D(b.normal);
  }, [location]), /* @__PURE__ */ W.jsxs(W.Fragment, { children: [
    /* @__PURE__ */ W.jsx(
      J0,
      {
        style: {
          display: "flex",
          justifyContent: "flex-start",
          flexDirection: "column",
          alignItems: "flex-start"
        },
        children: l !== void 0 && l !== "telematics" && l !== "telematics_demo" && /* @__PURE__ */ W.jsx("div", { style: { width: "100%", marginTop: "20px" }, children: /* @__PURE__ */ W.jsxs(
          "div",
          {
            style: {
              display: "flex",
              justifyContent: "flex-start",
              width: "100%"
            },
            children: [
              /* @__PURE__ */ W.jsx(
                "p",
                {
                  style: {
                    fontSize: "16px",
                    marginRight: "20px",
                    fontStyle: "normal",
                    fontWeight: "700",
                    alignContent: "center"
                  },
                  children: "Business"
                }
              ),
              /* @__PURE__ */ W.jsx("div", { children: (m || h) && /* @__PURE__ */ W.jsx(
                Ov,
                {
                  chatPage: !0,
                  disableSelect: T !== b.normal
                }
              ) })
            ]
          }
        ) })
      }
    ),
    /* @__PURE__ */ W.jsxs(
      Z0,
      {
        style: {
          height: "65vh"
        },
        children: [
          T === b.normal && (B == null ? void 0 : B.map((oe, ce) => oe.from === "user" ? /* @__PURE__ */ W.jsx(ku, { item: oe, index: ce }, oe.id) : /* @__PURE__ */ W.jsx(
            zu,
            {
              item: oe,
              index: ce,
              handleDownload: () => Fe(oe)
            },
            oe.id
          ))),
          T === b.ttyd && (X == null ? void 0 : X.map((oe, ce) => oe.from === "user" ? /* @__PURE__ */ W.jsx(ku, { item: oe, index: ce }, oe.id) : /* @__PURE__ */ W.jsx(
            zu,
            {
              item: oe,
              index: ce,
              handleDownload: () => {
              }
            },
            oe.id
          ))),
          (E || U) && /* @__PURE__ */ W.jsx($I, {})
        ]
      }
    ),
    /* @__PURE__ */ W.jsx(rm, { onSubmit: K }),
    /* @__PURE__ */ W.jsxs(
      "div",
      {
        style: {
          margin: "20px auto",
          height: "80vh",
          display: "flex",
          flexDirection: "column",
          borderRadius: "16px",
          overflow: "hidden",
          boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
          border: "1px solid #eaeaea"
        },
        children: [
          /* @__PURE__ */ W.jsx(
            "div",
            {
              style: {
                background: "linear-gradient(90deg, #833ab4, #fd1d1d, #fcb045)",
                color: "white",
                textAlign: "center",
                padding: "16px",
                fontWeight: "bold",
                fontSize: "18px",
                letterSpacing: "0.5px"
              },
              children: "Chat with Yourself"
            }
          ),
          /* @__PURE__ */ W.jsxs(
            "div",
            {
              style: {
                flex: 1,
                overflowY: "auto",
                background: "#fafafa",
                padding: "16px"
              },
              children: [
                e.length === 0 && /* @__PURE__ */ W.jsx("p", { style: { color: "#aaa", textAlign: "center" }, children: "No messages yet..." }),
                e.map((oe, ce) => /* @__PURE__ */ W.jsx(
                  "div",
                  {
                    style: {
                      display: "flex",
                      justifyContent: "flex-end",
                      marginBottom: "8px"
                    },
                    children: /* @__PURE__ */ W.jsx(
                      "div",
                      {
                        style: {
                          background: "#efefef",
                          color: "#000",
                          padding: "10px 14px",
                          borderRadius: "18px",
                          maxWidth: "70%",
                          fontSize: "14px"
                        },
                        children: oe
                      }
                    )
                  },
                  ce
                )),
                /* @__PURE__ */ W.jsx("div", { ref: i })
              ]
            }
          ),
          /* @__PURE__ */ W.jsxs(
            "div",
            {
              style: {
                padding: "12px",
                borderTop: "1px solid #eaeaea",
                display: "flex",
                gap: "8px",
                background: "#fff"
              },
              children: [
                /* @__PURE__ */ W.jsx(
                  "input",
                  {
                    type: "text",
                    placeholder: "Type a message...",
                    value: n,
                    onChange: (oe) => r(oe.target.value),
                    onKeyDown: (oe) => oe.key === "Enter" && a(),
                    style: {
                      flex: 1,
                      padding: "10px 16px",
                      borderRadius: "30px",
                      border: "1px solid #ddd",
                      outline: "none",
                      fontSize: "14px"
                    }
                  }
                ),
                /* @__PURE__ */ W.jsx(
                  "button",
                  {
                    onClick: a,
                    style: {
                      background: "linear-gradient(90deg, #833ab4, #fd1d1d, #fcb045)",
                      color: "white",
                      border: "none",
                      borderRadius: "30px",
                      padding: "10px 16px",
                      cursor: "pointer",
                      fontWeight: "bold",
                      fontSize: "14px"
                    },
                    children: "Send"
                  }
                )
              ]
            }
          )
        ]
      }
    )
  ] });
}, dO = () => /* @__PURE__ */ W.jsx(vg, { children: /* @__PURE__ */ W.jsx(Tg, { className: "row justify-content-md-center", children: /* @__PURE__ */ W.jsx(gc, { md: 8, sm: 12, lg: 12, children: /* @__PURE__ */ W.jsx(Yg, { children: /* @__PURE__ */ W.jsx(W0, { children: /* @__PURE__ */ W.jsx(cO, {}) }) }) }) }) }), fO = [
  { id: 1, sender: "Me", message: "Hey, how are you?", time: "10:30 AM" },
  { id: 2, sender: "John", message: "I am good, thanks!", time: "10:31 AM" },
  { id: 3, sender: "Me", message: "What’s up?", time: "10:32 AM" },
  {
    id: 4,
    sender: "John",
    message: "Just working on some stuff. You?",
    time: "10:33 AM"
  },
  {
    id: 5,
    sender: "Me",
    message: "Same here. Let’s catch up soon!",
    time: "10:34 AM"
  }
], pO = () => {
  const [e, t] = Yn(fO), [n, r] = Yn("");
  return /* @__PURE__ */ W.jsx(W.Fragment, { children: /* @__PURE__ */ W.jsx("div", { style: gO.chatContainer, children: /* @__PURE__ */ W.jsx(dO, {}) }) });
}, gO = {
  chatContainer: {
    display: "flex",
    flexDirection: "column",
    height: "100vh",
    backgroundColor: "#f1f1f1",
    fontFamily: "Arial, sans-serif",
    paddingTop: 50
  }
}, hO = Uv(pO, cn, Dv);
customElements.define("chat-screen", hO);

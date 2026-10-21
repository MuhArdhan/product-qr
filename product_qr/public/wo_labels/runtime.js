// @__NO_SIDE_EFFECTS__
function Xr(e) {
  const t = /* @__PURE__ */ Object.create(null);
  for (const r of e.split(",")) t[r] = 1;
  return (r) => r in t;
}
const oe = {}, Et = [], et = () => {
}, Oi = () => !1, Hn = (e) => e.charCodeAt(0) === 111 && e.charCodeAt(1) === 110 && // uppercase letter
(e.charCodeAt(2) > 122 || e.charCodeAt(2) < 97), jn = (e) => e.startsWith("onUpdate:"), ye = Object.assign, Zr = (e, t) => {
  const r = e.indexOf(t);
  r > -1 && e.splice(r, 1);
}, il = Object.prototype.hasOwnProperty, X = (e, t) => il.call(e, t), V = Array.isArray, bt = (e) => hn(e) === "[object Map]", Lt = (e) => hn(e) === "[object Set]", vo = (e) => hn(e) === "[object Date]", W = (e) => typeof e == "function", ae = (e) => typeof e == "string", tt = (e) => typeof e == "symbol", te = (e) => e !== null && typeof e == "object", Fi = (e) => (te(e) || W(e)) && W(e.then) && W(e.catch), Bi = Object.prototype.toString, hn = (e) => Bi.call(e), sl = (e) => hn(e).slice(8, -1), Di = (e) => hn(e) === "[object Object]", eo = (e) => ae(e) && e !== "NaN" && e[0] !== "-" && "" + parseInt(e, 10) === e, Yt = /* @__PURE__ */ Xr(
  // the leading comma is intentional so empty string "" is also included
  ",key,ref,ref_for,ref_key,onVnodeBeforeMount,onVnodeMounted,onVnodeBeforeUpdate,onVnodeUpdated,onVnodeBeforeUnmount,onVnodeUnmounted"
), Vn = (e) => {
  const t = /* @__PURE__ */ Object.create(null);
  return ((r) => t[r] || (t[r] = e(r)));
}, ll = /-\w/g, Ue = Vn(
  (e) => e.replace(ll, (t) => t.slice(1).toUpperCase())
), al = /\B([A-Z])/g, It = Vn(
  (e) => e.replace(al, "-$1").toLowerCase()
), qi = Vn((e) => e.charAt(0).toUpperCase() + e.slice(1)), rr = Vn(
  (e) => e ? `on${qi(e)}` : ""
), Ze = (e, t) => !Object.is(e, t), An = (e, ...t) => {
  for (let r = 0; r < e.length; r++)
    e[r](...t);
}, Ui = (e, t, r, n = !1) => {
  Object.defineProperty(e, t, {
    configurable: !0,
    enumerable: !1,
    writable: n,
    value: r
  });
}, zn = (e) => {
  const t = parseFloat(e);
  return isNaN(t) ? e : t;
};
let ko;
const Kn = () => ko || (ko = typeof globalThis < "u" ? globalThis : typeof self < "u" ? self : typeof window < "u" ? window : typeof global < "u" ? global : {});
function to(e) {
  if (V(e)) {
    const t = {};
    for (let r = 0; r < e.length; r++) {
      const n = e[r], i = ae(n) ? dl(n) : to(n);
      if (i)
        for (const a in i)
          t[a] = i[a];
    }
    return t;
  } else if (ae(e) || te(e))
    return e;
}
const ul = /;(?![^(]*\))/g, cl = /:([^]+)/, fl = /"(?:[^"\\]|\\[^])*"|'(?:[^'\\]|\\[^])*'|\\[^]|\/\*[^]*?\*\//g;
function dl(e) {
  const t = {};
  return e.replace(fl, (r) => r.startsWith("/*") ? "" : r).split(ul).forEach((r) => {
    if (r) {
      const n = r.split(cl);
      n.length > 1 && (t[n[0].trim()] = n[1].trim());
    }
  }), t;
}
function Wn(e) {
  let t = "";
  if (ae(e))
    t = e;
  else if (V(e))
    for (let r = 0; r < e.length; r++) {
      const n = Wn(e[r]);
      n && (t += n + " ");
    }
  else if (te(e))
    for (const r in e)
      e[r] && (t += r + " ");
  return t.trim();
}
const pl = "itemscope,allowfullscreen,formnovalidate,ismap,nomodule,novalidate,playsinline,readonly", hl = /* @__PURE__ */ Xr(pl);
function $i(e) {
  return !!e || e === "";
}
function gl(e, t, r) {
  if (e.length !== t.length) return !1;
  let n = !0;
  for (let i = 0; n && i < e.length; i++)
    n = wt(e[i], t[i], r);
  return n;
}
function _o(e, t, r) {
  if (e.size !== t.size) return !1;
  const n = Array.from(t), i = new Uint8Array(n.length);
  for (const a of e) {
    let o = -1;
    for (let s = 0; s < n.length; s++)
      if (!i[s] && wt(a, n[s], r)) {
        o = s;
        break;
      }
    if (o < 0) return !1;
    i[o] = 1;
  }
  return !0;
}
function ml(e, t, r) {
  let n = bt(e), i = bt(t);
  if (n || i || (n = Lt(e), i = Lt(t), n || i))
    return n && i ? _o(e, t, r) : !1;
  const a = Object.keys(e).length, o = Object.keys(t).length;
  if (a !== o)
    return !1;
  for (const s in e) {
    const l = e.hasOwnProperty(s), u = t.hasOwnProperty(s);
    if (l && !u || !l && u || !wt(e[s], t[s], r))
      return !1;
  }
  return String(e) === String(t);
}
function Co(e, t, r, n) {
  r || (r = [/* @__PURE__ */ new Map(), /* @__PURE__ */ new Map()]);
  const [i, a] = r;
  if (i.has(e) || a.has(t))
    return i.get(e) === t && a.get(t) === e;
  i.set(e, t), a.set(t, e);
  const o = n(e, t, r);
  return i.delete(e), a.delete(t), o;
}
function wt(e, t, r) {
  if (e === t) return !0;
  let n = vo(e), i = vo(t);
  return n || i ? n && i ? e.getTime() === t.getTime() : !1 : (n = tt(e), i = tt(t), n || i ? e === t : (n = V(e), i = V(t), n || i ? n && i ? Co(e, t, r, gl) : !1 : (n = te(e), i = te(t), n || i ? !n || !i ? !1 : Co(e, t, r, ml) : String(e) === String(t))));
}
function bl(e, t) {
  return e.findIndex((r) => wt(r, t));
}
const Hi = (e) => !!(e && e.__v_isRef === !0), Y = (e) => ae(e) ? e : e == null ? "" : V(e) || te(e) && (e.toString === Bi || !W(e.toString)) ? Hi(e) ? Y(e.value) : JSON.stringify(e, ji, 2) : String(e), ji = (e, t) => Hi(t) ? ji(e, t.value) : bt(t) ? {
  [`Map(${t.size})`]: [...t.entries()].reduce(
    (r, [n, i], a) => (r[or(n, a) + " =>"] = i, r),
    {}
  )
} : Lt(t) ? {
  [`Set(${t.size})`]: [...t.values()].map((r) => or(r))
} : tt(t) ? or(t) : te(t) && !V(t) && !Di(t) ? String(t) : t, or = (e, t = "") => {
  var r;
  return (
    // Symbol.description in es2019+ so we need to cast here to pass
    // the lib: es2016 check
    tt(e) ? `Symbol(${(r = e.description) != null ? r : t})` : e
  );
};
let he;
class yl {
  // TODO isolatedDeclarations "__v_skip"
  constructor(t = !1) {
    this.detached = t, this._active = !0, this._on = 0, this.effects = [], this.cleanups = [], this._isPaused = !1, this._warnOnRun = !0, this.__v_skip = !0, !t && he && (he.active ? (this.parent = he, this.index = (he.scopes || (he.scopes = [])).push(
      this
    ) - 1) : (this._active = !1, this._warnOnRun = !1));
  }
  get active() {
    return this._active;
  }
  pause() {
    if (this._active) {
      this._isPaused = !0;
      let t, r;
      if (this.scopes) {
        const n = this.scopes.slice();
        for (t = 0, r = n.length; t < r; t++)
          n[t].pause();
      }
      for (t = 0, r = this.effects.length; t < r; t++)
        this.effects[t].pause();
    }
  }
  /**
   * Resumes the effect scope, including all child scopes and effects.
   */
  resume() {
    if (this._active && this._isPaused) {
      this._isPaused = !1;
      let t, r;
      if (this.scopes) {
        const i = this.scopes.slice();
        for (t = 0, r = i.length; t < r; t++)
          i[t].resume();
      }
      const n = this.effects.slice();
      for (t = 0, r = n.length; t < r; t++)
        n[t].resume();
    }
  }
  run(t) {
    if (this._active) {
      const r = he;
      try {
        return he = this, t();
      } finally {
        he = r;
      }
    }
  }
  /**
   * This should only be called on non-detached scopes
   * @internal
   */
  on() {
    ++this._on === 1 && (this.prevScope = he, he = this);
  }
  /**
   * This should only be called on non-detached scopes
   * @internal
   */
  off() {
    if (this._on > 0 && --this._on === 0) {
      if (he === this)
        he = this.prevScope;
      else {
        let t = he;
        for (; t; ) {
          if (t.prevScope === this) {
            t.prevScope = this.prevScope;
            break;
          }
          t = t.prevScope;
        }
      }
      this.prevScope = void 0;
    }
  }
  stop(t) {
    if (this._active) {
      this._active = !1;
      let r, n;
      for (r = 0, n = this.effects.length; r < n; r++)
        this.effects[r].stop();
      for (this.effects.length = 0, r = 0, n = this.cleanups.length; r < n; r++)
        this.cleanups[r]();
      if (this.cleanups.length = 0, this.scopes) {
        const i = this.scopes.slice();
        for (r = 0, n = i.length; r < n; r++)
          i[r].stop(!0);
        this.scopes.length = 0;
      }
      if (!this.detached && this.parent && !t) {
        const i = this.parent.scopes.pop();
        i && i !== this && (this.parent.scopes[this.index] = i, i.index = this.index);
      }
      this.parent = void 0;
    }
  }
}
function wl() {
  return he;
}
let ie;
const ir = /* @__PURE__ */ new WeakSet();
class Vi {
  constructor(t) {
    this.fn = t, this.deps = void 0, this.depsTail = void 0, this.flags = 5, this.next = void 0, this.cleanup = void 0, this.scheduler = void 0, he && (he.active ? he.effects.push(this) : this.flags &= -2);
  }
  pause() {
    this.flags |= 64;
  }
  resume() {
    this.flags & 64 && (this.flags &= -65, ir.has(this) && (ir.delete(this), this.trigger()));
  }
  /**
   * @internal
   */
  notify() {
    this.flags & 2 && !(this.flags & 32) || this.flags & 8 || Ki(this);
  }
  run() {
    if (!(this.flags & 1))
      return this.fn();
    this.flags |= 2, So(this), Wi(this);
    const t = ie, r = $e;
    ie = this, $e = !0;
    try {
      return this.fn();
    } finally {
      Ji(this), ie = t, $e = r, this.flags &= -3;
    }
  }
  stop() {
    if (this.flags & 1) {
      for (let t = this.deps; t; t = t.nextDep)
        oo(t);
      this.deps = this.depsTail = void 0, So(this), this.onStop && this.onStop(), this.flags &= -2;
    }
  }
  trigger() {
    this.flags & 64 ? ir.add(this) : this.scheduler ? this.scheduler() : this.runIfDirty();
  }
  /**
   * @internal
   */
  runIfDirty() {
    Ur(this) && this.run();
  }
  get dirty() {
    return Ur(this);
  }
}
let zi = 0, Xt, Zt;
function Ki(e, t = !1) {
  if (e.flags |= 8, t) {
    e.next = Zt, Zt = e;
    return;
  }
  e.next = Xt, Xt = e;
}
function no() {
  zi++;
}
function ro() {
  if (--zi > 0)
    return;
  if (Zt) {
    let t = Zt;
    for (Zt = void 0; t; ) {
      const r = t.next;
      t.next = void 0, t.flags &= -9, t = r;
    }
  }
  let e;
  for (; Xt; ) {
    let t = Xt;
    for (Xt = void 0; t; ) {
      const r = t.next;
      if (t.next = void 0, t.flags &= -9, t.flags & 1)
        try {
          t.trigger();
        } catch (n) {
          e || (e = n);
        }
      t = r;
    }
  }
  if (e) throw e;
}
function Wi(e) {
  for (let t = e.deps; t; t = t.nextDep)
    t.version = -1, t.prevActiveLink = t.dep.activeLink, t.dep.activeLink = t;
}
function Ji(e) {
  let t, r = e.depsTail, n = r;
  for (; n; ) {
    const i = n.prevDep;
    n.version === -1 ? (n === r && (r = i), oo(n), vl(n)) : t = n, n.dep.activeLink = n.prevActiveLink, n.prevActiveLink = void 0, n = i;
  }
  e.deps = t, e.depsTail = r;
}
function Ur(e) {
  for (let t = e.deps; t; t = t.nextDep)
    if (t.dep.version !== t.version || t.dep.computed && (Gi(t.dep.computed) || t.dep.version !== t.version))
      return !0;
  return !!e._dirty;
}
function Gi(e) {
  if (e.flags & 4 && !(e.flags & 16) || (e.flags &= -17, e.globalVersion === sn) || (e.globalVersion = sn, !e.isSSR && e.flags & 128 && (!e.deps && !e._dirty || !Ur(e))))
    return;
  e.flags |= 2;
  const t = e.dep, r = ie, n = $e;
  ie = e, $e = !0;
  try {
    Wi(e);
    const i = e.fn(e._value);
    (t.version === 0 || Ze(i, e._value)) && (e.flags |= 128, e._value = i, t.version++);
  } catch (i) {
    throw t.version++, i;
  } finally {
    ie = r, $e = n, Ji(e), e.flags &= -3;
  }
}
function oo(e, t = !1) {
  const { dep: r, prevSub: n, nextSub: i } = e;
  if (n && (n.nextSub = i, e.prevSub = void 0), i && (i.prevSub = n, e.nextSub = void 0), r.subs === e && (r.subs = n, !n && r.computed)) {
    r.computed.flags &= -5;
    for (let a = r.computed.deps; a; a = a.nextDep)
      oo(a, !0);
  }
  !t && !--r.sc && r.map && r.map.delete(r.key);
}
function vl(e) {
  const { prevDep: t, nextDep: r } = e;
  t && (t.nextDep = r, e.prevDep = void 0), r && (r.prevDep = t, e.nextDep = void 0);
}
let $e = !0;
const Qi = [];
function nt() {
  Qi.push($e), $e = !1;
}
function rt() {
  const e = Qi.pop();
  $e = e === void 0 ? !0 : e;
}
function So(e) {
  const { cleanup: t } = e;
  if (e.cleanup = void 0, t) {
    const r = ie;
    ie = void 0;
    try {
      t();
    } finally {
      ie = r;
    }
  }
}
let sn = 0;
class kl {
  constructor(t, r) {
    this.sub = t, this.dep = r, this.version = r.version, this.nextDep = this.prevDep = this.nextSub = this.prevSub = this.prevActiveLink = void 0;
  }
}
class io {
  // TODO isolatedDeclarations "__v_skip"
  constructor(t) {
    this.computed = t, this.version = 0, this.activeLink = void 0, this.subs = void 0, this.map = void 0, this.key = void 0, this.sc = 0, this.__v_skip = !0;
  }
  track(t) {
    if (!ie || !$e || ie === this.computed)
      return;
    let r = this.activeLink;
    if (r === void 0 || r.sub !== ie)
      r = this.activeLink = new kl(ie, this), ie.deps ? (r.prevDep = ie.depsTail, ie.depsTail.nextDep = r, ie.depsTail = r) : ie.deps = ie.depsTail = r, Yi(r);
    else if (r.version === -1 && (r.version = this.version, r.nextDep)) {
      const n = r.nextDep;
      n.prevDep = r.prevDep, r.prevDep && (r.prevDep.nextDep = n), r.prevDep = ie.depsTail, r.nextDep = void 0, ie.depsTail.nextDep = r, ie.depsTail = r, ie.deps === r && (ie.deps = n);
    }
    return r;
  }
  trigger(t) {
    this.version++, sn++, this.notify(t);
  }
  notify(t) {
    no();
    try {
      for (let r = this.subs; r; r = r.prevSub)
        r.sub.notify() && r.sub.dep.notify();
    } finally {
      ro();
    }
  }
}
function Yi(e) {
  if (e.dep.sc++, e.sub.flags & 4) {
    const t = e.dep.computed;
    if (t && !e.dep.subs) {
      t.flags |= 20;
      for (let n = t.deps; n; n = n.nextDep)
        Yi(n);
    }
    const r = e.dep.subs;
    r !== e && (e.prevSub = r, r && (r.nextSub = e)), e.dep.subs = e;
  }
}
const $r = /* @__PURE__ */ new WeakMap(), Tt = /* @__PURE__ */ Symbol(
  ""
), Hr = /* @__PURE__ */ Symbol(
  ""
), ln = /* @__PURE__ */ Symbol(
  ""
);
function me(e, t, r) {
  if ($e && ie) {
    let n = $r.get(e);
    n || $r.set(e, n = /* @__PURE__ */ new Map());
    let i = n.get(r);
    i || (n.set(r, i = new io()), i.map = n, i.key = r), i.track();
  }
}
function ut(e, t, r, n, i, a) {
  const o = $r.get(e);
  if (!o) {
    sn++;
    return;
  }
  const s = (l) => {
    l && l.trigger();
  };
  if (no(), t === "clear")
    o.forEach(s);
  else {
    const l = V(e), u = l && eo(r);
    if (l && r === "length") {
      const c = Number(n);
      o.forEach((d, h) => {
        (h === "length" || h === ln || !tt(h) && h >= c) && s(d);
      });
    } else
      switch ((r !== void 0 || o.has(void 0)) && s(o.get(r)), u && s(o.get(ln)), t) {
        case "add":
          l ? u && s(o.get("length")) : (s(o.get(Tt)), bt(e) && s(o.get(Hr)));
          break;
        case "delete":
          l || (s(o.get(Tt)), bt(e) && s(o.get(Hr)));
          break;
        case "set":
          bt(e) && s(o.get(Tt));
          break;
      }
  }
  ro();
}
function Ft(e) {
  const t = /* @__PURE__ */ Z(e);
  return t === e || (me(t, "iterate", ln), /* @__PURE__ */ Oe(e)) ? t : /* @__PURE__ */ ot(e) ? /* @__PURE__ */ yt(e) ? t.map((r) => vt(Fe(r))) : t.map(vt) : t.map(Fe);
}
function Jn(e) {
  return me(e = /* @__PURE__ */ Z(e), "iterate", ln), e;
}
function Qe(e, t) {
  return /* @__PURE__ */ ot(e) ? vt(/* @__PURE__ */ yt(e) ? Fe(t) : t) : Fe(t);
}
const _l = {
  __proto__: null,
  [Symbol.iterator]() {
    return sr(this, Symbol.iterator, (e) => Qe(this, e));
  },
  concat(...e) {
    return Ft(this).concat(
      ...e.map((t) => V(t) ? Ft(t) : t)
    );
  },
  entries() {
    return sr(this, "entries", (e) => (e[1] = Qe(this, e[1]), e));
  },
  every(e, t) {
    return st(this, "every", e, t, void 0, arguments);
  },
  filter(e, t) {
    return st(
      this,
      "filter",
      e,
      t,
      (r) => r.map((n) => Qe(this, n)),
      arguments
    );
  },
  find(e, t) {
    return st(
      this,
      "find",
      e,
      t,
      (r) => Qe(this, r),
      arguments
    );
  },
  findIndex(e, t) {
    return st(this, "findIndex", e, t, void 0, arguments);
  },
  findLast(e, t) {
    return st(
      this,
      "findLast",
      e,
      t,
      (r) => Qe(this, r),
      arguments
    );
  },
  findLastIndex(e, t) {
    return st(this, "findLastIndex", e, t, void 0, arguments);
  },
  // flat, flatMap could benefit from ARRAY_ITERATE but are not straight-forward to implement
  forEach(e, t) {
    return st(this, "forEach", e, t, void 0, arguments);
  },
  includes(...e) {
    return lr(this, "includes", e);
  },
  indexOf(...e) {
    return lr(this, "indexOf", e);
  },
  join(e) {
    return Ft(this).join(e);
  },
  // keys() iterator only reads `length`, no optimization required
  lastIndexOf(...e) {
    return lr(this, "lastIndexOf", e);
  },
  map(e, t) {
    return st(this, "map", e, t, void 0, arguments);
  },
  pop() {
    return Vt(this, "pop");
  },
  push(...e) {
    return Vt(this, "push", e);
  },
  reduce(e, ...t) {
    return Ao(this, "reduce", e, t);
  },
  reduceRight(e, ...t) {
    return Ao(this, "reduceRight", e, t);
  },
  shift() {
    return Vt(this, "shift");
  },
  // slice could use ARRAY_ITERATE but also seems to beg for range tracking
  some(e, t) {
    return st(this, "some", e, t, void 0, arguments);
  },
  splice(...e) {
    return Vt(this, "splice", e);
  },
  toReversed() {
    return Ft(this).toReversed();
  },
  toSorted(e) {
    return Ft(this).toSorted(e);
  },
  toSpliced(...e) {
    return Ft(this).toSpliced(...e);
  },
  unshift(...e) {
    return Vt(this, "unshift", e);
  },
  values() {
    return sr(this, "values", (e) => Qe(this, e));
  }
};
function sr(e, t, r) {
  const n = Jn(e), i = n[t], a = i.call(n);
  if (n !== e && !/* @__PURE__ */ Oe(e)) {
    if (a[Symbol.toStringTag] === "Array Iterator") {
      const o = Object.create(Object.getPrototypeOf(a));
      return o.next = () => xo(a.next(), r), i !== Xi[t] && Object.defineProperties(o, {
        return: {
          get() {
            const s = a.return;
            return typeof s == "function" ? s.bind(a) : s;
          }
        },
        throw: {
          get() {
            const s = a.throw;
            return typeof s == "function" ? s.bind(a) : s;
          }
        }
      }), o;
    }
    a._next = a.next, a.next = () => xo(a._next(), r);
  }
  return a;
}
function xo(e, t) {
  return e.done || (e.value = t(e.value)), e;
}
const Xi = Array.prototype;
function st(e, t, r, n, i, a) {
  const o = Jn(e), s = o !== e && !/* @__PURE__ */ Oe(e), l = o[t];
  if (l !== Xi[t]) {
    const d = l.apply(e, a);
    return s ? Fe(d) : d;
  }
  let u = r;
  o !== e && (s ? u = function(d, h) {
    return r.call(this, Qe(e, d), h, e);
  } : r.length > 2 && (u = function(d, h) {
    return r.call(this, d, h, e);
  }));
  const c = l.call(o, u, n);
  return s && i ? i(c) : c;
}
function Ao(e, t, r, n) {
  const i = Jn(e), a = i !== e && !/* @__PURE__ */ Oe(e);
  let o = r, s = !1;
  i !== e && (a ? (s = n.length === 0, o = function(u, c, d) {
    return s && (s = !1, u = Qe(e, u)), r.call(this, u, Qe(e, c), d, e);
  }) : r.length > 3 && (o = function(u, c, d) {
    return r.call(this, u, c, d, e);
  }));
  const l = i[t](o, ...n);
  return s ? Qe(e, l) : l;
}
function lr(e, t, r) {
  const n = /* @__PURE__ */ Z(e);
  me(n, "iterate", ln);
  const i = n[t](...r);
  return (i === -1 || i === !1) && /* @__PURE__ */ ao(r[0]) ? (r[0] = /* @__PURE__ */ Z(r[0]), n[t](...r)) : i;
}
function Vt(e, t, r = []) {
  nt(), no();
  const n = (/* @__PURE__ */ Z(e))[t].apply(e, r);
  return ro(), rt(), n;
}
const Cl = /* @__PURE__ */ Xr("__proto__,__v_isRef,__isVue"), Zi = new Set(
  /* @__PURE__ */ Object.getOwnPropertyNames(Symbol).filter((e) => e !== "arguments" && e !== "caller").map((e) => Symbol[e]).filter(tt)
);
function Sl(e) {
  tt(e) || (e = String(e));
  const t = /* @__PURE__ */ Z(this);
  return me(t, "has", e), t.hasOwnProperty(e);
}
class es {
  constructor(t = !1, r = !1) {
    this._isReadonly = t, this._isShallow = r;
  }
  get(t, r, n) {
    if (r === "__v_skip") return t.__v_skip;
    const i = this._isReadonly, a = this._isShallow;
    if (r === "__v_isReactive")
      return !i;
    if (r === "__v_isReadonly")
      return i;
    if (r === "__v_isShallow")
      return a;
    if (r === "__v_raw")
      return n === (i ? a ? Nl : os : a ? rs : ns).get(t) || // receiver is not the reactive proxy, but has the same prototype
      // this means the receiver is a user proxy of the reactive proxy
      Object.getPrototypeOf(t) === Object.getPrototypeOf(n) ? t : void 0;
    const o = V(t);
    if (!i) {
      let l;
      if (o && (l = _l[r]))
        return l;
      if (r === "hasOwnProperty")
        return Sl;
    }
    const s = Reflect.get(
      t,
      r,
      // if this is a proxy wrapping a ref, return methods using the raw ref
      // as receiver so that we don't have to call `toRaw` on the ref in all
      // its class methods
      /* @__PURE__ */ be(t) ? t : n
    );
    if ((tt(r) ? Zi.has(r) : Cl(r)) || (i || me(t, "get", r), a))
      return s;
    if (/* @__PURE__ */ be(s)) {
      const l = o && eo(r) ? s : s.value;
      return i && te(l) ? /* @__PURE__ */ Vr(l) : l;
    }
    return te(s) ? i ? /* @__PURE__ */ Vr(s) : /* @__PURE__ */ Gn(s) : s;
  }
}
class ts extends es {
  constructor(t = !1) {
    super(!1, t);
  }
  set(t, r, n, i) {
    let a = t[r];
    const o = V(t) && eo(r);
    if (!this._isShallow) {
      const u = /* @__PURE__ */ ot(a);
      if (!/* @__PURE__ */ Oe(n) && !/* @__PURE__ */ ot(n) && (a = /* @__PURE__ */ Z(a), n = /* @__PURE__ */ Z(n)), !o && /* @__PURE__ */ be(a) && !/* @__PURE__ */ be(n))
        return u || (a.value = n), !0;
    }
    const s = o ? Number(r) < t.length : X(t, r), l = Reflect.set(
      t,
      r,
      n,
      /* @__PURE__ */ be(t) ? t : i
    );
    return t === /* @__PURE__ */ Z(i) && l && (s ? Ze(n, a) && ut(t, "set", r, n) : ut(t, "add", r, n)), l;
  }
  deleteProperty(t, r) {
    const n = X(t, r);
    t[r];
    const i = Reflect.deleteProperty(t, r);
    return i && n && ut(t, "delete", r, void 0), i;
  }
  has(t, r) {
    const n = Reflect.has(t, r);
    return (!tt(r) || !Zi.has(r)) && me(t, "has", r), n;
  }
  ownKeys(t) {
    return me(
      t,
      "iterate",
      V(t) ? "length" : Tt
    ), Reflect.ownKeys(t);
  }
}
class xl extends es {
  constructor(t = !1) {
    super(!0, t);
  }
  set(t, r) {
    return !0;
  }
  deleteProperty(t, r) {
    return !0;
  }
}
const Al = /* @__PURE__ */ new ts(), El = /* @__PURE__ */ new xl(), Pl = /* @__PURE__ */ new ts(!0);
const jr = (e) => e, wn = (e) => Reflect.getPrototypeOf(e);
function Tl(e, t, r) {
  return function(...n) {
    const i = this.__v_raw, a = /* @__PURE__ */ Z(i), o = bt(a), s = e === "entries" || e === Symbol.iterator && o, l = e === "keys" && o, u = i[e](...n), c = r ? jr : t ? vt : Fe;
    return !t && me(
      a,
      "iterate",
      l ? Hr : Tt
    ), ye(
      // inheriting all iterator properties
      Object.create(u),
      {
        // iterator protocol
        next() {
          const { value: d, done: h } = u.next();
          return h ? { value: d, done: h } : {
            value: s ? [c(d[0]), c(d[1])] : c(d),
            done: h
          };
        }
      }
    );
  };
}
function vn(e) {
  return function(...t) {
    return e === "delete" ? !1 : e === "clear" ? void 0 : this;
  };
}
function Ml(e, t) {
  const r = {
    get(i) {
      const a = this.__v_raw, o = /* @__PURE__ */ Z(a), s = /* @__PURE__ */ Z(i);
      e || (Ze(i, s) && me(o, "get", i), me(o, "get", s));
      const { has: l } = wn(o), u = t ? jr : e ? vt : Fe;
      if (l.call(o, i))
        return u(a.get(i));
      if (l.call(o, s))
        return u(a.get(s));
      a !== o && a.get(i);
    },
    get size() {
      const i = this.__v_raw;
      return !e && me(/* @__PURE__ */ Z(i), "iterate", Tt), i.size;
    },
    has(i) {
      const a = this.__v_raw, o = /* @__PURE__ */ Z(a), s = /* @__PURE__ */ Z(i);
      return e || (Ze(i, s) && me(o, "has", i), me(o, "has", s)), i === s ? a.has(i) : a.has(i) || a.has(s);
    },
    forEach(i, a) {
      const o = this, s = o.__v_raw, l = /* @__PURE__ */ Z(s), u = t ? jr : e ? vt : Fe;
      return !e && me(l, "iterate", Tt), s.forEach((c, d) => i.call(a, u(c), u(d), o));
    }
  };
  return ye(
    r,
    e ? {
      add: vn("add"),
      set: vn("set"),
      delete: vn("delete"),
      clear: vn("clear")
    } : {
      add(i) {
        const a = /* @__PURE__ */ Z(this), o = wn(a), s = /* @__PURE__ */ Z(i), l = !t && !/* @__PURE__ */ Oe(i) && !/* @__PURE__ */ ot(i) ? s : i;
        return o.has.call(a, l) || Ze(i, l) && o.has.call(a, i) || Ze(s, l) && o.has.call(a, s) || (a.add(l), ut(a, "add", l, l)), this;
      },
      set(i, a) {
        !t && !/* @__PURE__ */ Oe(a) && !/* @__PURE__ */ ot(a) && (a = /* @__PURE__ */ Z(a));
        const o = /* @__PURE__ */ Z(this), { has: s, get: l } = wn(o);
        let u = s.call(o, i);
        u || (i = /* @__PURE__ */ Z(i), u = s.call(o, i));
        const c = l.call(o, i);
        return o.set(i, a), u ? Ze(a, c) && ut(o, "set", i, a) : ut(o, "add", i, a), this;
      },
      delete(i) {
        const a = /* @__PURE__ */ Z(this), { has: o, get: s } = wn(a);
        let l = o.call(a, i);
        l || (i = /* @__PURE__ */ Z(i), l = o.call(a, i)), s && s.call(a, i);
        const u = a.delete(i);
        return l && ut(a, "delete", i, void 0), u;
      },
      clear() {
        const i = /* @__PURE__ */ Z(this), a = i.size !== 0, o = i.clear();
        return a && ut(
          i,
          "clear",
          void 0,
          void 0
        ), o;
      }
    }
  ), [
    "keys",
    "values",
    "entries",
    Symbol.iterator
  ].forEach((i) => {
    r[i] = Tl(i, e, t);
  }), r;
}
function so(e, t) {
  const r = Ml(e, t);
  return (n, i, a) => i === "__v_isReactive" ? !e : i === "__v_isReadonly" ? e : i === "__v_isShallow" ? t : i === "__v_raw" ? n : Reflect.get(
    X(r, i) && i in n ? r : n,
    i,
    a
  );
}
const Ll = {
  get: /* @__PURE__ */ so(!1, !1)
}, Il = {
  get: /* @__PURE__ */ so(!1, !0)
}, Rl = {
  get: /* @__PURE__ */ so(!0, !1)
};
const ns = /* @__PURE__ */ new WeakMap(), rs = /* @__PURE__ */ new WeakMap(), os = /* @__PURE__ */ new WeakMap(), Nl = /* @__PURE__ */ new WeakMap();
function Ol(e) {
  switch (e) {
    case "Object":
    case "Array":
      return 1;
    case "Map":
    case "Set":
    case "WeakMap":
    case "WeakSet":
      return 2;
    default:
      return 0;
  }
}
// @__NO_SIDE_EFFECTS__
function Gn(e) {
  return /* @__PURE__ */ ot(e) ? e : lo(
    e,
    !1,
    Al,
    Ll,
    ns
  );
}
// @__NO_SIDE_EFFECTS__
function is(e) {
  return lo(
    e,
    !1,
    Pl,
    Il,
    rs
  );
}
// @__NO_SIDE_EFFECTS__
function Vr(e) {
  return lo(
    e,
    !0,
    El,
    Rl,
    os
  );
}
function lo(e, t, r, n, i) {
  if (!te(e) || e.__v_raw && !(t && e.__v_isReactive) || e.__v_skip || !Object.isExtensible(e))
    return e;
  const a = i.get(e);
  if (a)
    return a;
  const o = Ol(sl(e));
  if (o === 0)
    return e;
  const s = new Proxy(
    e,
    o === 2 ? n : r
  );
  return i.set(e, s), s;
}
// @__NO_SIDE_EFFECTS__
function yt(e) {
  return /* @__PURE__ */ ot(e) ? /* @__PURE__ */ yt(e.__v_raw) : !!(e && e.__v_isReactive);
}
// @__NO_SIDE_EFFECTS__
function ot(e) {
  return !!(e && e.__v_isReadonly);
}
// @__NO_SIDE_EFFECTS__
function Oe(e) {
  return !!(e && e.__v_isShallow);
}
// @__NO_SIDE_EFFECTS__
function ao(e) {
  return e ? !!e.__v_raw : !1;
}
// @__NO_SIDE_EFFECTS__
function Z(e) {
  const t = e && e.__v_raw;
  return t ? /* @__PURE__ */ Z(t) : e;
}
function Fl(e) {
  return !X(e, "__v_skip") && Object.isExtensible(e) && Ui(e, "__v_skip", !0), e;
}
const Fe = (e) => te(e) ? /* @__PURE__ */ Gn(e) : e, vt = (e) => te(e) ? /* @__PURE__ */ Vr(e) : e;
// @__NO_SIDE_EFFECTS__
function be(e) {
  return e ? e.__v_isRef === !0 : !1;
}
// @__NO_SIDE_EFFECTS__
function le(e) {
  return Bl(e, !1);
}
function Bl(e, t) {
  return /* @__PURE__ */ be(e) ? e : new Dl(e, t);
}
class Dl {
  constructor(t, r) {
    this.dep = new io(), this.__v_isRef = !0, this.__v_isShallow = !1, this._rawValue = r ? t : /* @__PURE__ */ Z(t), this._value = r ? t : Fe(t), this.__v_isShallow = r;
  }
  get value() {
    return this.dep.track(), this._value;
  }
  set value(t) {
    const r = this._rawValue, n = this.__v_isShallow || /* @__PURE__ */ Oe(t) || /* @__PURE__ */ ot(t);
    t = n ? t : /* @__PURE__ */ Z(t), Ze(t, r) && (this._rawValue = t, this._value = n ? t : Fe(t), this.dep.trigger());
  }
}
function fe(e) {
  return /* @__PURE__ */ be(e) ? e.value : e;
}
const ql = {
  get: (e, t, r) => t === "__v_raw" ? e : fe(Reflect.get(e, t, r)),
  set: (e, t, r, n) => {
    const i = e[t];
    return /* @__PURE__ */ be(i) && !/* @__PURE__ */ be(r) ? (i.value = r, !0) : Reflect.set(e, t, r, n);
  }
};
function ss(e) {
  return /* @__PURE__ */ yt(e) ? e : new Proxy(e, ql);
}
class Ul {
  constructor(t, r, n) {
    this.fn = t, this.setter = r, this._value = void 0, this.dep = new io(this), this.__v_isRef = !0, this.deps = void 0, this.depsTail = void 0, this.flags = 16, this.globalVersion = sn - 1, this.next = void 0, this.effect = this, this.__v_isReadonly = !r, this.isSSR = n;
  }
  /**
   * @internal
   */
  notify() {
    if (this.flags |= 16, !(this.flags & 8) && // avoid infinite self recursion
    ie !== this)
      return Ki(this, !0), !0;
  }
  get value() {
    const t = this.dep.track();
    return Gi(this), t && (t.version = this.dep.version), this._value;
  }
  set value(t) {
    this.setter && this.setter(t);
  }
}
// @__NO_SIDE_EFFECTS__
function $l(e, t, r = !1) {
  let n, i;
  return W(e) ? n = e : (n = e.get, i = e.set), new Ul(n, i, r);
}
const kn = {}, Tn = /* @__PURE__ */ new WeakMap();
let St;
function Hl(e, t = !1, r = St) {
  if (r) {
    let n = Tn.get(r);
    n || Tn.set(r, n = []), n.push(e);
  }
}
function jl(e, t, r = oe) {
  const { immediate: n, deep: i, once: a, scheduler: o, augmentJob: s, call: l } = r, u = (k) => i ? k : /* @__PURE__ */ Oe(k) || i === !1 || i === 0 ? ct(k, 1) : ct(k);
  let c, d, h, g, E = !1, w = !1;
  if (/* @__PURE__ */ be(e) ? (d = () => e.value, E = /* @__PURE__ */ Oe(e)) : /* @__PURE__ */ yt(e) ? (d = () => u(e), E = !0) : V(e) ? (w = !0, E = e.some((k) => /* @__PURE__ */ yt(k) || /* @__PURE__ */ Oe(k)), d = () => e.map((k) => {
    if (/* @__PURE__ */ be(k))
      return k.value;
    if (/* @__PURE__ */ yt(k))
      return u(k);
    if (W(k))
      return l ? l(k, 2) : k();
  })) : W(e) ? t ? d = l ? () => l(e, 2) : e : d = () => {
    if (h) {
      nt();
      try {
        h();
      } finally {
        rt();
      }
    }
    const k = St;
    St = c;
    try {
      return l ? l(e, 3, [g]) : e(g);
    } finally {
      St = k;
    }
  } : d = et, t && i) {
    const k = d, D = i === !0 ? 1 / 0 : i;
    d = () => ct(k(), D);
  }
  const q = wl(), M = () => {
    c.stop(), q && q.active && Zr(q.effects, c);
  };
  if (a && t) {
    const k = t;
    t = (...D) => {
      try {
        return k(...D);
      } finally {
        M();
      }
    };
  }
  let A = w ? new Array(e.length).fill(kn) : kn;
  const P = (k) => {
    if (!(!(c.flags & 1) || !c.dirty && !k))
      if (t) {
        const D = c.run();
        if (k || i || E || (w ? D.some((y, b) => Ze(y, A[b])) : Ze(D, A))) {
          const y = St;
          nt();
          try {
            h && h(), St = c;
            const b = [
              D,
              // pass undefined as the old value when it's changed for the first time
              A === kn ? void 0 : w && A[0] === kn ? [] : A,
              g
            ];
            A = D, l ? l(t, 3, b) : (
              // @ts-expect-error
              t(...b)
            );
          } finally {
            St = y, rt();
          }
        }
      } else
        c.run();
  };
  return s && s(P), c = new Vi(d), c.scheduler = o ? () => o(P, !1) : P, g = (k) => Hl(k, !1, c), h = c.onStop = () => {
    const k = Tn.get(c);
    if (k) {
      if (l)
        l(k, 4);
      else
        for (const D of k) D();
      Tn.delete(c);
    }
  }, t ? n ? P(!0) : A = c.run() : o ? o(P.bind(null, !0), !0) : c.run(), M.pause = c.pause.bind(c), M.resume = c.resume.bind(c), M.stop = M, M;
}
function ct(e, t = 1 / 0, r) {
  if (t <= 0 || !te(e) || e.__v_skip || (r = r || /* @__PURE__ */ new Map(), (r.get(e) || 0) >= t))
    return e;
  if (r.set(e, t), t--, /* @__PURE__ */ be(e))
    ct(e.value, t, r);
  else if (V(e))
    for (let n = 0; n < e.length; n++)
      ct(e[n], t, r);
  else if (Lt(e) || bt(e))
    e.forEach((n) => {
      ct(n, t, r);
    });
  else if (Di(e)) {
    for (const n in e)
      ct(e[n], t, r);
    for (const n of Object.getOwnPropertySymbols(e))
      Object.prototype.propertyIsEnumerable.call(e, n) && ct(e[n], t, r);
  }
  return e;
}
function gn(e, t, r, n) {
  try {
    return n ? e(...n) : e();
  } catch (i) {
    Qn(i, t, r);
  }
}
function He(e, t, r, n) {
  if (W(e)) {
    const i = gn(e, t, r, n);
    return i && Fi(i) && i.catch((a) => {
      Qn(a, t, r);
    }), i;
  }
  if (V(e)) {
    const i = [];
    for (let a = 0; a < e.length; a++)
      i.push(He(e[a], t, r, n));
    return i;
  }
}
function Qn(e, t, r, n = !0) {
  const i = t ? t.vnode : null, { errorHandler: a, throwUnhandledErrorInProduction: o } = t && t.appContext.config || oe;
  if (t) {
    let s = t.parent;
    const l = t.proxy, u = `https://vuejs.org/error-reference/#runtime-${r}`;
    for (; s; ) {
      const c = s.ec;
      if (c) {
        for (let d = 0; d < c.length; d++)
          if (c[d](e, l, u) === !1)
            return;
      }
      s = s.parent;
    }
    if (a) {
      nt(), gn(a, null, 10, [
        e,
        l,
        u
      ]), rt();
      return;
    }
  }
  Vl(e, r, i, n, o);
}
function Vl(e, t, r, n = !0, i = !1) {
  if (i)
    throw e;
  console.error(e);
}
const ve = [];
let qe = -1;
const Ye = [];
let mt = null, Dt = 0;
const ls = /* @__PURE__ */ Promise.resolve();
let Mn = null;
function Ln(e) {
  const t = Mn || ls;
  return e ? t.then(this ? e.bind(this) : e) : t;
}
function zl(e) {
  let t = qe + 1, r = ve.length;
  for (; t < r; ) {
    const n = t + r >>> 1, i = ve[n], a = an(i);
    a < e || a === e && i.flags & 2 ? t = n + 1 : r = n;
  }
  return t;
}
function uo(e) {
  if (!(e.flags & 1)) {
    const t = an(e), r = ve[ve.length - 1];
    !r || // fast path when the job id is larger than the tail
    !(e.flags & 2) && t >= an(r) ? ve.push(e) : ve.splice(zl(t), 0, e), e.flags |= 1, as();
  }
}
function as() {
  Mn || (Mn = ls.then(fs));
}
function Kl(e) {
  if (!V(e))
    mt && e.id === -1 ? mt.splice(Dt + 1, 0, e) : e.flags & 1 || (Ye.push(e), e.flags |= 1);
  else
    for (let t = 0; t < e.length; t++)
      Ye.push(e[t]);
  as();
}
function us(e, t, r, n = qe + 1) {
  for (; n < ve.length; n++) {
    const i = ve[n];
    if (i && i.flags & 2) {
      if (e && i.id !== e.uid || t !== void 0 && !(i.id >= t))
        continue;
      ve.splice(n, 1), n = e ? n - 1 : qe, i.flags & 4 && (i.flags &= -2), i(), i.flags & 4 || (i.flags &= -2);
    }
  }
}
function cs(e, t, r = 0) {
  if (Ye.length) {
    let n = Ye, i = 0;
    if (t) {
      n = [];
      for (let o = 0; o < Ye.length; o++) {
        const s = Ye[o];
        (s.i !== void 0 ? !s.i || s.i.uid < r : t.has(s)) ? Ye[i++] = s : n.push(s);
      }
    }
    const a = [...new Set(n)].sort((o, s) => an(o) - an(s));
    if (Ye.length = i, mt) {
      for (let o = 0; o < a.length; o++)
        mt.push(a[o]);
      return;
    }
    for (mt = a, Dt = 0; Dt < mt.length; Dt++) {
      const o = mt[Dt];
      o.flags & 4 && (o.flags &= -2), o.flags & 8 || o(), o.flags &= -2;
    }
    mt = null, Dt = 0;
  }
}
let ar = !1;
function Wl(e, t) {
  if (ar) {
    e();
    return;
  }
  const r = t === void 0 ? void 0 : new Set(Ye);
  e(), ar = !0;
  try {
    us(void 0, t), cs(void 0, r, t);
  } finally {
    ar = !1;
  }
}
const an = (e) => e.id == null ? e.flags & 2 ? -1 : 1 / 0 : e.id;
function fs(e) {
  try {
    for (qe = 0; qe < ve.length; qe++) {
      const t = ve[qe];
      t && !(t.flags & 8) && (t.flags & 4 && (t.flags &= -2), gn(
        t,
        t.i,
        t.i ? 15 : 14
      ), t.flags & 4 || (t.flags &= -2));
    }
  } finally {
    for (; qe < ve.length; qe++) {
      const t = ve[qe];
      t && (t.flags &= -2);
    }
    qe = -1, ve.length = 0, cs(), Mn = null, (ve.length || Ye.length) && fs();
  }
}
let Ne = null, ds = null;
function In(e) {
  const t = Ne;
  return Ne = e, ds = e && e.type.__scopeId || null, t;
}
function Jl(e, t = Ne, r) {
  if (!t || e._n)
    return e;
  const n = (...i) => {
    n._d && Fn(-1);
    const a = In(t), o = Mt.length;
    let s;
    try {
      s = e(...i);
    } finally {
      for (let l = Mt.length; l > o; l--) Bs();
      In(a), n._d && Fn(1);
    }
    return s;
  };
  return n._n = !0, n._c = !0, n._d = !0, n;
}
function Re(e, t) {
  if (Ne === null)
    return e;
  const r = tr(Ne), n = e.dirs || (e.dirs = []);
  for (let i = 0; i < t.length; i++) {
    let [a, o, s, l = oe] = t[i];
    a && (W(a) && (a = {
      mounted: a,
      updated: a
    }), a.deep && ct(o), n.push({
      dir: a,
      instance: r,
      value: o,
      oldValue: void 0,
      arg: s,
      modifiers: l
    }));
  }
  return e;
}
function _t(e, t, r, n) {
  const i = e.dirs, a = t && t.dirs;
  for (let o = 0; o < i.length; o++) {
    const s = i[o];
    a && (s.oldValue = a[o].value);
    let l = s.dir[n];
    l && (nt(), He(l, r, 8, [
      e.el,
      s,
      e,
      t
    ]), rt());
  }
}
function Gl(e, t) {
  if (ke) {
    let r = ke.provides;
    const n = ke.parent && ke.parent.provides;
    n === r && (r = ke.provides = Object.create(n)), r[e] = t;
  }
}
function En(e, t, r = !1) {
  const n = Ka();
  if (n || Ut) {
    let i = Ut ? Ut._context.provides : n ? n.parent == null || n.ce ? n.vnode.appContext && n.vnode.appContext.provides : n.parent.provides : void 0;
    if (i && e in i)
      return i[e];
    if (arguments.length > 1)
      return r && W(t) ? t.call(n && n.proxy) : t;
  }
}
const Ql = /* @__PURE__ */ Symbol.for("v-scx"), Yl = () => En(Ql);
function en(e, t, r) {
  return ps(e, t, r);
}
function ps(e, t, r = oe) {
  const { immediate: n, deep: i, flush: a, once: o } = r, s = ye({}, r), l = t && n || !t && a !== "post";
  let u;
  if (dn) {
    if (a === "sync") {
      const g = Yl();
      u = g.__watcherHandles || (g.__watcherHandles = []);
    } else if (!l) {
      const g = () => {
      };
      return g.stop = et, g.resume = et, g.pause = et, g;
    }
  }
  const c = ke;
  s.call = (g, E, w) => He(g, c, E, w);
  let d = !1;
  a === "post" ? s.scheduler = (g) => {
    g.i = c, xe(g, c && c.suspense);
  } : a !== "sync" && (d = !0, s.scheduler = (g, E) => {
    E ? g() : uo(g);
  }), s.augmentJob = (g) => {
    t && (g.flags |= 4), d && (g.flags |= 2, c && (g.id = c.uid, g.i = c));
  };
  const h = jl(e, t, s);
  return dn && (u ? u.push(h) : l && h()), h;
}
function Xl(e, t, r) {
  const n = this.proxy, i = ae(e) ? e.includes(".") ? hs(n, e) : () => n[e] : e.bind(n, n);
  let a;
  W(t) ? a = t : (a = t.handler, r = t);
  const o = mn(this), s = ps(i, a.bind(n), r);
  return o(), s;
}
function hs(e, t) {
  const r = t.split(".");
  return () => {
    let n = e;
    for (let i = 0; i < r.length && n; i++)
      n = n[r[i]];
    return n;
  };
}
const Zl = /* @__PURE__ */ Symbol("_vte"), Yn = (e) => e.__isTeleport, ur = /* @__PURE__ */ Symbol("_leaveCb");
function ea(e) {
  let t = e[0];
  if (e.length > 1) {
    for (const r of e)
      if (r.type !== je) {
        t = r;
        break;
      }
  }
  return t;
}
function gs(e) {
  if (!co(e))
    return Yn(e.type) && e.children ? ea(e.children) : e;
  if (e.component)
    return e.component.subTree;
  const { shapeFlag: t, children: r } = e;
  if (r) {
    if (t & 16)
      return r[0];
    if (t & 32 && W(r.default))
      return r.default();
  }
}
function Rn(e, t) {
  if (e.shapeFlag & 6 && e.component) {
    e.transition = t;
    const r = e.component.subTree;
    Rn(
      Yn(r.type) && gs(r) || r,
      t
    );
  } else if (e.shapeFlag & 128)
    e.ssContent.transition = t.clone(e.ssContent), e.ssFallback.transition = t.clone(e.ssFallback);
  else if (e.transition = t, e.type === de && V(e.children)) {
    const r = Ss(e.children, !1);
    r && Rn(r, t);
  }
}
function zr(e) {
  if (e.component)
    return zr(e.component.subTree);
  if (e.type === de) {
    const t = V(e.children) && Ss(e.children, !1);
    return t ? zr(t) : void 0;
  }
  if (e.type !== je)
    return e;
}
function ms(e) {
  e.ids = [e.ids[0] + e.ids[2]++ + "-", 0, 0];
}
function Eo(e, t) {
  let r;
  return !!((r = Object.getOwnPropertyDescriptor(e, t)) && !r.configurable);
}
const Nn = /* @__PURE__ */ new WeakMap();
function tn(e, t, r, n, i = !1) {
  if (V(e)) {
    e.forEach(
      (w, q) => tn(
        w,
        t && (V(t) ? t[q] : t),
        r,
        n,
        i
      )
    );
    return;
  }
  if (nn(n) && !i) {
    n.shapeFlag & 512 && n.type.__asyncResolved && n.component.subTree.component && tn(e, t, r, n.component.subTree);
    return;
  }
  const a = n.shapeFlag & 4 ? tr(n.component) : n.el, o = i ? null : a, { i: s, r: l } = e, u = t && t.r, c = s.refs === oe ? s.refs = {} : s.refs, d = s.setupState, h = /* @__PURE__ */ Z(d), g = d === oe ? Oi : (w) => Eo(c, w) ? !1 : X(h, w), E = (w, q) => !(q && Eo(c, q));
  if (u != null && u !== l) {
    if (Po(t), ae(u))
      c[u] = null, g(u) && (d[u] = null);
    else if (/* @__PURE__ */ be(u)) {
      const w = t;
      E(u, w.k) && (u.value = null), w.k && (c[w.k] = null);
    }
  }
  if (W(l))
    gn(l, s, 12, [o, c]);
  else {
    const w = ae(l), q = /* @__PURE__ */ be(l);
    if (w || q) {
      const M = () => {
        if (e.f) {
          const A = w ? g(l) ? d[l] : c[l] : E() || !e.k ? l.value : c[e.k];
          if (i)
            V(A) && Zr(A, a);
          else if (V(A))
            A.includes(a) || A.push(a);
          else if (w)
            c[l] = [a], g(l) && (d[l] = c[l]);
          else {
            const P = [a];
            E(l, e.k) && (l.value = P), e.k && (c[e.k] = P);
          }
        } else w ? (c[l] = o, g(l) && (d[l] = o)) : q && (E(l, e.k) && (l.value = o), e.k && (c[e.k] = o));
      };
      if (o) {
        const A = () => {
          M(), Nn.delete(e);
        };
        A.id = -1, Nn.set(e, A), xe(A, r);
      } else
        Po(e), M();
    }
  }
}
function Po(e) {
  const t = Nn.get(e);
  t && (t.flags |= 8, Nn.delete(e));
}
Kn().requestIdleCallback;
Kn().cancelIdleCallback;
const nn = (e) => !!e.type.__asyncLoader, co = (e) => e.type.__isKeepAlive;
function ta(e, t) {
  bs(e, "a", t);
}
function na(e, t) {
  bs(e, "da", t);
}
function bs(e, t, r = ke) {
  const n = e.__wdc || (e.__wdc = () => {
    let i = r;
    for (; i; ) {
      if (i.isDeactivated)
        return;
      i = i.parent;
    }
    return e();
  });
  if (Xn(t, n, r), r) {
    let i = r.parent;
    for (; i && i.parent; )
      co(i.parent.vnode) && ra(n, t, r, i), i = i.parent;
  }
}
function ra(e, t, r, n) {
  const i = Xn(
    t,
    e,
    n,
    !0
    /* prepend */
  );
  ws(() => {
    Zr(n[t], i);
  }, r);
}
function Xn(e, t, r = ke, n = !1) {
  if (r) {
    const i = r[e] || (r[e] = []), a = t.__weh || (t.__weh = (...o) => {
      nt();
      const s = mn(r), l = He(t, r, e, o);
      return s(), rt(), l;
    });
    return n ? i.unshift(a) : i.push(a), a;
  }
}
const dt = (e) => (t, r = ke) => {
  (!dn || e === "sp") && Xn(e, (...n) => t(...n), r);
}, oa = dt("bm"), ys = dt("m"), ia = dt(
  "bu"
), sa = dt("u"), la = dt(
  "bum"
), ws = dt("um"), aa = dt(
  "sp"
), ua = dt("rtg"), ca = dt("rtc");
function fa(e, t = ke) {
  Xn("ec", e, t);
}
const da = /* @__PURE__ */ Symbol.for("v-ndc");
function qt(e, t, r, n) {
  let i;
  const a = r, o = V(e);
  if (o || ae(e)) {
    const s = o && /* @__PURE__ */ yt(e);
    let l = !1, u = !1;
    s && (l = !/* @__PURE__ */ Oe(e), u = /* @__PURE__ */ ot(e), e = Jn(e)), i = new Array(e.length);
    for (let c = 0, d = e.length; c < d; c++)
      i[c] = t(
        l ? u ? vt(Fe(e[c])) : Fe(e[c]) : e[c],
        c,
        void 0,
        a
      );
  } else if (typeof e == "number")
    if (!Number.isInteger(e) || e < 0)
      i = [];
    else {
      i = new Array(e);
      for (let s = 0; s < e; s++)
        i[s] = t(s + 1, s, void 0, a);
    }
  else if (te(e))
    if (e[Symbol.iterator])
      i = Array.from(
        e,
        (s, l) => t(s, l, void 0, a)
      );
    else {
      const s = Object.keys(e);
      i = new Array(s.length);
      for (let l = 0, u = s.length; l < u; l++) {
        const c = s[l];
        i[l] = t(e[c], c, l, a);
      }
    }
  else
    i = [];
  return i;
}
const Kr = (e) => e ? $s(e) ? tr(e) : Kr(e.parent) : null, rn = (
  // Move PURE marker to new line to workaround compiler discarding it
  // due to type annotation
  /* @__PURE__ */ ye(/* @__PURE__ */ Object.create(null), {
    $: (e) => e,
    $el: (e) => e.vnode.el,
    $data: (e) => e.data,
    $props: (e) => e.props,
    $attrs: (e) => e.attrs,
    $slots: (e) => e.slots,
    $refs: (e) => e.refs,
    $parent: (e) => Kr(e.parent),
    $root: (e) => Kr(e.root),
    $host: (e) => e.ce,
    $emit: (e) => e.emit,
    $options: (e) => ks(e),
    $forceUpdate: (e) => e.f || (e.f = () => {
      uo(e.update);
    }),
    $nextTick: (e) => e.n || (e.n = Ln.bind(e.proxy)),
    $watch: (e) => Xl.bind(e)
  })
), cr = (e, t) => e !== oe && !e.__isScriptSetup && X(e, t), pa = {
  get({ _: e }, t) {
    if (t === "__v_skip")
      return !0;
    const { ctx: r, setupState: n, data: i, props: a, accessCache: o, type: s, appContext: l } = e;
    if (t[0] !== "$") {
      const h = o[t];
      if (h !== void 0)
        switch (h) {
          case 1:
            return n[t];
          case 2:
            return i[t];
          case 4:
            return r[t];
          case 3:
            return a[t];
        }
      else {
        if (cr(n, t))
          return o[t] = 1, n[t];
        if (i !== oe && X(i, t))
          return o[t] = 2, i[t];
        if (X(a, t))
          return o[t] = 3, a[t];
        if (r !== oe && X(r, t))
          return o[t] = 4, r[t];
        Wr && (o[t] = 0);
      }
    }
    const u = rn[t];
    let c, d;
    if (u)
      return t === "$attrs" && me(e.attrs, "get", ""), u(e);
    if (
      // css module (injected by vue-loader)
      (c = s.__cssModules) && (c = c[t])
    )
      return c;
    if (r !== oe && X(r, t))
      return o[t] = 4, r[t];
    if (
      // global properties
      d = l.config.globalProperties, X(d, t)
    )
      return d[t];
  },
  set({ _: e }, t, r) {
    const { data: n, setupState: i, ctx: a } = e;
    return cr(i, t) ? (i[t] = r, !0) : n !== oe && X(n, t) ? (n[t] = r, !0) : X(e.props, t) || t[0] === "$" && t.slice(1) in e ? !1 : (a[t] = r, !0);
  },
  has({
    _: { data: e, setupState: t, accessCache: r, ctx: n, appContext: i, props: a, type: o }
  }, s) {
    let l;
    return !!(r[s] || e !== oe && s[0] !== "$" && X(e, s) || cr(t, s) || X(a, s) || X(n, s) || X(rn, s) || X(i.config.globalProperties, s) || (l = o.__cssModules) && l[s]);
  },
  defineProperty(e, t, r) {
    return r.get != null ? e._.accessCache[t] = 0 : X(r, "value") && this.set(e, t, r.value, null), Reflect.defineProperty(e, t, r);
  }
};
function To(e) {
  return V(e) ? e.reduce(
    (t, r) => (t[r] = null, t),
    {}
  ) : e;
}
let Wr = !0;
function ha(e) {
  const t = ks(e), r = e.proxy, n = e.ctx;
  Wr = !1, t.beforeCreate && Mo(t.beforeCreate, e, "bc");
  const {
    // state
    data: i,
    computed: a,
    methods: o,
    watch: s,
    provide: l,
    inject: u,
    // lifecycle
    created: c,
    beforeMount: d,
    mounted: h,
    beforeUpdate: g,
    updated: E,
    activated: w,
    deactivated: q,
    beforeDestroy: M,
    beforeUnmount: A,
    destroyed: P,
    unmounted: k,
    render: D,
    renderTracked: y,
    renderTriggered: b,
    errorCaptured: B,
    serverPrefetch: R,
    // public API
    expose: v,
    inheritAttrs: L,
    // assets
    components: U,
    directives: $,
    filters: K
  } = t;
  if (u && ga(u, n, null), o)
    for (const se in o) {
      const ee = o[se];
      W(ee) && (n[se] = ee.bind(r));
    }
  if (i) {
    const se = i.call(r, r);
    te(se) && (e.data = /* @__PURE__ */ Gn(se));
  }
  if (Wr = !0, a)
    for (const se in a) {
      const ee = a[se], it = W(ee) ? ee.bind(r, r) : W(ee.get) ? ee.get.bind(r, r) : et, pt = !W(ee) && W(ee.set) ? ee.set.bind(r) : et, Me = ft({
        get: it,
        set: pt
      });
      Object.defineProperty(n, se, {
        enumerable: !0,
        configurable: !0,
        get: () => Me.value,
        set: (Ce) => Me.value = Ce
      });
    }
  if (s)
    for (const se in s)
      vs(s[se], n, r, se);
  if (l) {
    const se = W(l) ? l.call(r) : l;
    Reflect.ownKeys(se).forEach((ee) => {
      Gl(ee, se[ee]);
    });
  }
  c && Mo(c, e, "c");
  function ue(se, ee) {
    V(ee) ? ee.forEach((it) => se(it.bind(r))) : ee && se(ee.bind(r));
  }
  if (ue(oa, d), ue(ys, h), ue(ia, g), ue(sa, E), ue(ta, w), ue(na, q), ue(fa, B), ue(ca, y), ue(ua, b), ue(la, A), ue(ws, k), ue(aa, R), V(v))
    if (v.length) {
      const se = e.exposed || (e.exposed = {});
      v.forEach((ee) => {
        Object.defineProperty(se, ee, {
          get: () => r[ee],
          set: (it) => r[ee] = it,
          enumerable: !0
        });
      });
    } else e.exposed || (e.exposed = {});
  D && e.render === et && (e.render = D), L != null && (e.inheritAttrs = L), U && (e.components = U), $ && (e.directives = $), R && ms(e);
}
function ga(e, t, r = et) {
  V(e) && (e = Jr(e));
  for (const n in e) {
    const i = e[n];
    let a;
    te(i) ? "default" in i ? a = En(
      i.from || n,
      i.default,
      !0
    ) : a = En(i.from || n) : a = En(i), /* @__PURE__ */ be(a) ? Object.defineProperty(t, n, {
      enumerable: !0,
      configurable: !0,
      get: () => a.value,
      set: (o) => a.value = o
    }) : t[n] = a;
  }
}
function Mo(e, t, r) {
  He(
    V(e) ? e.map((n) => n.bind(t.proxy)) : e.bind(t.proxy),
    t,
    r
  );
}
function vs(e, t, r, n) {
  let i = n.includes(".") ? hs(r, n) : () => r[n];
  if (ae(e)) {
    const a = t[e];
    W(a) && en(i, a);
  } else if (W(e))
    en(i, e.bind(r));
  else if (te(e))
    if (V(e))
      e.forEach((a) => vs(a, t, r, n));
    else {
      const a = W(e.handler) ? e.handler.bind(r) : t[e.handler];
      W(a) && en(i, a, e);
    }
}
function ks(e) {
  const t = e.type, { mixins: r, extends: n } = t, {
    mixins: i,
    optionsCache: a,
    config: { optionMergeStrategies: o }
  } = e.appContext, s = a.get(t);
  let l;
  return s ? l = s : !i.length && !r && !n ? l = t : (l = {}, i.length && i.forEach(
    (u) => On(l, u, o, !0)
  ), On(l, t, o)), te(t) && a.set(t, l), l;
}
function On(e, t, r, n = !1) {
  const { mixins: i, extends: a } = t;
  a && On(e, a, r, !0), i && i.forEach(
    (o) => On(e, o, r, !0)
  );
  for (const o in t)
    if (!(n && o === "expose")) {
      const s = ma[o] || r && r[o];
      e[o] = s ? s(e[o], t[o]) : t[o];
    }
  return e;
}
const ma = {
  data: Lo,
  props: Io,
  emits: Io,
  // objects
  methods: Jt,
  computed: Jt,
  // lifecycle
  beforeCreate: we,
  created: we,
  beforeMount: we,
  mounted: we,
  beforeUpdate: we,
  updated: we,
  beforeDestroy: we,
  beforeUnmount: we,
  destroyed: we,
  unmounted: we,
  activated: we,
  deactivated: we,
  errorCaptured: we,
  serverPrefetch: we,
  // assets
  components: Jt,
  directives: Jt,
  // watch
  watch: ya,
  // provide / inject
  provide: Lo,
  inject: ba
};
function Lo(e, t) {
  return t ? e ? function() {
    return ye(
      W(e) ? e.call(this, this) : e,
      W(t) ? t.call(this, this) : t
    );
  } : t : e;
}
function ba(e, t) {
  return Jt(Jr(e), Jr(t));
}
function Jr(e) {
  if (V(e)) {
    const t = {};
    for (let r = 0; r < e.length; r++)
      t[e[r]] = e[r];
    return t;
  }
  return e;
}
function we(e, t) {
  return e ? [...new Set([].concat(e, t))] : t;
}
function Jt(e, t) {
  return e ? ye(/* @__PURE__ */ Object.create(null), e, t) : t;
}
function Io(e, t) {
  return e ? V(e) && V(t) ? [.../* @__PURE__ */ new Set([...e, ...t])] : ye(
    /* @__PURE__ */ Object.create(null),
    To(e),
    To(t ?? {})
  ) : t;
}
function ya(e, t) {
  if (!e) return t;
  if (!t) return e;
  const r = ye(/* @__PURE__ */ Object.create(null), e);
  for (const n in t)
    r[n] = we(e[n], t[n]);
  return r;
}
function _s() {
  return {
    app: null,
    config: {
      isNativeTag: Oi,
      performance: !1,
      globalProperties: {},
      optionMergeStrategies: {},
      errorHandler: void 0,
      warnHandler: void 0,
      compilerOptions: {}
    },
    mixins: [],
    components: {},
    directives: {},
    provides: /* @__PURE__ */ Object.create(null),
    optionsCache: /* @__PURE__ */ new WeakMap(),
    propsCache: /* @__PURE__ */ new WeakMap(),
    emitsCache: /* @__PURE__ */ new WeakMap()
  };
}
let wa = 0;
function va(e, t) {
  return function(n, i = null) {
    W(n) || (n = ye({}, n)), i != null && !te(i) && (i = null);
    const a = _s(), o = /* @__PURE__ */ new WeakSet(), s = [];
    let l = !1;
    const u = a.app = {
      _uid: wa++,
      _component: n,
      _props: i,
      _container: null,
      _context: a,
      _instance: null,
      version: Xa,
      get config() {
        return a.config;
      },
      set config(c) {
      },
      use(c, ...d) {
        return o.has(c) || (c && W(c.install) ? (o.add(c), c.install(u, ...d)) : W(c) && (o.add(c), c(u, ...d))), u;
      },
      mixin(c) {
        return a.mixins.includes(c) || a.mixins.push(c), u;
      },
      component(c, d) {
        return d ? (a.components[c] = d, u) : a.components[c];
      },
      directive(c, d) {
        return d ? (a.directives[c] = d, u) : a.directives[c];
      },
      mount(c, d, h) {
        if (!l) {
          const g = u._ceVNode || _e(n, i);
          return g.appContext = a, h === !0 ? h = "svg" : h === !1 && (h = void 0), e(g, c, h), l = !0, u._container = c, c.__vue_app__ = u, tr(g.component);
        }
      },
      onUnmount(c) {
        s.push(c);
      },
      unmount() {
        l && (He(
          s,
          u._instance,
          16
        ), e(null, u._container), delete u._container.__vue_app__);
      },
      provide(c, d) {
        return a.provides[c] = d, u;
      },
      runWithContext(c) {
        const d = Ut;
        Ut = u;
        try {
          return c();
        } finally {
          Ut = d;
        }
      }
    };
    return u;
  };
}
let Ut = null;
const ka = (e, t) => t === "modelValue" || t === "model-value" ? e.modelModifiers : e[`${t}Modifiers`] || e[`${Ue(t)}Modifiers`] || e[`${It(t)}Modifiers`];
function _a(e, t, ...r) {
  if (e.isUnmounted) return;
  const n = e.vnode.props || oe;
  let i = r;
  const a = t.startsWith("update:"), o = a && ka(n, t.slice(7));
  o && (o.trim && (i = r.map((c) => ae(c) ? c.trim() : c)), o.number && (i = i.map(zn)));
  let s, l = n[s = rr(t)] || // also try camelCase event handler (#2249)
  n[s = rr(Ue(t))];
  !l && a && (l = n[s = rr(It(t))]), l && He(
    l,
    e,
    6,
    i
  );
  const u = n[s + "Once"];
  if (u) {
    if (!e.emitted)
      e.emitted = {};
    else if (e.emitted[s])
      return;
    e.emitted[s] = !0, He(
      u,
      e,
      6,
      i
    );
  }
}
const Ca = /* @__PURE__ */ new WeakMap();
function Cs(e, t, r = !1) {
  const n = r ? Ca : t.emitsCache, i = n.get(e);
  if (i !== void 0)
    return i;
  const a = e.emits;
  let o = {}, s = !1;
  if (!W(e)) {
    const l = (u) => {
      const c = Cs(u, t, !0);
      c && (s = !0, ye(o, c));
    };
    !r && t.mixins.length && t.mixins.forEach(l), e.extends && l(e.extends), e.mixins && e.mixins.forEach(l);
  }
  return !a && !s ? (te(e) && n.set(e, null), null) : (V(a) ? a.forEach((l) => o[l] = null) : ye(o, a), te(e) && n.set(e, o), o);
}
function Zn(e, t) {
  return !e || !Hn(t) ? !1 : (t = t.slice(2), t = t === "Once" ? t : t.replace(/Once$/, ""), X(e, t[0].toLowerCase() + t.slice(1)) || X(e, It(t)) || X(e, t));
}
function Ro(e) {
  const {
    type: t,
    vnode: r,
    proxy: n,
    withProxy: i,
    propsOptions: [a],
    slots: o,
    attrs: s,
    emit: l,
    render: u,
    renderCache: c,
    props: d,
    data: h,
    setupState: g,
    ctx: E,
    inheritAttrs: w
  } = e, q = In(e);
  let M, A;
  try {
    if (r.shapeFlag & 4) {
      const k = i || n, D = k;
      M = Xe(
        u.call(
          D,
          k,
          c,
          d,
          g,
          h,
          E
        )
      ), A = s;
    } else {
      const k = t;
      M = Xe(
        k.length > 1 ? k(
          d,
          { attrs: s, slots: o, emit: l }
        ) : k(
          d,
          null
        )
      ), A = t.props ? s : Sa(s);
    }
  } catch (k) {
    Mt.length = 0, Qn(k, e, 1), M = _e(je);
  }
  let P = M;
  if (A && w !== !1) {
    const k = Object.keys(A), { shapeFlag: D } = P;
    k.length && D & 7 && (a && k.some(jn) && (A = xa(
      A,
      a
    )), P = $t(P, A, !1, !0));
  }
  if (r.dirs && (P = $t(P, null, !1, !0), P.dirs = P.dirs ? P.dirs.concat(r.dirs) : r.dirs), r.transition) {
    const k = Yn(P.type) && gs(P) || P;
    Rn(k, r.transition);
  }
  return M = P, In(q), M;
}
function Ss(e, t = !0) {
  let r;
  for (let n = 0; n < e.length; n++) {
    const i = e[n];
    if (cn(i)) {
      if (i.type !== je || i.children === "v-if") {
        if (r)
          return;
        r = i;
      }
    } else
      return;
  }
  return r;
}
const Sa = (e) => {
  let t;
  for (const r in e)
    (r === "class" || r === "style" || Hn(r)) && ((t || (t = {}))[r] = e[r]);
  return t;
}, xa = (e, t) => {
  const r = {};
  for (const n in e)
    (!jn(n) || !(n.slice(9) in t)) && (r[n] = e[n]);
  return r;
};
function Aa(e, t, r) {
  const { props: n, children: i, component: a } = e, { props: o, children: s, patchFlag: l } = t, u = a.emitsOptions;
  if (t.dirs || t.transition)
    return !0;
  if (r && l >= 0) {
    if (l & 1024)
      return !0;
    if (l & 16)
      return n ? No(n, o, u) : !!o;
    if (l & 8) {
      const c = t.dynamicProps;
      for (let d = 0; d < c.length; d++) {
        const h = c[d];
        if (xs(o, n, h) && !Zn(u, h))
          return !0;
      }
    }
  } else
    return (i || s) && (!s || !s.$stable) ? !0 : n === o ? !1 : n ? o ? No(n, o, u) : !0 : !!o;
  return !1;
}
function No(e, t, r) {
  const n = Object.keys(t);
  if (n.length !== Object.keys(e).length)
    return !0;
  for (let i = 0; i < n.length; i++) {
    const a = n[i];
    if (!X(e, a) || xs(t, e, a) && !Zn(r, a))
      return !0;
  }
  return !1;
}
function xs(e, t, r) {
  const n = e[r], i = t[r];
  return r === "style" && te(n) && te(i) ? !wt(n, i) : n !== i;
}
function Ea({ vnode: e, parent: t, suspense: r }, n) {
  for (; t; ) {
    const i = t.subTree;
    if (i.suspense && i.suspense.activeBranch === e && (i.suspense.vnode.el = i.el = n, e = i), i === e)
      (e = t.vnode).el = n, t = t.parent;
    else
      break;
  }
  r && r.activeBranch === e && (r.vnode.el = n);
}
const As = {}, Es = () => Object.create(As), Ps = (e) => Object.getPrototypeOf(e) === As;
function Pa(e, t, r, n = !1) {
  const i = {}, a = Es();
  e.propsDefaults = /* @__PURE__ */ Object.create(null), Ts(e, t, i, a);
  for (const o in e.propsOptions[0])
    o in i || (i[o] = void 0);
  r ? e.props = n ? i : /* @__PURE__ */ is(i) : e.type.props ? e.props = i : e.props = a, e.attrs = a;
}
function Ta(e, t, r, n) {
  const {
    props: i,
    attrs: a,
    vnode: { patchFlag: o }
  } = e, s = /* @__PURE__ */ Z(i), [l] = e.propsOptions;
  let u = !1;
  if (
    // always force full diff in dev
    // - #1942 if hmr is enabled with sfc component
    // - vite#872 non-sfc component used by sfc component
    (n || o > 0) && !(o & 16)
  ) {
    if (o & 8) {
      const c = e.vnode.dynamicProps;
      for (let d = 0; d < c.length; d++) {
        let h = c[d];
        if (Zn(e.emitsOptions, h))
          continue;
        const g = t[h];
        if (l)
          if (X(a, h))
            g !== a[h] && (a[h] = g, u = !0);
          else {
            const E = Ue(h);
            i[E] = Gr(
              l,
              s,
              E,
              g,
              e,
              !1
            );
          }
        else
          g !== a[h] && (a[h] = g, u = !0);
      }
    }
  } else {
    Ts(e, t, i, a) && (u = !0);
    let c;
    for (const d in s)
      (!t || // for camelCase
      !X(t, d) && // it's possible the original props was passed in as kebab-case
      // and converted to camelCase (#955)
      ((c = It(d)) === d || !X(t, c))) && (l ? r && // for camelCase
      (r[d] !== void 0 || // for kebab-case
      r[c] !== void 0) && (i[d] = Gr(
        l,
        s,
        d,
        void 0,
        e,
        !0
      )) : delete i[d]);
    if (a !== s)
      for (const d in a)
        (!t || !X(t, d)) && (delete a[d], u = !0);
  }
  u && ut(e.attrs, "set", "");
}
function Ts(e, t, r, n) {
  const [i, a] = e.propsOptions;
  let o = !1, s;
  if (t)
    for (let l in t) {
      if (Yt(l))
        continue;
      const u = t[l];
      let c;
      i && X(i, c = Ue(l)) ? !a || !a.includes(c) ? r[c] = u : (s || (s = {}))[c] = u : Zn(e.emitsOptions, l) || (!(l in n) || u !== n[l]) && (n[l] = u, o = !0);
    }
  if (a) {
    const l = /* @__PURE__ */ Z(r), u = s || oe;
    for (let c = 0; c < a.length; c++) {
      const d = a[c];
      r[d] = Gr(
        i,
        l,
        d,
        u[d],
        e,
        !X(u, d)
      );
    }
  }
  return o;
}
function Gr(e, t, r, n, i, a) {
  const o = e[r];
  if (o != null) {
    const s = X(o, "default");
    if (s && n === void 0) {
      const l = o.default;
      if (o.type !== Function && !o.skipFactory && W(l)) {
        const { propsDefaults: u } = i;
        if (r in u)
          n = u[r];
        else {
          const c = mn(i);
          n = u[r] = l.call(
            null,
            t
          ), c();
        }
      } else
        n = l;
      i.ce && i.ce._setProp(r, n);
    }
    o[
      0
      /* shouldCast */
    ] && (a && !s ? n = !1 : o[
      1
      /* shouldCastTrue */
    ] && (n === "" || n === It(r)) && (n = !0));
  }
  return n;
}
const Ma = /* @__PURE__ */ new WeakMap();
function Ms(e, t, r = !1) {
  const n = r ? Ma : t.propsCache, i = n.get(e);
  if (i)
    return i;
  const a = e.props, o = {}, s = [];
  let l = !1;
  if (!W(e)) {
    const c = (d) => {
      l = !0;
      const [h, g] = Ms(d, t, !0);
      ye(o, h), g && s.push(...g);
    };
    !r && t.mixins.length && t.mixins.forEach(c), e.extends && c(e.extends), e.mixins && e.mixins.forEach(c);
  }
  if (!a && !l)
    return te(e) && n.set(e, Et), Et;
  if (V(a))
    for (let c = 0; c < a.length; c++) {
      const d = Ue(a[c]);
      Oo(d) && (o[d] = oe);
    }
  else if (a)
    for (const c in a) {
      const d = Ue(c);
      if (Oo(d)) {
        const h = a[c], g = o[d] = V(h) || W(h) ? { type: h } : ye({}, h), E = g.type;
        let w = !1, q = !0;
        if (V(E))
          for (let M = 0; M < E.length; ++M) {
            const A = E[M], P = W(A) && A.name;
            if (P === "Boolean") {
              w = !0;
              break;
            } else P === "String" && (q = !1);
          }
        else
          w = W(E) && E.name === "Boolean";
        g[
          0
          /* shouldCast */
        ] = w, g[
          1
          /* shouldCastTrue */
        ] = q, (w || X(g, "default")) && s.push(d);
      }
    }
  const u = [o, s];
  return te(e) && n.set(e, u), u;
}
function Oo(e) {
  return e[0] !== "$" && !Yt(e);
}
const fo = (e) => e === "_" || e === "_ctx" || e === "$stable", po = (e) => V(e) ? e.map(Xe) : [Xe(e)], La = (e, t, r) => {
  if (t._n)
    return t;
  const n = Jl((...i) => po(t(...i)), r);
  return n._c = !1, n;
}, Ls = (e, t, r) => {
  const n = e._ctx;
  for (const i in e) {
    if (fo(i)) continue;
    const a = e[i];
    if (W(a))
      t[i] = La(i, a, n);
    else if (a != null) {
      const o = po(a);
      t[i] = () => o;
    }
  }
}, Is = (e, t) => {
  const r = po(t);
  e.slots.default = () => r;
}, Rs = (e, t, r) => {
  for (const n in t)
    (r || !fo(n)) && (e[n] = t[n]);
}, Ia = (e, t, r) => {
  const n = e.slots = Es();
  if (e.vnode.shapeFlag & 32) {
    const i = t._;
    i ? (Rs(n, t, r), r && Ui(n, "_", i, !0)) : Ls(t, n);
  } else t && Is(e, t);
}, Ra = (e, t, r) => {
  const { vnode: n, slots: i } = e;
  let a = !0, o = oe;
  if (n.shapeFlag & 32) {
    const s = t._;
    s ? r && s === 1 ? a = !1 : Rs(i, t, r) : (a = !t.$stable, Ls(t, i)), o = t;
  } else t && (Is(e, t), o = { default: 1 });
  if (a)
    for (const s in i)
      !fo(s) && o[s] == null && delete i[s];
}, xe = Da;
function Na(e) {
  return Oa(e);
}
function Oa(e, t) {
  const r = Kn();
  r.__VUE__ = !0;
  const {
    insert: n,
    remove: i,
    patchProp: a,
    createElement: o,
    createText: s,
    createComment: l,
    setText: u,
    setElementText: c,
    parentNode: d,
    nextSibling: h,
    setScopeId: g = et,
    insertStaticContent: E
  } = e, w = (f, p, m, T = null, C = null, S = null, O = void 0, N = null, I = !!p.dynamicChildren) => {
    if (f === p)
      return;
    f && !zt(f, p) && (T = Se(f), Ce(f, C, S, !0), f = null), p.patchFlag === -2 && (I = !1, p.dynamicChildren = null), p.dynamicChildren && f && f.dynamicChildren && f.dynamicChildren.hasOnce && (p.dynamicChildren === Et && (p.dynamicChildren = []), p.dynamicChildren.hasOnce = !0);
    const { type: _, ref: H, shapeFlag: F } = p;
    switch (_) {
      case er:
        q(f, p, m, T);
        break;
      case je:
        M(f, p, m, T);
        break;
      case dr:
        f == null && A(p, m, T, O);
        break;
      case de:
        U(
          f,
          p,
          m,
          T,
          C,
          S,
          O,
          N,
          I
        );
        break;
      default:
        F & 1 ? D(
          f,
          p,
          m,
          T,
          C,
          S,
          O,
          N,
          I
        ) : F & 6 ? $(
          f,
          p,
          m,
          T,
          C,
          S,
          O,
          N,
          I
        ) : (F & 64 || F & 128) && _.process(
          f,
          p,
          m,
          T,
          C,
          S,
          O,
          N,
          I,
          Ie
        );
    }
    H != null && C ? tn(H, f && f.ref, S, p || f, !p) : H == null && f && f.ref != null && tn(f.ref, null, S, f, !0);
  }, q = (f, p, m, T) => {
    if (f == null)
      n(
        p.el = s(p.children),
        m,
        T
      );
    else {
      const C = p.el = f.el;
      p.children !== f.children && u(C, p.children);
    }
  }, M = (f, p, m, T) => {
    f == null ? n(
      p.el = l(p.children || ""),
      m,
      T
    ) : p.el = f.el;
  }, A = (f, p, m, T) => {
    [f.el, f.anchor] = E(
      f.children,
      p,
      m,
      T,
      f.el,
      f.anchor
    );
  }, P = ({ el: f, anchor: p }, m, T) => {
    let C;
    for (; f && f !== p; )
      C = h(f), n(f, m, T), f = C;
    n(p, m, T);
  }, k = ({ el: f, anchor: p }) => {
    let m;
    for (; f && f !== p; )
      m = h(f), i(f), f = m;
    i(p);
  }, D = (f, p, m, T, C, S, O, N, I) => {
    if (p.type === "svg" ? O = "svg" : p.type === "math" && (O = "mathml"), f == null)
      y(
        p,
        m,
        T,
        C,
        S,
        O,
        N,
        I
      );
    else {
      const _ = f.el && f.el._isVueCE ? f.el : null;
      try {
        _ && _._beginPatch(), R(
          f,
          p,
          C,
          S,
          O,
          N,
          I
        );
      } finally {
        _ && _._endPatch();
      }
    }
  }, y = (f, p, m, T, C, S, O, N) => {
    let I, _;
    const { props: H, shapeFlag: F, transition: j, dirs: z } = f;
    if (I = f.el = o(
      f.type,
      S,
      H && H.is,
      H
    ), F & 8 ? c(I, f.children) : F & 16 && B(
      f.children,
      I,
      null,
      T,
      C,
      fr(f, S),
      O,
      N
    ), z && _t(f, null, T, "created"), b(I, f, f.scopeId, O, T), H) {
      for (const re in H)
        re !== "value" && !Yt(re) && a(I, re, null, H[re], S, T);
      "value" in H && a(I, "value", null, H.value, S), (_ = H.onVnodeBeforeMount) && We(_, T, f);
    }
    z && _t(f, null, T, "beforeMount");
    const Q = Fa(C, j);
    Q && j.beforeEnter(I), n(I, p, m), ((_ = H && H.onVnodeMounted) || Q || z) && xe(() => {
      _ && We(_, T, f), Q && j.enter(I), z && _t(f, null, T, "mounted");
    }, C);
  }, b = (f, p, m, T, C) => {
    if (m && g(f, m), T)
      for (let S = 0; S < T.length; S++)
        g(f, T[S]);
    if (C) {
      let S = C.subTree;
      if (p === S || Fs(S.type) && (S.ssContent === p || S.ssFallback === p)) {
        const O = C.vnode;
        b(
          f,
          O,
          O.scopeId,
          O.slotScopeIds,
          C.parent
        );
      }
    }
  }, B = (f, p, m, T, C, S, O, N, I = 0) => {
    for (let _ = I; _ < f.length; _++) {
      const H = f[_] = N ? at(f[_]) : Xe(f[_]);
      w(
        null,
        H,
        p,
        m,
        T,
        C,
        S,
        O,
        N
      );
    }
  }, R = (f, p, m, T, C, S, O) => {
    const N = p.el = f.el;
    let { patchFlag: I, dynamicChildren: _, dirs: H } = p;
    I |= f.patchFlag & 16;
    const F = f.props || oe, j = p.props || oe;
    let z;
    if (m && Ct(m, !1), (z = j.onVnodeBeforeUpdate) && We(z, m, p, f), H && _t(p, f, m, "beforeUpdate"), m && Ct(m, !0), // #6385 the old vnode may be a user-wrapped non-isomorphic block
    // Force full diff when block metadata is unstable.
    _ && (!f.dynamicChildren || f.dynamicChildren.length !== _.length) && (I = 0, O = !1, _ = null), (F.innerHTML && j.innerHTML == null || F.textContent && j.textContent == null) && c(N, ""), _ ? v(
      f.dynamicChildren,
      _,
      N,
      m,
      T,
      fr(p, C),
      S
    ) : O || ee(
      f,
      p,
      N,
      null,
      m,
      T,
      fr(p, C),
      S,
      !1
    ), I > 0) {
      if (I & 16)
        L(N, F, j, m, C);
      else if (I & 2 && F.class !== j.class && a(N, "class", null, j.class, C), I & 4 && a(N, "style", F.style, j.style, C), I & 8) {
        const Q = p.dynamicProps;
        for (let re = 0; re < Q.length; re++) {
          const ne = Q[re], ce = F[ne], pe = j[ne];
          (pe !== ce || ne === "value") && a(N, ne, ce, pe, C, m);
        }
      }
      I & 1 && f.children !== p.children && c(N, p.children);
    } else !O && _ == null && L(N, F, j, m, C);
    ((z = j.onVnodeUpdated) || H) && xe(() => {
      z && We(z, m, p, f), H && _t(p, f, m, "updated");
    }, T);
  }, v = (f, p, m, T, C, S, O) => {
    for (let N = 0; N < p.length; N++) {
      const I = f[N], _ = p[N], H = I.el || Qr(I), F = (
        // oldVNode may be an errored async setup() component inside Suspense
        // which will not have a mounted element
        H && // - In the case of a Fragment, we need to provide the actual parent
        // of the Fragment itself so it can move its children.
        (I.type === de || // - In the case of different nodes, there is going to be a replacement
        // which also requires the correct parent container
        !zt(I, _) || // - In the case of a component, it could contain anything.
        I.shapeFlag & 198) ? d(H) : (
          // In other cases, the parent container is not actually used so we
          // just pass the block element here to avoid a DOM parentNode call.
          m
        )
      );
      w(
        I,
        _,
        F,
        null,
        T,
        C,
        S,
        O,
        !0
      );
    }
  }, L = (f, p, m, T, C) => {
    if (p !== m) {
      if (p !== oe)
        for (const S in p)
          !Yt(S) && !(S in m) && a(
            f,
            S,
            p[S],
            null,
            C,
            T
          );
      for (const S in m) {
        if (Yt(S)) continue;
        const O = m[S], N = p[S];
        O !== N && S !== "value" && a(f, S, N, O, C, T);
      }
      "value" in m && a(f, "value", p.value, m.value, C);
    }
  }, U = (f, p, m, T, C, S, O, N, I) => {
    const _ = p.el = f ? f.el : s(""), H = p.anchor = f ? f.anchor : s("");
    let { patchFlag: F, dynamicChildren: j, slotScopeIds: z } = p;
    z && (N = N ? N.concat(z) : z), f == null ? (n(_, m, T), n(H, m, T), B(
      // #10007
      // such fragment like `<></>` will be compiled into
      // a fragment which doesn't have a children.
      // In this case fallback to an empty array
      p.children || [],
      m,
      H,
      C,
      S,
      O,
      N,
      I
    )) : F > 0 && F & 64 && j && // #2715 the previous fragment could've been a BAILed one as a result
    // of renderSlot() with no valid children
    f.dynamicChildren && f.dynamicChildren.length === j.length ? (v(
      f.dynamicChildren,
      j,
      m,
      C,
      S,
      O,
      N
    ), // #2080 if the stable fragment has a key, it's a <template v-for> that may
    //  get moved around. Make sure all root level vnodes inherit el.
    // #2134 or if it's a component root, it may also get moved around
    // as the component is being moved.
    (p.key != null || C && p === C.subTree) && Ns(
      f,
      p,
      !0
      /* shallow */
    )) : ee(
      f,
      p,
      m,
      H,
      C,
      S,
      O,
      N,
      I
    );
  }, $ = (f, p, m, T, C, S, O, N, I) => {
    p.slotScopeIds = N, f == null ? p.shapeFlag & 512 ? C.ctx.activate(
      p,
      m,
      T,
      O,
      I
    ) : K(
      p,
      m,
      T,
      C,
      S,
      O,
      I
    ) : Be(f, p, I);
  }, K = (f, p, m, T, C, S, O) => {
    const N = f.component = za(
      f,
      T,
      C
    );
    if (co(f) && (N.ctx.renderer = Ie), Wa(N, !1, O), N.asyncDep) {
      if (C && C.registerDep(
        N,
        ue,
        O,
        S
      ), !f.el) {
        const I = N.subTree = _e(je);
        M(null, I, p, m), f.placeholder = I.el;
      }
    } else
      ue(
        N,
        f,
        p,
        m,
        C,
        S,
        O
      );
  }, Be = (f, p, m) => {
    const T = p.component = f.component;
    if (Aa(f, p, m))
      if (T.asyncDep && !T.asyncResolved) {
        p.el = f.el, p.placeholder = f.placeholder, se(T, p, m);
        return;
      } else
        T.next = p, T.update();
    else
      p.el = f.el, p.placeholder = f.placeholder, T.vnode = p;
  }, ue = (f, p, m, T, C, S, O) => {
    const N = () => {
      if (f.isMounted) {
        let { next: F, bu: j, u: z, parent: Q, vnode: re } = f;
        {
          const ze = Os(f);
          if (ze) {
            F && (F.el = re.el, se(f, F, O)), ze.asyncDep.then(() => {
              xe(() => {
                f.isUnmounted || _();
              }, C);
            });
            return;
          }
        }
        let ne = F, ce;
        Ct(f, !1), F ? (F.el = re.el, se(f, F, O)) : F = re, j && An(j), (ce = F.props && F.props.onVnodeBeforeUpdate) && We(ce, Q, F, re), Ct(f, !0);
        const pe = Ro(f), Ve = f.subTree;
        f.subTree = pe, w(
          Ve,
          pe,
          // parent may have changed if it's in a teleport
          d(Ve.el),
          // anchor may have changed if it's in a fragment
          Se(Ve),
          f,
          C,
          S
        ), F.el = pe.el, ne === null && Ea(f, pe.el), z && xe(z, C), (ce = F.props && F.props.onVnodeUpdated) && xe(
          () => We(ce, Q, F, re),
          C
        );
      } else {
        let F;
        const { el: j, props: z } = p, { bm: Q, m: re, parent: ne, root: ce, type: pe } = f, Ve = nn(p);
        Ct(f, !1), Q && An(Q), !Ve && (F = z && z.onVnodeBeforeMount) && We(F, ne, p), Ct(f, !0);
        {
          ce.ce && ce.ce._hasShadowRoot() && ce.ce._injectChildStyle(
            pe,
            f.parent ? f.parent.type : void 0
          );
          const ze = f.subTree = Ro(f);
          w(
            null,
            ze,
            m,
            T,
            f,
            C,
            S
          ), p.el = ze.el;
        }
        if (re && xe(re, C), !Ve && (F = z && z.onVnodeMounted)) {
          const ze = p;
          xe(
            () => We(F, ne, ze),
            C
          );
        }
        (p.shapeFlag & 256 || ne && nn(ne.vnode) && ne.vnode.shapeFlag & 256) && f.a && xe(f.a, C), f.isMounted = !0, p = m = T = null;
      }
    };
    f.scope.on();
    const I = f.effect = new Vi(N);
    f.scope.off();
    const _ = f.update = I.run.bind(I), H = f.job = I.runIfDirty.bind(I);
    H.i = f, H.id = f.uid, I.scheduler = () => uo(H), Ct(f, !0), _();
  }, se = (f, p, m) => {
    p.component = f;
    const T = f.vnode.props;
    f.vnode = p, f.next = null, Ta(f, p.props, T, m), Ra(f, p.children, m), nt(), us(f), rt();
  }, ee = (f, p, m, T, C, S, O, N, I = !1) => {
    const _ = f && f.children, H = f ? f.shapeFlag : 0, F = p.children, { patchFlag: j, shapeFlag: z } = p;
    if (j > 0) {
      if (j & 128) {
        pt(
          _,
          F,
          m,
          T,
          C,
          S,
          O,
          N,
          I
        );
        return;
      } else if (j & 256) {
        it(
          _,
          F,
          m,
          T,
          C,
          S,
          O,
          N,
          I
        );
        return;
      }
    }
    z & 8 ? (H & 16 && ht(_, C, S), F !== _ && c(m, F)) : H & 16 ? z & 16 ? pt(
      _,
      F,
      m,
      T,
      C,
      S,
      O,
      N,
      I
    ) : ht(_, C, S, !0) : (H & 8 && c(m, ""), z & 16 && B(
      F,
      m,
      T,
      C,
      S,
      O,
      N,
      I
    ));
  }, it = (f, p, m, T, C, S, O, N, I) => {
    f = f || Et, p = p || Et;
    const _ = f.length, H = p.length, F = Math.min(_, H);
    let j;
    for (j = 0; j < F; j++) {
      const z = p[j] = I ? at(p[j]) : Xe(p[j]);
      w(
        f[j],
        z,
        m,
        null,
        C,
        S,
        O,
        N,
        I
      );
    }
    _ > H ? ht(
      f,
      C,
      S,
      !0,
      !1,
      F
    ) : B(
      p,
      m,
      T,
      C,
      S,
      O,
      N,
      I,
      F
    );
  }, pt = (f, p, m, T, C, S, O, N, I) => {
    let _ = 0;
    const H = p.length;
    let F = f.length - 1, j = H - 1;
    for (; _ <= F && _ <= j; ) {
      const z = f[_], Q = p[_] = I ? at(p[_]) : Xe(p[_]);
      if (zt(z, Q))
        w(
          z,
          Q,
          m,
          null,
          C,
          S,
          O,
          N,
          I
        );
      else
        break;
      _++;
    }
    for (; _ <= F && _ <= j; ) {
      const z = f[F], Q = p[j] = I ? at(p[j]) : Xe(p[j]);
      if (zt(z, Q))
        w(
          z,
          Q,
          m,
          null,
          C,
          S,
          O,
          N,
          I
        );
      else
        break;
      F--, j--;
    }
    if (_ > F) {
      if (_ <= j) {
        const z = j + 1, Q = z < H ? p[z].el : T;
        for (; _ <= j; )
          w(
            null,
            p[_] = I ? at(p[_]) : Xe(p[_]),
            m,
            Q,
            C,
            S,
            O,
            N,
            I
          ), _++;
      }
    } else if (_ > j)
      for (; _ <= F; )
        Ce(f[_], C, S, !0), _++;
    else {
      const z = _, Q = _, re = /* @__PURE__ */ new Map();
      for (_ = Q; _ <= j; _++) {
        const Pe = p[_] = I ? at(p[_]) : Xe(p[_]);
        Pe.key != null && re.set(Pe.key, _);
      }
      let ne, ce = 0;
      const pe = j - Q + 1;
      let Ve = !1, ze = 0;
      const jt = new Array(pe);
      for (_ = 0; _ < pe; _++) jt[_] = 0;
      for (_ = z; _ <= F; _++) {
        const Pe = f[_];
        if (ce >= pe) {
          Ce(Pe, C, S, !0);
          continue;
        }
        let Ke;
        if (Pe.key != null)
          Ke = re.get(Pe.key);
        else
          for (ne = Q; ne <= j; ne++)
            if (jt[ne - Q] === 0 && zt(Pe, p[ne])) {
              Ke = ne;
              break;
            }
        Ke === void 0 ? Ce(Pe, C, S, !0) : (jt[Ke - Q] = _ + 1, Ke >= ze ? ze = Ke : Ve = !0, w(
          Pe,
          p[Ke],
          m,
          null,
          C,
          S,
          O,
          N,
          I
        ), ce++);
      }
      const bo = Ve ? Ba(jt) : Et;
      for (ne = bo.length - 1, _ = pe - 1; _ >= 0; _--) {
        const Pe = Q + _, Ke = p[Pe], yo = p[Pe + 1], wo = Pe + 1 < H ? (
          // #13559, #14173 fallback to el placeholder for unresolved async component
          yo.el || Qr(yo)
        ) : T;
        jt[_] === 0 ? w(
          null,
          Ke,
          m,
          wo,
          C,
          S,
          O,
          N,
          I
        ) : Ve && (ne < 0 || _ !== bo[ne] ? Me(Ke, m, wo, 2) : ne--);
      }
    }
  }, Me = (f, p, m, T, C = null) => {
    const { el: S, type: O, transition: N, children: I, shapeFlag: _ } = f;
    if (_ & 6) {
      Me(f.component.subTree, p, m, T);
      return;
    }
    if (_ & 128) {
      f.suspense.move(p, m, T);
      return;
    }
    if (_ & 64) {
      O.move(f, p, m, Ie);
      return;
    }
    if (O === de) {
      n(S, p, m);
      for (let F = 0; F < I.length; F++)
        Me(I[F], p, m, T);
      n(f.anchor, p, m);
      return;
    }
    if (O === dr) {
      P(f, p, m);
      return;
    }
    if (T !== 2 && _ & 1 && N)
      if (T === 0)
        N.persisted && !S[ur] ? n(S, p, m) : (N.beforeEnter(S), n(S, p, m), xe(() => N.enter(S), C));
      else {
        const { leave: F, delayLeave: j, afterLeave: z } = N, Q = () => {
          f.ctx.isUnmounted ? i(S) : n(S, p, m);
        }, re = () => {
          const ne = S._isLeaving || !!S[ur];
          S._isLeaving && S[ur](
            !0
            /* cancelled */
          ), N.persisted && !ne ? Q() : F(S, () => {
            Q(), z && z();
          });
        };
        j ? j(S, Q, re) : re();
      }
    else
      n(S, p, m);
  }, Ce = (f, p, m, T = !1, C = !1) => {
    const {
      type: S,
      props: O,
      ref: N,
      children: I,
      dynamicChildren: _,
      shapeFlag: H,
      patchFlag: F,
      dirs: j,
      cacheIndex: z,
      memo: Q
    } = f;
    if ((F === -2 || _ && _.hasOnce) && (C = !1), N != null && (nt(), tn(N, null, m, f, !0), rt()), z != null && (!f.ctx || f.ctx === p) && (p.renderCache[z] = void 0), H & 256) {
      p.ctx.deactivate(f);
      return;
    }
    const re = H & 1 && j, ne = !nn(f);
    let ce;
    if (ne && (ce = O && O.onVnodeBeforeUnmount) && We(ce, p, f), H & 6)
      Ht(f.component, m, T);
    else {
      if (H & 128) {
        f.suspense.unmount(m, T);
        return;
      }
      re && _t(f, null, p, "beforeUnmount"), H & 64 ? f.type.remove(
        f,
        p,
        m,
        Ie,
        T
      ) : _ && // #5154
      // when v-once is used inside a block, setBlockTracking(-1) marks the
      // parent block with hasOnce: true
      // so that it doesn't take the fast path during unmount - otherwise
      // components nested in v-once are never unmounted.
      !_.hasOnce && // #1153: fast path should not be taken for non-stable (v-for) fragments
      (S !== de || F > 0 && F & 64) ? ht(
        _,
        p,
        m,
        !1,
        !0
      ) : (S === de && F & 384 || !C && H & 16) && ht(I, p, m), T && Ot(f);
    }
    const pe = Q != null && z == null;
    (ne && (ce = O && O.onVnodeUnmounted) || re || pe) && xe(() => {
      ce && We(ce, p, f), re && _t(f, null, p, "unmounted"), pe && (f.el = null);
    }, m);
  }, Ot = (f) => {
    const { type: p, el: m, anchor: T, transition: C } = f, S = p === de;
    if (S && !C) {
      bn(m, T);
      return;
    }
    if (p === dr) {
      k(f), C && !C.persisted && C.afterLeave && C.afterLeave();
      return;
    }
    const O = S ? zr(f) : f, N = () => {
      S ? d(m) && bn(m, T) : i(m), C && !C.persisted && C.afterLeave && C.afterLeave();
    };
    if (O && O.shapeFlag & 1 && C && !C.persisted) {
      const { leave: I, delayLeave: _ } = C, H = O.el, F = () => I(H, N);
      _ ? _(H, N, F) : F();
    } else
      N();
  }, bn = (f, p) => {
    let m;
    for (; f !== p; )
      m = h(f), i(f), f = m;
    i(p);
  }, Ht = (f, p, m) => {
    const { bum: T, scope: C, job: S, subTree: O, um: N, m: I, a: _ } = f;
    Fo(I), Fo(_), T && An(T), C.stop(), S ? (S.flags |= 8, Ce(O, f, p, m)) : f.vnode.el && O && (O.transition = f.vnode.transition, Ce(O, f, p, m)), N && xe(N, p), xe(() => {
      f.isUnmounted = !0;
    }, p);
  }, ht = (f, p, m, T = !1, C = !1, S = 0) => {
    for (let O = S; O < f.length; O++)
      Ce(f[O], p, m, T, C);
  }, Se = (f) => {
    if (f.shapeFlag & 6)
      return Se(f.component.subTree);
    if (f.shapeFlag & 128)
      return f.suspense.next();
    const p = h(f.anchor || f.el), m = p && p[Zl];
    return m ? h(m) : p;
  }, Le = (f, p, m) => {
    const T = f && p._vnode ? void 0 : f && f.component ? f.component.uid : Va();
    Wl(() => {
      f == null ? p._vnode && Ce(p._vnode, null, null, !0) : w(
        p._vnode || null,
        f,
        p,
        null,
        null,
        null,
        m
      ), p._vnode = f;
    }, T);
  }, Ie = {
    p: w,
    um: Ce,
    m: Me,
    r: Ot,
    mt: K,
    mc: B,
    pc: ee,
    pbc: v,
    n: Se,
    o: e
  };
  return {
    render: Le,
    hydrate: void 0,
    createApp: va(Le)
  };
}
function fr({ type: e, props: t }, r) {
  return r === "svg" && e === "foreignObject" || r === "mathml" && e === "annotation-xml" && t && t.encoding && t.encoding.includes("html") ? void 0 : r;
}
function Ct({ effect: e, job: t }, r) {
  r ? (e.flags |= 32, t.flags |= 4) : (e.flags &= -33, t.flags &= -5);
}
function Fa(e, t) {
  return (!e || e && !e.pendingBranch) && t && !t.persisted;
}
function Ns(e, t, r = !1) {
  const n = e.children, i = t.children;
  if (V(n) && V(i))
    for (let a = 0; a < n.length; a++) {
      const o = n[a];
      let s = i[a];
      s.shapeFlag & 1 && !s.dynamicChildren && ((s.patchFlag <= 0 || s.patchFlag === 32) && (s = i[a] = at(i[a]), s.el = o.el), !r && s.patchFlag !== -2 && Ns(o, s)), s.type === er && (s.patchFlag === -1 && (s = i[a] = at(s)), s.el = o.el), s.type === je && !s.el && (s.el = o.el);
    }
}
function Ba(e) {
  const t = e.slice(), r = [0];
  let n, i, a, o, s;
  const l = e.length;
  for (n = 0; n < l; n++) {
    const u = e[n];
    if (u !== 0) {
      if (i = r[r.length - 1], e[i] < u) {
        t[n] = i, r.push(n);
        continue;
      }
      for (a = 0, o = r.length - 1; a < o; )
        s = a + o >> 1, e[r[s]] < u ? a = s + 1 : o = s;
      u < e[r[a]] && (a > 0 && (t[n] = r[a - 1]), r[a] = n);
    }
  }
  for (a = r.length, o = r[a - 1]; a-- > 0; )
    r[a] = o, o = t[o];
  return r;
}
function Os(e) {
  const t = e.subTree.component;
  if (t)
    return t.asyncDep && !t.asyncResolved ? t : Os(t);
}
function Fo(e) {
  if (e)
    for (let t = 0; t < e.length; t++)
      e[t].flags |= 8;
}
function Qr(e) {
  if (e.placeholder)
    return e.placeholder;
  const t = e.component;
  return t ? Qr(t.subTree) : null;
}
const Fs = (e) => e.__isSuspense;
function Da(e, t) {
  t && t.pendingBranch ? V(e) ? t.effects.push(...e) : t.effects.push(e) : Kl(e);
}
const de = /* @__PURE__ */ Symbol.for("v-fgt"), er = /* @__PURE__ */ Symbol.for("v-txt"), je = /* @__PURE__ */ Symbol.for("v-cmt"), dr = /* @__PURE__ */ Symbol.for("v-stc"), Mt = [];
let Te = null;
function J(e = !1) {
  Mt.push(Te = e ? null : []);
}
function Bs() {
  Mt.pop(), Te = Mt[Mt.length - 1] || null;
}
let un = 1;
function Fn(e, t = !1) {
  un += e, e < 0 && Te && t && (Te.hasOnce = !0);
}
function Ds(e) {
  return e.dynamicChildren = un > 0 ? Te || Et : null, Bs(), un > 0 && Te && Te.push(e), e;
}
function G(e, t, r, n, i, a) {
  return Ds(
    x(
      e,
      t,
      r,
      n,
      i,
      a,
      !0
    )
  );
}
function qa(e, t, r, n, i) {
  return Ds(
    _e(
      e,
      t,
      r,
      n,
      i,
      !0
    )
  );
}
function cn(e) {
  return e ? e.__v_isVNode === !0 : !1;
}
function zt(e, t) {
  return e.type === t.type && e.key === t.key;
}
const qs = ({ key: e }) => e ?? null, Pn = ({
  ref: e,
  ref_key: t,
  ref_for: r
}) => (typeof e == "number" && (e = "" + e), e != null ? ae(e) || /* @__PURE__ */ be(e) || W(e) ? { i: Ne, r: e, k: t, f: !!r } : e : null);
function x(e, t = null, r = null, n = 0, i = null, a = e === de ? 0 : 1, o = !1, s = !1) {
  const l = {
    __v_isVNode: !0,
    __v_skip: !0,
    type: e,
    props: t,
    key: t && qs(t),
    ref: t && Pn(t),
    scopeId: ds,
    slotScopeIds: null,
    children: r,
    component: null,
    suspense: null,
    ssContent: null,
    ssFallback: null,
    dirs: null,
    transition: null,
    el: null,
    anchor: null,
    target: null,
    targetStart: null,
    targetAnchor: null,
    staticCount: 0,
    shapeFlag: a,
    patchFlag: n,
    dynamicProps: i,
    dynamicChildren: null,
    appContext: null,
    ctx: Ne
  };
  return s ? (Bn(l, r), a & 128 && e.normalize(l)) : r && (l.shapeFlag |= ae(r) ? 8 : 16), un > 0 && // avoid a block node from tracking itself
  !o && // has current parent block
  Te && // presence of a patch flag indicates this node needs patching on updates.
  // component nodes also should always be patched, because even if the
  // component doesn't need to update, it needs to persist the instance on to
  // the next vnode so that it can be properly unmounted later.
  (l.patchFlag > 0 || a & 6) && // the EVENTS flag is only for hydration and if it is the only flag, the
  // vnode should not be considered dynamic due to handler caching.
  l.patchFlag !== 32 && Te.push(l), l;
}
const _e = Ua;
function Ua(e, t = null, r = null, n = 0, i = null, a = !1) {
  if ((!e || e === da) && (e = je), cn(e)) {
    const s = $t(
      e,
      t,
      !0
      /* mergeRef: true */
    );
    return r && Bn(s, r), un > 0 && !a && Te && (s.shapeFlag & 6 ? Te[Te.indexOf(e)] = s : Te.push(s)), s.patchFlag = -2, s;
  }
  if (Ya(e) && (e = e.__vccOpts), t) {
    t = $a(t);
    let { class: s, style: l } = t;
    s && !ae(s) && (t.class = Wn(s)), te(l) && (/* @__PURE__ */ ao(l) && !V(l) && (l = ye({}, l)), t.style = to(l));
  }
  const o = ae(e) ? 1 : Fs(e) ? 128 : Yn(e) ? 64 : te(e) ? 4 : W(e) ? 2 : 0;
  return x(
    e,
    t,
    r,
    n,
    i,
    o,
    a,
    !0
  );
}
function $a(e) {
  return e ? /* @__PURE__ */ ao(e) || Ps(e) ? ye({}, e) : e : null;
}
function $t(e, t, r = !1, n = !1) {
  const { props: i, ref: a, patchFlag: o, children: s, transition: l } = e, u = t ? Ha(i || {}, t) : i, c = {
    __v_isVNode: !0,
    __v_skip: !0,
    type: e.type,
    props: u,
    key: u && qs(u),
    ref: t && t.ref ? (
      // #2078 in the case of <component :is="vnode" ref="extra"/>
      // if the vnode itself already has a ref, cloneVNode will need to merge
      // the refs so the single vnode can be set on multiple refs
      r && a ? V(a) ? a.concat(Pn(t)) : [a, Pn(t)] : Pn(t)
    ) : a,
    scopeId: e.scopeId,
    slotScopeIds: e.slotScopeIds,
    children: s,
    target: e.target,
    targetStart: e.targetStart,
    targetAnchor: e.targetAnchor,
    staticCount: e.staticCount,
    shapeFlag: e.shapeFlag,
    // if the vnode is cloned with extra props, we can no longer assume its
    // existing patch flag to be reliable and need to add the FULL_PROPS flag.
    // note: preserve flag for fragments since they use the flag for children
    // fast paths only.
    patchFlag: t && e.type !== de ? o === -1 ? 16 : o | 16 : o,
    dynamicProps: e.dynamicProps,
    dynamicChildren: e.dynamicChildren,
    appContext: e.appContext,
    dirs: e.dirs,
    transition: l,
    // These should technically only be non-null on mounted VNodes. However,
    // they *should* be copied for kept-alive vnodes. So we just always copy
    // them since them being non-null during a mount doesn't affect the logic as
    // they will simply be overwritten.
    component: e.component,
    suspense: e.suspense,
    ssContent: e.ssContent && $t(e.ssContent),
    ssFallback: e.ssFallback && $t(e.ssFallback),
    placeholder: e.placeholder,
    el: e.el,
    anchor: e.anchor,
    ctx: e.ctx,
    ce: e.ce,
    cacheIndex: e.cacheIndex
  };
  return l && n && Rn(
    c,
    l.clone(c)
  ), c;
}
function Ae(e = " ", t = 0) {
  return _e(er, null, e, t);
}
function Ge(e = "", t = !1) {
  return t ? (J(), qa(je, null, e)) : _e(je, null, e);
}
function Xe(e) {
  return e == null || typeof e == "boolean" ? _e(je) : V(e) ? _e(
    de,
    null,
    // #3666, avoid reference pollution when reusing vnode
    e.slice()
  ) : cn(e) ? at(e) : _e(er, null, String(e));
}
function at(e) {
  return e.el === null && e.patchFlag !== -1 || e.memo ? e : $t(e);
}
function Bn(e, t) {
  let r = 0;
  const { shapeFlag: n } = e;
  if (t == null)
    t = null;
  else if (V(t))
    r = 16;
  else if (typeof t == "object")
    if (n & 65) {
      const i = t.default;
      i && (i._c && (i._d = !1), Bn(e, i()), i._c && (i._d = !0));
      return;
    } else {
      r = 32;
      const i = t._;
      !i && !Ps(t) ? t._ctx = Ne : i === 3 && Ne && (Ne.slots._ === 1 ? t._ = 1 : (t._ = 2, e.patchFlag |= 1024));
    }
  else if (W(t)) {
    if (n & 65) {
      Bn(e, { default: t });
      return;
    }
    t = { default: t, _ctx: Ne }, r = 32;
  } else
    t = String(t), n & 64 ? (r = 16, t = [Ae(t)]) : r = 8;
  e.children = t, e.shapeFlag |= r;
}
function Ha(...e) {
  const t = {};
  for (let r = 0; r < e.length; r++) {
    const n = e[r];
    for (const i in n)
      if (i === "class")
        t.class !== n.class && (t.class = Wn([t.class, n.class]));
      else if (i === "style")
        t.style = to([t.style, n.style]);
      else if (Hn(i)) {
        const a = t[i], o = n[i];
        o && a !== o && !(V(a) && a.includes(o)) ? t[i] = a ? [].concat(a, o) : o : o == null && a == null && // mergeProps({ 'onUpdate:modelValue': undefined }) should not retain
        // the model listener.
        !jn(i) && (t[i] = o);
      } else i !== "" && (t[i] = n[i]);
  }
  return t;
}
function We(e, t, r, n = null) {
  He(e, t, 7, [
    r,
    n
  ]);
}
const ja = _s();
let Us = 0;
function Va() {
  return Us;
}
function za(e, t, r) {
  const n = e.type, i = (t ? t.appContext : e.appContext) || ja, a = {
    uid: Us++,
    vnode: e,
    type: n,
    parent: t,
    appContext: i,
    root: null,
    // to be immediately set
    next: null,
    subTree: null,
    // will be set synchronously right after creation
    effect: null,
    update: null,
    // will be set synchronously right after creation
    job: null,
    scope: new yl(
      !0
      /* detached */
    ),
    render: null,
    proxy: null,
    exposed: null,
    exposeProxy: null,
    withProxy: null,
    provides: t ? t.provides : Object.create(i.provides),
    ids: t ? t.ids : ["", 0, 0],
    accessCache: null,
    renderCache: [],
    // local resolved assets
    components: null,
    directives: null,
    // resolved props and emits options
    propsOptions: Ms(n, i),
    emitsOptions: Cs(n, i),
    // emit
    emit: null,
    // to be set immediately
    emitted: null,
    // props default value
    propsDefaults: oe,
    // inheritAttrs
    inheritAttrs: n.inheritAttrs,
    // state
    ctx: oe,
    data: oe,
    props: oe,
    attrs: oe,
    slots: oe,
    refs: oe,
    setupState: oe,
    setupContext: null,
    // suspense related
    suspense: r,
    suspenseId: r ? r.pendingId : 0,
    asyncDep: null,
    asyncResolved: !1,
    // lifecycle hooks
    // not using enums here because it results in computed properties
    isMounted: !1,
    isUnmounted: !1,
    isDeactivated: !1,
    bc: null,
    c: null,
    bm: null,
    m: null,
    bu: null,
    u: null,
    um: null,
    bum: null,
    da: null,
    a: null,
    rtg: null,
    rtc: null,
    ec: null,
    sp: null
  };
  return a.ctx = { _: a }, a.root = t ? t.root : a, a.emit = _a.bind(null, a), e.ce && e.ce(a), a;
}
let ke = null;
const Ka = () => ke || Ne;
let Dn, fn;
{
  const e = Kn(), t = (r, n) => {
    let i;
    return (i = e[r]) || (i = e[r] = []), i.push(n), (a) => {
      i.length > 1 ? i.forEach((o) => o(a)) : i[0](a);
    };
  };
  Dn = t(
    "__VUE_INSTANCE_SETTERS__",
    (r) => ke = r
  ), fn = t(
    "__VUE_SSR_SETTERS__",
    (r) => dn = r
  );
}
const mn = (e) => {
  const t = ke;
  return Dn(e), e.scope.on(), () => {
    e.scope.off(), Dn(t);
  };
}, Bo = () => {
  ke && ke.scope.off(), Dn(null);
};
function $s(e) {
  return e.vnode.shapeFlag & 4;
}
let dn = !1;
function Wa(e, t = !1, r = !1) {
  t && fn(t);
  const { props: n, children: i } = e.vnode, a = $s(e);
  Pa(e, n, a, t), Ia(e, i, r || t);
  const o = a ? Ja(e, t) : void 0;
  return t && fn(!1), o;
}
function Ja(e, t) {
  const r = e.type;
  e.accessCache = /* @__PURE__ */ Object.create(null), e.proxy = new Proxy(e.ctx, pa);
  const { setup: n } = r;
  if (n) {
    nt();
    const i = e.setupContext = n.length > 1 ? Qa(e) : null, a = mn(e), o = gn(
      n,
      e,
      0,
      [
        e.props,
        i
      ]
    ), s = Fi(o);
    if (rt(), a(), (s || e.sp) && !nn(e) && ms(e), s) {
      if (o.then(Bo, Bo), t)
        return o.then((l) => {
          fn(!0);
          try {
            Do(e, l, t);
          } finally {
            fn(!1);
          }
        }).catch((l) => {
          Qn(l, e, 0);
        });
      e.asyncDep = o;
    } else
      Do(e, o);
  } else
    Hs(e);
}
function Do(e, t, r) {
  W(t) ? e.type.__ssrInlineRender ? e.ssrRender = t : e.render = t : te(t) && (e.setupState = ss(t)), Hs(e);
}
function Hs(e, t, r) {
  const n = e.type;
  e.render || (e.render = n.render || et);
  {
    const i = mn(e);
    nt();
    try {
      ha(e);
    } finally {
      rt(), i();
    }
  }
}
const Ga = {
  get(e, t) {
    return me(e, "get", ""), e[t];
  }
};
function Qa(e) {
  const t = (r) => {
    e.exposed = r || {};
  };
  return {
    attrs: new Proxy(e.attrs, Ga),
    slots: e.slots,
    emit: e.emit,
    expose: t
  };
}
function tr(e) {
  return e.exposed ? e.exposeProxy || (e.exposeProxy = new Proxy(ss(Fl(e.exposed)), {
    get(t, r) {
      if (r in t)
        return t[r];
      if (r in rn)
        return rn[r](e);
    },
    has(t, r) {
      return r in t || r in rn;
    }
  })) : e.proxy;
}
function Ya(e) {
  return W(e) && "__vccOpts" in e;
}
const ft = (e, t) => /* @__PURE__ */ $l(e, t, dn);
function pn(e, t, r) {
  try {
    Fn(-1);
    const n = arguments.length;
    return n === 2 ? te(t) && !V(t) ? cn(t) ? _e(e, null, [t]) : _e(e, t) : _e(e, null, t) : (n > 3 ? r = Array.prototype.slice.call(arguments, 2) : n === 3 && cn(r) && (r = [r]), _e(e, t, r));
  } finally {
    Fn(1);
  }
}
const Xa = "3.5.44";
let Yr;
const qo = typeof window < "u" && window.trustedTypes;
if (qo)
  try {
    Yr = /* @__PURE__ */ qo.createPolicy("vue", {
      createHTML: (e) => e
    });
  } catch {
  }
const js = Yr ? (e) => Yr.createHTML(e) : (e) => e, Za = "http://www.w3.org/2000/svg", eu = "http://www.w3.org/1998/Math/MathML", lt = typeof document < "u" ? document : null, Uo = lt && /* @__PURE__ */ lt.createElement("template"), tu = {
  insert: (e, t, r) => {
    t.insertBefore(e, r || null);
  },
  remove: (e) => {
    const t = e.parentNode;
    t && t.removeChild(e);
  },
  createElement: (e, t, r, n) => {
    const i = t === "svg" ? lt.createElementNS(Za, e) : t === "mathml" ? lt.createElementNS(eu, e) : r ? lt.createElement(e, { is: r }) : lt.createElement(e);
    return e === "select" && n && n.multiple != null && i.setAttribute("multiple", n.multiple), i;
  },
  createText: (e) => lt.createTextNode(e),
  createComment: (e) => lt.createComment(e),
  setText: (e, t) => {
    e.nodeValue = t;
  },
  setElementText: (e, t) => {
    e.textContent = t;
  },
  parentNode: (e) => e.parentNode,
  nextSibling: (e) => e.nextSibling,
  querySelector: (e) => lt.querySelector(e),
  setScopeId(e, t) {
    e.setAttribute(t, "");
  },
  // __UNSAFE__
  // Reason: innerHTML.
  // Static content here can only come from compiled templates.
  // As long as the user only uses trusted templates, this is safe.
  insertStaticContent(e, t, r, n, i, a) {
    const o = r ? r.previousSibling : t.lastChild;
    if (i && (i === a || i.nextSibling))
      for (; t.insertBefore(i.cloneNode(!0), r), !(i === a || !(i = i.nextSibling)); )
        ;
    else {
      Uo.innerHTML = js(
        n === "svg" ? `<svg>${e}</svg>` : n === "mathml" ? `<math>${e}</math>` : e
      );
      const s = Uo.content;
      if (n === "svg" || n === "mathml") {
        const l = s.firstChild;
        for (; l.firstChild; )
          s.appendChild(l.firstChild);
        s.removeChild(l);
      }
      t.insertBefore(s, r);
    }
    return [
      // first
      o ? o.nextSibling : t.firstChild,
      // last
      r ? r.previousSibling : t.lastChild
    ];
  }
}, nu = /* @__PURE__ */ Symbol("_vtc");
function ru(e, t, r) {
  const n = e[nu];
  n && (t = (t ? [t, ...n] : [...n]).join(" ")), t == null ? e.removeAttribute("class") : r ? e.setAttribute("class", t) : e.className = t;
}
const $o = /* @__PURE__ */ Symbol("_vod"), ou = /* @__PURE__ */ Symbol("_vsh"), iu = /* @__PURE__ */ Symbol(""), su = /(?:^|;)\s*display\s*:/;
function lu(e, t, r) {
  const n = e.style, i = ae(r);
  let a = !1;
  if (r && !i) {
    if (t)
      if (ae(t))
        for (const o of t.split(";")) {
          const s = o.slice(0, o.indexOf(":")).trim();
          r[s] == null && Gt(n, s, "");
        }
      else
        for (const o in t)
          r[o] == null && Gt(n, o, "");
    for (const o in r) {
      o === "display" && (a = !0);
      const s = r[o];
      s != null ? uu(
        e,
        o,
        !ae(t) && t ? t[o] : void 0,
        s
      ) || Gt(n, o, s) : Gt(n, o, "");
    }
  } else if (i) {
    if (t !== r) {
      const o = n[iu];
      o && (r += ";" + o), n.cssText = r, a = su.test(r);
    }
  } else t && e.removeAttribute("style");
  $o in e && ((!i || t !== r) && (e[$o] = a ? n.display : ""), e[ou] && (n.display = "none"));
}
const _n = /\s*!important$/;
function Gt(e, t, r) {
  if (V(r))
    r.forEach((n) => Gt(e, t, n));
  else if (r == null && (r = ""), t.startsWith("--"))
    _n.test(r) ? e.setProperty(t, r.replace(_n, ""), "important") : e.setProperty(t, r);
  else {
    const n = au(e, t);
    _n.test(r) ? e.setProperty(
      It(n),
      r.replace(_n, ""),
      "important"
    ) : e[n] = r;
  }
}
const Ho = ["Webkit", "Moz", "ms"], pr = {};
function au(e, t) {
  const r = pr[t];
  if (r)
    return r;
  let n = Ue(t);
  if (n !== "filter" && n in e)
    return pr[t] = n;
  n = qi(n);
  for (let i = 0; i < Ho.length; i++) {
    const a = Ho[i] + n;
    if (a in e)
      return pr[t] = a;
  }
  return t;
}
function uu(e, t, r, n) {
  return e.tagName === "TEXTAREA" && (t === "width" || t === "height") && ae(n) && r === n;
}
const jo = "http://www.w3.org/1999/xlink";
function Vo(e, t, r, n, i, a = hl(t)) {
  n && t.startsWith("xlink:") ? r == null ? e.removeAttributeNS(jo, t.slice(6, t.length)) : e.setAttributeNS(jo, t, r) : r == null || a && !$i(r) ? e.removeAttribute(t) : e.setAttribute(
    t,
    a ? "" : tt(r) ? String(r) : r
  );
}
function zo(e, t, r, n, i) {
  if (t === "innerHTML" || t === "textContent") {
    r != null && (e[t] = t === "innerHTML" ? js(r) : r);
    return;
  }
  const a = e.tagName;
  if (t === "value" && a !== "PROGRESS" && // custom elements may use _value internally
  !a.includes("-")) {
    const s = a === "OPTION" ? e.getAttribute("value") || "" : e.value, l = r == null ? (
      // #11647: value should be set as empty string for null and undefined,
      // but <input type="checkbox"> should be set as 'on'.
      e.type === "checkbox" ? "on" : ""
    ) : String(r);
    (s !== l || !("_value" in e)) && (e.value = l), r == null && e.removeAttribute(t), e._value = r;
    return;
  }
  let o = !1;
  if (r === "" || r == null) {
    const s = typeof e[t];
    s === "boolean" ? r = $i(r) : r == null && s === "string" ? (r = "", o = !0) : s === "number" && (r = 0, o = !0);
  }
  try {
    e[t] = r;
  } catch {
  }
  o && e.removeAttribute(i || t);
}
function xt(e, t, r, n) {
  e.addEventListener(t, r, n);
}
function cu(e, t, r, n) {
  e.removeEventListener(t, r, n);
}
const Ko = /* @__PURE__ */ Symbol("_vei");
function fu(e, t, r, n, i = null) {
  const a = e[Ko] || (e[Ko] = {}), o = a[t];
  if (n && o)
    o.value = n;
  else {
    const [s, l] = hu(t);
    if (n) {
      const u = a[t] = bu(
        n,
        i
      );
      xt(e, s, u, l);
    } else o && (cu(e, s, o, l), a[t] = void 0);
  }
}
const du = /(Once|Passive|Capture)$/, pu = /^on:?(?:Once|Passive|Capture)$/;
function hu(e) {
  let t, r;
  for (; (r = e.match(du)) && !pu.test(e); )
    t || (t = {}), e = e.slice(0, e.length - r[1].length), t[r[1].toLowerCase()] = !0;
  return [e[2] === ":" ? e.slice(3) : It(e.slice(2)), t];
}
let hr = 0;
const gu = /* @__PURE__ */ Promise.resolve(), mu = () => hr || (gu.then(() => hr = 0), hr = Date.now());
function bu(e, t) {
  const r = (n) => {
    if (!n._vts)
      n._vts = Date.now();
    else if (n._vts <= r.attached)
      return;
    const i = r.value;
    if (V(i)) {
      const a = n.stopImmediatePropagation;
      n.stopImmediatePropagation = () => {
        a.call(n), n._stopped = !0;
      };
      const o = i.slice(), s = [n];
      for (let l = 0; l < o.length && !n._stopped; l++) {
        const u = o[l];
        u && He(
          u,
          t,
          5,
          s
        );
      }
    } else
      He(
        i,
        t,
        5,
        [n]
      );
  };
  return r.value = e, r.attached = mu(), r;
}
const Wo = (e) => e.charCodeAt(0) === 111 && e.charCodeAt(1) === 110 && // lowercase letter
e.charCodeAt(2) > 96 && e.charCodeAt(2) < 123, yu = (e, t, r, n, i, a) => {
  const o = i === "svg";
  t === "class" ? ru(e, n, o) : t === "style" ? lu(e, r, n) : Hn(t) ? jn(t) || fu(e, t, r, n, a) : (t[0] === "." ? (t = t.slice(1), !0) : t[0] === "^" ? (t = t.slice(1), !1) : wu(e, t, n, o)) ? (zo(e, t, n), !e.tagName.includes("-") && (t === "value" || t === "checked" || t === "selected") && Vo(e, t, n, o, a, t !== "value")) : /* #11081 force set props for possible async custom element */ e._isVueCE && // #12408 check if it's declared prop or it's async custom element
  (vu(e, t) || // @ts-expect-error _def is private
  e._def.__asyncLoader && (/[A-Z]/.test(t) || !ae(n))) ? zo(e, Ue(t), n, a, t) : (t === "true-value" ? e._trueValue = n : t === "false-value" && (e._falseValue = n), Vo(e, t, n, o));
};
function wu(e, t, r, n) {
  if (n)
    return !!(t === "innerHTML" || t === "textContent" || t in e && Wo(t) && W(r));
  if (t === "spellcheck" || t === "draggable" || t === "translate" || t === "autocorrect" || t === "sandbox" && e.tagName === "IFRAME" || t === "form" || t === "list" && e.tagName === "INPUT" || t === "type" && e.tagName === "TEXTAREA")
    return !1;
  if (t === "width" || t === "height") {
    const i = e.tagName;
    if (i === "IMG" || i === "VIDEO" || i === "CANVAS" || i === "SOURCE")
      return !1;
  }
  return Wo(t) && ae(r) ? !1 : t in e;
}
function vu(e, t) {
  const r = (
    // @ts-expect-error _def is private
    e._def.props
  );
  if (!r)
    return !1;
  const n = Ue(t);
  return Array.isArray(r) ? r.some((i) => Ue(i) === n) : Object.keys(r).some((i) => Ue(i) === n);
}
const qn = (e) => {
  const t = e.props["onUpdate:modelValue"] || !1;
  return V(t) ? (r) => An(t, r) : t;
};
function ku(e) {
  e.target.composing = !0;
}
function Jo(e) {
  const t = e.target;
  t.composing && (t.composing = !1, t.dispatchEvent(new Event("input")));
}
const Pt = /* @__PURE__ */ Symbol("_assign"), Cn = /* @__PURE__ */ Symbol("_initialValue");
function gr(e, t, r) {
  return t && (e = e.trim()), r && (e = zn(e)), e;
}
const At = {
  created(e, { modifiers: { lazy: t, trim: r, number: n } }, i) {
    e.parentNode && (e.type === "text" ? e[Cn] = e.defaultValue.replace(/[\r\n]/g, "") : e.type === "textarea" && (e[Cn] = e.defaultValue.replace(/\r\n?/g, `
`))), e[Pt] = qn(i);
    const a = n || i.props && i.props.type === "number";
    xt(e, t ? "change" : "input", (o) => {
      o.target.composing || e[Pt](gr(e.value, r, a));
    }), (r || a) && xt(e, "change", () => {
      e.value = gr(e.value, r, a);
    }), t || (xt(e, "compositionstart", ku), xt(e, "compositionend", Jo), xt(e, "change", Jo));
  },
  // set value on mounted so it's after min/max for type="range"
  mounted(e, { value: t, modifiers: { trim: r, number: n } }) {
    const i = t ?? "", a = e[Cn];
    delete e[Cn], a !== void 0 && (e.type === "text" || e.type === "textarea") && e.value !== a ? e[Pt](gr(e.value, r, n)) : e.value = i;
  },
  beforeUpdate(e, { value: t, oldValue: r, modifiers: { lazy: n, trim: i, number: a } }, o) {
    if (e[Pt] = qn(o), e.composing) return;
    const s = (a || e.type === "number") && !/^0\d/.test(e.value) ? zn(e.value) : e.value, l = t ?? "";
    if (s === l)
      return;
    const u = e.getRootNode();
    (u instanceof Document || u instanceof ShadowRoot) && u.activeElement === e && e.type !== "range" && (n && t === r || i && e.value.trim() === l) || (e.value = l);
  }
}, on = {
  // <select multiple> value need to be deep traversed
  deep: !0,
  created(e, { value: t, modifiers: { number: r } }, n) {
    e._modelValue = t, xt(e, "change", () => {
      const i = Array.prototype.filter.call(e.options, (l) => l.selected).map(
        (l) => r ? zn(Un(l)) : Un(l)
      ), a = e.multiple, o = a ? Lt(e._modelValue) ? new Set(i) : i : i[0], s = e._pendingValue = [
        a,
        a ? V(o) ? i.slice() : i : o
      ];
      try {
        e[Pt](o);
      } finally {
        Ln(() => {
          e._pendingValue === s && (e._pendingValue = void 0);
        });
      }
    }), e[Pt] = qn(n);
  },
  // set value in mounted & updated because <select> relies on its children
  // <option>s.
  mounted(e, { value: t }) {
    Go(e, t);
  },
  beforeUpdate(e, { value: t }, r) {
    e._modelValue = t, e[Pt] = qn(r);
  },
  updated(e, { value: t }) {
    const r = e._pendingValue;
    e._pendingValue = void 0, (!r || r[0] !== e.multiple || !_u(t, r[1], r[0])) && Go(e, t);
  }
};
function _u(e, t, r) {
  if (!r || V(e)) return wt(e, t);
  if (Lt(e)) {
    if (e.size !== t.length) return !1;
    for (const n of t)
      if (!e.has(n)) return !1;
    return !0;
  }
  return !1;
}
function Go(e, t) {
  const r = e.multiple, n = V(t);
  if (!(r && !n && !Lt(t))) {
    for (let i = 0, a = e.options.length; i < a; i++) {
      const o = e.options[i], s = Un(o);
      if (r)
        if (n) {
          const l = typeof s;
          l === "string" || l === "number" ? o.selected = t.some((u) => String(u) === String(s)) : o.selected = bl(t, s) > -1;
        } else
          o.selected = t.has(s);
      else if (wt(Un(o), t)) {
        e.selectedIndex !== i && (e.selectedIndex = i);
        return;
      }
    }
    !r && e.selectedIndex !== -1 && (e.selectedIndex = -1);
  }
}
function Un(e) {
  return "_value" in e ? e._value : e.value;
}
const Cu = ["ctrl", "shift", "alt", "meta"], Su = {
  stop: (e) => e.stopPropagation(),
  prevent: (e) => e.preventDefault(),
  self: (e) => e.target !== e.currentTarget,
  ctrl: (e) => !e.ctrlKey,
  shift: (e) => !e.shiftKey,
  alt: (e) => !e.altKey,
  meta: (e) => !e.metaKey,
  left: (e) => "button" in e && e.button !== 0,
  middle: (e) => "button" in e && e.button !== 1,
  right: (e) => "button" in e && e.button !== 2,
  exact: (e, t) => Cu.some((r) => e[`${r}Key`] && !t.includes(r))
}, Sn = (e, t) => {
  if (!e) return e;
  const r = e._withMods || (e._withMods = {}), n = t.join(".");
  return r[n] || (r[n] = ((i, ...a) => {
    for (let o = 0; o < t.length; o++) {
      const s = Su[t[o]];
      if (s && s(i, t)) return;
    }
    return e(i, ...a);
  }));
}, xu = /* @__PURE__ */ ye({ patchProp: yu }, tu);
let Qo;
function Au() {
  return Qo || (Qo = Na(xu));
}
const Yo = ((...e) => {
  const t = Au().createApp(...e), { mount: r } = t;
  return t.mount = (n) => {
    const i = Pu(n);
    if (!i) return;
    const a = t._component;
    !W(a) && !a.render && !a.template && (a.template = i.innerHTML), i.nodeType === 1 && (i.textContent = "");
    const o = r(i, !1, Eu(i));
    return i instanceof Element && (i.removeAttribute("v-cloak"), i.setAttribute("data-v-app", "")), o;
  }, t;
});
function Eu(e) {
  if (e instanceof SVGElement)
    return "svg";
  if (typeof MathMLElement == "function" && e instanceof MathMLElement)
    return "mathml";
}
function Pu(e) {
  return ae(e) ? document.querySelector(e) : e;
}
const Tu = (e) => {
  for (const t in e)
    if (t.startsWith("aria-") || t === "role" || t === "title")
      return !0;
  return !1;
};
const Xo = (e) => e === "";
const Mu = (...e) => e.filter((t, r, n) => !!t && t.trim() !== "" && n.indexOf(t) === r).join(" ").trim();
const Zo = (e) => e.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase();
const Lu = (e) => e.replace(
  /^([A-Z])|[\s-_]+(\w)/g,
  (t, r, n) => n ? n.toUpperCase() : r.toLowerCase()
);
const Iu = (e) => {
  const t = Lu(e);
  return t.charAt(0).toUpperCase() + t.slice(1);
};
var Kt = {
  xmlns: "http://www.w3.org/2000/svg",
  width: 24,
  height: 24,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": 2,
  "stroke-linecap": "round",
  "stroke-linejoin": "round"
};
const Ru = ({
  name: e,
  iconNode: t,
  absoluteStrokeWidth: r,
  "absolute-stroke-width": n,
  strokeWidth: i,
  "stroke-width": a,
  size: o = Kt.width,
  color: s = Kt.stroke,
  ...l
}, { slots: u }) => pn(
  "svg",
  {
    ...Kt,
    ...l,
    width: o,
    height: o,
    stroke: s,
    "stroke-width": Xo(r) || Xo(n) || r === !0 || n === !0 ? Number(i || a || Kt["stroke-width"]) * 24 / Number(o) : i || a || Kt["stroke-width"],
    class: Mu(
      "lucide",
      l.class,
      ...e ? [`lucide-${Zo(Iu(e))}-icon`, `lucide-${Zo(e)}`] : ["lucide-icon"]
    ),
    ...!u.default && !Tu(l) && { "aria-hidden": "true" }
  },
  [...t.map((c) => pn(...c)), ...u.default ? [u.default()] : []]
);
const Vs = (e, t) => (r, { slots: n, attrs: i }) => pn(
  Ru,
  {
    ...i,
    ...r,
    iconNode: t,
    name: e
  },
  n
);
const Nu = Vs("printer", [
  [
    "path",
    {
      d: "M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2",
      key: "143wyd"
    }
  ],
  ["path", { d: "M6 9V3a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v6", key: "1itne7" }],
  ["rect", { x: "6", y: "14", width: "12", height: "8", rx: "1", key: "1ue0tg" }]
]);
const Ou = Vs("qr-code", [
  ["rect", { width: "5", height: "5", x: "3", y: "3", rx: "1", key: "1tu5fj" }],
  ["rect", { width: "5", height: "5", x: "16", y: "3", rx: "1", key: "1v8r4q" }],
  ["rect", { width: "5", height: "5", x: "3", y: "16", rx: "1", key: "1x03jg" }],
  ["path", { d: "M21 16h-3a2 2 0 0 0-2 2v3", key: "177gqh" }],
  ["path", { d: "M21 21v.01", key: "ents32" }],
  ["path", { d: "M12 7v3a2 2 0 0 1-2 2H7", key: "8crl2c" }],
  ["path", { d: "M3 12h.01", key: "nlz23k" }],
  ["path", { d: "M12 3h.01", key: "n36tog" }],
  ["path", { d: "M12 16v.01", key: "133mhm" }],
  ["path", { d: "M16 12h1", key: "1slzba" }],
  ["path", { d: "M21 12v.01", key: "1lwtk9" }],
  ["path", { d: "M12 21v-1", key: "1880an" }]
]);
function Fu(e) {
  return !!e?.displayUom && e.displayUom !== e.stockUom && Number.isFinite(e.qtyInPack) && e.qtyInPack > 0;
}
function zs(e) {
  return e.skipPrepacking ? e.postpacking : e.prepacking;
}
function Ks(e) {
  const t = Number(zs(e)?.goodQty), r = Fu(e) ? e.qtyInPack : 1;
  return Math.max(1, Math.ceil(t / r - 1e-8));
}
const ge = /* @__PURE__ */ Gn({ workOrder: "", labelCount: 0, afterSave: "" });
function Ws(e, t, r = "") {
  ge.workOrder = e, ge.labelCount = t, ge.afterSave = r;
}
const Js = (e, t) => {
  const r = e.__vccOpts || e;
  for (const [n, i] of t)
    r[n] = i;
  return r;
}, Bu = {
  key: 0,
  class: "toolbar ws-label-actions"
}, Du = {
  __name: "WorkOrderLabelButton",
  props: { workOrder: { type: Object, required: !0 } },
  setup(e) {
    return (t, r) => fe(zs)(e.workOrder)?.confirmed ? (J(), G("div", Bu, [
      x("button", {
        class: "btn ws-label-print",
        type: "button",
        onClick: r[0] || (r[0] = (n) => fe(Ws)(e.workOrder.id, fe(Ks)(e.workOrder)))
      }, [
        _e(fe(Nu), {
          size: 14,
          "stroke-width": 2
        }),
        r[1] || (r[1] = Ae(" Cetak Label ", -1))
      ])
    ])) : Ge("", !0);
  }
}, qu = /* @__PURE__ */ Js(Du, [["__scopeId", "data-v-c9012b16"]]);
function Gs(e) {
  return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default") ? e.default : e;
}
function Uu(e) {
  if (Object.prototype.hasOwnProperty.call(e, "__esModule")) return e;
  var t = e.default;
  if (typeof t == "function") {
    var r = function n() {
      var i = !1;
      try {
        i = this instanceof n;
      } catch {
      }
      return i ? Reflect.construct(t, arguments, this.constructor) : t.apply(this, arguments);
    };
    r.prototype = t.prototype;
  } else r = {};
  return Object.defineProperty(r, "__esModule", { value: !0 }), Object.keys(e).forEach(function(n) {
    var i = Object.getOwnPropertyDescriptor(e, n);
    Object.defineProperty(r, n, i.get ? i : {
      enumerable: !0,
      get: function() {
        return e[n];
      }
    });
  }), r;
}
function $u(e) {
  throw new Error('Could not dynamically require "' + e + '". Please configure the dynamicRequireTargets or/and ignoreDynamicRequires option of @rollup/plugin-commonjs appropriately for this require call to work.');
}
var mr = { exports: {} };
const Hu = {}, ju = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Hu
}, Symbol.toStringTag, { value: "Module" })), Vu = /* @__PURE__ */ Uu(ju);
var ei;
function zu() {
  return ei || (ei = 1, (function(e, t) {
    var r = (function() {
      Array.isArray || (Array.isArray = function(o) {
        return Object.prototype.toString.call(o) === "[object Array]";
      }), Number.isInteger || (Number.isInteger = function(o) {
        return typeof o == "number" && isFinite(o) && Math.floor(o) === o;
      }), Array.from || (Array.from = function(o) {
        return [].slice.call(o);
      }), String.prototype.padStart || (String.prototype.padStart = function(s, l) {
        if (s = s >> 0, l = String(typeof l < "u" ? l : " "), this.length >= s)
          return String(this);
        for (var u = s - this.length, c = ""; c.length < u; )
          c += l;
        return c.slice(0, u) + String(this);
      });
      var n = {
        TITLE: "QZ Tray",
        VERSION: "2.2.6",
        //must match @version above
        DEBUG: !1,
        log: {
          /** Debugging messages */
          trace: function() {
            n.DEBUG && console.log.apply(console, arguments);
          },
          /** General messages */
          info: function() {
            console.info.apply(console, arguments);
          },
          /** General warnings */
          warn: function() {
            console.warn.apply(console, arguments);
          },
          /** Debugging errors */
          allay: function() {
            n.DEBUG && console.warn.apply(console, arguments);
          },
          /** General errors */
          error: function() {
            console.error.apply(console, arguments);
          }
        },
        //stream types
        streams: {
          serial: "SERIAL",
          usb: "USB",
          hid: "HID",
          printer: "PRINTER",
          file: "FILE",
          socket: "SOCKET"
        },
        websocket: {
          /** The actual websocket object managing the connection. */
          connection: null,
          /** Track if a connection attempt is being cancelled. */
          shutdown: !1,
          /** Default parameters used on new connections. Override values using options parameter on {@link qz.websocket.connect}. */
          connectConfig: {
            host: ["localhost", "localhost.qz.io"],
            //hosts QZ Tray can be running on
            hostIndex: 0,
            //internal var - index on host array
            usingSecure: !0,
            //boolean use of secure protocol
            usingSurf: !0,
            //append suffix to non-qualified hostnames
            surfDomain: "qz.surf",
            //surf suffix to append
            protocol: {
              secure: "wss://",
              //secure websocket
              insecure: "ws://"
              //insecure websocket
            },
            port: {
              secure: [8181, 8282, 8383, 8484],
              //list of secure ports QZ Tray could be listening on
              insecure: [8182, 8283, 8384, 8485],
              //list of insecure ports QZ Tray could be listening on
              portIndex: 0
              //internal var - index on active port array
            },
            keepAlive: 60,
            //time between pings to keep connection alive, in seconds
            retries: 0,
            //number of times to reconnect before failing
            delay: 0
            //seconds before firing a connection
          },
          setup: {
            webSocketPromise: function(o) {
              var s, l, u;
              return n.tools.promise(function(c, d) {
                s = new n.tools.ws(o), n.websocket.connection = s, u = function() {
                  c(s);
                }, l = function(h) {
                  n.websocket.connection = null, d(h);
                }, s.addEventListener("open", u), s.addEventListener("error", l), s.addEventListener("close", l);
              }).finally(function() {
                s.removeEventListener("open", u), s.removeEventListener("error", l), s.removeEventListener("close", l);
              });
            },
            connectToAddress: function(o) {
              var s = n.tools.getLna();
              n.log.trace("Attempting connection", o);
              var l;
              return s ? (n.log.trace("Connecting with lna.js"), l = s.detectLna(o, n.websocket.setup.webSocketPromise, {
                isWebSocket: !0,
                defaultAddressSpace: "public"
              })) : (n.log.trace("Connecting without lna.js"), l = n.websocket.setup.webSocketPromise(o)), l.catch(function(u) {
                var c = u.denied ? "Connection attempt denied by Local Network Access restrictions" : "Unable to establish connection with " + n.TITLE, d = new Error(c);
                throw s && u instanceof s.LnaError && (d.denied = u.denied, d.permission = u.permission), d;
              });
            },
            /** Loop through possible ports to open connection, sets web socket calls that will settle the promise. */
            findConnection: function(o, s, l) {
              if (n.websocket.shutdown) {
                l(new Error("Connection attempt cancelled by user"));
                return;
              }
              if (o.port.secure.length)
                !o.port.insecure.length && !o.usingSecure && (n.log.trace("No insecure ports specified - forcing secure connection"), o.usingSecure = !0);
              else if (o.port.insecure.length)
                o.usingSecure && (n.log.error("No secure ports specified - forcing insecure connection"), o.usingSecure = !1);
              else {
                l(new Error("No ports have been specified to connect over"));
                return;
              }
              var u = function(h) {
                if (n.websocket.shutdown) {
                  l(new Error("Connection attempt cancelled by user"));
                  return;
                }
                if (h.denied) {
                  l(h);
                  return;
                }
                if (o.port.portIndex++, o.usingSecure && o.port.portIndex >= o.port.secure.length || !o.usingSecure && o.port.portIndex >= o.port.insecure.length)
                  if (o.hostIndex >= o.host.length - 1) {
                    l(h);
                    return;
                  } else
                    o.hostIndex++, o.port.portIndex = 0;
                n.websocket.setup.findConnection(o, s, l);
              }, c;
              o.usingSecure ? c = o.protocol.secure + o.host[o.hostIndex] + ":" + o.port.secure[o.port.portIndex] : c = o.protocol.insecure + o.host[o.hostIndex] + ":" + o.port.insecure[o.port.portIndex];
              var d = n.websocket.setup.connectToAddress(c);
              d.then(
                //called on successful connection to qz, begins setup of websocket calls and resolves connect promise after certificate is sent
                function() {
                  if (n.log.info("Established connection with " + n.TITLE + " on " + c), n.websocket.setup.openConnection({ resolve: s, reject: l }), o.keepAlive > 0) {
                    var h = setInterval(function() {
                      if (!n.tools.isActive() || n.websocket.connection.interval !== h) {
                        clearInterval(h);
                        return;
                      }
                      n.websocket.connection.send("ping");
                    }, o.keepAlive * 1e3);
                    n.websocket.connection.interval = h;
                  }
                },
                //called for errors during setup (such as invalid ports), reject connect promise only if all ports have been tried
                function(h) {
                  n.log.trace(h), u(h);
                }
              );
            },
            /** Finish setting calls on successful connection, sets web socket calls that won't settle the promise. */
            openConnection: function(o) {
              n.websocket.connection.onclose = function(l) {
                n.log.trace(l), n.websocket.connection = null, n.websocket.callClose(l), n.log.info("Closed connection with " + n.TITLE);
                for (var u in n.websocket.pendingCalls)
                  n.websocket.pendingCalls.hasOwnProperty(u) && n.websocket.pendingCalls[u].reject(new Error("Connection closed before response received"));
                this.promise != null && this.promise.resolve();
              }, n.websocket.connection.onerror = function(l) {
                n.websocket.callError(l);
              }, n.websocket.connection.sendData = function(l) {
                n.log.trace("Preparing object for websocket", l), l.timestamp == null && (l.timestamp = Date.now(), typeof l.timestamp != "number" && (l.timestamp = (/* @__PURE__ */ new Date()).getTime())), l.promise != null && (l.uid = n.websocket.setup.newUID(), n.websocket.pendingCalls[l.uid] = l.promise), l.position = {
                  x: typeof screen < "u" ? (screen.availWidth || screen.width) / 2 + (screen.left || screen.availLeft || 0) : 0,
                  y: typeof screen < "u" ? (screen.availHeight || screen.height) / 2 + (screen.top || screen.availTop || 0) : 0
                };
                try {
                  if (l.call != null && l.signature == null && n.security.needsSigned(l.call)) {
                    var u = {
                      call: l.call,
                      params: l.params,
                      timestamp: l.timestamp
                    }, c = n.tools.hash(n.tools.stringify(u));
                    c.then || (c = n.tools.promise(function(d) {
                      d(c);
                    })), c.then(function(d) {
                      return n.security.callSign(d);
                    }).then(function(d) {
                      n.log.trace("Signature for call", d), l.signature = d || "", l.signAlgorithm = n.security.signAlgorithm, n.signContent = void 0, n.websocket.connection.send(n.tools.stringify(l));
                    }).catch(function(d) {
                      n.log.error("Signing failed", d), l.promise != null && (l.promise.reject(new Error("Failed to sign request")), delete n.websocket.pendingCalls[l.uid]);
                    });
                  } else
                    n.log.trace("Signature for call", l.signature), n.websocket.connection.send(n.tools.stringify(l));
                } catch (d) {
                  n.log.error(d), l.promise != null && (l.promise.reject(d), delete n.websocket.pendingCalls[l.uid]);
                }
              }, n.websocket.connection.onmessage = function(l) {
                var u = JSON.parse(l.data);
                if (u.uid == null) {
                  if (u.type == null)
                    n.websocket.connection.close(4003, "Connected to incompatible " + n.TITLE + " version");
                  else
                    switch (u.type) {
                      case n.streams.serial:
                        u.event || (u.event = JSON.stringify({ portName: u.key, output: u.data })), n.serial.callSerial(JSON.parse(u.event));
                        break;
                      case n.streams.socket:
                        n.socket.callSocket(JSON.parse(u.event));
                        break;
                      case n.streams.usb:
                        u.event || (u.event = JSON.stringify({ vendorId: u.key[0], productId: u.key[1], output: u.data })), n.usb.callUsb(JSON.parse(u.event));
                        break;
                      case n.streams.hid:
                        n.hid.callHid(JSON.parse(u.event));
                        break;
                      case n.streams.printer:
                        n.printers.callPrinter(JSON.parse(u.event));
                        break;
                      case n.streams.file:
                        n.file.callFile(JSON.parse(u.event));
                        break;
                      default:
                        n.log.allay("Cannot determine stream type for callback", u);
                        break;
                    }
                  return;
                }
                n.log.trace("Received response from websocket", u);
                var c = n.websocket.pendingCalls[u.uid];
                c == null ? n.log.allay("No promise found for returned response") : u.error != null ? c.reject(new Error(u.error)) : c.resolve(u.result), delete n.websocket.pendingCalls[u.uid];
              };
              function s(l) {
                l === void 0 && (l = null), a.api.getVersion().then(function(u) {
                  n.websocket.connection.version = u, n.websocket.connection.semver = u.toLowerCase().replace(/-rc\./g, "-rc").split(/[\\+\\.-]/g);
                  for (var c = 0; c < n.websocket.connection.semver.length; c++) {
                    try {
                      if (c == 3 && n.websocket.connection.semver[c].toLowerCase().indexOf("rc") == 0) {
                        n.websocket.connection.semver[c] = -n.websocket.connection.semver[c].replace(/\D/g, "");
                        continue;
                      }
                      n.websocket.connection.semver[c] = parseInt(n.websocket.connection.semver[c]);
                    } catch {
                    }
                    n.websocket.connection.semver.length < 4 && (n.websocket.connection.semver[3] = 0);
                  }
                  n.compatible.algorithm(!0);
                }).then(function() {
                  n.websocket.connection.sendData({ certificate: l, promise: o });
                });
              }
              n.security.callCert().then(s).catch(function(l) {
                n.log.warn("Failed to get certificate:", l), n.security.rejectOnCertFailure ? o.reject(l) : s(null);
              });
            },
            /** Generate unique ID used to map a response to a call. */
            newUID: function() {
              var o = 6;
              return (new Array(o + 1).join("0") + (Math.random() * Math.pow(36, o) << 0).toString(36)).slice(-o);
            }
          },
          dataPromise: function(o, s, l, u) {
            return n.tools.promise(function(c, d) {
              var h = {
                call: o,
                promise: { resolve: c, reject: d },
                params: s,
                signature: l,
                timestamp: u
              };
              n.websocket.connection.sendData(h);
            });
          },
          /** Library of promises awaiting a response, uid -> promise */
          pendingCalls: {},
          /** List of functions to call on error from the websocket. */
          errorCallbacks: [],
          /** Calls all functions registered to listen for errors. */
          callError: function(o) {
            if (Array.isArray(n.websocket.errorCallbacks))
              for (var s = 0; s < n.websocket.errorCallbacks.length; s++)
                n.websocket.errorCallbacks[s](o);
            else
              n.websocket.errorCallbacks(o);
          },
          /** List of function to call on closing from the websocket. */
          closedCallbacks: [],
          /** Calls all functions registered to listen for closing. */
          callClose: function(o) {
            if (Array.isArray(n.websocket.closedCallbacks))
              for (var s = 0; s < n.websocket.closedCallbacks.length; s++)
                n.websocket.closedCallbacks[s](o);
            else
              n.websocket.closedCallbacks(o);
          }
        },
        printing: {
          /** Default options used for new printer configs. Can be overridden using {@link qz.configs.setDefaults}. */
          defaultConfig: {
            //value purposes are explained in the qz.configs.setDefaults docs
            bounds: null,
            colorType: "color",
            copies: 1,
            density: 0,
            duplex: !1,
            fallbackDensity: null,
            interpolation: "bicubic",
            jobName: null,
            legacy: !1,
            margins: 0,
            orientation: null,
            paperThickness: null,
            printerTray: null,
            rasterize: !1,
            rotation: 0,
            scaleContent: !0,
            size: null,
            units: "in",
            forceRaw: !1,
            encoding: null,
            spool: null
          }
        },
        serial: {
          /** List of functions called when receiving data from serial connection. */
          serialCallbacks: [],
          /** Calls all functions registered to listen for serial events. */
          callSerial: function(o) {
            if (Array.isArray(n.serial.serialCallbacks))
              for (var s = 0; s < n.serial.serialCallbacks.length; s++)
                n.serial.serialCallbacks[s](o);
            else
              n.serial.serialCallbacks(o);
          }
        },
        socket: {
          /** List of functions called when receiving data from network socket connection. */
          socketCallbacks: [],
          /** Calls all functions registered to listen for network socket events. */
          callSocket: function(o) {
            if (Array.isArray(n.socket.socketCallbacks))
              for (var s = 0; s < n.socket.socketCallbacks.length; s++)
                n.socket.socketCallbacks[s](o);
            else
              n.socket.socketCallbacks(o);
          }
        },
        usb: {
          /** List of functions called when receiving data from usb connection. */
          usbCallbacks: [],
          /** Calls all functions registered to listen for usb events. */
          callUsb: function(o) {
            if (Array.isArray(n.usb.usbCallbacks))
              for (var s = 0; s < n.usb.usbCallbacks.length; s++)
                n.usb.usbCallbacks[s](o);
            else
              n.usb.usbCallbacks(o);
          }
        },
        hid: {
          /** List of functions called when receiving data from hid connection. */
          hidCallbacks: [],
          /** Calls all functions registered to listen for hid events. */
          callHid: function(o) {
            if (Array.isArray(n.hid.hidCallbacks))
              for (var s = 0; s < n.hid.hidCallbacks.length; s++)
                n.hid.hidCallbacks[s](o);
            else
              n.hid.hidCallbacks(o);
          }
        },
        printers: {
          /** List of functions called when receiving data from printer connection. */
          printerCallbacks: [],
          /** Calls all functions registered to listen for printer events. */
          callPrinter: function(o) {
            if (Array.isArray(n.printers.printerCallbacks))
              for (var s = 0; s < n.printers.printerCallbacks.length; s++)
                n.printers.printerCallbacks[s](o);
            else
              n.printers.printerCallbacks(o);
          }
        },
        file: {
          /** List of functions called when receiving info regarding file changes. */
          fileCallbacks: [],
          /** Calls all functions registered to listen for file events. */
          callFile: function(o) {
            if (Array.isArray(n.file.fileCallbacks))
              for (var s = 0; s < n.file.fileCallbacks.length; s++)
                n.file.fileCallbacks[s](o);
            else
              n.file.fileCallbacks(o);
          }
        },
        security: {
          /** Function used to resolve promise when acquiring site's public certificate. */
          certHandler: function(o, s) {
            s();
          },
          /** Called to create new promise (using {@link _qz.security.certHandler}) for certificate retrieval. */
          callCert: function() {
            return typeof n.security.certHandler.then == "function" ? n.security.certHandler : n.security.certHandler.constructor.name === "AsyncFunction" ? n.security.certHandler() : n.tools.promise(n.security.certHandler);
          },
          /** Function used to create promise resolver when requiring signed calls. */
          signatureFactory: function() {
            return function(o) {
              o();
            };
          },
          /** Called to create new promise (using {@link _qz.security.signatureFactory}) for signed calls. */
          callSign: function(o) {
            return n.security.signatureFactory.constructor.name === "AsyncFunction" ? n.security.signatureFactory(o) : n.tools.promise(n.security.signatureFactory(o));
          },
          /** Signing algorithm used on signatures */
          signAlgorithm: "SHA1",
          rejectOnCertFailure: !1,
          needsSigned: function(o) {
            const s = [
              "printers.getStatus",
              "printers.stopListening",
              "usb.isClaimed",
              "usb.closeStream",
              "usb.releaseDevice",
              "hid.stopListening",
              "hid.isClaimed",
              "hid.closeStream",
              "hid.releaseDevice",
              "file.stopListening",
              "getVersion"
            ];
            return o != null && s.indexOf(o) === -1;
          }
        },
        tools: {
          /** Create a new promise */
          promise: function(o) {
            if (typeof RSVP < "u")
              return new RSVP.Promise(o);
            if (typeof Promise < "u")
              return new Promise(o);
            n.log.error("Promise/A+ support is required.  See qz.api.setPromiseType(...)");
          },
          /** Stub for rejecting with an Error from withing a Promise */
          reject: function(o) {
            return n.tools.promise(function(s, l) {
              l(o);
            });
          },
          stringify: function(o) {
            var s = Array.prototype.toJSON;
            delete Array.prototype.toJSON;
            function l(c, d) {
              if (c !== "promise")
                return d;
            }
            var u = JSON.stringify(o, l);
            return s && (Array.prototype.toJSON = s), u;
          },
          hash: function(o) {
            return typeof Sha256 < "u" ? Sha256.hash(o) : n.SHA.hash(o);
          },
          ws: typeof WebSocket < "u" ? WebSocket : null,
          lna: void 0,
          getLna: function() {
            return n.tools.lna === void 0 && (n.tools.lna = n.tools.loadLna() || null), n.tools.lna;
          },
          loadLna: function() {
            if (!(typeof self > "u")) {
              if (self.lna && self.lna.detectLna)
                return self.lna;
              if (typeof $u == "function")
                try {
                  return require("lna");
                } catch (o) {
                  n.log.warn("Unable to load LNA library", o);
                }
            }
          },
          /**
           * Normalize a host string by appending a "surf"" tld if necessary.
           * Ignored if "usingSurf" is set to false
           */
          appendSurf: function(o) {
            return n.tools.isQualified(o) ? o : o + "." + n.websocket.connectConfig.surfDomain;
          },
          /**
           * Returns if the provided hostname is fully-qualified either as a domain
           * name or as an ip address. Used to determine whether to append a "surf" suffix
           * (e.g. ".qz.surf") at the end.
           */
          isQualified: function(o) {
            return o.toLowerCase() === "localhost" || o.indexOf(".") !== -1 || o.indexOf(":") !== -1;
          },
          absolute: function(o) {
            if (typeof window < "u" && typeof document.createElement == "function") {
              var s = document.createElement("a");
              return s.href = o, s.href;
            } else
              return Vu.resolve(o);
          },
          relative: function(o) {
            for (var s = 0; s < o.length; s++)
              if (o[s].constructor === Object) {
                var l = !1;
                o[s].data && o[s].data.search && o[s].data.search(/data:image\/\w+;base64,/) === 0 ? (o[s].flavor = "base64", o[s].data = o[s].data.replace(/^data:image\/\w+;base64,/, "")) : o[s].flavor ? ["FILE", "XML"].indexOf(o[s].flavor.toUpperCase()) > -1 && (l = !0) : (o[s].format && ["HTML", "IMAGE", "PDF", "FILE", "XML"].indexOf(o[s].format.toUpperCase()) > -1 || o[s].type && (["PIXEL", "IMAGE", "PDF"].indexOf(o[s].type.toUpperCase()) > -1 && !o[s].format || ["HTML", "PDF"].indexOf(o[s].type.toUpperCase()) > -1 && (!o[s].format || o[s].format.toUpperCase() === "FILE"))) && (l = !0), l && (o[s].data = n.tools.absolute(o[s].data)), o[s].options && typeof o[s].options.overlay == "string" && (o[s].options.overlay = n.tools.absolute(o[s].options.overlay));
              }
          },
          /** Performs deep copy to target from remaining params */
          extend: function(o) {
            typeof o != "object" && (o = {});
            for (var s = 1; s < arguments.length; s++) {
              var l = arguments[s];
              if (l) {
                for (var u in l)
                  if (l.hasOwnProperty(u)) {
                    if (o === l[u])
                      continue;
                    if (l[u] && l[u].constructor && l[u].constructor === Object) {
                      var c;
                      Array.isArray(l[u]) ? c = o[u] || [] : c = o[u] || {}, o[u] = n.tools.extend(c, l[u]);
                    } else l[u] !== void 0 && (o[u] = l[u]);
                  }
              }
            }
            return o;
          },
          versionCompare: function(o, s, l, u) {
            if (n.tools.assertActive()) {
              var c = n.websocket.connection.semver;
              if (Array.isArray(c)) {
                if (o != null && c.length > 0 && c[0] != o)
                  return c[0] - o;
                if (s != null && c.length > 1 && c[1] != s)
                  return c[1] - s;
                if (l != null && c.length > 2 && c[2] != l)
                  return c[2] - l;
                if (u != null && c.length > 3 && c[3] != u)
                  return Number.isInteger(c[3]) && Number.isInteger(u) ? c[3] - u : c[3].toString().localeCompare(u.toString());
              }
              return 0;
            }
          },
          isVersion: function(o, s, l, u) {
            return n.tools.versionCompare(o, s, l, u) == 0;
          },
          isActive: function() {
            return !n.websocket.shutdown && n.websocket.connection != null && n.websocket.connection.readyState === n.tools.ws.OPEN;
          },
          assertActive: function() {
            if (n.tools.isActive())
              return !0;
            throw new Error("A connection to " + n.TITLE + " has not been established yet");
          },
          uint8ArrayToHex: function(o) {
            return Array.from(o).map(function(s) {
              return s.toString(16).padStart(2, "0");
            }).join("");
          },
          uint8ArrayToBase64: function(o) {
            var s = [
              "A",
              "B",
              "C",
              "D",
              "E",
              "F",
              "G",
              "H",
              "I",
              "J",
              "K",
              "L",
              "M",
              "N",
              "O",
              "P",
              "Q",
              "R",
              "S",
              "T",
              "U",
              "V",
              "W",
              "X",
              "Y",
              "Z",
              "a",
              "b",
              "c",
              "d",
              "e",
              "f",
              "g",
              "h",
              "i",
              "j",
              "k",
              "l",
              "m",
              "n",
              "o",
              "p",
              "q",
              "r",
              "s",
              "t",
              "u",
              "v",
              "w",
              "x",
              "y",
              "z",
              "0",
              "1",
              "2",
              "3",
              "4",
              "5",
              "6",
              "7",
              "8",
              "9",
              "+",
              "/"
            ], l = "", u, c = o.length;
            for (u = 2; u < c; u += 3)
              l += s[o[u - 2] >> 2], l += s[(o[u - 2] & 3) << 4 | o[u - 1] >> 4], l += s[(o[u - 1] & 15) << 2 | o[u] >> 6], l += s[o[u] & 63];
            return u === c + 1 && (l += s[o[u - 2] >> 2], l += s[(o[u - 2] & 3) << 4], l += "=="), u === c && (l += s[o[u - 2] >> 2], l += s[(o[u - 2] & 3) << 4 | o[u - 1] >> 4], l += s[(o[u - 1] & 15) << 2], l += "="), l;
          }
        },
        compatible: {
          /** Converts message format to a previous version's */
          data: function(o) {
            for (var s = 0; s < o.length; s++)
              if (o[s].constructor === Object && o[s].data instanceof Uint8Array && o[s].flavor) {
                var l = o[s].flavor.toString().toUpperCase();
                switch (l) {
                  case "BASE64":
                    o[s].data = n.tools.uint8ArrayToBase64(o[s].data);
                    break;
                  case "HEX":
                    o[s].data = n.tools.uint8ArrayToHex(o[s].data);
                    break;
                  default:
                    throw new Error("Uint8Array conversion to '" + l + "' is not supported.");
                }
              }
            if (n.tools.versionCompare(2, 2, 4) < 0)
              for (var s = 0; s < o.length; s++)
                o[s].constructor === Object && o[s].options && typeof o[s].options.dotDensity == "string" && (o[s].options.dotDensity = o[s].options.dotDensity.toLowerCase().replace("-legacy", ""));
            if (n.tools.isVersion(2, 0)) {
              n.log.trace("Converting print data to v2.0 for " + n.websocket.connection.version);
              for (var s = 0; s < o.length; s++)
                o[s].constructor === Object && (o[s].type && o[s].type.toUpperCase() === "RAW" && o[s].format && o[s].format.toUpperCase() === "IMAGE" && (o[s].flavor && o[s].flavor.toUpperCase() === "BASE64" && (o[s].data = "data:image/compat;base64," + o[s].data), o[s].flavor = "IMAGE"), (o[s].type && o[s].type.toUpperCase() === "RAW" || o[s].format && o[s].format.toUpperCase() === "COMMAND") && (o[s].format = "RAW"), o[s].type = o[s].format, o[s].format = o[s].flavor, delete o[s].flavor);
            }
          },
          /* Converts config defaults to match previous version */
          config: function(o, s) {
            return n.tools.isVersion(2, 0) && (s.rasterize || (o.rasterize = !0)), n.tools.versionCompare(2, 2) < 0 && o.forceRaw !== "undefined" && (o.altPrinting = o.forceRaw, delete o.forceRaw), n.tools.versionCompare(2, 1, 2, 11) < 0 && o.spool && (o.spool.size && (o.perSpool = o.spool.size, delete o.spool.size), o.spool.end && (o.endOfDoc = o.spool.end, delete o.spool.end), delete o.spool), o;
          },
          /** Compat wrapper with previous version **/
          networking: function(o, s, l, u, c) {
            return n.tools.isVersion(2, 0) ? n.tools.promise(function(d, h) {
              n.websocket.dataPromise("websocket.getNetworkInfo", {
                hostname: o,
                port: s
              }, l, u).then(function(g) {
                d(typeof c < "u" ? c(g) : g);
              }, h);
            }) : n.tools.promise(function(d, h) {
              n.websocket.dataPromise("networking.device", {
                hostname: o,
                port: s
              }, l, u).then(function(g) {
                d({ ipAddress: g.ip, macAddress: g.mac });
              }, h);
            });
          },
          /** Check if QZ version supports chosen algorithm */
          algorithm: function(o) {
            return n.tools.isActive() && n.websocket.connection.semver && n.tools.isVersion(2, 0) ? (o || n.log.warn("Connected to an older version of " + n.TITLE + ", alternate signature algorithms are not supported"), !1) : !0;
          }
        },
        /**
         * Adapted from Chris Veness's code under MIT Licence (C) 2002
         * see http://www.movable-type.co.uk/scripts/sha256.html
         */
        SHA: {
          //@formatter:off - keep this block compact
          hash: function(o) {
            o = n.SHA._utf8Encode(o) + "";
            for (var s = [
              1116352408,
              1899447441,
              3049323471,
              3921009573,
              961987163,
              1508970993,
              2453635748,
              2870763221,
              3624381080,
              310598401,
              607225278,
              1426881987,
              1925078388,
              2162078206,
              2614888103,
              3248222580,
              3835390401,
              4022224774,
              264347078,
              604807628,
              770255983,
              1249150122,
              1555081692,
              1996064986,
              2554220882,
              2821834349,
              2952996808,
              3210313671,
              3336571891,
              3584528711,
              113926993,
              338241895,
              666307205,
              773529912,
              1294757372,
              1396182291,
              1695183700,
              1986661051,
              2177026350,
              2456956037,
              2730485921,
              2820302411,
              3259730800,
              3345764771,
              3516065817,
              3600352804,
              4094571909,
              275423344,
              430227734,
              506948616,
              659060556,
              883997877,
              958139571,
              1322822218,
              1537002063,
              1747873779,
              1955562222,
              2024104815,
              2227730452,
              2361852424,
              2428436474,
              2756734187,
              3204031479,
              3329325298
            ], l = [1779033703, 3144134277, 1013904242, 2773480762, 1359893119, 2600822924, 528734635, 1541459225], u = o.length / 4 + 2, c = Math.ceil(u / 16), d = new Array(c), h = 0; h < c; h++) {
              d[h] = new Array(16);
              for (var g = 0; g < 16; g++)
                d[h][g] = o.charCodeAt(h * 64 + g * 4) << 24 | o.charCodeAt(h * 64 + g * 4 + 1) << 16 | o.charCodeAt(h * 64 + g * 4 + 2) << 8 | o.charCodeAt(h * 64 + g * 4 + 3);
            }
            d[c - 1][14] = (o.length - 1) * 8 / Math.pow(2, 32), d[c - 1][14] = Math.floor(d[c - 1][14]), d[c - 1][15] = (o.length - 1) * 8 & 4294967295;
            for (var E = new Array(64), w, q, M, A, P, k, D, y, h = 0; h < c; h++) {
              for (var b = 0; b < 16; b++)
                E[b] = d[h][b];
              for (var b = 16; b < 64; b++)
                E[b] = n.SHA._dev1(E[b - 2]) + E[b - 7] + n.SHA._dev0(E[b - 15]) + E[b - 16] & 4294967295;
              w = l[0], q = l[1], M = l[2], A = l[3], P = l[4], k = l[5], D = l[6], y = l[7];
              for (var b = 0; b < 64; b++) {
                var B = y + n.SHA._sig1(P) + n.SHA._ch(P, k, D) + s[b] + E[b], R = n.SHA._sig0(w) + n.SHA._maj(w, q, M);
                y = D, D = k, k = P, P = A + B & 4294967295, A = M, M = q, q = w, w = B + R & 4294967295;
              }
              l[0] = l[0] + w & 4294967295, l[1] = l[1] + q & 4294967295, l[2] = l[2] + M & 4294967295, l[3] = l[3] + A & 4294967295, l[4] = l[4] + P & 4294967295, l[5] = l[5] + k & 4294967295, l[6] = l[6] + D & 4294967295, l[7] = l[7] + y & 4294967295;
            }
            return n.SHA._hexStr(l[0]) + n.SHA._hexStr(l[1]) + n.SHA._hexStr(l[2]) + n.SHA._hexStr(l[3]) + n.SHA._hexStr(l[4]) + n.SHA._hexStr(l[5]) + n.SHA._hexStr(l[6]) + n.SHA._hexStr(l[7]);
          },
          // Rotates right (circular right shift) value x by n positions
          _rotr: function(o, s) {
            return s >>> o | s << 32 - o;
          },
          // logical functions
          _sig0: function(o) {
            return n.SHA._rotr(2, o) ^ n.SHA._rotr(13, o) ^ n.SHA._rotr(22, o);
          },
          _sig1: function(o) {
            return n.SHA._rotr(6, o) ^ n.SHA._rotr(11, o) ^ n.SHA._rotr(25, o);
          },
          _dev0: function(o) {
            return n.SHA._rotr(7, o) ^ n.SHA._rotr(18, o) ^ o >>> 3;
          },
          _dev1: function(o) {
            return n.SHA._rotr(17, o) ^ n.SHA._rotr(19, o) ^ o >>> 10;
          },
          _ch: function(o, s, l) {
            return o & s ^ ~o & l;
          },
          _maj: function(o, s, l) {
            return o & s ^ o & l ^ s & l;
          },
          // note can't use toString(16) as it is implementation-dependant, and in IE returns signed numbers when used on full words
          _hexStr: function(o) {
            for (var s = "", l, u = 7; u >= 0; u--)
              l = o >>> u * 4 & 15, s += l.toString(16);
            return s;
          },
          // implementation of deprecated unescape() based on https://cwestblog.com/2011/05/23/escape-unescape-deprecated/ (and comments)
          _unescape: function(o) {
            return o.replace(/%(u[\da-f]{4}|[\da-f]{2})/gi, function(s) {
              if (s.length - 1)
                return String.fromCharCode(parseInt(s.substring(s.length - 3 ? 2 : 1), 16));
              var l = s.charCodeAt(0);
              return l < 256 ? "%" + (0 + l.toString(16)).slice(-2).toUpperCase() : "%u" + ("000" + l.toString(16)).slice(-4).toUpperCase();
            });
          },
          _utf8Encode: function(o) {
            return n.SHA._unescape(encodeURIComponent(o));
          }
          //@formatter:on
        }
      };
      function i(o, s) {
        this.config = n.tools.extend({}, n.printing.defaultConfig), this._dirtyOpts = {}, this.setPrinter = function(l) {
          typeof l == "string" && (l = { name: l }), this.printer = l;
        }, this.getPrinter = function() {
          return this.printer;
        }, this.reconfigure = function(l) {
          for (var u in l)
            l[u] !== void 0 && (this._dirtyOpts[u] = !0);
          n.tools.extend(this.config, l);
        }, this.getOptions = function() {
          return n.compatible.config(this.config, this._dirtyOpts);
        }, this.setPrinter(o), this.reconfigure(s);
      }
      i.prototype.print = function(o, s, l) {
        a.print(this, o, s, l);
      };
      var a = {
        /**
         * Calls related specifically to the web socket connection.
         * @namespace qz.websocket
         */
        websocket: {
          /**
           * Check connection status. Active connection is necessary for other calls to run.
           *
           * @returns {boolean} If there is an active connection with QZ Tray.
           *
           * @see connect
           *
           * @memberof  qz.websocket
           */
          isActive: function() {
            return n.tools.isActive();
          },
          /**
           * Call to setup connection with QZ Tray on user's system.
           *
           * @param {Object} [options] Configuration options for the web socket connection.
           *  @param {string|Array<string>} [options.host=['localhost', 'localhost.qz.io']] Host running the QZ Tray software.
           *  @param {Object} [options.port] Config options for ports to cycle.
           *   @param {Array<number>} [options.port.secure=[8181, 8282, 8383, 8484]] Array of secure (WSS) ports to try
           *   @param {Array<number>} [options.port.insecure=[8182, 8283, 8384, 8485]] Array of insecure (WS) ports to try
           *  @param {boolean} [options.usingSecure=true] If the web socket should try to use secure ports for connecting.
           *  @param {number} [options.keepAlive=60] Seconds between keep-alive pings to keep connection open. Set to 0 to disable.
           *  @param {number} [options.retries=0] Number of times to reconnect before failing.
           *  @param {number} [options.delay=0] Seconds before firing a connection.  Ignored if <code>options.retries</code> is 0.
           *
           * @returns {Promise<null|Error>}
           *
           * @memberof qz.websocket
           */
          connect: function(o) {
            return n.tools.promise(function(s, l) {
              if (n.websocket.connection) {
                const d = n.websocket.connection.readyState;
                if (d === n.tools.ws.OPEN) {
                  l(new Error("An open connection with " + n.TITLE + " already exists"));
                  return;
                } else if (d === n.tools.ws.CONNECTING) {
                  l(new Error("The current connection attempt has not returned yet"));
                  return;
                } else if (d === n.tools.ws.CLOSING) {
                  l(new Error("Waiting for previous disconnect request to complete"));
                  return;
                }
              }
              if (n.tools.ws) {
                if (!n.tools.ws.CLOSED || n.tools.ws.CLOSED == 2) {
                  l(new Error("Unsupported WebSocket version detected: HyBi-00/Hixie-76"));
                  return;
                }
              } else {
                l(new Error("WebSocket not supported by this browser"));
                return;
              }
              if (o == null && (o = {}), (typeof location > "u" || location.protocol !== "https:") && typeof o.usingSecure > "u" && (n.log.trace("Disabling secure ports due to insecure page"), o.usingSecure = !1), typeof o.host < "u" && !Array.isArray(o.host) && (o.host = [o.host], n.websocket.connectConfig.usingSurf))
                for (var u = 0; u < o.host.length; u++)
                  o.host[u] = n.tools.appendSurf(o.host[u]);
              n.websocket.shutdown = !1;
              var c = function(d) {
                var h = !1, g = function() {
                  h || (h = !0, o && d < o.retries ? c(d + 1) : (n.websocket.connection = null, l.apply(null, arguments)));
                }, E = function() {
                  var w = n.tools.extend({}, n.websocket.connectConfig, o);
                  n.websocket.setup.findConnection(w, s, g);
                };
                d == 0 ? E() : setTimeout(E, o.delay * 1e3);
              };
              c(0);
            });
          },
          /**
           * Stop any active connection with QZ Tray.
           *
           * @returns {Promise<null|Error>}
           *
           * @memberof qz.websocket
           */
          disconnect: function() {
            return n.tools.promise(function(o, s) {
              n.websocket.connection != null ? n.tools.isActive() || n.websocket.connection.readyState === n.tools.ws.CONNECTING ? (n.websocket.shutdown = !0, n.websocket.connection.promise = { resolve: o, reject: s }, n.websocket.connection.close()) : s(new Error("Current connection is still closing")) : s(new Error("No open connection with " + n.TITLE));
            });
          },
          /**
           * List of functions called for any connections errors outside of an API call.<p/>
           * Also called if {@link websocket#connect} fails to connect.
           *
           * @param {Function|Array<Function>} calls Single or array of <code>Function({Event} event)</code> calls.
           *
           * @memberof qz.websocket
           */
          setErrorCallbacks: function(o) {
            n.websocket.errorCallbacks = o;
          },
          /**
           * List of functions called for any connection closing event outside of an API call.<p/>
           * Also called when {@link websocket#disconnect} is called.
           *
           * @param {Function|Array<Function>} calls Single or array of <code>Function({Event} event)</code> calls.
           *
           * @memberof qz.websocket
           */
          setClosedCallbacks: function(o) {
            n.websocket.closedCallbacks = o;
          },
          /**
           * Whether to append the "surf" domain (e.g. "qz.surf") to the end of non-qualified hosts (except "localhost")
           *
           * @param {boolean} usingSurf=true Toggles automatic "surf" domain appending
           * @since 2.2.6
           *
           * @memberof qz.websocket
           */
          setUsingSurf: function(o) {
            n.websocket.connectConfig.usingSurf = o;
          },
          /**
           * The domain to automagically append to non-qualified hosts, such as "qz.surf", or "example.com"
           *
           * @param {string} surfDomain="qz.surf" The domain to append to non-qualified hosts.
           * @since 2.2.6
           *
           * @memberof qz.websocket
           */
          setSurfDomain: function(o) {
            o.indexOf(".") === 0 && (o = o.substring(1)), n.websocket.connectConfig.surfDomain = o;
          },
          /**
           * @deprecated Since 2.1.0.  Please use qz.networking.device() instead
           *
           * @param {string} [hostname] Hostname to try to connect to when determining network interfaces, defaults to "google.com"
           * @param {number} [port] Port to use with custom hostname, defaults to 443
           * @param {string} [signature] Pre-signed signature of hashed JSON string containing <code>call='websocket.getNetworkInfo'</code>, <code>params</code> object, and <code>timestamp</code>.
           * @param {number} [signingTimestamp] Required with <code>signature</code>. Timestamp used with pre-signed content.
           *
           * @returns {Promise<Object<{ipAddress: string, macAddress: string}>|Error>} Connected system's network information.
           *
           * @memberof qz.websocket
           */
          getNetworkInfo: n.compatible.networking,
          /**
           * @returns {Object<{socket: String, host: String, port: Number}>} Details of active websocket connection
           *
           * @memberof qz.websocket
           */
          getConnectionInfo: function() {
            if (n.tools.assertActive()) {
              var o = n.websocket.connection.url.split(/[:\/]+/g);
              return { socket: o[0], host: o[1], port: +o[2] };
            }
          }
        },
        /**
         * Calls related to getting printer information from the connection.
         * @namespace qz.printers
         */
        printers: {
          /**
           * @param {string} [signature] Pre-signed signature of hashed JSON string containing <code>call='printers.getDefault</code>, <code>params</code>, and <code>timestamp</code>.
           * @param {number} [signingTimestamp] Required with <code>signature</code>. Timestamp used with pre-signed content.
           *
           * @returns {Promise<string|Error>} Name of the connected system's default printer.
           *
           * @memberof qz.printers
           */
          getDefault: function(o, s) {
            return n.websocket.dataPromise("printers.getDefault", null, o, s);
          },
          /**
           * @param {string} [query] Search for a specific printer. All printers are returned if not provided.
           * @param {string} [signature] Pre-signed signature of hashed JSON string containing <code>call='printers.find'</code>, <code>params</code>, and <code>timestamp</code>.
           * @param {number} [signingTimestamp] Required with <code>signature</code>. Timestamp used with pre-signed content.
           *
           * @returns {Promise<Array<string>|string|Error>} The matched printer name if <code>query</code> is provided.
           *                                                Otherwise an array of printer names found on the connected system.
           *
           * @memberof qz.printers
           */
          find: function(o, s, l) {
            return n.websocket.dataPromise("printers.find", { query: o }, s, l);
          },
          /**
           * Provides a list, with additional information, for each printer available to QZ.
           *
           * @returns {Promise<Array<Object>|Object|Error>}
           *
           * @memberof qz.printers
           */
          details: function() {
            return n.websocket.dataPromise("printers.detail");
          },
          /**
           * Start listening for printer status events, such as paper_jam events.
           * Reported under the ACTION type in the streamEvent on callbacks.
           *
           * @returns {Promise<null|Error>}
           * @since 2.1.0
           *
           * @see qz.printers.setPrinterCallbacks
           *
           * @param {null|string|Array<string>} printers Printer or list of printers to listen to, null listens to all.
           * @param {Object|null} [options] Printer listener options
           *  @param {null|boolean} [options.jobData=false] Flag indicating if raw spool file content should be return as well as status information (Windows only)
           *  @param {null|number} [options.maxJobData=-1] Maximum number of bytes to returns for raw spooled file content (Windows only)
           *  @param {null|string} [options.flavor="plain"] Flavor of data format returned. Valid flavors are <code>[base64 | hex | plain*]</code> (Windows only)
           *
           * @memberof qz.printers
           */
          startListening: function(o, s) {
            Array.isArray(o) || (o = [o]);
            var l = {
              printerNames: o
            };
            return s && s.jobData == !0 && (l.jobData = !0), s && s.maxJobData && (l.maxJobData = s.maxJobData), s && s.flavor && (l.flavor = s.flavor), n.websocket.dataPromise("printers.startListening", l);
          },
          /**
           * Clear the queue of a specified printer or printers. Does not delete retained jobs.
           *
           * @param {string|Object} [options] Name of printer to clear
           *  @param {string} [options.printerName] Name of printer to clear
           *  @param {number} [options.jobId] Cancel a job of a specific JobId instead of canceling all. Must include a printerName.
           *
           * @returns {Promise<null|Error>}
           * @since 2.2.4
           *
           * @memberof qz.printers
           */
          clearQueue: function(o) {
            return typeof o != "object" && (o = {
              printerName: o
            }), n.websocket.dataPromise("printers.clearQueue", o);
          },
          /**
           * Stop listening for printer status actions.
           *
           * @returns {Promise<null|Error>}
           * @since 2.1.0
           *
           * @see qz.printers.setPrinterCallbacks
           *
           * @memberof qz.printers
           */
          stopListening: function() {
            return n.websocket.dataPromise("printers.stopListening");
          },
          /**
           * Retrieve current printer status from any active listeners.
           *
           * @returns {Promise<null|Error>}
           * @since 2.1.0
           *
           * @see qz.printers.startListening
           *
           * @memberof qz.printers
           */
          getStatus: function() {
            return n.websocket.dataPromise("printers.getStatus");
          },
          /**
           * List of functions called for any printer status change.
           * Event data will contain <code>{string} printerName</code> and <code>{string} status</code> for all types.
           *  For RECEIVE types, <code>{Array} output</code> (in hexadecimal format).
           *  For ERROR types, <code>{string} exception</code>.
           *  For ACTION types, <code>{string} actionType</code>.
           *
           * @param {Function|Array<Function>} calls Single or array of <code>Function({Object} eventData)</code> calls.
           * @since 2.1.0
           *
           * @memberof qz.printers
           */
          setPrinterCallbacks: function(o) {
            n.printers.printerCallbacks = o;
          }
        },
        /**
         * Calls related to setting up new printer configurations.
         * @namespace qz.configs
         */
        configs: {
          /**
           * Default options used by new configs if not overridden.
           * Setting a value to NULL will use the printer's default options.
           * Updating these will not update the options on any created config.
           *
           * @param {Object} options Default options used by printer configs if not overridden.
           *
           *  @param {Object} [options.bounds=null] Bounding box rectangle.
           *   @param {number} [options.bounds.x=0] Distance from left for bounding box starting corner
           *   @param {number} [options.bounds.y=0] Distance from top for bounding box starting corner
           *   @param {number} [options.bounds.width=0] Width of bounding box
           *   @param {number} [options.bounds.height=0] Height of bounding box
           *  @param {string} [options.colorType='color'] Valid values <code>[color | grayscale | blackwhite | default]</code>
           *  @param {number} [options.copies=1] Number of copies to be printed.
           *  @param {number|Array<number>|Object|Array<Object>|string} [options.density=0] Pixel density (DPI, DPMM, or DPCM depending on <code>[options.units]</code>).
           *      If provided as an array, uses the first supported density found (or the first entry if none found).
           *      If provided as a string, valid values are <code>[best | draft]</code>, corresponding to highest or lowest reported density respectively.
           *  @param {number} [options.density.cross=0] Asymmetric pixel density for the cross feed direction.
           *  @param {number} [options.density.feed=0] Asymmetric pixel density for the feed direction.
           *  @param {boolean|string} [options.duplex=false] Double sided printing, Can specify duplex style by passing a string value: <code>[one-sided | duplex | long-edge | tumble | short-edge]</code>
           *  @param {number} [options.fallbackDensity=null] Value used when default density value cannot be read, or in cases where reported as "Normal" by the driver, (in DPI, DPMM, or DPCM depending on <code>[options.units]</code>).
           *  @param {string} [options.interpolation='bicubic'] Valid values <code>[bicubic | bilinear | nearest-neighbor]</code>. Controls how images are handled when resized.
           *  @param {string} [options.jobName=null] Name to display in print queue.
           *  @param {boolean} [options.legacy=false] If legacy style printing should be used.
           *  @param {Object|number} [options.margins=0] If just a number is provided, it is used as the margin for all sides.
           *   @param {number} [options.margins.top=0]
           *   @param {number} [options.margins.right=0]
           *   @param {number} [options.margins.bottom=0]
           *   @param {number} [options.margins.left=0]
           *  @param {string} [options.orientation=null] Valid values <code>[portrait | landscape | reverse-landscape | null]</code>.
           *                                             If set to <code>null</code>, orientation will be determined automatically.
           *  @param {number} [options.paperThickness=null]
           *  @param {string|number} [options.printerTray=null] Printer tray to pull from. The number N assumes string equivalent of 'Tray N'. Uses printer default if NULL.
           *  @param {boolean} [options.rasterize=false] Whether documents should be rasterized before printing.
           *                                             Specifying <code>[options.density]</code> for PDF print formats will set this to <code>true</code>.
           *  @param {number} [options.rotation=0] Image rotation in degrees.
           *  @param {boolean} [options.scaleContent=true] Scales print content to page size, keeping ratio.
           *  @param {Object} [options.size=null] Paper size.
           *   @param {number} [options.size.width=null] Page width.
           *   @param {number} [options.size.height=null] Page height.
           *   @param {boolean} [options.size.custom=false] If the provided page size is not included in the driver.
           *  @param {string} [options.units='in'] Page units, applies to paper size, margins, and density. Valid value <code>[in | cm | mm]</code>
           *
           *  @param {boolean} [options.forceRaw=false] Print the specified raw data using direct method, skipping the driver.  Not yet supported on Windows.
           *  @param {string|Object} [options.encoding=null] Character set for commands. Can be provided as an object for converting encoding types for RAW types.
           *   @param {string} [options.encoding.from] If this encoding type is provided, RAW type commands will be parsed from this for the purpose of being converted to the <code>encoding.to</code> value.
           *   @param {string} [options.encoding.to] Encoding RAW type commands will be converted into. If <Code>encoding.from</code> is not provided, this will be treated as if a string was passed for encoding.
           *  @param {string} [options.endOfDoc=null] DEPRECATED Raw only: Character(s) denoting end of a page to control spooling.
           *  @param {number} [options.perSpool=1] DEPRECATED: Raw only: Number of pages per spool.
           *  @param {boolean} [options.retainTemp=false] Retain any temporary files used.  Ignored unless <code>forceRaw</code> <code>true</code>.
           *  @param {Object} [options.spool=null] Advanced spooling options.
           *   @param {number} [options.spool.size=null] Number of pages per spool.  Default is no limit.  If <code>spool.end</code> is provided, defaults to <code>1</code>
           *   @param {string} [options.spool.end=null] Raw only: Character(s) denoting end of a page to control spooling.
           *
           * @memberof qz.configs
           */
          setDefaults: function(o) {
            n.tools.extend(n.printing.defaultConfig, o);
          },
          /**
           * Creates new printer config to be used in printing.
           *
           * @param {string|object} printer Name of printer. Use object type to specify printing to file or host.
           *  @param {string} [printer.name] Name of printer to send printing.
           *  @param {string} [printer.file] Name of file to send printing.
           *  @param {string} [printer.host] IP address or host name to send printing.
           *  @param {string} [printer.port] Port used by &lt;printer.host>.
           * @param {Object} [options] Override any of the default options for this config only.
           *
           * @returns {Config} The new config.
           *
           * @see configs.setDefaults
           *
           * @memberof qz.configs
           */
          create: function(o, s) {
            return new i(o, s);
          }
        },
        /**
         * Send data to selected config for printing.
         * The promise for this method will resolve when the document has been sent to the printer. Actual printing may not be complete.
         * <p/>
         * Optionally, print requests can be pre-signed:
         * Signed content consists of a JSON object string containing no spacing,
         * following the format of the "call" and "params" keys in the API call, with the addition of a "timestamp" key in milliseconds
         * ex. <code>'{"call":"<callName>","params":{...},"timestamp":1450000000}'</code>
         *
         * @param {Object<Config>|Array<Object<Config>>} configs Previously created config object or objects.
         * @param {Array<Object|string>|Array<Array<Object|string>>} data Array of data being sent to the printer.<br/>
         *      String values are interpreted as <code>{type: 'raw', format: 'command', flavor: 'plain', data: &lt;string>}</code>.
         *  @param {string} data.data
         *  @param {string} data.type Printing type. Valid types are <code>[pixel | raw*]</code>. *Default
         *  @param {string} data.format Format of data type used. *Default per type<p/>
         *      For <code>[pixel]</code> types, valid formats are <code>[html | image* | pdf]</code>.<p/>
         *      For <code>[raw]</code> types, valid formats are <code>[command* | html | image | pdf]</code>.
         *  @param {string} data.flavor Flavor of data format used. *Default per format<p/>
         *      For <code>[command]</code> formats, valid flavors are <code>[base64 | file | hex | plain* | xml]</code>.<p/>
         *      For <code>[html]</code> formats, valid flavors are <code>[file* | plain]</code>.<p/>
         *      For <code>[image]</code> formats, valid flavors are <code>[base64 | file*]</code>.<p/>
         *      For <code>[pdf]</code> formats, valid flavors are <code>[base64 | file*]</code>.
         *  @param {Object} [data.options]
         *   @param {string} [data.options.language] Required with <code>[raw]</code> type + <code>[html|image|pdf]</code> format. Printer language.
         *   @param {string} [data.options.quantization="alpha"] Optional with <code>[raw]</code> type + <code>[html|image|pdf]</code> format. The "black pixel" quantization method used.  Valid values are <code>[alpha* | black | luma | dither]</code>.
         *   @param {number} [data.options.threshold=127] Optional with <code>[raw]</code> type + <code>[html|image|pdf]</code> format. The "black pixel" threshold used for quantization.  Default is <code>127</code>.
         *   @param {number} [data.options.x=0] Optional with <code>[raw]</code> type + <code>[html|image|pdf]</code> format for language(s) <code>[cpcl|epl]</code>. The X position of the image.
         *   @param {number} [data.options.y=0] Optional with <code>[raw]</code> type + <code>[html|image|pdf]</code> format for language(s) <code>[cpcl|epl]</code>. The Y position of the image.
         *   @param {string|number} [data.options.dotDensity="single"] Optional with <code>[raw]</code> type + <code>[html|image|pdf]</code> format for language(s) <code>[escpos]</code>.  Valid values are <code>[single* | double | triple | single-legacy | double-legacy]</code> or the escpos "decimal" equivalent
         *   @param {string} [data.options.imageEncoding="esc_asterisk"] Optional with <code>[raw]</code> type + <code>[html|image|pdf]</code> format for language(s) <code>[escpos]</code> and imageEncoding(s) <code>esc_asterisk</code>.  Valid values are <code>[esc_asterisk* | gs_l | gs_v_0]</code>.
         *   @param {number} [data.options.precision=128] Optional with <code>[raw]</code> type <code>[html|image|pdf]</code> format for language(s) <code>[evolis]</code>. Bit precision of the ribbons.
         *   @param {boolean|string|Array<Array<number>>} [data.options.overlay=false] Optional with <code>[raw]</code> type <code>[html|image|pdf]</code> format for language(s) <code>[evolis]</code>.  Instructions for printing the "clear" overlay ribbon.
         *       Boolean sets entire layer, string sets mask image, Array sets array of rectangles in format <code>[x1,y1,x2,y2]</code>.
         *   @param {string} [data.options.logoId] Mandatory with <code>[raw]</code> type <code>[html|image|pdf]</code> format for language(s) <code>[pgl]</code>. Logo identifier to append for storing in the printer's memory.
         *   @param {boolean} [data.options.igpDots=false] Optional with <code>[raw]</code> type <code>[html|image|pdf]</code> format for language(s) <code>[pgl]</code>. When set to <code>true</code> instructs printer to fallback to legacy 60x72 dpi when printing graphics
         *   @param {string} [data.options.xmlTag] Required with <code>[xml]</code> flavor. Tag name containing base64 formatted data.
         *   @param {number} [data.options.pageWidth] Optional with <code>[html | pdf]</code> formats. Width of the rendering.
         *       Defaults to paper width.
         *   @param {number} [data.options.pageHeight] Optional with <code>[html | pdf]</code> formats. Height of the rendering.
         *       Defaults to paper height for <code>[pdf]</code>, or auto sized for <code>[html]</code>.
         *   @param {string} [data.options.pageRanges] Optional with <code>[pdf]</code> formats. Comma-separated list of page ranges to include.
         *   @param {boolean} [data.options.ignoreTransparency=false] Optional with <code>[pdf]</code> formats. Instructs transparent PDF elements to be ignored.
         *       Transparent PDF elements are known to degrade performance and quality when printing.
         *   @param {boolean} [data.options.altFontRendering=false] Optional with <code>[pdf]</code> formats. Instructs PDF to be rendered using PDFBOX 1.8 techniques.
         *       Drastically improves low-DPI PDF print quality on Windows.
         * @param {...*} [arguments] Additionally three more parameters can be specified:<p/>
         *     <code>{boolean} [resumeOnError=false]</code> Whether the chain should continue printing if it hits an error on one the the prints.<p/>
         *     <code>{string|Array<string>} [signature]</code> Pre-signed signature(s) of the JSON string for containing <code>call</code>, <code>params</code>, and <code>timestamp</code>.<p/>
         *     <code>{number|Array<number>} [signingTimestamps]</code> Required to match with <code>signature</code>. Timestamps for each of the passed pre-signed content.
         *
         * @returns {Promise<null|Error>}
         *
         * @see qz.configs.create
         *
         * @memberof qz
         */
        print: function(o, s) {
          var l = !1, u = [], c = [];
          arguments.length >= 3 && (typeof arguments[2] == "boolean" ? (l = arguments[2], arguments.length >= 5 && (u = arguments[3], c = arguments[4])) : arguments.length >= 4 && (u = arguments[2], c = arguments[3]), u && !Array.isArray(u) && (u = [u]), c && !Array.isArray(c) && (c = [c])), Array.isArray(o) || (o = [o]), Array.isArray(s[0]) || (s = [s]);
          for (var d = 0; d < s.length; d++)
            n.tools.relative(s[d]), n.compatible.data(s[d]);
          for (var h = function(A) {
            var P = {
              printer: A.config.getPrinter(),
              options: A.config.getOptions(),
              data: A.data
            };
            return n.websocket.dataPromise("print", P, A.signature, A.timestamp);
          }, g = [], E = 0; E < o.length || E < s.length; E++)
            (function(A) {
              var P = {
                config: o[Math.min(A, o.length - 1)],
                data: s[Math.min(A, s.length - 1)],
                signature: u[A],
                timestamp: c[A]
              };
              g.push(function() {
                return h(P);
              });
            })(E);
          var w = null;
          if (l) {
            var q = [];
            w = function(A) {
              q.push(A);
            }, g.push(function() {
              return n.tools.promise(function(A, P) {
                q.length ? P(q) : A();
              });
            });
          }
          var M = null;
          return g.reduce(function(A, P) {
            return M = A.catch(w).then(P), M;
          }, n.tools.promise(function(A) {
            A();
          })), M;
        },
        /**
         * Calls related to interaction with serial ports.
         * @namespace qz.serial
         */
        serial: {
          /**
           * @returns {Promise<Array<string>|Error>} Communication (RS232, COM, TTY) ports available on connected system.
           *
           * @memberof qz.serial
           */
          findPorts: function() {
            return n.websocket.dataPromise("serial.findPorts");
          },
          /**
           * List of functions called for any response from open serial ports.
           * Event data will contain <code>{string} portName</code> for all types.
           *  For RECEIVE types, <code>{string} output</code>.
           *  For ERROR types, <code>{string} exception</code>.
           *
           * @param {Function|Array<Function>} calls Single or array of <code>Function({object} streamEvent)</code> calls.
           *
           * @memberof qz.serial
           */
          setSerialCallbacks: function(o) {
            n.serial.serialCallbacks = o;
          },
          /**
           * Opens a serial port for sending and receiving data
           *
           * @param {string} port Name of serial port to open.
           * @param {Object} [options] Serial port configurations.
           *  @param {number} [options.baudRate=9600] Serial port speed. Set to 0 for auto negotiation.
           *  @param {number} [options.dataBits=8] Serial port data bits. Set to 0 for auto negotiation.
           *  @param {number} [options.stopBits=1] Serial port stop bits. Set to 0 for auto negotiation.
           *  @param {string} [options.parity='NONE'] Serial port parity. Set to AUTO for auto negotiation. Valid values <code>[NONE | EVEN | ODD | MARK | SPACE | AUTO]</code>
           *  @param {string} [options.flowControl='NONE'] Serial port flow control. Set to AUTO for auto negotiation. Valid values <code>[NONE | XONXOFF | XONXOFF_OUT | XONXOFF_IN | RTSCTS | RTSCTS_OUT | RTSCTS_IN | AUTO]</code>
           *  @param {string} [options.encoding='UTF-8'] Character set for communications.
           *  @param {string} [options.start=0x0002] DEPRECATED: Legacy character denoting start of serial response. Use <code>options.rx.start</code> instead.
           *  @param {string} [options.end=0x000D] DEPRECATED: Legacy character denoting end of serial response. Use <code>options.rx.end</code> instead.
           *  @param {number} [options.width] DEPRECATED: Legacy use for fixed-width response serial communication. Use <code>options.rx.width</code> instead.
           *  @param {Object} [options.rx] Serial communications response definitions. If an object is passed but no options are defined, all response data will be sent back as it is received unprocessed.
           *   @param {string|Array<string>} [options.rx.start] Character(s) denoting start of response bytes. Used in conjunction with `end`, `width`, or `lengthbit` property.
           *   @param {string} [options.rx.end] Character denoting end of response bytes. Used in conjunction with `start` property.
           *   @param {number} [options.rx.width] Fixed width size of response bytes (not including header if `start` is set). Used alone or in conjunction with `start` property.
           *   @param {boolean} [options.rx.untilNewline] Returns data between newline characters (`\n` or `\r`) Truncates empty responses.  Overrides `start`, `end`, `width`.
           *   @param {number|Object} [options.rx.lengthBytes] If a number is passed it is treated as the length index. Other values are left as their defaults.
           *    @param {number} [options.rx.lengthBytes.index=0] Position of the response byte (not including response `start` bytes) used to denote the length of the remaining response data.
           *    @param {number} [options.rx.lengthBytes.length=1] Length of response length bytes after response header.
           *    @param {string} [options.rx.lengthBytes.endian='BIG'] Byte endian for multi-byte length values. Valid values <code>[BIG | LITTLE]</code>
           *   @param {number|Object} [options.rx.crcBytes] If a number is passed it is treated as the crc length. Other values are left as their defaults.
           *    @param {number} [options.rx.crcBytes.index=0] Position after the response data (not including length or data bytes) used to denote the crc.
           *    @param {number} [options.rx.crcBytes.length=1] Length of response crc bytes after the response data length.
           *   @param {boolean} [options.rx.includeHeader=false] Whether any of the header bytes (`start` bytes and any length bytes) should be included in the processed response.
           *   @param {string} [options.rx.encoding] Override the encoding used for response data. Uses the same value as <code>options.encoding</code> otherwise.
           *
           * @returns {Promise<null|Error>}
           *
           * @memberof qz.serial
           */
          openPort: function(o, s) {
            var l = {
              port: o,
              options: s
            };
            return n.websocket.dataPromise("serial.openPort", l);
          },
          /**
           * Send commands over a serial port.
           * Any responses from the device will be sent to serial callback functions.
           *
           * @param {string} port An open serial port to send data.
           * @param {string|Array<string>|Object} data Data to be sent to the serial device.
           *  @param {string} [data.type='PLAIN'] Valid values <code>[FILE | PLAIN | HEX | BASE64]</code>
           *  @param {string|Array<string>} data.data Data to be sent to the serial device.
           * @param {Object} options Serial port configuration updates. See <code>qz.serial.openPort</code> `options` docs for available values.
           *     For best performance, it is recommended to only set these values on the port open call.
           *
           * @returns {Promise<null|Error>}
           *
           * @see qz.serial.setSerialCallbacks
           *
           * @memberof qz.serial
           */
          sendData: function(o, s, l) {
            n.tools.versionCompare(2, 1, 0, 12) >= 0 && (typeof s != "object" && (s = {
              data: s,
              type: "PLAIN"
            }), s.type && s.type.toUpperCase() == "FILE" && (s.data = n.tools.absolute(s.data)));
            var u = {
              port: o,
              data: s,
              options: l
            };
            return n.websocket.dataPromise("serial.sendData", u);
          },
          /**
           * @param {string} port Name of port to close.
           *
           * @returns {Promise<null|Error>}
           *
           * @memberof qz.serial
           */
          closePort: function(o) {
            return n.websocket.dataPromise("serial.closePort", { port: o });
          }
        },
        /**
         * Calls related to interaction with communication sockets.
         * @namespace qz.socket
         */
        socket: {
          /**
           * Opens a network port for sending and receiving data.
           *
           * @param {string} host The connection hostname.
           * @param {number} port The connection port number.
           * @param {Object} [options] Network socket configuration.
           *  @param {string} [options.encoding='UTF-8'] Character set for communications.
           *
           * @memberof qz.socket
           */
          open: function(o, s, l) {
            var u = {
              host: o,
              port: s,
              options: l
            };
            return n.websocket.dataPromise("socket.open", u);
          },
          /**
           * @param {string} host The connection hostname.
           * @param {number} port The connection port number.
           *
           * @memberof qz.socket
           */
          close: function(o, s) {
            var l = {
              host: o,
              port: s
            };
            return n.websocket.dataPromise("socket.close", l);
          },
          /**
           * Send data over an open socket.
           *
           * @param {string} host The connection hostname.
           * @param {number} port The connection port number.
           * @param {string|Object} data Data to be sent over the port.
           *  @param {string} [data.type='PLAIN'] Valid values <code>[PLAIN]</code>
           *  @param {string} data.data Data to be sent over the port.
           *
           * @memberof qz.socket
           */
          sendData: function(o, s, l) {
            typeof l != "object" && (l = {
              data: l,
              type: "PLAIN"
            });
            var u = {
              host: o,
              port: s,
              data: l
            };
            return n.websocket.dataPromise("socket.sendData", u);
          },
          /**
           * List of functions called for any response from open network sockets.
           * Event data will contain <code>{string} host</code> and <code>{number} port</code> for all types.
           *  For RECEIVE types, <code>{string} response</code>.
           *  For ERROR types, <code>{string} exception</code>.
           *
           * @param {Function|Array<Function>} calls Single or array of <code>Function({Object} eventData)</code> calls.
           *
           * @memberof qz.socket
           */
          setSocketCallbacks: function(o) {
            n.socket.socketCallbacks = o;
          }
        },
        /**
         * Calls related to interaction with USB devices.
         * @namespace qz.usb
         */
        usb: {
          /**
           * List of available USB devices. Includes (hexadecimal) vendor ID, (hexadecimal) product ID, and hub status.
           * If supported, also returns manufacturer and product descriptions.
           *
           * @param includeHubs Whether to include USB hubs.
           * @returns {Promise<Array<Object>|Error>} Array of JSON objects containing information on connected USB devices.
           *
           * @memberof qz.usb
           */
          listDevices: function(o) {
            return n.websocket.dataPromise("usb.listDevices", { includeHubs: o });
          },
          /**
           * @param {object} deviceInfo Config details of the HID device.
           *  @param deviceInfo.vendorId Hex string of USB device's vendor ID.
           *  @param deviceInfo.productId Hex string of USB device's product ID.
           * @returns {Promise<Array<string>|Error>} List of available (hexadecimal) interfaces on a USB device.
           *
           * @memberof qz.usb
           */
          listInterfaces: function(o) {
            return typeof o != "object" && (o = { vendorId: arguments[0], productId: arguments[1] }), n.websocket.dataPromise("usb.listInterfaces", o);
          },
          /**
           * @param {object} deviceInfo Config details of the HID device.
           *  @param deviceInfo.vendorId Hex string of USB device's vendor ID.
           *  @param deviceInfo.productId Hex string of USB device's product ID.
           *  @param deviceInfo.iface Hex string of interface on the USB device to search.
           * @returns {Promise<Array<string>|Error>} List of available (hexadecimal) endpoints on a USB device's interface.
           *
           * @memberof qz.usb
           */
          listEndpoints: function(o) {
            return typeof o != "object" && (o = {
              vendorId: arguments[0],
              productId: arguments[1],
              interface: arguments[2]
            }), n.websocket.dataPromise("usb.listEndpoints", o);
          },
          /**
           * List of functions called for any response from open usb devices.
           * Event data will contain <code>{string} vendorId</code> and <code>{string} productId</code> for all types.
           *  For RECEIVE types, <code>{Array} output</code> (in hexadecimal format).
           *  For ERROR types, <code>{string} exception</code>.
           *
           * @param {Function|Array<Function>} calls Single or array of <code>Function({Object} eventData)</code> calls.
           *
           * @memberof qz.usb
           */
          setUsbCallbacks: function(o) {
            n.usb.usbCallbacks = o;
          },
          /**
           * Claim a USB device's interface to enable sending/reading data across an endpoint.
           *
           * @param {object} deviceInfo Config details of the HID device.
           *  @param deviceInfo.vendorId Hex string of USB device's vendor ID.
           *  @param deviceInfo.productId Hex string of USB device's product ID.
           *  @param deviceInfo.interface Hex string of interface on the USB device to claim.
           * @returns {Promise<null|Error>}
           *
           * @memberof qz.usb
           */
          claimDevice: function(o) {
            return typeof o != "object" && (o = {
              vendorId: arguments[0],
              productId: arguments[1],
              interface: arguments[2]
            }), n.websocket.dataPromise("usb.claimDevice", o);
          },
          /**
           * Check the current claim state of a USB device.
           *
           * @param {object} deviceInfo Config details of the HID device.
           *  @param deviceInfo.vendorId Hex string of USB device's vendor ID.
           *  @param deviceInfo.productId Hex string of USB device's product ID.
           * @returns {Promise<boolean|Error>}
           *
           * @since 2.0.2
           * @memberOf qz.usb
           */
          isClaimed: function(o) {
            return typeof o != "object" && (o = { vendorId: arguments[0], productId: arguments[1] }), n.websocket.dataPromise("usb.isClaimed", o);
          },
          /**
           * Send data to a claimed USB device.
           *
           * @param {object} deviceInfo Config details of the HID device.
           *  @param deviceInfo.vendorId Hex string of USB device's vendor ID.
           *  @param deviceInfo.productId Hex string of USB device's product ID.
           *  @param deviceInfo.endpoint Hex string of endpoint on the claimed interface for the USB device.
           *  @param deviceInfo.data Bytes to send over specified endpoint.
           *  @param {string} [deviceInfo.type='PLAIN'] Valid values <code>[FILE | PLAIN | HEX | BASE64]</code>
           * @returns {Promise<null|Error>}
           *
           * @memberof qz.usb
           */
          sendData: function(o) {
            return typeof o != "object" && (o = {
              vendorId: arguments[0],
              productId: arguments[1],
              endpoint: arguments[2],
              data: arguments[3]
            }), n.tools.versionCompare(2, 1, 0, 12) >= 0 && (typeof o.data != "object" && (o.data = {
              data: o.data,
              type: "PLAIN"
            }), o.data.type && o.data.type.toUpperCase() == "FILE" && (o.data.data = n.tools.absolute(o.data.data))), n.websocket.dataPromise("usb.sendData", o);
          },
          /**
           * Read data from a claimed USB device.
           *
           * @param {object} deviceInfo Config details of the HID device.
           *  @param deviceInfo.vendorId Hex string of USB device's vendor ID.
           *  @param deviceInfo.productId Hex string of USB device's product ID.
           *  @param deviceInfo.endpoint Hex string of endpoint on the claimed interface for the USB device.
           *  @param deviceInfo.responseSize Size of the byte array to receive a response in.
           * @returns {Promise<Array<string>|Error>} List of (hexadecimal) bytes received from the USB device.
           *
           * @memberof qz.usb
           */
          readData: function(o) {
            return typeof o != "object" && (o = {
              vendorId: arguments[0],
              productId: arguments[1],
              endpoint: arguments[2],
              responseSize: arguments[3]
            }), n.websocket.dataPromise("usb.readData", o);
          },
          /**
           * Provides a continuous stream of read data from a claimed USB device.
           *
           * @param {object} deviceInfo Config details of the HID device.
           *  @param deviceInfo.vendorId Hex string of USB device's vendor ID.
           *  @param deviceInfo.productId Hex string of USB device's product ID.
           *  @param deviceInfo.endpoint Hex string of endpoint on the claimed interface for the USB device.
           *  @param deviceInfo.responseSize Size of the byte array to receive a response in.
           *  @param deviceInfo.interval=100 Frequency to send read data back, in milliseconds.
           * @returns {Promise<null|Error>}
           *
           * @see qz.usb.setUsbCallbacks
           *
           * @memberof qz.usb
           */
          openStream: function(o) {
            return typeof o != "object" && (o = {
              vendorId: arguments[0],
              productId: arguments[1],
              endpoint: arguments[2],
              responseSize: arguments[3],
              interval: arguments[4]
            }), n.websocket.dataPromise("usb.openStream", o);
          },
          /**
           * Stops the stream of read data from a claimed USB device.
           *
           * @param {object} deviceInfo Config details of the HID device.
           *  @param deviceInfo.vendorId Hex string of USB device's vendor ID.
           *  @param deviceInfo.productId Hex string of USB device's product ID.
           *  @param deviceInfo.endpoint Hex string of endpoint on the claimed interface for the USB device.
           * @returns {Promise<null|Error>}
           *
           * @memberof qz.usb
           */
          closeStream: function(o) {
            return typeof o != "object" && (o = {
              vendorId: arguments[0],
              productId: arguments[1],
              endpoint: arguments[2]
            }), n.websocket.dataPromise("usb.closeStream", o);
          },
          /**
           * Release a claimed USB device to free resources after sending/reading data.
           *
           * @param {object} deviceInfo Config details of the HID device.
           *  @param deviceInfo.vendorId Hex string of USB device's vendor ID.
           *  @param deviceInfo.productId Hex string of USB device's product ID.
           * @returns {Promise<null|Error>}
           *
           * @memberof qz.usb
           */
          releaseDevice: function(o) {
            return typeof o != "object" && (o = { vendorId: arguments[0], productId: arguments[1] }), n.websocket.dataPromise("usb.releaseDevice", o);
          }
        },
        /**
         * Calls related to interaction with HID USB devices<br/>
         * Many of these calls can be accomplished from the <code>qz.usb</code> namespace,
         * but HID allows for simpler interaction
         * @namespace qz.hid
         * @since 2.0.1
         */
        hid: {
          /**
           * List of available HID devices. Includes (hexadecimal) vendor ID and (hexadecimal) product ID.
           * If available, also returns manufacturer and product descriptions.
           *
           * @returns {Promise<Array<Object>|Error>} Array of JSON objects containing information on connected HID devices.
           * @since 2.0.1
           *
           * @memberof qz.hid
           */
          listDevices: function() {
            return n.websocket.dataPromise("hid.listDevices");
          },
          /**
           * Start listening for HID device actions, such as attach / detach events.
           * Reported under the ACTION type in the streamEvent on callbacks.
           *
           * @returns {Promise<null|Error>}
           * @since 2.0.1
           *
           * @see qz.hid.setHidCallbacks
           *
           * @memberof qz.hid
           */
          startListening: function() {
            return n.websocket.dataPromise("hid.startListening");
          },
          /**
           * Stop listening for HID device actions.
           *
           * @returns {Promise<null|Error>}
           * @since 2.0.1
           *
           * @see qz.hid.setHidCallbacks
           *
           * @memberof qz.hid
           */
          stopListening: function() {
            return n.websocket.dataPromise("hid.stopListening");
          },
          /**
           * List of functions called for any response from open usb devices.
           * Event data will contain <code>{string} vendorId</code> and <code>{string} productId</code> for all types.
           *  For RECEIVE types, <code>{Array} output</code> (in hexadecimal format).
           *  For ERROR types, <code>{string} exception</code>.
           *  For ACTION types, <code>{string} actionType</code>.
           *
           * @param {Function|Array<Function>} calls Single or array of <code>Function({Object} eventData)</code> calls.
           * @since 2.0.1
           *
           * @memberof qz.hid
           */
          setHidCallbacks: function(o) {
            n.hid.hidCallbacks = o;
          },
          /**
           * Claim a HID device to enable sending/reading data across.
           *
           * @param {object} deviceInfo Config details of the HID device.
           *  @param deviceInfo.vendorId Hex string of HID device's vendor ID.
           *  @param deviceInfo.productId Hex string of HID device's product ID.
           *  @param deviceInfo.usagePage Hex string of HID device's usage page when multiple are present.
           *  @param deviceInfo.serial Serial ID of HID device.
           * @returns {Promise<null|Error>}
           * @since 2.0.1
           *
           * @memberof qz.hid
           */
          claimDevice: function(o) {
            return typeof o != "object" && (o = { vendorId: arguments[0], productId: arguments[1] }), n.websocket.dataPromise("hid.claimDevice", o);
          },
          /**
           * Check the current claim state of a HID device.
           *
           * @param {object} deviceInfo Config details of the HID device.
           *  @param deviceInfo.vendorId Hex string of HID device's vendor ID.
           *  @param deviceInfo.productId Hex string of HID device's product ID.
           *  @param deviceInfo.usagePage Hex string of HID device's usage page when multiple are present.
           *  @param deviceInfo.serial Serial ID of HID device.
           * @returns {Promise<boolean|Error>}
           *
           * @since 2.0.2
           * @memberOf qz.hid
           */
          isClaimed: function(o) {
            return typeof o != "object" && (o = { vendorId: arguments[0], productId: arguments[1] }), n.websocket.dataPromise("hid.isClaimed", o);
          },
          /**
           * Send data to a claimed HID device.
           *
           * @param {object} deviceInfo Config details of the HID device.
           *  @param deviceInfo.vendorId Hex string of HID device's vendor ID.
           *  @param deviceInfo.productId Hex string of HID device's product ID.
           *  @param deviceInfo.usagePage Hex string of HID device's usage page when multiple are present.
           *  @param deviceInfo.serial Serial ID of HID device.
           *  @param deviceInfo.data Bytes to send over specified endpoint.
           *  @param deviceInfo.endpoint=0x00 First byte of the data packet signifying the HID report ID.
           *                             Must be 0x00 for devices only supporting a single report.
           *  @param deviceInfo.reportId=0x00 Alias for <code>deviceInfo.endpoint</code>. Not used if endpoint is provided.
           *  @param {string} [deviceInfo.type='PLAIN'] Valid values <code>[FILE | PLAIN | HEX | BASE64]</code>
           * @returns {Promise<null|Error>}
           * @since 2.0.1
           *
           * @memberof qz.hid
           */
          sendData: function(o) {
            if (typeof o != "object" && (o = {
              vendorId: arguments[0],
              productId: arguments[1],
              data: arguments[2],
              endpoint: arguments[3]
            }), n.tools.versionCompare(2, 1, 0, 12) >= 0)
              typeof o.data != "object" && (o.data = {
                data: o.data,
                type: "PLAIN"
              }), o.data.type && o.data.type.toUpperCase() == "FILE" && (o.data.data = n.tools.absolute(o.data.data));
            else if (typeof o.data == "object") {
              if (o.data.type.toUpperCase() !== "PLAIN" || typeof o.data.data != "string")
                return n.tools.reject(new Error("Data format is not supported with connected " + n.TITLE + " version " + n.websocket.connection.version));
              o.data = o.data.data;
            }
            return n.websocket.dataPromise("hid.sendData", o);
          },
          /**
           * Read data from a claimed HID device.
           *
           * @param {object} deviceInfo Config details of the HID device.
           *  @param deviceInfo.vendorId Hex string of HID device's vendor ID.
           *  @param deviceInfo.productId Hex string of HID device's product ID.
           *  @param deviceInfo.usagePage Hex string of HID device's usage page when multiple are present.
           *  @param deviceInfo.serial Serial ID of HID device.
           *  @param deviceInfo.responseSize Size of the byte array to receive a response in.
           * @returns {Promise<Array<string>|Error>} List of (hexadecimal) bytes received from the HID device.
           * @since 2.0.1
           *
           * @memberof qz.hid
           */
          readData: function(o) {
            return typeof o != "object" && (o = {
              vendorId: arguments[0],
              productId: arguments[1],
              responseSize: arguments[2]
            }), n.websocket.dataPromise("hid.readData", o);
          },
          /**
           * Send a feature report to a claimed HID device.
           *
           * @param {object} deviceInfo Config details of the HID device.
           *  @param deviceInfo.vendorId Hex string of HID device's vendor ID.
           *  @param deviceInfo.productId Hex string of HID device's product ID.
           *  @param deviceInfo.usagePage Hex string of HID device's usage page when multiple are present.
           *  @param deviceInfo.serial Serial ID of HID device.
           *  @param deviceInfo.data Bytes to send over specified endpoint.
           *  @param deviceInfo.endpoint=0x00 First byte of the data packet signifying the HID report ID.
           *                             Must be 0x00 for devices only supporting a single report.
           *  @param deviceInfo.reportId=0x00 Alias for <code>deviceInfo.endpoint</code>. Not used if endpoint is provided.
           *  @param {string} [deviceInfo.type='PLAIN'] Valid values <code>[FILE | PLAIN | HEX | BASE64]</code>
           * @returns {Promise<null|Error>}
           *
           * @memberof qz.hid
           */
          sendFeatureReport: function(o) {
            return n.websocket.dataPromise("hid.sendFeatureReport", o);
          },
          /**
           * Get a feature report from a claimed HID device.
           *
           * @param {object} deviceInfo Config details of the HID device.
           *  @param deviceInfo.vendorId Hex string of HID device's vendor ID.
           *  @param deviceInfo.productId Hex string of HID device's product ID.
           *  @param deviceInfo.usagePage Hex string of HID device's usage page when multiple are present.
           *  @param deviceInfo.serial Serial ID of HID device.
           *  @param deviceInfo.responseSize Size of the byte array to receive a response in.
           * @returns {Promise<Array<string>|Error>} List of (hexadecimal) bytes received from the HID device.
           *
           * @memberof qz.hid
           */
          getFeatureReport: function(o) {
            return n.websocket.dataPromise("hid.getFeatureReport", o);
          },
          /**
           * Provides a continuous stream of read data from a claimed HID device.
           *
           * @param {object} deviceInfo Config details of the HID device.
           *  @param deviceInfo.vendorId Hex string of HID device's vendor ID.
           *  @param deviceInfo.productId Hex string of HID device's product ID.
           *  @param deviceInfo.usagePage Hex string of HID device's usage page when multiple are present.
           *  @param deviceInfo.serial Serial ID of HID device.
           *  @param deviceInfo.responseSize Size of the byte array to receive a response in.
           *  @param deviceInfo.interval=100 Frequency to send read data back, in milliseconds.
           * @returns {Promise<null|Error>}
           * @since 2.0.1
           *
           * @see qz.hid.setHidCallbacks
           *
           * @memberof qz.hid
           */
          openStream: function(o) {
            return typeof o != "object" && (o = {
              vendorId: arguments[0],
              productId: arguments[1],
              responseSize: arguments[2],
              interval: arguments[3]
            }), n.websocket.dataPromise("hid.openStream", o);
          },
          /**
           * Stops the stream of read data from a claimed HID device.
           *
           * @param {object} deviceInfo Config details of the HID device.
           *  @param deviceInfo.vendorId Hex string of HID device's vendor ID.
           *  @param deviceInfo.productId Hex string of HID device's product ID.
           *  @param deviceInfo.usagePage Hex string of HID device's usage page when multiple are present.
           *  @param deviceInfo.serial Serial ID of HID device.
           * @returns {Promise<null|Error>}
           * @since 2.0.1
           *
           * @memberof qz.hid
           */
          closeStream: function(o) {
            return typeof o != "object" && (o = { vendorId: arguments[0], productId: arguments[1] }), n.websocket.dataPromise("hid.closeStream", o);
          },
          /**
           * Release a claimed HID device to free resources after sending/reading data.
           *
           * @param {object} deviceInfo Config details of the HID device.
           *  @param deviceInfo.vendorId Hex string of HID device's vendor ID.
           *  @param deviceInfo.productId Hex string of HID device's product ID.
           *  @param deviceInfo.usagePage Hex string of HID device's usage page when multiple are present.
           *  @param deviceInfo.serial Serial ID of HID device.
           * @returns {Promise<null|Error>}
           * @since 2.0.1
           *
           * @memberof qz.hid
           */
          releaseDevice: function(o) {
            return typeof o != "object" && (o = { vendorId: arguments[0], productId: arguments[1] }), n.websocket.dataPromise("hid.releaseDevice", o);
          }
        },
        /**
         * Calls related to interactions with the filesystem
         * @namespace qz.file
         * @since 2.1
         */
        file: {
          /**
           * List of files available at the given directory.<br/>
           * Due to security reasons, paths are limited to the qz data directory unless overridden via properties file.
           *
           * @param {string} path Relative or absolute directory path. Must reside in qz data directory or a white-listed location.
           * @param {Object} [params] Object containing file access parameters
           *  @param {boolean} [params.sandbox=true] If relative location from root is only available to the certificate's connection, otherwise all connections
           *  @param {boolean} [params.shared=true] If relative location from root is accessible to all users on the system, otherwise just the current user
           * @returns {Promise<Array<String>|Error>} Array of files at the given path
           *
           * @memberof qz.file
           */
          list: function(o, s) {
            var l = n.tools.extend({ path: o }, s);
            return n.websocket.dataPromise("file.list", l);
          },
          /**
           * Reads contents of file at the given path.<br/>
           * Due to security reasons, paths are limited to the qz data directory unless overridden via properties file.
           *
           * @param {string} path Relative or absolute file path. Must reside in qz data directory or a white-listed location.
           * @param {Object} [params] Object containing file access parameters
           *  @param {boolean} [params.sandbox=true] If relative location from root is only available to the certificate's connection, otherwise all connections
           *  @param {boolean} [params.shared=true] If relative location from root is accessible to all users on the system, otherwise just the current user
           *  @param {string} [params.flavor='plain'] Flavor of data format used, valid flavors are <code>[base64 | hex | plain]</code>.
           * @returns {Promise<String|Error>} String containing the file contents
           *
           * @memberof qz.file
           */
          read: function(o, s) {
            var l = n.tools.extend({ path: o }, s);
            return n.websocket.dataPromise("file.read", l);
          },
          /**
           * Writes data to the file at the given path.<br/>
           * Due to security reasons, paths are limited to the qz data directory unless overridden via properties file.
           *
           * @param {string} path Relative or absolute file path. Must reside in qz data directory or a white-listed location.
           * @param {Object} params Object containing file access parameters
           *  @param {string} params.data File data to be written
           *  @param {boolean} [params.sandbox=true] If relative location from root is only available to the certificate's connection, otherwise all connections
           *  @param {boolean} [params.shared=true] If relative location from root is accessible to all users on the system, otherwise just the current user
           *  @param {boolean} [params.append=false] Appends to the end of the file if set, otherwise overwrites existing contents
           *  @param {string} [params.flavor='plain'] Flavor of data format used, valid flavors are <code>[base64 | file | hex | plain]</code>.
           * @returns {Promise<null|Error>}
           *
           * @memberof qz.file
           */
          write: function(o, s) {
            var l = n.tools.extend({ path: o }, s);
            return n.websocket.dataPromise("file.write", l);
          },
          /**
           * Deletes a file at given path.<br/>
           * Due to security reasons, paths are limited to the qz data directory unless overridden via properties file.
           *
           * @param {string} path Relative or absolute file path. Must reside in qz data directory or a white-listed location.
           * @param {Object} [params] Object containing file access parameters
           *  @param {boolean} [params.sandbox=true] If relative location from root is only available to the certificate's connection, otherwise all connections
           *  @param {boolean} [params.shared=true] If relative location from root is accessible to all users on the system, otherwise just the current user
           * @returns {Promise<null|Error>}
           *
           * @memberof qz.file
           */
          remove: function(o, s) {
            var l = n.tools.extend({ path: o }, s);
            return n.websocket.dataPromise("file.remove", l);
          },
          /**
           * Provides a continuous stream of events (and optionally data) from a local file.
           *
           * @param {string} path Relative or absolute directory path. Must reside in qz data directory or a white-listed location.
           * @param {Object} [params] Object containing file access parameters
           *  @param {boolean} [params.sandbox=true] If relative location from root is only available to the certificate's connection, otherwise all connections
           *  @param {boolean} [params.shared=true] If relative location from root is accessible to all users on the system, otherwise just the current user
           *  @param {Object} [params.listener] If defined, file data will be returned on events
           *   @param {number} [params.listener.bytes=-1] Number of bytes to return or -1 for all
           *   @param {number} [params.listener.lines=-1] Number of lines to return or -1 for all
           *   @param {boolean} [params.listener.reverse] Controls whether data should be returned from the bottom of the file.  Default value is true for line mode and false for byte mode.
           *   @param {string|Array<string>} [params.include] File patterns to match.  Blank values will be ignored.
           *   @param {string|Array<string>} [params.exclude] File patterns to exclude.  Blank values will be ignored.  Takes priority over <code>params.include</code>.
           *   @param {boolean} [params.ignoreCase=true] Whether <code>params.include</code> or <code>params.exclude</code> are case-sensitive.
           * @returns {Promise<null|Error>}
           * @since 2.1.0
           *
           * @see qz.file.setFileCallbacks
           *
           * @memberof qz.file
           */
          startListening: function(o, s) {
            s && typeof s.include < "u" && !Array.isArray(s.include) && (s.include = [s.include]), s && typeof s.exclude < "u" && !Array.isArray(s.exclude) && (s.exclude = [s.exclude]);
            var l = n.tools.extend({ path: o }, s);
            return n.websocket.dataPromise("file.startListening", l);
          },
          /**
           * Closes listeners with the provided settings. Omitting the path parameter will result in all listeners closing.
           *
           * @param {string} [path] Previously opened directory path of listener to close, or omit to close all.
           * @param {Object} [params] Object containing file access parameters
           *  @param {boolean} [params.sandbox=true] If relative location from root is only available to the certificate's connection, otherwise all connections
           *  @param {boolean} [params.shared=true] If relative location from root is accessible to all users on the system, otherwise just the current user
           * @returns {Promise<null|Error>}
           *
           * @memberof qz.file
           */
          stopListening: function(o, s) {
            var l = n.tools.extend({ path: o }, s);
            return n.websocket.dataPromise("file.stopListening", l);
          },
          /**
           * List of functions called for any response from a file listener.
           *  For ERROR types event data will contain, <code>{string} message</code>.
           *  For ACTION types event data will contain, <code>{string} file {string} eventType {string} [data]</code>.
           *
           * @param {Function|Array<Function>} calls Single or array of <code>Function({Object} eventData)</code> calls.
           * @since 2.1.0
           *
           * @memberof qz.file
           */
          setFileCallbacks: function(o) {
            n.file.fileCallbacks = o;
          }
        },
        /**
         * Calls related to networking information
         * @namespace qz.networking
         * @since 2.1.0
         */
        networking: {
          /**
           * @param {string} [hostname] Hostname to try to connect to when determining network interfaces, defaults to "google.com"
           * @param {number} [port] Port to use with custom hostname, defaults to 443
           * @returns {Promise<Object|Error>} Connected system's network information.
           *
           * @memberof qz.networking
           * @since 2.1.0
           */
          device: function(o, s) {
            return n.tools.isVersion(2, 0) ? n.compatible.networking(o, s, null, null, function(l) {
              return { ip: l.ipAddress, mac: l.macAddress };
            }) : n.websocket.dataPromise("networking.device", {
              hostname: o,
              port: s
            });
          },
          /**
           * Get computer hostname
           *
           * @param {string} [hostname] DEPRECATED Hostname to try to connect to when determining network interfaces, defaults to "google.com"
           * @param {number} [port] DEPRECATED Port to use with custom hostname, defaults to 443
           * @returns {Promise<string|Error>} Connected system's hostname.
           *
           * @memberof qz.networking
           * @since 2.2.2
           */
          hostname: function(o, s) {
            return n.tools.versionCompare(2, 2, 2) < 0 ? n.tools.promise(function(l, u) {
              n.websocket.dataPromise("networking.device", { hostname: o, port: s }).then(function(c) {
                console.log(c), l(c.hostname);
              });
            }) : n.websocket.dataPromise("networking.hostname");
          },
          /**
           * @param {string} [hostname] Hostname to try to connect to when determining network interfaces, defaults to "google.com"
           * @param {number} [port] Port to use with custom hostname, defaults to 443
           * @returns {Promise<Array<Object>|Error>} Connected system's network information.
           *
           * @memberof qz.networking
           * @since 2.1.0
           */
          devices: function(o, s) {
            return n.tools.isVersion(2, 0) ? n.compatible.networking(o, s, null, null, function(l) {
              return [{ ip: l.ipAddress, mac: l.macAddress }];
            }) : n.websocket.dataPromise("networking.devices", {
              hostname: o,
              port: s
            });
          }
        },
        /**
         * Calls related to signing connection requests.
         * @namespace qz.security
         */
        security: {
          /**
           * Set promise resolver for calls to acquire the site's certificate.
           *
           * @param {Function|AsyncFunction|Promise<string>} promiseHandler Either a function that will be used as a promise resolver (of format <code>Function({function} resolve, {function}reject)</code>),
           *     an async function, or a promise. Any of which should return the public certificate via their respective <code>resolve</code> call.
           * @param {Object} [options] Configuration options for the certificate resolver
           *  @param {boolean} [options.rejectOnFailure=[false]] Overrides default behavior to call resolve with a blank certificate on failure.
           * @memberof qz.security
           */
          setCertificatePromise: function(o, s) {
            n.security.certHandler = o, n.security.rejectOnCertFailure = !!(s && s.rejectOnFailure);
          },
          /**
           * Set promise factory for calls to sign API calls.
           *
           * @param {Function|AsyncFunction} promiseFactory Either a function that accepts a string parameter of the data to be signed
           *     and returns a function to be used as a promise resolver (of format <code>Function({function} resolve, {function}reject)</code>),
           *     or an async function that can take a string parameter of the data to be signed. Either of which should return the signed contents of
           *     the passed string parameter via their respective <code>resolve</code> call.
           *
           * @example
           *  qz.security.setSignaturePromise(function(dataToSign) {
           *    return function(resolve, reject) {
           *      $.ajax("/signing-url?data=" + dataToSign).then(resolve, reject);
           *    }
           *  })
           *
           * @memberof qz.security
           */
          setSignaturePromise: function(o) {
            n.security.signatureFactory = o;
          },
          /**
           * Set which signing algorithm QZ will check signatures against.
           *
           * @param {string} algorithm The algorithm used in signing. Valid values: <code>[SHA1 | SHA256 | SHA512]</code>
           * @since 2.1.0
           *
           * @memberof qz.security
           */
          setSignatureAlgorithm: function(o) {
            n.compatible.algorithm() && (["SHA1", "SHA256", "SHA512"].indexOf(o.toUpperCase()) < 0 ? n.log.error("Signing algorithm '" + o + "' is not supported.") : n.security.signAlgorithm = o);
          },
          /**
           * Get the signing algorithm QZ will be checking signatures against.
           *
           * @returns {string} The algorithm used in signing.
           * @since 2.1.0
           *
           * @memberof qz.security
           */
          getSignatureAlgorithm: function() {
            return n.security.signAlgorithm;
          }
        },
        /**
         * Calls related to compatibility adjustments
         * @namespace qz.api
         */
        api: {
          /**
           * Show or hide QZ api debugging statements in the browser console.
           *
           * @param {boolean} show Whether the debugging logs for QZ should be shown. Hidden by default.
           * @returns {boolean} Value of debugging flag
           * @memberof qz.api
           */
          showDebug: function(o) {
            return n.DEBUG = o;
          },
          /**
           * Get internal branding title used by logs and exceptions (e.g "QZ Tray")
           *
           * @returns {string} Internal title used for logs and exceptions
           *
           * @memberof qz.api
           */
          getTitle: function() {
            return n.TITLE;
          },
          /**
           * Get version of connected QZ Tray application.
           *
           * @param {Object} [options] Version options
           *  @param {boolean} [options.details=false] Returns additional details such as <code>title</code>, <code>vendor</code>, <code>url</code> and <code>email</code>.
           * @returns {Promise<string|Error>} Version number of QZ Tray.
           *
           * @memberof qz.api
           */
          getVersion: function(o) {
            return n.websocket.dataPromise("getVersion", o);
          },
          /**
           * Checks for the specified version of connected QZ Tray application.
           *
           * @param {string|number} [major] Major version to check
           * @param {string|number} [minor] Minor version to check
           * @param {string|number} [patch] Patch version to check
           *
           * @memberof qz.api
           */
          isVersion: n.tools.isVersion,
          /**
           * Checks if the connected QZ Tray application is greater than the specified version.
           *
           * @param {string|number} major Major version to check
           * @param {string|number} [minor] Minor version to check
           * @param {string|number} [patch] Patch version to check
           * @param {string|number} [build] Build version to check
           * @returns {boolean} True if connected version is greater than the version specified.
           *
           * @memberof qz.api
           * @since 2.1.0-4
           */
          isVersionGreater: function(o, s, l, u) {
            return n.tools.versionCompare(o, s, l, u) > 0;
          },
          /**
           * Checks if the connected QZ Tray application is less than the specified version.
           *
           * @param {string|number} major Major version to check
           * @param {string|number} [minor] Minor version to check
           * @param {string|number} [patch] Patch version to check
           * @param {string|number} [build] Build version to check
           * @returns {boolean} True if connected version is less than the version specified.
           *
           * @memberof qz.api
           * @since 2.1.0-4
           */
          isVersionLess: function(o, s, l, u) {
            return n.tools.versionCompare(o, s, l, u) < 0;
          },
          /**
           * Change the promise library used by QZ API.
           * Should be called before any initialization to avoid possible errors.
           *
           * @param {Function} promiser <code>Function({function} resolver)</code> called to create new promises.
           *
           * @memberof qz.api
           */
          setPromiseType: function(o) {
            n.tools.promise = o;
          },
          /**
           * Change the SHA-256 hashing function used by QZ API.
           * Should be called before any initialization to avoid possible errors.
           *
           * @param {Function} hasher <code>Function({function} message)</code> called to create hash of passed string.
           *
           * @memberof qz.api
           */
          setSha256Type: function(o) {
            n.tools.hash = o;
          },
          /**
           * Change the internal branding of "QZ Tray" for logs and exceptions
           * Must be called before any connection attempts are made to appear in messaging
           *
           * @param {string} title Internal name to be used in place of "QZ Tray" for logs and exceptions
           *
           * @memberof qz.api
           */
          setTitle: function(o) {
            n.TITLE = o;
          },
          /**
           * Change the WebSocket handler.
           * Should be called before any initialization to avoid possible errors.
           *
           * @param {Function} ws <code>Function({function} WebSocket)</code> called to override the internal WebSocket handler.
           *
           * @memberof qz.api
           */
          setWebSocketType: function(o) {
            n.tools.ws = o;
          }
        },
        /**
         * Version of this JavaScript library
         *
         * @constant {string}
         *
         * @memberof qz
         */
        version: n.VERSION
      };
      return a;
    })();
    (function() {
      e.exports = r;
    })();
  })(mr)), mr.exports;
}
var Ku = zu();
const Ee = /* @__PURE__ */ Gs(Ku);
var Bt = {}, br, ti;
function Wu() {
  return ti || (ti = 1, br = function() {
    return typeof Promise == "function" && Promise.prototype && Promise.prototype.then;
  }), br;
}
var yr = {}, gt = {}, ni;
function Rt() {
  if (ni) return gt;
  ni = 1;
  let e;
  const t = [
    0,
    // Not used
    26,
    44,
    70,
    100,
    134,
    172,
    196,
    242,
    292,
    346,
    404,
    466,
    532,
    581,
    655,
    733,
    815,
    901,
    991,
    1085,
    1156,
    1258,
    1364,
    1474,
    1588,
    1706,
    1828,
    1921,
    2051,
    2185,
    2323,
    2465,
    2611,
    2761,
    2876,
    3034,
    3196,
    3362,
    3532,
    3706
  ];
  return gt.getSymbolSize = function(n) {
    if (!n) throw new Error('"version" cannot be null or undefined');
    if (n < 1 || n > 40) throw new Error('"version" should be in range from 1 to 40');
    return n * 4 + 17;
  }, gt.getSymbolTotalCodewords = function(n) {
    return t[n];
  }, gt.getBCHDigit = function(r) {
    let n = 0;
    for (; r !== 0; )
      n++, r >>>= 1;
    return n;
  }, gt.setToSJISFunction = function(n) {
    if (typeof n != "function")
      throw new Error('"toSJISFunc" is not a valid function.');
    e = n;
  }, gt.isKanjiModeEnabled = function() {
    return typeof e < "u";
  }, gt.toSJIS = function(n) {
    return e(n);
  }, gt;
}
var wr = {}, ri;
function ho() {
  return ri || (ri = 1, (function(e) {
    e.L = { bit: 1 }, e.M = { bit: 0 }, e.Q = { bit: 3 }, e.H = { bit: 2 };
    function t(r) {
      if (typeof r != "string")
        throw new Error("Param is not a string");
      switch (r.toLowerCase()) {
        case "l":
        case "low":
          return e.L;
        case "m":
        case "medium":
          return e.M;
        case "q":
        case "quartile":
          return e.Q;
        case "h":
        case "high":
          return e.H;
        default:
          throw new Error("Unknown EC Level: " + r);
      }
    }
    e.isValid = function(n) {
      return n && typeof n.bit < "u" && n.bit >= 0 && n.bit < 4;
    }, e.from = function(n, i) {
      if (e.isValid(n))
        return n;
      try {
        return t(n);
      } catch {
        return i;
      }
    };
  })(wr)), wr;
}
var vr, oi;
function Ju() {
  if (oi) return vr;
  oi = 1;
  function e() {
    this.buffer = [], this.length = 0;
  }
  return e.prototype = {
    get: function(t) {
      const r = Math.floor(t / 8);
      return (this.buffer[r] >>> 7 - t % 8 & 1) === 1;
    },
    put: function(t, r) {
      for (let n = 0; n < r; n++)
        this.putBit((t >>> r - n - 1 & 1) === 1);
    },
    getLengthInBits: function() {
      return this.length;
    },
    putBit: function(t) {
      const r = Math.floor(this.length / 8);
      this.buffer.length <= r && this.buffer.push(0), t && (this.buffer[r] |= 128 >>> this.length % 8), this.length++;
    }
  }, vr = e, vr;
}
var kr, ii;
function Gu() {
  if (ii) return kr;
  ii = 1;
  function e(t) {
    if (!t || t < 1)
      throw new Error("BitMatrix size must be defined and greater than 0");
    this.size = t, this.data = new Uint8Array(t * t), this.reservedBit = new Uint8Array(t * t);
  }
  return e.prototype.set = function(t, r, n, i) {
    const a = t * this.size + r;
    this.data[a] = n, i && (this.reservedBit[a] = !0);
  }, e.prototype.get = function(t, r) {
    return this.data[t * this.size + r];
  }, e.prototype.xor = function(t, r, n) {
    this.data[t * this.size + r] ^= n;
  }, e.prototype.isReserved = function(t, r) {
    return this.reservedBit[t * this.size + r];
  }, kr = e, kr;
}
var _r = {}, si;
function Qu() {
  return si || (si = 1, (function(e) {
    const t = Rt().getSymbolSize;
    e.getRowColCoords = function(n) {
      if (n === 1) return [];
      const i = Math.floor(n / 7) + 2, a = t(n), o = a === 145 ? 26 : Math.ceil((a - 13) / (2 * i - 2)) * 2, s = [a - 7];
      for (let l = 1; l < i - 1; l++)
        s[l] = s[l - 1] - o;
      return s.push(6), s.reverse();
    }, e.getPositions = function(n) {
      const i = [], a = e.getRowColCoords(n), o = a.length;
      for (let s = 0; s < o; s++)
        for (let l = 0; l < o; l++)
          s === 0 && l === 0 || // top-left
          s === 0 && l === o - 1 || // bottom-left
          s === o - 1 && l === 0 || i.push([a[s], a[l]]);
      return i;
    };
  })(_r)), _r;
}
var Cr = {}, li;
function Yu() {
  if (li) return Cr;
  li = 1;
  const e = Rt().getSymbolSize, t = 7;
  return Cr.getPositions = function(n) {
    const i = e(n);
    return [
      // top-left
      [0, 0],
      // top-right
      [i - t, 0],
      // bottom-left
      [0, i - t]
    ];
  }, Cr;
}
var Sr = {}, ai;
function Xu() {
  return ai || (ai = 1, (function(e) {
    e.Patterns = {
      PATTERN000: 0,
      PATTERN001: 1,
      PATTERN010: 2,
      PATTERN011: 3,
      PATTERN100: 4,
      PATTERN101: 5,
      PATTERN110: 6,
      PATTERN111: 7
    };
    const t = {
      N1: 3,
      N2: 3,
      N3: 40,
      N4: 10
    };
    e.isValid = function(i) {
      return i != null && i !== "" && !isNaN(i) && i >= 0 && i <= 7;
    }, e.from = function(i) {
      return e.isValid(i) ? parseInt(i, 10) : void 0;
    }, e.getPenaltyN1 = function(i) {
      const a = i.size;
      let o = 0, s = 0, l = 0, u = null, c = null;
      for (let d = 0; d < a; d++) {
        s = l = 0, u = c = null;
        for (let h = 0; h < a; h++) {
          let g = i.get(d, h);
          g === u ? s++ : (s >= 5 && (o += t.N1 + (s - 5)), u = g, s = 1), g = i.get(h, d), g === c ? l++ : (l >= 5 && (o += t.N1 + (l - 5)), c = g, l = 1);
        }
        s >= 5 && (o += t.N1 + (s - 5)), l >= 5 && (o += t.N1 + (l - 5));
      }
      return o;
    }, e.getPenaltyN2 = function(i) {
      const a = i.size;
      let o = 0;
      for (let s = 0; s < a - 1; s++)
        for (let l = 0; l < a - 1; l++) {
          const u = i.get(s, l) + i.get(s, l + 1) + i.get(s + 1, l) + i.get(s + 1, l + 1);
          (u === 4 || u === 0) && o++;
        }
      return o * t.N2;
    }, e.getPenaltyN3 = function(i) {
      const a = i.size;
      let o = 0, s = 0, l = 0;
      for (let u = 0; u < a; u++) {
        s = l = 0;
        for (let c = 0; c < a; c++)
          s = s << 1 & 2047 | i.get(u, c), c >= 10 && (s === 1488 || s === 93) && o++, l = l << 1 & 2047 | i.get(c, u), c >= 10 && (l === 1488 || l === 93) && o++;
      }
      return o * t.N3;
    }, e.getPenaltyN4 = function(i) {
      let a = 0;
      const o = i.data.length;
      for (let l = 0; l < o; l++) a += i.data[l];
      return Math.abs(Math.ceil(a * 100 / o / 5) - 10) * t.N4;
    };
    function r(n, i, a) {
      switch (n) {
        case e.Patterns.PATTERN000:
          return (i + a) % 2 === 0;
        case e.Patterns.PATTERN001:
          return i % 2 === 0;
        case e.Patterns.PATTERN010:
          return a % 3 === 0;
        case e.Patterns.PATTERN011:
          return (i + a) % 3 === 0;
        case e.Patterns.PATTERN100:
          return (Math.floor(i / 2) + Math.floor(a / 3)) % 2 === 0;
        case e.Patterns.PATTERN101:
          return i * a % 2 + i * a % 3 === 0;
        case e.Patterns.PATTERN110:
          return (i * a % 2 + i * a % 3) % 2 === 0;
        case e.Patterns.PATTERN111:
          return (i * a % 3 + (i + a) % 2) % 2 === 0;
        default:
          throw new Error("bad maskPattern:" + n);
      }
    }
    e.applyMask = function(i, a) {
      const o = a.size;
      for (let s = 0; s < o; s++)
        for (let l = 0; l < o; l++)
          a.isReserved(l, s) || a.xor(l, s, r(i, l, s));
    }, e.getBestMask = function(i, a) {
      const o = Object.keys(e.Patterns).length;
      let s = 0, l = 1 / 0;
      for (let u = 0; u < o; u++) {
        a(u), e.applyMask(u, i);
        const c = e.getPenaltyN1(i) + e.getPenaltyN2(i) + e.getPenaltyN3(i) + e.getPenaltyN4(i);
        e.applyMask(u, i), c < l && (l = c, s = u);
      }
      return s;
    };
  })(Sr)), Sr;
}
var xn = {}, ui;
function Qs() {
  if (ui) return xn;
  ui = 1;
  const e = ho(), t = [
    // L  M  Q  H
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    2,
    2,
    1,
    2,
    2,
    4,
    1,
    2,
    4,
    4,
    2,
    4,
    4,
    4,
    2,
    4,
    6,
    5,
    2,
    4,
    6,
    6,
    2,
    5,
    8,
    8,
    4,
    5,
    8,
    8,
    4,
    5,
    8,
    11,
    4,
    8,
    10,
    11,
    4,
    9,
    12,
    16,
    4,
    9,
    16,
    16,
    6,
    10,
    12,
    18,
    6,
    10,
    17,
    16,
    6,
    11,
    16,
    19,
    6,
    13,
    18,
    21,
    7,
    14,
    21,
    25,
    8,
    16,
    20,
    25,
    8,
    17,
    23,
    25,
    9,
    17,
    23,
    34,
    9,
    18,
    25,
    30,
    10,
    20,
    27,
    32,
    12,
    21,
    29,
    35,
    12,
    23,
    34,
    37,
    12,
    25,
    34,
    40,
    13,
    26,
    35,
    42,
    14,
    28,
    38,
    45,
    15,
    29,
    40,
    48,
    16,
    31,
    43,
    51,
    17,
    33,
    45,
    54,
    18,
    35,
    48,
    57,
    19,
    37,
    51,
    60,
    19,
    38,
    53,
    63,
    20,
    40,
    56,
    66,
    21,
    43,
    59,
    70,
    22,
    45,
    62,
    74,
    24,
    47,
    65,
    77,
    25,
    49,
    68,
    81
  ], r = [
    // L  M  Q  H
    7,
    10,
    13,
    17,
    10,
    16,
    22,
    28,
    15,
    26,
    36,
    44,
    20,
    36,
    52,
    64,
    26,
    48,
    72,
    88,
    36,
    64,
    96,
    112,
    40,
    72,
    108,
    130,
    48,
    88,
    132,
    156,
    60,
    110,
    160,
    192,
    72,
    130,
    192,
    224,
    80,
    150,
    224,
    264,
    96,
    176,
    260,
    308,
    104,
    198,
    288,
    352,
    120,
    216,
    320,
    384,
    132,
    240,
    360,
    432,
    144,
    280,
    408,
    480,
    168,
    308,
    448,
    532,
    180,
    338,
    504,
    588,
    196,
    364,
    546,
    650,
    224,
    416,
    600,
    700,
    224,
    442,
    644,
    750,
    252,
    476,
    690,
    816,
    270,
    504,
    750,
    900,
    300,
    560,
    810,
    960,
    312,
    588,
    870,
    1050,
    336,
    644,
    952,
    1110,
    360,
    700,
    1020,
    1200,
    390,
    728,
    1050,
    1260,
    420,
    784,
    1140,
    1350,
    450,
    812,
    1200,
    1440,
    480,
    868,
    1290,
    1530,
    510,
    924,
    1350,
    1620,
    540,
    980,
    1440,
    1710,
    570,
    1036,
    1530,
    1800,
    570,
    1064,
    1590,
    1890,
    600,
    1120,
    1680,
    1980,
    630,
    1204,
    1770,
    2100,
    660,
    1260,
    1860,
    2220,
    720,
    1316,
    1950,
    2310,
    750,
    1372,
    2040,
    2430
  ];
  return xn.getBlocksCount = function(i, a) {
    switch (a) {
      case e.L:
        return t[(i - 1) * 4 + 0];
      case e.M:
        return t[(i - 1) * 4 + 1];
      case e.Q:
        return t[(i - 1) * 4 + 2];
      case e.H:
        return t[(i - 1) * 4 + 3];
      default:
        return;
    }
  }, xn.getTotalCodewordsCount = function(i, a) {
    switch (a) {
      case e.L:
        return r[(i - 1) * 4 + 0];
      case e.M:
        return r[(i - 1) * 4 + 1];
      case e.Q:
        return r[(i - 1) * 4 + 2];
      case e.H:
        return r[(i - 1) * 4 + 3];
      default:
        return;
    }
  }, xn;
}
var xr = {}, Wt = {}, ci;
function Zu() {
  if (ci) return Wt;
  ci = 1;
  const e = new Uint8Array(512), t = new Uint8Array(256);
  return (function() {
    let n = 1;
    for (let i = 0; i < 255; i++)
      e[i] = n, t[n] = i, n <<= 1, n & 256 && (n ^= 285);
    for (let i = 255; i < 512; i++)
      e[i] = e[i - 255];
  })(), Wt.log = function(n) {
    if (n < 1) throw new Error("log(" + n + ")");
    return t[n];
  }, Wt.exp = function(n) {
    return e[n];
  }, Wt.mul = function(n, i) {
    return n === 0 || i === 0 ? 0 : e[t[n] + t[i]];
  }, Wt;
}
var fi;
function ec() {
  return fi || (fi = 1, (function(e) {
    const t = Zu();
    e.mul = function(n, i) {
      const a = new Uint8Array(n.length + i.length - 1);
      for (let o = 0; o < n.length; o++)
        for (let s = 0; s < i.length; s++)
          a[o + s] ^= t.mul(n[o], i[s]);
      return a;
    }, e.mod = function(n, i) {
      let a = new Uint8Array(n);
      for (; a.length - i.length >= 0; ) {
        const o = a[0];
        for (let l = 0; l < i.length; l++)
          a[l] ^= t.mul(i[l], o);
        let s = 0;
        for (; s < a.length && a[s] === 0; ) s++;
        a = a.slice(s);
      }
      return a;
    }, e.generateECPolynomial = function(n) {
      let i = new Uint8Array([1]);
      for (let a = 0; a < n; a++)
        i = e.mul(i, new Uint8Array([1, t.exp(a)]));
      return i;
    };
  })(xr)), xr;
}
var Ar, di;
function tc() {
  if (di) return Ar;
  di = 1;
  const e = ec();
  function t(r) {
    this.genPoly = void 0, this.degree = r, this.degree && this.initialize(this.degree);
  }
  return t.prototype.initialize = function(n) {
    this.degree = n, this.genPoly = e.generateECPolynomial(this.degree);
  }, t.prototype.encode = function(n) {
    if (!this.genPoly)
      throw new Error("Encoder not initialized");
    const i = new Uint8Array(n.length + this.degree);
    i.set(n);
    const a = e.mod(i, this.genPoly), o = this.degree - a.length;
    if (o > 0) {
      const s = new Uint8Array(this.degree);
      return s.set(a, o), s;
    }
    return a;
  }, Ar = t, Ar;
}
var Er = {}, Pr = {}, Tr = {}, pi;
function Ys() {
  return pi || (pi = 1, Tr.isValid = function(t) {
    return !isNaN(t) && t >= 1 && t <= 40;
  }), Tr;
}
var Je = {}, hi;
function Xs() {
  if (hi) return Je;
  hi = 1;
  const e = "[0-9]+", t = "[A-Z $%*+\\-./:]+";
  let r = "(?:[u3000-u303F]|[u3040-u309F]|[u30A0-u30FF]|[uFF00-uFFEF]|[u4E00-u9FAF]|[u2605-u2606]|[u2190-u2195]|u203B|[u2010u2015u2018u2019u2025u2026u201Cu201Du2225u2260]|[u0391-u0451]|[u00A7u00A8u00B1u00B4u00D7u00F7])+";
  r = r.replace(/u/g, "\\u");
  const n = "(?:(?![A-Z0-9 $%*+\\-./:]|" + r + `)(?:.|[\r
]))+`;
  Je.KANJI = new RegExp(r, "g"), Je.BYTE_KANJI = new RegExp("[^A-Z0-9 $%*+\\-./:]+", "g"), Je.BYTE = new RegExp(n, "g"), Je.NUMERIC = new RegExp(e, "g"), Je.ALPHANUMERIC = new RegExp(t, "g");
  const i = new RegExp("^" + r + "$"), a = new RegExp("^" + e + "$"), o = new RegExp("^[A-Z0-9 $%*+\\-./:]+$");
  return Je.testKanji = function(l) {
    return i.test(l);
  }, Je.testNumeric = function(l) {
    return a.test(l);
  }, Je.testAlphanumeric = function(l) {
    return o.test(l);
  }, Je;
}
var gi;
function Nt() {
  return gi || (gi = 1, (function(e) {
    const t = Ys(), r = Xs();
    e.NUMERIC = {
      id: "Numeric",
      bit: 1,
      ccBits: [10, 12, 14]
    }, e.ALPHANUMERIC = {
      id: "Alphanumeric",
      bit: 2,
      ccBits: [9, 11, 13]
    }, e.BYTE = {
      id: "Byte",
      bit: 4,
      ccBits: [8, 16, 16]
    }, e.KANJI = {
      id: "Kanji",
      bit: 8,
      ccBits: [8, 10, 12]
    }, e.MIXED = {
      bit: -1
    }, e.getCharCountIndicator = function(a, o) {
      if (!a.ccBits) throw new Error("Invalid mode: " + a);
      if (!t.isValid(o))
        throw new Error("Invalid version: " + o);
      return o >= 1 && o < 10 ? a.ccBits[0] : o < 27 ? a.ccBits[1] : a.ccBits[2];
    }, e.getBestModeForData = function(a) {
      return r.testNumeric(a) ? e.NUMERIC : r.testAlphanumeric(a) ? e.ALPHANUMERIC : r.testKanji(a) ? e.KANJI : e.BYTE;
    }, e.toString = function(a) {
      if (a && a.id) return a.id;
      throw new Error("Invalid mode");
    }, e.isValid = function(a) {
      return a && a.bit && a.ccBits;
    };
    function n(i) {
      if (typeof i != "string")
        throw new Error("Param is not a string");
      switch (i.toLowerCase()) {
        case "numeric":
          return e.NUMERIC;
        case "alphanumeric":
          return e.ALPHANUMERIC;
        case "kanji":
          return e.KANJI;
        case "byte":
          return e.BYTE;
        default:
          throw new Error("Unknown mode: " + i);
      }
    }
    e.from = function(a, o) {
      if (e.isValid(a))
        return a;
      try {
        return n(a);
      } catch {
        return o;
      }
    };
  })(Pr)), Pr;
}
var mi;
function nc() {
  return mi || (mi = 1, (function(e) {
    const t = Rt(), r = Qs(), n = ho(), i = Nt(), a = Ys(), o = 7973, s = t.getBCHDigit(o);
    function l(h, g, E) {
      for (let w = 1; w <= 40; w++)
        if (g <= e.getCapacity(w, E, h))
          return w;
    }
    function u(h, g) {
      return i.getCharCountIndicator(h, g) + 4;
    }
    function c(h, g) {
      let E = 0;
      return h.forEach(function(w) {
        const q = u(w.mode, g);
        E += q + w.getBitsLength();
      }), E;
    }
    function d(h, g) {
      for (let E = 1; E <= 40; E++)
        if (c(h, E) <= e.getCapacity(E, g, i.MIXED))
          return E;
    }
    e.from = function(g, E) {
      return a.isValid(g) ? parseInt(g, 10) : E;
    }, e.getCapacity = function(g, E, w) {
      if (!a.isValid(g))
        throw new Error("Invalid QR Code version");
      typeof w > "u" && (w = i.BYTE);
      const q = t.getSymbolTotalCodewords(g), M = r.getTotalCodewordsCount(g, E), A = (q - M) * 8;
      if (w === i.MIXED) return A;
      const P = A - u(w, g);
      switch (w) {
        case i.NUMERIC:
          return Math.floor(P / 10 * 3);
        case i.ALPHANUMERIC:
          return Math.floor(P / 11 * 2);
        case i.KANJI:
          return Math.floor(P / 13);
        case i.BYTE:
        default:
          return Math.floor(P / 8);
      }
    }, e.getBestVersionForData = function(g, E) {
      let w;
      const q = n.from(E, n.M);
      if (Array.isArray(g)) {
        if (g.length > 1)
          return d(g, q);
        if (g.length === 0)
          return 1;
        w = g[0];
      } else
        w = g;
      return l(w.mode, w.getLength(), q);
    }, e.getEncodedBits = function(g) {
      if (!a.isValid(g) || g < 7)
        throw new Error("Invalid QR Code version");
      let E = g << 12;
      for (; t.getBCHDigit(E) - s >= 0; )
        E ^= o << t.getBCHDigit(E) - s;
      return g << 12 | E;
    };
  })(Er)), Er;
}
var Mr = {}, bi;
function rc() {
  if (bi) return Mr;
  bi = 1;
  const e = Rt(), t = 1335, r = 21522, n = e.getBCHDigit(t);
  return Mr.getEncodedBits = function(a, o) {
    const s = a.bit << 3 | o;
    let l = s << 10;
    for (; e.getBCHDigit(l) - n >= 0; )
      l ^= t << e.getBCHDigit(l) - n;
    return (s << 10 | l) ^ r;
  }, Mr;
}
var Lr = {}, Ir, yi;
function oc() {
  if (yi) return Ir;
  yi = 1;
  const e = Nt();
  function t(r) {
    this.mode = e.NUMERIC, this.data = r.toString();
  }
  return t.getBitsLength = function(n) {
    return 10 * Math.floor(n / 3) + (n % 3 ? n % 3 * 3 + 1 : 0);
  }, t.prototype.getLength = function() {
    return this.data.length;
  }, t.prototype.getBitsLength = function() {
    return t.getBitsLength(this.data.length);
  }, t.prototype.write = function(n) {
    let i, a, o;
    for (i = 0; i + 3 <= this.data.length; i += 3)
      a = this.data.substr(i, 3), o = parseInt(a, 10), n.put(o, 10);
    const s = this.data.length - i;
    s > 0 && (a = this.data.substr(i), o = parseInt(a, 10), n.put(o, s * 3 + 1));
  }, Ir = t, Ir;
}
var Rr, wi;
function ic() {
  if (wi) return Rr;
  wi = 1;
  const e = Nt(), t = [
    "0",
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "A",
    "B",
    "C",
    "D",
    "E",
    "F",
    "G",
    "H",
    "I",
    "J",
    "K",
    "L",
    "M",
    "N",
    "O",
    "P",
    "Q",
    "R",
    "S",
    "T",
    "U",
    "V",
    "W",
    "X",
    "Y",
    "Z",
    " ",
    "$",
    "%",
    "*",
    "+",
    "-",
    ".",
    "/",
    ":"
  ];
  function r(n) {
    this.mode = e.ALPHANUMERIC, this.data = n;
  }
  return r.getBitsLength = function(i) {
    return 11 * Math.floor(i / 2) + 6 * (i % 2);
  }, r.prototype.getLength = function() {
    return this.data.length;
  }, r.prototype.getBitsLength = function() {
    return r.getBitsLength(this.data.length);
  }, r.prototype.write = function(i) {
    let a;
    for (a = 0; a + 2 <= this.data.length; a += 2) {
      let o = t.indexOf(this.data[a]) * 45;
      o += t.indexOf(this.data[a + 1]), i.put(o, 11);
    }
    this.data.length % 2 && i.put(t.indexOf(this.data[a]), 6);
  }, Rr = r, Rr;
}
var Nr, vi;
function sc() {
  if (vi) return Nr;
  vi = 1;
  const e = Nt();
  function t(r) {
    this.mode = e.BYTE, typeof r == "string" ? this.data = new TextEncoder().encode(r) : this.data = new Uint8Array(r);
  }
  return t.getBitsLength = function(n) {
    return n * 8;
  }, t.prototype.getLength = function() {
    return this.data.length;
  }, t.prototype.getBitsLength = function() {
    return t.getBitsLength(this.data.length);
  }, t.prototype.write = function(r) {
    for (let n = 0, i = this.data.length; n < i; n++)
      r.put(this.data[n], 8);
  }, Nr = t, Nr;
}
var Or, ki;
function lc() {
  if (ki) return Or;
  ki = 1;
  const e = Nt(), t = Rt();
  function r(n) {
    this.mode = e.KANJI, this.data = n;
  }
  return r.getBitsLength = function(i) {
    return i * 13;
  }, r.prototype.getLength = function() {
    return this.data.length;
  }, r.prototype.getBitsLength = function() {
    return r.getBitsLength(this.data.length);
  }, r.prototype.write = function(n) {
    let i;
    for (i = 0; i < this.data.length; i++) {
      let a = t.toSJIS(this.data[i]);
      if (a >= 33088 && a <= 40956)
        a -= 33088;
      else if (a >= 57408 && a <= 60351)
        a -= 49472;
      else
        throw new Error(
          "Invalid SJIS character: " + this.data[i] + `
Make sure your charset is UTF-8`
        );
      a = (a >>> 8 & 255) * 192 + (a & 255), n.put(a, 13);
    }
  }, Or = r, Or;
}
var Fr = { exports: {} }, _i;
function ac() {
  return _i || (_i = 1, (function(e) {
    var t = {
      single_source_shortest_paths: function(r, n, i) {
        var a = {}, o = {};
        o[n] = 0;
        var s = t.PriorityQueue.make();
        s.push(n, 0);
        for (var l, u, c, d, h, g, E, w, q; !s.empty(); ) {
          l = s.pop(), u = l.value, d = l.cost, h = r[u] || {};
          for (c in h)
            h.hasOwnProperty(c) && (g = h[c], E = d + g, w = o[c], q = typeof o[c] > "u", (q || w > E) && (o[c] = E, s.push(c, E), a[c] = u));
        }
        if (typeof i < "u" && typeof o[i] > "u") {
          var M = ["Could not find a path from ", n, " to ", i, "."].join("");
          throw new Error(M);
        }
        return a;
      },
      extract_shortest_path_from_predecessor_list: function(r, n) {
        for (var i = [], a = n; a; )
          i.push(a), r[a], a = r[a];
        return i.reverse(), i;
      },
      find_path: function(r, n, i) {
        var a = t.single_source_shortest_paths(r, n, i);
        return t.extract_shortest_path_from_predecessor_list(
          a,
          i
        );
      },
      /**
       * A very naive priority queue implementation.
       */
      PriorityQueue: {
        make: function(r) {
          var n = t.PriorityQueue, i = {}, a;
          r = r || {};
          for (a in n)
            n.hasOwnProperty(a) && (i[a] = n[a]);
          return i.queue = [], i.sorter = r.sorter || n.default_sorter, i;
        },
        default_sorter: function(r, n) {
          return r.cost - n.cost;
        },
        /**
         * Add a new item to the queue and ensure the highest priority element
         * is at the front of the queue.
         */
        push: function(r, n) {
          var i = { value: r, cost: n };
          this.queue.push(i), this.queue.sort(this.sorter);
        },
        /**
         * Return the highest priority element in the queue.
         */
        pop: function() {
          return this.queue.shift();
        },
        empty: function() {
          return this.queue.length === 0;
        }
      }
    };
    e.exports = t;
  })(Fr)), Fr.exports;
}
var Ci;
function uc() {
  return Ci || (Ci = 1, (function(e) {
    const t = Nt(), r = oc(), n = ic(), i = sc(), a = lc(), o = Xs(), s = Rt(), l = ac();
    function u(M) {
      return unescape(encodeURIComponent(M)).length;
    }
    function c(M, A, P) {
      const k = [];
      let D;
      for (; (D = M.exec(P)) !== null; )
        k.push({
          data: D[0],
          index: D.index,
          mode: A,
          length: D[0].length
        });
      return k;
    }
    function d(M) {
      const A = c(o.NUMERIC, t.NUMERIC, M), P = c(o.ALPHANUMERIC, t.ALPHANUMERIC, M);
      let k, D;
      return s.isKanjiModeEnabled() ? (k = c(o.BYTE, t.BYTE, M), D = c(o.KANJI, t.KANJI, M)) : (k = c(o.BYTE_KANJI, t.BYTE, M), D = []), A.concat(P, k, D).sort(function(b, B) {
        return b.index - B.index;
      }).map(function(b) {
        return {
          data: b.data,
          mode: b.mode,
          length: b.length
        };
      });
    }
    function h(M, A) {
      switch (A) {
        case t.NUMERIC:
          return r.getBitsLength(M);
        case t.ALPHANUMERIC:
          return n.getBitsLength(M);
        case t.KANJI:
          return a.getBitsLength(M);
        case t.BYTE:
          return i.getBitsLength(M);
      }
    }
    function g(M) {
      return M.reduce(function(A, P) {
        const k = A.length - 1 >= 0 ? A[A.length - 1] : null;
        return k && k.mode === P.mode ? (A[A.length - 1].data += P.data, A) : (A.push(P), A);
      }, []);
    }
    function E(M) {
      const A = [];
      for (let P = 0; P < M.length; P++) {
        const k = M[P];
        switch (k.mode) {
          case t.NUMERIC:
            A.push([
              k,
              { data: k.data, mode: t.ALPHANUMERIC, length: k.length },
              { data: k.data, mode: t.BYTE, length: k.length }
            ]);
            break;
          case t.ALPHANUMERIC:
            A.push([
              k,
              { data: k.data, mode: t.BYTE, length: k.length }
            ]);
            break;
          case t.KANJI:
            A.push([
              k,
              { data: k.data, mode: t.BYTE, length: u(k.data) }
            ]);
            break;
          case t.BYTE:
            A.push([
              { data: k.data, mode: t.BYTE, length: u(k.data) }
            ]);
        }
      }
      return A;
    }
    function w(M, A) {
      const P = {}, k = { start: {} };
      let D = ["start"];
      for (let y = 0; y < M.length; y++) {
        const b = M[y], B = [];
        for (let R = 0; R < b.length; R++) {
          const v = b[R], L = "" + y + R;
          B.push(L), P[L] = { node: v, lastCount: 0 }, k[L] = {};
          for (let U = 0; U < D.length; U++) {
            const $ = D[U];
            P[$] && P[$].node.mode === v.mode ? (k[$][L] = h(P[$].lastCount + v.length, v.mode) - h(P[$].lastCount, v.mode), P[$].lastCount += v.length) : (P[$] && (P[$].lastCount = v.length), k[$][L] = h(v.length, v.mode) + 4 + t.getCharCountIndicator(v.mode, A));
          }
        }
        D = B;
      }
      for (let y = 0; y < D.length; y++)
        k[D[y]].end = 0;
      return { map: k, table: P };
    }
    function q(M, A) {
      let P;
      const k = t.getBestModeForData(M);
      if (P = t.from(A, k), P !== t.BYTE && P.bit < k.bit)
        throw new Error('"' + M + '" cannot be encoded with mode ' + t.toString(P) + `.
 Suggested mode is: ` + t.toString(k));
      switch (P === t.KANJI && !s.isKanjiModeEnabled() && (P = t.BYTE), P) {
        case t.NUMERIC:
          return new r(M);
        case t.ALPHANUMERIC:
          return new n(M);
        case t.KANJI:
          return new a(M);
        case t.BYTE:
          return new i(M);
      }
    }
    e.fromArray = function(A) {
      return A.reduce(function(P, k) {
        return typeof k == "string" ? P.push(q(k, null)) : k.data && P.push(q(k.data, k.mode)), P;
      }, []);
    }, e.fromString = function(A, P) {
      const k = d(A, s.isKanjiModeEnabled()), D = E(k), y = w(D, P), b = l.find_path(y.map, "start", "end"), B = [];
      for (let R = 1; R < b.length - 1; R++)
        B.push(y.table[b[R]].node);
      return e.fromArray(g(B));
    }, e.rawSplit = function(A) {
      return e.fromArray(
        d(A, s.isKanjiModeEnabled())
      );
    };
  })(Lr)), Lr;
}
var Si;
function cc() {
  if (Si) return yr;
  Si = 1;
  const e = Rt(), t = ho(), r = Ju(), n = Gu(), i = Qu(), a = Yu(), o = Xu(), s = Qs(), l = tc(), u = nc(), c = rc(), d = Nt(), h = uc();
  function g(y, b) {
    const B = y.size, R = a.getPositions(b);
    for (let v = 0; v < R.length; v++) {
      const L = R[v][0], U = R[v][1];
      for (let $ = -1; $ <= 7; $++)
        if (!(L + $ <= -1 || B <= L + $))
          for (let K = -1; K <= 7; K++)
            U + K <= -1 || B <= U + K || ($ >= 0 && $ <= 6 && (K === 0 || K === 6) || K >= 0 && K <= 6 && ($ === 0 || $ === 6) || $ >= 2 && $ <= 4 && K >= 2 && K <= 4 ? y.set(L + $, U + K, !0, !0) : y.set(L + $, U + K, !1, !0));
    }
  }
  function E(y) {
    const b = y.size;
    for (let B = 8; B < b - 8; B++) {
      const R = B % 2 === 0;
      y.set(B, 6, R, !0), y.set(6, B, R, !0);
    }
  }
  function w(y, b) {
    const B = i.getPositions(b);
    for (let R = 0; R < B.length; R++) {
      const v = B[R][0], L = B[R][1];
      for (let U = -2; U <= 2; U++)
        for (let $ = -2; $ <= 2; $++)
          U === -2 || U === 2 || $ === -2 || $ === 2 || U === 0 && $ === 0 ? y.set(v + U, L + $, !0, !0) : y.set(v + U, L + $, !1, !0);
    }
  }
  function q(y, b) {
    const B = y.size, R = u.getEncodedBits(b);
    let v, L, U;
    for (let $ = 0; $ < 18; $++)
      v = Math.floor($ / 3), L = $ % 3 + B - 8 - 3, U = (R >> $ & 1) === 1, y.set(v, L, U, !0), y.set(L, v, U, !0);
  }
  function M(y, b, B) {
    const R = y.size, v = c.getEncodedBits(b, B);
    let L, U;
    for (L = 0; L < 15; L++)
      U = (v >> L & 1) === 1, L < 6 ? y.set(L, 8, U, !0) : L < 8 ? y.set(L + 1, 8, U, !0) : y.set(R - 15 + L, 8, U, !0), L < 8 ? y.set(8, R - L - 1, U, !0) : L < 9 ? y.set(8, 15 - L - 1 + 1, U, !0) : y.set(8, 15 - L - 1, U, !0);
    y.set(R - 8, 8, 1, !0);
  }
  function A(y, b) {
    const B = y.size;
    let R = -1, v = B - 1, L = 7, U = 0;
    for (let $ = B - 1; $ > 0; $ -= 2)
      for ($ === 6 && $--; ; ) {
        for (let K = 0; K < 2; K++)
          if (!y.isReserved(v, $ - K)) {
            let Be = !1;
            U < b.length && (Be = (b[U] >>> L & 1) === 1), y.set(v, $ - K, Be), L--, L === -1 && (U++, L = 7);
          }
        if (v += R, v < 0 || B <= v) {
          v -= R, R = -R;
          break;
        }
      }
  }
  function P(y, b, B) {
    const R = new r();
    B.forEach(function(K) {
      R.put(K.mode.bit, 4), R.put(K.getLength(), d.getCharCountIndicator(K.mode, y)), K.write(R);
    });
    const v = e.getSymbolTotalCodewords(y), L = s.getTotalCodewordsCount(y, b), U = (v - L) * 8;
    for (R.getLengthInBits() + 4 <= U && R.put(0, 4); R.getLengthInBits() % 8 !== 0; )
      R.putBit(0);
    const $ = (U - R.getLengthInBits()) / 8;
    for (let K = 0; K < $; K++)
      R.put(K % 2 ? 17 : 236, 8);
    return k(R, y, b);
  }
  function k(y, b, B) {
    const R = e.getSymbolTotalCodewords(b), v = s.getTotalCodewordsCount(b, B), L = R - v, U = s.getBlocksCount(b, B), $ = R % U, K = U - $, Be = Math.floor(R / U), ue = Math.floor(L / U), se = ue + 1, ee = Be - ue, it = new l(ee);
    let pt = 0;
    const Me = new Array(U), Ce = new Array(U);
    let Ot = 0;
    const bn = new Uint8Array(y.buffer);
    for (let Ie = 0; Ie < U; Ie++) {
      const yn = Ie < K ? ue : se;
      Me[Ie] = bn.slice(pt, pt + yn), Ce[Ie] = it.encode(Me[Ie]), pt += yn, Ot = Math.max(Ot, yn);
    }
    const Ht = new Uint8Array(R);
    let ht = 0, Se, Le;
    for (Se = 0; Se < Ot; Se++)
      for (Le = 0; Le < U; Le++)
        Se < Me[Le].length && (Ht[ht++] = Me[Le][Se]);
    for (Se = 0; Se < ee; Se++)
      for (Le = 0; Le < U; Le++)
        Ht[ht++] = Ce[Le][Se];
    return Ht;
  }
  function D(y, b, B, R) {
    let v;
    if (Array.isArray(y))
      v = h.fromArray(y);
    else if (typeof y == "string") {
      let Be = b;
      if (!Be) {
        const ue = h.rawSplit(y);
        Be = u.getBestVersionForData(ue, B);
      }
      v = h.fromString(y, Be || 40);
    } else
      throw new Error("Invalid data");
    const L = u.getBestVersionForData(v, B);
    if (!L)
      throw new Error("The amount of data is too big to be stored in a QR Code");
    if (!b)
      b = L;
    else if (b < L)
      throw new Error(
        `
The chosen QR Code version cannot contain this amount of data.
Minimum version required to store current data is: ` + L + `.
`
      );
    const U = P(b, B, v), $ = e.getSymbolSize(b), K = new n($);
    return g(K, b), E(K), w(K, b), M(K, B, 0), b >= 7 && q(K, b), A(K, U), isNaN(R) && (R = o.getBestMask(
      K,
      M.bind(null, K, B)
    )), o.applyMask(R, K), M(K, B, R), {
      modules: K,
      version: b,
      errorCorrectionLevel: B,
      maskPattern: R,
      segments: v
    };
  }
  return yr.create = function(b, B) {
    if (typeof b > "u" || b === "")
      throw new Error("No input text");
    let R = t.M, v, L;
    return typeof B < "u" && (R = t.from(B.errorCorrectionLevel, t.M), v = u.from(B.version), L = o.from(B.maskPattern), B.toSJISFunc && e.setToSJISFunction(B.toSJISFunc)), D(b, v, R, L);
  }, yr;
}
var Br = {}, Dr = {}, xi;
function Zs() {
  return xi || (xi = 1, (function(e) {
    function t(r) {
      if (typeof r == "number" && (r = r.toString()), typeof r != "string")
        throw new Error("Color should be defined as hex string");
      let n = r.slice().replace("#", "").split("");
      if (n.length < 3 || n.length === 5 || n.length > 8)
        throw new Error("Invalid hex color: " + r);
      (n.length === 3 || n.length === 4) && (n = Array.prototype.concat.apply([], n.map(function(a) {
        return [a, a];
      }))), n.length === 6 && n.push("F", "F");
      const i = parseInt(n.join(""), 16);
      return {
        r: i >> 24 & 255,
        g: i >> 16 & 255,
        b: i >> 8 & 255,
        a: i & 255,
        hex: "#" + n.slice(0, 6).join("")
      };
    }
    e.getOptions = function(n) {
      n || (n = {}), n.color || (n.color = {});
      const i = typeof n.margin > "u" || n.margin === null || n.margin < 0 ? 4 : n.margin, a = n.width && n.width >= 21 ? n.width : void 0, o = n.scale || 4;
      return {
        width: a,
        scale: a ? 4 : o,
        margin: i,
        color: {
          dark: t(n.color.dark || "#000000ff"),
          light: t(n.color.light || "#ffffffff")
        },
        type: n.type,
        rendererOpts: n.rendererOpts || {}
      };
    }, e.getScale = function(n, i) {
      return i.width && i.width >= n + i.margin * 2 ? i.width / (n + i.margin * 2) : i.scale;
    }, e.getImageWidth = function(n, i) {
      const a = e.getScale(n, i);
      return Math.floor((n + i.margin * 2) * a);
    }, e.qrToImageData = function(n, i, a) {
      const o = i.modules.size, s = i.modules.data, l = e.getScale(o, a), u = Math.floor((o + a.margin * 2) * l), c = a.margin * l, d = [a.color.light, a.color.dark];
      for (let h = 0; h < u; h++)
        for (let g = 0; g < u; g++) {
          let E = (h * u + g) * 4, w = a.color.light;
          if (h >= c && g >= c && h < u - c && g < u - c) {
            const q = Math.floor((h - c) / l), M = Math.floor((g - c) / l);
            w = d[s[q * o + M] ? 1 : 0];
          }
          n[E++] = w.r, n[E++] = w.g, n[E++] = w.b, n[E] = w.a;
        }
    };
  })(Dr)), Dr;
}
var Ai;
function fc() {
  return Ai || (Ai = 1, (function(e) {
    const t = Zs();
    function r(i, a, o) {
      i.clearRect(0, 0, a.width, a.height), a.style || (a.style = {}), a.height = o, a.width = o, a.style.height = o + "px", a.style.width = o + "px";
    }
    function n() {
      try {
        return document.createElement("canvas");
      } catch {
        throw new Error("You need to specify a canvas element");
      }
    }
    e.render = function(a, o, s) {
      let l = s, u = o;
      typeof l > "u" && (!o || !o.getContext) && (l = o, o = void 0), o || (u = n()), l = t.getOptions(l);
      const c = t.getImageWidth(a.modules.size, l), d = u.getContext("2d"), h = d.createImageData(c, c);
      return t.qrToImageData(h.data, a, l), r(d, u, c), d.putImageData(h, 0, 0), u;
    }, e.renderToDataURL = function(a, o, s) {
      let l = s;
      typeof l > "u" && (!o || !o.getContext) && (l = o, o = void 0), l || (l = {});
      const u = e.render(a, o, l), c = l.type || "image/png", d = l.rendererOpts || {};
      return u.toDataURL(c, d.quality);
    };
  })(Br)), Br;
}
var qr = {}, Ei;
function dc() {
  if (Ei) return qr;
  Ei = 1;
  const e = Zs();
  function t(i, a) {
    const o = i.a / 255, s = a + '="' + i.hex + '"';
    return o < 1 ? s + " " + a + '-opacity="' + o.toFixed(2).slice(1) + '"' : s;
  }
  function r(i, a, o) {
    let s = i + a;
    return typeof o < "u" && (s += " " + o), s;
  }
  function n(i, a, o) {
    let s = "", l = 0, u = !1, c = 0;
    for (let d = 0; d < i.length; d++) {
      const h = Math.floor(d % a), g = Math.floor(d / a);
      !h && !u && (u = !0), i[d] ? (c++, d > 0 && h > 0 && i[d - 1] || (s += u ? r("M", h + o, 0.5 + g + o) : r("m", l, 0), l = 0, u = !1), h + 1 < a && i[d + 1] || (s += r("h", c), c = 0)) : l++;
    }
    return s;
  }
  return qr.render = function(a, o, s) {
    const l = e.getOptions(o), u = a.modules.size, c = a.modules.data, d = u + l.margin * 2, h = l.color.light.a ? "<path " + t(l.color.light, "fill") + ' d="M0 0h' + d + "v" + d + 'H0z"/>' : "", g = "<path " + t(l.color.dark, "stroke") + ' d="' + n(c, u, l.margin) + '"/>', E = 'viewBox="0 0 ' + d + " " + d + '"', q = '<svg xmlns="http://www.w3.org/2000/svg" ' + (l.width ? 'width="' + l.width + '" height="' + l.width + '" ' : "") + E + ' shape-rendering="crispEdges">' + h + g + `</svg>
`;
    return typeof s == "function" && s(null, q), q;
  }, qr;
}
var Pi;
function pc() {
  if (Pi) return Bt;
  Pi = 1;
  const e = Wu(), t = cc(), r = fc(), n = dc();
  function i(a, o, s, l, u) {
    const c = [].slice.call(arguments, 1), d = c.length, h = typeof c[d - 1] == "function";
    if (!h && !e())
      throw new Error("Callback required as last argument");
    if (h) {
      if (d < 2)
        throw new Error("Too few arguments provided");
      d === 2 ? (u = s, s = o, o = l = void 0) : d === 3 && (o.getContext && typeof u > "u" ? (u = l, l = void 0) : (u = l, l = s, s = o, o = void 0));
    } else {
      if (d < 1)
        throw new Error("Too few arguments provided");
      return d === 1 ? (s = o, o = l = void 0) : d === 2 && !o.getContext && (l = s, s = o, o = void 0), new Promise(function(g, E) {
        try {
          const w = t.create(s, l);
          g(a(w, o, l));
        } catch (w) {
          E(w);
        }
      });
    }
    try {
      const g = t.create(s, l);
      u(null, a(g, o, l));
    } catch (g) {
      u(g);
    }
  }
  return Bt.create = t.create, Bt.toCanvas = i.bind(null, r.render), Bt.toDataURL = i.bind(null, r.renderToDataURL), Bt.toString = i.bind(null, function(a, o, s) {
    return n.render(a, s);
  }), Bt;
}
var hc = pc();
const Ti = /* @__PURE__ */ Gs(hc), go = "product_qr:wo_label_layout:v1", $n = Object.freeze({
  // Original ZPL: 400 dots/column, 160 dots high at 203 DPI; QR ^BQN,2,4.
  // Point sizes round back to the original 21-dot and 26-dot fonts.
  printer: "",
  width: 50,
  height: 20,
  columns: 2,
  gap: 0,
  dpi: 203,
  margin: 0,
  qrSize: 16,
  fontSize: 7.45,
  productFontSize: 9.22,
  lineHeight: 1,
  align: "left",
  showSku: !0,
  showMfg: !0,
  showExp: !0,
  showSequence: !0,
  footer: "",
  leftX: 0,
  leftY: 0,
  rightX: 0,
  rightY: 0,
  textWidth: 0,
  prefixFontSize: 0,
  nameLines: 1,
  showPrefix: !0,
  bold: !0,
  qzTimeout: 8
}), Qt = [
  { key: "qzTimeout", label: "Timeout koneksi QZ (detik)", min: 1, max: 60, step: 1 },
  { key: "width", label: "Lebar label (mm)", min: 30, max: 120, step: 0.5 },
  { key: "height", label: "Tinggi label (mm)", min: 20, max: 150, step: 0.5 },
  { key: "columns", label: "Jumlah kolom", min: 1, max: 3, step: 1 },
  { key: "gap", label: "Jarak antarkolom (mm)", min: 0, max: 10, step: 0.5 },
  { key: "dpi", label: "Resolusi printer (DPI)", min: 203, max: 600, step: 1 },
  { key: "margin", label: "Margin tambahan (mm)", min: 0, max: 8, step: 0.5 },
  { key: "qrSize", label: "Ukuran QR acuan (mm)", min: 10, max: 30, step: 0.5 },
  { key: "fontSize", label: "Ukuran teks (pt)", min: 6, max: 18, step: 0.01 },
  { key: "productFontSize", label: "Ukuran nama produk (pt)", min: 8, max: 30, step: 0.01 },
  { key: "lineHeight", label: "Spasi baris", min: 1, max: 2, step: 0.1 },
  { key: "leftX", label: "Geser QR horizontal (mm)", min: -50, max: 50, step: 0.1 },
  { key: "leftY", label: "Geser QR vertikal (mm)", min: -50, max: 50, step: 0.1 },
  { key: "rightX", label: "Geser teks horizontal (mm)", min: -50, max: 50, step: 0.1 },
  { key: "rightY", label: "Geser teks vertikal (mm)", min: -50, max: 50, step: 0.1 },
  { key: "textWidth", label: "Lebar area teks (mm; 0 = otomatis)", min: 0, max: 120, step: 0.5 },
  { key: "prefixFontSize", label: "Ukuran prefix (pt; 0 = otomatis)", min: 0, max: 18, step: 0.01 },
  { key: "nameLines", label: "Maksimal baris nama produk", min: 1, max: 4, step: 1 }
];
function kt(e = {}) {
  e = e && typeof e == "object" ? e : {};
  const t = { ...$n };
  for (const r of Qt) {
    const n = Number(e[r.key]);
    e[r.key] !== "" && e[r.key] != null && Number.isFinite(n) && (t[r.key] = Math.min(r.max, Math.max(r.min, n)));
  }
  t.columns = Math.round(t.columns), t.nameLines = Math.round(t.nameLines), t.qzTimeout = Math.round(t.qzTimeout), t.dpi = [203, 300, 600].includes(Number(e.dpi)) ? Number(e.dpi) : 203, t.align = ["left", "center", "right"].includes(e.align) ? e.align : "left";
  for (const r of ["showSku", "showMfg", "showExp", "showSequence", "showPrefix", "bold"])
    e[r] != null && (t[r] = e[r] === !0 || e[r] === 1);
  return t.printer = String(e.printer || "").slice(0, 200), t.footer = String(e.footer || "").slice(0, 100), t;
}
function nr(e = globalThis.localStorage) {
  try {
    const t = e?.getItem(go);
    if (!t) return null;
    const r = JSON.parse(t);
    return r && typeof r == "object" && !Array.isArray(r) ? kt(r) : null;
  } catch {
    return null;
  }
}
function gc(e, t = globalThis.localStorage) {
  const r = kt(e);
  if (!t) throw new Error("Penyimpanan browser tidak tersedia.");
  return t.setItem(go, JSON.stringify(r)), r;
}
function mc(e = globalThis.localStorage) {
  if (!e) throw new Error("Penyimpanan browser tidak tersedia.");
  e.removeItem(go);
}
const bc = (e) => String(e ?? "").replace(/[&<>"']/g, (t) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[t]), yc = (e) => String(e ?? "").replace(/[_^~\\]/g, (t) => ({ _: "_5F", "^": "_5E", "~": "_7E", "\\": "_5C" })[t]), Mi = (e) => e ? String(e).slice(0, 10).split("-").reverse().map((t, r) => r === 2 ? t.slice(-2) : t).join("-") : "-", De = (e, t) => Math.round(e * t.dpi / 25.4), wc = Object.freeze({
  sku: "SKU-TEST",
  item_name: "Dough Ropi Butter",
  item_name_prefix: "Dough",
  item_name_main: "Ropi Butter",
  manufacturing_date: "2026-10-20",
  expiry_date: "2026-11-20",
  label_count: 1,
  labels: [{ label_number: 1, qr_value: "TEST-NOT-A-PRODUCTION-SERIAL", serial_no: "TEST" }]
});
function el(e) {
  const t = e.dpi / 203, r = (o) => Math.round(o * t), n = De(e.margin, e), i = Math.round(e.fontSize * e.dpi / 72), a = Math.round(e.productFontSize * e.dpi / 72);
  return {
    unit: r,
    shift: n,
    size: i,
    productSize: a,
    column: De(e.width, e),
    gap: De(e.gap, e),
    height: De(e.height, e),
    qrX: Math.max(0, r(68) + n + De(e.leftX, e)),
    qrY: Math.max(0, r(32) + n + De(e.leftY, e)),
    qrScale: Math.min(10, Math.max(2, Math.round(4 * e.qrSize / $n.qrSize * t))),
    textX: Math.max(0, r(192) + n + De(e.rightX, e)),
    textY: Math.max(0, r(32) + n + De(e.rightY, e)),
    sequenceX: Math.max(0, r(355) + n + De(e.rightX, e)),
    sequenceY: Math.max(0, r(28) + n + De(e.rightY, e)),
    fontRatio: i / 21,
    productRatio: a / 26
  };
}
function tl(e, t, r, n) {
  const i = [], a = Math.round(18 * n.fontRatio);
  r.showSequence && i.push({ x: n.sequenceX, y: n.sequenceY, size: a, text: String(t), sequence: !0, lines: 1 });
  let o = n.textY;
  const s = (l, u, c = 1) => i.push({ x: n.textX, y: o, size: u, text: l, lines: c });
  if (e.item_name_prefix) {
    const l = r.prefixFontSize > 0 ? Math.round(r.prefixFontSize * r.dpi / 72) : a;
    r.showPrefix && s(e.item_name_prefix, l), o += Math.round(20 * l / 18 * r.lineHeight), s(e.item_name_main || "", n.productSize, r.nameLines), o += Math.round((28 * n.productRatio + n.productSize * (r.nameLines - 1)) * r.lineHeight);
  } else
    s(e.item_name_main || e.item_name || "", n.productSize, r.nameLines), o += Math.round((30 * n.productRatio + n.productSize * (r.nameLines - 1)) * r.lineHeight);
  for (const [l, u] of [[r.showSku, `SKU : ${e.sku}`], [r.showMfg, `MFG : ${Mi(e.manufacturing_date)}`], [r.showExp, `EXP : ${Mi(e.expiry_date)}`]])
    l && s(u, n.size), o += Math.round(24 * n.fontRatio * r.lineHeight);
  return r.footer && s(r.footer, n.size), i;
}
const Li = (e) => {
  const t = String(e ?? ""), r = yc(t);
  return `${r === t ? "" : "^FH_"}^FD${r}^FS
`;
};
function nl(e, t) {
  const r = Math.max(1, t.column - t.textX - t.shift);
  return e.textWidth > 0 ? Math.max(1, Math.min(r, De(e.textWidth, e))) : r;
}
function rl(e, t) {
  const r = kt(t), n = el(r), i = [], a = (o, s) => {
    const l = r.textWidth > 0 || o.lines > 1 || r.align !== "left", u = o.sequence ? `^FB${n.unit(40)},1,0,R` : l ? `^FB${nl(r, n)},${o.lines},0,${{ left: "L", center: "C", right: "R" }[r.align]}` : "", c = (d) => `^FO${d},${o.y}^A0N,${o.size},${o.size}${u}${Li(o.text)}`;
    return c(s + o.x) + (r.bold ? c(s + o.x + n.unit(1)) : "");
  };
  for (let o = 0; o < e.labels.length; o += r.columns) {
    let s = `^XA
^PW${n.column * r.columns + n.gap * (r.columns - 1)}
^LL${n.height}
`;
    for (let l = 0; l < r.columns && o + l < e.labels.length; l++) {
      const u = e.labels[o + l], c = l * (n.column + n.gap), d = tl(e, u.label_number ?? o + l + 1, r, n);
      d[0]?.sequence && (s += a(d.shift(), c)), s += `^FO${c + n.qrX},${n.qrY}^BQN,2,${n.qrScale}${Li(`QA,${u.qr_value}`)}`;
      for (const h of d) s += a(h, c);
    }
    i.push(s + `^XZ
`);
  }
  return i;
}
async function vc(e, t) {
  const r = kt(t), n = el(r), i = (s) => s * 25.4 / r.dpi, a = [];
  for (let s = 0; s < e.labels.length; s += r.columns) {
    const l = await Promise.all(e.labels.slice(s, s + r.columns).map(async (u, c) => {
      const d = { errorCorrectionLevel: "Q", margin: 0 }, h = await Ti.toString(u.qr_value, { ...d, type: "svg" }), g = Ti.create(u.qr_value, d).modules.size * n.qrScale, E = tl(e, u.label_number ?? s + c + 1, r, n).map((w) => {
        const q = w.sequence ? n.unit(40) : nl(r, n), M = w.lines > 1, A = M || !w.sequence && r.textWidth > 0;
        return `<div class="label-text" style="left:${i(w.x)}mm;top:${i(w.y)}mm;font-size:${i(w.size)}mm;width:${i(q)}mm;text-align:${w.sequence ? "right" : r.align};font-weight:${r.bold ? 700 : 400};white-space:${M ? "normal" : "nowrap"};${A ? `overflow-wrap:anywhere;max-height:${i(w.size * w.lines)}mm;overflow:hidden;` : ""}">${bc(w.text)}</div>`;
      }).join("");
      return `<article><div class="qr" style="left:${i(n.qrX)}mm;top:${i(n.qrY)}mm;width:${i(g)}mm;height:${i(g)}mm">${h}</div>${E}</article>`;
    }));
    a.push(`<section>${l.join("")}</section>`);
  }
  const o = r.width * r.columns + r.gap * (r.columns - 1);
  return `<!doctype html><html lang="id"><head><meta charset="utf-8"><style>
    @page{size:${o}mm ${r.height}mm;margin:0}*{box-sizing:border-box}html,body{margin:0;padding:0;font-family:Arial,sans-serif;color:#000}
    section{width:${o}mm;height:${r.height}mm;display:flex;gap:${r.gap}mm;break-after:page;page-break-after:always}section:last-child{break-after:auto;page-break-after:auto}
    article{width:${r.width}mm;height:${r.height}mm;position:relative;overflow:hidden;flex-shrink:0;background:white}
    .qr,.label-text{position:absolute}.qr svg{width:100%;height:100%;display:block}.label-text{font-family:Arial,sans-serif;font-weight:700;line-height:1;white-space:nowrap}
    @media screen{body{background:#eee}section{margin-bottom:4px}}
    </style></head><body>${a.join("")}</body></html>`;
}
let Ii;
const Ri = {
  async print(e, t) {
    const r = await vc(e, t);
    Ii?.remove();
    const n = document.createElement("iframe");
    Ii = n, n.title = "Cetak label Work Order", n.setAttribute("aria-hidden", "true"), n.style.cssText = "position:fixed;left:-10000px;top:0;width:1px;height:1px;border:0";
    try {
      await new Promise((i, a) => {
        const o = setTimeout(() => a(new Error("Halaman cetak browser tidak selesai dimuat.")), 15e3);
        n.onload = () => {
          clearTimeout(o), i();
        }, n.onerror = () => {
          clearTimeout(o), a(new Error("Gagal memuat halaman cetak browser."));
        }, n.srcdoc = r, document.body.appendChild(n);
      }), n.contentWindow.addEventListener("afterprint", () => n.remove(), { once: !0 }), n.contentWindow.focus(), n.contentWindow.print();
    } catch (i) {
      throw n.remove(), i;
    }
  }
};
async function kc(e) {
  const t = kt(e || nr());
  await mo(null, { layoutTest: !0, timeoutSeconds: t.qzTimeout });
  const [r, n] = await Promise.allSettled([Ee.printers.find(), Ee.printers.getDefault()]);
  if (r.status === "rejected") throw r.reason;
  return {
    printers: Array.isArray(r.value) ? r.value : r.value ? [r.value] : [],
    defaultPrinter: n.status === "fulfilled" && n.value || ""
  };
}
async function _c(e) {
  const t = kt(e), r = rl(wc, t);
  await mo(null, { layoutTest: !0, timeoutSeconds: t.qzTimeout });
  const n = t.printer || await Ee.printers.getDefault();
  return await Ee.print(Ee.configs.create(n, { encoding: "UTF-8" }), r), n;
}
function ol(e, t) {
  try {
    const n = JSON.parse(e?._server_messages || "[]").map((i) => JSON.parse(i).message).filter(Boolean).join(" ");
    if (n) return n;
  } catch {
  }
  return t;
}
async function Cc(e) {
  const t = await fetch("/api/method/product_qr.wo_labels.labels.get_existing_label_numbers", {
    method: "POST",
    credentials: "same-origin",
    cache: "no-store",
    headers: {
      "Content-Type": "application/json",
      "X-Frappe-CSRF-Token": window.csrf_token || ""
    },
    body: JSON.stringify({ name: e })
  }), r = await t.json();
  if (!t.ok) throw new Error(ol(r, "Gagal memuat nomor urut label yang sudah terbit"));
  return r.message || [];
}
function Sc(e, { layoutTest: t = !1 } = {}) {
  Ee.security.setCertificatePromise(async () => {
    const r = t ? "/api/method/product_qr.wo_labels.qz_signing.layout_certificate" : `/api/method/product_qr.wo_labels.qz_signing.certificate?work_order=${encodeURIComponent(e)}`, n = await fetch(r, {
      cache: "no-store"
    });
    if (!n.ok) throw new Error("Sertifikat QZ Tray belum tersedia atau akses ditolak");
    return (await n.json()).message;
  }, { rejectOnFailure: !0 }), Ee.security.setSignatureAlgorithm("SHA512"), Ee.security.setSignaturePromise(async (r) => {
    const n = await fetch(t ? "/api/method/product_qr.wo_labels.qz_signing.layout_sign" : "/api/method/product_qr.wo_labels.qz_signing.sign", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Frappe-CSRF-Token": window.csrf_token || ""
      },
      credentials: "same-origin",
      cache: "no-store",
      body: JSON.stringify(t ? { request: r } : { work_order: e, request: r })
    });
    if (!n.ok) throw new Error("Gagal menandatangani permintaan QZ Tray");
    return (await n.json()).message;
  });
}
async function mo(e, { layoutTest: t = !1, timeoutSeconds: r = nr()?.qzTimeout } = {}) {
  const n = kt({ qzTimeout: r }).qzTimeout;
  if (Sc(e, { layoutTest: t }), !Ee.websocket.isActive()) {
    let i;
    try {
      await Promise.race([
        Ee.websocket.connect({ retries: 0 }),
        new Promise((a, o) => {
          i = setTimeout(() => {
            try {
              Promise.resolve(Ee.websocket.disconnect()).catch(() => {
              });
            } catch {
            }
            o(new Error(`QZ Tray tidak merespons dalam ${n} detik.`));
          }, n * 1e3);
        })
      ]);
    } finally {
      clearTimeout(i);
    }
  }
}
async function xc(e, t = 0) {
  const r = t && typeof t == "object" ? t : { extra: t }, n = { name: e, extra: r.extra ?? 0 };
  r.appendCount !== void 0 && (n.append_count = r.appendCount), r.labelNumbers !== void 0 && (n.label_numbers = r.labelNumbers);
  const i = await fetch("/api/method/product_qr.wo_labels.labels.get_label_data", {
    method: "POST",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
      "X-Frappe-CSRF-Token": window.csrf_token || ""
    },
    body: JSON.stringify(n)
  }), a = await i.json();
  if (!i.ok)
    throw new Error(ol(a, "Gagal mengambil data label"));
  const { message: o } = a;
  if (!o)
    throw new Error("Data label kosong");
  const s = o.labels?.length || 0;
  if (!s || s !== o.label_count) throw new Error("Jumlah label tidak sesuai");
  const l = nr();
  if (r.output === "browser")
    try {
      return await Ri.print(o, l), { browserPrint: !0 };
    } catch (u) {
      throw new Error(`Cetak browser gagal: ${u.message || u}. Gunakan cetak ulang nomor label yang sudah terbit; jangan tambah label lagi.`);
    }
  try {
    await mo(e, { timeoutSeconds: l?.qzTimeout });
    const u = l?.printer || await Ee.printers.getDefault(), c = Ee.configs.create(u, {
      encoding: "UTF-8"
    });
    return await Ee.print(c, rl(o, l)), !0;
  } catch (u) {
    console.error("QZ Tray Error:", u);
    try {
      return await Ri.print(o, l), { browserFallback: !0 };
    } catch (c) {
      throw new Error(`Cetak gagal: ${u.message || u}. Cetak browser juga gagal: ${c.message || c}. Gunakan cetak ulang nomor label yang sudah terbit; jangan tambah label lagi.`);
    }
  }
}
const Ac = {
  key: 0,
  class: "label-print-note",
  role: "status"
}, Ec = { id: "label-print-title" }, Pc = ["disabled"], Tc = {
  key: 0,
  class: "label-count-field"
}, Mc = ["max"], Lc = {
  key: 1,
  class: "label-count-field"
}, Ic = {
  key: 0,
  class: "label-print-note"
}, Rc = {
  key: 2,
  class: "label-count-field"
}, Nc = { class: "label-print-note" }, Oc = { key: 0 }, Fc = {
  key: 0,
  class: "label-print-note"
}, Bc = {
  key: 1,
  class: "label-print-note warning"
}, Dc = {
  key: 2,
  class: "label-print-note"
}, qc = ["value"], Uc = {
  key: 4,
  class: "label-print-note"
}, $c = { key: 3 }, Hc = { key: 4 }, jc = { key: 5 }, Vc = {
  key: 6,
  class: "label-print-note warning"
}, zc = { class: "dlg-actions" }, Kc = ["disabled"], Wc = ["disabled"], Jc = { id: "wo-label-error-title" }, Gc = { class: "error-dialog-message" }, Qc = {
  key: 0,
  class: "error-dialog-details"
}, Yc = { class: "dlg-actions" }, Xc = {
  __name: "WorkOrderLabelDialogs",
  setup(e) {
    const t = /* @__PURE__ */ le(null), r = /* @__PURE__ */ le(null), n = /* @__PURE__ */ le(null), i = /* @__PURE__ */ le(null), a = /* @__PURE__ */ le(""), o = /* @__PURE__ */ le(!1), s = /* @__PURE__ */ le("automatic"), l = /* @__PURE__ */ le(1), u = /* @__PURE__ */ le(0), c = /* @__PURE__ */ le([]), d = /* @__PURE__ */ le(""), h = /* @__PURE__ */ le(null), g = /* @__PURE__ */ le(!1), E = /* @__PURE__ */ le("");
    let w = 0;
    const q = ft(() => u.value !== "" && Number.isInteger(Number(u.value)) && Number(u.value) >= 0), M = ft(() => l.value !== "" && Number.isInteger(Number(l.value)) && Number(l.value) >= 1 && Number(l.value) <= 1e4), A = ft(() => Math.max(0, ...c.value.map((R) => Number(R.label_number) || 0))), P = ft(() => s.value === "automatic" ? ge.labelCount + Number(u.value || 0) : s.value === "append" ? Number(l.value || 0) : d.value ? 1 : 0), k = ft(() => s.value === "automatic" ? q.value && P.value >= 1 && P.value <= 1e4 : s.value === "append" ? c.value.length > 0 && M.value : c.value.some((R) => Number(R.label_number) === Number(d.value)));
    async function D(R = ge.workOrder) {
      if (!R) return;
      a.value = "";
      const v = ++w;
      g.value = !0, E.value = "";
      try {
        const L = await Cc(R);
        v === w && R === ge.workOrder && (c.value = L?.labels || [], h.value = L?.adonan_ke ?? null);
      } catch (L) {
        v === w && (c.value = [], h.value = null, E.value = L.message || "Gagal memuat nomor urut label.");
      } finally {
        v === w && (g.value = !1);
      }
    }
    en(() => ge.workOrder, (R) => {
      R && (s.value = "automatic", l.value = 1, u.value = 0, c.value = [], d.value = "", h.value = null, D(R), Ln(() => {
        t.value?.open || t.value?.showModal();
      }));
    }), en(i, (R) => {
      R && Ln(() => {
        r.value?.open || r.value?.showModal(), n.value?.focus();
      });
    });
    function y() {
      o.value || (t.value?.open && t.value.close(), w++, s.value = "automatic", l.value = 1, u.value = 0, c.value = [], d.value = "", h.value = null, g.value = !1, E.value = "", ge.workOrder = "", ge.labelCount = 0, ge.afterSave = "");
    }
    async function b(R = "printer") {
      const v = ge.workOrder;
      if (!(!v || !k.value || o.value)) {
        o.value = !0;
        try {
          const L = s.value === "automatic" ? { extra: Number(u.value) } : s.value === "append" ? { appendCount: Number(l.value) } : { labelNumbers: [Number(d.value)] };
          R === "browser" && (L.output = "browser");
          const U = await xc(v, L);
          U?.browserFallback ? a.value = "Cetak QZ gagal. Dialog cetak browser dibuka; pilih printer atau Save as PDF. Periksa label yang mungkin sudah tercetak agar tidak rangkap." : U?.browserPrint && (a.value = "Dialog cetak browser dibuka. Pilih printer atau Save as PDF; membatalkan dialog tidak menghapus label yang sudah terbit."), o.value = !1, y();
        } catch (L) {
          i.value = {
            title: R === "browser" ? "Cetak Browser Gagal" : "Cetak Label Gagal",
            message: L.message || "Gagal terhubung ke QZ Tray atau printer.",
            details: [],
            hint: /sign|sertifikat|certificate/i.test(L.message || "") ? "Periksa sertifikat QZ Tray di komputer dan private key di server." : "Pastikan QZ Tray sedang berjalan di komputer Anda."
          };
        } finally {
          o.value = !1;
        }
      }
    }
    function B() {
      r.value?.open && r.value.close(), i.value = null;
    }
    return (R, v) => (J(), G(de, null, [
      a.value ? (J(), G("p", Ac, Y(a.value), 1)) : Ge("", !0),
      x("dialog", {
        ref_key: "labelPrintDialog",
        ref: t,
        class: "dialog",
        "aria-labelledby": "label-print-title",
        onCancel: Sn(y, ["prevent"]),
        onClick: Sn(y, ["self"])
      }, [
        x("h3", Ec, Y(fe(ge).afterSave ? `${fe(ge).afterSave} tersimpan` : "Cetak label?"), 1),
        x("p", null, [
          v[5] || (v[5] = Ae("Cetak label untuk Work Order ", -1)),
          x("strong", null, Y(fe(ge).workOrder), 1),
          v[6] || (v[6] = Ae("?", -1))
        ]),
        x("p", null, [
          v[7] || (v[7] = Ae("Usulan otomatis dari Good Qty dan UOM: ", -1)),
          x("strong", null, Y(fe(ge).labelCount) + " label", 1)
        ]),
        v[22] || (v[22] = x("label", { for: "label-count-mode" }, "Cara menentukan jumlah", -1)),
        Re(x("select", {
          id: "label-count-mode",
          "onUpdate:modelValue": v[0] || (v[0] = (L) => s.value = L),
          class: "input label-dialog-select",
          style: { display: "block", width: "100%", "margin-top": "6px" }
        }, [
          v[8] || (v[8] = x("option", { value: "automatic" }, "Otomatis dari Good Qty", -1)),
          x("option", {
            value: "append",
            disabled: g.value || !c.value.length
          }, "Tambah setelah cetak awal", 8, Pc),
          v[9] || (v[9] = x("option", { value: "specific" }, "Pilih nomor urut label untuk cetak ulang", -1))
        ], 512), [
          [on, s.value]
        ]),
        s.value === "automatic" ? (J(), G("div", Tc, [
          v[10] || (v[10] = x("label", { for: "extra-label-count" }, "Label tambahan", -1)),
          Re(x("input", {
            id: "extra-label-count",
            "onUpdate:modelValue": v[1] || (v[1] = (L) => u.value = L),
            type: "number",
            min: "0",
            max: Math.max(0, 1e4 - fe(ge).labelCount),
            step: "1",
            inputmode: "numeric",
            class: "input",
            style: { display: "block", width: "100%", "margin-top": "6px" }
          }, null, 8, Mc), [
            [
              At,
              u.value,
              void 0,
              { number: !0 }
            ]
          ]),
          v[11] || (v[11] = x("p", { class: "label-print-note" }, "Jumlah awal mengikuti Good Qty.", -1))
        ])) : Ge("", !0),
        s.value === "append" ? (J(), G("div", Lc, [
          v[12] || (v[12] = x("label", { for: "append-label-count" }, "Jumlah label lanjutan", -1)),
          Re(x("input", {
            id: "append-label-count",
            "onUpdate:modelValue": v[2] || (v[2] = (L) => l.value = L),
            type: "number",
            min: "1",
            max: "10000",
            step: "1",
            inputmode: "numeric",
            class: "input",
            style: { display: "block", width: "100%", "margin-top": "6px" }
          }, null, 512), [
            [
              At,
              l.value,
              void 0,
              { number: !0 }
            ]
          ]),
          M.value ? (J(), G("p", Ic, "Nomor baru: #" + Y(A.value + 1) + "–#" + Y(A.value + Number(l.value)) + " · setelah label awal yang sudah terbit.", 1)) : Ge("", !0)
        ])) : Ge("", !0),
        s.value === "specific" ? (J(), G("div", Rc, [
          v[18] || (v[18] = x("label", { for: "label-number-select" }, "Nomor urut label yang dicetak ulang", -1)),
          x("p", Nc, [
            v[13] || (v[13] = Ae("Nomor urut terikat ke Work Order ini", -1)),
            h.value !== null ? (J(), G("span", Oc, " · Adonan ke " + Y(h.value), 1)) : Ge("", !0),
            v[14] || (v[14] = Ae(".", -1))
          ]),
          g.value ? (J(), G("p", Fc, "Memuat nomor urut label…")) : E.value ? (J(), G("p", Bc, Y(E.value), 1)) : c.value.length ? Re((J(), G("select", {
            key: 3,
            id: "label-number-select",
            "onUpdate:modelValue": v[3] || (v[3] = (L) => d.value = L),
            class: "input label-dialog-select",
            style: { display: "block", width: "100%", "margin-top": "6px" }
          }, [
            v[15] || (v[15] = x("option", { value: "" }, "Pilih nomor label", -1)),
            (J(!0), G(de, null, qt(c.value, (L) => (J(), G("option", {
              key: L.label_number,
              value: L.label_number
            }, " Label #" + Y(L.label_number) + " · Adonan ke " + Y(L.adonan_ke ?? "—"), 9, qc))), 128))
          ], 512)), [
            [
              on,
              d.value,
              void 0,
              { number: !0 }
            ]
          ]) : (J(), G("p", Dc, "Belum ada label terbit untuk Work Order ini. Cetak otomatis dari Good Qty dahulu.")),
          d.value ? (J(), G("p", Uc, [
            v[16] || (v[16] = Ae("Dipilih: ", -1)),
            x("strong", null, "Label #" + Y(d.value), 1),
            v[17] || (v[17] = Ae(". QR akan memakai mapping label yang sama.", -1))
          ])) : Ge("", !0)
        ])) : Ge("", !0),
        k.value && s.value === "automatic" ? (J(), G("p", $c, [
          v[19] || (v[19] = Ae("Total cetak otomatis: ", -1)),
          x("strong", null, Y(P.value) + " label", 1)
        ])) : k.value && s.value === "append" ? (J(), G("p", Hc, [
          v[20] || (v[20] = Ae("Label lanjutan: ", -1)),
          x("strong", null, Y(P.value) + " label", 1)
        ])) : k.value && s.value === "specific" ? (J(), G("p", jc, [
          v[21] || (v[21] = Ae("Total cetak ulang: ", -1)),
          x("strong", null, Y(P.value) + " label", 1)
        ])) : (J(), G("p", Vc, Y(s.value === "append" ? "Masukkan jumlah label lanjutan 1–10.000." : s.value === "specific" ? "Pilih satu nomor label untuk dicetak ulang." : "Masukkan jumlah ekstra bulat yang valid; batas 10.000 label per cetakan."), 1)),
        x("div", zc, [
          x("button", {
            class: "btn",
            disabled: o.value,
            onClick: y
          }, "Nanti saja", 8, Kc),
          x("button", {
            class: "btn btn-primary",
            disabled: !k.value || o.value,
            onClick: v[4] || (v[4] = (L) => b())
          }, Y(o.value ? "Memproses…" : "Ya, Cetak Label"), 9, Wc)
        ])
      ], 544),
      x("dialog", {
        ref_key: "errorDialog",
        ref: r,
        class: "dialog error-dialog",
        "aria-labelledby": "wo-label-error-title",
        onCancel: Sn(B, ["prevent"]),
        onClick: Sn(B, ["self"])
      }, [
        v[23] || (v[23] = x("div", {
          class: "error-dialog-icon",
          "aria-hidden": "true"
        }, "!", -1)),
        x("h2", Jc, Y(i.value?.title), 1),
        x("p", Gc, Y(i.value?.message), 1),
        i.value?.details?.length ? (J(), G("ul", Qc, [
          (J(!0), G(de, null, qt(i.value.details, (L) => (J(), G("li", { key: L }, Y(L), 1))), 128))
        ])) : Ge("", !0),
        x("div", Yc, [
          x("button", {
            ref_key: "errorClose",
            ref: n,
            class: "btn btn-primary",
            onClick: B
          }, "Tutup", 512)
        ])
      ], 544)
    ], 64));
  }
}, Zc = /* @__PURE__ */ Js(Xc, [["__scopeId", "data-v-d0ed5b96"]]);
function ef({ selected: e = "", printers: t = [], defaultPrinter: r = "", loaded: n = !1, lastPrinted: i = "" } = {}) {
  const a = e || r;
  return a ? n && t.includes(a) ? { name: a, detail: "Terdeteksi oleh QZ Tray. Status fisik online/offline belum diperiksa." } : i === a ? { name: a, detail: "Tujuan cetak TEST terakhir. Pengiriman job bukan konfirmasi hasil cetak fisik." } : { name: a, detail: n ? "Belum terdeteksi dalam daftar QZ Tray. Periksa printer atau muat ulang daftar." : "Nama tersimpan; belum diverifikasi oleh QZ Tray." } : {
    name: "Belum diketahui",
    detail: n ? "Printer default sistem belum tersedia. Pilih printer dari daftar." : "Klik Hubungkan / muat printer untuk melihat nama printer."
  };
}
const tf = {
  class: "panel settings-panel pqr-layout",
  "aria-labelledby": "pqr-layout-title"
}, nf = { class: "panel-head" }, rf = { class: "p-ico" }, of = { class: "panel-body" }, sf = { class: "settings-block" }, lf = { class: "settings-control" }, af = { class: "form-grid cols2" }, uf = { class: "field" }, cf = { value: "" }, ff = ["value"], df = { class: "field" }, pf = { for: "pqr-qzTimeout" }, hf = ["min", "max", "step"], gf = {
  class: "settings-note",
  "data-label-printer-destination": "",
  "aria-live": "polite"
}, mf = { class: "pqr-layout-actions" }, bf = ["disabled"], yf = ["disabled"], wf = { class: "settings-block" }, vf = { class: "settings-control" }, kf = { class: "form-grid cols2" }, _f = ["for"], Cf = ["id"], Sf = ["id", "onUpdate:modelValue", "min", "max", "step"], xf = { class: "hint" }, Af = { class: "settings-block" }, Ef = { class: "settings-control" }, Pf = { class: "form-grid cols2" }, Tf = ["for"], Mf = ["id", "onUpdate:modelValue", "min", "max", "step"], Lf = { class: "settings-block" }, If = { class: "settings-control" }, Rf = { class: "form-grid cols2" }, Nf = ["for"], Of = ["id", "onUpdate:modelValue", "min", "max", "step"], Ff = { class: "field" }, Bf = { class: "field wide" }, Df = {
  key: 0,
  class: "settings-alerts"
}, qf = { class: "panel-foot" }, Uf = ["disabled"], $f = ["disabled"], Hf = {
  __name: "LabelLayoutSettings",
  setup(e) {
    const t = /* @__PURE__ */ le(nr() || { ...$n }), r = ft(() => kt(t.value)), n = /* @__PURE__ */ le([]), i = /* @__PURE__ */ le(""), a = /* @__PURE__ */ le(!1), o = /* @__PURE__ */ le(""), s = /* @__PURE__ */ le(!1), l = /* @__PURE__ */ le(""), u = /* @__PURE__ */ le(!1), c = ft(() => [...new Set([t.value.printer, ...n.value].filter(Boolean))]), d = ft(() => ef({
      selected: t.value.printer,
      printers: n.value,
      defaultPrinter: i.value,
      loaded: a.value,
      lastPrinted: o.value
    })), h = Qt.filter((D) => ["leftX", "leftY", "qrSize"].includes(D.key)), g = Qt.filter((D) => ["rightX", "rightY", "textWidth", "prefixFontSize", "fontSize", "productFontSize", "lineHeight", "nameLines"].includes(D.key)), E = Qt.find((D) => D.key === "qzTimeout"), w = Qt.filter((D) => D !== E && !h.includes(D) && !g.includes(D));
    async function q(D, y) {
      if (!s.value) {
        s.value = !0, l.value = "", u.value = !1;
        try {
          await D(), l.value = y;
        } catch (b) {
          u.value = !0, l.value = b.message || "Pengaturan label gagal.";
        } finally {
          s.value = !1;
        }
      }
    }
    function M() {
      q(() => {
        t.value = gc(t.value);
      }, "Pengaturan label disimpan di perangkat ini.");
    }
    function A() {
      q(() => {
        mc(), t.value = { ...$n };
      }, "Kembali menggunakan default ZPL asli.");
    }
    function P() {
      q(async () => {
        try {
          const D = await kc(r.value);
          n.value = D.printers, i.value = D.defaultPrinter, a.value = !0;
        } catch (D) {
          throw n.value = [], i.value = "", a.value = !1, o.value = "", D;
        }
      }, "Daftar printer diperbarui.");
    }
    function k() {
      q(async () => {
        const D = r.value, y = await _c(D);
        o.value = y, D.printer || (i.value = y);
      }, "Label TEST dikirim. Tidak ada serial produksi yang dibuat.");
    }
    return ys(P), (D, y) => (J(), G("section", tf, [
      x("div", nf, [
        x("span", rf, [
          _e(fe(Ou), {
            size: 15,
            "stroke-width": 1.9
          })
        ]),
        y[5] || (y[5] = x("h2", { id: "pqr-layout-title" }, "Pengaturan layout label", -1)),
        y[6] || (y[6] = x("span", { class: "lead" }, "Khusus browser dan perangkat ini.", -1))
      ]),
      x("div", of, [
        x("div", sf, [
          y[11] || (y[11] = x("div", { class: "settings-block-head" }, [
            x("h3", null, "Printer label"),
            x("p", { class: "hint" }, "Daftar printer dimuat otomatis saat pengaturan dibuka. Gunakan printer ZPL. Cetak TEST hanya untuk memeriksa layout dengan data contoh, tanpa Work Order.")
          ], -1)),
          x("div", lf, [
            x("div", af, [
              x("div", uf, [
                y[7] || (y[7] = x("label", { for: "pqr-printer" }, "Printer label", -1)),
                Re(x("select", {
                  id: "pqr-printer",
                  "onUpdate:modelValue": y[0] || (y[0] = (b) => t.value.printer = b),
                  class: "input"
                }, [
                  x("option", cf, Y(i.value ? `Default sistem — ${i.value}` : "Printer default sistem (nama belum dimuat)"), 1),
                  (J(!0), G(de, null, qt(c.value, (b) => (J(), G("option", {
                    key: b,
                    value: b
                  }, Y(b) + Y(a.value && !n.value.includes(b) ? " — belum terdeteksi" : ""), 9, ff))), 128))
                ], 512), [
                  [on, t.value.printer]
                ])
              ]),
              x("div", df, [
                x("label", pf, Y(fe(E).label), 1),
                Re(x("input", {
                  id: "pqr-qzTimeout",
                  "onUpdate:modelValue": y[1] || (y[1] = (b) => t.value.qzTimeout = b),
                  class: "input",
                  type: "number",
                  min: fe(E).min,
                  max: fe(E).max,
                  step: fe(E).step,
                  "aria-describedby": "pqr-timeout-note"
                }, null, 8, hf), [
                  [
                    At,
                    t.value.qzTimeout,
                    void 0,
                    { number: !0 }
                  ]
                ])
              ])
            ]),
            y[10] || (y[10] = x("p", {
              id: "pqr-timeout-note",
              class: "hint"
            }, "1–60 detik; default 8. Batas menunggu koneksi QZ, bukan durasi cetak fisik. Simpan agar dipakai saat cetak Work Order. Jika koneksi gagal atau timeout, cetak Work Order beralih ke dialog cetak browser.", -1)),
            x("p", gf, [
              y[8] || (y[8] = Ae("Printer tujuan: ", -1)),
              x("strong", null, Y(d.value.name), 1),
              y[9] || (y[9] = x("br", null, null, -1)),
              Ae(Y(d.value.detail), 1)
            ]),
            x("div", mf, [
              x("button", {
                type: "button",
                class: "btn",
                disabled: s.value,
                onClick: P
              }, "Muat ulang printer", 8, bf),
              x("button", {
                type: "button",
                class: "btn",
                disabled: s.value,
                onClick: k
              }, "Cetak label TEST", 8, yf)
            ])
          ])
        ]),
        x("div", wf, [
          y[14] || (y[14] = x("div", { class: "settings-block-head" }, [
            x("h3", null, "Ukuran dan media"),
            x("p", { class: "hint" }, "Dasar ZPL asli: 2 kolom, ^PW800, ^LL160, 203 DPI. Pengaturan ini hanya untuk penyesuaian.")
          ], -1)),
          x("div", vf, [
            x("div", kf, [
              (J(!0), G(de, null, qt(fe(w), (b) => (J(), G("div", {
                key: b.key,
                class: "field"
              }, [
                x("label", {
                  for: `pqr-${b.key}`
                }, Y(b.label), 9, _f),
                b.key === "dpi" ? Re((J(), G("select", {
                  key: 0,
                  id: `pqr-${b.key}`,
                  "onUpdate:modelValue": y[2] || (y[2] = (B) => t.value.dpi = B),
                  class: "input"
                }, [...y[12] || (y[12] = [
                  x("option", { value: 203 }, "203", -1),
                  x("option", { value: 300 }, "300", -1),
                  x("option", { value: 600 }, "600", -1)
                ])], 8, Cf)), [
                  [
                    on,
                    t.value.dpi,
                    void 0,
                    { number: !0 }
                  ]
                ]) : Re((J(), G("input", {
                  key: 1,
                  id: `pqr-${b.key}`,
                  "onUpdate:modelValue": (B) => t.value[b.key] = B,
                  class: "input",
                  type: "number",
                  min: b.min,
                  max: b.max,
                  step: b.step
                }, null, 8, Sf)), [
                  [
                    At,
                    t.value[b.key],
                    void 0,
                    { number: !0 }
                  ]
                ])
              ]))), 128))
            ]),
            x("p", xf, "Lebar media: " + Y(r.value.width * r.value.columns + r.value.gap * (r.value.columns - 1)) + " mm.", 1),
            y[13] || (y[13] = x("p", { class: "settings-note" }, "Margin tambahan 0 mempertahankan posisi asli. Pengaturan konten kiri/kanan di bawah berlaku di dalam setiap label, bukan untuk membedakan dua kolom cetak. Samakan ukuran media dan sensor gap di printer.", -1))
          ])
        ]),
        x("div", Af, [
          y[16] || (y[16] = x("div", { class: "settings-block-head" }, [
            x("h3", null, "Konten kiri — QR"),
            x("p", { class: "hint" }, "Atur posisi dan ukuran QR tanpa menggeser konten kanan. QR selalu dicetak dengan identitas serial yang sama.")
          ], -1)),
          x("div", Ef, [
            x("div", Pf, [
              (J(!0), G(de, null, qt(fe(h), (b) => (J(), G("div", {
                key: b.key,
                class: "field"
              }, [
                x("label", {
                  for: `pqr-${b.key}`
                }, Y(b.label), 9, Tf),
                Re(x("input", {
                  id: `pqr-${b.key}`,
                  "onUpdate:modelValue": (B) => t.value[b.key] = B,
                  class: "input",
                  type: "number",
                  min: b.min,
                  max: b.max,
                  step: b.step
                }, null, 8, Mf), [
                  [
                    At,
                    t.value[b.key],
                    void 0,
                    { number: !0 }
                  ]
                ])
              ]))), 128))
            ]),
            y[15] || (y[15] = x("p", { class: "settings-note" }, "Geser 0 memakai posisi ZPL asli. Nilai negatif menggeser ke kiri/atas, positif ke kanan/bawah; posisi tidak melewati titik nol media. QR acuan 16 memakai magnifikasi 4 pada 203 DPI. Perbesar area label bila konten terpotong.", -1))
          ])
        ]),
        x("div", Lf, [
          y[21] || (y[21] = x("div", { class: "settings-block-head" }, [
            x("h3", null, "Konten kanan — Teks"),
            x("p", { class: "hint" }, "Atur blok prefix, nama produk, SKU, MFG, EXP, footer dan nomor urut secara terpisah dari QR. Nama produk tetap dicetak.")
          ], -1)),
          x("div", If, [
            x("div", Rf, [
              (J(!0), G(de, null, qt(fe(g), (b) => (J(), G("div", {
                key: b.key,
                class: "field"
              }, [
                x("label", {
                  for: `pqr-${b.key}`
                }, Y(b.label), 9, Nf),
                Re(x("input", {
                  id: `pqr-${b.key}`,
                  "onUpdate:modelValue": (B) => t.value[b.key] = B,
                  class: "input",
                  type: "number",
                  min: b.min,
                  max: b.max,
                  step: b.step
                }, null, 8, Of), [
                  [
                    At,
                    t.value[b.key],
                    void 0,
                    { number: !0 }
                  ]
                ])
              ]))), 128)),
              x("div", Ff, [
                y[18] || (y[18] = x("label", { for: "pqr-align" }, "Perataan teks", -1)),
                Re(x("select", {
                  id: "pqr-align",
                  "onUpdate:modelValue": y[3] || (y[3] = (b) => t.value.align = b),
                  class: "input"
                }, [...y[17] || (y[17] = [
                  x("option", { value: "left" }, "Kiri", -1),
                  x("option", { value: "center" }, "Tengah", -1),
                  x("option", { value: "right" }, "Kanan", -1)
                ])], 512), [
                  [on, t.value.align]
                ])
              ]),
              x("div", Bf, [
                y[19] || (y[19] = x("label", { for: "pqr-footer" }, "Footer", -1)),
                Re(x("input", {
                  id: "pqr-footer",
                  "onUpdate:modelValue": y[4] || (y[4] = (b) => t.value.footer = b),
                  maxlength: "100",
                  class: "input"
                }, null, 512), [
                  [At, t.value.footer]
                ])
              ])
            ]),
            y[20] || (y[20] = x("p", { class: "settings-note" }, "Lebar 0 mengikuti sisa area label; ukuran prefix 0 mengikuti font asli. Jumlah baris nama menambah ruang sebelum SKU/MFG/EXP. Geser teks juga memindahkan nomor urut, tanpa menggeser QR. Periksa hasil penyesuaian dengan cetak TEST.", -1))
          ])
        ])
      ]),
      l.value ? (J(), G("div", Df, [
        x("p", {
          role: "status",
          class: Wn(u.value ? "err" : "hint")
        }, Y(l.value), 3)
      ])) : Ge("", !0),
      x("div", qf, [
        x("button", {
          type: "button",
          class: "btn btn-primary",
          disabled: s.value,
          onClick: M
        }, "Simpan layout label", 8, Uf),
        x("button", {
          type: "button",
          class: "btn",
          disabled: s.value,
          onClick: A
        }, "Pulihkan default ZPL", 8, $f)
      ])
    ]));
  }
}, jf = "[data-product-qr-slot]";
let Ni = !1;
function Vf({ detail: e }) {
  const { workOrder: t, stage: r } = e || {};
  t?.id && (r === "prepacking" && !t.skipPrepacking || r === "postpacking" && t.skipPrepacking) && Ws(
    t.id,
    Ks(t),
    r === "prepacking" ? "Pre-Packing" : "Post-Packing"
  );
}
function zf() {
  if (Ni) return;
  Ni = !0;
  const e = document.createElement("link");
  e.rel = "stylesheet";
  const t = new URL(
    /* @vite-ignore */
    "./runtime.css",
    import.meta.url
  );
  t.search = new URL(import.meta.url).search, e.href = t.href, document.head.appendChild(e);
  const r = document.createElement("div");
  r.dataset.productQrDialogs = "", document.body.appendChild(r), Yo(Zc).mount(r);
  const n = /* @__PURE__ */ new Map();
  function i() {
    for (const [o, s] of n)
      o.isConnected || (s.app.unmount(), n.delete(o));
    for (const o of document.querySelectorAll(jf)) {
      const s = o.dataset.productQrSlot;
      if (!["actions", "settings"].includes(s)) continue;
      const l = o.dataset.workOrder || "{}";
      let u = n.get(o);
      if (u?.value === l) continue;
      let c;
      try {
        c = JSON.parse(l);
      } catch {
        continue;
      }
      if (u)
        u.value = l, u.state.workOrder = c;
      else {
        const d = /* @__PURE__ */ is({ workOrder: c }), h = Yo({ render: () => s === "settings" ? pn(Hf) : pn(qu, { workOrder: d.workOrder }) });
        u = { app: h, state: d, value: l }, n.set(o, u), h.mount(o);
      }
    }
  }
  new MutationObserver(i).observe(document.body, {
    childList: !0,
    subtree: !0,
    attributes: !0,
    attributeFilter: ["data-work-order", "data-product-qr-slot"]
  }), window.addEventListener("production:packing-saved", Vf), i();
}
export {
  Vf as onPackingSaved,
  zf as start
};

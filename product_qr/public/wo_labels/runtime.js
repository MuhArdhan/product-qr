// @__NO_SIDE_EFFECTS__
function Zr(e) {
  const t = /* @__PURE__ */ Object.create(null);
  for (const r of e.split(",")) t[r] = 1;
  return (r) => r in t;
}
const le = {}, Tt = [], tt = () => {
}, Bi = () => !1, Hn = (e) => e.charCodeAt(0) === 111 && e.charCodeAt(1) === 110 && // uppercase letter
(e.charCodeAt(2) > 122 || e.charCodeAt(2) < 97), jn = (e) => e.startsWith("onUpdate:"), we = Object.assign, eo = (e, t) => {
  const r = e.indexOf(t);
  r > -1 && e.splice(r, 1);
}, al = Object.prototype.hasOwnProperty, ee = (e, t) => al.call(e, t), W = Array.isArray, vt = (e) => hn(e) === "[object Map]", Rt = (e) => hn(e) === "[object Set]", ko = (e) => hn(e) === "[object Date]", G = (e) => typeof e == "function", ce = (e) => typeof e == "string", nt = (e) => typeof e == "symbol", re = (e) => e !== null && typeof e == "object", Di = (e) => (re(e) || G(e)) && G(e.then) && G(e.catch), $i = Object.prototype.toString, hn = (e) => $i.call(e), ul = (e) => hn(e).slice(8, -1), qi = (e) => hn(e) === "[object Object]", to = (e) => ce(e) && e !== "NaN" && e[0] !== "-" && "" + parseInt(e, 10) === e, Xt = /* @__PURE__ */ Zr(
  // the leading comma is intentional so empty string "" is also included
  ",key,ref,ref_for,ref_key,onVnodeBeforeMount,onVnodeMounted,onVnodeBeforeUpdate,onVnodeUpdated,onVnodeBeforeUnmount,onVnodeUnmounted"
), Vn = (e) => {
  const t = /* @__PURE__ */ Object.create(null);
  return ((r) => t[r] || (t[r] = e(r)));
}, cl = /-\w/g, qe = Vn(
  (e) => e.replace(cl, (t) => t.slice(1).toUpperCase())
), fl = /\B([A-Z])/g, Nt = Vn(
  (e) => e.replace(fl, "-$1").toLowerCase()
), Ui = Vn((e) => e.charAt(0).toUpperCase() + e.slice(1)), rr = Vn(
  (e) => e ? `on${Ui(e)}` : ""
), et = (e, t) => !Object.is(e, t), An = (e, ...t) => {
  for (let r = 0; r < e.length; r++)
    e[r](...t);
}, Hi = (e, t, r, n = !1) => {
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
let _o;
const Kn = () => _o || (_o = typeof globalThis < "u" ? globalThis : typeof self < "u" ? self : typeof window < "u" ? window : typeof global < "u" ? global : {});
function no(e) {
  if (W(e)) {
    const t = {};
    for (let r = 0; r < e.length; r++) {
      const n = e[r], i = ce(n) ? gl(n) : no(n);
      if (i)
        for (const a in i)
          t[a] = i[a];
    }
    return t;
  } else if (ce(e) || re(e))
    return e;
}
const dl = /;(?![^(]*\))/g, pl = /:([^]+)/, hl = /"(?:[^"\\]|\\[^])*"|'(?:[^'\\]|\\[^])*'|\\[^]|\/\*[^]*?\*\//g;
function gl(e) {
  const t = {};
  return e.replace(hl, (r) => r.startsWith("/*") ? "" : r).split(dl).forEach((r) => {
    if (r) {
      const n = r.split(pl);
      n.length > 1 && (t[n[0].trim()] = n[1].trim());
    }
  }), t;
}
function Wn(e) {
  let t = "";
  if (ce(e))
    t = e;
  else if (W(e))
    for (let r = 0; r < e.length; r++) {
      const n = Wn(e[r]);
      n && (t += n + " ");
    }
  else if (re(e))
    for (const r in e)
      e[r] && (t += r + " ");
  return t.trim();
}
const ml = "itemscope,allowfullscreen,formnovalidate,ismap,nomodule,novalidate,playsinline,readonly", bl = /* @__PURE__ */ Zr(ml);
function ji(e) {
  return !!e || e === "";
}
function yl(e, t, r) {
  if (e.length !== t.length) return !1;
  let n = !0;
  for (let i = 0; n && i < e.length; i++)
    n = kt(e[i], t[i], r);
  return n;
}
function Co(e, t, r) {
  if (e.size !== t.size) return !1;
  const n = Array.from(t), i = new Uint8Array(n.length);
  for (const a of e) {
    let o = -1;
    for (let s = 0; s < n.length; s++)
      if (!i[s] && kt(a, n[s], r)) {
        o = s;
        break;
      }
    if (o < 0) return !1;
    i[o] = 1;
  }
  return !0;
}
function vl(e, t, r) {
  let n = vt(e), i = vt(t);
  if (n || i || (n = Rt(e), i = Rt(t), n || i))
    return n && i ? Co(e, t, r) : !1;
  const a = Object.keys(e).length, o = Object.keys(t).length;
  if (a !== o)
    return !1;
  for (const s in e) {
    const l = e.hasOwnProperty(s), u = t.hasOwnProperty(s);
    if (l && !u || !l && u || !kt(e[s], t[s], r))
      return !1;
  }
  return String(e) === String(t);
}
function So(e, t, r, n) {
  r || (r = [/* @__PURE__ */ new Map(), /* @__PURE__ */ new Map()]);
  const [i, a] = r;
  if (i.has(e) || a.has(t))
    return i.get(e) === t && a.get(t) === e;
  i.set(e, t), a.set(t, e);
  const o = n(e, t, r);
  return i.delete(e), a.delete(t), o;
}
function kt(e, t, r) {
  if (e === t) return !0;
  let n = ko(e), i = ko(t);
  return n || i ? n && i ? e.getTime() === t.getTime() : !1 : (n = nt(e), i = nt(t), n || i ? e === t : (n = W(e), i = W(t), n || i ? n && i ? So(e, t, r, yl) : !1 : (n = re(e), i = re(t), n || i ? !n || !i ? !1 : So(e, t, r, vl) : String(e) === String(t))));
}
function wl(e, t) {
  return e.findIndex((r) => kt(r, t));
}
const Vi = (e) => !!(e && e.__v_isRef === !0), Z = (e) => ce(e) ? e : e == null ? "" : W(e) || re(e) && (e.toString === $i || !G(e.toString)) ? Vi(e) ? Z(e.value) : JSON.stringify(e, zi, 2) : String(e), zi = (e, t) => Vi(t) ? zi(e, t.value) : vt(t) ? {
  [`Map(${t.size})`]: [...t.entries()].reduce(
    (r, [n, i], a) => (r[or(n, a) + " =>"] = i, r),
    {}
  )
} : Rt(t) ? {
  [`Set(${t.size})`]: [...t.values()].map((r) => or(r))
} : nt(t) ? or(t) : re(t) && !W(t) && !qi(t) ? String(t) : t, or = (e, t = "") => {
  var r;
  return (
    // Symbol.description in es2019+ so we need to cast here to pass
    // the lib: es2016 check
    nt(e) ? `Symbol(${(r = e.description) != null ? r : t})` : e
  );
};
let ge;
class kl {
  // TODO isolatedDeclarations "__v_skip"
  constructor(t = !1) {
    this.detached = t, this._active = !0, this._on = 0, this.effects = [], this.cleanups = [], this._isPaused = !1, this._warnOnRun = !0, this.__v_skip = !0, !t && ge && (ge.active ? (this.parent = ge, this.index = (ge.scopes || (ge.scopes = [])).push(
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
      const r = ge;
      try {
        return ge = this, t();
      } finally {
        ge = r;
      }
    }
  }
  /**
   * This should only be called on non-detached scopes
   * @internal
   */
  on() {
    ++this._on === 1 && (this.prevScope = ge, ge = this);
  }
  /**
   * This should only be called on non-detached scopes
   * @internal
   */
  off() {
    if (this._on > 0 && --this._on === 0) {
      if (ge === this)
        ge = this.prevScope;
      else {
        let t = ge;
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
function _l() {
  return ge;
}
let ae;
const ir = /* @__PURE__ */ new WeakSet();
class Ki {
  constructor(t) {
    this.fn = t, this.deps = void 0, this.depsTail = void 0, this.flags = 5, this.next = void 0, this.cleanup = void 0, this.scheduler = void 0, ge && (ge.active ? ge.effects.push(this) : this.flags &= -2);
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
    this.flags & 2 && !(this.flags & 32) || this.flags & 8 || Ji(this);
  }
  run() {
    if (!(this.flags & 1))
      return this.fn();
    this.flags |= 2, xo(this), Gi(this);
    const t = ae, r = Ue;
    ae = this, Ue = !0;
    try {
      return this.fn();
    } finally {
      Qi(this), ae = t, Ue = r, this.flags &= -3;
    }
  }
  stop() {
    if (this.flags & 1) {
      for (let t = this.deps; t; t = t.nextDep)
        io(t);
      this.deps = this.depsTail = void 0, xo(this), this.onStop && this.onStop(), this.flags &= -2;
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
let Wi = 0, Zt, en;
function Ji(e, t = !1) {
  if (e.flags |= 8, t) {
    e.next = en, en = e;
    return;
  }
  e.next = Zt, Zt = e;
}
function ro() {
  Wi++;
}
function oo() {
  if (--Wi > 0)
    return;
  if (en) {
    let t = en;
    for (en = void 0; t; ) {
      const r = t.next;
      t.next = void 0, t.flags &= -9, t = r;
    }
  }
  let e;
  for (; Zt; ) {
    let t = Zt;
    for (Zt = void 0; t; ) {
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
function Gi(e) {
  for (let t = e.deps; t; t = t.nextDep)
    t.version = -1, t.prevActiveLink = t.dep.activeLink, t.dep.activeLink = t;
}
function Qi(e) {
  let t, r = e.depsTail, n = r;
  for (; n; ) {
    const i = n.prevDep;
    n.version === -1 ? (n === r && (r = i), io(n), Cl(n)) : t = n, n.dep.activeLink = n.prevActiveLink, n.prevActiveLink = void 0, n = i;
  }
  e.deps = t, e.depsTail = r;
}
function Ur(e) {
  for (let t = e.deps; t; t = t.nextDep)
    if (t.dep.version !== t.version || t.dep.computed && (Yi(t.dep.computed) || t.dep.version !== t.version))
      return !0;
  return !!e._dirty;
}
function Yi(e) {
  if (e.flags & 4 && !(e.flags & 16) || (e.flags &= -17, e.globalVersion === sn) || (e.globalVersion = sn, !e.isSSR && e.flags & 128 && (!e.deps && !e._dirty || !Ur(e))))
    return;
  e.flags |= 2;
  const t = e.dep, r = ae, n = Ue;
  ae = e, Ue = !0;
  try {
    Gi(e);
    const i = e.fn(e._value);
    (t.version === 0 || et(i, e._value)) && (e.flags |= 128, e._value = i, t.version++);
  } catch (i) {
    throw t.version++, i;
  } finally {
    ae = r, Ue = n, Qi(e), e.flags &= -3;
  }
}
function io(e, t = !1) {
  const { dep: r, prevSub: n, nextSub: i } = e;
  if (n && (n.nextSub = i, e.prevSub = void 0), i && (i.prevSub = n, e.nextSub = void 0), r.subs === e && (r.subs = n, !n && r.computed)) {
    r.computed.flags &= -5;
    for (let a = r.computed.deps; a; a = a.nextDep)
      io(a, !0);
  }
  !t && !--r.sc && r.map && r.map.delete(r.key);
}
function Cl(e) {
  const { prevDep: t, nextDep: r } = e;
  t && (t.nextDep = r, e.prevDep = void 0), r && (r.prevDep = t, e.nextDep = void 0);
}
let Ue = !0;
const Xi = [];
function rt() {
  Xi.push(Ue), Ue = !1;
}
function ot() {
  const e = Xi.pop();
  Ue = e === void 0 ? !0 : e;
}
function xo(e) {
  const { cleanup: t } = e;
  if (e.cleanup = void 0, t) {
    const r = ae;
    ae = void 0;
    try {
      t();
    } finally {
      ae = r;
    }
  }
}
let sn = 0;
class Sl {
  constructor(t, r) {
    this.sub = t, this.dep = r, this.version = r.version, this.nextDep = this.prevDep = this.nextSub = this.prevSub = this.prevActiveLink = void 0;
  }
}
class so {
  // TODO isolatedDeclarations "__v_skip"
  constructor(t) {
    this.computed = t, this.version = 0, this.activeLink = void 0, this.subs = void 0, this.map = void 0, this.key = void 0, this.sc = 0, this.__v_skip = !0;
  }
  track(t) {
    if (!ae || !Ue || ae === this.computed)
      return;
    let r = this.activeLink;
    if (r === void 0 || r.sub !== ae)
      r = this.activeLink = new Sl(ae, this), ae.deps ? (r.prevDep = ae.depsTail, ae.depsTail.nextDep = r, ae.depsTail = r) : ae.deps = ae.depsTail = r, Zi(r);
    else if (r.version === -1 && (r.version = this.version, r.nextDep)) {
      const n = r.nextDep;
      n.prevDep = r.prevDep, r.prevDep && (r.prevDep.nextDep = n), r.prevDep = ae.depsTail, r.nextDep = void 0, ae.depsTail.nextDep = r, ae.depsTail = r, ae.deps === r && (ae.deps = n);
    }
    return r;
  }
  trigger(t) {
    this.version++, sn++, this.notify(t);
  }
  notify(t) {
    ro();
    try {
      for (let r = this.subs; r; r = r.prevSub)
        r.sub.notify() && r.sub.dep.notify();
    } finally {
      oo();
    }
  }
}
function Zi(e) {
  if (e.dep.sc++, e.sub.flags & 4) {
    const t = e.dep.computed;
    if (t && !e.dep.subs) {
      t.flags |= 20;
      for (let n = t.deps; n; n = n.nextDep)
        Zi(n);
    }
    const r = e.dep.subs;
    r !== e && (e.prevSub = r, r && (r.nextSub = e)), e.dep.subs = e;
  }
}
const Hr = /* @__PURE__ */ new WeakMap(), Lt = /* @__PURE__ */ Symbol(
  ""
), jr = /* @__PURE__ */ Symbol(
  ""
), ln = /* @__PURE__ */ Symbol(
  ""
);
function ye(e, t, r) {
  if (Ue && ae) {
    let n = Hr.get(e);
    n || Hr.set(e, n = /* @__PURE__ */ new Map());
    let i = n.get(r);
    i || (n.set(r, i = new so()), i.map = n, i.key = r), i.track();
  }
}
function ct(e, t, r, n, i, a) {
  const o = Hr.get(e);
  if (!o) {
    sn++;
    return;
  }
  const s = (l) => {
    l && l.trigger();
  };
  if (ro(), t === "clear")
    o.forEach(s);
  else {
    const l = W(e), u = l && to(r);
    if (l && r === "length") {
      const c = Number(n);
      o.forEach((d, h) => {
        (h === "length" || h === ln || !nt(h) && h >= c) && s(d);
      });
    } else
      switch ((r !== void 0 || o.has(void 0)) && s(o.get(r)), u && s(o.get(ln)), t) {
        case "add":
          l ? u && s(o.get("length")) : (s(o.get(Lt)), vt(e) && s(o.get(jr)));
          break;
        case "delete":
          l || (s(o.get(Lt)), vt(e) && s(o.get(jr)));
          break;
        case "set":
          vt(e) && s(o.get(Lt));
          break;
      }
  }
  oo();
}
function Dt(e) {
  const t = /* @__PURE__ */ te(e);
  return t === e || (ye(t, "iterate", ln), /* @__PURE__ */ Be(e)) ? t : /* @__PURE__ */ it(e) ? /* @__PURE__ */ wt(e) ? t.map((r) => _t(De(r))) : t.map(_t) : t.map(De);
}
function Jn(e) {
  return ye(e = /* @__PURE__ */ te(e), "iterate", ln), e;
}
function Qe(e, t) {
  return /* @__PURE__ */ it(e) ? _t(/* @__PURE__ */ wt(e) ? De(t) : t) : De(t);
}
const xl = {
  __proto__: null,
  [Symbol.iterator]() {
    return sr(this, Symbol.iterator, (e) => Qe(this, e));
  },
  concat(...e) {
    return Dt(this).concat(
      ...e.map((t) => W(t) ? Dt(t) : t)
    );
  },
  entries() {
    return sr(this, "entries", (e) => (e[1] = Qe(this, e[1]), e));
  },
  every(e, t) {
    return lt(this, "every", e, t, void 0, arguments);
  },
  filter(e, t) {
    return lt(
      this,
      "filter",
      e,
      t,
      (r) => r.map((n) => Qe(this, n)),
      arguments
    );
  },
  find(e, t) {
    return lt(
      this,
      "find",
      e,
      t,
      (r) => Qe(this, r),
      arguments
    );
  },
  findIndex(e, t) {
    return lt(this, "findIndex", e, t, void 0, arguments);
  },
  findLast(e, t) {
    return lt(
      this,
      "findLast",
      e,
      t,
      (r) => Qe(this, r),
      arguments
    );
  },
  findLastIndex(e, t) {
    return lt(this, "findLastIndex", e, t, void 0, arguments);
  },
  // flat, flatMap could benefit from ARRAY_ITERATE but are not straight-forward to implement
  forEach(e, t) {
    return lt(this, "forEach", e, t, void 0, arguments);
  },
  includes(...e) {
    return lr(this, "includes", e);
  },
  indexOf(...e) {
    return lr(this, "indexOf", e);
  },
  join(e) {
    return Dt(this).join(e);
  },
  // keys() iterator only reads `length`, no optimization required
  lastIndexOf(...e) {
    return lr(this, "lastIndexOf", e);
  },
  map(e, t) {
    return lt(this, "map", e, t, void 0, arguments);
  },
  pop() {
    return zt(this, "pop");
  },
  push(...e) {
    return zt(this, "push", e);
  },
  reduce(e, ...t) {
    return Eo(this, "reduce", e, t);
  },
  reduceRight(e, ...t) {
    return Eo(this, "reduceRight", e, t);
  },
  shift() {
    return zt(this, "shift");
  },
  // slice could use ARRAY_ITERATE but also seems to beg for range tracking
  some(e, t) {
    return lt(this, "some", e, t, void 0, arguments);
  },
  splice(...e) {
    return zt(this, "splice", e);
  },
  toReversed() {
    return Dt(this).toReversed();
  },
  toSorted(e) {
    return Dt(this).toSorted(e);
  },
  toSpliced(...e) {
    return Dt(this).toSpliced(...e);
  },
  unshift(...e) {
    return zt(this, "unshift", e);
  },
  values() {
    return sr(this, "values", (e) => Qe(this, e));
  }
};
function sr(e, t, r) {
  const n = Jn(e), i = n[t], a = i.call(n);
  if (n !== e && !/* @__PURE__ */ Be(e)) {
    if (a[Symbol.toStringTag] === "Array Iterator") {
      const o = Object.create(Object.getPrototypeOf(a));
      return o.next = () => Ao(a.next(), r), i !== es[t] && Object.defineProperties(o, {
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
    a._next = a.next, a.next = () => Ao(a._next(), r);
  }
  return a;
}
function Ao(e, t) {
  return e.done || (e.value = t(e.value)), e;
}
const es = Array.prototype;
function lt(e, t, r, n, i, a) {
  const o = Jn(e), s = o !== e && !/* @__PURE__ */ Be(e), l = o[t];
  if (l !== es[t]) {
    const d = l.apply(e, a);
    return s ? De(d) : d;
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
function Eo(e, t, r, n) {
  const i = Jn(e), a = i !== e && !/* @__PURE__ */ Be(e);
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
  const n = /* @__PURE__ */ te(e);
  ye(n, "iterate", ln);
  const i = n[t](...r);
  return (i === -1 || i === !1) && /* @__PURE__ */ uo(r[0]) ? (r[0] = /* @__PURE__ */ te(r[0]), n[t](...r)) : i;
}
function zt(e, t, r = []) {
  rt(), ro();
  const n = (/* @__PURE__ */ te(e))[t].apply(e, r);
  return oo(), ot(), n;
}
const Al = /* @__PURE__ */ Zr("__proto__,__v_isRef,__isVue"), ts = new Set(
  /* @__PURE__ */ Object.getOwnPropertyNames(Symbol).filter((e) => e !== "arguments" && e !== "caller").map((e) => Symbol[e]).filter(nt)
);
function El(e) {
  nt(e) || (e = String(e));
  const t = /* @__PURE__ */ te(this);
  return ye(t, "has", e), t.hasOwnProperty(e);
}
class ns {
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
      return n === (i ? a ? Bl : ss : a ? is : os).get(t) || // receiver is not the reactive proxy, but has the same prototype
      // this means the receiver is a user proxy of the reactive proxy
      Object.getPrototypeOf(t) === Object.getPrototypeOf(n) ? t : void 0;
    const o = W(t);
    if (!i) {
      let l;
      if (o && (l = xl[r]))
        return l;
      if (r === "hasOwnProperty")
        return El;
    }
    const s = Reflect.get(
      t,
      r,
      // if this is a proxy wrapping a ref, return methods using the raw ref
      // as receiver so that we don't have to call `toRaw` on the ref in all
      // its class methods
      /* @__PURE__ */ ve(t) ? t : n
    );
    if ((nt(r) ? ts.has(r) : Al(r)) || (i || ye(t, "get", r), a))
      return s;
    if (/* @__PURE__ */ ve(s)) {
      const l = o && to(r) ? s : s.value;
      return i && re(l) ? /* @__PURE__ */ zr(l) : l;
    }
    return re(s) ? i ? /* @__PURE__ */ zr(s) : /* @__PURE__ */ Gn(s) : s;
  }
}
class rs extends ns {
  constructor(t = !1) {
    super(!1, t);
  }
  set(t, r, n, i) {
    let a = t[r];
    const o = W(t) && to(r);
    if (!this._isShallow) {
      const u = /* @__PURE__ */ it(a);
      if (!/* @__PURE__ */ Be(n) && !/* @__PURE__ */ it(n) && (a = /* @__PURE__ */ te(a), n = /* @__PURE__ */ te(n)), !o && /* @__PURE__ */ ve(a) && !/* @__PURE__ */ ve(n))
        return u || (a.value = n), !0;
    }
    const s = o ? Number(r) < t.length : ee(t, r), l = Reflect.set(
      t,
      r,
      n,
      /* @__PURE__ */ ve(t) ? t : i
    );
    return t === /* @__PURE__ */ te(i) && l && (s ? et(n, a) && ct(t, "set", r, n) : ct(t, "add", r, n)), l;
  }
  deleteProperty(t, r) {
    const n = ee(t, r);
    t[r];
    const i = Reflect.deleteProperty(t, r);
    return i && n && ct(t, "delete", r, void 0), i;
  }
  has(t, r) {
    const n = Reflect.has(t, r);
    return (!nt(r) || !ts.has(r)) && ye(t, "has", r), n;
  }
  ownKeys(t) {
    return ye(
      t,
      "iterate",
      W(t) ? "length" : Lt
    ), Reflect.ownKeys(t);
  }
}
class Pl extends ns {
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
const Tl = /* @__PURE__ */ new rs(), Ml = /* @__PURE__ */ new Pl(), Ll = /* @__PURE__ */ new rs(!0);
const Vr = (e) => e, vn = (e) => Reflect.getPrototypeOf(e);
function Il(e, t, r) {
  return function(...n) {
    const i = this.__v_raw, a = /* @__PURE__ */ te(i), o = vt(a), s = e === "entries" || e === Symbol.iterator && o, l = e === "keys" && o, u = i[e](...n), c = r ? Vr : t ? _t : De;
    return !t && ye(
      a,
      "iterate",
      l ? jr : Lt
    ), we(
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
function wn(e) {
  return function(...t) {
    return e === "delete" ? !1 : e === "clear" ? void 0 : this;
  };
}
function Rl(e, t) {
  const r = {
    get(i) {
      const a = this.__v_raw, o = /* @__PURE__ */ te(a), s = /* @__PURE__ */ te(i);
      e || (et(i, s) && ye(o, "get", i), ye(o, "get", s));
      const { has: l } = vn(o), u = t ? Vr : e ? _t : De;
      if (l.call(o, i))
        return u(a.get(i));
      if (l.call(o, s))
        return u(a.get(s));
      a !== o && a.get(i);
    },
    get size() {
      const i = this.__v_raw;
      return !e && ye(/* @__PURE__ */ te(i), "iterate", Lt), i.size;
    },
    has(i) {
      const a = this.__v_raw, o = /* @__PURE__ */ te(a), s = /* @__PURE__ */ te(i);
      return e || (et(i, s) && ye(o, "has", i), ye(o, "has", s)), i === s ? a.has(i) : a.has(i) || a.has(s);
    },
    forEach(i, a) {
      const o = this, s = o.__v_raw, l = /* @__PURE__ */ te(s), u = t ? Vr : e ? _t : De;
      return !e && ye(l, "iterate", Lt), s.forEach((c, d) => i.call(a, u(c), u(d), o));
    }
  };
  return we(
    r,
    e ? {
      add: wn("add"),
      set: wn("set"),
      delete: wn("delete"),
      clear: wn("clear")
    } : {
      add(i) {
        const a = /* @__PURE__ */ te(this), o = vn(a), s = /* @__PURE__ */ te(i), l = !t && !/* @__PURE__ */ Be(i) && !/* @__PURE__ */ it(i) ? s : i;
        return o.has.call(a, l) || et(i, l) && o.has.call(a, i) || et(s, l) && o.has.call(a, s) || (a.add(l), ct(a, "add", l, l)), this;
      },
      set(i, a) {
        !t && !/* @__PURE__ */ Be(a) && !/* @__PURE__ */ it(a) && (a = /* @__PURE__ */ te(a));
        const o = /* @__PURE__ */ te(this), { has: s, get: l } = vn(o);
        let u = s.call(o, i);
        u || (i = /* @__PURE__ */ te(i), u = s.call(o, i));
        const c = l.call(o, i);
        return o.set(i, a), u ? et(a, c) && ct(o, "set", i, a) : ct(o, "add", i, a), this;
      },
      delete(i) {
        const a = /* @__PURE__ */ te(this), { has: o, get: s } = vn(a);
        let l = o.call(a, i);
        l || (i = /* @__PURE__ */ te(i), l = o.call(a, i)), s && s.call(a, i);
        const u = a.delete(i);
        return l && ct(a, "delete", i, void 0), u;
      },
      clear() {
        const i = /* @__PURE__ */ te(this), a = i.size !== 0, o = i.clear();
        return a && ct(
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
    r[i] = Il(i, e, t);
  }), r;
}
function lo(e, t) {
  const r = Rl(e, t);
  return (n, i, a) => i === "__v_isReactive" ? !e : i === "__v_isReadonly" ? e : i === "__v_isShallow" ? t : i === "__v_raw" ? n : Reflect.get(
    ee(r, i) && i in n ? r : n,
    i,
    a
  );
}
const Nl = {
  get: /* @__PURE__ */ lo(!1, !1)
}, Ol = {
  get: /* @__PURE__ */ lo(!1, !0)
}, Fl = {
  get: /* @__PURE__ */ lo(!0, !1)
};
const os = /* @__PURE__ */ new WeakMap(), is = /* @__PURE__ */ new WeakMap(), ss = /* @__PURE__ */ new WeakMap(), Bl = /* @__PURE__ */ new WeakMap();
function Dl(e) {
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
  return /* @__PURE__ */ it(e) ? e : ao(
    e,
    !1,
    Tl,
    Nl,
    os
  );
}
// @__NO_SIDE_EFFECTS__
function ls(e) {
  return ao(
    e,
    !1,
    Ll,
    Ol,
    is
  );
}
// @__NO_SIDE_EFFECTS__
function zr(e) {
  return ao(
    e,
    !0,
    Ml,
    Fl,
    ss
  );
}
function ao(e, t, r, n, i) {
  if (!re(e) || e.__v_raw && !(t && e.__v_isReactive) || e.__v_skip || !Object.isExtensible(e))
    return e;
  const a = i.get(e);
  if (a)
    return a;
  const o = Dl(ul(e));
  if (o === 0)
    return e;
  const s = new Proxy(
    e,
    o === 2 ? n : r
  );
  return i.set(e, s), s;
}
// @__NO_SIDE_EFFECTS__
function wt(e) {
  return /* @__PURE__ */ it(e) ? /* @__PURE__ */ wt(e.__v_raw) : !!(e && e.__v_isReactive);
}
// @__NO_SIDE_EFFECTS__
function it(e) {
  return !!(e && e.__v_isReadonly);
}
// @__NO_SIDE_EFFECTS__
function Be(e) {
  return !!(e && e.__v_isShallow);
}
// @__NO_SIDE_EFFECTS__
function uo(e) {
  return e ? !!e.__v_raw : !1;
}
// @__NO_SIDE_EFFECTS__
function te(e) {
  const t = e && e.__v_raw;
  return t ? /* @__PURE__ */ te(t) : e;
}
function $l(e) {
  return !ee(e, "__v_skip") && Object.isExtensible(e) && Hi(e, "__v_skip", !0), e;
}
const De = (e) => re(e) ? /* @__PURE__ */ Gn(e) : e, _t = (e) => re(e) ? /* @__PURE__ */ zr(e) : e;
// @__NO_SIDE_EFFECTS__
function ve(e) {
  return e ? e.__v_isRef === !0 : !1;
}
// @__NO_SIDE_EFFECTS__
function ue(e) {
  return ql(e, !1);
}
function ql(e, t) {
  return /* @__PURE__ */ ve(e) ? e : new Ul(e, t);
}
class Ul {
  constructor(t, r) {
    this.dep = new so(), this.__v_isRef = !0, this.__v_isShallow = !1, this._rawValue = r ? t : /* @__PURE__ */ te(t), this._value = r ? t : De(t), this.__v_isShallow = r;
  }
  get value() {
    return this.dep.track(), this._value;
  }
  set value(t) {
    const r = this._rawValue, n = this.__v_isShallow || /* @__PURE__ */ Be(t) || /* @__PURE__ */ it(t);
    t = n ? t : /* @__PURE__ */ te(t), et(t, r) && (this._rawValue = t, this._value = n ? t : De(t), this.dep.trigger());
  }
}
function pe(e) {
  return /* @__PURE__ */ ve(e) ? e.value : e;
}
const Hl = {
  get: (e, t, r) => t === "__v_raw" ? e : pe(Reflect.get(e, t, r)),
  set: (e, t, r, n) => {
    const i = e[t];
    return /* @__PURE__ */ ve(i) && !/* @__PURE__ */ ve(r) ? (i.value = r, !0) : Reflect.set(e, t, r, n);
  }
};
function as(e) {
  return /* @__PURE__ */ wt(e) ? e : new Proxy(e, Hl);
}
class jl {
  constructor(t, r, n) {
    this.fn = t, this.setter = r, this._value = void 0, this.dep = new so(this), this.__v_isRef = !0, this.deps = void 0, this.depsTail = void 0, this.flags = 16, this.globalVersion = sn - 1, this.next = void 0, this.effect = this, this.__v_isReadonly = !r, this.isSSR = n;
  }
  /**
   * @internal
   */
  notify() {
    if (this.flags |= 16, !(this.flags & 8) && // avoid infinite self recursion
    ae !== this)
      return Ji(this, !0), !0;
  }
  get value() {
    const t = this.dep.track();
    return Yi(this), t && (t.version = this.dep.version), this._value;
  }
  set value(t) {
    this.setter && this.setter(t);
  }
}
// @__NO_SIDE_EFFECTS__
function Vl(e, t, r = !1) {
  let n, i;
  return G(e) ? n = e : (n = e.get, i = e.set), new jl(n, i, r);
}
const kn = {}, Tn = /* @__PURE__ */ new WeakMap();
let At;
function zl(e, t = !1, r = At) {
  if (r) {
    let n = Tn.get(r);
    n || Tn.set(r, n = []), n.push(e);
  }
}
function Kl(e, t, r = le) {
  const { immediate: n, deep: i, once: a, scheduler: o, augmentJob: s, call: l } = r, u = (_) => i ? _ : /* @__PURE__ */ Be(_) || i === !1 || i === 0 ? ft(_, 1) : ft(_);
  let c, d, h, g, A = !1, v = !1;
  if (/* @__PURE__ */ ve(e) ? (d = () => e.value, A = /* @__PURE__ */ Be(e)) : /* @__PURE__ */ wt(e) ? (d = () => u(e), A = !0) : W(e) ? (v = !0, A = e.some((_) => /* @__PURE__ */ wt(_) || /* @__PURE__ */ Be(_)), d = () => e.map((_) => {
    if (/* @__PURE__ */ ve(_))
      return _.value;
    if (/* @__PURE__ */ wt(_))
      return u(_);
    if (G(_))
      return l ? l(_, 2) : _();
  })) : G(e) ? t ? d = l ? () => l(e, 2) : e : d = () => {
    if (h) {
      rt();
      try {
        h();
      } finally {
        ot();
      }
    }
    const _ = At;
    At = c;
    try {
      return l ? l(e, 3, [g]) : e(g);
    } finally {
      At = _;
    }
  } : d = tt, t && i) {
    const _ = d, F = i === !0 ? 1 / 0 : i;
    d = () => ft(_(), F);
  }
  const D = _l(), T = () => {
    c.stop(), D && D.active && eo(D.effects, c);
  };
  if (a && t) {
    const _ = t;
    t = (...F) => {
      try {
        return _(...F);
      } finally {
        T();
      }
    };
  }
  let w = v ? new Array(e.length).fill(kn) : kn;
  const P = (_) => {
    if (!(!(c.flags & 1) || !c.dirty && !_))
      if (t) {
        const F = c.run();
        if (_ || i || A || (v ? F.some((y, m) => et(y, w[m])) : et(F, w))) {
          const y = At;
          rt();
          try {
            h && h(), At = c;
            const m = [
              F,
              // pass undefined as the old value when it's changed for the first time
              w === kn ? void 0 : v && w[0] === kn ? [] : w,
              g
            ];
            w = F, l ? l(t, 3, m) : (
              // @ts-expect-error
              t(...m)
            );
          } finally {
            At = y, ot();
          }
        }
      } else
        c.run();
  };
  return s && s(P), c = new Ki(d), c.scheduler = o ? () => o(P, !1) : P, g = (_) => zl(_, !1, c), h = c.onStop = () => {
    const _ = Tn.get(c);
    if (_) {
      if (l)
        l(_, 4);
      else
        for (const F of _) F();
      Tn.delete(c);
    }
  }, t ? n ? P(!0) : w = c.run() : o ? o(P.bind(null, !0), !0) : c.run(), T.pause = c.pause.bind(c), T.resume = c.resume.bind(c), T.stop = T, T;
}
function ft(e, t = 1 / 0, r) {
  if (t <= 0 || !re(e) || e.__v_skip || (r = r || /* @__PURE__ */ new Map(), (r.get(e) || 0) >= t))
    return e;
  if (r.set(e, t), t--, /* @__PURE__ */ ve(e))
    ft(e.value, t, r);
  else if (W(e))
    for (let n = 0; n < e.length; n++)
      ft(e[n], t, r);
  else if (Rt(e) || vt(e))
    e.forEach((n) => {
      ft(n, t, r);
    });
  else if (qi(e)) {
    for (const n in e)
      ft(e[n], t, r);
    for (const n of Object.getOwnPropertySymbols(e))
      Object.prototype.propertyIsEnumerable.call(e, n) && ft(e[n], t, r);
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
  if (G(e)) {
    const i = gn(e, t, r, n);
    return i && Di(i) && i.catch((a) => {
      Qn(a, t, r);
    }), i;
  }
  if (W(e)) {
    const i = [];
    for (let a = 0; a < e.length; a++)
      i.push(He(e[a], t, r, n));
    return i;
  }
}
function Qn(e, t, r, n = !0) {
  const i = t ? t.vnode : null, { errorHandler: a, throwUnhandledErrorInProduction: o } = t && t.appContext.config || le;
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
      rt(), gn(a, null, 10, [
        e,
        l,
        u
      ]), ot();
      return;
    }
  }
  Wl(e, r, i, n, o);
}
function Wl(e, t, r, n = !0, i = !1) {
  if (i)
    throw e;
  console.error(e);
}
const Ce = [];
let $e = -1;
const Ye = [];
let mt = null, qt = 0;
const us = /* @__PURE__ */ Promise.resolve();
let Mn = null;
function Ln(e) {
  const t = Mn || us;
  return e ? t.then(this ? e.bind(this) : e) : t;
}
function Jl(e) {
  let t = $e + 1, r = Ce.length;
  for (; t < r; ) {
    const n = t + r >>> 1, i = Ce[n], a = an(i);
    a < e || a === e && i.flags & 2 ? t = n + 1 : r = n;
  }
  return t;
}
function co(e) {
  if (!(e.flags & 1)) {
    const t = an(e), r = Ce[Ce.length - 1];
    !r || // fast path when the job id is larger than the tail
    !(e.flags & 2) && t >= an(r) ? Ce.push(e) : Ce.splice(Jl(t), 0, e), e.flags |= 1, cs();
  }
}
function cs() {
  Mn || (Mn = us.then(ps));
}
function Gl(e) {
  if (!W(e))
    mt && e.id === -1 ? mt.splice(qt + 1, 0, e) : e.flags & 1 || (Ye.push(e), e.flags |= 1);
  else
    for (let t = 0; t < e.length; t++)
      Ye.push(e[t]);
  cs();
}
function fs(e, t, r, n = $e + 1) {
  for (; n < Ce.length; n++) {
    const i = Ce[n];
    if (i && i.flags & 2) {
      if (e && i.id !== e.uid || t !== void 0 && !(i.id >= t))
        continue;
      Ce.splice(n, 1), n = e ? n - 1 : $e, i.flags & 4 && (i.flags &= -2), i(), i.flags & 4 || (i.flags &= -2);
    }
  }
}
function ds(e, t, r = 0) {
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
    for (mt = a, qt = 0; qt < mt.length; qt++) {
      const o = mt[qt];
      o.flags & 4 && (o.flags &= -2), o.flags & 8 || o(), o.flags &= -2;
    }
    mt = null, qt = 0;
  }
}
let ar = !1;
function Ql(e, t) {
  if (ar) {
    e();
    return;
  }
  const r = t === void 0 ? void 0 : new Set(Ye);
  e(), ar = !0;
  try {
    fs(void 0, t), ds(void 0, r, t);
  } finally {
    ar = !1;
  }
}
const an = (e) => e.id == null ? e.flags & 2 ? -1 : 1 / 0 : e.id;
function ps(e) {
  try {
    for ($e = 0; $e < Ce.length; $e++) {
      const t = Ce[$e];
      t && !(t.flags & 8) && (t.flags & 4 && (t.flags &= -2), gn(
        t,
        t.i,
        t.i ? 15 : 14
      ), t.flags & 4 || (t.flags &= -2));
    }
  } finally {
    for (; $e < Ce.length; $e++) {
      const t = Ce[$e];
      t && (t.flags &= -2);
    }
    $e = -1, Ce.length = 0, ds(), Mn = null, (Ce.length || Ye.length) && ps();
  }
}
let Fe = null, hs = null;
function In(e) {
  const t = Fe;
  return Fe = e, hs = e && e.type.__scopeId || null, t;
}
function Yl(e, t = Fe, r) {
  if (!t || e._n)
    return e;
  const n = (...i) => {
    n._d && Fn(-1);
    const a = In(t), o = It.length;
    let s;
    try {
      s = e(...i);
    } finally {
      for (let l = It.length; l > o; l--) $s();
      In(a), n._d && Fn(1);
    }
    return s;
  };
  return n._n = !0, n._c = !0, n._d = !0, n;
}
function _e(e, t) {
  if (Fe === null)
    return e;
  const r = tr(Fe), n = e.dirs || (e.dirs = []);
  for (let i = 0; i < t.length; i++) {
    let [a, o, s, l = le] = t[i];
    a && (G(a) && (a = {
      mounted: a,
      updated: a
    }), a.deep && ft(o), n.push({
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
function St(e, t, r, n) {
  const i = e.dirs, a = t && t.dirs;
  for (let o = 0; o < i.length; o++) {
    const s = i[o];
    a && (s.oldValue = a[o].value);
    let l = s.dir[n];
    l && (rt(), He(l, r, 8, [
      e.el,
      s,
      e,
      t
    ]), ot());
  }
}
function Xl(e, t) {
  if (Se) {
    let r = Se.provides;
    const n = Se.parent && Se.parent.provides;
    n === r && (r = Se.provides = Object.create(n)), r[e] = t;
  }
}
function En(e, t, r = !1) {
  const n = Ga();
  if (n || Ut) {
    let i = Ut ? Ut._context.provides : n ? n.parent == null || n.ce ? n.vnode.appContext && n.vnode.appContext.provides : n.parent.provides : void 0;
    if (i && e in i)
      return i[e];
    if (arguments.length > 1)
      return r && G(t) ? t.call(n && n.proxy) : t;
  }
}
const Zl = /* @__PURE__ */ Symbol.for("v-scx"), ea = () => En(Zl);
function tn(e, t, r) {
  return gs(e, t, r);
}
function gs(e, t, r = le) {
  const { immediate: n, deep: i, flush: a, once: o } = r, s = we({}, r), l = t && n || !t && a !== "post";
  let u;
  if (dn) {
    if (a === "sync") {
      const g = ea();
      u = g.__watcherHandles || (g.__watcherHandles = []);
    } else if (!l) {
      const g = () => {
      };
      return g.stop = tt, g.resume = tt, g.pause = tt, g;
    }
  }
  const c = Se;
  s.call = (g, A, v) => He(g, c, A, v);
  let d = !1;
  a === "post" ? s.scheduler = (g) => {
    g.i = c, Pe(g, c && c.suspense);
  } : a !== "sync" && (d = !0, s.scheduler = (g, A) => {
    A ? g() : co(g);
  }), s.augmentJob = (g) => {
    t && (g.flags |= 4), d && (g.flags |= 2, c && (g.id = c.uid, g.i = c));
  };
  const h = Kl(e, t, s);
  return dn && (u ? u.push(h) : l && h()), h;
}
function ta(e, t, r) {
  const n = this.proxy, i = ce(e) ? e.includes(".") ? ms(n, e) : () => n[e] : e.bind(n, n);
  let a;
  G(t) ? a = t : (a = t.handler, r = t);
  const o = mn(this), s = gs(i, a.bind(n), r);
  return o(), s;
}
function ms(e, t) {
  const r = t.split(".");
  return () => {
    let n = e;
    for (let i = 0; i < r.length && n; i++)
      n = n[r[i]];
    return n;
  };
}
const na = /* @__PURE__ */ Symbol("_vte"), Yn = (e) => e.__isTeleport, ur = /* @__PURE__ */ Symbol("_leaveCb");
function ra(e) {
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
function bs(e) {
  if (!fo(e))
    return Yn(e.type) && e.children ? ra(e.children) : e;
  if (e.component)
    return e.component.subTree;
  const { shapeFlag: t, children: r } = e;
  if (r) {
    if (t & 16)
      return r[0];
    if (t & 32 && G(r.default))
      return r.default();
  }
}
function Rn(e, t) {
  if (e.shapeFlag & 6 && e.component) {
    e.transition = t;
    const r = e.component.subTree;
    Rn(
      Yn(r.type) && bs(r) || r,
      t
    );
  } else if (e.shapeFlag & 128)
    e.ssContent.transition = t.clone(e.ssContent), e.ssFallback.transition = t.clone(e.ssFallback);
  else if (e.transition = t, e.type === fe && W(e.children)) {
    const r = As(e.children, !1);
    r && Rn(r, t);
  }
}
function Kr(e) {
  if (e.component)
    return Kr(e.component.subTree);
  if (e.type === fe) {
    const t = W(e.children) && As(e.children, !1);
    return t ? Kr(t) : void 0;
  }
  if (e.type !== je)
    return e;
}
function ys(e) {
  e.ids = [e.ids[0] + e.ids[2]++ + "-", 0, 0];
}
function Po(e, t) {
  let r;
  return !!((r = Object.getOwnPropertyDescriptor(e, t)) && !r.configurable);
}
const Nn = /* @__PURE__ */ new WeakMap();
function nn(e, t, r, n, i = !1) {
  if (W(e)) {
    e.forEach(
      (v, D) => nn(
        v,
        t && (W(t) ? t[D] : t),
        r,
        n,
        i
      )
    );
    return;
  }
  if (rn(n) && !i) {
    n.shapeFlag & 512 && n.type.__asyncResolved && n.component.subTree.component && nn(e, t, r, n.component.subTree);
    return;
  }
  const a = n.shapeFlag & 4 ? tr(n.component) : n.el, o = i ? null : a, { i: s, r: l } = e, u = t && t.r, c = s.refs === le ? s.refs = {} : s.refs, d = s.setupState, h = /* @__PURE__ */ te(d), g = d === le ? Bi : (v) => Po(c, v) ? !1 : ee(h, v), A = (v, D) => !(D && Po(c, D));
  if (u != null && u !== l) {
    if (To(t), ce(u))
      c[u] = null, g(u) && (d[u] = null);
    else if (/* @__PURE__ */ ve(u)) {
      const v = t;
      A(u, v.k) && (u.value = null), v.k && (c[v.k] = null);
    }
  }
  if (G(l))
    gn(l, s, 12, [o, c]);
  else {
    const v = ce(l), D = /* @__PURE__ */ ve(l);
    if (v || D) {
      const T = () => {
        if (e.f) {
          const w = v ? g(l) ? d[l] : c[l] : A() || !e.k ? l.value : c[e.k];
          if (i)
            W(w) && eo(w, a);
          else if (W(w))
            w.includes(a) || w.push(a);
          else if (v)
            c[l] = [a], g(l) && (d[l] = c[l]);
          else {
            const P = [a];
            A(l, e.k) && (l.value = P), e.k && (c[e.k] = P);
          }
        } else v ? (c[l] = o, g(l) && (d[l] = o)) : D && (A(l, e.k) && (l.value = o), e.k && (c[e.k] = o));
      };
      if (o) {
        const w = () => {
          T(), Nn.delete(e);
        };
        w.id = -1, Nn.set(e, w), Pe(w, r);
      } else
        To(e), T();
    }
  }
}
function To(e) {
  const t = Nn.get(e);
  t && (t.flags |= 8, Nn.delete(e));
}
Kn().requestIdleCallback;
Kn().cancelIdleCallback;
const rn = (e) => !!e.type.__asyncLoader, fo = (e) => e.type.__isKeepAlive;
function oa(e, t) {
  vs(e, "a", t);
}
function ia(e, t) {
  vs(e, "da", t);
}
function vs(e, t, r = Se) {
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
      fo(i.parent.vnode) && sa(n, t, r, i), i = i.parent;
  }
}
function sa(e, t, r, n) {
  const i = Xn(
    t,
    e,
    n,
    !0
    /* prepend */
  );
  ks(() => {
    eo(n[t], i);
  }, r);
}
function Xn(e, t, r = Se, n = !1) {
  if (r) {
    const i = r[e] || (r[e] = []), a = t.__weh || (t.__weh = (...o) => {
      rt();
      const s = mn(r), l = He(t, r, e, o);
      return s(), ot(), l;
    });
    return n ? i.unshift(a) : i.push(a), a;
  }
}
const dt = (e) => (t, r = Se) => {
  (!dn || e === "sp") && Xn(e, (...n) => t(...n), r);
}, la = dt("bm"), ws = dt("m"), aa = dt(
  "bu"
), ua = dt("u"), ca = dt(
  "bum"
), ks = dt("um"), fa = dt(
  "sp"
), da = dt("rtg"), pa = dt("rtc");
function ha(e, t = Se) {
  Xn("ec", e, t);
}
const ga = /* @__PURE__ */ Symbol.for("v-ndc");
function yt(e, t, r, n) {
  let i;
  const a = r, o = W(e);
  if (o || ce(e)) {
    const s = o && /* @__PURE__ */ wt(e);
    let l = !1, u = !1;
    s && (l = !/* @__PURE__ */ Be(e), u = /* @__PURE__ */ it(e), e = Jn(e)), i = new Array(e.length);
    for (let c = 0, d = e.length; c < d; c++)
      i[c] = t(
        l ? u ? _t(De(e[c])) : De(e[c]) : e[c],
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
  else if (re(e))
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
const Wr = (e) => e ? js(e) ? tr(e) : Wr(e.parent) : null, on = (
  // Move PURE marker to new line to workaround compiler discarding it
  // due to type annotation
  /* @__PURE__ */ we(/* @__PURE__ */ Object.create(null), {
    $: (e) => e,
    $el: (e) => e.vnode.el,
    $data: (e) => e.data,
    $props: (e) => e.props,
    $attrs: (e) => e.attrs,
    $slots: (e) => e.slots,
    $refs: (e) => e.refs,
    $parent: (e) => Wr(e.parent),
    $root: (e) => Wr(e.root),
    $host: (e) => e.ce,
    $emit: (e) => e.emit,
    $options: (e) => Cs(e),
    $forceUpdate: (e) => e.f || (e.f = () => {
      co(e.update);
    }),
    $nextTick: (e) => e.n || (e.n = Ln.bind(e.proxy)),
    $watch: (e) => ta.bind(e)
  })
), cr = (e, t) => e !== le && !e.__isScriptSetup && ee(e, t), ma = {
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
        if (i !== le && ee(i, t))
          return o[t] = 2, i[t];
        if (ee(a, t))
          return o[t] = 3, a[t];
        if (r !== le && ee(r, t))
          return o[t] = 4, r[t];
        Jr && (o[t] = 0);
      }
    }
    const u = on[t];
    let c, d;
    if (u)
      return t === "$attrs" && ye(e.attrs, "get", ""), u(e);
    if (
      // css module (injected by vue-loader)
      (c = s.__cssModules) && (c = c[t])
    )
      return c;
    if (r !== le && ee(r, t))
      return o[t] = 4, r[t];
    if (
      // global properties
      d = l.config.globalProperties, ee(d, t)
    )
      return d[t];
  },
  set({ _: e }, t, r) {
    const { data: n, setupState: i, ctx: a } = e;
    return cr(i, t) ? (i[t] = r, !0) : n !== le && ee(n, t) ? (n[t] = r, !0) : ee(e.props, t) || t[0] === "$" && t.slice(1) in e ? !1 : (a[t] = r, !0);
  },
  has({
    _: { data: e, setupState: t, accessCache: r, ctx: n, appContext: i, props: a, type: o }
  }, s) {
    let l;
    return !!(r[s] || e !== le && s[0] !== "$" && ee(e, s) || cr(t, s) || ee(a, s) || ee(n, s) || ee(on, s) || ee(i.config.globalProperties, s) || (l = o.__cssModules) && l[s]);
  },
  defineProperty(e, t, r) {
    return r.get != null ? e._.accessCache[t] = 0 : ee(r, "value") && this.set(e, t, r.value, null), Reflect.defineProperty(e, t, r);
  }
};
function Mo(e) {
  return W(e) ? e.reduce(
    (t, r) => (t[r] = null, t),
    {}
  ) : e;
}
let Jr = !0;
function ba(e) {
  const t = Cs(e), r = e.proxy, n = e.ctx;
  Jr = !1, t.beforeCreate && Lo(t.beforeCreate, e, "bc");
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
    updated: A,
    activated: v,
    deactivated: D,
    beforeDestroy: T,
    beforeUnmount: w,
    destroyed: P,
    unmounted: _,
    render: F,
    renderTracked: y,
    renderTriggered: m,
    errorCaptured: N,
    serverPrefetch: B,
    // public API
    expose: j,
    inheritAttrs: q,
    // assets
    components: V,
    directives: H,
    filters: U
  } = t;
  if (u && ya(u, n, null), o)
    for (const oe in o) {
      const ne = o[oe];
      G(ne) && (n[oe] = ne.bind(r));
    }
  if (i) {
    const oe = i.call(r, r);
    re(oe) && (e.data = /* @__PURE__ */ Gn(oe));
  }
  if (Jr = !0, a)
    for (const oe in a) {
      const ne = a[oe], st = G(ne) ? ne.bind(r, r) : G(ne.get) ? ne.get.bind(r, r) : tt, pt = !G(ne) && G(ne.set) ? ne.set.bind(r) : tt, Re = Ze({
        get: st,
        set: pt
      });
      Object.defineProperty(n, oe, {
        enumerable: !0,
        configurable: !0,
        get: () => Re.value,
        set: (Ae) => Re.value = Ae
      });
    }
  if (s)
    for (const oe in s)
      _s(s[oe], n, r, oe);
  if (l) {
    const oe = G(l) ? l.call(r) : l;
    Reflect.ownKeys(oe).forEach((ne) => {
      Xl(ne, oe[ne]);
    });
  }
  c && Lo(c, e, "c");
  function $(oe, ne) {
    W(ne) ? ne.forEach((st) => oe(st.bind(r))) : ne && oe(ne.bind(r));
  }
  if ($(la, d), $(ws, h), $(aa, g), $(ua, A), $(oa, v), $(ia, D), $(ha, N), $(pa, y), $(da, m), $(ca, w), $(ks, _), $(fa, B), W(j))
    if (j.length) {
      const oe = e.exposed || (e.exposed = {});
      j.forEach((ne) => {
        Object.defineProperty(oe, ne, {
          get: () => r[ne],
          set: (st) => r[ne] = st,
          enumerable: !0
        });
      });
    } else e.exposed || (e.exposed = {});
  F && e.render === tt && (e.render = F), q != null && (e.inheritAttrs = q), V && (e.components = V), H && (e.directives = H), B && ys(e);
}
function ya(e, t, r = tt) {
  W(e) && (e = Gr(e));
  for (const n in e) {
    const i = e[n];
    let a;
    re(i) ? "default" in i ? a = En(
      i.from || n,
      i.default,
      !0
    ) : a = En(i.from || n) : a = En(i), /* @__PURE__ */ ve(a) ? Object.defineProperty(t, n, {
      enumerable: !0,
      configurable: !0,
      get: () => a.value,
      set: (o) => a.value = o
    }) : t[n] = a;
  }
}
function Lo(e, t, r) {
  He(
    W(e) ? e.map((n) => n.bind(t.proxy)) : e.bind(t.proxy),
    t,
    r
  );
}
function _s(e, t, r, n) {
  let i = n.includes(".") ? ms(r, n) : () => r[n];
  if (ce(e)) {
    const a = t[e];
    G(a) && tn(i, a);
  } else if (G(e))
    tn(i, e.bind(r));
  else if (re(e))
    if (W(e))
      e.forEach((a) => _s(a, t, r, n));
    else {
      const a = G(e.handler) ? e.handler.bind(r) : t[e.handler];
      G(a) && tn(i, a, e);
    }
}
function Cs(e) {
  const t = e.type, { mixins: r, extends: n } = t, {
    mixins: i,
    optionsCache: a,
    config: { optionMergeStrategies: o }
  } = e.appContext, s = a.get(t);
  let l;
  return s ? l = s : !i.length && !r && !n ? l = t : (l = {}, i.length && i.forEach(
    (u) => On(l, u, o, !0)
  ), On(l, t, o)), re(t) && a.set(t, l), l;
}
function On(e, t, r, n = !1) {
  const { mixins: i, extends: a } = t;
  a && On(e, a, r, !0), i && i.forEach(
    (o) => On(e, o, r, !0)
  );
  for (const o in t)
    if (!(n && o === "expose")) {
      const s = va[o] || r && r[o];
      e[o] = s ? s(e[o], t[o]) : t[o];
    }
  return e;
}
const va = {
  data: Io,
  props: Ro,
  emits: Ro,
  // objects
  methods: Gt,
  computed: Gt,
  // lifecycle
  beforeCreate: ke,
  created: ke,
  beforeMount: ke,
  mounted: ke,
  beforeUpdate: ke,
  updated: ke,
  beforeDestroy: ke,
  beforeUnmount: ke,
  destroyed: ke,
  unmounted: ke,
  activated: ke,
  deactivated: ke,
  errorCaptured: ke,
  serverPrefetch: ke,
  // assets
  components: Gt,
  directives: Gt,
  // watch
  watch: ka,
  // provide / inject
  provide: Io,
  inject: wa
};
function Io(e, t) {
  return t ? e ? function() {
    return we(
      G(e) ? e.call(this, this) : e,
      G(t) ? t.call(this, this) : t
    );
  } : t : e;
}
function wa(e, t) {
  return Gt(Gr(e), Gr(t));
}
function Gr(e) {
  if (W(e)) {
    const t = {};
    for (let r = 0; r < e.length; r++)
      t[e[r]] = e[r];
    return t;
  }
  return e;
}
function ke(e, t) {
  return e ? [...new Set([].concat(e, t))] : t;
}
function Gt(e, t) {
  return e ? we(/* @__PURE__ */ Object.create(null), e, t) : t;
}
function Ro(e, t) {
  return e ? W(e) && W(t) ? [.../* @__PURE__ */ new Set([...e, ...t])] : we(
    /* @__PURE__ */ Object.create(null),
    Mo(e),
    Mo(t ?? {})
  ) : t;
}
function ka(e, t) {
  if (!e) return t;
  if (!t) return e;
  const r = we(/* @__PURE__ */ Object.create(null), e);
  for (const n in t)
    r[n] = ke(e[n], t[n]);
  return r;
}
function Ss() {
  return {
    app: null,
    config: {
      isNativeTag: Bi,
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
let _a = 0;
function Ca(e, t) {
  return function(n, i = null) {
    G(n) || (n = we({}, n)), i != null && !re(i) && (i = null);
    const a = Ss(), o = /* @__PURE__ */ new WeakSet(), s = [];
    let l = !1;
    const u = a.app = {
      _uid: _a++,
      _component: n,
      _props: i,
      _container: null,
      _context: a,
      _instance: null,
      version: tu,
      get config() {
        return a.config;
      },
      set config(c) {
      },
      use(c, ...d) {
        return o.has(c) || (c && G(c.install) ? (o.add(c), c.install(u, ...d)) : G(c) && (o.add(c), c(u, ...d))), u;
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
          const g = u._ceVNode || xe(n, i);
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
const Sa = (e, t) => t === "modelValue" || t === "model-value" ? e.modelModifiers : e[`${t}Modifiers`] || e[`${qe(t)}Modifiers`] || e[`${Nt(t)}Modifiers`];
function xa(e, t, ...r) {
  if (e.isUnmounted) return;
  const n = e.vnode.props || le;
  let i = r;
  const a = t.startsWith("update:"), o = a && Sa(n, t.slice(7));
  o && (o.trim && (i = r.map((c) => ce(c) ? c.trim() : c)), o.number && (i = i.map(zn)));
  let s, l = n[s = rr(t)] || // also try camelCase event handler (#2249)
  n[s = rr(qe(t))];
  !l && a && (l = n[s = rr(Nt(t))]), l && He(
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
const Aa = /* @__PURE__ */ new WeakMap();
function xs(e, t, r = !1) {
  const n = r ? Aa : t.emitsCache, i = n.get(e);
  if (i !== void 0)
    return i;
  const a = e.emits;
  let o = {}, s = !1;
  if (!G(e)) {
    const l = (u) => {
      const c = xs(u, t, !0);
      c && (s = !0, we(o, c));
    };
    !r && t.mixins.length && t.mixins.forEach(l), e.extends && l(e.extends), e.mixins && e.mixins.forEach(l);
  }
  return !a && !s ? (re(e) && n.set(e, null), null) : (W(a) ? a.forEach((l) => o[l] = null) : we(o, a), re(e) && n.set(e, o), o);
}
function Zn(e, t) {
  return !e || !Hn(t) ? !1 : (t = t.slice(2), t = t === "Once" ? t : t.replace(/Once$/, ""), ee(e, t[0].toLowerCase() + t.slice(1)) || ee(e, Nt(t)) || ee(e, t));
}
function No(e) {
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
    ctx: A,
    inheritAttrs: v
  } = e, D = In(e);
  let T, w;
  try {
    if (r.shapeFlag & 4) {
      const _ = i || n, F = _;
      T = Xe(
        u.call(
          F,
          _,
          c,
          d,
          g,
          h,
          A
        )
      ), w = s;
    } else {
      const _ = t;
      T = Xe(
        _.length > 1 ? _(
          d,
          { attrs: s, slots: o, emit: l }
        ) : _(
          d,
          null
        )
      ), w = t.props ? s : Ea(s);
    }
  } catch (_) {
    It.length = 0, Qn(_, e, 1), T = xe(je);
  }
  let P = T;
  if (w && v !== !1) {
    const _ = Object.keys(w), { shapeFlag: F } = P;
    _.length && F & 7 && (a && _.some(jn) && (w = Pa(
      w,
      a
    )), P = Ht(P, w, !1, !0));
  }
  if (r.dirs && (P = Ht(P, null, !1, !0), P.dirs = P.dirs ? P.dirs.concat(r.dirs) : r.dirs), r.transition) {
    const _ = Yn(P.type) && bs(P) || P;
    Rn(_, r.transition);
  }
  return T = P, In(D), T;
}
function As(e, t = !0) {
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
const Ea = (e) => {
  let t;
  for (const r in e)
    (r === "class" || r === "style" || Hn(r)) && ((t || (t = {}))[r] = e[r]);
  return t;
}, Pa = (e, t) => {
  const r = {};
  for (const n in e)
    (!jn(n) || !(n.slice(9) in t)) && (r[n] = e[n]);
  return r;
};
function Ta(e, t, r) {
  const { props: n, children: i, component: a } = e, { props: o, children: s, patchFlag: l } = t, u = a.emitsOptions;
  if (t.dirs || t.transition)
    return !0;
  if (r && l >= 0) {
    if (l & 1024)
      return !0;
    if (l & 16)
      return n ? Oo(n, o, u) : !!o;
    if (l & 8) {
      const c = t.dynamicProps;
      for (let d = 0; d < c.length; d++) {
        const h = c[d];
        if (Es(o, n, h) && !Zn(u, h))
          return !0;
      }
    }
  } else
    return (i || s) && (!s || !s.$stable) ? !0 : n === o ? !1 : n ? o ? Oo(n, o, u) : !0 : !!o;
  return !1;
}
function Oo(e, t, r) {
  const n = Object.keys(t);
  if (n.length !== Object.keys(e).length)
    return !0;
  for (let i = 0; i < n.length; i++) {
    const a = n[i];
    if (!ee(e, a) || Es(t, e, a) && !Zn(r, a))
      return !0;
  }
  return !1;
}
function Es(e, t, r) {
  const n = e[r], i = t[r];
  return r === "style" && re(n) && re(i) ? !kt(n, i) : n !== i;
}
function Ma({ vnode: e, parent: t, suspense: r }, n) {
  for (; t; ) {
    const i = t.subTree;
    if (i.suspense && i.suspense.activeBranch === e && (i.suspense.vnode.el = i.el = n, e = i), i === e)
      (e = t.vnode).el = n, t = t.parent;
    else
      break;
  }
  r && r.activeBranch === e && (r.vnode.el = n);
}
const Ps = {}, Ts = () => Object.create(Ps), Ms = (e) => Object.getPrototypeOf(e) === Ps;
function La(e, t, r, n = !1) {
  const i = {}, a = Ts();
  e.propsDefaults = /* @__PURE__ */ Object.create(null), Ls(e, t, i, a);
  for (const o in e.propsOptions[0])
    o in i || (i[o] = void 0);
  r ? e.props = n ? i : /* @__PURE__ */ ls(i) : e.type.props ? e.props = i : e.props = a, e.attrs = a;
}
function Ia(e, t, r, n) {
  const {
    props: i,
    attrs: a,
    vnode: { patchFlag: o }
  } = e, s = /* @__PURE__ */ te(i), [l] = e.propsOptions;
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
          if (ee(a, h))
            g !== a[h] && (a[h] = g, u = !0);
          else {
            const A = qe(h);
            i[A] = Qr(
              l,
              s,
              A,
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
    Ls(e, t, i, a) && (u = !0);
    let c;
    for (const d in s)
      (!t || // for camelCase
      !ee(t, d) && // it's possible the original props was passed in as kebab-case
      // and converted to camelCase (#955)
      ((c = Nt(d)) === d || !ee(t, c))) && (l ? r && // for camelCase
      (r[d] !== void 0 || // for kebab-case
      r[c] !== void 0) && (i[d] = Qr(
        l,
        s,
        d,
        void 0,
        e,
        !0
      )) : delete i[d]);
    if (a !== s)
      for (const d in a)
        (!t || !ee(t, d)) && (delete a[d], u = !0);
  }
  u && ct(e.attrs, "set", "");
}
function Ls(e, t, r, n) {
  const [i, a] = e.propsOptions;
  let o = !1, s;
  if (t)
    for (let l in t) {
      if (Xt(l))
        continue;
      const u = t[l];
      let c;
      i && ee(i, c = qe(l)) ? !a || !a.includes(c) ? r[c] = u : (s || (s = {}))[c] = u : Zn(e.emitsOptions, l) || (!(l in n) || u !== n[l]) && (n[l] = u, o = !0);
    }
  if (a) {
    const l = /* @__PURE__ */ te(r), u = s || le;
    for (let c = 0; c < a.length; c++) {
      const d = a[c];
      r[d] = Qr(
        i,
        l,
        d,
        u[d],
        e,
        !ee(u, d)
      );
    }
  }
  return o;
}
function Qr(e, t, r, n, i, a) {
  const o = e[r];
  if (o != null) {
    const s = ee(o, "default");
    if (s && n === void 0) {
      const l = o.default;
      if (o.type !== Function && !o.skipFactory && G(l)) {
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
    ] && (n === "" || n === Nt(r)) && (n = !0));
  }
  return n;
}
const Ra = /* @__PURE__ */ new WeakMap();
function Is(e, t, r = !1) {
  const n = r ? Ra : t.propsCache, i = n.get(e);
  if (i)
    return i;
  const a = e.props, o = {}, s = [];
  let l = !1;
  if (!G(e)) {
    const c = (d) => {
      l = !0;
      const [h, g] = Is(d, t, !0);
      we(o, h), g && s.push(...g);
    };
    !r && t.mixins.length && t.mixins.forEach(c), e.extends && c(e.extends), e.mixins && e.mixins.forEach(c);
  }
  if (!a && !l)
    return re(e) && n.set(e, Tt), Tt;
  if (W(a))
    for (let c = 0; c < a.length; c++) {
      const d = qe(a[c]);
      Fo(d) && (o[d] = le);
    }
  else if (a)
    for (const c in a) {
      const d = qe(c);
      if (Fo(d)) {
        const h = a[c], g = o[d] = W(h) || G(h) ? { type: h } : we({}, h), A = g.type;
        let v = !1, D = !0;
        if (W(A))
          for (let T = 0; T < A.length; ++T) {
            const w = A[T], P = G(w) && w.name;
            if (P === "Boolean") {
              v = !0;
              break;
            } else P === "String" && (D = !1);
          }
        else
          v = G(A) && A.name === "Boolean";
        g[
          0
          /* shouldCast */
        ] = v, g[
          1
          /* shouldCastTrue */
        ] = D, (v || ee(g, "default")) && s.push(d);
      }
    }
  const u = [o, s];
  return re(e) && n.set(e, u), u;
}
function Fo(e) {
  return e[0] !== "$" && !Xt(e);
}
const po = (e) => e === "_" || e === "_ctx" || e === "$stable", ho = (e) => W(e) ? e.map(Xe) : [Xe(e)], Na = (e, t, r) => {
  if (t._n)
    return t;
  const n = Yl((...i) => ho(t(...i)), r);
  return n._c = !1, n;
}, Rs = (e, t, r) => {
  const n = e._ctx;
  for (const i in e) {
    if (po(i)) continue;
    const a = e[i];
    if (G(a))
      t[i] = Na(i, a, n);
    else if (a != null) {
      const o = ho(a);
      t[i] = () => o;
    }
  }
}, Ns = (e, t) => {
  const r = ho(t);
  e.slots.default = () => r;
}, Os = (e, t, r) => {
  for (const n in t)
    (r || !po(n)) && (e[n] = t[n]);
}, Oa = (e, t, r) => {
  const n = e.slots = Ts();
  if (e.vnode.shapeFlag & 32) {
    const i = t._;
    i ? (Os(n, t, r), r && Hi(n, "_", i, !0)) : Rs(t, n);
  } else t && Ns(e, t);
}, Fa = (e, t, r) => {
  const { vnode: n, slots: i } = e;
  let a = !0, o = le;
  if (n.shapeFlag & 32) {
    const s = t._;
    s ? r && s === 1 ? a = !1 : Os(i, t, r) : (a = !t.$stable, Rs(t, i)), o = t;
  } else t && (Ns(e, t), o = { default: 1 });
  if (a)
    for (const s in i)
      !po(s) && o[s] == null && delete i[s];
}, Pe = Ua;
function Ba(e) {
  return Da(e);
}
function Da(e, t) {
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
    setScopeId: g = tt,
    insertStaticContent: A
  } = e, v = (f, p, b, E = null, S = null, x = null, R = void 0, I = null, L = !!p.dynamicChildren) => {
    if (f === p)
      return;
    f && !Kt(f, p) && (E = Ee(f), Ae(f, S, x, !0), f = null), p.patchFlag === -2 && (L = !1, p.dynamicChildren = null), p.dynamicChildren && f && f.dynamicChildren && f.dynamicChildren.hasOnce && (p.dynamicChildren === Tt && (p.dynamicChildren = []), p.dynamicChildren.hasOnce = !0);
    const { type: C, ref: z, shapeFlag: O } = p;
    switch (C) {
      case er:
        D(f, p, b, E);
        break;
      case je:
        T(f, p, b, E);
        break;
      case dr:
        f == null && w(p, b, E, R);
        break;
      case fe:
        V(
          f,
          p,
          b,
          E,
          S,
          x,
          R,
          I,
          L
        );
        break;
      default:
        O & 1 ? F(
          f,
          p,
          b,
          E,
          S,
          x,
          R,
          I,
          L
        ) : O & 6 ? H(
          f,
          p,
          b,
          E,
          S,
          x,
          R,
          I,
          L
        ) : (O & 64 || O & 128) && C.process(
          f,
          p,
          b,
          E,
          S,
          x,
          R,
          I,
          L,
          Oe
        );
    }
    z != null && S ? nn(z, f && f.ref, x, p || f, !p) : z == null && f && f.ref != null && nn(f.ref, null, x, f, !0);
  }, D = (f, p, b, E) => {
    if (f == null)
      n(
        p.el = s(p.children),
        b,
        E
      );
    else {
      const S = p.el = f.el;
      p.children !== f.children && u(S, p.children);
    }
  }, T = (f, p, b, E) => {
    f == null ? n(
      p.el = l(p.children || ""),
      b,
      E
    ) : p.el = f.el;
  }, w = (f, p, b, E) => {
    [f.el, f.anchor] = A(
      f.children,
      p,
      b,
      E,
      f.el,
      f.anchor
    );
  }, P = ({ el: f, anchor: p }, b, E) => {
    let S;
    for (; f && f !== p; )
      S = h(f), n(f, b, E), f = S;
    n(p, b, E);
  }, _ = ({ el: f, anchor: p }) => {
    let b;
    for (; f && f !== p; )
      b = h(f), i(f), f = b;
    i(p);
  }, F = (f, p, b, E, S, x, R, I, L) => {
    if (p.type === "svg" ? R = "svg" : p.type === "math" && (R = "mathml"), f == null)
      y(
        p,
        b,
        E,
        S,
        x,
        R,
        I,
        L
      );
    else {
      const C = f.el && f.el._isVueCE ? f.el : null;
      try {
        C && C._beginPatch(), B(
          f,
          p,
          S,
          x,
          R,
          I,
          L
        );
      } finally {
        C && C._endPatch();
      }
    }
  }, y = (f, p, b, E, S, x, R, I) => {
    let L, C;
    const { props: z, shapeFlag: O, transition: K, dirs: J } = f;
    if (L = f.el = o(
      f.type,
      x,
      z && z.is,
      z
    ), O & 8 ? c(L, f.children) : O & 16 && N(
      f.children,
      L,
      null,
      E,
      S,
      fr(f, x),
      R,
      I
    ), J && St(f, null, E, "created"), m(L, f, f.scopeId, R, E), z) {
      for (const se in z)
        se !== "value" && !Xt(se) && a(L, se, null, z[se], x, E);
      "value" in z && a(L, "value", null, z.value, x), (C = z.onVnodeBeforeMount) && We(C, E, f);
    }
    J && St(f, null, E, "beforeMount");
    const X = $a(S, K);
    X && K.beforeEnter(L), n(L, p, b), ((C = z && z.onVnodeMounted) || X || J) && Pe(() => {
      C && We(C, E, f), X && K.enter(L), J && St(f, null, E, "mounted");
    }, S);
  }, m = (f, p, b, E, S) => {
    if (b && g(f, b), E)
      for (let x = 0; x < E.length; x++)
        g(f, E[x]);
    if (S) {
      let x = S.subTree;
      if (p === x || Ds(x.type) && (x.ssContent === p || x.ssFallback === p)) {
        const R = S.vnode;
        m(
          f,
          R,
          R.scopeId,
          R.slotScopeIds,
          S.parent
        );
      }
    }
  }, N = (f, p, b, E, S, x, R, I, L = 0) => {
    for (let C = L; C < f.length; C++) {
      const z = f[C] = I ? ut(f[C]) : Xe(f[C]);
      v(
        null,
        z,
        p,
        b,
        E,
        S,
        x,
        R,
        I
      );
    }
  }, B = (f, p, b, E, S, x, R) => {
    const I = p.el = f.el;
    let { patchFlag: L, dynamicChildren: C, dirs: z } = p;
    L |= f.patchFlag & 16;
    const O = f.props || le, K = p.props || le;
    let J;
    if (b && xt(b, !1), (J = K.onVnodeBeforeUpdate) && We(J, b, p, f), z && St(p, f, b, "beforeUpdate"), b && xt(b, !0), // #6385 the old vnode may be a user-wrapped non-isomorphic block
    // Force full diff when block metadata is unstable.
    C && (!f.dynamicChildren || f.dynamicChildren.length !== C.length) && (L = 0, R = !1, C = null), (O.innerHTML && K.innerHTML == null || O.textContent && K.textContent == null) && c(I, ""), C ? j(
      f.dynamicChildren,
      C,
      I,
      b,
      E,
      fr(p, S),
      x
    ) : R || ne(
      f,
      p,
      I,
      null,
      b,
      E,
      fr(p, S),
      x,
      !1
    ), L > 0) {
      if (L & 16)
        q(I, O, K, b, S);
      else if (L & 2 && O.class !== K.class && a(I, "class", null, K.class, S), L & 4 && a(I, "style", O.style, K.style, S), L & 8) {
        const X = p.dynamicProps;
        for (let se = 0; se < X.length; se++) {
          const ie = X[se], de = O[ie], he = K[ie];
          (he !== de || ie === "value") && a(I, ie, de, he, S, b);
        }
      }
      L & 1 && f.children !== p.children && c(I, p.children);
    } else !R && C == null && q(I, O, K, b, S);
    ((J = K.onVnodeUpdated) || z) && Pe(() => {
      J && We(J, b, p, f), z && St(p, f, b, "updated");
    }, E);
  }, j = (f, p, b, E, S, x, R) => {
    for (let I = 0; I < p.length; I++) {
      const L = f[I], C = p[I], z = L.el || Yr(L), O = (
        // oldVNode may be an errored async setup() component inside Suspense
        // which will not have a mounted element
        z && // - In the case of a Fragment, we need to provide the actual parent
        // of the Fragment itself so it can move its children.
        (L.type === fe || // - In the case of different nodes, there is going to be a replacement
        // which also requires the correct parent container
        !Kt(L, C) || // - In the case of a component, it could contain anything.
        L.shapeFlag & 198) ? d(z) : (
          // In other cases, the parent container is not actually used so we
          // just pass the block element here to avoid a DOM parentNode call.
          b
        )
      );
      v(
        L,
        C,
        O,
        null,
        E,
        S,
        x,
        R,
        !0
      );
    }
  }, q = (f, p, b, E, S) => {
    if (p !== b) {
      if (p !== le)
        for (const x in p)
          !Xt(x) && !(x in b) && a(
            f,
            x,
            p[x],
            null,
            S,
            E
          );
      for (const x in b) {
        if (Xt(x)) continue;
        const R = b[x], I = p[x];
        R !== I && x !== "value" && a(f, x, I, R, S, E);
      }
      "value" in b && a(f, "value", p.value, b.value, S);
    }
  }, V = (f, p, b, E, S, x, R, I, L) => {
    const C = p.el = f ? f.el : s(""), z = p.anchor = f ? f.anchor : s("");
    let { patchFlag: O, dynamicChildren: K, slotScopeIds: J } = p;
    J && (I = I ? I.concat(J) : J), f == null ? (n(C, b, E), n(z, b, E), N(
      // #10007
      // such fragment like `<></>` will be compiled into
      // a fragment which doesn't have a children.
      // In this case fallback to an empty array
      p.children || [],
      b,
      z,
      S,
      x,
      R,
      I,
      L
    )) : O > 0 && O & 64 && K && // #2715 the previous fragment could've been a BAILed one as a result
    // of renderSlot() with no valid children
    f.dynamicChildren && f.dynamicChildren.length === K.length ? (j(
      f.dynamicChildren,
      K,
      b,
      S,
      x,
      R,
      I
    ), // #2080 if the stable fragment has a key, it's a <template v-for> that may
    //  get moved around. Make sure all root level vnodes inherit el.
    // #2134 or if it's a component root, it may also get moved around
    // as the component is being moved.
    (p.key != null || S && p === S.subTree) && Fs(
      f,
      p,
      !0
      /* shallow */
    )) : ne(
      f,
      p,
      b,
      z,
      S,
      x,
      R,
      I,
      L
    );
  }, H = (f, p, b, E, S, x, R, I, L) => {
    p.slotScopeIds = I, f == null ? p.shapeFlag & 512 ? S.ctx.activate(
      p,
      b,
      E,
      R,
      L
    ) : U(
      p,
      b,
      E,
      S,
      x,
      R,
      L
    ) : M(f, p, L);
  }, U = (f, p, b, E, S, x, R) => {
    const I = f.component = Ja(
      f,
      E,
      S
    );
    if (fo(f) && (I.ctx.renderer = Oe), Qa(I, !1, R), I.asyncDep) {
      if (S && S.registerDep(
        I,
        $,
        R,
        x
      ), !f.el) {
        const L = I.subTree = xe(je);
        T(null, L, p, b), f.placeholder = L.el;
      }
    } else
      $(
        I,
        f,
        p,
        b,
        S,
        x,
        R
      );
  }, M = (f, p, b) => {
    const E = p.component = f.component;
    if (Ta(f, p, b))
      if (E.asyncDep && !E.asyncResolved) {
        p.el = f.el, p.placeholder = f.placeholder, oe(E, p, b);
        return;
      } else
        E.next = p, E.update();
    else
      p.el = f.el, p.placeholder = f.placeholder, E.vnode = p;
  }, $ = (f, p, b, E, S, x, R) => {
    const I = () => {
      if (f.isMounted) {
        let { next: O, bu: K, u: J, parent: X, vnode: se } = f;
        {
          const ze = Bs(f);
          if (ze) {
            O && (O.el = se.el, oe(f, O, R)), ze.asyncDep.then(() => {
              Pe(() => {
                f.isUnmounted || C();
              }, S);
            });
            return;
          }
        }
        let ie = O, de;
        xt(f, !1), O ? (O.el = se.el, oe(f, O, R)) : O = se, K && An(K), (de = O.props && O.props.onVnodeBeforeUpdate) && We(de, X, O, se), xt(f, !0);
        const he = No(f), Ve = f.subTree;
        f.subTree = he, v(
          Ve,
          he,
          // parent may have changed if it's in a teleport
          d(Ve.el),
          // anchor may have changed if it's in a fragment
          Ee(Ve),
          f,
          S,
          x
        ), O.el = he.el, ie === null && Ma(f, he.el), J && Pe(J, S), (de = O.props && O.props.onVnodeUpdated) && Pe(
          () => We(de, X, O, se),
          S
        );
      } else {
        let O;
        const { el: K, props: J } = p, { bm: X, m: se, parent: ie, root: de, type: he } = f, Ve = rn(p);
        xt(f, !1), X && An(X), !Ve && (O = J && J.onVnodeBeforeMount) && We(O, ie, p), xt(f, !0);
        {
          de.ce && de.ce._hasShadowRoot() && de.ce._injectChildStyle(
            he,
            f.parent ? f.parent.type : void 0
          );
          const ze = f.subTree = No(f);
          v(
            null,
            ze,
            b,
            E,
            f,
            S,
            x
          ), p.el = ze.el;
        }
        if (se && Pe(se, S), !Ve && (O = J && J.onVnodeMounted)) {
          const ze = p;
          Pe(
            () => We(O, ie, ze),
            S
          );
        }
        (p.shapeFlag & 256 || ie && rn(ie.vnode) && ie.vnode.shapeFlag & 256) && f.a && Pe(f.a, S), f.isMounted = !0, p = b = E = null;
      }
    };
    f.scope.on();
    const L = f.effect = new Ki(I);
    f.scope.off();
    const C = f.update = L.run.bind(L), z = f.job = L.runIfDirty.bind(L);
    z.i = f, z.id = f.uid, L.scheduler = () => co(z), xt(f, !0), C();
  }, oe = (f, p, b) => {
    p.component = f;
    const E = f.vnode.props;
    f.vnode = p, f.next = null, Ia(f, p.props, E, b), Fa(f, p.children, b), rt(), fs(f), ot();
  }, ne = (f, p, b, E, S, x, R, I, L = !1) => {
    const C = f && f.children, z = f ? f.shapeFlag : 0, O = p.children, { patchFlag: K, shapeFlag: J } = p;
    if (K > 0) {
      if (K & 128) {
        pt(
          C,
          O,
          b,
          E,
          S,
          x,
          R,
          I,
          L
        );
        return;
      } else if (K & 256) {
        st(
          C,
          O,
          b,
          E,
          S,
          x,
          R,
          I,
          L
        );
        return;
      }
    }
    J & 8 ? (z & 16 && ht(C, S, x), O !== C && c(b, O)) : z & 16 ? J & 16 ? pt(
      C,
      O,
      b,
      E,
      S,
      x,
      R,
      I,
      L
    ) : ht(C, S, x, !0) : (z & 8 && c(b, ""), J & 16 && N(
      O,
      b,
      E,
      S,
      x,
      R,
      I,
      L
    ));
  }, st = (f, p, b, E, S, x, R, I, L) => {
    f = f || Tt, p = p || Tt;
    const C = f.length, z = p.length, O = Math.min(C, z);
    let K;
    for (K = 0; K < O; K++) {
      const J = p[K] = L ? ut(p[K]) : Xe(p[K]);
      v(
        f[K],
        J,
        b,
        null,
        S,
        x,
        R,
        I,
        L
      );
    }
    C > z ? ht(
      f,
      S,
      x,
      !0,
      !1,
      O
    ) : N(
      p,
      b,
      E,
      S,
      x,
      R,
      I,
      L,
      O
    );
  }, pt = (f, p, b, E, S, x, R, I, L) => {
    let C = 0;
    const z = p.length;
    let O = f.length - 1, K = z - 1;
    for (; C <= O && C <= K; ) {
      const J = f[C], X = p[C] = L ? ut(p[C]) : Xe(p[C]);
      if (Kt(J, X))
        v(
          J,
          X,
          b,
          null,
          S,
          x,
          R,
          I,
          L
        );
      else
        break;
      C++;
    }
    for (; C <= O && C <= K; ) {
      const J = f[O], X = p[K] = L ? ut(p[K]) : Xe(p[K]);
      if (Kt(J, X))
        v(
          J,
          X,
          b,
          null,
          S,
          x,
          R,
          I,
          L
        );
      else
        break;
      O--, K--;
    }
    if (C > O) {
      if (C <= K) {
        const J = K + 1, X = J < z ? p[J].el : E;
        for (; C <= K; )
          v(
            null,
            p[C] = L ? ut(p[C]) : Xe(p[C]),
            b,
            X,
            S,
            x,
            R,
            I,
            L
          ), C++;
      }
    } else if (C > K)
      for (; C <= O; )
        Ae(f[C], S, x, !0), C++;
    else {
      const J = C, X = C, se = /* @__PURE__ */ new Map();
      for (C = X; C <= K; C++) {
        const Me = p[C] = L ? ut(p[C]) : Xe(p[C]);
        Me.key != null && se.set(Me.key, C);
      }
      let ie, de = 0;
      const he = K - X + 1;
      let Ve = !1, ze = 0;
      const Vt = new Array(he);
      for (C = 0; C < he; C++) Vt[C] = 0;
      for (C = J; C <= O; C++) {
        const Me = f[C];
        if (de >= he) {
          Ae(Me, S, x, !0);
          continue;
        }
        let Ke;
        if (Me.key != null)
          Ke = se.get(Me.key);
        else
          for (ie = X; ie <= K; ie++)
            if (Vt[ie - X] === 0 && Kt(Me, p[ie])) {
              Ke = ie;
              break;
            }
        Ke === void 0 ? Ae(Me, S, x, !0) : (Vt[Ke - X] = C + 1, Ke >= ze ? ze = Ke : Ve = !0, v(
          Me,
          p[Ke],
          b,
          null,
          S,
          x,
          R,
          I,
          L
        ), de++);
      }
      const yo = Ve ? qa(Vt) : Tt;
      for (ie = yo.length - 1, C = he - 1; C >= 0; C--) {
        const Me = X + C, Ke = p[Me], vo = p[Me + 1], wo = Me + 1 < z ? (
          // #13559, #14173 fallback to el placeholder for unresolved async component
          vo.el || Yr(vo)
        ) : E;
        Vt[C] === 0 ? v(
          null,
          Ke,
          b,
          wo,
          S,
          x,
          R,
          I,
          L
        ) : Ve && (ie < 0 || C !== yo[ie] ? Re(Ke, b, wo, 2) : ie--);
      }
    }
  }, Re = (f, p, b, E, S = null) => {
    const { el: x, type: R, transition: I, children: L, shapeFlag: C } = f;
    if (C & 6) {
      Re(f.component.subTree, p, b, E);
      return;
    }
    if (C & 128) {
      f.suspense.move(p, b, E);
      return;
    }
    if (C & 64) {
      R.move(f, p, b, Oe);
      return;
    }
    if (R === fe) {
      n(x, p, b);
      for (let O = 0; O < L.length; O++)
        Re(L[O], p, b, E);
      n(f.anchor, p, b);
      return;
    }
    if (R === dr) {
      P(f, p, b);
      return;
    }
    if (E !== 2 && C & 1 && I)
      if (E === 0)
        I.persisted && !x[ur] ? n(x, p, b) : (I.beforeEnter(x), n(x, p, b), Pe(() => I.enter(x), S));
      else {
        const { leave: O, delayLeave: K, afterLeave: J } = I, X = () => {
          f.ctx.isUnmounted ? i(x) : n(x, p, b);
        }, se = () => {
          const ie = x._isLeaving || !!x[ur];
          x._isLeaving && x[ur](
            !0
            /* cancelled */
          ), I.persisted && !ie ? X() : O(x, () => {
            X(), J && J();
          });
        };
        K ? K(x, X, se) : se();
      }
    else
      n(x, p, b);
  }, Ae = (f, p, b, E = !1, S = !1) => {
    const {
      type: x,
      props: R,
      ref: I,
      children: L,
      dynamicChildren: C,
      shapeFlag: z,
      patchFlag: O,
      dirs: K,
      cacheIndex: J,
      memo: X
    } = f;
    if ((O === -2 || C && C.hasOnce) && (S = !1), I != null && (rt(), nn(I, null, b, f, !0), ot()), J != null && (!f.ctx || f.ctx === p) && (p.renderCache[J] = void 0), z & 256) {
      p.ctx.deactivate(f);
      return;
    }
    const se = z & 1 && K, ie = !rn(f);
    let de;
    if (ie && (de = R && R.onVnodeBeforeUnmount) && We(de, p, f), z & 6)
      jt(f.component, b, E);
    else {
      if (z & 128) {
        f.suspense.unmount(b, E);
        return;
      }
      se && St(f, null, p, "beforeUnmount"), z & 64 ? f.type.remove(
        f,
        p,
        b,
        Oe,
        E
      ) : C && // #5154
      // when v-once is used inside a block, setBlockTracking(-1) marks the
      // parent block with hasOnce: true
      // so that it doesn't take the fast path during unmount - otherwise
      // components nested in v-once are never unmounted.
      !C.hasOnce && // #1153: fast path should not be taken for non-stable (v-for) fragments
      (x !== fe || O > 0 && O & 64) ? ht(
        C,
        p,
        b,
        !1,
        !0
      ) : (x === fe && O & 384 || !S && z & 16) && ht(L, p, b), E && Bt(f);
    }
    const he = X != null && J == null;
    (ie && (de = R && R.onVnodeUnmounted) || se || he) && Pe(() => {
      de && We(de, p, f), se && St(f, null, p, "unmounted"), he && (f.el = null);
    }, b);
  }, Bt = (f) => {
    const { type: p, el: b, anchor: E, transition: S } = f, x = p === fe;
    if (x && !S) {
      bn(b, E);
      return;
    }
    if (p === dr) {
      _(f), S && !S.persisted && S.afterLeave && S.afterLeave();
      return;
    }
    const R = x ? Kr(f) : f, I = () => {
      x ? d(b) && bn(b, E) : i(b), S && !S.persisted && S.afterLeave && S.afterLeave();
    };
    if (R && R.shapeFlag & 1 && S && !S.persisted) {
      const { leave: L, delayLeave: C } = S, z = R.el, O = () => L(z, I);
      C ? C(z, I, O) : O();
    } else
      I();
  }, bn = (f, p) => {
    let b;
    for (; f !== p; )
      b = h(f), i(f), f = b;
    i(p);
  }, jt = (f, p, b) => {
    const { bum: E, scope: S, job: x, subTree: R, um: I, m: L, a: C } = f;
    Bo(L), Bo(C), E && An(E), S.stop(), x ? (x.flags |= 8, Ae(R, f, p, b)) : f.vnode.el && R && (R.transition = f.vnode.transition, Ae(R, f, p, b)), I && Pe(I, p), Pe(() => {
      f.isUnmounted = !0;
    }, p);
  }, ht = (f, p, b, E = !1, S = !1, x = 0) => {
    for (let R = x; R < f.length; R++)
      Ae(f[R], p, b, E, S);
  }, Ee = (f) => {
    if (f.shapeFlag & 6)
      return Ee(f.component.subTree);
    if (f.shapeFlag & 128)
      return f.suspense.next();
    const p = h(f.anchor || f.el), b = p && p[na];
    return b ? h(b) : p;
  }, Ne = (f, p, b) => {
    const E = f && p._vnode ? void 0 : f && f.component ? f.component.uid : Wa();
    Ql(() => {
      f == null ? p._vnode && Ae(p._vnode, null, null, !0) : v(
        p._vnode || null,
        f,
        p,
        null,
        null,
        null,
        b
      ), p._vnode = f;
    }, E);
  }, Oe = {
    p: v,
    um: Ae,
    m: Re,
    r: Bt,
    mt: U,
    mc: N,
    pc: ne,
    pbc: j,
    n: Ee,
    o: e
  };
  return {
    render: Ne,
    hydrate: void 0,
    createApp: Ca(Ne)
  };
}
function fr({ type: e, props: t }, r) {
  return r === "svg" && e === "foreignObject" || r === "mathml" && e === "annotation-xml" && t && t.encoding && t.encoding.includes("html") ? void 0 : r;
}
function xt({ effect: e, job: t }, r) {
  r ? (e.flags |= 32, t.flags |= 4) : (e.flags &= -33, t.flags &= -5);
}
function $a(e, t) {
  return (!e || e && !e.pendingBranch) && t && !t.persisted;
}
function Fs(e, t, r = !1) {
  const n = e.children, i = t.children;
  if (W(n) && W(i))
    for (let a = 0; a < n.length; a++) {
      const o = n[a];
      let s = i[a];
      s.shapeFlag & 1 && !s.dynamicChildren && ((s.patchFlag <= 0 || s.patchFlag === 32) && (s = i[a] = ut(i[a]), s.el = o.el), !r && s.patchFlag !== -2 && Fs(o, s)), s.type === er && (s.patchFlag === -1 && (s = i[a] = ut(s)), s.el = o.el), s.type === je && !s.el && (s.el = o.el);
    }
}
function qa(e) {
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
function Bs(e) {
  const t = e.subTree.component;
  if (t)
    return t.asyncDep && !t.asyncResolved ? t : Bs(t);
}
function Bo(e) {
  if (e)
    for (let t = 0; t < e.length; t++)
      e[t].flags |= 8;
}
function Yr(e) {
  if (e.placeholder)
    return e.placeholder;
  const t = e.component;
  return t ? Yr(t.subTree) : null;
}
const Ds = (e) => e.__isSuspense;
function Ua(e, t) {
  t && t.pendingBranch ? W(e) ? t.effects.push(...e) : t.effects.push(e) : Gl(e);
}
const fe = /* @__PURE__ */ Symbol.for("v-fgt"), er = /* @__PURE__ */ Symbol.for("v-txt"), je = /* @__PURE__ */ Symbol.for("v-cmt"), dr = /* @__PURE__ */ Symbol.for("v-stc"), It = [];
let Ie = null;
function Q(e = !1) {
  It.push(Ie = e ? null : []);
}
function $s() {
  It.pop(), Ie = It[It.length - 1] || null;
}
let un = 1;
function Fn(e, t = !1) {
  un += e, e < 0 && Ie && t && (Ie.hasOnce = !0);
}
function qs(e) {
  return e.dynamicChildren = un > 0 ? Ie || Tt : null, $s(), un > 0 && Ie && Ie.push(e), e;
}
function Y(e, t, r, n, i, a) {
  return qs(
    k(
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
function Ha(e, t, r, n, i) {
  return qs(
    xe(
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
function Kt(e, t) {
  return e.type === t.type && e.key === t.key;
}
const Us = ({ key: e }) => e ?? null, Pn = ({
  ref: e,
  ref_key: t,
  ref_for: r
}) => (typeof e == "number" && (e = "" + e), e != null ? ce(e) || /* @__PURE__ */ ve(e) || G(e) ? { i: Fe, r: e, k: t, f: !!r } : e : null);
function k(e, t = null, r = null, n = 0, i = null, a = e === fe ? 0 : 1, o = !1, s = !1) {
  const l = {
    __v_isVNode: !0,
    __v_skip: !0,
    type: e,
    props: t,
    key: t && Us(t),
    ref: t && Pn(t),
    scopeId: hs,
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
    ctx: Fe
  };
  return s ? (Bn(l, r), a & 128 && e.normalize(l)) : r && (l.shapeFlag |= ce(r) ? 8 : 16), un > 0 && // avoid a block node from tracking itself
  !o && // has current parent block
  Ie && // presence of a patch flag indicates this node needs patching on updates.
  // component nodes also should always be patched, because even if the
  // component doesn't need to update, it needs to persist the instance on to
  // the next vnode so that it can be properly unmounted later.
  (l.patchFlag > 0 || a & 6) && // the EVENTS flag is only for hydration and if it is the only flag, the
  // vnode should not be considered dynamic due to handler caching.
  l.patchFlag !== 32 && Ie.push(l), l;
}
const xe = ja;
function ja(e, t = null, r = null, n = 0, i = null, a = !1) {
  if ((!e || e === ga) && (e = je), cn(e)) {
    const s = Ht(
      e,
      t,
      !0
      /* mergeRef: true */
    );
    return r && Bn(s, r), un > 0 && !a && Ie && (s.shapeFlag & 6 ? Ie[Ie.indexOf(e)] = s : Ie.push(s)), s.patchFlag = -2, s;
  }
  if (eu(e) && (e = e.__vccOpts), t) {
    t = Va(t);
    let { class: s, style: l } = t;
    s && !ce(s) && (t.class = Wn(s)), re(l) && (/* @__PURE__ */ uo(l) && !W(l) && (l = we({}, l)), t.style = no(l));
  }
  const o = ce(e) ? 1 : Ds(e) ? 128 : Yn(e) ? 64 : re(e) ? 4 : G(e) ? 2 : 0;
  return k(
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
function Va(e) {
  return e ? /* @__PURE__ */ uo(e) || Ms(e) ? we({}, e) : e : null;
}
function Ht(e, t, r = !1, n = !1) {
  const { props: i, ref: a, patchFlag: o, children: s, transition: l } = e, u = t ? za(i || {}, t) : i, c = {
    __v_isVNode: !0,
    __v_skip: !0,
    type: e.type,
    props: u,
    key: u && Us(u),
    ref: t && t.ref ? (
      // #2078 in the case of <component :is="vnode" ref="extra"/>
      // if the vnode itself already has a ref, cloneVNode will need to merge
      // the refs so the single vnode can be set on multiple refs
      r && a ? W(a) ? a.concat(Pn(t)) : [a, Pn(t)] : Pn(t)
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
    patchFlag: t && e.type !== fe ? o === -1 ? 16 : o | 16 : o,
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
    ssContent: e.ssContent && Ht(e.ssContent),
    ssFallback: e.ssFallback && Ht(e.ssFallback),
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
function be(e = " ", t = 0) {
  return xe(er, null, e, t);
}
function Ge(e = "", t = !1) {
  return t ? (Q(), Ha(je, null, e)) : xe(je, null, e);
}
function Xe(e) {
  return e == null || typeof e == "boolean" ? xe(je) : W(e) ? xe(
    fe,
    null,
    // #3666, avoid reference pollution when reusing vnode
    e.slice()
  ) : cn(e) ? ut(e) : xe(er, null, String(e));
}
function ut(e) {
  return e.el === null && e.patchFlag !== -1 || e.memo ? e : Ht(e);
}
function Bn(e, t) {
  let r = 0;
  const { shapeFlag: n } = e;
  if (t == null)
    t = null;
  else if (W(t))
    r = 16;
  else if (typeof t == "object")
    if (n & 65) {
      const i = t.default;
      i && (i._c && (i._d = !1), Bn(e, i()), i._c && (i._d = !0));
      return;
    } else {
      r = 32;
      const i = t._;
      !i && !Ms(t) ? t._ctx = Fe : i === 3 && Fe && (Fe.slots._ === 1 ? t._ = 1 : (t._ = 2, e.patchFlag |= 1024));
    }
  else if (G(t)) {
    if (n & 65) {
      Bn(e, { default: t });
      return;
    }
    t = { default: t, _ctx: Fe }, r = 32;
  } else
    t = String(t), n & 64 ? (r = 16, t = [be(t)]) : r = 8;
  e.children = t, e.shapeFlag |= r;
}
function za(...e) {
  const t = {};
  for (let r = 0; r < e.length; r++) {
    const n = e[r];
    for (const i in n)
      if (i === "class")
        t.class !== n.class && (t.class = Wn([t.class, n.class]));
      else if (i === "style")
        t.style = no([t.style, n.style]);
      else if (Hn(i)) {
        const a = t[i], o = n[i];
        o && a !== o && !(W(a) && a.includes(o)) ? t[i] = a ? [].concat(a, o) : o : o == null && a == null && // mergeProps({ 'onUpdate:modelValue': undefined }) should not retain
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
const Ka = Ss();
let Hs = 0;
function Wa() {
  return Hs;
}
function Ja(e, t, r) {
  const n = e.type, i = (t ? t.appContext : e.appContext) || Ka, a = {
    uid: Hs++,
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
    scope: new kl(
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
    propsOptions: Is(n, i),
    emitsOptions: xs(n, i),
    // emit
    emit: null,
    // to be set immediately
    emitted: null,
    // props default value
    propsDefaults: le,
    // inheritAttrs
    inheritAttrs: n.inheritAttrs,
    // state
    ctx: le,
    data: le,
    props: le,
    attrs: le,
    slots: le,
    refs: le,
    setupState: le,
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
  return a.ctx = { _: a }, a.root = t ? t.root : a, a.emit = xa.bind(null, a), e.ce && e.ce(a), a;
}
let Se = null;
const Ga = () => Se || Fe;
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
    (r) => Se = r
  ), fn = t(
    "__VUE_SSR_SETTERS__",
    (r) => dn = r
  );
}
const mn = (e) => {
  const t = Se;
  return Dn(e), e.scope.on(), () => {
    e.scope.off(), Dn(t);
  };
}, Do = () => {
  Se && Se.scope.off(), Dn(null);
};
function js(e) {
  return e.vnode.shapeFlag & 4;
}
let dn = !1;
function Qa(e, t = !1, r = !1) {
  t && fn(t);
  const { props: n, children: i } = e.vnode, a = js(e);
  La(e, n, a, t), Oa(e, i, r || t);
  const o = a ? Ya(e, t) : void 0;
  return t && fn(!1), o;
}
function Ya(e, t) {
  const r = e.type;
  e.accessCache = /* @__PURE__ */ Object.create(null), e.proxy = new Proxy(e.ctx, ma);
  const { setup: n } = r;
  if (n) {
    rt();
    const i = e.setupContext = n.length > 1 ? Za(e) : null, a = mn(e), o = gn(
      n,
      e,
      0,
      [
        e.props,
        i
      ]
    ), s = Di(o);
    if (ot(), a(), (s || e.sp) && !rn(e) && ys(e), s) {
      if (o.then(Do, Do), t)
        return o.then((l) => {
          fn(!0);
          try {
            $o(e, l, t);
          } finally {
            fn(!1);
          }
        }).catch((l) => {
          Qn(l, e, 0);
        });
      e.asyncDep = o;
    } else
      $o(e, o);
  } else
    Vs(e);
}
function $o(e, t, r) {
  G(t) ? e.type.__ssrInlineRender ? e.ssrRender = t : e.render = t : re(t) && (e.setupState = as(t)), Vs(e);
}
function Vs(e, t, r) {
  const n = e.type;
  e.render || (e.render = n.render || tt);
  {
    const i = mn(e);
    rt();
    try {
      ba(e);
    } finally {
      ot(), i();
    }
  }
}
const Xa = {
  get(e, t) {
    return ye(e, "get", ""), e[t];
  }
};
function Za(e) {
  const t = (r) => {
    e.exposed = r || {};
  };
  return {
    attrs: new Proxy(e.attrs, Xa),
    slots: e.slots,
    emit: e.emit,
    expose: t
  };
}
function tr(e) {
  return e.exposed ? e.exposeProxy || (e.exposeProxy = new Proxy(as($l(e.exposed)), {
    get(t, r) {
      if (r in t)
        return t[r];
      if (r in on)
        return on[r](e);
    },
    has(t, r) {
      return r in t || r in on;
    }
  })) : e.proxy;
}
function eu(e) {
  return G(e) && "__vccOpts" in e;
}
const Ze = (e, t) => /* @__PURE__ */ Vl(e, t, dn);
function pn(e, t, r) {
  try {
    Fn(-1);
    const n = arguments.length;
    return n === 2 ? re(t) && !W(t) ? cn(t) ? xe(e, null, [t]) : xe(e, t) : xe(e, null, t) : (n > 3 ? r = Array.prototype.slice.call(arguments, 2) : n === 3 && cn(r) && (r = [r]), xe(e, t, r));
  } finally {
    Fn(1);
  }
}
const tu = "3.5.44";
let Xr;
const qo = typeof window < "u" && window.trustedTypes;
if (qo)
  try {
    Xr = /* @__PURE__ */ qo.createPolicy("vue", {
      createHTML: (e) => e
    });
  } catch {
  }
const zs = Xr ? (e) => Xr.createHTML(e) : (e) => e, nu = "http://www.w3.org/2000/svg", ru = "http://www.w3.org/1998/Math/MathML", at = typeof document < "u" ? document : null, Uo = at && /* @__PURE__ */ at.createElement("template"), ou = {
  insert: (e, t, r) => {
    t.insertBefore(e, r || null);
  },
  remove: (e) => {
    const t = e.parentNode;
    t && t.removeChild(e);
  },
  createElement: (e, t, r, n) => {
    const i = t === "svg" ? at.createElementNS(nu, e) : t === "mathml" ? at.createElementNS(ru, e) : r ? at.createElement(e, { is: r }) : at.createElement(e);
    return e === "select" && n && n.multiple != null && i.setAttribute("multiple", n.multiple), i;
  },
  createText: (e) => at.createTextNode(e),
  createComment: (e) => at.createComment(e),
  setText: (e, t) => {
    e.nodeValue = t;
  },
  setElementText: (e, t) => {
    e.textContent = t;
  },
  parentNode: (e) => e.parentNode,
  nextSibling: (e) => e.nextSibling,
  querySelector: (e) => at.querySelector(e),
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
      Uo.innerHTML = zs(
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
}, iu = /* @__PURE__ */ Symbol("_vtc");
function su(e, t, r) {
  const n = e[iu];
  n && (t = (t ? [t, ...n] : [...n]).join(" ")), t == null ? e.removeAttribute("class") : r ? e.setAttribute("class", t) : e.className = t;
}
const Ho = /* @__PURE__ */ Symbol("_vod"), lu = /* @__PURE__ */ Symbol("_vsh"), au = /* @__PURE__ */ Symbol(""), uu = /(?:^|;)\s*display\s*:/;
function cu(e, t, r) {
  const n = e.style, i = ce(r);
  let a = !1;
  if (r && !i) {
    if (t)
      if (ce(t))
        for (const o of t.split(";")) {
          const s = o.slice(0, o.indexOf(":")).trim();
          r[s] == null && Qt(n, s, "");
        }
      else
        for (const o in t)
          r[o] == null && Qt(n, o, "");
    for (const o in r) {
      o === "display" && (a = !0);
      const s = r[o];
      s != null ? du(
        e,
        o,
        !ce(t) && t ? t[o] : void 0,
        s
      ) || Qt(n, o, s) : Qt(n, o, "");
    }
  } else if (i) {
    if (t !== r) {
      const o = n[au];
      o && (r += ";" + o), n.cssText = r, a = uu.test(r);
    }
  } else t && e.removeAttribute("style");
  Ho in e && ((!i || t !== r) && (e[Ho] = a ? n.display : ""), e[lu] && (n.display = "none"));
}
const _n = /\s*!important$/;
function Qt(e, t, r) {
  if (W(r))
    r.forEach((n) => Qt(e, t, n));
  else if (r == null && (r = ""), t.startsWith("--"))
    _n.test(r) ? e.setProperty(t, r.replace(_n, ""), "important") : e.setProperty(t, r);
  else {
    const n = fu(e, t);
    _n.test(r) ? e.setProperty(
      Nt(n),
      r.replace(_n, ""),
      "important"
    ) : e[n] = r;
  }
}
const jo = ["Webkit", "Moz", "ms"], pr = {};
function fu(e, t) {
  const r = pr[t];
  if (r)
    return r;
  let n = qe(t);
  if (n !== "filter" && n in e)
    return pr[t] = n;
  n = Ui(n);
  for (let i = 0; i < jo.length; i++) {
    const a = jo[i] + n;
    if (a in e)
      return pr[t] = a;
  }
  return t;
}
function du(e, t, r, n) {
  return e.tagName === "TEXTAREA" && (t === "width" || t === "height") && ce(n) && r === n;
}
const Vo = "http://www.w3.org/1999/xlink";
function zo(e, t, r, n, i, a = bl(t)) {
  n && t.startsWith("xlink:") ? r == null ? e.removeAttributeNS(Vo, t.slice(6, t.length)) : e.setAttributeNS(Vo, t, r) : r == null || a && !ji(r) ? e.removeAttribute(t) : e.setAttribute(
    t,
    a ? "" : nt(r) ? String(r) : r
  );
}
function Ko(e, t, r, n, i) {
  if (t === "innerHTML" || t === "textContent") {
    r != null && (e[t] = t === "innerHTML" ? zs(r) : r);
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
    s === "boolean" ? r = ji(r) : r == null && s === "string" ? (r = "", o = !0) : s === "number" && (r = 0, o = !0);
  }
  try {
    e[t] = r;
  } catch {
  }
  o && e.removeAttribute(i || t);
}
function Et(e, t, r, n) {
  e.addEventListener(t, r, n);
}
function pu(e, t, r, n) {
  e.removeEventListener(t, r, n);
}
const Wo = /* @__PURE__ */ Symbol("_vei");
function hu(e, t, r, n, i = null) {
  const a = e[Wo] || (e[Wo] = {}), o = a[t];
  if (n && o)
    o.value = n;
  else {
    const [s, l] = bu(t);
    if (n) {
      const u = a[t] = wu(
        n,
        i
      );
      Et(e, s, u, l);
    } else o && (pu(e, s, o, l), a[t] = void 0);
  }
}
const gu = /(Once|Passive|Capture)$/, mu = /^on:?(?:Once|Passive|Capture)$/;
function bu(e) {
  let t, r;
  for (; (r = e.match(gu)) && !mu.test(e); )
    t || (t = {}), e = e.slice(0, e.length - r[1].length), t[r[1].toLowerCase()] = !0;
  return [e[2] === ":" ? e.slice(3) : Nt(e.slice(2)), t];
}
let hr = 0;
const yu = /* @__PURE__ */ Promise.resolve(), vu = () => hr || (yu.then(() => hr = 0), hr = Date.now());
function wu(e, t) {
  const r = (n) => {
    if (!n._vts)
      n._vts = Date.now();
    else if (n._vts <= r.attached)
      return;
    const i = r.value;
    if (W(i)) {
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
  return r.value = e, r.attached = vu(), r;
}
const Jo = (e) => e.charCodeAt(0) === 111 && e.charCodeAt(1) === 110 && // lowercase letter
e.charCodeAt(2) > 96 && e.charCodeAt(2) < 123, ku = (e, t, r, n, i, a) => {
  const o = i === "svg";
  t === "class" ? su(e, n, o) : t === "style" ? cu(e, r, n) : Hn(t) ? jn(t) || hu(e, t, r, n, a) : (t[0] === "." ? (t = t.slice(1), !0) : t[0] === "^" ? (t = t.slice(1), !1) : _u(e, t, n, o)) ? (Ko(e, t, n), !e.tagName.includes("-") && (t === "value" || t === "checked" || t === "selected") && zo(e, t, n, o, a, t !== "value")) : /* #11081 force set props for possible async custom element */ e._isVueCE && // #12408 check if it's declared prop or it's async custom element
  (Cu(e, t) || // @ts-expect-error _def is private
  e._def.__asyncLoader && (/[A-Z]/.test(t) || !ce(n))) ? Ko(e, qe(t), n, a, t) : (t === "true-value" ? e._trueValue = n : t === "false-value" && (e._falseValue = n), zo(e, t, n, o));
};
function _u(e, t, r, n) {
  if (n)
    return !!(t === "innerHTML" || t === "textContent" || t in e && Jo(t) && G(r));
  if (t === "spellcheck" || t === "draggable" || t === "translate" || t === "autocorrect" || t === "sandbox" && e.tagName === "IFRAME" || t === "form" || t === "list" && e.tagName === "INPUT" || t === "type" && e.tagName === "TEXTAREA")
    return !1;
  if (t === "width" || t === "height") {
    const i = e.tagName;
    if (i === "IMG" || i === "VIDEO" || i === "CANVAS" || i === "SOURCE")
      return !1;
  }
  return Jo(t) && ce(r) ? !1 : t in e;
}
function Cu(e, t) {
  const r = (
    // @ts-expect-error _def is private
    e._def.props
  );
  if (!r)
    return !1;
  const n = qe(t);
  return Array.isArray(r) ? r.some((i) => qe(i) === n) : Object.keys(r).some((i) => qe(i) === n);
}
const $n = (e) => {
  const t = e.props["onUpdate:modelValue"] || !1;
  return W(t) ? (r) => An(t, r) : t;
};
function Su(e) {
  e.target.composing = !0;
}
function Go(e) {
  const t = e.target;
  t.composing && (t.composing = !1, t.dispatchEvent(new Event("input")));
}
const Mt = /* @__PURE__ */ Symbol("_assign"), Cn = /* @__PURE__ */ Symbol("_initialValue");
function gr(e, t, r) {
  return t && (e = e.trim()), r && (e = zn(e)), e;
}
const Pt = {
  created(e, { modifiers: { lazy: t, trim: r, number: n } }, i) {
    e.parentNode && (e.type === "text" ? e[Cn] = e.defaultValue.replace(/[\r\n]/g, "") : e.type === "textarea" && (e[Cn] = e.defaultValue.replace(/\r\n?/g, `
`))), e[Mt] = $n(i);
    const a = n || i.props && i.props.type === "number";
    Et(e, t ? "change" : "input", (o) => {
      o.target.composing || e[Mt](gr(e.value, r, a));
    }), (r || a) && Et(e, "change", () => {
      e.value = gr(e.value, r, a);
    }), t || (Et(e, "compositionstart", Su), Et(e, "compositionend", Go), Et(e, "change", Go));
  },
  // set value on mounted so it's after min/max for type="range"
  mounted(e, { value: t, modifiers: { trim: r, number: n } }) {
    const i = t ?? "", a = e[Cn];
    delete e[Cn], a !== void 0 && (e.type === "text" || e.type === "textarea") && e.value !== a ? e[Mt](gr(e.value, r, n)) : e.value = i;
  },
  beforeUpdate(e, { value: t, oldValue: r, modifiers: { lazy: n, trim: i, number: a } }, o) {
    if (e[Mt] = $n(o), e.composing) return;
    const s = (a || e.type === "number") && !/^0\d/.test(e.value) ? zn(e.value) : e.value, l = t ?? "";
    if (s === l)
      return;
    const u = e.getRootNode();
    (u instanceof Document || u instanceof ShadowRoot) && u.activeElement === e && e.type !== "range" && (n && t === r || i && e.value.trim() === l) || (e.value = l);
  }
}, bt = {
  // <select multiple> value need to be deep traversed
  deep: !0,
  created(e, { value: t, modifiers: { number: r } }, n) {
    e._modelValue = t, Et(e, "change", () => {
      const i = Array.prototype.filter.call(e.options, (l) => l.selected).map(
        (l) => r ? zn(qn(l)) : qn(l)
      ), a = e.multiple, o = a ? Rt(e._modelValue) ? new Set(i) : i : i[0], s = e._pendingValue = [
        a,
        a ? W(o) ? i.slice() : i : o
      ];
      try {
        e[Mt](o);
      } finally {
        Ln(() => {
          e._pendingValue === s && (e._pendingValue = void 0);
        });
      }
    }), e[Mt] = $n(n);
  },
  // set value in mounted & updated because <select> relies on its children
  // <option>s.
  mounted(e, { value: t }) {
    Qo(e, t);
  },
  beforeUpdate(e, { value: t }, r) {
    e._modelValue = t, e[Mt] = $n(r);
  },
  updated(e, { value: t }) {
    const r = e._pendingValue;
    e._pendingValue = void 0, (!r || r[0] !== e.multiple || !xu(t, r[1], r[0])) && Qo(e, t);
  }
};
function xu(e, t, r) {
  if (!r || W(e)) return kt(e, t);
  if (Rt(e)) {
    if (e.size !== t.length) return !1;
    for (const n of t)
      if (!e.has(n)) return !1;
    return !0;
  }
  return !1;
}
function Qo(e, t) {
  const r = e.multiple, n = W(t);
  if (!(r && !n && !Rt(t))) {
    for (let i = 0, a = e.options.length; i < a; i++) {
      const o = e.options[i], s = qn(o);
      if (r)
        if (n) {
          const l = typeof s;
          l === "string" || l === "number" ? o.selected = t.some((u) => String(u) === String(s)) : o.selected = wl(t, s) > -1;
        } else
          o.selected = t.has(s);
      else if (kt(qn(o), t)) {
        e.selectedIndex !== i && (e.selectedIndex = i);
        return;
      }
    }
    !r && e.selectedIndex !== -1 && (e.selectedIndex = -1);
  }
}
function qn(e) {
  return "_value" in e ? e._value : e.value;
}
const Au = ["ctrl", "shift", "alt", "meta"], Eu = {
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
  exact: (e, t) => Au.some((r) => e[`${r}Key`] && !t.includes(r))
}, Sn = (e, t) => {
  if (!e) return e;
  const r = e._withMods || (e._withMods = {}), n = t.join(".");
  return r[n] || (r[n] = ((i, ...a) => {
    for (let o = 0; o < t.length; o++) {
      const s = Eu[t[o]];
      if (s && s(i, t)) return;
    }
    return e(i, ...a);
  }));
}, Pu = /* @__PURE__ */ we({ patchProp: ku }, ou);
let Yo;
function Tu() {
  return Yo || (Yo = Ba(Pu));
}
const Xo = ((...e) => {
  const t = Tu().createApp(...e), { mount: r } = t;
  return t.mount = (n) => {
    const i = Lu(n);
    if (!i) return;
    const a = t._component;
    !G(a) && !a.render && !a.template && (a.template = i.innerHTML), i.nodeType === 1 && (i.textContent = "");
    const o = r(i, !1, Mu(i));
    return i instanceof Element && (i.removeAttribute("v-cloak"), i.setAttribute("data-v-app", "")), o;
  }, t;
});
function Mu(e) {
  if (e instanceof SVGElement)
    return "svg";
  if (typeof MathMLElement == "function" && e instanceof MathMLElement)
    return "mathml";
}
function Lu(e) {
  return ce(e) ? document.querySelector(e) : e;
}
const Iu = (e) => {
  for (const t in e)
    if (t.startsWith("aria-") || t === "role" || t === "title")
      return !0;
  return !1;
};
const Zo = (e) => e === "";
const Ru = (...e) => e.filter((t, r, n) => !!t && t.trim() !== "" && n.indexOf(t) === r).join(" ").trim();
const ei = (e) => e.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase();
const Nu = (e) => e.replace(
  /^([A-Z])|[\s-_]+(\w)/g,
  (t, r, n) => n ? n.toUpperCase() : r.toLowerCase()
);
const Ou = (e) => {
  const t = Nu(e);
  return t.charAt(0).toUpperCase() + t.slice(1);
};
var Wt = {
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
const Fu = ({
  name: e,
  iconNode: t,
  absoluteStrokeWidth: r,
  "absolute-stroke-width": n,
  strokeWidth: i,
  "stroke-width": a,
  size: o = Wt.width,
  color: s = Wt.stroke,
  ...l
}, { slots: u }) => pn(
  "svg",
  {
    ...Wt,
    ...l,
    width: o,
    height: o,
    stroke: s,
    "stroke-width": Zo(r) || Zo(n) || r === !0 || n === !0 ? Number(i || a || Wt["stroke-width"]) * 24 / Number(o) : i || a || Wt["stroke-width"],
    class: Ru(
      "lucide",
      l.class,
      ...e ? [`lucide-${ei(Ou(e))}-icon`, `lucide-${ei(e)}`] : ["lucide-icon"]
    ),
    ...!u.default && !Iu(l) && { "aria-hidden": "true" }
  },
  [...t.map((c) => pn(...c)), ...u.default ? [u.default()] : []]
);
const Ks = (e, t) => (r, { slots: n, attrs: i }) => pn(
  Fu,
  {
    ...i,
    ...r,
    iconNode: t,
    name: e
  },
  n
);
const Bu = Ks("printer", [
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
const Du = Ks("qr-code", [
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
function $u(e) {
  return !!e?.displayUom && e.displayUom !== e.stockUom && Number.isFinite(e.qtyInPack) && e.qtyInPack > 0;
}
function Ws(e) {
  return e.skipPrepacking ? e.postpacking : e.prepacking;
}
function Js(e) {
  const t = Number(Ws(e)?.goodQty), r = $u(e) ? e.qtyInPack : 1;
  return Math.max(1, Math.ceil(t / r - 1e-8));
}
function ti(e, t, r) {
  const n = Number(t), i = Number(r);
  if (t === "" || r === "" || !Number.isInteger(n) || !Number.isInteger(i)) return [];
  const [a, o] = n <= i ? [n, i] : [i, n];
  return [...new Set(e.map((s) => Number(s.label_number)))].filter((s) => s >= a && s <= o).sort((s, l) => s - l);
}
const me = /* @__PURE__ */ Gn({ workOrder: "", labelCount: 0, afterSave: "" });
function Gs(e, t, r = "") {
  me.workOrder = e, me.labelCount = t, me.afterSave = r;
}
const Qs = (e, t) => {
  const r = e.__vccOpts || e;
  for (const [n, i] of t)
    r[n] = i;
  return r;
}, qu = {
  key: 0,
  class: "toolbar ws-label-actions"
}, Uu = {
  __name: "WorkOrderLabelButton",
  props: { workOrder: { type: Object, required: !0 } },
  setup(e) {
    return (t, r) => pe(Ws)(e.workOrder)?.confirmed ? (Q(), Y("div", qu, [
      k("button", {
        class: "btn ws-label-print",
        type: "button",
        onClick: r[0] || (r[0] = (n) => pe(Gs)(e.workOrder.id, pe(Js)(e.workOrder)))
      }, [
        xe(pe(Bu), {
          size: 14,
          "stroke-width": 2
        }),
        r[1] || (r[1] = be(" Cetak Label ", -1))
      ])
    ])) : Ge("", !0);
  }
}, Hu = /* @__PURE__ */ Qs(Uu, [["__scopeId", "data-v-c9012b16"]]);
function Ys(e) {
  return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default") ? e.default : e;
}
function ju(e) {
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
function Vu(e) {
  throw new Error('Could not dynamically require "' + e + '". Please configure the dynamicRequireTargets or/and ignoreDynamicRequires option of @rollup/plugin-commonjs appropriately for this require call to work.');
}
var mr = { exports: {} };
const zu = {}, Ku = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: zu
}, Symbol.toStringTag, { value: "Module" })), Wu = /* @__PURE__ */ ju(Ku);
var ni;
function Ju() {
  return ni || (ni = 1, (function(e, t) {
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
              if (typeof Vu == "function")
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
              return Wu.resolve(o);
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
            for (var A = new Array(64), v, D, T, w, P, _, F, y, h = 0; h < c; h++) {
              for (var m = 0; m < 16; m++)
                A[m] = d[h][m];
              for (var m = 16; m < 64; m++)
                A[m] = n.SHA._dev1(A[m - 2]) + A[m - 7] + n.SHA._dev0(A[m - 15]) + A[m - 16] & 4294967295;
              v = l[0], D = l[1], T = l[2], w = l[3], P = l[4], _ = l[5], F = l[6], y = l[7];
              for (var m = 0; m < 64; m++) {
                var N = y + n.SHA._sig1(P) + n.SHA._ch(P, _, F) + s[m] + A[m], B = n.SHA._sig0(v) + n.SHA._maj(v, D, T);
                y = F, F = _, _ = P, P = w + N & 4294967295, w = T, T = D, D = v, v = N + B & 4294967295;
              }
              l[0] = l[0] + v & 4294967295, l[1] = l[1] + D & 4294967295, l[2] = l[2] + T & 4294967295, l[3] = l[3] + w & 4294967295, l[4] = l[4] + P & 4294967295, l[5] = l[5] + _ & 4294967295, l[6] = l[6] + F & 4294967295, l[7] = l[7] + y & 4294967295;
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
                }, A = function() {
                  var v = n.tools.extend({}, n.websocket.connectConfig, o);
                  n.websocket.setup.findConnection(v, s, g);
                };
                d == 0 ? A() : setTimeout(A, o.delay * 1e3);
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
          for (var h = function(w) {
            var P = {
              printer: w.config.getPrinter(),
              options: w.config.getOptions(),
              data: w.data
            };
            return n.websocket.dataPromise("print", P, w.signature, w.timestamp);
          }, g = [], A = 0; A < o.length || A < s.length; A++)
            (function(w) {
              var P = {
                config: o[Math.min(w, o.length - 1)],
                data: s[Math.min(w, s.length - 1)],
                signature: u[w],
                timestamp: c[w]
              };
              g.push(function() {
                return h(P);
              });
            })(A);
          var v = null;
          if (l) {
            var D = [];
            v = function(w) {
              D.push(w);
            }, g.push(function() {
              return n.tools.promise(function(w, P) {
                D.length ? P(D) : w();
              });
            });
          }
          var T = null;
          return g.reduce(function(w, P) {
            return T = w.catch(v).then(P), T;
          }, n.tools.promise(function(w) {
            w();
          })), T;
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
var Gu = Ju();
const Te = /* @__PURE__ */ Ys(Gu);
var $t = {}, br, ri;
function Qu() {
  return ri || (ri = 1, br = function() {
    return typeof Promise == "function" && Promise.prototype && Promise.prototype.then;
  }), br;
}
var yr = {}, gt = {}, oi;
function Ot() {
  if (oi) return gt;
  oi = 1;
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
var vr = {}, ii;
function go() {
  return ii || (ii = 1, (function(e) {
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
  })(vr)), vr;
}
var wr, si;
function Yu() {
  if (si) return wr;
  si = 1;
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
  }, wr = e, wr;
}
var kr, li;
function Xu() {
  if (li) return kr;
  li = 1;
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
var _r = {}, ai;
function Zu() {
  return ai || (ai = 1, (function(e) {
    const t = Ot().getSymbolSize;
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
var Cr = {}, ui;
function ec() {
  if (ui) return Cr;
  ui = 1;
  const e = Ot().getSymbolSize, t = 7;
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
var Sr = {}, ci;
function tc() {
  return ci || (ci = 1, (function(e) {
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
var xn = {}, fi;
function Xs() {
  if (fi) return xn;
  fi = 1;
  const e = go(), t = [
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
var xr = {}, Jt = {}, di;
function nc() {
  if (di) return Jt;
  di = 1;
  const e = new Uint8Array(512), t = new Uint8Array(256);
  return (function() {
    let n = 1;
    for (let i = 0; i < 255; i++)
      e[i] = n, t[n] = i, n <<= 1, n & 256 && (n ^= 285);
    for (let i = 255; i < 512; i++)
      e[i] = e[i - 255];
  })(), Jt.log = function(n) {
    if (n < 1) throw new Error("log(" + n + ")");
    return t[n];
  }, Jt.exp = function(n) {
    return e[n];
  }, Jt.mul = function(n, i) {
    return n === 0 || i === 0 ? 0 : e[t[n] + t[i]];
  }, Jt;
}
var pi;
function rc() {
  return pi || (pi = 1, (function(e) {
    const t = nc();
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
var Ar, hi;
function oc() {
  if (hi) return Ar;
  hi = 1;
  const e = rc();
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
var Er = {}, Pr = {}, Tr = {}, gi;
function Zs() {
  return gi || (gi = 1, Tr.isValid = function(t) {
    return !isNaN(t) && t >= 1 && t <= 40;
  }), Tr;
}
var Je = {}, mi;
function el() {
  if (mi) return Je;
  mi = 1;
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
var bi;
function Ft() {
  return bi || (bi = 1, (function(e) {
    const t = Zs(), r = el();
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
var yi;
function ic() {
  return yi || (yi = 1, (function(e) {
    const t = Ot(), r = Xs(), n = go(), i = Ft(), a = Zs(), o = 7973, s = t.getBCHDigit(o);
    function l(h, g, A) {
      for (let v = 1; v <= 40; v++)
        if (g <= e.getCapacity(v, A, h))
          return v;
    }
    function u(h, g) {
      return i.getCharCountIndicator(h, g) + 4;
    }
    function c(h, g) {
      let A = 0;
      return h.forEach(function(v) {
        const D = u(v.mode, g);
        A += D + v.getBitsLength();
      }), A;
    }
    function d(h, g) {
      for (let A = 1; A <= 40; A++)
        if (c(h, A) <= e.getCapacity(A, g, i.MIXED))
          return A;
    }
    e.from = function(g, A) {
      return a.isValid(g) ? parseInt(g, 10) : A;
    }, e.getCapacity = function(g, A, v) {
      if (!a.isValid(g))
        throw new Error("Invalid QR Code version");
      typeof v > "u" && (v = i.BYTE);
      const D = t.getSymbolTotalCodewords(g), T = r.getTotalCodewordsCount(g, A), w = (D - T) * 8;
      if (v === i.MIXED) return w;
      const P = w - u(v, g);
      switch (v) {
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
    }, e.getBestVersionForData = function(g, A) {
      let v;
      const D = n.from(A, n.M);
      if (Array.isArray(g)) {
        if (g.length > 1)
          return d(g, D);
        if (g.length === 0)
          return 1;
        v = g[0];
      } else
        v = g;
      return l(v.mode, v.getLength(), D);
    }, e.getEncodedBits = function(g) {
      if (!a.isValid(g) || g < 7)
        throw new Error("Invalid QR Code version");
      let A = g << 12;
      for (; t.getBCHDigit(A) - s >= 0; )
        A ^= o << t.getBCHDigit(A) - s;
      return g << 12 | A;
    };
  })(Er)), Er;
}
var Mr = {}, vi;
function sc() {
  if (vi) return Mr;
  vi = 1;
  const e = Ot(), t = 1335, r = 21522, n = e.getBCHDigit(t);
  return Mr.getEncodedBits = function(a, o) {
    const s = a.bit << 3 | o;
    let l = s << 10;
    for (; e.getBCHDigit(l) - n >= 0; )
      l ^= t << e.getBCHDigit(l) - n;
    return (s << 10 | l) ^ r;
  }, Mr;
}
var Lr = {}, Ir, wi;
function lc() {
  if (wi) return Ir;
  wi = 1;
  const e = Ft();
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
var Rr, ki;
function ac() {
  if (ki) return Rr;
  ki = 1;
  const e = Ft(), t = [
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
var Nr, _i;
function uc() {
  if (_i) return Nr;
  _i = 1;
  const e = Ft();
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
var Or, Ci;
function cc() {
  if (Ci) return Or;
  Ci = 1;
  const e = Ft(), t = Ot();
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
var Fr = { exports: {} }, Si;
function fc() {
  return Si || (Si = 1, (function(e) {
    var t = {
      single_source_shortest_paths: function(r, n, i) {
        var a = {}, o = {};
        o[n] = 0;
        var s = t.PriorityQueue.make();
        s.push(n, 0);
        for (var l, u, c, d, h, g, A, v, D; !s.empty(); ) {
          l = s.pop(), u = l.value, d = l.cost, h = r[u] || {};
          for (c in h)
            h.hasOwnProperty(c) && (g = h[c], A = d + g, v = o[c], D = typeof o[c] > "u", (D || v > A) && (o[c] = A, s.push(c, A), a[c] = u));
        }
        if (typeof i < "u" && typeof o[i] > "u") {
          var T = ["Could not find a path from ", n, " to ", i, "."].join("");
          throw new Error(T);
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
var xi;
function dc() {
  return xi || (xi = 1, (function(e) {
    const t = Ft(), r = lc(), n = ac(), i = uc(), a = cc(), o = el(), s = Ot(), l = fc();
    function u(T) {
      return unescape(encodeURIComponent(T)).length;
    }
    function c(T, w, P) {
      const _ = [];
      let F;
      for (; (F = T.exec(P)) !== null; )
        _.push({
          data: F[0],
          index: F.index,
          mode: w,
          length: F[0].length
        });
      return _;
    }
    function d(T) {
      const w = c(o.NUMERIC, t.NUMERIC, T), P = c(o.ALPHANUMERIC, t.ALPHANUMERIC, T);
      let _, F;
      return s.isKanjiModeEnabled() ? (_ = c(o.BYTE, t.BYTE, T), F = c(o.KANJI, t.KANJI, T)) : (_ = c(o.BYTE_KANJI, t.BYTE, T), F = []), w.concat(P, _, F).sort(function(m, N) {
        return m.index - N.index;
      }).map(function(m) {
        return {
          data: m.data,
          mode: m.mode,
          length: m.length
        };
      });
    }
    function h(T, w) {
      switch (w) {
        case t.NUMERIC:
          return r.getBitsLength(T);
        case t.ALPHANUMERIC:
          return n.getBitsLength(T);
        case t.KANJI:
          return a.getBitsLength(T);
        case t.BYTE:
          return i.getBitsLength(T);
      }
    }
    function g(T) {
      return T.reduce(function(w, P) {
        const _ = w.length - 1 >= 0 ? w[w.length - 1] : null;
        return _ && _.mode === P.mode ? (w[w.length - 1].data += P.data, w) : (w.push(P), w);
      }, []);
    }
    function A(T) {
      const w = [];
      for (let P = 0; P < T.length; P++) {
        const _ = T[P];
        switch (_.mode) {
          case t.NUMERIC:
            w.push([
              _,
              { data: _.data, mode: t.ALPHANUMERIC, length: _.length },
              { data: _.data, mode: t.BYTE, length: _.length }
            ]);
            break;
          case t.ALPHANUMERIC:
            w.push([
              _,
              { data: _.data, mode: t.BYTE, length: _.length }
            ]);
            break;
          case t.KANJI:
            w.push([
              _,
              { data: _.data, mode: t.BYTE, length: u(_.data) }
            ]);
            break;
          case t.BYTE:
            w.push([
              { data: _.data, mode: t.BYTE, length: u(_.data) }
            ]);
        }
      }
      return w;
    }
    function v(T, w) {
      const P = {}, _ = { start: {} };
      let F = ["start"];
      for (let y = 0; y < T.length; y++) {
        const m = T[y], N = [];
        for (let B = 0; B < m.length; B++) {
          const j = m[B], q = "" + y + B;
          N.push(q), P[q] = { node: j, lastCount: 0 }, _[q] = {};
          for (let V = 0; V < F.length; V++) {
            const H = F[V];
            P[H] && P[H].node.mode === j.mode ? (_[H][q] = h(P[H].lastCount + j.length, j.mode) - h(P[H].lastCount, j.mode), P[H].lastCount += j.length) : (P[H] && (P[H].lastCount = j.length), _[H][q] = h(j.length, j.mode) + 4 + t.getCharCountIndicator(j.mode, w));
          }
        }
        F = N;
      }
      for (let y = 0; y < F.length; y++)
        _[F[y]].end = 0;
      return { map: _, table: P };
    }
    function D(T, w) {
      let P;
      const _ = t.getBestModeForData(T);
      if (P = t.from(w, _), P !== t.BYTE && P.bit < _.bit)
        throw new Error('"' + T + '" cannot be encoded with mode ' + t.toString(P) + `.
 Suggested mode is: ` + t.toString(_));
      switch (P === t.KANJI && !s.isKanjiModeEnabled() && (P = t.BYTE), P) {
        case t.NUMERIC:
          return new r(T);
        case t.ALPHANUMERIC:
          return new n(T);
        case t.KANJI:
          return new a(T);
        case t.BYTE:
          return new i(T);
      }
    }
    e.fromArray = function(w) {
      return w.reduce(function(P, _) {
        return typeof _ == "string" ? P.push(D(_, null)) : _.data && P.push(D(_.data, _.mode)), P;
      }, []);
    }, e.fromString = function(w, P) {
      const _ = d(w, s.isKanjiModeEnabled()), F = A(_), y = v(F, P), m = l.find_path(y.map, "start", "end"), N = [];
      for (let B = 1; B < m.length - 1; B++)
        N.push(y.table[m[B]].node);
      return e.fromArray(g(N));
    }, e.rawSplit = function(w) {
      return e.fromArray(
        d(w, s.isKanjiModeEnabled())
      );
    };
  })(Lr)), Lr;
}
var Ai;
function pc() {
  if (Ai) return yr;
  Ai = 1;
  const e = Ot(), t = go(), r = Yu(), n = Xu(), i = Zu(), a = ec(), o = tc(), s = Xs(), l = oc(), u = ic(), c = sc(), d = Ft(), h = dc();
  function g(y, m) {
    const N = y.size, B = a.getPositions(m);
    for (let j = 0; j < B.length; j++) {
      const q = B[j][0], V = B[j][1];
      for (let H = -1; H <= 7; H++)
        if (!(q + H <= -1 || N <= q + H))
          for (let U = -1; U <= 7; U++)
            V + U <= -1 || N <= V + U || (H >= 0 && H <= 6 && (U === 0 || U === 6) || U >= 0 && U <= 6 && (H === 0 || H === 6) || H >= 2 && H <= 4 && U >= 2 && U <= 4 ? y.set(q + H, V + U, !0, !0) : y.set(q + H, V + U, !1, !0));
    }
  }
  function A(y) {
    const m = y.size;
    for (let N = 8; N < m - 8; N++) {
      const B = N % 2 === 0;
      y.set(N, 6, B, !0), y.set(6, N, B, !0);
    }
  }
  function v(y, m) {
    const N = i.getPositions(m);
    for (let B = 0; B < N.length; B++) {
      const j = N[B][0], q = N[B][1];
      for (let V = -2; V <= 2; V++)
        for (let H = -2; H <= 2; H++)
          V === -2 || V === 2 || H === -2 || H === 2 || V === 0 && H === 0 ? y.set(j + V, q + H, !0, !0) : y.set(j + V, q + H, !1, !0);
    }
  }
  function D(y, m) {
    const N = y.size, B = u.getEncodedBits(m);
    let j, q, V;
    for (let H = 0; H < 18; H++)
      j = Math.floor(H / 3), q = H % 3 + N - 8 - 3, V = (B >> H & 1) === 1, y.set(j, q, V, !0), y.set(q, j, V, !0);
  }
  function T(y, m, N) {
    const B = y.size, j = c.getEncodedBits(m, N);
    let q, V;
    for (q = 0; q < 15; q++)
      V = (j >> q & 1) === 1, q < 6 ? y.set(q, 8, V, !0) : q < 8 ? y.set(q + 1, 8, V, !0) : y.set(B - 15 + q, 8, V, !0), q < 8 ? y.set(8, B - q - 1, V, !0) : q < 9 ? y.set(8, 15 - q - 1 + 1, V, !0) : y.set(8, 15 - q - 1, V, !0);
    y.set(B - 8, 8, 1, !0);
  }
  function w(y, m) {
    const N = y.size;
    let B = -1, j = N - 1, q = 7, V = 0;
    for (let H = N - 1; H > 0; H -= 2)
      for (H === 6 && H--; ; ) {
        for (let U = 0; U < 2; U++)
          if (!y.isReserved(j, H - U)) {
            let M = !1;
            V < m.length && (M = (m[V] >>> q & 1) === 1), y.set(j, H - U, M), q--, q === -1 && (V++, q = 7);
          }
        if (j += B, j < 0 || N <= j) {
          j -= B, B = -B;
          break;
        }
      }
  }
  function P(y, m, N) {
    const B = new r();
    N.forEach(function(U) {
      B.put(U.mode.bit, 4), B.put(U.getLength(), d.getCharCountIndicator(U.mode, y)), U.write(B);
    });
    const j = e.getSymbolTotalCodewords(y), q = s.getTotalCodewordsCount(y, m), V = (j - q) * 8;
    for (B.getLengthInBits() + 4 <= V && B.put(0, 4); B.getLengthInBits() % 8 !== 0; )
      B.putBit(0);
    const H = (V - B.getLengthInBits()) / 8;
    for (let U = 0; U < H; U++)
      B.put(U % 2 ? 17 : 236, 8);
    return _(B, y, m);
  }
  function _(y, m, N) {
    const B = e.getSymbolTotalCodewords(m), j = s.getTotalCodewordsCount(m, N), q = B - j, V = s.getBlocksCount(m, N), H = B % V, U = V - H, M = Math.floor(B / V), $ = Math.floor(q / V), oe = $ + 1, ne = M - $, st = new l(ne);
    let pt = 0;
    const Re = new Array(V), Ae = new Array(V);
    let Bt = 0;
    const bn = new Uint8Array(y.buffer);
    for (let Oe = 0; Oe < V; Oe++) {
      const yn = Oe < U ? $ : oe;
      Re[Oe] = bn.slice(pt, pt + yn), Ae[Oe] = st.encode(Re[Oe]), pt += yn, Bt = Math.max(Bt, yn);
    }
    const jt = new Uint8Array(B);
    let ht = 0, Ee, Ne;
    for (Ee = 0; Ee < Bt; Ee++)
      for (Ne = 0; Ne < V; Ne++)
        Ee < Re[Ne].length && (jt[ht++] = Re[Ne][Ee]);
    for (Ee = 0; Ee < ne; Ee++)
      for (Ne = 0; Ne < V; Ne++)
        jt[ht++] = Ae[Ne][Ee];
    return jt;
  }
  function F(y, m, N, B) {
    let j;
    if (Array.isArray(y))
      j = h.fromArray(y);
    else if (typeof y == "string") {
      let M = m;
      if (!M) {
        const $ = h.rawSplit(y);
        M = u.getBestVersionForData($, N);
      }
      j = h.fromString(y, M || 40);
    } else
      throw new Error("Invalid data");
    const q = u.getBestVersionForData(j, N);
    if (!q)
      throw new Error("The amount of data is too big to be stored in a QR Code");
    if (!m)
      m = q;
    else if (m < q)
      throw new Error(
        `
The chosen QR Code version cannot contain this amount of data.
Minimum version required to store current data is: ` + q + `.
`
      );
    const V = P(m, N, j), H = e.getSymbolSize(m), U = new n(H);
    return g(U, m), A(U), v(U, m), T(U, N, 0), m >= 7 && D(U, m), w(U, V), isNaN(B) && (B = o.getBestMask(
      U,
      T.bind(null, U, N)
    )), o.applyMask(B, U), T(U, N, B), {
      modules: U,
      version: m,
      errorCorrectionLevel: N,
      maskPattern: B,
      segments: j
    };
  }
  return yr.create = function(m, N) {
    if (typeof m > "u" || m === "")
      throw new Error("No input text");
    let B = t.M, j, q;
    return typeof N < "u" && (B = t.from(N.errorCorrectionLevel, t.M), j = u.from(N.version), q = o.from(N.maskPattern), N.toSJISFunc && e.setToSJISFunction(N.toSJISFunc)), F(m, j, B, q);
  }, yr;
}
var Br = {}, Dr = {}, Ei;
function tl() {
  return Ei || (Ei = 1, (function(e) {
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
          let A = (h * u + g) * 4, v = a.color.light;
          if (h >= c && g >= c && h < u - c && g < u - c) {
            const D = Math.floor((h - c) / l), T = Math.floor((g - c) / l);
            v = d[s[D * o + T] ? 1 : 0];
          }
          n[A++] = v.r, n[A++] = v.g, n[A++] = v.b, n[A] = v.a;
        }
    };
  })(Dr)), Dr;
}
var Pi;
function hc() {
  return Pi || (Pi = 1, (function(e) {
    const t = tl();
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
var $r = {}, Ti;
function gc() {
  if (Ti) return $r;
  Ti = 1;
  const e = tl();
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
  return $r.render = function(a, o, s) {
    const l = e.getOptions(o), u = a.modules.size, c = a.modules.data, d = u + l.margin * 2, h = l.color.light.a ? "<path " + t(l.color.light, "fill") + ' d="M0 0h' + d + "v" + d + 'H0z"/>' : "", g = "<path " + t(l.color.dark, "stroke") + ' d="' + n(c, u, l.margin) + '"/>', A = 'viewBox="0 0 ' + d + " " + d + '"', D = '<svg xmlns="http://www.w3.org/2000/svg" ' + (l.width ? 'width="' + l.width + '" height="' + l.width + '" ' : "") + A + ' shape-rendering="crispEdges">' + h + g + `</svg>
`;
    return typeof s == "function" && s(null, D), D;
  }, $r;
}
var Mi;
function mc() {
  if (Mi) return $t;
  Mi = 1;
  const e = Qu(), t = pc(), r = hc(), n = gc();
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
      return d === 1 ? (s = o, o = l = void 0) : d === 2 && !o.getContext && (l = s, s = o, o = void 0), new Promise(function(g, A) {
        try {
          const v = t.create(s, l);
          g(a(v, o, l));
        } catch (v) {
          A(v);
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
  return $t.create = t.create, $t.toCanvas = i.bind(null, r.render), $t.toDataURL = i.bind(null, r.renderToDataURL), $t.toString = i.bind(null, function(a, o, s) {
    return n.render(a, s);
  }), $t;
}
var bc = mc();
const Li = /* @__PURE__ */ Ys(bc), mo = "product_qr:wo_label_layout:v1", Un = Object.freeze({
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
}), Yt = [
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
function Ct(e = {}) {
  e = e && typeof e == "object" ? e : {};
  const t = { ...Un };
  for (const r of Yt) {
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
    const t = e?.getItem(mo);
    if (!t) return null;
    const r = JSON.parse(t);
    return r && typeof r == "object" && !Array.isArray(r) ? Ct(r) : null;
  } catch {
    return null;
  }
}
function yc(e, t = globalThis.localStorage) {
  const r = Ct(e);
  if (!t) throw new Error("Penyimpanan browser tidak tersedia.");
  return t.setItem(mo, JSON.stringify(r)), r;
}
function vc(e = globalThis.localStorage) {
  if (!e) throw new Error("Penyimpanan browser tidak tersedia.");
  e.removeItem(mo);
}
const Ii = (e) => String(e ?? "").replace(/[&<>"']/g, (t) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[t]), wc = (e) => String(e ?? "").replace(/[_^~\\]/g, (t) => ({ _: "_5F", "^": "_5E", "~": "_7E", "\\": "_5C" })[t]), Ri = (e) => e ? String(e).slice(0, 10).split("-").reverse().map((t, r) => r === 2 ? t.slice(-2) : t).join("-") : "-", Le = (e, t) => Math.round(e * t.dpi / 25.4), kc = Object.freeze({
  sku: "SKU-TEST",
  item_name: "Dough Ropi Butter",
  item_name_prefix: "Dough",
  item_name_main: "Ropi Butter",
  manufacturing_date: "2026-10-20",
  expiry_date: "2026-11-20",
  label_count: 1,
  adonan_ke: 1,
  labels: [{ label_number: 1, adonan_ke: 1, qr_value: "TEST-NOT-A-PRODUCTION-SERIAL", serial_no: "TEST" }]
});
function nl(e) {
  const t = e.dpi / 203, r = (o) => Math.round(o * t), n = Le(e.margin, e), i = Math.round(e.fontSize * e.dpi / 72), a = Math.round(e.productFontSize * e.dpi / 72);
  return {
    unit: r,
    shift: n,
    size: i,
    productSize: a,
    column: Le(e.width, e),
    gap: Le(e.gap, e),
    height: Le(e.height, e),
    qrX: Math.max(0, r(68) + n + Le(e.leftX, e)),
    qrY: Math.max(0, r(32) + n + Le(e.leftY, e)),
    qrScale: Math.min(10, Math.max(2, Math.round(4 * e.qrSize / Un.qrSize * t))),
    textX: Math.max(0, r(192) + n + Le(e.rightX, e)),
    textY: Math.max(0, r(32) + n + Le(e.rightY, e)),
    sequenceX: Math.max(0, r(355) + n + Le(e.rightX, e)),
    sequenceY: Math.max(0, r(28) + n + Le(e.rightY, e)),
    fontRatio: i / 21,
    productRatio: a / 26
  };
}
function rl(e, t, r, n) {
  const i = [], a = Math.round(18 * n.fontRatio);
  r.showSequence && i.push({ x: n.sequenceX, y: n.sequenceY, size: a, text: String(t), sequence: !0, lines: 1 });
  let o = n.textY;
  const s = (l, u, c = 1) => i.push({ x: n.textX, y: o, size: u, text: l, lines: c });
  if (e.item_name_prefix) {
    const l = r.prefixFontSize > 0 ? Math.round(r.prefixFontSize * r.dpi / 72) : a;
    r.showPrefix && s(e.item_name_prefix, l), o += Math.round(20 * l / 18 * r.lineHeight), s(e.item_name_main || "", n.productSize, r.nameLines), o += Math.round((28 * n.productRatio + n.productSize * (r.nameLines - 1)) * r.lineHeight);
  } else
    s(e.item_name_main || e.item_name || "", n.productSize, r.nameLines), o += Math.round((30 * n.productRatio + n.productSize * (r.nameLines - 1)) * r.lineHeight);
  for (const [l, u] of [[r.showSku, `SKU : ${e.sku}`], [r.showMfg, `MFG : ${Ri(e.manufacturing_date)}`], [r.showExp, `EXP : ${Ri(e.expiry_date)}`]])
    l && s(u, n.size), o += Math.round(24 * n.fontRatio * r.lineHeight);
  return r.footer && s(r.footer, n.size), i;
}
function ol(e, t, r) {
  if (e == null || e === "") return null;
  const n = Math.round(18 * r.fontRatio), i = Math.round(n * 1.6), a = Math.round((i - n) / 2), o = Math.max(0, r.unit(8) + r.shift + Le(t.leftX, t));
  return {
    // Only the frame sits 5 dots right of the digits (requested placement).
    x: o,
    boxX: o + r.unit(5),
    y: Math.max(0, r.unit(28) - a + r.shift + Le(t.leftY, t)),
    w: i,
    h: i,
    border: Math.max(1, Math.round(n / 9)),
    size: n,
    pad: a,
    text: String(e)
  };
}
const qr = (e) => {
  const t = String(e ?? ""), r = wc(t);
  return `${r === t ? "" : "^FH_"}^FD${r}^FS
`;
};
function il(e, t) {
  const r = Math.max(1, t.column - t.textX - t.shift);
  return e.textWidth > 0 ? Math.max(1, Math.min(r, Le(e.textWidth, e))) : r;
}
function sl(e, t) {
  const r = Ct(t), n = nl(r), i = [], a = (o, s) => {
    const l = r.textWidth > 0 || o.lines > 1 || r.align !== "left", u = o.sequence ? `^FB${n.unit(40)},1,0,R` : l ? `^FB${il(r, n)},${o.lines},0,${{ left: "L", center: "C", right: "R" }[r.align]}` : "", c = (d) => `^FO${d},${o.y}^A0N,${o.size},${o.size}${u}${qr(o.text)}`;
    return c(s + o.x) + (r.bold ? c(s + o.x + n.unit(1)) : "");
  };
  for (let o = 0; o < e.labels.length; o += r.columns) {
    let s = `^XA
^PW${n.column * r.columns + n.gap * (r.columns - 1)}
^LL${n.height}
`;
    for (let l = 0; l < r.columns && o + l < e.labels.length; l++) {
      const u = e.labels[o + l], c = l * (n.column + n.gap), d = rl(e, u.label_number ?? o + l + 1, r, n);
      d[0]?.sequence && (s += a(d.shift(), c));
      const h = ol(u.adonan_ke ?? e.adonan_ke, r, n);
      if (h) {
        const g = c + h.x, A = (v) => `^FO${v},${h.y + h.pad}^A0N,${h.size},${h.size}^FB${h.w},1,0,C${qr(h.text)}`;
        s += `^FO${c + h.boxX},${h.y}^GB${h.w},${h.h},${h.border}^FS
` + A(g) + (r.bold ? A(g + n.unit(1)) : "");
      }
      s += `^FO${c + n.qrX},${n.qrY}^BQN,2,${n.qrScale}${qr(`QA,${u.qr_value}`)}`;
      for (const g of d) s += a(g, c);
    }
    i.push(s + `^XZ
`);
  }
  return i;
}
async function _c(e, t) {
  const r = Ct(t), n = nl(r), i = (s) => s * 25.4 / r.dpi, a = [];
  for (let s = 0; s < e.labels.length; s += r.columns) {
    const l = await Promise.all(e.labels.slice(s, s + r.columns).map(async (u, c) => {
      const d = { errorCorrectionLevel: "Q", margin: 0 }, h = await Li.toString(u.qr_value, { ...d, type: "svg" }), g = Li.create(u.qr_value, d).modules.size * n.qrScale, A = rl(e, u.label_number ?? s + c + 1, r, n).map((w) => {
        const P = w.sequence ? n.unit(40) : il(r, n), _ = w.lines > 1, F = _ || !w.sequence && r.textWidth > 0;
        return `<div class="label-text" style="left:${i(w.x)}mm;top:${i(w.y)}mm;font-size:${i(w.size)}mm;width:${i(P)}mm;text-align:${w.sequence ? "right" : r.align};font-weight:${r.bold ? 700 : 400};white-space:${_ ? "normal" : "nowrap"};${F ? `overflow-wrap:anywhere;max-height:${i(w.size * w.lines)}mm;overflow:hidden;` : ""}">${Ii(w.text)}</div>`;
      }).join(""), v = ol(u.adonan_ke ?? e.adonan_ke, r, n), D = (w) => `left:${i(w)}mm;top:${i(v.y)}mm;width:${i(v.w)}mm;height:${i(v.h)}mm`;
      return `<article>${v ? `<div class="adonan" style="${D(v.boxX)};border:${i(v.border)}mm solid #000"></div><div class="adonan" style="${D(v.x)};font-size:${i(v.size)}mm;font-weight:${r.bold ? 700 : 400}">${Ii(v.text)}</div>` : ""}<div class="qr" style="left:${i(n.qrX)}mm;top:${i(n.qrY)}mm;width:${i(g)}mm;height:${i(g)}mm">${h}</div>${A}</article>`;
    }));
    a.push(`<section>${l.join("")}</section>`);
  }
  const o = r.width * r.columns + r.gap * (r.columns - 1);
  return `<!doctype html><html lang="id"><head><meta charset="utf-8"><style>
    @page{size:${o}mm ${r.height}mm;margin:0}*{box-sizing:border-box}html,body{margin:0;padding:0;font-family:Arial,sans-serif;color:#000}
    section{width:${o}mm;height:${r.height}mm;display:flex;gap:${r.gap}mm;break-after:page;page-break-after:always}section:last-child{break-after:auto;page-break-after:auto}
    article{width:${r.width}mm;height:${r.height}mm;position:relative;overflow:hidden;flex-shrink:0;background:white}
    .qr,.label-text,.adonan{position:absolute}.adonan{display:flex;align-items:center;justify-content:center;font-family:Arial,sans-serif;line-height:1}.qr svg{width:100%;height:100%;display:block}.label-text{font-family:Arial,sans-serif;font-weight:700;line-height:1;white-space:nowrap}
    @media screen{body{background:#eee}section{margin-bottom:4px}}
    </style></head><body>${a.join("")}</body></html>`;
}
let Ni;
const Oi = {
  async print(e, t) {
    const r = await _c(e, t);
    Ni?.remove();
    const n = document.createElement("iframe");
    Ni = n, n.title = "Cetak label Work Order", n.setAttribute("aria-hidden", "true"), n.style.cssText = "position:fixed;left:-10000px;top:0;width:1px;height:1px;border:0";
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
async function Cc(e) {
  const t = Ct(e || nr());
  await bo(null, { layoutTest: !0, timeoutSeconds: t.qzTimeout });
  const [r, n] = await Promise.allSettled([Te.printers.find(), Te.printers.getDefault()]);
  if (r.status === "rejected") throw r.reason;
  return {
    printers: Array.isArray(r.value) ? r.value : r.value ? [r.value] : [],
    defaultPrinter: n.status === "fulfilled" && n.value || ""
  };
}
async function Sc(e) {
  const t = Ct(e), r = sl(kc, t);
  await bo(null, { layoutTest: !0, timeoutSeconds: t.qzTimeout });
  const n = t.printer || await Te.printers.getDefault();
  return await Te.print(Te.configs.create(n, { encoding: "UTF-8" }), r), n;
}
function ll(e, t) {
  try {
    const n = JSON.parse(e?._server_messages || "[]").map((i) => JSON.parse(i).message).filter(Boolean).join(" ");
    if (n) return n;
  } catch {
  }
  return t;
}
async function xc(e) {
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
  if (!t.ok) throw new Error(ll(r, "Gagal memuat nomor urut label yang sudah terbit"));
  return r.message || [];
}
function Ac(e, { layoutTest: t = !1 } = {}) {
  Te.security.setCertificatePromise(async () => {
    const r = t ? "/api/method/product_qr.wo_labels.qz_signing.layout_certificate" : `/api/method/product_qr.wo_labels.qz_signing.certificate?work_order=${encodeURIComponent(e)}`, n = await fetch(r, {
      cache: "no-store"
    });
    if (!n.ok) throw new Error("Sertifikat QZ Tray belum tersedia atau akses ditolak");
    return (await n.json()).message;
  }, { rejectOnFailure: !0 }), Te.security.setSignatureAlgorithm("SHA512"), Te.security.setSignaturePromise(async (r) => {
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
async function bo(e, { layoutTest: t = !1, timeoutSeconds: r = nr()?.qzTimeout } = {}) {
  const n = Ct({ qzTimeout: r }).qzTimeout;
  if (Ac(e, { layoutTest: t }), !Te.websocket.isActive()) {
    let i;
    try {
      await Promise.race([
        Te.websocket.connect({ retries: 0 }),
        new Promise((a, o) => {
          i = setTimeout(() => {
            try {
              Promise.resolve(Te.websocket.disconnect()).catch(() => {
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
async function Ec(e, t = 0) {
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
    throw new Error(ll(a, "Gagal mengambil data label"));
  const { message: o } = a;
  if (!o)
    throw new Error("Data label kosong");
  const s = o.labels?.length || 0;
  if (!s || s !== o.label_count) throw new Error("Jumlah label tidak sesuai");
  const l = nr();
  if (r.output === "browser")
    try {
      return await Oi.print(o, l), { browserPrint: !0 };
    } catch (u) {
      throw new Error(`Cetak browser gagal: ${u.message || u}. Gunakan cetak ulang nomor label yang sudah terbit; jangan tambah label lagi.`);
    }
  try {
    await bo(e, { timeoutSeconds: l?.qzTimeout });
    const u = l?.printer || await Te.printers.getDefault(), c = Te.configs.create(u, {
      encoding: "UTF-8"
    });
    return await Te.print(c, sl(o, l)), !0;
  } catch (u) {
    console.error("QZ Tray Error:", u);
    try {
      return await Oi.print(o, l), { browserFallback: !0 };
    } catch (c) {
      throw new Error(`Cetak gagal: ${u.message || u}. Cetak browser juga gagal: ${c.message || c}. Gunakan cetak ulang nomor label yang sudah terbit; jangan tambah label lagi.`);
    }
  }
}
const Pc = {
  key: 0,
  class: "label-print-note",
  role: "status"
}, Tc = { id: "label-print-title" }, Mc = ["disabled"], Lc = {
  key: 0,
  class: "label-count-field"
}, Ic = ["max"], Rc = {
  key: 1,
  class: "label-count-field"
}, Nc = {
  key: 0,
  class: "label-print-note"
}, Oc = {
  key: 2,
  class: "label-count-field"
}, Fc = { class: "label-print-note" }, Bc = { key: 0 }, Dc = {
  key: 0,
  class: "label-print-note"
}, $c = {
  key: 1,
  class: "label-print-note warning"
}, qc = {
  key: 2,
  class: "label-print-note"
}, Uc = ["value"], Hc = {
  key: 1,
  class: "label-range"
}, jc = ["value"], Vc = ["value"], zc = {
  key: 4,
  class: "label-print-note"
}, Kc = { key: 3 }, Wc = { key: 4 }, Jc = { key: 5 }, Gc = {
  key: 6,
  class: "label-print-note warning"
}, Qc = { class: "dlg-actions" }, Yc = ["disabled"], Xc = ["disabled"], Zc = { id: "wo-label-error-title" }, ef = { class: "error-dialog-message" }, tf = {
  key: 0,
  class: "error-dialog-details"
}, nf = { class: "dlg-actions" }, rf = {
  __name: "WorkOrderLabelDialogs",
  setup(e) {
    const t = /* @__PURE__ */ ue(null), r = /* @__PURE__ */ ue(null), n = /* @__PURE__ */ ue(null), i = /* @__PURE__ */ ue(null), a = /* @__PURE__ */ ue(""), o = /* @__PURE__ */ ue(!1), s = /* @__PURE__ */ ue("automatic"), l = /* @__PURE__ */ ue(1), u = /* @__PURE__ */ ue(0), c = /* @__PURE__ */ ue([]), d = /* @__PURE__ */ ue(""), h = /* @__PURE__ */ ue("single"), g = /* @__PURE__ */ ue(""), A = /* @__PURE__ */ ue(""), v = /* @__PURE__ */ ue(null), D = /* @__PURE__ */ ue(!1), T = /* @__PURE__ */ ue("");
    let w = 0;
    const P = Ze(() => u.value !== "" && Number.isInteger(Number(u.value)) && Number(u.value) >= 0), _ = Ze(() => l.value !== "" && Number.isInteger(Number(l.value)) && Number(l.value) >= 1 && Number(l.value) <= 1e4), F = Ze(() => Math.max(0, ...c.value.map((U) => Number(U.label_number) || 0))), y = Ze(() => h.value === "range" ? ti(c.value, g.value, A.value) : ti(c.value, d.value, d.value)), m = Ze(() => s.value === "automatic" ? me.labelCount + Number(u.value || 0) : s.value === "append" ? Number(l.value || 0) : y.value.length), N = Ze(() => s.value === "automatic" ? P.value && m.value >= 1 && m.value <= 1e4 : s.value === "append" ? c.value.length > 0 && _.value : m.value >= 1 && m.value <= 1e4);
    function B() {
      d.value = "", h.value = "single", g.value = "", A.value = "";
    }
    async function j(U = me.workOrder) {
      if (!U) return;
      a.value = "";
      const M = ++w;
      D.value = !0, T.value = "";
      try {
        const $ = await xc(U);
        M === w && U === me.workOrder && (c.value = $?.labels || [], v.value = $?.adonan_ke ?? null);
      } catch ($) {
        M === w && (c.value = [], v.value = null, T.value = $.message || "Gagal memuat nomor urut label.");
      } finally {
        M === w && (D.value = !1);
      }
    }
    tn(() => me.workOrder, (U) => {
      U && (s.value = "automatic", l.value = 1, u.value = 0, c.value = [], B(), v.value = null, j(U), Ln(() => {
        t.value?.open || t.value?.showModal();
      }));
    }), tn(i, (U) => {
      U && Ln(() => {
        r.value?.open || r.value?.showModal(), n.value?.focus();
      });
    });
    function q() {
      o.value || (t.value?.open && t.value.close(), w++, s.value = "automatic", l.value = 1, u.value = 0, c.value = [], B(), v.value = null, D.value = !1, T.value = "", me.workOrder = "", me.labelCount = 0, me.afterSave = "");
    }
    async function V(U = "printer") {
      const M = me.workOrder;
      if (!(!M || !N.value || o.value)) {
        o.value = !0;
        try {
          const $ = s.value === "automatic" ? { extra: Number(u.value) } : s.value === "append" ? { appendCount: Number(l.value) } : { labelNumbers: y.value };
          U === "browser" && ($.output = "browser");
          const oe = await Ec(M, $);
          oe?.browserFallback ? a.value = "Cetak QZ gagal. Dialog cetak browser dibuka; pilih printer atau Save as PDF. Periksa label yang mungkin sudah tercetak agar tidak rangkap." : oe?.browserPrint && (a.value = "Dialog cetak browser dibuka. Pilih printer atau Save as PDF; membatalkan dialog tidak menghapus label yang sudah terbit."), o.value = !1, q();
        } catch ($) {
          i.value = {
            title: U === "browser" ? "Cetak Browser Gagal" : "Cetak Label Gagal",
            message: $.message || "Gagal terhubung ke QZ Tray atau printer.",
            details: [],
            hint: /sign|sertifikat|certificate/i.test($.message || "") ? "Periksa sertifikat QZ Tray di komputer dan private key di server." : "Pastikan QZ Tray sedang berjalan di komputer Anda."
          };
        } finally {
          o.value = !1;
        }
      }
    }
    function H() {
      r.value?.open && r.value.close(), i.value = null;
    }
    return (U, M) => (Q(), Y(fe, null, [
      a.value ? (Q(), Y("p", Pc, Z(a.value), 1)) : Ge("", !0),
      k("dialog", {
        ref_key: "labelPrintDialog",
        ref: t,
        class: "dialog",
        "aria-labelledby": "label-print-title",
        onCancel: Sn(q, ["prevent"]),
        onClick: Sn(q, ["self"])
      }, [
        k("h3", Tc, Z(pe(me).afterSave ? `${pe(me).afterSave} tersimpan` : "Cetak label?"), 1),
        k("p", null, [
          M[8] || (M[8] = be("Cetak label untuk Work Order ", -1)),
          k("strong", null, Z(pe(me).workOrder), 1),
          M[9] || (M[9] = be("?", -1))
        ]),
        k("p", null, [
          M[10] || (M[10] = be("Usulan otomatis dari Good Qty dan UOM: ", -1)),
          k("strong", null, Z(pe(me).labelCount) + " label", 1)
        ]),
        M[30] || (M[30] = k("label", { for: "label-count-mode" }, "Cara menentukan jumlah", -1)),
        _e(k("select", {
          id: "label-count-mode",
          "onUpdate:modelValue": M[0] || (M[0] = ($) => s.value = $),
          class: "input label-dialog-select",
          style: { display: "block", width: "100%", "margin-top": "6px" }
        }, [
          M[11] || (M[11] = k("option", { value: "automatic" }, "Otomatis dari Good Qty", -1)),
          k("option", {
            value: "append",
            disabled: D.value || !c.value.length
          }, "Tambah setelah cetak awal", 8, Mc),
          M[12] || (M[12] = k("option", { value: "specific" }, "Pilih nomor urut label untuk cetak ulang", -1))
        ], 512), [
          [bt, s.value]
        ]),
        s.value === "automatic" ? (Q(), Y("div", Lc, [
          M[13] || (M[13] = k("label", { for: "extra-label-count" }, "Label tambahan", -1)),
          _e(k("input", {
            id: "extra-label-count",
            "onUpdate:modelValue": M[1] || (M[1] = ($) => u.value = $),
            type: "number",
            min: "0",
            max: Math.max(0, 1e4 - pe(me).labelCount),
            step: "1",
            inputmode: "numeric",
            class: "input",
            style: { display: "block", width: "100%", "margin-top": "6px" }
          }, null, 8, Ic), [
            [
              Pt,
              u.value,
              void 0,
              { number: !0 }
            ]
          ]),
          M[14] || (M[14] = k("p", { class: "label-print-note" }, "Jumlah awal mengikuti Good Qty.", -1))
        ])) : Ge("", !0),
        s.value === "append" ? (Q(), Y("div", Rc, [
          M[15] || (M[15] = k("label", { for: "append-label-count" }, "Jumlah label lanjutan", -1)),
          _e(k("input", {
            id: "append-label-count",
            "onUpdate:modelValue": M[2] || (M[2] = ($) => l.value = $),
            type: "number",
            min: "1",
            max: "10000",
            step: "1",
            inputmode: "numeric",
            class: "input",
            style: { display: "block", width: "100%", "margin-top": "6px" }
          }, null, 512), [
            [
              Pt,
              l.value,
              void 0,
              { number: !0 }
            ]
          ]),
          _.value ? (Q(), Y("p", Nc, "Nomor baru: #" + Z(F.value + 1) + "–#" + Z(F.value + Number(l.value)) + " · setelah label awal yang sudah terbit.", 1)) : Ge("", !0)
        ])) : Ge("", !0),
        s.value === "specific" ? (Q(), Y("div", Oc, [
          M[26] || (M[26] = k("label", { for: "label-number-select" }, "Nomor urut label yang dicetak ulang", -1)),
          k("p", Fc, [
            M[16] || (M[16] = be("Nomor urut terikat ke Work Order ini", -1)),
            v.value !== null ? (Q(), Y("span", Bc, " · Adonan ke " + Z(v.value), 1)) : Ge("", !0),
            M[17] || (M[17] = be(".", -1))
          ]),
          D.value ? (Q(), Y("p", Dc, "Memuat nomor urut label…")) : T.value ? (Q(), Y("p", $c, Z(T.value), 1)) : c.value.length ? (Q(), Y(fe, { key: 3 }, [
            _e(k("select", {
              id: "reprint-mode-select",
              "onUpdate:modelValue": M[3] || (M[3] = ($) => h.value = $),
              "aria-label": "Jenis cetak ulang",
              class: "input label-dialog-select",
              style: { display: "block", width: "100%", "margin-top": "6px" }
            }, [...M[18] || (M[18] = [
              k("option", { value: "single" }, "Satu nomor", -1),
              k("option", { value: "range" }, "Rentang nomor", -1)
            ])], 512), [
              [bt, h.value]
            ]),
            h.value === "single" ? _e((Q(), Y("select", {
              key: 0,
              id: "label-number-select",
              "onUpdate:modelValue": M[4] || (M[4] = ($) => d.value = $),
              class: "input label-dialog-select",
              style: { display: "block", width: "100%", "margin-top": "6px" }
            }, [
              M[19] || (M[19] = k("option", { value: "" }, "Pilih nomor label", -1)),
              (Q(!0), Y(fe, null, yt(c.value, ($) => (Q(), Y("option", {
                key: $.label_number,
                value: $.label_number
              }, " Label #" + Z($.label_number) + " · Adonan ke " + Z($.adonan_ke ?? "—"), 9, Uc))), 128))
            ], 512)), [
              [
                bt,
                d.value,
                void 0,
                { number: !0 }
              ]
            ]) : (Q(), Y("div", Hc, [
              k("label", null, [
                M[21] || (M[21] = be("Dari ", -1)),
                _e(k("select", {
                  id: "label-range-from",
                  "onUpdate:modelValue": M[5] || (M[5] = ($) => g.value = $),
                  class: "input label-dialog-select"
                }, [
                  M[20] || (M[20] = k("option", { value: "" }, "#", -1)),
                  (Q(!0), Y(fe, null, yt(c.value, ($) => (Q(), Y("option", {
                    key: $.label_number,
                    value: $.label_number
                  }, "#" + Z($.label_number), 9, jc))), 128))
                ], 512), [
                  [
                    bt,
                    g.value,
                    void 0,
                    { number: !0 }
                  ]
                ])
              ]),
              k("label", null, [
                M[23] || (M[23] = be("Sampai ", -1)),
                _e(k("select", {
                  id: "label-range-to",
                  "onUpdate:modelValue": M[6] || (M[6] = ($) => A.value = $),
                  class: "input label-dialog-select"
                }, [
                  M[22] || (M[22] = k("option", { value: "" }, "#", -1)),
                  (Q(!0), Y(fe, null, yt(c.value, ($) => (Q(), Y("option", {
                    key: $.label_number,
                    value: $.label_number
                  }, "#" + Z($.label_number), 9, Vc))), 128))
                ], 512), [
                  [
                    bt,
                    A.value,
                    void 0,
                    { number: !0 }
                  ]
                ])
              ])
            ]))
          ], 64)) : (Q(), Y("p", qc, "Belum ada label terbit untuk Work Order ini. Cetak otomatis dari Good Qty dahulu.")),
          y.value.length ? (Q(), Y("p", zc, [
            M[24] || (M[24] = be("Dipilih: ", -1)),
            k("strong", null, Z(y.value.length === 1 ? `Label #${y.value[0]}` : `Label #${y.value[0]}–#${y.value.at(-1)} (${y.value.length} label)`), 1),
            M[25] || (M[25] = be(". QR akan memakai mapping label yang sama.", -1))
          ])) : Ge("", !0)
        ])) : Ge("", !0),
        N.value && s.value === "automatic" ? (Q(), Y("p", Kc, [
          M[27] || (M[27] = be("Total cetak otomatis: ", -1)),
          k("strong", null, Z(m.value) + " label", 1)
        ])) : N.value && s.value === "append" ? (Q(), Y("p", Wc, [
          M[28] || (M[28] = be("Label lanjutan: ", -1)),
          k("strong", null, Z(m.value) + " label", 1)
        ])) : N.value && s.value === "specific" ? (Q(), Y("p", Jc, [
          M[29] || (M[29] = be("Total cetak ulang: ", -1)),
          k("strong", null, Z(m.value) + " label", 1)
        ])) : (Q(), Y("p", Gc, Z(s.value === "append" ? "Masukkan jumlah label lanjutan 1–10.000." : s.value === "specific" ? h.value === "range" ? "Pilih nomor awal dan akhir rentang label untuk dicetak ulang." : "Pilih satu nomor label untuk dicetak ulang." : "Masukkan jumlah ekstra bulat yang valid; batas 10.000 label per cetakan."), 1)),
        k("div", Qc, [
          k("button", {
            class: "btn",
            disabled: o.value,
            onClick: q
          }, "Nanti saja", 8, Yc),
          k("button", {
            class: "btn btn-primary",
            disabled: !N.value || o.value,
            onClick: M[7] || (M[7] = ($) => V())
          }, Z(o.value ? "Memproses…" : "Ya, Cetak Label"), 9, Xc)
        ])
      ], 544),
      k("dialog", {
        ref_key: "errorDialog",
        ref: r,
        class: "dialog error-dialog",
        "aria-labelledby": "wo-label-error-title",
        onCancel: Sn(H, ["prevent"]),
        onClick: Sn(H, ["self"])
      }, [
        M[31] || (M[31] = k("div", {
          class: "error-dialog-icon",
          "aria-hidden": "true"
        }, "!", -1)),
        k("h2", Zc, Z(i.value?.title), 1),
        k("p", ef, Z(i.value?.message), 1),
        i.value?.details?.length ? (Q(), Y("ul", tf, [
          (Q(!0), Y(fe, null, yt(i.value.details, ($) => (Q(), Y("li", { key: $ }, Z($), 1))), 128))
        ])) : Ge("", !0),
        k("div", nf, [
          k("button", {
            ref_key: "errorClose",
            ref: n,
            class: "btn btn-primary",
            onClick: H
          }, "Tutup", 512)
        ])
      ], 544)
    ], 64));
  }
}, of = /* @__PURE__ */ Qs(rf, [["__scopeId", "data-v-dea34345"]]);
function sf({ selected: e = "", printers: t = [], defaultPrinter: r = "", loaded: n = !1, lastPrinted: i = "" } = {}) {
  const a = e || r;
  return a ? n && t.includes(a) ? { name: a, detail: "Terdeteksi oleh QZ Tray. Status fisik online/offline belum diperiksa." } : i === a ? { name: a, detail: "Tujuan cetak TEST terakhir. Pengiriman job bukan konfirmasi hasil cetak fisik." } : { name: a, detail: n ? "Belum terdeteksi dalam daftar QZ Tray. Periksa printer atau muat ulang daftar." : "Nama tersimpan; belum diverifikasi oleh QZ Tray." } : {
    name: "Belum diketahui",
    detail: n ? "Printer default sistem belum tersedia. Pilih printer dari daftar." : "Klik Hubungkan / muat printer untuk melihat nama printer."
  };
}
const lf = {
  class: "panel settings-panel pqr-layout",
  "aria-labelledby": "pqr-layout-title"
}, af = { class: "panel-head" }, uf = { class: "p-ico" }, cf = { class: "panel-body" }, ff = { class: "settings-block" }, df = { class: "settings-control" }, pf = { class: "form-grid cols2" }, hf = { class: "field" }, gf = { value: "" }, mf = ["value"], bf = { class: "field" }, yf = { for: "pqr-qzTimeout" }, vf = ["min", "max", "step"], wf = {
  class: "settings-note",
  "data-label-printer-destination": "",
  "aria-live": "polite"
}, kf = { class: "pqr-layout-actions" }, _f = ["disabled"], Cf = ["disabled"], Sf = { class: "settings-block" }, xf = { class: "settings-control" }, Af = { class: "form-grid cols2" }, Ef = ["for"], Pf = ["id"], Tf = ["id", "onUpdate:modelValue", "min", "max", "step"], Mf = { class: "hint" }, Lf = { class: "settings-block" }, If = { class: "settings-control" }, Rf = { class: "form-grid cols2" }, Nf = ["for"], Of = ["id", "onUpdate:modelValue", "min", "max", "step"], Ff = { class: "settings-block" }, Bf = { class: "settings-control" }, Df = { class: "form-grid cols2" }, $f = ["for"], qf = ["id", "onUpdate:modelValue", "min", "max", "step"], Uf = { class: "field" }, Hf = { class: "field wide" }, jf = {
  key: 0,
  class: "settings-alerts"
}, Vf = { class: "panel-foot" }, zf = ["disabled"], Kf = ["disabled"], Wf = {
  __name: "LabelLayoutSettings",
  setup(e) {
    const t = /* @__PURE__ */ ue(nr() || { ...Un }), r = Ze(() => Ct(t.value)), n = /* @__PURE__ */ ue([]), i = /* @__PURE__ */ ue(""), a = /* @__PURE__ */ ue(!1), o = /* @__PURE__ */ ue(""), s = /* @__PURE__ */ ue(!1), l = /* @__PURE__ */ ue(""), u = /* @__PURE__ */ ue(!1), c = Ze(() => [...new Set([t.value.printer, ...n.value].filter(Boolean))]), d = Ze(() => sf({
      selected: t.value.printer,
      printers: n.value,
      defaultPrinter: i.value,
      loaded: a.value,
      lastPrinted: o.value
    })), h = Yt.filter((F) => ["leftX", "leftY", "qrSize"].includes(F.key)), g = Yt.filter((F) => ["rightX", "rightY", "textWidth", "prefixFontSize", "fontSize", "productFontSize", "lineHeight", "nameLines"].includes(F.key)), A = Yt.find((F) => F.key === "qzTimeout"), v = Yt.filter((F) => F !== A && !h.includes(F) && !g.includes(F));
    async function D(F, y) {
      if (!s.value) {
        s.value = !0, l.value = "", u.value = !1;
        try {
          await F(), l.value = y;
        } catch (m) {
          u.value = !0, l.value = m.message || "Pengaturan label gagal.";
        } finally {
          s.value = !1;
        }
      }
    }
    function T() {
      D(() => {
        t.value = yc(t.value);
      }, "Pengaturan label disimpan di perangkat ini.");
    }
    function w() {
      D(() => {
        vc(), t.value = { ...Un };
      }, "Kembali menggunakan default ZPL asli.");
    }
    function P() {
      D(async () => {
        try {
          const F = await Cc(r.value);
          n.value = F.printers, i.value = F.defaultPrinter, a.value = !0;
        } catch (F) {
          throw n.value = [], i.value = "", a.value = !1, o.value = "", F;
        }
      }, "Daftar printer diperbarui.");
    }
    function _() {
      D(async () => {
        const F = r.value, y = await Sc(F);
        o.value = y, F.printer || (i.value = y);
      }, "Label TEST dikirim. Tidak ada serial produksi yang dibuat.");
    }
    return ws(P), (F, y) => (Q(), Y("section", lf, [
      k("div", af, [
        k("span", uf, [
          xe(pe(Du), {
            size: 15,
            "stroke-width": 1.9
          })
        ]),
        y[5] || (y[5] = k("h2", { id: "pqr-layout-title" }, "Pengaturan layout label", -1)),
        y[6] || (y[6] = k("span", { class: "lead" }, "Khusus browser dan perangkat ini.", -1))
      ]),
      k("div", cf, [
        k("div", ff, [
          y[11] || (y[11] = k("div", { class: "settings-block-head" }, [
            k("h3", null, "Printer label"),
            k("p", { class: "hint" }, "Daftar printer dimuat otomatis saat pengaturan dibuka. Gunakan printer ZPL. Cetak TEST hanya untuk memeriksa layout dengan data contoh, tanpa Work Order.")
          ], -1)),
          k("div", df, [
            k("div", pf, [
              k("div", hf, [
                y[7] || (y[7] = k("label", { for: "pqr-printer" }, "Printer label", -1)),
                _e(k("select", {
                  id: "pqr-printer",
                  "onUpdate:modelValue": y[0] || (y[0] = (m) => t.value.printer = m),
                  class: "input"
                }, [
                  k("option", gf, Z(i.value ? `Default sistem — ${i.value}` : "Printer default sistem (nama belum dimuat)"), 1),
                  (Q(!0), Y(fe, null, yt(c.value, (m) => (Q(), Y("option", {
                    key: m,
                    value: m
                  }, Z(m) + Z(a.value && !n.value.includes(m) ? " — belum terdeteksi" : ""), 9, mf))), 128))
                ], 512), [
                  [bt, t.value.printer]
                ])
              ]),
              k("div", bf, [
                k("label", yf, Z(pe(A).label), 1),
                _e(k("input", {
                  id: "pqr-qzTimeout",
                  "onUpdate:modelValue": y[1] || (y[1] = (m) => t.value.qzTimeout = m),
                  class: "input",
                  type: "number",
                  min: pe(A).min,
                  max: pe(A).max,
                  step: pe(A).step,
                  "aria-describedby": "pqr-timeout-note"
                }, null, 8, vf), [
                  [
                    Pt,
                    t.value.qzTimeout,
                    void 0,
                    { number: !0 }
                  ]
                ])
              ])
            ]),
            y[10] || (y[10] = k("p", {
              id: "pqr-timeout-note",
              class: "hint"
            }, "1–60 detik; default 8. Batas menunggu koneksi QZ, bukan durasi cetak fisik. Simpan agar dipakai saat cetak Work Order. Jika koneksi gagal atau timeout, cetak Work Order beralih ke dialog cetak browser.", -1)),
            k("p", wf, [
              y[8] || (y[8] = be("Printer tujuan: ", -1)),
              k("strong", null, Z(d.value.name), 1),
              y[9] || (y[9] = k("br", null, null, -1)),
              be(Z(d.value.detail), 1)
            ]),
            k("div", kf, [
              k("button", {
                type: "button",
                class: "btn",
                disabled: s.value,
                onClick: P
              }, "Muat ulang printer", 8, _f),
              k("button", {
                type: "button",
                class: "btn",
                disabled: s.value,
                onClick: _
              }, "Cetak label TEST", 8, Cf)
            ])
          ])
        ]),
        k("div", Sf, [
          y[14] || (y[14] = k("div", { class: "settings-block-head" }, [
            k("h3", null, "Ukuran dan media"),
            k("p", { class: "hint" }, "Dasar ZPL asli: 2 kolom, ^PW800, ^LL160, 203 DPI. Pengaturan ini hanya untuk penyesuaian.")
          ], -1)),
          k("div", xf, [
            k("div", Af, [
              (Q(!0), Y(fe, null, yt(pe(v), (m) => (Q(), Y("div", {
                key: m.key,
                class: "field"
              }, [
                k("label", {
                  for: `pqr-${m.key}`
                }, Z(m.label), 9, Ef),
                m.key === "dpi" ? _e((Q(), Y("select", {
                  key: 0,
                  id: `pqr-${m.key}`,
                  "onUpdate:modelValue": y[2] || (y[2] = (N) => t.value.dpi = N),
                  class: "input"
                }, [...y[12] || (y[12] = [
                  k("option", { value: 203 }, "203", -1),
                  k("option", { value: 300 }, "300", -1),
                  k("option", { value: 600 }, "600", -1)
                ])], 8, Pf)), [
                  [
                    bt,
                    t.value.dpi,
                    void 0,
                    { number: !0 }
                  ]
                ]) : _e((Q(), Y("input", {
                  key: 1,
                  id: `pqr-${m.key}`,
                  "onUpdate:modelValue": (N) => t.value[m.key] = N,
                  class: "input",
                  type: "number",
                  min: m.min,
                  max: m.max,
                  step: m.step
                }, null, 8, Tf)), [
                  [
                    Pt,
                    t.value[m.key],
                    void 0,
                    { number: !0 }
                  ]
                ])
              ]))), 128))
            ]),
            k("p", Mf, "Lebar media: " + Z(r.value.width * r.value.columns + r.value.gap * (r.value.columns - 1)) + " mm.", 1),
            y[13] || (y[13] = k("p", { class: "settings-note" }, "Margin tambahan 0 mempertahankan posisi asli. Pengaturan konten kiri/kanan di bawah berlaku di dalam setiap label, bukan untuk membedakan dua kolom cetak. Samakan ukuran media dan sensor gap di printer.", -1))
          ])
        ]),
        k("div", Lf, [
          y[16] || (y[16] = k("div", { class: "settings-block-head" }, [
            k("h3", null, "Konten kiri — QR"),
            k("p", { class: "hint" }, 'Atur posisi dan ukuran QR tanpa menggeser konten kanan. QR selalu dicetak dengan identitas serial yang sama. Kotak "adonan ke" di kiri atas ikut bergeser bersama QR.')
          ], -1)),
          k("div", If, [
            k("div", Rf, [
              (Q(!0), Y(fe, null, yt(pe(h), (m) => (Q(), Y("div", {
                key: m.key,
                class: "field"
              }, [
                k("label", {
                  for: `pqr-${m.key}`
                }, Z(m.label), 9, Nf),
                _e(k("input", {
                  id: `pqr-${m.key}`,
                  "onUpdate:modelValue": (N) => t.value[m.key] = N,
                  class: "input",
                  type: "number",
                  min: m.min,
                  max: m.max,
                  step: m.step
                }, null, 8, Of), [
                  [
                    Pt,
                    t.value[m.key],
                    void 0,
                    { number: !0 }
                  ]
                ])
              ]))), 128))
            ]),
            y[15] || (y[15] = k("p", { class: "settings-note" }, "Geser 0 memakai posisi ZPL asli. Nilai negatif menggeser ke kiri/atas, positif ke kanan/bawah; posisi tidak melewati titik nol media. QR acuan 16 memakai magnifikasi 4 pada 203 DPI. Perbesar area label bila konten terpotong.", -1))
          ])
        ]),
        k("div", Ff, [
          y[21] || (y[21] = k("div", { class: "settings-block-head" }, [
            k("h3", null, "Konten kanan — Teks"),
            k("p", { class: "hint" }, "Atur blok prefix, nama produk, SKU, MFG, EXP, footer dan nomor urut secara terpisah dari QR. Nama produk tetap dicetak.")
          ], -1)),
          k("div", Bf, [
            k("div", Df, [
              (Q(!0), Y(fe, null, yt(pe(g), (m) => (Q(), Y("div", {
                key: m.key,
                class: "field"
              }, [
                k("label", {
                  for: `pqr-${m.key}`
                }, Z(m.label), 9, $f),
                _e(k("input", {
                  id: `pqr-${m.key}`,
                  "onUpdate:modelValue": (N) => t.value[m.key] = N,
                  class: "input",
                  type: "number",
                  min: m.min,
                  max: m.max,
                  step: m.step
                }, null, 8, qf), [
                  [
                    Pt,
                    t.value[m.key],
                    void 0,
                    { number: !0 }
                  ]
                ])
              ]))), 128)),
              k("div", Uf, [
                y[18] || (y[18] = k("label", { for: "pqr-align" }, "Perataan teks", -1)),
                _e(k("select", {
                  id: "pqr-align",
                  "onUpdate:modelValue": y[3] || (y[3] = (m) => t.value.align = m),
                  class: "input"
                }, [...y[17] || (y[17] = [
                  k("option", { value: "left" }, "Kiri", -1),
                  k("option", { value: "center" }, "Tengah", -1),
                  k("option", { value: "right" }, "Kanan", -1)
                ])], 512), [
                  [bt, t.value.align]
                ])
              ]),
              k("div", Hf, [
                y[19] || (y[19] = k("label", { for: "pqr-footer" }, "Footer", -1)),
                _e(k("input", {
                  id: "pqr-footer",
                  "onUpdate:modelValue": y[4] || (y[4] = (m) => t.value.footer = m),
                  maxlength: "100",
                  class: "input"
                }, null, 512), [
                  [Pt, t.value.footer]
                ])
              ])
            ]),
            y[20] || (y[20] = k("p", { class: "settings-note" }, "Lebar 0 mengikuti sisa area label; ukuran prefix 0 mengikuti font asli. Jumlah baris nama menambah ruang sebelum SKU/MFG/EXP. Geser teks juga memindahkan nomor urut, tanpa menggeser QR. Periksa hasil penyesuaian dengan cetak TEST.", -1))
          ])
        ])
      ]),
      l.value ? (Q(), Y("div", jf, [
        k("p", {
          role: "status",
          class: Wn(u.value ? "err" : "hint")
        }, Z(l.value), 3)
      ])) : Ge("", !0),
      k("div", Vf, [
        k("button", {
          type: "button",
          class: "btn btn-primary",
          disabled: s.value,
          onClick: T
        }, "Simpan layout label", 8, zf),
        k("button", {
          type: "button",
          class: "btn",
          disabled: s.value,
          onClick: w
        }, "Pulihkan default ZPL", 8, Kf)
      ])
    ]));
  }
}, Jf = "[data-product-qr-slot]";
let Fi = !1;
function Gf({ detail: e }) {
  const { workOrder: t, stage: r } = e || {};
  t?.id && (r === "prepacking" && !t.skipPrepacking || r === "postpacking" && t.skipPrepacking) && Gs(
    t.id,
    Js(t),
    r === "prepacking" ? "Pre-Packing" : "Post-Packing"
  );
}
function Qf() {
  if (Fi) return;
  Fi = !0;
  const e = document.createElement("link");
  e.rel = "stylesheet";
  const t = new URL(
    /* @vite-ignore */
    "./runtime.css",
    import.meta.url
  );
  t.search = new URL(import.meta.url).search, e.href = t.href, document.head.appendChild(e);
  const r = document.createElement("div");
  r.dataset.productQrDialogs = "", document.body.appendChild(r), Xo(of).mount(r);
  const n = /* @__PURE__ */ new Map();
  function i() {
    for (const [o, s] of n)
      o.isConnected || (s.app.unmount(), n.delete(o));
    for (const o of document.querySelectorAll(Jf)) {
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
        const d = /* @__PURE__ */ ls({ workOrder: c }), h = Xo({ render: () => s === "settings" ? pn(Wf) : pn(Hu, { workOrder: d.workOrder }) });
        u = { app: h, state: d, value: l }, n.set(o, u), h.mount(o);
      }
    }
  }
  new MutationObserver(i).observe(document.body, {
    childList: !0,
    subtree: !0,
    attributes: !0,
    attributeFilter: ["data-work-order", "data-product-qr-slot"]
  }), window.addEventListener("production:packing-saved", Gf), i();
}
export {
  Gf as onPackingSaved,
  Qf as start
};

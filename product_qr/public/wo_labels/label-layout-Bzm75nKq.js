function de(t) {
  return t && t.__esModule && Object.prototype.hasOwnProperty.call(t, "default") ? t.default : t;
}
function Fe(t) {
  if (Object.prototype.hasOwnProperty.call(t, "__esModule")) return t;
  var i = t.default;
  if (typeof i == "function") {
    var r = function e() {
      var n = !1;
      try {
        n = this instanceof e;
      } catch {
      }
      return n ? Reflect.construct(i, arguments, this.constructor) : i.apply(this, arguments);
    };
    r.prototype = i.prototype;
  } else r = {};
  return Object.defineProperty(r, "__esModule", { value: !0 }), Object.keys(t).forEach(function(e) {
    var n = Object.getOwnPropertyDescriptor(t, e);
    Object.defineProperty(r, e, n.get ? n : {
      enumerable: !0,
      get: function() {
        return t[e];
      }
    });
  }), r;
}
var x = {}, G, Mt;
function he() {
  return Mt || (Mt = 1, G = function() {
    return typeof Promise == "function" && Promise.prototype && Promise.prototype.then;
  }), G;
}
var Q = {}, D = {}, Rt;
function z() {
  if (Rt) return D;
  Rt = 1;
  let t;
  const i = [
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
  return D.getSymbolSize = function(e) {
    if (!e) throw new Error('"version" cannot be null or undefined');
    if (e < 1 || e > 40) throw new Error('"version" should be in range from 1 to 40');
    return e * 4 + 17;
  }, D.getSymbolTotalCodewords = function(e) {
    return i[e];
  }, D.getBCHDigit = function(r) {
    let e = 0;
    for (; r !== 0; )
      e++, r >>>= 1;
    return e;
  }, D.setToSJISFunction = function(e) {
    if (typeof e != "function")
      throw new Error('"toSJISFunc" is not a valid function.');
    t = e;
  }, D.isKanjiModeEnabled = function() {
    return typeof t < "u";
  }, D.toSJIS = function(e) {
    return t(e);
  }, D;
}
var W = {}, At;
function Et() {
  return At || (At = 1, (function(t) {
    t.L = { bit: 1 }, t.M = { bit: 0 }, t.Q = { bit: 3 }, t.H = { bit: 2 };
    function i(r) {
      if (typeof r != "string")
        throw new Error("Param is not a string");
      switch (r.toLowerCase()) {
        case "l":
        case "low":
          return t.L;
        case "m":
        case "medium":
          return t.M;
        case "q":
        case "quartile":
          return t.Q;
        case "h":
        case "high":
          return t.H;
        default:
          throw new Error("Unknown EC Level: " + r);
      }
    }
    t.isValid = function(e) {
      return e && typeof e.bit < "u" && e.bit >= 0 && e.bit < 4;
    }, t.from = function(e, n) {
      if (t.isValid(e))
        return e;
      try {
        return i(e);
      } catch {
        return n;
      }
    };
  })(W)), W;
}
var Z, Tt;
function ge() {
  if (Tt) return Z;
  Tt = 1;
  function t() {
    this.buffer = [], this.length = 0;
  }
  return t.prototype = {
    get: function(i) {
      const r = Math.floor(i / 8);
      return (this.buffer[r] >>> 7 - i % 8 & 1) === 1;
    },
    put: function(i, r) {
      for (let e = 0; e < r; e++)
        this.putBit((i >>> r - e - 1 & 1) === 1);
    },
    getLengthInBits: function() {
      return this.length;
    },
    putBit: function(i) {
      const r = Math.floor(this.length / 8);
      this.buffer.length <= r && this.buffer.push(0), i && (this.buffer[r] |= 128 >>> this.length % 8), this.length++;
    }
  }, Z = t, Z;
}
var tt, Pt;
function me() {
  if (Pt) return tt;
  Pt = 1;
  function t(i) {
    if (!i || i < 1)
      throw new Error("BitMatrix size must be defined and greater than 0");
    this.size = i, this.data = new Uint8Array(i * i), this.reservedBit = new Uint8Array(i * i);
  }
  return t.prototype.set = function(i, r, e, n) {
    const o = i * this.size + r;
    this.data[o] = e, n && (this.reservedBit[o] = !0);
  }, t.prototype.get = function(i, r) {
    return this.data[i * this.size + r];
  }, t.prototype.xor = function(i, r, e) {
    this.data[i * this.size + r] ^= e;
  }, t.prototype.isReserved = function(i, r) {
    return this.reservedBit[i * this.size + r];
  }, tt = t, tt;
}
var et = {}, Nt;
function pe() {
  return Nt || (Nt = 1, (function(t) {
    const i = z().getSymbolSize;
    t.getRowColCoords = function(e) {
      if (e === 1) return [];
      const n = Math.floor(e / 7) + 2, o = i(e), s = o === 145 ? 26 : Math.ceil((o - 13) / (2 * n - 2)) * 2, a = [o - 7];
      for (let u = 1; u < n - 1; u++)
        a[u] = a[u - 1] - s;
      return a.push(6), a.reverse();
    }, t.getPositions = function(e) {
      const n = [], o = t.getRowColCoords(e), s = o.length;
      for (let a = 0; a < s; a++)
        for (let u = 0; u < s; u++)
          a === 0 && u === 0 || // top-left
          a === 0 && u === s - 1 || // bottom-left
          a === s - 1 && u === 0 || n.push([o[a], o[u]]);
      return n;
    };
  })(et)), et;
}
var nt = {}, It;
function we() {
  if (It) return nt;
  It = 1;
  const t = z().getSymbolSize, i = 7;
  return nt.getPositions = function(e) {
    const n = t(e);
    return [
      // top-left
      [0, 0],
      // top-right
      [n - i, 0],
      // bottom-left
      [0, n - i]
    ];
  }, nt;
}
var rt = {}, Lt;
function ye() {
  return Lt || (Lt = 1, (function(t) {
    t.Patterns = {
      PATTERN000: 0,
      PATTERN001: 1,
      PATTERN010: 2,
      PATTERN011: 3,
      PATTERN100: 4,
      PATTERN101: 5,
      PATTERN110: 6,
      PATTERN111: 7
    };
    const i = {
      N1: 3,
      N2: 3,
      N3: 40,
      N4: 10
    };
    t.isValid = function(n) {
      return n != null && n !== "" && !isNaN(n) && n >= 0 && n <= 7;
    }, t.from = function(n) {
      return t.isValid(n) ? parseInt(n, 10) : void 0;
    }, t.getPenaltyN1 = function(n) {
      const o = n.size;
      let s = 0, a = 0, u = 0, l = null, c = null;
      for (let g = 0; g < o; g++) {
        a = u = 0, l = c = null;
        for (let m = 0; m < o; m++) {
          let f = n.get(g, m);
          f === l ? a++ : (a >= 5 && (s += i.N1 + (a - 5)), l = f, a = 1), f = n.get(m, g), f === c ? u++ : (u >= 5 && (s += i.N1 + (u - 5)), c = f, u = 1);
        }
        a >= 5 && (s += i.N1 + (a - 5)), u >= 5 && (s += i.N1 + (u - 5));
      }
      return s;
    }, t.getPenaltyN2 = function(n) {
      const o = n.size;
      let s = 0;
      for (let a = 0; a < o - 1; a++)
        for (let u = 0; u < o - 1; u++) {
          const l = n.get(a, u) + n.get(a, u + 1) + n.get(a + 1, u) + n.get(a + 1, u + 1);
          (l === 4 || l === 0) && s++;
        }
      return s * i.N2;
    }, t.getPenaltyN3 = function(n) {
      const o = n.size;
      let s = 0, a = 0, u = 0;
      for (let l = 0; l < o; l++) {
        a = u = 0;
        for (let c = 0; c < o; c++)
          a = a << 1 & 2047 | n.get(l, c), c >= 10 && (a === 1488 || a === 93) && s++, u = u << 1 & 2047 | n.get(c, l), c >= 10 && (u === 1488 || u === 93) && s++;
      }
      return s * i.N3;
    }, t.getPenaltyN4 = function(n) {
      let o = 0;
      const s = n.data.length;
      for (let u = 0; u < s; u++) o += n.data[u];
      return Math.abs(Math.ceil(o * 100 / s / 5) - 10) * i.N4;
    };
    function r(e, n, o) {
      switch (e) {
        case t.Patterns.PATTERN000:
          return (n + o) % 2 === 0;
        case t.Patterns.PATTERN001:
          return n % 2 === 0;
        case t.Patterns.PATTERN010:
          return o % 3 === 0;
        case t.Patterns.PATTERN011:
          return (n + o) % 3 === 0;
        case t.Patterns.PATTERN100:
          return (Math.floor(n / 2) + Math.floor(o / 3)) % 2 === 0;
        case t.Patterns.PATTERN101:
          return n * o % 2 + n * o % 3 === 0;
        case t.Patterns.PATTERN110:
          return (n * o % 2 + n * o % 3) % 2 === 0;
        case t.Patterns.PATTERN111:
          return (n * o % 3 + (n + o) % 2) % 2 === 0;
        default:
          throw new Error("bad maskPattern:" + e);
      }
    }
    t.applyMask = function(n, o) {
      const s = o.size;
      for (let a = 0; a < s; a++)
        for (let u = 0; u < s; u++)
          o.isReserved(u, a) || o.xor(u, a, r(n, u, a));
    }, t.getBestMask = function(n, o) {
      const s = Object.keys(t.Patterns).length;
      let a = 0, u = 1 / 0;
      for (let l = 0; l < s; l++) {
        o(l), t.applyMask(l, n);
        const c = t.getPenaltyN1(n) + t.getPenaltyN2(n) + t.getPenaltyN3(n) + t.getPenaltyN4(n);
        t.applyMask(l, n), c < u && (u = c, a = l);
      }
      return a;
    };
  })(rt)), rt;
}
var H = {}, qt;
function ee() {
  if (qt) return H;
  qt = 1;
  const t = Et(), i = [
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
  return H.getBlocksCount = function(n, o) {
    switch (o) {
      case t.L:
        return i[(n - 1) * 4 + 0];
      case t.M:
        return i[(n - 1) * 4 + 1];
      case t.Q:
        return i[(n - 1) * 4 + 2];
      case t.H:
        return i[(n - 1) * 4 + 3];
      default:
        return;
    }
  }, H.getTotalCodewordsCount = function(n, o) {
    switch (o) {
      case t.L:
        return r[(n - 1) * 4 + 0];
      case t.M:
        return r[(n - 1) * 4 + 1];
      case t.Q:
        return r[(n - 1) * 4 + 2];
      case t.H:
        return r[(n - 1) * 4 + 3];
      default:
        return;
    }
  }, H;
}
var ot = {}, O = {}, _t;
function Ee() {
  if (_t) return O;
  _t = 1;
  const t = new Uint8Array(512), i = new Uint8Array(256);
  return (function() {
    let e = 1;
    for (let n = 0; n < 255; n++)
      t[n] = e, i[e] = n, e <<= 1, e & 256 && (e ^= 285);
    for (let n = 255; n < 512; n++)
      t[n] = t[n - 255];
  })(), O.log = function(e) {
    if (e < 1) throw new Error("log(" + e + ")");
    return i[e];
  }, O.exp = function(e) {
    return t[e];
  }, O.mul = function(e, n) {
    return e === 0 || n === 0 ? 0 : t[i[e] + i[n]];
  }, O;
}
var kt;
function be() {
  return kt || (kt = 1, (function(t) {
    const i = Ee();
    t.mul = function(e, n) {
      const o = new Uint8Array(e.length + n.length - 1);
      for (let s = 0; s < e.length; s++)
        for (let a = 0; a < n.length; a++)
          o[s + a] ^= i.mul(e[s], n[a]);
      return o;
    }, t.mod = function(e, n) {
      let o = new Uint8Array(e);
      for (; o.length - n.length >= 0; ) {
        const s = o[0];
        for (let u = 0; u < n.length; u++)
          o[u] ^= i.mul(n[u], s);
        let a = 0;
        for (; a < o.length && o[a] === 0; ) a++;
        o = o.slice(a);
      }
      return o;
    }, t.generateECPolynomial = function(e) {
      let n = new Uint8Array([1]);
      for (let o = 0; o < e; o++)
        n = t.mul(n, new Uint8Array([1, i.exp(o)]));
      return n;
    };
  })(ot)), ot;
}
var it, vt;
function Ce() {
  if (vt) return it;
  vt = 1;
  const t = be();
  function i(r) {
    this.genPoly = void 0, this.degree = r, this.degree && this.initialize(this.degree);
  }
  return i.prototype.initialize = function(e) {
    this.degree = e, this.genPoly = t.generateECPolynomial(this.degree);
  }, i.prototype.encode = function(e) {
    if (!this.genPoly)
      throw new Error("Encoder not initialized");
    const n = new Uint8Array(e.length + this.degree);
    n.set(e);
    const o = t.mod(n, this.genPoly), s = this.degree - o.length;
    if (s > 0) {
      const a = new Uint8Array(this.degree);
      return a.set(o, s), a;
    }
    return o;
  }, it = i, it;
}
var st = {}, at = {}, ut = {}, Dt;
function ne() {
  return Dt || (Dt = 1, ut.isValid = function(i) {
    return !isNaN(i) && i >= 1 && i <= 40;
  }), ut;
}
var q = {}, zt;
function re() {
  if (zt) return q;
  zt = 1;
  const t = "[0-9]+", i = "[A-Z $%*+\\-./:]+";
  let r = "(?:[u3000-u303F]|[u3040-u309F]|[u30A0-u30FF]|[uFF00-uFFEF]|[u4E00-u9FAF]|[u2605-u2606]|[u2190-u2195]|u203B|[u2010u2015u2018u2019u2025u2026u201Cu201Du2225u2260]|[u0391-u0451]|[u00A7u00A8u00B1u00B4u00D7u00F7])+";
  r = r.replace(/u/g, "\\u");
  const e = "(?:(?![A-Z0-9 $%*+\\-./:]|" + r + `)(?:.|[\r
]))+`;
  q.KANJI = new RegExp(r, "g"), q.BYTE_KANJI = new RegExp("[^A-Z0-9 $%*+\\-./:]+", "g"), q.BYTE = new RegExp(e, "g"), q.NUMERIC = new RegExp(t, "g"), q.ALPHANUMERIC = new RegExp(i, "g");
  const n = new RegExp("^" + r + "$"), o = new RegExp("^" + t + "$"), s = new RegExp("^[A-Z0-9 $%*+\\-./:]+$");
  return q.testKanji = function(u) {
    return n.test(u);
  }, q.testNumeric = function(u) {
    return o.test(u);
  }, q.testAlphanumeric = function(u) {
    return s.test(u);
  }, q;
}
var Ft;
function F() {
  return Ft || (Ft = 1, (function(t) {
    const i = ne(), r = re();
    t.NUMERIC = {
      id: "Numeric",
      bit: 1,
      ccBits: [10, 12, 14]
    }, t.ALPHANUMERIC = {
      id: "Alphanumeric",
      bit: 2,
      ccBits: [9, 11, 13]
    }, t.BYTE = {
      id: "Byte",
      bit: 4,
      ccBits: [8, 16, 16]
    }, t.KANJI = {
      id: "Kanji",
      bit: 8,
      ccBits: [8, 10, 12]
    }, t.MIXED = {
      bit: -1
    }, t.getCharCountIndicator = function(o, s) {
      if (!o.ccBits) throw new Error("Invalid mode: " + o);
      if (!i.isValid(s))
        throw new Error("Invalid version: " + s);
      return s >= 1 && s < 10 ? o.ccBits[0] : s < 27 ? o.ccBits[1] : o.ccBits[2];
    }, t.getBestModeForData = function(o) {
      return r.testNumeric(o) ? t.NUMERIC : r.testAlphanumeric(o) ? t.ALPHANUMERIC : r.testKanji(o) ? t.KANJI : t.BYTE;
    }, t.toString = function(o) {
      if (o && o.id) return o.id;
      throw new Error("Invalid mode");
    }, t.isValid = function(o) {
      return o && o.bit && o.ccBits;
    };
    function e(n) {
      if (typeof n != "string")
        throw new Error("Param is not a string");
      switch (n.toLowerCase()) {
        case "numeric":
          return t.NUMERIC;
        case "alphanumeric":
          return t.ALPHANUMERIC;
        case "kanji":
          return t.KANJI;
        case "byte":
          return t.BYTE;
        default:
          throw new Error("Unknown mode: " + n);
      }
    }
    t.from = function(o, s) {
      if (t.isValid(o))
        return o;
      try {
        return e(o);
      } catch {
        return s;
      }
    };
  })(at)), at;
}
var Ut;
function Se() {
  return Ut || (Ut = 1, (function(t) {
    const i = z(), r = ee(), e = Et(), n = F(), o = ne(), s = 7973, a = i.getBCHDigit(s);
    function u(m, f, A) {
      for (let y = 1; y <= 40; y++)
        if (f <= t.getCapacity(y, A, m))
          return y;
    }
    function l(m, f) {
      return n.getCharCountIndicator(m, f) + 4;
    }
    function c(m, f) {
      let A = 0;
      return m.forEach(function(y) {
        const N = l(y.mode, f);
        A += N + y.getBitsLength();
      }), A;
    }
    function g(m, f) {
      for (let A = 1; A <= 40; A++)
        if (c(m, A) <= t.getCapacity(A, f, n.MIXED))
          return A;
    }
    t.from = function(f, A) {
      return o.isValid(f) ? parseInt(f, 10) : A;
    }, t.getCapacity = function(f, A, y) {
      if (!o.isValid(f))
        throw new Error("Invalid QR Code version");
      typeof y > "u" && (y = n.BYTE);
      const N = i.getSymbolTotalCodewords(f), S = r.getTotalCodewordsCount(f, A), P = (N - S) * 8;
      if (y === n.MIXED) return P;
      const R = P - l(y, f);
      switch (y) {
        case n.NUMERIC:
          return Math.floor(R / 10 * 3);
        case n.ALPHANUMERIC:
          return Math.floor(R / 11 * 2);
        case n.KANJI:
          return Math.floor(R / 13);
        case n.BYTE:
        default:
          return Math.floor(R / 8);
      }
    }, t.getBestVersionForData = function(f, A) {
      let y;
      const N = e.from(A, e.M);
      if (Array.isArray(f)) {
        if (f.length > 1)
          return g(f, N);
        if (f.length === 0)
          return 1;
        y = f[0];
      } else
        y = f;
      return u(y.mode, y.getLength(), N);
    }, t.getEncodedBits = function(f) {
      if (!o.isValid(f) || f < 7)
        throw new Error("Invalid QR Code version");
      let A = f << 12;
      for (; i.getBCHDigit(A) - a >= 0; )
        A ^= s << i.getBCHDigit(A) - a;
      return f << 12 | A;
    };
  })(st)), st;
}
var lt = {}, xt;
function Be() {
  if (xt) return lt;
  xt = 1;
  const t = z(), i = 1335, r = 21522, e = t.getBCHDigit(i);
  return lt.getEncodedBits = function(o, s) {
    const a = o.bit << 3 | s;
    let u = a << 10;
    for (; t.getBCHDigit(u) - e >= 0; )
      u ^= i << t.getBCHDigit(u) - e;
    return (a << 10 | u) ^ r;
  }, lt;
}
var ct = {}, ft, $t;
function Me() {
  if ($t) return ft;
  $t = 1;
  const t = F();
  function i(r) {
    this.mode = t.NUMERIC, this.data = r.toString();
  }
  return i.getBitsLength = function(e) {
    return 10 * Math.floor(e / 3) + (e % 3 ? e % 3 * 3 + 1 : 0);
  }, i.prototype.getLength = function() {
    return this.data.length;
  }, i.prototype.getBitsLength = function() {
    return i.getBitsLength(this.data.length);
  }, i.prototype.write = function(e) {
    let n, o, s;
    for (n = 0; n + 3 <= this.data.length; n += 3)
      o = this.data.substr(n, 3), s = parseInt(o, 10), e.put(s, 10);
    const a = this.data.length - n;
    a > 0 && (o = this.data.substr(n), s = parseInt(o, 10), e.put(s, a * 3 + 1));
  }, ft = i, ft;
}
var dt, Ot;
function Re() {
  if (Ot) return dt;
  Ot = 1;
  const t = F(), i = [
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
  function r(e) {
    this.mode = t.ALPHANUMERIC, this.data = e;
  }
  return r.getBitsLength = function(n) {
    return 11 * Math.floor(n / 2) + 6 * (n % 2);
  }, r.prototype.getLength = function() {
    return this.data.length;
  }, r.prototype.getBitsLength = function() {
    return r.getBitsLength(this.data.length);
  }, r.prototype.write = function(n) {
    let o;
    for (o = 0; o + 2 <= this.data.length; o += 2) {
      let s = i.indexOf(this.data[o]) * 45;
      s += i.indexOf(this.data[o + 1]), n.put(s, 11);
    }
    this.data.length % 2 && n.put(i.indexOf(this.data[o]), 6);
  }, dt = r, dt;
}
var ht, Yt;
function Ae() {
  if (Yt) return ht;
  Yt = 1;
  const t = F();
  function i(r) {
    this.mode = t.BYTE, typeof r == "string" ? this.data = new TextEncoder().encode(r) : this.data = new Uint8Array(r);
  }
  return i.getBitsLength = function(e) {
    return e * 8;
  }, i.prototype.getLength = function() {
    return this.data.length;
  }, i.prototype.getBitsLength = function() {
    return i.getBitsLength(this.data.length);
  }, i.prototype.write = function(r) {
    for (let e = 0, n = this.data.length; e < n; e++)
      r.put(this.data[e], 8);
  }, ht = i, ht;
}
var gt, Ht;
function Te() {
  if (Ht) return gt;
  Ht = 1;
  const t = F(), i = z();
  function r(e) {
    this.mode = t.KANJI, this.data = e;
  }
  return r.getBitsLength = function(n) {
    return n * 13;
  }, r.prototype.getLength = function() {
    return this.data.length;
  }, r.prototype.getBitsLength = function() {
    return r.getBitsLength(this.data.length);
  }, r.prototype.write = function(e) {
    let n;
    for (n = 0; n < this.data.length; n++) {
      let o = i.toSJIS(this.data[n]);
      if (o >= 33088 && o <= 40956)
        o -= 33088;
      else if (o >= 57408 && o <= 60351)
        o -= 49472;
      else
        throw new Error(
          "Invalid SJIS character: " + this.data[n] + `
Make sure your charset is UTF-8`
        );
      o = (o >>> 8 & 255) * 192 + (o & 255), e.put(o, 13);
    }
  }, gt = r, gt;
}
var mt = { exports: {} }, jt;
function Pe() {
  return jt || (jt = 1, (function(t) {
    var i = {
      single_source_shortest_paths: function(r, e, n) {
        var o = {}, s = {};
        s[e] = 0;
        var a = i.PriorityQueue.make();
        a.push(e, 0);
        for (var u, l, c, g, m, f, A, y, N; !a.empty(); ) {
          u = a.pop(), l = u.value, g = u.cost, m = r[l] || {};
          for (c in m)
            m.hasOwnProperty(c) && (f = m[c], A = g + f, y = s[c], N = typeof s[c] > "u", (N || y > A) && (s[c] = A, a.push(c, A), o[c] = l));
        }
        if (typeof n < "u" && typeof s[n] > "u") {
          var S = ["Could not find a path from ", e, " to ", n, "."].join("");
          throw new Error(S);
        }
        return o;
      },
      extract_shortest_path_from_predecessor_list: function(r, e) {
        for (var n = [], o = e; o; )
          n.push(o), r[o], o = r[o];
        return n.reverse(), n;
      },
      find_path: function(r, e, n) {
        var o = i.single_source_shortest_paths(r, e, n);
        return i.extract_shortest_path_from_predecessor_list(
          o,
          n
        );
      },
      /**
       * A very naive priority queue implementation.
       */
      PriorityQueue: {
        make: function(r) {
          var e = i.PriorityQueue, n = {}, o;
          r = r || {};
          for (o in e)
            e.hasOwnProperty(o) && (n[o] = e[o]);
          return n.queue = [], n.sorter = r.sorter || e.default_sorter, n;
        },
        default_sorter: function(r, e) {
          return r.cost - e.cost;
        },
        /**
         * Add a new item to the queue and ensure the highest priority element
         * is at the front of the queue.
         */
        push: function(r, e) {
          var n = { value: r, cost: e };
          this.queue.push(n), this.queue.sort(this.sorter);
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
    t.exports = i;
  })(mt)), mt.exports;
}
var Vt;
function Ne() {
  return Vt || (Vt = 1, (function(t) {
    const i = F(), r = Me(), e = Re(), n = Ae(), o = Te(), s = re(), a = z(), u = Pe();
    function l(S) {
      return unescape(encodeURIComponent(S)).length;
    }
    function c(S, P, R) {
      const B = [];
      let I;
      for (; (I = S.exec(R)) !== null; )
        B.push({
          data: I[0],
          index: I.index,
          mode: P,
          length: I[0].length
        });
      return B;
    }
    function g(S) {
      const P = c(s.NUMERIC, i.NUMERIC, S), R = c(s.ALPHANUMERIC, i.ALPHANUMERIC, S);
      let B, I;
      return a.isKanjiModeEnabled() ? (B = c(s.BYTE, i.BYTE, S), I = c(s.KANJI, i.KANJI, S)) : (B = c(s.BYTE_KANJI, i.BYTE, S), I = []), P.concat(R, B, I).sort(function(b, E) {
        return b.index - E.index;
      }).map(function(b) {
        return {
          data: b.data,
          mode: b.mode,
          length: b.length
        };
      });
    }
    function m(S, P) {
      switch (P) {
        case i.NUMERIC:
          return r.getBitsLength(S);
        case i.ALPHANUMERIC:
          return e.getBitsLength(S);
        case i.KANJI:
          return o.getBitsLength(S);
        case i.BYTE:
          return n.getBitsLength(S);
      }
    }
    function f(S) {
      return S.reduce(function(P, R) {
        const B = P.length - 1 >= 0 ? P[P.length - 1] : null;
        return B && B.mode === R.mode ? (P[P.length - 1].data += R.data, P) : (P.push(R), P);
      }, []);
    }
    function A(S) {
      const P = [];
      for (let R = 0; R < S.length; R++) {
        const B = S[R];
        switch (B.mode) {
          case i.NUMERIC:
            P.push([
              B,
              { data: B.data, mode: i.ALPHANUMERIC, length: B.length },
              { data: B.data, mode: i.BYTE, length: B.length }
            ]);
            break;
          case i.ALPHANUMERIC:
            P.push([
              B,
              { data: B.data, mode: i.BYTE, length: B.length }
            ]);
            break;
          case i.KANJI:
            P.push([
              B,
              { data: B.data, mode: i.BYTE, length: l(B.data) }
            ]);
            break;
          case i.BYTE:
            P.push([
              { data: B.data, mode: i.BYTE, length: l(B.data) }
            ]);
        }
      }
      return P;
    }
    function y(S, P) {
      const R = {}, B = { start: {} };
      let I = ["start"];
      for (let h = 0; h < S.length; h++) {
        const b = S[h], E = [];
        for (let d = 0; d < b.length; d++) {
          const M = b[d], p = "" + h + d;
          E.push(p), R[p] = { node: M, lastCount: 0 }, B[p] = {};
          for (let C = 0; C < I.length; C++) {
            const w = I[C];
            R[w] && R[w].node.mode === M.mode ? (B[w][p] = m(R[w].lastCount + M.length, M.mode) - m(R[w].lastCount, M.mode), R[w].lastCount += M.length) : (R[w] && (R[w].lastCount = M.length), B[w][p] = m(M.length, M.mode) + 4 + i.getCharCountIndicator(M.mode, P));
          }
        }
        I = E;
      }
      for (let h = 0; h < I.length; h++)
        B[I[h]].end = 0;
      return { map: B, table: R };
    }
    function N(S, P) {
      let R;
      const B = i.getBestModeForData(S);
      if (R = i.from(P, B), R !== i.BYTE && R.bit < B.bit)
        throw new Error('"' + S + '" cannot be encoded with mode ' + i.toString(R) + `.
 Suggested mode is: ` + i.toString(B));
      switch (R === i.KANJI && !a.isKanjiModeEnabled() && (R = i.BYTE), R) {
        case i.NUMERIC:
          return new r(S);
        case i.ALPHANUMERIC:
          return new e(S);
        case i.KANJI:
          return new o(S);
        case i.BYTE:
          return new n(S);
      }
    }
    t.fromArray = function(P) {
      return P.reduce(function(R, B) {
        return typeof B == "string" ? R.push(N(B, null)) : B.data && R.push(N(B.data, B.mode)), R;
      }, []);
    }, t.fromString = function(P, R) {
      const B = g(P, a.isKanjiModeEnabled()), I = A(B), h = y(I, R), b = u.find_path(h.map, "start", "end"), E = [];
      for (let d = 1; d < b.length - 1; d++)
        E.push(h.table[b[d]].node);
      return t.fromArray(f(E));
    }, t.rawSplit = function(P) {
      return t.fromArray(
        g(P, a.isKanjiModeEnabled())
      );
    };
  })(ct)), ct;
}
var Kt;
function Ie() {
  if (Kt) return Q;
  Kt = 1;
  const t = z(), i = Et(), r = ge(), e = me(), n = pe(), o = we(), s = ye(), a = ee(), u = Ce(), l = Se(), c = Be(), g = F(), m = Ne();
  function f(h, b) {
    const E = h.size, d = o.getPositions(b);
    for (let M = 0; M < d.length; M++) {
      const p = d[M][0], C = d[M][1];
      for (let w = -1; w <= 7; w++)
        if (!(p + w <= -1 || E <= p + w))
          for (let T = -1; T <= 7; T++)
            C + T <= -1 || E <= C + T || (w >= 0 && w <= 6 && (T === 0 || T === 6) || T >= 0 && T <= 6 && (w === 0 || w === 6) || w >= 2 && w <= 4 && T >= 2 && T <= 4 ? h.set(p + w, C + T, !0, !0) : h.set(p + w, C + T, !1, !0));
    }
  }
  function A(h) {
    const b = h.size;
    for (let E = 8; E < b - 8; E++) {
      const d = E % 2 === 0;
      h.set(E, 6, d, !0), h.set(6, E, d, !0);
    }
  }
  function y(h, b) {
    const E = n.getPositions(b);
    for (let d = 0; d < E.length; d++) {
      const M = E[d][0], p = E[d][1];
      for (let C = -2; C <= 2; C++)
        for (let w = -2; w <= 2; w++)
          C === -2 || C === 2 || w === -2 || w === 2 || C === 0 && w === 0 ? h.set(M + C, p + w, !0, !0) : h.set(M + C, p + w, !1, !0);
    }
  }
  function N(h, b) {
    const E = h.size, d = l.getEncodedBits(b);
    let M, p, C;
    for (let w = 0; w < 18; w++)
      M = Math.floor(w / 3), p = w % 3 + E - 8 - 3, C = (d >> w & 1) === 1, h.set(M, p, C, !0), h.set(p, M, C, !0);
  }
  function S(h, b, E) {
    const d = h.size, M = c.getEncodedBits(b, E);
    let p, C;
    for (p = 0; p < 15; p++)
      C = (M >> p & 1) === 1, p < 6 ? h.set(p, 8, C, !0) : p < 8 ? h.set(p + 1, 8, C, !0) : h.set(d - 15 + p, 8, C, !0), p < 8 ? h.set(8, d - p - 1, C, !0) : p < 9 ? h.set(8, 15 - p - 1 + 1, C, !0) : h.set(8, 15 - p - 1, C, !0);
    h.set(d - 8, 8, 1, !0);
  }
  function P(h, b) {
    const E = h.size;
    let d = -1, M = E - 1, p = 7, C = 0;
    for (let w = E - 1; w > 0; w -= 2)
      for (w === 6 && w--; ; ) {
        for (let T = 0; T < 2; T++)
          if (!h.isReserved(M, w - T)) {
            let v = !1;
            C < b.length && (v = (b[C] >>> p & 1) === 1), h.set(M, w - T, v), p--, p === -1 && (C++, p = 7);
          }
        if (M += d, M < 0 || E <= M) {
          M -= d, d = -d;
          break;
        }
      }
  }
  function R(h, b, E) {
    const d = new r();
    E.forEach(function(T) {
      d.put(T.mode.bit, 4), d.put(T.getLength(), g.getCharCountIndicator(T.mode, h)), T.write(d);
    });
    const M = t.getSymbolTotalCodewords(h), p = a.getTotalCodewordsCount(h, b), C = (M - p) * 8;
    for (d.getLengthInBits() + 4 <= C && d.put(0, 4); d.getLengthInBits() % 8 !== 0; )
      d.putBit(0);
    const w = (C - d.getLengthInBits()) / 8;
    for (let T = 0; T < w; T++)
      d.put(T % 2 ? 17 : 236, 8);
    return B(d, h, b);
  }
  function B(h, b, E) {
    const d = t.getSymbolTotalCodewords(b), M = a.getTotalCodewordsCount(b, E), p = d - M, C = a.getBlocksCount(b, E), w = d % C, T = C - w, v = Math.floor(d / C), $ = Math.floor(p / C), le = $ + 1, Ct = v - $, ce = new u(Ct);
    let V = 0;
    const Y = new Array(C), St = new Array(C);
    let K = 0;
    const fe = new Uint8Array(h.buffer);
    for (let U = 0; U < C; U++) {
      const X = U < T ? $ : le;
      Y[U] = fe.slice(V, V + X), St[U] = ce.encode(Y[U]), V += X, K = Math.max(K, X);
    }
    const J = new Uint8Array(d);
    let Bt = 0, _, k;
    for (_ = 0; _ < K; _++)
      for (k = 0; k < C; k++)
        _ < Y[k].length && (J[Bt++] = Y[k][_]);
    for (_ = 0; _ < Ct; _++)
      for (k = 0; k < C; k++)
        J[Bt++] = St[k][_];
    return J;
  }
  function I(h, b, E, d) {
    let M;
    if (Array.isArray(h))
      M = m.fromArray(h);
    else if (typeof h == "string") {
      let v = b;
      if (!v) {
        const $ = m.rawSplit(h);
        v = l.getBestVersionForData($, E);
      }
      M = m.fromString(h, v || 40);
    } else
      throw new Error("Invalid data");
    const p = l.getBestVersionForData(M, E);
    if (!p)
      throw new Error("The amount of data is too big to be stored in a QR Code");
    if (!b)
      b = p;
    else if (b < p)
      throw new Error(
        `
The chosen QR Code version cannot contain this amount of data.
Minimum version required to store current data is: ` + p + `.
`
      );
    const C = R(b, E, M), w = t.getSymbolSize(b), T = new e(w);
    return f(T, b), A(T), y(T, b), S(T, E, 0), b >= 7 && N(T, b), P(T, C), isNaN(d) && (d = s.getBestMask(
      T,
      S.bind(null, T, E)
    )), s.applyMask(d, T), S(T, E, d), {
      modules: T,
      version: b,
      errorCorrectionLevel: E,
      maskPattern: d,
      segments: M
    };
  }
  return Q.create = function(b, E) {
    if (typeof b > "u" || b === "")
      throw new Error("No input text");
    let d = i.M, M, p;
    return typeof E < "u" && (d = i.from(E.errorCorrectionLevel, i.M), M = l.from(E.version), p = s.from(E.maskPattern), E.toSJISFunc && t.setToSJISFunction(E.toSJISFunc)), I(b, M, d, p);
  }, Q;
}
var pt = {}, wt = {}, Jt;
function oe() {
  return Jt || (Jt = 1, (function(t) {
    function i(r) {
      if (typeof r == "number" && (r = r.toString()), typeof r != "string")
        throw new Error("Color should be defined as hex string");
      let e = r.slice().replace("#", "").split("");
      if (e.length < 3 || e.length === 5 || e.length > 8)
        throw new Error("Invalid hex color: " + r);
      (e.length === 3 || e.length === 4) && (e = Array.prototype.concat.apply([], e.map(function(o) {
        return [o, o];
      }))), e.length === 6 && e.push("F", "F");
      const n = parseInt(e.join(""), 16);
      return {
        r: n >> 24 & 255,
        g: n >> 16 & 255,
        b: n >> 8 & 255,
        a: n & 255,
        hex: "#" + e.slice(0, 6).join("")
      };
    }
    t.getOptions = function(e) {
      e || (e = {}), e.color || (e.color = {});
      const n = typeof e.margin > "u" || e.margin === null || e.margin < 0 ? 4 : e.margin, o = e.width && e.width >= 21 ? e.width : void 0, s = e.scale || 4;
      return {
        width: o,
        scale: o ? 4 : s,
        margin: n,
        color: {
          dark: i(e.color.dark || "#000000ff"),
          light: i(e.color.light || "#ffffffff")
        },
        type: e.type,
        rendererOpts: e.rendererOpts || {}
      };
    }, t.getScale = function(e, n) {
      return n.width && n.width >= e + n.margin * 2 ? n.width / (e + n.margin * 2) : n.scale;
    }, t.getImageWidth = function(e, n) {
      const o = t.getScale(e, n);
      return Math.floor((e + n.margin * 2) * o);
    }, t.qrToImageData = function(e, n, o) {
      const s = n.modules.size, a = n.modules.data, u = t.getScale(s, o), l = Math.floor((s + o.margin * 2) * u), c = o.margin * u, g = [o.color.light, o.color.dark];
      for (let m = 0; m < l; m++)
        for (let f = 0; f < l; f++) {
          let A = (m * l + f) * 4, y = o.color.light;
          if (m >= c && f >= c && m < l - c && f < l - c) {
            const N = Math.floor((m - c) / u), S = Math.floor((f - c) / u);
            y = g[a[N * s + S] ? 1 : 0];
          }
          e[A++] = y.r, e[A++] = y.g, e[A++] = y.b, e[A] = y.a;
        }
    };
  })(wt)), wt;
}
var Xt;
function Le() {
  return Xt || (Xt = 1, (function(t) {
    const i = oe();
    function r(n, o, s) {
      n.clearRect(0, 0, o.width, o.height), o.style || (o.style = {}), o.height = s, o.width = s, o.style.height = s + "px", o.style.width = s + "px";
    }
    function e() {
      try {
        return document.createElement("canvas");
      } catch {
        throw new Error("You need to specify a canvas element");
      }
    }
    t.render = function(o, s, a) {
      let u = a, l = s;
      typeof u > "u" && (!s || !s.getContext) && (u = s, s = void 0), s || (l = e()), u = i.getOptions(u);
      const c = i.getImageWidth(o.modules.size, u), g = l.getContext("2d"), m = g.createImageData(c, c);
      return i.qrToImageData(m.data, o, u), r(g, l, c), g.putImageData(m, 0, 0), l;
    }, t.renderToDataURL = function(o, s, a) {
      let u = a;
      typeof u > "u" && (!s || !s.getContext) && (u = s, s = void 0), u || (u = {});
      const l = t.render(o, s, u), c = u.type || "image/png", g = u.rendererOpts || {};
      return l.toDataURL(c, g.quality);
    };
  })(pt)), pt;
}
var yt = {}, Gt;
function qe() {
  if (Gt) return yt;
  Gt = 1;
  const t = oe();
  function i(n, o) {
    const s = n.a / 255, a = o + '="' + n.hex + '"';
    return s < 1 ? a + " " + o + '-opacity="' + s.toFixed(2).slice(1) + '"' : a;
  }
  function r(n, o, s) {
    let a = n + o;
    return typeof s < "u" && (a += " " + s), a;
  }
  function e(n, o, s) {
    let a = "", u = 0, l = !1, c = 0;
    for (let g = 0; g < n.length; g++) {
      const m = Math.floor(g % o), f = Math.floor(g / o);
      !m && !l && (l = !0), n[g] ? (c++, g > 0 && m > 0 && n[g - 1] || (a += l ? r("M", m + s, 0.5 + f + s) : r("m", u, 0), u = 0, l = !1), m + 1 < o && n[g + 1] || (a += r("h", c), c = 0)) : u++;
    }
    return a;
  }
  return yt.render = function(o, s, a) {
    const u = t.getOptions(s), l = o.modules.size, c = o.modules.data, g = l + u.margin * 2, m = u.color.light.a ? "<path " + i(u.color.light, "fill") + ' d="M0 0h' + g + "v" + g + 'H0z"/>' : "", f = "<path " + i(u.color.dark, "stroke") + ' d="' + e(c, l, u.margin) + '"/>', A = 'viewBox="0 0 ' + g + " " + g + '"', N = '<svg xmlns="http://www.w3.org/2000/svg" ' + (u.width ? 'width="' + u.width + '" height="' + u.width + '" ' : "") + A + ' shape-rendering="crispEdges">' + m + f + `</svg>
`;
    return typeof a == "function" && a(null, N), N;
  }, yt;
}
var Qt;
function _e() {
  if (Qt) return x;
  Qt = 1;
  const t = he(), i = Ie(), r = Le(), e = qe();
  function n(o, s, a, u, l) {
    const c = [].slice.call(arguments, 1), g = c.length, m = typeof c[g - 1] == "function";
    if (!m && !t())
      throw new Error("Callback required as last argument");
    if (m) {
      if (g < 2)
        throw new Error("Too few arguments provided");
      g === 2 ? (l = a, a = s, s = u = void 0) : g === 3 && (s.getContext && typeof l > "u" ? (l = u, u = void 0) : (l = u, u = a, a = s, s = void 0));
    } else {
      if (g < 1)
        throw new Error("Too few arguments provided");
      return g === 1 ? (a = s, s = u = void 0) : g === 2 && !s.getContext && (u = a, a = s, s = void 0), new Promise(function(f, A) {
        try {
          const y = i.create(a, u);
          f(o(y, s, u));
        } catch (y) {
          A(y);
        }
      });
    }
    try {
      const f = i.create(a, u);
      l(null, o(f, s, u));
    } catch (f) {
      l(f);
    }
  }
  return x.create = i.create, x.toCanvas = n.bind(null, r.render), x.toDataURL = n.bind(null, r.renderToDataURL), x.toString = n.bind(null, function(o, s, a) {
    return e.render(o, a);
  }), x;
}
var ke = _e();
const Wt = /* @__PURE__ */ de(ke), bt = "product_qr:wo_label_layout:v1", ie = Object.freeze({
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
  bold: !0
}), ve = [
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
function j(t = {}) {
  t = t && typeof t == "object" ? t : {};
  const i = { ...ie };
  for (const r of ve) {
    const e = Number(t[r.key]);
    t[r.key] !== "" && t[r.key] != null && Number.isFinite(e) && (i[r.key] = Math.min(r.max, Math.max(r.min, e)));
  }
  i.columns = Math.round(i.columns), i.nameLines = Math.round(i.nameLines), i.dpi = [203, 300, 600].includes(Number(t.dpi)) ? Number(t.dpi) : 203, i.align = ["left", "center", "right"].includes(t.align) ? t.align : "left";
  for (const r of ["showSku", "showMfg", "showExp", "showSequence", "showPrefix", "bold"])
    t[r] != null && (i[r] = t[r] === !0 || t[r] === 1);
  return i.printer = String(t.printer || "").slice(0, 200), i.footer = String(t.footer || "").slice(0, 100), i;
}
function Ue(t = globalThis.localStorage) {
  try {
    const i = t?.getItem(bt);
    if (!i) return null;
    const r = JSON.parse(i);
    return r && typeof r == "object" && !Array.isArray(r) ? j(r) : null;
  } catch {
    return null;
  }
}
function xe(t, i = globalThis.localStorage) {
  const r = j(t);
  if (!i) throw new Error("Penyimpanan browser tidak tersedia.");
  return i.setItem(bt, JSON.stringify(r)), r;
}
function $e(t = globalThis.localStorage) {
  if (!t) throw new Error("Penyimpanan browser tidak tersedia.");
  t.removeItem(bt);
}
const De = (t) => String(t ?? "").replace(/[&<>"']/g, (i) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[i]), ze = (t) => String(t ?? "").replace(/[_^~\\]/g, (i) => ({ _: "_5F", "^": "_5E", "~": "_7E", "\\": "_5C" })[i]), Zt = (t) => t ? String(t).slice(0, 10).split("-").reverse().map((i, r) => r === 2 ? i.slice(-2) : i).join("-") : "-", L = (t, i) => Math.round(t * i.dpi / 25.4), Oe = Object.freeze({
  sku: "SKU-TEST",
  item_name: "Dough Ropi Butter",
  item_name_prefix: "Dough",
  item_name_main: "Ropi Butter",
  manufacturing_date: "2026-10-20",
  expiry_date: "2026-11-20",
  label_count: 1,
  labels: [{ qr_value: "TEST-NOT-A-PRODUCTION-SERIAL", serial_no: "TEST" }]
});
function se(t) {
  const i = t.dpi / 203, r = (s) => Math.round(s * i), e = L(t.margin, t), n = Math.round(t.fontSize * t.dpi / 72), o = Math.round(t.productFontSize * t.dpi / 72);
  return {
    unit: r,
    shift: e,
    size: n,
    productSize: o,
    column: L(t.width, t),
    gap: L(t.gap, t),
    height: L(t.height, t),
    qrX: Math.max(0, r(68) + e + L(t.leftX, t)),
    qrY: Math.max(0, r(32) + e + L(t.leftY, t)),
    qrScale: Math.min(10, Math.max(2, Math.round(4 * t.qrSize / ie.qrSize * i))),
    textX: Math.max(0, r(192) + e + L(t.rightX, t)),
    textY: Math.max(0, r(32) + e + L(t.rightY, t)),
    sequenceX: Math.max(0, r(355) + e + L(t.rightX, t)),
    sequenceY: Math.max(0, r(28) + e + L(t.rightY, t)),
    fontRatio: n / 21,
    productRatio: o / 26
  };
}
function ae(t, i, r, e) {
  const n = [], o = Math.round(18 * e.fontRatio);
  r.showSequence && n.push({ x: e.sequenceX, y: e.sequenceY, size: o, text: String(i), sequence: !0, lines: 1 });
  let s = e.textY;
  const a = (u, l, c = 1) => n.push({ x: e.textX, y: s, size: l, text: u, lines: c });
  if (t.item_name_prefix) {
    const u = r.prefixFontSize > 0 ? Math.round(r.prefixFontSize * r.dpi / 72) : o;
    r.showPrefix && a(t.item_name_prefix, u), s += Math.round(20 * u / 18 * r.lineHeight), a(t.item_name_main || "", e.productSize, r.nameLines), s += Math.round((28 * e.productRatio + e.productSize * (r.nameLines - 1)) * r.lineHeight);
  } else
    a(t.item_name_main || t.item_name || "", e.productSize, r.nameLines), s += Math.round((30 * e.productRatio + e.productSize * (r.nameLines - 1)) * r.lineHeight);
  for (const [u, l] of [[r.showSku, `SKU : ${t.sku}`], [r.showMfg, `MFG : ${Zt(t.manufacturing_date)}`], [r.showExp, `EXP : ${Zt(t.expiry_date)}`]])
    u && a(l, e.size), s += Math.round(24 * e.fontRatio * r.lineHeight);
  return r.footer && a(r.footer, e.size), n;
}
const te = (t) => {
  const i = String(t ?? ""), r = ze(i);
  return `${r === i ? "" : "^FH_"}^FD${r}^FS
`;
};
function ue(t, i) {
  const r = Math.max(1, i.column - i.textX - i.shift);
  return t.textWidth > 0 ? Math.max(1, Math.min(r, L(t.textWidth, t))) : r;
}
function Ye(t, i) {
  const r = j(i), e = se(r), n = [], o = (s, a) => {
    const u = r.textWidth > 0 || s.lines > 1 || r.align !== "left", l = s.sequence ? `^FB${e.unit(40)},1,0,R` : u ? `^FB${ue(r, e)},${s.lines},0,${{ left: "L", center: "C", right: "R" }[r.align]}` : "", c = (g) => `^FO${g},${s.y}^A0N,${s.size},${s.size}${l}${te(s.text)}`;
    return c(a + s.x) + (r.bold ? c(a + s.x + e.unit(1)) : "");
  };
  for (let s = 0; s < t.labels.length; s += r.columns) {
    let a = `^XA
^PW${e.column * r.columns + e.gap * (r.columns - 1)}
^LL${e.height}
`;
    for (let u = 0; u < r.columns && s + u < t.labels.length; u++) {
      const l = t.labels[s + u], c = u * (e.column + e.gap), g = ae(t, s + u + 1, r, e);
      g[0]?.sequence && (a += o(g.shift(), c)), a += `^FO${c + e.qrX},${e.qrY}^BQN,2,${e.qrScale}${te(`QA,${l.qr_value}`)}`;
      for (const m of g) a += o(m, c);
    }
    n.push(a + `^XZ
`);
  }
  return n;
}
async function He(t, i) {
  const r = j(i), e = se(r), n = (a) => a * 25.4 / r.dpi, o = [];
  for (let a = 0; a < t.labels.length; a += r.columns) {
    const u = await Promise.all(t.labels.slice(a, a + r.columns).map(async (l, c) => {
      const g = { errorCorrectionLevel: "Q", margin: 0 }, m = await Wt.toString(l.qr_value, { ...g, type: "svg" }), f = Wt.create(l.qr_value, g).modules.size * e.qrScale, A = ae(t, a + c + 1, r, e).map((y) => {
        const N = y.sequence ? e.unit(40) : ue(r, e), S = y.lines > 1, P = S || !y.sequence && r.textWidth > 0;
        return `<div class="label-text" style="left:${n(y.x)}mm;top:${n(y.y)}mm;font-size:${n(y.size)}mm;width:${n(N)}mm;text-align:${y.sequence ? "right" : r.align};font-weight:${r.bold ? 700 : 400};white-space:${S ? "normal" : "nowrap"};${P ? `overflow-wrap:anywhere;max-height:${n(y.size * y.lines)}mm;overflow:hidden;` : ""}">${De(y.text)}</div>`;
      }).join("");
      return `<article><div class="qr" style="left:${n(e.qrX)}mm;top:${n(e.qrY)}mm;width:${n(f)}mm;height:${n(f)}mm">${m}</div>${A}</article>`;
    }));
    o.push(`<section>${u.join("")}</section>`);
  }
  const s = r.width * r.columns + r.gap * (r.columns - 1);
  return `<!doctype html><html lang="id"><head><meta charset="utf-8"><style>
    @page{size:${s}mm ${r.height}mm;margin:0}*{box-sizing:border-box}html,body{margin:0;padding:0;font-family:Arial,sans-serif;color:#000}
    section{width:${s}mm;height:${r.height}mm;display:flex;gap:${r.gap}mm;break-after:page;page-break-after:always}section:last-child{break-after:auto;page-break-after:auto}
    article{width:${r.width}mm;height:${r.height}mm;position:relative;overflow:hidden;flex-shrink:0;background:white}
    .qr,.label-text{position:absolute}.qr svg{width:100%;height:100%;display:block}.label-text{font-family:Arial,sans-serif;font-weight:700;line-height:1;white-space:nowrap}
    @media screen{body{background:#eee}section{margin-bottom:4px}}
    </style></head><body>${o.join("")}</body></html>`;
}
export {
  ie as L,
  Oe as S,
  de as a,
  Ye as b,
  ve as c,
  He as d,
  Fe as g,
  Ue as l,
  j as n,
  $e as r,
  xe as s
};

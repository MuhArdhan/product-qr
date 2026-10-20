function de(t) {
  return t && t.__esModule && Object.prototype.hasOwnProperty.call(t, "default") ? t.default : t;
}
function Fe(t) {
  if (Object.prototype.hasOwnProperty.call(t, "__esModule")) return t;
  var o = t.default;
  if (typeof o == "function") {
    var r = function e() {
      var n = !1;
      try {
        n = this instanceof e;
      } catch {
      }
      return n ? Reflect.construct(o, arguments, this.constructor) : o.apply(this, arguments);
    };
    r.prototype = o.prototype;
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
var x = {}, X, Mt;
function he() {
  return Mt || (Mt = 1, X = function() {
    return typeof Promise == "function" && Promise.prototype && Promise.prototype.then;
  }), X;
}
var G = {}, z = {}, Rt;
function D() {
  if (Rt) return z;
  Rt = 1;
  let t;
  const o = [
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
  return z.getSymbolSize = function(e) {
    if (!e) throw new Error('"version" cannot be null or undefined');
    if (e < 1 || e > 40) throw new Error('"version" should be in range from 1 to 40');
    return e * 4 + 17;
  }, z.getSymbolTotalCodewords = function(e) {
    return o[e];
  }, z.getBCHDigit = function(r) {
    let e = 0;
    for (; r !== 0; )
      e++, r >>>= 1;
    return e;
  }, z.setToSJISFunction = function(e) {
    if (typeof e != "function")
      throw new Error('"toSJISFunc" is not a valid function.');
    t = e;
  }, z.isKanjiModeEnabled = function() {
    return typeof t < "u";
  }, z.toSJIS = function(e) {
    return t(e);
  }, z;
}
var W = {}, At;
function bt() {
  return At || (At = 1, (function(t) {
    t.L = { bit: 1 }, t.M = { bit: 0 }, t.Q = { bit: 3 }, t.H = { bit: 2 };
    function o(r) {
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
        return o(e);
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
    get: function(o) {
      const r = Math.floor(o / 8);
      return (this.buffer[r] >>> 7 - o % 8 & 1) === 1;
    },
    put: function(o, r) {
      for (let e = 0; e < r; e++)
        this.putBit((o >>> r - e - 1 & 1) === 1);
    },
    getLengthInBits: function() {
      return this.length;
    },
    putBit: function(o) {
      const r = Math.floor(this.length / 8);
      this.buffer.length <= r && this.buffer.push(0), o && (this.buffer[r] |= 128 >>> this.length % 8), this.length++;
    }
  }, Z = t, Z;
}
var tt, Pt;
function me() {
  if (Pt) return tt;
  Pt = 1;
  function t(o) {
    if (!o || o < 1)
      throw new Error("BitMatrix size must be defined and greater than 0");
    this.size = o, this.data = new Uint8Array(o * o), this.reservedBit = new Uint8Array(o * o);
  }
  return t.prototype.set = function(o, r, e, n) {
    const i = o * this.size + r;
    this.data[i] = e, n && (this.reservedBit[i] = !0);
  }, t.prototype.get = function(o, r) {
    return this.data[o * this.size + r];
  }, t.prototype.xor = function(o, r, e) {
    this.data[o * this.size + r] ^= e;
  }, t.prototype.isReserved = function(o, r) {
    return this.reservedBit[o * this.size + r];
  }, tt = t, tt;
}
var et = {}, Nt;
function pe() {
  return Nt || (Nt = 1, (function(t) {
    const o = D().getSymbolSize;
    t.getRowColCoords = function(e) {
      if (e === 1) return [];
      const n = Math.floor(e / 7) + 2, i = o(e), s = i === 145 ? 26 : Math.ceil((i - 13) / (2 * n - 2)) * 2, a = [i - 7];
      for (let u = 1; u < n - 1; u++)
        a[u] = a[u - 1] - s;
      return a.push(6), a.reverse();
    }, t.getPositions = function(e) {
      const n = [], i = t.getRowColCoords(e), s = i.length;
      for (let a = 0; a < s; a++)
        for (let u = 0; u < s; u++)
          a === 0 && u === 0 || // top-left
          a === 0 && u === s - 1 || // bottom-left
          a === s - 1 && u === 0 || n.push([i[a], i[u]]);
      return n;
    };
  })(et)), et;
}
var nt = {}, It;
function we() {
  if (It) return nt;
  It = 1;
  const t = D().getSymbolSize, o = 7;
  return nt.getPositions = function(e) {
    const n = t(e);
    return [
      // top-left
      [0, 0],
      // top-right
      [n - o, 0],
      // bottom-left
      [0, n - o]
    ];
  }, nt;
}
var rt = {}, qt;
function ye() {
  return qt || (qt = 1, (function(t) {
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
    const o = {
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
      const i = n.size;
      let s = 0, a = 0, u = 0, l = null, c = null;
      for (let g = 0; g < i; g++) {
        a = u = 0, l = c = null;
        for (let m = 0; m < i; m++) {
          let f = n.get(g, m);
          f === l ? a++ : (a >= 5 && (s += o.N1 + (a - 5)), l = f, a = 1), f = n.get(m, g), f === c ? u++ : (u >= 5 && (s += o.N1 + (u - 5)), c = f, u = 1);
        }
        a >= 5 && (s += o.N1 + (a - 5)), u >= 5 && (s += o.N1 + (u - 5));
      }
      return s;
    }, t.getPenaltyN2 = function(n) {
      const i = n.size;
      let s = 0;
      for (let a = 0; a < i - 1; a++)
        for (let u = 0; u < i - 1; u++) {
          const l = n.get(a, u) + n.get(a, u + 1) + n.get(a + 1, u) + n.get(a + 1, u + 1);
          (l === 4 || l === 0) && s++;
        }
      return s * o.N2;
    }, t.getPenaltyN3 = function(n) {
      const i = n.size;
      let s = 0, a = 0, u = 0;
      for (let l = 0; l < i; l++) {
        a = u = 0;
        for (let c = 0; c < i; c++)
          a = a << 1 & 2047 | n.get(l, c), c >= 10 && (a === 1488 || a === 93) && s++, u = u << 1 & 2047 | n.get(c, l), c >= 10 && (u === 1488 || u === 93) && s++;
      }
      return s * o.N3;
    }, t.getPenaltyN4 = function(n) {
      let i = 0;
      const s = n.data.length;
      for (let u = 0; u < s; u++) i += n.data[u];
      return Math.abs(Math.ceil(i * 100 / s / 5) - 10) * o.N4;
    };
    function r(e, n, i) {
      switch (e) {
        case t.Patterns.PATTERN000:
          return (n + i) % 2 === 0;
        case t.Patterns.PATTERN001:
          return n % 2 === 0;
        case t.Patterns.PATTERN010:
          return i % 3 === 0;
        case t.Patterns.PATTERN011:
          return (n + i) % 3 === 0;
        case t.Patterns.PATTERN100:
          return (Math.floor(n / 2) + Math.floor(i / 3)) % 2 === 0;
        case t.Patterns.PATTERN101:
          return n * i % 2 + n * i % 3 === 0;
        case t.Patterns.PATTERN110:
          return (n * i % 2 + n * i % 3) % 2 === 0;
        case t.Patterns.PATTERN111:
          return (n * i % 3 + (n + i) % 2) % 2 === 0;
        default:
          throw new Error("bad maskPattern:" + e);
      }
    }
    t.applyMask = function(n, i) {
      const s = i.size;
      for (let a = 0; a < s; a++)
        for (let u = 0; u < s; u++)
          i.isReserved(u, a) || i.xor(u, a, r(n, u, a));
    }, t.getBestMask = function(n, i) {
      const s = Object.keys(t.Patterns).length;
      let a = 0, u = 1 / 0;
      for (let l = 0; l < s; l++) {
        i(l), t.applyMask(l, n);
        const c = t.getPenaltyN1(n) + t.getPenaltyN2(n) + t.getPenaltyN3(n) + t.getPenaltyN4(n);
        t.applyMask(l, n), c < u && (u = c, a = l);
      }
      return a;
    };
  })(rt)), rt;
}
var H = {}, Lt;
function ee() {
  if (Lt) return H;
  Lt = 1;
  const t = bt(), o = [
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
  return H.getBlocksCount = function(n, i) {
    switch (i) {
      case t.L:
        return o[(n - 1) * 4 + 0];
      case t.M:
        return o[(n - 1) * 4 + 1];
      case t.Q:
        return o[(n - 1) * 4 + 2];
      case t.H:
        return o[(n - 1) * 4 + 3];
      default:
        return;
    }
  }, H.getTotalCodewordsCount = function(n, i) {
    switch (i) {
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
function be() {
  if (_t) return O;
  _t = 1;
  const t = new Uint8Array(512), o = new Uint8Array(256);
  return (function() {
    let e = 1;
    for (let n = 0; n < 255; n++)
      t[n] = e, o[e] = n, e <<= 1, e & 256 && (e ^= 285);
    for (let n = 255; n < 512; n++)
      t[n] = t[n - 255];
  })(), O.log = function(e) {
    if (e < 1) throw new Error("log(" + e + ")");
    return o[e];
  }, O.exp = function(e) {
    return t[e];
  }, O.mul = function(e, n) {
    return e === 0 || n === 0 ? 0 : t[o[e] + o[n]];
  }, O;
}
var kt;
function Ee() {
  return kt || (kt = 1, (function(t) {
    const o = be();
    t.mul = function(e, n) {
      const i = new Uint8Array(e.length + n.length - 1);
      for (let s = 0; s < e.length; s++)
        for (let a = 0; a < n.length; a++)
          i[s + a] ^= o.mul(e[s], n[a]);
      return i;
    }, t.mod = function(e, n) {
      let i = new Uint8Array(e);
      for (; i.length - n.length >= 0; ) {
        const s = i[0];
        for (let u = 0; u < n.length; u++)
          i[u] ^= o.mul(n[u], s);
        let a = 0;
        for (; a < i.length && i[a] === 0; ) a++;
        i = i.slice(a);
      }
      return i;
    }, t.generateECPolynomial = function(e) {
      let n = new Uint8Array([1]);
      for (let i = 0; i < e; i++)
        n = t.mul(n, new Uint8Array([1, o.exp(i)]));
      return n;
    };
  })(ot)), ot;
}
var it, vt;
function Ce() {
  if (vt) return it;
  vt = 1;
  const t = Ee();
  function o(r) {
    this.genPoly = void 0, this.degree = r, this.degree && this.initialize(this.degree);
  }
  return o.prototype.initialize = function(e) {
    this.degree = e, this.genPoly = t.generateECPolynomial(this.degree);
  }, o.prototype.encode = function(e) {
    if (!this.genPoly)
      throw new Error("Encoder not initialized");
    const n = new Uint8Array(e.length + this.degree);
    n.set(e);
    const i = t.mod(n, this.genPoly), s = this.degree - i.length;
    if (s > 0) {
      const a = new Uint8Array(this.degree);
      return a.set(i, s), a;
    }
    return i;
  }, it = o, it;
}
var st = {}, at = {}, ut = {}, zt;
function ne() {
  return zt || (zt = 1, ut.isValid = function(o) {
    return !isNaN(o) && o >= 1 && o <= 40;
  }), ut;
}
var L = {}, Dt;
function re() {
  if (Dt) return L;
  Dt = 1;
  const t = "[0-9]+", o = "[A-Z $%*+\\-./:]+";
  let r = "(?:[u3000-u303F]|[u3040-u309F]|[u30A0-u30FF]|[uFF00-uFFEF]|[u4E00-u9FAF]|[u2605-u2606]|[u2190-u2195]|u203B|[u2010u2015u2018u2019u2025u2026u201Cu201Du2225u2260]|[u0391-u0451]|[u00A7u00A8u00B1u00B4u00D7u00F7])+";
  r = r.replace(/u/g, "\\u");
  const e = "(?:(?![A-Z0-9 $%*+\\-./:]|" + r + `)(?:.|[\r
]))+`;
  L.KANJI = new RegExp(r, "g"), L.BYTE_KANJI = new RegExp("[^A-Z0-9 $%*+\\-./:]+", "g"), L.BYTE = new RegExp(e, "g"), L.NUMERIC = new RegExp(t, "g"), L.ALPHANUMERIC = new RegExp(o, "g");
  const n = new RegExp("^" + r + "$"), i = new RegExp("^" + t + "$"), s = new RegExp("^[A-Z0-9 $%*+\\-./:]+$");
  return L.testKanji = function(u) {
    return n.test(u);
  }, L.testNumeric = function(u) {
    return i.test(u);
  }, L.testAlphanumeric = function(u) {
    return s.test(u);
  }, L;
}
var Ft;
function F() {
  return Ft || (Ft = 1, (function(t) {
    const o = ne(), r = re();
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
    }, t.getCharCountIndicator = function(i, s) {
      if (!i.ccBits) throw new Error("Invalid mode: " + i);
      if (!o.isValid(s))
        throw new Error("Invalid version: " + s);
      return s >= 1 && s < 10 ? i.ccBits[0] : s < 27 ? i.ccBits[1] : i.ccBits[2];
    }, t.getBestModeForData = function(i) {
      return r.testNumeric(i) ? t.NUMERIC : r.testAlphanumeric(i) ? t.ALPHANUMERIC : r.testKanji(i) ? t.KANJI : t.BYTE;
    }, t.toString = function(i) {
      if (i && i.id) return i.id;
      throw new Error("Invalid mode");
    }, t.isValid = function(i) {
      return i && i.bit && i.ccBits;
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
    t.from = function(i, s) {
      if (t.isValid(i))
        return i;
      try {
        return e(i);
      } catch {
        return s;
      }
    };
  })(at)), at;
}
var Ut;
function Se() {
  return Ut || (Ut = 1, (function(t) {
    const o = D(), r = ee(), e = bt(), n = F(), i = ne(), s = 7973, a = o.getBCHDigit(s);
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
      return i.isValid(f) ? parseInt(f, 10) : A;
    }, t.getCapacity = function(f, A, y) {
      if (!i.isValid(f))
        throw new Error("Invalid QR Code version");
      typeof y > "u" && (y = n.BYTE);
      const N = o.getSymbolTotalCodewords(f), S = r.getTotalCodewordsCount(f, A), P = (N - S) * 8;
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
      if (!i.isValid(f) || f < 7)
        throw new Error("Invalid QR Code version");
      let A = f << 12;
      for (; o.getBCHDigit(A) - a >= 0; )
        A ^= s << o.getBCHDigit(A) - a;
      return f << 12 | A;
    };
  })(st)), st;
}
var lt = {}, xt;
function Be() {
  if (xt) return lt;
  xt = 1;
  const t = D(), o = 1335, r = 21522, e = t.getBCHDigit(o);
  return lt.getEncodedBits = function(i, s) {
    const a = i.bit << 3 | s;
    let u = a << 10;
    for (; t.getBCHDigit(u) - e >= 0; )
      u ^= o << t.getBCHDigit(u) - e;
    return (a << 10 | u) ^ r;
  }, lt;
}
var ct = {}, ft, $t;
function Me() {
  if ($t) return ft;
  $t = 1;
  const t = F();
  function o(r) {
    this.mode = t.NUMERIC, this.data = r.toString();
  }
  return o.getBitsLength = function(e) {
    return 10 * Math.floor(e / 3) + (e % 3 ? e % 3 * 3 + 1 : 0);
  }, o.prototype.getLength = function() {
    return this.data.length;
  }, o.prototype.getBitsLength = function() {
    return o.getBitsLength(this.data.length);
  }, o.prototype.write = function(e) {
    let n, i, s;
    for (n = 0; n + 3 <= this.data.length; n += 3)
      i = this.data.substr(n, 3), s = parseInt(i, 10), e.put(s, 10);
    const a = this.data.length - n;
    a > 0 && (i = this.data.substr(n), s = parseInt(i, 10), e.put(s, a * 3 + 1));
  }, ft = o, ft;
}
var dt, Ot;
function Re() {
  if (Ot) return dt;
  Ot = 1;
  const t = F(), o = [
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
    let i;
    for (i = 0; i + 2 <= this.data.length; i += 2) {
      let s = o.indexOf(this.data[i]) * 45;
      s += o.indexOf(this.data[i + 1]), n.put(s, 11);
    }
    this.data.length % 2 && n.put(o.indexOf(this.data[i]), 6);
  }, dt = r, dt;
}
var ht, Yt;
function Ae() {
  if (Yt) return ht;
  Yt = 1;
  const t = F();
  function o(r) {
    this.mode = t.BYTE, typeof r == "string" ? this.data = new TextEncoder().encode(r) : this.data = new Uint8Array(r);
  }
  return o.getBitsLength = function(e) {
    return e * 8;
  }, o.prototype.getLength = function() {
    return this.data.length;
  }, o.prototype.getBitsLength = function() {
    return o.getBitsLength(this.data.length);
  }, o.prototype.write = function(r) {
    for (let e = 0, n = this.data.length; e < n; e++)
      r.put(this.data[e], 8);
  }, ht = o, ht;
}
var gt, Ht;
function Te() {
  if (Ht) return gt;
  Ht = 1;
  const t = F(), o = D();
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
      let i = o.toSJIS(this.data[n]);
      if (i >= 33088 && i <= 40956)
        i -= 33088;
      else if (i >= 57408 && i <= 60351)
        i -= 49472;
      else
        throw new Error(
          "Invalid SJIS character: " + this.data[n] + `
Make sure your charset is UTF-8`
        );
      i = (i >>> 8 & 255) * 192 + (i & 255), e.put(i, 13);
    }
  }, gt = r, gt;
}
var mt = { exports: {} }, jt;
function Pe() {
  return jt || (jt = 1, (function(t) {
    var o = {
      single_source_shortest_paths: function(r, e, n) {
        var i = {}, s = {};
        s[e] = 0;
        var a = o.PriorityQueue.make();
        a.push(e, 0);
        for (var u, l, c, g, m, f, A, y, N; !a.empty(); ) {
          u = a.pop(), l = u.value, g = u.cost, m = r[l] || {};
          for (c in m)
            m.hasOwnProperty(c) && (f = m[c], A = g + f, y = s[c], N = typeof s[c] > "u", (N || y > A) && (s[c] = A, a.push(c, A), i[c] = l));
        }
        if (typeof n < "u" && typeof s[n] > "u") {
          var S = ["Could not find a path from ", e, " to ", n, "."].join("");
          throw new Error(S);
        }
        return i;
      },
      extract_shortest_path_from_predecessor_list: function(r, e) {
        for (var n = [], i = e; i; )
          n.push(i), r[i], i = r[i];
        return n.reverse(), n;
      },
      find_path: function(r, e, n) {
        var i = o.single_source_shortest_paths(r, e, n);
        return o.extract_shortest_path_from_predecessor_list(
          i,
          n
        );
      },
      /**
       * A very naive priority queue implementation.
       */
      PriorityQueue: {
        make: function(r) {
          var e = o.PriorityQueue, n = {}, i;
          r = r || {};
          for (i in e)
            e.hasOwnProperty(i) && (n[i] = e[i]);
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
    t.exports = o;
  })(mt)), mt.exports;
}
var Vt;
function Ne() {
  return Vt || (Vt = 1, (function(t) {
    const o = F(), r = Me(), e = Re(), n = Ae(), i = Te(), s = re(), a = D(), u = Pe();
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
      const P = c(s.NUMERIC, o.NUMERIC, S), R = c(s.ALPHANUMERIC, o.ALPHANUMERIC, S);
      let B, I;
      return a.isKanjiModeEnabled() ? (B = c(s.BYTE, o.BYTE, S), I = c(s.KANJI, o.KANJI, S)) : (B = c(s.BYTE_KANJI, o.BYTE, S), I = []), P.concat(R, B, I).sort(function(E, b) {
        return E.index - b.index;
      }).map(function(E) {
        return {
          data: E.data,
          mode: E.mode,
          length: E.length
        };
      });
    }
    function m(S, P) {
      switch (P) {
        case o.NUMERIC:
          return r.getBitsLength(S);
        case o.ALPHANUMERIC:
          return e.getBitsLength(S);
        case o.KANJI:
          return i.getBitsLength(S);
        case o.BYTE:
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
          case o.NUMERIC:
            P.push([
              B,
              { data: B.data, mode: o.ALPHANUMERIC, length: B.length },
              { data: B.data, mode: o.BYTE, length: B.length }
            ]);
            break;
          case o.ALPHANUMERIC:
            P.push([
              B,
              { data: B.data, mode: o.BYTE, length: B.length }
            ]);
            break;
          case o.KANJI:
            P.push([
              B,
              { data: B.data, mode: o.BYTE, length: l(B.data) }
            ]);
            break;
          case o.BYTE:
            P.push([
              { data: B.data, mode: o.BYTE, length: l(B.data) }
            ]);
        }
      }
      return P;
    }
    function y(S, P) {
      const R = {}, B = { start: {} };
      let I = ["start"];
      for (let h = 0; h < S.length; h++) {
        const E = S[h], b = [];
        for (let d = 0; d < E.length; d++) {
          const M = E[d], p = "" + h + d;
          b.push(p), R[p] = { node: M, lastCount: 0 }, B[p] = {};
          for (let C = 0; C < I.length; C++) {
            const w = I[C];
            R[w] && R[w].node.mode === M.mode ? (B[w][p] = m(R[w].lastCount + M.length, M.mode) - m(R[w].lastCount, M.mode), R[w].lastCount += M.length) : (R[w] && (R[w].lastCount = M.length), B[w][p] = m(M.length, M.mode) + 4 + o.getCharCountIndicator(M.mode, P));
          }
        }
        I = b;
      }
      for (let h = 0; h < I.length; h++)
        B[I[h]].end = 0;
      return { map: B, table: R };
    }
    function N(S, P) {
      let R;
      const B = o.getBestModeForData(S);
      if (R = o.from(P, B), R !== o.BYTE && R.bit < B.bit)
        throw new Error('"' + S + '" cannot be encoded with mode ' + o.toString(R) + `.
 Suggested mode is: ` + o.toString(B));
      switch (R === o.KANJI && !a.isKanjiModeEnabled() && (R = o.BYTE), R) {
        case o.NUMERIC:
          return new r(S);
        case o.ALPHANUMERIC:
          return new e(S);
        case o.KANJI:
          return new i(S);
        case o.BYTE:
          return new n(S);
      }
    }
    t.fromArray = function(P) {
      return P.reduce(function(R, B) {
        return typeof B == "string" ? R.push(N(B, null)) : B.data && R.push(N(B.data, B.mode)), R;
      }, []);
    }, t.fromString = function(P, R) {
      const B = g(P, a.isKanjiModeEnabled()), I = A(B), h = y(I, R), E = u.find_path(h.map, "start", "end"), b = [];
      for (let d = 1; d < E.length - 1; d++)
        b.push(h.table[E[d]].node);
      return t.fromArray(f(b));
    }, t.rawSplit = function(P) {
      return t.fromArray(
        g(P, a.isKanjiModeEnabled())
      );
    };
  })(ct)), ct;
}
var Kt;
function Ie() {
  if (Kt) return G;
  Kt = 1;
  const t = D(), o = bt(), r = ge(), e = me(), n = pe(), i = we(), s = ye(), a = ee(), u = Ce(), l = Se(), c = Be(), g = F(), m = Ne();
  function f(h, E) {
    const b = h.size, d = i.getPositions(E);
    for (let M = 0; M < d.length; M++) {
      const p = d[M][0], C = d[M][1];
      for (let w = -1; w <= 7; w++)
        if (!(p + w <= -1 || b <= p + w))
          for (let T = -1; T <= 7; T++)
            C + T <= -1 || b <= C + T || (w >= 0 && w <= 6 && (T === 0 || T === 6) || T >= 0 && T <= 6 && (w === 0 || w === 6) || w >= 2 && w <= 4 && T >= 2 && T <= 4 ? h.set(p + w, C + T, !0, !0) : h.set(p + w, C + T, !1, !0));
    }
  }
  function A(h) {
    const E = h.size;
    for (let b = 8; b < E - 8; b++) {
      const d = b % 2 === 0;
      h.set(b, 6, d, !0), h.set(6, b, d, !0);
    }
  }
  function y(h, E) {
    const b = n.getPositions(E);
    for (let d = 0; d < b.length; d++) {
      const M = b[d][0], p = b[d][1];
      for (let C = -2; C <= 2; C++)
        for (let w = -2; w <= 2; w++)
          C === -2 || C === 2 || w === -2 || w === 2 || C === 0 && w === 0 ? h.set(M + C, p + w, !0, !0) : h.set(M + C, p + w, !1, !0);
    }
  }
  function N(h, E) {
    const b = h.size, d = l.getEncodedBits(E);
    let M, p, C;
    for (let w = 0; w < 18; w++)
      M = Math.floor(w / 3), p = w % 3 + b - 8 - 3, C = (d >> w & 1) === 1, h.set(M, p, C, !0), h.set(p, M, C, !0);
  }
  function S(h, E, b) {
    const d = h.size, M = c.getEncodedBits(E, b);
    let p, C;
    for (p = 0; p < 15; p++)
      C = (M >> p & 1) === 1, p < 6 ? h.set(p, 8, C, !0) : p < 8 ? h.set(p + 1, 8, C, !0) : h.set(d - 15 + p, 8, C, !0), p < 8 ? h.set(8, d - p - 1, C, !0) : p < 9 ? h.set(8, 15 - p - 1 + 1, C, !0) : h.set(8, 15 - p - 1, C, !0);
    h.set(d - 8, 8, 1, !0);
  }
  function P(h, E) {
    const b = h.size;
    let d = -1, M = b - 1, p = 7, C = 0;
    for (let w = b - 1; w > 0; w -= 2)
      for (w === 6 && w--; ; ) {
        for (let T = 0; T < 2; T++)
          if (!h.isReserved(M, w - T)) {
            let v = !1;
            C < E.length && (v = (E[C] >>> p & 1) === 1), h.set(M, w - T, v), p--, p === -1 && (C++, p = 7);
          }
        if (M += d, M < 0 || b <= M) {
          M -= d, d = -d;
          break;
        }
      }
  }
  function R(h, E, b) {
    const d = new r();
    b.forEach(function(T) {
      d.put(T.mode.bit, 4), d.put(T.getLength(), g.getCharCountIndicator(T.mode, h)), T.write(d);
    });
    const M = t.getSymbolTotalCodewords(h), p = a.getTotalCodewordsCount(h, E), C = (M - p) * 8;
    for (d.getLengthInBits() + 4 <= C && d.put(0, 4); d.getLengthInBits() % 8 !== 0; )
      d.putBit(0);
    const w = (C - d.getLengthInBits()) / 8;
    for (let T = 0; T < w; T++)
      d.put(T % 2 ? 17 : 236, 8);
    return B(d, h, E);
  }
  function B(h, E, b) {
    const d = t.getSymbolTotalCodewords(E), M = a.getTotalCodewordsCount(E, b), p = d - M, C = a.getBlocksCount(E, b), w = d % C, T = C - w, v = Math.floor(d / C), $ = Math.floor(p / C), le = $ + 1, Ct = v - $, ce = new u(Ct);
    let V = 0;
    const Y = new Array(C), St = new Array(C);
    let K = 0;
    const fe = new Uint8Array(h.buffer);
    for (let U = 0; U < C; U++) {
      const Q = U < T ? $ : le;
      Y[U] = fe.slice(V, V + Q), St[U] = ce.encode(Y[U]), V += Q, K = Math.max(K, Q);
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
  function I(h, E, b, d) {
    let M;
    if (Array.isArray(h))
      M = m.fromArray(h);
    else if (typeof h == "string") {
      let v = E;
      if (!v) {
        const $ = m.rawSplit(h);
        v = l.getBestVersionForData($, b);
      }
      M = m.fromString(h, v || 40);
    } else
      throw new Error("Invalid data");
    const p = l.getBestVersionForData(M, b);
    if (!p)
      throw new Error("The amount of data is too big to be stored in a QR Code");
    if (!E)
      E = p;
    else if (E < p)
      throw new Error(
        `
The chosen QR Code version cannot contain this amount of data.
Minimum version required to store current data is: ` + p + `.
`
      );
    const C = R(E, b, M), w = t.getSymbolSize(E), T = new e(w);
    return f(T, E), A(T), y(T, E), S(T, b, 0), E >= 7 && N(T, E), P(T, C), isNaN(d) && (d = s.getBestMask(
      T,
      S.bind(null, T, b)
    )), s.applyMask(d, T), S(T, b, d), {
      modules: T,
      version: E,
      errorCorrectionLevel: b,
      maskPattern: d,
      segments: M
    };
  }
  return G.create = function(E, b) {
    if (typeof E > "u" || E === "")
      throw new Error("No input text");
    let d = o.M, M, p;
    return typeof b < "u" && (d = o.from(b.errorCorrectionLevel, o.M), M = l.from(b.version), p = s.from(b.maskPattern), b.toSJISFunc && t.setToSJISFunction(b.toSJISFunc)), I(E, M, d, p);
  }, G;
}
var pt = {}, wt = {}, Jt;
function oe() {
  return Jt || (Jt = 1, (function(t) {
    function o(r) {
      if (typeof r == "number" && (r = r.toString()), typeof r != "string")
        throw new Error("Color should be defined as hex string");
      let e = r.slice().replace("#", "").split("");
      if (e.length < 3 || e.length === 5 || e.length > 8)
        throw new Error("Invalid hex color: " + r);
      (e.length === 3 || e.length === 4) && (e = Array.prototype.concat.apply([], e.map(function(i) {
        return [i, i];
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
      const n = typeof e.margin > "u" || e.margin === null || e.margin < 0 ? 4 : e.margin, i = e.width && e.width >= 21 ? e.width : void 0, s = e.scale || 4;
      return {
        width: i,
        scale: i ? 4 : s,
        margin: n,
        color: {
          dark: o(e.color.dark || "#000000ff"),
          light: o(e.color.light || "#ffffffff")
        },
        type: e.type,
        rendererOpts: e.rendererOpts || {}
      };
    }, t.getScale = function(e, n) {
      return n.width && n.width >= e + n.margin * 2 ? n.width / (e + n.margin * 2) : n.scale;
    }, t.getImageWidth = function(e, n) {
      const i = t.getScale(e, n);
      return Math.floor((e + n.margin * 2) * i);
    }, t.qrToImageData = function(e, n, i) {
      const s = n.modules.size, a = n.modules.data, u = t.getScale(s, i), l = Math.floor((s + i.margin * 2) * u), c = i.margin * u, g = [i.color.light, i.color.dark];
      for (let m = 0; m < l; m++)
        for (let f = 0; f < l; f++) {
          let A = (m * l + f) * 4, y = i.color.light;
          if (m >= c && f >= c && m < l - c && f < l - c) {
            const N = Math.floor((m - c) / u), S = Math.floor((f - c) / u);
            y = g[a[N * s + S] ? 1 : 0];
          }
          e[A++] = y.r, e[A++] = y.g, e[A++] = y.b, e[A] = y.a;
        }
    };
  })(wt)), wt;
}
var Qt;
function qe() {
  return Qt || (Qt = 1, (function(t) {
    const o = oe();
    function r(n, i, s) {
      n.clearRect(0, 0, i.width, i.height), i.style || (i.style = {}), i.height = s, i.width = s, i.style.height = s + "px", i.style.width = s + "px";
    }
    function e() {
      try {
        return document.createElement("canvas");
      } catch {
        throw new Error("You need to specify a canvas element");
      }
    }
    t.render = function(i, s, a) {
      let u = a, l = s;
      typeof u > "u" && (!s || !s.getContext) && (u = s, s = void 0), s || (l = e()), u = o.getOptions(u);
      const c = o.getImageWidth(i.modules.size, u), g = l.getContext("2d"), m = g.createImageData(c, c);
      return o.qrToImageData(m.data, i, u), r(g, l, c), g.putImageData(m, 0, 0), l;
    }, t.renderToDataURL = function(i, s, a) {
      let u = a;
      typeof u > "u" && (!s || !s.getContext) && (u = s, s = void 0), u || (u = {});
      const l = t.render(i, s, u), c = u.type || "image/png", g = u.rendererOpts || {};
      return l.toDataURL(c, g.quality);
    };
  })(pt)), pt;
}
var yt = {}, Xt;
function Le() {
  if (Xt) return yt;
  Xt = 1;
  const t = oe();
  function o(n, i) {
    const s = n.a / 255, a = i + '="' + n.hex + '"';
    return s < 1 ? a + " " + i + '-opacity="' + s.toFixed(2).slice(1) + '"' : a;
  }
  function r(n, i, s) {
    let a = n + i;
    return typeof s < "u" && (a += " " + s), a;
  }
  function e(n, i, s) {
    let a = "", u = 0, l = !1, c = 0;
    for (let g = 0; g < n.length; g++) {
      const m = Math.floor(g % i), f = Math.floor(g / i);
      !m && !l && (l = !0), n[g] ? (c++, g > 0 && m > 0 && n[g - 1] || (a += l ? r("M", m + s, 0.5 + f + s) : r("m", u, 0), u = 0, l = !1), m + 1 < i && n[g + 1] || (a += r("h", c), c = 0)) : u++;
    }
    return a;
  }
  return yt.render = function(i, s, a) {
    const u = t.getOptions(s), l = i.modules.size, c = i.modules.data, g = l + u.margin * 2, m = u.color.light.a ? "<path " + o(u.color.light, "fill") + ' d="M0 0h' + g + "v" + g + 'H0z"/>' : "", f = "<path " + o(u.color.dark, "stroke") + ' d="' + e(c, l, u.margin) + '"/>', A = 'viewBox="0 0 ' + g + " " + g + '"', N = '<svg xmlns="http://www.w3.org/2000/svg" ' + (u.width ? 'width="' + u.width + '" height="' + u.width + '" ' : "") + A + ' shape-rendering="crispEdges">' + m + f + `</svg>
`;
    return typeof a == "function" && a(null, N), N;
  }, yt;
}
var Gt;
function _e() {
  if (Gt) return x;
  Gt = 1;
  const t = he(), o = Ie(), r = qe(), e = Le();
  function n(i, s, a, u, l) {
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
          const y = o.create(a, u);
          f(i(y, s, u));
        } catch (y) {
          A(y);
        }
      });
    }
    try {
      const f = o.create(a, u);
      l(null, i(f, s, u));
    } catch (f) {
      l(f);
    }
  }
  return x.create = o.create, x.toCanvas = n.bind(null, r.render), x.toDataURL = n.bind(null, r.renderToDataURL), x.toString = n.bind(null, function(i, s, a) {
    return e.render(i, a);
  }), x;
}
var ke = _e();
const Wt = /* @__PURE__ */ de(ke), Et = "product_qr:wo_label_layout:v1", ie = Object.freeze({
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
}), ve = [
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
function j(t = {}) {
  t = t && typeof t == "object" ? t : {};
  const o = { ...ie };
  for (const r of ve) {
    const e = Number(t[r.key]);
    t[r.key] !== "" && t[r.key] != null && Number.isFinite(e) && (o[r.key] = Math.min(r.max, Math.max(r.min, e)));
  }
  o.columns = Math.round(o.columns), o.nameLines = Math.round(o.nameLines), o.qzTimeout = Math.round(o.qzTimeout), o.dpi = [203, 300, 600].includes(Number(t.dpi)) ? Number(t.dpi) : 203, o.align = ["left", "center", "right"].includes(t.align) ? t.align : "left";
  for (const r of ["showSku", "showMfg", "showExp", "showSequence", "showPrefix", "bold"])
    t[r] != null && (o[r] = t[r] === !0 || t[r] === 1);
  return o.printer = String(t.printer || "").slice(0, 200), o.footer = String(t.footer || "").slice(0, 100), o;
}
function Ue(t = globalThis.localStorage) {
  try {
    const o = t?.getItem(Et);
    if (!o) return null;
    const r = JSON.parse(o);
    return r && typeof r == "object" && !Array.isArray(r) ? j(r) : null;
  } catch {
    return null;
  }
}
function xe(t, o = globalThis.localStorage) {
  const r = j(t);
  if (!o) throw new Error("Penyimpanan browser tidak tersedia.");
  return o.setItem(Et, JSON.stringify(r)), r;
}
function $e(t = globalThis.localStorage) {
  if (!t) throw new Error("Penyimpanan browser tidak tersedia.");
  t.removeItem(Et);
}
const ze = (t) => String(t ?? "").replace(/[&<>"']/g, (o) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[o]), De = (t) => String(t ?? "").replace(/[_^~\\]/g, (o) => ({ _: "_5F", "^": "_5E", "~": "_7E", "\\": "_5C" })[o]), Zt = (t) => t ? String(t).slice(0, 10).split("-").reverse().map((o, r) => r === 2 ? o.slice(-2) : o).join("-") : "-", q = (t, o) => Math.round(t * o.dpi / 25.4), Oe = Object.freeze({
  sku: "SKU-TEST",
  item_name: "Dough Ropi Butter",
  item_name_prefix: "Dough",
  item_name_main: "Ropi Butter",
  manufacturing_date: "2026-10-20",
  expiry_date: "2026-11-20",
  label_count: 1,
  labels: [{ label_number: 1, qr_value: "TEST-NOT-A-PRODUCTION-SERIAL", serial_no: "TEST" }]
});
function se(t) {
  const o = t.dpi / 203, r = (s) => Math.round(s * o), e = q(t.margin, t), n = Math.round(t.fontSize * t.dpi / 72), i = Math.round(t.productFontSize * t.dpi / 72);
  return {
    unit: r,
    shift: e,
    size: n,
    productSize: i,
    column: q(t.width, t),
    gap: q(t.gap, t),
    height: q(t.height, t),
    qrX: Math.max(0, r(68) + e + q(t.leftX, t)),
    qrY: Math.max(0, r(32) + e + q(t.leftY, t)),
    qrScale: Math.min(10, Math.max(2, Math.round(4 * t.qrSize / ie.qrSize * o))),
    textX: Math.max(0, r(192) + e + q(t.rightX, t)),
    textY: Math.max(0, r(32) + e + q(t.rightY, t)),
    sequenceX: Math.max(0, r(355) + e + q(t.rightX, t)),
    sequenceY: Math.max(0, r(28) + e + q(t.rightY, t)),
    fontRatio: n / 21,
    productRatio: i / 26
  };
}
function ae(t, o, r, e) {
  const n = [], i = Math.round(18 * e.fontRatio);
  r.showSequence && n.push({ x: e.sequenceX, y: e.sequenceY, size: i, text: String(o), sequence: !0, lines: 1 });
  let s = e.textY;
  const a = (u, l, c = 1) => n.push({ x: e.textX, y: s, size: l, text: u, lines: c });
  if (t.item_name_prefix) {
    const u = r.prefixFontSize > 0 ? Math.round(r.prefixFontSize * r.dpi / 72) : i;
    r.showPrefix && a(t.item_name_prefix, u), s += Math.round(20 * u / 18 * r.lineHeight), a(t.item_name_main || "", e.productSize, r.nameLines), s += Math.round((28 * e.productRatio + e.productSize * (r.nameLines - 1)) * r.lineHeight);
  } else
    a(t.item_name_main || t.item_name || "", e.productSize, r.nameLines), s += Math.round((30 * e.productRatio + e.productSize * (r.nameLines - 1)) * r.lineHeight);
  for (const [u, l] of [[r.showSku, `SKU : ${t.sku}`], [r.showMfg, `MFG : ${Zt(t.manufacturing_date)}`], [r.showExp, `EXP : ${Zt(t.expiry_date)}`]])
    u && a(l, e.size), s += Math.round(24 * e.fontRatio * r.lineHeight);
  return r.footer && a(r.footer, e.size), n;
}
const te = (t) => {
  const o = String(t ?? ""), r = De(o);
  return `${r === o ? "" : "^FH_"}^FD${r}^FS
`;
};
function ue(t, o) {
  const r = Math.max(1, o.column - o.textX - o.shift);
  return t.textWidth > 0 ? Math.max(1, Math.min(r, q(t.textWidth, t))) : r;
}
function Ye(t, o) {
  const r = j(o), e = se(r), n = [], i = (s, a) => {
    const u = r.textWidth > 0 || s.lines > 1 || r.align !== "left", l = s.sequence ? `^FB${e.unit(40)},1,0,R` : u ? `^FB${ue(r, e)},${s.lines},0,${{ left: "L", center: "C", right: "R" }[r.align]}` : "", c = (g) => `^FO${g},${s.y}^A0N,${s.size},${s.size}${l}${te(s.text)}`;
    return c(a + s.x) + (r.bold ? c(a + s.x + e.unit(1)) : "");
  };
  for (let s = 0; s < t.labels.length; s += r.columns) {
    let a = `^XA
^PW${e.column * r.columns + e.gap * (r.columns - 1)}
^LL${e.height}
`;
    for (let u = 0; u < r.columns && s + u < t.labels.length; u++) {
      const l = t.labels[s + u], c = u * (e.column + e.gap), g = ae(t, l.label_number ?? s + u + 1, r, e);
      g[0]?.sequence && (a += i(g.shift(), c)), a += `^FO${c + e.qrX},${e.qrY}^BQN,2,${e.qrScale}${te(`QA,${l.qr_value}`)}`;
      for (const m of g) a += i(m, c);
    }
    n.push(a + `^XZ
`);
  }
  return n;
}
async function He(t, o) {
  const r = j(o), e = se(r), n = (a) => a * 25.4 / r.dpi, i = [];
  for (let a = 0; a < t.labels.length; a += r.columns) {
    const u = await Promise.all(t.labels.slice(a, a + r.columns).map(async (l, c) => {
      const g = { errorCorrectionLevel: "Q", margin: 0 }, m = await Wt.toString(l.qr_value, { ...g, type: "svg" }), f = Wt.create(l.qr_value, g).modules.size * e.qrScale, A = ae(t, l.label_number ?? a + c + 1, r, e).map((y) => {
        const N = y.sequence ? e.unit(40) : ue(r, e), S = y.lines > 1, P = S || !y.sequence && r.textWidth > 0;
        return `<div class="label-text" style="left:${n(y.x)}mm;top:${n(y.y)}mm;font-size:${n(y.size)}mm;width:${n(N)}mm;text-align:${y.sequence ? "right" : r.align};font-weight:${r.bold ? 700 : 400};white-space:${S ? "normal" : "nowrap"};${P ? `overflow-wrap:anywhere;max-height:${n(y.size * y.lines)}mm;overflow:hidden;` : ""}">${ze(y.text)}</div>`;
      }).join("");
      return `<article><div class="qr" style="left:${n(e.qrX)}mm;top:${n(e.qrY)}mm;width:${n(f)}mm;height:${n(f)}mm">${m}</div>${A}</article>`;
    }));
    i.push(`<section>${u.join("")}</section>`);
  }
  const s = r.width * r.columns + r.gap * (r.columns - 1);
  return `<!doctype html><html lang="id"><head><meta charset="utf-8"><style>
    @page{size:${s}mm ${r.height}mm;margin:0}*{box-sizing:border-box}html,body{margin:0;padding:0;font-family:Arial,sans-serif;color:#000}
    section{width:${s}mm;height:${r.height}mm;display:flex;gap:${r.gap}mm;break-after:page;page-break-after:always}section:last-child{break-after:auto;page-break-after:auto}
    article{width:${r.width}mm;height:${r.height}mm;position:relative;overflow:hidden;flex-shrink:0;background:white}
    .qr,.label-text{position:absolute}.qr svg{width:100%;height:100%;display:block}.label-text{font-family:Arial,sans-serif;font-weight:700;line-height:1;white-space:nowrap}
    @media screen{body{background:#eee}section{margin-bottom:4px}}
    </style></head><body>${i.join("")}</body></html>`;
}
export {
  ie as L,
  Oe as S,
  de as a,
  He as b,
  Ye as c,
  ve as d,
  Fe as g,
  Ue as l,
  j as n,
  $e as r,
  xe as s
};

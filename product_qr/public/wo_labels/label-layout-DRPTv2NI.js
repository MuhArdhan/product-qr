function ge(t) {
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
var D = {}, G, At;
function me() {
  return At || (At = 1, G = function() {
    return typeof Promise == "function" && Promise.prototype && Promise.prototype.then;
  }), G;
}
var Q = {}, x = {}, Rt;
function z() {
  if (Rt) return x;
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
  return x.getSymbolSize = function(e) {
    if (!e) throw new Error('"version" cannot be null or undefined');
    if (e < 1 || e > 40) throw new Error('"version" should be in range from 1 to 40');
    return e * 4 + 17;
  }, x.getSymbolTotalCodewords = function(e) {
    return o[e];
  }, x.getBCHDigit = function(r) {
    let e = 0;
    for (; r !== 0; )
      e++, r >>>= 1;
    return e;
  }, x.setToSJISFunction = function(e) {
    if (typeof e != "function")
      throw new Error('"toSJISFunc" is not a valid function.');
    t = e;
  }, x.isKanjiModeEnabled = function() {
    return typeof t < "u";
  }, x.toSJIS = function(e) {
    return t(e);
  }, x;
}
var W = {}, Tt;
function Et() {
  return Tt || (Tt = 1, (function(t) {
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
var Z, Pt;
function pe() {
  if (Pt) return Z;
  Pt = 1;
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
var tt, Nt;
function ye() {
  if (Nt) return tt;
  Nt = 1;
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
var et = {}, It;
function we() {
  return It || (It = 1, (function(t) {
    const o = z().getSymbolSize;
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
var nt = {}, _t;
function be() {
  if (_t) return nt;
  _t = 1;
  const t = z().getSymbolSize, o = 7;
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
var rt = {}, kt;
function Ee() {
  return kt || (kt = 1, (function(t) {
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
      for (let m = 0; m < i; m++) {
        a = u = 0, l = c = null;
        for (let f = 0; f < i; f++) {
          let d = n.get(m, f);
          d === l ? a++ : (a >= 5 && (s += o.N1 + (a - 5)), l = d, a = 1), d = n.get(f, m), d === c ? u++ : (u >= 5 && (s += o.N1 + (u - 5)), c = d, u = 1);
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
var H = {}, qt;
function ne() {
  if (qt) return H;
  qt = 1;
  const t = Et(), o = [
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
var ot = {}, O = {}, Lt;
function Ce() {
  if (Lt) return O;
  Lt = 1;
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
var vt;
function Se() {
  return vt || (vt = 1, (function(t) {
    const o = Ce();
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
var it, xt;
function Be() {
  if (xt) return it;
  xt = 1;
  const t = Se();
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
function re() {
  return zt || (zt = 1, ut.isValid = function(o) {
    return !isNaN(o) && o >= 1 && o <= 40;
  }), ut;
}
var k = {}, $t;
function oe() {
  if ($t) return k;
  $t = 1;
  const t = "[0-9]+", o = "[A-Z $%*+\\-./:]+";
  let r = "(?:[u3000-u303F]|[u3040-u309F]|[u30A0-u30FF]|[uFF00-uFFEF]|[u4E00-u9FAF]|[u2605-u2606]|[u2190-u2195]|u203B|[u2010u2015u2018u2019u2025u2026u201Cu201Du2225u2260]|[u0391-u0451]|[u00A7u00A8u00B1u00B4u00D7u00F7])+";
  r = r.replace(/u/g, "\\u");
  const e = "(?:(?![A-Z0-9 $%*+\\-./:]|" + r + `)(?:.|[\r
]))+`;
  k.KANJI = new RegExp(r, "g"), k.BYTE_KANJI = new RegExp("[^A-Z0-9 $%*+\\-./:]+", "g"), k.BYTE = new RegExp(e, "g"), k.NUMERIC = new RegExp(t, "g"), k.ALPHANUMERIC = new RegExp(o, "g");
  const n = new RegExp("^" + r + "$"), i = new RegExp("^" + t + "$"), s = new RegExp("^[A-Z0-9 $%*+\\-./:]+$");
  return k.testKanji = function(u) {
    return n.test(u);
  }, k.testNumeric = function(u) {
    return i.test(u);
  }, k.testAlphanumeric = function(u) {
    return s.test(u);
  }, k;
}
var Ft;
function $() {
  return Ft || (Ft = 1, (function(t) {
    const o = re(), r = oe();
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
var Dt;
function Me() {
  return Dt || (Dt = 1, (function(t) {
    const o = z(), r = ne(), e = Et(), n = $(), i = re(), s = 7973, a = o.getBCHDigit(s);
    function u(f, d, M) {
      for (let p = 1; p <= 40; p++)
        if (d <= t.getCapacity(p, M, f))
          return p;
    }
    function l(f, d) {
      return n.getCharCountIndicator(f, d) + 4;
    }
    function c(f, d) {
      let M = 0;
      return f.forEach(function(p) {
        const N = l(p.mode, d);
        M += N + p.getBitsLength();
      }), M;
    }
    function m(f, d) {
      for (let M = 1; M <= 40; M++)
        if (c(f, M) <= t.getCapacity(M, d, n.MIXED))
          return M;
    }
    t.from = function(d, M) {
      return i.isValid(d) ? parseInt(d, 10) : M;
    }, t.getCapacity = function(d, M, p) {
      if (!i.isValid(d))
        throw new Error("Invalid QR Code version");
      typeof p > "u" && (p = n.BYTE);
      const N = o.getSymbolTotalCodewords(d), T = r.getTotalCodewordsCount(d, M), b = (N - T) * 8;
      if (p === n.MIXED) return b;
      const A = b - l(p, d);
      switch (p) {
        case n.NUMERIC:
          return Math.floor(A / 10 * 3);
        case n.ALPHANUMERIC:
          return Math.floor(A / 11 * 2);
        case n.KANJI:
          return Math.floor(A / 13);
        case n.BYTE:
        default:
          return Math.floor(A / 8);
      }
    }, t.getBestVersionForData = function(d, M) {
      let p;
      const N = e.from(M, e.M);
      if (Array.isArray(d)) {
        if (d.length > 1)
          return m(d, N);
        if (d.length === 0)
          return 1;
        p = d[0];
      } else
        p = d;
      return u(p.mode, p.getLength(), N);
    }, t.getEncodedBits = function(d) {
      if (!i.isValid(d) || d < 7)
        throw new Error("Invalid QR Code version");
      let M = d << 12;
      for (; o.getBCHDigit(M) - a >= 0; )
        M ^= s << o.getBCHDigit(M) - a;
      return d << 12 | M;
    };
  })(st)), st;
}
var lt = {}, Ut;
function Ae() {
  if (Ut) return lt;
  Ut = 1;
  const t = z(), o = 1335, r = 21522, e = t.getBCHDigit(o);
  return lt.getEncodedBits = function(i, s) {
    const a = i.bit << 3 | s;
    let u = a << 10;
    for (; t.getBCHDigit(u) - e >= 0; )
      u ^= o << t.getBCHDigit(u) - e;
    return (a << 10 | u) ^ r;
  }, lt;
}
var ct = {}, ft, Ot;
function Re() {
  if (Ot) return ft;
  Ot = 1;
  const t = $();
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
var dt, Yt;
function Te() {
  if (Yt) return dt;
  Yt = 1;
  const t = $(), o = [
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
var ht, Ht;
function Pe() {
  if (Ht) return ht;
  Ht = 1;
  const t = $();
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
var gt, jt;
function Ne() {
  if (jt) return gt;
  jt = 1;
  const t = $(), o = z();
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
var mt = { exports: {} }, Vt;
function Ie() {
  return Vt || (Vt = 1, (function(t) {
    var o = {
      single_source_shortest_paths: function(r, e, n) {
        var i = {}, s = {};
        s[e] = 0;
        var a = o.PriorityQueue.make();
        a.push(e, 0);
        for (var u, l, c, m, f, d, M, p, N; !a.empty(); ) {
          u = a.pop(), l = u.value, m = u.cost, f = r[l] || {};
          for (c in f)
            f.hasOwnProperty(c) && (d = f[c], M = m + d, p = s[c], N = typeof s[c] > "u", (N || p > M) && (s[c] = M, a.push(c, M), i[c] = l));
        }
        if (typeof n < "u" && typeof s[n] > "u") {
          var T = ["Could not find a path from ", e, " to ", n, "."].join("");
          throw new Error(T);
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
var Kt;
function _e() {
  return Kt || (Kt = 1, (function(t) {
    const o = $(), r = Re(), e = Te(), n = Pe(), i = Ne(), s = oe(), a = z(), u = Ie();
    function l(T) {
      return unescape(encodeURIComponent(T)).length;
    }
    function c(T, b, A) {
      const C = [];
      let I;
      for (; (I = T.exec(A)) !== null; )
        C.push({
          data: I[0],
          index: I.index,
          mode: b,
          length: I[0].length
        });
      return C;
    }
    function m(T) {
      const b = c(s.NUMERIC, o.NUMERIC, T), A = c(s.ALPHANUMERIC, o.ALPHANUMERIC, T);
      let C, I;
      return a.isKanjiModeEnabled() ? (C = c(s.BYTE, o.BYTE, T), I = c(s.KANJI, o.KANJI, T)) : (C = c(s.BYTE_KANJI, o.BYTE, T), I = []), b.concat(A, C, I).sort(function(S, E) {
        return S.index - E.index;
      }).map(function(S) {
        return {
          data: S.data,
          mode: S.mode,
          length: S.length
        };
      });
    }
    function f(T, b) {
      switch (b) {
        case o.NUMERIC:
          return r.getBitsLength(T);
        case o.ALPHANUMERIC:
          return e.getBitsLength(T);
        case o.KANJI:
          return i.getBitsLength(T);
        case o.BYTE:
          return n.getBitsLength(T);
      }
    }
    function d(T) {
      return T.reduce(function(b, A) {
        const C = b.length - 1 >= 0 ? b[b.length - 1] : null;
        return C && C.mode === A.mode ? (b[b.length - 1].data += A.data, b) : (b.push(A), b);
      }, []);
    }
    function M(T) {
      const b = [];
      for (let A = 0; A < T.length; A++) {
        const C = T[A];
        switch (C.mode) {
          case o.NUMERIC:
            b.push([
              C,
              { data: C.data, mode: o.ALPHANUMERIC, length: C.length },
              { data: C.data, mode: o.BYTE, length: C.length }
            ]);
            break;
          case o.ALPHANUMERIC:
            b.push([
              C,
              { data: C.data, mode: o.BYTE, length: C.length }
            ]);
            break;
          case o.KANJI:
            b.push([
              C,
              { data: C.data, mode: o.BYTE, length: l(C.data) }
            ]);
            break;
          case o.BYTE:
            b.push([
              { data: C.data, mode: o.BYTE, length: l(C.data) }
            ]);
        }
      }
      return b;
    }
    function p(T, b) {
      const A = {}, C = { start: {} };
      let I = ["start"];
      for (let g = 0; g < T.length; g++) {
        const S = T[g], E = [];
        for (let h = 0; h < S.length; h++) {
          const R = S[h], y = "" + g + h;
          E.push(y), A[y] = { node: R, lastCount: 0 }, C[y] = {};
          for (let B = 0; B < I.length; B++) {
            const w = I[B];
            A[w] && A[w].node.mode === R.mode ? (C[w][y] = f(A[w].lastCount + R.length, R.mode) - f(A[w].lastCount, R.mode), A[w].lastCount += R.length) : (A[w] && (A[w].lastCount = R.length), C[w][y] = f(R.length, R.mode) + 4 + o.getCharCountIndicator(R.mode, b));
          }
        }
        I = E;
      }
      for (let g = 0; g < I.length; g++)
        C[I[g]].end = 0;
      return { map: C, table: A };
    }
    function N(T, b) {
      let A;
      const C = o.getBestModeForData(T);
      if (A = o.from(b, C), A !== o.BYTE && A.bit < C.bit)
        throw new Error('"' + T + '" cannot be encoded with mode ' + o.toString(A) + `.
 Suggested mode is: ` + o.toString(C));
      switch (A === o.KANJI && !a.isKanjiModeEnabled() && (A = o.BYTE), A) {
        case o.NUMERIC:
          return new r(T);
        case o.ALPHANUMERIC:
          return new e(T);
        case o.KANJI:
          return new i(T);
        case o.BYTE:
          return new n(T);
      }
    }
    t.fromArray = function(b) {
      return b.reduce(function(A, C) {
        return typeof C == "string" ? A.push(N(C, null)) : C.data && A.push(N(C.data, C.mode)), A;
      }, []);
    }, t.fromString = function(b, A) {
      const C = m(b, a.isKanjiModeEnabled()), I = M(C), g = p(I, A), S = u.find_path(g.map, "start", "end"), E = [];
      for (let h = 1; h < S.length - 1; h++)
        E.push(g.table[S[h]].node);
      return t.fromArray(d(E));
    }, t.rawSplit = function(b) {
      return t.fromArray(
        m(b, a.isKanjiModeEnabled())
      );
    };
  })(ct)), ct;
}
var Jt;
function ke() {
  if (Jt) return Q;
  Jt = 1;
  const t = z(), o = Et(), r = pe(), e = ye(), n = we(), i = be(), s = Ee(), a = ne(), u = Be(), l = Me(), c = Ae(), m = $(), f = _e();
  function d(g, S) {
    const E = g.size, h = i.getPositions(S);
    for (let R = 0; R < h.length; R++) {
      const y = h[R][0], B = h[R][1];
      for (let w = -1; w <= 7; w++)
        if (!(y + w <= -1 || E <= y + w))
          for (let P = -1; P <= 7; P++)
            B + P <= -1 || E <= B + P || (w >= 0 && w <= 6 && (P === 0 || P === 6) || P >= 0 && P <= 6 && (w === 0 || w === 6) || w >= 2 && w <= 4 && P >= 2 && P <= 4 ? g.set(y + w, B + P, !0, !0) : g.set(y + w, B + P, !1, !0));
    }
  }
  function M(g) {
    const S = g.size;
    for (let E = 8; E < S - 8; E++) {
      const h = E % 2 === 0;
      g.set(E, 6, h, !0), g.set(6, E, h, !0);
    }
  }
  function p(g, S) {
    const E = n.getPositions(S);
    for (let h = 0; h < E.length; h++) {
      const R = E[h][0], y = E[h][1];
      for (let B = -2; B <= 2; B++)
        for (let w = -2; w <= 2; w++)
          B === -2 || B === 2 || w === -2 || w === 2 || B === 0 && w === 0 ? g.set(R + B, y + w, !0, !0) : g.set(R + B, y + w, !1, !0);
    }
  }
  function N(g, S) {
    const E = g.size, h = l.getEncodedBits(S);
    let R, y, B;
    for (let w = 0; w < 18; w++)
      R = Math.floor(w / 3), y = w % 3 + E - 8 - 3, B = (h >> w & 1) === 1, g.set(R, y, B, !0), g.set(y, R, B, !0);
  }
  function T(g, S, E) {
    const h = g.size, R = c.getEncodedBits(S, E);
    let y, B;
    for (y = 0; y < 15; y++)
      B = (R >> y & 1) === 1, y < 6 ? g.set(y, 8, B, !0) : y < 8 ? g.set(y + 1, 8, B, !0) : g.set(h - 15 + y, 8, B, !0), y < 8 ? g.set(8, h - y - 1, B, !0) : y < 9 ? g.set(8, 15 - y - 1 + 1, B, !0) : g.set(8, 15 - y - 1, B, !0);
    g.set(h - 8, 8, 1, !0);
  }
  function b(g, S) {
    const E = g.size;
    let h = -1, R = E - 1, y = 7, B = 0;
    for (let w = E - 1; w > 0; w -= 2)
      for (w === 6 && w--; ; ) {
        for (let P = 0; P < 2; P++)
          if (!g.isReserved(R, w - P)) {
            let v = !1;
            B < S.length && (v = (S[B] >>> y & 1) === 1), g.set(R, w - P, v), y--, y === -1 && (B++, y = 7);
          }
        if (R += h, R < 0 || E <= R) {
          R -= h, h = -h;
          break;
        }
      }
  }
  function A(g, S, E) {
    const h = new r();
    E.forEach(function(P) {
      h.put(P.mode.bit, 4), h.put(P.getLength(), m.getCharCountIndicator(P.mode, g)), P.write(h);
    });
    const R = t.getSymbolTotalCodewords(g), y = a.getTotalCodewordsCount(g, S), B = (R - y) * 8;
    for (h.getLengthInBits() + 4 <= B && h.put(0, 4); h.getLengthInBits() % 8 !== 0; )
      h.putBit(0);
    const w = (B - h.getLengthInBits()) / 8;
    for (let P = 0; P < w; P++)
      h.put(P % 2 ? 17 : 236, 8);
    return C(h, g, S);
  }
  function C(g, S, E) {
    const h = t.getSymbolTotalCodewords(S), R = a.getTotalCodewordsCount(S, E), y = h - R, B = a.getBlocksCount(S, E), w = h % B, P = B - w, v = Math.floor(h / B), U = Math.floor(y / B), fe = U + 1, St = v - U, de = new u(St);
    let V = 0;
    const Y = new Array(B), Bt = new Array(B);
    let K = 0;
    const he = new Uint8Array(g.buffer);
    for (let F = 0; F < B; F++) {
      const X = F < P ? U : fe;
      Y[F] = he.slice(V, V + X), Bt[F] = de.encode(Y[F]), V += X, K = Math.max(K, X);
    }
    const J = new Uint8Array(h);
    let Mt = 0, q, L;
    for (q = 0; q < K; q++)
      for (L = 0; L < B; L++)
        q < Y[L].length && (J[Mt++] = Y[L][q]);
    for (q = 0; q < St; q++)
      for (L = 0; L < B; L++)
        J[Mt++] = Bt[L][q];
    return J;
  }
  function I(g, S, E, h) {
    let R;
    if (Array.isArray(g))
      R = f.fromArray(g);
    else if (typeof g == "string") {
      let v = S;
      if (!v) {
        const U = f.rawSplit(g);
        v = l.getBestVersionForData(U, E);
      }
      R = f.fromString(g, v || 40);
    } else
      throw new Error("Invalid data");
    const y = l.getBestVersionForData(R, E);
    if (!y)
      throw new Error("The amount of data is too big to be stored in a QR Code");
    if (!S)
      S = y;
    else if (S < y)
      throw new Error(
        `
The chosen QR Code version cannot contain this amount of data.
Minimum version required to store current data is: ` + y + `.
`
      );
    const B = A(S, E, R), w = t.getSymbolSize(S), P = new e(w);
    return d(P, S), M(P), p(P, S), T(P, E, 0), S >= 7 && N(P, S), b(P, B), isNaN(h) && (h = s.getBestMask(
      P,
      T.bind(null, P, E)
    )), s.applyMask(h, P), T(P, E, h), {
      modules: P,
      version: S,
      errorCorrectionLevel: E,
      maskPattern: h,
      segments: R
    };
  }
  return Q.create = function(S, E) {
    if (typeof S > "u" || S === "")
      throw new Error("No input text");
    let h = o.M, R, y;
    return typeof E < "u" && (h = o.from(E.errorCorrectionLevel, o.M), R = l.from(E.version), y = s.from(E.maskPattern), E.toSJISFunc && t.setToSJISFunction(E.toSJISFunc)), I(S, R, h, y);
  }, Q;
}
var pt = {}, yt = {}, Xt;
function ie() {
  return Xt || (Xt = 1, (function(t) {
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
      const s = n.modules.size, a = n.modules.data, u = t.getScale(s, i), l = Math.floor((s + i.margin * 2) * u), c = i.margin * u, m = [i.color.light, i.color.dark];
      for (let f = 0; f < l; f++)
        for (let d = 0; d < l; d++) {
          let M = (f * l + d) * 4, p = i.color.light;
          if (f >= c && d >= c && f < l - c && d < l - c) {
            const N = Math.floor((f - c) / u), T = Math.floor((d - c) / u);
            p = m[a[N * s + T] ? 1 : 0];
          }
          e[M++] = p.r, e[M++] = p.g, e[M++] = p.b, e[M] = p.a;
        }
    };
  })(yt)), yt;
}
var Gt;
function qe() {
  return Gt || (Gt = 1, (function(t) {
    const o = ie();
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
      const c = o.getImageWidth(i.modules.size, u), m = l.getContext("2d"), f = m.createImageData(c, c);
      return o.qrToImageData(f.data, i, u), r(m, l, c), m.putImageData(f, 0, 0), l;
    }, t.renderToDataURL = function(i, s, a) {
      let u = a;
      typeof u > "u" && (!s || !s.getContext) && (u = s, s = void 0), u || (u = {});
      const l = t.render(i, s, u), c = u.type || "image/png", m = u.rendererOpts || {};
      return l.toDataURL(c, m.quality);
    };
  })(pt)), pt;
}
var wt = {}, Qt;
function Le() {
  if (Qt) return wt;
  Qt = 1;
  const t = ie();
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
    for (let m = 0; m < n.length; m++) {
      const f = Math.floor(m % i), d = Math.floor(m / i);
      !f && !l && (l = !0), n[m] ? (c++, m > 0 && f > 0 && n[m - 1] || (a += l ? r("M", f + s, 0.5 + d + s) : r("m", u, 0), u = 0, l = !1), f + 1 < i && n[m + 1] || (a += r("h", c), c = 0)) : u++;
    }
    return a;
  }
  return wt.render = function(i, s, a) {
    const u = t.getOptions(s), l = i.modules.size, c = i.modules.data, m = l + u.margin * 2, f = u.color.light.a ? "<path " + o(u.color.light, "fill") + ' d="M0 0h' + m + "v" + m + 'H0z"/>' : "", d = "<path " + o(u.color.dark, "stroke") + ' d="' + e(c, l, u.margin) + '"/>', M = 'viewBox="0 0 ' + m + " " + m + '"', N = '<svg xmlns="http://www.w3.org/2000/svg" ' + (u.width ? 'width="' + u.width + '" height="' + u.width + '" ' : "") + M + ' shape-rendering="crispEdges">' + f + d + `</svg>
`;
    return typeof a == "function" && a(null, N), N;
  }, wt;
}
var Wt;
function ve() {
  if (Wt) return D;
  Wt = 1;
  const t = me(), o = ke(), r = qe(), e = Le();
  function n(i, s, a, u, l) {
    const c = [].slice.call(arguments, 1), m = c.length, f = typeof c[m - 1] == "function";
    if (!f && !t())
      throw new Error("Callback required as last argument");
    if (f) {
      if (m < 2)
        throw new Error("Too few arguments provided");
      m === 2 ? (l = a, a = s, s = u = void 0) : m === 3 && (s.getContext && typeof l > "u" ? (l = u, u = void 0) : (l = u, u = a, a = s, s = void 0));
    } else {
      if (m < 1)
        throw new Error("Too few arguments provided");
      return m === 1 ? (a = s, s = u = void 0) : m === 2 && !s.getContext && (u = a, a = s, s = void 0), new Promise(function(d, M) {
        try {
          const p = o.create(a, u);
          d(i(p, s, u));
        } catch (p) {
          M(p);
        }
      });
    }
    try {
      const d = o.create(a, u);
      l(null, i(d, s, u));
    } catch (d) {
      l(d);
    }
  }
  return D.create = o.create, D.toCanvas = n.bind(null, r.render), D.toDataURL = n.bind(null, r.renderToDataURL), D.toString = n.bind(null, function(i, s, a) {
    return e.render(i, a);
  }), D;
}
var xe = ve();
const Zt = /* @__PURE__ */ ge(xe), Ct = "product_qr:wo_label_layout:v1", se = Object.freeze({
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
}), ze = [
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
  const o = { ...se };
  for (const r of ze) {
    const e = Number(t[r.key]);
    t[r.key] !== "" && t[r.key] != null && Number.isFinite(e) && (o[r.key] = Math.min(r.max, Math.max(r.min, e)));
  }
  o.columns = Math.round(o.columns), o.nameLines = Math.round(o.nameLines), o.qzTimeout = Math.round(o.qzTimeout), o.dpi = [203, 300, 600].includes(Number(t.dpi)) ? Number(t.dpi) : 203, o.align = ["left", "center", "right"].includes(t.align) ? t.align : "left";
  for (const r of ["showSku", "showMfg", "showExp", "showSequence", "showPrefix", "bold"])
    t[r] != null && (o[r] = t[r] === !0 || t[r] === 1);
  return o.printer = String(t.printer || "").slice(0, 200), o.footer = String(t.footer || "").slice(0, 100), o;
}
function De(t = globalThis.localStorage) {
  try {
    const o = t?.getItem(Ct);
    if (!o) return null;
    const r = JSON.parse(o);
    return r && typeof r == "object" && !Array.isArray(r) ? j(r) : null;
  } catch {
    return null;
  }
}
function Ue(t, o = globalThis.localStorage) {
  const r = j(t);
  if (!o) throw new Error("Penyimpanan browser tidak tersedia.");
  return o.setItem(Ct, JSON.stringify(r)), r;
}
function Oe(t = globalThis.localStorage) {
  if (!t) throw new Error("Penyimpanan browser tidak tersedia.");
  t.removeItem(Ct);
}
const te = (t) => String(t ?? "").replace(/[&<>"']/g, (o) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[o]), $e = (t) => String(t ?? "").replace(/[_^~\\]/g, (o) => ({ _: "_5F", "^": "_5E", "~": "_7E", "\\": "_5C" })[o]), ee = (t) => t ? String(t).slice(0, 10).split("-").reverse().map((o, r) => r === 2 ? o.slice(-2) : o).join("-") : "-", _ = (t, o) => Math.round(t * o.dpi / 25.4), Ye = Object.freeze({
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
function ae(t) {
  const o = t.dpi / 203, r = (s) => Math.round(s * o), e = _(t.margin, t), n = Math.round(t.fontSize * t.dpi / 72), i = Math.round(t.productFontSize * t.dpi / 72);
  return {
    unit: r,
    shift: e,
    size: n,
    productSize: i,
    column: _(t.width, t),
    gap: _(t.gap, t),
    height: _(t.height, t),
    qrX: Math.max(0, r(68) + e + _(t.leftX, t)),
    qrY: Math.max(0, r(32) + e + _(t.leftY, t)),
    qrScale: Math.min(10, Math.max(2, Math.round(4 * t.qrSize / se.qrSize * o))),
    textX: Math.max(0, r(192) + e + _(t.rightX, t)),
    textY: Math.max(0, r(32) + e + _(t.rightY, t)),
    sequenceX: Math.max(0, r(355) + e + _(t.rightX, t)),
    sequenceY: Math.max(0, r(28) + e + _(t.rightY, t)),
    fontRatio: n / 21,
    productRatio: i / 26
  };
}
function ue(t, o, r, e) {
  const n = [], i = Math.round(18 * e.fontRatio);
  r.showSequence && n.push({ x: e.sequenceX, y: e.sequenceY, size: i, text: String(o), sequence: !0, lines: 1 });
  let s = e.textY;
  const a = (u, l, c = 1) => n.push({ x: e.textX, y: s, size: l, text: u, lines: c });
  if (t.item_name_prefix) {
    const u = r.prefixFontSize > 0 ? Math.round(r.prefixFontSize * r.dpi / 72) : i;
    r.showPrefix && a(t.item_name_prefix, u), s += Math.round(20 * u / 18 * r.lineHeight), a(t.item_name_main || "", e.productSize, r.nameLines), s += Math.round((28 * e.productRatio + e.productSize * (r.nameLines - 1)) * r.lineHeight);
  } else
    a(t.item_name_main || t.item_name || "", e.productSize, r.nameLines), s += Math.round((30 * e.productRatio + e.productSize * (r.nameLines - 1)) * r.lineHeight);
  for (const [u, l] of [[r.showSku, `SKU : ${t.sku}`], [r.showMfg, `MFG : ${ee(t.manufacturing_date)}`], [r.showExp, `EXP : ${ee(t.expiry_date)}`]])
    u && a(l, e.size), s += Math.round(24 * e.fontRatio * r.lineHeight);
  return r.footer && a(r.footer, e.size), n;
}
function le(t, o, r) {
  if (t == null || t === "") return null;
  const e = Math.round(18 * r.fontRatio), n = Math.round(e * 1.6), i = Math.round((n - e) / 2), s = Math.max(0, r.unit(8) + r.shift + _(o.leftX, o));
  return {
    // Only the frame sits 5 dots right of the digits (requested placement).
    x: s,
    boxX: s + r.unit(5),
    y: Math.max(0, r.unit(28) - i + r.shift + _(o.leftY, o)),
    w: n,
    h: n,
    border: Math.max(1, Math.round(e / 9)),
    size: e,
    pad: i,
    text: String(t)
  };
}
const bt = (t) => {
  const o = String(t ?? ""), r = $e(o);
  return `${r === o ? "" : "^FH_"}^FD${r}^FS
`;
};
function ce(t, o) {
  const r = Math.max(1, o.column - o.textX - o.shift);
  return t.textWidth > 0 ? Math.max(1, Math.min(r, _(t.textWidth, t))) : r;
}
function He(t, o) {
  const r = j(o), e = ae(r), n = [], i = (s, a) => {
    const u = r.textWidth > 0 || s.lines > 1 || r.align !== "left", l = s.sequence ? `^FB${e.unit(40)},1,0,R` : u ? `^FB${ce(r, e)},${s.lines},0,${{ left: "L", center: "C", right: "R" }[r.align]}` : "", c = (m) => `^FO${m},${s.y}^A0N,${s.size},${s.size}${l}${bt(s.text)}`;
    return c(a + s.x) + (r.bold ? c(a + s.x + e.unit(1)) : "");
  };
  for (let s = 0; s < t.labels.length; s += r.columns) {
    let a = `^XA
^PW${e.column * r.columns + e.gap * (r.columns - 1)}
^LL${e.height}
`;
    for (let u = 0; u < r.columns && s + u < t.labels.length; u++) {
      const l = t.labels[s + u], c = u * (e.column + e.gap), m = ue(t, l.label_number ?? s + u + 1, r, e);
      m[0]?.sequence && (a += i(m.shift(), c));
      const f = le(l.adonan_ke ?? t.adonan_ke, r, e);
      if (f) {
        const d = c + f.x, M = (p) => `^FO${p},${f.y + f.pad}^A0N,${f.size},${f.size}^FB${f.w},1,0,C${bt(f.text)}`;
        a += `^FO${c + f.boxX},${f.y}^GB${f.w},${f.h},${f.border}^FS
` + M(d) + (r.bold ? M(d + e.unit(1)) : "");
      }
      a += `^FO${c + e.qrX},${e.qrY}^BQN,2,${e.qrScale}${bt(`QA,${l.qr_value}`)}`;
      for (const d of m) a += i(d, c);
    }
    n.push(a + `^XZ
`);
  }
  return n;
}
async function je(t, o) {
  const r = j(o), e = ae(r), n = (a) => a * 25.4 / r.dpi, i = [];
  for (let a = 0; a < t.labels.length; a += r.columns) {
    const u = await Promise.all(t.labels.slice(a, a + r.columns).map(async (l, c) => {
      const m = { errorCorrectionLevel: "Q", margin: 0 }, f = await Zt.toString(l.qr_value, { ...m, type: "svg" }), d = Zt.create(l.qr_value, m).modules.size * e.qrScale, M = ue(t, l.label_number ?? a + c + 1, r, e).map((b) => {
        const A = b.sequence ? e.unit(40) : ce(r, e), C = b.lines > 1, I = C || !b.sequence && r.textWidth > 0;
        return `<div class="label-text" style="left:${n(b.x)}mm;top:${n(b.y)}mm;font-size:${n(b.size)}mm;width:${n(A)}mm;text-align:${b.sequence ? "right" : r.align};font-weight:${r.bold ? 700 : 400};white-space:${C ? "normal" : "nowrap"};${I ? `overflow-wrap:anywhere;max-height:${n(b.size * b.lines)}mm;overflow:hidden;` : ""}">${te(b.text)}</div>`;
      }).join(""), p = le(l.adonan_ke ?? t.adonan_ke, r, e), N = (b) => `left:${n(b)}mm;top:${n(p.y)}mm;width:${n(p.w)}mm;height:${n(p.h)}mm`;
      return `<article>${p ? `<div class="adonan" style="${N(p.boxX)};border:${n(p.border)}mm solid #000"></div><div class="adonan" style="${N(p.x)};font-size:${n(p.size)}mm;font-weight:${r.bold ? 700 : 400}">${te(p.text)}</div>` : ""}<div class="qr" style="left:${n(e.qrX)}mm;top:${n(e.qrY)}mm;width:${n(d)}mm;height:${n(d)}mm">${f}</div>${M}</article>`;
    }));
    i.push(`<section>${u.join("")}</section>`);
  }
  const s = r.width * r.columns + r.gap * (r.columns - 1);
  return `<!doctype html><html lang="id"><head><meta charset="utf-8"><style>
    @page{size:${s}mm ${r.height}mm;margin:0}*{box-sizing:border-box}html,body{margin:0;padding:0;font-family:Arial,sans-serif;color:#000}
    section{width:${s}mm;height:${r.height}mm;display:flex;gap:${r.gap}mm;break-after:page;page-break-after:always}section:last-child{break-after:auto;page-break-after:auto}
    article{width:${r.width}mm;height:${r.height}mm;position:relative;overflow:hidden;flex-shrink:0;background:white}
    .qr,.label-text,.adonan{position:absolute}.adonan{display:flex;align-items:center;justify-content:center;font-family:Arial,sans-serif;line-height:1}.qr svg{width:100%;height:100%;display:block}.label-text{font-family:Arial,sans-serif;font-weight:700;line-height:1;white-space:nowrap}
    @media screen{body{background:#eee}section{margin-bottom:4px}}
    </style></head><body>${i.join("")}</body></html>`;
}
export {
  se as L,
  Ye as S,
  ge as a,
  je as b,
  He as c,
  ze as d,
  Fe as g,
  De as l,
  j as n,
  Oe as r,
  Ue as s
};

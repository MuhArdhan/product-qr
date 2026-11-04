import { reactive as be, unref as E, openBlock as g, createElementBlock as k, createElementVNode as o, createVNode as ie, createTextVNode as U, createCommentVNode as D, ref as A, computed as z, watch as ee, nextTick as te, Fragment as $, toDisplayString as y, withModifiers as G, withDirectives as q, vModelSelect as M, vModelText as V, renderList as R, onMounted as me, normalizeClass as ge } from "vue";
import { Printer as ke, QrCode as ve } from "lucide-vue-next";
import { g as ye, a as he, b as we, n as J, l as B, c as le, S as Ce, L as ne, d as W, s as Se, r as xe } from "./label-layout-DRPTv2NI.js";
function Ae(p) {
  return !!p?.displayUom && p.displayUom !== p.stockUom && Number.isFinite(p.qtyInPack) && p.qtyInPack > 0;
}
function ue(p) {
  return p.skipPrepacking ? p.postpacking : p.prepacking;
}
function Pe(p) {
  const u = Number(ue(p)?.goodQty), c = Ae(p) ? p.qtyInPack : 1;
  return Math.max(1, Math.ceil(u / c - 1e-8));
}
function re(p, u, c) {
  const t = Number(u), v = Number(c);
  if (u === "" || c === "" || !Number.isInteger(t) || !Number.isInteger(v)) return [];
  const [w, e] = t <= v ? [t, v] : [v, t];
  return [...new Set(p.map((n) => Number(n.label_number)))].filter((n) => n >= w && n <= e).sort((n, r) => n - r);
}
const O = be({ workOrder: "", labelCount: 0, afterSave: "" });
function _e(p, u, c = "") {
  O.workOrder = p, O.labelCount = u, O.afterSave = c;
}
const ce = (p, u) => {
  const c = p.__vccOpts || p;
  for (const [t, v] of u)
    c[t] = v;
  return c;
}, Le = {
  key: 0,
  class: "toolbar ws-label-actions"
}, Te = {
  __name: "WorkOrderLabelButton",
  props: { workOrder: { type: Object, required: !0 } },
  setup(p) {
    return (u, c) => E(ue)(p.workOrder)?.confirmed ? (g(), k("div", Le, [
      o("button", {
        class: "btn ws-label-print",
        type: "button",
        onClick: c[0] || (c[0] = (t) => E(_e)(p.workOrder.id, E(Pe)(p.workOrder)))
      }, [
        ie(E(ke), {
          size: 14,
          "stroke-width": 2
        }),
        c[1] || (c[1] = U(" Cetak Label ", -1))
      ])
    ])) : D("", !0);
  }
}, ln = /* @__PURE__ */ ce(Te, [["__scopeId", "data-v-c9012b16"]]);
function Ee(p) {
  throw new Error('Could not dynamically require "' + p + '". Please configure the dynamicRequireTargets or/and ignoreDynamicRequires option of @rollup/plugin-commonjs appropriately for this require call to work.');
}
var K = { exports: {} };
const Ne = {}, Oe = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Ne
}, Symbol.toStringTag, { value: "Module" })), Ue = /* @__PURE__ */ ye(Oe);
var ae;
function qe() {
  return ae || (ae = 1, (function(p, u) {
    var c = (function() {
      Array.isArray || (Array.isArray = function(e) {
        return Object.prototype.toString.call(e) === "[object Array]";
      }), Number.isInteger || (Number.isInteger = function(e) {
        return typeof e == "number" && isFinite(e) && Math.floor(e) === e;
      }), Array.from || (Array.from = function(e) {
        return [].slice.call(e);
      }), String.prototype.padStart || (String.prototype.padStart = function(n, r) {
        if (n = n >> 0, r = String(typeof r < "u" ? r : " "), this.length >= n)
          return String(this);
        for (var a = n - this.length, s = ""; s.length < a; )
          s += r;
        return s.slice(0, a) + String(this);
      });
      var t = {
        TITLE: "QZ Tray",
        VERSION: "2.2.6",
        //must match @version above
        DEBUG: !1,
        log: {
          /** Debugging messages */
          trace: function() {
            t.DEBUG && console.log.apply(console, arguments);
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
            t.DEBUG && console.warn.apply(console, arguments);
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
            webSocketPromise: function(e) {
              var n, r, a;
              return t.tools.promise(function(s, f) {
                n = new t.tools.ws(e), t.websocket.connection = n, a = function() {
                  s(n);
                }, r = function(b) {
                  t.websocket.connection = null, f(b);
                }, n.addEventListener("open", a), n.addEventListener("error", r), n.addEventListener("close", r);
              }).finally(function() {
                n.removeEventListener("open", a), n.removeEventListener("error", r), n.removeEventListener("close", r);
              });
            },
            connectToAddress: function(e) {
              var n = t.tools.getLna();
              t.log.trace("Attempting connection", e);
              var r;
              return n ? (t.log.trace("Connecting with lna.js"), r = n.detectLna(e, t.websocket.setup.webSocketPromise, {
                isWebSocket: !0,
                defaultAddressSpace: "public"
              })) : (t.log.trace("Connecting without lna.js"), r = t.websocket.setup.webSocketPromise(e)), r.catch(function(a) {
                var s = a.denied ? "Connection attempt denied by Local Network Access restrictions" : "Unable to establish connection with " + t.TITLE, f = new Error(s);
                throw n && a instanceof n.LnaError && (f.denied = a.denied, f.permission = a.permission), f;
              });
            },
            /** Loop through possible ports to open connection, sets web socket calls that will settle the promise. */
            findConnection: function(e, n, r) {
              if (t.websocket.shutdown) {
                r(new Error("Connection attempt cancelled by user"));
                return;
              }
              if (e.port.secure.length)
                !e.port.insecure.length && !e.usingSecure && (t.log.trace("No insecure ports specified - forcing secure connection"), e.usingSecure = !0);
              else if (e.port.insecure.length)
                e.usingSecure && (t.log.error("No secure ports specified - forcing insecure connection"), e.usingSecure = !1);
              else {
                r(new Error("No ports have been specified to connect over"));
                return;
              }
              var a = function(b) {
                if (t.websocket.shutdown) {
                  r(new Error("Connection attempt cancelled by user"));
                  return;
                }
                if (b.denied) {
                  r(b);
                  return;
                }
                if (e.port.portIndex++, e.usingSecure && e.port.portIndex >= e.port.secure.length || !e.usingSecure && e.port.portIndex >= e.port.insecure.length)
                  if (e.hostIndex >= e.host.length - 1) {
                    r(b);
                    return;
                  } else
                    e.hostIndex++, e.port.portIndex = 0;
                t.websocket.setup.findConnection(e, n, r);
              }, s;
              e.usingSecure ? s = e.protocol.secure + e.host[e.hostIndex] + ":" + e.port.secure[e.port.portIndex] : s = e.protocol.insecure + e.host[e.hostIndex] + ":" + e.port.insecure[e.port.portIndex];
              var f = t.websocket.setup.connectToAddress(s);
              f.then(
                //called on successful connection to qz, begins setup of websocket calls and resolves connect promise after certificate is sent
                function() {
                  if (t.log.info("Established connection with " + t.TITLE + " on " + s), t.websocket.setup.openConnection({ resolve: n, reject: r }), e.keepAlive > 0) {
                    var b = setInterval(function() {
                      if (!t.tools.isActive() || t.websocket.connection.interval !== b) {
                        clearInterval(b);
                        return;
                      }
                      t.websocket.connection.send("ping");
                    }, e.keepAlive * 1e3);
                    t.websocket.connection.interval = b;
                  }
                },
                //called for errors during setup (such as invalid ports), reject connect promise only if all ports have been tried
                function(b) {
                  t.log.trace(b), a(b);
                }
              );
            },
            /** Finish setting calls on successful connection, sets web socket calls that won't settle the promise. */
            openConnection: function(e) {
              t.websocket.connection.onclose = function(r) {
                t.log.trace(r), t.websocket.connection = null, t.websocket.callClose(r), t.log.info("Closed connection with " + t.TITLE);
                for (var a in t.websocket.pendingCalls)
                  t.websocket.pendingCalls.hasOwnProperty(a) && t.websocket.pendingCalls[a].reject(new Error("Connection closed before response received"));
                this.promise != null && this.promise.resolve();
              }, t.websocket.connection.onerror = function(r) {
                t.websocket.callError(r);
              }, t.websocket.connection.sendData = function(r) {
                t.log.trace("Preparing object for websocket", r), r.timestamp == null && (r.timestamp = Date.now(), typeof r.timestamp != "number" && (r.timestamp = (/* @__PURE__ */ new Date()).getTime())), r.promise != null && (r.uid = t.websocket.setup.newUID(), t.websocket.pendingCalls[r.uid] = r.promise), r.position = {
                  x: typeof screen < "u" ? (screen.availWidth || screen.width) / 2 + (screen.left || screen.availLeft || 0) : 0,
                  y: typeof screen < "u" ? (screen.availHeight || screen.height) / 2 + (screen.top || screen.availTop || 0) : 0
                };
                try {
                  if (r.call != null && r.signature == null && t.security.needsSigned(r.call)) {
                    var a = {
                      call: r.call,
                      params: r.params,
                      timestamp: r.timestamp
                    }, s = t.tools.hash(t.tools.stringify(a));
                    s.then || (s = t.tools.promise(function(f) {
                      f(s);
                    })), s.then(function(f) {
                      return t.security.callSign(f);
                    }).then(function(f) {
                      t.log.trace("Signature for call", f), r.signature = f || "", r.signAlgorithm = t.security.signAlgorithm, t.signContent = void 0, t.websocket.connection.send(t.tools.stringify(r));
                    }).catch(function(f) {
                      t.log.error("Signing failed", f), r.promise != null && (r.promise.reject(new Error("Failed to sign request")), delete t.websocket.pendingCalls[r.uid]);
                    });
                  } else
                    t.log.trace("Signature for call", r.signature), t.websocket.connection.send(t.tools.stringify(r));
                } catch (f) {
                  t.log.error(f), r.promise != null && (r.promise.reject(f), delete t.websocket.pendingCalls[r.uid]);
                }
              }, t.websocket.connection.onmessage = function(r) {
                var a = JSON.parse(r.data);
                if (a.uid == null) {
                  if (a.type == null)
                    t.websocket.connection.close(4003, "Connected to incompatible " + t.TITLE + " version");
                  else
                    switch (a.type) {
                      case t.streams.serial:
                        a.event || (a.event = JSON.stringify({ portName: a.key, output: a.data })), t.serial.callSerial(JSON.parse(a.event));
                        break;
                      case t.streams.socket:
                        t.socket.callSocket(JSON.parse(a.event));
                        break;
                      case t.streams.usb:
                        a.event || (a.event = JSON.stringify({ vendorId: a.key[0], productId: a.key[1], output: a.data })), t.usb.callUsb(JSON.parse(a.event));
                        break;
                      case t.streams.hid:
                        t.hid.callHid(JSON.parse(a.event));
                        break;
                      case t.streams.printer:
                        t.printers.callPrinter(JSON.parse(a.event));
                        break;
                      case t.streams.file:
                        t.file.callFile(JSON.parse(a.event));
                        break;
                      default:
                        t.log.allay("Cannot determine stream type for callback", a);
                        break;
                    }
                  return;
                }
                t.log.trace("Received response from websocket", a);
                var s = t.websocket.pendingCalls[a.uid];
                s == null ? t.log.allay("No promise found for returned response") : a.error != null ? s.reject(new Error(a.error)) : s.resolve(a.result), delete t.websocket.pendingCalls[a.uid];
              };
              function n(r) {
                r === void 0 && (r = null), w.api.getVersion().then(function(a) {
                  t.websocket.connection.version = a, t.websocket.connection.semver = a.toLowerCase().replace(/-rc\./g, "-rc").split(/[\\+\\.-]/g);
                  for (var s = 0; s < t.websocket.connection.semver.length; s++) {
                    try {
                      if (s == 3 && t.websocket.connection.semver[s].toLowerCase().indexOf("rc") == 0) {
                        t.websocket.connection.semver[s] = -t.websocket.connection.semver[s].replace(/\D/g, "");
                        continue;
                      }
                      t.websocket.connection.semver[s] = parseInt(t.websocket.connection.semver[s]);
                    } catch {
                    }
                    t.websocket.connection.semver.length < 4 && (t.websocket.connection.semver[3] = 0);
                  }
                  t.compatible.algorithm(!0);
                }).then(function() {
                  t.websocket.connection.sendData({ certificate: r, promise: e });
                });
              }
              t.security.callCert().then(n).catch(function(r) {
                t.log.warn("Failed to get certificate:", r), t.security.rejectOnCertFailure ? e.reject(r) : n(null);
              });
            },
            /** Generate unique ID used to map a response to a call. */
            newUID: function() {
              var e = 6;
              return (new Array(e + 1).join("0") + (Math.random() * Math.pow(36, e) << 0).toString(36)).slice(-e);
            }
          },
          dataPromise: function(e, n, r, a) {
            return t.tools.promise(function(s, f) {
              var b = {
                call: e,
                promise: { resolve: s, reject: f },
                params: n,
                signature: r,
                timestamp: a
              };
              t.websocket.connection.sendData(b);
            });
          },
          /** Library of promises awaiting a response, uid -> promise */
          pendingCalls: {},
          /** List of functions to call on error from the websocket. */
          errorCallbacks: [],
          /** Calls all functions registered to listen for errors. */
          callError: function(e) {
            if (Array.isArray(t.websocket.errorCallbacks))
              for (var n = 0; n < t.websocket.errorCallbacks.length; n++)
                t.websocket.errorCallbacks[n](e);
            else
              t.websocket.errorCallbacks(e);
          },
          /** List of function to call on closing from the websocket. */
          closedCallbacks: [],
          /** Calls all functions registered to listen for closing. */
          callClose: function(e) {
            if (Array.isArray(t.websocket.closedCallbacks))
              for (var n = 0; n < t.websocket.closedCallbacks.length; n++)
                t.websocket.closedCallbacks[n](e);
            else
              t.websocket.closedCallbacks(e);
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
          callSerial: function(e) {
            if (Array.isArray(t.serial.serialCallbacks))
              for (var n = 0; n < t.serial.serialCallbacks.length; n++)
                t.serial.serialCallbacks[n](e);
            else
              t.serial.serialCallbacks(e);
          }
        },
        socket: {
          /** List of functions called when receiving data from network socket connection. */
          socketCallbacks: [],
          /** Calls all functions registered to listen for network socket events. */
          callSocket: function(e) {
            if (Array.isArray(t.socket.socketCallbacks))
              for (var n = 0; n < t.socket.socketCallbacks.length; n++)
                t.socket.socketCallbacks[n](e);
            else
              t.socket.socketCallbacks(e);
          }
        },
        usb: {
          /** List of functions called when receiving data from usb connection. */
          usbCallbacks: [],
          /** Calls all functions registered to listen for usb events. */
          callUsb: function(e) {
            if (Array.isArray(t.usb.usbCallbacks))
              for (var n = 0; n < t.usb.usbCallbacks.length; n++)
                t.usb.usbCallbacks[n](e);
            else
              t.usb.usbCallbacks(e);
          }
        },
        hid: {
          /** List of functions called when receiving data from hid connection. */
          hidCallbacks: [],
          /** Calls all functions registered to listen for hid events. */
          callHid: function(e) {
            if (Array.isArray(t.hid.hidCallbacks))
              for (var n = 0; n < t.hid.hidCallbacks.length; n++)
                t.hid.hidCallbacks[n](e);
            else
              t.hid.hidCallbacks(e);
          }
        },
        printers: {
          /** List of functions called when receiving data from printer connection. */
          printerCallbacks: [],
          /** Calls all functions registered to listen for printer events. */
          callPrinter: function(e) {
            if (Array.isArray(t.printers.printerCallbacks))
              for (var n = 0; n < t.printers.printerCallbacks.length; n++)
                t.printers.printerCallbacks[n](e);
            else
              t.printers.printerCallbacks(e);
          }
        },
        file: {
          /** List of functions called when receiving info regarding file changes. */
          fileCallbacks: [],
          /** Calls all functions registered to listen for file events. */
          callFile: function(e) {
            if (Array.isArray(t.file.fileCallbacks))
              for (var n = 0; n < t.file.fileCallbacks.length; n++)
                t.file.fileCallbacks[n](e);
            else
              t.file.fileCallbacks(e);
          }
        },
        security: {
          /** Function used to resolve promise when acquiring site's public certificate. */
          certHandler: function(e, n) {
            n();
          },
          /** Called to create new promise (using {@link _qz.security.certHandler}) for certificate retrieval. */
          callCert: function() {
            return typeof t.security.certHandler.then == "function" ? t.security.certHandler : t.security.certHandler.constructor.name === "AsyncFunction" ? t.security.certHandler() : t.tools.promise(t.security.certHandler);
          },
          /** Function used to create promise resolver when requiring signed calls. */
          signatureFactory: function() {
            return function(e) {
              e();
            };
          },
          /** Called to create new promise (using {@link _qz.security.signatureFactory}) for signed calls. */
          callSign: function(e) {
            return t.security.signatureFactory.constructor.name === "AsyncFunction" ? t.security.signatureFactory(e) : t.tools.promise(t.security.signatureFactory(e));
          },
          /** Signing algorithm used on signatures */
          signAlgorithm: "SHA1",
          rejectOnCertFailure: !1,
          needsSigned: function(e) {
            const n = [
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
            return e != null && n.indexOf(e) === -1;
          }
        },
        tools: {
          /** Create a new promise */
          promise: function(e) {
            if (typeof RSVP < "u")
              return new RSVP.Promise(e);
            if (typeof Promise < "u")
              return new Promise(e);
            t.log.error("Promise/A+ support is required.  See qz.api.setPromiseType(...)");
          },
          /** Stub for rejecting with an Error from withing a Promise */
          reject: function(e) {
            return t.tools.promise(function(n, r) {
              r(e);
            });
          },
          stringify: function(e) {
            var n = Array.prototype.toJSON;
            delete Array.prototype.toJSON;
            function r(s, f) {
              if (s !== "promise")
                return f;
            }
            var a = JSON.stringify(e, r);
            return n && (Array.prototype.toJSON = n), a;
          },
          hash: function(e) {
            return typeof Sha256 < "u" ? Sha256.hash(e) : t.SHA.hash(e);
          },
          ws: typeof WebSocket < "u" ? WebSocket : null,
          lna: void 0,
          getLna: function() {
            return t.tools.lna === void 0 && (t.tools.lna = t.tools.loadLna() || null), t.tools.lna;
          },
          loadLna: function() {
            if (!(typeof self > "u")) {
              if (self.lna && self.lna.detectLna)
                return self.lna;
              if (typeof Ee == "function")
                try {
                  return require("lna");
                } catch (e) {
                  t.log.warn("Unable to load LNA library", e);
                }
            }
          },
          /**
           * Normalize a host string by appending a "surf"" tld if necessary.
           * Ignored if "usingSurf" is set to false
           */
          appendSurf: function(e) {
            return t.tools.isQualified(e) ? e : e + "." + t.websocket.connectConfig.surfDomain;
          },
          /**
           * Returns if the provided hostname is fully-qualified either as a domain
           * name or as an ip address. Used to determine whether to append a "surf" suffix
           * (e.g. ".qz.surf") at the end.
           */
          isQualified: function(e) {
            return e.toLowerCase() === "localhost" || e.indexOf(".") !== -1 || e.indexOf(":") !== -1;
          },
          absolute: function(e) {
            if (typeof window < "u" && typeof document.createElement == "function") {
              var n = document.createElement("a");
              return n.href = e, n.href;
            } else
              return Ue.resolve(e);
          },
          relative: function(e) {
            for (var n = 0; n < e.length; n++)
              if (e[n].constructor === Object) {
                var r = !1;
                e[n].data && e[n].data.search && e[n].data.search(/data:image\/\w+;base64,/) === 0 ? (e[n].flavor = "base64", e[n].data = e[n].data.replace(/^data:image\/\w+;base64,/, "")) : e[n].flavor ? ["FILE", "XML"].indexOf(e[n].flavor.toUpperCase()) > -1 && (r = !0) : (e[n].format && ["HTML", "IMAGE", "PDF", "FILE", "XML"].indexOf(e[n].format.toUpperCase()) > -1 || e[n].type && (["PIXEL", "IMAGE", "PDF"].indexOf(e[n].type.toUpperCase()) > -1 && !e[n].format || ["HTML", "PDF"].indexOf(e[n].type.toUpperCase()) > -1 && (!e[n].format || e[n].format.toUpperCase() === "FILE"))) && (r = !0), r && (e[n].data = t.tools.absolute(e[n].data)), e[n].options && typeof e[n].options.overlay == "string" && (e[n].options.overlay = t.tools.absolute(e[n].options.overlay));
              }
          },
          /** Performs deep copy to target from remaining params */
          extend: function(e) {
            typeof e != "object" && (e = {});
            for (var n = 1; n < arguments.length; n++) {
              var r = arguments[n];
              if (r) {
                for (var a in r)
                  if (r.hasOwnProperty(a)) {
                    if (e === r[a])
                      continue;
                    if (r[a] && r[a].constructor && r[a].constructor === Object) {
                      var s;
                      Array.isArray(r[a]) ? s = e[a] || [] : s = e[a] || {}, e[a] = t.tools.extend(s, r[a]);
                    } else r[a] !== void 0 && (e[a] = r[a]);
                  }
              }
            }
            return e;
          },
          versionCompare: function(e, n, r, a) {
            if (t.tools.assertActive()) {
              var s = t.websocket.connection.semver;
              if (Array.isArray(s)) {
                if (e != null && s.length > 0 && s[0] != e)
                  return s[0] - e;
                if (n != null && s.length > 1 && s[1] != n)
                  return s[1] - n;
                if (r != null && s.length > 2 && s[2] != r)
                  return s[2] - r;
                if (a != null && s.length > 3 && s[3] != a)
                  return Number.isInteger(s[3]) && Number.isInteger(a) ? s[3] - a : s[3].toString().localeCompare(a.toString());
              }
              return 0;
            }
          },
          isVersion: function(e, n, r, a) {
            return t.tools.versionCompare(e, n, r, a) == 0;
          },
          isActive: function() {
            return !t.websocket.shutdown && t.websocket.connection != null && t.websocket.connection.readyState === t.tools.ws.OPEN;
          },
          assertActive: function() {
            if (t.tools.isActive())
              return !0;
            throw new Error("A connection to " + t.TITLE + " has not been established yet");
          },
          uint8ArrayToHex: function(e) {
            return Array.from(e).map(function(n) {
              return n.toString(16).padStart(2, "0");
            }).join("");
          },
          uint8ArrayToBase64: function(e) {
            var n = [
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
            ], r = "", a, s = e.length;
            for (a = 2; a < s; a += 3)
              r += n[e[a - 2] >> 2], r += n[(e[a - 2] & 3) << 4 | e[a - 1] >> 4], r += n[(e[a - 1] & 15) << 2 | e[a] >> 6], r += n[e[a] & 63];
            return a === s + 1 && (r += n[e[a - 2] >> 2], r += n[(e[a - 2] & 3) << 4], r += "=="), a === s && (r += n[e[a - 2] >> 2], r += n[(e[a - 2] & 3) << 4 | e[a - 1] >> 4], r += n[(e[a - 1] & 15) << 2], r += "="), r;
          }
        },
        compatible: {
          /** Converts message format to a previous version's */
          data: function(e) {
            for (var n = 0; n < e.length; n++)
              if (e[n].constructor === Object && e[n].data instanceof Uint8Array && e[n].flavor) {
                var r = e[n].flavor.toString().toUpperCase();
                switch (r) {
                  case "BASE64":
                    e[n].data = t.tools.uint8ArrayToBase64(e[n].data);
                    break;
                  case "HEX":
                    e[n].data = t.tools.uint8ArrayToHex(e[n].data);
                    break;
                  default:
                    throw new Error("Uint8Array conversion to '" + r + "' is not supported.");
                }
              }
            if (t.tools.versionCompare(2, 2, 4) < 0)
              for (var n = 0; n < e.length; n++)
                e[n].constructor === Object && e[n].options && typeof e[n].options.dotDensity == "string" && (e[n].options.dotDensity = e[n].options.dotDensity.toLowerCase().replace("-legacy", ""));
            if (t.tools.isVersion(2, 0)) {
              t.log.trace("Converting print data to v2.0 for " + t.websocket.connection.version);
              for (var n = 0; n < e.length; n++)
                e[n].constructor === Object && (e[n].type && e[n].type.toUpperCase() === "RAW" && e[n].format && e[n].format.toUpperCase() === "IMAGE" && (e[n].flavor && e[n].flavor.toUpperCase() === "BASE64" && (e[n].data = "data:image/compat;base64," + e[n].data), e[n].flavor = "IMAGE"), (e[n].type && e[n].type.toUpperCase() === "RAW" || e[n].format && e[n].format.toUpperCase() === "COMMAND") && (e[n].format = "RAW"), e[n].type = e[n].format, e[n].format = e[n].flavor, delete e[n].flavor);
            }
          },
          /* Converts config defaults to match previous version */
          config: function(e, n) {
            return t.tools.isVersion(2, 0) && (n.rasterize || (e.rasterize = !0)), t.tools.versionCompare(2, 2) < 0 && e.forceRaw !== "undefined" && (e.altPrinting = e.forceRaw, delete e.forceRaw), t.tools.versionCompare(2, 1, 2, 11) < 0 && e.spool && (e.spool.size && (e.perSpool = e.spool.size, delete e.spool.size), e.spool.end && (e.endOfDoc = e.spool.end, delete e.spool.end), delete e.spool), e;
          },
          /** Compat wrapper with previous version **/
          networking: function(e, n, r, a, s) {
            return t.tools.isVersion(2, 0) ? t.tools.promise(function(f, b) {
              t.websocket.dataPromise("websocket.getNetworkInfo", {
                hostname: e,
                port: n
              }, r, a).then(function(S) {
                f(typeof s < "u" ? s(S) : S);
              }, b);
            }) : t.tools.promise(function(f, b) {
              t.websocket.dataPromise("networking.device", {
                hostname: e,
                port: n
              }, r, a).then(function(S) {
                f({ ipAddress: S.ip, macAddress: S.mac });
              }, b);
            });
          },
          /** Check if QZ version supports chosen algorithm */
          algorithm: function(e) {
            return t.tools.isActive() && t.websocket.connection.semver && t.tools.isVersion(2, 0) ? (e || t.log.warn("Connected to an older version of " + t.TITLE + ", alternate signature algorithms are not supported"), !1) : !0;
          }
        },
        /**
         * Adapted from Chris Veness's code under MIT Licence (C) 2002
         * see http://www.movable-type.co.uk/scripts/sha256.html
         */
        SHA: {
          //@formatter:off - keep this block compact
          hash: function(e) {
            e = t.SHA._utf8Encode(e) + "";
            for (var n = [
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
            ], r = [1779033703, 3144134277, 1013904242, 2773480762, 1359893119, 2600822924, 528734635, 1541459225], a = e.length / 4 + 2, s = Math.ceil(a / 16), f = new Array(s), b = 0; b < s; b++) {
              f[b] = new Array(16);
              for (var S = 0; S < 16; S++)
                f[b][S] = e.charCodeAt(b * 64 + S * 4) << 24 | e.charCodeAt(b * 64 + S * 4 + 1) << 16 | e.charCodeAt(b * 64 + S * 4 + 2) << 8 | e.charCodeAt(b * 64 + S * 4 + 3);
            }
            f[s - 1][14] = (e.length - 1) * 8 / Math.pow(2, 32), f[s - 1][14] = Math.floor(f[s - 1][14]), f[s - 1][15] = (e.length - 1) * 8 & 4294967295;
            for (var x = new Array(64), P, _, T, h, L, H, C, d, b = 0; b < s; b++) {
              for (var i = 0; i < 16; i++)
                x[i] = f[b][i];
              for (var i = 16; i < 64; i++)
                x[i] = t.SHA._dev1(x[i - 2]) + x[i - 7] + t.SHA._dev0(x[i - 15]) + x[i - 16] & 4294967295;
              P = r[0], _ = r[1], T = r[2], h = r[3], L = r[4], H = r[5], C = r[6], d = r[7];
              for (var i = 0; i < 64; i++) {
                var N = d + t.SHA._sig1(L) + t.SHA._ch(L, H, C) + n[i] + x[i], j = t.SHA._sig0(P) + t.SHA._maj(P, _, T);
                d = C, C = H, H = L, L = h + N & 4294967295, h = T, T = _, _ = P, P = N + j & 4294967295;
              }
              r[0] = r[0] + P & 4294967295, r[1] = r[1] + _ & 4294967295, r[2] = r[2] + T & 4294967295, r[3] = r[3] + h & 4294967295, r[4] = r[4] + L & 4294967295, r[5] = r[5] + H & 4294967295, r[6] = r[6] + C & 4294967295, r[7] = r[7] + d & 4294967295;
            }
            return t.SHA._hexStr(r[0]) + t.SHA._hexStr(r[1]) + t.SHA._hexStr(r[2]) + t.SHA._hexStr(r[3]) + t.SHA._hexStr(r[4]) + t.SHA._hexStr(r[5]) + t.SHA._hexStr(r[6]) + t.SHA._hexStr(r[7]);
          },
          // Rotates right (circular right shift) value x by n positions
          _rotr: function(e, n) {
            return n >>> e | n << 32 - e;
          },
          // logical functions
          _sig0: function(e) {
            return t.SHA._rotr(2, e) ^ t.SHA._rotr(13, e) ^ t.SHA._rotr(22, e);
          },
          _sig1: function(e) {
            return t.SHA._rotr(6, e) ^ t.SHA._rotr(11, e) ^ t.SHA._rotr(25, e);
          },
          _dev0: function(e) {
            return t.SHA._rotr(7, e) ^ t.SHA._rotr(18, e) ^ e >>> 3;
          },
          _dev1: function(e) {
            return t.SHA._rotr(17, e) ^ t.SHA._rotr(19, e) ^ e >>> 10;
          },
          _ch: function(e, n, r) {
            return e & n ^ ~e & r;
          },
          _maj: function(e, n, r) {
            return e & n ^ e & r ^ n & r;
          },
          // note can't use toString(16) as it is implementation-dependant, and in IE returns signed numbers when used on full words
          _hexStr: function(e) {
            for (var n = "", r, a = 7; a >= 0; a--)
              r = e >>> a * 4 & 15, n += r.toString(16);
            return n;
          },
          // implementation of deprecated unescape() based on https://cwestblog.com/2011/05/23/escape-unescape-deprecated/ (and comments)
          _unescape: function(e) {
            return e.replace(/%(u[\da-f]{4}|[\da-f]{2})/gi, function(n) {
              if (n.length - 1)
                return String.fromCharCode(parseInt(n.substring(n.length - 3 ? 2 : 1), 16));
              var r = n.charCodeAt(0);
              return r < 256 ? "%" + (0 + r.toString(16)).slice(-2).toUpperCase() : "%u" + ("000" + r.toString(16)).slice(-4).toUpperCase();
            });
          },
          _utf8Encode: function(e) {
            return t.SHA._unescape(encodeURIComponent(e));
          }
          //@formatter:on
        }
      };
      function v(e, n) {
        this.config = t.tools.extend({}, t.printing.defaultConfig), this._dirtyOpts = {}, this.setPrinter = function(r) {
          typeof r == "string" && (r = { name: r }), this.printer = r;
        }, this.getPrinter = function() {
          return this.printer;
        }, this.reconfigure = function(r) {
          for (var a in r)
            r[a] !== void 0 && (this._dirtyOpts[a] = !0);
          t.tools.extend(this.config, r);
        }, this.getOptions = function() {
          return t.compatible.config(this.config, this._dirtyOpts);
        }, this.setPrinter(e), this.reconfigure(n);
      }
      v.prototype.print = function(e, n, r) {
        w.print(this, e, n, r);
      };
      var w = {
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
            return t.tools.isActive();
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
          connect: function(e) {
            return t.tools.promise(function(n, r) {
              if (t.websocket.connection) {
                const f = t.websocket.connection.readyState;
                if (f === t.tools.ws.OPEN) {
                  r(new Error("An open connection with " + t.TITLE + " already exists"));
                  return;
                } else if (f === t.tools.ws.CONNECTING) {
                  r(new Error("The current connection attempt has not returned yet"));
                  return;
                } else if (f === t.tools.ws.CLOSING) {
                  r(new Error("Waiting for previous disconnect request to complete"));
                  return;
                }
              }
              if (t.tools.ws) {
                if (!t.tools.ws.CLOSED || t.tools.ws.CLOSED == 2) {
                  r(new Error("Unsupported WebSocket version detected: HyBi-00/Hixie-76"));
                  return;
                }
              } else {
                r(new Error("WebSocket not supported by this browser"));
                return;
              }
              if (e == null && (e = {}), (typeof location > "u" || location.protocol !== "https:") && typeof e.usingSecure > "u" && (t.log.trace("Disabling secure ports due to insecure page"), e.usingSecure = !1), typeof e.host < "u" && !Array.isArray(e.host) && (e.host = [e.host], t.websocket.connectConfig.usingSurf))
                for (var a = 0; a < e.host.length; a++)
                  e.host[a] = t.tools.appendSurf(e.host[a]);
              t.websocket.shutdown = !1;
              var s = function(f) {
                var b = !1, S = function() {
                  b || (b = !0, e && f < e.retries ? s(f + 1) : (t.websocket.connection = null, r.apply(null, arguments)));
                }, x = function() {
                  var P = t.tools.extend({}, t.websocket.connectConfig, e);
                  t.websocket.setup.findConnection(P, n, S);
                };
                f == 0 ? x() : setTimeout(x, e.delay * 1e3);
              };
              s(0);
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
            return t.tools.promise(function(e, n) {
              t.websocket.connection != null ? t.tools.isActive() || t.websocket.connection.readyState === t.tools.ws.CONNECTING ? (t.websocket.shutdown = !0, t.websocket.connection.promise = { resolve: e, reject: n }, t.websocket.connection.close()) : n(new Error("Current connection is still closing")) : n(new Error("No open connection with " + t.TITLE));
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
          setErrorCallbacks: function(e) {
            t.websocket.errorCallbacks = e;
          },
          /**
           * List of functions called for any connection closing event outside of an API call.<p/>
           * Also called when {@link websocket#disconnect} is called.
           *
           * @param {Function|Array<Function>} calls Single or array of <code>Function({Event} event)</code> calls.
           *
           * @memberof qz.websocket
           */
          setClosedCallbacks: function(e) {
            t.websocket.closedCallbacks = e;
          },
          /**
           * Whether to append the "surf" domain (e.g. "qz.surf") to the end of non-qualified hosts (except "localhost")
           *
           * @param {boolean} usingSurf=true Toggles automatic "surf" domain appending
           * @since 2.2.6
           *
           * @memberof qz.websocket
           */
          setUsingSurf: function(e) {
            t.websocket.connectConfig.usingSurf = e;
          },
          /**
           * The domain to automagically append to non-qualified hosts, such as "qz.surf", or "example.com"
           *
           * @param {string} surfDomain="qz.surf" The domain to append to non-qualified hosts.
           * @since 2.2.6
           *
           * @memberof qz.websocket
           */
          setSurfDomain: function(e) {
            e.indexOf(".") === 0 && (e = e.substring(1)), t.websocket.connectConfig.surfDomain = e;
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
          getNetworkInfo: t.compatible.networking,
          /**
           * @returns {Object<{socket: String, host: String, port: Number}>} Details of active websocket connection
           *
           * @memberof qz.websocket
           */
          getConnectionInfo: function() {
            if (t.tools.assertActive()) {
              var e = t.websocket.connection.url.split(/[:\/]+/g);
              return { socket: e[0], host: e[1], port: +e[2] };
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
          getDefault: function(e, n) {
            return t.websocket.dataPromise("printers.getDefault", null, e, n);
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
          find: function(e, n, r) {
            return t.websocket.dataPromise("printers.find", { query: e }, n, r);
          },
          /**
           * Provides a list, with additional information, for each printer available to QZ.
           *
           * @returns {Promise<Array<Object>|Object|Error>}
           *
           * @memberof qz.printers
           */
          details: function() {
            return t.websocket.dataPromise("printers.detail");
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
          startListening: function(e, n) {
            Array.isArray(e) || (e = [e]);
            var r = {
              printerNames: e
            };
            return n && n.jobData == !0 && (r.jobData = !0), n && n.maxJobData && (r.maxJobData = n.maxJobData), n && n.flavor && (r.flavor = n.flavor), t.websocket.dataPromise("printers.startListening", r);
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
          clearQueue: function(e) {
            return typeof e != "object" && (e = {
              printerName: e
            }), t.websocket.dataPromise("printers.clearQueue", e);
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
            return t.websocket.dataPromise("printers.stopListening");
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
            return t.websocket.dataPromise("printers.getStatus");
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
          setPrinterCallbacks: function(e) {
            t.printers.printerCallbacks = e;
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
          setDefaults: function(e) {
            t.tools.extend(t.printing.defaultConfig, e);
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
          create: function(e, n) {
            return new v(e, n);
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
        print: function(e, n) {
          var r = !1, a = [], s = [];
          arguments.length >= 3 && (typeof arguments[2] == "boolean" ? (r = arguments[2], arguments.length >= 5 && (a = arguments[3], s = arguments[4])) : arguments.length >= 4 && (a = arguments[2], s = arguments[3]), a && !Array.isArray(a) && (a = [a]), s && !Array.isArray(s) && (s = [s])), Array.isArray(e) || (e = [e]), Array.isArray(n[0]) || (n = [n]);
          for (var f = 0; f < n.length; f++)
            t.tools.relative(n[f]), t.compatible.data(n[f]);
          for (var b = function(h) {
            var L = {
              printer: h.config.getPrinter(),
              options: h.config.getOptions(),
              data: h.data
            };
            return t.websocket.dataPromise("print", L, h.signature, h.timestamp);
          }, S = [], x = 0; x < e.length || x < n.length; x++)
            (function(h) {
              var L = {
                config: e[Math.min(h, e.length - 1)],
                data: n[Math.min(h, n.length - 1)],
                signature: a[h],
                timestamp: s[h]
              };
              S.push(function() {
                return b(L);
              });
            })(x);
          var P = null;
          if (r) {
            var _ = [];
            P = function(h) {
              _.push(h);
            }, S.push(function() {
              return t.tools.promise(function(h, L) {
                _.length ? L(_) : h();
              });
            });
          }
          var T = null;
          return S.reduce(function(h, L) {
            return T = h.catch(P).then(L), T;
          }, t.tools.promise(function(h) {
            h();
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
            return t.websocket.dataPromise("serial.findPorts");
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
          setSerialCallbacks: function(e) {
            t.serial.serialCallbacks = e;
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
          openPort: function(e, n) {
            var r = {
              port: e,
              options: n
            };
            return t.websocket.dataPromise("serial.openPort", r);
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
          sendData: function(e, n, r) {
            t.tools.versionCompare(2, 1, 0, 12) >= 0 && (typeof n != "object" && (n = {
              data: n,
              type: "PLAIN"
            }), n.type && n.type.toUpperCase() == "FILE" && (n.data = t.tools.absolute(n.data)));
            var a = {
              port: e,
              data: n,
              options: r
            };
            return t.websocket.dataPromise("serial.sendData", a);
          },
          /**
           * @param {string} port Name of port to close.
           *
           * @returns {Promise<null|Error>}
           *
           * @memberof qz.serial
           */
          closePort: function(e) {
            return t.websocket.dataPromise("serial.closePort", { port: e });
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
          open: function(e, n, r) {
            var a = {
              host: e,
              port: n,
              options: r
            };
            return t.websocket.dataPromise("socket.open", a);
          },
          /**
           * @param {string} host The connection hostname.
           * @param {number} port The connection port number.
           *
           * @memberof qz.socket
           */
          close: function(e, n) {
            var r = {
              host: e,
              port: n
            };
            return t.websocket.dataPromise("socket.close", r);
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
          sendData: function(e, n, r) {
            typeof r != "object" && (r = {
              data: r,
              type: "PLAIN"
            });
            var a = {
              host: e,
              port: n,
              data: r
            };
            return t.websocket.dataPromise("socket.sendData", a);
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
          setSocketCallbacks: function(e) {
            t.socket.socketCallbacks = e;
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
          listDevices: function(e) {
            return t.websocket.dataPromise("usb.listDevices", { includeHubs: e });
          },
          /**
           * @param {object} deviceInfo Config details of the HID device.
           *  @param deviceInfo.vendorId Hex string of USB device's vendor ID.
           *  @param deviceInfo.productId Hex string of USB device's product ID.
           * @returns {Promise<Array<string>|Error>} List of available (hexadecimal) interfaces on a USB device.
           *
           * @memberof qz.usb
           */
          listInterfaces: function(e) {
            return typeof e != "object" && (e = { vendorId: arguments[0], productId: arguments[1] }), t.websocket.dataPromise("usb.listInterfaces", e);
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
          listEndpoints: function(e) {
            return typeof e != "object" && (e = {
              vendorId: arguments[0],
              productId: arguments[1],
              interface: arguments[2]
            }), t.websocket.dataPromise("usb.listEndpoints", e);
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
          setUsbCallbacks: function(e) {
            t.usb.usbCallbacks = e;
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
          claimDevice: function(e) {
            return typeof e != "object" && (e = {
              vendorId: arguments[0],
              productId: arguments[1],
              interface: arguments[2]
            }), t.websocket.dataPromise("usb.claimDevice", e);
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
          isClaimed: function(e) {
            return typeof e != "object" && (e = { vendorId: arguments[0], productId: arguments[1] }), t.websocket.dataPromise("usb.isClaimed", e);
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
          sendData: function(e) {
            return typeof e != "object" && (e = {
              vendorId: arguments[0],
              productId: arguments[1],
              endpoint: arguments[2],
              data: arguments[3]
            }), t.tools.versionCompare(2, 1, 0, 12) >= 0 && (typeof e.data != "object" && (e.data = {
              data: e.data,
              type: "PLAIN"
            }), e.data.type && e.data.type.toUpperCase() == "FILE" && (e.data.data = t.tools.absolute(e.data.data))), t.websocket.dataPromise("usb.sendData", e);
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
          readData: function(e) {
            return typeof e != "object" && (e = {
              vendorId: arguments[0],
              productId: arguments[1],
              endpoint: arguments[2],
              responseSize: arguments[3]
            }), t.websocket.dataPromise("usb.readData", e);
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
          openStream: function(e) {
            return typeof e != "object" && (e = {
              vendorId: arguments[0],
              productId: arguments[1],
              endpoint: arguments[2],
              responseSize: arguments[3],
              interval: arguments[4]
            }), t.websocket.dataPromise("usb.openStream", e);
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
          closeStream: function(e) {
            return typeof e != "object" && (e = {
              vendorId: arguments[0],
              productId: arguments[1],
              endpoint: arguments[2]
            }), t.websocket.dataPromise("usb.closeStream", e);
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
          releaseDevice: function(e) {
            return typeof e != "object" && (e = { vendorId: arguments[0], productId: arguments[1] }), t.websocket.dataPromise("usb.releaseDevice", e);
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
            return t.websocket.dataPromise("hid.listDevices");
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
            return t.websocket.dataPromise("hid.startListening");
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
            return t.websocket.dataPromise("hid.stopListening");
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
          setHidCallbacks: function(e) {
            t.hid.hidCallbacks = e;
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
          claimDevice: function(e) {
            return typeof e != "object" && (e = { vendorId: arguments[0], productId: arguments[1] }), t.websocket.dataPromise("hid.claimDevice", e);
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
          isClaimed: function(e) {
            return typeof e != "object" && (e = { vendorId: arguments[0], productId: arguments[1] }), t.websocket.dataPromise("hid.isClaimed", e);
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
          sendData: function(e) {
            if (typeof e != "object" && (e = {
              vendorId: arguments[0],
              productId: arguments[1],
              data: arguments[2],
              endpoint: arguments[3]
            }), t.tools.versionCompare(2, 1, 0, 12) >= 0)
              typeof e.data != "object" && (e.data = {
                data: e.data,
                type: "PLAIN"
              }), e.data.type && e.data.type.toUpperCase() == "FILE" && (e.data.data = t.tools.absolute(e.data.data));
            else if (typeof e.data == "object") {
              if (e.data.type.toUpperCase() !== "PLAIN" || typeof e.data.data != "string")
                return t.tools.reject(new Error("Data format is not supported with connected " + t.TITLE + " version " + t.websocket.connection.version));
              e.data = e.data.data;
            }
            return t.websocket.dataPromise("hid.sendData", e);
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
          readData: function(e) {
            return typeof e != "object" && (e = {
              vendorId: arguments[0],
              productId: arguments[1],
              responseSize: arguments[2]
            }), t.websocket.dataPromise("hid.readData", e);
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
          sendFeatureReport: function(e) {
            return t.websocket.dataPromise("hid.sendFeatureReport", e);
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
          getFeatureReport: function(e) {
            return t.websocket.dataPromise("hid.getFeatureReport", e);
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
          openStream: function(e) {
            return typeof e != "object" && (e = {
              vendorId: arguments[0],
              productId: arguments[1],
              responseSize: arguments[2],
              interval: arguments[3]
            }), t.websocket.dataPromise("hid.openStream", e);
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
          closeStream: function(e) {
            return typeof e != "object" && (e = { vendorId: arguments[0], productId: arguments[1] }), t.websocket.dataPromise("hid.closeStream", e);
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
          releaseDevice: function(e) {
            return typeof e != "object" && (e = { vendorId: arguments[0], productId: arguments[1] }), t.websocket.dataPromise("hid.releaseDevice", e);
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
          list: function(e, n) {
            var r = t.tools.extend({ path: e }, n);
            return t.websocket.dataPromise("file.list", r);
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
          read: function(e, n) {
            var r = t.tools.extend({ path: e }, n);
            return t.websocket.dataPromise("file.read", r);
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
          write: function(e, n) {
            var r = t.tools.extend({ path: e }, n);
            return t.websocket.dataPromise("file.write", r);
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
          remove: function(e, n) {
            var r = t.tools.extend({ path: e }, n);
            return t.websocket.dataPromise("file.remove", r);
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
          startListening: function(e, n) {
            n && typeof n.include < "u" && !Array.isArray(n.include) && (n.include = [n.include]), n && typeof n.exclude < "u" && !Array.isArray(n.exclude) && (n.exclude = [n.exclude]);
            var r = t.tools.extend({ path: e }, n);
            return t.websocket.dataPromise("file.startListening", r);
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
          stopListening: function(e, n) {
            var r = t.tools.extend({ path: e }, n);
            return t.websocket.dataPromise("file.stopListening", r);
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
          setFileCallbacks: function(e) {
            t.file.fileCallbacks = e;
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
          device: function(e, n) {
            return t.tools.isVersion(2, 0) ? t.compatible.networking(e, n, null, null, function(r) {
              return { ip: r.ipAddress, mac: r.macAddress };
            }) : t.websocket.dataPromise("networking.device", {
              hostname: e,
              port: n
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
          hostname: function(e, n) {
            return t.tools.versionCompare(2, 2, 2) < 0 ? t.tools.promise(function(r, a) {
              t.websocket.dataPromise("networking.device", { hostname: e, port: n }).then(function(s) {
                console.log(s), r(s.hostname);
              });
            }) : t.websocket.dataPromise("networking.hostname");
          },
          /**
           * @param {string} [hostname] Hostname to try to connect to when determining network interfaces, defaults to "google.com"
           * @param {number} [port] Port to use with custom hostname, defaults to 443
           * @returns {Promise<Array<Object>|Error>} Connected system's network information.
           *
           * @memberof qz.networking
           * @since 2.1.0
           */
          devices: function(e, n) {
            return t.tools.isVersion(2, 0) ? t.compatible.networking(e, n, null, null, function(r) {
              return [{ ip: r.ipAddress, mac: r.macAddress }];
            }) : t.websocket.dataPromise("networking.devices", {
              hostname: e,
              port: n
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
          setCertificatePromise: function(e, n) {
            t.security.certHandler = e, t.security.rejectOnCertFailure = !!(n && n.rejectOnFailure);
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
          setSignaturePromise: function(e) {
            t.security.signatureFactory = e;
          },
          /**
           * Set which signing algorithm QZ will check signatures against.
           *
           * @param {string} algorithm The algorithm used in signing. Valid values: <code>[SHA1 | SHA256 | SHA512]</code>
           * @since 2.1.0
           *
           * @memberof qz.security
           */
          setSignatureAlgorithm: function(e) {
            t.compatible.algorithm() && (["SHA1", "SHA256", "SHA512"].indexOf(e.toUpperCase()) < 0 ? t.log.error("Signing algorithm '" + e + "' is not supported.") : t.security.signAlgorithm = e);
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
            return t.security.signAlgorithm;
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
          showDebug: function(e) {
            return t.DEBUG = e;
          },
          /**
           * Get internal branding title used by logs and exceptions (e.g "QZ Tray")
           *
           * @returns {string} Internal title used for logs and exceptions
           *
           * @memberof qz.api
           */
          getTitle: function() {
            return t.TITLE;
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
          getVersion: function(e) {
            return t.websocket.dataPromise("getVersion", e);
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
          isVersion: t.tools.isVersion,
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
          isVersionGreater: function(e, n, r, a) {
            return t.tools.versionCompare(e, n, r, a) > 0;
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
          isVersionLess: function(e, n, r, a) {
            return t.tools.versionCompare(e, n, r, a) < 0;
          },
          /**
           * Change the promise library used by QZ API.
           * Should be called before any initialization to avoid possible errors.
           *
           * @param {Function} promiser <code>Function({function} resolver)</code> called to create new promises.
           *
           * @memberof qz.api
           */
          setPromiseType: function(e) {
            t.tools.promise = e;
          },
          /**
           * Change the SHA-256 hashing function used by QZ API.
           * Should be called before any initialization to avoid possible errors.
           *
           * @param {Function} hasher <code>Function({function} message)</code> called to create hash of passed string.
           *
           * @memberof qz.api
           */
          setSha256Type: function(e) {
            t.tools.hash = e;
          },
          /**
           * Change the internal branding of "QZ Tray" for logs and exceptions
           * Must be called before any connection attempts are made to appear in messaging
           *
           * @param {string} title Internal name to be used in place of "QZ Tray" for logs and exceptions
           *
           * @memberof qz.api
           */
          setTitle: function(e) {
            t.TITLE = e;
          },
          /**
           * Change the WebSocket handler.
           * Should be called before any initialization to avoid possible errors.
           *
           * @param {Function} ws <code>Function({function} WebSocket)</code> called to override the internal WebSocket handler.
           *
           * @memberof qz.api
           */
          setWebSocketType: function(e) {
            t.tools.ws = e;
          }
        },
        /**
         * Version of this JavaScript library
         *
         * @constant {string}
         *
         * @memberof qz
         */
        version: t.VERSION
      };
      return w;
    })();
    (function() {
      p.exports = c;
    })();
  })(K)), K.exports;
}
var Fe = qe();
const I = /* @__PURE__ */ he(Fe);
let oe;
const se = {
  async print(p, u) {
    const c = await we(p, u);
    oe?.remove();
    const t = document.createElement("iframe");
    oe = t, t.title = "Cetak label Work Order", t.setAttribute("aria-hidden", "true"), t.style.cssText = "position:fixed;left:-10000px;top:0;width:1px;height:1px;border:0";
    try {
      await new Promise((v, w) => {
        const e = setTimeout(() => w(new Error("Halaman cetak browser tidak selesai dimuat.")), 15e3);
        t.onload = () => {
          clearTimeout(e), v();
        }, t.onerror = () => {
          clearTimeout(e), w(new Error("Gagal memuat halaman cetak browser."));
        }, t.srcdoc = c, document.body.appendChild(t);
      }), t.contentWindow.addEventListener("afterprint", () => t.remove(), { once: !0 }), t.contentWindow.focus(), t.contentWindow.print();
    } catch (v) {
      throw t.remove(), v;
    }
  }
};
async function Ie(p) {
  const u = J(p || B());
  await X(null, { layoutTest: !0, timeoutSeconds: u.qzTimeout });
  const [c, t] = await Promise.allSettled([I.printers.find(), I.printers.getDefault()]);
  if (c.status === "rejected") throw c.reason;
  return {
    printers: Array.isArray(c.value) ? c.value : c.value ? [c.value] : [],
    defaultPrinter: t.status === "fulfilled" && t.value || ""
  };
}
async function He(p) {
  const u = J(p), c = le(Ce, u);
  await X(null, { layoutTest: !0, timeoutSeconds: u.qzTimeout });
  const t = u.printer || await I.printers.getDefault();
  return await I.print(I.configs.create(t, { encoding: "UTF-8" }), c), t;
}
function de(p, u) {
  try {
    const t = JSON.parse(p?._server_messages || "[]").map((v) => JSON.parse(v).message).filter(Boolean).join(" ");
    if (t) return t;
  } catch {
  }
  return u;
}
async function De(p) {
  const u = await fetch("/api/method/product_qr.wo_labels.labels.get_existing_label_numbers", {
    method: "POST",
    credentials: "same-origin",
    cache: "no-store",
    headers: {
      "Content-Type": "application/json",
      "X-Frappe-CSRF-Token": window.csrf_token || ""
    },
    body: JSON.stringify({ name: p })
  }), c = await u.json();
  if (!u.ok) throw new Error(de(c, "Gagal memuat nomor urut label yang sudah terbit"));
  return c.message || [];
}
function $e(p, { layoutTest: u = !1 } = {}) {
  I.security.setCertificatePromise(async () => {
    const c = u ? "/api/method/product_qr.wo_labels.qz_signing.layout_certificate" : `/api/method/product_qr.wo_labels.qz_signing.certificate?work_order=${encodeURIComponent(p)}`, t = await fetch(c, {
      cache: "no-store"
    });
    if (!t.ok) throw new Error("Sertifikat QZ Tray belum tersedia atau akses ditolak");
    return (await t.json()).message;
  }, { rejectOnFailure: !0 }), I.security.setSignatureAlgorithm("SHA512"), I.security.setSignaturePromise(async (c) => {
    const t = await fetch(u ? "/api/method/product_qr.wo_labels.qz_signing.layout_sign" : "/api/method/product_qr.wo_labels.qz_signing.sign", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Frappe-CSRF-Token": window.csrf_token || ""
      },
      credentials: "same-origin",
      cache: "no-store",
      body: JSON.stringify(u ? { request: c } : { work_order: p, request: c })
    });
    if (!t.ok) throw new Error("Gagal menandatangani permintaan QZ Tray");
    return (await t.json()).message;
  });
}
async function X(p, { layoutTest: u = !1, timeoutSeconds: c = B()?.qzTimeout } = {}) {
  const t = J({ qzTimeout: c }).qzTimeout;
  if ($e(p, { layoutTest: u }), !I.websocket.isActive()) {
    let v;
    try {
      await Promise.race([
        I.websocket.connect({ retries: 0 }),
        new Promise((w, e) => {
          v = setTimeout(() => {
            try {
              Promise.resolve(I.websocket.disconnect()).catch(() => {
              });
            } catch {
            }
            e(new Error(`QZ Tray tidak merespons dalam ${t} detik.`));
          }, t * 1e3);
        })
      ]);
    } finally {
      clearTimeout(v);
    }
  }
}
async function ze(p, u = 0) {
  const c = u && typeof u == "object" ? u : { extra: u }, t = { name: p, extra: c.extra ?? 0 };
  c.appendCount !== void 0 && (t.append_count = c.appendCount), c.labelNumbers !== void 0 && (t.label_numbers = c.labelNumbers);
  const v = await fetch("/api/method/product_qr.wo_labels.labels.get_label_data", {
    method: "POST",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
      "X-Frappe-CSRF-Token": window.csrf_token || ""
    },
    body: JSON.stringify(t)
  }), w = await v.json();
  if (!v.ok)
    throw new Error(de(w, "Gagal mengambil data label"));
  const { message: e } = w;
  if (!e)
    throw new Error("Data label kosong");
  const n = e.labels?.length || 0;
  if (!n || n !== e.label_count) throw new Error("Jumlah label tidak sesuai");
  const r = B();
  if (c.output === "browser")
    try {
      return await se.print(e, r), { browserPrint: !0 };
    } catch (a) {
      throw new Error(`Cetak browser gagal: ${a.message || a}. Gunakan cetak ulang nomor label yang sudah terbit; jangan tambah label lagi.`);
    }
  try {
    await X(p, { timeoutSeconds: r?.qzTimeout });
    const a = r?.printer || await I.printers.getDefault(), s = I.configs.create(a, {
      encoding: "UTF-8"
    });
    return await I.print(s, le(e, r)), !0;
  } catch (a) {
    console.error("QZ Tray Error:", a);
    try {
      return await se.print(e, r), { browserFallback: !0 };
    } catch (s) {
      throw new Error(`Cetak gagal: ${a.message || a}. Cetak browser juga gagal: ${s.message || s}. Gunakan cetak ulang nomor label yang sudah terbit; jangan tambah label lagi.`);
    }
  }
}
const Me = {
  key: 0,
  class: "label-print-note",
  role: "status"
}, Re = { id: "label-print-title" }, Ve = ["disabled"], je = {
  key: 0,
  class: "label-count-field"
}, Qe = ["max"], Ge = {
  key: 1,
  class: "label-count-field"
}, We = {
  key: 0,
  class: "label-print-note"
}, Je = {
  key: 2,
  class: "label-count-field"
}, Be = { class: "label-print-note" }, Ze = { key: 0 }, Ke = {
  key: 0,
  class: "label-print-note"
}, Xe = {
  key: 1,
  class: "label-print-note warning"
}, Ye = {
  key: 2,
  class: "label-print-note"
}, et = ["value"], tt = {
  key: 1,
  class: "label-range"
}, nt = ["value"], rt = ["value"], at = {
  key: 4,
  class: "label-print-note"
}, ot = { key: 3 }, st = { key: 4 }, it = { key: 5 }, lt = {
  key: 6,
  class: "label-print-note warning"
}, ut = { class: "dlg-actions" }, ct = ["disabled"], dt = ["disabled"], ft = { id: "wo-label-error-title" }, pt = { class: "error-dialog-message" }, bt = {
  key: 0,
  class: "error-dialog-details"
}, mt = { class: "dlg-actions" }, gt = {
  __name: "WorkOrderLabelDialogs",
  setup(p) {
    const u = A(null), c = A(null), t = A(null), v = A(null), w = A(""), e = A(!1), n = A("automatic"), r = A(1), a = A(0), s = A([]), f = A(""), b = A("single"), S = A(""), x = A(""), P = A(null), _ = A(!1), T = A("");
    let h = 0;
    const L = z(() => a.value !== "" && Number.isInteger(Number(a.value)) && Number(a.value) >= 0), H = z(() => r.value !== "" && Number.isInteger(Number(r.value)) && Number(r.value) >= 1 && Number(r.value) <= 1e4), C = z(() => Math.max(0, ...s.value.map((F) => Number(F.label_number) || 0))), d = z(() => b.value === "range" ? re(s.value, S.value, x.value) : re(s.value, f.value, f.value)), i = z(() => n.value === "automatic" ? O.labelCount + Number(a.value || 0) : n.value === "append" ? Number(r.value || 0) : d.value.length), N = z(() => n.value === "automatic" ? L.value && i.value >= 1 && i.value <= 1e4 : n.value === "append" ? s.value.length > 0 && H.value : i.value >= 1 && i.value <= 1e4);
    function j() {
      f.value = "", b.value = "single", S.value = "", x.value = "";
    }
    async function fe(F = O.workOrder) {
      if (!F) return;
      w.value = "";
      const l = ++h;
      _.value = !0, T.value = "";
      try {
        const m = await De(F);
        l === h && F === O.workOrder && (s.value = m?.labels || [], P.value = m?.adonan_ke ?? null);
      } catch (m) {
        l === h && (s.value = [], P.value = null, T.value = m.message || "Gagal memuat nomor urut label.");
      } finally {
        l === h && (_.value = !1);
      }
    }
    ee(() => O.workOrder, (F) => {
      F && (n.value = "automatic", r.value = 1, a.value = 0, s.value = [], j(), P.value = null, fe(F), te(() => {
        u.value?.open || u.value?.showModal();
      }));
    }), ee(v, (F) => {
      F && te(() => {
        c.value?.open || c.value?.showModal(), t.value?.focus();
      });
    });
    function Q() {
      e.value || (u.value?.open && u.value.close(), h++, n.value = "automatic", r.value = 1, a.value = 0, s.value = [], j(), P.value = null, _.value = !1, T.value = "", O.workOrder = "", O.labelCount = 0, O.afterSave = "");
    }
    async function pe(F = "printer") {
      const l = O.workOrder;
      if (!(!l || !N.value || e.value)) {
        e.value = !0;
        try {
          const m = n.value === "automatic" ? { extra: Number(a.value) } : n.value === "append" ? { appendCount: Number(r.value) } : { labelNumbers: d.value };
          F === "browser" && (m.output = "browser");
          const Y = await ze(l, m);
          Y?.browserFallback ? w.value = "Cetak QZ gagal. Dialog cetak browser dibuka; pilih printer atau Save as PDF. Periksa label yang mungkin sudah tercetak agar tidak rangkap." : Y?.browserPrint && (w.value = "Dialog cetak browser dibuka. Pilih printer atau Save as PDF; membatalkan dialog tidak menghapus label yang sudah terbit."), e.value = !1, Q();
        } catch (m) {
          v.value = {
            title: F === "browser" ? "Cetak Browser Gagal" : "Cetak Label Gagal",
            message: m.message || "Gagal terhubung ke QZ Tray atau printer.",
            details: [],
            hint: /sign|sertifikat|certificate/i.test(m.message || "") ? "Periksa sertifikat QZ Tray di komputer dan private key di server." : "Pastikan QZ Tray sedang berjalan di komputer Anda."
          };
        } finally {
          e.value = !1;
        }
      }
    }
    function Z() {
      c.value?.open && c.value.close(), v.value = null;
    }
    return (F, l) => (g(), k($, null, [
      w.value ? (g(), k("p", Me, y(w.value), 1)) : D("", !0),
      o("dialog", {
        ref_key: "labelPrintDialog",
        ref: u,
        class: "dialog",
        "aria-labelledby": "label-print-title",
        onCancel: G(Q, ["prevent"]),
        onClick: G(Q, ["self"])
      }, [
        o("h3", Re, y(E(O).afterSave ? `${E(O).afterSave} tersimpan` : "Cetak label?"), 1),
        o("p", null, [
          l[8] || (l[8] = U("Cetak label untuk Work Order ", -1)),
          o("strong", null, y(E(O).workOrder), 1),
          l[9] || (l[9] = U("?", -1))
        ]),
        o("p", null, [
          l[10] || (l[10] = U("Usulan otomatis dari Good Qty dan UOM: ", -1)),
          o("strong", null, y(E(O).labelCount) + " label", 1)
        ]),
        l[30] || (l[30] = o("label", { for: "label-count-mode" }, "Cara menentukan jumlah", -1)),
        q(o("select", {
          id: "label-count-mode",
          "onUpdate:modelValue": l[0] || (l[0] = (m) => n.value = m),
          class: "input label-dialog-select",
          style: { display: "block", width: "100%", "margin-top": "6px" }
        }, [
          l[11] || (l[11] = o("option", { value: "automatic" }, "Otomatis dari Good Qty", -1)),
          o("option", {
            value: "append",
            disabled: _.value || !s.value.length
          }, "Tambah setelah cetak awal", 8, Ve),
          l[12] || (l[12] = o("option", { value: "specific" }, "Pilih nomor urut label untuk cetak ulang", -1))
        ], 512), [
          [M, n.value]
        ]),
        n.value === "automatic" ? (g(), k("div", je, [
          l[13] || (l[13] = o("label", { for: "extra-label-count" }, "Label tambahan", -1)),
          q(o("input", {
            id: "extra-label-count",
            "onUpdate:modelValue": l[1] || (l[1] = (m) => a.value = m),
            type: "number",
            min: "0",
            max: Math.max(0, 1e4 - E(O).labelCount),
            step: "1",
            inputmode: "numeric",
            class: "input",
            style: { display: "block", width: "100%", "margin-top": "6px" }
          }, null, 8, Qe), [
            [
              V,
              a.value,
              void 0,
              { number: !0 }
            ]
          ]),
          l[14] || (l[14] = o("p", { class: "label-print-note" }, "Jumlah awal mengikuti Good Qty.", -1))
        ])) : D("", !0),
        n.value === "append" ? (g(), k("div", Ge, [
          l[15] || (l[15] = o("label", { for: "append-label-count" }, "Jumlah label lanjutan", -1)),
          q(o("input", {
            id: "append-label-count",
            "onUpdate:modelValue": l[2] || (l[2] = (m) => r.value = m),
            type: "number",
            min: "1",
            max: "10000",
            step: "1",
            inputmode: "numeric",
            class: "input",
            style: { display: "block", width: "100%", "margin-top": "6px" }
          }, null, 512), [
            [
              V,
              r.value,
              void 0,
              { number: !0 }
            ]
          ]),
          H.value ? (g(), k("p", We, "Nomor baru: #" + y(C.value + 1) + "–#" + y(C.value + Number(r.value)) + " · setelah label awal yang sudah terbit.", 1)) : D("", !0)
        ])) : D("", !0),
        n.value === "specific" ? (g(), k("div", Je, [
          l[26] || (l[26] = o("label", { for: "label-number-select" }, "Nomor urut label yang dicetak ulang", -1)),
          o("p", Be, [
            l[16] || (l[16] = U("Nomor urut terikat ke Work Order ini", -1)),
            P.value !== null ? (g(), k("span", Ze, " · Adonan ke " + y(P.value), 1)) : D("", !0),
            l[17] || (l[17] = U(".", -1))
          ]),
          _.value ? (g(), k("p", Ke, "Memuat nomor urut label…")) : T.value ? (g(), k("p", Xe, y(T.value), 1)) : s.value.length ? (g(), k($, { key: 3 }, [
            q(o("select", {
              id: "reprint-mode-select",
              "onUpdate:modelValue": l[3] || (l[3] = (m) => b.value = m),
              "aria-label": "Jenis cetak ulang",
              class: "input label-dialog-select",
              style: { display: "block", width: "100%", "margin-top": "6px" }
            }, [...l[18] || (l[18] = [
              o("option", { value: "single" }, "Satu nomor", -1),
              o("option", { value: "range" }, "Rentang nomor", -1)
            ])], 512), [
              [M, b.value]
            ]),
            b.value === "single" ? q((g(), k("select", {
              key: 0,
              id: "label-number-select",
              "onUpdate:modelValue": l[4] || (l[4] = (m) => f.value = m),
              class: "input label-dialog-select",
              style: { display: "block", width: "100%", "margin-top": "6px" }
            }, [
              l[19] || (l[19] = o("option", { value: "" }, "Pilih nomor label", -1)),
              (g(!0), k($, null, R(s.value, (m) => (g(), k("option", {
                key: m.label_number,
                value: m.label_number
              }, " Label #" + y(m.label_number) + " · Adonan ke " + y(m.adonan_ke ?? "—"), 9, et))), 128))
            ], 512)), [
              [
                M,
                f.value,
                void 0,
                { number: !0 }
              ]
            ]) : (g(), k("div", tt, [
              o("label", null, [
                l[21] || (l[21] = U("Dari ", -1)),
                q(o("select", {
                  id: "label-range-from",
                  "onUpdate:modelValue": l[5] || (l[5] = (m) => S.value = m),
                  class: "input label-dialog-select"
                }, [
                  l[20] || (l[20] = o("option", { value: "" }, "#", -1)),
                  (g(!0), k($, null, R(s.value, (m) => (g(), k("option", {
                    key: m.label_number,
                    value: m.label_number
                  }, "#" + y(m.label_number), 9, nt))), 128))
                ], 512), [
                  [
                    M,
                    S.value,
                    void 0,
                    { number: !0 }
                  ]
                ])
              ]),
              o("label", null, [
                l[23] || (l[23] = U("Sampai ", -1)),
                q(o("select", {
                  id: "label-range-to",
                  "onUpdate:modelValue": l[6] || (l[6] = (m) => x.value = m),
                  class: "input label-dialog-select"
                }, [
                  l[22] || (l[22] = o("option", { value: "" }, "#", -1)),
                  (g(!0), k($, null, R(s.value, (m) => (g(), k("option", {
                    key: m.label_number,
                    value: m.label_number
                  }, "#" + y(m.label_number), 9, rt))), 128))
                ], 512), [
                  [
                    M,
                    x.value,
                    void 0,
                    { number: !0 }
                  ]
                ])
              ])
            ]))
          ], 64)) : (g(), k("p", Ye, "Belum ada label terbit untuk Work Order ini. Cetak otomatis dari Good Qty dahulu.")),
          d.value.length ? (g(), k("p", at, [
            l[24] || (l[24] = U("Dipilih: ", -1)),
            o("strong", null, y(d.value.length === 1 ? `Label #${d.value[0]}` : `Label #${d.value[0]}–#${d.value.at(-1)} (${d.value.length} label)`), 1),
            l[25] || (l[25] = U(". QR akan memakai mapping label yang sama.", -1))
          ])) : D("", !0)
        ])) : D("", !0),
        N.value && n.value === "automatic" ? (g(), k("p", ot, [
          l[27] || (l[27] = U("Total cetak otomatis: ", -1)),
          o("strong", null, y(i.value) + " label", 1)
        ])) : N.value && n.value === "append" ? (g(), k("p", st, [
          l[28] || (l[28] = U("Label lanjutan: ", -1)),
          o("strong", null, y(i.value) + " label", 1)
        ])) : N.value && n.value === "specific" ? (g(), k("p", it, [
          l[29] || (l[29] = U("Total cetak ulang: ", -1)),
          o("strong", null, y(i.value) + " label", 1)
        ])) : (g(), k("p", lt, y(n.value === "append" ? "Masukkan jumlah label lanjutan 1–10.000." : n.value === "specific" ? b.value === "range" ? "Pilih nomor awal dan akhir rentang label untuk dicetak ulang." : "Pilih satu nomor label untuk dicetak ulang." : "Masukkan jumlah ekstra bulat yang valid; batas 10.000 label per cetakan."), 1)),
        o("div", ut, [
          o("button", {
            class: "btn",
            disabled: e.value,
            onClick: Q
          }, "Nanti saja", 8, ct),
          o("button", {
            class: "btn btn-primary",
            disabled: !N.value || e.value,
            onClick: l[7] || (l[7] = (m) => pe())
          }, y(e.value ? "Memproses…" : "Ya, Cetak Label"), 9, dt)
        ])
      ], 544),
      o("dialog", {
        ref_key: "errorDialog",
        ref: c,
        class: "dialog error-dialog",
        "aria-labelledby": "wo-label-error-title",
        onCancel: G(Z, ["prevent"]),
        onClick: G(Z, ["self"])
      }, [
        l[31] || (l[31] = o("div", {
          class: "error-dialog-icon",
          "aria-hidden": "true"
        }, "!", -1)),
        o("h2", ft, y(v.value?.title), 1),
        o("p", pt, y(v.value?.message), 1),
        v.value?.details?.length ? (g(), k("ul", bt, [
          (g(!0), k($, null, R(v.value.details, (m) => (g(), k("li", { key: m }, y(m), 1))), 128))
        ])) : D("", !0),
        o("div", mt, [
          o("button", {
            ref_key: "errorClose",
            ref: t,
            class: "btn btn-primary",
            onClick: Z
          }, "Tutup", 512)
        ])
      ], 544)
    ], 64));
  }
}, un = /* @__PURE__ */ ce(gt, [["__scopeId", "data-v-dea34345"]]);
function kt({ selected: p = "", printers: u = [], defaultPrinter: c = "", loaded: t = !1, lastPrinted: v = "" } = {}) {
  const w = p || c;
  return w ? t && u.includes(w) ? { name: w, detail: "Terdeteksi oleh QZ Tray. Status fisik online/offline belum diperiksa." } : v === w ? { name: w, detail: "Tujuan cetak TEST terakhir. Pengiriman job bukan konfirmasi hasil cetak fisik." } : { name: w, detail: t ? "Belum terdeteksi dalam daftar QZ Tray. Periksa printer atau muat ulang daftar." : "Nama tersimpan; belum diverifikasi oleh QZ Tray." } : {
    name: "Belum diketahui",
    detail: t ? "Printer default sistem belum tersedia. Pilih printer dari daftar." : "Klik Hubungkan / muat printer untuk melihat nama printer."
  };
}
const vt = {
  class: "panel settings-panel pqr-layout",
  "aria-labelledby": "pqr-layout-title"
}, yt = { class: "panel-head" }, ht = { class: "p-ico" }, wt = { class: "panel-body" }, Ct = { class: "settings-block" }, St = { class: "settings-control" }, xt = { class: "form-grid cols2" }, At = { class: "field" }, Pt = { value: "" }, _t = ["value"], Lt = { class: "field" }, Tt = { for: "pqr-qzTimeout" }, Et = ["min", "max", "step"], Nt = {
  class: "settings-note",
  "data-label-printer-destination": "",
  "aria-live": "polite"
}, Ot = { class: "pqr-layout-actions" }, Ut = ["disabled"], qt = ["disabled"], Ft = { class: "settings-block" }, It = { class: "settings-control" }, Ht = { class: "form-grid cols2" }, Dt = ["for"], $t = ["id"], zt = ["id", "onUpdate:modelValue", "min", "max", "step"], Mt = { class: "hint" }, Rt = { class: "settings-block" }, Vt = { class: "settings-control" }, jt = { class: "form-grid cols2" }, Qt = ["for"], Gt = ["id", "onUpdate:modelValue", "min", "max", "step"], Wt = { class: "settings-block" }, Jt = { class: "settings-control" }, Bt = { class: "form-grid cols2" }, Zt = ["for"], Kt = ["id", "onUpdate:modelValue", "min", "max", "step"], Xt = { class: "field" }, Yt = { class: "field wide" }, en = {
  key: 0,
  class: "settings-alerts"
}, tn = { class: "panel-foot" }, nn = ["disabled"], rn = ["disabled"], cn = {
  __name: "LabelLayoutSettings",
  setup(p) {
    const u = A(B() || { ...ne }), c = z(() => J(u.value)), t = A([]), v = A(""), w = A(!1), e = A(""), n = A(!1), r = A(""), a = A(!1), s = z(() => [...new Set([u.value.printer, ...t.value].filter(Boolean))]), f = z(() => kt({
      selected: u.value.printer,
      printers: t.value,
      defaultPrinter: v.value,
      loaded: w.value,
      lastPrinted: e.value
    })), b = W.filter((C) => ["leftX", "leftY", "qrSize"].includes(C.key)), S = W.filter((C) => ["rightX", "rightY", "textWidth", "prefixFontSize", "fontSize", "productFontSize", "lineHeight", "nameLines"].includes(C.key)), x = W.find((C) => C.key === "qzTimeout"), P = W.filter((C) => C !== x && !b.includes(C) && !S.includes(C));
    async function _(C, d) {
      if (!n.value) {
        n.value = !0, r.value = "", a.value = !1;
        try {
          await C(), r.value = d;
        } catch (i) {
          a.value = !0, r.value = i.message || "Pengaturan label gagal.";
        } finally {
          n.value = !1;
        }
      }
    }
    function T() {
      _(() => {
        u.value = Se(u.value);
      }, "Pengaturan label disimpan di perangkat ini.");
    }
    function h() {
      _(() => {
        xe(), u.value = { ...ne };
      }, "Kembali menggunakan default ZPL asli.");
    }
    function L() {
      _(async () => {
        try {
          const C = await Ie(c.value);
          t.value = C.printers, v.value = C.defaultPrinter, w.value = !0;
        } catch (C) {
          throw t.value = [], v.value = "", w.value = !1, e.value = "", C;
        }
      }, "Daftar printer diperbarui.");
    }
    function H() {
      _(async () => {
        const C = c.value, d = await He(C);
        e.value = d, C.printer || (v.value = d);
      }, "Label TEST dikirim. Tidak ada serial produksi yang dibuat.");
    }
    return me(L), (C, d) => (g(), k("section", vt, [
      o("div", yt, [
        o("span", ht, [
          ie(E(ve), {
            size: 15,
            "stroke-width": 1.9
          })
        ]),
        d[5] || (d[5] = o("h2", { id: "pqr-layout-title" }, "Pengaturan layout label", -1)),
        d[6] || (d[6] = o("span", { class: "lead" }, "Khusus browser dan perangkat ini.", -1))
      ]),
      o("div", wt, [
        o("div", Ct, [
          d[11] || (d[11] = o("div", { class: "settings-block-head" }, [
            o("h3", null, "Printer label"),
            o("p", { class: "hint" }, "Daftar printer dimuat otomatis saat pengaturan dibuka. Gunakan printer ZPL. Cetak TEST hanya untuk memeriksa layout dengan data contoh, tanpa Work Order.")
          ], -1)),
          o("div", St, [
            o("div", xt, [
              o("div", At, [
                d[7] || (d[7] = o("label", { for: "pqr-printer" }, "Printer label", -1)),
                q(o("select", {
                  id: "pqr-printer",
                  "onUpdate:modelValue": d[0] || (d[0] = (i) => u.value.printer = i),
                  class: "input"
                }, [
                  o("option", Pt, y(v.value ? `Default sistem — ${v.value}` : "Printer default sistem (nama belum dimuat)"), 1),
                  (g(!0), k($, null, R(s.value, (i) => (g(), k("option", {
                    key: i,
                    value: i
                  }, y(i) + y(w.value && !t.value.includes(i) ? " — belum terdeteksi" : ""), 9, _t))), 128))
                ], 512), [
                  [M, u.value.printer]
                ])
              ]),
              o("div", Lt, [
                o("label", Tt, y(E(x).label), 1),
                q(o("input", {
                  id: "pqr-qzTimeout",
                  "onUpdate:modelValue": d[1] || (d[1] = (i) => u.value.qzTimeout = i),
                  class: "input",
                  type: "number",
                  min: E(x).min,
                  max: E(x).max,
                  step: E(x).step,
                  "aria-describedby": "pqr-timeout-note"
                }, null, 8, Et), [
                  [
                    V,
                    u.value.qzTimeout,
                    void 0,
                    { number: !0 }
                  ]
                ])
              ])
            ]),
            d[10] || (d[10] = o("p", {
              id: "pqr-timeout-note",
              class: "hint"
            }, "1–60 detik; default 8. Batas menunggu koneksi QZ, bukan durasi cetak fisik. Simpan agar dipakai saat cetak Work Order. Jika koneksi gagal atau timeout, cetak Work Order beralih ke dialog cetak browser.", -1)),
            o("p", Nt, [
              d[8] || (d[8] = U("Printer tujuan: ", -1)),
              o("strong", null, y(f.value.name), 1),
              d[9] || (d[9] = o("br", null, null, -1)),
              U(y(f.value.detail), 1)
            ]),
            o("div", Ot, [
              o("button", {
                type: "button",
                class: "btn",
                disabled: n.value,
                onClick: L
              }, "Muat ulang printer", 8, Ut),
              o("button", {
                type: "button",
                class: "btn",
                disabled: n.value,
                onClick: H
              }, "Cetak label TEST", 8, qt)
            ])
          ])
        ]),
        o("div", Ft, [
          d[14] || (d[14] = o("div", { class: "settings-block-head" }, [
            o("h3", null, "Ukuran dan media"),
            o("p", { class: "hint" }, "Dasar ZPL asli: 2 kolom, ^PW800, ^LL160, 203 DPI. Pengaturan ini hanya untuk penyesuaian.")
          ], -1)),
          o("div", It, [
            o("div", Ht, [
              (g(!0), k($, null, R(E(P), (i) => (g(), k("div", {
                key: i.key,
                class: "field"
              }, [
                o("label", {
                  for: `pqr-${i.key}`
                }, y(i.label), 9, Dt),
                i.key === "dpi" ? q((g(), k("select", {
                  key: 0,
                  id: `pqr-${i.key}`,
                  "onUpdate:modelValue": d[2] || (d[2] = (N) => u.value.dpi = N),
                  class: "input"
                }, [...d[12] || (d[12] = [
                  o("option", { value: 203 }, "203", -1),
                  o("option", { value: 300 }, "300", -1),
                  o("option", { value: 600 }, "600", -1)
                ])], 8, $t)), [
                  [
                    M,
                    u.value.dpi,
                    void 0,
                    { number: !0 }
                  ]
                ]) : q((g(), k("input", {
                  key: 1,
                  id: `pqr-${i.key}`,
                  "onUpdate:modelValue": (N) => u.value[i.key] = N,
                  class: "input",
                  type: "number",
                  min: i.min,
                  max: i.max,
                  step: i.step
                }, null, 8, zt)), [
                  [
                    V,
                    u.value[i.key],
                    void 0,
                    { number: !0 }
                  ]
                ])
              ]))), 128))
            ]),
            o("p", Mt, "Lebar media: " + y(c.value.width * c.value.columns + c.value.gap * (c.value.columns - 1)) + " mm.", 1),
            d[13] || (d[13] = o("p", { class: "settings-note" }, "Margin tambahan 0 mempertahankan posisi asli. Pengaturan konten kiri/kanan di bawah berlaku di dalam setiap label, bukan untuk membedakan dua kolom cetak. Samakan ukuran media dan sensor gap di printer.", -1))
          ])
        ]),
        o("div", Rt, [
          d[16] || (d[16] = o("div", { class: "settings-block-head" }, [
            o("h3", null, "Konten kiri — QR"),
            o("p", { class: "hint" }, 'Atur posisi dan ukuran QR tanpa menggeser konten kanan. QR selalu dicetak dengan identitas serial yang sama. Kotak "adonan ke" di kiri atas ikut bergeser bersama QR.')
          ], -1)),
          o("div", Vt, [
            o("div", jt, [
              (g(!0), k($, null, R(E(b), (i) => (g(), k("div", {
                key: i.key,
                class: "field"
              }, [
                o("label", {
                  for: `pqr-${i.key}`
                }, y(i.label), 9, Qt),
                q(o("input", {
                  id: `pqr-${i.key}`,
                  "onUpdate:modelValue": (N) => u.value[i.key] = N,
                  class: "input",
                  type: "number",
                  min: i.min,
                  max: i.max,
                  step: i.step
                }, null, 8, Gt), [
                  [
                    V,
                    u.value[i.key],
                    void 0,
                    { number: !0 }
                  ]
                ])
              ]))), 128))
            ]),
            d[15] || (d[15] = o("p", { class: "settings-note" }, "Geser 0 memakai posisi ZPL asli. Nilai negatif menggeser ke kiri/atas, positif ke kanan/bawah; posisi tidak melewati titik nol media. QR acuan 16 memakai magnifikasi 4 pada 203 DPI. Perbesar area label bila konten terpotong.", -1))
          ])
        ]),
        o("div", Wt, [
          d[21] || (d[21] = o("div", { class: "settings-block-head" }, [
            o("h3", null, "Konten kanan — Teks"),
            o("p", { class: "hint" }, "Atur blok prefix, nama produk, SKU, MFG, EXP, footer dan nomor urut secara terpisah dari QR. Nama produk tetap dicetak.")
          ], -1)),
          o("div", Jt, [
            o("div", Bt, [
              (g(!0), k($, null, R(E(S), (i) => (g(), k("div", {
                key: i.key,
                class: "field"
              }, [
                o("label", {
                  for: `pqr-${i.key}`
                }, y(i.label), 9, Zt),
                q(o("input", {
                  id: `pqr-${i.key}`,
                  "onUpdate:modelValue": (N) => u.value[i.key] = N,
                  class: "input",
                  type: "number",
                  min: i.min,
                  max: i.max,
                  step: i.step
                }, null, 8, Kt), [
                  [
                    V,
                    u.value[i.key],
                    void 0,
                    { number: !0 }
                  ]
                ])
              ]))), 128)),
              o("div", Xt, [
                d[18] || (d[18] = o("label", { for: "pqr-align" }, "Perataan teks", -1)),
                q(o("select", {
                  id: "pqr-align",
                  "onUpdate:modelValue": d[3] || (d[3] = (i) => u.value.align = i),
                  class: "input"
                }, [...d[17] || (d[17] = [
                  o("option", { value: "left" }, "Kiri", -1),
                  o("option", { value: "center" }, "Tengah", -1),
                  o("option", { value: "right" }, "Kanan", -1)
                ])], 512), [
                  [M, u.value.align]
                ])
              ]),
              o("div", Yt, [
                d[19] || (d[19] = o("label", { for: "pqr-footer" }, "Footer", -1)),
                q(o("input", {
                  id: "pqr-footer",
                  "onUpdate:modelValue": d[4] || (d[4] = (i) => u.value.footer = i),
                  maxlength: "100",
                  class: "input"
                }, null, 512), [
                  [V, u.value.footer]
                ])
              ])
            ]),
            d[20] || (d[20] = o("p", { class: "settings-note" }, "Lebar 0 mengikuti sisa area label; ukuran prefix 0 mengikuti font asli. Jumlah baris nama menambah ruang sebelum SKU/MFG/EXP. Geser teks juga memindahkan nomor urut, tanpa menggeser QR. Periksa hasil penyesuaian dengan cetak TEST.", -1))
          ])
        ])
      ]),
      r.value ? (g(), k("div", en, [
        o("p", {
          role: "status",
          class: ge(a.value ? "err" : "hint")
        }, y(r.value), 3)
      ])) : D("", !0),
      o("div", tn, [
        o("button", {
          type: "button",
          class: "btn btn-primary",
          disabled: n.value,
          onClick: T
        }, "Simpan layout label", 8, nn),
        o("button", {
          type: "button",
          class: "btn",
          disabled: n.value,
          onClick: h
        }, "Pulihkan default ZPL", 8, rn)
      ])
    ]));
  }
};
function dn(p, u = 0) {
  const c = `/product_qr_work_order_label?name=${encodeURIComponent(p)}`;
  return u > 0 ? `${c}&extra=${u}` : c;
}
export {
  cn as LabelLayoutSettings,
  ln as WorkOrderLabelButton,
  un as WorkOrderLabelDialogs,
  X as connectQz,
  Pe as labelCountForWorkOrder,
  O as labelPrintPrompt,
  ue as labelSource,
  _e as offerLabelPrint,
  ze as printLabels,
  dn as workOrderLabelUrl
};

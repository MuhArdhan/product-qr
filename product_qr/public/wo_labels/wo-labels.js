import { reactive as le, unref as T, openBlock as m, createElementBlock as k, createElementVNode as s, createVNode as ne, createTextVNode as I, createCommentVNode as D, ref as P, computed as $, watch as K, nextTick as X, Fragment as M, toDisplayString as v, withModifiers as R, withDirectives as H, vModelSelect as V, vModelText as z, renderList as j, onMounted as ue, normalizeClass as ce } from "vue";
import { Printer as de, QrCode as fe } from "lucide-vue-next";
import { g as pe, a as be, b as me, n as G, l as W, c as ae, S as ke, L as Y, d as Q, s as ge, r as ve } from "./label-layout-CO62hXZW.js";
function ye(p) {
  return !!p?.displayUom && p.displayUom !== p.stockUom && Number.isFinite(p.qtyInPack) && p.qtyInPack > 0;
}
function oe(p) {
  return p.skipPrepacking ? p.postpacking : p.prepacking;
}
function he(p) {
  const l = Number(oe(p)?.goodQty), c = ye(p) ? p.qtyInPack : 1;
  return Math.max(1, Math.ceil(l / c - 1e-8));
}
const N = le({ workOrder: "", labelCount: 0, afterSave: "" });
function we(p, l, c = "") {
  N.workOrder = p, N.labelCount = l, N.afterSave = c;
}
const se = (p, l) => {
  const c = p.__vccOpts || p;
  for (const [t, g] of l)
    c[t] = g;
  return c;
}, Ce = {
  key: 0,
  class: "toolbar ws-label-actions"
}, Se = {
  __name: "WorkOrderLabelButton",
  props: { workOrder: { type: Object, required: !0 } },
  setup(p) {
    return (l, c) => T(oe)(p.workOrder)?.confirmed ? (m(), k("div", Ce, [
      s("button", {
        class: "btn ws-label-print",
        type: "button",
        onClick: c[0] || (c[0] = (t) => T(we)(p.workOrder.id, T(he)(p.workOrder)))
      }, [
        ne(T(de), {
          size: 14,
          "stroke-width": 2
        }),
        c[1] || (c[1] = I(" Cetak Label ", -1))
      ])
    ])) : D("", !0);
  }
}, Xt = /* @__PURE__ */ se(Se, [["__scopeId", "data-v-c9012b16"]]);
function xe(p) {
  throw new Error('Could not dynamically require "' + p + '". Please configure the dynamicRequireTargets or/and ignoreDynamicRequires option of @rollup/plugin-commonjs appropriately for this require call to work.');
}
var J = { exports: {} };
const Ae = {}, Pe = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Ae
}, Symbol.toStringTag, { value: "Module" })), _e = /* @__PURE__ */ pe(Pe);
var ee;
function Le() {
  return ee || (ee = 1, (function(p, l) {
    var c = (function() {
      Array.isArray || (Array.isArray = function(e) {
        return Object.prototype.toString.call(e) === "[object Array]";
      }), Number.isInteger || (Number.isInteger = function(e) {
        return typeof e == "number" && isFinite(e) && Math.floor(e) === e;
      }), Array.from || (Array.from = function(e) {
        return [].slice.call(e);
      }), String.prototype.padStart || (String.prototype.padStart = function(r, n) {
        if (r = r >> 0, n = String(typeof n < "u" ? n : " "), this.length >= r)
          return String(this);
        for (var a = r - this.length, o = ""; o.length < a; )
          o += n;
        return o.slice(0, a) + String(this);
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
              var r, n, a;
              return t.tools.promise(function(o, u) {
                r = new t.tools.ws(e), t.websocket.connection = r, a = function() {
                  o(r);
                }, n = function(b) {
                  t.websocket.connection = null, u(b);
                }, r.addEventListener("open", a), r.addEventListener("error", n), r.addEventListener("close", n);
              }).finally(function() {
                r.removeEventListener("open", a), r.removeEventListener("error", n), r.removeEventListener("close", n);
              });
            },
            connectToAddress: function(e) {
              var r = t.tools.getLna();
              t.log.trace("Attempting connection", e);
              var n;
              return r ? (t.log.trace("Connecting with lna.js"), n = r.detectLna(e, t.websocket.setup.webSocketPromise, {
                isWebSocket: !0,
                defaultAddressSpace: "public"
              })) : (t.log.trace("Connecting without lna.js"), n = t.websocket.setup.webSocketPromise(e)), n.catch(function(a) {
                var o = a.denied ? "Connection attempt denied by Local Network Access restrictions" : "Unable to establish connection with " + t.TITLE, u = new Error(o);
                throw r && a instanceof r.LnaError && (u.denied = a.denied, u.permission = a.permission), u;
              });
            },
            /** Loop through possible ports to open connection, sets web socket calls that will settle the promise. */
            findConnection: function(e, r, n) {
              if (t.websocket.shutdown) {
                n(new Error("Connection attempt cancelled by user"));
                return;
              }
              if (e.port.secure.length)
                !e.port.insecure.length && !e.usingSecure && (t.log.trace("No insecure ports specified - forcing secure connection"), e.usingSecure = !0);
              else if (e.port.insecure.length)
                e.usingSecure && (t.log.error("No secure ports specified - forcing insecure connection"), e.usingSecure = !1);
              else {
                n(new Error("No ports have been specified to connect over"));
                return;
              }
              var a = function(b) {
                if (t.websocket.shutdown) {
                  n(new Error("Connection attempt cancelled by user"));
                  return;
                }
                if (b.denied) {
                  n(b);
                  return;
                }
                if (e.port.portIndex++, e.usingSecure && e.port.portIndex >= e.port.secure.length || !e.usingSecure && e.port.portIndex >= e.port.insecure.length)
                  if (e.hostIndex >= e.host.length - 1) {
                    n(b);
                    return;
                  } else
                    e.hostIndex++, e.port.portIndex = 0;
                t.websocket.setup.findConnection(e, r, n);
              }, o;
              e.usingSecure ? o = e.protocol.secure + e.host[e.hostIndex] + ":" + e.port.secure[e.port.portIndex] : o = e.protocol.insecure + e.host[e.hostIndex] + ":" + e.port.insecure[e.port.portIndex];
              var u = t.websocket.setup.connectToAddress(o);
              u.then(
                //called on successful connection to qz, begins setup of websocket calls and resolves connect promise after certificate is sent
                function() {
                  if (t.log.info("Established connection with " + t.TITLE + " on " + o), t.websocket.setup.openConnection({ resolve: r, reject: n }), e.keepAlive > 0) {
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
              t.websocket.connection.onclose = function(n) {
                t.log.trace(n), t.websocket.connection = null, t.websocket.callClose(n), t.log.info("Closed connection with " + t.TITLE);
                for (var a in t.websocket.pendingCalls)
                  t.websocket.pendingCalls.hasOwnProperty(a) && t.websocket.pendingCalls[a].reject(new Error("Connection closed before response received"));
                this.promise != null && this.promise.resolve();
              }, t.websocket.connection.onerror = function(n) {
                t.websocket.callError(n);
              }, t.websocket.connection.sendData = function(n) {
                t.log.trace("Preparing object for websocket", n), n.timestamp == null && (n.timestamp = Date.now(), typeof n.timestamp != "number" && (n.timestamp = (/* @__PURE__ */ new Date()).getTime())), n.promise != null && (n.uid = t.websocket.setup.newUID(), t.websocket.pendingCalls[n.uid] = n.promise), n.position = {
                  x: typeof screen < "u" ? (screen.availWidth || screen.width) / 2 + (screen.left || screen.availLeft || 0) : 0,
                  y: typeof screen < "u" ? (screen.availHeight || screen.height) / 2 + (screen.top || screen.availTop || 0) : 0
                };
                try {
                  if (n.call != null && n.signature == null && t.security.needsSigned(n.call)) {
                    var a = {
                      call: n.call,
                      params: n.params,
                      timestamp: n.timestamp
                    }, o = t.tools.hash(t.tools.stringify(a));
                    o.then || (o = t.tools.promise(function(u) {
                      u(o);
                    })), o.then(function(u) {
                      return t.security.callSign(u);
                    }).then(function(u) {
                      t.log.trace("Signature for call", u), n.signature = u || "", n.signAlgorithm = t.security.signAlgorithm, t.signContent = void 0, t.websocket.connection.send(t.tools.stringify(n));
                    }).catch(function(u) {
                      t.log.error("Signing failed", u), n.promise != null && (n.promise.reject(new Error("Failed to sign request")), delete t.websocket.pendingCalls[n.uid]);
                    });
                  } else
                    t.log.trace("Signature for call", n.signature), t.websocket.connection.send(t.tools.stringify(n));
                } catch (u) {
                  t.log.error(u), n.promise != null && (n.promise.reject(u), delete t.websocket.pendingCalls[n.uid]);
                }
              }, t.websocket.connection.onmessage = function(n) {
                var a = JSON.parse(n.data);
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
                var o = t.websocket.pendingCalls[a.uid];
                o == null ? t.log.allay("No promise found for returned response") : a.error != null ? o.reject(new Error(a.error)) : o.resolve(a.result), delete t.websocket.pendingCalls[a.uid];
              };
              function r(n) {
                n === void 0 && (n = null), y.api.getVersion().then(function(a) {
                  t.websocket.connection.version = a, t.websocket.connection.semver = a.toLowerCase().replace(/-rc\./g, "-rc").split(/[\\+\\.-]/g);
                  for (var o = 0; o < t.websocket.connection.semver.length; o++) {
                    try {
                      if (o == 3 && t.websocket.connection.semver[o].toLowerCase().indexOf("rc") == 0) {
                        t.websocket.connection.semver[o] = -t.websocket.connection.semver[o].replace(/\D/g, "");
                        continue;
                      }
                      t.websocket.connection.semver[o] = parseInt(t.websocket.connection.semver[o]);
                    } catch {
                    }
                    t.websocket.connection.semver.length < 4 && (t.websocket.connection.semver[3] = 0);
                  }
                  t.compatible.algorithm(!0);
                }).then(function() {
                  t.websocket.connection.sendData({ certificate: n, promise: e });
                });
              }
              t.security.callCert().then(r).catch(function(n) {
                t.log.warn("Failed to get certificate:", n), t.security.rejectOnCertFailure ? e.reject(n) : r(null);
              });
            },
            /** Generate unique ID used to map a response to a call. */
            newUID: function() {
              var e = 6;
              return (new Array(e + 1).join("0") + (Math.random() * Math.pow(36, e) << 0).toString(36)).slice(-e);
            }
          },
          dataPromise: function(e, r, n, a) {
            return t.tools.promise(function(o, u) {
              var b = {
                call: e,
                promise: { resolve: o, reject: u },
                params: r,
                signature: n,
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
              for (var r = 0; r < t.websocket.errorCallbacks.length; r++)
                t.websocket.errorCallbacks[r](e);
            else
              t.websocket.errorCallbacks(e);
          },
          /** List of function to call on closing from the websocket. */
          closedCallbacks: [],
          /** Calls all functions registered to listen for closing. */
          callClose: function(e) {
            if (Array.isArray(t.websocket.closedCallbacks))
              for (var r = 0; r < t.websocket.closedCallbacks.length; r++)
                t.websocket.closedCallbacks[r](e);
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
              for (var r = 0; r < t.serial.serialCallbacks.length; r++)
                t.serial.serialCallbacks[r](e);
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
              for (var r = 0; r < t.socket.socketCallbacks.length; r++)
                t.socket.socketCallbacks[r](e);
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
              for (var r = 0; r < t.usb.usbCallbacks.length; r++)
                t.usb.usbCallbacks[r](e);
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
              for (var r = 0; r < t.hid.hidCallbacks.length; r++)
                t.hid.hidCallbacks[r](e);
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
              for (var r = 0; r < t.printers.printerCallbacks.length; r++)
                t.printers.printerCallbacks[r](e);
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
              for (var r = 0; r < t.file.fileCallbacks.length; r++)
                t.file.fileCallbacks[r](e);
            else
              t.file.fileCallbacks(e);
          }
        },
        security: {
          /** Function used to resolve promise when acquiring site's public certificate. */
          certHandler: function(e, r) {
            r();
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
            const r = [
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
            return e != null && r.indexOf(e) === -1;
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
            return t.tools.promise(function(r, n) {
              n(e);
            });
          },
          stringify: function(e) {
            var r = Array.prototype.toJSON;
            delete Array.prototype.toJSON;
            function n(o, u) {
              if (o !== "promise")
                return u;
            }
            var a = JSON.stringify(e, n);
            return r && (Array.prototype.toJSON = r), a;
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
              if (typeof xe == "function")
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
              var r = document.createElement("a");
              return r.href = e, r.href;
            } else
              return _e.resolve(e);
          },
          relative: function(e) {
            for (var r = 0; r < e.length; r++)
              if (e[r].constructor === Object) {
                var n = !1;
                e[r].data && e[r].data.search && e[r].data.search(/data:image\/\w+;base64,/) === 0 ? (e[r].flavor = "base64", e[r].data = e[r].data.replace(/^data:image\/\w+;base64,/, "")) : e[r].flavor ? ["FILE", "XML"].indexOf(e[r].flavor.toUpperCase()) > -1 && (n = !0) : (e[r].format && ["HTML", "IMAGE", "PDF", "FILE", "XML"].indexOf(e[r].format.toUpperCase()) > -1 || e[r].type && (["PIXEL", "IMAGE", "PDF"].indexOf(e[r].type.toUpperCase()) > -1 && !e[r].format || ["HTML", "PDF"].indexOf(e[r].type.toUpperCase()) > -1 && (!e[r].format || e[r].format.toUpperCase() === "FILE"))) && (n = !0), n && (e[r].data = t.tools.absolute(e[r].data)), e[r].options && typeof e[r].options.overlay == "string" && (e[r].options.overlay = t.tools.absolute(e[r].options.overlay));
              }
          },
          /** Performs deep copy to target from remaining params */
          extend: function(e) {
            typeof e != "object" && (e = {});
            for (var r = 1; r < arguments.length; r++) {
              var n = arguments[r];
              if (n) {
                for (var a in n)
                  if (n.hasOwnProperty(a)) {
                    if (e === n[a])
                      continue;
                    if (n[a] && n[a].constructor && n[a].constructor === Object) {
                      var o;
                      Array.isArray(n[a]) ? o = e[a] || [] : o = e[a] || {}, e[a] = t.tools.extend(o, n[a]);
                    } else n[a] !== void 0 && (e[a] = n[a]);
                  }
              }
            }
            return e;
          },
          versionCompare: function(e, r, n, a) {
            if (t.tools.assertActive()) {
              var o = t.websocket.connection.semver;
              if (Array.isArray(o)) {
                if (e != null && o.length > 0 && o[0] != e)
                  return o[0] - e;
                if (r != null && o.length > 1 && o[1] != r)
                  return o[1] - r;
                if (n != null && o.length > 2 && o[2] != n)
                  return o[2] - n;
                if (a != null && o.length > 3 && o[3] != a)
                  return Number.isInteger(o[3]) && Number.isInteger(a) ? o[3] - a : o[3].toString().localeCompare(a.toString());
              }
              return 0;
            }
          },
          isVersion: function(e, r, n, a) {
            return t.tools.versionCompare(e, r, n, a) == 0;
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
            return Array.from(e).map(function(r) {
              return r.toString(16).padStart(2, "0");
            }).join("");
          },
          uint8ArrayToBase64: function(e) {
            var r = [
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
            ], n = "", a, o = e.length;
            for (a = 2; a < o; a += 3)
              n += r[e[a - 2] >> 2], n += r[(e[a - 2] & 3) << 4 | e[a - 1] >> 4], n += r[(e[a - 1] & 15) << 2 | e[a] >> 6], n += r[e[a] & 63];
            return a === o + 1 && (n += r[e[a - 2] >> 2], n += r[(e[a - 2] & 3) << 4], n += "=="), a === o && (n += r[e[a - 2] >> 2], n += r[(e[a - 2] & 3) << 4 | e[a - 1] >> 4], n += r[(e[a - 1] & 15) << 2], n += "="), n;
          }
        },
        compatible: {
          /** Converts message format to a previous version's */
          data: function(e) {
            for (var r = 0; r < e.length; r++)
              if (e[r].constructor === Object && e[r].data instanceof Uint8Array && e[r].flavor) {
                var n = e[r].flavor.toString().toUpperCase();
                switch (n) {
                  case "BASE64":
                    e[r].data = t.tools.uint8ArrayToBase64(e[r].data);
                    break;
                  case "HEX":
                    e[r].data = t.tools.uint8ArrayToHex(e[r].data);
                    break;
                  default:
                    throw new Error("Uint8Array conversion to '" + n + "' is not supported.");
                }
              }
            if (t.tools.versionCompare(2, 2, 4) < 0)
              for (var r = 0; r < e.length; r++)
                e[r].constructor === Object && e[r].options && typeof e[r].options.dotDensity == "string" && (e[r].options.dotDensity = e[r].options.dotDensity.toLowerCase().replace("-legacy", ""));
            if (t.tools.isVersion(2, 0)) {
              t.log.trace("Converting print data to v2.0 for " + t.websocket.connection.version);
              for (var r = 0; r < e.length; r++)
                e[r].constructor === Object && (e[r].type && e[r].type.toUpperCase() === "RAW" && e[r].format && e[r].format.toUpperCase() === "IMAGE" && (e[r].flavor && e[r].flavor.toUpperCase() === "BASE64" && (e[r].data = "data:image/compat;base64," + e[r].data), e[r].flavor = "IMAGE"), (e[r].type && e[r].type.toUpperCase() === "RAW" || e[r].format && e[r].format.toUpperCase() === "COMMAND") && (e[r].format = "RAW"), e[r].type = e[r].format, e[r].format = e[r].flavor, delete e[r].flavor);
            }
          },
          /* Converts config defaults to match previous version */
          config: function(e, r) {
            return t.tools.isVersion(2, 0) && (r.rasterize || (e.rasterize = !0)), t.tools.versionCompare(2, 2) < 0 && e.forceRaw !== "undefined" && (e.altPrinting = e.forceRaw, delete e.forceRaw), t.tools.versionCompare(2, 1, 2, 11) < 0 && e.spool && (e.spool.size && (e.perSpool = e.spool.size, delete e.spool.size), e.spool.end && (e.endOfDoc = e.spool.end, delete e.spool.end), delete e.spool), e;
          },
          /** Compat wrapper with previous version **/
          networking: function(e, r, n, a, o) {
            return t.tools.isVersion(2, 0) ? t.tools.promise(function(u, b) {
              t.websocket.dataPromise("websocket.getNetworkInfo", {
                hostname: e,
                port: r
              }, n, a).then(function(h) {
                u(typeof o < "u" ? o(h) : h);
              }, b);
            }) : t.tools.promise(function(u, b) {
              t.websocket.dataPromise("networking.device", {
                hostname: e,
                port: r
              }, n, a).then(function(h) {
                u({ ipAddress: h.ip, macAddress: h.mac });
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
            for (var r = [
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
            ], n = [1779033703, 3144134277, 1013904242, 2773480762, 1359893119, 2600822924, 528734635, 1541459225], a = e.length / 4 + 2, o = Math.ceil(a / 16), u = new Array(o), b = 0; b < o; b++) {
              u[b] = new Array(16);
              for (var h = 0; h < 16; h++)
                u[b][h] = e.charCodeAt(b * 64 + h * 4) << 24 | e.charCodeAt(b * 64 + h * 4 + 1) << 16 | e.charCodeAt(b * 64 + h * 4 + 2) << 8 | e.charCodeAt(b * 64 + h * 4 + 3);
            }
            u[o - 1][14] = (e.length - 1) * 8 / Math.pow(2, 32), u[o - 1][14] = Math.floor(u[o - 1][14]), u[o - 1][15] = (e.length - 1) * 8 & 4294967295;
            for (var S = new Array(64), _, E, O, w, A, F, C, d, b = 0; b < o; b++) {
              for (var i = 0; i < 16; i++)
                S[i] = u[b][i];
              for (var i = 16; i < 64; i++)
                S[i] = t.SHA._dev1(S[i - 2]) + S[i - 7] + t.SHA._dev0(S[i - 15]) + S[i - 16] & 4294967295;
              _ = n[0], E = n[1], O = n[2], w = n[3], A = n[4], F = n[5], C = n[6], d = n[7];
              for (var i = 0; i < 64; i++) {
                var q = d + t.SHA._sig1(A) + t.SHA._ch(A, F, C) + r[i] + S[i], L = t.SHA._sig0(_) + t.SHA._maj(_, E, O);
                d = C, C = F, F = A, A = w + q & 4294967295, w = O, O = E, E = _, _ = q + L & 4294967295;
              }
              n[0] = n[0] + _ & 4294967295, n[1] = n[1] + E & 4294967295, n[2] = n[2] + O & 4294967295, n[3] = n[3] + w & 4294967295, n[4] = n[4] + A & 4294967295, n[5] = n[5] + F & 4294967295, n[6] = n[6] + C & 4294967295, n[7] = n[7] + d & 4294967295;
            }
            return t.SHA._hexStr(n[0]) + t.SHA._hexStr(n[1]) + t.SHA._hexStr(n[2]) + t.SHA._hexStr(n[3]) + t.SHA._hexStr(n[4]) + t.SHA._hexStr(n[5]) + t.SHA._hexStr(n[6]) + t.SHA._hexStr(n[7]);
          },
          // Rotates right (circular right shift) value x by n positions
          _rotr: function(e, r) {
            return r >>> e | r << 32 - e;
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
          _ch: function(e, r, n) {
            return e & r ^ ~e & n;
          },
          _maj: function(e, r, n) {
            return e & r ^ e & n ^ r & n;
          },
          // note can't use toString(16) as it is implementation-dependant, and in IE returns signed numbers when used on full words
          _hexStr: function(e) {
            for (var r = "", n, a = 7; a >= 0; a--)
              n = e >>> a * 4 & 15, r += n.toString(16);
            return r;
          },
          // implementation of deprecated unescape() based on https://cwestblog.com/2011/05/23/escape-unescape-deprecated/ (and comments)
          _unescape: function(e) {
            return e.replace(/%(u[\da-f]{4}|[\da-f]{2})/gi, function(r) {
              if (r.length - 1)
                return String.fromCharCode(parseInt(r.substring(r.length - 3 ? 2 : 1), 16));
              var n = r.charCodeAt(0);
              return n < 256 ? "%" + (0 + n.toString(16)).slice(-2).toUpperCase() : "%u" + ("000" + n.toString(16)).slice(-4).toUpperCase();
            });
          },
          _utf8Encode: function(e) {
            return t.SHA._unescape(encodeURIComponent(e));
          }
          //@formatter:on
        }
      };
      function g(e, r) {
        this.config = t.tools.extend({}, t.printing.defaultConfig), this._dirtyOpts = {}, this.setPrinter = function(n) {
          typeof n == "string" && (n = { name: n }), this.printer = n;
        }, this.getPrinter = function() {
          return this.printer;
        }, this.reconfigure = function(n) {
          for (var a in n)
            n[a] !== void 0 && (this._dirtyOpts[a] = !0);
          t.tools.extend(this.config, n);
        }, this.getOptions = function() {
          return t.compatible.config(this.config, this._dirtyOpts);
        }, this.setPrinter(e), this.reconfigure(r);
      }
      g.prototype.print = function(e, r, n) {
        y.print(this, e, r, n);
      };
      var y = {
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
            return t.tools.promise(function(r, n) {
              if (t.websocket.connection) {
                const u = t.websocket.connection.readyState;
                if (u === t.tools.ws.OPEN) {
                  n(new Error("An open connection with " + t.TITLE + " already exists"));
                  return;
                } else if (u === t.tools.ws.CONNECTING) {
                  n(new Error("The current connection attempt has not returned yet"));
                  return;
                } else if (u === t.tools.ws.CLOSING) {
                  n(new Error("Waiting for previous disconnect request to complete"));
                  return;
                }
              }
              if (t.tools.ws) {
                if (!t.tools.ws.CLOSED || t.tools.ws.CLOSED == 2) {
                  n(new Error("Unsupported WebSocket version detected: HyBi-00/Hixie-76"));
                  return;
                }
              } else {
                n(new Error("WebSocket not supported by this browser"));
                return;
              }
              if (e == null && (e = {}), (typeof location > "u" || location.protocol !== "https:") && typeof e.usingSecure > "u" && (t.log.trace("Disabling secure ports due to insecure page"), e.usingSecure = !1), typeof e.host < "u" && !Array.isArray(e.host) && (e.host = [e.host], t.websocket.connectConfig.usingSurf))
                for (var a = 0; a < e.host.length; a++)
                  e.host[a] = t.tools.appendSurf(e.host[a]);
              t.websocket.shutdown = !1;
              var o = function(u) {
                var b = !1, h = function() {
                  b || (b = !0, e && u < e.retries ? o(u + 1) : (t.websocket.connection = null, n.apply(null, arguments)));
                }, S = function() {
                  var _ = t.tools.extend({}, t.websocket.connectConfig, e);
                  t.websocket.setup.findConnection(_, r, h);
                };
                u == 0 ? S() : setTimeout(S, e.delay * 1e3);
              };
              o(0);
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
            return t.tools.promise(function(e, r) {
              t.websocket.connection != null ? t.tools.isActive() || t.websocket.connection.readyState === t.tools.ws.CONNECTING ? (t.websocket.shutdown = !0, t.websocket.connection.promise = { resolve: e, reject: r }, t.websocket.connection.close()) : r(new Error("Current connection is still closing")) : r(new Error("No open connection with " + t.TITLE));
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
          getDefault: function(e, r) {
            return t.websocket.dataPromise("printers.getDefault", null, e, r);
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
          find: function(e, r, n) {
            return t.websocket.dataPromise("printers.find", { query: e }, r, n);
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
          startListening: function(e, r) {
            Array.isArray(e) || (e = [e]);
            var n = {
              printerNames: e
            };
            return r && r.jobData == !0 && (n.jobData = !0), r && r.maxJobData && (n.maxJobData = r.maxJobData), r && r.flavor && (n.flavor = r.flavor), t.websocket.dataPromise("printers.startListening", n);
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
          create: function(e, r) {
            return new g(e, r);
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
        print: function(e, r) {
          var n = !1, a = [], o = [];
          arguments.length >= 3 && (typeof arguments[2] == "boolean" ? (n = arguments[2], arguments.length >= 5 && (a = arguments[3], o = arguments[4])) : arguments.length >= 4 && (a = arguments[2], o = arguments[3]), a && !Array.isArray(a) && (a = [a]), o && !Array.isArray(o) && (o = [o])), Array.isArray(e) || (e = [e]), Array.isArray(r[0]) || (r = [r]);
          for (var u = 0; u < r.length; u++)
            t.tools.relative(r[u]), t.compatible.data(r[u]);
          for (var b = function(w) {
            var A = {
              printer: w.config.getPrinter(),
              options: w.config.getOptions(),
              data: w.data
            };
            return t.websocket.dataPromise("print", A, w.signature, w.timestamp);
          }, h = [], S = 0; S < e.length || S < r.length; S++)
            (function(w) {
              var A = {
                config: e[Math.min(w, e.length - 1)],
                data: r[Math.min(w, r.length - 1)],
                signature: a[w],
                timestamp: o[w]
              };
              h.push(function() {
                return b(A);
              });
            })(S);
          var _ = null;
          if (n) {
            var E = [];
            _ = function(w) {
              E.push(w);
            }, h.push(function() {
              return t.tools.promise(function(w, A) {
                E.length ? A(E) : w();
              });
            });
          }
          var O = null;
          return h.reduce(function(w, A) {
            return O = w.catch(_).then(A), O;
          }, t.tools.promise(function(w) {
            w();
          })), O;
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
          openPort: function(e, r) {
            var n = {
              port: e,
              options: r
            };
            return t.websocket.dataPromise("serial.openPort", n);
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
          sendData: function(e, r, n) {
            t.tools.versionCompare(2, 1, 0, 12) >= 0 && (typeof r != "object" && (r = {
              data: r,
              type: "PLAIN"
            }), r.type && r.type.toUpperCase() == "FILE" && (r.data = t.tools.absolute(r.data)));
            var a = {
              port: e,
              data: r,
              options: n
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
          open: function(e, r, n) {
            var a = {
              host: e,
              port: r,
              options: n
            };
            return t.websocket.dataPromise("socket.open", a);
          },
          /**
           * @param {string} host The connection hostname.
           * @param {number} port The connection port number.
           *
           * @memberof qz.socket
           */
          close: function(e, r) {
            var n = {
              host: e,
              port: r
            };
            return t.websocket.dataPromise("socket.close", n);
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
          sendData: function(e, r, n) {
            typeof n != "object" && (n = {
              data: n,
              type: "PLAIN"
            });
            var a = {
              host: e,
              port: r,
              data: n
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
          list: function(e, r) {
            var n = t.tools.extend({ path: e }, r);
            return t.websocket.dataPromise("file.list", n);
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
          read: function(e, r) {
            var n = t.tools.extend({ path: e }, r);
            return t.websocket.dataPromise("file.read", n);
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
          write: function(e, r) {
            var n = t.tools.extend({ path: e }, r);
            return t.websocket.dataPromise("file.write", n);
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
          remove: function(e, r) {
            var n = t.tools.extend({ path: e }, r);
            return t.websocket.dataPromise("file.remove", n);
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
          startListening: function(e, r) {
            r && typeof r.include < "u" && !Array.isArray(r.include) && (r.include = [r.include]), r && typeof r.exclude < "u" && !Array.isArray(r.exclude) && (r.exclude = [r.exclude]);
            var n = t.tools.extend({ path: e }, r);
            return t.websocket.dataPromise("file.startListening", n);
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
          stopListening: function(e, r) {
            var n = t.tools.extend({ path: e }, r);
            return t.websocket.dataPromise("file.stopListening", n);
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
          device: function(e, r) {
            return t.tools.isVersion(2, 0) ? t.compatible.networking(e, r, null, null, function(n) {
              return { ip: n.ipAddress, mac: n.macAddress };
            }) : t.websocket.dataPromise("networking.device", {
              hostname: e,
              port: r
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
          hostname: function(e, r) {
            return t.tools.versionCompare(2, 2, 2) < 0 ? t.tools.promise(function(n, a) {
              t.websocket.dataPromise("networking.device", { hostname: e, port: r }).then(function(o) {
                console.log(o), n(o.hostname);
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
          devices: function(e, r) {
            return t.tools.isVersion(2, 0) ? t.compatible.networking(e, r, null, null, function(n) {
              return [{ ip: n.ipAddress, mac: n.macAddress }];
            }) : t.websocket.dataPromise("networking.devices", {
              hostname: e,
              port: r
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
          setCertificatePromise: function(e, r) {
            t.security.certHandler = e, t.security.rejectOnCertFailure = !!(r && r.rejectOnFailure);
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
          isVersionGreater: function(e, r, n, a) {
            return t.tools.versionCompare(e, r, n, a) > 0;
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
          isVersionLess: function(e, r, n, a) {
            return t.tools.versionCompare(e, r, n, a) < 0;
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
      return y;
    })();
    (function() {
      p.exports = c;
    })();
  })(J)), J.exports;
}
var Te = Le();
const U = /* @__PURE__ */ be(Te);
let te;
const re = {
  async print(p, l) {
    const c = await me(p, l);
    te?.remove();
    const t = document.createElement("iframe");
    te = t, t.title = "Cetak label Work Order", t.setAttribute("aria-hidden", "true"), t.style.cssText = "position:fixed;left:-10000px;top:0;width:1px;height:1px;border:0";
    try {
      await new Promise((g, y) => {
        const e = setTimeout(() => y(new Error("Halaman cetak browser tidak selesai dimuat.")), 15e3);
        t.onload = () => {
          clearTimeout(e), g();
        }, t.onerror = () => {
          clearTimeout(e), y(new Error("Gagal memuat halaman cetak browser."));
        }, t.srcdoc = c, document.body.appendChild(t);
      }), t.contentWindow.addEventListener("afterprint", () => t.remove(), { once: !0 }), t.contentWindow.focus(), t.contentWindow.print();
    } catch (g) {
      throw t.remove(), g;
    }
  }
};
async function Ee(p) {
  const l = G(p || W());
  await B(null, { layoutTest: !0, timeoutSeconds: l.qzTimeout });
  const [c, t] = await Promise.allSettled([U.printers.find(), U.printers.getDefault()]);
  if (c.status === "rejected") throw c.reason;
  return {
    printers: Array.isArray(c.value) ? c.value : c.value ? [c.value] : [],
    defaultPrinter: t.status === "fulfilled" && t.value || ""
  };
}
async function Ne(p) {
  const l = G(p), c = ae(ke, l);
  await B(null, { layoutTest: !0, timeoutSeconds: l.qzTimeout });
  const t = l.printer || await U.printers.getDefault();
  return await U.print(U.configs.create(t, { encoding: "UTF-8" }), c), t;
}
function ie(p, l) {
  try {
    const t = JSON.parse(p?._server_messages || "[]").map((g) => JSON.parse(g).message).filter(Boolean).join(" ");
    if (t) return t;
  } catch {
  }
  return l;
}
async function Oe(p) {
  const l = await fetch("/api/method/product_qr.wo_labels.labels.get_existing_label_numbers", {
    method: "POST",
    credentials: "same-origin",
    cache: "no-store",
    headers: {
      "Content-Type": "application/json",
      "X-Frappe-CSRF-Token": window.csrf_token || ""
    },
    body: JSON.stringify({ name: p })
  }), c = await l.json();
  if (!l.ok) throw new Error(ie(c, "Gagal memuat nomor urut label yang sudah terbit"));
  return c.message || [];
}
function qe(p, { layoutTest: l = !1 } = {}) {
  U.security.setCertificatePromise(async () => {
    const c = l ? "/api/method/product_qr.wo_labels.qz_signing.layout_certificate" : `/api/method/product_qr.wo_labels.qz_signing.certificate?work_order=${encodeURIComponent(p)}`, t = await fetch(c, {
      cache: "no-store"
    });
    if (!t.ok) throw new Error("Sertifikat QZ Tray belum tersedia atau akses ditolak");
    return (await t.json()).message;
  }, { rejectOnFailure: !0 }), U.security.setSignatureAlgorithm("SHA512"), U.security.setSignaturePromise(async (c) => {
    const t = await fetch(l ? "/api/method/product_qr.wo_labels.qz_signing.layout_sign" : "/api/method/product_qr.wo_labels.qz_signing.sign", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Frappe-CSRF-Token": window.csrf_token || ""
      },
      credentials: "same-origin",
      cache: "no-store",
      body: JSON.stringify(l ? { request: c } : { work_order: p, request: c })
    });
    if (!t.ok) throw new Error("Gagal menandatangani permintaan QZ Tray");
    return (await t.json()).message;
  });
}
async function B(p, { layoutTest: l = !1, timeoutSeconds: c = W()?.qzTimeout } = {}) {
  const t = G({ qzTimeout: c }).qzTimeout;
  if (qe(p, { layoutTest: l }), !U.websocket.isActive()) {
    let g;
    try {
      await Promise.race([
        U.websocket.connect({ retries: 0 }),
        new Promise((y, e) => {
          g = setTimeout(() => {
            try {
              Promise.resolve(U.websocket.disconnect()).catch(() => {
              });
            } catch {
            }
            e(new Error(`QZ Tray tidak merespons dalam ${t} detik.`));
          }, t * 1e3);
        })
      ]);
    } finally {
      clearTimeout(g);
    }
  }
}
async function Ue(p, l = 0) {
  const c = l && typeof l == "object" ? l : { extra: l }, t = { name: p, extra: c.extra ?? 0 };
  c.appendCount !== void 0 && (t.append_count = c.appendCount), c.labelNumbers !== void 0 && (t.label_numbers = c.labelNumbers);
  const g = await fetch("/api/method/product_qr.wo_labels.labels.get_label_data", {
    method: "POST",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
      "X-Frappe-CSRF-Token": window.csrf_token || ""
    },
    body: JSON.stringify(t)
  }), y = await g.json();
  if (!g.ok)
    throw new Error(ie(y, "Gagal mengambil data label"));
  const { message: e } = y;
  if (!e)
    throw new Error("Data label kosong");
  const r = e.labels?.length || 0;
  if (!r || r !== e.label_count) throw new Error("Jumlah label tidak sesuai");
  const n = W();
  if (c.output === "browser")
    try {
      return await re.print(e, n), { browserPrint: !0 };
    } catch (a) {
      throw new Error(`Cetak browser gagal: ${a.message || a}. Gunakan cetak ulang nomor label yang sudah terbit; jangan tambah label lagi.`);
    }
  try {
    await B(p, { timeoutSeconds: n?.qzTimeout });
    const a = n?.printer || await U.printers.getDefault(), o = U.configs.create(a, {
      encoding: "UTF-8"
    });
    return await U.print(o, ae(e, n)), !0;
  } catch (a) {
    console.error("QZ Tray Error:", a);
    try {
      return await re.print(e, n), { browserFallback: !0 };
    } catch (o) {
      throw new Error(`Cetak gagal: ${a.message || a}. Cetak browser juga gagal: ${o.message || o}. Gunakan cetak ulang nomor label yang sudah terbit; jangan tambah label lagi.`);
    }
  }
}
const Fe = {
  key: 0,
  class: "label-print-note",
  role: "status"
}, Ie = { id: "label-print-title" }, He = ["disabled"], De = {
  key: 0,
  class: "label-count-field"
}, $e = ["max"], ze = {
  key: 1,
  class: "label-count-field"
}, Me = {
  key: 0,
  class: "label-print-note"
}, je = {
  key: 2,
  class: "label-count-field"
}, Ve = { class: "label-print-note" }, Re = { key: 0 }, Qe = {
  key: 0,
  class: "label-print-note"
}, Ge = {
  key: 1,
  class: "label-print-note warning"
}, We = {
  key: 2,
  class: "label-print-note"
}, Je = ["value"], Be = {
  key: 4,
  class: "label-print-note"
}, Ze = { key: 3 }, Ke = { key: 4 }, Xe = { key: 5 }, Ye = {
  key: 6,
  class: "label-print-note warning"
}, et = { class: "dlg-actions" }, tt = ["disabled"], rt = ["disabled"], nt = { id: "wo-label-error-title" }, at = { class: "error-dialog-message" }, ot = {
  key: 0,
  class: "error-dialog-details"
}, st = { class: "dlg-actions" }, it = {
  __name: "WorkOrderLabelDialogs",
  setup(p) {
    const l = P(null), c = P(null), t = P(null), g = P(null), y = P(""), e = P(!1), r = P("automatic"), n = P(1), a = P(0), o = P([]), u = P(""), b = P(null), h = P(!1), S = P("");
    let _ = 0;
    const E = $(() => a.value !== "" && Number.isInteger(Number(a.value)) && Number(a.value) >= 0), O = $(() => n.value !== "" && Number.isInteger(Number(n.value)) && Number(n.value) >= 1 && Number(n.value) <= 1e4), w = $(() => Math.max(0, ...o.value.map((L) => Number(L.label_number) || 0))), A = $(() => r.value === "automatic" ? N.labelCount + Number(a.value || 0) : r.value === "append" ? Number(n.value || 0) : u.value ? 1 : 0), F = $(() => r.value === "automatic" ? E.value && A.value >= 1 && A.value <= 1e4 : r.value === "append" ? o.value.length > 0 && O.value : o.value.some((L) => Number(L.label_number) === Number(u.value)));
    async function C(L = N.workOrder) {
      if (!L) return;
      y.value = "";
      const f = ++_;
      h.value = !0, S.value = "";
      try {
        const x = await Oe(L);
        f === _ && L === N.workOrder && (o.value = x?.labels || [], b.value = x?.adonan_ke ?? null);
      } catch (x) {
        f === _ && (o.value = [], b.value = null, S.value = x.message || "Gagal memuat nomor urut label.");
      } finally {
        f === _ && (h.value = !1);
      }
    }
    K(() => N.workOrder, (L) => {
      L && (r.value = "automatic", n.value = 1, a.value = 0, o.value = [], u.value = "", b.value = null, C(L), X(() => {
        l.value?.open || l.value?.showModal();
      }));
    }), K(g, (L) => {
      L && X(() => {
        c.value?.open || c.value?.showModal(), t.value?.focus();
      });
    });
    function d() {
      e.value || (l.value?.open && l.value.close(), _++, r.value = "automatic", n.value = 1, a.value = 0, o.value = [], u.value = "", b.value = null, h.value = !1, S.value = "", N.workOrder = "", N.labelCount = 0, N.afterSave = "");
    }
    async function i(L = "printer") {
      const f = N.workOrder;
      if (!(!f || !F.value || e.value)) {
        e.value = !0;
        try {
          const x = r.value === "automatic" ? { extra: Number(a.value) } : r.value === "append" ? { appendCount: Number(n.value) } : { labelNumbers: [Number(u.value)] };
          L === "browser" && (x.output = "browser");
          const Z = await Ue(f, x);
          Z?.browserFallback ? y.value = "Cetak QZ gagal. Dialog cetak browser dibuka; pilih printer atau Save as PDF. Periksa label yang mungkin sudah tercetak agar tidak rangkap." : Z?.browserPrint && (y.value = "Dialog cetak browser dibuka. Pilih printer atau Save as PDF; membatalkan dialog tidak menghapus label yang sudah terbit."), e.value = !1, d();
        } catch (x) {
          g.value = {
            title: L === "browser" ? "Cetak Browser Gagal" : "Cetak Label Gagal",
            message: x.message || "Gagal terhubung ke QZ Tray atau printer.",
            details: [],
            hint: /sign|sertifikat|certificate/i.test(x.message || "") ? "Periksa sertifikat QZ Tray di komputer dan private key di server." : "Pastikan QZ Tray sedang berjalan di komputer Anda."
          };
        } finally {
          e.value = !1;
        }
      }
    }
    function q() {
      c.value?.open && c.value.close(), g.value = null;
    }
    return (L, f) => (m(), k(M, null, [
      y.value ? (m(), k("p", Fe, v(y.value), 1)) : D("", !0),
      s("dialog", {
        ref_key: "labelPrintDialog",
        ref: l,
        class: "dialog",
        "aria-labelledby": "label-print-title",
        onCancel: R(d, ["prevent"]),
        onClick: R(d, ["self"])
      }, [
        s("h3", Ie, v(T(N).afterSave ? `${T(N).afterSave} tersimpan` : "Cetak label?"), 1),
        s("p", null, [
          f[5] || (f[5] = I("Cetak label untuk Work Order ", -1)),
          s("strong", null, v(T(N).workOrder), 1),
          f[6] || (f[6] = I("?", -1))
        ]),
        s("p", null, [
          f[7] || (f[7] = I("Usulan otomatis dari Good Qty dan UOM: ", -1)),
          s("strong", null, v(T(N).labelCount) + " label", 1)
        ]),
        f[22] || (f[22] = s("label", { for: "label-count-mode" }, "Cara menentukan jumlah", -1)),
        H(s("select", {
          id: "label-count-mode",
          "onUpdate:modelValue": f[0] || (f[0] = (x) => r.value = x),
          class: "input label-dialog-select",
          style: { display: "block", width: "100%", "margin-top": "6px" }
        }, [
          f[8] || (f[8] = s("option", { value: "automatic" }, "Otomatis dari Good Qty", -1)),
          s("option", {
            value: "append",
            disabled: h.value || !o.value.length
          }, "Tambah setelah cetak awal", 8, He),
          f[9] || (f[9] = s("option", { value: "specific" }, "Pilih nomor urut label untuk cetak ulang", -1))
        ], 512), [
          [V, r.value]
        ]),
        r.value === "automatic" ? (m(), k("div", De, [
          f[10] || (f[10] = s("label", { for: "extra-label-count" }, "Label tambahan", -1)),
          H(s("input", {
            id: "extra-label-count",
            "onUpdate:modelValue": f[1] || (f[1] = (x) => a.value = x),
            type: "number",
            min: "0",
            max: Math.max(0, 1e4 - T(N).labelCount),
            step: "1",
            inputmode: "numeric",
            class: "input",
            style: { display: "block", width: "100%", "margin-top": "6px" }
          }, null, 8, $e), [
            [
              z,
              a.value,
              void 0,
              { number: !0 }
            ]
          ]),
          f[11] || (f[11] = s("p", { class: "label-print-note" }, "Jumlah awal mengikuti Good Qty.", -1))
        ])) : D("", !0),
        r.value === "append" ? (m(), k("div", ze, [
          f[12] || (f[12] = s("label", { for: "append-label-count" }, "Jumlah label lanjutan", -1)),
          H(s("input", {
            id: "append-label-count",
            "onUpdate:modelValue": f[2] || (f[2] = (x) => n.value = x),
            type: "number",
            min: "1",
            max: "10000",
            step: "1",
            inputmode: "numeric",
            class: "input",
            style: { display: "block", width: "100%", "margin-top": "6px" }
          }, null, 512), [
            [
              z,
              n.value,
              void 0,
              { number: !0 }
            ]
          ]),
          O.value ? (m(), k("p", Me, "Nomor baru: #" + v(w.value + 1) + "–#" + v(w.value + Number(n.value)) + " · setelah label awal yang sudah terbit.", 1)) : D("", !0)
        ])) : D("", !0),
        r.value === "specific" ? (m(), k("div", je, [
          f[18] || (f[18] = s("label", { for: "label-number-select" }, "Nomor urut label yang dicetak ulang", -1)),
          s("p", Ve, [
            f[13] || (f[13] = I("Nomor urut terikat ke Work Order ini", -1)),
            b.value !== null ? (m(), k("span", Re, " · Adonan ke " + v(b.value), 1)) : D("", !0),
            f[14] || (f[14] = I(".", -1))
          ]),
          h.value ? (m(), k("p", Qe, "Memuat nomor urut label…")) : S.value ? (m(), k("p", Ge, v(S.value), 1)) : o.value.length ? H((m(), k("select", {
            key: 3,
            id: "label-number-select",
            "onUpdate:modelValue": f[3] || (f[3] = (x) => u.value = x),
            class: "input label-dialog-select",
            style: { display: "block", width: "100%", "margin-top": "6px" }
          }, [
            f[15] || (f[15] = s("option", { value: "" }, "Pilih nomor label", -1)),
            (m(!0), k(M, null, j(o.value, (x) => (m(), k("option", {
              key: x.label_number,
              value: x.label_number
            }, " Label #" + v(x.label_number) + " · Adonan ke " + v(x.adonan_ke ?? "—"), 9, Je))), 128))
          ], 512)), [
            [
              V,
              u.value,
              void 0,
              { number: !0 }
            ]
          ]) : (m(), k("p", We, "Belum ada label terbit untuk Work Order ini. Cetak otomatis dari Good Qty dahulu.")),
          u.value ? (m(), k("p", Be, [
            f[16] || (f[16] = I("Dipilih: ", -1)),
            s("strong", null, "Label #" + v(u.value), 1),
            f[17] || (f[17] = I(". QR akan memakai mapping label yang sama.", -1))
          ])) : D("", !0)
        ])) : D("", !0),
        F.value && r.value === "automatic" ? (m(), k("p", Ze, [
          f[19] || (f[19] = I("Total cetak otomatis: ", -1)),
          s("strong", null, v(A.value) + " label", 1)
        ])) : F.value && r.value === "append" ? (m(), k("p", Ke, [
          f[20] || (f[20] = I("Label lanjutan: ", -1)),
          s("strong", null, v(A.value) + " label", 1)
        ])) : F.value && r.value === "specific" ? (m(), k("p", Xe, [
          f[21] || (f[21] = I("Total cetak ulang: ", -1)),
          s("strong", null, v(A.value) + " label", 1)
        ])) : (m(), k("p", Ye, v(r.value === "append" ? "Masukkan jumlah label lanjutan 1–10.000." : r.value === "specific" ? "Pilih satu nomor label untuk dicetak ulang." : "Masukkan jumlah ekstra bulat yang valid; batas 10.000 label per cetakan."), 1)),
        s("div", et, [
          s("button", {
            class: "btn",
            disabled: e.value,
            onClick: d
          }, "Nanti saja", 8, tt),
          s("button", {
            class: "btn btn-primary",
            disabled: !F.value || e.value,
            onClick: f[4] || (f[4] = (x) => i())
          }, v(e.value ? "Memproses…" : "Ya, Cetak Label"), 9, rt)
        ])
      ], 544),
      s("dialog", {
        ref_key: "errorDialog",
        ref: c,
        class: "dialog error-dialog",
        "aria-labelledby": "wo-label-error-title",
        onCancel: R(q, ["prevent"]),
        onClick: R(q, ["self"])
      }, [
        f[23] || (f[23] = s("div", {
          class: "error-dialog-icon",
          "aria-hidden": "true"
        }, "!", -1)),
        s("h2", nt, v(g.value?.title), 1),
        s("p", at, v(g.value?.message), 1),
        g.value?.details?.length ? (m(), k("ul", ot, [
          (m(!0), k(M, null, j(g.value.details, (x) => (m(), k("li", { key: x }, v(x), 1))), 128))
        ])) : D("", !0),
        s("div", st, [
          s("button", {
            ref_key: "errorClose",
            ref: t,
            class: "btn btn-primary",
            onClick: q
          }, "Tutup", 512)
        ])
      ], 544)
    ], 64));
  }
}, Yt = /* @__PURE__ */ se(it, [["__scopeId", "data-v-d0ed5b96"]]);
function lt({ selected: p = "", printers: l = [], defaultPrinter: c = "", loaded: t = !1, lastPrinted: g = "" } = {}) {
  const y = p || c;
  return y ? t && l.includes(y) ? { name: y, detail: "Terdeteksi oleh QZ Tray. Status fisik online/offline belum diperiksa." } : g === y ? { name: y, detail: "Tujuan cetak TEST terakhir. Pengiriman job bukan konfirmasi hasil cetak fisik." } : { name: y, detail: t ? "Belum terdeteksi dalam daftar QZ Tray. Periksa printer atau muat ulang daftar." : "Nama tersimpan; belum diverifikasi oleh QZ Tray." } : {
    name: "Belum diketahui",
    detail: t ? "Printer default sistem belum tersedia. Pilih printer dari daftar." : "Klik Hubungkan / muat printer untuk melihat nama printer."
  };
}
const ut = {
  class: "panel settings-panel pqr-layout",
  "aria-labelledby": "pqr-layout-title"
}, ct = { class: "panel-head" }, dt = { class: "p-ico" }, ft = { class: "panel-body" }, pt = { class: "settings-block" }, bt = { class: "settings-control" }, mt = { class: "form-grid cols2" }, kt = { class: "field" }, gt = { value: "" }, vt = ["value"], yt = { class: "field" }, ht = { for: "pqr-qzTimeout" }, wt = ["min", "max", "step"], Ct = {
  class: "settings-note",
  "data-label-printer-destination": "",
  "aria-live": "polite"
}, St = { class: "pqr-layout-actions" }, xt = ["disabled"], At = ["disabled"], Pt = { class: "settings-block" }, _t = { class: "settings-control" }, Lt = { class: "form-grid cols2" }, Tt = ["for"], Et = ["id"], Nt = ["id", "onUpdate:modelValue", "min", "max", "step"], Ot = { class: "hint" }, qt = { class: "settings-block" }, Ut = { class: "settings-control" }, Ft = { class: "form-grid cols2" }, It = ["for"], Ht = ["id", "onUpdate:modelValue", "min", "max", "step"], Dt = { class: "settings-block" }, $t = { class: "settings-control" }, zt = { class: "form-grid cols2" }, Mt = ["for"], jt = ["id", "onUpdate:modelValue", "min", "max", "step"], Vt = { class: "field" }, Rt = { class: "field wide" }, Qt = {
  key: 0,
  class: "settings-alerts"
}, Gt = { class: "panel-foot" }, Wt = ["disabled"], Jt = ["disabled"], er = {
  __name: "LabelLayoutSettings",
  setup(p) {
    const l = P(W() || { ...Y }), c = $(() => G(l.value)), t = P([]), g = P(""), y = P(!1), e = P(""), r = P(!1), n = P(""), a = P(!1), o = $(() => [...new Set([l.value.printer, ...t.value].filter(Boolean))]), u = $(() => lt({
      selected: l.value.printer,
      printers: t.value,
      defaultPrinter: g.value,
      loaded: y.value,
      lastPrinted: e.value
    })), b = Q.filter((C) => ["leftX", "leftY", "qrSize"].includes(C.key)), h = Q.filter((C) => ["rightX", "rightY", "textWidth", "prefixFontSize", "fontSize", "productFontSize", "lineHeight", "nameLines"].includes(C.key)), S = Q.find((C) => C.key === "qzTimeout"), _ = Q.filter((C) => C !== S && !b.includes(C) && !h.includes(C));
    async function E(C, d) {
      if (!r.value) {
        r.value = !0, n.value = "", a.value = !1;
        try {
          await C(), n.value = d;
        } catch (i) {
          a.value = !0, n.value = i.message || "Pengaturan label gagal.";
        } finally {
          r.value = !1;
        }
      }
    }
    function O() {
      E(() => {
        l.value = ge(l.value);
      }, "Pengaturan label disimpan di perangkat ini.");
    }
    function w() {
      E(() => {
        ve(), l.value = { ...Y };
      }, "Kembali menggunakan default ZPL asli.");
    }
    function A() {
      E(async () => {
        try {
          const C = await Ee(c.value);
          t.value = C.printers, g.value = C.defaultPrinter, y.value = !0;
        } catch (C) {
          throw t.value = [], g.value = "", y.value = !1, e.value = "", C;
        }
      }, "Daftar printer diperbarui.");
    }
    function F() {
      E(async () => {
        const C = c.value, d = await Ne(C);
        e.value = d, C.printer || (g.value = d);
      }, "Label TEST dikirim. Tidak ada serial produksi yang dibuat.");
    }
    return ue(A), (C, d) => (m(), k("section", ut, [
      s("div", ct, [
        s("span", dt, [
          ne(T(fe), {
            size: 15,
            "stroke-width": 1.9
          })
        ]),
        d[5] || (d[5] = s("h2", { id: "pqr-layout-title" }, "Pengaturan layout label", -1)),
        d[6] || (d[6] = s("span", { class: "lead" }, "Khusus browser dan perangkat ini.", -1))
      ]),
      s("div", ft, [
        s("div", pt, [
          d[11] || (d[11] = s("div", { class: "settings-block-head" }, [
            s("h3", null, "Printer label"),
            s("p", { class: "hint" }, "Daftar printer dimuat otomatis saat pengaturan dibuka. Gunakan printer ZPL. Cetak TEST hanya untuk memeriksa layout dengan data contoh, tanpa Work Order.")
          ], -1)),
          s("div", bt, [
            s("div", mt, [
              s("div", kt, [
                d[7] || (d[7] = s("label", { for: "pqr-printer" }, "Printer label", -1)),
                H(s("select", {
                  id: "pqr-printer",
                  "onUpdate:modelValue": d[0] || (d[0] = (i) => l.value.printer = i),
                  class: "input"
                }, [
                  s("option", gt, v(g.value ? `Default sistem — ${g.value}` : "Printer default sistem (nama belum dimuat)"), 1),
                  (m(!0), k(M, null, j(o.value, (i) => (m(), k("option", {
                    key: i,
                    value: i
                  }, v(i) + v(y.value && !t.value.includes(i) ? " — belum terdeteksi" : ""), 9, vt))), 128))
                ], 512), [
                  [V, l.value.printer]
                ])
              ]),
              s("div", yt, [
                s("label", ht, v(T(S).label), 1),
                H(s("input", {
                  id: "pqr-qzTimeout",
                  "onUpdate:modelValue": d[1] || (d[1] = (i) => l.value.qzTimeout = i),
                  class: "input",
                  type: "number",
                  min: T(S).min,
                  max: T(S).max,
                  step: T(S).step,
                  "aria-describedby": "pqr-timeout-note"
                }, null, 8, wt), [
                  [
                    z,
                    l.value.qzTimeout,
                    void 0,
                    { number: !0 }
                  ]
                ])
              ])
            ]),
            d[10] || (d[10] = s("p", {
              id: "pqr-timeout-note",
              class: "hint"
            }, "1–60 detik; default 8. Batas menunggu koneksi QZ, bukan durasi cetak fisik. Simpan agar dipakai saat cetak Work Order. Jika koneksi gagal atau timeout, cetak Work Order beralih ke dialog cetak browser.", -1)),
            s("p", Ct, [
              d[8] || (d[8] = I("Printer tujuan: ", -1)),
              s("strong", null, v(u.value.name), 1),
              d[9] || (d[9] = s("br", null, null, -1)),
              I(v(u.value.detail), 1)
            ]),
            s("div", St, [
              s("button", {
                type: "button",
                class: "btn",
                disabled: r.value,
                onClick: A
              }, "Muat ulang printer", 8, xt),
              s("button", {
                type: "button",
                class: "btn",
                disabled: r.value,
                onClick: F
              }, "Cetak label TEST", 8, At)
            ])
          ])
        ]),
        s("div", Pt, [
          d[14] || (d[14] = s("div", { class: "settings-block-head" }, [
            s("h3", null, "Ukuran dan media"),
            s("p", { class: "hint" }, "Dasar ZPL asli: 2 kolom, ^PW800, ^LL160, 203 DPI. Pengaturan ini hanya untuk penyesuaian.")
          ], -1)),
          s("div", _t, [
            s("div", Lt, [
              (m(!0), k(M, null, j(T(_), (i) => (m(), k("div", {
                key: i.key,
                class: "field"
              }, [
                s("label", {
                  for: `pqr-${i.key}`
                }, v(i.label), 9, Tt),
                i.key === "dpi" ? H((m(), k("select", {
                  key: 0,
                  id: `pqr-${i.key}`,
                  "onUpdate:modelValue": d[2] || (d[2] = (q) => l.value.dpi = q),
                  class: "input"
                }, [...d[12] || (d[12] = [
                  s("option", { value: 203 }, "203", -1),
                  s("option", { value: 300 }, "300", -1),
                  s("option", { value: 600 }, "600", -1)
                ])], 8, Et)), [
                  [
                    V,
                    l.value.dpi,
                    void 0,
                    { number: !0 }
                  ]
                ]) : H((m(), k("input", {
                  key: 1,
                  id: `pqr-${i.key}`,
                  "onUpdate:modelValue": (q) => l.value[i.key] = q,
                  class: "input",
                  type: "number",
                  min: i.min,
                  max: i.max,
                  step: i.step
                }, null, 8, Nt)), [
                  [
                    z,
                    l.value[i.key],
                    void 0,
                    { number: !0 }
                  ]
                ])
              ]))), 128))
            ]),
            s("p", Ot, "Lebar media: " + v(c.value.width * c.value.columns + c.value.gap * (c.value.columns - 1)) + " mm.", 1),
            d[13] || (d[13] = s("p", { class: "settings-note" }, "Margin tambahan 0 mempertahankan posisi asli. Pengaturan konten kiri/kanan di bawah berlaku di dalam setiap label, bukan untuk membedakan dua kolom cetak. Samakan ukuran media dan sensor gap di printer.", -1))
          ])
        ]),
        s("div", qt, [
          d[16] || (d[16] = s("div", { class: "settings-block-head" }, [
            s("h3", null, "Konten kiri — QR"),
            s("p", { class: "hint" }, "Atur posisi dan ukuran QR tanpa menggeser konten kanan. QR selalu dicetak dengan identitas serial yang sama.")
          ], -1)),
          s("div", Ut, [
            s("div", Ft, [
              (m(!0), k(M, null, j(T(b), (i) => (m(), k("div", {
                key: i.key,
                class: "field"
              }, [
                s("label", {
                  for: `pqr-${i.key}`
                }, v(i.label), 9, It),
                H(s("input", {
                  id: `pqr-${i.key}`,
                  "onUpdate:modelValue": (q) => l.value[i.key] = q,
                  class: "input",
                  type: "number",
                  min: i.min,
                  max: i.max,
                  step: i.step
                }, null, 8, Ht), [
                  [
                    z,
                    l.value[i.key],
                    void 0,
                    { number: !0 }
                  ]
                ])
              ]))), 128))
            ]),
            d[15] || (d[15] = s("p", { class: "settings-note" }, "Geser 0 memakai posisi ZPL asli. Nilai negatif menggeser ke kiri/atas, positif ke kanan/bawah; posisi tidak melewati titik nol media. QR acuan 16 memakai magnifikasi 4 pada 203 DPI. Perbesar area label bila konten terpotong.", -1))
          ])
        ]),
        s("div", Dt, [
          d[21] || (d[21] = s("div", { class: "settings-block-head" }, [
            s("h3", null, "Konten kanan — Teks"),
            s("p", { class: "hint" }, "Atur blok prefix, nama produk, SKU, MFG, EXP, footer dan nomor urut secara terpisah dari QR. Nama produk tetap dicetak.")
          ], -1)),
          s("div", $t, [
            s("div", zt, [
              (m(!0), k(M, null, j(T(h), (i) => (m(), k("div", {
                key: i.key,
                class: "field"
              }, [
                s("label", {
                  for: `pqr-${i.key}`
                }, v(i.label), 9, Mt),
                H(s("input", {
                  id: `pqr-${i.key}`,
                  "onUpdate:modelValue": (q) => l.value[i.key] = q,
                  class: "input",
                  type: "number",
                  min: i.min,
                  max: i.max,
                  step: i.step
                }, null, 8, jt), [
                  [
                    z,
                    l.value[i.key],
                    void 0,
                    { number: !0 }
                  ]
                ])
              ]))), 128)),
              s("div", Vt, [
                d[18] || (d[18] = s("label", { for: "pqr-align" }, "Perataan teks", -1)),
                H(s("select", {
                  id: "pqr-align",
                  "onUpdate:modelValue": d[3] || (d[3] = (i) => l.value.align = i),
                  class: "input"
                }, [...d[17] || (d[17] = [
                  s("option", { value: "left" }, "Kiri", -1),
                  s("option", { value: "center" }, "Tengah", -1),
                  s("option", { value: "right" }, "Kanan", -1)
                ])], 512), [
                  [V, l.value.align]
                ])
              ]),
              s("div", Rt, [
                d[19] || (d[19] = s("label", { for: "pqr-footer" }, "Footer", -1)),
                H(s("input", {
                  id: "pqr-footer",
                  "onUpdate:modelValue": d[4] || (d[4] = (i) => l.value.footer = i),
                  maxlength: "100",
                  class: "input"
                }, null, 512), [
                  [z, l.value.footer]
                ])
              ])
            ]),
            d[20] || (d[20] = s("p", { class: "settings-note" }, "Lebar 0 mengikuti sisa area label; ukuran prefix 0 mengikuti font asli. Jumlah baris nama menambah ruang sebelum SKU/MFG/EXP. Geser teks juga memindahkan nomor urut, tanpa menggeser QR. Periksa hasil penyesuaian dengan cetak TEST.", -1))
          ])
        ])
      ]),
      n.value ? (m(), k("div", Qt, [
        s("p", {
          role: "status",
          class: ce(a.value ? "err" : "hint")
        }, v(n.value), 3)
      ])) : D("", !0),
      s("div", Gt, [
        s("button", {
          type: "button",
          class: "btn btn-primary",
          disabled: r.value,
          onClick: O
        }, "Simpan layout label", 8, Wt),
        s("button", {
          type: "button",
          class: "btn",
          disabled: r.value,
          onClick: w
        }, "Pulihkan default ZPL", 8, Jt)
      ])
    ]));
  }
};
function tr(p, l = 0) {
  const c = `/product_qr_work_order_label?name=${encodeURIComponent(p)}`;
  return l > 0 ? `${c}&extra=${l}` : c;
}
export {
  er as LabelLayoutSettings,
  Xt as WorkOrderLabelButton,
  Yt as WorkOrderLabelDialogs,
  B as connectQz,
  he as labelCountForWorkOrder,
  N as labelPrintPrompt,
  oe as labelSource,
  we as offerLabelPrint,
  Ue as printLabels,
  tr as workOrderLabelUrl
};

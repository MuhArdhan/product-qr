import { reactive as re, unref as U, openBlock as g, createElementBlock as v, createElementVNode as a, createVNode as Z, createTextVNode as O, createCommentVNode as F, ref as A, computed as q, watch as G, nextTick as J, Fragment as D, withModifiers as R, toDisplayString as S, withDirectives as H, vModelSelect as M, vModelText as $, renderList as j, normalizeClass as oe } from "vue";
import { Printer as ae, QrCode as se } from "lucide-vue-next";
import { g as ie, a as le, l as K, b as X, n as Y, S as ue, L as B, c as V, s as ce, r as de } from "./label-layout-DmzvIvUT.js";
function fe(c) {
  return !!c?.displayUom && c.displayUom !== c.stockUom && Number.isFinite(c.qtyInPack) && c.qtyInPack > 0;
}
function ee(c) {
  return c.skipPrepacking ? c.postpacking : c.prepacking;
}
function pe(c) {
  const i = Number(ee(c)?.goodQty), p = fe(c) ? c.qtyInPack : 1;
  return Math.max(1, Math.ceil(i / p - 1e-8));
}
const T = re({ workOrder: "", labelCount: 0, afterSave: "" });
function be(c, i, p = "") {
  T.workOrder = c, T.labelCount = i, T.afterSave = p;
}
const te = (c, i) => {
  const p = c.__vccOpts || c;
  for (const [t, h] of i)
    p[t] = h;
  return p;
}, me = {
  key: 0,
  class: "toolbar ws-label-actions"
}, ke = {
  __name: "WorkOrderLabelButton",
  props: { workOrder: { type: Object, required: !0 } },
  setup(c) {
    return (i, p) => U(ee)(c.workOrder)?.confirmed ? (g(), v("div", me, [
      a("button", {
        class: "btn ws-label-print",
        type: "button",
        onClick: p[0] || (p[0] = (t) => U(be)(c.workOrder.id, U(pe)(c.workOrder)))
      }, [
        Z(U(ae), {
          size: 14,
          "stroke-width": 2
        }),
        p[1] || (p[1] = O(" Cetak Label ", -1))
      ])
    ])) : F("", !0);
  }
}, jt = /* @__PURE__ */ te(ke, [["__scopeId", "data-v-c9012b16"]]);
function ge(c) {
  throw new Error('Could not dynamically require "' + c + '". Please configure the dynamicRequireTargets or/and ignoreDynamicRequires option of @rollup/plugin-commonjs appropriately for this require call to work.');
}
var z = { exports: {} };
const ve = {}, ye = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: ve
}, Symbol.toStringTag, { value: "Module" })), he = /* @__PURE__ */ ie(ye);
var W;
function we() {
  return W || (W = 1, (function(c, i) {
    var p = (function() {
      Array.isArray || (Array.isArray = function(e) {
        return Object.prototype.toString.call(e) === "[object Array]";
      }), Number.isInteger || (Number.isInteger = function(e) {
        return typeof e == "number" && isFinite(e) && Math.floor(e) === e;
      }), Array.from || (Array.from = function(e) {
        return [].slice.call(e);
      }), String.prototype.padStart || (String.prototype.padStart = function(n, r) {
        if (n = n >> 0, r = String(typeof r < "u" ? r : " "), this.length >= n)
          return String(this);
        for (var o = n - this.length, s = ""; s.length < o; )
          s += r;
        return s.slice(0, o) + String(this);
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
              var n, r, o;
              return t.tools.promise(function(s, l) {
                n = new t.tools.ws(e), t.websocket.connection = n, o = function() {
                  s(n);
                }, r = function(b) {
                  t.websocket.connection = null, l(b);
                }, n.addEventListener("open", o), n.addEventListener("error", r), n.addEventListener("close", r);
              }).finally(function() {
                n.removeEventListener("open", o), n.removeEventListener("error", r), n.removeEventListener("close", r);
              });
            },
            connectToAddress: function(e) {
              var n = t.tools.getLna();
              t.log.trace("Attempting connection", e);
              var r;
              return n ? (t.log.trace("Connecting with lna.js"), r = n.detectLna(e, t.websocket.setup.webSocketPromise, {
                isWebSocket: !0,
                defaultAddressSpace: "public"
              })) : (t.log.trace("Connecting without lna.js"), r = t.websocket.setup.webSocketPromise(e)), r.catch(function(o) {
                var s = o.denied ? "Connection attempt denied by Local Network Access restrictions" : "Unable to establish connection with " + t.TITLE, l = new Error(s);
                throw n && o instanceof n.LnaError && (l.denied = o.denied, l.permission = o.permission), l;
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
              var o = function(b) {
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
              var l = t.websocket.setup.connectToAddress(s);
              l.then(
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
                  t.log.trace(b), o(b);
                }
              );
            },
            /** Finish setting calls on successful connection, sets web socket calls that won't settle the promise. */
            openConnection: function(e) {
              t.websocket.connection.onclose = function(r) {
                t.log.trace(r), t.websocket.connection = null, t.websocket.callClose(r), t.log.info("Closed connection with " + t.TITLE);
                for (var o in t.websocket.pendingCalls)
                  t.websocket.pendingCalls.hasOwnProperty(o) && t.websocket.pendingCalls[o].reject(new Error("Connection closed before response received"));
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
                    var o = {
                      call: r.call,
                      params: r.params,
                      timestamp: r.timestamp
                    }, s = t.tools.hash(t.tools.stringify(o));
                    s.then || (s = t.tools.promise(function(l) {
                      l(s);
                    })), s.then(function(l) {
                      return t.security.callSign(l);
                    }).then(function(l) {
                      t.log.trace("Signature for call", l), r.signature = l || "", r.signAlgorithm = t.security.signAlgorithm, t.signContent = void 0, t.websocket.connection.send(t.tools.stringify(r));
                    }).catch(function(l) {
                      t.log.error("Signing failed", l), r.promise != null && (r.promise.reject(new Error("Failed to sign request")), delete t.websocket.pendingCalls[r.uid]);
                    });
                  } else
                    t.log.trace("Signature for call", r.signature), t.websocket.connection.send(t.tools.stringify(r));
                } catch (l) {
                  t.log.error(l), r.promise != null && (r.promise.reject(l), delete t.websocket.pendingCalls[r.uid]);
                }
              }, t.websocket.connection.onmessage = function(r) {
                var o = JSON.parse(r.data);
                if (o.uid == null) {
                  if (o.type == null)
                    t.websocket.connection.close(4003, "Connected to incompatible " + t.TITLE + " version");
                  else
                    switch (o.type) {
                      case t.streams.serial:
                        o.event || (o.event = JSON.stringify({ portName: o.key, output: o.data })), t.serial.callSerial(JSON.parse(o.event));
                        break;
                      case t.streams.socket:
                        t.socket.callSocket(JSON.parse(o.event));
                        break;
                      case t.streams.usb:
                        o.event || (o.event = JSON.stringify({ vendorId: o.key[0], productId: o.key[1], output: o.data })), t.usb.callUsb(JSON.parse(o.event));
                        break;
                      case t.streams.hid:
                        t.hid.callHid(JSON.parse(o.event));
                        break;
                      case t.streams.printer:
                        t.printers.callPrinter(JSON.parse(o.event));
                        break;
                      case t.streams.file:
                        t.file.callFile(JSON.parse(o.event));
                        break;
                      default:
                        t.log.allay("Cannot determine stream type for callback", o);
                        break;
                    }
                  return;
                }
                t.log.trace("Received response from websocket", o);
                var s = t.websocket.pendingCalls[o.uid];
                s == null ? t.log.allay("No promise found for returned response") : o.error != null ? s.reject(new Error(o.error)) : s.resolve(o.result), delete t.websocket.pendingCalls[o.uid];
              };
              function n(r) {
                r === void 0 && (r = null), k.api.getVersion().then(function(o) {
                  t.websocket.connection.version = o, t.websocket.connection.semver = o.toLowerCase().replace(/-rc\./g, "-rc").split(/[\\+\\.-]/g);
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
          dataPromise: function(e, n, r, o) {
            return t.tools.promise(function(s, l) {
              var b = {
                call: e,
                promise: { resolve: s, reject: l },
                params: n,
                signature: r,
                timestamp: o
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
            function r(s, l) {
              if (s !== "promise")
                return l;
            }
            var o = JSON.stringify(e, r);
            return n && (Array.prototype.toJSON = n), o;
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
              if (typeof ge == "function")
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
              return he.resolve(e);
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
                for (var o in r)
                  if (r.hasOwnProperty(o)) {
                    if (e === r[o])
                      continue;
                    if (r[o] && r[o].constructor && r[o].constructor === Object) {
                      var s;
                      Array.isArray(r[o]) ? s = e[o] || [] : s = e[o] || {}, e[o] = t.tools.extend(s, r[o]);
                    } else r[o] !== void 0 && (e[o] = r[o]);
                  }
              }
            }
            return e;
          },
          versionCompare: function(e, n, r, o) {
            if (t.tools.assertActive()) {
              var s = t.websocket.connection.semver;
              if (Array.isArray(s)) {
                if (e != null && s.length > 0 && s[0] != e)
                  return s[0] - e;
                if (n != null && s.length > 1 && s[1] != n)
                  return s[1] - n;
                if (r != null && s.length > 2 && s[2] != r)
                  return s[2] - r;
                if (o != null && s.length > 3 && s[3] != o)
                  return Number.isInteger(s[3]) && Number.isInteger(o) ? s[3] - o : s[3].toString().localeCompare(o.toString());
              }
              return 0;
            }
          },
          isVersion: function(e, n, r, o) {
            return t.tools.versionCompare(e, n, r, o) == 0;
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
            ], r = "", o, s = e.length;
            for (o = 2; o < s; o += 3)
              r += n[e[o - 2] >> 2], r += n[(e[o - 2] & 3) << 4 | e[o - 1] >> 4], r += n[(e[o - 1] & 15) << 2 | e[o] >> 6], r += n[e[o] & 63];
            return o === s + 1 && (r += n[e[o - 2] >> 2], r += n[(e[o - 2] & 3) << 4], r += "=="), o === s && (r += n[e[o - 2] >> 2], r += n[(e[o - 2] & 3) << 4 | e[o - 1] >> 4], r += n[(e[o - 1] & 15) << 2], r += "="), r;
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
          networking: function(e, n, r, o, s) {
            return t.tools.isVersion(2, 0) ? t.tools.promise(function(l, b) {
              t.websocket.dataPromise("websocket.getNetworkInfo", {
                hostname: e,
                port: n
              }, r, o).then(function(w) {
                l(typeof s < "u" ? s(w) : w);
              }, b);
            }) : t.tools.promise(function(l, b) {
              t.websocket.dataPromise("networking.device", {
                hostname: e,
                port: n
              }, r, o).then(function(w) {
                l({ ipAddress: w.ip, macAddress: w.mac });
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
            ], r = [1779033703, 3144134277, 1013904242, 2773480762, 1359893119, 2600822924, 528734635, 1541459225], o = e.length / 4 + 2, s = Math.ceil(o / 16), l = new Array(s), b = 0; b < s; b++) {
              l[b] = new Array(16);
              for (var w = 0; w < 16; w++)
                l[b][w] = e.charCodeAt(b * 64 + w * 4) << 24 | e.charCodeAt(b * 64 + w * 4 + 1) << 16 | e.charCodeAt(b * 64 + w * 4 + 2) << 8 | e.charCodeAt(b * 64 + w * 4 + 3);
            }
            l[s - 1][14] = (e.length - 1) * 8 / Math.pow(2, 32), l[s - 1][14] = Math.floor(l[s - 1][14]), l[s - 1][15] = (e.length - 1) * 8 & 4294967295;
            for (var _ = new Array(64), P, N, E, y, L, C, d, f, b = 0; b < s; b++) {
              for (var m = 0; m < 16; m++)
                _[m] = l[b][m];
              for (var m = 16; m < 64; m++)
                _[m] = t.SHA._dev1(_[m - 2]) + _[m - 7] + t.SHA._dev0(_[m - 15]) + _[m - 16] & 4294967295;
              P = r[0], N = r[1], E = r[2], y = r[3], L = r[4], C = r[5], d = r[6], f = r[7];
              for (var m = 0; m < 64; m++) {
                var u = f + t.SHA._sig1(L) + t.SHA._ch(L, C, d) + n[m] + _[m], x = t.SHA._sig0(P) + t.SHA._maj(P, N, E);
                f = d, d = C, C = L, L = y + u & 4294967295, y = E, E = N, N = P, P = u + x & 4294967295;
              }
              r[0] = r[0] + P & 4294967295, r[1] = r[1] + N & 4294967295, r[2] = r[2] + E & 4294967295, r[3] = r[3] + y & 4294967295, r[4] = r[4] + L & 4294967295, r[5] = r[5] + C & 4294967295, r[6] = r[6] + d & 4294967295, r[7] = r[7] + f & 4294967295;
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
            for (var n = "", r, o = 7; o >= 0; o--)
              r = e >>> o * 4 & 15, n += r.toString(16);
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
      function h(e, n) {
        this.config = t.tools.extend({}, t.printing.defaultConfig), this._dirtyOpts = {}, this.setPrinter = function(r) {
          typeof r == "string" && (r = { name: r }), this.printer = r;
        }, this.getPrinter = function() {
          return this.printer;
        }, this.reconfigure = function(r) {
          for (var o in r)
            r[o] !== void 0 && (this._dirtyOpts[o] = !0);
          t.tools.extend(this.config, r);
        }, this.getOptions = function() {
          return t.compatible.config(this.config, this._dirtyOpts);
        }, this.setPrinter(e), this.reconfigure(n);
      }
      h.prototype.print = function(e, n, r) {
        k.print(this, e, n, r);
      };
      var k = {
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
                const l = t.websocket.connection.readyState;
                if (l === t.tools.ws.OPEN) {
                  r(new Error("An open connection with " + t.TITLE + " already exists"));
                  return;
                } else if (l === t.tools.ws.CONNECTING) {
                  r(new Error("The current connection attempt has not returned yet"));
                  return;
                } else if (l === t.tools.ws.CLOSING) {
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
                for (var o = 0; o < e.host.length; o++)
                  e.host[o] = t.tools.appendSurf(e.host[o]);
              t.websocket.shutdown = !1;
              var s = function(l) {
                var b = !1, w = function() {
                  b || (b = !0, e && l < e.retries ? s(l + 1) : (t.websocket.connection = null, r.apply(null, arguments)));
                }, _ = function() {
                  var P = t.tools.extend({}, t.websocket.connectConfig, e);
                  t.websocket.setup.findConnection(P, n, w);
                };
                l == 0 ? _() : setTimeout(_, e.delay * 1e3);
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
            return new h(e, n);
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
          var r = !1, o = [], s = [];
          arguments.length >= 3 && (typeof arguments[2] == "boolean" ? (r = arguments[2], arguments.length >= 5 && (o = arguments[3], s = arguments[4])) : arguments.length >= 4 && (o = arguments[2], s = arguments[3]), o && !Array.isArray(o) && (o = [o]), s && !Array.isArray(s) && (s = [s])), Array.isArray(e) || (e = [e]), Array.isArray(n[0]) || (n = [n]);
          for (var l = 0; l < n.length; l++)
            t.tools.relative(n[l]), t.compatible.data(n[l]);
          for (var b = function(y) {
            var L = {
              printer: y.config.getPrinter(),
              options: y.config.getOptions(),
              data: y.data
            };
            return t.websocket.dataPromise("print", L, y.signature, y.timestamp);
          }, w = [], _ = 0; _ < e.length || _ < n.length; _++)
            (function(y) {
              var L = {
                config: e[Math.min(y, e.length - 1)],
                data: n[Math.min(y, n.length - 1)],
                signature: o[y],
                timestamp: s[y]
              };
              w.push(function() {
                return b(L);
              });
            })(_);
          var P = null;
          if (r) {
            var N = [];
            P = function(y) {
              N.push(y);
            }, w.push(function() {
              return t.tools.promise(function(y, L) {
                N.length ? L(N) : y();
              });
            });
          }
          var E = null;
          return w.reduce(function(y, L) {
            return E = y.catch(P).then(L), E;
          }, t.tools.promise(function(y) {
            y();
          })), E;
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
            var o = {
              port: e,
              data: n,
              options: r
            };
            return t.websocket.dataPromise("serial.sendData", o);
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
            var o = {
              host: e,
              port: n,
              options: r
            };
            return t.websocket.dataPromise("socket.open", o);
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
            var o = {
              host: e,
              port: n,
              data: r
            };
            return t.websocket.dataPromise("socket.sendData", o);
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
            return t.tools.versionCompare(2, 2, 2) < 0 ? t.tools.promise(function(r, o) {
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
          isVersionGreater: function(e, n, r, o) {
            return t.tools.versionCompare(e, n, r, o) > 0;
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
          isVersionLess: function(e, n, r, o) {
            return t.tools.versionCompare(e, n, r, o) < 0;
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
      return k;
    })();
    (function() {
      c.exports = p;
    })();
  })(z)), z.exports;
}
var Ce = we();
const I = /* @__PURE__ */ le(Ce);
async function Se() {
  await Q(null, { layoutTest: !0 });
  const [c, i] = await Promise.allSettled([I.printers.find(), I.printers.getDefault()]);
  if (c.status === "rejected") throw c.reason;
  return {
    printers: Array.isArray(c.value) ? c.value : c.value ? [c.value] : [],
    defaultPrinter: i.status === "fulfilled" && i.value || ""
  };
}
async function xe(c) {
  const i = Y(c), p = X(ue, i);
  await Q(null, { layoutTest: !0 });
  const t = i.printer || await I.printers.getDefault();
  return await I.print(I.configs.create(t, { encoding: "UTF-8" }), p), t;
}
function ne(c, i) {
  try {
    const t = JSON.parse(c?._server_messages || "[]").map((h) => JSON.parse(h).message).filter(Boolean).join(" ");
    if (t) return t;
  } catch {
  }
  return i;
}
async function Ae(c) {
  const i = await fetch("/api/method/product_qr.wo_labels.labels.get_existing_label_numbers", {
    method: "POST",
    credentials: "same-origin",
    cache: "no-store",
    headers: {
      "Content-Type": "application/json",
      "X-Frappe-CSRF-Token": window.csrf_token || ""
    },
    body: JSON.stringify({ name: c })
  }), p = await i.json();
  if (!i.ok) throw new Error(ne(p, "Gagal memuat nomor urut label yang sudah terbit"));
  return p.message || [];
}
function _e(c, { layoutTest: i = !1 } = {}) {
  I.security.setCertificatePromise(async () => {
    const p = i ? "/api/method/product_qr.wo_labels.qz_signing.layout_certificate" : `/api/method/product_qr.wo_labels.qz_signing.certificate?work_order=${encodeURIComponent(c)}`, t = await fetch(p, {
      cache: "no-store"
    });
    if (!t.ok) throw new Error("Sertifikat QZ Tray belum tersedia atau akses ditolak");
    return (await t.json()).message;
  }, { rejectOnFailure: !0 }), I.security.setSignatureAlgorithm("SHA512"), I.security.setSignaturePromise(async (p) => {
    const t = await fetch(i ? "/api/method/product_qr.wo_labels.qz_signing.layout_sign" : "/api/method/product_qr.wo_labels.qz_signing.sign", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Frappe-CSRF-Token": window.csrf_token || ""
      },
      credentials: "same-origin",
      cache: "no-store",
      body: JSON.stringify(i ? { request: p } : { work_order: c, request: p })
    });
    if (!t.ok) throw new Error("Gagal menandatangani permintaan QZ Tray");
    return (await t.json()).message;
  });
}
async function Q(c, i) {
  _e(c, i), I.websocket.isActive() || await I.websocket.connect({ retries: 2, delay: 1 });
}
async function Pe(c, i = 0) {
  const p = i && typeof i == "object" ? i : { extra: i }, t = { name: c, extra: p.extra ?? 0 };
  p.appendCount !== void 0 && (t.append_count = p.appendCount), p.labelNumbers !== void 0 && (t.label_numbers = p.labelNumbers);
  try {
    await Q(c);
    const h = await fetch("/api/method/product_qr.wo_labels.labels.get_label_data", {
      method: "POST",
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json",
        "X-Frappe-CSRF-Token": window.csrf_token || ""
      },
      body: JSON.stringify(t)
    }), k = await h.json();
    if (!h.ok)
      throw new Error(ne(k, "Gagal mengambil data label"));
    const { message: e } = k;
    if (!e)
      throw new Error("Data label kosong");
    const n = K();
    let r = n?.printer || await I.printers.getDefault();
    const o = e.labels?.length || 0;
    if (!o || o !== e.label_count) throw new Error("Jumlah label tidak sesuai");
    const s = I.configs.create(r, {
      encoding: "UTF-8"
    });
    return await I.print(s, X(e, n)), !0;
  } catch (h) {
    throw console.error("QZ Tray Error:", h), h;
  }
}
const Le = { id: "label-print-title" }, Ee = ["disabled"], Te = {
  key: 0,
  class: "label-count-field"
}, Ne = ["max"], Oe = {
  key: 1,
  class: "label-count-field"
}, Ue = {
  key: 0,
  class: "label-print-note"
}, Ie = {
  key: 2,
  class: "label-count-field"
}, He = { class: "label-print-note" }, Fe = { key: 0 }, qe = {
  key: 0,
  class: "label-print-note"
}, De = {
  key: 1,
  class: "label-print-note warning"
}, $e = {
  key: 2,
  class: "label-print-note"
}, je = ["value"], Me = {
  key: 4,
  class: "label-print-note"
}, Re = { key: 3 }, Ve = { key: 4 }, ze = { key: 5 }, Qe = {
  key: 6,
  class: "label-print-note warning"
}, Ge = { class: "dlg-actions" }, Je = ["disabled"], Be = { id: "wo-label-error-title" }, We = { class: "error-dialog-message" }, Ze = {
  key: 0,
  class: "error-dialog-details"
}, Ke = { class: "dlg-actions" }, Xe = {
  __name: "WorkOrderLabelDialogs",
  setup(c) {
    const i = A(null), p = A(null), t = A(null), h = A(null), k = A("automatic"), e = A(1), n = A(0), r = A([]), o = A(""), s = A(null), l = A(!1), b = A("");
    let w = 0;
    const _ = q(() => n.value !== "" && Number.isInteger(Number(n.value)) && Number(n.value) >= 0), P = q(() => e.value !== "" && Number.isInteger(Number(e.value)) && Number(e.value) >= 1 && Number(e.value) <= 1e4), N = q(() => Math.max(0, ...r.value.map((m) => Number(m.label_number) || 0))), E = q(() => k.value === "automatic" ? T.labelCount + Number(n.value || 0) : k.value === "append" ? Number(e.value || 0) : o.value ? 1 : 0), y = q(() => k.value === "automatic" ? _.value && E.value >= 1 && E.value <= 1e4 : k.value === "append" ? r.value.length > 0 && P.value : r.value.some((m) => Number(m.label_number) === Number(o.value)));
    async function L(m = T.workOrder) {
      if (!m) return;
      const u = ++w;
      l.value = !0, b.value = "";
      try {
        const x = await Ae(m);
        u === w && m === T.workOrder && (r.value = x?.labels || [], s.value = x?.adonan_ke ?? null);
      } catch (x) {
        u === w && (r.value = [], s.value = null, b.value = x.message || "Gagal memuat nomor urut label.");
      } finally {
        u === w && (l.value = !1);
      }
    }
    G(() => T.workOrder, (m) => {
      m && (k.value = "automatic", e.value = 1, n.value = 0, r.value = [], o.value = "", s.value = null, L(m), J(() => {
        i.value?.open || i.value?.showModal();
      }));
    }), G(h, (m) => {
      m && J(() => {
        p.value?.open || p.value?.showModal(), t.value?.focus();
      });
    });
    function C() {
      i.value?.open && i.value.close(), w++, k.value = "automatic", e.value = 1, n.value = 0, r.value = [], o.value = "", s.value = null, l.value = !1, b.value = "", T.workOrder = "", T.labelCount = 0, T.afterSave = "";
    }
    async function d() {
      const m = T.workOrder;
      if (!(!m || !y.value))
        try {
          const u = k.value === "automatic" ? { extra: Number(n.value) } : k.value === "append" ? { appendCount: Number(e.value) } : { labelNumbers: [Number(o.value)] };
          await Pe(m, u), C();
        } catch (u) {
          h.value = {
            title: "Cetak Label Gagal",
            message: u.message || "Gagal terhubung ke QZ Tray atau printer.",
            details: [],
            hint: /sign|sertifikat|certificate/i.test(u.message || "") ? "Periksa sertifikat QZ Tray di komputer dan private key di server." : "Pastikan QZ Tray sedang berjalan di komputer Anda."
          };
        }
    }
    function f() {
      p.value?.open && p.value.close(), h.value = null;
    }
    return (m, u) => (g(), v(D, null, [
      a("dialog", {
        ref_key: "labelPrintDialog",
        ref: i,
        class: "dialog",
        "aria-labelledby": "label-print-title",
        onCancel: R(C, ["prevent"]),
        onClick: R(C, ["self"])
      }, [
        a("h3", Le, S(U(T).afterSave ? `${U(T).afterSave} tersimpan` : "Cetak label?"), 1),
        a("p", null, [
          u[4] || (u[4] = O("Cetak label untuk Work Order ", -1)),
          a("strong", null, S(U(T).workOrder), 1),
          u[5] || (u[5] = O("?", -1))
        ]),
        a("p", null, [
          u[6] || (u[6] = O("Usulan otomatis dari Good Qty dan UOM: ", -1)),
          a("strong", null, S(U(T).labelCount) + " label", 1)
        ]),
        u[21] || (u[21] = a("label", { for: "label-count-mode" }, "Cara menentukan jumlah", -1)),
        H(a("select", {
          id: "label-count-mode",
          "onUpdate:modelValue": u[0] || (u[0] = (x) => k.value = x),
          class: "input label-dialog-select",
          style: { display: "block", width: "100%", "margin-top": "6px" }
        }, [
          u[7] || (u[7] = a("option", { value: "automatic" }, "Otomatis dari Good Qty", -1)),
          a("option", {
            value: "append",
            disabled: l.value || !r.value.length
          }, "Tambah setelah cetak awal", 8, Ee),
          u[8] || (u[8] = a("option", { value: "specific" }, "Pilih nomor urut label untuk cetak ulang", -1))
        ], 512), [
          [M, k.value]
        ]),
        k.value === "automatic" ? (g(), v("div", Te, [
          u[9] || (u[9] = a("label", { for: "extra-label-count" }, "Label tambahan", -1)),
          H(a("input", {
            id: "extra-label-count",
            "onUpdate:modelValue": u[1] || (u[1] = (x) => n.value = x),
            type: "number",
            min: "0",
            max: Math.max(0, 1e4 - U(T).labelCount),
            step: "1",
            inputmode: "numeric",
            class: "input",
            style: { display: "block", width: "100%", "margin-top": "6px" }
          }, null, 8, Ne), [
            [
              $,
              n.value,
              void 0,
              { number: !0 }
            ]
          ]),
          u[10] || (u[10] = a("p", { class: "label-print-note" }, "Jumlah awal mengikuti Good Qty.", -1))
        ])) : F("", !0),
        k.value === "append" ? (g(), v("div", Oe, [
          u[11] || (u[11] = a("label", { for: "append-label-count" }, "Jumlah label lanjutan", -1)),
          H(a("input", {
            id: "append-label-count",
            "onUpdate:modelValue": u[2] || (u[2] = (x) => e.value = x),
            type: "number",
            min: "1",
            max: "10000",
            step: "1",
            inputmode: "numeric",
            class: "input",
            style: { display: "block", width: "100%", "margin-top": "6px" }
          }, null, 512), [
            [
              $,
              e.value,
              void 0,
              { number: !0 }
            ]
          ]),
          P.value ? (g(), v("p", Ue, "Nomor baru: #" + S(N.value + 1) + "–#" + S(N.value + Number(e.value)) + " · setelah label awal yang sudah terbit.", 1)) : F("", !0)
        ])) : F("", !0),
        k.value === "specific" ? (g(), v("div", Ie, [
          u[17] || (u[17] = a("label", { for: "label-number-select" }, "Nomor urut label yang dicetak ulang", -1)),
          a("p", He, [
            u[12] || (u[12] = O("Nomor urut terikat ke Work Order ini", -1)),
            s.value !== null ? (g(), v("span", Fe, " · Adonan ke " + S(s.value), 1)) : F("", !0),
            u[13] || (u[13] = O(".", -1))
          ]),
          l.value ? (g(), v("p", qe, "Memuat nomor urut label…")) : b.value ? (g(), v("p", De, S(b.value), 1)) : r.value.length ? H((g(), v("select", {
            key: 3,
            id: "label-number-select",
            "onUpdate:modelValue": u[3] || (u[3] = (x) => o.value = x),
            class: "input label-dialog-select",
            style: { display: "block", width: "100%", "margin-top": "6px" }
          }, [
            u[14] || (u[14] = a("option", { value: "" }, "Pilih nomor label", -1)),
            (g(!0), v(D, null, j(r.value, (x) => (g(), v("option", {
              key: x.label_number,
              value: x.label_number
            }, " Label #" + S(x.label_number) + " · Adonan ke " + S(x.adonan_ke ?? "—"), 9, je))), 128))
          ], 512)), [
            [
              M,
              o.value,
              void 0,
              { number: !0 }
            ]
          ]) : (g(), v("p", $e, "Belum ada label terbit untuk Work Order ini. Cetak otomatis dari Good Qty dahulu.")),
          o.value ? (g(), v("p", Me, [
            u[15] || (u[15] = O("Dipilih: ", -1)),
            a("strong", null, "Label #" + S(o.value), 1),
            u[16] || (u[16] = O(". QR akan memakai mapping label yang sama.", -1))
          ])) : F("", !0)
        ])) : F("", !0),
        y.value && k.value === "automatic" ? (g(), v("p", Re, [
          u[18] || (u[18] = O("Total cetak otomatis: ", -1)),
          a("strong", null, S(E.value) + " label", 1)
        ])) : y.value && k.value === "append" ? (g(), v("p", Ve, [
          u[19] || (u[19] = O("Label lanjutan: ", -1)),
          a("strong", null, S(E.value) + " label", 1)
        ])) : y.value && k.value === "specific" ? (g(), v("p", ze, [
          u[20] || (u[20] = O("Total cetak ulang: ", -1)),
          a("strong", null, S(E.value) + " label", 1)
        ])) : (g(), v("p", Qe, S(k.value === "append" ? "Masukkan jumlah label lanjutan 1–10.000." : k.value === "specific" ? "Pilih satu nomor label untuk dicetak ulang." : "Masukkan jumlah ekstra bulat yang valid; batas 10.000 label per cetakan."), 1)),
        a("div", Ge, [
          a("button", {
            class: "btn",
            onClick: C
          }, "Nanti saja"),
          a("button", {
            class: "btn btn-primary",
            disabled: !y.value,
            onClick: d
          }, "Ya, Cetak Label", 8, Je)
        ])
      ], 544),
      a("dialog", {
        ref_key: "errorDialog",
        ref: p,
        class: "dialog error-dialog",
        "aria-labelledby": "wo-label-error-title",
        onCancel: R(f, ["prevent"]),
        onClick: R(f, ["self"])
      }, [
        u[22] || (u[22] = a("div", {
          class: "error-dialog-icon",
          "aria-hidden": "true"
        }, "!", -1)),
        a("h2", Be, S(h.value?.title), 1),
        a("p", We, S(h.value?.message), 1),
        h.value?.details?.length ? (g(), v("ul", Ze, [
          (g(!0), v(D, null, j(h.value.details, (x) => (g(), v("li", { key: x }, S(x), 1))), 128))
        ])) : F("", !0),
        a("div", Ke, [
          a("button", {
            ref_key: "errorClose",
            ref: t,
            class: "btn btn-primary",
            onClick: f
          }, "Tutup", 512)
        ])
      ], 544)
    ], 64));
  }
}, Mt = /* @__PURE__ */ te(Xe, [["__scopeId", "data-v-d2f3e72f"]]);
function Ye({ selected: c = "", printers: i = [], defaultPrinter: p = "", loaded: t = !1, lastPrinted: h = "" } = {}) {
  const k = c || p;
  return k ? t && i.includes(k) ? { name: k, detail: "Terdeteksi oleh QZ Tray. Status fisik online/offline belum diperiksa." } : h === k ? { name: k, detail: "Tujuan cetak TEST terakhir. Pengiriman job bukan konfirmasi hasil cetak fisik." } : { name: k, detail: t ? "Belum terdeteksi dalam daftar QZ Tray. Periksa printer atau muat ulang daftar." : "Nama tersimpan; belum diverifikasi oleh QZ Tray." } : {
    name: "Belum diketahui",
    detail: t ? "Printer default sistem belum tersedia. Pilih printer dari daftar." : "Klik Hubungkan / muat printer untuk melihat nama printer."
  };
}
const et = {
  class: "panel settings-panel pqr-layout",
  "aria-labelledby": "pqr-layout-title"
}, tt = { class: "panel-head" }, nt = { class: "p-ico" }, rt = { class: "panel-body" }, ot = { class: "settings-block" }, at = { class: "settings-control" }, st = { class: "form-grid cols2" }, it = { class: "field" }, lt = { value: "" }, ut = ["value"], ct = {
  class: "settings-note",
  "data-label-printer-destination": "",
  "aria-live": "polite"
}, dt = { class: "pqr-layout-actions" }, ft = ["disabled"], pt = ["disabled"], bt = { class: "settings-block" }, mt = { class: "settings-control" }, kt = { class: "form-grid cols2" }, gt = ["for"], vt = ["id"], yt = ["id", "onUpdate:modelValue", "min", "max", "step"], ht = { class: "hint" }, wt = { class: "settings-block" }, Ct = { class: "settings-control" }, St = { class: "form-grid cols2" }, xt = ["for"], At = ["id", "onUpdate:modelValue", "min", "max", "step"], _t = { class: "settings-block" }, Pt = { class: "settings-control" }, Lt = { class: "form-grid cols2" }, Et = ["for"], Tt = ["id", "onUpdate:modelValue", "min", "max", "step"], Nt = { class: "field" }, Ot = { class: "field wide" }, Ut = {
  key: 0,
  class: "settings-alerts"
}, It = { class: "panel-foot" }, Ht = ["disabled"], Ft = ["disabled"], Rt = {
  __name: "LabelLayoutSettings",
  setup(c) {
    const i = A(K() || { ...B }), p = q(() => Y(i.value)), t = A([]), h = A(""), k = A(!1), e = A(""), n = A(!1), r = A(""), o = A(!1), s = q(() => [...new Set([i.value.printer, ...t.value].filter(Boolean))]), l = q(() => Ye({
      selected: i.value.printer,
      printers: t.value,
      defaultPrinter: h.value,
      loaded: k.value,
      lastPrinted: e.value
    })), b = V.filter((C) => ["leftX", "leftY", "qrSize"].includes(C.key)), w = V.filter((C) => ["rightX", "rightY", "textWidth", "prefixFontSize", "fontSize", "productFontSize", "lineHeight", "nameLines"].includes(C.key)), _ = V.filter((C) => !b.includes(C) && !w.includes(C));
    async function P(C, d) {
      if (!n.value) {
        n.value = !0, r.value = "", o.value = !1;
        try {
          await C(), r.value = d;
        } catch (f) {
          o.value = !0, r.value = f.message || "Pengaturan label gagal.";
        } finally {
          n.value = !1;
        }
      }
    }
    function N() {
      P(() => {
        i.value = ce(i.value);
      }, "Pengaturan label disimpan di perangkat ini.");
    }
    function E() {
      P(() => {
        de(), i.value = { ...B };
      }, "Kembali menggunakan default ZPL asli.");
    }
    function y() {
      P(async () => {
        try {
          const C = await Se();
          t.value = C.printers, h.value = C.defaultPrinter, k.value = !0;
        } catch (C) {
          throw t.value = [], h.value = "", k.value = !1, e.value = "", C;
        }
      }, "Daftar printer diperbarui.");
    }
    function L() {
      P(async () => {
        const C = p.value, d = await xe(C);
        e.value = d, C.printer || (h.value = d);
      }, "Label TEST dikirim. Tidak ada serial produksi yang dibuat.");
    }
    return (C, d) => (g(), v("section", et, [
      a("div", tt, [
        a("span", nt, [
          Z(U(se), {
            size: 15,
            "stroke-width": 1.9
          })
        ]),
        d[4] || (d[4] = a("h2", { id: "pqr-layout-title" }, "Pengaturan layout label", -1)),
        d[5] || (d[5] = a("span", { class: "lead" }, "Khusus browser dan perangkat ini.", -1))
      ]),
      a("div", rt, [
        a("div", ot, [
          d[9] || (d[9] = a("div", { class: "settings-block-head" }, [
            a("h3", null, "Printer label"),
            a("p", { class: "hint" }, "Gunakan printer ZPL. Cetak TEST hanya untuk memeriksa layout dengan data contoh, tanpa Work Order.")
          ], -1)),
          a("div", at, [
            a("div", st, [
              a("div", it, [
                d[6] || (d[6] = a("label", { for: "pqr-printer" }, "Printer label", -1)),
                H(a("select", {
                  id: "pqr-printer",
                  "onUpdate:modelValue": d[0] || (d[0] = (f) => i.value.printer = f),
                  class: "input"
                }, [
                  a("option", lt, S(h.value ? `Default sistem — ${h.value}` : "Printer default sistem (nama belum dimuat)"), 1),
                  (g(!0), v(D, null, j(s.value, (f) => (g(), v("option", {
                    key: f,
                    value: f
                  }, S(f) + S(k.value && !t.value.includes(f) ? " — belum terdeteksi" : ""), 9, ut))), 128))
                ], 512), [
                  [M, i.value.printer]
                ])
              ])
            ]),
            a("p", ct, [
              d[7] || (d[7] = O("Printer tujuan: ", -1)),
              a("strong", null, S(l.value.name), 1),
              d[8] || (d[8] = a("br", null, null, -1)),
              O(S(l.value.detail), 1)
            ]),
            a("div", dt, [
              a("button", {
                type: "button",
                class: "btn",
                disabled: n.value,
                onClick: y
              }, "Hubungkan / muat printer", 8, ft),
              a("button", {
                type: "button",
                class: "btn",
                disabled: n.value,
                onClick: L
              }, "Cetak label TEST", 8, pt)
            ])
          ])
        ]),
        a("div", bt, [
          d[12] || (d[12] = a("div", { class: "settings-block-head" }, [
            a("h3", null, "Ukuran dan media"),
            a("p", { class: "hint" }, "Dasar ZPL asli: 2 kolom, ^PW800, ^LL160, 203 DPI. Pengaturan ini hanya untuk penyesuaian.")
          ], -1)),
          a("div", mt, [
            a("div", kt, [
              (g(!0), v(D, null, j(U(_), (f) => (g(), v("div", {
                key: f.key,
                class: "field"
              }, [
                a("label", {
                  for: `pqr-${f.key}`
                }, S(f.label), 9, gt),
                f.key === "dpi" ? H((g(), v("select", {
                  key: 0,
                  id: `pqr-${f.key}`,
                  "onUpdate:modelValue": d[1] || (d[1] = (m) => i.value.dpi = m),
                  class: "input"
                }, [...d[10] || (d[10] = [
                  a("option", { value: 203 }, "203", -1),
                  a("option", { value: 300 }, "300", -1),
                  a("option", { value: 600 }, "600", -1)
                ])], 8, vt)), [
                  [
                    M,
                    i.value.dpi,
                    void 0,
                    { number: !0 }
                  ]
                ]) : H((g(), v("input", {
                  key: 1,
                  id: `pqr-${f.key}`,
                  "onUpdate:modelValue": (m) => i.value[f.key] = m,
                  class: "input",
                  type: "number",
                  min: f.min,
                  max: f.max,
                  step: f.step
                }, null, 8, yt)), [
                  [
                    $,
                    i.value[f.key],
                    void 0,
                    { number: !0 }
                  ]
                ])
              ]))), 128))
            ]),
            a("p", ht, "Lebar media: " + S(p.value.width * p.value.columns + p.value.gap * (p.value.columns - 1)) + " mm.", 1),
            d[11] || (d[11] = a("p", { class: "settings-note" }, "Margin tambahan 0 mempertahankan posisi asli. Pengaturan konten kiri/kanan di bawah berlaku di dalam setiap label, bukan untuk membedakan dua kolom cetak. Samakan ukuran media dan sensor gap di printer.", -1))
          ])
        ]),
        a("div", wt, [
          d[14] || (d[14] = a("div", { class: "settings-block-head" }, [
            a("h3", null, "Konten kiri — QR"),
            a("p", { class: "hint" }, "Atur posisi dan ukuran QR tanpa menggeser konten kanan. QR selalu dicetak dengan identitas serial yang sama.")
          ], -1)),
          a("div", Ct, [
            a("div", St, [
              (g(!0), v(D, null, j(U(b), (f) => (g(), v("div", {
                key: f.key,
                class: "field"
              }, [
                a("label", {
                  for: `pqr-${f.key}`
                }, S(f.label), 9, xt),
                H(a("input", {
                  id: `pqr-${f.key}`,
                  "onUpdate:modelValue": (m) => i.value[f.key] = m,
                  class: "input",
                  type: "number",
                  min: f.min,
                  max: f.max,
                  step: f.step
                }, null, 8, At), [
                  [
                    $,
                    i.value[f.key],
                    void 0,
                    { number: !0 }
                  ]
                ])
              ]))), 128))
            ]),
            d[13] || (d[13] = a("p", { class: "settings-note" }, "Geser 0 memakai posisi ZPL asli. Nilai negatif menggeser ke kiri/atas, positif ke kanan/bawah; posisi tidak melewati titik nol media. QR acuan 16 memakai magnifikasi 4 pada 203 DPI. Perbesar area label bila konten terpotong.", -1))
          ])
        ]),
        a("div", _t, [
          d[19] || (d[19] = a("div", { class: "settings-block-head" }, [
            a("h3", null, "Konten kanan — Teks"),
            a("p", { class: "hint" }, "Atur blok prefix, nama produk, SKU, MFG, EXP, footer dan nomor urut secara terpisah dari QR. Nama produk tetap dicetak.")
          ], -1)),
          a("div", Pt, [
            a("div", Lt, [
              (g(!0), v(D, null, j(U(w), (f) => (g(), v("div", {
                key: f.key,
                class: "field"
              }, [
                a("label", {
                  for: `pqr-${f.key}`
                }, S(f.label), 9, Et),
                H(a("input", {
                  id: `pqr-${f.key}`,
                  "onUpdate:modelValue": (m) => i.value[f.key] = m,
                  class: "input",
                  type: "number",
                  min: f.min,
                  max: f.max,
                  step: f.step
                }, null, 8, Tt), [
                  [
                    $,
                    i.value[f.key],
                    void 0,
                    { number: !0 }
                  ]
                ])
              ]))), 128)),
              a("div", Nt, [
                d[16] || (d[16] = a("label", { for: "pqr-align" }, "Perataan teks", -1)),
                H(a("select", {
                  id: "pqr-align",
                  "onUpdate:modelValue": d[2] || (d[2] = (f) => i.value.align = f),
                  class: "input"
                }, [...d[15] || (d[15] = [
                  a("option", { value: "left" }, "Kiri", -1),
                  a("option", { value: "center" }, "Tengah", -1),
                  a("option", { value: "right" }, "Kanan", -1)
                ])], 512), [
                  [M, i.value.align]
                ])
              ]),
              a("div", Ot, [
                d[17] || (d[17] = a("label", { for: "pqr-footer" }, "Footer", -1)),
                H(a("input", {
                  id: "pqr-footer",
                  "onUpdate:modelValue": d[3] || (d[3] = (f) => i.value.footer = f),
                  maxlength: "100",
                  class: "input"
                }, null, 512), [
                  [$, i.value.footer]
                ])
              ])
            ]),
            d[18] || (d[18] = a("p", { class: "settings-note" }, "Lebar 0 mengikuti sisa area label; ukuran prefix 0 mengikuti font asli. Jumlah baris nama menambah ruang sebelum SKU/MFG/EXP. Geser teks juga memindahkan nomor urut, tanpa menggeser QR. Periksa hasil penyesuaian dengan cetak TEST.", -1))
          ])
        ])
      ]),
      r.value ? (g(), v("div", Ut, [
        a("p", {
          role: "status",
          class: oe(o.value ? "err" : "hint")
        }, S(r.value), 3)
      ])) : F("", !0),
      a("div", It, [
        a("button", {
          type: "button",
          class: "btn btn-primary",
          disabled: n.value,
          onClick: N
        }, "Simpan layout label", 8, Ht),
        a("button", {
          type: "button",
          class: "btn",
          disabled: n.value,
          onClick: E
        }, "Pulihkan default ZPL", 8, Ft)
      ])
    ]));
  }
};
function Vt(c, i = 0) {
  const p = `/product_qr_work_order_label?name=${encodeURIComponent(c)}`;
  return i > 0 ? `${p}&extra=${i}` : p;
}
export {
  Rt as LabelLayoutSettings,
  jt as WorkOrderLabelButton,
  Mt as WorkOrderLabelDialogs,
  Q as connectQz,
  pe as labelCountForWorkOrder,
  T as labelPrintPrompt,
  ee as labelSource,
  be as offerLabelPrint,
  Pe as printLabels,
  Vt as workOrderLabelUrl
};

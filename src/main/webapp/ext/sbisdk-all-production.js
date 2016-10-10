/** SpagoBI, the Open Source Business Intelligence suite

 * Copyright (C) 2012 Engineering Ingegneria Informatica S.p.A. - SpagoBI Competency Center
 * This Source Code Form is subject to the terms of the Mozilla Public License, v. 2.0, without the "Incompatible With Secondary Licenses" notice.
 * If a copy of the MPL was not distributed with this file, You can obtain one at http://mozilla.org/MPL/2.0/. **/

Sbi = this.Sbi || {};
Sbi.sdk = {version: "2.2"};
Sbi.sdk.apply = function (d, e, b) {
    if (b) {
        Sbi.sdk.apply(d, b)
    }
    if (d && e && typeof e == "object") {
        for (var a in e) {
            d[a] = e[a]
        }
    }
    return d
};
Sbi.sdk.namespace = function () {
    var a = arguments, o = null, i, j, d, rt;
    for (i = 0; i < a.length; ++i) {
        d = a[i].split(".");
        rt = d[0];
        eval("if (typeof " + rt + ' == "undefined"){' + rt + " = {};} o = " + rt + ";");
        for (j = 1; j < d.length; ++j) {
            o[d[j]] = o[d[j]] || {};
            o = o[d[j]]
        }
    }
};
Sbi.sdk.urlEncode = function (h) {
    if (!h) {
        return ""
    }
    var c = [];
    for (var f in h) {
        var e = h[f], b = encodeURIComponent(f);
        var g = typeof e;
        if (g == "undefined") {
            c.push(b, "=&")
        } else {
            if (g != "function" && g != "object") {
                c.push(b, "=", encodeURIComponent(e), "&")
            } else {
                if (e instanceof Array) {
                    if (e.length) {
                        for (var d = 0, a = e.length; d < a; d++) {
                            c.push(b, "=", encodeURIComponent(e[d] === undefined ? "" : e[d]), "&")
                        }
                    } else {
                        c.push(b, "=&")
                    }
                }
            }
        }
    }
    c.pop();
    return c.join("")
}, Sbi.sdk.urlDecode = function (f, h) {
    if (!f || !f.length) {
        return {}
    }
    var d = {};
    var b = f.split("&");
    var c, a, j;
    for (var e = 0, g = b.length; e < g; e++) {
        c = b[e].split("=");
        a = decodeURIComponent(c[0]);
        j = decodeURIComponent(c[1]);
        if (h !== true) {
            if (typeof d[a] == "undefined") {
                d[a] = j
            } else {
                if (typeof d[a] == "string") {
                    d[a] = [d[a]];
                    d[a].push(j)
                } else {
                    d[a].push(j)
                }
            }
        } else {
            d[a] = j
        }
    }
    return d
}, Sbi.sdk.apply(Function.prototype, {
    createDelegate: function (c, b, a) {
        var d = this;
        return function () {
            var f = b || arguments;
            if (a === true) {
                f = Array.prototype.slice.call(arguments, 0);
                f = f.concat(b)
            } else {
                if (typeof a == "number") {
                    f = Array.prototype.slice.call(arguments, 0);
                    var e = [a, 0].concat(b);
                    Array.prototype.splice.apply(f, e)
                }
            }
            return d.apply(c || window, f)
        }
    }, defer: function (c, e, b, a) {
        var d = this.createDelegate(e, b, a);
        if (c) {
            return setTimeout(d, c)
        }
        d();
        return 0
    }
});
Sbi.sdk.namespace("Sbi.sdk.ajax");
Sbi.sdk.apply(Sbi.sdk.ajax, {
    request: function (g, e, a, f, b) {
        if (b) {
            var c = b.headers;
            if (c) {
                for (var d in c) {
                    if (c.hasOwnProperty(d)) {
                        this.initHeader(d, c[d], false)
                    }
                }
            }
            if (b.xmlData) {
                this.initHeader("Content-Type", "text/xml", false);
                g = "POST";
                f = b.xmlData
            } else {
                if (b.jsonData) {
                    this.initHeader("Content-Type", "text/javascript", false);
                    g = "POST";
                    f = typeof b.jsonData == "object" ? Ext.encode(b.jsonData) : b.jsonData
                }
            }
        }
        return this.asyncRequest(g, e, a, f)
    },
    serializeForm: function (b) {
        if (typeof b == "string") {
            b = (document.getElementById(b) || document.forms[b])
        }
        var c, a, d, f, g = "", k = false;
        for (var h = 0; h < b.elements.length; h++) {
            c = b.elements[h];
            f = b.elements[h].disabled;
            a = b.elements[h].name;
            d = b.elements[h].value;
            if (!f && a) {
                switch (c.type) {
                    case"select-one":
                    case"select-multiple":
                        for (var e = 0; e < c.options.length; e++) {
                            if (c.options[e].selected) {
                                if (Ext.isIE) {
                                    g += encodeURIComponent(a) + "=" + encodeURIComponent(c.options[e].attributes.value.specified ? c.options[e].value : c.options[e].text) + "&"
                                } else {
                                    g += encodeURIComponent(a) + "=" + encodeURIComponent(c.options[e].hasAttribute("value") ? c.options[e].value : c.options[e].text) + "&"
                                }
                            }
                        }
                        break;
                    case"radio":
                    case"checkbox":
                        if (c.checked) {
                            g += encodeURIComponent(a) + "=" + encodeURIComponent(d) + "&"
                        }
                        break;
                    case"file":
                    case undefined:
                    case"reset":
                    case"button":
                        break;
                    case"submit":
                        if (k == false) {
                            g += encodeURIComponent(a) + "=" + encodeURIComponent(d) + "&";
                            k = true
                        }
                        break;
                    default:
                        g += encodeURIComponent(a) + "=" + encodeURIComponent(d) + "&";
                        break
                }
            }
        }
        g = g.substr(0, g.length - 1);
        return g
    },
    headers: {},
    hasHeaders: false,
    useDefaultHeader: true,
    defaultPostHeader: "application/x-www-form-urlencoded",
    useDefaultXhrHeader: true,
    defaultXhrHeader: "XMLHttpRequest",
    hasDefaultHeaders: true,
    defaultHeaders: {},
    poll: {},
    timeout: {},
    pollInterval: 50,
    transactionId: 0,
    setProgId: function (a) {
        this.activeX.unshift(a)
    },
    setDefaultPostHeader: function (a) {
        this.useDefaultHeader = a
    },
    setDefaultXhrHeader: function (a) {
        this.useDefaultXhrHeader = a
    },
    setPollingInterval: function (a) {
        if (typeof a == "number" && isFinite(a)) {
            this.pollInterval = a
        }
    },
    createXhrObject: function (f) {
        var d, a;
        try {
            a = new XMLHttpRequest();
            d = {conn: a, tId: f}
        } catch (c) {
            for (var b = 0; b < this.activeX.length; ++b) {
                try {
                    a = new ActiveXObject(this.activeX[b]);
                    d = {conn: a, tId: f};
                    break
                } catch (c) {
                }
            }
        } finally {
            return d
        }
    },
    getConnectionObject: function () {
        var b;
        var c = this.transactionId;
        try {
            b = this.createXhrObject(c);
            if (b) {
                this.transactionId++
            }
        } catch (a) {
        } finally {
            return b
        }
    },
    asyncRequest: function (e, b, d, a) {
        var c = this.getConnectionObject();
        if (!c) {
            return null
        } else {
            c.conn.open(e, b, true);
            if (this.useDefaultXhrHeader) {
                if (!this.defaultHeaders["X-Requested-With"]) {
                    this.initHeader("X-Requested-With", this.defaultXhrHeader, true)
                }
            }
            if (a && this.useDefaultHeader) {
                this.initHeader("Content-Type", this.defaultPostHeader)
            }
            if (this.hasDefaultHeaders || this.hasHeaders) {
                this.setHeader(c)
            }
            this.handleReadyState(c, d);
            c.conn.send(a || null);
            return c
        }
    },
    handleReadyState: function (b, c) {
        var a = this;
        if (c && c.timeout) {
            this.timeout[b.tId] = window.setTimeout(function () {
                a.abort(b, c, true)
            }, c.timeout)
        }
        this.poll[b.tId] = window.setInterval(function () {
            if (b.conn && b.conn.readyState == 4) {
                window.clearInterval(a.poll[b.tId]);
                delete a.poll[b.tId];
                if (c && c.timeout) {
                    window.clearTimeout(a.timeout[b.tId]);
                    delete a.timeout[b.tId]
                }
                a.handleTransactionResponse(b, c)
            }
        }, this.pollInterval)
    },
    handleTransactionResponse: function (f, g, a) {
        if (!g) {
            this.releaseObject(f);
            return
        }
        var c, b;
        try {
            if (f.conn.status !== undefined && f.conn.status != 0) {
                c = f.conn.status
            } else {
                c = 13030
            }
        } catch (d) {
            c = 13030
        }
        if (c >= 200 && c < 300) {
            b = this.createResponseObject(f, g.argument);
            if (g.success) {
                if (!g.scope) {
                    g.success(b)
                } else {
                    g.success.apply(g.scope, [b])
                }
            }
        } else {
            switch (c) {
                case 12002:
                case 12029:
                case 12030:
                case 12031:
                case 12152:
                case 13030:
                    b = this.createExceptionObject(f.tId, g.argument, (a ? a : false));
                    if (g.failure) {
                        if (!g.scope) {
                            g.failure(b)
                        } else {
                            g.failure.apply(g.scope, [b])
                        }
                    }
                    break;
                default:
                    b = this.createResponseObject(f, g.argument);
                    if (g.failure) {
                        if (!g.scope) {
                            g.failure(b)
                        } else {
                            g.failure.apply(g.scope, [b])
                        }
                    }
            }
        }
        this.releaseObject(f);
        b = null
    },
    createResponseObject: function (a, h) {
        var d = {};
        var k = {};
        try {
            var c = a.conn.getAllResponseHeaders();
            var g = c.split("\n");
            for (var f = 0; f < g.length; f++) {
                var b = g[f].indexOf(":");
                if (b != -1) {
                    k[g[f].substring(0, b)] = g[f].substring(b + 2)
                }
            }
        } catch (j) {
        }
        d.tId = a.tId;
        d.status = a.conn.status;
        d.statusText = a.conn.statusText;
        d.getResponseHeader = k;
        d.getAllResponseHeaders = c;
        d.responseText = a.conn.responseText;
        d.responseXML = a.conn.responseXML;
        if (typeof h !== undefined) {
            d.argument = h
        }
        return d
    },
    createExceptionObject: function (h, d, a) {
        var f = 0;
        var g = "communication failure";
        var c = -1;
        var b = "transaction aborted";
        var e = {};
        e.tId = h;
        if (a) {
            e.status = c;
            e.statusText = b
        } else {
            e.status = f;
            e.statusText = g
        }
        if (d) {
            e.argument = d
        }
        return e
    },
    initHeader: function (a, d, c) {
        var b = (c) ? this.defaultHeaders : this.headers;
        if (b[a] === undefined) {
            b[a] = d
        } else {
            b[a] = d + "," + b[a]
        }
        if (c) {
            this.hasDefaultHeaders = true
        } else {
            this.hasHeaders = true
        }
    },
    setHeader: function (a) {
        if (this.hasDefaultHeaders) {
            for (var b in this.defaultHeaders) {
                if (this.defaultHeaders.hasOwnProperty(b)) {
                    a.conn.setRequestHeader(b, this.defaultHeaders[b])
                }
            }
        }
        if (this.hasHeaders) {
            for (var b in this.headers) {
                if (this.headers.hasOwnProperty(b)) {
                    a.conn.setRequestHeader(b, this.headers[b])
                }
            }
            this.headers = {};
            this.hasHeaders = false
        }
    },
    resetDefaultHeaders: function () {
        delete this.defaultHeaders;
        this.defaultHeaders = {};
        this.hasDefaultHeaders = false
    },
    abort: function (b, c, a) {
        if (this.isCallInProgress(b)) {
            b.conn.abort();
            window.clearInterval(this.poll[b.tId]);
            delete this.poll[b.tId];
            if (a) {
                delete this.timeout[b.tId]
            }
            this.handleTransactionResponse(b, c, true);
            return true
        } else {
            return false
        }
    },
    isCallInProgress: function (a) {
        if (a.conn) {
            return a.conn.readyState != 4 && a.conn.readyState != 0
        } else {
            return false
        }
    },
    releaseObject: function (a) {
        a.conn = null;
        a = null
    },
    activeX: ["MSXML2.XMLHTTP.3.0", "MSXML2.XMLHTTP", "Microsoft.XMLHTTP"]
});
Sbi.sdk.namespace("Sbi.sdk.jsonp");
Sbi.sdk.apply(Sbi.sdk.jsonp, {
    timeout: 30000,
    callbackParam: "callback",
    nocache: true,
    trans_id: 0,
    asyncRequest: function (f, h, d, a) {
        if (this.head === undefined) {
            this.head = document.getElementsByTagName("head")[0]
        }
        if (this.nocache) {
            f += (f.indexOf("?") != -1 ? "&" : "?") + "_dc=" + (new Date().getTime())
        }
        var g = ++this.trans_id;
        var c = {id: g, cb: "stcCallback" + g, scriptId: "stcScript" + g, arg: a, url: f, callback: h, scope: d};
        var e = this;
        window[c.cb] = function (i) {
            e.handleResponse(i, c)
        };
        f += (f.indexOf("?") != -1 ? "&" : "?") + this.callbackParam + "=" + c.cb;
        console.log(this);
        //if (this.autoAbort !== false) {
        //    this.abort()
        //}
        c.timeoutId = this.handleFailure.defer(this.timeout, this, [c]);
        var b = document.createElement("script");
        b.setAttribute("src", f);
        b.setAttribute("type", "text/javascript");
        b.setAttribute("id", c.scriptId);
        this.head.appendChild(b);
        this.trans = c
    },
    isLoading: function () {
        return this.trans ? true : false
    },
    abort: function () {
        if (this.isLoading()) {
            this.destroyTrans(this.trans)
        }
    },
    destroyTrans: function (b, a) {
        this.head.removeChild(document.getElementById(b.scriptId));
        clearTimeout(b.timeoutId);
        if (a) {
            window[b.cb] = undefined;
            try {
                delete window[b.cb]
            } catch (c) {
            }
        } else {
            window[b.cb] = function () {
                window[b.cb] = undefined;
                try {
                    delete window[b.cb]
                } catch (d) {
                }
            }
        }
    },
    handleResponse: function (c, b) {
        this.trans = false;
        this.destroyTrans(b, true);
        var a = c;
        b.callback.call(b.scope || window, a, b.arg, true)
    },
    handleFailure: function (a) {
        this.trans = false;
        this.destroyTrans(a, false);
        a.callback.call(a.scope || window, null, a.arg, false)
    }
});
Sbi.sdk.namespace("Sbi.sdk.cors");
Sbi.sdk.apply(Sbi.sdk.cors, {
    defaultCallbackError: function (d, a, c) {
        var b = "Error: ";
        if (a !== undefined) {
            b += a + " - " + c
        }
        if (d.errors !== undefined) {
            b += "\n\n" + d.errors[0].localizedMessage
        }
        alert(b)
    }, asyncRequest: function (b) {
        var d = new XMLHttpRequest();
        if ("withCredentials" in d) {
            d.open(b.method, b.url, true)
        } else {
            if (typeof XDomainRequest != "undefined") {
                d = new XDomainRequest();
                d.open(b.method, b.url)
            } else {
                alert("Your browser does not support CORS.");
                return
            }
        }
        d.onerror = function () {
            alert("Error while trying to contact server")
        };
        var c;
        if (b.callbackError) {
            c = b.callbackError
        } else {
            c = this.defaultCallbackError
        }
        d.onload = function () {
            var f = null;
            if (d.response !== "") {
                f = JSON.parse(d.response)
            }
            if (d.status == "200" || d.status == "201") {
                if (f.errors !== undefined) {
                    c(f)
                }
                b.callbackOk(f)
            } else {
                c(f, d.status, d.statusText)
            }
        };
        for (var a in b.headers) {
            var e = b.headers[a];
            d.setRequestHeader(e.name, e.value)
        }
        d.withCredentials = "true";
        if (b.body !== "undefined") {
            d.send(b.body)
        } else {
            d.send()
        }
    }
});
Sbi.sdk.namespace("Sbi.sdk.services");
Sbi.sdk.apply(Sbi.sdk.services, {
    services: null,
    baseUrl: {
        protocol: "http",
        host: "localhost",
        port: "8080",
        contextPath: "SpagoBI",
        controllerPath: "servlet/AdapterHTTP"
    },
    initServices: function () {
        this.services = {};
        this.services.authenticate = {type: "ACTION", name: "LOGIN_ACTION_WEB", baseParams: {NEW_SESSION: "TRUE"}};
        this.services.execute = {
            type: "ACTION",
            name: "EXECUTE_DOCUMENT_ACTION",
            baseParams: {NEW_SESSION: "TRUE", IGNORE_SUBOBJECTS_VIEWPOINTS_SNAPSHOTS: "true"}
        };
        this.services.adHocReporting = {
            type: "ACTION",
            name: "AD_HOC_REPORTING_START_ACTION",
            baseParams: {NEW_SESSION: "TRUE"}
        }
    },
    setBaseUrl: function (a) {
        Sbi.sdk.apply(this.baseUrl, a || {})
    },
    getServiceUrl: function (a, c) {
        var b = null;
        if (this.services === null) {
            this.initServices()
        }
        if (this.services[a] === undefined) {
            alert("ERROR: Service [" + a + "] does not exist")
        } else {
            b = "";
            b = this.baseUrl.protocol + "://" + this.baseUrl.host + ":" + this.baseUrl.port + "/" + this.baseUrl.contextPath + "/" + this.baseUrl.controllerPath;
            var e;
            if (this.services[a].type === "PAGE") {
                e = {PAGE: this.services[a].name}
            } else {
                e = {ACTION_NAME: this.services[a].name}
            }
            Sbi.sdk.apply(e, c || {}, this.services[a].baseParams || {});
            var d = Sbi.sdk.urlEncode(e);
            b += "?" + d
        }
        return b
    }
});
Sbi.sdk.namespace("Sbi.sdk.api");
Sbi.sdk.apply(Sbi.sdk.api, {
    authenticate: function (a) {
        var b = Sbi.sdk.services.getServiceUrl("authenticate", a.params);
        Sbi.sdk.jsonp.asyncRequest(b, a.callback.fn, a.callback.scope, a.callback.args)
    }, getDataSetList: function (a) {
        Sbi.sdk.jsonp.timeout = 10000;
        var b = Sbi.sdk.services.baseUrl;
        var c = b.protocol + "://" + b.host + ":" + b.port + "/" + b.contextPath + "/restful-services/2.0/datasets";
        Sbi.sdk.jsonp.asyncRequest(c, a.callback, this)
    }, executeDataSet: function (a) {
        Sbi.sdk.jsonp.timeout = 20000;
        var b = Sbi.sdk.services.baseUrl;
        var c = b.protocol + "://" + b.host + ":" + b.port + "/" + b.contextPath + "/restful-services/2.0/datasets/";
        c += a.datasetLabel + "/content";
        if (a.parameters !== undefined) {
            var d = true;
            for (var e in a.parameters) {
                if (d) {
                    c += "?";
                    d = false
                } else {
                    c += "&"
                }
                c += e + "=" + a.parameters[e]
            }
        }
        Sbi.sdk.jsonp.asyncRequest(c, a.callback, this)
    }
});
Sbi.sdk.namespace("Sbi.sdk.cors.api");
Sbi.sdk.apply(Sbi.sdk.cors.api, {
    elId: 0, dataSetList: {}, authenticate: function (a) {
        var b = Sbi.sdk.services.getServiceUrl("authenticate", a.params);
        Sbi.sdk.cors.asyncRequest({
            method: "POST",
            url: b,
            headers: a.headers,
            callbackOk: a.callbackOk,
            callbackError: a.callbackError,
            body: a.credentials
        })
    }, getDataSetList: function (a) {
        var b = Sbi.sdk.services.baseUrl;
        var d = b.protocol + "://" + b.host + ":" + b.port + "/" + b.contextPath + "/restful-services/2.0/datasets";
        var e = [];
        if (a.basicAuthentication !== undefined) {
            var f = a.basicAuthentication;
            var c = btoa(f.userName + ":" + f.password);
            e[0] = {name: "Authorization", value: "Basic " + c}
        }
        Sbi.sdk.cors.asyncRequest({
            method: "GET",
            url: d,
            headers: e,
            callbackOk: a.callbackOk,
            callbackError: a.callbackError
        })
    }, executeDataSet: function (a) {
        var b = Sbi.sdk.services.baseUrl;
        var d = b.protocol + "://" + b.host + ":" + b.port + "/" + b.contextPath + "/restful-services/2.0/datasets/";
        d += a.datasetLabel + "/content";
        if (a.parameters !== undefined) {
            var f = true;
            for (var h in a.parameters) {
                if (f) {
                    d += "?";
                    f = false
                } else {
                    d += "&"
                }
                d += h + "=" + a.parameters[h]
            }
        }
        var e = [];
        if (a.basicAuthentication !== undefined) {
            var g = a.basicAuthentication;
            var c = btoa(g.userName + ":" + g.password);
            e[0] = {name: "Authorization", value: "Basic " + c}
        }
        Sbi.sdk.cors.asyncRequest({
            method: "GET",
            url: d,
            headers: e,
            callbackOk: a.callbackOk,
            callbackError: a.callbackError
        })
    }
});
Sbi.sdk.namespace("Sbi.sdk.api");
Sbi.sdk.apply(Sbi.sdk.api, {
    elId: 0, dataSetList: {}, getIFrameHtml: function (c, a) {
        var b;
        a.iframe = a.iframe || {};
        if (a.iframe.id === undefined) {
            a.iframe.id = "sbi-docexec-iframe-" + this.elId;
            this.elId = this.elId + 1
        }
        b = "";
        b += "<iframe";
        b += ' id = "' + a.iframe.id + '" ';
        b += ' src = "' + c + '" ';
        if (a.iframe.style !== undefined) {
            b += ' style = "' + a.iframe.style + '" '
        }
        if (a.iframe.width !== undefined) {
            b += ' width = "' + a.iframe.width + '" '
        }
        if (a.iframe.height !== undefined) {
            b += ' height = "' + a.iframe.height + '" '
        }
        b += "></iframe>";
        return b
    }, injectIFrame: function (c, b) {
        var d = b.target || document.body;
        if (typeof d === "string") {
            var a = d;
            d = document.getElementById(d);
            if (d === null) {
                d = document.createElement("div");
                d.setAttribute("id", a);
                if (b.width !== undefined) {
                    d.setAttribute("width", b.width)
                }
                if (b.height !== undefined) {
                    d.setAttribute("height", b.height)
                }
                document.body.appendChild(d)
            }
        }
        b.iframe = b.iframe || {};
        b.iframe.width = d.getAttribute("width");
        b.iframe.height = d.getAttribute("height");
        d.innerHTML = this.getIFrameHtml(c, b)
    }, getDocumentUrl: function (a) {
        var b = null;
        if (a.documentId === undefined && a.documentLabel === undefined) {
            alert("ERROR: at least one beetween documentId and documentLabel attributes must be specified");
            return null
        }
        var c = Sbi.sdk.apply({}, a.parameters || {});
        if (a.documentId !== undefined) {
            c.OBJECT_ID = a.documentId
        }
        if (a.documentLabel !== undefined) {
            c.OBJECT_LABEL = a.documentLabel
        }
        if (a.executionRole !== undefined) {
            c.ROLE = a.executionRole
        }
        if (a.displayToolbar !== undefined) {
            c.TOOLBAR_VISIBLE = a.displayToolbar
        }
        if (a.theme !== undefined) {
            c.theme = a.theme
        }
        b = Sbi.sdk.services.getServiceUrl("execute", c);
        return b
    }, getDocumentHtml: function (a) {
        var b = this.getDocumentUrl(a);
        return this.getIFrameHtml(b, a)
    }, injectDocument: function (a) {
        var b = this.getDocumentUrl(a);
        return this.injectIFrame(b, a)
    }, getAdHocReportingUrl: function (b) {
        var a = null;
        if (b.datasetLabel === undefined) {
            alert("ERROR: datasetLabel attribute must be specified");
            return null
        }
        var c = {};
        c.dataset_label = b.datasetLabel;
        c.TYPE_DOC = b.type;
        if (b.parameters !== undefined) {
            for (var d in b.parameters) {
                c[d] = b.parameters[d]
            }
        }
        return Sbi.sdk.services.getServiceUrl("adHocReporting", c)
    }, getWorksheetUrl: function (a) {
        a.type = "WORKSHEET";
        return this.getAdHocReportingUrl(a)
    }, getWorksheetHtml: function (a) {
        var b = this.getWorksheetUrl(a);
        return this.getIFrameHtml(b, a)
    }, injectWorksheet: function (a) {
        var b = this.getWorksheetUrl(a);
        return this.injectIFrame(b, a)
    }, getQbeUrl: function (a) {
        a.type = "QBE";
        return this.getAdHocReportingUrl(a)
    }, getQbeHtml: function (a) {
        var b = this.getQbeUrl(a);
        return this.getIFrameHtml(b, a)
    }, injectQbe: function (a) {
        var b = this.getQbeUrl(a);
        return this.injectIFrame(b, a)
    }
});
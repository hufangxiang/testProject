var commonMoudle = {
	queryActidsTotal: function(a, e) {
		var r = false;
		if (!(a instanceof Array)) {
			r = a;
			a = [a]
		}
		zHttp.send({
			actid: a.join("_"),
			_c: "counter"
		}, function(a) {
			var t = {};
			if (a.ret == 0 && a.data) {
				var n = a.data;
				if (r) {
					t[r] = +n.total || 0
				} else {
					for (var i in n) {
						t[i] = +(n[i] && n[i]["total"]) || 0
					}
				}
				e && e(t)
			} else {
				e && e(false)
			}
		})
	},
	queryVM: function(a) {
		var e = a.actids;
		var r = a.callback;
		var t = typeof a.type === "undefined" ? 1 : a.type;
		if (!(e instanceof Array)) {
			e = [e]
		}
		zHttp.send({
			_c: "QueryVM",
			actids: e.join("_"),
			type: t
		}, function(a) {
			if (a.ret == 0 && a.data) {
				var e = a.data;
				r && r(e)
			} else {
				r && r(false)
			}
		})
	},
	getCityName: function(a) {
		var e = [11e4, 12e4, 31e4, 5e5];
		var r = {};
		if (e.indexOf(a.provinceId) > -1) {
			r["province"] = "";
			r["city"] = zUtil.getValueFromObj(a.list, a.provinceId + ".0") || ""
		} else {
			r["province"] = zUtil.getValueFromObj(a.list, a.provinceId + ".0") || "";
			r["city"] = zUtil.getValueFromObj(a.list, a.provinceId + ".1." + a.cityId + ".0") || ""
		}
		return r
	},
	queryActidsJoin: function(a) {
		var e = a.actids;
		var r = a.callback;
		if (!(e instanceof Array)) {
			e = [e]
		}
		zHttp.send({
			actids: e.join("_"),
			_c: "load",
			_f: "remaindCnt"
		}, function(a) {
			if (a.ret == 0 && a.data) {
				var e = a.data;
				r && r(e)
			} else {
				r && r(false)
			}
		})
	},
	randomAngle: function(a, e) {
		return Math.round(a + Math.random() * (e - a))
	},
	getRandomArrayElements: function(a, e) {
		var r = a.slice(0),
			t = a.length,
			n = t - e,
			i, o;
		while (t-- > n) {
			o = Math.floor((t + 1) * Math.random());
			i = r[o];
			r[o] = r[t];
			r[t] = i
		}
		return r.slice(n)
	},
	arrayToObj: function(a) {
		var e = {};
		var r = this;
		var t = a.array;
		var n = a && typeof a.key !== "undefined" ? a.key : "";
		var i = a && typeof a.value !== "undefined" ? a.value : "";
		for (var o in t) {
			if (n && i && r.isJson(t[o])) {
				e[t[o][n]] = t[o][i]
			} else {
				e[o] = t[o]
			}
		}
		return e
	},
	isJson: function(a) {
		var e = typeof a == "object" && Object.prototype.toString.call(a).toLowerCase() == "[object object]" && !a.length;
		return e
	},
	queryNike: function(a) {
		var e = a.actid;
		var r = a.uins;
		var t = a.callback;
		if (!(r instanceof Array)) {
			r = [r]
		}
		zHttp.send({
			actid: e,
			uins: r
		}, function(a) {
			if (a.ret == 0 && a.data && a.data.op && a.data.op.friend) {
				t && t(a.data.op.friend)
			} else {
				t && t(false)
			}
		})
	},
	shortNike: function(a) {
		var e = a.nike;
		var r = a.uin;
		var t = a.len;
		return e.length > t - 1 ? e.slice(0, t) + "..." : e || r
	},
	uniqueArray: function(a) {
		var e = a.array;
		var r = a.field;
		var t = {};
		var n;
		var i = [];
		for (var o in e) {
			if (r) {
				id = e[o][r]
			} else {
				id = e[o]
			}
			if (!t[id]) {
				i.push(e[o]);
				t[id] = 1
			}
		}
		return i
	},
	setShareMessage: function(a) {
		var e = a.title;
		var r = a.desc;
		var t = a.imageUrl;
		var n = a.shareUrl;
		var i = a.callback;
		mqq.ui.setOnShareHandler(function(a) {
			mqq.ui.shareMessage({
				title: e,
				desc: r,
				image_url: t,
				share_url: n,
				share_type: a,
				back: true,
				sourceName: "QQ手游"
			}, function(a) {
				if (a.retCode == 0) {
					i && i()
				}
			})
		})
	},
	querySupportPeople: function(a) {
		var e = this;
		var r = a.actid;
		var t = a.callback;
		var n = a.isToArray;
		zHttp.send({
			actid: r
		}, function(a) {
			if (a.ret == 0 && a.data && a.data.op && a.data.op.invite_num) {
				var r = a.data.op;
				var i;
				if (n) {
					var o = r.uin_nick;
					i = [];
					for (var c in o) {
						i.push({
							uin: c,
							nike: e.shortNike({
								nike: o[c],
								uin: c,
								len: 4
							})
						})
					}
				} else {
					i = r
				}
				t && t(i)
			} else {
				t && t(false)
			}
		})
	},
	setTwoMessageBox: function(a) {
		var e = a.msg;
		var r = a.lbtn || "取消";
		var t = a.lfn;
		var n = a.rbtn || "确定";
		var i = a.rfn;
		zMsg.showMessageBox({
			msg: e,
			left: {
				text: r,
				click: function() {
					t && t()
				}
			},
			right: {
				text: n,
				click: function() {
					i && i()
				}
			}
		})
	},
	countDownTime: function(a) {
		var e = a.nowTime;
		var r = a.endTime;
		//清除定时器
		var timer = a.timer;
		
		var t = Math.floor((r - e) / 1e3);
		var n, i, o, c;
		if (t > 0) {
			n = Math.floor(t / (24 * 3600));
			n = n < 10 ? "0" + n : n;
			i = Math.floor(t % (24 * 3600) / (60 * 60));
			i = i < 10 ? "0" + i : i;
			o = Math.floor(t % (24 * 3600) % 3600 / 60);
			o = o < 10 ? "0" + o : o;
			c = t % (24 * 3600) % 3600 % 60;
			c = c < 10 ? "0" + c : c
		}else{
			//清除定时器
			clearInterval(timer);
		}
		return {
			days: n || "00",
			hours: i || "00",
			minutes: o || "00",
			seconds: c || "00"
		}
	}
};
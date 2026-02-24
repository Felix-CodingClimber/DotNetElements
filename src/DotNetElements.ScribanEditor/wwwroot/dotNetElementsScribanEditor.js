var kd = Object.defineProperty;
var $d = (n, e, t) => e in n ? kd(n, e, { enumerable: !0, configurable: !0, writable: !0, value: t }) : n[e] = t;
var kl = (n, e, t) => $d(n, typeof e != "symbol" ? e + "" : e, t);
let As = [], qh = [];
(() => {
  let n = "lc,34,7n,7,7b,19,,,,2,,2,,,20,b,1c,l,g,,2t,7,2,6,2,2,,4,z,,u,r,2j,b,1m,9,9,,o,4,,9,,3,,5,17,3,3b,f,,w,1j,,,,4,8,4,,3,7,a,2,t,,1m,,,,2,4,8,,9,,a,2,q,,2,2,1l,,4,2,4,2,2,3,3,,u,2,3,,b,2,1l,,4,5,,2,4,,k,2,m,6,,,1m,,,2,,4,8,,7,3,a,2,u,,1n,,,,c,,9,,14,,3,,1l,3,5,3,,4,7,2,b,2,t,,1m,,2,,2,,3,,5,2,7,2,b,2,s,2,1l,2,,,2,4,8,,9,,a,2,t,,20,,4,,2,3,,,8,,29,,2,7,c,8,2q,,2,9,b,6,22,2,r,,,,,,1j,e,,5,,2,5,b,,10,9,,2u,4,,6,,2,2,2,p,2,4,3,g,4,d,,2,2,6,,f,,jj,3,qa,3,t,3,t,2,u,2,1s,2,,7,8,,2,b,9,,19,3,3b,2,y,,3a,3,4,2,9,,6,3,63,2,2,,1m,,,7,,,,,2,8,6,a,2,,1c,h,1r,4,1c,7,,,5,,14,9,c,2,w,4,2,2,,3,1k,,,2,3,,,3,1m,8,2,2,48,3,,d,,7,4,,6,,3,2,5i,1m,,5,ek,,5f,x,2da,3,3x,,2o,w,fe,6,2x,2,n9w,4,,a,w,2,28,2,7k,,3,,4,,p,2,5,,47,2,q,i,d,,12,8,p,b,1a,3,1c,,2,4,2,2,13,,1v,6,2,2,2,2,c,,8,,1b,,1f,,,3,2,2,5,2,,,16,2,8,,6m,,2,,4,,fn4,,kh,g,g,g,a6,2,gt,,6a,,45,5,1ae,3,,2,5,4,14,3,4,,4l,2,fx,4,ar,2,49,b,4w,,1i,f,1k,3,1d,4,2,2,1x,3,10,5,,8,1q,,c,2,1g,9,a,4,2,,2n,3,2,,,2,6,,4g,,3,8,l,2,1l,2,,,,,m,,e,7,3,5,5f,8,2,3,,,n,,29,,2,6,,,2,,,2,,2,6j,,2,4,6,2,,2,r,2,2d,8,2,,,2,2y,,,,2,6,,,2t,3,2,4,,5,77,9,,2,6t,,a,2,,,4,,40,4,2,2,4,,w,a,14,6,2,4,8,,9,6,2,3,1a,d,,2,ba,7,,6,,,2a,m,2,7,,2,,2,3e,6,3,,,2,,7,,,20,2,3,,,,9n,2,f0b,5,1n,7,t4,,1r,4,29,,f5k,2,43q,,,3,4,5,8,8,2,7,u,4,44,3,1iz,1j,4,1e,8,,e,,m,5,,f,11s,7,,h,2,7,,2,,5,79,7,c5,4,15s,7,31,7,240,5,gx7k,2o,3k,6o".split(",").map((e) => e ? parseInt(e, 36) : 1);
  for (let e = 0, t = 0; e < n.length; e++)
    (e % 2 ? qh : As).push(t = t + n[e]);
})();
function Pd(n) {
  if (n < 768) return !1;
  for (let e = 0, t = As.length; ; ) {
    let i = e + t >> 1;
    if (n < As[i]) t = i;
    else if (n >= qh[i]) e = i + 1;
    else return !0;
    if (e == t) return !1;
  }
}
function $l(n) {
  return n >= 127462 && n <= 127487;
}
const Pl = 8205;
function vd(n, e, t = !0, i = !0) {
  return (t ? Wh : Td)(n, e, i);
}
function Wh(n, e, t) {
  if (e == n.length) return e;
  e && Lh(n.charCodeAt(e)) && Bh(n.charCodeAt(e - 1)) && e--;
  let i = Gr(n, e);
  for (e += vl(i); e < n.length; ) {
    let r = Gr(n, e);
    if (i == Pl || r == Pl || t && Pd(r))
      e += vl(r), i = r;
    else if ($l(r)) {
      let s = 0, o = e - 2;
      for (; o >= 0 && $l(Gr(n, o)); )
        s++, o -= 2;
      if (s % 2 == 0) break;
      e += 2;
    } else
      break;
  }
  return e;
}
function Td(n, e, t) {
  for (; e > 0; ) {
    let i = Wh(n, e - 2, t);
    if (i < e) return i;
    e--;
  }
  return 0;
}
function Gr(n, e) {
  let t = n.charCodeAt(e);
  if (!Bh(t) || e + 1 == n.length) return t;
  let i = n.charCodeAt(e + 1);
  return Lh(i) ? (t - 55296 << 10) + (i - 56320) + 65536 : t;
}
function Lh(n) {
  return n >= 56320 && n < 57344;
}
function Bh(n) {
  return n >= 55296 && n < 56320;
}
function vl(n) {
  return n < 65536 ? 1 : 2;
}
class D {
  /**
  Get the line description around the given position.
  */
  lineAt(e) {
    if (e < 0 || e > this.length)
      throw new RangeError(`Invalid position ${e} in document of length ${this.length}`);
    return this.lineInner(e, !1, 1, 0);
  }
  /**
  Get the description for the given (1-based) line number.
  */
  line(e) {
    if (e < 1 || e > this.lines)
      throw new RangeError(`Invalid line number ${e} in ${this.lines}-line document`);
    return this.lineInner(e, !0, 1, 0);
  }
  /**
  Replace a range of the text with the given content.
  */
  replace(e, t, i) {
    [e, t] = hi(this, e, t);
    let r = [];
    return this.decompose(
      0,
      e,
      r,
      2
      /* Open.To */
    ), i.length && i.decompose(
      0,
      i.length,
      r,
      3
      /* Open.To */
    ), this.decompose(
      t,
      this.length,
      r,
      1
      /* Open.From */
    ), Je.from(r, this.length - (t - e) + i.length);
  }
  /**
  Append another document to this one.
  */
  append(e) {
    return this.replace(this.length, this.length, e);
  }
  /**
  Retrieve the text between the given points.
  */
  slice(e, t = this.length) {
    [e, t] = hi(this, e, t);
    let i = [];
    return this.decompose(e, t, i, 0), Je.from(i, t - e);
  }
  /**
  Test whether this text is equal to another instance.
  */
  eq(e) {
    if (e == this)
      return !0;
    if (e.length != this.length || e.lines != this.lines)
      return !1;
    let t = this.scanIdentical(e, 1), i = this.length - this.scanIdentical(e, -1), r = new Vi(this), s = new Vi(e);
    for (let o = t, l = t; ; ) {
      if (r.next(o), s.next(o), o = 0, r.lineBreak != s.lineBreak || r.done != s.done || r.value != s.value)
        return !1;
      if (l += r.value.length, r.done || l >= i)
        return !0;
    }
  }
  /**
  Iterate over the text. When `dir` is `-1`, iteration happens
  from end to start. This will return lines and the breaks between
  them as separate strings.
  */
  iter(e = 1) {
    return new Vi(this, e);
  }
  /**
  Iterate over a range of the text. When `from` > `to`, the
  iterator will run in reverse.
  */
  iterRange(e, t = this.length) {
    return new Ih(this, e, t);
  }
  /**
  Return a cursor that iterates over the given range of lines,
  _without_ returning the line breaks between, and yielding empty
  strings for empty lines.
  
  When `from` and `to` are given, they should be 1-based line numbers.
  */
  iterLines(e, t) {
    let i;
    if (e == null)
      i = this.iter();
    else {
      t == null && (t = this.lines + 1);
      let r = this.line(e).from;
      i = this.iterRange(r, Math.max(r, t == this.lines + 1 ? this.length : t <= 1 ? 0 : this.line(t - 1).to));
    }
    return new jh(i);
  }
  /**
  Return the document as a string, using newline characters to
  separate lines.
  */
  toString() {
    return this.sliceString(0);
  }
  /**
  Convert the document to an array of lines (which can be
  deserialized again via [`Text.of`](https://codemirror.net/6/docs/ref/#state.Text^of)).
  */
  toJSON() {
    let e = [];
    return this.flatten(e), e;
  }
  /**
  @internal
  */
  constructor() {
  }
  /**
  Create a `Text` instance for the given array of lines.
  */
  static of(e) {
    if (e.length == 0)
      throw new RangeError("A document must have at least one line");
    return e.length == 1 && !e[0] ? D.empty : e.length <= 32 ? new J(e) : Je.from(J.split(e, []));
  }
}
class J extends D {
  constructor(e, t = Cd(e)) {
    super(), this.text = e, this.length = t;
  }
  get lines() {
    return this.text.length;
  }
  get children() {
    return null;
  }
  lineInner(e, t, i, r) {
    for (let s = 0; ; s++) {
      let o = this.text[s], l = r + o.length;
      if ((t ? i : l) >= e)
        return new Zd(r, l, i, o);
      r = l + 1, i++;
    }
  }
  decompose(e, t, i, r) {
    let s = e <= 0 && t >= this.length ? this : new J(Tl(this.text, e, t), Math.min(t, this.length) - Math.max(0, e));
    if (r & 1) {
      let o = i.pop(), l = Wn(s.text, o.text.slice(), 0, s.length);
      if (l.length <= 32)
        i.push(new J(l, o.length + s.length));
      else {
        let a = l.length >> 1;
        i.push(new J(l.slice(0, a)), new J(l.slice(a)));
      }
    } else
      i.push(s);
  }
  replace(e, t, i) {
    if (!(i instanceof J))
      return super.replace(e, t, i);
    [e, t] = hi(this, e, t);
    let r = Wn(this.text, Wn(i.text, Tl(this.text, 0, e)), t), s = this.length + i.length - (t - e);
    return r.length <= 32 ? new J(r, s) : Je.from(J.split(r, []), s);
  }
  sliceString(e, t = this.length, i = `
`) {
    [e, t] = hi(this, e, t);
    let r = "";
    for (let s = 0, o = 0; s <= t && o < this.text.length; o++) {
      let l = this.text[o], a = s + l.length;
      s > e && o && (r += i), e < a && t > s && (r += l.slice(Math.max(0, e - s), t - s)), s = a + 1;
    }
    return r;
  }
  flatten(e) {
    for (let t of this.text)
      e.push(t);
  }
  scanIdentical() {
    return 0;
  }
  static split(e, t) {
    let i = [], r = -1;
    for (let s of e)
      i.push(s), r += s.length + 1, i.length == 32 && (t.push(new J(i, r)), i = [], r = -1);
    return r > -1 && t.push(new J(i, r)), t;
  }
}
class Je extends D {
  constructor(e, t) {
    super(), this.children = e, this.length = t, this.lines = 0;
    for (let i of e)
      this.lines += i.lines;
  }
  lineInner(e, t, i, r) {
    for (let s = 0; ; s++) {
      let o = this.children[s], l = r + o.length, a = i + o.lines - 1;
      if ((t ? a : l) >= e)
        return o.lineInner(e, t, i, r);
      r = l + 1, i = a + 1;
    }
  }
  decompose(e, t, i, r) {
    for (let s = 0, o = 0; o <= t && s < this.children.length; s++) {
      let l = this.children[s], a = o + l.length;
      if (e <= a && t >= o) {
        let h = r & ((o <= e ? 1 : 0) | (a >= t ? 2 : 0));
        o >= e && a <= t && !h ? i.push(l) : l.decompose(e - o, t - o, i, h);
      }
      o = a + 1;
    }
  }
  replace(e, t, i) {
    if ([e, t] = hi(this, e, t), i.lines < this.lines)
      for (let r = 0, s = 0; r < this.children.length; r++) {
        let o = this.children[r], l = s + o.length;
        if (e >= s && t <= l) {
          let a = o.replace(e - s, t - s, i), h = this.lines - o.lines + a.lines;
          if (a.lines < h >> 4 && a.lines > h >> 6) {
            let c = this.children.slice();
            return c[r] = a, new Je(c, this.length - (t - e) + i.length);
          }
          return super.replace(s, l, a);
        }
        s = l + 1;
      }
    return super.replace(e, t, i);
  }
  sliceString(e, t = this.length, i = `
`) {
    [e, t] = hi(this, e, t);
    let r = "";
    for (let s = 0, o = 0; s < this.children.length && o <= t; s++) {
      let l = this.children[s], a = o + l.length;
      o > e && s && (r += i), e < a && t > o && (r += l.sliceString(e - o, t - o, i)), o = a + 1;
    }
    return r;
  }
  flatten(e) {
    for (let t of this.children)
      t.flatten(e);
  }
  scanIdentical(e, t) {
    if (!(e instanceof Je))
      return 0;
    let i = 0, [r, s, o, l] = t > 0 ? [0, 0, this.children.length, e.children.length] : [this.children.length - 1, e.children.length - 1, -1, -1];
    for (; ; r += t, s += t) {
      if (r == o || s == l)
        return i;
      let a = this.children[r], h = e.children[s];
      if (a != h)
        return i + a.scanIdentical(h, t);
      i += a.length + 1;
    }
  }
  static from(e, t = e.reduce((i, r) => i + r.length + 1, -1)) {
    let i = 0;
    for (let d of e)
      i += d.lines;
    if (i < 32) {
      let d = [];
      for (let O of e)
        O.flatten(d);
      return new J(d, t);
    }
    let r = Math.max(
      32,
      i >> 5
      /* Tree.BranchShift */
    ), s = r << 1, o = r >> 1, l = [], a = 0, h = -1, c = [];
    function f(d) {
      let O;
      if (d.lines > s && d instanceof Je)
        for (let m of d.children)
          f(m);
      else d.lines > o && (a > o || !a) ? (u(), l.push(d)) : d instanceof J && a && (O = c[c.length - 1]) instanceof J && d.lines + O.lines <= 32 ? (a += d.lines, h += d.length + 1, c[c.length - 1] = new J(O.text.concat(d.text), O.length + 1 + d.length)) : (a + d.lines > r && u(), a += d.lines, h += d.length + 1, c.push(d));
    }
    function u() {
      a != 0 && (l.push(c.length == 1 ? c[0] : Je.from(c, h)), h = -1, a = c.length = 0);
    }
    for (let d of e)
      f(d);
    return u(), l.length == 1 ? l[0] : new Je(l, t);
  }
}
D.empty = /* @__PURE__ */ new J([""], 0);
function Cd(n) {
  let e = -1;
  for (let t of n)
    e += t.length + 1;
  return e;
}
function Wn(n, e, t = 0, i = 1e9) {
  for (let r = 0, s = 0, o = !0; s < n.length && r <= i; s++) {
    let l = n[s], a = r + l.length;
    a >= t && (a > i && (l = l.slice(0, i - r)), r < t && (l = l.slice(t - r)), o ? (e[e.length - 1] += l, o = !1) : e.push(l)), r = a + 1;
  }
  return e;
}
function Tl(n, e, t) {
  return Wn(n, [""], e, t);
}
class Vi {
  constructor(e, t = 1) {
    this.dir = t, this.done = !1, this.lineBreak = !1, this.value = "", this.nodes = [e], this.offsets = [t > 0 ? 1 : (e instanceof J ? e.text.length : e.children.length) << 1];
  }
  nextInner(e, t) {
    for (this.done = this.lineBreak = !1; ; ) {
      let i = this.nodes.length - 1, r = this.nodes[i], s = this.offsets[i], o = s >> 1, l = r instanceof J ? r.text.length : r.children.length;
      if (o == (t > 0 ? l : 0)) {
        if (i == 0)
          return this.done = !0, this.value = "", this;
        t > 0 && this.offsets[i - 1]++, this.nodes.pop(), this.offsets.pop();
      } else if ((s & 1) == (t > 0 ? 0 : 1)) {
        if (this.offsets[i] += t, e == 0)
          return this.lineBreak = !0, this.value = `
`, this;
        e--;
      } else if (r instanceof J) {
        let a = r.text[o + (t < 0 ? -1 : 0)];
        if (this.offsets[i] += t, a.length > Math.max(0, e))
          return this.value = e == 0 ? a : t > 0 ? a.slice(e) : a.slice(0, a.length - e), this;
        e -= a.length;
      } else {
        let a = r.children[o + (t < 0 ? -1 : 0)];
        e > a.length ? (e -= a.length, this.offsets[i] += t) : (t < 0 && this.offsets[i]--, this.nodes.push(a), this.offsets.push(t > 0 ? 1 : (a instanceof J ? a.text.length : a.children.length) << 1));
      }
    }
  }
  next(e = 0) {
    return e < 0 && (this.nextInner(-e, -this.dir), e = this.value.length), this.nextInner(e, this.dir);
  }
}
class Ih {
  constructor(e, t, i) {
    this.value = "", this.done = !1, this.cursor = new Vi(e, t > i ? -1 : 1), this.pos = t > i ? e.length : 0, this.from = Math.min(t, i), this.to = Math.max(t, i);
  }
  nextInner(e, t) {
    if (t < 0 ? this.pos <= this.from : this.pos >= this.to)
      return this.value = "", this.done = !0, this;
    e += Math.max(0, t < 0 ? this.pos - this.to : this.from - this.pos);
    let i = t < 0 ? this.pos - this.from : this.to - this.pos;
    e > i && (e = i), i -= e;
    let { value: r } = this.cursor.next(e);
    return this.pos += (r.length + e) * t, this.value = r.length <= i ? r : t < 0 ? r.slice(r.length - i) : r.slice(0, i), this.done = !this.value, this;
  }
  next(e = 0) {
    return e < 0 ? e = Math.max(e, this.from - this.pos) : e > 0 && (e = Math.min(e, this.to - this.pos)), this.nextInner(e, this.cursor.dir);
  }
  get lineBreak() {
    return this.cursor.lineBreak && this.value != "";
  }
}
class jh {
  constructor(e) {
    this.inner = e, this.afterBreak = !0, this.value = "", this.done = !1;
  }
  next(e = 0) {
    let { done: t, lineBreak: i, value: r } = this.inner.next(e);
    return t && this.afterBreak ? (this.value = "", this.afterBreak = !1) : t ? (this.done = !0, this.value = "") : i ? this.afterBreak ? this.value = "" : (this.afterBreak = !0, this.next()) : (this.value = r, this.afterBreak = !1), this;
  }
  get lineBreak() {
    return !1;
  }
}
typeof Symbol < "u" && (D.prototype[Symbol.iterator] = function() {
  return this.iter();
}, Vi.prototype[Symbol.iterator] = Ih.prototype[Symbol.iterator] = jh.prototype[Symbol.iterator] = function() {
  return this;
});
class Zd {
  /**
  @internal
  */
  constructor(e, t, i, r) {
    this.from = e, this.to = t, this.number = i, this.text = r;
  }
  /**
  The length of the line (not including any line break after it).
  */
  get length() {
    return this.to - this.from;
  }
}
function hi(n, e, t) {
  return e = Math.max(0, Math.min(n.length, e)), [e, Math.max(e, Math.min(n.length, t))];
}
function se(n, e, t = !0, i = !0) {
  return vd(n, e, t, i);
}
function Xd(n) {
  return n >= 56320 && n < 57344;
}
function Ad(n) {
  return n >= 55296 && n < 56320;
}
function Se(n, e) {
  let t = n.charCodeAt(e);
  if (!Ad(t) || e + 1 == n.length)
    return t;
  let i = n.charCodeAt(e + 1);
  return Xd(i) ? (t - 55296 << 10) + (i - 56320) + 65536 : t;
}
function Zo(n) {
  return n <= 65535 ? String.fromCharCode(n) : (n -= 65536, String.fromCharCode((n >> 10) + 55296, (n & 1023) + 56320));
}
function et(n) {
  return n < 65536 ? 1 : 2;
}
const Ms = /\r\n?|\n/;
var ce = /* @__PURE__ */ function(n) {
  return n[n.Simple = 0] = "Simple", n[n.TrackDel = 1] = "TrackDel", n[n.TrackBefore = 2] = "TrackBefore", n[n.TrackAfter = 3] = "TrackAfter", n;
}(ce || (ce = {}));
class ot {
  // Sections are encoded as pairs of integers. The first is the
  // length in the current document, and the second is -1 for
  // unaffected sections, and the length of the replacement content
  // otherwise. So an insertion would be (0, n>0), a deletion (n>0,
  // 0), and a replacement two positive numbers.
  /**
  @internal
  */
  constructor(e) {
    this.sections = e;
  }
  /**
  The length of the document before the change.
  */
  get length() {
    let e = 0;
    for (let t = 0; t < this.sections.length; t += 2)
      e += this.sections[t];
    return e;
  }
  /**
  The length of the document after the change.
  */
  get newLength() {
    let e = 0;
    for (let t = 0; t < this.sections.length; t += 2) {
      let i = this.sections[t + 1];
      e += i < 0 ? this.sections[t] : i;
    }
    return e;
  }
  /**
  False when there are actual changes in this set.
  */
  get empty() {
    return this.sections.length == 0 || this.sections.length == 2 && this.sections[1] < 0;
  }
  /**
  Iterate over the unchanged parts left by these changes. `posA`
  provides the position of the range in the old document, `posB`
  the new position in the changed document.
  */
  iterGaps(e) {
    for (let t = 0, i = 0, r = 0; t < this.sections.length; ) {
      let s = this.sections[t++], o = this.sections[t++];
      o < 0 ? (e(i, r, s), r += s) : r += o, i += s;
    }
  }
  /**
  Iterate over the ranges changed by these changes. (See
  [`ChangeSet.iterChanges`](https://codemirror.net/6/docs/ref/#state.ChangeSet.iterChanges) for a
  variant that also provides you with the inserted text.)
  `fromA`/`toA` provides the extent of the change in the starting
  document, `fromB`/`toB` the extent of the replacement in the
  changed document.
  
  When `individual` is true, adjacent changes (which are kept
  separate for [position mapping](https://codemirror.net/6/docs/ref/#state.ChangeDesc.mapPos)) are
  reported separately.
  */
  iterChangedRanges(e, t = !1) {
    Rs(this, e, t);
  }
  /**
  Get a description of the inverted form of these changes.
  */
  get invertedDesc() {
    let e = [];
    for (let t = 0; t < this.sections.length; ) {
      let i = this.sections[t++], r = this.sections[t++];
      r < 0 ? e.push(i, r) : e.push(r, i);
    }
    return new ot(e);
  }
  /**
  Compute the combined effect of applying another set of changes
  after this one. The length of the document after this set should
  match the length before `other`.
  */
  composeDesc(e) {
    return this.empty ? e : e.empty ? this : Nh(this, e);
  }
  /**
  Map this description, which should start with the same document
  as `other`, over another set of changes, so that it can be
  applied after it. When `before` is true, map as if the changes
  in `this` happened before the ones in `other`.
  */
  mapDesc(e, t = !1) {
    return e.empty ? this : zs(this, e, t);
  }
  mapPos(e, t = -1, i = ce.Simple) {
    let r = 0, s = 0;
    for (let o = 0; o < this.sections.length; ) {
      let l = this.sections[o++], a = this.sections[o++], h = r + l;
      if (a < 0) {
        if (h > e)
          return s + (e - r);
        s += l;
      } else {
        if (i != ce.Simple && h >= e && (i == ce.TrackDel && r < e && h > e || i == ce.TrackBefore && r < e || i == ce.TrackAfter && h > e))
          return null;
        if (h > e || h == e && t < 0 && !l)
          return e == r || t < 0 ? s : s + a;
        s += a;
      }
      r = h;
    }
    if (e > r)
      throw new RangeError(`Position ${e} is out of range for changeset of length ${r}`);
    return s;
  }
  /**
  Check whether these changes touch a given range. When one of the
  changes entirely covers the range, the string `"cover"` is
  returned.
  */
  touchesRange(e, t = e) {
    for (let i = 0, r = 0; i < this.sections.length && r <= t; ) {
      let s = this.sections[i++], o = this.sections[i++], l = r + s;
      if (o >= 0 && r <= t && l >= e)
        return r < e && l > t ? "cover" : !0;
      r = l;
    }
    return !1;
  }
  /**
  @internal
  */
  toString() {
    let e = "";
    for (let t = 0; t < this.sections.length; ) {
      let i = this.sections[t++], r = this.sections[t++];
      e += (e ? " " : "") + i + (r >= 0 ? ":" + r : "");
    }
    return e;
  }
  /**
  Serialize this change desc to a JSON-representable value.
  */
  toJSON() {
    return this.sections;
  }
  /**
  Create a change desc from its JSON representation (as produced
  by [`toJSON`](https://codemirror.net/6/docs/ref/#state.ChangeDesc.toJSON).
  */
  static fromJSON(e) {
    if (!Array.isArray(e) || e.length % 2 || e.some((t) => typeof t != "number"))
      throw new RangeError("Invalid JSON representation of ChangeDesc");
    return new ot(e);
  }
  /**
  @internal
  */
  static create(e) {
    return new ot(e);
  }
}
class ne extends ot {
  constructor(e, t) {
    super(e), this.inserted = t;
  }
  /**
  Apply the changes to a document, returning the modified
  document.
  */
  apply(e) {
    if (this.length != e.length)
      throw new RangeError("Applying change set to a document with the wrong length");
    return Rs(this, (t, i, r, s, o) => e = e.replace(r, r + (i - t), o), !1), e;
  }
  mapDesc(e, t = !1) {
    return zs(this, e, t, !0);
  }
  /**
  Given the document as it existed _before_ the changes, return a
  change set that represents the inverse of this set, which could
  be used to go from the document created by the changes back to
  the document as it existed before the changes.
  */
  invert(e) {
    let t = this.sections.slice(), i = [];
    for (let r = 0, s = 0; r < t.length; r += 2) {
      let o = t[r], l = t[r + 1];
      if (l >= 0) {
        t[r] = l, t[r + 1] = o;
        let a = r >> 1;
        for (; i.length < a; )
          i.push(D.empty);
        i.push(o ? e.slice(s, s + o) : D.empty);
      }
      s += o;
    }
    return new ne(t, i);
  }
  /**
  Combine two subsequent change sets into a single set. `other`
  must start in the document produced by `this`. If `this` goes
  `docA` → `docB` and `other` represents `docB` → `docC`, the
  returned value will represent the change `docA` → `docC`.
  */
  compose(e) {
    return this.empty ? e : e.empty ? this : Nh(this, e, !0);
  }
  /**
  Given another change set starting in the same document, maps this
  change set over the other, producing a new change set that can be
  applied to the document produced by applying `other`. When
  `before` is `true`, order changes as if `this` comes before
  `other`, otherwise (the default) treat `other` as coming first.
  
  Given two changes `A` and `B`, `A.compose(B.map(A))` and
  `B.compose(A.map(B, true))` will produce the same document. This
  provides a basic form of [operational
  transformation](https://en.wikipedia.org/wiki/Operational_transformation),
  and can be used for collaborative editing.
  */
  map(e, t = !1) {
    return e.empty ? this : zs(this, e, t, !0);
  }
  /**
  Iterate over the changed ranges in the document, calling `f` for
  each, with the range in the original document (`fromA`-`toA`)
  and the range that replaces it in the new document
  (`fromB`-`toB`).
  
  When `individual` is true, adjacent changes are reported
  separately.
  */
  iterChanges(e, t = !1) {
    Rs(this, e, t);
  }
  /**
  Get a [change description](https://codemirror.net/6/docs/ref/#state.ChangeDesc) for this change
  set.
  */
  get desc() {
    return ot.create(this.sections);
  }
  /**
  @internal
  */
  filter(e) {
    let t = [], i = [], r = [], s = new Li(this);
    e: for (let o = 0, l = 0; ; ) {
      let a = o == e.length ? 1e9 : e[o++];
      for (; l < a || l == a && s.len == 0; ) {
        if (s.done)
          break e;
        let c = Math.min(s.len, a - l);
        ue(r, c, -1);
        let f = s.ins == -1 ? -1 : s.off == 0 ? s.ins : 0;
        ue(t, c, f), f > 0 && wt(i, t, s.text), s.forward(c), l += c;
      }
      let h = e[o++];
      for (; l < h; ) {
        if (s.done)
          break e;
        let c = Math.min(s.len, h - l);
        ue(t, c, -1), ue(r, c, s.ins == -1 ? -1 : s.off == 0 ? s.ins : 0), s.forward(c), l += c;
      }
    }
    return {
      changes: new ne(t, i),
      filtered: ot.create(r)
    };
  }
  /**
  Serialize this change set to a JSON-representable value.
  */
  toJSON() {
    let e = [];
    for (let t = 0; t < this.sections.length; t += 2) {
      let i = this.sections[t], r = this.sections[t + 1];
      r < 0 ? e.push(i) : r == 0 ? e.push([i]) : e.push([i].concat(this.inserted[t >> 1].toJSON()));
    }
    return e;
  }
  /**
  Create a change set for the given changes, for a document of the
  given length, using `lineSep` as line separator.
  */
  static of(e, t, i) {
    let r = [], s = [], o = 0, l = null;
    function a(c = !1) {
      if (!c && !r.length)
        return;
      o < t && ue(r, t - o, -1);
      let f = new ne(r, s);
      l = l ? l.compose(f.map(l)) : f, r = [], s = [], o = 0;
    }
    function h(c) {
      if (Array.isArray(c))
        for (let f of c)
          h(f);
      else if (c instanceof ne) {
        if (c.length != t)
          throw new RangeError(`Mismatched change set length (got ${c.length}, expected ${t})`);
        a(), l = l ? l.compose(c.map(l)) : c;
      } else {
        let { from: f, to: u = f, insert: d } = c;
        if (f > u || f < 0 || u > t)
          throw new RangeError(`Invalid change range ${f} to ${u} (in doc of length ${t})`);
        let O = d ? typeof d == "string" ? D.of(d.split(i || Ms)) : d : D.empty, m = O.length;
        if (f == u && m == 0)
          return;
        f < o && a(), f > o && ue(r, f - o, -1), ue(r, u - f, m), wt(s, r, O), o = u;
      }
    }
    return h(e), a(!l), l;
  }
  /**
  Create an empty changeset of the given length.
  */
  static empty(e) {
    return new ne(e ? [e, -1] : [], []);
  }
  /**
  Create a changeset from its JSON representation (as produced by
  [`toJSON`](https://codemirror.net/6/docs/ref/#state.ChangeSet.toJSON).
  */
  static fromJSON(e) {
    if (!Array.isArray(e))
      throw new RangeError("Invalid JSON representation of ChangeSet");
    let t = [], i = [];
    for (let r = 0; r < e.length; r++) {
      let s = e[r];
      if (typeof s == "number")
        t.push(s, -1);
      else {
        if (!Array.isArray(s) || typeof s[0] != "number" || s.some((o, l) => l && typeof o != "string"))
          throw new RangeError("Invalid JSON representation of ChangeSet");
        if (s.length == 1)
          t.push(s[0], 0);
        else {
          for (; i.length < r; )
            i.push(D.empty);
          i[r] = D.of(s.slice(1)), t.push(s[0], i[r].length);
        }
      }
    }
    return new ne(t, i);
  }
  /**
  @internal
  */
  static createSet(e, t) {
    return new ne(e, t);
  }
}
function ue(n, e, t, i = !1) {
  if (e == 0 && t <= 0)
    return;
  let r = n.length - 2;
  r >= 0 && t <= 0 && t == n[r + 1] ? n[r] += e : r >= 0 && e == 0 && n[r] == 0 ? n[r + 1] += t : i ? (n[r] += e, n[r + 1] += t) : n.push(e, t);
}
function wt(n, e, t) {
  if (t.length == 0)
    return;
  let i = e.length - 2 >> 1;
  if (i < n.length)
    n[n.length - 1] = n[n.length - 1].append(t);
  else {
    for (; n.length < i; )
      n.push(D.empty);
    n.push(t);
  }
}
function Rs(n, e, t) {
  let i = n.inserted;
  for (let r = 0, s = 0, o = 0; o < n.sections.length; ) {
    let l = n.sections[o++], a = n.sections[o++];
    if (a < 0)
      r += l, s += l;
    else {
      let h = r, c = s, f = D.empty;
      for (; h += l, c += a, a && i && (f = f.append(i[o - 2 >> 1])), !(t || o == n.sections.length || n.sections[o + 1] < 0); )
        l = n.sections[o++], a = n.sections[o++];
      e(r, h, s, c, f), r = h, s = c;
    }
  }
}
function zs(n, e, t, i = !1) {
  let r = [], s = i ? [] : null, o = new Li(n), l = new Li(e);
  for (let a = -1; ; ) {
    if (o.done && l.len || l.done && o.len)
      throw new Error("Mismatched change set lengths");
    if (o.ins == -1 && l.ins == -1) {
      let h = Math.min(o.len, l.len);
      ue(r, h, -1), o.forward(h), l.forward(h);
    } else if (l.ins >= 0 && (o.ins < 0 || a == o.i || o.off == 0 && (l.len < o.len || l.len == o.len && !t))) {
      let h = l.len;
      for (ue(r, l.ins, -1); h; ) {
        let c = Math.min(o.len, h);
        o.ins >= 0 && a < o.i && o.len <= c && (ue(r, 0, o.ins), s && wt(s, r, o.text), a = o.i), o.forward(c), h -= c;
      }
      l.next();
    } else if (o.ins >= 0) {
      let h = 0, c = o.len;
      for (; c; )
        if (l.ins == -1) {
          let f = Math.min(c, l.len);
          h += f, c -= f, l.forward(f);
        } else if (l.ins == 0 && l.len < c)
          c -= l.len, l.next();
        else
          break;
      ue(r, h, a < o.i ? o.ins : 0), s && a < o.i && wt(s, r, o.text), a = o.i, o.forward(o.len - c);
    } else {
      if (o.done && l.done)
        return s ? ne.createSet(r, s) : ot.create(r);
      throw new Error("Mismatched change set lengths");
    }
  }
}
function Nh(n, e, t = !1) {
  let i = [], r = t ? [] : null, s = new Li(n), o = new Li(e);
  for (let l = !1; ; ) {
    if (s.done && o.done)
      return r ? ne.createSet(i, r) : ot.create(i);
    if (s.ins == 0)
      ue(i, s.len, 0, l), s.next();
    else if (o.len == 0 && !o.done)
      ue(i, 0, o.ins, l), r && wt(r, i, o.text), o.next();
    else {
      if (s.done || o.done)
        throw new Error("Mismatched change set lengths");
      {
        let a = Math.min(s.len2, o.len), h = i.length;
        if (s.ins == -1) {
          let c = o.ins == -1 ? -1 : o.off ? 0 : o.ins;
          ue(i, a, c, l), r && c && wt(r, i, o.text);
        } else o.ins == -1 ? (ue(i, s.off ? 0 : s.len, a, l), r && wt(r, i, s.textBit(a))) : (ue(i, s.off ? 0 : s.len, o.off ? 0 : o.ins, l), r && !o.off && wt(r, i, o.text));
        l = (s.ins > a || o.ins >= 0 && o.len > a) && (l || i.length > h), s.forward2(a), o.forward(a);
      }
    }
  }
}
class Li {
  constructor(e) {
    this.set = e, this.i = 0, this.next();
  }
  next() {
    let { sections: e } = this.set;
    this.i < e.length ? (this.len = e[this.i++], this.ins = e[this.i++]) : (this.len = 0, this.ins = -2), this.off = 0;
  }
  get done() {
    return this.ins == -2;
  }
  get len2() {
    return this.ins < 0 ? this.len : this.ins;
  }
  get text() {
    let { inserted: e } = this.set, t = this.i - 2 >> 1;
    return t >= e.length ? D.empty : e[t];
  }
  textBit(e) {
    let { inserted: t } = this.set, i = this.i - 2 >> 1;
    return i >= t.length && !e ? D.empty : t[i].slice(this.off, e == null ? void 0 : this.off + e);
  }
  forward(e) {
    e == this.len ? this.next() : (this.len -= e, this.off += e);
  }
  forward2(e) {
    this.ins == -1 ? this.forward(e) : e == this.ins ? this.next() : (this.ins -= e, this.off += e);
  }
}
class _t {
  constructor(e, t, i) {
    this.from = e, this.to = t, this.flags = i;
  }
  /**
  The anchor of the range—the side that doesn't move when you
  extend it.
  */
  get anchor() {
    return this.flags & 32 ? this.to : this.from;
  }
  /**
  The head of the range, which is moved when the range is
  [extended](https://codemirror.net/6/docs/ref/#state.SelectionRange.extend).
  */
  get head() {
    return this.flags & 32 ? this.from : this.to;
  }
  /**
  True when `anchor` and `head` are at the same position.
  */
  get empty() {
    return this.from == this.to;
  }
  /**
  If this is a cursor that is explicitly associated with the
  character on one of its sides, this returns the side. -1 means
  the character before its position, 1 the character after, and 0
  means no association.
  */
  get assoc() {
    return this.flags & 8 ? -1 : this.flags & 16 ? 1 : 0;
  }
  /**
  The bidirectional text level associated with this cursor, if
  any.
  */
  get bidiLevel() {
    let e = this.flags & 7;
    return e == 7 ? null : e;
  }
  /**
  The goal column (stored vertical offset) associated with a
  cursor. This is used to preserve the vertical position when
  [moving](https://codemirror.net/6/docs/ref/#view.EditorView.moveVertically) across
  lines of different length.
  */
  get goalColumn() {
    let e = this.flags >> 6;
    return e == 16777215 ? void 0 : e;
  }
  /**
  Map this range through a change, producing a valid range in the
  updated document.
  */
  map(e, t = -1) {
    let i, r;
    return this.empty ? i = r = e.mapPos(this.from, t) : (i = e.mapPos(this.from, 1), r = e.mapPos(this.to, -1)), i == this.from && r == this.to ? this : new _t(i, r, this.flags);
  }
  /**
  Extend this range to cover at least `from` to `to`.
  */
  extend(e, t = e) {
    if (e <= this.anchor && t >= this.anchor)
      return b.range(e, t);
    let i = Math.abs(e - this.anchor) > Math.abs(t - this.anchor) ? e : t;
    return b.range(this.anchor, i);
  }
  /**
  Compare this range to another range.
  */
  eq(e, t = !1) {
    return this.anchor == e.anchor && this.head == e.head && this.goalColumn == e.goalColumn && (!t || !this.empty || this.assoc == e.assoc);
  }
  /**
  Return a JSON-serializable object representing the range.
  */
  toJSON() {
    return { anchor: this.anchor, head: this.head };
  }
  /**
  Convert a JSON representation of a range to a `SelectionRange`
  instance.
  */
  static fromJSON(e) {
    if (!e || typeof e.anchor != "number" || typeof e.head != "number")
      throw new RangeError("Invalid JSON representation for SelectionRange");
    return b.range(e.anchor, e.head);
  }
  /**
  @internal
  */
  static create(e, t, i) {
    return new _t(e, t, i);
  }
}
class b {
  constructor(e, t) {
    this.ranges = e, this.mainIndex = t;
  }
  /**
  Map a selection through a change. Used to adjust the selection
  position for changes.
  */
  map(e, t = -1) {
    return e.empty ? this : b.create(this.ranges.map((i) => i.map(e, t)), this.mainIndex);
  }
  /**
  Compare this selection to another selection. By default, ranges
  are compared only by position. When `includeAssoc` is true,
  cursor ranges must also have the same
  [`assoc`](https://codemirror.net/6/docs/ref/#state.SelectionRange.assoc) value.
  */
  eq(e, t = !1) {
    if (this.ranges.length != e.ranges.length || this.mainIndex != e.mainIndex)
      return !1;
    for (let i = 0; i < this.ranges.length; i++)
      if (!this.ranges[i].eq(e.ranges[i], t))
        return !1;
    return !0;
  }
  /**
  Get the primary selection range. Usually, you should make sure
  your code applies to _all_ ranges, by using methods like
  [`changeByRange`](https://codemirror.net/6/docs/ref/#state.EditorState.changeByRange).
  */
  get main() {
    return this.ranges[this.mainIndex];
  }
  /**
  Make sure the selection only has one range. Returns a selection
  holding only the main range from this selection.
  */
  asSingle() {
    return this.ranges.length == 1 ? this : new b([this.main], 0);
  }
  /**
  Extend this selection with an extra range.
  */
  addRange(e, t = !0) {
    return b.create([e].concat(this.ranges), t ? 0 : this.mainIndex + 1);
  }
  /**
  Replace a given range with another range, and then normalize the
  selection to merge and sort ranges if necessary.
  */
  replaceRange(e, t = this.mainIndex) {
    let i = this.ranges.slice();
    return i[t] = e, b.create(i, this.mainIndex);
  }
  /**
  Convert this selection to an object that can be serialized to
  JSON.
  */
  toJSON() {
    return { ranges: this.ranges.map((e) => e.toJSON()), main: this.mainIndex };
  }
  /**
  Create a selection from a JSON representation.
  */
  static fromJSON(e) {
    if (!e || !Array.isArray(e.ranges) || typeof e.main != "number" || e.main >= e.ranges.length)
      throw new RangeError("Invalid JSON representation for EditorSelection");
    return new b(e.ranges.map((t) => _t.fromJSON(t)), e.main);
  }
  /**
  Create a selection holding a single range.
  */
  static single(e, t = e) {
    return new b([b.range(e, t)], 0);
  }
  /**
  Sort and merge the given set of ranges, creating a valid
  selection.
  */
  static create(e, t = 0) {
    if (e.length == 0)
      throw new RangeError("A selection needs at least one range");
    for (let i = 0, r = 0; r < e.length; r++) {
      let s = e[r];
      if (s.empty ? s.from <= i : s.from < i)
        return b.normalized(e.slice(), t);
      i = s.to;
    }
    return new b(e, t);
  }
  /**
  Create a cursor selection range at the given position. You can
  safely ignore the optional arguments in most situations.
  */
  static cursor(e, t = 0, i, r) {
    return _t.create(e, e, (t == 0 ? 0 : t < 0 ? 8 : 16) | (i == null ? 7 : Math.min(6, i)) | (r ?? 16777215) << 6);
  }
  /**
  Create a selection range.
  */
  static range(e, t, i, r) {
    let s = (i ?? 16777215) << 6 | (r == null ? 7 : Math.min(6, r));
    return t < e ? _t.create(t, e, 48 | s) : _t.create(e, t, (t > e ? 8 : 0) | s);
  }
  /**
  @internal
  */
  static normalized(e, t = 0) {
    let i = e[t];
    e.sort((r, s) => r.from - s.from), t = e.indexOf(i);
    for (let r = 1; r < e.length; r++) {
      let s = e[r], o = e[r - 1];
      if (s.empty ? s.from <= o.to : s.from < o.to) {
        let l = o.from, a = Math.max(s.to, o.to);
        r <= t && t--, e.splice(--r, 2, s.anchor > s.head ? b.range(a, l) : b.range(l, a));
      }
    }
    return new b(e, t);
  }
}
function Gh(n, e) {
  for (let t of n.ranges)
    if (t.to > e)
      throw new RangeError("Selection points outside of document");
}
let Xo = 0;
class T {
  constructor(e, t, i, r, s) {
    this.combine = e, this.compareInput = t, this.compare = i, this.isStatic = r, this.id = Xo++, this.default = e([]), this.extensions = typeof s == "function" ? s(this) : s;
  }
  /**
  Returns a facet reader for this facet, which can be used to
  [read](https://codemirror.net/6/docs/ref/#state.EditorState.facet) it but not to define values for it.
  */
  get reader() {
    return this;
  }
  /**
  Define a new facet.
  */
  static define(e = {}) {
    return new T(e.combine || ((t) => t), e.compareInput || ((t, i) => t === i), e.compare || (e.combine ? (t, i) => t === i : Ao), !!e.static, e.enables);
  }
  /**
  Returns an extension that adds the given value to this facet.
  */
  of(e) {
    return new Ln([], this, 0, e);
  }
  /**
  Create an extension that computes a value for the facet from a
  state. You must take care to declare the parts of the state that
  this value depends on, since your function is only called again
  for a new state when one of those parts changed.
  
  In cases where your value depends only on a single field, you'll
  want to use the [`from`](https://codemirror.net/6/docs/ref/#state.Facet.from) method instead.
  */
  compute(e, t) {
    if (this.isStatic)
      throw new Error("Can't compute a static facet");
    return new Ln(e, this, 1, t);
  }
  /**
  Create an extension that computes zero or more values for this
  facet from a state.
  */
  computeN(e, t) {
    if (this.isStatic)
      throw new Error("Can't compute a static facet");
    return new Ln(e, this, 2, t);
  }
  from(e, t) {
    return t || (t = (i) => i), this.compute([e], (i) => t(i.field(e)));
  }
}
function Ao(n, e) {
  return n == e || n.length == e.length && n.every((t, i) => t === e[i]);
}
class Ln {
  constructor(e, t, i, r) {
    this.dependencies = e, this.facet = t, this.type = i, this.value = r, this.id = Xo++;
  }
  dynamicSlot(e) {
    var t;
    let i = this.value, r = this.facet.compareInput, s = this.id, o = e[s] >> 1, l = this.type == 2, a = !1, h = !1, c = [];
    for (let f of this.dependencies)
      f == "doc" ? a = !0 : f == "selection" ? h = !0 : ((t = e[f.id]) !== null && t !== void 0 ? t : 1) & 1 || c.push(e[f.id]);
    return {
      create(f) {
        return f.values[o] = i(f), 1;
      },
      update(f, u) {
        if (a && u.docChanged || h && (u.docChanged || u.selection) || Ys(f, c)) {
          let d = i(f);
          if (l ? !Cl(d, f.values[o], r) : !r(d, f.values[o]))
            return f.values[o] = d, 1;
        }
        return 0;
      },
      reconfigure: (f, u) => {
        let d, O = u.config.address[s];
        if (O != null) {
          let m = tr(u, O);
          if (this.dependencies.every((g) => g instanceof T ? u.facet(g) === f.facet(g) : g instanceof oe ? u.field(g, !1) == f.field(g, !1) : !0) || (l ? Cl(d = i(f), m, r) : r(d = i(f), m)))
            return f.values[o] = m, 0;
        } else
          d = i(f);
        return f.values[o] = d, 1;
      }
    };
  }
}
function Cl(n, e, t) {
  if (n.length != e.length)
    return !1;
  for (let i = 0; i < n.length; i++)
    if (!t(n[i], e[i]))
      return !1;
  return !0;
}
function Ys(n, e) {
  let t = !1;
  for (let i of e)
    Ei(n, i) & 1 && (t = !0);
  return t;
}
function Md(n, e, t) {
  let i = t.map((a) => n[a.id]), r = t.map((a) => a.type), s = i.filter((a) => !(a & 1)), o = n[e.id] >> 1;
  function l(a) {
    let h = [];
    for (let c = 0; c < i.length; c++) {
      let f = tr(a, i[c]);
      if (r[c] == 2)
        for (let u of f)
          h.push(u);
      else
        h.push(f);
    }
    return e.combine(h);
  }
  return {
    create(a) {
      for (let h of i)
        Ei(a, h);
      return a.values[o] = l(a), 1;
    },
    update(a, h) {
      if (!Ys(a, s))
        return 0;
      let c = l(a);
      return e.compare(c, a.values[o]) ? 0 : (a.values[o] = c, 1);
    },
    reconfigure(a, h) {
      let c = Ys(a, i), f = h.config.facets[e.id], u = h.facet(e);
      if (f && !c && Ao(t, f))
        return a.values[o] = u, 0;
      let d = l(a);
      return e.compare(d, u) ? (a.values[o] = u, 0) : (a.values[o] = d, 1);
    }
  };
}
const bn = /* @__PURE__ */ T.define({ static: !0 });
class oe {
  constructor(e, t, i, r, s) {
    this.id = e, this.createF = t, this.updateF = i, this.compareF = r, this.spec = s, this.provides = void 0;
  }
  /**
  Define a state field.
  */
  static define(e) {
    let t = new oe(Xo++, e.create, e.update, e.compare || ((i, r) => i === r), e);
    return e.provide && (t.provides = e.provide(t)), t;
  }
  create(e) {
    let t = e.facet(bn).find((i) => i.field == this);
    return ((t == null ? void 0 : t.create) || this.createF)(e);
  }
  /**
  @internal
  */
  slot(e) {
    let t = e[this.id] >> 1;
    return {
      create: (i) => (i.values[t] = this.create(i), 1),
      update: (i, r) => {
        let s = i.values[t], o = this.updateF(s, r);
        return this.compareF(s, o) ? 0 : (i.values[t] = o, 1);
      },
      reconfigure: (i, r) => {
        let s = i.facet(bn), o = r.facet(bn), l;
        return (l = s.find((a) => a.field == this)) && l != o.find((a) => a.field == this) ? (i.values[t] = l.create(i), 1) : r.config.address[this.id] != null ? (i.values[t] = r.field(this), 0) : (i.values[t] = this.create(i), 1);
      }
    };
  }
  /**
  Returns an extension that enables this field and overrides the
  way it is initialized. Can be useful when you need to provide a
  non-default starting value for the field.
  */
  init(e) {
    return [this, bn.of({ field: this, create: e })];
  }
  /**
  State field instances can be used as
  [`Extension`](https://codemirror.net/6/docs/ref/#state.Extension) values to enable the field in a
  given state.
  */
  get extension() {
    return this;
  }
}
const Vt = { lowest: 4, low: 3, default: 2, high: 1, highest: 0 };
function $i(n) {
  return (e) => new Uh(e, n);
}
const At = {
  /**
  The highest precedence level, for extensions that should end up
  near the start of the precedence ordering.
  */
  highest: /* @__PURE__ */ $i(Vt.highest),
  /**
  A higher-than-default precedence, for extensions that should
  come before those with default precedence.
  */
  high: /* @__PURE__ */ $i(Vt.high),
  /**
  The default precedence, which is also used for extensions
  without an explicit precedence.
  */
  default: /* @__PURE__ */ $i(Vt.default),
  /**
  A lower-than-default precedence.
  */
  low: /* @__PURE__ */ $i(Vt.low),
  /**
  The lowest precedence level. Meant for things that should end up
  near the end of the extension order.
  */
  lowest: /* @__PURE__ */ $i(Vt.lowest)
};
class Uh {
  constructor(e, t) {
    this.inner = e, this.prec = t;
  }
}
class ci {
  /**
  Create an instance of this compartment to add to your [state
  configuration](https://codemirror.net/6/docs/ref/#state.EditorStateConfig.extensions).
  */
  of(e) {
    return new Vs(this, e);
  }
  /**
  Create an [effect](https://codemirror.net/6/docs/ref/#state.TransactionSpec.effects) that
  reconfigures this compartment.
  */
  reconfigure(e) {
    return ci.reconfigure.of({ compartment: this, extension: e });
  }
  /**
  Get the current content of the compartment in the state, or
  `undefined` if it isn't present.
  */
  get(e) {
    return e.config.compartments.get(this);
  }
}
class Vs {
  constructor(e, t) {
    this.compartment = e, this.inner = t;
  }
}
class er {
  constructor(e, t, i, r, s, o) {
    for (this.base = e, this.compartments = t, this.dynamicSlots = i, this.address = r, this.staticValues = s, this.facets = o, this.statusTemplate = []; this.statusTemplate.length < i.length; )
      this.statusTemplate.push(
        0
        /* SlotStatus.Unresolved */
      );
  }
  staticFacet(e) {
    let t = this.address[e.id];
    return t == null ? e.default : this.staticValues[t >> 1];
  }
  static resolve(e, t, i) {
    let r = [], s = /* @__PURE__ */ Object.create(null), o = /* @__PURE__ */ new Map();
    for (let u of Rd(e, t, o))
      u instanceof oe ? r.push(u) : (s[u.facet.id] || (s[u.facet.id] = [])).push(u);
    let l = /* @__PURE__ */ Object.create(null), a = [], h = [];
    for (let u of r)
      l[u.id] = h.length << 1, h.push((d) => u.slot(d));
    let c = i == null ? void 0 : i.config.facets;
    for (let u in s) {
      let d = s[u], O = d[0].facet, m = c && c[u] || [];
      if (d.every(
        (g) => g.type == 0
        /* Provider.Static */
      ))
        if (l[O.id] = a.length << 1 | 1, Ao(m, d))
          a.push(i.facet(O));
        else {
          let g = O.combine(d.map((Q) => Q.value));
          a.push(i && O.compare(g, i.facet(O)) ? i.facet(O) : g);
        }
      else {
        for (let g of d)
          g.type == 0 ? (l[g.id] = a.length << 1 | 1, a.push(g.value)) : (l[g.id] = h.length << 1, h.push((Q) => g.dynamicSlot(Q)));
        l[O.id] = h.length << 1, h.push((g) => Md(g, O, d));
      }
    }
    let f = h.map((u) => u(l));
    return new er(e, o, f, l, a, s);
  }
}
function Rd(n, e, t) {
  let i = [[], [], [], [], []], r = /* @__PURE__ */ new Map();
  function s(o, l) {
    let a = r.get(o);
    if (a != null) {
      if (a <= l)
        return;
      let h = i[a].indexOf(o);
      h > -1 && i[a].splice(h, 1), o instanceof Vs && t.delete(o.compartment);
    }
    if (r.set(o, l), Array.isArray(o))
      for (let h of o)
        s(h, l);
    else if (o instanceof Vs) {
      if (t.has(o.compartment))
        throw new RangeError("Duplicate use of compartment in extensions");
      let h = e.get(o.compartment) || o.inner;
      t.set(o.compartment, h), s(h, l);
    } else if (o instanceof Uh)
      s(o.inner, o.prec);
    else if (o instanceof oe)
      i[l].push(o), o.provides && s(o.provides, l);
    else if (o instanceof Ln)
      i[l].push(o), o.facet.extensions && s(o.facet.extensions, Vt.default);
    else {
      let h = o.extension;
      if (!h)
        throw new Error(`Unrecognized extension value in extension set (${o}). This sometimes happens because multiple instances of @codemirror/state are loaded, breaking instanceof checks.`);
      s(h, l);
    }
  }
  return s(n, Vt.default), i.reduce((o, l) => o.concat(l));
}
function Ei(n, e) {
  if (e & 1)
    return 2;
  let t = e >> 1, i = n.status[t];
  if (i == 4)
    throw new Error("Cyclic dependency between fields and/or facets");
  if (i & 2)
    return i;
  n.status[t] = 4;
  let r = n.computeSlot(n, n.config.dynamicSlots[t]);
  return n.status[t] = 2 | r;
}
function tr(n, e) {
  return e & 1 ? n.config.staticValues[e >> 1] : n.values[e >> 1];
}
const Fh = /* @__PURE__ */ T.define(), Es = /* @__PURE__ */ T.define({
  combine: (n) => n.some((e) => e),
  static: !0
}), Hh = /* @__PURE__ */ T.define({
  combine: (n) => n.length ? n[0] : void 0,
  static: !0
}), Kh = /* @__PURE__ */ T.define(), Jh = /* @__PURE__ */ T.define(), ec = /* @__PURE__ */ T.define(), tc = /* @__PURE__ */ T.define({
  combine: (n) => n.length ? n[0] : !1
});
class bt {
  /**
  @internal
  */
  constructor(e, t) {
    this.type = e, this.value = t;
  }
  /**
  Define a new type of annotation.
  */
  static define() {
    return new zd();
  }
}
class zd {
  /**
  Create an instance of this annotation.
  */
  of(e) {
    return new bt(this, e);
  }
}
class Yd {
  /**
  @internal
  */
  constructor(e) {
    this.map = e;
  }
  /**
  Create a [state effect](https://codemirror.net/6/docs/ref/#state.StateEffect) instance of this
  type.
  */
  of(e) {
    return new M(this, e);
  }
}
class M {
  /**
  @internal
  */
  constructor(e, t) {
    this.type = e, this.value = t;
  }
  /**
  Map this effect through a position mapping. Will return
  `undefined` when that ends up deleting the effect.
  */
  map(e) {
    let t = this.type.map(this.value, e);
    return t === void 0 ? void 0 : t == this.value ? this : new M(this.type, t);
  }
  /**
  Tells you whether this effect object is of a given
  [type](https://codemirror.net/6/docs/ref/#state.StateEffectType).
  */
  is(e) {
    return this.type == e;
  }
  /**
  Define a new effect type. The type parameter indicates the type
  of values that his effect holds. It should be a type that
  doesn't include `undefined`, since that is used in
  [mapping](https://codemirror.net/6/docs/ref/#state.StateEffect.map) to indicate that an effect is
  removed.
  */
  static define(e = {}) {
    return new Yd(e.map || ((t) => t));
  }
  /**
  Map an array of effects through a change set.
  */
  static mapEffects(e, t) {
    if (!e.length)
      return e;
    let i = [];
    for (let r of e) {
      let s = r.map(t);
      s && i.push(s);
    }
    return i;
  }
}
M.reconfigure = /* @__PURE__ */ M.define();
M.appendConfig = /* @__PURE__ */ M.define();
class te {
  constructor(e, t, i, r, s, o) {
    this.startState = e, this.changes = t, this.selection = i, this.effects = r, this.annotations = s, this.scrollIntoView = o, this._doc = null, this._state = null, i && Gh(i, t.newLength), s.some((l) => l.type == te.time) || (this.annotations = s.concat(te.time.of(Date.now())));
  }
  /**
  @internal
  */
  static create(e, t, i, r, s, o) {
    return new te(e, t, i, r, s, o);
  }
  /**
  The new document produced by the transaction. Contrary to
  [`.state`](https://codemirror.net/6/docs/ref/#state.Transaction.state)`.doc`, accessing this won't
  force the entire new state to be computed right away, so it is
  recommended that [transaction
  filters](https://codemirror.net/6/docs/ref/#state.EditorState^transactionFilter) use this getter
  when they need to look at the new document.
  */
  get newDoc() {
    return this._doc || (this._doc = this.changes.apply(this.startState.doc));
  }
  /**
  The new selection produced by the transaction. If
  [`this.selection`](https://codemirror.net/6/docs/ref/#state.Transaction.selection) is undefined,
  this will [map](https://codemirror.net/6/docs/ref/#state.EditorSelection.map) the start state's
  current selection through the changes made by the transaction.
  */
  get newSelection() {
    return this.selection || this.startState.selection.map(this.changes);
  }
  /**
  The new state created by the transaction. Computed on demand
  (but retained for subsequent access), so it is recommended not to
  access it in [transaction
  filters](https://codemirror.net/6/docs/ref/#state.EditorState^transactionFilter) when possible.
  */
  get state() {
    return this._state || this.startState.applyTransaction(this), this._state;
  }
  /**
  Get the value of the given annotation type, if any.
  */
  annotation(e) {
    for (let t of this.annotations)
      if (t.type == e)
        return t.value;
  }
  /**
  Indicates whether the transaction changed the document.
  */
  get docChanged() {
    return !this.changes.empty;
  }
  /**
  Indicates whether this transaction reconfigures the state
  (through a [configuration compartment](https://codemirror.net/6/docs/ref/#state.Compartment) or
  with a top-level configuration
  [effect](https://codemirror.net/6/docs/ref/#state.StateEffect^reconfigure).
  */
  get reconfigured() {
    return this.startState.config != this.state.config;
  }
  /**
  Returns true if the transaction has a [user
  event](https://codemirror.net/6/docs/ref/#state.Transaction^userEvent) annotation that is equal to
  or more specific than `event`. For example, if the transaction
  has `"select.pointer"` as user event, `"select"` and
  `"select.pointer"` will match it.
  */
  isUserEvent(e) {
    let t = this.annotation(te.userEvent);
    return !!(t && (t == e || t.length > e.length && t.slice(0, e.length) == e && t[e.length] == "."));
  }
}
te.time = /* @__PURE__ */ bt.define();
te.userEvent = /* @__PURE__ */ bt.define();
te.addToHistory = /* @__PURE__ */ bt.define();
te.remote = /* @__PURE__ */ bt.define();
function Vd(n, e) {
  let t = [];
  for (let i = 0, r = 0; ; ) {
    let s, o;
    if (i < n.length && (r == e.length || e[r] >= n[i]))
      s = n[i++], o = n[i++];
    else if (r < e.length)
      s = e[r++], o = e[r++];
    else
      return t;
    !t.length || t[t.length - 1] < s ? t.push(s, o) : t[t.length - 1] < o && (t[t.length - 1] = o);
  }
}
function ic(n, e, t) {
  var i;
  let r, s, o;
  return t ? (r = e.changes, s = ne.empty(e.changes.length), o = n.changes.compose(e.changes)) : (r = e.changes.map(n.changes), s = n.changes.mapDesc(e.changes, !0), o = n.changes.compose(r)), {
    changes: o,
    selection: e.selection ? e.selection.map(s) : (i = n.selection) === null || i === void 0 ? void 0 : i.map(r),
    effects: M.mapEffects(n.effects, r).concat(M.mapEffects(e.effects, s)),
    annotations: n.annotations.length ? n.annotations.concat(e.annotations) : e.annotations,
    scrollIntoView: n.scrollIntoView || e.scrollIntoView
  };
}
function _s(n, e, t) {
  let i = e.selection, r = ti(e.annotations);
  return e.userEvent && (r = r.concat(te.userEvent.of(e.userEvent))), {
    changes: e.changes instanceof ne ? e.changes : ne.of(e.changes || [], t, n.facet(Hh)),
    selection: i && (i instanceof b ? i : b.single(i.anchor, i.head)),
    effects: ti(e.effects),
    annotations: r,
    scrollIntoView: !!e.scrollIntoView
  };
}
function nc(n, e, t) {
  let i = _s(n, e.length ? e[0] : {}, n.doc.length);
  e.length && e[0].filter === !1 && (t = !1);
  for (let s = 1; s < e.length; s++) {
    e[s].filter === !1 && (t = !1);
    let o = !!e[s].sequential;
    i = ic(i, _s(n, e[s], o ? i.changes.newLength : n.doc.length), o);
  }
  let r = te.create(n, i.changes, i.selection, i.effects, i.annotations, i.scrollIntoView);
  return _d(t ? Ed(r) : r);
}
function Ed(n) {
  let e = n.startState, t = !0;
  for (let r of e.facet(Kh)) {
    let s = r(n);
    if (s === !1) {
      t = !1;
      break;
    }
    Array.isArray(s) && (t = t === !0 ? s : Vd(t, s));
  }
  if (t !== !0) {
    let r, s;
    if (t === !1)
      s = n.changes.invertedDesc, r = ne.empty(e.doc.length);
    else {
      let o = n.changes.filter(t);
      r = o.changes, s = o.filtered.mapDesc(o.changes).invertedDesc;
    }
    n = te.create(e, r, n.selection && n.selection.map(s), M.mapEffects(n.effects, s), n.annotations, n.scrollIntoView);
  }
  let i = e.facet(Jh);
  for (let r = i.length - 1; r >= 0; r--) {
    let s = i[r](n);
    s instanceof te ? n = s : Array.isArray(s) && s.length == 1 && s[0] instanceof te ? n = s[0] : n = nc(e, ti(s), !1);
  }
  return n;
}
function _d(n) {
  let e = n.startState, t = e.facet(ec), i = n;
  for (let r = t.length - 1; r >= 0; r--) {
    let s = t[r](n);
    s && Object.keys(s).length && (i = ic(i, _s(e, s, n.changes.newLength), !0));
  }
  return i == n ? n : te.create(e, n.changes, n.selection, i.effects, i.annotations, i.scrollIntoView);
}
const Dd = [];
function ti(n) {
  return n == null ? Dd : Array.isArray(n) ? n : [n];
}
var F = /* @__PURE__ */ function(n) {
  return n[n.Word = 0] = "Word", n[n.Space = 1] = "Space", n[n.Other = 2] = "Other", n;
}(F || (F = {}));
const qd = /[\u00df\u0587\u0590-\u05f4\u0600-\u06ff\u3040-\u309f\u30a0-\u30ff\u3400-\u4db5\u4e00-\u9fcc\uac00-\ud7af]/;
let Ds;
try {
  Ds = /* @__PURE__ */ new RegExp("[\\p{Alphabetic}\\p{Number}_]", "u");
} catch {
}
function Wd(n) {
  if (Ds)
    return Ds.test(n);
  for (let e = 0; e < n.length; e++) {
    let t = n[e];
    if (/\w/.test(t) || t > "" && (t.toUpperCase() != t.toLowerCase() || qd.test(t)))
      return !0;
  }
  return !1;
}
function Ld(n) {
  return (e) => {
    if (!/\S/.test(e))
      return F.Space;
    if (Wd(e))
      return F.Word;
    for (let t = 0; t < n.length; t++)
      if (e.indexOf(n[t]) > -1)
        return F.Word;
    return F.Other;
  };
}
class _ {
  constructor(e, t, i, r, s, o) {
    this.config = e, this.doc = t, this.selection = i, this.values = r, this.status = e.statusTemplate.slice(), this.computeSlot = s, o && (o._state = this);
    for (let l = 0; l < this.config.dynamicSlots.length; l++)
      Ei(this, l << 1);
    this.computeSlot = null;
  }
  field(e, t = !0) {
    let i = this.config.address[e.id];
    if (i == null) {
      if (t)
        throw new RangeError("Field is not present in this state");
      return;
    }
    return Ei(this, i), tr(this, i);
  }
  /**
  Create a [transaction](https://codemirror.net/6/docs/ref/#state.Transaction) that updates this
  state. Any number of [transaction specs](https://codemirror.net/6/docs/ref/#state.TransactionSpec)
  can be passed. Unless
  [`sequential`](https://codemirror.net/6/docs/ref/#state.TransactionSpec.sequential) is set, the
  [changes](https://codemirror.net/6/docs/ref/#state.TransactionSpec.changes) (if any) of each spec
  are assumed to start in the _current_ document (not the document
  produced by previous specs), and its
  [selection](https://codemirror.net/6/docs/ref/#state.TransactionSpec.selection) and
  [effects](https://codemirror.net/6/docs/ref/#state.TransactionSpec.effects) are assumed to refer
  to the document created by its _own_ changes. The resulting
  transaction contains the combined effect of all the different
  specs. For [selection](https://codemirror.net/6/docs/ref/#state.TransactionSpec.selection), later
  specs take precedence over earlier ones.
  */
  update(...e) {
    return nc(this, e, !0);
  }
  /**
  @internal
  */
  applyTransaction(e) {
    let t = this.config, { base: i, compartments: r } = t;
    for (let l of e.effects)
      l.is(ci.reconfigure) ? (t && (r = /* @__PURE__ */ new Map(), t.compartments.forEach((a, h) => r.set(h, a)), t = null), r.set(l.value.compartment, l.value.extension)) : l.is(M.reconfigure) ? (t = null, i = l.value) : l.is(M.appendConfig) && (t = null, i = ti(i).concat(l.value));
    let s;
    t ? s = e.startState.values.slice() : (t = er.resolve(i, r, this), s = new _(t, this.doc, this.selection, t.dynamicSlots.map(() => null), (a, h) => h.reconfigure(a, this), null).values);
    let o = e.startState.facet(Es) ? e.newSelection : e.newSelection.asSingle();
    new _(t, e.newDoc, o, s, (l, a) => a.update(l, e), e);
  }
  /**
  Create a [transaction spec](https://codemirror.net/6/docs/ref/#state.TransactionSpec) that
  replaces every selection range with the given content.
  */
  replaceSelection(e) {
    return typeof e == "string" && (e = this.toText(e)), this.changeByRange((t) => ({
      changes: { from: t.from, to: t.to, insert: e },
      range: b.cursor(t.from + e.length)
    }));
  }
  /**
  Create a set of changes and a new selection by running the given
  function for each range in the active selection. The function
  can return an optional set of changes (in the coordinate space
  of the start document), plus an updated range (in the coordinate
  space of the document produced by the call's own changes). This
  method will merge all the changes and ranges into a single
  changeset and selection, and return it as a [transaction
  spec](https://codemirror.net/6/docs/ref/#state.TransactionSpec), which can be passed to
  [`update`](https://codemirror.net/6/docs/ref/#state.EditorState.update).
  */
  changeByRange(e) {
    let t = this.selection, i = e(t.ranges[0]), r = this.changes(i.changes), s = [i.range], o = ti(i.effects);
    for (let l = 1; l < t.ranges.length; l++) {
      let a = e(t.ranges[l]), h = this.changes(a.changes), c = h.map(r);
      for (let u = 0; u < l; u++)
        s[u] = s[u].map(c);
      let f = r.mapDesc(h, !0);
      s.push(a.range.map(f)), r = r.compose(c), o = M.mapEffects(o, c).concat(M.mapEffects(ti(a.effects), f));
    }
    return {
      changes: r,
      selection: b.create(s, t.mainIndex),
      effects: o
    };
  }
  /**
  Create a [change set](https://codemirror.net/6/docs/ref/#state.ChangeSet) from the given change
  description, taking the state's document length and line
  separator into account.
  */
  changes(e = []) {
    return e instanceof ne ? e : ne.of(e, this.doc.length, this.facet(_.lineSeparator));
  }
  /**
  Using the state's [line
  separator](https://codemirror.net/6/docs/ref/#state.EditorState^lineSeparator), create a
  [`Text`](https://codemirror.net/6/docs/ref/#state.Text) instance from the given string.
  */
  toText(e) {
    return D.of(e.split(this.facet(_.lineSeparator) || Ms));
  }
  /**
  Return the given range of the document as a string.
  */
  sliceDoc(e = 0, t = this.doc.length) {
    return this.doc.sliceString(e, t, this.lineBreak);
  }
  /**
  Get the value of a state [facet](https://codemirror.net/6/docs/ref/#state.Facet).
  */
  facet(e) {
    let t = this.config.address[e.id];
    return t == null ? e.default : (Ei(this, t), tr(this, t));
  }
  /**
  Convert this state to a JSON-serializable object. When custom
  fields should be serialized, you can pass them in as an object
  mapping property names (in the resulting object, which should
  not use `doc` or `selection`) to fields.
  */
  toJSON(e) {
    let t = {
      doc: this.sliceDoc(),
      selection: this.selection.toJSON()
    };
    if (e)
      for (let i in e) {
        let r = e[i];
        r instanceof oe && this.config.address[r.id] != null && (t[i] = r.spec.toJSON(this.field(e[i]), this));
      }
    return t;
  }
  /**
  Deserialize a state from its JSON representation. When custom
  fields should be deserialized, pass the same object you passed
  to [`toJSON`](https://codemirror.net/6/docs/ref/#state.EditorState.toJSON) when serializing as
  third argument.
  */
  static fromJSON(e, t = {}, i) {
    if (!e || typeof e.doc != "string")
      throw new RangeError("Invalid JSON representation for EditorState");
    let r = [];
    if (i) {
      for (let s in i)
        if (Object.prototype.hasOwnProperty.call(e, s)) {
          let o = i[s], l = e[s];
          r.push(o.init((a) => o.spec.fromJSON(l, a)));
        }
    }
    return _.create({
      doc: e.doc,
      selection: b.fromJSON(e.selection),
      extensions: t.extensions ? r.concat([t.extensions]) : r
    });
  }
  /**
  Create a new state. You'll usually only need this when
  initializing an editor—updated states are created by applying
  transactions.
  */
  static create(e = {}) {
    let t = er.resolve(e.extensions || [], /* @__PURE__ */ new Map()), i = e.doc instanceof D ? e.doc : D.of((e.doc || "").split(t.staticFacet(_.lineSeparator) || Ms)), r = e.selection ? e.selection instanceof b ? e.selection : b.single(e.selection.anchor, e.selection.head) : b.single(0);
    return Gh(r, i.length), t.staticFacet(Es) || (r = r.asSingle()), new _(t, i, r, t.dynamicSlots.map(() => null), (s, o) => o.create(s), null);
  }
  /**
  The size (in columns) of a tab in the document, determined by
  the [`tabSize`](https://codemirror.net/6/docs/ref/#state.EditorState^tabSize) facet.
  */
  get tabSize() {
    return this.facet(_.tabSize);
  }
  /**
  Get the proper [line-break](https://codemirror.net/6/docs/ref/#state.EditorState^lineSeparator)
  string for this state.
  */
  get lineBreak() {
    return this.facet(_.lineSeparator) || `
`;
  }
  /**
  Returns true when the editor is
  [configured](https://codemirror.net/6/docs/ref/#state.EditorState^readOnly) to be read-only.
  */
  get readOnly() {
    return this.facet(tc);
  }
  /**
  Look up a translation for the given phrase (via the
  [`phrases`](https://codemirror.net/6/docs/ref/#state.EditorState^phrases) facet), or return the
  original string if no translation is found.
  
  If additional arguments are passed, they will be inserted in
  place of markers like `$1` (for the first value) and `$2`, etc.
  A single `$` is equivalent to `$1`, and `$$` will produce a
  literal dollar sign.
  */
  phrase(e, ...t) {
    for (let i of this.facet(_.phrases))
      if (Object.prototype.hasOwnProperty.call(i, e)) {
        e = i[e];
        break;
      }
    return t.length && (e = e.replace(/\$(\$|\d*)/g, (i, r) => {
      if (r == "$")
        return "$";
      let s = +(r || 1);
      return !s || s > t.length ? i : t[s - 1];
    })), e;
  }
  /**
  Find the values for a given language data field, provided by the
  the [`languageData`](https://codemirror.net/6/docs/ref/#state.EditorState^languageData) facet.
  
  Examples of language data fields are...
  
  - [`"commentTokens"`](https://codemirror.net/6/docs/ref/#commands.CommentTokens) for specifying
    comment syntax.
  - [`"autocomplete"`](https://codemirror.net/6/docs/ref/#autocomplete.autocompletion^config.override)
    for providing language-specific completion sources.
  - [`"wordChars"`](https://codemirror.net/6/docs/ref/#state.EditorState.charCategorizer) for adding
    characters that should be considered part of words in this
    language.
  - [`"closeBrackets"`](https://codemirror.net/6/docs/ref/#autocomplete.CloseBracketConfig) controls
    bracket closing behavior.
  */
  languageDataAt(e, t, i = -1) {
    let r = [];
    for (let s of this.facet(Fh))
      for (let o of s(this, t, i))
        Object.prototype.hasOwnProperty.call(o, e) && r.push(o[e]);
    return r;
  }
  /**
  Return a function that can categorize strings (expected to
  represent a single [grapheme cluster](https://codemirror.net/6/docs/ref/#state.findClusterBreak))
  into one of:
  
   - Word (contains an alphanumeric character or a character
     explicitly listed in the local language's `"wordChars"`
     language data, which should be a string)
   - Space (contains only whitespace)
   - Other (anything else)
  */
  charCategorizer(e) {
    let t = this.languageDataAt("wordChars", e);
    return Ld(t.length ? t[0] : "");
  }
  /**
  Find the word at the given position, meaning the range
  containing all [word](https://codemirror.net/6/docs/ref/#state.CharCategory.Word) characters
  around it. If no word characters are adjacent to the position,
  this returns null.
  */
  wordAt(e) {
    let { text: t, from: i, length: r } = this.doc.lineAt(e), s = this.charCategorizer(e), o = e - i, l = e - i;
    for (; o > 0; ) {
      let a = se(t, o, !1);
      if (s(t.slice(a, o)) != F.Word)
        break;
      o = a;
    }
    for (; l < r; ) {
      let a = se(t, l);
      if (s(t.slice(l, a)) != F.Word)
        break;
      l = a;
    }
    return o == l ? null : b.range(o + i, l + i);
  }
}
_.allowMultipleSelections = Es;
_.tabSize = /* @__PURE__ */ T.define({
  combine: (n) => n.length ? n[0] : 4
});
_.lineSeparator = Hh;
_.readOnly = tc;
_.phrases = /* @__PURE__ */ T.define({
  compare(n, e) {
    let t = Object.keys(n), i = Object.keys(e);
    return t.length == i.length && t.every((r) => n[r] == e[r]);
  }
});
_.languageData = Fh;
_.changeFilter = Kh;
_.transactionFilter = Jh;
_.transactionExtender = ec;
ci.reconfigure = /* @__PURE__ */ M.define();
function at(n, e, t = {}) {
  let i = {};
  for (let r of n)
    for (let s of Object.keys(r)) {
      let o = r[s], l = i[s];
      if (l === void 0)
        i[s] = o;
      else if (!(l === o || o === void 0)) if (Object.hasOwnProperty.call(t, s))
        i[s] = t[s](l, o);
      else
        throw new Error("Config merge conflict for field " + s);
    }
  for (let r in e)
    i[r] === void 0 && (i[r] = e[r]);
  return i;
}
class $t {
  /**
  Compare this value with another value. Used when comparing
  rangesets. The default implementation compares by identity.
  Unless you are only creating a fixed number of unique instances
  of your value type, it is a good idea to implement this
  properly.
  */
  eq(e) {
    return this == e;
  }
  /**
  Create a [range](https://codemirror.net/6/docs/ref/#state.Range) with this value.
  */
  range(e, t = e) {
    return qs.create(e, t, this);
  }
}
$t.prototype.startSide = $t.prototype.endSide = 0;
$t.prototype.point = !1;
$t.prototype.mapMode = ce.TrackDel;
function Mo(n, e) {
  return n == e || n.constructor == e.constructor && n.eq(e);
}
let qs = class rc {
  constructor(e, t, i) {
    this.from = e, this.to = t, this.value = i;
  }
  /**
  @internal
  */
  static create(e, t, i) {
    return new rc(e, t, i);
  }
};
function Ws(n, e) {
  return n.from - e.from || n.value.startSide - e.value.startSide;
}
class Ro {
  constructor(e, t, i, r) {
    this.from = e, this.to = t, this.value = i, this.maxPoint = r;
  }
  get length() {
    return this.to[this.to.length - 1];
  }
  // Find the index of the given position and side. Use the ranges'
  // `from` pos when `end == false`, `to` when `end == true`.
  findIndex(e, t, i, r = 0) {
    let s = i ? this.to : this.from;
    for (let o = r, l = s.length; ; ) {
      if (o == l)
        return o;
      let a = o + l >> 1, h = s[a] - e || (i ? this.value[a].endSide : this.value[a].startSide) - t;
      if (a == o)
        return h >= 0 ? o : l;
      h >= 0 ? l = a : o = a + 1;
    }
  }
  between(e, t, i, r) {
    for (let s = this.findIndex(t, -1e9, !0), o = this.findIndex(i, 1e9, !1, s); s < o; s++)
      if (r(this.from[s] + e, this.to[s] + e, this.value[s]) === !1)
        return !1;
  }
  map(e, t) {
    let i = [], r = [], s = [], o = -1, l = -1;
    for (let a = 0; a < this.value.length; a++) {
      let h = this.value[a], c = this.from[a] + e, f = this.to[a] + e, u, d;
      if (c == f) {
        let O = t.mapPos(c, h.startSide, h.mapMode);
        if (O == null || (u = d = O, h.startSide != h.endSide && (d = t.mapPos(c, h.endSide), d < u)))
          continue;
      } else if (u = t.mapPos(c, h.startSide), d = t.mapPos(f, h.endSide), u > d || u == d && h.startSide > 0 && h.endSide <= 0)
        continue;
      (d - u || h.endSide - h.startSide) < 0 || (o < 0 && (o = u), h.point && (l = Math.max(l, d - u)), i.push(h), r.push(u - o), s.push(d - o));
    }
    return { mapped: i.length ? new Ro(r, s, i, l) : null, pos: o };
  }
}
class E {
  constructor(e, t, i, r) {
    this.chunkPos = e, this.chunk = t, this.nextLayer = i, this.maxPoint = r;
  }
  /**
  @internal
  */
  static create(e, t, i, r) {
    return new E(e, t, i, r);
  }
  /**
  @internal
  */
  get length() {
    let e = this.chunk.length - 1;
    return e < 0 ? 0 : Math.max(this.chunkEnd(e), this.nextLayer.length);
  }
  /**
  The number of ranges in the set.
  */
  get size() {
    if (this.isEmpty)
      return 0;
    let e = this.nextLayer.size;
    for (let t of this.chunk)
      e += t.value.length;
    return e;
  }
  /**
  @internal
  */
  chunkEnd(e) {
    return this.chunkPos[e] + this.chunk[e].length;
  }
  /**
  Update the range set, optionally adding new ranges or filtering
  out existing ones.
  
  (Note: The type parameter is just there as a kludge to work
  around TypeScript variance issues that prevented `RangeSet<X>`
  from being a subtype of `RangeSet<Y>` when `X` is a subtype of
  `Y`.)
  */
  update(e) {
    let { add: t = [], sort: i = !1, filterFrom: r = 0, filterTo: s = this.length } = e, o = e.filter;
    if (t.length == 0 && !o)
      return this;
    if (i && (t = t.slice().sort(Ws)), this.isEmpty)
      return t.length ? E.of(t) : this;
    let l = new sc(this, null, -1).goto(0), a = 0, h = [], c = new mt();
    for (; l.value || a < t.length; )
      if (a < t.length && (l.from - t[a].from || l.startSide - t[a].value.startSide) >= 0) {
        let f = t[a++];
        c.addInner(f.from, f.to, f.value) || h.push(f);
      } else l.rangeIndex == 1 && l.chunkIndex < this.chunk.length && (a == t.length || this.chunkEnd(l.chunkIndex) < t[a].from) && (!o || r > this.chunkEnd(l.chunkIndex) || s < this.chunkPos[l.chunkIndex]) && c.addChunk(this.chunkPos[l.chunkIndex], this.chunk[l.chunkIndex]) ? l.nextChunk() : ((!o || r > l.to || s < l.from || o(l.from, l.to, l.value)) && (c.addInner(l.from, l.to, l.value) || h.push(qs.create(l.from, l.to, l.value))), l.next());
    return c.finishInner(this.nextLayer.isEmpty && !h.length ? E.empty : this.nextLayer.update({ add: h, filter: o, filterFrom: r, filterTo: s }));
  }
  /**
  Map this range set through a set of changes, return the new set.
  */
  map(e) {
    if (e.empty || this.isEmpty)
      return this;
    let t = [], i = [], r = -1;
    for (let o = 0; o < this.chunk.length; o++) {
      let l = this.chunkPos[o], a = this.chunk[o], h = e.touchesRange(l, l + a.length);
      if (h === !1)
        r = Math.max(r, a.maxPoint), t.push(a), i.push(e.mapPos(l));
      else if (h === !0) {
        let { mapped: c, pos: f } = a.map(l, e);
        c && (r = Math.max(r, c.maxPoint), t.push(c), i.push(f));
      }
    }
    let s = this.nextLayer.map(e);
    return t.length == 0 ? s : new E(i, t, s || E.empty, r);
  }
  /**
  Iterate over the ranges that touch the region `from` to `to`,
  calling `f` for each. There is no guarantee that the ranges will
  be reported in any specific order. When the callback returns
  `false`, iteration stops.
  */
  between(e, t, i) {
    if (!this.isEmpty) {
      for (let r = 0; r < this.chunk.length; r++) {
        let s = this.chunkPos[r], o = this.chunk[r];
        if (t >= s && e <= s + o.length && o.between(s, e - s, t - s, i) === !1)
          return;
      }
      this.nextLayer.between(e, t, i);
    }
  }
  /**
  Iterate over the ranges in this set, in order, including all
  ranges that end at or after `from`.
  */
  iter(e = 0) {
    return Bi.from([this]).goto(e);
  }
  /**
  @internal
  */
  get isEmpty() {
    return this.nextLayer == this;
  }
  /**
  Iterate over the ranges in a collection of sets, in order,
  starting from `from`.
  */
  static iter(e, t = 0) {
    return Bi.from(e).goto(t);
  }
  /**
  Iterate over two groups of sets, calling methods on `comparator`
  to notify it of possible differences.
  */
  static compare(e, t, i, r, s = -1) {
    let o = e.filter((f) => f.maxPoint > 0 || !f.isEmpty && f.maxPoint >= s), l = t.filter((f) => f.maxPoint > 0 || !f.isEmpty && f.maxPoint >= s), a = Zl(o, l, i), h = new Pi(o, a, s), c = new Pi(l, a, s);
    i.iterGaps((f, u, d) => Xl(h, f, c, u, d, r)), i.empty && i.length == 0 && Xl(h, 0, c, 0, 0, r);
  }
  /**
  Compare the contents of two groups of range sets, returning true
  if they are equivalent in the given range.
  */
  static eq(e, t, i = 0, r) {
    r == null && (r = 999999999);
    let s = e.filter((c) => !c.isEmpty && t.indexOf(c) < 0), o = t.filter((c) => !c.isEmpty && e.indexOf(c) < 0);
    if (s.length != o.length)
      return !1;
    if (!s.length)
      return !0;
    let l = Zl(s, o), a = new Pi(s, l, 0).goto(i), h = new Pi(o, l, 0).goto(i);
    for (; ; ) {
      if (a.to != h.to || !Ls(a.active, h.active) || a.point && (!h.point || !Mo(a.point, h.point)))
        return !1;
      if (a.to > r)
        return !0;
      a.next(), h.next();
    }
  }
  /**
  Iterate over a group of range sets at the same time, notifying
  the iterator about the ranges covering every given piece of
  content. Returns the open count (see
  [`SpanIterator.span`](https://codemirror.net/6/docs/ref/#state.SpanIterator.span)) at the end
  of the iteration.
  */
  static spans(e, t, i, r, s = -1) {
    let o = new Pi(e, null, s).goto(t), l = t, a = o.openStart;
    for (; ; ) {
      let h = Math.min(o.to, i);
      if (o.point) {
        let c = o.activeForPoint(o.to), f = o.pointFrom < t ? c.length + 1 : o.point.startSide < 0 ? c.length : Math.min(c.length, a);
        r.point(l, h, o.point, c, f, o.pointRank), a = Math.min(o.openEnd(h), c.length);
      } else h > l && (r.span(l, h, o.active, a), a = o.openEnd(h));
      if (o.to > i)
        return a + (o.point && o.to > i ? 1 : 0);
      l = o.to, o.next();
    }
  }
  /**
  Create a range set for the given range or array of ranges. By
  default, this expects the ranges to be _sorted_ (by start
  position and, if two start at the same position,
  `value.startSide`). You can pass `true` as second argument to
  cause the method to sort them.
  */
  static of(e, t = !1) {
    let i = new mt();
    for (let r of e instanceof qs ? [e] : t ? Bd(e) : e)
      i.add(r.from, r.to, r.value);
    return i.finish();
  }
  /**
  Join an array of range sets into a single set.
  */
  static join(e) {
    if (!e.length)
      return E.empty;
    let t = e[e.length - 1];
    for (let i = e.length - 2; i >= 0; i--)
      for (let r = e[i]; r != E.empty; r = r.nextLayer)
        t = new E(r.chunkPos, r.chunk, t, Math.max(r.maxPoint, t.maxPoint));
    return t;
  }
}
E.empty = /* @__PURE__ */ new E([], [], null, -1);
function Bd(n) {
  if (n.length > 1)
    for (let e = n[0], t = 1; t < n.length; t++) {
      let i = n[t];
      if (Ws(e, i) > 0)
        return n.slice().sort(Ws);
      e = i;
    }
  return n;
}
E.empty.nextLayer = E.empty;
class mt {
  finishChunk(e) {
    this.chunks.push(new Ro(this.from, this.to, this.value, this.maxPoint)), this.chunkPos.push(this.chunkStart), this.chunkStart = -1, this.setMaxPoint = Math.max(this.setMaxPoint, this.maxPoint), this.maxPoint = -1, e && (this.from = [], this.to = [], this.value = []);
  }
  /**
  Create an empty builder.
  */
  constructor() {
    this.chunks = [], this.chunkPos = [], this.chunkStart = -1, this.last = null, this.lastFrom = -1e9, this.lastTo = -1e9, this.from = [], this.to = [], this.value = [], this.maxPoint = -1, this.setMaxPoint = -1, this.nextLayer = null;
  }
  /**
  Add a range. Ranges should be added in sorted (by `from` and
  `value.startSide`) order.
  */
  add(e, t, i) {
    this.addInner(e, t, i) || (this.nextLayer || (this.nextLayer = new mt())).add(e, t, i);
  }
  /**
  @internal
  */
  addInner(e, t, i) {
    let r = e - this.lastTo || i.startSide - this.last.endSide;
    if (r <= 0 && (e - this.lastFrom || i.startSide - this.last.startSide) < 0)
      throw new Error("Ranges must be added sorted by `from` position and `startSide`");
    return r < 0 ? !1 : (this.from.length == 250 && this.finishChunk(!0), this.chunkStart < 0 && (this.chunkStart = e), this.from.push(e - this.chunkStart), this.to.push(t - this.chunkStart), this.last = i, this.lastFrom = e, this.lastTo = t, this.value.push(i), i.point && (this.maxPoint = Math.max(this.maxPoint, t - e)), !0);
  }
  /**
  @internal
  */
  addChunk(e, t) {
    if ((e - this.lastTo || t.value[0].startSide - this.last.endSide) < 0)
      return !1;
    this.from.length && this.finishChunk(!0), this.setMaxPoint = Math.max(this.setMaxPoint, t.maxPoint), this.chunks.push(t), this.chunkPos.push(e);
    let i = t.value.length - 1;
    return this.last = t.value[i], this.lastFrom = t.from[i] + e, this.lastTo = t.to[i] + e, !0;
  }
  /**
  Finish the range set. Returns the new set. The builder can't be
  used anymore after this has been called.
  */
  finish() {
    return this.finishInner(E.empty);
  }
  /**
  @internal
  */
  finishInner(e) {
    if (this.from.length && this.finishChunk(!1), this.chunks.length == 0)
      return e;
    let t = E.create(this.chunkPos, this.chunks, this.nextLayer ? this.nextLayer.finishInner(e) : e, this.setMaxPoint);
    return this.from = null, t;
  }
}
function Zl(n, e, t) {
  let i = /* @__PURE__ */ new Map();
  for (let s of n)
    for (let o = 0; o < s.chunk.length; o++)
      s.chunk[o].maxPoint <= 0 && i.set(s.chunk[o], s.chunkPos[o]);
  let r = /* @__PURE__ */ new Set();
  for (let s of e)
    for (let o = 0; o < s.chunk.length; o++) {
      let l = i.get(s.chunk[o]);
      l != null && (t ? t.mapPos(l) : l) == s.chunkPos[o] && !(t != null && t.touchesRange(l, l + s.chunk[o].length)) && r.add(s.chunk[o]);
    }
  return r;
}
class sc {
  constructor(e, t, i, r = 0) {
    this.layer = e, this.skip = t, this.minPoint = i, this.rank = r;
  }
  get startSide() {
    return this.value ? this.value.startSide : 0;
  }
  get endSide() {
    return this.value ? this.value.endSide : 0;
  }
  goto(e, t = -1e9) {
    return this.chunkIndex = this.rangeIndex = 0, this.gotoInner(e, t, !1), this;
  }
  gotoInner(e, t, i) {
    for (; this.chunkIndex < this.layer.chunk.length; ) {
      let r = this.layer.chunk[this.chunkIndex];
      if (!(this.skip && this.skip.has(r) || this.layer.chunkEnd(this.chunkIndex) < e || r.maxPoint < this.minPoint))
        break;
      this.chunkIndex++, i = !1;
    }
    if (this.chunkIndex < this.layer.chunk.length) {
      let r = this.layer.chunk[this.chunkIndex].findIndex(e - this.layer.chunkPos[this.chunkIndex], t, !0);
      (!i || this.rangeIndex < r) && this.setRangeIndex(r);
    }
    this.next();
  }
  forward(e, t) {
    (this.to - e || this.endSide - t) < 0 && this.gotoInner(e, t, !0);
  }
  next() {
    for (; ; )
      if (this.chunkIndex == this.layer.chunk.length) {
        this.from = this.to = 1e9, this.value = null;
        break;
      } else {
        let e = this.layer.chunkPos[this.chunkIndex], t = this.layer.chunk[this.chunkIndex], i = e + t.from[this.rangeIndex];
        if (this.from = i, this.to = e + t.to[this.rangeIndex], this.value = t.value[this.rangeIndex], this.setRangeIndex(this.rangeIndex + 1), this.minPoint < 0 || this.value.point && this.to - this.from >= this.minPoint)
          break;
      }
  }
  setRangeIndex(e) {
    if (e == this.layer.chunk[this.chunkIndex].value.length) {
      if (this.chunkIndex++, this.skip)
        for (; this.chunkIndex < this.layer.chunk.length && this.skip.has(this.layer.chunk[this.chunkIndex]); )
          this.chunkIndex++;
      this.rangeIndex = 0;
    } else
      this.rangeIndex = e;
  }
  nextChunk() {
    this.chunkIndex++, this.rangeIndex = 0, this.next();
  }
  compare(e) {
    return this.from - e.from || this.startSide - e.startSide || this.rank - e.rank || this.to - e.to || this.endSide - e.endSide;
  }
}
class Bi {
  constructor(e) {
    this.heap = e;
  }
  static from(e, t = null, i = -1) {
    let r = [];
    for (let s = 0; s < e.length; s++)
      for (let o = e[s]; !o.isEmpty; o = o.nextLayer)
        o.maxPoint >= i && r.push(new sc(o, t, i, s));
    return r.length == 1 ? r[0] : new Bi(r);
  }
  get startSide() {
    return this.value ? this.value.startSide : 0;
  }
  goto(e, t = -1e9) {
    for (let i of this.heap)
      i.goto(e, t);
    for (let i = this.heap.length >> 1; i >= 0; i--)
      Ur(this.heap, i);
    return this.next(), this;
  }
  forward(e, t) {
    for (let i of this.heap)
      i.forward(e, t);
    for (let i = this.heap.length >> 1; i >= 0; i--)
      Ur(this.heap, i);
    (this.to - e || this.value.endSide - t) < 0 && this.next();
  }
  next() {
    if (this.heap.length == 0)
      this.from = this.to = 1e9, this.value = null, this.rank = -1;
    else {
      let e = this.heap[0];
      this.from = e.from, this.to = e.to, this.value = e.value, this.rank = e.rank, e.value && e.next(), Ur(this.heap, 0);
    }
  }
}
function Ur(n, e) {
  for (let t = n[e]; ; ) {
    let i = (e << 1) + 1;
    if (i >= n.length)
      break;
    let r = n[i];
    if (i + 1 < n.length && r.compare(n[i + 1]) >= 0 && (r = n[i + 1], i++), t.compare(r) < 0)
      break;
    n[i] = t, n[e] = r, e = i;
  }
}
class Pi {
  constructor(e, t, i) {
    this.minPoint = i, this.active = [], this.activeTo = [], this.activeRank = [], this.minActive = -1, this.point = null, this.pointFrom = 0, this.pointRank = 0, this.to = -1e9, this.endSide = 0, this.openStart = -1, this.cursor = Bi.from(e, t, i);
  }
  goto(e, t = -1e9) {
    return this.cursor.goto(e, t), this.active.length = this.activeTo.length = this.activeRank.length = 0, this.minActive = -1, this.to = e, this.endSide = t, this.openStart = -1, this.next(), this;
  }
  forward(e, t) {
    for (; this.minActive > -1 && (this.activeTo[this.minActive] - e || this.active[this.minActive].endSide - t) < 0; )
      this.removeActive(this.minActive);
    this.cursor.forward(e, t);
  }
  removeActive(e) {
    Sn(this.active, e), Sn(this.activeTo, e), Sn(this.activeRank, e), this.minActive = Al(this.active, this.activeTo);
  }
  addActive(e) {
    let t = 0, { value: i, to: r, rank: s } = this.cursor;
    for (; t < this.activeRank.length && (s - this.activeRank[t] || r - this.activeTo[t]) > 0; )
      t++;
    yn(this.active, t, i), yn(this.activeTo, t, r), yn(this.activeRank, t, s), e && yn(e, t, this.cursor.from), this.minActive = Al(this.active, this.activeTo);
  }
  // After calling this, if `this.point` != null, the next range is a
  // point. Otherwise, it's a regular range, covered by `this.active`.
  next() {
    let e = this.to, t = this.point;
    this.point = null;
    let i = this.openStart < 0 ? [] : null;
    for (; ; ) {
      let r = this.minActive;
      if (r > -1 && (this.activeTo[r] - this.cursor.from || this.active[r].endSide - this.cursor.startSide) < 0) {
        if (this.activeTo[r] > e) {
          this.to = this.activeTo[r], this.endSide = this.active[r].endSide;
          break;
        }
        this.removeActive(r), i && Sn(i, r);
      } else if (this.cursor.value)
        if (this.cursor.from > e) {
          this.to = this.cursor.from, this.endSide = this.cursor.startSide;
          break;
        } else {
          let s = this.cursor.value;
          if (!s.point)
            this.addActive(i), this.cursor.next();
          else if (t && this.cursor.to == this.to && this.cursor.from < this.cursor.to)
            this.cursor.next();
          else {
            this.point = s, this.pointFrom = this.cursor.from, this.pointRank = this.cursor.rank, this.to = this.cursor.to, this.endSide = s.endSide, this.cursor.next(), this.forward(this.to, this.endSide);
            break;
          }
        }
      else {
        this.to = this.endSide = 1e9;
        break;
      }
    }
    if (i) {
      this.openStart = 0;
      for (let r = i.length - 1; r >= 0 && i[r] < e; r--)
        this.openStart++;
    }
  }
  activeForPoint(e) {
    if (!this.active.length)
      return this.active;
    let t = [];
    for (let i = this.active.length - 1; i >= 0 && !(this.activeRank[i] < this.pointRank); i--)
      (this.activeTo[i] > e || this.activeTo[i] == e && this.active[i].endSide >= this.point.endSide) && t.push(this.active[i]);
    return t.reverse();
  }
  openEnd(e) {
    let t = 0;
    for (let i = this.activeTo.length - 1; i >= 0 && this.activeTo[i] > e; i--)
      t++;
    return t;
  }
}
function Xl(n, e, t, i, r, s) {
  n.goto(e), t.goto(i);
  let o = i + r, l = i, a = i - e, h = !!s.boundChange;
  for (let c = !1; ; ) {
    let f = n.to + a - t.to, u = f || n.endSide - t.endSide, d = u < 0 ? n.to + a : t.to, O = Math.min(d, o);
    if (n.point || t.point ? (n.point && t.point && Mo(n.point, t.point) && Ls(n.activeForPoint(n.to), t.activeForPoint(t.to)) || s.comparePoint(l, O, n.point, t.point), c = !1) : (c && s.boundChange(l), O > l && !Ls(n.active, t.active) && s.compareRange(l, O, n.active, t.active), h && O < o && (f || n.openEnd(d) != t.openEnd(d)) && (c = !0)), d > o)
      break;
    l = d, u <= 0 && n.next(), u >= 0 && t.next();
  }
}
function Ls(n, e) {
  if (n.length != e.length)
    return !1;
  for (let t = 0; t < n.length; t++)
    if (n[t] != e[t] && !Mo(n[t], e[t]))
      return !1;
  return !0;
}
function Sn(n, e) {
  for (let t = e, i = n.length - 1; t < i; t++)
    n[t] = n[t + 1];
  n.pop();
}
function yn(n, e, t) {
  for (let i = n.length - 1; i >= e; i--)
    n[i + 1] = n[i];
  n[e] = t;
}
function Al(n, e) {
  let t = -1, i = 1e9;
  for (let r = 0; r < e.length; r++)
    (e[r] - i || n[r].endSide - n[t].endSide) < 0 && (t = r, i = e[r]);
  return t;
}
function Si(n, e, t = n.length) {
  let i = 0;
  for (let r = 0; r < t && r < n.length; )
    n.charCodeAt(r) == 9 ? (i += e - i % e, r++) : (i++, r = se(n, r));
  return i;
}
function Bs(n, e, t, i) {
  for (let r = 0, s = 0; ; ) {
    if (s >= e)
      return r;
    if (r == n.length)
      break;
    s += n.charCodeAt(r) == 9 ? t - s % t : 1, r = se(n, r);
  }
  return i === !0 ? -1 : n.length;
}
const Is = "ͼ", Ml = typeof Symbol > "u" ? "__" + Is : Symbol.for(Is), js = typeof Symbol > "u" ? "__styleSet" + Math.floor(Math.random() * 1e8) : Symbol("styleSet"), Rl = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : {};
class Pt {
  // :: (Object<Style>, ?{finish: ?(string) → string})
  // Create a style module from the given spec.
  //
  // When `finish` is given, it is called on regular (non-`@`)
  // selectors (after `&` expansion) to compute the final selector.
  constructor(e, t) {
    this.rules = [];
    let { finish: i } = t || {};
    function r(o) {
      return /^@/.test(o) ? [o] : o.split(/,\s*/);
    }
    function s(o, l, a, h) {
      let c = [], f = /^@(\w+)\b/.exec(o[0]), u = f && f[1] == "keyframes";
      if (f && l == null) return a.push(o[0] + ";");
      for (let d in l) {
        let O = l[d];
        if (/&/.test(d))
          s(
            d.split(/,\s*/).map((m) => o.map((g) => m.replace(/&/, g))).reduce((m, g) => m.concat(g)),
            O,
            a
          );
        else if (O && typeof O == "object") {
          if (!f) throw new RangeError("The value of a property (" + d + ") should be a primitive value.");
          s(r(d), O, c, u);
        } else O != null && c.push(d.replace(/_.*/, "").replace(/[A-Z]/g, (m) => "-" + m.toLowerCase()) + ": " + O + ";");
      }
      (c.length || u) && a.push((i && !f && !h ? o.map(i) : o).join(", ") + " {" + c.join(" ") + "}");
    }
    for (let o in e) s(r(o), e[o], this.rules);
  }
  // :: () → string
  // Returns a string containing the module's CSS rules.
  getRules() {
    return this.rules.join(`
`);
  }
  // :: () → string
  // Generate a new unique CSS class name.
  static newName() {
    let e = Rl[Ml] || 1;
    return Rl[Ml] = e + 1, Is + e.toString(36);
  }
  // :: (union<Document, ShadowRoot>, union<[StyleModule], StyleModule>, ?{nonce: ?string})
  //
  // Mount the given set of modules in the given DOM root, which ensures
  // that the CSS rules defined by the module are available in that
  // context.
  //
  // Rules are only added to the document once per root.
  //
  // Rule order will follow the order of the modules, so that rules from
  // modules later in the array take precedence of those from earlier
  // modules. If you call this function multiple times for the same root
  // in a way that changes the order of already mounted modules, the old
  // order will be changed.
  //
  // If a Content Security Policy nonce is provided, it is added to
  // the `<style>` tag generated by the library.
  static mount(e, t, i) {
    let r = e[js], s = i && i.nonce;
    r ? s && r.setNonce(s) : r = new Id(e, s), r.mount(Array.isArray(t) ? t : [t], e);
  }
}
let zl = /* @__PURE__ */ new Map();
class Id {
  constructor(e, t) {
    let i = e.ownerDocument || e, r = i.defaultView;
    if (!e.head && e.adoptedStyleSheets && r.CSSStyleSheet) {
      let s = zl.get(i);
      if (s) return e[js] = s;
      this.sheet = new r.CSSStyleSheet(), zl.set(i, this);
    } else
      this.styleTag = i.createElement("style"), t && this.styleTag.setAttribute("nonce", t);
    this.modules = [], e[js] = this;
  }
  mount(e, t) {
    let i = this.sheet, r = 0, s = 0;
    for (let o = 0; o < e.length; o++) {
      let l = e[o], a = this.modules.indexOf(l);
      if (a < s && a > -1 && (this.modules.splice(a, 1), s--, a = -1), a == -1) {
        if (this.modules.splice(s++, 0, l), i) for (let h = 0; h < l.rules.length; h++)
          i.insertRule(l.rules[h], r++);
      } else {
        for (; s < a; ) r += this.modules[s++].rules.length;
        r += l.rules.length, s++;
      }
    }
    if (i)
      t.adoptedStyleSheets.indexOf(this.sheet) < 0 && (t.adoptedStyleSheets = [this.sheet, ...t.adoptedStyleSheets]);
    else {
      let o = "";
      for (let a = 0; a < this.modules.length; a++)
        o += this.modules[a].getRules() + `
`;
      this.styleTag.textContent = o;
      let l = t.head || t;
      this.styleTag.parentNode != l && l.insertBefore(this.styleTag, l.firstChild);
    }
  }
  setNonce(e) {
    this.styleTag && this.styleTag.getAttribute("nonce") != e && this.styleTag.setAttribute("nonce", e);
  }
}
var vt = {
  8: "Backspace",
  9: "Tab",
  10: "Enter",
  12: "NumLock",
  13: "Enter",
  16: "Shift",
  17: "Control",
  18: "Alt",
  20: "CapsLock",
  27: "Escape",
  32: " ",
  33: "PageUp",
  34: "PageDown",
  35: "End",
  36: "Home",
  37: "ArrowLeft",
  38: "ArrowUp",
  39: "ArrowRight",
  40: "ArrowDown",
  44: "PrintScreen",
  45: "Insert",
  46: "Delete",
  59: ";",
  61: "=",
  91: "Meta",
  92: "Meta",
  106: "*",
  107: "+",
  108: ",",
  109: "-",
  110: ".",
  111: "/",
  144: "NumLock",
  145: "ScrollLock",
  160: "Shift",
  161: "Shift",
  162: "Control",
  163: "Control",
  164: "Alt",
  165: "Alt",
  173: "-",
  186: ";",
  187: "=",
  188: ",",
  189: "-",
  190: ".",
  191: "/",
  192: "`",
  219: "[",
  220: "\\",
  221: "]",
  222: "'"
}, Ii = {
  48: ")",
  49: "!",
  50: "@",
  51: "#",
  52: "$",
  53: "%",
  54: "^",
  55: "&",
  56: "*",
  57: "(",
  59: ":",
  61: "+",
  173: "_",
  186: ":",
  187: "+",
  188: "<",
  189: "_",
  190: ">",
  191: "?",
  192: "~",
  219: "{",
  220: "|",
  221: "}",
  222: '"'
}, jd = typeof navigator < "u" && /Mac/.test(navigator.platform), Nd = typeof navigator < "u" && /MSIE \d|Trident\/(?:[7-9]|\d{2,})\..*rv:(\d+)/.exec(navigator.userAgent);
for (var he = 0; he < 10; he++) vt[48 + he] = vt[96 + he] = String(he);
for (var he = 1; he <= 24; he++) vt[he + 111] = "F" + he;
for (var he = 65; he <= 90; he++)
  vt[he] = String.fromCharCode(he + 32), Ii[he] = String.fromCharCode(he);
for (var Fr in vt) Ii.hasOwnProperty(Fr) || (Ii[Fr] = vt[Fr]);
function Gd(n) {
  var e = jd && n.metaKey && n.shiftKey && !n.ctrlKey && !n.altKey || Nd && n.shiftKey && n.key && n.key.length == 1 || n.key == "Unidentified", t = !e && n.key || (n.shiftKey ? Ii : vt)[n.keyCode] || n.key || "Unidentified";
  return t == "Esc" && (t = "Escape"), t == "Del" && (t = "Delete"), t == "Left" && (t = "ArrowLeft"), t == "Up" && (t = "ArrowUp"), t == "Right" && (t = "ArrowRight"), t == "Down" && (t = "ArrowDown"), t;
}
function B() {
  var n = arguments[0];
  typeof n == "string" && (n = document.createElement(n));
  var e = 1, t = arguments[1];
  if (t && typeof t == "object" && t.nodeType == null && !Array.isArray(t)) {
    for (var i in t) if (Object.prototype.hasOwnProperty.call(t, i)) {
      var r = t[i];
      typeof r == "string" ? n.setAttribute(i, r) : r != null && (n[i] = r);
    }
    e++;
  }
  for (; e < arguments.length; e++) oc(n, arguments[e]);
  return n;
}
function oc(n, e) {
  if (typeof e == "string")
    n.appendChild(document.createTextNode(e));
  else if (e != null) if (e.nodeType != null)
    n.appendChild(e);
  else if (Array.isArray(e))
    for (var t = 0; t < e.length; t++) oc(n, e[t]);
  else
    throw new RangeError("Unsupported child node: " + e);
}
let me = typeof navigator < "u" ? navigator : { userAgent: "", vendor: "", platform: "" }, Ns = typeof document < "u" ? document : { documentElement: { style: {} } };
const Gs = /* @__PURE__ */ /Edge\/(\d+)/.exec(me.userAgent), lc = /* @__PURE__ */ /MSIE \d/.test(me.userAgent), Us = /* @__PURE__ */ /Trident\/(?:[7-9]|\d{2,})\..*rv:(\d+)/.exec(me.userAgent), Ar = !!(lc || Us || Gs), Yl = !Ar && /* @__PURE__ */ /gecko\/(\d+)/i.test(me.userAgent), Hr = !Ar && /* @__PURE__ */ /Chrome\/(\d+)/.exec(me.userAgent), Ud = "webkitFontSmoothing" in Ns.documentElement.style, Fs = !Ar && /* @__PURE__ */ /Apple Computer/.test(me.vendor), Vl = Fs && (/* @__PURE__ */ /Mobile\/\w+/.test(me.userAgent) || me.maxTouchPoints > 2);
var C = {
  mac: Vl || /* @__PURE__ */ /Mac/.test(me.platform),
  windows: /* @__PURE__ */ /Win/.test(me.platform),
  linux: /* @__PURE__ */ /Linux|X11/.test(me.platform),
  ie: Ar,
  ie_version: lc ? Ns.documentMode || 6 : Us ? +Us[1] : Gs ? +Gs[1] : 0,
  gecko: Yl,
  gecko_version: Yl ? +(/* @__PURE__ */ /Firefox\/(\d+)/.exec(me.userAgent) || [0, 0])[1] : 0,
  chrome: !!Hr,
  chrome_version: Hr ? +Hr[1] : 0,
  ios: Vl,
  android: /* @__PURE__ */ /Android\b/.test(me.userAgent),
  webkit_version: Ud ? +(/* @__PURE__ */ /\bAppleWebKit\/(\d+)/.exec(me.userAgent) || [0, 0])[1] : 0,
  safari: Fs,
  safari_version: Fs ? +(/* @__PURE__ */ /\bVersion\/(\d+(\.\d+)?)/.exec(me.userAgent) || [0, 0])[1] : 0,
  tabSize: Ns.documentElement.style.tabSize != null ? "tab-size" : "-moz-tab-size"
};
function zo(n, e) {
  for (let t in n)
    t == "class" && e.class ? e.class += " " + n.class : t == "style" && e.style ? e.style += ";" + n.style : e[t] = n[t];
  return e;
}
const ir = /* @__PURE__ */ Object.create(null);
function Yo(n, e, t) {
  if (n == e)
    return !0;
  n || (n = ir), e || (e = ir);
  let i = Object.keys(n), r = Object.keys(e);
  if (i.length - 0 != r.length - 0)
    return !1;
  for (let s of i)
    if (s != t && (r.indexOf(s) == -1 || n[s] !== e[s]))
      return !1;
  return !0;
}
function Fd(n, e) {
  for (let t = n.attributes.length - 1; t >= 0; t--) {
    let i = n.attributes[t].name;
    e[i] == null && n.removeAttribute(i);
  }
  for (let t in e) {
    let i = e[t];
    t == "style" ? n.style.cssText = i : n.getAttribute(t) != i && n.setAttribute(t, i);
  }
}
function El(n, e, t) {
  let i = !1;
  if (e)
    for (let r in e)
      t && r in t || (i = !0, r == "style" ? n.style.cssText = "" : n.removeAttribute(r));
  if (t)
    for (let r in t)
      e && e[r] == t[r] || (i = !0, r == "style" ? n.style.cssText = t[r] : n.setAttribute(r, t[r]));
  return i;
}
function Hd(n) {
  let e = /* @__PURE__ */ Object.create(null);
  for (let t = 0; t < n.attributes.length; t++) {
    let i = n.attributes[t];
    e[i.name] = i.value;
  }
  return e;
}
class ht {
  /**
  Compare this instance to another instance of the same type.
  (TypeScript can't express this, but only instances of the same
  specific class will be passed to this method.) This is used to
  avoid redrawing widgets when they are replaced by a new
  decoration of the same type. The default implementation just
  returns `false`, which will cause new instances of the widget to
  always be redrawn.
  */
  eq(e) {
    return !1;
  }
  /**
  Update a DOM element created by a widget of the same type (but
  different, non-`eq` content) to reflect this widget. May return
  true to indicate that it could update, false to indicate it
  couldn't (in which case the widget will be redrawn). The default
  implementation just returns false.
  */
  updateDOM(e, t) {
    return !1;
  }
  /**
  @internal
  */
  compare(e) {
    return this == e || this.constructor == e.constructor && this.eq(e);
  }
  /**
  The estimated height this widget will have, to be used when
  estimating the height of content that hasn't been drawn. May
  return -1 to indicate you don't know. The default implementation
  returns -1.
  */
  get estimatedHeight() {
    return -1;
  }
  /**
  For inline widgets that are displayed inline (as opposed to
  `inline-block`) and introduce line breaks (through `<br>` tags
  or textual newlines), this must indicate the amount of line
  breaks they introduce. Defaults to 0.
  */
  get lineBreaks() {
    return 0;
  }
  /**
  Can be used to configure which kinds of events inside the widget
  should be ignored by the editor. The default is to ignore all
  events.
  */
  ignoreEvent(e) {
    return !0;
  }
  /**
  Override the way screen coordinates for positions at/in the
  widget are found. `pos` will be the offset into the widget, and
  `side` the side of the position that is being queried—less than
  zero for before, greater than zero for after, and zero for
  directly at that position.
  */
  coordsAt(e, t, i) {
    return null;
  }
  /**
  @internal
  */
  get isHidden() {
    return !1;
  }
  /**
  @internal
  */
  get editable() {
    return !1;
  }
  /**
  This is called when the an instance of the widget is removed
  from the editor view.
  */
  destroy(e) {
  }
}
var fe = /* @__PURE__ */ function(n) {
  return n[n.Text = 0] = "Text", n[n.WidgetBefore = 1] = "WidgetBefore", n[n.WidgetAfter = 2] = "WidgetAfter", n[n.WidgetRange = 3] = "WidgetRange", n;
}(fe || (fe = {}));
class Z extends $t {
  constructor(e, t, i, r) {
    super(), this.startSide = e, this.endSide = t, this.widget = i, this.spec = r;
  }
  /**
  @internal
  */
  get heightRelevant() {
    return !1;
  }
  /**
  Create a mark decoration, which influences the styling of the
  content in its range. Nested mark decorations will cause nested
  DOM elements to be created. Nesting order is determined by
  precedence of the [facet](https://codemirror.net/6/docs/ref/#view.EditorView^decorations), with
  the higher-precedence decorations creating the inner DOM nodes.
  Such elements are split on line boundaries and on the boundaries
  of lower-precedence decorations.
  */
  static mark(e) {
    return new an(e);
  }
  /**
  Create a widget decoration, which displays a DOM element at the
  given position.
  */
  static widget(e) {
    let t = Math.max(-1e4, Math.min(1e4, e.side || 0)), i = !!e.block;
    return t += i && !e.inlineOrder ? t > 0 ? 3e8 : -4e8 : t > 0 ? 1e8 : -1e8, new Lt(e, t, t, i, e.widget || null, !1);
  }
  /**
  Create a replace decoration which replaces the given range with
  a widget, or simply hides it.
  */
  static replace(e) {
    let t = !!e.block, i, r;
    if (e.isBlockGap)
      i = -5e8, r = 4e8;
    else {
      let { start: s, end: o } = ac(e, t);
      i = (s ? t ? -3e8 : -1 : 5e8) - 1, r = (o ? t ? 2e8 : 1 : -6e8) + 1;
    }
    return new Lt(e, i, r, t, e.widget || null, !0);
  }
  /**
  Create a line decoration, which can add DOM attributes to the
  line starting at the given position.
  */
  static line(e) {
    return new hn(e);
  }
  /**
  Build a [`DecorationSet`](https://codemirror.net/6/docs/ref/#view.DecorationSet) from the given
  decorated range or ranges. If the ranges aren't already sorted,
  pass `true` for `sort` to make the library sort them for you.
  */
  static set(e, t = !1) {
    return E.of(e, t);
  }
  /**
  @internal
  */
  hasHeight() {
    return this.widget ? this.widget.estimatedHeight > -1 : !1;
  }
}
Z.none = E.empty;
class an extends Z {
  constructor(e) {
    let { start: t, end: i } = ac(e);
    super(t ? -1 : 5e8, i ? 1 : -6e8, null, e), this.tagName = e.tagName || "span", this.attrs = e.class && e.attributes ? zo(e.attributes, { class: e.class }) : e.class ? { class: e.class } : e.attributes || ir;
  }
  eq(e) {
    return this == e || e instanceof an && this.tagName == e.tagName && Yo(this.attrs, e.attrs);
  }
  range(e, t = e) {
    if (e >= t)
      throw new RangeError("Mark decorations may not be empty");
    return super.range(e, t);
  }
}
an.prototype.point = !1;
class hn extends Z {
  constructor(e) {
    super(-2e8, -2e8, null, e);
  }
  eq(e) {
    return e instanceof hn && this.spec.class == e.spec.class && Yo(this.spec.attributes, e.spec.attributes);
  }
  range(e, t = e) {
    if (t != e)
      throw new RangeError("Line decoration ranges must be zero-length");
    return super.range(e, t);
  }
}
hn.prototype.mapMode = ce.TrackBefore;
hn.prototype.point = !0;
class Lt extends Z {
  constructor(e, t, i, r, s, o) {
    super(t, i, s, e), this.block = r, this.isReplace = o, this.mapMode = r ? t <= 0 ? ce.TrackBefore : ce.TrackAfter : ce.TrackDel;
  }
  // Only relevant when this.block == true
  get type() {
    return this.startSide != this.endSide ? fe.WidgetRange : this.startSide <= 0 ? fe.WidgetBefore : fe.WidgetAfter;
  }
  get heightRelevant() {
    return this.block || !!this.widget && (this.widget.estimatedHeight >= 5 || this.widget.lineBreaks > 0);
  }
  eq(e) {
    return e instanceof Lt && Kd(this.widget, e.widget) && this.block == e.block && this.startSide == e.startSide && this.endSide == e.endSide;
  }
  range(e, t = e) {
    if (this.isReplace && (e > t || e == t && this.startSide > 0 && this.endSide <= 0))
      throw new RangeError("Invalid range for replacement decoration");
    if (!this.isReplace && t != e)
      throw new RangeError("Widget decorations can only have zero-length ranges");
    return super.range(e, t);
  }
}
Lt.prototype.point = !0;
function ac(n, e = !1) {
  let { inclusiveStart: t, inclusiveEnd: i } = n;
  return t == null && (t = n.inclusive), i == null && (i = n.inclusive), { start: t ?? e, end: i ?? e };
}
function Kd(n, e) {
  return n == e || !!(n && e && n.compare(e));
}
function ii(n, e, t, i = 0) {
  let r = t.length - 1;
  r >= 0 && t[r] + i >= n ? t[r] = Math.max(t[r], e) : t.push(n, e);
}
class ji extends $t {
  constructor(e, t) {
    super(), this.tagName = e, this.attributes = t;
  }
  eq(e) {
    return e == this || e instanceof ji && this.tagName == e.tagName && Yo(this.attributes, e.attributes);
  }
  /**
  Create a block wrapper object with the given tag name and
  attributes.
  */
  static create(e) {
    return new ji(e.tagName, e.attributes || ir);
  }
  /**
  Create a range set from the given block wrapper ranges.
  */
  static set(e, t = !1) {
    return E.of(e, t);
  }
}
ji.prototype.startSide = ji.prototype.endSide = -1;
function Ni(n) {
  let e;
  return n.nodeType == 11 ? e = n.getSelection ? n : n.ownerDocument : e = n, e.getSelection();
}
function Hs(n, e) {
  return e ? n == e || n.contains(e.nodeType != 1 ? e.parentNode : e) : !1;
}
function _i(n, e) {
  if (!e.anchorNode)
    return !1;
  try {
    return Hs(n, e.anchorNode);
  } catch {
    return !1;
  }
}
function Bn(n) {
  return n.nodeType == 3 ? Gi(n, 0, n.nodeValue.length).getClientRects() : n.nodeType == 1 ? n.getClientRects() : [];
}
function Di(n, e, t, i) {
  return t ? _l(n, e, t, i, -1) || _l(n, e, t, i, 1) : !1;
}
function Tt(n) {
  for (var e = 0; ; e++)
    if (n = n.previousSibling, !n)
      return e;
}
function nr(n) {
  return n.nodeType == 1 && /^(DIV|P|LI|UL|OL|BLOCKQUOTE|DD|DT|H\d|SECTION|PRE)$/.test(n.nodeName);
}
function _l(n, e, t, i, r) {
  for (; ; ) {
    if (n == t && e == i)
      return !0;
    if (e == (r < 0 ? 0 : gt(n))) {
      if (n.nodeName == "DIV")
        return !1;
      let s = n.parentNode;
      if (!s || s.nodeType != 1)
        return !1;
      e = Tt(n) + (r < 0 ? 0 : 1), n = s;
    } else if (n.nodeType == 1) {
      if (n = n.childNodes[e + (r < 0 ? -1 : 0)], n.nodeType == 1 && n.contentEditable == "false")
        return !1;
      e = r < 0 ? gt(n) : 0;
    } else
      return !1;
  }
}
function gt(n) {
  return n.nodeType == 3 ? n.nodeValue.length : n.childNodes.length;
}
function rr(n, e) {
  let t = e ? n.left : n.right;
  return { left: t, right: t, top: n.top, bottom: n.bottom };
}
function Jd(n) {
  let e = n.visualViewport;
  return e ? {
    left: 0,
    right: e.width,
    top: 0,
    bottom: e.height
  } : {
    left: 0,
    right: n.innerWidth,
    top: 0,
    bottom: n.innerHeight
  };
}
function hc(n, e) {
  let t = e.width / n.offsetWidth, i = e.height / n.offsetHeight;
  return (t > 0.995 && t < 1.005 || !isFinite(t) || Math.abs(e.width - n.offsetWidth) < 1) && (t = 1), (i > 0.995 && i < 1.005 || !isFinite(i) || Math.abs(e.height - n.offsetHeight) < 1) && (i = 1), { scaleX: t, scaleY: i };
}
function eO(n, e, t, i, r, s, o, l) {
  let a = n.ownerDocument, h = a.defaultView || window;
  for (let c = n, f = !1; c && !f; )
    if (c.nodeType == 1) {
      let u, d = c == a.body, O = 1, m = 1;
      if (d)
        u = Jd(h);
      else {
        if (/^(fixed|sticky)$/.test(getComputedStyle(c).position) && (f = !0), c.scrollHeight <= c.clientHeight && c.scrollWidth <= c.clientWidth) {
          c = c.assignedSlot || c.parentNode;
          continue;
        }
        let S = c.getBoundingClientRect();
        ({ scaleX: O, scaleY: m } = hc(c, S)), u = {
          left: S.left,
          right: S.left + c.clientWidth * O,
          top: S.top,
          bottom: S.top + c.clientHeight * m
        };
      }
      let g = 0, Q = 0;
      if (r == "nearest")
        e.top < u.top ? (Q = e.top - (u.top + o), t > 0 && e.bottom > u.bottom + Q && (Q = e.bottom - u.bottom + o)) : e.bottom > u.bottom && (Q = e.bottom - u.bottom + o, t < 0 && e.top - Q < u.top && (Q = e.top - (u.top + o)));
      else {
        let S = e.bottom - e.top, y = u.bottom - u.top;
        Q = (r == "center" && S <= y ? e.top + S / 2 - y / 2 : r == "start" || r == "center" && t < 0 ? e.top - o : e.bottom - y + o) - u.top;
      }
      if (i == "nearest" ? e.left < u.left ? (g = e.left - (u.left + s), t > 0 && e.right > u.right + g && (g = e.right - u.right + s)) : e.right > u.right && (g = e.right - u.right + s, t < 0 && e.left < u.left + g && (g = e.left - (u.left + s))) : g = (i == "center" ? e.left + (e.right - e.left) / 2 - (u.right - u.left) / 2 : i == "start" == l ? e.left - s : e.right - (u.right - u.left) + s) - u.left, g || Q)
        if (d)
          h.scrollBy(g, Q);
        else {
          let S = 0, y = 0;
          if (Q) {
            let k = c.scrollTop;
            c.scrollTop += Q / m, y = (c.scrollTop - k) * m;
          }
          if (g) {
            let k = c.scrollLeft;
            c.scrollLeft += g / O, S = (c.scrollLeft - k) * O;
          }
          e = {
            left: e.left - S,
            top: e.top - y,
            right: e.right - S,
            bottom: e.bottom - y
          }, S && Math.abs(S - g) < 1 && (i = "nearest"), y && Math.abs(y - Q) < 1 && (r = "nearest");
        }
      if (d)
        break;
      (e.top < u.top || e.bottom > u.bottom || e.left < u.left || e.right > u.right) && (e = {
        left: Math.max(e.left, u.left),
        right: Math.min(e.right, u.right),
        top: Math.max(e.top, u.top),
        bottom: Math.min(e.bottom, u.bottom)
      }), c = c.assignedSlot || c.parentNode;
    } else if (c.nodeType == 11)
      c = c.host;
    else
      break;
}
function tO(n) {
  let e = n.ownerDocument, t, i;
  for (let r = n.parentNode; r && !(r == e.body || t && i); )
    if (r.nodeType == 1)
      !i && r.scrollHeight > r.clientHeight && (i = r), !t && r.scrollWidth > r.clientWidth && (t = r), r = r.assignedSlot || r.parentNode;
    else if (r.nodeType == 11)
      r = r.host;
    else
      break;
  return { x: t, y: i };
}
class iO {
  constructor() {
    this.anchorNode = null, this.anchorOffset = 0, this.focusNode = null, this.focusOffset = 0;
  }
  eq(e) {
    return this.anchorNode == e.anchorNode && this.anchorOffset == e.anchorOffset && this.focusNode == e.focusNode && this.focusOffset == e.focusOffset;
  }
  setRange(e) {
    let { anchorNode: t, focusNode: i } = e;
    this.set(t, Math.min(e.anchorOffset, t ? gt(t) : 0), i, Math.min(e.focusOffset, i ? gt(i) : 0));
  }
  set(e, t, i, r) {
    this.anchorNode = e, this.anchorOffset = t, this.focusNode = i, this.focusOffset = r;
  }
}
let Yt = null;
C.safari && C.safari_version >= 26 && (Yt = !1);
function cc(n) {
  if (n.setActive)
    return n.setActive();
  if (Yt)
    return n.focus(Yt);
  let e = [];
  for (let t = n; t && (e.push(t, t.scrollTop, t.scrollLeft), t != t.ownerDocument); t = t.parentNode)
    ;
  if (n.focus(Yt == null ? {
    get preventScroll() {
      return Yt = { preventScroll: !0 }, !0;
    }
  } : void 0), !Yt) {
    Yt = !1;
    for (let t = 0; t < e.length; ) {
      let i = e[t++], r = e[t++], s = e[t++];
      i.scrollTop != r && (i.scrollTop = r), i.scrollLeft != s && (i.scrollLeft = s);
    }
  }
}
let Dl;
function Gi(n, e, t = e) {
  let i = Dl || (Dl = document.createRange());
  return i.setEnd(n, t), i.setStart(n, e), i;
}
function ni(n, e, t, i) {
  let r = { key: e, code: e, keyCode: t, which: t, cancelable: !0 };
  i && ({ altKey: r.altKey, ctrlKey: r.ctrlKey, shiftKey: r.shiftKey, metaKey: r.metaKey } = i);
  let s = new KeyboardEvent("keydown", r);
  s.synthetic = !0, n.dispatchEvent(s);
  let o = new KeyboardEvent("keyup", r);
  return o.synthetic = !0, n.dispatchEvent(o), s.defaultPrevented || o.defaultPrevented;
}
function nO(n) {
  for (; n; ) {
    if (n && (n.nodeType == 9 || n.nodeType == 11 && n.host))
      return n;
    n = n.assignedSlot || n.parentNode;
  }
  return null;
}
function rO(n, e) {
  let t = e.focusNode, i = e.focusOffset;
  if (!t || e.anchorNode != t || e.anchorOffset != i)
    return !1;
  for (i = Math.min(i, gt(t)); ; )
    if (i) {
      if (t.nodeType != 1)
        return !1;
      let r = t.childNodes[i - 1];
      r.contentEditable == "false" ? i-- : (t = r, i = gt(t));
    } else {
      if (t == n)
        return !0;
      i = Tt(t), t = t.parentNode;
    }
}
function fc(n) {
  return n.scrollTop > Math.max(1, n.scrollHeight - n.clientHeight - 4);
}
function uc(n, e) {
  for (let t = n, i = e; ; ) {
    if (t.nodeType == 3 && i > 0)
      return { node: t, offset: i };
    if (t.nodeType == 1 && i > 0) {
      if (t.contentEditable == "false")
        return null;
      t = t.childNodes[i - 1], i = gt(t);
    } else if (t.parentNode && !nr(t))
      i = Tt(t), t = t.parentNode;
    else
      return null;
  }
}
function dc(n, e) {
  for (let t = n, i = e; ; ) {
    if (t.nodeType == 3 && i < t.nodeValue.length)
      return { node: t, offset: i };
    if (t.nodeType == 1 && i < t.childNodes.length) {
      if (t.contentEditable == "false")
        return null;
      t = t.childNodes[i], i = 0;
    } else if (t.parentNode && !nr(t))
      i = Tt(t) + 1, t = t.parentNode;
    else
      return null;
  }
}
class We {
  constructor(e, t, i = !0) {
    this.node = e, this.offset = t, this.precise = i;
  }
  static before(e, t) {
    return new We(e.parentNode, Tt(e), t);
  }
  static after(e, t) {
    return new We(e.parentNode, Tt(e) + 1, t);
  }
}
var N = /* @__PURE__ */ function(n) {
  return n[n.LTR = 0] = "LTR", n[n.RTL = 1] = "RTL", n;
}(N || (N = {}));
const Bt = N.LTR, Vo = N.RTL;
function Oc(n) {
  let e = [];
  for (let t = 0; t < n.length; t++)
    e.push(1 << +n[t]);
  return e;
}
const sO = /* @__PURE__ */ Oc("88888888888888888888888888888888888666888888787833333333337888888000000000000000000000000008888880000000000000000000000000088888888888888888888888888888888888887866668888088888663380888308888800000000000000000000000800000000000000000000000000000008"), oO = /* @__PURE__ */ Oc("4444448826627288999999999992222222222222222222222222222222222222222222222229999999999999999999994444444444644222822222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222999999949999999229989999223333333333"), Ks = /* @__PURE__ */ Object.create(null), Ue = [];
for (let n of ["()", "[]", "{}"]) {
  let e = /* @__PURE__ */ n.charCodeAt(0), t = /* @__PURE__ */ n.charCodeAt(1);
  Ks[e] = t, Ks[t] = -e;
}
function pc(n) {
  return n <= 247 ? sO[n] : 1424 <= n && n <= 1524 ? 2 : 1536 <= n && n <= 1785 ? oO[n - 1536] : 1774 <= n && n <= 2220 ? 4 : 8192 <= n && n <= 8204 ? 256 : 64336 <= n && n <= 65023 ? 4 : 1;
}
const lO = /[\u0590-\u05f4\u0600-\u06ff\u0700-\u08ac\ufb50-\ufdff]/;
class it {
  /**
  The direction of this span.
  */
  get dir() {
    return this.level % 2 ? Vo : Bt;
  }
  /**
  @internal
  */
  constructor(e, t, i) {
    this.from = e, this.to = t, this.level = i;
  }
  /**
  @internal
  */
  side(e, t) {
    return this.dir == t == e ? this.to : this.from;
  }
  /**
  @internal
  */
  forward(e, t) {
    return e == (this.dir == t);
  }
  /**
  @internal
  */
  static find(e, t, i, r) {
    let s = -1;
    for (let o = 0; o < e.length; o++) {
      let l = e[o];
      if (l.from <= t && l.to >= t) {
        if (l.level == i)
          return o;
        (s < 0 || (r != 0 ? r < 0 ? l.from < t : l.to > t : e[s].level > l.level)) && (s = o);
      }
    }
    if (s < 0)
      throw new RangeError("Index out of range");
    return s;
  }
}
function mc(n, e) {
  if (n.length != e.length)
    return !1;
  for (let t = 0; t < n.length; t++) {
    let i = n[t], r = e[t];
    if (i.from != r.from || i.to != r.to || i.direction != r.direction || !mc(i.inner, r.inner))
      return !1;
  }
  return !0;
}
const j = [];
function aO(n, e, t, i, r) {
  for (let s = 0; s <= i.length; s++) {
    let o = s ? i[s - 1].to : e, l = s < i.length ? i[s].from : t, a = s ? 256 : r;
    for (let h = o, c = a, f = a; h < l; h++) {
      let u = pc(n.charCodeAt(h));
      u == 512 ? u = c : u == 8 && f == 4 && (u = 16), j[h] = u == 4 ? 2 : u, u & 7 && (f = u), c = u;
    }
    for (let h = o, c = a, f = a; h < l; h++) {
      let u = j[h];
      if (u == 128)
        h < l - 1 && c == j[h + 1] && c & 24 ? u = j[h] = c : j[h] = 256;
      else if (u == 64) {
        let d = h + 1;
        for (; d < l && j[d] == 64; )
          d++;
        let O = h && c == 8 || d < t && j[d] == 8 ? f == 1 ? 1 : 8 : 256;
        for (let m = h; m < d; m++)
          j[m] = O;
        h = d - 1;
      } else u == 8 && f == 1 && (j[h] = 1);
      c = u, u & 7 && (f = u);
    }
  }
}
function hO(n, e, t, i, r) {
  let s = r == 1 ? 2 : 1;
  for (let o = 0, l = 0, a = 0; o <= i.length; o++) {
    let h = o ? i[o - 1].to : e, c = o < i.length ? i[o].from : t;
    for (let f = h, u, d, O; f < c; f++)
      if (d = Ks[u = n.charCodeAt(f)])
        if (d < 0) {
          for (let m = l - 3; m >= 0; m -= 3)
            if (Ue[m + 1] == -d) {
              let g = Ue[m + 2], Q = g & 2 ? r : g & 4 ? g & 1 ? s : r : 0;
              Q && (j[f] = j[Ue[m]] = Q), l = m;
              break;
            }
        } else {
          if (Ue.length == 189)
            break;
          Ue[l++] = f, Ue[l++] = u, Ue[l++] = a;
        }
      else if ((O = j[f]) == 2 || O == 1) {
        let m = O == r;
        a = m ? 0 : 1;
        for (let g = l - 3; g >= 0; g -= 3) {
          let Q = Ue[g + 2];
          if (Q & 2)
            break;
          if (m)
            Ue[g + 2] |= 2;
          else {
            if (Q & 4)
              break;
            Ue[g + 2] |= 4;
          }
        }
      }
  }
}
function cO(n, e, t, i) {
  for (let r = 0, s = i; r <= t.length; r++) {
    let o = r ? t[r - 1].to : n, l = r < t.length ? t[r].from : e;
    for (let a = o; a < l; ) {
      let h = j[a];
      if (h == 256) {
        let c = a + 1;
        for (; ; )
          if (c == l) {
            if (r == t.length)
              break;
            c = t[r++].to, l = r < t.length ? t[r].from : e;
          } else if (j[c] == 256)
            c++;
          else
            break;
        let f = s == 1, u = (c < e ? j[c] : i) == 1, d = f == u ? f ? 1 : 2 : i;
        for (let O = c, m = r, g = m ? t[m - 1].to : n; O > a; )
          O == g && (O = t[--m].from, g = m ? t[m - 1].to : n), j[--O] = d;
        a = c;
      } else
        s = h, a++;
    }
  }
}
function Js(n, e, t, i, r, s, o) {
  let l = i % 2 ? 2 : 1;
  if (i % 2 == r % 2)
    for (let a = e, h = 0; a < t; ) {
      let c = !0, f = !1;
      if (h == s.length || a < s[h].from) {
        let m = j[a];
        m != l && (c = !1, f = m == 16);
      }
      let u = !c && l == 1 ? [] : null, d = c ? i : i + 1, O = a;
      e: for (; ; )
        if (h < s.length && O == s[h].from) {
          if (f)
            break e;
          let m = s[h];
          if (!c)
            for (let g = m.to, Q = h + 1; ; ) {
              if (g == t)
                break e;
              if (Q < s.length && s[Q].from == g)
                g = s[Q++].to;
              else {
                if (j[g] == l)
                  break e;
                break;
              }
            }
          if (h++, u)
            u.push(m);
          else {
            m.from > a && o.push(new it(a, m.from, d));
            let g = m.direction == Bt != !(d % 2);
            eo(n, g ? i + 1 : i, r, m.inner, m.from, m.to, o), a = m.to;
          }
          O = m.to;
        } else {
          if (O == t || (c ? j[O] != l : j[O] == l))
            break;
          O++;
        }
      u ? Js(n, a, O, i + 1, r, u, o) : a < O && o.push(new it(a, O, d)), a = O;
    }
  else
    for (let a = t, h = s.length; a > e; ) {
      let c = !0, f = !1;
      if (!h || a > s[h - 1].to) {
        let m = j[a - 1];
        m != l && (c = !1, f = m == 16);
      }
      let u = !c && l == 1 ? [] : null, d = c ? i : i + 1, O = a;
      e: for (; ; )
        if (h && O == s[h - 1].to) {
          if (f)
            break e;
          let m = s[--h];
          if (!c)
            for (let g = m.from, Q = h; ; ) {
              if (g == e)
                break e;
              if (Q && s[Q - 1].to == g)
                g = s[--Q].from;
              else {
                if (j[g - 1] == l)
                  break e;
                break;
              }
            }
          if (u)
            u.push(m);
          else {
            m.to < a && o.push(new it(m.to, a, d));
            let g = m.direction == Bt != !(d % 2);
            eo(n, g ? i + 1 : i, r, m.inner, m.from, m.to, o), a = m.from;
          }
          O = m.from;
        } else {
          if (O == e || (c ? j[O - 1] != l : j[O - 1] == l))
            break;
          O--;
        }
      u ? Js(n, O, a, i + 1, r, u, o) : O < a && o.push(new it(O, a, d)), a = O;
    }
}
function eo(n, e, t, i, r, s, o) {
  let l = e % 2 ? 2 : 1;
  aO(n, r, s, i, l), hO(n, r, s, i, l), cO(r, s, i, l), Js(n, r, s, e, t, i, o);
}
function fO(n, e, t) {
  if (!n)
    return [new it(0, 0, e == Vo ? 1 : 0)];
  if (e == Bt && !t.length && !lO.test(n))
    return gc(n.length);
  if (t.length)
    for (; n.length > j.length; )
      j[j.length] = 256;
  let i = [], r = e == Bt ? 0 : 1;
  return eo(n, r, r, t, 0, n.length, i), i;
}
function gc(n) {
  return [new it(0, n, 0)];
}
let Qc = "";
function uO(n, e, t, i, r) {
  var s;
  let o = i.head - n.from, l = it.find(e, o, (s = i.bidiLevel) !== null && s !== void 0 ? s : -1, i.assoc), a = e[l], h = a.side(r, t);
  if (o == h) {
    let u = l += r ? 1 : -1;
    if (u < 0 || u >= e.length)
      return null;
    a = e[l = u], o = a.side(!r, t), h = a.side(r, t);
  }
  let c = se(n.text, o, a.forward(r, t));
  (c < a.from || c > a.to) && (c = h), Qc = n.text.slice(Math.min(o, c), Math.max(o, c));
  let f = l == (r ? e.length - 1 : 0) ? null : e[l + (r ? 1 : -1)];
  return f && c == h && f.level + (r ? 0 : 1) < a.level ? b.cursor(f.side(!r, t) + n.from, f.forward(r, t) ? 1 : -1, f.level) : b.cursor(c + n.from, a.forward(r, t) ? -1 : 1, a.level);
}
function dO(n, e, t) {
  for (let i = e; i < t; i++) {
    let r = pc(n.charCodeAt(i));
    if (r == 1)
      return Bt;
    if (r == 2 || r == 4)
      return Vo;
  }
  return Bt;
}
const bc = /* @__PURE__ */ T.define(), Sc = /* @__PURE__ */ T.define(), yc = /* @__PURE__ */ T.define(), xc = /* @__PURE__ */ T.define(), to = /* @__PURE__ */ T.define(), wc = /* @__PURE__ */ T.define(), kc = /* @__PURE__ */ T.define(), Eo = /* @__PURE__ */ T.define(), _o = /* @__PURE__ */ T.define(), $c = /* @__PURE__ */ T.define({
  combine: (n) => n.some((e) => e)
}), Pc = /* @__PURE__ */ T.define({
  combine: (n) => n.some((e) => e)
}), vc = /* @__PURE__ */ T.define();
class ri {
  constructor(e, t = "nearest", i = "nearest", r = 5, s = 5, o = !1) {
    this.range = e, this.y = t, this.x = i, this.yMargin = r, this.xMargin = s, this.isSnapshot = o;
  }
  map(e) {
    return e.empty ? this : new ri(this.range.map(e), this.y, this.x, this.yMargin, this.xMargin, this.isSnapshot);
  }
  clip(e) {
    return this.range.to <= e.doc.length ? this : new ri(b.cursor(e.doc.length), this.y, this.x, this.yMargin, this.xMargin, this.isSnapshot);
  }
}
const xn = /* @__PURE__ */ M.define({ map: (n, e) => n.map(e) }), Tc = /* @__PURE__ */ M.define();
function we(n, e, t) {
  let i = n.facet(xc);
  i.length ? i[0](e) : window.onerror && window.onerror(String(e), t, void 0, void 0, e) || (t ? console.error(t + ":", e) : console.error(e));
}
const dt = /* @__PURE__ */ T.define({ combine: (n) => n.length ? n[0] : !0 });
let OO = 0;
const Ht = /* @__PURE__ */ T.define({
  combine(n) {
    return n.filter((e, t) => {
      for (let i = 0; i < t; i++)
        if (n[i].plugin == e.plugin)
          return !1;
      return !0;
    });
  }
});
class ee {
  constructor(e, t, i, r, s) {
    this.id = e, this.create = t, this.domEventHandlers = i, this.domEventObservers = r, this.baseExtensions = s(this), this.extension = this.baseExtensions.concat(Ht.of({ plugin: this, arg: void 0 }));
  }
  /**
  Create an extension for this plugin with the given argument.
  */
  of(e) {
    return this.baseExtensions.concat(Ht.of({ plugin: this, arg: e }));
  }
  /**
  Define a plugin from a constructor function that creates the
  plugin's value, given an editor view.
  */
  static define(e, t) {
    const { eventHandlers: i, eventObservers: r, provide: s, decorations: o } = t || {};
    return new ee(OO++, e, i, r, (l) => {
      let a = [];
      return o && a.push(Mr.of((h) => {
        let c = h.plugin(l);
        return c ? o(c) : Z.none;
      })), s && a.push(s(l)), a;
    });
  }
  /**
  Create a plugin for a class whose constructor takes a single
  editor view as argument.
  */
  static fromClass(e, t) {
    return ee.define((i, r) => new e(i, r), t);
  }
}
class Kr {
  constructor(e) {
    this.spec = e, this.mustUpdate = null, this.value = null;
  }
  get plugin() {
    return this.spec && this.spec.plugin;
  }
  update(e) {
    if (this.value) {
      if (this.mustUpdate) {
        let t = this.mustUpdate;
        if (this.mustUpdate = null, this.value.update)
          try {
            this.value.update(t);
          } catch (i) {
            if (we(t.state, i, "CodeMirror plugin crashed"), this.value.destroy)
              try {
                this.value.destroy();
              } catch {
              }
            this.deactivate();
          }
      }
    } else if (this.spec)
      try {
        this.value = this.spec.plugin.create(e, this.spec.arg);
      } catch (t) {
        we(e.state, t, "CodeMirror plugin crashed"), this.deactivate();
      }
    return this;
  }
  destroy(e) {
    var t;
    if (!((t = this.value) === null || t === void 0) && t.destroy)
      try {
        this.value.destroy();
      } catch (i) {
        we(e.state, i, "CodeMirror plugin crashed");
      }
  }
  deactivate() {
    this.spec = this.value = null;
  }
}
const Cc = /* @__PURE__ */ T.define(), Do = /* @__PURE__ */ T.define(), Mr = /* @__PURE__ */ T.define(), Zc = /* @__PURE__ */ T.define(), qo = /* @__PURE__ */ T.define(), cn = /* @__PURE__ */ T.define(), Xc = /* @__PURE__ */ T.define();
function ql(n, e) {
  let t = n.state.facet(Xc);
  if (!t.length)
    return t;
  let i = t.map((s) => s instanceof Function ? s(n) : s), r = [];
  return E.spans(i, e.from, e.to, {
    point() {
    },
    span(s, o, l, a) {
      let h = s - e.from, c = o - e.from, f = r;
      for (let u = l.length - 1; u >= 0; u--, a--) {
        let d = l[u].spec.bidiIsolate, O;
        if (d == null && (d = dO(e.text, h, c)), a > 0 && f.length && (O = f[f.length - 1]).to == h && O.direction == d)
          O.to = c, f = O.inner;
        else {
          let m = { from: h, to: c, direction: d, inner: [] };
          f.push(m), f = m.inner;
        }
      }
    }
  }), r;
}
const Ac = /* @__PURE__ */ T.define();
function Wo(n) {
  let e = 0, t = 0, i = 0, r = 0;
  for (let s of n.state.facet(Ac)) {
    let o = s(n);
    o && (o.left != null && (e = Math.max(e, o.left)), o.right != null && (t = Math.max(t, o.right)), o.top != null && (i = Math.max(i, o.top)), o.bottom != null && (r = Math.max(r, o.bottom)));
  }
  return { left: e, right: t, top: i, bottom: r };
}
const Ai = /* @__PURE__ */ T.define();
class ze {
  constructor(e, t, i, r) {
    this.fromA = e, this.toA = t, this.fromB = i, this.toB = r;
  }
  join(e) {
    return new ze(Math.min(this.fromA, e.fromA), Math.max(this.toA, e.toA), Math.min(this.fromB, e.fromB), Math.max(this.toB, e.toB));
  }
  addToSet(e) {
    let t = e.length, i = this;
    for (; t > 0; t--) {
      let r = e[t - 1];
      if (!(r.fromA > i.toA)) {
        if (r.toA < i.fromA)
          break;
        i = i.join(r), e.splice(t - 1, 1);
      }
    }
    return e.splice(t, 0, i), e;
  }
  // Extend a set to cover all the content in `ranges`, which is a
  // flat array with each pair of numbers representing fromB/toB
  // positions. These pairs are generated in unchanged ranges, so the
  // offset between doc A and doc B is the same for their start and
  // end points.
  static extendWithRanges(e, t) {
    if (t.length == 0)
      return e;
    let i = [];
    for (let r = 0, s = 0, o = 0; ; ) {
      let l = r < e.length ? e[r].fromB : 1e9, a = s < t.length ? t[s] : 1e9, h = Math.min(l, a);
      if (h == 1e9)
        break;
      let c = h + o, f = h, u = c;
      for (; ; )
        if (s < t.length && t[s] <= f) {
          let d = t[s + 1];
          s += 2, f = Math.max(f, d);
          for (let O = r; O < e.length && e[O].fromB <= f; O++)
            o = e[O].toA - e[O].toB;
          u = Math.max(u, d + o);
        } else if (r < e.length && e[r].fromB <= f) {
          let d = e[r++];
          f = Math.max(f, d.toB), u = Math.max(u, d.toA), o = d.toA - d.toB;
        } else
          break;
      i.push(new ze(c, u, h, f));
    }
    return i;
  }
}
class sr {
  constructor(e, t, i) {
    this.view = e, this.state = t, this.transactions = i, this.flags = 0, this.startState = e.state, this.changes = ne.empty(this.startState.doc.length);
    for (let s of i)
      this.changes = this.changes.compose(s.changes);
    let r = [];
    this.changes.iterChangedRanges((s, o, l, a) => r.push(new ze(s, o, l, a))), this.changedRanges = r;
  }
  /**
  @internal
  */
  static create(e, t, i) {
    return new sr(e, t, i);
  }
  /**
  Tells you whether the [viewport](https://codemirror.net/6/docs/ref/#view.EditorView.viewport) or
  [visible ranges](https://codemirror.net/6/docs/ref/#view.EditorView.visibleRanges) changed in this
  update.
  */
  get viewportChanged() {
    return (this.flags & 4) > 0;
  }
  /**
  Returns true when
  [`viewportChanged`](https://codemirror.net/6/docs/ref/#view.ViewUpdate.viewportChanged) is true
  and the viewport change is not just the result of mapping it in
  response to document changes.
  */
  get viewportMoved() {
    return (this.flags & 8) > 0;
  }
  /**
  Indicates whether the height of a block element in the editor
  changed in this update.
  */
  get heightChanged() {
    return (this.flags & 2) > 0;
  }
  /**
  Returns true when the document was modified or the size of the
  editor, or elements within the editor, changed.
  */
  get geometryChanged() {
    return this.docChanged || (this.flags & 18) > 0;
  }
  /**
  True when this update indicates a focus change.
  */
  get focusChanged() {
    return (this.flags & 1) > 0;
  }
  /**
  Whether the document changed in this update.
  */
  get docChanged() {
    return !this.changes.empty;
  }
  /**
  Whether the selection was explicitly set in this update.
  */
  get selectionSet() {
    return this.transactions.some((e) => e.selection);
  }
  /**
  @internal
  */
  get empty() {
    return this.flags == 0 && this.transactions.length == 0;
  }
}
const pO = [];
class ie {
  constructor(e, t, i = 0) {
    this.dom = e, this.length = t, this.flags = i, this.parent = null, e.cmTile = this;
  }
  get breakAfter() {
    return this.flags & 1;
  }
  get children() {
    return pO;
  }
  isWidget() {
    return !1;
  }
  get isHidden() {
    return !1;
  }
  isComposite() {
    return !1;
  }
  isLine() {
    return !1;
  }
  isText() {
    return !1;
  }
  isBlock() {
    return !1;
  }
  get domAttrs() {
    return null;
  }
  sync(e) {
    if (this.flags |= 2, this.flags & 4) {
      this.flags &= -5;
      let t = this.domAttrs;
      t && Fd(this.dom, t);
    }
  }
  toString() {
    return this.constructor.name + (this.children.length ? `(${this.children})` : "") + (this.breakAfter ? "#" : "");
  }
  destroy() {
    this.parent = null;
  }
  setDOM(e) {
    this.dom = e, e.cmTile = this;
  }
  get posAtStart() {
    return this.parent ? this.parent.posBefore(this) : 0;
  }
  get posAtEnd() {
    return this.posAtStart + this.length;
  }
  posBefore(e, t = this.posAtStart) {
    let i = t;
    for (let r of this.children) {
      if (r == e)
        return i;
      i += r.length + r.breakAfter;
    }
    throw new RangeError("Invalid child in posBefore");
  }
  posAfter(e) {
    return this.posBefore(e) + e.length;
  }
  covers(e) {
    return !0;
  }
  coordsIn(e, t) {
    return null;
  }
  domPosFor(e, t) {
    let i = Tt(this.dom), r = this.length ? e > 0 : t > 0;
    return new We(this.parent.dom, i + (r ? 1 : 0), e == 0 || e == this.length);
  }
  markDirty(e) {
    this.flags &= -3, e && (this.flags |= 4), this.parent && this.parent.flags & 2 && this.parent.markDirty(!1);
  }
  get overrideDOMText() {
    return null;
  }
  get root() {
    for (let e = this; e; e = e.parent)
      if (e instanceof zr)
        return e;
    return null;
  }
  static get(e) {
    return e.cmTile;
  }
}
class Rr extends ie {
  constructor(e) {
    super(e, 0), this._children = [];
  }
  isComposite() {
    return !0;
  }
  get children() {
    return this._children;
  }
  get lastChild() {
    return this.children.length ? this.children[this.children.length - 1] : null;
  }
  append(e) {
    this.children.push(e), e.parent = this;
  }
  sync(e) {
    if (this.flags & 2)
      return;
    super.sync(e);
    let t = this.dom, i = null, r, s = (e == null ? void 0 : e.node) == t ? e : null, o = 0;
    for (let l of this.children) {
      if (l.sync(e), o += l.length + l.breakAfter, r = i ? i.nextSibling : t.firstChild, s && r != l.dom && (s.written = !0), l.dom.parentNode == t)
        for (; r && r != l.dom; )
          r = Wl(r);
      else
        t.insertBefore(l.dom, r);
      i = l.dom;
    }
    for (r = i ? i.nextSibling : t.firstChild, s && r && (s.written = !0); r; )
      r = Wl(r);
    this.length = o;
  }
}
function Wl(n) {
  let e = n.nextSibling;
  return n.parentNode.removeChild(n), e;
}
class zr extends Rr {
  constructor(e, t) {
    super(t), this.view = e;
  }
  owns(e) {
    for (; e; e = e.parent)
      if (e == this)
        return !0;
    return !1;
  }
  isBlock() {
    return !0;
  }
  nearest(e) {
    for (; ; ) {
      if (!e)
        return null;
      let t = ie.get(e);
      if (t && this.owns(t))
        return t;
      e = e.parentNode;
    }
  }
  blockTiles(e) {
    for (let t = [], i = this, r = 0, s = 0; ; )
      if (r == i.children.length) {
        if (!t.length)
          return;
        i = i.parent, i.breakAfter && s++, r = t.pop();
      } else {
        let o = i.children[r++];
        if (o instanceof Ot)
          t.push(r), i = o, r = 0;
        else {
          let l = s + o.length, a = e(o, s);
          if (a !== void 0)
            return a;
          s = l + o.breakAfter;
        }
      }
  }
  // Find the block at the given position. If side < -1, make sure to
  // stay before block widgets at that position, if side > 1, after
  // such widgets (used for selection drawing, which needs to be able
  // to get coordinates for positions that aren't valid cursor positions).
  resolveBlock(e, t) {
    let i, r = -1, s, o = -1;
    if (this.blockTiles((l, a) => {
      let h = a + l.length;
      if (e >= a && e <= h) {
        if (l.isWidget() && t >= -1 && t <= 1) {
          if (l.flags & 32)
            return !0;
          l.flags & 16 && (i = void 0);
        }
        (a < e || e == h && (t < -1 ? l.length : l.covers(1))) && (!i || !l.isWidget() && i.isWidget()) && (i = l, r = e - a), (h > e || e == a && (t > 1 ? l.length : l.covers(-1))) && (!s || !l.isWidget() && s.isWidget()) && (s = l, o = e - a);
      }
    }), !i && !s)
      throw new Error("No tile at position " + e);
    return i && t < 0 || !s ? { tile: i, offset: r } : { tile: s, offset: o };
  }
}
class Ot extends Rr {
  constructor(e, t) {
    super(e), this.wrapper = t;
  }
  isBlock() {
    return !0;
  }
  covers(e) {
    return this.children.length ? e < 0 ? this.children[0].covers(-1) : this.lastChild.covers(1) : !1;
  }
  get domAttrs() {
    return this.wrapper.attributes;
  }
  static of(e, t) {
    let i = new Ot(t || document.createElement(e.tagName), e);
    return t || (i.flags |= 4), i;
  }
}
class fi extends Rr {
  constructor(e, t) {
    super(e), this.attrs = t;
  }
  isLine() {
    return !0;
  }
  static start(e, t, i) {
    let r = new fi(t || document.createElement("div"), e);
    return (!t || !i) && (r.flags |= 4), r;
  }
  get domAttrs() {
    return this.attrs;
  }
  // Find the tile associated with a given position in this line.
  resolveInline(e, t, i) {
    let r = null, s = -1, o = null, l = -1;
    function a(c, f) {
      for (let u = 0, d = 0; u < c.children.length && d <= f; u++) {
        let O = c.children[u], m = d + O.length;
        m >= f && (O.isComposite() ? a(O, f - d) : (!o || o.isHidden && (t > 0 || i && gO(o, O))) && (m > f || O.flags & 32) ? (o = O, l = f - d) : (d < f || O.flags & 16 && !O.isHidden) && (r = O, s = f - d)), d = m;
      }
    }
    a(this, e);
    let h = (t < 0 ? r : o) || r || o;
    return h ? { tile: h, offset: h == r ? s : l } : null;
  }
  coordsIn(e, t) {
    let i = this.resolveInline(e, t, !0);
    return i ? i.tile.coordsIn(Math.max(0, i.offset), t) : mO(this);
  }
  domIn(e, t) {
    let i = this.resolveInline(e, t);
    if (i) {
      let { tile: r, offset: s } = i;
      if (this.dom.contains(r.dom))
        return r.isText() ? new We(r.dom, Math.min(r.dom.nodeValue.length, s)) : r.domPosFor(s, r.flags & 16 ? 1 : r.flags & 32 ? -1 : t);
      let o = i.tile.parent, l = !1;
      for (let a of o.children) {
        if (l)
          return new We(a.dom, 0);
        a == i.tile && (l = !0);
      }
    }
    return new We(this.dom, 0);
  }
}
function mO(n) {
  let e = n.dom.lastChild;
  if (!e)
    return n.dom.getBoundingClientRect();
  let t = Bn(e);
  return t[t.length - 1] || null;
}
function gO(n, e) {
  let t = n.coordsIn(0, 1), i = e.coordsIn(0, 1);
  return t && i && i.top < t.bottom;
}
class xe extends Rr {
  constructor(e, t) {
    super(e), this.mark = t;
  }
  get domAttrs() {
    return this.mark.attrs;
  }
  static of(e, t) {
    let i = new xe(t || document.createElement(e.tagName), e);
    return t || (i.flags |= 4), i;
  }
}
class Dt extends ie {
  constructor(e, t) {
    super(e, t.length), this.text = t;
  }
  sync(e) {
    this.flags & 2 || (super.sync(e), this.dom.nodeValue != this.text && (e && e.node == this.dom && (e.written = !0), this.dom.nodeValue = this.text));
  }
  isText() {
    return !0;
  }
  toString() {
    return JSON.stringify(this.text);
  }
  coordsIn(e, t) {
    let i = this.dom.nodeValue.length;
    e > i && (e = i);
    let r = e, s = e, o = 0;
    e == 0 && t < 0 || e == i && t >= 0 ? C.chrome || C.gecko || (e ? (r--, o = 1) : s < i && (s++, o = -1)) : t < 0 ? r-- : s < i && s++;
    let l = Gi(this.dom, r, s).getClientRects();
    if (!l.length)
      return null;
    let a = l[(o ? o < 0 : t >= 0) ? 0 : l.length - 1];
    return C.safari && !o && a.width == 0 && (a = Array.prototype.find.call(l, (h) => h.width) || a), o ? rr(a, o < 0) : a || null;
  }
  static of(e, t) {
    let i = new Dt(t || document.createTextNode(e), e);
    return t || (i.flags |= 2), i;
  }
}
class It extends ie {
  constructor(e, t, i, r) {
    super(e, t, r), this.widget = i;
  }
  isWidget() {
    return !0;
  }
  get isHidden() {
    return this.widget.isHidden;
  }
  covers(e) {
    return this.flags & 48 ? !1 : (this.flags & (e < 0 ? 64 : 128)) > 0;
  }
  coordsIn(e, t) {
    return this.coordsInWidget(e, t, !1);
  }
  coordsInWidget(e, t, i) {
    let r = this.widget.coordsAt(this.dom, e, t);
    if (r)
      return r;
    if (i)
      return rr(this.dom.getBoundingClientRect(), this.length ? e == 0 : t <= 0);
    {
      let s = this.dom.getClientRects(), o = null;
      if (!s.length)
        return null;
      let l = this.flags & 16 ? !0 : this.flags & 32 ? !1 : e > 0;
      for (let a = l ? s.length - 1 : 0; o = s[a], !(e > 0 ? a == 0 : a == s.length - 1 || o.top < o.bottom); a += l ? -1 : 1)
        ;
      return rr(o, !l);
    }
  }
  get overrideDOMText() {
    if (!this.length)
      return D.empty;
    let { root: e } = this;
    if (!e)
      return D.empty;
    let t = this.posAtStart;
    return e.view.state.doc.slice(t, t + this.length);
  }
  destroy() {
    super.destroy(), this.widget.destroy(this.dom);
  }
  static of(e, t, i, r, s) {
    return s || (s = e.toDOM(t), e.editable || (s.contentEditable = "false")), new It(s, i, e, r);
  }
}
class or extends ie {
  constructor(e) {
    let t = document.createElement("img");
    t.className = "cm-widgetBuffer", t.setAttribute("aria-hidden", "true"), super(t, 0, e);
  }
  get isHidden() {
    return !0;
  }
  get overrideDOMText() {
    return D.empty;
  }
  coordsIn(e) {
    return this.dom.getBoundingClientRect();
  }
}
class QO {
  constructor(e) {
    this.index = 0, this.beforeBreak = !1, this.parents = [], this.tile = e;
  }
  // Advance by the given distance. If side is -1, stop leaving or
  // entering tiles, or skipping zero-length tiles, once the distance
  // has been traversed. When side is 1, leave, enter, or skip
  // everything at the end position.
  advance(e, t, i) {
    let { tile: r, index: s, beforeBreak: o, parents: l } = this;
    for (; e || t > 0; )
      if (r.isComposite())
        if (o) {
          if (!e)
            break;
          i && i.break(), e--, o = !1;
        } else if (s == r.children.length) {
          if (!e && !l.length)
            break;
          i && i.leave(r), o = !!r.breakAfter, { tile: r, index: s } = l.pop(), s++;
        } else {
          let a = r.children[s], h = a.breakAfter;
          (t > 0 ? a.length <= e : a.length < e) && (!i || i.skip(a, 0, a.length) !== !1 || !a.isComposite) ? (o = !!h, s++, e -= a.length) : (l.push({ tile: r, index: s }), r = a, s = 0, i && a.isComposite() && i.enter(a));
        }
      else if (s == r.length)
        o = !!r.breakAfter, { tile: r, index: s } = l.pop(), s++;
      else if (e) {
        let a = Math.min(e, r.length - s);
        i && i.skip(r, s, s + a), e -= a, s += a;
      } else
        break;
    return this.tile = r, this.index = s, this.beforeBreak = o, this;
  }
  get root() {
    return this.parents.length ? this.parents[0].tile : this.tile;
  }
}
class bO {
  constructor(e, t, i, r) {
    this.from = e, this.to = t, this.wrapper = i, this.rank = r;
  }
}
class SO {
  constructor(e, t, i) {
    this.cache = e, this.root = t, this.blockWrappers = i, this.curLine = null, this.lastBlock = null, this.afterWidget = null, this.pos = 0, this.wrappers = [], this.wrapperPos = 0;
  }
  addText(e, t, i, r) {
    var s;
    this.flushBuffer();
    let o = this.ensureMarks(t, i), l = o.lastChild;
    if (l && l.isText() && !(l.flags & 8) && l.length + e.length < 512) {
      this.cache.reused.set(
        l,
        2
        /* Reused.DOM */
      );
      let a = o.children[o.children.length - 1] = new Dt(l.dom, l.text + e);
      a.parent = o;
    } else
      o.append(r || Dt.of(e, (s = this.cache.find(Dt)) === null || s === void 0 ? void 0 : s.dom));
    this.pos += e.length, this.afterWidget = null;
  }
  addComposition(e, t) {
    let i = this.curLine;
    i.dom != t.line.dom && (i.setDOM(this.cache.reused.has(t.line) ? Jr(t.line.dom) : t.line.dom), this.cache.reused.set(
      t.line,
      2
      /* Reused.DOM */
    ));
    let r = i;
    for (let l = t.marks.length - 1; l >= 0; l--) {
      let a = t.marks[l], h = r.lastChild;
      if (h instanceof xe && h.mark.eq(a.mark))
        h.dom != a.dom && h.setDOM(Jr(a.dom)), r = h;
      else {
        if (this.cache.reused.get(a)) {
          let f = ie.get(a.dom);
          f && f.setDOM(Jr(a.dom));
        }
        let c = xe.of(a.mark, a.dom);
        r.append(c), r = c;
      }
      this.cache.reused.set(
        a,
        2
        /* Reused.DOM */
      );
    }
    let s = ie.get(e.text);
    s && this.cache.reused.set(
      s,
      2
      /* Reused.DOM */
    );
    let o = new Dt(e.text, e.text.nodeValue);
    o.flags |= 8, r.append(o);
  }
  addInlineWidget(e, t, i) {
    let r = this.afterWidget && e.flags & 48 && (this.afterWidget.flags & 48) == (e.flags & 48);
    r || this.flushBuffer();
    let s = this.ensureMarks(t, i);
    !r && !(e.flags & 16) && s.append(this.getBuffer(1)), s.append(e), this.pos += e.length, this.afterWidget = e;
  }
  addMark(e, t, i) {
    this.flushBuffer(), this.ensureMarks(t, i).append(e), this.pos += e.length, this.afterWidget = null;
  }
  addBlockWidget(e) {
    this.getBlockPos().append(e), this.pos += e.length, this.lastBlock = e, this.endLine();
  }
  continueWidget(e) {
    let t = this.afterWidget || this.lastBlock;
    t.length += e, this.pos += e;
  }
  addLineStart(e, t) {
    var i;
    e || (e = Mc);
    let r = fi.start(e, t || ((i = this.cache.find(fi)) === null || i === void 0 ? void 0 : i.dom), !!t);
    this.getBlockPos().append(this.lastBlock = this.curLine = r);
  }
  addLine(e) {
    this.getBlockPos().append(e), this.pos += e.length, this.lastBlock = e, this.endLine();
  }
  addBreak() {
    this.lastBlock.flags |= 1, this.endLine(), this.pos++;
  }
  addLineStartIfNotCovered(e) {
    this.blockPosCovered() || this.addLineStart(e);
  }
  ensureLine(e) {
    this.curLine || this.addLineStart(e);
  }
  ensureMarks(e, t) {
    var i;
    let r = this.curLine;
    for (let s = e.length - 1; s >= 0; s--) {
      let o = e[s], l;
      if (t > 0 && (l = r.lastChild) && l instanceof xe && l.mark.eq(o))
        r = l, t--;
      else {
        let a = xe.of(o, (i = this.cache.find(xe, (h) => h.mark.eq(o))) === null || i === void 0 ? void 0 : i.dom);
        r.append(a), r = a, t = 0;
      }
    }
    return r;
  }
  endLine() {
    if (this.curLine) {
      this.flushBuffer();
      let e = this.curLine.lastChild;
      (!e || !Ll(this.curLine, !1) || e.dom.nodeName != "BR" && e.isWidget() && !(C.ios && Ll(this.curLine, !0))) && this.curLine.append(this.cache.findWidget(
        es,
        0,
        32
        /* TileFlag.After */
      ) || new It(
        es.toDOM(),
        0,
        es,
        32
        /* TileFlag.After */
      )), this.curLine = this.afterWidget = null;
    }
  }
  updateBlockWrappers() {
    this.wrapperPos > this.pos + 1e4 && (this.blockWrappers.goto(this.pos), this.wrappers.length = 0);
    for (let e = this.wrappers.length - 1; e >= 0; e--)
      this.wrappers[e].to < this.pos && this.wrappers.splice(e, 1);
    for (let e = this.blockWrappers; e.value && e.from <= this.pos; e.next())
      if (e.to >= this.pos) {
        let t = new bO(e.from, e.to, e.value, e.rank), i = this.wrappers.length;
        for (; i > 0 && (this.wrappers[i - 1].rank - t.rank || this.wrappers[i - 1].to - t.to) < 0; )
          i--;
        this.wrappers.splice(i, 0, t);
      }
    this.wrapperPos = this.pos;
  }
  getBlockPos() {
    var e;
    this.updateBlockWrappers();
    let t = this.root;
    for (let i of this.wrappers) {
      let r = t.lastChild;
      if (i.from < this.pos && r instanceof Ot && r.wrapper.eq(i.wrapper))
        t = r;
      else {
        let s = Ot.of(i.wrapper, (e = this.cache.find(Ot, (o) => o.wrapper.eq(i.wrapper))) === null || e === void 0 ? void 0 : e.dom);
        t.append(s), t = s;
      }
    }
    return t;
  }
  blockPosCovered() {
    let e = this.lastBlock;
    return e != null && !e.breakAfter && (!e.isWidget() || (e.flags & 160) > 0);
  }
  getBuffer(e) {
    let t = 2 | (e < 0 ? 16 : 32), i = this.cache.find(
      or,
      void 0,
      1
      /* Reused.Full */
    );
    return i && (i.flags = t), i || new or(t);
  }
  flushBuffer() {
    this.afterWidget && !(this.afterWidget.flags & 32) && (this.afterWidget.parent.append(this.getBuffer(-1)), this.afterWidget = null);
  }
}
class yO {
  constructor(e) {
    this.skipCount = 0, this.text = "", this.textOff = 0, this.cursor = e.iter();
  }
  skip(e) {
    this.textOff + e <= this.text.length ? this.textOff += e : (this.skipCount += e - (this.text.length - this.textOff), this.text = "", this.textOff = 0);
  }
  next(e) {
    if (this.textOff == this.text.length) {
      let { value: r, lineBreak: s, done: o } = this.cursor.next(this.skipCount);
      if (this.skipCount = 0, o)
        throw new Error("Ran out of text content when drawing inline views");
      this.text = r;
      let l = this.textOff = Math.min(e, r.length);
      return s ? null : r.slice(0, l);
    }
    let t = Math.min(this.text.length, this.textOff + e), i = this.text.slice(this.textOff, t);
    return this.textOff = t, i;
  }
}
const lr = [It, fi, Dt, xe, or, Ot, zr];
for (let n = 0; n < lr.length; n++)
  lr[n].bucket = n;
class xO {
  constructor(e) {
    this.view = e, this.buckets = lr.map(() => []), this.index = lr.map(() => 0), this.reused = /* @__PURE__ */ new Map();
  }
  // Put a tile in the cache.
  add(e) {
    let t = e.constructor.bucket, i = this.buckets[t];
    i.length < 6 ? i.push(e) : i[
      this.index[t] = (this.index[t] + 1) % 6
      /* C.Bucket */
    ] = e;
  }
  find(e, t, i = 2) {
    let r = e.bucket, s = this.buckets[r], o = this.index[r];
    for (let l = s.length - 1; l >= 0; l--) {
      let a = (l + o) % s.length, h = s[a];
      if ((!t || t(h)) && !this.reused.has(h))
        return s.splice(a, 1), a < o && this.index[r]--, this.reused.set(h, i), h;
    }
    return null;
  }
  findWidget(e, t, i) {
    let r = this.buckets[0];
    if (r.length)
      for (let s = 0, o = 0; ; s++) {
        if (s == r.length) {
          if (o)
            return null;
          o = 1, s = 0;
        }
        let l = r[s];
        if (!this.reused.has(l) && (o == 0 ? l.widget.compare(e) : l.widget.constructor == e.constructor && e.updateDOM(l.dom, this.view)))
          return r.splice(s, 1), s < this.index[0] && this.index[0]--, l.widget == e && l.length == t && (l.flags & 497) == i ? (this.reused.set(
            l,
            1
            /* Reused.Full */
          ), l) : (this.reused.set(
            l,
            2
            /* Reused.DOM */
          ), new It(l.dom, t, e, l.flags & -498 | i));
      }
  }
  reuse(e) {
    return this.reused.set(
      e,
      1
      /* Reused.Full */
    ), e;
  }
  maybeReuse(e, t = 2) {
    if (!this.reused.has(e))
      return this.reused.set(e, t), e.dom;
  }
  clear() {
    for (let e = 0; e < this.buckets.length; e++)
      this.buckets[e].length = this.index[e] = 0;
  }
}
class wO {
  constructor(e, t, i, r, s) {
    this.view = e, this.decorations = r, this.disallowBlockEffectsFor = s, this.openWidget = !1, this.openMarks = 0, this.cache = new xO(e), this.text = new yO(e.state.doc), this.builder = new SO(this.cache, new zr(e, e.contentDOM), E.iter(i)), this.cache.reused.set(
      t,
      2
      /* Reused.DOM */
    ), this.old = new QO(t), this.reuseWalker = {
      skip: (o, l, a) => {
        if (this.cache.add(o), o.isComposite())
          return !1;
      },
      enter: (o) => this.cache.add(o),
      leave: () => {
      },
      break: () => {
      }
    };
  }
  run(e, t) {
    let i = t && this.getCompositionContext(t.text);
    for (let r = 0, s = 0, o = 0; ; ) {
      let l = o < e.length ? e[o++] : null, a = l ? l.fromA : this.old.root.length;
      if (a > r) {
        let h = a - r;
        this.preserve(h, !o, !l), r = a, s += h;
      }
      if (!l)
        break;
      t && l.fromA <= t.range.fromA && l.toA >= t.range.toA ? (this.forward(l.fromA, t.range.fromA, t.range.fromA < t.range.toA ? 1 : -1), this.emit(s, t.range.fromB), this.cache.clear(), this.builder.addComposition(t, i), this.text.skip(t.range.toB - t.range.fromB), this.forward(t.range.fromA, l.toA), this.emit(t.range.toB, l.toB)) : (this.forward(l.fromA, l.toA), this.emit(s, l.toB)), s = l.toB, r = l.toA;
    }
    return this.builder.curLine && this.builder.endLine(), this.builder.root;
  }
  preserve(e, t, i) {
    let r = PO(this.old), s = this.openMarks;
    this.old.advance(e, i ? 1 : -1, {
      skip: (o, l, a) => {
        if (o.isWidget())
          if (this.openWidget)
            this.builder.continueWidget(a - l);
          else {
            let h = a > 0 || l < o.length ? It.of(o.widget, this.view, a - l, o.flags & 496, this.cache.maybeReuse(o)) : this.cache.reuse(o);
            h.flags & 256 ? (h.flags &= -2, this.builder.addBlockWidget(h)) : (this.builder.ensureLine(null), this.builder.addInlineWidget(h, r, s), s = r.length);
          }
        else if (o.isText())
          this.builder.ensureLine(null), !l && a == o.length ? this.builder.addText(o.text, r, s, this.cache.reuse(o)) : (this.cache.add(o), this.builder.addText(o.text.slice(l, a), r, s)), s = r.length;
        else if (o.isLine())
          o.flags &= -2, this.cache.reused.set(
            o,
            1
            /* Reused.Full */
          ), this.builder.addLine(o);
        else if (o instanceof or)
          this.cache.add(o);
        else if (o instanceof xe)
          this.builder.ensureLine(null), this.builder.addMark(o, r, s), this.cache.reused.set(
            o,
            1
            /* Reused.Full */
          ), s = r.length;
        else
          return !1;
        this.openWidget = !1;
      },
      enter: (o) => {
        o.isLine() ? this.builder.addLineStart(o.attrs, this.cache.maybeReuse(o)) : (this.cache.add(o), o instanceof xe && r.unshift(o.mark)), this.openWidget = !1;
      },
      leave: (o) => {
        o.isLine() ? r.length && (r.length = s = 0) : o instanceof xe && (r.shift(), s = Math.min(s, r.length));
      },
      break: () => {
        this.builder.addBreak(), this.openWidget = !1;
      }
    }), this.text.skip(e);
  }
  emit(e, t) {
    let i = null, r = this.builder, s = 0, o = E.spans(this.decorations, e, t, {
      point: (l, a, h, c, f, u) => {
        if (h instanceof Lt) {
          if (this.disallowBlockEffectsFor[u]) {
            if (h.block)
              throw new RangeError("Block decorations may not be specified via plugins");
            if (a > this.view.state.doc.lineAt(l).to)
              throw new RangeError("Decorations that replace line breaks may not be specified via plugins");
          }
          if (s = c.length, f > c.length)
            r.continueWidget(a - l);
          else {
            let d = h.widget || (h.block ? ui.block : ui.inline), O = kO(h), m = this.cache.findWidget(d, a - l, O) || It.of(d, this.view, a - l, O);
            h.block ? (h.startSide > 0 && r.addLineStartIfNotCovered(i), r.addBlockWidget(m)) : (r.ensureLine(i), r.addInlineWidget(m, c, f));
          }
          i = null;
        } else
          i = $O(i, h);
        a > l && this.text.skip(a - l);
      },
      span: (l, a, h, c) => {
        for (let f = l; f < a; ) {
          let u = this.text.next(Math.min(512, a - f));
          u == null ? (r.addLineStartIfNotCovered(i), r.addBreak(), f++) : (r.ensureLine(i), r.addText(u, h, f == l ? c : h.length), f += u.length), i = null;
        }
      }
    });
    r.addLineStartIfNotCovered(i), this.openWidget = o > s, this.openMarks = o;
  }
  forward(e, t, i = 1) {
    t - e <= 10 ? this.old.advance(t - e, i, this.reuseWalker) : (this.old.advance(5, -1, this.reuseWalker), this.old.advance(t - e - 10, -1), this.old.advance(5, i, this.reuseWalker));
  }
  getCompositionContext(e) {
    let t = [], i = null;
    for (let r = e.parentNode; ; r = r.parentNode) {
      let s = ie.get(r);
      if (r == this.view.contentDOM)
        break;
      s instanceof xe ? t.push(s) : s != null && s.isLine() ? i = s : s instanceof Ot || (r.nodeName == "DIV" && !i && r != this.view.contentDOM ? i = new fi(r, Mc) : i || t.push(xe.of(new an({ tagName: r.nodeName.toLowerCase(), attributes: Hd(r) }), r)));
    }
    return { line: i, marks: t };
  }
}
function Ll(n, e) {
  let t = (i) => {
    for (let r of i.children)
      if ((e ? r.isText() : r.length) || t(r))
        return !0;
    return !1;
  };
  return t(n);
}
function kO(n) {
  let e = n.isReplace ? (n.startSide < 0 ? 64 : 0) | (n.endSide > 0 ? 128 : 0) : n.startSide > 0 ? 32 : 16;
  return n.block && (e |= 256), e;
}
const Mc = { class: "cm-line" };
function $O(n, e) {
  let t = e.spec.attributes, i = e.spec.class;
  return !t && !i || (n || (n = { class: "cm-line" }), t && zo(t, n), i && (n.class += " " + i)), n;
}
function PO(n) {
  let e = [];
  for (let t = n.parents.length; t > 1; t--) {
    let i = t == n.parents.length ? n.tile : n.parents[t].tile;
    i instanceof xe && e.push(i.mark);
  }
  return e;
}
function Jr(n) {
  let e = ie.get(n);
  return e && e.setDOM(n.cloneNode()), n;
}
class ui extends ht {
  constructor(e) {
    super(), this.tag = e;
  }
  eq(e) {
    return e.tag == this.tag;
  }
  toDOM() {
    return document.createElement(this.tag);
  }
  updateDOM(e) {
    return e.nodeName.toLowerCase() == this.tag;
  }
  get isHidden() {
    return !0;
  }
}
ui.inline = /* @__PURE__ */ new ui("span");
ui.block = /* @__PURE__ */ new ui("div");
const es = /* @__PURE__ */ new class extends ht {
  toDOM() {
    return document.createElement("br");
  }
  get isHidden() {
    return !0;
  }
  get editable() {
    return !0;
  }
}();
class Bl {
  constructor(e) {
    this.view = e, this.decorations = [], this.blockWrappers = [], this.dynamicDecorationMap = [!1], this.domChanged = null, this.hasComposition = null, this.editContextFormatting = Z.none, this.lastCompositionAfterCursor = !1, this.minWidth = 0, this.minWidthFrom = 0, this.minWidthTo = 0, this.impreciseAnchor = null, this.impreciseHead = null, this.forceSelection = !1, this.lastUpdate = Date.now(), this.updateDeco(), this.tile = new zr(e, e.contentDOM), this.updateInner([new ze(0, 0, 0, e.state.doc.length)], null);
  }
  // Update the document view to a given state.
  update(e) {
    var t;
    let i = e.changedRanges;
    this.minWidth > 0 && i.length && (i.every(({ fromA: c, toA: f }) => f < this.minWidthFrom || c > this.minWidthTo) ? (this.minWidthFrom = e.changes.mapPos(this.minWidthFrom, 1), this.minWidthTo = e.changes.mapPos(this.minWidthTo, 1)) : this.minWidth = this.minWidthFrom = this.minWidthTo = 0), this.updateEditContextFormatting(e);
    let r = -1;
    this.view.inputState.composing >= 0 && !this.view.observer.editContext && (!((t = this.domChanged) === null || t === void 0) && t.newSel ? r = this.domChanged.newSel.head : !zO(e.changes, this.hasComposition) && !e.selectionSet && (r = e.state.selection.main.head));
    let s = r > -1 ? TO(this.view, e.changes, r) : null;
    if (this.domChanged = null, this.hasComposition) {
      let { from: c, to: f } = this.hasComposition;
      i = new ze(c, f, e.changes.mapPos(c, -1), e.changes.mapPos(f, 1)).addToSet(i.slice());
    }
    this.hasComposition = s ? { from: s.range.fromB, to: s.range.toB } : null, (C.ie || C.chrome) && !s && e && e.state.doc.lines != e.startState.doc.lines && (this.forceSelection = !0);
    let o = this.decorations, l = this.blockWrappers;
    this.updateDeco();
    let a = XO(o, this.decorations, e.changes);
    a.length && (i = ze.extendWithRanges(i, a));
    let h = MO(l, this.blockWrappers, e.changes);
    return h.length && (i = ze.extendWithRanges(i, h)), s && !i.some((c) => c.fromA <= s.range.fromA && c.toA >= s.range.toA) && (i = s.range.addToSet(i.slice())), this.tile.flags & 2 && i.length == 0 ? !1 : (this.updateInner(i, s), e.transactions.length && (this.lastUpdate = Date.now()), !0);
  }
  // Used by update and the constructor do perform the actual DOM
  // update
  updateInner(e, t) {
    this.view.viewState.mustMeasureContent = !0;
    let { observer: i } = this.view;
    i.ignore(() => {
      if (t || e.length) {
        let o = this.tile, l = new wO(this.view, o, this.blockWrappers, this.decorations, this.dynamicDecorationMap);
        this.tile = l.run(e, t), io(o, l.cache.reused);
      }
      this.tile.dom.style.height = this.view.viewState.contentHeight / this.view.scaleY + "px", this.tile.dom.style.flexBasis = this.minWidth ? this.minWidth + "px" : "";
      let s = C.chrome || C.ios ? { node: i.selectionRange.focusNode, written: !1 } : void 0;
      this.tile.sync(s), s && (s.written || i.selectionRange.focusNode != s.node || !this.tile.dom.contains(s.node)) && (this.forceSelection = !0), this.tile.dom.style.height = "";
    });
    let r = [];
    if (this.view.viewport.from || this.view.viewport.to < this.view.state.doc.length)
      for (let s of this.tile.children)
        s.isWidget() && s.widget instanceof ts && r.push(s.dom);
    i.updateGaps(r);
  }
  updateEditContextFormatting(e) {
    this.editContextFormatting = this.editContextFormatting.map(e.changes);
    for (let t of e.transactions)
      for (let i of t.effects)
        i.is(Tc) && (this.editContextFormatting = i.value);
  }
  // Sync the DOM selection to this.state.selection
  updateSelection(e = !1, t = !1) {
    (e || !this.view.observer.selectionRange.focusNode) && this.view.observer.readSelectionRange();
    let { dom: i } = this.tile, r = this.view.root.activeElement, s = r == i, o = !s && !(this.view.state.facet(dt) || i.tabIndex > -1) && _i(i, this.view.observer.selectionRange) && !(r && i.contains(r));
    if (!(s || t || o))
      return;
    let l = this.forceSelection;
    this.forceSelection = !1;
    let a = this.view.state.selection.main, h, c;
    if (a.empty ? c = h = this.inlineDOMNearPos(a.anchor, a.assoc || 1) : (c = this.inlineDOMNearPos(a.head, a.head == a.from ? 1 : -1), h = this.inlineDOMNearPos(a.anchor, a.anchor == a.from ? 1 : -1)), C.gecko && a.empty && !this.hasComposition && vO(h)) {
      let u = document.createTextNode("");
      this.view.observer.ignore(() => h.node.insertBefore(u, h.node.childNodes[h.offset] || null)), h = c = new We(u, 0), l = !0;
    }
    let f = this.view.observer.selectionRange;
    (l || !f.focusNode || (!Di(h.node, h.offset, f.anchorNode, f.anchorOffset) || !Di(c.node, c.offset, f.focusNode, f.focusOffset)) && !this.suppressWidgetCursorChange(f, a)) && (this.view.observer.ignore(() => {
      C.android && C.chrome && i.contains(f.focusNode) && RO(f.focusNode, i) && (i.blur(), i.focus({ preventScroll: !0 }));
      let u = Ni(this.view.root);
      if (u) if (a.empty) {
        if (C.gecko) {
          let d = CO(h.node, h.offset);
          if (d && d != 3) {
            let O = (d == 1 ? uc : dc)(h.node, h.offset);
            O && (h = new We(O.node, O.offset));
          }
        }
        u.collapse(h.node, h.offset), a.bidiLevel != null && u.caretBidiLevel !== void 0 && (u.caretBidiLevel = a.bidiLevel);
      } else if (u.extend) {
        u.collapse(h.node, h.offset);
        try {
          u.extend(c.node, c.offset);
        } catch {
        }
      } else {
        let d = document.createRange();
        a.anchor > a.head && ([h, c] = [c, h]), d.setEnd(c.node, c.offset), d.setStart(h.node, h.offset), u.removeAllRanges(), u.addRange(d);
      }
      o && this.view.root.activeElement == i && (i.blur(), r && r.focus());
    }), this.view.observer.setSelectionRange(h, c)), this.impreciseAnchor = h.precise ? null : new We(f.anchorNode, f.anchorOffset), this.impreciseHead = c.precise ? null : new We(f.focusNode, f.focusOffset);
  }
  // If a zero-length widget is inserted next to the cursor during
  // composition, avoid moving it across it and disrupting the
  // composition.
  suppressWidgetCursorChange(e, t) {
    return this.hasComposition && t.empty && Di(e.focusNode, e.focusOffset, e.anchorNode, e.anchorOffset) && this.posFromDOM(e.focusNode, e.focusOffset) == t.head;
  }
  enforceCursorAssoc() {
    if (this.hasComposition)
      return;
    let { view: e } = this, t = e.state.selection.main, i = Ni(e.root), { anchorNode: r, anchorOffset: s } = e.observer.selectionRange;
    if (!i || !t.empty || !t.assoc || !i.modify)
      return;
    let o = this.lineAt(t.head, t.assoc);
    if (!o)
      return;
    let l = o.posAtStart;
    if (t.head == l || t.head == l + o.length)
      return;
    let a = this.coordsAt(t.head, -1), h = this.coordsAt(t.head, 1);
    if (!a || !h || a.bottom > h.top)
      return;
    let c = this.domAtPos(t.head + t.assoc, t.assoc);
    i.collapse(c.node, c.offset), i.modify("move", t.assoc < 0 ? "forward" : "backward", "lineboundary"), e.observer.readSelectionRange();
    let f = e.observer.selectionRange;
    e.docView.posFromDOM(f.anchorNode, f.anchorOffset) != t.from && i.collapse(r, s);
  }
  posFromDOM(e, t) {
    let i = this.tile.nearest(e);
    if (!i)
      return this.tile.dom.compareDocumentPosition(e) & 2 ? 0 : this.view.state.doc.length;
    let r = i.posAtStart;
    if (i.isComposite()) {
      let s;
      if (e == i.dom)
        s = i.dom.childNodes[t];
      else {
        let o = gt(e) == 0 ? 0 : t == 0 ? -1 : 1;
        for (; ; ) {
          let l = e.parentNode;
          if (l == i.dom)
            break;
          o == 0 && l.firstChild != l.lastChild && (e == l.firstChild ? o = -1 : o = 1), e = l;
        }
        o < 0 ? s = e : s = e.nextSibling;
      }
      if (s == i.dom.firstChild)
        return r;
      for (; s && !ie.get(s); )
        s = s.nextSibling;
      if (!s)
        return r + i.length;
      for (let o = 0, l = r; ; o++) {
        let a = i.children[o];
        if (a.dom == s)
          return l;
        l += a.length + a.breakAfter;
      }
    } else return i.isText() ? e == i.dom ? r + t : r + (t ? i.length : 0) : r;
  }
  domAtPos(e, t) {
    let { tile: i, offset: r } = this.tile.resolveBlock(e, t);
    return i.isWidget() ? i.domPosFor(e, t) : i.domIn(r, t);
  }
  inlineDOMNearPos(e, t) {
    let i, r = -1, s = !1, o, l = -1, a = !1;
    return this.tile.blockTiles((h, c) => {
      if (h.isWidget()) {
        if (h.flags & 32 && c >= e)
          return !0;
        h.flags & 16 && (s = !0);
      } else {
        let f = c + h.length;
        if (c <= e && (i = h, r = e - c, s = f < e), f >= e && !o && (o = h, l = e - c, a = c > e), c > e && o)
          return !0;
      }
    }), !i && !o ? this.domAtPos(e, t) : (s && o ? i = null : a && i && (o = null), i && t < 0 || !o ? i.domIn(r, t) : o.domIn(l, t));
  }
  coordsAt(e, t) {
    let { tile: i, offset: r } = this.tile.resolveBlock(e, t);
    return i.isWidget() ? i.widget instanceof ts ? null : i.coordsInWidget(r, t, !0) : i.coordsIn(r, t);
  }
  lineAt(e, t) {
    let { tile: i } = this.tile.resolveBlock(e, t);
    return i.isLine() ? i : null;
  }
  coordsForChar(e) {
    let { tile: t, offset: i } = this.tile.resolveBlock(e, 1);
    if (!t.isLine())
      return null;
    function r(s, o) {
      if (s.isComposite())
        for (let l of s.children) {
          if (l.length >= o) {
            let a = r(l, o);
            if (a)
              return a;
          }
          if (o -= l.length, o < 0)
            break;
        }
      else if (s.isText() && o < s.length) {
        let l = se(s.text, o);
        if (l == o)
          return null;
        let a = Gi(s.dom, o, l).getClientRects();
        for (let h = 0; h < a.length; h++) {
          let c = a[h];
          if (h == a.length - 1 || c.top < c.bottom && c.left < c.right)
            return c;
        }
      }
      return null;
    }
    return r(t, i);
  }
  measureVisibleLineHeights(e) {
    let t = [], { from: i, to: r } = e, s = this.view.contentDOM.clientWidth, o = s > Math.max(this.view.scrollDOM.clientWidth, this.minWidth) + 1, l = -1, a = this.view.textDirection == N.LTR, h = 0, c = (f, u, d) => {
      for (let O = 0; O < f.children.length && !(u > r); O++) {
        let m = f.children[O], g = u + m.length, Q = m.dom.getBoundingClientRect(), { height: S } = Q;
        if (d && !O && (h += Q.top - d.top), m instanceof Ot)
          g > i && c(m, u, Q);
        else if (u >= i && (h > 0 && t.push(-h), t.push(S + h), h = 0, o)) {
          let y = m.dom.lastChild, k = y ? Bn(y) : [];
          if (k.length) {
            let x = k[k.length - 1], $ = a ? x.right - Q.left : Q.right - x.left;
            $ > l && (l = $, this.minWidth = s, this.minWidthFrom = u, this.minWidthTo = g);
          }
        }
        d && O == f.children.length - 1 && (h += d.bottom - Q.bottom), u = g + m.breakAfter;
      }
    };
    return c(this.tile, 0, null), t;
  }
  textDirectionAt(e) {
    let { tile: t } = this.tile.resolveBlock(e, 1);
    return getComputedStyle(t.dom).direction == "rtl" ? N.RTL : N.LTR;
  }
  measureTextSize() {
    let e = this.tile.blockTiles((o) => {
      if (o.isLine() && o.children.length && o.length <= 20) {
        let l = 0, a;
        for (let h of o.children) {
          if (!h.isText() || /[^ -~]/.test(h.text))
            return;
          let c = Bn(h.dom);
          if (c.length != 1)
            return;
          l += c[0].width, a = c[0].height;
        }
        if (l)
          return {
            lineHeight: o.dom.getBoundingClientRect().height,
            charWidth: l / o.length,
            textHeight: a
          };
      }
    });
    if (e)
      return e;
    let t = document.createElement("div"), i, r, s;
    return t.className = "cm-line", t.style.width = "99999px", t.style.position = "absolute", t.textContent = "abc def ghi jkl mno pqr stu", this.view.observer.ignore(() => {
      this.tile.dom.appendChild(t);
      let o = Bn(t.firstChild)[0];
      i = t.getBoundingClientRect().height, r = o && o.width ? o.width / 27 : 7, s = o && o.height ? o.height : i, t.remove();
    }), { lineHeight: i, charWidth: r, textHeight: s };
  }
  computeBlockGapDeco() {
    let e = [], t = this.view.viewState;
    for (let i = 0, r = 0; ; r++) {
      let s = r == t.viewports.length ? null : t.viewports[r], o = s ? s.from - 1 : this.view.state.doc.length;
      if (o > i) {
        let l = (t.lineBlockAt(o).bottom - t.lineBlockAt(i).top) / this.view.scaleY;
        e.push(Z.replace({
          widget: new ts(l),
          block: !0,
          inclusive: !0,
          isBlockGap: !0
        }).range(i, o));
      }
      if (!s)
        break;
      i = s.to + 1;
    }
    return Z.set(e);
  }
  updateDeco() {
    let e = 1, t = this.view.state.facet(Mr).map((s) => (this.dynamicDecorationMap[e++] = typeof s == "function") ? s(this.view) : s), i = !1, r = this.view.state.facet(qo).map((s, o) => {
      let l = typeof s == "function";
      return l && (i = !0), l ? s(this.view) : s;
    });
    for (r.length && (this.dynamicDecorationMap[e++] = i, t.push(E.join(r))), this.decorations = [
      this.editContextFormatting,
      ...t,
      this.computeBlockGapDeco(),
      this.view.viewState.lineGapDeco
    ]; e < this.decorations.length; )
      this.dynamicDecorationMap[e++] = !1;
    this.blockWrappers = this.view.state.facet(Zc).map((s) => typeof s == "function" ? s(this.view) : s);
  }
  scrollIntoView(e) {
    if (e.isSnapshot) {
      let h = this.view.viewState.lineBlockAt(e.range.head);
      this.view.scrollDOM.scrollTop = h.top - e.yMargin, this.view.scrollDOM.scrollLeft = e.xMargin;
      return;
    }
    for (let h of this.view.state.facet(vc))
      try {
        if (h(this.view, e.range, e))
          return !0;
      } catch (c) {
        we(this.view.state, c, "scroll handler");
      }
    let { range: t } = e, i = this.coordsAt(t.head, t.empty ? t.assoc : t.head > t.anchor ? -1 : 1), r;
    if (!i)
      return;
    !t.empty && (r = this.coordsAt(t.anchor, t.anchor > t.head ? -1 : 1)) && (i = {
      left: Math.min(i.left, r.left),
      top: Math.min(i.top, r.top),
      right: Math.max(i.right, r.right),
      bottom: Math.max(i.bottom, r.bottom)
    });
    let s = Wo(this.view), o = {
      left: i.left - s.left,
      top: i.top - s.top,
      right: i.right + s.right,
      bottom: i.bottom + s.bottom
    }, { offsetWidth: l, offsetHeight: a } = this.view.scrollDOM;
    if (eO(this.view.scrollDOM, o, t.head < t.anchor ? -1 : 1, e.x, e.y, Math.max(Math.min(e.xMargin, l), -l), Math.max(Math.min(e.yMargin, a), -a), this.view.textDirection == N.LTR), window.visualViewport && window.innerHeight - window.visualViewport.height > 1 && (i.top > window.pageYOffset + window.visualViewport.offsetTop + window.visualViewport.height || i.bottom < window.pageYOffset + window.visualViewport.offsetTop)) {
      let h = this.view.docView.lineAt(t.head, 1);
      h && h.dom.scrollIntoView({ block: "nearest" });
    }
  }
  lineHasWidget(e) {
    let t = (i) => i.isWidget() || i.children.some(t);
    return t(this.tile.resolveBlock(e, 1).tile);
  }
  destroy() {
    io(this.tile);
  }
}
function io(n, e) {
  let t = e == null ? void 0 : e.get(n);
  if (t != 1) {
    t == null && n.destroy();
    for (let i of n.children)
      io(i, e);
  }
}
function vO(n) {
  return n.node.nodeType == 1 && n.node.firstChild && (n.offset == 0 || n.node.childNodes[n.offset - 1].contentEditable == "false") && (n.offset == n.node.childNodes.length || n.node.childNodes[n.offset].contentEditable == "false");
}
function Rc(n, e) {
  let t = n.observer.selectionRange;
  if (!t.focusNode)
    return null;
  let i = uc(t.focusNode, t.focusOffset), r = dc(t.focusNode, t.focusOffset), s = i || r;
  if (r && i && r.node != i.node) {
    let l = ie.get(r.node);
    if (!l || l.isText() && l.text != r.node.nodeValue)
      s = r;
    else if (n.docView.lastCompositionAfterCursor) {
      let a = ie.get(i.node);
      !a || a.isText() && a.text != i.node.nodeValue || (s = r);
    }
  }
  if (n.docView.lastCompositionAfterCursor = s != i, !s)
    return null;
  let o = e - s.offset;
  return { from: o, to: o + s.node.nodeValue.length, node: s.node };
}
function TO(n, e, t) {
  let i = Rc(n, t);
  if (!i)
    return null;
  let { node: r, from: s, to: o } = i, l = r.nodeValue;
  if (/[\n\r]/.test(l) || n.state.doc.sliceString(i.from, i.to) != l)
    return null;
  let a = e.invertedDesc;
  return { range: new ze(a.mapPos(s), a.mapPos(o), s, o), text: r };
}
function CO(n, e) {
  return n.nodeType != 1 ? 0 : (e && n.childNodes[e - 1].contentEditable == "false" ? 1 : 0) | (e < n.childNodes.length && n.childNodes[e].contentEditable == "false" ? 2 : 0);
}
let ZO = class {
  constructor() {
    this.changes = [];
  }
  compareRange(e, t) {
    ii(e, t, this.changes);
  }
  comparePoint(e, t) {
    ii(e, t, this.changes);
  }
  boundChange(e) {
    ii(e, e, this.changes);
  }
};
function XO(n, e, t) {
  let i = new ZO();
  return E.compare(n, e, t, i), i.changes;
}
class AO {
  constructor() {
    this.changes = [];
  }
  compareRange(e, t) {
    ii(e, t, this.changes);
  }
  comparePoint() {
  }
  boundChange(e) {
    ii(e, e, this.changes);
  }
}
function MO(n, e, t) {
  let i = new AO();
  return E.compare(n, e, t, i), i.changes;
}
function RO(n, e) {
  for (let t = n; t && t != e; t = t.assignedSlot || t.parentNode)
    if (t.nodeType == 1 && t.contentEditable == "false")
      return !0;
  return !1;
}
function zO(n, e) {
  let t = !1;
  return e && n.iterChangedRanges((i, r) => {
    i < e.to && r > e.from && (t = !0);
  }), t;
}
class ts extends ht {
  constructor(e) {
    super(), this.height = e;
  }
  toDOM() {
    let e = document.createElement("div");
    return e.className = "cm-gap", this.updateDOM(e), e;
  }
  eq(e) {
    return e.height == this.height;
  }
  updateDOM(e) {
    return e.style.height = this.height + "px", !0;
  }
  get editable() {
    return !0;
  }
  get estimatedHeight() {
    return this.height;
  }
  ignoreEvent() {
    return !1;
  }
}
function YO(n, e, t = 1) {
  let i = n.charCategorizer(e), r = n.doc.lineAt(e), s = e - r.from;
  if (r.length == 0)
    return b.cursor(e);
  s == 0 ? t = 1 : s == r.length && (t = -1);
  let o = s, l = s;
  t < 0 ? o = se(r.text, s, !1) : l = se(r.text, s);
  let a = i(r.text.slice(o, l));
  for (; o > 0; ) {
    let h = se(r.text, o, !1);
    if (i(r.text.slice(h, o)) != a)
      break;
    o = h;
  }
  for (; l < r.length; ) {
    let h = se(r.text, l);
    if (i(r.text.slice(l, h)) != a)
      break;
    l = h;
  }
  return b.range(o + r.from, l + r.from);
}
function VO(n, e, t, i, r) {
  let s = Math.round((i - e.left) * n.defaultCharacterWidth);
  if (n.lineWrapping && t.height > n.defaultLineHeight * 1.5) {
    let l = n.viewState.heightOracle.textHeight, a = Math.floor((r - t.top - (n.defaultLineHeight - l) * 0.5) / l);
    s += a * n.viewState.heightOracle.lineLength;
  }
  let o = n.state.sliceDoc(t.from, t.to);
  return t.from + Bs(o, s, n.state.tabSize);
}
function no(n, e, t) {
  let i = n.lineBlockAt(e);
  if (Array.isArray(i.type)) {
    let r;
    for (let s of i.type) {
      if (s.from > e)
        break;
      if (!(s.to < e)) {
        if (s.from < e && s.to > e)
          return s;
        (!r || s.type == fe.Text && (r.type != s.type || (t < 0 ? s.from < e : s.to > e))) && (r = s);
      }
    }
    return r || i;
  }
  return i;
}
function EO(n, e, t, i) {
  let r = no(n, e.head, e.assoc || -1), s = !i || r.type != fe.Text || !(n.lineWrapping || r.widgetLineBreaks) ? null : n.coordsAtPos(e.assoc < 0 && e.head > r.from ? e.head - 1 : e.head);
  if (s) {
    let o = n.dom.getBoundingClientRect(), l = n.textDirectionAt(r.from), a = n.posAtCoords({
      x: t == (l == N.LTR) ? o.right - 1 : o.left + 1,
      y: (s.top + s.bottom) / 2
    });
    if (a != null)
      return b.cursor(a, t ? -1 : 1);
  }
  return b.cursor(t ? r.to : r.from, t ? -1 : 1);
}
function Il(n, e, t, i) {
  let r = n.state.doc.lineAt(e.head), s = n.bidiSpans(r), o = n.textDirectionAt(r.from);
  for (let l = e, a = null; ; ) {
    let h = uO(r, s, o, l, t), c = Qc;
    if (!h) {
      if (r.number == (t ? n.state.doc.lines : 1))
        return l;
      c = `
`, r = n.state.doc.line(r.number + (t ? 1 : -1)), s = n.bidiSpans(r), h = n.visualLineSide(r, !t);
    }
    if (a) {
      if (!a(c))
        return l;
    } else {
      if (!i)
        return h;
      a = i(c);
    }
    l = h;
  }
}
function _O(n, e, t) {
  let i = n.state.charCategorizer(e), r = i(t);
  return (s) => {
    let o = i(s);
    return r == F.Space && (r = o), r == o;
  };
}
function DO(n, e, t, i) {
  let r = e.head, s = t ? 1 : -1;
  if (r == (t ? n.state.doc.length : 0))
    return b.cursor(r, e.assoc);
  let o = e.goalColumn, l, a = n.contentDOM.getBoundingClientRect(), h = n.coordsAtPos(r, (e.empty ? e.assoc : 0) || (t ? 1 : -1)), c = n.documentTop;
  if (h)
    o == null && (o = h.left - a.left), l = s < 0 ? h.top : h.bottom;
  else {
    let O = n.viewState.lineBlockAt(r);
    o == null && (o = Math.min(a.right - a.left, n.defaultCharacterWidth * (r - O.from))), l = (s < 0 ? O.top : O.bottom) + c;
  }
  let f = a.left + o, u = i ?? n.viewState.heightOracle.textHeight >> 1, d = ro(n, { x: f, y: l + u * s }, !1, s);
  return b.cursor(d.pos, d.assoc, void 0, o);
}
function qi(n, e, t) {
  for (; ; ) {
    let i = 0;
    for (let r of n)
      r.between(e - 1, e + 1, (s, o, l) => {
        if (e > s && e < o) {
          let a = i || t || (e - s < o - e ? -1 : 1);
          e = a < 0 ? s : o, i = a;
        }
      });
    if (!i)
      return e;
  }
}
function zc(n, e) {
  let t = null;
  for (let i = 0; i < e.ranges.length; i++) {
    let r = e.ranges[i], s = null;
    if (r.empty) {
      let o = qi(n, r.from, 0);
      o != r.from && (s = b.cursor(o, -1));
    } else {
      let o = qi(n, r.from, -1), l = qi(n, r.to, 1);
      (o != r.from || l != r.to) && (s = b.range(r.from == r.anchor ? o : l, r.from == r.head ? o : l));
    }
    s && (t || (t = e.ranges.slice()), t[i] = s);
  }
  return t ? b.create(t, e.mainIndex) : e;
}
function is(n, e, t) {
  let i = qi(n.state.facet(cn).map((r) => r(n)), t.from, e.head > t.from ? -1 : 1);
  return i == t.from ? t : b.cursor(i, i < t.from ? 1 : -1);
}
class tt {
  constructor(e, t) {
    this.pos = e, this.assoc = t;
  }
}
function ro(n, e, t, i) {
  let r = n.contentDOM.getBoundingClientRect(), s = r.top + n.viewState.paddingTop, { x: o, y: l } = e, a = l - s, h;
  for (; ; ) {
    if (a < 0)
      return new tt(0, 1);
    if (a > n.viewState.docHeight)
      return new tt(n.state.doc.length, -1);
    if (h = n.elementAtHeight(a), i == null)
      break;
    if (h.type == fe.Text) {
      if (i < 0 ? h.to < n.viewport.from : h.from > n.viewport.to)
        break;
      let u = n.docView.coordsAt(i < 0 ? h.from : h.to, i > 0 ? -1 : 1);
      if (u && (i < 0 ? u.top <= a + s : u.bottom >= a + s))
        break;
    }
    let f = n.viewState.heightOracle.textHeight / 2;
    a = i > 0 ? h.bottom + f : h.top - f;
  }
  if (n.viewport.from >= h.to || n.viewport.to <= h.from) {
    if (t)
      return null;
    if (h.type == fe.Text) {
      let f = VO(n, r, h, o, l);
      return new tt(f, f == h.from ? 1 : -1);
    }
  }
  if (h.type != fe.Text)
    return a < (h.top + h.bottom) / 2 ? new tt(h.from, 1) : new tt(h.to, -1);
  let c = n.docView.lineAt(h.from, 2);
  return (!c || c.length != h.length) && (c = n.docView.lineAt(h.from, -2)), new qO(n, o, l, n.textDirectionAt(h.from)).scanTile(c, h.from);
}
class qO {
  constructor(e, t, i, r) {
    this.view = e, this.x = t, this.y = i, this.baseDir = r, this.line = null, this.spans = null;
  }
  bidiSpansAt(e) {
    return (!this.line || this.line.from > e || this.line.to < e) && (this.line = this.view.state.doc.lineAt(e), this.spans = this.view.bidiSpans(this.line)), this;
  }
  baseDirAt(e, t) {
    let { line: i, spans: r } = this.bidiSpansAt(e);
    return r[it.find(r, e - i.from, -1, t)].level == this.baseDir;
  }
  dirAt(e, t) {
    let { line: i, spans: r } = this.bidiSpansAt(e);
    return r[it.find(r, e - i.from, -1, t)].dir;
  }
  // Used to short-circuit bidi tests for content with a uniform direction
  bidiIn(e, t) {
    let { spans: i, line: r } = this.bidiSpansAt(e);
    return i.length > 1 || i.length && (i[0].level != this.baseDir || i[0].to + r.from < t);
  }
  // Scan through the rectangles for the content of a tile with inline
  // content, looking for one that overlaps the queried position
  // vertically andis
  // closest horizontally. The caller is responsible for dividing its
  // content into N pieces, and pass an array with N+1 positions
  // (including the position after the last piece). For a text tile,
  // these will be character clusters, for a composite tile, these
  // will be child tiles.
  scan(e, t) {
    let i = 0, r = e.length - 1, s = /* @__PURE__ */ new Set(), o = this.bidiIn(e[0], e[r]), l, a, h = -1, c = 1e9, f;
    e: for (; i < r; ) {
      let d = r - i, O = i + r >> 1;
      t: if (s.has(O)) {
        let g = i + Math.floor(Math.random() * d);
        for (let Q = 0; Q < d; Q++) {
          if (!s.has(g)) {
            O = g;
            break t;
          }
          g++, g == r && (g = i);
        }
        break e;
      }
      s.add(O);
      let m = t(O);
      if (m)
        for (let g = 0; g < m.length; g++) {
          let Q = m[g], S = 0;
          if (Q.bottom < this.y)
            (!l || l.bottom < Q.bottom) && (l = Q), S = 1;
          else if (Q.top > this.y)
            (!a || a.top > Q.top) && (a = Q), S = -1;
          else {
            let y = Q.left > this.x ? this.x - Q.left : Q.right < this.x ? this.x - Q.right : 0, k = Math.abs(y);
            k < c && (h = O, c = k, f = Q), y && (S = y < 0 == (this.baseDir == N.LTR) ? -1 : 1);
          }
          S == -1 && (!o || this.baseDirAt(e[O], 1)) ? r = O : S == 1 && (!o || this.baseDirAt(e[O + 1], -1)) && (i = O + 1);
        }
    }
    if (!f) {
      let d = l && (!a || this.y - l.bottom < a.top - this.y) ? l : a;
      return this.y = (d.top + d.bottom) / 2, this.scan(e, t);
    }
    let u = (o ? this.dirAt(e[h], 1) : this.baseDir) == N.LTR;
    return {
      i: h,
      // Test whether x is closes to the start or end of this element
      after: this.x > (f.left + f.right) / 2 == u
    };
  }
  scanText(e, t) {
    let i = [];
    for (let s = 0; s < e.length; s = se(e.text, s))
      i.push(t + s);
    i.push(t + e.length);
    let r = this.scan(i, (s) => {
      let o = i[s] - t, l = i[s + 1] - t;
      return Gi(e.dom, o, l).getClientRects();
    });
    return r.after ? new tt(i[r.i + 1], -1) : new tt(i[r.i], 1);
  }
  scanTile(e, t) {
    if (!e.length)
      return new tt(t, 1);
    if (e.children.length == 1) {
      let l = e.children[0];
      if (l.isText())
        return this.scanText(l, t);
      if (l.isComposite())
        return this.scanTile(l, t);
    }
    let i = [t];
    for (let l = 0, a = t; l < e.children.length; l++)
      i.push(a += e.children[l].length);
    let r = this.scan(i, (l) => {
      let a = e.children[l];
      return a.flags & 48 ? null : (a.dom.nodeType == 1 ? a.dom : Gi(a.dom, 0, a.length)).getClientRects();
    }), s = e.children[r.i], o = i[r.i];
    return s.isText() ? this.scanText(s, o) : s.isComposite() ? this.scanTile(s, o) : r.after ? new tt(i[r.i + 1], -1) : new tt(o, 1);
  }
}
const Mi = "￿";
class WO {
  constructor(e, t) {
    this.points = e, this.view = t, this.text = "", this.lineSeparator = t.state.facet(_.lineSeparator);
  }
  append(e) {
    this.text += e;
  }
  lineBreak() {
    this.text += Mi;
  }
  readRange(e, t) {
    if (!e)
      return this;
    let i = e.parentNode;
    for (let r = e; ; ) {
      this.findPointBefore(i, r);
      let s = this.text.length;
      this.readNode(r);
      let o = ie.get(r), l = r.nextSibling;
      if (l == t) {
        o != null && o.breakAfter && !l && i != this.view.contentDOM && this.lineBreak();
        break;
      }
      let a = ie.get(l);
      (o && a ? o.breakAfter : (o ? o.breakAfter : nr(r)) || nr(l) && (r.nodeName != "BR" || o != null && o.isWidget()) && this.text.length > s) && !BO(l, t) && this.lineBreak(), r = l;
    }
    return this.findPointBefore(i, t), this;
  }
  readTextNode(e) {
    let t = e.nodeValue;
    for (let i of this.points)
      i.node == e && (i.pos = this.text.length + Math.min(i.offset, t.length));
    for (let i = 0, r = this.lineSeparator ? null : /\r\n?|\n/g; ; ) {
      let s = -1, o = 1, l;
      if (this.lineSeparator ? (s = t.indexOf(this.lineSeparator, i), o = this.lineSeparator.length) : (l = r.exec(t)) && (s = l.index, o = l[0].length), this.append(t.slice(i, s < 0 ? t.length : s)), s < 0)
        break;
      if (this.lineBreak(), o > 1)
        for (let a of this.points)
          a.node == e && a.pos > this.text.length && (a.pos -= o - 1);
      i = s + o;
    }
  }
  readNode(e) {
    let t = ie.get(e), i = t && t.overrideDOMText;
    if (i != null) {
      this.findPointInside(e, i.length);
      for (let r = i.iter(); !r.next().done; )
        r.lineBreak ? this.lineBreak() : this.append(r.value);
    } else e.nodeType == 3 ? this.readTextNode(e) : e.nodeName == "BR" ? e.nextSibling && this.lineBreak() : e.nodeType == 1 && this.readRange(e.firstChild, null);
  }
  findPointBefore(e, t) {
    for (let i of this.points)
      i.node == e && e.childNodes[i.offset] == t && (i.pos = this.text.length);
  }
  findPointInside(e, t) {
    for (let i of this.points)
      (e.nodeType == 3 ? i.node == e : e.contains(i.node)) && (i.pos = this.text.length + (LO(e, i.node, i.offset) ? t : 0));
  }
}
function LO(n, e, t) {
  for (; ; ) {
    if (!e || t < gt(e))
      return !1;
    if (e == n)
      return !0;
    t = Tt(e) + 1, e = e.parentNode;
  }
}
function BO(n, e) {
  let t;
  for (; !(n == e || !n); n = n.nextSibling) {
    let i = ie.get(n);
    if (!(i != null && i.isWidget()))
      return !1;
    i && (t || (t = [])).push(i);
  }
  if (t)
    for (let i of t) {
      let r = i.overrideDOMText;
      if (r != null && r.length)
        return !1;
    }
  return !0;
}
class jl {
  constructor(e, t) {
    this.node = e, this.offset = t, this.pos = -1;
  }
}
class IO {
  constructor(e, t, i, r) {
    this.typeOver = r, this.bounds = null, this.text = "", this.domChanged = t > -1;
    let { impreciseHead: s, impreciseAnchor: o } = e.docView;
    if (e.state.readOnly && t > -1)
      this.newSel = null;
    else if (t > -1 && (this.bounds = Yc(e.docView.tile, t, i, 0))) {
      let l = s || o ? [] : NO(e), a = new WO(l, e);
      a.readRange(this.bounds.startDOM, this.bounds.endDOM), this.text = a.text, this.newSel = GO(l, this.bounds.from);
    } else {
      let l = e.observer.selectionRange, a = s && s.node == l.focusNode && s.offset == l.focusOffset || !Hs(e.contentDOM, l.focusNode) ? e.state.selection.main.head : e.docView.posFromDOM(l.focusNode, l.focusOffset), h = o && o.node == l.anchorNode && o.offset == l.anchorOffset || !Hs(e.contentDOM, l.anchorNode) ? e.state.selection.main.anchor : e.docView.posFromDOM(l.anchorNode, l.anchorOffset), c = e.viewport;
      if ((C.ios || C.chrome) && e.state.selection.main.empty && a != h && (c.from > 0 || c.to < e.state.doc.length)) {
        let f = Math.min(a, h), u = Math.max(a, h), d = c.from - f, O = c.to - u;
        (d == 0 || d == 1 || f == 0) && (O == 0 || O == -1 || u == e.state.doc.length) && (a = 0, h = e.state.doc.length);
      }
      e.inputState.composing > -1 && e.state.selection.ranges.length > 1 ? this.newSel = e.state.selection.replaceRange(b.range(h, a)) : this.newSel = b.single(h, a);
    }
  }
}
function Yc(n, e, t, i) {
  if (n.isComposite()) {
    let r = -1, s = -1, o = -1, l = -1;
    for (let a = 0, h = i, c = i; a < n.children.length; a++) {
      let f = n.children[a], u = h + f.length;
      if (h < e && u > t)
        return Yc(f, e, t, h);
      if (u >= e && r == -1 && (r = a, s = h), h > t && f.dom.parentNode == n.dom) {
        o = a, l = c;
        break;
      }
      c = u, h = u + f.breakAfter;
    }
    return {
      from: s,
      to: l < 0 ? i + n.length : l,
      startDOM: (r ? n.children[r - 1].dom.nextSibling : null) || n.dom.firstChild,
      endDOM: o < n.children.length && o >= 0 ? n.children[o].dom : null
    };
  } else return n.isText() ? { from: i, to: i + n.length, startDOM: n.dom, endDOM: n.dom.nextSibling } : null;
}
function Vc(n, e) {
  let t, { newSel: i } = e, r = n.state.selection.main, s = n.inputState.lastKeyTime > Date.now() - 100 ? n.inputState.lastKeyCode : -1;
  if (e.bounds) {
    let { from: o, to: l } = e.bounds, a = r.from, h = null;
    (s === 8 || C.android && e.text.length < l - o) && (a = r.to, h = "end");
    let c = Ec(n.state.doc.sliceString(o, l, Mi), e.text, a - o, h);
    c && (C.chrome && s == 13 && c.toB == c.from + 2 && e.text.slice(c.from, c.toB) == Mi + Mi && c.toB--, t = {
      from: o + c.from,
      to: o + c.toA,
      insert: D.of(e.text.slice(c.from, c.toB).split(Mi))
    });
  } else i && (!n.hasFocus && n.state.facet(dt) || ar(i, r)) && (i = null);
  if (!t && !i)
    return !1;
  if (!t && e.typeOver && !r.empty && i && i.main.empty ? t = { from: r.from, to: r.to, insert: n.state.doc.slice(r.from, r.to) } : (C.mac || C.android) && t && t.from == t.to && t.from == r.head - 1 && /^\. ?$/.test(t.insert.toString()) && n.contentDOM.getAttribute("autocorrect") == "off" ? (i && t.insert.length == 2 && (i = b.single(i.main.anchor - 1, i.main.head - 1)), t = { from: t.from, to: t.to, insert: D.of([t.insert.toString().replace(".", " ")]) }) : t && t.from >= r.from && t.to <= r.to && (t.from != r.from || t.to != r.to) && r.to - r.from - (t.to - t.from) <= 4 ? t = {
    from: r.from,
    to: r.to,
    insert: n.state.doc.slice(r.from, t.from).append(t.insert).append(n.state.doc.slice(t.to, r.to))
  } : n.state.doc.lineAt(r.from).to < r.to && n.docView.lineHasWidget(r.to) && n.inputState.insertingTextAt > Date.now() - 50 ? t = {
    from: r.from,
    to: r.to,
    insert: n.state.toText(n.inputState.insertingText)
  } : C.chrome && t && t.from == t.to && t.from == r.head && t.insert.toString() == `
 ` && n.lineWrapping && (i && (i = b.single(i.main.anchor - 1, i.main.head - 1)), t = { from: r.from, to: r.to, insert: D.of([" "]) }), t)
    return Lo(n, t, i, s);
  if (i && !ar(i, r)) {
    let o = !1, l = "select";
    return n.inputState.lastSelectionTime > Date.now() - 50 && (n.inputState.lastSelectionOrigin == "select" && (o = !0), l = n.inputState.lastSelectionOrigin, l == "select.pointer" && (i = zc(n.state.facet(cn).map((a) => a(n)), i))), n.dispatch({ selection: i, scrollIntoView: o, userEvent: l }), !0;
  } else
    return !1;
}
function Lo(n, e, t, i = -1) {
  if (C.ios && n.inputState.flushIOSKey(e))
    return !0;
  let r = n.state.selection.main;
  if (C.android && (e.to == r.to && // GBoard will sometimes remove a space it just inserted
  // after a completion when you press enter
  (e.from == r.from || e.from == r.from - 1 && n.state.sliceDoc(e.from, r.from) == " ") && e.insert.length == 1 && e.insert.lines == 2 && ni(n.contentDOM, "Enter", 13) || (e.from == r.from - 1 && e.to == r.to && e.insert.length == 0 || i == 8 && e.insert.length < e.to - e.from && e.to > r.head) && ni(n.contentDOM, "Backspace", 8) || e.from == r.from && e.to == r.to + 1 && e.insert.length == 0 && ni(n.contentDOM, "Delete", 46)))
    return !0;
  let s = e.insert.toString();
  n.inputState.composing >= 0 && n.inputState.composing++;
  let o, l = () => o || (o = jO(n, e, t));
  return n.state.facet(wc).some((a) => a(n, e.from, e.to, s, l)) || n.dispatch(l()), !0;
}
function jO(n, e, t) {
  let i, r = n.state, s = r.selection.main, o = -1;
  if (e.from == e.to && e.from < s.from || e.from > s.to) {
    let a = e.from < s.from ? -1 : 1, h = a < 0 ? s.from : s.to, c = qi(r.facet(cn).map((f) => f(n)), h, a);
    e.from == c && (o = c);
  }
  if (o > -1)
    i = {
      changes: e,
      selection: b.cursor(e.from + e.insert.length, -1)
    };
  else if (e.from >= s.from && e.to <= s.to && e.to - e.from >= (s.to - s.from) / 3 && (!t || t.main.empty && t.main.from == e.from + e.insert.length) && n.inputState.composing < 0) {
    let a = s.from < e.from ? r.sliceDoc(s.from, e.from) : "", h = s.to > e.to ? r.sliceDoc(e.to, s.to) : "";
    i = r.replaceSelection(n.state.toText(a + e.insert.sliceString(0, void 0, n.state.lineBreak) + h));
  } else {
    let a = r.changes(e), h = t && t.main.to <= a.newLength ? t.main : void 0;
    if (r.selection.ranges.length > 1 && (n.inputState.composing >= 0 || n.inputState.compositionPendingChange) && e.to <= s.to + 10 && e.to >= s.to - 10) {
      let c = n.state.sliceDoc(e.from, e.to), f, u = t && Rc(n, t.main.head);
      if (u) {
        let O = e.insert.length - (e.to - e.from);
        f = { from: u.from, to: u.to - O };
      } else
        f = n.state.doc.lineAt(s.head);
      let d = s.to - e.to;
      i = r.changeByRange((O) => {
        if (O.from == s.from && O.to == s.to)
          return { changes: a, range: h || O.map(a) };
        let m = O.to - d, g = m - c.length;
        if (n.state.sliceDoc(g, m) != c || // Unfortunately, there's no way to make multiple
        // changes in the same node work without aborting
        // composition, so cursors in the composition range are
        // ignored.
        m >= f.from && g <= f.to)
          return { range: O };
        let Q = r.changes({ from: g, to: m, insert: e.insert }), S = O.to - s.to;
        return {
          changes: Q,
          range: h ? b.range(Math.max(0, h.anchor + S), Math.max(0, h.head + S)) : O.map(Q)
        };
      });
    } else
      i = {
        changes: a,
        selection: h && r.selection.replaceRange(h)
      };
  }
  let l = "input.type";
  return (n.composing || n.inputState.compositionPendingChange && n.inputState.compositionEndedAt > Date.now() - 50) && (n.inputState.compositionPendingChange = !1, l += ".compose", n.inputState.compositionFirstChange && (l += ".start", n.inputState.compositionFirstChange = !1)), r.update(i, { userEvent: l, scrollIntoView: !0 });
}
function Ec(n, e, t, i) {
  let r = Math.min(n.length, e.length), s = 0;
  for (; s < r && n.charCodeAt(s) == e.charCodeAt(s); )
    s++;
  if (s == r && n.length == e.length)
    return null;
  let o = n.length, l = e.length;
  for (; o > 0 && l > 0 && n.charCodeAt(o - 1) == e.charCodeAt(l - 1); )
    o--, l--;
  if (i == "end") {
    let a = Math.max(0, s - Math.min(o, l));
    t -= o + a - s;
  }
  if (o < s && n.length < e.length) {
    let a = t <= s && t >= o ? s - t : 0;
    s -= a, l = s + (l - o), o = s;
  } else if (l < s) {
    let a = t <= s && t >= l ? s - t : 0;
    s -= a, o = s + (o - l), l = s;
  }
  return { from: s, toA: o, toB: l };
}
function NO(n) {
  let e = [];
  if (n.root.activeElement != n.contentDOM)
    return e;
  let { anchorNode: t, anchorOffset: i, focusNode: r, focusOffset: s } = n.observer.selectionRange;
  return t && (e.push(new jl(t, i)), (r != t || s != i) && e.push(new jl(r, s))), e;
}
function GO(n, e) {
  if (n.length == 0)
    return null;
  let t = n[0].pos, i = n.length == 2 ? n[1].pos : t;
  return t > -1 && i > -1 ? b.single(t + e, i + e) : null;
}
function ar(n, e) {
  return e.head == n.main.head && e.anchor == n.main.anchor;
}
class UO {
  setSelectionOrigin(e) {
    this.lastSelectionOrigin = e, this.lastSelectionTime = Date.now();
  }
  constructor(e) {
    this.view = e, this.lastKeyCode = 0, this.lastKeyTime = 0, this.lastTouchTime = 0, this.lastFocusTime = 0, this.lastScrollTop = 0, this.lastScrollLeft = 0, this.pendingIOSKey = void 0, this.tabFocusMode = -1, this.lastSelectionOrigin = null, this.lastSelectionTime = 0, this.lastContextMenu = 0, this.scrollHandlers = [], this.handlers = /* @__PURE__ */ Object.create(null), this.composing = -1, this.compositionFirstChange = null, this.compositionEndedAt = 0, this.compositionPendingKey = !1, this.compositionPendingChange = !1, this.insertingText = "", this.insertingTextAt = 0, this.mouseSelection = null, this.draggedContent = null, this.handleEvent = this.handleEvent.bind(this), this.notifiedFocused = e.hasFocus, C.safari && e.contentDOM.addEventListener("input", () => null), C.gecko && cp(e.contentDOM.ownerDocument);
  }
  handleEvent(e) {
    !np(this.view, e) || this.ignoreDuringComposition(e) || e.type == "keydown" && this.keydown(e) || (this.view.updateState != 0 ? Promise.resolve().then(() => this.runHandlers(e.type, e)) : this.runHandlers(e.type, e));
  }
  runHandlers(e, t) {
    let i = this.handlers[e];
    if (i) {
      for (let r of i.observers)
        r(this.view, t);
      for (let r of i.handlers) {
        if (t.defaultPrevented)
          break;
        if (r(this.view, t)) {
          t.preventDefault();
          break;
        }
      }
    }
  }
  ensureHandlers(e) {
    let t = FO(e), i = this.handlers, r = this.view.contentDOM;
    for (let s in t)
      if (s != "scroll") {
        let o = !t[s].handlers.length, l = i[s];
        l && o != !l.handlers.length && (r.removeEventListener(s, this.handleEvent), l = null), l || r.addEventListener(s, this.handleEvent, { passive: o });
      }
    for (let s in i)
      s != "scroll" && !t[s] && r.removeEventListener(s, this.handleEvent);
    this.handlers = t;
  }
  keydown(e) {
    if (this.lastKeyCode = e.keyCode, this.lastKeyTime = Date.now(), e.keyCode == 9 && this.tabFocusMode > -1 && (!this.tabFocusMode || Date.now() <= this.tabFocusMode))
      return !0;
    if (this.tabFocusMode > 0 && e.keyCode != 27 && Dc.indexOf(e.keyCode) < 0 && (this.tabFocusMode = -1), C.android && C.chrome && !e.synthetic && (e.keyCode == 13 || e.keyCode == 8))
      return this.view.observer.delayAndroidKey(e.key, e.keyCode), !0;
    let t;
    return C.ios && !e.synthetic && !e.altKey && !e.metaKey && ((t = _c.find((i) => i.keyCode == e.keyCode)) && !e.ctrlKey || HO.indexOf(e.key) > -1 && e.ctrlKey && !e.shiftKey) ? (this.pendingIOSKey = t || e, setTimeout(() => this.flushIOSKey(), 250), !0) : (e.keyCode != 229 && this.view.observer.forceFlush(), !1);
  }
  flushIOSKey(e) {
    let t = this.pendingIOSKey;
    return !t || t.key == "Enter" && e && e.from < e.to && /^\S+$/.test(e.insert.toString()) ? !1 : (this.pendingIOSKey = void 0, ni(this.view.contentDOM, t.key, t.keyCode, t instanceof KeyboardEvent ? t : void 0));
  }
  ignoreDuringComposition(e) {
    return !/^key/.test(e.type) || e.synthetic ? !1 : this.composing > 0 ? !0 : C.safari && !C.ios && this.compositionPendingKey && Date.now() - this.compositionEndedAt < 100 ? (this.compositionPendingKey = !1, !0) : !1;
  }
  startMouseSelection(e) {
    this.mouseSelection && this.mouseSelection.destroy(), this.mouseSelection = e;
  }
  update(e) {
    this.view.observer.update(e), this.mouseSelection && this.mouseSelection.update(e), this.draggedContent && e.docChanged && (this.draggedContent = this.draggedContent.map(e.changes)), e.transactions.length && (this.lastKeyCode = this.lastSelectionTime = 0);
  }
  destroy() {
    this.mouseSelection && this.mouseSelection.destroy();
  }
}
function Nl(n, e) {
  return (t, i) => {
    try {
      return e.call(n, i, t);
    } catch (r) {
      we(t.state, r);
    }
  };
}
function FO(n) {
  let e = /* @__PURE__ */ Object.create(null);
  function t(i) {
    return e[i] || (e[i] = { observers: [], handlers: [] });
  }
  for (let i of n) {
    let r = i.spec, s = r && r.plugin.domEventHandlers, o = r && r.plugin.domEventObservers;
    if (s)
      for (let l in s) {
        let a = s[l];
        a && t(l).handlers.push(Nl(i.value, a));
      }
    if (o)
      for (let l in o) {
        let a = o[l];
        a && t(l).observers.push(Nl(i.value, a));
      }
  }
  for (let i in Be)
    t(i).handlers.push(Be[i]);
  for (let i in _e)
    t(i).observers.push(_e[i]);
  return e;
}
const _c = [
  { key: "Backspace", keyCode: 8, inputType: "deleteContentBackward" },
  { key: "Enter", keyCode: 13, inputType: "insertParagraph" },
  { key: "Enter", keyCode: 13, inputType: "insertLineBreak" },
  { key: "Delete", keyCode: 46, inputType: "deleteContentForward" }
], HO = "dthko", Dc = [16, 17, 18, 20, 91, 92, 224, 225], wn = 6;
function kn(n) {
  return Math.max(0, n) * 0.7 + 8;
}
function KO(n, e) {
  return Math.max(Math.abs(n.clientX - e.clientX), Math.abs(n.clientY - e.clientY));
}
class JO {
  constructor(e, t, i, r) {
    this.view = e, this.startEvent = t, this.style = i, this.mustSelect = r, this.scrollSpeed = { x: 0, y: 0 }, this.scrolling = -1, this.lastEvent = t, this.scrollParents = tO(e.contentDOM), this.atoms = e.state.facet(cn).map((o) => o(e));
    let s = e.contentDOM.ownerDocument;
    s.addEventListener("mousemove", this.move = this.move.bind(this)), s.addEventListener("mouseup", this.up = this.up.bind(this)), this.extend = t.shiftKey, this.multiple = e.state.facet(_.allowMultipleSelections) && ep(e, t), this.dragging = ip(e, t) && Lc(t) == 1 ? null : !1;
  }
  start(e) {
    this.dragging === !1 && this.select(e);
  }
  move(e) {
    if (e.buttons == 0)
      return this.destroy();
    if (this.dragging || this.dragging == null && KO(this.startEvent, e) < 10)
      return;
    this.select(this.lastEvent = e);
    let t = 0, i = 0, r = 0, s = 0, o = this.view.win.innerWidth, l = this.view.win.innerHeight;
    this.scrollParents.x && ({ left: r, right: o } = this.scrollParents.x.getBoundingClientRect()), this.scrollParents.y && ({ top: s, bottom: l } = this.scrollParents.y.getBoundingClientRect());
    let a = Wo(this.view);
    e.clientX - a.left <= r + wn ? t = -kn(r - e.clientX) : e.clientX + a.right >= o - wn && (t = kn(e.clientX - o)), e.clientY - a.top <= s + wn ? i = -kn(s - e.clientY) : e.clientY + a.bottom >= l - wn && (i = kn(e.clientY - l)), this.setScrollSpeed(t, i);
  }
  up(e) {
    this.dragging == null && this.select(this.lastEvent), this.dragging || e.preventDefault(), this.destroy();
  }
  destroy() {
    this.setScrollSpeed(0, 0);
    let e = this.view.contentDOM.ownerDocument;
    e.removeEventListener("mousemove", this.move), e.removeEventListener("mouseup", this.up), this.view.inputState.mouseSelection = this.view.inputState.draggedContent = null;
  }
  setScrollSpeed(e, t) {
    this.scrollSpeed = { x: e, y: t }, e || t ? this.scrolling < 0 && (this.scrolling = setInterval(() => this.scroll(), 50)) : this.scrolling > -1 && (clearInterval(this.scrolling), this.scrolling = -1);
  }
  scroll() {
    let { x: e, y: t } = this.scrollSpeed;
    e && this.scrollParents.x && (this.scrollParents.x.scrollLeft += e, e = 0), t && this.scrollParents.y && (this.scrollParents.y.scrollTop += t, t = 0), (e || t) && this.view.win.scrollBy(e, t), this.dragging === !1 && this.select(this.lastEvent);
  }
  select(e) {
    let { view: t } = this, i = zc(this.atoms, this.style.get(e, this.extend, this.multiple));
    (this.mustSelect || !i.eq(t.state.selection, this.dragging === !1)) && this.view.dispatch({
      selection: i,
      userEvent: "select.pointer"
    }), this.mustSelect = !1;
  }
  update(e) {
    e.transactions.some((t) => t.isUserEvent("input.type")) ? this.destroy() : this.style.update(e) && setTimeout(() => this.select(this.lastEvent), 20);
  }
}
function ep(n, e) {
  let t = n.state.facet(bc);
  return t.length ? t[0](e) : C.mac ? e.metaKey : e.ctrlKey;
}
function tp(n, e) {
  let t = n.state.facet(Sc);
  return t.length ? t[0](e) : C.mac ? !e.altKey : !e.ctrlKey;
}
function ip(n, e) {
  let { main: t } = n.state.selection;
  if (t.empty)
    return !1;
  let i = Ni(n.root);
  if (!i || i.rangeCount == 0)
    return !0;
  let r = i.getRangeAt(0).getClientRects();
  for (let s = 0; s < r.length; s++) {
    let o = r[s];
    if (o.left <= e.clientX && o.right >= e.clientX && o.top <= e.clientY && o.bottom >= e.clientY)
      return !0;
  }
  return !1;
}
function np(n, e) {
  if (!e.bubbles)
    return !0;
  if (e.defaultPrevented)
    return !1;
  for (let t = e.target, i; t != n.contentDOM; t = t.parentNode)
    if (!t || t.nodeType == 11 || (i = ie.get(t)) && i.isWidget() && !i.isHidden && i.widget.ignoreEvent(e))
      return !1;
  return !0;
}
const Be = /* @__PURE__ */ Object.create(null), _e = /* @__PURE__ */ Object.create(null), qc = C.ie && C.ie_version < 15 || C.ios && C.webkit_version < 604;
function rp(n) {
  let e = n.dom.parentNode;
  if (!e)
    return;
  let t = e.appendChild(document.createElement("textarea"));
  t.style.cssText = "position: fixed; left: -10000px; top: 10px", t.focus(), setTimeout(() => {
    n.focus(), t.remove(), Wc(n, t.value);
  }, 50);
}
function Yr(n, e, t) {
  for (let i of n.facet(e))
    t = i(t, n);
  return t;
}
function Wc(n, e) {
  e = Yr(n.state, Eo, e);
  let { state: t } = n, i, r = 1, s = t.toText(e), o = s.lines == t.selection.ranges.length;
  if (so != null && t.selection.ranges.every((a) => a.empty) && so == s.toString()) {
    let a = -1;
    i = t.changeByRange((h) => {
      let c = t.doc.lineAt(h.from);
      if (c.from == a)
        return { range: h };
      a = c.from;
      let f = t.toText((o ? s.line(r++).text : e) + t.lineBreak);
      return {
        changes: { from: c.from, insert: f },
        range: b.cursor(h.from + f.length)
      };
    });
  } else o ? i = t.changeByRange((a) => {
    let h = s.line(r++);
    return {
      changes: { from: a.from, to: a.to, insert: h.text },
      range: b.cursor(a.from + h.length)
    };
  }) : i = t.replaceSelection(s);
  n.dispatch(i, {
    userEvent: "input.paste",
    scrollIntoView: !0
  });
}
_e.scroll = (n) => {
  n.inputState.lastScrollTop = n.scrollDOM.scrollTop, n.inputState.lastScrollLeft = n.scrollDOM.scrollLeft;
};
Be.keydown = (n, e) => (n.inputState.setSelectionOrigin("select"), e.keyCode == 27 && n.inputState.tabFocusMode != 0 && (n.inputState.tabFocusMode = Date.now() + 2e3), !1);
_e.touchstart = (n, e) => {
  n.inputState.lastTouchTime = Date.now(), n.inputState.setSelectionOrigin("select.pointer");
};
_e.touchmove = (n) => {
  n.inputState.setSelectionOrigin("select.pointer");
};
Be.mousedown = (n, e) => {
  if (n.observer.flush(), n.inputState.lastTouchTime > Date.now() - 2e3)
    return !1;
  let t = null;
  for (let i of n.state.facet(yc))
    if (t = i(n, e), t)
      break;
  if (!t && e.button == 0 && (t = op(n, e)), t) {
    let i = !n.hasFocus;
    n.inputState.startMouseSelection(new JO(n, e, t, i)), i && n.observer.ignore(() => {
      cc(n.contentDOM);
      let s = n.root.activeElement;
      s && !s.contains(n.contentDOM) && s.blur();
    });
    let r = n.inputState.mouseSelection;
    if (r)
      return r.start(e), r.dragging === !1;
  } else
    n.inputState.setSelectionOrigin("select.pointer");
  return !1;
};
function Gl(n, e, t, i) {
  if (i == 1)
    return b.cursor(e, t);
  if (i == 2)
    return YO(n.state, e, t);
  {
    let r = n.docView.lineAt(e, t), s = n.state.doc.lineAt(r ? r.posAtEnd : e), o = r ? r.posAtStart : s.from, l = r ? r.posAtEnd : s.to;
    return l < n.state.doc.length && l == s.to && l++, b.range(o, l);
  }
}
const sp = C.ie && C.ie_version <= 11;
let Ul = null, Fl = 0, Hl = 0;
function Lc(n) {
  if (!sp)
    return n.detail;
  let e = Ul, t = Hl;
  return Ul = n, Hl = Date.now(), Fl = !e || t > Date.now() - 400 && Math.abs(e.clientX - n.clientX) < 2 && Math.abs(e.clientY - n.clientY) < 2 ? (Fl + 1) % 3 : 1;
}
function op(n, e) {
  let t = n.posAndSideAtCoords({ x: e.clientX, y: e.clientY }, !1), i = Lc(e), r = n.state.selection;
  return {
    update(s) {
      s.docChanged && (t.pos = s.changes.mapPos(t.pos), r = r.map(s.changes));
    },
    get(s, o, l) {
      let a = n.posAndSideAtCoords({ x: s.clientX, y: s.clientY }, !1), h, c = Gl(n, a.pos, a.assoc, i);
      if (t.pos != a.pos && !o) {
        let f = Gl(n, t.pos, t.assoc, i), u = Math.min(f.from, c.from), d = Math.max(f.to, c.to);
        c = u < c.from ? b.range(u, d) : b.range(d, u);
      }
      return o ? r.replaceRange(r.main.extend(c.from, c.to)) : l && i == 1 && r.ranges.length > 1 && (h = lp(r, a.pos)) ? h : l ? r.addRange(c) : b.create([c]);
    }
  };
}
function lp(n, e) {
  for (let t = 0; t < n.ranges.length; t++) {
    let { from: i, to: r } = n.ranges[t];
    if (i <= e && r >= e)
      return b.create(n.ranges.slice(0, t).concat(n.ranges.slice(t + 1)), n.mainIndex == t ? 0 : n.mainIndex - (n.mainIndex > t ? 1 : 0));
  }
  return null;
}
Be.dragstart = (n, e) => {
  let { selection: { main: t } } = n.state;
  if (e.target.draggable) {
    let r = n.docView.tile.nearest(e.target);
    if (r && r.isWidget()) {
      let s = r.posAtStart, o = s + r.length;
      (s >= t.to || o <= t.from) && (t = b.range(s, o));
    }
  }
  let { inputState: i } = n;
  return i.mouseSelection && (i.mouseSelection.dragging = !0), i.draggedContent = t, e.dataTransfer && (e.dataTransfer.setData("Text", Yr(n.state, _o, n.state.sliceDoc(t.from, t.to))), e.dataTransfer.effectAllowed = "copyMove"), !1;
};
Be.dragend = (n) => (n.inputState.draggedContent = null, !1);
function Kl(n, e, t, i) {
  if (t = Yr(n.state, Eo, t), !t)
    return;
  let r = n.posAtCoords({ x: e.clientX, y: e.clientY }, !1), { draggedContent: s } = n.inputState, o = i && s && tp(n, e) ? { from: s.from, to: s.to } : null, l = { from: r, insert: t }, a = n.state.changes(o ? [o, l] : l);
  n.focus(), n.dispatch({
    changes: a,
    selection: { anchor: a.mapPos(r, -1), head: a.mapPos(r, 1) },
    userEvent: o ? "move.drop" : "input.drop"
  }), n.inputState.draggedContent = null;
}
Be.drop = (n, e) => {
  if (!e.dataTransfer)
    return !1;
  if (n.state.readOnly)
    return !0;
  let t = e.dataTransfer.files;
  if (t && t.length) {
    let i = Array(t.length), r = 0, s = () => {
      ++r == t.length && Kl(n, e, i.filter((o) => o != null).join(n.state.lineBreak), !1);
    };
    for (let o = 0; o < t.length; o++) {
      let l = new FileReader();
      l.onerror = s, l.onload = () => {
        /[\x00-\x08\x0e-\x1f]{2}/.test(l.result) || (i[o] = l.result), s();
      }, l.readAsText(t[o]);
    }
    return !0;
  } else {
    let i = e.dataTransfer.getData("Text");
    if (i)
      return Kl(n, e, i, !0), !0;
  }
  return !1;
};
Be.paste = (n, e) => {
  if (n.state.readOnly)
    return !0;
  n.observer.flush();
  let t = qc ? null : e.clipboardData;
  return t ? (Wc(n, t.getData("text/plain") || t.getData("text/uri-list")), !0) : (rp(n), !1);
};
function ap(n, e) {
  let t = n.dom.parentNode;
  if (!t)
    return;
  let i = t.appendChild(document.createElement("textarea"));
  i.style.cssText = "position: fixed; left: -10000px; top: 10px", i.value = e, i.focus(), i.selectionEnd = e.length, i.selectionStart = 0, setTimeout(() => {
    i.remove(), n.focus();
  }, 50);
}
function hp(n) {
  let e = [], t = [], i = !1;
  for (let r of n.selection.ranges)
    r.empty || (e.push(n.sliceDoc(r.from, r.to)), t.push(r));
  if (!e.length) {
    let r = -1;
    for (let { from: s } of n.selection.ranges) {
      let o = n.doc.lineAt(s);
      o.number > r && (e.push(o.text), t.push({ from: o.from, to: Math.min(n.doc.length, o.to + 1) })), r = o.number;
    }
    i = !0;
  }
  return { text: Yr(n, _o, e.join(n.lineBreak)), ranges: t, linewise: i };
}
let so = null;
Be.copy = Be.cut = (n, e) => {
  if (!_i(n.contentDOM, n.observer.selectionRange))
    return !1;
  let { text: t, ranges: i, linewise: r } = hp(n.state);
  if (!t && !r)
    return !1;
  so = r ? t : null, e.type == "cut" && !n.state.readOnly && n.dispatch({
    changes: i,
    scrollIntoView: !0,
    userEvent: "delete.cut"
  });
  let s = qc ? null : e.clipboardData;
  return s ? (s.clearData(), s.setData("text/plain", t), !0) : (ap(n, t), !1);
};
const Bc = /* @__PURE__ */ bt.define();
function Ic(n, e) {
  let t = [];
  for (let i of n.facet(kc)) {
    let r = i(n, e);
    r && t.push(r);
  }
  return t.length ? n.update({ effects: t, annotations: Bc.of(!0) }) : null;
}
function jc(n) {
  setTimeout(() => {
    let e = n.hasFocus;
    if (e != n.inputState.notifiedFocused) {
      let t = Ic(n.state, e);
      t ? n.dispatch(t) : n.update([]);
    }
  }, 10);
}
_e.focus = (n) => {
  n.inputState.lastFocusTime = Date.now(), !n.scrollDOM.scrollTop && (n.inputState.lastScrollTop || n.inputState.lastScrollLeft) && (n.scrollDOM.scrollTop = n.inputState.lastScrollTop, n.scrollDOM.scrollLeft = n.inputState.lastScrollLeft), jc(n);
};
_e.blur = (n) => {
  n.observer.clearSelectionRange(), jc(n);
};
_e.compositionstart = _e.compositionupdate = (n) => {
  n.observer.editContext || (n.inputState.compositionFirstChange == null && (n.inputState.compositionFirstChange = !0), n.inputState.composing < 0 && (n.inputState.composing = 0));
};
_e.compositionend = (n) => {
  n.observer.editContext || (n.inputState.composing = -1, n.inputState.compositionEndedAt = Date.now(), n.inputState.compositionPendingKey = !0, n.inputState.compositionPendingChange = n.observer.pendingRecords().length > 0, n.inputState.compositionFirstChange = null, C.chrome && C.android ? n.observer.flushSoon() : n.inputState.compositionPendingChange ? Promise.resolve().then(() => n.observer.flush()) : setTimeout(() => {
    n.inputState.composing < 0 && n.docView.hasComposition && n.update([]);
  }, 50));
};
_e.contextmenu = (n) => {
  n.inputState.lastContextMenu = Date.now();
};
Be.beforeinput = (n, e) => {
  var t, i;
  if ((e.inputType == "insertText" || e.inputType == "insertCompositionText") && (n.inputState.insertingText = e.data, n.inputState.insertingTextAt = Date.now()), e.inputType == "insertReplacementText" && n.observer.editContext) {
    let s = (t = e.dataTransfer) === null || t === void 0 ? void 0 : t.getData("text/plain"), o = e.getTargetRanges();
    if (s && o.length) {
      let l = o[0], a = n.posAtDOM(l.startContainer, l.startOffset), h = n.posAtDOM(l.endContainer, l.endOffset);
      return Lo(n, { from: a, to: h, insert: n.state.toText(s) }, null), !0;
    }
  }
  let r;
  if (C.chrome && C.android && (r = _c.find((s) => s.inputType == e.inputType)) && (n.observer.delayAndroidKey(r.key, r.keyCode), r.key == "Backspace" || r.key == "Delete")) {
    let s = ((i = window.visualViewport) === null || i === void 0 ? void 0 : i.height) || 0;
    setTimeout(() => {
      var o;
      (((o = window.visualViewport) === null || o === void 0 ? void 0 : o.height) || 0) > s + 10 && n.hasFocus && (n.contentDOM.blur(), n.focus());
    }, 100);
  }
  return C.ios && e.inputType == "deleteContentForward" && n.observer.flushSoon(), C.safari && e.inputType == "insertText" && n.inputState.composing >= 0 && setTimeout(() => _e.compositionend(n, e), 20), !1;
};
const Jl = /* @__PURE__ */ new Set();
function cp(n) {
  Jl.has(n) || (Jl.add(n), n.addEventListener("copy", () => {
  }), n.addEventListener("cut", () => {
  }));
}
const ea = ["pre-wrap", "normal", "pre-line", "break-spaces"];
let di = !1;
function ta() {
  di = !1;
}
class fp {
  constructor(e) {
    this.lineWrapping = e, this.doc = D.empty, this.heightSamples = {}, this.lineHeight = 14, this.charWidth = 7, this.textHeight = 14, this.lineLength = 30;
  }
  heightForGap(e, t) {
    let i = this.doc.lineAt(t).number - this.doc.lineAt(e).number + 1;
    return this.lineWrapping && (i += Math.max(0, Math.ceil((t - e - i * this.lineLength * 0.5) / this.lineLength))), this.lineHeight * i;
  }
  heightForLine(e) {
    return this.lineWrapping ? (1 + Math.max(0, Math.ceil((e - this.lineLength) / Math.max(1, this.lineLength - 5)))) * this.lineHeight : this.lineHeight;
  }
  setDoc(e) {
    return this.doc = e, this;
  }
  mustRefreshForWrapping(e) {
    return ea.indexOf(e) > -1 != this.lineWrapping;
  }
  mustRefreshForHeights(e) {
    let t = !1;
    for (let i = 0; i < e.length; i++) {
      let r = e[i];
      r < 0 ? i++ : this.heightSamples[Math.floor(r * 10)] || (t = !0, this.heightSamples[Math.floor(r * 10)] = !0);
    }
    return t;
  }
  refresh(e, t, i, r, s, o) {
    let l = ea.indexOf(e) > -1, a = Math.abs(t - this.lineHeight) > 0.3 || this.lineWrapping != l || Math.abs(i - this.charWidth) > 0.1;
    if (this.lineWrapping = l, this.lineHeight = t, this.charWidth = i, this.textHeight = r, this.lineLength = s, a) {
      this.heightSamples = {};
      for (let h = 0; h < o.length; h++) {
        let c = o[h];
        c < 0 ? h++ : this.heightSamples[Math.floor(c * 10)] = !0;
      }
    }
    return a;
  }
}
class up {
  constructor(e, t) {
    this.from = e, this.heights = t, this.index = 0;
  }
  get more() {
    return this.index < this.heights.length;
  }
}
class qe {
  /**
  @internal
  */
  constructor(e, t, i, r, s) {
    this.from = e, this.length = t, this.top = i, this.height = r, this._content = s;
  }
  /**
  The type of element this is. When querying lines, this may be
  an array of all the blocks that make up the line.
  */
  get type() {
    return typeof this._content == "number" ? fe.Text : Array.isArray(this._content) ? this._content : this._content.type;
  }
  /**
  The end of the element as a document position.
  */
  get to() {
    return this.from + this.length;
  }
  /**
  The bottom position of the element.
  */
  get bottom() {
    return this.top + this.height;
  }
  /**
  If this is a widget block, this will return the widget
  associated with it.
  */
  get widget() {
    return this._content instanceof Lt ? this._content.widget : null;
  }
  /**
  If this is a textblock, this holds the number of line breaks
  that appear in widgets inside the block.
  */
  get widgetLineBreaks() {
    return typeof this._content == "number" ? this._content : 0;
  }
  /**
  @internal
  */
  join(e) {
    let t = (Array.isArray(this._content) ? this._content : [this]).concat(Array.isArray(e._content) ? e._content : [e]);
    return new qe(this.from, this.length + e.length, this.top, this.height + e.height, t);
  }
}
var U = /* @__PURE__ */ function(n) {
  return n[n.ByPos = 0] = "ByPos", n[n.ByHeight = 1] = "ByHeight", n[n.ByPosNoHeight = 2] = "ByPosNoHeight", n;
}(U || (U = {}));
const In = 1e-3;
class ge {
  constructor(e, t, i = 2) {
    this.length = e, this.height = t, this.flags = i;
  }
  get outdated() {
    return (this.flags & 2) > 0;
  }
  set outdated(e) {
    this.flags = (e ? 2 : 0) | this.flags & -3;
  }
  setHeight(e) {
    this.height != e && (Math.abs(this.height - e) > In && (di = !0), this.height = e);
  }
  // Base case is to replace a leaf node, which simply builds a tree
  // from the new nodes and returns that (HeightMapBranch and
  // HeightMapGap override this to actually use from/to)
  replace(e, t, i) {
    return ge.of(i);
  }
  // Again, these are base cases, and are overridden for branch and gap nodes.
  decomposeLeft(e, t) {
    t.push(this);
  }
  decomposeRight(e, t) {
    t.push(this);
  }
  applyChanges(e, t, i, r) {
    let s = this, o = i.doc;
    for (let l = r.length - 1; l >= 0; l--) {
      let { fromA: a, toA: h, fromB: c, toB: f } = r[l], u = s.lineAt(a, U.ByPosNoHeight, i.setDoc(t), 0, 0), d = u.to >= h ? u : s.lineAt(h, U.ByPosNoHeight, i, 0, 0);
      for (f += d.to - h, h = d.to; l > 0 && u.from <= r[l - 1].toA; )
        a = r[l - 1].fromA, c = r[l - 1].fromB, l--, a < u.from && (u = s.lineAt(a, U.ByPosNoHeight, i, 0, 0));
      c += u.from - a, a = u.from;
      let O = Bo.build(i.setDoc(o), e, c, f);
      s = hr(s, s.replace(a, h, O));
    }
    return s.updateHeight(i, 0);
  }
  static empty() {
    return new Ce(0, 0, 0);
  }
  // nodes uses null values to indicate the position of line breaks.
  // There are never line breaks at the start or end of the array, or
  // two line breaks next to each other, and the array isn't allowed
  // to be empty (same restrictions as return value from the builder).
  static of(e) {
    if (e.length == 1)
      return e[0];
    let t = 0, i = e.length, r = 0, s = 0;
    for (; ; )
      if (t == i)
        if (r > s * 2) {
          let l = e[t - 1];
          l.break ? e.splice(--t, 1, l.left, null, l.right) : e.splice(--t, 1, l.left, l.right), i += 1 + l.break, r -= l.size;
        } else if (s > r * 2) {
          let l = e[i];
          l.break ? e.splice(i, 1, l.left, null, l.right) : e.splice(i, 1, l.left, l.right), i += 2 + l.break, s -= l.size;
        } else
          break;
      else if (r < s) {
        let l = e[t++];
        l && (r += l.size);
      } else {
        let l = e[--i];
        l && (s += l.size);
      }
    let o = 0;
    return e[t - 1] == null ? (o = 1, t--) : e[t] == null && (o = 1, i++), new Op(ge.of(e.slice(0, t)), o, ge.of(e.slice(i)));
  }
}
function hr(n, e) {
  return n == e ? n : (n.constructor != e.constructor && (di = !0), e);
}
ge.prototype.size = 1;
const dp = /* @__PURE__ */ Z.replace({});
class Nc extends ge {
  constructor(e, t, i) {
    super(e, t), this.deco = i, this.spaceAbove = 0;
  }
  mainBlock(e, t) {
    return new qe(t, this.length, e + this.spaceAbove, this.height - this.spaceAbove, this.deco || 0);
  }
  blockAt(e, t, i, r) {
    return this.spaceAbove && e < i + this.spaceAbove ? new qe(r, 0, i, this.spaceAbove, dp) : this.mainBlock(i, r);
  }
  lineAt(e, t, i, r, s) {
    let o = this.mainBlock(r, s);
    return this.spaceAbove ? this.blockAt(0, i, r, s).join(o) : o;
  }
  forEachLine(e, t, i, r, s, o) {
    e <= s + this.length && t >= s && o(this.lineAt(0, U.ByPos, i, r, s));
  }
  setMeasuredHeight(e) {
    let t = e.heights[e.index++];
    t < 0 ? (this.spaceAbove = -t, t = e.heights[e.index++]) : this.spaceAbove = 0, this.setHeight(t);
  }
  updateHeight(e, t = 0, i = !1, r) {
    return r && r.from <= t && r.more && this.setMeasuredHeight(r), this.outdated = !1, this;
  }
  toString() {
    return `block(${this.length})`;
  }
}
class Ce extends Nc {
  constructor(e, t, i) {
    super(e, t, null), this.collapsed = 0, this.widgetHeight = 0, this.breaks = 0, this.spaceAbove = i;
  }
  mainBlock(e, t) {
    return new qe(t, this.length, e + this.spaceAbove, this.height - this.spaceAbove, this.breaks);
  }
  replace(e, t, i) {
    let r = i[0];
    return i.length == 1 && (r instanceof Ce || r instanceof ae && r.flags & 4) && Math.abs(this.length - r.length) < 10 ? (r instanceof ae ? r = new Ce(r.length, this.height, this.spaceAbove) : r.height = this.height, this.outdated || (r.outdated = !1), r) : ge.of(i);
  }
  updateHeight(e, t = 0, i = !1, r) {
    return r && r.from <= t && r.more ? this.setMeasuredHeight(r) : (i || this.outdated) && (this.spaceAbove = 0, this.setHeight(Math.max(this.widgetHeight, e.heightForLine(this.length - this.collapsed)) + this.breaks * e.lineHeight)), this.outdated = !1, this;
  }
  toString() {
    return `line(${this.length}${this.collapsed ? -this.collapsed : ""}${this.widgetHeight ? ":" + this.widgetHeight : ""})`;
  }
}
class ae extends ge {
  constructor(e) {
    super(e, 0);
  }
  heightMetrics(e, t) {
    let i = e.doc.lineAt(t).number, r = e.doc.lineAt(t + this.length).number, s = r - i + 1, o, l = 0;
    if (e.lineWrapping) {
      let a = Math.min(this.height, e.lineHeight * s);
      o = a / s, this.length > s + 1 && (l = (this.height - a) / (this.length - s - 1));
    } else
      o = this.height / s;
    return { firstLine: i, lastLine: r, perLine: o, perChar: l };
  }
  blockAt(e, t, i, r) {
    let { firstLine: s, lastLine: o, perLine: l, perChar: a } = this.heightMetrics(t, r);
    if (t.lineWrapping) {
      let h = r + (e < t.lineHeight ? 0 : Math.round(Math.max(0, Math.min(1, (e - i) / this.height)) * this.length)), c = t.doc.lineAt(h), f = l + c.length * a, u = Math.max(i, e - f / 2);
      return new qe(c.from, c.length, u, f, 0);
    } else {
      let h = Math.max(0, Math.min(o - s, Math.floor((e - i) / l))), { from: c, length: f } = t.doc.line(s + h);
      return new qe(c, f, i + l * h, l, 0);
    }
  }
  lineAt(e, t, i, r, s) {
    if (t == U.ByHeight)
      return this.blockAt(e, i, r, s);
    if (t == U.ByPosNoHeight) {
      let { from: d, to: O } = i.doc.lineAt(e);
      return new qe(d, O - d, 0, 0, 0);
    }
    let { firstLine: o, perLine: l, perChar: a } = this.heightMetrics(i, s), h = i.doc.lineAt(e), c = l + h.length * a, f = h.number - o, u = r + l * f + a * (h.from - s - f);
    return new qe(h.from, h.length, Math.max(r, Math.min(u, r + this.height - c)), c, 0);
  }
  forEachLine(e, t, i, r, s, o) {
    e = Math.max(e, s), t = Math.min(t, s + this.length);
    let { firstLine: l, perLine: a, perChar: h } = this.heightMetrics(i, s);
    for (let c = e, f = r; c <= t; ) {
      let u = i.doc.lineAt(c);
      if (c == e) {
        let O = u.number - l;
        f += a * O + h * (e - s - O);
      }
      let d = a + h * u.length;
      o(new qe(u.from, u.length, f, d, 0)), f += d, c = u.to + 1;
    }
  }
  replace(e, t, i) {
    let r = this.length - t;
    if (r > 0) {
      let s = i[i.length - 1];
      s instanceof ae ? i[i.length - 1] = new ae(s.length + r) : i.push(null, new ae(r - 1));
    }
    if (e > 0) {
      let s = i[0];
      s instanceof ae ? i[0] = new ae(e + s.length) : i.unshift(new ae(e - 1), null);
    }
    return ge.of(i);
  }
  decomposeLeft(e, t) {
    t.push(new ae(e - 1), null);
  }
  decomposeRight(e, t) {
    t.push(null, new ae(this.length - e - 1));
  }
  updateHeight(e, t = 0, i = !1, r) {
    let s = t + this.length;
    if (r && r.from <= t + this.length && r.more) {
      let o = [], l = Math.max(t, r.from), a = -1;
      for (r.from > t && o.push(new ae(r.from - t - 1).updateHeight(e, t)); l <= s && r.more; ) {
        let c = e.doc.lineAt(l).length;
        o.length && o.push(null);
        let f = r.heights[r.index++], u = 0;
        f < 0 && (u = -f, f = r.heights[r.index++]), a == -1 ? a = f : Math.abs(f - a) >= In && (a = -2);
        let d = new Ce(c, f, u);
        d.outdated = !1, o.push(d), l += c + 1;
      }
      l <= s && o.push(null, new ae(s - l).updateHeight(e, l));
      let h = ge.of(o);
      return (a < 0 || Math.abs(h.height - this.height) >= In || Math.abs(a - this.heightMetrics(e, t).perLine) >= In) && (di = !0), hr(this, h);
    } else (i || this.outdated) && (this.setHeight(e.heightForGap(t, t + this.length)), this.outdated = !1);
    return this;
  }
  toString() {
    return `gap(${this.length})`;
  }
}
class Op extends ge {
  constructor(e, t, i) {
    super(e.length + t + i.length, e.height + i.height, t | (e.outdated || i.outdated ? 2 : 0)), this.left = e, this.right = i, this.size = e.size + i.size;
  }
  get break() {
    return this.flags & 1;
  }
  blockAt(e, t, i, r) {
    let s = i + this.left.height;
    return e < s ? this.left.blockAt(e, t, i, r) : this.right.blockAt(e, t, s, r + this.left.length + this.break);
  }
  lineAt(e, t, i, r, s) {
    let o = r + this.left.height, l = s + this.left.length + this.break, a = t == U.ByHeight ? e < o : e < l, h = a ? this.left.lineAt(e, t, i, r, s) : this.right.lineAt(e, t, i, o, l);
    if (this.break || (a ? h.to < l : h.from > l))
      return h;
    let c = t == U.ByPosNoHeight ? U.ByPosNoHeight : U.ByPos;
    return a ? h.join(this.right.lineAt(l, c, i, o, l)) : this.left.lineAt(l, c, i, r, s).join(h);
  }
  forEachLine(e, t, i, r, s, o) {
    let l = r + this.left.height, a = s + this.left.length + this.break;
    if (this.break)
      e < a && this.left.forEachLine(e, t, i, r, s, o), t >= a && this.right.forEachLine(e, t, i, l, a, o);
    else {
      let h = this.lineAt(a, U.ByPos, i, r, s);
      e < h.from && this.left.forEachLine(e, h.from - 1, i, r, s, o), h.to >= e && h.from <= t && o(h), t > h.to && this.right.forEachLine(h.to + 1, t, i, l, a, o);
    }
  }
  replace(e, t, i) {
    let r = this.left.length + this.break;
    if (t < r)
      return this.balanced(this.left.replace(e, t, i), this.right);
    if (e > this.left.length)
      return this.balanced(this.left, this.right.replace(e - r, t - r, i));
    let s = [];
    e > 0 && this.decomposeLeft(e, s);
    let o = s.length;
    for (let l of i)
      s.push(l);
    if (e > 0 && ia(s, o - 1), t < this.length) {
      let l = s.length;
      this.decomposeRight(t, s), ia(s, l);
    }
    return ge.of(s);
  }
  decomposeLeft(e, t) {
    let i = this.left.length;
    if (e <= i)
      return this.left.decomposeLeft(e, t);
    t.push(this.left), this.break && (i++, e >= i && t.push(null)), e > i && this.right.decomposeLeft(e - i, t);
  }
  decomposeRight(e, t) {
    let i = this.left.length, r = i + this.break;
    if (e >= r)
      return this.right.decomposeRight(e - r, t);
    e < i && this.left.decomposeRight(e, t), this.break && e < r && t.push(null), t.push(this.right);
  }
  balanced(e, t) {
    return e.size > 2 * t.size || t.size > 2 * e.size ? ge.of(this.break ? [e, null, t] : [e, t]) : (this.left = hr(this.left, e), this.right = hr(this.right, t), this.setHeight(e.height + t.height), this.outdated = e.outdated || t.outdated, this.size = e.size + t.size, this.length = e.length + this.break + t.length, this);
  }
  updateHeight(e, t = 0, i = !1, r) {
    let { left: s, right: o } = this, l = t + s.length + this.break, a = null;
    return r && r.from <= t + s.length && r.more ? a = s = s.updateHeight(e, t, i, r) : s.updateHeight(e, t, i), r && r.from <= l + o.length && r.more ? a = o = o.updateHeight(e, l, i, r) : o.updateHeight(e, l, i), a ? this.balanced(s, o) : (this.height = this.left.height + this.right.height, this.outdated = !1, this);
  }
  toString() {
    return this.left + (this.break ? " " : "-") + this.right;
  }
}
function ia(n, e) {
  let t, i;
  n[e] == null && (t = n[e - 1]) instanceof ae && (i = n[e + 1]) instanceof ae && n.splice(e - 1, 3, new ae(t.length + 1 + i.length));
}
const pp = 5;
class Bo {
  constructor(e, t) {
    this.pos = e, this.oracle = t, this.nodes = [], this.lineStart = -1, this.lineEnd = -1, this.covering = null, this.writtenTo = e;
  }
  get isCovered() {
    return this.covering && this.nodes[this.nodes.length - 1] == this.covering;
  }
  span(e, t) {
    if (this.lineStart > -1) {
      let i = Math.min(t, this.lineEnd), r = this.nodes[this.nodes.length - 1];
      r instanceof Ce ? r.length += i - this.pos : (i > this.pos || !this.isCovered) && this.nodes.push(new Ce(i - this.pos, -1, 0)), this.writtenTo = i, t > i && (this.nodes.push(null), this.writtenTo++, this.lineStart = -1);
    }
    this.pos = t;
  }
  point(e, t, i) {
    if (e < t || i.heightRelevant) {
      let r = i.widget ? i.widget.estimatedHeight : 0, s = i.widget ? i.widget.lineBreaks : 0;
      r < 0 && (r = this.oracle.lineHeight);
      let o = t - e;
      i.block ? this.addBlock(new Nc(o, r, i)) : (o || s || r >= pp) && this.addLineDeco(r, s, o);
    } else t > e && this.span(e, t);
    this.lineEnd > -1 && this.lineEnd < this.pos && (this.lineEnd = this.oracle.doc.lineAt(this.pos).to);
  }
  enterLine() {
    if (this.lineStart > -1)
      return;
    let { from: e, to: t } = this.oracle.doc.lineAt(this.pos);
    this.lineStart = e, this.lineEnd = t, this.writtenTo < e && ((this.writtenTo < e - 1 || this.nodes[this.nodes.length - 1] == null) && this.nodes.push(this.blankContent(this.writtenTo, e - 1)), this.nodes.push(null)), this.pos > e && this.nodes.push(new Ce(this.pos - e, -1, 0)), this.writtenTo = this.pos;
  }
  blankContent(e, t) {
    let i = new ae(t - e);
    return this.oracle.doc.lineAt(e).to == t && (i.flags |= 4), i;
  }
  ensureLine() {
    this.enterLine();
    let e = this.nodes.length ? this.nodes[this.nodes.length - 1] : null;
    if (e instanceof Ce)
      return e;
    let t = new Ce(0, -1, 0);
    return this.nodes.push(t), t;
  }
  addBlock(e) {
    this.enterLine();
    let t = e.deco;
    t && t.startSide > 0 && !this.isCovered && this.ensureLine(), this.nodes.push(e), this.writtenTo = this.pos = this.pos + e.length, t && t.endSide > 0 && (this.covering = e);
  }
  addLineDeco(e, t, i) {
    let r = this.ensureLine();
    r.length += i, r.collapsed += i, r.widgetHeight = Math.max(r.widgetHeight, e), r.breaks += t, this.writtenTo = this.pos = this.pos + i;
  }
  finish(e) {
    let t = this.nodes.length == 0 ? null : this.nodes[this.nodes.length - 1];
    this.lineStart > -1 && !(t instanceof Ce) && !this.isCovered ? this.nodes.push(new Ce(0, -1, 0)) : (this.writtenTo < this.pos || t == null) && this.nodes.push(this.blankContent(this.writtenTo, this.pos));
    let i = e;
    for (let r of this.nodes)
      r instanceof Ce && r.updateHeight(this.oracle, i), i += r ? r.length : 1;
    return this.nodes;
  }
  // Always called with a region that on both sides either stretches
  // to a line break or the end of the document.
  // The returned array uses null to indicate line breaks, but never
  // starts or ends in a line break, or has multiple line breaks next
  // to each other.
  static build(e, t, i, r) {
    let s = new Bo(i, e);
    return E.spans(t, i, r, s, 0), s.finish(i);
  }
}
function mp(n, e, t) {
  let i = new gp();
  return E.compare(n, e, t, i, 0), i.changes;
}
class gp {
  constructor() {
    this.changes = [];
  }
  compareRange() {
  }
  comparePoint(e, t, i, r) {
    (e < t || i && i.heightRelevant || r && r.heightRelevant) && ii(e, t, this.changes, 5);
  }
}
function Qp(n, e) {
  let t = n.getBoundingClientRect(), i = n.ownerDocument, r = i.defaultView || window, s = Math.max(0, t.left), o = Math.min(r.innerWidth, t.right), l = Math.max(0, t.top), a = Math.min(r.innerHeight, t.bottom);
  for (let h = n.parentNode; h && h != i.body; )
    if (h.nodeType == 1) {
      let c = h, f = window.getComputedStyle(c);
      if ((c.scrollHeight > c.clientHeight || c.scrollWidth > c.clientWidth) && f.overflow != "visible") {
        let u = c.getBoundingClientRect();
        s = Math.max(s, u.left), o = Math.min(o, u.right), l = Math.max(l, u.top), a = Math.min(h == n.parentNode ? r.innerHeight : a, u.bottom);
      }
      h = f.position == "absolute" || f.position == "fixed" ? c.offsetParent : c.parentNode;
    } else if (h.nodeType == 11)
      h = h.host;
    else
      break;
  return {
    left: s - t.left,
    right: Math.max(s, o) - t.left,
    top: l - (t.top + e),
    bottom: Math.max(l, a) - (t.top + e)
  };
}
function bp(n) {
  let e = n.getBoundingClientRect(), t = n.ownerDocument.defaultView || window;
  return e.left < t.innerWidth && e.right > 0 && e.top < t.innerHeight && e.bottom > 0;
}
function Sp(n, e) {
  let t = n.getBoundingClientRect();
  return {
    left: 0,
    right: t.right - t.left,
    top: e,
    bottom: t.bottom - (t.top + e)
  };
}
class ns {
  constructor(e, t, i, r) {
    this.from = e, this.to = t, this.size = i, this.displaySize = r;
  }
  static same(e, t) {
    if (e.length != t.length)
      return !1;
    for (let i = 0; i < e.length; i++) {
      let r = e[i], s = t[i];
      if (r.from != s.from || r.to != s.to || r.size != s.size)
        return !1;
    }
    return !0;
  }
  draw(e, t) {
    return Z.replace({
      widget: new yp(this.displaySize * (t ? e.scaleY : e.scaleX), t)
    }).range(this.from, this.to);
  }
}
class yp extends ht {
  constructor(e, t) {
    super(), this.size = e, this.vertical = t;
  }
  eq(e) {
    return e.size == this.size && e.vertical == this.vertical;
  }
  toDOM() {
    let e = document.createElement("div");
    return this.vertical ? e.style.height = this.size + "px" : (e.style.width = this.size + "px", e.style.height = "2px", e.style.display = "inline-block"), e;
  }
  get estimatedHeight() {
    return this.vertical ? this.size : -1;
  }
}
class na {
  constructor(e) {
    this.state = e, this.pixelViewport = { left: 0, right: window.innerWidth, top: 0, bottom: 0 }, this.inView = !0, this.paddingTop = 0, this.paddingBottom = 0, this.contentDOMWidth = 0, this.contentDOMHeight = 0, this.editorHeight = 0, this.editorWidth = 0, this.scrollTop = 0, this.scrolledToBottom = !1, this.scaleX = 1, this.scaleY = 1, this.scrollAnchorPos = 0, this.scrollAnchorHeight = -1, this.scaler = ra, this.scrollTarget = null, this.printing = !1, this.mustMeasureContent = !0, this.defaultTextDirection = N.LTR, this.visibleRanges = [], this.mustEnforceCursorAssoc = !1;
    let t = e.facet(Do).some((i) => typeof i != "function" && i.class == "cm-lineWrapping");
    this.heightOracle = new fp(t), this.stateDeco = sa(e), this.heightMap = ge.empty().applyChanges(this.stateDeco, D.empty, this.heightOracle.setDoc(e.doc), [new ze(0, 0, 0, e.doc.length)]);
    for (let i = 0; i < 2 && (this.viewport = this.getViewport(0, null), !!this.updateForViewport()); i++)
      ;
    this.updateViewportLines(), this.lineGaps = this.ensureLineGaps([]), this.lineGapDeco = Z.set(this.lineGaps.map((i) => i.draw(this, !1))), this.computeVisibleRanges();
  }
  updateForViewport() {
    let e = [this.viewport], { main: t } = this.state.selection;
    for (let i = 0; i <= 1; i++) {
      let r = i ? t.head : t.anchor;
      if (!e.some(({ from: s, to: o }) => r >= s && r <= o)) {
        let { from: s, to: o } = this.lineBlockAt(r);
        e.push(new $n(s, o));
      }
    }
    return this.viewports = e.sort((i, r) => i.from - r.from), this.updateScaler();
  }
  updateScaler() {
    let e = this.scaler;
    return this.scaler = this.heightMap.height <= 7e6 ? ra : new Io(this.heightOracle, this.heightMap, this.viewports), e.eq(this.scaler) ? 0 : 2;
  }
  updateViewportLines() {
    this.viewportLines = [], this.heightMap.forEachLine(this.viewport.from, this.viewport.to, this.heightOracle.setDoc(this.state.doc), 0, 0, (e) => {
      this.viewportLines.push(Ri(e, this.scaler));
    });
  }
  update(e, t = null) {
    this.state = e.state;
    let i = this.stateDeco;
    this.stateDeco = sa(this.state);
    let r = e.changedRanges, s = ze.extendWithRanges(r, mp(i, this.stateDeco, e ? e.changes : ne.empty(this.state.doc.length))), o = this.heightMap.height, l = this.scrolledToBottom ? null : this.scrollAnchorAt(this.scrollTop);
    ta(), this.heightMap = this.heightMap.applyChanges(this.stateDeco, e.startState.doc, this.heightOracle.setDoc(this.state.doc), s), (this.heightMap.height != o || di) && (e.flags |= 2), l ? (this.scrollAnchorPos = e.changes.mapPos(l.from, -1), this.scrollAnchorHeight = l.top) : (this.scrollAnchorPos = -1, this.scrollAnchorHeight = o);
    let a = s.length ? this.mapViewport(this.viewport, e.changes) : this.viewport;
    (t && (t.range.head < a.from || t.range.head > a.to) || !this.viewportIsAppropriate(a)) && (a = this.getViewport(0, t));
    let h = a.from != this.viewport.from || a.to != this.viewport.to;
    this.viewport = a, e.flags |= this.updateForViewport(), (h || !e.changes.empty || e.flags & 2) && this.updateViewportLines(), (this.lineGaps.length || this.viewport.to - this.viewport.from > 4e3) && this.updateLineGaps(this.ensureLineGaps(this.mapLineGaps(this.lineGaps, e.changes))), e.flags |= this.computeVisibleRanges(e.changes), t && (this.scrollTarget = t), !this.mustEnforceCursorAssoc && (e.selectionSet || e.focusChanged) && e.view.lineWrapping && e.state.selection.main.empty && e.state.selection.main.assoc && !e.state.facet(Pc) && (this.mustEnforceCursorAssoc = !0);
  }
  measure(e) {
    let t = e.contentDOM, i = window.getComputedStyle(t), r = this.heightOracle, s = i.whiteSpace;
    this.defaultTextDirection = i.direction == "rtl" ? N.RTL : N.LTR;
    let o = this.heightOracle.mustRefreshForWrapping(s) || this.mustMeasureContent === "refresh", l = t.getBoundingClientRect(), a = o || this.mustMeasureContent || this.contentDOMHeight != l.height;
    this.contentDOMHeight = l.height, this.mustMeasureContent = !1;
    let h = 0, c = 0;
    if (l.width && l.height) {
      let { scaleX: k, scaleY: x } = hc(t, l);
      (k > 5e-3 && Math.abs(this.scaleX - k) > 5e-3 || x > 5e-3 && Math.abs(this.scaleY - x) > 5e-3) && (this.scaleX = k, this.scaleY = x, h |= 16, o = a = !0);
    }
    let f = (parseInt(i.paddingTop) || 0) * this.scaleY, u = (parseInt(i.paddingBottom) || 0) * this.scaleY;
    (this.paddingTop != f || this.paddingBottom != u) && (this.paddingTop = f, this.paddingBottom = u, h |= 18), this.editorWidth != e.scrollDOM.clientWidth && (r.lineWrapping && (a = !0), this.editorWidth = e.scrollDOM.clientWidth, h |= 16);
    let d = e.scrollDOM.scrollTop * this.scaleY;
    this.scrollTop != d && (this.scrollAnchorHeight = -1, this.scrollTop = d), this.scrolledToBottom = fc(e.scrollDOM);
    let O = (this.printing ? Sp : Qp)(t, this.paddingTop), m = O.top - this.pixelViewport.top, g = O.bottom - this.pixelViewport.bottom;
    this.pixelViewport = O;
    let Q = this.pixelViewport.bottom > this.pixelViewport.top && this.pixelViewport.right > this.pixelViewport.left;
    if (Q != this.inView && (this.inView = Q, Q && (a = !0)), !this.inView && !this.scrollTarget && !bp(e.dom))
      return 0;
    let S = l.width;
    if ((this.contentDOMWidth != S || this.editorHeight != e.scrollDOM.clientHeight) && (this.contentDOMWidth = l.width, this.editorHeight = e.scrollDOM.clientHeight, h |= 16), a) {
      let k = e.docView.measureVisibleLineHeights(this.viewport);
      if (r.mustRefreshForHeights(k) && (o = !0), o || r.lineWrapping && Math.abs(S - this.contentDOMWidth) > r.charWidth) {
        let { lineHeight: x, charWidth: $, textHeight: w } = e.docView.measureTextSize();
        o = x > 0 && r.refresh(s, x, $, w, Math.max(5, S / $), k), o && (e.docView.minWidth = 0, h |= 16);
      }
      m > 0 && g > 0 ? c = Math.max(m, g) : m < 0 && g < 0 && (c = Math.min(m, g)), ta();
      for (let x of this.viewports) {
        let $ = x.from == this.viewport.from ? k : e.docView.measureVisibleLineHeights(x);
        this.heightMap = (o ? ge.empty().applyChanges(this.stateDeco, D.empty, this.heightOracle, [new ze(0, 0, 0, e.state.doc.length)]) : this.heightMap).updateHeight(r, 0, o, new up(x.from, $));
      }
      di && (h |= 2);
    }
    let y = !this.viewportIsAppropriate(this.viewport, c) || this.scrollTarget && (this.scrollTarget.range.head < this.viewport.from || this.scrollTarget.range.head > this.viewport.to);
    return y && (h & 2 && (h |= this.updateScaler()), this.viewport = this.getViewport(c, this.scrollTarget), h |= this.updateForViewport()), (h & 2 || y) && this.updateViewportLines(), (this.lineGaps.length || this.viewport.to - this.viewport.from > 4e3) && this.updateLineGaps(this.ensureLineGaps(o ? [] : this.lineGaps, e)), h |= this.computeVisibleRanges(), this.mustEnforceCursorAssoc && (this.mustEnforceCursorAssoc = !1, e.docView.enforceCursorAssoc()), h;
  }
  get visibleTop() {
    return this.scaler.fromDOM(this.pixelViewport.top);
  }
  get visibleBottom() {
    return this.scaler.fromDOM(this.pixelViewport.bottom);
  }
  getViewport(e, t) {
    let i = 0.5 - Math.max(-0.5, Math.min(0.5, e / 1e3 / 2)), r = this.heightMap, s = this.heightOracle, { visibleTop: o, visibleBottom: l } = this, a = new $n(r.lineAt(o - i * 1e3, U.ByHeight, s, 0, 0).from, r.lineAt(l + (1 - i) * 1e3, U.ByHeight, s, 0, 0).to);
    if (t) {
      let { head: h } = t.range;
      if (h < a.from || h > a.to) {
        let c = Math.min(this.editorHeight, this.pixelViewport.bottom - this.pixelViewport.top), f = r.lineAt(h, U.ByPos, s, 0, 0), u;
        t.y == "center" ? u = (f.top + f.bottom) / 2 - c / 2 : t.y == "start" || t.y == "nearest" && h < a.from ? u = f.top : u = f.bottom - c, a = new $n(r.lineAt(u - 1e3 / 2, U.ByHeight, s, 0, 0).from, r.lineAt(u + c + 1e3 / 2, U.ByHeight, s, 0, 0).to);
      }
    }
    return a;
  }
  mapViewport(e, t) {
    let i = t.mapPos(e.from, -1), r = t.mapPos(e.to, 1);
    return new $n(this.heightMap.lineAt(i, U.ByPos, this.heightOracle, 0, 0).from, this.heightMap.lineAt(r, U.ByPos, this.heightOracle, 0, 0).to);
  }
  // Checks if a given viewport covers the visible part of the
  // document and not too much beyond that.
  viewportIsAppropriate({ from: e, to: t }, i = 0) {
    if (!this.inView)
      return !0;
    let { top: r } = this.heightMap.lineAt(e, U.ByPos, this.heightOracle, 0, 0), { bottom: s } = this.heightMap.lineAt(t, U.ByPos, this.heightOracle, 0, 0), { visibleTop: o, visibleBottom: l } = this;
    return (e == 0 || r <= o - Math.max(10, Math.min(
      -i,
      250
      /* VP.MaxCoverMargin */
    ))) && (t == this.state.doc.length || s >= l + Math.max(10, Math.min(
      i,
      250
      /* VP.MaxCoverMargin */
    ))) && r > o - 2 * 1e3 && s < l + 2 * 1e3;
  }
  mapLineGaps(e, t) {
    if (!e.length || t.empty)
      return e;
    let i = [];
    for (let r of e)
      t.touchesRange(r.from, r.to) || i.push(new ns(t.mapPos(r.from), t.mapPos(r.to), r.size, r.displaySize));
    return i;
  }
  // Computes positions in the viewport where the start or end of a
  // line should be hidden, trying to reuse existing line gaps when
  // appropriate to avoid unneccesary redraws.
  // Uses crude character-counting for the positioning and sizing,
  // since actual DOM coordinates aren't always available and
  // predictable. Relies on generous margins (see LG.Margin) to hide
  // the artifacts this might produce from the user.
  ensureLineGaps(e, t) {
    let i = this.heightOracle.lineWrapping, r = i ? 1e4 : 2e3, s = r >> 1, o = r << 1;
    if (this.defaultTextDirection != N.LTR && !i)
      return [];
    let l = [], a = (c, f, u, d) => {
      if (f - c < s)
        return;
      let O = this.state.selection.main, m = [O.from];
      O.empty || m.push(O.to);
      for (let Q of m)
        if (Q > c && Q < f) {
          a(c, Q - 10, u, d), a(Q + 10, f, u, d);
          return;
        }
      let g = wp(e, (Q) => Q.from >= u.from && Q.to <= u.to && Math.abs(Q.from - c) < s && Math.abs(Q.to - f) < s && !m.some((S) => Q.from < S && Q.to > S));
      if (!g) {
        if (f < u.to && t && i && t.visibleRanges.some((y) => y.from <= f && y.to >= f)) {
          let y = t.moveToLineBoundary(b.cursor(f), !1, !0).head;
          y > c && (f = y);
        }
        let Q = this.gapSize(u, c, f, d), S = i || Q < 2e6 ? Q : 2e6;
        g = new ns(c, f, Q, S);
      }
      l.push(g);
    }, h = (c) => {
      if (c.length < o || c.type != fe.Text)
        return;
      let f = xp(c.from, c.to, this.stateDeco);
      if (f.total < o)
        return;
      let u = this.scrollTarget ? this.scrollTarget.range.head : null, d, O;
      if (i) {
        let m = r / this.heightOracle.lineLength * this.heightOracle.lineHeight, g, Q;
        if (u != null) {
          let S = vn(f, u), y = ((this.visibleBottom - this.visibleTop) / 2 + m) / c.height;
          g = S - y, Q = S + y;
        } else
          g = (this.visibleTop - c.top - m) / c.height, Q = (this.visibleBottom - c.top + m) / c.height;
        d = Pn(f, g), O = Pn(f, Q);
      } else {
        let m = f.total * this.heightOracle.charWidth, g = r * this.heightOracle.charWidth, Q = 0;
        if (m > 2e6)
          for (let $ of e)
            $.from >= c.from && $.from < c.to && $.size != $.displaySize && $.from * this.heightOracle.charWidth + Q < this.pixelViewport.left && (Q = $.size - $.displaySize);
        let S = this.pixelViewport.left + Q, y = this.pixelViewport.right + Q, k, x;
        if (u != null) {
          let $ = vn(f, u), w = ((y - S) / 2 + g) / m;
          k = $ - w, x = $ + w;
        } else
          k = (S - g) / m, x = (y + g) / m;
        d = Pn(f, k), O = Pn(f, x);
      }
      d > c.from && a(c.from, d, c, f), O < c.to && a(O, c.to, c, f);
    };
    for (let c of this.viewportLines)
      Array.isArray(c.type) ? c.type.forEach(h) : h(c);
    return l;
  }
  gapSize(e, t, i, r) {
    let s = vn(r, i) - vn(r, t);
    return this.heightOracle.lineWrapping ? e.height * s : r.total * this.heightOracle.charWidth * s;
  }
  updateLineGaps(e) {
    ns.same(e, this.lineGaps) || (this.lineGaps = e, this.lineGapDeco = Z.set(e.map((t) => t.draw(this, this.heightOracle.lineWrapping))));
  }
  computeVisibleRanges(e) {
    let t = this.stateDeco;
    this.lineGaps.length && (t = t.concat(this.lineGapDeco));
    let i = [];
    E.spans(t, this.viewport.from, this.viewport.to, {
      span(s, o) {
        i.push({ from: s, to: o });
      },
      point() {
      }
    }, 20);
    let r = 0;
    if (i.length != this.visibleRanges.length)
      r = 12;
    else
      for (let s = 0; s < i.length && !(r & 8); s++) {
        let o = this.visibleRanges[s], l = i[s];
        (o.from != l.from || o.to != l.to) && (r |= 4, e && e.mapPos(o.from, -1) == l.from && e.mapPos(o.to, 1) == l.to || (r |= 8));
      }
    return this.visibleRanges = i, r;
  }
  lineBlockAt(e) {
    return e >= this.viewport.from && e <= this.viewport.to && this.viewportLines.find((t) => t.from <= e && t.to >= e) || Ri(this.heightMap.lineAt(e, U.ByPos, this.heightOracle, 0, 0), this.scaler);
  }
  lineBlockAtHeight(e) {
    return e >= this.viewportLines[0].top && e <= this.viewportLines[this.viewportLines.length - 1].bottom && this.viewportLines.find((t) => t.top <= e && t.bottom >= e) || Ri(this.heightMap.lineAt(this.scaler.fromDOM(e), U.ByHeight, this.heightOracle, 0, 0), this.scaler);
  }
  scrollAnchorAt(e) {
    let t = this.lineBlockAtHeight(e + 8);
    return t.from >= this.viewport.from || this.viewportLines[0].top - e > 200 ? t : this.viewportLines[0];
  }
  elementAtHeight(e) {
    return Ri(this.heightMap.blockAt(this.scaler.fromDOM(e), this.heightOracle, 0, 0), this.scaler);
  }
  get docHeight() {
    return this.scaler.toDOM(this.heightMap.height);
  }
  get contentHeight() {
    return this.docHeight + this.paddingTop + this.paddingBottom;
  }
}
class $n {
  constructor(e, t) {
    this.from = e, this.to = t;
  }
}
function xp(n, e, t) {
  let i = [], r = n, s = 0;
  return E.spans(t, n, e, {
    span() {
    },
    point(o, l) {
      o > r && (i.push({ from: r, to: o }), s += o - r), r = l;
    }
  }, 20), r < e && (i.push({ from: r, to: e }), s += e - r), { total: s, ranges: i };
}
function Pn({ total: n, ranges: e }, t) {
  if (t <= 0)
    return e[0].from;
  if (t >= 1)
    return e[e.length - 1].to;
  let i = Math.floor(n * t);
  for (let r = 0; ; r++) {
    let { from: s, to: o } = e[r], l = o - s;
    if (i <= l)
      return s + i;
    i -= l;
  }
}
function vn(n, e) {
  let t = 0;
  for (let { from: i, to: r } of n.ranges) {
    if (e <= r) {
      t += e - i;
      break;
    }
    t += r - i;
  }
  return t / n.total;
}
function wp(n, e) {
  for (let t of n)
    if (e(t))
      return t;
}
const ra = {
  toDOM(n) {
    return n;
  },
  fromDOM(n) {
    return n;
  },
  scale: 1,
  eq(n) {
    return n == this;
  }
};
function sa(n) {
  let e = n.facet(Mr).filter((i) => typeof i != "function"), t = n.facet(qo).filter((i) => typeof i != "function");
  return t.length && e.push(E.join(t)), e;
}
class Io {
  constructor(e, t, i) {
    let r = 0, s = 0, o = 0;
    this.viewports = i.map(({ from: l, to: a }) => {
      let h = t.lineAt(l, U.ByPos, e, 0, 0).top, c = t.lineAt(a, U.ByPos, e, 0, 0).bottom;
      return r += c - h, { from: l, to: a, top: h, bottom: c, domTop: 0, domBottom: 0 };
    }), this.scale = (7e6 - r) / (t.height - r);
    for (let l of this.viewports)
      l.domTop = o + (l.top - s) * this.scale, o = l.domBottom = l.domTop + (l.bottom - l.top), s = l.bottom;
  }
  toDOM(e) {
    for (let t = 0, i = 0, r = 0; ; t++) {
      let s = t < this.viewports.length ? this.viewports[t] : null;
      if (!s || e < s.top)
        return r + (e - i) * this.scale;
      if (e <= s.bottom)
        return s.domTop + (e - s.top);
      i = s.bottom, r = s.domBottom;
    }
  }
  fromDOM(e) {
    for (let t = 0, i = 0, r = 0; ; t++) {
      let s = t < this.viewports.length ? this.viewports[t] : null;
      if (!s || e < s.domTop)
        return i + (e - r) / this.scale;
      if (e <= s.domBottom)
        return s.top + (e - s.domTop);
      i = s.bottom, r = s.domBottom;
    }
  }
  eq(e) {
    return e instanceof Io ? this.scale == e.scale && this.viewports.length == e.viewports.length && this.viewports.every((t, i) => t.from == e.viewports[i].from && t.to == e.viewports[i].to) : !1;
  }
}
function Ri(n, e) {
  if (e.scale == 1)
    return n;
  let t = e.toDOM(n.top), i = e.toDOM(n.bottom);
  return new qe(n.from, n.length, t, i - t, Array.isArray(n._content) ? n._content.map((r) => Ri(r, e)) : n._content);
}
const Tn = /* @__PURE__ */ T.define({ combine: (n) => n.join(" ") }), oo = /* @__PURE__ */ T.define({ combine: (n) => n.indexOf(!0) > -1 }), lo = /* @__PURE__ */ Pt.newName(), Gc = /* @__PURE__ */ Pt.newName(), Uc = /* @__PURE__ */ Pt.newName(), Fc = { "&light": "." + Gc, "&dark": "." + Uc };
function ao(n, e, t) {
  return new Pt(e, {
    finish(i) {
      return /&/.test(i) ? i.replace(/&\w*/, (r) => {
        if (r == "&")
          return n;
        if (!t || !t[r])
          throw new RangeError(`Unsupported selector: ${r}`);
        return t[r];
      }) : n + " " + i;
    }
  });
}
const kp = /* @__PURE__ */ ao("." + lo, {
  "&": {
    position: "relative !important",
    boxSizing: "border-box",
    "&.cm-focused": {
      // Provide a simple default outline to make sure a focused
      // editor is visually distinct. Can't leave the default behavior
      // because that will apply to the content element, which is
      // inside the scrollable container and doesn't include the
      // gutters. We also can't use an 'auto' outline, since those
      // are, for some reason, drawn behind the element content, which
      // will cause things like the active line background to cover
      // the outline (#297).
      outline: "1px dotted #212121"
    },
    display: "flex !important",
    flexDirection: "column"
  },
  ".cm-scroller": {
    display: "flex !important",
    alignItems: "flex-start !important",
    fontFamily: "monospace",
    lineHeight: 1.4,
    height: "100%",
    overflowX: "auto",
    position: "relative",
    zIndex: 0,
    overflowAnchor: "none"
  },
  ".cm-content": {
    margin: 0,
    flexGrow: 2,
    flexShrink: 0,
    display: "block",
    whiteSpace: "pre",
    wordWrap: "normal",
    // https://github.com/codemirror/dev/issues/456
    boxSizing: "border-box",
    minHeight: "100%",
    padding: "4px 0",
    outline: "none",
    "&[contenteditable=true]": {
      WebkitUserModify: "read-write-plaintext-only"
    }
  },
  ".cm-lineWrapping": {
    whiteSpace_fallback: "pre-wrap",
    // For IE
    whiteSpace: "break-spaces",
    wordBreak: "break-word",
    // For Safari, which doesn't support overflow-wrap: anywhere
    overflowWrap: "anywhere",
    flexShrink: 1
  },
  "&light .cm-content": { caretColor: "black" },
  "&dark .cm-content": { caretColor: "white" },
  ".cm-line": {
    display: "block",
    padding: "0 2px 0 6px"
  },
  ".cm-layer": {
    position: "absolute",
    left: 0,
    top: 0,
    contain: "size style",
    "& > *": {
      position: "absolute"
    }
  },
  "&light .cm-selectionBackground": {
    background: "#d9d9d9"
  },
  "&dark .cm-selectionBackground": {
    background: "#222"
  },
  "&light.cm-focused > .cm-scroller > .cm-selectionLayer .cm-selectionBackground": {
    background: "#d7d4f0"
  },
  "&dark.cm-focused > .cm-scroller > .cm-selectionLayer .cm-selectionBackground": {
    background: "#233"
  },
  ".cm-cursorLayer": {
    pointerEvents: "none"
  },
  "&.cm-focused > .cm-scroller > .cm-cursorLayer": {
    animation: "steps(1) cm-blink 1.2s infinite"
  },
  // Two animations defined so that we can switch between them to
  // restart the animation without forcing another style
  // recomputation.
  "@keyframes cm-blink": { "0%": {}, "50%": { opacity: 0 }, "100%": {} },
  "@keyframes cm-blink2": { "0%": {}, "50%": { opacity: 0 }, "100%": {} },
  ".cm-cursor, .cm-dropCursor": {
    borderLeft: "1.2px solid black",
    marginLeft: "-0.6px",
    pointerEvents: "none"
  },
  ".cm-cursor": {
    display: "none"
  },
  "&dark .cm-cursor": {
    borderLeftColor: "#ddd"
  },
  ".cm-dropCursor": {
    position: "absolute"
  },
  "&.cm-focused > .cm-scroller > .cm-cursorLayer .cm-cursor": {
    display: "block"
  },
  ".cm-iso": {
    unicodeBidi: "isolate"
  },
  ".cm-announced": {
    position: "fixed",
    top: "-10000px"
  },
  "@media print": {
    ".cm-announced": { display: "none" }
  },
  "&light .cm-activeLine": { backgroundColor: "#cceeff44" },
  "&dark .cm-activeLine": { backgroundColor: "#99eeff33" },
  "&light .cm-specialChar": { color: "red" },
  "&dark .cm-specialChar": { color: "#f78" },
  ".cm-gutters": {
    flexShrink: 0,
    display: "flex",
    height: "100%",
    boxSizing: "border-box",
    zIndex: 200
  },
  ".cm-gutters-before": { insetInlineStart: 0 },
  ".cm-gutters-after": { insetInlineEnd: 0 },
  "&light .cm-gutters": {
    backgroundColor: "#f5f5f5",
    color: "#6c6c6c",
    border: "0px solid #ddd",
    "&.cm-gutters-before": { borderRightWidth: "1px" },
    "&.cm-gutters-after": { borderLeftWidth: "1px" }
  },
  "&dark .cm-gutters": {
    backgroundColor: "#333338",
    color: "#ccc"
  },
  ".cm-gutter": {
    display: "flex !important",
    // Necessary -- prevents margin collapsing
    flexDirection: "column",
    flexShrink: 0,
    boxSizing: "border-box",
    minHeight: "100%",
    overflow: "hidden"
  },
  ".cm-gutterElement": {
    boxSizing: "border-box"
  },
  ".cm-lineNumbers .cm-gutterElement": {
    padding: "0 3px 0 5px",
    minWidth: "20px",
    textAlign: "right",
    whiteSpace: "nowrap"
  },
  "&light .cm-activeLineGutter": {
    backgroundColor: "#e2f2ff"
  },
  "&dark .cm-activeLineGutter": {
    backgroundColor: "#222227"
  },
  ".cm-panels": {
    boxSizing: "border-box",
    position: "sticky",
    left: 0,
    right: 0,
    zIndex: 300
  },
  "&light .cm-panels": {
    backgroundColor: "#f5f5f5",
    color: "black"
  },
  "&light .cm-panels-top": {
    borderBottom: "1px solid #ddd"
  },
  "&light .cm-panels-bottom": {
    borderTop: "1px solid #ddd"
  },
  "&dark .cm-panels": {
    backgroundColor: "#333338",
    color: "white"
  },
  ".cm-dialog": {
    padding: "2px 19px 4px 6px",
    position: "relative",
    "& label": { fontSize: "80%" }
  },
  ".cm-dialog-close": {
    position: "absolute",
    top: "3px",
    right: "4px",
    backgroundColor: "inherit",
    border: "none",
    font: "inherit",
    fontSize: "14px",
    padding: "0"
  },
  ".cm-tab": {
    display: "inline-block",
    overflow: "hidden",
    verticalAlign: "bottom"
  },
  ".cm-widgetBuffer": {
    verticalAlign: "text-top",
    height: "1em",
    width: 0,
    display: "inline"
  },
  ".cm-placeholder": {
    color: "#888",
    display: "inline-block",
    verticalAlign: "top",
    userSelect: "none"
  },
  ".cm-highlightSpace": {
    backgroundImage: "radial-gradient(circle at 50% 55%, #aaa 20%, transparent 5%)",
    backgroundPosition: "center"
  },
  ".cm-highlightTab": {
    backgroundImage: `url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="200" height="20"><path stroke="%23888" stroke-width="1" fill="none" d="M1 10H196L190 5M190 15L196 10M197 4L197 16"/></svg>')`,
    backgroundSize: "auto 100%",
    backgroundPosition: "right 90%",
    backgroundRepeat: "no-repeat"
  },
  ".cm-trailingSpace": {
    backgroundColor: "#ff332255"
  },
  ".cm-button": {
    verticalAlign: "middle",
    color: "inherit",
    fontSize: "70%",
    padding: ".2em 1em",
    borderRadius: "1px"
  },
  "&light .cm-button": {
    backgroundImage: "linear-gradient(#eff1f5, #d9d9df)",
    border: "1px solid #888",
    "&:active": {
      backgroundImage: "linear-gradient(#b4b4b4, #d0d3d6)"
    }
  },
  "&dark .cm-button": {
    backgroundImage: "linear-gradient(#393939, #111)",
    border: "1px solid #888",
    "&:active": {
      backgroundImage: "linear-gradient(#111, #333)"
    }
  },
  ".cm-textfield": {
    verticalAlign: "middle",
    color: "inherit",
    fontSize: "70%",
    border: "1px solid silver",
    padding: ".2em .5em"
  },
  "&light .cm-textfield": {
    backgroundColor: "white"
  },
  "&dark .cm-textfield": {
    border: "1px solid #555",
    backgroundColor: "inherit"
  }
}, Fc), $p = {
  childList: !0,
  characterData: !0,
  subtree: !0,
  attributes: !0,
  characterDataOldValue: !0
}, rs = C.ie && C.ie_version <= 11;
class Pp {
  constructor(e) {
    this.view = e, this.active = !1, this.editContext = null, this.selectionRange = new iO(), this.selectionChanged = !1, this.delayedFlush = -1, this.resizeTimeout = -1, this.queue = [], this.delayedAndroidKey = null, this.flushingAndroidKey = -1, this.lastChange = 0, this.scrollTargets = [], this.intersection = null, this.resizeScroll = null, this.intersecting = !1, this.gapIntersection = null, this.gaps = [], this.printQuery = null, this.parentCheck = -1, this.dom = e.contentDOM, this.observer = new MutationObserver((t) => {
      for (let i of t)
        this.queue.push(i);
      (C.ie && C.ie_version <= 11 || C.ios && e.composing) && t.some((i) => i.type == "childList" && i.removedNodes.length || i.type == "characterData" && i.oldValue.length > i.target.nodeValue.length) ? this.flushSoon() : this.flush();
    }), window.EditContext && C.android && e.constructor.EDIT_CONTEXT !== !1 && // Chrome <126 doesn't support inverted selections in edit context (#1392)
    !(C.chrome && C.chrome_version < 126) && (this.editContext = new Tp(e), e.state.facet(dt) && (e.contentDOM.editContext = this.editContext.editContext)), rs && (this.onCharData = (t) => {
      this.queue.push({
        target: t.target,
        type: "characterData",
        oldValue: t.prevValue
      }), this.flushSoon();
    }), this.onSelectionChange = this.onSelectionChange.bind(this), this.onResize = this.onResize.bind(this), this.onPrint = this.onPrint.bind(this), this.onScroll = this.onScroll.bind(this), window.matchMedia && (this.printQuery = window.matchMedia("print")), typeof ResizeObserver == "function" && (this.resizeScroll = new ResizeObserver(() => {
      var t;
      ((t = this.view.docView) === null || t === void 0 ? void 0 : t.lastUpdate) < Date.now() - 75 && this.onResize();
    }), this.resizeScroll.observe(e.scrollDOM)), this.addWindowListeners(this.win = e.win), this.start(), typeof IntersectionObserver == "function" && (this.intersection = new IntersectionObserver((t) => {
      this.parentCheck < 0 && (this.parentCheck = setTimeout(this.listenForScroll.bind(this), 1e3)), t.length > 0 && t[t.length - 1].intersectionRatio > 0 != this.intersecting && (this.intersecting = !this.intersecting, this.intersecting != this.view.inView && this.onScrollChanged(document.createEvent("Event")));
    }, { threshold: [0, 1e-3] }), this.intersection.observe(this.dom), this.gapIntersection = new IntersectionObserver((t) => {
      t.length > 0 && t[t.length - 1].intersectionRatio > 0 && this.onScrollChanged(document.createEvent("Event"));
    }, {})), this.listenForScroll(), this.readSelectionRange();
  }
  onScrollChanged(e) {
    this.view.inputState.runHandlers("scroll", e), this.intersecting && this.view.measure();
  }
  onScroll(e) {
    this.intersecting && this.flush(!1), this.editContext && this.view.requestMeasure(this.editContext.measureReq), this.onScrollChanged(e);
  }
  onResize() {
    this.resizeTimeout < 0 && (this.resizeTimeout = setTimeout(() => {
      this.resizeTimeout = -1, this.view.requestMeasure();
    }, 50));
  }
  onPrint(e) {
    (e.type == "change" || !e.type) && !e.matches || (this.view.viewState.printing = !0, this.view.measure(), setTimeout(() => {
      this.view.viewState.printing = !1, this.view.requestMeasure();
    }, 500));
  }
  updateGaps(e) {
    if (this.gapIntersection && (e.length != this.gaps.length || this.gaps.some((t, i) => t != e[i]))) {
      this.gapIntersection.disconnect();
      for (let t of e)
        this.gapIntersection.observe(t);
      this.gaps = e;
    }
  }
  onSelectionChange(e) {
    let t = this.selectionChanged;
    if (!this.readSelectionRange() || this.delayedAndroidKey)
      return;
    let { view: i } = this, r = this.selectionRange;
    if (i.state.facet(dt) ? i.root.activeElement != this.dom : !_i(this.dom, r))
      return;
    let s = r.anchorNode && i.docView.tile.nearest(r.anchorNode);
    if (s && s.isWidget() && s.widget.ignoreEvent(e)) {
      t || (this.selectionChanged = !1);
      return;
    }
    (C.ie && C.ie_version <= 11 || C.android && C.chrome) && !i.state.selection.main.empty && // (Selection.isCollapsed isn't reliable on IE)
    r.focusNode && Di(r.focusNode, r.focusOffset, r.anchorNode, r.anchorOffset) ? this.flushSoon() : this.flush(!1);
  }
  readSelectionRange() {
    let { view: e } = this, t = Ni(e.root);
    if (!t)
      return !1;
    let i = C.safari && e.root.nodeType == 11 && e.root.activeElement == this.dom && vp(this.view, t) || t;
    if (!i || this.selectionRange.eq(i))
      return !1;
    let r = _i(this.dom, i);
    return r && !this.selectionChanged && e.inputState.lastFocusTime > Date.now() - 200 && e.inputState.lastTouchTime < Date.now() - 300 && rO(this.dom, i) ? (this.view.inputState.lastFocusTime = 0, e.docView.updateSelection(), !1) : (this.selectionRange.setRange(i), r && (this.selectionChanged = !0), !0);
  }
  setSelectionRange(e, t) {
    this.selectionRange.set(e.node, e.offset, t.node, t.offset), this.selectionChanged = !1;
  }
  clearSelectionRange() {
    this.selectionRange.set(null, 0, null, 0);
  }
  listenForScroll() {
    this.parentCheck = -1;
    let e = 0, t = null;
    for (let i = this.dom; i; )
      if (i.nodeType == 1)
        !t && e < this.scrollTargets.length && this.scrollTargets[e] == i ? e++ : t || (t = this.scrollTargets.slice(0, e)), t && t.push(i), i = i.assignedSlot || i.parentNode;
      else if (i.nodeType == 11)
        i = i.host;
      else
        break;
    if (e < this.scrollTargets.length && !t && (t = this.scrollTargets.slice(0, e)), t) {
      for (let i of this.scrollTargets)
        i.removeEventListener("scroll", this.onScroll);
      for (let i of this.scrollTargets = t)
        i.addEventListener("scroll", this.onScroll);
    }
  }
  ignore(e) {
    if (!this.active)
      return e();
    try {
      return this.stop(), e();
    } finally {
      this.start(), this.clear();
    }
  }
  start() {
    this.active || (this.observer.observe(this.dom, $p), rs && this.dom.addEventListener("DOMCharacterDataModified", this.onCharData), this.active = !0);
  }
  stop() {
    this.active && (this.active = !1, this.observer.disconnect(), rs && this.dom.removeEventListener("DOMCharacterDataModified", this.onCharData));
  }
  // Throw away any pending changes
  clear() {
    this.processRecords(), this.queue.length = 0, this.selectionChanged = !1;
  }
  // Chrome Android, especially in combination with GBoard, not only
  // doesn't reliably fire regular key events, but also often
  // surrounds the effect of enter or backspace with a bunch of
  // composition events that, when interrupted, cause text duplication
  // or other kinds of corruption. This hack makes the editor back off
  // from handling DOM changes for a moment when such a key is
  // detected (via beforeinput or keydown), and then tries to flush
  // them or, if that has no effect, dispatches the given key.
  delayAndroidKey(e, t) {
    var i;
    if (!this.delayedAndroidKey) {
      let r = () => {
        let s = this.delayedAndroidKey;
        s && (this.clearDelayedAndroidKey(), this.view.inputState.lastKeyCode = s.keyCode, this.view.inputState.lastKeyTime = Date.now(), !this.flush() && s.force && ni(this.dom, s.key, s.keyCode));
      };
      this.flushingAndroidKey = this.view.win.requestAnimationFrame(r);
    }
    (!this.delayedAndroidKey || e == "Enter") && (this.delayedAndroidKey = {
      key: e,
      keyCode: t,
      // Only run the key handler when no changes are detected if
      // this isn't coming right after another change, in which case
      // it is probably part of a weird chain of updates, and should
      // be ignored if it returns the DOM to its previous state.
      force: this.lastChange < Date.now() - 50 || !!(!((i = this.delayedAndroidKey) === null || i === void 0) && i.force)
    });
  }
  clearDelayedAndroidKey() {
    this.win.cancelAnimationFrame(this.flushingAndroidKey), this.delayedAndroidKey = null, this.flushingAndroidKey = -1;
  }
  flushSoon() {
    this.delayedFlush < 0 && (this.delayedFlush = this.view.win.requestAnimationFrame(() => {
      this.delayedFlush = -1, this.flush();
    }));
  }
  forceFlush() {
    this.delayedFlush >= 0 && (this.view.win.cancelAnimationFrame(this.delayedFlush), this.delayedFlush = -1), this.flush();
  }
  pendingRecords() {
    for (let e of this.observer.takeRecords())
      this.queue.push(e);
    return this.queue;
  }
  processRecords() {
    let e = this.pendingRecords();
    e.length && (this.queue = []);
    let t = -1, i = -1, r = !1;
    for (let s of e) {
      let o = this.readMutation(s);
      o && (o.typeOver && (r = !0), t == -1 ? { from: t, to: i } = o : (t = Math.min(o.from, t), i = Math.max(o.to, i)));
    }
    return { from: t, to: i, typeOver: r };
  }
  readChange() {
    let { from: e, to: t, typeOver: i } = this.processRecords(), r = this.selectionChanged && _i(this.dom, this.selectionRange);
    if (e < 0 && !r)
      return null;
    e > -1 && (this.lastChange = Date.now()), this.view.inputState.lastFocusTime = 0, this.selectionChanged = !1;
    let s = new IO(this.view, e, t, i);
    return this.view.docView.domChanged = { newSel: s.newSel ? s.newSel.main : null }, s;
  }
  // Apply pending changes, if any
  flush(e = !0) {
    if (this.delayedFlush >= 0 || this.delayedAndroidKey)
      return !1;
    e && this.readSelectionRange();
    let t = this.readChange();
    if (!t)
      return this.view.requestMeasure(), !1;
    let i = this.view.state, r = Vc(this.view, t);
    return this.view.state == i && (t.domChanged || t.newSel && !ar(this.view.state.selection, t.newSel.main)) && this.view.update([]), r;
  }
  readMutation(e) {
    let t = this.view.docView.tile.nearest(e.target);
    if (!t || t.isWidget())
      return null;
    if (t.markDirty(e.type == "attributes"), e.type == "childList") {
      let i = oa(t, e.previousSibling || e.target.previousSibling, -1), r = oa(t, e.nextSibling || e.target.nextSibling, 1);
      return {
        from: i ? t.posAfter(i) : t.posAtStart,
        to: r ? t.posBefore(r) : t.posAtEnd,
        typeOver: !1
      };
    } else return e.type == "characterData" ? { from: t.posAtStart, to: t.posAtEnd, typeOver: e.target.nodeValue == e.oldValue } : null;
  }
  setWindow(e) {
    e != this.win && (this.removeWindowListeners(this.win), this.win = e, this.addWindowListeners(this.win));
  }
  addWindowListeners(e) {
    e.addEventListener("resize", this.onResize), this.printQuery ? this.printQuery.addEventListener ? this.printQuery.addEventListener("change", this.onPrint) : this.printQuery.addListener(this.onPrint) : e.addEventListener("beforeprint", this.onPrint), e.addEventListener("scroll", this.onScroll), e.document.addEventListener("selectionchange", this.onSelectionChange);
  }
  removeWindowListeners(e) {
    e.removeEventListener("scroll", this.onScroll), e.removeEventListener("resize", this.onResize), this.printQuery ? this.printQuery.removeEventListener ? this.printQuery.removeEventListener("change", this.onPrint) : this.printQuery.removeListener(this.onPrint) : e.removeEventListener("beforeprint", this.onPrint), e.document.removeEventListener("selectionchange", this.onSelectionChange);
  }
  update(e) {
    this.editContext && (this.editContext.update(e), e.startState.facet(dt) != e.state.facet(dt) && (e.view.contentDOM.editContext = e.state.facet(dt) ? this.editContext.editContext : null));
  }
  destroy() {
    var e, t, i;
    this.stop(), (e = this.intersection) === null || e === void 0 || e.disconnect(), (t = this.gapIntersection) === null || t === void 0 || t.disconnect(), (i = this.resizeScroll) === null || i === void 0 || i.disconnect();
    for (let r of this.scrollTargets)
      r.removeEventListener("scroll", this.onScroll);
    this.removeWindowListeners(this.win), clearTimeout(this.parentCheck), clearTimeout(this.resizeTimeout), this.win.cancelAnimationFrame(this.delayedFlush), this.win.cancelAnimationFrame(this.flushingAndroidKey), this.editContext && (this.view.contentDOM.editContext = null, this.editContext.destroy());
  }
}
function oa(n, e, t) {
  for (; e; ) {
    let i = ie.get(e);
    if (i && i.parent == n)
      return i;
    let r = e.parentNode;
    e = r != n.dom ? r : t > 0 ? e.nextSibling : e.previousSibling;
  }
  return null;
}
function la(n, e) {
  let t = e.startContainer, i = e.startOffset, r = e.endContainer, s = e.endOffset, o = n.docView.domAtPos(n.state.selection.main.anchor, 1);
  return Di(o.node, o.offset, r, s) && ([t, i, r, s] = [r, s, t, i]), { anchorNode: t, anchorOffset: i, focusNode: r, focusOffset: s };
}
function vp(n, e) {
  if (e.getComposedRanges) {
    let r = e.getComposedRanges(n.root)[0];
    if (r)
      return la(n, r);
  }
  let t = null;
  function i(r) {
    r.preventDefault(), r.stopImmediatePropagation(), t = r.getTargetRanges()[0];
  }
  return n.contentDOM.addEventListener("beforeinput", i, !0), n.dom.ownerDocument.execCommand("indent"), n.contentDOM.removeEventListener("beforeinput", i, !0), t ? la(n, t) : null;
}
class Tp {
  constructor(e) {
    this.from = 0, this.to = 0, this.pendingContextChange = null, this.handlers = /* @__PURE__ */ Object.create(null), this.composing = null, this.resetRange(e.state);
    let t = this.editContext = new window.EditContext({
      text: e.state.doc.sliceString(this.from, this.to),
      selectionStart: this.toContextPos(Math.max(this.from, Math.min(this.to, e.state.selection.main.anchor))),
      selectionEnd: this.toContextPos(e.state.selection.main.head)
    });
    this.handlers.textupdate = (i) => {
      let r = e.state.selection.main, { anchor: s, head: o } = r, l = this.toEditorPos(i.updateRangeStart), a = this.toEditorPos(i.updateRangeEnd);
      e.inputState.composing >= 0 && !this.composing && (this.composing = { contextBase: i.updateRangeStart, editorBase: l, drifted: !1 });
      let h = a - l > i.text.length;
      l == this.from && s < this.from ? l = s : a == this.to && s > this.to && (a = s);
      let c = Ec(e.state.sliceDoc(l, a), i.text, (h ? r.from : r.to) - l, h ? "end" : null);
      if (!c) {
        let u = b.single(this.toEditorPos(i.selectionStart), this.toEditorPos(i.selectionEnd));
        ar(u, r) || e.dispatch({ selection: u, userEvent: "select" });
        return;
      }
      let f = {
        from: c.from + l,
        to: c.toA + l,
        insert: D.of(i.text.slice(c.from, c.toB).split(`
`))
      };
      if ((C.mac || C.android) && f.from == o - 1 && /^\. ?$/.test(i.text) && e.contentDOM.getAttribute("autocorrect") == "off" && (f = { from: l, to: a, insert: D.of([i.text.replace(".", " ")]) }), this.pendingContextChange = f, !e.state.readOnly) {
        let u = this.to - this.from + (f.to - f.from + f.insert.length);
        Lo(e, f, b.single(this.toEditorPos(i.selectionStart, u), this.toEditorPos(i.selectionEnd, u)));
      }
      this.pendingContextChange && (this.revertPending(e.state), this.setSelection(e.state)), f.from < f.to && !f.insert.length && e.inputState.composing >= 0 && !/[\\p{Alphabetic}\\p{Number}_]/.test(t.text.slice(Math.max(0, i.updateRangeStart - 1), Math.min(t.text.length, i.updateRangeStart + 1))) && this.handlers.compositionend(i);
    }, this.handlers.characterboundsupdate = (i) => {
      let r = [], s = null;
      for (let o = this.toEditorPos(i.rangeStart), l = this.toEditorPos(i.rangeEnd); o < l; o++) {
        let a = e.coordsForChar(o);
        s = a && new DOMRect(a.left, a.top, a.right - a.left, a.bottom - a.top) || s || new DOMRect(), r.push(s);
      }
      t.updateCharacterBounds(i.rangeStart, r);
    }, this.handlers.textformatupdate = (i) => {
      let r = [];
      for (let s of i.getTextFormats()) {
        let o = s.underlineStyle, l = s.underlineThickness;
        if (!/none/i.test(o) && !/none/i.test(l)) {
          let a = this.toEditorPos(s.rangeStart), h = this.toEditorPos(s.rangeEnd);
          if (a < h) {
            let c = `text-decoration: underline ${/^[a-z]/.test(o) ? o + " " : o == "Dashed" ? "dashed " : o == "Squiggle" ? "wavy " : ""}${/thin/i.test(l) ? 1 : 2}px`;
            r.push(Z.mark({ attributes: { style: c } }).range(a, h));
          }
        }
      }
      e.dispatch({ effects: Tc.of(Z.set(r)) });
    }, this.handlers.compositionstart = () => {
      e.inputState.composing < 0 && (e.inputState.composing = 0, e.inputState.compositionFirstChange = !0);
    }, this.handlers.compositionend = () => {
      if (e.inputState.composing = -1, e.inputState.compositionFirstChange = null, this.composing) {
        let { drifted: i } = this.composing;
        this.composing = null, i && this.reset(e.state);
      }
    };
    for (let i in this.handlers)
      t.addEventListener(i, this.handlers[i]);
    this.measureReq = { read: (i) => {
      this.editContext.updateControlBounds(i.contentDOM.getBoundingClientRect());
      let r = Ni(i.root);
      r && r.rangeCount && this.editContext.updateSelectionBounds(r.getRangeAt(0).getBoundingClientRect());
    } };
  }
  applyEdits(e) {
    let t = 0, i = !1, r = this.pendingContextChange;
    return e.changes.iterChanges((s, o, l, a, h) => {
      if (i)
        return;
      let c = h.length - (o - s);
      if (r && o >= r.to)
        if (r.from == s && r.to == o && r.insert.eq(h)) {
          r = this.pendingContextChange = null, t += c, this.to += c;
          return;
        } else
          r = null, this.revertPending(e.state);
      if (s += t, o += t, o <= this.from)
        this.from += c, this.to += c;
      else if (s < this.to) {
        if (s < this.from || o > this.to || this.to - this.from + h.length > 3e4) {
          i = !0;
          return;
        }
        this.editContext.updateText(this.toContextPos(s), this.toContextPos(o), h.toString()), this.to += c;
      }
      t += c;
    }), r && !i && this.revertPending(e.state), !i;
  }
  update(e) {
    let t = this.pendingContextChange, i = e.startState.selection.main;
    this.composing && (this.composing.drifted || !e.changes.touchesRange(i.from, i.to) && e.transactions.some((r) => !r.isUserEvent("input.type") && r.changes.touchesRange(this.from, this.to))) ? (this.composing.drifted = !0, this.composing.editorBase = e.changes.mapPos(this.composing.editorBase)) : !this.applyEdits(e) || !this.rangeIsValid(e.state) ? (this.pendingContextChange = null, this.reset(e.state)) : (e.docChanged || e.selectionSet || t) && this.setSelection(e.state), (e.geometryChanged || e.docChanged || e.selectionSet) && e.view.requestMeasure(this.measureReq);
  }
  resetRange(e) {
    let { head: t } = e.selection.main;
    this.from = Math.max(
      0,
      t - 1e4
      /* CxVp.Margin */
    ), this.to = Math.min(
      e.doc.length,
      t + 1e4
      /* CxVp.Margin */
    );
  }
  reset(e) {
    this.resetRange(e), this.editContext.updateText(0, this.editContext.text.length, e.doc.sliceString(this.from, this.to)), this.setSelection(e);
  }
  revertPending(e) {
    let t = this.pendingContextChange;
    this.pendingContextChange = null, this.editContext.updateText(this.toContextPos(t.from), this.toContextPos(t.from + t.insert.length), e.doc.sliceString(t.from, t.to));
  }
  setSelection(e) {
    let { main: t } = e.selection, i = this.toContextPos(Math.max(this.from, Math.min(this.to, t.anchor))), r = this.toContextPos(t.head);
    (this.editContext.selectionStart != i || this.editContext.selectionEnd != r) && this.editContext.updateSelection(i, r);
  }
  rangeIsValid(e) {
    let { head: t } = e.selection.main;
    return !(this.from > 0 && t - this.from < 500 || this.to < e.doc.length && this.to - t < 500 || this.to - this.from > 1e4 * 3);
  }
  toEditorPos(e, t = this.to - this.from) {
    e = Math.min(e, t);
    let i = this.composing;
    return i && i.drifted ? i.editorBase + (e - i.contextBase) : e + this.from;
  }
  toContextPos(e) {
    let t = this.composing;
    return t && t.drifted ? t.contextBase + (e - t.editorBase) : e - this.from;
  }
  destroy() {
    for (let e in this.handlers)
      this.editContext.removeEventListener(e, this.handlers[e]);
  }
}
class v {
  /**
  The current editor state.
  */
  get state() {
    return this.viewState.state;
  }
  /**
  To be able to display large documents without consuming too much
  memory or overloading the browser, CodeMirror only draws the
  code that is visible (plus a margin around it) to the DOM. This
  property tells you the extent of the current drawn viewport, in
  document positions.
  */
  get viewport() {
    return this.viewState.viewport;
  }
  /**
  When there are, for example, large collapsed ranges in the
  viewport, its size can be a lot bigger than the actual visible
  content. Thus, if you are doing something like styling the
  content in the viewport, it is preferable to only do so for
  these ranges, which are the subset of the viewport that is
  actually drawn.
  */
  get visibleRanges() {
    return this.viewState.visibleRanges;
  }
  /**
  Returns false when the editor is entirely scrolled out of view
  or otherwise hidden.
  */
  get inView() {
    return this.viewState.inView;
  }
  /**
  Indicates whether the user is currently composing text via
  [IME](https://en.wikipedia.org/wiki/Input_method), and at least
  one change has been made in the current composition.
  */
  get composing() {
    return !!this.inputState && this.inputState.composing > 0;
  }
  /**
  Indicates whether the user is currently in composing state. Note
  that on some platforms, like Android, this will be the case a
  lot, since just putting the cursor on a word starts a
  composition there.
  */
  get compositionStarted() {
    return !!this.inputState && this.inputState.composing >= 0;
  }
  /**
  The document or shadow root that the view lives in.
  */
  get root() {
    return this._root;
  }
  /**
  @internal
  */
  get win() {
    return this.dom.ownerDocument.defaultView || window;
  }
  /**
  Construct a new view. You'll want to either provide a `parent`
  option, or put `view.dom` into your document after creating a
  view, so that the user can see the editor.
  */
  constructor(e = {}) {
    var t;
    this.plugins = [], this.pluginMap = /* @__PURE__ */ new Map(), this.editorAttrs = {}, this.contentAttrs = {}, this.bidiCache = [], this.destroyed = !1, this.updateState = 2, this.measureScheduled = -1, this.measureRequests = [], this.contentDOM = document.createElement("div"), this.scrollDOM = document.createElement("div"), this.scrollDOM.tabIndex = -1, this.scrollDOM.className = "cm-scroller", this.scrollDOM.appendChild(this.contentDOM), this.announceDOM = document.createElement("div"), this.announceDOM.className = "cm-announced", this.announceDOM.setAttribute("aria-live", "polite"), this.dom = document.createElement("div"), this.dom.appendChild(this.announceDOM), this.dom.appendChild(this.scrollDOM), e.parent && e.parent.appendChild(this.dom);
    let { dispatch: i } = e;
    this.dispatchTransactions = e.dispatchTransactions || i && ((r) => r.forEach((s) => i(s, this))) || ((r) => this.update(r)), this.dispatch = this.dispatch.bind(this), this._root = e.root || nO(e.parent) || document, this.viewState = new na(e.state || _.create(e)), e.scrollTo && e.scrollTo.is(xn) && (this.viewState.scrollTarget = e.scrollTo.value.clip(this.viewState.state)), this.plugins = this.state.facet(Ht).map((r) => new Kr(r));
    for (let r of this.plugins)
      r.update(this);
    this.observer = new Pp(this), this.inputState = new UO(this), this.inputState.ensureHandlers(this.plugins), this.docView = new Bl(this), this.mountStyles(), this.updateAttrs(), this.updateState = 0, this.requestMeasure(), !((t = document.fonts) === null || t === void 0) && t.ready && document.fonts.ready.then(() => {
      this.viewState.mustMeasureContent = "refresh", this.requestMeasure();
    });
  }
  dispatch(...e) {
    let t = e.length == 1 && e[0] instanceof te ? e : e.length == 1 && Array.isArray(e[0]) ? e[0] : [this.state.update(...e)];
    this.dispatchTransactions(t, this);
  }
  /**
  Update the view for the given array of transactions. This will
  update the visible document and selection to match the state
  produced by the transactions, and notify view plugins of the
  change. You should usually call
  [`dispatch`](https://codemirror.net/6/docs/ref/#view.EditorView.dispatch) instead, which uses this
  as a primitive.
  */
  update(e) {
    if (this.updateState != 0)
      throw new Error("Calls to EditorView.update are not allowed while an update is in progress");
    let t = !1, i = !1, r, s = this.state;
    for (let u of e) {
      if (u.startState != s)
        throw new RangeError("Trying to update state with a transaction that doesn't start from the previous state.");
      s = u.state;
    }
    if (this.destroyed) {
      this.viewState.state = s;
      return;
    }
    let o = this.hasFocus, l = 0, a = null;
    e.some((u) => u.annotation(Bc)) ? (this.inputState.notifiedFocused = o, l = 1) : o != this.inputState.notifiedFocused && (this.inputState.notifiedFocused = o, a = Ic(s, o), a || (l = 1));
    let h = this.observer.delayedAndroidKey, c = null;
    if (h ? (this.observer.clearDelayedAndroidKey(), c = this.observer.readChange(), (c && !this.state.doc.eq(s.doc) || !this.state.selection.eq(s.selection)) && (c = null)) : this.observer.clear(), s.facet(_.phrases) != this.state.facet(_.phrases))
      return this.setState(s);
    r = sr.create(this, s, e), r.flags |= l;
    let f = this.viewState.scrollTarget;
    try {
      this.updateState = 2;
      for (let u of e) {
        if (f && (f = f.map(u.changes)), u.scrollIntoView) {
          let { main: d } = u.state.selection;
          f = new ri(d.empty ? d : b.cursor(d.head, d.head > d.anchor ? -1 : 1));
        }
        for (let d of u.effects)
          d.is(xn) && (f = d.value.clip(this.state));
      }
      this.viewState.update(r, f), this.bidiCache = cr.update(this.bidiCache, r.changes), r.empty || (this.updatePlugins(r), this.inputState.update(r)), t = this.docView.update(r), this.state.facet(Ai) != this.styleModules && this.mountStyles(), i = this.updateAttrs(), this.showAnnouncements(e), this.docView.updateSelection(t, e.some((u) => u.isUserEvent("select.pointer")));
    } finally {
      this.updateState = 0;
    }
    if (r.startState.facet(Tn) != r.state.facet(Tn) && (this.viewState.mustMeasureContent = !0), (t || i || f || this.viewState.mustEnforceCursorAssoc || this.viewState.mustMeasureContent) && this.requestMeasure(), t && this.docViewUpdate(), !r.empty)
      for (let u of this.state.facet(to))
        try {
          u(r);
        } catch (d) {
          we(this.state, d, "update listener");
        }
    (a || c) && Promise.resolve().then(() => {
      a && this.state == a.startState && this.dispatch(a), c && !Vc(this, c) && h.force && ni(this.contentDOM, h.key, h.keyCode);
    });
  }
  /**
  Reset the view to the given state. (This will cause the entire
  document to be redrawn and all view plugins to be reinitialized,
  so you should probably only use it when the new state isn't
  derived from the old state. Otherwise, use
  [`dispatch`](https://codemirror.net/6/docs/ref/#view.EditorView.dispatch) instead.)
  */
  setState(e) {
    if (this.updateState != 0)
      throw new Error("Calls to EditorView.setState are not allowed while an update is in progress");
    if (this.destroyed) {
      this.viewState.state = e;
      return;
    }
    this.updateState = 2;
    let t = this.hasFocus;
    try {
      for (let i of this.plugins)
        i.destroy(this);
      this.viewState = new na(e), this.plugins = e.facet(Ht).map((i) => new Kr(i)), this.pluginMap.clear();
      for (let i of this.plugins)
        i.update(this);
      this.docView.destroy(), this.docView = new Bl(this), this.inputState.ensureHandlers(this.plugins), this.mountStyles(), this.updateAttrs(), this.bidiCache = [];
    } finally {
      this.updateState = 0;
    }
    t && this.focus(), this.requestMeasure();
  }
  updatePlugins(e) {
    let t = e.startState.facet(Ht), i = e.state.facet(Ht);
    if (t != i) {
      let r = [];
      for (let s of i) {
        let o = t.indexOf(s);
        if (o < 0)
          r.push(new Kr(s));
        else {
          let l = this.plugins[o];
          l.mustUpdate = e, r.push(l);
        }
      }
      for (let s of this.plugins)
        s.mustUpdate != e && s.destroy(this);
      this.plugins = r, this.pluginMap.clear();
    } else
      for (let r of this.plugins)
        r.mustUpdate = e;
    for (let r = 0; r < this.plugins.length; r++)
      this.plugins[r].update(this);
    t != i && this.inputState.ensureHandlers(this.plugins);
  }
  docViewUpdate() {
    for (let e of this.plugins) {
      let t = e.value;
      if (t && t.docViewUpdate)
        try {
          t.docViewUpdate(this);
        } catch (i) {
          we(this.state, i, "doc view update listener");
        }
    }
  }
  /**
  @internal
  */
  measure(e = !0) {
    if (this.destroyed)
      return;
    if (this.measureScheduled > -1 && this.win.cancelAnimationFrame(this.measureScheduled), this.observer.delayedAndroidKey) {
      this.measureScheduled = -1, this.requestMeasure();
      return;
    }
    this.measureScheduled = 0, e && this.observer.forceFlush();
    let t = null, i = this.scrollDOM, r = i.scrollTop * this.scaleY, { scrollAnchorPos: s, scrollAnchorHeight: o } = this.viewState;
    Math.abs(r - this.viewState.scrollTop) > 1 && (o = -1), this.viewState.scrollAnchorHeight = -1;
    try {
      for (let l = 0; ; l++) {
        if (o < 0)
          if (fc(i))
            s = -1, o = this.viewState.heightMap.height;
          else {
            let d = this.viewState.scrollAnchorAt(r);
            s = d.from, o = d.top;
          }
        this.updateState = 1;
        let a = this.viewState.measure(this);
        if (!a && !this.measureRequests.length && this.viewState.scrollTarget == null)
          break;
        if (l > 5) {
          console.warn(this.measureRequests.length ? "Measure loop restarted more than 5 times" : "Viewport failed to stabilize");
          break;
        }
        let h = [];
        a & 4 || ([this.measureRequests, h] = [h, this.measureRequests]);
        let c = h.map((d) => {
          try {
            return d.read(this);
          } catch (O) {
            return we(this.state, O), aa;
          }
        }), f = sr.create(this, this.state, []), u = !1;
        f.flags |= a, t ? t.flags |= a : t = f, this.updateState = 2, f.empty || (this.updatePlugins(f), this.inputState.update(f), this.updateAttrs(), u = this.docView.update(f), u && this.docViewUpdate());
        for (let d = 0; d < h.length; d++)
          if (c[d] != aa)
            try {
              let O = h[d];
              O.write && O.write(c[d], this);
            } catch (O) {
              we(this.state, O);
            }
        if (u && this.docView.updateSelection(!0), !f.viewportChanged && this.measureRequests.length == 0) {
          if (this.viewState.editorHeight)
            if (this.viewState.scrollTarget) {
              this.docView.scrollIntoView(this.viewState.scrollTarget), this.viewState.scrollTarget = null, o = -1;
              continue;
            } else {
              let O = (s < 0 ? this.viewState.heightMap.height : this.viewState.lineBlockAt(s).top) - o;
              if (O > 1 || O < -1) {
                r = r + O, i.scrollTop = r / this.scaleY, o = -1;
                continue;
              }
            }
          break;
        }
      }
    } finally {
      this.updateState = 0, this.measureScheduled = -1;
    }
    if (t && !t.empty)
      for (let l of this.state.facet(to))
        l(t);
  }
  /**
  Get the CSS classes for the currently active editor themes.
  */
  get themeClasses() {
    return lo + " " + (this.state.facet(oo) ? Uc : Gc) + " " + this.state.facet(Tn);
  }
  updateAttrs() {
    let e = ha(this, Cc, {
      class: "cm-editor" + (this.hasFocus ? " cm-focused " : " ") + this.themeClasses
    }), t = {
      spellcheck: "false",
      autocorrect: "off",
      autocapitalize: "off",
      writingsuggestions: "false",
      translate: "no",
      contenteditable: this.state.facet(dt) ? "true" : "false",
      class: "cm-content",
      style: `${C.tabSize}: ${this.state.tabSize}`,
      role: "textbox",
      "aria-multiline": "true"
    };
    this.state.readOnly && (t["aria-readonly"] = "true"), ha(this, Do, t);
    let i = this.observer.ignore(() => {
      let r = El(this.contentDOM, this.contentAttrs, t), s = El(this.dom, this.editorAttrs, e);
      return r || s;
    });
    return this.editorAttrs = e, this.contentAttrs = t, i;
  }
  showAnnouncements(e) {
    let t = !0;
    for (let i of e)
      for (let r of i.effects)
        if (r.is(v.announce)) {
          t && (this.announceDOM.textContent = ""), t = !1;
          let s = this.announceDOM.appendChild(document.createElement("div"));
          s.textContent = r.value;
        }
  }
  mountStyles() {
    this.styleModules = this.state.facet(Ai);
    let e = this.state.facet(v.cspNonce);
    Pt.mount(this.root, this.styleModules.concat(kp).reverse(), e ? { nonce: e } : void 0);
  }
  readMeasured() {
    if (this.updateState == 2)
      throw new Error("Reading the editor layout isn't allowed during an update");
    this.updateState == 0 && this.measureScheduled > -1 && this.measure(!1);
  }
  /**
  Schedule a layout measurement, optionally providing callbacks to
  do custom DOM measuring followed by a DOM write phase. Using
  this is preferable reading DOM layout directly from, for
  example, an event handler, because it'll make sure measuring and
  drawing done by other components is synchronized, avoiding
  unnecessary DOM layout computations.
  */
  requestMeasure(e) {
    if (this.measureScheduled < 0 && (this.measureScheduled = this.win.requestAnimationFrame(() => this.measure())), e) {
      if (this.measureRequests.indexOf(e) > -1)
        return;
      if (e.key != null) {
        for (let t = 0; t < this.measureRequests.length; t++)
          if (this.measureRequests[t].key === e.key) {
            this.measureRequests[t] = e;
            return;
          }
      }
      this.measureRequests.push(e);
    }
  }
  /**
  Get the value of a specific plugin, if present. Note that
  plugins that crash can be dropped from a view, so even when you
  know you registered a given plugin, it is recommended to check
  the return value of this method.
  */
  plugin(e) {
    let t = this.pluginMap.get(e);
    return (t === void 0 || t && t.plugin != e) && this.pluginMap.set(e, t = this.plugins.find((i) => i.plugin == e) || null), t && t.update(this).value;
  }
  /**
  The top position of the document, in screen coordinates. This
  may be negative when the editor is scrolled down. Points
  directly to the top of the first line, not above the padding.
  */
  get documentTop() {
    return this.contentDOM.getBoundingClientRect().top + this.viewState.paddingTop;
  }
  /**
  Reports the padding above and below the document.
  */
  get documentPadding() {
    return { top: this.viewState.paddingTop, bottom: this.viewState.paddingBottom };
  }
  /**
  If the editor is transformed with CSS, this provides the scale
  along the X axis. Otherwise, it will just be 1. Note that
  transforms other than translation and scaling are not supported.
  */
  get scaleX() {
    return this.viewState.scaleX;
  }
  /**
  Provide the CSS transformed scale along the Y axis.
  */
  get scaleY() {
    return this.viewState.scaleY;
  }
  /**
  Find the text line or block widget at the given vertical
  position (which is interpreted as relative to the [top of the
  document](https://codemirror.net/6/docs/ref/#view.EditorView.documentTop)).
  */
  elementAtHeight(e) {
    return this.readMeasured(), this.viewState.elementAtHeight(e);
  }
  /**
  Find the line block (see
  [`lineBlockAt`](https://codemirror.net/6/docs/ref/#view.EditorView.lineBlockAt)) at the given
  height, again interpreted relative to the [top of the
  document](https://codemirror.net/6/docs/ref/#view.EditorView.documentTop).
  */
  lineBlockAtHeight(e) {
    return this.readMeasured(), this.viewState.lineBlockAtHeight(e);
  }
  /**
  Get the extent and vertical position of all [line
  blocks](https://codemirror.net/6/docs/ref/#view.EditorView.lineBlockAt) in the viewport. Positions
  are relative to the [top of the
  document](https://codemirror.net/6/docs/ref/#view.EditorView.documentTop);
  */
  get viewportLineBlocks() {
    return this.viewState.viewportLines;
  }
  /**
  Find the line block around the given document position. A line
  block is a range delimited on both sides by either a
  non-[hidden](https://codemirror.net/6/docs/ref/#view.Decoration^replace) line break, or the
  start/end of the document. It will usually just hold a line of
  text, but may be broken into multiple textblocks by block
  widgets.
  */
  lineBlockAt(e) {
    return this.viewState.lineBlockAt(e);
  }
  /**
  The editor's total content height.
  */
  get contentHeight() {
    return this.viewState.contentHeight;
  }
  /**
  Move a cursor position by [grapheme
  cluster](https://codemirror.net/6/docs/ref/#state.findClusterBreak). `forward` determines whether
  the motion is away from the line start, or towards it. In
  bidirectional text, the line is traversed in visual order, using
  the editor's [text direction](https://codemirror.net/6/docs/ref/#view.EditorView.textDirection).
  When the start position was the last one on the line, the
  returned position will be across the line break. If there is no
  further line, the original position is returned.
  
  By default, this method moves over a single cluster. The
  optional `by` argument can be used to move across more. It will
  be called with the first cluster as argument, and should return
  a predicate that determines, for each subsequent cluster,
  whether it should also be moved over.
  */
  moveByChar(e, t, i) {
    return is(this, e, Il(this, e, t, i));
  }
  /**
  Move a cursor position across the next group of either
  [letters](https://codemirror.net/6/docs/ref/#state.EditorState.charCategorizer) or non-letter
  non-whitespace characters.
  */
  moveByGroup(e, t) {
    return is(this, e, Il(this, e, t, (i) => _O(this, e.head, i)));
  }
  /**
  Get the cursor position visually at the start or end of a line.
  Note that this may differ from the _logical_ position at its
  start or end (which is simply at `line.from`/`line.to`) if text
  at the start or end goes against the line's base text direction.
  */
  visualLineSide(e, t) {
    let i = this.bidiSpans(e), r = this.textDirectionAt(e.from), s = i[t ? i.length - 1 : 0];
    return b.cursor(s.side(t, r) + e.from, s.forward(!t, r) ? 1 : -1);
  }
  /**
  Move to the next line boundary in the given direction. If
  `includeWrap` is true, line wrapping is on, and there is a
  further wrap point on the current line, the wrap point will be
  returned. Otherwise this function will return the start or end
  of the line.
  */
  moveToLineBoundary(e, t, i = !0) {
    return EO(this, e, t, i);
  }
  /**
  Move a cursor position vertically. When `distance` isn't given,
  it defaults to moving to the next line (including wrapped
  lines). Otherwise, `distance` should provide a positive distance
  in pixels.
  
  When `start` has a
  [`goalColumn`](https://codemirror.net/6/docs/ref/#state.SelectionRange.goalColumn), the vertical
  motion will use that as a target horizontal position. Otherwise,
  the cursor's own horizontal position is used. The returned
  cursor will have its goal column set to whichever column was
  used.
  */
  moveVertically(e, t, i) {
    return is(this, e, DO(this, e, t, i));
  }
  /**
  Find the DOM parent node and offset (child offset if `node` is
  an element, character offset when it is a text node) at the
  given document position.
  
  Note that for positions that aren't currently in
  `visibleRanges`, the resulting DOM position isn't necessarily
  meaningful (it may just point before or after a placeholder
  element).
  */
  domAtPos(e, t = 1) {
    return this.docView.domAtPos(e, t);
  }
  /**
  Find the document position at the given DOM node. Can be useful
  for associating positions with DOM events. Will raise an error
  when `node` isn't part of the editor content.
  */
  posAtDOM(e, t = 0) {
    return this.docView.posFromDOM(e, t);
  }
  posAtCoords(e, t = !0) {
    this.readMeasured();
    let i = ro(this, e, t);
    return i && i.pos;
  }
  posAndSideAtCoords(e, t = !0) {
    return this.readMeasured(), ro(this, e, t);
  }
  /**
  Get the screen coordinates at the given document position.
  `side` determines whether the coordinates are based on the
  element before (-1) or after (1) the position (if no element is
  available on the given side, the method will transparently use
  another strategy to get reasonable coordinates).
  */
  coordsAtPos(e, t = 1) {
    this.readMeasured();
    let i = this.docView.coordsAt(e, t);
    if (!i || i.left == i.right)
      return i;
    let r = this.state.doc.lineAt(e), s = this.bidiSpans(r), o = s[it.find(s, e - r.from, -1, t)];
    return rr(i, o.dir == N.LTR == t > 0);
  }
  /**
  Return the rectangle around a given character. If `pos` does not
  point in front of a character that is in the viewport and
  rendered (i.e. not replaced, not a line break), this will return
  null. For space characters that are a line wrap point, this will
  return the position before the line break.
  */
  coordsForChar(e) {
    return this.readMeasured(), this.docView.coordsForChar(e);
  }
  /**
  The default width of a character in the editor. May not
  accurately reflect the width of all characters (given variable
  width fonts or styling of invididual ranges).
  */
  get defaultCharacterWidth() {
    return this.viewState.heightOracle.charWidth;
  }
  /**
  The default height of a line in the editor. May not be accurate
  for all lines.
  */
  get defaultLineHeight() {
    return this.viewState.heightOracle.lineHeight;
  }
  /**
  The text direction
  ([`direction`](https://developer.mozilla.org/en-US/docs/Web/CSS/direction)
  CSS property) of the editor's content element.
  */
  get textDirection() {
    return this.viewState.defaultTextDirection;
  }
  /**
  Find the text direction of the block at the given position, as
  assigned by CSS. If
  [`perLineTextDirection`](https://codemirror.net/6/docs/ref/#view.EditorView^perLineTextDirection)
  isn't enabled, or the given position is outside of the viewport,
  this will always return the same as
  [`textDirection`](https://codemirror.net/6/docs/ref/#view.EditorView.textDirection). Note that
  this may trigger a DOM layout.
  */
  textDirectionAt(e) {
    return !this.state.facet($c) || e < this.viewport.from || e > this.viewport.to ? this.textDirection : (this.readMeasured(), this.docView.textDirectionAt(e));
  }
  /**
  Whether this editor [wraps lines](https://codemirror.net/6/docs/ref/#view.EditorView.lineWrapping)
  (as determined by the
  [`white-space`](https://developer.mozilla.org/en-US/docs/Web/CSS/white-space)
  CSS property of its content element).
  */
  get lineWrapping() {
    return this.viewState.heightOracle.lineWrapping;
  }
  /**
  Returns the bidirectional text structure of the given line
  (which should be in the current document) as an array of span
  objects. The order of these spans matches the [text
  direction](https://codemirror.net/6/docs/ref/#view.EditorView.textDirection)—if that is
  left-to-right, the leftmost spans come first, otherwise the
  rightmost spans come first.
  */
  bidiSpans(e) {
    if (e.length > Cp)
      return gc(e.length);
    let t = this.textDirectionAt(e.from), i;
    for (let s of this.bidiCache)
      if (s.from == e.from && s.dir == t && (s.fresh || mc(s.isolates, i = ql(this, e))))
        return s.order;
    i || (i = ql(this, e));
    let r = fO(e.text, t, i);
    return this.bidiCache.push(new cr(e.from, e.to, t, i, !0, r)), r;
  }
  /**
  Check whether the editor has focus.
  */
  get hasFocus() {
    var e;
    return (this.dom.ownerDocument.hasFocus() || C.safari && ((e = this.inputState) === null || e === void 0 ? void 0 : e.lastContextMenu) > Date.now() - 3e4) && this.root.activeElement == this.contentDOM;
  }
  /**
  Put focus on the editor.
  */
  focus() {
    this.observer.ignore(() => {
      cc(this.contentDOM), this.docView.updateSelection();
    });
  }
  /**
  Update the [root](https://codemirror.net/6/docs/ref/##view.EditorViewConfig.root) in which the editor lives. This is only
  necessary when moving the editor's existing DOM to a new window or shadow root.
  */
  setRoot(e) {
    this._root != e && (this._root = e, this.observer.setWindow((e.nodeType == 9 ? e : e.ownerDocument).defaultView || window), this.mountStyles());
  }
  /**
  Clean up this editor view, removing its element from the
  document, unregistering event handlers, and notifying
  plugins. The view instance can no longer be used after
  calling this.
  */
  destroy() {
    this.root.activeElement == this.contentDOM && this.contentDOM.blur();
    for (let e of this.plugins)
      e.destroy(this);
    this.plugins = [], this.inputState.destroy(), this.docView.destroy(), this.dom.remove(), this.observer.destroy(), this.measureScheduled > -1 && this.win.cancelAnimationFrame(this.measureScheduled), this.destroyed = !0;
  }
  /**
  Returns an effect that can be
  [added](https://codemirror.net/6/docs/ref/#state.TransactionSpec.effects) to a transaction to
  cause it to scroll the given position or range into view.
  */
  static scrollIntoView(e, t = {}) {
    return xn.of(new ri(typeof e == "number" ? b.cursor(e) : e, t.y, t.x, t.yMargin, t.xMargin));
  }
  /**
  Return an effect that resets the editor to its current (at the
  time this method was called) scroll position. Note that this
  only affects the editor's own scrollable element, not parents.
  See also
  [`EditorViewConfig.scrollTo`](https://codemirror.net/6/docs/ref/#view.EditorViewConfig.scrollTo).
  
  The effect should be used with a document identical to the one
  it was created for. Failing to do so is not an error, but may
  not scroll to the expected position. You can
  [map](https://codemirror.net/6/docs/ref/#state.StateEffect.map) the effect to account for changes.
  */
  scrollSnapshot() {
    let { scrollTop: e, scrollLeft: t } = this.scrollDOM, i = this.viewState.scrollAnchorAt(e);
    return xn.of(new ri(b.cursor(i.from), "start", "start", i.top - e, t, !0));
  }
  /**
  Enable or disable tab-focus mode, which disables key bindings
  for Tab and Shift-Tab, letting the browser's default
  focus-changing behavior go through instead. This is useful to
  prevent trapping keyboard users in your editor.
  
  Without argument, this toggles the mode. With a boolean, it
  enables (true) or disables it (false). Given a number, it
  temporarily enables the mode until that number of milliseconds
  have passed or another non-Tab key is pressed.
  */
  setTabFocusMode(e) {
    e == null ? this.inputState.tabFocusMode = this.inputState.tabFocusMode < 0 ? 0 : -1 : typeof e == "boolean" ? this.inputState.tabFocusMode = e ? 0 : -1 : this.inputState.tabFocusMode != 0 && (this.inputState.tabFocusMode = Date.now() + e);
  }
  /**
  Returns an extension that can be used to add DOM event handlers.
  The value should be an object mapping event names to handler
  functions. For any given event, such functions are ordered by
  extension precedence, and the first handler to return true will
  be assumed to have handled that event, and no other handlers or
  built-in behavior will be activated for it. These are registered
  on the [content element](https://codemirror.net/6/docs/ref/#view.EditorView.contentDOM), except
  for `scroll` handlers, which will be called any time the
  editor's [scroll element](https://codemirror.net/6/docs/ref/#view.EditorView.scrollDOM) or one of
  its parent nodes is scrolled.
  */
  static domEventHandlers(e) {
    return ee.define(() => ({}), { eventHandlers: e });
  }
  /**
  Create an extension that registers DOM event observers. Contrary
  to event [handlers](https://codemirror.net/6/docs/ref/#view.EditorView^domEventHandlers),
  observers can't be prevented from running by a higher-precedence
  handler returning true. They also don't prevent other handlers
  and observers from running when they return true, and should not
  call `preventDefault`.
  */
  static domEventObservers(e) {
    return ee.define(() => ({}), { eventObservers: e });
  }
  /**
  Create a theme extension. The first argument can be a
  [`style-mod`](https://github.com/marijnh/style-mod#documentation)
  style spec providing the styles for the theme. These will be
  prefixed with a generated class for the style.
  
  Because the selectors will be prefixed with a scope class, rule
  that directly match the editor's [wrapper
  element](https://codemirror.net/6/docs/ref/#view.EditorView.dom)—to which the scope class will be
  added—need to be explicitly differentiated by adding an `&` to
  the selector for that element—for example
  `&.cm-focused`.
  
  When `dark` is set to true, the theme will be marked as dark,
  which will cause the `&dark` rules from [base
  themes](https://codemirror.net/6/docs/ref/#view.EditorView^baseTheme) to be used (as opposed to
  `&light` when a light theme is active).
  */
  static theme(e, t) {
    let i = Pt.newName(), r = [Tn.of(i), Ai.of(ao(`.${i}`, e))];
    return t && t.dark && r.push(oo.of(!0)), r;
  }
  /**
  Create an extension that adds styles to the base theme. Like
  with [`theme`](https://codemirror.net/6/docs/ref/#view.EditorView^theme), use `&` to indicate the
  place of the editor wrapper element when directly targeting
  that. You can also use `&dark` or `&light` instead to only
  target editors with a dark or light theme.
  */
  static baseTheme(e) {
    return At.lowest(Ai.of(ao("." + lo, e, Fc)));
  }
  /**
  Retrieve an editor view instance from the view's DOM
  representation.
  */
  static findFromDOM(e) {
    var t;
    let i = e.querySelector(".cm-content"), r = i && ie.get(i) || ie.get(e);
    return ((t = r == null ? void 0 : r.root) === null || t === void 0 ? void 0 : t.view) || null;
  }
}
v.styleModule = Ai;
v.inputHandler = wc;
v.clipboardInputFilter = Eo;
v.clipboardOutputFilter = _o;
v.scrollHandler = vc;
v.focusChangeEffect = kc;
v.perLineTextDirection = $c;
v.exceptionSink = xc;
v.updateListener = to;
v.editable = dt;
v.mouseSelectionStyle = yc;
v.dragMovesSelection = Sc;
v.clickAddsSelectionRange = bc;
v.decorations = Mr;
v.blockWrappers = Zc;
v.outerDecorations = qo;
v.atomicRanges = cn;
v.bidiIsolatedRanges = Xc;
v.scrollMargins = Ac;
v.darkTheme = oo;
v.cspNonce = /* @__PURE__ */ T.define({ combine: (n) => n.length ? n[0] : "" });
v.contentAttributes = Do;
v.editorAttributes = Cc;
v.lineWrapping = /* @__PURE__ */ v.contentAttributes.of({ class: "cm-lineWrapping" });
v.announce = /* @__PURE__ */ M.define();
const Cp = 4096, aa = {};
class cr {
  constructor(e, t, i, r, s, o) {
    this.from = e, this.to = t, this.dir = i, this.isolates = r, this.fresh = s, this.order = o;
  }
  static update(e, t) {
    if (t.empty && !e.some((s) => s.fresh))
      return e;
    let i = [], r = e.length ? e[e.length - 1].dir : N.LTR;
    for (let s = Math.max(0, e.length - 10); s < e.length; s++) {
      let o = e[s];
      o.dir == r && !t.touchesRange(o.from, o.to) && i.push(new cr(t.mapPos(o.from, 1), t.mapPos(o.to, -1), o.dir, o.isolates, !1, o.order));
    }
    return i;
  }
}
function ha(n, e, t) {
  for (let i = n.state.facet(e), r = i.length - 1; r >= 0; r--) {
    let s = i[r], o = typeof s == "function" ? s(n) : s;
    o && zo(o, t);
  }
  return t;
}
const Zp = C.mac ? "mac" : C.windows ? "win" : C.linux ? "linux" : "key";
function Xp(n, e) {
  const t = n.split(/-(?!$)/);
  let i = t[t.length - 1];
  i == "Space" && (i = " ");
  let r, s, o, l;
  for (let a = 0; a < t.length - 1; ++a) {
    const h = t[a];
    if (/^(cmd|meta|m)$/i.test(h))
      l = !0;
    else if (/^a(lt)?$/i.test(h))
      r = !0;
    else if (/^(c|ctrl|control)$/i.test(h))
      s = !0;
    else if (/^s(hift)?$/i.test(h))
      o = !0;
    else if (/^mod$/i.test(h))
      e == "mac" ? l = !0 : s = !0;
    else
      throw new Error("Unrecognized modifier name: " + h);
  }
  return r && (i = "Alt-" + i), s && (i = "Ctrl-" + i), l && (i = "Meta-" + i), o && (i = "Shift-" + i), i;
}
function Cn(n, e, t) {
  return e.altKey && (n = "Alt-" + n), e.ctrlKey && (n = "Ctrl-" + n), e.metaKey && (n = "Meta-" + n), t !== !1 && e.shiftKey && (n = "Shift-" + n), n;
}
const Ap = /* @__PURE__ */ At.default(/* @__PURE__ */ v.domEventHandlers({
  keydown(n, e) {
    return Kc(Hc(e.state), n, e, "editor");
  }
})), fn = /* @__PURE__ */ T.define({ enables: Ap }), ca = /* @__PURE__ */ new WeakMap();
function Hc(n) {
  let e = n.facet(fn), t = ca.get(e);
  return t || ca.set(e, t = zp(e.reduce((i, r) => i.concat(r), []))), t;
}
function Mp(n, e, t) {
  return Kc(Hc(n.state), e, n, t);
}
let xt = null;
const Rp = 4e3;
function zp(n, e = Zp) {
  let t = /* @__PURE__ */ Object.create(null), i = /* @__PURE__ */ Object.create(null), r = (o, l) => {
    let a = i[o];
    if (a == null)
      i[o] = l;
    else if (a != l)
      throw new Error("Key binding " + o + " is used both as a regular binding and as a multi-stroke prefix");
  }, s = (o, l, a, h, c) => {
    var f, u;
    let d = t[o] || (t[o] = /* @__PURE__ */ Object.create(null)), O = l.split(/ (?!$)/).map((Q) => Xp(Q, e));
    for (let Q = 1; Q < O.length; Q++) {
      let S = O.slice(0, Q).join(" ");
      r(S, !0), d[S] || (d[S] = {
        preventDefault: !0,
        stopPropagation: !1,
        run: [(y) => {
          let k = xt = { view: y, prefix: S, scope: o };
          return setTimeout(() => {
            xt == k && (xt = null);
          }, Rp), !0;
        }]
      });
    }
    let m = O.join(" ");
    r(m, !1);
    let g = d[m] || (d[m] = {
      preventDefault: !1,
      stopPropagation: !1,
      run: ((u = (f = d._any) === null || f === void 0 ? void 0 : f.run) === null || u === void 0 ? void 0 : u.slice()) || []
    });
    a && g.run.push(a), h && (g.preventDefault = !0), c && (g.stopPropagation = !0);
  };
  for (let o of n) {
    let l = o.scope ? o.scope.split(" ") : ["editor"];
    if (o.any)
      for (let h of l) {
        let c = t[h] || (t[h] = /* @__PURE__ */ Object.create(null));
        c._any || (c._any = { preventDefault: !1, stopPropagation: !1, run: [] });
        let { any: f } = o;
        for (let u in c)
          c[u].run.push((d) => f(d, ho));
      }
    let a = o[e] || o.key;
    if (a)
      for (let h of l)
        s(h, a, o.run, o.preventDefault, o.stopPropagation), o.shift && s(h, "Shift-" + a, o.shift, o.preventDefault, o.stopPropagation);
  }
  return t;
}
let ho = null;
function Kc(n, e, t, i) {
  ho = e;
  let r = Gd(e), s = Se(r, 0), o = et(s) == r.length && r != " ", l = "", a = !1, h = !1, c = !1;
  xt && xt.view == t && xt.scope == i && (l = xt.prefix + " ", Dc.indexOf(e.keyCode) < 0 && (h = !0, xt = null));
  let f = /* @__PURE__ */ new Set(), u = (g) => {
    if (g) {
      for (let Q of g.run)
        if (!f.has(Q) && (f.add(Q), Q(t)))
          return g.stopPropagation && (c = !0), !0;
      g.preventDefault && (g.stopPropagation && (c = !0), h = !0);
    }
    return !1;
  }, d = n[i], O, m;
  return d && (u(d[l + Cn(r, e, !o)]) ? a = !0 : o && (e.altKey || e.metaKey || e.ctrlKey) && // Ctrl-Alt may be used for AltGr on Windows
  !(C.windows && e.ctrlKey && e.altKey) && // Alt-combinations on macOS tend to be typed characters
  !(C.mac && e.altKey && !(e.ctrlKey || e.metaKey)) && (O = vt[e.keyCode]) && O != r ? (u(d[l + Cn(O, e, !0)]) || e.shiftKey && (m = Ii[e.keyCode]) != r && m != O && u(d[l + Cn(m, e, !1)])) && (a = !0) : o && e.shiftKey && u(d[l + Cn(r, e, !0)]) && (a = !0), !a && u(d._any) && (a = !0)), h && (a = !0), a && c && e.stopPropagation(), ho = null, a;
}
class un {
  /**
  Create a marker with the given class and dimensions. If `width`
  is null, the DOM element will get no width style.
  */
  constructor(e, t, i, r, s) {
    this.className = e, this.left = t, this.top = i, this.width = r, this.height = s;
  }
  draw() {
    let e = document.createElement("div");
    return e.className = this.className, this.adjust(e), e;
  }
  update(e, t) {
    return t.className != this.className ? !1 : (this.adjust(e), !0);
  }
  adjust(e) {
    e.style.left = this.left + "px", e.style.top = this.top + "px", this.width != null && (e.style.width = this.width + "px"), e.style.height = this.height + "px";
  }
  eq(e) {
    return this.left == e.left && this.top == e.top && this.width == e.width && this.height == e.height && this.className == e.className;
  }
  /**
  Create a set of rectangles for the given selection range,
  assigning them theclass`className`. Will create a single
  rectangle for empty ranges, and a set of selection-style
  rectangles covering the range's content (in a bidi-aware
  way) for non-empty ones.
  */
  static forRange(e, t, i) {
    if (i.empty) {
      let r = e.coordsAtPos(i.head, i.assoc || 1);
      if (!r)
        return [];
      let s = Jc(e);
      return [new un(t, r.left - s.left, r.top - s.top, null, r.bottom - r.top)];
    } else
      return Yp(e, t, i);
  }
}
function Jc(n) {
  let e = n.scrollDOM.getBoundingClientRect();
  return { left: (n.textDirection == N.LTR ? e.left : e.right - n.scrollDOM.clientWidth * n.scaleX) - n.scrollDOM.scrollLeft * n.scaleX, top: e.top - n.scrollDOM.scrollTop * n.scaleY };
}
function fa(n, e, t, i) {
  let r = n.coordsAtPos(e, t * 2);
  if (!r)
    return i;
  let s = n.dom.getBoundingClientRect(), o = (r.top + r.bottom) / 2, l = n.posAtCoords({ x: s.left + 1, y: o }), a = n.posAtCoords({ x: s.right - 1, y: o });
  return l == null || a == null ? i : { from: Math.max(i.from, Math.min(l, a)), to: Math.min(i.to, Math.max(l, a)) };
}
function Yp(n, e, t) {
  if (t.to <= n.viewport.from || t.from >= n.viewport.to)
    return [];
  let i = Math.max(t.from, n.viewport.from), r = Math.min(t.to, n.viewport.to), s = n.textDirection == N.LTR, o = n.contentDOM, l = o.getBoundingClientRect(), a = Jc(n), h = o.querySelector(".cm-line"), c = h && window.getComputedStyle(h), f = l.left + (c ? parseInt(c.paddingLeft) + Math.min(0, parseInt(c.textIndent)) : 0), u = l.right - (c ? parseInt(c.paddingRight) : 0), d = no(n, i, 1), O = no(n, r, -1), m = d.type == fe.Text ? d : null, g = O.type == fe.Text ? O : null;
  if (m && (n.lineWrapping || d.widgetLineBreaks) && (m = fa(n, i, 1, m)), g && (n.lineWrapping || O.widgetLineBreaks) && (g = fa(n, r, -1, g)), m && g && m.from == g.from && m.to == g.to)
    return S(y(t.from, t.to, m));
  {
    let x = m ? y(t.from, null, m) : k(d, !1), $ = g ? y(null, t.to, g) : k(O, !0), w = [];
    return (m || d).to < (g || O).from - (m && g ? 1 : 0) || d.widgetLineBreaks > 1 && x.bottom + n.defaultLineHeight / 2 < $.top ? w.push(Q(f, x.bottom, u, $.top)) : x.bottom < $.top && n.elementAtHeight((x.bottom + $.top) / 2).type == fe.Text && (x.bottom = $.top = (x.bottom + $.top) / 2), S(x).concat(w).concat(S($));
  }
  function Q(x, $, w, R) {
    return new un(e, x - a.left, $ - a.top, Math.max(0, w - x), R - $);
  }
  function S({ top: x, bottom: $, horizontal: w }) {
    let R = [];
    for (let Y = 0; Y < w.length; Y += 2)
      R.push(Q(w[Y], x, w[Y + 1], $));
    return R;
  }
  function y(x, $, w) {
    let R = 1e9, Y = -1e9, I = [];
    function V(q, G, pe, $e, Ne) {
      let le = n.coordsAtPos(q, q == w.to ? -2 : 2), Ae = n.coordsAtPos(pe, pe == w.from ? 2 : -2);
      !le || !Ae || (R = Math.min(le.top, Ae.top, R), Y = Math.max(le.bottom, Ae.bottom, Y), Ne == N.LTR ? I.push(s && G ? f : le.left, s && $e ? u : Ae.right) : I.push(!s && $e ? f : Ae.left, !s && G ? u : le.right));
    }
    let A = x ?? w.from, L = $ ?? w.to;
    for (let q of n.visibleRanges)
      if (q.to > A && q.from < L)
        for (let G = Math.max(q.from, A), pe = Math.min(q.to, L); ; ) {
          let $e = n.state.doc.lineAt(G);
          for (let Ne of n.bidiSpans($e)) {
            let le = Ne.from + $e.from, Ae = Ne.to + $e.from;
            if (le >= pe)
              break;
            Ae > G && V(Math.max(le, G), x == null && le <= A, Math.min(Ae, pe), $ == null && Ae >= L, Ne.dir);
          }
          if (G = $e.to + 1, G >= pe)
            break;
        }
    return I.length == 0 && V(A, x == null, L, $ == null, n.textDirection), { top: R, bottom: Y, horizontal: I };
  }
  function k(x, $) {
    let w = l.top + ($ ? x.top : x.bottom);
    return { top: w, bottom: w, horizontal: [] };
  }
}
function Vp(n, e) {
  return n.constructor == e.constructor && n.eq(e);
}
class Ep {
  constructor(e, t) {
    this.view = e, this.layer = t, this.drawn = [], this.scaleX = 1, this.scaleY = 1, this.measureReq = { read: this.measure.bind(this), write: this.draw.bind(this) }, this.dom = e.scrollDOM.appendChild(document.createElement("div")), this.dom.classList.add("cm-layer"), t.above && this.dom.classList.add("cm-layer-above"), t.class && this.dom.classList.add(t.class), this.scale(), this.dom.setAttribute("aria-hidden", "true"), this.setOrder(e.state), e.requestMeasure(this.measureReq), t.mount && t.mount(this.dom, e);
  }
  update(e) {
    e.startState.facet(jn) != e.state.facet(jn) && this.setOrder(e.state), (this.layer.update(e, this.dom) || e.geometryChanged) && (this.scale(), e.view.requestMeasure(this.measureReq));
  }
  docViewUpdate(e) {
    this.layer.updateOnDocViewUpdate !== !1 && e.requestMeasure(this.measureReq);
  }
  setOrder(e) {
    let t = 0, i = e.facet(jn);
    for (; t < i.length && i[t] != this.layer; )
      t++;
    this.dom.style.zIndex = String((this.layer.above ? 150 : -1) - t);
  }
  measure() {
    return this.layer.markers(this.view);
  }
  scale() {
    let { scaleX: e, scaleY: t } = this.view;
    (e != this.scaleX || t != this.scaleY) && (this.scaleX = e, this.scaleY = t, this.dom.style.transform = `scale(${1 / e}, ${1 / t})`);
  }
  draw(e) {
    if (e.length != this.drawn.length || e.some((t, i) => !Vp(t, this.drawn[i]))) {
      let t = this.dom.firstChild, i = 0;
      for (let r of e)
        r.update && t && r.constructor && this.drawn[i].constructor && r.update(t, this.drawn[i]) ? (t = t.nextSibling, i++) : this.dom.insertBefore(r.draw(), t);
      for (; t; ) {
        let r = t.nextSibling;
        t.remove(), t = r;
      }
      this.drawn = e, C.safari && C.safari_version >= 26 && (this.dom.style.display = this.dom.firstChild ? "" : "none");
    }
  }
  destroy() {
    this.layer.destroy && this.layer.destroy(this.dom, this.view), this.dom.remove();
  }
}
const jn = /* @__PURE__ */ T.define();
function ef(n) {
  return [
    ee.define((e) => new Ep(e, n)),
    jn.of(n)
  ];
}
const Ui = /* @__PURE__ */ T.define({
  combine(n) {
    return at(n, {
      cursorBlinkRate: 1200,
      drawRangeCursor: !0
    }, {
      cursorBlinkRate: (e, t) => Math.min(e, t),
      drawRangeCursor: (e, t) => e || t
    });
  }
});
function _p(n = {}) {
  return [
    Ui.of(n),
    Dp,
    qp,
    Wp,
    Pc.of(!0)
  ];
}
function tf(n) {
  return n.startState.facet(Ui) != n.state.facet(Ui);
}
const Dp = /* @__PURE__ */ ef({
  above: !0,
  markers(n) {
    let { state: e } = n, t = e.facet(Ui), i = [];
    for (let r of e.selection.ranges) {
      let s = r == e.selection.main;
      if (r.empty || t.drawRangeCursor) {
        let o = s ? "cm-cursor cm-cursor-primary" : "cm-cursor cm-cursor-secondary", l = r.empty ? r : b.cursor(r.head, r.head > r.anchor ? -1 : 1);
        for (let a of un.forRange(n, o, l))
          i.push(a);
      }
    }
    return i;
  },
  update(n, e) {
    n.transactions.some((i) => i.selection) && (e.style.animationName = e.style.animationName == "cm-blink" ? "cm-blink2" : "cm-blink");
    let t = tf(n);
    return t && ua(n.state, e), n.docChanged || n.selectionSet || t;
  },
  mount(n, e) {
    ua(e.state, n);
  },
  class: "cm-cursorLayer"
});
function ua(n, e) {
  e.style.animationDuration = n.facet(Ui).cursorBlinkRate + "ms";
}
const qp = /* @__PURE__ */ ef({
  above: !1,
  markers(n) {
    return n.state.selection.ranges.map((e) => e.empty ? [] : un.forRange(n, "cm-selectionBackground", e)).reduce((e, t) => e.concat(t));
  },
  update(n, e) {
    return n.docChanged || n.selectionSet || n.viewportChanged || tf(n);
  },
  class: "cm-selectionLayer"
}), Wp = /* @__PURE__ */ At.highest(/* @__PURE__ */ v.theme({
  ".cm-line": {
    "& ::selection, &::selection": { backgroundColor: "transparent !important" },
    caretColor: "transparent !important"
  },
  ".cm-content": {
    caretColor: "transparent !important",
    "& :focus": {
      caretColor: "initial !important",
      "&::selection, & ::selection": {
        backgroundColor: "Highlight !important"
      }
    }
  }
})), nf = /* @__PURE__ */ M.define({
  map(n, e) {
    return n == null ? null : e.mapPos(n);
  }
}), zi = /* @__PURE__ */ oe.define({
  create() {
    return null;
  },
  update(n, e) {
    return n != null && (n = e.changes.mapPos(n)), e.effects.reduce((t, i) => i.is(nf) ? i.value : t, n);
  }
}), Lp = /* @__PURE__ */ ee.fromClass(class {
  constructor(n) {
    this.view = n, this.cursor = null, this.measureReq = { read: this.readPos.bind(this), write: this.drawCursor.bind(this) };
  }
  update(n) {
    var e;
    let t = n.state.field(zi);
    t == null ? this.cursor != null && ((e = this.cursor) === null || e === void 0 || e.remove(), this.cursor = null) : (this.cursor || (this.cursor = this.view.scrollDOM.appendChild(document.createElement("div")), this.cursor.className = "cm-dropCursor"), (n.startState.field(zi) != t || n.docChanged || n.geometryChanged) && this.view.requestMeasure(this.measureReq));
  }
  readPos() {
    let { view: n } = this, e = n.state.field(zi), t = e != null && n.coordsAtPos(e);
    if (!t)
      return null;
    let i = n.scrollDOM.getBoundingClientRect();
    return {
      left: t.left - i.left + n.scrollDOM.scrollLeft * n.scaleX,
      top: t.top - i.top + n.scrollDOM.scrollTop * n.scaleY,
      height: t.bottom - t.top
    };
  }
  drawCursor(n) {
    if (this.cursor) {
      let { scaleX: e, scaleY: t } = this.view;
      n ? (this.cursor.style.left = n.left / e + "px", this.cursor.style.top = n.top / t + "px", this.cursor.style.height = n.height / t + "px") : this.cursor.style.left = "-100000px";
    }
  }
  destroy() {
    this.cursor && this.cursor.remove();
  }
  setDropPos(n) {
    this.view.state.field(zi) != n && this.view.dispatch({ effects: nf.of(n) });
  }
}, {
  eventObservers: {
    dragover(n) {
      this.setDropPos(this.view.posAtCoords({ x: n.clientX, y: n.clientY }));
    },
    dragleave(n) {
      (n.target == this.view.contentDOM || !this.view.contentDOM.contains(n.relatedTarget)) && this.setDropPos(null);
    },
    dragend() {
      this.setDropPos(null);
    },
    drop() {
      this.setDropPos(null);
    }
  }
});
function Bp() {
  return [zi, Lp];
}
function da(n, e, t, i, r) {
  e.lastIndex = 0;
  for (let s = n.iterRange(t, i), o = t, l; !s.next().done; o += s.value.length)
    if (!s.lineBreak)
      for (; l = e.exec(s.value); )
        r(o + l.index, l);
}
function Ip(n, e) {
  let t = n.visibleRanges;
  if (t.length == 1 && t[0].from == n.viewport.from && t[0].to == n.viewport.to)
    return t;
  let i = [];
  for (let { from: r, to: s } of t)
    r = Math.max(n.state.doc.lineAt(r).from, r - e), s = Math.min(n.state.doc.lineAt(s).to, s + e), i.length && i[i.length - 1].to >= r ? i[i.length - 1].to = s : i.push({ from: r, to: s });
  return i;
}
class jp {
  /**
  Create a decorator.
  */
  constructor(e) {
    const { regexp: t, decoration: i, decorate: r, boundary: s, maxLength: o = 1e3 } = e;
    if (!t.global)
      throw new RangeError("The regular expression given to MatchDecorator should have its 'g' flag set");
    if (this.regexp = t, r)
      this.addMatch = (l, a, h, c) => r(c, h, h + l[0].length, l, a);
    else if (typeof i == "function")
      this.addMatch = (l, a, h, c) => {
        let f = i(l, a, h);
        f && c(h, h + l[0].length, f);
      };
    else if (i)
      this.addMatch = (l, a, h, c) => c(h, h + l[0].length, i);
    else
      throw new RangeError("Either 'decorate' or 'decoration' should be provided to MatchDecorator");
    this.boundary = s, this.maxLength = o;
  }
  /**
  Compute the full set of decorations for matches in the given
  view's viewport. You'll want to call this when initializing your
  plugin.
  */
  createDeco(e) {
    let t = new mt(), i = t.add.bind(t);
    for (let { from: r, to: s } of Ip(e, this.maxLength))
      da(e.state.doc, this.regexp, r, s, (o, l) => this.addMatch(l, e, o, i));
    return t.finish();
  }
  /**
  Update a set of decorations for a view update. `deco` _must_ be
  the set of decorations produced by _this_ `MatchDecorator` for
  the view state before the update.
  */
  updateDeco(e, t) {
    let i = 1e9, r = -1;
    return e.docChanged && e.changes.iterChanges((s, o, l, a) => {
      a >= e.view.viewport.from && l <= e.view.viewport.to && (i = Math.min(l, i), r = Math.max(a, r));
    }), e.viewportMoved || r - i > 1e3 ? this.createDeco(e.view) : r > -1 ? this.updateRange(e.view, t.map(e.changes), i, r) : t;
  }
  updateRange(e, t, i, r) {
    for (let s of e.visibleRanges) {
      let o = Math.max(s.from, i), l = Math.min(s.to, r);
      if (l >= o) {
        let a = e.state.doc.lineAt(o), h = a.to < l ? e.state.doc.lineAt(l) : a, c = Math.max(s.from, a.from), f = Math.min(s.to, h.to);
        if (this.boundary) {
          for (; o > a.from; o--)
            if (this.boundary.test(a.text[o - 1 - a.from])) {
              c = o;
              break;
            }
          for (; l < h.to; l++)
            if (this.boundary.test(h.text[l - h.from])) {
              f = l;
              break;
            }
        }
        let u = [], d, O = (m, g, Q) => u.push(Q.range(m, g));
        if (a == h)
          for (this.regexp.lastIndex = c - a.from; (d = this.regexp.exec(a.text)) && d.index < f - a.from; )
            this.addMatch(d, e, d.index + a.from, O);
        else
          da(e.state.doc, this.regexp, c, f, (m, g) => this.addMatch(g, e, m, O));
        t = t.update({ filterFrom: c, filterTo: f, filter: (m, g) => m < c || g > f, add: u });
      }
    }
    return t;
  }
}
const co = /x/.unicode != null ? "gu" : "g", Np = /* @__PURE__ */ new RegExp(`[\0-\b
--­؜​‎‏\u2028\u2029‭‮⁦⁧⁩\uFEFF￹-￼]`, co), Gp = {
  0: "null",
  7: "bell",
  8: "backspace",
  10: "newline",
  11: "vertical tab",
  13: "carriage return",
  27: "escape",
  8203: "zero width space",
  8204: "zero width non-joiner",
  8205: "zero width joiner",
  8206: "left-to-right mark",
  8207: "right-to-left mark",
  8232: "line separator",
  8237: "left-to-right override",
  8238: "right-to-left override",
  8294: "left-to-right isolate",
  8295: "right-to-left isolate",
  8297: "pop directional isolate",
  8233: "paragraph separator",
  65279: "zero width no-break space",
  65532: "object replacement"
};
let ss = null;
function Up() {
  var n;
  if (ss == null && typeof document < "u" && document.body) {
    let e = document.body.style;
    ss = ((n = e.tabSize) !== null && n !== void 0 ? n : e.MozTabSize) != null;
  }
  return ss || !1;
}
const Nn = /* @__PURE__ */ T.define({
  combine(n) {
    let e = at(n, {
      render: null,
      specialChars: Np,
      addSpecialChars: null
    });
    return (e.replaceTabs = !Up()) && (e.specialChars = new RegExp("	|" + e.specialChars.source, co)), e.addSpecialChars && (e.specialChars = new RegExp(e.specialChars.source + "|" + e.addSpecialChars.source, co)), e;
  }
});
function Fp(n = {}) {
  return [Nn.of(n), Hp()];
}
let Oa = null;
function Hp() {
  return Oa || (Oa = ee.fromClass(class {
    constructor(n) {
      this.view = n, this.decorations = Z.none, this.decorationCache = /* @__PURE__ */ Object.create(null), this.decorator = this.makeDecorator(n.state.facet(Nn)), this.decorations = this.decorator.createDeco(n);
    }
    makeDecorator(n) {
      return new jp({
        regexp: n.specialChars,
        decoration: (e, t, i) => {
          let { doc: r } = t.state, s = Se(e[0], 0);
          if (s == 9) {
            let o = r.lineAt(i), l = t.state.tabSize, a = Si(o.text, l, i - o.from);
            return Z.replace({
              widget: new tm((l - a % l) * this.view.defaultCharacterWidth / this.view.scaleX)
            });
          }
          return this.decorationCache[s] || (this.decorationCache[s] = Z.replace({ widget: new em(n, s) }));
        },
        boundary: n.replaceTabs ? void 0 : /[^]/
      });
    }
    update(n) {
      let e = n.state.facet(Nn);
      n.startState.facet(Nn) != e ? (this.decorator = this.makeDecorator(e), this.decorations = this.decorator.createDeco(n.view)) : this.decorations = this.decorator.updateDeco(n, this.decorations);
    }
  }, {
    decorations: (n) => n.decorations
  }));
}
const Kp = "•";
function Jp(n) {
  return n >= 32 ? Kp : n == 10 ? "␤" : String.fromCharCode(9216 + n);
}
class em extends ht {
  constructor(e, t) {
    super(), this.options = e, this.code = t;
  }
  eq(e) {
    return e.code == this.code;
  }
  toDOM(e) {
    let t = Jp(this.code), i = e.state.phrase("Control character") + " " + (Gp[this.code] || "0x" + this.code.toString(16)), r = this.options.render && this.options.render(this.code, i, t);
    if (r)
      return r;
    let s = document.createElement("span");
    return s.textContent = t, s.title = i, s.setAttribute("aria-label", i), s.className = "cm-specialChar", s;
  }
  ignoreEvent() {
    return !1;
  }
}
class tm extends ht {
  constructor(e) {
    super(), this.width = e;
  }
  eq(e) {
    return e.width == this.width;
  }
  toDOM() {
    let e = document.createElement("span");
    return e.textContent = "	", e.className = "cm-tab", e.style.width = this.width + "px", e;
  }
  ignoreEvent() {
    return !1;
  }
}
function im() {
  return rm;
}
const nm = /* @__PURE__ */ Z.line({ class: "cm-activeLine" }), rm = /* @__PURE__ */ ee.fromClass(class {
  constructor(n) {
    this.decorations = this.getDeco(n);
  }
  update(n) {
    (n.docChanged || n.selectionSet) && (this.decorations = this.getDeco(n.view));
  }
  getDeco(n) {
    let e = -1, t = [];
    for (let i of n.state.selection.ranges) {
      let r = n.lineBlockAt(i.head);
      r.from > e && (t.push(nm.range(r.from)), e = r.from);
    }
    return Z.set(t);
  }
}, {
  decorations: (n) => n.decorations
}), fo = 2e3;
function sm(n, e, t) {
  let i = Math.min(e.line, t.line), r = Math.max(e.line, t.line), s = [];
  if (e.off > fo || t.off > fo || e.col < 0 || t.col < 0) {
    let o = Math.min(e.off, t.off), l = Math.max(e.off, t.off);
    for (let a = i; a <= r; a++) {
      let h = n.doc.line(a);
      h.length <= l && s.push(b.range(h.from + o, h.to + l));
    }
  } else {
    let o = Math.min(e.col, t.col), l = Math.max(e.col, t.col);
    for (let a = i; a <= r; a++) {
      let h = n.doc.line(a), c = Bs(h.text, o, n.tabSize, !0);
      if (c < 0)
        s.push(b.cursor(h.to));
      else {
        let f = Bs(h.text, l, n.tabSize);
        s.push(b.range(h.from + c, h.from + f));
      }
    }
  }
  return s;
}
function om(n, e) {
  let t = n.coordsAtPos(n.viewport.from);
  return t ? Math.round(Math.abs((t.left - e) / n.defaultCharacterWidth)) : -1;
}
function pa(n, e) {
  let t = n.posAtCoords({ x: e.clientX, y: e.clientY }, !1), i = n.state.doc.lineAt(t), r = t - i.from, s = r > fo ? -1 : r == i.length ? om(n, e.clientX) : Si(i.text, n.state.tabSize, t - i.from);
  return { line: i.number, col: s, off: r };
}
function lm(n, e) {
  let t = pa(n, e), i = n.state.selection;
  return t ? {
    update(r) {
      if (r.docChanged) {
        let s = r.changes.mapPos(r.startState.doc.line(t.line).from), o = r.state.doc.lineAt(s);
        t = { line: o.number, col: t.col, off: Math.min(t.off, o.length) }, i = i.map(r.changes);
      }
    },
    get(r, s, o) {
      let l = pa(n, r);
      if (!l)
        return i;
      let a = sm(n.state, t, l);
      return a.length ? o ? b.create(a.concat(i.ranges)) : b.create(a) : i;
    }
  } : null;
}
function am(n) {
  let e = (t) => t.altKey && t.button == 0;
  return v.mouseSelectionStyle.of((t, i) => e(i) ? lm(t, i) : null);
}
const hm = {
  Alt: [18, (n) => !!n.altKey],
  Control: [17, (n) => !!n.ctrlKey],
  Shift: [16, (n) => !!n.shiftKey],
  Meta: [91, (n) => !!n.metaKey]
}, cm = { style: "cursor: crosshair" };
function fm(n = {}) {
  let [e, t] = hm[n.key || "Alt"], i = ee.fromClass(class {
    constructor(r) {
      this.view = r, this.isDown = !1;
    }
    set(r) {
      this.isDown != r && (this.isDown = r, this.view.update([]));
    }
  }, {
    eventObservers: {
      keydown(r) {
        this.set(r.keyCode == e || t(r));
      },
      keyup(r) {
        (r.keyCode == e || !t(r)) && this.set(!1);
      },
      mousemove(r) {
        this.set(t(r));
      }
    }
  });
  return [
    i,
    v.contentAttributes.of((r) => {
      var s;
      return !((s = r.plugin(i)) === null || s === void 0) && s.isDown ? cm : null;
    })
  ];
}
const Zn = "-10000px";
class rf {
  constructor(e, t, i, r) {
    this.facet = t, this.createTooltipView = i, this.removeTooltipView = r, this.input = e.state.facet(t), this.tooltips = this.input.filter((o) => o);
    let s = null;
    this.tooltipViews = this.tooltips.map((o) => s = i(o, s));
  }
  update(e, t) {
    var i;
    let r = e.state.facet(this.facet), s = r.filter((a) => a);
    if (r === this.input) {
      for (let a of this.tooltipViews)
        a.update && a.update(e);
      return !1;
    }
    let o = [], l = t ? [] : null;
    for (let a = 0; a < s.length; a++) {
      let h = s[a], c = -1;
      if (h) {
        for (let f = 0; f < this.tooltips.length; f++) {
          let u = this.tooltips[f];
          u && u.create == h.create && (c = f);
        }
        if (c < 0)
          o[a] = this.createTooltipView(h, a ? o[a - 1] : null), l && (l[a] = !!h.above);
        else {
          let f = o[a] = this.tooltipViews[c];
          l && (l[a] = t[c]), f.update && f.update(e);
        }
      }
    }
    for (let a of this.tooltipViews)
      o.indexOf(a) < 0 && (this.removeTooltipView(a), (i = a.destroy) === null || i === void 0 || i.call(a));
    return t && (l.forEach((a, h) => t[h] = a), t.length = l.length), this.input = r, this.tooltips = s, this.tooltipViews = o, !0;
  }
}
function um(n) {
  let e = n.dom.ownerDocument.documentElement;
  return { top: 0, left: 0, bottom: e.clientHeight, right: e.clientWidth };
}
const os = /* @__PURE__ */ T.define({
  combine: (n) => {
    var e, t, i;
    return {
      position: C.ios ? "absolute" : ((e = n.find((r) => r.position)) === null || e === void 0 ? void 0 : e.position) || "fixed",
      parent: ((t = n.find((r) => r.parent)) === null || t === void 0 ? void 0 : t.parent) || null,
      tooltipSpace: ((i = n.find((r) => r.tooltipSpace)) === null || i === void 0 ? void 0 : i.tooltipSpace) || um
    };
  }
}), ma = /* @__PURE__ */ new WeakMap(), jo = /* @__PURE__ */ ee.fromClass(class {
  constructor(n) {
    this.view = n, this.above = [], this.inView = !0, this.madeAbsolute = !1, this.lastTransaction = 0, this.measureTimeout = -1;
    let e = n.state.facet(os);
    this.position = e.position, this.parent = e.parent, this.classes = n.themeClasses, this.createContainer(), this.measureReq = { read: this.readMeasure.bind(this), write: this.writeMeasure.bind(this), key: this }, this.resizeObserver = typeof ResizeObserver == "function" ? new ResizeObserver(() => this.measureSoon()) : null, this.manager = new rf(n, No, (t, i) => this.createTooltip(t, i), (t) => {
      this.resizeObserver && this.resizeObserver.unobserve(t.dom), t.dom.remove();
    }), this.above = this.manager.tooltips.map((t) => !!t.above), this.intersectionObserver = typeof IntersectionObserver == "function" ? new IntersectionObserver((t) => {
      Date.now() > this.lastTransaction - 50 && t.length > 0 && t[t.length - 1].intersectionRatio < 1 && this.measureSoon();
    }, { threshold: [1] }) : null, this.observeIntersection(), n.win.addEventListener("resize", this.measureSoon = this.measureSoon.bind(this)), this.maybeMeasure();
  }
  createContainer() {
    this.parent ? (this.container = document.createElement("div"), this.container.style.position = "relative", this.container.className = this.view.themeClasses, this.parent.appendChild(this.container)) : this.container = this.view.dom;
  }
  observeIntersection() {
    if (this.intersectionObserver) {
      this.intersectionObserver.disconnect();
      for (let n of this.manager.tooltipViews)
        this.intersectionObserver.observe(n.dom);
    }
  }
  measureSoon() {
    this.measureTimeout < 0 && (this.measureTimeout = setTimeout(() => {
      this.measureTimeout = -1, this.maybeMeasure();
    }, 50));
  }
  update(n) {
    n.transactions.length && (this.lastTransaction = Date.now());
    let e = this.manager.update(n, this.above);
    e && this.observeIntersection();
    let t = e || n.geometryChanged, i = n.state.facet(os);
    if (i.position != this.position && !this.madeAbsolute) {
      this.position = i.position;
      for (let r of this.manager.tooltipViews)
        r.dom.style.position = this.position;
      t = !0;
    }
    if (i.parent != this.parent) {
      this.parent && this.container.remove(), this.parent = i.parent, this.createContainer();
      for (let r of this.manager.tooltipViews)
        this.container.appendChild(r.dom);
      t = !0;
    } else this.parent && this.view.themeClasses != this.classes && (this.classes = this.container.className = this.view.themeClasses);
    t && this.maybeMeasure();
  }
  createTooltip(n, e) {
    let t = n.create(this.view), i = e ? e.dom : null;
    if (t.dom.classList.add("cm-tooltip"), n.arrow && !t.dom.querySelector(".cm-tooltip > .cm-tooltip-arrow")) {
      let r = document.createElement("div");
      r.className = "cm-tooltip-arrow", t.dom.appendChild(r);
    }
    return t.dom.style.position = this.position, t.dom.style.top = Zn, t.dom.style.left = "0px", this.container.insertBefore(t.dom, i), t.mount && t.mount(this.view), this.resizeObserver && this.resizeObserver.observe(t.dom), t;
  }
  destroy() {
    var n, e, t;
    this.view.win.removeEventListener("resize", this.measureSoon);
    for (let i of this.manager.tooltipViews)
      i.dom.remove(), (n = i.destroy) === null || n === void 0 || n.call(i);
    this.parent && this.container.remove(), (e = this.resizeObserver) === null || e === void 0 || e.disconnect(), (t = this.intersectionObserver) === null || t === void 0 || t.disconnect(), clearTimeout(this.measureTimeout);
  }
  readMeasure() {
    let n = 1, e = 1, t = !1;
    if (this.position == "fixed" && this.manager.tooltipViews.length) {
      let { dom: s } = this.manager.tooltipViews[0];
      if (C.safari) {
        let o = s.getBoundingClientRect();
        t = Math.abs(o.top + 1e4) > 1 || Math.abs(o.left) > 1;
      } else
        t = !!s.offsetParent && s.offsetParent != this.container.ownerDocument.body;
    }
    if (t || this.position == "absolute")
      if (this.parent) {
        let s = this.parent.getBoundingClientRect();
        s.width && s.height && (n = s.width / this.parent.offsetWidth, e = s.height / this.parent.offsetHeight);
      } else
        ({ scaleX: n, scaleY: e } = this.view.viewState);
    let i = this.view.scrollDOM.getBoundingClientRect(), r = Wo(this.view);
    return {
      visible: {
        left: i.left + r.left,
        top: i.top + r.top,
        right: i.right - r.right,
        bottom: i.bottom - r.bottom
      },
      parent: this.parent ? this.container.getBoundingClientRect() : this.view.dom.getBoundingClientRect(),
      pos: this.manager.tooltips.map((s, o) => {
        let l = this.manager.tooltipViews[o];
        return l.getCoords ? l.getCoords(s.pos) : this.view.coordsAtPos(s.pos);
      }),
      size: this.manager.tooltipViews.map(({ dom: s }) => s.getBoundingClientRect()),
      space: this.view.state.facet(os).tooltipSpace(this.view),
      scaleX: n,
      scaleY: e,
      makeAbsolute: t
    };
  }
  writeMeasure(n) {
    var e;
    if (n.makeAbsolute) {
      this.madeAbsolute = !0, this.position = "absolute";
      for (let l of this.manager.tooltipViews)
        l.dom.style.position = "absolute";
    }
    let { visible: t, space: i, scaleX: r, scaleY: s } = n, o = [];
    for (let l = 0; l < this.manager.tooltips.length; l++) {
      let a = this.manager.tooltips[l], h = this.manager.tooltipViews[l], { dom: c } = h, f = n.pos[l], u = n.size[l];
      if (!f || a.clip !== !1 && (f.bottom <= Math.max(t.top, i.top) || f.top >= Math.min(t.bottom, i.bottom) || f.right < Math.max(t.left, i.left) - 0.1 || f.left > Math.min(t.right, i.right) + 0.1)) {
        c.style.top = Zn;
        continue;
      }
      let d = a.arrow ? h.dom.querySelector(".cm-tooltip-arrow") : null, O = d ? 7 : 0, m = u.right - u.left, g = (e = ma.get(h)) !== null && e !== void 0 ? e : u.bottom - u.top, Q = h.offset || Om, S = this.view.textDirection == N.LTR, y = u.width > i.right - i.left ? S ? i.left : i.right - u.width : S ? Math.max(i.left, Math.min(f.left - (d ? 14 : 0) + Q.x, i.right - m)) : Math.min(Math.max(i.left, f.left - m + (d ? 14 : 0) - Q.x), i.right - m), k = this.above[l];
      !a.strictSide && (k ? f.top - g - O - Q.y < i.top : f.bottom + g + O + Q.y > i.bottom) && k == i.bottom - f.bottom > f.top - i.top && (k = this.above[l] = !k);
      let x = (k ? f.top - i.top : i.bottom - f.bottom) - O;
      if (x < g && h.resize !== !1) {
        if (x < this.view.defaultLineHeight) {
          c.style.top = Zn;
          continue;
        }
        ma.set(h, g), c.style.height = (g = x) / s + "px";
      } else c.style.height && (c.style.height = "");
      let $ = k ? f.top - g - O - Q.y : f.bottom + O + Q.y, w = y + m;
      if (h.overlap !== !0)
        for (let R of o)
          R.left < w && R.right > y && R.top < $ + g && R.bottom > $ && ($ = k ? R.top - g - 2 - O : R.bottom + O + 2);
      if (this.position == "absolute" ? (c.style.top = ($ - n.parent.top) / s + "px", ga(c, (y - n.parent.left) / r)) : (c.style.top = $ / s + "px", ga(c, y / r)), d) {
        let R = f.left + (S ? Q.x : -Q.x) - (y + 14 - 7);
        d.style.left = R / r + "px";
      }
      h.overlap !== !0 && o.push({ left: y, top: $, right: w, bottom: $ + g }), c.classList.toggle("cm-tooltip-above", k), c.classList.toggle("cm-tooltip-below", !k), h.positioned && h.positioned(n.space);
    }
  }
  maybeMeasure() {
    if (this.manager.tooltips.length && (this.view.inView && this.view.requestMeasure(this.measureReq), this.inView != this.view.inView && (this.inView = this.view.inView, !this.inView)))
      for (let n of this.manager.tooltipViews)
        n.dom.style.top = Zn;
  }
}, {
  eventObservers: {
    scroll() {
      this.maybeMeasure();
    }
  }
});
function ga(n, e) {
  let t = parseInt(n.style.left, 10);
  (isNaN(t) || Math.abs(e - t) > 1) && (n.style.left = e + "px");
}
const dm = /* @__PURE__ */ v.baseTheme({
  ".cm-tooltip": {
    zIndex: 500,
    boxSizing: "border-box"
  },
  "&light .cm-tooltip": {
    border: "1px solid #bbb",
    backgroundColor: "#f5f5f5"
  },
  "&light .cm-tooltip-section:not(:first-child)": {
    borderTop: "1px solid #bbb"
  },
  "&dark .cm-tooltip": {
    backgroundColor: "#333338",
    color: "white"
  },
  ".cm-tooltip-arrow": {
    height: "7px",
    width: `${7 * 2}px`,
    position: "absolute",
    zIndex: -1,
    overflow: "hidden",
    "&:before, &:after": {
      content: "''",
      position: "absolute",
      width: 0,
      height: 0,
      borderLeft: "7px solid transparent",
      borderRight: "7px solid transparent"
    },
    ".cm-tooltip-above &": {
      bottom: "-7px",
      "&:before": {
        borderTop: "7px solid #bbb"
      },
      "&:after": {
        borderTop: "7px solid #f5f5f5",
        bottom: "1px"
      }
    },
    ".cm-tooltip-below &": {
      top: "-7px",
      "&:before": {
        borderBottom: "7px solid #bbb"
      },
      "&:after": {
        borderBottom: "7px solid #f5f5f5",
        top: "1px"
      }
    }
  },
  "&dark .cm-tooltip .cm-tooltip-arrow": {
    "&:before": {
      borderTopColor: "#333338",
      borderBottomColor: "#333338"
    },
    "&:after": {
      borderTopColor: "transparent",
      borderBottomColor: "transparent"
    }
  }
}), Om = { x: 0, y: 0 }, No = /* @__PURE__ */ T.define({
  enables: [jo, dm]
}), fr = /* @__PURE__ */ T.define({
  combine: (n) => n.reduce((e, t) => e.concat(t), [])
});
class Vr {
  // Needs to be static so that host tooltip instances always match
  static create(e) {
    return new Vr(e);
  }
  constructor(e) {
    this.view = e, this.mounted = !1, this.dom = document.createElement("div"), this.dom.classList.add("cm-tooltip-hover"), this.manager = new rf(e, fr, (t, i) => this.createHostedView(t, i), (t) => t.dom.remove());
  }
  createHostedView(e, t) {
    let i = e.create(this.view);
    return i.dom.classList.add("cm-tooltip-section"), this.dom.insertBefore(i.dom, t ? t.dom.nextSibling : this.dom.firstChild), this.mounted && i.mount && i.mount(this.view), i;
  }
  mount(e) {
    for (let t of this.manager.tooltipViews)
      t.mount && t.mount(e);
    this.mounted = !0;
  }
  positioned(e) {
    for (let t of this.manager.tooltipViews)
      t.positioned && t.positioned(e);
  }
  update(e) {
    this.manager.update(e);
  }
  destroy() {
    var e;
    for (let t of this.manager.tooltipViews)
      (e = t.destroy) === null || e === void 0 || e.call(t);
  }
  passProp(e) {
    let t;
    for (let i of this.manager.tooltipViews) {
      let r = i[e];
      if (r !== void 0) {
        if (t === void 0)
          t = r;
        else if (t !== r)
          return;
      }
    }
    return t;
  }
  get offset() {
    return this.passProp("offset");
  }
  get getCoords() {
    return this.passProp("getCoords");
  }
  get overlap() {
    return this.passProp("overlap");
  }
  get resize() {
    return this.passProp("resize");
  }
}
const pm = /* @__PURE__ */ No.compute([fr], (n) => {
  let e = n.facet(fr);
  return e.length === 0 ? null : {
    pos: Math.min(...e.map((t) => t.pos)),
    end: Math.max(...e.map((t) => {
      var i;
      return (i = t.end) !== null && i !== void 0 ? i : t.pos;
    })),
    create: Vr.create,
    above: e[0].above,
    arrow: e.some((t) => t.arrow)
  };
});
class mm {
  constructor(e, t, i, r, s) {
    this.view = e, this.source = t, this.field = i, this.setHover = r, this.hoverTime = s, this.hoverTimeout = -1, this.restartTimeout = -1, this.pending = null, this.lastMove = { x: 0, y: 0, target: e.dom, time: 0 }, this.checkHover = this.checkHover.bind(this), e.dom.addEventListener("mouseleave", this.mouseleave = this.mouseleave.bind(this)), e.dom.addEventListener("mousemove", this.mousemove = this.mousemove.bind(this));
  }
  update() {
    this.pending && (this.pending = null, clearTimeout(this.restartTimeout), this.restartTimeout = setTimeout(() => this.startHover(), 20));
  }
  get active() {
    return this.view.state.field(this.field);
  }
  checkHover() {
    if (this.hoverTimeout = -1, this.active.length)
      return;
    let e = Date.now() - this.lastMove.time;
    e < this.hoverTime ? this.hoverTimeout = setTimeout(this.checkHover, this.hoverTime - e) : this.startHover();
  }
  startHover() {
    clearTimeout(this.restartTimeout);
    let { view: e, lastMove: t } = this, i = e.docView.tile.nearest(t.target);
    if (!i)
      return;
    let r, s = 1;
    if (i.isWidget())
      r = i.posAtStart;
    else {
      if (r = e.posAtCoords(t), r == null)
        return;
      let l = e.coordsAtPos(r);
      if (!l || t.y < l.top || t.y > l.bottom || t.x < l.left - e.defaultCharacterWidth || t.x > l.right + e.defaultCharacterWidth)
        return;
      let a = e.bidiSpans(e.state.doc.lineAt(r)).find((c) => c.from <= r && c.to >= r), h = a && a.dir == N.RTL ? -1 : 1;
      s = t.x < l.left ? -h : h;
    }
    let o = this.source(e, r, s);
    if (o != null && o.then) {
      let l = this.pending = { pos: r };
      o.then((a) => {
        this.pending == l && (this.pending = null, a && !(Array.isArray(a) && !a.length) && e.dispatch({ effects: this.setHover.of(Array.isArray(a) ? a : [a]) }));
      }, (a) => we(e.state, a, "hover tooltip"));
    } else o && !(Array.isArray(o) && !o.length) && e.dispatch({ effects: this.setHover.of(Array.isArray(o) ? o : [o]) });
  }
  get tooltip() {
    let e = this.view.plugin(jo), t = e ? e.manager.tooltips.findIndex((i) => i.create == Vr.create) : -1;
    return t > -1 ? e.manager.tooltipViews[t] : null;
  }
  mousemove(e) {
    var t, i;
    this.lastMove = { x: e.clientX, y: e.clientY, target: e.target, time: Date.now() }, this.hoverTimeout < 0 && (this.hoverTimeout = setTimeout(this.checkHover, this.hoverTime));
    let { active: r, tooltip: s } = this;
    if (r.length && s && !gm(s.dom, e) || this.pending) {
      let { pos: o } = r[0] || this.pending, l = (i = (t = r[0]) === null || t === void 0 ? void 0 : t.end) !== null && i !== void 0 ? i : o;
      (o == l ? this.view.posAtCoords(this.lastMove) != o : !Qm(this.view, o, l, e.clientX, e.clientY)) && (this.view.dispatch({ effects: this.setHover.of([]) }), this.pending = null);
    }
  }
  mouseleave(e) {
    clearTimeout(this.hoverTimeout), this.hoverTimeout = -1;
    let { active: t } = this;
    if (t.length) {
      let { tooltip: i } = this;
      i && i.dom.contains(e.relatedTarget) ? this.watchTooltipLeave(i.dom) : this.view.dispatch({ effects: this.setHover.of([]) });
    }
  }
  watchTooltipLeave(e) {
    let t = (i) => {
      e.removeEventListener("mouseleave", t), this.active.length && !this.view.dom.contains(i.relatedTarget) && this.view.dispatch({ effects: this.setHover.of([]) });
    };
    e.addEventListener("mouseleave", t);
  }
  destroy() {
    clearTimeout(this.hoverTimeout), clearTimeout(this.restartTimeout), this.view.dom.removeEventListener("mouseleave", this.mouseleave), this.view.dom.removeEventListener("mousemove", this.mousemove);
  }
}
const Xn = 4;
function gm(n, e) {
  let { left: t, right: i, top: r, bottom: s } = n.getBoundingClientRect(), o;
  if (o = n.querySelector(".cm-tooltip-arrow")) {
    let l = o.getBoundingClientRect();
    r = Math.min(l.top, r), s = Math.max(l.bottom, s);
  }
  return e.clientX >= t - Xn && e.clientX <= i + Xn && e.clientY >= r - Xn && e.clientY <= s + Xn;
}
function Qm(n, e, t, i, r, s) {
  let o = n.scrollDOM.getBoundingClientRect(), l = n.documentTop + n.documentPadding.top + n.contentHeight;
  if (o.left > i || o.right < i || o.top > r || Math.min(o.bottom, l) < r)
    return !1;
  let a = n.posAtCoords({ x: i, y: r }, !1);
  return a >= e && a <= t;
}
function bm(n, e = {}) {
  let t = M.define(), i = oe.define({
    create() {
      return [];
    },
    update(r, s) {
      if (r.length && (e.hideOnChange && (s.docChanged || s.selection) ? r = [] : e.hideOn && (r = r.filter((o) => !e.hideOn(s, o))), s.docChanged)) {
        let o = [];
        for (let l of r) {
          let a = s.changes.mapPos(l.pos, -1, ce.TrackDel);
          if (a != null) {
            let h = Object.assign(/* @__PURE__ */ Object.create(null), l);
            h.pos = a, h.end != null && (h.end = s.changes.mapPos(h.end)), o.push(h);
          }
        }
        r = o;
      }
      for (let o of s.effects)
        o.is(t) && (r = o.value), o.is(Sm) && (r = []);
      return r;
    },
    provide: (r) => fr.from(r)
  });
  return {
    active: i,
    extension: [
      i,
      ee.define((r) => new mm(
        r,
        n,
        i,
        t,
        e.hoverTime || 300
        /* Hover.Time */
      )),
      pm
    ]
  };
}
function sf(n, e) {
  let t = n.plugin(jo);
  if (!t)
    return null;
  let i = t.manager.tooltips.indexOf(e);
  return i < 0 ? null : t.manager.tooltipViews[i];
}
const Sm = /* @__PURE__ */ M.define(), Qa = /* @__PURE__ */ T.define({
  combine(n) {
    let e, t;
    for (let i of n)
      e = e || i.topContainer, t = t || i.bottomContainer;
    return { topContainer: e, bottomContainer: t };
  }
});
function Go(n, e) {
  let t = n.plugin(of), i = t ? t.specs.indexOf(e) : -1;
  return i > -1 ? t.panels[i] : null;
}
const of = /* @__PURE__ */ ee.fromClass(class {
  constructor(n) {
    this.input = n.state.facet(Fi), this.specs = this.input.filter((t) => t), this.panels = this.specs.map((t) => t(n));
    let e = n.state.facet(Qa);
    this.top = new An(n, !0, e.topContainer), this.bottom = new An(n, !1, e.bottomContainer), this.top.sync(this.panels.filter((t) => t.top)), this.bottom.sync(this.panels.filter((t) => !t.top));
    for (let t of this.panels)
      t.dom.classList.add("cm-panel"), t.mount && t.mount();
  }
  update(n) {
    let e = n.state.facet(Qa);
    this.top.container != e.topContainer && (this.top.sync([]), this.top = new An(n.view, !0, e.topContainer)), this.bottom.container != e.bottomContainer && (this.bottom.sync([]), this.bottom = new An(n.view, !1, e.bottomContainer)), this.top.syncClasses(), this.bottom.syncClasses();
    let t = n.state.facet(Fi);
    if (t != this.input) {
      let i = t.filter((a) => a), r = [], s = [], o = [], l = [];
      for (let a of i) {
        let h = this.specs.indexOf(a), c;
        h < 0 ? (c = a(n.view), l.push(c)) : (c = this.panels[h], c.update && c.update(n)), r.push(c), (c.top ? s : o).push(c);
      }
      this.specs = i, this.panels = r, this.top.sync(s), this.bottom.sync(o);
      for (let a of l)
        a.dom.classList.add("cm-panel"), a.mount && a.mount();
    } else
      for (let i of this.panels)
        i.update && i.update(n);
  }
  destroy() {
    this.top.sync([]), this.bottom.sync([]);
  }
}, {
  provide: (n) => v.scrollMargins.of((e) => {
    let t = e.plugin(n);
    return t && { top: t.top.scrollMargin(), bottom: t.bottom.scrollMargin() };
  })
});
class An {
  constructor(e, t, i) {
    this.view = e, this.top = t, this.container = i, this.dom = void 0, this.classes = "", this.panels = [], this.syncClasses();
  }
  sync(e) {
    for (let t of this.panels)
      t.destroy && e.indexOf(t) < 0 && t.destroy();
    this.panels = e, this.syncDOM();
  }
  syncDOM() {
    if (this.panels.length == 0) {
      this.dom && (this.dom.remove(), this.dom = void 0);
      return;
    }
    if (!this.dom) {
      this.dom = document.createElement("div"), this.dom.className = this.top ? "cm-panels cm-panels-top" : "cm-panels cm-panels-bottom", this.dom.style[this.top ? "top" : "bottom"] = "0";
      let t = this.container || this.view.dom;
      t.insertBefore(this.dom, this.top ? t.firstChild : null);
    }
    let e = this.dom.firstChild;
    for (let t of this.panels)
      if (t.dom.parentNode == this.dom) {
        for (; e != t.dom; )
          e = ba(e);
        e = e.nextSibling;
      } else
        this.dom.insertBefore(t.dom, e);
    for (; e; )
      e = ba(e);
  }
  scrollMargin() {
    return !this.dom || this.container ? 0 : Math.max(0, this.top ? this.dom.getBoundingClientRect().bottom - Math.max(0, this.view.scrollDOM.getBoundingClientRect().top) : Math.min(innerHeight, this.view.scrollDOM.getBoundingClientRect().bottom) - this.dom.getBoundingClientRect().top);
  }
  syncClasses() {
    if (!(!this.container || this.classes == this.view.themeClasses)) {
      for (let e of this.classes.split(" "))
        e && this.container.classList.remove(e);
      for (let e of (this.classes = this.view.themeClasses).split(" "))
        e && this.container.classList.add(e);
    }
  }
}
function ba(n) {
  let e = n.nextSibling;
  return n.remove(), e;
}
const Fi = /* @__PURE__ */ T.define({
  enables: of
});
function ym(n, e) {
  let t, i = new Promise((o) => t = o), r = (o) => xm(o, e, t);
  n.state.field(ls, !1) ? n.dispatch({ effects: lf.of(r) }) : n.dispatch({ effects: M.appendConfig.of(ls.init(() => [r])) });
  let s = af.of(r);
  return { close: s, result: i.then((o) => ((n.win.queueMicrotask || ((a) => n.win.setTimeout(a, 10)))(() => {
    n.state.field(ls).indexOf(r) > -1 && n.dispatch({ effects: s });
  }), o)) };
}
const ls = /* @__PURE__ */ oe.define({
  create() {
    return [];
  },
  update(n, e) {
    for (let t of e.effects)
      t.is(lf) ? n = [t.value].concat(n) : t.is(af) && (n = n.filter((i) => i != t.value));
    return n;
  },
  provide: (n) => Fi.computeN([n], (e) => e.field(n))
}), lf = /* @__PURE__ */ M.define(), af = /* @__PURE__ */ M.define();
function xm(n, e, t) {
  let i = e.content ? e.content(n, () => o(null)) : null;
  if (!i) {
    if (i = B("form"), e.input) {
      let l = B("input", e.input);
      /^(text|password|number|email|tel|url)$/.test(l.type) && l.classList.add("cm-textfield"), l.name || (l.name = "input"), i.appendChild(B("label", (e.label || "") + ": ", l));
    } else
      i.appendChild(document.createTextNode(e.label || ""));
    i.appendChild(document.createTextNode(" ")), i.appendChild(B("button", { class: "cm-button", type: "submit" }, e.submitLabel || "OK"));
  }
  let r = i.nodeName == "FORM" ? [i] : i.querySelectorAll("form");
  for (let l = 0; l < r.length; l++) {
    let a = r[l];
    a.addEventListener("keydown", (h) => {
      h.keyCode == 27 ? (h.preventDefault(), o(null)) : h.keyCode == 13 && (h.preventDefault(), o(a));
    }), a.addEventListener("submit", (h) => {
      h.preventDefault(), o(a);
    });
  }
  let s = B("div", i, B("button", {
    onclick: () => o(null),
    "aria-label": n.state.phrase("close"),
    class: "cm-dialog-close",
    type: "button"
  }, ["×"]));
  e.class && (s.className = e.class), s.classList.add("cm-dialog");
  function o(l) {
    s.contains(s.ownerDocument.activeElement) && n.focus(), t(l);
  }
  return {
    dom: s,
    top: e.top,
    mount: () => {
      if (e.focus) {
        let l;
        typeof e.focus == "string" ? l = i.querySelector(e.focus) : l = i.querySelector("input") || i.querySelector("button"), l && "select" in l ? l.select() : l && "focus" in l && l.focus();
      }
    }
  };
}
class Qt extends $t {
  /**
  @internal
  */
  compare(e) {
    return this == e || this.constructor == e.constructor && this.eq(e);
  }
  /**
  Compare this marker to another marker of the same type.
  */
  eq(e) {
    return !1;
  }
  /**
  Called if the marker has a `toDOM` method and its representation
  was removed from a gutter.
  */
  destroy(e) {
  }
}
Qt.prototype.elementClass = "";
Qt.prototype.toDOM = void 0;
Qt.prototype.mapMode = ce.TrackBefore;
Qt.prototype.startSide = Qt.prototype.endSide = -1;
Qt.prototype.point = !0;
const Gn = /* @__PURE__ */ T.define(), wm = /* @__PURE__ */ T.define(), km = {
  class: "",
  renderEmptyElements: !1,
  elementStyle: "",
  markers: () => E.empty,
  lineMarker: () => null,
  widgetMarker: () => null,
  lineMarkerChange: null,
  initialSpacer: null,
  updateSpacer: null,
  domEventHandlers: {},
  side: "before"
}, Wi = /* @__PURE__ */ T.define();
function $m(n) {
  return [hf(), Wi.of({ ...km, ...n })];
}
const Sa = /* @__PURE__ */ T.define({
  combine: (n) => n.some((e) => e)
});
function hf(n) {
  return [
    Pm
  ];
}
const Pm = /* @__PURE__ */ ee.fromClass(class {
  constructor(n) {
    this.view = n, this.domAfter = null, this.prevViewport = n.viewport, this.dom = document.createElement("div"), this.dom.className = "cm-gutters cm-gutters-before", this.dom.setAttribute("aria-hidden", "true"), this.dom.style.minHeight = this.view.contentHeight / this.view.scaleY + "px", this.gutters = n.state.facet(Wi).map((e) => new xa(n, e)), this.fixed = !n.state.facet(Sa);
    for (let e of this.gutters)
      e.config.side == "after" ? this.getDOMAfter().appendChild(e.dom) : this.dom.appendChild(e.dom);
    this.fixed && (this.dom.style.position = "sticky"), this.syncGutters(!1), n.scrollDOM.insertBefore(this.dom, n.contentDOM);
  }
  getDOMAfter() {
    return this.domAfter || (this.domAfter = document.createElement("div"), this.domAfter.className = "cm-gutters cm-gutters-after", this.domAfter.setAttribute("aria-hidden", "true"), this.domAfter.style.minHeight = this.view.contentHeight / this.view.scaleY + "px", this.domAfter.style.position = this.fixed ? "sticky" : "", this.view.scrollDOM.appendChild(this.domAfter)), this.domAfter;
  }
  update(n) {
    if (this.updateGutters(n)) {
      let e = this.prevViewport, t = n.view.viewport, i = Math.min(e.to, t.to) - Math.max(e.from, t.from);
      this.syncGutters(i < (t.to - t.from) * 0.8);
    }
    if (n.geometryChanged) {
      let e = this.view.contentHeight / this.view.scaleY + "px";
      this.dom.style.minHeight = e, this.domAfter && (this.domAfter.style.minHeight = e);
    }
    this.view.state.facet(Sa) != !this.fixed && (this.fixed = !this.fixed, this.dom.style.position = this.fixed ? "sticky" : "", this.domAfter && (this.domAfter.style.position = this.fixed ? "sticky" : "")), this.prevViewport = n.view.viewport;
  }
  syncGutters(n) {
    let e = this.dom.nextSibling;
    n && (this.dom.remove(), this.domAfter && this.domAfter.remove());
    let t = E.iter(this.view.state.facet(Gn), this.view.viewport.from), i = [], r = this.gutters.map((s) => new vm(s, this.view.viewport, -this.view.documentPadding.top));
    for (let s of this.view.viewportLineBlocks)
      if (i.length && (i = []), Array.isArray(s.type)) {
        let o = !0;
        for (let l of s.type)
          if (l.type == fe.Text && o) {
            uo(t, i, l.from);
            for (let a of r)
              a.line(this.view, l, i);
            o = !1;
          } else if (l.widget)
            for (let a of r)
              a.widget(this.view, l);
      } else if (s.type == fe.Text) {
        uo(t, i, s.from);
        for (let o of r)
          o.line(this.view, s, i);
      } else if (s.widget)
        for (let o of r)
          o.widget(this.view, s);
    for (let s of r)
      s.finish();
    n && (this.view.scrollDOM.insertBefore(this.dom, e), this.domAfter && this.view.scrollDOM.appendChild(this.domAfter));
  }
  updateGutters(n) {
    let e = n.startState.facet(Wi), t = n.state.facet(Wi), i = n.docChanged || n.heightChanged || n.viewportChanged || !E.eq(n.startState.facet(Gn), n.state.facet(Gn), n.view.viewport.from, n.view.viewport.to);
    if (e == t)
      for (let r of this.gutters)
        r.update(n) && (i = !0);
    else {
      i = !0;
      let r = [];
      for (let s of t) {
        let o = e.indexOf(s);
        o < 0 ? r.push(new xa(this.view, s)) : (this.gutters[o].update(n), r.push(this.gutters[o]));
      }
      for (let s of this.gutters)
        s.dom.remove(), r.indexOf(s) < 0 && s.destroy();
      for (let s of r)
        s.config.side == "after" ? this.getDOMAfter().appendChild(s.dom) : this.dom.appendChild(s.dom);
      this.gutters = r;
    }
    return i;
  }
  destroy() {
    for (let n of this.gutters)
      n.destroy();
    this.dom.remove(), this.domAfter && this.domAfter.remove();
  }
}, {
  provide: (n) => v.scrollMargins.of((e) => {
    let t = e.plugin(n);
    if (!t || t.gutters.length == 0 || !t.fixed)
      return null;
    let i = t.dom.offsetWidth * e.scaleX, r = t.domAfter ? t.domAfter.offsetWidth * e.scaleX : 0;
    return e.textDirection == N.LTR ? { left: i, right: r } : { right: i, left: r };
  })
});
function ya(n) {
  return Array.isArray(n) ? n : [n];
}
function uo(n, e, t) {
  for (; n.value && n.from <= t; )
    n.from == t && e.push(n.value), n.next();
}
class vm {
  constructor(e, t, i) {
    this.gutter = e, this.height = i, this.i = 0, this.cursor = E.iter(e.markers, t.from);
  }
  addElement(e, t, i) {
    let { gutter: r } = this, s = (t.top - this.height) / e.scaleY, o = t.height / e.scaleY;
    if (this.i == r.elements.length) {
      let l = new cf(e, o, s, i);
      r.elements.push(l), r.dom.appendChild(l.dom);
    } else
      r.elements[this.i].update(e, o, s, i);
    this.height = t.bottom, this.i++;
  }
  line(e, t, i) {
    let r = [];
    uo(this.cursor, r, t.from), i.length && (r = r.concat(i));
    let s = this.gutter.config.lineMarker(e, t, r);
    s && r.unshift(s);
    let o = this.gutter;
    r.length == 0 && !o.config.renderEmptyElements || this.addElement(e, t, r);
  }
  widget(e, t) {
    let i = this.gutter.config.widgetMarker(e, t.widget, t), r = i ? [i] : null;
    for (let s of e.state.facet(wm)) {
      let o = s(e, t.widget, t);
      o && (r || (r = [])).push(o);
    }
    r && this.addElement(e, t, r);
  }
  finish() {
    let e = this.gutter;
    for (; e.elements.length > this.i; ) {
      let t = e.elements.pop();
      e.dom.removeChild(t.dom), t.destroy();
    }
  }
}
class xa {
  constructor(e, t) {
    this.view = e, this.config = t, this.elements = [], this.spacer = null, this.dom = document.createElement("div"), this.dom.className = "cm-gutter" + (this.config.class ? " " + this.config.class : "");
    for (let i in t.domEventHandlers)
      this.dom.addEventListener(i, (r) => {
        let s = r.target, o;
        if (s != this.dom && this.dom.contains(s)) {
          for (; s.parentNode != this.dom; )
            s = s.parentNode;
          let a = s.getBoundingClientRect();
          o = (a.top + a.bottom) / 2;
        } else
          o = r.clientY;
        let l = e.lineBlockAtHeight(o - e.documentTop);
        t.domEventHandlers[i](e, l, r) && r.preventDefault();
      });
    this.markers = ya(t.markers(e)), t.initialSpacer && (this.spacer = new cf(e, 0, 0, [t.initialSpacer(e)]), this.dom.appendChild(this.spacer.dom), this.spacer.dom.style.cssText += "visibility: hidden; pointer-events: none");
  }
  update(e) {
    let t = this.markers;
    if (this.markers = ya(this.config.markers(e.view)), this.spacer && this.config.updateSpacer) {
      let r = this.config.updateSpacer(this.spacer.markers[0], e);
      r != this.spacer.markers[0] && this.spacer.update(e.view, 0, 0, [r]);
    }
    let i = e.view.viewport;
    return !E.eq(this.markers, t, i.from, i.to) || (this.config.lineMarkerChange ? this.config.lineMarkerChange(e) : !1);
  }
  destroy() {
    for (let e of this.elements)
      e.destroy();
  }
}
class cf {
  constructor(e, t, i, r) {
    this.height = -1, this.above = 0, this.markers = [], this.dom = document.createElement("div"), this.dom.className = "cm-gutterElement", this.update(e, t, i, r);
  }
  update(e, t, i, r) {
    this.height != t && (this.height = t, this.dom.style.height = t + "px"), this.above != i && (this.dom.style.marginTop = (this.above = i) ? i + "px" : ""), Tm(this.markers, r) || this.setMarkers(e, r);
  }
  setMarkers(e, t) {
    let i = "cm-gutterElement", r = this.dom.firstChild;
    for (let s = 0, o = 0; ; ) {
      let l = o, a = s < t.length ? t[s++] : null, h = !1;
      if (a) {
        let c = a.elementClass;
        c && (i += " " + c);
        for (let f = o; f < this.markers.length; f++)
          if (this.markers[f].compare(a)) {
            l = f, h = !0;
            break;
          }
      } else
        l = this.markers.length;
      for (; o < l; ) {
        let c = this.markers[o++];
        if (c.toDOM) {
          c.destroy(r);
          let f = r.nextSibling;
          r.remove(), r = f;
        }
      }
      if (!a)
        break;
      a.toDOM && (h ? r = r.nextSibling : this.dom.insertBefore(a.toDOM(e), r)), h && o++;
    }
    this.dom.className = i, this.markers = t;
  }
  destroy() {
    this.setMarkers(null, []);
  }
}
function Tm(n, e) {
  if (n.length != e.length)
    return !1;
  for (let t = 0; t < n.length; t++)
    if (!n[t].compare(e[t]))
      return !1;
  return !0;
}
const Cm = /* @__PURE__ */ T.define(), Zm = /* @__PURE__ */ T.define(), Kt = /* @__PURE__ */ T.define({
  combine(n) {
    return at(n, { formatNumber: String, domEventHandlers: {} }, {
      domEventHandlers(e, t) {
        let i = Object.assign({}, e);
        for (let r in t) {
          let s = i[r], o = t[r];
          i[r] = s ? (l, a, h) => s(l, a, h) || o(l, a, h) : o;
        }
        return i;
      }
    });
  }
});
class as extends Qt {
  constructor(e) {
    super(), this.number = e;
  }
  eq(e) {
    return this.number == e.number;
  }
  toDOM() {
    return document.createTextNode(this.number);
  }
}
function hs(n, e) {
  return n.state.facet(Kt).formatNumber(e, n.state);
}
const Xm = /* @__PURE__ */ Wi.compute([Kt], (n) => ({
  class: "cm-lineNumbers",
  renderEmptyElements: !1,
  markers(e) {
    return e.state.facet(Cm);
  },
  lineMarker(e, t, i) {
    return i.some((r) => r.toDOM) ? null : new as(hs(e, e.state.doc.lineAt(t.from).number));
  },
  widgetMarker: (e, t, i) => {
    for (let r of e.state.facet(Zm)) {
      let s = r(e, t, i);
      if (s)
        return s;
    }
    return null;
  },
  lineMarkerChange: (e) => e.startState.facet(Kt) != e.state.facet(Kt),
  initialSpacer(e) {
    return new as(hs(e, wa(e.state.doc.lines)));
  },
  updateSpacer(e, t) {
    let i = hs(t.view, wa(t.view.state.doc.lines));
    return i == e.number ? e : new as(i);
  },
  domEventHandlers: n.facet(Kt).domEventHandlers,
  side: "before"
}));
function Am(n = {}) {
  return [
    Kt.of(n),
    hf(),
    Xm
  ];
}
function wa(n) {
  let e = 9;
  for (; e < n; )
    e = e * 10 + 9;
  return e;
}
const Mm = /* @__PURE__ */ new class extends Qt {
  constructor() {
    super(...arguments), this.elementClass = "cm-activeLineGutter";
  }
}(), Rm = /* @__PURE__ */ Gn.compute(["selection"], (n) => {
  let e = [], t = -1;
  for (let i of n.selection.ranges) {
    let r = n.doc.lineAt(i.head).from;
    r > t && (t = r, e.push(Mm.range(r)));
  }
  return E.of(e);
});
function zm() {
  return Rm;
}
const ff = 1024;
let Ym = 0;
class Ye {
  constructor(e, t) {
    this.from = e, this.to = t;
  }
}
class z {
  /**
  Create a new node prop type.
  */
  constructor(e = {}) {
    this.id = Ym++, this.perNode = !!e.perNode, this.deserialize = e.deserialize || (() => {
      throw new Error("This node type doesn't define a deserialize function");
    }), this.combine = e.combine || null;
  }
  /**
  This is meant to be used with
  [`NodeSet.extend`](#common.NodeSet.extend) or
  [`LRParser.configure`](#lr.ParserConfig.props) to compute
  prop values for each node type in the set. Takes a [match
  object](#common.NodeType^match) or function that returns undefined
  if the node type doesn't get this prop, and the prop's value if
  it does.
  */
  add(e) {
    if (this.perNode)
      throw new RangeError("Can't add per-node props to node types");
    return typeof e != "function" && (e = Qe.match(e)), (t) => {
      let i = e(t);
      return i === void 0 ? null : [this, i];
    };
  }
}
z.closedBy = new z({ deserialize: (n) => n.split(" ") });
z.openedBy = new z({ deserialize: (n) => n.split(" ") });
z.group = new z({ deserialize: (n) => n.split(" ") });
z.isolate = new z({ deserialize: (n) => {
  if (n && n != "rtl" && n != "ltr" && n != "auto")
    throw new RangeError("Invalid value for isolate: " + n);
  return n || "auto";
} });
z.contextHash = new z({ perNode: !0 });
z.lookAhead = new z({ perNode: !0 });
z.mounted = new z({ perNode: !0 });
class si {
  constructor(e, t, i, r = !1) {
    this.tree = e, this.overlay = t, this.parser = i, this.bracketed = r;
  }
  /**
  @internal
  */
  static get(e) {
    return e && e.props && e.props[z.mounted.id];
  }
}
const Vm = /* @__PURE__ */ Object.create(null);
class Qe {
  /**
  @internal
  */
  constructor(e, t, i, r = 0) {
    this.name = e, this.props = t, this.id = i, this.flags = r;
  }
  /**
  Define a node type.
  */
  static define(e) {
    let t = e.props && e.props.length ? /* @__PURE__ */ Object.create(null) : Vm, i = (e.top ? 1 : 0) | (e.skipped ? 2 : 0) | (e.error ? 4 : 0) | (e.name == null ? 8 : 0), r = new Qe(e.name || "", t, e.id, i);
    if (e.props) {
      for (let s of e.props)
        if (Array.isArray(s) || (s = s(r)), s) {
          if (s[0].perNode)
            throw new RangeError("Can't store a per-node prop on a node type");
          t[s[0].id] = s[1];
        }
    }
    return r;
  }
  /**
  Retrieves a node prop for this type. Will return `undefined` if
  the prop isn't present on this node.
  */
  prop(e) {
    return this.props[e.id];
  }
  /**
  True when this is the top node of a grammar.
  */
  get isTop() {
    return (this.flags & 1) > 0;
  }
  /**
  True when this node is produced by a skip rule.
  */
  get isSkipped() {
    return (this.flags & 2) > 0;
  }
  /**
  Indicates whether this is an error node.
  */
  get isError() {
    return (this.flags & 4) > 0;
  }
  /**
  When true, this node type doesn't correspond to a user-declared
  named node, for example because it is used to cache repetition.
  */
  get isAnonymous() {
    return (this.flags & 8) > 0;
  }
  /**
  Returns true when this node's name or one of its
  [groups](#common.NodeProp^group) matches the given string.
  */
  is(e) {
    if (typeof e == "string") {
      if (this.name == e)
        return !0;
      let t = this.prop(z.group);
      return t ? t.indexOf(e) > -1 : !1;
    }
    return this.id == e;
  }
  /**
  Create a function from node types to arbitrary values by
  specifying an object whose property names are node or
  [group](#common.NodeProp^group) names. Often useful with
  [`NodeProp.add`](#common.NodeProp.add). You can put multiple
  names, separated by spaces, in a single property name to map
  multiple node names to a single value.
  */
  static match(e) {
    let t = /* @__PURE__ */ Object.create(null);
    for (let i in e)
      for (let r of i.split(" "))
        t[r] = e[i];
    return (i) => {
      for (let r = i.prop(z.group), s = -1; s < (r ? r.length : 0); s++) {
        let o = t[s < 0 ? i.name : r[s]];
        if (o)
          return o;
      }
    };
  }
}
Qe.none = new Qe(
  "",
  /* @__PURE__ */ Object.create(null),
  0,
  8
  /* NodeFlag.Anonymous */
);
class Uo {
  /**
  Create a set with the given types. The `id` property of each
  type should correspond to its position within the array.
  */
  constructor(e) {
    this.types = e;
    for (let t = 0; t < e.length; t++)
      if (e[t].id != t)
        throw new RangeError("Node type ids should correspond to array positions when creating a node set");
  }
  /**
  Create a copy of this set with some node properties added. The
  arguments to this method can be created with
  [`NodeProp.add`](#common.NodeProp.add).
  */
  extend(...e) {
    let t = [];
    for (let i of this.types) {
      let r = null;
      for (let s of e) {
        let o = s(i);
        if (o) {
          r || (r = Object.assign({}, i.props));
          let l = o[1], a = o[0];
          a.combine && a.id in r && (l = a.combine(r[a.id], l)), r[a.id] = l;
        }
      }
      t.push(r ? new Qe(i.name, r, i.id, i.flags) : i);
    }
    return new Uo(t);
  }
}
const Mn = /* @__PURE__ */ new WeakMap(), ka = /* @__PURE__ */ new WeakMap();
var W;
(function(n) {
  n[n.ExcludeBuffers = 1] = "ExcludeBuffers", n[n.IncludeAnonymous = 2] = "IncludeAnonymous", n[n.IgnoreMounts = 4] = "IgnoreMounts", n[n.IgnoreOverlays = 8] = "IgnoreOverlays", n[n.EnterBracketed = 16] = "EnterBracketed";
})(W || (W = {}));
class H {
  /**
  Construct a new tree. See also [`Tree.build`](#common.Tree^build).
  */
  constructor(e, t, i, r, s) {
    if (this.type = e, this.children = t, this.positions = i, this.length = r, this.props = null, s && s.length) {
      this.props = /* @__PURE__ */ Object.create(null);
      for (let [o, l] of s)
        this.props[typeof o == "number" ? o : o.id] = l;
    }
  }
  /**
  @internal
  */
  toString() {
    let e = si.get(this);
    if (e && !e.overlay)
      return e.tree.toString();
    let t = "";
    for (let i of this.children) {
      let r = i.toString();
      r && (t && (t += ","), t += r);
    }
    return this.type.name ? (/\W/.test(this.type.name) && !this.type.isError ? JSON.stringify(this.type.name) : this.type.name) + (t.length ? "(" + t + ")" : "") : t;
  }
  /**
  Get a [tree cursor](#common.TreeCursor) positioned at the top of
  the tree. Mode can be used to [control](#common.IterMode) which
  nodes the cursor visits.
  */
  cursor(e = 0) {
    return new ur(this.topNode, e);
  }
  /**
  Get a [tree cursor](#common.TreeCursor) pointing into this tree
  at the given position and side (see
  [`moveTo`](#common.TreeCursor.moveTo).
  */
  cursorAt(e, t = 0, i = 0) {
    let r = Mn.get(this) || this.topNode, s = new ur(r);
    return s.moveTo(e, t), Mn.set(this, s._tree), s;
  }
  /**
  Get a [syntax node](#common.SyntaxNode) object for the top of the
  tree.
  */
  get topNode() {
    return new de(this, 0, 0, null);
  }
  /**
  Get the [syntax node](#common.SyntaxNode) at the given position.
  If `side` is -1, this will move into nodes that end at the
  position. If 1, it'll move into nodes that start at the
  position. With 0, it'll only enter nodes that cover the position
  from both sides.
  
  Note that this will not enter
  [overlays](#common.MountedTree.overlay), and you often want
  [`resolveInner`](#common.Tree.resolveInner) instead.
  */
  resolve(e, t = 0) {
    let i = Hi(Mn.get(this) || this.topNode, e, t, !1);
    return Mn.set(this, i), i;
  }
  /**
  Like [`resolve`](#common.Tree.resolve), but will enter
  [overlaid](#common.MountedTree.overlay) nodes, producing a syntax node
  pointing into the innermost overlaid tree at the given position
  (with parent links going through all parent structure, including
  the host trees).
  */
  resolveInner(e, t = 0) {
    let i = Hi(ka.get(this) || this.topNode, e, t, !0);
    return ka.set(this, i), i;
  }
  /**
  In some situations, it can be useful to iterate through all
  nodes around a position, including those in overlays that don't
  directly cover the position. This method gives you an iterator
  that will produce all nodes, from small to big, around the given
  position.
  */
  resolveStack(e, t = 0) {
    return Dm(this, e, t);
  }
  /**
  Iterate over the tree and its children, calling `enter` for any
  node that touches the `from`/`to` region (if given) before
  running over such a node's children, and `leave` (if given) when
  leaving the node. When `enter` returns `false`, that node will
  not have its children iterated over (or `leave` called).
  */
  iterate(e) {
    let { enter: t, leave: i, from: r = 0, to: s = this.length } = e, o = e.mode || 0, l = (o & W.IncludeAnonymous) > 0;
    for (let a = this.cursor(o | W.IncludeAnonymous); ; ) {
      let h = !1;
      if (a.from <= s && a.to >= r && (!l && a.type.isAnonymous || t(a) !== !1)) {
        if (a.firstChild())
          continue;
        h = !0;
      }
      for (; h && i && (l || !a.type.isAnonymous) && i(a), !a.nextSibling(); ) {
        if (!a.parent())
          return;
        h = !0;
      }
    }
  }
  /**
  Get the value of the given [node prop](#common.NodeProp) for this
  node. Works with both per-node and per-type props.
  */
  prop(e) {
    return e.perNode ? this.props ? this.props[e.id] : void 0 : this.type.prop(e);
  }
  /**
  Returns the node's [per-node props](#common.NodeProp.perNode) in a
  format that can be passed to the [`Tree`](#common.Tree)
  constructor.
  */
  get propValues() {
    let e = [];
    if (this.props)
      for (let t in this.props)
        e.push([+t, this.props[t]]);
    return e;
  }
  /**
  Balance the direct children of this tree, producing a copy of
  which may have children grouped into subtrees with type
  [`NodeType.none`](#common.NodeType^none).
  */
  balance(e = {}) {
    return this.children.length <= 8 ? this : Ko(Qe.none, this.children, this.positions, 0, this.children.length, 0, this.length, (t, i, r) => new H(this.type, t, i, r, this.propValues), e.makeTree || ((t, i, r) => new H(Qe.none, t, i, r)));
  }
  /**
  Build a tree from a postfix-ordered buffer of node information,
  or a cursor over such a buffer.
  */
  static build(e) {
    return qm(e);
  }
}
H.empty = new H(Qe.none, [], [], 0);
class Fo {
  constructor(e, t) {
    this.buffer = e, this.index = t;
  }
  get id() {
    return this.buffer[this.index - 4];
  }
  get start() {
    return this.buffer[this.index - 3];
  }
  get end() {
    return this.buffer[this.index - 2];
  }
  get size() {
    return this.buffer[this.index - 1];
  }
  get pos() {
    return this.index;
  }
  next() {
    this.index -= 4;
  }
  fork() {
    return new Fo(this.buffer, this.index);
  }
}
class Ct {
  /**
  Create a tree buffer.
  */
  constructor(e, t, i) {
    this.buffer = e, this.length = t, this.set = i;
  }
  /**
  @internal
  */
  get type() {
    return Qe.none;
  }
  /**
  @internal
  */
  toString() {
    let e = [];
    for (let t = 0; t < this.buffer.length; )
      e.push(this.childString(t)), t = this.buffer[t + 3];
    return e.join(",");
  }
  /**
  @internal
  */
  childString(e) {
    let t = this.buffer[e], i = this.buffer[e + 3], r = this.set.types[t], s = r.name;
    if (/\W/.test(s) && !r.isError && (s = JSON.stringify(s)), e += 4, i == e)
      return s;
    let o = [];
    for (; e < i; )
      o.push(this.childString(e)), e = this.buffer[e + 3];
    return s + "(" + o.join(",") + ")";
  }
  /**
  @internal
  */
  findChild(e, t, i, r, s) {
    let { buffer: o } = this, l = -1;
    for (let a = e; a != t && !(uf(s, r, o[a + 1], o[a + 2]) && (l = a, i > 0)); a = o[a + 3])
      ;
    return l;
  }
  /**
  @internal
  */
  slice(e, t, i) {
    let r = this.buffer, s = new Uint16Array(t - e), o = 0;
    for (let l = e, a = 0; l < t; ) {
      s[a++] = r[l++], s[a++] = r[l++] - i;
      let h = s[a++] = r[l++] - i;
      s[a++] = r[l++] - e, o = Math.max(o, h);
    }
    return new Ct(s, o, this.set);
  }
}
function uf(n, e, t, i) {
  switch (n) {
    case -2:
      return t < e;
    case -1:
      return i >= e && t < e;
    case 0:
      return t < e && i > e;
    case 1:
      return t <= e && i > e;
    case 2:
      return i > e;
    case 4:
      return !0;
  }
}
function Hi(n, e, t, i) {
  for (var r; n.from == n.to || (t < 1 ? n.from >= e : n.from > e) || (t > -1 ? n.to <= e : n.to < e); ) {
    let o = !i && n instanceof de && n.index < 0 ? null : n.parent;
    if (!o)
      return n;
    n = o;
  }
  let s = i ? 0 : W.IgnoreOverlays;
  if (i)
    for (let o = n, l = o.parent; l; o = l, l = o.parent)
      o instanceof de && o.index < 0 && ((r = l.enter(e, t, s)) === null || r === void 0 ? void 0 : r.from) != o.from && (n = l);
  for (; ; ) {
    let o = n.enter(e, t, s);
    if (!o)
      return n;
    n = o;
  }
}
class df {
  cursor(e = 0) {
    return new ur(this, e);
  }
  getChild(e, t = null, i = null) {
    let r = $a(this, e, t, i);
    return r.length ? r[0] : null;
  }
  getChildren(e, t = null, i = null) {
    return $a(this, e, t, i);
  }
  resolve(e, t = 0) {
    return Hi(this, e, t, !1);
  }
  resolveInner(e, t = 0) {
    return Hi(this, e, t, !0);
  }
  matchContext(e) {
    return Oo(this.parent, e);
  }
  enterUnfinishedNodesBefore(e) {
    let t = this.childBefore(e), i = this;
    for (; t; ) {
      let r = t.lastChild;
      if (!r || r.to != t.to)
        break;
      r.type.isError && r.from == r.to ? (i = t, t = r.prevSibling) : t = r;
    }
    return i;
  }
  get node() {
    return this;
  }
  get next() {
    return this.parent;
  }
}
class de extends df {
  constructor(e, t, i, r) {
    super(), this._tree = e, this.from = t, this.index = i, this._parent = r;
  }
  get type() {
    return this._tree.type;
  }
  get name() {
    return this._tree.type.name;
  }
  get to() {
    return this.from + this._tree.length;
  }
  nextChild(e, t, i, r, s = 0) {
    for (let o = this; ; ) {
      for (let { children: l, positions: a } = o._tree, h = t > 0 ? l.length : -1; e != h; e += t) {
        let c = l[e], f = a[e] + o.from, u;
        if (!(!(s & W.EnterBracketed && c instanceof H && (u = si.get(c)) && !u.overlay && u.bracketed && i >= f && i <= f + c.length) && !uf(r, i, f, f + c.length))) {
          if (c instanceof Ct) {
            if (s & W.ExcludeBuffers)
              continue;
            let d = c.findChild(0, c.buffer.length, t, i - f, r);
            if (d > -1)
              return new nt(new Em(o, c, e, f), null, d);
          } else if (s & W.IncludeAnonymous || !c.type.isAnonymous || Ho(c)) {
            let d;
            if (!(s & W.IgnoreMounts) && (d = si.get(c)) && !d.overlay)
              return new de(d.tree, f, e, o);
            let O = new de(c, f, e, o);
            return s & W.IncludeAnonymous || !O.type.isAnonymous ? O : O.nextChild(t < 0 ? c.children.length - 1 : 0, t, i, r, s);
          }
        }
      }
      if (s & W.IncludeAnonymous || !o.type.isAnonymous || (o.index >= 0 ? e = o.index + t : e = t < 0 ? -1 : o._parent._tree.children.length, o = o._parent, !o))
        return null;
    }
  }
  get firstChild() {
    return this.nextChild(
      0,
      1,
      0,
      4
      /* Side.DontCare */
    );
  }
  get lastChild() {
    return this.nextChild(
      this._tree.children.length - 1,
      -1,
      0,
      4
      /* Side.DontCare */
    );
  }
  childAfter(e) {
    return this.nextChild(
      0,
      1,
      e,
      2
      /* Side.After */
    );
  }
  childBefore(e) {
    return this.nextChild(
      this._tree.children.length - 1,
      -1,
      e,
      -2
      /* Side.Before */
    );
  }
  prop(e) {
    return this._tree.prop(e);
  }
  enter(e, t, i = 0) {
    let r;
    if (!(i & W.IgnoreOverlays) && (r = si.get(this._tree)) && r.overlay) {
      let s = e - this.from, o = i & W.EnterBracketed && r.bracketed;
      for (let { from: l, to: a } of r.overlay)
        if ((t > 0 || o ? l <= s : l < s) && (t < 0 || o ? a >= s : a > s))
          return new de(r.tree, r.overlay[0].from + this.from, -1, this);
    }
    return this.nextChild(0, 1, e, t, i);
  }
  nextSignificantParent() {
    let e = this;
    for (; e.type.isAnonymous && e._parent; )
      e = e._parent;
    return e;
  }
  get parent() {
    return this._parent ? this._parent.nextSignificantParent() : null;
  }
  get nextSibling() {
    return this._parent && this.index >= 0 ? this._parent.nextChild(
      this.index + 1,
      1,
      0,
      4
      /* Side.DontCare */
    ) : null;
  }
  get prevSibling() {
    return this._parent && this.index >= 0 ? this._parent.nextChild(
      this.index - 1,
      -1,
      0,
      4
      /* Side.DontCare */
    ) : null;
  }
  get tree() {
    return this._tree;
  }
  toTree() {
    return this._tree;
  }
  /**
  @internal
  */
  toString() {
    return this._tree.toString();
  }
}
function $a(n, e, t, i) {
  let r = n.cursor(), s = [];
  if (!r.firstChild())
    return s;
  if (t != null) {
    for (let o = !1; !o; )
      if (o = r.type.is(t), !r.nextSibling())
        return s;
  }
  for (; ; ) {
    if (i != null && r.type.is(i))
      return s;
    if (r.type.is(e) && s.push(r.node), !r.nextSibling())
      return i == null ? s : [];
  }
}
function Oo(n, e, t = e.length - 1) {
  for (let i = n; t >= 0; i = i.parent) {
    if (!i)
      return !1;
    if (!i.type.isAnonymous) {
      if (e[t] && e[t] != i.name)
        return !1;
      t--;
    }
  }
  return !0;
}
class Em {
  constructor(e, t, i, r) {
    this.parent = e, this.buffer = t, this.index = i, this.start = r;
  }
}
class nt extends df {
  get name() {
    return this.type.name;
  }
  get from() {
    return this.context.start + this.context.buffer.buffer[this.index + 1];
  }
  get to() {
    return this.context.start + this.context.buffer.buffer[this.index + 2];
  }
  constructor(e, t, i) {
    super(), this.context = e, this._parent = t, this.index = i, this.type = e.buffer.set.types[e.buffer.buffer[i]];
  }
  child(e, t, i) {
    let { buffer: r } = this.context, s = r.findChild(this.index + 4, r.buffer[this.index + 3], e, t - this.context.start, i);
    return s < 0 ? null : new nt(this.context, this, s);
  }
  get firstChild() {
    return this.child(
      1,
      0,
      4
      /* Side.DontCare */
    );
  }
  get lastChild() {
    return this.child(
      -1,
      0,
      4
      /* Side.DontCare */
    );
  }
  childAfter(e) {
    return this.child(
      1,
      e,
      2
      /* Side.After */
    );
  }
  childBefore(e) {
    return this.child(
      -1,
      e,
      -2
      /* Side.Before */
    );
  }
  prop(e) {
    return this.type.prop(e);
  }
  enter(e, t, i = 0) {
    if (i & W.ExcludeBuffers)
      return null;
    let { buffer: r } = this.context, s = r.findChild(this.index + 4, r.buffer[this.index + 3], t > 0 ? 1 : -1, e - this.context.start, t);
    return s < 0 ? null : new nt(this.context, this, s);
  }
  get parent() {
    return this._parent || this.context.parent.nextSignificantParent();
  }
  externalSibling(e) {
    return this._parent ? null : this.context.parent.nextChild(
      this.context.index + e,
      e,
      0,
      4
      /* Side.DontCare */
    );
  }
  get nextSibling() {
    let { buffer: e } = this.context, t = e.buffer[this.index + 3];
    return t < (this._parent ? e.buffer[this._parent.index + 3] : e.buffer.length) ? new nt(this.context, this._parent, t) : this.externalSibling(1);
  }
  get prevSibling() {
    let { buffer: e } = this.context, t = this._parent ? this._parent.index + 4 : 0;
    return this.index == t ? this.externalSibling(-1) : new nt(this.context, this._parent, e.findChild(
      t,
      this.index,
      -1,
      0,
      4
      /* Side.DontCare */
    ));
  }
  get tree() {
    return null;
  }
  toTree() {
    let e = [], t = [], { buffer: i } = this.context, r = this.index + 4, s = i.buffer[this.index + 3];
    if (s > r) {
      let o = i.buffer[this.index + 1];
      e.push(i.slice(r, s, o)), t.push(0);
    }
    return new H(this.type, e, t, this.to - this.from);
  }
  /**
  @internal
  */
  toString() {
    return this.context.buffer.childString(this.index);
  }
}
function Of(n) {
  if (!n.length)
    return null;
  let e = 0, t = n[0];
  for (let s = 1; s < n.length; s++) {
    let o = n[s];
    (o.from > t.from || o.to < t.to) && (t = o, e = s);
  }
  let i = t instanceof de && t.index < 0 ? null : t.parent, r = n.slice();
  return i ? r[e] = i : r.splice(e, 1), new _m(r, t);
}
class _m {
  constructor(e, t) {
    this.heads = e, this.node = t;
  }
  get next() {
    return Of(this.heads);
  }
}
function Dm(n, e, t) {
  let i = n.resolveInner(e, t), r = null;
  for (let s = i instanceof de ? i : i.context.parent; s; s = s.parent)
    if (s.index < 0) {
      let o = s.parent;
      (r || (r = [i])).push(o.resolve(e, t)), s = o;
    } else {
      let o = si.get(s.tree);
      if (o && o.overlay && o.overlay[0].from <= e && o.overlay[o.overlay.length - 1].to >= e) {
        let l = new de(o.tree, o.overlay[0].from + s.from, -1, s);
        (r || (r = [i])).push(Hi(l, e, t, !1));
      }
    }
  return r ? Of(r) : i;
}
class ur {
  /**
  Shorthand for `.type.name`.
  */
  get name() {
    return this.type.name;
  }
  /**
  @internal
  */
  constructor(e, t = 0) {
    if (this.buffer = null, this.stack = [], this.index = 0, this.bufferNode = null, this.mode = t & ~W.EnterBracketed, e instanceof de)
      this.yieldNode(e);
    else {
      this._tree = e.context.parent, this.buffer = e.context;
      for (let i = e._parent; i; i = i._parent)
        this.stack.unshift(i.index);
      this.bufferNode = e, this.yieldBuf(e.index);
    }
  }
  yieldNode(e) {
    return e ? (this._tree = e, this.type = e.type, this.from = e.from, this.to = e.to, !0) : !1;
  }
  yieldBuf(e, t) {
    this.index = e;
    let { start: i, buffer: r } = this.buffer;
    return this.type = t || r.set.types[r.buffer[e]], this.from = i + r.buffer[e + 1], this.to = i + r.buffer[e + 2], !0;
  }
  /**
  @internal
  */
  yield(e) {
    return e ? e instanceof de ? (this.buffer = null, this.yieldNode(e)) : (this.buffer = e.context, this.yieldBuf(e.index, e.type)) : !1;
  }
  /**
  @internal
  */
  toString() {
    return this.buffer ? this.buffer.buffer.childString(this.index) : this._tree.toString();
  }
  /**
  @internal
  */
  enterChild(e, t, i) {
    if (!this.buffer)
      return this.yield(this._tree.nextChild(e < 0 ? this._tree._tree.children.length - 1 : 0, e, t, i, this.mode));
    let { buffer: r } = this.buffer, s = r.findChild(this.index + 4, r.buffer[this.index + 3], e, t - this.buffer.start, i);
    return s < 0 ? !1 : (this.stack.push(this.index), this.yieldBuf(s));
  }
  /**
  Move the cursor to this node's first child. When this returns
  false, the node has no child, and the cursor has not been moved.
  */
  firstChild() {
    return this.enterChild(
      1,
      0,
      4
      /* Side.DontCare */
    );
  }
  /**
  Move the cursor to this node's last child.
  */
  lastChild() {
    return this.enterChild(
      -1,
      0,
      4
      /* Side.DontCare */
    );
  }
  /**
  Move the cursor to the first child that ends after `pos`.
  */
  childAfter(e) {
    return this.enterChild(
      1,
      e,
      2
      /* Side.After */
    );
  }
  /**
  Move to the last child that starts before `pos`.
  */
  childBefore(e) {
    return this.enterChild(
      -1,
      e,
      -2
      /* Side.Before */
    );
  }
  /**
  Move the cursor to the child around `pos`. If side is -1 the
  child may end at that position, when 1 it may start there. This
  will also enter [overlaid](#common.MountedTree.overlay)
  [mounted](#common.NodeProp^mounted) trees unless `overlays` is
  set to false.
  */
  enter(e, t, i = this.mode) {
    return this.buffer ? i & W.ExcludeBuffers ? !1 : this.enterChild(1, e, t) : this.yield(this._tree.enter(e, t, i));
  }
  /**
  Move to the node's parent node, if this isn't the top node.
  */
  parent() {
    if (!this.buffer)
      return this.yieldNode(this.mode & W.IncludeAnonymous ? this._tree._parent : this._tree.parent);
    if (this.stack.length)
      return this.yieldBuf(this.stack.pop());
    let e = this.mode & W.IncludeAnonymous ? this.buffer.parent : this.buffer.parent.nextSignificantParent();
    return this.buffer = null, this.yieldNode(e);
  }
  /**
  @internal
  */
  sibling(e) {
    if (!this.buffer)
      return this._tree._parent ? this.yield(this._tree.index < 0 ? null : this._tree._parent.nextChild(this._tree.index + e, e, 0, 4, this.mode)) : !1;
    let { buffer: t } = this.buffer, i = this.stack.length - 1;
    if (e < 0) {
      let r = i < 0 ? 0 : this.stack[i] + 4;
      if (this.index != r)
        return this.yieldBuf(t.findChild(
          r,
          this.index,
          -1,
          0,
          4
          /* Side.DontCare */
        ));
    } else {
      let r = t.buffer[this.index + 3];
      if (r < (i < 0 ? t.buffer.length : t.buffer[this.stack[i] + 3]))
        return this.yieldBuf(r);
    }
    return i < 0 ? this.yield(this.buffer.parent.nextChild(this.buffer.index + e, e, 0, 4, this.mode)) : !1;
  }
  /**
  Move to this node's next sibling, if any.
  */
  nextSibling() {
    return this.sibling(1);
  }
  /**
  Move to this node's previous sibling, if any.
  */
  prevSibling() {
    return this.sibling(-1);
  }
  atLastNode(e) {
    let t, i, { buffer: r } = this;
    if (r) {
      if (e > 0) {
        if (this.index < r.buffer.buffer.length)
          return !1;
      } else
        for (let s = 0; s < this.index; s++)
          if (r.buffer.buffer[s + 3] < this.index)
            return !1;
      ({ index: t, parent: i } = r);
    } else
      ({ index: t, _parent: i } = this._tree);
    for (; i; { index: t, _parent: i } = i)
      if (t > -1)
        for (let s = t + e, o = e < 0 ? -1 : i._tree.children.length; s != o; s += e) {
          let l = i._tree.children[s];
          if (this.mode & W.IncludeAnonymous || l instanceof Ct || !l.type.isAnonymous || Ho(l))
            return !1;
        }
    return !0;
  }
  move(e, t) {
    if (t && this.enterChild(
      e,
      0,
      4
      /* Side.DontCare */
    ))
      return !0;
    for (; ; ) {
      if (this.sibling(e))
        return !0;
      if (this.atLastNode(e) || !this.parent())
        return !1;
    }
  }
  /**
  Move to the next node in a
  [pre-order](https://en.wikipedia.org/wiki/Tree_traversal#Pre-order,_NLR)
  traversal, going from a node to its first child or, if the
  current node is empty or `enter` is false, its next sibling or
  the next sibling of the first parent node that has one.
  */
  next(e = !0) {
    return this.move(1, e);
  }
  /**
  Move to the next node in a last-to-first pre-order traversal. A
  node is followed by its last child or, if it has none, its
  previous sibling or the previous sibling of the first parent
  node that has one.
  */
  prev(e = !0) {
    return this.move(-1, e);
  }
  /**
  Move the cursor to the innermost node that covers `pos`. If
  `side` is -1, it will enter nodes that end at `pos`. If it is 1,
  it will enter nodes that start at `pos`.
  */
  moveTo(e, t = 0) {
    for (; (this.from == this.to || (t < 1 ? this.from >= e : this.from > e) || (t > -1 ? this.to <= e : this.to < e)) && this.parent(); )
      ;
    for (; this.enterChild(1, e, t); )
      ;
    return this;
  }
  /**
  Get a [syntax node](#common.SyntaxNode) at the cursor's current
  position.
  */
  get node() {
    if (!this.buffer)
      return this._tree;
    let e = this.bufferNode, t = null, i = 0;
    if (e && e.context == this.buffer)
      e: for (let r = this.index, s = this.stack.length; s >= 0; ) {
        for (let o = e; o; o = o._parent)
          if (o.index == r) {
            if (r == this.index)
              return o;
            t = o, i = s + 1;
            break e;
          }
        r = this.stack[--s];
      }
    for (let r = i; r < this.stack.length; r++)
      t = new nt(this.buffer, t, this.stack[r]);
    return this.bufferNode = new nt(this.buffer, t, this.index);
  }
  /**
  Get the [tree](#common.Tree) that represents the current node, if
  any. Will return null when the node is in a [tree
  buffer](#common.TreeBuffer).
  */
  get tree() {
    return this.buffer ? null : this._tree._tree;
  }
  /**
  Iterate over the current node and all its descendants, calling
  `enter` when entering a node and `leave`, if given, when leaving
  one. When `enter` returns `false`, any children of that node are
  skipped, and `leave` isn't called for it.
  */
  iterate(e, t) {
    for (let i = 0; ; ) {
      let r = !1;
      if (this.type.isAnonymous || e(this) !== !1) {
        if (this.firstChild()) {
          i++;
          continue;
        }
        this.type.isAnonymous || (r = !0);
      }
      for (; ; ) {
        if (r && t && t(this), r = this.type.isAnonymous, !i)
          return;
        if (this.nextSibling())
          break;
        this.parent(), i--, r = !0;
      }
    }
  }
  /**
  Test whether the current node matches a given context—a sequence
  of direct parent node names. Empty strings in the context array
  are treated as wildcards.
  */
  matchContext(e) {
    if (!this.buffer)
      return Oo(this.node.parent, e);
    let { buffer: t } = this.buffer, { types: i } = t.set;
    for (let r = e.length - 1, s = this.stack.length - 1; r >= 0; s--) {
      if (s < 0)
        return Oo(this._tree, e, r);
      let o = i[t.buffer[this.stack[s]]];
      if (!o.isAnonymous) {
        if (e[r] && e[r] != o.name)
          return !1;
        r--;
      }
    }
    return !0;
  }
}
function Ho(n) {
  return n.children.some((e) => e instanceof Ct || !e.type.isAnonymous || Ho(e));
}
function qm(n) {
  var e;
  let { buffer: t, nodeSet: i, maxBufferLength: r = ff, reused: s = [], minRepeatType: o = i.types.length } = n, l = Array.isArray(t) ? new Fo(t, t.length) : t, a = i.types, h = 0, c = 0;
  function f(x, $, w, R, Y, I) {
    let { id: V, start: A, end: L, size: q } = l, G = c, pe = h;
    if (q < 0)
      if (l.next(), q == -1) {
        let ct = s[V];
        w.push(ct), R.push(A - x);
        return;
      } else if (q == -3) {
        h = V;
        return;
      } else if (q == -4) {
        c = V;
        return;
      } else
        throw new RangeError(`Unrecognized record size: ${q}`);
    let $e = a[V], Ne, le, Ae = A - x;
    if (L - A <= r && (le = g(l.pos - $, Y))) {
      let ct = new Uint16Array(le.size - le.skip), Me = l.pos - le.size, Ge = ct.length;
      for (; l.pos > Me; )
        Ge = Q(le.start, ct, Ge);
      Ne = new Ct(ct, L - le.start, i), Ae = le.start - x;
    } else {
      let ct = l.pos - q;
      l.next();
      let Me = [], Ge = [], Rt = V >= o ? V : -1, Nt = 0, Qn = L;
      for (; l.pos > ct; )
        Rt >= 0 && l.id == Rt && l.size >= 0 ? (l.end <= Qn - r && (O(Me, Ge, A, Nt, l.end, Qn, Rt, G, pe), Nt = Me.length, Qn = l.end), l.next()) : I > 2500 ? u(A, ct, Me, Ge) : f(A, ct, Me, Ge, Rt, I + 1);
      if (Rt >= 0 && Nt > 0 && Nt < Me.length && O(Me, Ge, A, Nt, A, Qn, Rt, G, pe), Me.reverse(), Ge.reverse(), Rt > -1 && Nt > 0) {
        let wl = d($e, pe);
        Ne = Ko($e, Me, Ge, 0, Me.length, 0, L - A, wl, wl);
      } else
        Ne = m($e, Me, Ge, L - A, G - L, pe);
    }
    w.push(Ne), R.push(Ae);
  }
  function u(x, $, w, R) {
    let Y = [], I = 0, V = -1;
    for (; l.pos > $; ) {
      let { id: A, start: L, end: q, size: G } = l;
      if (G > 4)
        l.next();
      else {
        if (V > -1 && L < V)
          break;
        V < 0 && (V = q - r), Y.push(A, L, q), I++, l.next();
      }
    }
    if (I) {
      let A = new Uint16Array(I * 4), L = Y[Y.length - 2];
      for (let q = Y.length - 3, G = 0; q >= 0; q -= 3)
        A[G++] = Y[q], A[G++] = Y[q + 1] - L, A[G++] = Y[q + 2] - L, A[G++] = G;
      w.push(new Ct(A, Y[2] - L, i)), R.push(L - x);
    }
  }
  function d(x, $) {
    return (w, R, Y) => {
      let I = 0, V = w.length - 1, A, L;
      if (V >= 0 && (A = w[V]) instanceof H) {
        if (!V && A.type == x && A.length == Y)
          return A;
        (L = A.prop(z.lookAhead)) && (I = R[V] + A.length + L);
      }
      return m(x, w, R, Y, I, $);
    };
  }
  function O(x, $, w, R, Y, I, V, A, L) {
    let q = [], G = [];
    for (; x.length > R; )
      q.push(x.pop()), G.push($.pop() + w - Y);
    x.push(m(i.types[V], q, G, I - Y, A - I, L)), $.push(Y - w);
  }
  function m(x, $, w, R, Y, I, V) {
    if (I) {
      let A = [z.contextHash, I];
      V = V ? [A].concat(V) : [A];
    }
    if (Y > 25) {
      let A = [z.lookAhead, Y];
      V = V ? [A].concat(V) : [A];
    }
    return new H(x, $, w, R, V);
  }
  function g(x, $) {
    let w = l.fork(), R = 0, Y = 0, I = 0, V = w.end - r, A = { size: 0, start: 0, skip: 0 };
    e: for (let L = w.pos - x; w.pos > L; ) {
      let q = w.size;
      if (w.id == $ && q >= 0) {
        A.size = R, A.start = Y, A.skip = I, I += 4, R += 4, w.next();
        continue;
      }
      let G = w.pos - q;
      if (q < 0 || G < L || w.start < V)
        break;
      let pe = w.id >= o ? 4 : 0, $e = w.start;
      for (w.next(); w.pos > G; ) {
        if (w.size < 0)
          if (w.size == -3 || w.size == -4)
            pe += 4;
          else
            break e;
        else w.id >= o && (pe += 4);
        w.next();
      }
      Y = $e, R += q, I += pe;
    }
    return ($ < 0 || R == x) && (A.size = R, A.start = Y, A.skip = I), A.size > 4 ? A : void 0;
  }
  function Q(x, $, w) {
    let { id: R, start: Y, end: I, size: V } = l;
    if (l.next(), V >= 0 && R < o) {
      let A = w;
      if (V > 4) {
        let L = l.pos - (V - 4);
        for (; l.pos > L; )
          w = Q(x, $, w);
      }
      $[--w] = A, $[--w] = I - x, $[--w] = Y - x, $[--w] = R;
    } else V == -3 ? h = R : V == -4 && (c = R);
    return w;
  }
  let S = [], y = [];
  for (; l.pos > 0; )
    f(n.start || 0, n.bufferStart || 0, S, y, -1, 0);
  let k = (e = n.length) !== null && e !== void 0 ? e : S.length ? y[0] + S[0].length : 0;
  return new H(a[n.topID], S.reverse(), y.reverse(), k);
}
const Pa = /* @__PURE__ */ new WeakMap();
function Un(n, e) {
  if (!n.isAnonymous || e instanceof Ct || e.type != n)
    return 1;
  let t = Pa.get(e);
  if (t == null) {
    t = 1;
    for (let i of e.children) {
      if (i.type != n || !(i instanceof H)) {
        t = 1;
        break;
      }
      t += Un(n, i);
    }
    Pa.set(e, t);
  }
  return t;
}
function Ko(n, e, t, i, r, s, o, l, a) {
  let h = 0;
  for (let O = i; O < r; O++)
    h += Un(n, e[O]);
  let c = Math.ceil(
    h * 1.5 / 8
    /* Balance.BranchFactor */
  ), f = [], u = [];
  function d(O, m, g, Q, S) {
    for (let y = g; y < Q; ) {
      let k = y, x = m[y], $ = Un(n, O[y]);
      for (y++; y < Q; y++) {
        let w = Un(n, O[y]);
        if ($ + w >= c)
          break;
        $ += w;
      }
      if (y == k + 1) {
        if ($ > c) {
          let w = O[k];
          d(w.children, w.positions, 0, w.children.length, m[k] + S);
          continue;
        }
        f.push(O[k]);
      } else {
        let w = m[y - 1] + O[y - 1].length - x;
        f.push(Ko(n, O, m, k, y, x, w, null, a));
      }
      u.push(x + S - s);
    }
  }
  return d(e, t, i, r, 0), (l || a)(f, u, o);
}
class pf {
  constructor() {
    this.map = /* @__PURE__ */ new WeakMap();
  }
  setBuffer(e, t, i) {
    let r = this.map.get(e);
    r || this.map.set(e, r = /* @__PURE__ */ new Map()), r.set(t, i);
  }
  getBuffer(e, t) {
    let i = this.map.get(e);
    return i && i.get(t);
  }
  /**
  Set the value for this syntax node.
  */
  set(e, t) {
    e instanceof nt ? this.setBuffer(e.context.buffer, e.index, t) : e instanceof de && this.map.set(e.tree, t);
  }
  /**
  Retrieve value for this syntax node, if it exists in the map.
  */
  get(e) {
    return e instanceof nt ? this.getBuffer(e.context.buffer, e.index) : e instanceof de ? this.map.get(e.tree) : void 0;
  }
  /**
  Set the value for the node that a cursor currently points to.
  */
  cursorSet(e, t) {
    e.buffer ? this.setBuffer(e.buffer.buffer, e.index, t) : this.map.set(e.tree, t);
  }
  /**
  Retrieve the value for the node that a cursor currently points
  to.
  */
  cursorGet(e) {
    return e.buffer ? this.getBuffer(e.buffer.buffer, e.index) : this.map.get(e.tree);
  }
}
class pt {
  /**
  Construct a tree fragment. You'll usually want to use
  [`addTree`](#common.TreeFragment^addTree) and
  [`applyChanges`](#common.TreeFragment^applyChanges) instead of
  calling this directly.
  */
  constructor(e, t, i, r, s = !1, o = !1) {
    this.from = e, this.to = t, this.tree = i, this.offset = r, this.open = (s ? 1 : 0) | (o ? 2 : 0);
  }
  /**
  Whether the start of the fragment represents the start of a
  parse, or the end of a change. (In the second case, it may not
  be safe to reuse some nodes at the start, depending on the
  parsing algorithm.)
  */
  get openStart() {
    return (this.open & 1) > 0;
  }
  /**
  Whether the end of the fragment represents the end of a
  full-document parse, or the start of a change.
  */
  get openEnd() {
    return (this.open & 2) > 0;
  }
  /**
  Create a set of fragments from a freshly parsed tree, or update
  an existing set of fragments by replacing the ones that overlap
  with a tree with content from the new tree. When `partial` is
  true, the parse is treated as incomplete, and the resulting
  fragment has [`openEnd`](#common.TreeFragment.openEnd) set to
  true.
  */
  static addTree(e, t = [], i = !1) {
    let r = [new pt(0, e.length, e, 0, !1, i)];
    for (let s of t)
      s.to > e.length && r.push(s);
    return r;
  }
  /**
  Apply a set of edits to an array of fragments, removing or
  splitting fragments as necessary to remove edited ranges, and
  adjusting offsets for fragments that moved.
  */
  static applyChanges(e, t, i = 128) {
    if (!t.length)
      return e;
    let r = [], s = 1, o = e.length ? e[0] : null;
    for (let l = 0, a = 0, h = 0; ; l++) {
      let c = l < t.length ? t[l] : null, f = c ? c.fromA : 1e9;
      if (f - a >= i)
        for (; o && o.from < f; ) {
          let u = o;
          if (a >= u.from || f <= u.to || h) {
            let d = Math.max(u.from, a) - h, O = Math.min(u.to, f) - h;
            u = d >= O ? null : new pt(d, O, u.tree, u.offset + h, l > 0, !!c);
          }
          if (u && r.push(u), o.to > f)
            break;
          o = s < e.length ? e[s++] : null;
        }
      if (!c)
        break;
      a = c.toA, h = c.toA - c.toB;
    }
    return r;
  }
}
class mf {
  /**
  Start a parse, returning a [partial parse](#common.PartialParse)
  object. [`fragments`](#common.TreeFragment) can be passed in to
  make the parse incremental.
  
  By default, the entire input is parsed. You can pass `ranges`,
  which should be a sorted array of non-empty, non-overlapping
  ranges, to parse only those ranges. The tree returned in that
  case will start at `ranges[0].from`.
  */
  startParse(e, t, i) {
    return typeof e == "string" && (e = new Wm(e)), i = i ? i.length ? i.map((r) => new Ye(r.from, r.to)) : [new Ye(0, 0)] : [new Ye(0, e.length)], this.createParse(e, t || [], i);
  }
  /**
  Run a full parse, returning the resulting tree.
  */
  parse(e, t, i) {
    let r = this.startParse(e, t, i);
    for (; ; ) {
      let s = r.advance();
      if (s)
        return s;
    }
  }
}
class Wm {
  constructor(e) {
    this.string = e;
  }
  get length() {
    return this.string.length;
  }
  chunk(e) {
    return this.string.slice(e);
  }
  get lineChunks() {
    return !1;
  }
  read(e, t) {
    return this.string.slice(e, t);
  }
}
function Lm(n) {
  return (e, t, i, r) => new Im(e, n, t, i, r);
}
class va {
  constructor(e, t, i, r, s, o) {
    this.parser = e, this.parse = t, this.overlay = i, this.bracketed = r, this.target = s, this.from = o;
  }
}
function Ta(n) {
  if (!n.length || n.some((e) => e.from >= e.to))
    throw new RangeError("Invalid inner parse ranges given: " + JSON.stringify(n));
}
class Bm {
  constructor(e, t, i, r, s, o, l, a) {
    this.parser = e, this.predicate = t, this.mounts = i, this.index = r, this.start = s, this.bracketed = o, this.target = l, this.prev = a, this.depth = 0, this.ranges = [];
  }
}
const po = new z({ perNode: !0 });
class Im {
  constructor(e, t, i, r, s) {
    this.nest = t, this.input = i, this.fragments = r, this.ranges = s, this.inner = [], this.innerDone = 0, this.baseTree = null, this.stoppedAt = null, this.baseParse = e;
  }
  advance() {
    if (this.baseParse) {
      let i = this.baseParse.advance();
      if (!i)
        return null;
      if (this.baseParse = null, this.baseTree = i, this.startInner(), this.stoppedAt != null)
        for (let r of this.inner)
          r.parse.stopAt(this.stoppedAt);
    }
    if (this.innerDone == this.inner.length) {
      let i = this.baseTree;
      return this.stoppedAt != null && (i = new H(i.type, i.children, i.positions, i.length, i.propValues.concat([[po, this.stoppedAt]]))), i;
    }
    let e = this.inner[this.innerDone], t = e.parse.advance();
    if (t) {
      this.innerDone++;
      let i = Object.assign(/* @__PURE__ */ Object.create(null), e.target.props);
      i[z.mounted.id] = new si(t, e.overlay, e.parser, e.bracketed), e.target.props = i;
    }
    return null;
  }
  get parsedPos() {
    if (this.baseParse)
      return 0;
    let e = this.input.length;
    for (let t = this.innerDone; t < this.inner.length; t++)
      this.inner[t].from < e && (e = Math.min(e, this.inner[t].parse.parsedPos));
    return e;
  }
  stopAt(e) {
    if (this.stoppedAt = e, this.baseParse)
      this.baseParse.stopAt(e);
    else
      for (let t = this.innerDone; t < this.inner.length; t++)
        this.inner[t].parse.stopAt(e);
  }
  startInner() {
    let e = new Gm(this.fragments), t = null, i = null, r = new ur(new de(this.baseTree, this.ranges[0].from, 0, null), W.IncludeAnonymous | W.IgnoreMounts);
    e: for (let s, o; ; ) {
      let l = !0, a;
      if (this.stoppedAt != null && r.from >= this.stoppedAt)
        l = !1;
      else if (e.hasNode(r)) {
        if (t) {
          let h = t.mounts.find((c) => c.frag.from <= r.from && c.frag.to >= r.to && c.mount.overlay);
          if (h)
            for (let c of h.mount.overlay) {
              let f = c.from + h.pos, u = c.to + h.pos;
              f >= r.from && u <= r.to && !t.ranges.some((d) => d.from < u && d.to > f) && t.ranges.push({ from: f, to: u });
            }
        }
        l = !1;
      } else if (i && (o = jm(i.ranges, r.from, r.to)))
        l = o != 2;
      else if (!r.type.isAnonymous && (s = this.nest(r, this.input)) && (r.from < r.to || !s.overlay)) {
        r.tree || (Nm(r), t && t.depth++, i && i.depth++);
        let h = e.findMounts(r.from, s.parser);
        if (typeof s.overlay == "function")
          t = new Bm(s.parser, s.overlay, h, this.inner.length, r.from, !!s.bracketed, r.tree, t);
        else {
          let c = Xa(this.ranges, s.overlay || (r.from < r.to ? [new Ye(r.from, r.to)] : []));
          c.length && Ta(c), (c.length || !s.overlay) && this.inner.push(new va(s.parser, c.length ? s.parser.startParse(this.input, Aa(h, c), c) : s.parser.startParse(""), s.overlay ? s.overlay.map((f) => new Ye(f.from - r.from, f.to - r.from)) : null, !!s.bracketed, r.tree, c.length ? c[0].from : r.from)), s.overlay ? c.length && (i = { ranges: c, depth: 0, prev: i }) : l = !1;
        }
      } else if (t && (a = t.predicate(r)) && (a === !0 && (a = new Ye(r.from, r.to)), a.from < a.to)) {
        let h = t.ranges.length - 1;
        h >= 0 && t.ranges[h].to == a.from ? t.ranges[h] = { from: t.ranges[h].from, to: a.to } : t.ranges.push(a);
      }
      if (l && r.firstChild())
        t && t.depth++, i && i.depth++;
      else
        for (; !r.nextSibling(); ) {
          if (!r.parent())
            break e;
          if (t && !--t.depth) {
            let h = Xa(this.ranges, t.ranges);
            h.length && (Ta(h), this.inner.splice(t.index, 0, new va(t.parser, t.parser.startParse(this.input, Aa(t.mounts, h), h), t.ranges.map((c) => new Ye(c.from - t.start, c.to - t.start)), t.bracketed, t.target, h[0].from))), t = t.prev;
          }
          i && !--i.depth && (i = i.prev);
        }
    }
  }
}
function jm(n, e, t) {
  for (let i of n) {
    if (i.from >= t)
      break;
    if (i.to > e)
      return i.from <= e && i.to >= t ? 2 : 1;
  }
  return 0;
}
function Ca(n, e, t, i, r, s) {
  if (e < t) {
    let o = n.buffer[e + 1];
    i.push(n.slice(e, t, o)), r.push(o - s);
  }
}
function Nm(n) {
  let { node: e } = n, t = [], i = e.context.buffer;
  do
    t.push(n.index), n.parent();
  while (!n.tree);
  let r = n.tree, s = r.children.indexOf(i), o = r.children[s], l = o.buffer, a = [s];
  function h(c, f, u, d, O, m) {
    let g = t[m], Q = [], S = [];
    Ca(o, c, g, Q, S, d);
    let y = l[g + 1], k = l[g + 2];
    a.push(Q.length);
    let x = m ? h(g + 4, l[g + 3], o.set.types[l[g]], y, k - y, m - 1) : e.toTree();
    return Q.push(x), S.push(y - d), Ca(o, l[g + 3], f, Q, S, d), new H(u, Q, S, O);
  }
  r.children[s] = h(0, l.length, Qe.none, 0, o.length, t.length - 1);
  for (let c of a) {
    let f = n.tree.children[c], u = n.tree.positions[c];
    n.yield(new de(f, u + n.from, c, n._tree));
  }
}
class Za {
  constructor(e, t) {
    this.offset = t, this.done = !1, this.cursor = e.cursor(W.IncludeAnonymous | W.IgnoreMounts);
  }
  // Move to the first node (in pre-order) that starts at or after `pos`.
  moveTo(e) {
    let { cursor: t } = this, i = e - this.offset;
    for (; !this.done && t.from < i; )
      t.to >= e && t.enter(i, 1, W.IgnoreOverlays | W.ExcludeBuffers) || t.next(!1) || (this.done = !0);
  }
  hasNode(e) {
    if (this.moveTo(e.from), !this.done && this.cursor.from + this.offset == e.from && this.cursor.tree)
      for (let t = this.cursor.tree; ; ) {
        if (t == e.tree)
          return !0;
        if (t.children.length && t.positions[0] == 0 && t.children[0] instanceof H)
          t = t.children[0];
        else
          break;
      }
    return !1;
  }
}
let Gm = class {
  constructor(e) {
    var t;
    if (this.fragments = e, this.curTo = 0, this.fragI = 0, e.length) {
      let i = this.curFrag = e[0];
      this.curTo = (t = i.tree.prop(po)) !== null && t !== void 0 ? t : i.to, this.inner = new Za(i.tree, -i.offset);
    } else
      this.curFrag = this.inner = null;
  }
  hasNode(e) {
    for (; this.curFrag && e.from >= this.curTo; )
      this.nextFrag();
    return this.curFrag && this.curFrag.from <= e.from && this.curTo >= e.to && this.inner.hasNode(e);
  }
  nextFrag() {
    var e;
    if (this.fragI++, this.fragI == this.fragments.length)
      this.curFrag = this.inner = null;
    else {
      let t = this.curFrag = this.fragments[this.fragI];
      this.curTo = (e = t.tree.prop(po)) !== null && e !== void 0 ? e : t.to, this.inner = new Za(t.tree, -t.offset);
    }
  }
  findMounts(e, t) {
    var i;
    let r = [];
    if (this.inner) {
      this.inner.cursor.moveTo(e, 1);
      for (let s = this.inner.cursor.node; s; s = s.parent) {
        let o = (i = s.tree) === null || i === void 0 ? void 0 : i.prop(z.mounted);
        if (o && o.parser == t)
          for (let l = this.fragI; l < this.fragments.length; l++) {
            let a = this.fragments[l];
            if (a.from >= s.to)
              break;
            a.tree == this.curFrag.tree && r.push({
              frag: a,
              pos: s.from - a.offset,
              mount: o
            });
          }
      }
    }
    return r;
  }
};
function Xa(n, e) {
  let t = null, i = e;
  for (let r = 1, s = 0; r < n.length; r++) {
    let o = n[r - 1].to, l = n[r].from;
    for (; s < i.length; s++) {
      let a = i[s];
      if (a.from >= l)
        break;
      a.to <= o || (t || (i = t = e.slice()), a.from < o ? (t[s] = new Ye(a.from, o), a.to > l && t.splice(s + 1, 0, new Ye(l, a.to))) : a.to > l ? t[s--] = new Ye(l, a.to) : t.splice(s--, 1));
    }
  }
  return i;
}
function Um(n, e, t, i) {
  let r = 0, s = 0, o = !1, l = !1, a = -1e9, h = [];
  for (; ; ) {
    let c = r == n.length ? 1e9 : o ? n[r].to : n[r].from, f = s == e.length ? 1e9 : l ? e[s].to : e[s].from;
    if (o != l) {
      let u = Math.max(a, t), d = Math.min(c, f, i);
      u < d && h.push(new Ye(u, d));
    }
    if (a = Math.min(c, f), a == 1e9)
      break;
    c == a && (o ? (o = !1, r++) : o = !0), f == a && (l ? (l = !1, s++) : l = !0);
  }
  return h;
}
function Aa(n, e) {
  let t = [];
  for (let { pos: i, mount: r, frag: s } of n) {
    let o = i + (r.overlay ? r.overlay[0].from : 0), l = o + r.tree.length, a = Math.max(s.from, o), h = Math.min(s.to, l);
    if (r.overlay) {
      let c = r.overlay.map((u) => new Ye(u.from + i, u.to + i)), f = Um(e, c, a, h);
      for (let u = 0, d = a; ; u++) {
        let O = u == f.length, m = O ? h : f[u].from;
        if (m > d && t.push(new pt(d, m, r.tree, -o, s.from >= d || s.openStart, s.to <= m || s.openEnd)), O)
          break;
        d = f[u].to;
      }
    } else
      t.push(new pt(a, h, r.tree, -o, s.from >= o || s.openStart, s.to <= l || s.openEnd));
  }
  return t;
}
let Fm = 0;
class Re {
  /**
  @internal
  */
  constructor(e, t, i, r) {
    this.name = e, this.set = t, this.base = i, this.modified = r, this.id = Fm++;
  }
  toString() {
    let { name: e } = this;
    for (let t of this.modified)
      t.name && (e = `${t.name}(${e})`);
    return e;
  }
  static define(e, t) {
    let i = typeof e == "string" ? e : "?";
    if (e instanceof Re && (t = e), t != null && t.base)
      throw new Error("Can not derive from a modified tag");
    let r = new Re(i, [], null, []);
    if (r.set.push(r), t)
      for (let s of t.set)
        r.set.push(s);
    return r;
  }
  /**
  Define a tag _modifier_, which is a function that, given a tag,
  will return a tag that is a subtag of the original. Applying the
  same modifier to a twice tag will return the same value (`m1(t1)
  == m1(t1)`) and applying multiple modifiers will, regardless or
  order, produce the same tag (`m1(m2(t1)) == m2(m1(t1))`).
  
  When multiple modifiers are applied to a given base tag, each
  smaller set of modifiers is registered as a parent, so that for
  example `m1(m2(m3(t1)))` is a subtype of `m1(m2(t1))`,
  `m1(m3(t1)`, and so on.
  */
  static defineModifier(e) {
    let t = new dr(e);
    return (i) => i.modified.indexOf(t) > -1 ? i : dr.get(i.base || i, i.modified.concat(t).sort((r, s) => r.id - s.id));
  }
}
let Hm = 0;
class dr {
  constructor(e) {
    this.name = e, this.instances = [], this.id = Hm++;
  }
  static get(e, t) {
    if (!t.length)
      return e;
    let i = t[0].instances.find((l) => l.base == e && Km(t, l.modified));
    if (i)
      return i;
    let r = [], s = new Re(e.name, r, e, t);
    for (let l of t)
      l.instances.push(s);
    let o = Jm(t);
    for (let l of e.set)
      if (!l.modified.length)
        for (let a of o)
          r.push(dr.get(l, a));
    return s;
  }
}
function Km(n, e) {
  return n.length == e.length && n.every((t, i) => t == e[i]);
}
function Jm(n) {
  let e = [[]];
  for (let t = 0; t < n.length; t++)
    for (let i = 0, r = e.length; i < r; i++)
      e.push(e[i].concat(n[t]));
  return e.sort((t, i) => i.length - t.length);
}
function Er(n) {
  let e = /* @__PURE__ */ Object.create(null);
  for (let t in n) {
    let i = n[t];
    Array.isArray(i) || (i = [i]);
    for (let r of t.split(" "))
      if (r) {
        let s = [], o = 2, l = r;
        for (let f = 0; ; ) {
          if (l == "..." && f > 0 && f + 3 == r.length) {
            o = 1;
            break;
          }
          let u = /^"(?:[^"\\]|\\.)*?"|[^\/!]+/.exec(l);
          if (!u)
            throw new RangeError("Invalid path: " + r);
          if (s.push(u[0] == "*" ? "" : u[0][0] == '"' ? JSON.parse(u[0]) : u[0]), f += u[0].length, f == r.length)
            break;
          let d = r[f++];
          if (f == r.length && d == "!") {
            o = 0;
            break;
          }
          if (d != "/")
            throw new RangeError("Invalid path: " + r);
          l = r.slice(f);
        }
        let a = s.length - 1, h = s[a];
        if (!h)
          throw new RangeError("Invalid path: " + r);
        let c = new Ki(i, o, a > 0 ? s.slice(0, a) : null);
        e[h] = c.sort(e[h]);
      }
  }
  return gf.add(e);
}
const gf = new z({
  combine(n, e) {
    let t, i, r;
    for (; n || e; ) {
      if (!n || e && n.depth >= e.depth ? (r = e, e = e.next) : (r = n, n = n.next), t && t.mode == r.mode && !r.context && !t.context)
        continue;
      let s = new Ki(r.tags, r.mode, r.context);
      t ? t.next = s : i = s, t = s;
    }
    return i;
  }
});
class Ki {
  constructor(e, t, i, r) {
    this.tags = e, this.mode = t, this.context = i, this.next = r;
  }
  get opaque() {
    return this.mode == 0;
  }
  get inherit() {
    return this.mode == 1;
  }
  sort(e) {
    return !e || e.depth < this.depth ? (this.next = e, this) : (e.next = this.sort(e.next), e);
  }
  get depth() {
    return this.context ? this.context.length : 0;
  }
}
Ki.empty = new Ki([], 2, null);
function Qf(n, e) {
  let t = /* @__PURE__ */ Object.create(null);
  for (let s of n)
    if (!Array.isArray(s.tag))
      t[s.tag.id] = s.class;
    else
      for (let o of s.tag)
        t[o.id] = s.class;
  let { scope: i, all: r = null } = e || {};
  return {
    style: (s) => {
      let o = r;
      for (let l of s)
        for (let a of l.set) {
          let h = t[a.id];
          if (h) {
            o = o ? o + " " + h : h;
            break;
          }
        }
      return o;
    },
    scope: i
  };
}
function eg(n, e) {
  let t = null;
  for (let i of n) {
    let r = i.style(e);
    r && (t = t ? t + " " + r : r);
  }
  return t;
}
function tg(n, e, t, i = 0, r = n.length) {
  let s = new ig(i, Array.isArray(e) ? e : [e], t);
  s.highlightRange(n.cursor(), i, r, "", s.highlighters), s.flush(r);
}
class ig {
  constructor(e, t, i) {
    this.at = e, this.highlighters = t, this.span = i, this.class = "";
  }
  startSpan(e, t) {
    t != this.class && (this.flush(e), e > this.at && (this.at = e), this.class = t);
  }
  flush(e) {
    e > this.at && this.class && this.span(this.at, e, this.class);
  }
  highlightRange(e, t, i, r, s) {
    let { type: o, from: l, to: a } = e;
    if (l >= i || a <= t)
      return;
    o.isTop && (s = this.highlighters.filter((d) => !d.scope || d.scope(o)));
    let h = r, c = ng(e) || Ki.empty, f = eg(s, c.tags);
    if (f && (h && (h += " "), h += f, c.mode == 1 && (r += (r ? " " : "") + f)), this.startSpan(Math.max(t, l), h), c.opaque)
      return;
    let u = e.tree && e.tree.prop(z.mounted);
    if (u && u.overlay) {
      let d = e.node.enter(u.overlay[0].from + l, 1), O = this.highlighters.filter((g) => !g.scope || g.scope(u.tree.type)), m = e.firstChild();
      for (let g = 0, Q = l; ; g++) {
        let S = g < u.overlay.length ? u.overlay[g] : null, y = S ? S.from + l : a, k = Math.max(t, Q), x = Math.min(i, y);
        if (k < x && m)
          for (; e.from < x && (this.highlightRange(e, k, x, r, s), this.startSpan(Math.min(x, e.to), h), !(e.to >= y || !e.nextSibling())); )
            ;
        if (!S || y > i)
          break;
        Q = S.to + l, Q > t && (this.highlightRange(d.cursor(), Math.max(t, S.from + l), Math.min(i, Q), "", O), this.startSpan(Math.min(i, Q), h));
      }
      m && e.parent();
    } else if (e.firstChild()) {
      u && (r = "");
      do
        if (!(e.to <= t)) {
          if (e.from >= i)
            break;
          this.highlightRange(e, t, i, r, s), this.startSpan(Math.min(i, e.to), h);
        }
      while (e.nextSibling());
      e.parent();
    }
  }
}
function ng(n) {
  let e = n.type.prop(gf);
  for (; e && e.context && !n.matchContext(e.context); )
    e = e.next;
  return e || null;
}
const P = Re.define, Rn = P(), St = P(), Ma = P(St), Ra = P(St), yt = P(), zn = P(yt), cs = P(yt), Ke = P(), zt = P(Ke), Fe = P(), He = P(), mo = P(), vi = P(mo), Yn = P(), p = {
  /**
  A comment.
  */
  comment: Rn,
  /**
  A line [comment](#highlight.tags.comment).
  */
  lineComment: P(Rn),
  /**
  A block [comment](#highlight.tags.comment).
  */
  blockComment: P(Rn),
  /**
  A documentation [comment](#highlight.tags.comment).
  */
  docComment: P(Rn),
  /**
  Any kind of identifier.
  */
  name: St,
  /**
  The [name](#highlight.tags.name) of a variable.
  */
  variableName: P(St),
  /**
  A type [name](#highlight.tags.name).
  */
  typeName: Ma,
  /**
  A tag name (subtag of [`typeName`](#highlight.tags.typeName)).
  */
  tagName: P(Ma),
  /**
  A property or field [name](#highlight.tags.name).
  */
  propertyName: Ra,
  /**
  An attribute name (subtag of [`propertyName`](#highlight.tags.propertyName)).
  */
  attributeName: P(Ra),
  /**
  The [name](#highlight.tags.name) of a class.
  */
  className: P(St),
  /**
  A label [name](#highlight.tags.name).
  */
  labelName: P(St),
  /**
  A namespace [name](#highlight.tags.name).
  */
  namespace: P(St),
  /**
  The [name](#highlight.tags.name) of a macro.
  */
  macroName: P(St),
  /**
  A literal value.
  */
  literal: yt,
  /**
  A string [literal](#highlight.tags.literal).
  */
  string: zn,
  /**
  A documentation [string](#highlight.tags.string).
  */
  docString: P(zn),
  /**
  A character literal (subtag of [string](#highlight.tags.string)).
  */
  character: P(zn),
  /**
  An attribute value (subtag of [string](#highlight.tags.string)).
  */
  attributeValue: P(zn),
  /**
  A number [literal](#highlight.tags.literal).
  */
  number: cs,
  /**
  An integer [number](#highlight.tags.number) literal.
  */
  integer: P(cs),
  /**
  A floating-point [number](#highlight.tags.number) literal.
  */
  float: P(cs),
  /**
  A boolean [literal](#highlight.tags.literal).
  */
  bool: P(yt),
  /**
  Regular expression [literal](#highlight.tags.literal).
  */
  regexp: P(yt),
  /**
  An escape [literal](#highlight.tags.literal), for example a
  backslash escape in a string.
  */
  escape: P(yt),
  /**
  A color [literal](#highlight.tags.literal).
  */
  color: P(yt),
  /**
  A URL [literal](#highlight.tags.literal).
  */
  url: P(yt),
  /**
  A language keyword.
  */
  keyword: Fe,
  /**
  The [keyword](#highlight.tags.keyword) for the self or this
  object.
  */
  self: P(Fe),
  /**
  The [keyword](#highlight.tags.keyword) for null.
  */
  null: P(Fe),
  /**
  A [keyword](#highlight.tags.keyword) denoting some atomic value.
  */
  atom: P(Fe),
  /**
  A [keyword](#highlight.tags.keyword) that represents a unit.
  */
  unit: P(Fe),
  /**
  A modifier [keyword](#highlight.tags.keyword).
  */
  modifier: P(Fe),
  /**
  A [keyword](#highlight.tags.keyword) that acts as an operator.
  */
  operatorKeyword: P(Fe),
  /**
  A control-flow related [keyword](#highlight.tags.keyword).
  */
  controlKeyword: P(Fe),
  /**
  A [keyword](#highlight.tags.keyword) that defines something.
  */
  definitionKeyword: P(Fe),
  /**
  A [keyword](#highlight.tags.keyword) related to defining or
  interfacing with modules.
  */
  moduleKeyword: P(Fe),
  /**
  An operator.
  */
  operator: He,
  /**
  An [operator](#highlight.tags.operator) that dereferences something.
  */
  derefOperator: P(He),
  /**
  Arithmetic-related [operator](#highlight.tags.operator).
  */
  arithmeticOperator: P(He),
  /**
  Logical [operator](#highlight.tags.operator).
  */
  logicOperator: P(He),
  /**
  Bit [operator](#highlight.tags.operator).
  */
  bitwiseOperator: P(He),
  /**
  Comparison [operator](#highlight.tags.operator).
  */
  compareOperator: P(He),
  /**
  [Operator](#highlight.tags.operator) that updates its operand.
  */
  updateOperator: P(He),
  /**
  [Operator](#highlight.tags.operator) that defines something.
  */
  definitionOperator: P(He),
  /**
  Type-related [operator](#highlight.tags.operator).
  */
  typeOperator: P(He),
  /**
  Control-flow [operator](#highlight.tags.operator).
  */
  controlOperator: P(He),
  /**
  Program or markup punctuation.
  */
  punctuation: mo,
  /**
  [Punctuation](#highlight.tags.punctuation) that separates
  things.
  */
  separator: P(mo),
  /**
  Bracket-style [punctuation](#highlight.tags.punctuation).
  */
  bracket: vi,
  /**
  Angle [brackets](#highlight.tags.bracket) (usually `<` and `>`
  tokens).
  */
  angleBracket: P(vi),
  /**
  Square [brackets](#highlight.tags.bracket) (usually `[` and `]`
  tokens).
  */
  squareBracket: P(vi),
  /**
  Parentheses (usually `(` and `)` tokens). Subtag of
  [bracket](#highlight.tags.bracket).
  */
  paren: P(vi),
  /**
  Braces (usually `{` and `}` tokens). Subtag of
  [bracket](#highlight.tags.bracket).
  */
  brace: P(vi),
  /**
  Content, for example plain text in XML or markup documents.
  */
  content: Ke,
  /**
  [Content](#highlight.tags.content) that represents a heading.
  */
  heading: zt,
  /**
  A level 1 [heading](#highlight.tags.heading).
  */
  heading1: P(zt),
  /**
  A level 2 [heading](#highlight.tags.heading).
  */
  heading2: P(zt),
  /**
  A level 3 [heading](#highlight.tags.heading).
  */
  heading3: P(zt),
  /**
  A level 4 [heading](#highlight.tags.heading).
  */
  heading4: P(zt),
  /**
  A level 5 [heading](#highlight.tags.heading).
  */
  heading5: P(zt),
  /**
  A level 6 [heading](#highlight.tags.heading).
  */
  heading6: P(zt),
  /**
  A prose [content](#highlight.tags.content) separator (such as a horizontal rule).
  */
  contentSeparator: P(Ke),
  /**
  [Content](#highlight.tags.content) that represents a list.
  */
  list: P(Ke),
  /**
  [Content](#highlight.tags.content) that represents a quote.
  */
  quote: P(Ke),
  /**
  [Content](#highlight.tags.content) that is emphasized.
  */
  emphasis: P(Ke),
  /**
  [Content](#highlight.tags.content) that is styled strong.
  */
  strong: P(Ke),
  /**
  [Content](#highlight.tags.content) that is part of a link.
  */
  link: P(Ke),
  /**
  [Content](#highlight.tags.content) that is styled as code or
  monospace.
  */
  monospace: P(Ke),
  /**
  [Content](#highlight.tags.content) that has a strike-through
  style.
  */
  strikethrough: P(Ke),
  /**
  Inserted text in a change-tracking format.
  */
  inserted: P(),
  /**
  Deleted text.
  */
  deleted: P(),
  /**
  Changed text.
  */
  changed: P(),
  /**
  An invalid or unsyntactic element.
  */
  invalid: P(),
  /**
  Metadata or meta-instruction.
  */
  meta: Yn,
  /**
  [Metadata](#highlight.tags.meta) that applies to the entire
  document.
  */
  documentMeta: P(Yn),
  /**
  [Metadata](#highlight.tags.meta) that annotates or adds
  attributes to a given syntactic element.
  */
  annotation: P(Yn),
  /**
  Processing instruction or preprocessor directive. Subtag of
  [meta](#highlight.tags.meta).
  */
  processingInstruction: P(Yn),
  /**
  [Modifier](#highlight.Tag^defineModifier) that indicates that a
  given element is being defined. Expected to be used with the
  various [name](#highlight.tags.name) tags.
  */
  definition: Re.defineModifier("definition"),
  /**
  [Modifier](#highlight.Tag^defineModifier) that indicates that
  something is constant. Mostly expected to be used with
  [variable names](#highlight.tags.variableName).
  */
  constant: Re.defineModifier("constant"),
  /**
  [Modifier](#highlight.Tag^defineModifier) used to indicate that
  a [variable](#highlight.tags.variableName) or [property
  name](#highlight.tags.propertyName) is being called or defined
  as a function.
  */
  function: Re.defineModifier("function"),
  /**
  [Modifier](#highlight.Tag^defineModifier) that can be applied to
  [names](#highlight.tags.name) to indicate that they belong to
  the language's standard environment.
  */
  standard: Re.defineModifier("standard"),
  /**
  [Modifier](#highlight.Tag^defineModifier) that indicates a given
  [names](#highlight.tags.name) is local to some scope.
  */
  local: Re.defineModifier("local"),
  /**
  A generic variant [modifier](#highlight.Tag^defineModifier) that
  can be used to tag language-specific alternative variants of
  some common tag. It is recommended for themes to define special
  forms of at least the [string](#highlight.tags.string) and
  [variable name](#highlight.tags.variableName) tags, since those
  come up a lot.
  */
  special: Re.defineModifier("special")
};
for (let n in p) {
  let e = p[n];
  e instanceof Re && (e.name = n);
}
Qf([
  { tag: p.link, class: "tok-link" },
  { tag: p.heading, class: "tok-heading" },
  { tag: p.emphasis, class: "tok-emphasis" },
  { tag: p.strong, class: "tok-strong" },
  { tag: p.keyword, class: "tok-keyword" },
  { tag: p.atom, class: "tok-atom" },
  { tag: p.bool, class: "tok-bool" },
  { tag: p.url, class: "tok-url" },
  { tag: p.labelName, class: "tok-labelName" },
  { tag: p.inserted, class: "tok-inserted" },
  { tag: p.deleted, class: "tok-deleted" },
  { tag: p.literal, class: "tok-literal" },
  { tag: p.string, class: "tok-string" },
  { tag: p.number, class: "tok-number" },
  { tag: [p.regexp, p.escape, p.special(p.string)], class: "tok-string2" },
  { tag: p.variableName, class: "tok-variableName" },
  { tag: p.local(p.variableName), class: "tok-variableName tok-local" },
  { tag: p.definition(p.variableName), class: "tok-variableName tok-definition" },
  { tag: p.special(p.variableName), class: "tok-variableName2" },
  { tag: p.definition(p.propertyName), class: "tok-propertyName tok-definition" },
  { tag: p.typeName, class: "tok-typeName" },
  { tag: p.namespace, class: "tok-namespace" },
  { tag: p.className, class: "tok-className" },
  { tag: p.macroName, class: "tok-macroName" },
  { tag: p.propertyName, class: "tok-propertyName" },
  { tag: p.operator, class: "tok-operator" },
  { tag: p.comment, class: "tok-comment" },
  { tag: p.meta, class: "tok-meta" },
  { tag: p.invalid, class: "tok-invalid" },
  { tag: p.punctuation, class: "tok-punctuation" }
]);
var fs;
const Jt = /* @__PURE__ */ new z();
function bf(n) {
  return T.define({
    combine: n ? (e) => e.concat(n) : void 0
  });
}
const Jo = /* @__PURE__ */ new z();
class Le {
  /**
  Construct a language object. If you need to invoke this
  directly, first define a data facet with
  [`defineLanguageFacet`](https://codemirror.net/6/docs/ref/#language.defineLanguageFacet), and then
  configure your parser to [attach](https://codemirror.net/6/docs/ref/#language.languageDataProp) it
  to the language's outer syntax node.
  */
  constructor(e, t, i = [], r = "") {
    this.data = e, this.name = r, _.prototype.hasOwnProperty("tree") || Object.defineProperty(_.prototype, "tree", { get() {
      return K(this);
    } }), this.parser = t, this.extension = [
      Zt.of(this),
      _.languageData.of((s, o, l) => {
        let a = za(s, o, l), h = a.type.prop(Jt);
        if (!h)
          return [];
        let c = s.facet(h), f = a.type.prop(Jo);
        if (f) {
          let u = a.resolve(o - a.from, l);
          for (let d of f)
            if (d.test(u, s)) {
              let O = s.facet(d.facet);
              return d.type == "replace" ? O : O.concat(c);
            }
        }
        return c;
      })
    ].concat(i);
  }
  /**
  Query whether this language is active at the given position.
  */
  isActiveAt(e, t, i = -1) {
    return za(e, t, i).type.prop(Jt) == this.data;
  }
  /**
  Find the document regions that were parsed using this language.
  The returned regions will _include_ any nested languages rooted
  in this language, when those exist.
  */
  findRegions(e) {
    let t = e.facet(Zt);
    if ((t == null ? void 0 : t.data) == this.data)
      return [{ from: 0, to: e.doc.length }];
    if (!t || !t.allowsNesting)
      return [];
    let i = [], r = (s, o) => {
      if (s.prop(Jt) == this.data) {
        i.push({ from: o, to: o + s.length });
        return;
      }
      let l = s.prop(z.mounted);
      if (l) {
        if (l.tree.prop(Jt) == this.data) {
          if (l.overlay)
            for (let a of l.overlay)
              i.push({ from: a.from + o, to: a.to + o });
          else
            i.push({ from: o, to: o + s.length });
          return;
        } else if (l.overlay) {
          let a = i.length;
          if (r(l.tree, l.overlay[0].from + o), i.length > a)
            return;
        }
      }
      for (let a = 0; a < s.children.length; a++) {
        let h = s.children[a];
        h instanceof H && r(h, s.positions[a] + o);
      }
    };
    return r(K(e), 0), i;
  }
  /**
  Indicates whether this language allows nested languages. The
  default implementation returns true.
  */
  get allowsNesting() {
    return !0;
  }
}
Le.setState = /* @__PURE__ */ M.define();
function za(n, e, t) {
  let i = n.facet(Zt), r = K(n).topNode;
  if (!i || i.allowsNesting)
    for (let s = r; s; s = s.enter(e, t, W.ExcludeBuffers | W.EnterBracketed))
      s.type.isTop && (r = s);
  return r;
}
class Oi extends Le {
  constructor(e, t, i) {
    super(e, t, [], i), this.parser = t;
  }
  /**
  Define a language from a parser.
  */
  static define(e) {
    let t = bf(e.languageData);
    return new Oi(t, e.parser.configure({
      props: [Jt.add((i) => i.isTop ? t : void 0)]
    }), e.name);
  }
  /**
  Create a new instance of this language with a reconfigured
  version of its parser and optionally a new name.
  */
  configure(e, t) {
    return new Oi(this.data, this.parser.configure(e), t || this.name);
  }
  get allowsNesting() {
    return this.parser.hasWrappers();
  }
}
function K(n) {
  let e = n.field(Le.state, !1);
  return e ? e.tree : H.empty;
}
class rg {
  /**
  Create an input object for the given document.
  */
  constructor(e) {
    this.doc = e, this.cursorPos = 0, this.string = "", this.cursor = e.iter();
  }
  get length() {
    return this.doc.length;
  }
  syncTo(e) {
    return this.string = this.cursor.next(e - this.cursorPos).value, this.cursorPos = e + this.string.length, this.cursorPos - this.string.length;
  }
  chunk(e) {
    return this.syncTo(e), this.string;
  }
  get lineChunks() {
    return !0;
  }
  read(e, t) {
    let i = this.cursorPos - this.string.length;
    return e < i || t >= this.cursorPos ? this.doc.sliceString(e, t) : this.string.slice(e - i, t - i);
  }
}
let Ti = null;
class Or {
  constructor(e, t, i = [], r, s, o, l, a) {
    this.parser = e, this.state = t, this.fragments = i, this.tree = r, this.treeLen = s, this.viewport = o, this.skipped = l, this.scheduleOn = a, this.parse = null, this.tempSkipped = [];
  }
  /**
  @internal
  */
  static create(e, t, i) {
    return new Or(e, t, [], H.empty, 0, i, [], null);
  }
  startParse() {
    return this.parser.startParse(new rg(this.state.doc), this.fragments);
  }
  /**
  @internal
  */
  work(e, t) {
    return t != null && t >= this.state.doc.length && (t = void 0), this.tree != H.empty && this.isDone(t ?? this.state.doc.length) ? (this.takeTree(), !0) : this.withContext(() => {
      var i;
      if (typeof e == "number") {
        let r = Date.now() + e;
        e = () => Date.now() > r;
      }
      for (this.parse || (this.parse = this.startParse()), t != null && (this.parse.stoppedAt == null || this.parse.stoppedAt > t) && t < this.state.doc.length && this.parse.stopAt(t); ; ) {
        let r = this.parse.advance();
        if (r)
          if (this.fragments = this.withoutTempSkipped(pt.addTree(r, this.fragments, this.parse.stoppedAt != null)), this.treeLen = (i = this.parse.stoppedAt) !== null && i !== void 0 ? i : this.state.doc.length, this.tree = r, this.parse = null, this.treeLen < (t ?? this.state.doc.length))
            this.parse = this.startParse();
          else
            return !0;
        if (e())
          return !1;
      }
    });
  }
  /**
  @internal
  */
  takeTree() {
    let e, t;
    this.parse && (e = this.parse.parsedPos) >= this.treeLen && ((this.parse.stoppedAt == null || this.parse.stoppedAt > e) && this.parse.stopAt(e), this.withContext(() => {
      for (; !(t = this.parse.advance()); )
        ;
    }), this.treeLen = e, this.tree = t, this.fragments = this.withoutTempSkipped(pt.addTree(this.tree, this.fragments, !0)), this.parse = null);
  }
  withContext(e) {
    let t = Ti;
    Ti = this;
    try {
      return e();
    } finally {
      Ti = t;
    }
  }
  withoutTempSkipped(e) {
    for (let t; t = this.tempSkipped.pop(); )
      e = Ya(e, t.from, t.to);
    return e;
  }
  /**
  @internal
  */
  changes(e, t) {
    let { fragments: i, tree: r, treeLen: s, viewport: o, skipped: l } = this;
    if (this.takeTree(), !e.empty) {
      let a = [];
      if (e.iterChangedRanges((h, c, f, u) => a.push({ fromA: h, toA: c, fromB: f, toB: u })), i = pt.applyChanges(i, a), r = H.empty, s = 0, o = { from: e.mapPos(o.from, -1), to: e.mapPos(o.to, 1) }, this.skipped.length) {
        l = [];
        for (let h of this.skipped) {
          let c = e.mapPos(h.from, 1), f = e.mapPos(h.to, -1);
          c < f && l.push({ from: c, to: f });
        }
      }
    }
    return new Or(this.parser, t, i, r, s, o, l, this.scheduleOn);
  }
  /**
  @internal
  */
  updateViewport(e) {
    if (this.viewport.from == e.from && this.viewport.to == e.to)
      return !1;
    this.viewport = e;
    let t = this.skipped.length;
    for (let i = 0; i < this.skipped.length; i++) {
      let { from: r, to: s } = this.skipped[i];
      r < e.to && s > e.from && (this.fragments = Ya(this.fragments, r, s), this.skipped.splice(i--, 1));
    }
    return this.skipped.length >= t ? !1 : (this.reset(), !0);
  }
  /**
  @internal
  */
  reset() {
    this.parse && (this.takeTree(), this.parse = null);
  }
  /**
  Notify the parse scheduler that the given region was skipped
  because it wasn't in view, and the parse should be restarted
  when it comes into view.
  */
  skipUntilInView(e, t) {
    this.skipped.push({ from: e, to: t });
  }
  /**
  Returns a parser intended to be used as placeholder when
  asynchronously loading a nested parser. It'll skip its input and
  mark it as not-really-parsed, so that the next update will parse
  it again.
  
  When `until` is given, a reparse will be scheduled when that
  promise resolves.
  */
  static getSkippingParser(e) {
    return new class extends mf {
      createParse(t, i, r) {
        let s = r[0].from, o = r[r.length - 1].to;
        return {
          parsedPos: s,
          advance() {
            let a = Ti;
            if (a) {
              for (let h of r)
                a.tempSkipped.push(h);
              e && (a.scheduleOn = a.scheduleOn ? Promise.all([a.scheduleOn, e]) : e);
            }
            return this.parsedPos = o, new H(Qe.none, [], [], o - s);
          },
          stoppedAt: null,
          stopAt() {
          }
        };
      }
    }();
  }
  /**
  @internal
  */
  isDone(e) {
    e = Math.min(e, this.state.doc.length);
    let t = this.fragments;
    return this.treeLen >= e && t.length && t[0].from == 0 && t[0].to >= e;
  }
  /**
  Get the context for the current parse, or `null` if no editor
  parse is in progress.
  */
  static get() {
    return Ti;
  }
}
function Ya(n, e, t) {
  return pt.applyChanges(n, [{ fromA: e, toA: t, fromB: e, toB: t }]);
}
class pi {
  constructor(e) {
    this.context = e, this.tree = e.tree;
  }
  apply(e) {
    if (!e.docChanged && this.tree == this.context.tree)
      return this;
    let t = this.context.changes(e.changes, e.state), i = this.context.treeLen == e.startState.doc.length ? void 0 : Math.max(e.changes.mapPos(this.context.treeLen), t.viewport.to);
    return t.work(20, i) || t.takeTree(), new pi(t);
  }
  static init(e) {
    let t = Math.min(3e3, e.doc.length), i = Or.create(e.facet(Zt).parser, e, { from: 0, to: t });
    return i.work(20, t) || i.takeTree(), new pi(i);
  }
}
Le.state = /* @__PURE__ */ oe.define({
  create: pi.init,
  update(n, e) {
    for (let t of e.effects)
      if (t.is(Le.setState))
        return t.value;
    return e.startState.facet(Zt) != e.state.facet(Zt) ? pi.init(e.state) : n.apply(e);
  }
});
let Sf = (n) => {
  let e = setTimeout(
    () => n(),
    500
    /* Work.MaxPause */
  );
  return () => clearTimeout(e);
};
typeof requestIdleCallback < "u" && (Sf = (n) => {
  let e = -1, t = setTimeout(
    () => {
      e = requestIdleCallback(n, {
        timeout: 400
        /* Work.MinPause */
      });
    },
    100
    /* Work.MinPause */
  );
  return () => e < 0 ? clearTimeout(t) : cancelIdleCallback(e);
});
const us = typeof navigator < "u" && (!((fs = navigator.scheduling) === null || fs === void 0) && fs.isInputPending) ? () => navigator.scheduling.isInputPending() : null, sg = /* @__PURE__ */ ee.fromClass(class {
  constructor(e) {
    this.view = e, this.working = null, this.workScheduled = 0, this.chunkEnd = -1, this.chunkBudget = -1, this.work = this.work.bind(this), this.scheduleWork();
  }
  update(e) {
    let t = this.view.state.field(Le.state).context;
    (t.updateViewport(e.view.viewport) || this.view.viewport.to > t.treeLen) && this.scheduleWork(), (e.docChanged || e.selectionSet) && (this.view.hasFocus && (this.chunkBudget += 50), this.scheduleWork()), this.checkAsyncSchedule(t);
  }
  scheduleWork() {
    if (this.working)
      return;
    let { state: e } = this.view, t = e.field(Le.state);
    (t.tree != t.context.tree || !t.context.isDone(e.doc.length)) && (this.working = Sf(this.work));
  }
  work(e) {
    this.working = null;
    let t = Date.now();
    if (this.chunkEnd < t && (this.chunkEnd < 0 || this.view.hasFocus) && (this.chunkEnd = t + 3e4, this.chunkBudget = 3e3), this.chunkBudget <= 0)
      return;
    let { state: i, viewport: { to: r } } = this.view, s = i.field(Le.state);
    if (s.tree == s.context.tree && s.context.isDone(
      r + 1e5
      /* Work.MaxParseAhead */
    ))
      return;
    let o = Date.now() + Math.min(this.chunkBudget, 100, e && !us ? Math.max(25, e.timeRemaining() - 5) : 1e9), l = s.context.treeLen < r && i.doc.length > r + 1e3, a = s.context.work(() => us && us() || Date.now() > o, r + (l ? 0 : 1e5));
    this.chunkBudget -= Date.now() - t, (a || this.chunkBudget <= 0) && (s.context.takeTree(), this.view.dispatch({ effects: Le.setState.of(new pi(s.context)) })), this.chunkBudget > 0 && !(a && !l) && this.scheduleWork(), this.checkAsyncSchedule(s.context);
  }
  checkAsyncSchedule(e) {
    e.scheduleOn && (this.workScheduled++, e.scheduleOn.then(() => this.scheduleWork()).catch((t) => we(this.view.state, t)).then(() => this.workScheduled--), e.scheduleOn = null);
  }
  destroy() {
    this.working && this.working();
  }
  isWorking() {
    return !!(this.working || this.workScheduled > 0);
  }
}, {
  eventHandlers: { focus() {
    this.scheduleWork();
  } }
}), Zt = /* @__PURE__ */ T.define({
  combine(n) {
    return n.length ? n[0] : null;
  },
  enables: (n) => [
    Le.state,
    sg,
    v.contentAttributes.compute([n], (e) => {
      let t = e.facet(n);
      return t && t.name ? { "data-language": t.name } : {};
    })
  ]
});
class el {
  /**
  Create a language support object.
  */
  constructor(e, t = []) {
    this.language = e, this.support = t, this.extension = [e, t];
  }
}
const og = /* @__PURE__ */ T.define(), dn = /* @__PURE__ */ T.define({
  combine: (n) => {
    if (!n.length)
      return "  ";
    let e = n[0];
    if (!e || /\S/.test(e) || Array.from(e).some((t) => t != e[0]))
      throw new Error("Invalid indent unit: " + JSON.stringify(n[0]));
    return e;
  }
});
function pr(n) {
  let e = n.facet(dn);
  return e.charCodeAt(0) == 9 ? n.tabSize * e.length : e.length;
}
function Ji(n, e) {
  let t = "", i = n.tabSize, r = n.facet(dn)[0];
  if (r == "	") {
    for (; e >= i; )
      t += "	", e -= i;
    r = " ";
  }
  for (let s = 0; s < e; s++)
    t += r;
  return t;
}
function tl(n, e) {
  n instanceof _ && (n = new _r(n));
  for (let i of n.state.facet(og)) {
    let r = i(n, e);
    if (r !== void 0)
      return r;
  }
  let t = K(n.state);
  return t.length >= e ? lg(n, t, e) : null;
}
class _r {
  /**
  Create an indent context.
  */
  constructor(e, t = {}) {
    this.state = e, this.options = t, this.unit = pr(e);
  }
  /**
  Get a description of the line at the given position, taking
  [simulated line
  breaks](https://codemirror.net/6/docs/ref/#language.IndentContext.constructor^options.simulateBreak)
  into account. If there is such a break at `pos`, the `bias`
  argument determines whether the part of the line line before or
  after the break is used.
  */
  lineAt(e, t = 1) {
    let i = this.state.doc.lineAt(e), { simulateBreak: r, simulateDoubleBreak: s } = this.options;
    return r != null && r >= i.from && r <= i.to ? s && r == e ? { text: "", from: e } : (t < 0 ? r < e : r <= e) ? { text: i.text.slice(r - i.from), from: r } : { text: i.text.slice(0, r - i.from), from: i.from } : i;
  }
  /**
  Get the text directly after `pos`, either the entire line
  or the next 100 characters, whichever is shorter.
  */
  textAfterPos(e, t = 1) {
    if (this.options.simulateDoubleBreak && e == this.options.simulateBreak)
      return "";
    let { text: i, from: r } = this.lineAt(e, t);
    return i.slice(e - r, Math.min(i.length, e + 100 - r));
  }
  /**
  Find the column for the given position.
  */
  column(e, t = 1) {
    let { text: i, from: r } = this.lineAt(e, t), s = this.countColumn(i, e - r), o = this.options.overrideIndentation ? this.options.overrideIndentation(r) : -1;
    return o > -1 && (s += o - this.countColumn(i, i.search(/\S|$/))), s;
  }
  /**
  Find the column position (taking tabs into account) of the given
  position in the given string.
  */
  countColumn(e, t = e.length) {
    return Si(e, this.state.tabSize, t);
  }
  /**
  Find the indentation column of the line at the given point.
  */
  lineIndent(e, t = 1) {
    let { text: i, from: r } = this.lineAt(e, t), s = this.options.overrideIndentation;
    if (s) {
      let o = s(r);
      if (o > -1)
        return o;
    }
    return this.countColumn(i, i.search(/\S|$/));
  }
  /**
  Returns the [simulated line
  break](https://codemirror.net/6/docs/ref/#language.IndentContext.constructor^options.simulateBreak)
  for this context, if any.
  */
  get simulatedBreak() {
    return this.options.simulateBreak || null;
  }
}
const Dr = /* @__PURE__ */ new z();
function lg(n, e, t) {
  let i = e.resolveStack(t), r = e.resolveInner(t, -1).resolve(t, 0).enterUnfinishedNodesBefore(t);
  if (r != i.node) {
    let s = [];
    for (let o = r; o && !(o.from < i.node.from || o.to > i.node.to || o.from == i.node.from && o.type == i.node.type); o = o.parent)
      s.push(o);
    for (let o = s.length - 1; o >= 0; o--)
      i = { node: s[o], next: i };
  }
  return yf(i, n, t);
}
function yf(n, e, t) {
  for (let i = n; i; i = i.next) {
    let r = hg(i.node);
    if (r)
      return r(il.create(e, t, i));
  }
  return 0;
}
function ag(n) {
  return n.pos == n.options.simulateBreak && n.options.simulateDoubleBreak;
}
function hg(n) {
  let e = n.type.prop(Dr);
  if (e)
    return e;
  let t = n.firstChild, i;
  if (t && (i = t.type.prop(z.closedBy))) {
    let r = n.lastChild, s = r && i.indexOf(r.name) > -1;
    return (o) => xf(o, !0, 1, void 0, s && !ag(o) ? r.from : void 0);
  }
  return n.parent == null ? cg : null;
}
function cg() {
  return 0;
}
class il extends _r {
  constructor(e, t, i) {
    super(e.state, e.options), this.base = e, this.pos = t, this.context = i;
  }
  /**
  The syntax tree node to which the indentation strategy
  applies.
  */
  get node() {
    return this.context.node;
  }
  /**
  @internal
  */
  static create(e, t, i) {
    return new il(e, t, i);
  }
  /**
  Get the text directly after `this.pos`, either the entire line
  or the next 100 characters, whichever is shorter.
  */
  get textAfter() {
    return this.textAfterPos(this.pos);
  }
  /**
  Get the indentation at the reference line for `this.node`, which
  is the line on which it starts, unless there is a node that is
  _not_ a parent of this node covering the start of that line. If
  so, the line at the start of that node is tried, again skipping
  on if it is covered by another such node.
  */
  get baseIndent() {
    return this.baseIndentFor(this.node);
  }
  /**
  Get the indentation for the reference line of the given node
  (see [`baseIndent`](https://codemirror.net/6/docs/ref/#language.TreeIndentContext.baseIndent)).
  */
  baseIndentFor(e) {
    let t = this.state.doc.lineAt(e.from);
    for (; ; ) {
      let i = e.resolve(t.from);
      for (; i.parent && i.parent.from == i.from; )
        i = i.parent;
      if (fg(i, e))
        break;
      t = this.state.doc.lineAt(i.from);
    }
    return this.lineIndent(t.from);
  }
  /**
  Continue looking for indentations in the node's parent nodes,
  and return the result of that.
  */
  continue() {
    return yf(this.context.next, this.base, this.pos);
  }
}
function fg(n, e) {
  for (let t = e; t; t = t.parent)
    if (n == t)
      return !0;
  return !1;
}
function ug(n) {
  let e = n.node, t = e.childAfter(e.from), i = e.lastChild;
  if (!t)
    return null;
  let r = n.options.simulateBreak, s = n.state.doc.lineAt(t.from), o = r == null || r <= s.from ? s.to : Math.min(s.to, r);
  for (let l = t.to; ; ) {
    let a = e.childAfter(l);
    if (!a || a == i)
      return null;
    if (!a.type.isSkipped) {
      if (a.from >= o)
        return null;
      let h = /^ */.exec(s.text.slice(t.to - s.from))[0].length;
      return { from: t.from, to: t.to + h };
    }
    l = a.to;
  }
}
function dg({ closing: n, align: e = !0, units: t = 1 }) {
  return (i) => xf(i, e, t, n);
}
function xf(n, e, t, i, r) {
  let s = n.textAfter, o = s.match(/^\s*/)[0].length, l = i && s.slice(o, o + i.length) == i || r == n.pos + o, a = e ? ug(n) : null;
  return a ? l ? n.column(a.from) : n.column(a.to) : n.baseIndent + (l ? 0 : n.unit * t);
}
const Og = (n) => n.baseIndent;
function Fn({ except: n, units: e = 1 } = {}) {
  return (t) => {
    let i = n && n.test(t.textAfter);
    return t.baseIndent + (i ? 0 : e * t.unit);
  };
}
const pg = 200;
function mg() {
  return _.transactionFilter.of((n) => {
    if (!n.docChanged || !n.isUserEvent("input.type") && !n.isUserEvent("input.complete"))
      return n;
    let e = n.startState.languageDataAt("indentOnInput", n.startState.selection.main.head);
    if (!e.length)
      return n;
    let t = n.newDoc, { head: i } = n.newSelection.main, r = t.lineAt(i);
    if (i > r.from + pg)
      return n;
    let s = t.sliceString(r.from, i);
    if (!e.some((h) => h.test(s)))
      return n;
    let { state: o } = n, l = -1, a = [];
    for (let { head: h } of o.selection.ranges) {
      let c = o.doc.lineAt(h);
      if (c.from == l)
        continue;
      l = c.from;
      let f = tl(o, c.from);
      if (f == null)
        continue;
      let u = /^\s*/.exec(c.text)[0], d = Ji(o, f);
      u != d && a.push({ from: c.from, to: c.from + u.length, insert: d });
    }
    return a.length ? [n, { changes: a, sequential: !0 }] : n;
  });
}
const gg = /* @__PURE__ */ T.define(), qr = /* @__PURE__ */ new z();
function wf(n) {
  let e = n.firstChild, t = n.lastChild;
  return e && e.to < t.from ? { from: e.to, to: t.type.isError ? n.to : t.from } : null;
}
function Qg(n, e, t) {
  let i = K(n);
  if (i.length < t)
    return null;
  let r = i.resolveStack(t, 1), s = null;
  for (let o = r; o; o = o.next) {
    let l = o.node;
    if (l.to <= t || l.from > t)
      continue;
    if (s && l.from < e)
      break;
    let a = l.type.prop(qr);
    if (a && (l.to < i.length - 50 || i.length == n.doc.length || !bg(l))) {
      let h = a(l, n);
      h && h.from <= t && h.from >= e && h.to > t && (s = h);
    }
  }
  return s;
}
function bg(n) {
  let e = n.lastChild;
  return e && e.to == n.to && e.type.isError;
}
function mr(n, e, t) {
  for (let i of n.facet(gg)) {
    let r = i(n, e, t);
    if (r)
      return r;
  }
  return Qg(n, e, t);
}
function kf(n, e) {
  let t = e.mapPos(n.from, 1), i = e.mapPos(n.to, -1);
  return t >= i ? void 0 : { from: t, to: i };
}
const Wr = /* @__PURE__ */ M.define({ map: kf }), On = /* @__PURE__ */ M.define({ map: kf });
function $f(n) {
  let e = [];
  for (let { head: t } of n.state.selection.ranges)
    e.some((i) => i.from <= t && i.to >= t) || e.push(n.lineBlockAt(t));
  return e;
}
const jt = /* @__PURE__ */ oe.define({
  create() {
    return Z.none;
  },
  update(n, e) {
    e.isUserEvent("delete") && e.changes.iterChangedRanges((t, i) => n = Va(n, t, i)), n = n.map(e.changes);
    for (let t of e.effects)
      if (t.is(Wr) && !Sg(n, t.value.from, t.value.to)) {
        let { preparePlaceholder: i } = e.state.facet(Tf), r = i ? Z.replace({ widget: new vg(i(e.state, t.value)) }) : Ea;
        n = n.update({ add: [r.range(t.value.from, t.value.to)] });
      } else t.is(On) && (n = n.update({
        filter: (i, r) => t.value.from != i || t.value.to != r,
        filterFrom: t.value.from,
        filterTo: t.value.to
      }));
    return e.selection && (n = Va(n, e.selection.main.head)), n;
  },
  provide: (n) => v.decorations.from(n),
  toJSON(n, e) {
    let t = [];
    return n.between(0, e.doc.length, (i, r) => {
      t.push(i, r);
    }), t;
  },
  fromJSON(n) {
    if (!Array.isArray(n) || n.length % 2)
      throw new RangeError("Invalid JSON for fold state");
    let e = [];
    for (let t = 0; t < n.length; ) {
      let i = n[t++], r = n[t++];
      if (typeof i != "number" || typeof r != "number")
        throw new RangeError("Invalid JSON for fold state");
      e.push(Ea.range(i, r));
    }
    return Z.set(e, !0);
  }
});
function Va(n, e, t = e) {
  let i = !1;
  return n.between(e, t, (r, s) => {
    r < t && s > e && (i = !0);
  }), i ? n.update({
    filterFrom: e,
    filterTo: t,
    filter: (r, s) => r >= t || s <= e
  }) : n;
}
function gr(n, e, t) {
  var i;
  let r = null;
  return (i = n.field(jt, !1)) === null || i === void 0 || i.between(e, t, (s, o) => {
    (!r || r.from > s) && (r = { from: s, to: o });
  }), r;
}
function Sg(n, e, t) {
  let i = !1;
  return n.between(e, e, (r, s) => {
    r == e && s == t && (i = !0);
  }), i;
}
function Pf(n, e) {
  return n.field(jt, !1) ? e : e.concat(M.appendConfig.of(Cf()));
}
const yg = (n) => {
  for (let e of $f(n)) {
    let t = mr(n.state, e.from, e.to);
    if (t)
      return n.dispatch({ effects: Pf(n.state, [Wr.of(t), vf(n, t)]) }), !0;
  }
  return !1;
}, xg = (n) => {
  if (!n.state.field(jt, !1))
    return !1;
  let e = [];
  for (let t of $f(n)) {
    let i = gr(n.state, t.from, t.to);
    i && e.push(On.of(i), vf(n, i, !1));
  }
  return e.length && n.dispatch({ effects: e }), e.length > 0;
};
function vf(n, e, t = !0) {
  let i = n.state.doc.lineAt(e.from).number, r = n.state.doc.lineAt(e.to).number;
  return v.announce.of(`${n.state.phrase(t ? "Folded lines" : "Unfolded lines")} ${i} ${n.state.phrase("to")} ${r}.`);
}
const wg = (n) => {
  let { state: e } = n, t = [];
  for (let i = 0; i < e.doc.length; ) {
    let r = n.lineBlockAt(i), s = mr(e, r.from, r.to);
    s && t.push(Wr.of(s)), i = (s ? n.lineBlockAt(s.to) : r).to + 1;
  }
  return t.length && n.dispatch({ effects: Pf(n.state, t) }), !!t.length;
}, kg = (n) => {
  let e = n.state.field(jt, !1);
  if (!e || !e.size)
    return !1;
  let t = [];
  return e.between(0, n.state.doc.length, (i, r) => {
    t.push(On.of({ from: i, to: r }));
  }), n.dispatch({ effects: t }), !0;
}, $g = [
  { key: "Ctrl-Shift-[", mac: "Cmd-Alt-[", run: yg },
  { key: "Ctrl-Shift-]", mac: "Cmd-Alt-]", run: xg },
  { key: "Ctrl-Alt-[", run: wg },
  { key: "Ctrl-Alt-]", run: kg }
], Pg = {
  placeholderDOM: null,
  preparePlaceholder: null,
  placeholderText: "…"
}, Tf = /* @__PURE__ */ T.define({
  combine(n) {
    return at(n, Pg);
  }
});
function Cf(n) {
  return [jt, Zg];
}
function Zf(n, e) {
  let { state: t } = n, i = t.facet(Tf), r = (o) => {
    let l = n.lineBlockAt(n.posAtDOM(o.target)), a = gr(n.state, l.from, l.to);
    a && n.dispatch({ effects: On.of(a) }), o.preventDefault();
  };
  if (i.placeholderDOM)
    return i.placeholderDOM(n, r, e);
  let s = document.createElement("span");
  return s.textContent = i.placeholderText, s.setAttribute("aria-label", t.phrase("folded code")), s.title = t.phrase("unfold"), s.className = "cm-foldPlaceholder", s.onclick = r, s;
}
const Ea = /* @__PURE__ */ Z.replace({ widget: /* @__PURE__ */ new class extends ht {
  toDOM(n) {
    return Zf(n, null);
  }
}() });
class vg extends ht {
  constructor(e) {
    super(), this.value = e;
  }
  eq(e) {
    return this.value == e.value;
  }
  toDOM(e) {
    return Zf(e, this.value);
  }
}
const Tg = {
  openText: "⌄",
  closedText: "›",
  markerDOM: null,
  domEventHandlers: {},
  foldingChanged: () => !1
};
class ds extends Qt {
  constructor(e, t) {
    super(), this.config = e, this.open = t;
  }
  eq(e) {
    return this.config == e.config && this.open == e.open;
  }
  toDOM(e) {
    if (this.config.markerDOM)
      return this.config.markerDOM(this.open);
    let t = document.createElement("span");
    return t.textContent = this.open ? this.config.openText : this.config.closedText, t.title = e.state.phrase(this.open ? "Fold line" : "Unfold line"), t;
  }
}
function Cg(n = {}) {
  let e = { ...Tg, ...n }, t = new ds(e, !0), i = new ds(e, !1), r = ee.fromClass(class {
    constructor(o) {
      this.from = o.viewport.from, this.markers = this.buildMarkers(o);
    }
    update(o) {
      (o.docChanged || o.viewportChanged || o.startState.facet(Zt) != o.state.facet(Zt) || o.startState.field(jt, !1) != o.state.field(jt, !1) || K(o.startState) != K(o.state) || e.foldingChanged(o)) && (this.markers = this.buildMarkers(o.view));
    }
    buildMarkers(o) {
      let l = new mt();
      for (let a of o.viewportLineBlocks) {
        let h = gr(o.state, a.from, a.to) ? i : mr(o.state, a.from, a.to) ? t : null;
        h && l.add(a.from, a.from, h);
      }
      return l.finish();
    }
  }), { domEventHandlers: s } = e;
  return [
    r,
    $m({
      class: "cm-foldGutter",
      markers(o) {
        var l;
        return ((l = o.plugin(r)) === null || l === void 0 ? void 0 : l.markers) || E.empty;
      },
      initialSpacer() {
        return new ds(e, !1);
      },
      domEventHandlers: {
        ...s,
        click: (o, l, a) => {
          if (s.click && s.click(o, l, a))
            return !0;
          let h = gr(o.state, l.from, l.to);
          if (h)
            return o.dispatch({ effects: On.of(h) }), !0;
          let c = mr(o.state, l.from, l.to);
          return c ? (o.dispatch({ effects: Wr.of(c) }), !0) : !1;
        }
      }
    }),
    Cf()
  ];
}
const Zg = /* @__PURE__ */ v.baseTheme({
  ".cm-foldPlaceholder": {
    backgroundColor: "#eee",
    border: "1px solid #ddd",
    color: "#888",
    borderRadius: ".2em",
    margin: "0 1px",
    padding: "0 1px",
    cursor: "pointer"
  },
  ".cm-foldGutter span": {
    padding: "0 1px",
    cursor: "pointer"
  }
});
class yi {
  constructor(e, t) {
    this.specs = e;
    let i;
    function r(l) {
      let a = Pt.newName();
      return (i || (i = /* @__PURE__ */ Object.create(null)))["." + a] = l, a;
    }
    const s = typeof t.all == "string" ? t.all : t.all ? r(t.all) : void 0, o = t.scope;
    this.scope = o instanceof Le ? (l) => l.prop(Jt) == o.data : o ? (l) => l == o : void 0, this.style = Qf(e.map((l) => ({
      tag: l.tag,
      class: l.class || r(Object.assign({}, l, { tag: null }))
    })), {
      all: s
    }).style, this.module = i ? new Pt(i) : null, this.themeType = t.themeType;
  }
  /**
  Create a highlighter style that associates the given styles to
  the given tags. The specs must be objects that hold a style tag
  or array of tags in their `tag` property, and either a single
  `class` property providing a static CSS class (for highlighter
  that rely on external styling), or a
  [`style-mod`](https://github.com/marijnh/style-mod#documentation)-style
  set of CSS properties (which define the styling for those tags).
  
  The CSS rules created for a highlighter will be emitted in the
  order of the spec's properties. That means that for elements that
  have multiple tags associated with them, styles defined further
  down in the list will have a higher CSS precedence than styles
  defined earlier.
  */
  static define(e, t) {
    return new yi(e, t || {});
  }
}
const go = /* @__PURE__ */ T.define(), Xf = /* @__PURE__ */ T.define({
  combine(n) {
    return n.length ? [n[0]] : null;
  }
});
function Os(n) {
  let e = n.facet(go);
  return e.length ? e : n.facet(Xf);
}
function Qo(n, e) {
  let t = [Ag], i;
  return n instanceof yi && (n.module && t.push(v.styleModule.of(n.module)), i = n.themeType), e != null && e.fallback ? t.push(Xf.of(n)) : i ? t.push(go.computeN([v.darkTheme], (r) => r.facet(v.darkTheme) == (i == "dark") ? [n] : [])) : t.push(go.of(n)), t;
}
class Xg {
  constructor(e) {
    this.markCache = /* @__PURE__ */ Object.create(null), this.tree = K(e.state), this.decorations = this.buildDeco(e, Os(e.state)), this.decoratedTo = e.viewport.to;
  }
  update(e) {
    let t = K(e.state), i = Os(e.state), r = i != Os(e.startState), { viewport: s } = e.view, o = e.changes.mapPos(this.decoratedTo, 1);
    t.length < s.to && !r && t.type == this.tree.type && o >= s.to ? (this.decorations = this.decorations.map(e.changes), this.decoratedTo = o) : (t != this.tree || e.viewportChanged || r) && (this.tree = t, this.decorations = this.buildDeco(e.view, i), this.decoratedTo = s.to);
  }
  buildDeco(e, t) {
    if (!t || !this.tree.length)
      return Z.none;
    let i = new mt();
    for (let { from: r, to: s } of e.visibleRanges)
      tg(this.tree, t, (o, l, a) => {
        i.add(o, l, this.markCache[a] || (this.markCache[a] = Z.mark({ class: a })));
      }, r, s);
    return i.finish();
  }
}
const Ag = /* @__PURE__ */ At.high(/* @__PURE__ */ ee.fromClass(Xg, {
  decorations: (n) => n.decorations
})), Mg = /* @__PURE__ */ yi.define([
  {
    tag: p.meta,
    color: "#404740"
  },
  {
    tag: p.link,
    textDecoration: "underline"
  },
  {
    tag: p.heading,
    textDecoration: "underline",
    fontWeight: "bold"
  },
  {
    tag: p.emphasis,
    fontStyle: "italic"
  },
  {
    tag: p.strong,
    fontWeight: "bold"
  },
  {
    tag: p.strikethrough,
    textDecoration: "line-through"
  },
  {
    tag: p.keyword,
    color: "#708"
  },
  {
    tag: [p.atom, p.bool, p.url, p.contentSeparator, p.labelName],
    color: "#219"
  },
  {
    tag: [p.literal, p.inserted],
    color: "#164"
  },
  {
    tag: [p.string, p.deleted],
    color: "#a11"
  },
  {
    tag: [p.regexp, p.escape, /* @__PURE__ */ p.special(p.string)],
    color: "#e40"
  },
  {
    tag: /* @__PURE__ */ p.definition(p.variableName),
    color: "#00f"
  },
  {
    tag: /* @__PURE__ */ p.local(p.variableName),
    color: "#30a"
  },
  {
    tag: [p.typeName, p.namespace],
    color: "#085"
  },
  {
    tag: p.className,
    color: "#167"
  },
  {
    tag: [/* @__PURE__ */ p.special(p.variableName), p.macroName],
    color: "#256"
  },
  {
    tag: /* @__PURE__ */ p.definition(p.propertyName),
    color: "#00c"
  },
  {
    tag: p.comment,
    color: "#940"
  },
  {
    tag: p.invalid,
    color: "#f00"
  }
]), Rg = /* @__PURE__ */ v.baseTheme({
  "&.cm-focused .cm-matchingBracket": { backgroundColor: "#328c8252" },
  "&.cm-focused .cm-nonmatchingBracket": { backgroundColor: "#bb555544" }
}), Af = 1e4, Mf = "()[]{}", Rf = /* @__PURE__ */ T.define({
  combine(n) {
    return at(n, {
      afterCursor: !0,
      brackets: Mf,
      maxScanDistance: Af,
      renderMatch: Vg
    });
  }
}), zg = /* @__PURE__ */ Z.mark({ class: "cm-matchingBracket" }), Yg = /* @__PURE__ */ Z.mark({ class: "cm-nonmatchingBracket" });
function Vg(n) {
  let e = [], t = n.matched ? zg : Yg;
  return e.push(t.range(n.start.from, n.start.to)), n.end && e.push(t.range(n.end.from, n.end.to)), e;
}
const Eg = /* @__PURE__ */ oe.define({
  create() {
    return Z.none;
  },
  update(n, e) {
    if (!e.docChanged && !e.selection)
      return n;
    let t = [], i = e.state.facet(Rf);
    for (let r of e.state.selection.ranges) {
      if (!r.empty)
        continue;
      let s = rt(e.state, r.head, -1, i) || r.head > 0 && rt(e.state, r.head - 1, 1, i) || i.afterCursor && (rt(e.state, r.head, 1, i) || r.head < e.state.doc.length && rt(e.state, r.head + 1, -1, i));
      s && (t = t.concat(i.renderMatch(s, e.state)));
    }
    return Z.set(t, !0);
  },
  provide: (n) => v.decorations.from(n)
}), _g = [
  Eg,
  Rg
];
function Dg(n = {}) {
  return [Rf.of(n), _g];
}
const zf = /* @__PURE__ */ new z();
function bo(n, e, t) {
  let i = n.prop(e < 0 ? z.openedBy : z.closedBy);
  if (i)
    return i;
  if (n.name.length == 1) {
    let r = t.indexOf(n.name);
    if (r > -1 && r % 2 == (e < 0 ? 1 : 0))
      return [t[r + e]];
  }
  return null;
}
function So(n) {
  let e = n.type.prop(zf);
  return e ? e(n.node) : n;
}
function rt(n, e, t, i = {}) {
  let r = i.maxScanDistance || Af, s = i.brackets || Mf, o = K(n), l = o.resolveInner(e, t);
  for (let a = l; a; a = a.parent) {
    let h = bo(a.type, t, s);
    if (h && a.from < a.to) {
      let c = So(a);
      if (c && (t > 0 ? e >= c.from && e < c.to : e > c.from && e <= c.to))
        return qg(n, e, t, a, c, h, s);
    }
  }
  return Wg(n, e, t, o, l.type, r, s);
}
function qg(n, e, t, i, r, s, o) {
  let l = i.parent, a = { from: r.from, to: r.to }, h = 0, c = l == null ? void 0 : l.cursor();
  if (c && (t < 0 ? c.childBefore(i.from) : c.childAfter(i.to)))
    do
      if (t < 0 ? c.to <= i.from : c.from >= i.to) {
        if (h == 0 && s.indexOf(c.type.name) > -1 && c.from < c.to) {
          let f = So(c);
          return { start: a, end: f ? { from: f.from, to: f.to } : void 0, matched: !0 };
        } else if (bo(c.type, t, o))
          h++;
        else if (bo(c.type, -t, o)) {
          if (h == 0) {
            let f = So(c);
            return {
              start: a,
              end: f && f.from < f.to ? { from: f.from, to: f.to } : void 0,
              matched: !1
            };
          }
          h--;
        }
      }
    while (t < 0 ? c.prevSibling() : c.nextSibling());
  return { start: a, matched: !1 };
}
function Wg(n, e, t, i, r, s, o) {
  let l = t < 0 ? n.sliceDoc(e - 1, e) : n.sliceDoc(e, e + 1), a = o.indexOf(l);
  if (a < 0 || a % 2 == 0 != t > 0)
    return null;
  let h = { from: t < 0 ? e - 1 : e, to: t > 0 ? e + 1 : e }, c = n.doc.iterRange(e, t > 0 ? n.doc.length : 0), f = 0;
  for (let u = 0; !c.next().done && u <= s; ) {
    let d = c.value;
    t < 0 && (u += d.length);
    let O = e + u * t;
    for (let m = t > 0 ? 0 : d.length - 1, g = t > 0 ? d.length : -1; m != g; m += t) {
      let Q = o.indexOf(d[m]);
      if (!(Q < 0 || i.resolveInner(O + m, 1).type != r))
        if (Q % 2 == 0 == t > 0)
          f++;
        else {
          if (f == 1)
            return { start: h, end: { from: O + m, to: O + m + 1 }, matched: Q >> 1 == a >> 1 };
          f--;
        }
    }
    t > 0 && (u += d.length);
  }
  return c.done ? { start: h, matched: !1 } : null;
}
const Lg = /* @__PURE__ */ Object.create(null), _a = [Qe.none], Da = [], qa = /* @__PURE__ */ Object.create(null), Bg = /* @__PURE__ */ Object.create(null);
for (let [n, e] of [
  ["variable", "variableName"],
  ["variable-2", "variableName.special"],
  ["string-2", "string.special"],
  ["def", "variableName.definition"],
  ["tag", "tagName"],
  ["attribute", "attributeName"],
  ["type", "typeName"],
  ["builtin", "variableName.standard"],
  ["qualifier", "modifier"],
  ["error", "invalid"],
  ["header", "heading"],
  ["property", "propertyName"]
])
  Bg[n] = /* @__PURE__ */ Ig(Lg, e);
function ps(n, e) {
  Da.indexOf(n) > -1 || (Da.push(n), console.warn(e));
}
function Ig(n, e) {
  let t = [];
  for (let l of e.split(" ")) {
    let a = [];
    for (let h of l.split(".")) {
      let c = n[h] || p[h];
      c ? typeof c == "function" ? a.length ? a = a.map(c) : ps(h, `Modifier ${h} used at start of tag`) : a.length ? ps(h, `Tag ${h} used as modifier`) : a = Array.isArray(c) ? c : [c] : ps(h, `Unknown highlighting tag ${h}`);
    }
    for (let h of a)
      t.push(h);
  }
  if (!t.length)
    return 0;
  let i = e.replace(/ /g, "_"), r = i + " " + t.map((l) => l.id), s = qa[r];
  if (s)
    return s.id;
  let o = qa[r] = Qe.define({
    id: _a.length,
    name: i,
    props: [Er({ [i]: t })]
  });
  return _a.push(o), o.id;
}
N.RTL, N.LTR;
const jg = (n) => {
  let { state: e } = n, t = e.doc.lineAt(e.selection.main.from), i = rl(n.state, t.from);
  return i.line ? Ng(n) : i.block ? Ug(n) : !1;
};
function nl(n, e) {
  return ({ state: t, dispatch: i }) => {
    if (t.readOnly)
      return !1;
    let r = n(e, t);
    return r ? (i(t.update(r)), !0) : !1;
  };
}
const Ng = /* @__PURE__ */ nl(
  Kg,
  0
  /* CommentOption.Toggle */
), Gg = /* @__PURE__ */ nl(
  Yf,
  0
  /* CommentOption.Toggle */
), Ug = /* @__PURE__ */ nl(
  (n, e) => Yf(n, e, Hg(e)),
  0
  /* CommentOption.Toggle */
);
function rl(n, e) {
  let t = n.languageDataAt("commentTokens", e, 1);
  return t.length ? t[0] : {};
}
const Ci = 50;
function Fg(n, { open: e, close: t }, i, r) {
  let s = n.sliceDoc(i - Ci, i), o = n.sliceDoc(r, r + Ci), l = /\s*$/.exec(s)[0].length, a = /^\s*/.exec(o)[0].length, h = s.length - l;
  if (s.slice(h - e.length, h) == e && o.slice(a, a + t.length) == t)
    return {
      open: { pos: i - l, margin: l && 1 },
      close: { pos: r + a, margin: a && 1 }
    };
  let c, f;
  r - i <= 2 * Ci ? c = f = n.sliceDoc(i, r) : (c = n.sliceDoc(i, i + Ci), f = n.sliceDoc(r - Ci, r));
  let u = /^\s*/.exec(c)[0].length, d = /\s*$/.exec(f)[0].length, O = f.length - d - t.length;
  return c.slice(u, u + e.length) == e && f.slice(O, O + t.length) == t ? {
    open: {
      pos: i + u + e.length,
      margin: /\s/.test(c.charAt(u + e.length)) ? 1 : 0
    },
    close: {
      pos: r - d - t.length,
      margin: /\s/.test(f.charAt(O - 1)) ? 1 : 0
    }
  } : null;
}
function Hg(n) {
  let e = [];
  for (let t of n.selection.ranges) {
    let i = n.doc.lineAt(t.from), r = t.to <= i.to ? i : n.doc.lineAt(t.to);
    r.from > i.from && r.from == t.to && (r = t.to == i.to + 1 ? i : n.doc.lineAt(t.to - 1));
    let s = e.length - 1;
    s >= 0 && e[s].to > i.from ? e[s].to = r.to : e.push({ from: i.from + /^\s*/.exec(i.text)[0].length, to: r.to });
  }
  return e;
}
function Yf(n, e, t = e.selection.ranges) {
  let i = t.map((s) => rl(e, s.from).block);
  if (!i.every((s) => s))
    return null;
  let r = t.map((s, o) => Fg(e, i[o], s.from, s.to));
  if (n != 2 && !r.every((s) => s))
    return { changes: e.changes(t.map((s, o) => r[o] ? [] : [{ from: s.from, insert: i[o].open + " " }, { from: s.to, insert: " " + i[o].close }])) };
  if (n != 1 && r.some((s) => s)) {
    let s = [];
    for (let o = 0, l; o < r.length; o++)
      if (l = r[o]) {
        let a = i[o], { open: h, close: c } = l;
        s.push({ from: h.pos - a.open.length, to: h.pos + h.margin }, { from: c.pos - c.margin, to: c.pos + a.close.length });
      }
    return { changes: s };
  }
  return null;
}
function Kg(n, e, t = e.selection.ranges) {
  let i = [], r = -1;
  e: for (let { from: s, to: o } of t) {
    let l = i.length, a = 1e9, h;
    for (let c = s; c <= o; ) {
      let f = e.doc.lineAt(c);
      if (h == null && (h = rl(e, f.from).line, !h))
        continue e;
      if (f.from > r && (s == o || o > f.from)) {
        r = f.from;
        let u = /^\s*/.exec(f.text)[0].length, d = u == f.length, O = f.text.slice(u, u + h.length) == h ? u : -1;
        u < f.text.length && u < a && (a = u), i.push({ line: f, comment: O, token: h, indent: u, empty: d, single: !1 });
      }
      c = f.to + 1;
    }
    if (a < 1e9)
      for (let c = l; c < i.length; c++)
        i[c].indent < i[c].line.text.length && (i[c].indent = a);
    i.length == l + 1 && (i[l].single = !0);
  }
  if (n != 2 && i.some((s) => s.comment < 0 && (!s.empty || s.single))) {
    let s = [];
    for (let { line: l, token: a, indent: h, empty: c, single: f } of i)
      (f || !c) && s.push({ from: l.from + h, insert: a + " " });
    let o = e.changes(s);
    return { changes: o, selection: e.selection.map(o, 1) };
  } else if (n != 1 && i.some((s) => s.comment >= 0)) {
    let s = [];
    for (let { line: o, comment: l, token: a } of i)
      if (l >= 0) {
        let h = o.from + l, c = h + a.length;
        o.text[c - o.from] == " " && c++, s.push({ from: h, to: c });
      }
    return { changes: s };
  }
  return null;
}
const yo = /* @__PURE__ */ bt.define(), Jg = /* @__PURE__ */ bt.define(), e0 = /* @__PURE__ */ T.define(), Vf = /* @__PURE__ */ T.define({
  combine(n) {
    return at(n, {
      minDepth: 100,
      newGroupDelay: 500,
      joinToEvent: (e, t) => t
    }, {
      minDepth: Math.max,
      newGroupDelay: Math.min,
      joinToEvent: (e, t) => (i, r) => e(i, r) || t(i, r)
    });
  }
}), Ef = /* @__PURE__ */ oe.define({
  create() {
    return st.empty;
  },
  update(n, e) {
    let t = e.state.facet(Vf), i = e.annotation(yo);
    if (i) {
      let a = ke.fromTransaction(e, i.selection), h = i.side, c = h == 0 ? n.undone : n.done;
      return a ? c = Qr(c, c.length, t.minDepth, a) : c = qf(c, e.startState.selection), new st(h == 0 ? i.rest : c, h == 0 ? c : i.rest);
    }
    let r = e.annotation(Jg);
    if ((r == "full" || r == "before") && (n = n.isolate()), e.annotation(te.addToHistory) === !1)
      return e.changes.empty ? n : n.addMapping(e.changes.desc);
    let s = ke.fromTransaction(e), o = e.annotation(te.time), l = e.annotation(te.userEvent);
    return s ? n = n.addChanges(s, o, l, t, e) : e.selection && (n = n.addSelection(e.startState.selection, o, l, t.newGroupDelay)), (r == "full" || r == "after") && (n = n.isolate()), n;
  },
  toJSON(n) {
    return { done: n.done.map((e) => e.toJSON()), undone: n.undone.map((e) => e.toJSON()) };
  },
  fromJSON(n) {
    return new st(n.done.map(ke.fromJSON), n.undone.map(ke.fromJSON));
  }
});
function t0(n = {}) {
  return [
    Ef,
    Vf.of(n),
    v.domEventHandlers({
      beforeinput(e, t) {
        let i = e.inputType == "historyUndo" ? _f : e.inputType == "historyRedo" ? xo : null;
        return i ? (e.preventDefault(), i(t)) : !1;
      }
    })
  ];
}
function Lr(n, e) {
  return function({ state: t, dispatch: i }) {
    if (!e && t.readOnly)
      return !1;
    let r = t.field(Ef, !1);
    if (!r)
      return !1;
    let s = r.pop(n, t, e);
    return s ? (i(s), !0) : !1;
  };
}
const _f = /* @__PURE__ */ Lr(0, !1), xo = /* @__PURE__ */ Lr(1, !1), i0 = /* @__PURE__ */ Lr(0, !0), n0 = /* @__PURE__ */ Lr(1, !0);
class ke {
  constructor(e, t, i, r, s) {
    this.changes = e, this.effects = t, this.mapped = i, this.startSelection = r, this.selectionsAfter = s;
  }
  setSelAfter(e) {
    return new ke(this.changes, this.effects, this.mapped, this.startSelection, e);
  }
  toJSON() {
    var e, t, i;
    return {
      changes: (e = this.changes) === null || e === void 0 ? void 0 : e.toJSON(),
      mapped: (t = this.mapped) === null || t === void 0 ? void 0 : t.toJSON(),
      startSelection: (i = this.startSelection) === null || i === void 0 ? void 0 : i.toJSON(),
      selectionsAfter: this.selectionsAfter.map((r) => r.toJSON())
    };
  }
  static fromJSON(e) {
    return new ke(e.changes && ne.fromJSON(e.changes), [], e.mapped && ot.fromJSON(e.mapped), e.startSelection && b.fromJSON(e.startSelection), e.selectionsAfter.map(b.fromJSON));
  }
  // This does not check `addToHistory` and such, it assumes the
  // transaction needs to be converted to an item. Returns null when
  // there are no changes or effects in the transaction.
  static fromTransaction(e, t) {
    let i = Ve;
    for (let r of e.startState.facet(e0)) {
      let s = r(e);
      s.length && (i = i.concat(s));
    }
    return !i.length && e.changes.empty ? null : new ke(e.changes.invert(e.startState.doc), i, void 0, t || e.startState.selection, Ve);
  }
  static selection(e) {
    return new ke(void 0, Ve, void 0, void 0, e);
  }
}
function Qr(n, e, t, i) {
  let r = e + 1 > t + 20 ? e - t - 1 : 0, s = n.slice(r, e);
  return s.push(i), s;
}
function r0(n, e) {
  let t = [], i = !1;
  return n.iterChangedRanges((r, s) => t.push(r, s)), e.iterChangedRanges((r, s, o, l) => {
    for (let a = 0; a < t.length; ) {
      let h = t[a++], c = t[a++];
      l >= h && o <= c && (i = !0);
    }
  }), i;
}
function s0(n, e) {
  return n.ranges.length == e.ranges.length && n.ranges.filter((t, i) => t.empty != e.ranges[i].empty).length === 0;
}
function Df(n, e) {
  return n.length ? e.length ? n.concat(e) : n : e;
}
const Ve = [], o0 = 200;
function qf(n, e) {
  if (n.length) {
    let t = n[n.length - 1], i = t.selectionsAfter.slice(Math.max(0, t.selectionsAfter.length - o0));
    return i.length && i[i.length - 1].eq(e) ? n : (i.push(e), Qr(n, n.length - 1, 1e9, t.setSelAfter(i)));
  } else
    return [ke.selection([e])];
}
function l0(n) {
  let e = n[n.length - 1], t = n.slice();
  return t[n.length - 1] = e.setSelAfter(e.selectionsAfter.slice(0, e.selectionsAfter.length - 1)), t;
}
function ms(n, e) {
  if (!n.length)
    return n;
  let t = n.length, i = Ve;
  for (; t; ) {
    let r = a0(n[t - 1], e, i);
    if (r.changes && !r.changes.empty || r.effects.length) {
      let s = n.slice(0, t);
      return s[t - 1] = r, s;
    } else
      e = r.mapped, t--, i = r.selectionsAfter;
  }
  return i.length ? [ke.selection(i)] : Ve;
}
function a0(n, e, t) {
  let i = Df(n.selectionsAfter.length ? n.selectionsAfter.map((l) => l.map(e)) : Ve, t);
  if (!n.changes)
    return ke.selection(i);
  let r = n.changes.map(e), s = e.mapDesc(n.changes, !0), o = n.mapped ? n.mapped.composeDesc(s) : s;
  return new ke(r, M.mapEffects(n.effects, e), o, n.startSelection.map(s), i);
}
const h0 = /^(input\.type|delete)($|\.)/;
class st {
  constructor(e, t, i = 0, r = void 0) {
    this.done = e, this.undone = t, this.prevTime = i, this.prevUserEvent = r;
  }
  isolate() {
    return this.prevTime ? new st(this.done, this.undone) : this;
  }
  addChanges(e, t, i, r, s) {
    let o = this.done, l = o[o.length - 1];
    return l && l.changes && !l.changes.empty && e.changes && (!i || h0.test(i)) && (!l.selectionsAfter.length && t - this.prevTime < r.newGroupDelay && r.joinToEvent(s, r0(l.changes, e.changes)) || // For compose (but not compose.start) events, always join with previous event
    i == "input.type.compose") ? o = Qr(o, o.length - 1, r.minDepth, new ke(e.changes.compose(l.changes), Df(M.mapEffects(e.effects, l.changes), l.effects), l.mapped, l.startSelection, Ve)) : o = Qr(o, o.length, r.minDepth, e), new st(o, Ve, t, i);
  }
  addSelection(e, t, i, r) {
    let s = this.done.length ? this.done[this.done.length - 1].selectionsAfter : Ve;
    return s.length > 0 && t - this.prevTime < r && i == this.prevUserEvent && i && /^select($|\.)/.test(i) && s0(s[s.length - 1], e) ? this : new st(qf(this.done, e), this.undone, t, i);
  }
  addMapping(e) {
    return new st(ms(this.done, e), ms(this.undone, e), this.prevTime, this.prevUserEvent);
  }
  pop(e, t, i) {
    let r = e == 0 ? this.done : this.undone;
    if (r.length == 0)
      return null;
    let s = r[r.length - 1], o = s.selectionsAfter[0] || (s.startSelection ? s.startSelection.map(s.changes.invertedDesc, 1) : t.selection);
    if (i && s.selectionsAfter.length)
      return t.update({
        selection: s.selectionsAfter[s.selectionsAfter.length - 1],
        annotations: yo.of({ side: e, rest: l0(r), selection: o }),
        userEvent: e == 0 ? "select.undo" : "select.redo",
        scrollIntoView: !0
      });
    if (s.changes) {
      let l = r.length == 1 ? Ve : r.slice(0, r.length - 1);
      return s.mapped && (l = ms(l, s.mapped)), t.update({
        changes: s.changes,
        selection: s.startSelection,
        effects: s.effects,
        annotations: yo.of({ side: e, rest: l, selection: o }),
        filter: !1,
        userEvent: e == 0 ? "undo" : "redo",
        scrollIntoView: !0
      });
    } else
      return null;
  }
}
st.empty = /* @__PURE__ */ new st(Ve, Ve);
const c0 = [
  { key: "Mod-z", run: _f, preventDefault: !0 },
  { key: "Mod-y", mac: "Mod-Shift-z", run: xo, preventDefault: !0 },
  { linux: "Ctrl-Shift-z", run: xo, preventDefault: !0 },
  { key: "Mod-u", run: i0, preventDefault: !0 },
  { key: "Alt-u", mac: "Mod-Shift-u", run: n0, preventDefault: !0 }
];
function xi(n, e) {
  return b.create(n.ranges.map(e), n.mainIndex);
}
function Ie(n, e) {
  return n.update({ selection: e, scrollIntoView: !0, userEvent: "select" });
}
function je({ state: n, dispatch: e }, t) {
  let i = xi(n.selection, t);
  return i.eq(n.selection, !0) ? !1 : (e(Ie(n, i)), !0);
}
function Br(n, e) {
  return b.cursor(e ? n.to : n.from);
}
function Wf(n, e) {
  return je(n, (t) => t.empty ? n.moveByChar(t, e) : Br(t, e));
}
function Oe(n) {
  return n.textDirectionAt(n.state.selection.main.head) == N.LTR;
}
const Lf = (n) => Wf(n, !Oe(n)), Bf = (n) => Wf(n, Oe(n));
function If(n, e) {
  return je(n, (t) => t.empty ? n.moveByGroup(t, e) : Br(t, e));
}
const f0 = (n) => If(n, !Oe(n)), u0 = (n) => If(n, Oe(n));
function d0(n, e, t) {
  if (e.type.prop(t))
    return !0;
  let i = e.to - e.from;
  return i && (i > 2 || /[^\s,.;:]/.test(n.sliceDoc(e.from, e.to))) || e.firstChild;
}
function Ir(n, e, t) {
  let i = K(n).resolveInner(e.head), r = t ? z.closedBy : z.openedBy;
  for (let a = e.head; ; ) {
    let h = t ? i.childAfter(a) : i.childBefore(a);
    if (!h)
      break;
    d0(n, h, r) ? i = h : a = t ? h.to : h.from;
  }
  let s = i.type.prop(r), o, l;
  return s && (o = t ? rt(n, i.from, 1) : rt(n, i.to, -1)) && o.matched ? l = t ? o.end.to : o.end.from : l = t ? i.to : i.from, b.cursor(l, t ? -1 : 1);
}
const O0 = (n) => je(n, (e) => Ir(n.state, e, !Oe(n))), p0 = (n) => je(n, (e) => Ir(n.state, e, Oe(n)));
function jf(n, e) {
  return je(n, (t) => {
    if (!t.empty)
      return Br(t, e);
    let i = n.moveVertically(t, e);
    return i.head != t.head ? i : n.moveToLineBoundary(t, e);
  });
}
const Nf = (n) => jf(n, !1), Gf = (n) => jf(n, !0);
function Uf(n) {
  let e = n.scrollDOM.clientHeight < n.scrollDOM.scrollHeight - 2, t = 0, i = 0, r;
  if (e) {
    for (let s of n.state.facet(v.scrollMargins)) {
      let o = s(n);
      o != null && o.top && (t = Math.max(o == null ? void 0 : o.top, t)), o != null && o.bottom && (i = Math.max(o == null ? void 0 : o.bottom, i));
    }
    r = n.scrollDOM.clientHeight - t - i;
  } else
    r = (n.dom.ownerDocument.defaultView || window).innerHeight;
  return {
    marginTop: t,
    marginBottom: i,
    selfScroll: e,
    height: Math.max(n.defaultLineHeight, r - 5)
  };
}
function Ff(n, e) {
  let t = Uf(n), { state: i } = n, r = xi(i.selection, (o) => o.empty ? n.moveVertically(o, e, t.height) : Br(o, e));
  if (r.eq(i.selection))
    return !1;
  let s;
  if (t.selfScroll) {
    let o = n.coordsAtPos(i.selection.main.head), l = n.scrollDOM.getBoundingClientRect(), a = l.top + t.marginTop, h = l.bottom - t.marginBottom;
    o && o.top > a && o.bottom < h && (s = v.scrollIntoView(r.main.head, { y: "start", yMargin: o.top - a }));
  }
  return n.dispatch(Ie(i, r), { effects: s }), !0;
}
const Wa = (n) => Ff(n, !1), wo = (n) => Ff(n, !0);
function Mt(n, e, t) {
  let i = n.lineBlockAt(e.head), r = n.moveToLineBoundary(e, t);
  if (r.head == e.head && r.head != (t ? i.to : i.from) && (r = n.moveToLineBoundary(e, t, !1)), !t && r.head == i.from && i.length) {
    let s = /^\s*/.exec(n.state.sliceDoc(i.from, Math.min(i.from + 100, i.to)))[0].length;
    s && e.head != i.from + s && (r = b.cursor(i.from + s));
  }
  return r;
}
const m0 = (n) => je(n, (e) => Mt(n, e, !0)), g0 = (n) => je(n, (e) => Mt(n, e, !1)), Q0 = (n) => je(n, (e) => Mt(n, e, !Oe(n))), b0 = (n) => je(n, (e) => Mt(n, e, Oe(n))), S0 = (n) => je(n, (e) => b.cursor(n.lineBlockAt(e.head).from, 1)), y0 = (n) => je(n, (e) => b.cursor(n.lineBlockAt(e.head).to, -1));
function x0(n, e, t) {
  let i = !1, r = xi(n.selection, (s) => {
    let o = rt(n, s.head, -1) || rt(n, s.head, 1) || s.head > 0 && rt(n, s.head - 1, 1) || s.head < n.doc.length && rt(n, s.head + 1, -1);
    if (!o || !o.end)
      return s;
    i = !0;
    let l = o.start.from == s.head ? o.end.to : o.end.from;
    return b.cursor(l);
  });
  return i ? (e(Ie(n, r)), !0) : !1;
}
const w0 = ({ state: n, dispatch: e }) => x0(n, e);
function De(n, e) {
  let t = xi(n.state.selection, (i) => {
    let r = e(i);
    return b.range(i.anchor, r.head, r.goalColumn, r.bidiLevel || void 0);
  });
  return t.eq(n.state.selection) ? !1 : (n.dispatch(Ie(n.state, t)), !0);
}
function Hf(n, e) {
  return De(n, (t) => n.moveByChar(t, e));
}
const Kf = (n) => Hf(n, !Oe(n)), Jf = (n) => Hf(n, Oe(n));
function eu(n, e) {
  return De(n, (t) => n.moveByGroup(t, e));
}
const k0 = (n) => eu(n, !Oe(n)), $0 = (n) => eu(n, Oe(n)), P0 = (n) => De(n, (e) => Ir(n.state, e, !Oe(n))), v0 = (n) => De(n, (e) => Ir(n.state, e, Oe(n)));
function tu(n, e) {
  return De(n, (t) => n.moveVertically(t, e));
}
const iu = (n) => tu(n, !1), nu = (n) => tu(n, !0);
function ru(n, e) {
  return De(n, (t) => n.moveVertically(t, e, Uf(n).height));
}
const La = (n) => ru(n, !1), Ba = (n) => ru(n, !0), T0 = (n) => De(n, (e) => Mt(n, e, !0)), C0 = (n) => De(n, (e) => Mt(n, e, !1)), Z0 = (n) => De(n, (e) => Mt(n, e, !Oe(n))), X0 = (n) => De(n, (e) => Mt(n, e, Oe(n))), A0 = (n) => De(n, (e) => b.cursor(n.lineBlockAt(e.head).from)), M0 = (n) => De(n, (e) => b.cursor(n.lineBlockAt(e.head).to)), Ia = ({ state: n, dispatch: e }) => (e(Ie(n, { anchor: 0 })), !0), ja = ({ state: n, dispatch: e }) => (e(Ie(n, { anchor: n.doc.length })), !0), Na = ({ state: n, dispatch: e }) => (e(Ie(n, { anchor: n.selection.main.anchor, head: 0 })), !0), Ga = ({ state: n, dispatch: e }) => (e(Ie(n, { anchor: n.selection.main.anchor, head: n.doc.length })), !0), R0 = ({ state: n, dispatch: e }) => (e(n.update({ selection: { anchor: 0, head: n.doc.length }, userEvent: "select" })), !0), z0 = ({ state: n, dispatch: e }) => {
  let t = jr(n).map(({ from: i, to: r }) => b.range(i, Math.min(r + 1, n.doc.length)));
  return e(n.update({ selection: b.create(t), userEvent: "select" })), !0;
}, Y0 = ({ state: n, dispatch: e }) => {
  let t = xi(n.selection, (i) => {
    let r = K(n), s = r.resolveStack(i.from, 1);
    if (i.empty) {
      let o = r.resolveStack(i.from, -1);
      o.node.from >= s.node.from && o.node.to <= s.node.to && (s = o);
    }
    for (let o = s; o; o = o.next) {
      let { node: l } = o;
      if ((l.from < i.from && l.to >= i.to || l.to > i.to && l.from <= i.from) && o.next)
        return b.range(l.to, l.from);
    }
    return i;
  });
  return t.eq(n.selection) ? !1 : (e(Ie(n, t)), !0);
};
function su(n, e) {
  let { state: t } = n, i = t.selection, r = t.selection.ranges.slice();
  for (let s of t.selection.ranges) {
    let o = t.doc.lineAt(s.head);
    if (e ? o.to < n.state.doc.length : o.from > 0)
      for (let l = s; ; ) {
        let a = n.moveVertically(l, e);
        if (a.head < o.from || a.head > o.to) {
          r.some((h) => h.head == a.head) || r.push(a);
          break;
        } else {
          if (a.head == l.head)
            break;
          l = a;
        }
      }
  }
  return r.length == i.ranges.length ? !1 : (n.dispatch(Ie(t, b.create(r, r.length - 1))), !0);
}
const V0 = (n) => su(n, !1), E0 = (n) => su(n, !0), _0 = ({ state: n, dispatch: e }) => {
  let t = n.selection, i = null;
  return t.ranges.length > 1 ? i = b.create([t.main]) : t.main.empty || (i = b.create([b.cursor(t.main.head)])), i ? (e(Ie(n, i)), !0) : !1;
};
function pn(n, e) {
  if (n.state.readOnly)
    return !1;
  let t = "delete.selection", { state: i } = n, r = i.changeByRange((s) => {
    let { from: o, to: l } = s;
    if (o == l) {
      let a = e(s);
      a < o ? (t = "delete.backward", a = Vn(n, a, !1)) : a > o && (t = "delete.forward", a = Vn(n, a, !0)), o = Math.min(o, a), l = Math.max(l, a);
    } else
      o = Vn(n, o, !1), l = Vn(n, l, !0);
    return o == l ? { range: s } : { changes: { from: o, to: l }, range: b.cursor(o, o < s.head ? -1 : 1) };
  });
  return r.changes.empty ? !1 : (n.dispatch(i.update(r, {
    scrollIntoView: !0,
    userEvent: t,
    effects: t == "delete.selection" ? v.announce.of(i.phrase("Selection deleted")) : void 0
  })), !0);
}
function Vn(n, e, t) {
  if (n instanceof v)
    for (let i of n.state.facet(v.atomicRanges).map((r) => r(n)))
      i.between(e, e, (r, s) => {
        r < e && s > e && (e = t ? s : r);
      });
  return e;
}
const ou = (n, e, t) => pn(n, (i) => {
  let r = i.from, { state: s } = n, o = s.doc.lineAt(r), l, a;
  if (t && !e && r > o.from && r < o.from + 200 && !/[^ \t]/.test(l = o.text.slice(0, r - o.from))) {
    if (l[l.length - 1] == "	")
      return r - 1;
    let h = Si(l, s.tabSize), c = h % pr(s) || pr(s);
    for (let f = 0; f < c && l[l.length - 1 - f] == " "; f++)
      r--;
    a = r;
  } else
    a = se(o.text, r - o.from, e, e) + o.from, a == r && o.number != (e ? s.doc.lines : 1) ? a += e ? 1 : -1 : !e && /[\ufe00-\ufe0f]/.test(o.text.slice(a - o.from, r - o.from)) && (a = se(o.text, a - o.from, !1, !1) + o.from);
  return a;
}), ko = (n) => ou(n, !1, !0), lu = (n) => ou(n, !0, !1), au = (n, e) => pn(n, (t) => {
  let i = t.head, { state: r } = n, s = r.doc.lineAt(i), o = r.charCategorizer(i);
  for (let l = null; ; ) {
    if (i == (e ? s.to : s.from)) {
      i == t.head && s.number != (e ? r.doc.lines : 1) && (i += e ? 1 : -1);
      break;
    }
    let a = se(s.text, i - s.from, e) + s.from, h = s.text.slice(Math.min(i, a) - s.from, Math.max(i, a) - s.from), c = o(h);
    if (l != null && c != l)
      break;
    (h != " " || i != t.head) && (l = c), i = a;
  }
  return i;
}), hu = (n) => au(n, !1), D0 = (n) => au(n, !0), q0 = (n) => pn(n, (e) => {
  let t = n.lineBlockAt(e.head).to;
  return e.head < t ? t : Math.min(n.state.doc.length, e.head + 1);
}), W0 = (n) => pn(n, (e) => {
  let t = n.moveToLineBoundary(e, !1).head;
  return e.head > t ? t : Math.max(0, e.head - 1);
}), L0 = (n) => pn(n, (e) => {
  let t = n.moveToLineBoundary(e, !0).head;
  return e.head < t ? t : Math.min(n.state.doc.length, e.head + 1);
}), B0 = ({ state: n, dispatch: e }) => {
  if (n.readOnly)
    return !1;
  let t = n.changeByRange((i) => ({
    changes: { from: i.from, to: i.to, insert: D.of(["", ""]) },
    range: b.cursor(i.from)
  }));
  return e(n.update(t, { scrollIntoView: !0, userEvent: "input" })), !0;
}, I0 = ({ state: n, dispatch: e }) => {
  if (n.readOnly)
    return !1;
  let t = n.changeByRange((i) => {
    if (!i.empty || i.from == 0 || i.from == n.doc.length)
      return { range: i };
    let r = i.from, s = n.doc.lineAt(r), o = r == s.from ? r - 1 : se(s.text, r - s.from, !1) + s.from, l = r == s.to ? r + 1 : se(s.text, r - s.from, !0) + s.from;
    return {
      changes: { from: o, to: l, insert: n.doc.slice(r, l).append(n.doc.slice(o, r)) },
      range: b.cursor(l)
    };
  });
  return t.changes.empty ? !1 : (e(n.update(t, { scrollIntoView: !0, userEvent: "move.character" })), !0);
};
function jr(n) {
  let e = [], t = -1;
  for (let i of n.selection.ranges) {
    let r = n.doc.lineAt(i.from), s = n.doc.lineAt(i.to);
    if (!i.empty && i.to == s.from && (s = n.doc.lineAt(i.to - 1)), t >= r.number) {
      let o = e[e.length - 1];
      o.to = s.to, o.ranges.push(i);
    } else
      e.push({ from: r.from, to: s.to, ranges: [i] });
    t = s.number + 1;
  }
  return e;
}
function cu(n, e, t) {
  if (n.readOnly)
    return !1;
  let i = [], r = [];
  for (let s of jr(n)) {
    if (t ? s.to == n.doc.length : s.from == 0)
      continue;
    let o = n.doc.lineAt(t ? s.to + 1 : s.from - 1), l = o.length + 1;
    if (t) {
      i.push({ from: s.to, to: o.to }, { from: s.from, insert: o.text + n.lineBreak });
      for (let a of s.ranges)
        r.push(b.range(Math.min(n.doc.length, a.anchor + l), Math.min(n.doc.length, a.head + l)));
    } else {
      i.push({ from: o.from, to: s.from }, { from: s.to, insert: n.lineBreak + o.text });
      for (let a of s.ranges)
        r.push(b.range(a.anchor - l, a.head - l));
    }
  }
  return i.length ? (e(n.update({
    changes: i,
    scrollIntoView: !0,
    selection: b.create(r, n.selection.mainIndex),
    userEvent: "move.line"
  })), !0) : !1;
}
const j0 = ({ state: n, dispatch: e }) => cu(n, e, !1), N0 = ({ state: n, dispatch: e }) => cu(n, e, !0);
function fu(n, e, t) {
  if (n.readOnly)
    return !1;
  let i = [];
  for (let s of jr(n))
    t ? i.push({ from: s.from, insert: n.doc.slice(s.from, s.to) + n.lineBreak }) : i.push({ from: s.to, insert: n.lineBreak + n.doc.slice(s.from, s.to) });
  let r = n.changes(i);
  return e(n.update({
    changes: r,
    selection: n.selection.map(r, t ? 1 : -1),
    scrollIntoView: !0,
    userEvent: "input.copyline"
  })), !0;
}
const G0 = ({ state: n, dispatch: e }) => fu(n, e, !1), U0 = ({ state: n, dispatch: e }) => fu(n, e, !0), F0 = (n) => {
  if (n.state.readOnly)
    return !1;
  let { state: e } = n, t = e.changes(jr(e).map(({ from: r, to: s }) => (r > 0 ? r-- : s < e.doc.length && s++, { from: r, to: s }))), i = xi(e.selection, (r) => {
    let s;
    if (n.lineWrapping) {
      let o = n.lineBlockAt(r.head), l = n.coordsAtPos(r.head, r.assoc || 1);
      l && (s = o.bottom + n.documentTop - l.bottom + n.defaultLineHeight / 2);
    }
    return n.moveVertically(r, !0, s);
  }).map(t);
  return n.dispatch({ changes: t, selection: i, scrollIntoView: !0, userEvent: "delete.line" }), !0;
};
function H0(n, e) {
  if (/\(\)|\[\]|\{\}/.test(n.sliceDoc(e - 1, e + 1)))
    return { from: e, to: e };
  let t = K(n).resolveInner(e), i = t.childBefore(e), r = t.childAfter(e), s;
  return i && r && i.to <= e && r.from >= e && (s = i.type.prop(z.closedBy)) && s.indexOf(r.name) > -1 && n.doc.lineAt(i.to).from == n.doc.lineAt(r.from).from && !/\S/.test(n.sliceDoc(i.to, r.from)) ? { from: i.to, to: r.from } : null;
}
const Ua = /* @__PURE__ */ uu(!1), K0 = /* @__PURE__ */ uu(!0);
function uu(n) {
  return ({ state: e, dispatch: t }) => {
    if (e.readOnly)
      return !1;
    let i = e.changeByRange((r) => {
      let { from: s, to: o } = r, l = e.doc.lineAt(s), a = !n && s == o && H0(e, s);
      n && (s = o = (o <= l.to ? l : e.doc.lineAt(o)).to);
      let h = new _r(e, { simulateBreak: s, simulateDoubleBreak: !!a }), c = tl(h, s);
      for (c == null && (c = Si(/^\s*/.exec(e.doc.lineAt(s).text)[0], e.tabSize)); o < l.to && /\s/.test(l.text[o - l.from]); )
        o++;
      a ? { from: s, to: o } = a : s > l.from && s < l.from + 100 && !/\S/.test(l.text.slice(0, s)) && (s = l.from);
      let f = ["", Ji(e, c)];
      return a && f.push(Ji(e, h.lineIndent(l.from, -1))), {
        changes: { from: s, to: o, insert: D.of(f) },
        range: b.cursor(s + 1 + f[1].length)
      };
    });
    return t(e.update(i, { scrollIntoView: !0, userEvent: "input" })), !0;
  };
}
function sl(n, e) {
  let t = -1;
  return n.changeByRange((i) => {
    let r = [];
    for (let o = i.from; o <= i.to; ) {
      let l = n.doc.lineAt(o);
      l.number > t && (i.empty || i.to > l.from) && (e(l, r, i), t = l.number), o = l.to + 1;
    }
    let s = n.changes(r);
    return {
      changes: r,
      range: b.range(s.mapPos(i.anchor, 1), s.mapPos(i.head, 1))
    };
  });
}
const J0 = ({ state: n, dispatch: e }) => {
  if (n.readOnly)
    return !1;
  let t = /* @__PURE__ */ Object.create(null), i = new _r(n, { overrideIndentation: (s) => {
    let o = t[s];
    return o ?? -1;
  } }), r = sl(n, (s, o, l) => {
    let a = tl(i, s.from);
    if (a == null)
      return;
    /\S/.test(s.text) || (a = 0);
    let h = /^\s*/.exec(s.text)[0], c = Ji(n, a);
    (h != c || l.from < s.from + h.length) && (t[s.from] = a, o.push({ from: s.from, to: s.from + h.length, insert: c }));
  });
  return r.changes.empty || e(n.update(r, { userEvent: "indent" })), !0;
}, du = ({ state: n, dispatch: e }) => n.readOnly ? !1 : (e(n.update(sl(n, (t, i) => {
  i.push({ from: t.from, insert: n.facet(dn) });
}), { userEvent: "input.indent" })), !0), Ou = ({ state: n, dispatch: e }) => n.readOnly ? !1 : (e(n.update(sl(n, (t, i) => {
  let r = /^\s*/.exec(t.text)[0];
  if (!r)
    return;
  let s = Si(r, n.tabSize), o = 0, l = Ji(n, Math.max(0, s - pr(n)));
  for (; o < r.length && o < l.length && r.charCodeAt(o) == l.charCodeAt(o); )
    o++;
  i.push({ from: t.from + o, to: t.from + r.length, insert: l.slice(o) });
}), { userEvent: "delete.dedent" })), !0), eQ = (n) => (n.setTabFocusMode(), !0), tQ = [
  { key: "Ctrl-b", run: Lf, shift: Kf, preventDefault: !0 },
  { key: "Ctrl-f", run: Bf, shift: Jf },
  { key: "Ctrl-p", run: Nf, shift: iu },
  { key: "Ctrl-n", run: Gf, shift: nu },
  { key: "Ctrl-a", run: S0, shift: A0 },
  { key: "Ctrl-e", run: y0, shift: M0 },
  { key: "Ctrl-d", run: lu },
  { key: "Ctrl-h", run: ko },
  { key: "Ctrl-k", run: q0 },
  { key: "Ctrl-Alt-h", run: hu },
  { key: "Ctrl-o", run: B0 },
  { key: "Ctrl-t", run: I0 },
  { key: "Ctrl-v", run: wo }
], iQ = /* @__PURE__ */ [
  { key: "ArrowLeft", run: Lf, shift: Kf, preventDefault: !0 },
  { key: "Mod-ArrowLeft", mac: "Alt-ArrowLeft", run: f0, shift: k0, preventDefault: !0 },
  { mac: "Cmd-ArrowLeft", run: Q0, shift: Z0, preventDefault: !0 },
  { key: "ArrowRight", run: Bf, shift: Jf, preventDefault: !0 },
  { key: "Mod-ArrowRight", mac: "Alt-ArrowRight", run: u0, shift: $0, preventDefault: !0 },
  { mac: "Cmd-ArrowRight", run: b0, shift: X0, preventDefault: !0 },
  { key: "ArrowUp", run: Nf, shift: iu, preventDefault: !0 },
  { mac: "Cmd-ArrowUp", run: Ia, shift: Na },
  { mac: "Ctrl-ArrowUp", run: Wa, shift: La },
  { key: "ArrowDown", run: Gf, shift: nu, preventDefault: !0 },
  { mac: "Cmd-ArrowDown", run: ja, shift: Ga },
  { mac: "Ctrl-ArrowDown", run: wo, shift: Ba },
  { key: "PageUp", run: Wa, shift: La },
  { key: "PageDown", run: wo, shift: Ba },
  { key: "Home", run: g0, shift: C0, preventDefault: !0 },
  { key: "Mod-Home", run: Ia, shift: Na },
  { key: "End", run: m0, shift: T0, preventDefault: !0 },
  { key: "Mod-End", run: ja, shift: Ga },
  { key: "Enter", run: Ua, shift: Ua },
  { key: "Mod-a", run: R0 },
  { key: "Backspace", run: ko, shift: ko, preventDefault: !0 },
  { key: "Delete", run: lu, preventDefault: !0 },
  { key: "Mod-Backspace", mac: "Alt-Backspace", run: hu, preventDefault: !0 },
  { key: "Mod-Delete", mac: "Alt-Delete", run: D0, preventDefault: !0 },
  { mac: "Mod-Backspace", run: W0, preventDefault: !0 },
  { mac: "Mod-Delete", run: L0, preventDefault: !0 }
].concat(/* @__PURE__ */ tQ.map((n) => ({ mac: n.key, run: n.run, shift: n.shift }))), nQ = /* @__PURE__ */ [
  { key: "Alt-ArrowLeft", mac: "Ctrl-ArrowLeft", run: O0, shift: P0 },
  { key: "Alt-ArrowRight", mac: "Ctrl-ArrowRight", run: p0, shift: v0 },
  { key: "Alt-ArrowUp", run: j0 },
  { key: "Shift-Alt-ArrowUp", run: G0 },
  { key: "Alt-ArrowDown", run: N0 },
  { key: "Shift-Alt-ArrowDown", run: U0 },
  { key: "Mod-Alt-ArrowUp", run: V0 },
  { key: "Mod-Alt-ArrowDown", run: E0 },
  { key: "Escape", run: _0 },
  { key: "Mod-Enter", run: K0 },
  { key: "Alt-l", mac: "Ctrl-l", run: z0 },
  { key: "Mod-i", run: Y0, preventDefault: !0 },
  { key: "Mod-[", run: Ou },
  { key: "Mod-]", run: du },
  { key: "Mod-Alt-\\", run: J0 },
  { key: "Shift-Mod-k", run: F0 },
  { key: "Shift-Mod-\\", run: w0 },
  { key: "Mod-/", run: jg },
  { key: "Alt-A", run: Gg },
  { key: "Ctrl-m", mac: "Shift-Alt-m", run: eQ }
].concat(iQ), rQ = { key: "Tab", run: du, shift: Ou }, Fa = typeof String.prototype.normalize == "function" ? (n) => n.normalize("NFKD") : (n) => n;
class mi {
  /**
  Create a text cursor. The query is the search string, `from` to
  `to` provides the region to search.
  
  When `normalize` is given, it will be called, on both the query
  string and the content it is matched against, before comparing.
  You can, for example, create a case-insensitive search by
  passing `s => s.toLowerCase()`.
  
  Text is always normalized with
  [`.normalize("NFKD")`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/normalize)
  (when supported).
  */
  constructor(e, t, i = 0, r = e.length, s, o) {
    this.test = o, this.value = { from: 0, to: 0 }, this.done = !1, this.matches = [], this.buffer = "", this.bufferPos = 0, this.iter = e.iterRange(i, r), this.bufferStart = i, this.normalize = s ? (l) => s(Fa(l)) : Fa, this.query = this.normalize(t);
  }
  peek() {
    if (this.bufferPos == this.buffer.length) {
      if (this.bufferStart += this.buffer.length, this.iter.next(), this.iter.done)
        return -1;
      this.bufferPos = 0, this.buffer = this.iter.value;
    }
    return Se(this.buffer, this.bufferPos);
  }
  /**
  Look for the next match. Updates the iterator's
  [`value`](https://codemirror.net/6/docs/ref/#search.SearchCursor.value) and
  [`done`](https://codemirror.net/6/docs/ref/#search.SearchCursor.done) properties. Should be called
  at least once before using the cursor.
  */
  next() {
    for (; this.matches.length; )
      this.matches.pop();
    return this.nextOverlapping();
  }
  /**
  The `next` method will ignore matches that partially overlap a
  previous match. This method behaves like `next`, but includes
  such matches.
  */
  nextOverlapping() {
    for (; ; ) {
      let e = this.peek();
      if (e < 0)
        return this.done = !0, this;
      let t = Zo(e), i = this.bufferStart + this.bufferPos;
      this.bufferPos += et(e);
      let r = this.normalize(t);
      if (r.length)
        for (let s = 0, o = i; ; s++) {
          let l = r.charCodeAt(s), a = this.match(l, o, this.bufferPos + this.bufferStart);
          if (s == r.length - 1) {
            if (a)
              return this.value = a, this;
            break;
          }
          o == i && s < t.length && t.charCodeAt(s) == l && o++;
        }
    }
  }
  match(e, t, i) {
    let r = null;
    for (let s = 0; s < this.matches.length; s += 2) {
      let o = this.matches[s], l = !1;
      this.query.charCodeAt(o) == e && (o == this.query.length - 1 ? r = { from: this.matches[s + 1], to: i } : (this.matches[s]++, l = !0)), l || (this.matches.splice(s, 2), s -= 2);
    }
    return this.query.charCodeAt(0) == e && (this.query.length == 1 ? r = { from: t, to: i } : this.matches.push(1, t)), r && this.test && !this.test(r.from, r.to, this.buffer, this.bufferStart) && (r = null), r;
  }
}
typeof Symbol < "u" && (mi.prototype[Symbol.iterator] = function() {
  return this;
});
const pu = { from: -1, to: -1, match: /* @__PURE__ */ /.*/.exec("") }, ol = "gm" + (/x/.unicode == null ? "" : "u");
class mu {
  /**
  Create a cursor that will search the given range in the given
  document. `query` should be the raw pattern (as you'd pass it to
  `new RegExp`).
  */
  constructor(e, t, i, r = 0, s = e.length) {
    if (this.text = e, this.to = s, this.curLine = "", this.done = !1, this.value = pu, /\\[sWDnr]|\n|\r|\[\^/.test(t))
      return new gu(e, t, i, r, s);
    this.re = new RegExp(t, ol + (i != null && i.ignoreCase ? "i" : "")), this.test = i == null ? void 0 : i.test, this.iter = e.iter();
    let o = e.lineAt(r);
    this.curLineStart = o.from, this.matchPos = br(e, r), this.getLine(this.curLineStart);
  }
  getLine(e) {
    this.iter.next(e), this.iter.lineBreak ? this.curLine = "" : (this.curLine = this.iter.value, this.curLineStart + this.curLine.length > this.to && (this.curLine = this.curLine.slice(0, this.to - this.curLineStart)), this.iter.next());
  }
  nextLine() {
    this.curLineStart = this.curLineStart + this.curLine.length + 1, this.curLineStart > this.to ? this.curLine = "" : this.getLine(0);
  }
  /**
  Move to the next match, if there is one.
  */
  next() {
    for (let e = this.matchPos - this.curLineStart; ; ) {
      this.re.lastIndex = e;
      let t = this.matchPos <= this.to && this.re.exec(this.curLine);
      if (t) {
        let i = this.curLineStart + t.index, r = i + t[0].length;
        if (this.matchPos = br(this.text, r + (i == r ? 1 : 0)), i == this.curLineStart + this.curLine.length && this.nextLine(), (i < r || i > this.value.to) && (!this.test || this.test(i, r, t)))
          return this.value = { from: i, to: r, match: t }, this;
        e = this.matchPos - this.curLineStart;
      } else if (this.curLineStart + this.curLine.length < this.to)
        this.nextLine(), e = 0;
      else
        return this.done = !0, this;
    }
  }
}
const gs = /* @__PURE__ */ new WeakMap();
class oi {
  constructor(e, t) {
    this.from = e, this.text = t;
  }
  get to() {
    return this.from + this.text.length;
  }
  static get(e, t, i) {
    let r = gs.get(e);
    if (!r || r.from >= i || r.to <= t) {
      let l = new oi(t, e.sliceString(t, i));
      return gs.set(e, l), l;
    }
    if (r.from == t && r.to == i)
      return r;
    let { text: s, from: o } = r;
    return o > t && (s = e.sliceString(t, o) + s, o = t), r.to < i && (s += e.sliceString(r.to, i)), gs.set(e, new oi(o, s)), new oi(t, s.slice(t - o, i - o));
  }
}
class gu {
  constructor(e, t, i, r, s) {
    this.text = e, this.to = s, this.done = !1, this.value = pu, this.matchPos = br(e, r), this.re = new RegExp(t, ol + (i != null && i.ignoreCase ? "i" : "")), this.test = i == null ? void 0 : i.test, this.flat = oi.get(e, r, this.chunkEnd(
      r + 5e3
      /* Chunk.Base */
    ));
  }
  chunkEnd(e) {
    return e >= this.to ? this.to : this.text.lineAt(e).to;
  }
  next() {
    for (; ; ) {
      let e = this.re.lastIndex = this.matchPos - this.flat.from, t = this.re.exec(this.flat.text);
      if (t && !t[0] && t.index == e && (this.re.lastIndex = e + 1, t = this.re.exec(this.flat.text)), t) {
        let i = this.flat.from + t.index, r = i + t[0].length;
        if ((this.flat.to >= this.to || t.index + t[0].length <= this.flat.text.length - 10) && (!this.test || this.test(i, r, t)))
          return this.value = { from: i, to: r, match: t }, this.matchPos = br(this.text, r + (i == r ? 1 : 0)), this;
      }
      if (this.flat.to == this.to)
        return this.done = !0, this;
      this.flat = oi.get(this.text, this.flat.from, this.chunkEnd(this.flat.from + this.flat.text.length * 2));
    }
  }
}
typeof Symbol < "u" && (mu.prototype[Symbol.iterator] = gu.prototype[Symbol.iterator] = function() {
  return this;
});
function sQ(n) {
  try {
    return new RegExp(n, ol), !0;
  } catch {
    return !1;
  }
}
function br(n, e) {
  if (e >= n.length)
    return e;
  let t = n.lineAt(e), i;
  for (; e < t.to && (i = t.text.charCodeAt(e - t.from)) >= 56320 && i < 57344; )
    e++;
  return e;
}
const oQ = (n) => {
  let { state: e } = n, t = String(e.doc.lineAt(n.state.selection.main.head).number), { close: i, result: r } = ym(n, {
    label: e.phrase("Go to line"),
    input: { type: "text", name: "line", value: t },
    focus: !0,
    submitLabel: e.phrase("go")
  });
  return r.then((s) => {
    let o = s && /^([+-])?(\d+)?(:\d+)?(%)?$/.exec(s.elements.line.value);
    if (!o) {
      n.dispatch({ effects: i });
      return;
    }
    let l = e.doc.lineAt(e.selection.main.head), [, a, h, c, f] = o, u = c ? +c.slice(1) : 0, d = h ? +h : l.number;
    if (h && f) {
      let g = d / 100;
      a && (g = g * (a == "-" ? -1 : 1) + l.number / e.doc.lines), d = Math.round(e.doc.lines * g);
    } else h && a && (d = d * (a == "-" ? -1 : 1) + l.number);
    let O = e.doc.line(Math.max(1, Math.min(e.doc.lines, d))), m = b.cursor(O.from + Math.max(0, Math.min(u, O.length)));
    n.dispatch({
      effects: [i, v.scrollIntoView(m.from, { y: "center" })],
      selection: m
    });
  }), !0;
}, lQ = {
  highlightWordAroundCursor: !1,
  minSelectionLength: 1,
  maxMatches: 100,
  wholeWords: !1
}, aQ = /* @__PURE__ */ T.define({
  combine(n) {
    return at(n, lQ, {
      highlightWordAroundCursor: (e, t) => e || t,
      minSelectionLength: Math.min,
      maxMatches: Math.min
    });
  }
});
function hQ(n) {
  return [OQ, dQ];
}
const cQ = /* @__PURE__ */ Z.mark({ class: "cm-selectionMatch" }), fQ = /* @__PURE__ */ Z.mark({ class: "cm-selectionMatch cm-selectionMatch-main" });
function Ha(n, e, t, i) {
  return (t == 0 || n(e.sliceDoc(t - 1, t)) != F.Word) && (i == e.doc.length || n(e.sliceDoc(i, i + 1)) != F.Word);
}
function uQ(n, e, t, i) {
  return n(e.sliceDoc(t, t + 1)) == F.Word && n(e.sliceDoc(i - 1, i)) == F.Word;
}
const dQ = /* @__PURE__ */ ee.fromClass(class {
  constructor(n) {
    this.decorations = this.getDeco(n);
  }
  update(n) {
    (n.selectionSet || n.docChanged || n.viewportChanged) && (this.decorations = this.getDeco(n.view));
  }
  getDeco(n) {
    let e = n.state.facet(aQ), { state: t } = n, i = t.selection;
    if (i.ranges.length > 1)
      return Z.none;
    let r = i.main, s, o = null;
    if (r.empty) {
      if (!e.highlightWordAroundCursor)
        return Z.none;
      let a = t.wordAt(r.head);
      if (!a)
        return Z.none;
      o = t.charCategorizer(r.head), s = t.sliceDoc(a.from, a.to);
    } else {
      let a = r.to - r.from;
      if (a < e.minSelectionLength || a > 200)
        return Z.none;
      if (e.wholeWords) {
        if (s = t.sliceDoc(r.from, r.to), o = t.charCategorizer(r.head), !(Ha(o, t, r.from, r.to) && uQ(o, t, r.from, r.to)))
          return Z.none;
      } else if (s = t.sliceDoc(r.from, r.to), !s)
        return Z.none;
    }
    let l = [];
    for (let a of n.visibleRanges) {
      let h = new mi(t.doc, s, a.from, a.to);
      for (; !h.next().done; ) {
        let { from: c, to: f } = h.value;
        if ((!o || Ha(o, t, c, f)) && (r.empty && c <= r.from && f >= r.to ? l.push(fQ.range(c, f)) : (c >= r.to || f <= r.from) && l.push(cQ.range(c, f)), l.length > e.maxMatches))
          return Z.none;
      }
    }
    return Z.set(l);
  }
}, {
  decorations: (n) => n.decorations
}), OQ = /* @__PURE__ */ v.baseTheme({
  ".cm-selectionMatch": { backgroundColor: "#99ff7780" },
  ".cm-searchMatch .cm-selectionMatch": { backgroundColor: "transparent" }
}), pQ = ({ state: n, dispatch: e }) => {
  let { selection: t } = n, i = b.create(t.ranges.map((r) => n.wordAt(r.head) || b.cursor(r.head)), t.mainIndex);
  return i.eq(t) ? !1 : (e(n.update({ selection: i })), !0);
};
function mQ(n, e) {
  let { main: t, ranges: i } = n.selection, r = n.wordAt(t.head), s = r && r.from == t.from && r.to == t.to;
  for (let o = !1, l = new mi(n.doc, e, i[i.length - 1].to); ; )
    if (l.next(), l.done) {
      if (o)
        return null;
      l = new mi(n.doc, e, 0, Math.max(0, i[i.length - 1].from - 1)), o = !0;
    } else {
      if (o && i.some((a) => a.from == l.value.from))
        continue;
      if (s) {
        let a = n.wordAt(l.value.from);
        if (!a || a.from != l.value.from || a.to != l.value.to)
          continue;
      }
      return l.value;
    }
}
const gQ = ({ state: n, dispatch: e }) => {
  let { ranges: t } = n.selection;
  if (t.some((s) => s.from === s.to))
    return pQ({ state: n, dispatch: e });
  let i = n.sliceDoc(t[0].from, t[0].to);
  if (n.selection.ranges.some((s) => n.sliceDoc(s.from, s.to) != i))
    return !1;
  let r = mQ(n, i);
  return r ? (e(n.update({
    selection: n.selection.addRange(b.range(r.from, r.to), !1),
    effects: v.scrollIntoView(r.to)
  })), !0) : !1;
}, wi = /* @__PURE__ */ T.define({
  combine(n) {
    return at(n, {
      top: !1,
      caseSensitive: !1,
      literal: !1,
      regexp: !1,
      wholeWord: !1,
      createPanel: (e) => new XQ(e),
      scrollToMatch: (e) => v.scrollIntoView(e)
    });
  }
});
class Qu {
  /**
  Create a query object.
  */
  constructor(e) {
    this.search = e.search, this.caseSensitive = !!e.caseSensitive, this.literal = !!e.literal, this.regexp = !!e.regexp, this.replace = e.replace || "", this.valid = !!this.search && (!this.regexp || sQ(this.search)), this.unquoted = this.unquote(this.search), this.wholeWord = !!e.wholeWord, this.test = e.test;
  }
  /**
  @internal
  */
  unquote(e) {
    return this.literal ? e : e.replace(/\\([nrt\\])/g, (t, i) => i == "n" ? `
` : i == "r" ? "\r" : i == "t" ? "	" : "\\");
  }
  /**
  Compare this query to another query.
  */
  eq(e) {
    return this.search == e.search && this.replace == e.replace && this.caseSensitive == e.caseSensitive && this.regexp == e.regexp && this.wholeWord == e.wholeWord && this.test == e.test;
  }
  /**
  @internal
  */
  create() {
    return this.regexp ? new wQ(this) : new SQ(this);
  }
  /**
  Get a search cursor for this query, searching through the given
  range in the given state.
  */
  getCursor(e, t = 0, i) {
    let r = e.doc ? e : _.create({ doc: e });
    return i == null && (i = r.doc.length), this.regexp ? Ut(this, r, t, i) : Gt(this, r, t, i);
  }
}
class bu {
  constructor(e) {
    this.spec = e;
  }
}
function QQ(n, e, t) {
  return (i, r, s, o) => {
    if (t && !t(i, r, s, o))
      return !1;
    let l = i >= o && r <= o + s.length ? s.slice(i - o, r - o) : e.doc.sliceString(i, r);
    return n(l, e, i, r);
  };
}
function Gt(n, e, t, i) {
  let r;
  return n.wholeWord && (r = bQ(e.doc, e.charCategorizer(e.selection.main.head))), n.test && (r = QQ(n.test, e, r)), new mi(e.doc, n.unquoted, t, i, n.caseSensitive ? void 0 : (s) => s.toLowerCase(), r);
}
function bQ(n, e) {
  return (t, i, r, s) => ((s > t || s + r.length < i) && (s = Math.max(0, t - 2), r = n.sliceString(s, Math.min(n.length, i + 2))), (e(Sr(r, t - s)) != F.Word || e(yr(r, t - s)) != F.Word) && (e(yr(r, i - s)) != F.Word || e(Sr(r, i - s)) != F.Word));
}
class SQ extends bu {
  constructor(e) {
    super(e);
  }
  nextMatch(e, t, i) {
    let r = Gt(this.spec, e, i, e.doc.length).nextOverlapping();
    if (r.done) {
      let s = Math.min(e.doc.length, t + this.spec.unquoted.length);
      r = Gt(this.spec, e, 0, s).nextOverlapping();
    }
    return r.done || r.value.from == t && r.value.to == i ? null : r.value;
  }
  // Searching in reverse is, rather than implementing an inverted search
  // cursor, done by scanning chunk after chunk forward.
  prevMatchInRange(e, t, i) {
    for (let r = i; ; ) {
      let s = Math.max(t, r - 1e4 - this.spec.unquoted.length), o = Gt(this.spec, e, s, r), l = null;
      for (; !o.nextOverlapping().done; )
        l = o.value;
      if (l)
        return l;
      if (s == t)
        return null;
      r -= 1e4;
    }
  }
  prevMatch(e, t, i) {
    let r = this.prevMatchInRange(e, 0, t);
    return r || (r = this.prevMatchInRange(e, Math.max(0, i - this.spec.unquoted.length), e.doc.length)), r && (r.from != t || r.to != i) ? r : null;
  }
  getReplacement(e) {
    return this.spec.unquote(this.spec.replace);
  }
  matchAll(e, t) {
    let i = Gt(this.spec, e, 0, e.doc.length), r = [];
    for (; !i.next().done; ) {
      if (r.length >= t)
        return null;
      r.push(i.value);
    }
    return r;
  }
  highlight(e, t, i, r) {
    let s = Gt(this.spec, e, Math.max(0, t - this.spec.unquoted.length), Math.min(i + this.spec.unquoted.length, e.doc.length));
    for (; !s.next().done; )
      r(s.value.from, s.value.to);
  }
}
function yQ(n, e, t) {
  return (i, r, s) => (!t || t(i, r, s)) && n(s[0], e, i, r);
}
function Ut(n, e, t, i) {
  let r;
  return n.wholeWord && (r = xQ(e.charCategorizer(e.selection.main.head))), n.test && (r = yQ(n.test, e, r)), new mu(e.doc, n.search, { ignoreCase: !n.caseSensitive, test: r }, t, i);
}
function Sr(n, e) {
  return n.slice(se(n, e, !1), e);
}
function yr(n, e) {
  return n.slice(e, se(n, e));
}
function xQ(n) {
  return (e, t, i) => !i[0].length || (n(Sr(i.input, i.index)) != F.Word || n(yr(i.input, i.index)) != F.Word) && (n(yr(i.input, i.index + i[0].length)) != F.Word || n(Sr(i.input, i.index + i[0].length)) != F.Word);
}
class wQ extends bu {
  nextMatch(e, t, i) {
    let r = Ut(this.spec, e, i, e.doc.length).next();
    return r.done && (r = Ut(this.spec, e, 0, t).next()), r.done ? null : r.value;
  }
  prevMatchInRange(e, t, i) {
    for (let r = 1; ; r++) {
      let s = Math.max(
        t,
        i - r * 1e4
        /* FindPrev.ChunkSize */
      ), o = Ut(this.spec, e, s, i), l = null;
      for (; !o.next().done; )
        l = o.value;
      if (l && (s == t || l.from > s + 10))
        return l;
      if (s == t)
        return null;
    }
  }
  prevMatch(e, t, i) {
    return this.prevMatchInRange(e, 0, t) || this.prevMatchInRange(e, i, e.doc.length);
  }
  getReplacement(e) {
    return this.spec.unquote(this.spec.replace).replace(/\$([$&]|\d+)/g, (t, i) => {
      if (i == "&")
        return e.match[0];
      if (i == "$")
        return "$";
      for (let r = i.length; r > 0; r--) {
        let s = +i.slice(0, r);
        if (s > 0 && s < e.match.length)
          return e.match[s] + i.slice(r);
      }
      return t;
    });
  }
  matchAll(e, t) {
    let i = Ut(this.spec, e, 0, e.doc.length), r = [];
    for (; !i.next().done; ) {
      if (r.length >= t)
        return null;
      r.push(i.value);
    }
    return r;
  }
  highlight(e, t, i, r) {
    let s = Ut(this.spec, e, Math.max(
      0,
      t - 250
      /* RegExp.HighlightMargin */
    ), Math.min(i + 250, e.doc.length));
    for (; !s.next().done; )
      r(s.value.from, s.value.to);
  }
}
const en = /* @__PURE__ */ M.define(), ll = /* @__PURE__ */ M.define(), kt = /* @__PURE__ */ oe.define({
  create(n) {
    return new Qs($o(n).create(), null);
  },
  update(n, e) {
    for (let t of e.effects)
      t.is(en) ? n = new Qs(t.value.create(), n.panel) : t.is(ll) && (n = new Qs(n.query, t.value ? al : null));
    return n;
  },
  provide: (n) => Fi.from(n, (e) => e.panel)
});
class Qs {
  constructor(e, t) {
    this.query = e, this.panel = t;
  }
}
const kQ = /* @__PURE__ */ Z.mark({ class: "cm-searchMatch" }), $Q = /* @__PURE__ */ Z.mark({ class: "cm-searchMatch cm-searchMatch-selected" }), PQ = /* @__PURE__ */ ee.fromClass(class {
  constructor(n) {
    this.view = n, this.decorations = this.highlight(n.state.field(kt));
  }
  update(n) {
    let e = n.state.field(kt);
    (e != n.startState.field(kt) || n.docChanged || n.selectionSet || n.viewportChanged) && (this.decorations = this.highlight(e));
  }
  highlight({ query: n, panel: e }) {
    if (!e || !n.spec.valid)
      return Z.none;
    let { view: t } = this, i = new mt();
    for (let r = 0, s = t.visibleRanges, o = s.length; r < o; r++) {
      let { from: l, to: a } = s[r];
      for (; r < o - 1 && a > s[r + 1].from - 2 * 250; )
        a = s[++r].to;
      n.highlight(t.state, l, a, (h, c) => {
        let f = t.state.selection.ranges.some((u) => u.from == h && u.to == c);
        i.add(h, c, f ? $Q : kQ);
      });
    }
    return i.finish();
  }
}, {
  decorations: (n) => n.decorations
});
function mn(n) {
  return (e) => {
    let t = e.state.field(kt, !1);
    return t && t.query.spec.valid ? n(e, t) : xu(e);
  };
}
const xr = /* @__PURE__ */ mn((n, { query: e }) => {
  let { to: t } = n.state.selection.main, i = e.nextMatch(n.state, t, t);
  if (!i)
    return !1;
  let r = b.single(i.from, i.to), s = n.state.facet(wi);
  return n.dispatch({
    selection: r,
    effects: [hl(n, i), s.scrollToMatch(r.main, n)],
    userEvent: "select.search"
  }), yu(n), !0;
}), wr = /* @__PURE__ */ mn((n, { query: e }) => {
  let { state: t } = n, { from: i } = t.selection.main, r = e.prevMatch(t, i, i);
  if (!r)
    return !1;
  let s = b.single(r.from, r.to), o = n.state.facet(wi);
  return n.dispatch({
    selection: s,
    effects: [hl(n, r), o.scrollToMatch(s.main, n)],
    userEvent: "select.search"
  }), yu(n), !0;
}), vQ = /* @__PURE__ */ mn((n, { query: e }) => {
  let t = e.matchAll(n.state, 1e3);
  return !t || !t.length ? !1 : (n.dispatch({
    selection: b.create(t.map((i) => b.range(i.from, i.to))),
    userEvent: "select.search.matches"
  }), !0);
}), TQ = ({ state: n, dispatch: e }) => {
  let t = n.selection;
  if (t.ranges.length > 1 || t.main.empty)
    return !1;
  let { from: i, to: r } = t.main, s = [], o = 0;
  for (let l = new mi(n.doc, n.sliceDoc(i, r)); !l.next().done; ) {
    if (s.length > 1e3)
      return !1;
    l.value.from == i && (o = s.length), s.push(b.range(l.value.from, l.value.to));
  }
  return e(n.update({
    selection: b.create(s, o),
    userEvent: "select.search.matches"
  })), !0;
}, Ka = /* @__PURE__ */ mn((n, { query: e }) => {
  let { state: t } = n, { from: i, to: r } = t.selection.main;
  if (t.readOnly)
    return !1;
  let s = e.nextMatch(t, i, i);
  if (!s)
    return !1;
  let o = s, l = [], a, h, c = [];
  o.from == i && o.to == r && (h = t.toText(e.getReplacement(o)), l.push({ from: o.from, to: o.to, insert: h }), o = e.nextMatch(t, o.from, o.to), c.push(v.announce.of(t.phrase("replaced match on line $", t.doc.lineAt(i).number) + ".")));
  let f = n.state.changes(l);
  return o && (a = b.single(o.from, o.to).map(f), c.push(hl(n, o)), c.push(t.facet(wi).scrollToMatch(a.main, n))), n.dispatch({
    changes: f,
    selection: a,
    effects: c,
    userEvent: "input.replace"
  }), !0;
}), CQ = /* @__PURE__ */ mn((n, { query: e }) => {
  if (n.state.readOnly)
    return !1;
  let t = e.matchAll(n.state, 1e9).map((r) => {
    let { from: s, to: o } = r;
    return { from: s, to: o, insert: e.getReplacement(r) };
  });
  if (!t.length)
    return !1;
  let i = n.state.phrase("replaced $ matches", t.length) + ".";
  return n.dispatch({
    changes: t,
    effects: v.announce.of(i),
    userEvent: "input.replace.all"
  }), !0;
});
function al(n) {
  return n.state.facet(wi).createPanel(n);
}
function $o(n, e) {
  var t, i, r, s, o;
  let l = n.selection.main, a = l.empty || l.to > l.from + 100 ? "" : n.sliceDoc(l.from, l.to);
  if (e && !a)
    return e;
  let h = n.facet(wi);
  return new Qu({
    search: ((t = e == null ? void 0 : e.literal) !== null && t !== void 0 ? t : h.literal) ? a : a.replace(/\n/g, "\\n"),
    caseSensitive: (i = e == null ? void 0 : e.caseSensitive) !== null && i !== void 0 ? i : h.caseSensitive,
    literal: (r = e == null ? void 0 : e.literal) !== null && r !== void 0 ? r : h.literal,
    regexp: (s = e == null ? void 0 : e.regexp) !== null && s !== void 0 ? s : h.regexp,
    wholeWord: (o = e == null ? void 0 : e.wholeWord) !== null && o !== void 0 ? o : h.wholeWord
  });
}
function Su(n) {
  let e = Go(n, al);
  return e && e.dom.querySelector("[main-field]");
}
function yu(n) {
  let e = Su(n);
  e && e == n.root.activeElement && e.select();
}
const xu = (n) => {
  let e = n.state.field(kt, !1);
  if (e && e.panel) {
    let t = Su(n);
    if (t && t != n.root.activeElement) {
      let i = $o(n.state, e.query.spec);
      i.valid && n.dispatch({ effects: en.of(i) }), t.focus(), t.select();
    }
  } else
    n.dispatch({ effects: [
      ll.of(!0),
      e ? en.of($o(n.state, e.query.spec)) : M.appendConfig.of(MQ)
    ] });
  return !0;
}, wu = (n) => {
  let e = n.state.field(kt, !1);
  if (!e || !e.panel)
    return !1;
  let t = Go(n, al);
  return t && t.dom.contains(n.root.activeElement) && n.focus(), n.dispatch({ effects: ll.of(!1) }), !0;
}, ZQ = [
  { key: "Mod-f", run: xu, scope: "editor search-panel" },
  { key: "F3", run: xr, shift: wr, scope: "editor search-panel", preventDefault: !0 },
  { key: "Mod-g", run: xr, shift: wr, scope: "editor search-panel", preventDefault: !0 },
  { key: "Escape", run: wu, scope: "editor search-panel" },
  { key: "Mod-Shift-l", run: TQ },
  { key: "Mod-Alt-g", run: oQ },
  { key: "Mod-d", run: gQ, preventDefault: !0 }
];
class XQ {
  constructor(e) {
    this.view = e;
    let t = this.query = e.state.field(kt).query.spec;
    this.commit = this.commit.bind(this), this.searchField = B("input", {
      value: t.search,
      placeholder: Pe(e, "Find"),
      "aria-label": Pe(e, "Find"),
      class: "cm-textfield",
      name: "search",
      form: "",
      "main-field": "true",
      onchange: this.commit,
      onkeyup: this.commit
    }), this.replaceField = B("input", {
      value: t.replace,
      placeholder: Pe(e, "Replace"),
      "aria-label": Pe(e, "Replace"),
      class: "cm-textfield",
      name: "replace",
      form: "",
      onchange: this.commit,
      onkeyup: this.commit
    }), this.caseField = B("input", {
      type: "checkbox",
      name: "case",
      form: "",
      checked: t.caseSensitive,
      onchange: this.commit
    }), this.reField = B("input", {
      type: "checkbox",
      name: "re",
      form: "",
      checked: t.regexp,
      onchange: this.commit
    }), this.wordField = B("input", {
      type: "checkbox",
      name: "word",
      form: "",
      checked: t.wholeWord,
      onchange: this.commit
    });
    function i(r, s, o) {
      return B("button", { class: "cm-button", name: r, onclick: s, type: "button" }, o);
    }
    this.dom = B("div", { onkeydown: (r) => this.keydown(r), class: "cm-search" }, [
      this.searchField,
      i("next", () => xr(e), [Pe(e, "next")]),
      i("prev", () => wr(e), [Pe(e, "previous")]),
      i("select", () => vQ(e), [Pe(e, "all")]),
      B("label", null, [this.caseField, Pe(e, "match case")]),
      B("label", null, [this.reField, Pe(e, "regexp")]),
      B("label", null, [this.wordField, Pe(e, "by word")]),
      ...e.state.readOnly ? [] : [
        B("br"),
        this.replaceField,
        i("replace", () => Ka(e), [Pe(e, "replace")]),
        i("replaceAll", () => CQ(e), [Pe(e, "replace all")])
      ],
      B("button", {
        name: "close",
        onclick: () => wu(e),
        "aria-label": Pe(e, "close"),
        type: "button"
      }, ["×"])
    ]);
  }
  commit() {
    let e = new Qu({
      search: this.searchField.value,
      caseSensitive: this.caseField.checked,
      regexp: this.reField.checked,
      wholeWord: this.wordField.checked,
      replace: this.replaceField.value
    });
    e.eq(this.query) || (this.query = e, this.view.dispatch({ effects: en.of(e) }));
  }
  keydown(e) {
    Mp(this.view, e, "search-panel") ? e.preventDefault() : e.keyCode == 13 && e.target == this.searchField ? (e.preventDefault(), (e.shiftKey ? wr : xr)(this.view)) : e.keyCode == 13 && e.target == this.replaceField && (e.preventDefault(), Ka(this.view));
  }
  update(e) {
    for (let t of e.transactions)
      for (let i of t.effects)
        i.is(en) && !i.value.eq(this.query) && this.setQuery(i.value);
  }
  setQuery(e) {
    this.query = e, this.searchField.value = e.search, this.replaceField.value = e.replace, this.caseField.checked = e.caseSensitive, this.reField.checked = e.regexp, this.wordField.checked = e.wholeWord;
  }
  mount() {
    this.searchField.select();
  }
  get pos() {
    return 80;
  }
  get top() {
    return this.view.state.facet(wi).top;
  }
}
function Pe(n, e) {
  return n.state.phrase(e);
}
const En = 30, _n = /[\s\.,:;?!]/;
function hl(n, { from: e, to: t }) {
  let i = n.state.doc.lineAt(e), r = n.state.doc.lineAt(t).to, s = Math.max(i.from, e - En), o = Math.min(r, t + En), l = n.state.sliceDoc(s, o);
  if (s != i.from) {
    for (let a = 0; a < En; a++)
      if (!_n.test(l[a + 1]) && _n.test(l[a])) {
        l = l.slice(a);
        break;
      }
  }
  if (o != r) {
    for (let a = l.length - 1; a > l.length - En; a--)
      if (!_n.test(l[a - 1]) && _n.test(l[a])) {
        l = l.slice(0, a);
        break;
      }
  }
  return v.announce.of(`${n.state.phrase("current match")}. ${l} ${n.state.phrase("on line")} ${i.number}.`);
}
const AQ = /* @__PURE__ */ v.baseTheme({
  ".cm-panel.cm-search": {
    padding: "2px 6px 4px",
    position: "relative",
    "& [name=close]": {
      position: "absolute",
      top: "0",
      right: "4px",
      backgroundColor: "inherit",
      border: "none",
      font: "inherit",
      padding: 0,
      margin: 0
    },
    "& input, & button, & label": {
      margin: ".2em .6em .2em 0"
    },
    "& input[type=checkbox]": {
      marginRight: ".2em"
    },
    "& label": {
      fontSize: "80%",
      whiteSpace: "pre"
    }
  },
  "&light .cm-searchMatch": { backgroundColor: "#ffff0054" },
  "&dark .cm-searchMatch": { backgroundColor: "#00ffff8a" },
  "&light .cm-searchMatch-selected": { backgroundColor: "#ff6a0054" },
  "&dark .cm-searchMatch-selected": { backgroundColor: "#ff00ff8a" }
}), MQ = [
  kt,
  /* @__PURE__ */ At.low(PQ),
  AQ
];
class ku {
  /**
  Create a new completion context. (Mostly useful for testing
  completion sources—in the editor, the extension will create
  these for you.)
  */
  constructor(e, t, i, r) {
    this.state = e, this.pos = t, this.explicit = i, this.view = r, this.abortListeners = [], this.abortOnDocChange = !1;
  }
  /**
  Get the extent, content, and (if there is a token) type of the
  token before `this.pos`.
  */
  tokenBefore(e) {
    let t = K(this.state).resolveInner(this.pos, -1);
    for (; t && e.indexOf(t.name) < 0; )
      t = t.parent;
    return t ? {
      from: t.from,
      to: this.pos,
      text: this.state.sliceDoc(t.from, this.pos),
      type: t.type
    } : null;
  }
  /**
  Get the match of the given expression directly before the
  cursor.
  */
  matchBefore(e) {
    let t = this.state.doc.lineAt(this.pos), i = Math.max(t.from, this.pos - 250), r = t.text.slice(i - t.from, this.pos - t.from), s = r.search(Pu(e, !1));
    return s < 0 ? null : { from: i + s, to: this.pos, text: r.slice(s) };
  }
  /**
  Yields true when the query has been aborted. Can be useful in
  asynchronous queries to avoid doing work that will be ignored.
  */
  get aborted() {
    return this.abortListeners == null;
  }
  /**
  Allows you to register abort handlers, which will be called when
  the query is
  [aborted](https://codemirror.net/6/docs/ref/#autocomplete.CompletionContext.aborted).
  
  By default, running queries will not be aborted for regular
  typing or backspacing, on the assumption that they are likely to
  return a result with a
  [`validFor`](https://codemirror.net/6/docs/ref/#autocomplete.CompletionResult.validFor) field that
  allows the result to be used after all. Passing `onDocChange:
  true` will cause this query to be aborted for any document
  change.
  */
  addEventListener(e, t, i) {
    e == "abort" && this.abortListeners && (this.abortListeners.push(t), i && i.onDocChange && (this.abortOnDocChange = !0));
  }
}
function Ja(n) {
  let e = Object.keys(n).join(""), t = /\w/.test(e);
  return t && (e = e.replace(/\w/g, "")), `[${t ? "\\w" : ""}${e.replace(/[^\w\s]/g, "\\$&")}]`;
}
function RQ(n) {
  let e = /* @__PURE__ */ Object.create(null), t = /* @__PURE__ */ Object.create(null);
  for (let { label: r } of n) {
    e[r[0]] = !0;
    for (let s = 1; s < r.length; s++)
      t[r[s]] = !0;
  }
  let i = Ja(e) + Ja(t) + "*$";
  return [new RegExp("^" + i), new RegExp(i)];
}
function $u(n) {
  let e = n.map((r) => typeof r == "string" ? { label: r } : r), [t, i] = e.every((r) => /^\w+$/.test(r.label)) ? [/\w*$/, /\w+$/] : RQ(e);
  return (r) => {
    let s = r.matchBefore(i);
    return s || r.explicit ? { from: s ? s.from : r.pos, options: e, validFor: t } : null;
  };
}
function zQ(n, e) {
  return (t) => {
    for (let i = K(t.state).resolveInner(t.pos, -1); i; i = i.parent) {
      if (n.indexOf(i.name) > -1)
        return null;
      if (i.type.isTop)
        break;
    }
    return e(t);
  };
}
class eh {
  constructor(e, t, i, r) {
    this.completion = e, this.source = t, this.match = i, this.score = r;
  }
}
function Wt(n) {
  return n.selection.main.from;
}
function Pu(n, e) {
  var t;
  let { source: i } = n, r = e && i[0] != "^", s = i[i.length - 1] != "$";
  return !r && !s ? n : new RegExp(`${r ? "^" : ""}(?:${i})${s ? "$" : ""}`, (t = n.flags) !== null && t !== void 0 ? t : n.ignoreCase ? "i" : "");
}
const cl = /* @__PURE__ */ bt.define();
function YQ(n, e, t, i) {
  let { main: r } = n.selection, s = t - r.from, o = i - r.from;
  return {
    ...n.changeByRange((l) => {
      if (l != r && t != i && n.sliceDoc(l.from + s, l.from + o) != n.sliceDoc(t, i))
        return { range: l };
      let a = n.toText(e);
      return {
        changes: { from: l.from + s, to: i == r.from ? l.to : l.from + o, insert: a },
        range: b.cursor(l.from + s + a.length)
      };
    }),
    scrollIntoView: !0,
    userEvent: "input.complete"
  };
}
const th = /* @__PURE__ */ new WeakMap();
function VQ(n) {
  if (!Array.isArray(n))
    return n;
  let e = th.get(n);
  return e || th.set(n, e = $u(n)), e;
}
const kr = /* @__PURE__ */ M.define(), tn = /* @__PURE__ */ M.define();
class EQ {
  constructor(e) {
    this.pattern = e, this.chars = [], this.folded = [], this.any = [], this.precise = [], this.byWord = [], this.score = 0, this.matched = [];
    for (let t = 0; t < e.length; ) {
      let i = Se(e, t), r = et(i);
      this.chars.push(i);
      let s = e.slice(t, t + r), o = s.toUpperCase();
      this.folded.push(Se(o == s ? s.toLowerCase() : o, 0)), t += r;
    }
    this.astral = e.length != this.chars.length;
  }
  ret(e, t) {
    return this.score = e, this.matched = t, this;
  }
  // Matches a given word (completion) against the pattern (input).
  // Will return a boolean indicating whether there was a match and,
  // on success, set `this.score` to the score, `this.matched` to an
  // array of `from, to` pairs indicating the matched parts of `word`.
  //
  // The score is a number that is more negative the worse the match
  // is. See `Penalty` above.
  match(e) {
    if (this.pattern.length == 0)
      return this.ret(-100, []);
    if (e.length < this.pattern.length)
      return null;
    let { chars: t, folded: i, any: r, precise: s, byWord: o } = this;
    if (t.length == 1) {
      let S = Se(e, 0), y = et(S), k = y == e.length ? 0 : -100;
      if (S != t[0]) if (S == i[0])
        k += -200;
      else
        return null;
      return this.ret(k, [0, y]);
    }
    let l = e.indexOf(this.pattern);
    if (l == 0)
      return this.ret(e.length == this.pattern.length ? 0 : -100, [0, this.pattern.length]);
    let a = t.length, h = 0;
    if (l < 0) {
      for (let S = 0, y = Math.min(e.length, 200); S < y && h < a; ) {
        let k = Se(e, S);
        (k == t[h] || k == i[h]) && (r[h++] = S), S += et(k);
      }
      if (h < a)
        return null;
    }
    let c = 0, f = 0, u = !1, d = 0, O = -1, m = -1, g = /[a-z]/.test(e), Q = !0;
    for (let S = 0, y = Math.min(e.length, 200), k = 0; S < y && f < a; ) {
      let x = Se(e, S);
      l < 0 && (c < a && x == t[c] && (s[c++] = S), d < a && (x == t[d] || x == i[d] ? (d == 0 && (O = S), m = S + 1, d++) : d = 0));
      let $, w = x < 255 ? x >= 48 && x <= 57 || x >= 97 && x <= 122 ? 2 : x >= 65 && x <= 90 ? 1 : 0 : ($ = Zo(x)) != $.toLowerCase() ? 1 : $ != $.toUpperCase() ? 2 : 0;
      (!S || w == 1 && g || k == 0 && w != 0) && (t[f] == x || i[f] == x && (u = !0) ? o[f++] = S : o.length && (Q = !1)), k = w, S += et(x);
    }
    return f == a && o[0] == 0 && Q ? this.result(-100 + (u ? -200 : 0), o, e) : d == a && O == 0 ? this.ret(-200 - e.length + (m == e.length ? 0 : -100), [0, m]) : l > -1 ? this.ret(-700 - e.length, [l, l + this.pattern.length]) : d == a ? this.ret(-900 - e.length, [O, m]) : f == a ? this.result(-100 + (u ? -200 : 0) + -700 + (Q ? 0 : -1100), o, e) : t.length == 2 ? null : this.result((r[0] ? -700 : 0) + -200 + -1100, r, e);
  }
  result(e, t, i) {
    let r = [], s = 0;
    for (let o of t) {
      let l = o + (this.astral ? et(Se(i, o)) : 1);
      s && r[s - 1] == o ? r[s - 1] = l : (r[s++] = o, r[s++] = l);
    }
    return this.ret(e - i.length, r);
  }
}
class _Q {
  constructor(e) {
    this.pattern = e, this.matched = [], this.score = 0, this.folded = e.toLowerCase();
  }
  match(e) {
    if (e.length < this.pattern.length)
      return null;
    let t = e.slice(0, this.pattern.length), i = t == this.pattern ? 0 : t.toLowerCase() == this.folded ? -200 : null;
    return i == null ? null : (this.matched = [0, t.length], this.score = i + (e.length == this.pattern.length ? 0 : -100), this);
  }
}
const re = /* @__PURE__ */ T.define({
  combine(n) {
    return at(n, {
      activateOnTyping: !0,
      activateOnCompletion: () => !1,
      activateOnTypingDelay: 100,
      selectOnOpen: !0,
      override: null,
      closeOnBlur: !0,
      maxRenderedOptions: 100,
      defaultKeymap: !0,
      tooltipClass: () => "",
      optionClass: () => "",
      aboveCursor: !1,
      icons: !0,
      addToOptions: [],
      positionInfo: DQ,
      filterStrict: !1,
      compareCompletions: (e, t) => (e.sortText || e.label).localeCompare(t.sortText || t.label),
      interactionDelay: 75,
      updateSyncTime: 100
    }, {
      defaultKeymap: (e, t) => e && t,
      closeOnBlur: (e, t) => e && t,
      icons: (e, t) => e && t,
      tooltipClass: (e, t) => (i) => ih(e(i), t(i)),
      optionClass: (e, t) => (i) => ih(e(i), t(i)),
      addToOptions: (e, t) => e.concat(t),
      filterStrict: (e, t) => e || t
    });
  }
});
function ih(n, e) {
  return n ? e ? n + " " + e : n : e;
}
function DQ(n, e, t, i, r, s) {
  let o = n.textDirection == N.RTL, l = o, a = !1, h = "top", c, f, u = e.left - r.left, d = r.right - e.right, O = i.right - i.left, m = i.bottom - i.top;
  if (l && u < Math.min(O, d) ? l = !1 : !l && d < Math.min(O, u) && (l = !0), O <= (l ? u : d))
    c = Math.max(r.top, Math.min(t.top, r.bottom - m)) - e.top, f = Math.min(400, l ? u : d);
  else {
    a = !0, f = Math.min(
      400,
      (o ? e.right : r.right - e.left) - 30
      /* Info.Margin */
    );
    let S = r.bottom - e.bottom;
    S >= m || S > e.top ? c = t.bottom - e.top : (h = "bottom", c = e.bottom - t.top);
  }
  let g = (e.bottom - e.top) / s.offsetHeight, Q = (e.right - e.left) / s.offsetWidth;
  return {
    style: `${h}: ${c / g}px; max-width: ${f / Q}px`,
    class: "cm-completionInfo-" + (a ? o ? "left-narrow" : "right-narrow" : l ? "left" : "right")
  };
}
function qQ(n) {
  let e = n.addToOptions.slice();
  return n.icons && e.push({
    render(t) {
      let i = document.createElement("div");
      return i.classList.add("cm-completionIcon"), t.type && i.classList.add(...t.type.split(/\s+/g).map((r) => "cm-completionIcon-" + r)), i.setAttribute("aria-hidden", "true"), i;
    },
    position: 20
  }), e.push({
    render(t, i, r, s) {
      let o = document.createElement("span");
      o.className = "cm-completionLabel";
      let l = t.displayLabel || t.label, a = 0;
      for (let h = 0; h < s.length; ) {
        let c = s[h++], f = s[h++];
        c > a && o.appendChild(document.createTextNode(l.slice(a, c)));
        let u = o.appendChild(document.createElement("span"));
        u.appendChild(document.createTextNode(l.slice(c, f))), u.className = "cm-completionMatchedText", a = f;
      }
      return a < l.length && o.appendChild(document.createTextNode(l.slice(a))), o;
    },
    position: 50
  }, {
    render(t) {
      if (!t.detail)
        return null;
      let i = document.createElement("span");
      return i.className = "cm-completionDetail", i.textContent = t.detail, i;
    },
    position: 80
  }), e.sort((t, i) => t.position - i.position).map((t) => t.render);
}
function bs(n, e, t) {
  if (n <= t)
    return { from: 0, to: n };
  if (e < 0 && (e = 0), e <= n >> 1) {
    let r = Math.floor(e / t);
    return { from: r * t, to: (r + 1) * t };
  }
  let i = Math.floor((n - e) / t);
  return { from: n - (i + 1) * t, to: n - i * t };
}
class WQ {
  constructor(e, t, i) {
    this.view = e, this.stateField = t, this.applyCompletion = i, this.info = null, this.infoDestroy = null, this.placeInfoReq = {
      read: () => this.measureInfo(),
      write: (a) => this.placeInfo(a),
      key: this
    }, this.space = null, this.currentClass = "";
    let r = e.state.field(t), { options: s, selected: o } = r.open, l = e.state.facet(re);
    this.optionContent = qQ(l), this.optionClass = l.optionClass, this.tooltipClass = l.tooltipClass, this.range = bs(s.length, o, l.maxRenderedOptions), this.dom = document.createElement("div"), this.dom.className = "cm-tooltip-autocomplete", this.updateTooltipClass(e.state), this.dom.addEventListener("mousedown", (a) => {
      let { options: h } = e.state.field(t).open;
      for (let c = a.target, f; c && c != this.dom; c = c.parentNode)
        if (c.nodeName == "LI" && (f = /-(\d+)$/.exec(c.id)) && +f[1] < h.length) {
          this.applyCompletion(e, h[+f[1]]), a.preventDefault();
          return;
        }
    }), this.dom.addEventListener("focusout", (a) => {
      let h = e.state.field(this.stateField, !1);
      h && h.tooltip && e.state.facet(re).closeOnBlur && a.relatedTarget != e.contentDOM && e.dispatch({ effects: tn.of(null) });
    }), this.showOptions(s, r.id);
  }
  mount() {
    this.updateSel();
  }
  showOptions(e, t) {
    this.list && this.list.remove(), this.list = this.dom.appendChild(this.createListBox(e, t, this.range)), this.list.addEventListener("scroll", () => {
      this.info && this.view.requestMeasure(this.placeInfoReq);
    });
  }
  update(e) {
    var t;
    let i = e.state.field(this.stateField), r = e.startState.field(this.stateField);
    if (this.updateTooltipClass(e.state), i != r) {
      let { options: s, selected: o, disabled: l } = i.open;
      (!r.open || r.open.options != s) && (this.range = bs(s.length, o, e.state.facet(re).maxRenderedOptions), this.showOptions(s, i.id)), this.updateSel(), l != ((t = r.open) === null || t === void 0 ? void 0 : t.disabled) && this.dom.classList.toggle("cm-tooltip-autocomplete-disabled", !!l);
    }
  }
  updateTooltipClass(e) {
    let t = this.tooltipClass(e);
    if (t != this.currentClass) {
      for (let i of this.currentClass.split(" "))
        i && this.dom.classList.remove(i);
      for (let i of t.split(" "))
        i && this.dom.classList.add(i);
      this.currentClass = t;
    }
  }
  positioned(e) {
    this.space = e, this.info && this.view.requestMeasure(this.placeInfoReq);
  }
  updateSel() {
    let e = this.view.state.field(this.stateField), t = e.open;
    (t.selected > -1 && t.selected < this.range.from || t.selected >= this.range.to) && (this.range = bs(t.options.length, t.selected, this.view.state.facet(re).maxRenderedOptions), this.showOptions(t.options, e.id));
    let i = this.updateSelectedOption(t.selected);
    if (i) {
      this.destroyInfo();
      let { completion: r } = t.options[t.selected], { info: s } = r;
      if (!s)
        return;
      let o = typeof s == "string" ? document.createTextNode(s) : s(r);
      if (!o)
        return;
      "then" in o ? o.then((l) => {
        l && this.view.state.field(this.stateField, !1) == e && this.addInfoPane(l, r);
      }).catch((l) => we(this.view.state, l, "completion info")) : (this.addInfoPane(o, r), i.setAttribute("aria-describedby", this.info.id));
    }
  }
  addInfoPane(e, t) {
    this.destroyInfo();
    let i = this.info = document.createElement("div");
    if (i.className = "cm-tooltip cm-completionInfo", i.id = "cm-completionInfo-" + Math.floor(Math.random() * 65535).toString(16), e.nodeType != null)
      i.appendChild(e), this.infoDestroy = null;
    else {
      let { dom: r, destroy: s } = e;
      i.appendChild(r), this.infoDestroy = s || null;
    }
    this.dom.appendChild(i), this.view.requestMeasure(this.placeInfoReq);
  }
  updateSelectedOption(e) {
    let t = null;
    for (let i = this.list.firstChild, r = this.range.from; i; i = i.nextSibling, r++)
      i.nodeName != "LI" || !i.id ? r-- : r == e ? i.hasAttribute("aria-selected") || (i.setAttribute("aria-selected", "true"), t = i) : i.hasAttribute("aria-selected") && (i.removeAttribute("aria-selected"), i.removeAttribute("aria-describedby"));
    return t && BQ(this.list, t), t;
  }
  measureInfo() {
    let e = this.dom.querySelector("[aria-selected]");
    if (!e || !this.info)
      return null;
    let t = this.dom.getBoundingClientRect(), i = this.info.getBoundingClientRect(), r = e.getBoundingClientRect(), s = this.space;
    if (!s) {
      let o = this.dom.ownerDocument.documentElement;
      s = { left: 0, top: 0, right: o.clientWidth, bottom: o.clientHeight };
    }
    return r.top > Math.min(s.bottom, t.bottom) - 10 || r.bottom < Math.max(s.top, t.top) + 10 ? null : this.view.state.facet(re).positionInfo(this.view, t, r, i, s, this.dom);
  }
  placeInfo(e) {
    this.info && (e ? (e.style && (this.info.style.cssText = e.style), this.info.className = "cm-tooltip cm-completionInfo " + (e.class || "")) : this.info.style.cssText = "top: -1e6px");
  }
  createListBox(e, t, i) {
    const r = document.createElement("ul");
    r.id = t, r.setAttribute("role", "listbox"), r.setAttribute("aria-expanded", "true"), r.setAttribute("aria-label", this.view.state.phrase("Completions")), r.addEventListener("mousedown", (o) => {
      o.target == r && o.preventDefault();
    });
    let s = null;
    for (let o = i.from; o < i.to; o++) {
      let { completion: l, match: a } = e[o], { section: h } = l;
      if (h) {
        let u = typeof h == "string" ? h : h.name;
        if (u != s && (o > i.from || i.from == 0))
          if (s = u, typeof h != "string" && h.header)
            r.appendChild(h.header(h));
          else {
            let d = r.appendChild(document.createElement("completion-section"));
            d.textContent = u;
          }
      }
      const c = r.appendChild(document.createElement("li"));
      c.id = t + "-" + o, c.setAttribute("role", "option");
      let f = this.optionClass(l);
      f && (c.className = f);
      for (let u of this.optionContent) {
        let d = u(l, this.view.state, this.view, a);
        d && c.appendChild(d);
      }
    }
    return i.from && r.classList.add("cm-completionListIncompleteTop"), i.to < e.length && r.classList.add("cm-completionListIncompleteBottom"), r;
  }
  destroyInfo() {
    this.info && (this.infoDestroy && this.infoDestroy(), this.info.remove(), this.info = null);
  }
  destroy() {
    this.destroyInfo();
  }
}
function LQ(n, e) {
  return (t) => new WQ(t, n, e);
}
function BQ(n, e) {
  let t = n.getBoundingClientRect(), i = e.getBoundingClientRect(), r = t.height / n.offsetHeight;
  i.top < t.top ? n.scrollTop -= (t.top - i.top) / r : i.bottom > t.bottom && (n.scrollTop += (i.bottom - t.bottom) / r);
}
function nh(n) {
  return (n.boost || 0) * 100 + (n.apply ? 10 : 0) + (n.info ? 5 : 0) + (n.type ? 1 : 0);
}
function IQ(n, e) {
  let t = [], i = null, r = null, s = (c) => {
    t.push(c);
    let { section: f } = c.completion;
    if (f) {
      i || (i = []);
      let u = typeof f == "string" ? f : f.name;
      i.some((d) => d.name == u) || i.push(typeof f == "string" ? { name: u } : f);
    }
  }, o = e.facet(re);
  for (let c of n)
    if (c.hasResult()) {
      let f = c.result.getMatch;
      if (c.result.filter === !1)
        for (let u of c.result.options)
          s(new eh(u, c.source, f ? f(u) : [], 1e9 - t.length));
      else {
        let u = e.sliceDoc(c.from, c.to), d, O = o.filterStrict ? new _Q(u) : new EQ(u);
        for (let m of c.result.options)
          if (d = O.match(m.label)) {
            let g = m.displayLabel ? f ? f(m, d.matched) : [] : d.matched, Q = d.score + (m.boost || 0);
            if (s(new eh(m, c.source, g, Q)), typeof m.section == "object" && m.section.rank === "dynamic") {
              let { name: S } = m.section;
              r || (r = /* @__PURE__ */ Object.create(null)), r[S] = Math.max(Q, r[S] || -1e9);
            }
          }
      }
    }
  if (i) {
    let c = /* @__PURE__ */ Object.create(null), f = 0, u = (d, O) => (d.rank === "dynamic" && O.rank === "dynamic" ? r[O.name] - r[d.name] : 0) || (typeof d.rank == "number" ? d.rank : 1e9) - (typeof O.rank == "number" ? O.rank : 1e9) || (d.name < O.name ? -1 : 1);
    for (let d of i.sort(u))
      f -= 1e5, c[d.name] = f;
    for (let d of t) {
      let { section: O } = d.completion;
      O && (d.score += c[typeof O == "string" ? O : O.name]);
    }
  }
  let l = [], a = null, h = o.compareCompletions;
  for (let c of t.sort((f, u) => u.score - f.score || h(f.completion, u.completion))) {
    let f = c.completion;
    !a || a.label != f.label || a.detail != f.detail || a.type != null && f.type != null && a.type != f.type || a.apply != f.apply || a.boost != f.boost ? l.push(c) : nh(c.completion) > nh(a) && (l[l.length - 1] = c), a = c.completion;
  }
  return l;
}
class ei {
  constructor(e, t, i, r, s, o) {
    this.options = e, this.attrs = t, this.tooltip = i, this.timestamp = r, this.selected = s, this.disabled = o;
  }
  setSelected(e, t) {
    return e == this.selected || e >= this.options.length ? this : new ei(this.options, rh(t, e), this.tooltip, this.timestamp, e, this.disabled);
  }
  static build(e, t, i, r, s, o) {
    if (r && !o && e.some((h) => h.isPending))
      return r.setDisabled();
    let l = IQ(e, t);
    if (!l.length)
      return r && e.some((h) => h.isPending) ? r.setDisabled() : null;
    let a = t.facet(re).selectOnOpen ? 0 : -1;
    if (r && r.selected != a && r.selected != -1) {
      let h = r.options[r.selected].completion;
      for (let c = 0; c < l.length; c++)
        if (l[c].completion == h) {
          a = c;
          break;
        }
    }
    return new ei(l, rh(i, a), {
      pos: e.reduce((h, c) => c.hasResult() ? Math.min(h, c.from) : h, 1e8),
      create: HQ,
      above: s.aboveCursor
    }, r ? r.timestamp : Date.now(), a, !1);
  }
  map(e) {
    return new ei(this.options, this.attrs, { ...this.tooltip, pos: e.mapPos(this.tooltip.pos) }, this.timestamp, this.selected, this.disabled);
  }
  setDisabled() {
    return new ei(this.options, this.attrs, this.tooltip, this.timestamp, this.selected, !0);
  }
}
class $r {
  constructor(e, t, i) {
    this.active = e, this.id = t, this.open = i;
  }
  static start() {
    return new $r(UQ, "cm-ac-" + Math.floor(Math.random() * 2e6).toString(36), null);
  }
  update(e) {
    let { state: t } = e, i = t.facet(re), s = (i.override || t.languageDataAt("autocomplete", Wt(t)).map(VQ)).map((a) => (this.active.find((c) => c.source == a) || new Ee(
      a,
      this.active.some(
        (c) => c.state != 0
        /* State.Inactive */
      ) ? 1 : 0
      /* State.Inactive */
    )).update(e, i));
    s.length == this.active.length && s.every((a, h) => a == this.active[h]) && (s = this.active);
    let o = this.open, l = e.effects.some((a) => a.is(fl));
    o && e.docChanged && (o = o.map(e.changes)), e.selection || s.some((a) => a.hasResult() && e.changes.touchesRange(a.from, a.to)) || !jQ(s, this.active) || l ? o = ei.build(s, t, this.id, o, i, l) : o && o.disabled && !s.some((a) => a.isPending) && (o = null), !o && s.every((a) => !a.isPending) && s.some((a) => a.hasResult()) && (s = s.map((a) => a.hasResult() ? new Ee(
      a.source,
      0
      /* State.Inactive */
    ) : a));
    for (let a of e.effects)
      a.is(Tu) && (o = o && o.setSelected(a.value, this.id));
    return s == this.active && o == this.open ? this : new $r(s, this.id, o);
  }
  get tooltip() {
    return this.open ? this.open.tooltip : null;
  }
  get attrs() {
    return this.open ? this.open.attrs : this.active.length ? NQ : GQ;
  }
}
function jQ(n, e) {
  if (n == e)
    return !0;
  for (let t = 0, i = 0; ; ) {
    for (; t < n.length && !n[t].hasResult(); )
      t++;
    for (; i < e.length && !e[i].hasResult(); )
      i++;
    let r = t == n.length, s = i == e.length;
    if (r || s)
      return r == s;
    if (n[t++].result != e[i++].result)
      return !1;
  }
}
const NQ = {
  "aria-autocomplete": "list"
}, GQ = {};
function rh(n, e) {
  let t = {
    "aria-autocomplete": "list",
    "aria-haspopup": "listbox",
    "aria-controls": n
  };
  return e > -1 && (t["aria-activedescendant"] = n + "-" + e), t;
}
const UQ = [];
function vu(n, e) {
  if (n.isUserEvent("input.complete")) {
    let i = n.annotation(cl);
    if (i && e.activateOnCompletion(i))
      return 12;
  }
  let t = n.isUserEvent("input.type");
  return t && e.activateOnTyping ? 5 : t ? 1 : n.isUserEvent("delete.backward") ? 2 : n.selection ? 8 : n.docChanged ? 16 : 0;
}
class Ee {
  constructor(e, t, i = !1) {
    this.source = e, this.state = t, this.explicit = i;
  }
  hasResult() {
    return !1;
  }
  get isPending() {
    return this.state == 1;
  }
  update(e, t) {
    let i = vu(e, t), r = this;
    (i & 8 || i & 16 && this.touches(e)) && (r = new Ee(
      r.source,
      0
      /* State.Inactive */
    )), i & 4 && r.state == 0 && (r = new Ee(
      this.source,
      1
      /* State.Pending */
    )), r = r.updateFor(e, i);
    for (let s of e.effects)
      if (s.is(kr))
        r = new Ee(r.source, 1, s.value);
      else if (s.is(tn))
        r = new Ee(
          r.source,
          0
          /* State.Inactive */
        );
      else if (s.is(fl))
        for (let o of s.value)
          o.source == r.source && (r = o);
    return r;
  }
  updateFor(e, t) {
    return this.map(e.changes);
  }
  map(e) {
    return this;
  }
  touches(e) {
    return e.changes.touchesRange(Wt(e.state));
  }
}
class li extends Ee {
  constructor(e, t, i, r, s, o) {
    super(e, 3, t), this.limit = i, this.result = r, this.from = s, this.to = o;
  }
  hasResult() {
    return !0;
  }
  updateFor(e, t) {
    var i;
    if (!(t & 3))
      return this.map(e.changes);
    let r = this.result;
    r.map && !e.changes.empty && (r = r.map(r, e.changes));
    let s = e.changes.mapPos(this.from), o = e.changes.mapPos(this.to, 1), l = Wt(e.state);
    if (l > o || !r || t & 2 && (Wt(e.startState) == this.from || l < this.limit))
      return new Ee(
        this.source,
        t & 4 ? 1 : 0
        /* State.Inactive */
      );
    let a = e.changes.mapPos(this.limit);
    return FQ(r.validFor, e.state, s, o) ? new li(this.source, this.explicit, a, r, s, o) : r.update && (r = r.update(r, s, o, new ku(e.state, l, !1))) ? new li(this.source, this.explicit, a, r, r.from, (i = r.to) !== null && i !== void 0 ? i : Wt(e.state)) : new Ee(this.source, 1, this.explicit);
  }
  map(e) {
    return e.empty ? this : (this.result.map ? this.result.map(this.result, e) : this.result) ? new li(this.source, this.explicit, e.mapPos(this.limit), this.result, e.mapPos(this.from), e.mapPos(this.to, 1)) : new Ee(
      this.source,
      0
      /* State.Inactive */
    );
  }
  touches(e) {
    return e.changes.touchesRange(this.from, this.to);
  }
}
function FQ(n, e, t, i) {
  if (!n)
    return !1;
  let r = e.sliceDoc(t, i);
  return typeof n == "function" ? n(r, t, i, e) : Pu(n, !0).test(r);
}
const fl = /* @__PURE__ */ M.define({
  map(n, e) {
    return n.map((t) => t.map(e));
  }
}), Tu = /* @__PURE__ */ M.define(), ye = /* @__PURE__ */ oe.define({
  create() {
    return $r.start();
  },
  update(n, e) {
    return n.update(e);
  },
  provide: (n) => [
    No.from(n, (e) => e.tooltip),
    v.contentAttributes.from(n, (e) => e.attrs)
  ]
});
function ul(n, e) {
  const t = e.completion.apply || e.completion.label;
  let i = n.state.field(ye).active.find((r) => r.source == e.source);
  return i instanceof li ? (typeof t == "string" ? n.dispatch({
    ...YQ(n.state, t, i.from, i.to),
    annotations: cl.of(e.completion)
  }) : t(n, e.completion, i.from, i.to), !0) : !1;
}
const HQ = /* @__PURE__ */ LQ(ye, ul);
function Dn(n, e = "option") {
  return (t) => {
    let i = t.state.field(ye, !1);
    if (!i || !i.open || i.open.disabled || Date.now() - i.open.timestamp < t.state.facet(re).interactionDelay)
      return !1;
    let r = 1, s;
    e == "page" && (s = sf(t, i.open.tooltip)) && (r = Math.max(2, Math.floor(s.dom.offsetHeight / s.dom.querySelector("li").offsetHeight) - 1));
    let { length: o } = i.open.options, l = i.open.selected > -1 ? i.open.selected + r * (n ? 1 : -1) : n ? 0 : o - 1;
    return l < 0 ? l = e == "page" ? 0 : o - 1 : l >= o && (l = e == "page" ? o - 1 : 0), t.dispatch({ effects: Tu.of(l) }), !0;
  };
}
const Cu = (n) => {
  let e = n.state.field(ye, !1);
  return n.state.readOnly || !e || !e.open || e.open.selected < 0 || e.open.disabled || Date.now() - e.open.timestamp < n.state.facet(re).interactionDelay ? !1 : ul(n, e.open.options[e.open.selected]);
}, Ss = (n) => n.state.field(ye, !1) ? (n.dispatch({ effects: kr.of(!0) }), !0) : !1, KQ = (n) => {
  let e = n.state.field(ye, !1);
  return !e || !e.active.some(
    (t) => t.state != 0
    /* State.Inactive */
  ) ? !1 : (n.dispatch({ effects: tn.of(null) }), !0);
};
class JQ {
  constructor(e, t) {
    this.active = e, this.context = t, this.time = Date.now(), this.updates = [], this.done = void 0;
  }
}
const eb = 50, tb = 1e3, ib = /* @__PURE__ */ ee.fromClass(class {
  constructor(n) {
    this.view = n, this.debounceUpdate = -1, this.running = [], this.debounceAccept = -1, this.pendingStart = !1, this.composing = 0;
    for (let e of n.state.field(ye).active)
      e.isPending && this.startQuery(e);
  }
  update(n) {
    let e = n.state.field(ye), t = n.state.facet(re);
    if (!n.selectionSet && !n.docChanged && n.startState.field(ye) == e)
      return;
    let i = n.transactions.some((s) => {
      let o = vu(s, t);
      return o & 8 || (s.selection || s.docChanged) && !(o & 3);
    });
    for (let s = 0; s < this.running.length; s++) {
      let o = this.running[s];
      if (i || o.context.abortOnDocChange && n.docChanged || o.updates.length + n.transactions.length > eb && Date.now() - o.time > tb) {
        for (let l of o.context.abortListeners)
          try {
            l();
          } catch (a) {
            we(this.view.state, a);
          }
        o.context.abortListeners = null, this.running.splice(s--, 1);
      } else
        o.updates.push(...n.transactions);
    }
    this.debounceUpdate > -1 && clearTimeout(this.debounceUpdate), n.transactions.some((s) => s.effects.some((o) => o.is(kr))) && (this.pendingStart = !0);
    let r = this.pendingStart ? 50 : t.activateOnTypingDelay;
    if (this.debounceUpdate = e.active.some((s) => s.isPending && !this.running.some((o) => o.active.source == s.source)) ? setTimeout(() => this.startUpdate(), r) : -1, this.composing != 0)
      for (let s of n.transactions)
        s.isUserEvent("input.type") ? this.composing = 2 : this.composing == 2 && s.selection && (this.composing = 3);
  }
  startUpdate() {
    this.debounceUpdate = -1, this.pendingStart = !1;
    let { state: n } = this.view, e = n.field(ye);
    for (let t of e.active)
      t.isPending && !this.running.some((i) => i.active.source == t.source) && this.startQuery(t);
    this.running.length && e.open && e.open.disabled && (this.debounceAccept = setTimeout(() => this.accept(), this.view.state.facet(re).updateSyncTime));
  }
  startQuery(n) {
    let { state: e } = this.view, t = Wt(e), i = new ku(e, t, n.explicit, this.view), r = new JQ(n, i);
    this.running.push(r), Promise.resolve(n.source(i)).then((s) => {
      r.context.aborted || (r.done = s || null, this.scheduleAccept());
    }, (s) => {
      this.view.dispatch({ effects: tn.of(null) }), we(this.view.state, s);
    });
  }
  scheduleAccept() {
    this.running.every((n) => n.done !== void 0) ? this.accept() : this.debounceAccept < 0 && (this.debounceAccept = setTimeout(() => this.accept(), this.view.state.facet(re).updateSyncTime));
  }
  // For each finished query in this.running, try to create a result
  // or, if appropriate, restart the query.
  accept() {
    var n;
    this.debounceAccept > -1 && clearTimeout(this.debounceAccept), this.debounceAccept = -1;
    let e = [], t = this.view.state.facet(re), i = this.view.state.field(ye);
    for (let r = 0; r < this.running.length; r++) {
      let s = this.running[r];
      if (s.done === void 0)
        continue;
      if (this.running.splice(r--, 1), s.done) {
        let l = Wt(s.updates.length ? s.updates[0].startState : this.view.state), a = Math.min(l, s.done.from + (s.active.explicit ? 0 : 1)), h = new li(s.active.source, s.active.explicit, a, s.done, s.done.from, (n = s.done.to) !== null && n !== void 0 ? n : l);
        for (let c of s.updates)
          h = h.update(c, t);
        if (h.hasResult()) {
          e.push(h);
          continue;
        }
      }
      let o = i.active.find((l) => l.source == s.active.source);
      if (o && o.isPending)
        if (s.done == null) {
          let l = new Ee(
            s.active.source,
            0
            /* State.Inactive */
          );
          for (let a of s.updates)
            l = l.update(a, t);
          l.isPending || e.push(l);
        } else
          this.startQuery(o);
    }
    (e.length || i.open && i.open.disabled) && this.view.dispatch({ effects: fl.of(e) });
  }
}, {
  eventHandlers: {
    blur(n) {
      let e = this.view.state.field(ye, !1);
      if (e && e.tooltip && this.view.state.facet(re).closeOnBlur) {
        let t = e.open && sf(this.view, e.open.tooltip);
        (!t || !t.dom.contains(n.relatedTarget)) && setTimeout(() => this.view.dispatch({ effects: tn.of(null) }), 10);
      }
    },
    compositionstart() {
      this.composing = 1;
    },
    compositionend() {
      this.composing == 3 && setTimeout(() => this.view.dispatch({ effects: kr.of(!1) }), 20), this.composing = 0;
    }
  }
}), nb = typeof navigator == "object" && /* @__PURE__ */ /Win/.test(navigator.platform), rb = /* @__PURE__ */ At.highest(/* @__PURE__ */ v.domEventHandlers({
  keydown(n, e) {
    let t = e.state.field(ye, !1);
    if (!t || !t.open || t.open.disabled || t.open.selected < 0 || n.key.length > 1 || n.ctrlKey && !(nb && n.altKey) || n.metaKey)
      return !1;
    let i = t.open.options[t.open.selected], r = t.active.find((o) => o.source == i.source), s = i.completion.commitCharacters || r.result.commitCharacters;
    return s && s.indexOf(n.key) > -1 && ul(e, i), !1;
  }
})), Zu = /* @__PURE__ */ v.baseTheme({
  ".cm-tooltip.cm-tooltip-autocomplete": {
    "& > ul": {
      fontFamily: "monospace",
      whiteSpace: "nowrap",
      overflow: "hidden auto",
      maxWidth_fallback: "700px",
      maxWidth: "min(700px, 95vw)",
      minWidth: "250px",
      maxHeight: "10em",
      height: "100%",
      listStyle: "none",
      margin: 0,
      padding: 0,
      "& > li, & > completion-section": {
        padding: "1px 3px",
        lineHeight: 1.2
      },
      "& > li": {
        overflowX: "hidden",
        textOverflow: "ellipsis",
        cursor: "pointer"
      },
      "& > completion-section": {
        display: "list-item",
        borderBottom: "1px solid silver",
        paddingLeft: "0.5em",
        opacity: 0.7
      }
    }
  },
  "&light .cm-tooltip-autocomplete ul li[aria-selected]": {
    background: "#17c",
    color: "white"
  },
  "&light .cm-tooltip-autocomplete-disabled ul li[aria-selected]": {
    background: "#777"
  },
  "&dark .cm-tooltip-autocomplete ul li[aria-selected]": {
    background: "#347",
    color: "white"
  },
  "&dark .cm-tooltip-autocomplete-disabled ul li[aria-selected]": {
    background: "#444"
  },
  ".cm-completionListIncompleteTop:before, .cm-completionListIncompleteBottom:after": {
    content: '"···"',
    opacity: 0.5,
    display: "block",
    textAlign: "center"
  },
  ".cm-tooltip.cm-completionInfo": {
    position: "absolute",
    padding: "3px 9px",
    width: "max-content",
    maxWidth: "400px",
    boxSizing: "border-box",
    whiteSpace: "pre-line"
  },
  ".cm-completionInfo.cm-completionInfo-left": { right: "100%" },
  ".cm-completionInfo.cm-completionInfo-right": { left: "100%" },
  ".cm-completionInfo.cm-completionInfo-left-narrow": { right: "30px" },
  ".cm-completionInfo.cm-completionInfo-right-narrow": { left: "30px" },
  "&light .cm-snippetField": { backgroundColor: "#00000022" },
  "&dark .cm-snippetField": { backgroundColor: "#ffffff22" },
  ".cm-snippetFieldPosition": {
    verticalAlign: "text-top",
    width: 0,
    height: "1.15em",
    display: "inline-block",
    margin: "0 -0.7px -.7em",
    borderLeft: "1.4px dotted #888"
  },
  ".cm-completionMatchedText": {
    textDecoration: "underline"
  },
  ".cm-completionDetail": {
    marginLeft: "0.5em",
    fontStyle: "italic"
  },
  ".cm-completionIcon": {
    fontSize: "90%",
    width: ".8em",
    display: "inline-block",
    textAlign: "center",
    paddingRight: ".6em",
    opacity: "0.6",
    boxSizing: "content-box"
  },
  ".cm-completionIcon-function, .cm-completionIcon-method": {
    "&:after": { content: "'ƒ'" }
  },
  ".cm-completionIcon-class": {
    "&:after": { content: "'○'" }
  },
  ".cm-completionIcon-interface": {
    "&:after": { content: "'◌'" }
  },
  ".cm-completionIcon-variable": {
    "&:after": { content: "'𝑥'" }
  },
  ".cm-completionIcon-constant": {
    "&:after": { content: "'𝐶'" }
  },
  ".cm-completionIcon-type": {
    "&:after": { content: "'𝑡'" }
  },
  ".cm-completionIcon-enum": {
    "&:after": { content: "'∪'" }
  },
  ".cm-completionIcon-property": {
    "&:after": { content: "'□'" }
  },
  ".cm-completionIcon-keyword": {
    "&:after": { content: "'🔑︎'" }
    // Disable emoji rendering
  },
  ".cm-completionIcon-namespace": {
    "&:after": { content: "'▢'" }
  },
  ".cm-completionIcon-text": {
    "&:after": { content: "'abc'", fontSize: "50%", verticalAlign: "middle" }
  }
});
class sb {
  constructor(e, t, i, r) {
    this.field = e, this.line = t, this.from = i, this.to = r;
  }
}
class dl {
  constructor(e, t, i) {
    this.field = e, this.from = t, this.to = i;
  }
  map(e) {
    let t = e.mapPos(this.from, -1, ce.TrackDel), i = e.mapPos(this.to, 1, ce.TrackDel);
    return t == null || i == null ? null : new dl(this.field, t, i);
  }
}
class Ol {
  constructor(e, t) {
    this.lines = e, this.fieldPositions = t;
  }
  instantiate(e, t) {
    let i = [], r = [t], s = e.doc.lineAt(t), o = /^\s*/.exec(s.text)[0];
    for (let a of this.lines) {
      if (i.length) {
        let h = o, c = /^\t*/.exec(a)[0].length;
        for (let f = 0; f < c; f++)
          h += e.facet(dn);
        r.push(t + h.length - c), a = h + a.slice(c);
      }
      i.push(a), t += a.length + 1;
    }
    let l = this.fieldPositions.map((a) => new dl(a.field, r[a.line] + a.from, r[a.line] + a.to));
    return { text: i, ranges: l };
  }
  static parse(e) {
    let t = [], i = [], r = [], s;
    for (let o of e.split(/\r\n?|\n/)) {
      for (; s = /[#$]\{(?:(\d+)(?::([^{}]*))?|((?:\\[{}]|[^{}])*))\}/.exec(o); ) {
        let l = s[1] ? +s[1] : null, a = s[2] || s[3] || "", h = -1, c = a.replace(/\\[{}]/g, (f) => f[1]);
        for (let f = 0; f < t.length; f++)
          (l != null ? t[f].seq == l : c && t[f].name == c) && (h = f);
        if (h < 0) {
          let f = 0;
          for (; f < t.length && (l == null || t[f].seq != null && t[f].seq < l); )
            f++;
          t.splice(f, 0, { seq: l, name: c }), h = f;
          for (let u of r)
            u.field >= h && u.field++;
        }
        for (let f of r)
          if (f.line == i.length && f.from > s.index) {
            let u = s[2] ? 3 + (s[1] || "").length : 2;
            f.from -= u, f.to -= u;
          }
        r.push(new sb(h, i.length, s.index, s.index + c.length)), o = o.slice(0, s.index) + a + o.slice(s.index + s[0].length);
      }
      o = o.replace(/\\([{}])/g, (l, a, h) => {
        for (let c of r)
          c.line == i.length && c.from > h && (c.from--, c.to--);
        return a;
      }), i.push(o);
    }
    return new Ol(i, r);
  }
}
let ob = /* @__PURE__ */ Z.widget({ widget: /* @__PURE__ */ new class extends ht {
  toDOM() {
    let n = document.createElement("span");
    return n.className = "cm-snippetFieldPosition", n;
  }
  ignoreEvent() {
    return !1;
  }
}() }), lb = /* @__PURE__ */ Z.mark({ class: "cm-snippetField" });
class ki {
  constructor(e, t) {
    this.ranges = e, this.active = t, this.deco = Z.set(e.map((i) => (i.from == i.to ? ob : lb).range(i.from, i.to)), !0);
  }
  map(e) {
    let t = [];
    for (let i of this.ranges) {
      let r = i.map(e);
      if (!r)
        return null;
      t.push(r);
    }
    return new ki(t, this.active);
  }
  selectionInsideField(e) {
    return e.ranges.every((t) => this.ranges.some((i) => i.field == this.active && i.from <= t.from && i.to >= t.to));
  }
}
const gn = /* @__PURE__ */ M.define({
  map(n, e) {
    return n && n.map(e);
  }
}), ab = /* @__PURE__ */ M.define(), nn = /* @__PURE__ */ oe.define({
  create() {
    return null;
  },
  update(n, e) {
    for (let t of e.effects) {
      if (t.is(gn))
        return t.value;
      if (t.is(ab) && n)
        return new ki(n.ranges, t.value);
    }
    return n && e.docChanged && (n = n.map(e.changes)), n && e.selection && !n.selectionInsideField(e.selection) && (n = null), n;
  },
  provide: (n) => v.decorations.from(n, (e) => e ? e.deco : Z.none)
});
function pl(n, e) {
  return b.create(n.filter((t) => t.field == e).map((t) => b.range(t.from, t.to)));
}
function hb(n) {
  let e = Ol.parse(n);
  return (t, i, r, s) => {
    let { text: o, ranges: l } = e.instantiate(t.state, r), { main: a } = t.state.selection, h = {
      changes: { from: r, to: s == a.from ? a.to : s, insert: D.of(o) },
      scrollIntoView: !0,
      annotations: i ? [cl.of(i), te.userEvent.of("input.complete")] : void 0
    };
    if (l.length && (h.selection = pl(l, 0)), l.some((c) => c.field > 0)) {
      let c = new ki(l, 0), f = h.effects = [gn.of(c)];
      t.state.field(nn, !1) === void 0 && f.push(M.appendConfig.of([nn, Ob, pb, Zu]));
    }
    t.dispatch(t.state.update(h));
  };
}
function Xu(n) {
  return ({ state: e, dispatch: t }) => {
    let i = e.field(nn, !1);
    if (!i || n < 0 && i.active == 0)
      return !1;
    let r = i.active + n, s = n > 0 && !i.ranges.some((o) => o.field == r + n);
    return t(e.update({
      selection: pl(i.ranges, r),
      effects: gn.of(s ? null : new ki(i.ranges, r)),
      scrollIntoView: !0
    })), !0;
  };
}
const cb = ({ state: n, dispatch: e }) => n.field(nn, !1) ? (e(n.update({ effects: gn.of(null) })), !0) : !1, fb = /* @__PURE__ */ Xu(1), ub = /* @__PURE__ */ Xu(-1), db = [
  { key: "Tab", run: fb, shift: ub },
  { key: "Escape", run: cb }
], sh = /* @__PURE__ */ T.define({
  combine(n) {
    return n.length ? n[0] : db;
  }
}), Ob = /* @__PURE__ */ At.highest(/* @__PURE__ */ fn.compute([sh], (n) => n.facet(sh)));
function be(n, e) {
  return { ...e, apply: hb(n) };
}
const pb = /* @__PURE__ */ v.domEventHandlers({
  mousedown(n, e) {
    let t = e.state.field(nn, !1), i;
    if (!t || (i = e.posAtCoords({ x: n.clientX, y: n.clientY })) == null)
      return !1;
    let r = t.ranges.find((s) => s.from <= i && s.to >= i);
    return !r || r.field == t.active ? !1 : (e.dispatch({
      selection: pl(t.ranges, r.field),
      effects: gn.of(t.ranges.some((s) => s.field > r.field) ? new ki(t.ranges, r.field) : null),
      scrollIntoView: !0
    }), !0);
  }
}), rn = {
  brackets: ["(", "[", "{", "'", '"'],
  before: ")]}:;>",
  stringPrefixes: []
}, qt = /* @__PURE__ */ M.define({
  map(n, e) {
    let t = e.mapPos(n, -1, ce.TrackAfter);
    return t ?? void 0;
  }
}), ml = /* @__PURE__ */ new class extends $t {
}();
ml.startSide = 1;
ml.endSide = -1;
const Au = /* @__PURE__ */ oe.define({
  create() {
    return E.empty;
  },
  update(n, e) {
    if (n = n.map(e.changes), e.selection) {
      let t = e.state.doc.lineAt(e.selection.main.head);
      n = n.update({ filter: (i) => i >= t.from && i <= t.to });
    }
    for (let t of e.effects)
      t.is(qt) && (n = n.update({ add: [ml.range(t.value, t.value + 1)] }));
    return n;
  }
});
function Mu() {
  return [gb, Au];
}
const ys = "()[]{}<>«»»«［］｛｝";
function Ru(n) {
  for (let e = 0; e < ys.length; e += 2)
    if (ys.charCodeAt(e) == n)
      return ys.charAt(e + 1);
  return Zo(n < 128 ? n : n + 1);
}
function zu(n, e) {
  return n.languageDataAt("closeBrackets", e)[0] || rn;
}
const mb = typeof navigator == "object" && /* @__PURE__ */ /Android\b/.test(navigator.userAgent), gb = /* @__PURE__ */ v.inputHandler.of((n, e, t, i) => {
  if ((mb ? n.composing : n.compositionStarted) || n.state.readOnly)
    return !1;
  let r = n.state.selection.main;
  if (i.length > 2 || i.length == 2 && et(Se(i, 0)) == 1 || e != r.from || t != r.to)
    return !1;
  let s = Sb(n.state, i);
  return s ? (n.dispatch(s), !0) : !1;
}), Qb = ({ state: n, dispatch: e }) => {
  if (n.readOnly)
    return !1;
  let i = zu(n, n.selection.main.head).brackets || rn.brackets, r = null, s = n.changeByRange((o) => {
    if (o.empty) {
      let l = yb(n.doc, o.head);
      for (let a of i)
        if (a == l && Nr(n.doc, o.head) == Ru(Se(a, 0)))
          return {
            changes: { from: o.head - a.length, to: o.head + a.length },
            range: b.cursor(o.head - a.length)
          };
    }
    return { range: r = o };
  });
  return r || e(n.update(s, { scrollIntoView: !0, userEvent: "delete.backward" })), !r;
}, bb = [
  { key: "Backspace", run: Qb }
];
function Sb(n, e) {
  let t = zu(n, n.selection.main.head), i = t.brackets || rn.brackets;
  for (let r of i) {
    let s = Ru(Se(r, 0));
    if (e == r)
      return s == r ? kb(n, r, i.indexOf(r + r + r) > -1, t) : xb(n, r, s, t.before || rn.before);
    if (e == s && Yu(n, n.selection.main.from))
      return wb(n, r, s);
  }
  return null;
}
function Yu(n, e) {
  let t = !1;
  return n.field(Au).between(0, n.doc.length, (i) => {
    i == e && (t = !0);
  }), t;
}
function Nr(n, e) {
  let t = n.sliceString(e, e + 2);
  return t.slice(0, et(Se(t, 0)));
}
function yb(n, e) {
  let t = n.sliceString(e - 2, e);
  return et(Se(t, 0)) == t.length ? t : t.slice(1);
}
function xb(n, e, t, i) {
  let r = null, s = n.changeByRange((o) => {
    if (!o.empty)
      return {
        changes: [{ insert: e, from: o.from }, { insert: t, from: o.to }],
        effects: qt.of(o.to + e.length),
        range: b.range(o.anchor + e.length, o.head + e.length)
      };
    let l = Nr(n.doc, o.head);
    return !l || /\s/.test(l) || i.indexOf(l) > -1 ? {
      changes: { insert: e + t, from: o.head },
      effects: qt.of(o.head + e.length),
      range: b.cursor(o.head + e.length)
    } : { range: r = o };
  });
  return r ? null : n.update(s, {
    scrollIntoView: !0,
    userEvent: "input.type"
  });
}
function wb(n, e, t) {
  let i = null, r = n.changeByRange((s) => s.empty && Nr(n.doc, s.head) == t ? {
    changes: { from: s.head, to: s.head + t.length, insert: t },
    range: b.cursor(s.head + t.length)
  } : i = { range: s });
  return i ? null : n.update(r, {
    scrollIntoView: !0,
    userEvent: "input.type"
  });
}
function kb(n, e, t, i) {
  let r = i.stringPrefixes || rn.stringPrefixes, s = null, o = n.changeByRange((l) => {
    if (!l.empty)
      return {
        changes: [{ insert: e, from: l.from }, { insert: e, from: l.to }],
        effects: qt.of(l.to + e.length),
        range: b.range(l.anchor + e.length, l.head + e.length)
      };
    let a = l.head, h = Nr(n.doc, a), c;
    if (h == e) {
      if (oh(n, a))
        return {
          changes: { insert: e + e, from: a },
          effects: qt.of(a + e.length),
          range: b.cursor(a + e.length)
        };
      if (Yu(n, a)) {
        let u = t && n.sliceDoc(a, a + e.length * 3) == e + e + e ? e + e + e : e;
        return {
          changes: { from: a, to: a + u.length, insert: u },
          range: b.cursor(a + u.length)
        };
      }
    } else {
      if (t && n.sliceDoc(a - 2 * e.length, a) == e + e && (c = lh(n, a - 2 * e.length, r)) > -1 && oh(n, c))
        return {
          changes: { insert: e + e + e + e, from: a },
          effects: qt.of(a + e.length),
          range: b.cursor(a + e.length)
        };
      if (n.charCategorizer(a)(h) != F.Word && lh(n, a, r) > -1 && !$b(n, a, e, r))
        return {
          changes: { insert: e + e, from: a },
          effects: qt.of(a + e.length),
          range: b.cursor(a + e.length)
        };
    }
    return { range: s = l };
  });
  return s ? null : n.update(o, {
    scrollIntoView: !0,
    userEvent: "input.type"
  });
}
function oh(n, e) {
  let t = K(n).resolveInner(e + 1);
  return t.parent && t.from == e;
}
function $b(n, e, t, i) {
  let r = K(n).resolveInner(e, -1), s = i.reduce((o, l) => Math.max(o, l.length), 0);
  for (let o = 0; o < 5; o++) {
    let l = n.sliceDoc(r.from, Math.min(r.to, r.from + t.length + s)), a = l.indexOf(t);
    if (!a || a > -1 && i.indexOf(l.slice(0, a)) > -1) {
      let c = r.firstChild;
      for (; c && c.from == r.from && c.to - c.from > t.length + a; ) {
        if (n.sliceDoc(c.to - t.length, c.to) == t)
          return !1;
        c = c.firstChild;
      }
      return !0;
    }
    let h = r.to == e && r.parent;
    if (!h)
      break;
    r = h;
  }
  return !1;
}
function lh(n, e, t) {
  let i = n.charCategorizer(e);
  if (i(n.sliceDoc(e - 1, e)) != F.Word)
    return e;
  for (let r of t) {
    let s = e - r.length;
    if (n.sliceDoc(s, e) == r && i(n.sliceDoc(s - 1, s)) != F.Word)
      return s;
  }
  return -1;
}
function Pb(n = {}) {
  return [
    rb,
    ye,
    re.of(n),
    ib,
    vb,
    Zu
  ];
}
const Vu = [
  { key: "Ctrl-Space", run: Ss },
  { mac: "Alt-`", run: Ss },
  { mac: "Alt-i", run: Ss },
  { key: "Escape", run: KQ },
  { key: "ArrowDown", run: /* @__PURE__ */ Dn(!0) },
  { key: "ArrowUp", run: /* @__PURE__ */ Dn(!1) },
  { key: "PageDown", run: /* @__PURE__ */ Dn(!0, "page") },
  { key: "PageUp", run: /* @__PURE__ */ Dn(!1, "page") },
  { key: "Enter", run: Cu }
], vb = /* @__PURE__ */ At.highest(/* @__PURE__ */ fn.computeN([re], (n) => n.facet(re).defaultKeymap ? [Vu] : []));
class ah {
  constructor(e, t, i) {
    this.from = e, this.to = t, this.diagnostic = i;
  }
}
class Et {
  constructor(e, t, i) {
    this.diagnostics = e, this.panel = t, this.selected = i;
  }
  static init(e, t, i) {
    let r = i.facet(sn).markerFilter;
    r && (e = r(e, i));
    let s = e.slice().sort((d, O) => d.from - O.from || d.to - O.to), o = new mt(), l = [], a = 0, h = i.doc.iter(), c = 0, f = i.doc.length;
    for (let d = 0; ; ) {
      let O = d == s.length ? null : s[d];
      if (!O && !l.length)
        break;
      let m, g;
      if (l.length)
        m = a, g = l.reduce((y, k) => Math.min(y, k.to), O && O.from > m ? O.from : 1e8);
      else {
        if (m = O.from, m > f)
          break;
        g = O.to, l.push(O), d++;
      }
      for (; d < s.length; ) {
        let y = s[d];
        if (y.from == m && (y.to > y.from || y.to == m))
          l.push(y), d++, g = Math.min(y.to, g);
        else {
          g = Math.min(y.from, g);
          break;
        }
      }
      g = Math.min(g, f);
      let Q = !1;
      if (l.some((y) => y.from == m && (y.to == g || g == f)) && (Q = m == g, !Q && g - m < 10)) {
        let y = m - (c + h.value.length);
        y > 0 && (h.next(y), c = m);
        for (let k = m; ; ) {
          if (k >= g) {
            Q = !0;
            break;
          }
          if (!h.lineBreak && c + h.value.length > k)
            break;
          k = c + h.value.length, c += h.value.length, h.next();
        }
      }
      let S = Db(l);
      if (Q)
        o.add(m, m, Z.widget({
          widget: new Yb(S),
          diagnostics: l.slice()
        }));
      else {
        let y = l.reduce((k, x) => x.markClass ? k + " " + x.markClass : k, "");
        o.add(m, g, Z.mark({
          class: "cm-lintRange cm-lintRange-" + S + y,
          diagnostics: l.slice(),
          inclusiveEnd: l.some((k) => k.to > g)
        }));
      }
      if (a = g, a == f)
        break;
      for (let y = 0; y < l.length; y++)
        l[y].to <= a && l.splice(y--, 1);
    }
    let u = o.finish();
    return new Et(u, t, Xt(u));
  }
}
function Xt(n, e = null, t = 0) {
  let i = null;
  return n.between(t, 1e9, (r, s, { spec: o }) => {
    if (!(e && o.diagnostics.indexOf(e) < 0))
      if (!i)
        i = new ah(r, s, e || o.diagnostics[0]);
      else {
        if (o.diagnostics.indexOf(i.diagnostic) < 0)
          return !1;
        i = new ah(i.from, s, i.diagnostic);
      }
  }), i;
}
function Tb(n, e) {
  let t = e.pos, i = e.end || t, r = n.state.facet(sn).hideOn(n, t, i);
  if (r != null)
    return r;
  let s = n.startState.doc.lineAt(e.pos);
  return !!(n.effects.some((o) => o.is(Eu)) || n.changes.touchesRange(s.from, Math.max(s.to, i)));
}
function Cb(n, e) {
  return n.field(Ze, !1) ? e : e.concat(M.appendConfig.of(qb));
}
const Eu = /* @__PURE__ */ M.define(), gl = /* @__PURE__ */ M.define(), _u = /* @__PURE__ */ M.define(), Ze = /* @__PURE__ */ oe.define({
  create() {
    return new Et(Z.none, null, null);
  },
  update(n, e) {
    if (e.docChanged && n.diagnostics.size) {
      let t = n.diagnostics.map(e.changes), i = null, r = n.panel;
      if (n.selected) {
        let s = e.changes.mapPos(n.selected.from, 1);
        i = Xt(t, n.selected.diagnostic, s) || Xt(t, null, s);
      }
      !t.size && r && e.state.facet(sn).autoPanel && (r = null), n = new Et(t, r, i);
    }
    for (let t of e.effects)
      if (t.is(Eu)) {
        let i = e.state.facet(sn).autoPanel ? t.value.length ? on.open : null : n.panel;
        n = Et.init(t.value, i, e.state);
      } else t.is(gl) ? n = new Et(n.diagnostics, t.value ? on.open : null, n.selected) : t.is(_u) && (n = new Et(n.diagnostics, n.panel, t.value));
    return n;
  },
  provide: (n) => [
    Fi.from(n, (e) => e.panel),
    v.decorations.from(n, (e) => e.diagnostics)
  ]
}), Zb = /* @__PURE__ */ Z.mark({ class: "cm-lintRange cm-lintRange-active" });
function Xb(n, e, t) {
  let { diagnostics: i } = n.state.field(Ze), r, s = -1, o = -1;
  i.between(e - (t < 0 ? 1 : 0), e + (t > 0 ? 1 : 0), (a, h, { spec: c }) => {
    if (e >= a && e <= h && (a == h || (e > a || t > 0) && (e < h || t < 0)))
      return r = c.diagnostics, s = a, o = h, !1;
  });
  let l = n.state.facet(sn).tooltipFilter;
  return r && l && (r = l(r, n.state)), r ? {
    pos: s,
    end: o,
    above: n.state.doc.lineAt(s).to < o,
    create() {
      return { dom: Ab(n, r) };
    }
  } : null;
}
function Ab(n, e) {
  return B("ul", { class: "cm-tooltip-lint" }, e.map((t) => qu(n, t, !1)));
}
const Mb = (n) => {
  let e = n.state.field(Ze, !1);
  (!e || !e.panel) && n.dispatch({ effects: Cb(n.state, [gl.of(!0)]) });
  let t = Go(n, on.open);
  return t && t.dom.querySelector(".cm-panel-lint ul").focus(), !0;
}, hh = (n) => {
  let e = n.state.field(Ze, !1);
  return !e || !e.panel ? !1 : (n.dispatch({ effects: gl.of(!1) }), !0);
}, Rb = (n) => {
  let e = n.state.field(Ze, !1);
  if (!e)
    return !1;
  let t = n.state.selection.main, i = Xt(e.diagnostics, null, t.to + 1);
  return !i && (i = Xt(e.diagnostics, null, 0), !i || i.from == t.from && i.to == t.to) ? !1 : (n.dispatch({ selection: { anchor: i.from, head: i.to }, scrollIntoView: !0 }), !0);
}, zb = [
  { key: "Mod-Shift-m", run: Mb, preventDefault: !0 },
  { key: "F8", run: Rb }
], sn = /* @__PURE__ */ T.define({
  combine(n) {
    return {
      sources: n.map((e) => e.source).filter((e) => e != null),
      ...at(n.map((e) => e.config), {
        delay: 750,
        markerFilter: null,
        tooltipFilter: null,
        needsRefresh: null,
        hideOn: () => null
      }, {
        delay: Math.max,
        markerFilter: ch,
        tooltipFilter: ch,
        needsRefresh: (e, t) => e ? t ? (i) => e(i) || t(i) : e : t,
        hideOn: (e, t) => e ? t ? (i, r, s) => e(i, r, s) || t(i, r, s) : e : t,
        autoPanel: (e, t) => e || t
      })
    };
  }
});
function ch(n, e) {
  return n ? e ? (t, i) => e(n(t, i), i) : n : e;
}
function Du(n) {
  let e = [];
  if (n)
    e: for (let { name: t } of n) {
      for (let i = 0; i < t.length; i++) {
        let r = t[i];
        if (/[a-zA-Z]/.test(r) && !e.some((s) => s.toLowerCase() == r.toLowerCase())) {
          e.push(r);
          continue e;
        }
      }
      e.push("");
    }
  return e;
}
function qu(n, e, t) {
  var i;
  let r = t ? Du(e.actions) : [];
  return B("li", { class: "cm-diagnostic cm-diagnostic-" + e.severity }, B("span", { class: "cm-diagnosticText" }, e.renderMessage ? e.renderMessage(n) : e.message), (i = e.actions) === null || i === void 0 ? void 0 : i.map((s, o) => {
    let l = !1, a = (d) => {
      if (d.preventDefault(), l)
        return;
      l = !0;
      let O = Xt(n.state.field(Ze).diagnostics, e);
      O && s.apply(n, O.from, O.to);
    }, { name: h } = s, c = r[o] ? h.indexOf(r[o]) : -1, f = c < 0 ? h : [
      h.slice(0, c),
      B("u", h.slice(c, c + 1)),
      h.slice(c + 1)
    ], u = s.markClass ? " " + s.markClass : "";
    return B("button", {
      type: "button",
      class: "cm-diagnosticAction" + u,
      onclick: a,
      onmousedown: a,
      "aria-label": ` Action: ${h}${c < 0 ? "" : ` (access key "${r[o]})"`}.`
    }, f);
  }), e.source && B("div", { class: "cm-diagnosticSource" }, e.source));
}
class Yb extends ht {
  constructor(e) {
    super(), this.sev = e;
  }
  eq(e) {
    return e.sev == this.sev;
  }
  toDOM() {
    return B("span", { class: "cm-lintPoint cm-lintPoint-" + this.sev });
  }
}
class fh {
  constructor(e, t) {
    this.diagnostic = t, this.id = "item_" + Math.floor(Math.random() * 4294967295).toString(16), this.dom = qu(e, t, !0), this.dom.id = this.id, this.dom.setAttribute("role", "option");
  }
}
class on {
  constructor(e) {
    this.view = e, this.items = [];
    let t = (r) => {
      if (!(r.ctrlKey || r.altKey || r.metaKey)) {
        if (r.keyCode == 27)
          hh(this.view), this.view.focus();
        else if (r.keyCode == 38 || r.keyCode == 33)
          this.moveSelection((this.selectedIndex - 1 + this.items.length) % this.items.length);
        else if (r.keyCode == 40 || r.keyCode == 34)
          this.moveSelection((this.selectedIndex + 1) % this.items.length);
        else if (r.keyCode == 36)
          this.moveSelection(0);
        else if (r.keyCode == 35)
          this.moveSelection(this.items.length - 1);
        else if (r.keyCode == 13)
          this.view.focus();
        else if (r.keyCode >= 65 && r.keyCode <= 90 && this.selectedIndex >= 0) {
          let { diagnostic: s } = this.items[this.selectedIndex], o = Du(s.actions);
          for (let l = 0; l < o.length; l++)
            if (o[l].toUpperCase().charCodeAt(0) == r.keyCode) {
              let a = Xt(this.view.state.field(Ze).diagnostics, s);
              a && s.actions[l].apply(e, a.from, a.to);
            }
        } else
          return;
        r.preventDefault();
      }
    }, i = (r) => {
      for (let s = 0; s < this.items.length; s++)
        this.items[s].dom.contains(r.target) && this.moveSelection(s);
    };
    this.list = B("ul", {
      tabIndex: 0,
      role: "listbox",
      "aria-label": this.view.state.phrase("Diagnostics"),
      onkeydown: t,
      onclick: i
    }), this.dom = B("div", { class: "cm-panel-lint" }, this.list, B("button", {
      type: "button",
      name: "close",
      "aria-label": this.view.state.phrase("close"),
      onclick: () => hh(this.view)
    }, "×")), this.update();
  }
  get selectedIndex() {
    let e = this.view.state.field(Ze).selected;
    if (!e)
      return -1;
    for (let t = 0; t < this.items.length; t++)
      if (this.items[t].diagnostic == e.diagnostic)
        return t;
    return -1;
  }
  update() {
    let { diagnostics: e, selected: t } = this.view.state.field(Ze), i = 0, r = !1, s = null, o = /* @__PURE__ */ new Set();
    for (e.between(0, this.view.state.doc.length, (l, a, { spec: h }) => {
      for (let c of h.diagnostics) {
        if (o.has(c))
          continue;
        o.add(c);
        let f = -1, u;
        for (let d = i; d < this.items.length; d++)
          if (this.items[d].diagnostic == c) {
            f = d;
            break;
          }
        f < 0 ? (u = new fh(this.view, c), this.items.splice(i, 0, u), r = !0) : (u = this.items[f], f > i && (this.items.splice(i, f - i), r = !0)), t && u.diagnostic == t.diagnostic ? u.dom.hasAttribute("aria-selected") || (u.dom.setAttribute("aria-selected", "true"), s = u) : u.dom.hasAttribute("aria-selected") && u.dom.removeAttribute("aria-selected"), i++;
      }
    }); i < this.items.length && !(this.items.length == 1 && this.items[0].diagnostic.from < 0); )
      r = !0, this.items.pop();
    this.items.length == 0 && (this.items.push(new fh(this.view, {
      from: -1,
      to: -1,
      severity: "info",
      message: this.view.state.phrase("No diagnostics")
    })), r = !0), s ? (this.list.setAttribute("aria-activedescendant", s.id), this.view.requestMeasure({
      key: this,
      read: () => ({ sel: s.dom.getBoundingClientRect(), panel: this.list.getBoundingClientRect() }),
      write: ({ sel: l, panel: a }) => {
        let h = a.height / this.list.offsetHeight;
        l.top < a.top ? this.list.scrollTop -= (a.top - l.top) / h : l.bottom > a.bottom && (this.list.scrollTop += (l.bottom - a.bottom) / h);
      }
    })) : this.selectedIndex < 0 && this.list.removeAttribute("aria-activedescendant"), r && this.sync();
  }
  sync() {
    let e = this.list.firstChild;
    function t() {
      let i = e;
      e = i.nextSibling, i.remove();
    }
    for (let i of this.items)
      if (i.dom.parentNode == this.list) {
        for (; e != i.dom; )
          t();
        e = i.dom.nextSibling;
      } else
        this.list.insertBefore(i.dom, e);
    for (; e; )
      t();
  }
  moveSelection(e) {
    if (this.selectedIndex < 0)
      return;
    let t = this.view.state.field(Ze), i = Xt(t.diagnostics, this.items[e].diagnostic);
    i && this.view.dispatch({
      selection: { anchor: i.from, head: i.to },
      scrollIntoView: !0,
      effects: _u.of(i)
    });
  }
  static open(e) {
    return new on(e);
  }
}
function Vb(n, e = 'viewBox="0 0 40 40"') {
  return `url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" ${e}>${encodeURIComponent(n)}</svg>')`;
}
function qn(n) {
  return Vb(`<path d="m0 2.5 l2 -1.5 l1 0 l2 1.5 l1 0" stroke="${n}" fill="none" stroke-width=".7"/>`, 'width="6" height="3"');
}
const Eb = /* @__PURE__ */ v.baseTheme({
  ".cm-diagnostic": {
    padding: "3px 6px 3px 8px",
    marginLeft: "-1px",
    display: "block",
    whiteSpace: "pre-wrap"
  },
  ".cm-diagnostic-error": { borderLeft: "5px solid #d11" },
  ".cm-diagnostic-warning": { borderLeft: "5px solid orange" },
  ".cm-diagnostic-info": { borderLeft: "5px solid #999" },
  ".cm-diagnostic-hint": { borderLeft: "5px solid #66d" },
  ".cm-diagnosticAction": {
    font: "inherit",
    border: "none",
    padding: "2px 4px",
    backgroundColor: "#444",
    color: "white",
    borderRadius: "3px",
    marginLeft: "8px",
    cursor: "pointer"
  },
  ".cm-diagnosticSource": {
    fontSize: "70%",
    opacity: 0.7
  },
  ".cm-lintRange": {
    backgroundPosition: "left bottom",
    backgroundRepeat: "repeat-x",
    paddingBottom: "0.7px"
  },
  ".cm-lintRange-error": { backgroundImage: /* @__PURE__ */ qn("#d11") },
  ".cm-lintRange-warning": { backgroundImage: /* @__PURE__ */ qn("orange") },
  ".cm-lintRange-info": { backgroundImage: /* @__PURE__ */ qn("#999") },
  ".cm-lintRange-hint": { backgroundImage: /* @__PURE__ */ qn("#66d") },
  ".cm-lintRange-active": { backgroundColor: "#ffdd9980" },
  ".cm-tooltip-lint": {
    padding: 0,
    margin: 0
  },
  ".cm-lintPoint": {
    position: "relative",
    "&:after": {
      content: '""',
      position: "absolute",
      bottom: 0,
      left: "-2px",
      borderLeft: "3px solid transparent",
      borderRight: "3px solid transparent",
      borderBottom: "4px solid #d11"
    }
  },
  ".cm-lintPoint-warning": {
    "&:after": { borderBottomColor: "orange" }
  },
  ".cm-lintPoint-info": {
    "&:after": { borderBottomColor: "#999" }
  },
  ".cm-lintPoint-hint": {
    "&:after": { borderBottomColor: "#66d" }
  },
  ".cm-panel.cm-panel-lint": {
    position: "relative",
    "& ul": {
      maxHeight: "100px",
      overflowY: "auto",
      "& [aria-selected]": {
        backgroundColor: "#ddd",
        "& u": { textDecoration: "underline" }
      },
      "&:focus [aria-selected]": {
        background_fallback: "#bdf",
        backgroundColor: "Highlight",
        color_fallback: "white",
        color: "HighlightText"
      },
      "& u": { textDecoration: "none" },
      padding: 0,
      margin: 0
    },
    "& [name=close]": {
      position: "absolute",
      top: "0",
      right: "2px",
      background: "inherit",
      border: "none",
      font: "inherit",
      padding: 0,
      margin: 0
    }
  }
});
function _b(n) {
  return n == "error" ? 4 : n == "warning" ? 3 : n == "info" ? 2 : 1;
}
function Db(n) {
  let e = "hint", t = 1;
  for (let i of n) {
    let r = _b(i.severity);
    r > t && (t = r, e = i.severity);
  }
  return e;
}
const qb = [
  Ze,
  /* @__PURE__ */ v.decorations.compute([Ze], (n) => {
    let { selected: e, panel: t } = n.field(Ze);
    return !e || !t || e.from == e.to ? Z.none : Z.set([
      Zb.range(e.from, e.to)
    ]);
  }),
  /* @__PURE__ */ bm(Xb, { hideOn: Tb }),
  Eb
], Wb = [
  Am(),
  zm(),
  Fp(),
  t0(),
  Cg(),
  _p(),
  Bp(),
  _.allowMultipleSelections.of(!0),
  mg(),
  Qo(Mg, { fallback: !0 }),
  Dg(),
  Mu(),
  Pb(),
  am(),
  fm(),
  im(),
  hQ(),
  fn.of([
    ...bb,
    ...nQ,
    ...ZQ,
    ...c0,
    ...$g,
    ...Vu,
    ...zb
  ])
];
class Pr {
  /**
  @internal
  */
  constructor(e, t, i, r, s, o, l, a, h, c = 0, f) {
    this.p = e, this.stack = t, this.state = i, this.reducePos = r, this.pos = s, this.score = o, this.buffer = l, this.bufferBase = a, this.curContext = h, this.lookAhead = c, this.parent = f;
  }
  /**
  @internal
  */
  toString() {
    return `[${this.stack.filter((e, t) => t % 3 == 0).concat(this.state)}]@${this.pos}${this.score ? "!" + this.score : ""}`;
  }
  // Start an empty stack
  /**
  @internal
  */
  static start(e, t, i = 0) {
    let r = e.parser.context;
    return new Pr(e, [], t, i, i, 0, [], 0, r ? new uh(r, r.start) : null, 0, null);
  }
  /**
  The stack's current [context](#lr.ContextTracker) value, if
  any. Its type will depend on the context tracker's type
  parameter, or it will be `null` if there is no context
  tracker.
  */
  get context() {
    return this.curContext ? this.curContext.context : null;
  }
  // Push a state onto the stack, tracking its start position as well
  // as the buffer base at that point.
  /**
  @internal
  */
  pushState(e, t) {
    this.stack.push(this.state, t, this.bufferBase + this.buffer.length), this.state = e;
  }
  // Apply a reduce action
  /**
  @internal
  */
  reduce(e) {
    var t;
    let i = e >> 19, r = e & 65535, { parser: s } = this.p, o = this.reducePos < this.pos - 25 && this.setLookAhead(this.pos), l = s.dynamicPrecedence(r);
    if (l && (this.score += l), i == 0) {
      this.pushState(s.getGoto(this.state, r, !0), this.reducePos), r < s.minRepeatTerm && this.storeNode(r, this.reducePos, this.reducePos, o ? 8 : 4, !0), this.reduceContext(r, this.reducePos);
      return;
    }
    let a = this.stack.length - (i - 1) * 3 - (e & 262144 ? 6 : 0), h = a ? this.stack[a - 2] : this.p.ranges[0].from, c = this.reducePos - h;
    c >= 2e3 && !(!((t = this.p.parser.nodeSet.types[r]) === null || t === void 0) && t.isAnonymous) && (h == this.p.lastBigReductionStart ? (this.p.bigReductionCount++, this.p.lastBigReductionSize = c) : this.p.lastBigReductionSize < c && (this.p.bigReductionCount = 1, this.p.lastBigReductionStart = h, this.p.lastBigReductionSize = c));
    let f = a ? this.stack[a - 1] : 0, u = this.bufferBase + this.buffer.length - f;
    if (r < s.minRepeatTerm || e & 131072) {
      let d = s.stateFlag(
        this.state,
        1
        /* StateFlag.Skipped */
      ) ? this.pos : this.reducePos;
      this.storeNode(r, h, d, u + 4, !0);
    }
    if (e & 262144)
      this.state = this.stack[a];
    else {
      let d = this.stack[a - 3];
      this.state = s.getGoto(d, r, !0);
    }
    for (; this.stack.length > a; )
      this.stack.pop();
    this.reduceContext(r, h);
  }
  // Shift a value into the buffer
  /**
  @internal
  */
  storeNode(e, t, i, r = 4, s = !1) {
    if (e == 0 && (!this.stack.length || this.stack[this.stack.length - 1] < this.buffer.length + this.bufferBase)) {
      let o = this, l = this.buffer.length;
      if (l == 0 && o.parent && (l = o.bufferBase - o.parent.bufferBase, o = o.parent), l > 0 && o.buffer[l - 4] == 0 && o.buffer[l - 1] > -1) {
        if (t == i)
          return;
        if (o.buffer[l - 2] >= t) {
          o.buffer[l - 2] = i;
          return;
        }
      }
    }
    if (!s || this.pos == i)
      this.buffer.push(e, t, i, r);
    else {
      let o = this.buffer.length;
      if (o > 0 && (this.buffer[o - 4] != 0 || this.buffer[o - 1] < 0)) {
        let l = !1;
        for (let a = o; a > 0 && this.buffer[a - 2] > i; a -= 4)
          if (this.buffer[a - 1] >= 0) {
            l = !0;
            break;
          }
        if (l)
          for (; o > 0 && this.buffer[o - 2] > i; )
            this.buffer[o] = this.buffer[o - 4], this.buffer[o + 1] = this.buffer[o - 3], this.buffer[o + 2] = this.buffer[o - 2], this.buffer[o + 3] = this.buffer[o - 1], o -= 4, r > 4 && (r -= 4);
      }
      this.buffer[o] = e, this.buffer[o + 1] = t, this.buffer[o + 2] = i, this.buffer[o + 3] = r;
    }
  }
  // Apply a shift action
  /**
  @internal
  */
  shift(e, t, i, r) {
    if (e & 131072)
      this.pushState(e & 65535, this.pos);
    else if (e & 262144)
      this.pos = r, this.shiftContext(t, i), t <= this.p.parser.maxNode && this.buffer.push(t, i, r, 4);
    else {
      let s = e, { parser: o } = this.p;
      this.pos = r;
      let l = o.stateFlag(
        s,
        1
        /* StateFlag.Skipped */
      );
      !l && (r > i || t <= o.maxNode) && (this.reducePos = r), this.pushState(s, l ? i : Math.min(i, this.reducePos)), this.shiftContext(t, i), t <= o.maxNode && this.buffer.push(t, i, r, 4);
    }
  }
  // Apply an action
  /**
  @internal
  */
  apply(e, t, i, r) {
    e & 65536 ? this.reduce(e) : this.shift(e, t, i, r);
  }
  // Add a prebuilt (reused) node into the buffer.
  /**
  @internal
  */
  useNode(e, t) {
    let i = this.p.reused.length - 1;
    (i < 0 || this.p.reused[i] != e) && (this.p.reused.push(e), i++);
    let r = this.pos;
    this.reducePos = this.pos = r + e.length, this.pushState(t, r), this.buffer.push(
      i,
      r,
      this.reducePos,
      -1
      /* size == -1 means this is a reused value */
    ), this.curContext && this.updateContext(this.curContext.tracker.reuse(this.curContext.context, e, this, this.p.stream.reset(this.pos - e.length)));
  }
  // Split the stack. Due to the buffer sharing and the fact
  // that `this.stack` tends to stay quite shallow, this isn't very
  // expensive.
  /**
  @internal
  */
  split() {
    let e = this, t = e.buffer.length;
    for (; t > 0 && e.buffer[t - 2] > e.reducePos; )
      t -= 4;
    let i = e.buffer.slice(t), r = e.bufferBase + t;
    for (; e && r == e.bufferBase; )
      e = e.parent;
    return new Pr(this.p, this.stack.slice(), this.state, this.reducePos, this.pos, this.score, i, r, this.curContext, this.lookAhead, e);
  }
  // Try to recover from an error by 'deleting' (ignoring) one token.
  /**
  @internal
  */
  recoverByDelete(e, t) {
    let i = e <= this.p.parser.maxNode;
    i && this.storeNode(e, this.pos, t, 4), this.storeNode(0, this.pos, t, i ? 8 : 4), this.pos = this.reducePos = t, this.score -= 190;
  }
  /**
  Check if the given term would be able to be shifted (optionally
  after some reductions) on this stack. This can be useful for
  external tokenizers that want to make sure they only provide a
  given token when it applies.
  */
  canShift(e) {
    for (let t = new Lb(this); ; ) {
      let i = this.p.parser.stateSlot(
        t.state,
        4
        /* ParseState.DefaultReduce */
      ) || this.p.parser.hasAction(t.state, e);
      if (i == 0)
        return !1;
      if (!(i & 65536))
        return !0;
      t.reduce(i);
    }
  }
  // Apply up to Recover.MaxNext recovery actions that conceptually
  // inserts some missing token or rule.
  /**
  @internal
  */
  recoverByInsert(e) {
    if (this.stack.length >= 300)
      return [];
    let t = this.p.parser.nextStates(this.state);
    if (t.length > 8 || this.stack.length >= 120) {
      let r = [];
      for (let s = 0, o; s < t.length; s += 2)
        (o = t[s + 1]) != this.state && this.p.parser.hasAction(o, e) && r.push(t[s], o);
      if (this.stack.length < 120)
        for (let s = 0; r.length < 8 && s < t.length; s += 2) {
          let o = t[s + 1];
          r.some((l, a) => a & 1 && l == o) || r.push(t[s], o);
        }
      t = r;
    }
    let i = [];
    for (let r = 0; r < t.length && i.length < 4; r += 2) {
      let s = t[r + 1];
      if (s == this.state)
        continue;
      let o = this.split();
      o.pushState(s, this.pos), o.storeNode(0, o.pos, o.pos, 4, !0), o.shiftContext(t[r], this.pos), o.reducePos = this.pos, o.score -= 200, i.push(o);
    }
    return i;
  }
  // Force a reduce, if possible. Return false if that can't
  // be done.
  /**
  @internal
  */
  forceReduce() {
    let { parser: e } = this.p, t = e.stateSlot(
      this.state,
      5
      /* ParseState.ForcedReduce */
    );
    if (!(t & 65536))
      return !1;
    if (!e.validAction(this.state, t)) {
      let i = t >> 19, r = t & 65535, s = this.stack.length - i * 3;
      if (s < 0 || e.getGoto(this.stack[s], r, !1) < 0) {
        let o = this.findForcedReduction();
        if (o == null)
          return !1;
        t = o;
      }
      this.storeNode(0, this.pos, this.pos, 4, !0), this.score -= 100;
    }
    return this.reducePos = this.pos, this.reduce(t), !0;
  }
  /**
  Try to scan through the automaton to find some kind of reduction
  that can be applied. Used when the regular ForcedReduce field
  isn't a valid action. @internal
  */
  findForcedReduction() {
    let { parser: e } = this.p, t = [], i = (r, s) => {
      if (!t.includes(r))
        return t.push(r), e.allActions(r, (o) => {
          if (!(o & 393216)) if (o & 65536) {
            let l = (o >> 19) - s;
            if (l > 1) {
              let a = o & 65535, h = this.stack.length - l * 3;
              if (h >= 0 && e.getGoto(this.stack[h], a, !1) >= 0)
                return l << 19 | 65536 | a;
            }
          } else {
            let l = i(o, s + 1);
            if (l != null)
              return l;
          }
        });
    };
    return i(this.state, 0);
  }
  /**
  @internal
  */
  forceAll() {
    for (; !this.p.parser.stateFlag(
      this.state,
      2
      /* StateFlag.Accepting */
    ); )
      if (!this.forceReduce()) {
        this.storeNode(0, this.pos, this.pos, 4, !0);
        break;
      }
    return this;
  }
  /**
  Check whether this state has no further actions (assumed to be a direct descendant of the
  top state, since any other states must be able to continue
  somehow). @internal
  */
  get deadEnd() {
    if (this.stack.length != 3)
      return !1;
    let { parser: e } = this.p;
    return e.data[e.stateSlot(
      this.state,
      1
      /* ParseState.Actions */
    )] == 65535 && !e.stateSlot(
      this.state,
      4
      /* ParseState.DefaultReduce */
    );
  }
  /**
  Restart the stack (put it back in its start state). Only safe
  when this.stack.length == 3 (state is directly below the top
  state). @internal
  */
  restart() {
    this.storeNode(0, this.pos, this.pos, 4, !0), this.state = this.stack[0], this.stack.length = 0;
  }
  /**
  @internal
  */
  sameState(e) {
    if (this.state != e.state || this.stack.length != e.stack.length)
      return !1;
    for (let t = 0; t < this.stack.length; t += 3)
      if (this.stack[t] != e.stack[t])
        return !1;
    return !0;
  }
  /**
  Get the parser used by this stack.
  */
  get parser() {
    return this.p.parser;
  }
  /**
  Test whether a given dialect (by numeric ID, as exported from
  the terms file) is enabled.
  */
  dialectEnabled(e) {
    return this.p.parser.dialect.flags[e];
  }
  shiftContext(e, t) {
    this.curContext && this.updateContext(this.curContext.tracker.shift(this.curContext.context, e, this, this.p.stream.reset(t)));
  }
  reduceContext(e, t) {
    this.curContext && this.updateContext(this.curContext.tracker.reduce(this.curContext.context, e, this, this.p.stream.reset(t)));
  }
  /**
  @internal
  */
  emitContext() {
    let e = this.buffer.length - 1;
    (e < 0 || this.buffer[e] != -3) && this.buffer.push(this.curContext.hash, this.pos, this.pos, -3);
  }
  /**
  @internal
  */
  emitLookAhead() {
    let e = this.buffer.length - 1;
    (e < 0 || this.buffer[e] != -4) && this.buffer.push(this.lookAhead, this.pos, this.pos, -4);
  }
  updateContext(e) {
    if (e != this.curContext.context) {
      let t = new uh(this.curContext.tracker, e);
      t.hash != this.curContext.hash && this.emitContext(), this.curContext = t;
    }
  }
  /**
  @internal
  */
  setLookAhead(e) {
    return e <= this.lookAhead ? !1 : (this.emitLookAhead(), this.lookAhead = e, !0);
  }
  /**
  @internal
  */
  close() {
    this.curContext && this.curContext.tracker.strict && this.emitContext(), this.lookAhead > 0 && this.emitLookAhead();
  }
}
class uh {
  constructor(e, t) {
    this.tracker = e, this.context = t, this.hash = e.strict ? e.hash(t) : 0;
  }
}
class Lb {
  constructor(e) {
    this.start = e, this.state = e.state, this.stack = e.stack, this.base = this.stack.length;
  }
  reduce(e) {
    let t = e & 65535, i = e >> 19;
    i == 0 ? (this.stack == this.start.stack && (this.stack = this.stack.slice()), this.stack.push(this.state, 0, 0), this.base += 3) : this.base -= (i - 1) * 3;
    let r = this.start.p.parser.getGoto(this.stack[this.base - 3], t, !0);
    this.state = r;
  }
}
class vr {
  constructor(e, t, i) {
    this.stack = e, this.pos = t, this.index = i, this.buffer = e.buffer, this.index == 0 && this.maybeNext();
  }
  static create(e, t = e.bufferBase + e.buffer.length) {
    return new vr(e, t, t - e.bufferBase);
  }
  maybeNext() {
    let e = this.stack.parent;
    e != null && (this.index = this.stack.bufferBase - e.bufferBase, this.stack = e, this.buffer = e.buffer);
  }
  get id() {
    return this.buffer[this.index - 4];
  }
  get start() {
    return this.buffer[this.index - 3];
  }
  get end() {
    return this.buffer[this.index - 2];
  }
  get size() {
    return this.buffer[this.index - 1];
  }
  next() {
    this.index -= 4, this.pos -= 4, this.index == 0 && this.maybeNext();
  }
  fork() {
    return new vr(this.stack, this.pos, this.index);
  }
}
function Yi(n, e = Uint16Array) {
  if (typeof n != "string")
    return n;
  let t = null;
  for (let i = 0, r = 0; i < n.length; ) {
    let s = 0;
    for (; ; ) {
      let o = n.charCodeAt(i++), l = !1;
      if (o == 126) {
        s = 65535;
        break;
      }
      o >= 92 && o--, o >= 34 && o--;
      let a = o - 32;
      if (a >= 46 && (a -= 46, l = !0), s += a, l)
        break;
      s *= 46;
    }
    t ? t[r++] = s : t = new e(s);
  }
  return t;
}
class Hn {
  constructor() {
    this.start = -1, this.value = -1, this.end = -1, this.extended = -1, this.lookAhead = 0, this.mask = 0, this.context = 0;
  }
}
const dh = new Hn();
class Bb {
  /**
  @internal
  */
  constructor(e, t) {
    this.input = e, this.ranges = t, this.chunk = "", this.chunkOff = 0, this.chunk2 = "", this.chunk2Pos = 0, this.next = -1, this.token = dh, this.rangeIndex = 0, this.pos = this.chunkPos = t[0].from, this.range = t[0], this.end = t[t.length - 1].to, this.readNext();
  }
  /**
  @internal
  */
  resolveOffset(e, t) {
    let i = this.range, r = this.rangeIndex, s = this.pos + e;
    for (; s < i.from; ) {
      if (!r)
        return null;
      let o = this.ranges[--r];
      s -= i.from - o.to, i = o;
    }
    for (; t < 0 ? s > i.to : s >= i.to; ) {
      if (r == this.ranges.length - 1)
        return null;
      let o = this.ranges[++r];
      s += o.from - i.to, i = o;
    }
    return s;
  }
  /**
  @internal
  */
  clipPos(e) {
    if (e >= this.range.from && e < this.range.to)
      return e;
    for (let t of this.ranges)
      if (t.to > e)
        return Math.max(e, t.from);
    return this.end;
  }
  /**
  Look at a code unit near the stream position. `.peek(0)` equals
  `.next`, `.peek(-1)` gives you the previous character, and so
  on.
  
  Note that looking around during tokenizing creates dependencies
  on potentially far-away content, which may reduce the
  effectiveness incremental parsing—when looking forward—or even
  cause invalid reparses when looking backward more than 25 code
  units, since the library does not track lookbehind.
  */
  peek(e) {
    let t = this.chunkOff + e, i, r;
    if (t >= 0 && t < this.chunk.length)
      i = this.pos + e, r = this.chunk.charCodeAt(t);
    else {
      let s = this.resolveOffset(e, 1);
      if (s == null)
        return -1;
      if (i = s, i >= this.chunk2Pos && i < this.chunk2Pos + this.chunk2.length)
        r = this.chunk2.charCodeAt(i - this.chunk2Pos);
      else {
        let o = this.rangeIndex, l = this.range;
        for (; l.to <= i; )
          l = this.ranges[++o];
        this.chunk2 = this.input.chunk(this.chunk2Pos = i), i + this.chunk2.length > l.to && (this.chunk2 = this.chunk2.slice(0, l.to - i)), r = this.chunk2.charCodeAt(0);
      }
    }
    return i >= this.token.lookAhead && (this.token.lookAhead = i + 1), r;
  }
  /**
  Accept a token. By default, the end of the token is set to the
  current stream position, but you can pass an offset (relative to
  the stream position) to change that.
  */
  acceptToken(e, t = 0) {
    let i = t ? this.resolveOffset(t, -1) : this.pos;
    if (i == null || i < this.token.start)
      throw new RangeError("Token end out of bounds");
    this.token.value = e, this.token.end = i;
  }
  /**
  Accept a token ending at a specific given position.
  */
  acceptTokenTo(e, t) {
    this.token.value = e, this.token.end = t;
  }
  getChunk() {
    if (this.pos >= this.chunk2Pos && this.pos < this.chunk2Pos + this.chunk2.length) {
      let { chunk: e, chunkPos: t } = this;
      this.chunk = this.chunk2, this.chunkPos = this.chunk2Pos, this.chunk2 = e, this.chunk2Pos = t, this.chunkOff = this.pos - this.chunkPos;
    } else {
      this.chunk2 = this.chunk, this.chunk2Pos = this.chunkPos;
      let e = this.input.chunk(this.pos), t = this.pos + e.length;
      this.chunk = t > this.range.to ? e.slice(0, this.range.to - this.pos) : e, this.chunkPos = this.pos, this.chunkOff = 0;
    }
  }
  readNext() {
    return this.chunkOff >= this.chunk.length && (this.getChunk(), this.chunkOff == this.chunk.length) ? this.next = -1 : this.next = this.chunk.charCodeAt(this.chunkOff);
  }
  /**
  Move the stream forward N (defaults to 1) code units. Returns
  the new value of [`next`](#lr.InputStream.next).
  */
  advance(e = 1) {
    for (this.chunkOff += e; this.pos + e >= this.range.to; ) {
      if (this.rangeIndex == this.ranges.length - 1)
        return this.setDone();
      e -= this.range.to - this.pos, this.range = this.ranges[++this.rangeIndex], this.pos = this.range.from;
    }
    return this.pos += e, this.pos >= this.token.lookAhead && (this.token.lookAhead = this.pos + 1), this.readNext();
  }
  setDone() {
    return this.pos = this.chunkPos = this.end, this.range = this.ranges[this.rangeIndex = this.ranges.length - 1], this.chunk = "", this.next = -1;
  }
  /**
  @internal
  */
  reset(e, t) {
    if (t ? (this.token = t, t.start = e, t.lookAhead = e + 1, t.value = t.extended = -1) : this.token = dh, this.pos != e) {
      if (this.pos = e, e == this.end)
        return this.setDone(), this;
      for (; e < this.range.from; )
        this.range = this.ranges[--this.rangeIndex];
      for (; e >= this.range.to; )
        this.range = this.ranges[++this.rangeIndex];
      e >= this.chunkPos && e < this.chunkPos + this.chunk.length ? this.chunkOff = e - this.chunkPos : (this.chunk = "", this.chunkOff = 0), this.readNext();
    }
    return this;
  }
  /**
  @internal
  */
  read(e, t) {
    if (e >= this.chunkPos && t <= this.chunkPos + this.chunk.length)
      return this.chunk.slice(e - this.chunkPos, t - this.chunkPos);
    if (e >= this.chunk2Pos && t <= this.chunk2Pos + this.chunk2.length)
      return this.chunk2.slice(e - this.chunk2Pos, t - this.chunk2Pos);
    if (e >= this.range.from && t <= this.range.to)
      return this.input.read(e, t);
    let i = "";
    for (let r of this.ranges) {
      if (r.from >= t)
        break;
      r.to > e && (i += this.input.read(Math.max(r.from, e), Math.min(r.to, t)));
    }
    return i;
  }
}
class ai {
  constructor(e, t) {
    this.data = e, this.id = t;
  }
  token(e, t) {
    let { parser: i } = t.p;
    Wu(this.data, e, t, this.id, i.data, i.tokenPrecTable);
  }
}
ai.prototype.contextual = ai.prototype.fallback = ai.prototype.extend = !1;
class Tr {
  constructor(e, t, i) {
    this.precTable = t, this.elseToken = i, this.data = typeof e == "string" ? Yi(e) : e;
  }
  token(e, t) {
    let i = e.pos, r = 0;
    for (; ; ) {
      let s = e.next < 0, o = e.resolveOffset(1, 1);
      if (Wu(this.data, e, t, 0, this.data, this.precTable), e.token.value > -1)
        break;
      if (this.elseToken == null)
        return;
      if (s || r++, o == null)
        break;
      e.reset(o, e.token);
    }
    r && (e.reset(i, e.token), e.acceptToken(this.elseToken, r));
  }
}
Tr.prototype.contextual = ai.prototype.fallback = ai.prototype.extend = !1;
class Xe {
  /**
  Create a tokenizer. The first argument is the function that,
  given an input stream, scans for the types of tokens it
  recognizes at the stream's position, and calls
  [`acceptToken`](#lr.InputStream.acceptToken) when it finds
  one.
  */
  constructor(e, t = {}) {
    this.token = e, this.contextual = !!t.contextual, this.fallback = !!t.fallback, this.extend = !!t.extend;
  }
}
function Wu(n, e, t, i, r, s) {
  let o = 0, l = 1 << i, { dialect: a } = t.p.parser;
  e: for (; l & n[o]; ) {
    let h = n[o + 1];
    for (let d = o + 3; d < h; d += 2)
      if ((n[d + 1] & l) > 0) {
        let O = n[d];
        if (a.allows(O) && (e.token.value == -1 || e.token.value == O || Ib(O, e.token.value, r, s))) {
          e.acceptToken(O);
          break;
        }
      }
    let c = e.next, f = 0, u = n[o + 2];
    if (e.next < 0 && u > f && n[h + u * 3 - 3] == 65535) {
      o = n[h + u * 3 - 1];
      continue e;
    }
    for (; f < u; ) {
      let d = f + u >> 1, O = h + d + (d << 1), m = n[O], g = n[O + 1] || 65536;
      if (c < m)
        u = d;
      else if (c >= g)
        f = d + 1;
      else {
        o = n[O + 2], e.advance();
        continue e;
      }
    }
    break;
  }
}
function Oh(n, e, t) {
  for (let i = e, r; (r = n[i]) != 65535; i++)
    if (r == t)
      return i - e;
  return -1;
}
function Ib(n, e, t, i) {
  let r = Oh(t, i, e);
  return r < 0 || Oh(t, i, n) < r;
}
const ve = typeof process < "u" && process.env && /\bparse\b/.test(process.env.LOG);
let xs = null;
function ph(n, e, t) {
  let i = n.cursor(W.IncludeAnonymous);
  for (i.moveTo(e); ; )
    if (!(t < 0 ? i.childBefore(e) : i.childAfter(e)))
      for (; ; ) {
        if ((t < 0 ? i.to < e : i.from > e) && !i.type.isError)
          return t < 0 ? Math.max(0, Math.min(
            i.to - 1,
            e - 25
            /* Lookahead.Margin */
          )) : Math.min(n.length, Math.max(
            i.from + 1,
            e + 25
            /* Lookahead.Margin */
          ));
        if (t < 0 ? i.prevSibling() : i.nextSibling())
          break;
        if (!i.parent())
          return t < 0 ? 0 : n.length;
      }
}
class jb {
  constructor(e, t) {
    this.fragments = e, this.nodeSet = t, this.i = 0, this.fragment = null, this.safeFrom = -1, this.safeTo = -1, this.trees = [], this.start = [], this.index = [], this.nextFragment();
  }
  nextFragment() {
    let e = this.fragment = this.i == this.fragments.length ? null : this.fragments[this.i++];
    if (e) {
      for (this.safeFrom = e.openStart ? ph(e.tree, e.from + e.offset, 1) - e.offset : e.from, this.safeTo = e.openEnd ? ph(e.tree, e.to + e.offset, -1) - e.offset : e.to; this.trees.length; )
        this.trees.pop(), this.start.pop(), this.index.pop();
      this.trees.push(e.tree), this.start.push(-e.offset), this.index.push(0), this.nextStart = this.safeFrom;
    } else
      this.nextStart = 1e9;
  }
  // `pos` must be >= any previously given `pos` for this cursor
  nodeAt(e) {
    if (e < this.nextStart)
      return null;
    for (; this.fragment && this.safeTo <= e; )
      this.nextFragment();
    if (!this.fragment)
      return null;
    for (; ; ) {
      let t = this.trees.length - 1;
      if (t < 0)
        return this.nextFragment(), null;
      let i = this.trees[t], r = this.index[t];
      if (r == i.children.length) {
        this.trees.pop(), this.start.pop(), this.index.pop();
        continue;
      }
      let s = i.children[r], o = this.start[t] + i.positions[r];
      if (o > e)
        return this.nextStart = o, null;
      if (s instanceof H) {
        if (o == e) {
          if (o < this.safeFrom)
            return null;
          let l = o + s.length;
          if (l <= this.safeTo) {
            let a = s.prop(z.lookAhead);
            if (!a || l + a < this.fragment.to)
              return s;
          }
        }
        this.index[t]++, o + s.length >= Math.max(this.safeFrom, e) && (this.trees.push(s), this.start.push(o), this.index.push(0));
      } else
        this.index[t]++, this.nextStart = o + s.length;
    }
  }
}
class Nb {
  constructor(e, t) {
    this.stream = t, this.tokens = [], this.mainToken = null, this.actions = [], this.tokens = e.tokenizers.map((i) => new Hn());
  }
  getActions(e) {
    let t = 0, i = null, { parser: r } = e.p, { tokenizers: s } = r, o = r.stateSlot(
      e.state,
      3
      /* ParseState.TokenizerMask */
    ), l = e.curContext ? e.curContext.hash : 0, a = 0;
    for (let h = 0; h < s.length; h++) {
      if (!(1 << h & o))
        continue;
      let c = s[h], f = this.tokens[h];
      if (!(i && !c.fallback) && ((c.contextual || f.start != e.pos || f.mask != o || f.context != l) && (this.updateCachedToken(f, c, e), f.mask = o, f.context = l), f.lookAhead > f.end + 25 && (a = Math.max(f.lookAhead, a)), f.value != 0)) {
        let u = t;
        if (f.extended > -1 && (t = this.addActions(e, f.extended, f.end, t)), t = this.addActions(e, f.value, f.end, t), !c.extend && (i = f, t > u))
          break;
      }
    }
    for (; this.actions.length > t; )
      this.actions.pop();
    return a && e.setLookAhead(a), !i && e.pos == this.stream.end && (i = new Hn(), i.value = e.p.parser.eofTerm, i.start = i.end = e.pos, t = this.addActions(e, i.value, i.end, t)), this.mainToken = i, this.actions;
  }
  getMainToken(e) {
    if (this.mainToken)
      return this.mainToken;
    let t = new Hn(), { pos: i, p: r } = e;
    return t.start = i, t.end = Math.min(i + 1, r.stream.end), t.value = i == r.stream.end ? r.parser.eofTerm : 0, t;
  }
  updateCachedToken(e, t, i) {
    let r = this.stream.clipPos(i.pos);
    if (t.token(this.stream.reset(r, e), i), e.value > -1) {
      let { parser: s } = i.p;
      for (let o = 0; o < s.specialized.length; o++)
        if (s.specialized[o] == e.value) {
          let l = s.specializers[o](this.stream.read(e.start, e.end), i);
          if (l >= 0 && i.p.parser.dialect.allows(l >> 1)) {
            l & 1 ? e.extended = l >> 1 : e.value = l >> 1;
            break;
          }
        }
    } else
      e.value = 0, e.end = this.stream.clipPos(r + 1);
  }
  putAction(e, t, i, r) {
    for (let s = 0; s < r; s += 3)
      if (this.actions[s] == e)
        return r;
    return this.actions[r++] = e, this.actions[r++] = t, this.actions[r++] = i, r;
  }
  addActions(e, t, i, r) {
    let { state: s } = e, { parser: o } = e.p, { data: l } = o;
    for (let a = 0; a < 2; a++)
      for (let h = o.stateSlot(
        s,
        a ? 2 : 1
        /* ParseState.Actions */
      ); ; h += 3) {
        if (l[h] == 65535)
          if (l[h + 1] == 1)
            h = ut(l, h + 2);
          else {
            r == 0 && l[h + 1] == 2 && (r = this.putAction(ut(l, h + 2), t, i, r));
            break;
          }
        l[h] == t && (r = this.putAction(ut(l, h + 1), t, i, r));
      }
    return r;
  }
}
class Gb {
  constructor(e, t, i, r) {
    this.parser = e, this.input = t, this.ranges = r, this.recovering = 0, this.nextStackID = 9812, this.minStackPos = 0, this.reused = [], this.stoppedAt = null, this.lastBigReductionStart = -1, this.lastBigReductionSize = 0, this.bigReductionCount = 0, this.stream = new Bb(t, r), this.tokens = new Nb(e, this.stream), this.topTerm = e.top[1];
    let { from: s } = r[0];
    this.stacks = [Pr.start(this, e.top[0], s)], this.fragments = i.length && this.stream.end - s > e.bufferLength * 4 ? new jb(i, e.nodeSet) : null;
  }
  get parsedPos() {
    return this.minStackPos;
  }
  // Move the parser forward. This will process all parse stacks at
  // `this.pos` and try to advance them to a further position. If no
  // stack for such a position is found, it'll start error-recovery.
  //
  // When the parse is finished, this will return a syntax tree. When
  // not, it returns `null`.
  advance() {
    let e = this.stacks, t = this.minStackPos, i = this.stacks = [], r, s;
    if (this.bigReductionCount > 300 && e.length == 1) {
      let [o] = e;
      for (; o.forceReduce() && o.stack.length && o.stack[o.stack.length - 2] >= this.lastBigReductionStart; )
        ;
      this.bigReductionCount = this.lastBigReductionSize = 0;
    }
    for (let o = 0; o < e.length; o++) {
      let l = e[o];
      for (; ; ) {
        if (this.tokens.mainToken = null, l.pos > t)
          i.push(l);
        else {
          if (this.advanceStack(l, i, e))
            continue;
          {
            r || (r = [], s = []), r.push(l);
            let a = this.tokens.getMainToken(l);
            s.push(a.value, a.end);
          }
        }
        break;
      }
    }
    if (!i.length) {
      let o = r && Fb(r);
      if (o)
        return ve && console.log("Finish with " + this.stackID(o)), this.stackToTree(o);
      if (this.parser.strict)
        throw ve && r && console.log("Stuck with token " + (this.tokens.mainToken ? this.parser.getName(this.tokens.mainToken.value) : "none")), new SyntaxError("No parse at " + t);
      this.recovering || (this.recovering = 5);
    }
    if (this.recovering && r) {
      let o = this.stoppedAt != null && r[0].pos > this.stoppedAt ? r[0] : this.runRecovery(r, s, i);
      if (o)
        return ve && console.log("Force-finish " + this.stackID(o)), this.stackToTree(o.forceAll());
    }
    if (this.recovering) {
      let o = this.recovering == 1 ? 1 : this.recovering * 3;
      if (i.length > o)
        for (i.sort((l, a) => a.score - l.score); i.length > o; )
          i.pop();
      i.some((l) => l.reducePos > t) && this.recovering--;
    } else if (i.length > 1) {
      e: for (let o = 0; o < i.length - 1; o++) {
        let l = i[o];
        for (let a = o + 1; a < i.length; a++) {
          let h = i[a];
          if (l.sameState(h) || l.buffer.length > 500 && h.buffer.length > 500)
            if ((l.score - h.score || l.buffer.length - h.buffer.length) > 0)
              i.splice(a--, 1);
            else {
              i.splice(o--, 1);
              continue e;
            }
        }
      }
      i.length > 12 && (i.sort((o, l) => l.score - o.score), i.splice(
        12,
        i.length - 12
        /* Rec.MaxStackCount */
      ));
    }
    this.minStackPos = i[0].pos;
    for (let o = 1; o < i.length; o++)
      i[o].pos < this.minStackPos && (this.minStackPos = i[o].pos);
    return null;
  }
  stopAt(e) {
    if (this.stoppedAt != null && this.stoppedAt < e)
      throw new RangeError("Can't move stoppedAt forward");
    this.stoppedAt = e;
  }
  // Returns an updated version of the given stack, or null if the
  // stack can't advance normally. When `split` and `stacks` are
  // given, stacks split off by ambiguous operations will be pushed to
  // `split`, or added to `stacks` if they move `pos` forward.
  advanceStack(e, t, i) {
    let r = e.pos, { parser: s } = this, o = ve ? this.stackID(e) + " -> " : "";
    if (this.stoppedAt != null && r > this.stoppedAt)
      return e.forceReduce() ? e : null;
    if (this.fragments) {
      let h = e.curContext && e.curContext.tracker.strict, c = h ? e.curContext.hash : 0;
      for (let f = this.fragments.nodeAt(r); f; ) {
        let u = this.parser.nodeSet.types[f.type.id] == f.type ? s.getGoto(e.state, f.type.id) : -1;
        if (u > -1 && f.length && (!h || (f.prop(z.contextHash) || 0) == c))
          return e.useNode(f, u), ve && console.log(o + this.stackID(e) + ` (via reuse of ${s.getName(f.type.id)})`), !0;
        if (!(f instanceof H) || f.children.length == 0 || f.positions[0] > 0)
          break;
        let d = f.children[0];
        if (d instanceof H && f.positions[0] == 0)
          f = d;
        else
          break;
      }
    }
    let l = s.stateSlot(
      e.state,
      4
      /* ParseState.DefaultReduce */
    );
    if (l > 0)
      return e.reduce(l), ve && console.log(o + this.stackID(e) + ` (via always-reduce ${s.getName(
        l & 65535
        /* Action.ValueMask */
      )})`), !0;
    if (e.stack.length >= 8400)
      for (; e.stack.length > 6e3 && e.forceReduce(); )
        ;
    let a = this.tokens.getActions(e);
    for (let h = 0; h < a.length; ) {
      let c = a[h++], f = a[h++], u = a[h++], d = h == a.length || !i, O = d ? e : e.split(), m = this.tokens.mainToken;
      if (O.apply(c, f, m ? m.start : O.pos, u), ve && console.log(o + this.stackID(O) + ` (via ${c & 65536 ? `reduce of ${s.getName(
        c & 65535
        /* Action.ValueMask */
      )}` : "shift"} for ${s.getName(f)} @ ${r}${O == e ? "" : ", split"})`), d)
        return !0;
      O.pos > r ? t.push(O) : i.push(O);
    }
    return !1;
  }
  // Advance a given stack forward as far as it will go. Returns the
  // (possibly updated) stack if it got stuck, or null if it moved
  // forward and was given to `pushStackDedup`.
  advanceFully(e, t) {
    let i = e.pos;
    for (; ; ) {
      if (!this.advanceStack(e, null, null))
        return !1;
      if (e.pos > i)
        return mh(e, t), !0;
    }
  }
  runRecovery(e, t, i) {
    let r = null, s = !1;
    for (let o = 0; o < e.length; o++) {
      let l = e[o], a = t[o << 1], h = t[(o << 1) + 1], c = ve ? this.stackID(l) + " -> " : "";
      if (l.deadEnd && (s || (s = !0, l.restart(), ve && console.log(c + this.stackID(l) + " (restarted)"), this.advanceFully(l, i))))
        continue;
      let f = l.split(), u = c;
      for (let d = 0; d < 10 && f.forceReduce() && (ve && console.log(u + this.stackID(f) + " (via force-reduce)"), !this.advanceFully(f, i)); d++)
        ve && (u = this.stackID(f) + " -> ");
      for (let d of l.recoverByInsert(a))
        ve && console.log(c + this.stackID(d) + " (via recover-insert)"), this.advanceFully(d, i);
      this.stream.end > l.pos ? (h == l.pos && (h++, a = 0), l.recoverByDelete(a, h), ve && console.log(c + this.stackID(l) + ` (via recover-delete ${this.parser.getName(a)})`), mh(l, i)) : (!r || r.score < f.score) && (r = f);
    }
    return r;
  }
  // Convert the stack's buffer to a syntax tree.
  stackToTree(e) {
    return e.close(), H.build({
      buffer: vr.create(e),
      nodeSet: this.parser.nodeSet,
      topID: this.topTerm,
      maxBufferLength: this.parser.bufferLength,
      reused: this.reused,
      start: this.ranges[0].from,
      length: e.pos - this.ranges[0].from,
      minRepeatType: this.parser.minRepeatTerm
    });
  }
  stackID(e) {
    let t = (xs || (xs = /* @__PURE__ */ new WeakMap())).get(e);
    return t || xs.set(e, t = String.fromCodePoint(this.nextStackID++)), t + e;
  }
}
function mh(n, e) {
  for (let t = 0; t < e.length; t++) {
    let i = e[t];
    if (i.pos == n.pos && i.sameState(n)) {
      e[t].score < n.score && (e[t] = n);
      return;
    }
  }
  e.push(n);
}
class Ub {
  constructor(e, t, i) {
    this.source = e, this.flags = t, this.disabled = i;
  }
  allows(e) {
    return !this.disabled || this.disabled[e] == 0;
  }
}
const ws = (n) => n;
class Lu {
  /**
  Define a context tracker.
  */
  constructor(e) {
    this.start = e.start, this.shift = e.shift || ws, this.reduce = e.reduce || ws, this.reuse = e.reuse || ws, this.hash = e.hash || (() => 0), this.strict = e.strict !== !1;
  }
}
class gi extends mf {
  /**
  @internal
  */
  constructor(e) {
    if (super(), this.wrappers = [], e.version != 14)
      throw new RangeError(`Parser version (${e.version}) doesn't match runtime version (14)`);
    let t = e.nodeNames.split(" ");
    this.minRepeatTerm = t.length;
    for (let l = 0; l < e.repeatNodeCount; l++)
      t.push("");
    let i = Object.keys(e.topRules).map((l) => e.topRules[l][1]), r = [];
    for (let l = 0; l < t.length; l++)
      r.push([]);
    function s(l, a, h) {
      r[l].push([a, a.deserialize(String(h))]);
    }
    if (e.nodeProps)
      for (let l of e.nodeProps) {
        let a = l[0];
        typeof a == "string" && (a = z[a]);
        for (let h = 1; h < l.length; ) {
          let c = l[h++];
          if (c >= 0)
            s(c, a, l[h++]);
          else {
            let f = l[h + -c];
            for (let u = -c; u > 0; u--)
              s(l[h++], a, f);
            h++;
          }
        }
      }
    this.nodeSet = new Uo(t.map((l, a) => Qe.define({
      name: a >= this.minRepeatTerm ? void 0 : l,
      id: a,
      props: r[a],
      top: i.indexOf(a) > -1,
      error: a == 0,
      skipped: e.skippedNodes && e.skippedNodes.indexOf(a) > -1
    }))), e.propSources && (this.nodeSet = this.nodeSet.extend(...e.propSources)), this.strict = !1, this.bufferLength = ff;
    let o = Yi(e.tokenData);
    this.context = e.context, this.specializerSpecs = e.specialized || [], this.specialized = new Uint16Array(this.specializerSpecs.length);
    for (let l = 0; l < this.specializerSpecs.length; l++)
      this.specialized[l] = this.specializerSpecs[l].term;
    this.specializers = this.specializerSpecs.map(gh), this.states = Yi(e.states, Uint32Array), this.data = Yi(e.stateData), this.goto = Yi(e.goto), this.maxTerm = e.maxTerm, this.tokenizers = e.tokenizers.map((l) => typeof l == "number" ? new ai(o, l) : l), this.topRules = e.topRules, this.dialects = e.dialects || {}, this.dynamicPrecedences = e.dynamicPrecedences || null, this.tokenPrecTable = e.tokenPrec, this.termNames = e.termNames || null, this.maxNode = this.nodeSet.types.length - 1, this.dialect = this.parseDialect(), this.top = this.topRules[Object.keys(this.topRules)[0]];
  }
  createParse(e, t, i) {
    let r = new Gb(this, e, t, i);
    for (let s of this.wrappers)
      r = s(r, e, t, i);
    return r;
  }
  /**
  Get a goto table entry @internal
  */
  getGoto(e, t, i = !1) {
    let r = this.goto;
    if (t >= r[0])
      return -1;
    for (let s = r[t + 1]; ; ) {
      let o = r[s++], l = o & 1, a = r[s++];
      if (l && i)
        return a;
      for (let h = s + (o >> 1); s < h; s++)
        if (r[s] == e)
          return a;
      if (l)
        return -1;
    }
  }
  /**
  Check if this state has an action for a given terminal @internal
  */
  hasAction(e, t) {
    let i = this.data;
    for (let r = 0; r < 2; r++)
      for (let s = this.stateSlot(
        e,
        r ? 2 : 1
        /* ParseState.Actions */
      ), o; ; s += 3) {
        if ((o = i[s]) == 65535)
          if (i[s + 1] == 1)
            o = i[s = ut(i, s + 2)];
          else {
            if (i[s + 1] == 2)
              return ut(i, s + 2);
            break;
          }
        if (o == t || o == 0)
          return ut(i, s + 1);
      }
    return 0;
  }
  /**
  @internal
  */
  stateSlot(e, t) {
    return this.states[e * 6 + t];
  }
  /**
  @internal
  */
  stateFlag(e, t) {
    return (this.stateSlot(
      e,
      0
      /* ParseState.Flags */
    ) & t) > 0;
  }
  /**
  @internal
  */
  validAction(e, t) {
    return !!this.allActions(e, (i) => i == t ? !0 : null);
  }
  /**
  @internal
  */
  allActions(e, t) {
    let i = this.stateSlot(
      e,
      4
      /* ParseState.DefaultReduce */
    ), r = i ? t(i) : void 0;
    for (let s = this.stateSlot(
      e,
      1
      /* ParseState.Actions */
    ); r == null; s += 3) {
      if (this.data[s] == 65535)
        if (this.data[s + 1] == 1)
          s = ut(this.data, s + 2);
        else
          break;
      r = t(ut(this.data, s + 1));
    }
    return r;
  }
  /**
  Get the states that can follow this one through shift actions or
  goto jumps. @internal
  */
  nextStates(e) {
    let t = [];
    for (let i = this.stateSlot(
      e,
      1
      /* ParseState.Actions */
    ); ; i += 3) {
      if (this.data[i] == 65535)
        if (this.data[i + 1] == 1)
          i = ut(this.data, i + 2);
        else
          break;
      if (!(this.data[i + 2] & 1)) {
        let r = this.data[i + 1];
        t.some((s, o) => o & 1 && s == r) || t.push(this.data[i], r);
      }
    }
    return t;
  }
  /**
  Configure the parser. Returns a new parser instance that has the
  given settings modified. Settings not provided in `config` are
  kept from the original parser.
  */
  configure(e) {
    let t = Object.assign(Object.create(gi.prototype), this);
    if (e.props && (t.nodeSet = this.nodeSet.extend(...e.props)), e.top) {
      let i = this.topRules[e.top];
      if (!i)
        throw new RangeError(`Invalid top rule name ${e.top}`);
      t.top = i;
    }
    return e.tokenizers && (t.tokenizers = this.tokenizers.map((i) => {
      let r = e.tokenizers.find((s) => s.from == i);
      return r ? r.to : i;
    })), e.specializers && (t.specializers = this.specializers.slice(), t.specializerSpecs = this.specializerSpecs.map((i, r) => {
      let s = e.specializers.find((l) => l.from == i.external);
      if (!s)
        return i;
      let o = Object.assign(Object.assign({}, i), { external: s.to });
      return t.specializers[r] = gh(o), o;
    })), e.contextTracker && (t.context = e.contextTracker), e.dialect && (t.dialect = this.parseDialect(e.dialect)), e.strict != null && (t.strict = e.strict), e.wrap && (t.wrappers = t.wrappers.concat(e.wrap)), e.bufferLength != null && (t.bufferLength = e.bufferLength), t;
  }
  /**
  Tells you whether any [parse wrappers](#lr.ParserConfig.wrap)
  are registered for this parser.
  */
  hasWrappers() {
    return this.wrappers.length > 0;
  }
  /**
  Returns the name associated with a given term. This will only
  work for all terms when the parser was generated with the
  `--names` option. By default, only the names of tagged terms are
  stored.
  */
  getName(e) {
    return this.termNames ? this.termNames[e] : String(e <= this.maxNode && this.nodeSet.types[e].name || e);
  }
  /**
  The eof term id is always allocated directly after the node
  types. @internal
  */
  get eofTerm() {
    return this.maxNode + 1;
  }
  /**
  The type of top node produced by the parser.
  */
  get topNode() {
    return this.nodeSet.types[this.top[1]];
  }
  /**
  @internal
  */
  dynamicPrecedence(e) {
    let t = this.dynamicPrecedences;
    return t == null ? 0 : t[e] || 0;
  }
  /**
  @internal
  */
  parseDialect(e) {
    let t = Object.keys(this.dialects), i = t.map(() => !1);
    if (e)
      for (let s of e.split(" ")) {
        let o = t.indexOf(s);
        o >= 0 && (i[o] = !0);
      }
    let r = null;
    for (let s = 0; s < t.length; s++)
      if (!i[s])
        for (let o = this.dialects[t[s]], l; (l = this.data[o++]) != 65535; )
          (r || (r = new Uint8Array(this.maxTerm + 1)))[l] = 1;
    return new Ub(e, i, r);
  }
  /**
  Used by the output of the parser generator. Not available to
  user code. @hide
  */
  static deserialize(e) {
    return new gi(e);
  }
}
function ut(n, e) {
  return n[e] | n[e + 1] << 16;
}
function Fb(n) {
  let e = null;
  for (let t of n) {
    let i = t.p.stoppedAt;
    (t.pos == t.p.stream.end || i != null && t.pos > i) && t.p.parser.stateFlag(
      t.state,
      2
      /* StateFlag.Accepting */
    ) && (!e || e.score < t.score) && (e = t);
  }
  return e;
}
function gh(n) {
  if (n.external) {
    let e = n.extend ? 1 : 0;
    return (t, i) => n.external(t, i) << 1 | e;
  }
  return n.get;
}
const Hb = 55, Kb = 1, Jb = 56, eS = 2, tS = 57, iS = 3, Qh = 4, nS = 5, Ql = 6, Bu = 7, Iu = 8, ju = 9, Nu = 10, rS = 11, sS = 12, oS = 13, ks = 58, lS = 14, aS = 15, bh = 59, Gu = 21, hS = 23, Uu = 24, cS = 25, Po = 27, Fu = 28, fS = 29, uS = 32, dS = 35, OS = 37, pS = 38, mS = 0, gS = 1, QS = {
  area: !0,
  base: !0,
  br: !0,
  col: !0,
  command: !0,
  embed: !0,
  frame: !0,
  hr: !0,
  img: !0,
  input: !0,
  keygen: !0,
  link: !0,
  meta: !0,
  param: !0,
  source: !0,
  track: !0,
  wbr: !0,
  menuitem: !0
}, bS = {
  dd: !0,
  li: !0,
  optgroup: !0,
  option: !0,
  p: !0,
  rp: !0,
  rt: !0,
  tbody: !0,
  td: !0,
  tfoot: !0,
  th: !0,
  tr: !0
}, Sh = {
  dd: { dd: !0, dt: !0 },
  dt: { dd: !0, dt: !0 },
  li: { li: !0 },
  option: { option: !0, optgroup: !0 },
  optgroup: { optgroup: !0 },
  p: {
    address: !0,
    article: !0,
    aside: !0,
    blockquote: !0,
    dir: !0,
    div: !0,
    dl: !0,
    fieldset: !0,
    footer: !0,
    form: !0,
    h1: !0,
    h2: !0,
    h3: !0,
    h4: !0,
    h5: !0,
    h6: !0,
    header: !0,
    hgroup: !0,
    hr: !0,
    menu: !0,
    nav: !0,
    ol: !0,
    p: !0,
    pre: !0,
    section: !0,
    table: !0,
    ul: !0
  },
  rp: { rp: !0, rt: !0 },
  rt: { rp: !0, rt: !0 },
  tbody: { tbody: !0, tfoot: !0 },
  td: { td: !0, th: !0 },
  tfoot: { tbody: !0 },
  th: { td: !0, th: !0 },
  thead: { tbody: !0, tfoot: !0 },
  tr: { tr: !0 }
};
function SS(n) {
  return n == 45 || n == 46 || n == 58 || n >= 65 && n <= 90 || n == 95 || n >= 97 && n <= 122 || n >= 161;
}
let yh = null, xh = null, wh = 0;
function vo(n, e) {
  let t = n.pos + e;
  if (wh == t && xh == n) return yh;
  let i = n.peek(e), r = "";
  for (; SS(i); )
    r += String.fromCharCode(i), i = n.peek(++e);
  return xh = n, wh = t, yh = r ? r.toLowerCase() : i == yS || i == xS ? void 0 : null;
}
const Hu = 60, Cr = 62, bl = 47, yS = 63, xS = 33, wS = 45;
function kh(n, e) {
  this.name = n, this.parent = e;
}
const kS = [Ql, Nu, Bu, Iu, ju], $S = new Lu({
  start: null,
  shift(n, e, t, i) {
    return kS.indexOf(e) > -1 ? new kh(vo(i, 1) || "", n) : n;
  },
  reduce(n, e) {
    return e == Gu && n ? n.parent : n;
  },
  reuse(n, e, t, i) {
    let r = e.type.id;
    return r == Ql || r == OS ? new kh(vo(i, 1) || "", n) : n;
  },
  strict: !1
}), PS = new Xe((n, e) => {
  if (n.next != Hu) {
    n.next < 0 && e.context && n.acceptToken(ks);
    return;
  }
  n.advance();
  let t = n.next == bl;
  t && n.advance();
  let i = vo(n, 0);
  if (i === void 0) return;
  if (!i) return n.acceptToken(t ? aS : lS);
  let r = e.context ? e.context.name : null;
  if (t) {
    if (i == r) return n.acceptToken(rS);
    if (r && bS[r]) return n.acceptToken(ks, -2);
    if (e.dialectEnabled(mS)) return n.acceptToken(sS);
    for (let s = e.context; s; s = s.parent) if (s.name == i) return;
    n.acceptToken(oS);
  } else {
    if (i == "script") return n.acceptToken(Bu);
    if (i == "style") return n.acceptToken(Iu);
    if (i == "textarea") return n.acceptToken(ju);
    if (QS.hasOwnProperty(i)) return n.acceptToken(Nu);
    r && Sh[r] && Sh[r][i] ? n.acceptToken(ks, -1) : n.acceptToken(Ql);
  }
}, { contextual: !0 }), vS = new Xe((n) => {
  for (let e = 0, t = 0; ; t++) {
    if (n.next < 0) {
      t && n.acceptToken(bh);
      break;
    }
    if (n.next == wS)
      e++;
    else if (n.next == Cr && e >= 2) {
      t >= 3 && n.acceptToken(bh, -2);
      break;
    } else
      e = 0;
    n.advance();
  }
});
function TS(n) {
  for (; n; n = n.parent)
    if (n.name == "svg" || n.name == "math") return !0;
  return !1;
}
const CS = new Xe((n, e) => {
  if (n.next == bl && n.peek(1) == Cr) {
    let t = e.dialectEnabled(gS) || TS(e.context);
    n.acceptToken(t ? nS : Qh, 2);
  } else n.next == Cr && n.acceptToken(Qh, 1);
});
function Sl(n, e, t) {
  let i = 2 + n.length;
  return new Xe((r) => {
    for (let s = 0, o = 0, l = 0; ; l++) {
      if (r.next < 0) {
        l && r.acceptToken(e);
        break;
      }
      if (s == 0 && r.next == Hu || s == 1 && r.next == bl || s >= 2 && s < i && r.next == n.charCodeAt(s - 2))
        s++, o++;
      else if (s == i && r.next == Cr) {
        l > o ? r.acceptToken(e, -o) : r.acceptToken(t, -(o - 2));
        break;
      } else if ((r.next == 10 || r.next == 13) && l) {
        r.acceptToken(e, 1);
        break;
      } else
        s = o = 0;
      r.advance();
    }
  });
}
const ZS = Sl("script", Hb, Kb), XS = Sl("style", Jb, eS), AS = Sl("textarea", tS, iS), MS = Er({
  "Text RawText IncompleteTag IncompleteCloseTag": p.content,
  "StartTag StartCloseTag SelfClosingEndTag EndTag": p.angleBracket,
  TagName: p.tagName,
  "MismatchedCloseTag/TagName": [p.tagName, p.invalid],
  AttributeName: p.attributeName,
  "AttributeValue UnquotedAttributeValue": p.attributeValue,
  Is: p.definitionOperator,
  "EntityReference CharacterReference": p.character,
  Comment: p.blockComment,
  ProcessingInst: p.processingInstruction,
  DoctypeDecl: p.documentMeta
}), RS = gi.deserialize({
  version: 14,
  states: ",xOVO!rOOO!ZQ#tO'#CrO!`Q#tO'#C{O!eQ#tO'#DOO!jQ#tO'#DRO!oQ#tO'#DTO!tOaO'#CqO#PObO'#CqO#[OdO'#CqO$kO!rO'#CqOOO`'#Cq'#CqO$rO$fO'#DUO$zQ#tO'#DWO%PQ#tO'#DXOOO`'#Dl'#DlOOO`'#DZ'#DZQVO!rOOO%UQ&rO,59^O%aQ&rO,59gO%lQ&rO,59jO%wQ&rO,59mO&SQ&rO,59oOOOa'#D_'#D_O&_OaO'#CyO&jOaO,59]OOOb'#D`'#D`O&rObO'#C|O&}ObO,59]OOOd'#Da'#DaO'VOdO'#DPO'bOdO,59]OOO`'#Db'#DbO'jO!rO,59]O'qQ#tO'#DSOOO`,59],59]OOOp'#Dc'#DcO'vO$fO,59pOOO`,59p,59pO(OQ#|O,59rO(TQ#|O,59sOOO`-E7X-E7XO(YQ&rO'#CtOOQW'#D['#D[O(hQ&rO1G.xOOOa1G.x1G.xOOO`1G/Z1G/ZO(sQ&rO1G/ROOOb1G/R1G/RO)OQ&rO1G/UOOOd1G/U1G/UO)ZQ&rO1G/XOOO`1G/X1G/XO)fQ&rO1G/ZOOOa-E7]-E7]O)qQ#tO'#CzOOO`1G.w1G.wOOOb-E7^-E7^O)vQ#tO'#C}OOOd-E7_-E7_O){Q#tO'#DQOOO`-E7`-E7`O*QQ#|O,59nOOOp-E7a-E7aOOO`1G/[1G/[OOO`1G/^1G/^OOO`1G/_1G/_O*VQ,UO,59`OOQW-E7Y-E7YOOOa7+$d7+$dOOO`7+$u7+$uOOOb7+$m7+$mOOOd7+$p7+$pOOO`7+$s7+$sO*bQ#|O,59fO*gQ#|O,59iO*lQ#|O,59lOOO`1G/Y1G/YO*qO7[O'#CwO+SOMhO'#CwOOQW1G.z1G.zOOO`1G/Q1G/QOOO`1G/T1G/TOOO`1G/W1G/WOOOO'#D]'#D]O+eO7[O,59cOOQW,59c,59cOOOO'#D^'#D^O+vOMhO,59cOOOO-E7Z-E7ZOOQW1G.}1G.}OOOO-E7[-E7[",
  stateData: ",c~O!_OS~OUSOVPOWQOXROYTO[]O][O^^O_^Oa^Ob^Oc^Od^Oy^O|_O!eZO~OgaO~OgbO~OgcO~OgdO~OgeO~O!XfOPmP![mP~O!YiOQpP![pP~O!ZlORsP![sP~OUSOVPOWQOXROYTOZqO[]O][O^^O_^Oa^Ob^Oc^Od^Oy^O!eZO~O![rO~P#gO!]sO!fuO~OgvO~OgwO~OS|OT}OiyO~OS!POT}OiyO~OS!ROT}OiyO~OS!TOT}OiyO~OS}OT}OiyO~O!XfOPmX![mX~OP!WO![!XO~O!YiOQpX![pX~OQ!ZO![!XO~O!ZlORsX![sX~OR!]O![!XO~O![!XO~P#gOg!_O~O!]sO!f!aO~OS!bO~OS!cO~Oj!dOShXThXihX~OS!fOT!gOiyO~OS!hOT!gOiyO~OS!iOT!gOiyO~OS!jOT!gOiyO~OS!gOT!gOiyO~Og!kO~Og!lO~Og!mO~OS!nO~Ol!qO!a!oO!c!pO~OS!rO~OS!sO~OS!tO~Ob!uOc!uOd!uO!a!wO!b!uO~Ob!xOc!xOd!xO!c!wO!d!xO~Ob!uOc!uOd!uO!a!{O!b!uO~Ob!xOc!xOd!xO!c!{O!d!xO~OT~cbd!ey|!e~",
  goto: "%q!aPPPPPPPPPPPPPPPPPPPPP!b!hP!nPP!zP!}#Q#T#Z#^#a#g#j#m#s#y!bP!b!bP$P$V$m$s$y%P%V%]%cPPPPPPPP%iX^OX`pXUOX`pezabcde{!O!Q!S!UR!q!dRhUR!XhXVOX`pRkVR!XkXWOX`pRnWR!XnXXOX`pQrXR!XpXYOX`pQ`ORx`Q{aQ!ObQ!QcQ!SdQ!UeZ!e{!O!Q!S!UQ!v!oR!z!vQ!y!pR!|!yQgUR!VgQjVR!YjQmWR![mQpXR!^pQtZR!`tS_O`ToXp",
  nodeNames: "⚠ StartCloseTag StartCloseTag StartCloseTag EndTag SelfClosingEndTag StartTag StartTag StartTag StartTag StartTag StartCloseTag StartCloseTag StartCloseTag IncompleteTag IncompleteCloseTag Document Text EntityReference CharacterReference InvalidEntity Element OpenTag TagName Attribute AttributeName Is AttributeValue UnquotedAttributeValue ScriptText CloseTag OpenTag StyleText CloseTag OpenTag TextareaText CloseTag OpenTag CloseTag SelfClosingTag Comment ProcessingInst MismatchedCloseTag CloseTag DoctypeDecl",
  maxTerm: 68,
  context: $S,
  nodeProps: [
    ["closedBy", -10, 1, 2, 3, 7, 8, 9, 10, 11, 12, 13, "EndTag", 6, "EndTag SelfClosingEndTag", -4, 22, 31, 34, 37, "CloseTag"],
    ["openedBy", 4, "StartTag StartCloseTag", 5, "StartTag", -4, 30, 33, 36, 38, "OpenTag"],
    ["group", -10, 14, 15, 18, 19, 20, 21, 40, 41, 42, 43, "Entity", 17, "Entity TextContent", -3, 29, 32, 35, "TextContent Entity"],
    ["isolate", -11, 22, 30, 31, 33, 34, 36, 37, 38, 39, 42, 43, "ltr", -3, 27, 28, 40, ""]
  ],
  propSources: [MS],
  skippedNodes: [0],
  repeatNodeCount: 9,
  tokenData: "!<p!aR!YOX$qXY,QYZ,QZ[$q[]&X]^,Q^p$qpq,Qqr-_rs3_sv-_vw3}wxHYx}-_}!OH{!O!P-_!P!Q$q!Q![-_![!]Mz!]!^-_!^!_!$S!_!`!;x!`!a&X!a!c-_!c!}Mz!}#R-_#R#SMz#S#T1k#T#oMz#o#s-_#s$f$q$f%W-_%W%oMz%o%p-_%p&aMz&a&b-_&b1pMz1p4U-_4U4dMz4d4e-_4e$ISMz$IS$I`-_$I`$IbMz$Ib$Kh-_$Kh%#tMz%#t&/x-_&/x&EtMz&Et&FV-_&FV;'SMz;'S;:j!#|;:j;=`3X<%l?&r-_?&r?AhMz?Ah?BY$q?BY?MnMz?MnO$q!Z$|caPlW!b`!dpOX$qXZ&XZ[$q[^&X^p$qpq&Xqr$qrs&}sv$qvw+Pwx(tx!^$q!^!_*V!_!a&X!a#S$q#S#T&X#T;'S$q;'S;=`+z<%lO$q!R&bXaP!b`!dpOr&Xrs&}sv&Xwx(tx!^&X!^!_*V!_;'S&X;'S;=`*y<%lO&Xq'UVaP!dpOv&}wx'kx!^&}!^!_(V!_;'S&};'S;=`(n<%lO&}P'pTaPOv'kw!^'k!_;'S'k;'S;=`(P<%lO'kP(SP;=`<%l'kp([S!dpOv(Vx;'S(V;'S;=`(h<%lO(Vp(kP;=`<%l(Vq(qP;=`<%l&}a({WaP!b`Or(trs'ksv(tw!^(t!^!_)e!_;'S(t;'S;=`*P<%lO(t`)jT!b`Or)esv)ew;'S)e;'S;=`)y<%lO)e`)|P;=`<%l)ea*SP;=`<%l(t!Q*^V!b`!dpOr*Vrs(Vsv*Vwx)ex;'S*V;'S;=`*s<%lO*V!Q*vP;=`<%l*V!R*|P;=`<%l&XW+UYlWOX+PZ[+P^p+Pqr+Psw+Px!^+P!a#S+P#T;'S+P;'S;=`+t<%lO+PW+wP;=`<%l+P!Z+}P;=`<%l$q!a,]`aP!b`!dp!_^OX&XXY,QYZ,QZ]&X]^,Q^p&Xpq,Qqr&Xrs&}sv&Xwx(tx!^&X!^!_*V!_;'S&X;'S;=`*y<%lO&X!_-ljiSaPlW!b`!dpOX$qXZ&XZ[$q[^&X^p$qpq&Xqr-_rs&}sv-_vw/^wx(tx!P-_!P!Q$q!Q!^-_!^!_*V!_!a&X!a#S-_#S#T1k#T#s-_#s$f$q$f;'S-_;'S;=`3X<%l?Ah-_?Ah?BY$q?BY?Mn-_?MnO$q[/ebiSlWOX+PZ[+P^p+Pqr/^sw/^x!P/^!P!Q+P!Q!^/^!a#S/^#S#T0m#T#s/^#s$f+P$f;'S/^;'S;=`1e<%l?Ah/^?Ah?BY+P?BY?Mn/^?MnO+PS0rXiSqr0msw0mx!P0m!Q!^0m!a#s0m$f;'S0m;'S;=`1_<%l?Ah0m?BY?Mn0mS1bP;=`<%l0m[1hP;=`<%l/^!V1vciSaP!b`!dpOq&Xqr1krs&}sv1kvw0mwx(tx!P1k!P!Q&X!Q!^1k!^!_*V!_!a&X!a#s1k#s$f&X$f;'S1k;'S;=`3R<%l?Ah1k?Ah?BY&X?BY?Mn1k?MnO&X!V3UP;=`<%l1k!_3[P;=`<%l-_!Z3hV!ahaP!dpOv&}wx'kx!^&}!^!_(V!_;'S&};'S;=`(n<%lO&}!_4WiiSlWd!ROX5uXZ7SZ[5u[^7S^p5uqr8trs7Sst>]tw8twx7Sx!P8t!P!Q5u!Q!]8t!]!^/^!^!a7S!a#S8t#S#T;{#T#s8t#s$f5u$f;'S8t;'S;=`>V<%l?Ah8t?Ah?BY5u?BY?Mn8t?MnO5u!Z5zblWOX5uXZ7SZ[5u[^7S^p5uqr5urs7Sst+Ptw5uwx7Sx!]5u!]!^7w!^!a7S!a#S5u#S#T7S#T;'S5u;'S;=`8n<%lO5u!R7VVOp7Sqs7St!]7S!]!^7l!^;'S7S;'S;=`7q<%lO7S!R7qOb!R!R7tP;=`<%l7S!Z8OYlWb!ROX+PZ[+P^p+Pqr+Psw+Px!^+P!a#S+P#T;'S+P;'S;=`+t<%lO+P!Z8qP;=`<%l5u!_8{iiSlWOX5uXZ7SZ[5u[^7S^p5uqr8trs7Sst/^tw8twx7Sx!P8t!P!Q5u!Q!]8t!]!^:j!^!a7S!a#S8t#S#T;{#T#s8t#s$f5u$f;'S8t;'S;=`>V<%l?Ah8t?Ah?BY5u?BY?Mn8t?MnO5u!_:sbiSlWb!ROX+PZ[+P^p+Pqr/^sw/^x!P/^!P!Q+P!Q!^/^!a#S/^#S#T0m#T#s/^#s$f+P$f;'S/^;'S;=`1e<%l?Ah/^?Ah?BY+P?BY?Mn/^?MnO+P!V<QciSOp7Sqr;{rs7Sst0mtw;{wx7Sx!P;{!P!Q7S!Q!];{!]!^=]!^!a7S!a#s;{#s$f7S$f;'S;{;'S;=`>P<%l?Ah;{?Ah?BY7S?BY?Mn;{?MnO7S!V=dXiSb!Rqr0msw0mx!P0m!Q!^0m!a#s0m$f;'S0m;'S;=`1_<%l?Ah0m?BY?Mn0m!V>SP;=`<%l;{!_>YP;=`<%l8t!_>dhiSlWOX@OXZAYZ[@O[^AY^p@OqrBwrsAYswBwwxAYx!PBw!P!Q@O!Q!]Bw!]!^/^!^!aAY!a#SBw#S#TE{#T#sBw#s$f@O$f;'SBw;'S;=`HS<%l?AhBw?Ah?BY@O?BY?MnBw?MnO@O!Z@TalWOX@OXZAYZ[@O[^AY^p@Oqr@OrsAYsw@OwxAYx!]@O!]!^Az!^!aAY!a#S@O#S#TAY#T;'S@O;'S;=`Bq<%lO@O!RA]UOpAYq!]AY!]!^Ao!^;'SAY;'S;=`At<%lOAY!RAtOc!R!RAwP;=`<%lAY!ZBRYlWc!ROX+PZ[+P^p+Pqr+Psw+Px!^+P!a#S+P#T;'S+P;'S;=`+t<%lO+P!ZBtP;=`<%l@O!_COhiSlWOX@OXZAYZ[@O[^AY^p@OqrBwrsAYswBwwxAYx!PBw!P!Q@O!Q!]Bw!]!^Dj!^!aAY!a#SBw#S#TE{#T#sBw#s$f@O$f;'SBw;'S;=`HS<%l?AhBw?Ah?BY@O?BY?MnBw?MnO@O!_DsbiSlWc!ROX+PZ[+P^p+Pqr/^sw/^x!P/^!P!Q+P!Q!^/^!a#S/^#S#T0m#T#s/^#s$f+P$f;'S/^;'S;=`1e<%l?Ah/^?Ah?BY+P?BY?Mn/^?MnO+P!VFQbiSOpAYqrE{rsAYswE{wxAYx!PE{!P!QAY!Q!]E{!]!^GY!^!aAY!a#sE{#s$fAY$f;'SE{;'S;=`G|<%l?AhE{?Ah?BYAY?BY?MnE{?MnOAY!VGaXiSc!Rqr0msw0mx!P0m!Q!^0m!a#s0m$f;'S0m;'S;=`1_<%l?Ah0m?BY?Mn0m!VHPP;=`<%lE{!_HVP;=`<%lBw!ZHcW!cxaP!b`Or(trs'ksv(tw!^(t!^!_)e!_;'S(t;'S;=`*P<%lO(t!aIYliSaPlW!b`!dpOX$qXZ&XZ[$q[^&X^p$qpq&Xqr-_rs&}sv-_vw/^wx(tx}-_}!OKQ!O!P-_!P!Q$q!Q!^-_!^!_*V!_!a&X!a#S-_#S#T1k#T#s-_#s$f$q$f;'S-_;'S;=`3X<%l?Ah-_?Ah?BY$q?BY?Mn-_?MnO$q!aK_kiSaPlW!b`!dpOX$qXZ&XZ[$q[^&X^p$qpq&Xqr-_rs&}sv-_vw/^wx(tx!P-_!P!Q$q!Q!^-_!^!_*V!_!`&X!`!aMS!a#S-_#S#T1k#T#s-_#s$f$q$f;'S-_;'S;=`3X<%l?Ah-_?Ah?BY$q?BY?Mn-_?MnO$q!TM_XaP!b`!dp!fQOr&Xrs&}sv&Xwx(tx!^&X!^!_*V!_;'S&X;'S;=`*y<%lO&X!aNZ!ZiSgQaPlW!b`!dpOX$qXZ&XZ[$q[^&X^p$qpq&Xqr-_rs&}sv-_vw/^wx(tx}-_}!OMz!O!PMz!P!Q$q!Q![Mz![!]Mz!]!^-_!^!_*V!_!a&X!a!c-_!c!}Mz!}#R-_#R#SMz#S#T1k#T#oMz#o#s-_#s$f$q$f$}-_$}%OMz%O%W-_%W%oMz%o%p-_%p&aMz&a&b-_&b1pMz1p4UMz4U4dMz4d4e-_4e$ISMz$IS$I`-_$I`$IbMz$Ib$Je-_$Je$JgMz$Jg$Kh-_$Kh%#tMz%#t&/x-_&/x&EtMz&Et&FV-_&FV;'SMz;'S;:j!#|;:j;=`3X<%l?&r-_?&r?AhMz?Ah?BY$q?BY?MnMz?MnO$q!a!$PP;=`<%lMz!R!$ZY!b`!dpOq*Vqr!$yrs(Vsv*Vwx)ex!a*V!a!b!4t!b;'S*V;'S;=`*s<%lO*V!R!%Q]!b`!dpOr*Vrs(Vsv*Vwx)ex}*V}!O!%y!O!f*V!f!g!']!g#W*V#W#X!0`#X;'S*V;'S;=`*s<%lO*V!R!&QX!b`!dpOr*Vrs(Vsv*Vwx)ex}*V}!O!&m!O;'S*V;'S;=`*s<%lO*V!R!&vV!b`!dp!ePOr*Vrs(Vsv*Vwx)ex;'S*V;'S;=`*s<%lO*V!R!'dX!b`!dpOr*Vrs(Vsv*Vwx)ex!q*V!q!r!(P!r;'S*V;'S;=`*s<%lO*V!R!(WX!b`!dpOr*Vrs(Vsv*Vwx)ex!e*V!e!f!(s!f;'S*V;'S;=`*s<%lO*V!R!(zX!b`!dpOr*Vrs(Vsv*Vwx)ex!v*V!v!w!)g!w;'S*V;'S;=`*s<%lO*V!R!)nX!b`!dpOr*Vrs(Vsv*Vwx)ex!{*V!{!|!*Z!|;'S*V;'S;=`*s<%lO*V!R!*bX!b`!dpOr*Vrs(Vsv*Vwx)ex!r*V!r!s!*}!s;'S*V;'S;=`*s<%lO*V!R!+UX!b`!dpOr*Vrs(Vsv*Vwx)ex!g*V!g!h!+q!h;'S*V;'S;=`*s<%lO*V!R!+xY!b`!dpOr!+qrs!,hsv!+qvw!-Swx!.[x!`!+q!`!a!/j!a;'S!+q;'S;=`!0Y<%lO!+qq!,mV!dpOv!,hvx!-Sx!`!,h!`!a!-q!a;'S!,h;'S;=`!.U<%lO!,hP!-VTO!`!-S!`!a!-f!a;'S!-S;'S;=`!-k<%lO!-SP!-kO|PP!-nP;=`<%l!-Sq!-xS!dp|POv(Vx;'S(V;'S;=`(h<%lO(Vq!.XP;=`<%l!,ha!.aX!b`Or!.[rs!-Ssv!.[vw!-Sw!`!.[!`!a!.|!a;'S!.[;'S;=`!/d<%lO!.[a!/TT!b`|POr)esv)ew;'S)e;'S;=`)y<%lO)ea!/gP;=`<%l!.[!R!/sV!b`!dp|POr*Vrs(Vsv*Vwx)ex;'S*V;'S;=`*s<%lO*V!R!0]P;=`<%l!+q!R!0gX!b`!dpOr*Vrs(Vsv*Vwx)ex#c*V#c#d!1S#d;'S*V;'S;=`*s<%lO*V!R!1ZX!b`!dpOr*Vrs(Vsv*Vwx)ex#V*V#V#W!1v#W;'S*V;'S;=`*s<%lO*V!R!1}X!b`!dpOr*Vrs(Vsv*Vwx)ex#h*V#h#i!2j#i;'S*V;'S;=`*s<%lO*V!R!2qX!b`!dpOr*Vrs(Vsv*Vwx)ex#m*V#m#n!3^#n;'S*V;'S;=`*s<%lO*V!R!3eX!b`!dpOr*Vrs(Vsv*Vwx)ex#d*V#d#e!4Q#e;'S*V;'S;=`*s<%lO*V!R!4XX!b`!dpOr*Vrs(Vsv*Vwx)ex#X*V#X#Y!+q#Y;'S*V;'S;=`*s<%lO*V!R!4{Y!b`!dpOr!4trs!5ksv!4tvw!6Vwx!8]x!a!4t!a!b!:]!b;'S!4t;'S;=`!;r<%lO!4tq!5pV!dpOv!5kvx!6Vx!a!5k!a!b!7W!b;'S!5k;'S;=`!8V<%lO!5kP!6YTO!a!6V!a!b!6i!b;'S!6V;'S;=`!7Q<%lO!6VP!6lTO!`!6V!`!a!6{!a;'S!6V;'S;=`!7Q<%lO!6VP!7QOyPP!7TP;=`<%l!6Vq!7]V!dpOv!5kvx!6Vx!`!5k!`!a!7r!a;'S!5k;'S;=`!8V<%lO!5kq!7yS!dpyPOv(Vx;'S(V;'S;=`(h<%lO(Vq!8YP;=`<%l!5ka!8bX!b`Or!8]rs!6Vsv!8]vw!6Vw!a!8]!a!b!8}!b;'S!8];'S;=`!:V<%lO!8]a!9SX!b`Or!8]rs!6Vsv!8]vw!6Vw!`!8]!`!a!9o!a;'S!8];'S;=`!:V<%lO!8]a!9vT!b`yPOr)esv)ew;'S)e;'S;=`)y<%lO)ea!:YP;=`<%l!8]!R!:dY!b`!dpOr!4trs!5ksv!4tvw!6Vwx!8]x!`!4t!`!a!;S!a;'S!4t;'S;=`!;r<%lO!4t!R!;]V!b`!dpyPOr*Vrs(Vsv*Vwx)ex;'S*V;'S;=`*s<%lO*V!R!;uP;=`<%l!4t!V!<TXjSaP!b`!dpOr&Xrs&}sv&Xwx(tx!^&X!^!_*V!_;'S&X;'S;=`*y<%lO&X",
  tokenizers: [ZS, XS, AS, CS, PS, vS, 0, 1, 2, 3, 4, 5],
  topRules: { Document: [0, 16] },
  dialects: { noMatch: 0, selfClosing: 515 },
  tokenPrec: 517
});
function Ku(n, e) {
  let t = /* @__PURE__ */ Object.create(null);
  for (let i of n.getChildren(Uu)) {
    let r = i.getChild(cS), s = i.getChild(Po) || i.getChild(Fu);
    r && (t[e.read(r.from, r.to)] = s ? s.type.id == Po ? e.read(s.from + 1, s.to - 1) : e.read(s.from, s.to) : "");
  }
  return t;
}
function $h(n, e) {
  let t = n.getChild(hS);
  return t ? e.read(t.from, t.to) : " ";
}
function $s(n, e, t) {
  let i;
  for (let r of t)
    if (!r.attrs || r.attrs(i || (i = Ku(n.node.parent.firstChild, e))))
      return { parser: r.parser, bracketed: !0 };
  return null;
}
function Ju(n = [], e = []) {
  let t = [], i = [], r = [], s = [];
  for (let l of n)
    (l.tag == "script" ? t : l.tag == "style" ? i : l.tag == "textarea" ? r : s).push(l);
  let o = e.length ? /* @__PURE__ */ Object.create(null) : null;
  for (let l of e) (o[l.name] || (o[l.name] = [])).push(l);
  return Lm((l, a) => {
    let h = l.type.id;
    if (h == fS) return $s(l, a, t);
    if (h == uS) return $s(l, a, i);
    if (h == dS) return $s(l, a, r);
    if (h == Gu && s.length) {
      let c = l.node, f = c.firstChild, u = f && $h(f, a), d;
      if (u) {
        for (let O of s)
          if (O.tag == u && (!O.attrs || O.attrs(d || (d = Ku(f, a))))) {
            let m = c.lastChild, g = m.type.id == pS ? m.from : c.to;
            if (g > f.to)
              return { parser: O.parser, overlay: [{ from: f.to, to: g }] };
          }
      }
    }
    if (o && h == Uu) {
      let c = l.node, f;
      if (f = c.firstChild) {
        let u = o[a.read(f.from, f.to)];
        if (u) for (let d of u) {
          if (d.tagName && d.tagName != $h(c.parent, a)) continue;
          let O = c.lastChild;
          if (O.type.id == Po) {
            let m = O.from + 1, g = O.lastChild, Q = O.to - (g && g.isError ? 0 : 1);
            if (Q > m) return { parser: d.parser, overlay: [{ from: m, to: Q }], bracketed: !0 };
          } else if (O.type.id == Fu)
            return { parser: d.parser, overlay: [{ from: O.from, to: O.to }] };
        }
      }
    }
    return null;
  });
}
const zS = 122, Ph = 1, YS = 123, VS = 124, ed = 2, ES = 125, _S = 3, DS = 4, td = [
  9,
  10,
  11,
  12,
  13,
  32,
  133,
  160,
  5760,
  8192,
  8193,
  8194,
  8195,
  8196,
  8197,
  8198,
  8199,
  8200,
  8201,
  8202,
  8232,
  8233,
  8239,
  8287,
  12288
], qS = 58, WS = 40, id = 95, LS = 91, Kn = 45, BS = 46, IS = 35, jS = 37, NS = 38, GS = 92, US = 10, FS = 42;
function ln(n) {
  return n >= 65 && n <= 90 || n >= 97 && n <= 122 || n >= 161;
}
function yl(n) {
  return n >= 48 && n <= 57;
}
function vh(n) {
  return yl(n) || n >= 97 && n <= 102 || n >= 65 && n <= 70;
}
const nd = (n, e, t) => (i, r) => {
  for (let s = !1, o = 0, l = 0; ; l++) {
    let { next: a } = i;
    if (ln(a) || a == Kn || a == id || s && yl(a))
      !s && (a != Kn || l > 0) && (s = !0), o === l && a == Kn && o++, i.advance();
    else if (a == GS && i.peek(1) != US) {
      if (i.advance(), vh(i.next)) {
        do
          i.advance();
        while (vh(i.next));
        i.next == 32 && i.advance();
      } else i.next > -1 && i.advance();
      s = !0;
    } else {
      s && i.acceptToken(
        o == 2 && r.canShift(ed) ? e : a == WS ? t : n
      );
      break;
    }
  }
}, HS = new Xe(
  nd(YS, ed, VS)
), KS = new Xe(
  nd(ES, _S, DS)
), JS = new Xe((n) => {
  if (td.includes(n.peek(-1))) {
    let { next: e } = n;
    (ln(e) || e == id || e == IS || e == BS || e == FS || e == LS || e == qS && ln(n.peek(1)) || e == Kn || e == NS) && n.acceptToken(zS);
  }
}), e1 = new Xe((n) => {
  if (!td.includes(n.peek(-1))) {
    let { next: e } = n;
    if (e == jS && (n.advance(), n.acceptToken(Ph)), ln(e)) {
      do
        n.advance();
      while (ln(n.next) || yl(n.next));
      n.acceptToken(Ph);
    }
  }
}), t1 = Er({
  "AtKeyword import charset namespace keyframes media supports": p.definitionKeyword,
  "from to selector": p.keyword,
  NamespaceName: p.namespace,
  KeyframeName: p.labelName,
  KeyframeRangeName: p.operatorKeyword,
  TagName: p.tagName,
  ClassName: p.className,
  PseudoClassName: p.constant(p.className),
  IdName: p.labelName,
  "FeatureName PropertyName": p.propertyName,
  AttributeName: p.attributeName,
  NumberLiteral: p.number,
  KeywordQuery: p.keyword,
  UnaryQueryOp: p.operatorKeyword,
  "CallTag ValueName": p.atom,
  VariableName: p.variableName,
  Callee: p.operatorKeyword,
  Unit: p.unit,
  "UniversalSelector NestingSelector": p.definitionOperator,
  "MatchOp CompareOp": p.compareOperator,
  "ChildOp SiblingOp, LogicOp": p.logicOperator,
  BinOp: p.arithmeticOperator,
  Important: p.modifier,
  Comment: p.blockComment,
  ColorLiteral: p.color,
  "ParenthesizedContent StringLiteral": p.string,
  ":": p.punctuation,
  "PseudoOp #": p.derefOperator,
  "; ,": p.separator,
  "( )": p.paren,
  "[ ]": p.squareBracket,
  "{ }": p.brace
}), i1 = { __proto__: null, lang: 38, "nth-child": 38, "nth-last-child": 38, "nth-of-type": 38, "nth-last-of-type": 38, dir: 38, "host-context": 38, if: 84, url: 124, "url-prefix": 124, domain: 124, regexp: 124 }, n1 = { __proto__: null, or: 98, and: 98, not: 106, only: 106, layer: 170 }, r1 = { __proto__: null, selector: 112, layer: 166 }, s1 = { __proto__: null, "@import": 162, "@media": 174, "@charset": 178, "@namespace": 182, "@keyframes": 188, "@supports": 200, "@scope": 204 }, o1 = { __proto__: null, to: 207 }, l1 = gi.deserialize({
  version: 14,
  states: "EbQYQdOOO#qQdOOP#xO`OOOOQP'#Cf'#CfOOQP'#Ce'#CeO#}QdO'#ChO$nQaO'#CcO$xQdO'#CkO%TQdO'#DpO%YQdO'#DrO%_QdO'#DuO%_QdO'#DxOOQP'#FV'#FVO&eQhO'#EhOOQS'#FU'#FUOOQS'#Ek'#EkQYQdOOO&lQdO'#EOO&PQhO'#EUO&lQdO'#EWO'aQdO'#EYO'lQdO'#E]O'tQhO'#EcO(VQdO'#EeO(bQaO'#CfO)VQ`O'#D{O)[Q`O'#F`O)gQdO'#F`QOQ`OOP)qO&jO'#CaPOOO)C@t)C@tOOQP'#Cj'#CjOOQP,59S,59SO#}QdO,59SO)|QdO,59VO%TQdO,5:[O%YQdO,5:^O%_QdO,5:aO%_QdO,5:cO%_QdO,5:dO%_QdO'#ErO*XQ`O,58}O*aQdO'#DzOOQS,58},58}OOQP'#Cn'#CnOOQO'#Dn'#DnOOQP,59V,59VO*hQ`O,59VO*mQ`O,59VOOQP'#Dq'#DqOOQP,5:[,5:[OOQO'#Ds'#DsO*rQpO,5:^O+]QaO,5:aO+sQaO,5:dOOQW'#DZ'#DZO,ZQhO'#DdO,xQhO'#FaO'tQhO'#DbO-WQ`O'#DhOOQW'#F['#F[O-]Q`O,5;SO-eQ`O'#DeOOQS-E8i-E8iOOQ['#Cs'#CsO-jQdO'#CtO.QQdO'#CzO.hQdO'#C}O/OQ!pO'#DPO1RQ!jO,5:jOOQO'#DU'#DUO*mQ`O'#DTO1cQ!nO'#FXO3`Q`O'#DVO3eQ`O'#DkOOQ['#FX'#FXO-`Q`O,5:pO3jQ!bO,5:rOOQS'#E['#E[O3rQ`O,5:tO3wQdO,5:tOOQO'#E_'#E_O4PQ`O,5:wO4UQhO,5:}O%_QdO'#DgOOQS,5;P,5;PO-eQ`O,5;PO4^QdO,5;PO4fQdO,5:gO4vQdO'#EtO5TQ`O,5;zO5TQ`O,5;zPOOO'#Ej'#EjP5`O&jO,58{POOO,58{,58{OOQP1G.n1G.nOOQP1G.q1G.qO*hQ`O1G.qO*mQ`O1G.qOOQP1G/v1G/vO5kQpO1G/xO5sQaO1G/{O6ZQaO1G/}O6qQaO1G0OO7XQaO,5;^OOQO-E8p-E8pOOQS1G.i1G.iO7cQ`O,5:fO7hQdO'#DoO7oQdO'#CrOOQP1G/x1G/xO&lQdO1G/xO7vQ!jO'#DZO8UQ!bO,59vO8^QhO,5:OOOQO'#F]'#F]O8XQ!bO,59zO'tQhO,59xO8fQhO'#EvO8sQ`O,5;{O9OQhO,59|O9uQhO'#DiOOQW,5:S,5:SOOQS1G0n1G0nOOQW,5:P,5:PO9|Q!fO'#FYOOQS'#FY'#FYOOQS'#Em'#EmO;^QdO,59`OOQ[,59`,59`O;tQdO,59fOOQ[,59f,59fO<[QdO,59iOOQ[,59i,59iOOQ[,59k,59kO&lQdO,59mO<rQhO'#EQOOQW'#EQ'#EQO=WQ`O1G0UO1[QhO1G0UOOQ[,59o,59oO'tQhO'#DXOOQ[,59q,59qO=]Q#tO,5:VOOQS1G0[1G0[OOQS1G0^1G0^OOQS1G0`1G0`O=hQ`O1G0`O=mQdO'#E`OOQS1G0c1G0cOOQS1G0i1G0iO=xQaO,5:RO-`Q`O1G0kOOQS1G0k1G0kO-eQ`O1G0kO>PQ!fO1G0ROOQO1G0R1G0ROOQO,5;`,5;`O>gQdO,5;`OOQO-E8r-E8rO>tQ`O1G1fPOOO-E8h-E8hPOOO1G.g1G.gOOQP7+$]7+$]OOQP7+%d7+%dO&lQdO7+%dOOQS1G0Q1G0QO?PQaO'#F_O?ZQ`O,5:ZO?`Q!fO'#ElO@^QdO'#FWO@hQ`O,59^O@mQ!bO7+%dO&lQdO1G/bO@uQhO1G/fOOQW1G/j1G/jOOQW1G/d1G/dOAWQhO,5;bOOQO-E8t-E8tOAfQhO'#DZOAtQhO'#F^OBPQ`O'#F^OBUQ`O,5:TOOQS-E8k-E8kOOQ[1G.z1G.zOOQ[1G/Q1G/QOOQ[1G/T1G/TOOQ[1G/X1G/XOBZQdO,5:lOOQS7+%p7+%pOB`Q`O7+%pOBeQhO'#DYOBmQ`O,59sO'tQhO,59sOOQ[1G/q1G/qOBuQ`O1G/qOOQS7+%z7+%zOBzQbO'#DPOOQO'#Eb'#EbOCYQ`O'#EaOOQO'#Ea'#EaOCeQ`O'#EwOCmQdO,5:zOOQS,5:z,5:zOOQ[1G/m1G/mOOQS7+&V7+&VO-`Q`O7+&VOCxQ!fO'#EsO&lQdO'#EsOEPQdO7+%mOOQO7+%m7+%mOOQO1G0z1G0zOEdQ!bO<<IOOElQdO'#EqOEvQ`O,5;yOOQP1G/u1G/uOOQS-E8j-E8jOFOQdO'#EpOFYQ`O,5;rOOQ]1G.x1G.xOOQP<<IO<<IOOFbQdO7+$|OOQO'#D]'#D]OFiQ!bO7+%QOFqQhO'#EoOF{Q`O,5;xO&lQdO,5;xOOQW1G/o1G/oOOQO'#ES'#ESOGTQ`O1G0WOOQS<<I[<<I[O&lQdO,59tOGnQhO1G/_OOQ[1G/_1G/_OGuQ`O1G/_OOQW-E8l-E8lOOQ[7+%]7+%]OOQO,5:{,5:{O=pQdO'#ExOCeQ`O,5;cOOQS,5;c,5;cOOQS-E8u-E8uOOQS1G0f1G0fOOQS<<Iq<<IqOG}Q!fO,5;_OOQS-E8q-E8qOOQO<<IX<<IXOOQPAN>jAN>jOIUQaO,5;]OOQO-E8o-E8oOI`QdO,5;[OOQO-E8n-E8nOOQW<<Hh<<HhOOQW<<Hl<<HlOIjQhO<<HlOI{QhO,5;ZOJWQ`O,5;ZOOQO-E8m-E8mOJ]QdO1G1dOBZQdO'#EuOJgQ`O7+%rOOQW7+%r7+%rOJoQ!bO1G/`OOQ[7+$y7+$yOJzQhO7+$yPKRQ`O'#EnOOQO,5;d,5;dOOQO-E8v-E8vOOQS1G0}1G0}OKWQ`OAN>WO&lQdO1G0uOK]Q`O7+'OOOQO,5;a,5;aOOQO-E8s-E8sOOQW<<I^<<I^OOQ[<<He<<HePOQW,5;Y,5;YOOQWG23rG23rOKeQdO7+&a",
  stateData: "Kx~O#sOS#tQQ~OW[OZ[O]TO`VOaVOi]OjWOmXO!jYO!mZO!saO!ybO!{cO!}dO#QeO#WfO#YgO#oRO~OQiOW[OZ[O]TO`VOaVOi]OjWOmXO!jYO!mZO!saO!ybO!{cO!}dO#QeO#WfO#YgO#ohO~O#m$SP~P!dO#tmO~O#ooO~O]qO`rOarOjsOmtO!juO!mwO#nvO~OpzO!^xO~P$SOc!QO#o|O#p}O~O#o!RO~O#o!TO~OW[OZ[O]TO`VOaVOjWOmXO!jYO!mZO#oRO~OS!]Oe!YO!V![O!Y!`O#q!XOp$TP~Ok$TP~P&POQ!jOe!cOm!dOp!eOr!mOt!mOz!kO!`!lO#o!bO#p!hO#}!fO~Ot!qO!`!lO#o!pO~Ot!sO#o!sO~OS!]Oe!YO!V![O!Y!`O#q!XO~Oe!vOpzO#Z!xO~O]YX`YX`!pXaYXjYXmYXpYX!^YX!jYX!mYX#nYX~O`!zO~Ok!{O#m$SXo$SX~O#m$SXo$SX~P!dO#u#OO#v#OO#w#QO~Oc#UO#o|O#p}O~OpzO!^xO~Oo$SP~P!dOe#`O~Oe#aO~Ol#bO!h#cO~O]qO`rOarOjsOmtO~Op!ia!^!ia!j!ia!m!ia#n!iad!ia~P*zOp!la!^!la!j!la!m!la#n!lad!la~P*zOR#gOS!]Oe!YOr#gOt#gO!V![O!Y!`O#q#dO#}!fO~O!R#iO!^#jOk$TXp$TX~Oe#mO~Ok#oOpzO~Oe!vO~O]#rO`#rOd#uOi#rOj#rOk#rO~P&lO]#rO`#rOi#rOj#rOk#rOl#wO~P&lO]#rO`#rOi#rOj#rOk#rOo#yO~P&lOP#zOSsXesXksXvsX!VsX!YsX!usX!wsX#qsX!TsXQsX]sX`sXdsXisXjsXmsXpsXrsXtsXzsX!`sX#osX#psX#}sXlsXosX!^sX!qsX#msX~Ov#{O!u#|O!w#}Ok$TP~P'tOe#aOS#{Xk#{Xv#{X!V#{X!Y#{X!u#{X!w#{X#q#{XQ#{X]#{X`#{Xd#{Xi#{Xj#{Xm#{Xp#{Xr#{Xt#{Xz#{X!`#{X#o#{X#p#{X#}#{Xl#{Xo#{X!^#{X!q#{X#m#{X~Oe$RO~Oe$TO~Ok$VOv#{O~Ok$WO~Ot$XO!`!lO~Op$YO~OpzO!R#iO~OpzO#Z$`O~O!q$bOk!oa#m!oao!oa~P&lOk#hX#m#hXo#hX~P!dOk!{O#m$Sao$Sa~O#u#OO#v#OO#w$hO~Ol$jO!h$kO~Op!ii!^!ii!j!ii!m!ii#n!iid!ii~P*zOp!ki!^!ki!j!ki!m!ki#n!kid!ki~P*zOp!li!^!li!j!li!m!li#n!lid!li~P*zOp#fa!^#fa~P$SOo$lO~Od$RP~P%_Od#zP~P&lO`!PXd}X!R}X!T!PX~O`$sO!T$tO~Od$uO!R#iO~Ok#jXp#jX!^#jX~P'tO!^#jOk$Tap$Ta~O!R#iOk!Uap!Ua!^!Uad!Ua`!Ua~OS!]Oe!YO!V![O!Y!`O#q$yO~Od$QP~P9dOv#{OQ#|X]#|X`#|Xd#|Xe#|Xi#|Xj#|Xk#|Xm#|Xp#|Xr#|Xt#|Xz#|X!`#|X#o#|X#p#|X#}#|Xl#|Xo#|X~O]#rO`#rOd%OOi#rOj#rOk#rO~P&lO]#rO`#rOi#rOj#rOk#rOl%PO~P&lO]#rO`#rOi#rOj#rOk#rOo%QO~P&lOe%SOS!tXk!tX!V!tX!Y!tX#q!tX~Ok%TO~Od%YOt%ZO!a%ZO~Ok%[O~Oo%cO#o%^O#}%]O~Od%dO~P$SOv#{O!^%hO!q%jOk!oi#m!oio!oi~P&lOk#ha#m#hao#ha~P!dOk!{O#m$Sio$Si~O!^%mOd$RX~P$SOd%oO~Ov#{OQ#`Xd#`Xe#`Xm#`Xp#`Xr#`Xt#`Xz#`X!^#`X!`#`X#o#`X#p#`X#}#`X~O!^%qOd#zX~P&lOd%sO~Ol%tOv#{O~OR#gOr#gOt#gO#q%vO#}!fO~O!R#iOk#jap#ja!^#ja~O`!PXd}X!R}X!^}X~O!R#iO!^%xOd$QX~O`%zO~Od%{O~O#o%|O~Ok&OO~O`&PO!R#iO~Od&ROk&QO~Od&UO~OP#zOpsX!^sXdsX~O#}%]Op#TX!^#TX~OpzO!^&WO~Oo&[O#o%^O#}%]O~Ov#{OQ#gXe#gXk#gXm#gXp#gXr#gXt#gXz#gX!^#gX!`#gX!q#gX#m#gX#o#gX#p#gX#}#gXo#gX~O!^%hO!q&`Ok!oq#m!oqo!oq~P&lOl&aOv#{O~Od#eX!^#eX~P%_O!^%mOd$Ra~Od#dX!^#dX~P&lO!^%qOd#za~Od&fO~P&lOd&gO!T&hO~Od#cX!^#cX~P9dO!^%xOd$Qa~O]&mOd&oO~OS#bae#ba!V#ba!Y#ba#q#ba~Od&qO~PG]Od&qOk&rO~Ov#{OQ#gae#gak#gam#gap#gar#gat#gaz#ga!^#ga!`#ga!q#ga#m#ga#o#ga#p#ga#}#gao#ga~Od#ea!^#ea~P$SOd#da!^#da~P&lOR#gOr#gOt#gO#q%vO#}%]O~O!R#iOd#ca!^#ca~O`&xO~O!^%xOd$Qi~P&lO]&mOd&|O~Ov#{Od|ik|i~Od&}O~PG]Ok'OO~Od'PO~O!^%xOd$Qq~Od#cq!^#cq~P&lO#s!a#t#}]#}v!m~",
  goto: "2h$UPPPPP$VP$YP$c$uP$cP%X$cPP%_PPP%e%o%oPPPPP%oPP%oP&]P%oP%o'W%oP't'w'}'}(^'}P'}P'}P'}'}P(m'}(yP(|PP)p)v$c)|$c*SP$cP$c$cP*Y*{+YP$YP+aP+dP$YP$YP$YP+j$YP+m+p+s+z$YP$YPP$YP,P,V,f,|-[-b-l-r-x.O.U.`.f.l.rPPPPPPPPPPP.x/R/w/z0|P1U1u2O2R2U2[RnQ_^OP`kz!{$dq[OPYZ`kuvwxz!v!{#`$d%mqSOPYZ`kuvwxz!v!{#`$d%mQpTR#RqQ!OVR#SrQ#S!QS$Q!i!jR$i#U!V!mac!c!d!e!z#a#c#t#v#x#{$a$k$p$s%h%i%q%u%z&P&d&l&x'Q!U!mac!c!d!e!z#a#c#t#v#x#{$a$k$p$s%h%i%q%u%z&P&d&l&x'QU#g!Y$t&hU%`$Y%b&WR&V%_!V!iac!c!d!e!z#a#c#t#v#x#{$a$k$p$s%h%i%q%u%z&P&d&l&x'QR$S!kQ%W$RR&S%Xk!^]bf!Y![!g#i#j#m$P$R%X%xQ#e!YQ${#mQ%w$tQ&j%xR&w&hQ!ygQ#p!`Q$^!xR%f$`R#n!]!U!mac!c!d!e!z#a#c#t#v#x#{$a$k$p$s%h%i%q%u%z&P&d&l&x'QQ!qdR$X!rQ!PVR#TrQ#S!PR$i#TQ!SWR#VsQ!UXR#WtQ{UQ!wgQ#^yQ#o!_Q$U!nQ$[!uQ$_!yQ%e$^Q&Y%aQ&]%fR&v&XSjPzQ!}kQ$c!{R%k$dZiPkz!{$dR$P!gQ%}%SR&z&mR!rdR!teR$Z!tS%a$Y%bR&t&WV%_$Y%b&WQ#PmR$g#PQ`OSkPzU!a`k$dR$d!{Q$p#aY%p$p%u&d&l'QQ%u$sQ&d%qQ&l%zR'Q&xQ#t!cQ#v!dQ#x!eV$}#t#v#xQ%X$RR&T%XQ%y$zS&k%y&yR&y&lQ%r$pR&e%rQ%n$mR&c%nQyUR#]yQ%i$aR&_%iQ!|jS$e!|$fR$f!}Q&n%}R&{&nQ#k!ZR$x#kQ%b$YR&Z%bQ&X%aR&u&X__OP`kz!{$d^UOP`kz!{$dQ!VYQ!WZQ#XuQ#YvQ#ZwQ#[xQ$]!vQ$m#`R&b%mR$q#aQ!gaQ!oc[#q!c!d!e#t#v#xQ$a!zd$o#a$p$s%q%u%z&d&l&x'QQ$r#cQ%R#{S%g$a%iQ%l$kQ&^%hR&p&P]#s!c!d!e#t#v#xW!Z]b!g$PQ!ufQ#f!YQ#l![Q$v#iQ$w#jQ$z#mS%V$R%XR&i%xQ#h!YQ%w$tR&w&hR$|#mR$n#`QlPR#_zQ!_]Q!nbQ$O!gR%U$P",
  nodeNames: "⚠ Unit VariableName VariableName QueryCallee Comment StyleSheet RuleSet UniversalSelector TagSelector TagName NestingSelector ClassSelector . ClassName PseudoClassSelector : :: PseudoClassName PseudoClassName ) ( ArgList ValueName ParenthesizedValue AtKeyword # ; ] [ BracketedValue } { BracedValue ColorLiteral NumberLiteral StringLiteral BinaryExpression BinOp CallExpression Callee IfExpression if ArgList IfBranch KeywordQuery FeatureQuery FeatureName BinaryQuery LogicOp ComparisonQuery CompareOp UnaryQuery UnaryQueryOp ParenthesizedQuery SelectorQuery selector ParenthesizedSelector CallQuery ArgList , CallLiteral CallTag ParenthesizedContent PseudoClassName ArgList IdSelector IdName AttributeSelector AttributeName MatchOp ChildSelector ChildOp DescendantSelector SiblingSelector SiblingOp Block Declaration PropertyName Important ImportStatement import Layer layer LayerName layer MediaStatement media CharsetStatement charset NamespaceStatement namespace NamespaceName KeyframesStatement keyframes KeyframeName KeyframeList KeyframeSelector KeyframeRangeName SupportsStatement supports ScopeStatement scope to AtRule Styles",
  maxTerm: 143,
  nodeProps: [
    ["isolate", -2, 5, 36, ""],
    ["openedBy", 20, "(", 28, "[", 31, "{"],
    ["closedBy", 21, ")", 29, "]", 32, "}"]
  ],
  propSources: [t1],
  skippedNodes: [0, 5, 106],
  repeatNodeCount: 15,
  tokenData: "JQ~R!YOX$qX^%i^p$qpq%iqr({rs-ust/itu6Wuv$qvw7Qwx7cxy9Qyz9cz{9h{|:R|}>t}!O?V!O!P?t!P!Q@]!Q![AU![!]BP!]!^B{!^!_C^!_!`DY!`!aDm!a!b$q!b!cEn!c!}$q!}#OG{#O#P$q#P#QH^#Q#R6W#R#o$q#o#pHo#p#q6W#q#rIQ#r#sIc#s#y$q#y#z%i#z$f$q$f$g%i$g#BY$q#BY#BZ%i#BZ$IS$q$IS$I_%i$I_$I|$q$I|$JO%i$JO$JT$q$JT$JU%i$JU$KV$q$KV$KW%i$KW&FU$q&FU&FV%i&FV;'S$q;'S;=`Iz<%lO$q`$tSOy%Qz;'S%Q;'S;=`%c<%lO%Q`%VS!a`Oy%Qz;'S%Q;'S;=`%c<%lO%Q`%fP;=`<%l%Q~%nh#s~OX%QX^'Y^p%Qpq'Yqy%Qz#y%Q#y#z'Y#z$f%Q$f$g'Y$g#BY%Q#BY#BZ'Y#BZ$IS%Q$IS$I_'Y$I_$I|%Q$I|$JO'Y$JO$JT%Q$JT$JU'Y$JU$KV%Q$KV$KW'Y$KW&FU%Q&FU&FV'Y&FV;'S%Q;'S;=`%c<%lO%Q~'ah#s~!a`OX%QX^'Y^p%Qpq'Yqy%Qz#y%Q#y#z'Y#z$f%Q$f$g'Y$g#BY%Q#BY#BZ'Y#BZ$IS%Q$IS$I_'Y$I_$I|%Q$I|$JO'Y$JO$JT%Q$JT$JU'Y$JU$KV%Q$KV$KW'Y$KW&FU%Q&FU&FV'Y&FV;'S%Q;'S;=`%c<%lO%Qj)OUOy%Qz#]%Q#]#^)b#^;'S%Q;'S;=`%c<%lO%Qj)gU!a`Oy%Qz#a%Q#a#b)y#b;'S%Q;'S;=`%c<%lO%Qj*OU!a`Oy%Qz#d%Q#d#e*b#e;'S%Q;'S;=`%c<%lO%Qj*gU!a`Oy%Qz#c%Q#c#d*y#d;'S%Q;'S;=`%c<%lO%Qj+OU!a`Oy%Qz#f%Q#f#g+b#g;'S%Q;'S;=`%c<%lO%Qj+gU!a`Oy%Qz#h%Q#h#i+y#i;'S%Q;'S;=`%c<%lO%Qj,OU!a`Oy%Qz#T%Q#T#U,b#U;'S%Q;'S;=`%c<%lO%Qj,gU!a`Oy%Qz#b%Q#b#c,y#c;'S%Q;'S;=`%c<%lO%Qj-OU!a`Oy%Qz#h%Q#h#i-b#i;'S%Q;'S;=`%c<%lO%Qj-iS!qY!a`Oy%Qz;'S%Q;'S;=`%c<%lO%Q~-xWOY-uZr-urs.bs#O-u#O#P.g#P;'S-u;'S;=`/c<%lO-u~.gOt~~.jRO;'S-u;'S;=`.s;=`O-u~.vXOY-uZr-urs.bs#O-u#O#P.g#P;'S-u;'S;=`/c;=`<%l-u<%lO-u~/fP;=`<%l-uj/nYjYOy%Qz!Q%Q!Q![0^![!c%Q!c!i0^!i#T%Q#T#Z0^#Z;'S%Q;'S;=`%c<%lO%Qj0cY!a`Oy%Qz!Q%Q!Q![1R![!c%Q!c!i1R!i#T%Q#T#Z1R#Z;'S%Q;'S;=`%c<%lO%Qj1WY!a`Oy%Qz!Q%Q!Q![1v![!c%Q!c!i1v!i#T%Q#T#Z1v#Z;'S%Q;'S;=`%c<%lO%Qj1}YrY!a`Oy%Qz!Q%Q!Q![2m![!c%Q!c!i2m!i#T%Q#T#Z2m#Z;'S%Q;'S;=`%c<%lO%Qj2tYrY!a`Oy%Qz!Q%Q!Q![3d![!c%Q!c!i3d!i#T%Q#T#Z3d#Z;'S%Q;'S;=`%c<%lO%Qj3iY!a`Oy%Qz!Q%Q!Q![4X![!c%Q!c!i4X!i#T%Q#T#Z4X#Z;'S%Q;'S;=`%c<%lO%Qj4`YrY!a`Oy%Qz!Q%Q!Q![5O![!c%Q!c!i5O!i#T%Q#T#Z5O#Z;'S%Q;'S;=`%c<%lO%Qj5TY!a`Oy%Qz!Q%Q!Q![5s![!c%Q!c!i5s!i#T%Q#T#Z5s#Z;'S%Q;'S;=`%c<%lO%Qj5zSrY!a`Oy%Qz;'S%Q;'S;=`%c<%lO%Qd6ZUOy%Qz!_%Q!_!`6m!`;'S%Q;'S;=`%c<%lO%Qd6tS!hS!a`Oy%Qz;'S%Q;'S;=`%c<%lO%Qb7VSZQOy%Qz;'S%Q;'S;=`%c<%lO%Q~7fWOY7cZw7cwx.bx#O7c#O#P8O#P;'S7c;'S;=`8z<%lO7c~8RRO;'S7c;'S;=`8[;=`O7c~8_XOY7cZw7cwx.bx#O7c#O#P8O#P;'S7c;'S;=`8z;=`<%l7c<%lO7c~8}P;=`<%l7cj9VSeYOy%Qz;'S%Q;'S;=`%c<%lO%Q~9hOd~n9oUWQvWOy%Qz!_%Q!_!`6m!`;'S%Q;'S;=`%c<%lO%Qj:YWvW!mQOy%Qz!O%Q!O!P:r!P!Q%Q!Q![=w![;'S%Q;'S;=`%c<%lO%Qj:wU!a`Oy%Qz!Q%Q!Q![;Z![;'S%Q;'S;=`%c<%lO%Qj;bY!a`#}YOy%Qz!Q%Q!Q![;Z![!g%Q!g!h<Q!h#X%Q#X#Y<Q#Y;'S%Q;'S;=`%c<%lO%Qj<VY!a`Oy%Qz{%Q{|<u|}%Q}!O<u!O!Q%Q!Q![=^![;'S%Q;'S;=`%c<%lO%Qj<zU!a`Oy%Qz!Q%Q!Q![=^![;'S%Q;'S;=`%c<%lO%Qj=eU!a`#}YOy%Qz!Q%Q!Q![=^![;'S%Q;'S;=`%c<%lO%Qj>O[!a`#}YOy%Qz!O%Q!O!P;Z!P!Q%Q!Q![=w![!g%Q!g!h<Q!h#X%Q#X#Y<Q#Y;'S%Q;'S;=`%c<%lO%Qj>yS!^YOy%Qz;'S%Q;'S;=`%c<%lO%Qj?[WvWOy%Qz!O%Q!O!P:r!P!Q%Q!Q![=w![;'S%Q;'S;=`%c<%lO%Qj?yU]YOy%Qz!Q%Q!Q![;Z![;'S%Q;'S;=`%c<%lO%Q~@bTvWOy%Qz{@q{;'S%Q;'S;=`%c<%lO%Q~@xS!a`#t~Oy%Qz;'S%Q;'S;=`%c<%lO%QjAZ[#}YOy%Qz!O%Q!O!P;Z!P!Q%Q!Q![=w![!g%Q!g!h<Q!h#X%Q#X#Y<Q#Y;'S%Q;'S;=`%c<%lO%QjBUU`YOy%Qz![%Q![!]Bh!];'S%Q;'S;=`%c<%lO%QbBoSaQ!a`Oy%Qz;'S%Q;'S;=`%c<%lO%QjCQSkYOy%Qz;'S%Q;'S;=`%c<%lO%QhCcU!TWOy%Qz!_%Q!_!`Cu!`;'S%Q;'S;=`%c<%lO%QhC|S!TW!a`Oy%Qz;'S%Q;'S;=`%c<%lO%QlDaS!TW!hSOy%Qz;'S%Q;'S;=`%c<%lO%QjDtV!jQ!TWOy%Qz!_%Q!_!`Cu!`!aEZ!a;'S%Q;'S;=`%c<%lO%QbEbS!jQ!a`Oy%Qz;'S%Q;'S;=`%c<%lO%QjEqYOy%Qz}%Q}!OFa!O!c%Q!c!}GO!}#T%Q#T#oGO#o;'S%Q;'S;=`%c<%lO%QjFfW!a`Oy%Qz!c%Q!c!}GO!}#T%Q#T#oGO#o;'S%Q;'S;=`%c<%lO%QjGV[iY!a`Oy%Qz}%Q}!OGO!O!Q%Q!Q![GO![!c%Q!c!}GO!}#T%Q#T#oGO#o;'S%Q;'S;=`%c<%lO%QjHQSmYOy%Qz;'S%Q;'S;=`%c<%lO%QnHcSl^Oy%Qz;'S%Q;'S;=`%c<%lO%QjHtSpYOy%Qz;'S%Q;'S;=`%c<%lO%QjIVSoYOy%Qz;'S%Q;'S;=`%c<%lO%QfIhU!mQOy%Qz!_%Q!_!`6m!`;'S%Q;'S;=`%c<%lO%Q`I}P;=`<%l$q",
  tokenizers: [JS, e1, HS, KS, 1, 2, 3, 4, new Tr("m~RRYZ[z{a~~g~aO#v~~dP!P!Qg~lO#w~~", 28, 129)],
  topRules: { StyleSheet: [0, 6], Styles: [1, 105] },
  dynamicPrecedences: { 76: 1 },
  specialized: [{ term: 124, get: (n) => i1[n] || -1 }, { term: 125, get: (n) => n1[n] || -1 }, { term: 4, get: (n) => r1[n] || -1 }, { term: 25, get: (n) => s1[n] || -1 }, { term: 123, get: (n) => o1[n] || -1 }],
  tokenPrec: 1963
});
let Ps = null;
function vs() {
  if (!Ps && typeof document == "object" && document.body) {
    let { style: n } = document.body, e = [], t = /* @__PURE__ */ new Set();
    for (let i in n)
      i != "cssText" && i != "cssFloat" && typeof n[i] == "string" && (/[A-Z]/.test(i) && (i = i.replace(/[A-Z]/g, (r) => "-" + r.toLowerCase())), t.has(i) || (e.push(i), t.add(i)));
    Ps = e.sort().map((i) => ({ type: "property", label: i, apply: i + ": " }));
  }
  return Ps || [];
}
const Th = /* @__PURE__ */ [
  "active",
  "after",
  "any-link",
  "autofill",
  "backdrop",
  "before",
  "checked",
  "cue",
  "default",
  "defined",
  "disabled",
  "empty",
  "enabled",
  "file-selector-button",
  "first",
  "first-child",
  "first-letter",
  "first-line",
  "first-of-type",
  "focus",
  "focus-visible",
  "focus-within",
  "fullscreen",
  "has",
  "host",
  "host-context",
  "hover",
  "in-range",
  "indeterminate",
  "invalid",
  "is",
  "lang",
  "last-child",
  "last-of-type",
  "left",
  "link",
  "marker",
  "modal",
  "not",
  "nth-child",
  "nth-last-child",
  "nth-last-of-type",
  "nth-of-type",
  "only-child",
  "only-of-type",
  "optional",
  "out-of-range",
  "part",
  "placeholder",
  "placeholder-shown",
  "read-only",
  "read-write",
  "required",
  "right",
  "root",
  "scope",
  "selection",
  "slotted",
  "target",
  "target-text",
  "valid",
  "visited",
  "where"
].map((n) => ({ type: "class", label: n })), Ch = /* @__PURE__ */ [
  "above",
  "absolute",
  "activeborder",
  "additive",
  "activecaption",
  "after-white-space",
  "ahead",
  "alias",
  "all",
  "all-scroll",
  "alphabetic",
  "alternate",
  "always",
  "antialiased",
  "appworkspace",
  "asterisks",
  "attr",
  "auto",
  "auto-flow",
  "avoid",
  "avoid-column",
  "avoid-page",
  "avoid-region",
  "axis-pan",
  "background",
  "backwards",
  "baseline",
  "below",
  "bidi-override",
  "blink",
  "block",
  "block-axis",
  "bold",
  "bolder",
  "border",
  "border-box",
  "both",
  "bottom",
  "break",
  "break-all",
  "break-word",
  "bullets",
  "button",
  "button-bevel",
  "buttonface",
  "buttonhighlight",
  "buttonshadow",
  "buttontext",
  "calc",
  "capitalize",
  "caps-lock-indicator",
  "caption",
  "captiontext",
  "caret",
  "cell",
  "center",
  "checkbox",
  "circle",
  "cjk-decimal",
  "clear",
  "clip",
  "close-quote",
  "col-resize",
  "collapse",
  "color",
  "color-burn",
  "color-dodge",
  "column",
  "column-reverse",
  "compact",
  "condensed",
  "contain",
  "content",
  "contents",
  "content-box",
  "context-menu",
  "continuous",
  "copy",
  "counter",
  "counters",
  "cover",
  "crop",
  "cross",
  "crosshair",
  "currentcolor",
  "cursive",
  "cyclic",
  "darken",
  "dashed",
  "decimal",
  "decimal-leading-zero",
  "default",
  "default-button",
  "dense",
  "destination-atop",
  "destination-in",
  "destination-out",
  "destination-over",
  "difference",
  "disc",
  "discard",
  "disclosure-closed",
  "disclosure-open",
  "document",
  "dot-dash",
  "dot-dot-dash",
  "dotted",
  "double",
  "down",
  "e-resize",
  "ease",
  "ease-in",
  "ease-in-out",
  "ease-out",
  "element",
  "ellipse",
  "ellipsis",
  "embed",
  "end",
  "ethiopic-abegede-gez",
  "ethiopic-halehame-aa-er",
  "ethiopic-halehame-gez",
  "ew-resize",
  "exclusion",
  "expanded",
  "extends",
  "extra-condensed",
  "extra-expanded",
  "fantasy",
  "fast",
  "fill",
  "fill-box",
  "fixed",
  "flat",
  "flex",
  "flex-end",
  "flex-start",
  "footnotes",
  "forwards",
  "from",
  "geometricPrecision",
  "graytext",
  "grid",
  "groove",
  "hand",
  "hard-light",
  "help",
  "hidden",
  "hide",
  "higher",
  "highlight",
  "highlighttext",
  "horizontal",
  "hsl",
  "hsla",
  "hue",
  "icon",
  "ignore",
  "inactiveborder",
  "inactivecaption",
  "inactivecaptiontext",
  "infinite",
  "infobackground",
  "infotext",
  "inherit",
  "initial",
  "inline",
  "inline-axis",
  "inline-block",
  "inline-flex",
  "inline-grid",
  "inline-table",
  "inset",
  "inside",
  "intrinsic",
  "invert",
  "italic",
  "justify",
  "keep-all",
  "landscape",
  "large",
  "larger",
  "left",
  "level",
  "lighter",
  "lighten",
  "line-through",
  "linear",
  "linear-gradient",
  "lines",
  "list-item",
  "listbox",
  "listitem",
  "local",
  "logical",
  "loud",
  "lower",
  "lower-hexadecimal",
  "lower-latin",
  "lower-norwegian",
  "lowercase",
  "ltr",
  "luminosity",
  "manipulation",
  "match",
  "matrix",
  "matrix3d",
  "medium",
  "menu",
  "menutext",
  "message-box",
  "middle",
  "min-intrinsic",
  "mix",
  "monospace",
  "move",
  "multiple",
  "multiple_mask_images",
  "multiply",
  "n-resize",
  "narrower",
  "ne-resize",
  "nesw-resize",
  "no-close-quote",
  "no-drop",
  "no-open-quote",
  "no-repeat",
  "none",
  "normal",
  "not-allowed",
  "nowrap",
  "ns-resize",
  "numbers",
  "numeric",
  "nw-resize",
  "nwse-resize",
  "oblique",
  "opacity",
  "open-quote",
  "optimizeLegibility",
  "optimizeSpeed",
  "outset",
  "outside",
  "outside-shape",
  "overlay",
  "overline",
  "padding",
  "padding-box",
  "painted",
  "page",
  "paused",
  "perspective",
  "pinch-zoom",
  "plus-darker",
  "plus-lighter",
  "pointer",
  "polygon",
  "portrait",
  "pre",
  "pre-line",
  "pre-wrap",
  "preserve-3d",
  "progress",
  "push-button",
  "radial-gradient",
  "radio",
  "read-only",
  "read-write",
  "read-write-plaintext-only",
  "rectangle",
  "region",
  "relative",
  "repeat",
  "repeating-linear-gradient",
  "repeating-radial-gradient",
  "repeat-x",
  "repeat-y",
  "reset",
  "reverse",
  "rgb",
  "rgba",
  "ridge",
  "right",
  "rotate",
  "rotate3d",
  "rotateX",
  "rotateY",
  "rotateZ",
  "round",
  "row",
  "row-resize",
  "row-reverse",
  "rtl",
  "run-in",
  "running",
  "s-resize",
  "sans-serif",
  "saturation",
  "scale",
  "scale3d",
  "scaleX",
  "scaleY",
  "scaleZ",
  "screen",
  "scroll",
  "scrollbar",
  "scroll-position",
  "se-resize",
  "self-start",
  "self-end",
  "semi-condensed",
  "semi-expanded",
  "separate",
  "serif",
  "show",
  "single",
  "skew",
  "skewX",
  "skewY",
  "skip-white-space",
  "slide",
  "slider-horizontal",
  "slider-vertical",
  "sliderthumb-horizontal",
  "sliderthumb-vertical",
  "slow",
  "small",
  "small-caps",
  "small-caption",
  "smaller",
  "soft-light",
  "solid",
  "source-atop",
  "source-in",
  "source-out",
  "source-over",
  "space",
  "space-around",
  "space-between",
  "space-evenly",
  "spell-out",
  "square",
  "start",
  "static",
  "status-bar",
  "stretch",
  "stroke",
  "stroke-box",
  "sub",
  "subpixel-antialiased",
  "svg_masks",
  "super",
  "sw-resize",
  "symbolic",
  "symbols",
  "system-ui",
  "table",
  "table-caption",
  "table-cell",
  "table-column",
  "table-column-group",
  "table-footer-group",
  "table-header-group",
  "table-row",
  "table-row-group",
  "text",
  "text-bottom",
  "text-top",
  "textarea",
  "textfield",
  "thick",
  "thin",
  "threeddarkshadow",
  "threedface",
  "threedhighlight",
  "threedlightshadow",
  "threedshadow",
  "to",
  "top",
  "transform",
  "translate",
  "translate3d",
  "translateX",
  "translateY",
  "translateZ",
  "transparent",
  "ultra-condensed",
  "ultra-expanded",
  "underline",
  "unidirectional-pan",
  "unset",
  "up",
  "upper-latin",
  "uppercase",
  "url",
  "var",
  "vertical",
  "vertical-text",
  "view-box",
  "visible",
  "visibleFill",
  "visiblePainted",
  "visibleStroke",
  "visual",
  "w-resize",
  "wait",
  "wave",
  "wider",
  "window",
  "windowframe",
  "windowtext",
  "words",
  "wrap",
  "wrap-reverse",
  "x-large",
  "x-small",
  "xor",
  "xx-large",
  "xx-small"
].map((n) => ({ type: "keyword", label: n })).concat(/* @__PURE__ */ [
  "aliceblue",
  "antiquewhite",
  "aqua",
  "aquamarine",
  "azure",
  "beige",
  "bisque",
  "black",
  "blanchedalmond",
  "blue",
  "blueviolet",
  "brown",
  "burlywood",
  "cadetblue",
  "chartreuse",
  "chocolate",
  "coral",
  "cornflowerblue",
  "cornsilk",
  "crimson",
  "cyan",
  "darkblue",
  "darkcyan",
  "darkgoldenrod",
  "darkgray",
  "darkgreen",
  "darkkhaki",
  "darkmagenta",
  "darkolivegreen",
  "darkorange",
  "darkorchid",
  "darkred",
  "darksalmon",
  "darkseagreen",
  "darkslateblue",
  "darkslategray",
  "darkturquoise",
  "darkviolet",
  "deeppink",
  "deepskyblue",
  "dimgray",
  "dodgerblue",
  "firebrick",
  "floralwhite",
  "forestgreen",
  "fuchsia",
  "gainsboro",
  "ghostwhite",
  "gold",
  "goldenrod",
  "gray",
  "grey",
  "green",
  "greenyellow",
  "honeydew",
  "hotpink",
  "indianred",
  "indigo",
  "ivory",
  "khaki",
  "lavender",
  "lavenderblush",
  "lawngreen",
  "lemonchiffon",
  "lightblue",
  "lightcoral",
  "lightcyan",
  "lightgoldenrodyellow",
  "lightgray",
  "lightgreen",
  "lightpink",
  "lightsalmon",
  "lightseagreen",
  "lightskyblue",
  "lightslategray",
  "lightsteelblue",
  "lightyellow",
  "lime",
  "limegreen",
  "linen",
  "magenta",
  "maroon",
  "mediumaquamarine",
  "mediumblue",
  "mediumorchid",
  "mediumpurple",
  "mediumseagreen",
  "mediumslateblue",
  "mediumspringgreen",
  "mediumturquoise",
  "mediumvioletred",
  "midnightblue",
  "mintcream",
  "mistyrose",
  "moccasin",
  "navajowhite",
  "navy",
  "oldlace",
  "olive",
  "olivedrab",
  "orange",
  "orangered",
  "orchid",
  "palegoldenrod",
  "palegreen",
  "paleturquoise",
  "palevioletred",
  "papayawhip",
  "peachpuff",
  "peru",
  "pink",
  "plum",
  "powderblue",
  "purple",
  "rebeccapurple",
  "red",
  "rosybrown",
  "royalblue",
  "saddlebrown",
  "salmon",
  "sandybrown",
  "seagreen",
  "seashell",
  "sienna",
  "silver",
  "skyblue",
  "slateblue",
  "slategray",
  "snow",
  "springgreen",
  "steelblue",
  "tan",
  "teal",
  "thistle",
  "tomato",
  "turquoise",
  "violet",
  "wheat",
  "white",
  "whitesmoke",
  "yellow",
  "yellowgreen"
].map((n) => ({ type: "constant", label: n }))), a1 = /* @__PURE__ */ [
  "a",
  "abbr",
  "address",
  "article",
  "aside",
  "b",
  "bdi",
  "bdo",
  "blockquote",
  "body",
  "br",
  "button",
  "canvas",
  "caption",
  "cite",
  "code",
  "col",
  "colgroup",
  "dd",
  "del",
  "details",
  "dfn",
  "dialog",
  "div",
  "dl",
  "dt",
  "em",
  "figcaption",
  "figure",
  "footer",
  "form",
  "header",
  "hgroup",
  "h1",
  "h2",
  "h3",
  "h4",
  "h5",
  "h6",
  "hr",
  "html",
  "i",
  "iframe",
  "img",
  "input",
  "ins",
  "kbd",
  "label",
  "legend",
  "li",
  "main",
  "meter",
  "nav",
  "ol",
  "output",
  "p",
  "pre",
  "ruby",
  "section",
  "select",
  "small",
  "source",
  "span",
  "strong",
  "sub",
  "summary",
  "sup",
  "table",
  "tbody",
  "td",
  "template",
  "textarea",
  "tfoot",
  "th",
  "thead",
  "tr",
  "u",
  "ul"
].map((n) => ({ type: "type", label: n })), h1 = /* @__PURE__ */ [
  "@charset",
  "@color-profile",
  "@container",
  "@counter-style",
  "@font-face",
  "@font-feature-values",
  "@font-palette-values",
  "@import",
  "@keyframes",
  "@layer",
  "@media",
  "@namespace",
  "@page",
  "@position-try",
  "@property",
  "@scope",
  "@starting-style",
  "@supports",
  "@view-transition"
].map((n) => ({ type: "keyword", label: n })), ft = /^(\w[\w-]*|-\w[\w-]*|)$/, c1 = /^-(-[\w-]*)?$/;
function f1(n, e) {
  var t;
  if ((n.name == "(" || n.type.isError) && (n = n.parent || n), n.name != "ArgList")
    return !1;
  let i = (t = n.parent) === null || t === void 0 ? void 0 : t.firstChild;
  return (i == null ? void 0 : i.name) != "Callee" ? !1 : e.sliceString(i.from, i.to) == "var";
}
const Zh = /* @__PURE__ */ new pf(), u1 = ["Declaration"];
function d1(n) {
  for (let e = n; ; ) {
    if (e.type.isTop)
      return e;
    if (!(e = e.parent))
      return n;
  }
}
function rd(n, e, t) {
  if (e.to - e.from > 4096) {
    let i = Zh.get(e);
    if (i)
      return i;
    let r = [], s = /* @__PURE__ */ new Set(), o = e.cursor(W.IncludeAnonymous);
    if (o.firstChild())
      do
        for (let l of rd(n, o.node, t))
          s.has(l.label) || (s.add(l.label), r.push(l));
      while (o.nextSibling());
    return Zh.set(e, r), r;
  } else {
    let i = [], r = /* @__PURE__ */ new Set();
    return e.cursor().iterate((s) => {
      var o;
      if (t(s) && s.matchContext(u1) && ((o = s.node.nextSibling) === null || o === void 0 ? void 0 : o.name) == ":") {
        let l = n.sliceString(s.from, s.to);
        r.has(l) || (r.add(l), i.push({ label: l, type: "variable" }));
      }
    }), i;
  }
}
const O1 = (n) => (e) => {
  let { state: t, pos: i } = e, r = K(t).resolveInner(i, -1), s = r.type.isError && r.from == r.to - 1 && t.doc.sliceString(r.from, r.to) == "-";
  if (r.name == "PropertyName" || (s || r.name == "TagName") && /^(Block|Styles)$/.test(r.resolve(r.to).name))
    return { from: r.from, options: vs(), validFor: ft };
  if (r.name == "ValueName")
    return { from: r.from, options: Ch, validFor: ft };
  if (r.name == "PseudoClassName")
    return { from: r.from, options: Th, validFor: ft };
  if (n(r) || (e.explicit || s) && f1(r, t.doc))
    return {
      from: n(r) || s ? r.from : i,
      options: rd(t.doc, d1(r), n),
      validFor: c1
    };
  if (r.name == "TagName") {
    for (let { parent: a } = r; a; a = a.parent)
      if (a.name == "Block")
        return { from: r.from, options: vs(), validFor: ft };
    return { from: r.from, options: a1, validFor: ft };
  }
  if (r.name == "AtKeyword")
    return { from: r.from, options: h1, validFor: ft };
  if (!e.explicit)
    return null;
  let o = r.resolve(i), l = o.childBefore(i);
  return l && l.name == ":" && o.name == "PseudoClassSelector" ? { from: i, options: Th, validFor: ft } : l && l.name == ":" && o.name == "Declaration" || o.name == "ArgList" ? { from: i, options: Ch, validFor: ft } : o.name == "Block" || o.name == "Styles" ? { from: i, options: vs(), validFor: ft } : null;
}, p1 = /* @__PURE__ */ O1((n) => n.name == "VariableName"), Zr = /* @__PURE__ */ Oi.define({
  name: "css",
  parser: /* @__PURE__ */ l1.configure({
    props: [
      /* @__PURE__ */ Dr.add({
        Declaration: /* @__PURE__ */ Fn()
      }),
      /* @__PURE__ */ qr.add({
        "Block KeyframeList": wf
      })
    ]
  }),
  languageData: {
    commentTokens: { block: { open: "/*", close: "*/" } },
    indentOnInput: /^\s*\}$/,
    wordChars: "-"
  }
});
function m1() {
  return new el(Zr, Zr.data.of({ autocomplete: p1 }));
}
const g1 = 316, Q1 = 317, Xh = 1, b1 = 2, S1 = 3, y1 = 4, x1 = 318, w1 = 320, k1 = 321, $1 = 5, P1 = 6, v1 = 0, To = [
  9,
  10,
  11,
  12,
  13,
  32,
  133,
  160,
  5760,
  8192,
  8193,
  8194,
  8195,
  8196,
  8197,
  8198,
  8199,
  8200,
  8201,
  8202,
  8232,
  8233,
  8239,
  8287,
  12288
], sd = 125, T1 = 59, Co = 47, C1 = 42, Z1 = 43, X1 = 45, A1 = 60, M1 = 44, R1 = 63, z1 = 46, Y1 = 91, V1 = new Lu({
  start: !1,
  shift(n, e) {
    return e == $1 || e == P1 || e == w1 ? n : e == k1;
  },
  strict: !1
}), E1 = new Xe((n, e) => {
  let { next: t } = n;
  (t == sd || t == -1 || e.context) && n.acceptToken(x1);
}, { contextual: !0, fallback: !0 }), _1 = new Xe((n, e) => {
  let { next: t } = n, i;
  To.indexOf(t) > -1 || t == Co && ((i = n.peek(1)) == Co || i == C1) || t != sd && t != T1 && t != -1 && !e.context && n.acceptToken(g1);
}, { contextual: !0 }), D1 = new Xe((n, e) => {
  n.next == Y1 && !e.context && n.acceptToken(Q1);
}, { contextual: !0 }), q1 = new Xe((n, e) => {
  let { next: t } = n;
  if (t == Z1 || t == X1) {
    if (n.advance(), t == n.next) {
      n.advance();
      let i = !e.context && e.canShift(Xh);
      n.acceptToken(i ? Xh : b1);
    }
  } else t == R1 && n.peek(1) == z1 && (n.advance(), n.advance(), (n.next < 48 || n.next > 57) && n.acceptToken(S1));
}, { contextual: !0 });
function Ts(n, e) {
  return n >= 65 && n <= 90 || n >= 97 && n <= 122 || n == 95 || n >= 192 || !e && n >= 48 && n <= 57;
}
const W1 = new Xe((n, e) => {
  if (n.next != A1 || !e.dialectEnabled(v1) || (n.advance(), n.next == Co)) return;
  let t = 0;
  for (; To.indexOf(n.next) > -1; )
    n.advance(), t++;
  if (Ts(n.next, !0)) {
    for (n.advance(), t++; Ts(n.next, !1); )
      n.advance(), t++;
    for (; To.indexOf(n.next) > -1; )
      n.advance(), t++;
    if (n.next == M1) return;
    for (let i = 0; ; i++) {
      if (i == 7) {
        if (!Ts(n.next, !0)) return;
        break;
      }
      if (n.next != "extends".charCodeAt(i)) break;
      n.advance(), t++;
    }
  }
  n.acceptToken(y1, -t);
}), L1 = Er({
  "get set async static": p.modifier,
  "for while do if else switch try catch finally return throw break continue default case defer": p.controlKeyword,
  "in of await yield void typeof delete instanceof as satisfies": p.operatorKeyword,
  "let var const using function class extends": p.definitionKeyword,
  "import export from": p.moduleKeyword,
  "with debugger new": p.keyword,
  TemplateString: p.special(p.string),
  super: p.atom,
  BooleanLiteral: p.bool,
  this: p.self,
  null: p.null,
  Star: p.modifier,
  VariableName: p.variableName,
  "CallExpression/VariableName TaggedTemplateExpression/VariableName": p.function(p.variableName),
  VariableDefinition: p.definition(p.variableName),
  Label: p.labelName,
  PropertyName: p.propertyName,
  PrivatePropertyName: p.special(p.propertyName),
  "CallExpression/MemberExpression/PropertyName": p.function(p.propertyName),
  "FunctionDeclaration/VariableDefinition": p.function(p.definition(p.variableName)),
  "ClassDeclaration/VariableDefinition": p.definition(p.className),
  "NewExpression/VariableName": p.className,
  PropertyDefinition: p.definition(p.propertyName),
  PrivatePropertyDefinition: p.definition(p.special(p.propertyName)),
  UpdateOp: p.updateOperator,
  "LineComment Hashbang": p.lineComment,
  BlockComment: p.blockComment,
  Number: p.number,
  String: p.string,
  Escape: p.escape,
  ArithOp: p.arithmeticOperator,
  LogicOp: p.logicOperator,
  BitOp: p.bitwiseOperator,
  CompareOp: p.compareOperator,
  RegExp: p.regexp,
  Equals: p.definitionOperator,
  Arrow: p.function(p.punctuation),
  ": Spread": p.punctuation,
  "( )": p.paren,
  "[ ]": p.squareBracket,
  "{ }": p.brace,
  "InterpolationStart InterpolationEnd": p.special(p.brace),
  ".": p.derefOperator,
  ", ;": p.separator,
  "@": p.meta,
  TypeName: p.typeName,
  TypeDefinition: p.definition(p.typeName),
  "type enum interface implements namespace module declare": p.definitionKeyword,
  "abstract global Privacy readonly override": p.modifier,
  "is keyof unique infer asserts": p.operatorKeyword,
  JSXAttributeValue: p.attributeValue,
  JSXText: p.content,
  "JSXStartTag JSXStartCloseTag JSXSelfCloseEndTag JSXEndTag": p.angleBracket,
  "JSXIdentifier JSXNameSpacedName": p.tagName,
  "JSXAttribute/JSXIdentifier JSXAttribute/JSXNameSpacedName": p.attributeName,
  "JSXBuiltin/JSXIdentifier": p.standard(p.tagName)
}), B1 = { __proto__: null, export: 20, as: 25, from: 33, default: 36, async: 41, function: 42, in: 52, out: 55, const: 56, extends: 60, this: 64, true: 72, false: 72, null: 84, void: 88, typeof: 92, super: 108, new: 142, delete: 154, yield: 163, await: 167, class: 172, public: 235, private: 235, protected: 235, readonly: 237, instanceof: 256, satisfies: 259, import: 292, keyof: 349, unique: 353, infer: 359, asserts: 395, is: 397, abstract: 417, implements: 419, type: 421, let: 424, var: 426, using: 429, interface: 435, enum: 439, namespace: 445, module: 447, declare: 451, global: 455, defer: 471, for: 476, of: 485, while: 488, with: 492, do: 496, if: 500, else: 502, switch: 506, case: 512, try: 518, catch: 522, finally: 526, return: 530, throw: 534, break: 538, continue: 542, debugger: 546 }, I1 = { __proto__: null, async: 129, get: 131, set: 133, declare: 195, public: 197, private: 197, protected: 197, static: 199, abstract: 201, override: 203, readonly: 209, accessor: 211, new: 401 }, j1 = { __proto__: null, "<": 193 }, N1 = gi.deserialize({
  version: 14,
  states: "$F|Q%TQlOOO%[QlOOO'_QpOOP(lO`OOO*zQ!0MxO'#CiO+RO#tO'#CjO+aO&jO'#CjO+oO#@ItO'#DaO.QQlO'#DgO.bQlO'#DrO%[QlO'#DzO0fQlO'#ESOOQ!0Lf'#E['#E[O1PQ`O'#EXOOQO'#Ep'#EpOOQO'#Il'#IlO1XQ`O'#GsO1dQ`O'#EoO1iQ`O'#EoO3hQ!0MxO'#JrO6[Q!0MxO'#JsO6uQ`O'#F]O6zQ,UO'#FtOOQ!0Lf'#Ff'#FfO7VO7dO'#FfO9XQMhO'#F|O9`Q`O'#F{OOQ!0Lf'#Js'#JsOOQ!0Lb'#Jr'#JrO9eQ`O'#GwOOQ['#K_'#K_O9pQ`O'#IYO9uQ!0LrO'#IZOOQ['#J`'#J`OOQ['#I_'#I_Q`QlOOQ`QlOOO9}Q!L^O'#DvO:UQlO'#EOO:]QlO'#EQO9kQ`O'#GsO:dQMhO'#CoO:rQ`O'#EnO:}Q`O'#EyO;hQMhO'#FeO;xQ`O'#GsOOQO'#K`'#K`O;}Q`O'#K`O<]Q`O'#G{O<]Q`O'#G|O<]Q`O'#HOO9kQ`O'#HRO=SQ`O'#HUO>kQ`O'#CeO>{Q`O'#HcO?TQ`O'#HiO?TQ`O'#HkO`QlO'#HmO?TQ`O'#HoO?TQ`O'#HrO?YQ`O'#HxO?_Q!0LsO'#IOO%[QlO'#IQO?jQ!0LsO'#ISO?uQ!0LsO'#IUO9uQ!0LrO'#IWO@QQ!0MxO'#CiOASQpO'#DlQOQ`OOO%[QlO'#EQOAjQ`O'#ETO:dQMhO'#EnOAuQ`O'#EnOBQQ!bO'#FeOOQ['#Cg'#CgOOQ!0Lb'#Dq'#DqOOQ!0Lb'#Jv'#JvO%[QlO'#JvOOQO'#Jy'#JyOOQO'#Ih'#IhOCQQpO'#EgOOQ!0Lb'#Ef'#EfOOQ!0Lb'#J}'#J}OC|Q!0MSO'#EgODWQpO'#EWOOQO'#Jx'#JxODlQpO'#JyOEyQpO'#EWODWQpO'#EgPFWO&2DjO'#CbPOOO)CD})CD}OOOO'#I`'#I`OFcO#tO,59UOOQ!0Lh,59U,59UOOOO'#Ia'#IaOFqO&jO,59UOGPQ!L^O'#DcOOOO'#Ic'#IcOGWO#@ItO,59{OOQ!0Lf,59{,59{OGfQlO'#IdOGyQ`O'#JtOIxQ!fO'#JtO+}QlO'#JtOJPQ`O,5:ROJgQ`O'#EpOJtQ`O'#KTOKPQ`O'#KSOKPQ`O'#KSOKXQ`O,5;^OK^Q`O'#KROOQ!0Ln,5:^,5:^OKeQlO,5:^OMcQ!0MxO,5:fONSQ`O,5:nONmQ!0LrO'#KQONtQ`O'#KPO9eQ`O'#KPO! YQ`O'#KPO! bQ`O,5;]O! gQ`O'#KPO!#lQ!fO'#JsOOQ!0Lh'#Ci'#CiO%[QlO'#ESO!$[Q!fO,5:sOOQS'#Jz'#JzOOQO-E<j-E<jO9kQ`O,5=_O!$rQ`O,5=_O!$wQlO,5;ZO!&zQMhO'#EkO!(eQ`O,5;ZO!(jQlO'#DyO!(tQpO,5;dO!(|QpO,5;dO%[QlO,5;dOOQ['#FT'#FTOOQ['#FV'#FVO%[QlO,5;eO%[QlO,5;eO%[QlO,5;eO%[QlO,5;eO%[QlO,5;eO%[QlO,5;eO%[QlO,5;eO%[QlO,5;eO%[QlO,5;eO%[QlO,5;eOOQ['#FZ'#FZO!)[QlO,5;tOOQ!0Lf,5;y,5;yOOQ!0Lf,5;z,5;zOOQ!0Lf,5;|,5;|O%[QlO'#IpO!+_Q!0LrO,5<iO%[QlO,5;eO!&zQMhO,5;eO!+|QMhO,5;eO!-nQMhO'#E^O%[QlO,5;wOOQ!0Lf,5;{,5;{O!-uQ,UO'#FjO!.rQ,UO'#KXO!.^Q,UO'#KXO!.yQ,UO'#KXOOQO'#KX'#KXO!/_Q,UO,5<SOOOW,5<`,5<`O!/pQlO'#FvOOOW'#Io'#IoO7VO7dO,5<QO!/wQ,UO'#FxOOQ!0Lf,5<Q,5<QO!0hQ$IUO'#CyOOQ!0Lh'#C}'#C}O!0{O#@ItO'#DRO!1iQMjO,5<eO!1pQ`O,5<hO!3YQ(CWO'#GXO!3jQ`O'#GYO!3oQ`O'#GYO!5_Q(CWO'#G^O!6dQpO'#GbOOQO'#Gn'#GnO!,TQMhO'#GmOOQO'#Gp'#GpO!,TQMhO'#GoO!7VQ$IUO'#JlOOQ!0Lh'#Jl'#JlO!7aQ`O'#JkO!7oQ`O'#JjO!7wQ`O'#CuOOQ!0Lh'#C{'#C{O!8YQ`O'#C}OOQ!0Lh'#DV'#DVOOQ!0Lh'#DX'#DXO!8_Q`O,5<eO1SQ`O'#DZO!,TQMhO'#GPO!,TQMhO'#GRO!8gQ`O'#GTO!8lQ`O'#GUO!3oQ`O'#G[O!,TQMhO'#GaO<]Q`O'#JkO!8qQ`O'#EqO!9`Q`O,5<gOOQ!0Lb'#Cr'#CrO!9hQ`O'#ErO!:bQpO'#EsOOQ!0Lb'#KR'#KRO!:iQ!0LrO'#KaO9uQ!0LrO,5=cO`QlO,5>tOOQ['#Jh'#JhOOQ[,5>u,5>uOOQ[-E<]-E<]O!<hQ!0MxO,5:bO!:]QpO,5:`O!?RQ!0MxO,5:jO%[QlO,5:jO!AiQ!0MxO,5:lOOQO,5@z,5@zO!BYQMhO,5=_O!BhQ!0LrO'#JiO9`Q`O'#JiO!ByQ!0LrO,59ZO!CUQpO,59ZO!C^QMhO,59ZO:dQMhO,59ZO!CiQ`O,5;ZO!CqQ`O'#HbO!DVQ`O'#KdO%[QlO,5;}O!:]QpO,5<PO!D_Q`O,5=zO!DdQ`O,5=zO!DiQ`O,5=zO!DwQ`O,5=zO9uQ!0LrO,5=zO<]Q`O,5=jOOQO'#Cy'#CyO!EOQpO,5=gO!EWQMhO,5=hO!EcQ`O,5=jO!EhQ!bO,5=mO!EpQ`O'#K`O?YQ`O'#HWO9kQ`O'#HYO!EuQ`O'#HYO:dQMhO'#H[O!EzQ`O'#H[OOQ[,5=p,5=pO!FPQ`O'#H]O!FbQ`O'#CoO!FgQ`O,59PO!FqQ`O,59PO!HvQlO,59POOQ[,59P,59PO!IWQ!0LrO,59PO%[QlO,59PO!KcQlO'#HeOOQ['#Hf'#HfOOQ['#Hg'#HgO`QlO,5=}O!KyQ`O,5=}O`QlO,5>TO`QlO,5>VO!LOQ`O,5>XO`QlO,5>ZO!LTQ`O,5>^O!LYQlO,5>dOOQ[,5>j,5>jO%[QlO,5>jO9uQ!0LrO,5>lOOQ[,5>n,5>nO#!dQ`O,5>nOOQ[,5>p,5>pO#!dQ`O,5>pOOQ[,5>r,5>rO##QQpO'#D_O%[QlO'#JvO##sQpO'#JvO##}QpO'#DmO#$`QpO'#DmO#&qQlO'#DmO#&xQ`O'#JuO#'QQ`O,5:WO#'VQ`O'#EtO#'eQ`O'#KUO#'mQ`O,5;_O#'rQpO'#DmO#(PQpO'#EVOOQ!0Lf,5:o,5:oO%[QlO,5:oO#(WQ`O,5:oO?YQ`O,5;YO!CUQpO,5;YO!C^QMhO,5;YO:dQMhO,5;YO#(`Q`O,5@bO#(eQ07dO,5:sOOQO-E<f-E<fO#)kQ!0MSO,5;RODWQpO,5:rO#)uQpO,5:rODWQpO,5;RO!ByQ!0LrO,5:rOOQ!0Lb'#Ej'#EjOOQO,5;R,5;RO%[QlO,5;RO#*SQ!0LrO,5;RO#*_Q!0LrO,5;RO!CUQpO,5:rOOQO,5;X,5;XO#*mQ!0LrO,5;RPOOO'#I^'#I^P#+RO&2DjO,58|POOO,58|,58|OOOO-E<^-E<^OOQ!0Lh1G.p1G.pOOOO-E<_-E<_OOOO,59},59}O#+^Q!bO,59}OOOO-E<a-E<aOOQ!0Lf1G/g1G/gO#+cQ!fO,5?OO+}QlO,5?OOOQO,5?U,5?UO#+mQlO'#IdOOQO-E<b-E<bO#+zQ`O,5@`O#,SQ!fO,5@`O#,ZQ`O,5@nOOQ!0Lf1G/m1G/mO%[QlO,5@oO#,cQ`O'#IjOOQO-E<h-E<hO#,ZQ`O,5@nOOQ!0Lb1G0x1G0xOOQ!0Ln1G/x1G/xOOQ!0Ln1G0Y1G0YO%[QlO,5@lO#,wQ!0LrO,5@lO#-YQ!0LrO,5@lO#-aQ`O,5@kO9eQ`O,5@kO#-iQ`O,5@kO#-wQ`O'#ImO#-aQ`O,5@kOOQ!0Lb1G0w1G0wO!(tQpO,5:uO!)PQpO,5:uOOQS,5:w,5:wO#.iQdO,5:wO#.qQMhO1G2yO9kQ`O1G2yOOQ!0Lf1G0u1G0uO#/PQ!0MxO1G0uO#0UQ!0MvO,5;VOOQ!0Lh'#GW'#GWO#0rQ!0MzO'#JlO!$wQlO1G0uO#2}Q!fO'#JwO%[QlO'#JwO#3XQ`O,5:eOOQ!0Lh'#D_'#D_OOQ!0Lf1G1O1G1OO%[QlO1G1OOOQ!0Lf1G1f1G1fO#3^Q`O1G1OO#5rQ!0MxO1G1PO#5yQ!0MxO1G1PO#8aQ!0MxO1G1PO#8hQ!0MxO1G1PO#;OQ!0MxO1G1PO#=fQ!0MxO1G1PO#=mQ!0MxO1G1PO#=tQ!0MxO1G1PO#@[Q!0MxO1G1PO#@cQ!0MxO1G1PO#BpQ?MtO'#CiO#DkQ?MtO1G1`O#DrQ?MtO'#JsO#EVQ!0MxO,5?[OOQ!0Lb-E<n-E<nO#GdQ!0MxO1G1PO#HaQ!0MzO1G1POOQ!0Lf1G1P1G1PO#IdQMjO'#J|O#InQ`O,5:xO#IsQ!0MxO1G1cO#JgQ,UO,5<WO#JoQ,UO,5<XO#JwQ,UO'#FoO#K`Q`O'#FnOOQO'#KY'#KYOOQO'#In'#InO#KeQ,UO1G1nOOQ!0Lf1G1n1G1nOOOW1G1y1G1yO#KvQ?MtO'#JrO#LQQ`O,5<bO!)[QlO,5<bOOOW-E<m-E<mOOQ!0Lf1G1l1G1lO#LVQpO'#KXOOQ!0Lf,5<d,5<dO#L_QpO,5<dO#LdQMhO'#DTOOOO'#Ib'#IbO#LkO#@ItO,59mOOQ!0Lh,59m,59mO%[QlO1G2PO!8lQ`O'#IrO#LvQ`O,5<zOOQ!0Lh,5<w,5<wO!,TQMhO'#IuO#MdQMjO,5=XO!,TQMhO'#IwO#NVQMjO,5=ZO!&zQMhO,5=]OOQO1G2S1G2SO#NaQ!dO'#CrO#NtQ(CWO'#ErO$ |QpO'#GbO$!dQ!dO,5<sO$!kQ`O'#K[O9eQ`O'#K[O$!yQ`O,5<uO$#aQ!dO'#C{O!,TQMhO,5<tO$#kQ`O'#GZO$$PQ`O,5<tO$$UQ!dO'#GWO$$cQ!dO'#K]O$$mQ`O'#K]O!&zQMhO'#K]O$$rQ`O,5<xO$$wQlO'#JvO$%RQpO'#GcO#$`QpO'#GcO$%dQ`O'#GgO!3oQ`O'#GkO$%iQ!0LrO'#ItO$%tQpO,5<|OOQ!0Lp,5<|,5<|O$%{QpO'#GcO$&YQpO'#GdO$&kQpO'#GdO$&pQMjO,5=XO$'QQMjO,5=ZOOQ!0Lh,5=^,5=^O!,TQMhO,5@VO!,TQMhO,5@VO$'bQ`O'#IyO$'vQ`O,5@UO$(OQ`O,59aOOQ!0Lh,59i,59iO$(TQ`O,5@VO$)TQ$IYO,59uOOQ!0Lh'#Jp'#JpO$)vQMjO,5<kO$*iQMjO,5<mO@zQ`O,5<oOOQ!0Lh,5<p,5<pO$*sQ`O,5<vO$*xQMjO,5<{O$+YQ`O'#KPO!$wQlO1G2RO$+_Q`O1G2RO9eQ`O'#KSO9eQ`O'#EtO%[QlO'#EtO9eQ`O'#I{O$+dQ!0LrO,5@{OOQ[1G2}1G2}OOQ[1G4`1G4`OOQ!0Lf1G/|1G/|OOQ!0Lf1G/z1G/zO$-fQ!0MxO1G0UOOQ[1G2y1G2yO!&zQMhO1G2yO%[QlO1G2yO#.tQ`O1G2yO$/jQMhO'#EkOOQ!0Lb,5@T,5@TO$/wQ!0LrO,5@TOOQ[1G.u1G.uO!ByQ!0LrO1G.uO!CUQpO1G.uO!C^QMhO1G.uO$0YQ`O1G0uO$0_Q`O'#CiO$0jQ`O'#KeO$0rQ`O,5=|O$0wQ`O'#KeO$0|Q`O'#KeO$1[Q`O'#JRO$1jQ`O,5AOO$1rQ!fO1G1iOOQ!0Lf1G1k1G1kO9kQ`O1G3fO@zQ`O1G3fO$1yQ`O1G3fO$2OQ`O1G3fO!DiQ`O1G3fO9uQ!0LrO1G3fOOQ[1G3f1G3fO!EcQ`O1G3UO!&zQMhO1G3RO$2TQ`O1G3ROOQ[1G3S1G3SO!&zQMhO1G3SO$2YQ`O1G3SO$2bQpO'#HQOOQ[1G3U1G3UO!6_QpO'#I}O!EhQ!bO1G3XOOQ[1G3X1G3XOOQ[,5=r,5=rO$2jQMhO,5=tO9kQ`O,5=tO$%dQ`O,5=vO9`Q`O,5=vO!CUQpO,5=vO!C^QMhO,5=vO:dQMhO,5=vO$2xQ`O'#KcO$3TQ`O,5=wOOQ[1G.k1G.kO$3YQ!0LrO1G.kO@zQ`O1G.kO$3eQ`O1G.kO9uQ!0LrO1G.kO$5mQ!fO,5AQO$5zQ`O,5AQO9eQ`O,5AQO$6VQlO,5>PO$6^Q`O,5>POOQ[1G3i1G3iO`QlO1G3iOOQ[1G3o1G3oOOQ[1G3q1G3qO?TQ`O1G3sO$6cQlO1G3uO$:gQlO'#HtOOQ[1G3x1G3xO$:tQ`O'#HzO?YQ`O'#H|OOQ[1G4O1G4OO$:|QlO1G4OO9uQ!0LrO1G4UOOQ[1G4W1G4WOOQ!0Lb'#G_'#G_O9uQ!0LrO1G4YO9uQ!0LrO1G4[O$?TQ`O,5@bO!)[QlO,5;`O9eQ`O,5;`O?YQ`O,5:XO!)[QlO,5:XO!CUQpO,5:XO$?YQ?MtO,5:XOOQO,5;`,5;`O$?dQpO'#IeO$?zQ`O,5@aOOQ!0Lf1G/r1G/rO$@SQpO'#IkO$@^Q`O,5@pOOQ!0Lb1G0y1G0yO#$`QpO,5:XOOQO'#Ig'#IgO$@fQpO,5:qOOQ!0Ln,5:q,5:qO#(ZQ`O1G0ZOOQ!0Lf1G0Z1G0ZO%[QlO1G0ZOOQ!0Lf1G0t1G0tO?YQ`O1G0tO!CUQpO1G0tO!C^QMhO1G0tOOQ!0Lb1G5|1G5|O!ByQ!0LrO1G0^OOQO1G0m1G0mO%[QlO1G0mO$@mQ!0LrO1G0mO$@xQ!0LrO1G0mO!CUQpO1G0^ODWQpO1G0^O$AWQ!0LrO1G0mOOQO1G0^1G0^O$AlQ!0MxO1G0mPOOO-E<[-E<[POOO1G.h1G.hOOOO1G/i1G/iO$AvQ!bO,5<iO$BOQ!fO1G4jOOQO1G4p1G4pO%[QlO,5?OO$BYQ`O1G5zO$BbQ`O1G6YO$BjQ!fO1G6ZO9eQ`O,5?UO$BtQ!0MxO1G6WO%[QlO1G6WO$CUQ!0LrO1G6WO$CgQ`O1G6VO$CgQ`O1G6VO9eQ`O1G6VO$CoQ`O,5?XO9eQ`O,5?XOOQO,5?X,5?XO$DTQ`O,5?XO$+YQ`O,5?XOOQO-E<k-E<kOOQS1G0a1G0aOOQS1G0c1G0cO#.lQ`O1G0cOOQ[7+(e7+(eO!&zQMhO7+(eO%[QlO7+(eO$DcQ`O7+(eO$DnQMhO7+(eO$D|Q!0MzO,5=XO$GXQ!0MzO,5=ZO$IdQ!0MzO,5=XO$KuQ!0MzO,5=ZO$NWQ!0MzO,59uO%!]Q!0MzO,5<kO%$hQ!0MzO,5<mO%&sQ!0MzO,5<{OOQ!0Lf7+&a7+&aO%)UQ!0MxO7+&aO%)xQlO'#IfO%*VQ`O,5@cO%*_Q!fO,5@cOOQ!0Lf1G0P1G0PO%*iQ`O7+&jOOQ!0Lf7+&j7+&jO%*nQ?MtO,5:fO%[QlO7+&zO%*xQ?MtO,5:bO%+VQ?MtO,5:jO%+aQ?MtO,5:lO%+kQMhO'#IiO%+uQ`O,5@hOOQ!0Lh1G0d1G0dOOQO1G1r1G1rOOQO1G1s1G1sO%+}Q!jO,5<ZO!)[QlO,5<YOOQO-E<l-E<lOOQ!0Lf7+'Y7+'YOOOW7+'e7+'eOOOW1G1|1G1|O%,YQ`O1G1|OOQ!0Lf1G2O1G2OOOOO,59o,59oO%,_Q!dO,59oOOOO-E<`-E<`OOQ!0Lh1G/X1G/XO%,fQ!0MxO7+'kOOQ!0Lh,5?^,5?^O%-YQMhO1G2fP%-aQ`O'#IrPOQ!0Lh-E<p-E<pO%-}QMjO,5?aOOQ!0Lh-E<s-E<sO%.pQMjO,5?cOOQ!0Lh-E<u-E<uO%.zQ!dO1G2wO%/RQ!dO'#CrO%/iQMhO'#KSO$$wQlO'#JvOOQ!0Lh1G2_1G2_O%/sQ`O'#IqO%0[Q`O,5@vO%0[Q`O,5@vO%0dQ`O,5@vO%0oQ`O,5@vOOQO1G2a1G2aO%0}QMjO1G2`O$+YQ`O'#K[O!,TQMhO1G2`O%1_Q(CWO'#IsO%1lQ`O,5@wO!&zQMhO,5@wO%1tQ!dO,5@wOOQ!0Lh1G2d1G2dO%4UQ!fO'#CiO%4`Q`O,5=POOQ!0Lb,5<},5<}O%4hQpO,5<}OOQ!0Lb,5=O,5=OOCwQ`O,5<}O%4sQpO,5<}OOQ!0Lb,5=R,5=RO$+YQ`O,5=VOOQO,5?`,5?`OOQO-E<r-E<rOOQ!0Lp1G2h1G2hO#$`QpO,5<}O$$wQlO,5=PO%5RQ`O,5=OO%5^QpO,5=OO!,TQMhO'#IuO%6WQMjO1G2sO!,TQMhO'#IwO%6yQMjO1G2uO%7TQMjO1G5qO%7_QMjO1G5qOOQO,5?e,5?eOOQO-E<w-E<wOOQO1G.{1G.{O!,TQMhO1G5qO!,TQMhO1G5qO!:]QpO,59wO%[QlO,59wOOQ!0Lh,5<j,5<jO%7lQ`O1G2ZO!,TQMhO1G2bO%7qQ!0MxO7+'mOOQ!0Lf7+'m7+'mO!$wQlO7+'mO%8eQ`O,5;`OOQ!0Lb,5?g,5?gOOQ!0Lb-E<y-E<yO%8jQ!dO'#K^O#(ZQ`O7+(eO4UQ!fO7+(eO$DfQ`O7+(eO%8tQ!0MvO'#CiO%9XQ!0MvO,5=SO%9lQ`O,5=SO%9tQ`O,5=SOOQ!0Lb1G5o1G5oOOQ[7+$a7+$aO!ByQ!0LrO7+$aO!CUQpO7+$aO!$wQlO7+&aO%9yQ`O'#JQO%:bQ`O,5APOOQO1G3h1G3hO9kQ`O,5APO%:bQ`O,5APO%:jQ`O,5APOOQO,5?m,5?mOOQO-E=P-E=POOQ!0Lf7+'T7+'TO%:oQ`O7+)QO9uQ!0LrO7+)QO9kQ`O7+)QO@zQ`O7+)QO%:tQ`O7+)QOOQ[7+)Q7+)QOOQ[7+(p7+(pO%:yQ!0MvO7+(mO!&zQMhO7+(mO!E^Q`O7+(nOOQ[7+(n7+(nO!&zQMhO7+(nO%;TQ`O'#KbO%;`Q`O,5=lOOQO,5?i,5?iOOQO-E<{-E<{OOQ[7+(s7+(sO%<rQpO'#HZOOQ[1G3`1G3`O!&zQMhO1G3`O%[QlO1G3`O%<yQ`O1G3`O%=UQMhO1G3`O9uQ!0LrO1G3bO$%dQ`O1G3bO9`Q`O1G3bO!CUQpO1G3bO!C^QMhO1G3bO%=dQ`O'#JPO%=xQ`O,5@}O%>QQpO,5@}OOQ!0Lb1G3c1G3cOOQ[7+$V7+$VO@zQ`O7+$VO9uQ!0LrO7+$VO%>]Q`O7+$VO%[QlO1G6lO%[QlO1G6mO%>bQ!0LrO1G6lO%>lQlO1G3kO%>sQ`O1G3kO%>xQlO1G3kOOQ[7+)T7+)TO9uQ!0LrO7+)_O`QlO7+)aOOQ['#Kh'#KhOOQ['#JS'#JSO%?PQlO,5>`OOQ[,5>`,5>`O%[QlO'#HuO%?^Q`O'#HwOOQ[,5>f,5>fO9eQ`O,5>fOOQ[,5>h,5>hOOQ[7+)j7+)jOOQ[7+)p7+)pOOQ[7+)t7+)tOOQ[7+)v7+)vO%?cQpO1G5|O%?}Q?MtO1G0zO%@XQ`O1G0zOOQO1G/s1G/sO%@dQ?MtO1G/sO?YQ`O1G/sO!)[QlO'#DmOOQO,5?P,5?POOQO-E<c-E<cOOQO,5?V,5?VOOQO-E<i-E<iO!CUQpO1G/sOOQO-E<e-E<eOOQ!0Ln1G0]1G0]OOQ!0Lf7+%u7+%uO#(ZQ`O7+%uOOQ!0Lf7+&`7+&`O?YQ`O7+&`O!CUQpO7+&`OOQO7+%x7+%xO$AlQ!0MxO7+&XOOQO7+&X7+&XO%[QlO7+&XO%@nQ!0LrO7+&XO!ByQ!0LrO7+%xO!CUQpO7+%xO%@yQ!0LrO7+&XO%AXQ!0MxO7++rO%[QlO7++rO%AiQ`O7++qO%AiQ`O7++qOOQO1G4s1G4sO9eQ`O1G4sO%AqQ`O1G4sOOQS7+%}7+%}O#(ZQ`O<<LPO4UQ!fO<<LPO%BPQ`O<<LPOOQ[<<LP<<LPO!&zQMhO<<LPO%[QlO<<LPO%BXQ`O<<LPO%BdQ!0MzO,5?aO%DoQ!0MzO,5?cO%FzQ!0MzO1G2`O%I]Q!0MzO1G2sO%KhQ!0MzO1G2uO%MsQ!fO,5?QO%[QlO,5?QOOQO-E<d-E<dO%M}Q`O1G5}OOQ!0Lf<<JU<<JUO%NVQ?MtO1G0uO&!^Q?MtO1G1PO&!eQ?MtO1G1PO&$fQ?MtO1G1PO&$mQ?MtO1G1PO&&nQ?MtO1G1PO&(oQ?MtO1G1PO&(vQ?MtO1G1PO&(}Q?MtO1G1PO&+OQ?MtO1G1PO&+VQ?MtO1G1PO&+^Q!0MxO<<JfO&-UQ?MtO1G1PO&.RQ?MvO1G1PO&/UQ?MvO'#JlO&1[Q?MtO1G1cO&1iQ?MtO1G0UO&1sQMjO,5?TOOQO-E<g-E<gO!)[QlO'#FqOOQO'#KZ'#KZOOQO1G1u1G1uO&1}Q`O1G1tO&2SQ?MtO,5?[OOOW7+'h7+'hOOOO1G/Z1G/ZO&2^Q!dO1G4xOOQ!0Lh7+(Q7+(QP!&zQMhO,5?^O!,TQMhO7+(cO&2eQ`O,5?]O9eQ`O,5?]O$+YQ`O,5?]OOQO-E<o-E<oO&2sQ`O1G6bO&2sQ`O1G6bO&2{Q`O1G6bO&3WQMjO7+'zO&3hQ!dO,5?_O&3rQ`O,5?_O!&zQMhO,5?_OOQO-E<q-E<qO&3wQ!dO1G6cO&4RQ`O1G6cO&4ZQ`O1G2kO!&zQMhO1G2kOOQ!0Lb1G2i1G2iOOQ!0Lb1G2j1G2jO%4hQpO1G2iO!CUQpO1G2iOCwQ`O1G2iOOQ!0Lb1G2q1G2qO&4`QpO1G2iO&4nQ`O1G2kO$+YQ`O1G2jOCwQ`O1G2jO$$wQlO1G2kO&4vQ`O1G2jO&5jQMjO,5?aOOQ!0Lh-E<t-E<tO&6]QMjO,5?cOOQ!0Lh-E<v-E<vO!,TQMhO7++]O&6gQMjO7++]O&6qQMjO7++]OOQ!0Lh1G/c1G/cO&7OQ`O1G/cOOQ!0Lh7+'u7+'uO&7TQMjO7+'|O&7eQ!0MxO<<KXOOQ!0Lf<<KX<<KXO&8XQ`O1G0zO!&zQMhO'#IzO&8^Q`O,5@xO&:`Q!fO<<LPO!&zQMhO1G2nO&:gQ!0LrO1G2nOOQ[<<G{<<G{O!ByQ!0LrO<<G{O&:xQ!0MxO<<I{OOQ!0Lf<<I{<<I{OOQO,5?l,5?lO&;lQ`O,5?lO&;qQ`O,5?lOOQO-E=O-E=OO&<PQ`O1G6kO&<PQ`O1G6kO9kQ`O1G6kO@zQ`O<<LlOOQ[<<Ll<<LlO&<XQ`O<<LlO9uQ!0LrO<<LlO9kQ`O<<LlOOQ[<<LX<<LXO%:yQ!0MvO<<LXOOQ[<<LY<<LYO!E^Q`O<<LYO&<^QpO'#I|O&<iQ`O,5@|O!)[QlO,5@|OOQ[1G3W1G3WOOQO'#JO'#JOO9uQ!0LrO'#JOO&<qQpO,5=uOOQ[,5=u,5=uO&<xQpO'#EgO&=PQpO'#GeO&=UQ`O7+(zO&=ZQ`O7+(zOOQ[7+(z7+(zO!&zQMhO7+(zO%[QlO7+(zO&=cQ`O7+(zOOQ[7+(|7+(|O9uQ!0LrO7+(|O$%dQ`O7+(|O9`Q`O7+(|O!CUQpO7+(|O&=nQ`O,5?kOOQO-E<}-E<}OOQO'#H^'#H^O&=yQ`O1G6iO9uQ!0LrO<<GqOOQ[<<Gq<<GqO@zQ`O<<GqO&>RQ`O7+,WO&>WQ`O7+,XO%[QlO7+,WO%[QlO7+,XOOQ[7+)V7+)VO&>]Q`O7+)VO&>bQlO7+)VO&>iQ`O7+)VOOQ[<<Ly<<LyOOQ[<<L{<<L{OOQ[-E=Q-E=QOOQ[1G3z1G3zO&>nQ`O,5>aOOQ[,5>c,5>cO&>sQ`O1G4QO9eQ`O7+&fO!)[QlO7+&fOOQO7+%_7+%_O&>xQ?MtO1G6ZO?YQ`O7+%_OOQ!0Lf<<Ia<<IaOOQ!0Lf<<Iz<<IzO?YQ`O<<IzOOQO<<Is<<IsO$AlQ!0MxO<<IsO%[QlO<<IsOOQO<<Id<<IdO!ByQ!0LrO<<IdO&?SQ!0LrO<<IsO&?_Q!0MxO<= ^O&?oQ`O<= ]OOQO7+*_7+*_O9eQ`O7+*_OOQ[ANAkANAkO&?wQ!fOANAkO!&zQMhOANAkO#(ZQ`OANAkO4UQ!fOANAkO&@OQ`OANAkO%[QlOANAkO&@WQ!0MzO7+'zO&BiQ!0MzO,5?aO&DtQ!0MzO,5?cO&GPQ!0MzO7+'|O&IbQ!fO1G4lO&IlQ?MtO7+&aO&KpQ?MvO,5=XO&MwQ?MvO,5=ZO&NXQ?MvO,5=XO&NiQ?MvO,5=ZO&NyQ?MvO,59uO'#PQ?MvO,5<kO'%SQ?MvO,5<mO''hQ?MvO,5<{O')^Q?MtO7+'kO')kQ?MtO7+'mO')xQ`O,5<]OOQO7+'`7+'`OOQ!0Lh7+*d7+*dO')}QMjO<<K}OOQO1G4w1G4wO'*UQ`O1G4wO'*aQ`O1G4wO'*oQ`O7++|O'*oQ`O7++|O!&zQMhO1G4yO'*wQ!dO1G4yO'+RQ`O7++}O'+ZQ`O7+(VO'+fQ!dO7+(VOOQ!0Lb7+(T7+(TOOQ!0Lb7+(U7+(UO!CUQpO7+(TOCwQ`O7+(TO'+pQ`O7+(VO!&zQMhO7+(VO$+YQ`O7+(UO'+uQ`O7+(VOCwQ`O7+(UO'+}QMjO<<NwO!,TQMhO<<NwOOQ!0Lh7+$}7+$}O',XQ!dO,5?fOOQO-E<x-E<xO',cQ!0MvO7+(YO!&zQMhO7+(YOOQ[AN=gAN=gO9kQ`O1G5WOOQO1G5W1G5WO',sQ`O1G5WO',xQ`O7+,VO',xQ`O7+,VO9uQ!0LrOANBWO@zQ`OANBWOOQ[ANBWANBWO'-QQ`OANBWOOQ[ANAsANAsOOQ[ANAtANAtO'-VQ`O,5?hOOQO-E<z-E<zO'-bQ?MtO1G6hOOQO,5?j,5?jOOQO-E<|-E<|OOQ[1G3a1G3aO'-lQ`O,5=POOQ[<<Lf<<LfO!&zQMhO<<LfO&=UQ`O<<LfO'-qQ`O<<LfO%[QlO<<LfOOQ[<<Lh<<LhO9uQ!0LrO<<LhO$%dQ`O<<LhO9`Q`O<<LhO'-yQpO1G5VO'.UQ`O7+,TOOQ[AN=]AN=]O9uQ!0LrOAN=]OOQ[<= r<= rOOQ[<= s<= sO'.^Q`O<= rO'.cQ`O<= sOOQ[<<Lq<<LqO'.hQ`O<<LqO'.mQlO<<LqOOQ[1G3{1G3{O?YQ`O7+)lO'.tQ`O<<JQO'/PQ?MtO<<JQOOQO<<Hy<<HyOOQ!0LfAN?fAN?fOOQOAN?_AN?_O$AlQ!0MxOAN?_OOQOAN?OAN?OO%[QlOAN?_OOQO<<My<<MyOOQ[G27VG27VO!&zQMhOG27VO#(ZQ`OG27VO'/ZQ!fOG27VO4UQ!fOG27VO'/bQ`OG27VO'/jQ?MtO<<JfO'/wQ?MvO1G2`O'1mQ?MvO,5?aO'3pQ?MvO,5?cO'5sQ?MvO1G2sO'7vQ?MvO1G2uO'9yQ?MtO<<KXO':WQ?MtO<<I{OOQO1G1w1G1wO!,TQMhOANAiOOQO7+*c7+*cO':eQ`O7+*cO':pQ`O<= hO':xQ!dO7+*eOOQ!0Lb<<Kq<<KqO$+YQ`O<<KqOCwQ`O<<KqO';SQ`O<<KqO!&zQMhO<<KqOOQ!0Lb<<Ko<<KoO!CUQpO<<KoO';_Q!dO<<KqOOQ!0Lb<<Kp<<KpO';iQ`O<<KqO!&zQMhO<<KqO$+YQ`O<<KpO';nQMjOANDcO';xQ!0MvO<<KtOOQO7+*r7+*rO9kQ`O7+*rO'<YQ`O<= qOOQ[G27rG27rO9uQ!0LrOG27rO@zQ`OG27rO!)[QlO1G5SO'<bQ`O7+,SO'<jQ`O1G2kO&=UQ`OANBQOOQ[ANBQANBQO!&zQMhOANBQO'<oQ`OANBQOOQ[ANBSANBSO9uQ!0LrOANBSO$%dQ`OANBSOOQO'#H_'#H_OOQO7+*q7+*qOOQ[G22wG22wOOQ[ANE^ANE^OOQ[ANE_ANE_OOQ[ANB]ANB]O'<wQ`OANB]OOQ[<<MW<<MWO!)[QlOAN?lOOQOG24yG24yO$AlQ!0MxOG24yO#(ZQ`OLD,qOOQ[LD,qLD,qO!&zQMhOLD,qO'<|Q!fOLD,qO'=TQ?MvO7+'zO'>yQ?MvO,5?aO'@|Q?MvO,5?cO'CPQ?MvO7+'|O'DuQMjOG27TOOQO<<M}<<M}OOQ!0LbANA]ANA]O$+YQ`OANA]OCwQ`OANA]O'EVQ!dOANA]OOQ!0LbANAZANAZO'E^Q`OANA]O!&zQMhOANA]O'EiQ!dOANA]OOQ!0LbANA[ANA[OOQO<<N^<<N^OOQ[LD-^LD-^O9uQ!0LrOLD-^O'EsQ?MtO7+*nOOQO'#Gf'#GfOOQ[G27lG27lO&=UQ`OG27lO!&zQMhOG27lOOQ[G27nG27nO9uQ!0LrOG27nOOQ[G27wG27wO'E}Q?MtOG25WOOQOLD*eLD*eOOQ[!$(!]!$(!]O#(ZQ`O!$(!]O!&zQMhO!$(!]O'FXQ!0MzOG27TOOQ!0LbG26wG26wO$+YQ`OG26wO'HjQ`OG26wOCwQ`OG26wO'HuQ!dOG26wO!&zQMhOG26wOOQ[!$(!x!$(!xOOQ[LD-WLD-WO&=UQ`OLD-WOOQ[LD-YLD-YOOQ[!)9Ew!)9EwO#(ZQ`O!)9EwOOQ!0LbLD,cLD,cO$+YQ`OLD,cOCwQ`OLD,cO'H|Q`OLD,cO'IXQ!dOLD,cOOQ[!$(!r!$(!rOOQ[!.K;c!.K;cO'I`Q?MvOG27TOOQ!0Lb!$( }!$( }O$+YQ`O!$( }OCwQ`O!$( }O'KUQ`O!$( }OOQ!0Lb!)9Ei!)9EiO$+YQ`O!)9EiOCwQ`O!)9EiOOQ!0Lb!.K;T!.K;TO$+YQ`O!.K;TOOQ!0Lb!4/0o!4/0oO!)[QlO'#DzO1PQ`O'#EXO'KaQ!fO'#JrO'KhQ!L^O'#DvO'KoQlO'#EOO'KvQ!fO'#CiO'N^Q!fO'#CiO!)[QlO'#EQO'NnQlO,5;ZO!)[QlO,5;eO!)[QlO,5;eO!)[QlO,5;eO!)[QlO,5;eO!)[QlO,5;eO!)[QlO,5;eO!)[QlO,5;eO!)[QlO,5;eO!)[QlO,5;eO!)[QlO,5;eO!)[QlO'#IpO(!qQ`O,5<iO!)[QlO,5;eO(!yQMhO,5;eO($dQMhO,5;eO!)[QlO,5;wO!&zQMhO'#GmO(!yQMhO'#GmO!&zQMhO'#GoO(!yQMhO'#GoO1SQ`O'#DZO1SQ`O'#DZO!&zQMhO'#GPO(!yQMhO'#GPO!&zQMhO'#GRO(!yQMhO'#GRO!&zQMhO'#GaO(!yQMhO'#GaO!)[QlO,5:jO($kQpO'#D_O($uQpO'#JvO!)[QlO,5@oO'NnQlO1G0uO(%PQ?MtO'#CiO!)[QlO1G2PO!&zQMhO'#IuO(!yQMhO'#IuO!&zQMhO'#IwO(!yQMhO'#IwO(%ZQ!dO'#CrO!&zQMhO,5<tO(!yQMhO,5<tO'NnQlO1G2RO!)[QlO7+&zO!&zQMhO1G2`O(!yQMhO1G2`O!&zQMhO'#IuO(!yQMhO'#IuO!&zQMhO'#IwO(!yQMhO'#IwO!&zQMhO1G2bO(!yQMhO1G2bO'NnQlO7+'mO'NnQlO7+&aO!&zQMhOANAiO(!yQMhOANAiO(%nQ`O'#EoO(%sQ`O'#EoO(%{Q`O'#F]O(&QQ`O'#EyO(&VQ`O'#KTO(&bQ`O'#KRO(&mQ`O,5;ZO(&rQMjO,5<eO(&yQ`O'#GYO('OQ`O'#GYO('TQ`O,5<eO(']Q`O,5<gO('eQ`O,5;ZO('mQ?MtO1G1`O('tQ`O,5<tO('yQ`O,5<tO((OQ`O,5<vO((TQ`O,5<vO((YQ`O1G2RO((_Q`O1G0uO((dQMjO<<K}O((kQMjO<<K}O((rQMhO'#F|O9`Q`O'#F{OAuQ`O'#EnO!)[QlO,5;tO!3oQ`O'#GYO!3oQ`O'#GYO!3oQ`O'#G[O!3oQ`O'#G[O!,TQMhO7+(cO!,TQMhO7+(cO%.zQ!dO1G2wO%.zQ!dO1G2wO!&zQMhO,5=]O!&zQMhO,5=]",
  stateData: "()x~O'|OS'}OSTOS(ORQ~OPYOQYOSfOY!VOaqOdzOeyOl!POpkOrYOskOtkOzkO|YO!OYO!SWO!WkO!XkO!_XO!iuO!lZO!oYO!pYO!qYO!svO!uwO!xxO!|]O$W|O$niO%h}O%j!QO%l!OO%m!OO%n!OO%q!RO%s!SO%v!TO%w!TO%y!UO&W!WO&^!XO&`!YO&b!ZO&d![O&g!]O&m!^O&s!_O&u!`O&w!aO&y!bO&{!cO(TSO(VTO(YUO(aVO(o[O~OWtO~P`OPYOQYOSfOd!jOe!iOpkOrYOskOtkOzkO|YO!OYO!SWO!WkO!XkO!_!eO!iuO!lZO!oYO!pYO!qYO!svO!u!gO!x!hO$W!kO$niO(T!dO(VTO(YUO(aVO(o[O~Oa!wOs!nO!S!oO!b!yO!c!vO!d!vO!|<VO#T!pO#U!pO#V!xO#W!pO#X!pO#[!zO#]!zO(U!lO(VTO(YUO(e!mO(o!sO~O(O!{O~OP]XR]X[]Xa]Xj]Xr]X!Q]X!S]X!]]X!l]X!p]X#R]X#S]X#`]X#kfX#n]X#o]X#p]X#q]X#r]X#s]X#t]X#u]X#v]X#x]X#z]X#{]X$Q]X'z]X(a]X(r]X(y]X(z]X~O!g%RX~P(qO_!}O(V#PO(W!}O(X#PO~O_#QO(X#PO(Y#PO(Z#QO~Ox#SO!U#TO(b#TO(c#VO~OPYOQYOSfOd!jOe!iOpkOrYOskOtkOzkO|YO!OYO!SWO!WkO!XkO!_!eO!iuO!lZO!oYO!pYO!qYO!svO!u!gO!x!hO$W!kO$niO(T<ZO(VTO(YUO(aVO(o[O~O![#ZO!]#WO!Y(hP!Y(vP~P+}O!^#cO~P`OPYOQYOSfOd!jOe!iOrYOskOtkOzkO|YO!OYO!SWO!WkO!XkO!_!eO!iuO!lZO!oYO!pYO!qYO!svO!u!gO!x!hO$W!kO$niO(VTO(YUO(aVO(o[O~Op#mO![#iO!|]O#i#lO#j#iO(T<[O!k(sP~P.iO!l#oO(T#nO~O!x#sO!|]O%h#tO~O#k#uO~O!g#vO#k#uO~OP$[OR#zO[$cOj$ROr$aO!Q#yO!S#{O!]$_O!l#xO!p$[O#R$RO#n$OO#o$PO#p$PO#q$PO#r$QO#s$RO#t$RO#u$bO#v$SO#x$UO#z$WO#{$XO(aVO(r$YO(y#|O(z#}O~Oa(fX'z(fX'w(fX!k(fX!Y(fX!_(fX%i(fX!g(fX~P1qO#S$dO#`$eO$Q$eOP(gXR(gX[(gXj(gXr(gX!Q(gX!S(gX!](gX!l(gX!p(gX#R(gX#n(gX#o(gX#p(gX#q(gX#r(gX#s(gX#t(gX#u(gX#v(gX#x(gX#z(gX#{(gX(a(gX(r(gX(y(gX(z(gX!_(gX%i(gX~Oa(gX'z(gX'w(gX!Y(gX!k(gXv(gX!g(gX~P4UO#`$eO~O$]$hO$_$gO$f$mO~OSfO!_$nO$i$oO$k$qO~Oh%VOj%dOk%dOp%WOr%XOs$tOt$tOz%YO|%ZO!O%]O!S${O!_$|O!i%bO!l$xO#j%cO$W%`O$t%^O$v%_O$y%aO(T$sO(VTO(YUO(a$uO(y$}O(z%POg(^P~Ol%[O~P7eO!l%eO~O!S%hO!_%iO(T%gO~O!g%mO~Oa%nO'z%nO~O!Q%rO~P%[O(U!lO~P%[O%n%vO~P%[Oh%VO!l%eO(T%gO(U!lO~Oe%}O!l%eO(T%gO~Oj$RO~O!_&PO(T%gO(U!lO(VTO(YUO`)WP~O!Q&SO!l&RO%j&VO&T&WO~P;SO!x#sO~O%s&YO!S)SX!_)SX(T)SX~O(T&ZO~Ol!PO!u&`O%j!QO%l!OO%m!OO%n!OO%q!RO%s!SO%v!TO%w!TO~Od&eOe&dO!x&bO%h&cO%{&aO~P<bOd&hOeyOl!PO!_&gO!u&`O!xxO!|]O%h}O%l!OO%m!OO%n!OO%q!RO%s!SO%v!TO%w!TO%y!UO~Ob&kO#`&nO%j&iO(U!lO~P=gO!l&oO!u&sO~O!l#oO~O!_XO~Oa%nO'x&{O'z%nO~Oa%nO'x'OO'z%nO~Oa%nO'x'QO'z%nO~O'w]X!Y]Xv]X!k]X&[]X!_]X%i]X!g]X~P(qO!b'_O!c'WO!d'WO(U!lO(VTO(YUO~Os'UO!S'TO!['XO(e'SO!^(iP!^(xP~P@nOn'bO!_'`O(T%gO~Oe'gO!l%eO(T%gO~O!Q&SO!l&RO~Os!nO!S!oO!|<VO#T!pO#U!pO#W!pO#X!pO(U!lO(VTO(YUO(e!mO(o!sO~O!b'mO!c'lO!d'lO#V!pO#['nO#]'nO~PBYOa%nOh%VO!g#vO!l%eO'z%nO(r'pO~O!p'tO#`'rO~PChOs!nO!S!oO(VTO(YUO(e!mO(o!sO~O!_XOs(mX!S(mX!b(mX!c(mX!d(mX!|(mX#T(mX#U(mX#V(mX#W(mX#X(mX#[(mX#](mX(U(mX(V(mX(Y(mX(e(mX(o(mX~O!c'lO!d'lO(U!lO~PDWO(P'xO(Q'xO(R'zO~O_!}O(V'|O(W!}O(X'|O~O_#QO(X'|O(Y'|O(Z#QO~Ov(OO~P%[Ox#SO!U#TO(b#TO(c(RO~O![(TO!Y'WX!Y'^X!]'WX!]'^X~P+}O!](VO!Y(hX~OP$[OR#zO[$cOj$ROr$aO!Q#yO!S#{O!](VO!l#xO!p$[O#R$RO#n$OO#o$PO#p$PO#q$PO#r$QO#s$RO#t$RO#u$bO#v$SO#x$UO#z$WO#{$XO(aVO(r$YO(y#|O(z#}O~O!Y(hX~PHRO!Y([O~O!Y(uX!](uX!g(uX!k(uX(r(uX~O#`(uX#k#dX!^(uX~PJUO#`(]O!Y(wX!](wX~O!](^O!Y(vX~O!Y(aO~O#`$eO~PJUO!^(bO~P`OR#zO!Q#yO!S#{O!l#xO(aVOP!na[!naj!nar!na!]!na!p!na#R!na#n!na#o!na#p!na#q!na#r!na#s!na#t!na#u!na#v!na#x!na#z!na#{!na(r!na(y!na(z!na~Oa!na'z!na'w!na!Y!na!k!nav!na!_!na%i!na!g!na~PKlO!k(cO~O!g#vO#`(dO(r'pO!](tXa(tX'z(tX~O!k(tX~PNXO!S%hO!_%iO!|]O#i(iO#j(hO(T%gO~O!](jO!k(sX~O!k(lO~O!S%hO!_%iO#j(hO(T%gO~OP(gXR(gX[(gXj(gXr(gX!Q(gX!S(gX!](gX!l(gX!p(gX#R(gX#n(gX#o(gX#p(gX#q(gX#r(gX#s(gX#t(gX#u(gX#v(gX#x(gX#z(gX#{(gX(a(gX(r(gX(y(gX(z(gX~O!g#vO!k(gX~P! uOR(nO!Q(mO!l#xO#S$dO!|!{a!S!{a~O!x!{a%h!{a!_!{a#i!{a#j!{a(T!{a~P!#vO!x(rO~OPYOQYOSfOd!jOe!iOpkOrYOskOtkOzkO|YO!OYO!SWO!WkO!XkO!_XO!iuO!lZO!oYO!pYO!qYO!svO!u!gO!x!hO$W!kO$niO(T!dO(VTO(YUO(aVO(o[O~Oh%VOp%WOr%XOs$tOt$tOz%YO|%ZO!O<sO!S${O!_$|O!i>VO!l$xO#j<yO$W%`O$t<uO$v<wO$y%aO(T(vO(VTO(YUO(a$uO(y$}O(z%PO~O#k(xO~O![(zO!k(kP~P%[O(e(|O(o[O~O!S)OO!l#xO(e(|O(o[O~OP<UOQ<UOSfOd>ROe!iOpkOr<UOskOtkOzkO|<UO!O<UO!SWO!WkO!XkO!_!eO!i<XO!lZO!o<UO!p<UO!q<UO!s<YO!u<]O!x!hO$W!kO$n>PO(T)]O(VTO(YUO(aVO(o[O~O!]$_Oa$qa'z$qa'w$qa!k$qa!Y$qa!_$qa%i$qa!g$qa~Ol)dO~P!&zOh%VOp%WOr%XOs$tOt$tOz%YO|%ZO!O%]O!S${O!_$|O!i%bO!l$xO#j%cO$W%`O$t%^O$v%_O$y%aO(T(vO(VTO(YUO(a$uO(y$}O(z%PO~Og(pP~P!,TO!Q)iO!g)hO!_$^X$Z$^X$]$^X$_$^X$f$^X~O!g)hO!_({X$Z({X$]({X$_({X$f({X~O!Q)iO~P!.^O!Q)iO!_({X$Z({X$]({X$_({X$f({X~O!_)kO$Z)oO$])jO$_)jO$f)pO~O![)sO~P!)[O$]$hO$_$gO$f)wO~On$zX!Q$zX#S$zX'y$zX(y$zX(z$zX~OgmXg$zXnmX!]mX#`mX~P!0SOx)yO(b)zO(c)|O~On*VO!Q*OO'y*PO(y$}O(z%PO~Og)}O~P!1WOg*WO~Oh%VOr%XOs$tOt$tOz%YO|%ZO!O<sO!S*YO!_*ZO!i>VO!l$xO#j<yO$W%`O$t<uO$v<wO$y%aO(VTO(YUO(a$uO(y$}O(z%PO~Op*`O![*^O(T*XO!k)OP~P!1uO#k*aO~O!l*bO~Oh%VOp%WOr%XOs$tOt$tOz%YO|%ZO!O<sO!S${O!_$|O!i>VO!l$xO#j<yO$W%`O$t<uO$v<wO$y%aO(T*dO(VTO(YUO(a$uO(y$}O(z%PO~O![*gO!Y)PP~P!3tOr*sOs!nO!S*iO!b*qO!c*kO!d*kO!l*bO#[*rO%`*mO(U!lO(VTO(YUO(e!mO~O!^*pO~P!5iO#S$dOn(`X!Q(`X'y(`X(y(`X(z(`X!](`X#`(`X~Og(`X$O(`X~P!6kOn*xO#`*wOg(_X!](_X~O!]*yOg(^X~Oj%dOk%dOl%dO(T&ZOg(^P~Os*|O~Og)}O(T&ZO~O!l+SO~O(T(vO~Op+WO!S%hO![#iO!_%iO!|]O#i#lO#j#iO(T%gO!k(sP~O!g#vO#k+XO~O!S%hO![+ZO!](^O!_%iO(T%gO!Y(vP~Os'[O!S+]O![+[O(VTO(YUO(e(|O~O!^(xP~P!9|O!]+^Oa)TX'z)TX~OP$[OR#zO[$cOj$ROr$aO!Q#yO!S#{O!l#xO!p$[O#R$RO#n$OO#o$PO#p$PO#q$PO#r$QO#s$RO#t$RO#u$bO#v$SO#x$UO#z$WO#{$XO(aVO(r$YO(y#|O(z#}O~Oa!ja!]!ja'z!ja'w!ja!Y!ja!k!jav!ja!_!ja%i!ja!g!ja~P!:tOR#zO!Q#yO!S#{O!l#xO(aVOP!ra[!raj!rar!ra!]!ra!p!ra#R!ra#n!ra#o!ra#p!ra#q!ra#r!ra#s!ra#t!ra#u!ra#v!ra#x!ra#z!ra#{!ra(r!ra(y!ra(z!ra~Oa!ra'z!ra'w!ra!Y!ra!k!rav!ra!_!ra%i!ra!g!ra~P!=[OR#zO!Q#yO!S#{O!l#xO(aVOP!ta[!taj!tar!ta!]!ta!p!ta#R!ta#n!ta#o!ta#p!ta#q!ta#r!ta#s!ta#t!ta#u!ta#v!ta#x!ta#z!ta#{!ta(r!ta(y!ta(z!ta~Oa!ta'z!ta'w!ta!Y!ta!k!tav!ta!_!ta%i!ta!g!ta~P!?rOh%VOn+gO!_'`O%i+fO~O!g+iOa(]X!_(]X'z(]X!](]X~Oa%nO!_XO'z%nO~Oh%VO!l%eO~Oh%VO!l%eO(T%gO~O!g#vO#k(xO~Ob+tO%j+uO(T+qO(VTO(YUO!^)XP~O!]+vO`)WX~O[+zO~O`+{O~O!_&PO(T%gO(U!lO`)WP~O%j,OO~P;SOh%VO#`,SO~Oh%VOn,VO!_$|O~O!_,XO~O!Q,ZO!_XO~O%n%vO~O!x,`O~Oe,eO~Ob,fO(T#nO(VTO(YUO!^)VP~Oe%}O~O%j!QO(T&ZO~P=gO[,kO`,jO~OPYOQYOSfOdzOeyOpkOrYOskOtkOzkO|YO!OYO!SWO!WkO!XkO!iuO!lZO!oYO!pYO!qYO!svO!xxO!|]O$niO%h}O(VTO(YUO(aVO(o[O~O!_!eO!u!gO$W!kO(T!dO~P!FyO`,jOa%nO'z%nO~OPYOQYOSfOd!jOe!iOpkOrYOskOtkOzkO|YO!OYO!SWO!WkO!XkO!_!eO!iuO!lZO!oYO!pYO!qYO!svO!x!hO$W!kO$niO(T!dO(VTO(YUO(aVO(o[O~Oa,pOl!OO!uwO%l!OO%m!OO%n!OO~P!IcO!l&oO~O&^,vO~O!_,xO~O&o,zO&q,{OP&laQ&laS&laY&laa&lad&lae&lal&lap&lar&las&lat&laz&la|&la!O&la!S&la!W&la!X&la!_&la!i&la!l&la!o&la!p&la!q&la!s&la!u&la!x&la!|&la$W&la$n&la%h&la%j&la%l&la%m&la%n&la%q&la%s&la%v&la%w&la%y&la&W&la&^&la&`&la&b&la&d&la&g&la&m&la&s&la&u&la&w&la&y&la&{&la'w&la(T&la(V&la(Y&la(a&la(o&la!^&la&e&lab&la&j&la~O(T-QO~Oh!eX!]!RX!^!RX!g!RX!g!eX!l!eX#`!RX~O!]!eX!^!eX~P#!iO!g-VO#`-UOh(jX!]#hX!^#hX!g(jX!l(jX~O!](jX!^(jX~P##[Oh%VO!g-XO!l%eO!]!aX!^!aX~Os!nO!S!oO(VTO(YUO(e!mO~OP<UOQ<UOSfOd>ROe!iOpkOr<UOskOtkOzkO|<UO!O<UO!SWO!WkO!XkO!_!eO!i<XO!lZO!o<UO!p<UO!q<UO!s<YO!u<]O!x!hO$W!kO$n>PO(VTO(YUO(aVO(o[O~O(T=QO~P#$qO!]-]O!^(iX~O!^-_O~O!g-VO#`-UO!]#hX!^#hX~O!]-`O!^(xX~O!^-bO~O!c-cO!d-cO(U!lO~P#$`O!^-fO~P'_On-iO!_'`O~O!Y-nO~Os!{a!b!{a!c!{a!d!{a#T!{a#U!{a#V!{a#W!{a#X!{a#[!{a#]!{a(U!{a(V!{a(Y!{a(e!{a(o!{a~P!#vO!p-sO#`-qO~PChO!c-uO!d-uO(U!lO~PDWOa%nO#`-qO'z%nO~Oa%nO!g#vO#`-qO'z%nO~Oa%nO!g#vO!p-sO#`-qO'z%nO(r'pO~O(P'xO(Q'xO(R-zO~Ov-{O~O!Y'Wa!]'Wa~P!:tO![.PO!Y'WX!]'WX~P%[O!](VO!Y(ha~O!Y(ha~PHRO!](^O!Y(va~O!S%hO![.TO!_%iO(T%gO!Y'^X!]'^X~O#`.VO!](ta!k(taa(ta'z(ta~O!g#vO~P#,wO!](jO!k(sa~O!S%hO!_%iO#j.ZO(T%gO~Op.`O!S%hO![.]O!_%iO!|]O#i._O#j.]O(T%gO!]'aX!k'aX~OR.dO!l#xO~Oh%VOn.gO!_'`O%i.fO~Oa#ci!]#ci'z#ci'w#ci!Y#ci!k#civ#ci!_#ci%i#ci!g#ci~P!:tOn>]O!Q*OO'y*PO(y$}O(z%PO~O#k#_aa#_a#`#_a'z#_a!]#_a!k#_a!_#_a!Y#_a~P#/sO#k(`XP(`XR(`X[(`Xa(`Xj(`Xr(`X!S(`X!l(`X!p(`X#R(`X#n(`X#o(`X#p(`X#q(`X#r(`X#s(`X#t(`X#u(`X#v(`X#x(`X#z(`X#{(`X'z(`X(a(`X(r(`X!k(`X!Y(`X'w(`Xv(`X!_(`X%i(`X!g(`X~P!6kO!].tO!k(kX~P!:tO!k.wO~O!Y.yO~OP$[OR#zO!Q#yO!S#{O!l#xO!p$[O(aVO[#mia#mij#mir#mi!]#mi#R#mi#o#mi#p#mi#q#mi#r#mi#s#mi#t#mi#u#mi#v#mi#x#mi#z#mi#{#mi'z#mi(r#mi(y#mi(z#mi'w#mi!Y#mi!k#miv#mi!_#mi%i#mi!g#mi~O#n#mi~P#3cO#n$OO~P#3cOP$[OR#zOr$aO!Q#yO!S#{O!l#xO!p$[O#n$OO#o$PO#p$PO#q$PO(aVO[#mia#mij#mi!]#mi#R#mi#s#mi#t#mi#u#mi#v#mi#x#mi#z#mi#{#mi'z#mi(r#mi(y#mi(z#mi'w#mi!Y#mi!k#miv#mi!_#mi%i#mi!g#mi~O#r#mi~P#6QO#r$QO~P#6QOP$[OR#zO[$cOj$ROr$aO!Q#yO!S#{O!l#xO!p$[O#R$RO#n$OO#o$PO#p$PO#q$PO#r$QO#s$RO#t$RO#u$bO(aVOa#mi!]#mi#x#mi#z#mi#{#mi'z#mi(r#mi(y#mi(z#mi'w#mi!Y#mi!k#miv#mi!_#mi%i#mi!g#mi~O#v#mi~P#8oOP$[OR#zO[$cOj$ROr$aO!Q#yO!S#{O!l#xO!p$[O#R$RO#n$OO#o$PO#p$PO#q$PO#r$QO#s$RO#t$RO#u$bO#v$SO(aVO(z#}Oa#mi!]#mi#z#mi#{#mi'z#mi(r#mi(y#mi'w#mi!Y#mi!k#miv#mi!_#mi%i#mi!g#mi~O#x$UO~P#;VO#x#mi~P#;VO#v$SO~P#8oOP$[OR#zO[$cOj$ROr$aO!Q#yO!S#{O!l#xO!p$[O#R$RO#n$OO#o$PO#p$PO#q$PO#r$QO#s$RO#t$RO#u$bO#v$SO#x$UO(aVO(y#|O(z#}Oa#mi!]#mi#{#mi'z#mi(r#mi'w#mi!Y#mi!k#miv#mi!_#mi%i#mi!g#mi~O#z#mi~P#={O#z$WO~P#={OP]XR]X[]Xj]Xr]X!Q]X!S]X!l]X!p]X#R]X#S]X#`]X#kfX#n]X#o]X#p]X#q]X#r]X#s]X#t]X#u]X#v]X#x]X#z]X#{]X$Q]X(a]X(r]X(y]X(z]X!]]X!^]X~O$O]X~P#@jOP$[OR#zO[<mOj<bOr<kO!Q#yO!S#{O!l#xO!p$[O#R<bO#n<_O#o<`O#p<`O#q<`O#r<aO#s<bO#t<bO#u<lO#v<cO#x<eO#z<gO#{<hO(aVO(r$YO(y#|O(z#}O~O$O.{O~P#BwO#S$dO#`<nO$Q<nO$O(gX!^(gX~P! uOa'da!]'da'z'da'w'da!k'da!Y'dav'da!_'da%i'da!g'da~P!:tO[#mia#mij#mir#mi!]#mi#R#mi#r#mi#s#mi#t#mi#u#mi#v#mi#x#mi#z#mi#{#mi'z#mi(r#mi'w#mi!Y#mi!k#miv#mi!_#mi%i#mi!g#mi~OP$[OR#zO!Q#yO!S#{O!l#xO!p$[O#n$OO#o$PO#p$PO#q$PO(aVO(y#mi(z#mi~P#EyOn>]O!Q*OO'y*PO(y$}O(z%POP#miR#mi!S#mi!l#mi!p#mi#n#mi#o#mi#p#mi#q#mi(a#mi~P#EyO!]/POg(pX~P!1WOg/RO~Oa$Pi!]$Pi'z$Pi'w$Pi!Y$Pi!k$Piv$Pi!_$Pi%i$Pi!g$Pi~P!:tO$]/SO$_/SO~O$]/TO$_/TO~O!g)hO#`/UO!_$cX$Z$cX$]$cX$_$cX$f$cX~O![/VO~O!_)kO$Z/XO$])jO$_)jO$f/YO~O!]<iO!^(fX~P#BwO!^/ZO~O!g)hO$f({X~O$f/]O~Ov/^O~P!&zOx)yO(b)zO(c/aO~O!S/dO~O(y$}On%aa!Q%aa'y%aa(z%aa!]%aa#`%aa~Og%aa$O%aa~P#L{O(z%POn%ca!Q%ca'y%ca(y%ca!]%ca#`%ca~Og%ca$O%ca~P#MnO!]fX!gfX!kfX!k$zX(rfX~P!0SOp%WO![/mO!](^O(T/lO!Y(vP!Y)PP~P!1uOr*sO!b*qO!c*kO!d*kO!l*bO#[*rO%`*mO(U!lO(VTO(YUO~Os<}O!S/nO![+[O!^*pO(e<|O!^(xP~P$ [O!k/oO~P#/sO!]/pO!g#vO(r'pO!k)OX~O!k/uO~OnoX!QoX'yoX(yoX(zoX~O!g#vO!koX~P$#OOp/wO!S%hO![*^O!_%iO(T%gO!k)OP~O#k/xO~O!Y$zX!]$zX!g%RX~P!0SO!]/yO!Y)PX~P#/sO!g/{O~O!Y/}O~OpkO(T0OO~P.iOh%VOr0TO!g#vO!l%eO(r'pO~O!g+iO~Oa%nO!]0XO'z%nO~O!^0ZO~P!5iO!c0[O!d0[O(U!lO~P#$`Os!nO!S0]O(VTO(YUO(e!mO~O#[0_O~Og%aa!]%aa#`%aa$O%aa~P!1WOg%ca!]%ca#`%ca$O%ca~P!1WOj%dOk%dOl%dO(T&ZOg'mX!]'mX~O!]*yOg(^a~Og0hO~On0jO#`0iOg(_a!](_a~OR0kO!Q0kO!S0lO#S$dOn}a'y}a(y}a(z}a!]}a#`}a~Og}a$O}a~P$(cO!Q*OO'y*POn$sa(y$sa(z$sa!]$sa#`$sa~Og$sa$O$sa~P$)_O!Q*OO'y*POn$ua(y$ua(z$ua!]$ua#`$ua~Og$ua$O$ua~P$*QO#k0oO~Og%Ta!]%Ta#`%Ta$O%Ta~P!1WO!g#vO~O#k0rO~O!]+^Oa)Ta'z)Ta~OR#zO!Q#yO!S#{O!l#xO(aVOP!ri[!rij!rir!ri!]!ri!p!ri#R!ri#n!ri#o!ri#p!ri#q!ri#r!ri#s!ri#t!ri#u!ri#v!ri#x!ri#z!ri#{!ri(r!ri(y!ri(z!ri~Oa!ri'z!ri'w!ri!Y!ri!k!riv!ri!_!ri%i!ri!g!ri~P$+oOh%VOr%XOs$tOt$tOz%YO|%ZO!O<sO!S${O!_$|O!i>VO!l$xO#j<yO$W%`O$t<uO$v<wO$y%aO(VTO(YUO(a$uO(y$}O(z%PO~Op0{O%]0|O(T0zO~P$.VO!g+iOa(]a!_(]a'z(]a!](]a~O#k1SO~O[]X!]fX!^fX~O!]1TO!^)XX~O!^1VO~O[1WO~Ob1YO(T+qO(VTO(YUO~O!_&PO(T%gO`'uX!]'uX~O!]+vO`)Wa~O!k1]O~P!:tO[1`O~O`1aO~O#`1fO~On1iO!_$|O~O(e(|O!^)UP~Oh%VOn1rO!_1oO%i1qO~O[1|O!]1zO!^)VX~O!^1}O~O`2POa%nO'z%nO~O(T#nO(VTO(YUO~O#S$dO#`$eO$Q$eOP(gXR(gX[(gXr(gX!Q(gX!S(gX!](gX!l(gX!p(gX#R(gX#n(gX#o(gX#p(gX#q(gX#r(gX#s(gX#t(gX#u(gX#v(gX#x(gX#z(gX#{(gX(a(gX(r(gX(y(gX(z(gX~Oj2SO&[2TOa(gX~P$3pOj2SO#`$eO&[2TO~Oa2VO~P%[Oa2XO~O&e2[OP&ciQ&ciS&ciY&cia&cid&cie&cil&cip&cir&cis&cit&ciz&ci|&ci!O&ci!S&ci!W&ci!X&ci!_&ci!i&ci!l&ci!o&ci!p&ci!q&ci!s&ci!u&ci!x&ci!|&ci$W&ci$n&ci%h&ci%j&ci%l&ci%m&ci%n&ci%q&ci%s&ci%v&ci%w&ci%y&ci&W&ci&^&ci&`&ci&b&ci&d&ci&g&ci&m&ci&s&ci&u&ci&w&ci&y&ci&{&ci'w&ci(T&ci(V&ci(Y&ci(a&ci(o&ci!^&cib&ci&j&ci~Ob2bO!^2`O&j2aO~P`O!_XO!l2dO~O&q,{OP&liQ&liS&liY&lia&lid&lie&lil&lip&lir&lis&lit&liz&li|&li!O&li!S&li!W&li!X&li!_&li!i&li!l&li!o&li!p&li!q&li!s&li!u&li!x&li!|&li$W&li$n&li%h&li%j&li%l&li%m&li%n&li%q&li%s&li%v&li%w&li%y&li&W&li&^&li&`&li&b&li&d&li&g&li&m&li&s&li&u&li&w&li&y&li&{&li'w&li(T&li(V&li(Y&li(a&li(o&li!^&li&e&lib&li&j&li~O!Y2jO~O!]!aa!^!aa~P#BwOs!nO!S!oO![2pO(e!mO!]'XX!^'XX~P@nO!]-]O!^(ia~O!]'_X!^'_X~P!9|O!]-`O!^(xa~O!^2wO~P'_Oa%nO#`3QO'z%nO~Oa%nO!g#vO#`3QO'z%nO~Oa%nO!g#vO!p3UO#`3QO'z%nO(r'pO~Oa%nO'z%nO~P!:tO!]$_Ov$qa~O!Y'Wi!]'Wi~P!:tO!](VO!Y(hi~O!](^O!Y(vi~O!Y(wi!](wi~P!:tO!](ti!k(tia(ti'z(ti~P!:tO#`3WO!](ti!k(tia(ti'z(ti~O!](jO!k(si~O!S%hO!_%iO!|]O#i3]O#j3[O(T%gO~O!S%hO!_%iO#j3[O(T%gO~On3dO!_'`O%i3cO~Oh%VOn3dO!_'`O%i3cO~O#k%aaP%aaR%aa[%aaa%aaj%aar%aa!S%aa!l%aa!p%aa#R%aa#n%aa#o%aa#p%aa#q%aa#r%aa#s%aa#t%aa#u%aa#v%aa#x%aa#z%aa#{%aa'z%aa(a%aa(r%aa!k%aa!Y%aa'w%aav%aa!_%aa%i%aa!g%aa~P#L{O#k%caP%caR%ca[%caa%caj%car%ca!S%ca!l%ca!p%ca#R%ca#n%ca#o%ca#p%ca#q%ca#r%ca#s%ca#t%ca#u%ca#v%ca#x%ca#z%ca#{%ca'z%ca(a%ca(r%ca!k%ca!Y%ca'w%cav%ca!_%ca%i%ca!g%ca~P#MnO#k%aaP%aaR%aa[%aaa%aaj%aar%aa!S%aa!]%aa!l%aa!p%aa#R%aa#n%aa#o%aa#p%aa#q%aa#r%aa#s%aa#t%aa#u%aa#v%aa#x%aa#z%aa#{%aa'z%aa(a%aa(r%aa!k%aa!Y%aa'w%aa#`%aav%aa!_%aa%i%aa!g%aa~P#/sO#k%caP%caR%ca[%caa%caj%car%ca!S%ca!]%ca!l%ca!p%ca#R%ca#n%ca#o%ca#p%ca#q%ca#r%ca#s%ca#t%ca#u%ca#v%ca#x%ca#z%ca#{%ca'z%ca(a%ca(r%ca!k%ca!Y%ca'w%ca#`%cav%ca!_%ca%i%ca!g%ca~P#/sO#k}aP}a[}aa}aj}ar}a!l}a!p}a#R}a#n}a#o}a#p}a#q}a#r}a#s}a#t}a#u}a#v}a#x}a#z}a#{}a'z}a(a}a(r}a!k}a!Y}a'w}av}a!_}a%i}a!g}a~P$(cO#k$saP$saR$sa[$saa$saj$sar$sa!S$sa!l$sa!p$sa#R$sa#n$sa#o$sa#p$sa#q$sa#r$sa#s$sa#t$sa#u$sa#v$sa#x$sa#z$sa#{$sa'z$sa(a$sa(r$sa!k$sa!Y$sa'w$sav$sa!_$sa%i$sa!g$sa~P$)_O#k$uaP$uaR$ua[$uaa$uaj$uar$ua!S$ua!l$ua!p$ua#R$ua#n$ua#o$ua#p$ua#q$ua#r$ua#s$ua#t$ua#u$ua#v$ua#x$ua#z$ua#{$ua'z$ua(a$ua(r$ua!k$ua!Y$ua'w$uav$ua!_$ua%i$ua!g$ua~P$*QO#k%TaP%TaR%Ta[%Taa%Taj%Tar%Ta!S%Ta!]%Ta!l%Ta!p%Ta#R%Ta#n%Ta#o%Ta#p%Ta#q%Ta#r%Ta#s%Ta#t%Ta#u%Ta#v%Ta#x%Ta#z%Ta#{%Ta'z%Ta(a%Ta(r%Ta!k%Ta!Y%Ta'w%Ta#`%Tav%Ta!_%Ta%i%Ta!g%Ta~P#/sOa#cq!]#cq'z#cq'w#cq!Y#cq!k#cqv#cq!_#cq%i#cq!g#cq~P!:tO![3lO!]'YX!k'YX~P%[O!].tO!k(ka~O!].tO!k(ka~P!:tO!Y3oO~O$O!na!^!na~PKlO$O!ja!]!ja!^!ja~P#BwO$O!ra!^!ra~P!=[O$O!ta!^!ta~P!?rOg']X!]']X~P!,TO!]/POg(pa~OSfO!_4TO$d4UO~O!^4YO~Ov4ZO~P#/sOa$mq!]$mq'z$mq'w$mq!Y$mq!k$mqv$mq!_$mq%i$mq!g$mq~P!:tO!Y4]O~P!&zO!S4^O~O!Q*OO'y*PO(z%POn'ia(y'ia!]'ia#`'ia~Og'ia$O'ia~P%-fO!Q*OO'y*POn'ka(y'ka(z'ka!]'ka#`'ka~Og'ka$O'ka~P%.XO(r$YO~P#/sO!YfX!Y$zX!]fX!]$zX!g%RX#`fX~P!0SOp%WO(T=WO~P!1uOp4bO!S%hO![4aO!_%iO(T%gO!]'eX!k'eX~O!]/pO!k)Oa~O!]/pO!g#vO!k)Oa~O!]/pO!g#vO(r'pO!k)Oa~Og$|i!]$|i#`$|i$O$|i~P!1WO![4jO!Y'gX!]'gX~P!3tO!]/yO!Y)Pa~O!]/yO!Y)Pa~P#/sOP]XR]X[]Xj]Xr]X!Q]X!S]X!Y]X!]]X!l]X!p]X#R]X#S]X#`]X#kfX#n]X#o]X#p]X#q]X#r]X#s]X#t]X#u]X#v]X#x]X#z]X#{]X$Q]X(a]X(r]X(y]X(z]X~Oj%YX!g%YX~P%2OOj4oO!g#vO~Oh%VO!g#vO!l%eO~Oh%VOr4tO!l%eO(r'pO~Or4yO!g#vO(r'pO~Os!nO!S4zO(VTO(YUO(e!mO~O(y$}On%ai!Q%ai'y%ai(z%ai!]%ai#`%ai~Og%ai$O%ai~P%5oO(z%POn%ci!Q%ci'y%ci(y%ci!]%ci#`%ci~Og%ci$O%ci~P%6bOg(_i!](_i~P!1WO#`5QOg(_i!](_i~P!1WO!k5VO~Oa$oq!]$oq'z$oq'w$oq!Y$oq!k$oqv$oq!_$oq%i$oq!g$oq~P!:tO!Y5ZO~O!]5[O!_)QX~P#/sOa$zX!_$zX%^]X'z$zX!]$zX~P!0SO%^5_OaoX!_oX'zoX!]oX~P$#OOp5`O(T#nO~O%^5_O~Ob5fO%j5gO(T+qO(VTO(YUO!]'tX!^'tX~O!]1TO!^)Xa~O[5kO~O`5lO~O[5pO~Oa%nO'z%nO~P#/sO!]5uO#`5wO!^)UX~O!^5xO~Or6OOs!nO!S*iO!b!yO!c!vO!d!vO!|<VO#T!pO#U!pO#V!pO#W!pO#X!pO#[5}O#]!zO(U!lO(VTO(YUO(e!mO(o!sO~O!^5|O~P%;eOn6TO!_1oO%i6SO~Oh%VOn6TO!_1oO%i6SO~Ob6[O(T#nO(VTO(YUO!]'sX!^'sX~O!]1zO!^)Va~O(VTO(YUO(e6^O~O`6bO~Oj6eO&[6fO~PNXO!k6gO~P%[Oa6iO~Oa6iO~P%[Ob2bO!^6nO&j2aO~P`O!g6pO~O!g6rOh(ji!](ji!^(ji!g(ji!l(jir(ji(r(ji~O!]#hi!^#hi~P#BwO#`6sO!]#hi!^#hi~O!]!ai!^!ai~P#BwOa%nO#`6|O'z%nO~Oa%nO!g#vO#`6|O'z%nO~O!](tq!k(tqa(tq'z(tq~P!:tO!](jO!k(sq~O!S%hO!_%iO#j7TO(T%gO~O!_'`O%i7WO~On7[O!_'`O%i7WO~O#k'iaP'iaR'ia['iaa'iaj'iar'ia!S'ia!l'ia!p'ia#R'ia#n'ia#o'ia#p'ia#q'ia#r'ia#s'ia#t'ia#u'ia#v'ia#x'ia#z'ia#{'ia'z'ia(a'ia(r'ia!k'ia!Y'ia'w'iav'ia!_'ia%i'ia!g'ia~P%-fO#k'kaP'kaR'ka['kaa'kaj'kar'ka!S'ka!l'ka!p'ka#R'ka#n'ka#o'ka#p'ka#q'ka#r'ka#s'ka#t'ka#u'ka#v'ka#x'ka#z'ka#{'ka'z'ka(a'ka(r'ka!k'ka!Y'ka'w'kav'ka!_'ka%i'ka!g'ka~P%.XO#k$|iP$|iR$|i[$|ia$|ij$|ir$|i!S$|i!]$|i!l$|i!p$|i#R$|i#n$|i#o$|i#p$|i#q$|i#r$|i#s$|i#t$|i#u$|i#v$|i#x$|i#z$|i#{$|i'z$|i(a$|i(r$|i!k$|i!Y$|i'w$|i#`$|iv$|i!_$|i%i$|i!g$|i~P#/sO#k%aiP%aiR%ai[%aia%aij%air%ai!S%ai!l%ai!p%ai#R%ai#n%ai#o%ai#p%ai#q%ai#r%ai#s%ai#t%ai#u%ai#v%ai#x%ai#z%ai#{%ai'z%ai(a%ai(r%ai!k%ai!Y%ai'w%aiv%ai!_%ai%i%ai!g%ai~P%5oO#k%ciP%ciR%ci[%cia%cij%cir%ci!S%ci!l%ci!p%ci#R%ci#n%ci#o%ci#p%ci#q%ci#r%ci#s%ci#t%ci#u%ci#v%ci#x%ci#z%ci#{%ci'z%ci(a%ci(r%ci!k%ci!Y%ci'w%civ%ci!_%ci%i%ci!g%ci~P%6bO!]'Ya!k'Ya~P!:tO!].tO!k(ki~O$O#ci!]#ci!^#ci~P#BwOP$[OR#zO!Q#yO!S#{O!l#xO!p$[O(aVO[#mij#mir#mi#R#mi#o#mi#p#mi#q#mi#r#mi#s#mi#t#mi#u#mi#v#mi#x#mi#z#mi#{#mi$O#mi(r#mi(y#mi(z#mi!]#mi!^#mi~O#n#mi~P%NdO#n<_O~P%NdOP$[OR#zOr<kO!Q#yO!S#{O!l#xO!p$[O#n<_O#o<`O#p<`O#q<`O(aVO[#mij#mi#R#mi#s#mi#t#mi#u#mi#v#mi#x#mi#z#mi#{#mi$O#mi(r#mi(y#mi(z#mi!]#mi!^#mi~O#r#mi~P&!lO#r<aO~P&!lOP$[OR#zO[<mOj<bOr<kO!Q#yO!S#{O!l#xO!p$[O#R<bO#n<_O#o<`O#p<`O#q<`O#r<aO#s<bO#t<bO#u<lO(aVO#x#mi#z#mi#{#mi$O#mi(r#mi(y#mi(z#mi!]#mi!^#mi~O#v#mi~P&$tOP$[OR#zO[<mOj<bOr<kO!Q#yO!S#{O!l#xO!p$[O#R<bO#n<_O#o<`O#p<`O#q<`O#r<aO#s<bO#t<bO#u<lO#v<cO(aVO(z#}O#z#mi#{#mi$O#mi(r#mi(y#mi!]#mi!^#mi~O#x<eO~P&&uO#x#mi~P&&uO#v<cO~P&$tOP$[OR#zO[<mOj<bOr<kO!Q#yO!S#{O!l#xO!p$[O#R<bO#n<_O#o<`O#p<`O#q<`O#r<aO#s<bO#t<bO#u<lO#v<cO#x<eO(aVO(y#|O(z#}O#{#mi$O#mi(r#mi!]#mi!^#mi~O#z#mi~P&)UO#z<gO~P&)UOa#|y!]#|y'z#|y'w#|y!Y#|y!k#|yv#|y!_#|y%i#|y!g#|y~P!:tO[#mij#mir#mi#R#mi#r#mi#s#mi#t#mi#u#mi#v#mi#x#mi#z#mi#{#mi$O#mi(r#mi!]#mi!^#mi~OP$[OR#zO!Q#yO!S#{O!l#xO!p$[O#n<_O#o<`O#p<`O#q<`O(aVO(y#mi(z#mi~P&,QOn>^O!Q*OO'y*PO(y$}O(z%POP#miR#mi!S#mi!l#mi!p#mi#n#mi#o#mi#p#mi#q#mi(a#mi~P&,QO#S$dOP(`XR(`X[(`Xj(`Xn(`Xr(`X!Q(`X!S(`X!l(`X!p(`X#R(`X#n(`X#o(`X#p(`X#q(`X#r(`X#s(`X#t(`X#u(`X#v(`X#x(`X#z(`X#{(`X$O(`X'y(`X(a(`X(r(`X(y(`X(z(`X!](`X!^(`X~O$O$Pi!]$Pi!^$Pi~P#BwO$O!ri!^!ri~P$+oOg']a!]']a~P!1WO!^7nO~O!]'da!^'da~P#BwO!Y7oO~P#/sO!g#vO(r'pO!]'ea!k'ea~O!]/pO!k)Oi~O!]/pO!g#vO!k)Oi~Og$|q!]$|q#`$|q$O$|q~P!1WO!Y'ga!]'ga~P#/sO!g7vO~O!]/yO!Y)Pi~P#/sO!]/yO!Y)Pi~O!Y7yO~Oh%VOr8OO!l%eO(r'pO~Oj8QO!g#vO~Or8TO!g#vO(r'pO~O!Q*OO'y*PO(z%POn'ja(y'ja!]'ja#`'ja~Og'ja$O'ja~P&5RO!Q*OO'y*POn'la(y'la(z'la!]'la#`'la~Og'la$O'la~P&5tOg(_q!](_q~P!1WO#`8VOg(_q!](_q~P!1WO!Y8WO~Og%Oq!]%Oq#`%Oq$O%Oq~P!1WOa$oy!]$oy'z$oy'w$oy!Y$oy!k$oyv$oy!_$oy%i$oy!g$oy~P!:tO!g6rO~O!]5[O!_)Qa~O!_'`OP$TaR$Ta[$Taj$Tar$Ta!Q$Ta!S$Ta!]$Ta!l$Ta!p$Ta#R$Ta#n$Ta#o$Ta#p$Ta#q$Ta#r$Ta#s$Ta#t$Ta#u$Ta#v$Ta#x$Ta#z$Ta#{$Ta(a$Ta(r$Ta(y$Ta(z$Ta~O%i7WO~P&8fO%^8[Oa%[i!_%[i'z%[i!]%[i~Oa#cy!]#cy'z#cy'w#cy!Y#cy!k#cyv#cy!_#cy%i#cy!g#cy~P!:tO[8^O~Ob8`O(T+qO(VTO(YUO~O!]1TO!^)Xi~O`8dO~O(e(|O!]'pX!^'pX~O!]5uO!^)Ua~O!^8nO~P%;eO(o!sO~P$&YO#[8oO~O!_1oO~O!_1oO%i8qO~On8tO!_1oO%i8qO~O[8yO!]'sa!^'sa~O!]1zO!^)Vi~O!k8}O~O!k9OO~O!k9RO~O!k9RO~P%[Oa9TO~O!g9UO~O!k9VO~O!](wi!^(wi~P#BwOa%nO#`9_O'z%nO~O!](ty!k(tya(ty'z(ty~P!:tO!](jO!k(sy~O%i9bO~P&8fO!_'`O%i9bO~O#k$|qP$|qR$|q[$|qa$|qj$|qr$|q!S$|q!]$|q!l$|q!p$|q#R$|q#n$|q#o$|q#p$|q#q$|q#r$|q#s$|q#t$|q#u$|q#v$|q#x$|q#z$|q#{$|q'z$|q(a$|q(r$|q!k$|q!Y$|q'w$|q#`$|qv$|q!_$|q%i$|q!g$|q~P#/sO#k'jaP'jaR'ja['jaa'jaj'jar'ja!S'ja!l'ja!p'ja#R'ja#n'ja#o'ja#p'ja#q'ja#r'ja#s'ja#t'ja#u'ja#v'ja#x'ja#z'ja#{'ja'z'ja(a'ja(r'ja!k'ja!Y'ja'w'jav'ja!_'ja%i'ja!g'ja~P&5RO#k'laP'laR'la['laa'laj'lar'la!S'la!l'la!p'la#R'la#n'la#o'la#p'la#q'la#r'la#s'la#t'la#u'la#v'la#x'la#z'la#{'la'z'la(a'la(r'la!k'la!Y'la'w'lav'la!_'la%i'la!g'la~P&5tO#k%OqP%OqR%Oq[%Oqa%Oqj%Oqr%Oq!S%Oq!]%Oq!l%Oq!p%Oq#R%Oq#n%Oq#o%Oq#p%Oq#q%Oq#r%Oq#s%Oq#t%Oq#u%Oq#v%Oq#x%Oq#z%Oq#{%Oq'z%Oq(a%Oq(r%Oq!k%Oq!Y%Oq'w%Oq#`%Oqv%Oq!_%Oq%i%Oq!g%Oq~P#/sO!]'Yi!k'Yi~P!:tO$O#cq!]#cq!^#cq~P#BwO(y$}OP%aaR%aa[%aaj%aar%aa!S%aa!l%aa!p%aa#R%aa#n%aa#o%aa#p%aa#q%aa#r%aa#s%aa#t%aa#u%aa#v%aa#x%aa#z%aa#{%aa$O%aa(a%aa(r%aa!]%aa!^%aa~On%aa!Q%aa'y%aa(z%aa~P&IyO(z%POP%caR%ca[%caj%car%ca!S%ca!l%ca!p%ca#R%ca#n%ca#o%ca#p%ca#q%ca#r%ca#s%ca#t%ca#u%ca#v%ca#x%ca#z%ca#{%ca$O%ca(a%ca(r%ca!]%ca!^%ca~On%ca!Q%ca'y%ca(y%ca~P&LQOn>^O!Q*OO'y*PO(z%PO~P&IyOn>^O!Q*OO'y*PO(y$}O~P&LQOR0kO!Q0kO!S0lO#S$dOP}a[}aj}an}ar}a!l}a!p}a#R}a#n}a#o}a#p}a#q}a#r}a#s}a#t}a#u}a#v}a#x}a#z}a#{}a$O}a'y}a(a}a(r}a(y}a(z}a!]}a!^}a~O!Q*OO'y*POP$saR$sa[$saj$san$sar$sa!S$sa!l$sa!p$sa#R$sa#n$sa#o$sa#p$sa#q$sa#r$sa#s$sa#t$sa#u$sa#v$sa#x$sa#z$sa#{$sa$O$sa(a$sa(r$sa(y$sa(z$sa!]$sa!^$sa~O!Q*OO'y*POP$uaR$ua[$uaj$uan$uar$ua!S$ua!l$ua!p$ua#R$ua#n$ua#o$ua#p$ua#q$ua#r$ua#s$ua#t$ua#u$ua#v$ua#x$ua#z$ua#{$ua$O$ua(a$ua(r$ua(y$ua(z$ua!]$ua!^$ua~On>^O!Q*OO'y*PO(y$}O(z%PO~OP%TaR%Ta[%Taj%Tar%Ta!S%Ta!l%Ta!p%Ta#R%Ta#n%Ta#o%Ta#p%Ta#q%Ta#r%Ta#s%Ta#t%Ta#u%Ta#v%Ta#x%Ta#z%Ta#{%Ta$O%Ta(a%Ta(r%Ta!]%Ta!^%Ta~P''VO$O$mq!]$mq!^$mq~P#BwO$O$oq!]$oq!^$oq~P#BwO!^9oO~O$O9pO~P!1WO!g#vO!]'ei!k'ei~O!g#vO(r'pO!]'ei!k'ei~O!]/pO!k)Oq~O!Y'gi!]'gi~P#/sO!]/yO!Y)Pq~Or9wO!g#vO(r'pO~O[9yO!Y9xO~P#/sO!Y9xO~Oj:PO!g#vO~Og(_y!](_y~P!1WO!]'na!_'na~P#/sOa%[q!_%[q'z%[q!]%[q~P#/sO[:UO~O!]1TO!^)Xq~O`:YO~O#`:ZO!]'pa!^'pa~O!]5uO!^)Ui~P#BwO!S:]O~O!_1oO%i:`O~O(VTO(YUO(e:eO~O!]1zO!^)Vq~O!k:hO~O!k:iO~O!k:jO~O!k:jO~P%[O#`:mO!]#hy!^#hy~O!]#hy!^#hy~P#BwO%i:rO~P&8fO!_'`O%i:rO~O$O#|y!]#|y!^#|y~P#BwOP$|iR$|i[$|ij$|ir$|i!S$|i!l$|i!p$|i#R$|i#n$|i#o$|i#p$|i#q$|i#r$|i#s$|i#t$|i#u$|i#v$|i#x$|i#z$|i#{$|i$O$|i(a$|i(r$|i!]$|i!^$|i~P''VO!Q*OO'y*PO(z%POP'iaR'ia['iaj'ian'iar'ia!S'ia!l'ia!p'ia#R'ia#n'ia#o'ia#p'ia#q'ia#r'ia#s'ia#t'ia#u'ia#v'ia#x'ia#z'ia#{'ia$O'ia(a'ia(r'ia(y'ia!]'ia!^'ia~O!Q*OO'y*POP'kaR'ka['kaj'kan'kar'ka!S'ka!l'ka!p'ka#R'ka#n'ka#o'ka#p'ka#q'ka#r'ka#s'ka#t'ka#u'ka#v'ka#x'ka#z'ka#{'ka$O'ka(a'ka(r'ka(y'ka(z'ka!]'ka!^'ka~O(y$}OP%aiR%ai[%aij%ain%air%ai!Q%ai!S%ai!l%ai!p%ai#R%ai#n%ai#o%ai#p%ai#q%ai#r%ai#s%ai#t%ai#u%ai#v%ai#x%ai#z%ai#{%ai$O%ai'y%ai(a%ai(r%ai(z%ai!]%ai!^%ai~O(z%POP%ciR%ci[%cij%cin%cir%ci!Q%ci!S%ci!l%ci!p%ci#R%ci#n%ci#o%ci#p%ci#q%ci#r%ci#s%ci#t%ci#u%ci#v%ci#x%ci#z%ci#{%ci$O%ci'y%ci(a%ci(r%ci(y%ci!]%ci!^%ci~O$O$oy!]$oy!^$oy~P#BwO$O#cy!]#cy!^#cy~P#BwO!g#vO!]'eq!k'eq~O!]/pO!k)Oy~O!Y'gq!]'gq~P#/sOr:|O!g#vO(r'pO~O[;QO!Y;PO~P#/sO!Y;PO~Og(_!R!](_!R~P!1WOa%[y!_%[y'z%[y!]%[y~P#/sO!]1TO!^)Xy~O!]5uO!^)Uq~O(T;XO~O!_1oO%i;[O~O!k;_O~O%i;dO~P&8fOP$|qR$|q[$|qj$|qr$|q!S$|q!l$|q!p$|q#R$|q#n$|q#o$|q#p$|q#q$|q#r$|q#s$|q#t$|q#u$|q#v$|q#x$|q#z$|q#{$|q$O$|q(a$|q(r$|q!]$|q!^$|q~P''VO!Q*OO'y*PO(z%POP'jaR'ja['jaj'jan'jar'ja!S'ja!l'ja!p'ja#R'ja#n'ja#o'ja#p'ja#q'ja#r'ja#s'ja#t'ja#u'ja#v'ja#x'ja#z'ja#{'ja$O'ja(a'ja(r'ja(y'ja!]'ja!^'ja~O!Q*OO'y*POP'laR'la['laj'lan'lar'la!S'la!l'la!p'la#R'la#n'la#o'la#p'la#q'la#r'la#s'la#t'la#u'la#v'la#x'la#z'la#{'la$O'la(a'la(r'la(y'la(z'la!]'la!^'la~OP%OqR%Oq[%Oqj%Oqr%Oq!S%Oq!l%Oq!p%Oq#R%Oq#n%Oq#o%Oq#p%Oq#q%Oq#r%Oq#s%Oq#t%Oq#u%Oq#v%Oq#x%Oq#z%Oq#{%Oq$O%Oq(a%Oq(r%Oq!]%Oq!^%Oq~P''VOg%e!Z!]%e!Z#`%e!Z$O%e!Z~P!1WO!Y;hO~P#/sOr;iO!g#vO(r'pO~O[;kO!Y;hO~P#/sO!]'pq!^'pq~P#BwO!]#h!Z!^#h!Z~P#BwO#k%e!ZP%e!ZR%e!Z[%e!Za%e!Zj%e!Zr%e!Z!S%e!Z!]%e!Z!l%e!Z!p%e!Z#R%e!Z#n%e!Z#o%e!Z#p%e!Z#q%e!Z#r%e!Z#s%e!Z#t%e!Z#u%e!Z#v%e!Z#x%e!Z#z%e!Z#{%e!Z'z%e!Z(a%e!Z(r%e!Z!k%e!Z!Y%e!Z'w%e!Z#`%e!Zv%e!Z!_%e!Z%i%e!Z!g%e!Z~P#/sOr;tO!g#vO(r'pO~O!Y;uO~P#/sOr;|O!g#vO(r'pO~O!Y;}O~P#/sOP%e!ZR%e!Z[%e!Zj%e!Zr%e!Z!S%e!Z!l%e!Z!p%e!Z#R%e!Z#n%e!Z#o%e!Z#p%e!Z#q%e!Z#r%e!Z#s%e!Z#t%e!Z#u%e!Z#v%e!Z#x%e!Z#z%e!Z#{%e!Z$O%e!Z(a%e!Z(r%e!Z!]%e!Z!^%e!Z~P''VOr<QO!g#vO(r'pO~Ov(fX~P1qO!Q%rO~P!)[O(U!lO~P!)[O!YfX!]fX#`fX~P%2OOP]XR]X[]Xj]Xr]X!Q]X!S]X!]]X!]fX!l]X!p]X#R]X#S]X#`]X#`fX#kfX#n]X#o]X#p]X#q]X#r]X#s]X#t]X#u]X#v]X#x]X#z]X#{]X$Q]X(a]X(r]X(y]X(z]X~O!gfX!k]X!kfX(rfX~P'LTOP<UOQ<UOSfOd>ROe!iOpkOr<UOskOtkOzkO|<UO!O<UO!SWO!WkO!XkO!_XO!i<XO!lZO!o<UO!p<UO!q<UO!s<YO!u<]O!x!hO$W!kO$n>PO(T)]O(VTO(YUO(aVO(o[O~O!]<iO!^$qa~Oh%VOp%WOr%XOs$tOt$tOz%YO|%ZO!O<tO!S${O!_$|O!i>WO!l$xO#j<zO$W%`O$t<vO$v<xO$y%aO(T(vO(VTO(YUO(a$uO(y$}O(z%PO~Ol)dO~P(!yOr!eX(r!eX~P#!iOr(jX(r(jX~P##[O!^]X!^fX~P'LTO!YfX!Y$zX!]fX!]$zX#`fX~P!0SO#k<^O~O!g#vO#k<^O~O#`<nO~Oj<bO~O#`=OO!](wX!^(wX~O#`<nO!](uX!^(uX~O#k=PO~Og=RO~P!1WO#k=XO~O#k=YO~Og=RO(T&ZO~O!g#vO#k=ZO~O!g#vO#k=PO~O$O=[O~P#BwO#k=]O~O#k=^O~O#k=cO~O#k=dO~O#k=eO~O#k=fO~O$O=gO~P!1WO$O=hO~P!1WOl=sO~P7eOk#S#T#U#W#X#[#i#j#u$n$t$v$y%]%^%h%i%j%q%s%v%w%y%{~(OT#o!X'|(U#ps#n#qr!Q'}$]'}(T$_(e~",
  goto: "$9Y)]PPPPPP)^PP)aP)rP+W/]PPPP6mPP7TPP=QPPP@tPA^PA^PPPA^PCfPA^PA^PA^PCjPCoPD^PIWPPPI[PPPPI[L_PPPLeMVPI[PI[PP! eI[PPPI[PI[P!#lI[P!'S!(X!(bP!)U!)Y!)U!,gPPPPPPP!-W!(XPP!-h!/YP!2iI[I[!2n!5z!:h!:h!>gPPP!>oI[PPPPPPPPP!BOP!C]PPI[!DnPI[PI[I[I[I[I[PI[!FQP!I[P!LbP!Lf!Lp!Lt!LtP!IXP!Lx!LxP#!OP#!SI[PI[#!Y#%_CjA^PA^PA^A^P#&lA^A^#)OA^#+vA^#.SA^A^#.r#1W#1W#1]#1f#1W#1qPP#1WPA^#2ZA^#6YA^A^6mPPP#:_PPP#:x#:xP#:xP#;`#:xPP#;fP#;]P#;]#;y#;]#<e#<k#<n)aP#<q)aP#<z#<z#<zP)aP)aP)aP)aPP)aP#=Q#=TP#=T)aP#=XP#=[P)aP)aP)aP)aP)aP)a)aPP#=b#=h#=s#=y#>P#>V#>]#>k#>q#>{#?R#?]#?c#?s#?y#@k#@}#AT#AZ#Ai#BO#Cs#DR#DY#Et#FS#Gt#HS#HY#H`#Hf#Hp#Hv#H|#IW#Ij#IpPPPPPPPPPPP#IvPPPPPPP#Jk#Mx$ b$ i$ qPPP$']P$'f$*_$0x$0{$1O$1}$2Q$2X$2aP$2g$2jP$3W$3[$4S$5b$5g$5}PP$6S$6Y$6^$6a$6e$6i$7e$7|$8e$8i$8l$8o$8y$8|$9Q$9UR!|RoqOXst!Z#d%m&r&t&u&w,s,x2[2_Y!vQ'`-e1o5{Q%tvQ%|yQ&T|Q&j!VS'W!e-]Q'f!iS'l!r!yU*k$|*Z*oQ+o%}S+|&V&WQ,d&dQ-c'_Q-m'gQ-u'mQ0[*qQ1b,OQ1y,eR<{<Y%SdOPWXYZstuvw!Z!`!g!o#S#W#Z#d#o#u#x#{$O$P$Q$R$S$T$U$V$W$X$_$a$e%m%t&R&k&n&r&t&u&w&{'T'b'r(T(V(](d(x(z)O)}*i+X+],p,s,x-i-q.P.V.t.{/n0]0l0r1S1r2S2T2V2X2[2_2a3Q3W3l4z6T6e6f6i6|8t9T9_S#q]<V!r)_$Z$n'X)s-U-X/V2p4T5w6s:Z:m<U<X<Y<]<^<_<`<a<b<c<d<e<f<g<h<i<k<n<{=O=P=R=Z=[=e=f>SU+P%]<s<tQ+t&PQ,f&gQ,m&oQ0x+gQ0}+iQ1Y+uQ2R,kQ3`.gQ5`0|Q5f1TQ6[1zQ7Y3dQ8`5gR9e7['QkOPWXYZstuvw!Z!`!g!o#S#W#Z#d#o#u#x#{$O$P$Q$R$S$T$U$V$W$X$Z$_$a$e$n%m%t&R&k&n&o&r&t&u&w&{'T'X'b'r(T(V(](d(x(z)O)s)}*i+X+]+g,p,s,x-U-X-i-q.P.V.g.t.{/V/n0]0l0r1S1r2S2T2V2X2[2_2a2p3Q3W3d3l4T4z5w6T6e6f6i6s6|7[8t9T9_:Z:m<U<X<Y<]<^<_<`<a<b<c<d<e<f<g<h<i<k<n<{=O=P=R=Z=[=e=f>S!S!nQ!r!v!y!z$|'W'_'`'l'm'n*k*o*q*r-]-c-e-u0[0_1o5{5}%[$ti#v$b$c$d$x${%O%Q%^%_%c)y*R*T*V*Y*a*g*w*x+f+i,S,V.f/P/d/m/x/y/{0`0b0i0j0o1f1i1q3c4^4_4j4o5Q5[5_6S7W7v8Q8V8[8q9b9p9y:P:`:r;Q;[;d;k<l<m<o<p<q<r<u<v<w<x<y<z=S=T=U=V=X=Y=]=^=_=`=a=b=c=d=g=h>P>X>Y>]>^Q&X|Q'U!eS'[%i-`Q+t&PQ,P&WQ,f&gQ0n+SQ1Y+uQ1_+{Q2Q,jQ2R,kQ5f1TQ5o1aQ6[1zQ6_1|Q6`2PQ8`5gQ8c5lQ8|6bQ:X8dQ:f8yQ;V:YR<}*ZrnOXst!V!Z#d%m&i&r&t&u&w,s,x2[2_R,h&k&z^OPXYstuvwz!Z!`!g!j!o#S#d#o#u#x#{$O$P$Q$R$S$T$U$V$W$X$Z$_$a$e$n%m%t&R&k&n&o&r&t&u&w&{'T'b'r(V(](d(x(z)O)s)}*i+X+]+g,p,s,x-U-X-i-q.P.V.g.t.{/V/n0]0l0r1S1r2S2T2V2X2[2_2a2p3Q3W3d3l4T4z5w6T6e6f6i6s6|7[8t9T9_:Z:m<U<X<Y<]<^<_<`<a<b<c<d<e<f<g<h<i<k<n<{=O=P=R=Z=[=e=f>R>S[#]WZ#W#Z'X(T!b%jm#h#i#l$x%e%h(^(h(i(j*Y*^*b+Z+[+^,o-V.T.Z.[.]._/m/p2d3[3]4a6r7TQ%wxQ%{yW&Q|&V&W,OQ&_!TQ'c!hQ'e!iQ(q#sS+n%|%}Q+r&PQ,_&bQ,c&dS-l'f'gQ.i(rQ1R+oQ1X+uQ1Z+vQ1^+zQ1t,`S1x,d,eQ2|-mQ5e1TQ5i1WQ5n1`Q6Z1yQ8_5gQ8b5kQ8f5pQ:T8^R;T:U!U$zi$d%O%Q%^%_%c*R*T*a*w*x/P/x0`0b0i0j0o4_5Q8V9p>P>X>Y!^%yy!i!u%{%|%}'V'e'f'g'k'u*j+n+o-Y-l-m-t0R0U1R2u2|3T4r4s4v7}9{Q+h%wQ,T&[Q,W&]Q,b&dQ.h(qQ1s,_U1w,c,d,eQ3e.iQ6U1tS6Y1x1yQ8x6Z#f>T#v$b$c$x${)y*V*Y*g+f+i,S,V.f/d/m/y/{1f1i1q3c4^4j4o5[5_6S7W7v8Q8[8q9b9y:P:`:r;Q;[;d;k<o<q<u<w<y=S=U=X=]=_=a=c=g>]>^o>U<l<m<p<r<v<x<z=T=V=Y=^=`=b=d=hW%Ti%V*y>PS&[!Q&iQ&]!RQ&^!SU*}%[%d=sR,R&Y%]%Si#v$b$c$d$x${%O%Q%^%_%c)y*R*T*V*Y*a*g*w*x+f+i,S,V.f/P/d/m/x/y/{0`0b0i0j0o1f1i1q3c4^4_4j4o5Q5[5_6S7W7v8Q8V8[8q9b9p9y:P:`:r;Q;[;d;k<l<m<o<p<q<r<u<v<w<x<y<z=S=T=U=V=X=Y=]=^=_=`=a=b=c=d=g=h>P>X>Y>]>^T)z$u){V+P%]<s<tW'[!e%i*Z-`S(}#y#zQ+c%rQ+y&SS.b(m(nQ1j,XQ5T0kR8i5u'QkOPWXYZstuvw!Z!`!g!o#S#W#Z#d#o#u#x#{$O$P$Q$R$S$T$U$V$W$X$Z$_$a$e$n%m%t&R&k&n&o&r&t&u&w&{'T'X'b'r(T(V(](d(x(z)O)s)}*i+X+]+g,p,s,x-U-X-i-q.P.V.g.t.{/V/n0]0l0r1S1r2S2T2V2X2[2_2a2p3Q3W3d3l4T4z5w6T6e6f6i6s6|7[8t9T9_:Z:m<U<X<Y<]<^<_<`<a<b<c<d<e<f<g<h<i<k<n<{=O=P=R=Z=[=e=f>S$i$^c#Y#e%q%s%u(S(Y(t(y)R)S)T)U)V)W)X)Y)Z)[)^)`)b)g)q+d+x-Z-x-}.S.U.s.v.z.|.}/O/b0p2k2n3O3V3k3p3q3r3s3t3u3v3w3x3y3z3{3|4P4Q4X5X5c6u6{7Q7a7b7k7l8k9X9]9g9m9n:o;W;`<W=vT#TV#U'RkOPWXYZstuvw!Z!`!g!o#S#W#Z#d#o#u#x#{$O$P$Q$R$S$T$U$V$W$X$Z$_$a$e$n%m%t&R&k&n&o&r&t&u&w&{'T'X'b'r(T(V(](d(x(z)O)s)}*i+X+]+g,p,s,x-U-X-i-q.P.V.g.t.{/V/n0]0l0r1S1r2S2T2V2X2[2_2a2p3Q3W3d3l4T4z5w6T6e6f6i6s6|7[8t9T9_:Z:m<U<X<Y<]<^<_<`<a<b<c<d<e<f<g<h<i<k<n<{=O=P=R=Z=[=e=f>SQ'Y!eR2q-]!W!nQ!e!r!v!y!z$|'W'_'`'l'm'n*Z*k*o*q*r-]-c-e-u0[0_1o5{5}R1l,ZnqOXst!Z#d%m&r&t&u&w,s,x2[2_Q&y!^Q'v!xS(s#u<^Q+l%zQ,]&_Q,^&aQ-j'dQ-w'oS.r(x=PS0q+X=ZQ1P+mQ1n,[Q2c,zQ2e,{Q2m-WQ2z-kQ2}-oS5Y0r=eQ5a1QS5d1S=fQ6t2oQ6x2{Q6}3SQ8]5bQ9Y6vQ9Z6yQ9^7OR:l9V$d$]c#Y#e%s%u(S(Y(t(y)R)S)T)U)V)W)X)Y)Z)[)^)`)b)g)q+d+x-Z-x-}.S.U.s.v.z.}/O/b0p2k2n3O3V3k3p3q3r3s3t3u3v3w3x3y3z3{3|4P4Q4X5X5c6u6{7Q7a7b7k7l8k9X9]9g9m9n:o;W;`<W=vS(o#p'iQ)P#zS+b%q.|S.c(n(pR3^.d'QkOPWXYZstuvw!Z!`!g!o#S#W#Z#d#o#u#x#{$O$P$Q$R$S$T$U$V$W$X$Z$_$a$e$n%m%t&R&k&n&o&r&t&u&w&{'T'X'b'r(T(V(](d(x(z)O)s)}*i+X+]+g,p,s,x-U-X-i-q.P.V.g.t.{/V/n0]0l0r1S1r2S2T2V2X2[2_2a2p3Q3W3d3l4T4z5w6T6e6f6i6s6|7[8t9T9_:Z:m<U<X<Y<]<^<_<`<a<b<c<d<e<f<g<h<i<k<n<{=O=P=R=Z=[=e=f>SS#q]<VQ&t!XQ&u!YQ&w![Q&x!]R2Z,vQ'a!hQ+e%wQ-h'cS.e(q+hQ2x-gW3b.h.i0w0yQ6w2yW7U3_3a3e5^U9a7V7X7ZU:q9c9d9fS;b:p:sQ;p;cR;x;qU!wQ'`-eT5y1o5{!Q_OXZ`st!V!Z#d#h%e%m&i&k&r&t&u&w(j,s,x.[2[2_]!pQ!r'`-e1o5{T#q]<V%^{OPWXYZstuvw!Z!`!g!o#S#W#Z#d#o#u#x#{$O$P$Q$R$S$T$U$V$W$X$_$a$e%m%t&R&k&n&o&r&t&u&w&{'T'b'r(T(V(](d(x(z)O)}*i+X+]+g,p,s,x-i-q.P.V.g.t.{/n0]0l0r1S1r2S2T2V2X2[2_2a3Q3W3d3l4z6T6e6f6i6|7[8t9T9_S(}#y#zS.b(m(n!s=l$Z$n'X)s-U-X/V2p4T5w6s:Z:m<U<X<Y<]<^<_<`<a<b<c<d<e<f<g<h<i<k<n<{=O=P=R=Z=[=e=f>SU$fd)_,mS(p#p'iU*v%R(w4OU0m+O.n7gQ5^0xQ7V3`Q9d7YR:s9em!tQ!r!v!y!z'`'l'm'n-e-u1o5{5}Q't!uS(f#g2US-s'k'wQ/s*]Q0R*jQ3U-vQ4f/tQ4r0TQ4s0UQ4x0^Q7r4`S7}4t4vS8R4y4{Q9r7sQ9v7yQ9{8OQ:Q8TS:{9w9xS;g:|;PS;s;h;iS;{;t;uS<P;|;}R<S<QQ#wbQ's!uS(e#g2US(g#m+WQ+Y%fQ+j%xQ+p&OU-r'k't'wQ.W(fU/r*]*`/wQ0S*jQ0V*lQ1O+kQ1u,aS3R-s-vQ3Z.`S4e/s/tQ4n0PS4q0R0^Q4u0WQ6W1vQ7P3US7q4`4bQ7u4fU7|4r4x4{Q8P4wQ8v6XS9q7r7sQ9u7yQ9}8RQ:O8SQ:c8wQ:y9rS:z9v9xQ;S:QQ;^:dS;f:{;PS;r;g;hS;z;s;uS<O;{;}Q<R<PQ<T<SQ=o=jQ={=tR=|=uV!wQ'`-e%^aOPWXYZstuvw!Z!`!g!o#S#W#Z#d#o#u#x#{$O$P$Q$R$S$T$U$V$W$X$_$a$e%m%t&R&k&n&o&r&t&u&w&{'T'b'r(T(V(](d(x(z)O)}*i+X+]+g,p,s,x-i-q.P.V.g.t.{/n0]0l0r1S1r2S2T2V2X2[2_2a3Q3W3d3l4z6T6e6f6i6|7[8t9T9_S#wz!j!r=i$Z$n'X)s-U-X/V2p4T5w6s:Z:m<U<X<Y<]<^<_<`<a<b<c<d<e<f<g<h<i<k<n<{=O=P=R=Z=[=e=f>SR=o>R%^bOPWXYZstuvw!Z!`!g!o#S#W#Z#d#o#u#x#{$O$P$Q$R$S$T$U$V$W$X$_$a$e%m%t&R&k&n&o&r&t&u&w&{'T'b'r(T(V(](d(x(z)O)}*i+X+]+g,p,s,x-i-q.P.V.g.t.{/n0]0l0r1S1r2S2T2V2X2[2_2a3Q3W3d3l4z6T6e6f6i6|7[8t9T9_Q%fj!^%xy!i!u%{%|%}'V'e'f'g'k'u*j+n+o-Y-l-m-t0R0U1R2u2|3T4r4s4v7}9{S&Oz!jQ+k%yQ,a&dW1v,b,c,d,eU6X1w1x1yS8w6Y6ZQ:d8x!r=j$Z$n'X)s-U-X/V2p4T5w6s:Z:m<U<X<Y<]<^<_<`<a<b<c<d<e<f<g<h<i<k<n<{=O=P=R=Z=[=e=f>SQ=t>QR=u>R%QeOPXYstuvw!Z!`!g!o#S#d#o#u#x#{$O$P$Q$R$S$T$U$V$W$X$_$a$e%m%t&R&k&n&r&t&u&w&{'T'b'r(V(](d(x(z)O)}*i+X+]+g,p,s,x-i-q.P.V.g.t.{/n0]0l0r1S1r2S2T2V2X2[2_2a3Q3W3d3l4z6T6e6f6i6|7[8t9T9_Y#bWZ#W#Z(T!b%jm#h#i#l$x%e%h(^(h(i(j*Y*^*b+Z+[+^,o-V.T.Z.[.]._/m/p2d3[3]4a6r7TQ,n&o!p=k$Z$n)s-U-X/V2p4T5w6s:Z:m<U<X<Y<]<^<_<`<a<b<c<d<e<f<g<h<i<k<n<{=O=P=R=Z=[=e=f>SR=n'XU']!e%i*ZR2s-`%SdOPWXYZstuvw!Z!`!g!o#S#W#Z#d#o#u#x#{$O$P$Q$R$S$T$U$V$W$X$_$a$e%m%t&R&k&n&r&t&u&w&{'T'b'r(T(V(](d(x(z)O)}*i+X+],p,s,x-i-q.P.V.t.{/n0]0l0r1S1r2S2T2V2X2[2_2a3Q3W3l4z6T6e6f6i6|8t9T9_!r)_$Z$n'X)s-U-X/V2p4T5w6s:Z:m<U<X<Y<]<^<_<`<a<b<c<d<e<f<g<h<i<k<n<{=O=P=R=Z=[=e=f>SQ,m&oQ0x+gQ3`.gQ7Y3dR9e7[!b$Tc#Y%q(S(Y(t(y)Z)[)`)g+x-x-}.S.U.s.v/b0p3O3V3k3{5X5c6{7Q7a9]:o<W!P<d)^)q-Z.|2k2n3p3y3z4P4X6u7b7k7l8k9X9g9m9n;W;`=v!f$Vc#Y%q(S(Y(t(y)W)X)Z)[)`)g+x-x-}.S.U.s.v/b0p3O3V3k3{5X5c6{7Q7a9]:o<W!T<f)^)q-Z.|2k2n3p3v3w3y3z4P4X6u7b7k7l8k9X9g9m9n;W;`=v!^$Zc#Y%q(S(Y(t(y)`)g+x-x-}.S.U.s.v/b0p3O3V3k3{5X5c6{7Q7a9]:o<WQ4_/kz>S)^)q-Z.|2k2n3p4P4X6u7b7k7l8k9X9g9m9n;W;`=vQ>X>ZR>Y>['QkOPWXYZstuvw!Z!`!g!o#S#W#Z#d#o#u#x#{$O$P$Q$R$S$T$U$V$W$X$Z$_$a$e$n%m%t&R&k&n&o&r&t&u&w&{'T'X'b'r(T(V(](d(x(z)O)s)}*i+X+]+g,p,s,x-U-X-i-q.P.V.g.t.{/V/n0]0l0r1S1r2S2T2V2X2[2_2a2p3Q3W3d3l4T4z5w6T6e6f6i6s6|7[8t9T9_:Z:m<U<X<Y<]<^<_<`<a<b<c<d<e<f<g<h<i<k<n<{=O=P=R=Z=[=e=f>SS$oh$pR4U/U'XgOPWXYZhstuvw!Z!`!g!o#S#W#Z#d#o#u#x#{$O$P$Q$R$S$T$U$V$W$X$Z$_$a$e$n$p%m%t&R&k&n&o&r&t&u&w&{'T'X'b'r(T(V(](d(x(z)O)s)}*i+X+]+g,p,s,x-U-X-i-q.P.V.g.t.{/U/V/n0]0l0r1S1r2S2T2V2X2[2_2a2p3Q3W3d3l4T4z5w6T6e6f6i6s6|7[8t9T9_:Z:m<U<X<Y<]<^<_<`<a<b<c<d<e<f<g<h<i<k<n<{=O=P=R=Z=[=e=f>ST$kf$qQ$ifS)j$l)nR)v$qT$jf$qT)l$l)n'XhOPWXYZhstuvw!Z!`!g!o#S#W#Z#d#o#u#x#{$O$P$Q$R$S$T$U$V$W$X$Z$_$a$e$n$p%m%t&R&k&n&o&r&t&u&w&{'T'X'b'r(T(V(](d(x(z)O)s)}*i+X+]+g,p,s,x-U-X-i-q.P.V.g.t.{/U/V/n0]0l0r1S1r2S2T2V2X2[2_2a2p3Q3W3d3l4T4z5w6T6e6f6i6s6|7[8t9T9_:Z:m<U<X<Y<]<^<_<`<a<b<c<d<e<f<g<h<i<k<n<{=O=P=R=Z=[=e=f>ST$oh$pQ$rhR)u$p%^jOPWXYZstuvw!Z!`!g!o#S#W#Z#d#o#u#x#{$O$P$Q$R$S$T$U$V$W$X$_$a$e%m%t&R&k&n&o&r&t&u&w&{'T'b'r(T(V(](d(x(z)O)}*i+X+]+g,p,s,x-i-q.P.V.g.t.{/n0]0l0r1S1r2S2T2V2X2[2_2a3Q3W3d3l4z6T6e6f6i6|7[8t9T9_!s>Q$Z$n'X)s-U-X/V2p4T5w6s:Z:m<U<X<Y<]<^<_<`<a<b<c<d<e<f<g<h<i<k<n<{=O=P=R=Z=[=e=f>S#glOPXZst!Z!`!o#S#d#o#{$n%m&k&n&o&r&t&u&w&{'T'b)O)s*i+]+g,p,s,x-i.g/V/n0]0l1r2S2T2V2X2[2_2a3d4T4z6T6e6f6i7[8t9T!U%Ri$d%O%Q%^%_%c*R*T*a*w*x/P/x0`0b0i0j0o4_5Q8V9p>P>X>Y#f(w#v$b$c$x${)y*V*Y*g+f+i,S,V.f/d/m/y/{1f1i1q3c4^4j4o5[5_6S7W7v8Q8[8q9b9y:P:`:r;Q;[;d;k<o<q<u<w<y=S=U=X=]=_=a=c=g>]>^Q+T%aQ/c*Oo4O<l<m<p<r<v<x<z=T=V=Y=^=`=b=d=h!U$yi$d%O%Q%^%_%c*R*T*a*w*x/P/x0`0b0i0j0o4_5Q8V9p>P>X>YQ*c$zU*l$|*Z*oQ+U%bQ0W*m#f=q#v$b$c$x${)y*V*Y*g+f+i,S,V.f/d/m/y/{1f1i1q3c4^4j4o5[5_6S7W7v8Q8[8q9b9y:P:`:r;Q;[;d;k<o<q<u<w<y=S=U=X=]=_=a=c=g>]>^n=r<l<m<p<r<v<x<z=T=V=Y=^=`=b=d=hQ=w>TQ=x>UQ=y>VR=z>W!U%Ri$d%O%Q%^%_%c*R*T*a*w*x/P/x0`0b0i0j0o4_5Q8V9p>P>X>Y#f(w#v$b$c$x${)y*V*Y*g+f+i,S,V.f/d/m/y/{1f1i1q3c4^4j4o5[5_6S7W7v8Q8[8q9b9y:P:`:r;Q;[;d;k<o<q<u<w<y=S=U=X=]=_=a=c=g>]>^o4O<l<m<p<r<v<x<z=T=V=Y=^=`=b=d=hnoOXst!Z#d%m&r&t&u&w,s,x2[2_S*f${*YQ-R'OQ-S'QR4i/y%[%Si#v$b$c$d$x${%O%Q%^%_%c)y*R*T*V*Y*a*g*w*x+f+i,S,V.f/P/d/m/x/y/{0`0b0i0j0o1f1i1q3c4^4_4j4o5Q5[5_6S7W7v8Q8V8[8q9b9p9y:P:`:r;Q;[;d;k<l<m<o<p<q<r<u<v<w<x<y<z=S=T=U=V=X=Y=]=^=_=`=a=b=c=d=g=h>P>X>Y>]>^Q,U&]Q1h,WQ5s1gR8h5tV*n$|*Z*oU*n$|*Z*oT5z1o5{S0P*i/nQ4w0]T8S4z:]Q+j%xQ0V*lQ1O+kQ1u,aQ6W1vQ8v6XQ:c8wR;^:d!U%Oi$d%O%Q%^%_%c*R*T*a*w*x/P/x0`0b0i0j0o4_5Q8V9p>P>X>Yx*R$v)e*S*u+V/v0d0e4R4g5R5S5W7p8U:R:x=p=}>OS0`*t0a#f<o#v$b$c$x${)y*V*Y*g+f+i,S,V.f/d/m/y/{1f1i1q3c4^4j4o5[5_6S7W7v8Q8[8q9b9y:P:`:r;Q;[;d;k<o<q<u<w<y=S=U=X=]=_=a=c=g>]>^n<p<l<m<p<r<v<x<z=T=V=Y=^=`=b=d=h!d=S(u)c*[*e.j.m.q/_/k/|0v1e3h4[4h4l5r7]7`7w7z8X8Z9t9|:S:};R;e;j;v>Z>[`=T3}7c7f7j9h:t:w;yS=_.l3iT=`7e9k!U%Qi$d%O%Q%^%_%c*R*T*a*w*x/P/x0`0b0i0j0o4_5Q8V9p>P>X>Y|*T$v)e*U*t+V/g/v0d0e4R4g4|5R5S5W7p8U:R:x=p=}>OS0b*u0c#f<q#v$b$c$x${)y*V*Y*g+f+i,S,V.f/d/m/y/{1f1i1q3c4^4j4o5[5_6S7W7v8Q8[8q9b9y:P:`:r;Q;[;d;k<o<q<u<w<y=S=U=X=]=_=a=c=g>]>^n<r<l<m<p<r<v<x<z=T=V=Y=^=`=b=d=h!h=U(u)c*[*e.k.l.q/_/k/|0v1e3f3h4[4h4l5r7]7^7`7w7z8X8Z9t9|:S:};R;e;j;v>Z>[d=V3}7d7e7j9h9i:t:u:w;yS=a.m3jT=b7f9lrnOXst!V!Z#d%m&i&r&t&u&w,s,x2[2_Q&f!UR,p&ornOXst!V!Z#d%m&i&r&t&u&w,s,x2[2_R&f!UQ,Y&^R1d,RsnOXst!V!Z#d%m&i&r&t&u&w,s,x2[2_Q1p,_S6R1s1tU8p6P6Q6US:_8r8sS;Y:^:aQ;m;ZR;w;nQ&m!VR,i&iR6_1|R:f8yW&Q|&V&W,OR1Z+vQ&r!WR,s&sR,y&xT2],x2_R,}&yQ,|&yR2f,}Q'y!{R-y'ySsOtQ#dXT%ps#dQ#OTR'{#OQ#RUR'}#RQ){$uR/`){Q#UVR(Q#UQ#XWU(W#X(X.QQ(X#YR.Q(YQ-^'YR2r-^Q.u(yS3m.u3nR3n.vQ-e'`R2v-eY!rQ'`-e1o5{R'j!rQ/Q)eR4S/QU#_W%h*YU(_#_(`.RQ(`#`R.R(ZQ-a']R2t-at`OXst!V!Z#d%m&i&k&r&t&u&w,s,x2[2_S#hZ%eU#r`#h.[R.[(jQ(k#jQ.X(gW.a(k.X3X7RQ3X.YR7R3YQ)n$lR/W)nQ$phR)t$pQ$`cU)a$`-|<jQ-|<WR<j)qQ/q*]W4c/q4d7t9sU4d/r/s/tS7t4e4fR9s7u$e*Q$v(u)c)e*[*e*t*u+Q+R+V.l.m.o.p.q/_/g/i/k/v/|0d0e0v1e3f3g3h3}4R4[4g4h4l4|5O5R5S5W5r7]7^7_7`7e7f7h7i7j7p7w7z8U8X8Z9h9i9j9t9|:R:S:t:u:v:w:x:};R;e;j;v;y=p=}>O>Z>[Q/z*eU4k/z4m7xQ4m/|R7x4lS*o$|*ZR0Y*ox*S$v)e*t*u+V/v0d0e4R4g5R5S5W7p8U:R:x=p=}>O!d.j(u)c*[*e.l.m.q/_/k/|0v1e3h4[4h4l5r7]7`7w7z8X8Z9t9|:S:};R;e;j;v>Z>[U/h*S.j7ca7c3}7e7f7j9h:t:w;yQ0a*tQ3i.lU4}0a3i9kR9k7e|*U$v)e*t*u+V/g/v0d0e4R4g4|5R5S5W7p8U:R:x=p=}>O!h.k(u)c*[*e.l.m.q/_/k/|0v1e3f3h4[4h4l5r7]7^7`7w7z8X8Z9t9|:S:};R;e;j;v>Z>[U/j*U.k7de7d3}7e7f7j9h9i:t:u:w;yQ0c*uQ3j.mU5P0c3j9lR9l7fQ*z%UR0g*zQ5]0vR8Y5]Q+_%kR0u+_Q5v1jS8j5v:[R:[8kQ,[&_R1m,[Q5{1oR8m5{Q1{,fS6]1{8zR8z6_Q1U+rW5h1U5j8a:VQ5j1XQ8a5iR:V8bQ+w&QR1[+wQ2_,xR6m2_YrOXst#dQ&v!ZQ+a%mQ,r&rQ,t&tQ,u&uQ,w&wQ2Y,sS2],x2_R6l2[Q%opQ&z!_Q&}!aQ'P!bQ'R!cQ'q!uQ+`%lQ+l%zQ,Q&XQ,h&mQ-P&|W-p'k's't'wQ-w'oQ0X*nQ1P+mQ1c,PS2O,i,lQ2g-OQ2h-RQ2i-SQ2}-oW3P-r-s-v-xQ5a1QQ5m1_Q5q1eQ6V1uQ6a2QQ6k2ZU6z3O3R3UQ6}3SQ8]5bQ8e5oQ8g5rQ8l5zQ8u6WQ8{6`S9[6{7PQ9^7OQ:W8cQ:b8vQ:g8|Q:n9]Q;U:XQ;]:cQ;a:oQ;l;VR;o;^Q%zyQ'd!iQ'o!uU+m%{%|%}Q-W'VU-k'e'f'gS-o'k'uQ0Q*jS1Q+n+oQ2o-YS2{-l-mQ3S-tS4p0R0UQ5b1RQ6v2uQ6y2|Q7O3TU7{4r4s4vQ9z7}R;O9{S$wi>PR*{%VU%Ui%V>PR0f*yQ$viS(u#v+iS)c$b$cQ)e$dQ*[$xS*e${*YQ*t%OQ*u%QQ+Q%^Q+R%_Q+V%cQ.l<oQ.m<qQ.o<uQ.p<wQ.q<yQ/_)yQ/g*RQ/i*TQ/k*VQ/v*aS/|*g/mQ0d*wQ0e*xl0v+f,V.f1i1q3c6S7W8q9b:`:r;[;dQ1e,SQ3f=SQ3g=UQ3h=XS3}<l<mQ4R/PS4[/d4^Q4g/xQ4h/yQ4l/{Q4|0`Q5O0bQ5R0iQ5S0jQ5W0oQ5r1fQ7]=]Q7^=_Q7_=aQ7`=cQ7e<pQ7f<rQ7h<vQ7i<xQ7j<zQ7p4_Q7w4jQ7z4oQ8U5QQ8X5[Q8Z5_Q9h=YQ9i=TQ9j=VQ9t7vQ9|8QQ:R8VQ:S8[Q:t=^Q:u=`Q:v=bQ:w=dQ:x9pQ:}9yQ;R:PQ;e=gQ;j;QQ;v;kQ;y=hQ=p>PQ=}>XQ>O>YQ>Z>]R>[>^Q+O%]Q.n<sR7g<tnpOXst!Z#d%m&r&t&u&w,s,x2[2_Q!fPS#fZ#oQ&|!`W'h!o*i0]4zQ(P#SQ)Q#{Q)r$nS,l&k&nQ,q&oQ-O&{S-T'T/nQ-g'bQ.x)OQ/[)sQ0s+]Q0y+gQ2W,pQ2y-iQ3a.gQ4W/VQ5U0lQ6Q1rQ6c2SQ6d2TQ6h2VQ6j2XQ6o2aQ7Z3dQ7m4TQ8s6TQ9P6eQ9Q6fQ9S6iQ9f7[Q:a8tR:k9T#[cOPXZst!Z!`!o#d#o#{%m&k&n&o&r&t&u&w&{'T'b)O*i+]+g,p,s,x-i.g/n0]0l1r2S2T2V2X2[2_2a3d4z6T6e6f6i7[8t9TQ#YWQ#eYQ%quQ%svS%uw!gS(S#W(VQ(Y#ZQ(t#uQ(y#xQ)R$OQ)S$PQ)T$QQ)U$RQ)V$SQ)W$TQ)X$UQ)Y$VQ)Z$WQ)[$XQ)^$ZQ)`$_Q)b$aQ)g$eW)q$n)s/V4TQ+d%tQ+x&RS-Z'X2pQ-x'rS-}(T.PQ.S(]Q.U(dQ.s(xQ.v(zQ.z<UQ.|<XQ.}<YQ/O<]Q/b)}Q0p+XQ2k-UQ2n-XQ3O-qQ3V.VQ3k.tQ3p<^Q3q<_Q3r<`Q3s<aQ3t<bQ3u<cQ3v<dQ3w<eQ3x<fQ3y<gQ3z<hQ3{.{Q3|<kQ4P<nQ4Q<{Q4X<iQ5X0rQ5c1SQ6u=OQ6{3QQ7Q3WQ7a3lQ7b=PQ7k=RQ7l=ZQ8k5wQ9X6sQ9]6|Q9g=[Q9m=eQ9n=fQ:o9_Q;W:ZQ;`:mQ<W#SR=v>SR#[WR'Z!el!tQ!r!v!y!z'`'l'm'n-e-u1o5{5}S'V!e-]U*j$|*Z*oS-Y'W'_S0U*k*qQ0^*rQ2u-cQ4v0[R4{0_R({#xQ!fQT-d'`-e]!qQ!r'`-e1o5{Q#p]R'i<VR)f$dY!uQ'`-e1o5{Q'k!rS'u!v!yS'w!z5}S-t'l'mQ-v'nR3T-uT#kZ%eS#jZ%eS%km,oU(g#h#i#lS.Y(h(iQ.^(jQ0t+^Q3Y.ZU3Z.[.]._S7S3[3]R9`7Td#^W#W#Z%h(T(^*Y+Z.T/mr#gZm#h#i#l%e(h(i(j+^.Z.[.]._3[3]7TS*]$x*bQ/t*^Q2U,oQ2l-VQ4`/pQ6q2dQ7s4aQ9W6rT=m'X+[V#aW%h*YU#`W%h*YS(U#W(^U(Z#Z+Z/mS-['X+[T.O(T.TV'^!e%i*ZQ$lfR)x$qT)m$l)nR4V/UT*_$x*bT*h${*YQ0w+fQ1g,VQ3_.fQ5t1iQ6P1qQ7X3cQ8r6SQ9c7WQ:^8qQ:p9bQ;Z:`Q;c:rQ;n;[R;q;dnqOXst!Z#d%m&r&t&u&w,s,x2[2_Q&l!VR,h&itmOXst!U!V!Z#d%m&i&r&t&u&w,s,x2[2_R,o&oT%lm,oR1k,XR,g&gQ&U|S+}&V&WR1^,OR+s&PT&p!W&sT&q!W&sT2^,x2_",
  nodeNames: "⚠ ArithOp ArithOp ?. JSXStartTag LineComment BlockComment Script Hashbang ExportDeclaration export Star as VariableName String Escape from ; default FunctionDeclaration async function VariableDefinition > < TypeParamList in out const TypeDefinition extends ThisType this LiteralType ArithOp Number BooleanLiteral TemplateType InterpolationEnd Interpolation InterpolationStart NullType null VoidType void TypeofType typeof MemberExpression . PropertyName [ TemplateString Escape Interpolation super RegExp ] ArrayExpression Spread , } { ObjectExpression Property async get set PropertyDefinition Block : NewTarget new NewExpression ) ( ArgList UnaryExpression delete LogicOp BitOp YieldExpression yield AwaitExpression await ParenthesizedExpression ClassExpression class ClassBody MethodDeclaration Decorator @ MemberExpression PrivatePropertyName CallExpression TypeArgList CompareOp < declare Privacy static abstract override PrivatePropertyDefinition PropertyDeclaration readonly accessor Optional TypeAnnotation Equals StaticBlock FunctionExpression ArrowFunction ParamList ParamList ArrayPattern ObjectPattern PatternProperty Privacy readonly Arrow MemberExpression BinaryExpression ArithOp ArithOp ArithOp ArithOp BitOp CompareOp instanceof satisfies CompareOp BitOp BitOp BitOp LogicOp LogicOp ConditionalExpression LogicOp LogicOp AssignmentExpression UpdateOp PostfixExpression CallExpression InstantiationExpression TaggedTemplateExpression DynamicImport import ImportMeta JSXElement JSXSelfCloseEndTag JSXSelfClosingTag JSXIdentifier JSXBuiltin JSXIdentifier JSXNamespacedName JSXMemberExpression JSXSpreadAttribute JSXAttribute JSXAttributeValue JSXEscape JSXEndTag JSXOpenTag JSXFragmentTag JSXText JSXEscape JSXStartCloseTag JSXCloseTag PrefixCast < ArrowFunction TypeParamList SequenceExpression InstantiationExpression KeyofType keyof UniqueType unique ImportType InferredType infer TypeName ParenthesizedType FunctionSignature ParamList NewSignature IndexedType TupleType Label ArrayType ReadonlyType ObjectType MethodType PropertyType IndexSignature PropertyDefinition CallSignature TypePredicate asserts is NewSignature new UnionType LogicOp IntersectionType LogicOp ConditionalType ParameterizedType ClassDeclaration abstract implements type VariableDeclaration let var using TypeAliasDeclaration InterfaceDeclaration interface EnumDeclaration enum EnumBody NamespaceDeclaration namespace module AmbientDeclaration declare GlobalDeclaration global ClassDeclaration ClassBody AmbientFunctionDeclaration ExportGroup VariableName VariableName ImportDeclaration defer ImportGroup ForStatement for ForSpec ForInSpec ForOfSpec of WhileStatement while WithStatement with DoStatement do IfStatement if else SwitchStatement switch SwitchBody CaseLabel case DefaultLabel TryStatement try CatchClause catch FinallyClause finally ReturnStatement return ThrowStatement throw BreakStatement break ContinueStatement continue DebuggerStatement debugger LabeledStatement ExpressionStatement SingleExpression SingleClassItem",
  maxTerm: 380,
  context: V1,
  nodeProps: [
    ["isolate", -8, 5, 6, 14, 37, 39, 51, 53, 55, ""],
    ["group", -26, 9, 17, 19, 68, 207, 211, 215, 216, 218, 221, 224, 234, 237, 243, 245, 247, 249, 252, 258, 264, 266, 268, 270, 272, 274, 275, "Statement", -34, 13, 14, 32, 35, 36, 42, 51, 54, 55, 57, 62, 70, 72, 76, 80, 82, 84, 85, 110, 111, 120, 121, 136, 139, 141, 142, 143, 144, 145, 147, 148, 167, 169, 171, "Expression", -23, 31, 33, 37, 41, 43, 45, 173, 175, 177, 178, 180, 181, 182, 184, 185, 186, 188, 189, 190, 201, 203, 205, 206, "Type", -3, 88, 103, 109, "ClassItem"],
    ["openedBy", 23, "<", 38, "InterpolationStart", 56, "[", 60, "{", 73, "(", 160, "JSXStartCloseTag"],
    ["closedBy", -2, 24, 168, ">", 40, "InterpolationEnd", 50, "]", 61, "}", 74, ")", 165, "JSXEndTag"]
  ],
  propSources: [L1],
  skippedNodes: [0, 5, 6, 278],
  repeatNodeCount: 37,
  tokenData: "$Fq07[R!bOX%ZXY+gYZ-yZ[+g[]%Z]^.c^p%Zpq+gqr/mrs3cst:_tuEruvJSvwLkwx! Yxy!'iyz!(sz{!)}{|!,q|}!.O}!O!,q!O!P!/Y!P!Q!9j!Q!R#:O!R![#<_![!]#I_!]!^#Jk!^!_#Ku!_!`$![!`!a$$v!a!b$*T!b!c$,r!c!}Er!}#O$-|#O#P$/W#P#Q$4o#Q#R$5y#R#SEr#S#T$7W#T#o$8b#o#p$<r#p#q$=h#q#r$>x#r#s$@U#s$f%Z$f$g+g$g#BYEr#BY#BZ$A`#BZ$ISEr$IS$I_$A`$I_$I|Er$I|$I}$Dk$I}$JO$Dk$JO$JTEr$JT$JU$A`$JU$KVEr$KV$KW$A`$KW&FUEr&FU&FV$A`&FV;'SEr;'S;=`I|<%l?HTEr?HT?HU$A`?HUOEr(n%d_$i&j(Wp(Z!bOY%ZYZ&cZr%Zrs&}sw%Zwx(rx!^%Z!^!_*g!_#O%Z#O#P&c#P#o%Z#o#p*g#p;'S%Z;'S;=`+a<%lO%Z&j&hT$i&jO!^&c!_#o&c#p;'S&c;'S;=`&w<%lO&c&j&zP;=`<%l&c'|'U]$i&j(Z!bOY&}YZ&cZw&}wx&cx!^&}!^!_'}!_#O&}#O#P&c#P#o&}#o#p'}#p;'S&};'S;=`(l<%lO&}!b(SU(Z!bOY'}Zw'}x#O'}#P;'S'};'S;=`(f<%lO'}!b(iP;=`<%l'}'|(oP;=`<%l&}'[(y]$i&j(WpOY(rYZ&cZr(rrs&cs!^(r!^!_)r!_#O(r#O#P&c#P#o(r#o#p)r#p;'S(r;'S;=`*a<%lO(rp)wU(WpOY)rZr)rs#O)r#P;'S)r;'S;=`*Z<%lO)rp*^P;=`<%l)r'[*dP;=`<%l(r#S*nX(Wp(Z!bOY*gZr*grs'}sw*gwx)rx#O*g#P;'S*g;'S;=`+Z<%lO*g#S+^P;=`<%l*g(n+dP;=`<%l%Z07[+rq$i&j(Wp(Z!b'|0/lOX%ZXY+gYZ&cZ[+g[p%Zpq+gqr%Zrs&}sw%Zwx(rx!^%Z!^!_*g!_#O%Z#O#P&c#P#o%Z#o#p*g#p$f%Z$f$g+g$g#BY%Z#BY#BZ+g#BZ$IS%Z$IS$I_+g$I_$JT%Z$JT$JU+g$JU$KV%Z$KV$KW+g$KW&FU%Z&FU&FV+g&FV;'S%Z;'S;=`+a<%l?HT%Z?HT?HU+g?HUO%Z07[.ST(X#S$i&j'}0/lO!^&c!_#o&c#p;'S&c;'S;=`&w<%lO&c07[.n_$i&j(Wp(Z!b'}0/lOY%ZYZ&cZr%Zrs&}sw%Zwx(rx!^%Z!^!_*g!_#O%Z#O#P&c#P#o%Z#o#p*g#p;'S%Z;'S;=`+a<%lO%Z)3p/x`$i&j!p),Q(Wp(Z!bOY%ZYZ&cZr%Zrs&}sw%Zwx(rx!^%Z!^!_*g!_!`0z!`#O%Z#O#P&c#P#o%Z#o#p*g#p;'S%Z;'S;=`+a<%lO%Z(KW1V`#v(Ch$i&j(Wp(Z!bOY%ZYZ&cZr%Zrs&}sw%Zwx(rx!^%Z!^!_*g!_!`2X!`#O%Z#O#P&c#P#o%Z#o#p*g#p;'S%Z;'S;=`+a<%lO%Z(KW2d_#v(Ch$i&j(Wp(Z!bOY%ZYZ&cZr%Zrs&}sw%Zwx(rx!^%Z!^!_*g!_#O%Z#O#P&c#P#o%Z#o#p*g#p;'S%Z;'S;=`+a<%lO%Z'At3l_(V':f$i&j(Z!bOY4kYZ5qZr4krs7nsw4kwx5qx!^4k!^!_8p!_#O4k#O#P5q#P#o4k#o#p8p#p;'S4k;'S;=`:X<%lO4k(^4r_$i&j(Z!bOY4kYZ5qZr4krs7nsw4kwx5qx!^4k!^!_8p!_#O4k#O#P5q#P#o4k#o#p8p#p;'S4k;'S;=`:X<%lO4k&z5vX$i&jOr5qrs6cs!^5q!^!_6y!_#o5q#o#p6y#p;'S5q;'S;=`7h<%lO5q&z6jT$d`$i&jO!^&c!_#o&c#p;'S&c;'S;=`&w<%lO&c`6|TOr6yrs7]s;'S6y;'S;=`7b<%lO6y`7bO$d``7eP;=`<%l6y&z7kP;=`<%l5q(^7w]$d`$i&j(Z!bOY&}YZ&cZw&}wx&cx!^&}!^!_'}!_#O&}#O#P&c#P#o&}#o#p'}#p;'S&};'S;=`(l<%lO&}!r8uZ(Z!bOY8pYZ6yZr8prs9hsw8pwx6yx#O8p#O#P6y#P;'S8p;'S;=`:R<%lO8p!r9oU$d`(Z!bOY'}Zw'}x#O'}#P;'S'};'S;=`(f<%lO'}!r:UP;=`<%l8p(^:[P;=`<%l4k%9[:hh$i&j(Wp(Z!bOY%ZYZ&cZq%Zqr<Srs&}st%ZtuCruw%Zwx(rx!^%Z!^!_*g!_!c%Z!c!}Cr!}#O%Z#O#P&c#P#R%Z#R#SCr#S#T%Z#T#oCr#o#p*g#p$g%Z$g;'SCr;'S;=`El<%lOCr(r<__WS$i&j(Wp(Z!bOY<SYZ&cZr<Srs=^sw<Swx@nx!^<S!^!_Bm!_#O<S#O#P>`#P#o<S#o#pBm#p;'S<S;'S;=`Cl<%lO<S(Q=g]WS$i&j(Z!bOY=^YZ&cZw=^wx>`x!^=^!^!_?q!_#O=^#O#P>`#P#o=^#o#p?q#p;'S=^;'S;=`@h<%lO=^&n>gXWS$i&jOY>`YZ&cZ!^>`!^!_?S!_#o>`#o#p?S#p;'S>`;'S;=`?k<%lO>`S?XSWSOY?SZ;'S?S;'S;=`?e<%lO?SS?hP;=`<%l?S&n?nP;=`<%l>`!f?xWWS(Z!bOY?qZw?qwx?Sx#O?q#O#P?S#P;'S?q;'S;=`@b<%lO?q!f@eP;=`<%l?q(Q@kP;=`<%l=^'`@w]WS$i&j(WpOY@nYZ&cZr@nrs>`s!^@n!^!_Ap!_#O@n#O#P>`#P#o@n#o#pAp#p;'S@n;'S;=`Bg<%lO@ntAwWWS(WpOYApZrAprs?Ss#OAp#O#P?S#P;'SAp;'S;=`Ba<%lOAptBdP;=`<%lAp'`BjP;=`<%l@n#WBvYWS(Wp(Z!bOYBmZrBmrs?qswBmwxApx#OBm#O#P?S#P;'SBm;'S;=`Cf<%lOBm#WCiP;=`<%lBm(rCoP;=`<%l<S%9[C}i$i&j(o%1l(Wp(Z!bOY%ZYZ&cZr%Zrs&}st%ZtuCruw%Zwx(rx!Q%Z!Q![Cr![!^%Z!^!_*g!_!c%Z!c!}Cr!}#O%Z#O#P&c#P#R%Z#R#SCr#S#T%Z#T#oCr#o#p*g#p$g%Z$g;'SCr;'S;=`El<%lOCr%9[EoP;=`<%lCr07[FRk$i&j(Wp(Z!b$]#t(T,2j(e$I[OY%ZYZ&cZr%Zrs&}st%ZtuEruw%Zwx(rx}%Z}!OGv!O!Q%Z!Q![Er![!^%Z!^!_*g!_!c%Z!c!}Er!}#O%Z#O#P&c#P#R%Z#R#SEr#S#T%Z#T#oEr#o#p*g#p$g%Z$g;'SEr;'S;=`I|<%lOEr+dHRk$i&j(Wp(Z!b$]#tOY%ZYZ&cZr%Zrs&}st%ZtuGvuw%Zwx(rx}%Z}!OGv!O!Q%Z!Q![Gv![!^%Z!^!_*g!_!c%Z!c!}Gv!}#O%Z#O#P&c#P#R%Z#R#SGv#S#T%Z#T#oGv#o#p*g#p$g%Z$g;'SGv;'S;=`Iv<%lOGv+dIyP;=`<%lGv07[JPP;=`<%lEr(KWJ_`$i&j(Wp(Z!b#p(ChOY%ZYZ&cZr%Zrs&}sw%Zwx(rx!^%Z!^!_*g!_!`Ka!`#O%Z#O#P&c#P#o%Z#o#p*g#p;'S%Z;'S;=`+a<%lO%Z(KWKl_$i&j$Q(Ch(Wp(Z!bOY%ZYZ&cZr%Zrs&}sw%Zwx(rx!^%Z!^!_*g!_#O%Z#O#P&c#P#o%Z#o#p*g#p;'S%Z;'S;=`+a<%lO%Z,#xLva(z+JY$i&j(Wp(Z!bOY%ZYZ&cZr%Zrs&}sv%ZvwM{wx(rx!^%Z!^!_*g!_!`Ka!`#O%Z#O#P&c#P#o%Z#o#p*g#p;'S%Z;'S;=`+a<%lO%Z(KWNW`$i&j#z(Ch(Wp(Z!bOY%ZYZ&cZr%Zrs&}sw%Zwx(rx!^%Z!^!_*g!_!`Ka!`#O%Z#O#P&c#P#o%Z#o#p*g#p;'S%Z;'S;=`+a<%lO%Z'At! c_(Y';W$i&j(WpOY!!bYZ!#hZr!!brs!#hsw!!bwx!$xx!^!!b!^!_!%z!_#O!!b#O#P!#h#P#o!!b#o#p!%z#p;'S!!b;'S;=`!'c<%lO!!b'l!!i_$i&j(WpOY!!bYZ!#hZr!!brs!#hsw!!bwx!$xx!^!!b!^!_!%z!_#O!!b#O#P!#h#P#o!!b#o#p!%z#p;'S!!b;'S;=`!'c<%lO!!b&z!#mX$i&jOw!#hwx6cx!^!#h!^!_!$Y!_#o!#h#o#p!$Y#p;'S!#h;'S;=`!$r<%lO!#h`!$]TOw!$Ywx7]x;'S!$Y;'S;=`!$l<%lO!$Y`!$oP;=`<%l!$Y&z!$uP;=`<%l!#h'l!%R]$d`$i&j(WpOY(rYZ&cZr(rrs&cs!^(r!^!_)r!_#O(r#O#P&c#P#o(r#o#p)r#p;'S(r;'S;=`*a<%lO(r!Q!&PZ(WpOY!%zYZ!$YZr!%zrs!$Ysw!%zwx!&rx#O!%z#O#P!$Y#P;'S!%z;'S;=`!']<%lO!%z!Q!&yU$d`(WpOY)rZr)rs#O)r#P;'S)r;'S;=`*Z<%lO)r!Q!'`P;=`<%l!%z'l!'fP;=`<%l!!b/5|!'t_!l/.^$i&j(Wp(Z!bOY%ZYZ&cZr%Zrs&}sw%Zwx(rx!^%Z!^!_*g!_#O%Z#O#P&c#P#o%Z#o#p*g#p;'S%Z;'S;=`+a<%lO%Z#&U!)O_!k!Lf$i&j(Wp(Z!bOY%ZYZ&cZr%Zrs&}sw%Zwx(rx!^%Z!^!_*g!_#O%Z#O#P&c#P#o%Z#o#p*g#p;'S%Z;'S;=`+a<%lO%Z-!n!*[b$i&j(Wp(Z!b(U%&f#q(ChOY%ZYZ&cZr%Zrs&}sw%Zwx(rxz%Zz{!+d{!^%Z!^!_*g!_!`Ka!`#O%Z#O#P&c#P#o%Z#o#p*g#p;'S%Z;'S;=`+a<%lO%Z(KW!+o`$i&j(Wp(Z!b#n(ChOY%ZYZ&cZr%Zrs&}sw%Zwx(rx!^%Z!^!_*g!_!`Ka!`#O%Z#O#P&c#P#o%Z#o#p*g#p;'S%Z;'S;=`+a<%lO%Z+;x!,|`$i&j(Wp(Z!br+4YOY%ZYZ&cZr%Zrs&}sw%Zwx(rx!^%Z!^!_*g!_!`Ka!`#O%Z#O#P&c#P#o%Z#o#p*g#p;'S%Z;'S;=`+a<%lO%Z,$U!.Z_!]+Jf$i&j(Wp(Z!bOY%ZYZ&cZr%Zrs&}sw%Zwx(rx!^%Z!^!_*g!_#O%Z#O#P&c#P#o%Z#o#p*g#p;'S%Z;'S;=`+a<%lO%Z07[!/ec$i&j(Wp(Z!b!Q.2^OY%ZYZ&cZr%Zrs&}sw%Zwx(rx!O%Z!O!P!0p!P!Q%Z!Q![!3Y![!^%Z!^!_*g!_#O%Z#O#P&c#P#o%Z#o#p*g#p;'S%Z;'S;=`+a<%lO%Z#%|!0ya$i&j(Wp(Z!bOY%ZYZ&cZr%Zrs&}sw%Zwx(rx!O%Z!O!P!2O!P!^%Z!^!_*g!_#O%Z#O#P&c#P#o%Z#o#p*g#p;'S%Z;'S;=`+a<%lO%Z#%|!2Z_![!L^$i&j(Wp(Z!bOY%ZYZ&cZr%Zrs&}sw%Zwx(rx!^%Z!^!_*g!_#O%Z#O#P&c#P#o%Z#o#p*g#p;'S%Z;'S;=`+a<%lO%Z'Ad!3eg$i&j(Wp(Z!bs'9tOY%ZYZ&cZr%Zrs&}sw%Zwx(rx!Q%Z!Q![!3Y![!^%Z!^!_*g!_!g%Z!g!h!4|!h#O%Z#O#P&c#P#R%Z#R#S!3Y#S#X%Z#X#Y!4|#Y#o%Z#o#p*g#p;'S%Z;'S;=`+a<%lO%Z'Ad!5Vg$i&j(Wp(Z!bOY%ZYZ&cZr%Zrs&}sw%Zwx(rx{%Z{|!6n|}%Z}!O!6n!O!Q%Z!Q![!8S![!^%Z!^!_*g!_#O%Z#O#P&c#P#R%Z#R#S!8S#S#o%Z#o#p*g#p;'S%Z;'S;=`+a<%lO%Z'Ad!6wc$i&j(Wp(Z!bOY%ZYZ&cZr%Zrs&}sw%Zwx(rx!Q%Z!Q![!8S![!^%Z!^!_*g!_#O%Z#O#P&c#P#R%Z#R#S!8S#S#o%Z#o#p*g#p;'S%Z;'S;=`+a<%lO%Z'Ad!8_c$i&j(Wp(Z!bs'9tOY%ZYZ&cZr%Zrs&}sw%Zwx(rx!Q%Z!Q![!8S![!^%Z!^!_*g!_#O%Z#O#P&c#P#R%Z#R#S!8S#S#o%Z#o#p*g#p;'S%Z;'S;=`+a<%lO%Z07[!9uf$i&j(Wp(Z!b#o(ChOY!;ZYZ&cZr!;Zrs!<nsw!;Zwx!Lcxz!;Zz{#-}{!P!;Z!P!Q#/d!Q!^!;Z!^!_#(i!_!`#7S!`!a#8i!a!}!;Z!}#O#,f#O#P!Dy#P#o!;Z#o#p#(i#p;'S!;Z;'S;=`#-w<%lO!;Z?O!;fb$i&j(Wp(Z!b!X7`OY!;ZYZ&cZr!;Zrs!<nsw!;Zwx!Lcx!P!;Z!P!Q#&`!Q!^!;Z!^!_#(i!_!}!;Z!}#O#,f#O#P!Dy#P#o!;Z#o#p#(i#p;'S!;Z;'S;=`#-w<%lO!;Z>^!<w`$i&j(Z!b!X7`OY!<nYZ&cZw!<nwx!=yx!P!<n!P!Q!Eq!Q!^!<n!^!_!Gr!_!}!<n!}#O!KS#O#P!Dy#P#o!<n#o#p!Gr#p;'S!<n;'S;=`!L]<%lO!<n<z!>Q^$i&j!X7`OY!=yYZ&cZ!P!=y!P!Q!>|!Q!^!=y!^!_!@c!_!}!=y!}#O!CW#O#P!Dy#P#o!=y#o#p!@c#p;'S!=y;'S;=`!Ek<%lO!=y<z!?Td$i&j!X7`O!^&c!_#W&c#W#X!>|#X#Z&c#Z#[!>|#[#]&c#]#^!>|#^#a&c#a#b!>|#b#g&c#g#h!>|#h#i&c#i#j!>|#j#k!>|#k#m&c#m#n!>|#n#o&c#p;'S&c;'S;=`&w<%lO&c7`!@hX!X7`OY!@cZ!P!@c!P!Q!AT!Q!}!@c!}#O!Ar#O#P!Bq#P;'S!@c;'S;=`!CQ<%lO!@c7`!AYW!X7`#W#X!AT#Z#[!AT#]#^!AT#a#b!AT#g#h!AT#i#j!AT#j#k!AT#m#n!AT7`!AuVOY!ArZ#O!Ar#O#P!B[#P#Q!@c#Q;'S!Ar;'S;=`!Bk<%lO!Ar7`!B_SOY!ArZ;'S!Ar;'S;=`!Bk<%lO!Ar7`!BnP;=`<%l!Ar7`!BtSOY!@cZ;'S!@c;'S;=`!CQ<%lO!@c7`!CTP;=`<%l!@c<z!C][$i&jOY!CWYZ&cZ!^!CW!^!_!Ar!_#O!CW#O#P!DR#P#Q!=y#Q#o!CW#o#p!Ar#p;'S!CW;'S;=`!Ds<%lO!CW<z!DWX$i&jOY!CWYZ&cZ!^!CW!^!_!Ar!_#o!CW#o#p!Ar#p;'S!CW;'S;=`!Ds<%lO!CW<z!DvP;=`<%l!CW<z!EOX$i&jOY!=yYZ&cZ!^!=y!^!_!@c!_#o!=y#o#p!@c#p;'S!=y;'S;=`!Ek<%lO!=y<z!EnP;=`<%l!=y>^!Ezl$i&j(Z!b!X7`OY&}YZ&cZw&}wx&cx!^&}!^!_'}!_#O&}#O#P&c#P#W&}#W#X!Eq#X#Z&}#Z#[!Eq#[#]&}#]#^!Eq#^#a&}#a#b!Eq#b#g&}#g#h!Eq#h#i&}#i#j!Eq#j#k!Eq#k#m&}#m#n!Eq#n#o&}#o#p'}#p;'S&};'S;=`(l<%lO&}8r!GyZ(Z!b!X7`OY!GrZw!Grwx!@cx!P!Gr!P!Q!Hl!Q!}!Gr!}#O!JU#O#P!Bq#P;'S!Gr;'S;=`!J|<%lO!Gr8r!Hse(Z!b!X7`OY'}Zw'}x#O'}#P#W'}#W#X!Hl#X#Z'}#Z#[!Hl#[#]'}#]#^!Hl#^#a'}#a#b!Hl#b#g'}#g#h!Hl#h#i'}#i#j!Hl#j#k!Hl#k#m'}#m#n!Hl#n;'S'};'S;=`(f<%lO'}8r!JZX(Z!bOY!JUZw!JUwx!Arx#O!JU#O#P!B[#P#Q!Gr#Q;'S!JU;'S;=`!Jv<%lO!JU8r!JyP;=`<%l!JU8r!KPP;=`<%l!Gr>^!KZ^$i&j(Z!bOY!KSYZ&cZw!KSwx!CWx!^!KS!^!_!JU!_#O!KS#O#P!DR#P#Q!<n#Q#o!KS#o#p!JU#p;'S!KS;'S;=`!LV<%lO!KS>^!LYP;=`<%l!KS>^!L`P;=`<%l!<n=l!Ll`$i&j(Wp!X7`OY!LcYZ&cZr!Lcrs!=ys!P!Lc!P!Q!Mn!Q!^!Lc!^!_# o!_!}!Lc!}#O#%P#O#P!Dy#P#o!Lc#o#p# o#p;'S!Lc;'S;=`#&Y<%lO!Lc=l!Mwl$i&j(Wp!X7`OY(rYZ&cZr(rrs&cs!^(r!^!_)r!_#O(r#O#P&c#P#W(r#W#X!Mn#X#Z(r#Z#[!Mn#[#](r#]#^!Mn#^#a(r#a#b!Mn#b#g(r#g#h!Mn#h#i(r#i#j!Mn#j#k!Mn#k#m(r#m#n!Mn#n#o(r#o#p)r#p;'S(r;'S;=`*a<%lO(r8Q# vZ(Wp!X7`OY# oZr# ors!@cs!P# o!P!Q#!i!Q!}# o!}#O#$R#O#P!Bq#P;'S# o;'S;=`#$y<%lO# o8Q#!pe(Wp!X7`OY)rZr)rs#O)r#P#W)r#W#X#!i#X#Z)r#Z#[#!i#[#])r#]#^#!i#^#a)r#a#b#!i#b#g)r#g#h#!i#h#i)r#i#j#!i#j#k#!i#k#m)r#m#n#!i#n;'S)r;'S;=`*Z<%lO)r8Q#$WX(WpOY#$RZr#$Rrs!Ars#O#$R#O#P!B[#P#Q# o#Q;'S#$R;'S;=`#$s<%lO#$R8Q#$vP;=`<%l#$R8Q#$|P;=`<%l# o=l#%W^$i&j(WpOY#%PYZ&cZr#%Prs!CWs!^#%P!^!_#$R!_#O#%P#O#P!DR#P#Q!Lc#Q#o#%P#o#p#$R#p;'S#%P;'S;=`#&S<%lO#%P=l#&VP;=`<%l#%P=l#&]P;=`<%l!Lc?O#&kn$i&j(Wp(Z!b!X7`OY%ZYZ&cZr%Zrs&}sw%Zwx(rx!^%Z!^!_*g!_#O%Z#O#P&c#P#W%Z#W#X#&`#X#Z%Z#Z#[#&`#[#]%Z#]#^#&`#^#a%Z#a#b#&`#b#g%Z#g#h#&`#h#i%Z#i#j#&`#j#k#&`#k#m%Z#m#n#&`#n#o%Z#o#p*g#p;'S%Z;'S;=`+a<%lO%Z9d#(r](Wp(Z!b!X7`OY#(iZr#(irs!Grsw#(iwx# ox!P#(i!P!Q#)k!Q!}#(i!}#O#+`#O#P!Bq#P;'S#(i;'S;=`#,`<%lO#(i9d#)th(Wp(Z!b!X7`OY*gZr*grs'}sw*gwx)rx#O*g#P#W*g#W#X#)k#X#Z*g#Z#[#)k#[#]*g#]#^#)k#^#a*g#a#b#)k#b#g*g#g#h#)k#h#i*g#i#j#)k#j#k#)k#k#m*g#m#n#)k#n;'S*g;'S;=`+Z<%lO*g9d#+gZ(Wp(Z!bOY#+`Zr#+`rs!JUsw#+`wx#$Rx#O#+`#O#P!B[#P#Q#(i#Q;'S#+`;'S;=`#,Y<%lO#+`9d#,]P;=`<%l#+`9d#,cP;=`<%l#(i?O#,o`$i&j(Wp(Z!bOY#,fYZ&cZr#,frs!KSsw#,fwx#%Px!^#,f!^!_#+`!_#O#,f#O#P!DR#P#Q!;Z#Q#o#,f#o#p#+`#p;'S#,f;'S;=`#-q<%lO#,f?O#-tP;=`<%l#,f?O#-zP;=`<%l!;Z07[#.[b$i&j(Wp(Z!b(O0/l!X7`OY!;ZYZ&cZr!;Zrs!<nsw!;Zwx!Lcx!P!;Z!P!Q#&`!Q!^!;Z!^!_#(i!_!}!;Z!}#O#,f#O#P!Dy#P#o!;Z#o#p#(i#p;'S!;Z;'S;=`#-w<%lO!;Z07[#/o_$i&j(Wp(Z!bT0/lOY#/dYZ&cZr#/drs#0nsw#/dwx#4Ox!^#/d!^!_#5}!_#O#/d#O#P#1p#P#o#/d#o#p#5}#p;'S#/d;'S;=`#6|<%lO#/d06j#0w]$i&j(Z!bT0/lOY#0nYZ&cZw#0nwx#1px!^#0n!^!_#3R!_#O#0n#O#P#1p#P#o#0n#o#p#3R#p;'S#0n;'S;=`#3x<%lO#0n05W#1wX$i&jT0/lOY#1pYZ&cZ!^#1p!^!_#2d!_#o#1p#o#p#2d#p;'S#1p;'S;=`#2{<%lO#1p0/l#2iST0/lOY#2dZ;'S#2d;'S;=`#2u<%lO#2d0/l#2xP;=`<%l#2d05W#3OP;=`<%l#1p01O#3YW(Z!bT0/lOY#3RZw#3Rwx#2dx#O#3R#O#P#2d#P;'S#3R;'S;=`#3r<%lO#3R01O#3uP;=`<%l#3R06j#3{P;=`<%l#0n05x#4X]$i&j(WpT0/lOY#4OYZ&cZr#4Ors#1ps!^#4O!^!_#5Q!_#O#4O#O#P#1p#P#o#4O#o#p#5Q#p;'S#4O;'S;=`#5w<%lO#4O00^#5XW(WpT0/lOY#5QZr#5Qrs#2ds#O#5Q#O#P#2d#P;'S#5Q;'S;=`#5q<%lO#5Q00^#5tP;=`<%l#5Q05x#5zP;=`<%l#4O01p#6WY(Wp(Z!bT0/lOY#5}Zr#5}rs#3Rsw#5}wx#5Qx#O#5}#O#P#2d#P;'S#5};'S;=`#6v<%lO#5}01p#6yP;=`<%l#5}07[#7PP;=`<%l#/d)3h#7ab$i&j$Q(Ch(Wp(Z!b!X7`OY!;ZYZ&cZr!;Zrs!<nsw!;Zwx!Lcx!P!;Z!P!Q#&`!Q!^!;Z!^!_#(i!_!}!;Z!}#O#,f#O#P!Dy#P#o!;Z#o#p#(i#p;'S!;Z;'S;=`#-w<%lO!;ZAt#8vb$Z#t$i&j(Wp(Z!b!X7`OY!;ZYZ&cZr!;Zrs!<nsw!;Zwx!Lcx!P!;Z!P!Q#&`!Q!^!;Z!^!_#(i!_!}!;Z!}#O#,f#O#P!Dy#P#o!;Z#o#p#(i#p;'S!;Z;'S;=`#-w<%lO!;Z'Ad#:Zp$i&j(Wp(Z!bs'9tOY%ZYZ&cZr%Zrs&}sw%Zwx(rx!O%Z!O!P!3Y!P!Q%Z!Q![#<_![!^%Z!^!_*g!_!g%Z!g!h!4|!h#O%Z#O#P&c#P#R%Z#R#S#<_#S#U%Z#U#V#?i#V#X%Z#X#Y!4|#Y#b%Z#b#c#>_#c#d#Bq#d#l%Z#l#m#Es#m#o%Z#o#p*g#p;'S%Z;'S;=`+a<%lO%Z'Ad#<jk$i&j(Wp(Z!bs'9tOY%ZYZ&cZr%Zrs&}sw%Zwx(rx!O%Z!O!P!3Y!P!Q%Z!Q![#<_![!^%Z!^!_*g!_!g%Z!g!h!4|!h#O%Z#O#P&c#P#R%Z#R#S#<_#S#X%Z#X#Y!4|#Y#b%Z#b#c#>_#c#o%Z#o#p*g#p;'S%Z;'S;=`+a<%lO%Z'Ad#>j_$i&j(Wp(Z!bs'9tOY%ZYZ&cZr%Zrs&}sw%Zwx(rx!^%Z!^!_*g!_#O%Z#O#P&c#P#o%Z#o#p*g#p;'S%Z;'S;=`+a<%lO%Z'Ad#?rd$i&j(Wp(Z!bOY%ZYZ&cZr%Zrs&}sw%Zwx(rx!Q%Z!Q!R#AQ!R!S#AQ!S!^%Z!^!_*g!_#O%Z#O#P&c#P#R%Z#R#S#AQ#S#o%Z#o#p*g#p;'S%Z;'S;=`+a<%lO%Z'Ad#A]f$i&j(Wp(Z!bs'9tOY%ZYZ&cZr%Zrs&}sw%Zwx(rx!Q%Z!Q!R#AQ!R!S#AQ!S!^%Z!^!_*g!_#O%Z#O#P&c#P#R%Z#R#S#AQ#S#b%Z#b#c#>_#c#o%Z#o#p*g#p;'S%Z;'S;=`+a<%lO%Z'Ad#Bzc$i&j(Wp(Z!bOY%ZYZ&cZr%Zrs&}sw%Zwx(rx!Q%Z!Q!Y#DV!Y!^%Z!^!_*g!_#O%Z#O#P&c#P#R%Z#R#S#DV#S#o%Z#o#p*g#p;'S%Z;'S;=`+a<%lO%Z'Ad#Dbe$i&j(Wp(Z!bs'9tOY%ZYZ&cZr%Zrs&}sw%Zwx(rx!Q%Z!Q!Y#DV!Y!^%Z!^!_*g!_#O%Z#O#P&c#P#R%Z#R#S#DV#S#b%Z#b#c#>_#c#o%Z#o#p*g#p;'S%Z;'S;=`+a<%lO%Z'Ad#E|g$i&j(Wp(Z!bOY%ZYZ&cZr%Zrs&}sw%Zwx(rx!Q%Z!Q![#Ge![!^%Z!^!_*g!_!c%Z!c!i#Ge!i#O%Z#O#P&c#P#R%Z#R#S#Ge#S#T%Z#T#Z#Ge#Z#o%Z#o#p*g#p;'S%Z;'S;=`+a<%lO%Z'Ad#Gpi$i&j(Wp(Z!bs'9tOY%ZYZ&cZr%Zrs&}sw%Zwx(rx!Q%Z!Q![#Ge![!^%Z!^!_*g!_!c%Z!c!i#Ge!i#O%Z#O#P&c#P#R%Z#R#S#Ge#S#T%Z#T#Z#Ge#Z#b%Z#b#c#>_#c#o%Z#o#p*g#p;'S%Z;'S;=`+a<%lO%Z*)x#Il_!g$b$i&j$O)Lv(Wp(Z!bOY%ZYZ&cZr%Zrs&}sw%Zwx(rx!^%Z!^!_*g!_#O%Z#O#P&c#P#o%Z#o#p*g#p;'S%Z;'S;=`+a<%lO%Z)[#Jv_al$i&j(Wp(Z!bOY%ZYZ&cZr%Zrs&}sw%Zwx(rx!^%Z!^!_*g!_#O%Z#O#P&c#P#o%Z#o#p*g#p;'S%Z;'S;=`+a<%lO%Z04f#LS^h#)`#R-<U(Wp(Z!b$n7`OY*gZr*grs'}sw*gwx)rx!P*g!P!Q#MO!Q!^*g!^!_#Mt!_!`$ f!`#O*g#P;'S*g;'S;=`+Z<%lO*g(n#MXX$k&j(Wp(Z!bOY*gZr*grs'}sw*gwx)rx#O*g#P;'S*g;'S;=`+Z<%lO*g(El#M}Z#r(Ch(Wp(Z!bOY*gZr*grs'}sw*gwx)rx!_*g!_!`#Np!`#O*g#P;'S*g;'S;=`+Z<%lO*g(El#NyX$Q(Ch(Wp(Z!bOY*gZr*grs'}sw*gwx)rx#O*g#P;'S*g;'S;=`+Z<%lO*g(El$ oX#s(Ch(Wp(Z!bOY*gZr*grs'}sw*gwx)rx#O*g#P;'S*g;'S;=`+Z<%lO*g*)x$!ga#`*!Y$i&j(Wp(Z!bOY%ZYZ&cZr%Zrs&}sw%Zwx(rx!^%Z!^!_*g!_!`0z!`!a$#l!a#O%Z#O#P&c#P#o%Z#o#p*g#p;'S%Z;'S;=`+a<%lO%Z(K[$#w_#k(Cl$i&j(Wp(Z!bOY%ZYZ&cZr%Zrs&}sw%Zwx(rx!^%Z!^!_*g!_#O%Z#O#P&c#P#o%Z#o#p*g#p;'S%Z;'S;=`+a<%lO%Z*)x$%Vag!*r#s(Ch$f#|$i&j(Wp(Z!bOY%ZYZ&cZr%Zrs&}sw%Zwx(rx!^%Z!^!_*g!_!`$&[!`!a$'f!a#O%Z#O#P&c#P#o%Z#o#p*g#p;'S%Z;'S;=`+a<%lO%Z(KW$&g_#s(Ch$i&j(Wp(Z!bOY%ZYZ&cZr%Zrs&}sw%Zwx(rx!^%Z!^!_*g!_#O%Z#O#P&c#P#o%Z#o#p*g#p;'S%Z;'S;=`+a<%lO%Z(KW$'qa#r(Ch$i&j(Wp(Z!bOY%ZYZ&cZr%Zrs&}sw%Zwx(rx!^%Z!^!_*g!_!`Ka!`!a$(v!a#O%Z#O#P&c#P#o%Z#o#p*g#p;'S%Z;'S;=`+a<%lO%Z(KW$)R`#r(Ch$i&j(Wp(Z!bOY%ZYZ&cZr%Zrs&}sw%Zwx(rx!^%Z!^!_*g!_!`Ka!`#O%Z#O#P&c#P#o%Z#o#p*g#p;'S%Z;'S;=`+a<%lO%Z(Kd$*`a(r(Ct$i&j(Wp(Z!bOY%ZYZ&cZr%Zrs&}sw%Zwx(rx!^%Z!^!_*g!_!a%Z!a!b$+e!b#O%Z#O#P&c#P#o%Z#o#p*g#p;'S%Z;'S;=`+a<%lO%Z(KW$+p`$i&j#{(Ch(Wp(Z!bOY%ZYZ&cZr%Zrs&}sw%Zwx(rx!^%Z!^!_*g!_!`Ka!`#O%Z#O#P&c#P#o%Z#o#p*g#p;'S%Z;'S;=`+a<%lO%Z%#`$,}_!|$Ip$i&j(Wp(Z!bOY%ZYZ&cZr%Zrs&}sw%Zwx(rx!^%Z!^!_*g!_#O%Z#O#P&c#P#o%Z#o#p*g#p;'S%Z;'S;=`+a<%lO%Z04f$.X_!S0,v$i&j(Wp(Z!bOY%ZYZ&cZr%Zrs&}sw%Zwx(rx!^%Z!^!_*g!_#O%Z#O#P&c#P#o%Z#o#p*g#p;'S%Z;'S;=`+a<%lO%Z(n$/]Z$i&jO!^$0O!^!_$0f!_#i$0O#i#j$0k#j#l$0O#l#m$2^#m#o$0O#o#p$0f#p;'S$0O;'S;=`$4i<%lO$0O(n$0VT_#S$i&jO!^&c!_#o&c#p;'S&c;'S;=`&w<%lO&c#S$0kO_#S(n$0p[$i&jO!Q&c!Q![$1f![!^&c!_!c&c!c!i$1f!i#T&c#T#Z$1f#Z#o&c#o#p$3|#p;'S&c;'S;=`&w<%lO&c(n$1kZ$i&jO!Q&c!Q![$2^![!^&c!_!c&c!c!i$2^!i#T&c#T#Z$2^#Z#o&c#p;'S&c;'S;=`&w<%lO&c(n$2cZ$i&jO!Q&c!Q![$3U![!^&c!_!c&c!c!i$3U!i#T&c#T#Z$3U#Z#o&c#p;'S&c;'S;=`&w<%lO&c(n$3ZZ$i&jO!Q&c!Q![$0O![!^&c!_!c&c!c!i$0O!i#T&c#T#Z$0O#Z#o&c#p;'S&c;'S;=`&w<%lO&c#S$4PR!Q![$4Y!c!i$4Y#T#Z$4Y#S$4]S!Q![$4Y!c!i$4Y#T#Z$4Y#q#r$0f(n$4lP;=`<%l$0O#1[$4z_!Y#)l$i&j(Wp(Z!bOY%ZYZ&cZr%Zrs&}sw%Zwx(rx!^%Z!^!_*g!_#O%Z#O#P&c#P#o%Z#o#p*g#p;'S%Z;'S;=`+a<%lO%Z(KW$6U`#x(Ch$i&j(Wp(Z!bOY%ZYZ&cZr%Zrs&}sw%Zwx(rx!^%Z!^!_*g!_!`Ka!`#O%Z#O#P&c#P#o%Z#o#p*g#p;'S%Z;'S;=`+a<%lO%Z+;p$7c_$i&j(Wp(Z!b(a+4QOY%ZYZ&cZr%Zrs&}sw%Zwx(rx!^%Z!^!_*g!_#O%Z#O#P&c#P#o%Z#o#p*g#p;'S%Z;'S;=`+a<%lO%Z07[$8qk$i&j(Wp(Z!b(T,2j$_#t(e$I[OY%ZYZ&cZr%Zrs&}st%Ztu$8buw%Zwx(rx}%Z}!O$:f!O!Q%Z!Q![$8b![!^%Z!^!_*g!_!c%Z!c!}$8b!}#O%Z#O#P&c#P#R%Z#R#S$8b#S#T%Z#T#o$8b#o#p*g#p$g%Z$g;'S$8b;'S;=`$<l<%lO$8b+d$:qk$i&j(Wp(Z!b$_#tOY%ZYZ&cZr%Zrs&}st%Ztu$:fuw%Zwx(rx}%Z}!O$:f!O!Q%Z!Q![$:f![!^%Z!^!_*g!_!c%Z!c!}$:f!}#O%Z#O#P&c#P#R%Z#R#S$:f#S#T%Z#T#o$:f#o#p*g#p$g%Z$g;'S$:f;'S;=`$<f<%lO$:f+d$<iP;=`<%l$:f07[$<oP;=`<%l$8b#Jf$<{X!_#Hb(Wp(Z!bOY*gZr*grs'}sw*gwx)rx#O*g#P;'S*g;'S;=`+Z<%lO*g,#x$=sa(y+JY$i&j(Wp(Z!bOY%ZYZ&cZr%Zrs&}sw%Zwx(rx!^%Z!^!_*g!_!`Ka!`#O%Z#O#P&c#P#o%Z#o#p*g#p#q$+e#q;'S%Z;'S;=`+a<%lO%Z)>v$?V_!^(CdvBr$i&j(Wp(Z!bOY%ZYZ&cZr%Zrs&}sw%Zwx(rx!^%Z!^!_*g!_#O%Z#O#P&c#P#o%Z#o#p*g#p;'S%Z;'S;=`+a<%lO%Z?O$@a_!q7`$i&j(Wp(Z!bOY%ZYZ&cZr%Zrs&}sw%Zwx(rx!^%Z!^!_*g!_#O%Z#O#P&c#P#o%Z#o#p*g#p;'S%Z;'S;=`+a<%lO%Z07[$Aq|$i&j(Wp(Z!b'|0/l$]#t(T,2j(e$I[OX%ZXY+gYZ&cZ[+g[p%Zpq+gqr%Zrs&}st%ZtuEruw%Zwx(rx}%Z}!OGv!O!Q%Z!Q![Er![!^%Z!^!_*g!_!c%Z!c!}Er!}#O%Z#O#P&c#P#R%Z#R#SEr#S#T%Z#T#oEr#o#p*g#p$f%Z$f$g+g$g#BYEr#BY#BZ$A`#BZ$ISEr$IS$I_$A`$I_$JTEr$JT$JU$A`$JU$KVEr$KV$KW$A`$KW&FUEr&FU&FV$A`&FV;'SEr;'S;=`I|<%l?HTEr?HT?HU$A`?HUOEr07[$D|k$i&j(Wp(Z!b'}0/l$]#t(T,2j(e$I[OY%ZYZ&cZr%Zrs&}st%ZtuEruw%Zwx(rx}%Z}!OGv!O!Q%Z!Q![Er![!^%Z!^!_*g!_!c%Z!c!}Er!}#O%Z#O#P&c#P#R%Z#R#SEr#S#T%Z#T#oEr#o#p*g#p$g%Z$g;'SEr;'S;=`I|<%lOEr",
  tokenizers: [_1, D1, q1, W1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, E1, new Tr("$S~RRtu[#O#Pg#S#T#|~_P#o#pb~gOx~~jVO#i!P#i#j!U#j#l!P#l#m!q#m;'S!P;'S;=`#v<%lO!P~!UO!U~~!XS!Q![!e!c!i!e#T#Z!e#o#p#Z~!hR!Q![!q!c!i!q#T#Z!q~!tR!Q![!}!c!i!}#T#Z!}~#QR!Q![!P!c!i!P#T#Z!P~#^R!Q![#g!c!i#g#T#Z#g~#jS!Q![#g!c!i#g#T#Z#g#q#r!P~#yP;=`<%l!P~$RO(c~~", 141, 340), new Tr("j~RQYZXz{^~^O(Q~~aP!P!Qd~iO(R~~", 25, 323)],
  topRules: { Script: [0, 7], SingleExpression: [1, 276], SingleClassItem: [2, 277] },
  dialects: { jsx: 0, ts: 15175 },
  dynamicPrecedences: { 80: 1, 82: 1, 94: 1, 169: 1, 199: 1 },
  specialized: [{ term: 327, get: (n) => B1[n] || -1 }, { term: 343, get: (n) => I1[n] || -1 }, { term: 95, get: (n) => j1[n] || -1 }],
  tokenPrec: 15201
}), od = [
  /* @__PURE__ */ be("function ${name}(${params}) {\n	${}\n}", {
    label: "function",
    detail: "definition",
    type: "keyword"
  }),
  /* @__PURE__ */ be("for (let ${index} = 0; ${index} < ${bound}; ${index}++) {\n	${}\n}", {
    label: "for",
    detail: "loop",
    type: "keyword"
  }),
  /* @__PURE__ */ be("for (let ${name} of ${collection}) {\n	${}\n}", {
    label: "for",
    detail: "of loop",
    type: "keyword"
  }),
  /* @__PURE__ */ be("do {\n	${}\n} while (${})", {
    label: "do",
    detail: "loop",
    type: "keyword"
  }),
  /* @__PURE__ */ be("while (${}) {\n	${}\n}", {
    label: "while",
    detail: "loop",
    type: "keyword"
  }),
  /* @__PURE__ */ be(`try {
	\${}
} catch (\${error}) {
	\${}
}`, {
    label: "try",
    detail: "/ catch block",
    type: "keyword"
  }),
  /* @__PURE__ */ be("if (${}) {\n	${}\n}", {
    label: "if",
    detail: "block",
    type: "keyword"
  }),
  /* @__PURE__ */ be(`if (\${}) {
	\${}
} else {
	\${}
}`, {
    label: "if",
    detail: "/ else block",
    type: "keyword"
  }),
  /* @__PURE__ */ be(`class \${name} {
	constructor(\${params}) {
		\${}
	}
}`, {
    label: "class",
    detail: "definition",
    type: "keyword"
  }),
  /* @__PURE__ */ be('import {${names}} from "${module}"\n${}', {
    label: "import",
    detail: "named",
    type: "keyword"
  }),
  /* @__PURE__ */ be('import ${name} from "${module}"\n${}', {
    label: "import",
    detail: "default",
    type: "keyword"
  })
], G1 = /* @__PURE__ */ od.concat([
  /* @__PURE__ */ be("interface ${name} {\n	${}\n}", {
    label: "interface",
    detail: "definition",
    type: "keyword"
  }),
  /* @__PURE__ */ be("type ${name} = ${type}", {
    label: "type",
    detail: "definition",
    type: "keyword"
  }),
  /* @__PURE__ */ be("enum ${name} {\n	${}\n}", {
    label: "enum",
    detail: "definition",
    type: "keyword"
  })
]), Ah = /* @__PURE__ */ new pf(), ld = /* @__PURE__ */ new Set([
  "Script",
  "Block",
  "FunctionExpression",
  "FunctionDeclaration",
  "ArrowFunction",
  "MethodDeclaration",
  "ForStatement"
]);
function Zi(n) {
  return (e, t) => {
    let i = e.node.getChild("VariableDefinition");
    return i && t(i, n), !0;
  };
}
const U1 = ["FunctionDeclaration"], F1 = {
  FunctionDeclaration: /* @__PURE__ */ Zi("function"),
  ClassDeclaration: /* @__PURE__ */ Zi("class"),
  ClassExpression: () => !0,
  EnumDeclaration: /* @__PURE__ */ Zi("constant"),
  TypeAliasDeclaration: /* @__PURE__ */ Zi("type"),
  NamespaceDeclaration: /* @__PURE__ */ Zi("namespace"),
  VariableDefinition(n, e) {
    n.matchContext(U1) || e(n, "variable");
  },
  TypeDefinition(n, e) {
    e(n, "type");
  },
  __proto__: null
};
function ad(n, e) {
  let t = Ah.get(e);
  if (t)
    return t;
  let i = [], r = !0;
  function s(o, l) {
    let a = n.sliceString(o.from, o.to);
    i.push({ label: a, type: l });
  }
  return e.cursor(W.IncludeAnonymous).iterate((o) => {
    if (r)
      r = !1;
    else if (o.name) {
      let l = F1[o.name];
      if (l && l(o, s) || ld.has(o.name))
        return !1;
    } else if (o.to - o.from > 8192) {
      for (let l of ad(n, o.node))
        i.push(l);
      return !1;
    }
  }), Ah.set(e, i), i;
}
const Mh = /^[\w$\xa1-\uffff][\w$\d\xa1-\uffff]*$/, hd = [
  "TemplateString",
  "String",
  "RegExp",
  "LineComment",
  "BlockComment",
  "VariableDefinition",
  "TypeDefinition",
  "Label",
  "PropertyDefinition",
  "PropertyName",
  "PrivatePropertyDefinition",
  "PrivatePropertyName",
  "JSXText",
  "JSXAttributeValue",
  "JSXOpenTag",
  "JSXCloseTag",
  "JSXSelfClosingTag",
  ".",
  "?."
];
function H1(n) {
  let e = K(n.state).resolveInner(n.pos, -1);
  if (hd.indexOf(e.name) > -1)
    return null;
  let t = e.name == "VariableName" || e.to - e.from < 20 && Mh.test(n.state.sliceDoc(e.from, e.to));
  if (!t && !n.explicit)
    return null;
  let i = [];
  for (let r = e; r; r = r.parent)
    ld.has(r.name) && (i = i.concat(ad(n.state.doc, r)));
  return {
    options: i,
    from: t ? e.from : n.pos,
    validFor: Mh
  };
}
const lt = /* @__PURE__ */ Oi.define({
  name: "javascript",
  parser: /* @__PURE__ */ N1.configure({
    props: [
      /* @__PURE__ */ Dr.add({
        IfStatement: /* @__PURE__ */ Fn({ except: /^\s*({|else\b)/ }),
        TryStatement: /* @__PURE__ */ Fn({ except: /^\s*({|catch\b|finally\b)/ }),
        LabeledStatement: Og,
        SwitchBody: (n) => {
          let e = n.textAfter, t = /^\s*\}/.test(e), i = /^\s*(case|default)\b/.test(e);
          return n.baseIndent + (t ? 0 : i ? 1 : 2) * n.unit;
        },
        Block: /* @__PURE__ */ dg({ closing: "}" }),
        ArrowFunction: (n) => n.baseIndent + n.unit,
        "TemplateString BlockComment": () => null,
        "Statement Property": /* @__PURE__ */ Fn({ except: /^\s*{/ }),
        JSXElement(n) {
          let e = /^\s*<\//.test(n.textAfter);
          return n.lineIndent(n.node.from) + (e ? 0 : n.unit);
        },
        JSXEscape(n) {
          let e = /\s*\}/.test(n.textAfter);
          return n.lineIndent(n.node.from) + (e ? 0 : n.unit);
        },
        "JSXOpenTag JSXSelfClosingTag"(n) {
          return n.column(n.node.from) + n.unit;
        }
      }),
      /* @__PURE__ */ qr.add({
        "Block ClassBody SwitchBody EnumBody ObjectExpression ArrayExpression ObjectType": wf,
        BlockComment(n) {
          return { from: n.from + 2, to: n.to - 2 };
        }
      })
    ]
  }),
  languageData: {
    closeBrackets: { brackets: ["(", "[", "{", "'", '"', "`"] },
    commentTokens: { line: "//", block: { open: "/*", close: "*/" } },
    indentOnInput: /^\s*(?:case |default:|\{|\}|<\/)$/,
    wordChars: "$"
  }
}), cd = {
  test: (n) => /^JSX/.test(n.name),
  facet: /* @__PURE__ */ bf({ commentTokens: { block: { open: "{/*", close: "*/}" } } })
}, fd = /* @__PURE__ */ lt.configure({ dialect: "ts" }, "typescript"), ud = /* @__PURE__ */ lt.configure({
  dialect: "jsx",
  props: [/* @__PURE__ */ Jo.add((n) => n.isTop ? [cd] : void 0)]
}), dd = /* @__PURE__ */ lt.configure({
  dialect: "jsx ts",
  props: [/* @__PURE__ */ Jo.add((n) => n.isTop ? [cd] : void 0)]
}, "typescript");
let Od = (n) => ({ label: n, type: "keyword" });
const pd = /* @__PURE__ */ "break case const continue default delete export extends false finally in instanceof let new return static super switch this throw true typeof var yield".split(" ").map(Od), K1 = /* @__PURE__ */ pd.concat(/* @__PURE__ */ ["declare", "implements", "private", "protected", "public"].map(Od));
function J1(n = {}) {
  let e = n.jsx ? n.typescript ? dd : ud : n.typescript ? fd : lt, t = n.typescript ? G1.concat(K1) : od.concat(pd);
  return new el(e, [
    lt.data.of({
      autocomplete: zQ(hd, $u(t))
    }),
    lt.data.of({
      autocomplete: H1
    }),
    n.jsx ? iy : []
  ]);
}
function ey(n) {
  for (; ; ) {
    if (n.name == "JSXOpenTag" || n.name == "JSXSelfClosingTag" || n.name == "JSXFragmentTag")
      return n;
    if (n.name == "JSXEscape" || !n.parent)
      return null;
    n = n.parent;
  }
}
function Rh(n, e, t = n.length) {
  for (let i = e == null ? void 0 : e.firstChild; i; i = i.nextSibling)
    if (i.name == "JSXIdentifier" || i.name == "JSXBuiltin" || i.name == "JSXNamespacedName" || i.name == "JSXMemberExpression")
      return n.sliceString(i.from, Math.min(i.to, t));
  return "";
}
const ty = typeof navigator == "object" && /* @__PURE__ */ /Android\b/.test(navigator.userAgent), iy = /* @__PURE__ */ v.inputHandler.of((n, e, t, i, r) => {
  if ((ty ? n.composing : n.compositionStarted) || n.state.readOnly || e != t || i != ">" && i != "/" || !lt.isActiveAt(n.state, e, -1))
    return !1;
  let s = r(), { state: o } = s, l = o.changeByRange((a) => {
    var h;
    let { head: c } = a, f = K(o).resolveInner(c - 1, -1), u;
    if (f.name == "JSXStartTag" && (f = f.parent), !(o.doc.sliceString(c - 1, c) != i || f.name == "JSXAttributeValue" && f.to > c)) {
      if (i == ">" && f.name == "JSXFragmentTag")
        return { range: a, changes: { from: c, insert: "</>" } };
      if (i == "/" && f.name == "JSXStartCloseTag") {
        let d = f.parent, O = d.parent;
        if (O && d.from == c - 2 && ((u = Rh(o.doc, O.firstChild, c)) || ((h = O.firstChild) === null || h === void 0 ? void 0 : h.name) == "JSXFragmentTag")) {
          let m = `${u}>`;
          return { range: b.cursor(c + m.length, -1), changes: { from: c, insert: m } };
        }
      } else if (i == ">") {
        let d = ey(f);
        if (d && d.name == "JSXOpenTag" && !/^\/?>|^<\//.test(o.doc.sliceString(c, c + 2)) && (u = Rh(o.doc, d, c)))
          return { range: a, changes: { from: c, insert: `</${u}>` } };
      }
    }
    return { range: a };
  });
  return l.changes.empty ? !1 : (n.dispatch([
    s,
    o.update(l, { userEvent: "input.complete", scrollIntoView: !0 })
  ]), !0);
}), Xi = ["_blank", "_self", "_top", "_parent"], Cs = ["ascii", "utf-8", "utf-16", "latin1", "latin1"], Zs = ["get", "post", "put", "delete"], Xs = ["application/x-www-form-urlencoded", "multipart/form-data", "text/plain"], Te = ["true", "false"], X = {}, ny = {
  a: {
    attrs: {
      href: null,
      ping: null,
      type: null,
      media: null,
      target: Xi,
      hreflang: null
    }
  },
  abbr: X,
  address: X,
  area: {
    attrs: {
      alt: null,
      coords: null,
      href: null,
      target: null,
      ping: null,
      media: null,
      hreflang: null,
      type: null,
      shape: ["default", "rect", "circle", "poly"]
    }
  },
  article: X,
  aside: X,
  audio: {
    attrs: {
      src: null,
      mediagroup: null,
      crossorigin: ["anonymous", "use-credentials"],
      preload: ["none", "metadata", "auto"],
      autoplay: ["autoplay"],
      loop: ["loop"],
      controls: ["controls"]
    }
  },
  b: X,
  base: { attrs: { href: null, target: Xi } },
  bdi: X,
  bdo: X,
  blockquote: { attrs: { cite: null } },
  body: X,
  br: X,
  button: {
    attrs: {
      form: null,
      formaction: null,
      name: null,
      value: null,
      autofocus: ["autofocus"],
      disabled: ["autofocus"],
      formenctype: Xs,
      formmethod: Zs,
      formnovalidate: ["novalidate"],
      formtarget: Xi,
      type: ["submit", "reset", "button"]
    }
  },
  canvas: { attrs: { width: null, height: null } },
  caption: X,
  center: X,
  cite: X,
  code: X,
  col: { attrs: { span: null } },
  colgroup: { attrs: { span: null } },
  command: {
    attrs: {
      type: ["command", "checkbox", "radio"],
      label: null,
      icon: null,
      radiogroup: null,
      command: null,
      title: null,
      disabled: ["disabled"],
      checked: ["checked"]
    }
  },
  data: { attrs: { value: null } },
  datagrid: { attrs: { disabled: ["disabled"], multiple: ["multiple"] } },
  datalist: { attrs: { data: null } },
  dd: X,
  del: { attrs: { cite: null, datetime: null } },
  details: { attrs: { open: ["open"] } },
  dfn: X,
  div: X,
  dl: X,
  dt: X,
  em: X,
  embed: { attrs: { src: null, type: null, width: null, height: null } },
  eventsource: { attrs: { src: null } },
  fieldset: { attrs: { disabled: ["disabled"], form: null, name: null } },
  figcaption: X,
  figure: X,
  footer: X,
  form: {
    attrs: {
      action: null,
      name: null,
      "accept-charset": Cs,
      autocomplete: ["on", "off"],
      enctype: Xs,
      method: Zs,
      novalidate: ["novalidate"],
      target: Xi
    }
  },
  h1: X,
  h2: X,
  h3: X,
  h4: X,
  h5: X,
  h6: X,
  head: {
    children: ["title", "base", "link", "style", "meta", "script", "noscript", "command"]
  },
  header: X,
  hgroup: X,
  hr: X,
  html: {
    attrs: { manifest: null }
  },
  i: X,
  iframe: {
    attrs: {
      src: null,
      srcdoc: null,
      name: null,
      width: null,
      height: null,
      sandbox: ["allow-top-navigation", "allow-same-origin", "allow-forms", "allow-scripts"],
      seamless: ["seamless"]
    }
  },
  img: {
    attrs: {
      alt: null,
      src: null,
      ismap: null,
      usemap: null,
      width: null,
      height: null,
      crossorigin: ["anonymous", "use-credentials"]
    }
  },
  input: {
    attrs: {
      alt: null,
      dirname: null,
      form: null,
      formaction: null,
      height: null,
      list: null,
      max: null,
      maxlength: null,
      min: null,
      name: null,
      pattern: null,
      placeholder: null,
      size: null,
      src: null,
      step: null,
      value: null,
      width: null,
      accept: ["audio/*", "video/*", "image/*"],
      autocomplete: ["on", "off"],
      autofocus: ["autofocus"],
      checked: ["checked"],
      disabled: ["disabled"],
      formenctype: Xs,
      formmethod: Zs,
      formnovalidate: ["novalidate"],
      formtarget: Xi,
      multiple: ["multiple"],
      readonly: ["readonly"],
      required: ["required"],
      type: [
        "hidden",
        "text",
        "search",
        "tel",
        "url",
        "email",
        "password",
        "datetime",
        "date",
        "month",
        "week",
        "time",
        "datetime-local",
        "number",
        "range",
        "color",
        "checkbox",
        "radio",
        "file",
        "submit",
        "image",
        "reset",
        "button"
      ]
    }
  },
  ins: { attrs: { cite: null, datetime: null } },
  kbd: X,
  keygen: {
    attrs: {
      challenge: null,
      form: null,
      name: null,
      autofocus: ["autofocus"],
      disabled: ["disabled"],
      keytype: ["RSA"]
    }
  },
  label: { attrs: { for: null, form: null } },
  legend: X,
  li: { attrs: { value: null } },
  link: {
    attrs: {
      href: null,
      type: null,
      hreflang: null,
      media: null,
      sizes: ["all", "16x16", "16x16 32x32", "16x16 32x32 64x64"]
    }
  },
  map: { attrs: { name: null } },
  mark: X,
  menu: { attrs: { label: null, type: ["list", "context", "toolbar"] } },
  meta: {
    attrs: {
      content: null,
      charset: Cs,
      name: ["viewport", "application-name", "author", "description", "generator", "keywords"],
      "http-equiv": ["content-language", "content-type", "default-style", "refresh"]
    }
  },
  meter: { attrs: { value: null, min: null, low: null, high: null, max: null, optimum: null } },
  nav: X,
  noscript: X,
  object: {
    attrs: {
      data: null,
      type: null,
      name: null,
      usemap: null,
      form: null,
      width: null,
      height: null,
      typemustmatch: ["typemustmatch"]
    }
  },
  ol: {
    attrs: { reversed: ["reversed"], start: null, type: ["1", "a", "A", "i", "I"] },
    children: ["li", "script", "template", "ul", "ol"]
  },
  optgroup: { attrs: { disabled: ["disabled"], label: null } },
  option: { attrs: { disabled: ["disabled"], label: null, selected: ["selected"], value: null } },
  output: { attrs: { for: null, form: null, name: null } },
  p: X,
  param: { attrs: { name: null, value: null } },
  pre: X,
  progress: { attrs: { value: null, max: null } },
  q: { attrs: { cite: null } },
  rp: X,
  rt: X,
  ruby: X,
  samp: X,
  script: {
    attrs: {
      type: ["text/javascript"],
      src: null,
      async: ["async"],
      defer: ["defer"],
      charset: Cs
    }
  },
  section: X,
  select: {
    attrs: {
      form: null,
      name: null,
      size: null,
      autofocus: ["autofocus"],
      disabled: ["disabled"],
      multiple: ["multiple"]
    }
  },
  slot: { attrs: { name: null } },
  small: X,
  source: { attrs: { src: null, type: null, media: null } },
  span: X,
  strong: X,
  style: {
    attrs: {
      type: ["text/css"],
      media: null,
      scoped: null
    }
  },
  sub: X,
  summary: X,
  sup: X,
  table: X,
  tbody: X,
  td: { attrs: { colspan: null, rowspan: null, headers: null } },
  template: X,
  textarea: {
    attrs: {
      dirname: null,
      form: null,
      maxlength: null,
      name: null,
      placeholder: null,
      rows: null,
      cols: null,
      autofocus: ["autofocus"],
      disabled: ["disabled"],
      readonly: ["readonly"],
      required: ["required"],
      wrap: ["soft", "hard"]
    }
  },
  tfoot: X,
  th: { attrs: { colspan: null, rowspan: null, headers: null, scope: ["row", "col", "rowgroup", "colgroup"] } },
  thead: X,
  time: { attrs: { datetime: null } },
  title: X,
  tr: X,
  track: {
    attrs: {
      src: null,
      label: null,
      default: null,
      kind: ["subtitles", "captions", "descriptions", "chapters", "metadata"],
      srclang: null
    }
  },
  ul: { children: ["li", "script", "template", "ul", "ol"] },
  var: X,
  video: {
    attrs: {
      src: null,
      poster: null,
      width: null,
      height: null,
      crossorigin: ["anonymous", "use-credentials"],
      preload: ["auto", "metadata", "none"],
      autoplay: ["autoplay"],
      mediagroup: ["movie"],
      muted: ["muted"],
      controls: ["controls"]
    }
  },
  wbr: X
}, md = {
  accesskey: null,
  class: null,
  contenteditable: Te,
  contextmenu: null,
  dir: ["ltr", "rtl", "auto"],
  draggable: ["true", "false", "auto"],
  dropzone: ["copy", "move", "link", "string:", "file:"],
  hidden: ["hidden"],
  id: null,
  inert: ["inert"],
  itemid: null,
  itemprop: null,
  itemref: null,
  itemscope: ["itemscope"],
  itemtype: null,
  lang: ["ar", "bn", "de", "en-GB", "en-US", "es", "fr", "hi", "id", "ja", "pa", "pt", "ru", "tr", "zh"],
  spellcheck: Te,
  autocorrect: Te,
  autocapitalize: Te,
  style: null,
  tabindex: null,
  title: null,
  translate: ["yes", "no"],
  rel: ["stylesheet", "alternate", "author", "bookmark", "help", "license", "next", "nofollow", "noreferrer", "prefetch", "prev", "search", "tag"],
  role: /* @__PURE__ */ "alert application article banner button cell checkbox complementary contentinfo dialog document feed figure form grid gridcell heading img list listbox listitem main navigation region row rowgroup search switch tab table tabpanel textbox timer".split(" "),
  "aria-activedescendant": null,
  "aria-atomic": Te,
  "aria-autocomplete": ["inline", "list", "both", "none"],
  "aria-busy": Te,
  "aria-checked": ["true", "false", "mixed", "undefined"],
  "aria-controls": null,
  "aria-describedby": null,
  "aria-disabled": Te,
  "aria-dropeffect": null,
  "aria-expanded": ["true", "false", "undefined"],
  "aria-flowto": null,
  "aria-grabbed": ["true", "false", "undefined"],
  "aria-haspopup": Te,
  "aria-hidden": Te,
  "aria-invalid": ["true", "false", "grammar", "spelling"],
  "aria-label": null,
  "aria-labelledby": null,
  "aria-level": null,
  "aria-live": ["off", "polite", "assertive"],
  "aria-multiline": Te,
  "aria-multiselectable": Te,
  "aria-owns": null,
  "aria-posinset": null,
  "aria-pressed": ["true", "false", "mixed", "undefined"],
  "aria-readonly": Te,
  "aria-relevant": null,
  "aria-required": Te,
  "aria-selected": ["true", "false", "undefined"],
  "aria-setsize": null,
  "aria-sort": ["ascending", "descending", "none", "other"],
  "aria-valuemax": null,
  "aria-valuemin": null,
  "aria-valuenow": null,
  "aria-valuetext": null
}, gd = /* @__PURE__ */ "beforeunload copy cut dragstart dragover dragleave dragenter dragend drag paste focus blur change click load mousedown mouseenter mouseleave mouseup keydown keyup resize scroll unload".split(" ").map((n) => "on" + n);
for (let n of gd)
  md[n] = null;
class Xr {
  constructor(e, t) {
    this.tags = { ...ny, ...e }, this.globalAttrs = { ...md, ...t }, this.allTags = Object.keys(this.tags), this.globalAttrNames = Object.keys(this.globalAttrs);
  }
}
Xr.default = /* @__PURE__ */ new Xr();
function Qi(n, e, t = n.length) {
  if (!e)
    return "";
  let i = e.firstChild, r = i && i.getChild("TagName");
  return r ? n.sliceString(r.from, Math.min(r.to, t)) : "";
}
function bi(n, e = !1) {
  for (; n; n = n.parent)
    if (n.name == "Element")
      if (e)
        e = !1;
      else
        return n;
  return null;
}
function Qd(n, e, t) {
  let i = t.tags[Qi(n, bi(e))];
  return (i == null ? void 0 : i.children) || t.allTags;
}
function xl(n, e) {
  let t = [];
  for (let i = bi(e); i && !i.type.isTop; i = bi(i.parent)) {
    let r = Qi(n, i);
    if (r && i.lastChild.name == "CloseTag")
      break;
    r && t.indexOf(r) < 0 && (e.name == "EndTag" || e.from >= i.firstChild.to) && t.push(r);
  }
  return t;
}
const bd = /^[:\-\.\w\u00b7-\uffff]*$/;
function zh(n, e, t, i, r) {
  let s = /\s*>/.test(n.sliceDoc(r, r + 5)) ? "" : ">", o = bi(t, t.name == "StartTag" || t.name == "TagName");
  return {
    from: i,
    to: r,
    options: Qd(n.doc, o, e).map((l) => ({ label: l, type: "type" })).concat(xl(n.doc, t).map((l, a) => ({
      label: "/" + l,
      apply: "/" + l + s,
      type: "type",
      boost: 99 - a
    }))),
    validFor: /^\/?[:\-\.\w\u00b7-\uffff]*$/
  };
}
function Yh(n, e, t, i) {
  let r = /\s*>/.test(n.sliceDoc(i, i + 5)) ? "" : ">";
  return {
    from: t,
    to: i,
    options: xl(n.doc, e).map((s, o) => ({ label: s, apply: s + r, type: "type", boost: 99 - o })),
    validFor: bd
  };
}
function ry(n, e, t, i) {
  let r = [], s = 0;
  for (let o of Qd(n.doc, t, e))
    r.push({ label: "<" + o, type: "type" });
  for (let o of xl(n.doc, t))
    r.push({ label: "</" + o + ">", type: "type", boost: 99 - s++ });
  return { from: i, to: i, options: r, validFor: /^<\/?[:\-\.\w\u00b7-\uffff]*$/ };
}
function sy(n, e, t, i, r) {
  let s = bi(t), o = s ? e.tags[Qi(n.doc, s)] : null, l = o && o.attrs ? Object.keys(o.attrs) : [], a = o && o.globalAttrs === !1 ? l : l.length ? l.concat(e.globalAttrNames) : e.globalAttrNames;
  return {
    from: i,
    to: r,
    options: a.map((h) => ({ label: h, type: "property" })),
    validFor: bd
  };
}
function oy(n, e, t, i, r) {
  var s;
  let o = (s = t.parent) === null || s === void 0 ? void 0 : s.getChild("AttributeName"), l = [], a;
  if (o) {
    let h = n.sliceDoc(o.from, o.to), c = e.globalAttrs[h];
    if (!c) {
      let f = bi(t), u = f ? e.tags[Qi(n.doc, f)] : null;
      c = (u == null ? void 0 : u.attrs) && u.attrs[h];
    }
    if (c) {
      let f = n.sliceDoc(i, r).toLowerCase(), u = '"', d = '"';
      /^['"]/.test(f) ? (a = f[0] == '"' ? /^[^"]*$/ : /^[^']*$/, u = "", d = n.sliceDoc(r, r + 1) == f[0] ? "" : f[0], f = f.slice(1), i++) : a = /^[^\s<>='"]*$/;
      for (let O of c)
        l.push({ label: O, apply: u + O + d, type: "constant" });
    }
  }
  return { from: i, to: r, options: l, validFor: a };
}
function ly(n, e) {
  let { state: t, pos: i } = e, r = K(t).resolveInner(i, -1), s = r.resolve(i);
  for (let o = i, l; s == r && (l = r.childBefore(o)); ) {
    let a = l.lastChild;
    if (!a || !a.type.isError || a.from < a.to)
      break;
    s = r = l, o = a.from;
  }
  return r.name == "TagName" ? r.parent && /CloseTag$/.test(r.parent.name) ? Yh(t, r, r.from, i) : zh(t, n, r, r.from, i) : r.name == "StartTag" || r.name == "IncompleteTag" ? zh(t, n, r, i, i) : r.name == "StartCloseTag" || r.name == "IncompleteCloseTag" ? Yh(t, r, i, i) : r.name == "OpenTag" || r.name == "SelfClosingTag" || r.name == "AttributeName" ? sy(t, n, r, r.name == "AttributeName" ? r.from : i, i) : r.name == "Is" || r.name == "AttributeValue" || r.name == "UnquotedAttributeValue" ? oy(t, n, r, r.name == "Is" ? i : r.from, i) : e.explicit && (s.name == "Element" || s.name == "Text" || s.name == "Document") ? ry(t, n, r, i) : null;
}
function ay(n) {
  let { extraTags: e, extraGlobalAttributes: t } = n, i = t || e ? new Xr(e, t) : Xr.default;
  return (r) => ly(i, r);
}
const hy = /* @__PURE__ */ lt.parser.configure({ top: "SingleExpression" }), Sd = [
  {
    tag: "script",
    attrs: (n) => n.type == "text/typescript" || n.lang == "ts",
    parser: fd.parser
  },
  {
    tag: "script",
    attrs: (n) => n.type == "text/babel" || n.type == "text/jsx",
    parser: ud.parser
  },
  {
    tag: "script",
    attrs: (n) => n.type == "text/typescript-jsx",
    parser: dd.parser
  },
  {
    tag: "script",
    attrs(n) {
      return /^(importmap|speculationrules|application\/(.+\+)?json)$/i.test(n.type);
    },
    parser: hy
  },
  {
    tag: "script",
    attrs(n) {
      return !n.type || /^(?:text|application)\/(?:x-)?(?:java|ecma)script$|^module$|^$/i.test(n.type);
    },
    parser: lt.parser
  },
  {
    tag: "style",
    attrs(n) {
      return (!n.lang || n.lang == "css") && (!n.type || /^(text\/)?(x-)?(stylesheet|css)$/i.test(n.type));
    },
    parser: Zr.parser
  }
], yd = /* @__PURE__ */ [
  {
    name: "style",
    parser: /* @__PURE__ */ Zr.parser.configure({ top: "Styles" })
  }
].concat(/* @__PURE__ */ gd.map((n) => ({ name: n, parser: lt.parser }))), xd = /* @__PURE__ */ Oi.define({
  name: "html",
  parser: /* @__PURE__ */ RS.configure({
    props: [
      /* @__PURE__ */ Dr.add({
        Element(n) {
          let e = /^(\s*)(<\/)?/.exec(n.textAfter);
          return n.node.to <= n.pos + e[0].length ? n.continue() : n.lineIndent(n.node.from) + (e[2] ? 0 : n.unit);
        },
        "OpenTag CloseTag SelfClosingTag"(n) {
          return n.column(n.node.from) + n.unit;
        },
        Document(n) {
          if (n.pos + /\s*/.exec(n.textAfter)[0].length < n.node.to)
            return n.continue();
          let e = null, t;
          for (let i = n.node; ; ) {
            let r = i.lastChild;
            if (!r || r.name != "Element" || r.to != i.to)
              break;
            e = i = r;
          }
          return e && !((t = e.lastChild) && (t.name == "CloseTag" || t.name == "SelfClosingTag")) ? n.lineIndent(e.from) + n.unit : null;
        }
      }),
      /* @__PURE__ */ qr.add({
        Element(n) {
          let e = n.firstChild, t = n.lastChild;
          return !e || e.name != "OpenTag" ? null : { from: e.to, to: t.name == "CloseTag" ? t.from : n.to };
        }
      }),
      /* @__PURE__ */ zf.add({
        "OpenTag CloseTag": (n) => n.getChild("TagName")
      })
    ]
  }),
  languageData: {
    commentTokens: { block: { open: "<!--", close: "-->" } },
    indentOnInput: /^\s*<\/\w+\W$/,
    wordChars: "-_"
  }
}), Jn = /* @__PURE__ */ xd.configure({
  wrap: /* @__PURE__ */ Ju(Sd, yd)
});
function Vh(n = {}) {
  let e = "", t;
  n.matchClosingTags === !1 && (e = "noMatch"), n.selfClosingTags === !0 && (e = (e ? e + " " : "") + "selfClosing"), (n.nestedLanguages && n.nestedLanguages.length || n.nestedAttributes && n.nestedAttributes.length) && (t = Ju((n.nestedLanguages || []).concat(Sd), (n.nestedAttributes || []).concat(yd)));
  let i = t ? xd.configure({ wrap: t, dialect: e }) : e ? Jn.configure({ dialect: e }) : Jn;
  return new el(i, [
    Jn.data.of({ autocomplete: ay(n) }),
    n.autoCloseTags !== !1 ? cy : [],
    J1().support,
    m1().support
  ]);
}
const Eh = /* @__PURE__ */ new Set(/* @__PURE__ */ "area base br col command embed frame hr img input keygen link meta param source track wbr menuitem".split(" ")), cy = /* @__PURE__ */ v.inputHandler.of((n, e, t, i, r) => {
  if (n.composing || n.state.readOnly || e != t || i != ">" && i != "/" || !Jn.isActiveAt(n.state, e, -1))
    return !1;
  let s = r(), { state: o } = s, l = o.changeByRange((a) => {
    var h, c, f;
    let u = o.doc.sliceString(a.from - 1, a.to) == i, { head: d } = a, O = K(o).resolveInner(d, -1), m;
    if (u && i == ">" && O.name == "EndTag") {
      let g = O.parent;
      if (((c = (h = g.parent) === null || h === void 0 ? void 0 : h.lastChild) === null || c === void 0 ? void 0 : c.name) != "CloseTag" && (m = Qi(o.doc, g.parent, d)) && !Eh.has(m)) {
        let Q = d + (o.doc.sliceString(d, d + 1) === ">" ? 1 : 0), S = `</${m}>`;
        return { range: a, changes: { from: d, to: Q, insert: S } };
      }
    } else if (u && i == "/" && O.name == "IncompleteCloseTag") {
      let g = O.parent;
      if (O.from == d - 2 && ((f = g.lastChild) === null || f === void 0 ? void 0 : f.name) != "CloseTag" && (m = Qi(o.doc, g, d)) && !Eh.has(m)) {
        let Q = d + (o.doc.sliceString(d, d + 1) === ">" ? 1 : 0), S = `${m}>`;
        return {
          range: b.cursor(d + S.length, -1),
          changes: { from: d, to: Q, insert: S }
        };
      }
    }
    return { range: a };
  });
  return l.changes.empty ? !1 : (n.dispatch([
    s,
    o.update(l, {
      userEvent: "input.complete",
      scrollIntoView: !0
    })
  ]), !0);
}), fy = [
  // Highlight {{ }} output expressions
  {
    regexp: /\{\{([^}]*)\}\}/g,
    decoration: Z.mark({ class: "cm-scriban-output" })
  },
  // Highlight {~ ~} tags
  {
    regexp: /\{~([^~]*)~\}/g,
    decoration: Z.mark({ class: "cm-scriban-tag" })
  },
  // Highlight {# #} comments
  {
    regexp: /\{#([^#]*)#\}/g,
    decoration: Z.mark({ class: "cm-scriban-comment" })
  }
], uy = [
  // Functions like string.capitalize, math.round, etc.
  {
    regexp: /\b(string|math|array|date|object|html|regex|timespan)\.\w+/g,
    decoration: Z.mark({ class: "cm-scriban-function" })
  },
  // Parameters (named and positional) - only after pipe + function
  // This matches the entire "| function params..." section and extracts parameters
  {
    regexp: /\|\s*(?:string|math|array|date|object|html|regex|timespan)\.\w+\s+((?:(?:\w+:\s*)?(?:"(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*'|\d+\.?\d*|\b(?!if|for|else|end|in\b)\w+)(?:\s+|(?=\}\}|~\}|\|)))+)/g,
    decoration: Z.mark({ class: "cm-scriban-function-param" }),
    captureGroup: 1,
    insideBracketsOnly: !0
  }
], dy = v.theme({
  "&": {
    height: "100%"
  },
  ".cm-scroller": {
    overflow: "auto",
    maxHeight: "100%"
  }
}), Oy = v.baseTheme({
  // Dark theme styles
  "&dark .cm-scriban-output": {
    backgroundColor: "rgba(86, 156, 214, 0.15)"
  },
  "&dark .cm-scriban-tag": {
    backgroundColor: "rgba(197, 134, 192, 0.15)"
  },
  "&dark .cm-scriban-comment": {
    backgroundColor: "rgba(106, 153, 85, 0.15)",
    color: "#6a9955",
    fontStyle: "italic"
  },
  "&dark .cm-scriban-function": {
    color: "#dcdcaa",
    fontWeight: "600"
  },
  "&dark .cm-scriban-function-param": {
    color: "#ce9178"
  },
  // Light theme styles
  "&light .cm-scriban-output": {
    backgroundColor: "rgba(0, 120, 215, 0.08)"
  },
  "&light .cm-scriban-tag": {
    backgroundColor: "rgba(175, 0, 219, 0.08)"
  },
  "&light .cm-scriban-comment": {
    backgroundColor: "rgba(0, 128, 0, 0.08)",
    color: "#008000",
    fontStyle: "italic"
  },
  "&light .cm-scriban-function": {
    color: "#795e26",
    fontWeight: "600"
  },
  "&light .cm-scriban-function-param": {
    color: "#a31515"
  }
}), _h = v.theme({
  "&": {
    backgroundColor: "#1e1e1e",
    color: "#d4d4d4"
  },
  ".cm-content": {
    caretColor: "#aeafad",
    fontFamily: 'Consolas, "Courier New", monospace',
    fontSize: "14px"
  },
  ".cm-cursor, .cm-dropCursor": {
    borderLeftColor: "#aeafad"
  },
  "&.cm-focused .cm-selectionBackground, .cm-selectionBackground, .cm-content ::selection": {
    backgroundColor: "#264f78 !important"
  },
  ".cm-activeLine": {
    backgroundColor: "transparent",
    boxShadow: "inset 0 1px 0 0 #3e3e42, inset 0 -1px 0 0 #3e3e42"
  },
  ".cm-gutters": {
    backgroundColor: "#1e1e1e",
    color: "#858585",
    border: "none"
  },
  ".cm-activeLineGutter": {
    backgroundColor: "transparent"
  },
  ".cm-lineNumbers .cm-gutterElement": {
    color: "#858585"
  },
  // Autocomplete tooltip positioning
  ".cm-tooltip-autocomplete .cm-tooltip": {
    top: "0 !important"
  },
  // Scriban autocomplete tooltip - dark theme
  ".cm-scriban-tooltip": {
    padding: "8px 10px",
    maxWidth: "400px",
    fontFamily: 'Consolas, "Courier New", monospace',
    fontSize: "13px",
    lineHeight: "1.5"
  },
  ".cm-scriban-tooltip-title": {
    color: "#dcdcaa",
    fontWeight: "600",
    marginBottom: "6px"
  },
  ".cm-scriban-tooltip-description": {
    color: "#d4d4d4",
    marginBottom: "8px"
  },
  ".cm-scriban-tooltip-params-title": {
    color: "#569cd6",
    fontSize: "12px",
    fontWeight: "600",
    marginTop: "6px",
    marginBottom: "4px"
  },
  ".cm-scriban-tooltip-param": {
    color: "#d4d4d4",
    paddingLeft: "12px",
    marginBottom: "2px"
  },
  ".cm-scriban-tooltip-param-name": {
    color: "#9cdcfe",
    fontWeight: "500"
  },
  ".cm-scriban-tooltip-param-desc": {
    color: "#d4d4d4"
  }
}, { dark: !0 }), Dh = yi.define([
  { tag: p.comment, color: "#6a9955" },
  { tag: p.keyword, color: "#569cd6" },
  { tag: [p.string, p.special(p.brace)], color: "#ce9178" },
  { tag: p.number, color: "#b5cea8" },
  { tag: p.bool, color: "#569cd6" },
  { tag: p.null, color: "#569cd6" },
  { tag: p.operator, color: "#d4d4d4" },
  { tag: p.className, color: "#4ec9b0" },
  { tag: p.definition(p.typeName), color: "#4ec9b0" },
  { tag: p.typeName, color: "#4ec9b0" },
  { tag: p.angleBracket, color: "#808080" },
  { tag: p.tagName, color: "#569cd6" },
  { tag: p.attributeName, color: "#9cdcfe" },
  { tag: p.attributeValue, color: "#ce9178" },
  { tag: p.propertyName, color: "#9cdcfe" },
  { tag: p.variableName, color: "#9cdcfe" },
  { tag: p.function(p.variableName), color: "#dcdcaa" },
  { tag: p.definition(p.variableName), color: "#9cdcfe" }
]), py = v.theme({
  "&": {
    backgroundColor: "#ffffff",
    color: "#000000"
  },
  ".cm-content": {
    caretColor: "#000000",
    fontFamily: 'Consolas, "Courier New", monospace',
    fontSize: "14px"
  },
  ".cm-cursor, .cm-dropCursor": {
    borderLeftColor: "#000000"
  },
  "&.cm-focused .cm-selectionBackground, .cm-selectionBackground, .cm-content ::selection": {
    backgroundColor: "#add6ff !important"
  },
  ".cm-activeLine": {
    backgroundColor: "transparent",
    boxShadow: "inset 0 1px 0 0 #d4d4d4, inset 0 -1px 0 0 #d4d4d4"
  },
  ".cm-gutters": {
    backgroundColor: "#f5f5f5",
    color: "#237893",
    border: "none"
  },
  ".cm-activeLineGutter": {
    backgroundColor: "transparent"
  },
  ".cm-lineNumbers .cm-gutterElement": {
    color: "#237893"
  },
  // Autocomplete tooltip positioning
  ".cm-tooltip-autocomplete .cm-tooltip": {
    top: "0 !important"
  },
  // Scriban autocomplete tooltip - light theme
  ".cm-scriban-tooltip": {
    padding: "8px 10px",
    maxWidth: "400px",
    fontFamily: 'Consolas, "Courier New", monospace',
    fontSize: "13px",
    lineHeight: "1.5"
  },
  ".cm-scriban-tooltip-title": {
    color: "#795e26",
    fontWeight: "600",
    marginBottom: "6px"
  },
  ".cm-scriban-tooltip-description": {
    color: "#000000",
    marginBottom: "8px"
  },
  ".cm-scriban-tooltip-params-title": {
    color: "#0000ff",
    fontSize: "12px",
    fontWeight: "600",
    marginTop: "6px",
    marginBottom: "4px"
  },
  ".cm-scriban-tooltip-param": {
    color: "#000000",
    paddingLeft: "12px",
    marginBottom: "2px"
  },
  ".cm-scriban-tooltip-param-name": {
    color: "#001080",
    fontWeight: "500"
  },
  ".cm-scriban-tooltip-param-desc": {
    color: "#000000"
  }
}, { dark: !1 }), my = yi.define([
  { tag: p.comment, color: "#008000" },
  { tag: p.keyword, color: "#0000ff" },
  { tag: [p.string, p.special(p.brace)], color: "#a31515" },
  { tag: p.number, color: "#098658" },
  { tag: p.bool, color: "#0000ff" },
  { tag: p.null, color: "#0000ff" },
  { tag: p.operator, color: "#000000" },
  { tag: p.className, color: "#267f99" },
  { tag: p.definition(p.typeName), color: "#267f99" },
  { tag: p.typeName, color: "#267f99" },
  { tag: p.angleBracket, color: "#800000" },
  { tag: p.tagName, color: "#800000" },
  { tag: p.attributeName, color: "#ff0000" },
  { tag: p.attributeValue, color: "#0000ff" },
  { tag: p.propertyName, color: "#ff0000" },
  { tag: p.variableName, color: "#001080" },
  { tag: p.function(p.variableName), color: "#795e26" },
  { tag: p.definition(p.variableName), color: "#001080" }
]), gy = ee.fromClass(class {
  constructor(n) {
    kl(this, "decorations");
    this.decorations = this.buildDecorations(n);
  }
  update(n) {
    (n.docChanged || n.viewportChanged) && (this.decorations = this.buildDecorations(n.view));
  }
  buildDecorations(n) {
    const e = [], i = n.state.doc.toString();
    for (const { regexp: r, decoration: s } of fy) {
      const o = new RegExp(r.source, r.flags);
      let l;
      for (; (l = o.exec(i)) !== null; ) {
        const a = l.index, h = a + l[0].length;
        e.push(s.range(a, h));
      }
    }
    for (const { regexp: r, decoration: s, captureGroup: o, insideBracketsOnly: l } of uy) {
      const a = new RegExp(r.source, r.flags);
      let h;
      for (; (h = a.exec(i)) !== null; ) {
        const c = h.index, f = i.substring(0, c), u = f.lastIndexOf("{{"), d = f.lastIndexOf("}}"), O = f.lastIndexOf("{~"), m = f.lastIndexOf("~}"), g = u > d, Q = O > m;
        if (!l || g || Q)
          if (o && h[o]) {
            const y = h.index + h[0].indexOf(h[o]), k = y + h[o].length;
            e.push(s.range(y, k));
          } else {
            const y = h.index, k = y + h[0].length;
            e.push(s.range(y, k));
          }
      }
    }
    return e.sort((r, s) => r.from - s.from), Z.set(e);
  }
}, {
  decorations: (n) => n.decorations
});
function wd(n, e = "", t = []) {
  if (!Array.isArray(n))
    return t;
  for (const i of n) {
    if (!i || !i.name) continue;
    const r = e ? `${e}.${i.name}` : i.name, s = i.childVars && i.childVars.length > 0;
    t.push({
      label: r,
      type: "variable",
      info: s ? "object" : "property"
    }), s && wd(i.childVars, r, t);
  }
  return t;
}
function Qy(n, e) {
  n.substring(0, e);
  const t = /\{~\s*for\s+(\w+)\s+in\s+([\w.]+)\s*~\}/g, i = [];
  let r;
  for (; (r = t.exec(n)) !== null; ) {
    const s = r.index, o = r[1], l = r[2], h = n.substring(r.index + r[0].length).match(/\{~\s*end\s*~\}/);
    if (h) {
      const c = r.index + r[0].length + h.index;
      e >= s && e <= c && i.push({ variable: o, arrayPath: l });
    }
  }
  return i;
}
function by(n, e) {
  const t = n.split(".");
  let i = e;
  for (const r of t)
    if (i && i[r])
      i = i[r];
    else
      return [];
  return Array.isArray(i) && i.length > 0 && typeof i[0] == "object" ? Object.keys(i[0]) : [];
}
function Ft(n) {
  if (!n._scribanEditor)
    throw new Error("Editor not initialized. Call initEditor first.");
  return n._scribanEditor;
}
function Sy(n, e) {
  const t = Ft(n), i = e.state.doc.sliceString(Math.max(0, e.pos - 100), e.pos), r = /\{\{[^}]*$/.test(i), s = /\{~[^~]*$/.test(i);
  if (!r && !s) return null;
  const o = e.matchBefore(/[\w.]*/);
  if (!o) return null;
  const l = e.state.doc.toString(), a = e.pos, h = e.state.doc.sliceString(0, a), c = Math.max(
    h.lastIndexOf("{{"),
    h.lastIndexOf("{~")
  ), f = h.substring(c), u = /\|\s*[\w.]*$/.test(f);
  let d = [];
  if (u)
    d.push(...t.functions.map((g) => {
      const Q = () => {
        const S = document.createElement("div");
        S.className = "cm-scriban-tooltip";
        const y = document.createElement("div");
        y.className = "cm-scriban-tooltip-title", y.textContent = g.name, S.appendChild(y);
        const k = document.createElement("div");
        if (k.className = "cm-scriban-tooltip-description", k.textContent = g.description, S.appendChild(k), g.params && g.params.length > 0) {
          const x = document.createElement("div");
          x.className = "cm-scriban-tooltip-params-title", x.textContent = "Parameters:", S.appendChild(x), g.params.forEach(($) => {
            const w = document.createElement("div");
            w.className = "cm-scriban-tooltip-param";
            const R = document.createElement("span");
            R.className = "cm-scriban-tooltip-param-name", R.textContent = $.name;
            const Y = document.createElement("span");
            Y.className = "cm-scriban-tooltip-param-desc", Y.textContent = ` - ${$.description}`, w.appendChild(R), w.appendChild(Y), S.appendChild(w);
          });
        }
        return S;
      };
      return {
        label: g.name,
        type: "function",
        info: Q
      };
    }));
  else {
    d = wd(t.availableVariables);
    const g = Qy(l, a);
    for (const Q of g) {
      const S = by(Q.arrayPath, t.availableVariables);
      d.push({
        label: Q.variable,
        type: "variable",
        info: "loop variable"
      });
      for (const y of S)
        d.push({
          label: `${Q.variable}.${y}`,
          type: "property",
          info: "loop item property"
        });
    }
  }
  const O = o.text.toLowerCase(), m = O ? d.filter((g) => g.label.toLowerCase().includes(O)) : d;
  return {
    from: o.from,
    options: m.map((g) => ({
      label: g.label,
      type: g.type,
      info: g.info
    }))
  };
}
window.ScribanEditor = {
  // Initialize editor with a specific element
  initEditor(n) {
    n._scribanEditor && n._scribanEditor.view && n._scribanEditor.view.destroy(), n._scribanEditor = {
      view: null,
      availableVariables: {},
      functions: [],
      themeCompartment: new ci(),
      highlightCompartment: new ci()
    };
    const e = n._scribanEditor, t = (i) => Sy(n, i);
    e.view = new v({
      state: _.create({
        doc: "",
        extensions: [
          Wb,
          Vh(),
          Mu(),
          dn.of("    "),
          e.themeCompartment.of(_h),
          e.highlightCompartment.of(Qo(Dh)),
          dy,
          Oy,
          gy,
          Vh().language.data.of({
            autocomplete: t
          }),
          fn.of([
            { key: "Tab", run: Cu },
            rQ
          ])
        ]
      }),
      parent: n
    });
  },
  // Set functions with documentation
  setScribanFunctions(n, e) {
    const t = Ft(n);
    typeof e == "string" ? t.functions = JSON.parse(e) : t.functions = e;
  },
  // Set available variables
  setScribanVariables(n, e) {
    const t = Ft(n);
    typeof e == "string" ? t.availableVariables = JSON.parse(e) : t.availableVariables = e;
  },
  // Get editor content
  getEditorContent(n) {
    const e = Ft(n);
    return e.view ? e.view.state.doc.toString() : "";
  },
  // Set editor content
  setEditorContent(n, e) {
    const t = Ft(n);
    t.view && t.view.dispatch({
      changes: { from: 0, to: t.view.state.doc.length, insert: e }
    });
  },
  // Switch theme
  setEditorTheme(n, e) {
    const t = Ft(n);
    if (t.view) {
      const i = e === "dark";
      t.view.dispatch({
        effects: [
          t.themeCompartment.reconfigure(i ? _h : py),
          t.highlightCompartment.reconfigure(Qo(i ? Dh : my))
        ]
      });
    }
  }
};
//# sourceMappingURL=dotNetElementsScribanEditor.js.map

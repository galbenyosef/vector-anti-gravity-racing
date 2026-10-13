// assets__game-CsnOSIff 02 — mul
// Lines 334-549 of readable/assets__game-CsnOSIff.pretty.js (statement-aligned).
function ea(e, t, n) {
  let r = new Float32Array(t * t),
    i = new Float32Array(t * t);
  for (let e = 0; e < r.length; e++) {
    let t = n() * Math.PI * 2;
    ((r[e] = Math.cos(t)), (i[e] = Math.sin(t)));
  }
  let a = (n) => {
      let r = new Int32Array(e),
        i = new Int32Array(e),
        a = new Float32Array(e),
        o = new Float32Array(e);
      for (let s = 0; s < e; s++) {
        let c = ((s + 0.5) / e) * t + n,
          l = Math.floor(c);
        ((r[s] = ((l % t) + t) % t),
          (i[s] = (r[s] + 1) % t),
          (a[s] = c - l),
          (o[s] = a[s] ** 3 * (a[s] * (a[s] * 6 - 15) + 10)));
      }
      return { cell: r, next: i, t: a, fade: o };
    },
    o = a(n() * t),
    s = a(n() * t),
    c = new Float32Array(e * e);
  for (let n = 0; n < e; n++) {
    let a = s.cell[n] * t,
      l = s.next[n] * t,
      u = s.t[n],
      d = s.fade[n];
    for (let t = 0; t < e; t++) {
      let s = o.cell[t],
        f = o.next[t],
        p = o.t[t],
        m = o.fade[t],
        h = r[a + s] * p + i[a + s] * u,
        g = r[a + f] * (p - 1) + i[a + f] * u,
        _ = r[l + s] * p + i[l + s] * (u - 1),
        v = r[l + f] * (p - 1) + i[l + f] * (u - 1);
      c[n * e + t] = h + (g - h) * m + (_ - h) * d + (h - g - _ + v) * m * d;
    }
  }
  return c;
}
function ta(e) {
  let t = 0,
    n = 0;
  for (let n of e) t += n;
  let r = t / e.length;
  for (let t of e) n += (t - r) ** 2;
  let i = Math.sqrt(n / e.length) || 1;
  for (let t = 0; t < e.length; t++) e[t] = (e[t] - r) / i;
  return e;
}
function na(e, t, n, r) {
  let i = new Float32Array(e * e),
    a = 1;
  for (let o of t) {
    let t = ea(e, o, r);
    for (let e = 0; e < i.length; e++) i[e] += t[e] * a;
    a *= n;
  }
  return ta(i);
}
function ra(e, t) {
  let n = new Float32Array(e.length);
  for (let r = 0; r < t; r++)
    for (let i = 0; i < t; i++) {
      let a = 0;
      for (let n = -1; n <= 1; n++)
        for (let o = -1; o <= 1; o++)
          a +=
            e[((r + n + t) % t) * t + ((i + o + t) % t)] *
            (2 - Math.abs(o)) *
            (2 - Math.abs(n));
      n[r * t + i] = a / 16;
    }
  return n;
}
function ia(e, t, n) {
  let r = new Float32Array(e * e);
  for (let i = 0; i < t; i++) {
    let t = n() * e,
      i = n() * e,
      a = 0.6 + n() ** 2 * 1.9,
      o = 0.4 + n() * 0.6,
      s = Math.ceil(a * 2.5);
    for (let n = -s; n <= s; n++)
      for (let c = -s; c <= s; c++) {
        let s = Math.floor(t) + c,
          l = Math.floor(i) + n,
          u = (s + 0.5 - t) ** 2 + (l + 0.5 - i) ** 2,
          d = (((l % e) + e) % e) * e + (((s % e) + e) % e);
        r[d] += o * Math.exp(-u / (a * a));
      }
  }
  return r;
}
var aa = (e) => Math.round(s.clamp(0.5 + (0.5 * e) / Qi, 0, 1) * 255);
function oa(e = 256, t = 7331) {
  let n = $i(t),
    r = e * e,
    i = na(e, [5, 9, 17, 33, 64], 0.5, n),
    a = ia(e, Math.round(r / 190), n),
    o = new Float32Array(r);
  for (let e = 0; e < r; e++) o[e] = n() - 0.5;
  let s = ra(o, e),
    c = new Float32Array(r);
  for (let e = 0; e < r; e++) c[e] = i[e] * 0.55 - a[e] * 0.9 + s[e] * 0.5;
  let l = na(e, [7, 13, 29, 61], 0.6, n),
    u = new Float32Array(r);
  for (let e = 0; e < r; e++) u[e] = l[e] + a[e] * 1.6 + o[e] * 0.8;
  ta(u);
  let d = na(e, [3, 5, 11, 23], 0.45, n);
  for (let e = 0; e < r; e++) d[e] = Math.tanh(d[e] * 1.1);
  ta(d);
  let f = new Float32Array(r),
    p = new Float32Array(r),
    m = 0;
  for (let t = 0; t < e; t++) {
    let n = ((t + e - 1) % e) * e,
      r = ((t + 1) % e) * e;
    for (let i = 0; i < e; i++) {
      let a = t * e + i;
      ((f[a] = (c[t * e + ((i + e - 1) % e)] - c[t * e + ((i + 1) % e)]) / 2),
        (p[a] = (c[n + i] - c[r + i]) / 2),
        (m += f[a] ** 2 + p[a] ** 2));
    }
  }
  let h = Math.sqrt(m / r) || 1,
    g = new Uint8Array(r * 4);
  for (let e = 0; e < r; e++)
    ((g[e * 4] = aa(u[e])),
      (g[e * 4 + 1] = aa(d[e])),
      (g[e * 4 + 2] = aa(f[e] / h)),
      (g[e * 4 + 3] = aa(p[e] / h)));
  return g;
}
var sa = null;
function ca() {
  return (
    sa ||
    ((sa = new re(oa(256), 256, 256)),
    (sa.name = `Micro-surface detail`),
    (sa.wrapS = sa.wrapT = qe),
    (sa.magFilter = Fe),
    (sa.minFilter = m),
    (sa.generateMipmaps = !0),
    (sa.anisotropy = 8),
    (sa.colorSpace = ``),
    (sa.needsUpdate = !0),
    sa)
  );
}
var la = (e) => {
    let t = e.abs(),
      n = t.mul(t).mul(t).mul(t);
    return n.div(n.x.add(n.y).add(n.z));
  },
  ua = new Map(),
  da = (e, t = 0) => {
    let n = `${e}:${t}`,
      r = ua.get(n);
    if (!r) {
      let i = ca(),
        a = U.div(e),
        o = (e) => (t ? R(i, e).bias(B(t)) : R(i, e));
      ((r = { x: o(a.zy), y: o(a.xz), z: o(a.xy) }), ua.set(n, r));
    }
    return r;
  },
  fa = (e) => e.mul(2).sub(1).mul(Qi);
function pa(e, t = $r) {
  let n = la(li),
    r = B(1);
  if (e.grain > 0) {
    let t = da(e.scale, e.blur),
      i = t.x.r.mul(n.x).add(t.y.r.mul(n.y)).add(t.z.r.mul(n.z));
    r = r.add(fa(i).mul(e.grain));
  }
  if (e.patches > 0) {
    let t = da(e.patchScale),
      i = t.x.g.mul(n.x).add(t.y.g.mul(n.y)).add(t.z.g.mul(n.z));
    r = r.add(fa(i).mul(e.patches));
  }
  return t.mul(r.max(0)).clamp(0.04, 1);
}
function ma(e) {
  let t = Ci.transformNormalByInverseViewMatrix(_r),
    n = la(t),
    r = da(e.scale, e.blur),
    i = da(e.patchScale),
    a = (e) => e.zw.mul(2).sub(1).mul(Qi),
    o = a(r.x),
    s = a(r.y),
    c = a(r.z),
    l = q(0, o.y, o.x)
      .mul(n.x)
      .add(q(s.x, 0, s.y).mul(n.y))
      .add(q(c.x, c.y, 0).mul(n.z)),
    u = fa(i.x.g.mul(n.x).add(i.y.g.mul(n.y)).add(i.z.g.mul(n.z)))
      .mul(0.3)
      .add(1)
      .clamp(0.3, 1.7)
      .mul(e.normal),
    d = t.add(l.mul(u)).normalize();
  return _r.mul(H(d, 0)).xyz.normalize();
}
function ha(e, t, { normal: n = !e.normalMap } = {}) {
  return (
    (e.roughnessNode = pa(t)),
    n && t.normal > 0 && (e.normalNode = ma(t)),
    (e.userData.microSurface = { ...t, normal: n ? t.normal : 0 }),
    e
  );
}

// assets__game-D43Oxqny 02 — mul
// Lines 335-550 of readable/assets__game-D43Oxqny.pretty.js (statement-aligned).
function ta(e, t, n) {
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
function na(e) {
  let t = 0,
    n = 0;
  for (let n of e) t += n;
  let r = t / e.length;
  for (let t of e) n += (t - r) ** 2;
  let i = Math.sqrt(n / e.length) || 1;
  for (let t = 0; t < e.length; t++) e[t] = (e[t] - r) / i;
  return e;
}
function ra(e, t, n, r) {
  let i = new Float32Array(e * e),
    a = 1;
  for (let o of t) {
    let t = ta(e, o, r);
    for (let e = 0; e < i.length; e++) i[e] += t[e] * a;
    a *= n;
  }
  return na(i);
}
function ia(e, t) {
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
function aa(e, t, n) {
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
var oa = (e) => Math.round(F.clamp(0.5 + (0.5 * e) / $i, 0, 1) * 255);
function sa(e = 256, t = 7331) {
  let n = ea(t),
    r = e * e,
    i = ra(e, [5, 9, 17, 33, 64], 0.5, n),
    a = aa(e, Math.round(r / 190), n),
    o = new Float32Array(r);
  for (let e = 0; e < r; e++) o[e] = n() - 0.5;
  let s = ia(o, e),
    c = new Float32Array(r);
  for (let e = 0; e < r; e++) c[e] = i[e] * 0.55 - a[e] * 0.9 + s[e] * 0.5;
  let l = ra(e, [7, 13, 29, 61], 0.6, n),
    u = new Float32Array(r);
  for (let e = 0; e < r; e++) u[e] = l[e] + a[e] * 1.6 + o[e] * 0.8;
  na(u);
  let d = ra(e, [3, 5, 11, 23], 0.45, n);
  for (let e = 0; e < r; e++) d[e] = Math.tanh(d[e] * 1.1);
  na(d);
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
    ((g[e * 4] = oa(u[e])),
      (g[e * 4 + 1] = oa(d[e])),
      (g[e * 4 + 2] = oa(f[e] / h)),
      (g[e * 4 + 3] = oa(p[e] / h)));
  return g;
}
var ca = null;
function la() {
  return (
    ca ||
    ((ca = new fe(sa(256), 256, 256)),
    (ca.name = `Micro-surface detail`),
    (ca.wrapS = ca.wrapT = C),
    (ca.magFilter = d),
    (ca.minFilter = Qn),
    (ca.generateMipmaps = !0),
    (ca.anisotropy = 8),
    (ca.colorSpace = ``),
    (ca.needsUpdate = !0),
    ca)
  );
}
var ua = (e) => {
    let t = e.abs(),
      n = t.mul(t).mul(t).mul(t);
    return n.div(n.x.add(n.y).add(n.z));
  },
  da = new Map(),
  fa = (e, t = 0) => {
    let n = `${e}:${t}`,
      r = da.get(n);
    if (!r) {
      let i = la(),
        a = W.div(e),
        o = (e) => (t ? z(i, e).bias(V(t)) : z(i, e));
      ((r = { x: o(a.zy), y: o(a.xz), z: o(a.xy) }), da.set(n, r));
    }
    return r;
  },
  pa = (e) => e.mul(2).sub(1).mul($i);
function ma(e, t = $r) {
  let n = ua(li),
    r = V(1);
  if (e.grain > 0) {
    let t = fa(e.scale, e.blur),
      i = t.x.r.mul(n.x).add(t.y.r.mul(n.y)).add(t.z.r.mul(n.z));
    r = r.add(pa(i).mul(e.grain));
  }
  if (e.patches > 0) {
    let t = fa(e.patchScale),
      i = t.x.g.mul(n.x).add(t.y.g.mul(n.y)).add(t.z.g.mul(n.z));
    r = r.add(pa(i).mul(e.patches));
  }
  return t.mul(r.max(0)).clamp(0.04, 1);
}
function ha(e) {
  let t = wi.transformNormalByInverseViewMatrix(_r),
    n = ua(t),
    r = fa(e.scale, e.blur),
    i = fa(e.patchScale),
    a = (e) => e.zw.mul(2).sub(1).mul($i),
    o = a(r.x),
    s = a(r.y),
    c = a(r.z),
    l = J(0, o.y, o.x)
      .mul(n.x)
      .add(J(s.x, 0, s.y).mul(n.y))
      .add(J(c.x, c.y, 0).mul(n.z)),
    u = pa(i.x.g.mul(n.x).add(i.y.g.mul(n.y)).add(i.z.g.mul(n.z)))
      .mul(0.3)
      .add(1)
      .clamp(0.3, 1.7)
      .mul(e.normal),
    d = t.add(l.mul(u)).normalize();
  return _r.mul(U(d, 0)).xyz.normalize();
}
function ga(e, t, { normal: n = !e.normalMap } = {}) {
  return (
    (e.roughnessNode = ma(t)),
    n && t.normal > 0 && (e.normalNode = ha(t)),
    (e.userData.microSurface = { ...t, normal: n ? t.normal : 0 }),
    e
  );
}

// assets__game-CsnOSIff 47 — math
// Lines 20256-20560 of readable/assets__game-CsnOSIff.pretty.js (statement-aligned).
var Zh = class {
    constructor(e, t) {
      ((this.mobile = e),
        (this.heightAt = t),
        (this.placements = {
          venue: [],
          skyline: [],
          hotel: [],
          transit: [],
          flying: [],
          street: [],
        }),
        (this.detail = []),
        (this.fixtures = []),
        (this.screens = []),
        (this.tubes = []),
        (this.rejected = {}),
        (this.misses = new Map()),
        (this.footprints = new Map()),
        (this.FCELL = 64));
    }
    ground(e, t) {
      return this.heightAt(e, t);
    }
    reject(e, t, n, r) {
      let i = `rejected.${t}`;
      this.rejected[i] = (this.rejected[i] ?? 0) + 1;
      let a = `${e}:${t}${n ? `:${n}` : ``}`;
      return (
        this.misses.set(a, (this.misses.get(a) ?? 0) + 1),
        this.trace?.(e, t, n, r),
        !1
      );
    }
    obbs(e, t, n) {
      return Bh(e, t).map((e) => Dh(n, e));
    }
    nearFootprints(e) {
      let t = Math.abs(e.hx) + Math.abs(e.hz) + 1,
        n = [],
        r = new Set();
      for (
        let i = Math.floor((e.cx - t) / this.FCELL);
        i <= Math.floor((e.cx + t) / this.FCELL);
        i++
      )
        for (
          let a = Math.floor((e.cz - t) / this.FCELL);
          a <= Math.floor((e.cz + t) / this.FCELL);
          a++
        )
          for (let e of this.footprints.get(Uh(i, a)) ?? [])
            r.has(e) || (r.add(e), n.push(e));
      return n;
    }
    register(e, t, n, r = t) {
      let i = { ...e, group: t, role: n, asset: r },
        a = Math.abs(e.hx) + Math.abs(e.hz) + 1;
      for (
        let t = Math.floor((e.cx - a) / this.FCELL);
        t <= Math.floor((e.cx + a) / this.FCELL);
        t++
      )
        for (
          let n = Math.floor((e.cz - a) / this.FCELL);
          n <= Math.floor((e.cz + a) / this.FCELL);
          n++
        ) {
          let e = Uh(t, n),
            r = this.footprints.get(e);
          r ? r.push(i) : this.footprints.set(e, [i]);
        }
    }
    roadClear(e, t) {
      let n = Math.abs(e.hx) + Math.abs(e.hz) + ah + t + 2;
      for (let r of Gh(e.cx - n, e.cz - n, e.cx + n, e.cz + n))
        if (!(e.y0 >= r.top + sh) && !Xh(r, e.y1) && kh(e, Yh(r, ah + t), 0))
          return !1;
      return !0;
    }
    roadClearRound(e, t, n) {
      let r = t + ah + n + 2;
      for (let i of Gh(e.cx - r, e.cz - r, e.cx + r, e.cz + r))
        if (
          !(e.y0 >= i.top + sh) &&
          !Xh(i, e.y1) &&
          Oh(Yh(i, ah + n), e.cx, e.cz) < t
        )
          return !1;
      return !0;
    }
    lineBlocking(e, t = [], n = 3) {
      let r = Jh(),
        i = Math.abs(e.hx) + Math.abs(e.hz) + 16 + n;
      for (
        let a = Math.floor((e.cx - i) / Hh);
        a <= Math.floor((e.cx + i) / Hh);
        a++
      )
        for (
          let o = Math.floor((e.cz - i) / Hh);
          o <= Math.floor((e.cz + i) / Hh);
          o++
        )
          for (let i of r.get(Uh(a, o)) ?? []) {
            if (t.includes(i.id)) continue;
            let r = i.moving ? 8 : 4;
            if (
              !(e.y1 <= i.low - r || e.y0 >= i.high + r) &&
              Oh(e, i.x, i.z) < i.half + n
            )
              return i.id;
          }
      return null;
    }
    level(e) {
      for (let [t, n] of [
        [0, 0],
        [1, 1],
        [1, -1],
        [-1, 1],
        [-1, -1],
        [1, 0],
        [-1, 0],
        [0, 1],
        [0, -1],
      ]) {
        let r = e.cx + e.ux * e.hx * t - e.uz * e.hz * n,
          i = e.cz + e.uz * e.hx * t + e.ux * e.hz * n;
        if (this.ground(r, i) < Q - 0.7) return !1;
      }
      return !0;
    }
    overlaps(e, t) {
      for (let n of this.nearFootprints(e))
        if (
          n.group !== t &&
          !(e.y1 <= n.y0 + 0.05 || e.y0 >= n.y1 - 0.05) &&
          kh(e, n)
        )
          return n.group.startsWith(`#`) ? n.asset : n.group;
      return null;
    }
    fits(e, t, n, r) {
      if (r.free) return !0;
      let i = r.role,
        a = r.margin ?? (i === `ground` ? ch : i === `air` ? oh : 0),
        o = r.group ?? `#${this.detail.length}`,
        s = this.obbs(e, t, n);
      for (let e of s) {
        if (r.cap !== void 0 && e.y1 > r.cap)
          return this.reject(t, `cap`, ``, e);
        let s = n.elements,
          c =
            r.round ??
            (Lh[t] === void 0
              ? void 0
              : Lh[t] *
                Math.max(Math.hypot(s[0], s[2]), Math.hypot(s[8], s[10])));
        if (!(
          r.noRoad ||
          (c === void 0 ? this.roadClear(e, a) : this.roadClearRound(e, c, a))
        ))
          return this.reject(t, `road`, ``, e);
        if (i === `ground` && e.y0 <= Q + 1 && !this.level(e))
          return this.reject(t, `level`, ``, e);
        let l = i === `ground` || i === `air` ? this.overlaps(e, o) : null;
        if (l !== null) return this.reject(t, `overlap`, l, e);
        let u = r.noLines ? null : this.lineBlocking(e, r.ignoreLines);
        if (u !== null) return this.reject(t, `lines`, u, e);
        if (i !== `attached` && o !== `gondola` && !gh(e))
          return this.reject(t, `lines`, `gondola`, e);
        let d = i === `attached` ? null : _h(e);
        if (d !== null) return this.reject(t, `lines`, d, e);
      }
      return !0;
    }
    place(e, t, n, r) {
      if (!eh[e].bounds[t]) throw Error(`Meridian layout: ${e} has no ${t}`);
      return this.fits(e, t, n, r) ? (this.add(e, t, n, r), !0) : !1;
    }
    add(e, t, n, r) {
      let i = n.elements,
        a = { asset: t, matrix: n, x: i[12], z: i[14] };
      (r.variant !== void 0 && (a.variant = r.variant),
        this.placements[e].push(a));
      let o = r.group ?? `#${this.detail.length}`;
      if (
        (this.detail.push({
          kit: e,
          asset: t,
          matrix: n,
          role: r.role,
          group: o,
        }),
        r.role === `ground` || r.role === `air`)
      )
        for (let i of this.obbs(e, t, n)) this.register(i, o, r.role, t);
    }
    fixture(e, t, n, r, i) {
      let a = {
        position: new g(e[0], e[1], e[2]),
        color: t,
        intensity: n,
        range: r,
      };
      (i &&
        (a.cone = {
          axis: new g(i.axis[0], i.axis[1], i.axis[2]).normalize(),
          cos: i.cos,
        }),
        this.fixtures.push(a));
    }
  },
  Qh = (e) => ((e % ih) + ih) % ih;
function $h(e) {
  let t = rh.frame(Qh(e)),
    n = Math.hypot(t.tangent.x, t.tangent.z) || 1,
    r = Math.hypot(t.right.x, t.right.z) || 1;
  return {
    f: t,
    x: t.position.x,
    y: t.position.y,
    z: t.position.z,
    tx: t.tangent.x / n,
    tz: t.tangent.z / n,
    rx: t.right.x / r,
    rz: t.right.z / r,
  };
}
function eg(e, t) {
  let n = $h(e);
  return [n.x + n.rx * t, n.z + n.rz * t];
}
function tg(e, t) {
  let n = $h(e),
    r = Math.sign(t) || 1;
  return wh(-n.rx * r, -n.rz * r);
}
function ng(e) {
  let t = $h(e);
  return wh(t.tx, t.tz);
}
var rg = { scale: 2.25, gap: 0.4 },
  ig = [sg(300), sg(ih * 0.64)].map((e) => [e - 320, e]);
function ag(e, t) {
  let n = C_(e, t);
  return n !== null && ig.some(([e, t]) => n.d >= e && n.d <= t);
}
function og(e, t, n, r) {
  let { scale: i, gap: a } = rg,
    o = eh.venue.bounds[`braking-board`].max[0] * i,
    [s, c] = eg(t, n * (ah + oh + a + o));
  return e.b.place(
    `venue`,
    `braking-board`,
    $(s, e.b.ground(s, c), c, ng(t) + Math.PI, i),
    { role: `ground`, margin: 1.5, variant: r },
  );
}
function sg(e) {
  for (let t = e; t < e + 600; t++)
    if (Math.abs(rh.frame(t).curvature) > 1 / 60) return t;
  return e;
}
var cg = (() => {
  let e = [4440, 4480, 4520].map((e) => {
      let t = rh.frame(e).position;
      return [t.x, t.y + 4, t.z];
    }),
    t = [
      [-30, 52, -40],
      [105, 52, -40],
      [240, 52, -40],
      [480, 54, 0],
      [170, 160, 340],
    ];
  return {
    corridor: 70,
    clearance: 4,
    rays: e.flatMap((e) => t.map((t) => [e, t])),
  };
})();
function lg(e, t) {
  if (e > 430 && e < 1150 && Math.abs(t) < 75) return Q + 45;
  if (e < -905 && Math.abs(t + 690) < 95) return Q + 40;
  let n = e + 380,
    r = t + 595,
    i = Math.hypot(n, r),
    a = Math.atan2(r, n) / lh,
    o = 1 / 0;
  i > 90 && i < 1100 && a > 18 && a < 66 && (o = Q + 40);
  let { corridor: s, clearance: c, rays: l } = cg;
  for (let [n, r] of l) {
    let i = r[0] - n[0],
      a = r[2] - n[2],
      l = Math.hypot(i, a),
      u = ((e - n[0]) * i + (t - n[2]) * a) / l;
    u < 20 ||
      u > l - 10 ||
      Math.abs((e - n[0]) * a - (t - n[2]) * i) / l > s ||
      (o = Math.min(o, n[1] + ((r[1] - n[1]) * u) / l - c));
  }
  return o;
}

// assets__game-CsnOSIff 70 — math
// Lines 30075-30215 of readable/assets__game-CsnOSIff.pretty.js (statement-aligned).
var Db = class extends dy {
    constructor(e) {
      (super(),
        (this.unit = e),
        (this.loop = Eb()),
        (this.units = [e]),
        (this.speed = Tb.line),
        (this.table = oy.flight(this.loop.path, 1, Tb.line, 0.4, 0.06)));
    }
    write(e) {
      let { w: t, xf: n, pose: r } = e,
        { period: i, sOfT: a, dt: o } = this.loop;
      for (let s = 0; s < this.unit.count; s++) {
        let c = Qv(e.t + (i * s) / this.unit.count, i),
          l = a[Math.min(a.length - 1, Math.round(c / o))];
        (this.table.at(l, r),
          n
            .yaw(Math.atan2(r.tz, r.tx))
            .at(r.px, r.py, r.pz)
            .roll(r.bank + 0.02 * Math.sin(e.t * 0.8 + s * 1.3))
            .pitch(0.012 * Math.sin(e.t * 0.6 + s)),
          t.put(this.unit.pool, this.unit.start + s, n),
          s === 0 && ((this.x = n.px), (this.y = n.py), (this.z = n.pz)));
      }
    }
  },
  Ob = { position: [55, Jd, 195], yaw: 0 },
  kb = class extends dy {
    constructor(e) {
      (super(),
        (this.unit = e),
        (this.q = new Ot()),
        (this.q2 = new Ot()),
        (this.m = new M()),
        (this.v = new g()),
        (this.s = new g()),
        (this.up = new g(0, 1, 0)),
        (this.rings = Pm[`meridian-line-sculpture`].rings.list),
        (this.units = [e]),
        (this.speed = 2),
        (this.x = Ob.position[0]),
        (this.y = Ob.position[1] + 13),
        (this.z = Ob.position[2]));
    }
    write(e) {
      let { w: t } = e,
        n = e.t,
        [r, i, a] = Ob.position;
      this.rings.forEach((e, o) => {
        let s = this.q.setFromAxisAngle(
            this.up,
            Ob.yaw + (e.precessRevPerSec * n + e.phase) * Kv,
          ),
          c = e.tiltAxis === `+X` ? this.v.set(1, 0, 0) : this.v.set(0, 0, 1);
        (s.multiply(this.q2.setFromAxisAngle(c, e.tiltDegrees * qv)),
          s.multiply(
            this.q2.setFromAxisAngle(this.up, e.spinRevPerSec * n * Kv),
          ),
          this.m.compose(
            this.v.set(r + e.pivot[0], i + e.pivot[1], a + e.pivot[2]),
            s,
            this.s.setScalar(e.scale),
          ),
          t.putMatrix(this.unit.pool, this.unit.start + o, this.m));
      });
    }
  },
  Ab = (e, t) => (t ? `${e}-lod` : e);
function jb(e, t) {
  let n = Sf[0],
    r = 1 / 0;
  for (let i of Sf) {
    let a = Math.hypot(e - i.centre[0], t - i.centre[1]);
    a < r && ((r = a), (n = i));
  }
  let i = e - n.centre[0],
    a = t - n.centre[1];
  return Math.abs(i) > Math.abs(a)
    ? { nx: Math.sign(i), nz: 0, d: r }
    : { nx: 0, nz: Math.sign(a), d: r };
}
var Mb = [
    { id: `drone-stack1-lev`, mobile: !0, near: !1, drops: [0, 0] },
    { id: `drone-stack2-lev`, mobile: !0, near: !1, drops: [0, 0] },
    { id: `drone-stack3-lev`, mobile: !0, near: !1, drops: [0, 0] },
    { id: `drone-stack4-lev`, mobile: !0, near: !1, drops: [0, 0] },
    { id: `drone-station-stack3`, mobile: !1, near: !0, drops: [11, 0] },
    { id: `drone-station-stack1`, mobile: !1, near: !0, drops: [11, 0] },
    { id: `drone-stack1-wall`, mobile: !1, near: !0, drops: [0, 16] },
    { id: `drone-stack2-wall`, mobile: !1, near: !0, drops: [0, 16] },
    { id: `drone-stack2-silo`, mobile: !0, near: !0, drops: [0, 19], silo: !0 },
  ],
  Nb = [
    [0, `s`],
    [1, `s`],
    [2, `s`],
    [3, `s`],
    [0, `w`],
    [2, `w`],
    [3, `w`],
    [3, `n`],
  ],
  Pb = [
    { centre: [0, Jd + 42, 150], radius: 34 },
    { centre: [-169, Jd + 105, 62], radius: 24 },
    { centre: [318, Jd + 50, 246], radius: 36 },
  ];
function Fb(e, t, n, r) {
  let i = [],
    a = { x: 0, y: 0, z: 0 },
    o = e.length - r;
  for (let t = 0; t < o; t += 1) (e.pointAt(t, a), i.push([a.x, a.y, a.z]));
  let s = e.pointAt(o),
    c = e.tangentAt(o),
    [l, u, d] = t,
    f = Math.hypot(l - s.x, u - s.y, d - s.z),
    p = n[0] - l,
    m = n[2] - d,
    h = Math.hypot(p, m) || 1;
  ((p /= h), (m /= h));
  let g = 0.4 * f,
    _ = [s.x + c.x * g, s.y + c.y * g, s.z + c.z * g],
    v = [l - p * g, u, d - m * g],
    y = Math.max(2, Math.ceil(f));
  for (let e = 0; e <= y; e++) {
    let t = e / y,
      n = 1 - t,
      r = n * n * n,
      a = 3 * n * n * t,
      o = 3 * n * t * t,
      c = t * t * t;
    i.push([
      r * s.x + a * _[0] + o * v[0] + c * l,
      r * s.y + a * _[1] + o * v[1] + c * u,
      r * s.z + a * _[2] + o * v[2] + c * d,
    ]);
  }
  for (let e = 1; e < h; e += 1)
    i.push([l + p * e, u + ((n[1] - u) * e) / h, d + m * e]);
  return (i.push([...n]), new ef(i, !1));
}

// assets__game-CsnOSIff 65 — math
// Lines 28297-28649 of readable/assets__game-CsnOSIff.pretty.js (statement-aligned).
var iy = () => ({
    px: 0,
    py: 0,
    pz: 0,
    tx: 0,
    ty: 0,
    tz: 1,
    rx: 1,
    ry: 0,
    rz: 0,
    ux: 0,
    uy: 1,
    uz: 0,
    bank: 0,
  }),
  ay = 13,
  oy = class e {
    constructor(e, t, n) {
      ((this.length = e),
        (this.closed = t),
        (this.n = n.length / ay),
        (this.h = e / (t ? this.n : this.n - 1)),
        (this.data = n));
    }
    static rail(t) {
      let n = bp(t, 2),
        r = new Float32Array(n.length * ay);
      return (
        n.forEach((e, t) => {
          let n = t * ay;
          (r.set(e.position, n),
            r.set(e.tangent, n + 3),
            r.set(e.right, n + 6),
            r.set(e.up, n + 9),
            (r[n + 12] = e.bank));
        }),
        new e(t.path.length, t.path.closed, r)
      );
    }
    static flight(t, n, r = 0, i = 0.6, a = 0.45) {
      let o = t.stations(n);
      !t.closed && o.at(-1) < t.length && o.push(t.length);
      let s = new Float32Array(o.length * ay),
        c = { x: 0, y: 0, z: 0 },
        l = { x: 0, y: 0, z: 0 };
      return (
        o.forEach((e, n) => {
          (t.pointAt(e, c), t.tangentAt(e, l));
          let o = n * ay,
            u = Math.hypot(l.x, l.z);
          ((s[o] = c.x),
            (s[o + 1] = c.y),
            (s[o + 2] = c.z),
            (s[o + 3] = l.x),
            (s[o + 4] = l.y),
            (s[o + 5] = l.z),
            (s[o + 6] = u > 1e-6 ? l.z / u : 1),
            (s[o + 8] = u > 1e-6 ? -l.x / u : 0),
            (s[o + 10] = 1));
          let d = u > 0.3 && r > 0 ? t.curvatureAt(e, 6) : 0;
          s[o + 12] = Yv(Math.atan((r * r * d) / Jv) * i, -a, a);
        }),
        new e(t.length, t.closed, s)
      );
    }
    at(e, t) {
      let n =
          (this.closed ? Qv(e, this.length) : Yv(e, 0, this.length)) / this.h,
        r = Math.floor(n),
        i;
      this.closed
        ? ((r %= this.n), (i = (r + 1) % this.n))
        : (r > this.n - 2 && (r = this.n - 2), (i = r + 1));
      let a = this.closed ? n - Math.floor(n) : Yv(n - r, 0, 1),
        o = this.data,
        s = r * ay,
        c = i * ay;
      return (
        (t.px = o[s] + (o[c] - o[s]) * a),
        (t.py = o[s + 1] + (o[c + 1] - o[s + 1]) * a),
        (t.pz = o[s + 2] + (o[c + 2] - o[s + 2]) * a),
        (t.tx = o[s + 3] + (o[c + 3] - o[s + 3]) * a),
        (t.ty = o[s + 4] + (o[c + 4] - o[s + 4]) * a),
        (t.tz = o[s + 5] + (o[c + 5] - o[s + 5]) * a),
        (t.rx = o[s + 6] + (o[c + 6] - o[s + 6]) * a),
        (t.ry = o[s + 7] + (o[c + 7] - o[s + 7]) * a),
        (t.rz = o[s + 8] + (o[c + 8] - o[s + 8]) * a),
        (t.ux = o[s + 9] + (o[c + 9] - o[s + 9]) * a),
        (t.uy = o[s + 10] + (o[c + 10] - o[s + 10]) * a),
        (t.uz = o[s + 11] + (o[c + 11] - o[s + 11]) * a),
        (t.bank = o[s + 12] + (o[c + 12] - o[s + 12]) * a),
        t
      );
    }
    heading(e, t) {
      return (this.at(e, t), Math.atan2(t.tz, t.tx));
    }
  },
  sy = class {
    constructor() {
      ((this.px = 0),
        (this.py = 0),
        (this.pz = 0),
        (this.rx = 1),
        (this.ry = 0),
        (this.rz = 0),
        (this.ux = 0),
        (this.uy = 1),
        (this.uz = 0),
        (this.fx = 0),
        (this.fy = 0),
        (this.fz = 1));
    }
    at(e, t, n) {
      return ((this.px = e), (this.py = t), (this.pz = n), this);
    }
    yaw(e) {
      let t = Math.cos(e),
        n = Math.sin(e);
      return (
        (this.fx = t),
        (this.fy = 0),
        (this.fz = n),
        (this.rx = n),
        (this.ry = 0),
        (this.rz = -t),
        (this.ux = 0),
        (this.uy = 1),
        (this.uz = 0),
        this
      );
    }
    pitch(e) {
      if (e === 0) return this;
      let t = Math.cos(e),
        n = Math.sin(e),
        r = this.fx * t - this.ux * n,
        i = this.fy * t - this.uy * n,
        a = this.fz * t - this.uz * n,
        o = this.ux * t + this.fx * n,
        s = this.uy * t + this.fy * n,
        c = this.uz * t + this.fz * n;
      return (
        (this.fx = r),
        (this.fy = i),
        (this.fz = a),
        (this.ux = o),
        (this.uy = s),
        (this.uz = c),
        this
      );
    }
    roll(e) {
      if (e === 0) return this;
      let t = Math.cos(e),
        n = Math.sin(e),
        r = this.rx * t + this.ux * n,
        i = this.ry * t + this.uy * n,
        a = this.rz * t + this.uz * n,
        o = this.ux * t - this.rx * n,
        s = this.uy * t - this.ry * n,
        c = this.uz * t - this.rz * n;
      return (
        (this.rx = r),
        (this.ry = i),
        (this.rz = a),
        (this.ux = o),
        (this.uy = s),
        (this.uz = c),
        this
      );
    }
    rail(e, t) {
      return (
        (this.px = e.px),
        (this.py = e.py),
        (this.pz = e.pz),
        (this.fx = e.tx * t),
        (this.fy = e.ty * t),
        (this.fz = e.tz * t),
        (this.rx = e.rx * t),
        (this.ry = e.ry * t),
        (this.rz = e.rz * t),
        (this.ux = e.ux),
        (this.uy = e.uy),
        (this.uz = e.uz),
        this
      );
    }
    local(e, t, n) {
      return (
        (this.px += this.rx * e + this.ux * t + this.fx * n),
        (this.py += this.ry * e + this.uy * t + this.fy * n),
        (this.pz += this.rz * e + this.uz * t + this.fz * n),
        this
      );
    }
    copy(e) {
      return (
        (this.px = e.px),
        (this.py = e.py),
        (this.pz = e.pz),
        (this.rx = e.rx),
        (this.ry = e.ry),
        (this.rz = e.rz),
        (this.ux = e.ux),
        (this.uy = e.uy),
        (this.uz = e.uz),
        (this.fx = e.fx),
        (this.fy = e.fy),
        (this.fz = e.fz),
        this
      );
    }
  },
  cy = class {
    constructor(e, t, n) {
      ((this.kit = e),
        (this.asset = t),
        (this.livery = n),
        (this.meshes = []),
        (this.arrays = []),
        (this.size = 0),
        (this.shown = new Uint8Array()),
        (this.lo = 1 / 0),
        (this.hi = -1),
        (this.cells = new Int16Array()),
        (this.liveryAttributes = []));
    }
    alloc(e) {
      let t = this.size;
      return ((this.size += e), t);
    }
    bind(e) {
      ((this.meshes = e.filter((e) => e.count >= this.size)),
        (this.arrays = this.meshes.map((e) => e.instanceMatrix.array)),
        (this.shown = new Uint8Array(this.size)),
        (this.cells = new Int16Array(this.size).fill(-1)));
      for (let e of this.meshes) e.instanceMatrix.setUsage(Be);
      if (this.livery)
        for (let e of this.meshes) {
          let t = e.instanceMatrix.count,
            n = e.geometry.getAttribute(Hv);
          ((!n || n.count < t || n.itemSize !== 2) &&
            ((n = new Ct(new Float32Array(t * 2), 2)),
            e.geometry.setAttribute(Hv, n)),
            this.liveryAttributes.push(n));
        }
    }
    setLivery(e, t) {
      if (!this.livery || this.cells[e] === t) return;
      this.cells[e] = t;
      let [n, r] = ov(`livery`, this.livery, t);
      for (let t of this.liveryAttributes) {
        let i = t.array;
        ((i[e * 2] = n),
          (i[e * 2 + 1] = r),
          t.addUpdateRange(e * 2, 2),
          (t.needsUpdate = !0));
      }
    }
  },
  ly = class {
    constructor() {
      ((this.writes = 0), (this.m = new Float32Array(16)), (this.touched = []));
    }
    put(e, t, n, r = 1, i = 1, a = 1) {
      let o = this.m;
      ((o[0] = n.rx * r),
        (o[1] = n.ry * r),
        (o[2] = n.rz * r),
        (o[3] = 0),
        (o[4] = n.ux * i),
        (o[5] = n.uy * i),
        (o[6] = n.uz * i),
        (o[7] = 0),
        (o[8] = n.fx * a),
        (o[9] = n.fy * a),
        (o[10] = n.fz * a),
        (o[11] = 0),
        (o[12] = n.px),
        (o[13] = n.py),
        (o[14] = n.pz),
        (o[15] = 1));
      let s = t * 16;
      for (let t of e.arrays) t.set(o, s);
      ((this.writes += e.arrays.length), (e.shown[t] = 1), this.mark(e, t));
    }
    putMatrix(e, t, n) {
      let r = t * 16;
      for (let t of e.arrays) t.set(n.elements, r);
      ((this.writes += e.arrays.length), (e.shown[t] = 1), this.mark(e, t));
    }
    hide(e, t) {
      if (!e.shown[t]) return;
      e.shown[t] = 0;
      let n = t * 16;
      for (let t of e.arrays) t.fill(0, n, n + 16);
      ((this.writes += e.arrays.length), this.mark(e, t));
    }
    mark(e, t) {
      (e.hi < 0 && this.touched.push(e),
        t < e.lo && (e.lo = t),
        t > e.hi && (e.hi = t));
    }
    flush() {
      for (let e of this.touched) {
        for (let t of e.meshes) {
          let n = t.instanceMatrix;
          (n.updateRanges.length > 24
            ? n.clearUpdateRanges()
            : n.addUpdateRange(e.lo * 16, (e.hi - e.lo + 1) * 16),
            (n.needsUpdate = !0));
        }
        ((e.lo = 1 / 0), (e.hi = -1));
      }
      this.touched.length = 0;
    }
  },
  uy = class {
    constructor() {
      ((this.pools = new Map()), (this.liveries = []));
    }
    take(e, t, n, r = null) {
      let i = this.pools.get(t);
      return (
        i || this.pools.set(t, (i = new cy(e, t, r))),
        { pool: i, start: i.alloc(n), count: n }
      );
    }
    paint(e, t, n = e.start) {
      this.liveries.push([e.pool, n, t]);
    }
    list() {
      return [...this.pools.values()]
        .filter((e) => e.size > 0)
        .map((e) => ({ kit: e.kit, asset: e.asset, count: e.size }));
    }
  },
  dy = class {
    constructor() {
      ((this.x = 0),
        (this.y = 0),
        (this.z = 0),
        (this.due = 0),
        (this.interval = 1),
        (this.cost = 0),
        (this.fast = !1),
        (this.speed = 10));
    }
    step(e) {}
  },
  fy = new Map();

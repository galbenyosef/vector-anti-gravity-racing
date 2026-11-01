// assets__game-D43Oxqny 63 — mul
// Lines 28022-28369 of readable/assets__game-D43Oxqny.pretty.js (statement-aligned).
function Jv(e, t) {
  let n = e.getAttribute(`normal`);
  if (n && n.array instanceof Float32Array) {
    let t = new Int8Array(n.count * 3);
    for (let e = 0; e < n.count * 3; e++)
      t[e] = Math.round(Math.max(-1, Math.min(1, n.array[e])) * 127);
    e.setAttribute(`normal`, new er(t, 3, !0));
  }
  if (t)
    for (let t of [`uv`, `meridianVariant`]) {
      let n = e.getAttribute(t);
      if (!n || !(n.array instanceof Float32Array)) continue;
      let r = new Uint16Array(n.array.length);
      for (let e = 0; e < r.length; e++) r[e] = sr.toHalfFloat(n.array[e]);
      e.setAttribute(t, new rt(r, n.itemSize));
    }
}
function Yv(e, t) {
  let n = qm[`maglev-tube-ring`].tubeProfile,
    r = e.frames,
    i = r.length,
    a = e.closed ? i : i - 1,
    o = (e, t, n, a) => {
      let o = r[e % i];
      for (let e = 0; e < 3; e++)
        a.push(o.position[e] + o.right[e] * t + o.up[e] * n);
    },
    s = (e) => (e * 2) / 20,
    c = [];
  if (!t) {
    let e = n.skin.points,
      t = [],
      l = [],
      u = [],
      d = [];
    for (let c = 0; c <= a; c++)
      e.forEach(([a, d], f) => {
        (o(c, a, d, t), o(c, a / n.skin.radius, d / n.skin.radius, l));
        let p = r[c % i];
        for (let e = 0; e < 3; e++) l[l.length - 3 + e] -= p.position[e];
        u.push(s(c), f / e.length);
      });
    let f = e.length;
    for (let e = 0; e < a; e++)
      for (let t = 0; t < f; t++) {
        let n = e * f + t,
          r = e * f + ((t + 1) % f),
          i = (e + 1) * f + ((t + 1) % f),
          a = (e + 1) * f + t;
        d.push(n, r, i, n, i, a);
      }
    let p = new Me();
    (p.setAttribute(`position`, new N(t, 3)),
      p.setAttribute(`normal`, new N(l, 3)),
      p.setAttribute(`uv`, new N(u, 2)),
      p.setIndex(d),
      p.computeBoundingSphere(),
      c.push({ material: n.skin.material, geometry: p }));
  }
  let { points: l, materials: u, v: d } = n.guideway,
    f = new Map();
  l.forEach(([e, n], c) => {
    let p = u[c];
    if (t && p !== `Meridian graphite`) return;
    let [m, h] = l[(c + 1) % l.length],
      g = f.get(p);
    g || f.set(p, (g = { position: [], normal: [], uv: [], index: [] }));
    let _ = Math.hypot(m - e, h - n) || 1,
      v = (h - n) / _,
      y = -(m - e) / _,
      b = g.position.length / 3;
    for (let t = 0; t <= a; t++) {
      let a = r[t % i];
      (o(t, e, n, g.position), o(t, m, h, g.position));
      for (let e = 0; e < 2; e++)
        for (let e = 0; e < 3; e++) g.normal.push(a.right[e] * v + a.up[e] * y);
      g.uv.push(s(t), d[c] / 8.6, s(t), d[(c + 1) % d.length] / 8.6);
    }
    for (let e = 0; e < a; e++) {
      let t = b + e * 2;
      g.index.push(t, t + 1, t + 3, t, t + 3, t + 2);
    }
  });
  for (let [e, t] of f) {
    let n = new Me();
    (n.setAttribute(`position`, new N(t.position, 3)),
      n.setAttribute(`normal`, new N(t.normal, 3)),
      n.setAttribute(`uv`, new N(t.uv, 2)),
      n.setIndex(t.index),
      n.computeBoundingSphere(),
      c.push({ material: e, geometry: n }));
  }
  return c;
}
var Xv = {
  kestrel: lv.kestrel,
  manta: lv.manta,
  talon: lv.talon,
  monarch: lv.monarch,
};
function Zv(e, t) {
  let n = document.createElement(`canvas`);
  return ((n.width = e), (n.height = t), n);
}
var Qv = class {
  constructor(e, t, n) {
    ((this.kind = e),
      (this.width = t),
      (this.height = n),
      (this.key = ``),
      (this.draws = 0),
      (this.canvas = Zv(t, n)),
      (this.texture = new Zn(this.canvas)),
      (this.texture.name = `Meridian ${e} screen`),
      (this.texture.colorSpace = Ee),
      (this.texture.flipY = !1),
      (this.texture.anisotropy = 4));
  }
  draw(e, t, n) {
    let r = this.kind === `giant` ? Math.floor(n / 8) % 2 : 0,
      i = JSON.stringify([e, t, r]);
    if (i === this.key) return;
    this.key = i;
    let a = this.canvas.getContext(`2d`);
    if (!a) return;
    let { width: o, height: s } = this,
      c = a.createLinearGradient(0, 0, 0, s);
    (c.addColorStop(0, `#071240`),
      c.addColorStop(1, `#020616`),
      (a.fillStyle = c),
      a.fillRect(0, 0, o, s));
    let l = e
        ? t || e.lap >= e.laps
          ? `FINAL LAP`
          : `LAP ${Math.max(1, e.lap)}/${e.laps}`
        : `RACE DAY`,
      u = (e, t = 800) =>
        `${t} ${Math.round(e)}px Arial, Helvetica, sans-serif`;
    if (((a.textBaseline = `middle`), this.kind === `ring`)) {
      let t = [
        `MERIDIAN GRAND PRIX`,
        l,
        e?.leader ? `LEADER ${e.leader.toUpperCase()}` : `CIRCUIT 05`,
        e?.position ? `P${e.position}` : `VECTOR LEAGUE`,
      ];
      a.font = u(s * 0.52);
      let n = s * 0.4,
        r = 0;
      for (; n < o - s * 0.4;) {
        let e = t[r % t.length];
        ((a.fillStyle = r % 2 ? lv.monarch : `#ffffff`),
          (a.textAlign = `left`),
          a.fillText(e, n, s * 0.52, o),
          (n += a.measureText(e).width + s * 0.5),
          (a.fillStyle = lv.coral),
          a.fillRect(n - s * 0.33, s * 0.42, s * 0.18, s * 0.18),
          r++);
      }
    } else if (this.kind === `board`) {
      ((a.textAlign = `center`),
        (a.fillStyle = lv.monarch),
        (a.font = u(s * 0.16)),
        a.fillText(t ? `FINAL` : `LAP`, o / 2, s * 0.2, o * 0.9),
        (a.fillStyle = t ? lv.coral : `#ffffff`),
        (a.font = u(s * 0.42)));
      let n = e ? `${Math.min(e.lap, e.laps)}/${e.laps}` : `05`;
      (a.fillText(n, o / 2, s * 0.58, o * 0.92),
        (a.fillStyle = lv.ultramarine),
        a.fillRect(o * 0.1, s * 0.86, o * 0.8, s * 0.05));
    } else
      r === 0 && e
        ? ((a.textAlign = `left`),
          (a.fillStyle = t ? lv.coral : `#ffffff`),
          (a.font = u(s * 0.3)),
          a.fillText(l, o * 0.05, s * 0.27, o * 0.6),
          e.position &&
            ((a.textAlign = `right`),
            (a.fillStyle = lv.monarch),
            (a.font = u(s * 0.42)),
            a.fillText(`P${e.position}`, o * 0.95, s * 0.3, o * 0.35)),
          (a.textAlign = `left`),
          (a.fillStyle =
            (e.leaderTeam ? Xv[e.leaderTeam] : null) ?? lv.ultramarine),
          a.fillRect(o * 0.05, s * 0.56, o * 0.018, s * 0.16),
          (a.fillStyle = `#dfe6ea`),
          (a.font = u(s * 0.12, 700)),
          a.fillText(
            e.leader ? `LEADER  ${e.leader.toUpperCase()}` : `VECTOR LEAGUE`,
            o * 0.09,
            s * 0.64,
            o * 0.85,
          ),
          (a.fillStyle = lv.monarch),
          (a.font = u(s * 0.1, 700)),
          a.fillText(`MERIDIAN GRAND PRIX`, o * 0.05, s * 0.86, o * 0.9))
        : ((a.textAlign = `center`),
          (a.fillStyle = lv.monarch),
          (a.font = u(s * 0.3)),
          a.fillText(`MERIDIAN`, o / 2, s * 0.38, o * 0.9),
          (a.fillStyle = `#ffffff`),
          (a.font = u(s * 0.12, 700)),
          a.fillText(`GRAND PRIX  ·  CIRCUIT 05`, o / 2, s * 0.62, o * 0.9),
          (a.fillStyle = t ? lv.coral : lv.laneCyan),
          (a.font = u(s * 0.1, 700)),
          a.fillText(l, o / 2, s * 0.82, o * 0.9));
    ((this.texture.needsUpdate = !0), this.draws++);
  }
  dispose() {
    (this.texture.dispose(), (this.canvas.width = this.canvas.height = 1));
  }
};
function $v(e, t, n) {
  let { clock: r, celebrate: i, smokeTint: a, mobile: o } = n,
    s = (n, r) => {
      let i = e.roots.get(n)?.userData[r] ?? [],
        a = [],
        o = new he();
      for (let e of t.filter((e) => e.asset === n)) {
        o.setFromMatrix4(e.matrix);
        for (let t of i)
          a.push({
            p: new A(t[0], t[1], t[2]).applyMatrix4(e.matrix),
            d: new A(t[3] ?? 0, t[4] ?? 1, t[5] ?? 0)
              .applyMatrix3(o)
              .normalize(),
          });
      }
      return a;
    },
    c = s(`crown-stand-bay`, `flagMasts`),
    l = Math.min(o ? 6 : 12, c.length);
  c = Array.from(
    { length: l },
    (e, t) => c[Math.floor(((t + 0.5) * c.length) / l)],
  );
  let u = s(`podium-stage`, `confetti`).slice(0, 6);
  if (!c.length && !u.length) return null;
  let d = new An();
  ((d.name = `Meridian · celebration`), (d.visible = !1));
  let f = { smoke: 0, confetti: 0 };
  if (c.length) {
    let e = o ? 12 : 32,
      t = jr(
        c.map((e) => new Qt(e.p.x, e.p.y + 2, e.p.z, 0)),
        `vec4`,
      ),
      n = new Gn({ name: `Meridian smoke`, transparent: !0, depthWrite: !1 }),
      s = Er.toFloat(),
      l = Vi(s, c.length),
      u = Cr(s.div(c.length)),
      p = t.element(l.toInt()),
      m = B(r.mul(0.085).add(u.div(e)).add(qr(l).mul(0.37))),
      h = u.mul(1.7).add(l),
      g = V(1).sub(V(1).sub(m).pow(2)).mul(46),
      _ = m.mul(m).mul(42);
    ((n.positionNode = p.xyz.add(
      J(
        Hr(h).mul(m).mul(4).add(_),
        g,
        Rr(h.mul(1.3)).mul(m).mul(4).add(_.mul(0.35)),
      ),
    )),
      (n.scaleNode = q(m.sqrt().mul(30).add(5))),
      (n.rotationNode = qr(s).mul(6.28).add(m.mul(0.8))));
    let v = X().sub(0.5),
      y = Hr(v.x.mul(11).add(qr(s).mul(20)))
        .mul(Hr(v.y.mul(9).add(qr(s.add(3)).mul(20))))
        .mul(0.12),
      b = Z(0.5, 0.04, v.length().add(y));
    ((n.colorNode = Y(
      a.mul(1.15),
      J(0.93, 0.94, 0.95),
      K(0.5, Vi(l, 2)).mul(0.3).add(m.mul(0.5)),
    ).mul(v.y.negate().mul(0.35).add(0.9))),
      (n.opacityNode = b
        .mul(Z(0, 0.05, m))
        .mul(vr(V(1).sub(m), 1.2))
        .mul(0.82)
        .mul(i)));
    let x = new Et(n);
    ((x.count = c.length * e),
      (x.frustumCulled = !1),
      (x.renderOrder = 3),
      (x.name = `Meridian · final-lap smoke`),
      (x.userData.reflectionHidden = !0),
      d.add(x),
      (f.smoke = x.count));
  }
  if (u.length) {
    let e = o ? 50 : 140,
      t = jr(
        u.flatMap((e) => [
          new Qt(e.p.x, e.p.y, e.p.z, 0),
          new Qt(e.d.x, e.d.y, e.d.z, 0),
        ]),
        `vec4`,
      ),
      n = new Gn({ name: `Meridian confetti`, depthWrite: !0 }),
      a = Er.toFloat(),
      s = Vi(a, u.length),
      c = t.element(s.mul(2).toInt()),
      l = t.element(s.mul(2).add(1).toInt()),
      p = B(r.div(6).add(qr(s).mul(0.5))).mul(6),
      m = qr(a.add(11)),
      h = qr(a.add(23)),
      g = qr(a.add(37)),
      _ = J(m.sub(0.5), h.mul(0.4), g.sub(0.5)).mul(0.9),
      v = l.xyz.add(_).normalize().mul(h.mul(10).add(16)),
      y = 1.3,
      b = V(1)
        .sub(Pr(p.mul(-y)))
        .div(y),
      x = J(
        Hr(p.mul(3).add(m.mul(9))).mul(0.6),
        0,
        Rr(p.mul(2.6).add(g.mul(9))).mul(0.6),
      );
    ((n.positionNode = c.xyz
      .add(v.mul(b))
      .add(J(0, p.mul(-1.7), 0))
      .add(x.mul(p.min(1)))),
      (n.scaleNode = q(0.32, 0.2)
        .mul(K(p, 5.6))
        .mul(i.greaterThan(0.01).select(1, 0))),
      (n.rotationNode = p.mul(m.mul(9).add(4))));
    let S = Cr(g.mul(5)),
      C = [lv.monarch, lv.ultramarine, lv.coral, `#ffffff`, lv.manta].map(
        (e) => new j(e),
      ),
      w = J(C[0].r, C[0].g, C[0].b);
    for (let e = 1; e < C.length; e++)
      w = Br(S.greaterThanEqual(e), J(C[e].r, C[e].g, C[e].b), w);
    n.colorNode = w.mul(
      Hr(p.mul(9).add(h.mul(6)))
        .abs()
        .mul(0.6)
        .add(0.6),
    );
    let T = new Et(n);
    ((T.count = u.length * e),
      (T.frustumCulled = !1),
      (T.name = `Meridian · confetti`),
      (T.userData.reflectionHidden = !0),
      d.add(T),
      (f.confetti = T.count));
  }
  return { group: d, info: f };
}

// assets__game-CsnOSIff 71 — push
// Lines 30216-30624 of readable/assets__game-CsnOSIff.pretty.js (statement-aligned).
function Ib(e) {
  let t = new uy(),
    n = up(),
    r = [],
    i = [],
    a = {
      lead: Ab(`monorail-car-lead`, e),
      mid: Ab(`monorail-car-mid`, e),
      tail: Ab(`monorail-car-tail`, e),
    },
    o = (e) => n.stations.find((t) => t.id === e);
  {
    let n = py(`marina`),
      r = o(`crown-station`),
      s = e ? 2 : 3,
      { period: c } = vy(n.length, r.to - 2, 15, 26, 1, 0);
    for (let e = 0; e < s; e++) {
      let o = vy(n.length, r.to - 2, 15, 26, 1, (c * e) / s + 11);
      i.push(
        new _y(`marina-${e}`, `marina`, n, by(t, a, 2, gy.marina), o.fn, 26),
      );
    }
  }
  {
    let n = py(`freight`),
      r = o(`stackyard-station`),
      s = e ? 1 : 2,
      { period: c } = vy(n.length, r.to - 2, 24, 18, 0.8, 0);
    for (let o = 0; o < s; o++) {
      let l = [],
        u = t.take(`transit`, a.lead, 1, `train`);
      (t.paint(u, gy.freight), l.push({ unit: u, offset: hy.lead / 2 }));
      let d = hy.lead + hy.gap;
      for (let n = 0; n < 4; n++) {
        let r = t.take(`transit`, Ab(`freight-wagon`, e), 1, `train`);
        t.paint(r, gy.freight);
        let i = [];
        if ((n + o) % 2 == 0) {
          let e = t.take(`flying`, `container-12`, 1, `container`);
          (t.paint(e, Math.floor(ey(41, o, n) * 8)), i.push({ unit: e, z: 0 }));
        } else
          for (let e of [-3.3, 3.3]) {
            let r = t.take(`flying`, `container-6`, 1, `container`);
            (t.paint(r, Math.floor(ey(43, o * 7 + n, +(e > 0)) * 8)),
              i.push({ unit: r, z: e }));
          }
        (l.push({ unit: r, offset: d + hy.wagon / 2, cargo: i }),
          (d += hy.wagon + hy.gap));
      }
      let f = vy(n.length, r.to - 2, 24, 18, 0.8, (c * o) / s + 37);
      i.push(new _y(`freight-${o}`, `freight`, n, l, f.fn, 18));
    }
  }
  {
    let e = py(`aurelian`),
      n = o(`aurelian-station`),
      r = by(t, a, 2, gy.aurelian),
      s = r.at(-1).offset + hy.tail / 2,
      c = yy(n.from + 2, e.length - 30, s, 22, 8, 24, 1, 5);
    i.push(new _y(`aurelian`, `aurelian`, e, r, c.fn, 24));
  }
  {
    let e = py(`crown`),
      n = by(t, a, 2, gy.crown),
      r = yy(30, Lb, n.at(-1).offset + hy.tail / 2, 10, 10, 30, 1, 23);
    i.push(new _y(`crown`, `crown`, e, n, r.fn, 30));
  }
  r.push(...i);
  let s = new Sy(py(`crown`), by(t, a, 3, gy.crown));
  r.push(s);
  let c = e ? 2 : 3,
    l = new wy(
      py(`maglev`),
      t.take(`transit`, Ab(`maglev-pod`, e), c),
      t.take(`transit`, `maglev-pod-streak`, c),
      e ? 10 : 7,
      n.lines.get(`maglev`).path.nearestS(...vf.centre),
    );
  r.push(l);
  let u = [],
    d = My(0),
    f = Math.cos(d.heading),
    p = Math.sin(d.heading),
    m = Mb.filter(
      (t) => (!e || t.mobile) && n.lines.get(t.id).allow?.includes(`leviathan`),
    )
      .map((e) => {
        let t = n.lines.get(e.id).path,
          r = t.pointAt(t.length - Oy.cut);
        return {
          id: e.id,
          along: (r.x - d.x) * f + (r.z - d.z) * p,
          side: Math.sign((r.x - d.x) * -p + (r.z - d.z) * f) || 1,
        };
      })
      .sort((e, t) => t.along - e.along),
    h = new Map(m.map((e, t) => [e.id, { along: Ey[t], side: e.side }])),
    g = iy();
  for (let r of Mb) {
    if (e && !r.mobile) continue;
    let i = n.lines.get(r.id).path,
      a = h.get(r.id);
    if (a) {
      let e = i.pointAt(i.length),
        [t, , n] = Ny(d, a.along, 0),
        r = Oy.staging * a.side;
      i = Fb(i, [t - p * r, e.y, n + f * r], [t, e.y, n], Oy.cut);
    } else if (r.silo) {
      let e = i.pointAt(i.length),
        t = i.tangentAt(i.length - 1),
        n = Math.hypot(t.x, t.z) || 1,
        r = t.x / n,
        a = t.z / n,
        o = e.y + By,
        s = [e.x - a * zy, o, e.z + r * zy];
      i = Fb(i, [s[0] - r * 30, o, s[2] - a * 30], s, 60);
    }
    let o = oy.flight(i, 1, 0),
      s = [0, 1].map((e) => {
        o.at(e === 0 ? 0 : o.length, g);
        let t = [g.px, g.py, g.pz],
          n = o.heading(e === 0 ? 1 : o.length - 1, g),
          i = jb(t[0], t[2]),
          s = !!a && e === 1;
        return {
          kind: s ? `bay` : r.drops[e] > 0 || i.d > 40 ? `drop` : `rack`,
          hover: t,
          inYaw: e === 0 ? n + Math.PI : n,
          outYaw: e === 0 ? n : n + Math.PI,
          nx: i.nx,
          nz: i.nz,
          along: s ? a.along : 0,
          drop: (r.drops[e] || 10) + (r.silo && e === 1 ? By : 0),
        };
      }),
      c = t.take(
        `flying`,
        e || !r.near ? `heavy-lift-drone-lod` : `heavy-lift-drone`,
        1,
      ),
      l = t.take(`flying`, `container-12`, 1, `container`),
      m = ty(r.id) % 10007;
    u.push(new Hy(r.id, o, s[0], s[1], c, l, ey(m) * 80, m));
  }
  r.push(...u);
  {
    let i = oy.flight(n.lines.get(`silo-conveyor`).path, 1, 0),
      a = e ? 4 : 10,
      o = Wy.period(i);
    for (let e = 0; e < a; e++) {
      let n = t.take(`flying`, `heavy-lift-drone-lod`, 1),
        s = t.take(`flying`, `container-12`, 1, `container`);
      (t.paint(s, Math.floor(ey(61, e) * 8)),
        r.push(new Wy(i, n, s, (o * e) / a, e * 1.37)));
    }
  }
  for (let n = 0; n < (e ? 4 : 8); n++) {
    let [e, i] = Nb[n],
      [a, o] = Sf[e].centre,
      [s, c] =
        i === `n` ? [0, -1] : i === `s` ? [0, 1] : i === `e` ? [1, 0] : [-1, 0],
      l = t.take(`flying`, `stack-gantry`, 1),
      u = t.take(`flying`, `container-12`, 1, `container`);
    (t.paint(u, Math.floor(ey(71, n) * 8)),
      r.push(new Ky(a, o, s, c, l, u, ey(73, n) * Gy.period, 100 + n)));
  }
  (r.push(
    new Fy(
      t.take(`flying`, Ab(`leviathan-depot-airship`, e), 1),
      t.take(`flying`, `leviathan-tether`, 2),
    ),
  ),
    [`blimp-grand-prix`, `blimp-summit`, `blimp-stackyard`]
      .slice(0, e ? 2 : 3)
      .forEach((n, i) => {
        let a = my(n, 4, 0.2);
        r.push(
          new qy(
            a,
            t.take(`flying`, Ab(`ad-blimp`, e), 1),
            8,
            a.length * ey(81, i),
            0,
            0,
            0.6,
            0,
            i,
          ),
        );
      }));
  let _ = [],
    v = e ? 1 : 2;
  for (let n = 1; n <= 4; n++) {
    let r = my(`taxi-pad${n}-in`, 2, 0),
      i = my(`taxi-pad${n}-out`, 2, 0),
      { period: a } = tb(r, i);
    for (let o = 0; o < v; o++)
      _.push(
        new nb(
          r,
          i,
          t.take(`flying`, Ab(`aero-taxi`, e), 1),
          (a * o) / v + (a * (n - 1)) / 4 / v,
        ),
      );
  }
  r.push(..._);
  for (let i of [`boulevard`, `canyon`])
    for (let a of [25, 45, 70]) {
      let o = `sky-${i}-${a}`,
        s = my(o, 2, 0.6),
        c = n.lines.get(o).speed,
        l = ty(o) % 10007;
      if (a === 25) {
        let n = e ? 4 : 7;
        for (let i = 0; i < n; i++)
          r.push(
            new qy(
              s,
              t.take(`flying`, e ? `sky-car-lod` : `sky-car`, 1),
              c,
              (s.length * (i + 0.3 * ey(l, i))) / n,
              0,
              -0.78 + 0.4 * (ey(l, i, 1) * 2 - 1),
              0.12,
              0.06,
              i,
            ),
          );
      } else if (a === 45) {
        let n = e ? 4 : 9;
        for (let i = 0; i < n; i++) {
          let a = (s.length * (i + 0.35 * ey(l, i))) / n,
            o = i % 2 ? 3.4 : -3.4;
          i % 2
            ? r.push(
                new Yy(
                  s,
                  t.take(`flying`, `courier-drone`, e ? 4 : 5),
                  c,
                  a,
                  o,
                  1.4 * (ey(l, i, 2) * 2 - 1),
                  i * 2.3,
                ),
              )
            : r.push(
                new qy(
                  s,
                  t.take(`flying`, Ab(`aero-taxi`, e), 1),
                  c,
                  a,
                  o,
                  -1.2 + 1.4 * (ey(l, i, 3) * 2 - 1),
                  0.25,
                  0.1,
                  i,
                ),
              );
        }
      } else {
        let n = e ? 3 : 7;
        for (let e = 0; e < n; e++)
          r.push(
            new qy(
              s,
              t.take(`flying`, `sky-car-lod`, 1),
              c,
              (s.length * (e + 0.4 * ey(l, e))) / n,
              e % 2 ? 3.2 : -3.2,
              -0.78 + 1.6 * (ey(l, e, 4) * 2 - 1),
              0.3,
              0.07,
              e,
            ),
          );
      }
    }
  for (let i of [`expressway-knot`, `expressway-cutting`]) {
    let a = n.lines.get(i),
      o = my(i, 2, 0),
      s = ty(i) % 10007,
      c = 0;
    for (let n of [1, -1])
      Qy.lanes.forEach((i, l) => {
        let u = a.speed * Qy.pace[l],
          d = e ? 2 : 3;
        for (let a = 0; a < d; a++) {
          let f = e
              ? 1 + Math.floor(ey(s, c, 1) * 2)
              : 2 + Math.floor(ey(s, c, 1) * 3),
            p = (o.length * (a + 0.6 * ey(s, c, 2))) / d;
          for (let a = 0; a < f; a++, c++) {
            let d = ey(s, c, 3),
              f =
                l === 1
                  ? d < 0.35
                    ? `cargo-truck`
                    : d < 0.6 && !e
                      ? `autonomous-bus`
                      : `pod-car`
                  : d < 0.3 && !e
                    ? `sports-car`
                    : `pod-car`,
              m =
                f === `cargo-truck`
                  ? `container`
                  : f === `autonomous-bus`
                    ? `train`
                    : f === `sports-car`
                      ? `craft`
                      : null,
              h = t.take(`transit`, Ab(f, e), 1, m);
            if (m) {
              let e = Math.floor(ey(s, c, 4) * 8);
              t.paint(h, m === `train` ? [0, 1, 3][e % 3] : e);
            }
            r.push(
              new $y(o, h, u, p - a * (Qy.gap + 4 * ey(s, c, 5)), n, n * i),
            );
          }
        }
      });
  }
  let y = rb
    .slice(0, e ? 2 : 4)
    .map((e) => new cb(e, t.take(`flying`, `broadcast-drone`, 1)));
  (r.push(...y),
    Pb.forEach((n, i) => {
      for (let a = 0; a < (e ? 1 : 2); a++)
        r.push(
          new Xy(
            n.centre,
            n.radius - a * 8,
            5.5 + a,
            i * 2.1 + a * Math.PI,
            t.take(`flying`, `patrol-drone`, 1),
          ),
        );
    }),
    r.push(
      new Zy(
        [-4200, 1150, -2600],
        [4200, 1150, -1700],
        225,
        70,
        0,
        t.take(`flying`, `airliner-far`, 1),
      ),
      new Zy(
        [3800, 1500, 2700],
        [-3600, 1500, 1500],
        215,
        95,
        41,
        t.take(`flying`, `airliner-far`, 1),
      ),
    ),
    lb.forEach((n, i) => {
      let a = oy.flight(new ef(db(n), !0), 1, ub.speed, 0.5, 0.1),
        o = e ? 1 : 2,
        s = ub.dwell + ny(a.length, ub.speed, ub.accel);
      for (let e = 0; e < o; e++)
        r.push(
          new fb(
            a,
            t.take(`street`, `water-taxi`, 1),
            (s * e) / o + i * 9.7,
            i * 2 + e,
          ),
        );
    }));
  let b = Sm.filter((e) => e.id === `kinetic-chandelier`);
  r.push(new hb(t.take(`hotel`, Ab(`kinetic-chandelier`, e), b.length), b));
  for (let e of Sm.filter((e) => e.id === `glass-lift`))
    r.push(new yb(t.take(`hotel`, `glass-lift`, 1), e));
  return (
    e ||
      xb.slots.forEach((e, n) =>
        r.push(
          new Sb(
            e,
            t.take(`skyline`, `window-cleaner-gondola`, 1),
            t.take(`skyline`, `window-cleaner-cable`, 1),
            ey(91, n) * 200,
          ),
        ),
      ),
    bb().forEach((e, n) =>
      km[`canyon-pair-tower`].lifts.forEach((i, a) =>
        r.push(
          new wb(e, i, t.take(`hotel`, `glass-lift`, 1), ey(93, n, a) * 120),
        ),
      ),
    ),
    r.push(new Db(t.take(`transit`, `sky-gondola-cabin`, e ? 6 : 12))),
    r.push(new kb(t.take(`street`, `meridian-line-ring`, 3))),
    {
      movers: r,
      pacer: s,
      maglev: l,
      broadcast: y,
      routes: u,
      trains: i,
      taxis: _,
      slots: t,
    }
  );
}

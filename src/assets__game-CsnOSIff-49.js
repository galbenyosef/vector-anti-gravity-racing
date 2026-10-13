// assets__game-CsnOSIff 49 — path
// Lines 20725-20991 of readable/assets__game-CsnOSIff.pretty.js (statement-aligned).
function bg(e) {
  let { b: t, mobile: n } = e,
    { lines: r, pylons: i, stations: a } = up(),
    o = Rf.find((e) => e.id === `aurelian-shell`),
    s = (e, t, r) => (n || yg(t, r) > 160 ? `${e}-lod` : e),
    c = [];
  for (let e of r.values()) {
    if (e.kind !== `monorail`) continue;
    let t = [];
    for (let n = 0; n < e.path.length; n += 2) {
      let r = e.path.pointAt(n);
      Gh(r.x - 20, r.z - 20, r.x + 20, r.z + 20).some(
        (e) =>
          Math.hypot(e.x - r.x, e.z - r.z) < ah + 2 && r.y - 1.9 > e.top + 10,
      ) && t.push(n);
    }
    let n = [];
    for (let e of t) {
      let t = n.at(-1);
      t && e - t[t.length - 1] <= 6 ? t.push(e) : n.push([e]);
    }
    for (let t of n) {
      let n = (t[0] + t[t.length - 1]) / 2,
        r = n - 36.15,
        i = n + 36.15;
      if (
        [r, n, i].some((t) => {
          let n = e.path.pointAt(e.path.wrap(t));
          return zf(o, n.x, n.y, n.z, 4);
        })
      )
        continue;
      let a = e.path.headingAt(r),
        s = e.path.headingAt(i),
        l = Math.abs(s - a);
      (l > Math.PI && (l = 2 * Math.PI - l),
        !(l > 7 * lh) && c.push({ line: e.id, s0: r, s1: i }));
    }
  }
  for (let e of r.values()) {
    if (e.kind !== `monorail` && e.kind !== `maglev` && e.kind !== `expressway`)
      continue;
    let r = hg(e),
      i = (t) => {
        let n = e.path.pointAt(e.path.wrap(t));
        return zf(o, n.x, n.y, n.z, 2);
      };
    if (e.kind === `monorail`)
      for (let { s0: n, s1: a } of _g(e, 30, i)) {
        let i = e.path.pointAt(n),
          o = s(`monorail-beam`, i.x, i.z);
        t.add(`transit`, o, vg(e, r, n, a, 30), { role: `line` });
      }
    else if (e.kind === `expressway`) {
      for (let { s0: n, s1: i } of _g(e, 24, () => !1)) {
        let a = e.path.pointAt(n),
          o = s(`expressway-deck`, a.x, a.z);
        t.add(`transit`, o, vg(e, r, n, i, 24), { role: `line` });
      }
      for (let i = 300; i < e.path.length - 100; i += 600) {
        let a = e.path.pointAt(i);
        if (yg(a.x, a.z) < 60) continue;
        let o = r(i);
        t.add(
          `transit`,
          n ? `expressway-gantry-lod` : `expressway-gantry`,
          Ch(o.position, o.right, o.up, o.tangent),
          { role: `line` },
        );
      }
    } else {
      t.tubes.push({
        id: e.id,
        closed: e.path.closed,
        frames: bp(e, 2).map((e) => ({
          position: e.position,
          right: e.right,
          up: e.up,
        })),
      });
      for (let n = 10; n < e.path.length; n += 20) {
        let e = r(n);
        t.add(
          `transit`,
          `maglev-tube-ring`,
          Ch(e.position, e.right, e.up, e.tangent),
          { role: `line` },
        );
      }
    }
  }
  for (let e of i) {
    let n = r.get(e.line);
    if (c.some((t) => t.line === e.line && e.s > t.s0 - 6 && e.s < t.s1 + 6))
      continue;
    let i = n.path.pointAt(e.s),
      a = t.ground(e.x, e.z),
      o = wh(...xg(n.path.tangentAt(e.s))),
      l = 0,
      u = `monorail-pylon`,
      d = 1;
    n.kind === `monorail`
      ? ((l = i.y - 6),
        (d = gg(l - a)),
        t.add(
          `transit`,
          s(`monorail-pylon-head`, i.x, i.z),
          $(i.x, i.y, i.z, o),
          { role: `line` },
        ))
      : n.kind === `maglev`
        ? ((l = i.y - 5.5), (d = gg(l - a)))
        : ((l = i.y - 5.4),
          (u = `skyway-pier`),
          (d = 0.62),
          t.add(
            `transit`,
            s(`expressway-pier-head`, i.x, i.z),
            $(i.x, i.y, i.z, o),
            { role: `line` },
          ));
    let f = l - a;
    if (f < 1) continue;
    let p = $(e.x, a, e.z, o, d, f / 10, d);
    (t.add(`transit`, u, p, { role: `line`, group: `transit` }),
      t.register(Dh(p, Wm[u]), `transit`, `ground`));
  }
  for (let e of c) {
    let i = r.get(e.line),
      a = vg(i, hg(i), e.s0, e.s1, 72.3);
    t.add(
      `transit`,
      n ? `monorail-bridge-span-lod` : `monorail-bridge-span`,
      a,
      { role: `line` },
    );
    for (let n of [1.3, 70.7]) {
      let r = Th(a, [0, -4.6, n]),
        o = t.ground(r[0], r[2]),
        s = wh(...xg(i.path.tangentAt(e.s0))),
        c = $(r[0], o, r[2], s, 1.6, (r[1] - o) / 16, 1.6);
      (t.add(`transit`, `monorail-pylon`, c, {
        role: `line`,
        group: `transit`,
      }),
        t.register(Dh(c, Wm[`monorail-pylon`]), `transit`, `ground`));
    }
  }
  for (let e of a) {
    if (e.id === `aurelian-station`) continue;
    let i = r.get(e.line),
      a = hg(i),
      o =
        e.id === `crown-station`
          ? `station-module-crown`
          : `station-module-stackyard`,
      s = (e, t = !1) => {
        let n = a(e),
          r = t ? n.tangent.map((e) => -e) : n.tangent,
          i = t ? n.right.map((e) => -e) : n.right;
        return Ch(n.position, i, n.up, r);
      };
    for (let r = 0; r < 3; r++) {
      let a = s(i.path.wrap(e.from + r * 30));
      t.add(`transit`, n ? `${o}-lod` : o, a, { role: `line`, group: e.id });
      let c = Th(a, [0, -3, 15]),
        l = t.ground(c[0], c[2]),
        u = $(c[0], l, c[2], 0, 1.6, (c[1] - l) / 16, 1.6);
      (t.add(`transit`, `monorail-pylon`, u, {
        role: `line`,
        group: `transit`,
      }),
        t.register(Dh(u, Wm[`monorail-pylon`]), `transit`, `ground`));
    }
    for (let [r, a] of [
      [e.from, !1],
      [e.from + 90, !0],
    ]) {
      let o = s(i.path.wrap(r), a);
      t.add(`transit`, n ? `station-end-lod` : `station-end`, o, {
        role: `line`,
        group: e.id,
      });
      let c = Th(o, [4.4, -2.45, -6]),
        l = t.ground(c[0], c[2]),
        u = $(c[0], l, c[2], 0, 1, (c[1] - l) / 10, 1);
      (t.add(`transit`, `station-core`, u, { role: `line`, group: `transit` }),
        t.register(Dh(u, Wm[`station-core`]), `transit`, `ground`));
      let d = wh(...xg(i.path.tangentAt(i.path.wrap(r))));
      for (let e of [-7, 7]) {
        let n = c[0] + Math.cos(d) * e,
          r = c[2] - Math.sin(d) * e;
        t.place(`street`, `ticket-gates`, $(n, t.ground(n, r), r, d), {
          role: `ground`,
          margin: 6,
          noLines: !0,
        });
      }
    }
  }
}
function xg(e) {
  return [e.x, e.z];
}
function Sg(e, t, n, r, i, a) {
  let o = Qm(n),
    s = [...new Set(o.map((e) => e[1]))].sort((e, t) => e - t),
    c = 0,
    l = 0;
  for (let n of s)
    for (let u of o.filter((e) => e[1] === n)) {
      let o = Th(t, u);
      a?.(o) ||
        (c < i.figures && n === s[0]
          ? (c++,
            e.b.add(`venue`, `crowd-figure`, $(o[0], o[1], o[2], r), {
              role: `attached`,
              variant: Math.floor(e.random() * 16),
            }))
          : l < i.cards &&
            e.random() < 0.5 &&
            (l++,
            e.b.add(
              `venue`,
              `crowd-card`,
              $(o[0], o[1], o[2], r, 0.9 + e.random() * 0.2),
              { role: `attached`, variant: Math.floor(e.random() * 16) },
            )));
    }
}
function Cg(e, t, n, r, i, a = `crowd-figure`) {
  for (let o of r) {
    if (e.random() > i) continue;
    let r = Th(t, o),
      s = e.mobile ? `crowd-card` : a;
    (e.mobile && e.random() > 0.5) ||
      e.b.add(`venue`, s, $(r[0], r[1], r[2], n + (o[3] ?? 0) * lh), {
        role: `attached`,
        variant: Math.floor(e.random() * 16),
      });
  }
}
function wg(e, t, n, r, i, a, o) {
  e.b.screens.push({
    position: Th(t, n),
    yaw: r,
    width: i,
    height: a,
    kind: o,
  });
}
var Tg = Math.atan2(0.4, 1);
function Eg(e, t, n) {
  e.b.add(`venue`, `flag-mast`, $(t[0], t[1], t[2], Tg), {
    role: `attached`,
    variant: n,
  });
}
function Dg(e, t) {
  let n = t.toLocal(e);
  return (
    n[0] > -40 &&
    n[0] < Nh + 40 &&
    Math.abs(n[2]) < 45 &&
    e[1] > t.origin[1] - Mh.bellyDepth - 2
  );
}

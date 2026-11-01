// assets__player-D3Mk6s3d 02 — points
// Lines 238-521 of readable/assets__player-D3Mk6s3d.pretty.js (statement-aligned).
var Ee = 5.6,
  I = [
    {
      x: 0,
      strokes: [
        {
          points: [
            [0, 5],
            [0, 0],
          ],
        },
        {
          points: [
            [1.3, 5],
            [1.3, 1.15],
          ],
        },
        {
          points: [
            [2.6, 5],
            [2.6, 2.3],
          ],
        },
      ],
    },
    ...[
      [
        {
          points: [
            [0, 5],
            [1.55, 0],
            [2.45, 0],
            [4, 5],
          ],
        },
      ],
      [
        {
          points: [
            [4, 5],
            [0, 5],
            [0, 0],
            [4, 0],
          ],
        },
        {
          points: [
            [0, 2.5],
            [3, 2.5],
          ],
        },
      ],
      [
        {
          points: [
            [4, 5],
            [1.1, 5],
            [0, 3.9],
            [0, 1.1],
            [1.1, 0],
            [4, 0],
          ],
        },
      ],
      [
        {
          points: [
            [0, 5],
            [4, 5],
          ],
        },
        {
          points: [
            [2, 5],
            [2, 0],
          ],
        },
      ],
      [
        {
          points: [
            [1.1, 5],
            [2.9, 5],
            [4, 3.9],
            [4, 1.1],
            [2.9, 0],
            [1.1, 0],
            [0, 1.1],
            [0, 3.9],
          ],
          closed: !0,
        },
      ],
      [
        {
          points: [
            [0, 0],
            [0, 5],
          ],
        },
        {
          points: [
            [0, 5],
            [2.9, 5],
            [4, 3.9],
            [4, 3.6],
            [2.9, 2.5],
            [0, 2.5],
          ],
        },
        {
          points: [
            [2.2, 2.5],
            [4, 0],
          ],
        },
      ],
    ].map((e, t) => ({ x: 4.3 + t * Ee, strokes: e })),
  ],
  De = 0.3,
  L = 0.95,
  Oe = -L / 2,
  ke = I[I.length - 1].x + 4 + L / 2,
  Ae = ke - Oe + 5 * De,
  je = 5 + L,
  Me = (Oe + ke + 5 * De) / 2;
function Ne(e, t, n) {
  let r = [],
    i = t ? e.length : e.length - 1;
  for (let t = 0; t < i; t++) {
    let [i, a] = e[t],
      [o, s] = e[(t + 1) % e.length],
      c = Math.max(1, Math.ceil(Math.hypot(o - i, s - a) / n));
    for (let e = 0; e < c; e++)
      r.push([i + ((o - i) * e) / c, a + ((s - a) * e) / c]);
  }
  return (t ? r.push(r[0]) : r.push(e[e.length - 1]), r);
}
function Pe(e, t, n) {
  let r = e.length;
  return e.map(([i, a], o) => {
    let s = t && o === 0 ? e[r - 2] : e[Math.max(0, o - 1)],
      c = t && o === r - 1 ? e[1] : e[Math.min(r - 1, o + 1)],
      l = i - s[0],
      u = a - s[1],
      d = c[0] - i,
      f = c[1] - a,
      p = Math.hypot(l, u) || 1,
      m = Math.hypot(d, f) || 1,
      h = -u / p,
      g = l / p,
      _ = -f / m,
      v = d / m;
    (o === 0 && !t && ([h, g] = [_, v]),
      o === r - 1 && !t && ([_, v] = [h, g]));
    let y = h + _,
      b = g + v,
      x = Math.hypot(y, b) || 1;
    ((y /= x), (b /= x));
    let S = n / Math.max(0.4, y * _ + b * v);
    return { left: [i + y * S, a + b * S], right: [i - y * S, a - b * S] };
  });
}
var Fe = (e, t) => [e + t * De - Me, t - 2.5];
function Ie() {
  let e = [],
    t = [],
    n = [],
    r = [],
    i = [],
    a = [],
    o = [];
  I.forEach((s, c) => {
    s.strokes.forEach((l, u) => {
      let d = Ne(l.points, !!l.closed, 0.25).map(([e, t]) => [e + s.x, t]),
        f = Pe(d, !!l.closed, L / 2),
        p = 0,
        m = d.map(
          (e, t) => (
            t && (p += Math.hypot(e[0] - d[t - 1][0], e[1] - d[t - 1][1])),
            p
          ),
        ),
        h = e.length / 3;
      f.forEach(({ left: s, right: l }, d) => {
        for (let [o, f] of [
          [s, -1],
          [l, 1],
        ]) {
          let [s, l] = Fe(o[0], o[1]);
          (e.push(s, l, 0),
            t.push(m[d] / (p || 1)),
            n.push(f),
            r.push(c * 0.065 + u * 0.05),
            i.push(o[1] / 5),
            a.push(c));
        }
        if (d) {
          let e = h + (d - 1) * 2;
          o.push(e, e + 1, e + 2, e + 1, e + 3, e + 2);
        }
      });
    });
  });
  let s = new S();
  return (
    s.setAttribute(`position`, new b(e, 3)),
    s.setAttribute(`aAlong`, new b(t, 1)),
    s.setAttribute(`aSide`, new b(n, 1)),
    s.setAttribute(`aDelay`, new b(r, 1)),
    s.setAttribute(`aHeight`, new b(i, 1)),
    s.setAttribute(`aLetter`, new b(a, 1)),
    s.setIndex(o),
    s
  );
}
function Le(e = 1.1) {
  let t = [];
  for (let r of I)
    for (let i of r.strokes) {
      let a = !!i.closed,
        o = Pe(
          (a ? [...i.points, i.points[0]] : i.points).map(([e, t]) => [
            e + r.x,
            t,
          ]),
          a,
          L / 2,
        ),
        s;
      if (a) {
        let e = o.slice(0, -1);
        ((s = new de(e.map(({ left: e }) => new n(...e)))),
          s.holes.push(new me(e.map(({ right: e }) => new n(...e)))));
      } else
        s = new de(
          [
            ...o.map(({ left: e }) => e),
            ...o.map(({ right: e }) => e).reverse(),
          ].map((e) => new n(...e)),
        );
      t.push(
        new re(s, {
          depth: e,
          bevelEnabled: !0,
          bevelThickness: 0.2,
          bevelSize: 0.12,
          bevelSegments: 2,
        }),
      );
    }
  let r = Re(t);
  t.forEach((e) => e.dispose());
  let i = r.getAttribute(`position`);
  for (let t = 0; t < i.count; t++) {
    let [n, r] = Fe(i.getX(t), i.getY(t));
    i.setXYZ(t, n, r, i.getZ(t) - e / 2);
  }
  return (r.computeVertexNormals(), r);
}
function Re(e) {
  let t = [[], []],
    n = [[], []];
  for (let r of e) {
    let e = r.index ? r.toNonIndexed() : r,
      i = e.getAttribute(`position`),
      a = e.getAttribute(`normal`);
    for (let e of r.groups) {
      let r = Math.min(1, e.materialIndex ?? 0);
      for (let o = e.start; o < e.start + e.count; o++)
        (t[r].push(i.getX(o), i.getY(o), i.getZ(o)),
          n[r].push(a.getX(o), a.getY(o), a.getZ(o)));
    }
    e !== r && e.dispose();
  }
  let r = new S();
  return (
    r.setAttribute(`position`, new b([...t[0], ...t[1]], 3)),
    r.setAttribute(`normal`, new b([...n[0], ...n[1]], 3)),
    r.addGroup(0, t[0].length / 3, 0),
    r.addGroup(t[0].length / 3, t[1].length / 3, 1),
    r
  );
}

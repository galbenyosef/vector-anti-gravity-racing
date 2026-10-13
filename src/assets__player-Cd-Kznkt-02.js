// assets__player-Cd-Kznkt 02 — points
// Lines 238-521 of readable/assets__player-Cd-Kznkt.pretty.js (statement-aligned).
var Te = 5.6,
  L = [
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
    ].map((e, t) => ({ x: 4.3 + t * Te, strokes: e })),
  ],
  Ee = 0.3,
  R = 0.95,
  De = -R / 2,
  Oe = L[L.length - 1].x + 4 + R / 2,
  ke = Oe - De + 5 * Ee,
  Ae = 5 + R,
  je = (De + Oe + 5 * Ee) / 2;
function Me(e, t, n) {
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
function Ne(e, t, n) {
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
var Pe = (e, t) => [e + t * Ee - je, t - 2.5];
function Fe() {
  let e = [],
    t = [],
    n = [],
    r = [],
    i = [],
    a = [],
    o = [];
  L.forEach((s, c) => {
    s.strokes.forEach((l, u) => {
      let d = Me(l.points, !!l.closed, 0.25).map(([e, t]) => [e + s.x, t]),
        f = Ne(d, !!l.closed, R / 2),
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
          let [s, l] = Pe(o[0], o[1]);
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
  let s = new N();
  return (
    s.setAttribute(`position`, new T(e, 3)),
    s.setAttribute(`aAlong`, new T(t, 1)),
    s.setAttribute(`aSide`, new T(n, 1)),
    s.setAttribute(`aDelay`, new T(r, 1)),
    s.setAttribute(`aHeight`, new T(i, 1)),
    s.setAttribute(`aLetter`, new T(a, 1)),
    s.setIndex(o),
    s
  );
}
function Ie(e = 1.1) {
  let t = [];
  for (let n of L)
    for (let r of n.strokes) {
      let i = !!r.closed,
        a = Ne(
          (i ? [...r.points, r.points[0]] : r.points).map(([e, t]) => [
            e + n.x,
            t,
          ]),
          i,
          R / 2,
        ),
        o;
      if (i) {
        let e = a.slice(0, -1);
        ((o = new he(e.map(({ left: e }) => new s(...e)))),
          o.holes.push(new g(e.map(({ right: e }) => new s(...e)))));
      } else
        o = new he(
          [
            ...a.map(({ left: e }) => e),
            ...a.map(({ right: e }) => e).reverse(),
          ].map((e) => new s(...e)),
        );
      t.push(
        new m(o, {
          depth: e,
          bevelEnabled: !0,
          bevelThickness: 0.2,
          bevelSize: 0.12,
          bevelSegments: 2,
        }),
      );
    }
  let n = Le(t);
  t.forEach((e) => e.dispose());
  let r = n.getAttribute(`position`);
  for (let t = 0; t < r.count; t++) {
    let [n, i] = Pe(r.getX(t), r.getY(t));
    r.setXYZ(t, n, i, r.getZ(t) - e / 2);
  }
  return (n.computeVertexNormals(), n);
}
function Le(e) {
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
  let r = new N();
  return (
    r.setAttribute(`position`, new T([...t[0], ...t[1]], 3)),
    r.setAttribute(`normal`, new T([...n[0], ...n[1]], 3)),
    r.addGroup(0, t[0].length / 3, 0),
    r.addGroup(t[0].length / 3, t[1].length / 3, 1),
    r
  );
}

// assets__index-DphGw8Ou 01 — artist
// Lines 21128-21390 of readable/assets__index-DphGw8Ou.pretty.js (statement-aligned).
var ju = [
    {
      id: `solar-slipstream`,
      artist: `Vela Circuit`,
      title: `Solar Slipstream`,
      url: `audio/vector-race.mp3`,
    },
    {
      id: `neon-undertow`,
      artist: `Kairo Static`,
      title: `Neon Undertow`,
      url: `audio/neon-undertow.mp3`,
    },
    {
      id: `velocity-bloom`,
      artist: `Astra Relay`,
      title: `Velocity Bloom`,
      url: `audio/velocity-bloom.mp3`,
    },
    {
      id: `jesus-on-es`,
      artist: `superpositionuk`,
      title: `Jesus on E's`,
      url: `audio/jesus-on-es.mp3`,
    },
    {
      id: `overclock-anthem`,
      artist: `Kinetic Parade`,
      title: `Overclock Anthem`,
      url: `audio/overclock-anthem.mp3`,
    },
    {
      id: `gravity-well`,
      artist: `Nova Rail`,
      title: `Gravity Well`,
      url: `audio/gravity-well.mp3`,
    },
    {
      id: `dockside-ignition`,
      artist: `Portside Theory`,
      title: `Dockside Ignition`,
      url: `audio/dockside-ignition.mp3`,
    },
    {
      id: `breakline-fever`,
      artist: `Ion Cartel`,
      title: `Breakline Fever`,
      url: `audio/breakline-fever.mp3`,
    },
    {
      id: `afterburn-club`,
      artist: `Mira Voltage`,
      title: `Afterburn Club`,
      url: `audio/afterburn-club.mp3`,
    },
    {
      id: `grid-runners`,
      artist: `Solace Arcade`,
      title: `Grid Runners`,
      url: `audio/grid-runners.mp3`,
    },
    {
      id: `photo-finish`,
      artist: `Tessel Drive`,
      title: `Photo Finish`,
      url: `audio/photo-finish.mp3`,
    },
    {
      id: `metallic-dropouts`,
      artist: `superpositionuk`,
      title: `Metallic Dropouts (Take 1)`,
      url: `audio/metallic-dropouts.mp3`,
    },
    {
      id: `metallic-dropouts-2`,
      artist: `superpositionuk`,
      title: `Metallic Dropouts (Take 2)`,
      url: `audio/metallic-dropouts-2.mp3`,
    },
    {
      id: `metallic-dropouts-3`,
      artist: `superpositionuk`,
      title: `Metallic Dropouts (Take 3)`,
      url: `audio/metallic-dropouts-3.mp3`,
    },
    {
      id: `raw-club-mix`,
      artist: `superpositionuk`,
      title: `Raw Club Mix`,
      url: `audio/raw-club-mix.mp3`,
    },
    {
      id: `breakneck-filter`,
      artist: `superpositionuk`,
      title: `Breakneck Filter`,
      url: `audio/breakneck-filter.mp3`,
    },
    {
      id: `dance-robo-jam`,
      artist: `superpositionuk`,
      title: `DANCE ROBO JAM! (Take 1)`,
      url: `audio/dance-robo-jam.mp3`,
    },
    {
      id: `dance-robo-jam-2`,
      artist: `superpositionuk`,
      title: `DANCE ROBO JAM! (Take 2)`,
      url: `audio/dance-robo-jam-2.mp3`,
    },
  ],
  Mu = `vector-music-track`,
  Nu = `vector-music-shuffle`;
function Pu(e, t, n = Math.random) {
  let r = Array.from({ length: e }, (e, t) => t).filter((e) => e !== t);
  for (let e = r.length - 1; e > 0; e--) {
    let t = Math.floor(n() * (e + 1));
    [r[e], r[t]] = [r[t], r[e]];
  }
  return r;
}
var Fu = {
    id: `night-terminal`,
    artist: `Luma State`,
    title: `Night Terminal`,
    url: `audio/menu-groove.mp3`,
  },
  Iu = (e) => Number.isInteger(e) && e >= 1 && e <= 10,
  Lu = {
    cpuCount: 7,
    direction: `normal`,
    weapons: !0,
    disableBoostPads: !1,
    laps: 3,
  },
  Ru = `vector-race-modifiers-v1`;
function zu(e) {
  let t = e && typeof e == `object` ? e : {};
  return {
    cpuCount:
      Number.isInteger(t.cpuCount) && t.cpuCount >= 0 && t.cpuCount <= 7
        ? t.cpuCount
        : 7,
    direction: t.direction === `reverse` ? `reverse` : `normal`,
    weapons: typeof t.weapons == `boolean` ? t.weapons : !0,
    disableBoostPads:
      typeof t.disableBoostPads == `boolean` ? t.disableBoostPads : !1,
    laps: Iu(t.laps) ? t.laps : 3,
  };
}
function Bu(e) {
  if (!e || typeof e != `object`) return !1;
  let t = e;
  return (
    (t.direction === `normal` || t.direction === `reverse`) &&
    typeof t.weapons == `boolean` &&
    typeof t.disableBoostPads == `boolean` &&
    (t.laps === void 0 || Iu(t.laps))
  );
}
function Vu(e) {
  return `${e.direction}:${Number(e.weapons)}:${Number(e.disableBoostPads)}`;
}
function Hu(e) {
  return `${Vu(e)}:${Iu(e.laps) ? e.laps : 3}`;
}
function Uu(e) {
  return e.direction;
}
function Wu(e) {
  return e.direction === `normal` && e.weapons && !e.disableBoostPads;
}
function Gu(e) {
  return Wu(e) && e.laps === 3;
}
function Ku(e) {
  return Wu(e) ? `` : `-${Vu(e)}`;
}
function qu(e) {
  return { ...Lu, cpuCount: 0, direction: e.direction };
}
function Ju(e, t) {
  return e === `timed-lap` ? qu(t) : t;
}
var Yu = {
    cruise: 128,
    boost: 174,
    acceleration: 53,
    boostAcceleration: 78,
    boostDuration: 1.4,
    turbo: 214,
    turboAcceleration: 140,
    turboDuration: 2.5,
  },
  Xu = [
    {
      id: `kestrel`,
      code: `VXR-07`,
      name: `Kestrel`,
      number: `07`,
      color: `#ff6536`,
      shape: `Split-nose interceptor`,
      description: `Ceramic spear, swept stabilisers and exposed twin ion drives.`,
    },
    {
      id: `manta`,
      code: `MR-12`,
      name: `Manta`,
      number: `12`,
      color: `#54deda`,
      shape: `Swept delta wing`,
      description: `A continuous ocean-blue wing with glacier edges and close-set engines.`,
    },
    {
      id: `talon`,
      code: `HX-33`,
      name: `Talon`,
      number: `33`,
      color: `#ff6576`,
      shape: `Asymmetric outrigger`,
      description: `An offset crimson spear, single dorsal sail and independent power pod.`,
    },
    {
      id: `monarch`,
      code: `AR-88`,
      name: `Monarch`,
      number: `88`,
      color: `#d9b572`,
      shape: `Twin-hull catamaran`,
      description: `Violet armour, an open bow and a gold crown over the command bridge.`,
    },
    {
      id: `vesper`,
      code: `VS-64`,
      name: `Vesper`,
      number: `64`,
      color: `#ff4fa3`,
      shape: `Forward-swept gull`,
      description: `Burnished copper gull wings, magenta leading edges and twin ion throats.`,
    },
  ],
  Zu = `vector-player-ship`;
function Qu(e) {
  return Xu.find((t) => t.id === e) ?? Xu[0];
}
function $u(e, t = `original`) {
  return `models/${e}${e === `kestrel` && t === `wavedash` ? `-wavedash` : e === `manta` && t === `claude` ? `-claude` : ``}-player.glb`;
}
function ed(e) {
  let t = [],
    n = () => (
      (e = (Math.imul(e, 1664525) + 1013904223) >>> 0),
      e / 4294967296
    );
  for (; t.length < 7;) {
    let e = Xu.map((e) => e.id);
    for (let t = e.length - 1; t > 0; t--) {
      let r = Math.floor(n() * (t + 1));
      [e[t], e[r]] = [e[r], e[t]];
    }
    t.push(...e);
  }
  return t.slice(0, 7);
}

// assets__index-DF2rMRzV 01 — artist
// Lines 21269-21451 of readable/assets__index-DF2rMRzV.pretty.js (statement-aligned).
var Fu = [
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
  Iu = `vector-music-track`,
  Lu = `vector-music-shuffle`;
function Ru(e, t, n = Math.random) {
  let r = Array.from({ length: e }, (e, t) => t).filter((e) => e !== t);
  for (let e = r.length - 1; e > 0; e--) {
    let t = Math.floor(n() * (e + 1));
    [r[e], r[t]] = [r[t], r[e]];
  }
  return r;
}
var zu = {
    id: `night-terminal`,
    artist: `Luma State`,
    title: `Night Terminal`,
    url: `audio/menu-groove.mp3`,
  },
  Bu = (e) => Number.isInteger(e) && e >= 1 && e <= 10,
  Vu = {
    cpuCount: 7,
    direction: `normal`,
    weapons: !0,
    disableBoostPads: !1,
    laps: 3,
  },
  Hu = `vector-race-modifiers-v1`;
function Uu(e) {
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
    laps: Bu(t.laps) ? t.laps : 3,
  };
}
function Wu(e) {
  if (!e || typeof e != `object`) return !1;
  let t = e;
  return (
    (t.direction === `normal` || t.direction === `reverse`) &&
    typeof t.weapons == `boolean` &&
    typeof t.disableBoostPads == `boolean` &&
    (t.laps === void 0 || Bu(t.laps))
  );
}
function Gu(e) {
  return `${e.direction}:${Number(e.weapons)}:${Number(e.disableBoostPads)}`;
}
function Ku(e) {
  return `${Gu(e)}:${Bu(e.laps) ? e.laps : 3}`;
}
function qu(e) {
  return e.direction;
}
function Ju(e) {
  return e.direction === `normal` && e.weapons && !e.disableBoostPads;
}
function Yu(e) {
  return Ju(e) && e.laps === 3;
}
function Xu(e) {
  return Ju(e) ? `` : `-${Gu(e)}`;
}
function Zu(e) {
  return { ...Vu, cpuCount: 0, direction: e.direction };
}
function Qu(e, t) {
  return e === `timed-lap` ? Zu(t) : t;
}

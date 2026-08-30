/**
 * posts.js — single source of truth for all blog posts.
 *
 * To add a new post: add a new object to the `posts` array below.
 * The `id` field becomes the URL slug: /blog/<id>
 *
 * Posts use the same section types as projects (rendered by SectionRenderer):
 *   text, video, code, gallery, before-after, stats, embed
 *
 * Set `draft: true` to hide a post from the listing while it's being written
 * (it stays reachable at its direct URL for previewing).
 */

export const posts = [
  // ─────────────────────────────────────────────────────────────────────────
  {
    id: 'revision-siggraph-2026-hackathon',
    title: 'ReVision: SIGGRAPH 2026 Hackathon',
    date: '2026-07-19',
    tags: ['Hackathon', 'VR', 'Gaussian Splatting', 'Unity'],
    thumbnail: '/images/revision_beforeafter_1.mp4',
    summary:
      'A weekend VR hackathon build: walk through gaussian splat rooms on a headset and repaint the world around you with style keys. The stylizer it forced into existence became its own project.',

    sections: [
      {
        type: 'video',
        src: '/images/revision_beforeafter_1.mp4',
        caption: 'The stylizer taking the Hong Kong exhibit splat from photoreal to styled.',
      },
      {
        type: 'video',
        src: '/images/revision_beforeafter_2.mp4',
        caption: 'Before and after in the scanned house: the same room under a style key.',
      },
      {
        type: 'text',
        heading: 'The Hackathon',
        body: `The SensAI hackathon at SIGGRAPH 2026, a team weekend in mid July. The pitch we settled on was ReVision: you explore rooms captured as gaussian splats in VR, and scattered through them are style keys. Pick one up and the whole world repaints itself around you, photoreal one moment, pop-art comic or black and white noir the next. The splat stylizer was the thesis of the whole thing, and it outlived the weekend to become its own plugin project.`,
      },
      {
        type: 'text',
        heading: 'What We Built',
        body: `By the end of the weekend we had a Unity 6 build running standalone on Quest: a hub scene and three splat rooms you travel between, a world-space stylizer panel, and the style keys driving NEON and NOIR presets. Only one room is a real place, a house captured with an XGRIDS LiDAR scanner, and we had to convert its proprietary format ourselves and discovered its collision data was secretly just a PLY mesh inside. The other two rooms are AI-generated worlds from World Labs, which is its own kind of strange to stand inside. The mix ended up being the point: real scan or hallucinated space, the stylizer treats them the same.`,
      },
      {
        type: 'embed',
        heading: 'Try it',
        src: 'https://stfnylim.github.io/sensai-web-demo/',
        caption: 'The web port of the experience, rebuilt in PlayCanvas the week after the hackathon. Try the NEON and NOIR presets, or mix your own look.',
        link: 'https://stfnylim.github.io/sensai-web-demo/',
        linkLabel: 'Open full screen ↗',
      },
      {
        type: 'text',
        heading: 'Making Splats Behave on a Headset',
        body: `Standalone VR is a hostile place for gaussian splats. Millions of translucent points, no real GPU headroom, and the k-means color analysis the stylizer depends on needs a big GPU readback that mobile hardware hates. The answer was to bake: the color-group analysis runs in the editor and ships as per-splat data, so swapping styles on the headset is instant. The funniest performance bug was the scanned room, which lagged despite having fewer splats than the others. It turned out to be imported at a far heavier data quality, over a gigabyte of asset for one room, and slightly scaled up, which multiplied overdraw. The fix was a little governor that detects oversized rooms and nudges the splat scale down.`,
      },
      {
        type: 'text',
        heading: 'What I Learned',
        body: `Never bet a submission on an emulator. We targeted the PICO device track without a PICO, and the emulator ate most of a day refusing to run our builds before we accepted defeat, submitted the untested APK, and captured footage on desktop instead. Cutting a whole style family mid-weekend hurt but was right: painterly mode wasn't landing, and replacing it with noir gave the demo a much stronger second act. And team hackathons need pipeline thinking too. We built each room as its own prefab so nobody had to merge a Unity scene, which is the same lesson every studio learns, just compressed into 48 hours.`,
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────────────────
  {
    id: 'mighty-ember-gmtk-2026',
    title: 'MIGHTY EMBER: GMTK Game Jam 2026',
    date: '2026-07-26',
    tags: ['Game Jam', 'Unity', 'HD-2D', 'WebGL'],
    thumbnail: '/images/mighty_ember_demo.mp4',
    summary:
      'A cozy HD-2D puzzle-adventure built for GMTK Game Jam 2026 (theme: Countdown), with every 3D asset generated procedurally from Blender/Python scripts written during the jam.',

    sections: [
      {
        type: 'video',
        src: '/images/mighty_ember_demo.mp4',
        caption: 'MIGHTY EMBER in motion: the title screen and a wander through Ember Town at night.',
      },
      {
        type: 'text',
        heading: 'The Jam',
        body: `GMTK Game Jam 2026, theme: Countdown. The plan going in was ambitious for a jam: an Octopath-style HD-2D look, meaning 3D dioramas with chunky pixel textures, bloom, and tilt-shift depth of field, all running in the browser via Unity 6 WebGL. Michael Akaolisa wrote the story. I built the world and systems, pairing with Claude and Codex for the code.`,
      },
      {
        type: 'text',
        heading: 'What We Built',
        body: `MIGHTY EMBER is a cozy quest to save your frozen town with coal forged from fallen stars. You explore two hand-built towns with a festival's worth of NPCs and a four-quest story, and the puzzles are where the theme lives: step onto a glowing pad and movement becomes tile-by-tile while a budget of star energy ticks down one step at a time. Lily pads wilt behind you so there's no backtracking, hazards move one tile for every step you take, and later rooms have gates that only open at an exact count, so you end up burning moves on purpose to arrive at the right number.`,
      },
      {
        type: 'embed',
        heading: 'Play it',
        src: '/demos/mighty-ember/index.html',
        caption: 'The full jam build, playable in the browser. WASD to move, E to talk and interact, SPACE to wait (you\'ll need it). First load takes a moment.',
        link: '/demos/mighty-ember/index.html',
        linkLabel: 'Open full screen ↗',
      },
      {
        type: 'gallery',
        heading: 'Screenshots',
        images: [
          {
            src: '/images/mighty_ember_town.png',
            alt: 'Ember Town at night, an HD-2D diorama with warm lanterns against cool fog',
          },
          {
            src: '/images/mighty_ember_clockwork.png',
            alt: 'The clockwork puzzle room, with forked routes and patrolling gears that move one tile per step',
          },
          {
            src: '/images/mighty_ember_luna.png',
            alt: 'Luna Town festival crowd with golden quest markers',
          },
        ],
      },
      {
        type: 'text',
        heading: 'The Pipeline-TD Move',
        body: `The unusual part of our production: no third-party asset packs, and almost nothing hand-modeled. Every 3D model, texture, and scene came from Blender/Python scripts written during the jam. A generator produces a 36-piece modular kit with a pixel-art texture atlas and a matching emission atlas for the bloom. On the Unity side, editor tooling turned that kit into a live building designer: parameterized footprints, stories, window patterns, roofs, and dressing, with buildings saved as prefabs so a change propagates to every placed instance in every town. It's the same instinct as pipeline work. Build the tool that makes the assets, not the assets.`,
      },
      {
        type: 'text',
        heading: 'What I Learned',
        body: `Procedural-first held up: when the whole art style flows from one script and two atlases, a late look change is a regeneration, not a re-model. The step-countdown mechanic also turned out to be a great jam-theme fit because it doubles as a difficulty dial: wilting paths, then moving hazards, then exact-count gates, all from one counter. And shipping WebGL early mattered. The first platform switch is slow and the itch.io compression settings have sharp edges, so having a working browser build days before the deadline removed the scariest unknown.`,
      },
      {
        type: 'text',
        body: `The jam ratings and comments taught me the rest. Across 14 ratings, narrative was our best category and enjoyment was our worst, and the comments explain the gap. Players liked the music and the look, but the puzzles didn't communicate: one player spent ages stuck because our chunky bitmap font made an 8 read as a 3, another bounced off the difficulty entirely, and a couple hit bugs or found the whole thing a bit bare bones. My favorite comment asked why we called it HD-2D at all when it looks fully 3D, which is fair, since we shipped the dioramas without the pixel-perfect billboard sprites that sell the style. The lesson: a puzzle game lives or dies on readability, and the countdown numbers players squint at deserve as much design time as the mechanics behind them.`,
      },
      {
        type: 'text',
        body: `A handful of my coworkers played it after the jam, and their sessions were humbling in a different way: several never found their way to the first portal. The play path that felt obvious to me, follow the golden marker, take the road north, was invisible to people seeing the game cold, and getting lost in the towns was easy. Watching someone wander was worth more than any comment thread, and it's feedback I could have had during the jam if I'd put a rough build in front of testers a few days before the deadline instead of after it. This was my first ever game, and that might be the biggest thing I'm taking away: ship an ugly beta early, because the problems that sink a first impression are exactly the ones the developer can no longer see.`,
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────────────────
  {
    id: 'bloomware-interstellar-jam-9',
    title: 'BLOOMWARE: Interstellar Game Jam 9',
    date: '2026-08-10',
    tags: ['Game Jam', 'Unity', 'Pixel Art', 'WebGL'],
    thumbnail: '/images/bloomware_demo.mp4',
    summary:
      'A cozy pixel platformer about mending the world, built solo for Interstellar Game Jam 9: hand-drawn iPad art on one side, Claude Code writing the Unity systems on the other.',

    sections: [
      {
        type: 'video',
        src: '/images/bloomware_demo.mp4',
        caption: 'BLOOMWARE in motion: the hometown hub with the Motherboard, the fish tank, and the mint-green forest.',
      },
      {
        type: 'text',
        heading: 'The Jam',
        body: `Interstellar Game Jam 9, a week in early August 2026, and a solo run this time. It was also a deliberate experiment in splitting the work down the middle: I drew every sprite by hand in Procreate on an iPad, and Claude Code wrote the Unity side. Art streamed onto my PC over a network share while the code kept pace with it, in Unity 6 with the URP 2D pipeline.`,
      },
      {
        type: 'text',
        heading: 'What We Built',
        body: `BLOOMWARE is a cozy pixel platformer set in a mint-green forest where an ancient caretaker machine, the Motherboard, is running out of strength. You gather energy orbs from glowing plants to bring her back online, earn a gravity blast, and take back the tech parts hoarded by the tech bro monsters that broke the world's balance. The design detail I'm most fond of: orbs are both the quest goal and the ammo. Every gravity blast spends one, so clearing out tech bros drains the same resource you're trying to hand in, and blasting an apple tree to shake loose some healing costs you too.`,
      },
      {
        type: 'embed',
        heading: 'Play it',
        src: '/demos/bloomware/index.html',
        caption: 'The full jam build, playable in the browser. A/D to move, SPACE to jump (again in the air to double jump), E to talk, SHIFT to blast, R to eat an apple.',
        link: '/demos/bloomware/index.html',
        linkLabel: 'Open full screen ↗',
      },
      {
        type: 'gallery',
        heading: 'Screenshots',
        images: [
          {
            src: '/images/bloomware_hometown.png',
            alt: 'The hometown hub: the Motherboard, a CRT monitor on a fishbowl base, beside a vine-covered fish tank vending machine',
          },
          {
            src: '/images/bloomware_forest.png',
            alt: 'The forest map, with parallax tree trunks, drifting fog, and a glowing flower orb on a potted plant',
          },
          {
            src: '/images/bloomware_techbros.png',
            alt: 'Three tech bro monsters, CRT-headed with grumpy screen faces, guarding vine-covered brick platforms',
          },
        ],
      },
      {
        type: 'text',
        heading: 'The Workflow Experiment',
        body: `The interesting part of this jam was the tooling. I ported a custom MCP server that talks to a bridge inside the Unity editor, so the AI could place GameObjects, wire components, take camera renders to see its own work, and even puppeteer the player character to test jumps and combat. My Procreate exports landed straight into the Assets folder over an SMB share, where scripts keyed out the white backgrounds, sliced the sheets, and built the animation clips. We even wired anonymous telemetry into the WebGL build, posting quest progress and out-of-ammo events to a spreadsheet, since an itch.io page gives you no backend at all.`,
      },
      {
        type: 'text',
        heading: 'What I Learned',
        body: `WebGL keeps sharp edges everywhere. My dialogue font silently fell back to Arial in the browser because OS fonts don't ship with the build, so a real TTF has to. The first itch.io upload did nothing when you pressed run because the zip had the wrong folder structure inside. Dev cheats need to be compiled out of the build entirely, not just switched off. And I earned the lecture about version control: the repo had exactly one commit for the whole jam, which is a bet I got away with and will not make again.`,
      },
      {
        type: 'text',
        body: `The best lessons came from the jam comments, though. The art got genuine praise, and the two design choices I was most attached to were exactly the ones players pushed back on. The committed jump arcs, where your direction locks at takeoff, read as unresponsive instead of deliberate, and more than one player called moving around unsatisfying. The orb economy had a hole I never hit in my own playtesting: the orbs grow in one map but the shooting happens in another, so running dry means portaling back, farming, and redoing the same platforming, and one player just quit the first time the ammo ran out. The music also read as too upbeat for the tone. All fair. The next platformer gets proper air control, and any resource loop gets playtested empty-first, because players will find the zero state a lot faster than the designer does.`,
      },
    ],
  },
];

// ─── Helpers ──────────────────────────────────────────────────────────────

/** Published posts, newest first. Drafts are excluded from the listing. */
export function getAllPosts() {
  return posts
    .filter((p) => !p.draft)
    .slice()
    .sort((a, b) => b.date.localeCompare(a.date));
}

/** Look up a single post by its URL slug (id). Drafts are included so they can be previewed. */
export function getPostById(id) {
  return posts.find((p) => p.id === id);
}

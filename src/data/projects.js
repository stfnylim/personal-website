/**
 * projects.js — single source of truth for all portfolio projects.
 *
 * To add a new project: add a new object to the `projects` array below.
 * The `id` field becomes the URL slug: /projects/<id>
 *
 * Section types available:
 *   text      — heading + body paragraph(s)
 *   video     — autoplay looping muted video (MP4/WebM) or GIF
 *   code      — syntax-highlighted code block
 *   gallery   — responsive image grid
 *   before-after — side-by-side comparison slider
 *   stats     — results table (before / after rows)
 */

export const projects = [
  // ─────────────────────────────────────────────────────────────────────────
  {
    id: 'asset-ingestion-pipeline',
    title: 'Asset Ingestion Pipeline',
    shortDescription:
      'Fully automated asset validation and USD publishing pipeline that cut vendor turnaround from hours to under 90 seconds.',
    thumbnail: null, // replace with '/images/projects/asset-pipeline-thumb.jpg'
    date: '2024-11',
    role: 'Pipeline TD — architecture, implementation, deployment',
    tools: ['Python', 'Houdini', 'SideFX PDG', 'USD / OpenUSD', 'PostgreSQL', 'Docker'],
    tags: ['Pipeline', 'Automation', 'USD', 'Houdini'],
    featured: true,

    sections: [
      {
        type: 'text',
        heading: 'Overview',
        body: `Incoming assets from vendors and outsource studios arrived in inconsistent formats — varying naming conventions, mismatched coordinate systems, missing LODs, and unvalidated textures. This pipeline standardises everything automatically before assets ever reach an artist's desk.`,
      },
      {
        type: 'video',
        src: null, // replace with '/videos/asset-pipeline-demo.mp4'
        // To support WebM fallback, provide both:
        // sources: [{ src: '/videos/demo.webm', type: 'video/webm' }, { src: '/videos/demo.mp4', type: 'video/mp4' }]
        poster: null, // replace with '/images/projects/asset-pipeline-poster.jpg'
        caption: 'End-to-end ingestion: raw vendor delivery → validated, published USD asset in under 90 seconds.',
      },
      {
        type: 'text',
        heading: 'Problem',
        body: `Each vendor delivery required 3–4 hours of manual cleanup: fixing naming, reorienting geometry, converting texture colour spaces, and generating missing LODs. There was no audit trail for what changed between versions, and errors routinely surfaced in dailies rather than at intake.`,
      },
      {
        type: 'text',
        heading: 'Solution',
        body: `A three-stage PDG graph watches a shared drop folder via a Docker file-watcher service. Stage 1 (Intake) extracts and fingerprints deliveries. Stage 2 (Validate) runs geometry, UV, texture, and naming checks. Stage 3 (Publish) converts to USD, applies the studio's layer structure, writes metadata to Postgres, and posts a thumbnail render to Slack.`,
      },
      {
        type: 'code',
        language: 'python',
        caption: 'Mesh validator — geometry and UV checks (simplified)',
        code: `from dataclasses import dataclass
from typing import List
import hou


@dataclass
class ValidationError:
    code: str
    message: str


def validate_mesh(geo: hou.Geometry, config: "AssetConfig") -> List[ValidationError]:
    errors: List[ValidationError] = []

    if geo.countPrimType(hou.primType.Polygon) == 0:
        errors.append(ValidationError("MESH_EMPTY", "No polygon primitives found"))

    if geo.findPointAttrib("uv") is None:
        errors.append(ValidationError("UV_MISSING", "Mesh has no UV attribute"))

    poly_count = geo.intrinsicValue("primitivecount")
    if poly_count > config.max_poly_count:
        errors.append(
            ValidationError(
                "POLY_LIMIT_EXCEEDED",
                f"Poly count {poly_count:,} exceeds project limit {config.max_poly_count:,}",
            )
        )

    return errors
`,
      },
      {
        type: 'stats',
        heading: 'Results',
        rows: [
          { metric: 'Avg. ingestion time',           before: '3–4 hours',  after: '~90 seconds' },
          { metric: 'Validation errors caught early', before: '~30 %',      after: '~95 %' },
          { metric: 'Manual touch-ups per delivery',  before: '10–12',      after: '1–2' },
        ],
      },
      {
        type: 'gallery',
        images: [
          { src: null, alt: 'PDG graph overview — three-stage network' },
          { src: null, alt: 'Validation report UI in Houdini' },
          { src: null, alt: 'Published USD asset in stage viewer' },
        ],
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────────────────
  {
    id: 'render-farm-orchestration',
    title: 'Render Farm Orchestration & Cloud Bursting',
    shortDescription:
      'Python orchestration layer on top of Deadline that adds intelligent job prioritisation, AWS Spot bursting, and a live production dashboard.',
    thumbnail: null, // replace with '/images/projects/render-farm-thumb.jpg'
    date: '2024-06',
    role: 'Pipeline TD — architecture, backend services, dashboard',
    tools: ['Python', 'AWS EC2 / Spot', 'Deadline', 'FastAPI', 'Redis', 'React', 'Grafana'],
    tags: ['Render Farm', 'Cloud', 'AWS', 'Automation', 'Deadline'],
    featured: true,

    sections: [
      {
        type: 'text',
        heading: 'Overview',
        body: `The studio's on-prem render farm regularly hit capacity during crunch, causing missed dailies. Rather than purchasing hardware, I built an orchestration layer that bursts intelligently to AWS Spot instances and gives production full visibility into farm state through a live dashboard.`,
      },
      {
        type: 'video',
        src: null, // replace with '/videos/render-farm-dashboard.mp4'
        poster: null,
        caption: 'Live dashboard: on-prem vs. cloud capacity, job queue depth, and per-show cost tracking.',
      },
      {
        type: 'text',
        heading: 'Architecture',
        body: `A FastAPI orchestrator sits between Deadline and AWS. A Redis-backed queue monitor triggers Spot instance requests when on-prem utilisation exceeds 85% for more than 5 minutes. Instances self-terminate after 15 minutes of idle time. Per-show daily spend caps are enforced via a pre-submit hook that shows artists an estimated cost before they queue.`,
      },
      {
        type: 'code',
        language: 'python',
        caption: 'Job priority scoring — composite of urgency, sequence weight, and re-render flag',
        code: `from dataclasses import dataclass


@dataclass
class DeadlineJob:
    due_in_hours: float
    sequence: str
    is_rerender: bool


@dataclass
class ShowConfig:
    base_priority: int
    sequence_weights: dict[str, int]  # e.g. {"sq010": 20, "sq020": 10}


def compute_job_priority(job: DeadlineJob, config: ShowConfig) -> int:
    """Return a Deadline priority value in the range [0, 100]."""
    urgency_bonus   = 30 if job.due_in_hours < 4 else 0
    sequence_bonus  = config.sequence_weights.get(job.sequence, 0)
    rerender_penalty = -10 if job.is_rerender else 0

    score = config.base_priority + urgency_bonus + sequence_bonus + rerender_penalty
    return max(0, min(100, score))
`,
      },
      {
        type: 'stats',
        heading: 'Results',
        rows: [
          { metric: 'Crunch-period render wait',       before: '6+ hours',    after: '<45 minutes' },
          { metric: 'Peak cloud cost (AWS Spot/month)', before: 'N/A',         after: '~$2,100' },
          { metric: '"Where is my render?" tickets',   before: 'High volume',  after: '−80%' },
        ],
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────────────────
  {
    id: 'shot-build-tool',
    title: 'One-Click Shot Build Tool',
    shortDescription:
      'Houdini HDA + PyQt5 panel that assembles a fully layered USD shot — pulling assets, layout, FX caches, and lighting rigs — in a single click.',
    thumbnail: null, // replace with '/images/projects/shot-build-thumb.jpg'
    date: '2025-01',
    role: 'Pipeline TD — USD schema design, tool UX, ShotGrid integration',
    tools: ['Python', 'USD / OpenUSD', 'Houdini', 'PyQt5', 'ShotGrid / Flow', 'Git LFS'],
    tags: ['USD', 'Shot Build', 'Houdini', 'ShotGrid', 'Tools'],
    featured: true,

    sections: [
      {
        type: 'text',
        heading: 'Overview',
        body: `Setting up a shot from scratch required artists to manually wrangle USD sublayers, look up ShotGrid publishes, and track per-department version locks — a process taking 30–90 minutes per shot. This tool reduces it to a single button press and a confirmation dialog.`,
      },
      {
        type: 'video',
        src: null, // replace with '/videos/shot-build-demo.mp4'
        poster: null,
        caption: 'Full shot assembly — blank scene to lit, cache-loaded USD stage in ~8 seconds.',
      },
      {
        type: 'text',
        heading: 'USD Composition Stack',
        body: `The tool queries ShotGrid for all published entities linked to the shot, resolves version locks and department overrides, then writes a strongly-typed sublayer stack. Each layer is a resolved ShotGrid publish path, so artists can pin, override, or advance individual departments without breaking others.`,
      },
      {
        type: 'code',
        language: 'python',
        caption: 'Shot stage builder — creates the USD sublayer composition',
        code: `from pathlib import Path
from pxr import Usd, Sdf


def build_shot_stage(shot: "ShotConfig", output_dir: Path) -> Usd.Stage:
    """
    Create a USD stage with a sublayer stack ordered from weakest to strongest:
    layout → anim → fx → lighting → render_settings
    """
    stage_path = output_dir / "shot.usda"
    stage = Usd.Stage.CreateNew(str(stage_path))
    root_layer = stage.GetRootLayer()

    # Resolve each department's latest (or pinned) publish from ShotGrid.
    department_order = ["layout", "anim", "fx", "lighting", "render_settings"]
    root_layer.subLayerPaths = [
        str(shot.resolve_layer(dept)) for dept in department_order
    ]

    stage.SetStartTimeCode(shot.frame_range.start)
    stage.SetEndTimeCode(shot.frame_range.end)
    stage.Save()
    return stage
`,
      },
      {
        type: 'text',
        heading: 'Diff View',
        body: `When re-opening an existing shot, the panel shows a diff of what changed since the last build — which departments advanced versions and what the new thumbnails look like — before the artist commits to updating.`,
      },
      {
        type: 'gallery',
        images: [
          { src: null, alt: 'Main shot builder panel with department version list' },
          { src: null, alt: 'Per-department version override dialog' },
          { src: null, alt: 'Diff view — changes since last build' },
        ],
      },
      {
        type: 'stats',
        heading: 'Results',
        rows: [
          { metric: 'Shot setup time',                  before: '30–90 min',   after: '<2 min' },
          { metric: 'Version mismatch errors in dailies', before: 'Common',    after: '−90%' },
          { metric: 'Shows adopted within 2 months',    before: '—',           after: '3 shows' },
        ],
      },
    ],
  },
];

// ─── Helpers ──────────────────────────────────────────────────────────────────

/** All projects in display order. */
export function getAllProjects() {
  return projects;
}

/** Featured projects only, for the home page grid. */
export function getFeaturedProjects() {
  return projects.filter((p) => p.featured);
}

/** Look up a single project by its URL slug (id). Returns undefined if not found. */
export function getProjectById(id) {
  return projects.find((p) => p.id === id);
}

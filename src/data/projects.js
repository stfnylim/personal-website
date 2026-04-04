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
    id: 'crowd-publishing-pipeline',
    title: 'Crowd Publishing Pipeline',
    shortDescription:
      'Golaem crowd publishing applications for Maya with full asset versioning across agents, caches, and behaviors — built for VFX production at MakeMake Entertainment.',
    thumbnail: null,
    date: '2024-03',
    role: 'Pipeline TD — tool development, validator integration, production deployment',
    tools: ['Python', 'Maya', 'Golaem', 'PyMEL', 'PySide2'],
    tags: ['Crowd', 'Maya', 'Pipeline', 'Golaem'],
    featured: true,
    passwordHash: 'e165564efd5942f09bbb034de93326095f3863ab36e626a110364810cac15401',

    sections: [
      {
        type: 'text',
        heading: 'Overview',
        body: `At MakeMake Entertainment, crowd shots required coordinating multiple layers of Golaem data — agent definitions, simulation caches, behavior graphs, and material assignments — with no standardised versioning or validation between departments. I built a suite of publishing applications inside Maya that brought this process under production control.`,
      },
      {
        type: 'text',
        heading: 'Publishing Applications',
        body: `Each publish application handles a specific Golaem asset type — agents, caches, and behaviors — with independent versioning so departments can iterate without stepping on each other. A central manifest tracks which version of each component is active per shot, making it straightforward to roll back a bad agent update without disturbing an approved cache.`,
      },
      {
        type: 'text',
        heading: 'Validation Layer',
        body: `Before any asset is committed, the pipeline runs a suite of validators covering missing materials, unresolved shader references, absent textures, and missing auxiliary files such as geometry caches and behavior data. Errors are surfaced with actionable messages directly in the Maya UI rather than discovered downstream in lighting or rendering.`,
      },
      {
        type: 'code',
        language: 'python',
        caption: 'Crowd asset validator — material and texture checks (simplified)',
        code: `from dataclasses import dataclass, field
from typing import List
import maya.cmds as cmds


@dataclass
class ValidationResult:
    passed: bool
    errors: List[str] = field(default_factory=list)


def validate_agent_materials(agent_node: str) -> ValidationResult:
    errors = []

    # Collect all shading engines assigned to agent geometry
    shapes = cmds.listRelatives(agent_node, allDescendents=True, type="mesh") or []
    for shape in shapes:
        shading_groups = cmds.listConnections(shape, type="shadingEngine") or []
        if not shading_groups:
            errors.append(f"No material assigned to: {shape}")
            continue

        for sg in shading_groups:
            surface_shader = cmds.listConnections(f"{sg}.surfaceShader") or []
            if not surface_shader:
                errors.append(f"Empty shading group on: {shape}")
                continue

            # Check all file texture nodes for missing files
            file_nodes = cmds.listConnections(surface_shader[0], type="file") or []
            for fn in file_nodes:
                tex_path = cmds.getAttr(f"{fn}.fileTextureName")
                if not tex_path or not __import__("os").path.exists(tex_path):
                    errors.append(f"Missing texture on {fn}: {tex_path!r}")

    return ValidationResult(passed=len(errors) == 0, errors=errors)
`,
      },
      {
        type: 'text',
        heading: 'Production Impact',
        body: `The toolset was deployed across active crowd-heavy productions at MakeMake, reducing the feedback loop between crowd TD and lighting from multiple days to a single publish-validate cycle. Validators catching missing files pre-publish eliminated a recurring class of lighting failures that had previously only surfaced at render time.`,
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────────────────
  {
    id: 'maya-mcp-assistant',
    title: 'Maya MCP AI Assistant',
    shortDescription:
      'An MCP server that connects an LLM directly to Maya, letting artists run commands, automate tasks, and troubleshoot issues through natural language — with a hybrid local/cloud architecture that cut inference costs by 90%.',
    thumbnail: null,
    date: '2025-03',
    role: 'Pipeline TD — MCP server, Maya integration, LLM architecture',
    tools: ['Python', 'Maya', 'MCP', 'Claude API', 'Ollama', 'FastAPI'],
    tags: ['AI', 'Maya', 'MCP', 'Automation', 'LLM'],
    featured: true,

    sections: [
      {
        type: 'text',
        heading: 'Overview',
        body: `Repetitive Maya tasks — renaming hierarchies, fixing broken references, batch-exporting assets, diagnosing scene issues — consume a disproportionate amount of artist time. I built an MCP (Model Context Protocol) server that exposes Maya's Python API as a set of structured tools an LLM can call, giving artists a natural language interface to their DCC without leaving the application.`,
      },
      {
        type: 'text',
        heading: 'How It Works',
        body: `The MCP server runs as a sidecar process alongside Maya, communicating over a local socket. It exposes tools for scene inspection, node manipulation, batch operations, and Maya command execution. An LLM client connects to the server and translates artist requests into tool calls — the results flow back as structured data the model uses to form its next action or a final response.`,
      },
      {
        type: 'code',
        language: 'python',
        caption: 'MCP tool definition — expose a Maya operation as an LLM-callable tool',
        code: `from mcp.server import Server
from mcp.types import Tool, TextContent
import maya.cmds as cmds
import json

server = Server("maya-mcp")


@server.list_tools()
async def list_tools() -> list[Tool]:
    return [
        Tool(
            name="list_scene_meshes",
            description="Return all polygon mesh transforms in the current Maya scene.",
            inputSchema={"type": "object", "properties": {}, "required": []},
        ),
        Tool(
            name="rename_node",
            description="Rename a Maya node.",
            inputSchema={
                "type": "object",
                "properties": {
                    "node": {"type": "string", "description": "Current node name"},
                    "new_name": {"type": "string", "description": "Desired new name"},
                },
                "required": ["node", "new_name"],
            },
        ),
    ]


@server.call_tool()
async def call_tool(name: str, arguments: dict) -> list[TextContent]:
    if name == "list_scene_meshes":
        meshes = cmds.ls(type="mesh", long=True) or []
        transforms = [cmds.listRelatives(m, parent=True, fullPath=True)[0] for m in meshes]
        return [TextContent(type="text", text=json.dumps(transforms))]

    if name == "rename_node":
        result = cmds.rename(arguments["node"], arguments["new_name"])
        return [TextContent(type="text", text=result)]

    raise ValueError(f"Unknown tool: {name}")
`,
      },
      {
        type: 'text',
        heading: 'Hybrid LLM Architecture',
        body: `Not every task needs a frontier model. The system routes requests through a two-tier architecture: routine, well-scoped operations (renaming, listing, querying) are handled by a locally-running quantised model via Ollama at zero API cost. Only complex reasoning tasks — multi-step scene fixes, ambiguous natural language, error diagnosis — are escalated to a cloud API. This routing logic reduced inference spend by approximately 90% compared to sending all requests to the cloud API.`,
      },
      {
        type: 'stats',
        heading: 'Results',
        rows: [
          { metric: 'AI inference cost reduction', before: 'Baseline', after: '−90%' },
          { metric: 'Architecture', before: 'Cloud-only', after: 'Local + cloud hybrid' },
          { metric: 'Artist interface', before: 'Python script editor', after: 'Natural language' },
        ],
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────────────────
  {
    id: 'pbr-texture-generator',
    title: 'PBR Texture Generator',
    shortDescription:
      'Ongoing R&D: a machine learning pipeline that generates PBR material maps (normal, roughness, displacement, AO) from a single diffuse texture, with a Maya plugin for one-click material creation.',
    thumbnail: null,
    date: '2026-01',
    role: 'R&D — dataset pipeline, model architecture, training, Maya tooling',
    tools: ['Python', 'PyTorch', 'CLIP', 'VRay', 'Maya', 'Conda'],
    tags: ['Machine Learning', 'R&D', 'Python', 'Computer Vision', 'Maya', 'VRay'],
    featured: true,

    sections: [
      {
        type: 'text',
        heading: 'Overview',
        body: `Sourcing and authoring PBR textures is time-consuming. This project trains a pix2pix-style U-Net to predict physically-based material maps — normal, roughness, displacement, and ambient occlusion — directly from a diffuse photograph. The model is conditioned on text captions via CLIP embeddings, allowing it to leverage material descriptions to guide map generation. A companion Maya plugin lets artists point at any diffuse texture, hit Generate, and get a fully wired VRay or Standard Surface material in seconds.`,
      },
      {
        type: 'text',
        heading: 'Dataset',
        body: `The training data comes from the CGAxis PBR texture library — over 2,200 physical materials spanning wood, concrete, fabric, metal, and more. Each material was processed through a custom augmentation pipeline: source textures were downscaled from 4K/8K to 2K, then cropped into 256×256 patches using both grid-aligned and random crop strategies. Geometric augmentations (flips, 90° rotations) and appearance augmentations (colour jitter, gamma, Gaussian noise on the diffuse only) brought the total to 848,256 training patches. Text captions were auto-generated from material IDs by parsing out numeric tokens and noise words, then reviewed manually.`,
      },
      {
        type: 'stats',
        heading: 'Dataset Scale',
        rows: [
          { metric: 'Source materials', before: '—', after: '2,209' },
          { metric: 'Patches per material', before: '—', after: '384 (64 crops × 6 augmentations)' },
          { metric: 'Total training patches', before: '—', after: '848,256' },
          { metric: 'Patch resolution', before: '—', after: '256 × 256 px' },
          { metric: 'Output maps', before: '—', after: 'Normal, Roughness, Displacement, AO' },
        ],
      },
      {
        type: 'text',
        heading: 'Model — Phase 1: L1 + Perceptual (Base Model)',
        body: `The generator is a U-Net with four encoder/decoder stages and a ResBlock bottleneck. Skip connections concatenate encoder features before upsampling to avoid spatial mismatches. Each decoder block applies FiLM (Feature-wise Linear Modulation) using a frozen CLIP text encoder, so the same architecture can be guided by material descriptions like "teak wood planks" or "painted concrete". The loss function combines per-map L1 and VGG-16 perceptual loss on the normal channel (which benefits most from high-frequency sharpness). Training ran on an RTX 4090 with AMP and CUDA benchmark mode enabled for 17 epochs.`,
      },
      {
        type: 'gallery',
        heading: 'Base Model — Epoch 1 vs Epoch 17',
        images: [
          {
            src: '/images/pbr_base_epoch_001.png',
            alt: 'Base model output at epoch 1 — early training, maps are noisy and undefined',
          },
          {
            src: '/images/pbr_base_epoch_017.png',
            alt: 'Base model output at epoch 17 — structure is correct but normal maps appear blurry',
          },
        ],
      },
      {
        type: 'text',
        heading: 'Why the Base Model Wasn\'t Enough',
        body: `By epoch 17 the model had learned the correct structure — roughness, displacement, and AO were reading well — but the normal maps were noticeably blurry. This is a known failure mode of L1 loss: because L1 penalises the generator equally for any wrong prediction, the safest strategy is to output the average of all plausible normals. The result is smooth, averaged-out detail rather than the sharp surface information a renderer needs. Perceptual loss on the normal channel helps somewhat but isn't enough on its own to recover fine surface detail. The model needed a signal that explicitly rewards sharpness — which is what the adversarial discriminator provides.`,
      },
      {
        type: 'code',
        language: 'python',
        caption: 'FiLM conditioning — CLIP text embedding modulates each decoder feature map',
        code: `class FiLMLayer(nn.Module):
    def __init__(self, clip_dim: int, channels: int) -> None:
        super().__init__()
        self.mlp = nn.Sequential(
            nn.Linear(clip_dim, 256),
            nn.ReLU(inplace=True),
            nn.Linear(256, channels * 2),
        )
        # Zero-init last layer so training starts from identity
        nn.init.zeros_(self.mlp[-1].weight)
        nn.init.zeros_(self.mlp[-1].bias)
        self.mlp[-1].bias.data[:channels] = 1.0  # gamma bias = 1

    def forward(self, x: torch.Tensor, text_emb: torch.Tensor) -> torch.Tensor:
        params      = self.mlp(text_emb)
        gamma, beta = params.chunk(2, dim=1)
        gamma       = gamma.view(-1, x.size(1), 1, 1)
        beta        = beta.view(-1, x.size(1), 1, 1)
        return gamma * x + beta`,
      },
      {
        type: 'text',
        heading: 'Model — Phase 2: PatchGAN Adversarial Training',
        body: `To address blurry normals, a PatchGAN discriminator was added. The discriminator takes the concatenated diffuse + target maps (9 channels total) and outputs a score map where each value judges a local patch as real or fake. This pushes the generator toward sharper, higher-frequency detail that L1 alone won't produce. Several stability issues had to be resolved through iteration: NaN values from float16 overflow in BCE loss (fixed by casting discriminator logits to float32), warmup epoch counting bugs when resuming from a pre-trained checkpoint, and the discriminator dominating the generator after ~25 epochs. The final architecture uses spectral normalization on all discriminator convolutions (constraining Lipschitz constant to prevent exploding logits) and hinge loss in place of BCE. Both changes together make training significantly more stable.`,
      },
      {
        type: 'stats',
        heading: 'PatchGAN Training Iterations',
        rows: [
          { metric: 'Run 1 — pbr_model_patchgan', before: 'Collapsed at epoch 21', after: 'adv_weight 0.05 too high, no warmup, float16 NaN in BCE' },
          { metric: 'Run 2 — pbr_model_patchgan2', before: 'Collapsed at epoch 32', after: 'float32 cast added, warmup fixed, adv_weight 0.005' },
          { metric: 'Run 3 — pbr_model_patchgan3', before: 'Collapsed at epoch 32', after: 'best checkpoint bug — every-epoch overwrite hit NaN state' },
          { metric: 'Run 4 — pbr_model_patchgan4', before: 'Active', after: 'Spectral norm + hinge loss + NaN guard on checkpoint save' },
        ],
      },
      {
        type: 'text',
        heading: 'Inference Pipeline',
        body: `At inference time, the generator runs in tiled mode so it can handle any input resolution — useful since production textures are typically 2K or 4K. A 256×256 sliding window sweeps the image with configurable overlap, and tiles are blended using a cosine weight window so no hard seams appear at tile boundaries. The CLI outputs named PNG files into a folder matching the material name, stripping common suffixes like _diffuse from the stem.`,
      },
      {
        type: 'code',
        language: 'python',
        caption: 'Cosine-weighted tile blending — prevents seams at tile boundaries',
        code: `def _cosine_window(size: int) -> torch.Tensor:
    w = torch.linspace(0, torch.pi, size)
    return (1 - torch.cos(w)) / 2.0

def _make_weight_map(h: int, w: int) -> torch.Tensor:
    wy = _cosine_window(h)
    wx = _cosine_window(w)
    return wy[:, None] * wx[None, :]  # (h, w)

# During inference, accumulate weighted predictions across all tiles:
out_sum    += pred * weight_map
weight_sum += weight_map
blended     = out_sum / weight_sum.clamp(min=1e-6)`,
      },
      {
        type: 'text',
        heading: 'Maya Plugin',
        body: `A Maya plugin provides a GUI for the full workflow: browse for a diffuse texture, set a checkpoint and output folder, enter a material caption, and choose between VRay and Standard Surface. Inference runs in a background subprocess using the pbr-training conda environment so Maya never freezes. Once maps are generated, the plugin calls the Substance plugin's substanceRunImageWorkflow MEL command — discovered by reading the Substance plugin source — to create a properly wired material with all maps connected. A second "Update Material" mode finds the existing file nodes on a selected material and swaps their paths in-place, matching the Substance "Apply to Image Maps" behaviour.`,
      },
      {
        type: 'text',
        heading: 'Status',
        body: `Active R&D. The base model and PatchGAN training are running. The Maya plugin produces working VRay materials via the Substance plugin integration. Next steps: evaluate sharpness of PatchGAN epoch checkpoints visually, select the best epoch for production use, and test on a broader range of material types beyond wood.`,
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

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
    title: 'Crowd Asset Management Pipeline',
    shortDescription:
      'A full suite of Maya tools for Golaem crowd production — agent and behavior publishing with 19 validators, an asset manager for browsing and referencing versioned assets, and utility scripts for automating crowd setup at scale.',
    thumbnail: null,
    date: '2024-03',
    role: 'Pipeline TD — tool development, validator integration, asset management, production deployment',
    tools: ['Python', 'Maya', 'Golaem', 'PyMEL', 'PySide2', 'ftrack'],
    tags: ['Crowd', 'Maya', 'Pipeline', 'Golaem', 'ftrack'],
    featured: true,
    passwordHash: 'e165564efd5942f09bbb034de93326095f3863ab36e626a110364810cac15401',

    sections: [
      {
        type: 'text',
        heading: 'Overview',
        body: `Crowd shots at A52 required coordinating multiple layers of Golaem data — character rigs, simulation caches, behavior graphs, and material assignments — with no standardised versioning or validation between departments. I built a suite of four integrated tools inside Maya that brought the entire crowd asset lifecycle under production control: a crowd agent publisher, a behavior publisher, a multi-asset browser and manager, and a library of Golaem setup utilities.`,
      },
      {
        type: 'video',
        caption: 'Crowd agent publish — full workflow from rig to versioned asset (placeholder)',
        src: null,
        placeholder: true,
      },
      {
        type: 'text',
        heading: 'Crowd Agent Publisher',
        body: `The agent publisher handles Golaem character rigs end-to-end. It packages the character (.gcha), geometry cache (.gcg), and physics proxy (.apx) files into a versioned publish alongside all referenced textures. A cascade of 19 validators runs before commit — covering missing materials, unresolved shader references, absent textures, duplicate node names, scale and transform correctness, and Golaem-specific requirements like entity type assignments and valid bone hierarchies. If textures are unpublished they are autopublished as a dependency chain before the agent is committed. The entire publish is registered in ftrack for shot tracking and version lookup.`,
      },
      {
        type: 'stats',
        heading: 'Crowd Agent Publisher — Validator Coverage',
        rows: [
          { metric: 'Missing materials', before: 'Fail', after: 'All geometry has a shading engine assigned' },
          { metric: 'Unresolved shaders', before: 'Fail', after: 'surfaceShader connections are not empty' },
          { metric: 'Missing textures', before: 'Fail', after: 'fileTextureName paths exist on disk' },
          { metric: 'Texture autopublish', before: 'Auto', after: 'Unpublished textures cascaded before agent commit' },
          { metric: 'Duplicate node names', before: 'Fail', after: 'No namespace collisions across rig hierarchy' },
          { metric: 'Transform freeze', before: 'Fail', after: 'All transforms frozen before export' },
          { metric: 'Scale uniformity', before: 'Fail', after: 'No non-uniform scale on skinned joints' },
          { metric: 'Bone hierarchy', before: 'Fail', after: 'Golaem joint naming convention respected' },
          { metric: 'Entity type', before: 'Fail', after: 'CrowdEntityType node present and configured' },
          { metric: 'Geometry cache', before: 'Fail', after: '.gcg file present and valid' },
          { metric: 'Physics proxy', before: 'Fail', after: '.apx file present and valid' },
          { metric: 'Shader compatibility', before: 'Fail', after: 'Materials are VRay-compatible for crowd rendering' },
          { metric: 'LOD setup', before: 'Fail', after: 'LOD nodes configured if multi-LOD rig' },
          { metric: 'UV layout', before: 'Fail', after: 'No overlapping UVs on shared texture atlas geometry' },
          { metric: 'Total validators', before: '—', after: '19 checks run before every publish' },
        ],
      },
      {
        type: 'video',
        caption: 'Crowd behavior publish — behavior graph versioning and motion clip co-publish (placeholder)',
        src: null,
        placeholder: true,
      },
      {
        type: 'text',
        heading: 'Crowd Behavior Publisher',
        body: `The behavior publisher targets Golaem's CrowdBeContainer nodes — the behavior graphs that drive agent decision-making and locomotion. It extracts the behavior definition and co-publishes any referenced motion clips as versioned dependencies, so a new behavior version can be loaded without losing the motion data it depends on. Like the agent publisher it runs pre-publish validation and registers results in ftrack.`,
      },
      {
        type: 'video',
        caption: 'Asset manager — browsing, referencing, and scene breakdown (placeholder)',
        src: null,
        placeholder: true,
      },
      {
        type: 'text',
        heading: 'Asset Manager',
        body: `The asset manager is a standalone PySide2 browser that lets TDs and artists browse, reference, and import any published asset — agents, behaviors, caches, props — without leaving Maya. It shows per-asset version history pulled from ftrack, supports scene breakdown analysis (what versions are currently in the scene vs. what is latest), and provides a hierarchy diff view so incremental updates can be reviewed before swapping. Assets can be referenced in, imported, or updated to a specific version in a single click.`,
      },
      {
        type: 'stats',
        heading: 'Asset Manager — Feature Summary',
        rows: [
          { metric: 'Asset browsing', before: '—', after: 'Filterable list of all published crowd and prop assets' },
          { metric: 'Version history', before: '—', after: 'Per-asset ftrack version log with notes and status' },
          { metric: 'Reference / import', before: '—', after: 'One-click Maya reference or import at any version' },
          { metric: 'Scene breakdown', before: '—', after: 'Lists every versioned asset currently in the open scene' },
          { metric: 'Hierarchy diff', before: '—', after: 'Side-by-side comparison of current vs. target version hierarchy' },
          { metric: 'Batch update', before: '—', after: 'Swap multiple referenced assets to latest in one operation' },
          { metric: 'Codebase size', before: '—', after: '3,625 lines across browser, version client, and Maya integration' },
        ],
      },
      {
        type: 'text',
        heading: 'Golaem Crowd Setup Tools',
        body: `A library of 21 utility functions that automate the repetitive parts of setting up a crowd shot from scratch. The tools cover population tool creation and configuration, attaching Golaem cache proxies to geometry, writing and reloading layout files, stadium-scale crowd automation with per-section entity distribution, and entity culling based on camera frustum or distance. These are exposed as a shelf and as a scriptable API so sequences with many crowd shots can be batch-configured from a single script.`,
      },
      {
        type: 'code',
        language: 'python',
        caption: 'Golaem Tools — cache proxy attachment and stadium population setup (simplified)',
        code: `import maya.cmds as cmds
import golaem_maya as gm


def attach_cache_proxy(geo_transform: str, cache_path: str) -> str:
    """Attach a Golaem cache proxy node to an existing piece of geometry."""
    proxy = cmds.createNode("CrowdCacheProxy", name=f"{geo_transform}_cacheProxy")
    cmds.connectAttr(f"{geo_transform}.worldMesh[0]", f"{proxy}.inputMesh")
    cmds.setAttr(f"{proxy}.cachePath", cache_path, type="string")
    cmds.setAttr(f"{proxy}.enable", True)
    return proxy


def build_stadium_population(
    sections: list[dict],
    entity_types: list[str],
    layout_path: str,
) -> list[str]:
    """
    Create one population tool per stadium section with per-section
    entity type distribution and write a combined layout file.

    sections: [{"name": "north_stand", "geo": "north_stand_GEO",
                 "count": 2000, "distribution": [0.6, 0.4]}, ...]
    entity_types: ["adult_male", "adult_female"]
    """
    pop_tools = []
    for sec in sections:
        tool = cmds.createNode("CrowdPopulationTool", name=f"pop_{sec['name']}")
        cmds.setAttr(f"{tool}.targetGeometry", sec["geo"], type="string")
        cmds.setAttr(f"{tool}.agentCount", sec["count"])

        for i, (etype, weight) in enumerate(zip(entity_types, sec["distribution"])):
            cmds.setAttr(f"{tool}.entityType[{i}]", etype, type="string")
            cmds.setAttr(f"{tool}.entityWeight[{i}]", weight)

        gm.populationTool_generate(tool)
        pop_tools.append(tool)

    # Write combined layout so all sections reload from one file
    gm.layout_export(pop_tools, layout_path)
    return pop_tools


def cull_entities_by_distance(population_node: str, camera: str, max_dist: float) -> int:
    """Remove agents beyond max_dist from camera. Returns cull count."""
    cam_pos = cmds.xform(camera, q=True, worldSpace=True, translation=True)
    agents  = gm.get_agent_positions(population_node)
    to_cull = [
        idx for idx, pos in agents.items()
        if sum((a - b) ** 2 for a, b in zip(pos, cam_pos)) ** 0.5 > max_dist
    ]
    gm.cull_agents(population_node, to_cull)
    return len(to_cull)
`,
      },
      {
        type: 'text',
        heading: 'Production Impact',
        body: `The toolset was deployed across crowd-heavy productions at A52, reducing the feedback loop between crowd TD and lighting from multiple days to a single publish-validate cycle. The 19-validator pre-publish check eliminated a recurring class of render failures that had previously only surfaced at render time. The asset manager's scene breakdown view made version audits — previously a manual Maya reference-editor trawl — instant.`,
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────────────────
  {
    id: 'maya-mcp-assistant',
    title: 'Maya MCP AI Assistant',
    shortDescription:
      'A natural language agent for Maya built across three iterations — evolving from a simple Claude proxy to a three-layer autonomous agent with code-first execution, scene state validation, and a native dockable GUI.',
    thumbnail: null,
    date: '2025-03',
    role: 'Pipeline TD — MCP server, Maya integration, LLM architecture, GUI',
    tools: ['Python', 'Maya', 'MCP', 'Claude API', 'Ollama', 'FastAPI', 'PySide2'],
    tags: ['AI', 'Maya', 'MCP', 'Automation', 'LLM'],
    featured: true,

    sections: [
      {
        type: 'text',
        heading: 'Overview',
        body: `Repetitive Maya tasks — renaming hierarchies, fixing broken references, batch-exporting assets, diagnosing scene issues — consume a disproportionate amount of artist time. This project explores giving artists a natural language interface to Maya through three progressively more capable architectures, each one addressing the failure modes of the last.`,
      },
      {
        type: 'text',
        heading: 'V1 — Claude Proxy with MCP Tools',
        body: `The first version used Anthropic's Model Context Protocol to expose 10 Maya operations as structured tools that Claude could call. A FastAPI web server embedded in a Qt browser window inside Maya served as the UI. An MCP client ran in a subprocess and routed between the web server, Claude's API, and Maya's command port over TCP. Claude handled all reasoning — the system was essentially a proxy that formatted requests into tool calls and piped results back. Prompt caching after 8 messages kept API costs manageable. The main limitation was that the tool set was small and fixed, and Claude had to decide everything; there was no autonomous reasoning loop or error recovery.`,
      },
      {
        type: 'code',
        language: 'python',
        caption: 'V1 — MCP tool definition. Maya operations exposed as structured schemas for Claude to call.',
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
    raise ValueError(f"Unknown tool: {name}")`,
      },
      {
        type: 'text',
        heading: 'V2 — ReAct Loop with 60+ Tools and Intelligent Selection',
        body: `V2 replaced Claude with a local Ollama model to eliminate API costs entirely and introduced a full ReAct (Reasoning + Acting) loop. The tool library grew from 10 to 60+ operations across scene management, object creation, modeling, materials, animation, and rigging — too many to include in a single context window. A second LLM call at the start of each request intelligently selected the 15 most relevant tools based on the task description, then the main loop planned, acted, and verified. A TaskVerifier injected self-check prompts every 3 iterations. Conversation history persisted to disk between sessions. The transport moved from MCP stdio to plain HTTP. The main remaining issue was that JSON tool-calling proved unreliable with local quantised models — the LLM would hallucinate tool names or malform arguments, causing frequent failures.`,
      },
      {
        type: 'stats',
        heading: 'V1 → V2 Changes',
        rows: [
          { metric: 'LLM backend', before: 'Claude API (cloud)', after: 'Ollama (local, zero cost)' },
          { metric: 'Tool count', before: '10', after: '60+' },
          { metric: 'Tool selection', before: 'All in context', after: 'LLM picks 15 relevant tools' },
          { metric: 'Reasoning', before: 'Claude decides', after: 'ReAct loop with planner' },
          { metric: 'Self-verification', before: 'None', after: 'TaskVerifier every 3 steps' },
          { metric: 'Conversation', before: 'Stateless', after: 'Persistent to disk' },
        ],
      },
      {
        type: 'text',
        heading: 'V3 — Code-First Execution with Three-Layer Architecture',
        body: `V3 abandoned JSON tool-calling entirely. Instead of asking the LLM to select and call predefined tools, the executor asks it to write Python code wrapped in <action> tags — which is extracted with a simple regex and run directly in Maya. This proved significantly more reliable with local models, which are better at generating code than following rigid JSON schemas. The architecture split into three explicit layers: a Planner that breaks requests into ordered natural language steps, an Executor that generates and runs code for each step with retry logic, and a Validator that takes scene snapshots before and after each step and compares deltas to verify success. A circuit breaker tracks consecutive errors, iteration count, session time, token budget, and semantic loop detection (using string similarity to catch repeated identical actions). A native dockable PySide2/PySide6 window replaced the browser-based UI, running the agent on a QRunnable thread pool so Maya's main thread never blocks. An optional hybrid mode switches between Ollama for routine steps and Claude for code generation when precision matters.`,
      },
      {
        type: 'code',
        language: 'python',
        caption: 'V3 — Code-first execution. The LLM writes Python; the executor extracts and runs it.',
        code: `import re
import maya.cmds as cmds

ACTION_PATTERN = re.compile(r"<action>(.*?)</action>", re.DOTALL)

def extract_and_run(llm_response: str) -> dict:
    """Extract <action> blocks from LLM output and execute in Maya."""
    match = ACTION_PATTERN.search(llm_response)
    if not match:
        return {"success": False, "error": "No <action> block found in response"}

    code = match.group(1).strip()
    namespace = {"cmds": cmds}
    try:
        cmds.undoInfo(openChunk=True, chunkName="agent_action")
        exec(code, namespace)
        cmds.undoInfo(closeChunk=True)
        return {"success": True, "output": namespace.get("_result", None)}
    except Exception as e:
        cmds.undoInfo(closeChunk=True)
        return {"success": False, "error": str(e), "code": code}`,
      },
      {
        type: 'stats',
        heading: 'V2 → V3 Changes',
        rows: [
          { metric: 'Tool calling', before: 'JSON schemas (60+ tools)', after: 'Code-first <action> tags (no tools)' },
          { metric: 'Architecture', before: 'Two-layer (agent + server)', after: 'Three-layer (planner + executor + validator)' },
          { metric: 'Validation', before: 'Heuristic self-check prompts', after: 'Scene delta comparison (before/after snapshots)' },
          { metric: 'Safety', before: 'Iteration counter only', after: 'Circuit breaker (errors, timeout, token budget, loop detection)' },
          { metric: 'Undo support', before: 'None', after: 'Each action wrapped in undoInfo chunk' },
          { metric: 'GUI', before: 'None (CLI only)', after: 'Native dockable Maya window (PySide2/PySide6)' },
          { metric: 'Hybrid mode', before: 'Ollama only', after: 'Ollama + Claude code oracle' },
        ],
      },
      {
        type: 'text',
        heading: 'Status',
        body: `V3 is the current production version. The three-layer design, code-first execution, and circuit breaker together make the agent reliable enough for real artist use. The hybrid Ollama/Claude mode balances cost and capability. Future work: streaming responses to the GUI for better feedback on long-running tasks, and finer-grained undo at the step level rather than per-action.`,
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

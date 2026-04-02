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
    id: 'texture-classification-model',
    title: 'Texture Classification Model',
    shortDescription:
      'Ongoing R&D: a machine learning model for automatic texture classification to support pipeline-level asset organisation. Built alongside Stanford\'s XCS229 ML program.',
    thumbnail: null,
    date: '2025-04',
    role: 'R&D — model design, training pipeline, dataset curation',
    tools: ['Python', 'PyTorch', 'scikit-learn', 'NumPy', 'Jupyter'],
    tags: ['Machine Learning', 'R&D', 'Python', 'Computer Vision'],
    featured: true,

    sections: [
      {
        type: 'text',
        heading: 'Overview',
        body: `Texture libraries in production grow fast and rarely get organised. Artists spend real time hunting for the right roughness map or searching for which albedo belongs to which asset. This ongoing R&D project explores training a classification model that can automatically label and organise textures by type — diffuse, roughness, normal, emissive, AO — directly from image content, without relying on filename conventions.`,
      },
      {
        type: 'text',
        heading: 'Context',
        body: `This project runs in parallel with Stanford's XCS229 Machine Learning program, which covers supervised learning, neural networks, and model evaluation in depth. The coursework provides the theoretical foundation; this project is the applied counterpart — a real production problem to validate ideas against.`,
      },
      {
        type: 'text',
        heading: 'Approach',
        body: `The initial approach uses a fine-tuned convolutional network trained on a curated dataset of labelled PBR textures. Early experiments with a simple CNN baseline showed strong separation between diffuse and normal maps but poor discrimination between roughness and AO channels, which share similar frequency profiles. Current work is exploring channel statistics and frequency-domain features as additional inputs to improve that boundary.`,
      },
      {
        type: 'code',
        language: 'python',
        caption: 'Dataset class — loads and preprocesses texture images for training',
        code: `from pathlib import Path
from PIL import Image
import torch
from torch.utils.data import Dataset
from torchvision import transforms

TEXTURE_CLASSES = ["diffuse", "normal", "roughness", "ao", "emissive"]

class TextureDataset(Dataset):
    def __init__(self, root: Path, split: str = "train"):
        self.samples = []
        self.transform = transforms.Compose([
            transforms.Resize((224, 224)),
            transforms.ToTensor(),
            transforms.Normalize(mean=[0.5, 0.5, 0.5], std=[0.5, 0.5, 0.5]),
        ])
        for label, cls in enumerate(TEXTURE_CLASSES):
            for img_path in (root / split / cls).glob("*.png"):
                self.samples.append((img_path, label))

    def __len__(self) -> int:
        return len(self.samples)

    def __getitem__(self, idx: int):
        path, label = self.samples[idx]
        image = Image.open(path).convert("RGB")
        return self.transform(image), label
`,
      },
      {
        type: 'text',
        heading: 'Status',
        body: `Active R&D — currently iterating on feature engineering and evaluating lightweight architectures suitable for running as a pipeline utility (fast inference, low memory footprint). The goal is a model that can be dropped into an asset ingestion pipeline and run as a validation or auto-tagging step without requiring a GPU at inference time.`,
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

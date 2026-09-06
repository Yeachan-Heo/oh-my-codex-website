const OMX_CONFIG = {
  projectName: "oh-my-codex",
  shortName: "OMX",
  tagline: "Your codex is not alone.",
  description: "Multi-agent orchestration layer for OpenAI Codex CLI",
  githubUrl: "https://github.com/Yeachan-Heo/oh-my-codex",
  npmUrl: "https://www.npmjs.com/package/oh-my-codex",
  docsUrl: "https://yeachan-heo.github.io/oh-my-codex",
  installCommand: "npm install -g oh-my-codex",
  setupCommand: "omx setup",
  // Live metadata endpoints. Version/downloads/stars are resolved at runtime by
  // js/services/stats.js; data/stats.json is only the offline fallback and is
  // kept fresh by .github/workflows/sync-stats.yml + sync-from-source.yml.
  api: {
    githubRepo: "https://api.github.com/repos/Yeachan-Heo/oh-my-codex",
    npmLatest: "https://registry.npmjs.org/oh-my-codex/latest",
    npmDownloads: "https://api.npmjs.org/downloads/point/last-month/oh-my-codex",
    localStats: "data/stats.json"
  }
};

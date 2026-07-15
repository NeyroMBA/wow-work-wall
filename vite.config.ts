import { defineConfig, Plugin } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import fs from "fs";
import { componentTagger } from "lovable-tagger";

// Rewrites relative /__l5e/... URLs in *.asset.json imports to an absolute
// Lovable CDN URL, so assets keep working on hosts that don't proxy /__l5e/
// (e.g. GitHub Pages). On Lovable's own hosting the absolute URL still resolves.
const ASSET_ABSOLUTE_PREFIX = "https://wow-work-wall.lovable.app";
const ASSET_PREFIX = "\0asset-json:";
const ASSET_SUFFIX = ".js";
function assetUrlAbsolutize(): Plugin {
  return {
    name: "asset-url-absolutize",
    enforce: "pre",
    async resolveId(source, importer) {
      if (!source.endsWith(".asset.json")) return null;
      const resolved = await this.resolve(source, importer, { skipSelf: true });
      if (!resolved) return null;
      return ASSET_PREFIX + resolved.id;
    },
    load(id) {
      if (!id.startsWith(ASSET_PREFIX)) return null;
      const filePath = id.slice(ASSET_PREFIX.length).split("?")[0];
      const raw = fs.readFileSync(filePath, "utf8");
      const json = JSON.parse(raw);
      if (typeof json.url === "string" && json.url.startsWith("/__l5e/")) {
        json.url = ASSET_ABSOLUTE_PREFIX + json.url;
      }
      return `export default ${JSON.stringify(json)};`;
    },
  };
}

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
    hmr: {
      overlay: false,
    },
  },
  plugins: [assetUrlAbsolutize(), react(), mode === "development" && componentTagger()].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
    dedupe: ["react", "react-dom", "react/jsx-runtime", "react/jsx-dev-runtime", "@tanstack/react-query", "@tanstack/query-core"],
  },
}));

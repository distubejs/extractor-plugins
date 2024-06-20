import { existsSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { DisTubeError, PlayableExtractorPlugin, type ResolveOptions, Song } from "distube";

export class FilePlugin extends PlayableExtractorPlugin {
  validate(url: string) {
    try {
      const u = new URL(url);
      if (u.protocol === "file:") return true;
    } catch {}
    return false;
  }

  resolve<T>(url: string, options: ResolveOptions<T> = {}): Song<T> {
    const u = new URL(url);
    const path = fileURLToPath(u);
    const name = path.match(/[^/\\]*$/)?.[0] ?? path;
    if (!existsSync(path)) throw new DisTubeError("FILE_NOT_FOUND", `File not found: ${path}`);
    return new Song({ name, url, source: "file", playFromSource: true, plugin: this, id: path }, options);
  }

  getStreamURL(song: Song) {
    if (!song.url) {
      throw new DisTubeError("FILE_PLUGIN_INVALID_SONG", "Cannot get stream url from invalid song.");
    }
    return song.url;
  }

  getRelatedSongs() {
    return [];
  }
}

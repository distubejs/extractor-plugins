import { existsSync } from "fs";
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
    const name = u.pathname.split("/").pop() || u.href;
    const path = u.pathname.split("/").slice(1).join("/");
    if (!existsSync(path)) throw new DisTubeError("FILE_NOT_FOUND", `File not found: ${path}`);
    return new Song({ name, url, source: "file", playFromSource: true, plugin: this }, options);
  }

  getStreamURL(song: Song) {
    if (!song.url) {
      throw new DisTubeError("FILE_PLUGIN_INVALID_SONG", "Cannot get stream url from invalid song.");
    }
    const u = new URL(song.url);
    return u.pathname.split("/").slice(1).join("/");
  }

  getRelatedSongs() {
    return [];
  }
}

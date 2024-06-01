import { DisTubeError, PlayableExtractorPlugin, Song } from "distube";
import { existsSync } from "fs";
import type { GuildMember } from "discord.js";

export class FilePlugin extends PlayableExtractorPlugin {
  validate(url: string) {
    try {
      const u = new URL(url);
      if (u.protocol === "file:") return true;
    } catch {}
    return false;
  }

  resolve<T>(url: string, options: { member?: GuildMember; metadata?: T } = {}): Song<T> {
    const u = new URL(url);
    const name = u.pathname.split("/").pop() || u.href;
    const path = u.pathname.split("/").slice(1).join("/");
    if (!existsSync(path)) throw new DisTubeError("FILE_NOT_FOUND", `File not found: ${path}`);
    return new Song({ name, url, source: "file", playFromSource: true, plugin: this }, options);
  }

  getStreamURL(song: Song) {
    const u = new URL(song.url!);
    return u.pathname.split("/").slice(1).join("/");
  }

  getRelatedSongs() {
    return [];
  }
}

import { request } from "undici";
import { DisTubeError, PlayableExtractorPlugin, type ResolveOptions, Song } from "distube";

export class DirectLinkPlugin extends PlayableExtractorPlugin {
  override async validate(url: string) {
    try {
      const { headers, statusCode } = await request(url, { method: "HEAD" });
      if (statusCode !== 200) return false;
      const types = headers["content-type"];
      const type = Array.isArray(types) ? types[0] : types;
      if (["audio/", "video/", "application/"].some(s => type?.startsWith(s))) return true;
    } catch {}
    return false;
  }

  resolve<T>(url: string, options: ResolveOptions<T> = {}): Song<T> {
    const u = new URL(url);
    return new Song(
      { name: u.pathname.split("/").pop() || u.href, url, source: "direct_link", playFromSource: true, plugin: this },
      options,
    );
  }

  getStreamURL(song: Song) {
    if (!song.url) {
      throw new DisTubeError("DIRECT_LINK_PLUGIN_INVALID_SONG", "Cannot get stream url from invalid song.");
    }
    return song.url;
  }

  getRelatedSongs() {
    return [];
  }
}

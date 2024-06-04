import { download, json } from "./wrapper";
import { DisTubeError, PlayableExtractorPlugin, Playlist, Song } from "distube";
import type { DisTube, ResolveOptions } from "distube";
import type { YtDlpOptions, YtDlpPlaylist } from "./type";

const isPlaylist = (i: any): i is YtDlpPlaylist => Array.isArray(i.entries);

export class YtDlpPlugin extends PlayableExtractorPlugin {
  constructor({ update }: YtDlpOptions = {}) {
    super();
    if (update ?? true) download().catch(() => undefined);
  }

  override init(distube: DisTube) {
    super.init(distube);
    if (this.distube.plugins[this.distube.plugins.length - 1] !== this) {
      // eslint-disable-next-line no-console
      console.warn(
        `[${this.constructor.name}] This plugin is not the last plugin in distube. This is not recommended.`,
      );
    }
  }

  validate() {
    return true;
  }

  async resolve<T>(url: string, options: ResolveOptions<T>) {
    const info = await json(url, {
      dumpSingleJson: true,
      noWarnings: true,
      noCallHome: true,
      preferFreeFormats: true,
      skipDownload: true,
      simulate: true,
    }).catch(e => {
      throw new DisTubeError("YTDLP_ERROR", `${e.stderr || e}`);
    });
    if (isPlaylist(info)) {
      if (info.entries.length === 0) throw new DisTubeError("YTDLP_ERROR", "The playlist is empty");
      return new Playlist(
        {
          source: info.extractor,
          songs: info.entries.map(i => new YtDlpSong(this, i, options)),
          id: info.id.toString(),
          name: info.title,
          url: info.webpage_url,
          thumbnail: info.thumbnails?.[0]?.url,
        },
        options,
      );
    }
    return new YtDlpSong(this, info, options);
  }

  async getStreamURL(song: Song) {
    if (!song.url) {
      throw new DisTubeError("YTDLP_PLUGIN_INVALID_SONG", "Cannot get stream url from invalid song.");
    }
    const info = await json(song.url, {
      dumpSingleJson: true,
      noWarnings: true,
      noCallHome: true,
      preferFreeFormats: true,
      skipDownload: true,
      simulate: true,
      format: "ba/ba*",
    }).catch(e => {
      throw new DisTubeError("YTDLP_ERROR", `${e.stderr || e}`);
    });
    if (isPlaylist(info)) throw new DisTubeError("YTDLP_ERROR", "Cannot get stream URL of a entire playlist");
    return info.url;
  }

  getRelatedSongs() {
    return [];
  }
}

class YtDlpSong<T> extends Song<T> {
  constructor(plugin: YtDlpPlugin, info: any, options: ResolveOptions<T> = {}) {
    super(
      {
        plugin,
        source: info.extractor,
        playFromSource: true,
        id: info.id,
        name: info.title,
        url: info.url,
        thumbnail: info.thumbnail,
        duration: info.duration,
        uploader: {
          name: info.uploader,
          url: info.uploader_url,
        },
        views: info.views,
        likes: info.like_count,
        reposts: info.repost_count,
      },
      options,
    );
  }
}

export * from "./wrapper";

import { getAlbum, getPlaylist, getTrack } from "./API";
import { DisTubeError, PlayableExtractorPlugin, Playlist, Song } from "distube";
import type { ResolveOptions } from "distube";
import type { RevisionResponse } from "./interfaces/Revision";
import type { TrackResponse } from "./interfaces/Track";
import type { AlbumResponse } from "./interfaces/Album";
import type { PlaylistResponse } from "./interfaces/Playlist";

const BASE_URL = "https://www.bandlab.com";

const REGEX =
  /https?:\/\/(?:www\.)?bandlab\.com\/(?:[\w\d_]+\/)?(collections|albums|track|post|songs)\/([a-f0-9-]+)(?:_|\?|$)/;

const SUPPORTED_TYPES = ["collections", "albums", "track", "post", "songs"];

const parseURL = (url: string): { type?: string; id?: string } => {
  const [, type, id] = url.match(REGEX) ?? [];
  return { type, id };
};

export class BandlabPlugin extends PlayableExtractorPlugin {
  validate(url: string) {
    if (typeof url !== "string" || !url.includes("bandlab.com")) return false;
    const { type, id } = parseURL(url);
    if (!type || !id || !SUPPORTED_TYPES.includes(type)) return false;
    return true;
  }

  async resolve<T>(url: string, options: ResolveOptions<T>): Promise<Song<T> | Playlist<T>> {
    const { type, id } = parseURL(url);
    if (!type || !id) throw new DisTubeError("BANDLAB_PLUGIN_INVALID_URL", `Invalid Bandlab url: ${url}`);

    const api = type === "collections" ? getPlaylist(id) : type === "albums" ? getAlbum(id) : getTrack(id);
    const data: any = await api.catch(e => {
      throw new DisTubeError("BANDLAB_PLUGIN_API_ERROR", e.message);
    });

    if (data.type === "Track") {
      return new BandlabTrack(this, data, options);
    } else if (data.type === "Revision") {
      return new BandlabRevision(this, data, options);
    } else {
      return new BandlabPlaylist(this, data, url, options);
    }
  }

  async getStreamURL(song: Song): Promise<string> {
    if (!song.url) {
      throw new DisTubeError("BANDLAB_PLUGIN_INVALID_SONG", "Cannot get stream url from invalid song.");
    }
    const data = await getTrack(song.id).catch(e => {
      throw new DisTubeError("BANDLAB_ERROR", `${e.message || e}`);
    });
    return data.type === "Revision"
      ? (data as RevisionResponse).revision.mixdown.file
      : (data as TrackResponse).track.sample.audioUrl;
  }

  getRelatedSongs() {
    return [];
  }
}

class BandlabTrack<T> extends Song<T> {
  constructor(plugin: BandlabPlugin, data: TrackResponse, options: ResolveOptions<T> = {}) {
    super(
      {
        plugin,
        source: "bandlab",
        playFromSource: true,
        id: data.id.toString(),
        name: data.track.name,
        url: `${BASE_URL}/track/${data.id}`,
        thumbnail: data.track.picture.url,
        uploader: {
          name: data.creator.name,
          url: `${BASE_URL}/${data.creator.username}`,
        },
        likes: data.counters.likes,
        views: data.counters.plays,
        ageRestricted: data.isExplicit,
        duration: data.track.sample.duration,
      },
      options,
    );
  }
}

class BandlabRevision<T> extends Song<T> {
  constructor(plugin: BandlabPlugin, data: RevisionResponse, options: ResolveOptions<T> = {}) {
    super(
      {
        plugin,
        source: "bandlab",
        playFromSource: true,
        id: data.id.toString(),
        name: data.revision.song.name,
        url: `${BASE_URL}/track/${data.id}`,
        thumbnail: data.revision.song.picture.url,
        uploader: {
          name: data.creator.name,
          url: `${BASE_URL}/${data.creator.username}`,
        },
        likes: data.revision.counters.likes,
        views: data.revision.counters.plays,
        ageRestricted: data.isExplicit,
        duration: data.revision.mixdown.duration,
      },
      options,
    );
  }
}

class BandlabPlaylist<T> extends Playlist<T> {
  constructor(
    plugin: BandlabPlugin,
    data: PlaylistResponse | AlbumResponse,
    url: string,
    options: ResolveOptions<T> = {},
  ) {
    super(
      {
        source: "bandlab",
        id: data.id.toString(),
        name: data.name,
        url,
        thumbnail: data.picture.url,
        songs:
          data.posts[0].type === "Track"
            ? data.posts.map((s: any) => new BandlabTrack(plugin, s, options))
            : data.posts.map((s: any) => new BandlabRevision(plugin, s, options)),
      },
      options,
    );
  }
}

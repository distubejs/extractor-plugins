import { getAlbum, getPlaylist, getTrack } from "./API";
import { DisTubeError, PlayableExtractorPlugin, Playlist, Song } from "distube";
import type { ResolveOptions } from "distube";
import type { TrackResponse } from "./interfaces/Track";
import type { RevisionResponse } from "./interfaces/Revision";
import type { PlaylistResponse, Post } from "./interfaces/Playlist";
import type { AlbumResponse, TrackElement } from "./interfaces/Album";

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
    const api = type === "collections" ? getPlaylist(id) : type === "album" ? getAlbum(id) : getTrack(id);
    const data: any = await api.catch(e => {
      throw new DisTubeError("BANDLAB_PLUGIN_API_ERROR", e.message);
    });

    if (data.type === "Track") {
      return new Song(
        {
          plugin: this,
          playFromSource: true,
          name: (data as TrackResponse).track.name,
          id: data.id.toString(),
          url: `${BASE_URL}/track/${data.id}`,
          thumbnail: (data as TrackResponse).track.picture.url,
          uploader: {
            name: data.creator.name,
            url: `${BASE_URL}/${data.creator.username}`,
          },
          likes: data.counters.likes,
          views: data.counters.plays,
          ageRestricted: (data as TrackResponse).isExplicit,
          source: "bandlab",
          duration: (data as TrackResponse).track.sample.duration,
        },
        options,
      );
    } else if (data.type === "Revision") {
      return new Song(
        {
          plugin: this,
          playFromSource: true,
          name: (data as RevisionResponse).revision.song.name,
          id: data.id.toString(),
          url: `${BASE_URL}/track/${data.id}`,
          thumbnail: (data as RevisionResponse).revision.song.picture.url,
          uploader: {
            name: data.creator.name,
            url: `${BASE_URL}/${data.creator.username}`,
          },
          likes: (data as RevisionResponse).revision.counters.likes,
          views: (data as RevisionResponse).revision.counters.plays,
          ageRestricted: (data as RevisionResponse).isExplicit,
          source: "bandlab",
          duration: (data as RevisionResponse).revision.mixdown.duration,
        },
        options,
      );
    } else if (data.type === "Playlist") {
      return new Playlist(
        {
          source: "bandlab",
          name: data.name,
          id: data.id.toString(),
          url,
          thumbnail: data.picture.url,
          songs: (data as PlaylistResponse).posts.map(
            (s: Post) =>
              new Song(
                {
                  plugin: this,
                  playFromSource: true,
                  name: s.revision.song.name,
                  id: s.id,
                  url: `${BASE_URL}/track/${s.id}`,
                  thumbnail: s.revision.song.picture.url || data.picture.url,
                  uploader: {
                    name: s.creator.name,
                    url: `${BASE_URL}/${s.creator.username}`,
                  },
                  likes: s.revision.counters.likes ?? 0,
                  views: s.revision.counters.plays ?? 0,
                  ageRestricted: s.isExplicit,
                  source: "bandlab",
                  duration: s.revision.mixdown.duration,
                },
                options,
              ),
          ),
        },
        options,
      );
    } else {
      return new Playlist(
        {
          source: "bandlab",
          name: data.name,
          id: data.id?.toString(),
          url,
          thumbnail: data.picture.url,
          songs: (data as AlbumResponse).tracks.map(
            (s: TrackElement) =>
              new Song(
                {
                  plugin: this,
                  playFromSource: true,
                  name: s.name,
                  id: s.id,
                  url: `${BASE_URL}/track/${s.id}`,
                  thumbnail: data.picture.url,
                  uploader: {
                    name: s.creator.name,
                    url: `${BASE_URL}/${s.creator.username}`,
                  },
                  ageRestricted: s.isExplicit,
                  source: "bandlab",
                  duration: s.duration,
                },
                options,
              ),
          ),
        },
        options,
      );
    }
  }

  async getStreamURL(song: Song) {
    if (!song.url) {
      throw new DisTubeError("BANDLAB_PLUGIN_INVALID_SONG", "Cannot get stream url from invalid song.");
    }
    const data: any = await getTrack(song.id).catch(e => {
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

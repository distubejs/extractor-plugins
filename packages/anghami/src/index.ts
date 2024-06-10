import { getAlbum, getPlaylist, getSong, getVideo } from "./API";
import { DisTubeError, InfoExtractorPlugin, Playlist, Song } from "distube";
import type { ResolveOptions } from "distube";
import type { Datum,Section,SongResponse,VideoResponse } from "./type";

const BASE_URL = "https://play.anghami.com";
const ARTWORK_URL = "https://artwork.anghcdn.co/webp/?id=";
const SUPPORTED_TYPES = ["album", "playlist", "song", "video"];
const REGEX = /https:\/\/play\.anghami\.com\/(song|video|album|playlist)\/(\d+)/;

const parseURL = (url: string): { type?: string; id?: number } => {
  const [, type, id] = url.match(REGEX) ?? [];
  return { type, id: Number(id) };
};

export class AnghamiPlugin extends InfoExtractorPlugin {
  validate(url: string) {
    if (typeof url !== "string" || !url.includes("anghami.com")) return false;
    const { type, id } = parseURL(url);
    if (!type || !id || !SUPPORTED_TYPES.includes(type)) return false;
    return true;
  }

  async resolve<T>(url: string, { member, metadata }: ResolveOptions<T>): Promise<Song<T> | Playlist<T>> {
    const { type, id } = parseURL(url);
    if (!type || !id) throw new DisTubeError("ANGHAMI_PLUGIN_INVALID_URL", `Invalid Anghami url: ${url}`);
    const api =
      type === "song"
        ? getSong(id)
        : type === "video"
          ? getVideo(id)
          : type === "album"
            ? getAlbum(id)
            : getPlaylist(id);
    const data = await api.catch((e: { message: string }) => {
      throw new DisTubeError("ANGHAMI_PLUGIN_API_ERROR", e.message);
    });

    if (type === "song" || type === "video") {
      return new Song(
        {
          plugin: this,
          source: "anghami",
          playFromSource: false,
          id: data.id.toString(),
          url: `${BASE_URL}/${type}/${data.id}`,
          name: data.title,
          uploader: {
            name: (data as SongResponse | VideoResponse).artist,
            url: `${BASE_URL}/artist/${(data as SongResponse | VideoResponse).artistID}`,
          },
          thumbnail: ARTWORK_URL + data.coverArt,
        },
        { member, metadata },
      );
    }
    return new Playlist(
      {
        source: "anghami",
        url: `${BASE_URL}/${type}/${data.id}`,
        name: data.title,
        thumbnail: ARTWORK_URL + data.coverArt,
        songs: data.sections
          ?.find((section: Section) => section.type === "song")
          ?.data?.map(
            (song: Datum) =>
              new Song(
                {
                  plugin: this,
                  source: "anghami",
                  playFromSource: false,
                  id: song.id?.toString(),
                  url: `${BASE_URL}/song/${song.id}`,
                  name: song.title,
                  uploader: {
                    name: song.artist,
                    url: `${BASE_URL}/artist/${song.artistID}`,
                  },
                  thumbnail: ARTWORK_URL + song.coverArt,
                },
                { member, metadata },
              ),
          ) as Song[],
      },
      { member, metadata },
    );
  }

  createSearchQuery<T>(song: Song<T>) {
    return `${song.name} ${song.uploader.name}`;
  }

  async getRelatedSongs(song: Song<undefined>): Promise<Song[]> {
    if (!song || !song.id) {
      throw new DisTubeError("ANGHAMI_PLUGIN_INVALID_SONG", "Cannot get related songs from invalid song.");
    }
    const data = await getSong(Number(song.id));
    if (!data) {
      throw new DisTubeError("ANGHAMI_PLUGIN_API_ERROR", "Failed to fetch data from Anghami API.");
    }

    return data.sections
      ?.find((section: Section) => section.group === "similar")
      ?.data?.map(
        (song: Datum) =>
          new Song(
            {
              plugin: this,
              source: "anghami",
              playFromSource: false,
              url: `${BASE_URL}/song/${song.id}`,
              id: song.id?.toString(),
              name: song.title,
              uploader: {
                name: song.artist,
                url: `${BASE_URL}/artist/${song.artistID}`,
              },
              thumbnail: ARTWORK_URL + song.coverArt,
            },
            {},
          ),
      ) as Song[];
  }
}

export default AnghamiPlugin;

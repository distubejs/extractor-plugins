import { Pool } from "undici";
import type { TrackResponse } from "./interfaces/Track";
import type { AlbumResponse } from "./interfaces/Album";
import type { PlaylistResponse } from "./interfaces/Playlist";

const api = new Pool("https://www.bandlab.com");

const get = async (path: string): Promise<any> => {
  const { body } = await api.request({
    path,
    method: "GET",
  });

  const data: any = await body.json();
  if (data.error) throw new Error(data.error?.message);
  return data;
};

export const getTrack = async (id: string): Promise<TrackResponse> => get(`/api/v1.3/posts/${id}`);

export const getAlbum = async (id: string): Promise<AlbumResponse> => get(`/api/v1.3/albums/${id}`);

export const getPlaylist = async (id: string): Promise<PlaylistResponse> => get(`/api/v1.3/collections/${id}`);

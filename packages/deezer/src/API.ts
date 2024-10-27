import { Pool } from "undici";
import type { AlbumResponse, PlaylistResponse, TrackResponse } from "./type";

const api = new Pool("https://api.deezer.com");

const get = async (path: string): Promise<any> => {
  const { body } = await api.request({
    path,
    method: "GET",
  });

  const data: any = await body.json();
  if (data.error) throw new Error(data.error?.message);
  return data;
};

export const getTrack = async (id: string): Promise<TrackResponse> => get(`/track/${id}`);

export const getAlbum = async (id: string): Promise<AlbumResponse> => get(`/album/${id}`);

export const getPlaylist = async (id: string): Promise<PlaylistResponse> => get(`/playlist/${id}`);

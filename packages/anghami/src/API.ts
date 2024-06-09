import { Pool } from "undici";
import type { AlbumResponse, PlaylistResponse, SongResponse, VideoResponse } from "./type";

interface Params {
  type: string;
  songid?: number;
  angh_type: string;
  playlistid?: number;
  albumId?: number;
}

const BASE_URL = "https://play.anghami.com";
const api = new Pool("https://coussa.anghami.com");

/**
 * Fetch data from Anghami API.
 * @param {Params} params - The query parameters for the request.
 * @param {string} referer - The referer URL for the request header.
 * @returns {Promise<any>} The response data from the API.
 * @throws {Error} If the request fails.
 */
async function fetchData(params: Params, referer: string): Promise<any> {
  const queryParams: Record<string, string> = {
    lang: "en",
    language: "en",
    output: "jsonhp",
    web2: "true",
    extras: "",
    // fngerprint: "ef01d4ad-feff-4962-b210-14ba34b30667",
    ...Object.fromEntries(Object.entries(params).map(([key, value]) => [key, String(value)])),
  };

  const { body } = await api.request({
    path: "/gateway.php",
    method: "GET",
    headers: {
      accept: "application/json, text/plain, */*",
      "sec-ch-ua": '"Microsoft Edge";v="125", "Chromium";v="125", "Not.A/Brand";v="24"',
      "sec-ch-ua-mobile": "?1",
      "sec-ch-ua-platform": '"Android"',
      "Referrer-Policy": "no-referrer-when-downgrade",
      Referer: referer,
    },
    query: queryParams,
  });

  const data: any = await body.json();
  if (data.error) throw new Error(data.error?.message);
  return data;
}

/**
 * Get song data from Anghami API.
 * @param {number} songId - The id of the song.
 * @returns {Promise<SongResponse>} The song data.
 * @throws {Error} If the request fails.
 */
export async function getSong(songId: number): Promise<SongResponse> {
  const params = {
    type: "GETsongdata",
    songid: songId,
    angh_type: "GETsongdata",
  };
  const referer = `${BASE_URL}/song/${songId}`;
  return fetchData(params, referer);
}

/**
 * Get playlist data from Anghami API.
 * @param {number} playlistId - The Id of the playlist.
 * @returns {Promise<PlaylistResponse>} The playlist data.
 * @throws {Error} If the request fails.
 */
export async function getPlaylist(playlistId: number): Promise<PlaylistResponse> {
  const params = {
    type: "GETplaylistdata",
    playlistid: playlistId,
    angh_type: "GETplaylistdata",
    buffered: 1,
  };
  const referer = `${BASE_URL}/playlist/${playlistId}`;
  return fetchData(params, referer);
}

/**
 * Get album data from Anghami API.
 * @param {number} albumId - The Id of the album.
 * @returns {Promise<AlbumResponse>} The album data.
 * @throws {Error} If the request fails.
 */
export async function getAlbum(albumId: number): Promise<AlbumResponse> {
  const params = {
    type: "GETalbumdata",
    albumId: albumId,
    angh_type: "GETalbumdata",
  };
  const referer = `${BASE_URL}/album/${albumId}`;
  return fetchData(params, referer);
}

/**
 * Get video data from Anghami API.
 * @param {number} videoId - The Id of the video.
 * @returns {Promise<VideoResponse>} The video data.
 * @throws {Error} If the request fails.
 */
export async function getVideo(videoId: number): Promise<VideoResponse> {
  const params = {
    type: "GETvideodata",
    songid: videoId,
    angh_type: "GETvideodata",
  };
  const referer = `${BASE_URL}/video/${videoId}`;
  return fetchData(params, referer);
}

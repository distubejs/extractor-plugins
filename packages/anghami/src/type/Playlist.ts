import type { Section } from "./Section";
import type { WebMetas } from "./WebMetas";

export interface PlaylistResponse {
  angtime: number;
  status: string;
  version: string;
  webplayer: number;
  int: boolean;
  id: string;
  limit_number_songs: number;
  hexcolor: string;
  web_metas: WebMetas;
  languageselector: number[];
  responsetype: string;
  responsemode: string;
  list_type: string;
  curator: number;
  addedon: number;
  timestamp: number;
  name: string;
  coverartmeta: string;
  coverArt: string;
  squareCoverArt: string;
  coverArtImage: string;
  followers: string;
  playlistid: number;
  coverArtID: string;
  ownerName: string;
  fbid: null;
  UserID: null;
  PlaylistName: string;
  description: string;
  FeaturedDesc: string;
  title: string;
  detailsar: string;
  detailsen: string;
  PlaylistNameAr: string;
  public: string;
  newhandling: string;
  isfeatured: string;
  following: number;
  unlink_creator: number;
  top: number;
  uploaded_coverart_pending: boolean;
  playmode: string;
  songorder: string;
  rankchange: { [key: string]: string };
  hash: string;
  realhash: string;
  numsongs: number;
  count: number;
  PlaylistCount: number;
  bigimages: string;
  button_type: string;
  sections: Section[];
}

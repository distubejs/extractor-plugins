export interface AlbumResponse {
  artist: Artist;
  counters: AlbumResponseCounters;
  creator: Creator;
  credits: null;
  description: string;
  genreId: string;
  id: string;
  isAutoRepostEnabled: boolean;
  isCommentingAllowed: boolean;
  isLiked: boolean;
  isPurchased: boolean;
  isReleaseScheduled: boolean;
  name: string;
  permissions: AlbumResponsePermissions;
  picture: Picture;
  policy: Policy;
  posts: Post[];
  releaseDate: Date;
  state: string;
  supporters: any[];
  theme: Theme;
  themeId: null;
  tracks: TrackElement[];
  type: string;
}

export interface Artist {
  about: string;
  conversationId: string;
  country: string;
  followingState: string;
  id: string;
  isPrivate: boolean;
  isTippable: boolean;
  isVerified: boolean;
  name: Name;
  picture: Picture;
  username: Username;
}

export enum Name {
  ThekidkyeOnBreak = "thekidkye! (on break.)",
}

export interface Picture {
  blur: Blur;
  color?: Color | null;
  isDefault: boolean;
  l: string;
  m: string;
  original: string;
  s: string;
  url: string;
  xs: string;
}

export interface Blur {
  xs: string;
  s: string;
  m: string;
  l: string;
}

export enum Color {
  The020302 = "#020302",
}

export enum Username {
  Thatkidkye = "thatkidkye",
}

export interface AlbumResponseCounters {
  attachments: number;
  comments: number;
  likes: number;
  plays: number;
  posts: number;
}

export interface Creator {
  id: string;
  isTippable: boolean;
  isVerified: boolean;
  name: Name;
  picture: Picture;
  status: CreatorStatus;
  username: Username;
}

export enum CreatorStatus {
  Active = "Active",
}

export interface AlbumResponsePermissions {
  delete: boolean;
  download: boolean;
  edit: boolean;
  purchase: boolean;
}

export interface Policy {
  isDownloadable: boolean;
  price: number;
  priceCurrency: string;
  pricingType: string;
}

export interface Post {
  caption: null | string;
  counters: PostCounters;
  createdOn: Date;
  creator: Creator;
  id: string;
  isExplicit: boolean;
  isLiked: boolean;
  revisionId: null | string;
  state: State;
  track: PostTrack;
  type: Type;
}

export interface PostCounters {
  comments: number;
  likes: number;
  plays: number;
}

export enum State {
  Public = "Public",
  Unlisted = "Unlisted",
}

export interface PostTrack {
  genreId: string;
  isHiRes: boolean;
  name: string;
  permissions: TrackPermissions;
  picture: Picture;
  sample: Sample;
}

export interface TrackPermissions {
  download: boolean;
}

export interface Sample {
  audioFormat: AudioFormat;
  audioUrl: string;
  duration: number;
  status: SampleStatus;
  uploadUrl: null;
  waveformUrl: string;
}

export enum AudioFormat {
  M4A = "m4a",
}

export enum SampleStatus {
  Ready = "Ready",
}

export enum Type {
  Track = "Track",
}

export interface Theme {
  colors: Colors;
  current: Current;
  images: Images;
  isHeaderHidden: boolean;
}

export interface Colors {
  background: string;
  body: string;
  button: string;
  secondary: string;
  text: string;
}

export interface Current {
  background: string;
}

export interface Images {
  background: null;
  header: string;
  preview: null;
  thumbnail: null;
}

export interface TrackElement {
  audioUrl: string;
  creator: Creator;
  duration: number;
  id: string;
  isExplicit: boolean;
  name: string;
  picture: null;
}

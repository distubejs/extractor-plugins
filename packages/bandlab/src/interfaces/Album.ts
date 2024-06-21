export interface AlbumResponse {
  artist: Artist;
  counters: AlbumResponseCounters;
  creator: Creator;
  credits: null;
  description: null;
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
  themeId: string | null;
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
  name: string;
  picture: Picture;
  username: string;
}

export interface Picture {
  blur: Blur;
  color?: null | string;
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
  name: string;
  picture: Picture;
  status: string;
  username: string;
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
  caption: null;
  counters: PostCounters;
  createdOn: Date;
  creator: Creator;
  id: string;
  isExplicit: boolean;
  isLiked: boolean;
  revisionId: string;
  state: string;
  track: PostTrack;
  type: string;
}

export interface PostCounters {
  comments: number;
  likes: number;
  plays: number;
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
  audioFormat: string;
  audioUrl: string;
  duration: number;
  status: string;
  uploadUrl: string | null;
  waveformUrl: string;
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
  background: string | null;
  header: string | null;
  preview: string;
  thumbnail: string;
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

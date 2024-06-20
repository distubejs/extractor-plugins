export interface PlaylistResponse {
  counters: PlaylistResponseCounters;
  createdOn: Date;
  creator: Creator;
  description: null;
  id: string;
  isLiked: boolean;
  isPublic: boolean;
  lastUpdatedOn: Date;
  metadata: null;
  name: string;
  picture: Picture;
  posts: Post[];
  type: string;
}

export interface PlaylistResponseCounters {
  duration: number;
  items: number;
  likes: number;
  plays: number;
}

export interface Creator {
  counters?: CreatorCounters;
  followingState: string;
  id: string;
  isFollower: boolean;
  isTippable: boolean;
  isVerified: boolean;
  name: string;
  picture: Picture;
  username: string;
}

export interface CreatorCounters {
  bands: number;
  collections: number;
  followers: number;
  following: number;
  plays: number;
}

export interface Picture {
  blur: Blur;
  isDefault: boolean;
  l: string;
  m: string;
  s: string;
  url: string;
  xs: string;
  color?: null;
}

export interface Blur {
  xs: string;
  s: string;
  m: string;
  l: string;
}

export interface Post {
  action: string;
  afterForComments: null;
  backgroundId: null;
  canChangePinState: boolean;
  canComment: boolean;
  canDelete: boolean;
  canEdit: boolean;
  canPin: boolean;
  caption: string;
  channelId: string;
  clientId: string;
  comments: any[];
  counters: PostCounters;
  createdOn: Date;
  creator: Creator;
  id: string;
  isBoosted: boolean;
  isCommentingAllowed: boolean;
  isExclusive: boolean;
  isExplicit: boolean;
  isLiked: boolean;
  isPinned: boolean;
  message: string;
  permissions: Permissions;
  revision: Revision;
  state: string;
  type: string;
}

export interface PostCounters {
  comments: number;
  likes: number;
}

export interface Permissions {
  comment: boolean;
  seeExclusive: boolean;
}

export interface Revision {
  canEdit: boolean;
  canEditSettings: null;
  canMaster: boolean;
  canPublish: boolean;
  counters: RevisionCounters;
  createdOn: Date;
  creator: Creator;
  description: string;
  genres: Genre[];
  id: string;
  isFork: boolean;
  isLiked: boolean;
  isPublic: boolean;
  lyrics: null;
  mastering: Mastering;
  mixdown: Mixdown;
  parentId: null;
  place: null;
  song: Song;
  tags: any[];
}

export interface RevisionCounters {
  comments: number;
  forks: number;
  likes: number;
  plays: number;
}

export interface Genre {
  id: string;
  name: string;
}

export interface Mastering {
  drySampleId: string;
  preset: string;
  previewId: null;
}

export interface Mixdown {
  duration: number;
  file: string;
  id: string;
  status: string;
  waveform: string;
}

export interface Song {
  author: Author;
  counters: SongCounters;
  id: string;
  isFork: boolean;
  isForkable: boolean;
  name: string;
  originalSongId: null;
  picture: Picture;
  slug: string;
}

export interface Author {
  conversationId: null;
  id: string;
  name: string;
  type: string;
  username: string;
}

export interface SongCounters {
  collaborators: number;
  comments: number;
  forks: number;
  likes: number;
  plays: number;
  publicRevisions: number;
}

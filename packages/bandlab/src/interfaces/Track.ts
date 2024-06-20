export interface TrackResponse {
  [x: string]: any;
  caption: string;
  comments: Comment[];
  counters: TrackResponseCounters;
  createdOn: Date;
  creator: Creator;
  id: string;
  initiatorReaction: null;
  isCommentingAllowed: boolean;
  isExplicit: boolean;
  isLiked: boolean;
  permissions: TrackResponsePermissions;
  reactions: Reaction[];
  revisionId: string;
  state: string;
  track: Track;
  type: string;
}

export interface Comment {
  content: string;
  counters: CommentCounters;
  createdOn: Date;
  creator: Creator;
  id: string;
  isLiked: boolean;
  permissions: CommentPermissions;
}

export interface CommentCounters {
  likes: number;
  replies: number;
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

export interface Picture {
  blur: Blur;
  color: null | string;
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

export interface CommentPermissions {
  delete: boolean;
}

export interface TrackResponseCounters {
  comments: number;
  likes: number;
  plays: number;
  reactions: number;
}

export interface TrackResponsePermissions {
  comment: boolean;
  delete: boolean;
  edit: boolean;
}

export interface Reaction {
  count: number;
  reaction: string;
}

export interface Track {
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
  uploadUrl: null;
  waveformUrl: string;
}

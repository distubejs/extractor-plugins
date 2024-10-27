import type { Comment, Counters, Creator, Picture, Reaction } from "./Revision";

export interface TrackResponse {
  caption: string;
  comments: Comment[];
  counters: Counters;
  createdOn: Date;
  creator: Creator;
  id: string;
  initiatorReaction: null;
  isCommentingAllowed: boolean;
  isExplicit: boolean;
  isLiked: boolean;
  permissions: TrackPermissions;
  reactions: Reaction[];
  revisionId: string;
  state: string;
  track: Track;
  type: string;
}

export interface TrackPermissions {
  comment: boolean;
  delete: boolean;
  edit: boolean;
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

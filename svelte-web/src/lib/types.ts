export interface Project {
  id: string;
  title: string;
  slug: string;
  image: string;
  description: string;
  url?: string;
  media?: string[];
}

export interface PlaylistOrImage {
  id: string;
  title: string;
  image: string;
  description: string;
  isPlaylistOrImage: true;
  url?: string;
  media?: string[];
}
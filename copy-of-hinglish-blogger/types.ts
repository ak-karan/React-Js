export interface Comment {
  id: string;
  postId: string;
  author: string;
  content: string;
  date: string;
}

export interface Post {
  id: string;
  title: string;
  excerpt?: string;
  content: string;
  author: string;
  date: string;
  category: string;
  city?: string;
  state?: string;
  imageUrl?: string;
  tags?: string[];
  views: number;
  isDraft: boolean;
  comments: Comment[];
}
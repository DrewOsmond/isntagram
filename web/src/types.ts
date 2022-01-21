export interface Likes {
  userId: number;
  postId: number;
}

export interface User {
  username: string;
  email: string;
  password: string;
  picture: string;
  Likes: Likes[];
}

export interface UserProfile {
  username: string;
  email: string;
  password: string;
  picture: string;
  likes: Likes[];
  posts: Post[];
  followedBy: [];
  following: [];
  error?: string;
}

export interface LoginInfo {
  email: string;
  password: string;
}

export interface SessionUser {
  user: User | null;
  errors: boolean;
  loading: boolean;
}

export interface NewPost {
  image: string;
  content: string;
  username: string;
}

export interface Post {
  id: number;
  user: {
    username: string;
    profile_picture: string | null;
  };
  content: string;
  image: string;
  likes: [];
  comments: [];
}

interface IRepositoryOwner {
  login: string;
  id: number;
  avatar_url: string;
  node_id: string
}

export interface IRepository {
  id: number;
  node_id: string;
  name: string;
  full_name: string;
  private: boolean;
  html_url: string;
  description: string;
  created_at: string;
  visibility: string;
  stargazers_count: number;
  language: string|null;
}

export interface IRepositoryList {
  total_count: number;
  incomplete_results: false;
  items: IRepository[];
}

export interface IContextData {
  likedRepositories: number[];
  onRepoLike: (id: number) => void;
}
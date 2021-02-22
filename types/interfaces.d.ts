interface User {
  nickname: string;
  name: string;
  picture: string;
  updated_at: string;
  sub: string;
}

interface Session {
  user?: User;
  createdAt: string;
  idToken: string;
  accessToken: string;
  accessTokenScope: string;
  accessTokenExpiresAt: string;
}

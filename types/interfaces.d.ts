export interface User {
  nickname: string;
  name: string;
  picture: string;
  updated_at: string;
  sub: string;
}

export interface Session {
  user?: User;
  createdAt: string;
  idToken: string;
  accessToken: string;
  accessTokenScope: string;
  accessTokenExpiresAt: string;
}

export interface ErrorProps {
  tags?: string;
  hasAction?: string;
  pageTitle?: string;
  site?: string;
  menuItem?: string;
  mediaUrl?: string;
  headerText?: string;
  captionText?: string;
  actionText?: string;
  ctaLink?: string;
  headerType?: string;
  location?: string;
}

export interface WidgetStateProps {
  widgetDescription: string;
  widgetTitle: string;
  widgetPageId: string | string[];
  widgetDisable: boolean;
  widgetType: string;
  widgetItems: string[];
}
export interface WidgetErrorProps {
  widgetDescription?: string;
  widgetTitle?: string;
  widgetItems?: string[];
}

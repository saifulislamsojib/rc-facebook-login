import { CSSProperties, ElementType, MouseEvent, ReactNode } from "react";

export interface FacebookLoginOptions {
  appId: string;
  callback(
    userInfo: ReactFacebookLoginInfo | ReactFacebookFailureResponse
  ): void;
  onFailure?(response: ReactFacebookFailureResponse): void;

  autoLoad?: boolean;
  cookie?: boolean;
  disableMobileRedirect?: boolean;
  fields?: string;
  isDisabled?: boolean;
  language?: string;
  onClick?(event: MouseEvent<HTMLButtonElement>): void;
  redirectUri?: string;
  scope?: string;
  version?: string;
  xfbml?: boolean;
  isMobile?: boolean;
  returnScopes?: boolean;
  state?: string;
  authType?: string;
  responseType?: string;
}

export interface FacebookLoginProps extends FacebookLoginOptions {
  style?: CSSProperties;
  className?: string;
  icon?: ReactNode;
  textButton?: string;
  typeButton?: "button" | "submit" | "reset";
  tag?: ElementType;
  render?(props: ReactFacebookLoginRenderProps): JSX.Element;
}

export interface ReactFacebookFailureResponse {
  status?: string;
}

export interface ReactFacebookLoginInfo {
  id: string;
  userID: string;
  accessToken: string;
  name?: string;
  email?: string;
  picture?: {
    data: {
      height?: number;
      is_silhouette?: boolean;
      url?: string;
      width?: number;
    };
  };
}

export interface ReactFacebookLoginRenderProps {
  disabled: boolean;
  onClick?(event: MouseEvent<HTMLButtonElement>): void;
}

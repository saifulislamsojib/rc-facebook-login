import { CSSProperties, Component, MouseEvent, ReactNode } from "react";

export interface ReactFacebookLoginProps {
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
  render(props: ReactFacebookLoginRenderProps): JSX.Element;
}

export interface ReactFacebookLoginWithButtonProps
  extends ReactFacebookLoginProps {
  buttonStyle?: CSSProperties;
  containerStyle?: CSSProperties;
  cssClass?: string;
  icon?: ReactNode;
  size?: "small" | "medium" | "metro";
  textButton?: string;
  typeButton?: string;
  tag?: Node | Component<any>;
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
  isSdkLoaded: boolean;
  isProcessing: boolean;
  isDisabled: boolean;
  onClick?(event: MouseEvent<HTMLButtonElement>): void;
}

import { CSSProperties, ElementType, MouseEvent, ReactNode } from "react";

// eslint-disable-next-line no-unused-vars
type OnClick = (event: MouseEvent<HTMLButtonElement>) => void;

export type FacebookLoginResponse = FacebookLoginInfo | FacebookFailureResponse;

interface FacebookLoginCommonOptions {
  appId: string;
  autoLoad?: boolean;
  cookie?: boolean;
  disableMobileRedirect?: boolean;
  fields?: string;
  isDisabled?: boolean;
  language?: string;
  onClick?: OnClick;
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

interface FacebookLoginWithFailureOptions extends FacebookLoginCommonOptions {
  callback(
    // eslint-disable-next-line no-unused-vars
    response: FacebookLoginInfo
  ): void;
  // eslint-disable-next-line no-unused-vars
  onFailure(response: FacebookFailureResponse): void;
}

interface FacebookLoginWithOutFailureOptions
  extends FacebookLoginCommonOptions {
  callback(
    // eslint-disable-next-line no-unused-vars
    response: FacebookLoginResponse
  ): void;
  onFailure?: null;
}

export type FacebookLoginOptions =
  | FacebookLoginWithFailureOptions
  | FacebookLoginWithOutFailureOptions;

interface FacebookLoginOnlyComponentProps {
  style?: CSSProperties;
  className?: string;
  icon?: ReactNode;
  textButton?: string;
  typeButton?: "button" | "submit" | "reset";
  tag?: ElementType;
  // eslint-disable-next-line no-unused-vars
  render?(props: FacebookLoginRenderProps): JSX.Element;
  disableClassName?: string;
  disableOpacity?: number;
}

export type FacebookLoginProps = FacebookLoginOnlyComponentProps &
  FacebookLoginOptions;

export interface FacebookFailureResponse {
  status?: string;
}

export interface FacebookLoginInfo {
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

export interface FacebookLoginRenderProps {
  disabled: boolean;
  isDisabled: boolean;
  isProcessing: boolean;
  isSdkLoaded: boolean;
  onClick: OnClick;
}

export interface LoginStatusResponse {
  status: "connected" | "not_authorized" | "unknown";
  authResponse?: {
    accessToken: string;
    expiresIn: Date | string;
    reauthorize_required_in: Date | string;
    signedRequest: any;
    userID: string;
  };
}

export interface FB {
  api: any;
  login: any;
  init: any;
  getLoginStatus: any;
}

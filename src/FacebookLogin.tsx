import PropTypes from "prop-types";
import { MouseEvent, useCallback, useEffect, useRef, useState } from "react";
import decodeParamForKey from "./decodeParam";
import getParamsFromObject from "./objectToParams";
import { ReactFacebookLoginProps } from "./types/facebook";

const getIsMobile = () => {
  let isMobile = false;

  try {
    isMobile = !!(
      (window.navigator &&
        "standalone" in window.navigator &&
        window.navigator.standalone) ||
      navigator.userAgent.match("CriOS") ||
      navigator.userAgent.match(/mobile/i)
    );
  } catch (ex) {
    // continue regardless of error
  }

  return isMobile;
};

const FacebookLogin = (props: ReactFacebookLoginProps) => {
  const {
    redirectUri = typeof window !== "undefined" ? window.location.href : "/",
    scope = "public_profile,email",
    returnScopes = false,
    xfbml = false,
    cookie = false,
    authType = "",
    fields = "name",
    version = "3.1",
    language = "en_US",
    disableMobileRedirect = false,
    isMobile = getIsMobile(),
    onFailure = null,
    state = "facebookdirect",
    responseType = "code",
    autoLoad,
    callback,
    render,
    isDisabled,
    appId,
    onClick,
  } = props;

  const [isSdkLoaded, setSdkLoaded] = useState(false);
  const [isProcessing, setProcessing] = useState(false);
  const [autoLoadState, setAutoLoadState] = useState<boolean | null>(null);

  const isMountedRef = useRef(false);

  const responseApi = useCallback(
    (authResponse: any) => {
      window.FB.api("/me", { locale: language, fields: fields }, (me: any) => {
        Object.assign(me, authResponse);
        callback(me);
      });
    },
    [language, fields, callback]
  );

  const checkLoginState = useCallback(
    (response: any) => {
      if (isMountedRef.current) {
        setProcessing(false);
      }
      if (response.authResponse) {
        responseApi(response.authResponse);
      } else {
        if (onFailure) {
          onFailure({ status: response.status });
        } else {
          callback({ status: response.status });
        }
      }
    },
    [callback, onFailure, responseApi]
  );

  const checkLoginAfterRefresh = useCallback(
    (response: any) => {
      if (response.status === "connected") {
        checkLoginState(response);
      } else {
        window.FB.login(
          (loginResponse: any) => checkLoginState(loginResponse),
          true
        );
      }
    },
    [checkLoginState]
  );

  useEffect(() => {
    isMountedRef.current = true;

    if (document.getElementById("facebook-jssdk")) {
      setSdkLoaded(true);
      return;
    }

    const setFbAsyncInit = () => {
      const isRedirectedFromFb = () => {
        const params = window.location.search;
        return (
          decodeParamForKey(params, "state") === "facebookdirect" &&
          (decodeParamForKey(params, "code") ||
            decodeParamForKey(params, "granted_scopes"))
        );
      };
      window.fbAsyncInit = () => {
        window.FB.init({
          version: `v${version}`,
          appId,
          xfbml,
          cookie,
        });
        if (isMountedRef.current) {
          setSdkLoaded(true);
        }
        if (autoLoad || isRedirectedFromFb()) {
          window.FB.getLoginStatus(checkLoginAfterRefresh);
        }
      };
    };

    const loadSdkAsynchronously = () => {
      ((d, s, id) => {
        const element = d.getElementsByTagName(s)[0] as HTMLScriptElement;
        const fjs = element;
        let js = element;
        if (d.getElementById(id)) {
          return;
        }
        js = d.createElement(s) as HTMLScriptElement;
        js.id = id;
        js.src = `https://connect.facebook.net/${language}/sdk.js`;
        fjs.parentNode?.insertBefore(js, fjs);
      })(document, "script", "facebook-jssdk");
    };

    setFbAsyncInit();
    loadSdkAsynchronously();

    let fbRoot = document.getElementById("fb-root");
    if (!fbRoot) {
      fbRoot = document.createElement("div");
      fbRoot.id = "fb-root";
      document.body.appendChild(fbRoot);
    }

    // unmounting
    () => {
      isMountedRef.current = false;
    };
  }, [
    appId,
    autoLoad,
    checkLoginAfterRefresh,
    cookie,
    language,
    version,
    xfbml,
  ]);

  useEffect(() => {
    if (isSdkLoaded && autoLoadState && !autoLoad) {
      window.FB.getLoginStatus(checkLoginAfterRefresh);
    }
  }, [autoLoad, autoLoadState, checkLoginAfterRefresh, isSdkLoaded]);

  useEffect(() => {
    if (isSdkLoaded && autoLoad && !autoLoadState) {
      setAutoLoadState(autoLoad);
    }
  }, [isSdkLoaded, autoLoad, autoLoadState]);

  const click = (e: MouseEvent<HTMLButtonElement>) => {
    if (!isSdkLoaded || isProcessing || isDisabled) {
      return;
    }
    setProcessing(true);

    if (typeof onClick === "function") {
      onClick(e);
      if (e.defaultPrevented) {
        setProcessing(false);
        return;
      }
    }

    const params = {
      client_id: appId,
      redirect_uri: redirectUri,
      state,
      return_scopes: returnScopes,
      scope,
      response_type: responseType,
      auth_type: authType,
    };

    if (isMobile && !disableMobileRedirect) {
      window.location.href = `https://www.facebook.com/dialog/oauth${getParamsFromObject(
        params
      )}`;
    } else {
      if (!window.FB) {
        if (onFailure) {
          onFailure({ status: "facebookNotLoaded" });
        }

        return;
      }

      window.FB.getLoginStatus((response: any) => {
        if (response.status === "connected") {
          checkLoginState(response);
        } else {
          window.FB.login(checkLoginState, {
            scope,
            return_scopes: returnScopes,
            auth_type: params.auth_type,
          });
        }
      });
    }
  };

  if (!render) {
    throw new Error("ReactFacebookLogin requires a render prop to render");
  }

  const propsForRender = {
    onClick: click,
    isDisabled: !!isDisabled,
    isProcessing: isProcessing,
    isSdkLoaded: isSdkLoaded,
  };

  return render(propsForRender);
};

export default FacebookLogin;

FacebookLogin.propTypes = {
  isDisabled: PropTypes.bool,
  callback: PropTypes.func.isRequired,
  appId: PropTypes.string.isRequired,
  xfbml: PropTypes.bool,
  cookie: PropTypes.bool,
  authType: PropTypes.string,
  scope: PropTypes.string,
  state: PropTypes.string,
  responseType: PropTypes.string,
  returnScopes: PropTypes.bool,
  redirectUri: PropTypes.string,
  autoLoad: PropTypes.bool,
  disableMobileRedirect: PropTypes.bool,
  isMobile: PropTypes.bool,
  fields: PropTypes.string,
  version: PropTypes.string,
  language: PropTypes.string,
  onClick: PropTypes.func,
  onFailure: PropTypes.func,
  render: PropTypes.func.isRequired,
};

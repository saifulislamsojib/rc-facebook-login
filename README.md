# textmodifier

A `react` component for Facebook Login.It's a customizable Facebook Login component.

## install

```
npm install rc-facebook-login
or
yarn add rc-facebook-login
```

## Usage

```
    const responseFacebook = (response: ReactFacebookLoginInfo) => {
        const { name, email, picture, accessToken } = response || {};
    };

    return (
      <FacebookLogin
        appId={FB_APP_ID}
        fields="name,email,picture"
        callback={responseFacebook}
        render={({ onClick, isSdkLoaded, isProcessing, isDisabled }) => (
            <button
                onClick={onClick}
                className="third-party-auth"
                disabled={isProcessing || !isSdkLoaded || isDisabled}
            >
            Continue with Facebook
            </button>
        )}
    />
    )
```

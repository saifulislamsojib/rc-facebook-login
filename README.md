# rc-facebook-login

A `react` component for Facebook Login. It's a customizable Facebook Login component. You can also use hook for Facebook Login.

## install

```
npm install rc-facebook-login
or
yarn add rc-facebook-login
```

## Usage

```
    const responseFacebook = (response: FacebookLoginResponse) => {
      console.log(response);
    };

    return (
      <FacebookLogin
        appId={'FB_APP_ID'}
        fields="name,email,picture"
        callback={responseFacebook}
        className="third-party-auth"
        icon={<FacebookIcon />} // you can use any icon library for show icon
     />
    )
```

## Customize by render props

```
    const responseFacebook = (response: FacebookLoginResponse) => {
      console.log(response);
    };

    return (
      <FacebookLogin
        appId={'FB_APP_ID'}
        fields="name,email,picture"
        callback={responseFacebook}
        render={({ disabled, onClick }) => (
            <button
                onClick={onClick}
                disabled={disabled}
                className="third-party-auth"
            >
              <span
                style={{
                    marginRight: 5,
                }}
              >
                <FacebookIcon />
              </span>
              Continue with Facebook
            </button>
        )}
      />
    )
```

## Using Hook

```
    const responseFacebook = (response: FacebookLoginResponse) => {
      console.log(response);
    };

    const { disabled, onClick } = useFacebookLogin({
      appId: 'FB_APP_ID',
      fields: "name,email,picture",
      callback: responseFacebook,
    });

    return (
      <button
        onClick={onClick}
        disabled={disabled}
        className="third-party-auth"
      >
        <span
            style={{
                marginRight: 5,
            }}
        >
            <FacebookIcon />
        </span>
        Continue with Facebook
      </button>
    )
```

## On Failure

```
    const responseFacebook = (response: FacebookLoginInfo) => {
      console.log(response);
    };

    const failureResponse = (response: FacebookFailureResponse) => {
      console.log(response);
    };

    return (
      <FacebookLogin
        appId={'FB_APP_ID'}
        fields="name,email,picture"
        callback={responseFacebook}
        onFailure={failureResponse}
        className="third-party-auth"
        icon={<FacebookIcon />} // you can use any icon library for show icon
     />
    )
```

## Without On Failure Handle Failure

```
    const responseFacebook = (response: FacebookLoginResponse) => {
      if("accessToken" in response) {
        // handle success
        console.log(response);
      } else {
        // handle failure
        console.log(response);
      }
    };

    return (
      <FacebookLogin
        appId={'FB_APP_ID'}
        fields="name,email,picture"
        callback={responseFacebook}
        className="third-party-auth"
        icon={<FacebookIcon />} // you can use any icon library for show icon
     />
    )
```

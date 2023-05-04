# rc-facebook-login

A `react` component for Facebook Login. It's a customizable Facebook Login component. You can also use hook for Facebook Login.

## install

```
npm install rc-facebook-login
or
yarn add rc-facebook-login
```

## Usage

```tsx
import FacebookLogin, { FacebookLoginResponse } from "rc-facebook-login";
import { BsFacebook } from "react-icons/bs"; // using react icons

const App = () => {
  const responseFacebook = (response: FacebookLoginResponse) => {
    console.log(response);
  };

  return (
    <FacebookLogin
      appId={"FB_APP_ID"}
      fields="name,email,picture"
      callback={responseFacebook}
      className="facebook-login-button"
      icon={<BsFacebook />} // you can use any icon library for show icon
    />
  );
};

export default App;
```

### Customize by render props

```tsx
import FacebookLogin, { FacebookLoginResponse } from "rc-facebook-login";
import { BsFacebook } from "react-icons/bs"; // using react icons

const App = () => {
  const responseFacebook = (response: FacebookLoginResponse) => {
    console.log(response);
  };

  return (
    <FacebookLogin
      appId={"FB_APP_ID"}
      fields="name,email,picture"
      callback={responseFacebook}
      // custom button using render props
      render={({ disabled, onClick }) => (
        <button
          onClick={onClick}
          disabled={disabled}
          className="facebook-login-button"
        >
          <span
            style={{
              marginRight: 5,
            }}
          >
            <BsFacebook />
          </span>
          Continue with Facebook
        </button>
      )}
    />
  );
};

export default App;
```

### Using Hook

```tsx
import { useFacebookLogin, FacebookLoginResponse } from "rc-facebook-login";
import { BsFacebook } from "react-icons/bs"; // using react icons

const App = () => {
  const responseFacebook = (response: FacebookLoginResponse) => {
    console.log(response);
  };

  const { disabled, onClick } = useFacebookLogin({
    appId: "FB_APP_ID",
    fields: "name,email,picture",
    callback: responseFacebook,
  });

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className="facebook-login-button"
    >
      <span
        style={{
          marginRight: 5,
        }}
      >
        <BsFacebook />
      </span>
      Continue with Facebook
    </button>
  );
};

export default App;
```

### On Failure

##### you can also use it in useFacebookLogin hook

```tsx
import FacebookLogin, {
  FacebookFailureResponse,
  FacebookLoginInfo,
} from "rc-facebook-login";
import { BsFacebook } from "react-icons/bs"; // using react icons

const App = () => {
  // handle success
  const responseFacebook = (response: FacebookLoginInfo) => {
    console.log(response);
  };

  // handle failure
  const failureResponse = (response: FacebookFailureResponse) => {
    console.log(response);
  };

  return (
    <FacebookLogin
      appId={"FB_APP_ID"}
      fields="name,email,picture"
      callback={responseFacebook}
      onFailure={failureResponse}
      className="facebook-login-button"
      icon={<BsFacebook />} // you can use any icon library for show icon
    />
  );
};

export default App;
```

### Without onFailure Handle Failure

##### you can also use it in useFacebookLogin hook

```tsx
import FacebookLogin, { FacebookLoginResponse } from "rc-facebook-login";
import { BsFacebook } from "react-icons/bs"; // using react icons

const App = () => {
  const responseFacebook = (response: FacebookLoginResponse) => {
    if ("id" in response) {
      // handle success
      console.log(response);
    } else {
      // handle failure
      console.log(response);
    }
  };

  return (
    <FacebookLogin
      appId={"FB_APP_ID"}
      fields="name,email,picture"
      callback={responseFacebook}
      className="facebook-login-button"
      icon={<BsFacebook />} // you can use any icon library for show icon
    />
  );
};

export default App;
```

### handle Loading

##### you can also use it in useFacebookLogin hook

```tsx
import FacebookLogin, { FacebookLoginResponse } from "rc-facebook-login";
import { useState } from "react";
import { BsFacebook } from "react-icons/bs"; // using react icons

const App = () => {
  const [loading, setLoading] = useState(false);

  const responseFacebook = (response: FacebookLoginResponse) => {
    setLoading(false); // set loading to false
    console.log(response);
  };

  return (
    <FacebookLogin
      appId={"FB_APP_ID"}
      fields="name,email,picture"
      callback={responseFacebook}
      className="facebook-login-button"
      onClick={() => setLoading(true)} // set loading to true
      isDisabled={loading} // disable the button when loading
      disableClassName="button-disable" // disable className
      icon={<BsFacebook />} // you can use any icon library for show icon
      textButton={loading ? "Login processing..." : "Continue with Facebook"}
    />
  );
};

export default App;
```

### Import specific files

```tsx
// FacebookLogin component import
import FacebookLogin from "rc-facebook-login/dist/FacebookLogin";
// useFacebookLogin hook import
import useFacebookLogin from "rc-facebook-login/dist/hooks/useFacebookLogin";
// import types from rc-facebook-login
import {
  FacebookLoginResponse,
  FacebookFailureResponse,
  FacebookLoginInfo,
} from "rc-facebook-login/dist/types/facebook";
```

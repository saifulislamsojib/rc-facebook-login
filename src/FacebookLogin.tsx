import PropTypes from "prop-types";
import { ComponentProps, ElementType } from "react";
import useFacebookLogin from "./hooks/useFacebookLogin";
import { FacebookLoginProps } from "./types/facebook";

const isHasAddDisabledProp = (tag: ElementType) =>
  [
    "button",
    "input",
    "select",
    "textarea",
    "optgroup",
    "option",
    "fieldset",
  ].indexOf((tag + "").toLowerCase()) >= 0;

const classNames = (...args: (string | undefined | false)[]) =>
  args.filter(Boolean).join(" ");

const FacebookLogin = ({
  style = {},
  className,
  icon,
  textButton = "Continue with Facebook",
  typeButton = "button",
  tag: Tag = "button",
  disableClassName,
  disableOpacity = 0.6,
  render = ({ onClick, disabled }) => {
    const tagProps: ComponentProps<"button"> = {
      onClick,
    };

    const classes = classNames(className, disableClassName);
    if (classes) {
      tagProps.className = classes;
    }

    if (isHasAddDisabledProp(Tag) && disabled) {
      tagProps.disabled = true;
    }

    if (Tag === "button" || Tag === "input") {
      tagProps.type = typeButton;
    }

    return (
      <Tag
        {...tagProps}
        style={{
          ...style,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          opacity: tagProps.disabled ? disableOpacity : 1,
        }}
      >
        {icon && (
          <span
            style={{
              marginRight: 5,
            }}
          >
            {icon}
          </span>
        )}
        {textButton}
      </Tag>
    );
  },
  ...props
}: FacebookLoginProps) => {
  const renderProps = useFacebookLogin(props);

  return render(renderProps);
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
  render: PropTypes.func,
  style: PropTypes.object,
  className: PropTypes.string,
  icon: PropTypes.node,
  textButton: PropTypes.string,
  typeButton: PropTypes.string,
  tag: PropTypes.node,
  disableClassName: PropTypes.string,
  disableOpacity: PropTypes.number,
};

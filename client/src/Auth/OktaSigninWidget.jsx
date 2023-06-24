import { useEffect, useRef } from "react";
import OktaSignin from "@okta/okta-signin-widget";

import { oktaConfig } from "../lib/oktaConfig";
import "../../node_modules/@okta/okta-signin-widget/dist/css/okta-sign-in.min.css";

export function OktaSigninWidget({ onSuccess, onError }) {
  const widgetRef = useRef();
  useEffect(() => {
    if (!widgetRef.current) return false;

    const widget = new OktaSignin(oktaConfig);
    widget
      .showSignInToGetTokens({
        el: widgetRef.current,
      })
      .then(onSuccess)
      .catch(onError);

    return () => widget.remove();
  }, [onSuccess, onError]);

  return (
    <div className="container mt-5 mb-5">
      <div ref={widgetRef}></div>
    </div>
  );
}

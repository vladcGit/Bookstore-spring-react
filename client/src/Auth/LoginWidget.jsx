import { Navigate } from "react-router-dom";
import { useOktaAuth } from "@okta/okta-react";
import SpinnerLoading from "../layouts/utils/SpinnerLoading";

import React from "react";
import { OktaSigninWidget } from "./OktaSigninWidget";

export default function LoginWidget() {
  const { oktaAuth, authState } = useOktaAuth();
  const onSuccess = (tokens) => {
    oktaAuth.handleLoginRedirect(tokens);
  };
  const onError = (err) => {
    console.log("Error: ", err);
  };
  if (!authState) return <SpinnerLoading />;
  return authState.isAuthenticated ? (
    <Navigate to={{ pathname: "/" }} />
  ) : (
    <OktaSigninWidget onSuccess={onSuccess} onError={onError} />
  );
}

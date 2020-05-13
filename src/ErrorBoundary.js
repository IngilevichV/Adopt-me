import React from "react";
import { Link, Redirect } from "@reach/router";

class ErrorBoundary extends React.Component {
  state = {
    hasError: false,
  };

  static getDerivedStateFromError() {
    return { hasError: true, redirect: false };
  }

  componentDidCatch(error, info) {
    console.error("ErrorBoundary caught an error", error, info);
  }

  componentDidUpdate() {
    const { hasError } = this.state;
    if (hasError) {
      setTimeout(() => this.setState({ redirect: true }), 5000);
    }
  }

  render() {
    const { hasError, redirect } = this.state;

    if (redirect) {
      return <Redirect to="/" noThrow />;
    }

    if (hasError) {
      return (
        <h1>
          {" "}
          There was an error with this listing. <Link to="/">
            Click here
          </Link>{" "}
          to go back to the home page or wait five seconds.
        </h1>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;

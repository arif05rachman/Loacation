import { css } from "@emotion/css";

export const LoginStyle = css`
  .login-container {
    height: 100vh !important;
    width: 100vw !important;
    position: relative;
  }
  .loggin-wrapper {
    min-width: 20%;
    position: absolute;
    text-align: center;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    font-size: 2.5rem;
  }
  .bg-wave {
    position: absolute;
    bottom: 0;
    z-index: -1;
  }
`;

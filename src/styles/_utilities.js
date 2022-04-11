import { injectGlobal } from "@emotion/css";
export const utilities = injectGlobal`
.trigger {
    padding: 0 24px;
    font-size: 18px;
    line-height: 64px;
    cursor: pointer;
    transition: color 0.3s;
  }
  
  .trigger:hover {
    color: #1890ff;
  }
  
  .site-layout .site-layout-background {
    background: #fff;
  }

  .sider-background{
    background: #0099ff !important;
  }

  .loading-loader {
    top: 45%;
    position: relative;
    text-align: center;
  }

  .loading-container {
    position: fixed;
    width: 100%;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    z-index: 99999999 !important;
    background-color: rgba(138, 138, 138, 0.3) !important;
  },
  .ant-table-thead > tr > th {
    background: #0099ff !important;
    color: #fff !important;
  }
`;

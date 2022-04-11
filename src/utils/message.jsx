import { message } from "antd";

const Message = () => {
  const successMessage = (text) => {
    message.success({
      content: text,
      className: "u-right",
    });
  };

  const errorMessage = (error) => {
    let text = "";
    if (typeof error === "string") {
      text = error;
    } else {
      const { data } = error || {};
      if (data?.message) {
        text = data?.message;
      } else if (data?.error) {
        text = data?.error;
      } else if (data) {
        text = data;
      } else if (!data) {
        text = "Network Error";
      }
    }
    message.error({
      content: text,
      className: "u-right",
    });
  };

  const destroyMessage = () => {
    message.destroy();
  };

  const loading = (text) => {
    message.loading({
      content: text,
      duration: 0,
      className: "u-right",
    });
  };

  return {
    successMessage,
    errorMessage,
    destroyMessage,
    loading,
  };
};

export default Message;

import NProgress from "nprogress";
import "nprogress/nprogress.css";

// 启动进度条
const startProgress = () => {
  NProgress.start();
};

// 结束进度条
const finishProgress = () => {
  NProgress.done();
};

// 进度条配置
NProgress.configure({
  showSpinner: false,
});

export { startProgress, finishProgress };

export const getTime = () => {
  let hour = new Date().getHours();
  if (hour < 12) {
    return "早上好";
  } else if (hour < 18) {
    return "下午好";
  } else {
    return "晚上好";
  }
};

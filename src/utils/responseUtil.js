const isResponseSuccess = (responseCode = null) => {
  const responseStatus = responseCode.slice(-1);
  switch (responseStatus) {
    case "1":
      return true;
    default:
      return false;
  }
};

/* eslint import/no-anonymous-default-export: [2, {"allowObject": true}] */
export default {
  isResponseSuccess,
};

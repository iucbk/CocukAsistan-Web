module.exports = {
  success: function(code, message, data) {
    let res = {
      code: code,
      message: message,
      data: data
    };
    return res;
  },
  fail: function(code, message) {
    let res = {
      code: code,
      message: message
    };
    return res;
  }
};

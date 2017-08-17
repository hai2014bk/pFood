class Utils {
  static validateEmail(email) {
      var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(email);
  }
  static validateUnicode(email) {
    var regex = /^([a-z0-9\+_\-]+)(\.[a-z0-9\+_\-]+)*@([a-z0-9\-]+\.)+[a-z]{2,6}$/gi
    if (regex.test(email)) {
      return true;
    }
    return false;
  }

  static validatepassword(password){
    var re = /^[A-Za-z]\w{8,}$/;
    return re.test(password);
  }
  static comparePassword(password, passwordConfirmed) {
    return (password.localeCompare(passwordConfirmed)==0);
  }
  static validatePasswordRegister(password) {
    return (password.length > 8)
  }
static checkSpaceAll(text){
   if (!text.replace(/\s/g, '').length) {
      return true
    }
    return false
  }

  static detectEmoji(str) {
    var ranges = [
        '\ud83c[\udf00-\udfff]', // U+1F300 to U+1F3FF
        '\ud83d[\udc00-\ude4f]', // U+1F400 to U+1F64F
        '\ud83d[\ude80-\udeff]' // U+1F680 to U+1F6FF
    ];
    if (str.match(ranges.join('|'))) {
        return true;
    } else {
        return false;
    }
}


}
export default Utils

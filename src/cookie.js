/*设置cookie*/
export function setCookie(c_name, value, expire) {
  var date = new Date()
  date.setSeconds(date.getSeconds() + expire)
  document.cookie = c_name + "=" + escape(value) + "; expires=" + date.toGMTString()+';path=/'
  //console.log(document.cookie)
}


/*获取cookie*/
export function getCookie(c_name) {
  if (document.cookie.length > 0) {
    let c_start = document.cookie.indexOf(c_name + "=")
    if (c_start != -1) {
      c_start = c_start + c_name.length + 1
      let c_end = document.cookie.indexOf(";", c_start)
      if (c_end == -1) c_end = document.cookie.length
      return unescape(document.cookie.substring(c_start, c_end))
    }
  }
  return ""
}


/*删除cookie*/
export function delCookie(c_name) {
  var exp = new Date();
  exp.setSeconds(exp.getSeconds() - 1)
  var cval = getCookie(c_name);
  if (cval != null){
    document.cookie = c_name + "=" + cval + ";expires=" + exp.toGMTString()+';path=/';
  }
}
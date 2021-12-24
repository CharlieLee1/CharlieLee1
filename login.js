function Event_Login_Check() {

  event.preventDefault();

  login_redirect_url = document.getElementById('login_redirect_url').value;
  document.getElementById("login_redirect_url").value = "";

  user_act = document.getElementById('user_act').value;
  user_pass = document.getElementById('user_pass').value;

  //alert(user_act+"-"+user_pass);

  //console.log("user_act:" + user_act);
  //console.log("user_pass:"+ user_pass);

  if (user_act == "") {
    //console.log("login go 01");
    event.preventDefault();
    $('html').showMessage({
      thisMessage: ['請輸入電子信箱(登入帳號)'],
      className: 'my_message_style',
      zIndex: 99999,
      autoClose: true,
      delayTime: 1000
    });
    return;
  }
  if (user_act != "") {
    reg = /^[^\s]+@[^\s]+\.[^\s]{2,3}$/;
    if (!reg.test(user_act)) {
      event.preventDefault();
      $('html').showMessage({
        thisMessage: ['[電子信箱(登入帳號)]格式錯誤'],
        className: 'my_message_style',
        zIndex: 99999,
        autoClose: true,
        delayTime: 1000
      });
      return;
    }
  }
  if (user_pass == "") {
    //console.log("login go 02");
    event.preventDefault();
    $('html').showMessage({
      thisMessage: ['請輸入密碼'],
      className: 'my_message_style',
      zIndex: 99999,
      autoClose: true,
      delayTime: 1000
    });
    return;
  }

  $.ajax({
    url: "login_post.php",
    type: "POST",
    data: {
      type: "C",
      userid: user_act,
      pwd: user_pass
    },
    dataType: 'json',
    success: function(response) {

      //console.log(response.msg);

      if (response.success) {

        //console.log("login go 1");
        if (typeof event !== 'undefined') {
          event.preventDefault();
        }
        $('html').showMessage({
          thisMessage: [response.msg],
          className: 'my_message_style',
          zIndex: 9999,
          autoClose: true,
          delayTime: 1000
        });

        setTimeout(
          function() {

            setCookie("tsaa_web_site_usertype", "C", 1);

            rem_id = "N";
            if (document.getElementById("rem_id").checked) {
              username = user_act;
              setCookie("tsaa_web_site_username", username, 1);
              setCookie("tsaa_web_site_usertype", "C", 1);
            } else {
              setCookie("tsaa_web_site_username", "", 0);
              setCookie("tsaa_web_site_usertype", "", 0);
            }

            if (login_redirect_url != "") {
              if (login_redirect_url == "about_individual.php") {
                window.location.href = login_redirect_url + "?if_member=Y";
                return;
              } else {
                window.location.href = login_redirect_url;
                return;
              }
            } else {
              window.location.href = "index.php";
            }
          }, 1000);

      } else {

        //console.log("login go 2");

        event.preventDefault();
        $('html').showMessage({
          thisMessage: [response.msg],
          className: 'my_message_style',
          zIndex: 9999999,
          autoClose: true,
          delayTime: 1000
        });
        setCookie("tsaa_web_site_usertype", "", 0);
        return;
      }
    },
    error: function() {
      //console.log("register go 3");

      event.preventDefault();
      $('html').showMessage({
        thisMessage: ['網路有問題'],
        className: 'my_message_style',
        zIndex: 9999999,
        autoClose: true,
        delayTime: 1000
      });
      return;
    }
  });
};



function checkCookie() {
  var username = getCookie("tsaa_web_site_username");
  var usertype = getCookie("tsaa_web_site_usertype");

  //console.log("tsaa_web_site_username:"+username);
  //console.log("tsaa_web_site_usertype:"+usertype);

  if (username != null && username != "" && usertype == "C") {
    //alert("Welcome again " + username);
    document.getElementById('user_act').value = username;
    document.getElementById("rem_id").checked = true;
  } else {
    //username=prompt("Please enter your username:","");
    if (username != null && username != "") {
      //setCookie("tsaa_web_site_username",username,365);
    }
  }
}

function getCookie(c_name) {
  var c_value = document.cookie;
  var c_start = c_value.indexOf(" " + c_name + "=");
  if (c_start == -1) {
    c_start = c_value.indexOf(c_name + "=");
  }
  if (c_start == -1) {
    c_value = null;
  } else {
    c_start = c_value.indexOf("=", c_start) + 1;
    var c_end = c_value.indexOf(";", c_start);
    if (c_end == -1) {
      c_end = c_value.length;
    }
    c_value = unescape(c_value.substring(c_start, c_end));
  }
  return c_value;
}

function setCookie(c_name, value, exdays) {
  var exdate = new Date();
  exdate.setDate(exdate.getDate() + exdays);
  var c_value = escape(value) + ((exdays == null) ? "" : "; expires=" + exdate.toUTCString());
  document.cookie = c_name + "=" + c_value;
}

function show_msg(msg) {

  /*
    var box_width = 300;
    var box_height = 100;
    var timer = 1000;
    //var box_width  = 600;
    //var box_height = 600;
    //var timer      = 8000;
    var width = pageWidth();
    var height = pageHeight();
    var left = leftPosition();
    var top = topPosition();

    var topposition = top + (height / 3) - (box_height / 2);
    var leftposition = left + (width / 2) - (box_width / 2);

    var el = document.createElement("div");
    el.setAttribute("style", "width:" + box_width + "px;height:" + box_height + "px;position:absolute;z-index:99999;top:" + topposition + "px;left:" + leftposition + "px;background-color:grey;");
    el.innerHTML = "<br><font size='2' color='white'><center><b>" + msg + "</b></center></font>";
    setTimeout(function () {
        el.parentNode.removeChild(el);
    }, timer);
    document.body.appendChild(el);
	*/

  $('html').showMessage({
    thisMessage: [msg],
    className: 'my_message_style',
    zIndex: 9999,
    autoClose: true,
    delayTime: 1000
  });
  setTimeout(function() {
    //
  }, 1000);
}

// calculate the current window width //
function pageWidth() {
  return window.innerWidth != null ? window.innerWidth : document.documentElement && document.documentElement.clientWidth ? document.documentElement.clientWidth : document.body != null ? document.body.clientWidth : null;
}

// calculate the current window height //
function pageHeight() {
  return window.innerHeight != null ? window.innerHeight : document.documentElement && document.documentElement.clientHeight ? document.documentElement.clientHeight : document.body != null ? document.body.clientHeight : null;
}

// calculate the current window vertical offset //
function topPosition() {
  return typeof window.pageYOffset != 'undefined' ? window.pageYOffset : document.documentElement && document.documentElement.scrollTop ? document.documentElement.scrollTop : document.body.scrollTop ? document.body.scrollTop : 0;
}

// calculate the position starting at the left of the window //
function leftPosition() {
  return typeof window.pageXOffset != 'undefined' ? window.pageXOffset : document.documentElement && document.documentElement.scrollLeft ? document.documentElement.scrollLeft : document.body.scrollLeft ? document.body.scrollLeft : 0;
}
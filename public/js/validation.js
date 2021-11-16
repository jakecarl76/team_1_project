
    //Password
    function validatePassword(tmpPwd, oldPassword)
    {
      let lenCheck = true;
      let secureCheck = true;
      let isNewCheck = true;
      let errs = [];

      //check password
      if(tmpPwd.length < 9)
      {
        lenCheck = false;
        errs.push("Password must be at least 9 characters long.");
      }

      if(tmpPwd.toLowerCase() == "password" || tmpPwd == "123456789")
      {
        secureCheck = false;
        errs.push("That password is insecure. Please choose another");
      }

      if(tmpPwd == oldPassword && oldPassword !== undefined)
      {
        isNewCheck = false;
        errs.push("New Password cannot be the same as the old Password.")
      }

      return {
        isValid: (lenCheck && secureCheck && isNewCheck),
        lenCheck: lenCheck,
        isSecureCheck: secureCheck,
        isNewCheck: isNewCheck,
        errMsgs: errs
      };

    }//END FUNC CHECK PASSWORD
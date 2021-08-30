<template>
    <div class="body">
        <div class="main">
            <div class="login">
                <img src="../assets/SM.png">
                <div class="ewm"></div>
                <div class="password">密码登录</div>
                <Form :model="loginfrom" ref="loginFromRef" :rules="loginFromRules">
                    <FormItem class="input-username" prop='empNo'>
                        <span class="user">用户名</span>
                        <Input type="number" v-model="loginfrom.empNo" style="width: 400px;height: 40px" class="input" />
                    </FormItem>
                    <FormItem class="input-password" prop='password'>
                        <span class="pass">密码</span>
                        <Input type="password" v-model="loginfrom.password" style="width: 400px;height: 40px" class="input" />
                    </FormItem>
                </Form>
                <Form>
                <FormItem class="remember">
                    <Checkbox v-model="remember" style="color:#a0a0a0;margin-top:-10px;" @on-change=handlechange>记住密码</Checkbox>
                </FormItem>
                <FormItem class="forget">
                    <Checkbox v-model="forget" style="color:#a0a0a0;margin-top:-10px;">忘记密码</Checkbox>
                </FormItem>
                </Form>
                <div class="button">
                    <Button type="success" @click="login">登录</Button>
                    <Button @click="resetLoginFrom">重置</Button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { encrypt, decrypt } from '../assets/api/AES.js'
export default {
  data () {
    return {
      loginfrom: {
        empNo: '',
        password: ''
      },
      loginFromRules: {
        empNo: [
          { required: true, message: '请输入账号', trigger: 'blur' },
          { min: 6, max: 10, message: '长度在 6 到 10 个字符', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 6, max: 30, message: '长度在 6 到 30 个字符', trigger: 'blur' }
        ]
      },
      remember: '',
      forget: false
    }
  },
  methods: {
    async login () {
      this.$refs.loginFromRef.validate(async valid => {
        if (!valid) return
        const { data: res } = await this.$http.post('http://172.16.10.16:8089/api/base/emp_login/password_login_app', this.loginfrom)
        window.sessionStorage.setItem('token', res.data.token)
        if (this.remember === true) {
          this.setCookie(this.loginfrom.empNo, this.loginfrom.password, 30)
        } else {
          this.clearCookie()
        }
        this.$router.push('/Home')
      })
    },
    handlechange () {
      console.log(this.remember)
      this.setrememberCookie(this.remember, 30)
    },
    resetLoginFrom () {
      this.$refs.loginFromRef.resetFields()
    },
    setCookie (empNo, password, exdays) {
      var exdate = new Date()
      const text = encrypt(password)
      exdate.setTime(exdate.getTime() + 24 * 60 * 60 * 1000 * exdays)
      window.document.cookie =
        'userName' + '=' + empNo + ';path=/;expires=' + exdate.toGMTString()
      window.document.cookie =
        'userPwd' + '=' + text + ';path=/;expires=' + exdate.toGMTString()
    },
    setrememberCookie (remember, exdays) {
      var exdate = new Date()
      exdate.setTime(exdate.getTime() + 24 * 60 * 60 * 1000 * exdays)
      window.document.cookie =
        'remember' + '=' + remember + ';path=/;expires=' + exdate.toGMTString()
    },
    getCookie () {
      if (document.cookie.length > 0) {
        var arr = document.cookie.split(';')
        for (var i = 0; i < arr.length; i++) {
          var arr2 = arr[i].split('=')
          console.log(arr2)
          if (arr2[0] === ' userName') {
            this.loginfrom.empNo = arr2[1]
          }
          if (arr2[0] === ' userPwd') {
            this.loginfrom.password = decrypt(arr2[1])
          }
          if (arr2[0] === 'remember') {
            this.remember = arr2[1]
            if (this.remember === 'true') {
              this.remember = true
            } else {
              this.remember = false
            }
          }
        }
      }
    },
    clearCookie () {
      this.setCookie('', '', -1)
    }
  },
  created () {
    this.getCookie()
    console.log(this.remember, this.loginfrom.empNo, this.loginfrom.password)
  }
}
</script>

<style lang="less" scoped>
.body {
    height: 100%;
    background-image: url(../assets/background.png)
}
.main {
    width: 1239px;
    height: 693px;
    background-image: url(../assets/background-login.png);
    border-radius: 3px;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%,-50%);
    background-size:cover
}
.login {
    width: 622px;
    height: 100%;
    position: absolute;
    right: 0;
    top: 0;
}
img {
    width: 200px;
    height: 40px;
    position: absolute;
    right: 120px;
    top: 60px;
}
.ewm {
    width: 25px;
    height: 25px;
    background-image: url(../assets/EW.png);
    background-size:cover;
    position: absolute;
    right: 50px;
    top: 68.5px;
}
.password {
    position: absolute;
    top: 160px;
    color: limegreen;
    font-size: 30px;
    font-family: 'Courier New', Courier, monospace;
    font-weight: 800;
    left: 250px;
}
.input-username {
    position: absolute;
    top: 240px;
    width: 100%;
    height: 50px;
}
.input {
    margin-top: 5px;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%,-50%);
}
.user {
    position: relative;
    line-height: 58px;
    left: 30px;
    color: limegreen;
    font-size: 20px;
}
.input-password {
    position: absolute;
    top: 340px;
    width: 100%;
    height: 50px;
}
.pass {
    position: relative;
    line-height: 58px;
    left: 39px;
    top: 0px;
    color: limegreen;
    font-size: 20px;
}
.button {
    position: absolute;
    top: 440px;
    width: 100%;
    height: 50px;
}
Button {
    width: 100px;
    height: 50px;
    margin-left: 140px;
    margin-top: 50px;
}
.remember {
  position: absolute;
  left: 120px;
  top: 430px;
}
.forget {
  position: absolute;
  left: 425px;
  top: 430px;
}
</style>

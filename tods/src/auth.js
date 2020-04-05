class Auth {
  constructor() {
    this.logged = false;
  }
  login(cb) {
    this.logged = true;
    cb();
  }
  logout(cb) {
    this.logged = false;
    cb();
  }
  islogged() {
    return this.logged;
  }
}

export default new Auth();

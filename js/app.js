// auth, database 앱 인스턴스 생성
const auth = firebase.auth();
const database = firebase.database();

/* Sign in - 페이스북, 구글 */
const facebookLoginBtn = document.querySelector('.header__facebook-login-btn');
const googleLoginBtn = document.querySelector('.header__google-login-btn');

facebookLoginBtn.addEventListener('click', async e => {
  const provider = new firebase.auth.FacebookAuthProvider();
  result = await auth.signInWithPopup(provider);

  const token = result.credential.accessToken;
  const user = result.user;

  const displayName = document.querySelector('');
  const profileImg = document.querySelector('');
  const email = document.querySelector('');
  
  displayName.textContent = user.displayName;
  profileImg.src = user.photoURL;
  email.textContent = user.email;

});

googleLoginBtn.addEventListener('click', async e => {
  const provider = new firebase.auth.GoogleAuthProvider();
})
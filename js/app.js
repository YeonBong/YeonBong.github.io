// auth, database 앱 인스턴스 생성
const auth = firebase.auth();
const database = firebase.database();

/* Sign in - 페이스북, 구글 */
const facebookLoginBtn = document.querySelector('.sign-in__facebook');
const googleLoginBtn = document.querySelector('.sign-in__google');

facebookLoginBtn.addEventListener('click', async e => {
  const provider = new firebase.auth.FacebookAuthProvider();
  result = await auth.signInWithPopup(provider);

  const token = result.credential.accessToken;
  const user = result.user;

  // 유저 정보 표시
  const displayName = document.querySelector('info__display-name');
  const profileImg = document.querySelector('info__profile-img');
  const email = document.querySelector('info__email');

  displayName.textContent = user.displayName;
  profileImg.src = user.photoURL;
  email.textContent = user.email;
});

googleLoginBtn.addEventListener('click', async e => {
  const provider = new firebase.auth.GoogleAuthProvider();
})

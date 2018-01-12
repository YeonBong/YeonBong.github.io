// auth, database 앱 인스턴스 생성
const auth = firebase.auth();
const database = firebase.database();


/* Sign in - 페이스북, 구글 */
const facebookLoginBtn = document.querySelector('.sign-in__facebook');
const googleLoginBtn = document.querySelector('.sign-in__google');

facebookLoginBtn.addEventListener('click', async e => {
  const provider = new firebase.auth.FacebookAuthProvider();
  const result = await auth.signInWithPopup(provider);

  const token = result.credential.accessToken;
  const user = result.user;

  // 유저 정보 표시
  const USER_INFO_STR = `
    <div class="user__info">
      <div class="info__display-name">${user.displayName}</div>
      <div class="info__profile-img-wrapper">
        <img src="${user.photoURL}" alt="" class="info__profile-img">
      </div>
      <div class="info__email">${user.email}</div>
    </div>
    `;

  const headerUser = document.querySelector('.header__user');
  headerUser.insertAdjacentHTML("afterbegin", USER_INFO_STR);
});

googleLoginBtn.addEventListener('click', async e => {
  const provider = new firebase.auth.GoogleAuthProvider();
  const result = await auth.signInWithPopup(provider);

  const token = result.credential.accessToken;
  const user = result.user;

  // 유저 정보 표시
  const USER_INFO_STR = `
    <div class="user__info">
      <div class="info__display-name">${user.displayName}</div>
      <div class="info__profile-img-wrapper">
        <img src="${user.photoURL}" alt="" class="info__profile-img">
      </div>
      <div class="info__email">${user.email}</div>
    </div>
    `;

  const headerUser = document.querySelector('.header__user');
  headerUser.insertAdjacentHTML("afterbegin", USER_INFO_STR);
})


/* Sign Out */
const signOutBtn = document.querySelector('.user__sign-out');

signOutBtn.addEventListener('click', async e => {
  auth.signOut()
  .then(() => {
    const userInfo = document.querySelector('.user__info');
    userInfo.remove();
  });
});


// 로그인 중인 유저가 있으면 로그인 버튼을 숨기고, 없으면 로그아웃 버튼을 숨긴다.
auth.onAuthStateChanged(user => {
  const userSignIn = document.querySelector('.user__sign-in');
  const userSignOut = document.querySelector('.user__sign-out');
  if (user) {
    userSignIn.classList.add('invisible');
    userSignOut.classList.remove('invisible');
  } else {
    userSignIn.classList.remove('invisible');
    userSignOut.classList.add('invisible');
  }
})


/** 도시 검색 **/
// debounce
let timeoutId;
function debounce(cb, time) {
  return function() {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    timeoutId = setTimeout(() => {
      cb();
      timeoutId = null;
    }, time);
  };
}

const searchInput = document.querySelector('.search__input');

searchInput.addEventListener('input', e => {
  const debounceListener = debounce(() => {
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${e.target.value}&APPID=6c80032342ac8a4aecd41a0bbd4bdc18`)
    .then(res => res.json())
    .then(data => {console.log(data)})
    .catch(e => {
      console.log(e.message)
    })
  }, 1000);
  debounceListener();
})



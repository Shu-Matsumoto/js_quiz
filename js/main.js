import { UserInformation } from "../js/userinformation.js";
import { UserInformationTable } from "../js/userinformation.js";
import { LoadUsersDataFromLS } from "../js/userinformation.js";

// ログインボタンクリック時イベント
$("#login_button").on("click", () => {
  // ユーザ名取得
  let userName = $("#input_name").val();
  // PW取得
  let pw = $("#input_password").val();
  console.log(userName + " , " + pw);

  // ログイン通過
  let loginPass = false; 

  // 登録済ユーザ一覧から入力したユーザ名と一致するものを抽出
  let userMatchIndex = UserInformationTable.findIndex(item => item.name == userName);
  if (userMatchIndex != -1) {
    console.log("user name passed!!");
    // PW比較
    if (UserInformationTable[userMatchIndex].pw == pw) {
      // ログインOK
      loginPass = true;
    }
  }

  // ログイン情報判定結果チェック
  if (loginPass) {
    window.location.href = "../html/typing.html";
  } else {
    alert("ユーザ名、パスワードが誤っています。");
  }
});

// ユーザ登録ボタンクリック時イベント
$("#user_registration_button").on("click", () => {
  window.location.href = "../html/facecreate.html";
});

// ウィンドウ初期化処理
function windowInit() {
  // localstrageからAPPデータロード
  LoadUsersDataFromLS();

  //console.log("Registered users: " + UserInformationTable);

}

// オンロードで描画
window.onload = function () {
  windowInit();
}
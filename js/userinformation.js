// localstrage上のAPPデータID
export const ID_APP_DATA_ON_LS = "QuizAppDataLS";

// ユーザー情報
export class UserInformation{
  constructor(name, pw, faceEyebrowId, faceEyeId, faceNoseId, faceMouthId) {

    this.name = name;                   // 名前
    this.pw = pw;                       // パスワード
    this.highestScore = 100;            // 最高スコア
    this.faceEyebrowId = faceEyebrowId; // 顔情報(眉毛識別情報)
    this.faceEyeId = faceEyeId;         // 顔情報(目識別情報)
    this.faceNoseId = faceNoseId;       // 顔情報(鼻識別情報)
    this.faceMouthId = faceMouthId;     // 顔情報(口識別情報)
  }
}

// 登録済みユーザーの情報
export let UserInformationTable = [];

// ユーザ情報をlocalstrageへ保存
export function SaveUsersDataToLS() {
  
  let jsonData = JSON.stringify(UserInformationTable);
  localStorage.setItem(ID_APP_DATA_ON_LS, jsonData);
  console.log(jsonData);
}

// ユーザ情報をlocalstrageからロード
export function LoadUsersDataFromLS() {
  
  if (localStorage.getItem(ID_APP_DATA_ON_LS)) {
    const jsonData = localStorage.getItem(ID_APP_DATA_ON_LS);
    UserInformationTable = JSON.parse(jsonData);
    console.log(jsonData);
  }
}
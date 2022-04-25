// Import
import { UserInformation } from "../js/userinformation.js";
import { UserInformationTable } from "../js/userinformation.js";
import { SaveUsersDataToLS, LoadUsersDataFromLS } from "../js/userinformation.js";
import { INDEX_PARTS_FACE, INDEX_PARTS_EYEBROW, INDEX_PARTS_EYE, INDEX_PARTS_NOSE, INDEX_PARTS_MOUTH } from "../js/facecreatemodule.js";
import { FaceSprite, EyebrowSprite, EyeSprite, NoseSprite, MouthSprite } from "../js/facecreatemodule.js";
import { PartsIndexs, NumOfPartsItems } from "../js/facecreatemodule.js";
import { DrawFace } from "../js/facecreatemodule.js";

// ロードする画像ファイルパス
const SPRITE_FACE_IMG1 = "../img/kaoparts_resize.png";

// キャンバス
let can = document.getElementById("can");
let con = can.getContext("2d");

// 画像画像の読み込み
let faceSrcImage1 = new Image();
faceSrcImage1.src = SPRITE_FACE_IMG1;
let imageScaleRate = 1 / 3.0;

can.width = FaceSprite[0].w * imageScaleRate + 100;
can.height = FaceSprite[0].h * imageScaleRate  + 100;

// イベントハンドラの登録
function registerPartsSelectButtonClickEventHandler(positive, buttonId, textboxId, partIndex) {
  
  $(buttonId).on("click", () => {
    
    let currentValue = Number($(textboxId).text());
    let setValue = currentValue;
    if (positive) {
      setValue++;
      if (setValue > NumOfPartsItems[partIndex]) {
        setValue = 1;
      }
    } else {
      setValue--;
      if (setValue <= 0) {
        setValue = NumOfPartsItems[partIndex];
      }
    }
    //console.log(currentValue + "," + setValue);
    $(textboxId).text(setValue);

    // 選択パーツの切り替え
    PartsIndexs[partIndex] = setValue - 1;
    // 顔の再描画
    DrawFace(can, con, faceSrcImage1, imageScaleRate);
  })
}

// 登録ボタンクリックイベントハンドラ登録
function userRegistButtonOnclickEventHandler() {

  $("#id_button_user_regist").on("click", () => {
    // GUIからインプット情報の取得
    let userInformation = new UserInformation("", "", 0, 0, 0, 0,);
    userInformation.name = $("#input_name").val();                  // 名前
    userInformation.pw = $("#input_password").val();                // PW
    userInformation.faceEyebrowId = $("#id_textbox_eyebrow").text() - 1; // 眉選択番号
    userInformation.faceEyeId = $("#id_textbox_eye").text() - 1;         // 目選択番号
    userInformation.faceNoseId = $("#id_textbox_nose").text() - 1;       // 鼻選択番号
    userInformation.faceMouthId = $("#id_textbox_mouth").text() - 1;     // 口選択番号
    
    // for DBG
    /* console.log("Name: " + $("#input_name").val());
    console.log("Password: " + userInformation.pw);
    console.log("Eyebrow: " + userInformation.faceEyebrowId);
    console.log("Eye: " + userInformation.faceEyeId);
    console.log("Nose: " + userInformation.faceNoseId);
    console.log("Mouth: " + userInformation.faceMouthId); */

    // 重複チェック & 登録情報追加
    if (UserInformationTable != null) {
      let sameNameDataIndex = UserInformationTable.findIndex(
        item => item.name == userInformation.name);
      
      if (sameNameDataIndex == -1) {
        // 新規データ追加
        UserInformationTable.push(userInformation);
      } else {
        // 名前が既に存在している場合は上書き要否の確認
        UserInformationTable[sameNameDataIndex] = userInformation;
      }
    } else {
      UserInformationTable.push(userInformation);
    }
    
    // ユーザデータをlocalstrageへ保存
    SaveUsersDataToLS();
  })
}

// ウィンドウ初期化処理
function windowInit()
{
  // localstrageからAPPデータロード
  LoadUsersDataFromLS();

  DrawFace(can, con, faceSrcImage1, imageScaleRate);
  $("#id_textbox_eyebrow").text("1");
  $("#id_textbox_eye").text("1");
  $("#id_textbox_nose").text("1");
  $("#id_textbox_mouth").text("1");

  // 眉毛切り替えボタン登録(左向きボタン)
  registerPartsSelectButtonClickEventHandler(false,
    "#id_button_eyebrow_l",
    "#id_textbox_eyebrow",
    INDEX_PARTS_EYEBROW
  )
  // 眉毛切り替えボタン登録(右向きボタン)
  registerPartsSelectButtonClickEventHandler(true,
    "#id_button_eyebrow_r",
    "#id_textbox_eyebrow",
    INDEX_PARTS_EYEBROW
  )

  // 目切り替えボタン登録(左向きボタン)
  registerPartsSelectButtonClickEventHandler(false,
    "#id_button_eye_l",
    "#id_textbox_eye",
    INDEX_PARTS_EYE
  )
  // 目切り替えボタン登録(右向きボタン)
  registerPartsSelectButtonClickEventHandler(true,
    "#id_button_eye_r",
    "#id_textbox_eye",
    INDEX_PARTS_EYE
  )

  // 鼻切り替えボタン登録(左向きボタン)
  registerPartsSelectButtonClickEventHandler(false,
    "#id_button_nose_l",
    "#id_textbox_nose",
    INDEX_PARTS_NOSE
  )
  // 鼻切り替えボタン登録(右向きボタン)
  registerPartsSelectButtonClickEventHandler(true,
    "#id_button_nose_r",
    "#id_textbox_nose",
    INDEX_PARTS_NOSE
  )

  // 口切り替えボタン登録(左向きボタン)
  registerPartsSelectButtonClickEventHandler(false,
    "#id_button_mouth_l",
    "#id_textbox_mouth",
    INDEX_PARTS_MOUTH
  )
  // 口切り替えボタン登録(右向きボタン)
  registerPartsSelectButtonClickEventHandler(true,
    "#id_button_mouth_r",
    "#id_textbox_mouth",
    INDEX_PARTS_MOUTH
  )

  // 登録ボタンクリックイベントハンドラ登録
  userRegistButtonOnclickEventHandler();
}

// オンロードで描画
window.onload = function () {
  windowInit();
}
// localstrage上のAPPデータID
const ID_APP_DATA_ON_LS = "QuizAppDataLS";

// ロードする画像ファイルパス
const SPRITE_FACE_IMG1 = "../img/kaoparts_resize.png";

// 各部位のインデックス
const INDEX_PARTS_FACE    = 0;// 顔
const INDEX_PARTS_EYEBROW = 1;// 眉
const INDEX_PARTS_EYE     = 2;// 目
const INDEX_PARTS_NOSE    = 3;// 鼻
const INDEX_PARTS_MOUTH   = 4;// 口

// キャンバス
let can = document.getElementById("can");
let con = can.getContext("2d");

// ユーザー情報
class UserInformation{
  constructor(name, pw, faceEyebrowId, faceEyeId, faceNoseId, faceMouthId) {

    this.name = name;                   // 名前
    this.pw = pw;                       // パスワード
    this.faceEyebrowId = faceEyebrowId; // 顔情報(眉毛識別情報)
    this.faceEyeId = faceEyeId;         // 顔情報(目識別情報)
    this.faceNoseId = faceNoseId;       // 顔情報(鼻識別情報)
    this.faceMouthId = faceMouthId;     // 顔情報(口識別情報)
  }
}

// スプライトクラス
class Sprite
{
  constructor(x, y, w, h)
  {
    // 原点X
    this.x = x;
    // 原点Y
    this.y = y;
    // 幅
    this.w = w;
    // 高さ
    this.h = h;
  }
}

// スプライト(顔)
let faceSprite = [
  new Sprite(  100,  300, 1540 - 100, 1970 - 300),// 0,
];

// スプライト(眉)
let eyebrowSprite = [
  new Sprite(1965, 77, 2641 - 1965, 245 - 77),    // 0,
  new Sprite(2677, 81, 3373 - 2677, 249 - 81),    // 1,
  new Sprite(2037, 297, 2605 - 2037, 537 - 297),  // 2,
  new Sprite(2641, 305, 3417 - 2641, 513 - 305),  // 3,
];

// スプライト(目)
let eyeSprite = [
  new Sprite(1737, 749, 2309 - 1737, 1000 - 749),   // 0,
  new Sprite(2389, 737, 2913 - 2389, 973 - 737),    // 1,
  new Sprite(2917, 749, 3493 - 2917, 969 - 749),    // 2,
  new Sprite(1745, 1073, 2337 - 1745, 1281 - 1073), // 3,
  new Sprite(2421, 993, 3077 - 2421, 1297 - 993),   // 4,
  new Sprite(3077, 1041, 3465 - 3077, 1269 -1041),  // 5,
];

// スプライト(鼻)
let noseSprite = [
  new Sprite(2013, 1413, 2197 - 2013, 1713 - 1413), // 0,
  new Sprite(2229, 1433, 2441 - 2229, 1725 - 1433), // 1,
  new Sprite(2457, 1465, 2681 - 2457, 1721 - 1465), // 2,
  new Sprite(2713, 1461, 3101 - 2713, 1781 - 1461), // 3,
  new Sprite(3077, 1441, 3477 - 3077, 1721 - 1441), // 4,
];

// スプライト(口)
let mouthSprite = [
  new Sprite(405, 2069, 881 - 405, 2409 - 2069),    // 0,
  new Sprite(845, 2077, 1321 - 845, 2409 - 2077),   // 1,
  new Sprite(1317, 2085, 1749 - 1317, 2417 - 2085), // 2,
  new Sprite(1769, 2041, 2357 - 1769, 2401 - 2041), // 3,
  new Sprite(2401, 2041, 3221 - 2401, 2433 - 2041), // 4,
];

// スプライトを描画する
function drawSprite(img, sprite, spriteIndex, x, y, scale)
{
  let sx = sprite[spriteIndex].x * scale;
  let sy = sprite[spriteIndex].y * scale;
  let sw = sprite[spriteIndex].w * scale;
  let sh = sprite[spriteIndex].h * scale;

  let px = x * scale - sw / 2;
  let py = y * scale - sh / 2;

  con.drawImage(img, sx, sy, sw, sh, px, py, sw, sh);
}

// 画像画像の読み込み
let faceSrcImage1 = new Image();
faceSrcImage1.src = SPRITE_FACE_IMG1;
let imageScaleRate = 1 / 3.0;

can.width = faceSprite[0].w * imageScaleRate + 100;
can.height = faceSprite[0].h * imageScaleRate  + 100;

// 初期化処理
let partsIndexs = new Array(0, 0, 0, 0, 0); // 各部位において画面表示されるパーツのインデックス
let numOfPartsItems = [faceSprite.length,
  eyebrowSprite.length,
  eyeSprite.length,
  noseSprite.length,
  mouthSprite.length
];

function drawFace() {

  // 描画基準位置
  let baseX = (can.width / imageScaleRate) / 2;
  let baseY = (can.height / imageScaleRate) / 2;
  let offsetX = 0;
  let offsetY = 0;

  // 顔描画
  drawSprite(faceSrcImage1,
    faceSprite,
    partsIndexs[INDEX_PARTS_FACE],
    baseX + offsetX,
    baseY + offsetY,
    imageScaleRate);

  // 口描画
  offsetX = 30;
  offsetY = 590;
  drawSprite(faceSrcImage1,
    mouthSprite,
    partsIndexs[INDEX_PARTS_MOUTH],
    baseX + offsetX,
    baseY + offsetY,
    imageScaleRate);

  // 鼻描画
  offsetX = 30;
  offsetY = 300;
  drawSprite(faceSrcImage1,
    noseSprite,
    partsIndexs[INDEX_PARTS_NOSE],
    baseX + offsetX,
    baseY + offsetY,
    imageScaleRate);

  // 目描画
  offsetX = 30;
  offsetY = 50;
  drawSprite(faceSrcImage1,
    eyeSprite,
    partsIndexs[INDEX_PARTS_EYE],
    baseX + offsetX,
    baseY + offsetY,
    imageScaleRate);

  // 眉描画
  offsetX = 30;
  offsetY = -200;
  drawSprite(faceSrcImage1,
    eyebrowSprite,
    partsIndexs[INDEX_PARTS_EYEBROW],
    baseX + offsetX,
    baseY + offsetY,
    imageScaleRate);
}

// イベントハンドラの登録
function registerPartsSelectButtonClickEventHandler(positive, buttonId, textboxId, partIndex) {
  
  $(buttonId).on("click", () => {
    
    let currentValue = Number($(textboxId).text());
    let setValue = currentValue;
    if (positive) {
      setValue++;
      if (setValue > numOfPartsItems[partIndex]) {
        setValue = 1;
      }
    } else {
      setValue--;
      if (setValue <= 0) {
        setValue = numOfPartsItems[partIndex];
      }
    }
    //console.log(currentValue + "," + setValue);
    $(textboxId).text(setValue);

    // 選択パーツの切り替え
    partsIndexs[partIndex] = setValue - 1;
    // 顔の再描画
    drawFace();
  })
}

// ユーザ情報をlocalstrageへ保存
function saveUsersDataToLS() {
  
  let jsonData = JSON.stringify(userInformationTable);
  localStorage.setItem(ID_APP_DATA_ON_LS, jsonData);
  console.log(jsonData);
}

// ユーザ情報をlocalstrageからロード
function loadUsersDataFromLS() {
  
  if (localStorage.getItem(ID_APP_DATA_ON_LS)) {
    const jsonData = localStorage.getItem(ID_APP_DATA_ON_LS);
    userInformationTable = JSON.parse(jsonData);
    console.log(jsonData);
  }
}

// 登録ボタンクリックイベントハンドラ登録
function userRegistButtonOnclickEventHandler() {

  $("#id_button_user_regist").on("click", () => {
    // GUIからインプット情報の取得
    let userInformation = new UserInformation("", "", 0, 0, 0, 0,);
    userInformation.name = $("#input_name").val();                  // 名前
    userInformation.pw = $("#input_password").val();                // PW
    userInformation.faceEyebrowId = $("#id_textbox_eyebrow").text(); // 眉選択番号
    userInformation.faceEyeId = $("#id_textbox_eye").text();         // 目選択番号
    userInformation.faceNoseId = $("#id_textbox_nose").text();       // 鼻選択番号
    userInformation.faceMouthId = $("#id_textbox_mouth").text();     // 口選択番号
    
    // for DBG
    /* console.log("Name: " + $("#input_name").val());
    console.log("Password: " + userInformation.pw);
    console.log("Eyebrow: " + userInformation.faceEyebrowId);
    console.log("Eye: " + userInformation.faceEyeId);
    console.log("Nose: " + userInformation.faceNoseId);
    console.log("Mouth: " + userInformation.faceMouthId); */

    // 重複チェック & 登録情報追加
    if (userInformationTable != null) {
      let sameNameDataIndex = userInformationTable.findIndex(
        item => item.name == userInformation.name);
      
      if (sameNameDataIndex == -1) {
        // 新規データ追加
        userInformationTable.push(userInformation);
      } else {
        // 名前が既に存在している場合は上書き要否の確認
        userInformationTable[sameNameDataIndex] = userInformation;
      }
    } else {
      userInformationTable.push(userInformation);
    }
    
    // ユーザデータをlocalstrageへ保存
    saveUsersDataToLS();
  })
}

// ウィンドウ初期化処理
function windowInit()
{
  // localstrageからAPPデータロード
  loadUsersDataFromLS();

  drawFace();
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

// 登録済みユーザーの情報
let userInformationTable = [];

// オンロードで描画
window.onload = function () {
  windowInit();
}
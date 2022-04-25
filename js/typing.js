// Import
import { UserInformation } from "../js/userinformation.js";
import { UserInformationTable } from "../js/userinformation.js";
import { SaveUsersDataToLS, LoadUsersDataFromLS } from "../js/userinformation.js";
import { INDEX_PARTS_FACE, INDEX_PARTS_EYEBROW, INDEX_PARTS_EYE, INDEX_PARTS_NOSE, INDEX_PARTS_MOUTH } from "../js/facecreatemodule.js";
import { FaceSprite, EyebrowSprite, EyeSprite, NoseSprite, MouthSprite, PartsIndexs } from "../js/facecreatemodule.js";
import { SetPartsIndexs, DrawFace } from "../js/facecreatemodule.js";

// 画面フレームレート
const FPS = 60;
// ゲームスピード(ms) 60fps
const GAME_SPEED = 1000 / FPS;

// ロードする画像ファイルパス(ユーザ情報画面)
const SPRITE_FACE_IMG = "../img/kaoparts_resize_mini.png";

// ロードする画像ファイルパス(タイピング画面)
const MONSTER_IMG_DOSBAGY = "../img/mh/dosbagy.jpg";// ドスバギィ
const MONSTER_IMG_FULFUL = "../img/mh/fulful.jpg";  // フルフル
const MONSTER_IMG_REUS = "../img/mh/rioreusu.jpg";   // リオレウス
const MONSTER_IMG_TIGA = "../img/mh/tigarex.jpg";   // ティガレックス
const MONSTER_IMG_RAJYAN = "../img/mh/rajyan.jpg";  // ラージャン

// フォントスタイル
const FONT_STYLE = "Meiryo UI 10px sans-serif";
const FONT_STYLE_OUTER = "italic bold 80px sans-serif";

// タイプキーワード一覧
const TypeKeywordList = [
  "they",     //0
  "water",    //1
  "ours",     //2
  "third",    //3
  "queen",    //4
  "summer",   //5
  "other",    //6
  "like",     //7
  "love",     //8
  "cloud",    //9
  "present",  //10
  "spring",   //11
  "turn",     //12
  "dog",      //13
  "question", //14
  "these",    //15
  "tuesday",  //16
  "college",  //17
  "difficult",//18
  "sound",    //19
  "people",   //20
  "show",     //21
  "finish",   //22
  "practice", //23
  "library",  //24
];

// カウントダウンタイマ[sec]
const CountdownTimerSec = 5;

// キャンバス(タイピングエリア)
let user_face_can = document.getElementById("can_user_information");
let user_face_con = user_face_can.getContext("2d");

// キャンバス(タイピングエリア)
let typing_can = document.getElementById("can_typing");
let typing_con = typing_can.getContext("2d");
typing_can.width = 1024;
typing_can.height = 768;

// 画像画像の読み込み(ユーザ情報画面)
let faceSrcImage = new Image();
faceSrcImage.src = SPRITE_FACE_IMG;
let imageScaleRate = 1 / 14.3;
user_face_can.width = FaceSprite[0].w * imageScaleRate + 50;
user_face_can.height = FaceSprite[0].h * imageScaleRate + 50;

// 画像画像の読み込み(タイピング画面)
let monsterImage = new Image();
monsterImage.src = MONSTER_IMG_DOSBAGY;

// キーボードの状態保持
let key = [];
// キーダウン
document.onkeydown = function (e)
{
  key[e.keyCode] = true;
  //console.log("code: " + e.keyCode + "," + key[e.keyCode]);
}
// キーアップ
document.onkeyup = function (e)
{
  key[e.keyCode] = false;
  //console.log("code: " + e.keyCode+ "," + key[e.keyCode]);
}

// アルファベットアレイ(キー入力判定で使用する)
const AlphabetArray = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];
const KEYCODE_START_NUMBER = 65;

// テキスト表示ポジション
const TEXT_DRAW_POS_X = typing_can.width / 2;
const TEXT_DRAW_POS_Y = typing_can.height / 2;
const INPUT_DONE_POS_OFFSET_Y = 100;

// ターゲットキーワード
class TargetKeyword{

  constructor(keyword) {
    // キーワード
    this.keyword = keyword;
    // キーワードを1文字ずつ分割した配列
    this.keywordAlphabets = keyword.split("");
    // キー入力済みカウント
    this.inputCompleteCount = 0;
    // 破壊済み
    this.destroyed = false;
  }

  // ポジション更新
  update() {

    // キー入力チェック
    let targetAlphabetIndex = AlphabetArray.findIndex(item => item === this.keywordAlphabets[this.inputCompleteCount]);
    targetAlphabetIndex += KEYCODE_START_NUMBER;
    if (key[targetAlphabetIndex]){
      // キー入力済
      this.inputCompleteCount++;

      var audio = new Audio();
      //sample.mp3の1.5秒～5.8秒まで再生する
      audio.src = "../audio/Keyboard01.mp3#t=0.0,0.1";
      audio.play();
    }
      
    if (this.inputCompleteCount >= this.keywordAlphabets.length) {
      // 破壊済み
      this.destroyed = true;
    }
  }
  
  // 描画
  draw() {
    // キーワード
    typing_con.font = FONT_STYLE;
    let textWidth = typing_con.measureText( "keyword: " + this.keyword ).width ;
    typing_con.fillText("keyword:" + this.keyword, TEXT_DRAW_POS_X - textWidth / 2, TEXT_DRAW_POS_Y);
    typing_con.font = FONT_STYLE_OUTER;
    typing_con.fillStyle = "rgb(255, 255, 255)"; 
    typing_con.strokeText("keyword:" + this.keyword, TEXT_DRAW_POS_X - textWidth / 2, TEXT_DRAW_POS_Y);
    // 残り入力必要アルファベット
    let subKeyword = this.keyword.substring(this.inputCompleteCount, this.keywordAlphabets.length);
    //console.log(subKeyword + "_" + this.inputCompleteCount + "_" + this.keywordAlphabets.length);
    textWidth = typing_con.measureText(subKeyword).width ;
    typing_con.fillText(subKeyword, TEXT_DRAW_POS_X - textWidth / 2, TEXT_DRAW_POS_Y + INPUT_DONE_POS_OFFSET_Y);
    typing_con.fillStyle = "rgb(255, 255, 255)"; 
    typing_con.strokeText(subKeyword, TEXT_DRAW_POS_X - textWidth / 2, TEXT_DRAW_POS_Y + INPUT_DONE_POS_OFFSET_Y);
  }
}

// 現行ユーザ情報出力
function drawCurrentUserInformation() {

  // 顔描画
  let currentUserData = UserInformationTable[0];
  console.log(currentUserData);
  SetPartsIndexs(currentUserData);
  
  // ユーザ顔画像の描画
  DrawFace(user_face_can, user_face_con, faceSrcImage, imageScaleRate);

  // ユーザ名
  $("#text_user_name").text(currentUserData.name);
  // 最高スコア
  $("#text_highest_score").text(currentUserData.highestScore);

}

// カウントダウンタイマ開始
function startCountdownTimer(textBoxId, timerSec) {
  let now = new Date();
  let goal = new Date();
  let totalSec = Number(timerSec);
  // 終了時刻の計算
  goal.setSeconds(goal.getSeconds() + totalSec);

  // タイマの更新
  function updateTimer() {
    const diff = goal - new Date(); //時間の差を取得（ミリ秒）
    let timerText = "";

    // タイムアップ
    if (diff <= 0) {
      timerText = "0";
      $(textBoxId).text(timerText);
      // タイマー完了時のポップアップ表示
      showPopupForTimerComplete();
    } else {
      timerText = Math.floor(diff / 1000);
      $(textBoxId).text(timerText);
      // 再び指定時刻後に時間をupdateする
      refreshTimer();
    }
  }

  // 500ms周期で関数呼び出し
  function refreshTimer() {
    setTimeout(updateTimer, 1000);
  }

  // 初回タイマ更新呼び出し(初回呼び出し後に定期的に時刻更新が実施される仕組み)
  updateTimer();
}

// ゲームレベル設定
const gameLevelSettings = [
  { scoreThr:3, imgpath:MONSTER_IMG_DOSBAGY,},
  { scoreThr:6, imgpath:MONSTER_IMG_FULFUL, },
  { scoreThr:12,imgpath:MONSTER_IMG_REUS, },
  { scoreThr:24,imgpath:MONSTER_IMG_TIGA, },
  { scoreThr:50,imgpath:MONSTER_IMG_RAJYAN,},
];

// スコア
let gameScore = 0;
// 入力対象キーワード
let target = new TargetKeyword(TypeKeywordList[getRandomValue(0, TypeKeywordList.length - 1)]);
// 初期化処理
function gameInit() {
  
  // localstrageからAPPデータロード
  LoadUsersDataFromLS();

  // 現行ユーザ情報出力
  drawCurrentUserInformation();

  $("#button_L1").val(0);
  $("#button_L2").val(1);
  $("#button_L3").val(2);
  $("#button_L4").val(3);
  $("#button_L5").val(4);

  $("button").on("click", function (e) {
    let idString = e.target.id;
    console.log(idString.indexOf("button_L"));
    if (idString.indexOf("button_L") == -1) {
      return;
    }

    if (e.target.value >= 0 && e.target.value <= 4) {
      monsterImage = new Image();
      monsterImage.src = gameLevelSettings[e.target.value].imgpath;
    }
  });

  // 60fps
  setInterval(gameLoop, GAME_SPEED);

  $("#game_start_button").on("click", () => {

    gameScore = 0;

    // カウントダウンタイマ開始
    startCountdownTimer("#text_time_left", CountdownTimerSec);
  })  
}

// タイマー完了時のポップアップ表示
function showPopupForTimerComplete() {

  var popup = document.getElementById("js-popup");
  if (!popup) { return; }
  popup.classList.add("is-show");

  var blackBg = document.getElementById("js-black-bg");
  var closeBtn = document.getElementById("js-close-btn");

  closePopUp(blackBg);
  closePopUp(closeBtn);

  function closePopUp(elem) {
    if (!elem) { return; }
    elem.addEventListener("click", function() {
      popup.classList.remove("is-show");
    })
  }
}

// 整数のランダムを作成
function getRandomValue(min, max)
{
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// ゲームループ(インターバル間隔でコールされるメソッド定義)
function gameLoop() {
  
  // アップデート
  target.update();

  // 背景画像の描画
  typing_con.drawImage(monsterImage, 0, 0, monsterImage.width, monsterImage.height, 0, 0, 1280, 720);

  if (!target.destroyed) {
    target.draw();
  } else {
    gameScore++;
    let arrayIndex = getRandomValue(0, TypeKeywordList.length - 1);
    target = new TargetKeyword(TypeKeywordList[arrayIndex]);
  }

  $("#text_game_score").text(gameScore);
}

// ウィンドウ初期化処理
function windowInit() {
  
  // 背景画像の描画
  typing_con.drawImage(monsterImage, 0, 0, monsterImage.width, monsterImage.height, 0, 0, 1280, 720);
  // ゲーム初期化
  gameInit();
}

// オンロードで描画
window.onload = function () {
  windowInit();
}
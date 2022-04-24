// 画面フレームレート
const FPS = 60;
// ゲームスピード(ms) 60fps
const GAME_SPEED = 1000 / FPS;

// ロードする画像ファイルパス
const MONSTER_IMG_TIGA = "../img/mh/tigarex.jpg";// ティガレックス
const MONSTER_IMG_JINOUGA = "../img/mh/jinouga.jpg";// ティガレックス

// フォントスタイル
const FONT_STYLE = "Meiryo UI 10px sans-serif";
const FONT_STYLE_OUTER = "italic bold 101px sans-serif";

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

// キャンバス(タイピングエリア)
let typing_can = document.getElementById("can_typing");
let typing_con = typing_can.getContext("2d");
typing_can.width = 1280;
typing_can.height = 720;

// 画像画像の読み込み
let monsterImage = new Image();
monsterImage.src = MONSTER_IMG_JINOUGA;

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
    textWidth = typing_con.measureText(subKeyword).width ;
    typing_con.fillText(subKeyword, TEXT_DRAW_POS_X - textWidth / 2, TEXT_DRAW_POS_Y + INPUT_DONE_POS_OFFSET_Y);
    typing_con.fillStyle = "rgb(255, 255, 255)"; 
    typing_con.strokeText(subKeyword, TEXT_DRAW_POS_X - textWidth / 2, TEXT_DRAW_POS_Y + INPUT_DONE_POS_OFFSET_Y);
  }
}

// 入力対象キーワード
let target = new TargetKeyword(TypeKeywordList[getRandomValue(0, TypeKeywordList.length - 1)]);
// 初期化処理
function gameInit(){
  // 60fps
  setInterval(gameLoop, GAME_SPEED);
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
    let arrayIndex = getRandomValue(0, TypeKeywordList.length - 1);
    target = new TargetKeyword(TypeKeywordList[arrayIndex]);
  }
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
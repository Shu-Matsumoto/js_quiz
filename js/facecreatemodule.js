// 各部位のインデックス
export const INDEX_PARTS_FACE    = 0;// 顔
export const INDEX_PARTS_EYEBROW = 1;// 眉
export const INDEX_PARTS_EYE     = 2;// 目
export const INDEX_PARTS_NOSE    = 3;// 鼻
export const INDEX_PARTS_MOUTH   = 4;// 口

// スプライトクラス
class Sprite
{
  constructor(x, y, w, h){
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
export const FaceSprite = [
  new Sprite(  100,  300, 1540 - 100, 1970 - 300),// 0,
];

// スプライト(眉)
export const  EyebrowSprite = [
  new Sprite(1965, 77, 2641 - 1965, 245 - 77),    // 0,
  new Sprite(2677, 81, 3373 - 2677, 249 - 81),    // 1,
  new Sprite(2037, 297, 2605 - 2037, 537 - 297),  // 2,
  new Sprite(2641, 305, 3417 - 2641, 513 - 305),  // 3,
];

// スプライト(目)
export const  EyeSprite = [
  new Sprite(1737, 749, 2309 - 1737, 1000 - 749),   // 0,
  new Sprite(2389, 737, 2913 - 2389, 973 - 737),    // 1,
  new Sprite(2917, 749, 3493 - 2917, 969 - 749),    // 2,
  new Sprite(1745, 1073, 2337 - 1745, 1281 - 1073), // 3,
  new Sprite(2421, 993, 3077 - 2421, 1297 - 993),   // 4,
  new Sprite(3077, 1041, 3465 - 3077, 1269 -1041),  // 5,
];

// スプライト(鼻)
export const  NoseSprite = [
  new Sprite(2013, 1413, 2197 - 2013, 1713 - 1413), // 0,
  new Sprite(2229, 1433, 2441 - 2229, 1725 - 1433), // 1,
  new Sprite(2457, 1465, 2681 - 2457, 1721 - 1465), // 2,
  new Sprite(2713, 1461, 3101 - 2713, 1781 - 1461), // 3,
  new Sprite(3077, 1441, 3477 - 3077, 1721 - 1441), // 4,
];

// スプライト(口)
export const  MouthSprite = [
  new Sprite(405, 2069, 881 - 405, 2409 - 2069),    // 0,
  new Sprite(845, 2077, 1321 - 845, 2409 - 2077),   // 1,
  new Sprite(1317, 2085, 1749 - 1317, 2417 - 2085), // 2,
  new Sprite(1769, 2041, 2357 - 1769, 2401 - 2041), // 3,
  new Sprite(2401, 2041, 3221 - 2401, 2433 - 2041), // 4,
];

// 各部位において現在選択されているパーツのインデックス
export let PartsIndexs = new Array(0, 0, 0, 0, 0); // 各部位において画面表示されるパーツのインデックス
// 各部位におけるパーツ数
export let NumOfPartsItems = [FaceSprite.length,
  EyebrowSprite.length,
  EyeSprite.length,
  NoseSprite.length,
  MouthSprite.length
];

export function DrawFace(destinationCan, destinationCon, img, scaleRate) {

  // 描画基準位置
  let baseX = (destinationCan.width / scaleRate) / 2;
  let baseY = (destinationCan.height / scaleRate) / 2;
  let offsetX = 0;
  let offsetY = 0;

  console.log(PartsIndexs);

  // 顔描画
  drawSprite(destinationCon,
    img,
    FaceSprite,
    PartsIndexs[INDEX_PARTS_FACE],
    baseX + offsetX,
    baseY + offsetY,
    scaleRate);

  // 口描画
  offsetX = 30;
  offsetY = 590;
  drawSprite(destinationCon,
    img,
    MouthSprite,
    PartsIndexs[INDEX_PARTS_MOUTH],
    baseX + offsetX,
    baseY + offsetY,
    scaleRate);

  // 鼻描画
  offsetX = 30;
  offsetY = 300;
  drawSprite(destinationCon,
    img,
    NoseSprite,
    PartsIndexs[INDEX_PARTS_NOSE],
    baseX + offsetX,
    baseY + offsetY,
    scaleRate);

  // 目描画
  offsetX = 30;
  offsetY = 50;
  drawSprite(destinationCon,
    img,
    EyeSprite,
    PartsIndexs[INDEX_PARTS_EYE],
    baseX + offsetX,
    baseY + offsetY,
    scaleRate);

  // 眉描画
  offsetX = 30;
  offsetY = -200;
  drawSprite(destinationCon,
    img,
    EyebrowSprite,
    PartsIndexs[INDEX_PARTS_EYEBROW],
    baseX + offsetX,
    baseY + offsetY,
    scaleRate);
}

// スプライトを描画する
function drawSprite(content, img, sprite, spriteIndex, x, y, scale)
{
  let sx = sprite[spriteIndex].x * scale;
  let sy = sprite[spriteIndex].y * scale;
  let sw = sprite[spriteIndex].w * scale;
  let sh = sprite[spriteIndex].h * scale;

  let px = x * scale - sw / 2;
  let py = y * scale - sh / 2;

  content.drawImage(img, sx, sy, sw, sh, px, py, sw, sh);
}
const container = document.getElementById('sketch-container');
const w = window.innerWidth;
const h = w * 0.5;

var canvasWidth;
var canvasHeight;

//TEST
let headHeightPercent;
let headHeightRange;
let headHeight;

let headFilepaths;
let headStrings;
let heads;
let headNum;

let bangsFilepaths;
let bangsStrings;
let bangs;
let bangNum;

let backFilepaths;
let backStrings;
let backs;
let backNum;

let eyeFilepaths;
let eyeStrings;
let eyes;
let eyeNum;

let browFilepaths;
let browStrings;
let brows;
let browNum;

let noseFilepaths;
let noseStrings;
let noses;
let noseNum;

let mouthFilepaths;
let mouthStrings;
let mouths;
let mouthNum;

let miscFilepaths;
let miscStrings;
let miscs;
let miscNum;

let neck;
let neckStrings;
let torso;
let torsoStrings;

function setup() {
    canvasWidth = w;
    canvasHeight = h;
    let canvas = createCanvas(w, h);
    canvas.parent('sketch-container');
    rectMode(CENTER);

    headHeightRange = createVector(100, 150);
    headHeightPercent = 1;

    headNum = 2;
    heads = createFaceObjects(headStrings, 0.0, createVector(0.5, 0.5), createVector(0.5, 0.5), false);
    bangNum = 1;
    bangs = createFaceObjects(bangsStrings, 1, createVector(0.5, 0.5), createVector(0.5, 0.5), false);
    backNum = 1;
    backs = createFaceObjects(backStrings, 2, createVector(0.5, 0.5), createVector(0.5, 0.5), false);
    eyeNum = 0;
    eyes = createFaceObjects(eyeStrings, 3, createVector(0.4, 0.4), createVector(0.15, 0.5), true);
    browNum = 0;
    brows = createFaceObjects(browStrings, 4, createVector(0.4, 0.4), createVector(0.15, 0.5), true);

    neck = createFaceObjects(neckStrings, 8, createVector(0.5, 0.5), createVector(0.5, 0.5), false);
    torso = createFaceObjects(torsoStrings, 9, createVector(0.5, 0.5), createVector(0.5, 0.5), false);
    
    //testBack = new FaceObject(testBackString, 2, 2, createVector(1, 1), createVector(0, 0), false);
    //testBack.reloadIMG();
}

function windowResized() {
    const {w, h} = getContainerSize();
    canvasWidth = w;
    canvasHeight = h;
    resizeCanvas(canvasWidth, canvasHeight)
}

function preload() {
    basepath = "assets/svg/";

    headFilepaths = getFilepaths(basepath, "head", 8);
    headStrings = getStrings(headFilepaths);

    bangsFilepaths = getFilepaths(basepath, "bangs", 6);
    bangsStrings = getStrings(bangsFilepaths);

    backFilepaths = getFilepaths(basepath, "back", 7);
    backStrings = getStrings(backFilepaths);

    eyeFilepaths = getFilepaths(basepath, "eye", 9);
    eyeStrings = getStrings(eyeFilepaths);

    browFilepaths = getFilepaths(basepath, "brow", 5);
    browStrings = getStrings(browFilepaths);

    neckStrings = [loadStrings("assets/svg/neck.svg")];
    torsoStrings = [loadStrings("assets/svg/torso.svg")];
}

function draw() {
    background(255);
    //testBack.show(0, 0, 1);

    headHeight = lerp(headHeightRange.x, headHeightRange.y, headHeightPercent);

    if (!(backNum < 0)) {
        backs[backNum].show(int(w/2), headHeight + 35, 0.7);
    }

    torso[0].show(int(w/2), headHeightRange.y + 115, 0.5);
    neck[0].show(int(w/2), headHeightRange.y + 50, 0.6);
    
    if (!(headNum < 0)) {
        heads[headNum].show(int(w/2), headHeight, 1);
    }

    if (!(eyeNum < 0)) {
        eyes[eyeNum].show(int(w/2), headHeight + 20, 0.3);
    }

    if (!(bangNum < 0)) {
        bangs[bangNum].show(int(w/2), headHeight - 40, 1);
    }

    if (!(browNum < 0)) {
        brows[browNum].show(int(w/2), headHeight - 20, 0.15);
    }

    for (let i = 0; i < backs.length; i++) {
        
    }
}

function getFilepaths(basepath, basefile, amount) {
    var filepathList = [amount];
    for (let i = 0; i < amount; i++) {
        filepathList[i] = basepath + basefile + String(i + 1) + ".svg"
    }
    return filepathList;
}

function getStrings(filepaths) {
    var stringList = [filepaths.length];
    for (let i = 0; i < filepaths.length; i++) {
        stringList[i] = loadStrings(filepaths[i]);
    }
    return stringList;
}

function createFaceObjects(stringLists, type, defaultScale, defaultOffset, mirrored) {
    var faceObjectList = [stringLists.length];
    for (let i = 0; i < stringLists.length; i++) {
        faceObjectList[i] = new FaceObject(stringLists[i], type, i + 1, defaultScale, defaultOffset, mirrored);
        faceObjectList[i].reloadIMG();
    }
    return faceObjectList;
}

function nudgeHeadHeight(amount) {
    headHeightPercent += amount;
    headHeightPercent = constrain(headHeightPercent, 0, 1);
}

function setColor(objectList, id) {
    let inputElement = document.getElementById(id);
    let hexValue = inputElement.value;
    for (let i = 0; i < objectList.length; i++) {
        objectList[i].color = hexValue;
        objectList[i].reloadIMG();
    }
}

function nudgeFaceObject(objectList, amountX, amountY) {
    for (let i = 0; i < objectList.length; i++) {
        objectList[i].offsetX += amountX;
        objectList[i].offsetY += amountY;
        objectList[i].offsetX = constrain(objectList[i].offsetX, 0.0, 1.0);
        objectList[i].offsetY = constrain(objectList[i].offsetY, 0.0, 1.0);
    }
}

function scaleFaceObject(objectList, amountX, amountY) {
    for (let i = 0; i < objectList.length; i++) {
        objectList[i].scaleX += amountX;
        objectList[i].scaleY += amountY;
        objectList[i].scaleX = constrain(objectList[i].scaleX, 0.0, 1.0);
        objectList[i].scaleY = constrain(objectList[i].scaleY, 0.0, 1.0);
    }
}

function rotateFaceObject(objectList, amount) {
    for (let i = 0; i < objectList.length; i++) {
        objectList[i].rotation += amount;
    }
}

class FaceObject {
    constructor(SVGString, type, number, defaultScale, defaultOffset, mirrored) {
        this.TRANSLATE_RANGE = createVector(-50, 50);
        this.SCALE_RANGE = createVector(0.1, 2.5);
        
        this.SVGString = SVGString;
        this.type = type;
        this.number = number;
        this.mirrored = mirrored;

        this.defaultScale = defaultScale;
        this.scaleX = defaultScale.x;
        this.scaleY = defaultScale.y;
        this.defaultOffset = defaultOffset;
        this.offsetX = defaultOffset.x;
        this.offsetY = defaultOffset.y;
        this.rotation = 0;
        this.colorToReplace = "#f0f";
        this.color = "#ff0000";

        this.SVGString = this.SVGString.join('\n');
        this.img;
    }

    reloadIMG() {
        this.SVGString = this.SVGString.replaceAll(this.colorToReplace, this.color);
        this.colorToReplace = this.color;
        this.img = loadImage("data:image/svg+xml;base64," + btoa(this.SVGString));
    }

    show(x, y, scaleFactor) {
        if (!this.img) {
            return;
        }

        let partX = lerp(this.TRANSLATE_RANGE.x, this.TRANSLATE_RANGE.y, this.offsetX);
        let partY = lerp(this.TRANSLATE_RANGE.x, this.TRANSLATE_RANGE.y, this.offsetY);

        let partW = this.img.width * lerp(this.SCALE_RANGE.x, this.SCALE_RANGE.y, this.scaleX) * scaleFactor;
        let partH = this.img.height * lerp(this.SCALE_RANGE.x, this.SCALE_RANGE.y, this.scaleY) * scaleFactor;

        if (this.mirrored) {
            push();
            translate(partX + x, partY + y);
            rotate(this.rotation);
            imageMode(CENTER);
            image(this.img, 0, 0, partW, partH);
            pop();
            push();
            translate(x, y);
            scale(-1, 1);
            translate(partX, partY);
            rotate(this.rotation);
            imageMode(CENTER);
            image(this.img, 0, 0, partW, partH);
            pop();

        } else {
            push();

            translate(x + partX, y + partY);

            angleMode(DEGREES);
            rotate(this.rotation);

            imageMode(CENTER);

            image(this.img, 0, 0, partW, partH);
            pop();
        }
    }


}
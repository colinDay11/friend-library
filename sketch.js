const container = document.getElementById('sketch-container');
const w = 350;
const h = 350;

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

    headHeightRange = createVector(175, 215);
    headHeightPercent = 1;

    headNum = 0;
    heads = createFaceObjects(headStrings, 0.0, createVector(0.5, 0.5), createVector(0.5, 0.5), false, createVector(-50, 50));
    bangNum = 0;
    bangs = createFaceObjects(bangsStrings, 1, createVector(0.5, 0.5), createVector(0.5, 0.5), false, createVector(-50, 50));
    backNum = -1;
    backs = createFaceObjects(backStrings, 2, createVector(0.5, 0.5), createVector(0.5, 0.5), false, createVector(-50, 50));
    eyeNum = 2;
    eyes = createFaceObjects(eyeStrings, 3, createVector(0.4, 0.4), createVector(0.4, 0.5), true, createVector(-100, 50));
    browNum = 4;
    brows = createFaceObjects(browStrings, 4, createVector(0.4, 0.4), createVector(0.4, 0.5), true, createVector(-100, 50));
    noseNum = 0;
    noses = createFaceObjects(noseStrings, 5, createVector(0.5, 0.5), createVector(0.5, 0.5), false, createVector(-50, 50));
    mouthNum = 3;
    mouths = createFaceObjects(mouthStrings, 6, createVector(0.5, 0.5), createVector(0.5, 0.5), false, createVector(-50, 50));
    miscNum = -1;
    miscs = createFaceObjects(miscStrings, 7, createVector(0.5, 0.5), createVector(0.5, 0.5), false, createVector(-150, 100));

    neck = createFaceObjects(neckStrings, 8, createVector(0.5, 0.5), createVector(0.5, 0.5), false, createVector(-50, 50));
    torso = createFaceObjects(torsoStrings, 9, createVector(0.5, 0.5), createVector(0.5, 0.5), false, createVector(-50, 50));
    
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

    noseFilepaths = getFilepaths(basepath, "nose", 7);
    noseStrings = getStrings(noseFilepaths);

    mouthFilepaths = getFilepaths(basepath, "mouth", 9);
    mouthStrings = getStrings(mouthFilepaths);

    miscFilepaths = getFilepaths(basepath, "misc", 6);
    miscStrings = getStrings(miscFilepaths);

    neckStrings = [loadStrings("assets/svg/neck.svg")];
    torsoStrings = [loadStrings("assets/svg/torso.svg")];
}

function draw() {
    background(100);
    //testBack.show(0, 0, 1);

    headHeight = lerp(headHeightRange.x, headHeightRange.y, headHeightPercent);

    if (!(backNum < 0)) {
        backs[backNum].show(int(w/2), headHeight + 60, 0.6);
    }

    torso[0].show(int(w/2), headHeightRange.y + 115, 0.6);
    //pop()
    neck[0].show(int(w/2), headHeightRange.y +60, 0.6);
    
    if (!(headNum < 0)) {
        heads[headNum].show(int(w/2), headHeight, 0.6);
    }

    if (!(eyeNum < 0)) {
        eyes[eyeNum].show(int(w/2), headHeight + 50, 0.6);
    }

    if (!(miscNum < 0)) {
        miscs[miscNum].show(int(w/2) + 25, headHeight + 65, 0.6);
    }

    if (!(bangNum < 0)) {
        bangs[bangNum].show(int(w/2), headHeight - 40, 0.6);
    }

    if (!(browNum < 0)) {
        brows[browNum].show(int(w/2), headHeight + 10, 0.6);
    }

    if (!(noseNum < 0)) {
        noses[noseNum].show(int(w/2), headHeight + 45, 0.6);
    }

    if (!(mouthNum < 0)) {
        mouths[mouthNum].show(int(w/2), headHeight + 75, 0.6);
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

function createFaceObjects(stringLists, type, defaultScale, defaultOffset, mirrored, translateRange) {
    var faceObjectList = [stringLists.length];
    for (let i = 0; i < stringLists.length; i++) {
        faceObjectList[i] = new FaceObject(stringLists[i], type, i + 1, defaultScale, defaultOffset, mirrored, translateRange);
        faceObjectList[i].reloadIMG();
    }
    return faceObjectList;
}

function nudgeHeadHeight(amount) {
    headHeightPercent += amount;
    headHeightPercent = constrain(headHeightPercent, 0, 1);
}

function isValidHex(str) {
    // This Regex checks:
    // ^#?   -> Starts with an optional hash
    // [0-9a-f] -> Contains only numbers or a-f
    // {3}|{6} -> Must be exactly 3 or 6 characters long
    const hexRegex = /^#?([0-9a-f]{3}|[0-9a-f]{6})$/i; 
    return hexRegex.test(str);
}

function setColor(objectList, id, idHex) {
    let colorPickerElement = document.getElementById(id);
    finalValue = colorPickerElement.value;

    if (idHex) {
        let colorTextElement = document.getElementById(idHex);

        if (colorTextElement) {
            let textValue = colorTextElement.value.trim();

            if (isValidHex(textValue)) {
                if (!textValue.startsWith("#")) {
                    textValue = "#" + textValue;
                }
                finalValue = textValue;
            }
        }
    }

    for (let i = 0; i < objectList.length; i++) {
        objectList[i].color = finalValue;
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

function changeHead(amount){
    headNum = changeFaceObject(heads, headNum, amount, false);
}

function changeBangs(amount){
    bangNum = changeFaceObject(bangs, bangNum, amount, true);
}

function changeBack(amount){
    backNum = changeFaceObject(backs, backNum, amount, true);
}

function changeEyes(amount){
    eyeNum = changeFaceObject(eyes, eyeNum, amount, true);
}

function changeBrows(amount){
    browNum = changeFaceObject(brows, browNum, amount, true);
}

function changeNose(amount){
    noseNum = changeFaceObject(noses, noseNum, amount, true);
}

function changeMouth(amount){
    mouthNum = changeFaceObject(mouths, mouthNum, amount, true);
}

function changeMisc(amount){
    miscNum = changeFaceObject(miscs, miscNum, amount, true);
}

function changeFaceObject(objectList, objectNum, amount, allowDelete) {
    objectNum += amount;
    if (allowDelete) {
        if (objectNum < -1) {
            objectNum = objectList.length - 1;
        }
        if (objectNum > objectList.length - 1) {
            objectNum = -1;
        }
    } else {
        if (objectNum < 0) {
            objectNum = objectList.length - 1;
        }
        if (objectNum > objectList.length - 1) {
            objectNum = 0;
        }
    }
    return objectNum;
}

class FaceObject {
    constructor(SVGString, type, number, defaultScale, defaultOffset, mirrored, translateRange) {
        //this.TRANSLATE_RANGE = createVector(-50, 50);
        this.translateRange = translateRange;
        this.SCALE_RANGE = createVector(0.1, 2.5);

        this.SVGString = SVGString;
        this.SVGString = SVGString.join('\n');

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
        this.color = "#ffffff";

        this.img = null;

        let viewBoxRegex = /viewBox=["']\s*([\d\.-]+)\s+([\d\.-]+)\s+([\d\.-]+)\s+([\d\.-]+)\s*["']/;
        let match = this.SVGString.match(viewBoxRegex);

        //Note to self: refind source of this piece of code
        if (match) {
            this.nativeW = parseFloat(match[3]);
            this.nativeH = parseFloat(match[4]);
        } else {
            this.nativeW = 500; 
            this.nativeH = 500;
        }
    }

    reloadIMG() {
        this.SVGString = this.SVGString.replaceAll(this.colorToReplace, this.color);
        this.colorToReplace = this.color;

        if (!this.SVGString.includes('width=')) {
            this.SVGString = this.SVGString.replace('<svg ', `<svg width="${this.nativeW}" height="${this.nativeH}" `);
        }
        
        this.img = loadImage("data:image/svg+xml;utf8," + encodeURIComponent(this.SVGString));
    }

    show(x, y, scaleFactor) {
        if (!this.img) {
            return;
        }

        let partX = lerp(this.translateRange.x, this.translateRange.y, this.offsetX);
        let partY = lerp(this.translateRange.x, this.translateRange.y, this.offsetY);

        let partW = this.nativeW * lerp(this.SCALE_RANGE.x, this.SCALE_RANGE.y, this.scaleX) * scaleFactor;
        let partH = this.nativeH * lerp(this.SCALE_RANGE.x, this.SCALE_RANGE.y, this.scaleY) * scaleFactor;

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
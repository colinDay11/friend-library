const container = document.getElementById('sketch-container');
const w = 350;
const h = 350;

var canvasWidth;
var canvasHeight;

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
let miscs1;
let misc1Num;
let miscs2;
let misc2Num;

let neck;
let neckStrings;
let torso;
let torsoStrings;

let friendName;
let birthday;
let friendCode;

function setup() {
    canvasWidth = w;
    canvasHeight = h;
    let canvas = createCanvas(w, h);
    canvas.parent('sketch-container');
    rectMode(CENTER);

    headHeightRange = createVector(175, 215);
    headHeightPercent = 1;

    friendName = "..."
    birthday = "01012000";

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
    misc1Num = -1;
    miscs1 = createFaceObjects(miscStrings, 7, createVector(0.5, 0.5), createVector(0.5, 0.5), false, createVector(-150, 100));
    misc2Num = -1;
    miscs2 = createFaceObjects(miscStrings, 7, createVector(0.5, 0.5), createVector(0.5, 0.5), false, createVector(-150, 100));


    neck = createFaceObjects(neckStrings, 8, createVector(0.5, 0.5), createVector(0.5, 0.5), false, createVector(-50, 50));
    torso = createFaceObjects(torsoStrings, 9, createVector(0.5, 0.5), createVector(0.5, 0.5), false, createVector(-50, 50));
    
    friendCode = createCode();
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

    bangsFilepaths = getFilepaths(basepath, "bangs", 10);
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

    miscFilepaths = getFilepaths(basepath, "misc", 15);
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

    if (!(misc2Num < 0)) {
        miscs2[misc2Num].show(int(w/2) + 25, headHeight + 65, 0.6);
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

    if (!(misc1Num < 0)) {
        miscs1[misc1Num].show(int(w/2) + 25, headHeight + 65, 0.6);
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
    friendCode = createCode();
}

function isValidHex(str) {
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

    friendCode = createCode();
}

function nudgeFaceObject(objectList, amountX, amountY) {
    for (let i = 0; i < objectList.length; i++) {
        objectList[i].offsetX += amountX;
        objectList[i].offsetY += amountY;
        objectList[i].offsetX = constrain(objectList[i].offsetX, 0.0, 1.0);
        objectList[i].offsetY = constrain(objectList[i].offsetY, 0.0, 1.0);
    }
    friendCode = createCode();
}

function scaleFaceObject(objectList, amountX, amountY) {
    for (let i = 0; i < objectList.length; i++) {
        objectList[i].scaleX += amountX;
        objectList[i].scaleY += amountY;
        objectList[i].scaleX = constrain(objectList[i].scaleX, 0.0, 1.0);
        objectList[i].scaleY = constrain(objectList[i].scaleY, 0.0, 1.0);
    }
    friendCode = createCode();
}

function rotateFaceObject(objectList, amount) {
    for (let i = 0; i < objectList.length; i++) {
        objectList[i].rotation += amount;
    }
    friendCode = createCode();
}

function changeHead(amount){
    headNum = changeFaceObject(heads, headNum, amount, false);
    friendCode = createCode();
}

function changeBangs(amount){
    bangNum = changeFaceObject(bangs, bangNum, amount, true);
    friendCode = createCode();
}

function changeBack(amount){
    backNum = changeFaceObject(backs, backNum, amount, true);
    friendCode = createCode();
}

function changeEyes(amount){
    eyeNum = changeFaceObject(eyes, eyeNum, amount, true);
    friendCode = createCode();
}

function changeBrows(amount){
    browNum = changeFaceObject(brows, browNum, amount, true);
    friendCode = createCode();
}

function changeNose(amount){
    noseNum = changeFaceObject(noses, noseNum, amount, true);
    friendCode = createCode();
}

function changeMouth(amount){
    mouthNum = changeFaceObject(mouths, mouthNum, amount, true);
    friendCode = createCode();
}

function changeMisc1(amount){
    misc1Num = changeFaceObject(miscs1, misc1Num, amount, true);
    friendCode = createCode();
}

function changeMisc2(amount){
    misc2Num = changeFaceObject(miscs2, misc2Num, amount, true);
    friendCode = createCode();
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

function updateInfo(){
    let nameInput = document.getElementById("NameInput");
    let monthDayInput = document.getElementById("MonthDayInput");
    let yearInput = document.getElementById("YearInput");
    if (!nameInput.value || !monthDayInput.value || !yearInput.value) {
        return;
    }
    if (nameInput.value.length > 0) {
        friendName = nameInput.value;
    }
    if (monthDayInput.value.length == 4 && yearInput.value.length == 4) {
        birthday = monthDayInput.value + yearInput.value;
    }
}

function createCode() {
    updateInfo();

    var codeString = "";
    //Version
    codeString += "1";    
    //Name
    codeString += "|" + friendName;
    //Birthday
    codeString += "|" + birthday;
    //Head
    codeString += "|" + String(headNum) + "-" + String(heads[0].color) + "-" + String(headHeight);
    //Bangs
    codeString += "|" + String(bangNum) + "-" + String(bangs[0].color) + "-" + String(bangs[0].scaleX) + "-" + String(bangs[0].scaleY) + "-" + String(bangs[0].offsetX) + "-" + String(bangs[0].offsetY);
    //Back
    codeString += "|" + String(backNum) + "-" + String(backs[0].color) + "-" + String(backs[0].scaleX) + "-" + String(backs[0].scaleY) + "-" + String(backs[0].offsetX) + "-" + String(backs[0].offsetY);
    //Eyes
    codeString += "|" + String(eyeNum) + "-" + String(eyes[0].color) + "-" + String(eyes[0].scaleX) + "-" + String(eyes[0].scaleY) + "-" + String(eyes[0].offsetX) + "-" + String(eyes[0].offsetY) + "-" + String(eyes[0].rotation);
    //Brows
    codeString += "|" + String(browNum) + "-" + String(brows[0].scaleX) + "-" + String(brows[0].scaleY) + "-" + String(brows[0].offsetX) + "-" + String(brows[0].offsetY) + "-" + String(brows[0].rotation);
    //Nose
    codeString += "|" + String(noseNum) + "-" + String(noses[0].scaleX) + "-" + String(noses[0].scaleY) + "-" + String(noses[0].offsetX) + "-" + String(noses[0].offsetY) + "-" + String(noses[0].rotation);
    //Mouth
    codeString += "|" + String(mouthNum) + "-" + String(mouths[0].color) + "-" + String(mouths[0].scaleX) + "-" + String(mouths[0].scaleY) + "-" + String(mouths[0].offsetX) + "-" + String(mouths[0].offsetY) + "-" + String(mouths[0].rotation);
    //Misc.1
    codeString += "|" + String(misc1Num) + "-" + String(miscs1[0].color) + "-" + String(miscs1[0].scaleX) + "-" + String(miscs1[0].scaleY) + "-" + String(miscs1[0].offsetX) + "-" + String(miscs1[0].offsetY) + "-" + String(miscs1[0].rotation);
    //Misc.2
    codeString += "|" + String(misc2Num) + "-" + String(miscs2[0].color) + "-" + String(miscs2[0].scaleX) + "-" + String(miscs2[0].scaleY) + "-" + String(miscs2[0].offsetX) + "-" + String(miscs2[0].offsetY) + "-" + String(miscs2[0].rotation);
    //Body
    codeString += "|" + String(torso[0].color);
    codeString += "|" + String(neck[0].color);
    document.getElementById("friendCode").innerHTML = codeString;
    return codeString;
}

function uploadCode(codeID) {
    const codeElement = document.getElementById(codeID);
    if (!codeElement || !codeElement.value){
        alert("Invalid Code");
        return;
    }
    console.debug("code:" + codeElement.value);
    if (codeElement && codeElement.value) {
        applyCode(codeElement.value);
    }
}

function applyCode(newCode) {
    const myCode = newCode.split("|");
    friendName = myCode[1];
    birthday = myCode[2];
    const mdString = birthday.slice(0,4);
    const yString = birthday.slice(4,8);
    document.getElementById("NameInput").value = friendName;
    document.getElementById("MonthDayInput").value = mdString;
    document.getElementById("YearInput").value = yString;

    
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

        //Note to self: refine source of this piece of code
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
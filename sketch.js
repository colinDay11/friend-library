const container = document.getElementById('sketch-container');
const w = 350;
const h = 350;

var canvasWidth;
var canvasHeight;

let headFilepaths;
let headStrings;

let bangsFilepaths;
let bangsStrings;

let backFilepaths;
let backStrings;

let eyeFilepaths;
let eyeStrings;

let browFilepaths;
let browStrings;

let noseFilepaths;
let noseStrings;

let mouthFilepaths;
let mouthStrings;

let miscFilepaths;
let miscStrings;

let neckStrings;
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

    myFriend = new Friend();
    myFriendRenderer = new FriendRenderer(myFriend, [350, 350], [
        createFaceObjects(backStrings, 2, false, createVector(myFriend.partStates["back"].transMin, myFriend.partStates["back"].transMax)),
        createFaceObjects(torsoStrings, 9, false, createVector(myFriend.partStates["torso"].transMin, myFriend.partStates["torso"].transMax)),
        createFaceObjects(neckStrings, 8, false, createVector(myFriend.partStates["neck"].transMin, myFriend.partStates["neck"].transMax)),
        createFaceObjects(headStrings, 0.0, false, createVector(myFriend.partStates["head"].transMin, myFriend.partStates["head"].transMax)),
        createFaceObjects(eyeStrings, 3, true, createVector(myFriend.partStates["eye"].transMin, myFriend.partStates["back"].transMax)),
        createFaceObjects(miscStrings, 7, false, createVector(myFriend.partStates["misc1"].transMin, myFriend.partStates["back"].transMax)),
        createFaceObjects(bangsStrings, 1, false, createVector(myFriend.partStates["bang"].transMin, myFriend.partStates["back"].transMax)),
        createFaceObjects(browStrings, 4, true, createVector(myFriend.partStates["brow"].transMin, myFriend.partStates["back"].transMax)),
        createFaceObjects(mouthStrings, 6, false, createVector(myFriend.partStates["mouth"].transMin, myFriend.partStates["back"].transMax)),
        createFaceObjects(noseStrings, 5, false, createVector(myFriend.partStates["nose"].transMin, myFriend.partStates["back"].transMax)),
        createFaceObjects(miscStrings, 7, false, createVector(myFriend.partStates["misc2"].transMin, myFriend.partStates["back"].transMax))
    ]);
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
    background(50);
    myFriendRenderer.show();
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

function createFaceObjects(stringLists, type, mirrored, translateRange) {
    var faceObjectList = [stringLists.length];
    for (let i = 0; i < stringLists.length; i++) {
        faceObjectList[i] = new FaceObject(stringLists[i], type, i + 1, mirrored, translateRange);
        faceObjectList[i].reloadIMG();
    }
    return faceObjectList;
}

function nudgeHeadHeight(amount) {
    myFriend.headHeight += amount;
    myFriend.headHeight = constrain(myFriend.headHeight, 0, 1);
    friendCode = createCode();
}

function isValidHex(str) {
    const hexRegex = /^#?([0-9a-f]{3}|[0-9a-f]{6})$/i; 
    return hexRegex.test(str);
}

function setColor(part, id, idHex) {
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

    myFriend.partStates[part].color = finalValue;
    myFriendRenderer.reloadParts();
}

function nudgeFaceObject(part, amountX, amountY) {
    myFriend.partStates[part].positionX += amountX;
    myFriend.partStates[part].positionY += amountY;
    myFriend.partStates[part].positionX = constrain(myFriend.partStates[part].positionX, 0.0, 1.0);
    myFriend.partStates[part].positionY = constrain(myFriend.partStates[part].positionY, 0.0, 1.0);
    myFriendRenderer.reloadPartsSoft();
}

function scaleFaceObject(part, amountX, amountY) {
    myFriend.partStates[part].scaleX += amountX;
    myFriend.partStates[part].scaleY += amountY;
    myFriend.partStates[part].scaleX = constrain(myFriend.partStates[part].scaleX, 0.0, 1.0);
    myFriend.partStates[part].scaleY = constrain(myFriend.partStates[part].scaleY, 0.0, 1.0);
    myFriendRenderer.reloadPartsSoft();
}

function rotateFaceObject(part, amount) {
    myFriend.partStates[part].rotationDegrees += amount;
    myFriendRenderer.reloadPartsSoft();
}

function changePart(part, amount) {
    myFriend.partStates[part].index += amount;
    partCount = myFriend.partStates[part].partCount;
    if (myFriend.partStates[part].allowDelete) {
        if (myFriend.partStates[part].index < -1) {
            myFriend.partStates[part].index = partCount - 1;
        }
        if (myFriend.partStates[part].index > partCount - 1) {
            myFriend.partStates[part].index = -1;
        }
    } else {
        if (myFriend.partStates[part].index < 0) {
            myFriend.partStates[part].index = partCount - 1;
        }
        if (myFriend.partStates[part].index > partCount - 1) {
            myFriend.partStates[part].index = 0;
        }
    }
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
    return;

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

function saveImage() {
    saveCanvas(myFriend.name + ".png");
    describe('A picture of a friend created with Friend Library');
}

class Friend {
    constructor() {
        this.HEAD_HEIGHT_RANGE = createVector(0.5, 0.6);

        this.name = "Friend";
        this.birthMonthDay = "0101";
        this.birthYear = "2000";
        this.headHeight = 0.75;

        this.partStates = {
            "head": {index: 0, color: "#ffffff", scaleX: 0.5, scaleY: 0.5, positionX: 0.5, positionY: 0.5, rotationDegrees: 0, mirrored: false, transMin: -50, transMax: 50, dOffsetX: 0, dOffsetY: 0, allowDelete: false, partCount: 8},
            "bang": {index: 0, color: "#ffffff", scaleX: 0.5, scaleY: 0.5, positionX: 0.5, positionY: 0.5, rotationDegrees: 0, mirrored: false, transMin: -50, transMax: 50, dOffsetX: 0, dOffsetY: -0.11, allowDelete: true, partCount: 10},
            "back": {index: -1, color: "#ffffff", scaleX: 0.5, scaleY: 0.5, positionX: 0.5, positionY: 0.5, rotationDegrees: 0, mirrored: false, transMin: -50, transMax: 50, dOffsetX: 0, dOffsetY: 0.17, allowDelete: true, partCount: 7},
            "eye": {index: 2, color: "#000000", scaleX: 0.4, scaleY: 0.4, positionX: 0.4, positionY: 0.5, rotationDegrees: 0, mirrored: true, transMin: -100, transMax: 50, dOffsetX: 0, dOffsetY: 0.14, allowDelete: true, partCount: 9},
            "brow": {index: 4, color: "#ffffff", scaleX: 0.4, scaleY: 0.4, positionX: 0.4, positionY: 0.5, rotationDegrees: 0, mirrored: true, transMin: -100, transMax: 50, dOffsetX: 0, dOffsetY: 0.03, allowDelete: true, partCount: 5},
            "nose": {index: 0, color: "#ffffff", scaleX: 0.5, scaleY: 0.5, positionX: 0.5, positionY: 0.5, rotationDegrees: 0, mirrored: false, transMin: -50, transMax: 50, dOffsetX: 0, dOffsetY: 0.13, allowDelete: true, partCount: 7},
            "mouth": {index: 3, color: "#ffffff", scaleX: 0.5, scaleY: 0.5, positionX: 0.5, positionY: 0.5, rotationDegrees: 0, mirrored: false, transMin: -50, transMax: 50, dOffsetX: 0, dOffsetY: 0.2, allowDelete: true, partCount: 9},
            "misc1": {index: -1, color: "#ffffff", scaleX: 0.5, scaleY: 0.5, positionX: 0.5, positionY: 0.5, rotationDegrees: 0, mirrored: false, transMin: -150, transMax: 50, dOffsetX: 0.14, dOffsetY: 0.19, allowDelete: true, partCount: 15},
            "misc2": {index: -1, color: "#ffffff", scaleX: 0.5, scaleY: 0.5, positionX: 0.5, positionY: 0.5, rotationDegrees: 0, mirrored: false, transMin: -150, transMax: 50, dOffsetX: 0.14, dOffsetY: 0.19, allowDelete: true, partCount: 15},
            "neck": {index: 0, color: "#e8eaf6", scaleX: 0.5, scaleY: 0.5, positionX: 0.5, positionY: 0.5, rotationDegrees: 0, mirrored: false, transMin: 0, transMax: 0, dOffsetX: 0, dOffsetY: 0.17, allowDelete: false, partCount: 1},
            "torso": {index: 0, color: "#ff0000", scaleX: 0.5, scaleY: 0.5, positionX: 0.5, positionY: 0.5, rotationDegrees: 0, mirrored: false, transMin: 0, transMax: 0, dOffsetX: 0, dOffsetY: 0.33, allowDelete: false, partCount: 1}
        };

        this.friendCode = "";
    }

}

class FriendRenderer {
    constructor(friend, canvasSize, faceObjects) {
        this.friend = friend;
        this.headHeightRange = this.friend.HEAD_HEIGHT_RANGE;
        this.canvasSize = createVector(canvasSize[0], canvasSize[1]);
        this.faceObjects = faceObjects;
        this.partStatesArray = [this.friend.partStates["back"], this.friend.partStates["torso"], 
                                this.friend.partStates["neck"], this.friend.partStates["head"], 
                                this.friend.partStates["eye"], this.friend.partStates["misc2"], 
                                this.friend.partStates["bang"], this.friend.partStates["brow"], 
                                this.friend.partStates["mouth"], this.friend.partStates["nose"], 
                                this.friend.partStates["misc1"]];
        this.scale = 0.6;
        this.reloadParts();
        this.reloadPartsSoft();
    }

    reloadParts(){
        for (let partType = 0; partType < this.faceObjects.length; partType++) {
            for (let part = 0; part < this.faceObjects[partType].length; part++) {
                this.faceObjects[partType][part].color = this.partStatesArray[partType].color;
                this.faceObjects[partType][part].reloadIMG();
            }
        }
    }

    reloadPartsSoft() {
        for (let partType = 0; partType < this.faceObjects.length; partType++) {
            for (let part = 0; part < this.faceObjects[partType].length; part++) {
            this.faceObjects[partType][part].offsetX = this.partStatesArray[partType].positionX;
            this.faceObjects[partType][part].offsetY = this.partStatesArray[partType].positionY;
            this.faceObjects[partType][part].scaleX = this.partStatesArray[partType].scaleX;
            this.faceObjects[partType][part].scaleY = this.partStatesArray[partType].scaleY;
            this.faceObjects[partType][part].rotation = this.partStatesArray[partType].rotationDegrees;
            }
        }
    }

    show() {
    clear();
    // back, torso, neck, head, eyes, misc2, bangs, brows, mouth, nose, misc1
    for (let i = 0; i < this.faceObjects.length; i++) {
        let headHeight = lerp(this.headHeightRange.x, this.headHeightRange.y, this.friend.headHeight);

        // No floating body
        if ((i == 1 || i == 2)) {
            headHeight = this.headHeightRange.y;
        }

        let partNum = this.partStatesArray[i].index;
        if (this.faceObjects[i] && this.faceObjects[i][partNum]) {
            this.faceObjects[i][partNum].show(int(width/2 + (width * this.partStatesArray[i].dOffsetX)), (headHeight + this.partStatesArray[i].dOffsetY) * int(width), this.scale);
        }
    }
    }
}

class FaceObject {
    constructor(SVGString, type, number, mirrored, translateRange) {
        //this.TRANSLATE_RANGE = createVector(-50, 50);
        this.translateRange = translateRange;
        this.SCALE_RANGE = createVector(0.1, 2.5);

        this.SVGString = SVGString;
        this.SVGString = SVGString.join('\n');

        this.type = type;
        this.number = number;
        this.mirrored = mirrored;

        this.scaleX = 0.5;
        this.scaleY = 0.5;
        this.offsetX = 0.5;
        this.offsetY = 0.5;
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
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

const BASE_DESIGN_SIZE = 350;

function setup() {
    canvasWidth = w;
    canvasHeight = h;
    let s = calculateCanvasSize();
    let canvas = createCanvas(s, s);
    canvas.parent('sketch-container');
    rectMode(CENTER);

    myFriend = new Friend();
    myFriendRenderer = new CreatorRenderer(myFriend, [s, s], [
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

function calculateCanvasSize() {
    let minDimension = min(windowWidth, windowHeight);
    
    let marginPercent = 0.8;
    let size = minDimension * marginPercent;
    
    let maxSize = 600;
    size = min(size, maxSize); 
    
    return size;
}

function windowResized() {
    let s = calculateCanvasSize();
    canvasWidth = s;
    canvasHeight = s;
    resizeCanvas(canvasWidth, canvasHeight);
}

function preload() {
    loadAssets();
}

function draw() {
    clear();
    myFriendRenderer.show([width, height]);
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
    myFriendRenderer.myFriendRenderer.reloadParts();
}

function nudgeFaceObject(part, amountX, amountY) {
    myFriend.partStates[part].positionX += amountX;
    myFriend.partStates[part].positionY += amountY;
    myFriend.partStates[part].positionX = constrain(myFriend.partStates[part].positionX, 0.0, 1.0);
    myFriend.partStates[part].positionY = constrain(myFriend.partStates[part].positionY, 0.0, 1.0);
    myFriendRenderer.myFriendRenderer.reloadPartsSoft();
}

function scaleFaceObject(part, amountX, amountY) {
    myFriend.partStates[part].scaleX += amountX;
    myFriend.partStates[part].scaleY += amountY;
    myFriend.partStates[part].scaleX = constrain(myFriend.partStates[part].scaleX, 0.0, 1.0);
    myFriend.partStates[part].scaleY = constrain(myFriend.partStates[part].scaleY, 0.0, 1.0);
    myFriendRenderer.myFriendRenderer.reloadPartsSoft();
}

function rotateFaceObject(part, amount) {
    myFriend.partStates[part].rotationDegrees += amount;
    myFriendRenderer.myFriendRenderer.reloadPartsSoft();
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

    if (nameInput && nameInput.value.length > 0) {
        myFriend.name = nameInput.value;
    }
    if (monthDayInput && yearInput && monthDayInput.value.length == 4 && yearInput.value.length == 4) {
        myFriend.birthMonthDay = monthDayInput.value;
        myFriend.birthYear = yearInput.value;
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
    myFriendRenderer.overrideBackground = true;
    myFriendRenderer.show([width, height]);
    saveCanvas(myFriend.name + ".png");
    describe('A picture of a friend created with Friend Library');
}


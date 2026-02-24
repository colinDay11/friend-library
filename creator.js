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
    myFriendRenderer = new FriendRenderer(myFriend, [s, s], [
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
    clear();
    myFriendRenderer.show([width, height]);
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

    if (nameInput && nameInput.value.length > 0) {
        myFriend.name = nameInput.value;
    }
    if (monthDayInput && yearInput && monthDayInput.value.length == 4 && yearInput.value.length == 4) {
        myFriend.birthMonthDay = monthDayInput.value;
        myFriend.birthYear = yearInput.value;
    }
}

function generateCode() {
    updateInfo();
    document.getElementById("friendCode").innerHTML = myFriend.generateCode();
    return;
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

function copyCode(friendSpan) {
    var copySpan = document.getElementById(friendSpan);
    const copyText = copySpan.innerText
    navigator.clipboard.writeText(copyText)
        .then(() => {
            alert("Copied: " + copyText);
        })
        .catch(err => {
            alert("Could not copy code, please select by hand");
        });

}

function applyCode(newCode) {
    myFriend.loadCode(newCode);
    myFriendRenderer.reloadParts();
    myFriendRenderer.reloadPartsSoft();
    const myCode = newCode.split("|");
    friendName = myCode[1];
    birthday = myCode[2];
    const mdString = birthday.slice(0,4);
    const yString = birthday.slice(4,8);
    document.getElementById("NameInput").value = friendName;
    document.getElementById("MonthDayInput").value = mdString;
    document.getElementById("YearInput").value = yString;
    return;

    
}

function saveImage() {
    myFriendRenderer.overrideBackground = true;
    myFriendRenderer.show([width,height]);
    saveCanvas(myFriend.name + ".png");
    describe('A picture of a friend created with Friend Library');
}


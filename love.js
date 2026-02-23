const container = document.getElementById('friendRenderer');
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

let overallCompatability = 50;
let zodiacCompatability = 75;
let numerologyCompatability = 25;
let ageCompatability = 100;

function setup() {
    let s = calculateCanvasSize();
    let friend1Canvas = createCanvas(s * 2, s);
    friend1Canvas.parent('friendRenderer');
    rectMode(CENTER);

    friend1 = new Friend();
    friend1.loadCode("V1|Friend 1|01012000|2d|0a|#ffffff|1o1o1o1o0a|0a|#ffffff|1o1o1o1o0a|09|#ffffff|1o1o1o1o0a|0c|#000000|1e1e1e1e0a|0e|#ffffff|1e1e1e1o0a|0a|#ffffff|1o1o1y1o0a|0d|#ffffff|1o1o1o1o0a|09|#ffffff|1o1o1o1o0a|09|#ffffff|1o1o1o1o0a|0a|#e8eaf6|1o1o1o1o0a|0a|#ff0000|1o1o1o1o0a|");
    friend1Renderer = new FriendRenderer(friend1, [s, s], [
        createFaceObjects(backStrings, 2, false, createVector(friend1.partStates["back"].transMin, friend1.partStates["back"].transMax)),
        createFaceObjects(torsoStrings, 9, false, createVector(friend1.partStates["torso"].transMin, friend1.partStates["torso"].transMax)),
        createFaceObjects(neckStrings, 8, false, createVector(friend1.partStates["neck"].transMin, friend1.partStates["neck"].transMax)),
        createFaceObjects(headStrings, 0.0, false, createVector(friend1.partStates["head"].transMin, friend1.partStates["head"].transMax)),
        createFaceObjects(eyeStrings, 3, true, createVector(friend1.partStates["eye"].transMin, friend1.partStates["back"].transMax)),
        createFaceObjects(miscStrings, 7, false, createVector(friend1.partStates["misc1"].transMin, friend1.partStates["back"].transMax)),
        createFaceObjects(bangsStrings, 1, false, createVector(friend1.partStates["bang"].transMin, friend1.partStates["back"].transMax)),
        createFaceObjects(browStrings, 4, true, createVector(friend1.partStates["brow"].transMin, friend1.partStates["back"].transMax)),
        createFaceObjects(mouthStrings, 6, false, createVector(friend1.partStates["mouth"].transMin, friend1.partStates["back"].transMax)),
        createFaceObjects(noseStrings, 5, false, createVector(friend1.partStates["nose"].transMin, friend1.partStates["back"].transMax)),
        createFaceObjects(miscStrings, 7, false, createVector(friend1.partStates["misc2"].transMin, friend1.partStates["back"].transMax))
    ]);

    friend2 = new Friend();
    friend2.loadCode("V1|Friend 2|01012000|2d|0a|#ffffff|1o1o1o1o0a|0d|#ffffff|1o1o1o1o0a|0e|#ffffff|1o1o1o1o0a|0c|#000000|1e1e1e1e0a|0a|#ffffff|1e1e1e1o0a|0a|#ffffff|1o1o1y1o0a|0d|#ffffff|1o1o1o1o0a|09|#ffffff|1o1o1o1o0a|09|#ffffff|1o1o1o1o0a|0a|#e8eaf6|1o1o1o1o0a|0a|#ff0000|1o1o1o1o0a|");
    friend2Renderer = new FriendRenderer(friend2, [s, s], [
        createFaceObjects(backStrings, 2, false, createVector(friend2.partStates["back"].transMin, friend2.partStates["back"].transMax)),
        createFaceObjects(torsoStrings, 9, false, createVector(friend2.partStates["torso"].transMin, friend2.partStates["torso"].transMax)),
        createFaceObjects(neckStrings, 8, false, createVector(friend2.partStates["neck"].transMin, friend2.partStates["neck"].transMax)),
        createFaceObjects(headStrings, 0.0, false, createVector(friend2.partStates["head"].transMin, friend2.partStates["head"].transMax)),
        createFaceObjects(eyeStrings, 3, true, createVector(friend2.partStates["eye"].transMin, friend2.partStates["back"].transMax)),
        createFaceObjects(miscStrings, 7, false, createVector(friend2.partStates["misc1"].transMin, friend2.partStates["back"].transMax)),
        createFaceObjects(bangsStrings, 1, false, createVector(friend2.partStates["bang"].transMin, friend2.partStates["back"].transMax)),
        createFaceObjects(browStrings, 4, true, createVector(friend2.partStates["brow"].transMin, friend2.partStates["back"].transMax)),
        createFaceObjects(mouthStrings, 6, false, createVector(friend2.partStates["mouth"].transMin, friend2.partStates["back"].transMax)),
        createFaceObjects(noseStrings, 5, false, createVector(friend2.partStates["nose"].transMin, friend2.partStates["back"].transMax)),
        createFaceObjects(miscStrings, 7, false, createVector(friend2.partStates["misc2"].transMin, friend2.partStates["back"].transMax))
    ]);

    checkCompatability();
}

function calculateCanvasSize() {
    let maxAvailableWidth = windowWidth / 2;
    let minDimension = min(maxAvailableWidth, windowHeight);
    
    let marginPercent = 0.8;
    let size = minDimension * marginPercent;
    
    let maxSize = 400;
    size = min(size, maxSize); 
    
    return size;
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

    
    zodiacTable = loadTable("assets/data/zodiac.csv", "csv", "header");
    numerologyTable = loadTable("assets/data/numbers.csv", "csv", "header");
}

function draw() {
    clear();
    let halfWidth = width / 2;

    friend1Renderer.overrideBackground = true;
    friend2Renderer.overrideBackground = true;

    push();
    friend1Renderer.show([halfWidth, height]);

    translate(halfWidth, 0); 
    friend2Renderer.show([halfWidth, height]);    
    pop();
}

function windowResized() {
    let s = calculateCanvasSize();
    resizeCanvas(s * 2, s);
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

function friendLoad(codeID, friend) {
    const codeElement = document.getElementById(codeID);
    if (!codeElement || !codeElement.value){
        alert("Invalid Code");
        return;
    }
    console.debug("code:" + codeElement.value);
    if (!(codeElement && codeElement.value)) {
        return;
    }

    let codeString = codeElement.value.trim();

    if (friend == 1) {
        friend1.loadCode(codeString);
        friend1Renderer.reloadParts();
        friend1Renderer.reloadPartsSoft();
        return;
    } else {
        friend2.loadCode(codeString);
        friend2Renderer.reloadParts();
        friend2Renderer.reloadPartsSoft();
        checkCompatability()
        return;
    }
}

function getZodiac(mmdd) {
    let date = int(mmdd);
    
    for (let i = 0; i < zodiacTable.getRowCount(); i++) {
        let start = int(zodiacTable.getString(i, 'Start'));
        let end = int(zodiacTable.getString(i, 'End'));
        let name = zodiacTable.getString(i, 'Zodiac');

        // Wrap Logic
        if (start > end) { 
            if (date >= start || date <= end) return name;
        } else {
            if (date >= start && date <= end) return name;
        }
    }
    return "Aries";
}

function getZodiacCompatability(sign1, sign2) {
    let row = zodiacTable.findRow(sign1, 'Zodiac');
    let score = row.getString(sign2);   
    return float(score);
}

function getNumberCompatability(friend1DD, friend2DD){
    let friend1Digit2 = friend1DD.toString().substring(1,2);
    let friend2Digit2 = friend2DD.toString().substring(1,2);
    console.log(friend2Digit2);
    let row = numerologyTable.findRow(friend1Digit2, 'Numbers');
    let score = row.getString(friend2Digit2);
    return float(score);
}

function checkCompatability() {
    let friend1MMDD = friend1.birthMonthDay;
    let friend1Day = friend1.birthMonthDay.substring(2,4);
    let friend1Year = friend1.birthYear;
    let friend2MMDD = friend2.birthMonthDay;
    let friend2Day = friend2.birthMonthDay.substring(2,4);
    let friend2Year = friend2.birthYear;

    let friend1Zodiac = getZodiac(friend1MMDD);
    let friend2Zodiac = getZodiac(friend2MMDD);
    zodiacCompatability = getZodiacCompatability(friend1Zodiac, friend2Zodiac);
    numerologyCompatability = getNumberCompatability(friend1Day, friend2Day);
    ageCompatability = 32 - (friend1Year - friend2Year);
    overallCompatability = zodiacCompatability + numerologyCompatability + ageCompatability;

    updateBars();
}

function updateBars() {
    let friend1Label = document.getElementById("friend1Label");
    friend1Label.innerHTML = friend1.name;
    let friend2Label = document.getElementById("friend2Label");
    friend2Label.innerHTML = friend2.name;

    var overallElem = document.getElementById("overallProgress");
    var overallTextElem = document.getElementById("overallNum");
    var zodiacElem = document.getElementById("zodiacProgress");
    var zodiacTextElem = document.getElementById("zodiacNum");
    var numerologyElem = document.getElementById("numerologyProgress");
    var numerologyTextElem = document.getElementById("numerologyNum");
    var ageElem = document.getElementById("ageGapProgress");
    var ageTextElem = document.getElementById("ageGapNum");

    overallElem.style.width = Math.round(overallCompatability) + "%";
    overallTextElem.innerHTML = Math.round(overallCompatability) + "%";
    let factor34 = 2.94117647059;
    zodiacElem.style.width = (zodiacCompatability * factor34) + "%";
    zodiacTextElem.innerHTML = Math.round((zodiacCompatability * factor34)) + "%";
    numerologyElem.style.width = Math.round((numerologyCompatability * factor34)) + "%";
    numerologyTextElem.innerHTML = Math.round((numerologyCompatability * factor34)) + "%";
    ageElem.style.width = Math.round((ageCompatability * 3.125)) + "%";
    ageTextElem.innerHTML = Math.round((ageCompatability * 3.125)) + "%";
}
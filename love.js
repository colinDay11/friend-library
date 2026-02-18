const container = document.getElementById("sketch-container");

function setup() {
    canvasWidth = 1;
    canvasHeight = 1;
    let s = calculateCanvasSize();
    let canvas = createCanvas(s, s);
    canvas.parent('sketch-container');
    rectMode(CENTER);

    friend1 = new Friend();
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
}

function draw() {
    background(255, 0, 0);
    friend1Renderer.show([width, height]);
    friend2Renderer.show([width, height]);
}

function preload() {
    loadAssets();
}


function windowResized() {
    let s = calculateCanvasSize();
    canvasWidth = s;
    canvasHeight = s;
    resizeCanvas(canvasWidth, canvasHeight);
}

function calculateCanvasSize() {
    let minDimension = min(windowWidth, windowHeight);
    
    let marginPercent = 0.4;
    let size = minDimension * marginPercent;

    let maxSize = 200;
    size = min(size, maxSize); 
    
    return size;
}
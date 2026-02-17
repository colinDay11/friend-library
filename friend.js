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
            "eye": {index: 2, color: "#000000", scaleX: 0.4, scaleY: 0.4, positionX: 0.4, positionY: 0.4, rotationDegrees: 0, mirrored: true, transMin: -120, transMax: 10, dOffsetX: 0, dOffsetY: 0.14, allowDelete: true, partCount: 9},
            "brow": {index: 4, color: "#ffffff", scaleX: 0.4, scaleY: 0.4, positionX: 0.4, positionY: 0.5, rotationDegrees: 0, mirrored: true, transMin: -120, transMax: 10, dOffsetX: 0, dOffsetY: 0.03, allowDelete: true, partCount: 5},
            "nose": {index: 0, color: "#ffffff", scaleX: 0.5, scaleY: 0.5, positionX: 0.6, positionY: 0.5, rotationDegrees: 0, mirrored: false, transMin: -50, transMax: 50, dOffsetX: 0, dOffsetY: 0.13, allowDelete: true, partCount: 7},
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
        this.MIN_BG_COLOR = color(205);
        this.MAX_BG_COLOR = color(245);
        this.bgPercent = 0;
        this.bgSpeed = 1;
        this.backgroundColor = this.MIN_BG_COLOR;
        this.overrideBackground = false;

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
        this.scale = canvasSize[0]/583;
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
        updateInfo();
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
        updateInfo();
    }

    show() {
    clear();

    //Change BG Color
    angleMode(DEGREES);
    this.bgPercent += this.bgSpeed;
    
    let easeVal = map(sin(this.bgPercent), -1, 1, 0, 1)
    this.backgroundColor = lerpColor(this.MIN_BG_COLOR, this.MAX_BG_COLOR, easeVal);
    
    
    if (this.overrideBackground) {
        background(0, 0, 0, 0);
    } else {
        background(this.backgroundColor);
    }

    this.scale = width/583;

    push();
    // back, torso, neck, head, eyes, misc2, bangs, brows, mouth, nose, misc1
    for (let i = 0; i < this.faceObjects.length; i++) {
        let headHeight = lerp(this.headHeightRange.x, this.headHeightRange.y, this.friend.headHeight);

        // No floating body
        if ((i == 1 || i == 2)) {
            headHeight = this.headHeightRange.y;
        }

        let partNum = this.partStatesArray[i].index;
        if (this.faceObjects[i] && this.faceObjects[i][partNum]) {
            this.faceObjects[i][partNum].show(
                int(width/2 + (width * this.partStatesArray[i].dOffsetX)), 
                (headHeight + this.partStatesArray[i].dOffsetY) * int(width), 
                this.scale);
        }
    }
    this.overrideBackground = false;
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

        //Note to self: find source of this piece of code
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

        let partX = lerp(this.translateRange.x, this.translateRange.y, this.offsetX) * scaleFactor;
        let partY = lerp(this.translateRange.x, this.translateRange.y, this.offsetY) * scaleFactor;

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
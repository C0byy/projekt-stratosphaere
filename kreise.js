let canvas = document.getElementById("canvas");
let background = document.getElementById("background");
let box1 = document.getElementById("box");
let boxes = document.getElementById("boxes"); 
console.log(box1);
let svgStr = `<img src="wetterballonbild.png" width="512px" height="512px">
</img>`;
let steering = {
    a: false,
    s: false,
    d: false,
    w: false,
}

let distance = 0.66;

// global vars ^

// functions

function createElementFromHTML(htmlString) {
    let div = document.createElement('div');
    div.innerHTML = htmlString.trim();
  
    // Change this to div.childNodes to support multiple top-level nodes.
    return div.firstChild;
}

function styleCircle(obj, color, height, width, x, y) {
    obj.style.backgroundColor = color;
    obj.style.height = height + 'px';
    obj.style.width = width + 'px';
    obj.style.borderRadius = '50%';
}

function setPos(obj, x, y) {
    obj.style.position ='absolute';
    obj.style.left = x +'px';
    obj.style.top = y + 'px';
}

function movePlayer(obj) {
    if (steering['w']) 
        {obj.style.top = parseFloat(obj.style.top) - distance + '%';
            if(parseFloat(obj.style.top) < 0)
                {
                    obj.style.top = "0%";
                }

            console.log("st: " + obj.style.top);
        }
    if (steering['a']) {obj.style.left = parseFloat(obj.style.left) - distance + '%';
        console.log("st: " + obj.style.left);
        if(parseFloat(obj.style.left) < -8)
        {
            obj.style.left = "-8%";
        }

    }
    if (steering['s']) {obj.style.top = (parseFloat(obj.style.top) + distance) + '%';
        if(parseFloat(obj.style.top) > 30)
            {
                obj.style.top = "30%";
            }
    }
    if (steering['d']) {obj.style.left = (parseFloat(obj.style.left) + distance) + '%';
        if(parseFloat(obj.style.left) > 75)
            {
               obj.style.left = "75%";
            }
            console.log("d: " + obj.style.left
            );
    }
}
function adjwidheigwetba()
{
    let newval = Math.min((window.innerHeight * window.innerWidth ) / 1500, 512);
    console.log("nv: " + newval);
    wetterbal.height = newval;
    wetterbal.width = newval;
}
function adjustheightbar(heightbar)
{
    let heightbarrn = -parseFloat(background.style.bottom)*12 + 5000;
    console.log(heightbarrn);
    heightbar.innerHTML = "Höhe: " + heightbarrn + " km";

}

let heightbar = createElementFromHTML("<div id='heightbar' style='position: absolute; right: 5px; color: black;'> </div>");
canvas.append(heightbar);
console.log(heightbar);
let back = false;
let wetaj = true;
let gesch = 0;
let boson = false;
let goto = document.getElementById("geh");
goto.addEventListener('click', (ev) => {
    window.scrollTo({
        top: document.body.scrollHeight,
        left: 0,
        behavior: "smooth",
      });
})
let wetterbal = createElementFromHTML(svgStr);
canvas.append(wetterbal);
console.log(background);
background.style.bottom = '0';
console.log(window.innerWidth);
setPos(wetterbal, window.innerWidth/2 - wetterbal.width/2,window.innerHeight/2 - wetterbal.height/2);

function step() {
    adjustheightbar(heightbar);
    if (!boson) {
        if (!back) {
        if (parseFloat(background.style.bottom) > (-5000 + window.innerHeight + gesch))
            {
                let newbgtop = parseFloat(background.style.bottom) - gesch;
                background.style.bottom = newbgtop + "px";
            } else {
                background.style.bottom = -5000 + window.innerHeight + 1 + "px";
            }
        }
            if (back) {
                if (parseFloat(background.style.bottom) < (0 + gesch))
                {
                    let newbgtop = parseFloat(background.style.bottom) - gesch;
                    background.style.bottom = newbgtop + "px";
                } else {
                    wetaj=true;
                    background.style.bottom = 0 + "px";
                }
            }
        }
    

    movePlayer(wetterbal);
    if(wetaj)
    {
    adjwidheigwetba();
    }
    setPos(wetterbal, window.innerWidth/2 - wetterbal.width/2,window.innerHeight/2 -  wetterbal.height/2);
    setTimeout(() => {
        step();
    }, 1000/60);
}

window.addEventListener('keydown', (key) => {
    if (steering[key.key] !== undefined) {
        steering[key.key] = true;
    }}
);

window.addEventListener('keyup', (key) => {
    if (steering[key.key] !== undefined) {
        steering[key.key] = false;
    }}
);
/*
box1.addEventListener('mouseenter', (ev) => {
    box1.style.backgroundColor = "red";
    box1.append(createElementFromHTML(`
        <div>Das hier ist ein Wetterballon.</div>
        `));
        boson = true;;
})

box1.addEventListener('mouseleave', (ev) => {
    boson = false;
    let count = 0;
    for(child of box1.children) {
        if(count >= 1)
        {
        box1.removeChild(child);
        }
        count++;
    }
    box1.style.backgroundColor = "white";
})
*/

step();




class questionbutton
{
    text;
    x;
    y;
    boxes;
    constructor(text, x, y, boxes, color)
    {
        this.boxes = boxes;
        this.text = text;
        this.x = x;
        this.y = y;
        let object = createElementFromHTML('<div class="btnq" style="border-radius: 50%; top: ' + x + '%;  left: ' + y  +'%;height: 100px; width: 100px;background-color: white; position: absolute;"></div>');
        console.log(object);
        boxes.append(object);
        object.append(createElementFromHTML('<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M10.125 8.875C10.125 7.83947 10.9645 7 12 7C13.0355 7 13.875 7.83947 13.875 8.875C13.875 9.56245 13.505 10.1635 12.9534 10.4899C12.478 10.7711 12 11.1977 12 11.75V13" stroke="#1C274C" stroke-width="1.5" stroke-linecap="round"></path> <circle cx="12" cy="16" r="1" fill="#1C274C"></circle> <path d="M7 3.33782C8.47087 2.48697 10.1786 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 10.1786 2.48697 8.47087 3.33782 7" stroke="#1C274C" stroke-width="1.5" stroke-linecap="round"></path> </g></svg>'))
        object.addEventListener('mouseenter', (ev) => {
            object.style.backgroundColor = "yellow";
            object.append(createElementFromHTML("<div  style='height: 100px; width: 300px; color:" + color + ";'>" + text + "</div>"));
                boson = true;
            if(x==17)
            {
            }
        })

        
        object.addEventListener('mouseleave', (ev) => {
            boson = false;
            let count = 0;

            for(object.child of object.children) {
                if(count >= 1)
                {
                object.removeChild(object.child);
                }
                count++;
            }
            object.style.backgroundColor = "white";
        })
    }
    
}

class pop
{
    bg;
    constructor(bg, yp, xp)
    {
        this.bg = bg;
        let obj = createElementFromHTML('<img src="explosion.png" class="btn" style="top: ' + yp + '%;  left: ' + xp  +'%;height: 150px; width: 150px; position: absolute;"></img>')
        bg.append(obj);
        obj.addEventListener('click', (ev) => {
            wetaj = false;
            wetterbal.width = 30;
            gesch = -20;
            back = true;
        })
    }
}

class start
{
    bg;
    constructor(bg, yp, xp)
    {
        this.bg = bg;
        let obj2 = createElementFromHTML('<img src="run.png" class="btn" style="top: ' + yp + '%;  left: ' + xp  +'%;height: 150px; width: 150px; position: absolute;"></img>')
        bg.append(obj2);
        console.log(obj2);
        obj2.addEventListener('click', (ev) => {
            gesch = 3;
            back = false;
            wetaj=true;
        })
    }
}
console.log(boxes);
let but4 = new questionbutton("Der Nationale Wetterdienst in Lincon lässt zweimal täglich einen Wetterballon steigen... Aber was wohin fliegt dieser eigentlich?", 92, 5, background, "white");
let but2 = new questionbutton("Wir betreten die Troposphäre. In ihr spielen sich mit dem Wetter verbundene Ereignisse wie z.B. Wolkenbildung ab. Außerdem umfasst die Troposphäre 80% der Masse der gesamten Atmosphäre!", 85, 5, background, "black");
let but1 = new questionbutton("Brrrr! Hier bei der Tropopause, die in ca. 15 km Höhe liegende Grenze der Troposphäre, kommt es zu Temperaturen von bis zu minus 80 Grad Celsius. ", 74.2, 5, background, "black");
let but3 = new questionbutton("Mit zunehmender Höhe wird es immer kälter. Pro 1 km nimmt die Temperatur um ca. 6.5 Grad Celsius ab.", 80, 5, background, "black");
let but5 = new questionbutton("Weiter geht's. Hier beginnt die Stratosphäre.", 70, 5, background, "black");
let but6 = new questionbutton("In rund 20-45 km Höhe befindet sich die Ozonschicht. Diese absorbiert bestimmte UV-Strahlung und wandelt sie in Wärme um. ", 55.6, 5, background, "black");
let but7 = new questionbutton("Durch die bei der Absorption entstehende Wärme steigt die Temperatur von -80 Grad Celsius auf 0 Grad Celsius an.", 43, 5, background, "white");
let but8 = new questionbutton("Unter bestimmten Bedingungen bilden sich manchmal bunte polare Stratosphärenwolken.", 32, 5, background, "white");
let but9 = new questionbutton("Wetterballons können Flughöhen von bis zu 40 km erreichen. Hier ist der Umgebungsdruck so hoch, dass sich das im Ballon befindlichen Helium aussdehnt und der Ballon platzt! ", 16.5, 5, background, "white");
let but10 = new questionbutton("In einer Höhe von ca. 50 km bildet die Stratopause die atmosphärische Grenzschicht zwischen Stratosphäre und Mesosphäre. ", 11, 5, background, "white");
let pop1 = new pop(background, 0.5, 2);
let r1 = new start(background, 96, 3);

// im html:
/*
 <div id="boxes" style="height: 100%; width: 100%; position: relative;">
                <div id="box" style="border-radius: 50%; top: 80%; left: 5%;height: 100px; width: 100px;background-color: white; position: absolute;">
                    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M10.125 8.875C10.125 7.83947 10.9645 7 12 7C13.0355 7 13.875 7.83947 13.875 8.875C13.875 9.56245 13.505 10.1635 12.9534 10.4899C12.478 10.7711 12 11.1977 12 11.75V13" stroke="#1C274C" stroke-width="1.5" stroke-linecap="round"></path> <circle cx="12" cy="16" r="1" fill="#1C274C"></circle> <path d="M7 3.33782C8.47087 2.48697 10.1786 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 10.1786 2.48697 8.47087 3.33782 7" stroke="#1C274C" stroke-width="1.5" stroke-linecap="round"></path> </g></svg>
                </div>


                background-color: rgb(66, 58, 213);
    background: linear-gradient(210deg, rgba(2,0,36,1) 0%, rgba(9,86,121,1) 50%, rgba(0,212,255,1) 100%); 
                */
/*

            window.scrollTo({
                top: document.body.scrollHeight,
                left: 0,
                behavior: "smooth",
              });
              */

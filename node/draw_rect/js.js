var R = Raphael("draw", 640, 480);

var selected,x,y,toolMode,// is a string signifying the mouse mode
    c = $("draw").getFirst(),noShortcut = false;
    attrs = {"fill":"#48e", "stroke":"#111"},
    textAttr = {"font-size":"14px"},
    imgAttr = {src:"http://www.wowace.com/thumbman/avatars/6/707/300x300/600px-718smiley.svg.png.-m0.png"};
var textToolArea = new Element("textarea", { styles:{
    "position":"absolute",
    "display":"none",
    "border":"#000 dashed 1px"
}});
/**
 * hides the textarea used to write in a text element after applying the text
 */
function hideTextToolArea(){
    console.log(textToolArea.get("value"));
    if(typeOf(selected)!=="null" && selected.type==="text") {
        selected.attr("text", textToolArea.get("value"));
        console.log(selected.attr("text"));
        selected = null;
    }
    textToolArea.set({"value":"", styles:{"display":"none"}});
    noShortcut=false;
}
textToolArea.addEvents({
    "keydown": function (eve){
        if (eve.key === "enter"){
            hideTextToolArea();
        }},
    "blur": hideTextToolArea
});
textToolArea.inject($("draw"));

//tool bar
function selectMode(selectedTool){
    toolMode = selectedTool;
    console.log("selected "+ toolMode+" tool");
    if(typeOf(selected)!=="null" && selected.data("ft") && toolMode!=="select" ) { selected.data("ft").hideHandles(); }
    var tool = $$(".tool[toolType="+toolMode+"]")[0];
    tool.getParent(".tools").getElements(".selected").removeClass("selected");
    tool.addClass("selected");
}
$$(".tools").addEvent("click:relay(.tool)",function() {
    selectMode(this.get("toolType"));
});
function keyCommand(eve){
    if(!noShortcut){ //ment to disable keycomands temporarely
        switch(eve.key){
            case "v":
                selectMode("select");
                break;
            case "r":
                selectMode("rect");
                break;
            case "c":
                selectMode("circle");
                break;
            case "e":
                selectMode("ellipse");
                break;
            case "t":
                selectMode("text");
            case "i":
                selectMode("image");
            case "p":
                //TODO selectMode("path");
            default:break;
        }
        if(typeOf(selected)!=="null"){
            switch(eve.key){
                case "delete": case "backspace":
                    eve.stop();
                    console.log("deleted element");
                    selected.data("ft").unplug();
                    selected.remove();
                    selected = null;
                    break;
                default: break;
            }
        }
    }
}
window.addEvent("keyup", keyCommand);
/**
 * this method toggles the raphaeltransform handels associated with the selected element(s)
 */
function toggleTrasform(){
    var el = this;
    if(el.data("ft") && toolMode==="select") {
        if(typeOf(selected)!=="null" && selected.data("ft")) { selected.data("ft").hideHandles(); }
        selected = el;
        selected.data("ft").showHandles();
    }
}

function execute(eve) {
    var name = eve.target.nodeName, el;
    
    switch (toolMode){
        case "text":
            hideTextToolArea(); //no break is intentional
        case "rect": case "image": case "circle": case "ellipse"://paper.clear();
            if(typeOf(selected)!=="null" && selected.data("ft")) {selected.data("ft").hideHandles();}
        
            x = (eve.page.x - c.getParent().getPosition().x),
            y = (eve.page.y - c.getParent().getPosition().y);
            
            window.fireEvent("draw.start", {"x":x,"y":y});
            break;
        case "select":
        default:
            if(eve.target.nodeName==="svg"||eve.target.nodeName==="DIV"){
                if(selected && selected.data("ft")) {selected.data("ft").hideHandles();}
                
                //window.fireEvent("draw.start", {"x":x,"y":y});
            } else {
                /*el = R.getElementByPoint(eve.page.x,eve.page.y);
                if(el.data("ft")) {
                    selected.data("ft").hideHandles();
                    selected = el;
                    selected.data("ft").showHandles();
                }
                */
            }
            break;
    }
}
c.addEvent("mousedown", execute);
window.addEvent("draw.start", drawStart);

function drawStart(o) {
    var el,select, bound =  R.rect(o.x, o.y, 0, 0).attr({
            stroke: "#000",
            opacity: 0.6
       });
    switch(toolMode) {
        case "rect": el = R.rect(o.x,o.y,0,0); break;
        case "ellipse": el= R.ellipse(o.x,o.x,0,0); break;
        case "circle": el=R.circle(o.x,o.y,0); break;
        case "text"    : el=R.text(0,0,"").attr(textAttr); bound.attr("stroke-dasharray","--"); break;
        case "image": el = R.image(imgAttr.src, o.x,o.y, 0,0); break;
        case "path":
                //TODO selectMode("path");
        case "select": 
        default:
            select=true;
            break;
    }
    el.attr(attrs);
    var drawFire = function (eve) {
        
        var nx = eve.page.x - c.getParent().getPosition().x,
            ny = eve.page.y - c.getParent().getPosition().y,
            space = (eve.key==="space"),
            fixed = (eve.shift || toolMode==="circle"),
            dx = (nx-o.x),
            dy = (ny-o.y),
            x = ((dx>=0)?o.x:nx),
            y = ((dy>=0)?o.y:ny),
            w = ((dx>=0)?dx:(o.x-nx)),
            h = (fixed)?w:((dy>=0)?dy:(o.y-ny)),
            cx = x+(w/2),
            cy = y+(h/2)
            ;
            
        window.fireEvent("draw.drag", {
            "bound":bound,
            "el":(select)?R.set():el,
            "x":x,
            "y":y,"width":w,"height":h,
            "cx":cx,"cy":cy,
            "fixed": fixed,
            "space": space,
            "alt": (eve.alt)
        });
   },
   drawEnd = function (eve) {
        c.removeEvent("mousemove", drawFire);
        c.removeEvent("mouseup", drawEnd);
        document.onselectstart = function() {return true;};
        window.fireEvent("draw.stop", {
            "canvas": c,
            "el": el,
            "bound":bound
        });
    };
    // needed to stop text drag in chrome from http://stackoverflow.com/questions/6388284/click-and-drag-cursor-in-chrome
    document.onselectstart = function() {return false;};
    c.addEvent("mousemove", drawFire);
    c.addEvent("mouseup", drawEnd);
    
    window.addEvent("draw.drag", drawDrag);
}

function drawDrag(o) {
    var el = o.el,
    attrs = {
        x: (o.alt)?(o.x-o.width/2):o.x,
        y: (o.alt)?(o.y-o.height/2):o.y,
        width: o.width,
        height: o.height
    };
    o.bound.attr(attrs);
    switch(toolMode) {
        case "rect": case "image": el.attr(attrs); break;
        case "ellipse": el.attr({
            cx:(o.alt)?o.x:o.cx,
            cy:(o.alt)?o.y:o.cy,
            rx:(o.width/2),
            ry:(o.height/2)
        }); break;
        case "circle":  el.attr({
            cx:(o.alt)?o.x:o.cx,
            cy:(o.alt)?o.y:o.cy,
            r:(o.height<o.width)?(o.height/2):(o.width/2)
        }); break;
        case "text":
            //el.attr({x:attrs.x, y:attrs.y});
            break;
        case "select":
        default:
            //TODO selectmultiple
            break;
    }
    //console.log(o);
    
    
   
}
window.addEvent("draw.stop", drawStop);
function drawStop(o){
    var el= o.el, at = o.bound.attr(), ft;
    
    if(at.width === 0 || at.height === 0) {
        el.remove();
        console.log("removed");
    } else {
        el.attr({
            opacity:1
        });
        var ft = R.freeTransform(el);
        
        el.data("ft", ft);
        ft.hideHandles();
        el.click(toggleTrasform);
        
        if(el.type === "text" ){
            textToolArea.setStyles({
                    "top":at.y,
                    "left":at.x,
                    "width":at.width,
                    "height":at.height,
                    "display":"block"
                });
            ft.attrs.translate.x = at.x;
            ft.attrs.translate.y = at.y;
            selected = el.translate(at.x,at.y);
            noShortcut=true;
        }
    }
    o.bound.remove();
}
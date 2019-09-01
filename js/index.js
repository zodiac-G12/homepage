const sleep = (n) => new Promise(resolve => setTimeout(resolve, n));
const colorMap = {
    "home":"midnightblue",
    "blog":"crimson",
    "contact":"chocolate",
    "belong":"seagreen"
};
var now;

function nowMainPosition() {
    return document.getElementsByTagName("main")[0].getBoundingClientRect().top;
}

function preScroll() {
    document.getElementById("slidein").style.animation = "";
    document.getElementById("slidein").style.background = colorMap[now];
    document.getElementById("slidein").style.animation = "slidein 2.0s ease-in-out forwards";
    document.body.style.pointerEvents="none";
    document.body.style.overflowY="hidden";
}

function writeContent() {
    if(now=="contact") document.body.getElementsByTagName("main")[0].innerHTML = contact_content;
    else if(now=="belong") document.body.getElementsByTagName("main")[0].innerHTML = belong_content;
    else if(now=="blog") document.body.getElementsByTagName("main")[0].innerHTML = blog_content;
    else document.body.getElementsByTagName("main")[0].innerHTML = home_content;
}

function afterScroll() {
    document.body.style.pointerEvents="auto";
    document.body.style.overflowY="scroll";
    document.body.style.background = colorMap[now];
    document.getElementById("slidein").style.animation = "";
}

function init(){
    $('.glitch').glitch();

    now = location.href.split("#")[1].replace("_info","");

    writeContent();

    document.onclick = function(e) {
        if(["home","blog","contact","belong"].includes(e.target.id) && e.target.id != now) {
            now = e.target.id;
            (async()=>{
                preScroll();
                const top = nowMainPosition() / 100;
                while(0 < nowMainPosition()) {
                    if(nowMainPosition() > top*70) await sleep(1);
                    else if(nowMainPosition() > top*60) await sleep(2);
                    else if(nowMainPosition() > top*50) await sleep(3);
                    else if(nowMainPosition() > top*40) await sleep(4);
                    else if(nowMainPosition() > top*30) await sleep(5);
                    else if(nowMainPosition() > top*20) await sleep(6);
                    else if(nowMainPosition() > top*10) await sleep(7);
                    else await sleep(8);
                    document.scrollingElement.scrollTop += 2;
                }
                await sleep(1000);
                afterScroll();
                writeContent();
                location.href = location.href.split("#")[0] + `#${now}_info`;
            })();
        }
        // if(e.target.id="menu") {
        //     document.getElementById("menuselect").style.display = nextmenu;
        //     if(nextmenu == "block") nextmenu = "none";
        //     else nextmenu = "block";
        // }
    }
}

window.addEventListener("DOMContentLoaded", init);

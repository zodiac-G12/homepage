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
    document.body.style.background = colorMap[now];
}

function afterScroll() {
    document.body.style.pointerEvents="auto";
    document.body.style.overflowY="scroll";
    document.body.style.background = colorMap[now];
    document.getElementById("slidein").style.animation = "";
}

// TODO add animation
// FIXME position
function createPlanet(){
    var i=1;
    while(i<10){
        div = document.createElement("div");
        div.setAttribute("id",i);
        document.getElementsByTagName("center")[0].insertBefore(div, document.getElementsByClassName("watar0")[0]);
        document.getElementById(i).innerHTML = '<i class="fa fa-globe" aria-hidden="true"></i>';
        var tenbin = ["left", "right"][Math.floor(Math.random()*2)];
        document.getElementById(i).style.float = tenbin;
        document.getElementById(i).style[`margin-${tenbin}`]=`${Math.floor(Math.random()*5)+10}vw`;
        document.getElementById(i).style.marginTop=`${Math.floor(Math.random()*5)}vh`;
        i=(i+1)|0;
    }

}

function init(){
    // https://www.yoheim.net/blog.php?q=20121008
    
    const userAgent=window.navigator.userAgent.toLowerCase();
      userAgent.indexOf('msie')!=-1||userAgent.indexOf('trident')!=-1||
      userAgent.indexOf('edge')!=-1?
        location.href="https://zodiac-g12.github.io/homepage/sorry.html":"";
      // (confirm("このブラウザは壊れています。GoogleChromeを入手しましょう。")?
      // window.location.href="https://www.google.com/intl/ja/chrome/":
      // window.location.href="https://www.mozilla.org/ja/firefox/new/"):"";


    setTimeout(function(){
        window.scrollTo(0,1);
    }, 1);

    // $('.glitch').glitch();

    now = location.href.includes("#") ? location.href.split("#")[1].replace("_info","") : "home";
    
    // createPlanet();
    
    writeContent();

    document.scrollingElement.scrollTop = 0;

    // FIXME OTHERS
    // iOSだとこれは駄目？
    // document.onclick = function(e) {
    // }
}

function clicker(s){
    if(s != now) {
        now = s;
        (async()=>{
            setTimeout(function(){
                window.scrollTo(0,1);
            }, 1);
            preScroll();
            const top = nowMainPosition() / 100;
            const span = top
            while(0 < nowMainPosition()) {
                if(nowMainPosition() > top*70) await sleep(3);
                else if(nowMainPosition() > top*60) await sleep(5);
                else if(nowMainPosition() > top*50) await sleep(7);
                else if(nowMainPosition() > top*40) await sleep(9);
                else if(nowMainPosition() > top*30) await sleep(11);
                else if(nowMainPosition() > top*20) await sleep(13);
                else if(nowMainPosition() > top*10) await sleep(15);
                else await sleep(13);
                document.scrollingElement.scrollTop += 10;
            }
            await sleep(2000);
            afterScroll();
            writeContent();
            location.href = location.href.split("#")[0] + `#${now}_info`;
        })();
    }
}

window.addEventListener("DOMContentLoaded", init);

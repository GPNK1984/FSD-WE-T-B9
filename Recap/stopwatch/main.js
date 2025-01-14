let enableButton=(...buttons)=>{
    buttons.forEach((button)=>{
        button.setAttribute('style','display:block');
    })
}
let disableButton=(...buttons)=>{
    buttons.forEach((button)=>{
        button.setAttribute('style','display:none');
    })
}
let lPad=(value)=>{
    return value.toString().padStart(2,'0');
}
let h=document.getElementById('h');
let m=document.getElementById('h');
let s=document.getElementById('s');
let ms=document.getElementById('ms');

let hh,mm,ss,mss,myInterval;

let startBtn=document.getElementById('start');
let stopBtn=document.getElementById('stop');
let resetBtn=document.getElementById('reset');
let splitBtn=document.getElementById('split');



let initializeValues=()=>{
    h.innerText=m.innerText=s.innerText=ms.innerText="00";
    hh=mm=ss=mss=0;
    result.innerHTML=""
}

disableButton(stopBtn,resetBtn,splitBtn);

initializeValues();

let startWatch=()=>{
    disableButton(startBtn);
    enableButton(stopBtn,resetBtn,splitBtn);
    myInterval=setInterval(()=>{
        mss++;
        if(mss==100){
            mss=0;
            ss++;
        }
        else if(ss==100){
            ss=0;
            mm++;
        }else if(mm==100){
            mm=0;
            hh++;
        }

        h.innerText=lPad(hh);
        m.innerText=lPad(mm);
        s.innerText=lPad(ss);
        ms.innerText=lPad(mss);
    },10)
}

let stopWatch=()=>{
    clearInterval(myInterval);
    disableButton(stopBtn,resetBtn,splitBtn);
    enableButton(startBtn)
}

let resetWatch=()=>{
    clearInterval(myInterval);
    disableButton(stopBtn,resetBtn,splitBtn);
    enableButton(startBtn)
    initializeValues();
}
let splitWatch=()=>{
    let splitElem=document.createElement('div');
    splitElem.innerHTML=`${lPad(hh)}<sub class='small'>HH</sub>:${lPad(mm)}<sub class='small'>MM</sub>:${lPad(ss)}<sub class='small'>SS</sub>:${lPad(mss)}:<sub class='small'>MS</sub>`;
    result.appendChild(splitElem);
}
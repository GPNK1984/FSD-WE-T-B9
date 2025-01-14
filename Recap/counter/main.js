let counterTxt=document.getElementById('root');
let restartBtn=document.getElementById('btn');
let counter=11;
let interval=1000;
let start=()=>{
    restartBtn.setAttribute('style','display:none');
    counterTxt.innerHTML="";
    setTimeout(()=>{
        counterTxt.innerHTML=--counter;
        setTimeout(()=>{
            counterTxt.innerHTML=--counter;
            setTimeout(()=>{
                counterTxt.innerHTML=--counter;
                setTimeout(()=>{
                    counterTxt.innerHTML=--counter;
                    setTimeout(()=>{
                        counterTxt.innerHTML=--counter;
                        setTimeout(()=>{
                            counterTxt.innerHTML=--counter;
                            setTimeout(()=>{
                                counterTxt.innerHTML=--counter;
                                setTimeout(()=>{
                                    counterTxt.innerHTML=--counter;
                                    setTimeout(()=>{
                                        counterTxt.innerHTML=--counter;
                                        setTimeout(()=>{
                                            counterTxt.innerHTML='Good Morning! Have a Nice Day!';
                                            restartBtn.setAttribute('style','display:block');
                                        },interval)
                                    },interval)
                                },interval)
                            },interval)
                        },interval)
                    },interval)
                },interval)
            },interval)
        },interval)

    },interval)
}
restartBtn.addEventListener('click',()=>{
    counter=11;
    start();
})
start();
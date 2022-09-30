function play_voice(){
    var T2S; 

    if("speechSynthesis" in window || speechSynthesis){ // Checking If speechSynthesis Is Supported.
    
        //var text = prompt("What Text To Say?") || `Text To Speech is Over Powered`; // Ask What To Say or use default

        var text = '請所有人閉上眼睛，低頭雙手握拳放在自己面前。 除了奧伯倫以外，請壞人張開眼睛確認彼此身份，5，4，3，2，1，請壞人閉上眼睛。 除了莫德雷德之外，請所有壞人豎起你們的大拇指，請梅林張開眼睛確認壞人身份，5，4，3，2，1，請壞人收起大拇指請梅林閉上眼睛。 請梅林和莫甘娜豎起你們的大拇指，請派希維爾張開眼睛確認身分，5，4，3，2，1，請梅林和莫甘娜收回大拇指，請派希維爾閉上眼睛。 請所有人張開眼睛遊戲開始。';
        
        var utter = new SpeechSynthesisUtterance(text); // To Make The Utterance
        utter.lang = 'zh-HK';
        T2S = window.speechSynthesis || speechSynthesis; // Storing speechSynthesis API as variable - T2S
        T2S.speak(utter); // To Speak The Utterance
    
        window.onbeforeunload = function(){
            T2S.cancel(); // To Stop Speaking If the Page Is Closed.
        }
    
    }    
}
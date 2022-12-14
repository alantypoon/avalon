$(function() {
    var hash, changeFlag = false,
        playingFlag = false;
    var speed, PitchSign, Speaker, PitchLevel, PitchScale;
    var oberon, mordred, percival, mormna;
    var checkList = ['oberon', 'mordred', 'percival', 'mormna'];
    var voiceCount = 0,
        voices, audio;
    var scores = { good: 0, bad: 0 };
    voices = audiojs.createAll({ trackEnded: playVoice });
    audio = voices[0];

    $("#bind-img").load(resizeHeight);
    $(window).resize(resizeHeight);
    resizeHeight();

    if (window.location.hash) {
        hash = window.location.hash.substring(1); //Puts hash in variable, and removes the # character
        var urlSetting = JSON.parse('{"' + decodeURI(hash).replace(/"/g, '\\"').replace(/&/g, '","').replace(/=/g, '":"') + '"}')
            //console.log(urlSetting);
        for (var i in urlSetting) {
            $("input[name='" + i + "'][type='range']").val(urlSetting[i]);
            $("input[name='" + i + "'][type='radio'][value='" + urlSetting[i] + "']").prop('checked', true);
            $("input[name='" + i + "'][type='hidden']").val(urlSetting[i]);
            if (urlSetting[i] == '0') {
                $(".click-card[data-role='" + i + "']").addClass('hover');
            }
            //console.log("input[name='" + i + "']",urlSetting[i]);
        }

    }
    refreshSetting();

    $("body").on("change", "input", function() {
        if (playingFlag) {
            $('#play-voice').trigger('click');
        }
        window.location.hash = $("#settings").serialize();
        refreshSetting();
    });

    $(".click-card").click(function() {
        var role = $(this).data("role");
        if (role == 'percival' || role == 'mormna') {
            $(".together").toggleClass("hover");
        } else {
            $(this).toggleClass("hover");
        }
        $("input[type='hidden']").each(function() {
            $(this).val($(".click-card[data-role='" + $(this).attr('name') + "']").hasClass("hover") ? '0' : '1');
        });
        $("input[type='hidden']").trigger("change");
    });

    $('#play-voice').click(function() {
        if (playingFlag) {
            audio.pause();
            audio.currentTime = 0;
            $("#play-voice").text('????????????').removeClass('btn-danger');
            voiceCount = 0;
            playingFlag = false;
        } else {
            $("#play-voice").text('????????????').addClass('btn-danger');
            voiceCount = 0;
            playVoice();
        }
    });

    $('#reset').click(function() {
        $('#media').html('');
        $('form#settings')[0].reset();
        $(".click-card").removeClass('hover');
        $("input").trigger("change");
    });

    // $("#share").jsSocials({
    //     shares: ["twitter", "facebook", "messenger", "line"]
    // });

    $(".zero-hide").hide();
    $(".btn-score").click(function() {
        var role = $(this).data('role');
        var add = parseInt($(this).data('add'));
        if (role == 'zero') {
            scores = { good: 0, bad: 0 };
            $(".zero-hide").hide();
            $(".role-count").text('');
        } else if (add) {
            scores[role] += add;
            scores[role] = scores[role] < 0 ? 0 : scores[role];
            var sum = scores.good + scores.bad;
            sum = sum ? sum : 1;
            $(".good-bar").css('width', scores.good / sum * 100 + "%");
            $(".good-bar span").text( parseInt(scores.good / sum * 100) + "%");
            $(".bad-bar").css('width', scores.bad / sum * 100 + "%");
            $(".bad-bar span").text( parseInt(scores.bad / sum * 100) + "%");
            $("span." + role + "-count").text(scores[role]);
            $(".zero-hide").show();
        }
    });

    function refreshSetting() {
        changeFlag = true;
        speed = $("input[name='speed']").val();
        PitchSign = $("input[name='PitchSign']:checked").val();
        Speaker = $("input[name='Speaker']:checked").val();
        PitchLevel = $("input[name='PitchLevel']").val();
        PitchScale = $("input[name='PitchScale']").val();
        oberon = $("input[name='oberon']").val();
        mordred = $("input[name='mordred']").val();
        percival = $("input[name='percival']").val();
        mormna = $("input[name='mormna']").val();
        $("#sheep-text .more").hide();
        for (var i = 0; i < checkList.length; i++) {
            var check = eval(checkList[i]);
            if (check == '1') {
                $(".only-" + checkList[i]).show();
            }

        }
        $("#speed").text(speed);
        $("#PitchLevel").text(PitchLevel);
        $("#PitchScale").text(PitchScale);
    }

    function resizeHeight() {
        $('.one-card').css('height', $('.back').height());
    }

    // playVoice: function() {
    //     this.status.playing = true;
    //     this.voiceCount++;
    //     $("#sheep-text span").removeClass('text-danger');
    //     var now = $("#sheep-text span:nth-child(" + this.voiceCount + ")");
    //     if (now.css('display') === 'none') {
    //         this.playVoice();
    //         return;
    //     }
    //     if (this.voiceCount > 28) {
    //         this.voiceCount = 0;
    //         this.status.playing = false;
    //         return;
    //     }
    //     now.addClass('text-danger');
    //     var audioSrc = 'voices/' + this.settings.speaker + '/' + now.data('count') + '.mp3?123';
    //     this.audio.load(audioSrc);
    //     $("audio")[0].playbackRate = this.settings.speed;
    //     this.audio.play();
    // }

    ///

    function playVoice() {

        playingFlag = true;
        // increase voiceCount
        voiceCount++;
        // skip if not needed
        if (
            voiceCount == 2 && oberon == 0 
        || 
            voiceCount == 4 && mordred == 0
        ||
            voiceCount == 6 && percival == 0
        ){
            voiceCount++;
        }

        // end of speech?
        if (voiceCount > 7) {
            voiceCount = 0;
            playingFlag = false;
            $("#play-voice").text('????????????').removeClass('btn-danger');
            return;
        }
        $('#sheep-text span').removeClass('text-danger');
        var now = $("#sheep-text span:nth-child(" + voiceCount + ")");
        // debugger;
        now.addClass('text-danger');

        console.log('playVoice', voiceCount);

        // play it now
        var audioSrc = 'voices/' + Speaker + '/' + voiceCount + '.mp3?032601';
        audio.load(audioSrc);
        $("audio")[0].playbackRate = speed;
        audio.play();

    }


});

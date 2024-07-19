$(document).ready(function() {
    console.log("機動成功");

    let intervalId;
    let currentSound = '../sound/click.mp3'; // currentSoundをグローバルスコープで宣言
    let rotation = 0;
    let count = 0;
    $('#top-btn').on('click', function() {
        console.log("TOPボタンの機動成功");
        if ($('#top-main').hasClass('none')) {
            $('#top-main').slideDown(1000, function() {
                $('#top-main').removeClass('none');
            });
            $('#search-main').hide(1000, function() {
                $('#search-main').addClass('none');
            });
            // $('#playtrack').slideUp(1000, function() {
            //     $('#playtrack').addClass('none');
            // });
        }
        if ($('#restart-btn').text() === 'STOP') {
            clearInterval(intervalId);
            $('#restart-btn').text('START');
        }
    });

    $('#search-btn').on('click', function() {
        console.log("検索ボタンの機動成功");
        if ($('#search-main').hasClass('none')) {
            $('#search-main').slideDown(1000, function() {
                $('#search-main').removeClass('none');
            });
            $('#top-main').hide(1000, function() {
                $('#top-main').addClass('none');
            });
            if ($('#restart-btn').text() === 'STOP') {
                clearInterval(intervalId);
            }
        }
    });

    // スライダーの値変更イベントリスナー
    $('#slider').on('input', function() {
        $('#sliderValue').text($(this).val());
        updateMetronome();
    });

    // メトロノームを更新する関数
    function updateMetronome() {
        clearInterval(intervalId);
        if ($('#restart-btn').text() === 'STOP') {
            const bpm = $('#slider').val();
            const interval = 60000 / bpm; // ミリ秒単位の間隔
            const clickSound = $('#click-sound')[0];
            clickSound.src = currentSound;
            intervalId = setInterval(function() {
                clickSound.currentTime = 0;
                clickSound.play();
            }, interval);
        }
    }

    // START/STOPボタンのクリックイベントリスナー
    $('#restart-btn').click(function() {
        if ($(this).text() === 'START') {
            $(this).text('STOP');
            updateMetronome();
        } else {
            $(this).text('START');
            clearInterval(intervalId);
        }
    });

    // ハンバーガーメニュー
    $('.menu-toggle').click(function() {
        $(this).prop('disabled', true);
        $('#menu').toggle(500);

        if ($('#menu').is(':visible')) {
            rotation -= 360;
        } else {
            rotation += 360;
        }

        $('.menu-toggle').css({
            'transform-origin': 'center',
            'transform': `rotate(${rotation}deg)`
        });

        setTimeout(function() {
            $('.menu-toggle').prop('disabled', false);
        }, 1000);
    });

    $('.menu-item').click(function() {
        currentSound = $(this).data('sound');
        rotation += 360;
        $('.menu-toggle').css({
            'transform-origin': 'center',
            'transform': `rotate(${rotation}deg)`
        });
        $('#menu').hide(500);
        updateMetronome();
    });

    // 曲のBPMを取得してメトロノームを鳴らす
    $(document).on('click', '#playbtn', function() {
        let src;
        if ($('#playbtn').children('img').attr('src') === "../icon/start-button.png") {
            src = $('#playbtn').children('img').attr('src');
            console.log(src);
            
            console.log("再生ボタンクリック");
            $('#playbtn').children('img').attr('src', "../icon/stopbtn.png");
            const trackBPM = parseFloat($('.bpm').text()); // BPMを数値として取得
            if (isNaN(trackBPM) || trackBPM <= 0) {
                console.error("有効なBPMを入力してください。");
                return;
            }

            console.log(trackBPM);

            const interval = 60000 / trackBPM; // ミリ秒単位の間隔
            const clickSound = $('#click-sound')[0];
            clickSound.src = currentSound;

            if (typeof intervalId !== 'undefined') {
                clearInterval(intervalId);
            }

            intervalId = setInterval(function() {
                clickSound.currentTime = 0;
                clickSound.play();
            }, interval);
        }
        //停止ボタンを実装
        else if ($('#playbtn').children('img').attr('src') === "../icon/stopbtn.png") {
            console.log("停止ボタンをクリック");
            $('#playbtn').children('img').attr('src' ,"../icon/start-button.png");
            clearInterval(intervalId);
        }
    });
});

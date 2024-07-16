$(document).ready(function() {
    console.log("機動成功");

    let intervalId;
    let currentSound = '../sound/click.mp3'; // currentSoundをグローバルスコープで宣言
    let rotation = 0;
    $('#top-btn').on('click', function() {
        console.log("TOPボタンの機動成功");
        if ($('#top-main').hasClass('none')) {
            $('#top-main').slideDown(1000, function() {
                $('#top-main').removeClass('none');
            });
            $('#search-main').hide(1000, function() {
                $('#search-main').addClass('none');
            });
            if ($('#restart-btn').text() === 'STOP') {
                clearInterval(intervalId);
                $('#restart-btn').text('START');
            }

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
        // ボタンを無効化する
        $(this).prop('disabled', true);
        $('#menu').toggle(500);

        // メニューが表示されているかどうかで回転角度を変更する
        if ($('#menu').is(':visible')) {
            rotation -= 360;
        } else {
            rotation += 360;
        }

        // 回転角度を適用する
        $('.menu-toggle').css({
            'transform-origin': 'center',
            'transform': `rotate(${rotation}deg)`
        });

        // 一定時間後にボタンを再度有効化する
        setTimeout(function() {
            $('.menu-toggle').prop('disabled', false);
        }, 1000); // 1000ミリ秒 = 1秒
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

    //曲のbpmを取得してメトロノームを鳴らす
    $('#playbtn').click(function() {
        console.log("再生ボタンクリック")
        const trackBPM = $('.bpm').val();
        console.log("trackBPM");
        const interval = 60000 / bpm; // ミリ秒単位の間隔
            const clickSound = $('#click-sound')[0];
            clickSound.src = currentSound;
            intervalId = setInterval(function() {
                clickSound.currentTime = 0;
                clickSound.play();
            }, interval);
    })

});


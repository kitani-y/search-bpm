$(function(){
    console.log("機動成功");

    // スライダーの値変更
    const slider = document.getElementById('slider');
    const sliderValue = document.getElementById('sliderValue');
    slider.addEventListener('input', function() {
        sliderValue.textContent = slider.value;
    });

    const myButton = document.getElementById('restart-btn');
    myButton.addEventListener('click', function() {
        if (myButton.textContent === 'START') {
            myButton.textContent = 'STOP';
        } else {
            myButton.textContent = 'START';
        }
    });

    $('#top-btn').on('click', function() {
        console.log("TOPボタンの機動成功");
        if ($('#top-main').hasClass('none')) {
            $('#top-main').slideDown(2000, function() {
                $('#top-main').removeClass('none');
            });
            $('#search-main').hide(2000, function() {
                $('#search-main').addClass('none');
            });
        }
    });

    $('#search-btn').on('click', function() {
        console.log("検索ボタンの機動成功");
        if ($('#search-main').hasClass('none')) {
            $('#search-main').slideDown(2000, function() {
                $('#search-main').removeClass('none');
            });
            $('#top-main').hide(2000, function() {
                $('#top-main').addClass('none');
            });
        }
    });
});

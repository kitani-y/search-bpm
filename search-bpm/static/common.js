// スライダーの値変更
const slider = document.getElementById('slider');
const sliderValue = document.getElementById('sliderValue');
// スライダーの値が変更されたときに表示を更新
slider.addEventListener('input', function() {
    sliderValue.textContent = slider.value;
});

const myButton = document.getElementById('restart-btn');
// ボタンがクリックされたときの処理
myButton.addEventListener('click', function() {
    if (myButton.textContent === 'START') {
        myButton.textContent = 'STOP';
    } else {
        myButton.textContent = 'START';
    }
});
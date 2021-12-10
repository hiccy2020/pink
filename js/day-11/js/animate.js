// 封装的animate简单动画函数
function animate(obj, target, callback) {
    clearInterval(obj.timer);
    obj.timer = setInterval(function () {
        // 设置每次移动的距离步长
        var step = (target - obj.offsetLeft) / 10;
        step = step >= 0 ? Math.ceil(step) : Math.floor(step);

        if (obj.offsetLeft == target) {
            clearInterval(obj.timer);
            // 判断是否传入回调函数，如有则执行。
            if (callback) {
                callback();
            }
        };
        obj.style.left = obj.offsetLeft + step + 'px';
    }, 15)
}
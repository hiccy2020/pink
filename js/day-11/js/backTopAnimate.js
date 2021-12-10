// 封装的animate简单动画函数
function animate(obj, target, callback) {
    clearInterval(obj.timer);
    obj.timer = setInterval(function () {
        // 设置每次移动的距离步长
        var step = (target - obj.pageYOffset) / 10;
        step = step >= 0 ? Math.ceil(step) : Math.floor(step);

        // 窗口目前滚动的距离：pageYOffset
        if (obj.pageYOffset == target) {
            clearInterval(obj.timer);
            // 判断是否传入回调函数，如有则执行。
            // 写法一：
            // if (callback) {
            //     callback();
            // };
            // 写法二：
            callback && callback();
        };
        obj.scroll(0, obj.pageYOffset + step)
    }, 15)
}
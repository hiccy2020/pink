window.onload = function () {
    var focus = document.querySelector('.focus');
    // 获取图片宽度。
    var focus_width = focus.clientWidth;

    var ul = focus.querySelector('ul');

    var ol = focus.querySelector('.circle');


    var arrow_l = focus.querySelector('.arrow-l');
    var arrow_r = focus.querySelector('.arrow-r');



    // 定时器轮播。
    function rot() {
        rot1 = setInterval(rotPlay, 5000);
    }

    // 轮播函数
    function rotPlay() {
        var page = ul.offsetLeft - focus_width;
        page = page > - focus_width * ol_li.length ? page : 0
        var pos = Math.abs(page / focus_width);

        animate(ul, page);
        className(ol_li, pos);
    }

    // 页面打印即执行定时器轮播。


    // 生成ol下的li开始
    for (var i = 0; i < ul.children.length; i++) {
        var li = document.createElement('li');
        ol.appendChild(li);
    }
    ol.children[0].className = 'current';
    var ol_li = ol.querySelectorAll('li');
    // 生成ol下的li结束

    // 设置轮播红色圆点排他函数开始。
    function className(obj, pos) {
        for (var i = 0; i < obj.length; i++) {
            obj[i].className = '';
        }
        obj[pos].className = 'current';
    }
    // 设置轮播红色圆点排他函数结束。

    rot();
    // focus鼠标移入移出事件，显示左右箭头
    focus.addEventListener('mouseenter', function () {
        arrow_l.style.display = 'block';
        arrow_r.style.display = 'block';
        clearInterval(rot1);
    });

    focus.addEventListener('mouseleave', function () {
        arrow_l.style.display = 'none';
        arrow_r.style.display = 'none';
        rot();
    })


    // 设置ol_li红色圆点点击事件。
    for (var i = 0; i < ol_li.length; i++) {
        ol_li[i].index = i;
        ol_li[i].addEventListener('click', function () {
            for (var j = 0; j < ol_li.length; j++) {
                ol_li[j].className = '';
            }
            this.className = 'current';

            var step = -(this.index * focus_width);
            animate(ul, step);
        });
    }

    // 设置向左箭头点<击事件。
    arrow_l.addEventListener('click', function () {
        rotPlay();
    })

    // 设置向右箭头>点击事件。
    arrow_r.addEventListener('click', function () {
        rotPlay();
    })
}
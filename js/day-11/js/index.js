window.onload = function () {
    var focus = document.querySelector('.focus');
    // 获取图片宽度。
    var focusWidth = focus.clientWidth;
    var ul = focus.querySelector('ul');
    var ol = focus.querySelector('.circle');
    var arrow_l = focus.querySelector('.arrow-l');
    var arrow_r = focus.querySelector('.arrow-r');

    // 初始化ul里图片的下标
    var num = 0;
    // 初始化小圆点的下标
    var circle = 0;

    // 初始化自动轮播定时器
    var timer = setInterval(function () {
        // 手动调用点击事件
        arrow_r.click();
    }, 2000)

    // 初始化排他思想给当前点击的小圆点增加class
    function circleChange() {
        for (var i = 0; i < ol.children.length; i++) {
            ol.children[i].className = '';
        }
        // circle为自定义index属性值
        ol.children[circle].className = 'current';
    }

    // 1、鼠标移入移出左右箭头显示
    focus.addEventListener('mouseenter', function () {
        arrow_l.style.display = 'block';
        arrow_r.style.display = 'block';

        // 关闭定时器
        clearInterval(timer);
        timer = null;
    })

    focus.addEventListener('mouseleave', function () {
        arrow_l.style.display = 'none';
        arrow_r.style.display = 'none';

        // 开启轮播定时器
        timer = setInterval(function () {
            arrow_r.click();
        }, 2000)
    })

    // 2、生成小圆点
    for (var i = 0; i < ul.children.length; i++) {
        var li = document.createElement('li');
        li.setAttribute('index', i);
        ol.appendChild(li);

        // 2.1、默认第一个小圆点增加class
        ol.children[0].className = 'current';

        // 2.2、给每个小圆点增加点击事件
        ol.children[i].addEventListener('click', function () {
            for (var j = 0; j < ol.children.length; j++) {
                ol.children[j].className = '';
            }
            // 2.2.1、使用排他思想给当前点击的小圆点增加class
            this.className = 'current';

            // 2.2.2、图片移动动画效果
            animate(ul, -this.getAttribute('index') * focusWidth);

            // 2.2.3、当前点击的小圆点赋值给ul里图片的下标和小圆点的下标
            num = this.getAttribute('index');
            circle = this.getAttribute('index');
        });
    };

    // 3、克隆第一张图片放到ul最后。注意，需放到生成小圆点li语句后，否则生成的小圆点数量不对。
    var first = ul.children[0].cloneNode(true);
    ul.appendChild(first);

    // 初始化节流阀变量
    var flag = true;
    // 4.1、右箭头点击事件
    arrow_r.addEventListener('click', function () {
        if (flag) {
            flag = false;
            if (num == ul.children.length - 1) {
                ul.style.left = 0;
                num = 0;
            }
            num++;
            animate(ul, -num * focusWidth, function () {
                flag = true;
            });

            // 关联小圆点
            circle++;
            if (circle >= ol.children.length) {
                circle = 0;
            }
            circleChange();
        }
    });

    // 4.2、左箭头点击事件
    arrow_l.addEventListener('click', function () {
        if (flag) {
            flag = false;
            if (num == 0) {
                // 当切换到第一张里，把num值变更到为最后一张图片的索引值（最后这张图片是克隆的第一张图片）
                num = ul.children.length - 1;
                ul.style.left = -num * focusWidth + 'px';
            }
            num--;
            animate(ul, -num * focusWidth, function () {
                flag = true;
            });

            circle--;
            if (circle < 0) {
                circle = ol.children.length - 1;
            }
            circleChange();
        }
    });
}
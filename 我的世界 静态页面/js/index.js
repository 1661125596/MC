var ban = ~function () {
    var data = null,
        ban_box = document.getElementsByClassName('ban_box')[0],
        n = 0,
        ban_img = document.getElementsByClassName('ban_img')[0],
        boxW = utils.css(ban_img, 'width'),
        index = 0,
        timer = null,
        tipBox = utils.getByClass('tipBox', ban_box)[0],
        tips = tipBox.getElementsByTagName('li');

    function getData() {
        var xhr = new XMLHttpRequest();
        xhr.open('get', './data/data.json');
        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4 && /^2\d{2}$/.test(xhr.status)) {
                data = utils.toJson(xhr.responseText);
                giveHtml();
                autoPlay();
                evenFn();
                tipClick();
            }
        };
        xhr.send();
    }

    function giveHtml() {
        var str = ``;
        var tipStr = ``;
        // data = data || [];
        data.push(data[0]);
        data.forEach((item, index) => {
            var {a, pic} = item;
            str += `<li><a href="${a}"><img src="${pic}" alt=""></a></li>`;
            if (index < data.length - 1) {
                tipStr += `<li class=" ${index == 0 ? 'on' : ''}"></li>`;
            }
        });
        n = data.length;
        ban_img.innerHTML = str;
        ban_img.style.width = boxW * n + 'px';
        tipBox.innerHTML = tipStr;
    }

    function play() {
        if (utils.css(ban_img, 'left') % boxW != 0) return;
        index++;
        if (index == n) {
            utils.css(ban_img, 'left', 0);
            index = 1;
        }
        [...tips].forEach((item, index) => {
            utils.removeClass(item, 'on')
        });
        if (index == n - 1) {
            utils.addClass(tips[0], 'on')
        } else {
            utils.addClass(tips[index], 'on')
        }


        var curL = -boxW * index;
        myAnimate(ban_img, 1000, {left: curL})
    }

    function autoPlay() {
        timer = setInterval(function () {
            play();
        }, 3000)
    }

    function evenFn() {
        ban_box.onmouseenter = function () {
            clearInterval(timer);
        };
        ban_box.onmouseleave = function () {
            autoPlay();
        }
    }

    function tipClick() {
        for (let i = 0; i < tips.length; i++) {
            tips[i].onmousemove = function () {
                if (utils.css(ban_img, 'left') % boxW != 0) return;
                index = i - 1;
                play();
            }
        }
    }

    getData();
}();

var news = ~function () {
    var newsBox = document.getElementsByClassName('news_box')[0],
        nav = newsBox.getElementsByTagName('nav')[0],
        navul = nav.getElementsByTagName('ul')[0],
        navLis = navul.getElementsByTagName('li'),
        navA = nav.getElementsByTagName('a')[0],
        bodyBox = newsBox.getElementsByClassName('bodyBox')[0],
        body = bodyBox.getElementsByClassName('body')[0],
        uls = body.getElementsByTagName('ul'),
        n = 0,
        boxW = utils.css(body, 'width'),
        k = uls.length;
    body.style.width = boxW * k + 'px';
    [...navLis].forEach((item, index) => {
        item.onmouseover = function () {
            n = index;
            $(item).addClass('on');
            $(item).siblings().removeClass();
            // console.log(n);
            Fn();
            this.running = true;
        }
    });

    function Fn() {
        [...uls].forEach((item, index) => {
            if (n > 0) {
                $(body).css({
                    left: -boxW * n
                })
            } else {
                $(body).css({
                    left: 0
                })
            }
        })
    }

}();

var share = ~function () {
    var bigBox = document.getElementsByClassName('ewm_box')[0],
        btnBox = bigBox.getElementsByClassName('ewm_tab')[0],
        btns = btnBox.getElementsByTagName("a"),
        body = bigBox.getElementsByClassName('ewm_img')[0],
        wxBody = body.getElementsByClassName('ewm_wx')[0],
        boxW = utils.css(wxBody, 'width'),
        n = 0;

    [...btns].forEach((item, index) => {
        item.onmouseover = function () {
            n = index;
            $(item).addClass('on');
            $(item).siblings().removeClass();
            console.log(btns);
            Fn();
        }
    });

    function Fn() {
        [...btns].forEach((item, index) => {
            if (n > 0) {
                $(body).css({
                    left: -boxW * n
                })
            } else {
                $(body).css({
                    left: 0
                })
            }
        })
    }

}();
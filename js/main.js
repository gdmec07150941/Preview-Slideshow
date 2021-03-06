// 1.数据定义
var data = [
    {img: 1, h2: "Creative", h3: "DUET"},
    {img: 2, h2: "Friendly", h3: "DEVIL"},
    {img: 3, h2: "Tranquilent", h3: "COMPATRIOT"},
    {img: 4, h2: "Insecure", h3: "HUSSLER"},
    {img: 5, h2: "Loving", h3: "REBEL"},
    {img: 6, h2: "Passionate", h3: "SEEKER"},
    {img: 7, h2: "Crazy", h3: "FRIEND"}
];

// 2.通用函数
var g = function (tag) {
    if (tag.substr(0, 1) == '.') {
        return document.getElementsByClassName(tag.substr(1));
    }
    return document.getElementById(tag);
}

// 3.添加所有幻灯片的操作（以及对应按钮）
function addSliders () {
    // 3.1获取模版
    var tpl_main = g('template_main').innerHTML
        .replace(/^\s*/, '')
        .replace(/\s*$/, '');
    var tpl_ctrl = g('template_ctrl').innerHTML
        .replace(/^\s*/, '')
        .replace(/\s*$/, '');
    // 3.2定义最终输出HTML 的变量
    var out_main = [];
    var out_ctrl = [];
    // 3.3遍历所有数据，构建最终输出的HTML
    for (i in data) {
        var _html_main = tpl_main
            .replace(/{{index}}/g, data[i].img)
            .replace(/{{h2}}/g, data[i].h2)
            .replace(/{{h3}}/g, data[i].h3)
            .replace(/{{css}}/g, ['', 'main-i_right'][i%2]);
        var _html_ctrl = tpl_ctrl
            .replace(/{{index}}/g, data[i].img);
        out_main.push(_html_main);
        out_ctrl.push(_html_ctrl);
    }
    // 3.4 把html回写到对in个的DOM里面
    g('template_main').innerHTML = out_main.join('');
    g('template_ctrl').innerHTML = out_ctrl.join('');

    // 7.增加#main_background
    g('template_main').innerHTML += tpl_main
        .replace(/{{index}}/g, '{{index}}')
        .replace(/{{h2}}/g, data[i].h2)
        .replace(/{{h3}}/g, data[i].h3);
    g('main_{{index}}').id = 'main_background';
}

// 5.幻灯片切换
function switchSlider (n) {
    // 5.1获得要展示的幻灯片&控制按钮
    var main = g('main_' + n);
    var ctrl = g('ctrl_' + n);

    // 5.2获得所有的幻灯片和控制按钮
    var clear_main = g('.main-i');
    var clear_ctrl = g('.ctrl-i');
    // 5.3清除他们的active样式
    for (i = 0; i < clear_ctrl.length; i++) {
        clear_ctrl[i].className = clear_ctrl[i].className.replace('ctrl-i_active', '');
        clear_main[i].className = clear_main[i].className.replace('main-i_active', '');

    }

    // 5.4为当前控制按钮和幻灯片附加样式
    main.className += ' main-i_active';
    ctrl.className += ' ctrl-i_active';

    // 7.2切换时，复制上一张幻灯片到background中
    setTimeout(function () {
        g('main_background').innerHTML = main.innerHTML;
    }, 1000)
}

// 6.动态调整图片的margin-top使其垂直居中
function movePicures () {
    var pictures = g('.picture');
    for (i = 0; i < pictures.length; i++) {
        pictures[i].style.marginTop = (-1 * pictures[i].clientHeight / 2) + 'px'
    }
}

// 4.定义何时输出幻灯片
window.onload = function () {
    addSliders();
    switchSlider(1);
    setTimeout(function () {
        movePicures();
    }, 50)
}

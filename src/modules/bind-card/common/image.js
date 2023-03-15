function initConfig(attr, _this) {
  if (attr.width === -1) {
    attr.width = _this._width * 0.8;
  }
  if (attr.height === -1) {
    attr.height = _this._height * 0.75;
  }
}
function maxMin(data) {
  let max, min;
  max = min = Number(data[0].rate);
  data.forEach((item) => {
    max = Number(item.rate) > max ? Number(item.rate) : max;
    min = Number(item.rate) < min ? Number(item.rate) : min;
  });
  return { max, min };
}
export default [
  'number',
  'string',
  'json',
  '$ruler',
  function($number, $string, $json, $ruler) {
    return {
      attrs: {
        //画布的宽高
        width: $number(350),
        height: $number(115),
        data: $json([]),
        yMun: $number(5), //y轴分层数量
        'y-color': $string('#F0F4F9'), //y轴坐标线条颜色
        'y-width': $number(1), //y轴坐标线条粗细
        'fill-color': $string('#FFD5A1'), //背景色
        'line-color': $string('#FED5A1'), //线条颜色
        'line-width': $number(3), //线条宽度
        percent: $string(''),
      },
      link(painter, attr) {
        //初始化配置
        initConfig(attr, this);
        //计算数据的最大值和最小值
        let temp = maxMin(attr.data);
        let rulerData = $ruler(temp.max, temp.min, attr.yMun - 1);
        //真实y坐标最大值与最小值的差值
        let lengthNum = rulerData.max - rulerData.min;
        let x = (this._width - attr.width) * 0.5; //x坐标
        let y = (this._height - attr.height) * 0.5 + attr.height; //y坐标

        //设置渐变色
        let gradient = painter.createLinearGradient(x, y - ((temp.max - rulerData.min) / lengthNum) * attr.height, x, y);
        gradient.addColorStop(0, attr['fill-color']);
        gradient.addColorStop(1, '#ffffff');
        let gradientColor = gradient.value();

        //绘制背景区域
        painter
          .beginPath()
          .config({ fillStyle: gradientColor })
          .moveTo(x, y);
        for (let i = 0; i < attr.data.length; i++) {
          painter.lineTo(x + (attr.width / (attr.data.length - 1)) * i, y - ((Number(attr.data[i].rate) - rulerData.min) / lengthNum) * attr.height);
        }
        painter.lineTo(x + attr.width, y).fill();

        //添加亮色线条

        painter.beginPath().config({
          strokeStyle: attr['line-color'],
          lineWidth: attr['line-width'],
        });
        for (let i = 0; i < attr.data.length; i++) {
          painter.lineTo(x + (attr.width / (attr.data.length - 1)) * i, y - ((Number(attr.data[i].rate) - rulerData.min) / lengthNum) * attr.height);
        }
        painter.stroke();

        //绘制y轴坐标线
        for (let i = 0; i < attr.yMun + 1; i++) {
          painter
            .beginPath()
            .config({
              strokeStyle: attr['y-color'],
              lineWidth: attr['y-width'],
            })
            .moveTo(x, y - i * (attr.height / attr.yMun))
            .lineTo(x + attr.width, y - i * (attr.height / attr.yMun))
            .stroke();
        }
        //绘制底轴文字
        painter.config({ 'font-size': 12, textAlign: 'left', fillStyle: '#666666' }).fillText(attr.data[0].time, x, y + 30);
        painter.config({ 'font-size': 12, textAlign: 'right' }).fillText(attr.data[attr.data.length - 1].time, x + attr.width, y + 30);
        //绘制y轴文字
        painter.config({
          fillStyle: '#999999',
          'font-size': 12,
          textAlign: 'left',
        });
        for (let i = 0; i <= attr.yMun; i++) {
          painter.fillText(rulerData.ruler[i] + attr['percent'], x, y - (attr.height / attr.yMun) * i);
        }
      },
    };
  },
];

/**
 * // 支持默认写法：[scrollMinxi(49.5,12)], 第一个传height，第二个传bottom，指向滚动分页组件默认ref: scrollView
 * // 支持数组写法：[scrollMixin([{ref: 'scrollView', height: 49.5,bottom:30},{ref: 'scrollView', height: 49.5,bottom:30}])]
 * // 支持多参数写法：[scrollMixin({ref: 'scrollView', height: 49.5,bottom:30},{ref: 'scrollView', height: 49.5,bottom:30})]
 *
 * 混入函数scrollMixin
 * 作用：适配滚动分页组件`ScrollView`头部区域高度计算
 * 属性：ref，代表滚动节点ref的值，接收一个字符串
 * 属性：height，代表滚动分页时距离顶部的高度（不含标题）
 * 属性：isEl ，代表是元素还是组件实例，true表示元素
 * 属性：bottom,代表距离底部高度，可选
 *
 * @param {Array} param0
 * @param {Object} param0, param1, ...
 * @param {Number} param0
 */

export default function() {
  const _arg = arguments;
  return {
    name: 'scrollMixin',
    mounted() {
      if (_arg.length === 0) {
        return;
      }
      let arr;
      if (typeof _arg[0] == 'number') {
        const defaultRef = 'scrollView';
        const defaultIsEl = false;
        arr = [{ ref: defaultRef, height: _arg[0], bottom: _arg[1], isEl: defaultIsEl }];
      } else if (_arg[0] instanceof Array) {
        arr = _arg[0];
      } else if (_arg.length > 0) {
        arr = [].slice.call(_arg);
      }
      arr.forEach((item) => {
        this.cal(item);
      });
    },
    methods: {
      cal({ ref, height, bottom, isEl }) {
        // 手机状态栏的高度，以750px作为参考
        const nativeHeight = this.$utils.getTitleHeight(['weixin', 'alipay'].includes(context.platform));
        const fillinHeight = `${this.$utils.pxToRem(height * 2)}`; // 屏幕头部填充内容高度，指的是伴随滚动区滚动时停留在顶部的区域高度（不含h5标题）
        const bottomHeight = bottom ? `${this.$utils.pxToRem(bottom * 2)}` : '0rem'; // 屏幕底部填充内容高度，指的是伴随滚动区滚动时停留在底部的区域高度（不含iphoneX底部盲区）
        // 处理底部iphoneX底部盲区
        let bottomBlindZone = '0rem';

        const scrollHeight = `calc(100vh - (${nativeHeight} + ${fillinHeight} + ${bottomHeight} + ${bottomBlindZone}))`;
        this.$nextTick(() => {
          if (isEl) {
            this.$refs[ref].style.height = scrollHeight;
          } else {
            this.$refs[ref].$el.style.height = scrollHeight;
          }
        });
      },
    },
  };
}

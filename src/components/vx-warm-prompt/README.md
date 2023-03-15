# VxWarmPrompt

温馨提示业务组件

## 引用

```js
import VxWarmPrompt from '@/components/vx-warm-prompt';

// 页面内局部引入
export default {
  components: {
    [VxWarmPrompt.name]: VxWarmPrompt,
  },
};
// 全局引入
Vue.component(VxWarmPrompt.name, VxWarmPrompt);
```

## 代码演示

```html
<vx-warm-prompt pagtipsid="per_noCard_withdrawals_vx" />
```

### VxWarmPrompt Props

| 属性          | 说明             | 类型      | 默认值       | 备注                 |
| ------------- | ---------------- | --------- | ------------ | -------------------- |
| `pagtipsid`   | 温馨提示id  | `String`  | `per_login` | `-`                  |
| `special`     | 需要特殊处理的字符串     | `String`  | `-`          | `-` |

/* eslint-disable camelcase */
import Vue from 'vue';
import zh_CN from 'vee-validate/dist/locale/zh_CN';
import VeeValidate from 'vee-validate';
import VueI18n from 'vue-i18n';
import rules from './rules';
import attributes from './attributes';

const { Validator } = VeeValidate;

Vue.use(VueI18n);
const i18n = new VueI18n({
  locale: 'zh_CN',
});

Vue.use(VeeValidate, {
  i18n,
  i18nRootKey: 'validation',
  dictionary: {
    zh_CN,
  },
  events: 'blur',
});

// Override and merge the dictionaries
Validator.localize({
  zh_CN: {
    messages: {
      required: function(field) {
        return field + '不能为空';
      },
    },
    attributes,
  },
});

if (rules && rules.length > 0) {
  rules.forEach((val) => {
    Validator.extend(val.name, val.content);
  });
}

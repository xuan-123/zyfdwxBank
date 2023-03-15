<template>
  <div class="warm-prompt">
    <span class="warm-prompt-container" v-html="content"></span>
  </div>
</template>
<script>
import commonApi from '@/api/common.js';
export default {
  name: 'vx-warm-prompt',
  props: {
    pagtipsid: {
      type: String,
      require: true,
    },
    special: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      content: '',
    };
  },
  created() {
    let oldPagtipsid = localStorage.getItem('pagtipsid') || '';
    if (oldPagtipsid !== this.pagtipsid) {
      this.getTips();
    } else {
      this.content = localStorage.getItem('pagtipsid_content');
    }
  },
  methods: {
    /**
     * @description 获取温馨提示语句
     */
    getTips() {
      let tipsParam = {
        pagtipsId: this.pagtipsid,
        channelType: 'per',
        showChannel: localStorage.getItem('channelId'),
      };
      commonApi.perPageTipsQuery(tipsParam).then((res) => {
        if (res.list && res.list.length !== 0) {
          let temp = res.list[0].tipsContent;
          this.content = temp.slice(0, 3) + this.special + temp.slice(3);
          // pagtipsid和pagtipsid_content，存储到 localStorage
          localStorage.setItem('pagtipsid', this.pagtipsid);
          localStorage.setItem('pagtipsid_content', this.content);
        }
      });
    },
  },
};
</script>

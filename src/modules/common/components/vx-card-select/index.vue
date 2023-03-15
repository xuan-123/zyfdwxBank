<template>
  <div class="vx-card-select">
    <div class="vx-selector">
      <div class="card-selected" @click="isBillSelectorShow = true" solid arrow>
        <div class="bank-select bank-flex-between">
          <div class="company-logo-name bank-flex-between">
            <div class="bank-logo">
              <img :src="picImg" slot="left" alt="银行logo" />
            </div>
            <div class="cardnum">
              {{ cardNum | wordencryptFilter(4, 4, 8) }}
            </div>
          </div>
          <ui-icon name="arrow-down" size="lg" color="#999" />
        </div>
      </div>
      <ui-selector
        v-model="isBillSelectorShow"
        :data="cardList"
        large-radius
        title="选择银行卡"
        icon-size="lg"
        :default-value="creditCardIndexSelected"
        max-height="600px"
      >
        <template slot-scope="{ option, index, selected }">
          <div class="selector-item-body" @click="changeCard(index, option)" :class="{ disabled: option.disabled, selected }">
            <div class="selector-item-left">
              <img :src="require(`@/assets/images/bank/${option.bkctgrycd || 'undefined'}.png`)" slot="left" alt="银行logo" />
            </div>
            <div class="selector-item-content">
              <p class="selector-item-title">{{ option.companyName }}</p>
              <p class="selector-item-brief">
                {{ option.acNo | wordencryptFilter(4, 4, 8) }}
              </p>
            </div>
            <div v-show="selected" class="img-wrap">
              <img src="@/assets/images/common/select.png" alt="选中" />
            </div>
          </div>
        </template>
      </ui-selector>
    </div>
  </div>
</template>
<script>
export default {
  name: 'vx-card-select',
  props: {
    cardList: {
      type: Array,
      default: () => {
        return [];
      },
    },
    detault: {
      type: Number,
    },
  },
  data() {
    return {
      isBillSelectorShow: false,
      creditCardIndexSelected: 0,
      cardNum: '',
      companyName: '',
      picImg: require(`@/assets/images/bank/undefined.png`),
      cardDataList: [],
    };
  },
  created() {
    this.cardDataList = this.cardList.map((item, index) => {
      item.value = index;
      item.picImg = 'undefined';
      return item;
    });
    this.creditCardIndexSelected = this.detault;
    this.cardNum = this.cardDataList[this.detault].acNo;
    this.companyName = this.cardDataList[this.detault].companyName;
    this.picImg = require(`@/assets/images/bank/${this.cardDataList[this.detault].bkctgrycd || 'undefined'}.png`);
  },
  methods: {
    changeCard(index, item) {
      this.creditCardIndexSelected = index;
      this.cardNum = item.acNo;
      this.companyName = item.companyName;
      this.picImg = require(`@/assets/images/bank/${item.bkctgrycd || 'undefined'}.png`);
      this.$emit('change-card', index, item);
    },
  },
};
</script>

<style lang="scss">
.vx-card-select {
  background-color: #fff;
  .ui-icon.icon-font::before {
    font-size: 26px;
    line-height: 24px;
    margin: 10px 0 0 18px;
    position: relative;
    top: -2px;
  }
  .vx-selector .ui-radio-item.is-selected {
    background-color: #f5f8ff;
  }
  //银行卡列表的对号图
  .img-wrap {
    width: 60px;
    height: 60px;
    position: absolute;
    right: 24px;
    img {
      height: 100%;
    }
  }
  .bank-flex-between {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .bank-select {
    height: 108px;
    .company-logo-name {
      font-size: 32px;
      font-weight: bold;
      img {
        width: 80px;
        margin-top: 10px;
      }
      .bank-name {
        margin-left: 24px;
      }
    }
    .cardnum {
      margin-left: 16px;
      font-size: 32px;
      font-weight: bold;
      // color: var(--color-primary);
    }
    .ui-icon.icon-font::before {
      font-size: 32px;
    }
  }
  .ui-selector-list {
    .ui-cell-item-body {
      height: 112px;
      padding: 0;
    }
  }
  .vx-selector {
    .selector-item-body {
      display: flex;
      flex-direction: row;
      align-content: center;
      text-align: center;
      padding: 0;
      .selector-item-content {
        font-weight: 700;
        .selector-item-title {
          text-align: left;
        }
        .selector-item-brief {
          margin-top: 0;
          color: #333;
          text-align: left;
          font-size: var(--font-body-large);
        }
      }
      .selector-item-left {
        img {
          width: 64px;
          height: 64px;
        }
      }
    }
  }
  .ui-popup-title-bar {
    border-bottom: 1px #f2f2f2 solid;
    .title-bar-title {
      padding-top: 0;
      display: flex;
      justify-content: center;
    }
    .title {
      font-size: 32px;
    }
  }
}
</style>

let loading = document.getElementById('loading');
let maskStatus = { queueLength: 0, working: false };

/** 请求前拦截，保证只产生一个遮罩层 */
export const beforeSend = function(options) {
  maskStatus.queueLength++;
  options.start = Date.now();
  //   console.log('[remote] beforeSend...requestQueueLength:' + maskStatus.queueLength);
  // 不判断是否存在调用多次会不会有问题。。。
  if (!maskStatus.working) {
    loading.style.display = 'block';
    maskStatus.working = true;
  }
};

export const afterSend = function() {
  maskStatus.queueLength--;
  if (maskStatus.queueLength === 0 && maskStatus.working) {
    maskStatus.working = false;
    loading.style.display = 'none';
  }

  return maskStatus.queueLength;
};

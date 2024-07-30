const { createApp, ref, onMounted } = window.Vue;

createApp({
  template: `
    <div class="view-container" :style="{ height: viewHeight + 'px' }">
        <div class="content-container" :style="{ height: itemHeight *  data.length + 'px' }"></div>
        <div class="item-container" :style="{ transform: 'translateY(' + scrollTop + 'px)' }">
            <div 
            class="item" 
            :style="{ height: itemHeight + 'px' }"
            v-for="(item, index) in showData"
            :key="index">
                {{ item }}
            </div>
        </div>
    </div>
  `,
  setup() {
    const data = new Array(500).fill(0).map((_, i) => i); // 模拟真实数据
    const viewHeight = ref(400); // 可视容器高度
    const itemHeight = ref(20); // 每一项的高度

    const showData = ref([]); // 显示的数据
    showData.value = data.slice(0, 20); // 初始展示的数据 （前20个）

    const scrollTop = ref(0); // 初始滚动距离
    // 滚动事件
    const handleScroll = (e) => {
      // 获取滚动距离
      scrollTop.value = e.target.scrollTop;

      // 初始索引 = 滚动距离 / 每一项的高度
      const startIndex = Math.round(scrollTop.value / itemHeight.value);
      // 结束索引 = 初始索引 + 容器高度 / 每一项的高度
      const endIndex = startIndex + viewHeight.value / itemHeight.value;
      // 根据初始索引和结束索引，截取数据
      showData.value = data.slice(startIndex, endIndex);
    };

    onMounted(()=>{
        document.querySelector('.view-container').addEventListener('scroll', handleScroll)
    })

    return {
      data,
      viewHeight,
      itemHeight,
      showData,
      scrollTop,
      handleScroll
    };
  }
}).mount('#app');

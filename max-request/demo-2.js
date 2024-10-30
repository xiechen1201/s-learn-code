function makeRequest(index) {
  // 返回一个 Promise，模拟异步请求
  return new Promise((resolve, reject) => {
    // 使用 setTimeout 模拟异步操作，随机延迟一段时间
    setTimeout(() => {
      console.log(`Request ${index} completed.`);
      // 请求成功时调用 resolve，传递请求的索引
      resolve(index);
    }, Math.random() * 1000);
  });
}

function manageRequestsWithLimit(totalRequests, concurrentLimit) {
  let inProgressCount = 0; // 正在进行中的请求数量
  let completedCount = 0; // 已完成的请求数量
  const requestQueue = []; // 请求队列

  function addRequestToQueue() {
    // 如果还未完成所有请求
    if (completedCount < totalRequests) {
      const requestIndex = completedCount + inProgressCount;
      // 将新请求添加到队列中
      requestQueue.push(makeRequest(requestIndex));
    }
  }

  function handleRequestCompletion() {
    // 已完成请求数量加一
    completedCount++;
    // 正在进行中的请求数量减一
    inProgressCount--;
    // 添加新请求到队列
    addRequestToQueue();
    // 如果所有请求都已完成，打印提示信息
    if (completedCount === totalRequests) {
      console.log('All requests completed.');
    }
  }

  // 初始化时添加指定数量的请求到队列
  for (let i = 0; i < concurrentLimit; i++) {
    addRequestToQueue();
  }

  // 遍历请求队列，为每个请求添加处理逻辑
  requestQueue.forEach((request) => {
    request.then(handleRequestCompletion).catch((error) => {
      // 请求失败时打印错误信息并处理请求完成逻辑
      console.error(`Request failed: ${error}`);
      handleRequestCompletion();
    });
    // 正在进行中的请求数量加一
    inProgressCount++;
  });
}

// 调用函数，传入总请求数和并发限制数
manageRequestsWithLimit(100, 10);
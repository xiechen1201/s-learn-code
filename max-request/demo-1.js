function request(url) {
  // 模拟一个异步请求
  return new Promise((resolve) => {
    const timeout = Math.random() * 2000; // 随机延时
    setTimeout(() => {
      console.log(`Completed: ${url} after ${timeout.toFixed(2)}ms`);
      resolve(url);
    }, timeout);
  });
}

async function handleConcurrentRequests(urls, maxConcurrent) {
  let index = 0; // 用于记录下一个请求的索引
  const results = []; // 保存所有请求结果
  const executing = []; // 保存当前正在执行的请求

  // 递归函数：每次发出请求并确保并发数量
  const enqueue = async () => {
    if (index === urls.length) {
      return Promise.resolve(); // 所有请求已经发出
    }

    const currentIndex = index++; // 获取当前请求索引并自增
    const promise = request(urls[currentIndex]); // 发出请求

    // 将请求的 promise 添加到执行队列中
    results.push(promise);

    // 当请求完成后，将其从执行队列中移除，并发出新的请求
    promise.then(() => executing.splice(executing.indexOf(promise), 1));

    // 将当前请求加入执行队列，并等待它完成
    executing.push(promise);

    let p = Promise.resolve();
    // 如果当前的并发数达到最大限制，则等待其中一个请求完成
    if (executing.length >= maxConcurrent) {
      p = Promise.race(executing);
    }

    // 等待其中一个请求完成后继续递归发出下一个请求
    await p;
    return enqueue();
  };

  // 开始执行第一个请求
  await enqueue();
  return Promise.all(results); // 返回所有请求的结果
}

// 示例请求 URL 列表
const urls = Array.from({ length: 100 }, (_, i) => `http://example.com/api/${i}`);

// 控制并发数为 5
handleConcurrentRequests(urls, 5).then((results) => {
  console.log('All requests completed');
});
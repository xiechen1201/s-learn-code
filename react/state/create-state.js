function createState(initialValue) {
    let state = initialValue; // 初始 state
    let queue = []; // 更新队列

    function setState(updater) {
        if (typeof updater === "function") {
            queue.push(updater); // 追加到队列
        } else {
            queue.push(() => updater); // 转换为函数
        }

        // 模拟 React 在下一次渲染时批量更新
        Promise.resolve().then(() => {
            while (queue.length) {
                const updateFn = queue.shift(); // 依次执行队列中的更新函数
                state = updateFn(state); // 计算新 state
            }
            console.log("Updated state:", state);
        });
    }

    return [() => state, setState];
}

// 测试
const [getNumber, setNumber] = createState(0);

setNumber((n) => n + 1);
setNumber((n) => n + 1);
setNumber((n) => n + 1);

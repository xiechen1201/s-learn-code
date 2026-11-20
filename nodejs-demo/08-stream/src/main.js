import fs from "node:fs";
import { mkdir } from "node:fs/promises";
import { pipeline } from "node:stream/promises";
import { parse } from "csv-parse";

import { JSONLStream } from "./streams/jsonl-stream.js";

// 异步生成器：过滤成年用户
async function* filterAdults(source, stats) {
  for await (const user of source) {
    stats.total++;

    const age = Number(user.age);

    if (!Number.isFinite(age)) {
      throw new Error(`用户 ${user.id} 的年龄不合法: ${user.age}`);
    }

    if (age < 18) {
      stats.filtered++;
      continue;
    }

    stats.output++;

    yield {
      ...user,
      age
    };
  }
}

async function main() {
  const stats = {
    total: 0,
    filtered: 0,
    output: 0
  };

  await mkdir("./output", { recursive: true });

  // 1. 创建文件读取流
  const readable = fs.createReadStream("./data/users.csv");

  // 2. 创建 CSV 解析流
  const parser = parse({
    columns: true,
    skip_empty_lines: true,
    trim: true
  });

  // 3. 创建 JSONL 转换流
  const jsonl = new JSONLStream();

  // 4. 创建文件写入流
  const writable = fs.createWriteStream("./output/users.jsonl");

  console.time("处理耗时");

  try {
    await pipeline(readable, parser, filterAdults(stats), jsonl, writable);

    console.timeEnd("处理耗时");

    console.log("\n数据处理完成：");
    console.table(stats);
  } catch (error) {
    console.error("数据处理失败：", error);
    process.exitCode = 1;
  }
}

main();

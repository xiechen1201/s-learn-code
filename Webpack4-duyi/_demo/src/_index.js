/* let str = `502	马来西亚
466	台湾
510	印度尼西亚
505	澳大利亚
525	新加坡
455	澳门
530	新西兰
310	美国
515	菲律宾
520	泰国
452	越南
240	瑞典
234	英国
454	香港
232	奥地利
413	斯里兰卡
242	挪威
440	日本
404	印度
204	荷兰
450	南韩
286	土耳其
456	柬埔寨
248	爱沙尼亚 
268	葡萄牙
219	克罗地亚  
208	法国
302	加拿大
244	芬兰
284	保加利亚
216	匈牙利
231	斯洛伐克 
214	西班牙
228	瑞士
238	丹麦
230	捷克
202	希腊
269	波兰
226	罗马尼亚
247	拉脱维亚
280	塞浦路斯
250	俄罗斯
655	南非
206	比利时
270	卢森堡
293	斯洛文尼亚
420	沙特阿拉伯
602	埃及
262	德国
334	墨西哥
722	阿根廷
724	巴西
272	爱尔兰
222	意大利
278	马耳他
457	老挝
424	阿拉伯联合酋长国
730	智利
472	马尔代夫
429	尼泊尔
212	摩洛哥`;

const arr1 = str.split("\n");

const arr2 = arr1.map((el) => {
    return el.split("\t");
});

const obj = {};

const arr3 = arr2.map((el) => {
    return {
        id: el[0],
        value: el[1]
    };
});

console.log(arr3);
 */

import pinyin from "pinyin";

let finisheList = [];
let countrys = [
    { id: "502", value: "马来西亚" },
    { id: "466", value: "台湾" },
    { id: "510", value: "印度尼西亚" },
    { id: "505", value: "澳大利亚" },
    { id: "525", value: "新加坡" },
    { id: "455", value: "澳门" },
    { id: "530", value: "新西兰" },
    { id: "310", value: "美国" },
    { id: "515", value: "菲律宾" },
    { id: "520", value: "泰国" },
    { id: "452", value: "越南" },
    { id: "240", value: "瑞典" },
    { id: "234", value: "英国" },
    { id: "454", value: "香港" },
    { id: "232", value: "奥地利" },
    { id: "413", value: "斯里兰卡" },
    { id: "242", value: "挪威" },
    { id: "440", value: "日本" },
    { id: "404", value: "印度" },
    { id: "204", value: "荷兰" },
    { id: "450", value: "南韩" },
    { id: "286", value: "土耳其" },
    { id: "456", value: "柬埔寨" },
    { id: "248", value: "爱沙尼亚 " },
    { id: "268", value: "葡萄牙" },
    { id: "219", value: "克罗地亚  " },
    { id: "208", value: "法国" },
    { id: "302", value: "加拿大" },
    { id: "244", value: "芬兰" },
    { id: "284", value: "保加利亚" },
    { id: "216", value: "匈牙利" },
    { id: "231", value: "斯洛伐克 " },
    { id: "214", value: "西班牙" },
    { id: "228", value: "瑞士" },
    { id: "238", value: "丹麦" },
    { id: "230", value: "捷克" },
    { id: "202", value: "希腊" },
    { id: "269", value: "波兰" },
    { id: "226", value: "罗马尼亚" },
    { id: "247", value: "拉脱维亚" },
    { id: "280", value: "塞浦路斯" },
    { id: "250", value: "俄罗斯" },
    { id: "655", value: "南非" },
    { id: "206", value: "比利时" },
    { id: "270", value: "卢森堡" },
    { id: "293", value: "斯洛文尼亚" },
    { id: "420", value: "沙特阿拉伯" },
    { id: "602", value: "埃及" },
    { id: "262", value: "德国" },
    { id: "334", value: "墨西哥" },
    { id: "722", value: "阿根廷" },
    { id: "724", value: "巴西" },
    { id: "272", value: "爱尔兰" },
    { id: "222", value: "意大利" },
    { id: "278", value: "马耳他" },
    { id: "457", value: "老挝" },
    { id: "424", value: "阿拉伯联合酋长国" },
    { id: "730", value: "智利" },
    { id: "472", value: "马尔代夫" },
    { id: "429", value: "尼泊尔" },
    { id: "212", value: "摩洛哥" }
];

let res = countrys.map((el) => {
    let letter = pinyin(el.value[0], { style: "first_letter" })[0][0];

    const isHas = finisheList.find((item) => item.key === letter);

    if (isHas) {
        finisheList.forEach((item) => {
            if( item.key === letter ){
                item.countrys.push(el);
            }
        })
    } else {
        finisheList.push({
            key: letter,
            countrys: [el]
        });
    }
});

finisheList.sort(function(a,b){
    return a.key.charCodeAt() - b.key.charCodeAt();
})

console.log(1);
console.log(finisheList);
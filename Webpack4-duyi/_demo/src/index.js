let str = `502	马来西亚	Malaysia
466	台湾	Taiwan(China)
510	印度尼西亚	Indonesia
505	澳大利亚\tAustralia
525	新加坡	Singapore
455	澳门	Macao(China)
530	新西兰	New Zealand
310	美国	America
515	菲律宾	The Philippines
520	泰国	Thailand
452	越南	Vietnam
240	瑞典	Sweden
234	英国	England
454	香港	Hongkong(China)
232	奥地利	Austria
413	斯里兰卡\tSri Lanka
242	挪威	Norway
440	日本	Japan
404	印度	India
204	荷兰	Netherlands
450	南韩	South korea
286	土耳其	Turkey
456	柬埔寨	Cambodia
248	爱沙尼亚\tEstonia
268	葡萄牙	Portugal
219	克罗地亚\tCroatia
208	法国	France
302	加拿大	Canada
244	芬兰	Finland
284	保加利亚	Bulgaria
216	匈牙利	Hungary
231	斯洛伐克 	Slovakia
214	西班牙	Spain
228	瑞士	Switzerland
238	丹麦	Denmark
230	捷克	Czech Republic
202	希腊	Greece
269	波兰	Poland
226	罗马尼亚	Romania
247	拉脱维亚	Latvia
280	塞浦路斯	Cyprus
250	俄罗斯	Russia
655	南非	South Africa
206	比利时	Belgium
270	卢森堡	Luxembourg
293	斯洛文尼亚	Slovenia
420	沙特阿拉伯	Saudi Arabia
602	埃及	Egypt
262	德国	Germany
334	墨西哥	Mexico
722	阿根廷	Argentina
724	巴西	Brazil
272	爱尔兰	Ireland
222	意大利	Italy
278	马耳他	Malta
457	老挝	Laos
424	阿拉伯联合酋长国	United Arab Emirates
730	智利	Chile
472	马尔代夫	Maldives
429	尼泊尔	Nepal
212	摩洛哥\tMorocco`;

let result = str.split("\n").map((item) => {
    return item.split("\t");
});

let arr = [];
result.forEach((item) => {
    arr.push({
        id: item[0],
        value: item[2]
    });
});


let finisheList = [];
arr.forEach((item) => {
    const isHas = finisheList.find((el) => el.key === item.value[0]);

    if (isHas) {

        finisheList.forEach(a=>{
            if(a.key === item.value[0]){
                a.countrys.push(item);
            }
        })

    } else {
        finisheList.push({
            key: item.value[0],
            countrys: [item]
        });
    }
});

console.log(JSON.stringify(finisheList));

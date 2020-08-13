// import './cityData.json';

let xhr = new XMLHttpRequest();

xhr.open('get', 'https://raw.githubusercontent.com/kiang/pharmacies/master/json/points.json');

xhr.send();
xhr.onload = function() {
    let maskData = JSON.parse(xhr.responseText).features;
    let maskContent = document.querySelector('.sideBarContent');
    let countySelector = document.querySelector('.countySelector');
    let townSelector = document.querySelector('.townSelector');
    
    // 取得 sideBarContent 樣板
    let str = '';
    for (let i = 0; i < maskData.length; i++) {
        let maskDateName = maskData[i].properties.name;
        let maskDateAddress = maskData[i].properties.address;
        let maskDatePhone = maskData[i].properties.phone;
        let maskDateNote = maskData[i].properties.note;
        let maskDateAdult = maskData[i].properties.mask_adult;
        let maskDateChild = maskData[i].properties.mask_child;
        
        str += `
        <div class="sideBarContentBox">
            <strong class="sideBarContentBoxTitle">${ maskDateName }</strong>
            <div class="sideBarContentBoxData">
                <span>${ maskDateAddress }</span>
                <span>${ maskDatePhone }</span>
                <span>${ maskDateNote }</span>
            </div>
            <div class="sideBarContentBoxTitleCount">
                <div class="countBox countAdult">
                    <span>成人口罩</span>
                    <span>${ maskDateAdult }</span>
                </div>
                <div class="countBox countKid">
                    <span>兒童口罩</span>
                    <span>${ maskDateChild }</span>
                </div>
            </div>
        </div>
        `
    }
    maskContent.innerHTML = str;

    // 取得縣名
    let maskCountyAll = maskData.map(item => {
        return item.properties.county;
    })
    let maskCounty = maskCountyAll.filter((item, index, arr) => {
        return arr.indexOf(item) === index;
    })
    let spaceCounty = maskCounty.indexOf('');
    if (spaceCounty > -1) {
        maskCounty.splice(spaceCounty, 1);
    }
    let countyOptions = '';
    for(let i = 0; i < maskCounty.length; i++) {
        countyOptions += `
        <option value="${maskCounty[i]}">${ maskCounty[i] }</option>
        `
    }
    countySelector.innerHTML = `<option value="">-- 請選擇縣市 --</option>` + countyOptions;

    // 取得行政區
    let maskTownAll = maskData.map(item => {
        return item.properties.town;
    })
    let maskTown = maskTownAll.filter((item, index, arr) => {
        return arr.indexOf(item) === index;
    })
    let spaceTown = maskTown.indexOf('');
    if (spaceTown > -1) {
        maskTown.splice(spaceTown, 1);
    }
    let townOptions = '';
    for(let i = 0; i < maskTown.length; i++) {
        townOptions += `
        <option value="${maskTown[i]}">${ maskTown[i] }</option>
        `
    }
    townSelector.innerHTML = `<option value="">-- 請選擇行政區 --</option>` + townOptions;

    // 取得地址
    // let maskAddressAll = maskData.map(item => {
    //     return item.properties.address;
    // })
}


// 日期相關
function getDate () {
    let date = new Date();
    let day = date.getDay();
    let today = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();
    let changeChinese = changeDayChinese(day);
    let maskNumber = getMaskNumber();


    document.querySelector('.sideBarHeadWeek > span').textContent = changeChinese;
    document.querySelector('.sideBarHeadDataDate').textContent = `${year}-${month}-${today}`;
    document.querySelector('.sideBarHeadDataId > span').textContent = maskNumber;

    // 數字轉中文字
    function changeDayChinese (day) {
        switch (day) {
            case 1:
                day = "一";
                break;
            case 2:
                day = "二";
                break;
            case 3:
                day = "三";
                break;
            case 4:
                day = "四";
                break;
            case 5:
                day = "五";
                break;
            case 6:
                day = "六";
                break;
            case 7:
                day = "日";
                break;
        }
        return day;
    }

    // 判斷為奇偶數
    function getMaskNumber () {
        if (day%2 === 0) {
            return '2,4,6,8,0'
        }
        else if (day === 7) {
            return '不限'
        }
        else {
            return '1,3,5,7,9'
        }
    }
}

// 選項
// let changeCountySelector = document.querySelector('.countySelector');
// let changeTownSelector = document.querySelector('.townSelector');
// let select = {
//     county: '',
//     town: ''
// }

// changeCountySelector.addEventListener('change', changeCountySelectorMethod);
// changeTownSelector.addEventListener('change', changeTownSelectorMethod);
// function changeCountySelectorMethod () {
//     select.county = this.value;
// };
// function changeTownSelectorMethod () {
//     select.town = this.value;
//     console.log(select);
// }



getDate();



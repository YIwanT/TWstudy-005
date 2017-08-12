function fcount(collection, ch) {
    for (let item of collection) {
        if (item.key == ch){
            return true ;
        }

    }
return false;
}
function finditem(collection, ch ) {
    for (let item of collection) {
        if (item.barcode == ch) {
            return item ;
        }
    }
    return null;
}
function discount(collection, ch ) {
    for (let item of collection) {
        for (let obj of item.barcodes){
            if (obj == ch ){
                return true ;
            }
        }
    }
    return false;
}
function find(collection, ch ) {
    for (let item of collection) {
        if (item.key == ch) {
            return item ;
        }
    }
    return null;
}
module.exports = function printInventory(inputs) {
let result = '***<没钱赚商店>购物清单***\n';
const Datbase = require('./datbase.js');
const AllItem = Datbase.loadAllItems();
const Promotions = Datbase.loadPromotions();
let inputsplit = [] ;
let discountarray = [];
let sum = 0 ;
let less = 0 ;
    for (let item of inputs) {
    if (item.includes('-')){
        let array = item.split('-');
        inputsplit.push({key: array[0], count: array[1]});
        }else
        {
            inputsplit.push({key: item , count: 1});
        }
    }
    let quchong = [];
    for (let item of inputsplit) {
        let obj = find(quchong, item.key);
        if (obj){
            obj.count += item.count;
        }
        else {
            quchong.push({key:item.key,count: item.count});
        }
    }
    for (let item of  quchong) {
        if (discount(Promotions, item.key)){
            if (item.count > 2 ){
                discountarray.push({key:item.key, count: 1});
            }

        }
    }
    for (let item of quchong) {
        let obj = finditem(AllItem, item.key);
        result += '名称：' + obj.name + '，数量：' + item.count + obj.unit + '，单价：' + obj.price.toFixed(2) + '(元)，小计：';

        if (obj)
            if (fcount(discountarray, item.key)) {
               item.count-- ;
            }
        result += (obj.price * item.count).toFixed(2)+'(元)\n';
        sum += obj.price * item.count;
    }
    result += '----------------------\n' + '挥泪赠送商品：\n';
    for (let item of discountarray) {
        let obj = finditem(AllItem, item.key);
        if (obj) {
            result += '名称：' + obj.name + '，数量：'+ item.count + obj.unit + '\n';
        }
        less += obj.price;
    }
    result += '----------------------\n'+ '总计：' + sum.toFixed(2) + '(元)\n' + '节省：' + less.toFixed(2) + '(元)\n' +'**********************';



    console.log(result);
return result ;
};

function includes(collection, string) {
    for (let item of collection) {
        if (item.barcode == string){
            return item ;
        }
    }
    return null ;
}
function freeincludes(collection, string) {
    for (let item of collection) {
        for (let obj of item.barcodes) {
            if (obj == string){
                return string ;
            }
        }

    }
    return null ;
}
module.exports = function printInventory(inputs) {
let result = '';
const Datbase = require('./datbase.js');
const AllItem = Datbase.loadAllItems();
const Promotions = Datbase.loadPromotions();
let  inputitem = [] ;
let  promotionitems = [] ;

    for (let item of inputs) {
        let obj = includes(AllItem, item);
        if(obj) {
            inputitem.push(obj);
        }
        promotionitems.push(freeincludes(Promotions, item));
    }
    console.log(promotionitems);
return result ;
};
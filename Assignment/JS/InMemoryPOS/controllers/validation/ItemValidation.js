const ITEM_CODE_REGEX = /^(I00-)[0-9]{3}$/;
const ITEM_NAME_REGEX = /^[A-Za-z ]{5,}$/;
const ITEM_PRICE_REGEX = /^[0-9]{2,}([.][0-9]{})?$/;
const ITEM_QTY_REGEX = /^[0-9]{2,}([.][0-9]{})?$/;

let itemArray = new Array();

itemArray.push({field:$("#txtItemCode"), regEx:ITEM_CODE_REGEX});
itemArray.push({field:$("#txtItemName"), regEx:ITEM_NAME_REGEX});
itemArray.push({field:$("#txtItemPrice"), regEx:ITEM_PRICE_REGEX});
itemArray.push({field:$("#txtItemQty"), regEx:ITEM_QTY_REGEX});
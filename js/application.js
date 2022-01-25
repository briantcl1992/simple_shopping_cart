var updateItemValue = function(ele) {
    var price = Number($(ele).find('.item-price').text().replace(/\$/,""));
    var quantity = Number($(ele).find('.item-qty').find('.quantity').val());
    //console.log(price);
    //console.log(quantity);
    var itemValue = price * quantity;
    if (itemValue != 0) {
      $(ele).children('.item-subtotal').text("$" + itemValue);
    } else {
        $(ele).children('.item-subtotal').text("$--.--");
    }
    return itemValue;
};
var sum = function (acc, x) { return acc + x;};
var updateTotalPrice = function() {
    var itemValues = [];
    $('.item').each(function(i,ele){
        console.log(ele);
        var itemValue = updateItemValue(ele);
        itemValues.push(itemValue);
    })
    //console.log(itemValues);
    const itemValuesClean = itemValues.filter(function (value) {
        return !Number.isNaN(value);
    });
    var totalPrice = itemValuesClean.reduce(sum);
    console.log(totalPrice);
    $('#total-price').html(totalPrice);
}

$( document ).ready(function() {
    console.log("ready")
    updateTotalPrice();
})
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
        //console.log(ele);
        var itemValue = updateItemValue(ele);
        itemValues.push(itemValue);
    })
    //console.log(itemValues);
    const itemValuesClean = itemValues.filter(function (value) {
        return !Number.isNaN(value);
    });
    var totalPrice = itemValuesClean.reduce(sum);
    console.log(totalPrice);
    if (totalPrice !=0){
        $('#total-price').html("$ " + totalPrice);
    } else{
        $('#total-price').html("$--.--");
    }
}

$( document ).ready(function() {
    console.log("ready")
    updateTotalPrice();
    
    $(document).on('keyup', '.quantity', function(){
        updateTotalPrice();
    });

    $(document).on('click','#fork',function(){
        var name = $('#name').val();
        var cost = $('#cost').val();
        $('#item-list').prepend('<div class="row item">\
        <div class="item-name col-xs-3">\
          '+ name +'\
        </div>\
        <div class="item-price col-xs-3">\
          $' + cost + '.00 \
        </div> \
        <div class="item-qty col-xs-3"> \
          <label>QTY</label> \
          <input class="quantity" type="number"> \
        </div> \
        <div class="col-xs-1"> \
          <button class="remove"> \
            Remove \
          </button> \
        </div> \
        <div class="item-subtotal col-xs-2"> \
        $--.-- \
        </div> \
      </div>');
    });

    $(document).on('click','.remove',function(){
        $(this).parents('.row').remove();
        updateTotalPrice();
    })

})
(function(){
	$.get('/products', appendToList);
    $.get('/carts', appendToCartList);
	function appendToList (products) {
		var list = [];
		var content, product;
		for (var i in products) {
			product =  products[i];
			content = '<a href="/products/'+ product +'">Product'+product+ '</a>' + '<a href="#" data-product="' + product + '"><img src="editing-delete-icon.png" style="width:15px"></a>';
			list.push($('<li>', {html: content}));
		};
		$('.product-list').append(list);
	}
    function appendToCartList (carts) {
        var list = [];
        var content, cart;
        for (var i in carts) {
            cart =  carts[i];
            content = '<a href="/carts/'+ cart +'">cart'+cart+ '</a>' + '<a href="#" data-cart="' + cart + '"><img src="editing-delete-icon.png" style="width:15px"></a>';
            list.push($('<li>', {html: content}));
        };
        $('.cart-list').append(list);
    }
	$('#create').on('submit', function(event) {
		event.preventDefault();
		var form =  $(this);
		var productData = form.serialize();
		$.ajax({
			url: '/products',
			type: 'POST',
			data: productData
		})
		.done(function(products) {
			console.log("success");
			location.reload();
			form.trigger('reset')
		})
		.fail(function() {
			console.log("error");
		})
		.always(function() {
			console.log("complete");
		});
	});
	$('#update').on('submit', function(event) {
		event.preventDefault();
		var form =  $(this);
		var productData = form.serialize();
		$.ajax({
			url: '/products/'+ $('#productIndexId').val(),
			type: 'PUT',
			data: productData
		})
		.done(function(products) {
			console.log("success");
			location.reload();
			form.trigger('reset')
		})
		.fail(function() {
			console.log("error");
		})
		.always(function() {
			console.log("complete");
		});
	});
	$('.product-list').on('click', 'a[data-product]', function(event) {
		event.preventDefault();
		if (!confirm('Are you sure?')) {
        	return false;
		}
		var target =  $(event.currentTarget);
		$.ajax({
			type:'DELETE',
			url: '/products/'+ target.data('product')
		}).done(function(){
			target.parents('li').remove();
		});
	});
})();
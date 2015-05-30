(function(){
	$.get('/products', appendToList);
	function appendToList (products) {
		var list = [];
		var content, product;
		for (var i in products) {
			product =  products[i];
			content = '<a href="/products/'+ product +'">'+product+ '</a>' + '<a href="#" data-product="' + product + '"><img src="editing-delete-icon.png" style="width:15px"></a>';
			list.push($('<li>', {html: content}));
		};
		$('.product-list').append(list);
	}
	$('form').on('submit', function(event) {
		event.preventDefault();
		var form =  $(this);
		var productData = form.serialize();
		$.ajax({
			url: '/products',
			type: 'POST',
			data: productData
		})
		.done(function(productName) {
			console.log("success");
			appendToList([productName]);
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
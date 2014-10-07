$(document).ready(function() {
	$('#mobile-nav').hide();
	$('.mobile-nav-icon').click(function() {
		$('#mobile-nav').slideToggle(200);
	});

	$('.mobile-menu-tags').click(function() {
		$('#mobile-nav').hide();
	});
});
$(document).ready(function(){
    //click big red see more articles button scrapes the source
    $('#scrape-btn').on('click', function(event){
        event.preventDefault();
        $.ajax({
            method:"get",
            url:'/scrape'
        })
        window.location.reload(true);
    })
    //clicking any delete button removes comments
    $('.delete-btn').on('click', function(event){
        event.preventDefault();
        var queryUrl = window.location.href + '/' + $(this).data('id');
        $.ajax({
            method:"delete",
            url:queryUrl
        })
        window.location.reload(true);
    })
});

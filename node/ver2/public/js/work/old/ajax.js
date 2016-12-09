$("#ajax").on('click', function(){
    $.post("/listcontrol", function(data, status){
        for ( x in data){
            $('#mytable > tbody:last-child').append('<tr><td>'+data[x].Control_name+'</td><td>'+String(data[x].Status)+'</td></tr>');
        }
    });
});
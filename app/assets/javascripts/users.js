$(document).ready(function(){
  // var refresh_stocks_table = function(){
  //   $.ajax({
  //     dataType: "script",
  //     type: "get",
  //     url: "/users/refresh_table"
  //   });
  // };

  // $("#refresh_stocks").on('click', refresh_stocks_table);

  // setInterval(refresh_stocks_table, 1000);

  var stock_hash = { }

  $('.symbul').each(function() {
    stock_hash[$(this).text()] = [];
  });

  var create_graph = function(stock_data){
    stock_hash[stock_data['symbol']].push(stock_data);
    console.log(stock_hash)
    Morris.Line({
      element: 'morris',
      data: stock_hash[stock_data['symbol']],
      xkey: 'time',
      ykeys: ['price'],
      labels: ['price'],
      hideHover: true,
    });
  };


  var send_ajax = function(symbol){
    $.ajax({
      type: "GET",
      url: '/stocks/chart/' + symbol ,
      dataType: "json"
    }).done(create_graph);
  };


  $('.checkbox').on('change', function() {
    var symbol = $(this).find('input').attr('name');
    send_ajax(symbol);
  });

  setInterval(function() {
    $('#morris').empty();
    $("input:checked").each(function() {
      send_ajax($(this).attr('name'));
    });
  }, 5000);


});

// #once it gets more to be a lot then shift
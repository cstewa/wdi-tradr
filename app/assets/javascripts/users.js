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


  // hash with each stock's symbol as the key and the data from the JSON response as the value (an array)
  var stock_hash = { }

  // make an empty hash with the stock symbols as keys (which I got from the checkboxes)
  $('.symbul').each(function() {
    stock_hash[$(this).text()] = [];
  });

  //add each bit of stock data (price at a given time) as a new item in the array which pertains to that stock
  //create a div with that stock's symbol and append a line graph to it
  var create_graph = function(stock_data){
    stock_hash[stock_data['symbol']].push(stock_data);
    console.log(stock_hash)
    $('#morris').append('<div id="chart_'+ stock_data['symbol'] + '"></div>')
    Morris.Line({
      element: 'chart_' + stock_data['symbol'],
      data: stock_hash[stock_data['symbol']],
      xkey: 'time',
      ykeys: ['price'],
      labels: ['price'],
      hideHover: true,
    });
  };

  //send the stock info so it can interact with the db and the Stock model methods so we can get the response
  var send_ajax = function(symbol){
    $.ajax({
      type: "GET",
      url: '/stocks/chart/' + symbol ,
      dataType: "json"
    }).done(create_graph);
  };

  // display the graph the first time a stock checkbox is checked
  $('.checkbox').on('change', function() {
    var symbol = $(this).find('input').attr('name');
    send_ajax(symbol);
  });

  //get new stock data for whatever's checked every 5 seconds
  setInterval(function() {
    $('#morris').empty();
    $("input:checked").each(function() {
      send_ajax($(this).attr('name'));
    });
  }, 5000);


});

// #once it gets more to be a lot then shift

var labels_EN = {
    LBL_OVERVIEW: "Overview",
    LBL_WAITING_ORDERS: "Waiting Orders",
    LBL_IN_THE_MAKING: "In the Making",
    LBL_READY_TO_DELIVER: "Ready to Deliver",
    LBL_SUMMARY_DELIVERED: "Summary Delivered",
    LBL_MARK_AS_READY: "Mark as Ready",
    LBL_MARK_AS_MAKING: "Mark as Making",
    LBL_MARK_AS_DELIVERED: "Mark as Delivered",
    LBL_ORDER_NR: "Order Nr.",
    LBL_PRODUCT: "Product",
    LBL_INGREDIENTS: "Ingredients",
    LBL_SIZE: "Size",
    LBL_TIME_ORDER: "Time of Order",
    LBL_TODAY: "Today",
    LBL_WEEK: "Week",
    LBL_MONTH: "Month",
    LBL_YEAR: "Year",
    LBL_BAR_GRAPH: "Bar Graph",
    LBL_LINE_GRAPH: "Line Graph"
};

var labels_SV = {
    LBL_OVERVIEW: "Översikt",
    LBL_WAITING_ORDERS: 'Väntande bestlläningar',
    LBL_IN_THE_MAKING: "I skapandet",
    LBL_READY_TO_DELIVER: "Klar att leverera",
    LBL_SUMMARY_DELIVERED: "Sammanfattning Levereras",
    LBL_MARK_AS_READY: "Markera som redo",
    LBL_MARK_AS_MAKING: "Markera som Making",
    LBL_MARK_AS_DELIVERED: "Markera som levererad",
    LBL_ORDER_NR: "Order Nr.",
    LBL_PRODUCT: "Produkt",
    LBL_INGREDIENTS: "Ingredienser",
    LBL_SIZE: "Storlek",
    LBL_TIME_ORDER: "Beställningstid",
    LBL_TODAY: "I dag",
    LBL_WEEK: "Vecka",
    LBL_MONTH: "Månad",
    LBL_YEAR: "År",
    LBL_BAR_GRAPH: "Stapeldiagram",
    LBL_LINE_GRAPH: "Linjediagram"
};

Vue.filter('translate', function (value) {

    if(!value) return '';
    if(userSettings.language === 'EN') {
        if(labels_EN[value]){
            return labels_EN[value];
        } else if(labels_SV[value]) {
            return labels_SV[value];
        }
    } else if(userSettings.language === 'SV') {
        if(labels_SV[value]) {
            return labels_SV[value];
        } else if(labels_EN[value]) {
            return labels_EN[value];
        }
    }
    return value;
});


function openCity(evt, cityName) {
    // Declare all variables
    var i, tabcontent, tablinks;

    // Get all elements with class="tabcontent" and hide them
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }

    // Get all elements with class="tablinks" and remove the class "active"
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }

    // Show the current tab, and add an "active" class to the button that opened the tab
    document.getElementById(cityName).style.display = "block";
    evt.currentTarget.className += " active";
}




//////////////////////////////////////////////////////////////////////////////////////////////////
//                    GRAPH CONSTRUCTION AND DRAW - BEGIN                                       //
//////////////////////////////////////////////////////////////////////////////////////////////////

var graphState = {
    graph_period: "today",
    graph_type: "bar"
};


/*
function drawChart_line() {

    var options = {
        title: 'Most Popular Drinks',
        curveType: 'function',
        legend: { position: 'bottom' }
    };

    var chart = new google.visualization.LineChart(document.getElementById('chart_div'));

    chart.draw(data, options);
}
*/


function drawChart(period, graphType) {

    // Create the data table.
    var data = new google.visualization.DataTable();

    if (graphType === 'line') {

        data.addColumn('number', 'xAxis');
        data.addColumn('number', 'yAxis');

    }

    else if (graphType === 'bar') {

        data.addColumn('string', 'Product Type');
        data.addColumn('number', 'Quantity');

    }

    var currentDate = new Date();

    var filteredOrderData = orderData.filter(function (order){
        if (period === "year") {
            var timeOrder = new Date(order.timeOrder);
            return (timeOrder.getFullYear() === currentDate.getFullYear());
        }

        else if (period === "month"){
            var timeOrder = new Date(order.timeOrder);
            return (timeOrder.getFullYear() === currentDate.getFullYear() &&
                (timeOrder.getMonth() === currentDate.getMonth()));
        }

        else if (period === "week") {
            var timeOrder = new Date(order.timeOrder);
            if (timeOrder.getMonth() === currentDate.getMonth()) {
                return (currentDate.getDate() - timeOrder.getDate() < 7);
            }

            else if (timeOrder.getMonth() === currentDate.getMonth() - 1) {
                var timeOrder = new Date(order.timeOrder);
                var weekDay = 7 - currentDate.getDate();
                return (timeOrder.getDate() > (30 - weekDay));
            }
        }

        else if (period === "today"){
            var timeOrder = new Date(order.timeOrder);
            return (timeOrder.getFullYear() === currentDate.getFullYear());
        }
    }
    );

    if (graphType === 'bar'){

    var productQuantity = {};

    for(var i = 0; i < filteredOrderData.length; i++) {
        var curOrder = filteredOrderData[i];
        if(curOrder.status === "COMPLETE") {
            if(productQuantity[curOrder.product]){
                productQuantity[curOrder.product]++;
            } else {
                productQuantity[curOrder.product] = 1;
            }
        }
    }

    var productQuantityArray = Object.keys(productQuantity).map(function(key) {
        return [key, productQuantity[key]];
    });

        data.addRows(productQuantityArray);

    // Set chart options
    var options = {
        title: 'Most Popular Drinks',
        width: 400,
        height: 300,
        legend: {position: "none"}
    };

    var chart = new google.visualization.ColumnChart(document.getElementById('chart_div'));

    }




    else if (graphType === 'line') {

        if (period === 'year'){
            // yAxis = quantity
            // xAxis = months of year
        }

        else if (period === 'month') {
            // yAxis = quantity
            // xAxis = days of month
        }

        else if (period === 'week') {
            // xAxis = quantity
            // yAxis = days of week
        }

        else if (period === 'today') {
            // xAxis = quantity
            // yAxis = hours of day
        }



        // Set chart options
        var options = {
            title: 'Most Popular Drinks',
            curveType: 'function',
            legend: { position: 'bottom' }
        };

        // Instantiate and draw our chart, passing in some options.
        var chart = new google.visualization.LineChart(document.getElementById('chart_div'));
    }

    chart.draw(data, options);
}

//////////////////////////////////////////////////////////////////////////////////////////////////
//                    GRAPH CONSTRUCTION AND DRAW - END                                       //
//////////////////////////////////////////////////////////////////////////////////////////////////



//////////////////////////////////////////////////////////////////////////////////////////////////
//                             DATA DECLARATION - BEGIN                                         //
//////////////////////////////////////////////////////////////////////////////////////////////////



var orderData = [
    {
        orderNr: "#1",
        product: "Custom",
        ingredients: "strawberry, mango",
        size: "large",
        timeOrder: "2018-01-08T15:05:00.000Z",
        selected: false,
        status: "WAITING"
    },
    {
        orderNr: "#1",
        product: "Custom",
        ingredients: "strawberry, mango",
        size: "large",
        timeOrder: "2018-01-08T15:05:00.000Z",
        selected: false,
        status: "COMPLETE"
    },
    {
        orderNr: "#2",
        product: "Strawberry Sunshine",
        ingredients: "strawberry, sunlight",
        size: "small",
        timeOrder: "2017-07-30T15:05:00.000Z",
        selected: false,
        status: "WAITING"
    },
    {
        orderNr: "#3",
        product: "Custom",
        ingredients: "apple, mango, chilli",
        size: "small",
        timeOrder: "2010-07-30T15:05:00.000Z",
        selected: false,
        status: "WAITING"
    },
    {
        orderNr: "#4",
        product: "Mad Mango",
        ingredients: "mango, madness",
        size: "large",
        timeOrder: "2010-07-30T15:05:00.000Z",
        selected: false,
        status: "WAITING"
    },
    {
        orderNr: "#5",
        product: "Custom",
        ingredients: "strawberry, mango",
        size: "large",
        timeOrder: "2010-07-30T15:05:00.000Z",
        selected: false,
        status: "MAKING"
    },
    {
        orderNr: "#6",
        product: "Strawberry Sunshine",
        ingredients: "strawberry, sunlight",
        size: "small",
        timeOrder: "2010-07-30T15:05:00.000Z",
        selected: false,
        status: "WAITING"
    },
    {
        orderNr: "#6",
        product: "Strawberry Sunshine",
        ingredients: "strawberry, sunlight",
        size: "small",
        timeOrder: "2018-01-05T15:05:00.000Z",
        selected: false,
        status: "COMPLETE"
    },
    {
        orderNr: "#6",
        product: "Strawberry Sunshine",
        ingredients: "strawberry, sunlight",
        size: "small",
        timeOrder: "2018-01-01T15:05:00.000Z",
        selected: false,
        status: "COMPLETE"
    },
    {
        orderNr: "#6",
        product: "Strawberry Sunshine",
        ingredients: "strawberry, sunlight",
        size: "small",
        timeOrder: "2018-01-02T15:05:00.000Z",
        selected: false,
        status: "COMPLETE"
    },
    {
        orderNr: "#7",
        product: "Custom",
        ingredients: "apple, mango, chilli",
        size: "small",
        timeOrder: "2010-07-30T15:05:00.000Z",
        selected: false,
        status: "WAITING"
    },
    {
        orderNr: "#8",
        product: "Mad Mango",
        ingredients: "mango, madness",
        size: "large",
        timeOrder: "2018-07-30T15:05:00.000Z",
        selected: false,
        status: "WAITING"
    },
    {
        orderNr: "#9",
        product: "Mad Mango",
        ingredients: "mango, madness",
        size: "large",
        timeOrder: "2018-07-30T15:05:00.000Z",
        selected: false,
        status: "WAITING"
    },
    {
        orderNr: "#10",
        product: "Mad Mango",
        ingredients: "mango, madness",
        size: "large",
        timeOrder: "2010-07-30T15:05:00.000Z",
        selected: false,
        status: "WAITING"
    },
    {
        orderNr: "#11",
        product: "Mad Mango",
        ingredients: "mango, madness",
        size: "medium",
        timeOrder: "2010-07-30T15:05:00.000Z",
        selected: false,
        status: "WAITING"
    },
    {
        orderNr: "#12",
        product: "Mad Mango",
        ingredients: "mango, madness",
        size: "large",
        timeOrder: "2010-07-30T15:05:00.000Z",
        selected: false,
        status: "WAITING"
    },
    {
        orderNr: "#13",
        product: "Mad Mango",
        ingredients: "mango, madness",
        size: "large",
        timeOrder: "2010-07-30T15:05:00.000Z",
        selected: false,
        status: 'READY'
    },
    {
        orderNr: "#14",
        product: "Strawberry Sunrise",
        ingredients: "mango, madness",
        size: "large",
        timeOrder: "2018-07-30T15:05:00.000Z",
        selected: false,
        status: "COMPLETE"
    },
    {
        orderNr: "#15",
        product: "Mad Mango",
        ingredients: "mango, madness",
        size: "medium",
        timeOrder: "2010-07-30T15:05:00.000Z",
        selected: false,
        status: "COMPLETE"
    },
    {
        orderNr: "#16",
        product: "Mad Mango",
        ingredients: "mango, madness",
        size: "small",
        timeOrder: "2010-07-30T15:05:00.000Z",
        selected: false,
        status: "COMPLETE"
    },
    {
        orderNr: "#17",
        product: "Mad Mango",
        ingredients: "mango, madness",
        size: "medium",
        timeOrder: "2010-07-30T15:05:00.000Z",
        selected: false,
        status: "COMPLETE"
    }

];


//////////////////////////////////////////////////////////////////////////////////////////////////
//                             DATA DECLARATION - END                                           //
//////////////////////////////////////////////////////////////////////////////////////////////////



var viewState = {
    overview_shown: true,
    waiting_shown: false,
    making_shown: false,
    ready_shown: false,
    summary_shown: false,

    graph_today_shown: false,
    graph_week_shown: false,
    graph_month_shown: false,
    graph_year_shown: false
};


//////////////////////////////////////////////////////////////////////////////////////////////////
//                                      VUE - BEGIN                                             //
//////////////////////////////////////////////////////////////////////////////////////////////////

var userSettings = {
    language: 'EN'
};

new Vue({
    el: '#mainContainer',
    data: {
        orders: orderData,
        viewState: viewState,
        userSettings: userSettings
    },
    methods:



        {

            change_lang: function () {
                console.log('change language');
                if(userSettings.language === 'EN') {
                    userSettings.language = 'SV'
                }
                else    {
                    userSettings.language = 'EN'
                }
            },

        toggleSelectionStatus: function (order) {
            order.selected = !order.selected;
        },

        pressStartPreparing: function () {
            console.log("ghbjnfffffffffffffffffffff");
            for (var i = 0; i < orderData.length; i++) {
                var order = orderData[i];
                if (order.selected){
                    order.status = "MAKING";
                    console.log("fffffffffffffffddddddddddddddd");
                    order.selected = false;
                }
            }
        },

        pressMarkAsReady: function () {

            for (var i = 0; i < orderData.length; i++) {
                var order = orderData[i];
                if (order.selected){
                    order.status = "READY";
                    console.log("test");
                    order.selected = false
                }
            }
        },

        pressMarkAsDelivered: function () {

            for (var i = 0; i < orderData.length; i++) {
                var order = orderData[i];
                if (order.selected){
                    order.status = "DELIVERED";
                    console.log("test");
                    order.selected = false
                }
            }
        },

        hide_overview_show_making: function () {
            viewState.overview_shown = false;
            viewState.making_shown = true;
        },
        hide_overview_show_waiting: function () {
            viewState.overview_shown = false;
            viewState.waiting_shown = true;
        },
        hide_overview_show_ready: function () {
            viewState.overview_shown = false;
            viewState.ready_shown = true;
        },
        hide_overview_show_summary: function () {
            viewState.overview_shown = false;
            viewState.summary_shown = true;
        },
        hide_waiting_show_overview: function () {
            viewState.waiting_shown = false;
            viewState.overview_shown = true;
        },
        hide_making_show_overview: function () {
            viewState.making_shown = false;
            viewState.overview_shown = true;
        },
        hide_ready_show_overview: function () {
            viewState.ready_shown = false;
            viewState.overview_shown = true;
        },
        hide_summary_show_overview: function () {
            viewState.summary_shown = false;
            viewState.overview_shown = true;
        },
        hide_waiting_show_making: function () {
            viewState.waiting_shown = false;
            viewState.making_shown = true;
        },
        hide_making_show_ready: function () {
            viewState.making_shown = false;
            viewState.ready_shown = true;
        },

        return_to_overview: function () {
            viewState.waiting_shown = false;
            viewState.making_shown = false;
            viewState.ready_shown = false;
            viewState.summary_shown = false;
            viewState.overview_shown = true;
        },

        show_graph_today: function () {
            viewState.graph_month_shown = false;
            viewState.graph_week_shown = false;
            viewState.graph_year_shown = false;
            viewState.graph_today_shown = true;
            graphState.graph_period = "today";

            // Load the Visualization API and the corechart package.
            google.charts.load('current', {'packages':['corechart']});

            // Set a callback to run when the Google Visualization API is loaded.
            google.charts.setOnLoadCallback(function() {
                console.log(graphState.graph_type);
                drawChart(graphState.graph_period, graphState.graph_type);
            });
        },

        show_graph_week: function () {
            viewState.graph_month_shown = false;
            viewState.graph_week_shown = true;
            viewState.graph_year_shown = false;
            viewState.graph_today_shown = false;
            graphState.graph_period = "week";


            google.charts.load('current', {'packages':['corechart']});

            google.charts.setOnLoadCallback(function() {
                drawChart(graphState.graph_period, graphState.graph_type);
            });
        },

        show_graph_month: function () {
            viewState.graph_month_shown = true;
            viewState.graph_week_shown = false;
            viewState.graph_year_shown = false;
            viewState.graph_today_shown = false;
            graphState.graph_period = "month";


            google.charts.load('current', {'packages':['corechart']});

            google.charts.setOnLoadCallback(function() {
                drawChart(graphState.graph_period, graphState.graph_type);
            });

        },

        show_graph_year: function () {
            viewState.graph_month_shown = false;
            viewState.graph_week_shown = false;
            viewState.graph_year_shown = true;
            viewState.graph_today_shown = false;
            graphState.graph_period = "year";




            google.charts.load('current', {'packages':['corechart']});

            google.charts.setOnLoadCallback(function() {
                drawChart(graphState.graph_period, graphState.graph_type);
            });
        },

        set_graph_type: function(type){

            graphState.graph_type = type;

            google.charts.load('current', {'packages':['corechart']});

            google.charts.setOnLoadCallback(function() {
                drawChart(graphState.graph_period, graphState.graph_type);
            });
        }

    }
});


//////////////////////////////////////////////////////////////////////////////////////////////////
//                                       VUE - END                                              //
//////////////////////////////////////////////////////////////////////////////////////////////////


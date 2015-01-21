 $(function() {

        
        $( "#calculateOptions" ).bind( "click", function(event, ui) {
            $("#cheapestRide" ).collapsible( "collapse" );
            $("#ridingOptions").collapsible("expand");

            var origin;
            if (typeof window.origin === "undefined") {
               origin = $("#source").val();
            } else {
                origin = window.origin;
            }
            //var origin = $("#source").val();
            var destination = $("#dest").val();
            var timeOfPickup = $("input[name*=radio-choice]:checked").val();
            var cabCosts = [];
            var service = new google.maps.DistanceMatrixService();
            
            service.getDistanceMatrix({
                origins: [origin],
                destinations: [destination],
                travelMode: google.maps.TravelMode.DRIVING,
                //unitSystem: metric, This is understood by default.
                durationInTraffic: true,
                avoidHighways: false,
                avoidTolls: false
            }, callback);

            function callback(response, status) {
                if (status == google.maps.DistanceMatrixStatus.OK) {
                var origins = response.originAddresses;
                var destinations = response.destinationAddresses;
                var distance;
                var duration;

                for (var i = 0; i < origins.length; i++) {
                    var results = response.rows[i].elements;
                    for (var j = 0; j < results.length; j++) {
                            var element = results[j];
                            distance = element.distance.text;
                            duration = element.duration.text;
                            console.log("Distance : "+distance);
                            $("#distance").html(distance);
                            console.log("duration : "+duration);
                            $("#travelTime").html(duration);
                            var from = origins[i];
                            var to = destinations[j];
                        }
                    }
                }
                displayTaxiFares(distance,duration);
            }

            function calculateFaresForOla(distance, duration, timeofDay) {
                    //For OLA Sedan:
                    var olaSedanCost;
                    var olaSedan = {};
                    if(distance <= 7.14) {
                        olaSedanCost = 150;
                    } else {
                        olaSedanCost = 150 + (distance - 7.14)*21;
                        olaSedanCost = olaSedanCost.toFixed(2);
                    }
                    olaSedan.type = "OLA Sedan";
                    olaSedan.cost = olaSedanCost;
                    cabCosts.push(olaSedan);
                    
                    //For OLA Mini
                    var olaMiniCost;
                    var olaMini = {};
                    olaMini.type = "OLA Mini";
                    if(distance <= 4) {
                        olaMiniCost = 100;
                    } else {
                        olaMiniCost = 100 + (distance - 4)*15;
                        olaMiniCost = olaMiniCost.toFixed(2);
                    }
                    olaMini.cost = olaMiniCost;
                    cabCosts.push(olaMini);

                    //For OLA Prime
                    var olaPrimeCost;
                    var olaPrime = {};

                    olaPrime.type = "OLA Prime";
                    if(distance <= 5) {
                        olaPrimeCost = 200;
                    } else {
                        olaPrimeCost = 200 + (distance - 5)*17;
                        olaPrimeCost = olaPrimeCost.toFixed(2);
                    }
                    olaPrime.cost = olaPrimeCost;
                    cabCosts.push(olaPrime);
            }

            function calculateFaresForBookMyCab(distance, duration, timeOfPickup) {
                    //For bookmycab
                    //Between 5 am and 12 am

                    if(timeOfPickup === "day") {

                        var listItemHtml;
                        var bmcACCost;
                        var bmcAC = {};
                        bmcAC.type = "bookmycab.com A/C Cool Cabs";

                        if(distance <= 1.5) {
                            bmcACCost = 26;
                        } else {
                            bmcACCost = 26 + (distance - 1.5)*17.50;
                            bmcACCost = bmcACCost.toFixed(2);
                        }
                        bmcAC.cost = bmcACCost;
                        cabCosts.push(bmcAC);
                        
                        var bmcCost;
                        var bmcNonAc = {};
                        bmcNonAc.type = "bookmycab.com Kali Peeli";
                        if(distance <= 1.5) {
                            bmcCost = 21;
                        } else {
                            bmcCost = 21 + (distance - 1.5)*14;
                            bmcCost = bmcCost.toFixed(2);
                        }
                        bmcNonAc.cost = bmcCost;
                        cabCosts.push(bmcNonAc);

                    } else { //It is a night time pick up. 12am - 5am

                        var listItemHtml;
                        var bmcACCost;
                        var bmcAC = {};
                        bmcAC.type = "bookmycab.com A/C Cool Cabs"
                        if(distance <= 1.5) {
                            bmcACCost = 26 + (0.25*23);
                        } else {
                            bmcACCost = (26 + (distance - 1.5)*17.50)*1.25;
                            bmcACCost = bmcACCost.toFixed(2);
                        }

                        bmcAC.cost = bmcACCost;
                        cabCosts.push(bmcAC);
                        
                        var bmcCost;
                        var bmcNonAc = {};
                        bmcNonAc.type = "bookmycab.com Non A/C Kali Peeli";
                        if(distance <= 1.5) {
                            bmcCost = 21 + (0.25*21);
                            bmcCost = bmcCost.toFixed(2);
                        } else {
                            bmcCost = (21 + (distance - 1.5)*14)*1.25;
                            bmcCost = bmcCost.toFixed(2);
                        }

                        bmcNonAc.cost = bmcCost;
                        cabCosts.push(bmcNonAc);

                    }
                     
            }

            function calculateFaresForTaxiForSure(distance, duration, timeOfPickup) {
                //Taxi For Sure
                    //Between 5am and 12 am
                    //For Hatchback
                    if(timeOfPickup === "day") {

                        var listItemHtml;
                        var tfsHatchBackCost;
                        var tfsHatchBack = {};
                        tfsHatchBack.type = "Taxi For Sure Hatchback";
                        if(distance <= 6) {
                            tfsHatchBackCost = 150;
                        } else{
                            tfsHatchBackCost = 150+ (distance - 6)*15;
                            tfsHatchBackCost = tfsHatchBackCost.toFixed(2);
                        }

                        tfsHatchBack.cost = tfsHatchBackCost;
                        cabCosts.push(tfsHatchBack);
                        //For Sedan
                        var tfsSedanCost;
                        var tfsSedan = {};

                        tfsSedan.type = "Taxi For Sure Sedan";

                        if(distance <= 6) {
                            tfsSedanCost = 150;
                        } else {
                            tfsSedanCost = 150 + (distance - 6)*18;
                            tfsSedanCost = tfsSedanCost.toFixed(2);
                        }

                        tfsSedan.cost = tfsSedanCost;
                        cabCosts.push(tfsSedan);

                        //For SUV
                        var tfsSuvCost;
                        var tfsSuv = {};

                        tfsSuv.type = "Taxi For Sure SUV";

                        if(distance <= 6) {
                            tfsSuvCost = 200;
                        } else {
                            tfsSuvCost = 200 + (distance - 6)*21;
                            tfsSuvCost = tfsSuvCost.toFixed(2);
                        }

                        tfsSuv.cost = tfsSuvCost;
                        cabCosts.push(tfsSuv);


                    } else { //Night time pick up between 12am - 5am

                        var listItemHtml;
                        var tfsHatchBackCost;
                        var tfsHatchBack = {};

                        tfsHatchBack.type = " Taxi For Sure Hatchback";

                        if(distance <= 6) {
                            tfsHatchBackCost = 185;
                        } else{
                            tfsHatchBackCost = 185+ (distance - 6)*18;
                            tfsHatchBackCost = tfsHatchBackCost.toFixed(2);
                        }

                        tfsHatchBack.cost = tfsHatchBackCost;
                        cabCosts.push(tfsHatchBack);

                        //For Sedan
                        var tfsSedanCost;
                        var tfsSedan = {};
                        tfsSedan.type = "Taxi For Sure Sedan";

                        if(distance <= 6) {
                            tfsSedanCost = 185;
                        } else {
                            tfsSedanCost = 185 + (distance - 6)*22;
                            tfsSedanCost = tfsSedanCost.toFixed(2);
                        }
                        tfsSedan.cost = tfsSedanCost;
                        cabCosts.push(tfsSedan);

                        //For SUV
                        var tfsSuvCost;
                        tfsSuv = {};
                        tfsSuv.type = "Taxi For Sure SUV";

                        if(distance <= 6) {
                            tfsSuvCost = 250;
                        } else {
                            tfsSuvCost = 250 + (distance - 6)*26;
                            tfsSuvCost = tfsSuvCost.toFixed(2);
                        }
                        tfsSuv.cost = tfsSuvCost;
                        cabCosts.push(tfsSuv);

                    }
            }

            function calculateFareForTabCab(distance, duration, timeOfPickup) {

                var tabCabCost;
                var listItemHtml;
                var tabCab = {};
                tabCab.type = "TAB Cab";

                if(timeOfPickup === "day") {
                    if(distance <= 1) {
                        tabCabCost = 27;
                    } else {
                        tabCabCost = 27 + (distance - 1)*20;
                        tabCabCost = tabCabCost.toFixed(2);
                    }
                    tabCab.cost = tabCabCost;
                    cabCosts.push(tabCab);

                } else {
                    if(distance <= 1) {
                        tabCabCost = 33.75;
                    } else {
                        tabCabCost = 33.75 + (distance - 1)*25;
                        tabCabCost = tabCabCost.toFixed(2);
                    }
                    tabCab.cost = tabCabCost;
                    cabCosts.push(tabCab);
                }
            }

            function calculateFareForMeeru(distance, duration, timeOfPickup) {
                var meeruCost;
                var listItemHtml;
                var meeru = {};
                meeru.type = "Meeru Cab";

                if(timeOfPickup === "day") {
                    if(distance <= 1) {
                        meeruCost = 27;
                    } else {
                        meeruCost = 27 + (distance - 1)*20;
                        meeruCost = meeruCost.toFixed(2);
                    }
                    meeru.cost = meeruCost;
                    cabCosts.push(meeru);

                } else {
                    if(distance <= 1) {
                        meeruCost = 33.75;
                    } else {
                        meeruCost = 33.75 + (distance - 1)*25;
                        meeruCost = meeruCost.toFixed(2);
                    }
                    meeru.cost = meeruCost;
                    cabCosts.push(meeru);
                }


            }

            function calculateFareForUber(distance, duration, timeOfPickup) {
                var uberCost ;
                var listItemHtml;
                if(uberCost <= 125) {
                    uberCost = 125;
                } else {
                    uberCost = 50 + duration + 15*distance;
                }
                listItemHtml = '<li> <a href="#">Uber X : '+uberCost.toFixed(2)+'</a></li>';
                $("#rideWiseList").append(listItemHtml);

                var uberBlackCost;
                if(uberBlackCost <= 200) {
                    uberBlackCost = 200;
                } else {
                   uberBlackCost  = 100 + 2*duration + 17*distance; 
                }

                listItemHtml = '<li> <a href="#">Uber Black : '+uberBlackCost.toFixed(2)+'</a></li>';
                $("#rideWiseList").append(listItemHtml);
            }

            function displayTaxiFares(distance, duration) {
                $('#rideWiseList').empty();
                distance = parseFloat(distance).toFixed(2);
                duration = parseFloat(duration).toFixed(2);
                calculateFaresForOla(distance, duration, timeOfPickup);
                calculateFaresForBookMyCab(distance, duration, timeOfPickup);
                calculateFaresForTaxiForSure(distance, duration, timeOfPickup);
                calculateFareForTabCab(distance, duration, timeOfPickup);
                calculateFareForMeeru(distance, duration, timeOfPickup);
                //ccalculateFareForUber(distance, duration, timeOfPickup);
                var listItemHtml;
                var sortedCosts = _.sortBy(cabCosts,'cost');
                $.each(sortedCosts, function(i,currCab){
                listItemHtml = '<li data-icon="phone"> <a href="#">'+currCab.type+' <span class="ui-li-count"> Rs '+currCab.cost+'</span></a></li>';
                $("#rideWiseList").append(listItemHtml);

                });
                $('#rideWiseList').listview('refresh');
            }

        }); //end of click on calculate

        //When user hits the "user current location option"
        $("#useCurrentLocation").bind("click", function(event, ui){
            
            //Get the current latitude and longitude.
                if(navigator.geolocation) {
                    $("#calculateOptions").button("disable");
                    navigator.geolocation.getCurrentPosition(function(position) {
                        var latitude = parseFloat(position.coords.latitude).toFixed(4);
                        var longitude = parseFloat(position.coords.longitude).toFixed(4);

                        console.log("latitude = "+latitude+"longitude = "+longitude);
                        window.origin = new google.maps.LatLng(latitude,longitude);
                        $("#source").val("Current Location");
                        $("#calculateOptions").button("enable");
                    });
                    
                } else {
                    console.log("Current location Not Found !");
                    $("#source").val("latitude and longitude not found");
                }


        });
});

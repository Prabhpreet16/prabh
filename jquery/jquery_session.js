/*********
 *  ques 1 : Console "Hello Word" in document.ready function
 *
 ********/

$(document).ready(function () {
    console.log("Hello World!");
});

/*********
 *  ques 2 : Select a ID name "#test" and add class "load" when DOM is loaded
 *
 ********/

$(document).ready(function () {
    $('#test').append($("<div>Added New div when DOM is loaded.</div>"), {
        class: "load"
    });
    ques3();
    ques4();
    ques5();
    ques6();
    ques7();
    ques8();
    ques9();
    ques10();
    ques11();
    ques12();
    ques13();
    ques14();
    ques15();
    ques16();
    ques17();
});


/*********
 *  ques 3 : Change the color of element which class name end with "-new"
 *
 ********/

function ques3(){
    $('[class$=-new]').css('color', 'red');
}

/*********
 *  ques 4 : Disable submit button using jquery attr method
 *
 ********/

function ques4() {
    $('#submit-btn').attr('disabled', 'true');
}

/*********
 *  ques 5 : Change the font size of ".target" which has parent element with id name "#main"
 *
 ********/

function ques5(){
    $('.target').parent('#main').css('font-size','32px');
}


/*********
 *  ques 6 : After page load change the HTML of div element with "p" element
 *
 ********/

function ques6(){
    $('div.first').replaceWith('<p>This paragraph replaced first div.</p>');
}

/*********
 *  ques 7 : Bind a click function to an "click" element and append next "click" next to it.
 *
 ********/

function ques7() {
    $("button.first").on('click',function () {
        $('div#append-btn').append($(this).clone());
    });
}

/*********
 *  ques 8 : Click event not working on element which added dynamically or via script, make it work using .on method
 *
 ********/

function ques8() {
    $('#add_ele').on('click', function (e) {
        $('div#add-btn').append($('<button>Dynamically added Button</button>'),{
            id : "dyn-btn"
        });
    });

    $('button#dyn-btn').click(function () {
        alert('Click event executed!');
    })

    $('div#add-btn').on('click',$('#dyn-btn'),function () {
        alert('On event executed');
    })
}

/*********
 *  ques 9 : Get dropdown selected value on onchange event and append in div container
 *
 ********/

function ques9(){
    $("select").on('change', function (e) {
        $('#res-div').append($(this).val() + '<br>');
    })
}


/*********
 *  ques 10 : Create a dropdown menu using hover method in jquery
 *
 ********/

function ques10() {
    $('div#drp-dwn1').hover(function () {
        $(this).append('<ul class="drp-list" style="list-style: none">' +
            '<li>JVM</li>' +
            '<li>MEAN</li>' +
            '<li>FEEN</li>' +
            '<li>DevOps</li>' +
            '<li>BigData</li>' +
            '</ul>');
    }, function () {
        $('ul.drp-list').remove();
    });
}


/*********
 *  ques 11 : On clicking on "google" tag. It is taking us to google home page. Stop it from happening.
 *
 ********/

function ques11() {
    $('a#google-link').on('click', function (e) {
        e.preventDefault();
    })
}


/*********
 *  ques 12 : We have bind a click function to parent div but we want stop it from performing when user clicks on its child li
 *
 ********/

function ques12() {
    $('div#parent-div').on('click', function () {
        alert("Clicked Parent!");
    });
    $('div#child-div').on('click',function () {
        alert("Clicked Child!");
    });
    $('div#child-div').on('click',function (e) {
        e.stopPropagation();
    });
}


/*********
 *  ques 13 : Get the max height of elements using jquery each method
 *
 ********/

function ques13() {
    $('#cal-height').click(function () {
        $('#find-height').children().each(function (i, el) {
            $('#shw-height').append('<p>Max Height of <span>' + $(this).prop('tagName') + '</span> is: ' + $(this).height() + '<br>');
        })
    });
}



/*********
 *  ques 14 : Change color of every cell which has number larger than 10.
 *
 ********/

function ques14() {
    $('td').each(function () {
        if($(this).text() > 10){
            $(this).css('background', 'yellow');
        }
    })
}


/*********
 *  ques 15 : Retrive the data from server using ajax get call
 *
 ********/

function ques15() {
    $('.get-data').on('click', function () {
        $.ajax({
            type: "GET",
            dataType: 'jsonp',
            url: "https://jsonplaceholder.typicode.com/users",
            async: false,
            contentType: "application/json; charset=utf-8",
            success: function (msg) {
                console.log(JSON.stringify(msg));
                for(var i = 0; i < msg.length; i++){
                    $('.shw-table-1').append('<tr><td>' + msg[i].name + '</td><td>' + msg[i].email + '</td><td>' + msg[i].phone + '</td><td>' + msg[i].website +'</td></tr>')
                }
            },
            error: function (err) {
                console.log(err);
            }
        });
    });
}

/*********
 *  ques 16 : Add cross button on row and bind click function which make a delete request to server, after success event remove the row from dom
 *
 ********/

function ques16() {
    $('.get-data').on('click', function () {
        $.ajax({
            type: "GET",
            dataType: 'jsonp',
            url: "https://jsonplaceholder.typicode.com/users",
            async: false,
            contentType: "application/json; charset=utf-8",
            success: function (msg) {
                for(var i = 0; i < msg.length; i++){
                    $('.shw-table-2').append('<tr><td class=' + msg[i].id + '>' + msg[i].id + '</td><td>' + msg[i].name + '</td><td>' + msg[i].email + '</td><td><a class="close-btn" href="javascript:void(0);">X</a></td></tr>');
                }
            },
            error: function (err) {
                console.log(err);
            }
        });

        $(document).on('click', 'a.close-btn' ,function (e) {
            e.preventDefault();
            var el = $(this).parent().parent();
            var post_id = el.find('td:first').text();
            $.ajax({
                type: "PUT",
                url: "https://jsonplaceholder.typicode.com/posts/" + post_id,
                success: function (res) {
                    if(post_id == res.id) {
                        el.remove();
                    }
                }
            });
        });
    });

}

/*********
 *  ques 17 : Create a image array and in div create a slide show to animate images of delay of 500ms.
 *
 ********/


function ques17() {
    var images = ['images/1.jpg','images/2.jpg','images/3.jpg','images/4.jpg','images/5.jpg','images/6.jpg'];
    var count = images.length;
    $('#start-ss').click(function () {
        setInterval(start_slider, 500);
    })
    function start_slider() {
        $('#shw-images').attr('src', images[(++(images.length))%count]).animate({
            transition: 0.8
        });
    }
}
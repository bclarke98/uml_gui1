function error(msg){
    $('#errorAlert').text(msg).show();
}

function generateTable(xs, xe, ys, ye){
    //lambda functions for generating html elements to be inserted into
    //the table
    let th = (m,s='col') => { return '<th scope="' + s + '">' + m + '</th>'; };
    let td = (m) => { return '<td>' + m + '</td>'; };

    //reset and initialize table
    $('#tableTop > th').remove();
    $('#tableTop').append(th('#'));
    $('#tableBody > tr').remove();
    $('#tableTitle').attr('colspan', xe-xs+2);

    //set up horizontal header
    for(var i = 0; i < xe-xs+1; i++)
        $('#tableTop').find('th:last').after(th(xs+i));

    for(var j = 0; j < ye-ys+1; j++){
        //first, create a new row and append it to #tableBody after adding a th
        //as a child of this new row (this displays the current vertical value
        //at the start of each row, like a vertical "header").
        $('#tableBody').append('<tr id="row' + (j+ys) + '">' + th(j+ys, s='row') + '</tr>');
        //since we can resolve the new row with a jquery selector, we can now
        //iterate over each x value, perform the multiplication, and display
        //the result as <td> element which is a child of the row.
        for(var i = 0; i < xe-xs+1; i++)
            $('#row' + (j+ys)).append(td((j+ys) * (i+xs)));
    }
    //finally, actually show the table
    $('#d_tbl').show();
}

function parseAndGenerate(){
    //first, get the values from the form and cast them to ints
    //NOTE: parseInt returns NaN upon failed parsing, however due to
    //bootstrap's input type specifiers, only valid numbers will be able
    //to be inputted into these fields
    var hs = parseInt($('#hstart').val()),
        he = parseInt($('#hend').val()),
        vs = parseInt($('#vstart').val()),
        ve = parseInt($('#vend').val());
    //if a provided lower-bound is more than its respective upper-bound,
    //silently swap them
    if(hs > he){
        let t = hs;
        hs = he;
        he = t;
    }
    if(vs > ve){
        let t = vs;
        vs = ve;
        ve = t;
    }
    //after our input validation, actually generate the table
    generateTable(hs, he, vs, ve);
}

$(document).ready(function(){
    //feather (a glyph rendering library) is initialized here
    feather.replace();

    $('#tblForm').validate({
        submitHandler: (f)=>{
            parseAndGenerate();
            return false;
        }
    });

    //hide initially unneeded elements
    $('#d_tbl').hide();
    $('#errorAlert').hide();

    //allow for the dismissing of an alert by clicking on it
    $('#errorAlert').click((e)=>{
        $('#errorAlert').hide();
    });
});
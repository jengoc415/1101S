//===============================================================
// Task 2A: Run-Length Encoding
//===============================================================

//------------------------------------------
// SOLUTION
//------------------------------------------
function runlength_encode(L) {

    function encode(val, count, next) {
        return is_null(next)
               ? list(count === 1 ? val : pair(val, count))
               : head(next) === val
               ? encode(val, count + 1, tail(next))
               : pair(count === 1 ? val : pair(val, count),
                      encode(head(next), 1, tail(next)));
    }
    return is_null(L)
           ? null
           : encode(head(L), 1, tail(L));
}

//--------------------
// TESTCASES (PUBLIC)
//--------------------
display(
equal( null, runlength_encode(null) ),
"2A_1:");

display(
equal( list(9), runlength_encode(list(9)) ),
"2A_2:");

display(
equal( list(6, [5,2], 9, [7,2], [5,3]), runlength_encode(list(6,5,5,9,7,7,5,5,5)) ),
"2A_3:");

//--------------------
// TESTCASES (PRIVATE)
//--------------------
display(
equal( null, runlength_encode(null) ),
"2A_P1:");

display(
equal( list(79), runlength_encode(list(79)) ),
"2A_P2:");

display(
equal( list([79,3]), runlength_encode(list(79, 79, 79)) ),
"2A_P3:");

display(
equal( list(8, [79,5], 8), runlength_encode(list(8, 79, 79, 79, 79, 79, 8)) ),
"2A_P4:");

display(
equal( list(16, [15,2], 19, 16, [17,2], [15,3]),
       runlength_encode(list(16,15,15,19,16,17,17,15,15,15)) ),
"2A_P5:");

display(
equal( list([16,4], 17, [15,2], 19, 16, [17,2], [15,3], 17),
       runlength_encode(list(16,16,16,16,17,15,15,19,16,17,17,15,15,15,17)) ),
"2A_P6:");

//===============================================================




//===============================================================
// Task 2B: Run-Length Decoding
//===============================================================

//--------------------
// SOLUTION
//--------------------
function runlength_decode(R) {

    function decode(xs, val, count) {
        return count > 0
            ? pair(val, decode(xs, val, count - 1))
            : is_null(xs)
            ? null
            : !is_pair(head(xs))
            ? pair(head(xs), decode(tail(xs), 0, 0))
            : decode(tail(xs), head(head(xs)), tail(head(xs)));
    }
    return decode(R, 0, 0);
}

//--------------------
// TESTCASES (PUBLIC)
//--------------------
display(
equal( null, runlength_decode(null) ),
"2B_1:");

display(
equal( list(9), runlength_decode(list(9)) ),
"2B_2:");

display(
equal( list(6,5,5,9,7,7,5,5,5), runlength_decode(list(6, [5,2], 9, [7,2], [5,3])) ),
"2B_3:");

//--------------------
// TESTCASES (PRIVATE)
//--------------------
display(
equal( null, runlength_decode(null) ),
"2B_P1:");

display(
equal( list(79), runlength_decode(list(79)) ),
"2B_P2:");

display(
equal( list(79, 79, 79), runlength_decode(list([79,3])) ),
"2B_P3:");

display(
equal( list(8, 79, 79, 79, 79, 79, 8), runlength_decode(list(8, [79,5], 8)) ),
"2B_P4:");

display(
equal( list(16,15,15,19,16,17,17,15,15,15),
       runlength_decode(list(16, [15,2], 19, 16, [17,2], [15,3])) ),
"2B_P5:");

display(
equal( list(16,16,16,16,17,15,15,19,16,17,17,15,15,15,17),
       runlength_decode(list([16,4], 17, [15,2], 19, 16, [17,2], [15,3], 17)) ),
"2B_P6:");

//===============================================================

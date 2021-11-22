// function A() {
//     return cond_a
//         ? do_y()
//         : do_x();
// }

// function B() {
//     return cond_a
//         ? do_x()
//         : cond_b
//         ? do_x()
//         : do_y();
// }

// function C() {
//     return cond_a 
//         ? cond_b
//             ? do_x()
//             : do_y()
//         : do_y();
// }

function myfunc(a) {
    return b => c => a * b + c;
}

// myfunc(3)(2)(1);

function BST_min(bst) {
    return is_null(bst)
        ? Infinity
        : is_null(head(tail(bst)))
        ? head(bst)
        : BST_min(head(tail(bst)));
}

function BST_find(x, bst) {
    return is_null(bst)
        ? false
        : x === head(bst)
        ? true
        : x < head(bst)
        ? BST_find(x, tail(bst))
        : BST_find(x, tail(tail(bst)));
}

function BST_to_list(bst) {
    if (is_null(bst)) {
        return null;
    }
    let left = BST_to_list(head(tail(bst)));
    let mid = head(bst);
    let right = BST_to_list(head(tail(tail(bst))));
    
    return append(left, pair(mid, right));
}

function find_ranks(lst) {
    return map(x => length(filter(y => y <= x, lst)), lst);
}

function get_num(lst, ranks) { 
    return rank => head(ranks) === rank
                    ? head(lst)
                    : get_num(tail(lst), tail(ranks))(rank);
}

function rank_sort(lst) {
    const ranks = find_ranks(lst);
    const index = enum_list(1, length(lst));
    return map(x => get_num(lst, ranks)(x), index);
}

// Q6

function singles_to_english(d) {
    return list_ref(list("", "one", "two", "three",

"four", "five", "six",
"seven", "eight", "nine"), d);}

function tens_to_english(t) {
return list_ref(list("", "ten", "twenty", "thirty",

"forty", "fifty", "sixty",
"seventy", "eighty", "ninety"), t);}

function ten_to_nineteen_to_english(s) {
return list_ref(list("ten", "eleven", "twelve", "thirteen",
                         "fourteen", "fifteen", "sixteen",
                         "seventeen", "eighteen",
                         "nineteen"), s);
}

function power_of_thousand(n) {
return list_ref(list("", "thousand", "million", "billion",

"trillion", "quadrillion",
"quintillion"), n);}

// for each triplet of hundred/ten/single 
function triplet_to_english(h, t, s) {
const he = h > 0 ? singles_to_english(h) + " hundred" : ""; const te = t > 0 ? tens_to_english(t) : "";
const se = s > 0 ? singles_to_english(s) : "";
const tese = te === "" ? se
                 : t === 1 ? ten_to_nineteen_to_english(s)
                   : se === "" ? te : te + " " + se;
return he === "" ? tese : tese === "" ? he
             : he + " " + tese;
}


function number_to_digits(n) {
    return n < 10
        ? list(n)
        : pair(n % 10, number_to_digits(math_floor(n/10)));
}

function triplets(digits) {
    
    if (length(digits) === 0) {
        return null;
    } else if (length(digits) === 1) {
        return list( list(list_ref(digits, 0), 0, 0) );
    } else if (length(digits) === 2) {
        return list( list(list_ref(digits, 0), list_ref(digits, 1), 0) );
    } else {
        pair(
            list( list_ref(digits, 0), 
                  list_ref(digits, 1), 
                  list_ref(digits, 2) ), 
            triplets(tail(tail(tail(digits)))));   
    }

}

function triplets_to_english(triplets) {
    let ordered = map(reverse, reverse(triplets));
    let len = length(triplets);
    
    function helper(xs, n) {
        if (n < 0 || is_null(xs)) {
            return "";
        }
        
        let ct = head(xs);
        let ce = triplet_to_english(head(ct), head(tail(ct)), head(tail(tail(ct))));
        let thousands = power_of_thousand(n);
        return ce + " " + thousands + " " + helper(tail(xs), n - 1);
    }
    
    return helper(ordered, len - 1);
}


function number_to_english(n) {
    return triplets_to_english(triplets(number_to_digits(n)));
}

triplets_to_english(null);














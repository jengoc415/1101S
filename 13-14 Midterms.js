function equal_boolean(x, y) {
    return x ? y : y ? x : true;
}

function plus(x, y) {
    if (is_number(x) && is_number(y)) {
        return x + y;
    } else if (is_string(x) || is_string(y)) {
        return stringify(x) + stringify(y);
    } else {
        return "error: wrong types";
    }
}

function tetrate(b, n) {
    if (n === 0) {
        return 1;
    }
    let wish = tetrate(b, n-1);
    return math_pow(2, wish);
}

function make_pairs(xs, ys) {
    if (is_null(xs)) {
        return null;
    }
    
    let curr = pair(head(xs), head(ys));
    return pair(curr, make_pairs(tail(xs), tail(ys)));
}

function zip(f, xs, ys) {
    if (is_null(xs)) {
        return null;
    }
    
    let curr = f(head(xs), head(ys));
    return pair(curr, zip(f, tail(xs), tail(ys)));
}

function filter(pred, xs) {
    return accumulate((a, b) => pred(a) ? pair(a, b) : b, 
                                null, 
                                xs);
}

// As you traverse the list, if pred(head(xs)) === true,
// pair it with a list that is passed along in the params.
// This list should be defined as null at the start so
// that any pairing in front will create a list.

function make_queen(r, c) {
    return pair(r, c);
}


function row(queen) {
    return head(queen);
}

function column(queen) {
    return tail(queen);
}

function attack_each_other_diagonally(q1, q2) {
    return math_abs(head(q2) - head(q1)) === 
            math_abs(tail(q2) - tail(q1));
}

function attack_any_diagonally(q1, qs) {
    return accumulate((a, b) => attack_each_other_diagonally(q1, a) || b,
                                false,
                                qs);
}

function attack_diagonally(qs) {

    let list_of_d_attacks = map(attack_any_diagonally, qs);
    
    return accumulate((a, b) => a || b,
                                false,
                                list_of_d_attacks);
}


function queens(n) {
    let columns_sequence = enum_list(1, n);
    let rows_sequence_perms = permutations(columns_sequence);
    
    return map(row_sequence => zip(make_queen, columns_sequence, row_sequence), 
                              rows_sequence_perms);
}

function solutions(n) { 
    let all_possible = queens(n);
    return filter(!attack_any_diagonally, all_possible);
}

solutions(3);

// const twice = f => x => f(f(x));
// const plus_one = x => x + 1;

// twice(twice)(twice)(plus_one)(0);


















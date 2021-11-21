function A1() {
    const start = pair(1, pair(pair(3, pair(null,4)), 2));
    return start;
}


function A2() {
    const start = list(1,2,3);
    set_tail(tail(tail(tail(start))), start);
    return start;
}

function is_list_of_numbers(x) {
    return is_null(x)
        ? true
        : is_pair(x)
        ? is_number(head(x)) && is_list_of_numbers(tail(x))
        : false;
}


function is_tree_of_numbers(x) {
    return is_list(x) && accumulate((a, b) => (is_tree_of_numbers(a) 
                                                || 
                                                is_number(a)) 
                                                && b, 
                                                true, x);
}

function my_filter(pred, xs) {
    return accumulate( (a, b) => pred(a) ? pair(a, b) : b, null, xs);
}

function make_image(rows, columns, func) {
    function array_to_list(A) {
        const len = array_length(A);
        let L = null;
        for (let i = len - 1; i >= 0; i = i - 1) {
            L = pair(A[i], L);
        }
        return L;
    }
    
    let arr = [];
    for (let i = 0; i < rows; i = i + 1) {
        arr[i] = [];
    }
    
    
    for (let i = 0; i < rows; i = i + 1) {
        for (let j = 0; j < columns; j = j + 1) {
            arr[i][j] = func(i, j);
        }
    }
    
    return array_to_list(arr);
    
}

function flip_image_vertically(image) {
    return reverse(image);
}

function flip_image_horizontally(image) {
    return map(reverse, image);
}

function rotate_image_180(image) {
    return flip_image_horizontally(flip_image_vertically(image));
}


function are_permutation(xs1, xs2) {
    return length(xs1) !== length(xs2)
        ? false
        : is_null(xs1) || is_null(xs2)
        ? xs1 === xs2
        : are_permutation(tail(xs1), remove(head(xs1), xs2));   
    
    
    // if (length(xs1) !== length(xs2)) {
    //     return false;
    // }
    
    // function helper(L1, L2) {
    //     return is_null(L1)
    //         ? L1 === L2
    //         : helper(tail(L1), remove(head(L1), L2));    
    // }
    
    // return helper(xs1, xs2);
}

function combinations(xs, k) {
    if (k === 0) {
        return list(null);
    } else if (is_null(xs)) {
        return null;
    }
    
    let first_wish = combinations(tail(xs), k-1);
    let second_wish = combinations(tail(xs), k);
    let first_wish_final = map(x => pair(head(xs), x), first_wish);
    return append(first_wish_final, second_wish);
    
}


combinations(list(1,2,3,4), 2);



















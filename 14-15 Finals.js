function n_of_n_stream() {
    function helper(k, n) {
        return k > n
            ? helper(1, n+1)
            : pair(k, () => helper(k+1, n));
    }
    
    return helper(1, 1);
}


function table_to_snake_list(table, height, width) {
    let L = null;
    
    for (let i = 0; i < height; i = i + 1) {
        if (i%2 !== 0) {
            for (let j = width - 1; j >= 0; j = j - 1) {
                L = pair(table[i][j], L);
            }
        } else {
            for (let j = 0; j < width; j = j + 1) {
                L = pair(table[i][j], L);
            }
        }
    }
    
    return reverse(L);
}

function mergeA(xs, ys) {
    if (is_null(xs)) {
        return ys;
    } else if (is_null(ys)) {
        return xs;
    } else {
        let left = head(xs);
        let right = head(ys);
        return left <= right
            ? pair(left, mergeA(tail(xs), ys))
            : pair(right, mergeA(xs, tail(ys)));
    }
    
}

function mergeB(xs, ys) {
    if (is_null(xs)) {
        return ys;
    } else if (is_null(ys)) {
        return xs;
    } else {
        let wish = mergeB(tail(xs), tail(ys));
        
        if (head(xs) <= head(ys)) {
            set_tail(xs, ys);
            set_tail(ys, wish);
            return xs;
        } else {
            set_tail(ys, xs);
            set_tail(xs, wish);
            return ys;
        }
    }
}

function mergeC(xs, xs_len, ys, ys_len) { 
    let result = [];
    let result_len = xs_len + ys_len;
    let xs_count = 0;
    let ys_count = 0;
    
    for (let i = 0; i < result_len; i = i + 1) {
        if (xs[xs_count] === undefined) {
            result[i] = ys_count(ys_count);
            ys_count = ys_count + 1;
        } else if (ys[ys_count] === undefined) {
            result[i] = xs_count(xs_count);
            xs_count = xs_count + 1;
        } else if (xs[xs_count] <= ys[ys_count]) {
            result[i] = xs[xs_count];
            xs_count = xs_count + 1;
        } else if (ys[ys_count] <= xs[xs_count]) {
            result[i] = ys[ys_count];
            ys_count = ys_count + 1;
        }
    }
    
    return result;
}

function are_equal_sets(set1, set2) {
    if (length(set1) !== length(set2)) {
        return false;
    } else if (is_null(set1)) {
        return is_null(set2);
    }
    
    let temp1 = map(x => member(x, set2), set1);
    let temp2 = map(x => member(x, set1), set1);
    let len1 = accumulate((a, b) => length(a) + b, 0, temp1);
    let len2 = accumulate((a, b) => length(a) + b, 0, temp2);
    return len1 === len2;
}

function powerset(set) {
    if (is_null(set)) {
        return list(null);
    }
    
    let wish = powerset(tail(set));
    let add_in_front = map(x => pair(head(set), x), wish);
    return list(add_in_front, wish);
}

function make_circular_copy(xs) {

    let copy = build_list(x => x, xs);
    
    function traverse(ys) {
        if (is_null(tail(ys))) {
            set_tail(ys, copy);
            return copy;
        } else {
            return traverse(tail(ys));
        }
    }
    
    return traverse(copy);
    
}


function make_linear(xs) {
    function traverse(ys) {
        if (tail(ys) === xs) {
            set_tail(ys, null);
        } else {
            traverse(tail(ys));
        }
    }
    
    traverse(xs);
}
















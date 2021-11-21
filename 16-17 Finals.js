function last_member(x, xs) {
    function find_last_member(ys, current_last) {
        let next = member(x, ys);
        return is_null(next)
            ? current_last
            : find_last_member(tail(next), next);
    }
    
    return find_last_member(xs, null);
}

function is_subset(S, T) { 
    if (is_null(S)) {
        return true;
    } else if (is_null(T)) {
        return false;
    } else if (head(S) < head(T)) {
        return false;
    } else if (head(S) === head(T)) {
        return is_subset(tail(S), tail(T));
    } else {
        return is_subset(S, tail(T));
    } 
}

function mutable_append(xs, ys) {
    if (is_null(xs)) {
        return ys;
    }

    function change_tail(end_pair, L1, L2) {
        set_tail(end_pair, L2);
        return L1;
    }
    
    function helper(pointer) {
        return is_null(tail(pointer))
        ? change_tail(pointer, xs, ys)
        : helper(tail(pointer));
    }
    
    let pointer = xs;
    return helper(pointer);
    
}


function model_mutable_append(xs, ys) {
    if (is_null(xs)) {
        return ys;
    } else {
        set_tail(xs, model_mutable_append(tail(xs), ys));
    }
    return xs;
}

function transform_tree(t) {
    if (is_null(t)) {
        return null;
    } else if (is_list(t)) {
        return reverse(map(transform_tree, t));
    } else {
        return t;
    }
}

function model_transform_tree(t) {
    return reverse(map(x => is_list(x)
                            ? model_transform_tree(x)
                            : x, t));
}

function shorten_stream(s, k) {
    if (k >= stream_length(s)) {
        return s;
    } 
    
    function helper(n, stream, result) {
        if (n < k) {
            let t = stream_tail(stream);
            return helper(n+1, t, pair(head(t), result));
        } else {
            return reverse(pair(head(stream), result));
        }
    }
    
    return helper(0, s, null);
}

function is_linked(x, y) {
    return !is_null(member(y, x));
}

function is_proper(x) {
    return !is_null(member(x, x));
}

function is_connected(x, y) {
    return !is_null(member(x, y)) && 
            !is_null(member(y, x));
}

function sum_cps(x, y, z, ret) {
    return ret(x + y + z);
}


function factorial_cps(n, ret) {
    if (n <= 0) {
        return ret(1); 
    } else {
        return factorial_cps(n-1, 
                    x => ret(n * x)
                    );
    }
}

function fact_iter_cps(n, acc, ret) {
    if (n <= 0) {
        return ret(acc); 
    } else {
        return fact_iter_cps(n-1, n * acc,
                             x => ret(x)
                                ); 
    }
}
 
function factorial_iter_cps(n, ret) { 
    return fact_iter_cps(n, 1, ret);
}


function mystery(xs) { if (is_null(xs)) {
return pair(null, null); } else {
let tmp = mystery(tail(xs));
let ys = pair(head(xs), tail(tmp)); let zs = head(tmp);
return display(pair(ys, zs));
} }


sum_cps(1,2,3, display);
















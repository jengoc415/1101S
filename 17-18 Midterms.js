function find_min(xs) {
    function helper(acc, smallest, ys) {
        return is_null(ys)
            ? pair(smallest, acc)
            : head(ys) < smallest
            ? helper(pair(smallest, acc), head(ys), tail(ys))
            : helper(pair(head(ys), acc), smallest, tail(ys));
    }
    
    return helper(null, head(xs), tail(xs));
}

function take_drop(xs, n) {
    function helper(ys, k, acc) {
        return k < n    
            ? helper(tail(ys), k + 1, pair(head(ys), acc))
            : pair(acc, ys);
    }
    
    return helper(xs, 0, null);
}


function solvable(xs, n) {
    const len = length(xs);
    
    function in_focus(f, count) {
        if (f === len-1) {
            return true;
        } else if (count === 0 || f < 0 || f > len) {
            return false;
        } else {
            let focus = list_ref(xs, f);
            display(focus, "focus");
            return in_focus(f + focus, count - 1) || 
                    in_focus(f - focus, count - 1);
        }
    }
    
    return in_focus(0, n);
}

 solvable(list(3, 5, 8, 4, 2, 7, 1, 6), 3);

































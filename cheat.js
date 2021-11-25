// List Manipulation
function map(f, xs) { 
    return is_null(xs)
          ? null
          : pair(f(head(xs)), map(f, tail(xs)));
}

function filter(pred, xs) { 
    return is_null(xs)
        ? xs
        : pred(head(xs))
        ? pair(head(xs), filter(pred, tail(xs))) : filter(pred, tail(xs));
}

function accumulate(op, initial, xs) { 
    return is_null(xs)
        ? initial
        : op(head(xs), accumulate(op, initial, tail(xs)));
}

function append(xs, ys) { 
    return is_null(xs)
        ? ys
        : pair(head(xs), append(tail(xs), ys));
}

function mutable_map(f, xs) {
    if (is_null(xs)) {
        return true;
    } else {
        f(head(xs));
        return mutable_map(f, tail(xs));
    }
}

function last_member(x, xs) { //Returns list from last member onwards
    function find_last_member(ys, current_last) {
        let next = member(x, ys); 
        return (is_null(next)) 
            ? find_last_member(tail(next), next)
            : current_last;
    }

    return find_last_member(xs, null); }
}


// Trees
function map_tree(f, tree) {
    return map(sub_tree => !is_list(sub_tree)
                           ? f(sub_tree)
                           : map_tree(f, sub_tree), 
                tree);
}

function similar(xs, ys) { // Checks if xs === ys
    if (is_null(xs) && is_null(ys)) {
        return true;
    } else if (is_number(xs) && is_number(ys)) {
        return xs === ys;
    } else if (is_pair(xs) && is_pair(ys)) {
        return similar(head(xs), head(ys)) &&
               similar(tail(xs), tail(ys));
    } else {
        return false;
    }
}

function differences(nt1, nt2) { // no. of differences in 2 trees
    if (is_null(nt1)) {
        return 0;
    } else if (is_number(nt1)) {
        return (nt1 === nt2) ? 0 : 1;
    } else {
        return differences(head(nt1), head(nt2))
               +
               differences(tail(nt1), tail(nt2));
    }
}

function transform_tree(t) { // returns tree in reverse order
    return reverse(map(x => is_list(x)
        ? transform_tree(x)
        : x, t));
}

// Array Tree manipulation

function tree_to_arraytree(xs) {
    if (is_number(xs)) { 
        return xs;
    } else {
        const a = [];
        let i = 0;
        
        while (!is_null(xs)) {
                    a[i] = tree_to_arraytree(head(xs));
                    i = i + 1;
                    xs = tail(xs);
    }
    return a; 
}

function arraytree_to_tree(a) {
    if (is_number(a)) { 
        return a;
    } else {
        let xs = null;
        const len = array_length(a);
        for (let i = len - 1; i >= 0; i = i - 1) {
        xs = pair(arraytree_to_tree(a[i]), xs); }
        return xs; 
    }
}

// Stack
function insert_to_bottom(stack, new_elem) {
    if (is_empty(stack)) { 
        push(stack, new_elem);
    } else {
        const elem = pop(stack); insert_to_bottom(stack, new_elem); push(stack, elem);
    }
}
  
function reverse_stack(stack) {
    if (!is_empty(stack)) {
        const elem = pop(stack); reverse_stack(stack); insert_to_bottom(stack, elem);
    }
}

// SORTING
function bubblesort_array(A) {
    const len = array_length(A);
    for (let i = len - 1; i >= 1; i = i - 1) {
        for (let j = 0; j < i; j = j + 1) {
            if (A[j] > A[j + 1]) {
                const temp = A[j]; 
                A[j]=A[j+1]; 
                A[j + 1] = temp;
            }
        }
    }
}

function bubblesort_list(L) {
    const len = length(L);
    for (let i = len - 1; i >= 1; i = i - 1) {
        let p = L;
        for (let j = 0; j < i; j = j + 1) {
            if (head(p) > head(tail(p))) { 
                const temp = head(p); 
                set_head(p, head(tail(p))); 
                set_head(tail(p), temp);
            }
            p = tail(p);
        }
    }
}

function selection_sort(xs) {  
    if (is_null(xs)) {
        return xs; 
    } else {
        const x = smallest(xs);
        return pair(x, selection_sort(remove(x, xs))); 
    }
}

function merge_sort(xs) {
    if (is_null(xs) || is_null(tail(xs))) {
        return xs; 
    } else {
        const td = take_drop(xs, middle(length(xs))); 
        return merge(merge_sort(head(td)),
                     merge_sort(tail(td)));
    } 
}

function take_drop(xs, n) { 
    function helper(ys, k, acc) {
        return (k === 0)
            ? pair(acc, ys)
            : helper(tail(ys), k - 1, pair(head(ys), acc));
    }
    return helper(xs, n, null); 
}
// Array manipulation

function swap(A, i, j) { 
    const temp = A[i]; 
    A[i] = A[j];
    A[j] = temp;
}

function powerset(set) {
    if (is_null(set)) { 
        return list(null);
    } else {
        let rest_powerset = powerset(tail(set)); 
        let x = head(set);
        let has_x = map(s => pair(x, s),
                             rest_powerset); 
        return append(rest_powerset, has_x);
    }
}


function perms01(n, m) {
    if (n === 0 && m === 0) { 
        return list(null);
    } else {
        const p0 = (n > 0)
                    ? map(p => pair(0, p), perms01(n - 1, m))
                    : null;
        const p1 = (m > 0)
                    ? map(p => pair(1, p), perms01(n, m - 1))
                    : null;
        return append(p0, p1);
    }
}

// Streams
function stream_append(xs, ys) { 
    return is_null(xs)
        ? ys
        : pair(head(xs), () => stream_append(stream_tail(xs), ys));
}

function eval_stream(s, n) { 
    return n === 0
        ? null
        : pair(head(s), eval_stream(stream_tail(s), n - 1));
}

function stream_map(f, s) { 
    return is_null(s)
        ? null
        : pair(f(head(s)), () => stream_map(f, stream_tail(s)));
}

function tree_to_stream(tree) {
    if (is_null(tree)) { 
        return null;
    } else {
        let x = () => tree_to_stream(tail(tree)); 
        if (is_pair(head(tree))) {
            return pair(tree_to_stream(head(tree)), x); 
        } else {
            return pair(head(tree), x); 
        }
    }
}

// CPS
function factorial_cps(n, ret) {
    if (n <= 0) { 
        return ret(1);
    } else {
        return factorial_cps(n – 1, result => ret(n * result));
    }
}

















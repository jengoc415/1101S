//===============================================================
function swap(A, i, j) {
    const temp = A[i];
    A[i] = A[j];
    A[j] = temp;
}
//---------------------------------------------------------------
function copy_array(A) {
    const len = array_length(A);
    const B = [];
    for (let i = 0; i < len; i = i + 1) {
        B[i] = A[i];
    }
    return B;
}
//---------------------------------------------------------------
function reverse_array(A) {
    const len = array_length(A);
    const half_len = math_floor(len / 2);
    for (let i = 0; i < half_len; i = i + 1) {
        swap(A, i, len - 1 - i);
    }
}
//---------------------------------------------------------------
function array_to_list(A) {
    const len = array_length(A);
    let L = null;
    for (let i = len - 1; i >= 0; i = i - 1) {
        L = pair(A[i], L);
    }
    return L;
}
//---------------------------------------------------------------
function list_to_array(L) {
    const A = [];
    let i = 0;
    for (let p = L; !is_null(p); p = tail(p)) {
        A[i] = head(p);
        i = i + 1;
    }
    return A;
}
//---------------------------------------------------------------
// Sorts the array of numbers in ascending order.
function sort_ascending(A) {
    const len = array_length(A);
    for (let i = 1; i < len; i = i + 1) {
        const x = A[i];
        let j = i - 1;
        while (j >= 0 && A[j] > x) {
            A[j + 1] = A[j];
            j = j - 1;
        }
        A[j + 1] = x;
    }
}
//---------------------------------------------------------------
function digits_to_string(digits) {
    const len = array_length(digits);
    let str = "";
    for (let i = 0; i < len; i = i + 1) {
        str = str + stringify(digits[i]);
    }
    return str;
}
// const D = [8, 3, 9, 2, 8, 1];
// digits_to_string(D);  // returns "839281"
//---------------------------------------------------------------
function permutations(s) { 
    return is_null(s) 
        ? list(null)
        : accumulate(append, null, 
            map(x => map(p => pair(x, p), 
                         permutations(remove(x, s))), 
                s)); 
} 
permutations(list(1,2,3)); 
//---------------------------------------------------------------
function middle(n){ 
    return math_floor(n/2); 
} 
function take(xs, n){ 
    return is_null(xs) || n <= 0 ? null 
        : pair(head(xs), take(tail(xs), n - 1)); 
} 
function drop(xs, n){ 
    return is_null(xs) || n <= 0 ? xs 
        : drop(tail(xs), n - 1); 
} 
function merge(xs, ys){ 
    if (is_null(xs)){ 
        return ys; 
    } else if (is_null(ys)){ 
        return xs; 
    } else { 
        return head(xs) <= head(ys) ? pair(head(xs), merge(tail(xs), ys)) 
            : pair(head(ys), merge(xs, tail(ys))); 
    } 
} 
function merge_sort(xs){ 
    if(is_null(xs) || is_null(tail(xs))){ 
        return xs; 
    } else { 
        const mid = middle(length(xs)); 
        return merge(merge_sort(take(xs,mid)),merge_sort(drop(xs,mid))); 
    } 
}    
merge_sort(list(1,52,1,3,5,8,2,1)); 
//---------------------------------------------------------------
function choose(n, k) { 
    return (k > n) ? 
        0 : (k === 0 || k === n) ? 
            1 : choose(n - 1, k) + 
                choose(n - 1, k - 1); 
} 
choose(12, 6); 
//---------------------------------------------------------------
const mem = [];

function read(n, k) {
    return mem[n] === undefined
           ? undefined
           : mem[n][k];
}

function write(n, k, value) {
    if (mem[n] === undefined) {
        mem[n] = [];
    }
    mem[n][k] = value;
}
//---------------------------------------------------------------
function linear_search(xs, n){ 
    return is_null(xs) ? "Result not found"  
        : head(xs) === n ? n 
        : linear_search(tail(xs), n); 
} 
//--------------------------------------------------------------
function binary_search(xs, k){ 
    function helper(xs, n, m){ 
        if(m <= n){ 
            return "Result Not found"; 
        } else { 
            const mid = math_floor((m + n) / 2); 
            const mid_num = list_ref(xs, mid);
            return mid_num === k ? "The value is at position: " + stringify(mid) 
                : mid_num > k ? helper(xs, n, mid) 
                : helper(xs, mid + 1, m); 
        } 
    } 
    return helper(xs, 0, length(xs));
} 
//--------------------------------------------------------------
function two_d_memoize(f) { 
    const mem = [];
    
    function read(x, y) {
        return (mem[x] === undefined) 
            ? undefined 
            : mem[x][y];
    }

    function write(x, y, value) {
        if (mem[x] === undefined) { 
            mem[x] = []; 
            
        } else {}
            mem[x][y] = value;
        }
    
    function mf(x, y) {
        const mem_xy = read(x, y); 
        if (mem_xy !== undefined) {
            return mem_xy; 
        } else {
            
        const result = f(x, y); 
        write(x, y, result); 
        return result;
        }
    }
    
    return mf; 
}
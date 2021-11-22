function D1() {
    let temp = list(5);
    let seven = pair(7, temp);
    let result = pair(3, pair(seven, temp));
    return result;
}

function E1() {
    let result = list(null, null, null);
    set_head(tail(result), result);
    set_head(tail(tail(result)), tail(result));

    return result;
}
let n = 3;
function outer_loop(x) {
    function inner_loop(y) {
        if (y < x) {
            display("x: " + stringify(x) + ", y: " + stringify(y));
            return inner_loop(y+1);
        }
    } // inner_loop
    if (x < n) {
        inner_loop(0);
        return outer_loop(x*2);
    }
} // outer_loop

function double_loop(x, y) {
    if (x < n) {
        if (y < x) {
            display("x: " + stringify(x) + ", y: " + stringify(y));
            return double_loop(x, y + 1);
        } else {
            return double_loop(x*2, 0);
        }
    }
}

function circular_right_shift(arr) {
    let height = array_length(arr); 
    let width = array_length(arr[0]);
    let last_column = [];
    
    // copy last column
    for (let i = 0; i < height; i = i + 1) {
        last_column[i] = arr[i][width - 1];
    }
    
    // move everything one column to the right except first column
    for (let i = 0; i < width; i = i + 1) {
        for (let j = width-1; j > 1; j = j - 1) {
            arr[i][j] = arr[i][j-1];
        }
    }
    display(arr);    
    // transfer back temp into first column in reverse order
    for (let i = 0; i < height; i = i + 1) {
        arr[i][0] = last_column[height - 1];
    }
    display(last_column);

    return arr;
}

function mutable_reverse(xs) {
    if (is_null(tail(xs))) {
        return xs;
    }
    
    let wish = mutable_reverse(tail(xs));
    set_tail(tail(xs), xs);
    set_tail(xs, null);
    return wish;
}

const t = pair(pair(2, () => pair(4, 1)), () => pair(pair(3, () => pair(5, 1), 1)));

const b = list(1, () => list( head(b) + 1, 
                              () => head(stream_tail(b)) + 1, 
                              () => head(stream_tail(b)) * 2
                              ), 
                  () => list( head(b) * 2, 
                              () => head(stream_tail(tail(b)) + 1), 
                              () => head(stream_tail(tail(b)) * 2 )
                              ));

function tree_to_tream(tree) {
    return pair(head(tree), () => pair(head(head(tree)), 
                                       pair( () => tail(head(tree)), 
                                             tree_to_tream(tail(tree)))));
}

function tream_map(f, t) {
    return stream_map(f, t);
}


function circular_right_shift1(arr) {
    let height = array_length(arr); 
    let width = array_length(arr[0]);
    // VERSION 1 - Take last value and shift everything forward
    let prev = arr[height-1][width-1];
    
    for (let r = 0; r < height; r = r + 1) { 
        for (let c = 0; c < width; c = c + 1) {
            let temp = arr[r][c]; 
            arr[r][c] = prev; 
            prev = temp;
        } 
    }
    
    return arr;
}

let as = list(1, 2, 3, 4, 5);
let bs = mutable_reverse(as);
bs; // equal to list(5, 4, 3, 2, 1). 
as; // equal to list(1).















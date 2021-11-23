function conditional(a, b, c) {
    if (a) {
        return b();
    } else {
        return c();
    }
}

// const True = (b, c) => b;
// const False = (b, c) => c;

function simple_conditional(a, b, c) {
    if (a) {
        return b;
    } else {
        return c;
    }
}

//

const diff = z => x => z - x;

// compose1(square, add_one)(7);
// square(compose2(add_one, 7));

function list_to_tsil(xs) {
    if (is_null(xs)) {
        return null;
    }
    
    let temp = tail(xs);
    set_tail(xs, head(xs));
    set_head(xs, list_to_tsil(head(xs)));
    return xs;
}

function sum_of_list(xs) { 
    if (is_null(xs)) {
        return 0; 
    } else {
        return head(xs) + sum_of_list(tail(xs)); 
    }
}


function iter_list_sum(xs) {
    function helper(ys, acc) {
        return is_null(ys)
            ? acc
            : helper(tail(ys), head(ys) + acc);
    }
    
    return helper(xs, 0);
}

function multi_map(f, xss) {
    let len = length(head(xss));
    
    function helper(k) {
        if (k < len) {
            let curr = map( x => list_ref(x, k), xss);
            return pair(f(curr), helper(k + 1));
        } else {
            return null;
        }
    }
    
    return helper(0);
}

function make_coordinates(row, column) {
    return pair(row, column);
}

function get_x(coordinates) {
    return head(coordinates);
}

function get_y(coordinates) {
    return tail(coordinates);
}

function access(coordinates_list, grid) {
    let x = get_x(coordinates_list);
    let y = get_y(coordinates_list);
    return list_ref(grid, list_ref(grid, x));
}

function all_different(xs) {
    return is_null(xs)
        ? true
        : !is_null(member(head(xs), tail(xs)))
        ? false
        : all_different(tail(xs));
}

function make_row_coordinates_list(row) {
    return build_list(x => pair(row, x), 9);
}

function test_coordinates_list(grid, coordinates_list) {
    let curr_row = map(x => access(x, grid), coordinates_list);
    return all_different(curr_row);
}

function make_box_coordinates_list(row_1, row_2, col_1, col_2) { 
    const rows = build_list(row_2 - row_1 + 1, x => x + row_1); 
    const coordinates_list_list_list = 
          map(row => build_list(col_2 - col_1 + 1,
                     y => make_coordinates(row, y + col_1)),
                     rows );
                     
    return accumulate(append, null, coordinates_list_list_list);
}

function make_sudoku_coordinates_list_list () {
    const row_coordinates_list_list = build_list(9, row => make_row_coordinates_list(row)); 
    const col_coordinates_list_list = build_list(9, col => make_col_coordinates_list(col)); 
    const box_coordinates_list_list = 
            list( make_box_coordinates_list(0,2,0,2),
                  make_box_coordinates_list(0,2,3,5), 
                  make_box_coordinates_list(0,2,6,8), 
                  make_box_coordinates_list(3,5,0,2), 
                  make_box_coordinates_list(3,5,3,5), 
                  make_box_coordinates_list(3,5,6,8), 
                  make_box_coordinates_list(6,8,0,2), 
                  make_box_coordinates_list(6,8,3,5),
                  make_box_coordinates_list(6,8,6,8) ); 
                  
    return append(row_coordinates_list_list,
                    append(col_coordinates_list_list , box_coordinates_list_list ));
}

function test_sudoku(grid) {
    let all_lists_to_check = make_sudoku_coordinates_list_list();
    return accumulate((a, b) => test_coordinates_list(grid, a) && b,
                                true,
                                all_lists_to_check);
}













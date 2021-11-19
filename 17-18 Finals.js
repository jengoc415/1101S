function similar(tn1, tn2) {
    function check_no(x, y) {
        return x === y || x === y - 1 || x === y + 1;
    }
    
    
    if (is_null(tn1)) {
        return is_null(tn2);
    }
    
    let wish = similar(tail(tn1), tail(tn2));
    let curr1 = head(tn1);
    let curr2 = head(tn2);
    display(wish);
    if (wish) {
        return is_number(curr1) && is_number(curr2)
            ? check_no(curr1, curr2)
            : !is_number(curr1) && !is_number(curr2)
            ? similar(curr1, curr2)
            : false;
    }
    return wish;
}

function differences(tn1, tn2) {

    if (is_null(tn1)) {
        return 0;
    }
    
    let wish = differences(tail(tn1), tail(tn2));
    let curr1 = head(tn1);
    let curr2 = head(tn2);
    
    if (is_number(curr1)) {
        return curr1 === curr2 
            ? wish
            : display(1 + wish);
    } else {
        return differences(curr1, curr2) + wish;
    }
}

function map_tree(f, tree) {
    return map(sub_tree => ! is_list(sub_tree)
                ? f(sub_tree)
                : map_tree(f, sub_tree),
                tree );
}

function increment(tn) {
    return map_tree(x => x + 1, tn);
}

function array_with_zeros(n) {
    let arr = [];
    let count = 0;
    while (count < n) {
        arr[count] = 0;
        count = count + 1;
    }
    return arr;
}

function make_histogram(arr, max) {
    let len = array_length(arr);
    let histogram = array_with_zeros(max + 1);
    
    for (let i = 0; i < len; i = i + 1) {
        let value = arr[i];
        histogram[value] = histogram[value] + 1;
    }
    return histogram;
}


function enter_copies(arr, n, v, start) {
    for (let i = start; i < start + n; i = i + 1) {
        arr[i] = v;
    }
    return arr;
}

function generate_sorted(histogram) {
    let final = [];
    let final_count = 0;
    
    for (let j = 0; histogram[j] !== undefined; j = j + 1) {
        let copies_count = histogram[j]; 
        
        if (copies_count !== 0) {
            enter_copies(final, copies_count,
                        j, final_count);
            final_count = final_count + copies_count;
        }
    }
    return final;
}

generate_sorted([0, 2, 1, 1, 0, 2, 0, 1, 0, 0, 1, 0, 0]);

function evaluate(component, env) { 
    return is_literal(component)
        ...
        ? literal_value(component)
        : is_lambda_expression(component)
        ? evaluate_lambda_expression(component, env);
        ...
        : error(component, "Unknown syntax -- evaluate");
}

function distinct(xs) {
    if (is_null(xs) || is_null(tail(xs))) {
        return true;    
    } else {
        return is_null(member(head(xs), tail(xs)))
            ? distinct(tail(xs))
            : false;
    }
}

function evaluate_lambda_expression(component, env) {
    let params = lambda_parameter_symbols(component);
    
    if (distinct(params)) {
        return make_function(params, lambda_body(component),
                    env);
    } else {
        display("parameters in function definition not unique");
    }
}






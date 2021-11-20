function make_ring(state, id) { 
    return pair(state, id);
}

function ring_state(ring) {
    return head(ring); 
}

function ring_id(ring) { 
    return tail(ring);
}

function make_uniform_distribution(state, n) {
    return build_list(x => make_ring(state, n-x), n);
}

function make_free_configuration(first_state, n) {
    return n === 0
        ? null
        : pair(make_ring(first_state, n), 
                make_uniform_distribution("off", n-1)
                );
}

function check_free_configuration(first_state, rings) {
    if (ring_state(head(rings)) !== first_state || ring_id(head(rings)) !== length(rings)) {
        return false;
    }

    return tail(accumulate( (x, y) => pair( head(y) + 1,
                                        tail(y) && 
                                        ring_state(x) === "off" &&
                                        ring_id(x) === head(y)
                                        ),
                                 pair(1, true),
                                 tail(rings) ));
}

function make_step(action, id) {
    return pair(action, id);
}

function step_action(step) {
    return head(step);
}

function step_id(step) {
    return tail(step);
}

function step_to_string(step) {
    return head(step) + " ring " + stringify(tail(step));
}

function steps_to_string(steps) {
    return accumulate(
                (x, y) => x + y, "", 
                    map(x => step_to_string(x) + "\n", steps));
}

function flip(ring) {
    set_head(ring, head(ring) === "on" ? "remove" : "insert");
    return ring;
}

function steps_to_free_configuration1(desired_first_state, rings) {
    
    function make_off(a, b) {
            return ring_state(a) === "on"
                ? pair(make_step("remove", ring_id(a)), b)
                : b;
    }
    
    if (ring_state(head(rings)) === desired_first_state) {
        return accumulate(make_off, null, tail(rings));
    } else {
        let step = ring_state(head(rings)) === "on" ? "remove" : "insert";
        let id = ring_id(head(rings));
        return pair( make_step(step, id), 
                    accumulate(make_off, null, tail(rings)) );
    }
}
function steps_to_free_configuration(desired_first_state, rings) {
return is_null(rings)
// base case: empty sequence is free configuration 
? null
: ring_state(head(rings)) === desired_first_state
             // first ring is ok: compute steps to make the
             // rest into a uniform off sequence
           ? steps_to_free_configuration("off", tail(rings))
             // we need to flip the first ring
             // (for this, the second ring must be on
             //  and the rest off)
           : append(steps_to_free_configuration("on",
                                                tail(rings)),
                    pair(flip(head(rings)),
                         steps_to_free_configuration("off",
                            make_free_configuration("on",
                                           length(rings) - 1)
) )
);
}

function solve(n) {
    return steps_to_free_configuration("on", 
                make_uniform_distribution("on", n));
}


function step_to_legal_move(step) {
    // is_legal returns true if and only if step can be
    // carried out (is legal) on the configuration cfg. 
    function is_legal(cfg) {
        const n = length(cfg); 
        if (step_id(step) > n) {
            return false; 
        } else {
            const the_ring = list_ref(cfg, n - step_id(step)); 
            const right = tail(member(the_ring, cfg));
            return (step_action(flip(the_ring)) === step_action(step)) &&
                                    check_free_configuration("on", right);
        }
    }
    
    return cfg => { 
        if (is_legal(cfg)) {
            let position = list_ref(cfg, length(cfg) - step_id(step) - 1);
            set_head(position, step_action(step) === "remove" ? "off" : "on");
        }
        return cfg;
    };
    
}

function legal_move_to_step(legal_move) {
    
}

function check_solver(n, solve) {
    const steps = solve(n);
    const legal_moves = map(step_to_legal_move, steps);
    let initial = pair(make_ring("off", n), make_uniform_distribution("on", n-1));
    return map(x => legal_moves(initial), steps) 
        === make_uniform_distribution("off", n);
}



check_solver(9, solve);









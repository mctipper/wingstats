export type ActivationResultMode =
    // >=1 success counts as 1 EV
    'binary'
    // each success count towards EV
    | 'binomial';
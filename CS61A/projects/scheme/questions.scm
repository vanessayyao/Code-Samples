(define (caar x) (car (car x)))
(define (cadr x) (car (cdr x)))
(define (cadar x) (car (cdr (car x))))
(define (cdar x) (cdr (car x)))
(define (cddr x) (cdr (cdr x)))

;; Problem 13
;; Returns a list of two-element lists
(define (enumerate s)
  ; BEGIN PROBLEM 13
  (define (curr x s)
    (if (null? s) 
      nil
      (cons (list x (car s)) (curr (+ x 1) (cdr s)))))
  (curr 0 s)
  ; END PROBLEM 13
)


;; Problem 14

;; Return the value for a key in a dictionary list
(define (get dict key)
  ; BEGIN PROBLEM 14
  (cond
    ((null? dict) #f)
    ((eq? (caar dict) key) (car (cdar dict)))
    (else (get (cdr dict) key)))
  ; END PROBLEM 14
  )

;; Return a dictionary list with a (key value) pair
(define (set dict key val)
  ; BEGIN PROBLEM 14
  (cond
    ((null? dict) (list (list key val)))
    ((eq? key (caar dict)) (cons (list key val) (cdr dict)))
    (else (cons (car dict) (set (cdr dict) key val))))
  ; END PROBLEM 14
  )

;; Problem 15

;; implement solution-code
(define (solution-code problem solution)
  ; BEGIN PROBLEM 15
  (cond
      ((null? problem) nil)
      ((not (list? (car problem)))
        (cons 
          (if (eq? (car problem) '_____) solution (car problem)) (solution-code (cdr problem) solution)))
      (else 
        (cons (solution-code (car problem) solution) (solution-code (cdr problem) solution))))
  ; END PROBLEM 15
  )

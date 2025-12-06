def composed(f, g):
    return lambda x: f(g(x))

def repeat(f, n):
    def helper(g, m):
        if m == 1:
            return lambda x: g(x)
        else:
            return helper(composed(f, g), m-1)
    return helper(f, n)

def square(x):
    return x*x

print(repeat(square, 2)(5))

test = {
  'name': 'Iterators',
  'points': 0,
  'suites': [
    {
      'cases': [
        {
          'code': r"""
          >>> # Enter StopIteration if StopIteration exception occurs, Error for other errors
          >>> # Enter Iterator if the output is an iterator object.
          >>> s = [1, 2, 3, 4]
          >>> t = iter(s)
          >>> next(s)
          Error
          >>> next(t)
          1
          >>> next(t)
          2
          >>> next(iter(s))
          1
          >>> next(iter(s))
          1
          >>> next(t)
          3
          >>> next(t)
          4
          """,
          'hidden': False,
          'locked': False,
          'multiline': False
        },
        {
          'code': r"""
          >>> r = range(6)
          >>> r_iter = iter(r)
          >>> next(r_iter)
          0
          >>> [x + 1 for x in r]
          [1, 2, 3, 4, 5, 6]
          >>> [x + 1 for x in r_iter]
          [2, 3, 4, 5, 6]
          >>> next(r_iter)
          5ae3a662faab36325ff2515dae9b0edd
          # locked
          """,
          'hidden': False,
          'locked': True,
          'multiline': False
        },
        {
          'code': r"""
          >>> map_iter = map(lambda x : x + 10, range(5))
          >>> next(map_iter)
          c3fb2b60594bc44d1fb463ee64add7e4
          # locked
          >>> next(map_iter)
          b175ff944106bc551fe6cd7d299a8a62
          # locked
          >>> list(map_iter)
          432189140c9520338be16c9d678a44d5
          # locked
          >>> for e in filter(lambda x : x % 4 == 0, range(1000, 1008)):
          ...     print(e)
          3dab7ee8f513b748e8368e1dbd9ae002
          c4498dd9e0ddf4e9c57b1a6b498e7087
          # locked
          >>> [x + y for x, y in zip([1, 2, 3], [4, 5, 6])]
          7242aed8fdd814d9456c884eda215d73
          # locked
          """,
          'hidden': False,
          'locked': True,
          'multiline': False
        }
      ],
      'scored': False,
      'type': 'wwpp'
    }
  ]
}

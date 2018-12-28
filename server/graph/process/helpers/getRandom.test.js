const getRandom = require('./getRandom')

const mockRandom = jest.fn(() => 0)

beforeAll(() => {
  Math.random = mockRandom
})

describe('argument validation', () => {
  const things = [
    'a',
    ['a'],
    { the: 'moon' },
    true
  ]
  it('throws if the argument is not a Map', () => {
    things.forEach(thing => {
      expect(() => getRandom(thing)).toThrow(
        '[getRandom] argument should be a map of item:weight pairs!'
      )
    })
  })
  it('throws if Map values arent numbers', () => {
    let map
    things.forEach(thing => {
      map = new Map()
      map.set('key', thing)
      expect(() => getRandom(map)).toThrow(
        '[getRandom] the values of the argument map should all be numbers!'
      )
    })
  })
  it('throws if the map argument is empty', () => {
    const map = new Map()
    expect(() => getRandom(map)).toThrow(
      '[getRandom] the map argument should have some values!'
    )
  })
})

it('if there is only one item, it is always returned', () => {
  const map = new Map()
  const onlyThing = { the: 'moon' }
  map.set(onlyThing, 123456)
  expect(getRandom(map)).toEqual(onlyThing)
})

describe('equal weighting', () => {
  describe('for two items, each has a 50% chance of being returned', () => {
    const weight = 12345
    const items = ['first item', 'second item']
    let map

    beforeAll(() => {
      map = new Map()
      items.forEach(item => {
        map.set(item, weight)
      })
    })

    it('when random returns 0', () => {
      mockRandom.mockReturnValueOnce(0)
      expect(getRandom(map)).toBe(items[0])
    })
    it('when random returns 0.49999999', () => {
      mockRandom.mockReturnValueOnce(0.49999999)
      expect(getRandom(map)).toBe(items[0])
    })
    it('when random returns 0.5', () => {
      mockRandom.mockReturnValueOnce(0.5)
      expect(getRandom(map)).toBe(items[1])
    })
    it('when random returns 1', () => {
      mockRandom.mockReturnValueOnce(1)
      expect(getRandom(map)).toBe(items[1])
    })
  })
  describe('for ten items, each has a 10% chance of being returned', () => {
    const weight = 1
    const items = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
    let map

    beforeAll(() => {
      map = new Map()
      items.forEach(item => {
        map.set(item, weight)
      })
    })

    it('when random returns 0', () => {
      mockRandom.mockReturnValueOnce(0)
      expect(getRandom(map)).toBe(items[0])
    })
    it('when random returns 0.09999999', () => {
      mockRandom.mockReturnValueOnce(0.09999999)
      expect(getRandom(map)).toBe(items[0])
    })

    it('when random returns 0.1', () => {
      mockRandom.mockReturnValueOnce(0.1)
      expect(getRandom(map)).toBe(items[1])
    })
    it('when random returns 0.19999999', () => {
      mockRandom.mockReturnValueOnce(0.19999999)
      expect(getRandom(map)).toBe(items[1])
    })

    it('when random returns 0.2', () => {
      mockRandom.mockReturnValueOnce(0.2)
      expect(getRandom(map)).toBe(items[2])
    })
    it('when random returns 0.29999999', () => {
      mockRandom.mockReturnValueOnce(0.29999999)
      expect(getRandom(map)).toBe(items[2])
    })

    it('when random returns 0.3', () => {
      mockRandom.mockReturnValueOnce(0.3)
      expect(getRandom(map)).toBe(items[3])
    })
    it('when random returns 0.39999999', () => {
      mockRandom.mockReturnValueOnce(0.39999999)
      expect(getRandom(map)).toBe(items[3])
    })

    it('when random returns 0.4', () => {
      mockRandom.mockReturnValueOnce(0.4)
      expect(getRandom(map)).toBe(items[4])
    })
    it('when random returns 0.49999999', () => {
      mockRandom.mockReturnValueOnce(0.49999999)
      expect(getRandom(map)).toBe(items[4])
    })

    it('when random returns 0.5', () => {
      mockRandom.mockReturnValueOnce(0.5)
      expect(getRandom(map)).toBe(items[5])
    })
    it('when random returns 0.59999999', () => {
      mockRandom.mockReturnValueOnce(0.59999999)
      expect(getRandom(map)).toBe(items[5])
    })

    it('when random returns 0.6', () => {
      mockRandom.mockReturnValueOnce(0.6)
      expect(getRandom(map)).toBe(items[6])
    })
    it('when random returns 0.69999999', () => {
      mockRandom.mockReturnValueOnce(0.69999999)
      expect(getRandom(map)).toBe(items[6])
    })

    it('when random returns 0.7', () => {
      mockRandom.mockReturnValueOnce(0.7)
      expect(getRandom(map)).toBe(items[7])
    })
    it('when random returns 0.79999999', () => {
      mockRandom.mockReturnValueOnce(0.79999999)
      expect(getRandom(map)).toBe(items[7])
    })

    it('when random returns 0.8', () => {
      mockRandom.mockReturnValueOnce(0.8)
      expect(getRandom(map)).toBe(items[8])
    })
    it('when random returns 0.89999999', () => {
      mockRandom.mockReturnValueOnce(0.89999999)
      expect(getRandom(map)).toBe(items[8])
    })

    it('when random returns 0.9', () => {
      mockRandom.mockReturnValueOnce(0.9)
      expect(getRandom(map)).toBe(items[9])
    })
    it('when random returns 0.99999999', () => {
      mockRandom.mockReturnValueOnce(0.99999999)
      expect(getRandom(map)).toBe(items[9])
    })

    it('when random returns 1', () => {
      mockRandom.mockReturnValueOnce(1)
      expect(getRandom(map)).toBe(items[9])
    })
  })
})

describe('unequal weighting', () => {
  describe('for two items, the second weighted double the first, the second is twice as likely to be returned as the first', () => {
    const weight = 1
    const items = ['first item', 'second item']
    let map

    beforeAll(() => {
      map = new Map()
      map.set(items[0], weight)
      map.set(items[1], weight * 2)
    })

    it('when random returns 0', () => {
      mockRandom.mockReturnValueOnce(0)
      expect(getRandom(map)).toBe(items[0])
    })
    it('when random returns 0.333299999', () => {
      mockRandom.mockReturnValueOnce(0.333299999)
      expect(getRandom(map)).toBe(items[0])
    })

    it('when random returns 0.333333333', () => {
      mockRandom.mockReturnValueOnce(0.333333333)
      expect(getRandom(map)).toBe(items[1])
    })
    it('when random returns 0.999999999', () => {
      mockRandom.mockReturnValueOnce(0.999999999)
      expect(getRandom(map)).toBe(items[1])
    })

    it('when random returns 1', () => {
      mockRandom.mockReturnValueOnce(1)
      expect(getRandom(map)).toBe(items[1])
    })
  })
  describe('for three items, weighted 1, 2 and 3', () => {
    const weight = 1
    const items = [
      'first item',
      'second item',
      'third item'
    ]

    let map

    beforeAll(() => {
      map = new Map()
      map.set(items[0], weight)
      map.set(items[1], weight * 2)
      map.set(items[2], weight * 3)
    })

    describe('the first item has a one in six chance of appearing', () => {
      it('when random returns 0', () => {
        mockRandom.mockReturnValueOnce(0)
        expect(getRandom(map)).toBe(items[0])
      })
      it('when random returns 0.1666', () => {
        mockRandom.mockReturnValueOnce(0.1666)
        expect(getRandom(map)).toBe(items[0])
      })
    })

    describe('the second item has a two in six chance of appearing', () => {
      it('when random returns 0.1667', () => {
        mockRandom.mockReturnValueOnce(0.1667)
        expect(getRandom(map)).toBe(items[1])
      })
      it('when random returns 0.499999999', () => {
        mockRandom.mockReturnValueOnce(0.499999999)
        expect(getRandom(map)).toBe(items[1])
      })
    })

    describe('the third item has a three in six chance of appearing', () => {
      it('when random returns 0.5', () => {
        mockRandom.mockReturnValueOnce(0.5)
        expect(getRandom(map)).toBe(items[2])
      })
      it('when random returns 0.99999999', () => {
        mockRandom.mockReturnValueOnce(0.99999999)
        expect(getRandom(map)).toBe(items[2])
      })
      it('when random returns 1', () => {
        mockRandom.mockReturnValueOnce(1)
        expect(getRandom(map)).toBe(items[2])
      })
    })
  })
})

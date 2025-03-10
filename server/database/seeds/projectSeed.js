const projects = [
{
  name: 'Prom Dress',
  description: 'Daria wants an elegant navy dress',
  tasks: [
    {
      name:'Cut fabric to pattern',
      description: 'Cut fabric to pattern',
      isComplete: false,
      priority: 1
    },
    {
      name:'Ensure that the pattern is sized correctly',
      description: "Meet with Daria on Friday to get measurements",
      isComplete: false,
      priority: 2
    }
  ],
  patterns: [
    {
    name: 'Fancy Dress',
    description: 'A very fancy dress pattern',
    stashed: null
    }
  ],
  fabrics:[
    {
      description: 'Navy Satin',
      quantity: 18,
      stashed: null
    }
  ],
  notions:[
    {
      description: 'needles',
      quantity: 1000,
      stashed: null
    },
    {
      description: 'Navy thread',
      quantity: 12000,
      stashed: null
    }
  ],
}
]

module.exports = projects
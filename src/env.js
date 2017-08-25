let ENV

if (process.env.NODE_ENV === 'production') {
  ENV = {
    root: ''
  }
} 
else {
  ENV = {
    root: '[be]'
  }
}

export default ENV

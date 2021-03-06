/* global describe, it */
'use strict'
import {expect} from 'chai'
import funcHasParam from '../lib/'

describe('func-has-param', () => {
  it('should throw an Error when opts.language isn\'t \'js\' or \'coffee\'', () => {
    const testFunction = () =>
      funcHasParam('fileContents', 'function', 'param', {language: 'english'})

    expect(testFunction).to.throw(Error, /Expected opts.language to be 'js' or 'coffee'/)
  })

  it('should throw a TypeError when contents isn\'t a string', () => {
    const testFunction = () => funcHasParam()

    expect(testFunction).to.throw(TypeError, /Expected contents to be a string/)
  })

  it('should throw an Error when contents is an empty string', () => {
    const testFunction = () => funcHasParam('')

    expect(testFunction).to.throw(Error, /Expected contents to be non-empty string/)
  })

  it('should throw a TypeError when functionName isn\'t a string', () => {
    const testFunction = () => funcHasParam('fileContents')

    expect(testFunction).to.throw(TypeError, /Expected functionName to be a string/)
  })

  it('should throw an Error when functionName is an empty string', () => {
    const testFunction = () => funcHasParam('fileContents', '')

    expect(testFunction).to.throw(Error, /Expected functionName to be non-empty string/)
  })

  it('should throw an Error when functionName has whitespace', () => {
    const testFunctionSpace = () => funcHasParam('fileContents', ' ')

    const testFunctionTab = () => funcHasParam('fileContents', '  ')

    const testFunctionNewline = () => funcHasParam('fileContents', '\n')

    expect(testFunctionSpace).to.throw(Error, /Expected functionName to not contain whitespace/)
    expect(testFunctionTab).to.throw(Error, /Expected functionName to not contain whitespace/)
    expect(testFunctionNewline).to.throw(Error, /Expected functionName to not contain whitespace/)
  })

  it('should throw a TypeError when paramName isn\'t a string', () => {
    const testFunction = () => funcHasParam('fileContents', 'functionName')

    expect(testFunction).to.throw(TypeError, /Expected paramName to be a string/)
  })

  it('should throw an Error when paramName is empty string', () => {
    const testFunction = () => funcHasParam('fileContents', 'functionName', '')

    expect(testFunction).to.throw(Error, /Expected paramName to be non-empty string/)
  })

  it('should throw an Error when paramName has whitespace', () => {
    const testFunctionSpace = () => funcHasParam('fileContents', 'functionName', ' ')

    const testFunctionTab = () => funcHasParam('fileContents', 'functionName', '  ')

    const testFunctionNewline = () => funcHasParam('fileContents', 'functionName', '\n')

    expect(testFunctionSpace).to.throw(Error, /Expected paramName to not contain whitespace/)
    expect(testFunctionTab).to.throw(Error, /Expected paramName to not contain whitespace/)
    expect(testFunctionNewline).to.throw(Error, /Expected paramName to not contain whitespace/)
  })

  it('should throw an error when functionName isn\'t in fileContents', () => {
    const testFunction1 = () => funcHasParam('fileContents', 'functionName', 'paramName')

    const testFunction2 = () => funcHasParam('fileContents', 'funcName', 'paramName')

    expect(testFunction1).to.throw(Error, /Expected function functionName to be in fileContents/)
    expect(testFunction2).to.throw(Error, /Expected function funcName to be in fileContents/)
  })

  describe('JavaScript', () => {
    it('should return false when function functionName doesn\'t have parameter paramName', () => {
      const fileContents = [
        'function test() {}',
        'function test () {return param}',
        `function test (x,
                        y,
                        z) {
          return false',
        }`
      ]

      fileContents.forEach(fileContent => {
        expect(funcHasParam(fileContent, 'test', 'param')).to.eql(false)
      })
    })

    it('should return true when function functionName has parameter paramName', () => {
      const fileContents = [
        'function test(param) {}',
        'function test(x, y, param) {}',
        'function test(x, y, param, z) {}',
        'function test (param) {}',
        'function test (x, y, param) {}',
        'function test (x, y, param, z) {}',
        `function test (x,
                        y,
                        param,
                        z) {}`
      ]

      fileContents.forEach(fileContent => {
        expect(funcHasParam(fileContent, 'test', 'param')).to.eql(true)
      })
    })
  })

  describe('CoffeeScript', () => {
    it('should return false when function functionName doesn\'t have parameter paramName', () => {
      const fileContents = [
        'test = () -> {}',
        'test = () -> {param}',
        `test = (x,
                 y,
                 z) -> {
          false
        }`
      ]

      fileContents.forEach(fileContent => {
        expect(funcHasParam(fileContent, 'test', 'param', {language: 'coffee'})).to.eql(false)
      })
    })

    it('should return true when function functionName has parameter paramName', () => {
      const fileContents = [
        'test=(param)->{}',
        'test=(x,y,param)->{}',
        'test=(x,y,param,z)->{}',
        'test = (param) -> {}',
        'test = (x, y, param) -> {}',
        'test = (x, y, param, z) -> {}',
        `test = (x,
                 y,
                 param,
                 z,) -> {}`
      ]

      fileContents.forEach(fileContent => {
        expect(funcHasParam(fileContent, 'test', 'param', {language: 'coffee'})).to.eql(true)
      })
    })

    it('should return false when using custom regex and match does not occur', () => {
      const fileContents = [
        '.config (param) -> {}'
      ]

      const opts = {
        language: 'coffee',
        regex: '.config \\(([\\s\\S]*?)\\)'
      }

      fileContents.forEach(fileContent => {
        expect(funcHasParam(fileContent, 'config', 'param', opts)).to.eql(true)
      })
    })

    it('should return true when using custom regex and match occurs', () => {
      const fileContents = [
        '.config (param) -> {}'
      ]

      const opts = {
        language: 'coffee',
        regex: '.config \\(([\\s\\S]*?)\\)'
      }

      fileContents.forEach(fileContent => {
        expect(funcHasParam(fileContent, 'config', 'param', opts)).to.eql(true)
      })
    })
  })

  describe('TypeScript', () => {
    it('should return false when function functionName doesn\'t have parameter paramName', () => {
      const fileContents = [
        'function test() {}',
        'function test():string {}',
        'function test() : string {}',
        'function test () {return param}',
        `function test (x,
                        y,
                        z) {
          return false
        }`
      ]

      fileContents.forEach(fileContent => {
        expect(funcHasParam(fileContent, 'test', 'param', {language: 'ts'})).to.eql(false)
      })
    })

    it('should return true when function functionName has parameter paramName', () => {
      const fileContents = [
        'function test(param) {}',
        'function test(x, y, param) {}',
        'function test(x, y, param, z) {}',
        'function test(x, y, param, z):string {}',
        'function test(x:string, y:string, param:string, z:string):string {}',
        'function test (param) {}',
        'function test (x, y, param) {}',
        'function test (x, y, param, z) {}',
        'function test (x, y, param, z) : string {}',
        'function test (x : string, y : string, param : string, z : string) : string {}',
        `function test (x,
                        y,
                        param,
                        z) {}`
      ]

      fileContents.forEach(fileContent => {
        expect(funcHasParam(fileContent, 'test', 'param', {language: 'ts'})).to.eql(true)
      })
    })

    it('should return false when function functionName has parameter paramName with incorrect type', () => {
      const fileContents = [
        'function test(x:string, y:string, param:string, z:string):string {}',
        'function test (x : string, y : string, param : string, z : string) : string {}'
      ]

      fileContents.forEach(fileContent => {
        expect(funcHasParam(fileContent, 'test', 'param', {language: 'ts', type: 'int'})).to.eql(false)
      })
    })

    it('should return true when function functionName has parameter paramName with type', () => {
      const fileContents = [
        'function test(x:string, y:string, param:string, z:string):string {}',
        'function test (x : string, y : string, param : string, z : string) : string {}'
      ]

      fileContents.forEach(fileContent => {
        expect(funcHasParam(fileContent, 'test', 'param', {language: 'ts', type: 'string'})).to.eql(true)
      })
    })
  })
})

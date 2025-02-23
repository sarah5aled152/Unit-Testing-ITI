import { StrengthPipe } from "./strength.pipe"

describe('strength Pipe',()=>{

    let strengthPip:StrengthPipe;
    beforeEach(()=>{
        strengthPip=new StrengthPipe()
    })
    it('transform():Test if value<10 should return weak',()=>{
        // expect(strengthPip.transform(4)).toContain('weak')
        expect(strengthPip.transform(4)).toMatch(/\(weak\)$/)
    })
    it('transform():Test if value >= 10 && value < 20 should return strong',()=>{
        // expect(strengthPip.transform(4)).toContain('weak')
        expect(strengthPip.transform(13)).toMatch(/\(strong\)$/)
    })
    it('transform():Test if  value > 20 should return unbelievable',()=>{
        expect(strengthPip.transform(22)).toMatch(/\(unbelievable\)$/)
    })
})
import { ComponentFixture, TestBed } from "@angular/core/testing"
import { CounterComponent } from "./counter.component"
import { By } from "@angular/platform-browser"

describe('Test Counter component ',()=>{
    let fixture:ComponentFixture<CounterComponent>
    let component:CounterComponent
    beforeEach(()=>{
        TestBed.configureTestingModule({
            imports:[CounterComponent]
        })
       fixture=TestBed.createComponent(CounterComponent)
    //    counter class obj
       component=fixture.componentInstance
       fixture.detectChanges()
       
    })

    it("Test initial counter value",()=>{
        // expect(component.counter).toBe(0)
        component.counter=10
        expect(component.counter).toBe(10)
    })
    it("Test that p tag has counter value",()=>{
        let pTag=fixture.debugElement.query(By.css('p'))
        expect(pTag.nativeElement.textContent).toContain("0")
    })
    it("Test that p tag has counter++ after click increse btn",()=>{
        let incBtn=fixture.debugElement.query(By.css('#inc'))
        incBtn.triggerEventHandler('click')
        fixture.detectChanges()
        let pTag=fixture.debugElement.query(By.css('p'))
        expect(pTag.nativeElement.textContent).toContain("1")
    })

})
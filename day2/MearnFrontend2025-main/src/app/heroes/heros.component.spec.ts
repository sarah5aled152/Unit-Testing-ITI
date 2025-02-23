import { of } from "rxjs";
import { Hero } from "../hero";
import { HeroService } from "../services/hero service/hero.service";
import { HeroesComponent } from "./heroes.component";

describe('Test Heros component',()=>{
    let component:HeroesComponent,
    heroServiceMock:jasmine.SpyObj<HeroService>;
    let mockHeroList:Hero[];

    beforeEach(()=>{
        mockHeroList=[
            {id:123,name:'superMan',strength:100},
            {id:1232,name:'batMan',strength:200},
            {id:456,name:'spiderMan',strength:300},
        ]
        // mocking
        heroServiceMock= jasmine.createSpyObj([
            'getHeroes',
            'addHero',
            'deleteHero'
        ])
        heroServiceMock.getHeroes.and.returnValue(of(mockHeroList))
        component=new HeroesComponent(heroServiceMock)

    })
    it('test that have heros after call ngOnInit',()=>{
        component.ngOnInit()
        expect(heroServiceMock.getHeroes).toHaveBeenCalled()
        expect(component.heroes).toHaveSize(3)
    })
})
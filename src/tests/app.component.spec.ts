import { TestBed, async } from '@angular/core/testing';
import { AppComponent } from '../../src/app/app.component';
import inputJson from '../assets/text.json';
import resultsJson from '../assets/results.json';


describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent
      ],
    }).compileComponents();
  }));

  it('should have parseGroupToLayerMap that is equivalent to results', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    app.layerColorMap = app.parseGroupToLayerMap(inputJson);
    console.log('layer color map', app.layerColorMap);
    const results = app.getLayerColorWithCounts();
    expect( results ).toEqual( resultsJson );
  });
});

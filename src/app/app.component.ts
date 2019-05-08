import { Component, OnInit } from "@angular/core";
import { GroupService } from "./group.service";

import json from "../assets/results.json";
import { IGroup, IGroupContainer } from "./model/group";
import { ILayer } from "./model/layer";
@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent implements OnInit {
  public layerColorMap: { [color: string]: ILayer[] } = {};

  constructor(private groupService: GroupService) {}

  public ngOnInit() {
    this.groupService.getJSON().subscribe(data => {
      this.layerColorMap = this.parseGroupToLayerMap(data);
    });
  }

  public parseGroupToLayerMap(rootGroup: IGroupContainer): { [color: string]: ILayer[] } {
    const colorMap: { [color: string]: ILayer[] } = {};

    // sort through layers of JSON to get down to where the colors are
    let array = rootGroup.groupGroups[0].groupGroups.map(item =>  item.groupGroups);
    
    // map all colors into nested arrays of all the colors 
    var arrayOfColors = array.map(nested=> nested.map(element => element.layerFill.fillSolidColor));
    
    // merge into a single array
    var merged = [].concat.apply([], arrayOfColors);
    
    // convert to object and add up occurances
    merged.reduce((res,cur) => {
      (!res[cur])? res[cur] = [1] : res[cur]+=1;
      return res;
    }, colorMap);
    return colorMap;
  }

  // Called from template to show results
  public getLayerColorWithCounts(): { color: string; count: number }[] {
    return Object.keys(this.layerColorMap).map(k => {
      return { color: k, count: this.layerColorMap[k].length };
    });
  }

  private isGroupContainer(group: IGroup) {
    return (
      group.groupType === "GROUP" ||
      group.groupType === "TEXT" ||
      group.groupType === "GLYPH"
    );
  }

  // Called from template to show answer to compare to
  public displayResultsForComparison() {
    return json;
  }
}

export interface IGroup {
    groupGUID: string;
    groupType: 'GROUP' | 'TEXT' | 'GLYPH' | 'LAYER';
    groupGroups: any;
}

export interface IGroupContainer extends IGroup {
    groupGroups: IGroup[];
}

import { IGroup } from './group';
import { ILayerFill } from './layer-fill';

export interface ILayer extends IGroup {
  layerFill: ILayerFill;
}

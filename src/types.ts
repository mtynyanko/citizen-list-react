export interface IGroup {
  type: enumHierarchy;
  name: string;
  children?: Array<IGroup | ICitizen>;
}

export interface ICitizen {
  id: number;
  name: string;
  cityId: number;
  groups: { type: enumHierarchy; name: string}[];
}

export interface ICity {
  id: number;
  name: string;
  data: string;
}

export enum enumHierarchy {
  city = 'city',
  district = 'district',
  street = 'street',
}

export const isGroup = (item: IGroup | ICitizen): item is IGroup => {
  return (item as IGroup).type !== undefined && (item as IGroup).name !== undefined;
}
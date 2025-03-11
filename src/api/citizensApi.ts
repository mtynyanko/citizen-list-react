import { AxiosResponse } from "axios";
import { citizensApi } from "./api";
import { enumHierarchy, ICitizen, IGroup, isGroup } from "../types";

export const getCitizens = (): Promise<AxiosResponse<ICitizen[]>> => {
  return citizensApi.get("citizens");
}

export const getGroupedCitizens = async (hierarchy: enumHierarchy[]) => {
  const response: AxiosResponse<ICitizen[]> = await getCitizens();
  const citizens = response.data;

  const uniqueCitizens = citizens.map((citizen, index) => ({
    ...citizen,
    id: index + 1,
  }));

  return uniqueCitizens.reduce<IGroup[]>((acc, citizen) => {
    let currentLevel: Array<IGroup | ICitizen> = acc;

    citizen.groups.forEach(({ type, name }) => {

      if (!hierarchy.includes(type)) return;

      let existingGroup = currentLevel.find(item => isGroup(item) && item.type === type && item.name === name);
      
      if (!existingGroup) {
        existingGroup = { type, name, children: [] };
        currentLevel.push(existingGroup);
      }

      if (isGroup(existingGroup)) {
        currentLevel = existingGroup.children as (ICitizen | IGroup)[];
      }
    });

    currentLevel.push({
      id: citizen.id,
      cityId: citizen.cityId,
      name: citizen.name,
      groups: citizen.groups,
    } as ICitizen);

    return acc;
  }, []);
};
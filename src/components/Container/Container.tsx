import { useEffect, useState } from "react";
import { getGroupedCitizens } from "../../api/citizensApi";
import { enumHierarchy, ICitizen, ICity, IGroup, isGroup } from "../../types";
import { getCities } from "../../api/citiesApi";
import Citizen from "../Citizen/Citizen";
import "./Container.css";

const hierarchyOptions = [
  { label: "Город", value: enumHierarchy.city },
  { label: "Район", value: enumHierarchy.district },
  { label: "Улица", value: enumHierarchy.street },
];

const Container = () => {
  const [hierarchy, setHierarchy] = useState([
    enumHierarchy.city, 
    enumHierarchy.district, 
    enumHierarchy.street
  ]);
  const [groups, setGroups] = useState<IGroup[]>([]);
  const [cities, setCities] = useState<ICity[]>([]);

  useEffect(() => {
    getGroupedCitizens(hierarchy)
    .then(data => {
      setGroups(data)
    })
    .catch(error => {
      console.log(error)
    });
    getCities()
    .then(response => {
      setCities(response.data)

    })
    .catch(error => {
      console.log(error)
    });
  }, [hierarchy])

  const handleHierarchyChange = (value: enumHierarchy) => {
    setHierarchy((prev) =>
      prev.includes(value)
        ? prev.filter((item) => item !== value)
        : [...prev, value]
    );
  };
  
  const renderGroups = (groups: IGroup[], space: number) => {
    return groups.map((item, index) => {
      if (isGroup(item)) {
        return (
          <div className="container" key={index} style={{ marginLeft: `${space}px` }}>
            <span>{item.name}</span>
            {renderGroups(item.children as IGroup[], space + 50)}
          </div>
        );
      } else {
        const citizen = item as ICitizen;
        return (
          <Citizen 
            key={index}
            name={citizen.name}
            space={space}
            data={cities.find(city => city.id == citizen.cityId) || null}
          />
        );
      }
    });
  };

  return (<>
    <div className="hierarchy-controls">
      {hierarchyOptions.map(({ label, value }) => (
        <label key={value} className="checkbox-label">
        <input
          type="checkbox"
          checked={hierarchy.includes(value)}
          onChange={() => handleHierarchyChange(value)}
        />
        {label}
        </label>
      ))}
    </div>
    <div className="container">{renderGroups(groups, 0)}</div>
  </>);
} 
export default Container;
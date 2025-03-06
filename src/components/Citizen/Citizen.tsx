import { useState } from "react";
import { ICity } from "../../types";
import "./Citizen.css"

interface CitizenProps {
  name: string;
  data: ICity | null;
  space: number;
}

const Citizen = ({ name, data, space }: CitizenProps) => {
  const [showTooltip, setShowTooltip] = useState<boolean>(false);
  const [tooltip, setTooltip] = useState<{ x: number; y: number }>({x:0, y:0});

  const handleMouseMove = (event: React.MouseEvent) => {
    setTooltip({ x: event.clientX, y: event.clientY });
  };
  const handleMouseLeave = () => {
    console.log(data)
    setShowTooltip(false);
    setTooltip({x:0, y:0})
  }

  return (<>
    <span 
      className="item"
      onMouseEnter={() => setShowTooltip(true)}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ marginLeft: `${space}px` }}
    >
      {name}
    </span>
    {showTooltip && (
      <div className="tooltip"
      style={{
        top: tooltip.y + 10 + "px",
        left: tooltip.x + 10 + "px",
      }}
      >
        <p className="tooltip__text"> Город: {data?.name}</p>
        <p className="tooltip__text"> Кол-во жителей: {data?.data}</p>
      </div>
    )}

  </>)
}
export default Citizen;
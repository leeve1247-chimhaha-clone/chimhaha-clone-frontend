import { DropDownItems } from "./DropDownItems.tsx";
import { DropDownTrigger } from "./DropDownTrigger.tsx";
import { useDropdown } from "./utils.tsx";


export function DropDown() {
  const dropdown = useDropdown();
  return (
    <>
      <DropDownTrigger controller={dropdown} />
      {dropdown.isOpen && (
        <DropDownItems
          dropDownRef = {dropdown.dropDownRef}
          coords={dropdown.coords}
        />
      )}
    </>
  );
}
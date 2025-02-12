import { HeaderDropDownCategoryKeys } from "./HeaderDropDownCategory.tsx";
import DropDownElementList from "./category/DropDownElementList.tsx";

export default function DropDownElement({ group }: { group: HeaderDropDownCategoryKeys }) {
  const categories = {};

  const category = categories[group];

  if (category) {
    return (
      <>
        {Object.entries(category).map(([key, value]) => (
          <DropDownElementList key={key}>{value.name}</DropDownElementList>
        ))}
      </>
    );
  }
  return <div>error</div>;
}

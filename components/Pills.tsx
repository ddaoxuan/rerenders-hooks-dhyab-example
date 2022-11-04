import { useHierarchicalMenu } from 'react-instantsearch-hooks-web';

export const Pills = () => {
  const { items, refine } = useHierarchicalMenu({
    attributes: [
      'hierarchicalCategories.lvl0',
      'hierarchicalCategories.lvl1',
      'hierarchicalCategories.lvl2',
    ],
  });
  console.log(items, 'Pills rerender');

  return (
    <div>
      <h3>Pills (useHierarchicalMenu)</h3>
      {items.map((item, index) => {
        return (
          <div key={index}>
            <button onClick={() => refine(item.value)}>{item.label}</button>
          </div>
        );
      })}
    </div>
  );
};

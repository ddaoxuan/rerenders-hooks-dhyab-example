import { useHierarchicalMenu } from 'react-instantsearch-hooks-web';

export const HierarchicalMenu = () => {
  const { items } = useHierarchicalMenu({
    attributes: [
      'hierarchicalCategories.lvl0',
      'hierarchicalCategories.lvl1',
      'hierarchicalCategories.lvl2',
    ],
    limit: 20,
  });
  console.log(items, 'hierarchical menu rerender');
  return (
    <div>
      <h3>HierarchicalMenu (useHierarchicalMenu)</h3>
      {items.map((item, index) => {
        return (
          <div key={index}>
            <a href={`/${item.value}`}>{item.label}</a>
          </div>
        );
      })}
    </div>
  );
};

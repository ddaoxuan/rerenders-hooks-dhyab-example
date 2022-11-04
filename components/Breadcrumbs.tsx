import { useBreadcrumb } from 'react-instantsearch-hooks-web';

export const Breadcrumbs = () => {
  const { items, refine } = useBreadcrumb({
    attributes: [
      'hierarchicalCategories.lvl0',
      'hierarchicalCategories.lvl1',
      'hierarchicalCategories.lvl2',
    ],
  });
  console.log(items, 'breadcrumbs rerender');
  return (
    <div>
      <h3>Breadcrumbs (useBreadcrumb)</h3>
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

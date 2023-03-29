import React from "react";

const WithLayout = (LayoutComponent) => (PageComponent) => {
  const WrappedPageComponent = (props) => (
    <LayoutComponent>
      <PageComponent {...props} />
    </LayoutComponent>
  );
  WrappedPageComponent.displayName = `withLayout(${PageComponent.displayName || PageComponent.name || 'Component'})`;
  return WrappedPageComponent;
};

export default WithLayout

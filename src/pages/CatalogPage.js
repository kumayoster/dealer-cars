  import React from 'react';
  import CarCatalog from '../components/CarCatalog';

  const CatalogPage = () => {
    return (
      <div className="container mx-auto">
        <h1 className="text-3xl font-bold text-center my-6">Car Catalog</h1>
        <CarCatalog />
      </div>
    );
  };

  export default CatalogPage;

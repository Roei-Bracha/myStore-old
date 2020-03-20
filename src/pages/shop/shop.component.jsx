import React from 'react';
import {connect} from 'react-redux'

import CollectionPreview from '../../components/collection-preview/collection-preview';
import {createStructuredSelector} from "reselect";
import {selectCollectionsSection} from "../../redux/shop/shop.selector";

const ShopPage = ({ collections }) => {
    return (
      <div className='shop-page'>
        {collections.map(({ id, ...otherCollectionProps }) => (
          <CollectionPreview key={id} {...otherCollectionProps} />
        ))}
      </div>
    );
};

const mapStateToProps = createStructuredSelector({
  collections:selectCollectionsSection
});

export default connect(mapStateToProps) (ShopPage);

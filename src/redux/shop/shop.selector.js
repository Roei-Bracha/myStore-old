import {createSelector} from 'reselect';

const shopSelector = state => state.shop;

export const selectCollectionsSection = createSelector(
    [shopSelector],
    (shop)=> shop.collections
);


import React from 'react';
import {GridList, GridTile} from 'material-ui/GridList';
import IconButton from 'material-ui/IconButton';
import Subheader from 'material-ui/Subheader';
import StarBorder from 'material-ui/svg-icons/toggle/star-border';

const styles = {
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
  },
  gridList: {
    width: '100%',
    height: 500,
    marginBottom: 24,
  },
};

const tilesData = [
  {
    img: 'http://placehold.it/250x200',
    title: 'Breakfast',
    author: 'bjl',
  },
  {
    img: 'http://placehold.it/250x200',
    title: 'Tasty burger',
    author: 'pashminu',
  },
  {
    img: 'http://placehold.it/250x200',
    title: 'Camera',
    author: 'Danson67',
  },
  {
    img: 'http://placehold.it/250x200',
    title: 'Morning',
    author: 'fancycrave1',
  },
  {
    img: 'http://placehold.it/250x200',
    title: 'Hats',
    author: 'Hans',
  },
  {
    img: 'http://placehold.it/250x200',
    title: 'Honey',
    author: 'fancycravel',
  },
  {
    img: 'http://placehold.it/250x200',
    title: 'Vegetables',
    author: 'jill111',
  },
  {
    img: 'http://placehold.it/250x200',
    title: 'Water plant',
    author: 'BkrmadtyaKarki',
  },
];

const GridListExampleSimple = () => (
  <div style={styles.root}>
    <GridList
      cellHeight={200}
      style={styles.gridList}
    >
      <Subheader>December</Subheader>
      {tilesData.map((tile) => (
        <GridTile
          key={tile.author}
          title={tile.title}
          subtitle={<span>by <b>{tile.author}</b></span>}
          actionIcon={<IconButton><StarBorder color="white"/></IconButton>}
        >
          <img src={tile.img}/>
        </GridTile>
      ))}
    </GridList>
  </div>
);

export default GridListExampleSimple;
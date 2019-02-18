/* eslint-disable no-param-reassign */
/* eslint-disable no-multi-assign */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Masonry from 'react-masonry-component';
import anime from 'animejs';
import effects from '../utils/AnimePresets';

class MasonryList extends Component {
  static defaultProps = {
    animationName: 'Sobek',
  };

  constructor(props) {
    super(props);
    this.el = null;
    this.items = null;
    this.cacheElements = this.cacheElements.bind(this);
    this.resetStyle = this.resetStyle.bind(this);
    this.animate = this.animate.bind(this);
  }

  componentDidMount() {
    this.cacheElements();
    this.resetStyle();
    this.animate(this.props.animationName);
  }

  componentDidUpdate(prevProps) {
    const { items, animationName } = this.props;
    if (items && prevProps.items !== items) {
      this.cacheElements(prevProps.items, items);
      this.resetStyle();
      this.animate(animationName);
    }
  }

  cacheElements(from = 0, to) {
    const { itemSelector } = this.props;
    const allItems = Array.from(this.el.querySelectorAll(`.${itemSelector}`));
    if (to) {
      this.items = allItems.slice(from, to);
    } else {
      this.items = allItems;
    }
  }

  resetStyle() {
    this.el.style.WebkitPerspective = this.el.style.perspective = 'none';
    this.items.forEach(item => {
      const gItem = item.parentNode;
      item.style.opacity = 0;
      item.style.WebkitTransformOrigin = item.style.transformOrigin = '50% 50%';
      item.style.transform = 'none';

      const svg = item.parentNode.querySelector('svg.grid__deco');
      if (svg) {
        gItem.removeChild(svg);
      }

      const revealer = item.parentNode.querySelector('.grid__reveal');
      if (revealer) {
        gItem.removeChild(revealer);
      }

      gItem.style.overflow = '';
    });
  }

  animate(effect) {
    const effectSettings = effects[effect];
    const { animeOpts } = effectSettings;

    if (effectSettings.perspective !== undefined) {
      this.items.forEach(item => {
        item.parentNode.style.WebkitPerspective = item.parentNode.style.perspective = `${
          effectSettings.perspective
        }px`;
      });
    }

    if (effectSettings.origin !== undefined) {
      this.items.forEach(item => {
        item.style.WebkitTransformOrigin = item.style.transformOrigin =
          effectSettings.origin;
      });
    }

    if (effectSettings.lineDrawing !== undefined) {
      this.items.forEach(item => {
        const svg = document.createElementNS(
          'http://www.w3.org/2000/svg',
          'svg',
        );
        const path = document.createElementNS(
          'http://www.w3.org/2000/svg',
          'path',
        );
        const itemW = item.offsetWidth;
        const itemH = item.offsetHeight;

        svg.setAttribute('width', `${itemW}px`);
        svg.setAttribute('height', `${itemH}px`);
        svg.setAttribute('viewBox', `0 0 ${itemW} ${itemH}`);
        svg.setAttribute('class', 'grid__deco');
        path.setAttribute(
          'd',
          `M0,0 l${itemW},0 0,${itemH} -${itemW},0 0,-${itemH}`,
        );
        path.setAttribute('stroke-dashoffset', anime.setDashoffset(path));
        svg.appendChild(path);
        item.parentNode.appendChild(svg);
      });

      const { animeLineDrawingOpts } = effectSettings.animeLineDrawingOpts;
      animeLineDrawingOpts.targets = this.el.querySelectorAll(
        '.grid__deco > path',
      );
      anime.remove(animeLineDrawingOpts.targets);
      anime(animeLineDrawingOpts);
    }

    if (effectSettings.revealer !== undefined) {
      this.items.forEach(item => {
        const revealer = document.createElement('div');
        revealer.className = 'grid__reveal';
        if (effectSettings.revealerOrigin !== undefined) {
          revealer.style.transformOrigin = effectSettings.revealerOrigin;
        }
        if (effectSettings.revealerColor !== undefined) {
          revealer.style.backgroundColor = effectSettings.revealerColor;
        }
        item.parentNode.appendChild(revealer);
      });

      const { animeRevealerOpts } = effectSettings.animeRevealerOpts;
      animeRevealerOpts.targets = this.el.querySelectorAll('.grid__reveal');
      animeRevealerOpts.begin = obj => {
        for (let i = 0, len = obj.animatables.length; i < len; ++i) {
          obj.animatables[i].target.style.opacity = 1;
        }
      };
      anime.remove(animeRevealerOpts.targets);
      anime(animeRevealerOpts);
    }

    if (effectSettings.itemOverflowHidden) {
      this.items.forEach(item => {
        item.parentNode.style.overflow = 'hidden';
      });
    }

    animeOpts.targets =
      effectSettings.sortTargetsFn &&
      typeof effectSettings.sortTargetsFn === 'function'
        ? this.items.sort(effectSettings.sortTargetsFn)
        : this.items;
    anime.remove(animeOpts.targets);
    anime(animeOpts);
  }

  render() {
    const { children, id, className = 'project-list' } = this.props;
    const options = { transitionDuration: 0 };
    return (
      <Masonry
        id={id}
        options={options}
        className={className}
        ref={() => {
          this.el = document.querySelector(`#${id}`);
        }}
      >
        {children}
      </Masonry>
    );
  }
}

export default MasonryList;

MasonryList.propTypes = {
  id: PropTypes.string.isRequired,
  animationName: PropTypes.string,
  items: PropTypes.number.isRequired,
  itemSelector: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  className: PropTypes.string.isRequired,
};

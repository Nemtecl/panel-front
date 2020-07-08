/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, {
  useCallback, useEffect, useState, useRef,
} from 'react';
import propTypes from 'prop-types';
import { Column, Row } from 'simple-flexbox';
import { StyleSheet, css } from 'aphrodite';
import classnames from 'classnames';
import LogoComponent from './LogoComponent';
import MenuItemComponent from './MenuItemComponent';
import IconOverview from '../../assets/icon-overview.js';
import IconTickets from '../../assets/icon-tickets.js';
import IconIdeas from '../../assets/icon-ideas.js';
import IconContacts from '../../assets/icon-contacts';
import IconAgents from '../../assets/icon-agents';
import IconArticles from '../../assets/icon-articles';
import IconSettings from '../../assets/icon-settings';
import IconSubscription from '../../assets/icon-subscription';
import IconBurger from '../../assets/icon-burger';
import './Sidebar.scss';

const styles = StyleSheet.create({
  burgerIcon: {
    cursor: 'pointer',
    position: 'absolute',
    left: 24,
    top: 34,
  },
  container: {
    width: 255,
    paddingTop: 32,
    height: 'calc(100% - 32px)',
  },
  containerMobile: {
    transition: 'left 0.5s, right 0.5s',
    position: 'absolute',
    width: 255,
    height: 'calc(100% - 32px)',
    zIndex: 901,
  },
  mainContainer: {
    height: '100%',
    minHeight: '100vh',
  },
  mainContainerMobile: {
    position: 'absolute',
    top: 0,
    left: 0,
  },
  mainContainerExpanded: {
    width: '100%',
    minWidth: '100vh',
  },
  outsideLayer: {
    position: 'absolute',
    width: '100vw',
    minWidth: '100%',
    height: '100%',
    backgroundColor: 'rgba(0,0,0,.50)',
    zIndex: 900,
  },
  separator: {
    borderTop: '1px solid #DFE0EB',
    marginTop: 16,
    marginBottom: 16,
    opacity: 0.06,
  },
  hide: {
    left: -255,
  },
  show: {
    left: 0,
  },
});

const Sidebar = ({ onChange, selectedItem, menuItems }) => {
  const [expanded, setExpanded] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const input1 = useRef(null);

  const [, updateState] = React.useState();
  const forceUpdate = useCallback(() => updateState({}), []);

  useEffect(() => {
    setIsMobile(window.innerWidth <= 768);
    forceUpdate();
  }, [window.innerWidth]);

  const onItemClicked = (item) => {
    setExpanded(false);
    return onChange(item);
  };

  const toggleMenu = () => setExpanded(!expanded);

  const renderBurger = () => (
    <div onClick={toggleMenu} className={css(styles.burgerIcon)}>
      <IconBurger />
    </div>
  );

  return (
    <div style={{ position: 'relative' }}>
      <Row
        componentRef={(element) => (input1.current = element)}
        className={css(styles.mainContainer)}
        breakpoints={{
          768: css(
            styles.mainContainerMobile,
            expanded && styles.mainContainerExpanded,
          ),
        }}
      >
        {isMobile && !expanded && renderBurger()}
        <Column
          className={classnames(css(styles.container), 'sidebar-container')}
          breakpoints={{
            768: css(
              styles.containerMobile,
              expanded ? styles.show : styles.hide,
            ),
          }}
        >
          <LogoComponent />
          <Column>
            {
              menuItems.map((o) => (
                <MenuItemComponent
                  title={o.title}
                  icon={o.icon}
                  onClick={() => onItemClicked(o.key)}
                  active={selectedItem === o.key}
                  key={o.key}
                />
              ))
            }
            <div className={css(styles.separator)} />
          </Column>
        </Column>
        {isMobile && expanded && (
          <div
            className={css(styles.outsideLayer)}
            onClick={toggleMenu}
          />
        )}
      </Row>
    </div>
  );
}

Sidebar.propTypes = {
  menuItems: propTypes.arrayOf(
    propTypes.shape({
      key: propTypes.string.isRequired,
      title: propTypes.string.isRequired,
      icon: propTypes.string.isRequired,
    }),
  ).isRequired,
  selectedItem: propTypes.string.isRequired,
  onChange: propTypes.func.isRequired,
};

export default Sidebar;

/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, {
  useCallback, useEffect, useState, useRef,
} from 'react';
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

function Sidebar({ onChange, selectedItem }) {
  const [expanded, setExpanded] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const input1 = useRef(null);

  const [, updateState] = React.useState();
  const forceUpdate = useCallback(() => updateState({}), []);

  /**
     * This is to fix this issue:
     * https://github.com/llorentegerman/react-admin-dashboard/issues/8
     * I haven't been able to reproduce this bug in Safari 13.0.5 (14608.5.12)
     */
  useEffect(() => {
    setIsMobile(window.innerWidth <= 768);
    forceUpdate();
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
            <MenuItemComponent
              title="Overview"
              icon={IconOverview}
              onClick={() => onItemClicked('Overview')}
              active={selectedItem === 'Overview'}
            />
            <MenuItemComponent
              title="Tickets"
              icon={IconTickets}
              onClick={() => onItemClicked('Tickets')}
              active={selectedItem === 'Tickets'}
            />
            <MenuItemComponent
              title="Ideas"
              icon={IconIdeas}
              onClick={() => onItemClicked('Ideas')}
              active={selectedItem === 'Ideas'}
            />
            <MenuItemComponent
              title="Contacts"
              icon={IconContacts}
              onClick={() => onItemClicked('Contacts')}
              active={selectedItem === 'Contacts'}
            />
            <MenuItemComponent
              title="Agents"
              icon={IconAgents}
              onClick={() => onItemClicked('Agents')}
              active={selectedItem === 'Agents'}
            />
            <MenuItemComponent
              title="Articles"
              icon={IconArticles}
              onClick={() => onItemClicked('Articles')}
              active={selectedItem === 'Articles'}
            />
            <div className={css(styles.separator)} />
            <MenuItemComponent
              title="Settings"
              icon={IconSettings}
              onClick={() => onItemClicked('Settings')}
              active={selectedItem === 'Settings'}
            />
            <MenuItemComponent
              title="Subscription"
              icon={IconSubscription}
              onClick={() => onItemClicked('Subscription')}
              active={selectedItem === 'Subscription'}
            />
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

export default Sidebar;

import React from "react";
import { Menu, Icon } from "semantic-ui-react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../../../hooks";
import "./SideMenu.scss";

export const SideMenu = (props) => {
  const { isOpen, children } = props;
  const { pathname } = useLocation();

  return (
    <div className={`side-menu-admin ${isOpen ? "" : "menu-closed"}`}>
      <MenuLeft pathname={pathname} />
      <div className="content">{children}</div>
    </div>
  );
};

function MenuLeft(props) {
  const { pathname } = props;
  const { auth } = useAuth();
  console.log(auth);

  return (
    <Menu fixed="left" borderless className="side" vertical>
      <Menu.Item
        as={Link}
        to="/admin"
        active={pathname === "/admin"}
        className="side-menu-item"
      >
        <Icon name="home" />
        <span>Inicio</span>
      </Menu.Item>

      {auth.me?.isAdmin && (
        <Menu.Item
          as={Link}
          to="/admin/dependencies"
          active={pathname === "/admin/dependencies"}
          className="side-menu-item"
        >
          <Icon name="book" />
          <span>Catálogo de dependencias</span>
        </Menu.Item>
      )}

      {auth.me?.isAdmin && (
        <Menu.Item
          as={Link}
          to="/admin/users"
          active={pathname === "/admin/users"}
          className="side-menu-item"
        >
          <Icon name="users" />
          <span>Usuarios</span>
        </Menu.Item>
      )}

      <Menu.Item
        as={Link}
        to="/admin/vote"
        active={pathname === "/admin/vote"}
        className="side-menu-item"
      >
        <Icon name="vcard" />
        <span>Votar</span>
      </Menu.Item>

      {auth.me?.isAdmin && (
        <Menu.Item
          as={Link}
          to="/admin/RankingVotes"
          active={pathname === "/admin/RankingVotes"}
          className="side-menu-item"
        >
          <Icon name="line graph" />
          <span>Resultados de votaciones</span>
        </Menu.Item>
      )}
    </Menu>
  );
}

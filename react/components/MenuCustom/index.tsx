import React, { useState } from "react";
import { useCssHandles } from "vtex.css-handles";
import './style.css'

type SubmenuLink = {
  text: string;
  url: string;
  hasSubmenu?: boolean;
  submenuLinks?: SubmenuLink[];
  linkColor?: string;
  underline?: boolean;
};

type Banner = {
  bannerImage: string;
  bannerLink: string;
  bannerText: string;
};

type MenuLink = {
  __editorItemTitle?: string;
  text: string;
  url: string;
  hasSubmenu: boolean;
  submenuLinks?: SubmenuLink[];
  banners?: Banner[];
  linkColor?: string;
  underline?: boolean;
};

interface Props {
  menuLinks: MenuLink[];
}

const CSS_HANDLES = [
  "menuContainer",
  "submenuWrapper",
  "wrapper",
  "menuItem",
  "menuLink",
  "submenuContainer",
  "submenuItem",
  "bannerContainer",
  "bannerLink",
  "bannerText",
  "bannerImage",
  "submenuToggleIcon",
  "activeMenuItem",
  "hoverMenuItem",
  "openSubmenu",
  "titleSubMenu",
  "todosProdutos",
  "level-",
  "close",
] as const;

const MenuCustom = (props: Props) => {
  const { menuLinks } = props;

  const [openSubmenus, setOpenSubmenus] = useState<string[]>([]);
  const { handles } = useCssHandles(CSS_HANDLES);

  const isMobile = window.innerWidth <= 768;

  const handleSubmenuToggle = (indexPath: string) => {
    setOpenSubmenus((prevOpenSubmenus) =>
      prevOpenSubmenus.includes(indexPath)
        ? prevOpenSubmenus.filter((path) => path !== indexPath)
        : [...prevOpenSubmenus, indexPath]
    );
  };

  const renderSubmenu = (
    submenuLinks: SubmenuLink[] | undefined,
    level: number = 0,
    parentIndexPath: string = ""
  ) => {
    if (!submenuLinks) return null;


    return (
      <ul
        className={handles.submenuWrapper}>
        {submenuLinks.map((submenuLink, subIndex) => {
          const currentPath = `${parentIndexPath}-${subIndex}`;

          return (
            <li
              key={currentPath}
              className={`${handles.submenuItem} ${openSubmenus.includes(currentPath) ? handles.activeMenuItem : ""
                }`}
              onMouseEnter={() =>
                !isMobile &&
                setOpenSubmenus((prevOpenSubmenus) =>
                  prevOpenSubmenus.includes(currentPath)
                    ? prevOpenSubmenus
                    : [...prevOpenSubmenus, currentPath]
                )
              }
              onMouseLeave={() =>
                !isMobile &&
                setOpenSubmenus((prevOpenSubmenus) =>
                  prevOpenSubmenus.filter((path) => path !== currentPath)
                )
              }
            >
              {isMobile ? (
                <p
                  style={{ color: submenuLink.linkColor || "#000" }}
                  className={handles.menuLink}
                  onClick={(e) => {
                    if (submenuLink.hasSubmenu) {
                      e.preventDefault();
                      handleSubmenuToggle(currentPath);
                    }
                  }}
                  aria-controls={`submenu-${currentPath}`}
                  aria-expanded={
                    openSubmenus.includes(currentPath) ? "true" : "false"
                  }
                >
                  <a href={submenuLink.url}>{submenuLink.text}</a>
                  {submenuLink.hasSubmenu && (
                    <span
                      className={`${handles.submenuToggleIcon} ${openSubmenus.includes(currentPath) ? "active" : ""
                        }`}
                    />
                  )}
                </p>
              ) : (
                <a
                  href={submenuLink.url}
                  style={{ color: submenuLink.linkColor || "#000" }}
                  className={`${handles.menuLink} ${submenuLink.underline ? "underline" : ""
                    }`}
                >
                  {submenuLink.text}
                </a>
              )}
              {submenuLink.hasSubmenu &&
                renderSubmenu(submenuLink.submenuLinks, level + 1, currentPath)}
            </li>
          );
        })}
      </ul>
    );
  };

  const isMenuActive = openSubmenus.length > 0;

  return (
    <nav
      className={handles.menuContainer}
      role="navigation"
      aria-label="Main Menu"
    >
      <ul
        className={`${handles.wrapper} ${isMenuActive ? handles.activeMenuItem : ""}`}
      >
        {menuLinks?.map((link, index) => {
          const indexPath = `${index}`;

          return (
            <li
              key={indexPath}
              className={`${handles.menuItem} ${openSubmenus.includes(indexPath)
                  ? handles.activeMenuItem
                  : ""
                } ${!isMobile ? handles.hoverMenuItem : ""}`}
              onMouseEnter={() => !isMobile && setOpenSubmenus([indexPath])}
              onMouseLeave={() => !isMobile && setOpenSubmenus([])}
              aria-haspopup={link.hasSubmenu ? "true" : undefined}
              aria-expanded={
                openSubmenus.includes(indexPath) ? "true" : "false"
              }
            >
              {isMobile ? (
                <p
                  className={handles.menuLink}
                  style={{ color: link.linkColor || "#000" }}
                  onClick={(e) => {
                    if (link.hasSubmenu) {
                      e.preventDefault();
                      handleSubmenuToggle(indexPath);
                    }
                  }}
                  aria-controls={`submenu-${indexPath}`}
                  aria-expanded={
                    openSubmenus.includes(indexPath) ? "true" : "false"
                  }
                >
                  {link.hasSubmenu && (
                    <>
                      <span>{link.text}</span>
                      <span
                        className={`${handles.submenuToggleIcon} ${openSubmenus.includes(indexPath) ? "active" : ""
                          }`}
                      />
                    </>
                  )}
                  {!link.hasSubmenu && (
                    <a
                      href={link.url}
                      className={`${handles.menuLink} ${link.underline ? "underline" : ""
                        }`}
                      style={{ color: link.linkColor || "#000" }}
                    >
                      {link.text}
                    </a>
                  )}
                </p>
              ) : (
                <a
                  href={link.url}
                  className={`${handles.menuLink} ${link.underline ? "underline" : ""
                    }`}
                  style={{ color: link.linkColor || "#000" }}
                >
                  {link.text}
                </a>
              )}
              {link.hasSubmenu && (
                <div
                  id={`submenu-${indexPath}`}
                  className={`${handles.submenuContainer} ${openSubmenus.includes(indexPath)
                      ? handles.openSubmenu
                      : ""
                    }`}
                  role="region"
                  aria-label={`${link.text} submenu`}
                  style={{
                    display: openSubmenus.includes(indexPath)
                      ? "flex"
                      : "none",
                  }}
                >
                  <div className={handles.titleSubMenu}>
                    {link.text}
                  </div>

                  <div className={handles.todosProdutos}>
                    <a href={link.url}>Todos os produtos</a>
                  </div>

                  <div className={handles.close} onClick={(e) => {
                    e.preventDefault();
                    handleSubmenuToggle(indexPath);
                  }}>
                    <span>Voltar</span> 
                  </div>

                  {renderSubmenu(link.submenuLinks, 1, indexPath)}

                  {link.banners && link.banners.length > 0 && (
                    <div className={handles.bannerContainer}>
                      {link.banners.map((banner, bannerIndex) => {
                        return (
                          <a
                            className={handles.bannerLink}
                            key={bannerIndex}
                            href={banner.bannerLink}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <img
                              src={banner.bannerImage}
                              alt={`Banner ${bannerIndex + 1}`}
                              className={handles.bannerImage}
                            />
                            {banner.bannerText && (
                              <span className={handles.bannerText}>
                                {banner.bannerText}
                              </span>
                            )}
                          </a>
                        );
                      })}
                    </div>
                  )}
                </div>
              )}
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default MenuCustom;

MenuCustom.schema = {
  title: "Menu Customizado",
  description: "Um menu customizado com links dinâmicos e banners nos submenus",
  type: "object",
  properties: {
    menuLinks: {
      type: "array",
      title: "Links do Menu",
      items: {
        type: "object",
        properties: {
          __editorItemTitle: {
            type: "string",
            title: "Título no Editor",
          },
          text: {
            type: "string",
            title: "Texto do Link",
          },
          url: {
            type: "string",
            title: "URL do Link",
          },
          hasSubmenu: {
            type: "boolean",
            title: "Possui Submenu?",
            default: false,
          },
          submenuLinks: {
            title: "Submenu Links",
            type: "array",
            items: {
              type: "object",
              properties: {
                text: {
                  type: "string",
                  title: "Texto do Link",
                },
                url: {
                  type: "string",
                  title: "URL do Link",
                },
                linkColor: {
                  type: "string",
                  title: "Cor do Link",
                },
                underline: {
                  type: "boolean",
                  title: "Ativar underline?",
                  default: false,
                },
                hasSubmenu: {
                  type: "boolean",
                  title: "Possui Submenu?",
                  default: false,
                },
                submenuLinks: {
                  type: "array",
                  title: "Submenu Links",
                  items: {
                    type: "object",
                    properties: {
                      text: {
                        type: "string",
                        title: "Texto do Link",
                      },
                      url: {
                        type: "string",
                        title: "URL do Link",
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
  },
};
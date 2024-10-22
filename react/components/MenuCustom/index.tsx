import React, { useState } from "react";
import { useCssHandles } from "vtex.css-handles";
import './style.css';

type SubmenuLink = {
  text: string;
  url: string;
  hasSubmenu?: boolean;
  submenuLinks?: SubmenuLink[];
  linkColor?: string;
  underline?: boolean;
  negrito: boolean;
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
  negrito: boolean;
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
  "topoMenu",
  "close",
] as const;

const MenuCustom = (props: Props) => {
  const { menuLinks } = props;
  const [openSubmenus, setOpenSubmenus] = useState<string[]>([]);
  const { handles } = useCssHandles(CSS_HANDLES);
  const [isLinkActive, setIsLinkActive] = useState<boolean>(true); // Novo estado

  const isMobile = window.innerWidth <= 768;

  const handleSubmenuToggle = (indexPath: string) => {
    setOpenSubmenus((prevOpenSubmenus) =>
      prevOpenSubmenus.includes(indexPath)
        ? prevOpenSubmenus.filter((path) => path !== indexPath)
        : [...prevOpenSubmenus, indexPath]
    );
  };

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, url: string) => {
    if (!isLinkActive) {
      e.preventDefault(); // Previne o clique se o link não estiver ativo
      return;
    }

    // Desabilita o link e ativa após 1 segundo
    setIsLinkActive(false);
    setTimeout(() => {
      window.location.href = url; // Redireciona após o atraso 
    }, 300);
  };

  const renderSubmenu = (
    submenuLinks: SubmenuLink[] | undefined,
    level: number = 0,
    parentIndexPath: string = ""
  ) => {
    if (!submenuLinks) return null;

    return (
      <ul className={handles.submenuWrapper}>
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
                  aria-expanded={openSubmenus.includes(currentPath) ? "true" : "false"}
                >
                  <a href="#" onClick={(e) => handleLinkClick(e, submenuLink.url)} className={`${submenuLink.underline ? "underline" : ""} ${submenuLink.negrito ? "negrito" : ""}`}>{submenuLink.text}</a>
                  {submenuLink.hasSubmenu && (
                    <span
                      className={`${handles.submenuToggleIcon} ${openSubmenus.includes(currentPath) ? "active" : ""
                        }`}
                    />
                  )}
                </p>
              ) : (
                <a
                  href="#"
                  onClick={(e) => handleLinkClick(e, submenuLink.url)}
                  style={{ color: submenuLink.linkColor || "#000" }}
                  className={`${handles.menuLink} ${submenuLink.underline ? "underline" : ""} ${submenuLink.negrito ? "negrito" : ""}`}
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
    <>
      <div className={handles.topoMenu}>
        <img width="135" height="35" alt="Logo Mobile" src="https://dakota.vtexassets.com/assets/vtex/assets-builder/dakota.dakota-theme/6.0.6/svg/logo-dakota___9e5024e768762611d1260e2e2d5e1aa5.svg" />
      </div>

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
                  : ""} ${!isMobile ? handles.hoverMenuItem : ""}`}
                onMouseEnter={() => !isMobile && setOpenSubmenus([indexPath])}
                onMouseLeave={() => !isMobile && setOpenSubmenus([])}
                aria-haspopup={link.hasSubmenu ? "true" : undefined}
                aria-expanded={openSubmenus.includes(indexPath) ? "true" : "false"}
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
                    aria-expanded={openSubmenus.includes(indexPath) ? "true" : "false"}
                  >
                    {link.hasSubmenu && (
                      <>
                        <span>{link.text}</span>
                        <span
                          className={`${handles.submenuToggleIcon} ${openSubmenus.includes(indexPath) ? "active" : ""}  ${link.negrito ? "negrito" : ""}`} />
                      </>
                    )}
                    {!link.hasSubmenu && (
                      <a
                        href="#"
                        onClick={(e) => handleLinkClick(e, link.url)}
                        className={`${handles.menuLink} ${link.underline ? "underline" : ""} ${link.negrito ? "negrito" : ""}`}
                      >
                        {link.text}
                      </a>
                    )}
                  </p>
                ) : (
                  <a
                    href="#"
                    onClick={(e) => handleLinkClick(e, link.url)}
                    className={`${handles.menuLink} ${link.underline ? "underline" : ""}`}
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
                      : ""}`}
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

                    <div className={handles.close} onClick={(e) => {
                      e.preventDefault();
                      handleSubmenuToggle(indexPath);
                    }}>
                      <span>Voltar</span>
                    </div>

                    {renderSubmenu(link.submenuLinks, 1, indexPath)}

                    {link.banners && link.banners.length > 0 && (
                      <div className={handles.bannerContainer}>
                        {link.banners.map((banner, bannerIndex) => (
                          <a key={bannerIndex} className={handles.bannerLink} href={banner.bannerLink}>
                            <img className={handles.bannerImage} src={banner.bannerImage} alt={banner.bannerText} />
                            <span className={handles.bannerText}>{banner.bannerText}</span>
                          </a>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </li>
            );
          })}
        </ul>
      </nav>
    </>
  );
};

export default MenuCustom;

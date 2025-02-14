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
  "linkMenu",
  "linkRegister",
  "menuMarca",
  "menuMarcaBox",
  "menuMarcaLink",
  "menuMarcaImg",
  "menuMarcaTitle",
  "menuInst",
  "menuInstNav",
  "menuInstList",
  "menuInstItem",
  "menuInstSpan",
  "menuInstLink",
  "subMenuInst",
  "subMenuInstList",
  "subMenuLink",
  "menuToSub",
  "subMenuIcon",
  "iconPlus",
  "iconMinus",
  "activeClass"
] as const;

const MenuCustom = (props: Props) => {
  const { menuLinks } = props;
  const [openSubmenus, setOpenSubmenus] = useState<string[]>([]);
  const { handles } = useCssHandles(CSS_HANDLES);
  const [isLinkActive, setIsLinkActive] = useState<boolean>(true);

  const [isOpen, setIsOpen] = useState(false);

  const toggleSubMenu = () => {
    setIsOpen(!isOpen);
  };

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
        {/* <svg xmlns="http://www.w3.org/2000/svg" width="22" height="20" viewBox="0 0 22 20" fill="none">
          <path d="M10.769 13.4255C14.4125 13.4255 17.3662 10.6223 17.3662 7.16442C17.3662 3.70651 14.4125 0.90332 10.769 0.90332C7.12552 0.90332 4.17188 3.70651 4.17188 7.16442C4.17188 10.6223 7.12552 13.4255 10.769 13.4255Z" stroke="#DB3D68" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M0.769531 18.903C1.78339 17.2375 3.24121 15.8546 4.99654 14.8931C6.75186 13.9316 8.74289 13.4255 10.7696 13.4255C12.7963 13.4255 14.7873 13.9317 16.5426 14.8932C18.2979 15.8547 19.7557 17.2377 20.7695 18.9032" stroke="#DB3D68" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
        <span className={handles.linkMenu}>
          <a href="/login" className={handles.linkRegister}>ENTRE</a> OU <a href="/login" className={handles.linkRegister}>CADASTRE-SE</a>
        </span> */}
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


      <div className={handles.menuMarca}>
        
        <h6 className={handles.menuMarcaTitle}>Marcas</h6>
        <div className={handles.menuMarcaBox}>
          <a href="/" className={handles.menuMarcaLink}><img className={handles.menuMarcaImg} src="https://dakota.vtexassets.com/assets/vtex.file-manager-graphql/images/eca2d4cc-d038-4080-9039-1905f8e89033___9f8c4b042898eafa8edf677ec6274c78.png" alt="" /></a>
          <a href="https://kolosh.dakota.com.br/?_gl=1*1fnxy0h*_gcl_au*MTc5ODUyMTY2NC4xNzM4MjczOTUxLjEyOTMxMjY4MDguMTczODk1ODMwOS4xNzM4OTU4MzA5*_ga*MTc3NzI0MDc0LjE3MzgyNzM5NTI.*_ga_7NRS5HF4ZZ*MTczOTQ3NDI3Ny41LjAuMTczOTQ3NDI3Ny42MC4wLjA." className={handles.menuMarcaLink} target="_blank"><img className={handles.menuMarcaImg} src="https://dakota.vtexassets.com/assets/vtex.file-manager-graphql/images/3208d3e4-c277-46bc-ba3d-dc482f2d8df8___b9fc4d8865e150f755f4d08571d52512.png" alt="" /></a>
          <a href="https://tanara.dakota.com.br/" className={handles.menuMarcaLink} target="_blank"><img className={handles.menuMarcaImg} src="https://dakota.vtexassets.com/assets/vtex.file-manager-graphql/images/a44a0a87-dff6-4e7f-97d2-787797978f93___134b6f2838e7c12b17f7e2136f8d116a.png" alt="" /></a>
          <a href="https://mississipi.dakota.com.br/?_gl=1*j5q14f*_gcl_au*MTc5ODUyMTY2NC4xNzM4MjczOTUxLjEyOTMxMjY4MDguMTczODk1ODMwOS4xNzM4OTU4MzA5*_ga*MTc3NzI0MDc0LjE3MzgyNzM5NTI.*_ga_7NRS5HF4ZZ*MTczOTQ3NDI3Ny41LjEuMTczOTQ3NDI5Ni40MS4wLjA." className={handles.menuMarcaLink} target="_blank"><img className={handles.menuMarcaImg} src="https://dakota.vtexassets.com/assets/vtex.file-manager-graphql/images/6744d8b8-f953-4bc1-8543-634ead6121d7___263a7cc0e04578a28aefd7cbc6e5a74d.png" alt="" /></a>
          <a href="https://campesi.dakota.com.br/?_gl=1*1tzoa9s*_gcl_au*MTc5ODUyMTY2NC4xNzM4MjczOTUxLjEyOTMxMjY4MDguMTczODk1ODMwOS4xNzM4OTU4MzA5*_ga*MTc3NzI0MDc0LjE3MzgyNzM5NTI.*_ga_7NRS5HF4ZZ*MTczOTQ3NDI3Ny41LjEuMTczOTQ3NDU0Ny42MC4wLjA." className={handles.menuMarcaLink} target="_blank"><img className={handles.menuMarcaImg} src="https://dakota.vtexassets.com/assets/vtex.file-manager-graphql/images/0f64c891-58d3-4446-9d90-a448dba02558___5df8f891417f622858897c993e4ce24b.png" alt="" /></a>
          <a href="https://pinkcats.dakota.com.br/?_gl=1*1tzoa9s*_gcl_au*MTc5ODUyMTY2NC4xNzM4MjczOTUxLjEyOTMxMjY4MDguMTczODk1ODMwOS4xNzM4OTU4MzA5*_ga*MTc3NzI0MDc0LjE3MzgyNzM5NTI.*_ga_7NRS5HF4ZZ*MTczOTQ3NDI3Ny41LjEuMTczOTQ3NDU0Ny42MC4wLjA." className={handles.menuMarcaLink} target="_blank"><img className={handles.menuMarcaImg} src="https://dakota.vtexassets.com/assets/vtex.file-manager-graphql/images/13a2a121-fe5e-4218-a4b8-265a373cada6___60c0d620c03d1b4d2cff42293d51067b.png" alt="" /></a>
        </div>
      </div>

      

      <div className={handles.menuInst}>

        <nav className={handles.menuInstNav}>
          <ul className={handles.menuInstList}>
            <li  onClick={toggleSubMenu} className={`${handles.menuInstItem} ${handles.menuToSub}`}>
              <div className={handles.menuInstItem}>
                  <span className={handles.menuInstSpan}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="21" height="21" viewBox="0 0 21 21" fill="none">
                    <g clip-path="url(#clip0_2060_209)">
                    <path d="M10.0391 11.6846C10.4705 11.6846 10.8203 11.3348 10.8203 10.9033C10.8203 10.4718 10.4705 10.1221 10.0391 10.1221C9.60759 10.1221 9.25781 10.4718 9.25781 10.9033C9.25781 11.3348 9.60759 11.6846 10.0391 11.6846Z" fill="#878787"/>
                    <path d="M6.60156 11.6846C7.03303 11.6846 7.38281 11.3348 7.38281 10.9033C7.38281 10.4718 7.03303 10.1221 6.60156 10.1221C6.17009 10.1221 5.82031 10.4718 5.82031 10.9033C5.82031 11.3348 6.17009 11.6846 6.60156 11.6846Z" fill="#878787"/>
                    <path d="M13.4766 11.6846C13.908 11.6846 14.2578 11.3348 14.2578 10.9033C14.2578 10.4718 13.908 10.1221 13.4766 10.1221C13.0451 10.1221 12.6953 10.4718 12.6953 10.9033C12.6953 11.3348 13.0451 11.6846 13.4766 11.6846Z" fill="#878787"/>
                    <path d="M6.28386 17.3963C7.85927 18.3081 9.71252 18.6158 11.4981 18.2621C13.2836 17.9084 14.8796 16.9174 15.9885 15.4739C17.0973 14.0304 17.6434 12.2329 17.5248 10.4165C17.4062 8.60011 16.6311 6.88884 15.344 5.60174C14.0569 4.31463 12.3456 3.53954 10.5293 3.42097C8.71288 3.3024 6.91537 3.84844 5.47186 4.9573C4.02835 6.06615 3.03737 7.66214 2.68367 9.44768C2.32997 11.2332 2.6377 13.0865 3.54948 14.6619L2.57214 17.5799C2.53542 17.69 2.53009 17.8082 2.55675 17.9211C2.58341 18.0341 2.64101 18.1374 2.7231 18.2195C2.80518 18.3016 2.90851 18.3592 3.02149 18.3859C3.13447 18.4125 3.25264 18.4072 3.36277 18.3705L6.28386 17.3963Z" stroke="#878787" stroke-linecap="round" stroke-linejoin="round"/>
                    </g>
                    <defs>
                    <clipPath id="clip0_2060_209">
                    <rect width="20" height="20" fill="white" transform="translate(0.0390625 0.90332)"/>
                    </clipPath>
                    </defs>
                  </svg>
                  atendimento
                  </span>

                  <div className={handles.subMenuIcon}>
                  {isOpen ? (
                    <div className={handles.iconMinus}>
                      <svg xmlns="http://www.w3.org/2000/svg" width="17" height="16" viewBox="0 0 17 16" fill="none">
                        <g clip-path="url(#clip0_1973_389)">
                        <path d="M2.74414 8H13.7338" stroke="#222222" stroke-opacity="0.8" stroke-width="1.5" stroke-linecap="square" stroke-linejoin="round"/>
                        </g>
                        <defs>
                        <clipPath id="clip0_1973_389">
                        <rect width="15.985" height="16" fill="white" transform="translate(0.246094)"/>
                        </clipPath>
                        </defs>
                      </svg>
                    </div>
                  ) : (
                    <div className={handles.iconPlus}>
                      <svg xmlns="http://www.w3.org/2000/svg" width="17" height="16" viewBox="0 0 17 16" fill="none">
                        <g clip-path="url(#clip0_1973_260)">
                        <path d="M3.26953 8H14.2695" stroke="#222222" stroke-opacity="0.8" stroke-width="1.5" stroke-linecap="square" stroke-linejoin="round"/>
                        <path d="M8.76953 2.5V13.5" stroke="#222222" stroke-opacity="0.8" stroke-width="1.5" stroke-linecap="square" stroke-linejoin="round"/>
                        </g>
                        <defs>
                        <clipPath id="clip0_1973_260">
                        <rect width="16" height="16" fill="white" transform="translate(0.769531)"/>
                        </clipPath>
                        </defs>
                      </svg>
                    </div>
                  )}
                  </div>
                </div>
                <ul className={`${handles.subMenuInst} ${isOpen ? handles.activeClass : "hidden"}`}>
                  <li className={handles.subMenuInstList}><a href="https://www.dakota.com.br/central-de-atendimento" target="_blank" className={handles.subMenuLink}>Fale Conosco</a></li>
                  <li className={handles.subMenuInstList}><a href="https://www.clubedeaguias.com.br/#!/" target="_blank" className={handles.subMenuLink}>Clube de Águias</a></li>
                  <li className={handles.subMenuInstList}><a href="https://pedidofacil.dakota.com.br/login" target="_blank" className={handles.subMenuLink}>Área do lojista</a></li>
                </ul>
            </li>
            <li className={handles.menuInstItem}>
              <span className={handles.menuInstSpan}>
                <svg xmlns="http://www.w3.org/2000/svg" width="21" height="21" viewBox="0 0 21 21" fill="none">
                  <g clip-path="url(#clip0_2060_221)">
                  <path d="M10.0391 13.4033H7.53906V10.9033L15.0391 3.40332L17.5391 5.90332L10.0391 13.4033Z" stroke="#878787" stroke-linecap="round" stroke-linejoin="round"/>
                  <path d="M13.1641 5.27832L15.6641 7.77832" stroke="#878787" stroke-linecap="round" stroke-linejoin="round"/>
                  <path d="M16.9141 10.9033V17.1533C16.9141 17.3191 16.8482 17.4781 16.731 17.5953C16.6138 17.7125 16.4548 17.7783 16.2891 17.7783H3.78906C3.6233 17.7783 3.46433 17.7125 3.34712 17.5953C3.22991 17.4781 3.16406 17.3191 3.16406 17.1533V4.65332C3.16406 4.48756 3.22991 4.32859 3.34712 4.21138C3.46433 4.09417 3.6233 4.02832 3.78906 4.02832H10.0391" stroke="#878787" stroke-linecap="round" stroke-linejoin="round"/>
                  </g>
                  <defs>
                  <clipPath id="clip0_2060_221">
                  <rect width="20" height="20" fill="white" transform="translate(0.0390625 0.90332)"/>
                  </clipPath>
                  </defs>
                </svg>
                <a href="https://blog.dakota.com.br/" target="_blank" className={handles.menuInstLink}>Blog</a>
              </span>
            </li>
            <li className={handles.menuInstItem}>
              <span className={handles.menuInstSpan}>
                <svg xmlns="http://www.w3.org/2000/svg" width="21" height="20" viewBox="0 0 21 20" fill="none">
                  <g clip-path="url(#clip0_1973_272)">
                  <path d="M12.6445 18.125L10.7695 16.25L12.6445 14.375" stroke="#878787" stroke-linecap="round" stroke-linejoin="round"/>
                  <path d="M15.9752 5.87427L15.2885 8.43599L12.7275 7.74927" stroke="#878787" stroke-linecap="round" stroke-linejoin="round"/>
                  <path d="M6.93809 10.9977L6.25059 8.4375L3.69043 9.12266" stroke="#878787" stroke-linecap="round" stroke-linejoin="round"/>
                  <path d="M6.25048 8.4375L2.81298 14.375C2.70332 14.5649 2.64556 14.7804 2.64551 14.9997C2.64545 15.219 2.7031 15.4345 2.81266 15.6244C2.92221 15.8144 3.07983 15.9722 3.26968 16.0821C3.45952 16.1919 3.67491 16.2498 3.89423 16.25H7.64423" stroke="#878787" stroke-linecap="round" stroke-linejoin="round"/>
                  <path d="M10.7695 16.25H17.6445C17.8638 16.2498 18.0792 16.1919 18.2691 16.0821C18.4589 15.9722 18.6165 15.8144 18.7261 15.6244C18.8357 15.4345 18.8933 15.219 18.8932 14.9997C18.8932 14.7804 18.8354 14.5649 18.7258 14.375L16.918 11.25" stroke="#878787" stroke-linecap="round" stroke-linejoin="round"/>
                  <path d="M15.2883 8.43749L11.8508 2.49999C11.741 2.3102 11.5832 2.15262 11.3933 2.04307C11.2034 1.93352 10.988 1.87585 10.7687 1.87585C10.5495 1.87585 10.3341 1.93352 10.1442 2.04307C9.95426 2.15262 9.7965 2.3102 9.68672 2.49999L7.87891 5.62499" stroke="#878787" stroke-linecap="round" stroke-linejoin="round"/>
                  </g>
                  <defs>
                  <clipPath id="clip0_1973_272">
                  <rect width="20" height="20" fill="white" transform="translate(0.769531)"/>
                  </clipPath>
                  </defs>
                </svg>
                <a href="/no-passo-certo" target="_blank" className={handles.menuInstLink}>Sustentabilidade</a>
              </span>
            </li>
          </ul>
        </nav>
      </div>
    </>
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
          negrito: {
            type: "boolean",
            title: "Negrito",
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
                  title: "Título?",
                  default: false,
                },
                negrito: {
                  type: "boolean",
                  title: "Negrito",
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